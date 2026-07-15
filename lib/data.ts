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
export const SPY_RET: Record<Period, number> = { '1W': 1.3, '1M': 0.1, 'YTD': 10.8, '6M': 9.1, '1Y': 21.4 };
// @@END_GENERATED:SPY_RET@@

// Top holdings per ETF (ticker + portfolio weight %), shown on ETF row hover.
export type EtfHolding = { t: string; w: number };

// @@GENERATED:ETF_TOP_HOLDINGS@@
export const ETF_TOP_HOLDINGS: Record<string, EtfHolding[]> = {
  AIS: [{ t: 'MU', w: 7.0 }, { t: 'AMD', w: 5.4 }, { t: 'SIMO', w: 3.9 }, { t: 'VRT', w: 3.8 }, { t: 'MRVL', w: 3.5 }],
  ARTY: [{ t: 'AMD', w: 5.4 }, { t: 'NVDA', w: 5.0 }, { t: 'MU', w: 5.0 }, { t: 'AVGO', w: 4.8 }, { t: 'CRWV', w: 3.7 }],
  BAI: [{ t: 'MU', w: 6.4 }, { t: 'AMD', w: 5.4 }, { t: 'LRCX', w: 4.7 }, { t: 'NVDA', w: 4.7 }, { t: 'AVGO', w: 4.6 }],
  IGPT: [{ t: 'META', w: 9.3 }, { t: 'AMD', w: 8.9 }, { t: 'NVDA', w: 8.2 }, { t: 'GOOGL', w: 8.0 }, { t: 'MU', w: 7.9 }],
  IVES: [{ t: 'META', w: 5.4 }, { t: 'AAPL', w: 5.3 }, { t: 'NVDA', w: 5.1 }, { t: 'AMZN', w: 4.9 }, { t: 'AMD', w: 4.9 }],
  ALAI: [{ t: 'NVDA', w: 13.3 }, { t: 'TSM', w: 5.2 }, { t: 'MSFT', w: 5.0 }, { t: 'AMZN', w: 4.9 }, { t: 'GOOG', w: 4.9 }],
  CHAT: [{ t: 'NVDA', w: 7.7 }, { t: 'GOOGL', w: 5.7 }, { t: 'AVGO', w: 4.8 }, { t: 'AMD', w: 4.1 }, { t: 'MU', w: 3.7 }],
  AIFD: [{ t: 'NVDA', w: 6.6 }, { t: 'MU', w: 6.3 }, { t: 'PANW', w: 5.9 }, { t: 'ANET', w: 5.6 }, { t: 'AVGO', w: 5.5 }],
  SPRX: [{ t: 'ALAB', w: 12.1 }, { t: 'COHR', w: 8.8 }, { t: 'KLAC', w: 8.3 }, { t: 'NET', w: 8.3 }, { t: 'ARM', w: 8.0 }],
  AOTG: [{ t: 'AMD', w: 16.4 }, { t: 'NVDA', w: 10.1 }, { t: 'MU', w: 9.8 }, { t: 'TSM', w: 7.1 }, { t: 'TOST', w: 5.2 }],
  SOXX: [{ t: 'AMD', w: 8.6 }, { t: 'MU', w: 8.2 }, { t: 'NVDA', w: 8.1 }, { t: 'AVGO', w: 7.1 }, { t: 'INTC', w: 5.5 }],
  PSI: [{ t: 'AMAT', w: 6.7 }, { t: 'KLAC', w: 5.9 }, { t: 'MU', w: 5.6 }, { t: 'AMD', w: 5.6 }, { t: 'LRCX', w: 5.5 }],
  XSD: [{ t: 'PENG', w: 3.2 }, { t: 'MXL', w: 3.1 }, { t: 'AMD', w: 2.9 }, { t: 'ALGM', w: 2.8 }, { t: 'PI', w: 2.8 }],
  DRAM: [{ t: 'SNDK', w: 4.9 }, { t: 'STX', w: 4.7 }, { t: 'WDC', w: 4.7 }, { t: 'MU', w: 2.9 }, { t: 'SKHY', w: 0.7 }],
  PTF: [{ t: 'SNDK', w: 5.2 }, { t: 'MU', w: 5.0 }, { t: 'WDC', w: 4.4 }, { t: 'KLAC', w: 4.2 }, { t: 'STX', w: 3.8 }],
  WCLD: [{ t: 'FROG', w: 3.1 }, { t: 'DDOG', w: 2.9 }, { t: 'PANW', w: 2.8 }, { t: 'DOCN', w: 2.7 }, { t: 'TENB', w: 2.6 }],
  IGV: [{ t: 'PANW', w: 10.4 }, { t: 'PLTR', w: 8.5 }, { t: 'MSFT', w: 8.1 }, { t: 'CRWD', w: 7.8 }, { t: 'ORCL', w: 5.3 }],
  FDTX: [{ t: 'MRVL', w: 9.7 }, { t: 'MU', w: 9.3 }, { t: 'TSM', w: 6.4 }, { t: 'WDC', w: 4.5 }, { t: 'PANW', w: 4.2 }],
  GTEK: [{ t: 'MRVL', w: 4.0 }, { t: 'CDNS', w: 2.4 }, { t: 'AXON', w: 2.3 }, { t: 'NET', w: 2.1 }, { t: 'DELL', w: 2.1 }],
  ARKK: [{ t: 'TSLA', w: 10.2 }, { t: 'TEM', w: 5.7 }, { t: 'HOOD', w: 5.0 }, { t: 'SHOP', w: 4.7 }, { t: 'CRSP', w: 4.6 }],
  MARS: [{ t: 'SPCX', w: 21.7 }, { t: 'RKLB', w: 9.5 }, { t: 'ASTS', w: 7.4 }, { t: 'GSAT', w: 5.1 }, { t: 'VSAT', w: 5.1 }],
  FRWD: [{ t: 'NVDA', w: 8.9 }, { t: 'AMD', w: 7.7 }, { t: 'STX', w: 7.5 }, { t: 'TSM', w: 5.9 }, { t: 'LRCX', w: 5.5 }],
  BCTK: [{ t: 'TSM', w: 8.5 }, { t: 'SPCX', w: 7.7 }, { t: 'LRCX', w: 7.5 }, { t: 'AVGO', w: 7.2 }, { t: 'GOOG', w: 6.4 }],
  FWD: [{ t: 'AMAT', w: 2.2 }, { t: 'AVGO', w: 2.0 }, { t: 'LRCX', w: 1.8 }, { t: 'ASML', w: 1.8 }, { t: 'GOOGL', w: 1.7 }],
  CBSE: [{ t: 'TENB', w: 3.5 }, { t: 'IBRX', w: 3.3 }, { t: 'KRYS', w: 3.2 }, { t: 'SBUX', w: 3.1 }, { t: 'GRAL', w: 3.0 }],
  FCUS: [{ t: 'INTC', w: 4.3 }, { t: 'MU', w: 4.3 }, { t: 'DELL', w: 4.2 }, { t: 'BE', w: 4.2 }, { t: 'WDC', w: 4.2 }],
  WGMI: [{ t: 'CIFR', w: 17.6 }, { t: 'HUT', w: 10.8 }, { t: 'KEEL', w: 10.2 }, { t: 'IREN', w: 10.2 }, { t: 'MARA', w: 5.1 }],
  CNEQ: [{ t: 'NVDA', w: 14.2 }, { t: 'MSFT', w: 6.3 }, { t: 'GOOG', w: 6.0 }, { t: 'TSM', w: 5.6 }, { t: 'AAPL', w: 5.0 }],
  SGRT: [{ t: 'VRT', w: 12.6 }, { t: 'WDC', w: 11.1 }, { t: 'MU', w: 6.8 }, { t: 'ARW', w: 5.9 }, { t: 'WELL', w: 5.3 }],
  SPMO: [{ t: 'MU', w: 10.6 }, { t: 'NVDA', w: 8.3 }, { t: 'AVGO', w: 6.6 }, { t: 'GOOGL', w: 4.4 }, { t: 'AMD', w: 4.4 }],
  XMMO: [{ t: 'CW', w: 4.2 }, { t: 'FTI', w: 3.6 }, { t: 'ATI', w: 3.3 }, { t: 'WWD', w: 3.0 }, { t: 'STRL', w: 2.9 }],
  POW: [{ t: 'PWR', w: 5.0 }, { t: 'PRY', w: 4.4 }, { t: 'ETN', w: 4.4 }, { t: 'POWL', w: 4.2 }, { t: 'NVT', w: 4.0 }],
  VOLT: [{ t: 'BELFB', w: 7.6 }, { t: 'POWL', w: 6.1 }, { t: 'ETN', w: 5.6 }, { t: 'NEE', w: 5.3 }, { t: 'PWR', w: 5.2 }],
  PBD: [{ t: 'RIVN', w: 1.3 }, { t: 'NFI', w: 1.2 }, { t: 'SHLS', w: 1.2 }, { t: 'SEDG', w: 1.2 }, { t: 'BLBD', w: 1.1 }],
  PBW: [{ t: 'OPAL', w: 2.1 }, { t: 'DAR', w: 1.9 }, { t: 'BETA', w: 1.9 }, { t: 'RIVN', w: 1.9 }, { t: 'REX', w: 1.8 }],
  IVEP: [{ t: 'NEE', w: 4.3 }, { t: 'ETN', w: 4.2 }, { t: 'SO', w: 4.1 }, { t: 'CEG', w: 4.1 }, { t: 'WMB', w: 4.1 }],
  AIRR: [{ t: 'STRL', w: 5.2 }, { t: 'CHRW', w: 4.7 }, { t: 'FIX', w: 4.3 }, { t: 'AGX', w: 4.0 }, { t: 'MTZ', w: 4.0 }],
  PRN: [{ t: 'FIX', w: 4.7 }, { t: 'HWM', w: 4.3 }, { t: 'PWR', w: 4.2 }, { t: 'STRL', w: 4.0 }, { t: 'JBL', w: 3.5 }],
  RSHO: [{ t: 'TKR', w: 8.7 }, { t: 'POWL', w: 7.3 }, { t: 'CGNX', w: 7.2 }, { t: 'CAT', w: 6.9 }, { t: 'AIT', w: 6.0 }],
  IDEF: [{ t: 'RTX', w: 8.6 }, { t: 'LMT', w: 7.0 }, { t: 'BA', w: 5.0 }, { t: 'GD', w: 4.7 }, { t: 'FTNT', w: 3.7 }],
  BILT: [{ t: 'UNP', w: 6.0 }, { t: 'AENA', w: 4.7 }, { t: 'AEP', w: 4.5 }, { t: 'TRP', w: 4.2 }, { t: 'TCL', w: 3.6 }],
  BUZZ: [{ t: 'META', w: 3.6 }, { t: 'IBRX', w: 3.5 }, { t: 'AMD', w: 3.5 }, { t: 'SOFI', w: 3.5 }, { t: 'NOW', w: 3.2 }],
  MEME: [{ t: 'BE', w: 7.2 }, { t: 'AAOI', w: 6.7 }, { t: 'NBIS', w: 6.3 }, { t: 'IREN', w: 5.9 }, { t: 'HIMS', w: 5.6 }],
  RKNG: [{ t: 'DELL', w: 4.2 }, { t: 'AMD', w: 4.1 }, { t: 'OPEN', w: 4.0 }, { t: 'VRT', w: 3.9 }, { t: 'WDC', w: 3.9 }],
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
  POW: { name: "VistaShares Electrification Supercycle ETF", manager: "" },
  VOLT: { name: "Tema Electrification ETF", manager: "Tema ETFs", aum: 809755840 },
  PBD: { name: "Invesco Global Clean Energy ETF", manager: "Invesco", aum: 206513408 },
  PBW: { name: "Invesco WilderHill Clean Energy ETF", manager: "Invesco", aum: 484880768 },
  IVEP: { name: "Dan IVES Wedbush AI Power & Infrastructure ETF", manager: "Wedbush Funds", aum: 19010532 },
  AIRR: { name: "First Trust RBA American Industrial RenaissanceTM ETF", manager: "First Trust", aum: 11489859584 },
  PRN: { name: "Invesco Dorsey Wright Industrials Momentum ETF", manager: "Invesco", aum: 644142400 },
  BILT: { name: "iShares Infrastructure Active ETF", manager: "BlackRock", aum: 31458192 },
  BUZZ: { name: "VanEck Social Sentiment ETF", manager: "VanEck", aum: 104506896 },
  MEME: { name: "Roundhill ETF Trust - Roundhill Meme Stock ETF", manager: "" },
  RKNG: { name: "Defiance Retail Kings ETF", manager: "Defiance ETFs LLC", aum: 7150748 },
};
// @@END_GENERATED:ETF_INFO@@

// @@GENERATED:TOP10_RET@@
// Top10 composite returns per theme per period (average of all ETFs in theme)
const TOP10_RET: Record<Theme, Record<Period, number>> = {
  'AI & ML':         { '1W': -2, '1M': -7.1, 'YTD': 41.8, '6M': 35.8, '1Y': 70.4 },
  'Semiconductors':  { '1W': -0.1, '1M': -11.9, 'YTD': 94.2, '6M': 78.4, '1Y': 128.6 },
  'Broad Tech':      { '1W': -0.7, '1M': -6, 'YTD': 23.8, '6M': 18.4, '1Y': 38.2 },
  'Electrification': { '1W': 0.4, '1M': -7.7, 'YTD': 22.5, '6M': 14.2, '1Y': 38.1 },
  'Industrials':     { '1W': 0.6, '1M': -3.7, 'YTD': 22.8, '6M': 12.3, '1Y': 36 },
  'Meme':            { '1W': -2.9, '1M': -15.9, 'YTD': 10.9, '6M': -0.5, '1Y': -3.6 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, IndexChartByPeriod> = {
  'AI & ML': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 0.3, spyReturn: 0.48, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 100.12, 97.46, 97.42, 98.01], spy: [100, 100.85, 101.28, 100.51, 101.35], top10Return: -2, spyReturn: 1.3, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 97.06, 97.54, 101.72, 102.5, 96.47, 95.62, 97.39, 94.88, 97.71, 100.58, 97.39, 93.63, 94.26, 92.4, 92.67, 94.74, 94.86, 92.38, 92.33, 92.89], spy: [100, 99.4, 98.16, 98.93, 98.62, 97.18, 97.14, 97.28, 96.58, 98.17, 98.93, 98.93, 98.8, 98.67, 99.53, 99.06, 98.75, 99.59, 100.02, 99.25, 100.08], top10Return: -7.1, spyReturn: 0.1, xLabels: ["Jun 17", "Jun 24", "Jul 1", "Jul 8", "Jul 15"] },
    'YTD': { top10: [100, 102.26, 105.03, 104.9, 105.1, 104.12, 103.25, 105.93, 101.29, 100.28, 103.4, 95.58, 100.2, 110.68, 117.96, 119.66, 128.08, 134.58, 134.44, 147.76, 153.24, 145.46, 158, 149.22, 141.61, 141.84], spy: [100, 101.11, 101.43, 101.59, 101.98, 101.76, 100.64, 101.65, 100.47, 97.67, 96.76, 94.6, 96.17, 100.61, 103.93, 104.88, 105.29, 108.25, 107.6, 110.05, 111.02, 108.19, 109.51, 106.9, 109.65, 110.78], top10Return: 41.8, spyReturn: 10.8, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 100.67, 100.48, 97.28, 98.25, 98.43, 99.26, 95.16, 95.98, 95.89, 91.48, 96.19, 105.63, 113.09, 117.32, 120.16, 131.78, 127, 138.29, 146.75, 137.87, 144.62, 143.87, 146.94, 135.53, 135.78], spy: [100, 99.57, 99.96, 99.77, 98.48, 99.59, 99.1, 97.13, 95.67, 93.69, 91.6, 95.19, 99.11, 102.59, 103.13, 104.1, 106.56, 106.78, 107.71, 109.58, 106.79, 107.15, 107.53, 107.04, 108.01, 109.13], top10Return: 35.8, spyReturn: 9.1, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 100.84, 104.1, 103.59, 107.7, 103.81, 105.26, 104.89, 110.33, 115.13, 117.78, 117.34, 120.9, 119.65, 121.69, 128.04, 125.42, 123.91, 115.58, 116.52, 120.27, 123.67, 117.03, 121.37, 119.45, 122.22, 124.62, 125.6, 125.62, 121.16, 122.71, 123.01, 123.59, 118.33, 119.74, 119.09, 114.49, 120.06, 131.93, 141.51, 146.92, 150.5, 165.41, 159.24, 173.98, 185.02, 172.43, 182.1, 180.99, 185.12, 170.2, 170.44], spy: [100, 101.08, 102.11, 100.94, 103.3, 102.84, 103.27, 102.91, 104.53, 106.09, 106.6, 107.08, 107.55, 106.44, 107.9, 110.43, 109.84, 109.53, 107, 107.49, 109.55, 109.79, 109.12, 110.58, 109.61, 110.83, 110.97, 110.74, 111.56, 108.92, 109.5, 110.82, 110.26, 108.08, 106.45, 104.25, 103.69, 105.42, 109.21, 114.14, 114.76, 115.83, 118.56, 118.81, 119.85, 121.92, 118.55, 119.23, 119.65, 119.11, 120.18, 121.43], top10Return: 70.4, spyReturn: 21.4, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Semiconductors': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: -0.5, spyReturn: 0.48, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 102.66, 100.13, 97.95, 99.88], spy: [100, 100.85, 101.28, 100.51, 101.35], top10Return: -0.1, spyReturn: 1.3, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 94.79, 95.77, 102.96, 106.35, 96.49, 95.88, 100.8, 95.31, 98.52, 102.88, 100.06, 93.59, 89.79, 89.75, 86.05, 88.24, 90.54, 88.26, 86.41, 88.08], spy: [100, 99.4, 98.16, 98.93, 98.62, 97.18, 97.14, 97.28, 96.58, 98.17, 98.93, 98.93, 98.8, 98.67, 99.53, 99.06, 98.75, 99.59, 100.02, 99.25, 100.08], top10Return: -11.9, spyReturn: 0.1, xLabels: ["Jun 17", "Jun 24", "Jul 1", "Jul 8", "Jul 15"] },
    'YTD': { top10: [100, 109.74, 115.62, 115.77, 118.59, 121.69, 122.96, 128.39, 127.08, 129.34, 133.94, 127.28, 134.22, 152.47, 163.1, 178.14, 174.3, 191.69, 192.26, 214.96, 214.3, 211.64, 213.65, 201.31, 191.19, 194.26], spy: [100, 101.11, 101.43, 101.59, 101.98, 101.76, 100.64, 101.65, 100.47, 97.67, 96.76, 94.6, 96.17, 100.61, 103.93, 104.88, 105.29, 108.25, 107.6, 110.05, 111.02, 108.19, 109.51, 106.9, 109.65, 110.78], top10Return: 94.2, spyReturn: 10.8, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 105.04, 105.86, 109.13, 111.03, 112.24, 111.65, 107.55, 114.6, 120.91, 121.17, 121.01, 135.85, 147.48, 161.91, 169.53, 173.8, 175.8, 188.63, 196.05, 189.27, 197.77, 199.47, 190.71, 176.1, 178.44], spy: [100, 99.57, 99.96, 99.77, 98.48, 99.59, 99.1, 97.13, 95.67, 93.69, 91.6, 95.19, 99.11, 102.59, 103.13, 104.1, 106.56, 106.78, 107.71, 109.58, 106.79, 107.15, 107.53, 107.04, 108.01, 109.13], top10Return: 78.4, spyReturn: 9.1, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 101.23, 104.81, 102.92, 106.8, 107.72, 108.63, 108.76, 111.38, 114.6, 119.75, 119.98, 123.94, 124.04, 128.13, 134.01, 138.1, 138.44, 134.45, 137.54, 139.61, 146.16, 138.66, 140.05, 139.63, 149.04, 157.99, 163.37, 166.68, 165.16, 173.1, 170.64, 159.66, 154.24, 153.89, 161.58, 161.7, 167.51, 182.44, 203.16, 209.61, 212.63, 232, 229.01, 241.04, 232.33, 226.49, 242.3, 261.13, 247.89, 222.38, 228.62], spy: [100, 101.08, 102.11, 100.94, 103.3, 102.84, 103.27, 102.91, 104.53, 106.09, 106.6, 107.08, 107.55, 106.44, 107.9, 110.43, 109.84, 109.53, 107, 107.49, 109.55, 109.79, 109.12, 110.58, 109.61, 110.83, 110.97, 110.74, 111.56, 108.92, 109.5, 110.82, 110.26, 108.08, 106.45, 104.25, 103.69, 105.42, 109.21, 114.14, 114.76, 115.83, 118.56, 118.81, 119.85, 121.92, 118.55, 119.23, 119.65, 119.11, 120.18, 121.43], top10Return: 128.6, spyReturn: 21.4, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Broad Tech': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 0.8, spyReturn: 0.48, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 100.22, 98.02, 98.03, 99.27], spy: [100, 100.85, 101.28, 100.51, 101.35], top10Return: -0.7, spyReturn: 1.3, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.37, 97.98, 100.22, 99.92, 96.61, 95.56, 96.36, 95.48, 97.92, 99.92, 98.26, 95.29, 95.49, 93.86, 93.16, 94.57, 94.76, 92.76, 92.82, 93.98], spy: [100, 99.4, 98.16, 98.93, 98.62, 97.18, 97.14, 97.28, 96.58, 98.17, 98.93, 98.93, 98.8, 98.67, 99.53, 99.06, 98.75, 99.59, 100.02, 99.25, 100.08], top10Return: -6, spyReturn: 0.1, xLabels: ["Jun 17", "Jun 24", "Jul 1", "Jul 8", "Jul 15"] },
    'YTD': { top10: [100, 103.22, 105.67, 104.32, 103.12, 102.27, 102.7, 105.17, 103.19, 100.58, 101.76, 96.84, 100.95, 108.7, 114.6, 115.07, 122.74, 124.68, 121.96, 131.1, 133.71, 127.9, 133.67, 129.63, 122.86, 123.82], spy: [100, 101.11, 101.43, 101.59, 101.98, 101.76, 100.64, 101.65, 100.47, 97.67, 96.76, 94.6, 96.17, 100.61, 103.93, 104.88, 105.29, 108.25, 107.6, 110.05, 111.02, 108.19, 109.51, 106.9, 109.65, 110.78], top10Return: 23.8, spyReturn: 10.8, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 100.25, 98.18, 95.42, 97.09, 96.89, 99.18, 95.83, 96.12, 95.85, 92.11, 95.95, 102.34, 108.6, 110.87, 113.59, 121.51, 117.11, 122.03, 127.97, 121.24, 124.56, 124.94, 125.7, 117.45, 118.42], spy: [100, 99.57, 99.96, 99.77, 98.48, 99.59, 99.1, 97.13, 95.67, 93.69, 91.6, 95.19, 99.11, 102.59, 103.13, 104.1, 106.56, 106.78, 107.71, 109.58, 106.79, 107.15, 107.53, 107.04, 108.01, 109.13], top10Return: 18.4, spyReturn: 9.1, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 101.87, 102.38, 101.86, 103.69, 102.18, 103.72, 104.1, 107.83, 110.6, 113.37, 113.99, 117.14, 119.71, 117.47, 120.08, 119.22, 117.79, 110.72, 111.55, 113.34, 115.85, 111.8, 114.69, 112.5, 116.05, 119.15, 119.96, 118.75, 115.39, 117.81, 118.19, 120.22, 116.67, 115.24, 114.43, 112.67, 116.63, 122.29, 128.68, 131.1, 134.27, 138.97, 135.86, 143.04, 148.8, 142.39, 147.51, 147.7, 146.24, 137.34, 138.22], spy: [100, 101.08, 102.11, 100.94, 103.3, 102.84, 103.27, 102.91, 104.53, 106.09, 106.6, 107.08, 107.55, 106.44, 107.9, 110.43, 109.84, 109.53, 107, 107.49, 109.55, 109.79, 109.12, 110.58, 109.61, 110.83, 110.97, 110.74, 111.56, 108.92, 109.5, 110.82, 110.26, 108.08, 106.45, 104.25, 103.69, 105.42, 109.21, 114.14, 114.76, 115.83, 118.56, 118.81, 119.85, 121.92, 118.55, 119.23, 119.65, 119.11, 120.18, 121.43], top10Return: 38.2, spyReturn: 21.4, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Electrification': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 1.1, spyReturn: 0.48, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 100.49, 98.92, 99.19, 100.42], spy: [100, 100.85, 101.28, 100.51, 101.35], top10Return: 0.4, spyReturn: 1.3, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.96, 98.92, 101.19, 102.26, 97.74, 97.3, 97.64, 95.22, 96.42, 98.47, 96.71, 94.54, 94.19, 93.14, 91.17, 91.76, 92.19, 90.75, 91.06, 92.14], spy: [100, 99.4, 98.16, 98.93, 98.62, 97.18, 97.14, 97.28, 96.58, 98.17, 98.93, 98.93, 98.8, 98.67, 99.53, 99.06, 98.75, 99.59, 100.02, 99.25, 100.08], top10Return: -7.7, spyReturn: 0.1, xLabels: ["Jun 17", "Jun 24", "Jul 1", "Jul 8", "Jul 15"] },
    'YTD': { top10: [100, 103.75, 109.27, 110.69, 110.56, 114.98, 115.3, 119.16, 112.84, 112.9, 113.92, 111.25, 114.02, 120.83, 125.19, 128.74, 133.62, 136.24, 129.5, 138.87, 138.19, 129.22, 134.08, 126.89, 122.58, 122.57], spy: [100, 101.11, 101.43, 101.59, 101.98, 101.76, 100.64, 101.65, 100.47, 97.67, 96.76, 94.6, 96.17, 100.61, 103.93, 104.88, 105.29, 108.25, 107.6, 110.05, 111.02, 108.19, 109.51, 106.9, 109.65, 110.78], top10Return: 22.5, spyReturn: 10.8, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 102.34, 103.37, 105.35, 107.71, 108.11, 109.33, 103.77, 105.14, 104.53, 104.73, 105.55, 112.6, 115.83, 120.03, 124.12, 126.88, 122.75, 127.16, 128.74, 123.46, 122.99, 122.37, 120.16, 114.19, 114.16], spy: [100, 99.57, 99.96, 99.77, 98.48, 99.59, 99.1, 97.13, 95.67, 93.69, 91.6, 95.19, 99.11, 102.59, 103.13, 104.1, 106.56, 106.78, 107.71, 109.58, 106.79, 107.15, 107.53, 107.04, 108.01, 109.13], top10Return: 14.2, spyReturn: 9.1, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 103.86, 102.9, 103.07, 103.94, 104.37, 106.07, 104.23, 105.9, 109.01, 110.22, 111.3, 116.89, 120.48, 119.16, 120.61, 120.66, 122.1, 117.68, 116.81, 119.68, 121.11, 118.85, 122.27, 121.02, 122.97, 126.61, 129.13, 129.48, 127.92, 128.93, 129.62, 131.48, 126.64, 129.37, 130.09, 131.79, 134.92, 141.43, 145.36, 143.77, 149.43, 152.08, 151.25, 151.22, 153.45, 148.98, 147.41, 149.65, 143.87, 138.87, 138.13], spy: [100, 101.08, 102.11, 100.94, 103.3, 102.84, 103.27, 102.91, 104.53, 106.09, 106.6, 107.08, 107.55, 106.44, 107.9, 110.43, 109.84, 109.53, 107, 107.49, 109.55, 109.79, 109.12, 110.58, 109.61, 110.83, 110.97, 110.74, 111.56, 108.92, 109.5, 110.82, 110.26, 108.08, 106.45, 104.25, 103.69, 105.42, 109.21, 114.14, 114.76, 115.83, 118.56, 118.81, 119.85, 121.92, 118.55, 119.23, 119.65, 119.11, 120.18, 121.43], top10Return: 38.1, spyReturn: 21.4, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Industrials': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 0.4, spyReturn: 0.48, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 100.66, 99.99, 99.66, 100.59], spy: [100, 100.85, 101.28, 100.51, 101.35], top10Return: 0.6, spyReturn: 1.3, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.87, 99.38, 100.45, 102.16, 100.1, 100.35, 101.97, 100.19, 101.35, 102.07, 101.09, 99.34, 97.47, 97.02, 95.38, 95.72, 96.32, 95.7, 95.43, 96.29], spy: [100, 99.4, 98.16, 98.93, 98.62, 97.18, 97.14, 97.28, 96.58, 98.17, 98.93, 98.93, 98.8, 98.67, 99.53, 99.06, 98.75, 99.59, 100.02, 99.25, 100.08], top10Return: -3.7, spyReturn: 0.1, xLabels: ["Jun 17", "Jun 24", "Jul 1", "Jul 8", "Jul 15"] },
    'YTD': { top10: [100, 103.88, 110.36, 109.73, 110.09, 115.96, 117.07, 118.95, 115.34, 110.81, 112.05, 110.91, 114.13, 120.82, 122.21, 123.16, 126.38, 127.72, 123.55, 129.08, 129.68, 128.05, 129.86, 128.79, 121.63, 122.79], spy: [100, 101.11, 101.43, 101.59, 101.98, 101.76, 100.64, 101.65, 100.47, 97.67, 96.76, 94.6, 96.17, 100.61, 103.93, 104.88, 105.29, 108.25, 107.6, 110.05, 111.02, 108.19, 109.51, 106.9, 109.65, 110.78], top10Return: 22.8, spyReturn: 10.8, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 100.05, 100.04, 104.79, 107.59, 109.11, 108.56, 102.6, 101.35, 100.37, 101.58, 104.69, 110.67, 111.76, 113.2, 114.1, 116.53, 114.74, 115.91, 115.23, 115.01, 116.11, 118.8, 118.71, 111.29, 112.34], spy: [100, 99.57, 99.96, 99.77, 98.48, 99.59, 99.1, 97.13, 95.67, 93.69, 91.6, 95.19, 99.11, 102.59, 103.13, 104.1, 106.56, 106.78, 107.71, 109.58, 106.79, 107.15, 107.53, 107.04, 108.01, 109.13], top10Return: 12.3, spyReturn: 9.1, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 100.85, 103.55, 104.05, 105.84, 103.42, 105.04, 104.38, 104.19, 106.91, 109.46, 109.8, 111.13, 111.68, 111.02, 112.52, 112.82, 111.31, 106.84, 108.74, 109.05, 110.24, 110.98, 113.44, 110.53, 115.6, 120.61, 121.93, 122.37, 126.43, 129.2, 132.23, 129.51, 123.23, 121.47, 121.2, 123.38, 126.92, 133.17, 135.32, 136.64, 138.15, 141.08, 139.31, 140.3, 140.07, 139.56, 141.13, 144.5, 144.35, 134.7, 136], spy: [100, 101.08, 102.11, 100.94, 103.3, 102.84, 103.27, 102.91, 104.53, 106.09, 106.6, 107.08, 107.55, 106.44, 107.9, 110.43, 109.84, 109.53, 107, 107.49, 109.55, 109.79, 109.12, 110.58, 109.61, 110.83, 110.97, 110.74, 111.56, 108.92, 109.5, 110.82, 110.26, 108.08, 106.45, 104.25, 103.69, 105.42, 109.21, 114.14, 114.76, 115.83, 118.56, 118.81, 119.85, 121.92, 118.55, 119.23, 119.65, 119.11, 120.18, 121.43], top10Return: 36, spyReturn: 21.4, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Meme': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: -0.3, spyReturn: 0.48, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 101.26, 98.24, 96.28, 97.13], spy: [100, 100.85, 101.28, 100.51, 101.35], top10Return: -2.9, spyReturn: 1.3, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 96.07, 96.66, 100.08, 99.95, 95.31, 92.12, 91.62, 89.73, 93.61, 95.55, 93.76, 89.81, 87.65, 86.94, 84.91, 86.49, 87.63, 85.12, 83.37, 84.12], spy: [100, 99.4, 98.16, 98.93, 98.62, 97.18, 97.14, 97.28, 96.58, 98.17, 98.93, 98.93, 98.8, 98.67, 99.53, 99.06, 98.75, 99.59, 100.02, 99.25, 100.08], top10Return: -15.9, spyReturn: 0.1, xLabels: ["Jun 17", "Jun 24", "Jul 1", "Jul 8", "Jul 15"] },
    'YTD': { top10: [100, 106.79, 108.12, 103.33, 99.33, 98.15, 94.87, 96.34, 93.98, 92.78, 93.4, 90.08, 94.16, 105.46, 114.64, 111.52, 120.56, 123.8, 125.75, 143.35, 136.93, 128.57, 131.93, 124.31, 112.17, 110.87], spy: [100, 101.11, 101.43, 101.59, 101.98, 101.76, 100.64, 101.65, 100.47, 97.67, 96.76, 94.6, 96.17, 100.61, 103.93, 104.88, 105.29, 108.25, 107.6, 110.05, 111.02, 108.19, 109.51, 106.9, 109.65, 110.78], top10Return: 10.9, spyReturn: 10.8, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 98.7, 91.05, 85.45, 84.61, 85.56, 85.37, 82.8, 83.74, 83.92, 77.91, 82.24, 92.3, 102.3, 98.16, 104.87, 113.96, 107.19, 122.06, 126.24, 113.71, 117.69, 114.33, 113.28, 100.57, 99.54], spy: [100, 99.57, 99.96, 99.77, 98.48, 99.59, 99.1, 97.13, 95.67, 93.69, 91.6, 95.19, 99.11, 102.59, 103.13, 104.1, 106.56, 106.78, 107.71, 109.58, 106.79, 107.15, 107.53, 107.04, 108.01, 109.13], top10Return: -0.5, spyReturn: 9.1, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 103.25, 98.54, 93.38, 91.7, 88.76, 87.72, 82.7, 84.14, 84.21, 87.57, 88.08, 91.19, 84.69, 88.89, 87.5, 91.08, 90.39, 86.67, 85.19, 83.76, 86.08, 80.84, 86.19, 87, 90.11, 90.6, 91.48, 91.33, 86, 87.42, 89.71, 87.86, 91.22, 93.65, 94.05, 94.61, 95.89, 99.9, 108.18, 105.82, 103.12, 113.66, 114.93, 112.21, 114.81, 108.39, 109.36, 104.48, 99.58, 99.29, 96.43], spy: [100, 101.08, 102.11, 100.94, 103.3, 102.84, 103.27, 102.91, 104.53, 106.09, 106.6, 107.08, 107.55, 106.44, 107.9, 110.43, 109.84, 109.53, 107, 107.49, 109.55, 109.79, 109.12, 110.58, 109.61, 110.83, 110.97, 110.74, 111.56, 108.92, 109.5, 110.82, 110.26, 108.08, 106.45, 104.25, 103.69, 105.42, 109.21, 114.14, 114.76, 115.83, 118.56, 118.81, 119.85, 121.92, 118.55, 119.23, 119.65, 119.11, 120.18, 121.43], top10Return: -3.6, spyReturn: 21.4, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
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
export const SCAN_TIMESTAMP    = '2026-07-15T13:37:17.864Z';
export const SCAN_TIMESTAMP_NY = 'July 15, 2026 at 9:37 AM ET';
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
export const HOLDINGS_COUNT = 1282;
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
  { ticker: 'NVDA', name: `NVIDIA Corp`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 12.97, bestProScore: 6.35, avgProScore: 4.32, price: 213.09, weeklyChange: 4.39 },
  { ticker: 'MU', name: `Micron Technology Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 12.81, bestProScore: 5.18, avgProScore: 4.27, price: 963.51, weeklyChange: 1.55 },
  { ticker: 'AMD', name: `Advanced Micro Devices Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 11.17, bestProScore: 5.26, avgProScore: 3.72, price: 555.44, weeklyChange: 7.35 },
  { ticker: 'AVGO', name: `Broadcom Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 7.08, bestProScore: 3.07, avgProScore: 2.36, price: 394.20, weeklyChange: 1.42 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.62, bestProScore: 2.82, avgProScore: 2.31, price: 426.33, weeklyChange: -2.44 },
  { ticker: 'INTC', name: `INTEL CORPORATION`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.22, bestProScore: 3.10, avgProScore: 2.11, price: 108.21, weeklyChange: -1.84 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 3.97, bestProScore: 2.07, avgProScore: 1.98, price: 239.63, weeklyChange: 3.35 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 3.77, bestProScore: 2.14, avgProScore: 1.89, price: 215.50, weeklyChange: -7.00 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 3.58, bestProScore: 2.48, avgProScore: 1.79, price: 342.38, weeklyChange: 2.77 },
  { ticker: 'ALAB', name: `Astera Labs Inc`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 3.15, bestProScore: 1.86, avgProScore: 1.58, price: 360.31, weeklyChange: -13.69 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': -4.6, '1M': -9.3, 'YTD': 95.1, '6M': 78.4, '1Y': 160.8 },
  ARTY: { '1W': -3.3, '1M': -9.1, 'YTD': 45.9, '6M': 37.9, '1Y': 68.5 },
  BAI:  { '1W': -3.1, '1M': -10.6, 'YTD': 39.8, '6M': 34.1, '1Y': 59.3 },
  IGPT: { '1W': 0.7, '1M': -6.5, 'YTD': 61.8, '6M': 54.5, '1Y': 94 },
  IVES: { '1W': -0.3, '1M': -0.7, 'YTD': 20.3, '6M': 16.2, '1Y': 39.2 },
  ALAI: { '1W': -0.8, '1M': -4, 'YTD': 22.3, '6M': 20.8, '1Y': 41.7 },
  CHAT: { '1W': -2.9, '1M': -9, 'YTD': 52.1, '6M': 45.9, '1Y': 81.5 },
  AIFD: { '1W': -1.4, '1M': -5.4, 'YTD': 39.2, '6M': 37.5, '1Y': 68.8 },
  SPRX: { '1W': -5.6, '1M': -15.8, 'YTD': 27, '6M': 17.4, '1Y': 63.1 },
  AOTG: { '1W': 1.5, '1M': -0.5, 'YTD': 14.8, '6M': 15.1, '1Y': 27.4 },
  // Semiconductors
  SOXX: { '1W': 1.3, '1M': -9.4, 'YTD': 89.1, '6M': 68.8, '1Y': 131.2 },
  PSI:  { '1W': 4.9, '1M': -9.6, 'YTD': 101.3, '6M': 73.1, '1Y': 158.1 },
  XSD:  { '1W': 0.5, '1M': -12.8, 'YTD': 71.4, '6M': 56.6, '1Y': 109.9 },
  DRAM: { '1W': -7.2, '1M': -15.9, 'YTD': 115.2, '6M': 115.2, '1Y': 115.2 },
  // Broad Tech
  PTF:  { '1W': 1.2, '1M': -16.5, 'YTD': 48.5, '6M': 35.9, '1Y': 67.8 },
  WCLD: { '1W': 2.8, '1M': 15, 'YTD': 1.3, '6M': 8.3, '1Y': 1.3 },
  IGV:  { '1W': 2.9, '1M': 2.7, 'YTD': -9.9, '6M': -4.6, '1Y': -12.7 },
  FDTX: { '1W': -1.3, '1M': -5.6, 'YTD': 33.3, '6M': 32.7, '1Y': 39.4 },
  GTEK: { '1W': -0.7, '1M': -6.1, 'YTD': 43.9, '6M': 39.1, '1Y': 60.9 },
  ARKK: { '1W': -1.1, '1M': 1.2, 'YTD': 4.8, '6M': -1.6, '1Y': 11.1 },
  MARS: { '1W': -4.9, '1M': -20.6, 'YTD': 9.5, '6M': 9.5, '1Y': 9.5 },
  FRWD: { '1W': -0.6, '1M': -5.2, 'YTD': 29.5, '6M': 30.1, '1Y': 29.5 },
  BCTK: { '1W': 1.1, '1M': -3.9, 'YTD': 22.7, '6M': 22.4, '1Y': 24.9 },
  FWD:  { '1W': -2.2, '1M': -6.6, 'YTD': 29.9, '6M': 19.8, '1Y': 51.1 },
  CBSE: { '1W': 1.5, '1M': -2, 'YTD': 26.3, '6M': 15.5, '1Y': 34.7 },
  FCUS: { '1W': -0.8, '1M': -11.9, 'YTD': 28.1, '6M': 12.1, '1Y': 53 },
  WGMI: { '1W': -6.6, '1M': -22.6, 'YTD': 39.6, '6M': 11.3, '1Y': 113.3 },
  CNEQ: { '1W': -1.3, '1M': -2.3, 'YTD': 16.7, '6M': 14.2, '1Y': 34.6 },
  SGRT: { '1W': -2.7, '1M': -8.9, 'YTD': 36.4, '6M': 29.1, '1Y': 70.6 },
  SPMO: { '1W': -0.4, '1M': -3.4, 'YTD': 27.7, '6M': 27.3, '1Y': 35.2 },
  XMMO: { '1W': 0.7, '1M': -5.8, 'YTD': 16.5, '6M': 12, '1Y': 25.5 },
  // Electrification
  POW:  { '1W': 0.3, '1M': -10.2, 'YTD': 42.7, '6M': 31.5, '1Y': 38.5 },
  VOLT: { '1W': 0.5, '1M': -3.1, 'YTD': 34.8, '6M': 25.9, '1Y': 51.5 },
  PBD:  { '1W': -1, '1M': -9.3, 'YTD': 15, '6M': 7.7, '1Y': 40.3 },
  PBW:  { '1W': 1.7, '1M': -12.5, 'YTD': 17, '6M': 2.5, '1Y': 57.1 },
  IVEP: { '1W': 0.6, '1M': -3.5, 'YTD': 3.2, '6M': 3.2, '1Y': 3.2 },
  // Industrials
  AIRR: { '1W': -0.2, '1M': -4.8, 'YTD': 26.2, '6M': 10.7, '1Y': 48.7 },
  PRN:  { '1W': 1, '1M': -8.3, 'YTD': 31.4, '6M': 17.1, '1Y': 45.2 },
  BILT: { '1W': 1, '1M': 1.9, 'YTD': 10.8, '6M': 9.2, '1Y': 14.1 },
  // Meme
  BUZZ: { '1W': -1, '1M': -7.2, 'YTD': 9.4, '6M': 1.8, '1Y': 12.8 },
  MEME: { '1W': -6.4, '1M': -24.5, 'YTD': 26.9, '6M': 0.5, '1Y': -19.8 },
  RKNG: { '1W': -1.2, '1M': -15.9, 'YTD': -3.7, '6M': -3.7, '1Y': -3.7 },
};
// @@END_GENERATED:ETF_RETURNS@@

// @@GENERATED:ETF_DAY_CHANGE@@
// Today's % move per ETF ticker (1D, vs prior close). Refreshed by the 3×/day
// price jobs. Powers the 1D ranking in the theme-ETF side panel.
export const ETF_DAY_CHANGE: Record<string, number> = {
  AIS:  -0.46,
  ARTY: 0.44,
  BAI:  -0.13,
  IGPT: -0.11,
  IVES: 1.28,
  CHAT: 1,
  AIFD: 0.18,
  SPRX: 0.52,
  SOXX: 0.25,
  PSI:  0.64,
  DRAM: -2.42,
  PTF:  0.39,
  WCLD: 1.37,
  IGV:  1.65,
  FDTX: 0.4,
  ARKK: 1.35,
  MARS: 0.44,
  FRWD: 0.37,
  FWD:  0.11,
  WGMI: 2.28,
  CNEQ: 0.85,
  SPMO: -0.16,
  XMMO: 0.37,
  POW:  0.81,
  VOLT: 0.36,
  PBW:  2.23,
  AIRR: 0.63,
  PRN:  0.24,
  MEME: -0.25,
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
  'AI & ML': { etfs: ['AIS', 'IGPT', 'ALAI'], series: { '1W': [100, 101.14, 99.53, 98.05, 98.43], '1M': [100, 97.43, 98.3, 103.4, 104.67, 97.98, 97.2, 99.78, 96.61, 99.04, 101.74, 99.36, 95.48, 94.01, 94.01, 92.98, 94.86, 95.92, 94.4, 93.01, 93.36], 'YTD': [100, 103.47, 106.05, 106.76, 108.44, 106.59, 106.4, 110.48, 104.82, 103.29, 107.01, 98.91, 103.09, 115.49, 122.87, 128.89, 138.36, 149.11, 147.05, 164.15, 169.24, 161.82, 180.82, 168.61, 159.11, 159.75], '6M': [100, 101.72, 102.47, 99.09, 100.45, 101.85, 102.02, 97.2, 98.31, 98.83, 93.37, 98.33, 108.86, 116.73, 123.54, 127.98, 144.01, 138.87, 150.74, 159.58, 150.08, 157.17, 164.93, 163.97, 150.6, 151.22], '1Y': [100, 100.22, 103.53, 102.82, 106.93, 103.83, 105.13, 105.02, 110.14, 115.08, 117.73, 117.85, 121.03, 119.65, 123.09, 129.55, 128.3, 126.65, 119.14, 118.24, 122.18, 124.9, 120.08, 123.67, 123.14, 127.53, 129.55, 132.18, 134.06, 127.59, 130.69, 132.7, 133.2, 125.67, 127.85, 126.98, 122.41, 127.66, 141.27, 152.58, 161.85, 167.81, 189.5, 182.11, 198.79, 211.14, 194.68, 207.63, 217.06, 216.73, 198.1, 198.84] }, returns: { '1W': -1.6, '1M': -6.6, 'YTD': 59.8, '6M': 51.2, '1Y': 98.8 } },
  'Semiconductors': { etfs: ['PSI', 'DRAM', 'XSD'], series: { '1W': [100, 102.38, 99.02, 97.77, 99.41], '1M': [100, 95.02, 95.88, 103.37, 107.06, 96.65, 95.94, 101.24, 95.79, 98.78, 103.18, 99.43, 92.97, 89.68, 88.83, 85.47, 87.85, 89.87, 86.85, 85.85, 87.24], 'YTD': [100, 110.95, 116.25, 116.39, 119.09, 123.21, 124.33, 130.45, 131.64, 135.9, 140.92, 133.3, 141.36, 159.75, 171.25, 187.11, 181.25, 198.47, 201.36, 224.19, 219.02, 217.22, 214.09, 203.12, 193.86, 196], '6M': [100, 105.98, 106.92, 111.05, 112.99, 114.12, 114.04, 111.42, 120.05, 128.34, 129.58, 127.33, 142.25, 155.55, 170.25, 180.01, 180.3, 184.13, 198.4, 204.86, 195.87, 204.76, 201.21, 193.55, 180.27, 181.64], '1Y': [100, 102.01, 106.43, 104.92, 108.54, 110.44, 111.2, 112.14, 114.79, 117.8, 123.18, 123.28, 127.09, 127.62, 131.41, 137.47, 142.39, 143.71, 140.89, 145.12, 145.15, 152.62, 144.78, 145.46, 145.41, 155.46, 165.73, 170.63, 173.35, 175.43, 183.22, 178.86, 165.2, 161.86, 160.34, 170.43, 171.08, 177.37, 190.92, 214.61, 217, 220.46, 238.9, 236.51, 248.65, 232.36, 228.92, 242.37, 259.51, 247.37, 221.82, 227.76] }, returns: { '1W': -0.6, '1M': -12.8, 'YTD': 96, '6M': 81.6, '1Y': 127.8 } },
  'Broad Tech': { etfs: ['WGMI', 'PTF', 'GTEK'], series: { '1W': [100, 101.55, 99.02, 95.52, 97.98], '1M': [100, 98.09, 98.14, 102.2, 102.76, 98.79, 95.87, 96.49, 95.1, 96.23, 98.1, 96.03, 90.38, 87.52, 86.67, 84.7, 86.65, 88.04, 85.94, 82.87, 84.95], 'YTD': [100, 107.78, 115.77, 112.28, 111.75, 111.83, 110.21, 115.55, 109.33, 104.84, 110.07, 102.66, 106.69, 121.2, 131.55, 131.56, 141.97, 148.13, 143.26, 165.57, 170.07, 162.09, 174.19, 160.15, 143.51, 143.99], '6M': [100, 100.98, 99.45, 95.05, 98.16, 99.09, 99.91, 91.93, 94.08, 95.77, 91.75, 95.87, 107.43, 116.58, 119.76, 122.86, 133.02, 129.11, 139.59, 149.01, 141, 147.03, 154.94, 145.47, 128.16, 128.76], '1Y': [100, 104.18, 101.26, 100.22, 101.13, 100.98, 105.6, 108.92, 114.08, 125.11, 131.23, 132.09, 146.86, 161.07, 149.65, 157.44, 156.82, 144.82, 127.45, 130.32, 132.8, 141.34, 124.66, 131.41, 125.85, 136.79, 143.07, 146.01, 143, 131.52, 137.88, 138.46, 139.02, 127.64, 131.67, 131.85, 127.78, 132.86, 149.9, 164.22, 167.86, 172.29, 188.46, 182.36, 199.49, 215.07, 200.29, 210.49, 220.96, 205.62, 180.68, 180.64] }, returns: { '1W': -2, '1M': -15, 'YTD': 44, '6M': 28.8, '1Y': 80.6 } },
  'Electrification': { etfs: ['VOLT', 'POW', 'PBW'], series: { '1W': [100, 101.01, 98.77, 98.79, 100.83], '1M': [100, 98.87, 98.97, 101.34, 102.41, 97.74, 96.97, 97.71, 94.86, 97.22, 99.6, 97.18, 94.41, 93.66, 91.98, 90.08, 90.69, 91.58, 89.55, 89.65, 91.42], 'YTD': [100, 104.13, 111.62, 111.87, 112.15, 117.96, 117.77, 122.72, 115.13, 114.69, 117.34, 114.17, 116.48, 126.22, 131.1, 136.16, 144.84, 146.34, 136.71, 148.04, 148.05, 139.54, 147.7, 138.6, 129.59, 131.53], '6M': [100, 102.2, 102.19, 105.55, 108.1, 108.88, 109.5, 101.64, 104.55, 103.15, 103.84, 106.3, 115.18, 118.93, 124.77, 130.08, 135.43, 127.52, 134.97, 133.68, 126.55, 130.48, 130.44, 129.88, 118.2, 119.97], '1Y': [100, 104.21, 102.82, 102.93, 103.83, 102.77, 105.66, 104, 104.73, 108.34, 109.92, 112.2, 117.92, 123.11, 120.32, 121.79, 122.59, 124.1, 118.6, 119.1, 122.26, 126.03, 122.5, 127.12, 124.41, 125.92, 131.02, 133.64, 134.77, 132.36, 132.55, 135.23, 137.47, 132.91, 136.74, 136.81, 139.32, 143.67, 151.2, 155.31, 153.14, 160.02, 164.2, 161.9, 163.63, 165.56, 161.12, 160.71, 163.92, 157.83, 148.01, 149.05] }, returns: { '1W': 0.8, '1M': -8.6, 'YTD': 31.5, '6M': 20, '1Y': 49.1 } },
  'Industrials': { etfs: ['PRN', 'AIRR', 'BILT'], series: { '1W': [100, 100.66, 99.99, 99.66, 100.59], '1M': [100, 99.87, 99.38, 100.45, 102.16, 100.1, 100.35, 101.97, 100.19, 101.35, 102.07, 101.09, 99.34, 97.47, 97.02, 95.38, 95.72, 96.32, 95.7, 95.43, 96.29], 'YTD': [100, 103.88, 110.36, 109.73, 110.09, 115.96, 117.07, 118.95, 115.34, 110.81, 112.05, 110.91, 114.13, 120.82, 122.21, 123.16, 126.38, 127.72, 123.55, 129.08, 129.68, 128.05, 129.86, 128.79, 121.63, 122.79], '6M': [100, 100.05, 100.04, 104.79, 107.59, 109.11, 108.56, 102.6, 101.35, 100.37, 101.58, 104.69, 110.67, 111.76, 113.2, 114.1, 116.53, 114.74, 115.91, 115.23, 115.01, 116.11, 118.8, 118.71, 111.29, 112.34], '1Y': [100, 100.85, 103.55, 104.05, 105.84, 103.42, 105.04, 104.38, 104.19, 106.91, 109.46, 109.8, 111.13, 111.68, 111.02, 112.52, 112.82, 111.31, 106.84, 108.74, 109.05, 110.24, 110.98, 113.44, 110.53, 115.6, 120.61, 121.93, 122.37, 126.43, 129.2, 132.23, 129.51, 123.23, 121.47, 121.2, 123.38, 126.92, 133.17, 135.32, 136.64, 138.15, 141.08, 139.31, 140.3, 140.07, 139.56, 141.13, 144.5, 144.35, 134.7, 136] }, returns: { '1W': 0.6, '1M': -3.7, 'YTD': 22.8, '6M': 12.3, '1Y': 36 } },
  'Meme': { etfs: ['BUZZ', 'RKNG', 'MEME'], series: { '1W': [100, 101.26, 98.24, 96.28, 97.13], '1M': [100, 96.07, 96.66, 100.08, 99.95, 95.31, 92.12, 91.62, 89.73, 93.61, 95.55, 93.76, 89.81, 87.65, 86.94, 84.91, 86.49, 87.63, 85.12, 83.37, 84.12], 'YTD': [100, 106.79, 108.12, 103.33, 99.33, 98.15, 94.87, 96.34, 93.98, 92.78, 93.4, 90.08, 94.16, 105.46, 114.64, 111.52, 120.56, 123.8, 125.75, 143.35, 136.93, 128.57, 131.93, 124.31, 112.17, 110.87], '6M': [100, 98.7, 91.05, 85.45, 84.61, 85.56, 85.37, 82.8, 83.74, 83.92, 77.91, 82.24, 92.3, 102.3, 98.16, 104.87, 113.96, 107.19, 122.06, 126.24, 113.71, 117.69, 114.33, 113.28, 100.57, 99.54], '1Y': [100, 103.25, 98.54, 93.38, 91.7, 88.76, 87.72, 82.7, 84.14, 84.21, 87.57, 88.08, 91.19, 84.69, 88.89, 87.5, 91.08, 90.39, 86.67, 85.19, 83.76, 86.08, 80.84, 86.19, 87, 90.11, 90.6, 91.48, 91.33, 86, 87.42, 89.71, 87.86, 91.22, 93.65, 94.05, 94.61, 95.89, 99.9, 108.18, 105.82, 103.12, 113.66, 114.93, 112.21, 114.81, 108.39, 109.36, 104.48, 99.58, 99.29, 96.43] }, returns: { '1W': -2.9, '1M': -15.9, 'YTD': 10.9, '6M': -0.5, '1Y': -3.6 } },
};
// @@END_GENERATED:THEME_REPRESENTATIVES@@

// @@GENERATED:THEME_UNIVERSE@@
export const THEME_UNIVERSE: Partial<Record<Theme, ThemeUniverseFund[]>> = {
  'AI & ML': [
    { t: 'AIS', chosen: true, anchor: true, score: 119.6, ret6: 78.4, ret1: 160.8, corr: 0.7, reason: 'anchor', series: { '1W': [100, 99.07, 93.15, 95.87, 95.43], '1M': [100, 96.05, 98.31, 105.28, 108.77, 99.15, 98.76, 103.33, 98.2, 101.17, 104.96, 97.8, 91.33, 94.82, 89.04, 90.99, 95.02, 94.13, 88.51, 91.09, 90.67], 'YTD': [100, 105.32, 110.67, 111.78, 115.2, 115.09, 116.94, 124.33, 114.16, 113.93, 119.54, 109.56, 116.02, 133.36, 142.07, 148.35, 168.73, 179.88, 180.78, 204.82, 212.47, 203.39, 234.07, 217.71, 195.82, 195.13], '6M': [100, 102.69, 103.1, 104.62, 106.85, 107.89, 110.14, 101.4, 104.79, 104.43, 100.17, 106.08, 121.93, 129.9, 141.1, 147.11, 171.7, 159.04, 185.69, 190.29, 179.21, 196.76, 195.09, 206.51, 179.04, 178.41] } },
    { t: 'IGPT', chosen: true, anchor: false, score: 74.3, ret6: 54.5, ret1: 94, corr: 0.8, reason: 'diversifier', series: { '1W': [100, 103.34, 103.56, 98.92, 100.71], '1M': [100, 97.08, 97.89, 103.33, 104.99, 97.6, 96.97, 99.97, 95.99, 98.39, 101.1, 101.1, 97.25, 92.52, 95.31, 91.89, 92.8, 95.9, 96.11, 91.8, 93.46], 'YTD': [100, 103.85, 105.3, 107.7, 110.17, 106.52, 105.95, 109.32, 105.63, 102.22, 105.3, 97.48, 99.92, 110.95, 118.83, 128.06, 134.35, 150.55, 145.05, 164.05, 169.04, 162.91, 178.91, 166.2, 159.11, 161.83], '6M': [100, 103.32, 103.87, 100.53, 100.87, 102.41, 102.34, 96.45, 97.59, 97.06, 91.35, 96.73, 105.89, 113.69, 120.9, 127.17, 145.96, 140.76, 147.36, 163.49, 152.69, 156.09, 173.5, 162.59, 151.85, 154.45] } },
    { t: 'CHAT', chosen: false, anchor: false, score: 63.7, ret6: 45.9, ret1: 81.5, corr: 0.9, reason: 'correlated', series: { '1W': [100, 99.3, 94.85, 96.1, 97.06], '1M': [100, 97.09, 98.3, 103.85, 105.6, 97.79, 97.17, 99.22, 94.99, 96.83, 100.13, 94.9, 90.1, 92.34, 88.89, 91.13, 93.75, 93.09, 88.92, 90.1, 90.99], 'YTD': [100, 102.34, 104.65, 104.82, 105.87, 106.41, 108.94, 111.36, 105.29, 107.24, 110.62, 102.24, 108.6, 120.42, 128.63, 128.29, 139.65, 142.88, 146.37, 164.28, 170, 157.97, 176.51, 161.86, 152.32, 152.09], '6M': [100, 100.16, 100.52, 98.86, 103.04, 103.86, 103.69, 99.07, 102.1, 101.72, 98.06, 104.16, 115.5, 123.38, 127.79, 130.84, 141.27, 136.94, 153.21, 165.98, 152.27, 160.32, 156.78, 160.53, 146.1, 145.88] } },
    { t: 'ARTY', chosen: false, anchor: false, score: 53.2, ret6: 37.9, ret1: 68.5, corr: 0.91, reason: 'correlated', series: { '1W': [100, 99.7, 95.78, 96.2, 96.69], '1M': [100, 97.01, 97.82, 101.98, 102.65, 96.19, 95.58, 96.63, 93.42, 95.79, 98.44, 94.53, 91.88, 93.64, 90.38, 91.87, 93.99, 93.71, 90.02, 90.42, 90.88], 'YTD': [100, 102.74, 107.12, 108.57, 107.91, 106.72, 106.27, 108.8, 101.25, 100.21, 104.05, 95.16, 99.81, 112.2, 122.42, 124.18, 135.33, 138.9, 137.69, 150.91, 162.72, 152.08, 164.84, 153.82, 147.53, 145.93], '6M': [100, 102.3, 101.04, 99.41, 100.16, 97.92, 99.25, 94.12, 94.96, 93.7, 89.94, 94.33, 106.04, 115.69, 120.83, 124.48, 135.96, 126.46, 140.64, 153.1, 144.94, 151.77, 145.98, 149.39, 139.43, 137.92] } },
    { t: 'AIFD', chosen: false, anchor: false, score: 53.1, ret6: 37.5, ret1: 68.8, corr: 0.85, reason: 'correlated', series: { '1W': [100, 99.45, 97, 98.17, 98.57], '1M': [100, 97.03, 97.27, 99.81, 99.77, 94.83, 93.84, 95.33, 93.83, 96.99, 100.23, 97.17, 93.33, 95.73, 92.93, 94.09, 95.98, 95.46, 93.11, 94.23, 94.62], 'YTD': [100, 100.69, 101.61, 102.21, 103.1, 104.47, 105.34, 107.6, 104.7, 104.44, 107.39, 100.06, 105.56, 114.91, 121.97, 120.44, 130.84, 133.25, 132.2, 138.62, 149.07, 141.94, 146.83, 142.73, 138.46, 139.24], '6M': [100, 100.16, 100.88, 101.22, 103.06, 102.93, 104.86, 100.86, 102.55, 102.68, 98.81, 104.24, 113.48, 120.44, 123.02, 126, 133.87, 129.42, 137.14, 145.77, 139.45, 145.32, 137.82, 145.66, 136.73, 137.5] } },
    { t: 'BAI', chosen: false, anchor: false, score: 46.7, ret6: 34.1, ret1: 59.3, corr: 0.94, reason: 'correlated', series: { '1W': [100, 99.29, 94.53, 97.09, 96.9], '1M': [100, 95.95, 96.68, 102.11, 104.09, 95.83, 95.37, 98.73, 94.28, 97.56, 101.19, 94.99, 90.21, 92.51, 87.45, 89.12, 92.23, 91.57, 87.18, 89.54, 89.37], 'YTD': [100, 100.96, 104.8, 103.78, 104.11, 104.92, 104.68, 108.35, 101.41, 100.18, 105.05, 97.96, 103.21, 115.89, 122.43, 122.85, 134.47, 140.45, 139.01, 150.63, 151.62, 146.97, 162.85, 152.64, 139.43, 139.82], '6M': [100, 99.57, 99.28, 99.08, 99.54, 99.68, 101.73, 94.18, 95.62, 96.43, 93.95, 98.99, 111.15, 117.43, 122.24, 126.07, 139.29, 131.08, 144.01, 146.77, 137.79, 150.06, 143.81, 151.84, 133.73, 134.1] } },
    { t: 'SPRX', chosen: false, anchor: false, score: 40.3, ret6: 17.4, ret1: 63.1, corr: 0.85, reason: 'correlated', series: { '1W': [100, 98.59, 93.08, 93.97, 94.39], '1M': [100, 95.08, 95.85, 99.78, 100.83, 94.47, 92.74, 94.26, 91.23, 96.54, 99.86, 93.95, 87.39, 89.1, 83.96, 85.67, 89.18, 87.93, 83.01, 83.81, 84.18], 'YTD': [100, 102.37, 109.87, 105.67, 105.25, 108.01, 101.82, 104.33, 99.31, 97.55, 102.97, 92.42, 98.05, 109.67, 114.38, 109.04, 114.93, 122.17, 127.72, 145.56, 149.15, 143.69, 152.06, 145.59, 129.2, 126.95], '6M': [100, 99.56, 97.31, 96.67, 94.02, 93.72, 96.64, 88.88, 90.19, 90.31, 85.5, 90.71, 101.46, 105.82, 105.55, 104.14, 115.09, 112.51, 132, 132.9, 129.36, 139.52, 131.81, 139.33, 119.53, 117.45] } },
    { t: 'ALAI', chosen: true, anchor: false, score: 31.3, ret6: 20.8, ret1: 41.7, corr: 0.8, reason: 'diversifier', series: { '1W': [100, 101, 101.87, 99.36, 99.16], '1M': [100, 99.15, 98.7, 101.59, 100.26, 97.18, 95.87, 96.03, 95.65, 97.57, 99.17, 99.17, 97.85, 94.68, 97.67, 96.05, 96.77, 97.74, 98.59, 96.15, 95.96], 'YTD': [100, 101.24, 102.19, 100.8, 99.96, 98.16, 96.32, 97.78, 94.68, 93.71, 96.18, 89.7, 93.33, 102.16, 107.7, 110.27, 112.01, 116.89, 115.31, 123.57, 126.2, 119.16, 129.47, 121.91, 122.4, 122.29], '6M': [100, 99.15, 100.44, 92.12, 93.63, 95.25, 93.59, 93.74, 92.56, 94.99, 88.59, 92.18, 98.77, 106.59, 108.62, 109.66, 114.36, 116.8, 119.17, 124.97, 118.35, 118.65, 126.2, 122.81, 120.9, 120.79] } },
    { t: 'IVES', chosen: false, anchor: false, score: 27.7, ret6: 16.2, ret1: 39.2, corr: 0.73, reason: 'diverse', series: { '1W': [100, 99.4, 98.19, 98.43, 99.7], '1M': [100, 98.51, 97.55, 99.27, 98.04, 95.67, 94.36, 93.66, 94.44, 97.44, 99.45, 98.96, 97.31, 99.71, 98.04, 98.04, 99.58, 98.98, 97.78, 98.02, 99.28], 'YTD': [100, 102.18, 104.87, 103.7, 102.44, 98.54, 96.58, 96.71, 96.05, 95.16, 94.88, 87, 91.24, 96.17, 103.42, 103.8, 108.16, 113.76, 115.75, 123.19, 126, 116.99, 118.82, 118.1, 118.82, 120.33], '6M': [100, 100.27, 98.44, 93.03, 92.91, 90.16, 91.38, 91.35, 91.08, 89.4, 84.02, 88.11, 92.88, 99.88, 102.14, 103.82, 111.67, 110.39, 116.22, 127.5, 115.31, 117.05, 111.98, 116.41, 114.76, 116.21] } },
    { t: 'AOTG', chosen: false, anchor: false, score: 21.3, ret6: 15.1, ret1: 27.4, corr: 0.87, reason: 'correlated', series: { '1W': [100, 102.1, 102.6, 100.07, 101.45], '1M': [100, 97.61, 97.01, 100.18, 100.02, 96.03, 95.57, 96.7, 96.74, 98.79, 101.31, 101.31, 99.68, 97.59, 100.28, 97.89, 98.06, 100.12, 100.61, 98.13, 99.49], 'YTD': [100, 100.91, 99.17, 99.99, 96.99, 92.4, 89.61, 90.71, 90.45, 88.19, 88.03, 84.2, 86.22, 91.12, 97.74, 101.33, 102.36, 107.06, 104.49, 111.95, 116.15, 109.47, 115.64, 111.67, 113, 114.84], '6M': [100, 99.52, 99.89, 87.31, 88.39, 90.46, 88.95, 91.57, 88.38, 88.22, 84.39, 86.4, 89.2, 98.05, 101.02, 102.27, 108.61, 106.61, 107.47, 116.76, 109.34, 110.68, 115.71, 114.29, 113.24, 115.09] } },
  ],
  'Semiconductors': [
    { t: 'PSI', chosen: true, anchor: true, score: 115.6, ret6: 73.1, ret1: 158.1, corr: 0.87, reason: 'anchor', series: { '1W': [100, 105.38, 105.35, 100.23, 104.91], '1M': [100, 94.95, 95.38, 101.5, 105.04, 97.06, 96.1, 100.99, 95.77, 101.36, 106.96, 106.96, 99.32, 89.98, 90.87, 84.48, 86.18, 90.81, 90.79, 86.38, 90.41], 'YTD': [100, 109.1, 117.35, 116.38, 120.87, 126.2, 126.67, 132.8, 122.77, 116.26, 123.27, 120.15, 123.67, 142.85, 154.36, 165.76, 171.41, 189.5, 181.38, 203.02, 204.81, 206.7, 226.01, 213.26, 188.11, 201.32], '6M': [100, 100.6, 101.42, 107.06, 109.66, 109.98, 107.94, 97.25, 100.39, 103.19, 101.62, 107.72, 122.82, 130.88, 147.03, 147.32, 165.48, 161.71, 167.63, 167.5, 166.28, 183.05, 201.1, 194.05, 161.73, 173.09] } },
    { t: 'DRAM', chosen: true, anchor: false, score: 115.2, ret6: 115.2, ret1: 115.2, corr: -0.08, reason: 'diversifier', series: { '1W': [100, 97.95, 89.03, 95.14, 92.83], '1M': [100, 95.85, 98.42, 107.94, 113.58, 97.4, 98.4, 108.19, 101.14, 101.22, 103.91, 92.67, 85.31, 91.12, 85.25, 87.29, 90.56, 88.7, 80.62, 86.15, 84.07], 'YTD': [100, 116.97, 120.86, 124.17, 126.33, 130.98, 134.47, 145.57, 166.75, 190.2, 196.47, 177.67, 195.75, 217.98, 227.67, 251.12, 218.01, 234.58, 256.02, 276.33, 251.91, 259.15, 218.41, 218.26, 227.09, 215.22], '6M': [100, 116.97, 120.86, 124.17, 126.33, 130.98, 134.47, 145.57, 166.75, 190.2, 196.47, 177.67, 195.75, 217.98, 227.67, 251.12, 218.01, 234.58, 256.02, 276.33, 251.91, 259.15, 218.41, 218.26, 227.09, 215.22] } },
    { t: 'SOXX', chosen: false, anchor: false, score: 100, ret6: 68.8, ret1: 131.2, corr: 0.94, reason: 'correlated', series: { '1W': [100, 103.5, 103.44, 98.5, 101.3], '1M': [100, 94.08, 95.43, 101.75, 104.23, 96.01, 95.71, 99.48, 93.87, 97.76, 101.96, 101.96, 95.43, 90.11, 92.53, 87.79, 89.43, 92.56, 92.5, 88.09, 90.6], 'YTD': [100, 106.12, 113.72, 113.92, 117.11, 117.14, 118.85, 122.2, 113.41, 109.64, 112.97, 109.2, 112.77, 130.61, 138.65, 151.22, 153.43, 171.34, 164.95, 187.28, 200.14, 194.9, 212.34, 195.9, 183.19, 189.06], '6M': [100, 102.22, 102.69, 103.35, 105.17, 106.59, 104.47, 95.93, 98.25, 98.6, 95.93, 102.04, 116.64, 123.28, 136.88, 138.11, 154.29, 150.8, 159.34, 169.6, 169.46, 176.81, 194.24, 182.18, 163.6, 168.84] } },
    { t: 'XSD', chosen: true, anchor: false, score: 83.3, ret6: 56.6, ret1: 109.9, corr: 0.87, reason: 'diversifier', series: { '1W': [100, 103.8, 102.69, 97.95, 100.5], '1M': [100, 94.27, 93.85, 100.66, 102.55, 95.5, 93.33, 94.54, 90.47, 93.75, 98.67, 98.67, 94.29, 87.94, 90.37, 84.65, 86.8, 90.09, 89.13, 85.01, 87.23], 'YTD': [100, 106.78, 110.53, 108.61, 110.06, 112.46, 111.85, 112.99, 105.4, 101.25, 103.03, 102.09, 104.67, 118.42, 131.73, 144.46, 154.33, 171.33, 166.69, 193.23, 200.35, 185.81, 197.85, 177.83, 166.38, 171.45], '6M': [100, 100.37, 98.48, 101.92, 102.98, 101.4, 99.72, 91.43, 93, 91.64, 90.66, 96.6, 108.18, 117.79, 136.06, 141.59, 157.42, 156.11, 171.55, 170.76, 169.42, 172.07, 184.13, 168.34, 151.99, 156.62] } },
  ],
  'Broad Tech': [
    { t: 'WGMI', chosen: true, anchor: true, score: 62.3, ret6: 11.3, ret1: 113.3, corr: 0.68, reason: 'anchor', series: { '1W': [100, 97.05, 91.41, 91.34, 93.42], '1M': [100, 100.36, 99.61, 104.48, 104.3, 102.85, 96.74, 94.09, 95.25, 92.31, 91.39, 85.16, 77.08, 81.84, 76.26, 79.89, 82.86, 80.42, 75.74, 75.68, 77.41], 'YTD': [100, 116.28, 133.42, 121.71, 116.12, 111.37, 104.63, 110.63, 102.56, 99.19, 102.17, 91.95, 95.9, 116.7, 129.16, 121.71, 144.08, 150.85, 149.78, 180.98, 181.24, 172.38, 188.08, 166.45, 144.06, 139.59], '6M': [100, 102.42, 93.91, 84.26, 86.16, 82.87, 84.26, 75.18, 79.77, 78.53, 73.34, 76.49, 93.08, 103.02, 102.25, 105.25, 121.86, 115.78, 135.12, 147.48, 137.04, 143.83, 147.94, 131.45, 114.9, 111.34] } },
    { t: 'PTF', chosen: true, anchor: false, score: 51.8, ret6: 35.9, ret1: 67.8, corr: 0.76, reason: 'diversifier', series: { '1W': [100, 104.86, 103.12, 97.18, 101.18], '1M': [100, 96.54, 97.13, 100.85, 101.73, 95.28, 93.12, 97.23, 92.67, 96.76, 100.22, 100.22, 93.21, 83.38, 85.07, 79.49, 82.52, 86.53, 85.1, 80.19, 83.49], 'YTD': [100, 103.88, 109.18, 108.69, 114.43, 118.62, 118.71, 125.08, 119.92, 113.48, 121.49, 113.43, 119.96, 132.24, 140.7, 145.46, 149.16, 158.14, 149.67, 169.24, 175.64, 167.15, 179.33, 164.78, 141.35, 148.46], '6M': [100, 99.2, 101.39, 106.11, 106.5, 110.23, 110.12, 100.75, 104.08, 105.83, 102.78, 110.42, 121.02, 127.28, 133.36, 136.3, 144.52, 143.07, 147.63, 156.1, 148.98, 155.24, 165.54, 157.47, 129.36, 135.87] } },
    { t: 'GTEK', chosen: true, anchor: false, score: 50, ret6: 39.1, ret1: 60.9, corr: 0.76, reason: 'diversifier', series: { '1W': [100, 102.75, 102.54, 98.05, 99.33], '1M': [100, 97.38, 97.68, 101.27, 102.24, 98.23, 97.76, 98.15, 97.39, 99.62, 102.7, 102.7, 100.85, 97.34, 98.67, 94.72, 94.58, 97.17, 96.98, 92.73, 93.94], 'YTD': [100, 103.18, 104.7, 106.43, 104.7, 105.5, 107.3, 110.93, 105.5, 101.84, 106.55, 102.59, 104.22, 114.67, 124.79, 127.5, 132.68, 135.41, 130.34, 146.5, 153.34, 146.75, 155.17, 149.22, 145.13, 143.93], '6M': [100, 101.32, 103.04, 94.77, 101.81, 104.18, 105.36, 99.85, 98.4, 102.95, 99.13, 100.7, 108.2, 119.44, 123.66, 127.04, 132.69, 128.48, 136.03, 143.44, 136.98, 142.01, 151.35, 147.49, 140.23, 139.07] } },
    { t: 'SGRT', chosen: false, anchor: false, score: 49.8, ret6: 29.1, ret1: 70.6, corr: -0.04, reason: 'diverse', series: { '1W': [100, 99.26, 95.61, 97.74, 97.3], '1M': [100, 97.73, 98.26, 99.84, 102.67, 96.95, 96.85, 99.92, 96.18, 97.33, 100.19, 95.32, 89.9, 91.99, 88.32, 90.28, 93.67, 92.97, 89.55, 91.55, 91.14], 'YTD': [100, 101.94, 106.48, 106.44, 106.04, 108.56, 111.58, 117.91, 109.96, 108.38, 111.52, 105.64, 110.84, 124.15, 126.75, 123.32, 135.87, 142.06, 136.47, 146.18, 148.9, 144.22, 153.66, 145.66, 135.11, 136.39], '6M': [100, 101.14, 98.22, 103.25, 104.54, 108.32, 111.35, 100.15, 102.07, 100.87, 99.96, 104.88, 117.48, 119.94, 122.63, 124.97, 136.85, 128.57, 138.48, 139.12, 132.29, 141.62, 137.31, 141.88, 127.85, 129.07] } },
    { t: 'FDTX', chosen: false, anchor: false, score: 36, ret6: 32.7, ret1: 39.4, corr: 0.69, reason: 'diverse', series: { '1W': [100, 99.57, 96.61, 98.34, 98.73], '1M': [100, 97.43, 97.55, 100.67, 101.04, 96.24, 95.6, 97.55, 94.93, 98.43, 100.6, 97.72, 93.61, 95.5, 92.58, 93.23, 95.6, 95.19, 92.35, 94.01, 94.39], 'YTD': [100, 101.9, 100.24, 101.79, 99.59, 96.36, 95.3, 96.9, 95.53, 93.76, 95.35, 87.82, 93.4, 99.58, 107.76, 109.85, 117.3, 120.93, 121.24, 130.88, 141.92, 134.31, 142.73, 139.05, 131.69, 133.33], '6M': [100, 100.46, 98.47, 93.79, 94.03, 92.72, 95.12, 93.27, 93.02, 91.72, 87.41, 92.96, 99.12, 107.25, 111.76, 115.14, 122.88, 118.52, 129.19, 137.18, 133.46, 140.6, 135.31, 141.45, 131.08, 132.71] } },
    { t: 'FWD', chosen: false, anchor: false, score: 35.5, ret6: 19.8, ret1: 51.1, corr: 0.73, reason: 'diverse', series: { '1W': [100, 99.68, 96.22, 97.81, 97.84], '1M': [100, 98.47, 98.18, 101.43, 102.55, 97.54, 97.26, 99.79, 97, 99.41, 102.05, 98.46, 94.77, 96.56, 92.98, 93.33, 95.5, 95.19, 91.89, 93.41, 93.44], 'YTD': [100, 105.07, 108.98, 108.75, 108.28, 108.72, 110.41, 113.82, 107.68, 105.59, 107.03, 101.35, 106.54, 115.42, 118.83, 118.71, 124.97, 128.34, 128.06, 135.54, 138.47, 134.43, 142.55, 138.19, 129.74, 129.89], '6M': [100, 100.33, 99.63, 99.14, 101.17, 102, 104.05, 96.48, 96.67, 95.46, 93.51, 98.29, 106.49, 109.63, 112.02, 113.25, 120.4, 116.29, 124.79, 126.91, 121.49, 128.25, 125.09, 130.88, 119.7, 119.84] } },
    { t: 'FCUS', chosen: false, anchor: false, score: 32.5, ret6: 12.1, ret1: 53, corr: 0.74, reason: 'diverse', series: { '1W': [100, 98.63, 95.14, 98.24, 99.24], '1M': [100, 97.35, 97.81, 100.33, 102.39, 98.53, 96.38, 98.88, 94.21, 96.11, 98.32, 94.52, 86.97, 89.19, 84.65, 86.38, 88.81, 87.6, 84.5, 87.25, 88.14], 'YTD': [100, 108.28, 115.26, 117.36, 118.32, 119.52, 123.02, 126.9, 114.59, 113.14, 119.63, 112.95, 118.39, 123.58, 125.62, 125.53, 139.1, 142.41, 136.93, 142.89, 147.2, 143.15, 148.79, 139.66, 125.53, 128.07], '6M': [100, 103.79, 101.06, 104.2, 105.76, 108.09, 110.2, 94.43, 98.57, 99.72, 98.88, 103.63, 108.18, 109.97, 112.74, 118.6, 127.43, 117.83, 126.59, 126.15, 122.77, 127.21, 125.34, 125.08, 109.88, 112.12] } },
    { t: 'SPMO', chosen: false, anchor: false, score: 31.3, ret6: 27.3, ret1: 35.2, corr: 0.58, reason: 'diverse', series: { '1W': [100, 100.44, 97.81, 99.86, 99.56], '1M': [100, 97.96, 98.51, 101.31, 102.42, 97.78, 97.43, 101.14, 97.69, 100.44, 102.34, 98.4, 95.56, 96.92, 94.67, 95.39, 96.98, 97.41, 94.86, 96.84, 96.56], 'YTD': [100, 99.75, 100.57, 99.59, 100.8, 101.22, 100.01, 100.98, 100.28, 98.2, 97.12, 92.45, 96.94, 104.42, 106.97, 108.92, 115.55, 121.06, 120.11, 125.82, 128.08, 127.79, 135.48, 132.86, 126.19, 127.73], '6M': [100, 98.5, 100.13, 100.1, 98.77, 98.51, 100.33, 98.76, 97.04, 95.04, 92.14, 96.62, 104.07, 106.62, 110.35, 112.3, 122.01, 118.13, 125.13, 127.23, 123.52, 131.84, 128.92, 134.93, 125.77, 127.31] } },
    { t: 'FRWD', chosen: false, anchor: false, score: 29.8, ret6: 30.1, ret1: 29.5, corr: -0.03, reason: 'diverse', series: { '1W': [100, 100.34, 97.26, 99.02, 99.39], '1M': [100, 98.19, 98.22, 101.28, 100.52, 95.54, 95.23, 96.66, 94.23, 96.82, 99.16, 96.01, 93.06, 95.39, 92.63, 93.68, 95.42, 95.74, 92.81, 94.48, 94.83], 'YTD': [100, 100.4, 106.5, 95.49, 98.31, 97.68, 97.41, 96.45, 94.44, 96.35, 90.2, 92.98, 101.44, 108.87, 112.97, 114.45, 122.26, 120.74, 124.12, 134.64, 127.47, 136.6, 130.51, 135.46, 127.98, 129.55], '6M': [100, 101.98, 101.91, 97.73, 96.86, 96.84, 96.81, 94.4, 94.41, 93.76, 89.25, 94.7, 103.61, 108.76, 113.36, 114.8, 123.95, 119.43, 128.44, 135.17, 127.97, 137.14, 131.02, 135.99, 128.48, 130.05] } },
    { t: 'CBSE', chosen: false, anchor: false, score: 25.1, ret6: 15.5, ret1: 34.7, corr: 0.8, reason: 'diverse', series: { '1W': [100, 102.08, 101.43, 100.32, 101.48], '1M': [100, 97.59, 97.93, 101.84, 102.25, 98.78, 98.97, 100.41, 100.46, 101.43, 103.01, 103.01, 100.27, 99.08, 99.51, 97.02, 96.57, 98.58, 97.95, 96.88, 98], 'YTD': [100, 105.79, 110.62, 108.72, 106.51, 109.71, 109.38, 111.2, 107.01, 102.49, 105.43, 102.44, 101.75, 111.59, 116.14, 116.43, 119.2, 125.05, 121.31, 126.3, 132.12, 125.57, 131.29, 129.51, 125.08, 126.34], '6M': [100, 101.69, 99.89, 94.14, 96.78, 99.82, 99.23, 96.84, 93.68, 96.37, 93.63, 93, 99.99, 105.78, 108.17, 107.91, 111.63, 113.95, 114.71, 116.53, 111.3, 115.68, 120.49, 119.52, 114.32, 115.48] } },
    { t: 'CNEQ', chosen: false, anchor: false, score: 24.4, ret6: 14.2, ret1: 34.6, corr: 0.63, reason: 'diverse', series: { '1W': [100, 99.75, 97.37, 97.93, 98.66], '1M': [100, 100.51, 99.51, 101.85, 99.85, 97.44, 97.13, 96.35, 96.27, 98.76, 100.49, 98.66, 96.64, 98.29, 96.08, 96.79, 99.03, 98.78, 96.42, 96.98, 97.7], 'YTD': [100, 101.16, 101.69, 100.41, 98.87, 98.2, 97.21, 98.92, 95.84, 93.92, 94.12, 87.81, 92.58, 100.55, 105.35, 105.47, 107.88, 113.26, 115.47, 120.39, 119.6, 113.44, 119.28, 117.98, 115.62, 116.71], '6M': [100, 97.97, 96.61, 94.16, 93.79, 94.47, 93.5, 91.68, 91.34, 89.18, 85.91, 90.57, 98.37, 103.06, 104.89, 105.28, 109.91, 109.43, 114.99, 118.09, 111.86, 116.87, 113.88, 117.43, 113.11, 114.18] } },
    { t: 'BCTK', chosen: false, anchor: false, score: 23.6, ret6: 22.4, ret1: 24.9, corr: 0.13, reason: 'diverse', series: { '1W': [100, 102.19, 101.44, 98.44, 101.13], '1M': [100, 97.97, 97.22, 99.69, 98.53, 94.56, 94.58, 95.41, 94.27, 98.19, 101.25, 101.25, 98.04, 95.22, 97.35, 94.4, 95.03, 97.11, 96.4, 93.54, 96.1], 'YTD': [100, 100.78, 101.56, 100.7, 99.26, 97.68, 97.49, 100.49, 99.03, 96.72, 98.32, 92.93, 94.33, 100.76, 107.21, 109.62, 110.65, 115.24, 113.32, 120.21, 126.06, 119.41, 127.31, 120.4, 120.56, 122.74], '6M': [100, 100, 100.6, 91.51, 95.93, 98.48, 97.8, 99.08, 96.45, 98.05, 92.68, 94.07, 98.55, 106.99, 109.33, 109.66, 115.11, 115.78, 118.15, 122.82, 117.3, 121.32, 125.49, 125.05, 120.23, 122.39] } },
    { t: 'XMMO', chosen: false, anchor: false, score: 18.8, ret6: 12, ret1: 25.5, corr: 0.76, reason: 'diverse', series: { '1W': [100, 101.35, 100.75, 98.99, 100.66], '1M': [100, 99.38, 99.07, 100.31, 101.47, 99.01, 98.63, 99.89, 97.53, 97.73, 99.32, 99.32, 96.91, 95.24, 96.21, 93.56, 93.58, 94.85, 94.28, 92.63, 94.2], 'YTD': [100, 101.24, 103.39, 102.17, 102.22, 105.99, 106.49, 108.27, 107.54, 103.39, 105.62, 104.43, 106.61, 113.35, 114.73, 115.54, 115.57, 120.16, 114.86, 121.7, 124.02, 121.38, 124.1, 120.66, 115.74, 116.54], '6M': [100, 98.09, 97.33, 101.75, 101.44, 103.64, 104.11, 99.95, 99.11, 98.47, 99.4, 102.35, 108.89, 110.13, 111.18, 111.16, 114.85, 113.69, 114.34, 115.42, 114.74, 117.73, 120.6, 116.16, 111.19, 111.95] } },
    { t: 'MARS', chosen: false, anchor: false, score: 9.5, ret6: 9.5, ret1: 9.5, corr: 0.09, reason: 'diverse', series: { '1W': [100, 97.83, 93.48, 94.11, 95.11], '1M': [100, 98.95, 98.27, 95.99, 90.12, 88.13, 83.95, 81.17, 82.31, 90.7, 94.47, 91.49, 91.7, 90.91, 84.8, 83.98, 83.45, 81.64, 78.01, 78.54, 79.37], 'YTD': [100, 101.98, 102.95, 103.47, 112.19, 103.27, 116.71, 120.86, 132.89, 130.47, 121.87, 123.16, 128.53, 141.44, 147.18, 157.02, 183.98, 159, 140.31, 146.89, 135.63, 115.86, 125.18, 125.46, 115.17, 109.54], '6M': [100, 101.98, 102.95, 103.47, 112.19, 103.27, 116.71, 120.86, 132.89, 130.47, 121.87, 123.16, 128.53, 141.44, 147.18, 157.02, 183.98, 159, 140.31, 146.89, 135.63, 115.86, 125.18, 125.46, 115.17, 109.54] } },
    { t: 'WCLD', chosen: false, anchor: false, score: 4.8, ret6: 8.3, ret1: 1.3, corr: 0.23, reason: 'diverse', series: { '1W': [100, 98.09, 100.2, 101.34, 102.75], '1M': [100, 98.54, 96.01, 95.79, 93.81, 94.94, 95.59, 93.94, 99.55, 102.27, 103.91, 107.59, 108.65, 110.6, 111.64, 109.43, 111.9, 109.76, 112.12, 113.4, 114.98], 'YTD': [100, 99.63, 91.6, 94.32, 85.98, 81.69, 79.89, 76.49, 84.26, 80.75, 81.26, 74.84, 79.27, 72.55, 79.24, 77.81, 85.09, 80.55, 85.8, 87.18, 94.66, 87.43, 82.66, 90.12, 96.43, 101.31], '6M': [100, 98.88, 91.96, 85.16, 86.1, 77.28, 84.73, 90.85, 86.38, 85.4, 80.02, 84.77, 77.58, 84.74, 83.17, 90.13, 88.52, 90.07, 92.09, 109.8, 97.21, 94.23, 89.46, 97.91, 103.12, 108.34] } },
    { t: 'ARKK', chosen: false, anchor: false, score: 4.8, ret6: -1.6, ret1: 11.1, corr: 0.56, reason: 'diverse', series: { '1W': [100, 98.42, 95.96, 97.53, 98.88], '1M': [100, 99.31, 98.57, 100.7, 98.49, 96.3, 96.35, 96.12, 98.12, 101.26, 101.49, 102.79, 102.03, 105, 101.96, 100.67, 102.39, 100.77, 98.25, 99.86, 101.24], 'YTD': [100, 104.72, 106.19, 103.9, 96.67, 93.94, 92.81, 95.61, 96.19, 91.84, 92.39, 84.02, 89.44, 93.55, 103.12, 98.09, 99.56, 101.68, 98.6, 105.32, 104.1, 98.35, 101.96, 104.82, 104.21, 104.81], '6M': [100, 98.5, 91.38, 85.94, 85.74, 85.44, 90.59, 88.37, 85.74, 84.4, 78.88, 83.97, 87.83, 96.81, 93.43, 95.48, 97.68, 90.94, 94.26, 99.18, 92.62, 97.19, 93.59, 98.65, 97.84, 98.4] } },
    { t: 'IGV', chosen: false, anchor: false, score: -8.6, ret6: -4.6, ret1: -12.7, corr: 0.47, reason: 'diverse', series: { '1W': [100, 101.51, 99.92, 100.24, 102.94], '1M': [100, 98.59, 96.2, 96.13, 94.21, 94.22, 92.98, 91.45, 95.17, 96.99, 97.76, 97.76, 100.71, 100.96, 102.28, 101.56, 99.78, 101.29, 99.71, 100.02, 102.71], 'YTD': [100, 98.82, 93.02, 93.49, 84.7, 80.48, 77.59, 76.5, 81.04, 80.41, 79.91, 75.46, 76.01, 74.46, 81.65, 80.83, 83.68, 84.62, 87, 88.04, 94.67, 86.03, 84.29, 83.45, 89.06, 90.07], '6M': [100, 97.93, 90.51, 82.64, 82.95, 80.96, 81.75, 88.16, 84.38, 83.17, 77.06, 80.64, 78.87, 85.27, 85.39, 86.82, 91.35, 91.98, 94.22, 107.94, 95.86, 90.9, 87.5, 90.09, 94.34, 95.4] } },
  ],
  'Electrification': [
    { t: 'VOLT', chosen: true, anchor: true, score: 38.7, ret6: 25.9, ret1: 51.5, corr: 0.3, reason: 'anchor', series: { '1W': [100, 100.21, 98.45, 100.13, 100.49], '1M': [100, 99.55, 100.17, 102.24, 104.5, 100.84, 101.57, 103.85, 100.25, 101.32, 104.1, 100.35, 97.34, 98.48, 95.58, 95.3, 96.45, 96.65, 94.96, 96.57, 96.92], 'YTD': [100, 101.4, 108.84, 109.01, 112.43, 118.79, 120.64, 124.74, 117.86, 117.34, 119.9, 117.48, 120.45, 130.23, 132.9, 133.69, 142.23, 141.23, 133.69, 136.08, 137.53, 136.32, 145.38, 140.95, 132.58, 134.83], '6M': [100, 100.83, 104.02, 109.12, 113.87, 114.22, 115.42, 107.44, 109.41, 108.45, 109.7, 112.48, 121.62, 124.1, 126.43, 131.11, 133.47, 124.23, 130.04, 124.3, 124.49, 129.92, 131.01, 135.24, 123.81, 125.91] } },
    { t: 'POW', chosen: true, anchor: false, score: 35, ret6: 31.5, ret1: 38.5, corr: -0.09, reason: 'diversifier', series: { '1W': [100, 101.25, 97.61, 99.46, 100.27], '1M': [100, 99.07, 98.85, 100.06, 101.79, 97.09, 96.83, 97.54, 94.11, 97.06, 99.17, 95.68, 92.54, 92.93, 88.48, 88.51, 89.6, 90.72, 87.46, 89.12, 89.84], 'YTD': [100, 102.18, 110.41, 112.09, 113.71, 121.09, 122.86, 131.25, 121.29, 120.67, 126.63, 122.25, 125, 138.98, 141.11, 152.45, 166.63, 163.28, 152.09, 160.63, 156.92, 152.27, 161.7, 154.18, 140.61, 142.72], '6M': [100, 102.8, 105.8, 109.33, 114.43, 116.58, 120.14, 108.99, 111.86, 112.51, 112.65, 115.18, 128.06, 130.02, 141.41, 148.15, 156.81, 139.77, 151.52, 146.7, 137.79, 146.37, 142.11, 145.15, 129.56, 131.5] } },
    { t: 'PBW', chosen: true, anchor: false, score: 29.8, ret6: 2.5, ret1: 57.1, corr: 0.3, reason: 'diversifier', series: { '1W': [100, 101.57, 100.26, 96.78, 101.74], '1M': [100, 97.99, 97.89, 101.71, 100.93, 95.3, 92.51, 91.75, 90.23, 93.29, 95.52, 95.52, 93.34, 89.57, 91.87, 86.43, 86.02, 87.37, 86.24, 83.25, 87.51], 'YTD': [100, 108.81, 115.62, 114.51, 110.31, 114.01, 109.82, 112.18, 106.25, 106.06, 105.5, 102.78, 103.99, 109.46, 119.29, 122.33, 125.67, 134.51, 124.36, 147.41, 149.71, 130.03, 136.02, 120.66, 115.59, 117.03], '6M': [100, 102.98, 96.76, 98.19, 96.01, 95.84, 92.95, 88.5, 92.37, 88.5, 89.16, 91.25, 95.87, 102.67, 106.48, 110.98, 116, 118.55, 123.34, 130.03, 117.38, 115.14, 118.21, 109.26, 101.23, 102.49] } },
    { t: 'PBD', chosen: false, anchor: false, score: 24, ret6: 7.7, ret1: 40.3, corr: 0.68, reason: 'diverse', series: { '1W': [100, 99.14, 99.63, 99.68, 98.98], '1M': [100, 98.44, 97.67, 98.69, 99.37, 95.04, 95.04, 93.73, 93.39, 91.69, 93.44, 95.28, 93.87, 92.56, 94.8, 90.86, 90.86, 90.08, 90.52, 90.57, 89.94], 'YTD': [100, 103.61, 107.71, 112.25, 108.58, 113.12, 113.31, 117.04, 110.39, 110.76, 110.57, 109.89, 112, 117.35, 123.32, 126.74, 130.41, 137.56, 130.6, 138.18, 138.37, 121.83, 124.94, 117.29, 121.27, 115.05], '6M': [100, 102.33, 106.52, 104.54, 106.46, 106, 108.27, 103.32, 103.67, 103.49, 105.12, 105.01, 108.79, 114.26, 116.53, 121.83, 124.97, 126.6, 124.16, 130.62, 129.22, 117.87, 118.16, 109.78, 113.5, 107.68] } },
    { t: 'IVEP', chosen: false, anchor: false, score: 3.2, ret6: 3.2, ret1: 3.2, corr: 0.16, reason: 'diverse', series: { '1W': [100, 100.26, 98.66, 99.89, 100.62], '1M': [100, 99.75, 100.04, 103.26, 104.73, 100.43, 100.57, 101.32, 98.14, 98.75, 100.11, 96.71, 95.63, 97.39, 94.99, 94.74, 95.88, 96.13, 94.59, 95.78, 96.48], 'YTD': [100, 102.76, 103.75, 105.59, 107.78, 107.89, 109.85, 110.61, 108.39, 109.69, 107.01, 103.83, 108.66, 108.12, 109.31, 108.51, 103.14, 104.6, 106.74, 112.07, 108.43, 105.67, 102.34, 101.38, 102.87, 103.24], '6M': [100, 102.76, 103.75, 105.59, 107.78, 107.89, 109.85, 110.61, 108.39, 109.69, 107.01, 103.83, 108.66, 108.12, 109.31, 108.51, 103.14, 104.6, 106.74, 112.07, 108.43, 105.67, 102.34, 101.38, 102.87, 103.24] } },
  ],
  'Industrials': [
    { t: 'PRN', chosen: true, anchor: true, score: 31.2, ret6: 17.1, ret1: 45.2, corr: 0.63, reason: 'anchor', series: { '1W': [100, 102.11, 101.44, 98.82, 100.99], '1M': [100, 99.33, 100.26, 102.14, 105.06, 101.31, 100.9, 103.12, 99.75, 102.18, 104.29, 104.29, 100.03, 94.06, 95.15, 91.04, 90.85, 92.76, 92.15, 89.78, 91.75], 'YTD': [100, 104.08, 113.24, 111.67, 111.83, 117.61, 118.67, 122.14, 118.05, 110.3, 112.69, 111.42, 114.66, 125.55, 128.2, 130.75, 132.7, 138.82, 130.41, 141.52, 142.67, 138.68, 146.25, 142.84, 130.36, 131.38], '6M': [100, 99.1, 98.43, 102.97, 105.38, 109.4, 106.1, 98.87, 97.3, 98.42, 98.72, 102.12, 111.93, 113.94, 116.22, 118.87, 122.33, 122.6, 120.91, 122.77, 120.73, 124.9, 134.12, 130.45, 116.22, 117.13] } },
    { t: 'AIRR', chosen: true, anchor: false, score: 29.7, ret6: 10.7, ret1: 48.7, corr: 0.63, reason: 'diversifier', series: { '1W': [100, 99.41, 97.67, 99.16, 99.79], '1M': [100, 99.92, 99.14, 100.41, 102.21, 99.35, 100.08, 101.96, 99.48, 100.93, 102.21, 99.23, 96.58, 97.39, 94.25, 94.01, 95.38, 94.82, 93.16, 94.58, 95.18], 'YTD': [100, 107.26, 115.48, 114.29, 114.44, 121.22, 120.89, 121.02, 115.42, 111.14, 113.09, 111.65, 115.54, 123.92, 126, 125.7, 132.91, 131.55, 127.48, 132.72, 134.05, 131.66, 135.53, 133.83, 124.65, 126.21], '6M': [100, 99.99, 98.31, 105.71, 106.28, 106.3, 106.57, 98.49, 96.84, 96.07, 97.92, 101.34, 108.69, 110.51, 112.09, 111.75, 116.32, 111.5, 114.45, 113.73, 114.31, 116.3, 115.54, 118.87, 109.33, 110.7] } },
    { t: 'BILT', chosen: true, anchor: false, score: 11.6, ret6: 9.2, ret1: 14.1, corr: 0.07, reason: 'diversifier', series: { '1W': [100, 100.45, 100.85, 100.99, 101], '1M': [100, 100.35, 98.74, 98.8, 99.2, 99.63, 100.06, 100.83, 101.33, 100.94, 99.72, 99.75, 101.42, 100.96, 101.67, 101.1, 100.92, 101.38, 101.78, 101.92, 101.94], 'YTD': [100, 100.31, 102.35, 103.24, 103.99, 109.04, 111.65, 113.69, 112.55, 111, 110.38, 109.66, 112.2, 113, 112.43, 113.04, 113.52, 112.79, 112.77, 112.99, 112.33, 113.82, 107.81, 109.7, 109.87, 110.78], '6M': [100, 101.07, 103.37, 105.69, 111.12, 111.62, 113.01, 110.44, 109.9, 106.63, 108.1, 110.6, 111.39, 110.82, 111.28, 111.67, 110.93, 110.12, 112.38, 109.18, 109.98, 107.13, 106.73, 106.82, 108.31, 109.2] } },
  ],
  'Meme': [
    { t: 'BUZZ', chosen: true, anchor: true, score: 7.3, ret6: 1.8, ret1: 12.8, corr: 0.12, reason: 'anchor', series: { '1W': [100, 101.5, 100.81, 98.58, 99.02], '1M': [100, 97.65, 97, 99.22, 97.86, 95.4, 93.45, 92.04, 93.03, 95.56, 96.48, 96.48, 96.14, 94.86, 96.29, 93.42, 93.71, 95.12, 94.46, 92.38, 92.79], 'YTD': [100, 105.57, 108.62, 105.51, 101.23, 98.8, 94.24, 96.15, 97.94, 94.61, 94.52, 88.61, 89.72, 96.03, 105.33, 105.36, 106.99, 113.45, 109.7, 120.47, 122.04, 113.51, 116.96, 109.66, 110.13, 109.39], '6M': [100, 100.34, 98.42, 85.21, 85.99, 87.34, 87.99, 90.49, 88.08, 87.99, 82.49, 83.52, 86.36, 97.62, 98.02, 98.22, 106.59, 104.73, 108.08, 116.16, 105.62, 105.39, 107.39, 104.87, 102.52, 101.83] } },
    { t: 'RKNG', chosen: true, anchor: false, score: -3.7, ret6: -3.7, ret1: -3.7, corr: 0.12, reason: 'diversifier', series: { '1W': [100, 103.58, 101.17, 96.21, 98.8], '1M': [100, 96.69, 97.5, 101.89, 102.27, 97.05, 93.83, 94.71, 91.88, 95.35, 97.84, 97.84, 92.86, 86.4, 88.61, 83.64, 85.13, 88.18, 86.13, 81.9, 84.11], 'YTD': [100, 95.76, 83.79, 83.66, 82.9, 82.25, 79.73, 80.13, 78.34, 78.07, 71.66, 81.14, 89.13, 92.29, 90.84, 103.24, 104.38, 97.8, 113.52, 119.27, 106.65, 114.46, 111.08, 111.99, 95.73, 96.27], '6M': [100, 95.76, 83.79, 83.66, 82.9, 82.25, 79.73, 80.13, 78.34, 78.07, 71.66, 81.14, 89.13, 92.29, 90.84, 103.24, 104.38, 97.8, 113.52, 119.27, 106.65, 114.46, 111.08, 111.99, 95.73, 96.27] } },
    { t: 'MEME', chosen: true, anchor: false, score: -9.7, ret6: 0.5, ret1: -19.8, corr: 0.1, reason: 'diversifier', series: { '1W': [100, 98.69, 92.75, 94.05, 93.58], '1M': [100, 93.86, 95.49, 99.14, 99.71, 93.48, 89.07, 88.11, 84.28, 89.93, 92.33, 86.96, 80.44, 81.69, 75.93, 77.66, 80.63, 79.58, 74.78, 75.84, 75.46], 'YTD': [100, 119.03, 131.94, 120.81, 113.87, 113.39, 110.65, 112.74, 105.65, 105.65, 114.03, 100.48, 103.63, 128.06, 147.74, 125.97, 150.32, 160.16, 154.03, 190.32, 182.1, 157.74, 167.74, 151.29, 130.65, 126.94], '6M': [100, 100, 90.93, 87.48, 84.93, 87.1, 88.38, 77.78, 84.8, 85.7, 79.57, 82.06, 101.4, 116.99, 105.62, 113.15, 130.91, 119.03, 144.57, 143.3, 128.86, 133.21, 124.52, 122.99, 103.45, 100.51] } },
  ],
};
// @@END_GENERATED:THEME_UNIVERSE@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 9, avgWeight: 7.05, proScore: 6.35, coverage: 0.9,
      price: 213.09, weeklyPrices: [204.12, 202.78, 210.96, 203.53, 213.09], weeklyChange: 4.39, dayChange: 0.61, sortRank: 0, periodReturns: { '1M': 0.3, 'YTD': 14.3, '6M': 13.9, '1Y': 24.8 },
      priceHistory: { '1D': [211.8, 213.36, 213.09], '1W': [204.12, 202.78, 210.96, 203.53, 213.09], '1M': [212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83, 195.55, 196.93, 204.12, 202.78, 210.96, 203.53, 213.09], 'YTD': [186.5, 185.04, 186.23, 186.47, 185.61, 190.04, 187.98, 195.56, 183.04, 183.14, 178.56, 171.24, 177.39, 189.31, 202.06, 216.61, 198.48, 220.78, 220.61, 212.6, 218.66, 204.87, 210.69, 192.53, 196.93, 213.09], '6M': [187.05, 187.67, 191.13, 185.41, 182.81, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 201.68, 208.27, 198.45, 215.2, 225.32, 215.33, 224.36, 208.64, 205.19, 208.65, 194.97, 196.93, 213.09], '1Y': [170.7, 167.03, 175.51, 178.26, 183.16, 175.64, 179.81, 170.78, 170.76, 174.88, 178.43, 186.58, 185.04, 180.03, 181.16, 201.03, 206.88, 199.05, 186.6, 182.55, 181.46, 184.97, 177.72, 189.21, 186.5, 185.04, 183.14, 184.84, 192.51, 171.88, 186.94, 189.82, 177.19, 177.82, 180.25, 172.7, 171.24, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 225.32, 215.33, 224.36, 205.1, 205.19, 208.65, 194.97, 196.93, 213.09] },
      velocityScore: { '1D': 2.3, '1W': 5.8, '1M': 2.6, '6M': null }, isNew: false,
      marketCap: '$5.2T', pe: 32.7, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.47,
      etfPresence: { AIS: 2.76, ARTY: 5.04, BAI: 4.65, IGPT: 8.24, IVES: 5.06, ALAI: 13.34, CHAT: 7.65, AIFD: 6.59, SPRX: false, AOTG: 10.13 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 9, avgWeight: 5.84, proScore: 5.26, coverage: 0.9,
      price: 555.44, weeklyPrices: [517.41, 546.72, 557.89, 534.39, 555.44], weeklyChange: 7.35, dayChange: 1.33, sortRank: 0, periodReturns: { '1M': 1.5, 'YTD': 159.4, '6M': 143.7, '1Y': 256.9 },
      priceHistory: { '1D': [548.13, 557.07, 555.44], '1W': [517.41, 546.72, 557.89, 534.39, 555.44], '1M': [547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 516.11, 517.41, 546.72, 557.89, 534.39, 555.44], 'YTD': [214.16, 204.68, 231.83, 251.31, 246.27, 216, 200.12, 210.86, 202.07, 197.74, 205.27, 203.77, 217.5, 246.83, 274.95, 334.63, 341.54, 448.29, 414.05, 495.54, 523.2, 488.45, 537.37, 521.58, 516.11, 555.44], '6M': [227.92, 259.68, 236.73, 208.44, 207.32, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 278.39, 347.81, 360.54, 455.19, 424.1, 467.51, 510.13, 490.33, 511.57, 551.63, 539.49, 516.11, 555.44], '1Y': [155.61, 154.72, 177.44, 174.31, 174.95, 166.55, 163.36, 162.32, 155.82, 160.46, 160.9, 161.79, 211.51, 218.09, 238.03, 258.01, 259.65, 243.98, 240.52, 215.05, 215.24, 221.62, 209.17, 214.9, 214.16, 204.68, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 200.21, 192.43, 193.39, 201.33, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 467.51, 510.13, 466.38, 511.57, 551.63, 539.49, 516.11, 555.44] },
      velocityScore: { '1D': 0.8, '1W': 4.8, '1M': 3.5, '6M': null }, isNew: false,
      marketCap: '$906B', pe: 184.5, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 5.4, ARTY: 5.39, BAI: 5.39, IGPT: 8.95, IVES: 4.89, ALAI: 1.36, CHAT: 4.12, AIFD: false, SPRX: 0.67, AOTG: 16.43 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 5.76, proScore: 5.18, coverage: 0.9,
      price: 963.51, weeklyPrices: [948.80, 991.64, 979.30, 937.00, 963.51], weeklyChange: 1.55, dayChange: -1.99, sortRank: 0, periodReturns: { '1M': -11.4, 'YTD': 237.6, '6M': 186.2, '1Y': 702.2 },
      priceHistory: { '1D': [983.12, 966.23, 963.51], '1W': [948.8, 991.64, 979.3, 937, 963.51], '1M': [1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 938.38, 948.8, 991.64, 979.3, 937, 963.51], 'YTD': [285.41, 327.02, 362.75, 389.09, 437.8, 383.5, 420.95, 429, 400.77, 405.35, 444.27, 355.46, 366.24, 426.56, 448.42, 524.56, 576.45, 766.58, 698.74, 928.41, 996, 995.87, 1133.99, 1132.33, 938.38, 963.51], '6M': [336.63, 399.65, 414.88, 394.69, 411.66, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 1035.5, 949.28, 981.61, 1211.38, 1145.28, 938.38, 963.51], '1Y': [120.11, 109.22, 111.96, 109.06, 127.75, 122.05, 116.42, 118.48, 135.24, 158.82, 166.41, 167.32, 185.69, 187.06, 202.29, 221.91, 234.7, 253.3, 241.95, 223.93, 239.49, 252.42, 232.51, 276.27, 285.41, 327.02, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 1035.5, 864.01, 981.61, 1211.38, 1145.28, 938.38, 963.51] },
      velocityScore: { '1D': 2.4, '1W': 2.4, '1M': -15.9, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 20.8, revenueGrowth: 346, eps: 46.4, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { AIS: 6.98, ARTY: 5, BAI: 6.36, IGPT: 7.87, IVES: 4.62, ALAI: 1.17, CHAT: 3.7, AIFD: 6.3, SPRX: false, AOTG: 9.81 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 8, avgWeight: 3.84, proScore: 3.07, coverage: 0.8,
      price: 394.2, weeklyPrices: [388.69, 401.11, 399.97, 384.05, 394.20], weeklyChange: 1.42, dayChange: 1.31, sortRank: 0, periodReturns: { '1M': 0.1, 'YTD': 13.9, '6M': 14.9, '1Y': 40.3 },
      priceHistory: { '1D': [389.11, 394.3, 394.2], '1W': [388.69, 401.11, 399.97, 384.05, 394.2], '1M': [393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45, 373.9, 370.78, 388.69, 401.11, 399.97, 384.05, 394.2], 'YTD': [346.1, 332.48, 351.71, 324.85, 331.11, 343.94, 333.51, 332.31, 317.53, 335.97, 319.84, 309.42, 314.55, 379.75, 399.63, 418.2, 416.5, 419.3, 411.07, 421.86, 418.91, 385.57, 411.35, 365.02, 370.78, 394.2], '6M': [343.02, 320.05, 331.3, 332.92, 325.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 406.54, 422.76, 421.28, 430, 425.19, 414.14, 459.97, 396.6, 382.07, 392.13, 372.45, 370.78, 394.2], '1Y': [280.94, 278.59, 297.42, 292.93, 312.83, 294.91, 294.23, 298.24, 336.67, 360, 338.94, 329.91, 336.41, 344.13, 342.66, 372.97, 362.55, 358.39, 342.65, 377.96, 381.57, 406.29, 341.3, 349.32, 346.1, 332.48, 339.89, 325.49, 330.73, 310.51, 331.17, 332.65, 319.55, 330.48, 322.16, 310.51, 309.42, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 425.19, 414.14, 459.97, 385.73, 382.07, 392.13, 372.45, 370.78, 394.2] },
      velocityScore: { '1D': 0.3, '1W': 5.5, '1M': 11.2, '6M': null }, isNew: false,
      marketCap: '$1.9T', pe: 65.8, revenueGrowth: 48, eps: 5.99, grossMargin: 76, dividendYield: 0.67,
      etfPresence: { AIS: 0.72, ARTY: 4.78, BAI: 4.58, IGPT: false, IVES: 4.78, ALAI: 4.07, CHAT: 4.77, AIFD: 5.53, SPRX: false, AOTG: 1.51 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 7, avgWeight: 3.06, proScore: 2.14, coverage: 0.7,
      price: 215.5, weeklyPrices: [231.71, 243.27, 235.81, 217.53, 215.50], weeklyChange: -7, dayChange: -3.12, sortRank: 0, periodReturns: { '1M': -30.2, 'YTD': 153.6, '6M': 168.1, '1Y': 197.6 },
      priceHistory: { '1D': [222.44, 215.74, 215.5], '1W': [231.71, 243.27, 235.81, 217.53, 215.5], '1M': [308.88, 278.67, 289.54, 310.58, 307.86, 279.04, 276.7, 281.26, 266.77, 277.75, 297.89, 272.05, 245.29, 249.27, 230.7, 231.71, 243.27, 235.81, 217.53, 215.5], 'YTD': [84.98, 83.45, 80.46, 81.77, 78.66, 82.35, 79.09, 80.92, 78.09, 87.67, 89.53, 97.68, 107.11, 131.3, 147.84, 158.21, 163.66, 164.5, 176.27, 198.7, 316.43, 280.71, 310.58, 266.77, 230.7, 215.5], '6M': [80.38, 80.23, 78.92, 80.28, 78.61, 79.48, 81.69, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 139.69, 164.31, 164.95, 170.13, 176.89, 196.33, 219.43, 288.85, 279.7, 307.86, 277.75, 230.7, 215.5], '1Y': [72.41, 71.99, 76.34, 76.63, 77.81, 72.07, 72.95, 64.6, 66.84, 68.86, 74.62, 84.07, 86.97, 86.22, 84.26, 88.46, 90.37, 93.23, 83.45, 83.79, 92.89, 88.9, 84.07, 87.68, 84.98, 83.45, 81.21, 83.1, 81.34, 74.21, 78.23, 79.48, 81.69, 89.57, 87.86, 87.91, 97.68, 107.11, 128.49, 139.69, 164.31, 164.95, 170.13, 176.89, 196.33, 219.43, 263.47, 279.7, 307.86, 277.75, 230.7, 215.5] },
      velocityScore: { '1D': 15.1, '1W': -4, '1M': -22.2, '6M': null }, isNew: false,
      marketCap: '$193B', pe: 74.1, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.11,
      etfPresence: { AIS: 3.51, ARTY: 3.7, BAI: 1.69, IGPT: 2.97, IVES: false, ALAI: false, CHAT: 1.38, AIFD: 4.9, SPRX: 3.24, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 5.13, proScore: 3.08, coverage: 0.6,
      price: 362.38, weeklyPrices: [361.92, 358.89, 357.18, 352.51, 362.38], weeklyChange: 0.13, dayChange: 0.8, sortRank: 0, periodReturns: { '1M': -1.9, 'YTD': 15.8, '6M': 8.9, '1Y': 99.1 },
      priceHistory: { '1D': [359.51, 362.7, 362.38], '1W': [361.92, 358.89, 357.18, 352.51, 362.38], '1M': [369.35, 373.25, 363.79, 368.03, 349.68, 346.13, 345.29, 343.71, 337.39, 353.65, 357.37, 361.21, 359.91, 366.46, 367.03, 361.92, 358.89, 357.18, 352.51, 362.38], 'YTD': [313, 325.44, 330, 333.26, 343.69, 324.32, 303.33, 312.9, 303.13, 303.55, 307.13, 280.92, 295.77, 321.31, 337.42, 350.34, 383.25, 387.35, 387.66, 388.83, 372.19, 357.77, 368.03, 337.39, 367.03, 362.38], '6M': [332.78, 327.93, 338, 322.86, 305.72, 314.98, 311.76, 298.52, 302.28, 301, 274.34, 299.99, 321.31, 341.68, 344.4, 385.69, 400.8, 396.78, 382.97, 376.37, 363.31, 359.68, 349.68, 353.65, 367.03, 362.38], '1Y': [182, 191.34, 195.75, 194.67, 203.34, 201.57, 208.49, 211.35, 239.63, 251.16, 251.66, 243.1, 245.76, 245.45, 250.46, 267.47, 283.72, 290.1, 285.02, 318.58, 315.81, 317.08, 306.57, 314.35, 313, 325.44, 335.84, 330.54, 338.25, 331.25, 309, 314.98, 311.76, 298.52, 302.28, 301, 280.92, 295.77, 317.24, 341.68, 344.4, 385.69, 400.8, 396.78, 382.97, 376.37, 368.53, 359.68, 349.68, 353.65, 367.03, 362.38] },
      velocityScore: { '1D': 0.3, '1W': -2.5, '1M': 8.5, '6M': null }, isNew: false,
      marketCap: '$4.4T', pe: 27.6, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.35, IGPT: 8.01, IVES: 4.72, ALAI: false, CHAT: 5.69, AIFD: 5.07, SPRX: false, AOTG: 3.91 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 6, avgWeight: 4.71, proScore: 2.82, coverage: 0.6,
      price: 426.33, weeklyPrices: [436.98, 436.96, 434.11, 421.58, 426.33], weeklyChange: -2.44, dayChange: 1.34, sortRank: 0, periodReturns: { '1M': -3.4, 'YTD': 40.3, '6M': 24.8, '1Y': 79.9 },
      priceHistory: { '1D': [420.7, 427.05, 426.33], '1W': [436.98, 436.96, 434.11, 421.58, 426.33], '1M': [441.4, 425.83, 432.15, 462.12, 467.67, 436.39, 440.83, 434.99, 432.35, 455.1, 477.57, 444.23, 434.16, 451.79, 432.57, 436.98, 436.96, 434.11, 421.58, 426.33], 'YTD': [303.89, 318.01, 342.4, 332.71, 341.36, 355.41, 362.26, 387.73, 357.44, 336.71, 338.79, 326.11, 339.04, 369.57, 366.24, 404.98, 401.61, 397.28, 392.61, 422.73, 444.92, 421.07, 462.12, 432.35, 432.57, 426.33], '6M': [341.64, 334.87, 330.56, 348.85, 366.36, 370.54, 374.58, 338.89, 338.31, 329.24, 326.74, 341.76, 369.57, 370.5, 402.46, 397.67, 411.68, 404.35, 404.52, 435.63, 426.8, 423.93, 467.67, 455.1, 432.57, 426.33], '1Y': [236.95, 234.6, 241.33, 232.47, 244.29, 232.7, 235.59, 228.39, 250.92, 262.06, 282.71, 279.29, 294.03, 295.94, 294.51, 301.53, 304.86, 295.27, 282.01, 284.64, 292.09, 303.41, 286.87, 296.95, 303.89, 318.01, 327.11, 327.37, 339.55, 330.73, 368.1, 370.54, 374.58, 338.89, 338.31, 329.24, 326.11, 339.04, 370.6, 370.5, 402.46, 397.67, 411.68, 404.35, 404.52, 435.63, 415.17, 423.93, 467.67, 455.1, 432.57, 426.33] },
      velocityScore: { '1D': -1.4, '1W': -3.8, '1M': -1.4, '6M': null }, isNew: false,
      marketCap: '$2.2T', pe: 37, revenueGrowth: 35, eps: 11.52, grossMargin: 62, dividendYield: 0.9,
      etfPresence: { AIS: 3.36, ARTY: false, BAI: 4.51, IGPT: false, IVES: 4.69, ALAI: 5.21, CHAT: false, AIFD: 3.33, SPRX: false, AOTG: 7.13 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'ANET', name: 'Arista Networks Inc', easyScore: 6, avgWeight: 2.73, proScore: 1.64, coverage: 0.6,
      price: 179.07, weeklyPrices: [184.69, 186.96, 181.15, 182.57, 179.07], weeklyChange: -3.04, dayChange: -1.9, sortRank: 0, periodReturns: { '1M': 5.9, 'YTD': 36.7, '6M': 37.1, '1Y': 66.8 },
      priceHistory: { '1D': [182.54, 180.43, 179.07], '1W': [184.69, 186.96, 181.15, 182.57, 179.07], '1M': [169.09, 168.01, 164.93, 169.67, 174.56, 162.2, 161.74, 165.45, 157.6, 164.1, 169.88, 166.62, 159.99, 173.28, 166.46, 181.05, 184.69, 186.96, 181.15, 182.57, 179.07], 'YTD': [131.03, 123.72, 129.83, 143.72, 138.37, 143.45, 139.54, 132.89, 139.4, 134.03, 136.26, 120.77, 126.25, 152.02, 166.85, 165.29, 170.22, 142.54, 140.49, 155.27, 166.01, 163.24, 174.56, 164.1, 181.05, 179.07], '6M': [130.59, 136.34, 141.74, 137.49, 141.59, 127.43, 129.3, 132.89, 133.57, 131.22, 120.77, 126.25, 152.02, 166.85, 172.47, 172.62, 136.43, 141.71, 158.01, 170.68, 156.4, 169.09, 162.2, 169.88, 181.05, 179.07], '1Y': [107.37, 109.78, 118.62, 118.12, 141.25, 132.78, 134.27, 135.87, 141.91, 142.16, 144.09, 145.71, 145.29, 138.79, 145.94, 156.77, 153.55, 134.93, 123.45, 125.04, 127.22, 130.04, 126.13, 131.32, 131.03, 123.72, 130.59, 136.34, 141.74, 137.49, 141.59, 127.43, 133.5, 132.89, 133.57, 131.22, 120.77, 126.25, 152.02, 166.85, 172.47, 172.62, 136.43, 141.71, 158.01, 170.68, 156.4, 169.09, 162.2, 169.88, 181.05, 179.07] },
      velocityScore: { '1D': 0.6, '1W': 12.3, '1M': 0.6, '6M': null }, isNew: false,
      marketCap: '$225B', pe: 61.7, revenueGrowth: 35, eps: 2.9, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: 1.72, ARTY: 2.85, BAI: 1.57, IGPT: false, IVES: false, ALAI: false, CHAT: 2.44, AIFD: 5.63, SPRX: 2.14, AOTG: false },
      tonyNote: 'Arista Networks Inc appears in 6 of 10 AI & ML ETFs (60% coverage) with average weight 2.7% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 5, avgWeight: 4.58, proScore: 2.29, coverage: 0.5,
      price: 661.79, weeklyPrices: [631.48, 669.21, 656.73, 661.04, 661.79], weeklyChange: 4.8, dayChange: 0.11, sortRank: 0, periodReturns: { '1M': 11.5, 'YTD': 0.3, '6M': 6.6, '1Y': -6.8 },
      priceHistory: { '1D': [661.04, 661.24, 661.79], '1W': [631.48, 669.21, 656.73, 661.04, 661.79], '1M': [593.48, 600.21, 567.58, 577.22, 563.85, 562.2, 557.67, 542.87, 550.25, 562.6, 563.29, 612.91, 582.9, 600.29, 615.58, 603.12, 631.48, 669.21, 656.73, 661.04, 661.79], 'YTD': [660.09, 646.06, 620.25, 672.36, 706.41, 670.72, 643.22, 653.69, 660.57, 638.18, 606.7, 525.72, 573.02, 634.53, 670.91, 671.34, 604.96, 603, 605.06, 635.29, 627.57, 566.98, 563.85, 562.6, 603.12, 661.79], '6M': [620.8, 658.76, 716.5, 661.46, 639.77, 637.25, 653.56, 644.86, 613.71, 593.66, 525.72, 573.02, 634.53, 670.91, 678.62, 610.41, 598.86, 611.21, 612.34, 600.47, 585.39, 593.48, 562.2, 563.29, 603.12, 661.79], '1Y': [710.39, 704.81, 700, 763.46, 790, 751.48, 754.1, 735.11, 765.7, 779, 755.4, 734.38, 713.08, 708.65, 733.27, 751.44, 627.32, 627.08, 597.69, 636.22, 647.1, 656.96, 657.15, 664.94, 660.09, 646.06, 620.8, 658.76, 716.5, 661.46, 639.77, 637.25, 648.18, 644.86, 613.71, 593.66, 525.72, 573.02, 634.53, 670.91, 678.62, 610.41, 598.86, 611.21, 612.34, 600.47, 585.39, 593.48, 562.2, 563.29, 603.12, 661.79] },
      velocityScore: { '1D': -0.4, '1W': 6, '1M': 41.4, '6M': null }, isNew: false,
      marketCap: '$1.7T', pe: 24.1, revenueGrowth: 33, eps: 27.5, grossMargin: 82, dividendYield: 0.32,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: 9.27, IVES: 5.4, ALAI: 4.56, CHAT: 2.47, AIFD: false, SPRX: false, AOTG: 1.2 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 5, avgWeight: 4.03, proScore: 2.02, coverage: 0.5,
      price: 251.78, weeklyPrices: [243.62, 247.04, 245.34, 247.31, 251.78], weeklyChange: 3.35, dayChange: 1.74, sortRank: 0, periodReturns: { '1M': 2.3, 'YTD': 9.1, '6M': 5.7, '1Y': 11.2 },
      priceHistory: { '1D': [247.49, 251.08, 251.78], '1W': [243.62, 247.04, 245.34, 247.31, 251.78], '1M': [246.02, 246, 237.5, 244.39, 232.79, 234.11, 234.27, 227.01, 232.69, 240.14, 238.34, 241.7, 242.67, 244.16, 245.98, 243.62, 247.04, 245.34, 247.31, 251.78], 'YTD': [230.82, 246.29, 239.12, 238.42, 242.96, 208.72, 204.79, 210.64, 216.82, 209.53, 208.76, 207.54, 209.77, 239.89, 248.28, 261.12, 272.05, 265.82, 259.34, 271.85, 253.79, 241.51, 244.39, 232.69, 245.98, 251.78], '6M': [238.18, 239.16, 239.3, 210.32, 198.79, 210.11, 210, 213.21, 207.67, 205.37, 199.34, 212.79, 239.89, 250.56, 263.99, 268.26, 272.68, 264.14, 266.32, 261.26, 245.22, 238.55, 232.79, 240.14, 245.98, 251.78], '1Y': [226.35, 227.47, 231.01, 213.75, 221.47, 228.01, 227.94, 225.34, 238.24, 234.05, 220.71, 219.57, 221.78, 216.39, 222.03, 229.25, 254, 248.4, 232.87, 226.28, 234.42, 227.92, 222.56, 232.14, 230.82, 246.29, 236.65, 234.34, 241.73, 222.69, 199.6, 210.11, 210, 213.21, 207.67, 205.37, 207.54, 209.77, 238.38, 250.56, 263.99, 268.26, 272.68, 264.14, 266.32, 261.26, 246.03, 238.55, 232.79, 240.14, 245.98, 251.78] },
      velocityScore: { '1D': 0.5, '1W': -1, '1M': 1, '6M': null }, isNew: false,
      marketCap: '$2.7T', pe: 30.1, revenueGrowth: 17, eps: 8.37, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 4.92, ALAI: 4.89, CHAT: 2.65, AIFD: 3.64, SPRX: false, AOTG: 4.05 },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 5, avgWeight: 3.71, proScore: 1.86, coverage: 0.5,
      price: 360.31, weeklyPrices: [417.45, 412.97, 362.05, 361.78, 360.31], weeklyChange: -13.69, dayChange: -0.4, sortRank: 0, periodReturns: { '1M': -7.4, 'YTD': 116.6, '6M': 106.5, '1Y': 290.1 },
      priceHistory: { '1D': [361.78, 364.67, 360.31], '1W': [417.45, 412.97, 362.05, 361.78, 360.31], '1M': [389.2, 361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86, 406.42, 432.74, 382.89, 393.16, 417.45, 412.97, 362.05, 361.78, 360.31], 'YTD': [166.36, 156.73, 182, 163.25, 152.44, 182.86, 129.58, 128.15, 120, 119.9, 126.16, 112.47, 117.99, 166.79, 175.8, 183.31, 215.69, 204.42, 287.48, 349.17, 358.05, 367.15, 439.66, 455.96, 393.16, 360.31], '6M': [174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 215.58, 318.72, 320.09, 346.33, 389.2, 397.02, 483.02, 393.16, 360.31], '1Y': [92.36, 116.91, 118.41, 135.54, 192, 171.06, 178.56, 174.24, 214.49, 238.79, 230.11, 195.8, 212.1, 161.55, 157.51, 168.25, 179.31, 167.55, 139.52, 144.78, 142.94, 167.08, 144.94, 168.83, 166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 118.83, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 215.58, 318.72, 320.09, 346.33, 389.2, 397.02, 483.02, 393.16, 360.31] },
      velocityScore: { '1D': 0, '1W': 6.9, '1M': 19.2, '6M': null }, isNew: false,
      marketCap: '$62B', pe: 243.4, revenueGrowth: 93, eps: 1.48, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 2.02, ARTY: 1.3, BAI: false, IGPT: false, IVES: false, ALAI: 0.96, CHAT: 2.2, AIFD: false, SPRX: 12.09, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.65, proScore: 1.82, coverage: 0.5,
      price: 390.74, weeklyPrices: [383.34, 384.36, 385.10, 390.99, 390.74], weeklyChange: 1.93, dayChange: 1.51, sortRank: 0, periodReturns: { '1M': -2.3, 'YTD': -19.2, '6M': -14.4, '1Y': -22.8 },
      priceHistory: { '1D': [384.93, 390.26, 390.74], '1W': [383.34, 384.36, 385.1, 390.99, 390.74], '1M': [399.76, 393.83, 378.91, 379.4, 367.34, 373.94, 365.46, 352.83, 372.97, 368.57, 373.02, 384.28, 390.49, 386.74, 388.84, 383.34, 384.36, 385.1, 390.99, 390.74], 'YTD': [483.62, 478.11, 459.86, 470.28, 423.37, 413.6, 399.6, 400.6, 405.2, 401.86, 389.02, 365.97, 373.46, 384.37, 418.07, 424.82, 413.62, 407.77, 417.42, 412.67, 428.05, 390.34, 379.4, 372.97, 388.84, 390.74], '6M': [456.66, 465.95, 430.29, 401.14, 401.32, 397.23, 392.74, 408.96, 395.55, 381.87, 356.77, 372.88, 384.37, 422.79, 424.62, 414.44, 415.12, 421.92, 418.57, 460.52, 411.74, 390.74, 367.34, 368.57, 388.84, 390.74], '1Y': [505.82, 505.27, 512.57, 527.75, 529.24, 509.77, 504.26, 505.12, 498.41, 509.04, 509.23, 517.95, 523.98, 513.57, 517.66, 542.07, 517.03, 506, 507.49, 474, 490, 492.02, 476.39, 486.85, 483.62, 478.11, 459.38, 451.14, 433.5, 393.67, 401.84, 397.23, 392.74, 408.96, 395.55, 381.87, 365.97, 373.46, 370.87, 422.79, 424.62, 414.44, 415.12, 421.92, 418.57, 460.52, 416.67, 390.74, 367.34, 368.57, 388.84, 390.74] },
      velocityScore: { '1D': -2.7, '1W': -2.7, '1M': 4.6, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 23.7, revenueGrowth: 18, eps: 16.51, grossMargin: 68, dividendYield: 0.95,
      etfPresence: { AIS: false, ARTY: 2.67, BAI: false, IGPT: false, IVES: 4.72, ALAI: 4.99, CHAT: 2.42, AIFD: false, SPRX: false, AOTG: 3.43 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 5, avgWeight: 2.76, proScore: 1.38, coverage: 0.5,
      price: 783.85, weeklyPrices: [785.77, 802.01, 768.15, 814.80, 783.85], weeklyChange: -0.24, dayChange: -3.8, sortRank: 0, periodReturns: { '1M': -18.1, 'YTD': 112.7, '6M': 128.3, '1Y': 698.7 },
      priceHistory: { '1D': [814.8, 789.7, 783.85], '1W': [785.77, 802.01, 768.15, 814.8, 783.85], '1M': [957.24, 875.36, 869.98, 850, 893.93, 827.92, 842.53, 861.97, 816.98, 851.4, 858.06, 801.16, 728.32, 731.25, 698.91, 707.1, 785.77, 802.01, 768.15, 814.8, 783.85], 'YTD': [368.59, 348.26, 324.25, 332.45, 423.42, 561.13, 594.26, 723.39, 650.82, 616.09, 772.13, 702.73, 772.28, 871.18, 895.11, 791.37, 994.56, 992.37, 868.07, 860.62, 945.08, 921.56, 893.93, 851.4, 707.1, 783.85], '6M': [343.27, 339.19, 391.84, 551.99, 562.74, 674.73, 783.25, 558.44, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 1053.09, 884.98, 910.81, 905, 895.4, 957.24, 827.92, 858.06, 707.1, 783.85], '1Y': [98.14, 99.63, 109.48, 108.15, 119.66, 117.96, 124.62, 132.55, 151.73, 170.9, 163.99, 162.71, 157.15, 156.78, 162.95, 198.39, 188.36, 252.47, 247.43, 291.27, 302.81, 360.33, 316.15, 387.41, 368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 674.73, 700.91, 558.44, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 1053.09, 884.98, 910.81, 905, 895.4, 957.24, 827.92, 858.06, 707.1, 783.85] },
      velocityScore: { '1D': 5.3, '1W': 13.1, '1M': -8, '6M': null }, isNew: false,
      marketCap: '$61B', pe: 137.5, revenueGrowth: 90, eps: 5.7, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.68, IGPT: false, IVES: false, ALAI: 1.36, CHAT: 1.61, AIFD: 4.45, SPRX: 3.69, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 5 of 10 AI & ML ETFs (50% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 5, avgWeight: 2.25, proScore: 1.12, coverage: 0.5,
      price: 1689.52, weeklyPrices: [1858.27, 1915.92, 1673.97, 1757.82, 1689.52], weeklyChange: -9.08, dayChange: -3.89, sortRank: 0, periodReturns: { '1M': -19.8, 'YTD': 611.7, '6M': 312.8, '1Y': 3854.9 },
      priceHistory: { '1D': [1757.82, 1690.5, 1689.52], '1W': [1858.27, 1915.92, 1673.97, 1757.82, 1689.52], '1M': [2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 1745, 1744.43, 1617.7, 1727.18, 1858.27, 1915.92, 1673.97, 1757.82, 1689.52], 'YTD': [237.38, 334.54, 413.62, 470.8, 665.24, 541.64, 600.4, 632.38, 565.59, 618.82, 772.09, 615.83, 724.63, 952.5, 913.02, 1002.35, 1406.32, 1452.02, 1392.56, 1641.64, 1759.68, 1980.1, 2273.73, 2050.39, 1727.18, 1689.52], '6M': [409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1333.01, 1589.55, 1761.43, 1642, 2107.86, 1963.6, 2273.73, 1727.18, 1689.52], '1Y': [42.72, 41.36, 42.93, 41.93, 46.83, 44.58, 47.35, 51.07, 70.51, 91.55, 106.4, 112.2, 120.95, 127.29, 149.29, 175.53, 194.57, 271.58, 244.93, 220.5, 205.35, 219.46, 209.31, 244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 635.36, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1333.01, 1589.55, 1761.43, 1642, 2107.86, 1963.6, 2273.73, 1727.18, 1689.52] },
      velocityScore: { '1D': 1.8, '1W': 5.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$250B', pe: 57.9, revenueGrowth: 251, eps: 29.18, grossMargin: 56, dividendYield: null,
      etfPresence: { AIS: 2.15, ARTY: false, BAI: 2.93, IGPT: 3.97, IVES: false, ALAI: 0.49, CHAT: false, AIFD: false, SPRX: false, AOTG: 1.7 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'CRDO', name: 'Credo Technology Group Holding Ltd', easyScore: 5, avgWeight: 1.99, proScore: 0.99, coverage: 0.5,
      price: 234.4, weeklyPrices: [265.65, 257.79, 236.88, 236.18, 234.40], weeklyChange: -11.76, dayChange: -0.75, sortRank: 0, periodReturns: { '1M': -9.6, 'YTD': 62.9, '6M': 57.2, '1Y': 128.5 },
      priceHistory: { '1D': [236.18, 234.94, 234.4], '1W': [265.65, 257.79, 236.88, 236.18, 234.4], '1M': [259.41, 239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.09, 241.91, 265.55, 246.4, 258.69, 265.65, 257.79, 236.88, 236.18, 234.4], 'YTD': [143.89, 141.59, 150.97, 128.02, 119.96, 134.72, 127.91, 123.46, 114.74, 111.57, 107.09, 95.24, 102.46, 134.36, 174.53, 165.92, 193.57, 198.57, 182.98, 222.35, 217.5, 250.81, 302.52, 245.68, 258.69, 234.4], '6M': [149.12, 133.16, 125.28, 111.4, 121.44, 124.05, 114.22, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 210.22, 156.27, 221.64, 226.1, 222.27, 259.41, 272.01, 271.95, 258.69, 234.4], '1Y': [102.59, 92.93, 109.38, 110.29, 125.38, 106.3, 120.1, 124.27, 149.03, 164.42, 162.26, 145.61, 137.2, 129.75, 144.17, 162.18, 164.23, 158.5, 139.56, 154.18, 188.44, 170.29, 140.34, 147.81, 143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.05, 112.27, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 210.22, 156.27, 221.64, 226.1, 222.27, 259.41, 272.01, 271.95, 258.69, 234.4] },
      velocityScore: { '1D': -1, '1W': 2.1, '1M': 3.1, '6M': null }, isNew: false,
      marketCap: '$44B', pe: 93.8, revenueGrowth: 157, eps: 2.5, grossMargin: 68, dividendYield: null,
      etfPresence: { AIS: 1.07, ARTY: 1.23, BAI: 2.1, IGPT: false, IVES: false, ALAI: false, CHAT: 1.89, AIFD: false, SPRX: 3.64, AOTG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 4, avgWeight: 3, proScore: 1.2, coverage: 0.4,
      price: 308.44, weeklyPrices: [323.92, 318.86, 305.87, 303.58, 308.44], weeklyChange: -4.78, dayChange: 1.57, sortRank: 0, periodReturns: { '1M': -1.1, 'YTD': 90.4, '6M': 78.8, '1Y': 142.2 },
      priceHistory: { '1D': [303.67, 306.99, 308.44], '1W': [323.92, 318.86, 305.87, 303.58, 308.44], '1M': [311.93, 299.6, 317.58, 333.05, 357.96, 318.32, 316.43, 325.57, 303.95, 306.97, 334.82, 311.42, 300.53, 318.47, 305.58, 317.81, 323.92, 318.86, 305.87, 303.58, 308.44], 'YTD': [162.01, 160.78, 176.93, 181.23, 190.01, 199.62, 243.21, 262.19, 249.75, 265.38, 269.17, 251.07, 258.73, 299.96, 314.41, 305.03, 341.02, 367.13, 315.67, 314.18, 323.92, 302.87, 357.96, 306.97, 317.81, 308.44], '6M': [172.54, 182.49, 186.18, 195.58, 234.53, 245.42, 257.75, 241.78, 258.88, 255.88, 251.07, 258.73, 299.96, 314.41, 322.43, 330.97, 367.92, 339.73, 323.91, 323.39, 300.57, 311.93, 318.32, 334.82, 317.81, 308.44], '1Y': [127.37, 125.29, 142.7, 138.76, 143.72, 129.05, 127.93, 124.01, 125.58, 136.65, 142.61, 150.86, 158.87, 175.15, 174.8, 190.57, 180.82, 179.05, 164.86, 169.57, 180.91, 178.38, 160.66, 166.26, 162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 234.53, 245.42, 254.89, 241.78, 258.88, 255.88, 251.07, 258.73, 299.96, 314.41, 322.43, 330.97, 367.92, 339.73, 323.91, 323.39, 300.57, 311.93, 318.32, 334.82, 317.81, 308.44] },
      velocityScore: { '1D': -2.4, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$118B', pe: 77.5, revenueGrowth: 30, eps: 3.98, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 3.76, ARTY: false, BAI: 1.91, IGPT: false, IVES: false, ALAI: false, CHAT: 2.21, AIFD: 4.11, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 4, avgWeight: 2.88, proScore: 1.15, coverage: 0.4,
      price: 551.91, weeklyPrices: [550.30, 578.05, 582.59, 555.55, 551.91], weeklyChange: 0.29, dayChange: -2.03, sortRank: 0, periodReturns: { '1M': -15.5, 'YTD': 220.4, '6M': 148.5, '1Y': 717.3 },
      priceHistory: { '1D': [563.32, 555.25, 551.91], '1W': [550.3, 578.05, 582.59, 555.55, 551.91], '1M': [653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539, 577.46, 532.1, 550.3, 578.05, 582.59, 555.55, 551.91], 'YTD': [172.27, 187.68, 221.51, 240.85, 270.23, 285.99, 296.56, 290.95, 261.3, 261.18, 316.93, 273.35, 294.97, 350.16, 374.11, 400.73, 442.36, 488.74, 455.8, 530.6, 575.5, 529.29, 746.23, 586.45, 532.1, 551.91], '6M': [222.1, 236.39, 250.23, 282.58, 281.58, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 372.52, 404, 431.52, 480, 482.02, 484.28, 546.2, 526.93, 562.93, 732.62, 651.88, 532.1, 551.91], '1Y': [67.53, 67.06, 70.61, 75.84, 75.91, 75.86, 79.22, 81.91, 94.54, 103.09, 110.25, 120.06, 119.93, 113.13, 121.41, 124.92, 158.02, 174.22, 162.45, 150.93, 159.99, 169.54, 174.58, 178.25, 172.27, 187.68, 215, 243.29, 278.41, 260.19, 284.1, 285.52, 279.7, 245.25, 272.29, 293.1, 273.35, 294.97, 343.43, 372.52, 404, 431.52, 480, 482.02, 484.28, 546.2, 511.72, 562.93, 732.62, 651.88, 532.1, 551.91] },
      velocityScore: { '1D': -20.7, '1W': 7.5, '1M': -5, '6M': null }, isNew: false,
      marketCap: '$190B', pe: 33, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { AIS: 1.37, ARTY: 2.81, BAI: 3.19, IGPT: false, IVES: false, ALAI: 4.17, CHAT: false, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 4, avgWeight: 2.79, proScore: 1.12, coverage: 0.4,
      price: 108.21, weeklyPrices: [110.24, 112.54, 109.84, 103.12, 108.21], weeklyChange: -1.84, dayChange: 0.42, sortRank: 0, periodReturns: { '1M': -15.4, 'YTD': 193.3, '6M': 123.9, '1Y': 372.1 },
      priceHistory: { '1D': [107.76, 108.14, 108.21], '1W': [110.24, 112.54, 109.84, 103.12, 108.21], '1M': [127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 127.02, 120.35, 122.2, 110.39, 110.24, 112.54, 109.84, 103.12, 108.21], 'YTD': [36.9, 41.11, 46.96, 42.49, 48.81, 50.24, 45.46, 46.88, 45.58, 45.25, 46.18, 44.1, 50.38, 65.18, 65.7, 84.99, 95.78, 120.61, 110.8, 121.77, 111.78, 116.96, 133.99, 128.32, 110.39, 108.21], '6M': [48.32, 45.07, 46.47, 50.59, 46.79, 44.11, 45.61, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 68.5, 82.54, 99.62, 124.92, 108.77, 119.84, 109.33, 110.27, 124.57, 140.94, 131.72, 110.39, 108.21], '1Y': [22.92, 23.24, 20.41, 20.19, 21.81, 25.31, 24.55, 24.21, 24.44, 25.27, 29.34, 33.55, 37.17, 35.63, 38.12, 41.53, 39.5, 38.45, 34.71, 35.79, 43.47, 40.5, 37.31, 36.35, 36.9, 41.11, 48.72, 54.32, 48.66, 48.24, 46.48, 44.11, 45.61, 43.42, 45.77, 43.87, 44.1, 50.38, 62.38, 68.5, 82.54, 99.62, 124.92, 108.77, 119.84, 109.33, 99.17, 124.57, 140.94, 131.72, 110.39, 108.21] },
      velocityScore: { '1D': 2.8, '1W': -3.4, '1M': -26.8, '6M': null }, isNew: false,
      marketCap: '$544B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.18, ARTY: false, BAI: 2.84, IGPT: 4.13, IVES: false, ALAI: false, CHAT: 1.02, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 4, avgWeight: 2.52, proScore: 1.01, coverage: 0.4,
      price: 864.61, weeklyPrices: [860.02, 890.09, 910.34, 860.66, 864.61], weeklyChange: 0.53, dayChange: -1.56, sortRank: 0, periodReturns: { '1M': -15.1, 'YTD': 214, '6M': 169.9, '1Y': 480.1 },
      priceHistory: { '1D': [878.31, 869, 864.61], '1W': [860.02, 890.09, 910.34, 860.66, 864.61], '1M': [1018.8, 1031.34, 1066.07, 1070.23, 1094.04, 1038.59, 993.25, 1025.36, 899.9, 968.53, 965, 915.19, 820.16, 868.26, 827.64, 860.02, 890.09, 910.34, 860.66, 864.61], 'YTD': [275.39, 284.47, 326.23, 358.29, 432.95, 425, 424.14, 421.85, 375.01, 373.98, 434.6, 378.79, 429.36, 513.28, 539.75, 595.86, 738.54, 808.8, 733.35, 870.66, 925.99, 868.09, 1070.23, 899.9, 827.64, 864.61], '6M': [320.32, 346.1, 407.69, 429.32, 425.99, 411.11, 407.84, 352.8, 383.71, 411.23, 380.07, 453.3, 513.28, 547.75, 586.25, 726.93, 782.64, 795.47, 812.73, 921.26, 876.77, 931.04, 1094.04, 968.53, 827.64, 864.61], '1Y': [149.05, 146.59, 152.68, 151.74, 155.59, 157.93, 164, 170.5, 191.59, 211.13, 228.13, 236.06, 225.01, 211.63, 214.57, 223, 265.55, 293.99, 261.38, 253.38, 266.87, 282.86, 288.13, 282.8, 275.39, 284.47, 312.28, 346.53, 446.57, 405.45, 431.17, 411.11, 407.84, 352.8, 383.71, 411.23, 378.79, 429.36, 503.13, 547.75, 586.25, 726.93, 782.64, 795.47, 812.73, 921.26, 847.47, 931.04, 1094.04, 968.53, 827.64, 864.61] },
      velocityScore: { '1D': 1, '1W': null, '1M': -14.4, '6M': null }, isNew: false,
      marketCap: '$196B', pe: 82, revenueGrowth: 44, eps: 10.54, grossMargin: 42, dividendYield: 0.34,
      etfPresence: { AIS: 2.4, ARTY: 2.78, BAI: false, IGPT: 3, IVES: false, ALAI: 1.89, CHAT: false, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 4, avgWeight: 2.52, proScore: 1.01, coverage: 0.4,
      price: 404.89, weeklyPrices: [394.06, 406.55, 407.76, 394.76, 404.89], weeklyChange: 2.75, dayChange: 2.2, sortRank: 0, periodReturns: { '1M': -1.5, 'YTD': -10, '6M': -7.7, '1Y': 30.3 },
      priceHistory: { '1D': [396.18, 404.59, 404.89], '1W': [394.06, 406.55, 407.76, 394.76, 404.89], '1M': [411.15, 404.66, 396.38, 400.49, 405.05, 381.61, 375.53, 375.12, 379.71, 411.84, 420.6, 425.3, 393.45, 419.77, 402.9, 394.06, 406.55, 407.76, 394.76, 404.89], 'YTD': [449.72, 435.8, 437.5, 435.2, 421.81, 417.32, 411.32, 417.4, 405.94, 395.01, 380.3, 372.11, 360.59, 352.42, 392.5, 378.67, 392.51, 433.45, 404.11, 440.36, 418.45, 399.15, 400.49, 379.71, 402.9, 404.89], '6M': [438.57, 449.06, 430.41, 411.11, 417.44, 411.82, 402.51, 396.73, 391.2, 367.96, 361.83, 352.82, 352.42, 400.62, 376.3, 390.82, 428.35, 422.24, 426.01, 415.88, 408.95, 406.43, 405.05, 411.84, 402.9, 404.89], '1Y': [310.78, 332.11, 321.2, 308.72, 340.84, 329.31, 346.6, 329.36, 346.97, 421.62, 425.85, 444.72, 433.09, 429.24, 442.6, 460.55, 468.37, 445.23, 408.92, 417.78, 429.24, 445.17, 489.88, 485.56, 449.72, 435.8, 439.2, 449.36, 416.56, 397.21, 417.07, 411.82, 402.51, 396.73, 391.2, 367.96, 372.11, 360.59, 348.95, 400.62, 376.3, 390.82, 428.35, 422.24, 426.01, 415.88, 391, 406.43, 405.05, 411.84, 402.9, 404.89] },
      velocityScore: { '1D': 0, '1W': -1.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 364.8, revenueGrowth: 16, eps: 1.11, grossMargin: 19, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 0.97, IGPT: false, IVES: 4.51, ALAI: 2.67, CHAT: false, AIFD: 1.95, SPRX: false, AOTG: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 4.85, proScore: 4.85, coverage: 1,
      price: 963.51, weeklyPrices: [948.80, 991.64, 979.30, 937.00, 963.51], weeklyChange: 1.55, dayChange: -1.99, sortRank: 0, periodReturns: { '1M': -11.4, 'YTD': 237.6, '6M': 186.2, '1Y': 702.2 },
      priceHistory: { '1D': [983.12, 966.23, 963.51], '1W': [948.8, 991.64, 979.3, 937, 963.51], '1M': [1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 938.38, 948.8, 991.64, 979.3, 937, 963.51], 'YTD': [285.41, 327.02, 362.75, 389.09, 437.8, 383.5, 420.95, 429, 400.77, 405.35, 444.27, 355.46, 366.24, 426.56, 448.42, 524.56, 576.45, 766.58, 698.74, 928.41, 996, 995.87, 1133.99, 1132.33, 938.38, 963.51], '6M': [336.63, 399.65, 414.88, 394.69, 411.66, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 1035.5, 949.28, 981.61, 1211.38, 1145.28, 938.38, 963.51], '1Y': [120.11, 109.22, 111.96, 109.06, 127.75, 122.05, 116.42, 118.48, 135.24, 158.82, 166.41, 167.32, 185.69, 187.06, 202.29, 221.91, 234.7, 253.3, 241.95, 223.93, 239.49, 252.42, 232.51, 276.27, 285.41, 327.02, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 1035.5, 864.01, 981.61, 1211.38, 1145.28, 938.38, 963.51] },
      velocityScore: { '1D': 1.3, '1W': 0.2, '1M': -19.3, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 20.8, revenueGrowth: 346, eps: 46.4, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { SOXX: 8.21, PSI: 5.64, XSD: 2.65, DRAM: 2.9 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 5.7, proScore: 4.28, coverage: 0.75,
      price: 555.44, weeklyPrices: [517.41, 546.72, 557.89, 534.39, 555.44], weeklyChange: 7.35, dayChange: 1.33, sortRank: 0, periodReturns: { '1M': 1.5, 'YTD': 159.4, '6M': 143.7, '1Y': 256.9 },
      priceHistory: { '1D': [548.13, 557.07, 555.44], '1W': [517.41, 546.72, 557.89, 534.39, 555.44], '1M': [547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 516.11, 517.41, 546.72, 557.89, 534.39, 555.44], 'YTD': [214.16, 204.68, 231.83, 251.31, 246.27, 216, 200.12, 210.86, 202.07, 197.74, 205.27, 203.77, 217.5, 246.83, 274.95, 334.63, 341.54, 448.29, 414.05, 495.54, 523.2, 488.45, 537.37, 521.58, 516.11, 555.44], '6M': [227.92, 259.68, 236.73, 208.44, 207.32, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 278.39, 347.81, 360.54, 455.19, 424.1, 467.51, 510.13, 490.33, 511.57, 551.63, 539.49, 516.11, 555.44], '1Y': [155.61, 154.72, 177.44, 174.31, 174.95, 166.55, 163.36, 162.32, 155.82, 160.46, 160.9, 161.79, 211.51, 218.09, 238.03, 258.01, 259.65, 243.98, 240.52, 215.05, 215.24, 221.62, 209.17, 214.9, 214.16, 204.68, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 200.21, 192.43, 193.39, 201.33, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 467.51, 510.13, 466.38, 511.57, 551.63, 539.49, 516.11, 555.44] },
      velocityScore: { '1D': -0.5, '1W': 2.1, '1M': -2.9, '6M': null }, isNew: false,
      marketCap: '$906B', pe: 184.5, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 8.61, PSI: 5.59, XSD: 2.91, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 5.24, proScore: 3.93, coverage: 0.75,
      price: 213.09, weeklyPrices: [204.12, 202.78, 210.96, 203.53, 213.09], weeklyChange: 4.39, dayChange: 0.61, sortRank: 0, periodReturns: { '1M': 0.3, 'YTD': 14.3, '6M': 13.9, '1Y': 24.8 },
      priceHistory: { '1D': [211.8, 213.36, 213.09], '1W': [204.12, 202.78, 210.96, 203.53, 213.09], '1M': [212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83, 195.55, 196.93, 204.12, 202.78, 210.96, 203.53, 213.09], 'YTD': [186.5, 185.04, 186.23, 186.47, 185.61, 190.04, 187.98, 195.56, 183.04, 183.14, 178.56, 171.24, 177.39, 189.31, 202.06, 216.61, 198.48, 220.78, 220.61, 212.6, 218.66, 204.87, 210.69, 192.53, 196.93, 213.09], '6M': [187.05, 187.67, 191.13, 185.41, 182.81, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 201.68, 208.27, 198.45, 215.2, 225.32, 215.33, 224.36, 208.64, 205.19, 208.65, 194.97, 196.93, 213.09], '1Y': [170.7, 167.03, 175.51, 178.26, 183.16, 175.64, 179.81, 170.78, 170.76, 174.88, 178.43, 186.58, 185.04, 180.03, 181.16, 201.03, 206.88, 199.05, 186.6, 182.55, 181.46, 184.97, 177.72, 189.21, 186.5, 185.04, 183.14, 184.84, 192.51, 171.88, 186.94, 189.82, 177.19, 177.82, 180.25, 172.7, 171.24, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 225.32, 215.33, 224.36, 205.1, 205.19, 208.65, 194.97, 196.93, 213.09] },
      velocityScore: { '1D': 1, '1W': 3.4, '1M': 33.7, '6M': null }, isNew: false,
      marketCap: '$5.2T', pe: 32.7, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.47,
      etfPresence: { SOXX: 8.13, PSI: 5.07, XSD: 2.53, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.14, proScore: 3.1, coverage: 0.75,
      price: 108.21, weeklyPrices: [110.24, 112.54, 109.84, 103.12, 108.21], weeklyChange: -1.84, dayChange: 0.42, sortRank: 0, periodReturns: { '1M': -15.4, 'YTD': 193.3, '6M': 123.9, '1Y': 372.1 },
      priceHistory: { '1D': [107.76, 108.14, 108.21], '1W': [110.24, 112.54, 109.84, 103.12, 108.21], '1M': [127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 127.02, 120.35, 122.2, 110.39, 110.24, 112.54, 109.84, 103.12, 108.21], 'YTD': [36.9, 41.11, 46.96, 42.49, 48.81, 50.24, 45.46, 46.88, 45.58, 45.25, 46.18, 44.1, 50.38, 65.18, 65.7, 84.99, 95.78, 120.61, 110.8, 121.77, 111.78, 116.96, 133.99, 128.32, 110.39, 108.21], '6M': [48.32, 45.07, 46.47, 50.59, 46.79, 44.11, 45.61, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 68.5, 82.54, 99.62, 124.92, 108.77, 119.84, 109.33, 110.27, 124.57, 140.94, 131.72, 110.39, 108.21], '1Y': [22.92, 23.24, 20.41, 20.19, 21.81, 25.31, 24.55, 24.21, 24.44, 25.27, 29.34, 33.55, 37.17, 35.63, 38.12, 41.53, 39.5, 38.45, 34.71, 35.79, 43.47, 40.5, 37.31, 36.35, 36.9, 41.11, 48.72, 54.32, 48.66, 48.24, 46.48, 44.11, 45.61, 43.42, 45.77, 43.87, 44.1, 50.38, 62.38, 68.5, 82.54, 99.62, 124.92, 108.77, 119.84, 109.33, 99.17, 124.57, 140.94, 131.72, 110.39, 108.21] },
      velocityScore: { '1D': 1.3, '1W': -6.3, '1M': -18.4, '6M': null }, isNew: false,
      marketCap: '$544B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 5.51, PSI: 4.48, XSD: 2.42, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.68, proScore: 2.76, coverage: 0.75,
      price: 397.46, weeklyPrices: [385.40, 393.64, 395.65, 386.01, 397.46], weeklyChange: 3.13, dayChange: 1.2, sortRank: 0, periodReturns: { '1M': -7, 'YTD': 46.6, '6M': 31.6, '1Y': 65.3 },
      priceHistory: { '1D': [392.75, 398.17, 397.46], '1W': [385.4, 393.64, 395.65, 386.01, 397.46], '1M': [427.58, 416, 414.45, 434.46, 445.48, 407.26, 413.16, 417.93, 386.91, 391.78, 397.17, 388.98, 377.16, 388.83, 379.03, 385.4, 393.64, 395.65, 386.01, 397.46], 'YTD': [271.2, 299.16, 300.25, 304.01, 316.86, 322.97, 346.37, 360.8, 341.51, 307.27, 310.44, 313.42, 318.34, 350.01, 381.05, 392.59, 397.02, 419.65, 414.31, 416.88, 428.76, 412.13, 434.46, 386.91, 379.03, 397.46], '6M': [302.1, 305.6, 310.88, 320.45, 337.1, 355.03, 355.79, 315.81, 306.07, 309.43, 307.44, 327.36, 350.01, 371.45, 399.57, 397.69, 416.52, 417.49, 397.07, 402.69, 403.89, 417.79, 445.48, 391.78, 379.03, 397.46], '1Y': [240.42, 235.5, 230.75, 220.68, 232.04, 230.44, 254.49, 248.32, 248.18, 244.1, 246.78, 245.7, 233.75, 235.4, 246.37, 239.35, 233.61, 232, 229.94, 239.4, 272.97, 276.24, 278.4, 276.73, 271.2, 299.16, 297.99, 308.52, 318.7, 322.12, 331.36, 355.03, 355.79, 315.81, 306.07, 309.43, 313.42, 318.34, 350.14, 371.45, 399.57, 397.69, 416.52, 417.49, 397.07, 402.69, 401.39, 417.79, 445.48, 391.78, 379.03, 397.46] },
      velocityScore: { '1D': -1.4, '1W': -0.7, '1M': 15.5, '6M': null }, isNew: false,
      marketCap: '$194B', pe: 59.1, revenueGrowth: 37, eps: 6.72, grossMargin: 64, dividendYield: 1.12,
      etfPresence: { SOXX: 3.85, PSI: 4.81, XSD: 2.39, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.7% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 6.04, proScore: 3.02, coverage: 0.5,
      price: 592.49, weeklyPrices: [570.50, 588.66, 602.50, 575.39, 592.49], weeklyChange: 3.85, dayChange: -0.54, sortRank: 0, periodReturns: { '1M': 1.1, 'YTD': 130.5, '6M': 85.7, '1Y': 197.3 },
      priceHistory: { '1D': [595.7, 596.96, 592.49], '1W': [570.5, 588.66, 602.5, 575.39, 592.49], '1M': [585.78, 568.23, 592.92, 617.11, 640.18, 585.88, 588.97, 668, 626.84, 694.64, 723, 650.91, 603.04, 592.79, 554.5, 570.5, 588.66, 602.5, 575.39, 592.49], 'YTD': [256.99, 281.64, 327.01, 319.46, 328.4, 330.57, 369.3, 394.95, 357.76, 337.27, 357.21, 338.55, 348.47, 395.73, 391.62, 404.86, 391.38, 431.2, 406.91, 448.25, 501.7, 552.64, 617.11, 626.84, 554.5, 592.49], '6M': [319.08, 322.38, 322.32, 322.51, 354.91, 375.38, 372.3, 324.74, 341.53, 357.06, 337.17, 352.62, 395.73, 396.94, 417.04, 389.08, 435.44, 436.62, 432.16, 458.17, 492.17, 567.25, 640.18, 694.64, 554.5, 592.49], '1Y': [199.29, 187.14, 188.41, 179.15, 188.45, 162.22, 161.99, 157.57, 163.5, 173.54, 200.87, 204.74, 211.56, 218.19, 226, 227.64, 237.71, 235.08, 228.71, 230.91, 265.33, 267.14, 258.84, 260.23, 256.99, 281.64, 301.89, 318.79, 341.34, 303.99, 328.39, 375.38, 372.3, 324.74, 341.53, 357.06, 338.55, 348.47, 399.49, 396.94, 417.04, 389.08, 435.44, 436.62, 432.16, 458.17, 453.01, 567.25, 640.18, 694.64, 554.5, 592.49] },
      velocityScore: { '1D': 0, '1W': 2, '1M': 6.3, '6M': null }, isNew: false,
      marketCap: '$470B', pe: 55.9, revenueGrowth: 11, eps: 10.6, grossMargin: 49, dividendYield: 0.36,
      etfPresence: { SOXX: 5.36, PSI: 6.73, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 5.38, proScore: 2.69, coverage: 0.5,
      price: 227.44, weeklyPrices: [221.18, 229.52, 231.52, 222.25, 227.44], weeklyChange: 2.83, dayChange: -1.27, sortRank: 0, periodReturns: { '1M': -11.3, 'YTD': 87.2, '6M': 47.2, '1Y': 142.9 },
      priceHistory: { '1D': [230.37, 229.26, 227.44], '1W': [221.18, 229.52, 231.52, 222.25, 227.44], '1M': [256.42, 237.33, 238.73, 259.56, 269.16, 244.49, 240.48, 258.8, 248.64, 278.39, 301.71, 266.19, 235.55, 233.31, 216.47, 221.18, 229.52, 231.52, 222.25, 227.44], 'YTD': [121.51, 132.46, 156.78, 154.3, 141.04, 144.02, 148.03, 154.67, 147.59, 140.96, 151.15, 145.11, 151.68, 176.88, 180.53, 190, 171.33, 181.13, 174.06, 195.72, 213.11, 241.16, 259.56, 248.64, 216.47, 227.44], '6M': [154.5, 151.28, 142.79, 144.29, 146.41, 149.6, 152.46, 134.46, 141.86, 149.87, 144.32, 154.01, 176.88, 179.14, 193.5, 172.63, 186.92, 180.43, 188.84, 194, 210.81, 254.54, 269.16, 278.39, 216.47, 227.44], '1Y': [93.65, 89.22, 91.61, 88.34, 93.55, 87.61, 87.96, 84.64, 91.77, 99.06, 107.12, 107.86, 108.47, 102.57, 114.74, 120.6, 121.91, 121.79, 113.37, 113.67, 118.99, 122.56, 122.34, 126.88, 121.51, 132.46, 143.45, 150, 168.47, 133.1, 145.09, 149.6, 152.46, 134.46, 141.86, 149.87, 145.11, 151.68, 173.73, 179.14, 193.5, 172.63, 186.92, 180.43, 188.84, 194, 192.92, 254.54, 269.16, 278.39, 216.47, 227.44] },
      velocityScore: { '1D': 0.4, '1W': 1.5, '1M': 7.2, '6M': null }, isNew: false,
      marketCap: '$297B', pe: 64.6, revenueGrowth: 12, eps: 3.52, grossMargin: 61, dividendYield: 0.4,
      etfPresence: { SOXX: 4.86, PSI: 5.89, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 4.96, proScore: 2.48, coverage: 0.5,
      price: 342.38, weeklyPrices: [333.15, 353.17, 350.33, 329.92, 342.38], weeklyChange: 2.77, dayChange: -1.08, sortRank: 0, periodReturns: { '1M': -12, 'YTD': 100, '6M': 57.4, '1Y': 238.8 },
      priceHistory: { '1D': [346.1, 344.41, 342.38], '1W': [333.15, 353.17, 350.33, 329.92, 342.38], '1M': [388.92, 369.34, 374.18, 389.04, 409.54, 371.33, 374.8, 401.82, 379.09, 410.91, 433.33, 391.26, 351.41, 350.2, 326.13, 333.15, 353.17, 350.33, 329.92, 342.38], 'YTD': [171.18, 200.96, 222.96, 222.87, 237.5, 229.28, 240.09, 249.48, 222.99, 209.49, 233.99, 211.62, 218.44, 267.32, 263.16, 259.47, 258.57, 289.24, 273.38, 318.93, 336.41, 362.52, 389.04, 379.09, 326.13, 342.38], '6M': [217.47, 217.94, 233.46, 231.01, 235.53, 244.92, 233.89, 199.33, 212.2, 228.36, 211.41, 220.65, 267.32, 267.6, 267.78, 256.72, 294.05, 284.72, 305.35, 317.12, 324.45, 366.81, 409.54, 410.91, 326.13, 342.38], '1Y': [101.07, 97.69, 98.94, 96.68, 105.28, 100.33, 101.28, 97.03, 105.57, 120.47, 131.93, 133.9, 140.35, 138.31, 145.04, 155.62, 161.24, 166.37, 147.46, 150.38, 158.19, 165.81, 163.26, 175.16, 171.18, 200.96, 208.79, 220.7, 248.17, 213.31, 231.29, 244.92, 233.89, 199.33, 212.2, 228.36, 211.62, 218.44, 263.66, 267.6, 267.78, 256.72, 294.05, 284.72, 305.35, 317.12, 303.28, 366.81, 409.54, 410.91, 326.13, 342.38] },
      velocityScore: { '1D': 1.6, '1W': 1.2, '1M': 7.8, '6M': null }, isNew: false,
      marketCap: '$428B', pe: 64.6, revenueGrowth: 24, eps: 5.3, grossMargin: 50, dividendYield: 0.3,
      etfPresence: { SOXX: 4.41, PSI: 5.51, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 4.78, proScore: 2.39, coverage: 0.5,
      price: 394.2, weeklyPrices: [388.69, 401.11, 399.97, 384.05, 394.20], weeklyChange: 1.42, dayChange: 1.31, sortRank: 0, periodReturns: { '1M': 0.1, 'YTD': 13.9, '6M': 14.9, '1Y': 40.3 },
      priceHistory: { '1D': [389.11, 394.3, 394.2], '1W': [388.69, 401.11, 399.97, 384.05, 394.2], '1M': [393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45, 373.9, 370.78, 388.69, 401.11, 399.97, 384.05, 394.2], 'YTD': [346.1, 332.48, 351.71, 324.85, 331.11, 343.94, 333.51, 332.31, 317.53, 335.97, 319.84, 309.42, 314.55, 379.75, 399.63, 418.2, 416.5, 419.3, 411.07, 421.86, 418.91, 385.57, 411.35, 365.02, 370.78, 394.2], '6M': [343.02, 320.05, 331.3, 332.92, 325.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 406.54, 422.76, 421.28, 430, 425.19, 414.14, 459.97, 396.6, 382.07, 392.13, 372.45, 370.78, 394.2], '1Y': [280.94, 278.59, 297.42, 292.93, 312.83, 294.91, 294.23, 298.24, 336.67, 360, 338.94, 329.91, 336.41, 344.13, 342.66, 372.97, 362.55, 358.39, 342.65, 377.96, 381.57, 406.29, 341.3, 349.32, 346.1, 332.48, 339.89, 325.49, 330.73, 310.51, 331.17, 332.65, 319.55, 330.48, 322.16, 310.51, 309.42, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 425.19, 414.14, 459.97, 385.73, 382.07, 392.13, 372.45, 370.78, 394.2] },
      velocityScore: { '1D': -1.2, '1W': 2.1, '1M': 30.6, '6M': null }, isNew: false,
      marketCap: '$1.9T', pe: 65.8, revenueGrowth: 48, eps: 5.99, grossMargin: 76, dividendYield: 0.67,
      etfPresence: { SOXX: 7.06, PSI: false, XSD: 2.5, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 3.32, proScore: 1.66, coverage: 0.5,
      price: 306.55, weeklyPrices: [301.32, 308.53, 311.46, 298.57, 306.55], weeklyChange: 1.74, dayChange: 0.33, sortRank: 0, periodReturns: { '1M': -2.2, 'YTD': 76.7, '6M': 62.1, '1Y': 40.4 },
      priceHistory: { '1D': [305.55, 307.26, 306.55], '1W': [301.32, 308.53, 311.46, 298.57, 306.55], '1M': [313.34, 305.71, 301.88, 322.86, 332.28, 304.36, 303.11, 311.81, 285.43, 285.48, 298.07, 298.41, 293.08, 303.5, 293.3, 301.32, 308.53, 311.46, 298.57, 306.55], 'YTD': [173.49, 188.45, 191.58, 196.59, 225.01, 218.77, 223.32, 213.9, 202.39, 190.05, 188.29, 193.41, 194.87, 216.71, 233.7, 269.5, 280.89, 295.17, 302.31, 317.45, 305.37, 297.1, 322.86, 285.43, 293.3, 306.55], '6M': [189.12, 193.31, 215.55, 221.44, 226.16, 219.73, 212.11, 193.23, 190.78, 187.19, 190.33, 199.42, 216.71, 229.82, 277.14, 281.02, 287.8, 302.73, 309.21, 293.2, 290.9, 301.12, 332.28, 285.48, 293.3, 306.55], '1Y': [218.36, 214.92, 191.38, 185.4, 192.97, 195.94, 205.97, 199.81, 185.03, 177.63, 182.04, 183.73, 177.05, 173.94, 180.84, 166.91, 161.46, 160.58, 154.99, 161.26, 175.26, 179.52, 177.56, 177.08, 173.49, 188.45, 193.45, 194.99, 218.97, 223.98, 223, 219.73, 212.11, 193.23, 190.78, 187.19, 193.41, 194.87, 214.73, 229.82, 277.14, 281.02, 287.8, 302.73, 309.21, 293.2, 285.06, 301.12, 332.28, 285.48, 293.3, 306.55] },
      velocityScore: { '1D': 0, '1W': 1.2, '1M': 17.7, '6M': null }, isNew: false,
      marketCap: '$279B', pe: 52.5, revenueGrowth: 19, eps: 5.84, grossMargin: 57, dividendYield: 1.86,
      etfPresence: { SOXX: 4.05, PSI: false, XSD: 2.59, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 3.26, proScore: 1.63, coverage: 0.5,
      price: 215.5, weeklyPrices: [231.71, 243.27, 235.81, 217.53, 215.50], weeklyChange: -7, dayChange: -3.12, sortRank: 0, periodReturns: { '1M': -30.2, 'YTD': 153.6, '6M': 168.1, '1Y': 197.6 },
      priceHistory: { '1D': [222.44, 215.74, 215.5], '1W': [231.71, 243.27, 235.81, 217.53, 215.5], '1M': [308.88, 278.67, 289.54, 310.58, 307.86, 279.04, 276.7, 281.26, 266.77, 277.75, 297.89, 272.05, 245.29, 249.27, 230.7, 231.71, 243.27, 235.81, 217.53, 215.5], 'YTD': [84.98, 83.45, 80.46, 81.77, 78.66, 82.35, 79.09, 80.92, 78.09, 87.67, 89.53, 97.68, 107.11, 131.3, 147.84, 158.21, 163.66, 164.5, 176.27, 198.7, 316.43, 280.71, 310.58, 266.77, 230.7, 215.5], '6M': [80.38, 80.23, 78.92, 80.28, 78.61, 79.48, 81.69, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 139.69, 164.31, 164.95, 170.13, 176.89, 196.33, 219.43, 288.85, 279.7, 307.86, 277.75, 230.7, 215.5], '1Y': [72.41, 71.99, 76.34, 76.63, 77.81, 72.07, 72.95, 64.6, 66.84, 68.86, 74.62, 84.07, 86.97, 86.22, 84.26, 88.46, 90.37, 93.23, 83.45, 83.79, 92.89, 88.9, 84.07, 87.68, 84.98, 83.45, 81.21, 83.1, 81.34, 74.21, 78.23, 79.48, 81.69, 89.57, 87.86, 87.91, 97.68, 107.11, 128.49, 139.69, 164.31, 164.95, 170.13, 176.89, 196.33, 219.43, 263.47, 279.7, 307.86, 277.75, 230.7, 215.5] },
      velocityScore: { '1D': 0, '1W': -6.3, '1M': -48.7, '6M': null }, isNew: false,
      marketCap: '$193B', pe: 74.1, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.11,
      etfPresence: { SOXX: 4.4, PSI: false, XSD: 2.12, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.98, proScore: 1.49, coverage: 0.5,
      price: 287.81, weeklyPrices: [283.81, 290.54, 292.26, 278.39, 287.81], weeklyChange: 1.41, dayChange: 1.39, sortRank: 0, periodReturns: { '1M': -8.9, 'YTD': 32.6, '6M': 20.6, '1Y': 30.2 },
      priceHistory: { '1D': [283.87, 286.43, 287.81], '1W': [283.81, 290.54, 292.26, 278.39, 287.81], '1M': [315.88, 302.89, 298.2, 313.27, 323.24, 299.94, 294.06, 298.64, 277.02, 278.37, 281.03, 279.18, 273.36, 280.51, 273.15, 283.81, 290.54, 292.26, 278.39, 287.81], 'YTD': [217.06, 237.89, 237.11, 231.05, 231.08, 228.91, 237.33, 235.07, 216.37, 191.22, 192.35, 196.92, 194.55, 208, 221.34, 236.87, 290.76, 294.23, 294.28, 329.24, 322.22, 302.55, 313.27, 277.02, 273.15, 287.81], '6M': [238.6, 232.48, 226.14, 224.32, 244.43, 232.27, 227.01, 201.74, 190.86, 191.37, 191.66, 197.08, 208, 216.03, 244.04, 295.24, 294.75, 291.5, 316.47, 311.38, 301.14, 304.86, 323.24, 278.37, 273.15, 287.81], '1Y': [221.06, 228, 226.74, 208.47, 220.05, 229.27, 236.67, 232.66, 223.69, 220.99, 225.62, 227.73, 219.58, 216.11, 222.34, 212.96, 210.39, 205.13, 190.51, 191.56, 215.35, 228.05, 229.75, 225.98, 217.06, 237.89, 240.81, 236.75, 233.5, 222.13, 242.19, 232.27, 227.01, 201.74, 190.86, 191.37, 196.92, 194.55, 204.37, 216.03, 244.04, 295.24, 294.75, 291.5, 316.47, 311.38, 295.96, 304.86, 323.24, 278.37, 273.15, 287.81] },
      velocityScore: { '1D': 0, '1W': 1.4, '1M': 9.6, '6M': null }, isNew: false,
      marketCap: '$73B', pe: 27.5, revenueGrowth: 12, eps: 10.45, grossMargin: 56, dividendYield: 1.43,
      etfPresence: { SOXX: 3.58, PSI: false, XSD: 2.38, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.76, proScore: 1.38, coverage: 0.5,
      price: 1394.04, weeklyPrices: [1315.51, 1374.13, 1352.74, 1291.38, 1394.04], weeklyChange: 5.97, dayChange: 1.28, sortRank: 0, periodReturns: { '1M': -15.6, 'YTD': 53.8, '6M': 38.1, '1Y': 94.3 },
      priceHistory: { '1D': [1376.41, 1400, 1394.04], '1W': [1315.51, 1374.13, 1352.74, 1291.38, 1394.04], '1M': [1652.29, 1498.77, 1448.21, 1563.7, 1537.88, 1423.76, 1434.95, 1438.3, 1313.32, 1312.77, 1382.36, 1331.73, 1288.16, 1346.13, 1272.81, 1315.51, 1374.13, 1352.74, 1291.38, 1394.04], 'YTD': [906.36, 959.09, 1033.17, 1068.14, 1173.22, 1206.18, 1188.32, 1231.95, 1099.02, 1033.88, 1092.69, 1058.28, 1118.49, 1372.23, 1490.86, 1587.57, 1573.3, 1599.52, 1468.11, 1620.17, 1652.6, 1589.55, 1563.7, 1313.32, 1272.81, 1394.04], '6M': [1009.54, 1063.74, 1124.15, 1229.82, 1171.47, 1204.1, 1142.74, 1023.16, 1052.59, 1068.85, 1053.01, 1180.03, 1372.23, 1468.35, 1632.06, 1583.48, 1600.84, 1550.02, 1589.81, 1542.39, 1559.18, 1577.32, 1537.88, 1312.77, 1272.81, 1394.04], '1Y': [717.62, 719.98, 724.37, 802.78, 840.56, 844.8, 837.86, 823.65, 857.87, 857.02, 914.27, 920.64, 945.49, 968.25, 1028.67, 1086.36, 1003.93, 976.31, 897.01, 892.97, 952.18, 962.95, 951.36, 943.55, 906.36, 959.09, 983.6, 1076.67, 1183.15, 1155.99, 1155.93, 1204.1, 1142.74, 1023.16, 1052.59, 1068.85, 1058.28, 1118.49, 1353.85, 1468.35, 1632.06, 1583.48, 1600.84, 1550.02, 1589.81, 1542.39, 1481.05, 1577.32, 1537.88, 1312.77, 1272.81, 1394.04] },
      velocityScore: { '1D': 3.8, '1W': 5.3, '1M': 0.7, '6M': null }, isNew: false,
      marketCap: '$68B', pe: 100.3, revenueGrowth: 26, eps: 13.9, grossMargin: 55, dividendYield: 0.58,
      etfPresence: { SOXX: 3.29, PSI: false, XSD: 2.24, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 2.59, proScore: 1.29, coverage: 0.5,
      price: 360.31, weeklyPrices: [417.45, 412.97, 362.05, 361.78, 360.31], weeklyChange: -13.69, dayChange: -0.4, sortRank: 0, periodReturns: { '1M': -7.4, 'YTD': 116.6, '6M': 106.5, '1Y': 290.1 },
      priceHistory: { '1D': [361.78, 364.67, 360.31], '1W': [417.45, 412.97, 362.05, 361.78, 360.31], '1M': [389.2, 361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86, 406.42, 432.74, 382.89, 393.16, 417.45, 412.97, 362.05, 361.78, 360.31], 'YTD': [166.36, 156.73, 182, 163.25, 152.44, 182.86, 129.58, 128.15, 120, 119.9, 126.16, 112.47, 117.99, 166.79, 175.8, 183.31, 215.69, 204.42, 287.48, 349.17, 358.05, 367.15, 439.66, 455.96, 393.16, 360.31], '6M': [174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 215.58, 318.72, 320.09, 346.33, 389.2, 397.02, 483.02, 393.16, 360.31], '1Y': [92.36, 116.91, 118.41, 135.54, 192, 171.06, 178.56, 174.24, 214.49, 238.79, 230.11, 195.8, 212.1, 161.55, 157.51, 168.25, 179.31, 167.55, 139.52, 144.78, 142.94, 167.08, 144.94, 168.83, 166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 118.83, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 215.58, 318.72, 320.09, 346.33, 389.2, 397.02, 483.02, 393.16, 360.31] },
      velocityScore: { '1D': -2.3, '1W': -8.5, '1M': -25, '6M': null }, isNew: false,
      marketCap: '$62B', pe: 243.4, revenueGrowth: 93, eps: 1.48, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.55, PSI: false, XSD: 2.63, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 2.56, proScore: 1.28, coverage: 0.5,
      price: 179.27, weeklyPrices: [186.56, 191.11, 189.16, 183.98, 179.27], weeklyChange: -3.91, dayChange: 0.66, sortRank: 0, periodReturns: { '1M': -18.8, 'YTD': 4.8, '6M': 11.1, '1Y': 16.2 },
      priceHistory: { '1D': [178.1, 178.99, 179.27], '1W': [186.56, 191.11, 189.16, 183.98, 179.27], '1M': [220.81, 214.07, 212.97, 226.11, 221.9, 204.13, 197.41, 204.9, 189.39, 188.72, 184.79, 181.92, 176.25, 186.48, 182.97, 186.56, 191.11, 189.16, 183.98, 179.27], 'YTD': [171.05, 181.87, 159.42, 154.52, 152.62, 138.93, 143.24, 145.82, 139.51, 131.15, 131.28, 130.54, 126.8, 131.24, 137.52, 150.26, 168.38, 210.31, 195.61, 233.4, 242.57, 202.96, 226.11, 189.39, 182.97, 179.27], '6M': [161.39, 155.82, 151.59, 137.34, 140.7, 142.88, 142.36, 135.69, 129.82, 129.9, 127.11, 125.73, 131.24, 136.2, 148.85, 177.01, 219.09, 201.49, 238.16, 228.99, 217.77, 211.72, 221.9, 188.72, 182.97, 179.27], '1Y': [154.3, 157.99, 162.08, 146.71, 153.73, 156.25, 156.42, 158.78, 158.66, 164.14, 169.53, 166.36, 165.46, 161.74, 168.83, 181.03, 180.72, 171.57, 166.75, 165.06, 170.7, 176, 176.12, 174.75, 171.05, 181.87, 164.54, 157.8, 152.22, 136.3, 138.47, 142.88, 142.36, 135.69, 129.82, 129.9, 130.54, 126.8, 128.06, 136.2, 148.85, 177.01, 219.09, 201.49, 238.16, 228.99, 215.94, 211.72, 221.9, 188.72, 182.97, 179.27] },
      velocityScore: { '1D': -5.2, '1W': -5.2, '1M': -12.9, '6M': null }, isNew: false,
      marketCap: '$189B', pe: 19.3, revenueGrowth: -4, eps: 9.3, grossMargin: 55, dividendYield: 2.07,
      etfPresence: { SOXX: 2.88, PSI: false, XSD: 2.24, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.36, proScore: 1.18, coverage: 0.5,
      price: 87.88, weeklyPrices: [85.49, 88.26, 88.59, 84.23, 87.88], weeklyChange: 2.8, dayChange: 0.88, sortRank: 0, periodReturns: { '1M': -12.4, 'YTD': 37.9, '6M': 18, '1Y': 20.2 },
      priceHistory: { '1D': [87.11, 87.9, 87.88], '1W': [85.49, 88.26, 88.59, 84.23, 87.88], '1M': [100.32, 95.63, 94.11, 99.77, 102.71, 93.26, 92.48, 94.12, 87.93, 89.06, 91.2, 88.69, 84.64, 87.59, 84.15, 85.49, 88.26, 88.59, 84.23, 87.88], 'YTD': [63.72, 73.53, 74.7, 74.79, 78.08, 74.41, 79.11, 75.47, 69.9, 62.73, 63.29, 64.2, 65.6, 73.55, 80.39, 86.84, 95.3, 97.7, 91.81, 96.85, 96.3, 92.94, 99.77, 87.93, 84.15, 87.88], '6M': [74.45, 74.71, 75.92, 76.01, 78.56, 77.73, 74.64, 64.77, 61.94, 62.97, 62, 67.22, 73.55, 78.76, 89.44, 93.95, 99.09, 93.85, 93.43, 91.52, 91.37, 95.24, 102.71, 89.06, 84.15, 87.88], '1Y': [73.11, 75.26, 70.68, 67.13, 64.5, 64.71, 68.55, 63.6, 64.76, 64.45, 64.71, 64.22, 64.96, 64.6, 67.52, 63.64, 62.41, 55.41, 51.7, 51.25, 56.71, 66.85, 65.9, 65.35, 63.72, 73.53, 74.68, 75.47, 79.36, 78.04, 78.92, 77.73, 74.64, 64.77, 61.94, 62.97, 64.2, 65.6, 71.56, 78.76, 89.44, 93.95, 99.09, 93.85, 93.43, 91.52, 88.34, 95.24, 102.71, 89.06, 84.15, 87.88] },
      velocityScore: { '1D': 0.9, '1W': 0.9, '1M': 1.7, '6M': null }, isNew: false,
      marketCap: '$48B', pe: 399.5, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 2.09,
      etfPresence: { SOXX: 2.33, PSI: false, XSD: 2.38, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.18, proScore: 1.09, coverage: 0.5,
      price: 234.4, weeklyPrices: [265.65, 257.79, 236.88, 236.18, 234.40], weeklyChange: -11.76, dayChange: -0.75, sortRank: 0, periodReturns: { '1M': -9.6, 'YTD': 62.9, '6M': 57.2, '1Y': 128.5 },
      priceHistory: { '1D': [236.18, 234.94, 234.4], '1W': [265.65, 257.79, 236.88, 236.18, 234.4], '1M': [259.41, 239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.09, 241.91, 265.55, 246.4, 258.69, 265.65, 257.79, 236.88, 236.18, 234.4], 'YTD': [143.89, 141.59, 150.97, 128.02, 119.96, 134.72, 127.91, 123.46, 114.74, 111.57, 107.09, 95.24, 102.46, 134.36, 174.53, 165.92, 193.57, 198.57, 182.98, 222.35, 217.5, 250.81, 302.52, 245.68, 258.69, 234.4], '6M': [149.12, 133.16, 125.28, 111.4, 121.44, 124.05, 114.22, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 210.22, 156.27, 221.64, 226.1, 222.27, 259.41, 272.01, 271.95, 258.69, 234.4], '1Y': [102.59, 92.93, 109.38, 110.29, 125.38, 106.3, 120.1, 124.27, 149.03, 164.42, 162.26, 145.61, 137.2, 129.75, 144.17, 162.18, 164.23, 158.5, 139.56, 154.18, 188.44, 170.29, 140.34, 147.81, 143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.05, 112.27, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 210.22, 156.27, 221.64, 226.1, 222.27, 259.41, 272.01, 271.95, 258.69, 234.4] },
      velocityScore: { '1D': -2.7, '1W': -6.8, '1M': -16.8, '6M': null }, isNew: false,
      marketCap: '$44B', pe: 93.8, revenueGrowth: 157, eps: 2.5, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 1.97, PSI: false, XSD: 2.39, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 1.94, proScore: 0.97, coverage: 0.5,
      price: 93.86, weeklyPrices: [93.79, 97.87, 95.96, 90.37, 93.86], weeklyChange: 0.07, dayChange: 0.14, sortRank: 0, periodReturns: { '1M': -25.4, 'YTD': 73.3, '6M': 55.7, '1Y': 59.3 },
      priceHistory: { '1D': [93.73, 94.01, 93.86], '1W': [93.79, 97.87, 95.96, 90.37, 93.86], '1M': [125.9, 118.25, 112.92, 121.62, 131.55, 117.06, 115.74, 118.74, 90.65, 88.57, 94.54, 94.63, 91.22, 94.69, 91.1, 93.79, 97.87, 95.96, 90.37, 93.86], 'YTD': [54.15, 60.89, 60.33, 61.13, 61.53, 65.1, 70.66, 69.68, 62.53, 57.69, 59.29, 60.87, 62.19, 71.02, 85.56, 98.04, 102.04, 104.11, 106.02, 124.89, 131.82, 115.96, 121.62, 90.65, 91.1, 93.86], '6M': [60.28, 61.98, 59.89, 65.2, 72.21, 69.11, 66.48, 56.87, 58.55, 59.26, 58.35, 63.49, 71.02, 83.01, 98.4, 103.03, 103.2, 113.11, 116.2, 120.92, 120.9, 116.79, 131.55, 88.57, 91.1, 93.86], '1Y': [58.93, 62.45, 58.38, 47.24, 50.01, 49.77, 50.95, 48.94, 48.62, 49.56, 50.42, 49.31, 48.17, 49.54, 55.08, 51.8, 50.46, 48.54, 46.02, 47.39, 51.48, 55.23, 54.56, 55.69, 54.15, 60.89, 60.58, 63.07, 62.2, 63.1, 70.63, 69.11, 66.48, 56.87, 58.55, 59.26, 60.87, 62.19, 68.65, 83.01, 98.4, 103.03, 103.2, 113.11, 116.2, 120.92, 117.26, 116.79, 131.55, 88.57, 91.1, 93.86] },
      velocityScore: { '1D': 2.1, '1W': 0, '1M': -25.4, '6M': null }, isNew: false,
      marketCap: '$37B', pe: 69, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 1.84, PSI: false, XSD: 2.04, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 2, avgWeight: 1.54, proScore: 0.77, coverage: 0.5,
      price: 299.61, weeklyPrices: [317.35, 308.52, 294.24, 301.76, 299.61], weeklyChange: -5.59, dayChange: -0.71, sortRank: 0, periodReturns: { '1M': -22.1, 'YTD': 74.9, '6M': 36.9, '1Y': 118.2 },
      priceHistory: { '1D': [301.76, 300.9, 299.61], '1W': [317.35, 308.52, 294.24, 301.76, 299.61], '1M': [384.77, 368.32, 367.11, 391.41, 396.26, 372.15, 373.08, 390.19, 369.18, 372.59, 380.37, 350.63, 322.26, 327.64, 304.82, 305.23, 317.35, 308.52, 294.24, 301.76, 299.61], 'YTD': [171.28, 167.66, 220.68, 218.89, 228.56, 230.54, 246.76, 253.37, 228.98, 215.94, 224.54, 225.44, 233.04, 263.63, 281.08, 265.61, 303.57, 362.76, 375.71, 391.09, 382.74, 379.87, 396.26, 372.59, 305.23, 299.61], '6M': [218.93, 219.26, 219.06, 235.87, 244.16, 245.53, 258.54, 207.51, 217.8, 218.96, 225.44, 233.04, 263.63, 281.08, 279.44, 291.72, 365.88, 356.25, 409.68, 353.79, 361.86, 384.77, 372.15, 380.37, 305.23, 299.61], '1Y': [137.3, 136.76, 140.02, 137.28, 125.45, 121, 128.33, 131.05, 129.79, 131.18, 128.8, 124.49, 127.97, 131.54, 139.41, 147.88, 144.13, 169.98, 158.22, 165.88, 177.91, 188.08, 175.69, 176.28, 171.28, 167.66, 218.93, 219.26, 219.06, 235.87, 244.16, 245.53, 248.12, 207.51, 217.8, 218.96, 225.44, 233.04, 263.63, 281.08, 279.44, 291.72, 365.88, 356.25, 409.68, 353.79, 361.86, 384.77, 372.15, 380.37, 305.23, 299.61] },
      velocityScore: { '1D': 0, '1W': -3.7, '1M': -18.9, '6M': null }, isNew: false,
      marketCap: '$23B', pe: 127.5, revenueGrowth: 23, eps: 2.35, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: 1.05, PSI: false, XSD: 2.04, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RMBS', name: 'RAMBUS INC', easyScore: 2, avgWeight: 1.2, proScore: 0.6, coverage: 0.5,
      price: 105.35, weeklyPrices: [109.64, 114.13, 112.10, 103.11, 105.35], weeklyChange: -3.91, dayChange: -0.03, sortRank: 0, periodReturns: { '1M': -26.5, 'YTD': 14.6, '6M': 2.2, '1Y': 63.3 },
      priceHistory: { '1D': [105.38, 105.66, 105.35], '1W': [109.64, 114.13, 112.1, 103.11, 105.35], '1M': [143.29, 132.48, 130.1, 141.17, 140.35, 128.21, 124.52, 123.69, 114.73, 123.9, 132.74, 123.83, 112.92, 113.25, 105.93, 109.64, 114.13, 112.1, 103.11, 105.35], 'YTD': [91.89, 91.34, 107.99, 114.19, 113.71, 110.92, 104.34, 101.09, 92.04, 89.78, 94.62, 91.44, 93.03, 113.16, 126.87, 141.31, 111.5, 130.28, 122.03, 148.66, 169.35, 144.47, 141.17, 114.73, 105.93, 105.35], '6M': [103.07, 115.31, 113.83, 107.1, 101.95, 102.64, 99.66, 88.12, 94.01, 91.7, 89.73, 92.22, 113.16, 126.93, 158.4, 111.93, 129.25, 127.05, 142.98, 147.48, 152.03, 146.56, 140.35, 123.9, 105.93, 105.35], '1Y': [64.53, 66.61, 73.15, 73.79, 76.44, 69.78, 73.3, 73.49, 74.55, 97.05, 102.62, 104.2, 96.84, 94.85, 97.51, 103.72, 105.76, 110.6, 91.13, 92.75, 96.21, 104.71, 94.69, 94.19, 91.89, 91.34, 100.62, 124.77, 121.6, 98.1, 95.8, 102.64, 99.66, 88.12, 94.01, 91.7, 91.44, 93.03, 110.44, 126.93, 158.4, 111.93, 129.25, 127.05, 142.98, 147.48, 145.31, 146.56, 140.35, 123.9, 105.93, 105.35] },
      velocityScore: { '1D': null, '1W': null, '1M': -23.1, '6M': null }, isNew: true,
      marketCap: '$11B', pe: 50.2, revenueGrowth: 8, eps: 2.1, grossMargin: 80, dividendYield: null,
      etfPresence: { SOXX: 0.57, PSI: false, XSD: 1.83, DRAM: false },
      tonyNote: 'RAMBUS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 8, avgWeight: 5.91, proScore: 2.78, coverage: 0.471,
      price: 963.51, weeklyPrices: [948.80, 991.64, 979.30, 937.00, 963.51], weeklyChange: 1.55, dayChange: -1.99, sortRank: 0, periodReturns: { '1M': -11.4, 'YTD': 237.6, '6M': 186.2, '1Y': 702.2 },
      priceHistory: { '1D': [983.12, 966.23, 963.51], '1W': [948.8, 991.64, 979.3, 937, 963.51], '1M': [1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 938.38, 948.8, 991.64, 979.3, 937, 963.51], 'YTD': [285.41, 327.02, 362.75, 389.09, 437.8, 383.5, 420.95, 429, 400.77, 405.35, 444.27, 355.46, 366.24, 426.56, 448.42, 524.56, 576.45, 766.58, 698.74, 928.41, 996, 995.87, 1133.99, 1132.33, 938.38, 963.51], '6M': [336.63, 399.65, 414.88, 394.69, 411.66, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 1035.5, 949.28, 981.61, 1211.38, 1145.28, 938.38, 963.51], '1Y': [120.11, 109.22, 111.96, 109.06, 127.75, 122.05, 116.42, 118.48, 135.24, 158.82, 166.41, 167.32, 185.69, 187.06, 202.29, 221.91, 234.7, 253.3, 241.95, 223.93, 239.49, 252.42, 232.51, 276.27, 285.41, 327.02, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 1035.5, 864.01, 981.61, 1211.38, 1145.28, 938.38, 963.51] },
      velocityScore: { '1D': 0.4, '1W': 0.7, '1M': 24.1, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 20.8, revenueGrowth: 346, eps: 46.4, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { PTF: 4.98, WCLD: false, IGV: false, FDTX: 9.33, GTEK: false, ARKK: false, MARS: false, FRWD: 4.42, BCTK: 4.41, FWD: false, CBSE: false, FCUS: 4.32, WGMI: false, CNEQ: 2.49, SGRT: 6.76, SPMO: 10.58, XMMO: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 7, avgWeight: 6.53, proScore: 2.69, coverage: 0.412,
      price: 213.09, weeklyPrices: [204.12, 202.78, 210.96, 203.53, 213.09], weeklyChange: 4.39, dayChange: 0.61, sortRank: 0, periodReturns: { '1M': 0.3, 'YTD': 14.3, '6M': 13.9, '1Y': 24.8 },
      priceHistory: { '1D': [211.8, 213.36, 213.09], '1W': [204.12, 202.78, 210.96, 203.53, 213.09], '1M': [212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83, 195.55, 196.93, 204.12, 202.78, 210.96, 203.53, 213.09], 'YTD': [186.5, 185.04, 186.23, 186.47, 185.61, 190.04, 187.98, 195.56, 183.04, 183.14, 178.56, 171.24, 177.39, 189.31, 202.06, 216.61, 198.48, 220.78, 220.61, 212.6, 218.66, 204.87, 210.69, 192.53, 196.93, 213.09], '6M': [187.05, 187.67, 191.13, 185.41, 182.81, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 201.68, 208.27, 198.45, 215.2, 225.32, 215.33, 224.36, 208.64, 205.19, 208.65, 194.97, 196.93, 213.09], '1Y': [170.7, 167.03, 175.51, 178.26, 183.16, 175.64, 179.81, 170.78, 170.76, 174.88, 178.43, 186.58, 185.04, 180.03, 181.16, 201.03, 206.88, 199.05, 186.6, 182.55, 181.46, 184.97, 177.72, 189.21, 186.5, 185.04, 183.14, 184.84, 192.51, 171.88, 186.94, 189.82, 177.19, 177.82, 180.25, 172.7, 171.24, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 225.32, 215.33, 224.36, 205.1, 205.19, 208.65, 194.97, 196.93, 213.09] },
      velocityScore: { '1D': 1.1, '1W': 6.3, '1M': 17.5, '6M': null }, isNew: false,
      marketCap: '$5.2T', pe: 32.7, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.47,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.09, GTEK: false, ARKK: 1.69, MARS: false, FRWD: 8.89, BCTK: 6.2, FWD: false, CBSE: false, FCUS: false, WGMI: 2.33, CNEQ: 14.21, SGRT: false, SPMO: 8.27, XMMO: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 7, avgWeight: 4.38, proScore: 1.8, coverage: 0.412,
      price: 426.33, weeklyPrices: [436.98, 436.96, 434.11, 421.58, 426.33], weeklyChange: -2.44, dayChange: 1.34, sortRank: 0, periodReturns: { '1M': -3.4, 'YTD': 40.3, '6M': 24.8, '1Y': 79.9 },
      priceHistory: { '1D': [420.7, 427.05, 426.33], '1W': [436.98, 436.96, 434.11, 421.58, 426.33], '1M': [441.4, 425.83, 432.15, 462.12, 467.67, 436.39, 440.83, 434.99, 432.35, 455.1, 477.57, 444.23, 434.16, 451.79, 432.57, 436.98, 436.96, 434.11, 421.58, 426.33], 'YTD': [303.89, 318.01, 342.4, 332.71, 341.36, 355.41, 362.26, 387.73, 357.44, 336.71, 338.79, 326.11, 339.04, 369.57, 366.24, 404.98, 401.61, 397.28, 392.61, 422.73, 444.92, 421.07, 462.12, 432.35, 432.57, 426.33], '6M': [341.64, 334.87, 330.56, 348.85, 366.36, 370.54, 374.58, 338.89, 338.31, 329.24, 326.74, 341.76, 369.57, 370.5, 402.46, 397.67, 411.68, 404.35, 404.52, 435.63, 426.8, 423.93, 467.67, 455.1, 432.57, 426.33], '1Y': [236.95, 234.6, 241.33, 232.47, 244.29, 232.7, 235.59, 228.39, 250.92, 262.06, 282.71, 279.29, 294.03, 295.94, 294.51, 301.53, 304.86, 295.27, 282.01, 284.64, 292.09, 303.41, 286.87, 296.95, 303.89, 318.01, 327.11, 327.37, 339.55, 330.73, 368.1, 370.54, 374.58, 338.89, 338.31, 329.24, 326.11, 339.04, 370.6, 370.5, 402.46, 397.67, 411.68, 404.35, 404.52, 435.63, 415.17, 423.93, 467.67, 455.1, 432.57, 426.33] },
      velocityScore: { '1D': -0.6, '1W': -2.2, '1M': -4.8, '6M': null }, isNew: false,
      marketCap: '$2.2T', pe: 37, revenueGrowth: 35, eps: 11.52, grossMargin: 62, dividendYield: 0.9,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6.39, GTEK: false, ARKK: 0.9, MARS: false, FRWD: 5.92, BCTK: 8.52, FWD: false, CBSE: 2.61, FCUS: false, WGMI: 0.72, CNEQ: 5.61, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 7, avgWeight: 3.95, proScore: 1.63, coverage: 0.412,
      price: 555.44, weeklyPrices: [517.41, 546.72, 557.89, 534.39, 555.44], weeklyChange: 7.35, dayChange: 1.33, sortRank: 0, periodReturns: { '1M': 1.5, 'YTD': 159.4, '6M': 143.7, '1Y': 256.9 },
      priceHistory: { '1D': [548.13, 557.07, 555.44], '1W': [517.41, 546.72, 557.89, 534.39, 555.44], '1M': [547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 516.11, 517.41, 546.72, 557.89, 534.39, 555.44], 'YTD': [214.16, 204.68, 231.83, 251.31, 246.27, 216, 200.12, 210.86, 202.07, 197.74, 205.27, 203.77, 217.5, 246.83, 274.95, 334.63, 341.54, 448.29, 414.05, 495.54, 523.2, 488.45, 537.37, 521.58, 516.11, 555.44], '6M': [227.92, 259.68, 236.73, 208.44, 207.32, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 278.39, 347.81, 360.54, 455.19, 424.1, 467.51, 510.13, 490.33, 511.57, 551.63, 539.49, 516.11, 555.44], '1Y': [155.61, 154.72, 177.44, 174.31, 174.95, 166.55, 163.36, 162.32, 155.82, 160.46, 160.9, 161.79, 211.51, 218.09, 238.03, 258.01, 259.65, 243.98, 240.52, 215.05, 215.24, 221.62, 209.17, 214.9, 214.16, 204.68, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 200.21, 192.43, 193.39, 201.33, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 467.51, 510.13, 466.38, 511.57, 551.63, 539.49, 516.11, 555.44] },
      velocityScore: { '1D': 1.2, '1W': -5.2, '1M': 1.9, '6M': null }, isNew: false,
      marketCap: '$906B', pe: 184.5, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: 3.1, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.25, MARS: false, FRWD: 7.71, BCTK: 3.5, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 1.15, SGRT: 3.55, SPMO: 4.38, XMMO: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 7, avgWeight: 3.93, proScore: 1.62, coverage: 0.412,
      price: 394.2, weeklyPrices: [388.69, 401.11, 399.97, 384.05, 394.20], weeklyChange: 1.42, dayChange: 1.31, sortRank: 0, periodReturns: { '1M': 0.1, 'YTD': 13.9, '6M': 14.9, '1Y': 40.3 },
      priceHistory: { '1D': [389.11, 394.3, 394.2], '1W': [388.69, 401.11, 399.97, 384.05, 394.2], '1M': [393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45, 373.9, 370.78, 388.69, 401.11, 399.97, 384.05, 394.2], 'YTD': [346.1, 332.48, 351.71, 324.85, 331.11, 343.94, 333.51, 332.31, 317.53, 335.97, 319.84, 309.42, 314.55, 379.75, 399.63, 418.2, 416.5, 419.3, 411.07, 421.86, 418.91, 385.57, 411.35, 365.02, 370.78, 394.2], '6M': [343.02, 320.05, 331.3, 332.92, 325.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 406.54, 422.76, 421.28, 430, 425.19, 414.14, 459.97, 396.6, 382.07, 392.13, 372.45, 370.78, 394.2], '1Y': [280.94, 278.59, 297.42, 292.93, 312.83, 294.91, 294.23, 298.24, 336.67, 360, 338.94, 329.91, 336.41, 344.13, 342.66, 372.97, 362.55, 358.39, 342.65, 377.96, 381.57, 406.29, 341.3, 349.32, 346.1, 332.48, 339.89, 325.49, 330.73, 310.51, 331.17, 332.65, 319.55, 330.48, 322.16, 310.51, 309.42, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 425.19, 414.14, 459.97, 385.73, 382.07, 392.13, 372.45, 370.78, 394.2] },
      velocityScore: { '1D': 0.6, '1W': 8.7, '1M': 23.7, '6M': null }, isNew: false,
      marketCap: '$1.9T', pe: 65.8, revenueGrowth: 48, eps: 5.99, grossMargin: 76, dividendYield: 0.67,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.62, GTEK: false, ARKK: 1.11, MARS: false, FRWD: 5.03, BCTK: 7.15, FWD: 2.01, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.92, SGRT: false, SPMO: 6.64, XMMO: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'SPCX', name: 'SPACE EXPLORATION TECHN-CL A', easyScore: 6, avgWeight: 6.62, proScore: 2.34, coverage: 0.353,
      price: 138.82, weeklyPrices: [152.16, 145.30, 139.14, 136.08, 138.82], weeklyChange: -8.77, dayChange: 2.01, sortRank: 0, periodReturns: { '1M': -27.9, 'YTD': -13.7, '6M': -13.7, '1Y': -13.7 },
      priceHistory: { '1D': [136.08, 138.39, 138.82], '1W': [152.16, 145.3, 139.14, 136.08, 138.82], '1M': [192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 149.47, 148.3, 152.16, 145.3, 139.14, 136.08, 138.82], 'YTD': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 149.47, 148.3, 152.16, 145.3, 139.14, 136.08, 138.82], '6M': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 149.47, 148.3, 152.16, 145.3, 139.14, 136.08, 138.82], '1Y': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 149.47, 148.3, 152.16, 145.3, 139.14, 136.08, 138.82] },
      velocityScore: { '1D': -1.7, '1W': -5.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: null, revenueGrowth: 15, eps: -0.67, grossMargin: 49, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.24, MARS: 21.7, FRWD: 2.2, BCTK: 7.69, FWD: 1.46, CBSE: false, FCUS: false, WGMI: false, CNEQ: 2.41, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'SPACE EXPLORATION TECHN-CL A appears in 6 of 17 Broad Tech ETFs (35% coverage) with average weight 6.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 6, avgWeight: 5.57, proScore: 1.97, coverage: 0.353,
      price: 551.91, weeklyPrices: [550.30, 578.05, 582.59, 555.55, 551.91], weeklyChange: 0.29, dayChange: -2.03, sortRank: 0, periodReturns: { '1M': -15.5, 'YTD': 220.4, '6M': 148.5, '1Y': 717.3 },
      priceHistory: { '1D': [563.32, 555.25, 551.91], '1W': [550.3, 578.05, 582.59, 555.55, 551.91], '1M': [653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539, 577.46, 532.1, 550.3, 578.05, 582.59, 555.55, 551.91], 'YTD': [172.27, 187.68, 221.51, 240.85, 270.23, 285.99, 296.56, 290.95, 261.3, 261.18, 316.93, 273.35, 294.97, 350.16, 374.11, 400.73, 442.36, 488.74, 455.8, 530.6, 575.5, 529.29, 746.23, 586.45, 532.1, 551.91], '6M': [222.1, 236.39, 250.23, 282.58, 281.58, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 372.52, 404, 431.52, 480, 482.02, 484.28, 546.2, 526.93, 562.93, 732.62, 651.88, 532.1, 551.91], '1Y': [67.53, 67.06, 70.61, 75.84, 75.91, 75.86, 79.22, 81.91, 94.54, 103.09, 110.25, 120.06, 119.93, 113.13, 121.41, 124.92, 158.02, 174.22, 162.45, 150.93, 159.99, 169.54, 174.58, 178.25, 172.27, 187.68, 215, 243.29, 278.41, 260.19, 284.1, 285.52, 279.7, 245.25, 272.29, 293.1, 273.35, 294.97, 343.43, 372.52, 404, 431.52, 480, 482.02, 484.28, 546.2, 511.72, 562.93, 732.62, 651.88, 532.1, 551.91] },
      velocityScore: { '1D': 1, '1W': -4.4, '1M': 47, '6M': null }, isNew: false,
      marketCap: '$190B', pe: 33, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { PTF: 4.37, WCLD: false, IGV: false, FDTX: 4.49, GTEK: false, ARKK: false, MARS: false, FRWD: 4.59, BCTK: false, FWD: false, CBSE: false, FCUS: 4.18, WGMI: false, CNEQ: 4.69, SGRT: 11.12, SPMO: false, XMMO: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 5, avgWeight: 4.3, proScore: 1.26, coverage: 0.294,
      price: 864.61, weeklyPrices: [860.02, 890.09, 910.34, 860.66, 864.61], weeklyChange: 0.53, dayChange: -1.56, sortRank: 0, periodReturns: { '1M': -15.1, 'YTD': 214, '6M': 169.9, '1Y': 480.1 },
      priceHistory: { '1D': [878.31, 869, 864.61], '1W': [860.02, 890.09, 910.34, 860.66, 864.61], '1M': [1018.8, 1031.34, 1066.07, 1070.23, 1094.04, 1038.59, 993.25, 1025.36, 899.9, 968.53, 965, 915.19, 820.16, 868.26, 827.64, 860.02, 890.09, 910.34, 860.66, 864.61], 'YTD': [275.39, 284.47, 326.23, 358.29, 432.95, 425, 424.14, 421.85, 375.01, 373.98, 434.6, 378.79, 429.36, 513.28, 539.75, 595.86, 738.54, 808.8, 733.35, 870.66, 925.99, 868.09, 1070.23, 899.9, 827.64, 864.61], '6M': [320.32, 346.1, 407.69, 429.32, 425.99, 411.11, 407.84, 352.8, 383.71, 411.23, 380.07, 453.3, 513.28, 547.75, 586.25, 726.93, 782.64, 795.47, 812.73, 921.26, 876.77, 931.04, 1094.04, 968.53, 827.64, 864.61], '1Y': [149.05, 146.59, 152.68, 151.74, 155.59, 157.93, 164, 170.5, 191.59, 211.13, 228.13, 236.06, 225.01, 211.63, 214.57, 223, 265.55, 293.99, 261.38, 253.38, 266.87, 282.86, 288.13, 282.8, 275.39, 284.47, 312.28, 346.53, 446.57, 405.45, 431.17, 411.11, 407.84, 352.8, 383.71, 411.23, 378.79, 429.36, 503.13, 547.75, 586.25, 726.93, 782.64, 795.47, 812.73, 921.26, 847.47, 931.04, 1094.04, 968.53, 827.64, 864.61] },
      velocityScore: { '1D': -0.8, '1W': 0, '1M': -20.8, '6M': null }, isNew: false,
      marketCap: '$196B', pe: 82, revenueGrowth: 44, eps: 10.54, grossMargin: 42, dividendYield: 0.34,
      etfPresence: { PTF: 3.84, WCLD: false, IGV: false, FDTX: 4.14, GTEK: false, ARKK: false, MARS: false, FRWD: 7.49, BCTK: false, FWD: false, CBSE: false, FCUS: 4.13, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.9, XMMO: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 5, avgWeight: 4.21, proScore: 1.24, coverage: 0.294,
      price: 360.43, weeklyPrices: [356.24, 355.03, 350.67, 357.33, 360.43], weeklyChange: 1.18, dayChange: 0.87, sortRank: 0, periodReturns: { '1M': -1.8, 'YTD': 14.9, '6M': 8.2, '1Y': 96.8 },
      priceHistory: { '1D': [357.33, 360.63, 360.43], '1W': [356.24, 355.03, 350.67, 357.33, 360.43], '1M': [367.11, 371.1, 362.1, 367.46, 348.78, 346.08, 345.04, 342.19, 334.69, 351.28, 353.33, 357.89, 356.18, 364.9, 363.62, 358.71, 356.24, 355.03, 350.67, 357.33, 360.43], 'YTD': [313.8, 326.01, 330.34, 333.59, 344.9, 318.63, 303.94, 313.03, 300.91, 303.21, 305.73, 273.76, 297.66, 319.21, 335.4, 347.5, 384.27, 383.82, 384.9, 386.12, 369.27, 358.16, 348.78, 351.28, 358.71, 360.43], '6M': [333.16, 328.43, 338.53, 323.1, 306.02, 311.69, 306.36, 298.3, 301.46, 298.79, 273.76, 297.66, 319.21, 335.4, 348.52, 379.64, 386.77, 393.11, 384.84, 372.58, 361.17, 367.11, 346.08, 353.33, 358.71, 360.43], '1Y': [183.1, 192.11, 196.43, 195.32, 204.16, 202.49, 207.95, 211.99, 239.94, 251.42, 252.34, 243.55, 247.13, 246.19, 251.34, 268.43, 278.06, 291.74, 284.96, 323.64, 316.02, 317.75, 307.73, 315.68, 313.8, 326.01, 333.16, 328.43, 338.53, 323.1, 306.02, 311.69, 311.43, 298.3, 301.46, 298.79, 273.76, 297.66, 319.21, 335.4, 348.52, 379.64, 386.77, 393.11, 384.84, 372.58, 361.17, 367.11, 346.08, 353.33, 358.71, 360.43] },
      velocityScore: { '1D': 0.8, '1W': -0.8, '1M': 42.5, '6M': null }, isNew: false,
      marketCap: '$4.4T', pe: 27.5, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.21, GTEK: false, ARKK: 1.91, MARS: false, FRWD: false, BCTK: 6.41, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 5.98, SGRT: false, SPMO: 3.52, XMMO: false },
      tonyNote: 'Alphabet Inc Class C appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 4.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 5, avgWeight: 3.21, proScore: 0.95, coverage: 0.294,
      price: 251.78, weeklyPrices: [243.62, 247.04, 245.34, 247.31, 251.78], weeklyChange: 3.35, dayChange: 1.74, sortRank: 0, periodReturns: { '1M': 2.3, 'YTD': 9.1, '6M': 5.7, '1Y': 11.2 },
      priceHistory: { '1D': [247.49, 251.08, 251.78], '1W': [243.62, 247.04, 245.34, 247.31, 251.78], '1M': [246.02, 246, 237.5, 244.39, 232.79, 234.11, 234.27, 227.01, 232.69, 240.14, 238.34, 241.7, 242.67, 244.16, 245.98, 243.62, 247.04, 245.34, 247.31, 251.78], 'YTD': [230.82, 246.29, 239.12, 238.42, 242.96, 208.72, 204.79, 210.64, 216.82, 209.53, 208.76, 207.54, 209.77, 239.89, 248.28, 261.12, 272.05, 265.82, 259.34, 271.85, 253.79, 241.51, 244.39, 232.69, 245.98, 251.78], '6M': [238.18, 239.16, 239.3, 210.32, 198.79, 210.11, 210, 213.21, 207.67, 205.37, 199.34, 212.79, 239.89, 250.56, 263.99, 268.26, 272.68, 264.14, 266.32, 261.26, 245.22, 238.55, 232.79, 240.14, 245.98, 251.78], '1Y': [226.35, 227.47, 231.01, 213.75, 221.47, 228.01, 227.94, 225.34, 238.24, 234.05, 220.71, 219.57, 221.78, 216.39, 222.03, 229.25, 254, 248.4, 232.87, 226.28, 234.42, 227.92, 222.56, 232.14, 230.82, 246.29, 236.65, 234.34, 241.73, 222.69, 199.6, 210.11, 210, 213.21, 207.67, 205.37, 207.54, 209.77, 238.38, 250.56, 263.99, 268.26, 272.68, 264.14, 266.32, 261.26, 246.03, 238.55, 232.79, 240.14, 245.98, 251.78] },
      velocityScore: { '1D': 0, '1W': -14.4, '1M': -12, '6M': null }, isNew: false,
      marketCap: '$2.7T', pe: 30.1, revenueGrowth: 17, eps: 8.37, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.29, GTEK: false, ARKK: 2.46, MARS: false, FRWD: false, BCTK: 4.33, FWD: 1.58, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.41, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'CRWD', name: 'CrowdStrike', easyScore: 5, avgWeight: 2.8, proScore: 0.82, coverage: 0.294,
      price: 0, weeklyPrices: [0.00], weeklyChange: 0, dayChange: 0, sortRank: 0, periodReturns: { '1M': 0, 'YTD': 0, '6M': 0, '1Y': 0 },
      priceHistory: undefined,
      velocityScore: { '1D': 5.1, '1W': 3.8, '1M': 3.8, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: null, revenueGrowth: 0, eps: 0, grossMargin: 0, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.52, IGV: 7.78, FDTX: 1.21, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 1.26, FWD: 1.23, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'CrowdStrike appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 2.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, avgWeight: 5.06, proScore: 1.19, coverage: 0.235,
      price: 390.74, weeklyPrices: [383.34, 384.36, 385.10, 390.99, 390.74], weeklyChange: 1.93, dayChange: 1.51, sortRank: 0, periodReturns: { '1M': -2.3, 'YTD': -19.2, '6M': -14.4, '1Y': -22.8 },
      priceHistory: { '1D': [384.93, 390.26, 390.74], '1W': [383.34, 384.36, 385.1, 390.99, 390.74], '1M': [399.76, 393.83, 378.91, 379.4, 367.34, 373.94, 365.46, 352.83, 372.97, 368.57, 373.02, 384.28, 390.49, 386.74, 388.84, 383.34, 384.36, 385.1, 390.99, 390.74], 'YTD': [483.62, 478.11, 459.86, 470.28, 423.37, 413.6, 399.6, 400.6, 405.2, 401.86, 389.02, 365.97, 373.46, 384.37, 418.07, 424.82, 413.62, 407.77, 417.42, 412.67, 428.05, 390.34, 379.4, 372.97, 388.84, 390.74], '6M': [456.66, 465.95, 430.29, 401.14, 401.32, 397.23, 392.74, 408.96, 395.55, 381.87, 356.77, 372.88, 384.37, 422.79, 424.62, 414.44, 415.12, 421.92, 418.57, 460.52, 411.74, 390.74, 367.34, 368.57, 388.84, 390.74], '1Y': [505.82, 505.27, 512.57, 527.75, 529.24, 509.77, 504.26, 505.12, 498.41, 509.04, 509.23, 517.95, 523.98, 513.57, 517.66, 542.07, 517.03, 506, 507.49, 474, 490, 492.02, 476.39, 486.85, 483.62, 478.11, 459.38, 451.14, 433.5, 393.67, 401.84, 397.23, 392.74, 408.96, 395.55, 381.87, 365.97, 373.46, 370.87, 422.79, 424.62, 414.44, 415.12, 421.92, 418.57, 460.52, 416.67, 390.74, 367.34, 368.57, 388.84, 390.74] },
      velocityScore: { '1D': -1.7, '1W': -0.8, '1M': 5.3, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 23.7, revenueGrowth: 18, eps: 16.51, grossMargin: 68, dividendYield: 0.95,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.06, FDTX: 2.93, GTEK: false, ARKK: false, MARS: false, FRWD: 2.99, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 6.26, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'LRCX', name: 'LRCX', easyScore: 4, avgWeight: 4.67, proScore: 1.1, coverage: 0.235,
      price: 342.38, weeklyPrices: [333.15, 353.17, 350.33, 329.92, 342.38], weeklyChange: 2.77, dayChange: -1.08, sortRank: 0, periodReturns: { '1M': -12, 'YTD': 100, '6M': 57.4, '1Y': 238.8 },
      priceHistory: { '1D': [346.1, 344.41, 342.38], '1W': [333.15, 353.17, 350.33, 329.92, 342.38], '1M': [388.92, 369.34, 374.18, 389.04, 409.54, 371.33, 374.8, 401.82, 379.09, 410.91, 433.33, 391.26, 351.41, 350.2, 326.13, 333.15, 353.17, 350.33, 329.92, 342.38], 'YTD': [171.18, 200.96, 222.96, 222.87, 237.5, 229.28, 240.09, 249.48, 222.99, 209.49, 233.99, 211.62, 218.44, 267.32, 263.16, 259.47, 258.57, 289.24, 273.38, 318.93, 336.41, 362.52, 389.04, 379.09, 326.13, 342.38], '6M': [217.47, 217.94, 233.46, 231.01, 235.53, 244.92, 233.89, 199.33, 212.2, 228.36, 211.41, 220.65, 267.32, 267.6, 267.78, 256.72, 294.05, 284.72, 305.35, 317.12, 324.45, 366.81, 409.54, 410.91, 326.13, 342.38], '1Y': [101.07, 97.69, 98.94, 96.68, 105.28, 100.33, 101.28, 97.03, 105.57, 120.47, 131.93, 133.9, 140.35, 138.31, 145.04, 155.62, 161.24, 166.37, 147.46, 150.38, 158.19, 165.81, 163.26, 175.16, 171.18, 200.96, 208.79, 220.7, 248.17, 213.31, 231.29, 244.92, 233.89, 199.33, 212.2, 228.36, 211.62, 218.44, 263.66, 267.6, 267.78, 256.72, 294.05, 284.72, 305.35, 317.12, 303.28, 366.81, 409.54, 410.91, 326.13, 342.38] },
      velocityScore: { '1D': 0, '1W': -14.1, '1M': -23.1, '6M': null }, isNew: false,
      marketCap: '$428B', pe: 64.6, revenueGrowth: 24, eps: 5.3, grossMargin: 50, dividendYield: 0.3,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.55, BCTK: 7.49, FWD: 1.83, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 3.81, XMMO: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks', easyScore: 4, avgWeight: 4.64, proScore: 1.09, coverage: 0.235,
      price: 360.3, weeklyPrices: [338.31, 325.91, 330.30, 352.89, 360.30], weeklyChange: 6.5, dayChange: 2.1, sortRank: 0, periodReturns: { '1M': 26.6, 'YTD': 95.6, '6M': 91.9, '1Y': 87.4 },
      priceHistory: { '1D': [352.89, 362.06, 360.3], '1W': [338.31, 325.91, 330.3, 352.89, 360.3], '1M': [284.54, 279.9, 282.13, 287.78, 286.4, 290.92, 285.26, 293.09, 304.2, 332, 341.02, 352.04, 348.06, 357.53, 337.04, 320.59, 338.31, 325.91, 330.3, 352.89, 360.3], 'YTD': [184.2, 190.8, 187.66, 184.22, 175.42, 165.51, 152.35, 144.84, 163.16, 168.12, 169.74, 147.02, 161.95, 162.51, 169.56, 180.99, 183.98, 215.6, 246.66, 257.77, 279.25, 279.62, 286.4, 332, 320.59, 360.3], '6M': [187.73, 180.18, 176.97, 159.32, 166.95, 144.14, 150.15, 165.05, 167.02, 162.95, 147.02, 161.95, 162.51, 169.56, 182.9, 184.56, 213.66, 247.55, 256.75, 300.48, 266.33, 284.54, 290.92, 341.02, 320.59, 360.3], '1Y': [192.25, 196.73, 193.84, 169.09, 175.4, 181.56, 184.23, 190.52, 197.55, 201.34, 203.25, 203.62, 211.04, 207.56, 214.4, 221.38, 214.52, 218.27, 201, 186.27, 189.88, 195, 187.09, 188.12, 184.2, 190.8, 187.73, 180.18, 176.97, 159.32, 166.95, 144.14, 148.92, 165.05, 167.02, 162.95, 147.02, 161.95, 162.51, 169.56, 182.9, 184.56, 213.66, 247.55, 256.75, 300.48, 266.33, 284.54, 290.92, 341.02, 320.59, 360.3] },
      velocityScore: { '1D': 2.8, '1W': 0.9, '1M': -3.5, '6M': null }, isNew: false,
      marketCap: '$294B', pe: 310.6, revenueGrowth: 31, eps: 1.16, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.8, IGV: 10.38, FDTX: 4.15, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.24, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 4, avgWeight: 4.47, proScore: 1.05, coverage: 0.235,
      price: 404.89, weeklyPrices: [394.06, 406.55, 407.76, 394.76, 404.89], weeklyChange: 2.75, dayChange: 2.2, sortRank: 0, periodReturns: { '1M': -1.5, 'YTD': -10, '6M': -7.7, '1Y': 30.3 },
      priceHistory: { '1D': [396.18, 404.59, 404.89], '1W': [394.06, 406.55, 407.76, 394.76, 404.89], '1M': [411.15, 404.66, 396.38, 400.49, 405.05, 381.61, 375.53, 375.12, 379.71, 411.84, 420.6, 425.3, 393.45, 419.77, 402.9, 394.06, 406.55, 407.76, 394.76, 404.89], 'YTD': [449.72, 435.8, 437.5, 435.2, 421.81, 417.32, 411.32, 417.4, 405.94, 395.01, 380.3, 372.11, 360.59, 352.42, 392.5, 378.67, 392.51, 433.45, 404.11, 440.36, 418.45, 399.15, 400.49, 379.71, 402.9, 404.89], '6M': [438.57, 449.06, 430.41, 411.11, 417.44, 411.82, 402.51, 396.73, 391.2, 367.96, 361.83, 352.82, 352.42, 400.62, 376.3, 390.82, 428.35, 422.24, 426.01, 415.88, 408.95, 406.43, 405.05, 411.84, 402.9, 404.89], '1Y': [310.78, 332.11, 321.2, 308.72, 340.84, 329.31, 346.6, 329.36, 346.97, 421.62, 425.85, 444.72, 433.09, 429.24, 442.6, 460.55, 468.37, 445.23, 408.92, 417.78, 429.24, 445.17, 489.88, 485.56, 449.72, 435.8, 439.2, 449.36, 416.56, 397.21, 417.07, 411.82, 402.51, 396.73, 391.2, 367.96, 372.11, 360.59, 348.95, 400.62, 376.3, 390.82, 428.35, 422.24, 426.01, 415.88, 391, 406.43, 405.05, 411.84, 402.9, 404.89] },
      velocityScore: { '1D': 0, '1W': -0.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 364.8, revenueGrowth: 16, eps: 1.11, grossMargin: 19, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 10.15, MARS: false, FRWD: false, BCTK: 3.3, FWD: 1.33, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.11, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 4, avgWeight: 3.66, proScore: 0.86, coverage: 0.235,
      price: 135.49, weeklyPrices: [129.04, 126.79, 130.04, 133.72, 135.49], weeklyChange: 5, dayChange: 1.32, sortRank: 0, periodReturns: { '1M': 0.6, 'YTD': -23.8, '6M': -23.5, '1Y': -8.8 },
      priceHistory: { '1D': [133.72, 135.74, 135.49], '1W': [129.04, 126.79, 130.04, 133.72, 135.49], '1M': [134.71, 133.25, 130.63, 128.47, 119.5, 116.7, 113.5, 107.27, 112.93, 115.7, 116.67, 125.73, 129.3, 132.54, 134.37, 132.22, 129.04, 126.79, 130.04, 133.72, 135.49], 'YTD': [177.75, 176.86, 170.96, 167.47, 147.76, 139.51, 135.38, 134.19, 152.67, 153.5, 155.68, 143.06, 147.93, 132.37, 145.89, 141.18, 135.91, 136, 137.15, 143.34, 141.7, 127.99, 119.5, 115.7, 132.22, 135.49], '6M': [177.07, 169.6, 146.59, 135.9, 131.41, 130.6, 145.17, 157.16, 150.95, 150.68, 143.06, 147.93, 132.37, 145.89, 143.1, 146.03, 136.89, 135.14, 136.6, 160.65, 136.47, 134.71, 116.7, 116.67, 132.22, 135.49], '1Y': [148.58, 149.07, 156.24, 173.27, 186.97, 157.75, 160.87, 157.09, 162.36, 170.26, 182.55, 182.42, 182.17, 179.74, 181.51, 189.6, 190.74, 190.96, 167.33, 163.55, 170.69, 181.84, 187.75, 194.13, 177.75, 176.86, 177.07, 169.6, 146.59, 135.9, 131.41, 130.6, 137.19, 157.16, 150.95, 150.68, 143.06, 147.93, 132.37, 145.89, 143.1, 146.03, 136.89, 135.14, 136.6, 160.65, 136.47, 134.71, 116.7, 116.67, 132.22, 135.49] },
      velocityScore: { '1D': 1.2, '1W': 0, '1M': -11.3, '6M': null }, isNew: false,
      marketCap: '$325B', pe: 150.5, revenueGrowth: 85, eps: 0.9, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.54, FDTX: 2, GTEK: false, ARKK: 3.02, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.1, XMMO: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 4, avgWeight: 3.4, proScore: 0.8, coverage: 0.235,
      price: 1689.52, weeklyPrices: [1858.27, 1915.92, 1673.97, 1757.82, 1689.52], weeklyChange: -9.08, dayChange: -3.89, sortRank: 0, periodReturns: { '1M': -19.8, 'YTD': 611.7, '6M': 312.8, '1Y': 3854.9 },
      priceHistory: { '1D': [1757.82, 1690.5, 1689.52], '1W': [1858.27, 1915.92, 1673.97, 1757.82, 1689.52], '1M': [2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 1745, 1744.43, 1617.7, 1727.18, 1858.27, 1915.92, 1673.97, 1757.82, 1689.52], 'YTD': [237.38, 334.54, 413.62, 470.8, 665.24, 541.64, 600.4, 632.38, 565.59, 618.82, 772.09, 615.83, 724.63, 952.5, 913.02, 1002.35, 1406.32, 1452.02, 1392.56, 1641.64, 1759.68, 1980.1, 2273.73, 2050.39, 1727.18, 1689.52], '6M': [409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1333.01, 1589.55, 1761.43, 1642, 2107.86, 1963.6, 2273.73, 1727.18, 1689.52], '1Y': [42.72, 41.36, 42.93, 41.93, 46.83, 44.58, 47.35, 51.07, 70.51, 91.55, 106.4, 112.2, 120.95, 127.29, 149.29, 175.53, 194.57, 271.58, 244.93, 220.5, 205.35, 219.46, 209.31, 244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 635.36, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1333.01, 1589.55, 1761.43, 1642, 2107.86, 1963.6, 2273.73, 1727.18, 1689.52] },
      velocityScore: { '1D': 1.3, '1W': -3.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$250B', pe: 57.9, revenueGrowth: 251, eps: 29.18, grossMargin: 56, dividendYield: null,
      etfPresence: { PTF: 5.23, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.66, CBSE: false, FCUS: 3.97, WGMI: false, CNEQ: false, SGRT: false, SPMO: 2.72, XMMO: false },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'DDOG', name: 'DDOG', easyScore: 4, avgWeight: 3.06, proScore: 0.72, coverage: 0.235,
      price: 270.85, weeklyPrices: [269.00, 257.54, 260.24, 270.73, 270.85], weeklyChange: 0.69, dayChange: 0.04, sortRank: 0, periodReturns: { '1M': 16.2, 'YTD': 99.2, '6M': 124.1, '1Y': 92.7 },
      priceHistory: { '1D': [270.73, 272.06, 270.85], '1W': [269, 257.54, 260.24, 270.73, 270.85], '1M': [233.09, 231.11, 226.63, 223, 221.37, 220.57, 222.65, 220.94, 239.77, 248.57, 260.36, 264.48, 260.36, 255.37, 256.81, 261.09, 269, 257.54, 260.24, 270.73, 270.85], 'YTD': [135.99, 130.68, 119.02, 136.64, 129.05, 129.67, 121.78, 110.33, 122.36, 127.16, 129.94, 114.48, 116.5, 110.08, 129.74, 131.55, 145.73, 199.94, 212.24, 225.24, 243.6, 229.9, 221.37, 248.57, 261.09, 270.85], '6M': [120.86, 130.13, 129.32, 111.69, 125.2, 102.61, 111.11, 125.75, 124.52, 125.08, 114.48, 116.5, 110.08, 129.74, 132.66, 146.69, 202.32, 208.82, 223.65, 277.49, 231.68, 233.09, 220.57, 260.36, 261.09, 270.85], '1Y': [140.56, 144.89, 150.27, 132.94, 128.96, 128.99, 126.31, 134.69, 140.46, 134.59, 137.49, 142.4, 154.52, 160.88, 156.25, 157.27, 157.51, 197.86, 176.46, 158.99, 156.48, 152.57, 140.05, 141.23, 135.99, 130.68, 120.86, 130.13, 129.32, 111.69, 125.2, 102.61, 111.96, 125.75, 124.52, 125.08, 114.48, 116.5, 110.08, 129.74, 132.66, 146.69, 202.32, 208.82, 223.65, 277.49, 231.68, 233.09, 220.57, 260.36, 261.09, 270.85] },
      velocityScore: { '1D': 0, '1W': 0, '1M': 16.1, '6M': null }, isNew: false,
      marketCap: '$96B', pe: 712.8, revenueGrowth: 32, eps: 0.38, grossMargin: 80, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.87, IGV: 3.28, FDTX: 2.39, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: 3.71, SPMO: false, XMMO: false },
      tonyNote: 'DDOG appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SHOP', name: 'Shopify Inc Registered Shs -A- Subord Vtg', easyScore: 4, avgWeight: 3.06, proScore: 0.72, coverage: 0.235,
      price: 0, weeklyPrices: [0.00], weeklyChange: 0, dayChange: 0, sortRank: 0, periodReturns: { '1M': 0, 'YTD': 0, '6M': 0, '1Y': 0 },
      priceHistory: undefined,
      velocityScore: { '1D': 0, '1W': 2.9, '1M': -21.7, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: null, revenueGrowth: 0, eps: 0, grossMargin: 0, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.59, GTEK: false, ARKK: 4.66, MARS: false, FRWD: 2.14, BCTK: 2.86, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Shopify Inc Registered Shs -A- Subord Vtg appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASML', name: 'ASML Holding', easyScore: 4, avgWeight: 2.81, proScore: 0.66, coverage: 0.235,
      price: 1774.31, weeklyPrices: [1768.65, 1804.25, 1797.32, 1726.04, 1774.31], weeklyChange: 0.32, dayChange: -0.08, sortRank: 0, periodReturns: { '1M': -6.3, 'YTD': 65.8, '6M': 33.2, '1Y': 115.6 },
      priceHistory: { '1D': [1775.64, 1778.77, 1773.79, 1774.31], '1W': [1768.65, 1804.25, 1797.32, 1726.04, 1774.31], '1M': [1892.66, 1803.89, 1867.83, 1929.68, 1929.25, 1778.46, 1762.77, 1841.18, 1794.62, 1883.11, 1989.44, 1843.04, 1769.32, 1825.07, 1747.28, 1768.65, 1804.25, 1797.32, 1726.04, 1774.31], 'YTD': [1069.86, 1194.32, 1358.57, 1413.35, 1441.39, 1429.49, 1468.72, 1526.51, 1399.37, 1351.58, 1366.39, 1329.5, 1317.23, 1500.2, 1476.5, 1432.44, 1386.21, 1520.94, 1459.44, 1597.87, 1757.47, 1899.48, 1929.68, 1794.62, 1747.28, 1774.31], '6M': [1331.6, 1389.04, 1423, 1413.01, 1406.61, 1469.59, 1450.56, 1292.8, 1345.69, 1317.25, 1302.47, 1304.01, 1500.2, 1459.8, 1457.7, 1427.02, 1592.02, 1501.81, 1632.9, 1628.57, 1749.04, 1863.55, 1929.25, 1883.11, 1747.28, 1774.31], '1Y': [823.02, 705.48, 718.49, 689.63, 741.79, 743.61, 754.46, 725.85, 805.13, 878.42, 963.51, 968.09, 1002.3, 983.18, 1025.02, 1052.48, 1066.82, 1038.79, 1020, 987.82, 1108.78, 1111.44, 1076.05, 1061.84, 1069.86, 1194.32, 1263.72, 1395, 1455.16, 1350.16, 1406.87, 1469.59, 1450.56, 1292.8, 1345.69, 1317.25, 1329.5, 1317.23, 1478.28, 1459.8, 1457.7, 1427.02, 1592.02, 1501.81, 1632.9, 1628.57, 1641.74, 1863.55, 1929.25, 1883.11, 1747.28, 1774.31] },
      velocityScore: { '1D': 0, '1W': 0, '1M': -25.8, '6M': null }, isNew: false,
      marketCap: '$684B', pe: 60.2, revenueGrowth: 13, eps: 29.48, grossMargin: 53, dividendYield: 0.49,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 4.74, BCTK: 2.18, FWD: 1.77, CBSE: 2.57, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'ASML Holding appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 2.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 3, avgWeight: 4.73, proScore: 2.84, coverage: 0.6,
      price: 416.29, weeklyPrices: [399.56, 405.83, 407.28, 402.85, 416.29], weeklyChange: 4.19, dayChange: 0.15, sortRank: 0, periodReturns: { '1M': 2.3, 'YTD': 30.7, '6M': 24.8, '1Y': 15 },
      priceHistory: { '1D': [415.67, 416.87, 416.29], '1W': [399.56, 405.83, 407.28, 402.85, 416.29], '1M': [407.06, 407.71, 409.64, 421.77, 435.78, 405.28, 404.59, 419.87, 402.68, 408.26, 426.12, 412.31, 398.52, 413.42, 395.68, 399.56, 405.83, 407.28, 402.85, 416.29], 'YTD': [318.51, 320.58, 343.75, 332.28, 359.44, 377.06, 380.38, 373.53, 354.46, 348.64, 360.23, 357.1, 361.1, 403.36, 407.57, 416.77, 422.44, 401.53, 371.88, 406.37, 418.61, 393.64, 421.77, 402.68, 395.68, 416.29], '6M': [333.46, 331.22, 351.42, 373.82, 389.25, 373.38, 375.92, 347.75, 355.4, 356.8, 357.36, 363.89, 403.36, 406.21, 423.92, 425.55, 401.51, 399.44, 391.35, 400.08, 403.14, 391.39, 435.78, 408.26, 395.68, 416.29], '1Y': [362.11, 372.65, 390.01, 356.45, 363.3, 349, 345.76, 343.75, 348.23, 371.19, 368.52, 374.25, 370.94, 374.35, 373.46, 376.01, 386.57, 379.57, 342.75, 330.43, 333.11, 341.76, 329.93, 322.81, 318.51, 320.58, 331.14, 334.04, 354.37, 354.67, 390.33, 373.38, 375.92, 347.75, 355.4, 356.8, 357.1, 361.1, 403, 406.21, 423.92, 425.55, 401.51, 399.44, 391.35, 400.08, 395.94, 391.39, 435.78, 408.26, 395.68, 416.29] },
      velocityScore: { '1D': 1.8, '1W': 4.4, '1M': 8.4, '6M': null }, isNew: false,
      marketCap: '$162B', pe: 40.7, revenueGrowth: 17, eps: 10.22, grossMargin: 37, dividendYield: 1.06,
      etfPresence: { POW: 4.4, VOLT: 5.6, PBD: false, PBW: false, IVEP: 4.2 },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 3, avgWeight: 4.7, proScore: 2.82, coverage: 0.6,
      price: 656.11, weeklyPrices: [666.33, 668.17, 658.56, 646.70, 656.11], weeklyChange: -1.53, dayChange: -0.77, sortRank: 0, periodReturns: { '1M': -9.4, 'YTD': 55.5, '6M': 46.6, '1Y': 69.7 },
      priceHistory: { '1D': [661.2, 656.72, 655.83, 656.11], '1W': [666.33, 668.17, 658.56, 646.7, 656.11], '1M': [724.35, 719.29, 714.85, 702.25, 740.14, 702.29, 701.88, 718.59, 687.87, 714.45, 720.04, 691.4, 668.31, 674.04, 656.79, 666.33, 668.17, 658.56, 646.7, 656.11], 'YTD': [422.06, 413.17, 466.75, 470.77, 477.77, 514.56, 519.31, 562.77, 568.38, 566.91, 577.95, 545.64, 560.63, 595.84, 604.97, 637.28, 757.34, 765.81, 714.13, 733.62, 719.17, 683.29, 702.25, 687.87, 656.79, 656.11], '6M': [447.64, 468.76, 474.63, 508.11, 524.08, 552.66, 563.08, 540.19, 559.02, 555.39, 549.98, 554.38, 595.84, 601.88, 624.84, 742.21, 745, 769.99, 723.44, 687.48, 693.81, 707.74, 740.14, 714.45, 656.79, 656.11], '1Y': [386.54, 394.93, 410.99, 389.12, 391.57, 379.27, 378.31, 374.68, 373.47, 378.24, 389.53, 414.42, 421.51, 431.6, 437.43, 439.57, 450.82, 450.38, 426.87, 442.64, 454.72, 457.96, 438.49, 435.2, 422.06, 413.17, 437.07, 468.78, 483.43, 477.72, 515.88, 552.66, 563.08, 540.19, 559.02, 555.39, 545.64, 560.63, 585.36, 601.88, 624.84, 742.21, 745, 769.99, 723.44, 687.48, 695.11, 707.74, 740.14, 714.45, 656.79, 656.11] },
      velocityScore: { '1D': 0.7, '1W': -2.1, '1M': -4.4, '6M': null }, isNew: false,
      marketCap: '$98B', pe: 90.2, revenueGrowth: 26, eps: 7.27, grossMargin: 15, dividendYield: 0.07,
      etfPresence: { POW: 5.05, VOLT: 5.2, PBD: false, PBW: false, IVEP: 3.85 },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 3, avgWeight: 3.98, proScore: 2.39, coverage: 0.6,
      price: 1065.24, weeklyPrices: [1075.26, 1091.57, 1042.60, 1066.01, 1065.24], weeklyChange: -0.93, dayChange: -0.16, sortRank: 0, periodReturns: { '1M': 8.8, 'YTD': 63, '6M': 65.9, '1Y': 90.4 },
      priceHistory: { '1D': [1066.92, 1060.5, 1064.12, 1065.24], '1W': [1075.26, 1091.57, 1042.6, 1066.01, 1065.24], '1M': [979.07, 982.35, 1048.86, 1109.73, 1127.59, 1034.98, 1057.65, 1085.47, 1045.17, 1102.51, 1174.86, 1134.35, 1113.11, 1152.04, 1077.08, 1070.99, 1075.26, 1091.57, 1042.6, 1066.01, 1065.24], 'YTD': [653.57, 628.4, 681.55, 665.99, 754.97, 790.79, 817.55, 876.01, 815.01, 832.11, 877.39, 853.16, 897.36, 991.12, 990.18, 1088.93, 1095.21, 1071.98, 1024.52, 996, 963.33, 940.66, 1127.59, 1102.51, 1070.99, 1065.24], '6M': [642.23, 657.78, 726.37, 779.35, 802.13, 831.7, 881.18, 789.23, 805.02, 851.07, 853.16, 897.36, 991.12, 990.18, 1120.23, 1073.95, 1073.08, 1012.25, 1070.47, 950.54, 933.85, 979.07, 1034.98, 1174.86, 1070.99, 1065.24], '1Y': [559.61, 548.99, 632.67, 649.72, 657.44, 603.13, 625.91, 579.68, 605.7, 617.91, 633.41, 614.9, 606.12, 644.41, 585.33, 570.98, 547.96, 576.08, 554.93, 572.56, 601.58, 625.3, 686.22, 661.45, 653.57, 628.4, 642.23, 657.78, 726.37, 779.35, 802.13, 831.7, 873.6, 789.23, 805.02, 851.07, 853.16, 897.36, 991.12, 990.18, 1120.23, 1073.95, 1073.08, 1012.25, 1070.47, 950.54, 933.85, 979.07, 1034.98, 1174.86, 1070.99, 1065.24] },
      velocityScore: { '1D': 0.8, '1W': -4.8, '1M': 9.1, '6M': null }, isNew: false,
      marketCap: '$286B', pe: 30.5, revenueGrowth: 16, eps: 34.97, grossMargin: 20, dividendYield: 0.19,
      etfPresence: { POW: 3.54, VOLT: 4.46, PBD: false, PBW: false, IVEP: 3.94 },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 3, avgWeight: 3.96, proScore: 2.37, coverage: 0.6,
      price: 89.83, weeklyPrices: [87.44, 87.10, 87.96, 88.38, 89.83], weeklyChange: 2.73, dayChange: 0.32, sortRank: 0, periodReturns: { '1M': 4.3, 'YTD': 11.9, '6M': 9.3, '1Y': 20.3 },
      priceHistory: { '1D': [89.54, 89.85, 89.83, 89.83], '1W': [87.44, 87.1, 87.96, 88.38, 89.83], '1M': [86.12, 86.23, 85.73, 86.75, 86.08, 86.43, 87.62, 87.7, 88.56, 88.66, 87.77, 86.37, 88.34, 87.44, 88.47, 87.44, 87.1, 87.96, 88.38, 89.83], 'YTD': [80.28, 79.49, 83.63, 85.47, 86.33, 89.48, 91.22, 95.11, 92.6, 91.73, 92.41, 91.16, 93.15, 92.3, 92.01, 94.83, 95.51, 94.59, 90.06, 87.65, 85.68, 84.84, 86.75, 88.56, 88.47, 89.83], '6M': [82.19, 84.81, 87.9, 89.47, 93.8, 92.18, 93.77, 91.02, 92.78, 89.5, 91.4, 92.73, 92.3, 91.98, 95.28, 96.95, 93.1, 93.36, 88.55, 83.66, 84.01, 85.99, 86.08, 88.66, 88.47, 89.83], '1Y': [74.7, 77.54, 71.95, 71.18, 71.86, 76.51, 75.32, 72.65, 70.07, 69.83, 72.32, 75.49, 83.21, 84.64, 83.99, 83.57, 81.78, 84.77, 85.75, 84.23, 84.58, 79.64, 81.32, 79.79, 80.28, 79.49, 81.98, 85.07, 88.18, 89.21, 91.93, 92.18, 93.77, 91.02, 92.78, 89.5, 91.16, 93.15, 94.08, 91.98, 95.28, 96.95, 93.1, 93.36, 88.55, 83.66, 85.84, 85.99, 86.08, 88.66, 88.47, 89.83] },
      velocityScore: { '1D': -0.4, '1W': 4.4, '1M': 10.7, '6M': null }, isNew: false,
      marketCap: '$187B', pe: 22.8, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.78,
      etfPresence: { POW: 2.25, VOLT: 5.3, PBD: false, PBW: false, IVEP: 4.32 },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 3, avgWeight: 3.31, proScore: 1.98, coverage: 0.6,
      price: 162.49, weeklyPrices: [158.05, 160.72, 158.02, 161.78, 162.49], weeklyChange: 2.81, dayChange: 0.44, sortRank: 0, periodReturns: { '1M': -3.9, 'YTD': 59.3, '6M': 50.5, '1Y': 118 },
      priceHistory: { '1D': [161.78, 162.51, 162.49], '1W': [158.05, 160.72, 158.02, 161.78, 162.49], '1M': [169, 167.34, 170.94, 177.02, 184.34, 168.37, 167.55, 171.91, 162.92, 163.35, 169.61, 159.99, 152.15, 156.89, 153.18, 154.76, 158.05, 160.72, 158.02, 161.78, 162.49], 'YTD': [101.97, 102.72, 112.5, 110.58, 115.79, 112.15, 115.65, 121.8, 110.55, 107.87, 122.58, 116.98, 117.41, 133.16, 135.8, 138.3, 169.41, 170.74, 161.86, 164.87, 173.88, 165.84, 184.34, 163.35, 154.76, 162.49], '6M': [107.98, 110.29, 112.26, 112.64, 113.25, 114.93, 120.27, 106.02, 109.93, 116.3, 116.98, 117.41, 133.16, 135.8, 141.71, 162.69, 173.39, 160.69, 169.29, 171.55, 163.81, 169, 168.37, 169.61, 154.76, 162.49], '1Y': [74.55, 74.63, 79.72, 89.73, 91.84, 88.15, 90.84, 89.48, 91.44, 96.2, 97.7, 98.64, 96, 99.51, 99.65, 104.22, 109.62, 109.59, 104.31, 104.93, 105.36, 107.42, 102.41, 103.97, 101.97, 102.72, 107.98, 110.29, 112.26, 112.64, 113.25, 114.93, 118.36, 106.02, 109.93, 116.3, 116.98, 117.41, 133.16, 135.8, 141.71, 162.69, 173.39, 160.69, 169.29, 171.55, 163.81, 169, 168.37, 169.61, 154.76, 162.49] },
      velocityScore: { '1D': 0.5, '1W': 1, '1M': -3.9, '6M': null }, isNew: false,
      marketCap: '$26B', pe: 55.3, revenueGrowth: 54, eps: 2.94, grossMargin: 37, dividendYield: 0.52,
      etfPresence: { POW: 3.96, VOLT: 3.08, PBD: false, PBW: false, IVEP: 2.88 },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 3, avgWeight: 3.18, proScore: 1.91, coverage: 0.6,
      price: 483.61, weeklyPrices: [485.41, 490.94, 477.03, 483.89, 483.61], weeklyChange: -0.37, dayChange: -0.03, sortRank: 0, periodReturns: { '1M': -1.3, 'YTD': 8.9, '6M': -0.1, '1Y': 16.6 },
      priceHistory: { '1D': [483.74, 483.6, 483.61], '1W': [485.41, 490.94, 477.03, 483.89, 483.61], '1M': [489.73, 502.65, 508.87, 523.69, 539.39, 509.96, 518.18, 536.04, 517.02, 514.71, 523.2, 490.12, 487.1, 495.6, 478.89, 480.5, 485.41, 490.94, 477.03, 483.89, 483.61], 'YTD': [444.11, 460.87, 489.31, 486.82, 495.59, 503.1, 522.3, 527.9, 476.51, 468.41, 492.65, 480.97, 499.2, 539.79, 546.23, 544.71, 507.81, 485.98, 463.32, 473.93, 485.27, 476.89, 539.39, 514.71, 480.5, 483.61], '6M': [484.11, 485.53, 487.94, 503.8, 524.12, 516.99, 516.98, 471.54, 467.38, 475.74, 480.97, 499.2, 539.79, 546.23, 555.34, 516, 490.16, 470.87, 478.05, 462.93, 485.03, 489.73, 509.96, 523.2, 480.5, 483.61], '1Y': [414.86, 428.55, 427.33, 427.67, 432.14, 432.81, 442.52, 430.15, 437.24, 435.44, 435.23, 430.31, 412.93, 427.43, 435.29, 455.34, 459.44, 450.12, 417.28, 429.82, 427.48, 438.7, 438.42, 455.92, 444.11, 460.87, 484.11, 485.53, 487.94, 503.8, 524.12, 516.99, 511.63, 471.54, 467.38, 475.74, 480.97, 499.2, 539.79, 546.23, 555.34, 516, 490.16, 470.87, 478.05, 462.93, 485.03, 489.73, 509.96, 523.2, 480.5, 483.61] },
      velocityScore: { '1D': 0, '1W': 8.5, '1M': 11, '6M': null }, isNew: false,
      marketCap: '$26B', pe: 28.5, revenueGrowth: 11, eps: 16.94, grossMargin: 36, dividendYield: 1.17,
      etfPresence: { POW: 2.94, VOLT: 3.78, PBD: false, PBW: false, IVEP: 2.82 },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy Corp', easyScore: 3, avgWeight: 2.74, proScore: 1.64, coverage: 0.6,
      price: 241.62, weeklyPrices: [257.02, 244.61, 233.49, 243.40, 241.62], weeklyChange: -5.99, dayChange: -0.71, sortRank: 0, periodReturns: { '1M': -12, 'YTD': 178.1, '6M': 73.6, '1Y': 854.6 },
      priceHistory: { '1D': [243.35, 242, 241.62], '1W': [257.02, 244.61, 233.49, 243.4, 241.62], '1M': [274.5, 280.88, 284.99, 328.91, 345.85, 321.98, 326.19, 309.18, 252.02, 275.01, 302.7, 289.5, 270.89, 295.05, 269.57, 254.29, 257.02, 244.61, 233.49, 243.4, 241.62], 'YTD': [86.89, 121.84, 149.5, 139.62, 156.13, 148.7, 157.27, 174.77, 159.99, 157.17, 166.69, 133.24, 135, 176.67, 218.27, 226.37, 295.25, 280.69, 282.31, 290.01, 291.37, 260.22, 345.85, 275.01, 254.29, 241.62], '6M': [139.17, 144.89, 151.37, 143.03, 139.74, 160.28, 166, 135.19, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 288.64, 283.92, 258.71, 302.4, 273.51, 253.57, 274.5, 321.98, 302.7, 254.29, 241.62], '1Y': [25.31, 25.93, 34.75, 37.61, 41.25, 43.1, 49.94, 51.35, 55, 73.29, 77.38, 84.57, 86.06, 114.06, 104.38, 113.28, 129.05, 127.07, 104.97, 94.29, 105, 109.44, 87.61, 91.43, 86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 160.28, 155.67, 135.19, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 288.64, 283.92, 258.71, 302.4, 273.51, 253.57, 274.5, 321.98, 302.7, 254.29, 241.62] },
      velocityScore: { '1D': 2.5, '1W': -24.1, '1M': -23.4, '6M': null }, isNew: false,
      marketCap: '$69B', pe: null, revenueGrowth: 130, eps: -0.05, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: 1.51, VOLT: 3.56, PBD: false, PBW: false, IVEP: 3.15 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'NRG', name: 'NRG Energy Inc', easyScore: 3, avgWeight: 1.48, proScore: 0.89, coverage: 0.6,
      price: 143.19, weeklyPrices: [137.48, 140.48, 140.42, 139.48, 143.19], weeklyChange: 4.15, dayChange: 3.51, sortRank: 0, periodReturns: { '1M': 9.8, 'YTD': -10.1, '6M': -9.7, '1Y': -2.5 },
      priceHistory: { '1D': [138.34, 142.72, 143.19, 143.19], '1W': [137.48, 140.48, 140.42, 139.48, 143.19], '1M': [130.4, 132.1, 132.13, 135.06, 138.91, 137.66, 142.21, 147.11, 149.36, 149.11, 146.06, 140.8, 136.7, 141.01, 138.01, 137.48, 140.48, 140.42, 139.48, 143.19], 'YTD': [159.24, 143.53, 152.05, 149.93, 149.11, 155.72, 171.06, 183.59, 163.54, 152.1, 161.4, 146.14, 152.69, 170.24, 157.18, 160.15, 154.82, 137.34, 123.71, 138, 133.39, 123.7, 135.06, 149.36, 138.01, 143.19], '6M': [158.5, 149.3, 152.63, 153.32, 172.35, 179.18, 178.96, 154.32, 152.87, 145.8, 147.74, 149.8, 170.24, 167.73, 159.81, 153.37, 138.11, 127.81, 137.65, 129.47, 127.71, 125.47, 138.91, 149.11, 138.01, 143.19], '1Y': [146.88, 153.96, 159.87, 171.96, 156.69, 148.38, 144.77, 145.11, 152.26, 164.22, 167.43, 161.95, 162.61, 165.61, 163.59, 172.76, 174.48, 166.72, 163.21, 166.85, 164.08, 166.75, 160.15, 158.11, 159.24, 143.53, 149.83, 151.09, 153.72, 144.44, 161.8, 179.18, 178.96, 154.32, 152.87, 145.8, 146.14, 152.69, 164.07, 167.73, 159.81, 153.37, 138.11, 127.81, 137.65, 129.47, 129.2, 125.47, 138.91, 149.11, 138.01, 143.19] },
      velocityScore: { '1D': -2.2, '1W': 9.9, '1M': 23.6, '6M': null }, isNew: false,
      marketCap: '$30B', pe: 157.4, revenueGrowth: 20, eps: 0.91, grossMargin: 16, dividendYield: 1.37,
      etfPresence: { POW: 0.54, VOLT: 1.03, PBD: false, PBW: false, IVEP: 2.87 },
      tonyNote: 'NRG Energy Inc appears in 3 of 5 Electrification ETFs (60% coverage) with average weight 1.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, avgWeight: 5.62, proScore: 2.25, coverage: 0.4,
      price: 274.68, weeklyPrices: [258.67, 267.69, 272.58, 263.26, 274.68], weeklyChange: 6.19, dayChange: -1.68, sortRank: 0, periodReturns: { '1M': -9.1, 'YTD': 61.9, '6M': 39.7, '1Y': 179.6 },
      priceHistory: { '1D': [279.39, 277.5, 274.68], '1W': [258.67, 267.69, 272.58, 263.26, 274.68], '1M': [302.15, 293.22, 299.84, 296.39, 304.33, 288.64, 294.15, 310.32, 310.64, 315.65, 333.04, 318.06, 266.94, 277.45, 251.53, 258.67, 267.69, 272.58, 263.26, 274.68], 'YTD': [169.63, 180.24, 200.11, 205.17, 215.59, 229.32, 221.19, 234.67, 213.8, 195.18, 214.95, 204.11, 204.65, 237.93, 254.38, 250.96, 286.69, 298.22, 249.71, 280.13, 276.54, 296.55, 296.39, 310.64, 251.53, 274.68], '6M': [196.61, 196.5, 201.19, 220.78, 232.84, 235.04, 229.71, 191.87, 197.65, 204.09, 203.53, 206.9, 237.93, 254.25, 276.65, 283.6, 297.98, 256.72, 270.01, 269.86, 279.13, 293.87, 304.33, 315.65, 251.53, 274.68], '1Y': [98.24, 106, 130.49, 131.71, 134.66, 127.8, 137.03, 135.97, 143.15, 148.78, 146.79, 141.02, 141.25, 147.14, 148, 154.78, 158.57, 166.99, 141.86, 145.88, 161.55, 167.43, 171.76, 177.23, 169.63, 180.24, 192.96, 200.29, 210.44, 208, 231.48, 235.04, 229.71, 191.87, 197.65, 204.09, 204.11, 204.65, 235.73, 254.25, 276.65, 283.6, 297.98, 256.72, 270.01, 269.86, 262.56, 293.87, 304.33, 315.65, 251.53, 274.68] },
      velocityScore: { '1D': 4.7, '1W': 10.3, '1M': -0.9, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 66, revenueGrowth: 17, eps: 4.16, grossMargin: 39, dividendYield: 0.1,
      etfPresence: { POW: 3.67, VOLT: 7.56, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 2, avgWeight: 5.18, proScore: 2.07, coverage: 0.4,
      price: 239.63, weeklyPrices: [231.85, 236.58, 232.19, 225.66, 239.63], weeklyChange: 3.35, dayChange: 2.29, sortRank: 0, periodReturns: { '1M': -21.1, 'YTD': 125.5, '6M': 77.3, '1Y': 240.5 },
      priceHistory: { '1D': [234.25, 239.49, 239.63, 239.63], '1W': [231.85, 236.58, 232.19, 225.66, 239.63], '1M': [303.53, 292.7, 294.03, 297.2, 307.8, 291.5, 294.49, 309.2, 279.77, 281.09, 286.36, 264.86, 246.33, 248.05, 234.05, 231.85, 236.58, 232.19, 225.66, 239.63], 'YTD': [106.26, 119.94, 139.99, 141.15, 146.79, 187.3, 180.99, 183, 170.96, 171.19, 175.13, 174.8, 182.6, 228.99, 241.65, 260.52, 269.95, 308.05, 261.58, 295.94, 300.06, 290.5, 297.2, 279.77, 234.05, 239.63], '6M': [135.18, 139.32, 147.86, 194.74, 195.02, 182.27, 174.53, 161.22, 167.57, 172, 179.35, 186.72, 228.99, 241.01, 252.76, 275.33, 309.39, 292.65, 279.22, 288.12, 293.6, 294.75, 307.8, 281.09, 234.05, 239.63], '1Y': [70.37, 73.67, 77.77, 78.75, 90.06, 84.7, 86.12, 87.92, 92.3, 99.41, 97.41, 101.6, 104.42, 105.73, 116.11, 128.09, 130.23, 124.62, 105.94, 100.03, 107.5, 115.02, 110.88, 112.88, 106.26, 119.94, 133.76, 142.29, 152.31, 179.6, 197.63, 182.27, 174.53, 161.22, 167.57, 172, 174.8, 182.6, 230.94, 241.01, 252.76, 275.33, 309.39, 292.65, 279.22, 288.12, 284.87, 294.75, 307.8, 281.09, 234.05, 239.63] },
      velocityScore: { '1D': 2, '1W': -0.5, '1M': -36.1, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 46.7, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.15,
      etfPresence: { POW: 4.24, VOLT: 6.11, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, avgWeight: 3.67, proScore: 1.47, coverage: 0.4,
      price: 134.39, weeklyPrices: [135.90, 133.85, 135.43, 135.63, 134.39], weeklyChange: -1.11, dayChange: -0.41, sortRank: 0, periodReturns: { '1M': 3.9, 'YTD': 16.5, '6M': 12.6, '1Y': 28.7 },
      priceHistory: { '1D': [134.94, 134.79, 134.58, 134.39], '1W': [135.9, 133.85, 135.43, 135.63, 134.39], '1M': [129.31, 129.75, 128.27, 127.69, 130.3, 133.74, 134.96, 137, 138.69, 137.97, 136.81, 135.05, 138.51, 135.98, 137.53, 135.9, 133.85, 135.43, 135.63, 134.39], 'YTD': [115.31, 115.93, 119.96, 118.02, 118.33, 121.1, 127.27, 132.46, 133.52, 132.22, 128.72, 128.85, 132.68, 134.46, 133.28, 135.07, 134.66, 131.94, 128.92, 129.57, 127.79, 128.48, 127.69, 138.69, 137.53, 134.39], '6M': [119.4, 116.63, 119.78, 120.8, 129.94, 129.37, 133.82, 131.87, 133.61, 125.66, 130.1, 132.36, 134.46, 133.66, 134.73, 136.91, 130.16, 125.15, 131.59, 123.79, 126.77, 129.23, 130.3, 137.97, 137.53, 134.39], '1Y': [104.4, 110.16, 109.22, 113.24, 111.99, 112.66, 113.01, 110.09, 108.36, 106.84, 108.14, 112.5, 118.16, 118.38, 117.43, 115.11, 119.92, 122.56, 123.72, 122.04, 119.23, 116.07, 114.57, 115.15, 115.31, 115.93, 118.11, 117.18, 119.21, 120.61, 126.43, 129.37, 133.82, 131.87, 133.61, 125.66, 128.85, 132.68, 136.3, 133.66, 134.73, 136.91, 130.16, 125.15, 131.59, 123.79, 129.14, 129.23, 130.3, 137.97, 137.53, 134.39] },
      velocityScore: { '1D': -2, '1W': -2.6, '1M': 30.1, '6M': null }, isNew: false,
      marketCap: '$73B', pe: 19.9, revenueGrowth: 10, eps: 6.76, grossMargin: 47, dividendYield: 2.82,
      etfPresence: { POW: 2.86, VOLT: 4.49, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 2, avgWeight: 3.25, proScore: 1.3, coverage: 0.4,
      price: 308.44, weeklyPrices: [323.92, 318.86, 305.87, 303.58, 308.44], weeklyChange: -4.78, dayChange: 1.57, sortRank: 0, periodReturns: { '1M': -1.1, 'YTD': 90.4, '6M': 78.8, '1Y': 142.2 },
      priceHistory: { '1D': [303.67, 306.99, 308.44], '1W': [323.92, 318.86, 305.87, 303.58, 308.44], '1M': [311.93, 299.6, 317.58, 333.05, 357.96, 318.32, 316.43, 325.57, 303.95, 306.97, 334.82, 311.42, 300.53, 318.47, 305.58, 317.81, 323.92, 318.86, 305.87, 303.58, 308.44], 'YTD': [162.01, 160.78, 176.93, 181.23, 190.01, 199.62, 243.21, 262.19, 249.75, 265.38, 269.17, 251.07, 258.73, 299.96, 314.41, 305.03, 341.02, 367.13, 315.67, 314.18, 323.92, 302.87, 357.96, 306.97, 317.81, 308.44], '6M': [172.54, 182.49, 186.18, 195.58, 234.53, 245.42, 257.75, 241.78, 258.88, 255.88, 251.07, 258.73, 299.96, 314.41, 322.43, 330.97, 367.92, 339.73, 323.91, 323.39, 300.57, 311.93, 318.32, 334.82, 317.81, 308.44], '1Y': [127.37, 125.29, 142.7, 138.76, 143.72, 129.05, 127.93, 124.01, 125.58, 136.65, 142.61, 150.86, 158.87, 175.15, 174.8, 190.57, 180.82, 179.05, 164.86, 169.57, 180.91, 178.38, 160.66, 166.26, 162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 234.53, 245.42, 254.89, 241.78, 258.88, 255.88, 251.07, 258.73, 299.96, 314.41, 322.43, 330.97, 367.92, 339.73, 323.91, 323.39, 300.57, 311.93, 318.32, 334.82, 317.81, 308.44] },
      velocityScore: { '1D': -2.3, '1W': -2.3, '1M': 1.6, '6M': null }, isNew: false,
      marketCap: '$118B', pe: 77.5, revenueGrowth: 30, eps: 3.98, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 2.45, PBD: false, PBW: false, IVEP: 4.05 },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 2.83, proScore: 1.13, coverage: 0.4,
      price: 76.17, weeklyPrices: [75.27, 75.45, 75.02, 74.46, 76.17], weeklyChange: 1.2, dayChange: 0.24, sortRank: 0, periodReturns: { '1M': 6.5, 'YTD': 26.7, '6M': 26.3, '1Y': 30.5 },
      priceHistory: { '1D': [75.99, 75.98, 76.17, 76.17], '1W': [75.27, 75.45, 75.02, 74.46, 76.17], '1M': [71.49, 71.48, 71.25, 73.12, 74.95, 75.79, 75.87, 77.53, 77.92, 75.06, 74.34, 72.77, 73.14, 72.82, 75.08, 75.27, 75.45, 75.02, 74.46, 76.17], 'YTD': [60.11, 61.15, 61.55, 64.29, 66.34, 67.85, 72.14, 73.97, 75.77, 73.52, 74.06, 74.06, 72, 71.54, 70.91, 71.61, 75.41, 74.73, 79.4, 74.37, 72.43, 71.62, 73.12, 77.92, 75.08, 76.17], '6M': [60.29, 64.96, 67.26, 66.92, 72.28, 72.98, 74.72, 74.24, 73.34, 72.41, 73.58, 72.59, 71.54, 71.15, 72.18, 75.54, 71.96, 77.72, 78.47, 70.04, 71.59, 72.08, 74.95, 75.06, 75.08, 76.17], '1Y': [58.37, 57.36, 58.89, 59, 57.76, 56.57, 56.83, 57.38, 57.57, 57.95, 61.39, 63.35, 63.97, 62.36, 62.34, 57.59, 59.03, 60.6, 59.91, 59.43, 60.21, 61.55, 58.41, 59.75, 60.11, 61.15, 60.71, 63.72, 67.24, 67.42, 71.13, 72.98, 74.72, 74.24, 73.34, 72.41, 74.06, 72, 72.74, 71.15, 72.18, 75.54, 71.96, 77.72, 78.47, 70.04, 71.96, 72.08, 74.95, 75.06, 75.08, 76.17] },
      velocityScore: { '1D': 0.9, '1W': 2.7, '1M': 9.7, '6M': null }, isNew: false,
      marketCap: '$93B', pe: 33.4, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.76,
      etfPresence: { POW: false, VOLT: 1.61, PBD: false, PBW: false, IVEP: 4.05 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'APH', name: 'Amphenol Corp', easyScore: 2, avgWeight: 2.75, proScore: 1.1, coverage: 0.4,
      price: 159.3, weeklyPrices: [158.22, 162.24, 159.06, 155.99, 159.30], weeklyChange: 0.69, dayChange: 0.57, sortRank: 0, periodReturns: { '1M': 0.5, 'YTD': 17.9, '6M': 3.3, '1Y': 60.2 },
      priceHistory: { '1D': [158.4, 158.5, 158.52, 159.3], '1W': [158.22, 162.24, 159.06, 155.99, 159.3], '1M': [158.59, 158.81, 161.11, 163.96, 165.96, 158.7, 162.78, 165.15, 163.72, 166.42, 176.32, 172.22, 164.59, 166.81, 158.61, 158.22, 162.24, 159.06, 155.99, 159.3], 'YTD': [135.14, 136.25, 154.39, 155.56, 144.93, 144.2, 147.73, 152.64, 132.75, 131.47, 130.65, 123.13, 128, 145.27, 152.81, 148.64, 141.03, 127.87, 119.2, 140.24, 146.77, 152.46, 163.96, 163.72, 158.61, 159.3], '6M': [154.22, 150.99, 144.08, 136.23, 146.72, 151.04, 146.06, 131.87, 133.92, 126.74, 123.62, 126.49, 145.27, 151.06, 149.71, 142.3, 128.03, 125, 132.06, 146.34, 143.6, 153.8, 165.96, 166.42, 158.61, 159.3], '1Y': [99.44, 101.78, 105.31, 107.93, 111.85, 109.98, 109.73, 109.25, 116.79, 119.04, 125.4, 123.75, 124.53, 122.64, 124.44, 137.29, 141.55, 143.85, 132.33, 137.88, 141.49, 138.58, 129.13, 137.12, 135.14, 136.25, 146.75, 152.5, 149.58, 127.63, 143.73, 151.04, 146.06, 131.87, 133.92, 126.74, 123.13, 128, 140.75, 151.06, 149.71, 142.3, 128.03, 125, 132.06, 146.34, 138.81, 153.8, 165.96, 166.42, 158.61, 159.3] },
      velocityScore: { '1D': 0, '1W': -0.9, '1M': 4.8, '6M': null }, isNew: false,
      marketCap: '$196B', pe: 45.8, revenueGrowth: 58, eps: 3.48, grossMargin: 38, dividendYield: 0.63,
      etfPresence: { POW: 1.05, VOLT: 4.45, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'CEG', name: 'Constellation Energy Corp', easyScore: 2, avgWeight: 2.71, proScore: 1.08, coverage: 0.4,
      price: 261.45, weeklyPrices: [250.74, 251.38, 257.57, 256.43, 261.45], weeklyChange: 4.27, dayChange: 1.96, sortRank: 0, periodReturns: { '1M': -0.3, 'YTD': -26, '6M': -23.4, '1Y': -17.8 },
      priceHistory: { '1D': [256.43, 262.63, 261.27, 261.45], '1W': [250.74, 251.38, 257.57, 256.43, 261.45], '1M': [262.35, 268, 267.17, 274.06, 275.53, 270.26, 267.97, 268.69, 264.02, 259.32, 248.37, 236.5, 239.25, 245.87, 239.71, 244.52, 250.74, 251.38, 257.57, 256.43, 261.45], 'YTD': [353.27, 322.54, 307.71, 285.27, 270.88, 271.14, 294.05, 325.84, 332.07, 301.55, 316.47, 301.49, 275.16, 291.72, 287.56, 305.71, 320.42, 293.6, 281.26, 286.31, 264.59, 253.76, 275.53, 259.32, 244.52, 261.45], '6M': [341.2, 289.06, 280.68, 261.42, 288.43, 293.8, 327.16, 319.06, 301.77, 281.99, 301.49, 275.16, 291.72, 287.56, 315.17, 321.05, 299.69, 262, 301.57, 265.7, 250.67, 262.35, 270.26, 248.37, 244.52, 261.45], '1Y': [317.99, 317.79, 330.52, 343.57, 338.57, 317.23, 316.58, 307.19, 300.82, 322.91, 336.65, 329.07, 358.16, 389.56, 358.79, 384.95, 362.82, 351.67, 339.35, 351.6, 363.67, 359.15, 365.63, 361.33, 353.27, 322.54, 341.2, 289.06, 280.68, 261.42, 288.43, 293.8, 329.88, 319.06, 301.77, 281.99, 301.49, 275.16, 291.72, 287.56, 315.17, 321.05, 299.69, 262, 301.57, 265.7, 250.67, 262.35, 270.26, 248.37, 244.52, 261.45] },
      velocityScore: { '1D': -1.8, '1W': 21.3, '1M': 16.1, '6M': null }, isNew: false,
      marketCap: '$93B', pe: 22.8, revenueGrowth: 64, eps: 11.46, grossMargin: 23, dividendYield: 0.67,
      etfPresence: { POW: 1.32, VOLT: false, PBD: false, PBW: false, IVEP: 4.09 },
      tonyNote: 'Constellation Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'JCI', name: 'JOHNSON CONTROLS INTERNATIONAL PLC', easyScore: 2, avgWeight: 2.69, proScore: 1.08, coverage: 0.4,
      price: 145.15, weeklyPrices: [140.23, 140.53, 142.81, 143.93, 145.15], weeklyChange: 3.51, dayChange: -0.08, sortRank: 0, periodReturns: { '1M': -0.6, 'YTD': 21.2, '6M': 28.5, '1Y': 36.9 },
      priceHistory: { '1D': [145.26, 145.43, 144.95, 145.15], '1W': [140.23, 140.53, 142.81, 143.93, 145.15], '1M': [146.06, 145.17, 143.62, 144.82, 148.21, 141.28, 142.81, 145.49, 138.4, 140.47, 146.11, 144.8, 140.76, 142.72, 140.62, 140.23, 140.53, 142.81, 143.93, 145.15], 'YTD': [119.75, 111.29, 114.61, 115.07, 122.98, 139, 139.48, 144.49, 140, 130.94, 133.25, 131.57, 132.97, 142.82, 140.98, 143.38, 144.4, 141.04, 135.42, 138.2, 147.4, 144.01, 144.82, 138.4, 140.62, 145.15], '6M': [112.95, 113.59, 119.26, 137.65, 139.24, 143.79, 144.3, 132.4, 130.16, 129.7, 131.29, 133.75, 142.82, 140.87, 141.92, 145.08, 139.52, 143.08, 138.36, 133.91, 144.05, 144.96, 148.21, 140.47, 140.62, 145.15], '1Y': [106.02, 108.3, 103.24, 104.84, 106.64, 104.52, 106.4, 105.96, 106.29, 106.96, 108.29, 109.95, 108.31, 107.85, 111.18, 112.21, 113.18, 122.58, 116.38, 114.19, 115.28, 115.77, 118.85, 121.13, 119.75, 111.29, 112.13, 114.51, 120.28, 132.52, 138.57, 143.79, 144.3, 132.4, 130.16, 129.7, 131.57, 132.97, 142.53, 140.87, 141.92, 145.08, 139.52, 143.08, 138.36, 133.91, 143.65, 144.96, 148.21, 140.47, 140.62, 145.15] },
      velocityScore: { '1D': 0, '1W': 4.9, '1M': 4.9, '6M': null }, isNew: false,
      marketCap: '$89B', pe: 44.4, revenueGrowth: 8, eps: 3.27, grossMargin: 37, dividendYield: 1.1,
      etfPresence: { POW: false, VOLT: 1.49, PBD: false, PBW: false, IVEP: 3.89 },
      tonyNote: 'JOHNSON CONTROLS INTERNATIONAL PLC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VST', name: 'Vistra Corp', easyScore: 2, avgWeight: 2.51, proScore: 1, coverage: 0.4,
      price: 165.59, weeklyPrices: [157.98, 158.86, 158.12, 158.43, 165.59], weeklyChange: 4.82, dayChange: 4.55, sortRank: 0, periodReturns: { '1M': 7.9, 'YTD': 2.6, '6M': -8.1, '1Y': -13.5 },
      priceHistory: { '1D': [158.39, 165.39, 164.41, 165.59], '1W': [157.98, 158.86, 158.12, 158.43, 165.59], '1M': [153.52, 158.61, 158.83, 163.75, 167.26, 162.39, 162.87, 167.77, 163.49, 162.38, 158.63, 153.16, 151.05, 157.22, 155.73, 154.82, 157.98, 158.86, 158.12, 158.43, 165.59], 'YTD': [161.33, 150.6, 166.6, 158.81, 154.26, 159.6, 170.57, 175.36, 167.4, 159.58, 167.37, 155.48, 151.59, 158.2, 159.6, 161.12, 160.38, 146.87, 144, 160.28, 153.7, 148.02, 167.26, 162.38, 154.82, 165.59], '6M': [180.18, 160.12, 158.35, 149.65, 171.49, 167.8, 165.99, 158.65, 158.95, 146.02, 155.48, 151.59, 158.2, 159.6, 166.58, 160.85, 152.05, 136.75, 164.56, 154.76, 146.9, 153.52, 162.39, 158.63, 154.82, 165.59], '1Y': [191.37, 189.09, 198, 209.6, 209.56, 193.52, 195.12, 185.81, 193.78, 209.43, 204.24, 195.92, 199.62, 205.51, 186.52, 190.59, 185.74, 179.16, 174.42, 170.84, 172.55, 164.81, 173.45, 161.67, 161.33, 150.6, 180.18, 160.12, 158.35, 149.65, 171.49, 167.8, 173.89, 158.65, 158.95, 146.02, 155.48, 151.59, 158.2, 159.6, 166.58, 160.85, 152.05, 136.75, 164.56, 154.76, 146.9, 153.52, 162.39, 158.63, 154.82, 165.59] },
      velocityScore: { '1D': -2, '1W': 4.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$56B', pe: 27.7, revenueGrowth: 43, eps: 5.97, grossMargin: 39, dividendYield: 0.58,
      etfPresence: { POW: 1.52, VOLT: false, PBD: false, PBW: false, IVEP: 3.5 },
      tonyNote: 'Vistra Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, avgWeight: 2.46, proScore: 0.99, coverage: 0.4,
      price: 308.86, weeklyPrices: [293.64, 309.27, 308.05, 298.52, 308.86], weeklyChange: 5.18, dayChange: 1.2, sortRank: 0, periodReturns: { '1M': -16.7, 'YTD': 47.5, '6M': 20, '1Y': 122 },
      priceHistory: { '1D': [305.2, 311.23, 308.86], '1W': [293.64, 309.27, 308.05, 298.52, 308.86], '1M': [370.66, 350.45, 353.32, 372.59, 388.23, 364.96, 359.61, 375.15, 348.11, 348.15, 372.87, 356.35, 311.27, 310.84, 287.73, 293.64, 309.27, 308.05, 298.52, 308.86], 'YTD': [209.37, 210.99, 253.86, 263.03, 261.82, 279.17, 321.34, 338.51, 330.54, 305.82, 327.8, 313.11, 332.31, 378.94, 380.22, 385.68, 387.03, 339.42, 302.84, 328.34, 320.92, 340.4, 372.59, 348.11, 287.73, 308.86], '6M': [257.29, 262.19, 255.36, 273.26, 314.27, 331.23, 335.57, 290.78, 302.02, 317.21, 310.76, 331.9, 378.94, 375.6, 387.24, 389.05, 357.24, 323.46, 324.86, 294.65, 306.11, 354.37, 388.23, 348.15, 287.73, 308.86], '1Y': [139.1, 140.68, 142.21, 139.58, 158.81, 150.41, 153.01, 145.49, 154.76, 158.03, 176.59, 170.14, 173.09, 182.75, 196.58, 204.62, 205.61, 219.3, 198.54, 206.04, 210.94, 221.27, 215.16, 217.51, 209.37, 210.99, 237.9, 275.57, 269.12, 257.64, 312.95, 331.23, 335.57, 290.78, 302.02, 317.21, 313.11, 332.31, 379.64, 375.6, 387.24, 389.05, 357.24, 323.46, 324.86, 294.65, 294.81, 354.37, 388.23, 348.15, 287.73, 308.86] },
      velocityScore: { '1D': 1, '1W': 5.3, '1M': -11.6, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 64.1, revenueGrowth: 26, eps: 4.82, grossMargin: 39, dividendYield: 0.13,
      etfPresence: { POW: 1, VOLT: 3.93, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'TLN', name: 'Talen Energy Corp', easyScore: 2, avgWeight: 2.28, proScore: 0.91, coverage: 0.4,
      price: 406, weeklyPrices: [384.44, 385.80, 396.35, 396.95, 406.00], weeklyChange: 5.61, dayChange: 2.28, sortRank: 0, periodReturns: { '1M': 5.1, 'YTD': 8.3, '6M': -3.1, '1Y': 51.4 },
      priceHistory: { '1D': [396.95, 409.31, 406], '1W': [384.44, 385.8, 396.35, 396.95, 406], '1M': [386.21, 406.51, 409.81, 436.29, 438.12, 411.92, 405.89, 416.8, 404.09, 399.34, 384.26, 360.79, 364.67, 377.79, 366.66, 367.88, 384.44, 385.8, 396.35, 396.95, 406], 'YTD': [374.84, 356, 371.66, 350.41, 340.8, 357.93, 380.29, 391.43, 334.86, 311.45, 340.07, 324.54, 324.09, 326.08, 346.26, 361.17, 384.9, 374.61, 344.46, 381.47, 378.08, 360.54, 438.12, 399.34, 367.88, 406], '6M': [419.07, 366.43, 348.36, 345, 376.7, 367.84, 353.24, 320.56, 316.14, 302.97, 324.54, 324.09, 326.08, 346.26, 369.67, 384.64, 383.44, 324.21, 389, 377.2, 364.78, 386.21, 411.92, 384.26, 367.88, 406], '1Y': [268.15, 313.58, 361.21, 384.27, 380.61, 368.16, 378.79, 375.15, 389.43, 409.6, 423.13, 425.38, 431.04, 417.75, 382.09, 394, 395.25, 374.55, 374.8, 378.99, 367.96, 348.38, 376.77, 380.75, 374.84, 356, 419.07, 366.43, 348.36, 345, 376.7, 367.84, 370.97, 320.56, 316.14, 302.97, 324.54, 324.09, 326.08, 346.26, 369.67, 384.64, 383.44, 324.21, 389, 377.2, 364.78, 386.21, 411.92, 384.26, 367.88, 406] },
      velocityScore: { '1D': -1.1, '1W': 4.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: null, revenueGrowth: 97, eps: -0.52, grossMargin: 40, dividendYield: null,
      etfPresence: { POW: 1.82, VOLT: false, PBD: false, PBW: false, IVEP: 2.75 },
      tonyNote: 'Talen Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SO', name: 'Southern Co/The', easyScore: 2, avgWeight: 2.22, proScore: 0.89, coverage: 0.4,
      price: 95.86, weeklyPrices: [96.38, 95.17, 95.61, 96.47, 95.86], weeklyChange: -0.54, dayChange: -0.11, sortRank: 0, periodReturns: { '1M': 2.2, 'YTD': 9.9, '6M': 8, '1Y': 3.7 },
      priceHistory: { '1D': [95.96, 95.96, 95.87, 95.86], '1W': [96.38, 95.17, 95.61, 96.47, 95.86], '1M': [93.82, 94.31, 92.53, 93.09, 93.43, 94.93, 95.78, 95.91, 97.16, 96.75, 95.71, 95.12, 97.98, 95.99, 97.29, 96.38, 95.17, 95.61, 96.47, 95.86], 'YTD': [87.2, 87.22, 88.9, 88.16, 88.19, 89.38, 91.04, 95.92, 97.63, 97.84, 96.23, 95.42, 97.45, 95.93, 93.51, 93.77, 95.99, 93.47, 94.14, 93.74, 91.62, 93.27, 93.09, 97.16, 97.29, 95.86], '6M': [88.78, 87.54, 89.31, 90.08, 94.95, 94.3, 97.38, 97.48, 98.01, 93.39, 95.55, 96.94, 95.93, 94.51, 93.49, 96.71, 91.8, 92.55, 94.55, 89.03, 91.28, 94, 93.43, 96.75, 97.29, 95.86], '1Y': [92.47, 95.85, 95.2, 94.39, 93.96, 94.18, 93.13, 92.09, 91.21, 91.36, 93.72, 94.77, 96.42, 99.68, 97, 93.91, 93.15, 90.76, 90.58, 89.14, 89.04, 85.49, 85.71, 86.39, 87.2, 87.22, 88.42, 87.51, 89.14, 91.08, 92.56, 94.3, 97.38, 97.48, 98.01, 93.39, 95.42, 97.45, 97.15, 94.51, 93.49, 96.71, 91.8, 92.55, 94.55, 89.03, 92.6, 94, 93.43, 96.75, 97.29, 95.86] },
      velocityScore: { '1D': -1.1, '1W': 3.5, '1M': 9.9, '6M': null }, isNew: false,
      marketCap: '$108B', pe: 24.5, revenueGrowth: 8, eps: 3.91, grossMargin: 48, dividendYield: 3.17,
      etfPresence: { POW: 0.34, VOLT: false, PBD: false, PBW: false, IVEP: 4.11 },
      tonyNote: 'Southern Co/The appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 5.09, proScore: 2.04, coverage: 0.4,
      price: 931.92, weeklyPrices: [948.08, 938.39, 952.41, 931.47, 931.92], weeklyChange: -1.7, dayChange: -0.2, sortRank: 0, periodReturns: { '1M': -0.2, 'YTD': 62.7, '6M': 44, '1Y': 130.3 },
      priceHistory: { '1D': [933.82, 930.34, 930.3, 931.92], '1W': [948.08, 938.39, 952.41, 931.47, 931.92], '1M': [933.93, 945.46, 955.92, 985.82, 1022.28, 984.24, 994.45, 1057.01, 997.47, 1033.19, 1064.9, 991.41, 963.53, 969.92, 940.12, 948.08, 938.39, 952.41, 931.47, 931.92], 'YTD': [572.87, 608.13, 646.89, 635.92, 690.91, 742.12, 751.97, 766.61, 731.97, 700.69, 688.65, 703.19, 717.22, 791.73, 798.4, 828.79, 874.78, 912.14, 860.15, 909.93, 940.48, 897.63, 985.82, 997.47, 940.12, 931.92], '6M': [647.18, 626.62, 657.36, 726.2, 774.2, 759.74, 742.83, 680.9, 693.99, 680.88, 695.4, 721.24, 791.73, 794.65, 830.79, 889.67, 897.45, 888.31, 879.89, 865.36, 915.64, 910.57, 1022.28, 1033.19, 940.12, 931.92], '1Y': [404.64, 417.19, 430.05, 434.23, 412.71, 416.09, 432.3, 416.05, 418.09, 440.67, 471.26, 477.15, 486.71, 527.47, 524.65, 524.47, 570.59, 570.85, 552.05, 559.6, 582.47, 594.36, 588.93, 582.42, 572.87, 608.13, 638.75, 648.41, 665.24, 678.31, 758.29, 759.74, 742.83, 680.9, 693.99, 680.88, 703.19, 717.22, 790.66, 794.65, 830.79, 889.67, 897.45, 888.31, 879.89, 865.36, 904.28, 910.57, 1022.28, 1033.19, 940.12, 931.92] },
      velocityScore: { '1D': -0.5, '1W': 0, '1M': 3, '6M': null }, isNew: false,
      marketCap: '$429B', pe: 46.4, revenueGrowth: 22, eps: 20.07, grossMargin: 29, dividendYield: 0.7,
      etfPresence: { AIRR: false, PRN: 3.29, RSHO: 6.89, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 4.76, proScore: 1.9, coverage: 0.4,
      price: 239.63, weeklyPrices: [231.85, 236.58, 232.19, 225.66, 239.63], weeklyChange: 3.35, dayChange: 2.29, sortRank: 0, periodReturns: { '1M': -21.1, 'YTD': 125.5, '6M': 77.3, '1Y': 240.5 },
      priceHistory: { '1D': [234.25, 239.49, 239.63, 239.63], '1W': [231.85, 236.58, 232.19, 225.66, 239.63], '1M': [303.53, 292.7, 294.03, 297.2, 307.8, 291.5, 294.49, 309.2, 279.77, 281.09, 286.36, 264.86, 246.33, 248.05, 234.05, 231.85, 236.58, 232.19, 225.66, 239.63], 'YTD': [106.26, 119.94, 139.99, 141.15, 146.79, 187.3, 180.99, 183, 170.96, 171.19, 175.13, 174.8, 182.6, 228.99, 241.65, 260.52, 269.95, 308.05, 261.58, 295.94, 300.06, 290.5, 297.2, 279.77, 234.05, 239.63], '6M': [135.18, 139.32, 147.86, 194.74, 195.02, 182.27, 174.53, 161.22, 167.57, 172, 179.35, 186.72, 228.99, 241.01, 252.76, 275.33, 309.39, 292.65, 279.22, 288.12, 293.6, 294.75, 307.8, 281.09, 234.05, 239.63], '1Y': [70.37, 73.67, 77.77, 78.75, 90.06, 84.7, 86.12, 87.92, 92.3, 99.41, 97.41, 101.6, 104.42, 105.73, 116.11, 128.09, 130.23, 124.62, 105.94, 100.03, 107.5, 115.02, 110.88, 112.88, 106.26, 119.94, 133.76, 142.29, 152.31, 179.6, 197.63, 182.27, 174.53, 161.22, 167.57, 172, 174.8, 182.6, 230.94, 241.01, 252.76, 275.33, 309.39, 292.65, 279.22, 288.12, 284.87, 294.75, 307.8, 281.09, 234.05, 239.63] },
      velocityScore: { '1D': 0, '1W': -0.5, '1M': -9.1, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 46.7, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.15,
      etfPresence: { AIRR: 2.19, PRN: false, RSHO: 7.33, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 4.61, proScore: 1.84, coverage: 0.4,
      price: 671.47, weeklyPrices: [660.72, 707.17, 682.29, 660.04, 671.47], weeklyChange: 1.63, dayChange: -1.2, sortRank: 0, periodReturns: { '1M': -22.5, 'YTD': 119.3, '6M': 99.7, '1Y': 181.7 },
      priceHistory: { '1D': [679.62, 673.22, 670.75, 671.47], '1W': [660.72, 707.17, 682.29, 660.04, 671.47], '1M': [866.67, 857.76, 838.21, 861.88, 932.75, 892.25, 867.23, 881.92, 804.76, 813.77, 839.36, 776.55, 700.75, 717.11, 674.39, 660.72, 707.17, 682.29, 660.04, 671.47], 'YTD': [306.23, 297.62, 350.96, 361.21, 367.95, 418.61, 410.63, 455.25, 420.22, 404.59, 431.78, 415.93, 416.34, 459.02, 472.9, 505.45, 529.49, 851.35, 728.29, 782.12, 993.74, 838.55, 861.88, 804.76, 674.39, 671.47], '6M': [336.31, 351.39, 357.91, 401.29, 437.77, 435.5, 428.13, 395.11, 398.12, 401.61, 420.24, 393.71, 459.02, 463.65, 497.18, 532.67, 844.8, 848.84, 732.94, 845.39, 891.86, 858.99, 932.75, 813.77, 674.39, 671.47], '1Y': [238.4, 242.01, 264.08, 296.58, 308.4, 276.02, 286.49, 276.91, 286.69, 319.38, 371.84, 339.68, 348.57, 361.44, 364.32, 379.89, 392.77, 384.45, 332.82, 342.44, 327.78, 324.1, 319.13, 315.87, 306.23, 297.62, 319.27, 364.25, 379.23, 365.07, 431.43, 435.5, 428.13, 395.11, 398.12, 401.61, 415.93, 416.34, 446.36, 463.65, 497.18, 532.67, 844.8, 848.84, 732.94, 845.39, 882.43, 858.99, 932.75, 813.77, 674.39, 671.47] },
      velocityScore: { '1D': 1.1, '1W': 0, '1M': -14.8, '6M': null }, isNew: false,
      marketCap: '$21B', pe: 59.9, revenueGrowth: 92, eps: 11.21, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 5.24, PRN: 3.98, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.49, proScore: 1.8, coverage: 0.4,
      price: 1752.79, weeklyPrices: [1684.94, 1781.42, 1756.09, 1732.03, 1752.79], weeklyChange: 4.03, dayChange: -1.16, sortRank: 0, periodReturns: { '1M': -10.2, 'YTD': 87.8, '6M': 60.7, '1Y': 225.2 },
      priceHistory: { '1D': [1773.29, 1774.9, 1755, 1752.79], '1W': [1684.94, 1781.42, 1756.09, 1732.03, 1752.79], '1M': [1952.02, 1913.94, 1931.77, 1967.41, 2066.51, 1908.07, 1954.47, 2017.57, 1854.23, 1948.69, 1981.95, 1865.15, 1741.3, 1793.03, 1683.44, 1684.94, 1781.42, 1756.09, 1732.03, 1752.79], 'YTD': [933.29, 971.49, 1119.98, 1127.55, 1176.26, 1283.65, 1319.47, 1450.6, 1430.38, 1373.76, 1444.6, 1358.66, 1417.19, 1627.81, 1680.09, 1794.04, 1891.95, 2016.31, 1825.5, 1867.09, 1914.65, 1843.42, 1967.41, 1854.23, 1683.44, 1752.79], '6M': [1091.04, 1121.44, 1142.1, 1230.26, 1337.95, 1462.23, 1429.37, 1279.06, 1365.34, 1356.75, 1366.77, 1434.09, 1627.81, 1650.47, 1726.12, 1867.02, 1952.37, 1992.74, 1828.25, 1787.88, 1852.03, 1877.61, 2066.51, 1948.69, 1683.44, 1752.79], '1Y': [539.02, 532.14, 687.67, 691.45, 718.61, 683.93, 691.18, 698.61, 709.53, 777.18, 804.24, 825.18, 816.53, 831.89, 829.36, 980.97, 977.67, 974.14, 919.82, 945.07, 935.78, 983.61, 968.5, 965.37, 933.29, 971.49, 1053.1, 1131.7, 1171.46, 1147.97, 1300.02, 1462.23, 1429.37, 1279.06, 1365.34, 1356.75, 1358.66, 1417.19, 1592.84, 1650.47, 1726.12, 1867.02, 1952.37, 1992.74, 1828.25, 1787.88, 1843.94, 1877.61, 2066.51, 1948.69, 1683.44, 1752.79] },
      velocityScore: { '1D': 1.1, '1W': 5.3, '1M': -0.6, '6M': null }, isNew: false,
      marketCap: '$62B', pe: 50.6, revenueGrowth: 1, eps: 34.61, grossMargin: 25, dividendYield: 0.15,
      etfPresence: { AIRR: 4.27, PRN: 4.71, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.96, proScore: 1.58, coverage: 0.4,
      price: 322.94, weeklyPrices: [315.88, 322.49, 331.15, 329.35, 322.94], weeklyChange: 2.24, dayChange: -1.44, sortRank: 0, periodReturns: { '1M': 2.1, 'YTD': 25.8, '6M': 14.3, '1Y': 26.9 },
      priceHistory: { '1D': [327.64, 324.58, 322.94], '1W': [315.88, 322.49, 331.15, 329.35, 322.94], '1M': [316.18, 324.38, 329.89, 337.96, 338.07, 330.9, 333.78, 343.54, 337.08, 334.16, 338.15, 332.08, 330.85, 328.53, 315.33, 315.88, 322.49, 331.15, 329.35, 322.94], 'YTD': [256.77, 264.62, 281.21, 281.54, 270.02, 282.45, 279.27, 280.76, 279.91, 259.88, 256.58, 260.51, 267.12, 293.26, 293.92, 298.1, 303.99, 313.7, 302.64, 312.65, 313.67, 318.89, 337.96, 337.08, 315.33, 322.94], '6M': [282.47, 280.14, 260.41, 291.74, 279.84, 281.97, 282.58, 267.78, 255.65, 253.77, 260.67, 269.55, 293.26, 291.03, 293.35, 302.99, 308.87, 307.17, 307.1, 300.98, 314.42, 320.11, 338.07, 334.16, 315.33, 322.94], '1Y': [254.41, 264.89, 272.4, 269.28, 270.68, 262.92, 264.21, 263.15, 261.61, 262.58, 264.9, 261.05, 252.74, 252.95, 258.78, 258.03, 253.33, 259.74, 240.63, 249.05, 257.32, 257.3, 258.47, 263.58, 256.77, 264.62, 277.62, 282.33, 259.51, 287.03, 279.03, 281.97, 282.58, 267.78, 255.65, 253.77, 260.51, 267.12, 289.01, 291.03, 293.35, 302.99, 308.87, 307.17, 307.1, 300.98, 315.29, 320.11, 338.07, 334.16, 315.33, 322.94] },
      velocityScore: { '1D': -0.6, '1W': 0.6, '1M': 14.5, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 30.5, revenueGrowth: 7, eps: 10.58, grossMargin: 30, dividendYield: 0.62,
      etfPresence: { AIRR: 1.88, PRN: false, RSHO: 6.04, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 4.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'EME', name: 'EMCOR Group, Inc.', easyScore: 2, avgWeight: 3.59, proScore: 1.44, coverage: 0.4,
      price: 768.97, weeklyPrices: [768.98, 783.41, 781.78, 764.90, 768.97], weeklyChange: 0, dayChange: -0.73, sortRank: 0, periodReturns: { '1M': -8.7, 'YTD': 25.7, '6M': 12.7, '1Y': 39.9 },
      priceHistory: { '1D': [774.64, 771.68, 768.97], '1W': [768.98, 783.41, 781.78, 764.9, 768.97], '1M': [842.3, 834.77, 827.5, 836.59, 868.88, 838.61, 847.17, 862.66, 798.1, 814.41, 829.88, 804.33, 774.66, 787.29, 768.38, 768.98, 783.41, 781.78, 764.9, 768.97], 'YTD': [611.79, 628.27, 698.69, 706.87, 731.67, 776.24, 783.06, 801.8, 740.87, 710.53, 751.33, 726.31, 756.3, 812.21, 831.11, 885.42, 910.26, 924.9, 854.36, 855.26, 845.43, 811.53, 836.59, 798.1, 768.38, 768.97], '6M': [682.13, 694.21, 720.73, 764.35, 800.82, 812.79, 724.62, 705.79, 709.91, 724.93, 732.89, 757.54, 812.21, 806.05, 869.9, 903.5, 921.64, 913.11, 848.91, 830.95, 823.79, 823.05, 868.88, 814.41, 768.38, 768.97], '1Y': [549.76, 558.98, 636.23, 625, 632.57, 607.1, 609.16, 620.41, 623.03, 618.99, 644.7, 649.54, 673.08, 674.14, 689.95, 751.44, 673.52, 656.33, 611.4, 602.84, 606.37, 623.74, 624.56, 625.69, 611.79, 628.27, 660.73, 702.89, 730.4, 717.68, 782.93, 812.79, 724.62, 705.79, 709.91, 724.93, 726.31, 756.3, 802.43, 806.05, 869.9, 903.5, 921.64, 913.11, 848.91, 830.95, 817.44, 823.05, 868.88, 814.41, 768.38, 768.97] },
      velocityScore: { '1D': 0, '1W': 0.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$34B', pe: 25.5, revenueGrowth: 20, eps: 30.14, grossMargin: 19, dividendYield: 0.21,
      etfPresence: { AIRR: 3.78, PRN: 3.4, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'EMCOR Group is an electrical and mechanical construction services company. Revenue grew substantially, and EMCOR is a core Industrials ETF holding because it builds the electrical systems inside data centers, manufacturing plants, and commercial buildings. The $827 share price reflects years of consistent execution and market share gains in a fragmented contractor market.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 2, avgWeight: 3.27, proScore: 1.31, coverage: 0.4,
      price: 277.07, weeklyPrices: [271.58, 273.77, 270.85, 271.28, 277.07], weeklyChange: 2.02, dayChange: 0.14, sortRank: 0, periodReturns: { '1M': 2.5, 'YTD': 35.1, '6M': 23.5, '1Y': 50 },
      priceHistory: { '1D': [276.69, 278.32, 276.84, 277.07], '1W': [271.58, 273.77, 270.85, 271.28, 277.07], '1M': [270.44, 277.42, 283.23, 277.66, 280.36, 275.13, 276.06, 273.14, 268.87, 268.57, 268.86, 267.41, 270.41, 277.91, 275.43, 271.58, 273.77, 270.85, 271.28, 277.07], 'YTD': [205.02, 210.02, 224.89, 215.39, 207.21, 225.15, 249.35, 259.64, 260.09, 243.82, 232.94, 230.51, 232.68, 256.14, 255.62, 241.7, 239.7, 269.76, 253.12, 258.02, 249.33, 264.6, 277.66, 268.87, 275.43, 277.07], '6M': [224.26, 214.89, 208.08, 223.16, 250.21, 258.1, 262.53, 250.13, 236.75, 231.21, 227.9, 236.57, 256.14, 255.69, 242.44, 239.51, 270.56, 260.35, 256.55, 255.52, 246.55, 264.67, 280.36, 268.57, 275.43, 277.07], '1Y': [184.68, 183.34, 189.17, 179.32, 180.9, 171.9, 171.24, 173.22, 178.98, 187.46, 193.58, 196.23, 191.46, 193.03, 197.18, 201.04, 206.74, 209.74, 200.28, 200.12, 196.26, 191.36, 195.18, 209.57, 205.02, 210.02, 220.25, 217.7, 208.93, 209.63, 244.79, 258.1, 262.53, 250.13, 236.75, 231.21, 230.51, 232.68, 252.67, 255.69, 242.44, 239.51, 270.56, 260.35, 256.55, 255.52, 251.9, 264.67, 280.36, 268.57, 275.43, 277.07] },
      velocityScore: { '1D': 0.8, '1W': 1.6, '1M': 20.2, '6M': null }, isNew: false,
      marketCap: '$111B', pe: 64.1, revenueGrowth: 19, eps: 4.32, grossMargin: 35, dividendYield: 0.17,
      etfPresence: { AIRR: false, PRN: 4.26, RSHO: false, IDEF: 2.29, BILT: false },
      tonyNote: 'Howmet Aerospace is an aerospace structures and engine components manufacturer. It appears in Industrials ETFs for its aerospace and defense exposure — commercial air travel recovery and defense spending growth are the two demand drivers. Revenue grew and margins are expanding as Howmet prices power over OEM customers.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 2.79, proScore: 1.12, coverage: 0.4,
      price: 219.6, weeklyPrices: [213.56, 216.63, 219.87, 215.14, 219.60], weeklyChange: 2.83, dayChange: 0.57, sortRank: 0, periodReturns: { '1M': -7.4, 'YTD': 9.8, '6M': 2.8, '1Y': 28.6 },
      priceHistory: { '1D': [218.35, 218.32, 219.6], '1W': [213.56, 216.63, 219.87, 215.14, 219.6], '1M': [237.06, 234.8, 235.29, 242.97, 246.41, 236.07, 237.22, 244.56, 231.87, 238.21, 245.17, 231.72, 227.74, 232.19, 218.83, 213.56, 216.63, 219.87, 215.14, 219.6], 'YTD': [200.06, 207.44, 217.65, 215.21, 212.73, 223.86, 241.58, 226.66, 222.07, 202.65, 202.36, 200.45, 197.29, 221.27, 217.61, 222.45, 201.12, 198.99, 195.79, 215.34, 236.14, 233.49, 242.97, 231.87, 218.83, 219.6], '6M': [213.61, 211.03, 208.41, 222.32, 239, 242.29, 226.94, 204.62, 199.45, 186.77, 200, 196.9, 221.27, 223.52, 222.82, 208.13, 202.84, 200.99, 207.8, 220.92, 229.95, 230.05, 246.41, 238.21, 218.83, 219.6], '1Y': [170.82, 173.83, 180.24, 203.71, 191.17, 188, 188.95, 184.11, 186.04, 185.77, 187.6, 186.78, 188.32, 185.28, 191.84, 197.07, 215.13, 224.93, 207.28, 211.97, 209.18, 209.32, 216.89, 205.46, 200.06, 207.44, 209.78, 217.13, 211.84, 218.02, 230.92, 242.29, 226.94, 204.62, 199.45, 186.77, 200.45, 197.29, 215.97, 223.52, 222.82, 208.13, 202.84, 200.99, 207.8, 220.92, 227.8, 230.05, 246.41, 238.21, 218.83, 219.6] },
      velocityScore: { '1D': 0, '1W': 0, '1M': -0.9, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 42, revenueGrowth: 17, eps: 5.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.62, PRN: false, RSHO: 3.96, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 2, avgWeight: 2.27, proScore: 0.91, coverage: 0.4,
      price: 181.99, weeklyPrices: [184.11, 186.99, 186.00, 177.14, 181.99], weeklyChange: -1.15, dayChange: 1.21, sortRank: 0, periodReturns: { '1M': -6.2, 'YTD': 5.3, '6M': -14.7, '1Y': 32.4 },
      priceHistory: { '1D': [179.82, 182.41, 181.98, 181.99], '1W': [184.11, 186.99, 186, 177.14, 181.99], '1M': [193.94, 196.93, 203.07, 205.4, 210, 209.89, 205.65, 204.77, 197.91, 189.25, 194.65, 191.25, 191.06, 196.89, 186.08, 184.11, 186.99, 186, 177.14, 181.99], 'YTD': [172.84, 193.2, 217.89, 206.04, 206.04, 203, 202.25, 208.27, 205.57, 197.82, 210.12, 205.09, 214.98, 232.83, 228.24, 222.07, 216.68, 206.83, 197.33, 198.95, 190.76, 194.68, 205.4, 197.91, 186.08, 181.99], '6M': [213.25, 207.75, 205.43, 197.19, 200.4, 206.44, 205.98, 195.23, 194.13, 199.75, 202.59, 215.98, 232.83, 235.78, 223.15, 216.31, 205.33, 204.72, 202.91, 188.39, 187.46, 193.45, 210, 189.25, 186.08, 181.99], '1Y': [137.45, 140.04, 150.28, 182, 179.51, 165.76, 162.84, 160.03, 162.23, 176.65, 178.02, 184.37, 191.39, 202.46, 205.24, 207.62, 215.86, 198.79, 176.18, 174.62, 176.2, 177.16, 173.2, 177.62, 172.84, 193.2, 204.08, 206.33, 210.18, 187.42, 196.9, 206.44, 205.98, 195.23, 194.13, 199.75, 205.09, 214.98, 229.57, 235.78, 223.15, 216.31, 205.33, 204.72, 202.91, 188.39, 185.95, 193.45, 210, 189.25, 186.08, 181.99] },
      velocityScore: { '1D': 0, '1W': -2.2, '1M': -3.2, '6M': null }, isNew: false,
      marketCap: '$17B', pe: 47.8, revenueGrowth: 26, eps: 3.81, grossMargin: 23, dividendYield: 0.58,
      etfPresence: { AIRR: 2.96, PRN: false, RSHO: false, IDEF: 1.59, BILT: false },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 2, avgWeight: 1.83, proScore: 0.73, coverage: 0.4,
      price: 281.99, weeklyPrices: [289.47, 286.21, 286.09, 284.86, 281.99], weeklyChange: -2.58, dayChange: 0.75, sortRank: 0, periodReturns: { '1M': -5.9, 'YTD': -17.1, '6M': -32.7, '1Y': 11.2 },
      priceHistory: { '1D': [279.88, 283.29, 281.99], '1W': [289.47, 286.21, 286.09, 284.86, 281.99], '1M': [299.66, 298.51, 296.89, 285.43, 278.19, 283.48, 279.62, 279.09, 281.99, 277.39, 279.89, 278.97, 291.5, 294.1, 289.46, 289.47, 286.21, 286.09, 284.86, 281.99], 'YTD': [340.07, 378.47, 425.9, 413.56, 420.3, 405.82, 424.89, 435.58, 437.03, 414.56, 418.42, 384.79, 396.62, 394.46, 392.19, 358.4, 363.37, 333.56, 324.6, 317.56, 294.53, 300.95, 285.43, 281.99, 289.46, 281.99], '6M': [418.86, 418.58, 420.51, 397.77, 418.78, 437.57, 444.52, 429.11, 415.71, 407.98, 381.79, 407.66, 394.46, 394.81, 359.29, 360.6, 316.28, 326.17, 320.63, 296.41, 292.26, 297.68, 278.19, 277.39, 289.46, 281.99], '1Y': [253.68, 253.96, 260.84, 270.92, 268, 265.4, 270.72, 269.71, 267.07, 273.19, 276.01, 287.91, 285.38, 291.94, 287.53, 299.14, 317.54, 318.66, 309.74, 309.92, 307.2, 314.95, 326.8, 354.52, 340.07, 378.47, 415.39, 424.14, 427.83, 369.38, 406.76, 437.57, 444.52, 429.11, 415.71, 407.98, 384.79, 396.62, 394.41, 394.81, 359.29, 360.6, 316.28, 326.17, 320.63, 296.41, 293.04, 297.68, 278.19, 277.39, 289.46, 281.99] },
      velocityScore: { '1D': -3.9, '1W': -2.7, '1M': -2.7, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 18.3, revenueGrowth: 13, eps: 15.4, grossMargin: 12, dividendYield: 1.97,
      etfPresence: { AIRR: 2.64, PRN: false, RSHO: false, IDEF: 1.03, BILT: false },
      tonyNote: 'Huntington Ingalls Industries is the only builder of nuclear-powered aircraft carriers for the U.S. Navy. Revenue is government-contracted and predictable; the ETF allocation in Industrials reflects defense spending growth and the Navy\'s backlog of nuclear submarine and carrier construction. A steady-state quality compounder in a market structure with no competition.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 2, avgWeight: 1.82, proScore: 0.73, coverage: 0.4,
      price: 53.88, weeklyPrices: [50.38, 48.85, 48.19, 46.96, 53.88], weeklyChange: 6.94, dayChange: 6.98, sortRank: 0, periodReturns: { '1M': -5.5, 'YTD': -29, '6M': -56.7, '1Y': 5.4 },
      priceHistory: { '1D': [50.36, 53.83, 53.99, 53.88], '1W': [50.38, 48.85, 48.19, 46.96, 53.88], '1M': [57.02, 56.34, 56.16, 54.21, 51.09, 50.8, 47.95, 46.32, 47.21, 46.95, 49.86, 53.04, 55.35, 53.54, 50.34, 50.38, 48.85, 48.19, 46.96, 53.88], 'YTD': [75.91, 104.04, 130.72, 111.32, 96.16, 98.81, 97.21, 88.23, 89.13, 89.46, 92.78, 75.86, 67.31, 73.55, 69.83, 63.16, 61.93, 57.33, 53.47, 57.3, 63.4, 58.78, 54.21, 47.21, 50.34, 53.88], '6M': [124.56, 110.39, 103.01, 94.41, 89.06, 96.08, 86.18, 87, 87.53, 84.62, 71.94, 74.09, 73.55, 70.99, 61.26, 62.05, 57.89, 52.09, 56.18, 63.49, 57.73, 57.75, 51.09, 46.95, 50.34, 53.88], '1Y': [51.12, 55.42, 57.09, 59.4, 69.14, 64.02, 66.9, 66.09, 64.56, 76.35, 83.9, 91.37, 103.69, 95.3, 90.62, 89.78, 91.1, 79.18, 70.24, 74.11, 70.96, 77.03, 73.13, 82.3, 75.91, 104.04, 121.5, 113.85, 108.16, 85.25, 87.05, 96.08, 86.18, 87, 87.53, 84.62, 75.86, 67.31, 70.34, 70.99, 61.26, 62.05, 57.89, 52.09, 56.18, 63.49, 58.52, 57.75, 51.09, 46.95, 50.34, 53.88] },
      velocityScore: { '1D': 5.8, '1W': 1.4, '1M': -8.8, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 316.9, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.65, PRN: false, RSHO: false, IDEF: 0.99, BILT: false },
      tonyNote: 'Kratos Defense is a defense technology company focused on unmanned systems, satellite communications, and high-performance computing for government customers. It appears in Industrials ETFs as an AI-adjacent defense name — autonomous systems and AI-driven surveillance are direct end markets. Revenue grew and the government contract backlog is expanding.',
    },
    {
      ticker: 'AIR', name: 'AIRBUS GROUP', easyScore: 2, avgWeight: 1.35, proScore: 0.54, coverage: 0.4,
      price: 134.85, weeklyPrices: [133.30, 136.57, 135.67, 130.90, 134.85], weeklyChange: 1.17, dayChange: 0.26, sortRank: 0, periodReturns: { '1M': 2.8, 'YTD': 62.9, '6M': 27.5, '1Y': 83.8 },
      priceHistory: { '1D': [134.5, 134.85, 134.85], '1W': [133.3, 136.57, 135.67, 130.9, 134.85], '1M': [131.18, 129.96, 132.14, 134.88, 134.28, 132.26, 132.94, 138.51, 143.14, 141.85, 142.93, 142.76, 140.11, 143.61, 136.63, 133.3, 136.57, 135.67, 130.9, 134.85], 'YTD': [82.79, 94.73, 105.08, 104.26, 108, 114.34, 114.63, 117.06, 118.61, 103.78, 109.21, 110.82, 109.78, 123.77, 121.97, 110.2, 109.56, 111.51, 100.89, 112.82, 115.53, 127.23, 134.88, 143.14, 136.63, 134.85], '6M': [105.74, 105.66, 105.91, 113.09, 112.98, 116.97, 117.17, 108.52, 101.91, 101.33, 107.25, 114, 123.77, 123.04, 110.54, 110.35, 117.78, 104.55, 108.41, 109.99, 114.72, 129.01, 134.28, 141.85, 136.63, 134.85], '1Y': [73.39, 79.01, 76.1, 72.4, 78.01, 73.85, 75.09, 76.37, 73.92, 75.75, 78.35, 89.67, 83.06, 82.93, 84.73, 84.56, 85.73, 83.31, 78.95, 79.67, 82.88, 79.47, 81.49, 85.44, 82.79, 94.73, 101.08, 107.74, 106.67, 106.87, 113.22, 116.97, 117.17, 108.52, 101.91, 101.33, 110.82, 109.78, 120.83, 123.04, 110.54, 110.35, 117.78, 104.55, 108.41, 109.99, 116.65, 129.01, 134.28, 141.85, 136.63, 134.85] },
      velocityScore: { '1D': 0, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5B', pe: 28.8, revenueGrowth: 25, eps: 4.68, grossMargin: 19, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 2.54, BILT: false },
      tonyNote: 'AIRBUS GROUP appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 1.27, proScore: 0.51, coverage: 0.4,
      price: 76.17, weeklyPrices: [75.27, 75.45, 75.02, 74.46, 76.17], weeklyChange: 1.2, dayChange: 0.24, sortRank: 0, periodReturns: { '1M': 6.5, 'YTD': 26.7, '6M': 26.3, '1Y': 30.5 },
      priceHistory: { '1D': [75.99, 75.98, 76.17, 76.17], '1W': [75.27, 75.45, 75.02, 74.46, 76.17], '1M': [71.49, 71.48, 71.25, 73.12, 74.95, 75.79, 75.87, 77.53, 77.92, 75.06, 74.34, 72.77, 73.14, 72.82, 75.08, 75.27, 75.45, 75.02, 74.46, 76.17], 'YTD': [60.11, 61.15, 61.55, 64.29, 66.34, 67.85, 72.14, 73.97, 75.77, 73.52, 74.06, 74.06, 72, 71.54, 70.91, 71.61, 75.41, 74.73, 79.4, 74.37, 72.43, 71.62, 73.12, 77.92, 75.08, 76.17], '6M': [60.29, 64.96, 67.26, 66.92, 72.28, 72.98, 74.72, 74.24, 73.34, 72.41, 73.58, 72.59, 71.54, 71.15, 72.18, 75.54, 71.96, 77.72, 78.47, 70.04, 71.59, 72.08, 74.95, 75.06, 75.08, 76.17], '1Y': [58.37, 57.36, 58.89, 59, 57.76, 56.57, 56.83, 57.38, 57.57, 57.95, 61.39, 63.35, 63.97, 62.36, 62.34, 57.59, 59.03, 60.6, 59.91, 59.43, 60.21, 61.55, 58.41, 59.75, 60.11, 61.15, 60.71, 63.72, 67.24, 67.42, 71.13, 72.98, 74.72, 74.24, 73.34, 72.41, 74.06, 72, 72.74, 71.15, 72.18, 75.54, 71.96, 77.72, 78.47, 70.04, 71.96, 72.08, 74.95, 75.06, 75.08, 76.17] },
      velocityScore: { '1D': -7.3, '1W': -7.3, '1M': -7.3, '6M': null }, isNew: false,
      marketCap: '$93B', pe: 33.4, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.76,
      etfPresence: { AIRR: false, PRN: false, RSHO: 0.92, IDEF: false, BILT: 1.63 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RBC', name: 'RBC Bearings Incorporated', easyScore: 2, avgWeight: 1.15, proScore: 0.46, coverage: 0.4,
      price: 586.35, weeklyPrices: [593.89, 595.61, 595.49, 584.59, 586.35], weeklyChange: -1.27, dayChange: -0.27, sortRank: 0, periodReturns: { '1M': -5, 'YTD': 30.8, '6M': 18, '1Y': 56.1 },
      priceHistory: { '1D': [587.94, 586.12, 586.35], '1W': [593.89, 595.61, 595.49, 584.59, 586.35], '1M': [616.95, 621.08, 625.73, 639.18, 645.73, 633.44, 638.94, 648.89, 630.36, 634.78, 644.06, 620.47, 604.56, 609.6, 600.26, 593.89, 595.61, 595.49, 584.59, 586.35], 'YTD': [448.43, 485, 498.82, 504.5, 507.13, 548.2, 551.65, 565.44, 570.08, 547.31, 540.83, 548.95, 548.11, 595.74, 596.86, 591, 593.12, 613.1, 565.22, 577.42, 589.76, 607.46, 639.18, 630.36, 600.26, 586.35], '6M': [497.06, 504.07, 499.67, 544.02, 552.44, 559.18, 575.92, 552.91, 536.37, 531.11, 532.25, 552.4, 595.74, 589.77, 589.51, 595.76, 605.99, 569.06, 559.95, 566.14, 590.97, 603.64, 645.73, 634.78, 600.26, 586.35], '1Y': [375.51, 392.38, 385.08, 403.78, 404.99, 397.81, 399.58, 387.71, 374.88, 378.73, 383.7, 390.29, 373.47, 383.98, 392.33, 408.15, 428.4, 441.04, 429.28, 430, 440.04, 436.5, 451.17, 457.07, 448.43, 485, 489.33, 504.99, 511.98, 520.16, 550.4, 559.18, 575.92, 552.91, 536.37, 531.11, 548.95, 548.11, 598.3, 589.77, 589.51, 595.76, 605.99, 569.06, 559.95, 566.14, 590.09, 603.64, 645.73, 634.78, 600.26, 586.35] },
      velocityScore: { '1D': 0, '1W': -2.1, '1M': 2.2, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 64.3, revenueGrowth: 18, eps: 9.12, grossMargin: 45, dividendYield: null,
      etfPresence: { AIRR: 1.82, PRN: false, RSHO: false, IDEF: 0.48, BILT: false },
      tonyNote: 'RBC Bearings Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, avgWeight: 1.03, proScore: 0.41, coverage: 0.4,
      price: 49.9, weeklyPrices: [50.05, 50.01, 45.13, 45.83, 49.90], weeklyChange: -0.31, dayChange: 8.82, sortRank: 0, periodReturns: { '1M': 3.4, 'YTD': -31.8, '6M': -54.4, '1Y': 3.3 },
      priceHistory: { '1D': [45.85, 49.75, 50.09, 49.9], '1W': [50.05, 50.01, 45.13, 45.83, 49.9], '1M': [48.27, 51.7, 52.03, 50.37, 47.7, 46.38, 44.84, 46.27, 46.42, 47.1, 49.92, 54.93, 56.37, 53.36, 51.47, 49.96, 50.05, 50.01, 45.13, 45.83, 49.9], 'YTD': [73.17, 101.28, 108.5, 108.71, 102.87, 91.25, 81, 83.44, 97.14, 98.98, 105.95, 84.07, 86.1, 87.79, 82.69, 70.3, 62.89, 62.48, 65.76, 65.86, 54.39, 47.83, 47.7, 47.1, 49.96, 49.9], '6M': [109.49, 108.22, 103.8, 95.36, 75.79, 81.27, 93.04, 100.54, 99.98, 99.38, 84.07, 86.1, 87.79, 82.69, 71.95, 65.32, 58.82, 66.21, 60.66, 53.65, 49.64, 48.27, 46.38, 49.92, 49.96, 49.9], '1Y': [48.31, 51.96, 51.41, 50.39, 49.03, 49.87, 54.69, 53.89, 62.51, 64.86, 68.71, 72.2, 75.2, 77, 78.99, 85.34, 84.7, 69.38, 58.95, 64.96, 63.83, 63.75, 67.19, 79.98, 73.17, 101.28, 109.49, 108.22, 103.8, 95.36, 75.79, 81.27, 88.11, 100.54, 99.98, 99.38, 84.07, 86.1, 87.79, 82.69, 71.95, 65.32, 58.82, 66.21, 60.66, 53.65, 49.64, 48.27, 46.38, 49.92, 49.96, 49.9] },
      velocityScore: { '1D': 0, '1W': -10.9, '1M': 0, '6M': null }, isNew: false,
      marketCap: '$7B', pe: 216.9, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.87, PRN: false, RSHO: false, IDEF: 0.18, BILT: false },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRCY', name: 'Mercury Systems, Inc.', easyScore: 2, avgWeight: 1.02, proScore: 0.41, coverage: 0.4,
      price: 104.36, weeklyPrices: [112.41, 114.25, 107.98, 98.26, 104.36], weeklyChange: -7.16, dayChange: 4.03, sortRank: 0, periodReturns: { '1M': -10, 'YTD': 42.9, '6M': 1.4, '1Y': 108.4 },
      priceHistory: { '1D': [100.32, 104, 104.36], '1W': [112.41, 114.25, 107.98, 98.26, 104.36], '1M': [115.93, 112.44, 115.5, 113.91, 111.76, 110.87, 105, 105.57, 109.38, 110.22, 122.33, 123.05, 126.21, 123.07, 115.83, 112.41, 114.25, 107.98, 98.26, 104.36], 'YTD': [73.01, 88.74, 103.02, 98.89, 93.89, 85.37, 86.66, 89.3, 89.18, 81.44, 77.81, 76.16, 74.22, 82.52, 84.12, 77.06, 78.53, 92.32, 92.8, 97.11, 117.82, 119.32, 113.91, 109.38, 115.83, 104.36], '6M': [102.95, 99.05, 93.88, 82.2, 82.36, 87.63, 89.03, 86.42, 78.16, 77.26, 71.4, 75.76, 82.52, 84.05, 77.99, 78.55, 90.34, 92.03, 98.55, 111.28, 110.94, 120.3, 111.76, 110.22, 115.83, 104.36], '1Y': [50.09, 51.51, 51.88, 54.24, 68.02, 64.22, 67.98, 67.66, 68.69, 74.59, 75.34, 77.4, 83.47, 77.76, 78.81, 77.6, 77.78, 74.65, 68.35, 66.67, 67.69, 71.86, 71.8, 75.07, 73.01, 88.74, 98.62, 99.48, 98.29, 79.07, 80.25, 87.63, 89.03, 86.42, 78.16, 77.26, 76.16, 74.22, 79.6, 84.05, 77.99, 78.55, 90.34, 92.03, 98.55, 111.28, 111.27, 120.3, 111.76, 110.22, 115.83, 104.36] },
      velocityScore: { '1D': 2.5, '1W': -10.9, '1M': -12.8, '6M': null }, isNew: false,
      marketCap: '$6B', pe: null, revenueGrowth: 12, eps: -0.23, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: 1.1, PRN: false, RSHO: false, IDEF: 0.93, BILT: false },
      tonyNote: 'Mercury Systems, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DRS', name: 'Leonardo DRS, Inc.', easyScore: 2, avgWeight: 0.58, proScore: 0.23, coverage: 0.4,
      price: 45.42, weeklyPrices: [44.71, 44.67, 44.15, 43.35, 45.42], weeklyChange: 1.59, dayChange: 2.37, sortRank: 0, periodReturns: { '1M': -2.7, 'YTD': 33.2, '6M': 7.5, '1Y': -4.6 },
      priceHistory: { '1D': [44.37, 44.99, 45.42], '1W': [44.71, 44.67, 44.15, 43.35, 45.42], '1M': [46.68, 45.59, 46.58, 46.08, 44.99, 45.74, 44.69, 44.36, 42.48, 40.95, 42.67, 42.69, 43.72, 45.37, 45.47, 44.71, 44.67, 44.15, 43.35, 45.42], 'YTD': [34.09, 38.84, 42.57, 40.63, 40.45, 40.22, 39.9, 42.36, 46.95, 45.91, 45.48, 46.53, 46.3, 47.43, 44.24, 40.72, 40, 42.87, 42.81, 45.35, 46.71, 49.69, 46.08, 42.48, 45.47, 45.42], '6M': [42.26, 40.99, 41.06, 38.93, 38.13, 40.03, 43.39, 46.58, 45.3, 43.82, 44.84, 46.73, 47.43, 44.57, 39.98, 40.03, 41.36, 41.5, 44.92, 47.96, 46.55, 48.53, 44.99, 40.95, 45.47, 45.42], '1Y': [47.59, 46.14, 48.2, 41.48, 41.87, 41.17, 41.03, 42.01, 40.33, 41.78, 43.1, 45.4, 44.72, 43.85, 40.35, 40.18, 36.62, 35.61, 34.28, 33.63, 33.18, 33.96, 33.12, 34.62, 34.09, 38.84, 41.42, 41.28, 41.3, 37.27, 37.77, 40.03, 43.39, 46.58, 45.3, 43.82, 46.53, 46.3, 46.06, 44.57, 39.98, 40.03, 41.36, 41.5, 44.92, 47.96, 46.15, 48.53, 44.99, 40.95, 45.47, 45.42] },
      velocityScore: { '1D': 0, '1W': -4.2, '1M': -4.2, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 42.4, revenueGrowth: 6, eps: 1.07, grossMargin: 24, dividendYield: 0.81,
      etfPresence: { AIRR: 0.86, PRN: false, RSHO: false, IDEF: 0.3, BILT: false },
      tonyNote: 'Leonardo DRS, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TPC', name: 'Tutor Perini Corporation', easyScore: 2, avgWeight: 0.38, proScore: 0.15, coverage: 0.4,
      price: 77.86, weeklyPrices: [75.49, 74.98, 75.89, 74.74, 77.86], weeklyChange: 3.13, dayChange: 0.2, sortRank: 0, periodReturns: { '1M': 1.7, 'YTD': 16.2, '6M': 3.6, '1Y': 59.4 },
      priceHistory: { '1D': [77.7, 78.1, 77.86], '1W': [75.49, 74.98, 75.89, 74.74, 77.86], '1M': [76.55, 76.19, 77.89, 77.99, 81.5, 81, 82.36, 81.56, 79.53, 81.88, 82.97, 79.51, 76.75, 79.91, 74.87, 75.49, 74.98, 75.89, 74.74, 77.86], 'YTD': [67.02, 70.17, 75.09, 77.34, 80.11, 84.07, 81.1, 86.1, 73.71, 69.2, 72.31, 76.24, 77.3, 83.8, 84.38, 87.5, 92.76, 82.69, 74.91, 74.47, 72.38, 73.61, 77.99, 79.53, 74.87, 77.86], '6M': [75.17, 76.01, 78.89, 83.48, 82.74, 86.9, 75.37, 72.82, 67.76, 69.34, 76.15, 77.66, 83.8, 84.22, 86.76, 93.68, 82.85, 79.49, 72.76, 74.26, 72.13, 74.92, 81.5, 81.88, 74.87, 77.86], '1Y': [48.83, 48.51, 46.91, 47.66, 58.77, 56.02, 58.52, 59.13, 60.47, 63.88, 66.54, 65.59, 61.61, 63.27, 66.87, 68.4, 68.21, 63.97, 58.76, 64.01, 66.47, 68.59, 69.46, 68.65, 67.02, 70.17, 73.89, 76.79, 79.86, 79.95, 81.73, 86.9, 75.37, 72.82, 67.76, 69.34, 76.24, 77.3, 83.35, 84.22, 86.76, 93.68, 82.85, 79.49, 72.76, 74.26, 70.53, 74.92, 81.5, 81.88, 74.87, 77.86] },
      velocityScore: { '1D': 0, '1W': 7.1, '1M': 7.1, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 53.3, revenueGrowth: 12, eps: 1.46, grossMargin: 12, dividendYield: 0.31,
      etfPresence: { AIRR: 0.72, PRN: false, RSHO: false, IDEF: 0.04, BILT: false },
      tonyNote: 'Tutor Perini Corporation appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TKR', name: 'TIMKEN CO/THE', easyScore: 1, avgWeight: 8.69, proScore: 1.74, coverage: 0.2,
      price: 139.5, weeklyPrices: [137.23, 137.93, 137.31, 138.34, 139.50], weeklyChange: 1.65, dayChange: -0.07, sortRank: 0, periodReturns: { '1M': 0.3, 'YTD': 65.8, '6M': 48.8, '1Y': 82.8 },
      priceHistory: { '1D': [139.6, 139.96, 139.5], '1W': [137.23, 137.93, 137.31, 138.34, 139.5], '1M': [139.12, 140.28, 139.4, 142.36, 141.97, 137.64, 137.99, 144.01, 141.22, 143.5, 145.32, 141.75, 139.16, 142.36, 138.06, 137.23, 137.93, 137.31, 138.34, 139.5], 'YTD': [84.13, 90.6, 93.55, 94.02, 94.99, 108.93, 107.23, 107.69, 105.59, 99.7, 97.44, 99.06, 98.92, 106.9, 108.45, 108.7, 107.12, 117.12, 109.36, 127.16, 133.66, 137.4, 142.36, 141.22, 138.06, 139.5], '6M': [93.73, 93.94, 93.19, 106.04, 107.84, 108.16, 108.38, 99.68, 97.54, 95.25, 97.56, 98.94, 106.9, 107.66, 107.2, 109, 117.97, 114.49, 119.95, 126.54, 134.67, 137.06, 141.97, 143.5, 138.06, 139.5], '1Y': [76.33, 80.02, 80.98, 74.65, 76.91, 76.88, 79.25, 76.49, 76.14, 77.91, 76.75, 75.18, 75.83, 74.28, 77.3, 77.22, 77.95, 78.9, 74.42, 79.9, 79.82, 83.16, 85.77, 86.09, 84.13, 90.6, 91.91, 94.6, 94.15, 102.15, 107.35, 108.16, 108.38, 99.68, 97.54, 95.25, 99.06, 98.92, 106.75, 107.66, 107.2, 109, 117.97, 114.49, 119.95, 126.54, 131.83, 137.06, 141.97, 143.5, 138.06, 139.5] },
      velocityScore: { '1D': null, '1W': 0, '1M': -6.5, '6M': null }, isNew: true,
      marketCap: '$10B', pe: 31.4, revenueGrowth: 8, eps: 4.44, grossMargin: 31, dividendYield: 1.03,
      etfPresence: { AIRR: false, PRN: false, RSHO: 8.69, IDEF: false, BILT: false },
      tonyNote: 'TIMKEN CO/THE appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RTX', name: 'RTX CORP', easyScore: 1, avgWeight: 8.62, proScore: 1.72, coverage: 0.2,
      price: 194.96, weeklyPrices: [194.91, 195.20, 195.93, 196.39, 194.96], weeklyChange: 0.03, dayChange: 0.67, sortRank: 0, periodReturns: { '1M': 6.2, 'YTD': 6.3, '6M': -2.4, '1Y': 31.1 },
      priceHistory: { '1D': [193.66, 195.08, 194.96], '1W': [194.91, 195.2, 195.93, 196.39, 194.96], '1M': [183.64, 186.77, 192.58, 185.6, 181.83, 186.39, 185.06, 186.59, 187.99, 187.33, 189.73, 191.78, 199.25, 201.37, 200.85, 194.91, 195.2, 195.93, 196.39, 194.96], 'YTD': [183.4, 187.17, 201.92, 194.13, 201.09, 196.19, 204.81, 195.98, 208.82, 203.04, 200.73, 192.85, 196.21, 201.41, 195.79, 173.38, 172.9, 178.89, 174.49, 176.59, 179.41, 184.21, 185.6, 187.99, 200.85, 194.96], '6M': [199.83, 195.93, 200.93, 198.66, 200.06, 204.92, 202.62, 209.76, 204.52, 198.16, 189.71, 198.41, 201.41, 196.42, 174.26, 173.99, 176.09, 171.18, 177.01, 174.41, 178.66, 183.53, 181.83, 187.33, 200.85, 194.96], '1Y': [148.68, 149.17, 157.12, 156.33, 155.49, 153.66, 156.27, 158.01, 151.75, 158.58, 160.54, 167.33, 169.27, 159.4, 173.04, 178.67, 177.04, 179.03, 175.63, 173.21, 168.8, 171.93, 179.93, 185.76, 183.4, 187.17, 198.84, 196.34, 199.88, 195.97, 201.14, 204.92, 202.62, 209.76, 204.52, 198.16, 192.85, 196.21, 201.56, 196.42, 174.26, 173.99, 176.09, 171.18, 177.01, 174.41, 180.99, 183.53, 181.83, 187.33, 200.85, 194.96] },
      velocityScore: { '1D': -1.7, '1W': null, '1M': 8.2, '6M': null }, isNew: false,
      marketCap: '$263B', pe: 36.5, revenueGrowth: 9, eps: 5.34, grossMargin: 20, dividendYield: 1.51,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 8.62, BILT: false },
      tonyNote: 'RTX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 4.29, proScore: 4.29, coverage: 1,
      price: 200.65, weeklyPrices: [216.20, 219.65, 210.51, 194.09, 200.65], weeklyChange: -7.19, dayChange: 3.38, sortRank: 0, periodReturns: { '1M': -22.8, 'YTD': 139.7, '6M': 93.1, '1Y': 274.8 },
      priceHistory: { '1D': [194.09, 201.38, 200.51, 200.65], '1W': [216.2, 219.65, 210.51, 194.09, 200.65], '1M': [260.07, 265.1, 280.91, 286.69, 283.61, 275.25, 259.66, 256.63, 240.3, 261.15, 276.17, 229.18, 215.62, 213.02, 195.19, 216.48, 216.2, 219.65, 210.51, 194.09, 200.65], 'YTD': [83.71, 97.3, 108.73, 91.46, 88.16, 91.79, 101.8, 106.12, 95.65, 108.04, 121.52, 100.82, 112.54, 154.56, 159.16, 135.51, 175.92, 179.11, 191.82, 226.34, 259.67, 232.36, 283.61, 261.15, 216.48, 200.65], '6M': [103.89, 94.5, 85.19, 86.1, 98.01, 100.61, 91.01, 89.33, 112.95, 117.62, 100.82, 112.54, 154.56, 159.16, 144.96, 176.42, 186.1, 199.86, 208.06, 264.51, 218, 260.07, 275.25, 276.17, 216.48, 200.65], '1Y': [53.53, 51.01, 50.4, 55.17, 75.33, 67.19, 70.48, 65.72, 95.72, 89.43, 107.8, 112.27, 117.7, 128.15, 104.28, 121.83, 110.54, 102.22, 90.54, 88.88, 96.45, 96.41, 80.95, 90.03, 83.71, 97.3, 103.89, 94.5, 85.19, 86.1, 98.01, 100.61, 91.19, 89.33, 112.95, 117.62, 100.82, 112.54, 154.56, 159.16, 144.96, 176.42, 186.1, 199.86, 208.06, 264.51, 218, 260.07, 275.25, 276.17, 216.48, 200.65] },
      velocityScore: { '1D': 1.4, '1W': 2.4, '1M': -3.6, '6M': null }, isNew: false,
      marketCap: '$51B', pe: 77.8, revenueGrowth: 684, eps: 2.58, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 3.03, MEME: 6.28, RKNG: 3.55 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 5.37, proScore: 3.58, coverage: 0.667,
      price: 241.62, weeklyPrices: [257.02, 244.61, 233.49, 243.40, 241.62], weeklyChange: -5.99, dayChange: -0.71, sortRank: 0, periodReturns: { '1M': -12, 'YTD': 178.1, '6M': 73.6, '1Y': 854.6 },
      priceHistory: { '1D': [243.35, 242, 241.62], '1W': [257.02, 244.61, 233.49, 243.4, 241.62], '1M': [274.5, 280.88, 284.99, 328.91, 345.85, 321.98, 326.19, 309.18, 252.02, 275.01, 302.7, 289.5, 270.89, 295.05, 269.57, 254.29, 257.02, 244.61, 233.49, 243.4, 241.62], 'YTD': [86.89, 121.84, 149.5, 139.62, 156.13, 148.7, 157.27, 174.77, 159.99, 157.17, 166.69, 133.24, 135, 176.67, 218.27, 226.37, 295.25, 280.69, 282.31, 290.01, 291.37, 260.22, 345.85, 275.01, 254.29, 241.62], '6M': [139.17, 144.89, 151.37, 143.03, 139.74, 160.28, 166, 135.19, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 288.64, 283.92, 258.71, 302.4, 273.51, 253.57, 274.5, 321.98, 302.7, 254.29, 241.62], '1Y': [25.31, 25.93, 34.75, 37.61, 41.25, 43.1, 49.94, 51.35, 55, 73.29, 77.38, 84.57, 86.06, 114.06, 104.38, 113.28, 129.05, 127.07, 104.97, 94.29, 105, 109.44, 87.61, 91.43, 86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 160.28, 155.67, 135.19, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 288.64, 283.92, 258.71, 302.4, 273.51, 253.57, 274.5, 321.98, 302.7, 254.29, 241.62] },
      velocityScore: { '1D': -0.3, '1W': -7.5, '1M': 12.6, '6M': null }, isNew: false,
      marketCap: '$69B', pe: null, revenueGrowth: 130, eps: -0.05, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 7.23, RKNG: 3.51 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 2, avgWeight: 4.54, proScore: 3.02, coverage: 0.667,
      price: 551.91, weeklyPrices: [550.30, 578.05, 582.59, 555.55, 551.91], weeklyChange: 0.29, dayChange: -2.03, sortRank: 0, periodReturns: { '1M': -15.5, 'YTD': 220.4, '6M': 148.5, '1Y': 717.3 },
      priceHistory: { '1D': [563.32, 555.25, 551.91], '1W': [550.3, 578.05, 582.59, 555.55, 551.91], '1M': [653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539, 577.46, 532.1, 550.3, 578.05, 582.59, 555.55, 551.91], 'YTD': [172.27, 187.68, 221.51, 240.85, 270.23, 285.99, 296.56, 290.95, 261.3, 261.18, 316.93, 273.35, 294.97, 350.16, 374.11, 400.73, 442.36, 488.74, 455.8, 530.6, 575.5, 529.29, 746.23, 586.45, 532.1, 551.91], '6M': [222.1, 236.39, 250.23, 282.58, 281.58, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 372.52, 404, 431.52, 480, 482.02, 484.28, 546.2, 526.93, 562.93, 732.62, 651.88, 532.1, 551.91], '1Y': [67.53, 67.06, 70.61, 75.84, 75.91, 75.86, 79.22, 81.91, 94.54, 103.09, 110.25, 120.06, 119.93, 113.13, 121.41, 124.92, 158.02, 174.22, 162.45, 150.93, 159.99, 169.54, 174.58, 178.25, 172.27, 187.68, 215, 243.29, 278.41, 260.19, 284.1, 285.52, 279.7, 245.25, 272.29, 293.1, 273.35, 294.97, 343.43, 372.52, 404, 431.52, 480, 482.02, 484.28, 546.2, 511.72, 562.93, 732.62, 651.88, 532.1, 551.91] },
      velocityScore: { '1D': 3.1, '1W': 1, '1M': 97.4, '6M': null }, isNew: false,
      marketCap: '$190B', pe: 33, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { BUZZ: false, MEME: 5.17, RKNG: 3.9 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'WULF', name: 'WULF', easyScore: 2, avgWeight: 4.31, proScore: 2.87, coverage: 0.667,
      price: 19.88, weeklyPrices: [22.83, 23.20, 21.97, 20.89, 19.88], weeklyChange: -12.94, dayChange: 2.4, sortRank: 0, periodReturns: { '1M': -29.4, 'YTD': 73, '6M': 43.7, '1Y': 308.1 },
      priceHistory: { '1D': [19.41, 19.87, 19.78, 19.88], '1W': [22.83, 23.2, 21.97, 20.89, 19.88], '1M': [28.17, 28.01, 27.86, 28.98, 28.31, 28.78, 26.97, 26.06, 25.83, 25.58, 24.7, 23.58, 21.18, 22.21, 20.24, 22.83, 23.2, 21.97, 20.89, 19.88], 'YTD': [11.49, 12.84, 13.85, 13.79, 13.44, 16.65, 15.38, 17.92, 15.37, 14.67, 15.74, 15.35, 14.88, 19.45, 20.5, 21.43, 22.29, 22.8, 21.34, 26.74, 26.19, 25.35, 28.98, 25.83, 20.24, 19.88], '6M': [13.83, 14.12, 13.37, 14.29, 16.26, 15.01, 16.22, 13.75, 14.67, 15.1, 14.89, 15.55, 19.45, 20.64, 20.01, 21.31, 23.39, 22.32, 22.82, 25.66, 25.86, 26.06, 28.31, 25.58, 20.24, 19.88], '1Y': [4.87, 5.26, 5.22, 5.06, 5.24, 8.78, 8.93, 9.63, 10.3, 10.94, 11.24, 11.42, 12.1, 15.46, 13.14, 15.94, 16.1, 14.3, 11.05, 12.63, 14.22, 15.59, 12.99, 12.42, 11.49, 12.84, 14.21, 12.89, 14.54, 11.92, 15.91, 15.01, 16.22, 13.75, 14.67, 15.1, 15.35, 14.88, 18.87, 20.64, 20.01, 21.31, 23.39, 22.32, 22.82, 25.66, 24, 26.06, 28.31, 25.58, 20.24, 19.88] },
      velocityScore: { '1D': -1, '1W': -0.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: null, revenueGrowth: -1, eps: -2.33, grossMargin: 64, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.48, RKNG: 3.14 },
      tonyNote: 'WULF appears in 2 of 3 Meme ETFs (67% coverage) with average weight 4.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 2, avgWeight: 4.07, proScore: 2.71, coverage: 0.667,
      price: 39.41, weeklyPrices: [41.72, 41.14, 38.98, 38.59, 39.41], weeklyChange: -5.54, dayChange: 2.12, sortRank: 0, periodReturns: { '1M': -35.2, 'YTD': 4.3, '6M': -24.1, '1Y': 133.5 },
      priceHistory: { '1D': [38.59, 39.88, 39.6, 39.41], '1W': [41.72, 41.14, 38.98, 38.59, 39.41], '1M': [60.85, 59.18, 58.11, 59.96, 56.87, 54.72, 50.3, 47.74, 47.21, 45.91, 45.73, 43.32, 38.82, 43.91, 39.81, 43.01, 41.72, 41.14, 38.98, 38.59, 39.41], 'YTD': [37.77, 45.68, 57.82, 52.36, 53.08, 42.93, 42.08, 44.03, 40.13, 41.37, 41.66, 35.09, 35.13, 43.07, 48.72, 44.44, 54.74, 56.56, 52.71, 64.05, 61.86, 59.77, 56.87, 45.91, 43.01, 39.41], '6M': [51.89, 56.68, 53.74, 41.83, 42.22, 42.36, 41.39, 36.7, 41.58, 41.29, 35.09, 35.13, 43.07, 48.72, 48.36, 49.48, 55.15, 50.46, 59.78, 65.33, 59.19, 60.85, 54.72, 45.73, 43.01, 39.41], '1Y': [16.88, 18.59, 15.79, 16.45, 17.83, 18.73, 22.99, 29.11, 30.19, 36.45, 41.77, 46.93, 61.68, 69.56, 55.19, 62.42, 66.63, 57.38, 48.85, 47.47, 41.12, 46.84, 36.59, 42.07, 37.77, 45.68, 51.89, 56.68, 53.74, 41.83, 42.22, 42.36, 40.95, 36.7, 41.58, 41.29, 35.09, 35.13, 43.07, 48.72, 48.36, 49.48, 55.15, 50.46, 59.78, 65.33, 59.19, 60.85, 54.72, 45.73, 43.01, 39.41] },
      velocityScore: { '1D': 0.7, '1W': -6.2, '1M': -30.2, '6M': null }, isNew: false,
      marketCap: '$14B', pe: 51.2, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 2.23, MEME: 5.9, RKNG: false },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 2, avgWeight: 3.94, proScore: 2.63, coverage: 0.667,
      price: 68.9, weeklyPrices: [73.88, 73.32, 67.58, 68.82, 68.90], weeklyChange: -6.74, dayChange: 0.12, sortRank: 0, periodReturns: { '1M': -21.3, 'YTD': -5.1, '6M': -32, '1Y': 34.8 },
      priceHistory: { '1D': [68.82, 69.32, 69.21, 68.9], '1W': [73.88, 73.32, 67.58, 68.82, 68.9], '1M': [87.57, 82.25, 85.43, 80.66, 73.19, 72.87, 68.01, 65.62, 71.45, 86.77, 88.86, 86.1, 85.13, 80.64, 74.21, 74.95, 73.88, 73.32, 67.58, 68.82, 68.9], 'YTD': [72.63, 90.56, 115.77, 104.78, 104.55, 96.27, 84.43, 82.36, 93.86, 87.09, 94.09, 78.67, 94.81, 98.97, 81, 71.88, 63.87, 72.96, 89.58, 133.09, 107.29, 82.41, 73.19, 86.77, 74.95, 68.9], '6M': [101.25, 113.57, 111.21, 101.79, 82.51, 83.9, 86.92, 89.47, 86.34, 89.93, 78.67, 94.81, 98.97, 81, 77.2, 68.43, 82.55, 86.83, 119.7, 105.65, 92.06, 87.57, 72.87, 88.86, 74.95, 68.9], '1Y': [51.12, 57.09, 53.09, 52.57, 49.76, 44.95, 50.43, 48.76, 36.91, 40.43, 54.8, 49.08, 74.75, 94.5, 78.61, 77.77, 70.05, 67.89, 58.22, 55.51, 56.89, 72.84, 68.37, 85.67, 72.63, 90.56, 101.25, 113.57, 111.21, 101.79, 82.51, 83.9, 79.19, 89.47, 86.34, 89.93, 78.67, 94.81, 98.97, 81, 77.2, 68.43, 82.55, 86.83, 119.7, 105.65, 92.06, 87.57, 72.87, 88.86, 74.95, 68.9] },
      velocityScore: { '1D': -1.1, '1W': 44.5, '1M': -33.4, '6M': null }, isNew: false,
      marketCap: '$27B', pe: null, revenueGrowth: 1952, eps: -1.83, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.31, MEME: 5.57, RKNG: false },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'AMD', name: 'AMD', easyScore: 2, avgWeight: 3.8, proScore: 2.53, coverage: 0.667,
      price: 555.44, weeklyPrices: [517.41, 546.72, 557.89, 534.39, 555.44], weeklyChange: 7.35, dayChange: 1.33, sortRank: 0, periodReturns: { '1M': 1.5, 'YTD': 159.4, '6M': 143.7, '1Y': 256.9 },
      priceHistory: { '1D': [548.13, 557.07, 555.44], '1W': [517.41, 546.72, 557.89, 534.39, 555.44], '1M': [547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 516.11, 517.41, 546.72, 557.89, 534.39, 555.44], 'YTD': [214.16, 204.68, 231.83, 251.31, 246.27, 216, 200.12, 210.86, 202.07, 197.74, 205.27, 203.77, 217.5, 246.83, 274.95, 334.63, 341.54, 448.29, 414.05, 495.54, 523.2, 488.45, 537.37, 521.58, 516.11, 555.44], '6M': [227.92, 259.68, 236.73, 208.44, 207.32, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 278.39, 347.81, 360.54, 455.19, 424.1, 467.51, 510.13, 490.33, 511.57, 551.63, 539.49, 516.11, 555.44], '1Y': [155.61, 154.72, 177.44, 174.31, 174.95, 166.55, 163.36, 162.32, 155.82, 160.46, 160.9, 161.79, 211.51, 218.09, 238.03, 258.01, 259.65, 243.98, 240.52, 215.05, 215.24, 221.62, 209.17, 214.9, 214.16, 204.68, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 200.21, 192.43, 193.39, 201.33, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 467.51, 510.13, 466.38, 511.57, 551.63, 539.49, 516.11, 555.44] },
      velocityScore: { '1D': 3.7, '1W': 8.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$906B', pe: 184.5, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { BUZZ: 3.5, MEME: false, RKNG: 4.1 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 2, avgWeight: 3.38, proScore: 2.26, coverage: 0.667,
      price: 963.51, weeklyPrices: [948.80, 991.64, 979.30, 937.00, 963.51], weeklyChange: 1.55, dayChange: -1.99, sortRank: 0, periodReturns: { '1M': -11.4, 'YTD': 237.6, '6M': 186.2, '1Y': 702.2 },
      priceHistory: { '1D': [983.12, 966.23, 963.51], '1W': [948.8, 991.64, 979.3, 937, 963.51], '1M': [1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 938.38, 948.8, 991.64, 979.3, 937, 963.51], 'YTD': [285.41, 327.02, 362.75, 389.09, 437.8, 383.5, 420.95, 429, 400.77, 405.35, 444.27, 355.46, 366.24, 426.56, 448.42, 524.56, 576.45, 766.58, 698.74, 928.41, 996, 995.87, 1133.99, 1132.33, 938.38, 963.51], '6M': [336.63, 399.65, 414.88, 394.69, 411.66, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 1035.5, 949.28, 981.61, 1211.38, 1145.28, 938.38, 963.51], '1Y': [120.11, 109.22, 111.96, 109.06, 127.75, 122.05, 116.42, 118.48, 135.24, 158.82, 166.41, 167.32, 185.69, 187.06, 202.29, 221.91, 234.7, 253.3, 241.95, 223.93, 239.49, 252.42, 232.51, 276.27, 285.41, 327.02, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 1035.5, 864.01, 981.61, 1211.38, 1145.28, 938.38, 963.51] },
      velocityScore: { '1D': 1.8, '1W': 1.3, '1M': -27.6, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 20.8, revenueGrowth: 346, eps: 46.4, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { BUZZ: 3.02, MEME: false, RKNG: 3.75 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'INTC', name: 'INTC', easyScore: 2, avgWeight: 2.92, proScore: 1.94, coverage: 0.667,
      price: 108.21, weeklyPrices: [110.24, 112.54, 109.84, 103.12, 108.21], weeklyChange: -1.84, dayChange: 0.42, sortRank: 0, periodReturns: { '1M': -15.4, 'YTD': 193.3, '6M': 123.9, '1Y': 372.1 },
      priceHistory: { '1D': [107.76, 108.14, 108.21], '1W': [110.24, 112.54, 109.84, 103.12, 108.21], '1M': [127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 127.02, 120.35, 122.2, 110.39, 110.24, 112.54, 109.84, 103.12, 108.21], 'YTD': [36.9, 41.11, 46.96, 42.49, 48.81, 50.24, 45.46, 46.88, 45.58, 45.25, 46.18, 44.1, 50.38, 65.18, 65.7, 84.99, 95.78, 120.61, 110.8, 121.77, 111.78, 116.96, 133.99, 128.32, 110.39, 108.21], '6M': [48.32, 45.07, 46.47, 50.59, 46.79, 44.11, 45.61, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 68.5, 82.54, 99.62, 124.92, 108.77, 119.84, 109.33, 110.27, 124.57, 140.94, 131.72, 110.39, 108.21], '1Y': [22.92, 23.24, 20.41, 20.19, 21.81, 25.31, 24.55, 24.21, 24.44, 25.27, 29.34, 33.55, 37.17, 35.63, 38.12, 41.53, 39.5, 38.45, 34.71, 35.79, 43.47, 40.5, 37.31, 36.35, 36.9, 41.11, 48.72, 54.32, 48.66, 48.24, 46.48, 44.11, 45.61, 43.42, 45.77, 43.87, 44.1, 50.38, 62.38, 68.5, 82.54, 99.62, 124.92, 108.77, 119.84, 109.33, 99.17, 124.57, 140.94, 131.72, 110.39, 108.21] },
      velocityScore: { '1D': -1.5, '1W': -9.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$544B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 2.58, MEME: false, RKNG: 3.25 },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'DELL', name: 'DELL', easyScore: 2, avgWeight: 2.9, proScore: 1.93, coverage: 0.667,
      price: 452.96, weeklyPrices: [450.22, 434.97, 427.11, 457.54, 452.96], weeklyChange: 0.61, dayChange: -1.01, sortRank: 0, periodReturns: { '1M': 10.7, 'YTD': 259.8, '6M': 278.5, '1Y': 260.4 },
      priceHistory: { '1D': [457.56, 453.68, 453.17, 452.96], '1W': [450.22, 434.97, 427.11, 457.54, 452.96], '1M': [409.07, 404.08, 419.32, 409.5, 418.71, 427.78, 434.06, 409.45, 399.49, 414.61, 431.46, 425.25, 394.32, 411.8, 417.28, 431.97, 450.22, 434.97, 427.11, 457.54, 452.96], 'YTD': [125.88, 118.5, 120.53, 115.93, 119.16, 126.01, 116.78, 123.48, 146.52, 149.91, 156.76, 171.81, 173.18, 189.79, 204.24, 205.93, 216.32, 238.94, 242.93, 317.05, 422.05, 395.57, 418.71, 414.61, 431.97, 452.96], '6M': [119.66, 115.43, 114.44, 121.05, 117.49, 119.14, 153.55, 146.48, 151.62, 157.67, 171.81, 173.18, 189.79, 204.24, 215.97, 211.64, 247.04, 238.03, 305.08, 465.96, 400.77, 409.07, 427.78, 431.46, 431.97, 452.96], '1Y': [125.69, 124.33, 133.51, 130.48, 141.64, 135.2, 130.99, 120.96, 121.29, 127.68, 134.34, 141.77, 150.87, 148.77, 149.43, 164.88, 154.64, 138.76, 122.69, 125.92, 135.95, 138.22, 133.75, 127.62, 125.88, 118.5, 119.66, 115.43, 114.44, 121.05, 117.49, 119.14, 148.08, 146.48, 151.62, 157.67, 171.81, 173.18, 189.79, 204.24, 215.97, 211.64, 247.04, 238.03, 305.08, 465.96, 400.77, 409.07, 427.78, 431.46, 431.97, 452.96] },
      velocityScore: { '1D': 2.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$293B', pe: 36.1, revenueGrowth: 88, eps: 12.54, grossMargin: 19, dividendYield: 0.55,
      etfPresence: { BUZZ: 1.59, MEME: false, RKNG: 4.21 },
      tonyNote: 'DELL appears in 2 of 3 Meme ETFs (67% coverage) with average weight 2.9% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'GOOGL', easyScore: 2, avgWeight: 2.71, proScore: 1.8, coverage: 0.667,
      price: 362.38, weeklyPrices: [361.92, 358.89, 357.18, 352.51, 362.38], weeklyChange: 0.13, dayChange: 0.8, sortRank: 0, periodReturns: { '1M': -1.9, 'YTD': 15.8, '6M': 8.9, '1Y': 99.1 },
      priceHistory: { '1D': [359.51, 362.7, 362.38], '1W': [361.92, 358.89, 357.18, 352.51, 362.38], '1M': [369.35, 373.25, 363.79, 368.03, 349.68, 346.13, 345.29, 343.71, 337.39, 353.65, 357.37, 361.21, 359.91, 366.46, 367.03, 361.92, 358.89, 357.18, 352.51, 362.38], 'YTD': [313, 325.44, 330, 333.26, 343.69, 324.32, 303.33, 312.9, 303.13, 303.55, 307.13, 280.92, 295.77, 321.31, 337.42, 350.34, 383.25, 387.35, 387.66, 388.83, 372.19, 357.77, 368.03, 337.39, 367.03, 362.38], '6M': [332.78, 327.93, 338, 322.86, 305.72, 314.98, 311.76, 298.52, 302.28, 301, 274.34, 299.99, 321.31, 341.68, 344.4, 385.69, 400.8, 396.78, 382.97, 376.37, 363.31, 359.68, 349.68, 353.65, 367.03, 362.38], '1Y': [182, 191.34, 195.75, 194.67, 203.34, 201.57, 208.49, 211.35, 239.63, 251.16, 251.66, 243.1, 245.76, 245.45, 250.46, 267.47, 283.72, 290.1, 285.02, 318.58, 315.81, 317.08, 306.57, 314.35, 313, 325.44, 335.84, 330.54, 338.25, 331.25, 309, 314.98, 311.76, 298.52, 302.28, 301, 280.92, 295.77, 317.24, 341.68, 344.4, 385.69, 400.8, 396.78, 382.97, 376.37, 368.53, 359.68, 349.68, 353.65, 367.03, 362.38] },
      velocityScore: { '1D': 1.1, '1W': null, '1M': 18.4, '6M': null }, isNew: false,
      marketCap: '$4.4T', pe: 27.6, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { BUZZ: 1.58, MEME: false, RKNG: 3.83 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 1, avgWeight: 6.65, proScore: 2.22, coverage: 0.333,
      price: 119.53, weeklyPrices: [122.21, 119.92, 111.88, 125.45, 119.53], weeklyChange: -2.19, dayChange: -4.72, sortRank: 0, periodReturns: { '1M': -37.6, 'YTD': 242.9, '6M': 223.1, '1Y': 308.8 },
      priceHistory: { '1D': [125.45, 119.16, 119.67, 119.53], '1W': [122.21, 119.92, 111.88, 125.45, 119.53], '1M': [191.55, 170.81, 167.34, 161.85, 171.23, 147.44, 146.97, 138.54, 135.69, 150.1, 148.16, 139, 120.95, 123.36, 114.41, 114.44, 122.21, 119.92, 111.88, 125.45, 119.53], 'YTD': [34.86, 33.01, 37.04, 34.89, 44.16, 48.49, 43.44, 58.12, 101.14, 106.19, 101.92, 98.21, 107.45, 153.19, 163.47, 137.26, 180.57, 188.28, 165.26, 169.02, 202.89, 169.05, 171.23, 150.1, 114.44, 119.53], '6M': [37, 35.72, 43.61, 44.3, 44.46, 53.96, 102.51, 95.58, 96.81, 87.54, 98.21, 107.45, 153.19, 163.47, 145.78, 172.98, 184.9, 173.26, 177.62, 185.67, 196.64, 191.55, 147.44, 148.16, 114.44, 119.53], '1Y': [29.24, 26.35, 24.11, 21.42, 22.79, 22.77, 25.07, 23.35, 23.72, 28.93, 28.06, 25.93, 31.33, 28.48, 33.4, 36.87, 29.5, 23.75, 20.89, 22.73, 26.02, 30.38, 28.96, 40.64, 34.86, 33.01, 37, 35.72, 43.61, 44.3, 44.46, 53.96, 84.23, 95.58, 96.81, 87.54, 98.21, 107.45, 153.19, 163.47, 145.78, 172.98, 184.9, 173.26, 177.62, 185.67, 196.64, 191.55, 147.44, 148.16, 114.44, 119.53] },
      velocityScore: { '1D': -0.4, '1W': -5.1, '1M': -43.1, '6M': null }, isNew: false,
      marketCap: '$10B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.65, RKNG: false },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'HIMS', name: 'HIMS', easyScore: 1, avgWeight: 5.59, proScore: 1.86, coverage: 0.333,
      price: 36.7, weeklyPrices: [35.45, 34.38, 34.38, 35.15, 36.70], weeklyChange: 3.51, dayChange: 4.4, sortRank: 0, periodReturns: { '1M': 21.6, 'YTD': 13, '6M': 17.5, '1Y': -27.3 },
      priceHistory: { '1D': [35.15, 36.48, 36.51, 36.7], '1W': [35.45, 34.38, 34.38, 35.15, 36.7], '1M': [30.17, 31.47, 31.89, 35.47, 33.54, 32.96, 32.7, 32.71, 33.94, 33.39, 34.67, 37.57, 36.8, 38.28, 36.17, 36.07, 35.45, 34.38, 34.38, 35.15, 36.7], 'YTD': [32.47, 33.87, 31.38, 30.28, 26.44, 17.24, 15.84, 15.82, 15.88, 23.84, 24.16, 19.38, 20.33, 21.15, 31.01, 27.91, 26.33, 25.03, 23.04, 25.38, 28.01, 26.82, 33.54, 33.39, 36.07, 36.7], '6M': [31.23, 29.62, 27.09, 23.02, 16.3, 15.51, 16.48, 15.74, 24.77, 22.02, 19.38, 20.33, 21.15, 31.01, 29.39, 27.27, 29.14, 22.29, 23.85, 27.76, 27.17, 30.17, 32.96, 34.67, 36.07, 36.7], '1Y': [50.46, 50.01, 60.27, 55.52, 47.96, 42.18, 45.35, 41.53, 47.79, 50.89, 56, 56.72, 57.97, 54.02, 49.36, 47.12, 42.79, 39.75, 36.26, 37.09, 36.31, 39.82, 36.86, 34.8, 32.47, 33.87, 31.23, 29.62, 27.09, 23.02, 16.3, 15.51, 14.52, 15.74, 24.77, 22.02, 19.38, 20.33, 21.15, 31.01, 29.39, 27.27, 29.14, 22.29, 23.85, 27.76, 27.17, 30.17, 32.96, 34.67, 36.07, 36.7] },
      velocityScore: { '1D': 6.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$8B', pe: null, revenueGrowth: 4, eps: -0.09, grossMargin: 73, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.59, RKNG: false },
      tonyNote: 'HIMS appears in 1 of 3 Meme ETFs (33% coverage) with average weight 5.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'COHR', name: 'COHR', easyScore: 1, avgWeight: 5.24, proScore: 1.75, coverage: 0.333,
      price: 306.27, weeklyPrices: [317.05, 327.24, 324.50, 307.39, 306.27], weeklyChange: -3.4, dayChange: -1.45, sortRank: 0, periodReturns: { '1M': -26, 'YTD': 65.9, '6M': 56.3, '1Y': 218.8 },
      priceHistory: { '1D': [310.77, 308.73, 306.41, 306.27], '1W': [317.05, 327.24, 324.5, 307.39, 306.27], '1M': [413.84, 382.81, 378.85, 389.57, 425.48, 381.22, 392.5, 407.25, 380.56, 391.22, 394.47, 368.65, 333.36, 335.7, 314.13, 317.05, 327.24, 324.5, 307.39, 306.27], 'YTD': [184.57, 173.15, 191.04, 197.76, 222.44, 242.46, 223.89, 267.9, 274.86, 241.27, 275.57, 243.29, 258.16, 307.93, 347.51, 321.53, 329.89, 374.01, 353.63, 380.18, 421.9, 363.58, 389.57, 380.56, 314.13, 306.27], '6M': [195.96, 196.94, 212.18, 227.68, 217.23, 248.18, 258.93, 235.72, 242.76, 253.63, 243.48, 253.22, 307.93, 345.02, 336.09, 329.5, 335.26, 382.45, 377.57, 362.9, 401.93, 385.03, 425.48, 391.22, 314.13, 306.27], '1Y': [96.07, 97.02, 106.98, 105.6, 116.56, 87.76, 90.5, 87.8, 99.22, 104.47, 109.29, 107.72, 113.56, 109.37, 120.79, 134.24, 132, 166.72, 139.07, 151.81, 164.89, 192.73, 175.2, 191.87, 184.57, 173.15, 184.11, 202.72, 215.86, 209.24, 216.1, 248.18, 258.93, 235.72, 242.76, 253.63, 243.29, 258.16, 307.5, 345.02, 336.09, 329.5, 335.26, 382.45, 377.57, 362.9, 376.99, 385.03, 425.48, 391.22, 314.13, 306.27] },
      velocityScore: { '1D': 1.2, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$60B', pe: 145.2, revenueGrowth: 21, eps: 2.11, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.24, RKNG: false },
      tonyNote: 'COHR appears in 1 of 3 Meme ETFs (33% coverage) with average weight 5.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LITE', name: 'LITE', easyScore: 1, avgWeight: 5.22, proScore: 1.74, coverage: 0.333,
      price: 783.85, weeklyPrices: [785.77, 802.01, 768.15, 814.80, 783.85], weeklyChange: -0.24, dayChange: -3.8, sortRank: 0, periodReturns: { '1M': -18.1, 'YTD': 112.7, '6M': 128.3, '1Y': 698.7 },
      priceHistory: { '1D': [814.8, 789.7, 783.85], '1W': [785.77, 802.01, 768.15, 814.8, 783.85], '1M': [957.24, 875.36, 869.98, 850, 893.93, 827.92, 842.53, 861.97, 816.98, 851.4, 858.06, 801.16, 728.32, 731.25, 698.91, 707.1, 785.77, 802.01, 768.15, 814.8, 783.85], 'YTD': [368.59, 348.26, 324.25, 332.45, 423.42, 561.13, 594.26, 723.39, 650.82, 616.09, 772.13, 702.73, 772.28, 871.18, 895.11, 791.37, 994.56, 992.37, 868.07, 860.62, 945.08, 921.56, 893.93, 851.4, 707.1, 783.85], '6M': [343.27, 339.19, 391.84, 551.99, 562.74, 674.73, 783.25, 558.44, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 1053.09, 884.98, 910.81, 905, 895.4, 957.24, 827.92, 858.06, 707.1, 783.85], '1Y': [98.14, 99.63, 109.48, 108.15, 119.66, 117.96, 124.62, 132.55, 151.73, 170.9, 163.99, 162.71, 157.15, 156.78, 162.95, 198.39, 188.36, 252.47, 247.43, 291.27, 302.81, 360.33, 316.15, 387.41, 368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 674.73, 700.91, 558.44, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 1053.09, 884.98, 910.81, 905, 895.4, 957.24, 827.92, 858.06, 707.1, 783.85] },
      velocityScore: { '1D': 2.4, '1W': -34.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$61B', pe: 137.5, revenueGrowth: 90, eps: 5.7, grossMargin: 41, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.22, RKNG: false },
      tonyNote: 'LITE appears in 1 of 3 Meme ETFs (33% coverage) with average weight 5.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 1, avgWeight: 5.1, proScore: 1.7, coverage: 0.333,
      price: 39.66, weeklyPrices: [44.77, 42.86, 38.88, 39.29, 39.66], weeklyChange: -11.41, dayChange: 0.97, sortRank: 0, periodReturns: { '1M': -35.2, 'YTD': -11.6, '6M': -16.6, '1Y': -4.4 },
      priceHistory: { '1D': [39.28, 39.93, 39.83, 39.66], '1W': [44.77, 42.86, 38.88, 39.29, 39.66], '1M': [61.18, 56.06, 54.69, 56.55, 58.32, 57.85, 53.6, 50.56, 49.31, 53.88, 53.26, 51.4, 49.12, 48.87, 45.36, 45.08, 44.77, 42.86, 38.88, 39.29, 39.66], 'YTD': [44.87, 50.45, 50.8, 43.37, 38.56, 35.19, 33.34, 33.59, 36.02, 33.03, 31.9, 27.51, 29.24, 29.76, 48.32, 43.08, 48, 55.87, 52.47, 70.14, 65.66, 57.85, 58.32, 53.88, 45.08, 39.66], '6M': [47.56, 47.25, 39.98, 34.99, 34.11, 30.78, 38.34, 35.73, 32.98, 31.2, 27.51, 29.24, 29.76, 48.32, 43.84, 45.75, 56.89, 49.31, 63.62, 69.28, 62.8, 61.18, 57.85, 53.26, 45.08, 39.66], '1Y': [41.47, 41.94, 40.53, 42.02, 43, 36.8, 40.75, 42.99, 44, 62.26, 75.14, 61.5, 79.23, 77.55, 59.5, 57.15, 53.38, 54.42, 49.12, 47.06, 46.93, 54.44, 49.67, 51.39, 44.87, 50.45, 47.56, 47.25, 39.98, 34.99, 34.11, 30.78, 38.37, 35.73, 32.98, 31.2, 27.51, 29.24, 29.76, 48.32, 43.84, 45.75, 56.89, 49.31, 63.62, 69.28, 62.8, 61.18, 57.85, 53.26, 45.08, 39.66] },
      velocityScore: { '1D': -3.4, '1W': -4, '1M': -26.4, '6M': null }, isNew: false,
      marketCap: '$15B', pe: 101.7, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.1, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 1, avgWeight: 5.09, proScore: 1.7, coverage: 0.333,
      price: 0, weeklyPrices: [0.00], weeklyChange: 0, dayChange: 0, sortRank: 0, periodReturns: { '1M': 0, 'YTD': 0, '6M': 0, '1Y': 0 },
      priceHistory: undefined,
      velocityScore: { '1D': -1.2, '1W': -4, '1M': -54.1, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: null, revenueGrowth: 0, eps: 0, grossMargin: 0, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.09, RKNG: false },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'STX', name: 'STX', easyScore: 1, avgWeight: 4.82, proScore: 1.61, coverage: 0.333,
      price: 864.61, weeklyPrices: [860.02, 890.09, 910.34, 860.66, 864.61], weeklyChange: 0.53, dayChange: -1.56, sortRank: 0, periodReturns: { '1M': -15.1, 'YTD': 214, '6M': 169.9, '1Y': 480.1 },
      priceHistory: { '1D': [878.31, 869, 864.61], '1W': [860.02, 890.09, 910.34, 860.66, 864.61], '1M': [1018.8, 1031.34, 1066.07, 1070.23, 1094.04, 1038.59, 993.25, 1025.36, 899.9, 968.53, 965, 915.19, 820.16, 868.26, 827.64, 860.02, 890.09, 910.34, 860.66, 864.61], 'YTD': [275.39, 284.47, 326.23, 358.29, 432.95, 425, 424.14, 421.85, 375.01, 373.98, 434.6, 378.79, 429.36, 513.28, 539.75, 595.86, 738.54, 808.8, 733.35, 870.66, 925.99, 868.09, 1070.23, 899.9, 827.64, 864.61], '6M': [320.32, 346.1, 407.69, 429.32, 425.99, 411.11, 407.84, 352.8, 383.71, 411.23, 380.07, 453.3, 513.28, 547.75, 586.25, 726.93, 782.64, 795.47, 812.73, 921.26, 876.77, 931.04, 1094.04, 968.53, 827.64, 864.61], '1Y': [149.05, 146.59, 152.68, 151.74, 155.59, 157.93, 164, 170.5, 191.59, 211.13, 228.13, 236.06, 225.01, 211.63, 214.57, 223, 265.55, 293.99, 261.38, 253.38, 266.87, 282.86, 288.13, 282.8, 275.39, 284.47, 312.28, 346.53, 446.57, 405.45, 431.17, 411.11, 407.84, 352.8, 383.71, 411.23, 378.79, 429.36, 503.13, 547.75, 586.25, 726.93, 782.64, 795.47, 812.73, 921.26, 847.47, 931.04, 1094.04, 968.53, 827.64, 864.61] },
      velocityScore: { '1D': 1.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$196B', pe: 82, revenueGrowth: 44, eps: 10.54, grossMargin: 42, dividendYield: 0.34,
      etfPresence: { BUZZ: false, MEME: 4.82, RKNG: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'CBRS', name: 'CBRS', easyScore: 1, avgWeight: 4.5, proScore: 1.5, coverage: 0.333,
      price: 201.6, weeklyPrices: [198.53, 215.08, 204.62, 203.81, 201.60], weeklyChange: 1.55, dayChange: -1.08, sortRank: 0, periodReturns: { '1M': -7.5, 'YTD': -35.2, '6M': -35.2, '1Y': -35.2 },
      priceHistory: { '1D': [203.81, 201.64, 200.66, 201.6], '1W': [198.53, 215.08, 204.62, 203.81, 201.6], '1M': [218.03, 212.25, 213.67, 234.71, 224.43, 226.72, 182.26, 168.52, 181.59, 216.16, 221, 221.27, 204.86, 192.01, 176.61, 181.72, 198.53, 215.08, 204.62, 203.81, 201.6], 'YTD': [311.07, 296.65, 303.63, 281.86, 241.71, 266.9, 236.99, 213.28, 214.94, 201.01, 237.83, 237.33, 214, 218.03, 213.67, 224.43, 226.72, 168.52, 216.16, 221, 204.86, 192.01, 181.72, 215.08, 204.62, 201.6], '6M': [311.07, 296.65, 303.63, 281.86, 241.71, 266.9, 236.99, 213.28, 214.94, 201.01, 237.83, 237.33, 214, 218.03, 213.67, 224.43, 226.72, 168.52, 216.16, 221, 204.86, 192.01, 181.72, 215.08, 204.62, 201.6], '1Y': [311.07, 279.72, 296.65, 303.63, 290.69, 281.86, 256.78, 241.71, 266.9, 242.59, 236.99, 213.28, 236.52, 214.94, 215.4, 201.01, 237.83, 226.82, 237.33, 226.55, 214, 218.03, 212.25, 213.67, 234.71, 224.43, 226.72, 182.26, 168.52, 181.59, 216.16, 221, 221.27, 204.86, 192.01, 176.61, 181.72, 198.53, 215.08, 204.62, 203.81, 201.6] },
      velocityScore: { '1D': null, '1W': -3.2, '1M': null, '6M': null }, isNew: true,
      marketCap: '$45B', pe: 448, revenueGrowth: 94, eps: 0.45, grossMargin: 40, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.5, RKNG: false },
      tonyNote: 'CBRS appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'CRDO', easyScore: 1, avgWeight: 4.41, proScore: 1.47, coverage: 0.333,
      price: 234.4, weeklyPrices: [265.65, 257.79, 236.88, 236.18, 234.40], weeklyChange: -11.76, dayChange: -0.75, sortRank: 0, periodReturns: { '1M': -9.6, 'YTD': 62.9, '6M': 57.2, '1Y': 128.5 },
      priceHistory: { '1D': [236.18, 234.94, 234.4], '1W': [265.65, 257.79, 236.88, 236.18, 234.4], '1M': [259.41, 239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.09, 241.91, 265.55, 246.4, 258.69, 265.65, 257.79, 236.88, 236.18, 234.4], 'YTD': [143.89, 141.59, 150.97, 128.02, 119.96, 134.72, 127.91, 123.46, 114.74, 111.57, 107.09, 95.24, 102.46, 134.36, 174.53, 165.92, 193.57, 198.57, 182.98, 222.35, 217.5, 250.81, 302.52, 245.68, 258.69, 234.4], '6M': [149.12, 133.16, 125.28, 111.4, 121.44, 124.05, 114.22, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 210.22, 156.27, 221.64, 226.1, 222.27, 259.41, 272.01, 271.95, 258.69, 234.4], '1Y': [102.59, 92.93, 109.38, 110.29, 125.38, 106.3, 120.1, 124.27, 149.03, 164.42, 162.26, 145.61, 137.2, 129.75, 144.17, 162.18, 164.23, 158.5, 139.56, 154.18, 188.44, 170.29, 140.34, 147.81, 143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.05, 112.27, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 210.22, 156.27, 221.64, 226.1, 222.27, 259.41, 272.01, 271.95, 258.69, 234.4] },
      velocityScore: { '1D': null, '1W': -23, '1M': -49.7, '6M': null }, isNew: true,
      marketCap: '$44B', pe: 93.8, revenueGrowth: 157, eps: 2.5, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.41, RKNG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
