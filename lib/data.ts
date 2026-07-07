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
export const SPY_RET: Record<Period, number> = { '1W': 0.4, '1M': 1.4, 'YTD': 10, '6M': 8.7, '1Y': 20.8 };
// @@END_GENERATED:SPY_RET@@

// Top holdings per ETF (ticker + portfolio weight %), shown on ETF row hover.
export type EtfHolding = { t: string; w: number };

// @@GENERATED:ETF_TOP_HOLDINGS@@
export const ETF_TOP_HOLDINGS: Record<string, EtfHolding[]> = {
  AIS: [{ t: 'MU', w: 6.7 }, { t: 'AMD', w: 5.2 }, { t: 'SIMO', w: 3.9 }, { t: 'VRT', w: 3.8 }, { t: 'MRVL', w: 3.8 }],
  ARTY: [{ t: 'AMD', w: 5.2 }, { t: 'MU', w: 4.8 }, { t: 'NVDA', w: 4.5 }, { t: 'AVGO', w: 4.4 }, { t: 'MRVL', w: 4.0 }],
  BAI: [{ t: 'MU', w: 6.1 }, { t: 'AMD', w: 5.2 }, { t: 'TSM', w: 4.7 }, { t: 'LRCX', w: 4.5 }, { t: 'AVGO', w: 4.2 }],
  IGPT: [{ t: 'AMD', w: 8.8 }, { t: 'META', w: 8.3 }, { t: 'GOOGL', w: 8.0 }, { t: 'MU', w: 7.7 }, { t: 'NVDA', w: 7.5 }],
  IVES: [{ t: 'AAPL', w: 5.2 }, { t: 'TSM', w: 5.0 }, { t: 'AMD', w: 4.8 }, { t: 'META', w: 4.8 }, { t: 'AMZN', w: 4.8 }],
  ALAI: [{ t: 'NVDA', w: 12.2 }, { t: 'TSM', w: 5.8 }, { t: 'AMZN', w: 5.1 }, { t: 'MSFT', w: 5.1 }, { t: 'GOOG', w: 5.0 }],
  CHAT: [{ t: 'NVDA', w: 6.9 }, { t: 'GOOGL', w: 5.7 }, { t: 'AVGO', w: 4.5 }, { t: 'AMD', w: 4.0 }, { t: 'MU', w: 3.6 }],
  AIFD: [{ t: 'MU', w: 6.5 }, { t: 'NVDA', w: 6.3 }, { t: 'PANW', w: 6.2 }, { t: 'MRVL', w: 5.5 }, { t: 'AVGO', w: 5.2 }],
  SPRX: [{ t: 'ALAB', w: 11.6 }, { t: 'COHR', w: 8.9 }, { t: 'KLAC', w: 8.6 }, { t: 'NET', w: 8.3 }, { t: 'ARM', w: 8.0 }],
  AOTG: [{ t: 'AMD', w: 15.9 }, { t: 'NVDA', w: 10.0 }, { t: 'MU', w: 9.9 }, { t: 'TSM', w: 7.3 }, { t: 'TOST', w: 5.3 }],
  SOXX: [{ t: 'AMD', w: 8.5 }, { t: 'MU', w: 8.0 }, { t: 'NVDA', w: 7.3 }, { t: 'AVGO', w: 6.6 }, { t: 'INTC', w: 6.1 }],
  PSI: [{ t: 'AMAT', w: 6.6 }, { t: 'KLAC', w: 5.9 }, { t: 'MU', w: 5.6 }, { t: 'AMD', w: 5.6 }, { t: 'LRCX', w: 5.5 }],
  XSD: [{ t: 'MXL', w: 3.1 }, { t: 'ALAB', w: 3.0 }, { t: 'AMBA', w: 2.9 }, { t: 'ALGM', w: 2.9 }, { t: 'AMD', w: 2.8 }],
  DRAM: [{ t: 'SNDK', w: 4.5 }, { t: 'WDC', w: 4.3 }, { t: 'STX', w: 4.2 }, { t: 'MU', w: 2.8 }, { t: 'JPY', w: 0.6 }],
  PTF: [{ t: 'SNDK', w: 5.1 }, { t: 'MU', w: 4.9 }, { t: 'WDC', w: 4.4 }, { t: 'KLAC', w: 4.1 }, { t: 'AXTI', w: 4.1 }],
  WCLD: [{ t: 'FROG', w: 3.2 }, { t: 'PANW', w: 3.0 }, { t: 'DDOG', w: 2.9 }, { t: 'DOCN', w: 2.6 }, { t: 'CRWD', w: 2.5 }],
  IGV: [{ t: 'PANW', w: 10.4 }, { t: 'PLTR', w: 8.4 }, { t: 'MSFT', w: 8.0 }, { t: 'CRWD', w: 7.3 }, { t: 'ORCL', w: 5.9 }],
  FDTX: [{ t: 'MRVL', w: 9.7 }, { t: 'MU', w: 9.3 }, { t: 'TSM', w: 6.4 }, { t: 'WDC', w: 4.5 }, { t: 'PANW', w: 4.2 }],
  GTEK: [{ t: 'MRVL', w: 3.9 }, { t: 'APH', w: 2.4 }, { t: 'CDNS', w: 2.4 }, { t: 'AXON', w: 2.2 }, { t: 'NET', w: 2.1 }],
  ARKK: [{ t: 'TSLA', w: 10.3 }, { t: 'TEM', w: 5.7 }, { t: 'CRSP', w: 5.3 }, { t: 'HOOD', w: 5.1 }, { t: 'AMD', w: 4.5 }],
  MARS: [{ t: 'SPCX', w: 22.3 }, { t: 'RKLB', w: 9.8 }, { t: 'ASTS', w: 7.5 }, { t: 'VSAT', w: 5.3 }, { t: 'PL', w: 4.9 }],
  FRWD: [{ t: 'NVDA', w: 8.4 }, { t: 'AMD', w: 7.4 }, { t: 'STX', w: 7.0 }, { t: 'TSM', w: 6.1 }, { t: 'LRCX', w: 5.7 }],
  BCTK: [{ t: 'SPCX', w: 8.7 }, { t: 'TSM', w: 8.6 }, { t: 'LRCX', w: 7.6 }, { t: 'AVGO', w: 6.5 }, { t: 'GOOG', w: 6.5 }],
  FWD: [{ t: 'AMD', w: 2.2 }, { t: 'AMAT', w: 2.1 }, { t: 'LRCX', w: 1.9 }, { t: 'NVDA', w: 1.9 }, { t: 'AVGO', w: 1.8 }],
  CBSE: [{ t: 'TENB', w: 3.7 }, { t: 'IBRX', w: 3.5 }, { t: 'KRYS', w: 3.2 }, { t: 'SCI', w: 3.1 }, { t: 'SBUX', w: 3.0 }],
  FCUS: [{ t: 'INTC', w: 5.3 }, { t: 'SNDK', w: 5.2 }, { t: 'DELL', w: 4.8 }, { t: 'WDC', w: 4.7 }, { t: 'BE', w: 4.7 }],
  WGMI: [{ t: 'CIFR', w: 17.6 }, { t: 'HUT', w: 10.8 }, { t: 'KEEL', w: 10.2 }, { t: 'IREN', w: 10.2 }, { t: 'MARA', w: 5.1 }],
  CNEQ: [{ t: 'NVDA', w: 13.0 }, { t: 'MSFT', w: 6.1 }, { t: 'GOOG', w: 5.9 }, { t: 'TSM', w: 5.9 }, { t: 'AAPL', w: 4.9 }],
  SGRT: [{ t: 'VRT', w: 12.3 }, { t: 'WDC', w: 10.7 }, { t: 'MU', w: 7.0 }, { t: 'ARW', w: 5.8 }, { t: 'WELL', w: 5.6 }],
  SPMO: [{ t: 'MU', w: 10.7 }, { t: 'NVDA', w: 7.8 }, { t: 'AVGO', w: 6.1 }, { t: 'GOOGL', w: 4.5 }, { t: 'JNJ', w: 4.5 }],
  XMMO: [{ t: 'CW', w: 4.2 }, { t: 'ATI', w: 3.3 }, { t: 'WWD', w: 3.0 }, { t: 'STRL', w: 3.0 }, { t: 'TTMI', w: 2.6 }],
  POW: [{ t: 'PWR', w: 4.9 }, { t: 'PRY', w: 4.4 }, { t: 'POWL', w: 4.3 }, { t: 'ETN', w: 4.2 }, { t: 'NVT', w: 3.7 }],
  VOLT: [{ t: 'BELFB', w: 7.4 }, { t: 'POWL', w: 6.3 }, { t: 'ETN', w: 5.5 }, { t: 'PWR', w: 5.2 }, { t: 'NEE', w: 5.1 }],
  PBD: [{ t: 'RIVN', w: 1.4 }, { t: 'SHLS', w: 1.1 }, { t: 'ENRG', w: 1.1 }],
  PBW: [{ t: 'RIVN', w: 2.0 }, { t: 'FCEL', w: 1.9 }, { t: 'BETA', w: 1.9 }, { t: 'OPAL', w: 1.8 }, { t: 'IONR', w: 1.7 }],
  IVEP: [{ t: 'BE', w: 5.5 }, { t: 'GEV', w: 4.7 }, { t: 'VRT', w: 4.2 }, { t: 'PWR', w: 4.2 }, { t: 'SBGSY', w: 4.2 }],
  AIRR: [{ t: 'STRL', w: 5.4 }, { t: 'AGX', w: 4.5 }, { t: 'CHRW', w: 4.3 }, { t: 'FIX', w: 4.2 }, { t: 'MTZ', w: 4.0 }],
  PRN: [{ t: 'FIX', w: 4.6 }, { t: 'PWR', w: 4.1 }, { t: 'HWM', w: 4.1 }, { t: 'STRL', w: 4.0 }, { t: 'JBL', w: 3.5 }],
  RSHO: [{ t: 'TKR', w: 8.7 }, { t: 'POWL', w: 7.3 }, { t: 'CGNX', w: 7.2 }, { t: 'CAT', w: 6.9 }, { t: 'AIT', w: 6.0 }],
  IDEF: [{ t: 'RTX', w: 8.4 }, { t: 'LMT', w: 6.9 }, { t: 'BA', w: 5.1 }, { t: 'GD', w: 4.5 }, { t: 'NOC', w: 3.4 }],
  BILT: [{ t: 'UNP', w: 6.0 }, { t: 'AENA', w: 4.5 }, { t: 'AEP', w: 4.4 }, { t: 'TRP', w: 3.8 }, { t: 'XEL', w: 3.5 }],
  BUZZ: [{ t: 'IBRX', w: 4.0 }, { t: 'SOFI', w: 3.3 }, { t: 'AMD', w: 3.2 }, { t: 'NOW', w: 3.1 }, { t: 'GME', w: 3.1 }],
  MEME: [{ t: 'BE', w: 7.7 }, { t: 'AAOI', w: 7.0 }, { t: 'IREN', w: 6.6 }, { t: 'NBIS', w: 6.2 }, { t: 'SNDK', w: 6.0 }],
  RKNG: [{ t: 'OPEN', w: 3.8 }, { t: 'WDC', w: 3.7 }, { t: 'DELL', w: 3.7 }, { t: 'AMD', w: 3.7 }, { t: 'MU', w: 3.6 }],
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
  'AI & ML':         { '1W': -8.1, '1M': -2.1, 'YTD': 40.9, '6M': 35.2, '1Y': 72.5 },
  'Semiconductors':  { '1W': -16.4, '1M': -3.6, 'YTD': 89.8, '6M': 78.9, '1Y': 126.5 },
  'Broad Tech':      { '1W': -5.7, '1M': -1.9, 'YTD': 23.9, '6M': 18.9, '1Y': 38.4 },
  'Electrification': { '1W': -4.9, '1M': -4.5, 'YTD': 23.9, '6M': 19.6, '1Y': 42.8 },
  'Industrials':     { '1W': -2.5, '1M': 0, 'YTD': 23.1, '6M': 17.8, '1Y': 36.2 },
  'Meme':            { '1W': -8.8, '1M': -8.8, 'YTD': 14.6, '6M': 5.8, '1Y': 1.1 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, IndexChartByPeriod> = {
  'AI & ML': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: -3.1, spyReturn: -0.2, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 96.16, 92.13, 94.59, 91.86], spy: [100, 99.86, 99.73, 100.6, 100.4], top10Return: -8.1, spyReturn: 0.4, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.02, 94.94, 100.06, 100.75, 106.03, 102.89, 103.42, 107.88, 108.74, 102.31, 102.31, 101.41, 103.31, 100.61, 103.62, 106.68, 102.52, 98.17, 100.8, 97.85], spy: [100, 99.71, 98.13, 99.8, 100.34, 102.11, 101.5, 100.24, 101.02, 100.7, 99.24, 99.24, 99.19, 99.33, 98.62, 100.24, 101.02, 100.88, 100.75, 101.63, 101.43], top10Return: -2.1, spyReturn: 1.4, xLabels: ["Jun 9", "Jun 16", "Jun 23", "Jun 30", "Jul 7"] },
    'YTD': { top10: [100, 102.26, 104.35, 105.09, 104.21, 102.1, 102.57, 104.01, 99.72, 102.27, 103.44, 100.88, 97.05, 106.31, 114.45, 121.34, 120.45, 133.39, 138.24, 138.81, 149.56, 139.71, 145.71, 158.1, 150.12, 140.91], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 100.8, 99.77, 99.3, 98.37, 95.79, 95.37, 99.13, 102.64, 104.3, 104.35, 107.61, 108.86, 108.92, 110.93, 108.16, 108.77, 109.16, 108.66, 109.95], top10Return: 40.9, spyReturn: 10, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 99.66, 101.05, 103.04, 93.32, 97.9, 100.02, 100.35, 97.27, 96.33, 99.31, 93.14, 95.85, 103.7, 112.96, 117.97, 119.77, 129.8, 129.38, 133.18, 143.48, 134.04, 139.75, 151.56, 143.95, 135.19], spy: [100, 100.11, 99.91, 100.65, 98.27, 98.79, 99.98, 99.96, 98.8, 96.59, 95.68, 93.55, 95.11, 98.53, 102.98, 103.53, 104.51, 106.97, 107.19, 107.71, 109.7, 106.96, 107.57, 107.95, 107.46, 108.73], top10Return: 35.2, spyReturn: 8.7, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 100.72, 104.03, 106.22, 106.3, 107.63, 108.67, 106.8, 108.07, 111.09, 117.1, 121.24, 119.14, 124.59, 124.71, 124.52, 129.98, 131.57, 128.07, 119.04, 113.65, 121.85, 125.69, 119.22, 123.3, 122.83, 126.64, 126.26, 128.16, 130.69, 118.42, 124.34, 126.03, 127.52, 123.48, 122.33, 126.21, 118.32, 121.76, 131.91, 143.66, 150.16, 152.51, 165.43, 164.99, 169.94, 183.15, 171.06, 178.63, 194.05, 184.14, 172.51], spy: [100, 100.67, 101.3, 102.62, 101.69, 102.46, 103.64, 103.97, 103.93, 104.54, 106.48, 107.44, 106.93, 108.21, 106.82, 108.16, 110.4, 110.1, 109.79, 107.25, 106.18, 109.6, 110.14, 109.67, 110.34, 110.69, 111.1, 111.23, 111, 111.82, 109.17, 109.76, 110.28, 111.06, 109.77, 107.31, 106.3, 103.93, 105.66, 109.47, 114.41, 115.03, 116.11, 118.84, 119.09, 119.66, 121.88, 118.83, 119.51, 119.93, 119.39, 120.8], top10Return: 72.5, spyReturn: 20.8, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Semiconductors': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: -5.7, spyReturn: -0.2, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 92.8, 85.93, 88.75, 83.63], spy: [100, 99.86, 99.73, 100.6, 100.4], top10Return: -16.4, spyReturn: 0.4, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.43, 95.13, 104.34, 105.85, 112.13, 106.31, 107.45, 115.55, 119.41, 108.23, 108.23, 107.6, 113.23, 107.04, 110.61, 115.47, 107.01, 99.02, 102.29, 96.34], spy: [100, 99.71, 98.13, 99.8, 100.34, 102.11, 101.5, 100.24, 101.02, 100.7, 99.24, 99.24, 99.19, 99.33, 98.62, 100.24, 101.02, 100.88, 100.75, 101.63, 101.43], top10Return: -3.6, spyReturn: 1.4, xLabels: ["Jun 9", "Jun 16", "Jun 23", "Jun 30", "Jul 7"] },
    'YTD': { top10: [100, 109.74, 113.64, 116.38, 117.24, 121.55, 123.01, 124.94, 120.73, 127.59, 134.04, 135.17, 126.97, 138.76, 154.55, 165.8, 177.03, 179.52, 189.81, 194.71, 205.5, 207.92, 212.79, 228.03, 212.81, 189.75], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 100.8, 99.77, 99.3, 98.37, 95.79, 95.37, 99.13, 102.64, 104.3, 104.35, 107.61, 108.86, 108.92, 110.93, 108.16, 108.77, 109.16, 108.66, 109.95], top10Return: 89.8, spyReturn: 10, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 105.82, 109.59, 112.63, 108.89, 115.22, 115.87, 116.54, 113.52, 119.06, 127.59, 125.31, 122.83, 134.59, 150.86, 165.14, 173.25, 173.84, 175.28, 183.8, 193.99, 197.13, 200.76, 214.91, 200.43, 178.89], spy: [100, 100.11, 99.91, 100.65, 98.27, 98.79, 99.98, 99.96, 98.8, 96.59, 95.68, 93.55, 95.11, 98.53, 102.98, 103.53, 104.51, 106.97, 107.19, 107.71, 109.7, 106.96, 107.57, 107.95, 107.46, 108.73], top10Return: 78.9, spyReturn: 8.7, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 102.47, 107.13, 106.52, 105.19, 106.54, 110.02, 111.22, 111.43, 112.87, 118, 121.92, 120.9, 128.04, 126.93, 131.06, 134.53, 136.76, 140.5, 130.72, 133.56, 143.03, 149.08, 143.9, 143.37, 141, 149.95, 154.69, 158.61, 167.23, 162.52, 169.76, 173.92, 176.19, 165.81, 154.24, 162.38, 159.29, 167.11, 180.59, 197.3, 211.8, 221.97, 243.57, 230.11, 236.05, 247.9, 236.61, 256.99, 266.9, 253.59, 226.53], spy: [100, 100.67, 101.3, 102.62, 101.69, 102.46, 103.64, 103.97, 103.93, 104.54, 106.48, 107.44, 106.93, 108.21, 106.82, 108.16, 110.4, 110.1, 109.79, 107.25, 106.18, 109.6, 110.14, 109.67, 110.34, 110.69, 111.1, 111.23, 111, 111.82, 109.17, 109.76, 110.28, 111.06, 109.77, 107.31, 106.3, 103.93, 105.66, 109.47, 114.41, 115.03, 116.11, 118.84, 119.09, 119.66, 121.88, 118.83, 119.51, 119.93, 119.39, 120.8], top10Return: 126.5, spyReturn: 20.8, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Broad Tech': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: -2.3, spyReturn: -0.2, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 98.08, 94.7, 96.09, 94.32], spy: [100, 99.86, 99.73, 100.6, 100.4], top10Return: -5.7, spyReturn: 0.4, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.2, 95.84, 100.12, 100.58, 104.17, 102.73, 102.11, 104.06, 104.23, 101.14, 100.68, 99.59, 100.48, 99.49, 102, 103.82, 101.79, 98.24, 99.69, 97.83], spy: [100, 99.71, 98.13, 99.8, 100.34, 102.11, 101.5, 100.24, 101.02, 100.7, 99.24, 99.24, 99.19, 99.33, 98.62, 100.24, 101.02, 100.88, 100.75, 101.63, 101.43], top10Return: -1.9, spyReturn: 1.4, xLabels: ["Jun 9", "Jun 16", "Jun 23", "Jun 30", "Jul 7"] },
    'YTD': { top10: [100, 103.16, 105.26, 104.89, 102.07, 100.23, 102.2, 103.04, 102.1, 102.6, 102.54, 100.18, 97.53, 105.02, 111.09, 115.97, 114.03, 126.21, 125.61, 124.61, 131.34, 126.55, 128.61, 133.46, 130.23, 123.87], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 100.8, 99.77, 99.3, 98.37, 95.79, 95.37, 99.13, 102.64, 104.3, 104.35, 107.61, 108.86, 108.92, 110.93, 108.16, 108.77, 109.16, 108.66, 109.95], top10Return: 23.9, spyReturn: 10, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 100.37, 100.87, 100.67, 92.78, 96.06, 98.97, 100.41, 98.4, 97.1, 98.22, 93.85, 95.89, 100.86, 108.71, 111.28, 113.25, 120.75, 118.96, 119.44, 125.85, 121.34, 123.22, 127.74, 124.8, 118.87], spy: [100, 100.11, 99.91, 100.65, 98.27, 98.79, 99.98, 99.96, 98.8, 96.59, 95.68, 93.55, 95.11, 98.53, 102.98, 103.53, 104.51, 106.97, 107.19, 107.71, 109.7, 106.96, 107.57, 107.95, 107.46, 108.73], top10Return: 18.9, spyReturn: 8.7, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 100.5, 102.38, 103.46, 102.86, 102.59, 104.32, 103.88, 105.05, 106.13, 110.21, 114.96, 114.7, 117.8, 119.31, 118.86, 121.31, 121.7, 119.45, 110.88, 108.22, 113.84, 115.72, 111.59, 115.19, 113.3, 116.95, 118.07, 119.92, 120.56, 112.92, 116.38, 118.52, 120.48, 118.78, 117.12, 119.29, 115.37, 116.83, 120.93, 127.97, 132.04, 133.17, 139.41, 138.06, 140.55, 147.4, 140.34, 144.79, 150.26, 146.97, 138.45], spy: [100, 100.67, 101.3, 102.62, 101.69, 102.46, 103.64, 103.97, 103.93, 104.54, 106.48, 107.44, 106.93, 108.21, 106.82, 108.16, 110.4, 110.1, 109.79, 107.25, 106.18, 109.6, 110.14, 109.67, 110.34, 110.69, 111.1, 111.23, 111, 111.82, 109.17, 109.76, 110.28, 111.06, 109.77, 107.31, 106.3, 103.93, 105.66, 109.47, 114.41, 115.03, 116.11, 118.84, 119.09, 119.66, 121.88, 118.83, 119.51, 119.93, 119.39, 120.8], top10Return: 38.4, spyReturn: 20.8, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Electrification': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: -3.1, spyReturn: -0.2, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 98.79, 95.8, 96.08, 95.09], spy: [100, 99.86, 99.73, 100.6, 100.4], top10Return: -4.9, spyReturn: 0.4, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.81, 95.62, 99.53, 100.47, 102.74, 102.05, 101.75, 103.1, 104.65, 102.21, 100.45, 99.76, 100.32, 97.54, 99.48, 100.95, 99.64, 96.61, 96.91, 95.83], spy: [100, 99.71, 98.13, 99.8, 100.34, 102.11, 101.5, 100.24, 101.02, 100.7, 99.24, 99.24, 99.19, 99.33, 98.62, 100.24, 101.02, 100.88, 100.75, 101.63, 101.43], top10Return: -4.5, spyReturn: 1.4, xLabels: ["Jun 9", "Jun 16", "Jun 23", "Jun 30", "Jul 7"] },
    'YTD': { top10: [100, 103.61, 108.25, 111.14, 110.46, 113.71, 114.8, 118.19, 114.46, 112.95, 114.82, 115.01, 111.35, 118.11, 122.45, 126.86, 128.5, 136.61, 136.01, 132.3, 137.73, 132.44, 130.72, 134.66, 128.13, 123.95], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 100.8, 99.77, 99.3, 98.37, 95.79, 95.37, 99.13, 102.64, 104.3, 104.35, 107.61, 108.86, 108.92, 110.93, 108.16, 108.77, 109.16, 108.66, 109.95], top10Return: 23.9, spyReturn: 10, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 103.11, 106.81, 109.05, 106.31, 111.07, 111.37, 114.52, 108.93, 108.71, 110.59, 109.43, 109.07, 115.77, 120.27, 124.49, 128.86, 130.65, 128.64, 127.56, 132.69, 127.73, 126.09, 129.88, 123.65, 119.63], spy: [100, 100.11, 99.91, 100.65, 98.27, 98.79, 99.98, 99.96, 98.8, 96.59, 95.68, 93.55, 95.11, 98.53, 102.98, 103.53, 104.51, 106.97, 107.19, 107.71, 109.7, 106.96, 107.57, 107.95, 107.46, 108.73], top10Return: 19.6, spyReturn: 8.7, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 101.91, 104.83, 106.61, 104.02, 104.56, 107.04, 108.04, 107.61, 108.77, 110.12, 113.76, 113.22, 119.19, 122.15, 123.21, 123.95, 124.48, 124.46, 119.91, 117.63, 122.35, 124.75, 122.32, 124.81, 123.18, 125.29, 128.82, 131.89, 133.45, 129.95, 130.97, 133.21, 136.4, 131.94, 132.6, 134.45, 133.43, 136.63, 141.9, 147.03, 148.25, 152.35, 156.5, 155.8, 152.63, 157.71, 154.14, 152.31, 153.69, 146.73, 142.8], spy: [100, 100.67, 101.3, 102.62, 101.69, 102.46, 103.64, 103.97, 103.93, 104.54, 106.48, 107.44, 106.93, 108.21, 106.82, 108.16, 110.4, 110.1, 109.79, 107.25, 106.18, 109.6, 110.14, 109.67, 110.34, 110.69, 111.1, 111.23, 111, 111.82, 109.17, 109.76, 110.28, 111.06, 109.77, 107.31, 106.3, 103.93, 105.66, 109.47, 114.41, 115.03, 116.11, 118.84, 119.09, 119.66, 121.88, 118.83, 119.51, 119.93, 119.39, 120.8], top10Return: 42.8, spyReturn: 20.8, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Industrials': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: -2.1, spyReturn: -0.2, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 98.64, 98.06, 98.46, 97.5], spy: [100, 99.86, 99.73, 100.6, 100.4], top10Return: -2.5, spyReturn: 0.4, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 100.02, 98.28, 100.78, 101.22, 101.21, 100.32, 101.4, 101.56, 102.52, 101.11, 101.65, 101.55, 101.96, 101.03, 102.63, 103.03, 101.57, 100.86, 101.27, 100.24], spy: [100, 99.71, 98.13, 99.8, 100.34, 102.11, 101.5, 100.24, 101.02, 100.7, 99.24, 99.24, 99.19, 99.33, 98.62, 100.24, 101.02, 100.88, 100.75, 101.63, 101.43], top10Return: 0, spyReturn: 1.4, xLabels: ["Jun 9", "Jun 16", "Jun 23", "Jun 30", "Jul 7"] },
    'YTD': { top10: [100, 105.14, 110.48, 110.36, 109.83, 115.16, 118.01, 119.34, 118.28, 114.09, 113.18, 111.95, 109.47, 116.88, 119.72, 120, 118.22, 125.56, 124.38, 120.1, 125.44, 123, 123.28, 126.51, 126.72, 123.09], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 100.8, 99.77, 99.3, 98.37, 95.79, 95.37, 99.13, 102.64, 104.3, 104.35, 107.61, 108.86, 108.92, 110.93, 108.16, 108.77, 109.16, 108.66, 109.95], top10Return: 23.1, spyReturn: 10, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 103.69, 106.17, 106.08, 105.55, 110.46, 114.6, 114.71, 110.52, 107.55, 107.5, 105.94, 107.79, 112.23, 115.63, 115.05, 116.75, 118.08, 117.6, 114.94, 120.03, 117.76, 117.98, 121.06, 121.31, 117.83], spy: [100, 100.11, 99.91, 100.65, 98.27, 98.79, 99.98, 99.96, 98.8, 96.59, 95.68, 93.55, 95.11, 98.53, 102.98, 103.53, 104.51, 106.97, 107.19, 107.71, 109.7, 106.96, 107.57, 107.95, 107.46, 108.73], top10Return: 17.8, spyReturn: 8.7, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 101.55, 101.76, 104.07, 102.73, 103.13, 103.97, 104.81, 104.63, 105.56, 107.74, 109, 109.16, 111.92, 109.67, 110.61, 113.53, 112.94, 111.48, 106.56, 104.85, 107.47, 109.98, 110.98, 113.02, 111.41, 116.5, 121.03, 123.27, 123.23, 124.4, 128.72, 132.08, 131.8, 127.05, 123.71, 123.63, 122.99, 125.47, 131.15, 132.37, 132.75, 134.36, 137.73, 135.63, 133.9, 138.04, 136.03, 136.53, 140.23, 140.3, 136.18], spy: [100, 100.67, 101.3, 102.62, 101.69, 102.46, 103.64, 103.97, 103.93, 104.54, 106.48, 107.44, 106.93, 108.21, 106.82, 108.16, 110.4, 110.1, 109.79, 107.25, 106.18, 109.6, 110.14, 109.67, 110.34, 110.69, 111.1, 111.23, 111, 111.82, 109.17, 109.76, 110.28, 111.06, 109.77, 107.31, 106.3, 103.93, 105.66, 109.47, 114.41, 115.03, 116.11, 118.84, 119.09, 119.66, 121.88, 118.83, 119.51, 119.93, 119.39, 120.8], top10Return: 36.2, spyReturn: 20.8, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Meme': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: -3.4, spyReturn: -0.2, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 96.69, 92.01, 92.77, 91.2], spy: [100, 99.86, 99.73, 100.6, 100.4], top10Return: -8.8, spyReturn: 0.4, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 96.44, 93.79, 99.87, 98.57, 104.08, 100.79, 100.85, 103.45, 104.53, 100.06, 99.23, 95.89, 95.4, 93.4, 97.45, 99.17, 95.85, 91.17, 91.96, 90.39], spy: [100, 99.71, 98.13, 99.8, 100.34, 102.11, 101.5, 100.24, 101.02, 100.7, 99.24, 99.24, 99.19, 99.33, 98.62, 100.24, 101.02, 100.88, 100.75, 101.63, 101.43], top10Return: -8.8, spyReturn: 1.4, xLabels: ["Jun 9", "Jun 16", "Jun 23", "Jun 30", "Jul 7"] },
    'YTD': { top10: [100, 106.79, 105.55, 105.8, 99.62, 97, 92.49, 93.9, 93.55, 93.42, 93.3, 93.3, 88.57, 99.36, 111.62, 115.3, 112.29, 125.63, 125.75, 132.15, 142.13, 127.99, 128.57, 131.93, 123.36, 114.59], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 100.8, 99.77, 99.3, 98.37, 95.79, 95.37, 99.13, 102.64, 104.3, 104.35, 107.61, 108.86, 108.92, 110.93, 108.16, 108.77, 109.16, 108.66, 109.95], top10Return: 14.6, spyReturn: 10, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 101.73, 97.71, 96.18, 85.68, 87.84, 85.69, 87.81, 87.46, 86.36, 85.75, 83.49, 85.28, 94.16, 105.3, 102.77, 108.2, 113.94, 113.88, 121.56, 130.6, 117.73, 118.53, 121.32, 113.71, 105.83], spy: [100, 100.11, 99.91, 100.65, 98.27, 98.79, 99.98, 99.96, 98.8, 96.59, 95.68, 93.55, 95.11, 98.53, 102.98, 103.53, 104.51, 106.97, 107.19, 107.71, 109.7, 106.96, 107.57, 107.95, 107.46, 108.73], top10Return: 5.8, spyReturn: 8.7, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 103.69, 101.29, 95.47, 92.25, 91.36, 89.96, 87.13, 84.54, 83.79, 87.46, 91.38, 88.85, 88.32, 90.7, 90.96, 88.16, 92.68, 90.52, 89.87, 84.35, 87.23, 88.82, 84.21, 86.51, 88.07, 91.77, 93.34, 90.71, 92.88, 88.4, 89.86, 89.94, 88.77, 93.01, 96.64, 96.91, 96.41, 94.65, 100.63, 106.48, 111, 103.26, 110.97, 115.94, 115.65, 115.27, 113.74, 111.72, 110.23, 104.76, 101.05], spy: [100, 100.67, 101.3, 102.62, 101.69, 102.46, 103.64, 103.97, 103.93, 104.54, 106.48, 107.44, 106.93, 108.21, 106.82, 108.16, 110.4, 110.1, 109.79, 107.25, 106.18, 109.6, 110.14, 109.67, 110.34, 110.69, 111.1, 111.23, 111, 111.82, 109.17, 109.76, 110.28, 111.06, 109.77, 107.31, 106.3, 103.93, 105.66, 109.47, 114.41, 115.03, 116.11, 118.84, 119.09, 119.66, 121.88, 118.83, 119.51, 119.93, 119.39, 120.8], top10Return: 1.1, spyReturn: 20.8, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
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
export const SCAN_TIMESTAMP    = '2026-07-07T13:37:31.240Z';
export const SCAN_TIMESTAMP_NY = 'July 7, 2026 at 9:37 AM ET';
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
export const HOLDINGS_COUNT = 1291;
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
  { ticker: 'MU', name: `Micron Technology Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 12.60, bestProScore: 5.11, avgProScore: 4.20, price: 916.69, weeklyChange: -20.58 },
  { ticker: 'NVDA', name: `NVIDIA Corp`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 12.02, bestProScore: 5.84, avgProScore: 4.01, price: 192.47, weeklyChange: -3.81 },
  { ticker: 'AMD', name: `Advanced Micro Devices Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 11.05, bestProScore: 5.13, avgProScore: 3.68, price: 511.80, weeklyChange: -11.90 },
  { ticker: 'AVGO', name: `Broadcom Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 6.56, bestProScore: 2.86, avgProScore: 2.19, price: 366.42, weeklyChange: -3.00 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.79, bestProScore: 2.95, avgProScore: 2.40, price: 434.48, weeklyChange: -9.02 },
  { ticker: 'INTC', name: `INTEL CORPORATION`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.67, bestProScore: 3.44, avgProScore: 2.33, price: 111.87, weeklyChange: -19.88 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.08, bestProScore: 2.31, avgProScore: 2.04, price: 231.01, weeklyChange: -22.45 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 4.05, bestProScore: 2.13, avgProScore: 2.02, price: 230.80, weeklyChange: -19.40 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 3.77, bestProScore: 2.47, avgProScore: 1.89, price: 324.56, weeklyChange: -25.10 },
  { ticker: 'ALAB', name: `Astera Labs Inc`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 3.40, bestProScore: 1.90, avgProScore: 1.70, price: 397.55, weeklyChange: -17.69 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': -14.7, '1M': -1.7, 'YTD': 92.6, '6M': 78.9, '1Y': 163.7 },
  ARTY: { '1W': -7.6, '1M': -4.8, 'YTD': 46.1, '6M': 39.8, '1Y': 72 },
  BAI:  { '1W': -13, '1M': -4.1, 'YTD': 37.7, '6M': 33.5, '1Y': 59.3 },
  IGPT: { '1W': -9, '1M': -0.4, 'YTD': 59.3, '6M': 51.1, '1Y': 95.6 },
  IVES: { '1W': -0.9, '1M': 0, 'YTD': 19.4, '6M': 15.6, '1Y': 39.6 },
  ALAI: { '1W': -1.8, '1M': 2.9, 'YTD': 24.1, '6M': 21.1, '1Y': 47.2 },
  CHAT: { '1W': -11, '1M': -6.2, 'YTD': 48.9, '6M': 43.2, '1Y': 82.5 },
  AIFD: { '1W': -6.2, '1M': -2, 'YTD': 38.4, '6M': 33.9, '1Y': 69.7 },
  SPRX: { '1W': -14.4, '1M': -7.8, 'YTD': 28.9, '6M': 23, '1Y': 67.3 },
  AOTG: { '1W': -2.8, '1M': 2.6, 'YTD': 13.7, '6M': 11.7, '1Y': 28.3 },
  // Semiconductors
  SOXX: { '1W': -13.7, '1M': -3.2, 'YTD': 83.7, '6M': 70.3, '1Y': 131.7 },
  PSI:  { '1W': -20.3, '1M': -1.9, 'YTD': 89.8, '6M': 71.1, '1Y': 147.3 },
  XSD:  { '1W': -13, '1M': -9, 'YTD': 68.8, '6M': 57.4, '1Y': 110.4 },
  DRAM: { '1W': -18.5, '1M': -0.5, 'YTD': 116.8, '6M': 116.8, '1Y': 116.8 },
  // Broad Tech
  PTF:  { '1W': -19.4, '1M': -11.8, 'YTD': 43.6, '6M': 35.7, '1Y': 61.4 },
  WCLD: { '1W': 8.8, '1M': 9.6, 'YTD': -0.4, '6M': -2.3, '1Y': -4.6 },
  IGV:  { '1W': 5.5, '1M': -0.1, 'YTD': -9.6, '6M': -10, '1Y': -13.7 },
  FDTX: { '1W': -7.1, '1M': -1.6, 'YTD': 32, '6M': 27.4, '1Y': 38.1 },
  GTEK: { '1W': -7.2, '1M': 0.6, 'YTD': 46, '6M': 39.1, '1Y': 62.2 },
  ARKK: { '1W': 2.5, '1M': 9.2, 'YTD': 7.7, '6M': 2.1, '1Y': 17.7 },
  MARS: { '1W': -7.3, '1M': -13.8, 'YTD': 20.9, '6M': 20.9, '1Y': 20.9 },
  FRWD: { '1W': -6.4, '1M': -0.5, 'YTD': 26.8, '6M': 26.8, '1Y': 26.8 },
  BCTK: { '1W': -0.9, '1M': 5.7, 'YTD': 24.3, '6M': 21.1, '1Y': 26.6 },
  FWD:  { '1W': -8.3, '1M': -1.2, 'YTD': 30.1, '6M': 22.6, '1Y': 52.8 },
  CBSE: { '1W': -1.9, '1M': 5.3, 'YTD': 28.3, '6M': 21.3, '1Y': 37 },
  FCUS: { '1W': -13.1, '1M': -11.5, 'YTD': 24.1, '6M': 13.3, '1Y': 50.2 },
  WGMI: { '1W': -13.6, '1M': -17.1, 'YTD': 42.4, '6M': 25.8, '1Y': 119 },
  CNEQ: { '1W': -3.7, '1M': 1.1, 'YTD': 15.6, '6M': 13.1, '1Y': 36.3 },
  SGRT: { '1W': -11.9, '1M': -5.5, 'YTD': 32.1, '6M': 26.1, '1Y': 65.2 },
  SPMO: { '1W': -7.7, '1M': 0.8, 'YTD': 25, '6M': 24.1, '1Y': 33.1 },
  XMMO: { '1W': -4.9, '1M': -2.2, 'YTD': 16.9, '6M': 13.7, '1Y': 24.6 },
  // Electrification
  POW:  { '1W': -10.1, '1M': -5.3, 'YTD': 41.6, '6M': 37.1, '1Y': 37.5 },
  VOLT: { '1W': -8, '1M': -0.1, 'YTD': 33.2, '6M': 30.5, '1Y': 50.3 },
  PBD:  { '1W': 1.5, '1M': -6, 'YTD': 21.3, '6M': 16.3, '1Y': 50.7 },
  PBW:  { '1W': -6.5, '1M': -10.9, 'YTD': 19.4, '6M': 10, '1Y': 71.3 },
  IVEP: { '1W': -1.4, '1M': -0.1, 'YTD': 4.2, '6M': 4.2, '1Y': 4.2 },
  // Industrials
  AIRR: { '1W': -6.6, '1M': -2.8, 'YTD': 26.6, '6M': 19.1, '1Y': 48.9 },
  PRN:  { '1W': -11.7, '1M': -2.6, 'YTD': 31.9, '6M': 25.3, '1Y': 46 },
  RSHO: { '1W': 1.2, '1M': 4.4, 'YTD': 39.4, '6M': 36.1, '1Y': 54.8 },
  IDEF: { '1W': 4.5, '1M': 3.9, 'YTD': 7.8, '6M': -0.5, '1Y': 18.3 },
  BILT: { '1W': 0, '1M': -2.7, 'YTD': 9.7, '6M': 9.2, '1Y': 13 },
  // Meme
  BUZZ: { '1W': 0.8, '1M': 0.1, 'YTD': 13.5, '6M': 6.6, '1Y': 21.4 },
  MEME: { '1W': -15.2, '1M': -19.1, 'YTD': 31.7, '6M': 12.3, '1Y': -16.8 },
  RKNG: { '1W': -11.9, '1M': -7.5, 'YTD': -1.4, '6M': -1.4, '1Y': -1.4 },
};
// @@END_GENERATED:ETF_RETURNS@@

// @@GENERATED:ETF_DAY_CHANGE@@
// Today's % move per ETF ticker (1D, vs prior close). Refreshed by the 3×/day
// price jobs. Powers the 1D ranking in the theme-ETF side panel.
export const ETF_DAY_CHANGE: Record<string, number> = {
  AIS:  -5.56,
  ARTY: -2.88,
  BAI:  -4.9,
  IGPT: -3.39,
  IVES: -1.18,
  ALAI: -0.19,
  CHAT: -3.42,
  SPRX: -4.05,
  AOTG: -2.15,
  SOXX: -4.87,
  PSI:  -6.19,
  XSD:  -4.91,
  DRAM: -6.81,
  PTF:  -5.13,
  WCLD: 2.2,
  IGV:  0.8,
  FDTX: -2.27,
  ARKK: -0.78,
  MARS: -3,
  FRWD: -2.68,
  FWD:  -3.07,
  FCUS: -4.11,
  WGMI: -3.49,
  CNEQ: -1.66,
  SGRT: -4.09,
  SPMO: -2.48,
  XMMO: -1.8,
  POW:  -3.93,
  VOLT: -2.78,
  PBW:  -2.72,
  AIRR: -1.95,
  PRN:  -3.18,
  IDEF: -1.17,
  MEME: -4.31,
  RKNG: -2.59,
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
  'AI & ML': { etfs: ['AIS', 'SPRX', 'IVES'], series: { '1W': [100, 95.59, 90.79, 93.28, 89.99], '1M': [100, 97.63, 94.68, 100.72, 101.51, 106.39, 102.67, 103.45, 107.99, 109.23, 102.62, 102.62, 101.42, 103.4, 100.7, 104.7, 107.97, 103.06, 97.77, 100.48, 96.84], 'YTD': [100, 103.29, 107, 107.92, 106.62, 105.08, 104.9, 106.4, 102.11, 103.97, 106.19, 103.2, 97.72, 108.21, 116, 124.4, 122.1, 135.51, 143.6, 145.7, 157.46, 146.45, 154.69, 168.32, 160.47, 146.98], '6M': [100, 101.14, 103.16, 105.03, 93.6, 98.86, 100.21, 101.73, 97.94, 97.02, 100.39, 93.62, 95.9, 104.21, 113.39, 118.55, 119.76, 130.53, 132.51, 138.02, 149.14, 138.73, 146.45, 159.2, 151.84, 139.2], '1Y': [100, 100.33, 104.67, 107.08, 107.31, 109.42, 109.77, 107.95, 109.79, 113.59, 121.67, 127.81, 125.15, 132.78, 133.77, 132.48, 138.8, 140.81, 136.97, 124.94, 118.02, 127.89, 132.97, 123.64, 130.39, 129.24, 134.69, 136.25, 139.23, 141.74, 126.54, 133.84, 135.45, 137.88, 132.48, 131.26, 136.06, 126.82, 129.97, 141.68, 154.09, 161.43, 163.3, 178.15, 180.87, 188.46, 203.71, 189.45, 200.57, 218.9, 208.35, 190.2] }, returns: { '1W': -10, '1M': -3.2, 'YTD': 47, '6M': 39.2, '1Y': 90.2 } },
  'Semiconductors': { etfs: ['DRAM', 'PSI', 'XSD'], series: { '1W': [100, 92.54, 85.12, 88.08, 82.73], '1M': [100, 98.45, 95.25, 104.89, 106.35, 112.85, 107.27, 108.29, 116.76, 121, 109.12, 109.12, 108.37, 114.5, 108.31, 111.64, 116.58, 107.7, 99, 102.47, 96.19], 'YTD': [100, 110.95, 114.2, 117.01, 117.99, 123.49, 124.76, 126.52, 123.92, 132.61, 141.07, 142.48, 132.92, 144.02, 161.59, 173.28, 186.23, 183.25, 194.61, 201.53, 211.01, 217.48, 217.72, 231.54, 215.74, 191.78], '6M': [100, 107.04, 110.34, 113.12, 111.24, 117.56, 117.62, 118.78, 116.71, 124.87, 135.22, 133.34, 128.93, 139.79, 158.49, 172.83, 183.21, 178.4, 181.53, 191.24, 200.27, 207.46, 206.51, 219.34, 204.2, 181.77], '1Y': [100, 102.59, 108.36, 107.72, 106.7, 108.21, 111.92, 113.52, 114.33, 115.75, 121.35, 124.89, 123.66, 130.47, 129.47, 133.85, 136.92, 139.3, 145.18, 134.71, 140.27, 149.26, 155.11, 150.27, 148.74, 145.43, 154.58, 159.92, 162.8, 172.56, 170.51, 177.28, 182.21, 185.11, 173.92, 159.56, 169.02, 166.49, 175.4, 186.81, 205.04, 217.97, 230.94, 252.13, 235.82, 241.48, 251.09, 240.13, 259.42, 264.43, 252.36, 224.82] }, returns: { '1W': -17.3, '1M': -3.8, 'YTD': 91.8, '6M': 81.8, '1Y': 124.8 } },
  'Broad Tech': { etfs: ['WGMI', 'GTEK', 'SGRT'], series: { '1W': [100, 95.51, 89.61, 92.48, 89.11], '1M': [100, 97.71, 94.08, 99.76, 101.57, 105.84, 104.24, 104.27, 107.8, 109.09, 105.13, 105.13, 102.79, 103.1, 101.9, 102.06, 103.84, 99.28, 93.28, 96.16, 92.65], 'YTD': [100, 107.13, 111.83, 113.61, 108.48, 105.77, 108.54, 111.6, 104.94, 104.63, 107.38, 105.71, 100, 112.99, 121.65, 128.6, 122.72, 145.44, 145.68, 145.6, 157.37, 146.68, 154.52, 166.13, 154.92, 140.19], '6M': [100, 103.7, 103.86, 105.78, 91.16, 99.26, 100.77, 104.59, 98, 96.03, 99.4, 94.65, 95.8, 107.21, 117.33, 120.43, 120.5, 132.83, 130.9, 135.08, 145.91, 136.1, 143.32, 154.02, 143.83, 130.34], '1Y': [100, 101.84, 103.42, 104.51, 103.55, 104.44, 109.59, 110.92, 116.51, 115.98, 128.33, 138.68, 139.06, 148.09, 157.54, 155.35, 159.3, 161.14, 152.04, 130.89, 127.89, 142.01, 141.96, 130.86, 137.86, 133.16, 140.14, 146.98, 148.17, 151.69, 132.64, 139.6, 139.66, 143.18, 135.26, 132.48, 137.91, 138.41, 137.89, 150.16, 162.89, 168.89, 171.61, 187.05, 183.8, 194.08, 208.21, 190.74, 203.73, 214.87, 204.32, 182.12] }, returns: { '1W': -10.9, '1M': -7.3, 'YTD': 40.2, '6M': 30.3, '1Y': 82.1 } },
  'Electrification': { etfs: ['PBW', 'VOLT', 'POW'], series: { '1W': [100, 96.87, 93.53, 94.83, 91.79], '1M': [100, 98.75, 95.48, 99.9, 100.73, 103.46, 102.3, 102.41, 104.83, 105.96, 101.15, 101.15, 100.38, 101.18, 98.21, 100.64, 103.1, 99.83, 96.42, 97.72, 94.57], 'YTD': [100, 104.13, 109.93, 112.37, 112.23, 115.87, 118.59, 122.22, 115.66, 115.96, 117.64, 117.83, 115.01, 122.19, 127.41, 134.02, 135.5, 147.78, 147.19, 142.71, 147.45, 137.89, 140.02, 147.35, 139.96, 131.42], '6M': [100, 103.69, 108.5, 110.11, 106.1, 112.47, 114.21, 116.71, 109.4, 109.83, 112.42, 109.58, 111.32, 119.72, 125.21, 132.06, 136.72, 140.28, 136.78, 136.56, 140.96, 131.92, 134.03, 141.11, 134.1, 125.88], '1Y': [100, 102.13, 105.44, 107.09, 104.24, 104.43, 106.96, 107.88, 107.95, 108.29, 109.79, 114.92, 115.08, 121.79, 125.24, 126.25, 127.08, 127.2, 128.2, 121.75, 119.92, 126.22, 129.24, 126.44, 130.99, 128.82, 129.54, 134.22, 137.75, 139.06, 134.28, 135.53, 138.67, 143.31, 139.11, 140.83, 143.64, 142.57, 146.91, 153.48, 158.82, 159.94, 164.32, 168.16, 167.82, 163.56, 168.91, 164.71, 166.46, 169.36, 161.85, 153.03] }, returns: { '1W': -8.2, '1M': -5.4, 'YTD': 31.4, '6M': 25.9, '1Y': 53 } },
  'Industrials': { etfs: ['RSHO', 'PRN', 'BILT'], series: { '1W': [100, 98.4, 97.33, 97.11, 96.53], '1M': [100, 100.21, 99.15, 100.32, 101.32, 100.74, 99.08, 101.09, 101.49, 103.13, 101.95, 102.85, 102.85, 103.04, 102.34, 104.16, 103.9, 102.18, 100.93, 100.71, 100.05], 'YTD': [100, 102.86, 107.52, 107.45, 108.27, 114.39, 118.7, 119.6, 118.27, 113.44, 112.38, 112.2, 109.5, 116.62, 120.71, 121, 120.71, 127.83, 127.82, 122.75, 128.29, 127.06, 126.63, 131.38, 132.72, 127.01], '6M': [100, 102.49, 105.15, 105.77, 106.45, 112.56, 116.21, 117.23, 112.69, 109.4, 108.91, 108.73, 109.81, 114.6, 118.51, 119.08, 120.7, 122.27, 123.47, 119.38, 124.72, 123.57, 123.11, 127.62, 128.98, 123.53], '1Y': [100, 101.47, 101.87, 104.27, 102.27, 102.42, 102.53, 103.66, 103.27, 104.2, 106, 106.53, 106.53, 108.57, 106.59, 107.81, 110.77, 110.12, 109.41, 105.08, 103.47, 105.93, 108.08, 108.75, 110.56, 109.12, 112.85, 115.97, 117.82, 118.72, 122.51, 127.19, 129.57, 129.41, 124.52, 121, 120.33, 122.19, 123.87, 130.08, 129.99, 132.43, 133.61, 138.41, 137.31, 134.9, 137.97, 137.78, 137.59, 142.95, 144.22, 137.91] }, returns: { '1W': -3.5, '1M': 0, 'YTD': 27, '6M': 23.5, '1Y': 37.9 } },
  'Meme': { etfs: ['BUZZ', 'RKNG', 'MEME'], series: { '1W': [100, 96.69, 92.01, 92.77, 91.2], '1M': [100, 96.44, 93.79, 99.87, 98.57, 104.08, 100.79, 100.85, 103.45, 104.53, 100.06, 99.23, 95.89, 95.4, 93.4, 97.45, 99.17, 95.85, 91.17, 91.96, 90.39], 'YTD': [100, 106.79, 105.55, 105.8, 99.62, 97, 92.49, 93.9, 93.55, 93.42, 93.3, 93.3, 88.57, 99.36, 111.62, 115.3, 112.29, 125.63, 125.75, 132.15, 142.13, 127.99, 128.57, 131.93, 123.36, 114.59], '6M': [100, 101.73, 97.71, 96.18, 85.68, 87.84, 85.69, 87.81, 87.46, 86.36, 85.75, 83.49, 85.28, 94.16, 105.3, 102.77, 108.2, 113.94, 113.88, 121.56, 130.6, 117.73, 118.53, 121.32, 113.71, 105.83], '1Y': [100, 103.69, 101.29, 95.47, 92.25, 91.36, 89.96, 87.13, 84.54, 83.79, 87.46, 91.38, 88.85, 88.32, 90.7, 90.96, 88.16, 92.68, 90.52, 89.87, 84.35, 87.23, 88.82, 84.21, 86.51, 88.07, 91.77, 93.34, 90.71, 92.88, 88.4, 89.86, 89.94, 88.77, 93.01, 96.64, 96.91, 96.41, 94.65, 100.63, 106.48, 111, 103.26, 110.97, 115.94, 115.65, 115.27, 113.74, 111.72, 110.23, 104.76, 101.05] }, returns: { '1W': -8.8, '1M': -9.6, 'YTD': 14.6, '6M': 5.8, '1Y': 1 } },
};
// @@END_GENERATED:THEME_REPRESENTATIVES@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 9, avgWeight: 6.49, proScore: 5.84, coverage: 0.9,
      price: 192.47, weeklyPrices: [200.09, 197.58, 194.83, 195.55, 192.47], weeklyChange: -3.81, dayChange: -1.58, sortRank: 0, periodReturns: { '1M': -7.8, 'YTD': 3.2, '6M': 1.8, '1Y': 21.6 },
      priceHistory: { '1D': [195.55, 192.75, 192.47], '1W': [200.09, 197.58, 194.83, 195.55, 192.47], '1M': [208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83, 195.55, 192.47], 'YTD': [186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 192.85, 180.05, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 219.51, 211.14, 205.1, 205.19, 208.65, 194.97, 192.47], '6M': [189.11, 183.14, 184.84, 192.51, 171.88, 186.94, 189.82, 184.89, 183.34, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 225.32, 219.51, 211.14, 205.1, 205.19, 208.65, 194.97, 192.47], '1Y': [158.24, 164.07, 171.38, 176.75, 180, 182.06, 182.01, 177.99, 174.18, 168.31, 177.75, 183.61, 181.85, 185.54, 188.32, 182.64, 191.49, 206.88, 199.05, 186.6, 178.88, 179.92, 185.55, 176.29, 183.69, 187.54, 189.11, 183.14, 184.84, 192.51, 171.88, 186.94, 187.9, 184.89, 183.34, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 225.32, 219.51, 211.14, 205.1, 205.19, 208.65, 194.97, 192.47] },
      velocityScore: { '1D': -0.8, '1W': -3.3, '1M': -1.8, '6M': null }, isNew: false,
      marketCap: '$4.7T', pe: 29.5, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.51,
      etfPresence: { AIS: 2.43, ARTY: 4.48, BAI: 4.08, IGPT: 7.47, IVES: 4.6, ALAI: 12.22, CHAT: 6.88, AIFD: 6.28, SPRX: false, AOTG: 9.98 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 9, avgWeight: 5.7, proScore: 5.13, coverage: 0.9,
      price: 511.8, weeklyPrices: [580.91, 540.88, 517.82, 552.05, 511.80], weeklyChange: -11.9, dayChange: -7.29, sortRank: 0, periodReturns: { '1M': 4.4, 'YTD': 139, '6M': 143.7, '1Y': 279.7 },
      priceHistory: { '1D': [552.05, 511.04, 511.8], '1W': [580.91, 540.88, 517.82, 552.05, 511.8], '1M': [490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 511.8], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 449.59, 516.1, 466.38, 511.57, 551.63, 539.49, 511.8], '6M': [210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 203.68, 199.45, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 449.59, 516.1, 466.38, 511.57, 551.63, 539.49, 511.8], '1Y': [134.8, 146.24, 157, 173.66, 176.78, 172.28, 176.14, 167.76, 162.63, 151.41, 161.16, 159.79, 161.36, 203.71, 216.42, 240.56, 259.67, 259.65, 243.98, 240.52, 203.78, 219.76, 221.11, 207.58, 214.95, 215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 203.37, 203.68, 199.45, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 449.59, 516.1, 466.38, 511.57, 551.63, 539.49, 511.8] },
      velocityScore: { '1D': 3.2, '1W': 1.6, '1M': 11, '6M': null }, isNew: false,
      marketCap: '$835B', pe: 171.7, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 5.19, ARTY: 5.23, BAI: 5.23, IGPT: 8.84, IVES: 4.84, ALAI: 1.31, CHAT: 4.04, AIFD: false, SPRX: 0.64, AOTG: 15.95 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 5.68, proScore: 5.11, coverage: 0.9,
      price: 916.69, weeklyPrices: [1154.29, 1032.28, 975.56, 984.75, 916.69], weeklyChange: -20.58, dayChange: -6.91, sortRank: 0, periodReturns: { '1M': -3.4, 'YTD': 221.2, '6M': 170, '1Y': 664.4 },
      priceHistory: { '1D': [984.75, 916.98, 916.69], '1W': [1154.29, 1032.28, 975.56, 984.75, 916.69], '1M': [949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 916.69], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 762.1, 971, 864.01, 981.61, 1211.38, 1145.28, 916.69], '6M': [339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 415.56, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 762.1, 971, 864.01, 981.61, 1211.38, 1145.28, 916.69], '1Y': [119.92, 118.61, 113.23, 111.25, 107.77, 123.72, 123.55, 117.68, 119.01, 131.46, 157.77, 164.62, 163.9, 190.96, 192.77, 206.77, 220.1, 234.7, 253.3, 241.95, 207.37, 240.46, 246.92, 237.5, 276.59, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 417.35, 415.56, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 762.1, 971, 864.01, 981.61, 1211.38, 1145.28, 916.69] },
      velocityScore: { '1D': -1, '1W': -14.1, '1M': 0, '6M': null }, isNew: false,
      marketCap: '$1.0T', pe: 20.7, revenueGrowth: 346, eps: 44.22, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { AIS: 6.67, ARTY: 4.83, BAI: 6.13, IGPT: 7.74, IVES: 4.55, ALAI: 1.19, CHAT: 3.61, AIFD: 6.53, SPRX: false, AOTG: 9.89 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 8, avgWeight: 3.58, proScore: 2.86, coverage: 0.8,
      price: 366.42, weeklyPrices: [377.75, 369.34, 360.45, 373.90, 366.42], weeklyChange: -3, dayChange: -2, sortRank: 0, periodReturns: { '1M': -7.6, 'YTD': 5.9, '6M': 6.7, '1Y': 33.6 },
      priceHistory: { '1D': [373.9, 366.93, 366.42], '1W': [377.75, 369.34, 360.45, 373.9, 366.42], '1M': [396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45, 373.9, 366.42], 'YTD': [346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 325.49, 313.84, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 414.57, 446.77, 385.73, 382.07, 392.13, 372.45, 366.42], '6M': [343.5, 339.89, 325.49, 330.73, 310.51, 331.17, 332.65, 321.7, 332.77, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 425.19, 414.57, 446.77, 385.73, 382.07, 392.13, 372.45, 366.42], '1Y': [274.18, 275.6, 288.21, 294.3, 297.72, 303.9, 305.76, 294, 297.39, 345.65, 364.09, 338.79, 327.9, 335.49, 356.7, 349.24, 362.05, 362.55, 358.39, 342.65, 340.2, 386.08, 401.1, 339.81, 341.45, 349.85, 343.5, 339.89, 325.49, 330.73, 310.51, 331.17, 333.99, 321.7, 332.77, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 425.19, 414.57, 446.77, 385.73, 382.07, 392.13, 372.45, 366.42] },
      velocityScore: { '1D': 3.6, '1W': 2.5, '1M': 7.1, '6M': null }, isNew: false,
      marketCap: '$1.7T', pe: 60.9, revenueGrowth: 48, eps: 6.02, grossMargin: 76, dividendYield: 0.7,
      etfPresence: { AIS: 0.66, ARTY: 4.42, BAI: 4.2, IGPT: false, IVES: 4.52, ALAI: 3.8, CHAT: 4.47, AIFD: 5.17, SPRX: false, AOTG: 1.4 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 7, avgWeight: 3.3, proScore: 2.31, coverage: 0.7,
      price: 231.01, weeklyPrices: [297.89, 272.05, 245.29, 249.27, 231.01], weeklyChange: -22.45, dayChange: -7.32, sortRank: 0, periodReturns: { '1M': -20, 'YTD': 171.8, '6M': 172.9, '1Y': 222.9 },
      priceHistory: { '1D': [249.27, 232.8, 231.01], '1W': [297.89, 272.05, 245.29, 249.27, 231.01], '1M': [288.85, 266.88, 252.59, 280.71, 279.7, 308.88, 278.67, 289.54, 310.58, 307.86, 279.04, 276.7, 281.26, 266.77, 277.75, 297.89, 272.05, 245.29, 249.27, 231.01], 'YTD': [84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 78.39, 77.51, 93.3, 90.79, 92.36, 99.05, 114.45, 134.6, 157.32, 156.57, 172.15, 177.95, 190.69, 205, 263.47, 279.7, 307.86, 277.75, 231.01], '6M': [84.64, 81.21, 83.1, 81.34, 74.21, 78.23, 79.48, 79.29, 75.68, 87.67, 89.53, 97.68, 107.11, 128.49, 139.69, 164.31, 164.95, 170.13, 176.89, 190.69, 205, 263.47, 279.7, 307.86, 277.75, 231.01], '1Y': [71.55, 72.51, 73.06, 75.91, 76.53, 77.28, 76.74, 73, 62.87, 66, 67.43, 75.53, 82.39, 88.92, 89.39, 85.84, 88.71, 90.37, 93.23, 83.45, 77.45, 91.1, 92, 84.26, 84.8, 86.76, 84.64, 81.21, 83.1, 81.34, 74.21, 78.23, 79.61, 79.29, 75.68, 87.67, 89.53, 97.68, 107.11, 128.49, 139.69, 164.31, 164.95, 170.13, 176.89, 190.69, 205, 263.47, 279.7, 307.86, 277.75, 231.01] },
      velocityScore: { '1D': -0.9, '1W': -8.7, '1M': -0.4, '6M': null }, isNew: false,
      marketCap: '$202B', pe: 79.1, revenueGrowth: 28, eps: 2.92, grossMargin: 52, dividendYield: 0.1,
      etfPresence: { AIS: 3.75, ARTY: 3.99, BAI: 1.83, IGPT: 3.26, IVES: false, ALAI: false, CHAT: 1.51, AIFD: 5.51, SPRX: 3.26, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 5.14, proScore: 3.09, coverage: 0.6,
      price: 368.42, weeklyPrices: [357.37, 361.21, 359.91, 366.46, 368.42], weeklyChange: 3.09, dayChange: 0.53, sortRank: 0, periodReturns: { '1M': 1.4, 'YTD': 17.7, '6M': 14.4, '1Y': 108.4 },
      priceHistory: { '1D': [366.46, 368.32, 368.42], '1W': [357.37, 361.21, 359.91, 366.46, 368.42], '1M': [363.31, 364.26, 356.38, 357.77, 359.68, 369.35, 373.25, 363.79, 368.03, 349.68, 346.13, 345.29, 343.71, 337.39, 353.65, 357.37, 361.21, 359.91, 366.46, 368.42], 'YTD': [313, 325.44, 332.78, 327.93, 338, 322.86, 305.72, 310.9, 303.58, 307.04, 310.92, 290.44, 287.56, 317.32, 337.12, 339.32, 349.94, 398.04, 402.62, 387.66, 380.34, 368.53, 359.68, 349.68, 353.65, 368.42], '6M': [321.98, 335.84, 330.54, 338.25, 331.25, 309, 314.98, 307.38, 300.88, 303.55, 307.13, 280.92, 295.77, 317.24, 341.68, 344.4, 385.69, 400.8, 396.78, 387.66, 380.34, 368.53, 359.68, 349.68, 353.65, 368.42], '1Y': [176.79, 181.56, 190.1, 192.58, 195.04, 201, 203.5, 206.09, 212.91, 234.04, 251.61, 252.53, 244.05, 250.43, 244.15, 256.55, 269.27, 283.72, 290.1, 285.02, 299.66, 314.89, 313.72, 308.22, 309.78, 313.85, 321.98, 335.84, 330.54, 338.25, 331.25, 309, 302.85, 307.38, 300.88, 303.55, 307.13, 280.92, 295.77, 317.24, 341.68, 344.4, 385.69, 400.8, 396.78, 387.66, 380.34, 368.53, 359.68, 349.68, 353.65, 368.42] },
      velocityScore: { '1D': -0.3, '1W': 6.6, '1M': 3.3, '6M': null }, isNew: false,
      marketCap: '$4.5T', pe: 28.1, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.29, IGPT: 8.01, IVES: 4.73, ALAI: false, CHAT: 5.65, AIFD: 5.15, SPRX: false, AOTG: 4.02 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 6, avgWeight: 4.92, proScore: 2.95, coverage: 0.6,
      price: 434.48, weeklyPrices: [477.57, 444.23, 434.16, 451.79, 434.48], weeklyChange: -9.02, dayChange: -3.84, sortRank: 0, periodReturns: { '1M': 1.8, 'YTD': 43, '6M': 36.3, '1Y': 89.6 },
      priceHistory: { '1D': [451.84, 435.62, 434.48], '1W': [477.57, 444.23, 434.16, 451.79, 434.48], '1M': [426.8, 427.92, 408.75, 421.07, 423.93, 441.4, 425.83, 432.15, 462.12, 467.67, 436.39, 440.83, 434.99, 432.35, 455.1, 477.57, 444.23, 434.16, 451.79, 434.48], 'YTD': [303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 385.75, 353.13, 347.09, 345.98, 343.25, 337.95, 365.9, 375.1, 387.44, 393.83, 419.5, 399.8, 407.15, 418.45, 415.17, 423.93, 467.67, 455.1, 434.48], '6M': [318.68, 327.11, 327.37, 339.55, 330.73, 368.1, 370.54, 376.81, 353.86, 336.71, 338.79, 326.11, 339.04, 370.6, 370.5, 402.46, 397.67, 411.68, 404.35, 407.15, 418.45, 415.17, 423.93, 467.67, 455.1, 434.48], '1Y': [229.17, 228.67, 238.85, 242.75, 239, 242.09, 241.41, 232.99, 230.87, 247.19, 261.38, 272.63, 273.23, 302.4, 302.89, 297.7, 298.25, 304.86, 295.27, 282.01, 275.06, 287.68, 301.87, 287.74, 293.28, 299.58, 318.68, 327.11, 327.37, 339.55, 330.73, 368.1, 360.39, 376.81, 353.86, 336.71, 338.79, 326.11, 339.04, 370.6, 370.5, 402.46, 397.67, 411.68, 404.35, 407.15, 418.45, 415.17, 423.93, 467.67, 455.1, 434.48] },
      velocityScore: { '1D': 1.7, '1W': 13.5, '1M': 16.1, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 37.7, revenueGrowth: 35, eps: 11.52, grossMargin: 62, dividendYield: 0.84,
      etfPresence: { AIS: 3.45, ARTY: false, BAI: 4.67, IGPT: false, IVES: 4.96, ALAI: 5.75, CHAT: false, AIFD: 3.42, SPRX: false, AOTG: 7.27 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'ANET', name: 'Arista Networks Inc', easyScore: 6, avgWeight: 2.47, proScore: 1.48, coverage: 0.6,
      price: 164.5, weeklyPrices: [169.88, 166.62, 159.99, 173.28, 164.50], weeklyChange: -3.16, dayChange: -5.01, sortRank: 0, periodReturns: { '1M': 5.2, 'YTD': 25.5, '6M': 26.5, '1Y': 62.1 },
      priceHistory: { '1D': [173.19, 165.52, 164.5], '1W': [169.88, 166.62, 159.99, 173.28, 164.5], '1M': [156.4, 152.16, 151.76, 156.4, 163.24, 169.09, 168.01, 164.93, 169.67, 174.56, 162.2, 161.74, 165.45, 157.6, 164.1, 169.88, 166.62, 159.99, 173.28, 164.5], 'YTD': [131.03, 123.72, 130.59, 136.34, 141.74, 137.49, 141.59, 128.77, 124.6, 139.62, 133.07, 130.8, 122.78, 145.07, 154.33, 177.73, 168.68, 147.06, 140.69, 148.59, 159.47, 154.27, 163.24, 174.56, 164.1, 164.5], '6M': [130.08, 125.09, 138.41, 148.15, 128.67, 135.12, 132.79, 130.25, 139.4, 134.03, 136.26, 122.55, 126.68, 147.35, 164.23, 176.91, 172.7, 141.77, 141.97, 148.59, 159.47, 154.27, 163.24, 174.56, 164.1, 164.5], '1Y': [101.47, 108.37, 111.61, 117.55, 120.35, 137.65, 138.04, 133.25, 136.55, 140.01, 145.43, 145.4, 143.37, 149.5, 147.45, 146.48, 156.81, 157.59, 137.26, 127.26, 117.43, 128.11, 129.11, 125.89, 130.73, 132.44, 130.08, 125.09, 138.41, 148.15, 128.67, 135.12, 137.23, 130.25, 139.4, 134.03, 136.26, 122.55, 126.68, 147.35, 164.23, 176.91, 172.7, 141.77, 141.97, 148.59, 159.47, 154.27, 163.24, 174.56, 164.1, 164.5] },
      velocityScore: { '1D': 15.6, '1W': 5, '1M': 2.1, '6M': null }, isNew: false,
      marketCap: '$207B', pe: 56.5, revenueGrowth: 35, eps: 2.91, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: 1.55, ARTY: 2.6, BAI: 1.42, IGPT: false, IVES: false, ALAI: false, CHAT: 2.26, AIFD: 4.95, SPRX: 2.01, AOTG: false },
      tonyNote: 'Arista Networks Inc appears in 6 of 10 AI & ML ETFs (60% coverage) with average weight 2.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 5, avgWeight: 4.11, proScore: 2.05, coverage: 0.5,
      price: 608.21, weeklyPrices: [563.29, 612.91, 582.90, 600.29, 608.21], weeklyChange: 7.97, dayChange: 1.32, sortRank: 0, periodReturns: { '1M': 3.9, 'YTD': -7.9, '6M': -6.2, '1Y': -15.3 },
      priceHistory: { '1D': [600.29, 608.96, 608.21], '1W': [563.29, 612.91, 582.9, 600.29, 608.21], '1M': [585.39, 584.59, 570.98, 568.43, 566.98, 593.48, 600.21, 567.58, 577.22, 563.85, 562.2, 557.67, 542.87, 550.25, 562.6, 563.29, 612.91, 582.9, 600.29, 608.21], 'YTD': [660.09, 646.06, 620.8, 658.76, 716.5, 661.46, 639.77, 639.3, 655.08, 654.07, 622.66, 592.92, 572.13, 612.42, 671.58, 674.72, 669.12, 612.88, 616.63, 607.38, 632.51, 593, 566.98, 563.85, 562.6, 608.21], '6M': [648.69, 615.52, 647.63, 738.31, 670.21, 649.81, 655.66, 657.01, 660.57, 638.18, 606.7, 547.54, 574.46, 629.86, 688.55, 675.03, 608.75, 609.63, 614.23, 607.38, 632.51, 593, 566.98, 563.85, 562.6, 608.21], '1Y': [718.35, 720.92, 712.97, 717.63, 776.37, 765.87, 767.37, 754.79, 738.7, 752.3, 764.7, 765.16, 743.4, 715.66, 715.7, 732.17, 750.82, 637.71, 631.76, 602.01, 594.25, 640.87, 666.8, 647.51, 661.5, 665.95, 648.69, 615.52, 647.63, 738.31, 670.21, 649.81, 644.78, 657.01, 660.57, 638.18, 606.7, 547.54, 574.46, 629.86, 688.55, 675.03, 608.75, 609.63, 614.23, 607.38, 632.51, 593, 566.98, 563.85, 562.6, 608.21] },
      velocityScore: { '1D': 0.5, '1W': 6.8, '1M': 17.8, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 22.1, revenueGrowth: 33, eps: 27.49, grossMargin: 82, dividendYield: 0.35,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: 8.26, IVES: 4.82, ALAI: 4.13, CHAT: 2.19, AIFD: false, SPRX: false, AOTG: 1.13 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 5, avgWeight: 4.01, proScore: 2, coverage: 0.5,
      price: 246.7, weeklyPrices: [238.34, 241.70, 242.67, 244.16, 246.70], weeklyChange: 3.51, dayChange: 1.04, sortRank: 0, periodReturns: { '1M': 0.6, 'YTD': 6.9, '6M': 2.1, '1Y': 10.4 },
      priceHistory: { '1D': [244.16, 246.9, 246.7], '1W': [238.34, 241.7, 242.67, 244.16, 246.7], '1M': [245.22, 244.19, 238, 241.51, 238.55, 246.02, 246, 237.5, 244.39, 232.79, 234.11, 234.27, 227.01, 232.69, 240.14, 238.34, 241.7, 242.67, 244.16, 246.7], 'YTD': [230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 198.79, 208.56, 208.73, 214.33, 215.2, 207.24, 208.27, 221.25, 248.5, 255.36, 263.04, 274.99, 270.13, 268.46, 270.64, 246.03, 238.55, 232.79, 240.14, 246.7], '6M': [241.56, 236.65, 234.34, 241.73, 222.69, 199.6, 210.11, 207.92, 218.94, 209.53, 208.76, 207.54, 209.77, 238.38, 250.56, 263.99, 268.26, 272.68, 264.14, 268.46, 270.64, 246.03, 238.55, 232.79, 240.14, 246.7], '1Y': [223.47, 225.69, 229.3, 232.79, 211.65, 221.3, 231.49, 228.84, 229, 235.84, 231.43, 227.63, 222.17, 220.9, 220.07, 216.48, 226.97, 254, 248.4, 232.87, 220.69, 233.88, 226.89, 222.54, 228.43, 232.53, 241.56, 236.65, 234.34, 241.73, 222.69, 199.6, 204.86, 207.92, 218.94, 209.53, 208.76, 207.54, 209.77, 238.38, 250.56, 263.99, 268.26, 272.68, 264.14, 268.46, 270.64, 246.03, 238.55, 232.79, 240.14, 246.7] },
      velocityScore: { '1D': -1, '1W': 0.5, '1M': -6.1, '6M': null }, isNew: false,
      marketCap: '$2.7T', pe: 32, revenueGrowth: 17, eps: 7.72, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 4.78, ALAI: 5.09, CHAT: 2.54, AIFD: 3.55, SPRX: false, AOTG: 4.08 },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 5, avgWeight: 3.8, proScore: 1.9, coverage: 0.5,
      price: 397.55, weeklyPrices: [483.02, 430.86, 406.42, 432.74, 397.55], weeklyChange: -17.69, dayChange: -8.13, sortRank: 0, periodReturns: { '1M': 14.8, 'YTD': 139, '6M': 139.8, '1Y': 343.6 },
      priceHistory: { '1D': [432.74, 401.93, 397.55], '1W': [483.02, 430.86, 406.42, 432.74, 397.55], '1M': [346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86, 406.42, 432.74, 397.55], 'YTD': [166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.4, 109.8, 116.48, 127.57, 121.76, 109.6, 125.46, 172.09, 194.06, 196.85, 213.91, 224.09, 297.84, 342.85, 317.06, 367.15, 439.66, 455.96, 397.55], '6M': [165.77, 172.14, 176.35, 160.46, 142.82, 126.58, 129.68, 124.67, 120, 119.9, 126.16, 113.61, 117.14, 149.05, 174.05, 212.84, 202.68, 199.79, 232.68, 297.84, 342.85, 317.06, 367.15, 439.66, 455.96, 397.55], '1Y': [89.62, 90.32, 121.89, 124.05, 137.93, 179.43, 186.43, 179.09, 182.2, 216.1, 231.29, 237.3, 198.8, 220.81, 199.53, 156.31, 170.28, 191.56, 173.74, 141.39, 141.8, 165.19, 175.74, 143.66, 172.62, 170.84, 165.77, 172.14, 176.35, 160.46, 142.82, 126.58, 132.62, 124.67, 120, 119.9, 126.16, 113.61, 117.14, 149.05, 174.05, 212.84, 202.68, 199.79, 232.68, 297.84, 342.85, 317.06, 367.15, 439.66, 455.96, 397.55] },
      velocityScore: { '1D': 2.2, '1W': 3.8, '1M': 33.8, '6M': null }, isNew: false,
      marketCap: '$68B', pe: 270.4, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 2.31, ARTY: 1.49, BAI: false, IGPT: false, IVES: false, ALAI: 1.03, CHAT: 2.57, AIFD: false, SPRX: 11.58, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.66, proScore: 1.83, coverage: 0.5,
      price: 393.64, weeklyPrices: [373.02, 384.28, 390.49, 386.74, 393.64], weeklyChange: 5.53, dayChange: 1.78, sortRank: 0, periodReturns: { '1M': -4.4, 'YTD': -18.6, '6M': -18.6, '1Y': -20.9 },
      priceHistory: { '1D': [386.74, 392.74, 393.64], '1W': [373.02, 384.28, 390.49, 386.74, 393.64], '1M': [411.74, 403.41, 397.36, 390.34, 390.74, 399.76, 393.83, 378.91, 379.4, 367.34, 373.94, 365.46, 352.83, 372.97, 368.57, 373.02, 384.28, 390.49, 386.74, 393.64], 'YTD': [483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 389, 403.93, 405.76, 399.41, 372.74, 370.17, 374.33, 411.22, 432.92, 424.46, 413.96, 405.21, 419.09, 450.24, 416.67, 390.74, 367.34, 368.57, 393.64], '6M': [483.47, 459.38, 451.14, 433.5, 393.67, 401.84, 397.23, 401.72, 410.68, 401.86, 389.02, 365.97, 373.46, 370.87, 422.79, 424.62, 414.44, 415.12, 421.92, 419.09, 450.24, 416.67, 390.74, 367.34, 368.57, 393.64], '1Y': [497.72, 503.02, 510.06, 512.5, 535.64, 521.77, 517.1, 507.23, 506.69, 498.2, 515.36, 514.45, 514.6, 528.57, 514.05, 516.79, 531.52, 517.03, 506, 507.49, 472.12, 486.74, 491.02, 474.82, 484.92, 487.48, 483.47, 459.38, 451.14, 433.5, 393.67, 401.84, 398.46, 401.72, 410.68, 401.86, 389.02, 365.97, 373.46, 370.87, 422.79, 424.62, 414.44, 415.12, 421.92, 419.09, 450.24, 416.67, 390.74, 367.34, 368.57, 393.64] },
      velocityScore: { '1D': -2.1, '1W': 7, '1M': -4.2, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 23.5, revenueGrowth: 18, eps: 16.78, grossMargin: 68, dividendYield: 0.94,
      etfPresence: { AIS: false, ARTY: 2.59, BAI: false, IGPT: false, IVES: 4.66, ALAI: 5.09, CHAT: 2.37, AIFD: false, SPRX: false, AOTG: 3.58 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 5, avgWeight: 2.51, proScore: 1.25, coverage: 0.5,
      price: 701.71, weeklyPrices: [858.06, 801.16, 728.32, 731.25, 701.71], weeklyChange: -18.22, dayChange: -4.04, sortRank: 0, periodReturns: { '1M': -21.6, 'YTD': 90.4, '6M': 78.6, '1Y': 670.4 },
      priceHistory: { '1D': [731.25, 706, 701.71], '1W': [858.06, 801.16, 728.32, 731.25, 701.71], '1M': [895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93, 827.92, 842.53, 861.97, 816.98, 851.4, 858.06, 801.16, 728.32, 731.25, 701.71], 'YTD': [368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 688.27, 694.43, 672, 649.56, 801.99, 702.76, 896.02, 824.01, 873.6, 858.32, 944.28, 1030.37, 964.5, 854.96, 863.66, 921.56, 893.93, 851.4, 701.71], '6M': [392.88, 331.62, 354.49, 381.44, 504.42, 583.46, 667.77, 677, 650.82, 616.09, 772.13, 688.8, 826.88, 897.3, 894.07, 881.64, 949.93, 903.8, 970.7, 964.5, 854.96, 863.66, 921.56, 893.93, 851.4, 701.71], '1Y': [91.08, 92.24, 103.84, 107.17, 111.13, 115.03, 118.98, 119.34, 132.81, 149.4, 168.77, 164.71, 162.58, 160.6, 160.56, 161, 193.8, 199.58, 259.89, 242.07, 255.59, 317.93, 342.56, 334.69, 389.88, 371.18, 392.88, 331.62, 354.49, 381.44, 504.42, 583.46, 635.64, 677, 650.82, 616.09, 772.13, 688.8, 826.88, 897.3, 894.07, 881.64, 949.93, 903.8, 970.7, 964.5, 854.96, 863.66, 921.56, 893.93, 851.4, 701.71] },
      velocityScore: { '1D': -0.8, '1W': -9.4, '1M': -8.8, '6M': null }, isNew: false,
      marketCap: '$55B', pe: 123.1, revenueGrowth: 90, eps: 5.7, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.32, IGPT: false, IVES: false, ALAI: 0.84, CHAT: 1.41, AIFD: 4.21, SPRX: 3.75, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 5 of 10 AI & ML ETFs (50% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 5, avgWeight: 2.17, proScore: 1.08, coverage: 0.5,
      price: 1592.77, weeklyPrices: [2273.73, 2032.22, 1745.00, 1744.43, 1592.77], weeklyChange: -29.95, dayChange: -8.69, sortRank: 0, periodReturns: { '1M': -3, 'YTD': 571, '6M': 350.5, '1Y': 3422.3 },
      priceHistory: { '1D': [1744.43, 1603.09, 1592.22, 1592.77], '1W': [2273.73, 2032.22, 1745, 1744.43, 1592.77], '1M': [1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 1745, 1744.43, 1592.77], 'YTD': [237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 638.52, 565.41, 618.89, 720.17, 702.48, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1447.23, 1542.24, 1694.98, 1559.32, 1980.1, 2273.73, 2050.39, 1592.77], '6M': [353.56, 387.81, 503.44, 539.3, 576.2, 630.29, 649.97, 651.9, 565.59, 618.82, 772.09, 603.17, 701.59, 851.77, 920.99, 989.9, 1187, 1562.34, 1407.61, 1542.24, 1694.98, 1559.32, 1980.1, 2273.73, 2050.39, 1592.77], '1Y': [45.22, 42.48, 41.61, 41.89, 42.51, 43.37, 45.52, 46.37, 52.47, 70.5, 90.09, 102.92, 113.5, 121.17, 134.61, 148.04, 176.49, 207.01, 267.95, 265.88, 200.27, 210.17, 225.47, 201.87, 241.05, 240.22, 353.56, 387.81, 503.44, 539.3, 576.2, 630.29, 621.09, 651.9, 565.59, 618.82, 772.09, 603.17, 701.59, 851.77, 920.99, 989.9, 1187, 1562.34, 1407.61, 1542.24, 1694.98, 1559.32, 1980.1, 2273.73, 2050.39, 1592.77] },
      velocityScore: { '1D': -3.6, '1W': -14.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$236B', pe: 54.3, revenueGrowth: 251, eps: 29.31, grossMargin: 56, dividendYield: null,
      etfPresence: { AIS: 2.03, ARTY: false, BAI: 2.8, IGPT: 3.87, IVES: false, ALAI: 0.49, CHAT: false, AIFD: false, SPRX: false, AOTG: 1.64 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'CRDO', name: 'Credo Technology Group Holding Ltd', easyScore: 5, avgWeight: 2.04, proScore: 1.02, coverage: 0.5,
      price: 245.61, weeklyPrices: [271.95, 259.09, 241.91, 265.55, 245.61], weeklyChange: -9.69, dayChange: -7.51, sortRank: 0, periodReturns: { '1M': 10.5, 'YTD': 70.7, '6M': 74.2, '1Y': 164.9 },
      priceHistory: { '1D': [265.55, 247.43, 245.74, 245.61], '1W': [271.95, 259.09, 241.91, 265.55, 245.61], '1M': [222.27, 234.32, 237.68, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.09, 241.91, 265.55, 245.61], 'YTD': [143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 120.83, 97.3, 112.33, 104.06, 100.3, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 189.36, 193.39, 236.03, 206.89, 250.81, 302.52, 245.68, 245.61], '6M': [141, 156.84, 135.1, 129.47, 98.06, 121.78, 124.06, 114.48, 114.74, 111.57, 107.09, 96.44, 101.45, 119.59, 160.69, 195.04, 184.38, 188.51, 172.17, 193.39, 236.03, 206.89, 250.81, 302.52, 245.68, 245.61], '1Y': [92.73, 98.7, 95.74, 107.95, 114.7, 118.57, 118.74, 114.04, 123.06, 147.53, 163.98, 164.1, 146.01, 147.42, 149.9, 151.66, 154.96, 180.64, 170.16, 145.58, 133.49, 171.13, 178.94, 142.02, 149.94, 144.92, 141, 156.84, 135.1, 129.47, 98.06, 121.78, 130.66, 114.48, 114.74, 111.57, 107.09, 96.44, 101.45, 119.59, 160.69, 195.04, 184.38, 188.51, 172.17, 193.39, 236.03, 206.89, 250.81, 302.52, 245.68, 245.61] },
      velocityScore: { '1D': null, '1W': 9.7, '1M': null, '6M': null }, isNew: true,
      marketCap: '$46B', pe: 97.5, revenueGrowth: 157, eps: 2.52, grossMargin: 68, dividendYield: null,
      etfPresence: { AIS: 1.15, ARTY: 1.33, BAI: 2.25, IGPT: false, IVES: false, ALAI: false, CHAT: 2.07, AIFD: false, SPRX: 3.38, AOTG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'ARM', name: 'ARM Holdings PLC', easyScore: 4, avgWeight: 3.15, proScore: 1.26, coverage: 0.4,
      price: 307, weeklyPrices: [354.57, 337.47, 315.28, 322.24, 307.00], weeklyChange: -13.42, dayChange: -4.73, sortRank: 0, periodReturns: { '1M': -11.4, 'YTD': 180.9, '6M': 165.4, '1Y': 109 },
      priceHistory: { '1D': [322.24, 307.21, 307], '1W': [354.57, 337.47, 315.28, 322.24, 307], '1M': [346.39, 324.86, 307.43, 342.23, 380.81, 412.55, 396.34, 418.88, 439.46, 407.72, 366.39, 359.08, 347.71, 334.27, 343.58, 354.57, 337.47, 315.28, 322.24, 307], 'YTD': [109.31, 113.08, 105.11, 116.07, 105.36, 123.7, 125.28, 128.14, 121.72, 120.55, 127.31, 134.96, 151.28, 148.91, 159.34, 196.57, 201.69, 237.3, 221.21, 298.23, 353.29, 342.93, 380.81, 407.72, 343.58, 307], '6M': [115.68, 104.99, 119.2, 108.43, 110.88, 122.19, 125.58, 129.26, 120.62, 115.12, 129.82, 154.8, 149.11, 148.93, 166.73, 234.81, 211.18, 213.27, 209.16, 298.23, 353.29, 342.93, 380.81, 407.72, 343.58, 307], '1Y': [146.88, 144.54, 161.92, 164.37, 140.05, 141.05, 141.06, 137.92, 138.31, 139.14, 153.86, 144.48, 139.8, 156.22, 171.94, 171.5, 178.62, 168.68, 154.84, 140.26, 131.57, 135.01, 139.78, 124.37, 113.29, 110.86, 115.68, 104.99, 119.2, 108.43, 110.88, 122.19, 126.93, 129.26, 120.62, 115.12, 129.82, 154.8, 149.11, 148.93, 166.73, 234.81, 211.18, 213.27, 209.16, 298.23, 353.29, 342.93, 380.81, 407.72, 343.58, 307] },
      velocityScore: { '1D': 0, '1W': 4.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$328B', pe: 365.5, revenueGrowth: 20, eps: 0.84, grossMargin: 98, dividendYield: null,
      etfPresence: { AIS: 1.83, ARTY: false, BAI: false, IGPT: false, IVES: false, ALAI: 0.16, CHAT: 2.6, AIFD: false, SPRX: 8.02, AOTG: false },
      tonyNote: 'Arm Holdings is held across Broad Tech and AI ETFs as the CPU architecture licensor embedded in every mobile device and increasingly in AI inference chips and data center CPUs. Revenue grew and the royalty model is high-margin; the weight score reflects consistent institutional positioning as the AI chip design ecosystem expands on Arm cores.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 4, avgWeight: 3.07, proScore: 1.23, coverage: 0.4,
      price: 111.87, weeklyPrices: [139.63, 127.02, 120.35, 122.20, 111.87], weeklyChange: -19.88, dayChange: -8.45, sortRank: 0, periodReturns: { '1M': 1.5, 'YTD': 203.2, '6M': 162.4, '1Y': 408.5 },
      priceHistory: { '1D': [122.2, 112.08, 111.93, 111.87], '1W': [139.63, 127.02, 120.35, 122.2, 111.87], '1M': [110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 127.02, 120.35, 122.2, 111.87], 'YTD': [36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 46.12, 43.1, 46.78, 44.06, 44.06, 44.13, 58.95, 64.94, 65.27, 94.75, 113.01, 120.29, 118.5, 114.68, 99.17, 124.57, 140.94, 131.72, 111.87], '6M': [42.63, 48.72, 54.32, 48.66, 48.24, 46.48, 44.11, 45.46, 45.95, 45.25, 46.18, 44.1, 50.38, 62.38, 68.5, 82.54, 99.62, 124.92, 108.77, 118.5, 114.68, 99.17, 124.57, 140.94, 131.72, 111.87], '1Y': [22, 23.3, 23.26, 20.68, 19.5, 20.65, 23.66, 24.8, 24.35, 24.48, 24.77, 28.76, 34.48, 36.59, 37.22, 38.1, 39.54, 39.5, 38.45, 34.71, 34.5, 40.01, 40.3, 37.51, 36.37, 37.3, 42.63, 48.72, 54.32, 48.66, 48.24, 46.48, 44.62, 45.46, 45.95, 45.25, 46.18, 44.1, 50.38, 62.38, 68.5, 82.54, 99.62, 124.92, 108.77, 118.5, 114.68, 99.17, 124.57, 140.94, 131.72, 111.87] },
      velocityScore: { '1D': 0, '1W': -3.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$562B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.44, ARTY: false, BAI: 3.11, IGPT: 4.6, IVES: false, ALAI: false, CHAT: 1.12, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 4, avgWeight: 2.99, proScore: 1.2, coverage: 0.4,
      price: 294.9, weeklyPrices: [334.82, 311.42, 300.53, 318.47, 294.90], weeklyChange: -11.92, dayChange: -7.39, sortRank: 0, periodReturns: { '1M': -1.9, 'YTD': 82, '6M': 71.9, '1Y': 133.6 },
      priceHistory: { '1D': [318.43, 296.51, 295.22, 294.9], '1W': [334.82, 311.42, 300.53, 318.47, 294.9], '1M': [300.57, 289.52, 280.98, 297.88, 302.87, 311.93, 299.6, 317.58, 333.05, 357.96, 318.32, 316.43, 325.57, 303.95, 306.97, 334.82, 311.42, 300.53, 318.47, 294.9], 'YTD': [162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 234.53, 253.15, 244.44, 270.06, 268.41, 270.89, 250.58, 281.03, 301.16, 305.14, 306.18, 358.92, 369.99, 323.4, 315.71, 300.51, 302.87, 357.96, 306.97, 294.9], '6M': [171.54, 170.86, 181.12, 195.1, 177.75, 236.51, 243.75, 259.23, 249.75, 265.38, 269.17, 252.4, 261.29, 295.11, 307.34, 323.46, 328.31, 339.97, 370.94, 323.4, 315.71, 300.51, 302.87, 357.96, 306.97, 294.9], '1Y': [126.26, 124.72, 126.21, 142.55, 140.2, 139.83, 135.69, 125.97, 127.55, 121.82, 138.26, 151.96, 143.31, 162.8, 179, 175.73, 192.9, 191.4, 187.84, 166.65, 159.83, 179.22, 185.61, 161.74, 166.25, 164.34, 171.54, 170.86, 181.12, 195.1, 177.75, 236.51, 243.06, 259.23, 249.75, 265.38, 269.17, 252.4, 261.29, 295.11, 307.34, 323.46, 328.31, 339.97, 370.94, 323.4, 315.71, 300.51, 302.87, 357.96, 306.97, 294.9] },
      velocityScore: { '1D': 3.4, '1W': 6.2, '1M': 11.1, '6M': null }, isNew: false,
      marketCap: '$113B', pe: 74.3, revenueGrowth: 30, eps: 3.97, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 3.76, ARTY: false, BAI: 1.93, IGPT: false, IVES: false, ALAI: false, CHAT: 2.26, AIFD: 4.02, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 4, avgWeight: 2.81, proScore: 1.13, coverage: 0.4,
      price: 536.5, weeklyPrices: [638.72, 598.37, 539.00, 577.46, 536.50], weeklyChange: -16, dayChange: -7.09, sortRank: 0, periodReturns: { '1M': 1.8, 'YTD': 211.4, '6M': 168.4, '1Y': 722.6 },
      priceHistory: { '1D': [577.46, 538.01, 537.93, 536.5], '1W': [638.72, 598.37, 539, 577.46, 536.5], '1M': [526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539, 577.46, 536.5], 'YTD': [172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 270.57, 250.61, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 486.46, 531.21, 511.72, 562.93, 732.62, 651.88, 536.5], '6M': [199.88, 215, 243.29, 278.41, 260.19, 284.1, 285.52, 282.25, 259.03, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 431.52, 480, 482.02, 486.46, 531.21, 511.72, 562.93, 732.62, 651.88, 536.5], '1Y': [65.22, 66.93, 68.74, 68.99, 77.29, 74.64, 76.29, 76.97, 80.34, 93.29, 102.39, 112.41, 116.74, 125.28, 118.86, 121.53, 126.67, 158.02, 174.22, 162.45, 139.19, 163.54, 169.78, 172.04, 176.76, 176.06, 199.88, 215, 243.29, 278.41, 260.19, 284.1, 284.67, 282.25, 259.03, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 431.52, 480, 482.02, 486.46, 531.21, 511.72, 562.93, 732.62, 651.88, 536.5] },
      velocityScore: { '1D': null, '1W': -31.5, '1M': -1.7, '6M': null }, isNew: true,
      marketCap: '$185B', pe: 32.1, revenueGrowth: 46, eps: 16.69, grossMargin: 45, dividendYield: 0.1,
      etfPresence: { AIS: 1.34, ARTY: 2.78, BAI: 3.15, IGPT: false, IVES: false, ALAI: 3.99, CHAT: false, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 4, avgWeight: 2.61, proScore: 1.04, coverage: 0.4,
      price: 415.51, weeklyPrices: [420.60, 425.30, 393.45, 419.77, 415.51], weeklyChange: -1.21, dayChange: -1.01, sortRank: 0, periodReturns: { '1M': 1.6, 'YTD': -7.6, '6M': -3.7, '1Y': 41.4 },
      priceHistory: { '1D': [419.77, 417.13, 415.89, 415.51], '1W': [420.6, 425.3, 393.45, 419.77, 415.51], '1M': [408.95, 396.68, 381.59, 399.15, 406.43, 411.15, 404.66, 396.38, 400.49, 405.05, 381.61, 375.53, 375.12, 379.71, 411.84, 420.6, 425.3, 393.45, 419.77, 415.51], 'YTD': [449.72, 435.8, 438.57, 449.06, 430.41, 411.11, 417.44, 409.38, 392.43, 399.24, 399.27, 383.03, 371.75, 343.25, 391.95, 387.51, 372.8, 398.73, 445.27, 417.85, 435.79, 391, 406.43, 405.05, 411.84, 415.51], '6M': [431.41, 439.2, 449.36, 416.56, 397.21, 417.07, 411.82, 408.58, 405.55, 395.01, 380.3, 372.11, 360.59, 348.95, 400.62, 376.3, 390.82, 428.35, 422.24, 417.85, 435.79, 391, 406.43, 405.05, 411.84, 415.51], '1Y': [293.94, 316.9, 328.49, 325.59, 309.26, 339.03, 335.16, 340.01, 333.87, 346.4, 410.04, 434.21, 443.21, 453.25, 435.9, 447.43, 452.42, 468.37, 445.23, 408.92, 391.09, 430.14, 439.58, 475.31, 488.73, 454.43, 431.41, 439.2, 449.36, 416.56, 397.21, 417.07, 411.71, 408.58, 405.55, 395.01, 380.3, 372.11, 360.59, 348.95, 400.62, 376.3, 390.82, 428.35, 422.24, 417.85, 435.79, 391, 406.43, 405.05, 411.84, 415.51] },
      velocityScore: { '1D': 3, '1W': null, '1M': 4, '6M': null }, isNew: false,
      marketCap: '$1.6T', pe: 381.2, revenueGrowth: 16, eps: 1.09, grossMargin: 19, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 0.99, IGPT: false, IVES: 4.7, ALAI: 2.82, CHAT: false, AIFD: 1.93, SPRX: false, AOTG: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 4.73, proScore: 4.73, coverage: 1,
      price: 916.69, weeklyPrices: [1154.29, 1032.28, 975.56, 984.75, 916.69], weeklyChange: -20.58, dayChange: -6.91, sortRank: 0, periodReturns: { '1M': -3.4, 'YTD': 221.2, '6M': 170, '1Y': 664.4 },
      priceHistory: { '1D': [984.75, 916.98, 916.69], '1W': [1154.29, 1032.28, 975.56, 984.75, 916.69], '1M': [949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 916.69], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 762.1, 971, 864.01, 981.61, 1211.38, 1145.28, 916.69], '6M': [339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 415.56, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 762.1, 971, 864.01, 981.61, 1211.38, 1145.28, 916.69], '1Y': [119.92, 118.61, 113.23, 111.25, 107.77, 123.72, 123.55, 117.68, 119.01, 131.46, 157.77, 164.62, 163.9, 190.96, 192.77, 206.77, 220.1, 234.7, 253.3, 241.95, 207.37, 240.46, 246.92, 237.5, 276.59, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 417.35, 415.56, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 762.1, 971, 864.01, 981.61, 1211.38, 1145.28, 916.69] },
      velocityScore: { '1D': -1.9, '1W': -3.3, '1M': -19, '6M': null }, isNew: false,
      marketCap: '$1.0T', pe: 20.7, revenueGrowth: 346, eps: 44.22, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { SOXX: 8.03, PSI: 5.59, XSD: 2.54, DRAM: 2.77 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 5.62, proScore: 4.21, coverage: 0.75,
      price: 511.8, weeklyPrices: [580.91, 540.88, 517.82, 552.05, 511.80], weeklyChange: -11.9, dayChange: -7.29, sortRank: 0, periodReturns: { '1M': 4.4, 'YTD': 139, '6M': 143.7, '1Y': 279.7 },
      priceHistory: { '1D': [552.05, 511.04, 511.8], '1W': [580.91, 540.88, 517.82, 552.05, 511.8], '1M': [490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 511.8], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 449.59, 516.1, 466.38, 511.57, 551.63, 539.49, 511.8], '6M': [210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 203.68, 199.45, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 449.59, 516.1, 466.38, 511.57, 551.63, 539.49, 511.8], '1Y': [134.8, 146.24, 157, 173.66, 176.78, 172.28, 176.14, 167.76, 162.63, 151.41, 161.16, 159.79, 161.36, 203.71, 216.42, 240.56, 259.67, 259.65, 243.98, 240.52, 203.78, 219.76, 221.11, 207.58, 214.95, 215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 203.37, 203.68, 199.45, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 449.59, 516.1, 466.38, 511.57, 551.63, 539.49, 511.8] },
      velocityScore: { '1D': 4.5, '1W': 9.6, '1M': -5.6, '6M': null }, isNew: false,
      marketCap: '$835B', pe: 171.7, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 8.47, PSI: 5.57, XSD: 2.81, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 4.74, proScore: 3.55, coverage: 0.75,
      price: 192.47, weeklyPrices: [200.09, 197.58, 194.83, 195.55, 192.47], weeklyChange: -3.81, dayChange: -1.58, sortRank: 0, periodReturns: { '1M': -7.8, 'YTD': 3.2, '6M': 1.8, '1Y': 21.6 },
      priceHistory: { '1D': [195.55, 192.75, 192.47], '1W': [200.09, 197.58, 194.83, 195.55, 192.47], '1M': [208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83, 195.55, 192.47], 'YTD': [186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 192.85, 180.05, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 219.51, 211.14, 205.1, 205.19, 208.65, 194.97, 192.47], '6M': [189.11, 183.14, 184.84, 192.51, 171.88, 186.94, 189.82, 184.89, 183.34, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 225.32, 219.51, 211.14, 205.1, 205.19, 208.65, 194.97, 192.47], '1Y': [158.24, 164.07, 171.38, 176.75, 180, 182.06, 182.01, 177.99, 174.18, 168.31, 177.75, 183.61, 181.85, 185.54, 188.32, 182.64, 191.49, 206.88, 199.05, 186.6, 178.88, 179.92, 185.55, 176.29, 183.69, 187.54, 189.11, 183.14, 184.84, 192.51, 171.88, 186.94, 187.9, 184.89, 183.34, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 225.32, 219.51, 211.14, 205.1, 205.19, 208.65, 194.97, 192.47] },
      velocityScore: { '1D': -1.7, '1W': 7.6, '1M': 8.2, '6M': null }, isNew: false,
      marketCap: '$4.7T', pe: 29.5, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.51,
      etfPresence: { SOXX: 7.34, PSI: 4.63, XSD: 2.24, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.59, proScore: 3.44, coverage: 0.75,
      price: 111.87, weeklyPrices: [139.63, 127.02, 120.35, 122.20, 111.87], weeklyChange: -19.88, dayChange: -8.45, sortRank: 0, periodReturns: { '1M': 1.5, 'YTD': 203.2, '6M': 162.4, '1Y': 408.5 },
      priceHistory: { '1D': [122.2, 112.08, 111.93, 111.87], '1W': [139.63, 127.02, 120.35, 122.2, 111.87], '1M': [110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 127.02, 120.35, 122.2, 111.87], 'YTD': [36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 46.12, 43.1, 46.78, 44.06, 44.06, 44.13, 58.95, 64.94, 65.27, 94.75, 113.01, 120.29, 118.5, 114.68, 99.17, 124.57, 140.94, 131.72, 111.87], '6M': [42.63, 48.72, 54.32, 48.66, 48.24, 46.48, 44.11, 45.46, 45.95, 45.25, 46.18, 44.1, 50.38, 62.38, 68.5, 82.54, 99.62, 124.92, 108.77, 118.5, 114.68, 99.17, 124.57, 140.94, 131.72, 111.87], '1Y': [22, 23.3, 23.26, 20.68, 19.5, 20.65, 23.66, 24.8, 24.35, 24.48, 24.77, 28.76, 34.48, 36.59, 37.22, 38.1, 39.54, 39.5, 38.45, 34.71, 34.5, 40.01, 40.3, 37.51, 36.37, 37.3, 42.63, 48.72, 54.32, 48.66, 48.24, 46.48, 44.62, 45.46, 45.95, 45.25, 46.18, 44.1, 50.38, 62.38, 68.5, 82.54, 99.62, 124.92, 108.77, 118.5, 114.68, 99.17, 124.57, 140.94, 131.72, 111.87] },
      velocityScore: { '1D': -0.6, '1W': -0.6, '1M': 2.4, '6M': null }, isNew: false,
      marketCap: '$562B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 6.11, PSI: 5.03, XSD: 2.63, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.57, proScore: 2.68, coverage: 0.75,
      price: 375.95, weeklyPrices: [397.17, 388.98, 377.16, 388.83, 375.95], weeklyChange: -5.34, dayChange: -3.31, sortRank: 0, periodReturns: { '1M': -6.9, 'YTD': 38.6, '6M': 28.4, '1Y': 55.5 },
      priceHistory: { '1D': [388.83, 376.33, 375.86, 375.95], '1W': [397.17, 388.98, 377.16, 388.83, 375.95], '1M': [403.89, 404.62, 392.67, 412.13, 417.79, 427.58, 416, 414.45, 434.46, 445.48, 407.26, 413.16, 417.93, 386.91, 391.78, 397.17, 388.98, 377.16, 388.83, 375.95], 'YTD': [271.2, 299.16, 302.1, 305.6, 310.88, 320.45, 337.1, 356.09, 338.99, 318.81, 313.66, 321.83, 318.14, 346.21, 347.94, 381.42, 389.31, 415.63, 432.39, 384.21, 413.85, 401.39, 417.79, 445.48, 391.78, 375.95], '6M': [292.89, 297.99, 308.52, 318.7, 322.12, 331.36, 355.03, 354.35, 329.72, 307.27, 310.44, 313.42, 318.34, 350.14, 371.45, 399.57, 397.69, 416.52, 417.49, 384.21, 413.85, 401.39, 417.79, 445.48, 391.78, 375.95], '1Y': [241.81, 243.46, 240.48, 230.77, 222.4, 224.07, 231.55, 252.2, 251.31, 248.98, 244.91, 247.34, 244.79, 242.5, 234.67, 246.22, 243.01, 233.61, 232, 229.94, 232.32, 266.51, 279.13, 280.44, 275.82, 274.82, 292.89, 297.99, 308.52, 318.7, 322.12, 331.36, 345.3, 354.35, 329.72, 307.27, 310.44, 313.42, 318.34, 350.14, 371.45, 399.57, 397.69, 416.52, 417.49, 384.21, 413.85, 401.39, 417.79, 445.48, 391.78, 375.95] },
      velocityScore: { '1D': 1.5, '1W': 7.2, '1M': 4.3, '6M': null }, isNew: false,
      marketCap: '$183B', pe: 56, revenueGrowth: 37, eps: 6.71, grossMargin: 64, dividendYield: 1.13,
      etfPresence: { SOXX: 3.72, PSI: 4.71, XSD: 2.27, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.6% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 5.92, proScore: 2.96, coverage: 0.5,
      price: 543.37, weeklyPrices: [723.00, 650.91, 603.04, 592.79, 543.37], weeklyChange: -24.85, dayChange: -8.34, sortRank: 0, periodReturns: { '1M': 10.4, 'YTD': 111.4, '6M': 86, '1Y': 184.8 },
      priceHistory: { '1D': [592.79, 543.54, 543.2, 543.37], '1W': [723, 650.91, 603.04, 592.79, 543.37], '1M': [492.17, 499.21, 497.01, 552.64, 567.25, 585.78, 568.23, 592.92, 617.11, 640.18, 585.88, 588.97, 668, 626.84, 694.64, 723, 650.91, 603.04, 592.79, 543.37], 'YTD': [256.99, 281.64, 319.08, 322.38, 322.32, 322.51, 354.91, 377.93, 351.32, 345.88, 352.46, 373.99, 341.79, 385.72, 394.26, 403.48, 382.59, 428.62, 436.61, 427.36, 450.06, 453.01, 567.25, 640.18, 694.64, 543.37], '6M': [292.2, 301.89, 318.79, 341.34, 303.99, 328.39, 375.38, 375.72, 346.53, 337.27, 357.21, 338.55, 348.47, 399.49, 396.94, 417.04, 389.08, 435.44, 436.62, 427.36, 450.06, 453.01, 567.25, 640.18, 694.64, 543.37], '1Y': [190.78, 197.1, 192.61, 190.27, 182.82, 184.38, 163.53, 162.49, 160.76, 162.05, 170.93, 200.52, 204.95, 223.91, 219.48, 228.13, 231.33, 237.71, 235.08, 228.71, 224.01, 254.75, 268.16, 261.27, 259.01, 259.97, 292.2, 301.89, 318.79, 341.34, 303.99, 328.39, 369.83, 375.72, 346.53, 337.27, 357.21, 338.55, 348.47, 399.49, 396.94, 417.04, 389.08, 435.44, 436.62, 427.36, 450.06, 453.01, 567.25, 640.18, 694.64, 543.37] },
      velocityScore: { '1D': -3.3, '1W': -7.2, '1M': 14.7, '6M': null }, isNew: false,
      marketCap: '$431B', pe: 51.2, revenueGrowth: 11, eps: 10.61, grossMargin: 49, dividendYield: 0.36,
      etfPresence: { SOXX: 5.22, PSI: 6.63, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 5.36, proScore: 2.68, coverage: 0.5,
      price: 218.36, weeklyPrices: [301.71, 266.19, 235.55, 233.31, 218.36], weeklyChange: -27.63, dayChange: -6.41, sortRank: 0, periodReturns: { '1M': 3.6, 'YTD': 79.7, '6M': 60.6, '1Y': 139.3 },
      priceHistory: { '1D': [233.31, 218.82, 218.27, 218.36], '1W': [301.71, 266.19, 235.55, 233.31, 218.36], '1M': [210.81, 213.94, 213.56, 241.16, 254.54, 256.42, 237.33, 238.73, 259.56, 269.16, 244.49, 240.48, 258.8, 248.64, 278.39, 301.71, 266.19, 235.55, 233.31, 218.36], 'YTD': [121.51, 132.46, 154.5, 151.28, 142.79, 144.29, 146.41, 150.66, 144.13, 145.29, 148.13, 156.62, 147.24, 167.23, 174.81, 181.21, 181.62, 181.63, 184.97, 184.22, 192.17, 192.92, 254.54, 269.16, 278.39, 218.36], '6M': [135.97, 143.45, 150, 168.47, 133.1, 145.09, 149.6, 152.43, 142.94, 140.96, 151.15, 145.11, 151.68, 173.73, 179.14, 193.5, 172.63, 186.92, 180.43, 184.22, 192.17, 192.92, 254.54, 269.16, 278.39, 218.36], '1Y': [91.26, 92.18, 93.78, 92.32, 91.56, 91.02, 88.34, 87.03, 87.2, 90.9, 98.89, 107.13, 106.41, 113.97, 102.5, 115.29, 121.51, 121.91, 121.79, 113.37, 109.71, 115.72, 122.46, 122.51, 126.57, 124.36, 135.97, 143.45, 150, 168.47, 133.1, 145.09, 146.99, 152.43, 142.94, 140.96, 151.15, 145.11, 151.68, 173.73, 179.14, 193.5, 172.63, 186.92, 180.43, 184.22, 192.17, 192.92, 254.54, 269.16, 278.39, 218.36] },
      velocityScore: { '1D': -2.5, '1W': -8.5, '1M': 23.5, '6M': null }, isNew: false,
      marketCap: '$285B', pe: 62, revenueGrowth: 12, eps: 3.52, grossMargin: 61, dividendYield: 0.39,
      etfPresence: { SOXX: 4.81, PSI: 5.9, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 4.94, proScore: 2.47, coverage: 0.5,
      price: 324.56, weeklyPrices: [433.33, 391.26, 351.41, 350.20, 324.56], weeklyChange: -25.1, dayChange: -7.33, sortRank: 0, periodReturns: { '1M': 0, 'YTD': 89.6, '6M': 59.8, '1Y': 230.7 },
      priceHistory: { '1D': [350.2, 324.43, 323.87, 324.56], '1W': [433.33, 391.26, 351.41, 350.2, 324.56], '1M': [324.45, 327.16, 321.8, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04, 409.54, 371.33, 374.8, 401.82, 379.09, 410.91, 433.33, 391.26, 351.41, 350.2, 324.56], 'YTD': [171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 244.25, 217.27, 215.23, 226.47, 238.84, 213.66, 246.49, 265.16, 265.55, 248.75, 297.17, 295.44, 302.24, 318.18, 303.28, 366.81, 409.54, 410.91, 324.56], '6M': [203.08, 208.79, 220.7, 248.17, 213.31, 231.29, 244.92, 239.07, 214.68, 209.49, 233.99, 211.62, 218.44, 263.66, 267.6, 267.78, 256.72, 294.05, 284.72, 302.24, 318.18, 303.28, 366.81, 409.54, 410.91, 324.56], '1Y': [98.14, 99.62, 101.74, 98.62, 98.41, 102, 98.88, 100.08, 100.15, 105.07, 119.21, 132.2, 131.09, 149.15, 137.81, 144.05, 156.9, 161.24, 166.37, 147.46, 142.65, 154.79, 162.74, 164.3, 175.26, 173.78, 203.08, 208.79, 220.7, 248.17, 213.31, 231.29, 237.39, 239.07, 214.68, 209.49, 233.99, 211.62, 218.44, 263.66, 267.6, 267.78, 256.72, 294.05, 284.72, 302.24, 318.18, 303.28, 366.81, 409.54, 410.91, 324.56] },
      velocityScore: { '1D': -2, '1W': -7.1, '1M': 14.4, '6M': null }, isNew: false,
      marketCap: '$406B', pe: 61.4, revenueGrowth: 24, eps: 5.29, grossMargin: 50, dividendYield: 0.3,
      etfPresence: { SOXX: 4.36, PSI: 5.52, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 4.47, proScore: 2.23, coverage: 0.5,
      price: 366.42, weeklyPrices: [377.75, 369.34, 360.45, 373.90, 366.42], weeklyChange: -3, dayChange: -2, sortRank: 0, periodReturns: { '1M': -7.6, 'YTD': 5.9, '6M': 6.7, '1Y': 33.6 },
      priceHistory: { '1D': [373.9, 366.93, 366.42], '1W': [377.75, 369.34, 360.45, 373.9, 366.42], '1M': [396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45, 373.9, 366.42], 'YTD': [346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 325.49, 313.84, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 414.57, 446.77, 385.73, 382.07, 392.13, 372.45, 366.42], '6M': [343.5, 339.89, 325.49, 330.73, 310.51, 331.17, 332.65, 321.7, 332.77, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 425.19, 414.57, 446.77, 385.73, 382.07, 392.13, 372.45, 366.42], '1Y': [274.18, 275.6, 288.21, 294.3, 297.72, 303.9, 305.76, 294, 297.39, 345.65, 364.09, 338.79, 327.9, 335.49, 356.7, 349.24, 362.05, 362.55, 358.39, 342.65, 340.2, 386.08, 401.1, 339.81, 341.45, 349.85, 343.5, 339.89, 325.49, 330.73, 310.51, 331.17, 333.99, 321.7, 332.77, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 425.19, 414.57, 446.77, 385.73, 382.07, 392.13, 372.45, 366.42] },
      velocityScore: { '1D': 0.9, '1W': 5.2, '1M': 10.4, '6M': null }, isNew: false,
      marketCap: '$1.7T', pe: 60.9, revenueGrowth: 48, eps: 6.02, grossMargin: 76, dividendYield: 0.7,
      etfPresence: { SOXX: 6.63, PSI: false, XSD: 2.31, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 3.55, proScore: 1.77, coverage: 0.5,
      price: 231.01, weeklyPrices: [297.89, 272.05, 245.29, 249.27, 231.01], weeklyChange: -22.45, dayChange: -7.32, sortRank: 0, periodReturns: { '1M': -20, 'YTD': 171.8, '6M': 172.9, '1Y': 222.9 },
      priceHistory: { '1D': [249.27, 232.8, 231.01], '1W': [297.89, 272.05, 245.29, 249.27, 231.01], '1M': [288.85, 266.88, 252.59, 280.71, 279.7, 308.88, 278.67, 289.54, 310.58, 307.86, 279.04, 276.7, 281.26, 266.77, 277.75, 297.89, 272.05, 245.29, 249.27, 231.01], 'YTD': [84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 78.39, 77.51, 93.3, 90.79, 92.36, 99.05, 114.45, 134.6, 157.32, 156.57, 172.15, 177.95, 190.69, 205, 263.47, 279.7, 307.86, 277.75, 231.01], '6M': [84.64, 81.21, 83.1, 81.34, 74.21, 78.23, 79.48, 79.29, 75.68, 87.67, 89.53, 97.68, 107.11, 128.49, 139.69, 164.31, 164.95, 170.13, 176.89, 190.69, 205, 263.47, 279.7, 307.86, 277.75, 231.01], '1Y': [71.55, 72.51, 73.06, 75.91, 76.53, 77.28, 76.74, 73, 62.87, 66, 67.43, 75.53, 82.39, 88.92, 89.39, 85.84, 88.71, 90.37, 93.23, 83.45, 77.45, 91.1, 92, 84.26, 84.8, 86.76, 84.64, 81.21, 83.1, 81.34, 74.21, 78.23, 79.61, 79.29, 75.68, 87.67, 89.53, 97.68, 107.11, 128.49, 139.69, 164.31, 164.95, 170.13, 176.89, 190.69, 205, 263.47, 279.7, 307.86, 277.75, 231.01] },
      velocityScore: { '1D': -1.1, '1W': -5.9, '1M': -45.7, '6M': null }, isNew: false,
      marketCap: '$202B', pe: 79.1, revenueGrowth: 28, eps: 2.92, grossMargin: 52, dividendYield: 0.1,
      etfPresence: { SOXX: 4.82, PSI: false, XSD: 2.27, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 3.2, proScore: 1.6, coverage: 0.5,
      price: 289.19, weeklyPrices: [298.07, 298.41, 293.08, 303.50, 289.19], weeklyChange: -2.98, dayChange: -4.71, sortRank: 0, periodReturns: { '1M': -0.6, 'YTD': 66.7, '6M': 55.7, '1Y': 35.5 },
      priceHistory: { '1D': [303.5, 288.85, 288.97, 289.19], '1W': [298.07, 298.41, 293.08, 303.5, 289.19], '1M': [290.9, 288.63, 282.01, 297.1, 301.12, 313.34, 305.71, 301.88, 322.86, 332.28, 304.36, 303.11, 311.81, 285.43, 285.48, 298.07, 298.41, 293.08, 303.5, 289.19], 'YTD': [173.49, 188.45, 189.12, 193.31, 215.55, 221.44, 226.16, 213.35, 202.67, 197.46, 194.45, 194.63, 194.14, 208.9, 216.29, 236.31, 269.22, 289.44, 306.34, 298.39, 305.68, 285.06, 301.12, 332.28, 285.48, 289.19], '6M': [185.71, 193.45, 194.99, 218.97, 223.98, 223, 219.73, 212.63, 197.98, 190.05, 188.29, 193.41, 194.87, 214.73, 229.82, 277.14, 281.02, 287.8, 302.73, 298.39, 305.68, 285.06, 301.12, 332.28, 285.48, 289.19], '1Y': [213.41, 220.05, 214.57, 189.25, 182.73, 183.71, 194.33, 206.06, 202.48, 185.82, 178.2, 179.62, 183.23, 181.81, 175.11, 179.59, 169.41, 161.46, 160.58, 154.99, 159.4, 168.16, 180.94, 177.97, 178.82, 175.42, 185.71, 193.45, 194.99, 218.97, 223.98, 223, 218.05, 212.63, 197.98, 190.05, 188.29, 193.41, 194.87, 214.73, 229.82, 277.14, 281.02, 287.8, 302.73, 298.39, 305.68, 285.06, 301.12, 332.28, 285.48, 289.19] },
      velocityScore: { '1D': 0.6, '1W': 11.9, '1M': 11.1, '6M': null }, isNew: false,
      marketCap: '$263B', pe: 49.4, revenueGrowth: 19, eps: 5.86, grossMargin: 57, dividendYield: 1.87,
      etfPresence: { SOXX: 3.93, PSI: false, XSD: 2.47, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 3, proScore: 1.5, coverage: 0.5,
      price: 397.55, weeklyPrices: [483.02, 430.86, 406.42, 432.74, 397.55], weeklyChange: -17.69, dayChange: -8.13, sortRank: 0, periodReturns: { '1M': 14.8, 'YTD': 139, '6M': 139.8, '1Y': 343.6 },
      priceHistory: { '1D': [432.74, 401.93, 397.55], '1W': [483.02, 430.86, 406.42, 432.74, 397.55], '1M': [346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86, 406.42, 432.74, 397.55], 'YTD': [166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.4, 109.8, 116.48, 127.57, 121.76, 109.6, 125.46, 172.09, 194.06, 196.85, 213.91, 224.09, 297.84, 342.85, 317.06, 367.15, 439.66, 455.96, 397.55], '6M': [165.77, 172.14, 176.35, 160.46, 142.82, 126.58, 129.68, 124.67, 120, 119.9, 126.16, 113.61, 117.14, 149.05, 174.05, 212.84, 202.68, 199.79, 232.68, 297.84, 342.85, 317.06, 367.15, 439.66, 455.96, 397.55], '1Y': [89.62, 90.32, 121.89, 124.05, 137.93, 179.43, 186.43, 179.09, 182.2, 216.1, 231.29, 237.3, 198.8, 220.81, 199.53, 156.31, 170.28, 191.56, 173.74, 141.39, 141.8, 165.19, 175.74, 143.66, 172.62, 170.84, 165.77, 172.14, 176.35, 160.46, 142.82, 126.58, 132.62, 124.67, 120, 119.9, 126.16, 113.61, 117.14, 149.05, 174.05, 212.84, 202.68, 199.79, 232.68, 297.84, 342.85, 317.06, 367.15, 439.66, 455.96, 397.55] },
      velocityScore: { '1D': 3.4, '1W': -0.7, '1M': -5.7, '6M': null }, isNew: false,
      marketCap: '$68B', pe: 270.4, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.98, PSI: false, XSD: 3.01, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.86, proScore: 1.43, coverage: 0.5,
      price: 271.79, weeklyPrices: [281.03, 279.18, 273.36, 280.51, 271.79], weeklyChange: -3.29, dayChange: -3.11, sortRank: 0, periodReturns: { '1M': -9.7, 'YTD': 25.2, '6M': 13.6, '1Y': 20.3 },
      priceHistory: { '1D': [280.51, 271.23, 271.62, 271.79], '1W': [281.03, 279.18, 273.36, 280.51, 271.79], '1M': [301.14, 297.41, 285.56, 302.55, 304.86, 315.88, 302.89, 298.2, 313.27, 323.24, 299.94, 294.06, 298.64, 277.02, 278.37, 281.03, 279.18, 273.36, 280.51, 271.79], 'YTD': [217.06, 237.89, 238.6, 232.48, 226.14, 224.32, 244.43, 234.63, 215.25, 203.03, 194.02, 196.4, 196.86, 204.27, 209.39, 225.75, 289.25, 303.55, 298.41, 299.38, 321.35, 295.96, 304.86, 323.24, 278.37, 271.79], '6M': [239.34, 240.81, 236.75, 233.5, 222.13, 242.19, 232.27, 232.23, 210.58, 191.22, 192.35, 196.92, 194.55, 204.37, 216.03, 244.04, 295.24, 294.75, 291.5, 299.38, 321.35, 295.96, 304.86, 323.24, 278.37, 271.79], '1Y': [226, 224.61, 228.27, 228.49, 211.99, 205.16, 232.01, 234.83, 234.85, 225.5, 219.27, 225.73, 226.11, 231.42, 216.7, 219.82, 221.56, 210.39, 205.13, 190.51, 191.35, 199.49, 229.01, 231.83, 228.94, 219.98, 239.34, 240.81, 236.75, 233.5, 222.13, 242.19, 232.11, 232.23, 210.58, 191.22, 192.35, 196.92, 194.55, 204.37, 216.03, 244.04, 295.24, 294.75, 291.5, 299.38, 321.35, 295.96, 304.86, 323.24, 278.37, 271.79] },
      velocityScore: { '1D': 0, '1W': 5.9, '1M': -0.7, '6M': null }, isNew: false,
      marketCap: '$69B', pe: 26, revenueGrowth: 12, eps: 10.46, grossMargin: 56, dividendYield: 1.45,
      etfPresence: { SOXX: 3.46, PSI: false, XSD: 2.25, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.62, proScore: 1.31, coverage: 0.5,
      price: 1283.56, weeklyPrices: [1382.36, 1331.73, 1288.16, 1346.13, 1283.56], weeklyChange: -7.15, dayChange: -4.65, sortRank: 0, periodReturns: { '1M': -17.7, 'YTD': 41.6, '6M': 33.8, '1Y': 73.2 },
      priceHistory: { '1D': [1346.13, 1281.77, 1278.98, 1283.56], '1W': [1382.36, 1331.73, 1288.16, 1346.13, 1283.56], '1M': [1559.18, 1531.98, 1473.04, 1589.55, 1577.32, 1652.29, 1498.77, 1448.21, 1563.7, 1537.88, 1423.76, 1434.95, 1438.3, 1313.32, 1312.77, 1382.36, 1331.73, 1288.16, 1346.13, 1283.56], 'YTD': [906.36, 959.09, 1009.54, 1063.74, 1124.15, 1229.82, 1171.47, 1213.67, 1074.37, 1055.82, 1066.66, 1101.59, 1093.35, 1312.94, 1353, 1522.04, 1526.84, 1652.35, 1650.35, 1561.25, 1566.21, 1481.05, 1577.32, 1537.88, 1312.77, 1283.56], '6M': [959.08, 983.6, 1076.67, 1183.15, 1155.99, 1155.93, 1204.1, 1180.13, 1078.44, 1033.88, 1092.69, 1058.28, 1118.49, 1353.85, 1468.35, 1632.06, 1583.48, 1600.84, 1550.02, 1561.25, 1566.21, 1481.05, 1577.32, 1537.88, 1312.77, 1283.56], '1Y': [741.17, 721.14, 724.77, 738.55, 830.63, 797.51, 850.31, 844, 835.76, 864.32, 849.71, 922.81, 886.59, 968.1, 981.67, 1031.59, 1105.05, 1003.93, 976.31, 897.01, 872.35, 928.35, 983.58, 949.4, 945.16, 923.91, 959.08, 983.6, 1076.67, 1183.15, 1155.99, 1155.93, 1175.22, 1180.13, 1078.44, 1033.88, 1092.69, 1058.28, 1118.49, 1353.85, 1468.35, 1632.06, 1583.48, 1600.84, 1550.02, 1561.25, 1566.21, 1481.05, 1577.32, 1537.88, 1312.77, 1283.56] },
      velocityScore: { '1D': 2.3, '1W': 7.4, '1M': -5.8, '6M': null }, isNew: false,
      marketCap: '$63B', pe: 91.7, revenueGrowth: 26, eps: 14, grossMargin: 55, dividendYield: 0.59,
      etfPresence: { SOXX: 3.14, PSI: false, XSD: 2.1, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 2.59, proScore: 1.3, coverage: 0.5,
      price: 183.06, weeklyPrices: [184.79, 181.92, 176.25, 186.48, 183.06], weeklyChange: -0.94, dayChange: -1.83, sortRank: 0, periodReturns: { '1M': -15.9, 'YTD': 7, '6M': 1.6, '1Y': 15.8 },
      priceHistory: { '1D': [186.48, 183.12, 182.82, 183.06], '1W': [184.79, 181.92, 176.25, 186.48, 183.06], '1M': [217.77, 205.42, 191.2, 202.96, 211.72, 220.81, 214.07, 212.97, 226.11, 221.9, 204.13, 197.41, 204.9, 189.39, 188.72, 184.79, 181.92, 176.25, 186.48, 183.06], 'YTD': [171.05, 181.87, 161.39, 155.82, 151.59, 137.34, 140.7, 144.78, 138.13, 135.2, 131.59, 128.67, 128.78, 127.51, 133.05, 136.07, 156, 192.57, 213.17, 213.41, 251.02, 215.94, 211.72, 221.9, 188.72, 183.06], '6M': [180.19, 164.54, 157.8, 152.22, 136.3, 138.47, 142.88, 145.59, 137, 131.15, 131.28, 130.54, 126.8, 128.06, 136.2, 148.85, 177.01, 219.09, 201.49, 213.41, 251.02, 215.94, 211.72, 221.9, 188.72, 183.06], '1Y': [158.09, 154.29, 158.97, 161.05, 147.51, 147.97, 158.9, 158.01, 160.73, 160.24, 161.22, 169.72, 165.3, 168.62, 161.78, 167.04, 187.68, 180.72, 171.57, 166.75, 163.3, 168.04, 175.31, 179.26, 174.22, 173.65, 180.19, 164.54, 157.8, 152.22, 136.3, 138.47, 141.27, 145.59, 137, 131.15, 131.28, 130.54, 126.8, 128.06, 136.2, 148.85, 177.01, 219.09, 201.49, 213.41, 251.02, 215.94, 211.72, 221.9, 188.72, 183.06] },
      velocityScore: { '1D': 3.2, '1W': 4, '1M': -20.2, '6M': null }, isNew: false,
      marketCap: '$193B', pe: 19.7, revenueGrowth: -4, eps: 9.31, grossMargin: 55, dividendYield: 1.97,
      etfPresence: { SOXX: 2.94, PSI: false, XSD: 2.25, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.37, proScore: 1.18, coverage: 0.5,
      price: 245.61, weeklyPrices: [271.95, 259.09, 241.91, 265.55, 245.61], weeklyChange: -9.69, dayChange: -7.51, sortRank: 0, periodReturns: { '1M': 10.5, 'YTD': 70.7, '6M': 74.2, '1Y': 164.9 },
      priceHistory: { '1D': [265.55, 247.43, 245.74, 245.61], '1W': [271.95, 259.09, 241.91, 265.55, 245.61], '1M': [222.27, 234.32, 237.68, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.09, 241.91, 265.55, 245.61], 'YTD': [143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 120.83, 97.3, 112.33, 104.06, 100.3, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 189.36, 193.39, 236.03, 206.89, 250.81, 302.52, 245.68, 245.61], '6M': [141, 156.84, 135.1, 129.47, 98.06, 121.78, 124.06, 114.48, 114.74, 111.57, 107.09, 96.44, 101.45, 119.59, 160.69, 195.04, 184.38, 188.51, 172.17, 193.39, 236.03, 206.89, 250.81, 302.52, 245.68, 245.61], '1Y': [92.73, 98.7, 95.74, 107.95, 114.7, 118.57, 118.74, 114.04, 123.06, 147.53, 163.98, 164.1, 146.01, 147.42, 149.9, 151.66, 154.96, 180.64, 170.16, 145.58, 133.49, 171.13, 178.94, 142.02, 149.94, 144.92, 141, 156.84, 135.1, 129.47, 98.06, 121.78, 130.66, 114.48, 114.74, 111.57, 107.09, 96.44, 101.45, 119.59, 160.69, 195.04, 184.38, 188.51, 172.17, 193.39, 236.03, 206.89, 250.81, 302.52, 245.68, 245.61] },
      velocityScore: { '1D': 6.3, '1W': 12.4, '1M': 1.7, '6M': null }, isNew: false,
      marketCap: '$46B', pe: 97.5, revenueGrowth: 157, eps: 2.52, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 2.16, PSI: false, XSD: 2.57, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.29, proScore: 1.15, coverage: 0.5,
      price: 83.42, weeklyPrices: [91.20, 88.69, 84.64, 87.59, 83.42], weeklyChange: -8.54, dayChange: -4.77, sortRank: 0, periodReturns: { '1M': -8.7, 'YTD': 30.9, '6M': 12.8, '1Y': 16.7 },
      priceHistory: { '1D': [87.59, 83.67, 83.25, 83.42], '1W': [91.2, 88.69, 84.64, 87.59, 83.42], '1M': [91.37, 91.47, 87.91, 92.94, 95.24, 100.32, 95.63, 94.11, 99.77, 102.71, 93.26, 92.48, 94.12, 87.93, 89.06, 91.2, 88.69, 84.64, 87.59, 83.42], 'YTD': [63.72, 73.53, 74.45, 74.71, 75.92, 76.01, 78.56, 75.93, 71.39, 65.33, 64.59, 65.63, 64.61, 70.73, 74.49, 82.48, 90.17, 102.92, 96.71, 91.11, 94.65, 88.34, 95.24, 102.71, 89.06, 83.42], '6M': [73.94, 74.68, 75.47, 79.36, 78.04, 78.92, 77.73, 74.97, 67.81, 62.73, 63.29, 64.2, 65.6, 71.56, 78.76, 89.44, 93.95, 99.09, 93.85, 91.11, 94.65, 88.34, 95.24, 102.71, 89.06, 83.42], '1Y': [71.48, 74.05, 73.85, 70.53, 66.59, 60.95, 65.56, 69.14, 65, 65.3, 63.17, 65.4, 64.07, 66.59, 64.39, 67.07, 64.55, 62.41, 55.41, 51.7, 50.9, 53.43, 67.35, 67.18, 66.24, 64.68, 73.94, 74.68, 75.47, 79.36, 78.04, 78.92, 77.16, 74.97, 67.81, 62.73, 63.29, 64.2, 65.6, 71.56, 78.76, 89.44, 93.95, 99.09, 93.85, 91.11, 94.65, 88.34, 95.24, 102.71, 89.06, 83.42] },
      velocityScore: { '1D': 0.9, '1W': 3.6, '1M': -1.7, '6M': null }, isNew: false,
      marketCap: '$45B', pe: 379.2, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 2.08,
      etfPresence: { SOXX: 2.29, PSI: false, XSD: 2.3, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 1.9, proScore: 0.95, coverage: 0.5,
      price: 90.56, weeklyPrices: [94.54, 94.63, 91.22, 94.69, 90.56], weeklyChange: -4.21, dayChange: -4.36, sortRank: 0, periodReturns: { '1M': -25.1, 'YTD': 67.2, '6M': 46.3, '1Y': 65.8 },
      priceHistory: { '1D': [94.69, 90.67, 90.51, 90.56], '1W': [94.54, 94.63, 91.22, 94.69, 90.56], '1M': [120.9, 117, 110.17, 115.96, 116.79, 125.9, 118.25, 112.92, 121.62, 131.55, 117.06, 115.74, 118.74, 90.65, 88.57, 94.54, 94.63, 91.22, 94.69, 90.56], 'YTD': [54.15, 60.89, 60.28, 61.98, 59.89, 65.2, 72.21, 70.03, 63.42, 59.59, 60.98, 62.34, 61.92, 68.38, 72.43, 88.99, 98.86, 105.77, 115.71, 109.61, 120.62, 117.26, 116.79, 131.55, 88.57, 90.56], '6M': [61.89, 60.58, 63.07, 62.2, 63.1, 70.63, 69.11, 68.16, 60.85, 57.69, 59.29, 60.87, 62.19, 68.65, 83.01, 98.4, 103.03, 103.2, 113.11, 109.61, 120.62, 117.26, 116.79, 131.55, 88.57, 90.56], '1Y': [54.61, 59.07, 60.55, 58.66, 47.97, 47.1, 50.53, 51.85, 49.59, 48.88, 48.11, 51.5, 49.76, 50.35, 50.11, 54.89, 52.68, 50.46, 48.54, 46.02, 46.7, 50.43, 56.38, 55.09, 56.37, 54.24, 61.89, 60.58, 63.07, 62.2, 63.1, 70.63, 68.09, 68.16, 60.85, 57.69, 59.29, 60.87, 62.19, 68.65, 83.01, 98.4, 103.03, 103.2, 113.11, 109.61, 120.62, 117.26, 116.79, 131.55, 88.57, 90.56] },
      velocityScore: { '1D': 1.1, '1W': 11.8, '1M': -32.1, '6M': null }, isNew: false,
      marketCap: '$35B', pe: 66.6, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 1.82, PSI: false, XSD: 1.97, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 2, avgWeight: 1.62, proScore: 0.81, coverage: 0.5,
      price: 309.59, weeklyPrices: [380.37, 350.63, 322.26, 327.64, 309.59], weeklyChange: -18.61, dayChange: -5.51, sortRank: 0, periodReturns: { '1M': -14.4, 'YTD': 80.8, '6M': 81.5, '1Y': 124.3 },
      priceHistory: { '1D': [327.64, 308, 309.59], '1W': [380.37, 350.63, 322.26, 327.64, 309.59], '1M': [361.86, 358.72, 354.4, 374.76, 379.87, 384.77, 368.32, 367.11, 391.41, 396.26, 372.15, 373.08, 390.19, 369.18, 372.59, 380.37, 350.63, 322.26, 327.64, 309.59], 'YTD': [171.28, 167.66, 218.93, 219.26, 219.06, 235.87, 244.16, 248.29, 241.01, 220.59, 221.29, 237.23, 222.07, 247, 261.16, 277, 269.63, 309.81, 381.55, 380.45, 364.64, 345.4, 379.87, 396.26, 372.59, 309.59], '6M': [170.62, 215.01, 224.29, 227.73, 227.8, 238.99, 243.59, 247.11, 228.98, 215.94, 224.54, 228.5, 238.3, 258.11, 276.97, 287.64, 284.18, 359.88, 375.6, 380.45, 364.64, 345.4, 379.87, 396.26, 372.59, 309.59], '1Y': [138.04, 136.63, 140.58, 139.58, 140, 118.35, 124.55, 126.15, 128.15, 130.25, 131.42, 129.49, 123.29, 131.71, 130.53, 140.33, 146.39, 150.19, 178.42, 159.83, 158.27, 172.85, 185.54, 175.29, 175.19, 174.87, 170.62, 215.01, 224.29, 227.73, 227.8, 238.99, 242.56, 247.11, 228.98, 215.94, 224.54, 228.5, 238.3, 258.11, 276.97, 287.64, 284.18, 359.88, 375.6, 380.45, 364.64, 345.4, 379.87, 396.26, 372.59, 309.59] },
      velocityScore: { '1D': -1.2, '1W': -8, '1M': -12.9, '6M': null }, isNew: false,
      marketCap: '$24B', pe: 131.2, revenueGrowth: 23, eps: 2.36, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: 1.11, PSI: false, XSD: 2.12, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RMBS', name: 'RAMBUS INC', easyScore: 2, avgWeight: 1.24, proScore: 0.62, coverage: 0.5,
      price: 107.22, weeklyPrices: [132.74, 123.83, 112.92, 113.25, 107.22], weeklyChange: -19.23, dayChange: -5.32, sortRank: 0, periodReturns: { '1M': -29.5, 'YTD': 16.7, '6M': 17, '1Y': 68.1 },
      priceHistory: { '1D': [113.25, 106.85, 107.22], '1W': [132.74, 123.83, 112.92, 113.25, 107.22], '1M': [152.03, 146.84, 138.12, 144.47, 146.56, 143.29, 132.48, 130.1, 141.17, 140.35, 128.21, 124.52, 123.69, 114.73, 123.9, 132.74, 123.83, 112.92, 113.25, 107.22], 'YTD': [91.89, 91.34, 103.07, 115.31, 113.83, 107.1, 101.95, 98.57, 87.59, 89.61, 93.5, 92.69, 86.03, 101.43, 120.02, 131.55, 112.16, 130.04, 134.85, 141.82, 145.46, 145.31, 146.56, 140.35, 123.9, 107.22], '6M': [91.65, 100.62, 124.77, 121.6, 98.1, 95.8, 102.64, 102.17, 91.91, 89.78, 94.62, 91.44, 93.03, 110.44, 126.93, 158.4, 111.93, 129.25, 127.05, 141.82, 145.46, 145.31, 146.56, 140.35, 123.9, 107.22], '1Y': [63.79, 63.28, 68.91, 64.24, 75.73, 72.77, 75.77, 73.77, 73.77, 73.28, 94.88, 106.94, 103.99, 101, 97.01, 97.77, 113.61, 105.76, 110.6, 91.13, 88.15, 94.19, 104.07, 95.45, 95.26, 94.69, 91.65, 100.62, 124.77, 121.6, 98.1, 95.8, 104.13, 102.17, 91.91, 89.78, 94.62, 91.44, 93.03, 110.44, 126.93, 158.4, 111.93, 129.25, 127.05, 141.82, 145.46, 145.31, 146.56, 140.35, 123.9, 107.22] },
      velocityScore: { '1D': null, '1W': -4.6, '1M': -25.3, '6M': null }, isNew: true,
      marketCap: '$12B', pe: 51.1, revenueGrowth: 8, eps: 2.1, grossMargin: 80, dividendYield: null,
      etfPresence: { SOXX: 0.6, PSI: false, XSD: 1.88, DRAM: false },
      tonyNote: 'RAMBUS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 8, avgWeight: 5.87, proScore: 2.76, coverage: 0.471,
      price: 916.69, weeklyPrices: [1154.29, 1032.28, 975.56, 984.75, 916.69], weeklyChange: -20.58, dayChange: -6.91, sortRank: 0, periodReturns: { '1M': -3.4, 'YTD': 221.2, '6M': 170, '1Y': 664.4 },
      priceHistory: { '1D': [984.75, 916.98, 916.69], '1W': [1154.29, 1032.28, 975.56, 984.75, 916.69], '1M': [949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 916.69], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 762.1, 971, 864.01, 981.61, 1211.38, 1145.28, 916.69], '6M': [339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 415.56, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 762.1, 971, 864.01, 981.61, 1211.38, 1145.28, 916.69], '1Y': [119.92, 118.61, 113.23, 111.25, 107.77, 123.72, 123.55, 117.68, 119.01, 131.46, 157.77, 164.62, 163.9, 190.96, 192.77, 206.77, 220.1, 234.7, 253.3, 241.95, 207.37, 240.46, 246.92, 237.5, 276.59, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 417.35, 415.56, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 762.1, 971, 864.01, 981.61, 1211.38, 1145.28, 916.69] },
      velocityScore: { '1D': 0, '1W': -11.3, '1M': 15, '6M': null }, isNew: false,
      marketCap: '$1.0T', pe: 20.7, revenueGrowth: 346, eps: 44.22, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { PTF: 4.88, WCLD: false, IGV: false, FDTX: 9.33, GTEK: false, ARKK: false, MARS: false, FRWD: 4.6, BCTK: 4.27, FWD: false, CBSE: false, FCUS: 4.49, WGMI: false, CNEQ: 1.64, SGRT: 6.97, SPMO: 10.74, XMMO: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 8, avgWeight: 5.59, proScore: 2.63, coverage: 0.471,
      price: 192.47, weeklyPrices: [200.09, 197.58, 194.83, 195.55, 192.47], weeklyChange: -3.81, dayChange: -1.58, sortRank: 0, periodReturns: { '1M': -7.8, 'YTD': 3.2, '6M': 1.8, '1Y': 21.6 },
      priceHistory: { '1D': [195.55, 192.75, 192.47], '1W': [200.09, 197.58, 194.83, 195.55, 192.47], '1M': [208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83, 195.55, 192.47], 'YTD': [186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 192.85, 180.05, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 219.51, 211.14, 205.1, 205.19, 208.65, 194.97, 192.47], '6M': [189.11, 183.14, 184.84, 192.51, 171.88, 186.94, 189.82, 184.89, 183.34, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 225.32, 219.51, 211.14, 205.1, 205.19, 208.65, 194.97, 192.47], '1Y': [158.24, 164.07, 171.38, 176.75, 180, 182.06, 182.01, 177.99, 174.18, 168.31, 177.75, 183.61, 181.85, 185.54, 188.32, 182.64, 191.49, 206.88, 199.05, 186.6, 178.88, 179.92, 185.55, 176.29, 183.69, 187.54, 189.11, 183.14, 184.84, 192.51, 171.88, 186.94, 187.9, 184.89, 183.34, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 225.32, 219.51, 211.14, 205.1, 205.19, 208.65, 194.97, 192.47] },
      velocityScore: { '1D': -0.4, '1W': -15.2, '1M': 15.4, '6M': null }, isNew: false,
      marketCap: '$4.7T', pe: 29.5, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.51,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.09, GTEK: false, ARKK: 1.49, MARS: false, FRWD: 8.39, BCTK: 5.8, FWD: 1.89, CBSE: false, FCUS: false, WGMI: 2.33, CNEQ: 12.98, SGRT: false, SPMO: 7.78, XMMO: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 8, avgWeight: 3.63, proScore: 1.71, coverage: 0.471,
      price: 511.8, weeklyPrices: [580.91, 540.88, 517.82, 552.05, 511.80], weeklyChange: -11.9, dayChange: -7.29, sortRank: 0, periodReturns: { '1M': 4.4, 'YTD': 139, '6M': 143.7, '1Y': 279.7 },
      priceHistory: { '1D': [552.05, 511.04, 511.8], '1W': [580.91, 540.88, 517.82, 552.05, 511.8], '1M': [490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 511.8], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 449.59, 516.1, 466.38, 511.57, 551.63, 539.49, 511.8], '6M': [210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 203.68, 199.45, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 449.59, 516.1, 466.38, 511.57, 551.63, 539.49, 511.8], '1Y': [134.8, 146.24, 157, 173.66, 176.78, 172.28, 176.14, 167.76, 162.63, 151.41, 161.16, 159.79, 161.36, 203.71, 216.42, 240.56, 259.67, 259.65, 243.98, 240.52, 203.78, 219.76, 221.11, 207.58, 214.95, 215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 203.37, 203.68, 199.45, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 449.59, 516.1, 466.38, 511.57, 551.63, 539.49, 511.8] },
      velocityScore: { '1D': 12.5, '1W': -1.2, '1M': 0.6, '6M': null }, isNew: false,
      marketCap: '$835B', pe: 171.7, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: 3.05, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.45, MARS: false, FRWD: 7.4, BCTK: 3.29, FWD: 2.19, CBSE: false, FCUS: false, WGMI: false, CNEQ: 1.13, SGRT: 3.41, SPMO: 4.14, XMMO: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 7, avgWeight: 5.02, proScore: 2.07, coverage: 0.412,
      price: 536.5, weeklyPrices: [638.72, 598.37, 539.00, 577.46, 536.50], weeklyChange: -16, dayChange: -7.09, sortRank: 0, periodReturns: { '1M': 1.8, 'YTD': 211.4, '6M': 168.4, '1Y': 722.6 },
      priceHistory: { '1D': [577.46, 538.01, 537.93, 536.5], '1W': [638.72, 598.37, 539, 577.46, 536.5], '1M': [526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539, 577.46, 536.5], 'YTD': [172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 270.57, 250.61, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 486.46, 531.21, 511.72, 562.93, 732.62, 651.88, 536.5], '6M': [199.88, 215, 243.29, 278.41, 260.19, 284.1, 285.52, 282.25, 259.03, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 431.52, 480, 482.02, 486.46, 531.21, 511.72, 562.93, 732.62, 651.88, 536.5], '1Y': [65.22, 66.93, 68.74, 68.99, 77.29, 74.64, 76.29, 76.97, 80.34, 93.29, 102.39, 112.41, 116.74, 125.28, 118.86, 121.53, 126.67, 158.02, 174.22, 162.45, 139.19, 163.54, 169.78, 172.04, 176.76, 176.06, 199.88, 215, 243.29, 278.41, 260.19, 284.1, 284.67, 282.25, 259.03, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 431.52, 480, 482.02, 486.46, 531.21, 511.72, 562.93, 732.62, 651.88, 536.5] },
      velocityScore: { '1D': 0, '1W': 1, '1M': 46.8, '6M': null }, isNew: false,
      marketCap: '$185B', pe: 32.1, revenueGrowth: 46, eps: 16.69, grossMargin: 45, dividendYield: 0.1,
      etfPresence: { PTF: 4.37, WCLD: false, IGV: false, FDTX: 4.49, GTEK: false, ARKK: false, MARS: false, FRWD: 4.36, BCTK: false, FWD: false, CBSE: false, FCUS: 4.71, WGMI: false, CNEQ: 4.78, SGRT: 10.65, SPMO: 1.79, XMMO: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 7, avgWeight: 4.46, proScore: 1.84, coverage: 0.412,
      price: 434.48, weeklyPrices: [477.57, 444.23, 434.16, 451.79, 434.48], weeklyChange: -9.02, dayChange: -3.84, sortRank: 0, periodReturns: { '1M': 1.8, 'YTD': 43, '6M': 36.3, '1Y': 89.6 },
      priceHistory: { '1D': [451.84, 435.62, 434.48], '1W': [477.57, 444.23, 434.16, 451.79, 434.48], '1M': [426.8, 427.92, 408.75, 421.07, 423.93, 441.4, 425.83, 432.15, 462.12, 467.67, 436.39, 440.83, 434.99, 432.35, 455.1, 477.57, 444.23, 434.16, 451.79, 434.48], 'YTD': [303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 385.75, 353.13, 347.09, 345.98, 343.25, 337.95, 365.9, 375.1, 387.44, 393.83, 419.5, 399.8, 407.15, 418.45, 415.17, 423.93, 467.67, 455.1, 434.48], '6M': [318.68, 327.11, 327.37, 339.55, 330.73, 368.1, 370.54, 376.81, 353.86, 336.71, 338.79, 326.11, 339.04, 370.6, 370.5, 402.46, 397.67, 411.68, 404.35, 407.15, 418.45, 415.17, 423.93, 467.67, 455.1, 434.48], '1Y': [229.17, 228.67, 238.85, 242.75, 239, 242.09, 241.41, 232.99, 230.87, 247.19, 261.38, 272.63, 273.23, 302.4, 302.89, 297.7, 298.25, 304.86, 295.27, 282.01, 275.06, 287.68, 301.87, 287.74, 293.28, 299.58, 318.68, 327.11, 327.37, 339.55, 330.73, 368.1, 360.39, 376.81, 353.86, 336.71, 338.79, 326.11, 339.04, 370.6, 370.5, 402.46, 397.67, 411.68, 404.35, 407.15, 418.45, 415.17, 423.93, 467.67, 455.1, 434.48] },
      velocityScore: { '1D': 0.5, '1W': 11.5, '1M': 11.5, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 37.7, revenueGrowth: 35, eps: 11.52, grossMargin: 62, dividendYield: 0.84,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6.39, GTEK: false, ARKK: 0.93, MARS: false, FRWD: 6.1, BCTK: 8.62, FWD: false, CBSE: 2.58, FCUS: false, WGMI: 0.72, CNEQ: 5.88, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 7, avgWeight: 3.57, proScore: 1.47, coverage: 0.412,
      price: 366.42, weeklyPrices: [377.75, 369.34, 360.45, 373.90, 366.42], weeklyChange: -3, dayChange: -2, sortRank: 0, periodReturns: { '1M': -7.6, 'YTD': 5.9, '6M': 6.7, '1Y': 33.6 },
      priceHistory: { '1D': [373.9, 366.93, 366.42], '1W': [377.75, 369.34, 360.45, 373.9, 366.42], '1M': [396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45, 373.9, 366.42], 'YTD': [346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 325.49, 313.84, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 414.57, 446.77, 385.73, 382.07, 392.13, 372.45, 366.42], '6M': [343.5, 339.89, 325.49, 330.73, 310.51, 331.17, 332.65, 321.7, 332.77, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 425.19, 414.57, 446.77, 385.73, 382.07, 392.13, 372.45, 366.42], '1Y': [274.18, 275.6, 288.21, 294.3, 297.72, 303.9, 305.76, 294, 297.39, 345.65, 364.09, 338.79, 327.9, 335.49, 356.7, 349.24, 362.05, 362.55, 358.39, 342.65, 340.2, 386.08, 401.1, 339.81, 341.45, 349.85, 343.5, 339.89, 325.49, 330.73, 310.51, 331.17, 333.99, 321.7, 332.77, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 425.19, 414.57, 446.77, 385.73, 382.07, 392.13, 372.45, 366.42] },
      velocityScore: { '1D': 0.7, '1W': -1.3, '1M': 13.1, '6M': null }, isNew: false,
      marketCap: '$1.7T', pe: 60.9, revenueGrowth: 48, eps: 6.02, grossMargin: 76, dividendYield: 0.7,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.62, GTEK: false, ARKK: 1.02, MARS: false, FRWD: 4.71, BCTK: 6.52, FWD: 1.84, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.19, SGRT: false, SPMO: 6.09, XMMO: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 6, avgWeight: 3.13, proScore: 1.1, coverage: 0.353,
      price: 246.7, weeklyPrices: [238.34, 241.70, 242.67, 244.16, 246.70], weeklyChange: 3.51, dayChange: 1.04, sortRank: 0, periodReturns: { '1M': 0.6, 'YTD': 6.9, '6M': 2.1, '1Y': 10.4 },
      priceHistory: { '1D': [244.16, 246.9, 246.7], '1W': [238.34, 241.7, 242.67, 244.16, 246.7], '1M': [245.22, 244.19, 238, 241.51, 238.55, 246.02, 246, 237.5, 244.39, 232.79, 234.11, 234.27, 227.01, 232.69, 240.14, 238.34, 241.7, 242.67, 244.16, 246.7], 'YTD': [230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 198.79, 208.56, 208.73, 214.33, 215.2, 207.24, 208.27, 221.25, 248.5, 255.36, 263.04, 274.99, 270.13, 268.46, 270.64, 246.03, 238.55, 232.79, 240.14, 246.7], '6M': [241.56, 236.65, 234.34, 241.73, 222.69, 199.6, 210.11, 207.92, 218.94, 209.53, 208.76, 207.54, 209.77, 238.38, 250.56, 263.99, 268.26, 272.68, 264.14, 268.46, 270.64, 246.03, 238.55, 232.79, 240.14, 246.7], '1Y': [223.47, 225.69, 229.3, 232.79, 211.65, 221.3, 231.49, 228.84, 229, 235.84, 231.43, 227.63, 222.17, 220.9, 220.07, 216.48, 226.97, 254, 248.4, 232.87, 220.69, 233.88, 226.89, 222.54, 228.43, 232.53, 241.56, 236.65, 234.34, 241.73, 222.69, 199.6, 204.86, 207.92, 218.94, 209.53, 208.76, 207.54, 209.77, 238.38, 250.56, 263.99, 268.26, 272.68, 264.14, 268.46, 270.64, 246.03, 238.55, 232.79, 240.14, 246.7] },
      velocityScore: { '1D': -0.9, '1W': -4.3, '1M': -9.8, '6M': null }, isNew: false,
      marketCap: '$2.7T', pe: 32, revenueGrowth: 17, eps: 7.72, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.29, GTEK: false, ARKK: 2.32, MARS: false, FRWD: 3.05, BCTK: 4.34, FWD: 1.55, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.23, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'SPCX', name: 'SPACE EXPLORATION TECHN-CL A', easyScore: 5, avgWeight: 8.18, proScore: 2.41, coverage: 0.294,
      price: 156.66, weeklyPrices: [170.86, 157.54, 162.00, 160.42, 156.66], weeklyChange: -8.31, dayChange: -2.34, sortRank: 0, periodReturns: { '1M': -2.7, 'YTD': -2.7, '6M': -2.7, '1Y': -2.7 },
      priceHistory: { '1D': [160.42, 157, 156.49, 156.66], '1W': [170.86, 157.54, 162, 160.42, 156.66], '1M': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 156.66], 'YTD': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 156.66], '6M': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 156.66], '1Y': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 156.66] },
      velocityScore: { '1D': -0.4, '1W': -4.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.1T', pe: null, revenueGrowth: 15, eps: -0.67, grossMargin: 49, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.07, MARS: 22.25, FRWD: 2.51, BCTK: 8.68, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.4, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'SPACE EXPLORATION TECHN-CL A appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 8.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LRCX', name: 'Lam Research Corp', easyScore: 5, avgWeight: 4.43, proScore: 1.3, coverage: 0.294,
      price: 324.56, weeklyPrices: [433.33, 391.26, 351.41, 350.20, 324.56], weeklyChange: -25.1, dayChange: -7.33, sortRank: 0, periodReturns: { '1M': 0, 'YTD': 89.6, '6M': 59.8, '1Y': 230.7 },
      priceHistory: { '1D': [350.2, 324.43, 323.87, 324.56], '1W': [433.33, 391.26, 351.41, 350.2, 324.56], '1M': [324.45, 327.16, 321.8, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04, 409.54, 371.33, 374.8, 401.82, 379.09, 410.91, 433.33, 391.26, 351.41, 350.2, 324.56], 'YTD': [171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 244.25, 217.27, 215.23, 226.47, 238.84, 213.66, 246.49, 265.16, 265.55, 248.75, 297.17, 295.44, 302.24, 318.18, 303.28, 366.81, 409.54, 410.91, 324.56], '6M': [203.08, 208.79, 220.7, 248.17, 213.31, 231.29, 244.92, 239.07, 214.68, 209.49, 233.99, 211.62, 218.44, 263.66, 267.6, 267.78, 256.72, 294.05, 284.72, 302.24, 318.18, 303.28, 366.81, 409.54, 410.91, 324.56], '1Y': [98.14, 99.62, 101.74, 98.62, 98.41, 102, 98.88, 100.08, 100.15, 105.07, 119.21, 132.2, 131.09, 149.15, 137.81, 144.05, 156.9, 161.24, 166.37, 147.46, 142.65, 154.79, 162.74, 164.3, 175.26, 173.78, 203.08, 208.79, 220.7, 248.17, 213.31, 231.29, 237.39, 239.07, 214.68, 209.49, 233.99, 211.62, 218.44, 263.66, 267.6, 267.78, 256.72, 294.05, 284.72, 302.24, 318.18, 303.28, 366.81, 409.54, 410.91, 324.56] },
      velocityScore: { '1D': -0.8, '1W': -7.8, '1M': 18.2, '6M': null }, isNew: false,
      marketCap: '$406B', pe: 61.4, revenueGrowth: 24, eps: 5.29, grossMargin: 50, dividendYield: 0.3,
      etfPresence: { PTF: 3.04, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.72, BCTK: 7.6, FWD: 1.91, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 3.89, XMMO: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 5, avgWeight: 4.22, proScore: 1.24, coverage: 0.294,
      price: 821.95, weeklyPrices: [965.00, 915.19, 820.16, 868.26, 821.95], weeklyChange: -14.82, dayChange: -5.33, sortRank: 0, periodReturns: { '1M': -6.3, 'YTD': 198.5, '6M': 166.6, '1Y': 453.9 },
      priceHistory: { '1D': [868.26, 820.35, 818.38, 821.95], '1W': [965, 915.19, 820.16, 868.26, 821.95], '1M': [876.77, 846.01, 815.99, 868.09, 931.04, 1018.8, 1031.34, 1066.07, 1070.23, 1094.04, 1038.59, 993.25, 1025.36, 899.9, 968.53, 965, 915.19, 820.16, 868.26, 821.95], 'YTD': [275.39, 284.47, 320.32, 346.1, 407.69, 429.32, 425.99, 396.02, 357.62, 384.29, 421.09, 424.96, 391.76, 496.3, 519.6, 579.88, 643.3, 786.42, 817.35, 810.46, 879.8, 847.47, 931.04, 1094.04, 968.53, 821.95], '6M': [308.26, 312.28, 346.53, 446.57, 405.45, 431.17, 411.11, 409.67, 367.34, 373.98, 434.6, 378.79, 429.36, 503.13, 547.75, 586.25, 726.93, 782.64, 795.47, 810.46, 879.8, 847.47, 931.04, 1094.04, 968.53, 821.95], '1Y': [148.39, 149.08, 149.63, 150.46, 154.81, 151.69, 158.7, 159.21, 167.4, 189.24, 211.12, 229.33, 229.14, 242.83, 219.51, 214.4, 230.32, 265.55, 293.99, 261.38, 237.49, 270.1, 285.41, 285.58, 282.85, 280.08, 308.26, 312.28, 346.53, 446.57, 405.45, 431.17, 408.97, 409.67, 367.34, 373.98, 434.6, 378.79, 429.36, 503.13, 547.75, 586.25, 726.93, 782.64, 795.47, 810.46, 879.8, 847.47, 931.04, 1094.04, 968.53, 821.95] },
      velocityScore: { '1D': 0.8, '1W': -5.3, '1M': -35.1, '6M': null }, isNew: false,
      marketCap: '$184B', pe: 78.2, revenueGrowth: 44, eps: 10.51, grossMargin: 42, dividendYield: 0.34,
      etfPresence: { PTF: 3.71, WCLD: false, IGV: false, FDTX: 4.14, GTEK: false, ARKK: false, MARS: false, FRWD: 6.98, BCTK: false, FWD: false, CBSE: false, FCUS: 4.5, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.75, XMMO: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 5, avgWeight: 4.22, proScore: 1.24, coverage: 0.294,
      price: 367.14, weeklyPrices: [353.33, 357.89, 356.18, 364.90, 367.14], weeklyChange: 3.91, dayChange: 0.61, sortRank: 0, periodReturns: { '1M': 1.7, 'YTD': 17, '6M': 13.9, '1Y': 106.8 },
      priceHistory: { '1D': [364.9, 366.45, 366.51, 367.14], '1W': [353.33, 357.89, 356.18, 364.9, 367.14], '1M': [361.17, 362.29, 353.32, 356.56, 358.16, 367.11, 371.1, 362.1, 367.46, 348.78, 346.08, 345.04, 342.19, 334.69, 351.28, 353.33, 357.89, 356.18, 364.9, 367.14], 'YTD': [313.8, 326.01, 333.16, 328.43, 338.53, 323.1, 306.02, 310.92, 303.56, 306.93, 309.41, 289.2, 286.86, 314.74, 334.47, 337.73, 347.31, 395.14, 399.04, 383.47, 376.43, 365.76, 358.16, 348.78, 351.28, 367.14], '6M': [322.43, 336.31, 330.84, 338.66, 331.33, 309.37, 314.9, 307.15, 300.91, 303.21, 305.73, 280.74, 294.46, 315.72, 339.4, 342.32, 383.22, 397.05, 393.32, 383.47, 376.43, 365.76, 358.16, 348.78, 351.28, 367.14], '1Y': [177.56, 182.81, 191.15, 193.42, 195.75, 201.63, 204.29, 206.72, 213.53, 234.16, 251.76, 252.88, 244.36, 251.51, 244.64, 257.02, 269.93, 284.12, 290.59, 285.6, 299.65, 315.12, 314.45, 309.32, 311.33, 314.55, 322.43, 336.31, 330.84, 338.66, 331.33, 309.37, 303.56, 307.15, 300.91, 303.21, 305.73, 280.74, 294.46, 315.72, 339.4, 342.32, 383.22, 397.05, 393.32, 383.47, 376.43, 365.76, 358.16, 348.78, 351.28, 367.14] },
      velocityScore: { '1D': 0, '1W': 5.1, '1M': 42.5, '6M': null }, isNew: false,
      marketCap: '$4.5T', pe: 28, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.21, GTEK: false, ARKK: 1.86, MARS: false, FRWD: false, BCTK: 6.51, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 5.94, SGRT: false, SPMO: 3.6, XMMO: false },
      tonyNote: 'Alphabet Inc Class C appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 4.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRWD', name: 'CrowdStrike', easyScore: 5, avgWeight: 2.71, proScore: 0.8, coverage: 0.294,
      price: 194.39, weeklyPrices: [190.79, 193.18, 193.98, 199.38, 194.39], weeklyChange: 1.89, dayChange: -2.51, sortRank: 0, periodReturns: { '1M': 18, 'YTD': 65.9, '6M': 62.4, '1Y': 53.8 },
      priceHistory: { '1D': [199.38, 195.4, 193.97, 194.39], '1W': [190.79, 193.18, 193.98, 199.38, 194.39], '1M': [164.7, 161.23, 161.93, 172.88, 170.7, 173.23, 169.87, 170.74, 171.21, 168.86, 170.23, 168.26, 169.66, 175.27, 185.73, 190.79, 193.18, 193.98, 199.38, 194.39], 'YTD': [117.19, 115.97, 113.75, 113.12, 110.35, 98.88, 107.41, 87.56, 97.86, 109.08, 108.3, 98.25, 97.6, 106.63, 102.79, 116.67, 113.1, 117.02, 140.64, 162.06, 182.75, 167.76, 170.7, 168.86, 185.73, 194.39], '6M': [119.73, 115.18, 113.44, 111.15, 94.29, 102.89, 97.15, 95.28, 106.54, 110.39, 107.04, 98.15, 99.78, 94.75, 105.99, 112.03, 113.91, 131.94, 148.52, 162.06, 182.75, 167.76, 170.7, 168.86, 185.73, 194.39], '1Y': [126.36, 119.04, 120.39, 118.04, 113.71, 106.61, 106.58, 105.14, 105.93, 107.01, 111.19, 123.29, 122.11, 123.99, 127.15, 125.9, 132.43, 137.98, 139.38, 132.45, 122.67, 126.03, 128.8, 121.87, 120.79, 118.91, 119.73, 115.18, 113.44, 111.15, 94.29, 102.89, 105.54, 95.28, 106.54, 110.39, 107.04, 98.15, 99.78, 94.75, 105.99, 112.03, 113.91, 131.94, 148.52, 162.06, 182.75, 167.76, 170.7, 168.86, 185.73, 194.39] },
      velocityScore: { '1D': 1.3, '1W': 3.9, '1M': 8.1, '6M': null }, isNew: false,
      marketCap: '$198B', pe: null, revenueGrowth: 26, eps: -0.04, grossMargin: 75, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.54, IGV: 7.27, FDTX: 1.21, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 1.32, FWD: 1.23, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'CrowdStrike appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 2.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, avgWeight: 5.04, proScore: 1.19, coverage: 0.235,
      price: 393.64, weeklyPrices: [373.02, 384.28, 390.49, 386.74, 393.64], weeklyChange: 5.53, dayChange: 1.78, sortRank: 0, periodReturns: { '1M': -4.4, 'YTD': -18.6, '6M': -18.6, '1Y': -20.9 },
      priceHistory: { '1D': [386.74, 392.74, 393.64], '1W': [373.02, 384.28, 390.49, 386.74, 393.64], '1M': [411.74, 403.41, 397.36, 390.34, 390.74, 399.76, 393.83, 378.91, 379.4, 367.34, 373.94, 365.46, 352.83, 372.97, 368.57, 373.02, 384.28, 390.49, 386.74, 393.64], 'YTD': [483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 389, 403.93, 405.76, 399.41, 372.74, 370.17, 374.33, 411.22, 432.92, 424.46, 413.96, 405.21, 419.09, 450.24, 416.67, 390.74, 367.34, 368.57, 393.64], '6M': [483.47, 459.38, 451.14, 433.5, 393.67, 401.84, 397.23, 401.72, 410.68, 401.86, 389.02, 365.97, 373.46, 370.87, 422.79, 424.62, 414.44, 415.12, 421.92, 419.09, 450.24, 416.67, 390.74, 367.34, 368.57, 393.64], '1Y': [497.72, 503.02, 510.06, 512.5, 535.64, 521.77, 517.1, 507.23, 506.69, 498.2, 515.36, 514.45, 514.6, 528.57, 514.05, 516.79, 531.52, 517.03, 506, 507.49, 472.12, 486.74, 491.02, 474.82, 484.92, 487.48, 483.47, 459.38, 451.14, 433.5, 393.67, 401.84, 398.46, 401.72, 410.68, 401.86, 389.02, 365.97, 373.46, 370.87, 422.79, 424.62, 414.44, 415.12, 421.92, 419.09, 450.24, 416.67, 390.74, 367.34, 368.57, 393.64] },
      velocityScore: { '1D': -1.7, '1W': -1.7, '1M': -1.7, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 23.5, revenueGrowth: 18, eps: 16.78, grossMargin: 68, dividendYield: 0.94,
      etfPresence: { PTF: false, WCLD: false, IGV: 8, FDTX: 2.93, GTEK: false, ARKK: false, MARS: false, FRWD: 3.13, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 6.12, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks', easyScore: 4, avgWeight: 4.71, proScore: 1.11, coverage: 0.235,
      price: 351.45, weeklyPrices: [341.02, 352.04, 348.06, 357.53, 351.45], weeklyChange: 3.06, dayChange: -1.7, sortRank: 0, periodReturns: { '1M': 32, 'YTD': 90.8, '6M': 81.3, '1Y': 74.5 },
      priceHistory: { '1D': [357.53, 353.76, 351.61, 351.45], '1W': [341.02, 352.04, 348.06, 357.53, 351.45], '1M': [266.33, 260.52, 263.22, 279.53, 279.62, 284.54, 279.9, 282.13, 287.78, 286.4, 290.92, 285.26, 293.09, 304.2, 332, 341.02, 352.04, 348.06, 357.53, 351.45], 'YTD': [184.2, 190.8, 187.73, 180.18, 176.97, 159.32, 166.95, 141.67, 156.09, 165.58, 169.19, 157.21, 160.32, 173.78, 164.11, 181.2, 181.54, 183.68, 227.79, 252.92, 281.69, 272.05, 279.62, 286.4, 332, 351.45], '6M': [193.9, 190.93, 182.27, 176.2, 154.77, 162.81, 148.7, 149.4, 163.16, 168.12, 169.74, 156.36, 163.21, 155.73, 167.85, 178.54, 181.08, 207.88, 242.83, 252.92, 281.69, 272.05, 279.62, 286.4, 332, 351.45], '1Y': [201.42, 190.72, 199.88, 204.5, 171, 168.17, 176.17, 185.88, 190.52, 197.38, 201.28, 208.18, 203.96, 212.58, 213.28, 211.82, 220.29, 219.23, 216.54, 202.9, 182.9, 187.73, 195.35, 185.88, 189.49, 186.85, 193.9, 190.93, 182.27, 176.2, 154.77, 162.81, 150.99, 149.4, 163.16, 168.12, 169.74, 156.36, 163.21, 155.73, 167.85, 178.54, 181.08, 207.88, 242.83, 252.92, 281.69, 272.05, 279.62, 286.4, 332, 351.45] },
      velocityScore: { '1D': 0.9, '1W': 5.7, '1M': 3.7, '6M': null }, isNew: false,
      marketCap: '$286B', pe: 308.3, revenueGrowth: 31, eps: 1.14, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.97, IGV: 10.39, FDTX: 4.15, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.33, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 4, avgWeight: 4.5, proScore: 1.06, coverage: 0.235,
      price: 415.51, weeklyPrices: [420.60, 425.30, 393.45, 419.77, 415.51], weeklyChange: -1.21, dayChange: -1.01, sortRank: 0, periodReturns: { '1M': 1.6, 'YTD': -7.6, '6M': -3.7, '1Y': 41.4 },
      priceHistory: { '1D': [419.77, 417.13, 415.89, 415.51], '1W': [420.6, 425.3, 393.45, 419.77, 415.51], '1M': [408.95, 396.68, 381.59, 399.15, 406.43, 411.15, 404.66, 396.38, 400.49, 405.05, 381.61, 375.53, 375.12, 379.71, 411.84, 420.6, 425.3, 393.45, 419.77, 415.51], 'YTD': [449.72, 435.8, 438.57, 449.06, 430.41, 411.11, 417.44, 409.38, 392.43, 399.24, 399.27, 383.03, 371.75, 343.25, 391.95, 387.51, 372.8, 398.73, 445.27, 417.85, 435.79, 391, 406.43, 405.05, 411.84, 415.51], '6M': [431.41, 439.2, 449.36, 416.56, 397.21, 417.07, 411.82, 408.58, 405.55, 395.01, 380.3, 372.11, 360.59, 348.95, 400.62, 376.3, 390.82, 428.35, 422.24, 417.85, 435.79, 391, 406.43, 405.05, 411.84, 415.51], '1Y': [293.94, 316.9, 328.49, 325.59, 309.26, 339.03, 335.16, 340.01, 333.87, 346.4, 410.04, 434.21, 443.21, 453.25, 435.9, 447.43, 452.42, 468.37, 445.23, 408.92, 391.09, 430.14, 439.58, 475.31, 488.73, 454.43, 431.41, 439.2, 449.36, 416.56, 397.21, 417.07, 411.71, 408.58, 405.55, 395.01, 380.3, 372.11, 360.59, 348.95, 400.62, 376.3, 390.82, 428.35, 422.24, 417.85, 435.79, 391, 406.43, 405.05, 411.84, 415.51] },
      velocityScore: { '1D': 2.9, '1W': 14, '1M': -5.4, '6M': null }, isNew: false,
      marketCap: '$1.6T', pe: 381.2, revenueGrowth: 16, eps: 1.09, grossMargin: 19, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 10.27, MARS: false, FRWD: false, BCTK: 3.22, FWD: 1.31, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.21, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 4, avgWeight: 3.59, proScore: 0.84, coverage: 0.235,
      price: 134.05, weeklyPrices: [116.67, 125.73, 129.30, 132.54, 134.05], weeklyChange: 14.9, dayChange: 1.14, sortRank: 0, periodReturns: { '1M': -1.8, 'YTD': -24.6, '6M': -26.2, '1Y': -3.6 },
      priceHistory: { '1D': [132.54, 133.69, 134.14, 134.05], '1W': [116.67, 125.73, 129.3, 132.54, 134.05], '1M': [136.47, 132.07, 130.21, 131.08, 127.99, 134.71, 133.25, 130.63, 128.47, 119.5, 116.7, 113.5, 107.27, 112.93, 115.7, 116.67, 125.73, 129.3, 132.54, 134.05], 'YTD': [177.75, 176.86, 177.07, 169.6, 146.59, 135.9, 131.41, 128.84, 147.22, 151.14, 155.08, 154.78, 146.28, 140.76, 142.15, 152.62, 137.97, 133.79, 130.05, 137.41, 156.54, 135.53, 127.99, 119.5, 115.7, 134.05], '6M': [181.68, 178.4, 165.9, 151.86, 130.01, 129.13, 135.24, 135.94, 152.67, 153.5, 155.68, 147.56, 148.46, 128.06, 146.39, 143.09, 144.07, 137.8, 133.99, 137.41, 156.54, 135.53, 127.99, 119.5, 115.7, 134.05], '1Y': [139.12, 149.15, 151.79, 157.88, 160.66, 182.68, 174.03, 158.74, 156.71, 156.1, 171.21, 179.33, 178.86, 179.53, 177.21, 181.59, 189.18, 207.18, 193.61, 171.25, 154.85, 167.49, 181.49, 183.25, 193.98, 180.84, 181.68, 178.4, 165.9, 151.86, 130.01, 129.13, 134.89, 135.94, 152.67, 153.5, 155.68, 147.56, 148.46, 128.06, 146.39, 143.09, 144.07, 137.8, 133.99, 137.41, 156.54, 135.53, 127.99, 119.5, 115.7, 134.05] },
      velocityScore: { '1D': 0, '1W': 9.1, '1M': -14.3, '6M': null }, isNew: false,
      marketCap: '$321B', pe: 150.6, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.36, FDTX: 2, GTEK: false, ARKK: 2.86, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.14, XMMO: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 4, avgWeight: 3.54, proScore: 0.83, coverage: 0.235,
      price: 1592.77, weeklyPrices: [2273.73, 2032.22, 1745.00, 1744.43, 1592.77], weeklyChange: -29.95, dayChange: -8.69, sortRank: 0, periodReturns: { '1M': -3, 'YTD': 571, '6M': 350.5, '1Y': 3422.3 },
      priceHistory: { '1D': [1744.43, 1603.09, 1592.22, 1592.77], '1W': [2273.73, 2032.22, 1745, 1744.43, 1592.77], '1M': [1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 1745, 1744.43, 1592.77], 'YTD': [237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 638.52, 565.41, 618.89, 720.17, 702.48, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1447.23, 1542.24, 1694.98, 1559.32, 1980.1, 2273.73, 2050.39, 1592.77], '6M': [353.56, 387.81, 503.44, 539.3, 576.2, 630.29, 649.97, 651.9, 565.59, 618.82, 772.09, 603.17, 701.59, 851.77, 920.99, 989.9, 1187, 1562.34, 1407.61, 1542.24, 1694.98, 1559.32, 1980.1, 2273.73, 2050.39, 1592.77], '1Y': [45.22, 42.48, 41.61, 41.89, 42.51, 43.37, 45.52, 46.37, 52.47, 70.5, 90.09, 102.92, 113.5, 121.17, 134.61, 148.04, 176.49, 207.01, 267.95, 265.88, 200.27, 210.17, 225.47, 201.87, 241.05, 240.22, 353.56, 387.81, 503.44, 539.3, 576.2, 630.29, 621.09, 651.9, 565.59, 618.82, 772.09, 603.17, 701.59, 851.77, 920.99, 989.9, 1187, 1562.34, 1407.61, 1542.24, 1694.98, 1559.32, 1980.1, 2273.73, 2050.39, 1592.77] },
      velocityScore: { '1D': -1.2, '1W': -18.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$236B', pe: 54.3, revenueGrowth: 251, eps: 29.31, grossMargin: 56, dividendYield: null,
      etfPresence: { PTF: 5.07, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.35, CBSE: false, FCUS: 5.24, WGMI: false, CNEQ: false, SGRT: false, SPMO: 2.52, XMMO: false },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'DDOG', name: 'DDOG', easyScore: 4, avgWeight: 3.04, proScore: 0.72, coverage: 0.235,
      price: 258.05, weeklyPrices: [260.36, 264.48, 260.36, 255.37, 258.05], weeklyChange: -0.89, dayChange: 1.05, sortRank: 0, periodReturns: { '1M': 11.4, 'YTD': 89.8, '6M': 82.4, '1Y': 69.3 },
      priceHistory: { '1D': [255.37, 258.29, 256.8, 258.05], '1W': [260.36, 264.48, 260.36, 255.37, 258.05], '1M': [231.68, 227.34, 227.63, 234.24, 229.9, 233.09, 231.11, 226.63, 223, 221.37, 220.57, 222.65, 220.94, 239.77, 248.57, 260.36, 264.48, 260.36, 255.37, 258.05], 'YTD': [135.99, 130.68, 120.86, 130.13, 129.32, 111.69, 125.2, 104.43, 111.77, 123.08, 128.87, 122.57, 118.05, 116.5, 121.06, 132.14, 133.98, 143.71, 205.31, 218.04, 247.35, 234.11, 229.9, 221.37, 248.57, 258.05], '6M': [141.45, 122.41, 131.25, 128.18, 106.73, 126.13, 115.66, 116.46, 122.36, 127.16, 129.94, 124.3, 120.36, 105.37, 126.61, 129.48, 140.53, 200.16, 207.98, 218.04, 247.35, 234.11, 229.9, 221.37, 248.57, 258.05], '1Y': [152.41, 138.8, 145.27, 150.77, 139.13, 128.83, 129.07, 131.22, 136.68, 136.44, 138.65, 138.35, 145.26, 157.36, 164.2, 156.29, 157.62, 162.08, 199.72, 180.26, 157.55, 157.9, 154.28, 142.05, 141.84, 137.48, 141.45, 122.41, 131.25, 128.18, 106.73, 126.13, 120.6, 116.46, 122.36, 127.16, 129.94, 124.3, 120.36, 105.37, 126.61, 129.48, 140.53, 200.16, 207.98, 218.04, 247.35, 234.11, 229.9, 221.37, 248.57, 258.05] },
      velocityScore: { '1D': 1.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$92B', pe: 679.1, revenueGrowth: 32, eps: 0.38, grossMargin: 80, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.86, IGV: 3.05, FDTX: 2.39, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: 3.88, SPMO: false, XMMO: false },
      tonyNote: 'DDOG appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SHOP', name: 'Shopify Inc Registered Shs -A- Subord Vtg', easyScore: 4, avgWeight: 2.96, proScore: 0.7, coverage: 0.235,
      price: 124.25, weeklyPrices: [114.18, 121.63, 119.46, 120.14, 124.25], weeklyChange: 8.82, dayChange: 3.42, sortRank: 0, periodReturns: { '1M': 12.2, 'YTD': -22.8, '6M': -25.5, '1Y': 6.5 },
      priceHistory: { '1D': [120.14, 123.73, 123.88, 124.25], '1W': [114.18, 121.63, 119.46, 120.14, 124.25], '1M': [110.78, 110.42, 108.2, 110.47, 108.24, 112.49, 113.23, 108.09, 108.85, 107.98, 107.68, 114.17, 111.62, 116.86, 114.21, 114.18, 121.63, 119.46, 120.14, 124.25], 'YTD': [160.97, 168.28, 157.99, 137.89, 131.23, 112.05, 112.7, 116.93, 121.87, 129.36, 127.8, 116.15, 118.62, 120.1, 127.41, 131.96, 121.26, 105.44, 95.4, 104.86, 118.71, 109.54, 108.24, 107.98, 114.21, 124.25], '6M': [166.74, 157.51, 137.64, 143.64, 111.24, 110.66, 126.2, 125.94, 134.79, 126.17, 122.37, 115.43, 118.25, 110.79, 131.15, 125.83, 127.67, 110.41, 100.28, 104.86, 118.71, 109.54, 108.24, 107.98, 114.21, 124.25], '1Y': [116.66, 116.74, 128.43, 126.84, 125.21, 147.5, 143.11, 142.11, 141.28, 146.22, 147.89, 157.12, 149, 164.5, 153.66, 164.71, 175.06, 172.94, 158.88, 139.93, 147.8, 149.28, 158.41, 159.85, 169.67, 163.74, 166.74, 157.51, 137.64, 143.64, 111.24, 110.66, 123.8, 125.94, 134.79, 126.17, 122.37, 115.43, 118.25, 110.79, 131.15, 125.83, 127.67, 110.41, 100.28, 104.86, 118.71, 109.54, 108.24, 107.98, 114.21, 124.25] },
      velocityScore: { '1D': 0, '1W': null, '1M': -23.9, '6M': null }, isNew: false,
      marketCap: '$161B', pe: 121.8, revenueGrowth: 34, eps: 1.02, grossMargin: 48, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.59, GTEK: false, ARKK: 4.26, MARS: false, FRWD: 2.16, BCTK: 2.82, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Shopify Inc Registered Shs -A- Subord Vtg appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASML', name: 'ASML Holding', easyScore: 4, avgWeight: 2.77, proScore: 0.65, coverage: 0.235,
      price: 1739.69, weeklyPrices: [1989.44, 1843.04, 1769.32, 1825.07, 1739.69], weeklyChange: -12.55, dayChange: -4.68, sortRank: 0, periodReturns: { '1M': -0.5, 'YTD': 62.6, '6M': 41.6, '1Y': 121.6 },
      priceHistory: { '1D': [1825.07, 1736.99, 1735.87, 1739.69], '1W': [1989.44, 1843.04, 1769.32, 1825.07, 1739.69], '1M': [1749.04, 1777.77, 1734.19, 1899.48, 1863.55, 1892.66, 1803.89, 1867.83, 1929.68, 1929.25, 1778.46, 1762.77, 1841.18, 1794.62, 1883.11, 1989.44, 1843.04, 1769.32, 1825.07, 1739.69], 'YTD': [1069.86, 1194.32, 1331.6, 1389.04, 1423, 1413.01, 1406.61, 1497.8, 1360.94, 1383.4, 1389.16, 1399.42, 1320.83, 1421.05, 1481.77, 1443.66, 1394.08, 1544.74, 1581.58, 1592, 1612.76, 1641.74, 1863.55, 1929.25, 1883.11, 1739.69], '6M': [1228.47, 1263.72, 1395, 1455.16, 1350.16, 1406.87, 1469.59, 1463.8, 1368.36, 1351.58, 1366.39, 1329.5, 1317.23, 1478.28, 1459.8, 1457.7, 1427.02, 1592.02, 1501.81, 1592, 1612.76, 1641.74, 1863.55, 1929.25, 1883.11, 1739.69], '1Y': [785.09, 806.73, 719.68, 729.99, 699.36, 721.31, 747.55, 754.89, 742.62, 796.25, 867.3, 957.8, 962.61, 1043.3, 984.66, 1042.15, 1059.98, 1066.82, 1038.79, 1020, 966.57, 1087.99, 1119.69, 1087.82, 1056.98, 1072.14, 1228.47, 1263.72, 1395, 1455.16, 1350.16, 1406.87, 1458.93, 1463.8, 1368.36, 1351.58, 1366.39, 1329.5, 1317.23, 1478.28, 1459.8, 1457.7, 1427.02, 1592.02, 1501.81, 1592, 1612.76, 1641.74, 1863.55, 1929.25, 1883.11, 1739.69] },
      velocityScore: { '1D': 0, '1W': null, '1M': -1.5, '6M': null }, isNew: false,
      marketCap: '$671B', pe: 59.2, revenueGrowth: 13, eps: 29.38, grossMargin: 53, dividendYield: 0.48,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 4.79, BCTK: 2.17, FWD: 1.56, CBSE: 2.56, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'ASML Holding appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 2.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 3, avgWeight: 4.78, proScore: 2.87, coverage: 0.6,
      price: 653.82, weeklyPrices: [720.04, 691.40, 668.31, 674.04, 653.82], weeklyChange: -9.2, dayChange: -2.96, sortRank: 0, periodReturns: { '1M': -5.8, 'YTD': 54.9, '6M': 49.7, '1Y': 69.5 },
      priceHistory: { '1D': [673.78, 657.44, 653.88, 653.82], '1W': [720.04, 691.4, 668.31, 674.04, 653.82], '1M': [693.81, 691.95, 650.92, 683.29, 707.74, 724.35, 719.29, 714.85, 702.25, 740.14, 702.29, 701.88, 718.59, 687.87, 714.45, 720.04, 691.4, 668.31, 674.04, 653.82], 'YTD': [422.06, 413.17, 447.64, 468.76, 474.63, 508.11, 524.08, 568.21, 566, 564.05, 571.64, 578.44, 549.02, 576.24, 591.82, 613.78, 628.6, 785.24, 773.72, 716.91, 711.73, 695.11, 707.74, 740.14, 714.45, 653.82], '6M': [436.89, 437.07, 468.78, 483.43, 477.72, 515.88, 552.66, 565.05, 549.22, 566.91, 577.95, 545.64, 560.63, 585.36, 601.88, 624.84, 742.21, 745, 769.99, 716.91, 711.73, 695.11, 707.74, 740.14, 714.45, 653.82], '1Y': [385.8, 387, 398.66, 411.99, 393.62, 384.12, 383.32, 379.84, 377.96, 375.53, 385.68, 396.02, 409.11, 427.8, 430.98, 440.74, 441.82, 450.82, 450.38, 426.87, 430.15, 452.23, 463.09, 435.87, 433.03, 428.81, 436.89, 437.07, 468.78, 483.43, 477.72, 515.88, 554, 565.05, 549.22, 566.91, 577.95, 545.64, 560.63, 585.36, 601.88, 624.84, 742.21, 745, 769.99, 716.91, 711.73, 695.11, 707.74, 740.14, 714.45, 653.82] },
      velocityScore: { '1D': 0, '1W': -2.7, '1M': 55.1, '6M': null }, isNew: false,
      marketCap: '$98B', pe: 89.8, revenueGrowth: 26, eps: 7.28, grossMargin: 15, dividendYield: 0.07,
      etfPresence: { POW: 4.91, VOLT: 5.2, PBD: false, PBW: false, IVEP: 4.22 },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 3, avgWeight: 4.59, proScore: 2.75, coverage: 0.6,
      price: 395.57, weeklyPrices: [426.12, 412.31, 398.52, 413.42, 395.57], weeklyChange: -7.17, dayChange: -4.31, sortRank: 0, periodReturns: { '1M': -1.9, 'YTD': 24.2, '6M': 22.6, '1Y': 10.3 },
      priceHistory: { '1D': [413.41, 396.67, 395.55, 395.57], '1W': [426.12, 412.31, 398.52, 413.42, 395.57], '1M': [403.14, 401.72, 375.46, 393.64, 391.39, 407.06, 407.71, 409.64, 421.77, 435.78, 405.28, 404.59, 419.87, 402.68, 408.26, 426.12, 412.31, 398.52, 413.42, 395.57], 'YTD': [318.51, 320.58, 333.46, 331.22, 351.42, 373.82, 389.25, 374.56, 355.56, 361.06, 363.95, 374.1, 357.67, 385.58, 395.06, 413.87, 410.77, 421.39, 406.94, 381.51, 400.6, 395.94, 391.39, 435.78, 408.26, 395.57], '6M': [322.67, 331.14, 334.04, 354.37, 354.67, 390.33, 373.38, 374.59, 354.79, 348.64, 360.23, 357.1, 361.1, 403, 406.21, 423.92, 425.55, 401.51, 399.44, 381.51, 400.6, 395.94, 391.39, 435.78, 408.26, 395.57], '1Y': [358.49, 360.29, 373.66, 392.76, 384.76, 360.11, 353.5, 347.61, 349.14, 349.49, 375.54, 378.31, 367.15, 380.02, 375.37, 377.69, 379.74, 386.57, 379.57, 342.75, 331.71, 339.71, 343.39, 333.21, 320.39, 320.86, 322.67, 331.14, 334.04, 354.37, 354.67, 390.33, 377.32, 374.59, 354.79, 348.64, 360.23, 357.1, 361.1, 403, 406.21, 423.92, 425.55, 401.51, 399.44, 381.51, 400.6, 395.94, 391.39, 435.78, 408.26, 395.57] },
      velocityScore: { '1D': 2.6, '1W': 4.2, '1M': 52.8, '6M': null }, isNew: false,
      marketCap: '$154B', pe: 38.8, revenueGrowth: 17, eps: 10.2, grossMargin: 37, dividendYield: 1.06,
      etfPresence: { POW: 4.19, VOLT: 5.47, PBD: false, PBW: false, IVEP: 4.11 },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 3, avgWeight: 4.35, proScore: 2.61, coverage: 0.6,
      price: 1046.58, weeklyPrices: [1174.86, 1134.35, 1113.11, 1152.04, 1046.58], weeklyChange: -10.92, dayChange: -9.14, sortRank: 0, periodReturns: { '1M': 12.1, 'YTD': 60.1, '6M': 58, '1Y': 97.4 },
      priceHistory: { '1D': [1152.23, 1050.99, 1046.7, 1046.58], '1W': [1174.86, 1134.35, 1113.11, 1152.04, 1046.58], '1M': [933.85, 920.15, 867.09, 906.79, 940.66, 979.07, 982.35, 1048.86, 1109.73, 1127.59, 1034.98, 1057.65, 1085.47, 1045.17, 1102.51, 1174.86, 1134.35, 1113.11, 1152.04, 1046.58], 'YTD': [653.57, 628.4, 642.23, 657.78, 726.37, 779.35, 802.13, 879.73, 842, 839.2, 844.05, 909.41, 872.9, 936.07, 985.92, 1127.56, 1063.11, 1118.96, 1062.57, 1043.82, 968.32, 933.61, 940.66, 1127.59, 1102.51, 1046.58], '6M': [662.32, 644.18, 661.67, 717.39, 737.53, 816.56, 830.34, 876.46, 815.01, 832.11, 877.39, 873.12, 898.57, 991.32, 1002.75, 1149.19, 1062.95, 1040.15, 1049.23, 1043.82, 968.32, 933.61, 940.66, 1127.59, 1102.51, 1046.58], '1Y': [530.28, 555.04, 565.91, 647.66, 662.77, 650.76, 625.02, 607.07, 612.97, 600.23, 628.68, 644.37, 602.43, 603.22, 648.25, 594.07, 584.39, 581.26, 579.8, 577.02, 555.84, 576.9, 621.9, 681.35, 661.81, 659.64, 662.32, 644.18, 661.67, 717.39, 737.53, 816.56, 834.61, 876.46, 815.01, 832.11, 877.39, 873.12, 898.57, 991.32, 1002.75, 1149.19, 1062.95, 1040.15, 1049.23, 1043.82, 968.32, 933.61, 940.66, 1127.59, 1102.51, 1046.58] },
      velocityScore: { '1D': 2.8, '1W': 7.4, '1M': 97.7, '6M': null }, isNew: false,
      marketCap: '$281B', pe: 30.6, revenueGrowth: 16, eps: 34.22, grossMargin: 20, dividendYield: 0.17,
      etfPresence: { POW: 3.64, VOLT: 4.73, PBD: false, PBW: false, IVEP: 4.67 },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy Corp', easyScore: 3, avgWeight: 3.82, proScore: 2.29, coverage: 0.6,
      price: 277.87, weeklyPrices: [302.70, 289.50, 270.89, 295.05, 277.87], weeklyChange: -8.2, dayChange: -5.87, sortRank: 0, periodReturns: { '1M': 9.6, 'YTD': 219.8, '6M': 157.3, '1Y': 1040.7 },
      priceHistory: { '1D': [295.19, 282, 276.73, 277.87], '1W': [302.7, 289.5, 270.89, 295.05, 277.87], '1M': [253.57, 259.61, 234.23, 248.88, 260.22, 274.5, 280.88, 284.99, 328.91, 345.85, 321.98, 326.19, 309.18, 252.02, 275.01, 302.7, 289.5, 270.89, 295.05, 277.87], 'YTD': [86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 166.2, 153.02, 154, 160.05, 145.88, 135.49, 146.78, 213.84, 229.75, 287.97, 285.47, 289.76, 307.88, 285, 263.61, 260.22, 345.85, 275.01, 277.87], '6M': [108, 133.46, 145.63, 156.51, 136.6, 139.03, 147.55, 168.57, 159.99, 157.17, 166.69, 133.52, 135.63, 166.7, 207.86, 231.17, 290.52, 261.03, 275.95, 307.88, 285, 263.61, 260.22, 345.85, 275.01, 277.87], '1Y': [24.36, 25.96, 25.36, 34.78, 36.1, 37.65, 46.5, 48.54, 52.94, 53.44, 67.02, 86.27, 73.6, 86.97, 109.91, 109.06, 108.53, 142.37, 139.23, 107.11, 89.99, 98.93, 111.79, 89.58, 92.26, 87.26, 108, 133.46, 145.63, 156.51, 136.6, 139.03, 159, 168.57, 159.99, 157.17, 166.69, 133.52, 135.63, 166.7, 207.86, 231.17, 290.52, 261.03, 275.95, 307.88, 285, 263.61, 260.22, 345.85, 275.01, 277.87] },
      velocityScore: { '1D': 7, '1W': -10.2, '1M': 8.5, '6M': null }, isNew: false,
      marketCap: '$79B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: 1.74, VOLT: 4.23, PBD: false, PBW: false, IVEP: 5.49 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 3, avgWeight: 3.63, proScore: 2.18, coverage: 0.6,
      price: 88.67, weeklyPrices: [87.77, 86.37, 88.34, 87.44, 88.67], weeklyChange: 1.03, dayChange: 1.37, sortRank: 0, periodReturns: { '1M': 5.6, 'YTD': 10.5, '6M': 13.1, '1Y': 18.6 },
      priceHistory: { '1D': [87.48, 88.62, 88.63, 88.67], '1W': [87.77, 86.37, 88.34, 87.44, 88.67], '1M': [84.01, 84.83, 85.12, 84.84, 85.99, 86.12, 86.23, 85.73, 86.75, 86.08, 86.43, 87.62, 87.7, 88.56, 88.66, 87.77, 86.37, 88.34, 87.44, 88.67], 'YTD': [80.28, 79.49, 82.19, 84.81, 87.9, 89.47, 93.8, 95.68, 92.59, 91.54, 92.53, 91.62, 92.88, 94.17, 91.24, 90, 94.17, 95.39, 94.85, 89.69, 87.01, 85.84, 85.99, 86.08, 88.66, 88.67], '6M': [78.37, 81.98, 85.07, 88.18, 89.21, 91.93, 92.18, 91.99, 91.13, 91.73, 92.41, 91.16, 93.15, 94.08, 91.98, 95.28, 96.95, 93.1, 93.36, 89.69, 87.01, 85.84, 85.99, 86.08, 88.66, 88.67], '1Y': [74.75, 75.04, 76.17, 71.34, 70.53, 72.45, 75.72, 76.32, 72.05, 69.77, 71.5, 72.35, 76.21, 82.11, 84.3, 84.77, 86.03, 81.78, 84.77, 85.75, 83.48, 84.65, 80.55, 81.65, 80.04, 80.53, 78.37, 81.98, 85.07, 88.18, 89.21, 91.93, 91.64, 91.99, 91.13, 91.73, 92.41, 91.16, 93.15, 94.08, 91.98, 95.28, 96.95, 93.1, 93.36, 89.69, 87.01, 85.84, 85.99, 86.08, 88.66, 88.67] },
      velocityScore: { '1D': -1.4, '1W': 1.4, '1M': 60.3, '6M': null }, isNew: false,
      marketCap: '$185B', pe: 22.5, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.85,
      etfPresence: { POW: 2.1, VOLT: 5.08, PBD: false, PBW: false, IVEP: 3.72 },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 3, avgWeight: 3.23, proScore: 1.94, coverage: 0.6,
      price: 148.67, weeklyPrices: [169.61, 159.99, 152.15, 156.89, 148.67], weeklyChange: -12.35, dayChange: -5.27, sortRank: 0, periodReturns: { '1M': -9.2, 'YTD': 45.8, '6M': 39.6, '1Y': 99.5 },
      priceHistory: { '1D': [156.94, 153.18, 148.29, 148.67], '1W': [169.61, 159.99, 152.15, 156.89, 148.67], '1M': [163.81, 163.8, 156.79, 164.52, 165.84, 169, 167.34, 170.94, 177.02, 184.34, 168.37, 167.55, 171.91, 162.92, 163.35, 169.61, 159.99, 152.15, 156.89, 148.67], 'YTD': [101.97, 102.72, 107.98, 110.29, 112.26, 112.64, 113.25, 118.22, 111.65, 109.13, 114.71, 125.61, 118.28, 127.11, 131.38, 140.13, 137.37, 172.49, 172.91, 163.57, 166.99, 162.86, 165.84, 184.34, 163.35, 148.67], '6M': [106.48, 104.54, 111.57, 115.62, 113.87, 111.9, 116.87, 121.79, 110.55, 107.87, 122.58, 118.44, 117.96, 130.56, 134.69, 142.17, 158.92, 169.95, 169.01, 163.57, 166.99, 162.86, 165.84, 184.34, 163.35, 148.67], '1Y': [74.51, 74.97, 74.96, 79.07, 90.49, 88.76, 89.41, 90.08, 90.39, 92.58, 96.35, 100.25, 96.7, 98, 99.5, 100.23, 103.91, 112.36, 112.33, 104.09, 100.55, 105.67, 107.11, 102.61, 102.79, 103.01, 106.48, 104.54, 111.57, 115.62, 113.87, 111.9, 116.88, 121.79, 110.55, 107.87, 122.58, 118.44, 117.96, 130.56, 134.69, 142.17, 158.92, 169.95, 169.01, 163.57, 166.99, 162.86, 165.84, 184.34, 163.35, 148.67] },
      velocityScore: { '1D': 1.6, '1W': -1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$24B', pe: 50.7, revenueGrowth: 54, eps: 2.93, grossMargin: 37, dividendYield: 0.54,
      etfPresence: { POW: 3.68, VOLT: 2.93, PBD: false, PBW: false, IVEP: 3.09 },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 3, avgWeight: 2.94, proScore: 1.76, coverage: 0.6,
      price: 480.84, weeklyPrices: [523.20, 490.12, 487.10, 495.60, 480.84], weeklyChange: -8.1, dayChange: -2.95, sortRank: 0, periodReturns: { '1M': -0.9, 'YTD': 8.3, '6M': 2.7, '1Y': 16.4 },
      priceHistory: { '1D': [495.44, 480.24, 480.84], '1W': [523.2, 490.12, 487.1, 495.6, 480.84], '1M': [485.03, 486.47, 467.59, 469.32, 476.89, 489.73, 502.65, 508.87, 523.69, 539.39, 509.96, 518.18, 536.04, 517.02, 514.71, 523.2, 490.12, 487.1, 495.6, 480.84], 'YTD': [444.11, 460.87, 484.11, 485.53, 487.94, 503.8, 524.12, 526.75, 488.49, 478.06, 471.22, 505.62, 490.74, 527.21, 526.94, 549.75, 545.93, 502.34, 483.79, 460.98, 473.61, 476.82, 476.89, 539.39, 514.71, 480.84], '6M': [468.2, 476.06, 484.06, 497.97, 487.4, 516.02, 526.73, 524.19, 476.51, 468.41, 492.65, 481.67, 494.25, 536.01, 535.57, 553.07, 508.43, 492.58, 479.97, 460.98, 473.61, 476.82, 476.89, 539.39, 514.71, 480.84], '1Y': [412.97, 415.08, 422.27, 438.31, 429.06, 417.54, 432.22, 440.85, 430.99, 436.62, 438.11, 438.49, 426.44, 413.05, 418.72, 431.65, 433.98, 467.61, 462.28, 420.57, 421.84, 427.85, 441.51, 444.84, 451.03, 446.61, 468.2, 476.06, 484.06, 497.97, 487.4, 516.02, 526.56, 524.19, 476.51, 468.41, 492.65, 481.67, 494.25, 536.01, 535.57, 553.07, 508.43, 492.58, 479.97, 460.98, 473.61, 476.82, 476.89, 539.39, 514.71, 480.84] },
      velocityScore: { '1D': 1.1, '1W': -1.1, '1M': 57.1, '6M': null }, isNew: false,
      marketCap: '$25B', pe: 28.5, revenueGrowth: 11, eps: 16.9, grossMargin: 36, dividendYield: 1.15,
      etfPresence: { POW: 2.88, VOLT: 3.38, PBD: false, PBW: false, IVEP: 2.56 },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'NRG', name: 'NRG Energy Inc', easyScore: 3, avgWeight: 1.34, proScore: 0.81, coverage: 0.6,
      price: 140.18, weeklyPrices: [146.06, 140.80, 136.70, 141.01, 140.18], weeklyChange: -4.03, dayChange: -0.59, sortRank: 0, periodReturns: { '1M': 9.8, 'YTD': -12, '6M': -5.9, '1Y': -11.7 },
      priceHistory: { '1D': [141, 140.46, 138.98, 140.18], '1W': [146.06, 140.8, 136.7, 141.01, 140.18], '1M': [127.71, 129.96, 120.65, 123.7, 125.47, 130.4, 132.1, 132.13, 135.06, 138.91, 137.66, 142.21, 147.11, 149.36, 149.11, 146.06, 140.8, 136.7, 141.01, 140.18], 'YTD': [159.24, 143.53, 158.5, 149.3, 152.63, 153.32, 172.35, 184.03, 162.06, 155.15, 154.75, 151.13, 146.14, 160.3, 168.45, 149.6, 149.01, 150.64, 131.08, 136.92, 134.08, 129.2, 125.47, 138.91, 149.11, 140.18], '6M': [148.91, 149.83, 151.09, 153.72, 144.44, 161.8, 179.18, 181.34, 160.46, 152.1, 161.4, 146.14, 152.69, 164.07, 167.73, 159.81, 153.37, 138.11, 127.81, 136.92, 134.08, 129.2, 125.47, 138.91, 149.11, 140.18], '1Y': [158.69, 151.06, 152.31, 158.54, 173.91, 152.03, 150.44, 145.09, 145.56, 147.76, 166.08, 170.97, 165.34, 163.95, 168.77, 167.01, 172.59, 174.48, 166.72, 163.21, 159.2, 165.66, 164.11, 159.99, 156.96, 160.43, 148.91, 149.83, 151.09, 153.72, 144.44, 161.8, 175.01, 181.34, 160.46, 152.1, 161.4, 146.14, 152.69, 164.07, 167.73, 159.81, 153.37, 138.11, 127.81, 136.92, 134.08, 129.2, 125.47, 138.91, 149.11, 140.18] },
      velocityScore: { '1D': 17.4, '1W': -2.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$30B', pe: 152.4, revenueGrowth: 20, eps: 0.92, grossMargin: 16, dividendYield: 1.35,
      etfPresence: { POW: 0.53, VOLT: 1.03, PBD: false, PBW: false, IVEP: 2.47 },
      tonyNote: 'NRG Energy Inc appears in 3 of 5 Electrification ETFs (60% coverage) with average weight 1.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, avgWeight: 5.43, proScore: 2.17, coverage: 0.4,
      price: 258.33, weeklyPrices: [333.04, 318.06, 266.94, 277.45, 258.33], weeklyChange: -22.43, dayChange: -6.9, sortRank: 0, periodReturns: { '1M': -7.4, 'YTD': 52.3, '6M': 42.7, '1Y': 160.2 },
      priceHistory: { '1D': [277.45, 260.44, 257.6, 258.33], '1W': [333.04, 318.06, 266.94, 277.45, 258.33], '1M': [279.13, 276.04, 276.95, 296.55, 293.87, 302.15, 293.22, 299.84, 296.39, 304.33, 288.64, 294.15, 310.32, 310.64, 315.65, 333.04, 318.06, 266.94, 277.45, 258.33], 'YTD': [169.63, 180.24, 196.61, 196.5, 201.19, 220.78, 232.84, 234.4, 213.65, 198.5, 209.52, 222.04, 197.98, 228.29, 236.04, 262.68, 258.26, 286.89, 266.92, 260.4, 274.52, 262.56, 293.87, 304.33, 315.65, 258.33], '6M': [181.03, 192.96, 200.29, 210.44, 208, 231.48, 235.04, 232.12, 202.58, 195.18, 214.95, 204.11, 204.65, 235.73, 254.25, 276.65, 283.6, 297.98, 256.72, 260.4, 274.52, 262.56, 293.87, 304.33, 315.65, 258.33], '1Y': [99.27, 101.66, 103.72, 126.75, 131.51, 128.22, 131.57, 132.6, 134.56, 141.51, 145.86, 146.51, 140.37, 141.12, 145.02, 147.96, 155.89, 158.57, 166.99, 141.86, 140.95, 154.77, 172.21, 173.3, 174.02, 172.95, 181.03, 192.96, 200.29, 210.44, 208, 231.48, 230.06, 232.12, 202.58, 195.18, 214.95, 204.11, 204.65, 235.73, 254.25, 276.65, 283.6, 297.98, 256.72, 260.4, 274.52, 262.56, 293.87, 304.33, 315.65, 258.33] },
      velocityScore: { '1D': -1.8, '1W': -9.2, '1M': -9.2, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 62.1, revenueGrowth: 17, eps: 4.16, grossMargin: 39, dividendYield: 0.1,
      etfPresence: { POW: 3.49, VOLT: 7.36, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 2, avgWeight: 5.32, proScore: 2.13, coverage: 0.4,
      price: 230.8, weeklyPrices: [286.36, 264.86, 246.33, 248.05, 230.80], weeklyChange: -19.4, dayChange: -6.93, sortRank: 0, periodReturns: { '1M': -21.4, 'YTD': 117.2, '6M': 94.6, '1Y': 220.7 },
      priceHistory: { '1D': [248.05, 233.02, 230.74, 230.8], '1W': [286.36, 264.86, 246.33, 248.05, 230.8], '1M': [293.6, 283.51, 262.34, 290.5, 294.75, 303.53, 292.7, 294.03, 297.2, 307.8, 291.5, 294.49, 309.2, 279.77, 281.09, 286.36, 264.86, 246.33, 248.05, 230.8], 'YTD': [106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 186.39, 170.37, 176.51, 174.04, 186.82, 180.36, 218.07, 229.73, 242.77, 253.49, 320.3, 300.84, 270.75, 284.42, 284.87, 294.75, 307.8, 281.09, 230.8], '6M': [118.62, 133.76, 142.29, 152.31, 179.6, 197.63, 182.27, 176.96, 167.67, 171.19, 175.13, 174.8, 182.6, 230.94, 241.01, 252.76, 275.33, 309.39, 292.65, 270.75, 284.42, 284.87, 294.75, 307.8, 281.09, 230.8], '1Y': [71.96, 70.19, 73.64, 80.8, 76.72, 88.28, 86.57, 87.65, 88.72, 90.8, 100.68, 100.97, 101.01, 103.9, 105.33, 116.4, 124.71, 130.23, 124.62, 105.94, 94.02, 106.53, 114.29, 109.31, 112.18, 109.16, 118.62, 133.76, 142.29, 152.31, 179.6, 197.63, 178.79, 176.96, 167.67, 171.19, 175.13, 174.8, 182.6, 230.94, 241.01, 252.76, 275.33, 309.39, 292.65, 270.75, 284.42, 284.87, 294.75, 307.8, 281.09, 230.8] },
      velocityScore: { '1D': -1.4, '1W': -21.4, '1M': -19, '6M': null }, isNew: false,
      marketCap: '$8B', pe: 45.1, revenueGrowth: 7, eps: 5.12, grossMargin: 30, dividendYield: 0.14,
      etfPresence: { POW: 4.3, VOLT: 6.34, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, avgWeight: 3.6, proScore: 1.44, coverage: 0.4,
      price: 137.84, weeklyPrices: [136.81, 135.05, 138.51, 135.98, 137.84], weeklyChange: 0.75, dayChange: 1.37, sortRank: 0, periodReturns: { '1M': 8.7, 'YTD': 19.5, '6M': 21.2, '1Y': 32.3 },
      priceHistory: { '1D': [135.98, 137.82, 137.98, 137.84], '1W': [136.81, 135.05, 138.51, 135.98, 137.84], '1M': [126.77, 127.76, 128.53, 128.48, 129.23, 129.31, 129.75, 128.27, 127.69, 130.3, 133.74, 134.96, 137, 138.69, 137.97, 136.81, 135.05, 138.51, 135.98, 137.84], 'YTD': [115.31, 115.93, 119.4, 116.63, 119.78, 120.8, 129.94, 132.39, 131.92, 132.31, 133.62, 128.8, 131.08, 134.71, 134.39, 131.62, 134.44, 132.56, 127.95, 129.61, 126.67, 129.14, 129.23, 130.3, 137.97, 137.84], '6M': [113.7, 118.11, 117.18, 119.21, 120.61, 126.43, 129.37, 132.1, 132.04, 132.22, 128.72, 128.85, 132.68, 136.3, 133.66, 134.73, 136.91, 130.16, 125.15, 129.61, 126.67, 129.14, 129.23, 130.3, 137.97, 137.84], '1Y': [104.17, 105.02, 108.54, 107.95, 115, 112, 110.7, 114.02, 111.02, 107.55, 109.1, 107.05, 109.78, 115.66, 116.8, 117.82, 116.39, 119.92, 122.56, 123.72, 120.84, 120.51, 115.73, 115.77, 114.62, 115.99, 113.7, 118.11, 117.18, 119.21, 120.61, 126.43, 128.42, 132.1, 132.04, 132.22, 128.72, 128.85, 132.68, 136.3, 133.66, 134.73, 136.91, 130.16, 125.15, 129.61, 126.67, 129.14, 129.23, 130.3, 137.97, 137.84] },
      velocityScore: { '1D': -0.7, '1W': 2.1, '1M': -0.7, '6M': null }, isNew: false,
      marketCap: '$75B', pe: 20.4, revenueGrowth: 10, eps: 6.76, grossMargin: 47, dividendYield: 2.79,
      etfPresence: { POW: 2.75, VOLT: 4.44, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 2, avgWeight: 3.37, proScore: 1.35, coverage: 0.4,
      price: 294.9, weeklyPrices: [334.82, 311.42, 300.53, 318.47, 294.90], weeklyChange: -11.92, dayChange: -7.39, sortRank: 0, periodReturns: { '1M': -1.9, 'YTD': 82, '6M': 71.9, '1Y': 133.6 },
      priceHistory: { '1D': [318.43, 296.51, 295.22, 294.9], '1W': [334.82, 311.42, 300.53, 318.47, 294.9], '1M': [300.57, 289.52, 280.98, 297.88, 302.87, 311.93, 299.6, 317.58, 333.05, 357.96, 318.32, 316.43, 325.57, 303.95, 306.97, 334.82, 311.42, 300.53, 318.47, 294.9], 'YTD': [162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 234.53, 253.15, 244.44, 270.06, 268.41, 270.89, 250.58, 281.03, 301.16, 305.14, 306.18, 358.92, 369.99, 323.4, 315.71, 300.51, 302.87, 357.96, 306.97, 294.9], '6M': [171.54, 170.86, 181.12, 195.1, 177.75, 236.51, 243.75, 259.23, 249.75, 265.38, 269.17, 252.4, 261.29, 295.11, 307.34, 323.46, 328.31, 339.97, 370.94, 323.4, 315.71, 300.51, 302.87, 357.96, 306.97, 294.9], '1Y': [126.26, 124.72, 126.21, 142.55, 140.2, 139.83, 135.69, 125.97, 127.55, 121.82, 138.26, 151.96, 143.31, 162.8, 179, 175.73, 192.9, 191.4, 187.84, 166.65, 159.83, 179.22, 185.61, 161.74, 166.25, 164.34, 171.54, 170.86, 181.12, 195.1, 177.75, 236.51, 243.06, 259.23, 249.75, 265.38, 269.17, 252.4, 261.29, 295.11, 307.34, 323.46, 328.31, 339.97, 370.94, 323.4, 315.71, 300.51, 302.87, 357.96, 306.97, 294.9] },
      velocityScore: { '1D': 4.7, '1W': 6.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$113B', pe: 74.3, revenueGrowth: 30, eps: 3.97, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 2.52, PBD: false, PBW: false, IVEP: 4.22 },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'APH', name: 'Amphenol Corp', easyScore: 2, avgWeight: 2.83, proScore: 1.13, coverage: 0.4,
      price: 160.59, weeklyPrices: [176.32, 172.22, 164.59, 166.81, 160.59], weeklyChange: -8.92, dayChange: -3.77, sortRank: 0, periodReturns: { '1M': 11.8, 'YTD': 18.8, '6M': 15.6, '1Y': 63 },
      priceHistory: { '1D': [166.89, 160.48, 160.25, 160.59], '1W': [176.32, 172.22, 164.59, 166.81, 160.59], '1M': [143.6, 154.07, 149.22, 152.46, 153.8, 158.59, 158.81, 161.11, 163.96, 165.96, 158.7, 162.78, 165.15, 163.72, 166.42, 176.32, 172.22, 164.59, 166.81, 160.59], 'YTD': [135.14, 136.25, 154.22, 150.99, 144.08, 136.23, 146.72, 151.5, 129.58, 136.74, 135.12, 127.96, 126.35, 135.32, 146.98, 148.13, 148.38, 138.47, 124.64, 124.86, 148.76, 138.81, 153.8, 165.96, 166.42, 160.59], '6M': [138.91, 146.75, 152.5, 149.58, 127.63, 143.73, 151.04, 148.47, 136.24, 131.47, 130.65, 123.13, 128, 140.75, 151.06, 149.71, 142.3, 128.03, 125, 124.86, 148.76, 138.81, 153.8, 165.96, 166.42, 160.59], '1Y': [98.55, 100.21, 103.71, 106.7, 108.63, 109.81, 111.06, 109.36, 108.86, 110.54, 119.24, 123.69, 121.01, 123.4, 123.91, 127.67, 135.91, 141.55, 143.85, 132.33, 131.6, 139.22, 140.06, 129.9, 135.14, 136.2, 138.91, 146.75, 152.5, 149.58, 127.63, 143.73, 151.2, 148.47, 136.24, 131.47, 130.65, 123.13, 128, 140.75, 151.06, 149.71, 142.3, 128.03, 125, 124.86, 148.76, 138.81, 153.8, 165.96, 166.42, 160.59] },
      velocityScore: { '1D': 22.8, '1W': 2.7, '1M': -13.7, '6M': null }, isNew: false,
      marketCap: '$198B', pe: 46, revenueGrowth: 58, eps: 3.49, grossMargin: 38, dividendYield: 0.6,
      etfPresence: { POW: 1.06, VOLT: 4.6, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 2.6, proScore: 1.04, coverage: 0.4,
      price: 73.65, weeklyPrices: [74.34, 72.77, 73.14, 72.82, 73.65], weeklyChange: -0.93, dayChange: 1.17, sortRank: 0, periodReturns: { '1M': 2.9, 'YTD': 22.5, '6M': 22, '1Y': 25.9 },
      priceHistory: { '1D': [72.8, 73.63, 73.72, 73.65], '1W': [74.34, 72.77, 73.14, 72.82, 73.65], '1M': [71.59, 71.59, 72.26, 71.62, 72.08, 71.49, 71.48, 71.25, 73.12, 74.95, 75.79, 75.87, 77.53, 77.92, 75.06, 74.34, 72.77, 73.14, 72.82, 73.65], 'YTD': [60.11, 61.15, 60.29, 64.96, 67.26, 66.92, 72.28, 73.5, 75.88, 73.84, 73.69, 74.46, 72.78, 73.01, 70.76, 71.1, 73.32, 73.76, 75.71, 77.52, 71.39, 71.96, 72.08, 74.95, 75.06, 73.65], '6M': [60.39, 60.71, 63.72, 67.24, 67.42, 71.13, 72.98, 74.77, 74.77, 73.52, 74.06, 74.06, 72, 72.74, 71.15, 72.18, 75.54, 71.96, 77.72, 77.52, 71.39, 71.96, 72.08, 74.95, 75.06, 73.65], '1Y': [58.48, 59.04, 57.68, 57.51, 60.26, 58.06, 56.52, 57.07, 57.88, 56.85, 58.4, 60.16, 63.97, 63.58, 62.68, 63.06, 57.67, 59.03, 60.6, 59.91, 59.61, 61.44, 61.95, 59.48, 58.92, 60.16, 60.39, 60.71, 63.72, 67.24, 67.42, 71.13, 72.17, 74.77, 74.77, 73.52, 74.06, 74.06, 72, 72.74, 71.15, 72.18, 75.54, 71.96, 77.72, 77.52, 71.39, 71.96, 72.08, 74.95, 75.06, 73.65] },
      velocityScore: { '1D': -1.9, '1W': -1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$90B', pe: 32.3, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.88,
      etfPresence: { POW: false, VOLT: 1.51, PBD: false, PBW: false, IVEP: 3.69 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'JCI', name: 'JOHNSON CONTROLS INTERNATIONAL PLC', easyScore: 2, avgWeight: 2.54, proScore: 1.02, coverage: 0.4,
      price: 138.31, weeklyPrices: [146.11, 144.80, 140.76, 142.72, 138.31], weeklyChange: -5.34, dayChange: -3.08, sortRank: 0, periodReturns: { '1M': -4, 'YTD': 15.5, '6M': 23, '1Y': 30.5 },
      priceHistory: { '1D': [142.71, 139.22, 138.44, 138.31], '1W': [146.11, 144.8, 140.76, 142.72, 138.31], '1M': [144.05, 147.75, 139.36, 144.01, 144.96, 146.06, 145.17, 143.62, 144.82, 148.21, 141.28, 142.81, 145.49, 138.4, 140.47, 146.11, 144.8, 140.76, 142.72, 138.31], 'YTD': [119.75, 111.29, 112.95, 113.59, 119.26, 137.65, 139.24, 144.71, 139.58, 133.94, 132.56, 136.43, 130.95, 139, 137.21, 139.81, 141.35, 143.14, 143.8, 135.47, 134.06, 143.65, 144.96, 148.21, 140.47, 138.31], '6M': [112.41, 112.13, 114.51, 120.28, 132.52, 138.57, 143.79, 143.42, 137.18, 130.94, 133.25, 131.57, 132.97, 142.53, 140.87, 141.92, 145.08, 139.52, 143.08, 135.47, 134.06, 143.65, 144.96, 148.21, 140.47, 138.31], '1Y': [105.98, 106.26, 108.27, 111.52, 106.48, 105.71, 105.71, 107.26, 106.89, 107.17, 107.81, 109.29, 108.16, 109.58, 106.38, 110.6, 113.05, 113.18, 122.58, 116.38, 113.55, 114.94, 114.98, 116.88, 119.96, 120.94, 112.41, 112.13, 114.51, 120.28, 132.52, 138.57, 142.7, 143.42, 137.18, 130.94, 133.25, 131.57, 132.97, 142.53, 140.87, 141.92, 145.08, 139.52, 143.08, 135.47, 134.06, 143.65, 144.96, 148.21, 140.47, 138.31] },
      velocityScore: { '1D': 0, '1W': 4.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$84B', pe: 42.3, revenueGrowth: 8, eps: 3.27, grossMargin: 37, dividendYield: 1.12,
      etfPresence: { POW: false, VOLT: 1.43, PBD: false, PBW: false, IVEP: 3.66 },
      tonyNote: 'JOHNSON CONTROLS INTERNATIONAL PLC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, avgWeight: 2.45, proScore: 0.98, coverage: 0.4,
      price: 292, weeklyPrices: [372.87, 356.35, 311.27, 310.84, 292.00], weeklyChange: -21.69, dayChange: -6.06, sortRank: 0, periodReturns: { '1M': -4.6, 'YTD': 39.5, '6M': 30.1, '1Y': 113.8 },
      priceHistory: { '1D': [310.84, 291.45, 292.26, 292], '1W': [372.87, 356.35, 311.27, 310.84, 292], '1M': [306.11, 311.64, 308.17, 340.4, 354.37, 370.66, 350.45, 353.32, 372.59, 388.23, 364.96, 359.61, 375.15, 348.11, 348.15, 372.87, 356.35, 311.27, 310.84, 292], 'YTD': [209.37, 210.99, 257.29, 262.19, 255.36, 273.26, 314.27, 335.74, 322.47, 311.39, 315.91, 356.38, 322.71, 366.95, 374.32, 377.19, 361.39, 360.81, 339.19, 323.79, 302.18, 294.81, 354.37, 388.23, 348.15, 292], '6M': [224.4, 237.9, 275.57, 269.12, 257.64, 312.95, 331.23, 337.35, 311.42, 305.82, 327.8, 313.11, 332.31, 379.64, 375.6, 387.24, 389.05, 357.24, 323.46, 323.79, 302.18, 294.81, 354.37, 388.23, 348.15, 292], '1Y': [136.61, 141.48, 142.66, 141.94, 140.56, 151.61, 153.23, 154.51, 149.68, 154.43, 156.74, 174.77, 166.76, 176.02, 182.15, 197.44, 205.12, 205.61, 219.3, 198.54, 196, 207.78, 221.85, 216.87, 217.76, 213.41, 224.4, 237.9, 275.57, 269.12, 257.64, 312.95, 320.64, 337.35, 311.42, 305.82, 327.8, 313.11, 332.31, 379.64, 375.6, 387.24, 389.05, 357.24, 323.46, 323.79, 302.18, 294.81, 354.37, 388.23, 348.15, 292] },
      velocityScore: { '1D': null, '1W': -7.5, '1M': -23.4, '6M': null }, isNew: true,
      marketCap: '$12B', pe: 60.6, revenueGrowth: 26, eps: 4.82, grossMargin: 39, dividendYield: 0.13,
      etfPresence: { POW: 0.97, VOLT: 3.93, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'VST', name: 'Vistra Corp', easyScore: 2, avgWeight: 2.36, proScore: 0.94, coverage: 0.4,
      price: 157.22, weeklyPrices: [158.63, 153.16, 151.05, 157.22, 157.22], weeklyChange: -0.89, dayChange: -0.01, sortRank: 0, periodReturns: { '1M': 7, 'YTD': -2.5, '6M': 1.7, '1Y': -18.8 },
      priceHistory: { '1D': [157.24, 157.26, 156.5, 157.22], '1W': [158.63, 153.16, 151.05, 157.22, 157.22], '1M': [146.9, 146.22, 138.54, 146.38, 148.02, 153.52, 158.61, 158.83, 163.75, 167.26, 162.39, 162.87, 167.77, 163.49, 162.38, 158.63, 153.16, 151.05, 157.22, 157.22], 'YTD': [161.33, 150.6, 180.18, 160.12, 158.35, 149.65, 171.49, 171.62, 161.7, 164.4, 164.33, 152.72, 150.33, 155.89, 162.94, 155.79, 153.79, 158.29, 142.61, 149.08, 160.23, 148.76, 148.02, 167.26, 162.38, 157.22], '6M': [154.6, 168.97, 160.36, 162.58, 143.07, 163.1, 171.4, 176.82, 167.4, 159.58, 167.37, 152.3, 151.18, 154.73, 163.46, 164.35, 155.28, 147.72, 139.68, 149.08, 160.23, 148.76, 148.02, 167.26, 162.38, 157.22], '1Y': [193.7, 194.81, 188.23, 195.88, 214.06, 200.08, 198.96, 190.46, 189.11, 188.01, 213.52, 217.92, 197.94, 200.41, 209.55, 194.24, 199.3, 193.04, 188.28, 175, 168.59, 173.64, 166.12, 168.25, 161.57, 162.62, 154.6, 168.97, 160.36, 162.58, 143.07, 163.1, 172.5, 176.82, 167.4, 159.58, 167.37, 152.3, 151.18, 154.73, 163.46, 164.35, 155.28, 147.72, 139.68, 149.08, 160.23, 148.76, 148.02, 167.26, 162.38, 157.22] },
      velocityScore: { '1D': null, '1W': -1.1, '1M': null, '6M': null }, isNew: true,
      marketCap: '$53B', pe: 26.3, revenueGrowth: 43, eps: 5.97, grossMargin: 39, dividendYield: 0.58,
      etfPresence: { POW: 1.44, VOLT: false, PBD: false, PBW: false, IVEP: 3.27 },
      tonyNote: 'Vistra Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CEG', name: 'Constellation Energy Corp', easyScore: 2, avgWeight: 2.22, proScore: 0.89, coverage: 0.4,
      price: 244.3, weeklyPrices: [248.37, 236.50, 239.25, 245.87, 244.30], weeklyChange: -1.64, dayChange: -0.64, sortRank: 0, periodReturns: { '1M': -2.5, 'YTD': -30.8, '6M': -27.9, '1Y': -23.2 },
      priceHistory: { '1D': [245.87, 244.99, 244.03, 244.3], '1W': [248.37, 236.5, 239.25, 245.87, 244.3], '1M': [250.67, 251.65, 242.3, 246.71, 253.76, 262.35, 268, 267.17, 274.06, 275.53, 270.26, 267.97, 268.69, 264.02, 259.32, 248.37, 236.5, 239.25, 245.87, 244.3], 'YTD': [353.27, 322.54, 341.2, 289.06, 280.68, 261.42, 288.43, 312.64, 324.87, 317.09, 307.69, 294.85, 279.25, 284.27, 294.73, 287.16, 297, 322.78, 274.89, 285.83, 287.75, 254.83, 253.76, 275.53, 259.32, 244.3], '6M': [338.63, 330.38, 287.35, 287.45, 247.06, 276.12, 294.84, 323.56, 332.07, 301.55, 316.47, 295.19, 272.82, 286.5, 296.21, 313.53, 307.81, 303.63, 267.2, 285.83, 287.75, 254.83, 253.76, 275.53, 259.32, 244.3], '1Y': [318.25, 325.99, 317.88, 328.66, 354.89, 331.49, 322.77, 310.16, 307.98, 298.82, 330.42, 347.12, 334.27, 364.1, 380.91, 370, 391.15, 377.71, 360.93, 338.67, 338.11, 359.05, 357.67, 357.14, 357.81, 357.12, 338.63, 330.38, 287.35, 287.45, 247.06, 276.12, 291.66, 323.56, 332.07, 301.55, 316.47, 295.19, 272.82, 286.5, 296.21, 313.53, 307.81, 303.63, 267.2, 285.83, 287.75, 254.83, 253.76, 275.53, 259.32, 244.3] },
      velocityScore: { '1D': null, '1W': -2.2, '1M': null, '6M': null }, isNew: true,
      marketCap: '$87B', pe: 21.2, revenueGrowth: 64, eps: 11.51, grossMargin: 23, dividendYield: 0.69,
      etfPresence: { POW: 1.21, VOLT: false, PBD: false, PBW: false, IVEP: 3.22 },
      tonyNote: 'Constellation Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TLN', name: 'Talen Energy Corp', easyScore: 2, avgWeight: 2.19, proScore: 0.87, coverage: 0.4,
      price: 373.1, weeklyPrices: [384.26, 360.79, 364.67, 377.79, 373.10], weeklyChange: -2.9, dayChange: -1.24, sortRank: 0, periodReturns: { '1M': 2.3, 'YTD': -0.5, '6M': -0.4, '1Y': 30.9 },
      priceHistory: { '1D': [377.79, 374.46, 373.1], '1W': [384.26, 360.79, 364.67, 377.79, 373.1], '1M': [364.78, 358.74, 336.59, 344.8, 360.54, 386.21, 406.51, 409.81, 436.29, 438.12, 411.92, 405.89, 416.8, 404.09, 399.34, 384.26, 360.79, 364.67, 377.79, 373.1], 'YTD': [374.84, 356, 419.07, 366.43, 348.36, 345, 376.7, 375.24, 341.39, 331.58, 327.14, 315.77, 319.23, 328.65, 353.3, 339.32, 351.91, 409.99, 351.03, 360.48, 386.8, 364.74, 360.54, 438.12, 399.34, 373.1], '6M': [374.71, 374.83, 379.86, 362.2, 324.63, 367.81, 382.25, 390.05, 334.86, 311.45, 340.07, 323.13, 327.58, 321.33, 365.35, 364.32, 372.16, 386.37, 334.24, 360.48, 386.8, 364.74, 360.54, 438.12, 399.34, 373.1], '1Y': [285.1, 281.96, 310.14, 358.77, 390.68, 369.95, 376.89, 356.11, 378.92, 383.49, 405.45, 429.72, 420.7, 430.43, 435.83, 406.84, 407.12, 413.54, 393.63, 368.65, 365.96, 379.99, 353.38, 357.94, 378.85, 378.97, 374.71, 374.83, 379.86, 362.2, 324.63, 367.81, 380.06, 390.05, 334.86, 311.45, 340.07, 323.13, 327.58, 321.33, 365.35, 364.32, 372.16, 386.37, 334.24, 360.48, 386.8, 364.74, 360.54, 438.12, 399.34, 373.1] },
      velocityScore: { '1D': 3.6, '1W': -3.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: null, revenueGrowth: 97, eps: -0.53, grossMargin: 40, dividendYield: null,
      etfPresence: { POW: 1.65, VOLT: false, PBD: false, PBW: false, IVEP: 2.72 },
      tonyNote: 'Talen Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX TECHNOLOGIES INC', easyScore: 2, avgWeight: 2.15, proScore: 0.86, coverage: 0.4,
      price: 192.79, weeklyPrices: [194.65, 191.25, 191.06, 196.89, 192.79], weeklyChange: -0.95, dayChange: -2.16, sortRank: 0, periodReturns: { '1M': 2.8, 'YTD': 11.5, '6M': 0.3, '1Y': 34.1 },
      priceHistory: { '1D': [197.05, 194.04, 192.25, 192.79], '1W': [194.65, 191.25, 191.06, 196.89, 192.79], '1M': [187.46, 188.96, 183, 194.68, 193.45, 193.94, 196.93, 203.07, 205.4, 210, 209.89, 205.65, 204.77, 197.91, 189.25, 194.65, 191.25, 191.06, 196.89, 192.79], 'YTD': [172.84, 193.2, 213.25, 207.75, 205.43, 197.19, 200.4, 204.23, 205.83, 195.91, 207.48, 204.76, 204.49, 231.78, 238.42, 219.1, 208.08, 215.2, 206.83, 202.52, 195.88, 185.95, 193.45, 210, 189.25, 192.79], '6M': [192.24, 204.08, 206.33, 210.18, 187.42, 196.9, 206.44, 207.24, 195.5, 197.82, 210.12, 205.09, 214.98, 229.57, 235.78, 223.15, 216.31, 205.33, 204.72, 202.52, 195.88, 185.95, 193.45, 210, 189.25, 192.79], '1Y': [143.79, 138.65, 140.36, 149.83, 154.51, 177.89, 170.94, 163.09, 162.04, 163.75, 174.3, 178.19, 181.96, 191.38, 197.37, 207.72, 204.03, 215.86, 198.79, 176.18, 169.81, 174.93, 178.75, 174.37, 178.41, 174.36, 192.24, 204.08, 206.33, 210.18, 187.42, 196.9, 209.07, 207.24, 195.5, 197.82, 210.12, 205.09, 214.98, 229.57, 235.78, 223.15, 216.31, 205.33, 204.72, 202.52, 195.88, 185.95, 193.45, 210, 189.25, 192.79] },
      velocityScore: { '1D': 1.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: 51.5, revenueGrowth: 26, eps: 3.74, grossMargin: 23, dividendYield: 0.53,
      etfPresence: { POW: false, VOLT: 2.09, PBD: false, PBW: false, IVEP: 2.21 },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 5.09, proScore: 2.04, coverage: 0.4,
      price: 930.16, weeklyPrices: [1064.90, 991.41, 963.53, 969.92, 930.16], weeklyChange: -12.65, dayChange: -4.09, sortRank: 0, periodReturns: { '1M': 1.6, 'YTD': 62.4, '6M': 55.9, '1Y': 137.6 },
      priceHistory: { '1D': [969.8, 934.76, 930.47, 930.16], '1W': [1064.9, 991.41, 963.53, 969.92, 930.16], '1M': [915.64, 914.7, 856.16, 897.63, 910.57, 933.93, 945.46, 955.92, 985.82, 1022.28, 984.24, 994.45, 1057.01, 997.47, 1033.19, 1064.9, 991.41, 963.53, 969.92, 930.16], 'YTD': [572.87, 608.13, 647.18, 626.62, 657.36, 726.2, 774.2, 768.23, 722.18, 716.68, 702, 716.63, 708.46, 771.58, 770.17, 808.87, 810.05, 926.93, 902.3, 865.95, 875.87, 904.28, 910.57, 1022.28, 1033.19, 930.16], '6M': [596.52, 638.75, 648.41, 665.24, 678.31, 758.29, 759.74, 752.93, 706.08, 700.69, 688.65, 703.19, 717.22, 790.66, 794.65, 830.79, 889.67, 897.45, 888.31, 865.95, 875.87, 904.28, 910.57, 1022.28, 1033.19, 930.16], '1Y': [391.51, 405.77, 410.07, 432.94, 433.7, 408.54, 412.64, 435.67, 419.04, 422.78, 435.94, 472.1, 471.61, 495.38, 504.76, 531.18, 527.07, 570.59, 570.85, 552.05, 550.43, 568.06, 596.5, 589.76, 582.41, 577.39, 596.52, 638.75, 648.41, 665.24, 678.31, 758.29, 760.53, 752.93, 706.08, 700.69, 688.65, 703.19, 717.22, 790.66, 794.65, 830.79, 889.67, 897.45, 888.31, 865.95, 875.87, 904.28, 910.57, 1022.28, 1033.19, 930.16] },
      velocityScore: { '1D': 0, '1W': -2.4, '1M': 0, '6M': null }, isNew: false,
      marketCap: '$428B', pe: 46.3, revenueGrowth: 22, eps: 20.08, grossMargin: 29, dividendYield: 0.67,
      etfPresence: { AIRR: false, PRN: 3.29, RSHO: 6.89, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 4.79, proScore: 1.92, coverage: 0.4,
      price: 230.8, weeklyPrices: [286.36, 264.86, 246.33, 248.05, 230.80], weeklyChange: -19.4, dayChange: -6.93, sortRank: 0, periodReturns: { '1M': -21.4, 'YTD': 117.2, '6M': 94.6, '1Y': 220.7 },
      priceHistory: { '1D': [248.05, 233.02, 230.74, 230.8], '1W': [286.36, 264.86, 246.33, 248.05, 230.8], '1M': [293.6, 283.51, 262.34, 290.5, 294.75, 303.53, 292.7, 294.03, 297.2, 307.8, 291.5, 294.49, 309.2, 279.77, 281.09, 286.36, 264.86, 246.33, 248.05, 230.8], 'YTD': [106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 186.39, 170.37, 176.51, 174.04, 186.82, 180.36, 218.07, 229.73, 242.77, 253.49, 320.3, 300.84, 270.75, 284.42, 284.87, 294.75, 307.8, 281.09, 230.8], '6M': [118.62, 133.76, 142.29, 152.31, 179.6, 197.63, 182.27, 176.96, 167.67, 171.19, 175.13, 174.8, 182.6, 230.94, 241.01, 252.76, 275.33, 309.39, 292.65, 270.75, 284.42, 284.87, 294.75, 307.8, 281.09, 230.8], '1Y': [71.96, 70.19, 73.64, 80.8, 76.72, 88.28, 86.57, 87.65, 88.72, 90.8, 100.68, 100.97, 101.01, 103.9, 105.33, 116.4, 124.71, 130.23, 124.62, 105.94, 94.02, 106.53, 114.29, 109.31, 112.18, 109.16, 118.62, 133.76, 142.29, 152.31, 179.6, 197.63, 178.79, 176.96, 167.67, 171.19, 175.13, 174.8, 182.6, 230.94, 241.01, 252.76, 275.33, 309.39, 292.65, 270.75, 284.42, 284.87, 294.75, 307.8, 281.09, 230.8] },
      velocityScore: { '1D': 0, '1W': -2, '1M': -9, '6M': null }, isNew: false,
      marketCap: '$8B', pe: 45.1, revenueGrowth: 7, eps: 5.12, grossMargin: 30, dividendYield: 0.14,
      etfPresence: { AIRR: 2.26, PRN: false, RSHO: 7.33, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 4.71, proScore: 1.88, coverage: 0.4,
      price: 677.68, weeklyPrices: [839.36, 776.55, 700.75, 717.11, 677.68], weeklyChange: -19.26, dayChange: -5.5, sortRank: 0, periodReturns: { '1M': -24, 'YTD': 121.3, '6M': 117, '1Y': 185.9 },
      priceHistory: { '1D': [717.11, 685.76, 680.47, 677.68], '1W': [839.36, 776.55, 700.75, 717.11, 677.68], '1M': [891.86, 842.01, 770.25, 838.55, 858.99, 866.67, 857.76, 838.21, 861.88, 932.75, 892.25, 867.23, 881.92, 804.76, 813.77, 839.36, 776.55, 700.75, 717.11, 677.68], 'YTD': [306.23, 297.62, 336.31, 351.39, 357.91, 401.29, 437.77, 459.72, 415.51, 411.53, 425.51, 446.16, 407.27, 423.35, 456.08, 487.87, 469.75, 886.22, 854.28, 733.77, 860.84, 882.43, 858.99, 932.75, 813.77, 677.68], '6M': [312.24, 319.27, 364.25, 379.23, 365.07, 431.43, 435.5, 433.34, 398.87, 404.59, 431.78, 415.93, 416.34, 446.36, 463.65, 497.18, 532.67, 844.8, 848.84, 733.77, 860.84, 882.43, 858.99, 932.75, 813.77, 677.68], '1Y': [237, 241.31, 247.65, 263.59, 271.74, 289.86, 283.2, 279.58, 278.53, 286.71, 322.9, 367.39, 341.1, 352.78, 355.27, 369.01, 376.74, 392.77, 384.45, 332.82, 315.1, 320.51, 324.62, 319.12, 313.04, 307.68, 312.24, 319.27, 364.25, 379.23, 365.07, 431.43, 415.13, 433.34, 398.87, 404.59, 431.78, 415.93, 416.34, 446.36, 463.65, 497.18, 532.67, 844.8, 848.84, 733.77, 860.84, 882.43, 858.99, 932.75, 813.77, 677.68] },
      velocityScore: { '1D': 1.1, '1W': -5.5, '1M': -17.2, '6M': null }, isNew: false,
      marketCap: '$21B', pe: 60.6, revenueGrowth: 92, eps: 11.19, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 5.38, PRN: 4.04, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.38, proScore: 1.75, coverage: 0.4,
      price: 1695.67, weeklyPrices: [1981.95, 1865.15, 1741.30, 1793.03, 1695.67], weeklyChange: -14.44, dayChange: -5.42, sortRank: 0, periodReturns: { '1M': -8.4, 'YTD': 81.7, '6M': 63.8, '1Y': 213.2 },
      priceHistory: { '1D': [1792.93, 1710.91, 1696.29, 1695.67], '1W': [1981.95, 1865.15, 1741.3, 1793.03, 1695.67], '1M': [1852.03, 1831.56, 1719.48, 1843.42, 1877.61, 1952.02, 1913.94, 1931.77, 1967.41, 2066.51, 1908.07, 1954.47, 2017.57, 1854.23, 1948.69, 1981.95, 1865.15, 1741.3, 1793.03, 1695.67], 'YTD': [933.29, 971.49, 1091.04, 1121.44, 1142.1, 1230.26, 1337.95, 1468.58, 1391.16, 1383.62, 1424.46, 1461.52, 1378.99, 1525.16, 1648.96, 1724.49, 1724.14, 2011.49, 2034.63, 1835.33, 1828.21, 1843.94, 1877.61, 2066.51, 1948.69, 1695.67], '6M': [1035.12, 1053.1, 1131.7, 1171.46, 1147.97, 1300.02, 1462.23, 1438.23, 1348.22, 1373.76, 1444.6, 1358.66, 1417.19, 1592.84, 1650.47, 1726.12, 1867.02, 1952.37, 1992.74, 1835.33, 1828.21, 1843.94, 1877.61, 2066.51, 1948.69, 1695.67], '1Y': [541.48, 542.95, 544.95, 692.97, 699.16, 693.31, 695.76, 689.48, 703.38, 715.87, 782.05, 821.62, 801.8, 825.42, 845.99, 836.75, 976.45, 977.67, 974.14, 919.82, 894.08, 961.2, 989.48, 968.48, 950.79, 946.93, 1035.12, 1053.1, 1131.7, 1171.46, 1147.97, 1300.02, 1373.52, 1438.23, 1348.22, 1373.76, 1444.6, 1358.66, 1417.19, 1592.84, 1650.47, 1726.12, 1867.02, 1952.37, 1992.74, 1835.33, 1828.21, 1843.94, 1877.61, 2066.51, 1948.69, 1695.67] },
      velocityScore: { '1D': 1.7, '1W': -3.8, '1M': -3.8, '6M': null }, isNew: false,
      marketCap: '$60B', pe: 49, revenueGrowth: 1, eps: 34.61, grossMargin: 25, dividendYield: 0.15,
      etfPresence: { AIRR: 4.19, PRN: 4.58, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.94, proScore: 1.58, coverage: 0.4,
      price: 322.48, weeklyPrices: [338.15, 332.08, 330.85, 328.53, 322.48], weeklyChange: -4.63, dayChange: -1.91, sortRank: 0, periodReturns: { '1M': 2.6, 'YTD': 25.6, '6M': 23.7, '1Y': 32.1 },
      priceHistory: { '1D': [328.76, 322.96, 322.48], '1W': [338.15, 332.08, 330.85, 328.53, 322.48], '1M': [314.42, 322.81, 314.08, 318.89, 320.11, 316.18, 324.38, 329.89, 337.96, 338.07, 330.9, 333.78, 343.54, 337.08, 334.16, 338.15, 332.08, 330.85, 328.53, 322.48], 'YTD': [256.77, 264.62, 282.47, 280.14, 260.41, 291.74, 279.84, 282.27, 277.7, 264.31, 261.37, 264.14, 265.32, 280.74, 284.56, 289.82, 296.57, 315.39, 310.87, 305.66, 303.81, 315.29, 320.11, 338.07, 334.16, 322.48], '6M': [260.8, 277.62, 282.33, 259.51, 287.03, 279.03, 281.97, 283.5, 274.97, 259.88, 256.58, 260.51, 267.12, 289.01, 291.03, 293.35, 302.99, 308.87, 307.17, 305.66, 303.81, 315.29, 320.11, 338.07, 334.16, 322.48], '1Y': [244.15, 256.98, 260.2, 274.69, 267.16, 262.51, 262.36, 267.11, 263.58, 266.22, 262.83, 265.48, 258.44, 259.04, 246.74, 249.57, 260, 253.33, 259.74, 240.63, 248.92, 256.44, 257.25, 259.81, 263.48, 261.16, 260.8, 277.62, 282.33, 259.51, 287.03, 279.03, 281.13, 283.5, 274.97, 259.88, 256.58, 260.51, 267.12, 289.01, 291.03, 293.35, 302.99, 308.87, 307.17, 305.66, 303.81, 315.29, 320.11, 338.07, 334.16, 322.48] },
      velocityScore: { '1D': 0, '1W': 0.6, '1M': 16.2, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 30.5, revenueGrowth: 7, eps: 10.58, grossMargin: 30, dividendYield: 0.62,
      etfPresence: { AIRR: 1.84, PRN: false, RSHO: 6.04, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'EME', name: 'EMCOR Group, Inc.', easyScore: 2, avgWeight: 3.53, proScore: 1.41, coverage: 0.4,
      price: 776.85, weeklyPrices: [829.88, 804.33, 774.66, 787.29, 776.85], weeklyChange: -6.39, dayChange: -1.36, sortRank: 0, periodReturns: { '1M': -5.7, 'YTD': 27, '6M': 19.3, '1Y': 41 },
      priceHistory: { '1D': [787.52, 775.43, 776.85], '1W': [829.88, 804.33, 774.66, 787.29, 776.85], '1M': [823.79, 827.78, 776.72, 811.53, 823.05, 842.3, 834.77, 827.5, 836.59, 868.88, 838.61, 847.17, 862.66, 798.1, 814.41, 829.88, 804.33, 774.66, 787.29, 776.85], 'YTD': [611.79, 628.27, 682.13, 694.21, 720.73, 764.35, 800.82, 806.8, 736.3, 723.38, 728.55, 761.27, 738.31, 789.19, 803.64, 860, 833.37, 943.75, 923.01, 849.2, 826.82, 817.44, 823.05, 868.88, 814.41, 776.85], '6M': [650.97, 660.73, 702.89, 730.4, 717.68, 782.93, 812.79, 746.18, 719.01, 710.53, 751.33, 726.31, 756.3, 802.43, 806.05, 869.9, 903.5, 921.64, 913.11, 849.2, 826.82, 817.44, 823.05, 868.88, 814.41, 776.85], '1Y': [551.14, 556.86, 560.44, 631.66, 629.22, 614.69, 612.92, 610.24, 620, 621.58, 628.75, 655.83, 640.63, 670, 677.02, 700.18, 754.85, 673.52, 656.33, 611.4, 581.58, 607.78, 629.22, 624.09, 621.84, 617.3, 650.97, 660.73, 702.89, 730.4, 717.68, 782.93, 803.55, 746.18, 719.01, 710.53, 751.33, 726.31, 756.3, 802.43, 806.05, 869.9, 903.5, 921.64, 913.11, 849.2, 826.82, 817.44, 823.05, 868.88, 814.41, 776.85] },
      velocityScore: { '1D': 0.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$35B', pe: 26.1, revenueGrowth: 20, eps: 29.76, grossMargin: 19, dividendYield: 0.2,
      etfPresence: { AIRR: 3.73, PRN: 3.33, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'EMCOR Group is an electrical and mechanical construction services company. Revenue grew substantially, and EMCOR is a core Industrials ETF holding because it builds the electrical systems inside data centers, manufacturing plants, and commercial buildings. The $827 share price reflects years of consistent execution and market share gains in a fragmented contractor market.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 2, avgWeight: 3.14, proScore: 1.25, coverage: 0.4,
      price: 272.15, weeklyPrices: [268.86, 267.41, 270.41, 277.91, 272.15], weeklyChange: 1.22, dayChange: -2.06, sortRank: 0, periodReturns: { '1M': 10.4, 'YTD': 32.7, '6M': 29, '1Y': 51 },
      priceHistory: { '1D': [277.88, 272.39, 271.86, 272.15], '1W': [268.86, 267.41, 270.41, 277.91, 272.15], '1M': [246.55, 257.16, 249.49, 264.6, 264.67, 270.44, 277.42, 283.23, 277.66, 280.36, 275.13, 276.06, 273.14, 268.87, 268.57, 268.86, 267.41, 270.41, 277.91, 272.15], 'YTD': [205.02, 210.02, 224.26, 214.89, 208.08, 223.16, 250.21, 260.95, 258.84, 253.91, 240.24, 239.51, 230.46, 250, 254.04, 240.88, 236.52, 256.43, 273.1, 259.89, 258.25, 251.9, 264.67, 280.36, 268.57, 272.15], '6M': [210.9, 220.25, 217.7, 208.93, 209.63, 244.79, 258.1, 260.31, 252.39, 243.82, 232.94, 230.51, 232.68, 252.67, 255.69, 242.44, 239.51, 270.56, 260.35, 259.89, 258.25, 251.9, 264.67, 280.36, 268.57, 272.15], '1Y': [180.25, 184.32, 187.83, 188.17, 181.16, 179.88, 173.05, 171, 174.1, 179.43, 189.25, 192.15, 191.92, 190.48, 189.99, 192.52, 201.84, 206.74, 209.74, 200.28, 197.28, 198.74, 193.64, 197.24, 208.17, 207.81, 210.9, 220.25, 217.7, 208.93, 209.63, 244.79, 251.3, 260.31, 252.39, 243.82, 232.94, 230.51, 232.68, 252.67, 255.69, 242.44, 239.51, 270.56, 260.35, 259.89, 258.25, 251.9, 264.67, 280.36, 268.57, 272.15] },
      velocityScore: { '1D': 0.8, '1W': null, '1M': 30.2, '6M': null }, isNew: false,
      marketCap: '$109B', pe: 63.1, revenueGrowth: 19, eps: 4.31, grossMargin: 35, dividendYield: 0.17,
      etfPresence: { AIRR: false, PRN: 4.11, RSHO: false, IDEF: 2.16, BILT: false },
      tonyNote: 'Howmet Aerospace is an aerospace structures and engine components manufacturer. It appears in Industrials ETFs for its aerospace and defense exposure — commercial air travel recovery and defense spending growth are the two demand drivers. Revenue grew and margins are expanding as Howmet prices power over OEM customers.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 2.81, proScore: 1.13, coverage: 0.4,
      price: 224.45, weeklyPrices: [245.17, 231.72, 227.74, 232.19, 224.45], weeklyChange: -8.45, dayChange: -3.39, sortRank: 0, periodReturns: { '1M': -2.4, 'YTD': 12.2, '6M': 7.9, '1Y': 32.1 },
      priceHistory: { '1D': [232.35, 224.52, 226.4, 224.45], '1W': [245.17, 231.72, 227.74, 232.19, 224.45], '1M': [229.95, 228.01, 223.63, 233.49, 230.05, 237.06, 234.8, 235.29, 242.97, 246.41, 236.07, 237.22, 244.56, 231.87, 238.21, 245.17, 231.72, 227.74, 232.19, 224.45], 'YTD': [200.06, 207.44, 213.61, 211.03, 208.41, 222.32, 239, 243.04, 219.58, 210.96, 204.62, 200.67, 199.94, 212.22, 219.99, 220.62, 211.36, 212.74, 203.79, 205.39, 216.66, 227.8, 230.05, 246.41, 238.21, 224.45], '6M': [208, 209.78, 217.13, 211.84, 218.02, 230.92, 242.29, 231.59, 211.9, 202.65, 202.36, 200.45, 197.29, 215.97, 223.52, 222.82, 208.13, 202.84, 200.99, 205.39, 216.66, 227.8, 230.05, 246.41, 238.21, 224.45], '1Y': [169.97, 174.38, 174.44, 180.42, 200.98, 200.51, 187.85, 190.47, 187.11, 189.1, 186.95, 189.75, 184.24, 190.89, 180.71, 184.97, 195.85, 215.13, 224.93, 207.28, 204.57, 208.53, 206.16, 218.13, 207.18, 203.51, 208, 209.78, 217.13, 211.84, 218.02, 230.92, 241.01, 231.59, 211.9, 202.65, 202.36, 200.45, 197.29, 215.97, 223.52, 222.82, 208.13, 202.84, 200.99, 205.39, 216.66, 227.8, 230.05, 246.41, 238.21, 224.45] },
      velocityScore: { '1D': 0.9, '1W': 0.9, '1M': 0, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 43, revenueGrowth: 17, eps: 5.22, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.67, PRN: false, RSHO: 3.96, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 2, avgWeight: 2.4, proScore: 0.96, coverage: 0.4,
      price: 192.79, weeklyPrices: [194.65, 191.25, 191.06, 196.89, 192.79], weeklyChange: -0.95, dayChange: -2.16, sortRank: 0, periodReturns: { '1M': 2.8, 'YTD': 11.5, '6M': 0.3, '1Y': 34.1 },
      priceHistory: { '1D': [197.05, 194.04, 192.25, 192.79], '1W': [194.65, 191.25, 191.06, 196.89, 192.79], '1M': [187.46, 188.96, 183, 194.68, 193.45, 193.94, 196.93, 203.07, 205.4, 210, 209.89, 205.65, 204.77, 197.91, 189.25, 194.65, 191.25, 191.06, 196.89, 192.79], 'YTD': [172.84, 193.2, 213.25, 207.75, 205.43, 197.19, 200.4, 204.23, 205.83, 195.91, 207.48, 204.76, 204.49, 231.78, 238.42, 219.1, 208.08, 215.2, 206.83, 202.52, 195.88, 185.95, 193.45, 210, 189.25, 192.79], '6M': [192.24, 204.08, 206.33, 210.18, 187.42, 196.9, 206.44, 207.24, 195.5, 197.82, 210.12, 205.09, 214.98, 229.57, 235.78, 223.15, 216.31, 205.33, 204.72, 202.52, 195.88, 185.95, 193.45, 210, 189.25, 192.79], '1Y': [143.79, 138.65, 140.36, 149.83, 154.51, 177.89, 170.94, 163.09, 162.04, 163.75, 174.3, 178.19, 181.96, 191.38, 197.37, 207.72, 204.03, 215.86, 198.79, 176.18, 169.81, 174.93, 178.75, 174.37, 178.41, 174.36, 192.24, 204.08, 206.33, 210.18, 187.42, 196.9, 209.07, 207.24, 195.5, 197.82, 210.12, 205.09, 214.98, 229.57, 235.78, 223.15, 216.31, 205.33, 204.72, 202.52, 195.88, 185.95, 193.45, 210, 189.25, 192.79] },
      velocityScore: { '1D': 2.1, '1W': 4.3, '1M': 5.5, '6M': null }, isNew: false,
      marketCap: '$18B', pe: 51.5, revenueGrowth: 26, eps: 3.74, grossMargin: 23, dividendYield: 0.53,
      etfPresence: { AIRR: 3.15, PRN: false, RSHO: false, IDEF: 1.64, BILT: false },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 2, avgWeight: 1.87, proScore: 0.75, coverage: 0.4,
      price: 53.49, weeklyPrices: [49.86, 53.04, 55.35, 53.54, 53.49], weeklyChange: 7.29, dayChange: -0.08, sortRank: 0, periodReturns: { '1M': -7.3, 'YTD': -29.5, '6M': -41.5, '1Y': 19.5 },
      priceHistory: { '1D': [53.54, 53.56, 53.61, 53.49], '1W': [49.86, 53.04, 55.35, 53.54, 53.49], '1M': [57.73, 56.19, 54.82, 58.78, 57.75, 57.02, 56.34, 56.16, 54.21, 51.09, 50.8, 47.95, 46.32, 47.21, 46.95, 49.86, 53.04, 55.35, 53.54, 53.49], 'YTD': [75.91, 104.04, 124.56, 110.39, 103.01, 94.41, 89.06, 90.68, 88.95, 88.96, 95.31, 77.49, 70.51, 74.46, 74.66, 68.61, 59.56, 61.52, 52.49, 54.67, 64.13, 58.52, 57.75, 51.09, 46.95, 53.49], '6M': [91.44, 121.5, 113.85, 108.16, 85.25, 87.05, 96.08, 92.14, 85.54, 89.46, 92.78, 75.86, 67.31, 70.34, 70.99, 61.26, 62.05, 57.89, 52.09, 54.67, 64.13, 58.52, 57.75, 51.09, 46.95, 53.49], '1Y': [44.78, 51.99, 58.78, 59.36, 59.5, 65.41, 68.74, 66.71, 65.84, 64.14, 70.74, 80.72, 88.08, 100.25, 96.28, 86.65, 90.68, 91.1, 79.18, 70.24, 69.14, 73.21, 77.03, 74.26, 81.53, 75.98, 91.44, 121.5, 113.85, 108.16, 85.25, 87.05, 105.67, 92.14, 85.54, 89.46, 92.78, 75.86, 67.31, 70.34, 70.99, 61.26, 62.05, 57.89, 52.09, 54.67, 64.13, 58.52, 57.75, 51.09, 46.95, 53.49] },
      velocityScore: { '1D': -3.8, '1W': 15.4, '1M': -7.4, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 314.7, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.74, PRN: false, RSHO: false, IDEF: 0.99, BILT: false },
      tonyNote: 'Kratos Defense is a defense technology company focused on unmanned systems, satellite communications, and high-performance computing for government customers. It appears in Industrials ETFs as an AI-adjacent defense name — autonomous systems and AI-driven surveillance are direct end markets. Revenue grew and the government contract backlog is expanding.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 2, avgWeight: 1.86, proScore: 0.74, coverage: 0.4,
      price: 295, weeklyPrices: [279.89, 278.97, 291.50, 294.10, 295.00], weeklyChange: 5.4, dayChange: 0.36, sortRank: 0, periodReturns: { '1M': 0.9, 'YTD': -13.3, '6M': -17.2, '1Y': 16.4 },
      priceHistory: { '1D': [293.93, 294.27, 294.58, 295], '1W': [279.89, 278.97, 291.5, 294.1, 295], '1M': [292.26, 297.52, 289.13, 300.95, 297.68, 299.66, 298.51, 296.89, 285.43, 278.19, 283.48, 279.62, 279.09, 281.99, 277.39, 279.89, 278.97, 291.5, 294.1, 295], 'YTD': [340.07, 378.47, 418.86, 418.58, 420.51, 397.77, 418.78, 447.73, 440.33, 417.51, 422.94, 402.08, 379.9, 411.35, 398.13, 366.88, 362.17, 319.54, 334.22, 317.55, 308.17, 293.04, 297.68, 278.19, 277.39, 295], '6M': [356.45, 415.39, 424.14, 427.83, 369.38, 406.76, 437.57, 443, 421.17, 414.56, 418.42, 384.79, 396.62, 394.41, 394.81, 359.29, 360.6, 316.28, 326.17, 317.55, 308.17, 293.04, 297.68, 278.19, 277.39, 295], '1Y': [253.53, 258.5, 252.93, 262.49, 265.67, 266.65, 267.6, 269.98, 270.79, 269.94, 273.02, 276.16, 279.53, 288.49, 287.9, 285.77, 301.69, 317.54, 318.66, 309.74, 305.49, 306.65, 315.88, 329.16, 353.52, 341.98, 356.45, 415.39, 424.14, 427.83, 369.38, 406.76, 443.14, 443, 421.17, 414.56, 418.42, 384.79, 396.62, 394.41, 394.81, 359.29, 360.6, 316.28, 326.17, 317.55, 308.17, 293.04, 297.68, 278.19, 277.39, 295] },
      velocityScore: { '1D': 0, '1W': 5.7, '1M': 0, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 19.2, revenueGrowth: 13, eps: 15.38, grossMargin: 12, dividendYield: 1.88,
      etfPresence: { AIRR: 2.7, PRN: false, RSHO: false, IDEF: 1.02, BILT: false },
      tonyNote: 'Huntington Ingalls Industries is the only builder of nuclear-powered aircraft carriers for the U.S. Navy. Revenue is government-contracted and predictable; the ETF allocation in Industrials reflects defense spending growth and the Navy\'s backlog of nuclear submarine and carrier construction. A steady-state quality compounder in a market structure with no competition.',
    },
    {
      ticker: 'CW', name: 'Curtiss-Wright Corp', easyScore: 2, avgWeight: 1.86, proScore: 0.75, coverage: 0.4,
      price: 777.92, weeklyPrices: [757.76, 757.76, 760.23, 792.77, 777.92], weeklyChange: 2.66, dayChange: -1.85, sortRank: 0, periodReturns: { '1M': 7.8, 'YTD': 41.1, '6M': 33.4, '1Y': 58.3 },
      priceHistory: { '1D': [792.61, 785.91, 776.78, 777.92], '1W': [757.76, 757.76, 760.23, 792.77, 777.92], '1M': [721.33, 733.57, 719.02, 757.23, 758, 762.59, 764.61, 777.29, 771.93, 783.82, 765.13, 762.92, 767.73, 747.27, 737.39, 757.76, 757.76, 760.23, 792.77, 777.92], 'YTD': [551.27, 582.61, 660.66, 649.08, 656.69, 649.32, 684.22, 712.45, 701.99, 703.61, 679.58, 700.81, 681.12, 728.96, 731.94, 710.93, 696.23, 742.89, 751, 726.88, 747.61, 733.14, 758, 783.82, 737.39, 777.92], '6M': [583.18, 636.65, 657.42, 663.9, 618.6, 671.06, 707.45, 701.99, 678.68, 680.29, 691.62, 665.81, 694.88, 725.71, 735.65, 717.53, 713.14, 729.2, 712.72, 726.88, 747.61, 733.14, 758, 783.82, 737.39, 777.92], '1Y': [491.4, 487.14, 480.06, 490.63, 496.42, 489.47, 493.63, 480.93, 478.15, 484.23, 518.78, 518.13, 530.68, 554.06, 550.8, 561.23, 573.23, 601.78, 588.42, 543.73, 536, 546.05, 547.76, 547.36, 568.06, 558.58, 583.18, 636.65, 657.42, 663.9, 618.6, 671.06, 702.55, 701.99, 678.68, 680.29, 691.62, 665.81, 694.88, 725.71, 735.65, 717.53, 713.14, 729.2, 712.72, 726.88, 747.61, 733.14, 758, 783.82, 737.39, 777.92] },
      velocityScore: { '1D': 2.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$29B', pe: 57, revenueGrowth: 13, eps: 13.64, grossMargin: 37, dividendYield: 0.13,
      etfPresence: { AIRR: false, PRN: 2.76, RSHO: false, IDEF: 0.97, BILT: false },
      tonyNote: 'Curtiss-Wright Corp appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 1.36, proScore: 0.55, coverage: 0.4,
      price: 73.65, weeklyPrices: [74.34, 72.77, 73.14, 72.82, 73.65], weeklyChange: -0.93, dayChange: 1.17, sortRank: 0, periodReturns: { '1M': 2.9, 'YTD': 22.5, '6M': 22, '1Y': 25.9 },
      priceHistory: { '1D': [72.8, 73.63, 73.72, 73.65], '1W': [74.34, 72.77, 73.14, 72.82, 73.65], '1M': [71.59, 71.59, 72.26, 71.62, 72.08, 71.49, 71.48, 71.25, 73.12, 74.95, 75.79, 75.87, 77.53, 77.92, 75.06, 74.34, 72.77, 73.14, 72.82, 73.65], 'YTD': [60.11, 61.15, 60.29, 64.96, 67.26, 66.92, 72.28, 73.5, 75.88, 73.84, 73.69, 74.46, 72.78, 73.01, 70.76, 71.1, 73.32, 73.76, 75.71, 77.52, 71.39, 71.96, 72.08, 74.95, 75.06, 73.65], '6M': [60.39, 60.71, 63.72, 67.24, 67.42, 71.13, 72.98, 74.77, 74.77, 73.52, 74.06, 74.06, 72, 72.74, 71.15, 72.18, 75.54, 71.96, 77.72, 77.52, 71.39, 71.96, 72.08, 74.95, 75.06, 73.65], '1Y': [58.48, 59.04, 57.68, 57.51, 60.26, 58.06, 56.52, 57.07, 57.88, 56.85, 58.4, 60.16, 63.97, 63.58, 62.68, 63.06, 57.67, 59.03, 60.6, 59.91, 59.61, 61.44, 61.95, 59.48, 58.92, 60.16, 60.39, 60.71, 63.72, 67.24, 67.42, 71.13, 72.17, 74.77, 74.77, 73.52, 74.06, 74.06, 72, 72.74, 71.15, 72.18, 75.54, 71.96, 77.72, 77.52, 71.39, 71.96, 72.08, 74.95, 75.06, 73.65] },
      velocityScore: { '1D': 0, '1W': -16.7, '1M': 0, '6M': null }, isNew: false,
      marketCap: '$90B', pe: 32.3, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.88,
      etfPresence: { AIRR: false, PRN: false, RSHO: 0.92, IDEF: false, BILT: 1.81 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AIR', name: 'AIRBUS GROUP', easyScore: 2, avgWeight: 1.35, proScore: 0.54, coverage: 0.4,
      price: 140.45, weeklyPrices: [142.93, 142.76, 140.11, 143.61, 140.45], weeklyChange: -1.74, dayChange: -2.14, sortRank: 0, periodReturns: { '1M': 22.4, 'YTD': 69.6, '6M': 53.8, '1Y': 98.9 },
      priceHistory: { '1D': [143.52, 141.87, 140.45], '1W': [142.93, 142.76, 140.11, 143.61, 140.45], '1M': [114.72, 120.13, 117.36, 127.23, 129.01, 131.18, 129.96, 132.14, 134.88, 134.28, 132.26, 132.94, 138.51, 143.14, 141.85, 142.93, 142.76, 140.11, 143.61, 140.45], 'YTD': [82.79, 94.73, 105.74, 105.66, 105.91, 113.09, 112.98, 118.26, 116.84, 108.3, 108.76, 107.81, 109.46, 120.78, 122.75, 111.5, 105.69, 118.71, 107.47, 108.44, 112.62, 116.65, 129.01, 134.28, 141.85, 140.45], '6M': [91.34, 101.08, 107.74, 106.67, 106.87, 113.22, 116.97, 118.17, 110.71, 103.78, 109.21, 110.82, 109.78, 120.83, 123.04, 110.54, 110.35, 117.78, 104.55, 108.44, 112.62, 116.65, 129.01, 134.28, 141.85, 140.45], '1Y': [70.6, 74.72, 80.55, 76.8, 73.54, 75.4, 75.75, 75.82, 75.66, 74.77, 74.43, 76.9, 87.9, 83.35, 81.28, 84.02, 84.59, 85.73, 83.31, 78.95, 77.69, 81.6, 81.13, 82.71, 86.18, 83.52, 91.34, 101.08, 107.74, 106.67, 106.87, 113.22, 115.55, 118.17, 110.71, 103.78, 109.21, 110.82, 109.78, 120.83, 123.04, 110.54, 110.35, 117.78, 104.55, 108.44, 112.62, 116.65, 129.01, 134.28, 141.85, 140.45] },
      velocityScore: { '1D': 0, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: 30.9, revenueGrowth: 25, eps: 4.55, grossMargin: 19, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 2.54, BILT: false },
      tonyNote: 'AIRBUS GROUP appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRCY', name: 'Mercury Systems, Inc.', easyScore: 2, avgWeight: 1.19, proScore: 0.48, coverage: 0.4,
      price: 121, weeklyPrices: [122.33, 123.05, 126.21, 123.07, 121.00], weeklyChange: -1.08, dayChange: -1.68, sortRank: 0, periodReturns: { '1M': 9.1, 'YTD': 65.7, '6M': 42.7, '1Y': 135.2 },
      priceHistory: { '1D': [123.07, 121.32, 121], '1W': [122.33, 123.05, 126.21, 123.07, 121], '1M': [110.94, 108.82, 106.81, 119.32, 120.3, 115.93, 112.44, 115.5, 113.91, 111.76, 110.87, 105, 105.57, 109.38, 110.22, 122.33, 123.05, 126.21, 123.07, 121], 'YTD': [73.01, 88.74, 102.95, 99.05, 93.88, 82.2, 82.36, 88.76, 89.43, 86.87, 81.35, 74.49, 72.91, 80.81, 85.51, 82.61, 74.75, 91.66, 92.5, 96.36, 111.7, 111.27, 120.3, 111.76, 110.22, 121], '6M': [84.8, 98.62, 99.48, 98.29, 79.07, 80.25, 87.63, 89.58, 84.96, 81.44, 77.81, 76.16, 74.22, 79.6, 84.05, 77.99, 78.55, 90.34, 92.03, 96.36, 111.7, 111.27, 120.3, 111.76, 110.22, 121], '1Y': [51.45, 51.27, 52.37, 52.76, 53.56, 53.58, 66.8, 66.83, 67.55, 68.68, 72.81, 76.57, 75.28, 84, 76.69, 77.04, 78.55, 77.78, 74.65, 68.35, 66.68, 66.8, 71.94, 74.49, 73.51, 73.85, 84.8, 98.62, 99.48, 98.29, 79.07, 80.25, 89.86, 89.58, 84.96, 81.44, 77.81, 76.16, 74.22, 79.6, 84.05, 77.99, 78.55, 90.34, 92.03, 96.36, 111.7, 111.27, 120.3, 111.76, 110.22, 121] },
      velocityScore: { '1D': -4, '1W': 11.6, '1M': 14.3, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 12, eps: -0.23, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: 1.31, PRN: false, RSHO: false, IDEF: 1.07, BILT: false },
      tonyNote: 'Mercury Systems, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, avgWeight: 1.16, proScore: 0.46, coverage: 0.4,
      price: 53.83, weeklyPrices: [49.92, 54.93, 56.37, 53.36, 53.83], weeklyChange: 7.82, dayChange: 0.83, sortRank: 0, periodReturns: { '1M': 8.4, 'YTD': -26.4, '6M': -41.3, '1Y': 19 },
      priceHistory: { '1D': [53.38, 54.4, 54.03, 53.83], '1W': [49.92, 54.93, 56.37, 53.36, 53.83], '1M': [49.64, 48.37, 45.87, 49.58, 47.83, 48.27, 51.7, 52.03, 50.37, 47.7, 46.38, 44.84, 46.27, 46.42, 47.1, 49.92, 54.93, 56.37, 53.36, 53.83], 'YTD': [73.17, 101.28, 109.49, 108.22, 103.8, 95.36, 75.79, 83.6, 91.11, 102.79, 104.06, 101.84, 80.05, 87.75, 92.73, 82.11, 65.98, 63.19, 67.28, 65.3, 57.5, 49.44, 47.83, 47.7, 47.1, 53.83], '6M': [91.72, 108.01, 111.61, 110.93, 89.78, 78.71, 81.62, 88.31, 97.14, 98.98, 105.95, 86.01, 85.83, 82.52, 83.58, 70.22, 65.73, 60.84, 62.77, 65.3, 57.5, 49.44, 47.83, 47.7, 47.1, 53.83], '1Y': [45.24, 49.41, 56.22, 50.29, 51.41, 46.7, 51.78, 52.24, 53.41, 62.36, 63.8, 67.23, 71.35, 74.22, 79.07, 78.25, 83.87, 87.04, 72.31, 58.28, 60.07, 63.71, 66.06, 68.06, 78.87, 74.62, 91.72, 108.01, 111.61, 110.93, 89.78, 78.71, 88.46, 88.31, 97.14, 98.98, 105.95, 86.01, 85.83, 82.52, 83.58, 70.22, 65.73, 60.84, 62.77, 65.3, 57.5, 49.44, 47.83, 47.7, 47.1, 53.83] },
      velocityScore: { '1D': -6.1, '1W': 15, '1M': 0, '6M': null }, isNew: false,
      marketCap: '$7B', pe: 234, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 2.11, PRN: false, RSHO: false, IDEF: 0.2, BILT: false },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RBC', name: 'RBC Bearings Incorporated', easyScore: 2, avgWeight: 1.16, proScore: 0.46, coverage: 0.4,
      price: 597.24, weeklyPrices: [644.06, 620.47, 604.56, 609.60, 597.24], weeklyChange: -7.27, dayChange: -2.01, sortRank: 0, periodReturns: { '1M': 1.1, 'YTD': 33.2, '6M': 27.8, '1Y': 54.3 },
      priceHistory: { '1D': [609.51, 603.52, 604.45, 597.24], '1W': [644.06, 620.47, 604.56, 609.6, 597.24], '1M': [590.97, 592.41, 576.74, 607.46, 603.64, 616.95, 621.08, 625.73, 639.18, 645.73, 633.44, 638.94, 648.89, 630.36, 634.78, 644.06, 620.47, 604.56, 609.6, 597.24], 'YTD': [448.43, 485, 497.06, 504.07, 499.67, 544.02, 552.44, 571.57, 568.58, 560.28, 544.55, 552.23, 543.12, 580.55, 586.98, 588.74, 584.49, 623.19, 618.91, 566.96, 571.96, 590.09, 603.64, 645.73, 634.78, 597.24], '6M': [467.37, 489.33, 504.99, 511.98, 520.16, 550.4, 559.18, 576.5, 566.06, 547.31, 540.83, 548.95, 548.11, 598.3, 589.77, 589.51, 595.76, 605.99, 569.06, 566.96, 571.96, 590.09, 603.64, 645.73, 634.78, 597.24], '1Y': [386.98, 376.71, 391.98, 385.62, 405.98, 396.84, 398.93, 401.56, 389.96, 381.97, 382.27, 383.5, 384.3, 374.45, 380.76, 387.73, 411.08, 428.4, 441.04, 429.28, 426.16, 441.76, 443.51, 462.59, 459.83, 452.89, 467.37, 489.33, 504.99, 511.98, 520.16, 550.4, 551.42, 576.5, 566.06, 547.31, 540.83, 548.95, 548.11, 598.3, 589.77, 589.51, 595.76, 605.99, 569.06, 566.96, 571.96, 590.09, 603.64, 645.73, 634.78, 597.24] },
      velocityScore: { '1D': 0, '1W': -2.1, '1M': -20.7, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 65.8, revenueGrowth: 18, eps: 9.08, grossMargin: 45, dividendYield: null,
      etfPresence: { AIRR: 1.84, PRN: false, RSHO: false, IDEF: 0.47, BILT: false },
      tonyNote: 'RBC Bearings Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DRS', name: 'Leonardo DRS, Inc.', easyScore: 2, avgWeight: 0.57, proScore: 0.23, coverage: 0.4,
      price: 45.66, weeklyPrices: [42.67, 42.69, 43.72, 45.37, 45.66], weeklyChange: 7.02, dayChange: 0.65, sortRank: 0, periodReturns: { '1M': -1.9, 'YTD': 34, '6M': 22.8, '1Y': -3.2 },
      priceHistory: { '1D': [45.37, 45.66, 45.66, 45.66], '1W': [42.67, 42.69, 43.72, 45.37, 45.66], '1M': [46.55, 47.35, 46.11, 49.69, 48.53, 46.68, 45.59, 46.58, 46.08, 44.99, 45.74, 44.69, 44.36, 42.48, 40.95, 42.67, 42.69, 43.72, 45.37, 45.66], 'YTD': [34.09, 38.84, 42.26, 40.99, 41.06, 38.93, 38.13, 43.82, 45.51, 46.35, 45.6, 44.06, 44.52, 47.93, 46.29, 42.07, 39.47, 41.79, 42.5, 44.55, 48.76, 46.15, 48.53, 44.99, 40.95, 45.66], '6M': [37.2, 41.42, 41.28, 41.3, 37.27, 37.77, 40.03, 43.34, 45.82, 45.91, 45.48, 46.53, 46.3, 46.06, 44.57, 39.98, 40.03, 41.36, 41.5, 44.55, 48.76, 46.15, 48.53, 44.99, 40.95, 45.66], '1Y': [47.16, 47.97, 46.79, 48.08, 42.25, 41.58, 42.73, 41.19, 41.66, 41.05, 42.02, 42.88, 43.76, 45.29, 43.67, 39.91, 41.31, 36.62, 35.61, 34.28, 33.24, 33.24, 33.92, 33.68, 34.77, 34.09, 37.2, 41.42, 41.28, 41.3, 37.27, 37.77, 41.07, 43.34, 45.82, 45.91, 45.48, 46.53, 46.3, 46.06, 44.57, 39.98, 40.03, 41.36, 41.5, 44.55, 48.76, 46.15, 48.53, 44.99, 40.95, 45.66] },
      velocityScore: { '1D': 4.5, '1W': 9.5, '1M': 0, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 42.7, revenueGrowth: 6, eps: 1.07, grossMargin: 24, dividendYield: 0.79,
      etfPresence: { AIRR: 0.86, PRN: false, RSHO: false, IDEF: 0.29, BILT: false },
      tonyNote: 'Leonardo DRS, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TPC', name: 'Tutor Perini Corporation', easyScore: 2, avgWeight: 0.38, proScore: 0.15, coverage: 0.4,
      price: 77.33, weeklyPrices: [82.97, 79.51, 76.75, 79.91, 77.33], weeklyChange: -6.8, dayChange: -3.13, sortRank: 0, periodReturns: { '1M': 7.2, 'YTD': 15.4, '6M': 8.8, '1Y': 61.1 },
      priceHistory: { '1D': [79.83, 78, 77.33], '1W': [82.97, 79.51, 76.75, 79.91, 77.33], '1M': [72.13, 71.48, 68.72, 73.61, 74.92, 76.55, 76.19, 77.89, 77.99, 81.5, 81, 82.36, 81.56, 79.53, 81.88, 82.97, 79.51, 76.75, 79.91, 77.33], 'YTD': [67.02, 70.17, 75.17, 76.01, 78.89, 83.48, 82.74, 85.87, 69.95, 71.29, 71.44, 75.25, 77.19, 80.54, 86.25, 84.19, 86.04, 96.98, 80.64, 74.88, 71.49, 70.53, 74.92, 81.5, 81.88, 77.33], '6M': [71.09, 73.89, 76.79, 79.86, 79.95, 81.73, 86.9, 89.38, 71.12, 69.2, 72.31, 76.24, 77.3, 83.35, 84.22, 86.76, 93.68, 82.85, 79.49, 74.88, 71.49, 70.53, 74.92, 81.5, 81.88, 77.33], '1Y': [47.99, 49.51, 48.97, 47.63, 46.18, 56.6, 57.44, 58.43, 58.94, 61.83, 64.22, 66.81, 65.43, 62.84, 62.26, 67.11, 68.72, 68.21, 63.97, 58.76, 60.94, 66.43, 68.6, 67.81, 69.57, 67.92, 71.09, 73.89, 76.79, 79.86, 79.95, 81.73, 84.9, 89.38, 71.12, 69.2, 72.31, 76.24, 77.3, 83.35, 84.22, 86.76, 93.68, 82.85, 79.49, 74.88, 71.49, 70.53, 74.92, 81.5, 81.88, 77.33] },
      velocityScore: { '1D': 7.1, '1W': 0, '1M': 15.4, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 53, revenueGrowth: 12, eps: 1.46, grossMargin: 12, dividendYield: 0.3,
      etfPresence: { AIRR: 0.72, PRN: false, RSHO: false, IDEF: 0.03, BILT: false },
      tonyNote: 'Tutor Perini Corporation appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TKR', name: 'TIMKEN CO/THE', easyScore: 1, avgWeight: 8.69, proScore: 1.74, coverage: 0.2,
      price: 139.51, weeklyPrices: [145.32, 141.75, 139.16, 142.36, 139.51], weeklyChange: -4, dayChange: -2.04, sortRank: 0, periodReturns: { '1M': 3.6, 'YTD': 65.8, '6M': 58.4, '1Y': 84.7 },
      priceHistory: { '1D': [142.42, 139.23, 139.11, 139.51], '1W': [145.32, 141.75, 139.16, 142.36, 139.51], '1M': [134.67, 137.09, 132.39, 137.4, 137.06, 139.12, 140.28, 139.4, 142.36, 141.97, 137.64, 137.99, 144.01, 141.22, 143.5, 145.32, 141.75, 139.16, 142.36, 139.51], 'YTD': [84.13, 90.6, 93.73, 93.94, 93.19, 106.04, 107.84, 109.52, 106.58, 102.18, 98.59, 101.03, 100.57, 105.88, 103.73, 106.79, 106.53, 119.7, 115.74, 118.93, 127.98, 131.83, 137.06, 141.97, 143.5, 139.51], '6M': [88.05, 91.91, 94.6, 94.15, 102.15, 107.35, 108.16, 109.88, 103.05, 99.7, 97.44, 99.06, 98.92, 106.75, 107.66, 107.2, 109, 117.97, 114.49, 118.93, 127.98, 131.83, 137.06, 141.97, 143.5, 139.51], '1Y': [75.52, 77.3, 78.63, 81.69, 73.94, 74.15, 76.69, 78.99, 77.23, 77.15, 77.38, 76.84, 75.23, 76.76, 72.55, 75.1, 77.3, 77.95, 78.9, 74.42, 77.48, 79.95, 83.44, 87.01, 86.34, 85.81, 88.05, 91.91, 94.6, 94.15, 102.15, 107.35, 107.11, 109.88, 103.05, 99.7, 97.44, 99.06, 98.92, 106.75, 107.66, 107.2, 109, 117.97, 114.49, 118.93, 127.98, 131.83, 137.06, 141.97, 143.5, 139.51] },
      velocityScore: { '1D': 0, '1W': 0, '1M': -2.8, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 31.7, revenueGrowth: 8, eps: 4.4, grossMargin: 31, dividendYield: 1.01,
      etfPresence: { AIRR: false, PRN: false, RSHO: 8.69, IDEF: false, BILT: false },
      tonyNote: 'TIMKEN CO/THE appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 4.17, proScore: 4.17, coverage: 1,
      price: 202, weeklyPrices: [276.17, 229.18, 215.62, 213.02, 202.00], weeklyChange: -26.85, dayChange: -5.17, sortRank: 0, periodReturns: { '1M': -7.3, 'YTD': 141.3, '6M': 110, '1Y': 322.3 },
      priceHistory: { '1D': [213.02, 201.29, 201.32, 202], '1W': [276.17, 229.18, 215.62, 213.02, 202], '1M': [218, 220.12, 211.69, 222.24, 232.36, 260.07, 265.1, 280.91, 286.69, 283.61, 275.25, 259.66, 256.63, 240.3, 261.15, 276.17, 229.18, 215.62, 213.02, 202], 'YTD': [83.71, 97.3, 103.89, 94.5, 85.19, 86.1, 98.01, 102.58, 86.8, 96.43, 116.33, 114.91, 103.76, 125, 166.77, 156.14, 141.19, 195.09, 207.27, 219.93, 231.09, 227.81, 232.36, 283.61, 261.15, 202], '6M': [96.21, 101.98, 96.85, 94.91, 73.87, 89.73, 97.92, 104.88, 95.65, 108.04, 121.52, 105.97, 108.82, 144.97, 157.14, 147.16, 154.49, 177.05, 219.94, 219.93, 231.09, 227.81, 232.36, 283.61, 261.15, 202], '1Y': [47.84, 51.95, 52.37, 52.75, 54.17, 70.24, 72.54, 68.98, 68.32, 64.06, 90.96, 106.6, 110.22, 124.94, 135.46, 109, 125.43, 120.47, 109.95, 85.98, 83.26, 100.15, 100.33, 81.14, 93.23, 85.17, 96.21, 101.98, 96.85, 94.91, 73.87, 89.73, 107.61, 104.88, 95.65, 108.04, 121.52, 105.97, 108.82, 144.97, 157.14, 147.16, 154.49, 177.05, 219.94, 219.93, 231.09, 227.81, 232.36, 283.61, 261.15, 202] },
      velocityScore: { '1D': -1.7, '1W': -3.7, '1M': -10.5, '6M': null }, isNew: false,
      marketCap: '$51B', pe: 77.7, revenueGrowth: 684, eps: 2.6, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 2.96, MEME: 6.15, RKNG: 3.41 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 4.79, proScore: 3.2, coverage: 0.667,
      price: 1592.77, weeklyPrices: [2273.73, 2032.22, 1745.00, 1744.43, 1592.77], weeklyChange: -29.95, dayChange: -8.69, sortRank: 0, periodReturns: { '1M': -3, 'YTD': 571, '6M': 350.5, '1Y': 3422.3 },
      priceHistory: { '1D': [1744.43, 1603.09, 1592.22, 1592.77], '1W': [2273.73, 2032.22, 1745, 1744.43, 1592.77], '1M': [1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 1745, 1744.43, 1592.77], 'YTD': [237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 638.52, 565.41, 618.89, 720.17, 702.48, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1447.23, 1542.24, 1694.98, 1559.32, 1980.1, 2273.73, 2050.39, 1592.77], '6M': [353.56, 387.81, 503.44, 539.3, 576.2, 630.29, 649.97, 651.9, 565.59, 618.82, 772.09, 603.17, 701.59, 851.77, 920.99, 989.9, 1187, 1562.34, 1407.61, 1542.24, 1694.98, 1559.32, 1980.1, 2273.73, 2050.39, 1592.77], '1Y': [45.22, 42.48, 41.61, 41.89, 42.51, 43.37, 45.52, 46.37, 52.47, 70.5, 90.09, 102.92, 113.5, 121.17, 134.61, 148.04, 176.49, 207.01, 267.95, 265.88, 200.27, 210.17, 225.47, 201.87, 241.05, 240.22, 353.56, 387.81, 503.44, 539.3, 576.2, 630.29, 621.09, 651.9, 565.59, 618.82, 772.09, 603.17, 701.59, 851.77, 920.99, 989.9, 1187, 1562.34, 1407.61, 1542.24, 1694.98, 1559.32, 1980.1, 2273.73, 2050.39, 1592.77] },
      velocityScore: { '1D': -0.9, '1W': 7, '1M': -14, '6M': null }, isNew: false,
      marketCap: '$236B', pe: 54.3, revenueGrowth: 251, eps: 29.31, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6, RKNG: 3.59 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 2, avgWeight: 4.54, proScore: 3.03, coverage: 0.667,
      price: 536.5, weeklyPrices: [638.72, 598.37, 539.00, 577.46, 536.50], weeklyChange: -16, dayChange: -7.09, sortRank: 0, periodReturns: { '1M': 1.8, 'YTD': 211.4, '6M': 168.4, '1Y': 722.6 },
      priceHistory: { '1D': [577.46, 538.01, 537.93, 536.5], '1W': [638.72, 598.37, 539, 577.46, 536.5], '1M': [526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539, 577.46, 536.5], 'YTD': [172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 270.57, 250.61, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 486.46, 531.21, 511.72, 562.93, 732.62, 651.88, 536.5], '6M': [199.88, 215, 243.29, 278.41, 260.19, 284.1, 285.52, 282.25, 259.03, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 431.52, 480, 482.02, 486.46, 531.21, 511.72, 562.93, 732.62, 651.88, 536.5], '1Y': [65.22, 66.93, 68.74, 68.99, 77.29, 74.64, 76.29, 76.97, 80.34, 93.29, 102.39, 112.41, 116.74, 125.28, 118.86, 121.53, 126.67, 158.02, 174.22, 162.45, 139.19, 163.54, 169.78, 172.04, 176.76, 176.06, 199.88, 215, 243.29, 278.41, 260.19, 284.1, 284.67, 282.25, 259.03, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 431.52, 480, 482.02, 486.46, 531.21, 511.72, 562.93, 732.62, 651.88, 536.5] },
      velocityScore: { '1D': 3.1, '1W': -0.3, '1M': 95.5, '6M': null }, isNew: false,
      marketCap: '$185B', pe: 32.1, revenueGrowth: 46, eps: 16.69, grossMargin: 45, dividendYield: 0.1,
      etfPresence: { BUZZ: false, MEME: 5.39, RKNG: 3.7 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'WULF', name: 'WULF', easyScore: 2, avgWeight: 4.39, proScore: 2.93, coverage: 0.667,
      price: 21.35, weeklyPrices: [24.70, 23.58, 21.18, 22.21, 21.35], weeklyChange: -13.56, dayChange: -3.87, sortRank: 0, periodReturns: { '1M': -17.4, 'YTD': 85.8, '6M': 70.9, '1Y': 344.8 },
      priceHistory: { '1D': [22.21, 21.25, 21.28, 21.35], '1W': [24.7, 23.58, 21.18, 22.21, 21.35], '1M': [25.86, 25.3, 23.19, 25.35, 26.06, 28.17, 28.01, 27.86, 28.98, 28.31, 28.78, 26.97, 26.06, 25.83, 25.58, 24.7, 23.58, 21.18, 22.21, 21.35], 'YTD': [11.49, 12.84, 13.83, 14.12, 13.37, 14.29, 16.26, 17.56, 14.74, 14.35, 16.04, 16.22, 14.43, 18.05, 19.67, 20.55, 20.02, 25.74, 23.12, 22.92, 25.56, 24, 26.06, 28.31, 25.58, 21.35], '6M': [12.49, 14.21, 12.89, 14.54, 11.92, 15.91, 15.01, 17.88, 15.23, 14.67, 15.74, 15.35, 14.88, 18.87, 20.64, 20.01, 21.31, 23.39, 22.32, 22.92, 25.56, 24, 26.06, 28.31, 25.58, 21.35], '1Y': [4.8, 5.11, 4.99, 5.1, 4.89, 5.4, 9.38, 9.16, 9.45, 9.2, 10.49, 11.49, 11.6, 11.97, 14, 13.85, 13.64, 16.1, 14.3, 11.05, 11.29, 15.3, 14.96, 12.49, 12.47, 11.15, 12.49, 14.21, 12.89, 14.54, 11.92, 15.91, 15.47, 17.88, 15.23, 14.67, 15.74, 15.35, 14.88, 18.87, 20.64, 20.01, 21.31, 23.39, 22.32, 22.92, 25.56, 24, 26.06, 28.31, 25.58, 21.35] },
      velocityScore: { '1D': 2.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: null, revenueGrowth: -1, eps: -2.51, grossMargin: 64, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.65, RKNG: 3.13 },
      tonyNote: 'WULF appears in 2 of 3 Meme ETFs (67% coverage) with average weight 4.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 2, avgWeight: 4.34, proScore: 2.89, coverage: 0.667,
      price: 41.99, weeklyPrices: [45.73, 43.32, 38.82, 43.91, 41.99], weeklyChange: -8.18, dayChange: -4.37, sortRank: 0, periodReturns: { '1M': -29.1, 'YTD': 11.2, '6M': -3.7, '1Y': 147.7 },
      priceHistory: { '1D': [43.91, 41.96, 41.78, 41.99], '1W': [45.73, 43.32, 38.82, 43.91, 41.99], '1M': [59.19, 54.02, 51.52, 56.71, 59.77, 60.85, 59.18, 58.11, 59.96, 56.87, 54.72, 50.3, 47.74, 47.21, 45.91, 45.73, 43.32, 38.82, 43.91, 41.99], 'YTD': [37.77, 45.68, 51.89, 56.68, 53.74, 41.83, 42.22, 45.45, 38.85, 38.12, 42.96, 41.12, 34.28, 36.83, 48.82, 48.39, 42.86, 60.98, 55.17, 58.06, 63.54, 54.35, 59.77, 56.87, 45.91, 41.99], '6M': [43.63, 52.88, 52.26, 59.84, 39.79, 40.03, 39.98, 44.24, 40.13, 41.37, 41.66, 37.45, 34.77, 39.32, 48.12, 50.64, 45.66, 61.2, 52.94, 58.06, 63.54, 54.35, 59.77, 56.87, 45.91, 41.99], '1Y': [16.95, 17.28, 18.15, 16.58, 16.48, 17.97, 20.7, 21.43, 26.48, 26.19, 37.14, 41.9, 45.93, 57.75, 64.14, 59.22, 64.99, 67.75, 60.17, 47.41, 42.26, 48.49, 46.34, 35.48, 42.04, 38.3, 43.63, 52.88, 52.26, 59.84, 39.79, 40.03, 43.29, 44.24, 40.13, 41.37, 41.66, 37.45, 34.77, 39.32, 48.12, 50.64, 45.66, 61.2, 52.94, 58.06, 63.54, 54.35, 59.77, 56.87, 45.91, 41.99] },
      velocityScore: { '1D': 8.2, '1W': 18, '1M': 1.8, '6M': null }, isNew: false,
      marketCap: '$15B', pe: 54.5, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 2.09, MEME: 6.59, RKNG: false },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'LITE', name: 'LITE', easyScore: 2, avgWeight: 4.02, proScore: 2.68, coverage: 0.667,
      price: 701.71, weeklyPrices: [858.06, 801.16, 728.32, 731.25, 701.71], weeklyChange: -18.22, dayChange: -4.04, sortRank: 0, periodReturns: { '1M': -21.6, 'YTD': 90.4, '6M': 78.6, '1Y': 670.4 },
      priceHistory: { '1D': [731.25, 706, 701.71], '1W': [858.06, 801.16, 728.32, 731.25, 701.71], '1M': [895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93, 827.92, 842.53, 861.97, 816.98, 851.4, 858.06, 801.16, 728.32, 731.25, 701.71], 'YTD': [368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 688.27, 694.43, 672, 649.56, 801.99, 702.76, 896.02, 824.01, 873.6, 858.32, 944.28, 1030.37, 964.5, 854.96, 863.66, 921.56, 893.93, 851.4, 701.71], '6M': [392.88, 331.62, 354.49, 381.44, 504.42, 583.46, 667.77, 677, 650.82, 616.09, 772.13, 688.8, 826.88, 897.3, 894.07, 881.64, 949.93, 903.8, 970.7, 964.5, 854.96, 863.66, 921.56, 893.93, 851.4, 701.71], '1Y': [91.08, 92.24, 103.84, 107.17, 111.13, 115.03, 118.98, 119.34, 132.81, 149.4, 168.77, 164.71, 162.58, 160.6, 160.56, 161, 193.8, 199.58, 259.89, 242.07, 255.59, 317.93, 342.56, 334.69, 389.88, 371.18, 392.88, 331.62, 354.49, 381.44, 504.42, 583.46, 635.64, 677, 650.82, 616.09, 772.13, 688.8, 826.88, 897.3, 894.07, 881.64, 949.93, 903.8, 970.7, 964.5, 854.96, 863.66, 921.56, 893.93, 851.4, 701.71] },
      velocityScore: { '1D': -0.7, '1W': 3.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$55B', pe: 123.1, revenueGrowth: 90, eps: 5.7, grossMargin: 41, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.09, RKNG: 2.95 },
      tonyNote: 'LITE appears in 2 of 3 Meme ETFs (67% coverage) with average weight 4.0% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MRVL', easyScore: 2, avgWeight: 3.61, proScore: 2.41, coverage: 0.667,
      price: 231.01, weeklyPrices: [297.89, 272.05, 245.29, 249.27, 231.01], weeklyChange: -22.45, dayChange: -7.32, sortRank: 0, periodReturns: { '1M': -20, 'YTD': 171.8, '6M': 172.9, '1Y': 222.9 },
      priceHistory: { '1D': [249.27, 232.8, 231.01], '1W': [297.89, 272.05, 245.29, 249.27, 231.01], '1M': [288.85, 266.88, 252.59, 280.71, 279.7, 308.88, 278.67, 289.54, 310.58, 307.86, 279.04, 276.7, 281.26, 266.77, 277.75, 297.89, 272.05, 245.29, 249.27, 231.01], 'YTD': [84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 78.39, 77.51, 93.3, 90.79, 92.36, 99.05, 114.45, 134.6, 157.32, 156.57, 172.15, 177.95, 190.69, 205, 263.47, 279.7, 307.86, 277.75, 231.01], '6M': [84.64, 81.21, 83.1, 81.34, 74.21, 78.23, 79.48, 79.29, 75.68, 87.67, 89.53, 97.68, 107.11, 128.49, 139.69, 164.31, 164.95, 170.13, 176.89, 190.69, 205, 263.47, 279.7, 307.86, 277.75, 231.01], '1Y': [71.55, 72.51, 73.06, 75.91, 76.53, 77.28, 76.74, 73, 62.87, 66, 67.43, 75.53, 82.39, 88.92, 89.39, 85.84, 88.71, 90.37, 93.23, 83.45, 77.45, 91.1, 92, 84.26, 84.8, 86.76, 84.64, 81.21, 83.1, 81.34, 74.21, 78.23, 79.61, 79.29, 75.68, 87.67, 89.53, 97.68, 107.11, 128.49, 139.69, 164.31, 164.95, 170.13, 176.89, 190.69, 205, 263.47, 279.7, 307.86, 277.75, 231.01] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$202B', pe: 79.1, revenueGrowth: 28, eps: 2.92, grossMargin: 52, dividendYield: 0.1,
      etfPresence: { BUZZ: 2.67, MEME: 4.55, RKNG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'AMD', name: 'AMD', easyScore: 2, avgWeight: 3.45, proScore: 2.3, coverage: 0.667,
      price: 511.8, weeklyPrices: [580.91, 540.88, 517.82, 552.05, 511.80], weeklyChange: -11.9, dayChange: -7.29, sortRank: 0, periodReturns: { '1M': 4.4, 'YTD': 139, '6M': 143.7, '1Y': 279.7 },
      priceHistory: { '1D': [552.05, 511.04, 511.8], '1W': [580.91, 540.88, 517.82, 552.05, 511.8], '1M': [490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 511.8], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 449.59, 516.1, 466.38, 511.57, 551.63, 539.49, 511.8], '6M': [210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 203.68, 199.45, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 449.59, 516.1, 466.38, 511.57, 551.63, 539.49, 511.8], '1Y': [134.8, 146.24, 157, 173.66, 176.78, 172.28, 176.14, 167.76, 162.63, 151.41, 161.16, 159.79, 161.36, 203.71, 216.42, 240.56, 259.67, 259.65, 243.98, 240.52, 203.78, 219.76, 221.11, 207.58, 214.95, 215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 203.37, 203.68, 199.45, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 449.59, 516.1, 466.38, 511.57, 551.63, 539.49, 511.8] },
      velocityScore: { '1D': 0, '1W': 0.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$835B', pe: 171.7, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { BUZZ: 3.23, MEME: false, RKNG: 3.66 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 2, avgWeight: 3.32, proScore: 2.21, coverage: 0.667,
      price: 916.69, weeklyPrices: [1154.29, 1032.28, 975.56, 984.75, 916.69], weeklyChange: -20.58, dayChange: -6.91, sortRank: 0, periodReturns: { '1M': -3.4, 'YTD': 221.2, '6M': 170, '1Y': 664.4 },
      priceHistory: { '1D': [984.75, 916.98, 916.69], '1W': [1154.29, 1032.28, 975.56, 984.75, 916.69], '1M': [949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 916.69], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 762.1, 971, 864.01, 981.61, 1211.38, 1145.28, 916.69], '6M': [339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 415.56, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 762.1, 971, 864.01, 981.61, 1211.38, 1145.28, 916.69], '1Y': [119.92, 118.61, 113.23, 111.25, 107.77, 123.72, 123.55, 117.68, 119.01, 131.46, 157.77, 164.62, 163.9, 190.96, 192.77, 206.77, 220.1, 234.7, 253.3, 241.95, 207.37, 240.46, 246.92, 237.5, 276.59, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 417.35, 415.56, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 762.1, 971, 864.01, 981.61, 1211.38, 1145.28, 916.69] },
      velocityScore: { '1D': 0, '1W': -37.9, '1M': -25.3, '6M': null }, isNew: false,
      marketCap: '$1.0T', pe: 20.7, revenueGrowth: 346, eps: 44.22, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { BUZZ: 2.99, MEME: false, RKNG: 3.65 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'INTC', name: 'INTC', easyScore: 2, avgWeight: 3.17, proScore: 2.12, coverage: 0.667,
      price: 111.87, weeklyPrices: [139.63, 127.02, 120.35, 122.20, 111.87], weeklyChange: -19.88, dayChange: -8.45, sortRank: 0, periodReturns: { '1M': 1.5, 'YTD': 203.2, '6M': 162.4, '1Y': 408.5 },
      priceHistory: { '1D': [122.2, 112.08, 111.93, 111.87], '1W': [139.63, 127.02, 120.35, 122.2, 111.87], '1M': [110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 127.02, 120.35, 122.2, 111.87], 'YTD': [36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 46.12, 43.1, 46.78, 44.06, 44.06, 44.13, 58.95, 64.94, 65.27, 94.75, 113.01, 120.29, 118.5, 114.68, 99.17, 124.57, 140.94, 131.72, 111.87], '6M': [42.63, 48.72, 54.32, 48.66, 48.24, 46.48, 44.11, 45.46, 45.95, 45.25, 46.18, 44.1, 50.38, 62.38, 68.5, 82.54, 99.62, 124.92, 108.77, 118.5, 114.68, 99.17, 124.57, 140.94, 131.72, 111.87], '1Y': [22, 23.3, 23.26, 20.68, 19.5, 20.65, 23.66, 24.8, 24.35, 24.48, 24.77, 28.76, 34.48, 36.59, 37.22, 38.1, 39.54, 39.5, 38.45, 34.71, 34.5, 40.01, 40.3, 37.51, 36.37, 37.3, 42.63, 48.72, 54.32, 48.66, 48.24, 46.48, 44.62, 45.46, 45.95, 45.25, 46.18, 44.1, 50.38, 62.38, 68.5, 82.54, 99.62, 124.92, 108.77, 118.5, 114.68, 99.17, 124.57, 140.94, 131.72, 111.87] },
      velocityScore: { '1D': 0, '1W': -4.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$562B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 2.81, MEME: false, RKNG: 3.54 },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab', easyScore: 2, avgWeight: 2.65, proScore: 1.76, coverage: 0.667,
      price: 88.44, weeklyPrices: [101.65, 100.07, 100.46, 93.09, 88.44], weeklyChange: -13, dayChange: -5, sortRank: 0, periodReturns: { '1M': -22.2, 'YTD': 26.8, '6M': 5.2, '1Y': 127.5 },
      priceHistory: { '1D': [93.09, 87.88, 87.43, 88.44], '1W': [101.65, 100.07, 100.46, 93.09, 88.44], '1M': [113.65, 108.23, 105.05, 114.78, 102.39, 109.25, 104.63, 107.98, 107.24, 100.29, 95.12, 85.41, 80.69, 84.54, 98.01, 101.65, 100.07, 100.46, 93.09, 88.44], 'YTD': [69.76, 83.08, 90.76, 88.9, 80.07, 72.32, 67.44, 69.97, 70.13, 68.93, 78.59, 66.07, 64.22, 69.08, 73.6, 90.04, 77.02, 84.65, 124.15, 125.45, 143.48, 110.08, 102.39, 100.29, 98.01, 88.44], '6M': [84.08, 91.8, 87.98, 85.68, 66.32, 66.01, 70.86, 72.65, 70, 68.37, 71.93, 65.94, 67.73, 68.05, 84.8, 79.68, 78.81, 105.47, 124.77, 125.45, 143.48, 110.08, 102.39, 100.29, 98.01, 88.44], '1Y': [38.88, 43.21, 47.19, 45.11, 44.54, 45.02, 44.97, 44.38, 48.6, 47.73, 54.04, 49.81, 47.01, 58.5, 65.42, 67.35, 65.62, 61.34, 51.9, 43.31, 40.3, 40.37, 51.56, 55.41, 77.55, 70.45, 84.08, 91.8, 87.98, 85.68, 66.32, 66.01, 76.58, 72.65, 70, 68.37, 71.93, 65.94, 67.73, 68.05, 84.8, 79.68, 78.81, 105.47, 124.77, 125.45, 143.48, 110.08, 102.39, 100.29, 98.01, 88.44] },
      velocityScore: { '1D': 0, '1W': -18.1, '1M': -50.8, '6M': null }, isNew: false,
      marketCap: '$55B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 1.9, MEME: false, RKNG: 3.39 },
      tonyNote: 'Rocket Lab is the small-launch and space systems name that Electrification and AI infrastructure ETFs hold for satellite connectivity exposure — relevant to both GPS-dependent grids and low-orbit broadband that supports remote AI compute. Small market cap, no earnings, but consistent revenue growth and a rapidly expanding backlog.',
    },
    {
      ticker: 'GOOGL', name: 'GOOGL', easyScore: 2, avgWeight: 2.52, proScore: 1.68, coverage: 0.667,
      price: 368.42, weeklyPrices: [357.37, 361.21, 359.91, 366.46, 368.42], weeklyChange: 3.09, dayChange: 0.53, sortRank: 0, periodReturns: { '1M': 1.4, 'YTD': 17.7, '6M': 14.4, '1Y': 108.4 },
      priceHistory: { '1D': [366.46, 368.32, 368.42], '1W': [357.37, 361.21, 359.91, 366.46, 368.42], '1M': [363.31, 364.26, 356.38, 357.77, 359.68, 369.35, 373.25, 363.79, 368.03, 349.68, 346.13, 345.29, 343.71, 337.39, 353.65, 357.37, 361.21, 359.91, 366.46, 368.42], 'YTD': [313, 325.44, 332.78, 327.93, 338, 322.86, 305.72, 310.9, 303.58, 307.04, 310.92, 290.44, 287.56, 317.32, 337.12, 339.32, 349.94, 398.04, 402.62, 387.66, 380.34, 368.53, 359.68, 349.68, 353.65, 368.42], '6M': [321.98, 335.84, 330.54, 338.25, 331.25, 309, 314.98, 307.38, 300.88, 303.55, 307.13, 280.92, 295.77, 317.24, 341.68, 344.4, 385.69, 400.8, 396.78, 387.66, 380.34, 368.53, 359.68, 349.68, 353.65, 368.42], '1Y': [176.79, 181.56, 190.1, 192.58, 195.04, 201, 203.5, 206.09, 212.91, 234.04, 251.61, 252.53, 244.05, 250.43, 244.15, 256.55, 269.27, 283.72, 290.1, 285.02, 299.66, 314.89, 313.72, 308.22, 309.78, 313.85, 321.98, 335.84, 330.54, 338.25, 331.25, 309, 302.85, 307.38, 300.88, 303.55, 307.13, 280.92, 295.77, 317.24, 341.68, 344.4, 385.69, 400.8, 396.78, 387.66, 380.34, 368.53, 359.68, 349.68, 353.65, 368.42] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.5T', pe: 28.1, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { BUZZ: 1.58, MEME: false, RKNG: 3.46 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 1, avgWeight: 7.74, proScore: 2.58, coverage: 0.333,
      price: 277.87, weeklyPrices: [302.70, 289.50, 270.89, 295.05, 277.87], weeklyChange: -8.2, dayChange: -5.87, sortRank: 0, periodReturns: { '1M': 9.6, 'YTD': 219.8, '6M': 157.3, '1Y': 1040.7 },
      priceHistory: { '1D': [295.19, 282, 276.73, 277.87], '1W': [302.7, 289.5, 270.89, 295.05, 277.87], '1M': [253.57, 259.61, 234.23, 248.88, 260.22, 274.5, 280.88, 284.99, 328.91, 345.85, 321.98, 326.19, 309.18, 252.02, 275.01, 302.7, 289.5, 270.89, 295.05, 277.87], 'YTD': [86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 166.2, 153.02, 154, 160.05, 145.88, 135.49, 146.78, 213.84, 229.75, 287.97, 285.47, 289.76, 307.88, 285, 263.61, 260.22, 345.85, 275.01, 277.87], '6M': [108, 133.46, 145.63, 156.51, 136.6, 139.03, 147.55, 168.57, 159.99, 157.17, 166.69, 133.52, 135.63, 166.7, 207.86, 231.17, 290.52, 261.03, 275.95, 307.88, 285, 263.61, 260.22, 345.85, 275.01, 277.87], '1Y': [24.36, 25.96, 25.36, 34.78, 36.1, 37.65, 46.5, 48.54, 52.94, 53.44, 67.02, 86.27, 73.6, 86.97, 109.91, 109.06, 108.53, 142.37, 139.23, 107.11, 89.99, 98.93, 111.79, 89.58, 92.26, 87.26, 108, 133.46, 145.63, 156.51, 136.6, 139.03, 159, 168.57, 159.99, 157.17, 166.69, 133.52, 135.63, 166.7, 207.86, 231.17, 290.52, 261.03, 275.95, 307.88, 285, 263.61, 260.22, 345.85, 275.01, 277.87] },
      velocityScore: { '1D': 7.1, '1W': -18.4, '1M': -23, '6M': null }, isNew: false,
      marketCap: '$79B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 7.74, RKNG: false },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 1, avgWeight: 7.03, proScore: 2.34, coverage: 0.333,
      price: 119.37, weeklyPrices: [148.16, 139.00, 120.95, 123.36, 119.37], weeklyChange: -19.43, dayChange: -3.23, sortRank: 0, periodReturns: { '1M': -39.3, 'YTD': 242.4, '6M': 213.7, '1Y': 351.5 },
      priceHistory: { '1D': [123.36, 118.55, 118.57, 119.37], '1W': [148.16, 139, 120.95, 123.36, 119.37], '1M': [196.64, 162.88, 175.13, 172.78, 169.05, 191.55, 170.81, 167.34, 161.85, 171.23, 147.44, 146.97, 138.54, 135.69, 150.1, 148.16, 139, 120.95, 123.36, 119.37], 'YTD': [34.86, 33.01, 37, 35.72, 43.61, 44.3, 44.46, 56.27, 95.34, 120.49, 86.33, 113.9, 84.59, 132.7, 142.55, 149.42, 152.83, 178.54, 223.1, 176.81, 158.41, 177, 169.05, 171.23, 150.1, 119.37], '6M': [38.06, 34.47, 38.15, 39.57, 38.13, 43.99, 51.68, 53.69, 101.14, 106.19, 101.92, 97.42, 103.91, 150.6, 159.42, 162.17, 183.51, 148.94, 190.36, 176.81, 158.41, 177, 169.05, 171.23, 150.1, 119.37], '1Y': [26.44, 29.5, 28.23, 25.22, 22.19, 20.86, 26.13, 24.79, 24.2, 23.63, 29.56, 30.54, 25.94, 33.79, 29.1, 34.14, 37.22, 33.04, 25.42, 21.63, 20.58, 26.53, 27.84, 29.9, 39.1, 36.02, 38.06, 34.47, 38.15, 39.57, 38.13, 43.99, 46.98, 53.69, 101.14, 106.19, 101.92, 97.42, 103.91, 150.6, 159.42, 162.17, 183.51, 148.94, 190.36, 176.81, 158.41, 177, 169.05, 171.23, 150.1, 119.37] },
      velocityScore: { '1D': 0, '1W': -27.8, '1M': -36.4, '6M': null }, isNew: false,
      marketCap: '$10B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 7.03, RKNG: false },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'CRDO', name: 'CRDO', easyScore: 1, avgWeight: 5.72, proScore: 1.91, coverage: 0.333,
      price: 245.61, weeklyPrices: [271.95, 259.09, 241.91, 265.55, 245.61], weeklyChange: -9.69, dayChange: -7.51, sortRank: 0, periodReturns: { '1M': 10.5, 'YTD': 70.7, '6M': 74.2, '1Y': 164.9 },
      priceHistory: { '1D': [265.55, 247.43, 245.74, 245.61], '1W': [271.95, 259.09, 241.91, 265.55, 245.61], '1M': [222.27, 234.32, 237.68, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.09, 241.91, 265.55, 245.61], 'YTD': [143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 120.83, 97.3, 112.33, 104.06, 100.3, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 189.36, 193.39, 236.03, 206.89, 250.81, 302.52, 245.68, 245.61], '6M': [141, 156.84, 135.1, 129.47, 98.06, 121.78, 124.06, 114.48, 114.74, 111.57, 107.09, 96.44, 101.45, 119.59, 160.69, 195.04, 184.38, 188.51, 172.17, 193.39, 236.03, 206.89, 250.81, 302.52, 245.68, 245.61], '1Y': [92.73, 98.7, 95.74, 107.95, 114.7, 118.57, 118.74, 114.04, 123.06, 147.53, 163.98, 164.1, 146.01, 147.42, 149.9, 151.66, 154.96, 180.64, 170.16, 145.58, 133.49, 171.13, 178.94, 142.02, 149.94, 144.92, 141, 156.84, 135.1, 129.47, 98.06, 121.78, 130.66, 114.48, 114.74, 111.57, 107.09, 96.44, 101.45, 119.59, 160.69, 195.04, 184.38, 188.51, 172.17, 193.39, 236.03, 206.89, 250.81, 302.52, 245.68, 245.61] },
      velocityScore: { '1D': 7.9, '1W': null, '1M': -23.9, '6M': null }, isNew: false,
      marketCap: '$46B', pe: 97.5, revenueGrowth: 157, eps: 2.52, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.72, RKNG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'ALAB', name: 'ALAB', easyScore: 1, avgWeight: 5.57, proScore: 1.86, coverage: 0.333,
      price: 397.55, weeklyPrices: [483.02, 430.86, 406.42, 432.74, 397.55], weeklyChange: -17.69, dayChange: -8.13, sortRank: 0, periodReturns: { '1M': 14.8, 'YTD': 139, '6M': 139.8, '1Y': 343.6 },
      priceHistory: { '1D': [432.74, 401.93, 397.55], '1W': [483.02, 430.86, 406.42, 432.74, 397.55], '1M': [346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86, 406.42, 432.74, 397.55], 'YTD': [166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.4, 109.8, 116.48, 127.57, 121.76, 109.6, 125.46, 172.09, 194.06, 196.85, 213.91, 224.09, 297.84, 342.85, 317.06, 367.15, 439.66, 455.96, 397.55], '6M': [165.77, 172.14, 176.35, 160.46, 142.82, 126.58, 129.68, 124.67, 120, 119.9, 126.16, 113.61, 117.14, 149.05, 174.05, 212.84, 202.68, 199.79, 232.68, 297.84, 342.85, 317.06, 367.15, 439.66, 455.96, 397.55], '1Y': [89.62, 90.32, 121.89, 124.05, 137.93, 179.43, 186.43, 179.09, 182.2, 216.1, 231.29, 237.3, 198.8, 220.81, 199.53, 156.31, 170.28, 191.56, 173.74, 141.39, 141.8, 165.19, 175.74, 143.66, 172.62, 170.84, 165.77, 172.14, 176.35, 160.46, 142.82, 126.58, 132.62, 124.67, 120, 119.9, 126.16, 113.61, 117.14, 149.05, 174.05, 212.84, 202.68, 199.79, 232.68, 297.84, 342.85, 317.06, 367.15, 439.66, 455.96, 397.55] },
      velocityScore: { '1D': null, '1W': 44.2, '1M': null, '6M': null }, isNew: true,
      marketCap: '$68B', pe: 270.4, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.57, RKNG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 1, avgWeight: 5.45, proScore: 1.82, coverage: 0.333,
      price: 78, weeklyPrices: [88.86, 86.10, 85.13, 80.64, 78.00], weeklyChange: -12.22, dayChange: -3.27, sortRank: 0, periodReturns: { '1M': -15.3, 'YTD': 7.4, '6M': -9, '1Y': 70.7 },
      priceHistory: { '1D': [80.64, 77.43, 77.56, 78], '1W': [88.86, 86.1, 85.13, 80.64, 78], '1M': [92.06, 88.71, 87.32, 97.56, 82.41, 87.57, 82.25, 85.43, 80.66, 73.19, 72.87, 68.01, 65.62, 71.45, 86.77, 88.86, 86.1, 85.13, 80.64, 78], 'YTD': [72.63, 90.56, 101.25, 113.57, 111.21, 101.79, 82.51, 85.82, 92.68, 87.53, 95.7, 86.98, 82.87, 96.46, 86.91, 84.66, 69.85, 70.68, 74.81, 96.23, 113.41, 93.6, 82.41, 73.19, 86.77, 78], '6M': [85.73, 95.22, 116.37, 122.09, 93.27, 82.22, 80.2, 85.76, 93.86, 87.09, 94.09, 87.86, 92.62, 94.9, 85.53, 76.4, 70.89, 75.05, 83.67, 96.23, 113.41, 93.6, 82.41, 73.19, 86.77, 78], '1Y': [45.69, 47.86, 56.67, 54.22, 51.38, 45.92, 48.16, 47.07, 48.94, 40.77, 40.97, 48.85, 48.84, 72.9, 90.5, 82.81, 79.45, 71.14, 68.7, 56.6, 51.37, 52.61, 74, 67.81, 86.48, 74.68, 85.73, 95.22, 116.37, 122.09, 93.27, 82.22, 86.4, 85.76, 93.86, 87.09, 94.09, 87.86, 92.62, 94.9, 85.53, 76.4, 70.89, 75.05, 83.67, 96.23, 113.41, 93.6, 82.41, 73.19, 86.77, 78] },
      velocityScore: { '1D': -6.7, '1W': -31.8, '1M': -55.3, '6M': null }, isNew: false,
      marketCap: '$30B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.45, RKNG: false },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 1, avgWeight: 5.31, proScore: 1.77, coverage: 0.333,
      price: 32.71, weeklyPrices: [37.30, 35.52, 33.06, 33.50, 32.71], weeklyChange: -12.31, dayChange: -2.36, sortRank: 0, periodReturns: { '1M': -20.1, 'YTD': 33.4, '6M': 10.7, '1Y': 238.6 },
      priceHistory: { '1D': [33.5, 32.6, 32.47, 32.71], '1W': [37.3, 35.52, 33.06, 33.5, 32.71], '1M': [40.94, 41.91, 38.92, 41.47, 42.7, 46.47, 46.27, 45.57, 46.59, 45.2, 45.27, 41.98, 40.95, 39.16, 37.77, 37.3, 35.52, 33.06, 33.5, 32.71], 'YTD': [24.52, 31.94, 35.22, 37.69, 33.88, 34.95, 35.28, 30.66, 26.15, 27.4, 27.51, 26.79, 23.74, 27.79, 30.81, 32.43, 32.69, 44.24, 45.48, 48.02, 47.28, 39.62, 42.7, 45.2, 37.77, 32.71], '6M': [29.56, 36.1, 34.74, 38.07, 27.84, 36.17, 29.04, 28.65, 28.09, 27.48, 26.7, 25.72, 24.56, 26.26, 31.53, 34.98, 33.55, 41.25, 42.56, 48.02, 47.28, 39.62, 42.7, 45.2, 37.77, 32.71], '1Y': [9.66, 9.52, 11.09, 10.58, 13.95, 14.03, 16.34, 16.05, 15.98, 13.91, 19.35, 24.45, 22.15, 27.71, 34.24, 35.9, 34.35, 32.87, 31.44, 22.93, 21.09, 28.21, 32.11, 22.98, 27.78, 24.08, 29.56, 36.1, 34.74, 38.07, 27.84, 36.17, 31.53, 28.65, 28.09, 27.48, 26.7, 25.72, 24.56, 26.26, 31.53, 34.98, 33.55, 41.25, 42.56, 48.02, 47.28, 39.62, 42.7, 45.2, 37.77, 32.71] },
      velocityScore: { '1D': -0.6, '1W': -44.7, '1M': -51.6, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.31, RKNG: false },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 1, avgWeight: 5.3, proScore: 1.77, coverage: 0.333,
      price: 46.79, weeklyPrices: [53.26, 51.40, 49.12, 48.87, 46.79], weeklyChange: -12.15, dayChange: -4.25, sortRank: 0, periodReturns: { '1M': -25.5, 'YTD': 4.3, '6M': -6, '1Y': 3.5 },
      priceHistory: { '1D': [48.87, 46.77, 46.6, 46.79], '1W': [53.26, 51.4, 49.12, 48.87, 46.79], '1M': [62.8, 56.69, 56.63, 57.99, 57.85, 61.18, 56.06, 54.69, 56.55, 58.32, 57.85, 53.6, 50.56, 49.31, 53.88, 53.26, 51.4, 49.12, 48.87, 46.79], 'YTD': [44.87, 50.45, 47.56, 47.25, 39.98, 34.99, 34.11, 31.62, 37.05, 35.12, 33.31, 32.7, 28.83, 28.99, 43.25, 47.36, 42.11, 52.57, 55.26, 58.89, 72.07, 56.78, 57.85, 58.32, 53.88, 46.79], '6M': [49.78, 50.88, 49.33, 43.24, 30.43, 31.3, 31.9, 40.88, 36.02, 33.03, 31.9, 29.84, 29.3, 28.79, 46.09, 42.69, 46.2, 49.24, 51.95, 58.89, 72.07, 56.78, 57.85, 58.32, 53.88, 46.79], '1Y': [45.2, 42.41, 44.43, 42.34, 39.86, 44.94, 40.23, 39.78, 42.74, 41.01, 59.11, 71.94, 64.26, 78.99, 82.09, 59.94, 62.8, 58.4, 55.37, 47.79, 41.71, 47.12, 54.36, 46.07, 53.86, 45.31, 49.78, 50.88, 49.33, 43.24, 30.43, 31.3, 33.43, 40.88, 36.02, 33.03, 31.9, 29.84, 29.3, 28.79, 46.09, 42.69, 46.2, 49.24, 51.95, 58.89, 72.07, 56.78, 57.85, 58.32, 53.88, 46.79] },
      velocityScore: { '1D': -2.2, '1W': 10.6, '1M': -23.7, '6M': null }, isNew: false,
      marketCap: '$17B', pe: 120, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.3, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'COHR', name: 'COHR', easyScore: 1, avgWeight: 5.24, proScore: 1.75, coverage: 0.333,
      price: 319.72, weeklyPrices: [394.47, 368.65, 333.36, 335.70, 319.72], weeklyChange: -18.95, dayChange: -4.71, sortRank: 0, periodReturns: { '1M': -20.5, 'YTD': 73.2, '6M': 66.9, '1Y': 263.1 },
      priceHistory: { '1D': [335.54, 316.78, 315.86, 319.72], '1W': [394.47, 368.65, 333.36, 335.7, 319.72], '1M': [401.93, 355.94, 354.77, 363.58, 385.03, 413.84, 382.81, 378.85, 389.57, 425.48, 381.22, 392.5, 407.25, 380.56, 391.22, 394.47, 368.65, 333.36, 335.7, 319.72], 'YTD': [184.57, 173.15, 195.96, 196.94, 212.18, 227.68, 217.23, 254.86, 280.81, 260.64, 245.8, 272.33, 238.21, 281.79, 308.2, 350.47, 304.93, 344.67, 403.71, 378, 361.47, 376.99, 385.03, 425.48, 391.22, 319.72], '6M': [191.62, 184.11, 202.72, 215.86, 209.24, 216.1, 248.18, 250.14, 253.87, 241.27, 275.57, 243.29, 258.16, 307.5, 345.02, 336.09, 329.5, 335.26, 382.45, 378, 361.47, 376.99, 385.03, 425.48, 391.22, 319.72], '1Y': [88.05, 94.52, 99.88, 104.3, 106.74, 113.6, 90.49, 89.9, 90.47, 98.67, 106.34, 114.6, 107.97, 114.77, 115.13, 120.2, 134.99, 132, 166.72, 139.07, 139.51, 163.5, 185.86, 178.45, 190.98, 186.81, 191.62, 184.11, 202.72, 215.86, 209.24, 216.1, 232.48, 250.14, 253.87, 241.27, 275.57, 243.29, 258.16, 307.5, 345.02, 336.09, 329.5, 335.26, 382.45, 378, 361.47, 376.99, 385.03, 425.48, 391.22, 319.72] },
      velocityScore: { '1D': -1.1, '1W': 6.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$63B', pe: 151.5, revenueGrowth: 21, eps: 2.11, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.24, RKNG: false },
      tonyNote: 'COHR appears in 1 of 3 Meme ETFs (33% coverage) with average weight 5.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
