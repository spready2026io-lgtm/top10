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
export const SPY_RET: Record<Period, number> = { '1W': 0.7, '1M': -0.6, 'YTD': 10.1, '6M': 8.7, '1Y': 20.1 };
// @@END_GENERATED:SPY_RET@@

// Top holdings per ETF (ticker + portfolio weight %), shown on ETF row hover.
export type EtfHolding = { t: string; w: number };

// @@GENERATED:ETF_TOP_HOLDINGS@@
export const ETF_TOP_HOLDINGS: Record<string, EtfHolding[]> = {
  AIS: [{ t: 'MU', w: 6.8 }, { t: 'AMD', w: 5.4 }, { t: 'SIMO', w: 3.9 }, { t: 'VRT', w: 3.9 }, { t: 'MRVL', w: 3.5 }],
  ARTY: [{ t: 'AMD', w: 5.2 }, { t: 'NVDA', w: 4.8 }, { t: 'MU', w: 4.8 }, { t: 'AVGO', w: 4.7 }, { t: 'CRWV', w: 3.9 }],
  BAI: [{ t: 'MU', w: 6.2 }, { t: 'AMD', w: 5.4 }, { t: 'TSM', w: 4.6 }, { t: 'AVGO', w: 4.6 }, { t: 'NVDA', w: 4.6 }],
  IGPT: [{ t: 'META', w: 9.4 }, { t: 'AMD', w: 8.9 }, { t: 'NVDA', w: 8.1 }, { t: 'GOOGL', w: 8.0 }, { t: 'MU', w: 7.6 }],
  IVES: [{ t: 'META', w: 5.4 }, { t: 'AAPL', w: 5.3 }, { t: 'AMZN', w: 4.9 }, { t: 'NVDA', w: 4.9 }, { t: 'MSFT', w: 4.8 }],
  ALAI: [{ t: 'NVDA', w: 12.9 }, { t: 'TSM', w: 5.3 }, { t: 'MSFT', w: 5.2 }, { t: 'AMZN', w: 4.9 }, { t: 'GOOG', w: 4.8 }],
  CHAT: [{ t: 'NVDA', w: 7.4 }, { t: 'GOOGL', w: 5.6 }, { t: 'AVGO', w: 4.8 }, { t: 'AMD', w: 4.1 }, { t: 'MU', w: 3.6 }],
  AIFD: [{ t: 'NVDA', w: 6.5 }, { t: 'MU', w: 6.3 }, { t: 'PANW', w: 5.7 }, { t: 'ANET', w: 5.6 }, { t: 'AVGO', w: 5.5 }],
  SPRX: [{ t: 'ALAB', w: 12.1 }, { t: 'COHR', w: 8.8 }, { t: 'KLAC', w: 8.3 }, { t: 'NET', w: 8.3 }, { t: 'ARM', w: 8.0 }],
  AOTG: [{ t: 'AMD', w: 16.4 }, { t: 'NVDA', w: 10.1 }, { t: 'MU', w: 9.8 }, { t: 'TSM', w: 7.1 }, { t: 'TOST', w: 5.2 }],
  SOXX: [{ t: 'AMD', w: 8.6 }, { t: 'MU', w: 8.0 }, { t: 'NVDA', w: 8.0 }, { t: 'AVGO', w: 7.2 }, { t: 'INTC', w: 5.4 }],
  PSI: [{ t: 'AMAT', w: 6.8 }, { t: 'KLAC', w: 5.9 }, { t: 'AMD', w: 5.7 }, { t: 'MU', w: 5.6 }, { t: 'LRCX', w: 5.5 }],
  XSD: [{ t: 'PENG', w: 3.2 }, { t: 'MXL', w: 3.0 }, { t: 'PI', w: 2.9 }, { t: 'AMD', w: 2.9 }, { t: 'AMBA', w: 2.8 }],
  DRAM: [{ t: 'SNDK', w: 4.9 }, { t: 'STX', w: 4.8 }, { t: 'WDC', w: 4.8 }, { t: 'MU', w: 3.0 }, { t: 'SKHY', w: 0.6 }],
  PTF: [{ t: 'SNDK', w: 5.2 }, { t: 'MU', w: 4.9 }, { t: 'WDC', w: 4.5 }, { t: 'KLAC', w: 4.2 }, { t: 'STX', w: 3.9 }],
  WCLD: [{ t: 'FROG', w: 3.1 }, { t: 'DDOG', w: 2.9 }, { t: 'PANW', w: 2.8 }, { t: 'DOCN', w: 2.7 }, { t: 'TENB', w: 2.6 }],
  IGV: [{ t: 'PANW', w: 9.8 }, { t: 'PLTR', w: 8.4 }, { t: 'MSFT', w: 8.3 }, { t: 'CRWD', w: 7.0 }, { t: 'ORCL', w: 5.5 }],
  FDTX: [{ t: 'MRVL', w: 9.7 }, { t: 'MU', w: 9.3 }, { t: 'TSM', w: 6.4 }, { t: 'WDC', w: 4.5 }, { t: 'PANW', w: 4.2 }],
  GTEK: [{ t: 'MRVL', w: 4.0 }, { t: 'CDNS', w: 2.4 }, { t: 'AXON', w: 2.3 }, { t: 'NET', w: 2.1 }, { t: 'DELL', w: 2.1 }],
  ARKK: [{ t: 'TSLA', w: 10.1 }, { t: 'TEM', w: 5.4 }, { t: 'HOOD', w: 4.7 }, { t: 'SHOP', w: 4.6 }, { t: 'CRSP', w: 4.6 }],
  MARS: [{ t: 'SPCX', w: 22.3 }, { t: 'RKLB', w: 9.3 }, { t: 'ASTS', w: 7.3 }, { t: 'GSAT', w: 5.1 }, { t: 'VSAT', w: 5.1 }],
  FRWD: [{ t: 'NVDA', w: 8.9 }, { t: 'AMD', w: 7.7 }, { t: 'STX', w: 7.5 }, { t: 'TSM', w: 5.9 }, { t: 'LRCX', w: 5.5 }],
  BCTK: [{ t: 'TSM', w: 8.5 }, { t: 'SPCX', w: 7.7 }, { t: 'LRCX', w: 7.5 }, { t: 'AVGO', w: 7.2 }, { t: 'GOOG', w: 6.4 }],
  FWD: [{ t: 'AMAT', w: 2.2 }, { t: 'AVGO', w: 2.0 }, { t: 'LRCX', w: 1.8 }, { t: 'ASML', w: 1.8 }, { t: 'GOOGL', w: 1.7 }],
  CBSE: [{ t: 'TENB', w: 3.5 }, { t: 'IBRX', w: 3.3 }, { t: 'KRYS', w: 3.2 }, { t: 'SBUX', w: 3.1 }, { t: 'GRAL', w: 3.0 }],
  FCUS: [{ t: 'INTC', w: 4.3 }, { t: 'MU', w: 4.3 }, { t: 'DELL', w: 4.2 }, { t: 'BE', w: 4.2 }, { t: 'WDC', w: 4.2 }],
  WGMI: [{ t: 'CIFR', w: 17.6 }, { t: 'HUT', w: 10.8 }, { t: 'KEEL', w: 10.2 }, { t: 'IREN', w: 10.2 }, { t: 'MARA', w: 5.1 }],
  CNEQ: [{ t: 'NVDA', w: 13.8 }, { t: 'MSFT', w: 6.4 }, { t: 'GOOG', w: 5.9 }, { t: 'TSM', w: 5.7 }, { t: 'AAPL', w: 5.1 }],
  SGRT: [{ t: 'VRT', w: 12.9 }, { t: 'WDC', w: 10.8 }, { t: 'MU', w: 6.7 }, { t: 'ARW', w: 5.8 }, { t: 'WELL', w: 5.5 }],
  SPMO: [{ t: 'MU', w: 10.6 }, { t: 'NVDA', w: 8.3 }, { t: 'AVGO', w: 6.6 }, { t: 'GOOGL', w: 4.4 }, { t: 'AMD', w: 4.4 }],
  XMMO: [{ t: 'CW', w: 4.2 }, { t: 'FTI', w: 3.4 }, { t: 'ATI', w: 3.3 }, { t: 'STRL', w: 3.0 }, { t: 'WWD', w: 3.0 }],
  POW: [{ t: 'PWR', w: 5.0 }, { t: 'PRY', w: 4.3 }, { t: 'ETN', w: 4.3 }, { t: 'POWL', w: 4.2 }, { t: 'NVT', w: 3.9 }],
  VOLT: [{ t: 'BELFB', w: 7.2 }, { t: 'POWL', w: 6.0 }, { t: 'ETN', w: 5.5 }, { t: 'NEE', w: 5.3 }, { t: 'PWR', w: 5.2 }],
  PBD: [{ t: 'RIVN', w: 1.3 }, { t: 'NFI', w: 1.2 }, { t: 'BLBD', w: 1.1 }],
  PBW: [{ t: 'DAR', w: 2.0 }, { t: 'OPAL', w: 2.0 }, { t: 'RIVN', w: 1.9 }, { t: 'BETA', w: 1.9 }, { t: 'REX', w: 1.9 }],
  IVEP: [{ t: 'NEE', w: 4.3 }, { t: 'SO', w: 4.2 }, { t: 'CEG', w: 4.2 }, { t: 'EQIX', w: 4.2 }, { t: 'VRT', w: 4.1 }],
  AIRR: [{ t: 'STRL', w: 5.2 }, { t: 'CHRW', w: 4.7 }, { t: 'FIX', w: 4.2 }, { t: 'MTZ', w: 4.0 }, { t: 'SAIA', w: 4.0 }],
  PRN: [{ t: 'FIX', w: 4.7 }, { t: 'HWM', w: 4.3 }, { t: 'PWR', w: 4.2 }, { t: 'STRL', w: 4.0 }, { t: 'JBL', w: 3.6 }],
  RSHO: [{ t: 'TKR', w: 8.7 }, { t: 'POWL', w: 7.3 }, { t: 'CGNX', w: 7.2 }, { t: 'CAT', w: 6.9 }, { t: 'AIT', w: 6.0 }],
  IDEF: [{ t: 'RTX', w: 8.8 }, { t: 'LMT', w: 7.1 }, { t: 'BA', w: 5.0 }, { t: 'GD', w: 4.7 }, { t: 'NOC', w: 3.6 }],
  BILT: [{ t: 'UNP', w: 6.0 }, { t: 'AEP', w: 4.5 }, { t: 'AENA', w: 4.4 }, { t: 'TRP', w: 4.1 }, { t: 'TCL', w: 3.6 }],
  BUZZ: [{ t: 'META', w: 3.6 }, { t: 'IBRX', w: 3.5 }, { t: 'AMD', w: 3.5 }, { t: 'SOFI', w: 3.5 }, { t: 'NOW', w: 3.2 }],
  MEME: [{ t: 'BE', w: 7.1 }, { t: 'AAOI', w: 6.7 }, { t: 'NBIS', w: 6.2 }, { t: 'SNDK', w: 6.0 }, { t: 'IREN', w: 5.8 }],
  RKNG: [{ t: 'DELL', w: 4.1 }, { t: 'OPEN', w: 4.0 }, { t: 'VRT', w: 3.9 }, { t: 'AMD', w: 3.8 }, { t: 'GOOGL', w: 3.8 }],
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
  'AI & ML':         { '1W': 0, '1M': -6.5, 'YTD': 41.7, '6M': 36, '1Y': 72.2 },
  'Semiconductors':  { '1W': 1.4, '1M': -11.3, 'YTD': 95.6, '6M': 81.6, '1Y': 131.1 },
  'Broad Tech':      { '1W': -0.3, '1M': -6.6, 'YTD': 22.7, '6M': 17.5, '1Y': 36.6 },
  'Electrification': { '1W': 0.6, '1M': -8.2, 'YTD': 21.9, '6M': 14.7, '1Y': 37.7 },
  'Industrials':     { '1W': 0.4, '1M': -3.4, 'YTD': 17.9, '6M': 8.2, '1Y': 29 },
  'Meme':            { '1W': -1.5, '1M': -14.6, 'YTD': 10.7, '6M': -0.9, '1Y': -4 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, IndexChartByPeriod> = {
  'AI & ML': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 1.8, spyReturn: 0.19, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 102.45, 102.49, 99.1, 99.95], spy: [100, 100.85, 101.28, 100.51, 100.68], top10Return: 0, spyReturn: 0.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 97.06, 97.54, 101.72, 102.5, 96.47, 95.77, 97.12, 95.02, 97.19, 100.01, 100.58, 96.71, 92.63, 95.11, 91.65, 92.72, 94.95, 95.02, 91.94, 92.67], spy: [100, 99.4, 98.16, 98.93, 98.62, 97.18, 97.14, 97.28, 96.58, 98.17, 98.93, 98.93, 98.8, 98.67, 99.53, 99.06, 98.75, 99.59, 100.02, 99.25, 99.43], top10Return: -6.5, spyReturn: -0.6, xLabels: ["Jun 16", "Jun 23", "Jun 30", "Jul 7", "Jul 14"] },
    'YTD': { top10: [100, 102.26, 105.02, 104.9, 105.1, 104.71, 103.06, 105.93, 102.14, 100.73, 103.37, 96.97, 99.79, 110.26, 117.88, 122.69, 125.68, 134.95, 131.4, 145.74, 153.39, 143.86, 155.79, 145.75, 140.57, 141.66], spy: [100, 101.11, 101.43, 101.59, 101.98, 101.76, 100.64, 101.65, 100.47, 97.67, 96.76, 94.6, 96.17, 100.61, 103.93, 104.88, 105.29, 108.25, 107.6, 110.05, 111.02, 108.19, 109.51, 106.9, 109.65, 110.06], top10Return: 41.7, spyReturn: 10.1, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 100.78, 103.3, 93.64, 98.37, 99.96, 99.23, 97.2, 96.82, 99.32, 93.94, 95.78, 103.69, 112.72, 117.46, 119.49, 129.48, 130.02, 134.44, 143.05, 135.79, 139.64, 151.63, 143.3, 134.96, 135.97], spy: [100, 99.8, 100.53, 98.15, 98.68, 99.87, 99.37, 98.69, 96.48, 95.57, 93.44, 95, 98.42, 102.87, 103.42, 104.39, 106.85, 107.07, 108.01, 109.58, 106.84, 107.44, 107.83, 107.34, 108.31, 108.71], top10Return: 36, spyReturn: 8.7, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 103.29, 105.47, 105.55, 106.87, 107.9, 105.85, 107.3, 110.3, 116.28, 120.38, 118.3, 123.71, 123.84, 123.64, 129.06, 130.61, 126.46, 118.49, 116.66, 120.99, 124.8, 118.37, 122.42, 121.95, 125.73, 125.73, 126.88, 130.03, 117.88, 123.94, 125.99, 126.59, 122.58, 121.44, 125.29, 118.37, 120.73, 130.88, 142.25, 148.37, 150.93, 163.69, 164.43, 170.28, 181.76, 171.82, 177.09, 192.57, 181.89, 170.75, 172.16], spy: [100, 100.63, 101.94, 101.02, 101.78, 102.96, 102.83, 103.24, 103.84, 105.78, 106.73, 106.22, 107.49, 106.12, 107.44, 109.67, 109.37, 109.06, 106.54, 107.03, 108.88, 109.41, 108.95, 109.61, 109.96, 110.37, 110.49, 110.27, 111.08, 108.45, 109.04, 110.34, 110.32, 109.04, 106.6, 105.6, 103.25, 104.96, 108.75, 113.66, 114.27, 115.34, 118.06, 118.3, 119.34, 121.07, 118.04, 118.72, 119.14, 118.6, 119.67, 120.12], top10Return: 72.2, spyReturn: 20.1, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Semiconductors': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 4.3, spyReturn: 0.19, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 104.11, 103.27, 97.26, 101.42], spy: [100, 100.85, 101.28, 100.51, 100.68], top10Return: 1.4, spyReturn: 0.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 94.79, 95.77, 102.96, 106.35, 96.49, 95.88, 100.8, 95.31, 98.52, 102.88, 102.88, 95.43, 88.33, 91.22, 85.54, 87.43, 91.01, 90.28, 85.03, 88.66], spy: [100, 99.4, 98.16, 98.93, 98.62, 97.18, 97.14, 97.28, 96.58, 98.17, 98.93, 98.93, 98.8, 98.67, 99.53, 99.06, 98.75, 99.59, 100.02, 99.25, 99.43], top10Return: -11.3, spyReturn: -0.6, xLabels: ["Jun 16", "Jun 23", "Jun 30", "Jul 7", "Jul 14"] },
    'YTD': { top10: [100, 109.74, 115.62, 115.77, 118.59, 121.69, 122.96, 127.42, 127.08, 129.34, 133.94, 128.88, 131.67, 152.47, 163.1, 178.01, 170.04, 184.71, 192.26, 208.88, 213.66, 211.59, 218.36, 205.07, 192.38, 195.63], spy: [100, 101.11, 101.43, 101.59, 101.98, 101.76, 100.64, 101.65, 100.47, 97.67, 96.76, 94.6, 96.17, 100.61, 103.93, 104.88, 105.29, 108.25, 107.6, 110.05, 111.02, 108.19, 109.51, 106.9, 109.65, 110.06], top10Return: 95.6, spyReturn: 10.1, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 107.97, 110.12, 106.3, 111.52, 113.41, 112.8, 110.95, 115.35, 123.92, 123.73, 122.81, 132.76, 148.86, 163.46, 170.97, 171.28, 170.53, 190.43, 192.91, 184.21, 199.67, 206.32, 196.5, 179.05, 181.61], spy: [100, 99.8, 100.53, 98.15, 98.68, 99.87, 99.37, 98.69, 96.48, 95.57, 93.44, 95, 98.42, 102.87, 103.42, 104.39, 106.85, 107.07, 108.01, 109.58, 106.84, 107.44, 107.83, 107.34, 108.31, 108.71], top10Return: 81.6, spyReturn: 8.7, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 102.91, 105.37, 103.94, 104.31, 109.75, 109.06, 109.68, 111.58, 114.53, 120.51, 119.52, 126.57, 125.47, 129.55, 132.97, 138.64, 138.97, 129.31, 138.03, 138.15, 147.5, 139.97, 140.23, 139.88, 150.86, 151.64, 163.98, 167.3, 161.41, 173.72, 174.88, 170.91, 159.45, 156.26, 157.84, 162.28, 170.76, 181.46, 200.28, 220.78, 212.81, 237.44, 229.87, 242, 239.59, 223.71, 242.04, 260.19, 250.16, 219.78, 231.09], spy: [100, 100.63, 101.94, 101.02, 101.78, 102.96, 102.83, 103.24, 103.84, 105.78, 106.73, 106.22, 107.49, 106.12, 107.44, 109.67, 109.37, 109.06, 106.54, 107.03, 108.88, 109.41, 108.95, 109.61, 109.96, 110.37, 110.49, 110.27, 111.08, 108.45, 109.04, 110.34, 110.32, 109.04, 106.6, 105.6, 103.25, 104.96, 108.75, 113.66, 114.27, 115.34, 118.06, 118.3, 119.34, 121.07, 118.04, 118.72, 119.14, 118.6, 119.67, 120.12], top10Return: 131.1, spyReturn: 20.1, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Broad Tech': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 1.3, spyReturn: 0.19, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 101.93, 101.54, 99.08, 99.7], spy: [100, 100.85, 101.28, 100.51, 100.68], top10Return: -0.3, spyReturn: 0.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.37, 97.98, 100.22, 99.92, 96.61, 95.7, 96.11, 95.8, 97.62, 99.52, 99.92, 97.42, 94.19, 95.96, 92.78, 93.17, 94.95, 94.58, 92.41, 92.94], spy: [100, 99.4, 98.16, 98.93, 98.62, 97.18, 97.14, 97.28, 96.58, 98.17, 98.93, 98.93, 98.8, 98.67, 99.53, 99.06, 98.75, 99.59, 100.02, 99.25, 99.43], top10Return: -6.6, spyReturn: -0.6, xLabels: ["Jun 16", "Jun 23", "Jun 30", "Jul 7", "Jul 14"] },
    'YTD': { top10: [100, 103.22, 105.54, 104.32, 103.12, 102.7, 102.42, 105.17, 103.59, 101.13, 101.57, 97.95, 100.58, 108.37, 114.24, 116.49, 120.9, 125.32, 120.48, 130.07, 133.75, 125.89, 132.31, 128.35, 123.05, 122.67], spy: [100, 101.11, 101.43, 101.59, 101.98, 101.76, 100.64, 101.65, 100.47, 97.67, 96.76, 94.6, 96.17, 100.61, 103.93, 104.88, 105.29, 108.25, 107.6, 110.05, 111.02, 108.19, 109.51, 106.9, 109.65, 110.06], top10Return: 22.7, spyReturn: 10.1, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 100.15, 100.78, 92.55, 96.83, 97.86, 99.14, 98.52, 96.59, 98.21, 94.34, 95.7, 100.57, 108.57, 110.9, 112.9, 120.03, 119, 119.81, 126.14, 121.41, 122.09, 126.88, 124.31, 117.85, 117.51], spy: [100, 99.8, 100.53, 98.15, 98.68, 99.87, 99.37, 98.69, 96.48, 95.57, 93.44, 95, 98.42, 102.87, 103.42, 104.39, 106.85, 107.07, 108.01, 109.58, 106.84, 107.44, 107.83, 107.34, 108.31, 108.71], top10Return: 17.5, spyReturn: 8.7, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 101.83, 102.86, 102.13, 102.06, 104.01, 103.09, 104.34, 106.35, 109.94, 113.65, 113.52, 117.63, 119.24, 118.54, 119.95, 121.21, 118.23, 111.05, 110.02, 113.47, 115, 110.84, 114.57, 112.84, 116.43, 118.68, 118.83, 120.69, 112.47, 116.85, 117.64, 121.36, 119.31, 116.53, 117.76, 115.33, 115.64, 120.05, 129, 130.72, 132.48, 137.58, 137.61, 140.07, 147.26, 142.2, 144.06, 148.69, 144.92, 137.46, 136.65], spy: [100, 100.63, 101.94, 101.02, 101.78, 102.96, 102.83, 103.24, 103.84, 105.78, 106.73, 106.22, 107.49, 106.12, 107.44, 109.67, 109.37, 109.06, 106.54, 107.03, 108.88, 109.41, 108.95, 109.61, 109.96, 110.37, 110.49, 110.27, 111.08, 108.45, 109.04, 110.34, 110.32, 109.04, 106.6, 105.6, 103.25, 104.96, 108.75, 113.66, 114.27, 115.34, 118.06, 118.3, 119.34, 121.07, 118.04, 118.72, 119.14, 118.6, 119.67, 120.12], top10Return: 36.6, spyReturn: 20.1, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Electrification': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 2.7, spyReturn: 0.19, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 100.87, 101.05, 98.95, 100.62], spy: [100, 100.85, 101.28, 100.51, 100.68], top10Return: 0.6, spyReturn: 0.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.96, 98.92, 101.19, 102.26, 97.74, 97.3, 97.64, 95.22, 96.42, 98.47, 98.84, 95.99, 93.53, 95.09, 91.27, 91.09, 91.88, 92.05, 90.17, 91.68], spy: [100, 99.4, 98.16, 98.93, 98.62, 97.18, 97.14, 97.28, 96.58, 98.17, 98.93, 98.93, 98.8, 98.67, 99.53, 99.06, 98.75, 99.59, 100.02, 99.25, 99.43], top10Return: -8.2, spyReturn: -0.6, xLabels: ["Jun 16", "Jun 23", "Jun 30", "Jul 7", "Jul 14"] },
    'YTD': { top10: [100, 103.75, 109.27, 110.69, 110.56, 115.01, 115.3, 119.07, 113.9, 112.9, 114.67, 111.37, 113.84, 120.94, 124.44, 129.29, 132.24, 135.92, 128.38, 139.16, 138.03, 128.72, 133.13, 125.71, 122.6, 121.95], spy: [100, 101.11, 101.43, 101.59, 101.98, 101.76, 100.64, 101.65, 100.47, 97.67, 96.76, 94.6, 96.17, 100.61, 103.93, 104.88, 105.29, 108.25, 107.6, 110.05, 111.02, 108.19, 109.51, 106.9, 109.65, 110.06], top10Return: 21.9, spyReturn: 10.1, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 103.81, 105.79, 103.48, 108, 108.95, 110.27, 106.08, 106.04, 107.78, 106.66, 106.27, 112.88, 117.14, 120.97, 125.31, 127.08, 125.16, 126.42, 129.84, 123.77, 122.22, 126.09, 120, 115.24, 114.67], spy: [100, 99.8, 100.53, 98.15, 98.68, 99.87, 99.37, 98.69, 96.48, 95.57, 93.44, 95, 98.42, 102.87, 103.42, 104.39, 106.85, 107.07, 108.01, 109.58, 106.84, 107.44, 107.83, 107.34, 108.31, 108.71], top10Return: 14.7, spyReturn: 8.7, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 102.93, 104.45, 102.99, 103.24, 105, 106.33, 105.54, 106.48, 109.01, 111.36, 111.16, 117.88, 119.68, 120.84, 121.13, 121.49, 121.98, 118.53, 116.85, 119.8, 121.87, 119.58, 122.18, 121.93, 123.63, 126.38, 128.49, 130.67, 127.46, 128.94, 130.76, 132.84, 128.64, 129.43, 132.12, 132.62, 135.14, 140.04, 145.36, 144.94, 149.75, 152.72, 152.58, 151.8, 154.54, 151.08, 147.3, 150.3, 143.2, 138.7, 137.65], spy: [100, 100.63, 101.94, 101.02, 101.78, 102.96, 102.83, 103.24, 103.84, 105.78, 106.73, 106.22, 107.49, 106.12, 107.44, 109.67, 109.37, 109.06, 106.54, 107.03, 108.88, 109.41, 108.95, 109.61, 109.96, 110.37, 110.49, 110.27, 111.08, 108.45, 109.04, 110.34, 110.32, 109.04, 106.6, 105.6, 103.25, 104.96, 108.75, 113.66, 114.27, 115.34, 118.06, 118.3, 119.34, 121.07, 118.04, 118.72, 119.14, 118.6, 119.67, 120.12], top10Return: 37.7, spyReturn: 20.1, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Industrials': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 1.7, spyReturn: 0.19, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 100.71, 100.4, 98.97, 100.4], spy: [100, 100.85, 101.28, 100.51, 100.68], top10Return: 0.4, spyReturn: 0.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 100.05, 99.72, 100.11, 100.91, 99.22, 99.11, 100.22, 98.88, 100, 100.91, 100.91, 99.33, 98.3, 99.12, 96.89, 96.23, 96.88, 96.59, 95.25, 96.59], spy: [100, 99.4, 98.16, 98.93, 98.62, 97.18, 97.14, 97.28, 96.58, 98.17, 98.93, 98.93, 98.8, 98.67, 99.53, 99.06, 98.75, 99.59, 100.02, 99.25, 99.43], top10Return: -3.4, spyReturn: -0.6, xLabels: ["Jun 16", "Jun 23", "Jun 30", "Jul 7", "Jul 14"] },
    'YTD': { top10: [100, 105.38, 111.97, 110.81, 110.38, 115.48, 116.56, 118.09, 117.6, 111.55, 112.32, 109.77, 112.9, 118.8, 119.95, 119.71, 120.25, 122.54, 117.74, 123.88, 123.89, 122.25, 122.91, 121.35, 118.09, 117.95], spy: [100, 101.11, 101.43, 101.59, 101.98, 101.76, 100.64, 101.65, 100.47, 97.67, 96.76, 94.6, 96.17, 100.61, 103.93, 104.88, 105.29, 108.25, 107.6, 110.05, 111.02, 108.19, 109.51, 106.9, 109.65, 110.06], top10Return: 17.9, spyReturn: 10.1, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 102.09, 102.22, 100.77, 104.81, 109.03, 107.84, 104.64, 102.3, 102.99, 100.71, 103.58, 108.19, 109.87, 109.33, 111.25, 112.06, 110.35, 110.8, 113.54, 110.48, 112.44, 113.76, 112.63, 108.28, 108.2], spy: [100, 99.8, 100.53, 98.15, 98.68, 99.87, 99.37, 98.69, 96.48, 95.57, 93.44, 95, 98.42, 102.87, 103.42, 104.39, 106.85, 107.07, 108.01, 109.58, 106.84, 107.44, 107.83, 107.34, 108.31, 108.71], top10Return: 8.2, spyReturn: 8.7, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 100.46, 102.45, 102.1, 102.52, 103.03, 103.08, 103.44, 104, 106.61, 108.54, 108.22, 111.63, 110.19, 110.25, 112.37, 112.6, 110.14, 105.72, 105.59, 106.13, 108.41, 109.37, 111.79, 110.06, 115.21, 119.72, 122.5, 122.46, 121.23, 125.22, 130.59, 129.13, 124.12, 121.51, 122.34, 120.33, 123.82, 128.35, 130.43, 130.12, 132.47, 133.94, 132.16, 132.11, 135.34, 131.64, 132.8, 136.14, 134.19, 129.11, 128.99], spy: [100, 100.63, 101.94, 101.02, 101.78, 102.96, 102.83, 103.24, 103.84, 105.78, 106.73, 106.22, 107.49, 106.12, 107.44, 109.67, 109.37, 109.06, 106.54, 107.03, 108.88, 109.41, 108.95, 109.61, 109.96, 110.37, 110.49, 110.27, 111.08, 108.45, 109.04, 110.34, 110.32, 109.04, 106.6, 105.6, 103.25, 104.96, 108.75, 113.66, 114.27, 115.34, 118.06, 118.3, 119.34, 121.07, 118.04, 118.72, 119.14, 118.6, 119.67, 120.12], top10Return: 29, spyReturn: 20.1, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Meme': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 1.5, spyReturn: 0.19, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 102.37, 102.9, 99.29, 98.55], spy: [100, 100.85, 101.28, 100.51, 100.68], top10Return: -1.5, spyReturn: 0.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 96.07, 96.66, 100.08, 99.95, 95.31, 93.19, 91.33, 90.67, 92.46, 94.72, 95.55, 91.99, 87.23, 88.86, 84.33, 85, 86.96, 87.41, 84.43, 83.76], spy: [100, 99.4, 98.16, 98.93, 98.62, 97.18, 97.14, 97.28, 96.58, 98.17, 98.93, 98.93, 98.8, 98.67, 99.53, 99.06, 98.75, 99.59, 100.02, 99.25, 99.43], top10Return: -14.6, spyReturn: -0.6, xLabels: ["Jun 16", "Jun 23", "Jun 30", "Jul 7", "Jul 14"] },
    'YTD': { top10: [100, 106.79, 108.12, 103.33, 99.33, 99.94, 94.87, 96.34, 96.03, 92.78, 93.4, 89.34, 94.5, 105.46, 114.64, 112.67, 119.38, 123.8, 122.14, 140.71, 136.93, 128.62, 133.59, 120.19, 113.1, 110.72], spy: [100, 101.11, 101.43, 101.59, 101.98, 101.76, 100.64, 101.65, 100.47, 97.67, 96.76, 94.6, 96.17, 100.61, 103.93, 104.88, 105.29, 108.25, 107.6, 110.05, 111.02, 108.19, 109.51, 106.9, 109.65, 110.06], top10Return: 10.7, spyReturn: 10.1, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 99.21, 92.75, 82.28, 84.02, 85.39, 83.85, 84.69, 84.27, 85.37, 78.59, 81.06, 90.04, 101.43, 98.03, 102.85, 112.08, 109.55, 118.71, 125.63, 112.54, 112.66, 118.97, 111.16, 101.61, 99.14], spy: [100, 99.8, 100.53, 98.15, 98.68, 99.87, 99.37, 98.69, 96.48, 95.57, 93.44, 95, 98.42, 102.87, 103.42, 104.39, 106.85, 107.07, 108.01, 109.58, 106.84, 107.44, 107.83, 107.34, 108.31, 108.71], top10Return: -0.9, spyReturn: 8.7, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 103.39, 99.07, 93.6, 91.15, 89.02, 87.77, 83.07, 83.25, 84.29, 87.64, 88.3, 91.49, 86.29, 89.69, 88.09, 91.15, 89.36, 86.68, 85.25, 83.63, 85.68, 80.43, 86.56, 85.76, 89.2, 90.66, 91.54, 90.3, 85.71, 87.47, 90.49, 87.5, 90.54, 95.5, 95.17, 96.18, 95.26, 100.6, 105.62, 109.99, 102.89, 109.83, 115.61, 115.52, 113.81, 110.63, 110.68, 105.01, 101.09, 99.08, 96.02], spy: [100, 100.63, 101.94, 101.02, 101.78, 102.96, 102.83, 103.24, 103.84, 105.78, 106.73, 106.22, 107.49, 106.12, 107.44, 109.67, 109.37, 109.06, 106.54, 107.03, 108.88, 109.41, 108.95, 109.61, 109.96, 110.37, 110.49, 110.27, 111.08, 108.45, 109.04, 110.34, 110.32, 109.04, 106.6, 105.6, 103.25, 104.96, 108.75, 113.66, 114.27, 115.34, 118.06, 118.3, 119.34, 121.07, 118.04, 118.72, 119.14, 118.6, 119.67, 120.12], top10Return: -4, spyReturn: 20.1, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
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
export const SCAN_TIMESTAMP    = '2026-07-14T13:37:46.620Z';
export const SCAN_TIMESTAMP_NY = 'July 14, 2026 at 9:37 AM ET';
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
export const HOLDINGS_COUNT = 1278;
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
  { ticker: 'NVDA', name: `NVIDIA Corp`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 12.76, bestProScore: 6.21, avgProScore: 4.25, price: 204.75, weeklyChange: 0.31 },
  { ticker: 'MU', name: `Micron Technology Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 12.62, bestProScore: 5.06, avgProScore: 4.21, price: 981.21, weeklyChange: 3.42 },
  { ticker: 'AMD', name: `Advanced Micro Devices Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 11.13, bestProScore: 5.22, avgProScore: 3.71, price: 563.20, weeklyChange: 8.85 },
  { ticker: 'AVGO', name: `Broadcom Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 7.09, bestProScore: 3.06, avgProScore: 2.36, price: 388.73, weeklyChange: 0.01 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.67, bestProScore: 2.86, avgProScore: 2.33, price: 425.57, weeklyChange: -2.61 },
  { ticker: 'INTC', name: `INTEL CORPORATION`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.15, bestProScore: 3.06, avgProScore: 2.08, price: 106.83, weeklyChange: -3.10 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 3.93, bestProScore: 2.03, avgProScore: 1.96, price: 233.34, weeklyChange: 0.64 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 3.54, bestProScore: 2.44, avgProScore: 1.77, price: 347.27, weeklyChange: 4.24 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 3.49, bestProScore: 1.86, avgProScore: 1.75, price: 228.58, weeklyChange: -1.35 },
  { ticker: 'WDC', name: `Western Digital Corp`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 3.40, bestProScore: 1.95, avgProScore: 1.70, price: 585.60, weeklyChange: 6.41 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': 0.5, '1M': -8.5, 'YTD': 96.9, '6M': 82.6, '1Y': 166.2 },
  ARTY: { '1W': -1.4, '1M': -9.4, 'YTD': 45.5, '6M': 38.8, '1Y': 69.8 },
  BAI:  { '1W': 0.9, '1M': -10.1, 'YTD': 40.7, '6M': 36.4, '1Y': 61.7 },
  IGPT: { '1W': 0.7, '1M': -6.5, 'YTD': 61.8, '6M': 55, '1Y': 95.5 },
  IVES: { '1W': -0.8, '1M': -2.8, 'YTD': 17.8, '6M': 13.9, '1Y': 37.9 },
  ALAI: { '1W': 0.2, '1M': -3.1, 'YTD': 23.5, '6M': 22, '1Y': 44.5 },
  CHAT: { '1W': -0.6, '1M': -9.4, 'YTD': 51.4, '6M': 46.2, '1Y': 84 },
  AIFD: { '1W': 0, '1M': -3.7, 'YTD': 36.7, '6M': 33.2, '1Y': 67.3 },
  SPRX: { '1W': 0.1, '1M': -14.3, 'YTD': 29.3, '6M': 19.7, '1Y': 68 },
  AOTG: { '1W': 0, '1M': 2.4, 'YTD': 13, '6M': 11.9, '1Y': 26.7 },
  // Semiconductors
  SOXX: { '1W': 1.8, '1M': -9, 'YTD': 89.9, '6M': 72.3, '1Y': 134.6 },
  PSI:  { '1W': 5.1, '1M': -9.5, 'YTD': 101.6, '6M': 77.6, '1Y': 159.5 },
  XSD:  { '1W': 1, '1M': -12.3, 'YTD': 72.3, '6M': 57.9, '1Y': 111.7 },
  DRAM: { '1W': -2.2, '1M': -14.6, 'YTD': 118.6, '6M': 118.6, '1Y': 118.6 },
  // Broad Tech
  PTF:  { '1W': 1.2, '1M': -16.5, 'YTD': 48.5, '6M': 37.5, '1Y': 69.6 },
  WCLD: { '1W': 0.6, '1M': 10.1, 'YTD': -3, '6M': 2.4, '1Y': -3.4 },
  IGV:  { '1W': -1, '1M': -1.2, 'YTD': -13.4, '6M': -9.4, '1Y': -16.1 },
  FDTX: { '1W': 0.4, '1M': -6.4, 'YTD': 32.2, '6M': 31.9, '1Y': 39.1 },
  GTEK: { '1W': -2.1, '1M': -3.3, 'YTD': 42.1, '6M': 35.9, '1Y': 58.9 },
  ARKK: { '1W': -1.9, '1M': -1.3, 'YTD': 2.2, '6M': -5.5, '1Y': 6.7 },
  MARS: { '1W': -4.7, '1M': -20, 'YTD': 10.5, '6M': 10.5, '1Y': 10.5 },
  FRWD: { '1W': 0.8, '1M': -5.6, 'YTD': 29, '6M': 31, '1Y': 29 },
  BCTK: { '1W': 0.1, '1M': -4.9, 'YTD': 21.5, '6M': 21.1, '1Y': 23.6 },
  FWD:  { '1W': 0.2, '1M': -6.4, 'YTD': 30, '6M': 21.2, '1Y': 51.6 },
  CBSE: { '1W': -0.1, '1M': -1.3, 'YTD': 24.9, '6M': 15.3, '1Y': 32.7 },
  FCUS: { '1W': -0.2, '1M': -14.2, 'YTD': 22.8, '6M': 7.2, '1Y': 46.4 },
  WGMI: { '1W': -4.4, '1M': -23.6, 'YTD': 37.7, '6M': 7.7, '1Y': 106.1 },
  CNEQ: { '1W': 0.7, '1M': -2.5, 'YTD': 16.4, '6M': 14.8, '1Y': 35.1 },
  SGRT: { '1W': 2.9, '1M': -7.1, 'YTD': 39.1, '6M': 33.4, '1Y': 73.9 },
  SPMO: { '1W': 1.4, '1M': -3.3, 'YTD': 27.9, '6M': 28.4, '1Y': 35 },
  XMMO: { '1W': 1.1, '1M': -5.4, 'YTD': 17, '6M': 14.4, '1Y': 24.1 },
  // Electrification
  POW:  { '1W': 1.2, '1M': -10.4, 'YTD': 42.4, '6M': 34.7, '1Y': 38.2 },
  VOLT: { '1W': 2, '1M': -2.7, 'YTD': 35.3, '6M': 28.3, '1Y': 51.7 },
  PBD:  { '1W': -2.4, '1M': -10.6, 'YTD': 13.4, '6M': 6.2, '1Y': 38.2 },
  PBW:  { '1W': 0, '1M': -14, 'YTD': 15, '6M': 0.5, '1Y': 56.6 },
  IVEP: { '1W': 2.2, '1M': -3.2, 'YTD': 3.6, '6M': 3.6, '1Y': 3.6 },
  // Industrials
  AIRR: { '1W': 1.2, '1M': -4.8, 'YTD': 26.2, '6M': 13.1, '1Y': 46.6 },
  PRN:  { '1W': 1.7, '1M': -7.6, 'YTD': 32.2, '6M': 20.6, '1Y': 45.1 },
  IDEF: { '1W': -2.5, '1M': -3.6, 'YTD': 2.1, '6M': -11.1, '1Y': 9.7 },
  BILT: { '1W': 1.2, '1M': 2.4, 'YTD': 11.2, '6M': 10.2, '1Y': 14.5 },
  // Meme
  BUZZ: { '1W': -1.4, '1M': -7.6, 'YTD': 8.9, '6M': 1.4, '1Y': 12.5 },
  MEME: { '1W': -0.9, '1M': -23, 'YTD': 29.5, '6M': 2.3, '1Y': -18.2 },
  RKNG: { '1W': -2.1, '1M': -13.2, 'YTD': -6.3, '6M': -6.3, '1Y': -6.3 },
};
// @@END_GENERATED:ETF_RETURNS@@

// @@GENERATED:ETF_DAY_CHANGE@@
// Today's % move per ETF ticker (1D, vs prior close). Refreshed by the 3×/day
// price jobs. Powers the 1D ranking in the theme-ETF side panel.
export const ETF_DAY_CHANGE: Record<string, number> = {
  AIS:  3.38,
  ARTY: 0.55,
  BAI:  3.16,
  IGPT: 1.85,
  IVES: -0.56,
  ALAI: 0.81,
  CHAT: 1.88,
  SPRX: 3.27,
  SOXX: 3.32,
  PSI:  4.87,
  XSD:  3.12,
  DRAM: 6.09,
  PTF:  4.11,
  WCLD: -1.82,
  IGV:  -1.3,
  FDTX: 1.03,
  ARKK: 0.34,
  FRWD: 1.82,
  FWD:  1.8,
  WGMI: 0.84,
  SGRT: 3.6,
  SPMO: 1.97,
  XMMO: 2.09,
  VOLT: 2.42,
  PBW:  3.2,
  IVEP: 2.38,
  AIRR: 2.17,
  PRN:  2.87,
  IDEF: 0.16,
  BUZZ: 0.06,
  MEME: 2.95,
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
  'AI & ML': { etfs: ['AIS', 'AIFD', 'SPRX'], series: { '1W': [100, 103.25, 103.12, 98.96, 100.18], '1M': [100, 96.05, 97.14, 101.62, 103.12, 96.15, 95.44, 97.14, 94.92, 97.18, 100.6, 101.68, 96.31, 90.68, 93.22, 88.64, 89.86, 92.76, 92.68, 88.99, 90.03], 'YTD': [100, 102.79, 107.27, 106.55, 107.85, 110.46, 107.85, 112.09, 107.98, 106.08, 109.74, 102.81, 106.02, 118.6, 125.85, 131, 133.68, 145.87, 141.92, 160.66, 170.53, 159.8, 173.39, 162.33, 153.04, 154.28], '6M': [100, 101.25, 104.1, 94.84, 101.17, 102.43, 102.76, 99.85, 100, 103.39, 98.4, 99.63, 109.48, 117.54, 123.07, 124.66, 134.55, 138.89, 144.85, 151.72, 147.62, 153.14, 166.99, 157.08, 144.06, 145.15], '1Y': [100, 104.1, 106.56, 107.6, 109.63, 109.96, 107.99, 109.48, 113.26, 120.62, 126.06, 123.47, 130.52, 131.45, 130.15, 136.68, 139.13, 134.83, 124.4, 121.95, 128.86, 133.42, 124.31, 131.21, 130.53, 136.09, 137.28, 139.27, 143.07, 130.23, 138.95, 140.74, 142.6, 137.21, 136.23, 142.32, 134.9, 136.77, 150.49, 161.67, 169.49, 171.76, 185.64, 191.39, 200.04, 210.85, 203.25, 211.63, 231.33, 217.56, 198.71, 200.53] }, returns: { '1W': 0.2, '1M': -10, 'YTD': 54.3, '6M': 45.2, '1Y': 100.5 } },
  'Semiconductors': { etfs: ['DRAM', 'PSI', 'XSD'], series: { '1W': [100, 104.31, 103.22, 96.85, 101.3], '1M': [100, 95.02, 95.88, 103.37, 107.06, 96.65, 95.94, 101.24, 95.79, 98.78, 103.18, 103.18, 95.43, 87.74, 90.79, 84.79, 86.76, 90.49, 89.54, 84, 87.87], 'YTD': [100, 110.95, 116.25, 116.39, 119.09, 123.21, 124.33, 129.16, 131.64, 135.9, 140.92, 135.44, 137.96, 159.75, 171.25, 186.94, 175.57, 189.16, 201.36, 216.08, 218.17, 217.15, 220.37, 208.13, 195.44, 197.52], '6M': [100, 108.94, 110.55, 108.5, 113.39, 115.12, 115.02, 114.01, 120.64, 131.06, 131.95, 129.64, 138.19, 156.73, 171.59, 181.18, 176.13, 176.3, 199.94, 200.06, 191.4, 206.34, 209.31, 200.31, 183.32, 184.7], '1Y': [100, 103.45, 106.9, 105.73, 105.95, 112.29, 111.44, 112.7, 114.76, 117.47, 123.8, 122.59, 129.33, 128.34, 132.68, 135.73, 142.7, 144.01, 133.65, 145.4, 143.61, 153.9, 145.88, 145.43, 144.82, 156.73, 156.82, 170.97, 173.7, 169.99, 183.57, 184.03, 179.1, 166.43, 163.21, 163.95, 171.41, 181.25, 189.09, 210.21, 231.27, 220.08, 245.45, 236.97, 249.21, 241.65, 224.49, 241.21, 257.37, 249.56, 217.63, 229.92] }, returns: { '1W': 1.3, '1M': -12.1, 'YTD': 97.5, '6M': 84.7, '1Y': 129.9 } },
  'Broad Tech': { etfs: ['WGMI', 'SGRT', 'PTF'], series: { '1W': [100, 104.12, 102.26, 97.06, 99.9], '1M': [100, 98.21, 98.33, 101.72, 102.9, 98.36, 95.57, 97.08, 94.7, 95.47, 97.27, 97.27, 91.23, 83.45, 86.3, 81.36, 84.23, 87.69, 86.16, 81.83, 84.26], 'YTD': [100, 107.37, 116.36, 112.28, 112.2, 114.68, 111.64, 117.87, 113.55, 107.02, 111.73, 105.25, 108, 124.36, 132.2, 134.41, 137.73, 150.35, 142.42, 165.16, 168.59, 158.45, 172.38, 160.16, 137.02, 141.75], '6M': [100, 100.64, 103.27, 90.81, 98.17, 100.46, 101.53, 97.88, 95.54, 99.79, 93.98, 96.75, 108.07, 116.87, 120.6, 120.68, 133.07, 132.1, 136.67, 145.06, 135.01, 143.42, 154, 143.08, 121.75, 126.19], '1Y': [100, 103.88, 103.34, 103.22, 103.44, 109.27, 109.22, 113, 114.79, 128.64, 135.82, 138.05, 150.13, 162.22, 156.84, 156.48, 161.22, 151.92, 132.68, 132.73, 142.81, 142.8, 129.41, 137.89, 132.96, 141.87, 149.28, 148.44, 153.38, 135.27, 145.4, 140.62, 146.23, 142.04, 138.85, 142.9, 141.73, 143.72, 156.48, 170.95, 175.23, 177.94, 196.02, 192.06, 203.1, 215.08, 196.69, 211.56, 223.13, 211.06, 178.76, 183.21] }, returns: { '1W': -0.1, '1M': -15.7, 'YTD': 41.8, '6M': 26.2, '1Y': 83.2 } },
  'Electrification': { etfs: ['VOLT', 'POW', 'PBW'], series: { '1W': [100, 101.33, 101.39, 98.41, 101.1], '1M': [100, 98.87, 98.97, 101.34, 102.41, 97.74, 96.97, 97.71, 94.86, 97.22, 99.6, 99.6, 96.46, 93.15, 94.43, 90.16, 89.94, 91.14, 91.2, 88.56, 90.96], 'YTD': [100, 104.13, 111.62, 111.87, 112.15, 118.01, 117.77, 122.72, 116.91, 114.69, 117.34, 114.37, 116.18, 126.22, 131.1, 137.06, 142.29, 146.34, 134.86, 149.04, 148.05, 138.91, 145.74, 136.54, 129.7, 130.9], '6M': [100, 104.66, 106.23, 102.42, 108.59, 110.28, 111.08, 105.65, 106.05, 108.57, 105.82, 107.51, 115.65, 120.93, 127.58, 132.07, 135.5, 132.06, 133.73, 136.03, 127.34, 129.41, 136.27, 129.52, 120.03, 121.18], '1Y': [100, 103.27, 104.8, 102.92, 103.06, 104.38, 105.75, 105.23, 105.74, 108.67, 111.69, 112.4, 119.25, 121.82, 123.15, 123.18, 124.28, 125.1, 119.27, 119.33, 122.51, 126.51, 123.34, 127.01, 126.1, 127.61, 131.02, 133.72, 135.93, 130.65, 132.59, 135.78, 139.64, 136.28, 137.94, 140.76, 139.76, 144.1, 150.52, 155.87, 155.19, 160.86, 164.18, 164.16, 163.42, 167.03, 161, 160.48, 165.44, 156.84, 148.18, 148.81] }, returns: { '1W': 1.1, '1M': -9, 'YTD': 30.9, '6M': 21.2, '1Y': 48.8 } },
  'Industrials': { etfs: ['PRN', 'BILT', 'IDEF'], series: { '1W': [100, 100.47, 100.25, 98.93, 100.12], '1M': [100, 100.1, 99.91, 100.01, 100.48, 99.18, 98.79, 99.64, 98.67, 99.69, 100.48, 100.48, 99.36, 98.87, 99.69, 97.77, 96.97, 97.37, 97.18, 95.95, 97.05], 'YTD': [100, 104.75, 110.8, 109.65, 109.03, 113.32, 115.12, 117.12, 116.8, 111.69, 112.07, 109.4, 112.27, 117.09, 117.93, 117.01, 117.86, 119.54, 115.45, 121.3, 120.51, 119.47, 119.51, 117.83, 115.79, 115.2], '6M': [100, 101.34, 102.08, 99.88, 104.11, 108.32, 107.88, 105.04, 103.19, 103.53, 101.15, 103.8, 107.68, 109.07, 108.06, 109.67, 110.02, 108.31, 109.73, 112.12, 108.42, 110.59, 111.19, 110.18, 107.03, 106.56], '1Y': [100, 100.89, 101.89, 102.18, 101.97, 101.72, 101.39, 101.86, 102.43, 105.34, 106.79, 106.63, 110.12, 108.94, 108.56, 110.48, 110.84, 108.03, 104.6, 103.16, 103.08, 105.48, 106.3, 108.98, 107.51, 112.42, 116.41, 118.25, 118.92, 116.93, 120.76, 126.09, 124.95, 120.78, 118.96, 119.32, 117.48, 120.63, 123.72, 125.39, 124.6, 126.48, 127.53, 125.89, 126.87, 129.56, 125.1, 126.07, 129.02, 127.09, 123.74, 123.11] }, returns: { '1W': 0.1, '1M': -3, 'YTD': 15.2, '6M': 6.6, '1Y': 23.1 } },
  'Meme': { etfs: ['BUZZ', 'RKNG', 'MEME'], series: { '1W': [100, 102.37, 102.9, 99.29, 98.55], '1M': [100, 96.07, 96.66, 100.08, 99.95, 95.31, 93.19, 91.33, 90.67, 92.46, 94.72, 95.55, 91.99, 87.23, 88.86, 84.33, 85, 86.96, 87.41, 84.43, 83.76], 'YTD': [100, 106.79, 108.12, 103.33, 99.33, 99.94, 94.87, 96.34, 96.03, 92.78, 93.4, 89.34, 94.5, 105.46, 114.64, 112.67, 119.38, 123.8, 122.14, 140.71, 136.93, 128.62, 133.59, 120.19, 113.1, 110.72], '6M': [100, 99.21, 92.75, 82.28, 84.02, 85.39, 83.85, 84.69, 84.27, 85.37, 78.59, 81.06, 90.04, 101.43, 98.03, 102.85, 112.08, 109.55, 118.71, 125.63, 112.54, 112.66, 118.97, 111.16, 101.61, 99.14], '1Y': [100, 103.39, 99.07, 93.6, 91.15, 89.02, 87.77, 83.07, 83.25, 84.29, 87.64, 88.3, 91.49, 86.29, 89.69, 88.09, 91.15, 89.36, 86.68, 85.25, 83.63, 85.68, 80.43, 86.56, 85.76, 89.2, 90.66, 91.54, 90.3, 85.71, 87.47, 90.49, 87.5, 90.54, 95.5, 95.17, 96.18, 95.26, 100.6, 105.62, 109.99, 102.89, 109.83, 115.61, 115.52, 113.81, 110.63, 110.68, 105.01, 101.09, 99.08, 96.02] }, returns: { '1W': -1.5, '1M': -16.2, 'YTD': 10.7, '6M': -0.9, '1Y': -4 } },
};
// @@END_GENERATED:THEME_REPRESENTATIVES@@

// @@GENERATED:THEME_UNIVERSE@@
export const THEME_UNIVERSE: Partial<Record<Theme, ThemeUniverseFund[]>> = {
  'AI & ML': [
    { t: 'AIS', chosen: true, anchor: true, score: 124.4, ret6: 82.6, ret1: 166.2, corr: 0.79, reason: 'anchor', series: { '1W': [100, 104.42, 103.45, 97.27, 100.54], '1M': [100, 96.05, 98.31, 105.28, 108.77, 99.15, 98.76, 103.33, 98.2, 101.17, 104.96, 104.96, 97.8, 91.33, 94.82, 89.04, 90.99, 95.02, 94.13, 88.51, 91.49], 'YTD': [100, 105.32, 110.67, 111.78, 115.2, 117.29, 116.94, 124.33, 117.39, 113.93, 119.54, 111.33, 114.72, 133.36, 142.07, 154.33, 160.89, 179.88, 173.05, 200.56, 212.47, 201.85, 226.56, 211.33, 191.61, 196.88], '6M': [100, 106.06, 107.32, 100.39, 108.37, 110.51, 111.88, 105.87, 105.65, 110.85, 103.24, 106.38, 120.33, 131.18, 142.57, 149.23, 166.07, 166.51, 175.33, 188.19, 173.9, 188.61, 217.06, 201.89, 177.68, 182.57] } },
    { t: 'IGPT', chosen: false, anchor: false, score: 75.3, ret6: 55, ret1: 95.5, corr: 0.93, reason: 'correlated', series: { '1W': [100, 103.34, 103.56, 98.92, 100.72], '1M': [100, 97.08, 97.89, 103.33, 104.99, 97.6, 96.97, 99.97, 95.99, 98.39, 101.1, 101.1, 97.25, 92.52, 95.31, 91.89, 92.8, 95.9, 96.11, 91.8, 93.47], 'YTD': [100, 103.85, 105.3, 107.7, 110.17, 106.52, 105.95, 109.32, 105.63, 102.22, 105.3, 97.48, 99.92, 110.95, 118.83, 128.06, 134.35, 150.55, 145.05, 164.05, 169.04, 162.91, 178.91, 166.2, 159.11, 161.85], '6M': [100, 103.95, 106.76, 97.28, 100.69, 102.77, 102.71, 99.69, 97.91, 100.85, 93.36, 95.7, 103.61, 114.09, 121.32, 127.62, 146.48, 141.26, 147.88, 160.57, 146.38, 156.64, 174.12, 163.17, 152.39, 155.02] } },
    { t: 'CHAT', chosen: false, anchor: false, score: 65.1, ret6: 46.2, ret1: 84, corr: 0.92, reason: 'correlated', series: { '1W': [100, 102.87, 102.15, 97.57, 99.37], '1M': [100, 97.09, 98.3, 103.85, 105.6, 97.79, 97.17, 99.22, 94.99, 96.83, 100.13, 100.13, 94.9, 90.1, 92.34, 88.89, 91.13, 93.75, 93.09, 88.92, 90.55], 'YTD': [100, 102.34, 104.65, 104.82, 105.87, 106.33, 108.94, 111.36, 106, 107.24, 110.62, 104.14, 107.39, 120.42, 128.63, 133.23, 136.41, 142.88, 141.74, 159.09, 170, 156.77, 173.58, 158.77, 148.58, 151.36], '6M': [100, 101.36, 103.88, 95.51, 102.13, 108.67, 104.7, 101.74, 103.62, 106.88, 100.62, 103.77, 113.73, 123.06, 129.78, 129.96, 141.23, 140.1, 147.23, 160.96, 148.56, 152.64, 170.55, 156.39, 143.56, 146.25] } },
    { t: 'ARTY', chosen: false, anchor: false, score: 54.3, ret6: 38.8, ret1: 69.8, corr: 0.92, reason: 'correlated', series: { '1W': [100, 102.31, 102, 97.99, 98.6], '1M': [100, 97.01, 97.82, 101.98, 102.65, 96.19, 95.58, 96.63, 93.42, 95.79, 98.44, 98.44, 94.53, 91.88, 93.64, 90.38, 91.87, 93.99, 93.71, 90.02, 90.58], 'YTD': [100, 102.74, 107.12, 108.57, 107.91, 107.37, 106.27, 108.8, 102.49, 100.21, 104.05, 96.91, 99.07, 112.2, 122.42, 127.85, 131.71, 138.9, 132.4, 147.55, 162.72, 150.46, 163.76, 150.02, 145.14, 145.46], '6M': [100, 102.4, 105.7, 94.65, 100.59, 101.51, 101.03, 96.61, 95.62, 99.29, 92.47, 94.53, 103.55, 116.16, 122.96, 124.42, 135.43, 130.32, 136.22, 147.87, 139.89, 145.12, 157.3, 146.78, 138.5, 138.81] } },
    { t: 'AIFD', chosen: true, anchor: false, score: 50.3, ret6: 33.2, ret1: 67.3, corr: 0.51, reason: 'diversifier', series: { '1W': [100, 101.24, 103.28, 102.71, 99.95], '1M': [100, 97.03, 97.27, 99.81, 99.77, 94.83, 94.83, 93.84, 95.33, 93.83, 96.99, 100.23, 97.17, 93.33, 95.73, 92.93, 92.93, 94.09, 95.98, 95.46, 92.89], 'YTD': [100, 100.69, 101.26, 102.21, 103.1, 104.48, 104.79, 107.6, 104.39, 106.76, 106.71, 102.09, 105.97, 112.77, 121.1, 124.57, 127.59, 135.57, 131.06, 137.67, 149.97, 136, 143.14, 138.08, 140.87, 136.7], '6M': [100, 97.63, 102.04, 96.19, 102.79, 102.83, 102.68, 101.72, 104.02, 103.98, 104.01, 102.38, 109.48, 116.11, 119.34, 121.08, 127.14, 134.36, 132.01, 135.07, 145.25, 137.78, 143.12, 134.54, 137.26, 133.19] } },
    { t: 'BAI', chosen: false, anchor: false, score: 49, ret6: 36.4, ret1: 61.7, corr: 0.94, reason: 'correlated', series: { '1W': [100, 103.49, 102.76, 97.82, 100.9], '1M': [100, 95.95, 96.68, 102.11, 104.09, 95.83, 95.37, 98.73, 94.28, 97.56, 101.19, 101.19, 94.99, 90.21, 92.51, 87.45, 89.12, 92.23, 91.57, 87.18, 89.92], 'YTD': [100, 100.96, 104.8, 103.78, 104.11, 106.13, 104.68, 108.35, 102.85, 100.18, 105.05, 99.22, 102.76, 115.89, 122.43, 127.45, 131.44, 140.45, 135.14, 149.49, 151.62, 146.67, 159.76, 147.51, 136.82, 140.69], '6M': [100, 100.38, 102.91, 94.47, 100.09, 102.36, 101.89, 98.28, 97.09, 101.8, 96.16, 99.59, 110.54, 118.8, 124.39, 126.98, 136.73, 136.18, 139.14, 145.11, 132.57, 142.43, 157.83, 147.93, 132.6, 136.35] } },
    { t: 'SPRX', chosen: true, anchor: false, score: 43.9, ret6: 19.7, ret1: 68, corr: 0.79, reason: 'diversifier', series: { '1W': [100, 104.1, 102.63, 96.89, 100.05], '1M': [100, 95.08, 95.85, 99.78, 100.83, 94.47, 92.74, 94.26, 91.23, 96.54, 99.86, 99.86, 93.95, 87.39, 89.1, 83.96, 85.67, 89.18, 87.93, 83.01, 85.71], 'YTD': [100, 102.37, 109.87, 105.67, 105.25, 109.61, 101.82, 104.33, 102.17, 97.55, 102.97, 95, 97.36, 109.67, 114.38, 114.09, 112.56, 122.17, 121.64, 143.74, 149.15, 141.56, 150.47, 137.59, 126.63, 129.26], '6M': [100, 100.07, 102.94, 87.93, 92.36, 93.95, 93.71, 91.95, 90.32, 95.34, 87.96, 90.14, 98.63, 105.32, 107.31, 103.68, 110.43, 115.8, 127.22, 131.89, 123.71, 133.04, 140.79, 134.8, 117.24, 119.68] } },
    { t: 'ALAI', chosen: false, anchor: false, score: 33.3, ret6: 22, ret1: 44.5, corr: 0.83, reason: 'correlated', series: { '1W': [100, 101, 101.87, 99.36, 100.17], '1M': [100, 99.15, 98.7, 101.59, 100.26, 97.18, 95.87, 96.03, 95.65, 97.57, 99.17, 99.17, 97.85, 94.68, 97.67, 96.05, 96.77, 97.74, 98.59, 96.15, 96.94], 'YTD': [100, 101.24, 102.19, 100.8, 99.96, 98.16, 96.32, 97.78, 94.68, 93.71, 96.18, 89.7, 93.33, 102.16, 107.7, 110.27, 112.01, 116.89, 115.31, 123.57, 126.2, 119.16, 129.47, 121.91, 122.4, 123.54], '6M': [100, 99.15, 100.44, 92.12, 93.63, 95.25, 93.59, 93.74, 92.56, 94.99, 88.59, 92.18, 98.77, 106.59, 108.62, 109.66, 114.36, 116.8, 119.17, 124.97, 118.35, 118.65, 126.2, 122.81, 120.9, 122.02] } },
    { t: 'IVES', chosen: false, anchor: false, score: 25.9, ret6: 13.9, ret1: 37.9, corr: 0.74, reason: 'diverse', series: { '1W': [100, 101.57, 100.96, 99.73, 99.17], '1M': [100, 98.51, 97.55, 99.27, 98.04, 95.67, 94.36, 93.66, 94.44, 97.44, 99.45, 99.45, 98.96, 97.31, 99.71, 98.04, 98.04, 99.58, 98.98, 97.78, 97.23], 'YTD': [100, 102.18, 104.87, 103.7, 102.44, 98.8, 96.58, 96.71, 95.35, 95.16, 94.88, 89.62, 91.11, 96.17, 103.42, 105.76, 107.5, 113.76, 113.13, 119.71, 126, 116.93, 120.31, 114.46, 118.82, 117.84], '6M': [100, 99.91, 101.28, 89.42, 92.65, 92.91, 91.04, 92.82, 91.96, 91.68, 86.61, 88.05, 90.25, 100.03, 102.02, 102.72, 111.19, 111.16, 113.88, 122.71, 114.25, 113.05, 114.83, 114.12, 114.83, 113.88] } },
    { t: 'AOTG', chosen: false, anchor: false, score: 19.3, ret6: 11.9, ret1: 26.7, corr: 0.82, reason: 'correlated', series: { '1W': [100, 100.18, 102.28, 102.78, 100.03], '1M': [100, 97.61, 97.01, 100.18, 100.02, 96.03, 96.03, 95.57, 96.7, 96.74, 98.79, 101.31, 99.68, 97.59, 100.28, 97.89, 97.89, 98.06, 100.12, 100.61, 97.92], 'YTD': [100, 100.91, 99.48, 99.99, 96.99, 92.4, 88.32, 90.71, 90.45, 90.35, 88.37, 84.2, 86.22, 89.01, 97.84, 101.33, 102.36, 108.46, 105.45, 111.95, 116.75, 106.32, 111.99, 111.67, 115.76, 113.04], '6M': [100, 96.93, 99.73, 88.46, 90.42, 88.86, 89.05, 89.57, 89.47, 87.51, 86.38, 85.05, 88.02, 95.87, 96.25, 99.54, 105.78, 107.74, 106.37, 113.16, 115.02, 108.4, 114.52, 110.59, 114.63, 111.94] } },
  ],
  'Semiconductors': [
    { t: 'DRAM', chosen: true, anchor: true, score: 118.6, ret6: 118.6, ret1: 118.6, corr: 0.39, reason: 'anchor', series: { '1W': [100, 103.74, 101.61, 92.36, 97.83], '1M': [100, 95.85, 98.42, 107.94, 113.58, 97.4, 98.4, 108.19, 101.14, 101.22, 103.91, 103.91, 92.67, 85.31, 91.12, 85.25, 87.29, 90.56, 88.7, 80.62, 85.4], 'YTD': [100, 116.97, 120.86, 124.17, 126.33, 130.98, 134.47, 141.68, 166.75, 190.2, 196.47, 184.08, 185.55, 217.98, 227.67, 250.61, 200.97, 206.66, 256.02, 251.98, 249.35, 258.93, 237.25, 233.29, 231.84, 218.64], '6M': [100, 116.97, 120.86, 124.17, 126.33, 130.98, 134.47, 141.68, 166.75, 190.2, 196.47, 184.08, 185.55, 217.98, 227.67, 250.61, 200.97, 206.66, 256.02, 251.98, 249.35, 258.93, 237.25, 233.29, 231.84, 218.64] } },
    { t: 'PSI', chosen: true, anchor: false, score: 118.5, ret6: 77.6, ret1: 159.5, corr: 0.87, reason: 'diversifier', series: { '1W': [100, 105.38, 105.35, 100.23, 105.07], '1M': [100, 94.95, 95.38, 101.5, 105.04, 97.06, 96.1, 100.99, 95.77, 101.36, 106.96, 106.96, 99.32, 89.98, 90.87, 84.48, 86.18, 90.81, 90.79, 86.38, 90.55], 'YTD': [100, 109.1, 117.35, 116.38, 120.87, 126.2, 126.67, 132.8, 122.77, 116.26, 123.27, 120.15, 123.67, 142.85, 154.36, 165.76, 171.41, 189.5, 181.38, 203.02, 204.81, 206.7, 226.01, 213.26, 188.11, 201.62], '6M': [100, 106.31, 108.54, 102.75, 111.41, 112.64, 110.55, 105.28, 102.38, 108.55, 105.81, 108.91, 123.33, 134.05, 150.6, 150.89, 169.49, 165.63, 171.69, 173.49, 161.95, 187.48, 205.97, 198.75, 165.65, 177.55] } },
    { t: 'SOXX', chosen: false, anchor: false, score: 103.4, ret6: 72.3, ret1: 134.6, corr: 0.94, reason: 'correlated', series: { '1W': [100, 103.5, 103.44, 98.5, 101.78], '1M': [100, 94.08, 95.43, 101.75, 104.23, 96.01, 95.71, 99.48, 93.87, 97.76, 101.96, 101.96, 95.43, 90.11, 92.53, 87.79, 89.43, 92.56, 92.5, 88.09, 91.02], 'YTD': [100, 106.12, 113.72, 113.92, 117.11, 117.14, 118.85, 122.2, 113.41, 109.64, 112.97, 109.2, 112.77, 130.61, 138.65, 151.22, 153.43, 171.34, 164.95, 187.28, 200.14, 194.9, 212.34, 195.9, 183.19, 189.94], '6M': [100, 105.05, 108.81, 99.68, 105.91, 108.29, 106.14, 101.77, 99.48, 102.5, 99.08, 102.32, 116.48, 125.25, 139.08, 140.33, 156.76, 153.21, 161.9, 171.46, 162.63, 179.65, 197.35, 185.1, 166.22, 172.34] } },
    { t: 'XSD', chosen: true, anchor: false, score: 84.8, ret6: 57.9, ret1: 111.7, corr: 0.87, reason: 'diversifier', series: { '1W': [100, 103.8, 102.69, 97.95, 101], '1M': [100, 94.27, 93.85, 100.66, 102.55, 95.5, 93.33, 94.54, 90.47, 93.75, 98.67, 98.67, 94.29, 87.94, 90.37, 84.65, 86.8, 90.09, 89.13, 85.01, 87.66], 'YTD': [100, 106.78, 110.53, 108.61, 110.06, 112.46, 111.85, 112.99, 105.4, 101.25, 103.03, 102.09, 104.67, 118.42, 131.73, 144.46, 154.33, 171.33, 166.69, 193.23, 200.35, 185.81, 197.85, 177.83, 166.38, 172.3], '6M': [100, 103.54, 102.26, 98.58, 102.42, 101.73, 100.03, 95.07, 92.79, 94.42, 93.56, 95.92, 105.69, 118.17, 136.5, 142.04, 157.92, 156.61, 172.1, 174.7, 162.91, 172.62, 184.72, 168.88, 152.48, 157.9] } },
  ],
  'Broad Tech': [
    { t: 'WGMI', chosen: true, anchor: true, score: 56.9, ret6: 7.7, ret1: 106.1, corr: 0.73, reason: 'anchor', series: { '1W': [100, 103.73, 100.67, 94.81, 95.61], '1M': [100, 100.36, 99.61, 104.48, 104.3, 102.85, 96.74, 94.09, 95.25, 92.31, 91.39, 91.39, 85.16, 77.08, 81.84, 76.26, 79.89, 82.86, 80.42, 75.74, 76.38], 'YTD': [100, 116.28, 133.42, 121.71, 116.12, 114.53, 104.63, 110.63, 107.66, 99.19, 102.17, 96.89, 93.44, 116.7, 129.16, 128.19, 131.96, 150.85, 143.32, 179.78, 181.24, 167.02, 188.4, 171.75, 137.52, 137.73], '6M': [100, 95.89, 99.59, 71.99, 81.94, 79.37, 81.49, 80.2, 77.56, 79.89, 75.77, 73.07, 86.21, 100.27, 101.39, 98.47, 118.55, 116.9, 126.54, 139.13, 125.85, 134.8, 147.08, 130.16, 107.54, 107.7] } },
    { t: 'SGRT', chosen: true, anchor: false, score: 53.7, ret6: 33.4, ret1: 73.9, corr: 0.08, reason: 'diversifier', series: { '1W': [100, 103.76, 102.99, 99.2, 102.93], '1M': [100, 97.73, 98.26, 99.84, 102.67, 96.95, 96.85, 99.92, 96.18, 97.33, 100.19, 100.19, 95.32, 89.9, 91.99, 88.32, 90.28, 93.67, 92.97, 89.55, 92.92], 'YTD': [100, 101.94, 106.48, 106.44, 106.04, 110.88, 111.58, 117.91, 113.07, 108.38, 111.52, 105.42, 110.6, 124.15, 126.75, 129.59, 132.07, 142.06, 134.27, 146.46, 148.9, 141.18, 149.42, 143.94, 132.19, 139.06], '6M': [100, 103.85, 103.72, 99.19, 105.33, 110.43, 111.62, 105.44, 103.93, 106.94, 101.09, 106.06, 118.14, 121.51, 125.42, 125.61, 134.36, 134.59, 134.04, 139.76, 131.69, 138.31, 147.35, 139.69, 126.76, 133.36] } },
    { t: 'PTF', chosen: true, anchor: false, score: 53.5, ret6: 37.5, ret1: 69.6, corr: 0.73, reason: 'diversifier', series: { '1W': [100, 104.86, 103.12, 97.18, 101.17], '1M': [100, 96.54, 97.13, 100.85, 101.73, 95.28, 93.12, 97.23, 92.67, 96.76, 100.22, 100.22, 93.21, 83.38, 85.07, 79.49, 82.52, 86.53, 85.1, 80.19, 83.49], 'YTD': [100, 103.88, 109.18, 108.69, 114.43, 118.62, 118.71, 125.08, 119.92, 113.48, 121.49, 113.43, 119.96, 132.24, 140.7, 145.46, 149.16, 158.14, 149.67, 169.24, 175.64, 167.15, 179.33, 164.78, 141.35, 148.45], '6M': [100, 102.19, 106.5, 101.26, 107.23, 111.58, 111.47, 107.99, 105.12, 112.55, 105.07, 111.13, 119.87, 128.84, 134.99, 137.97, 146.29, 144.82, 149.44, 156.3, 147.49, 157.14, 167.57, 159.39, 130.94, 137.52] } },
    { t: 'GTEK', chosen: false, anchor: false, score: 47.4, ret6: 35.9, ret1: 58.9, corr: 0.54, reason: 'diverse', series: { '1W': [100, 99.85, 102.59, 102.38, 97.9], '1M': [100, 97.38, 97.68, 101.27, 102.24, 98.23, 98.23, 97.76, 98.15, 97.39, 99.62, 102.7, 100.85, 97.34, 98.67, 94.72, 94.72, 94.58, 97.17, 96.98, 92.73], 'YTD': [100, 103.18, 104.45, 106.43, 104.7, 105.5, 106.42, 110.93, 105.5, 105.27, 105.59, 102.59, 104.22, 111.98, 123.61, 127.5, 132.68, 139.31, 132.74, 146.5, 153.45, 139.7, 149.66, 149.22, 151.17, 142.08], '6M': [100, 98.73, 104.7, 96.16, 102.58, 101.94, 105.67, 100.91, 100.7, 101, 102.08, 100.07, 106.01, 115.37, 119.33, 125.22, 129.54, 132.16, 130.89, 142.32, 146.68, 140.37, 148.42, 142.73, 144.6, 135.9] } },
    { t: 'FWD', chosen: false, anchor: false, score: 36.4, ret6: 21.2, ret1: 51.6, corr: 0.88, reason: 'correlated', series: { '1W': [100, 102.33, 101.99, 98.46, 100.24], '1M': [100, 98.47, 98.18, 101.43, 102.55, 97.54, 97.26, 99.79, 97, 99.41, 102.05, 102.05, 98.46, 94.77, 96.56, 92.98, 93.33, 95.5, 95.19, 91.89, 93.55], 'YTD': [100, 105.07, 108.98, 108.75, 108.28, 109.29, 110.41, 113.82, 110.28, 105.59, 107.03, 102.93, 105.86, 115.42, 118.83, 121.42, 122.75, 128.34, 124.69, 133.99, 138.47, 133.46, 140.99, 134.84, 129.25, 130.05], '6M': [100, 101.7, 103.03, 96.22, 101.04, 103.96, 104.62, 100.33, 98.38, 99.72, 95.9, 98.63, 106.1, 111, 113.52, 114.59, 119.99, 118.7, 122.12, 126.91, 120.39, 125.25, 132.82, 128.75, 120.43, 121.17] } },
    { t: 'FDTX', chosen: false, anchor: false, score: 35.5, ret6: 31.9, ret1: 39.1, corr: 0.8, reason: 'correlated', series: { '1W': [100, 102.54, 102.11, 99.07, 100.37], '1M': [100, 97.43, 97.55, 100.67, 101.04, 96.24, 95.6, 97.55, 94.93, 98.43, 100.6, 100.6, 97.72, 93.61, 95.5, 92.58, 93.23, 95.6, 95.19, 92.35, 93.57], 'YTD': [100, 101.9, 100.24, 101.79, 99.59, 95.99, 95.3, 96.9, 95.58, 93.76, 95.35, 89.98, 92.71, 99.58, 107.76, 112.28, 115.68, 120.93, 118.44, 129.55, 141.92, 133.4, 142.21, 134.1, 130.78, 132.18], '6M': [100, 99.82, 100.86, 91.27, 93.5, 95.45, 94.81, 95.31, 93.54, 95.13, 89.77, 92.49, 97.23, 106.9, 111.95, 114.34, 121.45, 120.79, 124.57, 132.24, 130.47, 134, 142.4, 138.72, 130.48, 131.87] } },
    { t: 'SPMO', chosen: false, anchor: false, score: 31.7, ret6: 28.4, ret1: 35, corr: 0.77, reason: 'diverse', series: { '1W': [100, 101.67, 102.11, 99.44, 101.39], '1M': [100, 97.96, 98.51, 101.31, 102.42, 97.78, 97.43, 101.14, 97.69, 100.44, 102.34, 102.34, 98.4, 95.56, 96.92, 94.67, 95.39, 96.98, 97.41, 94.86, 96.72], 'YTD': [100, 99.75, 100.57, 99.59, 100.8, 101.82, 100.01, 100.98, 100.79, 98.2, 97.12, 93.31, 96.16, 104.42, 106.97, 110.72, 112.67, 121.06, 117.86, 125.38, 128.08, 126.2, 134.01, 129.23, 125.23, 127.94], '6M': [100, 99.18, 101.35, 97.57, 99.46, 100.88, 100.47, 100.62, 98.54, 97.45, 93.63, 96.49, 103.73, 107.9, 110.6, 113.04, 120.94, 120.66, 121.89, 126.64, 121.34, 128.23, 135.95, 133.32, 125.66, 128.38] } },
    { t: 'FRWD', chosen: false, anchor: false, score: 30, ret6: 31, ret1: 29, corr: 0.03, reason: 'diverse', series: { '1W': [100, 101.85, 102.2, 99.06, 100.79], '1M': [100, 98.19, 98.22, 101.28, 100.52, 95.54, 95.23, 96.66, 94.23, 96.82, 99.16, 99.16, 96.01, 93.06, 95.39, 92.63, 93.68, 95.42, 95.74, 92.81, 94.42], 'YTD': [100, 100.4, 106.5, 95.49, 98.31, 97.68, 97.41, 96.45, 94.44, 96.35, 90.2, 92.98, 101.44, 107.56, 109.77, 112.85, 119.68, 123.96, 123.37, 130.8, 124.09, 129.03, 137.31, 132.26, 126.53, 128.98], '6M': [100, 102.41, 106.84, 95.58, 98, 99.89, 98.47, 97.95, 95.91, 97.85, 91.6, 94.43, 103.02, 110.56, 114.73, 116.23, 124.16, 122.62, 126.05, 132.84, 126.02, 131.04, 139.45, 134.32, 128.5, 130.99] } },
    { t: 'FCUS', chosen: false, anchor: false, score: 26.8, ret6: 7.2, ret1: 46.4, corr: 0.61, reason: 'diverse', series: { '1W': [100, 102.05, 104.92, 103.48, 99.82], '1M': [100, 97.35, 97.81, 100.33, 102.39, 98.53, 98.53, 96.38, 98.88, 94.21, 96.11, 98.32, 94.52, 86.97, 89.19, 84.65, 84.65, 86.38, 88.81, 87.6, 84.5], 'YTD': [100, 108.28, 114.24, 117.36, 118.32, 121.47, 120.94, 126.9, 119.44, 116.69, 118.43, 112.36, 117.75, 121.79, 124.28, 128.79, 135.48, 145.57, 134.61, 143.37, 150.06, 134.89, 142.13, 136.9, 129.6, 122.79], '6M': [100, 103.57, 106.41, 100.4, 106.77, 107.16, 109.59, 104.29, 101.89, 103.41, 103.71, 102.16, 105.72, 109.52, 111.32, 115.26, 117.69, 124.85, 122.57, 124.77, 128.53, 122.85, 127.3, 119.54, 113.17, 107.21] } },
    { t: 'CNEQ', chosen: false, anchor: false, score: 25, ret6: 14.8, ret1: 35.1, corr: 0.73, reason: 'diverse', series: { '1W': [100, 102.31, 102.06, 99.62, 100.71], '1M': [100, 100.51, 99.51, 101.85, 99.85, 97.44, 97.13, 96.35, 96.27, 98.76, 100.49, 100.49, 98.66, 96.64, 98.29, 96.08, 96.79, 99.03, 98.78, 96.42, 97.47], 'YTD': [100, 101.16, 101.69, 100.41, 98.87, 98.46, 97.21, 98.92, 95.67, 93.92, 94.12, 89.73, 91.91, 100.55, 105.35, 107.21, 107.62, 113.26, 111.37, 117.51, 119.6, 112.97, 121.67, 115.01, 114.78, 116.44], '6M': [100, 98.57, 99.6, 91.65, 94.23, 96.41, 94.21, 94.52, 92.63, 92.83, 88.5, 90.65, 97.62, 104.48, 105.54, 105.36, 108.58, 111.96, 114.8, 118.13, 112.05, 111.88, 117.64, 116.35, 113.2, 114.83] } },
    { t: 'CBSE', chosen: false, anchor: false, score: 24, ret6: 15.3, ret1: 32.7, corr: 0.53, reason: 'diverse', series: { '1W': [100, 99.53, 101.61, 100.95, 99.86], '1M': [100, 97.59, 97.93, 101.84, 102.25, 98.78, 98.78, 98.97, 100.41, 100.46, 101.43, 103.01, 100.27, 99.08, 99.51, 97.02, 97.02, 96.57, 98.58, 97.95, 96.88], 'YTD': [100, 105.79, 109.69, 108.72, 106.51, 109.71, 107.56, 111.2, 107.01, 104.84, 104.3, 102.44, 101.75, 109.39, 115.73, 116.43, 119.2, 125.66, 122.96, 126.3, 132.18, 121, 126.24, 129.51, 128.28, 124.89], '6M': [100, 101.66, 100.61, 97.07, 100.29, 101.28, 101.93, 98.81, 96.8, 96.3, 97.56, 93.38, 99.29, 105.28, 108.8, 108.83, 111.42, 117.34, 114.55, 118.04, 122, 115.94, 121.22, 119.59, 118.44, 115.32] } },
    { t: 'BCTK', chosen: false, anchor: false, score: 22.4, ret6: 21.1, ret1: 23.6, corr: 0.11, reason: 'diverse', series: { '1W': [100, 102.19, 101.44, 98.44, 100.08], '1M': [100, 97.97, 97.22, 99.69, 98.53, 94.56, 94.58, 95.41, 94.27, 98.19, 101.25, 101.25, 98.04, 95.22, 97.35, 94.4, 95.03, 97.11, 96.4, 93.54, 95.1], 'YTD': [100, 100.78, 101.56, 100.7, 99.26, 97.68, 97.49, 100.49, 99.03, 96.72, 98.32, 92.93, 94.33, 100.76, 107.21, 109.62, 110.65, 115.24, 113.32, 120.21, 126.06, 119.41, 127.31, 120.4, 120.56, 121.46], '6M': [100, 100, 100.6, 91.51, 95.93, 98.48, 97.8, 99.08, 96.45, 98.05, 92.68, 94.07, 98.55, 106.99, 109.33, 109.66, 115.11, 115.78, 118.15, 122.82, 117.3, 121.32, 125.49, 125.05, 120.23, 121.12] } },
    { t: 'XMMO', chosen: false, anchor: false, score: 19.3, ret6: 14.4, ret1: 24.1, corr: 0.78, reason: 'diverse', series: { '1W': [100, 101.35, 100.75, 98.99, 101.09], '1M': [100, 99.38, 99.07, 100.31, 101.47, 99.01, 98.63, 99.89, 97.53, 97.73, 99.32, 99.32, 96.91, 95.24, 96.21, 93.56, 93.58, 94.85, 94.28, 92.63, 94.6], 'YTD': [100, 101.24, 103.39, 102.17, 102.22, 105.99, 106.49, 108.27, 107.54, 103.39, 105.62, 104.43, 106.61, 113.35, 114.73, 115.54, 115.57, 120.16, 114.86, 121.7, 124.02, 121.38, 124.1, 120.66, 115.74, 117.04], '6M': [100, 100.56, 99.88, 100.11, 102.34, 105.45, 105.93, 103.93, 101.06, 103.24, 102.08, 104.21, 109.88, 112.06, 113.13, 113.11, 116.87, 115.68, 116.34, 119.2, 116.22, 119.79, 122.71, 118.19, 113.14, 114.4] } },
    { t: 'MARS', chosen: false, anchor: false, score: 10.5, ret6: 10.5, ret1: 10.5, corr: 0.03, reason: 'diverse', series: { '1W': [100, 99.37, 97.21, 92.9, 95.3], '1M': [100, 98.95, 98.27, 95.99, 90.12, 88.13, 83.95, 81.17, 82.31, 90.7, 94.47, 94.47, 91.49, 91.7, 90.91, 84.8, 83.98, 83.45, 81.64, 78.01, 80.03], 'YTD': [100, 101.98, 102.95, 103.47, 112.19, 103.27, 116.67, 120.86, 125.34, 130.47, 121.87, 124.33, 128.53, 143.79, 147.18, 156.58, 180.51, 159, 138.86, 146.89, 136.56, 121.63, 113.6, 126.55, 115.9, 110.45], '6M': [100, 101.98, 102.95, 103.47, 112.19, 103.27, 116.67, 120.86, 125.34, 130.47, 121.87, 124.33, 128.53, 143.79, 147.18, 156.58, 180.51, 159, 138.86, 146.89, 136.56, 121.63, 113.6, 126.55, 115.9, 110.45] } },
    { t: 'ARKK', chosen: false, anchor: false, score: 0.6, ret6: -5.5, ret1: 6.7, corr: 0.65, reason: 'diverse', series: { '1W': [100, 101.71, 100.11, 97.6, 98.05], '1M': [100, 99.31, 98.57, 100.7, 98.49, 96.3, 96.35, 96.12, 98.12, 101.26, 101.49, 101.49, 102.79, 102.03, 105, 101.96, 100.67, 102.39, 100.77, 98.25, 98.71], 'YTD': [100, 104.72, 106.19, 103.9, 96.67, 94.18, 92.81, 95.61, 97.41, 91.84, 92.39, 87.61, 89.13, 93.55, 103.12, 99.52, 101.7, 101.68, 96, 101.34, 104.1, 98.1, 104.25, 101.57, 105.55, 102.18], '6M': [100, 98.83, 93.32, 79.72, 82.27, 85.93, 87.63, 88.93, 84.9, 85.42, 81, 82.4, 83.28, 95.23, 91.95, 92.45, 95.1, 90.02, 91.83, 98.5, 89.53, 90.93, 94.27, 96.91, 97.58, 94.47] } },
    { t: 'WCLD', chosen: false, anchor: false, score: -0.5, ret6: 2.4, ret1: -3.4, corr: 0.14, reason: 'diverse', series: { '1W': [100, 102.25, 100.3, 102.46, 100.59], '1M': [100, 98.54, 96.01, 95.79, 93.81, 94.94, 95.59, 93.94, 99.55, 102.27, 103.91, 103.91, 107.59, 108.65, 110.6, 111.64, 109.43, 111.9, 109.76, 112.12, 110.08], 'YTD': [100, 99.63, 91.6, 94.32, 85.98, 80.32, 79.89, 76.49, 81.35, 80.75, 81.26, 78.27, 79.38, 72.55, 79.24, 77.78, 84.29, 80.55, 84.75, 84.09, 94.66, 87.6, 84.4, 87.72, 98.37, 97], '6M': [100, 97.77, 92.07, 81.29, 82.85, 82.24, 82.24, 88.94, 85.23, 85.77, 82.61, 83.78, 72.63, 81.79, 81.79, 86.92, 89.72, 86.29, 91.08, 99.34, 97.08, 92.28, 87.24, 95.12, 103.83, 102.38] } },
    { t: 'IGV', chosen: false, anchor: false, score: -12.8, ret6: -9.4, ret1: -16.1, corr: 0.39, reason: 'diverse', series: { '1W': [100, 101.51, 99.92, 100.24, 98.99], '1M': [100, 98.59, 96.2, 96.13, 94.21, 94.22, 92.98, 91.45, 95.17, 96.99, 97.76, 97.76, 100.71, 100.96, 102.28, 101.56, 99.78, 101.29, 99.71, 100.02, 98.78], 'YTD': [100, 98.82, 93.02, 93.49, 84.7, 80.48, 77.59, 76.5, 81.04, 80.41, 79.91, 75.46, 76.01, 74.46, 81.65, 80.83, 83.68, 84.62, 87, 88.04, 94.67, 86.03, 84.29, 83.45, 89.06, 86.62], '6M': [100, 95.91, 91.29, 78.83, 80.1, 79.92, 80.71, 86.69, 84.09, 83.57, 78.91, 79.49, 73.88, 84.18, 84.3, 85.71, 90.19, 90.81, 93.01, 100.58, 94.84, 89.74, 86.39, 88.94, 93.13, 90.58] } },
  ],
  'Electrification': [
    { t: 'VOLT', chosen: true, anchor: true, score: 40, ret6: 28.3, ret1: 51.7, corr: 0.52, reason: 'anchor', series: { '1W': [100, 101.2, 101.41, 99.63, 102.05], '1M': [100, 99.55, 100.17, 102.24, 104.5, 100.84, 101.57, 103.85, 100.25, 101.32, 104.1, 104.1, 100.35, 97.34, 98.48, 95.58, 95.3, 96.45, 96.65, 94.96, 97.25], 'YTD': [100, 101.4, 108.84, 109.01, 112.43, 118.31, 120.64, 124.74, 120.14, 117.34, 119.9, 117.23, 120.14, 130.23, 132.9, 135.38, 140.4, 141.23, 131.79, 137.87, 137.53, 134.59, 142.23, 139.46, 132.96, 135.3], '6M': [100, 103.12, 107.01, 107.08, 114.32, 116.42, 117.08, 111.77, 111.28, 113.7, 111.18, 113.93, 123.26, 125.9, 129.31, 133.44, 132.26, 130.19, 129.8, 128.09, 125.9, 129.27, 137.86, 133.67, 126.09, 128.31] } },
    { t: 'POW', chosen: true, anchor: false, score: 36.5, ret6: 34.7, ret1: 38.2, corr: -0.09, reason: 'diversifier', series: { '1W': [100, 101.23, 102.49, 98.81, 101.25], '1M': [100, 99.07, 98.85, 100.06, 101.79, 97.09, 96.83, 97.54, 94.11, 97.06, 99.17, 99.17, 95.68, 92.54, 92.93, 88.48, 88.51, 89.6, 90.72, 87.46, 89.62], 'YTD': [100, 102.18, 110.41, 112.09, 113.71, 121.7, 122.86, 131.25, 124.34, 120.67, 126.63, 123.1, 124.41, 138.98, 141.11, 153.47, 160.79, 163.28, 148.43, 161.85, 156.92, 152.12, 158.96, 149.5, 140.56, 142.36], '6M': [100, 107.22, 110, 108.8, 117.27, 118.8, 123.42, 114.77, 114.18, 119.82, 116.48, 117.72, 129.54, 134.45, 147.19, 152.04, 158.49, 147.72, 148.34, 150.31, 139.44, 144.08, 153.01, 145.89, 133, 134.7] } },
    { t: 'PBW', chosen: true, anchor: false, score: 28.6, ret6: 0.5, ret1: 56.6, corr: 0.52, reason: 'diversifier', series: { '1W': [100, 101.57, 100.26, 96.78, 100], '1M': [100, 97.99, 97.89, 101.71, 100.93, 95.3, 92.51, 91.75, 90.23, 93.29, 95.52, 95.52, 93.34, 89.57, 91.87, 86.43, 86.02, 87.37, 86.24, 83.25, 86.02], 'YTD': [100, 108.81, 115.62, 114.51, 110.31, 114.01, 109.82, 112.18, 106.25, 106.06, 105.5, 102.78, 103.99, 109.46, 119.29, 122.33, 125.67, 134.51, 124.36, 147.41, 149.71, 130.03, 136.02, 120.66, 115.59, 115.03], '6M': [100, 103.63, 101.69, 91.39, 94.19, 95.62, 92.73, 90.41, 92.68, 92.19, 89.81, 90.87, 94.16, 102.43, 106.24, 110.73, 115.74, 118.28, 123.06, 129.7, 116.68, 114.88, 117.94, 109.01, 101, 100.52] } },
    { t: 'PBD', chosen: false, anchor: false, score: 22.2, ret6: 6.2, ret1: 38.2, corr: 0.61, reason: 'diverse', series: { '1W': [100, 99.14, 99.63, 99.68, 97.59], '1M': [100, 98.44, 97.67, 98.69, 99.37, 95.04, 95.04, 93.73, 93.39, 91.69, 93.44, 95.28, 93.87, 92.56, 94.8, 90.86, 90.86, 90.08, 90.52, 90.57, 88.67], 'YTD': [100, 103.61, 107.71, 112.25, 108.58, 113.12, 113.31, 117.04, 110.39, 110.76, 110.57, 109.89, 112, 117.35, 123.32, 126.74, 130.41, 137.56, 130.6, 138.18, 138.37, 121.83, 124.94, 117.29, 121.27, 113.43], '6M': [100, 102.33, 106.52, 104.54, 106.46, 106, 108.27, 103.32, 103.67, 103.49, 105.12, 105.01, 108.79, 114.26, 116.53, 121.83, 124.97, 126.6, 124.16, 130.62, 129.22, 117.87, 118.16, 109.78, 113.5, 106.17] } },
    { t: 'IVEP', chosen: false, anchor: false, score: 3.6, ret6: 3.6, ret1: 3.6, corr: 0.05, reason: 'diverse', series: { '1W': [100, 101.21, 101.47, 99.85, 102.23], '1M': [100, 99.75, 100.04, 103.26, 104.73, 100.43, 100.57, 101.32, 98.14, 98.75, 100.11, 100.11, 96.71, 95.63, 97.39, 94.99, 94.74, 95.88, 96.13, 94.59, 96.85], 'YTD': [100, 102.76, 103.75, 105.59, 107.78, 107.89, 109.85, 110.15, 108.39, 109.69, 110.73, 103.83, 108.66, 108.66, 105.56, 108.51, 103.95, 103.03, 106.74, 110.5, 107.62, 105.02, 103.49, 101.65, 102.61, 103.64], '6M': [100, 102.76, 103.75, 105.59, 107.78, 107.89, 109.85, 110.15, 108.39, 109.69, 110.73, 103.83, 108.66, 108.66, 105.56, 108.51, 103.95, 103.03, 106.74, 110.5, 107.62, 105.02, 103.49, 101.65, 102.61, 103.64] } },
  ],
  'Industrials': [
    { t: 'PRN', chosen: true, anchor: true, score: 32.9, ret6: 20.6, ret1: 45.1, corr: 0.34, reason: 'anchor', series: { '1W': [100, 102.11, 101.44, 98.82, 101.66], '1M': [100, 99.33, 100.26, 102.14, 105.06, 101.31, 100.9, 103.12, 99.75, 102.18, 104.29, 104.29, 100.03, 94.06, 95.15, 91.04, 90.85, 92.76, 92.15, 89.78, 92.35], 'YTD': [100, 104.08, 113.24, 111.67, 111.83, 117.61, 118.67, 122.14, 118.05, 110.3, 112.69, 111.42, 114.66, 125.55, 128.2, 130.75, 132.7, 138.82, 130.41, 141.52, 142.67, 138.68, 146.25, 142.84, 130.36, 132.24], '6M': [100, 102.65, 102.88, 100.03, 105.83, 111.94, 108.56, 103.72, 100.62, 102.81, 101.64, 104.6, 113.54, 116.59, 118.93, 121.64, 125.18, 125.45, 123.72, 128.28, 123.3, 127.8, 137.24, 133.48, 118.93, 120.64] } },
    { t: 'AIRR', chosen: false, anchor: false, score: 29.9, ret6: 13.1, ret1: 46.6, corr: 0.88, reason: 'correlated', series: { '1W': [100, 101.46, 100.86, 99.09, 101.24], '1M': [100, 99.92, 99.14, 100.41, 102.21, 99.35, 100.08, 101.96, 99.48, 100.93, 102.21, 102.21, 99.23, 96.58, 97.39, 94.25, 94.01, 95.38, 94.82, 93.16, 95.18], 'YTD': [100, 107.26, 115.48, 114.29, 114.44, 121.95, 120.89, 121.02, 119.98, 111.14, 113.09, 110.88, 114.8, 123.92, 126, 127.8, 127.41, 131.55, 124.63, 131.64, 134.05, 130.58, 133.14, 131.91, 124.97, 126.2], '6M': [100, 104.34, 102.67, 103.46, 106.91, 111.16, 107.75, 103.46, 99.62, 101.37, 99.39, 102.9, 109.71, 112.25, 113.15, 116.02, 118.17, 116.47, 114.01, 117.77, 116.67, 118.01, 121.48, 119.96, 112.02, 113.12] } },
    { t: 'BILT', chosen: true, anchor: false, score: 12.3, ret6: 10.2, ret1: 14.5, corr: 0.09, reason: 'diversifier', series: { '1W': [100, 99.82, 100.27, 100.67, 101.25], '1M': [100, 100.35, 98.74, 98.8, 99.2, 99.63, 100.06, 100.83, 101.33, 100.94, 99.72, 99.72, 99.75, 101.42, 100.96, 101.67, 101.1, 100.92, 101.38, 101.78, 102.37], 'YTD': [100, 100.31, 102.35, 103.24, 103.99, 107.98, 111.65, 113.69, 114.02, 111, 110.38, 109.28, 112.11, 113, 112.43, 112.89, 113.29, 112.79, 112.43, 113.86, 112.33, 113.2, 107.37, 110.13, 110.49, 111.25], '6M': [100, 101.45, 103.97, 105.41, 109.9, 111.38, 113.71, 111.45, 109.91, 109.3, 108.21, 111.01, 113.05, 111.76, 111.62, 113.12, 110.96, 109.52, 112.74, 111.48, 111.7, 112.7, 106.75, 108.62, 109.41, 110.16] } },
    { t: 'IDEF', chosen: true, anchor: false, score: -0.7, ret6: -11.1, ret1: 9.7, corr: 0.34, reason: 'diversifier', series: { '1W': [100, 99.47, 99.04, 97.3, 97.46], '1M': [100, 100.61, 100.74, 99.08, 97.18, 96.6, 95.4, 94.97, 94.94, 95.95, 97.42, 97.42, 98.31, 101.13, 102.97, 100.61, 98.96, 98.44, 98.01, 96.29, 96.44], 'YTD': [100, 109.87, 116.82, 114.04, 111.27, 114.37, 115.03, 115.53, 118.34, 113.77, 113.13, 107.5, 110.03, 112.71, 113.15, 107.4, 107.6, 107.01, 103.5, 108.51, 106.53, 106.53, 104.9, 100.53, 106.53, 102.11], '6M': [100, 99.93, 99.38, 94.19, 96.6, 101.63, 101.36, 99.94, 99.04, 98.49, 93.59, 95.79, 96.44, 98.87, 93.63, 94.24, 93.92, 89.97, 92.74, 96.61, 90.25, 91.27, 89.57, 88.44, 92.74, 88.89] } },
  ],
  'Meme': [
    { t: 'BUZZ', chosen: true, anchor: true, score: 7, ret6: 1.4, ret1: 12.5, corr: 0.09, reason: 'anchor', series: { '1W': [100, 101.5, 100.81, 98.58, 98.61], '1M': [100, 97.65, 97, 99.22, 97.86, 95.4, 93.45, 92.04, 93.03, 95.56, 96.48, 96.48, 96.14, 94.86, 96.29, 93.42, 93.71, 95.12, 94.46, 92.38, 92.4], 'YTD': [100, 105.57, 108.62, 105.51, 101.23, 98.8, 94.24, 96.15, 97.94, 94.61, 94.52, 88.61, 89.72, 96.03, 105.33, 105.36, 106.99, 113.45, 109.7, 120.47, 122.04, 113.51, 116.96, 109.66, 110.13, 108.93], '6M': [100, 100.34, 98.42, 85.21, 85.99, 87.34, 87.99, 90.49, 88.08, 87.99, 82.49, 83.52, 86.36, 97.62, 98.02, 98.22, 106.59, 104.73, 108.08, 116.16, 105.62, 105.39, 107.39, 104.87, 102.52, 101.4] } },
    { t: 'RKNG', chosen: true, anchor: false, score: -6.3, ret6: -6.3, ret1: -6.3, corr: 0.09, reason: 'diversifier', series: { '1W': [100, 101.78, 105.43, 102.98, 97.9], '1M': [100, 96.69, 97.5, 101.89, 102.27, 97.05, 97.05, 93.83, 94.71, 91.88, 95.35, 97.84, 92.86, 86.4, 88.61, 83.64, 83.64, 85.13, 88.18, 86.13, 81.88], 'YTD': [100, 95.76, 83.79, 83.66, 82.9, 83.61, 79.73, 80.13, 81.28, 78.07, 71.66, 76.08, 87.96, 92.29, 90.84, 99.26, 108.25, 97.8, 109.45, 115.52, 106.65, 107.99, 117.05, 109.13, 101.42, 93.72], '6M': [100, 95.76, 83.79, 83.66, 82.9, 83.61, 79.73, 80.13, 81.28, 78.07, 71.66, 76.08, 87.96, 92.29, 90.84, 99.26, 108.25, 97.8, 109.45, 115.52, 106.65, 107.99, 117.05, 109.13, 101.42, 93.72] } },
    { t: 'MEME', chosen: true, anchor: false, score: -7.9, ret6: 2.3, ret1: -18.2, corr: 0, reason: 'diversifier', series: { '1W': [100, 103.83, 102.47, 96.3, 99.14], '1M': [100, 93.86, 95.49, 99.14, 99.71, 93.48, 89.07, 88.11, 84.28, 89.93, 92.33, 92.33, 86.96, 80.44, 81.69, 75.93, 77.66, 80.63, 79.58, 74.78, 76.99], 'YTD': [100, 119.03, 131.94, 120.81, 113.87, 117.42, 110.65, 112.74, 108.87, 105.65, 114.03, 103.34, 105.81, 128.06, 147.74, 133.39, 142.9, 160.16, 147.26, 186.13, 182.1, 164.35, 166.77, 141.77, 127.74, 129.52], '6M': [100, 101.53, 96.05, 77.96, 83.18, 85.22, 83.82, 83.44, 83.44, 90.06, 81.62, 83.57, 95.8, 114.39, 105.22, 111.08, 121.4, 126.11, 138.6, 145.22, 125.35, 124.59, 132.48, 119.49, 100.89, 102.29] } },
  ],
};
// @@END_GENERATED:THEME_UNIVERSE@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 9, avgWeight: 6.9, proScore: 6.21, coverage: 0.9,
      price: 204.75, weeklyPrices: [204.12, 202.78, 210.96, 203.53, 204.75], weeklyChange: 0.31, dayChange: 0.6, sortRank: 0, periodReturns: { '1M': -3.6, 'YTD': 9.8, '6M': 11.8, '1Y': 24.8 },
      priceHistory: { '1D': [203.53, 204.93, 204.75], '1W': [204.12, 202.78, 210.96, 203.53, 204.75], '1M': [212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83, 195.55, 196.93, 204.12, 202.78, 210.96, 203.53, 204.75], 'YTD': [186.5, 185.04, 186.23, 186.47, 185.61, 190.04, 187.98, 195.56, 183.04, 183.14, 178.56, 171.24, 177.39, 189.31, 202.06, 216.61, 198.48, 220.78, 220.61, 212.6, 218.66, 204.87, 210.69, 192.53, 196.93, 204.75], '6M': [183.14, 184.84, 192.51, 171.88, 186.94, 189.82, 177.19, 183.34, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 225.32, 215.33, 211.14, 205.1, 205.19, 208.65, 194.97, 196.93, 204.75], '1Y': [164.07, 171.38, 176.75, 180, 182.06, 182.01, 179.81, 174.18, 168.31, 177.75, 183.61, 181.85, 185.54, 188.32, 182.64, 191.49, 206.88, 199.05, 186.6, 182.55, 179.92, 185.55, 176.29, 183.69, 187.54, 189.11, 183.14, 184.84, 192.51, 171.88, 186.94, 189.82, 184.89, 183.34, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 225.32, 215.33, 211.14, 205.1, 205.19, 208.65, 194.97, 196.93, 204.75] },
      velocityScore: { '1D': 0.2, '1W': 6.3, '1M': 0.3, '6M': null }, isNew: false,
      marketCap: '$5.0T', pe: 31.4, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.47,
      etfPresence: { AIS: 2.71, ARTY: 4.83, BAI: 4.57, IGPT: 8.07, IVES: 4.88, ALAI: 12.93, CHAT: 7.43, AIFD: 6.53, SPRX: false, AOTG: 10.13 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 9, avgWeight: 5.79, proScore: 5.22, coverage: 0.9,
      price: 563.2, weeklyPrices: [517.41, 546.72, 557.89, 534.39, 563.20], weeklyChange: 8.85, dayChange: 5.39, sortRank: 0, periodReturns: { '1M': 2.9, 'YTD': 163, '6M': 151.9, '1Y': 285.1 },
      priceHistory: { '1D': [534.39, 562.4, 563.2], '1W': [517.41, 546.72, 557.89, 534.39, 563.2], '1M': [547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 516.11, 517.41, 546.72, 557.89, 534.39, 563.2], 'YTD': [214.16, 204.68, 231.83, 251.31, 246.27, 216, 200.12, 210.86, 202.07, 197.74, 205.27, 203.77, 217.5, 246.83, 274.95, 334.63, 341.54, 448.29, 414.05, 495.54, 523.2, 488.45, 537.37, 521.58, 516.11, 563.2], '6M': [223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 200.21, 199.45, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 467.51, 516.1, 466.38, 511.57, 551.63, 539.49, 516.11, 563.2], '1Y': [146.24, 157, 173.66, 176.78, 172.28, 176.14, 163.36, 162.63, 151.41, 161.16, 159.79, 161.36, 203.71, 216.42, 240.56, 259.67, 259.65, 243.98, 240.52, 215.05, 219.76, 221.11, 207.58, 214.95, 215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 203.68, 199.45, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 467.51, 516.1, 466.38, 511.57, 551.63, 539.49, 516.11, 563.2] },
      velocityScore: { '1D': -0.2, '1W': 1.8, '1M': 2.8, '6M': null }, isNew: false,
      marketCap: '$918B', pe: 188.4, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 5.38, ARTY: 5.24, BAI: 5.37, IGPT: 8.89, IVES: 4.78, ALAI: 1.33, CHAT: 4.06, AIFD: false, SPRX: 0.67, AOTG: 16.43 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 5.62, proScore: 5.06, coverage: 0.9,
      price: 981.21, weeklyPrices: [948.80, 991.64, 979.30, 937.00, 981.21], weeklyChange: 3.42, dayChange: 4.72, sortRank: 0, periodReturns: { '1M': -9.8, 'YTD': 243.8, '6M': 194.3, '1Y': 727.3 },
      priceHistory: { '1D': [937, 977.69, 981.21], '1W': [948.8, 991.64, 979.3, 937, 981.21], '1M': [1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 938.38, 948.8, 991.64, 979.3, 937, 981.21], 'YTD': [285.41, 327.02, 362.75, 389.09, 437.8, 383.5, 420.95, 429, 400.77, 405.35, 444.27, 355.46, 366.24, 426.56, 448.42, 524.56, 576.45, 766.58, 698.74, 928.41, 996, 995.87, 1133.99, 1132.33, 938.38, 981.21], '6M': [333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 971, 864.01, 981.61, 1211.38, 1145.28, 938.38, 981.21], '1Y': [118.61, 113.23, 111.25, 107.77, 123.72, 123.55, 116.42, 119.01, 131.46, 157.77, 164.62, 163.9, 190.96, 192.77, 206.77, 220.1, 234.7, 253.3, 241.95, 223.93, 240.46, 246.92, 237.5, 276.59, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 415.56, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 971, 864.01, 981.61, 1211.38, 1145.28, 938.38, 981.21] },
      velocityScore: { '1D': -0.2, '1W': -1, '1M': -17.9, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 23.2, revenueGrowth: 346, eps: 42.35, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { AIS: 6.8, ARTY: 4.76, BAI: 6.19, IGPT: 7.64, IVES: 4.42, ALAI: 1.13, CHAT: 3.56, AIFD: 6.31, SPRX: false, AOTG: 9.81 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 8, avgWeight: 3.83, proScore: 3.06, coverage: 0.8,
      price: 388.73, weeklyPrices: [388.69, 401.11, 399.97, 384.05, 388.73], weeklyChange: 0.01, dayChange: 1.22, sortRank: 0, periodReturns: { '1M': -1.3, 'YTD': 12.3, '6M': 14.4, '1Y': 41 },
      priceHistory: { '1D': [384.05, 388.45, 388.73], '1W': [388.69, 401.11, 399.97, 384.05, 388.73], '1M': [393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45, 373.9, 370.78, 388.69, 401.11, 399.97, 384.05, 388.73], 'YTD': [346.1, 332.48, 351.71, 324.85, 331.11, 343.94, 333.51, 332.31, 317.53, 335.97, 319.84, 309.42, 314.55, 379.75, 399.63, 418.2, 416.5, 419.3, 411.07, 421.86, 418.91, 385.57, 411.35, 365.02, 370.78, 388.73], '6M': [339.89, 325.49, 330.73, 310.51, 331.17, 332.65, 319.55, 332.77, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 425.19, 414.14, 446.77, 385.73, 382.07, 392.13, 372.45, 370.78, 388.73], '1Y': [275.6, 288.21, 294.3, 297.72, 303.9, 305.76, 294.23, 297.39, 345.65, 364.09, 338.79, 327.9, 335.49, 356.7, 349.24, 362.05, 362.55, 358.39, 342.65, 377.96, 386.08, 401.1, 339.81, 341.45, 349.85, 343.5, 339.89, 325.49, 330.73, 310.51, 331.17, 332.65, 321.7, 332.77, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 425.19, 414.14, 446.77, 385.73, 382.07, 392.13, 372.45, 370.78, 388.73] },
      velocityScore: { '1D': -0.6, '1W': 7, '1M': 10.9, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 64.9, revenueGrowth: 48, eps: 5.99, grossMargin: 76, dividendYield: 0.68,
      etfPresence: { AIS: 0.73, ARTY: 4.7, BAI: 4.62, IGPT: false, IVES: 4.73, ALAI: 4.05, CHAT: 4.76, AIFD: 5.53, SPRX: false, AOTG: 1.51 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 5.11, proScore: 3.07, coverage: 0.6,
      price: 352.29, weeklyPrices: [361.92, 358.89, 357.18, 352.51, 352.29], weeklyChange: -2.66, dayChange: -0.06, sortRank: 0, periodReturns: { '1M': -4.6, 'YTD': 12.6, '6M': 4.9, '1Y': 94 },
      priceHistory: { '1D': [352.51, 353.34, 352.29], '1W': [361.92, 358.89, 357.18, 352.51, 352.29], '1M': [369.35, 373.25, 363.79, 368.03, 349.68, 346.13, 345.29, 343.71, 337.39, 353.65, 357.37, 361.21, 359.91, 366.46, 367.03, 361.92, 358.89, 357.18, 352.51, 352.29], 'YTD': [313, 325.44, 330, 333.26, 343.69, 324.32, 303.33, 312.9, 303.13, 303.55, 307.13, 280.92, 295.77, 321.31, 337.42, 350.34, 383.25, 387.35, 387.66, 388.83, 372.19, 357.77, 368.03, 337.39, 367.03, 352.29], '6M': [335.84, 330.54, 338.25, 331.25, 309, 314.98, 311.76, 300.88, 303.55, 307.13, 280.92, 295.77, 317.24, 341.68, 344.4, 385.69, 400.8, 396.78, 382.97, 380.34, 368.53, 359.68, 349.68, 353.65, 367.03, 352.29], '1Y': [181.56, 190.1, 192.58, 195.04, 201, 203.5, 208.49, 212.91, 234.04, 251.61, 252.53, 244.05, 250.43, 244.15, 256.55, 269.27, 283.72, 290.1, 285.02, 318.58, 314.89, 313.72, 308.22, 309.78, 313.85, 321.98, 335.84, 330.54, 338.25, 331.25, 309, 314.98, 307.38, 300.88, 303.55, 307.13, 280.92, 295.77, 317.24, 341.68, 344.4, 385.69, 400.8, 396.78, 382.97, 380.34, 368.53, 359.68, 349.68, 353.65, 367.03, 352.29] },
      velocityScore: { '1D': 2, '1W': -0.6, '1M': 8.1, '6M': null }, isNew: false,
      marketCap: '$4.3T', pe: 26.9, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.36, IGPT: 8, IVES: 4.64, ALAI: false, CHAT: 5.63, AIFD: 5.14, SPRX: false, AOTG: 3.91 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 6, avgWeight: 4.77, proScore: 2.86, coverage: 0.6,
      price: 425.57, weeklyPrices: [436.98, 436.96, 434.11, 421.58, 425.57], weeklyChange: -2.61, dayChange: 0.94, sortRank: 0, periodReturns: { '1M': -3.6, 'YTD': 40, '6M': 30.1, '1Y': 86.1 },
      priceHistory: { '1D': [421.6, 425.19, 425.57], '1W': [436.98, 436.96, 434.11, 421.58, 425.57], '1M': [441.4, 425.83, 432.15, 462.12, 467.67, 436.39, 440.83, 434.99, 432.35, 455.1, 477.57, 444.23, 434.16, 451.79, 432.57, 436.98, 436.96, 434.11, 421.58, 425.57], 'YTD': [303.89, 318.01, 342.4, 332.71, 341.36, 355.41, 362.26, 387.73, 357.44, 336.71, 338.79, 326.11, 339.04, 369.57, 366.24, 404.98, 401.61, 397.28, 392.61, 422.73, 444.92, 421.07, 462.12, 432.35, 432.57, 425.57], '6M': [327.11, 327.37, 339.55, 330.73, 368.1, 370.54, 374.58, 353.86, 336.71, 338.79, 326.11, 339.04, 370.6, 370.5, 402.46, 397.67, 411.68, 404.35, 404.52, 418.45, 415.17, 423.93, 467.67, 455.1, 432.57, 425.57], '1Y': [228.67, 238.85, 242.75, 239, 242.09, 241.41, 235.59, 230.87, 247.19, 261.38, 272.63, 273.23, 302.4, 302.89, 297.7, 298.25, 304.86, 295.27, 282.01, 284.64, 287.68, 301.87, 287.74, 293.28, 299.58, 318.68, 327.11, 327.37, 339.55, 330.73, 368.1, 370.54, 376.81, 353.86, 336.71, 338.79, 326.11, 339.04, 370.6, 370.5, 402.46, 397.67, 411.68, 404.35, 404.52, 418.45, 415.17, 423.93, 467.67, 455.1, 432.57, 425.57] },
      velocityScore: { '1D': 0.4, '1W': -3.1, '1M': 0, '6M': null }, isNew: false,
      marketCap: '$2.2T', pe: 37, revenueGrowth: 35, eps: 11.51, grossMargin: 62, dividendYield: 0.87,
      etfPresence: { AIS: 3.45, ARTY: false, BAI: 4.62, IGPT: false, IVES: 4.72, ALAI: 5.27, CHAT: false, AIFD: 3.42, SPRX: false, AOTG: 7.13 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 6, avgWeight: 3.09, proScore: 1.86, coverage: 0.6,
      price: 228.58, weeklyPrices: [231.71, 243.27, 235.81, 217.53, 228.58], weeklyChange: -1.35, dayChange: 5.08, sortRank: 0, periodReturns: { '1M': -26, 'YTD': 169, '6M': 181.5, '1Y': 215.2 },
      priceHistory: { '1D': [217.53, 226.66, 228.58], '1W': [231.71, 243.27, 235.81, 217.53, 228.58], '1M': [308.88, 278.67, 289.54, 310.58, 307.86, 279.04, 276.7, 281.26, 266.77, 277.75, 297.89, 272.05, 245.29, 249.27, 230.7, 231.71, 243.27, 235.81, 217.53, 228.58], 'YTD': [84.98, 83.45, 80.46, 81.77, 78.66, 82.35, 79.09, 80.92, 78.09, 87.67, 89.53, 97.68, 107.11, 131.3, 147.84, 158.21, 163.66, 164.5, 176.27, 198.7, 316.43, 280.71, 310.58, 266.77, 230.7, 228.58], '6M': [81.21, 83.1, 81.34, 74.21, 78.23, 79.48, 81.69, 75.68, 87.67, 89.53, 97.68, 107.11, 128.49, 139.69, 164.31, 164.95, 170.13, 176.89, 196.33, 205, 263.47, 279.7, 307.86, 277.75, 230.7, 228.58], '1Y': [72.51, 73.06, 75.91, 76.53, 77.28, 76.74, 72.95, 62.87, 66, 67.43, 75.53, 82.39, 88.92, 89.39, 85.84, 88.71, 90.37, 93.23, 83.45, 83.79, 91.1, 92, 84.26, 84.8, 86.76, 84.64, 81.21, 83.1, 81.34, 74.21, 78.23, 79.48, 79.29, 75.68, 87.67, 89.53, 97.68, 107.11, 128.49, 139.69, 164.31, 164.95, 170.13, 176.89, 196.33, 205, 263.47, 279.7, 307.86, 277.75, 230.7, 228.58] },
      velocityScore: { '1D': -15.5, '1W': -19.5, '1M': -32.4, '6M': null }, isNew: false,
      marketCap: '$205B', pe: 78.5, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.11,
      etfPresence: { AIS: 3.51, ARTY: 3.6, BAI: 1.69, IGPT: false, IVES: false, ALAI: false, CHAT: 1.36, AIFD: 5.16, SPRX: 3.24, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'ANET', name: 'Arista Networks Inc', easyScore: 6, avgWeight: 2.72, proScore: 1.63, coverage: 0.6,
      price: 182.37, weeklyPrices: [181.05, 184.69, 186.96, 181.15, 182.37], weeklyChange: 0.73, dayChange: 0.71, sortRank: 0, periodReturns: { '1M': 7.9, 'YTD': 39.2, '6M': 45.8, '1Y': 68.3 },
      priceHistory: { '1D': [181.08, 182.59, 182.37], '1W': [181.05, 184.69, 186.96, 181.15, 182.37], '1M': [169.09, 168.01, 164.93, 169.67, 174.56, 162.2, 161.74, 165.45, 157.6, 164.1, 169.88, 166.62, 159.99, 173.28, 166.46, 181.05, 184.69, 186.96, 181.15, 182.37], 'YTD': [131.03, 123.72, 129.83, 143.72, 138.37, 141.74, 139.54, 132.89, 134.83, 134.03, 136.26, 122.55, 126.68, 152.02, 166.85, 172.47, 172.62, 142.54, 141.58, 154.31, 166.01, 156.4, 169.67, 157.6, 166.46, 182.37], '6M': [125.09, 138.41, 148.15, 128.67, 135.12, 132.79, 133.5, 139.4, 134.03, 136.26, 122.55, 126.68, 147.35, 164.23, 176.91, 172.7, 141.77, 141.97, 154.03, 159.47, 154.27, 163.24, 174.56, 164.1, 166.46, 182.37], '1Y': [108.37, 111.61, 117.55, 120.35, 137.65, 138.04, 133.04, 136.55, 140.01, 145.43, 145.4, 143.37, 149.5, 147.45, 146.48, 156.81, 157.59, 137.26, 127.26, 122.17, 128.11, 129.11, 125.89, 130.73, 132.44, 130.08, 125.09, 138.41, 148.15, 128.67, 135.12, 132.79, 130.25, 139.4, 134.03, 136.26, 122.55, 126.68, 147.35, 164.23, 176.91, 172.7, 141.77, 141.97, 154.03, 159.47, 154.27, 163.24, 174.56, 164.1, 166.46, 182.37] },
      velocityScore: { '1D': 0.6, '1W': 10.1, '1M': 0, '6M': null }, isNew: false,
      marketCap: '$230B', pe: 62.5, revenueGrowth: 35, eps: 2.92, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: 1.74, ARTY: 2.82, BAI: 1.59, IGPT: false, IVES: false, ALAI: false, CHAT: 2.45, AIFD: 5.57, SPRX: 2.14, AOTG: false },
      tonyNote: 'Arista Networks Inc appears in 6 of 10 AI & ML ETFs (60% coverage) with average weight 2.7% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 5, avgWeight: 4.6, proScore: 2.3, coverage: 0.5,
      price: 653.38, weeklyPrices: [603.12, 631.48, 669.21, 656.73, 653.38], weeklyChange: 8.33, dayChange: -0.51, sortRank: 0, periodReturns: { '1M': 10.1, 'YTD': -1, '6M': 6.2, '1Y': -9.4 },
      priceHistory: { '1D': [656.73, 653.01, 653.38], '1W': [603.12, 631.48, 669.21, 656.73, 653.38], '1M': [593.48, 600.21, 567.58, 577.22, 563.85, 562.2, 557.67, 542.87, 550.25, 562.6, 563.29, 612.91, 582.9, 600.29, 615.58, 603.12, 631.48, 669.21, 656.73, 653.38], 'YTD': [660.09, 646.06, 620.25, 672.36, 706.41, 677.22, 643.22, 653.69, 667.73, 638.18, 606.7, 547.54, 574.46, 634.53, 670.91, 678.62, 610.41, 603, 602.61, 635.26, 627.57, 568.43, 577.22, 550.25, 615.58, 653.38], '6M': [615.52, 647.63, 738.31, 670.21, 649.81, 655.66, 648.18, 660.57, 638.18, 606.7, 547.54, 574.46, 629.86, 688.55, 675.03, 608.75, 609.63, 614.23, 610.26, 632.51, 593, 566.98, 563.85, 562.6, 615.58, 653.38], '1Y': [720.92, 712.97, 717.63, 776.37, 765.87, 767.37, 753.3, 738.7, 752.3, 764.7, 765.16, 743.4, 715.66, 715.7, 732.17, 750.82, 637.71, 631.76, 602.01, 613.05, 640.87, 666.8, 647.51, 661.5, 665.95, 648.69, 615.52, 647.63, 738.31, 670.21, 649.81, 655.66, 657.01, 660.57, 638.18, 606.7, 547.54, 574.46, 629.86, 688.55, 675.03, 608.75, 609.63, 614.23, 610.26, 632.51, 593, 566.98, 563.85, 562.6, 615.58, 653.38] },
      velocityScore: { '1D': 1.3, '1W': 12.2, '1M': 42, '6M': null }, isNew: false,
      marketCap: '$1.7T', pe: 23.7, revenueGrowth: 33, eps: 27.52, grossMargin: 82, dividendYield: 0.31,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: 9.39, IVES: 5.38, ALAI: 4.57, CHAT: 2.48, AIFD: false, SPRX: false, AOTG: 1.2 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 5, avgWeight: 4.02, proScore: 2.01, coverage: 0.5,
      price: 246.53, weeklyPrices: [243.62, 247.04, 245.34, 247.31, 246.53], weeklyChange: 1.19, dayChange: -0.32, sortRank: 0, periodReturns: { '1M': 0.2, 'YTD': 6.8, '6M': 4.2, '1Y': 9.2 },
      priceHistory: { '1D': [247.31, 246.94, 246.53], '1W': [243.62, 247.04, 245.34, 247.31, 246.53], '1M': [246.02, 246, 237.5, 244.39, 232.79, 234.11, 234.27, 227.01, 232.69, 240.14, 238.34, 241.7, 242.67, 244.16, 245.98, 243.62, 247.04, 245.34, 247.31, 246.53], 'YTD': [230.82, 246.29, 239.12, 238.42, 242.96, 208.72, 204.79, 210.64, 216.82, 209.53, 208.76, 207.54, 209.77, 239.89, 248.28, 261.12, 272.05, 265.82, 259.34, 271.85, 253.79, 241.51, 244.39, 232.69, 245.98, 246.53], '6M': [236.65, 234.34, 241.73, 222.69, 199.6, 210.11, 210, 218.94, 209.53, 208.76, 207.54, 209.77, 238.38, 250.56, 263.99, 268.26, 272.68, 264.14, 266.32, 270.64, 246.03, 238.55, 232.79, 240.14, 245.98, 246.53], '1Y': [225.69, 229.3, 232.79, 211.65, 221.3, 231.49, 227.94, 229, 235.84, 231.43, 227.63, 222.17, 220.9, 220.07, 216.48, 226.97, 254, 248.4, 232.87, 226.28, 233.88, 226.89, 222.54, 228.43, 232.53, 241.56, 236.65, 234.34, 241.73, 222.69, 199.6, 210.11, 207.92, 218.94, 209.53, 208.76, 207.54, 209.77, 238.38, 250.56, 263.99, 268.26, 272.68, 264.14, 266.32, 270.64, 246.03, 238.55, 232.79, 240.14, 245.98, 246.53] },
      velocityScore: { '1D': 1.5, '1W': 0.5, '1M': 0.5, '6M': null }, isNew: false,
      marketCap: '$2.7T', pe: 29.5, revenueGrowth: 17, eps: 8.36, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 4.94, ALAI: 4.92, CHAT: 2.67, AIFD: 3.54, SPRX: false, AOTG: 4.05 },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 5, avgWeight: 3.73, proScore: 1.86, coverage: 0.5,
      price: 380.41, weeklyPrices: [393.16, 417.45, 412.97, 362.05, 380.41], weeklyChange: -3.24, dayChange: 5.07, sortRank: 0, periodReturns: { '1M': -2.3, 'YTD': 128.7, '6M': 121, '1Y': 321.2 },
      priceHistory: { '1D': [362.05, 376.09, 380.41], '1W': [393.16, 417.45, 412.97, 362.05, 380.41], '1M': [389.2, 361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86, 406.42, 432.74, 382.89, 393.16, 417.45, 412.97, 362.05, 380.41], 'YTD': [166.36, 156.73, 182, 163.25, 152.44, 187.67, 129.58, 128.15, 113.77, 119.9, 126.16, 113.61, 117.14, 166.79, 175.8, 196.64, 201.25, 204.42, 244.26, 325.33, 358.05, 367.47, 417.07, 391.74, 382.89, 380.41], '6M': [172.14, 176.35, 160.46, 142.82, 126.58, 129.68, 118.83, 120, 119.9, 126.16, 113.61, 117.14, 149.05, 174.05, 212.84, 202.68, 199.79, 232.68, 306.88, 342.85, 317.06, 367.15, 439.66, 455.96, 382.89, 380.41], '1Y': [90.32, 121.89, 124.05, 137.93, 179.43, 186.43, 174.15, 182.2, 216.1, 231.29, 237.3, 198.8, 220.81, 199.53, 156.31, 170.28, 191.56, 173.74, 141.39, 147.75, 165.19, 175.74, 143.66, 172.62, 170.84, 165.77, 172.14, 176.35, 160.46, 142.82, 126.58, 129.68, 124.67, 120, 119.9, 126.16, 113.61, 117.14, 149.05, 174.05, 212.84, 202.68, 199.79, 232.68, 306.88, 342.85, 317.06, 367.15, 439.66, 455.96, 382.89, 380.41] },
      velocityScore: { '1D': -3.6, '1W': -2.1, '1M': 19.2, '6M': null }, isNew: false,
      marketCap: '$65B', pe: 257, revenueGrowth: 93, eps: 1.48, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 2.07, ARTY: 1.29, BAI: false, IGPT: false, IVES: false, ALAI: 0.97, CHAT: 2.23, AIFD: false, SPRX: 12.09, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.73, proScore: 1.87, coverage: 0.5,
      price: 380.6, weeklyPrices: [383.34, 384.36, 385.10, 390.99, 380.60], weeklyChange: -0.71, dayChange: -2.66, sortRank: 0, periodReturns: { '1M': -4.8, 'YTD': -21.3, '6M': -17.1, '1Y': -24.3 },
      priceHistory: { '1D': [390.99, 381.02, 380.6], '1W': [383.34, 384.36, 385.1, 390.99, 380.6], '1M': [399.76, 393.83, 378.91, 379.4, 367.34, 373.94, 365.46, 352.83, 372.97, 368.57, 373.02, 384.28, 390.49, 386.74, 388.84, 383.34, 384.36, 385.1, 390.99, 380.6], 'YTD': [483.62, 478.11, 459.86, 470.28, 423.37, 413.6, 399.6, 400.6, 405.2, 401.86, 389.02, 365.97, 373.46, 384.37, 418.07, 424.82, 413.62, 407.77, 417.42, 412.67, 428.05, 390.34, 379.4, 372.97, 388.84, 380.6], '6M': [459.38, 451.14, 433.5, 393.67, 401.84, 397.23, 392.74, 410.68, 401.86, 389.02, 365.97, 373.46, 370.87, 422.79, 424.62, 414.44, 415.12, 421.92, 418.57, 450.24, 416.67, 390.74, 367.34, 368.57, 388.84, 380.6], '1Y': [503.02, 510.06, 512.5, 535.64, 521.77, 517.1, 504.26, 506.69, 498.2, 515.36, 514.45, 514.6, 528.57, 514.05, 516.79, 531.52, 517.03, 506, 507.49, 474, 486.74, 491.02, 474.82, 484.92, 487.48, 483.47, 459.38, 451.14, 433.5, 393.67, 401.84, 397.23, 401.72, 410.68, 401.86, 389.02, 365.97, 373.46, 370.87, 422.79, 424.62, 414.44, 415.12, 421.92, 418.57, 450.24, 416.67, 390.74, 367.34, 368.57, 388.84, 380.6] },
      velocityScore: { '1D': 3.9, '1W': 2.2, '1M': 7.5, '6M': null }, isNew: false,
      marketCap: '$2.8T', pe: 22.7, revenueGrowth: 18, eps: 16.77, grossMargin: 68, dividendYield: 0.93,
      etfPresence: { AIS: false, ARTY: 2.71, BAI: false, IGPT: false, IVES: 4.81, ALAI: 5.22, CHAT: 2.49, AIFD: false, SPRX: false, AOTG: 3.43 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 5, avgWeight: 2.89, proScore: 1.45, coverage: 0.5,
      price: 585.6, weeklyPrices: [550.30, 578.05, 582.59, 555.55, 585.60], weeklyChange: 6.41, dayChange: 5.41, sortRank: 0, periodReturns: { '1M': -10.4, 'YTD': 239.9, '6M': 172.4, '1Y': 774.9 },
      priceHistory: { '1D': [555.55, 580, 585.6], '1W': [550.3, 578.05, 582.59, 555.55, 585.6], '1M': [653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539, 577.46, 532.1, 550.3, 578.05, 582.59, 555.55, 585.6], 'YTD': [172.27, 187.68, 221.51, 240.85, 270.23, 285.99, 296.56, 290.95, 261.3, 261.18, 316.93, 273.35, 294.97, 350.16, 374.11, 400.73, 442.36, 488.74, 455.8, 530.6, 575.5, 529.29, 746.23, 586.45, 532.1, 585.6], '6M': [215, 243.29, 278.41, 260.19, 284.1, 285.52, 279.7, 259.03, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 431.52, 480, 482.02, 484.28, 531.21, 511.72, 562.93, 732.62, 651.88, 532.1, 585.6], '1Y': [66.93, 68.74, 68.99, 77.29, 74.64, 76.29, 79.22, 80.34, 93.29, 102.39, 112.41, 116.74, 125.28, 118.86, 121.53, 126.67, 158.02, 174.22, 162.45, 150.93, 163.54, 169.78, 172.04, 176.76, 176.06, 199.88, 215, 243.29, 278.41, 260.19, 284.1, 285.52, 282.25, 259.03, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 431.52, 480, 482.02, 484.28, 531.21, 511.72, 562.93, 732.62, 651.88, 532.1, 585.6] },
      velocityScore: { '1D': 25, '1W': 28.3, '1M': 19.8, '6M': null }, isNew: false,
      marketCap: '$202B', pe: 36.7, revenueGrowth: 46, eps: 15.94, grossMargin: 45, dividendYield: 0.1,
      etfPresence: { AIS: 1.38, ARTY: 2.76, BAI: 3.21, IGPT: 2.97, IVES: false, ALAI: 4.14, CHAT: false, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 5, avgWeight: 2.63, proScore: 1.31, coverage: 0.5,
      price: 825.73, weeklyPrices: [707.10, 785.77, 802.01, 768.15, 825.73], weeklyChange: 16.78, dayChange: 7.5, sortRank: 0, periodReturns: { '1M': -13.7, 'YTD': 124, '6M': 149, '1Y': 795.2 },
      priceHistory: { '1D': [768.15, 817.51, 825.73], '1W': [707.1, 785.77, 802.01, 768.15, 825.73], '1M': [957.24, 875.36, 869.98, 850, 893.93, 827.92, 842.53, 861.97, 816.98, 851.4, 858.06, 801.16, 728.32, 731.25, 698.91, 707.1, 785.77, 802.01, 768.15, 825.73], 'YTD': [368.59, 348.26, 324.25, 332.45, 423.42, 577.15, 594.26, 723.39, 680.8, 616.09, 772.13, 688.8, 826.88, 871.18, 895.11, 859.68, 976.18, 992.37, 890.09, 902.31, 945.08, 889.59, 850, 816.98, 698.91, 825.73], '6M': [331.62, 354.49, 381.44, 504.42, 583.46, 667.77, 700.91, 650.82, 616.09, 772.13, 688.8, 826.88, 897.3, 894.07, 881.64, 949.93, 903.8, 970.7, 946.9, 854.96, 863.66, 921.56, 893.93, 851.4, 698.91, 825.73], '1Y': [92.24, 103.84, 107.17, 111.13, 115.03, 118.98, 123.42, 132.81, 149.4, 168.77, 164.71, 162.58, 160.6, 160.56, 161, 193.8, 199.58, 259.89, 242.07, 299.36, 317.93, 342.56, 334.69, 389.88, 371.18, 392.88, 331.62, 354.49, 381.44, 504.42, 583.46, 667.77, 677, 650.82, 616.09, 772.13, 688.8, 826.88, 897.3, 894.07, 881.64, 949.93, 903.8, 970.7, 946.9, 854.96, 863.66, 921.56, 893.93, 851.4, 698.91, 825.73] },
      velocityScore: { '1D': -0.8, '1W': 4.8, '1M': -12.7, '6M': null }, isNew: false,
      marketCap: '$64B', pe: 151.5, revenueGrowth: 90, eps: 5.45, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.58, IGPT: false, IVES: false, ALAI: 1.29, CHAT: 1.53, AIFD: 4.05, SPRX: 3.69, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 5 of 10 AI & ML ETFs (50% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 5, avgWeight: 2.19, proScore: 1.1, coverage: 0.5,
      price: 1798.51, weeklyPrices: [1727.18, 1858.27, 1915.92, 1673.97, 1798.51], weeklyChange: 4.13, dayChange: 7.44, sortRank: 0, periodReturns: { '1M': -14.7, 'YTD': 657.6, '6M': 363.8, '1Y': 4133.8 },
      priceHistory: { '1D': [1673.97, 1782.61, 1798.51], '1W': [1727.18, 1858.27, 1915.92, 1673.97, 1798.51], '1M': [2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 1745, 1744.43, 1617.7, 1727.18, 1858.27, 1915.92, 1673.97, 1798.51], 'YTD': [237.38, 334.54, 413.62, 470.8, 665.24, 583.4, 600.4, 632.38, 599.06, 618.82, 772.09, 603.17, 701.59, 952.5, 913.02, 1070.2, 1255.86, 1452.02, 1383.29, 1589.94, 1759.68, 1881.51, 2184.75, 2090.71, 1617.7, 1798.51], '6M': [387.81, 503.44, 539.3, 576.2, 630.29, 649.97, 635.36, 565.59, 618.82, 772.09, 603.17, 701.59, 851.77, 920.99, 989.9, 1187, 1562.34, 1407.61, 1478.69, 1694.98, 1559.32, 1980.1, 2273.73, 2050.39, 1617.7, 1798.51], '1Y': [42.48, 41.61, 41.89, 42.51, 43.37, 45.52, 46.78, 52.47, 70.5, 90.09, 102.92, 113.5, 121.17, 134.61, 148.04, 176.49, 207.01, 267.95, 265.88, 226.96, 210.17, 225.47, 201.87, 241.05, 240.22, 353.56, 387.81, 503.44, 539.3, 576.2, 630.29, 649.97, 651.9, 565.59, 618.82, 772.09, 603.17, 701.59, 851.77, 920.99, 989.9, 1187, 1562.34, 1407.61, 1478.69, 1694.98, 1559.32, 1980.1, 2273.73, 2050.39, 1617.7, 1798.51] },
      velocityScore: { '1D': -6.8, '1W': 1.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$266B', pe: 61.4, revenueGrowth: 251, eps: 29.29, grossMargin: 56, dividendYield: null,
      etfPresence: { AIS: 2.09, ARTY: false, BAI: 2.85, IGPT: 3.85, IVES: false, ALAI: 0.47, CHAT: false, AIFD: false, SPRX: false, AOTG: 1.7 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'CRDO', name: 'Credo Technology Group Holding Ltd', easyScore: 5, avgWeight: 2.01, proScore: 1, coverage: 0.5,
      price: 246.93, weeklyPrices: [258.69, 265.65, 257.79, 236.88, 246.93], weeklyChange: -4.55, dayChange: 4.24, sortRank: 0, periodReturns: { '1M': -4.8, 'YTD': 71.6, '6M': 57.4, '1Y': 150.2 },
      priceHistory: { '1D': [236.88, 245.52, 246.93], '1W': [258.69, 265.65, 257.79, 236.88, 246.93], '1M': [259.41, 239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.09, 241.91, 265.55, 246.4, 258.69, 265.65, 257.79, 236.88, 246.93], 'YTD': [143.89, 141.59, 150.97, 128.02, 119.96, 123.41, 127.91, 123.46, 102.54, 111.57, 107.09, 96.44, 101.45, 134.36, 174.53, 180.5, 180.06, 198.57, 168.99, 221.23, 217.5, 264.76, 271.83, 238, 246.4, 246.93], '6M': [156.84, 135.1, 129.47, 98.06, 121.78, 124.06, 112.27, 114.74, 111.57, 107.09, 96.44, 101.45, 119.59, 160.69, 195.04, 184.38, 188.51, 172.17, 218.41, 236.03, 206.89, 250.81, 302.52, 245.68, 246.4, 246.93], '1Y': [98.7, 95.74, 107.95, 114.7, 118.57, 118.74, 115.41, 123.06, 147.53, 163.98, 164.1, 146.01, 147.42, 149.9, 151.66, 154.96, 180.64, 170.16, 145.58, 150.85, 171.13, 178.94, 142.02, 149.94, 144.92, 141, 156.84, 135.1, 129.47, 98.06, 121.78, 124.06, 114.48, 114.74, 111.57, 107.09, 96.44, 101.45, 119.59, 160.69, 195.04, 184.38, 188.51, 172.17, 218.41, 236.03, 206.89, 250.81, 302.52, 245.68, 246.4, 246.93] },
      velocityScore: { '1D': -2.9, '1W': -2, '1M': 4.2, '6M': null }, isNew: false,
      marketCap: '$46B', pe: 98.4, revenueGrowth: 157, eps: 2.51, grossMargin: 68, dividendYield: null,
      etfPresence: { AIS: 1.1, ARTY: 1.23, BAI: 2.15, IGPT: false, IVES: false, ALAI: false, CHAT: 1.91, AIFD: false, SPRX: 3.64, AOTG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 4, avgWeight: 3.08, proScore: 1.23, coverage: 0.4,
      price: 314.44, weeklyPrices: [317.81, 323.92, 318.86, 305.87, 314.44], weeklyChange: -1.06, dayChange: 2.8, sortRank: 0, periodReturns: { '1M': 0.8, 'YTD': 94.1, '6M': 84, '1Y': 152.1 },
      priceHistory: { '1D': [305.87, 314.35, 314.44], '1W': [317.81, 323.92, 318.86, 305.87, 314.44], '1M': [311.93, 299.6, 317.58, 333.05, 357.96, 318.32, 316.43, 325.57, 303.95, 306.97, 334.82, 311.42, 300.53, 318.47, 305.58, 317.81, 323.92, 318.86, 305.87, 314.44], 'YTD': [162.01, 160.78, 176.93, 181.23, 190.01, 202, 243.21, 262.19, 251.28, 265.38, 269.17, 252.4, 261.29, 299.96, 314.41, 322.43, 330.97, 367.13, 322.63, 319.78, 323.92, 297.88, 333.05, 303.95, 305.58, 314.44], '6M': [170.86, 181.12, 195.1, 177.75, 236.51, 243.75, 254.89, 249.75, 265.38, 269.17, 252.4, 261.29, 295.11, 307.34, 323.46, 328.31, 339.97, 370.94, 327.46, 315.71, 300.51, 302.87, 357.96, 306.97, 305.58, 314.44], '1Y': [124.72, 126.21, 142.55, 140.2, 139.83, 135.69, 125.02, 127.55, 121.82, 138.26, 151.96, 143.31, 162.8, 179, 175.73, 192.9, 191.4, 187.84, 166.65, 168.91, 179.22, 185.61, 161.74, 166.25, 164.34, 171.54, 170.86, 181.12, 195.1, 177.75, 236.51, 243.75, 259.23, 249.75, 265.38, 269.17, 252.4, 261.29, 295.11, 307.34, 323.46, 328.31, 339.97, 370.94, 327.46, 315.71, 300.51, 302.87, 357.96, 306.97, 305.58, 314.44] },
      velocityScore: { '1D': 0.8, '1W': 2.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$121B', pe: 79, revenueGrowth: 30, eps: 3.98, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 3.87, ARTY: false, BAI: 1.97, IGPT: false, IVES: false, ALAI: false, CHAT: 2.25, AIFD: 4.22, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 4, avgWeight: 2.73, proScore: 1.09, coverage: 0.4,
      price: 106.83, weeklyPrices: [110.24, 112.54, 109.84, 103.12, 106.83], weeklyChange: -3.1, dayChange: 3.59, sortRank: 0, periodReturns: { '1M': -16.5, 'YTD': 189.5, '6M': 119.3, '1Y': 358.5 },
      priceHistory: { '1D': [103.12, 107.1, 106.83], '1W': [110.24, 112.54, 109.84, 103.12, 106.83], '1M': [127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 127.02, 120.35, 122.2, 110.39, 110.24, 112.54, 109.84, 103.12, 106.83], 'YTD': [36.9, 41.11, 46.96, 42.49, 48.81, 50.24, 45.46, 46.88, 45.58, 45.25, 46.18, 44.1, 50.38, 65.18, 65.7, 84.99, 95.78, 120.61, 110.8, 121.77, 111.78, 116.96, 133.99, 128.32, 110.39, 106.83], '6M': [48.72, 54.32, 48.66, 48.24, 46.48, 44.11, 45.61, 45.95, 45.25, 46.18, 44.1, 50.38, 62.38, 68.5, 82.54, 99.62, 124.92, 108.77, 119.84, 114.68, 99.17, 124.57, 140.94, 131.72, 110.39, 106.83], '1Y': [23.3, 23.26, 20.68, 19.5, 20.65, 23.66, 24.55, 24.35, 24.48, 24.77, 28.76, 34.48, 36.59, 37.22, 38.1, 39.54, 39.5, 38.45, 34.71, 35.79, 40.01, 40.3, 37.51, 36.37, 37.3, 42.63, 48.72, 54.32, 48.66, 48.24, 46.48, 44.11, 45.46, 45.95, 45.25, 46.18, 44.1, 50.38, 62.38, 68.5, 82.54, 99.62, 124.92, 108.77, 119.84, 114.68, 99.17, 124.57, 140.94, 131.72, 110.39, 106.83] },
      velocityScore: { '1D': -1.8, '1W': -11.4, '1M': -28.8, '6M': null }, isNew: false,
      marketCap: '$537B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.11, ARTY: false, BAI: 2.78, IGPT: 4.03, IVES: false, ALAI: false, CHAT: 0.98, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 4, avgWeight: 2.52, proScore: 1.01, coverage: 0.4,
      price: 397.55, weeklyPrices: [394.06, 406.55, 407.76, 394.76, 397.55], weeklyChange: 0.89, dayChange: 0.71, sortRank: 0, periodReturns: { '1M': -3.3, 'YTD': -11.6, '6M': -9.5, '1Y': 25.4 },
      priceHistory: { '1D': [394.76, 397.27, 397.55], '1W': [394.06, 406.55, 407.76, 394.76, 397.55], '1M': [411.15, 404.66, 396.38, 400.49, 405.05, 381.61, 375.53, 375.12, 379.71, 411.84, 420.6, 425.3, 393.45, 419.77, 402.9, 394.06, 406.55, 407.76, 394.76, 397.55], 'YTD': [449.72, 435.8, 437.5, 435.2, 421.81, 417.32, 411.32, 417.4, 405.94, 395.01, 380.3, 372.11, 360.59, 352.42, 392.5, 378.67, 392.51, 433.45, 404.11, 440.36, 418.45, 399.15, 400.49, 379.71, 402.9, 397.55], '6M': [439.2, 449.36, 416.56, 397.21, 417.07, 411.82, 402.51, 405.55, 395.01, 380.3, 372.11, 360.59, 348.95, 400.62, 376.3, 390.82, 428.35, 422.24, 426.01, 435.79, 391, 406.43, 405.05, 411.84, 402.9, 397.55], '1Y': [316.9, 328.49, 325.59, 309.26, 339.03, 335.16, 346.6, 333.87, 346.4, 410.04, 434.21, 443.21, 453.25, 435.9, 447.43, 452.42, 468.37, 445.23, 408.92, 417.78, 430.14, 439.58, 475.31, 488.73, 454.43, 431.41, 439.2, 449.36, 416.56, 397.21, 417.07, 411.82, 408.58, 405.55, 395.01, 380.3, 372.11, 360.59, 348.95, 400.62, 376.3, 390.82, 428.35, 422.24, 426.01, 435.79, 391, 406.43, 405.05, 411.84, 402.9, 397.55] },
      velocityScore: { '1D': -1, '1W': -2.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 358.2, revenueGrowth: 16, eps: 1.11, grossMargin: 19, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 0.98, IGPT: false, IVES: 4.5, ALAI: 2.68, CHAT: false, AIFD: 1.92, SPRX: false, AOTG: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 4, avgWeight: 2.5, proScore: 1, coverage: 0.4,
      price: 902.58, weeklyPrices: [860.02, 890.09, 910.34, 860.66, 902.58], weeklyChange: 4.95, dayChange: 4.87, sortRank: 0, periodReturns: { '1M': -11.4, 'YTD': 227.7, '6M': 189, '1Y': 505.4 },
      priceHistory: { '1D': [860.66, 896.33, 902.58], '1W': [860.02, 890.09, 910.34, 860.66, 902.58], '1M': [1018.8, 1031.34, 1066.07, 1070.23, 1094.04, 1038.59, 993.25, 1025.36, 899.9, 968.53, 965, 915.19, 820.16, 868.26, 827.64, 860.02, 890.09, 910.34, 860.66, 902.58], 'YTD': [275.39, 284.47, 326.23, 358.29, 432.95, 425, 424.14, 421.85, 375.01, 373.98, 434.6, 378.79, 429.36, 513.28, 539.75, 595.86, 738.54, 808.8, 733.35, 870.66, 925.99, 868.09, 1070.23, 899.9, 827.64, 902.58], '6M': [312.28, 346.53, 446.57, 405.45, 431.17, 411.11, 407.84, 367.34, 373.98, 434.6, 378.79, 429.36, 503.13, 547.75, 586.25, 726.93, 782.64, 795.47, 812.73, 879.8, 847.47, 931.04, 1094.04, 968.53, 827.64, 902.58], '1Y': [149.08, 149.63, 150.46, 154.81, 151.69, 158.7, 164, 167.4, 189.24, 211.12, 229.33, 229.14, 242.83, 219.51, 214.4, 230.32, 265.55, 293.99, 261.38, 253.38, 270.1, 285.41, 285.58, 282.85, 280.08, 308.26, 312.28, 346.53, 446.57, 405.45, 431.17, 411.11, 409.67, 367.34, 373.98, 434.6, 378.79, 429.36, 503.13, 547.75, 586.25, 726.93, 782.64, 795.47, 812.73, 879.8, 847.47, 931.04, 1094.04, 968.53, 827.64, 902.58] },
      velocityScore: { '1D': -1, '1W': null, '1M': -15.3, '6M': null }, isNew: false,
      marketCap: '$202B', pe: 86, revenueGrowth: 44, eps: 10.5, grossMargin: 42, dividendYield: 0.34,
      etfPresence: { AIS: 2.41, ARTY: 2.72, BAI: false, IGPT: 3, IVES: false, ALAI: 1.87, CHAT: false, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 4.79, proScore: 4.79, coverage: 1,
      price: 981.21, weeklyPrices: [948.80, 991.64, 979.30, 937.00, 981.21], weeklyChange: 3.42, dayChange: 4.72, sortRank: 0, periodReturns: { '1M': -9.8, 'YTD': 243.8, '6M': 194.3, '1Y': 727.3 },
      priceHistory: { '1D': [937, 977.69, 981.21], '1W': [948.8, 991.64, 979.3, 937, 981.21], '1M': [1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 938.38, 948.8, 991.64, 979.3, 937, 981.21], 'YTD': [285.41, 327.02, 362.75, 389.09, 437.8, 383.5, 420.95, 429, 400.77, 405.35, 444.27, 355.46, 366.24, 426.56, 448.42, 524.56, 576.45, 766.58, 698.74, 928.41, 996, 995.87, 1133.99, 1132.33, 938.38, 981.21], '6M': [333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 971, 864.01, 981.61, 1211.38, 1145.28, 938.38, 981.21], '1Y': [118.61, 113.23, 111.25, 107.77, 123.72, 123.55, 116.42, 119.01, 131.46, 157.77, 164.62, 163.9, 190.96, 192.77, 206.77, 220.1, 234.7, 253.3, 241.95, 223.93, 240.46, 246.92, 237.5, 276.59, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 415.56, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 971, 864.01, 981.61, 1211.38, 1145.28, 938.38, 981.21] },
      velocityScore: { '1D': 1.3, '1W': 1.3, '1M': -20.3, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 23.2, revenueGrowth: 346, eps: 42.35, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { SOXX: 8.03, PSI: 5.59, XSD: 2.57, DRAM: 2.95 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 5.73, proScore: 4.3, coverage: 0.75,
      price: 563.2, weeklyPrices: [517.41, 546.72, 557.89, 534.39, 563.20], weeklyChange: 8.85, dayChange: 5.39, sortRank: 0, periodReturns: { '1M': 2.9, 'YTD': 163, '6M': 151.9, '1Y': 285.1 },
      priceHistory: { '1D': [534.39, 562.4, 563.2], '1W': [517.41, 546.72, 557.89, 534.39, 563.2], '1M': [547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 516.11, 517.41, 546.72, 557.89, 534.39, 563.2], 'YTD': [214.16, 204.68, 231.83, 251.31, 246.27, 216, 200.12, 210.86, 202.07, 197.74, 205.27, 203.77, 217.5, 246.83, 274.95, 334.63, 341.54, 448.29, 414.05, 495.54, 523.2, 488.45, 537.37, 521.58, 516.11, 563.2], '6M': [223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 200.21, 199.45, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 467.51, 516.1, 466.38, 511.57, 551.63, 539.49, 516.11, 563.2], '1Y': [146.24, 157, 173.66, 176.78, 172.28, 176.14, 163.36, 162.63, 151.41, 161.16, 159.79, 161.36, 203.71, 216.42, 240.56, 259.67, 259.65, 243.98, 240.52, 215.05, 219.76, 221.11, 207.58, 214.95, 215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 203.68, 199.45, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 467.51, 516.1, 466.38, 511.57, 551.63, 539.49, 516.11, 563.2] },
      velocityScore: { '1D': 0.7, '1W': 2.1, '1M': -2.5, '6M': null }, isNew: false,
      marketCap: '$918B', pe: 188.4, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 8.62, PSI: 5.67, XSD: 2.89, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 5.19, proScore: 3.89, coverage: 0.75,
      price: 204.75, weeklyPrices: [204.12, 202.78, 210.96, 203.53, 204.75], weeklyChange: 0.31, dayChange: 0.6, sortRank: 0, periodReturns: { '1M': -3.6, 'YTD': 9.8, '6M': 11.8, '1Y': 24.8 },
      priceHistory: { '1D': [203.53, 204.93, 204.75], '1W': [204.12, 202.78, 210.96, 203.53, 204.75], '1M': [212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83, 195.55, 196.93, 204.12, 202.78, 210.96, 203.53, 204.75], 'YTD': [186.5, 185.04, 186.23, 186.47, 185.61, 190.04, 187.98, 195.56, 183.04, 183.14, 178.56, 171.24, 177.39, 189.31, 202.06, 216.61, 198.48, 220.78, 220.61, 212.6, 218.66, 204.87, 210.69, 192.53, 196.93, 204.75], '6M': [183.14, 184.84, 192.51, 171.88, 186.94, 189.82, 177.19, 183.34, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 225.32, 215.33, 211.14, 205.1, 205.19, 208.65, 194.97, 196.93, 204.75], '1Y': [164.07, 171.38, 176.75, 180, 182.06, 182.01, 179.81, 174.18, 168.31, 177.75, 183.61, 181.85, 185.54, 188.32, 182.64, 191.49, 206.88, 199.05, 186.6, 182.55, 179.92, 185.55, 176.29, 183.69, 187.54, 189.11, 183.14, 184.84, 192.51, 171.88, 186.94, 189.82, 184.89, 183.34, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 225.32, 215.33, 211.14, 205.1, 205.19, 208.65, 194.97, 196.93, 204.75] },
      velocityScore: { '1D': 1.3, '1W': 9.6, '1M': 32.3, '6M': null }, isNew: false,
      marketCap: '$5.0T', pe: 31.4, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.47,
      etfPresence: { SOXX: 8.02, PSI: 5.07, XSD: 2.47, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.08, proScore: 3.06, coverage: 0.75,
      price: 106.83, weeklyPrices: [110.24, 112.54, 109.84, 103.12, 106.83], weeklyChange: -3.1, dayChange: 3.59, sortRank: 0, periodReturns: { '1M': -16.5, 'YTD': 189.5, '6M': 119.3, '1Y': 358.5 },
      priceHistory: { '1D': [103.12, 107.1, 106.83], '1W': [110.24, 112.54, 109.84, 103.12, 106.83], '1M': [127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 127.02, 120.35, 122.2, 110.39, 110.24, 112.54, 109.84, 103.12, 106.83], 'YTD': [36.9, 41.11, 46.96, 42.49, 48.81, 50.24, 45.46, 46.88, 45.58, 45.25, 46.18, 44.1, 50.38, 65.18, 65.7, 84.99, 95.78, 120.61, 110.8, 121.77, 111.78, 116.96, 133.99, 128.32, 110.39, 106.83], '6M': [48.72, 54.32, 48.66, 48.24, 46.48, 44.11, 45.61, 45.95, 45.25, 46.18, 44.1, 50.38, 62.38, 68.5, 82.54, 99.62, 124.92, 108.77, 119.84, 114.68, 99.17, 124.57, 140.94, 131.72, 110.39, 106.83], '1Y': [23.3, 23.26, 20.68, 19.5, 20.65, 23.66, 24.55, 24.35, 24.48, 24.77, 28.76, 34.48, 36.59, 37.22, 38.1, 39.54, 39.5, 38.45, 34.71, 35.79, 40.01, 40.3, 37.51, 36.37, 37.3, 42.63, 48.72, 54.32, 48.66, 48.24, 46.48, 44.11, 45.46, 45.95, 45.25, 46.18, 44.1, 50.38, 62.38, 68.5, 82.54, 99.62, 124.92, 108.77, 119.84, 114.68, 99.17, 124.57, 140.94, 131.72, 110.39, 106.83] },
      velocityScore: { '1D': -1.3, '1W': -11, '1M': -19.5, '6M': null }, isNew: false,
      marketCap: '$537B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 5.41, PSI: 4.46, XSD: 2.36, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.73, proScore: 2.8, coverage: 0.75,
      price: 397.94, weeklyPrices: [385.40, 393.64, 395.65, 386.01, 397.94], weeklyChange: 3.25, dayChange: 3.09, sortRank: 0, periodReturns: { '1M': -6.9, 'YTD': 46.7, '6M': 33.5, '1Y': 63.4 },
      priceHistory: { '1D': [386.01, 397.35, 397.94], '1W': [385.4, 393.64, 395.65, 386.01, 397.94], '1M': [427.58, 416, 414.45, 434.46, 445.48, 407.26, 413.16, 417.93, 386.91, 391.78, 397.17, 388.98, 377.16, 388.83, 379.03, 385.4, 393.64, 395.65, 386.01, 397.94], 'YTD': [271.2, 299.16, 300.25, 304.01, 316.86, 322.97, 346.37, 360.8, 341.51, 307.27, 310.44, 313.42, 318.34, 350.01, 381.05, 392.59, 397.02, 419.65, 414.31, 416.88, 428.76, 412.13, 434.46, 386.91, 379.03, 397.94], '6M': [297.99, 308.52, 318.7, 322.12, 331.36, 355.03, 355.79, 329.72, 307.27, 310.44, 313.42, 318.34, 350.14, 371.45, 399.57, 397.69, 416.52, 417.49, 397.07, 413.85, 401.39, 417.79, 445.48, 391.78, 379.03, 397.94], '1Y': [243.46, 240.48, 230.77, 222.4, 224.07, 231.55, 254.49, 251.31, 248.98, 244.91, 247.34, 244.79, 242.5, 234.67, 246.22, 243.01, 233.61, 232, 229.94, 239.4, 266.51, 279.13, 280.44, 275.82, 274.82, 292.89, 297.99, 308.52, 318.7, 322.12, 331.36, 355.03, 354.35, 329.72, 307.27, 310.44, 313.42, 318.34, 350.14, 371.45, 399.57, 397.69, 416.52, 417.49, 397.07, 413.85, 401.39, 417.79, 445.48, 391.78, 379.03, 397.94] },
      velocityScore: { '1D': 2.6, '1W': 4.5, '1M': 17.2, '6M': null }, isNew: false,
      marketCap: '$194B', pe: 60.7, revenueGrowth: 37, eps: 6.56, grossMargin: 64, dividendYield: 1.11,
      etfPresence: { SOXX: 3.88, PSI: 4.92, XSD: 2.4, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.7% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 6.04, proScore: 3.02, coverage: 0.5,
      price: 597, weeklyPrices: [570.50, 588.66, 602.50, 575.39, 597.00], weeklyChange: 4.65, dayChange: 3.76, sortRank: 0, periodReturns: { '1M': 1.9, 'YTD': 132.3, '6M': 97.8, '1Y': 202.9 },
      priceHistory: { '1D': [575.39, 597.29, 597], '1W': [570.5, 588.66, 602.5, 575.39, 597], '1M': [585.78, 568.23, 592.92, 617.11, 640.18, 585.88, 588.97, 668, 626.84, 694.64, 723, 650.91, 603.04, 592.79, 554.5, 570.5, 588.66, 602.5, 575.39, 597], 'YTD': [256.99, 281.64, 327.01, 319.46, 328.4, 330.57, 369.3, 394.95, 357.76, 337.27, 357.21, 338.55, 348.47, 395.73, 391.62, 404.86, 391.38, 431.2, 406.91, 448.25, 501.7, 552.64, 617.11, 626.84, 554.5, 597], '6M': [301.89, 318.79, 341.34, 303.99, 328.39, 375.38, 372.3, 346.53, 337.27, 357.21, 338.55, 348.47, 399.49, 396.94, 417.04, 389.08, 435.44, 436.62, 432.16, 450.06, 453.01, 567.25, 640.18, 694.64, 554.5, 597], '1Y': [197.1, 192.61, 190.27, 182.82, 184.38, 163.53, 161.99, 160.76, 162.05, 170.93, 200.52, 204.95, 223.91, 219.48, 228.13, 231.33, 237.71, 235.08, 228.71, 230.91, 254.75, 268.16, 261.27, 259.01, 259.97, 292.2, 301.89, 318.79, 341.34, 303.99, 328.39, 375.38, 375.72, 346.53, 337.27, 357.21, 338.55, 348.47, 399.49, 396.94, 417.04, 389.08, 435.44, 436.62, 432.16, 450.06, 453.01, 567.25, 640.18, 694.64, 554.5, 597] },
      velocityScore: { '1D': 0.3, '1W': 2, '1M': 6.3, '6M': null }, isNew: false,
      marketCap: '$474B', pe: 58.9, revenueGrowth: 11, eps: 10.13, grossMargin: 49, dividendYield: 0.35,
      etfPresence: { SOXX: 5.32, PSI: 6.76, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 5.36, proScore: 2.68, coverage: 0.5,
      price: 231.08, weeklyPrices: [221.18, 229.52, 231.52, 222.25, 231.08], weeklyChange: 4.48, dayChange: 3.97, sortRank: 0, periodReturns: { '1M': -9.9, 'YTD': 90.2, '6M': 61.1, '1Y': 150.7 },
      priceHistory: { '1D': [222.25, 230, 231.08, 231.08], '1W': [221.18, 229.52, 231.52, 222.25, 231.08], '1M': [256.42, 237.33, 238.73, 259.56, 269.16, 244.49, 240.48, 258.8, 248.64, 278.39, 301.71, 266.19, 235.55, 233.31, 216.47, 221.18, 229.52, 231.52, 222.25, 231.08], 'YTD': [121.51, 132.46, 156.78, 154.3, 141.04, 144.02, 148.03, 154.67, 147.59, 140.96, 151.15, 145.11, 151.68, 176.88, 180.53, 190, 171.33, 181.13, 174.06, 195.72, 213.11, 241.16, 259.56, 248.64, 216.47, 231.08], '6M': [143.45, 150, 168.47, 133.1, 145.09, 149.6, 152.46, 142.94, 140.96, 151.15, 145.11, 151.68, 173.73, 179.14, 193.5, 172.63, 186.92, 180.43, 188.84, 192.17, 192.92, 254.54, 269.16, 278.39, 216.47, 231.08], '1Y': [92.18, 93.78, 92.32, 91.56, 91.02, 88.34, 87.96, 87.2, 90.9, 98.89, 107.13, 106.41, 113.97, 102.5, 115.29, 121.51, 121.91, 121.79, 113.37, 113.67, 115.72, 122.46, 122.51, 126.57, 124.36, 135.97, 143.45, 150, 168.47, 133.1, 145.09, 149.6, 152.43, 142.94, 140.96, 151.15, 145.11, 151.68, 173.73, 179.14, 193.5, 172.63, 186.92, 180.43, 188.84, 192.17, 192.92, 254.54, 269.16, 278.39, 216.47, 231.08] },
      velocityScore: { '1D': 0.8, '1W': 0, '1M': 6.8, '6M': null }, isNew: false,
      marketCap: '$302B', pe: 65.5, revenueGrowth: 12, eps: 3.53, grossMargin: 61, dividendYield: 0.4,
      etfPresence: { SOXX: 4.81, PSI: 5.91, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 4.89, proScore: 2.44, coverage: 0.5,
      price: 347.27, weeklyPrices: [333.15, 353.17, 350.33, 329.92, 347.27], weeklyChange: 4.24, dayChange: 5.26, sortRank: 0, periodReturns: { '1M': -10.7, 'YTD': 102.9, '6M': 66.3, '1Y': 248.6 },
      priceHistory: { '1D': [329.92, 345.52, 347.27, 347.27], '1W': [333.15, 353.17, 350.33, 329.92, 347.27], '1M': [388.92, 369.34, 374.18, 389.04, 409.54, 371.33, 374.8, 401.82, 379.09, 410.91, 433.33, 391.26, 351.41, 350.2, 326.13, 333.15, 353.17, 350.33, 329.92, 347.27], 'YTD': [171.18, 200.96, 222.96, 222.87, 237.5, 229.28, 240.09, 249.48, 222.99, 209.49, 233.99, 211.62, 218.44, 267.32, 263.16, 259.47, 258.57, 289.24, 273.38, 318.93, 336.41, 362.52, 389.04, 379.09, 326.13, 347.27], '6M': [208.79, 220.7, 248.17, 213.31, 231.29, 244.92, 233.89, 214.68, 209.49, 233.99, 211.62, 218.44, 263.66, 267.6, 267.78, 256.72, 294.05, 284.72, 305.35, 318.18, 303.28, 366.81, 409.54, 410.91, 326.13, 347.27], '1Y': [99.62, 101.74, 98.62, 98.41, 102, 98.88, 101.28, 100.15, 105.07, 119.21, 132.2, 131.09, 149.15, 137.81, 144.05, 156.9, 161.24, 166.37, 147.46, 150.38, 154.79, 162.74, 164.3, 175.26, 173.78, 203.08, 208.79, 220.7, 248.17, 213.31, 231.29, 244.92, 239.07, 214.68, 209.49, 233.99, 211.62, 218.44, 263.66, 267.6, 267.78, 256.72, 294.05, 284.72, 305.35, 318.18, 303.28, 366.81, 409.54, 410.91, 326.13, 347.27] },
      velocityScore: { '1D': -1.2, '1W': -1.2, '1M': 6.1, '6M': null }, isNew: false,
      marketCap: '$434B', pe: 65.8, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.32,
      etfPresence: { SOXX: 4.31, PSI: 5.47, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 4.83, proScore: 2.42, coverage: 0.5,
      price: 388.73, weeklyPrices: [388.69, 401.11, 399.97, 384.05, 388.73], weeklyChange: 0.01, dayChange: 1.22, sortRank: 0, periodReturns: { '1M': -1.3, 'YTD': 12.3, '6M': 14.4, '1Y': 41 },
      priceHistory: { '1D': [384.05, 388.45, 388.73], '1W': [388.69, 401.11, 399.97, 384.05, 388.73], '1M': [393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45, 373.9, 370.78, 388.69, 401.11, 399.97, 384.05, 388.73], 'YTD': [346.1, 332.48, 351.71, 324.85, 331.11, 343.94, 333.51, 332.31, 317.53, 335.97, 319.84, 309.42, 314.55, 379.75, 399.63, 418.2, 416.5, 419.3, 411.07, 421.86, 418.91, 385.57, 411.35, 365.02, 370.78, 388.73], '6M': [339.89, 325.49, 330.73, 310.51, 331.17, 332.65, 319.55, 332.77, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 425.19, 414.14, 446.77, 385.73, 382.07, 392.13, 372.45, 370.78, 388.73], '1Y': [275.6, 288.21, 294.3, 297.72, 303.9, 305.76, 294.23, 297.39, 345.65, 364.09, 338.79, 327.9, 335.49, 356.7, 349.24, 362.05, 362.55, 358.39, 342.65, 377.96, 386.08, 401.1, 339.81, 341.45, 349.85, 343.5, 339.89, 325.49, 330.73, 310.51, 331.17, 332.65, 321.7, 332.77, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 425.19, 414.14, 446.77, 385.73, 382.07, 392.13, 372.45, 370.78, 388.73] },
      velocityScore: { '1D': 0.8, '1W': 8.5, '1M': 32.2, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 64.9, revenueGrowth: 48, eps: 5.99, grossMargin: 76, dividendYield: 0.68,
      etfPresence: { SOXX: 7.15, PSI: false, XSD: 2.52, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 3.32, proScore: 1.66, coverage: 0.5,
      price: 308.37, weeklyPrices: [301.32, 308.53, 311.46, 298.57, 308.37], weeklyChange: 2.34, dayChange: 3.28, sortRank: 0, periodReturns: { '1M': -1.6, 'YTD': 77.7, '6M': 59.4, '1Y': 40.1 },
      priceHistory: { '1D': [298.57, 307.45, 308.37], '1W': [301.32, 308.53, 311.46, 298.57, 308.37], '1M': [313.34, 305.71, 301.88, 322.86, 332.28, 304.36, 303.11, 311.81, 285.43, 285.48, 298.07, 298.41, 293.08, 303.5, 293.3, 301.32, 308.53, 311.46, 298.57, 308.37], 'YTD': [173.49, 188.45, 191.58, 196.59, 225.01, 218.77, 223.32, 213.9, 202.39, 190.05, 188.29, 193.41, 194.87, 216.71, 233.7, 269.5, 280.89, 295.17, 302.31, 317.45, 305.37, 297.1, 322.86, 285.43, 293.3, 308.37], '6M': [193.45, 194.99, 218.97, 223.98, 223, 219.73, 212.11, 197.98, 190.05, 188.29, 193.41, 194.87, 214.73, 229.82, 277.14, 281.02, 287.8, 302.73, 309.21, 305.68, 285.06, 301.12, 332.28, 285.48, 293.3, 308.37], '1Y': [220.05, 214.57, 189.25, 182.73, 183.71, 194.33, 205.97, 202.48, 185.82, 178.2, 179.62, 183.23, 181.81, 175.11, 179.59, 169.41, 161.46, 160.58, 154.99, 161.26, 168.16, 180.94, 177.97, 178.82, 175.42, 185.71, 193.45, 194.99, 218.97, 223.98, 223, 219.73, 212.63, 197.98, 190.05, 188.29, 193.41, 194.87, 214.73, 229.82, 277.14, 281.02, 287.8, 302.73, 309.21, 305.68, 285.06, 301.12, 332.28, 285.48, 293.3, 308.37] },
      velocityScore: { '1D': 0.6, '1W': 3.7, '1M': 17.7, '6M': null }, isNew: false,
      marketCap: '$281B', pe: 52.7, revenueGrowth: 19, eps: 5.85, grossMargin: 57, dividendYield: 1.82,
      etfPresence: { SOXX: 4.06, PSI: false, XSD: 2.58, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 3.26, proScore: 1.63, coverage: 0.5,
      price: 228.58, weeklyPrices: [231.71, 243.27, 235.81, 217.53, 228.58], weeklyChange: -1.35, dayChange: 5.08, sortRank: 0, periodReturns: { '1M': -26, 'YTD': 169, '6M': 181.5, '1Y': 215.2 },
      priceHistory: { '1D': [217.53, 226.66, 228.58], '1W': [231.71, 243.27, 235.81, 217.53, 228.58], '1M': [308.88, 278.67, 289.54, 310.58, 307.86, 279.04, 276.7, 281.26, 266.77, 277.75, 297.89, 272.05, 245.29, 249.27, 230.7, 231.71, 243.27, 235.81, 217.53, 228.58], 'YTD': [84.98, 83.45, 80.46, 81.77, 78.66, 82.35, 79.09, 80.92, 78.09, 87.67, 89.53, 97.68, 107.11, 131.3, 147.84, 158.21, 163.66, 164.5, 176.27, 198.7, 316.43, 280.71, 310.58, 266.77, 230.7, 228.58], '6M': [81.21, 83.1, 81.34, 74.21, 78.23, 79.48, 81.69, 75.68, 87.67, 89.53, 97.68, 107.11, 128.49, 139.69, 164.31, 164.95, 170.13, 176.89, 196.33, 205, 263.47, 279.7, 307.86, 277.75, 230.7, 228.58], '1Y': [72.51, 73.06, 75.91, 76.53, 77.28, 76.74, 72.95, 62.87, 66, 67.43, 75.53, 82.39, 88.92, 89.39, 85.84, 88.71, 90.37, 93.23, 83.45, 83.79, 91.1, 92, 84.26, 84.8, 86.76, 84.64, 81.21, 83.1, 81.34, 74.21, 78.23, 79.48, 79.29, 75.68, 87.67, 89.53, 97.68, 107.11, 128.49, 139.69, 164.31, 164.95, 170.13, 176.89, 196.33, 205, 263.47, 279.7, 307.86, 277.75, 230.7, 228.58] },
      velocityScore: { '1D': -3, '1W': -7.9, '1M': -48.7, '6M': null }, isNew: false,
      marketCap: '$205B', pe: 78.5, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.11,
      etfPresence: { SOXX: 4.42, PSI: false, XSD: 2.11, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.99, proScore: 1.49, coverage: 0.5,
      price: 288.35, weeklyPrices: [283.81, 290.54, 292.26, 278.39, 288.35], weeklyChange: 1.6, dayChange: 3.58, sortRank: 0, periodReturns: { '1M': -8.7, 'YTD': 32.8, '6M': 19.7, '1Y': 28.4 },
      priceHistory: { '1D': [278.39, 288.03, 288.35], '1W': [283.81, 290.54, 292.26, 278.39, 288.35], '1M': [315.88, 302.89, 298.2, 313.27, 323.24, 299.94, 294.06, 298.64, 277.02, 278.37, 281.03, 279.18, 273.36, 280.51, 273.15, 283.81, 290.54, 292.26, 278.39, 288.35], 'YTD': [217.06, 237.89, 237.11, 231.05, 231.08, 228.91, 237.33, 235.07, 216.37, 191.22, 192.35, 196.92, 194.55, 208, 221.34, 236.87, 290.76, 294.23, 294.28, 329.24, 322.22, 302.55, 313.27, 277.02, 273.15, 288.35], '6M': [240.81, 236.75, 233.5, 222.13, 242.19, 232.27, 227.01, 210.58, 191.22, 192.35, 196.92, 194.55, 204.37, 216.03, 244.04, 295.24, 294.75, 291.5, 316.47, 321.35, 295.96, 304.86, 323.24, 278.37, 273.15, 288.35], '1Y': [224.61, 228.27, 228.49, 211.99, 205.16, 232.01, 236.67, 234.85, 225.5, 219.27, 225.73, 226.11, 231.42, 216.7, 219.82, 221.56, 210.39, 205.13, 190.51, 191.56, 199.49, 229.01, 231.83, 228.94, 219.98, 239.34, 240.81, 236.75, 233.5, 222.13, 242.19, 232.27, 232.23, 210.58, 191.22, 192.35, 196.92, 194.55, 204.37, 216.03, 244.04, 295.24, 294.75, 291.5, 316.47, 321.35, 295.96, 304.86, 323.24, 278.37, 273.15, 288.35] },
      velocityScore: { '1D': 0, '1W': 4.2, '1M': 9.6, '6M': null }, isNew: false,
      marketCap: '$73B', pe: 27.6, revenueGrowth: 12, eps: 10.46, grossMargin: 56, dividendYield: 1.39,
      etfPresence: { SOXX: 3.6, PSI: false, XSD: 2.38, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 2.7, proScore: 1.35, coverage: 0.5,
      price: 186.68, weeklyPrices: [186.56, 191.11, 189.16, 183.98, 186.68], weeklyChange: 0.06, dayChange: 1.47, sortRank: 0, periodReturns: { '1M': -15.5, 'YTD': 9.1, '6M': 13.5, '1Y': 21 },
      priceHistory: { '1D': [183.98, 186.95, 186.79, 186.68], '1W': [186.56, 191.11, 189.16, 183.98, 186.68], '1M': [220.81, 214.07, 212.97, 226.11, 221.9, 204.13, 197.41, 204.9, 189.39, 188.72, 184.79, 181.92, 176.25, 186.48, 182.97, 186.56, 191.11, 189.16, 183.98, 186.68], 'YTD': [171.05, 181.87, 159.42, 154.52, 152.62, 138.93, 143.24, 145.82, 139.51, 131.15, 131.28, 130.54, 126.8, 131.24, 137.52, 150.26, 168.38, 210.31, 195.61, 233.4, 242.57, 202.96, 226.11, 189.39, 182.97, 186.68], '6M': [164.54, 157.8, 152.22, 136.3, 138.47, 142.88, 142.36, 137, 131.15, 131.28, 130.54, 126.8, 128.06, 136.2, 148.85, 177.01, 219.09, 201.49, 238.16, 251.02, 215.94, 211.72, 221.9, 188.72, 182.97, 186.68], '1Y': [154.29, 158.97, 161.05, 147.51, 147.97, 158.9, 156.42, 160.73, 160.24, 161.22, 169.72, 165.3, 168.62, 161.78, 167.04, 187.68, 180.72, 171.57, 166.75, 165.06, 168.04, 175.31, 179.26, 174.22, 173.65, 180.19, 164.54, 157.8, 152.22, 136.3, 138.47, 142.88, 145.59, 137, 131.15, 131.28, 130.54, 126.8, 128.06, 136.2, 148.85, 177.01, 219.09, 201.49, 238.16, 251.02, 215.94, 211.72, 221.9, 188.72, 182.97, 186.68] },
      velocityScore: { '1D': 2.3, '1W': 3.8, '1M': -8.2, '6M': null }, isNew: false,
      marketCap: '$197B', pe: 20.6, revenueGrowth: -4, eps: 9.05, grossMargin: 55, dividendYield: 1.95,
      etfPresence: { SOXX: 3.05, PSI: false, XSD: 2.35, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.65, proScore: 1.33, coverage: 0.5,
      price: 1363.93, weeklyPrices: [1315.51, 1374.13, 1352.74, 1291.38, 1363.93], weeklyChange: 3.68, dayChange: 5.62, sortRank: 0, periodReturns: { '1M': -17.5, 'YTD': 50.5, '6M': 38.7, '1Y': 89.1 },
      priceHistory: { '1D': [1291.38, 1351.15, 1360.81, 1363.93], '1W': [1315.51, 1374.13, 1352.74, 1291.38, 1363.93], '1M': [1652.29, 1498.77, 1448.21, 1563.7, 1537.88, 1423.76, 1434.95, 1438.3, 1313.32, 1312.77, 1382.36, 1331.73, 1288.16, 1346.13, 1272.81, 1315.51, 1374.13, 1352.74, 1291.38, 1363.93], 'YTD': [906.36, 959.09, 1033.17, 1068.14, 1173.22, 1206.18, 1188.32, 1231.95, 1099.02, 1033.88, 1092.69, 1058.28, 1118.49, 1372.23, 1490.86, 1587.57, 1573.3, 1599.52, 1468.11, 1620.17, 1652.6, 1589.55, 1563.7, 1313.32, 1272.81, 1363.93], '6M': [983.6, 1076.67, 1183.15, 1155.99, 1155.93, 1204.1, 1142.74, 1078.44, 1033.88, 1092.69, 1058.28, 1118.49, 1353.85, 1468.35, 1632.06, 1583.48, 1600.84, 1550.02, 1589.81, 1566.21, 1481.05, 1577.32, 1537.88, 1312.77, 1272.81, 1363.93], '1Y': [721.14, 724.77, 738.55, 830.63, 797.51, 850.31, 837.86, 835.76, 864.32, 849.71, 922.81, 886.59, 968.1, 981.67, 1031.59, 1105.05, 1003.93, 976.31, 897.01, 892.97, 928.35, 983.58, 949.4, 945.16, 923.91, 959.08, 983.6, 1076.67, 1183.15, 1155.99, 1155.93, 1204.1, 1180.13, 1078.44, 1033.88, 1092.69, 1058.28, 1118.49, 1353.85, 1468.35, 1632.06, 1583.48, 1600.84, 1550.02, 1589.81, 1566.21, 1481.05, 1577.32, 1537.88, 1312.77, 1272.81, 1363.93] },
      velocityScore: { '1D': 0.8, '1W': 1.5, '1M': -2.9, '6M': null }, isNew: false,
      marketCap: '$67B', pe: 102.6, revenueGrowth: 26, eps: 13.3, grossMargin: 55, dividendYield: 0.59,
      etfPresence: { SOXX: 3.17, PSI: false, XSD: 2.14, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 2.65, proScore: 1.32, coverage: 0.5,
      price: 380.41, weeklyPrices: [393.16, 417.45, 412.97, 362.05, 380.41], weeklyChange: -3.24, dayChange: 5.07, sortRank: 0, periodReturns: { '1M': -2.3, 'YTD': 128.7, '6M': 121, '1Y': 321.2 },
      priceHistory: { '1D': [362.05, 376.09, 380.41], '1W': [393.16, 417.45, 412.97, 362.05, 380.41], '1M': [389.2, 361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86, 406.42, 432.74, 382.89, 393.16, 417.45, 412.97, 362.05, 380.41], 'YTD': [166.36, 156.73, 182, 163.25, 152.44, 187.67, 129.58, 128.15, 113.77, 119.9, 126.16, 113.61, 117.14, 166.79, 175.8, 196.64, 201.25, 204.42, 244.26, 325.33, 358.05, 367.47, 417.07, 391.74, 382.89, 380.41], '6M': [172.14, 176.35, 160.46, 142.82, 126.58, 129.68, 118.83, 120, 119.9, 126.16, 113.61, 117.14, 149.05, 174.05, 212.84, 202.68, 199.79, 232.68, 306.88, 342.85, 317.06, 367.15, 439.66, 455.96, 382.89, 380.41], '1Y': [90.32, 121.89, 124.05, 137.93, 179.43, 186.43, 174.15, 182.2, 216.1, 231.29, 237.3, 198.8, 220.81, 199.53, 156.31, 170.28, 191.56, 173.74, 141.39, 147.75, 165.19, 175.74, 143.66, 172.62, 170.84, 165.77, 172.14, 176.35, 160.46, 142.82, 126.58, 129.68, 124.67, 120, 119.9, 126.16, 113.61, 117.14, 149.05, 174.05, 212.84, 202.68, 199.79, 232.68, 306.88, 342.85, 317.06, 367.15, 439.66, 455.96, 382.89, 380.41] },
      velocityScore: { '1D': -8.3, '1W': -12, '1M': -23.3, '6M': null }, isNew: false,
      marketCap: '$65B', pe: 257, revenueGrowth: 93, eps: 1.48, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.62, PSI: false, XSD: 2.68, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.33, proScore: 1.17, coverage: 0.5,
      price: 87.89, weeklyPrices: [85.49, 88.26, 88.59, 84.23, 87.89], weeklyChange: 2.8, dayChange: 4.34, sortRank: 0, periodReturns: { '1M': -12.4, 'YTD': 37.9, '6M': 17.7, '1Y': 18.7 },
      priceHistory: { '1D': [84.23, 88.07, 88.11, 87.89], '1W': [85.49, 88.26, 88.59, 84.23, 87.89], '1M': [100.32, 95.63, 94.11, 99.77, 102.71, 93.26, 92.48, 94.12, 87.93, 89.06, 91.2, 88.69, 84.64, 87.59, 84.15, 85.49, 88.26, 88.59, 84.23, 87.89], 'YTD': [63.72, 73.53, 74.7, 74.79, 78.08, 74.41, 79.11, 75.47, 69.9, 62.73, 63.29, 64.2, 65.6, 73.55, 80.39, 86.84, 95.3, 97.7, 91.81, 96.85, 96.3, 92.94, 99.77, 87.93, 84.15, 87.89], '6M': [74.68, 75.47, 79.36, 78.04, 78.92, 77.73, 74.64, 67.81, 62.73, 63.29, 64.2, 65.6, 71.56, 78.76, 89.44, 93.95, 99.09, 93.85, 93.43, 94.65, 88.34, 95.24, 102.71, 89.06, 84.15, 87.89], '1Y': [74.05, 73.85, 70.53, 66.59, 60.95, 65.56, 68.55, 65, 65.3, 63.17, 65.4, 64.07, 66.59, 64.39, 67.07, 64.55, 62.41, 55.41, 51.7, 51.25, 53.43, 67.35, 67.18, 66.24, 64.68, 73.94, 74.68, 75.47, 79.36, 78.04, 78.92, 77.73, 74.97, 67.81, 62.73, 63.29, 64.2, 65.6, 71.56, 78.76, 89.44, 93.95, 99.09, 93.85, 93.43, 94.65, 88.34, 95.24, 102.71, 89.06, 84.15, 87.89] },
      velocityScore: { '1D': 0, '1W': 1.7, '1M': 0.9, '6M': null }, isNew: false,
      marketCap: '$48B', pe: 399.5, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 2.16,
      etfPresence: { SOXX: 2.32, PSI: false, XSD: 2.34, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.23, proScore: 1.12, coverage: 0.5,
      price: 246.93, weeklyPrices: [258.69, 265.65, 257.79, 236.88, 246.93], weeklyChange: -4.55, dayChange: 4.24, sortRank: 0, periodReturns: { '1M': -4.8, 'YTD': 71.6, '6M': 57.4, '1Y': 150.2 },
      priceHistory: { '1D': [236.88, 245.52, 246.93], '1W': [258.69, 265.65, 257.79, 236.88, 246.93], '1M': [259.41, 239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.09, 241.91, 265.55, 246.4, 258.69, 265.65, 257.79, 236.88, 246.93], 'YTD': [143.89, 141.59, 150.97, 128.02, 119.96, 123.41, 127.91, 123.46, 102.54, 111.57, 107.09, 96.44, 101.45, 134.36, 174.53, 180.5, 180.06, 198.57, 168.99, 221.23, 217.5, 264.76, 271.83, 238, 246.4, 246.93], '6M': [156.84, 135.1, 129.47, 98.06, 121.78, 124.06, 112.27, 114.74, 111.57, 107.09, 96.44, 101.45, 119.59, 160.69, 195.04, 184.38, 188.51, 172.17, 218.41, 236.03, 206.89, 250.81, 302.52, 245.68, 246.4, 246.93], '1Y': [98.7, 95.74, 107.95, 114.7, 118.57, 118.74, 115.41, 123.06, 147.53, 163.98, 164.1, 146.01, 147.42, 149.9, 151.66, 154.96, 180.64, 170.16, 145.58, 150.85, 171.13, 178.94, 142.02, 149.94, 144.92, 141, 156.84, 135.1, 129.47, 98.06, 121.78, 124.06, 114.48, 114.74, 111.57, 107.09, 96.44, 101.45, 119.59, 160.69, 195.04, 184.38, 188.51, 172.17, 218.41, 236.03, 206.89, 250.81, 302.52, 245.68, 246.4, 246.93] },
      velocityScore: { '1D': -3.4, '1W': -5.1, '1M': -14.5, '6M': null }, isNew: false,
      marketCap: '$46B', pe: 98.4, revenueGrowth: 157, eps: 2.51, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 2.03, PSI: false, XSD: 2.44, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 1.91, proScore: 0.95, coverage: 0.5,
      price: 94.14, weeklyPrices: [93.79, 97.87, 95.96, 90.37, 94.14], weeklyChange: 0.37, dayChange: 4.17, sortRank: 0, periodReturns: { '1M': -25.2, 'YTD': 73.8, '6M': 55.4, '1Y': 59.4 },
      priceHistory: { '1D': [90.37, 94.16, 94.37, 94.14], '1W': [93.79, 97.87, 95.96, 90.37, 94.14], '1M': [125.9, 118.25, 112.92, 121.62, 131.55, 117.06, 115.74, 118.74, 90.65, 88.57, 94.54, 94.63, 91.22, 94.69, 91.1, 93.79, 97.87, 95.96, 90.37, 94.14], 'YTD': [54.15, 60.89, 60.33, 61.13, 61.53, 65.1, 70.66, 69.68, 62.53, 57.69, 59.29, 60.87, 62.19, 71.02, 85.56, 98.04, 102.04, 104.11, 106.02, 124.89, 131.82, 115.96, 121.62, 90.65, 91.1, 94.14], '6M': [60.58, 63.07, 62.2, 63.1, 70.63, 69.11, 66.48, 60.85, 57.69, 59.29, 60.87, 62.19, 68.65, 83.01, 98.4, 103.03, 103.2, 113.11, 116.2, 120.62, 117.26, 116.79, 131.55, 88.57, 91.1, 94.14], '1Y': [59.07, 60.55, 58.66, 47.97, 47.1, 50.53, 50.95, 49.59, 48.88, 48.11, 51.5, 49.76, 50.35, 50.11, 54.89, 52.68, 50.46, 48.54, 46.02, 47.39, 50.43, 56.38, 55.09, 56.37, 54.24, 61.89, 60.58, 63.07, 62.2, 63.1, 70.63, 69.11, 68.16, 60.85, 57.69, 59.29, 60.87, 62.19, 68.65, 83.01, 98.4, 103.03, 103.2, 113.11, 116.2, 120.62, 117.26, 116.79, 131.55, 88.57, 91.1, 94.14] },
      velocityScore: { '1D': -2.1, '1W': 0, '1M': -26.9, '6M': null }, isNew: false,
      marketCap: '$37B', pe: 69.2, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 1.82, PSI: false, XSD: 2, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 2, avgWeight: 1.54, proScore: 0.77, coverage: 0.5,
      price: 306.63, weeklyPrices: [305.23, 317.35, 308.52, 294.24, 306.63], weeklyChange: 0.46, dayChange: 4.21, sortRank: 0, periodReturns: { '1M': -20.3, 'YTD': 79, '6M': 42.6, '1Y': 124.4 },
      priceHistory: { '1D': [294.24, 306.15, 306.63], '1W': [305.23, 317.35, 308.52, 294.24, 306.63], '1M': [384.77, 368.32, 367.11, 391.41, 396.26, 372.15, 373.08, 390.19, 369.18, 372.59, 380.37, 350.63, 322.26, 327.64, 304.82, 305.23, 317.35, 308.52, 294.24, 306.63], 'YTD': [171.28, 167.66, 220.68, 218.89, 228.56, 235.7, 246.76, 253.37, 239, 215.94, 224.54, 228.5, 238.3, 263.63, 281.08, 279.44, 291.72, 362.76, 358.98, 400.66, 382.74, 374.76, 391.41, 369.18, 304.82, 306.63], '6M': [215.01, 224.29, 227.73, 227.8, 238.99, 243.59, 248.12, 228.98, 215.94, 224.54, 228.5, 238.3, 258.11, 276.97, 287.64, 284.18, 359.88, 375.6, 385.98, 364.64, 345.4, 379.87, 396.26, 372.59, 304.82, 306.63], '1Y': [136.63, 140.58, 139.58, 140, 118.35, 124.55, 126.69, 128.15, 130.25, 131.42, 129.49, 123.29, 131.71, 130.53, 140.33, 146.39, 150.19, 178.42, 159.83, 165.97, 172.85, 185.54, 175.29, 175.19, 174.87, 170.62, 215.01, 224.29, 227.73, 227.8, 238.99, 243.59, 247.11, 228.98, 215.94, 224.54, 228.5, 238.3, 258.11, 276.97, 287.64, 284.18, 359.88, 375.6, 385.98, 364.64, 345.4, 379.87, 396.26, 372.59, 304.82, 306.63] },
      velocityScore: { '1D': 0, '1W': -4.9, '1M': -18.9, '6M': null }, isNew: false,
      marketCap: '$23B', pe: 136.9, revenueGrowth: 23, eps: 2.24, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: 1.05, PSI: false, XSD: 2.02, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SWKS', name: 'SKYWORKS SOLUTIONS INC', easyScore: 2, avgWeight: 1.23, proScore: 0.62, coverage: 0.5,
      price: 58.4, weeklyPrices: [58.49, 59.95, 60.38, 58.24, 58.40], weeklyChange: -0.15, dayChange: 0.27, sortRank: 0, periodReturns: { '1M': -23.4, 'YTD': -7.9, '6M': -2.4, '1Y': -21.5 },
      priceHistory: { '1D': [58.24, 58.55, 58.54, 58.4], '1W': [58.49, 59.95, 60.38, 58.24, 58.4], '1M': [76.26, 71.42, 69.38, 72.45, 76.18, 73.44, 71.4, 69.94, 68, 67.71, 67.8, 65.93, 62.56, 61.91, 59.76, 58.49, 59.95, 60.38, 58.24, 58.4], 'YTD': [63.41, 60.66, 57.77, 59.76, 56.83, 61.55, 62, 59.82, 56.28, 55.2, 54.12, 56.66, 55.19, 56.5, 59.46, 62.12, 68.85, 66.31, 70.35, 78.68, 79.93, 72.73, 72.45, 68, 59.76, 58.4], '6M': [59.86, 59.67, 55.79, 60.92, 60.73, 60.05, 59.58, 56.48, 55.2, 54.12, 56.66, 55.19, 56.36, 58.99, 63.65, 69.4, 66.78, 68.53, 82.42, 77.85, 73.57, 73.97, 76.18, 67.71, 59.76, 58.4], '1Y': [74.43, 72.72, 71.32, 67.94, 70.53, 74.26, 76.76, 74.94, 75.63, 72.87, 82.97, 76.93, 76.91, 73.37, 76.14, 75.84, 76.54, 69.1, 63.16, 63.05, 65.83, 69.21, 66.37, 65.24, 64.46, 59.82, 59.86, 59.67, 55.79, 60.92, 60.73, 60.05, 59.61, 56.48, 55.2, 54.12, 56.66, 55.19, 56.36, 58.99, 63.65, 69.4, 66.78, 68.53, 82.42, 77.85, 73.57, 73.97, 76.18, 67.71, 59.76, 58.4] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$9B', pe: 24.3, revenueGrowth: -1, eps: 2.4, grossMargin: 41, dividendYield: 4.88,
      etfPresence: { SOXX: 0.45, PSI: false, XSD: 2.02, DRAM: false },
      tonyNote: 'SKYWORKS SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 8, avgWeight: 5.89, proScore: 2.77, coverage: 0.471,
      price: 981.21, weeklyPrices: [948.80, 991.64, 979.30, 937.00, 981.21], weeklyChange: 3.42, dayChange: 4.72, sortRank: 0, periodReturns: { '1M': -9.8, 'YTD': 243.8, '6M': 194.3, '1Y': 727.3 },
      priceHistory: { '1D': [937, 977.69, 981.21], '1W': [948.8, 991.64, 979.3, 937, 981.21], '1M': [1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 938.38, 948.8, 991.64, 979.3, 937, 981.21], 'YTD': [285.41, 327.02, 362.75, 389.09, 437.8, 383.5, 420.95, 429, 400.77, 405.35, 444.27, 355.46, 366.24, 426.56, 448.42, 524.56, 576.45, 766.58, 698.74, 928.41, 996, 995.87, 1133.99, 1132.33, 938.38, 981.21], '6M': [333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 971, 864.01, 981.61, 1211.38, 1145.28, 938.38, 981.21], '1Y': [118.61, 113.23, 111.25, 107.77, 123.72, 123.55, 116.42, 119.01, 131.46, 157.77, 164.62, 163.9, 190.96, 192.77, 206.77, 220.1, 234.7, 253.3, 241.95, 223.93, 240.46, 246.92, 237.5, 276.59, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 415.56, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 971, 864.01, 981.61, 1211.38, 1145.28, 938.38, 981.21] },
      velocityScore: { '1D': 0.7, '1W': 0.4, '1M': 23.7, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 23.2, revenueGrowth: 346, eps: 42.35, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { PTF: 4.92, WCLD: false, IGV: false, FDTX: 9.33, GTEK: false, ARKK: false, MARS: false, FRWD: 4.42, BCTK: 4.41, FWD: false, CBSE: false, FCUS: 4.32, WGMI: false, CNEQ: 2.39, SGRT: 6.74, SPMO: 10.58, XMMO: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 7, avgWeight: 6.45, proScore: 2.66, coverage: 0.412,
      price: 204.75, weeklyPrices: [204.12, 202.78, 210.96, 203.53, 204.75], weeklyChange: 0.31, dayChange: 0.6, sortRank: 0, periodReturns: { '1M': -3.6, 'YTD': 9.8, '6M': 11.8, '1Y': 24.8 },
      priceHistory: { '1D': [203.53, 204.93, 204.75], '1W': [204.12, 202.78, 210.96, 203.53, 204.75], '1M': [212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83, 195.55, 196.93, 204.12, 202.78, 210.96, 203.53, 204.75], 'YTD': [186.5, 185.04, 186.23, 186.47, 185.61, 190.04, 187.98, 195.56, 183.04, 183.14, 178.56, 171.24, 177.39, 189.31, 202.06, 216.61, 198.48, 220.78, 220.61, 212.6, 218.66, 204.87, 210.69, 192.53, 196.93, 204.75], '6M': [183.14, 184.84, 192.51, 171.88, 186.94, 189.82, 177.19, 183.34, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 225.32, 215.33, 211.14, 205.1, 205.19, 208.65, 194.97, 196.93, 204.75], '1Y': [164.07, 171.38, 176.75, 180, 182.06, 182.01, 179.81, 174.18, 168.31, 177.75, 183.61, 181.85, 185.54, 188.32, 182.64, 191.49, 206.88, 199.05, 186.6, 182.55, 179.92, 185.55, 176.29, 183.69, 187.54, 189.11, 183.14, 184.84, 192.51, 171.88, 186.94, 189.82, 184.89, 183.34, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 225.32, 215.33, 211.14, 205.1, 205.19, 208.65, 194.97, 196.93, 204.75] },
      velocityScore: { '1D': -0.4, '1W': 1.1, '1M': 16.2, '6M': null }, isNew: false,
      marketCap: '$5.0T', pe: 31.4, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.47,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.09, GTEK: false, ARKK: 1.61, MARS: false, FRWD: 8.89, BCTK: 6.2, FWD: false, CBSE: false, FCUS: false, WGMI: 2.33, CNEQ: 13.76, SGRT: false, SPMO: 8.27, XMMO: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 7, avgWeight: 4.39, proScore: 1.81, coverage: 0.412,
      price: 425.57, weeklyPrices: [436.98, 436.96, 434.11, 421.58, 425.57], weeklyChange: -2.61, dayChange: 0.94, sortRank: 0, periodReturns: { '1M': -3.6, 'YTD': 40, '6M': 30.1, '1Y': 86.1 },
      priceHistory: { '1D': [421.6, 425.19, 425.57], '1W': [436.98, 436.96, 434.11, 421.58, 425.57], '1M': [441.4, 425.83, 432.15, 462.12, 467.67, 436.39, 440.83, 434.99, 432.35, 455.1, 477.57, 444.23, 434.16, 451.79, 432.57, 436.98, 436.96, 434.11, 421.58, 425.57], 'YTD': [303.89, 318.01, 342.4, 332.71, 341.36, 355.41, 362.26, 387.73, 357.44, 336.71, 338.79, 326.11, 339.04, 369.57, 366.24, 404.98, 401.61, 397.28, 392.61, 422.73, 444.92, 421.07, 462.12, 432.35, 432.57, 425.57], '6M': [327.11, 327.37, 339.55, 330.73, 368.1, 370.54, 374.58, 353.86, 336.71, 338.79, 326.11, 339.04, 370.6, 370.5, 402.46, 397.67, 411.68, 404.35, 404.52, 418.45, 415.17, 423.93, 467.67, 455.1, 432.57, 425.57], '1Y': [228.67, 238.85, 242.75, 239, 242.09, 241.41, 235.59, 230.87, 247.19, 261.38, 272.63, 273.23, 302.4, 302.89, 297.7, 298.25, 304.86, 295.27, 282.01, 284.64, 287.68, 301.87, 287.74, 293.28, 299.58, 318.68, 327.11, 327.37, 339.55, 330.73, 368.1, 370.54, 376.81, 353.86, 336.71, 338.79, 326.11, 339.04, 370.6, 370.5, 402.46, 397.67, 411.68, 404.35, 404.52, 418.45, 415.17, 423.93, 467.67, 455.1, 432.57, 425.57] },
      velocityScore: { '1D': 0, '1W': -1.6, '1M': -4.2, '6M': null }, isNew: false,
      marketCap: '$2.2T', pe: 37, revenueGrowth: 35, eps: 11.51, grossMargin: 62, dividendYield: 0.87,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6.39, GTEK: false, ARKK: 0.9, MARS: false, FRWD: 5.92, BCTK: 8.52, FWD: false, CBSE: 2.61, FCUS: false, WGMI: 0.72, CNEQ: 5.67, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 7, avgWeight: 3.92, proScore: 1.61, coverage: 0.412,
      price: 563.2, weeklyPrices: [517.41, 546.72, 557.89, 534.39, 563.20], weeklyChange: 8.85, dayChange: 5.39, sortRank: 0, periodReturns: { '1M': 2.9, 'YTD': 163, '6M': 151.9, '1Y': 285.1 },
      priceHistory: { '1D': [534.39, 562.4, 563.2], '1W': [517.41, 546.72, 557.89, 534.39, 563.2], '1M': [547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 516.11, 517.41, 546.72, 557.89, 534.39, 563.2], 'YTD': [214.16, 204.68, 231.83, 251.31, 246.27, 216, 200.12, 210.86, 202.07, 197.74, 205.27, 203.77, 217.5, 246.83, 274.95, 334.63, 341.54, 448.29, 414.05, 495.54, 523.2, 488.45, 537.37, 521.58, 516.11, 563.2], '6M': [223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 200.21, 199.45, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 467.51, 516.1, 466.38, 511.57, 551.63, 539.49, 516.11, 563.2], '1Y': [146.24, 157, 173.66, 176.78, 172.28, 176.14, 163.36, 162.63, 151.41, 161.16, 159.79, 161.36, 203.71, 216.42, 240.56, 259.67, 259.65, 243.98, 240.52, 215.05, 219.76, 221.11, 207.58, 214.95, 215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 203.68, 199.45, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 467.51, 516.1, 466.38, 511.57, 551.63, 539.49, 516.11, 563.2] },
      velocityScore: { '1D': -1.2, '1W': -5.8, '1M': 0.6, '6M': null }, isNew: false,
      marketCap: '$918B', pe: 188.4, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: 3.13, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.2, MARS: false, FRWD: 7.71, BCTK: 3.5, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 1.13, SGRT: 3.39, SPMO: 4.38, XMMO: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 7, avgWeight: 3.92, proScore: 1.61, coverage: 0.412,
      price: 388.73, weeklyPrices: [388.69, 401.11, 399.97, 384.05, 388.73], weeklyChange: 0.01, dayChange: 1.22, sortRank: 0, periodReturns: { '1M': -1.3, 'YTD': 12.3, '6M': 14.4, '1Y': 41 },
      priceHistory: { '1D': [384.05, 388.45, 388.73], '1W': [388.69, 401.11, 399.97, 384.05, 388.73], '1M': [393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45, 373.9, 370.78, 388.69, 401.11, 399.97, 384.05, 388.73], 'YTD': [346.1, 332.48, 351.71, 324.85, 331.11, 343.94, 333.51, 332.31, 317.53, 335.97, 319.84, 309.42, 314.55, 379.75, 399.63, 418.2, 416.5, 419.3, 411.07, 421.86, 418.91, 385.57, 411.35, 365.02, 370.78, 388.73], '6M': [339.89, 325.49, 330.73, 310.51, 331.17, 332.65, 319.55, 332.77, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 425.19, 414.14, 446.77, 385.73, 382.07, 392.13, 372.45, 370.78, 388.73], '1Y': [275.6, 288.21, 294.3, 297.72, 303.9, 305.76, 294.23, 297.39, 345.65, 364.09, 338.79, 327.9, 335.49, 356.7, 349.24, 362.05, 362.55, 358.39, 342.65, 377.96, 386.08, 401.1, 339.81, 341.45, 349.85, 343.5, 339.89, 325.49, 330.73, 310.51, 331.17, 332.65, 321.7, 332.77, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 425.19, 414.14, 446.77, 385.73, 382.07, 392.13, 372.45, 370.78, 388.73] },
      velocityScore: { '1D': -0.6, '1W': 9.5, '1M': 22.9, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 64.9, revenueGrowth: 48, eps: 5.99, grossMargin: 76, dividendYield: 0.68,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.62, GTEK: false, ARKK: 1.09, MARS: false, FRWD: 5.03, BCTK: 7.15, FWD: 2.01, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.89, SGRT: false, SPMO: 6.64, XMMO: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'SPCX', name: 'SPACE EXPLORATION TECHN-CL A', easyScore: 6, avgWeight: 6.74, proScore: 2.38, coverage: 0.353,
      price: 141.68, weeklyPrices: [148.30, 152.16, 145.30, 139.14, 141.68], weeklyChange: -4.46, dayChange: 1.83, sortRank: 0, periodReturns: { '1M': -26.4, 'YTD': -12, '6M': -12, '1Y': -12 },
      priceHistory: { '1D': [139.14, 141.69, 141.63, 141.68], '1W': [148.3, 152.16, 145.3, 139.14, 141.68], '1M': [192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 149.47, 148.3, 152.16, 145.3, 139.14, 141.68], 'YTD': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 149.47, 148.3, 152.16, 145.3, 139.14, 141.68], '6M': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 149.47, 148.3, 152.16, 145.3, 139.14, 141.68], '1Y': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 149.47, 148.3, 152.16, 145.3, 139.14, 141.68] },
      velocityScore: { '1D': -1.2, '1W': -1.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.9T', pe: null, revenueGrowth: 15, eps: -0.67, grossMargin: 49, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.31, MARS: 22.29, FRWD: 2.2, BCTK: 7.69, FWD: 1.46, CBSE: false, FCUS: false, WGMI: false, CNEQ: 2.48, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'SPACE EXPLORATION TECHN-CL A appears in 6 of 17 Broad Tech ETFs (35% coverage) with average weight 6.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 6, avgWeight: 5.53, proScore: 1.95, coverage: 0.353,
      price: 585.6, weeklyPrices: [550.30, 578.05, 582.59, 555.55, 585.60], weeklyChange: 6.41, dayChange: 5.41, sortRank: 0, periodReturns: { '1M': -10.4, 'YTD': 239.9, '6M': 172.4, '1Y': 774.9 },
      priceHistory: { '1D': [555.55, 580, 585.6], '1W': [550.3, 578.05, 582.59, 555.55, 585.6], '1M': [653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539, 577.46, 532.1, 550.3, 578.05, 582.59, 555.55, 585.6], 'YTD': [172.27, 187.68, 221.51, 240.85, 270.23, 285.99, 296.56, 290.95, 261.3, 261.18, 316.93, 273.35, 294.97, 350.16, 374.11, 400.73, 442.36, 488.74, 455.8, 530.6, 575.5, 529.29, 746.23, 586.45, 532.1, 585.6], '6M': [215, 243.29, 278.41, 260.19, 284.1, 285.52, 279.7, 259.03, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 431.52, 480, 482.02, 484.28, 531.21, 511.72, 562.93, 732.62, 651.88, 532.1, 585.6], '1Y': [66.93, 68.74, 68.99, 77.29, 74.64, 76.29, 79.22, 80.34, 93.29, 102.39, 112.41, 116.74, 125.28, 118.86, 121.53, 126.67, 158.02, 174.22, 162.45, 150.93, 163.54, 169.78, 172.04, 176.76, 176.06, 199.88, 215, 243.29, 278.41, 260.19, 284.1, 285.52, 282.25, 259.03, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 431.52, 480, 482.02, 484.28, 531.21, 511.72, 562.93, 732.62, 651.88, 532.1, 585.6] },
      velocityScore: { '1D': 0, '1W': -5.8, '1M': 45.5, '6M': null }, isNew: false,
      marketCap: '$202B', pe: 36.7, revenueGrowth: 46, eps: 15.94, grossMargin: 45, dividendYield: 0.1,
      etfPresence: { PTF: 4.46, WCLD: false, IGV: false, FDTX: 4.49, GTEK: false, ARKK: false, MARS: false, FRWD: 4.59, BCTK: false, FWD: false, CBSE: false, FCUS: 4.18, WGMI: false, CNEQ: 4.65, SGRT: 10.82, SPMO: false, XMMO: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 5, avgWeight: 4.31, proScore: 1.27, coverage: 0.294,
      price: 902.58, weeklyPrices: [860.02, 890.09, 910.34, 860.66, 902.58], weeklyChange: 4.95, dayChange: 4.87, sortRank: 0, periodReturns: { '1M': -11.4, 'YTD': 227.7, '6M': 189, '1Y': 505.4 },
      priceHistory: { '1D': [860.66, 896.33, 902.58], '1W': [860.02, 890.09, 910.34, 860.66, 902.58], '1M': [1018.8, 1031.34, 1066.07, 1070.23, 1094.04, 1038.59, 993.25, 1025.36, 899.9, 968.53, 965, 915.19, 820.16, 868.26, 827.64, 860.02, 890.09, 910.34, 860.66, 902.58], 'YTD': [275.39, 284.47, 326.23, 358.29, 432.95, 425, 424.14, 421.85, 375.01, 373.98, 434.6, 378.79, 429.36, 513.28, 539.75, 595.86, 738.54, 808.8, 733.35, 870.66, 925.99, 868.09, 1070.23, 899.9, 827.64, 902.58], '6M': [312.28, 346.53, 446.57, 405.45, 431.17, 411.11, 407.84, 367.34, 373.98, 434.6, 378.79, 429.36, 503.13, 547.75, 586.25, 726.93, 782.64, 795.47, 812.73, 879.8, 847.47, 931.04, 1094.04, 968.53, 827.64, 902.58], '1Y': [149.08, 149.63, 150.46, 154.81, 151.69, 158.7, 164, 167.4, 189.24, 211.12, 229.33, 229.14, 242.83, 219.51, 214.4, 230.32, 265.55, 293.99, 261.38, 253.38, 270.1, 285.41, 285.58, 282.85, 280.08, 308.26, 312.28, 346.53, 446.57, 405.45, 431.17, 411.11, 409.67, 367.34, 373.98, 434.6, 378.79, 429.36, 503.13, 547.75, 586.25, 726.93, 782.64, 795.47, 812.73, 879.8, 847.47, 931.04, 1094.04, 968.53, 827.64, 902.58] },
      velocityScore: { '1D': 0, '1W': 2.4, '1M': -20.1, '6M': null }, isNew: false,
      marketCap: '$202B', pe: 86, revenueGrowth: 44, eps: 10.5, grossMargin: 42, dividendYield: 0.34,
      etfPresence: { PTF: 3.9, WCLD: false, IGV: false, FDTX: 4.14, GTEK: false, ARKK: false, MARS: false, FRWD: 7.49, BCTK: false, FWD: false, CBSE: false, FCUS: 4.13, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.9, XMMO: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 5, avgWeight: 4.18, proScore: 1.23, coverage: 0.294,
      price: 350.5, weeklyPrices: [358.71, 356.24, 355.03, 350.67, 350.50], weeklyChange: -2.29, dayChange: -0.05, sortRank: 0, periodReturns: { '1M': -4.5, 'YTD': 11.7, '6M': 4.2, '1Y': 91.7 },
      priceHistory: { '1D': [350.67, 351.08, 350.67, 350.5], '1W': [358.71, 356.24, 355.03, 350.67, 350.5], '1M': [367.11, 371.1, 362.1, 367.46, 348.78, 346.08, 345.04, 342.19, 334.69, 351.28, 353.33, 357.89, 356.18, 364.9, 363.62, 358.71, 356.24, 355.03, 350.67, 350.5], 'YTD': [313.8, 326.01, 330.34, 333.59, 344.9, 324.4, 303.94, 313.03, 303.45, 303.21, 305.73, 280.74, 294.46, 319.21, 335.4, 348.52, 379.64, 383.82, 384.9, 384.83, 369.27, 356.56, 367.46, 334.69, 363.62, 350.5], '6M': [336.31, 330.84, 338.66, 331.33, 309.37, 314.9, 311.43, 300.91, 303.21, 305.73, 280.74, 294.46, 315.72, 339.4, 342.32, 383.22, 397.05, 393.32, 379.38, 376.43, 365.76, 358.16, 348.78, 351.28, 363.62, 350.5], '1Y': [182.81, 191.15, 193.42, 195.75, 201.63, 204.29, 209.16, 213.53, 234.16, 251.76, 252.88, 244.36, 251.51, 244.64, 257.02, 269.93, 284.12, 290.59, 285.6, 318.47, 315.12, 314.45, 309.32, 311.33, 314.55, 322.43, 336.31, 330.84, 338.66, 331.33, 309.37, 314.9, 307.15, 300.91, 303.21, 305.73, 280.74, 294.46, 315.72, 339.4, 342.32, 383.22, 397.05, 393.32, 379.38, 376.43, 365.76, 358.16, 348.78, 351.28, 363.62, 350.5] },
      velocityScore: { '1D': 0, '1W': -0.8, '1M': 41.4, '6M': null }, isNew: false,
      marketCap: '$4.3T', pe: 27.1, revenueGrowth: 22, eps: 12.94, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.21, GTEK: false, ARKK: 1.86, MARS: false, FRWD: false, BCTK: 6.41, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 5.91, SGRT: false, SPMO: 3.52, XMMO: false },
      tonyNote: 'Alphabet Inc Class C appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 4.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 5, avgWeight: 3.22, proScore: 0.95, coverage: 0.294,
      price: 246.53, weeklyPrices: [243.62, 247.04, 245.34, 247.31, 246.53], weeklyChange: 1.19, dayChange: -0.32, sortRank: 0, periodReturns: { '1M': 0.2, 'YTD': 6.8, '6M': 4.2, '1Y': 9.2 },
      priceHistory: { '1D': [247.31, 246.94, 246.53], '1W': [243.62, 247.04, 245.34, 247.31, 246.53], '1M': [246.02, 246, 237.5, 244.39, 232.79, 234.11, 234.27, 227.01, 232.69, 240.14, 238.34, 241.7, 242.67, 244.16, 245.98, 243.62, 247.04, 245.34, 247.31, 246.53], 'YTD': [230.82, 246.29, 239.12, 238.42, 242.96, 208.72, 204.79, 210.64, 216.82, 209.53, 208.76, 207.54, 209.77, 239.89, 248.28, 261.12, 272.05, 265.82, 259.34, 271.85, 253.79, 241.51, 244.39, 232.69, 245.98, 246.53], '6M': [236.65, 234.34, 241.73, 222.69, 199.6, 210.11, 210, 218.94, 209.53, 208.76, 207.54, 209.77, 238.38, 250.56, 263.99, 268.26, 272.68, 264.14, 266.32, 270.64, 246.03, 238.55, 232.79, 240.14, 245.98, 246.53], '1Y': [225.69, 229.3, 232.79, 211.65, 221.3, 231.49, 227.94, 229, 235.84, 231.43, 227.63, 222.17, 220.9, 220.07, 216.48, 226.97, 254, 248.4, 232.87, 226.28, 233.88, 226.89, 222.54, 228.43, 232.53, 241.56, 236.65, 234.34, 241.73, 222.69, 199.6, 210.11, 207.92, 218.94, 209.53, 208.76, 207.54, 209.77, 238.38, 250.56, 263.99, 268.26, 272.68, 264.14, 266.32, 270.64, 246.03, 238.55, 232.79, 240.14, 245.98, 246.53] },
      velocityScore: { '1D': 1.1, '1W': -13.6, '1M': -12, '6M': null }, isNew: false,
      marketCap: '$2.7T', pe: 29.5, revenueGrowth: 17, eps: 8.36, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.29, GTEK: false, ARKK: 2.45, MARS: false, FRWD: false, BCTK: 4.33, FWD: 1.58, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.43, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'CRWD', name: 'CrowdStrike', easyScore: 5, avgWeight: 2.65, proScore: 0.78, coverage: 0.294,
      price: 197.44, weeklyPrices: [191.12, 198.40, 187.18, 187.91, 197.44], weeklyChange: 3.31, dayChange: 5.07, sortRank: 0, periodReturns: { '1M': 14, 'YTD': 68.5, '6M': 71.4, '1Y': 65.9 },
      priceHistory: { '1D': [187.91, 194.65, 197.01, 197.44], '1W': [191.12, 198.4, 187.18, 187.91, 197.44], '1M': [173.23, 169.87, 170.74, 171.21, 168.86, 170.23, 168.26, 169.66, 175.27, 185.73, 190.79, 193.18, 193.98, 199.38, 194.62, 191.12, 198.4, 187.18, 187.91, 197.44], 'YTD': [117.19, 115.97, 113.47, 117.08, 109.71, 102.01, 103.94, 90.83, 101.92, 110.39, 107.04, 98.15, 99.78, 100.56, 108.29, 113.65, 117.31, 136.54, 154.22, 161.34, 179.77, 172.88, 171.21, 175.27, 194.62, 197.44], '6M': [115.18, 113.44, 111.15, 94.29, 102.89, 97.15, 93, 106.54, 110.39, 107.04, 98.15, 99.78, 94.75, 105.99, 112.03, 113.91, 131.94, 148.52, 165.87, 182.75, 167.76, 170.7, 168.86, 185.73, 194.62, 197.44], '1Y': [119.04, 120.39, 118.04, 113.71, 106.61, 106.58, 104.71, 105.93, 107.01, 111.19, 123.29, 122.11, 123.99, 127.15, 125.9, 132.43, 137.98, 139.38, 132.45, 126.71, 126.03, 128.8, 121.87, 120.79, 118.91, 119.73, 115.18, 113.44, 111.15, 94.29, 102.89, 97.15, 95.28, 106.54, 110.39, 107.04, 98.15, 99.78, 94.75, 105.99, 112.03, 113.91, 131.94, 148.52, 165.87, 182.75, 167.76, 170.7, 168.86, 185.73, 194.62, 197.44] },
      velocityScore: { '1D': 0, '1W': -2.5, '1M': -1.3, '6M': null }, isNew: false,
      marketCap: '$201B', pe: null, revenueGrowth: 26, eps: -0.04, grossMargin: 75, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.52, IGV: 7.01, FDTX: 1.21, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 1.26, FWD: 1.23, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'CrowdStrike appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 2.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, avgWeight: 5.15, proScore: 1.21, coverage: 0.235,
      price: 380.6, weeklyPrices: [383.34, 384.36, 385.10, 390.99, 380.60], weeklyChange: -0.71, dayChange: -2.66, sortRank: 0, periodReturns: { '1M': -4.8, 'YTD': -21.3, '6M': -17.1, '1Y': -24.3 },
      priceHistory: { '1D': [390.99, 381.02, 380.6], '1W': [383.34, 384.36, 385.1, 390.99, 380.6], '1M': [399.76, 393.83, 378.91, 379.4, 367.34, 373.94, 365.46, 352.83, 372.97, 368.57, 373.02, 384.28, 390.49, 386.74, 388.84, 383.34, 384.36, 385.1, 390.99, 380.6], 'YTD': [483.62, 478.11, 459.86, 470.28, 423.37, 413.6, 399.6, 400.6, 405.2, 401.86, 389.02, 365.97, 373.46, 384.37, 418.07, 424.82, 413.62, 407.77, 417.42, 412.67, 428.05, 390.34, 379.4, 372.97, 388.84, 380.6], '6M': [459.38, 451.14, 433.5, 393.67, 401.84, 397.23, 392.74, 410.68, 401.86, 389.02, 365.97, 373.46, 370.87, 422.79, 424.62, 414.44, 415.12, 421.92, 418.57, 450.24, 416.67, 390.74, 367.34, 368.57, 388.84, 380.6], '1Y': [503.02, 510.06, 512.5, 535.64, 521.77, 517.1, 504.26, 506.69, 498.2, 515.36, 514.45, 514.6, 528.57, 514.05, 516.79, 531.52, 517.03, 506, 507.49, 474, 486.74, 491.02, 474.82, 484.92, 487.48, 483.47, 459.38, 451.14, 433.5, 393.67, 401.84, 397.23, 401.72, 410.68, 401.86, 389.02, 365.97, 373.46, 370.87, 422.79, 424.62, 414.44, 415.12, 421.92, 418.57, 450.24, 416.67, 390.74, 367.34, 368.57, 388.84, 380.6] },
      velocityScore: { '1D': 1.7, '1W': 1.7, '1M': 7.1, '6M': null }, isNew: false,
      marketCap: '$2.8T', pe: 22.7, revenueGrowth: 18, eps: 16.77, grossMargin: 68, dividendYield: 0.93,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.27, FDTX: 2.93, GTEK: false, ARKK: false, MARS: false, FRWD: 2.99, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 6.4, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'LRCX', name: 'LRCX', easyScore: 4, avgWeight: 4.67, proScore: 1.1, coverage: 0.235,
      price: 347.27, weeklyPrices: [333.15, 353.17, 350.33, 329.92, 347.27], weeklyChange: 4.24, dayChange: 5.26, sortRank: 0, periodReturns: { '1M': -10.7, 'YTD': 102.9, '6M': 66.3, '1Y': 248.6 },
      priceHistory: { '1D': [329.92, 345.52, 347.27, 347.27], '1W': [333.15, 353.17, 350.33, 329.92, 347.27], '1M': [388.92, 369.34, 374.18, 389.04, 409.54, 371.33, 374.8, 401.82, 379.09, 410.91, 433.33, 391.26, 351.41, 350.2, 326.13, 333.15, 353.17, 350.33, 329.92, 347.27], 'YTD': [171.18, 200.96, 222.96, 222.87, 237.5, 229.28, 240.09, 249.48, 222.99, 209.49, 233.99, 211.62, 218.44, 267.32, 263.16, 259.47, 258.57, 289.24, 273.38, 318.93, 336.41, 362.52, 389.04, 379.09, 326.13, 347.27], '6M': [208.79, 220.7, 248.17, 213.31, 231.29, 244.92, 233.89, 214.68, 209.49, 233.99, 211.62, 218.44, 263.66, 267.6, 267.78, 256.72, 294.05, 284.72, 305.35, 318.18, 303.28, 366.81, 409.54, 410.91, 326.13, 347.27], '1Y': [99.62, 101.74, 98.62, 98.41, 102, 98.88, 101.28, 100.15, 105.07, 119.21, 132.2, 131.09, 149.15, 137.81, 144.05, 156.9, 161.24, 166.37, 147.46, 150.38, 154.79, 162.74, 164.3, 175.26, 173.78, 203.08, 208.79, 220.7, 248.17, 213.31, 231.29, 244.92, 239.07, 214.68, 209.49, 233.99, 211.62, 218.44, 263.66, 267.6, 267.78, 256.72, 294.05, 284.72, 305.35, 318.18, 303.28, 366.81, 409.54, 410.91, 326.13, 347.27] },
      velocityScore: { '1D': 0, '1W': -15.4, '1M': -23.1, '6M': null }, isNew: false,
      marketCap: '$434B', pe: 65.8, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.32,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.55, BCTK: 7.49, FWD: 1.83, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 3.81, XMMO: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks', easyScore: 4, avgWeight: 4.5, proScore: 1.06, coverage: 0.235,
      price: 338.75, weeklyPrices: [320.59, 338.31, 325.91, 330.30, 338.75], weeklyChange: 5.66, dayChange: 2.56, sortRank: 0, periodReturns: { '1M': 19.1, 'YTD': 83.9, '6M': 77.4, '1Y': 77.6 },
      priceHistory: { '1D': [330.3, 335.54, 338.7, 338.75], '1W': [320.59, 338.31, 325.91, 330.3, 338.75], '1M': [284.54, 279.9, 282.13, 287.78, 286.4, 290.92, 285.26, 293.09, 304.2, 332, 341.02, 352.04, 348.06, 357.53, 337.04, 320.59, 338.31, 325.91, 330.3, 338.75], 'YTD': [184.2, 190.8, 187.66, 184.22, 175.42, 166, 152.35, 144.84, 158.56, 168.12, 169.74, 156.36, 163.21, 162.51, 169.56, 182.9, 184.56, 215.6, 240.13, 248.47, 279.25, 279.53, 287.78, 304.2, 337.04, 338.75], '6M': [190.93, 182.27, 176.2, 154.77, 162.81, 148.7, 148.92, 163.16, 168.12, 169.74, 156.36, 163.21, 155.73, 167.85, 178.54, 181.08, 207.88, 242.83, 260.58, 281.69, 272.05, 279.62, 286.4, 332, 337.04, 338.75], '1Y': [190.72, 199.88, 204.5, 171, 168.17, 176.17, 184.55, 190.52, 197.38, 201.28, 208.18, 203.96, 212.58, 213.28, 211.82, 220.29, 219.23, 216.54, 202.9, 183.89, 187.73, 195.35, 185.88, 189.49, 186.85, 193.9, 190.93, 182.27, 176.2, 154.77, 162.81, 148.7, 149.4, 163.16, 168.12, 169.74, 156.36, 163.21, 155.73, 167.85, 178.54, 181.08, 207.88, 242.83, 260.58, 281.69, 272.05, 279.62, 286.4, 332, 337.04, 338.75] },
      velocityScore: { '1D': 1, '1W': -4.5, '1M': -6.2, '6M': null }, isNew: false,
      marketCap: '$276B', pe: 292, revenueGrowth: 31, eps: 1.16, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.8, IGV: 9.81, FDTX: 4.15, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.24, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 4, avgWeight: 4.45, proScore: 1.05, coverage: 0.235,
      price: 397.55, weeklyPrices: [394.06, 406.55, 407.76, 394.76, 397.55], weeklyChange: 0.89, dayChange: 0.71, sortRank: 0, periodReturns: { '1M': -3.3, 'YTD': -11.6, '6M': -9.5, '1Y': 25.4 },
      priceHistory: { '1D': [394.76, 397.27, 397.55], '1W': [394.06, 406.55, 407.76, 394.76, 397.55], '1M': [411.15, 404.66, 396.38, 400.49, 405.05, 381.61, 375.53, 375.12, 379.71, 411.84, 420.6, 425.3, 393.45, 419.77, 402.9, 394.06, 406.55, 407.76, 394.76, 397.55], 'YTD': [449.72, 435.8, 437.5, 435.2, 421.81, 417.32, 411.32, 417.4, 405.94, 395.01, 380.3, 372.11, 360.59, 352.42, 392.5, 378.67, 392.51, 433.45, 404.11, 440.36, 418.45, 399.15, 400.49, 379.71, 402.9, 397.55], '6M': [439.2, 449.36, 416.56, 397.21, 417.07, 411.82, 402.51, 405.55, 395.01, 380.3, 372.11, 360.59, 348.95, 400.62, 376.3, 390.82, 428.35, 422.24, 426.01, 435.79, 391, 406.43, 405.05, 411.84, 402.9, 397.55], '1Y': [316.9, 328.49, 325.59, 309.26, 339.03, 335.16, 346.6, 333.87, 346.4, 410.04, 434.21, 443.21, 453.25, 435.9, 447.43, 452.42, 468.37, 445.23, 408.92, 417.78, 430.14, 439.58, 475.31, 488.73, 454.43, 431.41, 439.2, 449.36, 416.56, 397.21, 417.07, 411.82, 408.58, 405.55, 395.01, 380.3, 372.11, 360.59, 348.95, 400.62, 376.3, 390.82, 428.35, 422.24, 426.01, 435.79, 391, 406.43, 405.05, 411.84, 402.9, 397.55] },
      velocityScore: { '1D': -2.8, '1W': -0.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 358.2, revenueGrowth: 16, eps: 1.11, grossMargin: 19, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 10.06, MARS: false, FRWD: false, BCTK: 3.3, FWD: 1.33, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.12, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 4, avgWeight: 3.6, proScore: 0.85, coverage: 0.235,
      price: 124.7, weeklyPrices: [132.22, 129.04, 126.79, 130.04, 124.70], weeklyChange: -5.68, dayChange: -4.1, sortRank: 0, periodReturns: { '1M': -7.4, 'YTD': -29.8, '6M': -30.1, '1Y': -16.4 },
      priceHistory: { '1D': [130.04, 124.07, 124.46, 124.7], '1W': [132.22, 129.04, 126.79, 130.04, 124.7], '1M': [134.71, 133.25, 130.63, 128.47, 119.5, 116.7, 113.5, 107.27, 112.93, 115.7, 116.67, 125.73, 129.3, 132.54, 134.37, 132.22, 129.04, 126.79, 130.04, 124.7], 'YTD': [177.75, 176.86, 170.96, 167.47, 147.76, 142.91, 135.38, 134.19, 153.19, 153.5, 155.68, 147.56, 148.46, 132.37, 145.89, 143.1, 146.03, 136, 135.26, 132.51, 141.7, 131.08, 128.47, 112.93, 134.37, 124.7], '6M': [178.4, 165.9, 151.86, 130.01, 129.13, 135.24, 137.19, 152.67, 153.5, 155.68, 147.56, 148.46, 128.06, 146.39, 143.09, 144.07, 137.8, 133.99, 136.88, 156.54, 135.53, 127.99, 119.5, 115.7, 134.37, 124.7], '1Y': [149.15, 151.79, 157.88, 160.66, 182.68, 174.03, 157.17, 156.71, 156.1, 171.21, 179.33, 178.86, 179.53, 177.21, 181.59, 189.18, 207.18, 193.61, 171.25, 162.25, 167.49, 181.49, 183.25, 193.98, 180.84, 181.68, 178.4, 165.9, 151.86, 130.01, 129.13, 135.24, 135.94, 152.67, 153.5, 155.68, 147.56, 148.46, 128.06, 146.39, 143.09, 144.07, 137.8, 133.99, 136.88, 156.54, 135.53, 127.99, 119.5, 115.7, 134.37, 124.7] },
      velocityScore: { '1D': 2.4, '1W': 1.2, '1M': -12.4, '6M': null }, isNew: false,
      marketCap: '$299B', pe: 141.7, revenueGrowth: 85, eps: 0.88, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.39, FDTX: 2, GTEK: false, ARKK: 2.92, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.1, XMMO: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 4, avgWeight: 3.38, proScore: 0.79, coverage: 0.235,
      price: 1798.51, weeklyPrices: [1727.18, 1858.27, 1915.92, 1673.97, 1798.51], weeklyChange: 4.13, dayChange: 7.44, sortRank: 0, periodReturns: { '1M': -14.7, 'YTD': 657.6, '6M': 363.8, '1Y': 4133.8 },
      priceHistory: { '1D': [1673.97, 1782.61, 1798.51], '1W': [1727.18, 1858.27, 1915.92, 1673.97, 1798.51], '1M': [2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 1745, 1744.43, 1617.7, 1727.18, 1858.27, 1915.92, 1673.97, 1798.51], 'YTD': [237.38, 334.54, 413.62, 470.8, 665.24, 583.4, 600.4, 632.38, 599.06, 618.82, 772.09, 603.17, 701.59, 952.5, 913.02, 1070.2, 1255.86, 1452.02, 1383.29, 1589.94, 1759.68, 1881.51, 2184.75, 2090.71, 1617.7, 1798.51], '6M': [387.81, 503.44, 539.3, 576.2, 630.29, 649.97, 635.36, 565.59, 618.82, 772.09, 603.17, 701.59, 851.77, 920.99, 989.9, 1187, 1562.34, 1407.61, 1478.69, 1694.98, 1559.32, 1980.1, 2273.73, 2050.39, 1617.7, 1798.51], '1Y': [42.48, 41.61, 41.89, 42.51, 43.37, 45.52, 46.78, 52.47, 70.5, 90.09, 102.92, 113.5, 121.17, 134.61, 148.04, 176.49, 207.01, 267.95, 265.88, 226.96, 210.17, 225.47, 201.87, 241.05, 240.22, 353.56, 387.81, 503.44, 539.3, 576.2, 630.29, 649.97, 651.9, 565.59, 618.82, 772.09, 603.17, 701.59, 851.77, 920.99, 989.9, 1187, 1562.34, 1407.61, 1478.69, 1694.98, 1559.32, 1980.1, 2273.73, 2050.39, 1617.7, 1798.51] },
      velocityScore: { '1D': -3.7, '1W': -4.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$266B', pe: 61.4, revenueGrowth: 251, eps: 29.29, grossMargin: 56, dividendYield: null,
      etfPresence: { PTF: 5.16, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.66, CBSE: false, FCUS: 3.97, WGMI: false, CNEQ: false, SGRT: false, SPMO: 2.72, XMMO: false },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'DDOG', name: 'DDOG', easyScore: 4, avgWeight: 3.08, proScore: 0.72, coverage: 0.235,
      price: 260.95, weeklyPrices: [261.09, 269.00, 257.54, 260.24, 260.95], weeklyChange: -0.05, dayChange: 0.27, sortRank: 0, periodReturns: { '1M': 12, 'YTD': 91.9, '6M': 113.2, '1Y': 88 },
      priceHistory: { '1D': [260.24, 258.87, 260.33, 260.95], '1W': [261.09, 269, 257.54, 260.24, 260.95], '1M': [233.09, 231.11, 226.63, 223, 221.37, 220.57, 222.65, 220.94, 239.77, 248.57, 260.36, 264.48, 260.36, 255.37, 256.81, 261.09, 269, 257.54, 260.24, 260.95], 'YTD': [135.99, 130.68, 119.02, 136.64, 129.05, 114.01, 121.78, 110.33, 118.33, 127.16, 129.94, 124.3, 120.36, 110.08, 129.74, 132.66, 146.69, 199.94, 215.15, 221.81, 243.6, 234.24, 223, 239.77, 256.81, 260.95], '6M': [122.41, 131.25, 128.18, 106.73, 126.13, 115.66, 111.96, 122.36, 127.16, 129.94, 124.3, 120.36, 105.37, 126.61, 129.48, 140.53, 200.16, 207.98, 222.32, 247.35, 234.11, 229.9, 221.37, 248.57, 256.81, 260.95], '1Y': [138.8, 145.27, 150.77, 139.13, 128.83, 129.07, 128.38, 136.68, 136.44, 138.65, 138.35, 145.26, 157.36, 164.2, 156.29, 157.62, 162.08, 199.72, 180.26, 158.44, 157.9, 154.28, 142.05, 141.84, 137.48, 141.45, 122.41, 131.25, 128.18, 106.73, 126.13, 115.66, 116.46, 122.36, 127.16, 129.94, 124.3, 120.36, 105.37, 126.61, 129.48, 140.53, 200.16, 207.98, 222.32, 247.35, 234.11, 229.9, 221.37, 248.57, 256.81, 260.95] },
      velocityScore: { '1D': 0, '1W': 0, '1M': 16.1, '6M': null }, isNew: false,
      marketCap: '$93B', pe: 669.1, revenueGrowth: 32, eps: 0.39, grossMargin: 80, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.87, IGV: 3.18, FDTX: 2.39, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: 3.87, SPMO: false, XMMO: false },
      tonyNote: 'DDOG appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SHOP', name: 'Shopify Inc Registered Shs -A- Subord Vtg', easyScore: 4, avgWeight: 3.05, proScore: 0.72, coverage: 0.235,
      price: 124.14, weeklyPrices: [119.22, 123.17, 122.54, 124.74, 124.14], weeklyChange: 4.13, dayChange: -0.48, sortRank: 0, periodReturns: { '1M': 10.4, 'YTD': -22.9, '6M': -21.2, '1Y': 6.3 },
      priceHistory: { '1D': [124.74, 123.11, 123.47, 124.14], '1W': [119.22, 123.17, 122.54, 124.74, 124.14], '1M': [112.49, 113.23, 108.09, 108.85, 107.98, 107.68, 114.17, 111.62, 116.86, 114.21, 114.18, 121.63, 119.46, 120.14, 121.88, 119.22, 123.17, 122.54, 124.74, 124.14], 'YTD': [160.97, 168.28, 155.81, 136.31, 132.2, 118.4, 121.64, 120.31, 129.65, 126.17, 122.37, 115.43, 118.25, 114.97, 135.14, 124.23, 127.55, 99.84, 101.01, 106.6, 116.04, 110.47, 108.85, 116.86, 121.88, 124.14], '6M': [157.51, 137.64, 143.64, 111.24, 110.66, 126.2, 120.73, 134.79, 126.17, 122.37, 115.43, 118.25, 110.79, 131.15, 125.83, 127.67, 110.41, 100.28, 103, 118.71, 109.54, 108.24, 107.98, 114.21, 121.88, 124.14], '1Y': [116.74, 128.43, 126.84, 125.21, 147.5, 143.11, 140.53, 141.28, 146.22, 147.89, 157.12, 149, 164.5, 153.66, 164.71, 175.06, 172.94, 158.88, 139.93, 155.31, 149.28, 158.41, 159.85, 169.67, 163.74, 166.74, 157.51, 137.64, 143.64, 111.24, 110.66, 126.2, 125.94, 134.79, 126.17, 122.37, 115.43, 118.25, 110.79, 131.15, 125.83, 127.67, 110.41, 100.28, 103, 118.71, 109.54, 108.24, 107.98, 114.21, 121.88, 124.14] },
      velocityScore: { '1D': 0, '1W': 2.9, '1M': -21.7, '6M': null }, isNew: false,
      marketCap: '$161B', pe: 121.7, revenueGrowth: 34, eps: 1.02, grossMargin: 48, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.59, GTEK: false, ARKK: 4.6, MARS: false, FRWD: 2.14, BCTK: 2.86, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Shopify Inc Registered Shs -A- Subord Vtg appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASML', name: 'ASML Holding', easyScore: 4, avgWeight: 2.81, proScore: 0.66, coverage: 0.235,
      price: 1778.71, weeklyPrices: [1768.65, 1804.25, 1797.32, 1726.04, 1778.71], weeklyChange: 0.57, dayChange: 3.05, sortRank: 0, periodReturns: { '1M': -6, 'YTD': 66.3, '6M': 40.8, '1Y': 120.5 },
      priceHistory: { '1D': [1726.04, 1776.88, 1777.44, 1778.71], '1W': [1768.65, 1804.25, 1797.32, 1726.04, 1778.71], '1M': [1892.66, 1803.89, 1867.83, 1929.68, 1929.25, 1778.46, 1762.77, 1841.18, 1794.62, 1883.11, 1989.44, 1843.04, 1769.32, 1825.07, 1747.28, 1768.65, 1804.25, 1797.32, 1726.04, 1778.71], 'YTD': [1069.86, 1194.32, 1358.57, 1413.35, 1441.39, 1429.49, 1468.72, 1526.51, 1399.37, 1351.58, 1366.39, 1329.5, 1317.23, 1500.2, 1476.5, 1432.44, 1386.21, 1520.94, 1459.44, 1597.87, 1757.47, 1899.48, 1929.68, 1794.62, 1747.28, 1778.71], '6M': [1263.72, 1395, 1455.16, 1350.16, 1406.87, 1469.59, 1450.56, 1368.36, 1351.58, 1366.39, 1329.5, 1317.23, 1478.28, 1459.8, 1457.7, 1427.02, 1592.02, 1501.81, 1632.9, 1612.76, 1641.74, 1863.55, 1929.25, 1883.11, 1747.28, 1778.71], '1Y': [806.73, 719.68, 729.99, 699.36, 721.31, 747.55, 754.46, 742.62, 796.25, 867.3, 957.8, 962.61, 1043.3, 984.66, 1042.15, 1059.98, 1066.82, 1038.79, 1020, 987.82, 1087.99, 1119.69, 1087.82, 1056.98, 1072.14, 1228.47, 1263.72, 1395, 1455.16, 1350.16, 1406.87, 1469.59, 1463.8, 1368.36, 1351.58, 1366.39, 1329.5, 1317.23, 1478.28, 1459.8, 1457.7, 1427.02, 1592.02, 1501.81, 1632.9, 1612.76, 1641.74, 1863.55, 1929.25, 1883.11, 1747.28, 1778.71] },
      velocityScore: { '1D': 0, '1W': 1.5, '1M': -25.8, '6M': null }, isNew: false,
      marketCap: '$686B', pe: 60.3, revenueGrowth: 13, eps: 29.52, grossMargin: 53, dividendYield: 0.49,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 4.74, BCTK: 2.18, FWD: 1.77, CBSE: 2.57, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'ASML Holding appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 2.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 3, avgWeight: 4.66, proScore: 2.8, coverage: 0.6,
      price: 662.44, weeklyPrices: [666.33, 668.17, 658.56, 646.70, 662.44], weeklyChange: -0.58, dayChange: 2.47, sortRank: 0, periodReturns: { '1M': -8.5, 'YTD': 57, '6M': 51.6, '1Y': 71.2 },
      priceHistory: { '1D': [646.47, 662.42, 662.44], '1W': [666.33, 668.17, 658.56, 646.7, 662.44], '1M': [724.35, 719.29, 714.85, 702.25, 740.14, 702.29, 701.88, 718.59, 687.87, 714.45, 720.04, 691.4, 668.31, 674.04, 656.79, 666.33, 668.17, 658.56, 646.7, 662.44], 'YTD': [422.06, 413.17, 466.75, 470.77, 477.77, 514.56, 519.31, 562.77, 568.38, 566.91, 577.95, 545.64, 560.63, 595.84, 604.97, 637.28, 757.34, 765.81, 714.13, 733.62, 719.17, 683.29, 702.25, 687.87, 656.79, 662.44], '6M': [437.07, 468.78, 483.43, 477.72, 515.88, 552.66, 563.08, 549.22, 566.91, 577.95, 545.64, 560.63, 585.36, 601.88, 624.84, 742.21, 745, 769.99, 723.44, 711.73, 695.11, 707.74, 740.14, 714.45, 656.79, 662.44], '1Y': [387, 398.66, 411.99, 393.62, 384.12, 383.32, 378.31, 377.96, 375.53, 385.68, 396.02, 409.11, 427.8, 430.98, 440.74, 441.82, 450.82, 450.38, 426.87, 442.64, 452.23, 463.09, 435.87, 433.03, 428.81, 436.89, 437.07, 468.78, 483.43, 477.72, 515.88, 552.66, 565.05, 549.22, 566.91, 577.95, 545.64, 560.63, 585.36, 601.88, 624.84, 742.21, 745, 769.99, 723.44, 711.73, 695.11, 707.74, 740.14, 714.45, 656.79, 662.44] },
      velocityScore: { '1D': 0, '1W': -2.4, '1M': -5.1, '6M': null }, isNew: false,
      marketCap: '$99B', pe: 92.3, revenueGrowth: 26, eps: 7.18, grossMargin: 15, dividendYield: 0.07,
      etfPresence: { POW: 5, VOLT: 5.17, PBD: false, PBW: false, IVEP: 3.82 },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 3, avgWeight: 4.66, proScore: 2.79, coverage: 0.6,
      price: 413.36, weeklyPrices: [399.56, 405.83, 407.28, 402.85, 413.36], weeklyChange: 3.45, dayChange: 2.63, sortRank: 0, periodReturns: { '1M': 1.5, 'YTD': 29.8, '6M': 24.8, '1Y': 14.7 },
      priceHistory: { '1D': [402.76, 413.86, 413.4, 413.36], '1W': [399.56, 405.83, 407.28, 402.85, 413.36], '1M': [407.06, 407.71, 409.64, 421.77, 435.78, 405.28, 404.59, 419.87, 402.68, 408.26, 426.12, 412.31, 398.52, 413.42, 395.68, 399.56, 405.83, 407.28, 402.85, 413.36], 'YTD': [318.51, 320.58, 343.75, 332.28, 359.44, 377.06, 380.38, 373.53, 354.46, 348.64, 360.23, 357.1, 361.1, 403.36, 407.57, 416.77, 422.44, 401.53, 371.88, 406.37, 418.61, 393.64, 421.77, 402.68, 395.68, 413.36], '6M': [331.14, 334.04, 354.37, 354.67, 390.33, 373.38, 375.92, 354.79, 348.64, 360.23, 357.1, 361.1, 403, 406.21, 423.92, 425.55, 401.51, 399.44, 391.35, 400.6, 395.94, 391.39, 435.78, 408.26, 395.68, 413.36], '1Y': [360.29, 373.66, 392.76, 384.76, 360.11, 353.5, 345.76, 349.14, 349.49, 375.54, 378.31, 367.15, 380.02, 375.37, 377.69, 379.74, 386.57, 379.57, 342.75, 330.43, 339.71, 343.39, 333.21, 320.39, 320.86, 322.67, 331.14, 334.04, 354.37, 354.67, 390.33, 373.38, 374.59, 354.79, 348.64, 360.23, 357.1, 361.1, 403, 406.21, 423.92, 425.55, 401.51, 399.44, 391.35, 400.6, 395.94, 391.39, 435.78, 408.26, 395.68, 413.36] },
      velocityScore: { '1D': 0.7, '1W': 1.5, '1M': 6.5, '6M': null }, isNew: false,
      marketCap: '$161B', pe: 40.9, revenueGrowth: 17, eps: 10.11, grossMargin: 37, dividendYield: 1.09,
      etfPresence: { POW: 4.33, VOLT: 5.52, PBD: false, PBW: false, IVEP: 4.12 },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 3, avgWeight: 3.96, proScore: 2.38, coverage: 0.6,
      price: 89.28, weeklyPrices: [87.44, 87.10, 87.96, 88.38, 89.28], weeklyChange: 2.1, dayChange: 1, sortRank: 0, periodReturns: { '1M': 3.7, 'YTD': 11.2, '6M': 8.9, '1Y': 19 },
      priceHistory: { '1D': [88.4, 89.17, 89.25, 89.28], '1W': [87.44, 87.1, 87.96, 88.38, 89.28], '1M': [86.12, 86.23, 85.73, 86.75, 86.08, 86.43, 87.62, 87.7, 88.56, 88.66, 87.77, 86.37, 88.34, 87.44, 88.47, 87.44, 87.1, 87.96, 88.38, 89.28], 'YTD': [80.28, 79.49, 83.63, 85.47, 86.33, 89.48, 91.22, 95.11, 92.6, 91.73, 92.41, 91.16, 93.15, 92.3, 92.01, 94.83, 95.51, 94.59, 90.06, 87.65, 85.68, 84.84, 86.75, 88.56, 88.47, 89.28], '6M': [81.98, 85.07, 88.18, 89.21, 91.93, 92.18, 93.77, 91.13, 91.73, 92.41, 91.16, 93.15, 94.08, 91.98, 95.28, 96.95, 93.1, 93.36, 88.55, 87.01, 85.84, 85.99, 86.08, 88.66, 88.47, 89.28], '1Y': [75.04, 76.17, 71.34, 70.53, 72.45, 75.72, 75.32, 72.05, 69.77, 71.5, 72.35, 76.21, 82.11, 84.3, 84.77, 86.03, 81.78, 84.77, 85.75, 84.23, 84.65, 80.55, 81.65, 80.04, 80.53, 78.37, 81.98, 85.07, 88.18, 89.21, 91.93, 92.18, 91.99, 91.13, 91.73, 92.41, 91.16, 93.15, 94.08, 91.98, 95.28, 96.95, 93.1, 93.36, 88.55, 87.01, 85.84, 85.99, 86.08, 88.66, 88.47, 89.28] },
      velocityScore: { '1D': 2.6, '1W': 9.2, '1M': 11.2, '6M': null }, isNew: false,
      marketCap: '$186B', pe: 22.7, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.82,
      etfPresence: { POW: 2.25, VOLT: 5.32, PBD: false, PBW: false, IVEP: 4.32 },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 3, avgWeight: 3.94, proScore: 2.37, coverage: 0.6,
      price: 1077.99, weeklyPrices: [1070.99, 1075.26, 1091.57, 1042.60, 1077.99], weeklyChange: 0.65, dayChange: 3.42, sortRank: 0, periodReturns: { '1M': 10.1, 'YTD': 64.9, '6M': 67.3, '1Y': 94.2 },
      priceHistory: { '1D': [1042.36, 1073.85, 1075.43, 1077.99], '1W': [1070.99, 1075.26, 1091.57, 1042.6, 1077.99], '1M': [979.07, 982.35, 1048.86, 1109.73, 1127.59, 1034.98, 1057.65, 1085.47, 1045.17, 1102.51, 1174.86, 1134.35, 1113.11, 1152.04, 1077.08, 1070.99, 1075.26, 1091.57, 1042.6, 1077.99], 'YTD': [653.57, 628.4, 681.55, 665.99, 754.97, 801.54, 817.55, 876.01, 841.27, 832.11, 877.39, 873.12, 898.57, 991.12, 990.18, 1120.23, 1073.95, 1071.98, 1011.8, 1031.89, 963.33, 906.79, 1109.73, 1045.17, 1077.08, 1077.99], '6M': [644.18, 661.67, 717.39, 737.53, 816.56, 830.34, 873.6, 815.01, 832.11, 877.39, 873.12, 898.57, 991.32, 1002.75, 1149.19, 1062.95, 1040.15, 1049.23, 1038.74, 968.32, 933.61, 940.66, 1127.59, 1102.51, 1077.08, 1077.99], '1Y': [555.04, 565.91, 647.66, 662.77, 650.76, 625.02, 602.31, 612.97, 600.23, 628.68, 644.37, 602.43, 603.22, 648.25, 594.07, 584.39, 581.26, 579.8, 577.02, 580.49, 576.9, 621.9, 681.35, 661.81, 659.64, 662.32, 644.18, 661.67, 717.39, 737.53, 816.56, 830.34, 876.46, 815.01, 832.11, 877.39, 873.12, 898.57, 991.32, 1002.75, 1149.19, 1062.95, 1040.15, 1049.23, 1038.74, 968.32, 933.61, 940.66, 1127.59, 1102.51, 1077.08, 1077.99] },
      velocityScore: { '1D': -2.5, '1W': -9.2, '1M': 8.2, '6M': null }, isNew: false,
      marketCap: '$290B', pe: 31.5, revenueGrowth: 16, eps: 34.2, grossMargin: 20, dividendYield: 0.19,
      etfPresence: { POW: 3.5, VOLT: 4.43, PBD: false, PBW: false, IVEP: 3.9 },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 3, avgWeight: 3.28, proScore: 1.97, coverage: 0.6,
      price: 164.06, weeklyPrices: [154.76, 158.05, 160.72, 158.02, 164.06], weeklyChange: 6.01, dayChange: 3.84, sortRank: 0, periodReturns: { '1M': -2.9, 'YTD': 60.9, '6M': 56.9, '1Y': 118.8 },
      priceHistory: { '1D': [158, 164.38, 164.38, 164.06], '1W': [154.76, 158.05, 160.72, 158.02, 164.06], '1M': [169, 167.34, 170.94, 177.02, 184.34, 168.37, 167.55, 171.91, 162.92, 163.35, 169.61, 159.99, 152.15, 156.89, 153.18, 154.76, 158.05, 160.72, 158.02, 164.06], 'YTD': [101.97, 102.72, 112.5, 110.58, 115.79, 114.62, 115.65, 121.8, 113.83, 107.87, 122.58, 118.44, 117.96, 133.16, 135.8, 141.71, 162.69, 170.74, 158.23, 167.8, 173.88, 164.52, 177.02, 162.92, 153.18, 164.06], '6M': [104.54, 111.57, 115.62, 113.87, 111.9, 116.87, 118.36, 110.55, 107.87, 122.58, 118.44, 117.96, 130.56, 134.69, 142.17, 158.92, 169.95, 169.01, 164.66, 166.99, 162.86, 165.84, 184.34, 163.35, 153.18, 164.06], '1Y': [74.97, 74.96, 79.07, 90.49, 88.76, 89.41, 89.4, 90.39, 92.58, 96.35, 100.25, 96.7, 98, 99.5, 100.23, 103.91, 112.36, 112.33, 104.09, 104.1, 105.67, 107.11, 102.61, 102.79, 103.01, 106.48, 104.54, 111.57, 115.62, 113.87, 111.9, 116.87, 121.79, 110.55, 107.87, 122.58, 118.44, 117.96, 130.56, 134.69, 142.17, 158.92, 169.95, 169.01, 164.66, 166.99, 162.86, 165.84, 184.34, 163.35, 153.18, 164.06] },
      velocityScore: { '1D': 0.5, '1W': 1.5, '1M': -4.4, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 55.8, revenueGrowth: 54, eps: 2.94, grossMargin: 37, dividendYield: 0.52,
      etfPresence: { POW: 3.93, VOLT: 3.06, PBD: false, PBW: false, IVEP: 2.85 },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 3, avgWeight: 3.18, proScore: 1.91, coverage: 0.6,
      price: 484.21, weeklyPrices: [480.50, 485.41, 490.94, 477.03, 484.21], weeklyChange: 0.77, dayChange: 1.5, sortRank: 0, periodReturns: { '1M': -1.1, 'YTD': 9, '6M': 1.7, '1Y': 16.7 },
      priceHistory: { '1D': [477.05, 485.21, 486.02, 484.21], '1W': [480.5, 485.41, 490.94, 477.03, 484.21], '1M': [489.73, 502.65, 508.87, 523.69, 539.39, 509.96, 518.18, 536.04, 517.02, 514.71, 523.2, 490.12, 487.1, 495.6, 478.89, 480.5, 485.41, 490.94, 477.03, 484.21], 'YTD': [444.11, 460.87, 489.31, 486.82, 495.59, 506.14, 522.3, 527.9, 490.78, 468.41, 492.65, 481.67, 494.25, 539.79, 546.23, 555.34, 516, 485.98, 461.5, 484.25, 485.27, 469.32, 523.69, 517.02, 478.89, 484.21], '6M': [476.06, 484.06, 497.97, 487.4, 516.02, 526.73, 511.63, 476.51, 468.41, 492.65, 481.67, 494.25, 536.01, 535.57, 553.07, 508.43, 492.58, 479.97, 475.01, 473.61, 476.82, 476.89, 539.39, 514.71, 478.89, 484.21], '1Y': [415.08, 422.27, 438.31, 429.06, 417.54, 432.22, 437.56, 430.99, 436.62, 438.11, 438.49, 426.44, 413.05, 418.72, 431.65, 433.98, 467.61, 462.28, 420.57, 424.08, 427.85, 441.51, 444.84, 451.03, 446.61, 468.2, 476.06, 484.06, 497.97, 487.4, 516.02, 526.73, 524.19, 476.51, 468.41, 492.65, 481.67, 494.25, 536.01, 535.57, 553.07, 508.43, 492.58, 479.97, 475.01, 473.61, 476.82, 476.89, 539.39, 514.71, 478.89, 484.21] },
      velocityScore: { '1D': -1, '1W': 8.5, '1M': 11, '6M': null }, isNew: false,
      marketCap: '$26B', pe: 29.4, revenueGrowth: 11, eps: 16.46, grossMargin: 36, dividendYield: 1.16,
      etfPresence: { POW: 2.94, VOLT: 3.79, PBD: false, PBW: false, IVEP: 2.81 },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy Corp', easyScore: 3, avgWeight: 2.66, proScore: 1.6, coverage: 0.6,
      price: 249.62, weeklyPrices: [254.29, 257.02, 244.61, 233.49, 249.62], weeklyChange: -1.84, dayChange: 6.94, sortRank: 0, periodReturns: { '1M': -9.1, 'YTD': 187.3, '6M': 87, '1Y': 861.6 },
      priceHistory: { '1D': [233.41, 248.92, 249.5, 249.62], '1W': [254.29, 257.02, 244.61, 233.49, 249.62], '1M': [274.5, 280.88, 284.99, 328.91, 345.85, 321.98, 326.19, 309.18, 252.02, 275.01, 302.7, 289.5, 270.89, 295.05, 269.57, 254.29, 257.02, 244.61, 233.49, 249.62], 'YTD': [86.89, 121.84, 149.5, 139.62, 156.13, 155.17, 157.27, 174.77, 164.78, 157.17, 166.69, 133.52, 135.63, 176.67, 218.27, 234.68, 288.64, 280.69, 261.34, 293.8, 291.37, 248.88, 328.91, 252.02, 269.57, 249.62], '6M': [133.46, 145.63, 156.51, 136.6, 139.03, 147.55, 155.67, 159.99, 157.17, 166.69, 133.52, 135.63, 166.7, 207.86, 231.17, 290.52, 261.03, 275.95, 302.49, 285, 263.61, 260.22, 345.85, 275.01, 269.57, 249.62], '1Y': [25.96, 25.36, 34.78, 36.1, 37.65, 46.5, 49.35, 52.94, 53.44, 67.02, 86.27, 73.6, 86.97, 109.91, 109.06, 108.53, 142.37, 139.23, 107.11, 95.56, 98.93, 111.79, 89.58, 92.26, 87.26, 108, 133.46, 145.63, 156.51, 136.6, 139.03, 147.55, 168.57, 159.99, 157.17, 166.69, 133.52, 135.63, 166.7, 207.86, 231.17, 290.52, 261.03, 275.95, 302.49, 285, 263.61, 260.22, 345.85, 275.01, 269.57, 249.62] },
      velocityScore: { '1D': -3, '1W': -30.1, '1M': -25.2, '6M': null }, isNew: false,
      marketCap: '$71B', pe: null, revenueGrowth: 130, eps: -0.05, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: 1.46, VOLT: 3.47, PBD: false, PBW: false, IVEP: 3.06 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'NRG', name: 'NRG Energy Inc', easyScore: 3, avgWeight: 1.51, proScore: 0.91, coverage: 0.6,
      price: 143.2, weeklyPrices: [137.48, 140.48, 140.42, 139.48, 143.20], weeklyChange: 4.16, dayChange: 2.67, sortRank: 0, periodReturns: { '1M': 9.8, 'YTD': -10.1, '6M': -4.4, '1Y': -5.2 },
      priceHistory: { '1D': [139.47, 143.75, 143.75, 143.2], '1W': [137.48, 140.48, 140.42, 139.48, 143.2], '1M': [130.4, 132.1, 132.13, 135.06, 138.91, 137.66, 142.21, 147.11, 149.36, 149.11, 146.06, 140.8, 136.7, 141.01, 138.01, 137.48, 140.48, 140.42, 139.48, 143.2], 'YTD': [159.24, 143.53, 152.05, 149.93, 149.11, 155.72, 171.06, 183.59, 163.54, 152.1, 161.4, 146.14, 152.69, 170.24, 157.18, 160.15, 154.82, 137.34, 123.71, 138, 133.39, 123.7, 135.06, 149.36, 138.01, 143.2], '6M': [149.83, 151.09, 153.72, 144.44, 161.8, 179.18, 178.96, 160.46, 152.1, 161.4, 146.14, 152.69, 164.07, 167.73, 159.81, 153.37, 138.11, 127.81, 137.65, 134.08, 129.2, 125.47, 138.91, 149.11, 138.01, 143.2], '1Y': [151.06, 152.31, 158.54, 173.91, 152.03, 150.44, 144.77, 145.56, 147.76, 166.08, 170.97, 165.34, 163.95, 168.77, 167.01, 172.59, 174.48, 166.72, 163.21, 166.85, 165.66, 164.11, 159.99, 156.96, 160.43, 148.91, 149.83, 151.09, 153.72, 144.44, 161.8, 179.18, 181.34, 160.46, 152.1, 161.4, 146.14, 152.69, 164.07, 167.73, 159.81, 153.37, 138.11, 127.81, 137.65, 134.08, 129.2, 125.47, 138.91, 149.11, 138.01, 143.2] },
      velocityScore: { '1D': 1.1, '1W': 12.3, '1M': 26.4, '6M': null }, isNew: false,
      marketCap: '$30B', pe: 157.4, revenueGrowth: 20, eps: 0.91, grossMargin: 16, dividendYield: 1.36,
      etfPresence: { POW: 0.55, VOLT: 1.05, PBD: false, PBW: false, IVEP: 2.93 },
      tonyNote: 'NRG Energy Inc appears in 3 of 5 Electrification ETFs (60% coverage) with average weight 1.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, avgWeight: 5.38, proScore: 2.15, coverage: 0.4,
      price: 272.79, weeklyPrices: [258.67, 267.69, 272.58, 263.26, 272.79], weeklyChange: 5.46, dayChange: 3.62, sortRank: 0, periodReturns: { '1M': -9.7, 'YTD': 60.8, '6M': 41.4, '1Y': 168.3 },
      priceHistory: { '1D': [263.26, 276.28, 272.79], '1W': [258.67, 267.69, 272.58, 263.26, 272.79], '1M': [302.15, 293.22, 299.84, 296.39, 304.33, 288.64, 294.15, 310.32, 310.64, 315.65, 333.04, 318.06, 266.94, 277.45, 251.53, 258.67, 267.69, 272.58, 263.26, 272.79], 'YTD': [169.63, 180.24, 200.11, 205.17, 215.59, 229.32, 221.19, 234.67, 213.8, 195.18, 214.95, 204.11, 204.65, 237.93, 254.38, 250.96, 286.69, 298.22, 249.71, 280.13, 276.54, 296.55, 296.39, 310.64, 251.53, 272.79], '6M': [192.96, 200.29, 210.44, 208, 231.48, 235.04, 229.71, 202.58, 195.18, 214.95, 204.11, 204.65, 235.73, 254.25, 276.65, 283.6, 297.98, 256.72, 270.01, 274.52, 262.56, 293.87, 304.33, 315.65, 251.53, 272.79], '1Y': [101.66, 103.72, 126.75, 131.51, 128.22, 131.57, 137.03, 134.56, 141.51, 145.86, 146.51, 140.37, 141.12, 145.02, 147.96, 155.89, 158.57, 166.99, 141.86, 145.88, 154.77, 172.21, 173.3, 174.02, 172.95, 181.03, 192.96, 200.29, 210.44, 208, 231.48, 235.04, 232.12, 202.58, 195.18, 214.95, 204.11, 204.65, 235.73, 254.25, 276.65, 283.6, 297.98, 256.72, 270.01, 274.52, 262.56, 293.87, 304.33, 315.65, 251.53, 272.79] },
      velocityScore: { '1D': -1.8, '1W': -0.9, '1M': -5.3, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 65.6, revenueGrowth: 17, eps: 4.16, grossMargin: 39, dividendYield: 0.11,
      etfPresence: { POW: 3.51, VOLT: 7.24, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 2, avgWeight: 5.07, proScore: 2.03, coverage: 0.4,
      price: 233.34, weeklyPrices: [231.85, 236.58, 232.19, 225.66, 233.34], weeklyChange: 0.64, dayChange: 3.4, sortRank: 0, periodReturns: { '1M': -23.1, 'YTD': 119.6, '6M': 74.5, '1Y': 232.5 },
      priceHistory: { '1D': [225.66, 234.35, 234.6, 233.34], '1W': [231.85, 236.58, 232.19, 225.66, 233.34], '1M': [303.53, 292.7, 294.03, 297.2, 307.8, 291.5, 294.49, 309.2, 279.77, 281.09, 286.36, 264.86, 246.33, 248.05, 234.05, 231.85, 236.58, 232.19, 225.66, 233.34], 'YTD': [106.26, 119.94, 139.99, 141.15, 146.79, 187.3, 180.99, 183, 170.96, 171.19, 175.13, 174.8, 182.6, 228.99, 241.65, 260.52, 269.95, 308.05, 261.58, 295.94, 300.06, 290.5, 297.2, 279.77, 234.05, 233.34], '6M': [133.76, 142.29, 152.31, 179.6, 197.63, 182.27, 174.53, 167.67, 171.19, 175.13, 174.8, 182.6, 230.94, 241.01, 252.76, 275.33, 309.39, 292.65, 279.22, 284.42, 284.87, 294.75, 307.8, 281.09, 234.05, 233.34], '1Y': [70.19, 73.64, 80.8, 76.72, 88.28, 86.57, 86.12, 88.72, 90.8, 100.68, 100.97, 101.01, 103.9, 105.33, 116.4, 124.71, 130.23, 124.62, 105.94, 100.03, 106.53, 114.29, 109.31, 112.18, 109.16, 118.62, 133.76, 142.29, 152.31, 179.6, 197.63, 182.27, 176.96, 167.67, 171.19, 175.13, 174.8, 182.6, 230.94, 241.01, 252.76, 275.33, 309.39, 292.65, 279.22, 284.42, 284.87, 294.75, 307.8, 281.09, 234.05, 233.34] },
      velocityScore: { '1D': -0.5, '1W': -4.7, '1M': -37.3, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 45.5, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.16,
      etfPresence: { POW: 4.15, VOLT: 5.98, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, avgWeight: 3.75, proScore: 1.5, coverage: 0.4,
      price: 136.48, weeklyPrices: [135.90, 133.85, 135.43, 135.63, 136.48], weeklyChange: 0.43, dayChange: 0.63, sortRank: 0, periodReturns: { '1M': 5.5, 'YTD': 18.4, '6M': 15.6, '1Y': 30 },
      priceHistory: { '1D': [135.63, 136.52, 136.49, 136.48], '1W': [135.9, 133.85, 135.43, 135.63, 136.48], '1M': [129.31, 129.75, 128.27, 127.69, 130.3, 133.74, 134.96, 137, 138.69, 137.97, 136.81, 135.05, 138.51, 135.98, 137.53, 135.9, 133.85, 135.43, 135.63, 136.48], 'YTD': [115.31, 115.93, 119.96, 118.02, 118.33, 121.1, 127.27, 132.46, 133.52, 132.22, 128.72, 128.85, 132.68, 134.46, 133.28, 135.07, 134.66, 131.94, 128.92, 129.57, 127.79, 128.48, 127.69, 138.69, 137.53, 136.48], '6M': [118.11, 117.18, 119.21, 120.61, 126.43, 129.37, 133.82, 132.04, 132.22, 128.72, 128.85, 132.68, 136.3, 133.66, 134.73, 136.91, 130.16, 125.15, 131.59, 126.67, 129.14, 129.23, 130.3, 137.97, 137.53, 136.48], '1Y': [105.02, 108.54, 107.95, 115, 112, 110.7, 113.01, 111.02, 107.55, 109.1, 107.05, 109.78, 115.66, 116.8, 117.82, 116.39, 119.92, 122.56, 123.72, 122.04, 120.51, 115.73, 115.77, 114.62, 115.99, 113.7, 118.11, 117.18, 119.21, 120.61, 126.43, 129.37, 132.1, 132.04, 132.22, 128.72, 128.85, 132.68, 136.3, 133.66, 134.73, 136.91, 130.16, 125.15, 131.59, 126.67, 129.14, 129.23, 130.3, 137.97, 137.53, 136.48] },
      velocityScore: { '1D': 2, '1W': 4.2, '1M': 32.7, '6M': null }, isNew: false,
      marketCap: '$74B', pe: 20.2, revenueGrowth: 10, eps: 6.75, grossMargin: 47, dividendYield: 2.8,
      etfPresence: { POW: 2.91, VOLT: 4.59, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 2, avgWeight: 3.32, proScore: 1.33, coverage: 0.4,
      price: 314.44, weeklyPrices: [317.81, 323.92, 318.86, 305.87, 314.44], weeklyChange: -1.06, dayChange: 2.8, sortRank: 0, periodReturns: { '1M': 0.8, 'YTD': 94.1, '6M': 84, '1Y': 152.1 },
      priceHistory: { '1D': [305.87, 314.35, 314.44], '1W': [317.81, 323.92, 318.86, 305.87, 314.44], '1M': [311.93, 299.6, 317.58, 333.05, 357.96, 318.32, 316.43, 325.57, 303.95, 306.97, 334.82, 311.42, 300.53, 318.47, 305.58, 317.81, 323.92, 318.86, 305.87, 314.44], 'YTD': [162.01, 160.78, 176.93, 181.23, 190.01, 202, 243.21, 262.19, 251.28, 265.38, 269.17, 252.4, 261.29, 299.96, 314.41, 322.43, 330.97, 367.13, 322.63, 319.78, 323.92, 297.88, 333.05, 303.95, 305.58, 314.44], '6M': [170.86, 181.12, 195.1, 177.75, 236.51, 243.75, 254.89, 249.75, 265.38, 269.17, 252.4, 261.29, 295.11, 307.34, 323.46, 328.31, 339.97, 370.94, 327.46, 315.71, 300.51, 302.87, 357.96, 306.97, 305.58, 314.44], '1Y': [124.72, 126.21, 142.55, 140.2, 139.83, 135.69, 125.02, 127.55, 121.82, 138.26, 151.96, 143.31, 162.8, 179, 175.73, 192.9, 191.4, 187.84, 166.65, 168.91, 179.22, 185.61, 161.74, 166.25, 164.34, 171.54, 170.86, 181.12, 195.1, 177.75, 236.51, 243.75, 259.23, 249.75, 265.38, 269.17, 252.4, 261.29, 295.11, 307.34, 323.46, 328.31, 339.97, 370.94, 327.46, 315.71, 300.51, 302.87, 357.96, 306.97, 305.58, 314.44] },
      velocityScore: { '1D': -2.2, '1W': -1.5, '1M': 3.9, '6M': null }, isNew: false,
      marketCap: '$121B', pe: 79, revenueGrowth: 30, eps: 3.98, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 2.51, PBD: false, PBW: false, IVEP: 4.13 },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 2.81, proScore: 1.12, coverage: 0.4,
      price: 76.03, weeklyPrices: [75.27, 75.45, 75.02, 74.46, 76.03], weeklyChange: 1.02, dayChange: 2.14, sortRank: 0, periodReturns: { '1M': 6.4, 'YTD': 26.5, '6M': 25.2, '1Y': 28.8 },
      priceHistory: { '1D': [74.44, 75.61, 76, 76.03], '1W': [75.27, 75.45, 75.02, 74.46, 76.03], '1M': [71.49, 71.48, 71.25, 73.12, 74.95, 75.79, 75.87, 77.53, 77.92, 75.06, 74.34, 72.77, 73.14, 72.82, 75.08, 75.27, 75.45, 75.02, 74.46, 76.03], 'YTD': [60.11, 61.15, 61.55, 64.29, 66.34, 67.85, 72.14, 73.97, 75.77, 73.52, 74.06, 74.06, 72, 71.54, 70.91, 71.61, 75.41, 74.73, 79.4, 74.37, 72.43, 71.62, 73.12, 77.92, 75.08, 76.03], '6M': [60.71, 63.72, 67.24, 67.42, 71.13, 72.98, 74.72, 74.77, 73.52, 74.06, 74.06, 72, 72.74, 71.15, 72.18, 75.54, 71.96, 77.72, 78.47, 71.39, 71.96, 72.08, 74.95, 75.06, 75.08, 76.03], '1Y': [59.04, 57.68, 57.51, 60.26, 58.06, 56.52, 56.83, 57.88, 56.85, 58.4, 60.16, 63.97, 63.58, 62.68, 63.06, 57.67, 59.03, 60.6, 59.91, 59.43, 61.44, 61.95, 59.48, 58.92, 60.16, 60.39, 60.71, 63.72, 67.24, 67.42, 71.13, 72.98, 74.77, 74.77, 73.52, 74.06, 74.06, 72, 72.74, 71.15, 72.18, 75.54, 71.96, 77.72, 78.47, 71.39, 71.96, 72.08, 74.95, 75.06, 75.08, 76.03] },
      velocityScore: { '1D': 0.9, '1W': 7.7, '1M': 8.7, '6M': null }, isNew: false,
      marketCap: '$93B', pe: 33.3, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.8,
      etfPresence: { POW: false, VOLT: 1.6, PBD: false, PBW: false, IVEP: 4.02 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CEG', name: 'Constellation Energy Corp', easyScore: 2, avgWeight: 2.76, proScore: 1.1, coverage: 0.4,
      price: 263.12, weeklyPrices: [244.52, 250.74, 251.38, 257.57, 263.12], weeklyChange: 7.61, dayChange: 2.15, sortRank: 0, periodReturns: { '1M': 0.3, 'YTD': -25.5, '6M': -20.4, '1Y': -19.3 },
      priceHistory: { '1D': [257.57, 265.07, 263.96, 263.12], '1W': [244.52, 250.74, 251.38, 257.57, 263.12], '1M': [262.35, 268, 267.17, 274.06, 275.53, 270.26, 267.97, 268.69, 264.02, 259.32, 248.37, 236.5, 239.25, 245.87, 239.71, 244.52, 250.74, 251.38, 257.57, 263.12], 'YTD': [353.27, 322.54, 307.71, 285.27, 270.88, 272.15, 294.05, 325.84, 322.85, 301.55, 316.47, 295.19, 272.82, 291.72, 287.56, 315.17, 321.05, 293.6, 260.67, 288.68, 264.59, 246.71, 274.06, 264.02, 239.71, 263.12], '6M': [330.38, 287.35, 287.45, 247.06, 276.12, 294.84, 329.88, 332.07, 301.55, 316.47, 295.19, 272.82, 286.5, 296.21, 313.53, 307.81, 303.63, 267.2, 294.07, 287.75, 254.83, 253.76, 275.53, 259.32, 239.71, 263.12], '1Y': [325.99, 317.88, 328.66, 354.89, 331.49, 322.77, 310.68, 307.98, 298.82, 330.42, 347.12, 334.27, 364.1, 380.91, 370, 391.15, 377.71, 360.93, 338.67, 354.11, 359.05, 357.67, 357.14, 357.81, 357.12, 338.63, 330.38, 287.35, 287.45, 247.06, 276.12, 294.84, 323.56, 332.07, 301.55, 316.47, 295.19, 272.82, 286.5, 296.21, 313.53, 307.81, 303.63, 267.2, 294.07, 287.75, 254.83, 253.76, 275.53, 259.32, 239.71, 263.12] },
      velocityScore: { '1D': 4.8, '1W': 23.6, '1M': 18.3, '6M': null }, isNew: false,
      marketCap: '$94B', pe: 22.9, revenueGrowth: 64, eps: 11.51, grossMargin: 23, dividendYield: 0.66,
      etfPresence: { POW: 1.35, VOLT: false, PBD: false, PBW: false, IVEP: 4.17 },
      tonyNote: 'Constellation Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'APH', name: 'Amphenol Corp', easyScore: 2, avgWeight: 2.75, proScore: 1.1, coverage: 0.4,
      price: 158.95, weeklyPrices: [158.22, 162.24, 159.06, 155.99, 158.95], weeklyChange: 0.46, dayChange: 1.88, sortRank: 0, periodReturns: { '1M': 0.2, 'YTD': 17.6, '6M': 8.3, '1Y': 58.6 },
      priceHistory: { '1D': [156.01, 159.44, 158.86, 158.95], '1W': [158.22, 162.24, 159.06, 155.99, 158.95], '1M': [158.59, 158.81, 161.11, 163.96, 165.96, 158.7, 162.78, 165.15, 163.72, 166.42, 176.32, 172.22, 164.59, 166.81, 158.61, 158.22, 162.24, 159.06, 155.99, 158.95], 'YTD': [135.14, 136.25, 154.39, 155.56, 144.93, 144.2, 147.73, 152.64, 132.75, 131.47, 130.65, 123.13, 128, 145.27, 152.81, 148.64, 141.03, 127.87, 119.2, 140.24, 146.77, 152.46, 163.96, 163.72, 158.61, 158.95], '6M': [146.75, 152.5, 149.58, 127.63, 143.73, 151.04, 146.06, 136.24, 131.47, 130.65, 123.13, 128, 140.75, 151.06, 149.71, 142.3, 128.03, 125, 132.06, 148.76, 138.81, 153.8, 165.96, 166.42, 158.61, 158.95], '1Y': [100.21, 103.71, 106.7, 108.63, 109.81, 111.06, 109.73, 108.86, 110.54, 119.24, 123.69, 121.01, 123.4, 123.91, 127.67, 135.91, 141.55, 143.85, 132.33, 137.88, 139.22, 140.06, 129.9, 135.14, 136.2, 138.91, 146.75, 152.5, 149.58, 127.63, 143.73, 151.04, 148.47, 136.24, 131.47, 130.65, 123.13, 128, 140.75, 151.06, 149.71, 142.3, 128.03, 125, 132.06, 148.76, 138.81, 153.8, 165.96, 166.42, 158.61, 158.95] },
      velocityScore: { '1D': 0, '1W': -2.7, '1M': 4.8, '6M': null }, isNew: false,
      marketCap: '$196B', pe: 46.5, revenueGrowth: 58, eps: 3.42, grossMargin: 38, dividendYield: 0.64,
      etfPresence: { POW: 1.05, VOLT: 4.46, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'JCI', name: 'JOHNSON CONTROLS INTERNATIONAL PLC', easyScore: 2, avgWeight: 2.7, proScore: 1.08, coverage: 0.4,
      price: 146.63, weeklyPrices: [140.23, 140.53, 142.81, 143.93, 146.63], weeklyChange: 4.56, dayChange: 1.88, sortRank: 0, periodReturns: { '1M': 0.4, 'YTD': 22.4, '6M': 30.8, '1Y': 38 },
      priceHistory: { '1D': [143.93, 146.79, 146.83, 146.63], '1W': [140.23, 140.53, 142.81, 143.93, 146.63], '1M': [146.06, 145.17, 143.62, 144.82, 148.21, 141.28, 142.81, 145.49, 138.4, 140.47, 146.11, 144.8, 140.76, 142.72, 140.62, 140.23, 140.53, 142.81, 143.93, 146.63], 'YTD': [119.75, 111.29, 114.61, 115.07, 122.98, 139, 139.48, 144.49, 140, 130.94, 133.25, 131.57, 132.97, 142.82, 140.98, 143.38, 144.4, 141.04, 135.42, 138.2, 147.4, 144.01, 144.82, 138.4, 140.62, 146.63], '6M': [112.13, 114.51, 120.28, 132.52, 138.57, 143.79, 144.3, 137.18, 130.94, 133.25, 131.57, 132.97, 142.53, 140.87, 141.92, 145.08, 139.52, 143.08, 138.36, 134.06, 143.65, 144.96, 148.21, 140.47, 140.62, 146.63], '1Y': [106.26, 108.27, 111.52, 106.48, 105.71, 105.71, 106.4, 106.89, 107.17, 107.81, 109.29, 108.16, 109.58, 106.38, 110.6, 113.05, 113.18, 122.58, 116.38, 114.19, 114.94, 114.98, 116.88, 119.96, 120.94, 112.41, 112.13, 114.51, 120.28, 132.52, 138.57, 143.79, 143.42, 137.18, 130.94, 133.25, 131.57, 132.97, 142.53, 140.87, 141.92, 145.08, 139.52, 143.08, 138.36, 134.06, 143.65, 144.96, 148.21, 140.47, 140.62, 146.63] },
      velocityScore: { '1D': 2.9, '1W': 5.9, '1M': 4.9, '6M': null }, isNew: false,
      marketCap: '$89B', pe: 44.8, revenueGrowth: 8, eps: 3.27, grossMargin: 37, dividendYield: 1.12,
      etfPresence: { POW: false, VOLT: 1.5, PBD: false, PBW: false, IVEP: 3.9 },
      tonyNote: 'JOHNSON CONTROLS INTERNATIONAL PLC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VST', name: 'Vistra Corp', easyScore: 2, avgWeight: 2.54, proScore: 1.02, coverage: 0.4,
      price: 164.28, weeklyPrices: [154.82, 157.98, 158.86, 158.12, 164.28], weeklyChange: 6.11, dayChange: 3.9, sortRank: 0, periodReturns: { '1M': 7, 'YTD': 1.8, '6M': -2.8, '1Y': -15.7 },
      priceHistory: { '1D': [158.11, 163.82, 163.84, 164.28], '1W': [154.82, 157.98, 158.86, 158.12, 164.28], '1M': [153.52, 158.61, 158.83, 163.75, 167.26, 162.39, 162.87, 167.77, 163.49, 162.38, 158.63, 153.16, 151.05, 157.22, 155.73, 154.82, 157.98, 158.86, 158.12, 164.28], 'YTD': [161.33, 150.6, 166.6, 158.81, 154.26, 152.97, 170.57, 175.36, 163.36, 159.58, 167.37, 152.3, 151.18, 158.2, 159.6, 166.58, 160.85, 146.87, 134.71, 160.15, 153.7, 146.38, 163.75, 163.49, 155.73, 164.28], '6M': [168.97, 160.36, 162.58, 143.07, 163.1, 171.4, 173.89, 167.4, 159.58, 167.37, 152.3, 151.18, 154.73, 163.46, 164.35, 155.28, 147.72, 139.68, 156.27, 160.23, 148.76, 148.02, 167.26, 162.38, 155.73, 164.28], '1Y': [194.81, 188.23, 195.88, 214.06, 200.08, 198.96, 190.08, 189.11, 188.01, 213.52, 217.92, 197.94, 200.41, 209.55, 194.24, 199.3, 193.04, 188.28, 175, 175.14, 173.64, 166.12, 168.25, 161.57, 162.62, 154.6, 168.97, 160.36, 162.58, 143.07, 163.1, 171.4, 176.82, 167.4, 159.58, 167.37, 152.3, 151.18, 154.73, 163.46, 164.35, 155.28, 147.72, 139.68, 156.27, 160.23, 148.76, 148.02, 167.26, 162.38, 155.73, 164.28] },
      velocityScore: { '1D': 2, '1W': 8.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$55B', pe: 27.6, revenueGrowth: 43, eps: 5.95, grossMargin: 39, dividendYield: 0.58,
      etfPresence: { POW: 1.54, VOLT: false, PBD: false, PBW: false, IVEP: 3.54 },
      tonyNote: 'Vistra Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, avgWeight: 2.45, proScore: 0.98, coverage: 0.4,
      price: 312.52, weeklyPrices: [293.64, 309.27, 308.05, 298.52, 312.52], weeklyChange: 6.43, dayChange: 4.69, sortRank: 0, periodReturns: { '1M': -15.7, 'YTD': 49.3, '6M': 31.4, '1Y': 120.9 },
      priceHistory: { '1D': [298.52, 312.71, 312.52], '1W': [293.64, 309.27, 308.05, 298.52, 312.52], '1M': [370.66, 350.45, 353.32, 372.59, 388.23, 364.96, 359.61, 375.15, 348.11, 348.15, 372.87, 356.35, 311.27, 310.84, 287.73, 293.64, 309.27, 308.05, 298.52, 312.52], 'YTD': [209.37, 210.99, 253.86, 263.03, 261.82, 279.17, 321.34, 338.51, 330.54, 305.82, 327.8, 313.11, 332.31, 378.94, 380.22, 385.68, 387.03, 339.42, 302.84, 328.34, 320.92, 340.4, 372.59, 348.11, 287.73, 312.52], '6M': [237.9, 275.57, 269.12, 257.64, 312.95, 331.23, 335.57, 311.42, 305.82, 327.8, 313.11, 332.31, 379.64, 375.6, 387.24, 389.05, 357.24, 323.46, 324.86, 302.18, 294.81, 354.37, 388.23, 348.15, 287.73, 312.52], '1Y': [141.48, 142.66, 141.94, 140.56, 151.61, 153.23, 153.01, 149.68, 154.43, 156.74, 174.77, 166.76, 176.02, 182.15, 197.44, 205.12, 205.61, 219.3, 198.54, 206.04, 207.78, 221.85, 216.87, 217.76, 213.41, 224.4, 237.9, 275.57, 269.12, 257.64, 312.95, 331.23, 337.35, 311.42, 305.82, 327.8, 313.11, 332.31, 379.64, 375.6, 387.24, 389.05, 357.24, 323.46, 324.86, 302.18, 294.81, 354.37, 388.23, 348.15, 287.73, 312.52] },
      velocityScore: { '1D': -1, '1W': 0, '1M': -12.5, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 65, revenueGrowth: 26, eps: 4.81, grossMargin: 39, dividendYield: 0.13,
      etfPresence: { POW: 0.99, VOLT: 3.91, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'TLN', name: 'Talen Energy Corp', easyScore: 2, avgWeight: 2.31, proScore: 0.92, coverage: 0.4,
      price: 406.88, weeklyPrices: [367.88, 384.44, 385.80, 396.35, 406.88], weeklyChange: 10.6, dayChange: 2.66, sortRank: 0, periodReturns: { '1M': 5.4, 'YTD': 8.5, '6M': 8.6, '1Y': 44.3 },
      priceHistory: { '1D': [396.35, 408.23, 409, 406.88], '1W': [367.88, 384.44, 385.8, 396.35, 406.88], '1M': [386.21, 406.51, 409.81, 436.29, 438.12, 411.92, 405.89, 416.8, 404.09, 399.34, 384.26, 360.79, 364.67, 377.79, 366.66, 367.88, 384.44, 385.8, 396.35, 406.88], 'YTD': [374.84, 356, 371.66, 350.41, 340.8, 353.66, 380.29, 391.43, 336.57, 311.45, 340.07, 323.13, 327.58, 326.08, 346.26, 369.67, 384.64, 374.61, 314.57, 379.78, 378.08, 344.8, 436.29, 404.09, 366.66, 406.88], '6M': [374.83, 379.86, 362.2, 324.63, 367.81, 382.25, 370.97, 334.86, 311.45, 340.07, 323.13, 327.58, 321.33, 365.35, 364.32, 372.16, 386.37, 334.24, 372.45, 386.8, 364.74, 360.54, 438.12, 399.34, 366.66, 406.88], '1Y': [281.96, 310.14, 358.77, 390.68, 369.95, 376.89, 355.53, 378.92, 383.49, 405.45, 429.72, 420.7, 430.43, 435.83, 406.84, 407.12, 413.54, 393.63, 368.65, 380.49, 379.99, 353.38, 357.94, 378.85, 378.97, 374.71, 374.83, 379.86, 362.2, 324.63, 367.81, 382.25, 390.05, 334.86, 311.45, 340.07, 323.13, 327.58, 321.33, 365.35, 364.32, 372.16, 386.37, 334.24, 372.45, 386.8, 364.74, 360.54, 438.12, 399.34, 366.66, 406.88] },
      velocityScore: { '1D': 4.5, '1W': 5.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: null, revenueGrowth: 97, eps: -0.5, grossMargin: 40, dividendYield: null,
      etfPresence: { POW: 1.84, VOLT: false, PBD: false, PBW: false, IVEP: 2.78 },
      tonyNote: 'Talen Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SO', name: 'Southern Co/The', easyScore: 2, avgWeight: 2.26, proScore: 0.9, coverage: 0.4,
      price: 97.2, weeklyPrices: [96.38, 95.17, 95.61, 96.47, 97.20], weeklyChange: 0.85, dayChange: 0.74, sortRank: 0, periodReturns: { '1M': 3.6, 'YTD': 11.5, '6M': 9.9, '1Y': 4.9 },
      priceHistory: { '1D': [96.48, 97.15, 97.18, 97.2], '1W': [96.38, 95.17, 95.61, 96.47, 97.2], '1M': [93.82, 94.31, 92.53, 93.09, 93.43, 94.93, 95.78, 95.91, 97.16, 96.75, 95.71, 95.12, 97.98, 95.99, 97.29, 96.38, 95.17, 95.61, 96.47, 97.2], 'YTD': [87.2, 87.22, 88.9, 88.16, 88.19, 89.38, 91.04, 95.92, 97.63, 97.84, 96.23, 95.42, 97.45, 95.93, 93.51, 93.77, 95.99, 93.47, 94.14, 93.74, 91.62, 93.27, 93.09, 97.16, 97.29, 97.2], '6M': [88.42, 87.51, 89.14, 91.08, 92.56, 94.3, 97.38, 97.2, 97.84, 96.23, 95.42, 97.45, 97.15, 94.51, 93.49, 96.71, 91.8, 92.55, 94.55, 92.05, 92.6, 94, 93.43, 96.75, 97.29, 97.2], '1Y': [92.68, 94.79, 94.3, 96, 94.57, 92.85, 93.13, 92.3, 90.83, 92.28, 92.33, 93.91, 95.49, 98.08, 97.69, 95.4, 93.15, 90.76, 90.58, 89.14, 89.01, 85.56, 86, 85.72, 87.57, 86.27, 88.42, 87.51, 89.14, 91.08, 92.56, 94.3, 96.35, 97.2, 97.84, 96.23, 95.42, 97.45, 97.15, 94.51, 93.49, 96.71, 91.8, 92.55, 94.55, 92.05, 92.6, 94, 93.43, 96.75, 97.29, 97.2] },
      velocityScore: { '1D': null, '1W': null, '1M': 11.1, '6M': null }, isNew: true,
      marketCap: '$110B', pe: 24.9, revenueGrowth: 8, eps: 3.91, grossMargin: 48, dividendYield: 3.18,
      etfPresence: { POW: 0.34, VOLT: false, PBD: false, PBW: false, IVEP: 4.18 },
      tonyNote: 'Southern Co/The appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 5.12, proScore: 2.05, coverage: 0.4,
      price: 962.25, weeklyPrices: [948.08, 938.39, 952.41, 931.47, 962.25], weeklyChange: 1.49, dayChange: 3.3, sortRank: 0, periodReturns: { '1M': 3, 'YTD': 68, '6M': 50.6, '1Y': 137.1 },
      priceHistory: { '1D': [931.55, 960.85, 962.27, 962.25], '1W': [948.08, 938.39, 952.41, 931.47, 962.25], '1M': [933.93, 945.46, 955.92, 985.82, 1022.28, 984.24, 994.45, 1057.01, 997.47, 1033.19, 1064.9, 991.41, 963.53, 969.92, 940.12, 948.08, 938.39, 952.41, 931.47, 962.25], 'YTD': [572.87, 608.13, 646.89, 635.92, 690.91, 742.12, 751.97, 766.61, 731.97, 700.69, 688.65, 703.19, 717.22, 791.73, 798.4, 828.79, 874.78, 912.14, 860.15, 909.93, 940.48, 897.63, 985.82, 997.47, 940.12, 962.25], '6M': [638.75, 648.41, 665.24, 678.31, 758.29, 759.74, 742.83, 706.08, 700.69, 688.65, 703.19, 717.22, 790.66, 794.65, 830.79, 889.67, 897.45, 888.31, 879.89, 875.87, 904.28, 910.57, 1022.28, 1033.19, 940.12, 962.25], '1Y': [405.77, 410.07, 432.94, 433.7, 408.54, 412.64, 432.3, 419.04, 422.78, 435.94, 472.1, 471.61, 495.38, 504.76, 531.18, 527.07, 570.59, 570.85, 552.05, 559.6, 568.06, 596.5, 589.76, 582.41, 577.39, 596.52, 638.75, 648.41, 665.24, 678.31, 758.29, 759.74, 752.93, 706.08, 700.69, 688.65, 703.19, 717.22, 790.66, 794.65, 830.79, 889.67, 897.45, 888.31, 879.89, 875.87, 904.28, 910.57, 1022.28, 1033.19, 940.12, 962.25] },
      velocityScore: { '1D': 0, '1W': 0.5, '1M': 3.5, '6M': null }, isNew: false,
      marketCap: '$443B', pe: 47.8, revenueGrowth: 22, eps: 20.12, grossMargin: 29, dividendYield: 0.7,
      etfPresence: { AIRR: false, PRN: 3.35, RSHO: 6.89, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 4.74, proScore: 1.9, coverage: 0.4,
      price: 233.34, weeklyPrices: [231.85, 236.58, 232.19, 225.66, 233.34], weeklyChange: 0.64, dayChange: 3.4, sortRank: 0, periodReturns: { '1M': -23.1, 'YTD': 119.6, '6M': 74.5, '1Y': 232.5 },
      priceHistory: { '1D': [225.66, 234.35, 234.6, 233.34], '1W': [231.85, 236.58, 232.19, 225.66, 233.34], '1M': [303.53, 292.7, 294.03, 297.2, 307.8, 291.5, 294.49, 309.2, 279.77, 281.09, 286.36, 264.86, 246.33, 248.05, 234.05, 231.85, 236.58, 232.19, 225.66, 233.34], 'YTD': [106.26, 119.94, 139.99, 141.15, 146.79, 187.3, 180.99, 183, 170.96, 171.19, 175.13, 174.8, 182.6, 228.99, 241.65, 260.52, 269.95, 308.05, 261.58, 295.94, 300.06, 290.5, 297.2, 279.77, 234.05, 233.34], '6M': [133.76, 142.29, 152.31, 179.6, 197.63, 182.27, 174.53, 167.67, 171.19, 175.13, 174.8, 182.6, 230.94, 241.01, 252.76, 275.33, 309.39, 292.65, 279.22, 284.42, 284.87, 294.75, 307.8, 281.09, 234.05, 233.34], '1Y': [70.19, 73.64, 80.8, 76.72, 88.28, 86.57, 86.12, 88.72, 90.8, 100.68, 100.97, 101.01, 103.9, 105.33, 116.4, 124.71, 130.23, 124.62, 105.94, 100.03, 106.53, 114.29, 109.31, 112.18, 109.16, 118.62, 133.76, 142.29, 152.31, 179.6, 197.63, 182.27, 176.96, 167.67, 171.19, 175.13, 174.8, 182.6, 230.94, 241.01, 252.76, 275.33, 309.39, 292.65, 279.22, 284.42, 284.87, 294.75, 307.8, 281.09, 234.05, 233.34] },
      velocityScore: { '1D': 0, '1W': -1, '1M': -9.1, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 45.5, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.16,
      etfPresence: { AIRR: 2.15, PRN: false, RSHO: 7.33, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 4.56, proScore: 1.82, coverage: 0.4,
      price: 694, weeklyPrices: [660.72, 707.17, 682.29, 660.04, 694.00], weeklyChange: 5.04, dayChange: 5.15, sortRank: 0, periodReturns: { '1M': -19.9, 'YTD': 126.6, '6M': 117.4, '1Y': 187.6 },
      priceHistory: { '1D': [660.04, 693.89, 695.76, 694], '1W': [660.72, 707.17, 682.29, 660.04, 694], '1M': [866.67, 857.76, 838.21, 861.88, 932.75, 892.25, 867.23, 881.92, 804.76, 813.77, 839.36, 776.55, 700.75, 717.11, 674.39, 660.72, 707.17, 682.29, 660.04, 694], 'YTD': [306.23, 297.62, 350.96, 361.21, 367.95, 418.61, 410.63, 455.25, 420.22, 404.59, 431.78, 415.93, 416.34, 459.02, 472.9, 505.45, 529.49, 851.35, 728.29, 782.12, 993.74, 838.55, 861.88, 804.76, 674.39, 694], '6M': [319.27, 364.25, 379.23, 365.07, 431.43, 435.5, 428.13, 398.87, 404.59, 431.78, 415.93, 416.34, 446.36, 463.65, 497.18, 532.67, 844.8, 848.84, 732.94, 860.84, 882.43, 858.99, 932.75, 813.77, 674.39, 694], '1Y': [241.31, 247.65, 263.59, 271.74, 289.86, 283.2, 286.49, 278.53, 286.71, 322.9, 367.39, 341.1, 352.78, 355.27, 369.01, 376.74, 392.77, 384.45, 332.82, 342.44, 320.51, 324.62, 319.12, 313.04, 307.68, 312.24, 319.27, 364.25, 379.23, 365.07, 431.43, 435.5, 433.34, 398.87, 404.59, 431.78, 415.93, 416.34, 446.36, 463.65, 497.18, 532.67, 844.8, 848.84, 732.94, 860.84, 882.43, 858.99, 932.75, 813.77, 674.39, 694] },
      velocityScore: { '1D': -1.1, '1W': -3.2, '1M': -15.7, '6M': null }, isNew: false,
      marketCap: '$21B', pe: 61.9, revenueGrowth: 92, eps: 11.22, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 5.17, PRN: 3.95, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.46, proScore: 1.78, coverage: 0.4,
      price: 1808.16, weeklyPrices: [1684.94, 1781.42, 1756.09, 1732.03, 1808.16], weeklyChange: 7.31, dayChange: 4.4, sortRank: 0, periodReturns: { '1M': -7.4, 'YTD': 93.7, '6M': 71.7, '1Y': 233 },
      priceHistory: { '1D': [1732.03, 1796.6, 1807.63, 1808.16], '1W': [1684.94, 1781.42, 1756.09, 1732.03, 1808.16], '1M': [1952.02, 1913.94, 1931.77, 1967.41, 2066.51, 1908.07, 1954.47, 2017.57, 1854.23, 1948.69, 1981.95, 1865.15, 1741.3, 1793.03, 1683.44, 1684.94, 1781.42, 1756.09, 1732.03, 1808.16], 'YTD': [933.29, 971.49, 1119.98, 1127.55, 1176.26, 1283.65, 1319.47, 1450.6, 1430.38, 1373.76, 1444.6, 1358.66, 1417.19, 1627.81, 1680.09, 1794.04, 1891.95, 2016.31, 1825.5, 1867.09, 1914.65, 1843.42, 1967.41, 1854.23, 1683.44, 1808.16], '6M': [1053.1, 1131.7, 1171.46, 1147.97, 1300.02, 1462.23, 1429.37, 1348.22, 1373.76, 1444.6, 1358.66, 1417.19, 1592.84, 1650.47, 1726.12, 1867.02, 1952.37, 1992.74, 1828.25, 1828.21, 1843.94, 1877.61, 2066.51, 1948.69, 1683.44, 1808.16], '1Y': [542.95, 544.95, 692.97, 699.16, 693.31, 695.76, 691.18, 703.38, 715.87, 782.05, 821.62, 801.8, 825.42, 845.99, 836.75, 976.45, 977.67, 974.14, 919.82, 945.07, 961.2, 989.48, 968.48, 950.79, 946.93, 1035.12, 1053.1, 1131.7, 1171.46, 1147.97, 1300.02, 1462.23, 1438.23, 1348.22, 1373.76, 1444.6, 1358.66, 1417.19, 1592.84, 1650.47, 1726.12, 1867.02, 1952.37, 1992.74, 1828.25, 1828.21, 1843.94, 1877.61, 2066.51, 1948.69, 1683.44, 1808.16] },
      velocityScore: { '1D': 0.6, '1W': 1.7, '1M': -1.7, '6M': null }, isNew: false,
      marketCap: '$64B', pe: 52.2, revenueGrowth: 1, eps: 34.64, grossMargin: 25, dividendYield: 0.15,
      etfPresence: { AIRR: 4.23, PRN: 4.69, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.98, proScore: 1.59, coverage: 0.4,
      price: 333.58, weeklyPrices: [315.88, 322.49, 331.15, 329.35, 333.58], weeklyChange: 5.6, dayChange: 1.25, sortRank: 0, periodReturns: { '1M': 5.5, 'YTD': 29.9, '6M': 20.2, '1Y': 29.8 },
      priceHistory: { '1D': [329.47, 333.96, 333.58], '1W': [315.88, 322.49, 331.15, 329.35, 333.58], '1M': [316.18, 324.38, 329.89, 337.96, 338.07, 330.9, 333.78, 343.54, 337.08, 334.16, 338.15, 332.08, 330.85, 328.53, 315.33, 315.88, 322.49, 331.15, 329.35, 333.58], 'YTD': [256.77, 264.62, 281.21, 281.54, 270.02, 282.45, 279.27, 280.76, 279.91, 259.88, 256.58, 260.51, 267.12, 293.26, 293.92, 298.1, 303.99, 313.7, 302.64, 312.65, 313.67, 318.89, 337.96, 337.08, 315.33, 333.58], '6M': [277.62, 282.33, 259.51, 287.03, 279.03, 281.97, 282.58, 274.97, 259.88, 256.58, 260.51, 267.12, 289.01, 291.03, 293.35, 302.99, 308.87, 307.17, 307.1, 303.81, 315.29, 320.11, 338.07, 334.16, 315.33, 333.58], '1Y': [256.98, 260.2, 274.69, 267.16, 262.51, 262.36, 264.21, 263.58, 266.22, 262.83, 265.48, 258.44, 259.04, 246.74, 249.57, 260, 253.33, 259.74, 240.63, 249.05, 256.44, 257.25, 259.81, 263.48, 261.16, 260.8, 277.62, 282.33, 259.51, 287.03, 279.03, 281.97, 283.5, 274.97, 259.88, 256.58, 260.51, 267.12, 289.01, 291.03, 293.35, 302.99, 308.87, 307.17, 307.1, 303.81, 315.29, 320.11, 338.07, 334.16, 315.33, 333.58] },
      velocityScore: { '1D': 0, '1W': 0.6, '1M': 15.2, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 31.6, revenueGrowth: 7, eps: 10.57, grossMargin: 30, dividendYield: 0.62,
      etfPresence: { AIRR: 1.92, PRN: false, RSHO: 6.04, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 4.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'EME', name: 'EMCOR Group, Inc.', easyScore: 2, avgWeight: 3.61, proScore: 1.44, coverage: 0.4,
      price: 780.78, weeklyPrices: [768.98, 783.41, 781.78, 764.90, 780.78], weeklyChange: 1.53, dayChange: 2.07, sortRank: 0, periodReturns: { '1M': -7.3, 'YTD': 27.6, '6M': 18.2, '1Y': 40.2 },
      priceHistory: { '1D': [764.97, 779.97, 780.78], '1W': [768.98, 783.41, 781.78, 764.9, 780.78], '1M': [842.3, 834.77, 827.5, 836.59, 868.88, 838.61, 847.17, 862.66, 798.1, 814.41, 829.88, 804.33, 774.66, 787.29, 768.38, 768.98, 783.41, 781.78, 764.9, 780.78], 'YTD': [611.79, 628.27, 698.69, 706.87, 731.67, 776.24, 783.06, 801.8, 740.87, 710.53, 751.33, 726.31, 756.3, 812.21, 831.11, 885.42, 910.26, 924.9, 854.36, 855.26, 845.43, 811.53, 836.59, 798.1, 768.38, 780.78], '6M': [660.73, 702.89, 730.4, 717.68, 782.93, 812.79, 724.62, 719.01, 710.53, 751.33, 726.31, 756.3, 802.43, 806.05, 869.9, 903.5, 921.64, 913.11, 848.91, 826.82, 817.44, 823.05, 868.88, 814.41, 768.38, 780.78], '1Y': [556.86, 560.44, 631.66, 629.22, 614.69, 612.92, 609.16, 620, 621.58, 628.75, 655.83, 640.63, 670, 677.02, 700.18, 754.85, 673.52, 656.33, 611.4, 602.84, 607.78, 629.22, 624.09, 621.84, 617.3, 650.97, 660.73, 702.89, 730.4, 717.68, 782.93, 812.79, 746.18, 719.01, 710.53, 751.33, 726.31, 756.3, 802.43, 806.05, 869.9, 903.5, 921.64, 913.11, 848.91, 826.82, 817.44, 823.05, 868.88, 814.41, 768.38, 780.78] },
      velocityScore: { '1D': 0, '1W': 2.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$35B', pe: 26.8, revenueGrowth: 20, eps: 29.14, grossMargin: 19, dividendYield: 0.2,
      etfPresence: { AIRR: 3.79, PRN: 3.43, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'EMCOR Group is an electrical and mechanical construction services company. Revenue grew substantially, and EMCOR is a core Industrials ETF holding because it builds the electrical systems inside data centers, manufacturing plants, and commercial buildings. The $827 share price reflects years of consistent execution and market share gains in a fragmented contractor market.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 2, avgWeight: 3.25, proScore: 1.3, coverage: 0.4,
      price: 275.74, weeklyPrices: [271.58, 273.77, 270.85, 271.28, 275.74], weeklyChange: 1.53, dayChange: 1.67, sortRank: 0, periodReturns: { '1M': 2, 'YTD': 34.5, '6M': 25.2, '1Y': 49.6 },
      priceHistory: { '1D': [271.21, 276.69, 275.82, 275.74], '1W': [271.58, 273.77, 270.85, 271.28, 275.74], '1M': [270.44, 277.42, 283.23, 277.66, 280.36, 275.13, 276.06, 273.14, 268.87, 268.57, 268.86, 267.41, 270.41, 277.91, 275.43, 271.58, 273.77, 270.85, 271.28, 275.74], 'YTD': [205.02, 210.02, 224.89, 215.39, 207.21, 225.15, 249.35, 259.64, 260.09, 243.82, 232.94, 230.51, 232.68, 256.14, 255.62, 241.7, 239.7, 269.76, 253.12, 258.02, 249.33, 264.6, 277.66, 268.87, 275.43, 275.74], '6M': [220.25, 217.7, 208.93, 209.63, 244.79, 258.1, 262.53, 252.39, 243.82, 232.94, 230.51, 232.68, 252.67, 255.69, 242.44, 239.51, 270.56, 260.35, 256.55, 258.25, 251.9, 264.67, 280.36, 268.57, 275.43, 275.74], '1Y': [184.32, 187.83, 188.17, 181.16, 179.88, 173.05, 171.24, 174.1, 179.43, 189.25, 192.15, 191.92, 190.48, 189.99, 192.52, 201.84, 206.74, 209.74, 200.28, 200.12, 198.74, 193.64, 197.24, 208.17, 207.81, 210.9, 220.25, 217.7, 208.93, 209.63, 244.79, 258.1, 260.31, 252.39, 243.82, 232.94, 230.51, 232.68, 252.67, 255.69, 242.44, 239.51, 270.56, 260.35, 256.55, 258.25, 251.9, 264.67, 280.36, 268.57, 275.43, 275.74] },
      velocityScore: { '1D': 2.4, '1W': 4, '1M': 19.3, '6M': null }, isNew: false,
      marketCap: '$110B', pe: 64, revenueGrowth: 19, eps: 4.31, grossMargin: 35, dividendYield: 0.18,
      etfPresence: { AIRR: false, PRN: 4.26, RSHO: false, IDEF: 2.25, BILT: false },
      tonyNote: 'Howmet Aerospace is an aerospace structures and engine components manufacturer. It appears in Industrials ETFs for its aerospace and defense exposure — commercial air travel recovery and defense spending growth are the two demand drivers. Revenue grew and margins are expanding as Howmet prices power over OEM customers.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 2.79, proScore: 1.12, coverage: 0.4,
      price: 221.37, weeklyPrices: [213.56, 216.63, 219.87, 215.14, 221.37], weeklyChange: 3.65, dayChange: 2.94, sortRank: 0, periodReturns: { '1M': -6.6, 'YTD': 10.6, '6M': 5.5, '1Y': 26.9 },
      priceHistory: { '1D': [215.04, 221.37, 221.37], '1W': [213.56, 216.63, 219.87, 215.14, 221.37], '1M': [237.06, 234.8, 235.29, 242.97, 246.41, 236.07, 237.22, 244.56, 231.87, 238.21, 245.17, 231.72, 227.74, 232.19, 218.83, 213.56, 216.63, 219.87, 215.14, 221.37], 'YTD': [200.06, 207.44, 217.65, 215.21, 212.73, 223.86, 241.58, 226.66, 222.07, 202.65, 202.36, 200.45, 197.29, 221.27, 217.61, 222.45, 201.12, 198.99, 195.79, 215.34, 236.14, 233.49, 242.97, 231.87, 218.83, 221.37], '6M': [209.78, 217.13, 211.84, 218.02, 230.92, 242.29, 226.94, 211.9, 202.65, 202.36, 200.45, 197.29, 215.97, 223.52, 222.82, 208.13, 202.84, 200.99, 207.8, 216.66, 227.8, 230.05, 246.41, 238.21, 218.83, 221.37], '1Y': [174.38, 174.44, 180.42, 200.98, 200.51, 187.85, 188.95, 187.11, 189.1, 186.95, 189.75, 184.24, 190.89, 180.71, 184.97, 195.85, 215.13, 224.93, 207.28, 211.97, 208.53, 206.16, 218.13, 207.18, 203.51, 208, 209.78, 217.13, 211.84, 218.02, 230.92, 242.29, 231.59, 211.9, 202.65, 202.36, 200.45, 197.29, 215.97, 223.52, 222.82, 208.13, 202.84, 200.99, 207.8, 216.66, 227.8, 230.05, 246.41, 238.21, 218.83, 221.37] },
      velocityScore: { '1D': 0, '1W': -0.9, '1M': -0.9, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 42.3, revenueGrowth: 17, eps: 5.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.62, PRN: false, RSHO: 3.96, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 2, avgWeight: 2.27, proScore: 0.91, coverage: 0.4,
      price: 180.45, weeklyPrices: [184.11, 186.99, 186.00, 177.14, 180.45], weeklyChange: -1.99, dayChange: 1.89, sortRank: 0, periodReturns: { '1M': -7, 'YTD': 4.4, '6M': -11.6, '1Y': 30.1 },
      priceHistory: { '1D': [177.11, 180.29, 180.15, 180.45], '1W': [184.11, 186.99, 186, 177.14, 180.45], '1M': [193.94, 196.93, 203.07, 205.4, 210, 209.89, 205.65, 204.77, 197.91, 189.25, 194.65, 191.25, 191.06, 196.89, 186.08, 184.11, 186.99, 186, 177.14, 180.45], 'YTD': [172.84, 193.2, 217.89, 206.04, 206.04, 203, 202.25, 208.27, 205.57, 197.82, 210.12, 205.09, 214.98, 232.83, 228.24, 222.07, 216.68, 206.83, 197.33, 198.95, 190.76, 194.68, 205.4, 197.91, 186.08, 180.45], '6M': [204.08, 206.33, 210.18, 187.42, 196.9, 206.44, 205.98, 195.5, 197.82, 210.12, 205.09, 214.98, 229.57, 235.78, 223.15, 216.31, 205.33, 204.72, 202.91, 195.88, 185.95, 193.45, 210, 189.25, 186.08, 180.45], '1Y': [138.65, 140.36, 149.83, 154.51, 177.89, 170.94, 162.84, 162.04, 163.75, 174.3, 178.19, 181.96, 191.38, 197.37, 207.72, 204.03, 215.86, 198.79, 176.18, 174.62, 174.93, 178.75, 174.37, 178.41, 174.36, 192.24, 204.08, 206.33, 210.18, 187.42, 196.9, 206.44, 207.24, 195.5, 197.82, 210.12, 205.09, 214.98, 229.57, 235.78, 223.15, 216.31, 205.33, 204.72, 202.91, 195.88, 185.95, 193.45, 210, 189.25, 186.08, 180.45] },
      velocityScore: { '1D': -3.2, '1W': -5.2, '1M': -3.2, '6M': null }, isNew: false,
      marketCap: '$17B', pe: 48, revenueGrowth: 26, eps: 3.76, grossMargin: 23, dividendYield: 0.56,
      etfPresence: { AIRR: 2.96, PRN: false, RSHO: false, IDEF: 1.57, BILT: false },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 2, avgWeight: 1.89, proScore: 0.76, coverage: 0.4,
      price: 286.13, weeklyPrices: [289.47, 286.21, 286.09, 284.86, 286.13], weeklyChange: -1.16, dayChange: 0.45, sortRank: 0, periodReturns: { '1M': -4.5, 'YTD': -15.9, '6M': -31.1, '1Y': 10.7 },
      priceHistory: { '1D': [284.85, 286.57, 286.13], '1W': [289.47, 286.21, 286.09, 284.86, 286.13], '1M': [299.66, 298.51, 296.89, 285.43, 278.19, 283.48, 279.62, 279.09, 281.99, 277.39, 279.89, 278.97, 291.5, 294.1, 289.46, 289.47, 286.21, 286.09, 284.86, 286.13], 'YTD': [340.07, 378.47, 425.9, 413.56, 420.3, 405.82, 424.89, 435.58, 437.03, 414.56, 418.42, 384.79, 396.62, 394.46, 392.19, 358.4, 363.37, 333.56, 324.6, 317.56, 294.53, 300.95, 285.43, 281.99, 289.46, 286.13], '6M': [415.39, 424.14, 427.83, 369.38, 406.76, 437.57, 444.52, 421.17, 414.56, 418.42, 384.79, 396.62, 394.41, 394.81, 359.29, 360.6, 316.28, 326.17, 320.63, 308.17, 293.04, 297.68, 278.19, 277.39, 289.46, 286.13], '1Y': [258.5, 252.93, 262.49, 265.67, 266.65, 267.6, 270.72, 270.79, 269.94, 273.02, 276.16, 279.53, 288.49, 287.9, 285.77, 301.69, 317.54, 318.66, 309.74, 309.92, 306.65, 315.88, 329.16, 353.52, 341.98, 356.45, 415.39, 424.14, 427.83, 369.38, 406.76, 437.57, 443, 421.17, 414.56, 418.42, 384.79, 396.62, 394.41, 394.81, 359.29, 360.6, 316.28, 326.17, 320.63, 308.17, 293.04, 297.68, 278.19, 277.39, 289.46, 286.13] },
      velocityScore: { '1D': 1.3, '1W': 2.7, '1M': 1.3, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 18.7, revenueGrowth: 13, eps: 15.33, grossMargin: 12, dividendYield: 1.93,
      etfPresence: { AIRR: 2.73, PRN: false, RSHO: false, IDEF: 1.05, BILT: false },
      tonyNote: 'Huntington Ingalls Industries is the only builder of nuclear-powered aircraft carriers for the U.S. Navy. Revenue is government-contracted and predictable; the ETF allocation in Industrials reflects defense spending growth and the Navy\'s backlog of nuclear submarine and carrier construction. A steady-state quality compounder in a market structure with no competition.',
    },
    {
      ticker: 'CW', name: 'Curtiss-Wright Corp', easyScore: 2, avgWeight: 1.85, proScore: 0.74, coverage: 0.4,
      price: 753.88, weeklyPrices: [760.57, 759.71, 754.76, 740.06, 753.88], weeklyChange: -0.88, dayChange: 1.78, sortRank: 0, periodReturns: { '1M': -1.1, 'YTD': 36.8, '6M': 18.4, '1Y': 54.8 },
      priceHistory: { '1D': [740.67, 756.86, 757.87, 753.88], '1W': [760.57, 759.71, 754.76, 740.06, 753.88], '1M': [762.59, 764.61, 777.29, 771.93, 783.82, 765.13, 762.92, 767.73, 747.27, 737.39, 757.76, 757.76, 760.23, 792.77, 766.54, 760.57, 759.71, 754.76, 740.06, 753.88], 'YTD': [551.27, 582.61, 663.84, 649.68, 663.99, 653.82, 690.86, 698.72, 712.59, 680.29, 691.62, 665.81, 694.88, 734.01, 730.01, 717.16, 718.82, 735.34, 704.95, 742.59, 743.43, 757.23, 771.93, 747.27, 766.54, 753.88], '6M': [636.65, 657.42, 663.9, 618.6, 671.06, 707.45, 700.33, 678.68, 680.29, 691.62, 665.81, 694.88, 725.71, 735.65, 717.53, 713.14, 729.2, 712.72, 731.24, 747.61, 733.14, 758, 783.82, 737.39, 766.54, 753.88], '1Y': [487.14, 480.06, 490.63, 496.42, 489.47, 493.63, 478.91, 478.15, 484.23, 518.78, 518.13, 530.68, 554.06, 550.8, 561.23, 573.23, 601.78, 588.42, 543.73, 546.35, 546.05, 547.76, 547.36, 568.06, 558.58, 583.18, 636.65, 657.42, 663.9, 618.6, 671.06, 707.45, 701.99, 678.68, 680.29, 691.62, 665.81, 694.88, 725.71, 735.65, 717.53, 713.14, 729.2, 712.72, 731.24, 747.61, 733.14, 758, 783.82, 737.39, 766.54, 753.88] },
      velocityScore: { '1D': null, '1W': -1.3, '1M': null, '6M': null }, isNew: true,
      marketCap: '$28B', pe: 55.4, revenueGrowth: 13, eps: 13.62, grossMargin: 37, dividendYield: 0.14,
      etfPresence: { AIRR: false, PRN: 2.74, RSHO: false, IDEF: 0.97, BILT: false },
      tonyNote: 'Curtiss-Wright Corp appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 2, avgWeight: 1.71, proScore: 0.69, coverage: 0.4,
      price: 48.87, weeklyPrices: [50.38, 48.85, 48.19, 46.96, 48.87], weeklyChange: -3, dayChange: 4.07, sortRank: 0, periodReturns: { '1M': -14.3, 'YTD': -35.6, '6M': -59.8, '1Y': -6 },
      priceHistory: { '1D': [46.96, 48.69, 48.56, 48.87], '1W': [50.38, 48.85, 48.19, 46.96, 48.87], '1M': [57.02, 56.34, 56.16, 54.21, 51.09, 50.8, 47.95, 46.32, 47.21, 46.95, 49.86, 53.04, 55.35, 53.54, 50.34, 50.38, 48.85, 48.19, 46.96, 48.87], 'YTD': [75.91, 104.04, 130.72, 111.32, 96.16, 98.81, 97.21, 88.23, 89.13, 89.46, 92.78, 75.86, 67.31, 73.55, 69.83, 63.16, 61.93, 57.33, 53.47, 57.3, 63.4, 58.78, 54.21, 47.21, 50.34, 48.87], '6M': [121.5, 113.85, 108.16, 85.25, 87.05, 96.08, 86.18, 85.54, 89.46, 92.78, 75.86, 67.31, 70.34, 70.99, 61.26, 62.05, 57.89, 52.09, 56.18, 64.13, 58.52, 57.75, 51.09, 46.95, 50.34, 48.87], '1Y': [51.99, 58.78, 59.36, 59.5, 65.41, 68.74, 66.9, 65.84, 64.14, 70.74, 80.72, 88.08, 100.25, 96.28, 86.65, 90.68, 91.1, 79.18, 70.24, 74.11, 73.21, 77.03, 74.26, 81.53, 75.98, 91.44, 121.5, 113.85, 108.16, 85.25, 87.05, 96.08, 92.14, 85.54, 89.46, 92.78, 75.86, 67.31, 70.34, 70.99, 61.26, 62.05, 57.89, 52.09, 56.18, 64.13, 58.52, 57.75, 51.09, 46.95, 50.34, 48.87] },
      velocityScore: { '1D': 0, '1W': -8, '1M': -13.8, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 287.5, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.51, PRN: false, RSHO: false, IDEF: 0.92, BILT: false },
      tonyNote: 'Kratos Defense is a defense technology company focused on unmanned systems, satellite communications, and high-performance computing for government customers. It appears in Industrials ETFs as an AI-adjacent defense name — autonomous systems and AI-driven surveillance are direct end markets. Revenue grew and the government contract backlog is expanding.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 1.38, proScore: 0.55, coverage: 0.4,
      price: 76.03, weeklyPrices: [75.27, 75.45, 75.02, 74.46, 76.03], weeklyChange: 1.02, dayChange: 2.14, sortRank: 0, periodReturns: { '1M': 6.4, 'YTD': 26.5, '6M': 25.2, '1Y': 28.8 },
      priceHistory: { '1D': [74.44, 75.61, 76, 76.03], '1W': [75.27, 75.45, 75.02, 74.46, 76.03], '1M': [71.49, 71.48, 71.25, 73.12, 74.95, 75.79, 75.87, 77.53, 77.92, 75.06, 74.34, 72.77, 73.14, 72.82, 75.08, 75.27, 75.45, 75.02, 74.46, 76.03], 'YTD': [60.11, 61.15, 61.55, 64.29, 66.34, 67.85, 72.14, 73.97, 75.77, 73.52, 74.06, 74.06, 72, 71.54, 70.91, 71.61, 75.41, 74.73, 79.4, 74.37, 72.43, 71.62, 73.12, 77.92, 75.08, 76.03], '6M': [60.71, 63.72, 67.24, 67.42, 71.13, 72.98, 74.72, 74.77, 73.52, 74.06, 74.06, 72, 72.74, 71.15, 72.18, 75.54, 71.96, 77.72, 78.47, 71.39, 71.96, 72.08, 74.95, 75.06, 75.08, 76.03], '1Y': [59.04, 57.68, 57.51, 60.26, 58.06, 56.52, 56.83, 57.88, 56.85, 58.4, 60.16, 63.97, 63.58, 62.68, 63.06, 57.67, 59.03, 60.6, 59.91, 59.43, 61.44, 61.95, 59.48, 58.92, 60.16, 60.39, 60.71, 63.72, 67.24, 67.42, 71.13, 72.98, 74.77, 74.77, 73.52, 74.06, 74.06, 72, 72.74, 71.15, 72.18, 75.54, 71.96, 77.72, 78.47, 71.39, 71.96, 72.08, 74.95, 75.06, 75.08, 76.03] },
      velocityScore: { '1D': -1.8, '1W': 0, '1M': 0, '6M': null }, isNew: false,
      marketCap: '$93B', pe: 33.3, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.8,
      etfPresence: { AIRR: false, PRN: false, RSHO: 0.92, IDEF: false, BILT: 1.84 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AIR', name: 'AIRBUS GROUP', easyScore: 2, avgWeight: 1.34, proScore: 0.54, coverage: 0.4,
      price: 135.27, weeklyPrices: [133.30, 136.57, 135.67, 130.90, 135.27], weeklyChange: 1.48, dayChange: 3.42, sortRank: 0, periodReturns: { '1M': 3.1, 'YTD': 63.4, '6M': 33.8, '1Y': 81 },
      priceHistory: { '1D': [130.8, 135.07, 135.27], '1W': [133.3, 136.57, 135.67, 130.9, 135.27], '1M': [131.18, 129.96, 132.14, 134.88, 134.28, 132.26, 132.94, 138.51, 143.14, 141.85, 142.93, 142.76, 140.11, 143.61, 136.63, 133.3, 136.57, 135.67, 130.9, 135.27], 'YTD': [82.79, 94.73, 105.08, 104.26, 108, 114.34, 114.63, 117.06, 118.61, 103.78, 109.21, 110.82, 109.78, 123.77, 121.97, 110.2, 109.56, 111.51, 100.89, 112.82, 115.53, 127.23, 134.88, 143.14, 136.63, 135.27], '6M': [101.08, 107.74, 106.67, 106.87, 113.22, 116.97, 117.17, 110.71, 103.78, 109.21, 110.82, 109.78, 120.83, 123.04, 110.54, 110.35, 117.78, 104.55, 108.41, 112.62, 116.65, 129.01, 134.28, 141.85, 136.63, 135.27], '1Y': [74.72, 80.55, 76.8, 73.54, 75.4, 75.75, 75.09, 75.66, 74.77, 74.43, 76.9, 87.9, 83.35, 81.28, 84.02, 84.59, 85.73, 83.31, 78.95, 79.67, 81.6, 81.13, 82.71, 86.18, 83.52, 91.34, 101.08, 107.74, 106.67, 106.87, 113.22, 116.97, 118.17, 110.71, 103.78, 109.21, 110.82, 109.78, 120.83, 123.04, 110.54, 110.35, 117.78, 104.55, 108.41, 112.62, 116.65, 129.01, 134.28, 141.85, 136.63, 135.27] },
      velocityScore: { '1D': 0, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5B', pe: 29.7, revenueGrowth: 25, eps: 4.56, grossMargin: 19, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 2.53, BILT: false },
      tonyNote: 'AIRBUS GROUP appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RBC', name: 'RBC Bearings Incorporated', easyScore: 2, avgWeight: 1.16, proScore: 0.46, coverage: 0.4,
      price: 597.18, weeklyPrices: [593.89, 595.61, 595.49, 584.59, 597.18], weeklyChange: 0.55, dayChange: 2.16, sortRank: 0, periodReturns: { '1M': -3.2, 'YTD': 33.2, '6M': 22, '1Y': 58.5 },
      priceHistory: { '1D': [584.58, 596.59, 597.18], '1W': [593.89, 595.61, 595.49, 584.59, 597.18], '1M': [616.95, 621.08, 625.73, 639.18, 645.73, 633.44, 638.94, 648.89, 630.36, 634.78, 644.06, 620.47, 604.56, 609.6, 600.26, 593.89, 595.61, 595.49, 584.59, 597.18], 'YTD': [448.43, 485, 498.82, 504.5, 507.13, 548.2, 551.65, 565.44, 570.08, 547.31, 540.83, 548.95, 548.11, 595.74, 596.86, 591, 593.12, 613.1, 565.22, 577.42, 589.76, 607.46, 639.18, 630.36, 600.26, 597.18], '6M': [489.33, 504.99, 511.98, 520.16, 550.4, 559.18, 575.92, 566.06, 547.31, 540.83, 548.95, 548.11, 598.3, 589.77, 589.51, 595.76, 605.99, 569.06, 559.95, 571.96, 590.09, 603.64, 645.73, 634.78, 600.26, 597.18], '1Y': [376.71, 391.98, 385.62, 405.98, 396.84, 398.93, 399.58, 389.96, 381.97, 382.27, 383.5, 384.3, 374.45, 380.76, 387.73, 411.08, 428.4, 441.04, 429.28, 430, 441.76, 443.51, 462.59, 459.83, 452.89, 467.37, 489.33, 504.99, 511.98, 520.16, 550.4, 559.18, 576.5, 566.06, 547.31, 540.83, 548.95, 548.11, 598.3, 589.77, 589.51, 595.76, 605.99, 569.06, 559.95, 571.96, 590.09, 603.64, 645.73, 634.78, 600.26, 597.18] },
      velocityScore: { '1D': 0, '1W': 0, '1M': 2.2, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 65.9, revenueGrowth: 18, eps: 9.06, grossMargin: 45, dividendYield: null,
      etfPresence: { AIRR: 1.84, PRN: false, RSHO: false, IDEF: 0.48, BILT: false },
      tonyNote: 'RBC Bearings Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, avgWeight: 1.03, proScore: 0.41, coverage: 0.4,
      price: 46.43, weeklyPrices: [49.96, 50.05, 50.01, 45.13, 46.43], weeklyChange: -7.07, dayChange: 2.9, sortRank: 0, periodReturns: { '1M': -3.8, 'YTD': -36.5, '6M': -57, '1Y': -6 },
      priceHistory: { '1D': [45.12, 46.3, 46.43], '1W': [49.96, 50.05, 50.01, 45.13, 46.43], '1M': [48.27, 51.7, 52.03, 50.37, 47.7, 46.38, 44.84, 46.27, 46.42, 47.1, 49.92, 54.93, 56.37, 53.36, 51.47, 49.96, 50.05, 50.01, 45.13, 46.43], 'YTD': [73.17, 101.28, 108.5, 108.71, 102.87, 97.47, 81, 83.44, 98.88, 98.98, 105.95, 86.01, 85.83, 87.79, 82.69, 71.95, 65.32, 62.48, 64.2, 63.52, 54.39, 49.58, 50.37, 46.42, 51.47, 46.43], '6M': [108.01, 111.61, 110.93, 89.78, 78.71, 81.62, 88.11, 97.14, 98.98, 105.95, 86.01, 85.83, 82.52, 83.58, 70.22, 65.73, 60.84, 62.77, 64.1, 57.5, 49.44, 47.83, 47.7, 47.1, 51.47, 46.43], '1Y': [49.41, 56.22, 50.29, 51.41, 46.7, 51.78, 53.04, 53.41, 62.36, 63.8, 67.23, 71.35, 74.22, 79.07, 78.25, 83.87, 87.04, 72.31, 58.28, 63.9, 63.71, 66.06, 68.06, 78.87, 74.62, 91.72, 108.01, 111.61, 110.93, 89.78, 78.71, 81.62, 88.31, 97.14, 98.98, 105.95, 86.01, 85.83, 82.52, 83.58, 70.22, 65.73, 60.84, 62.77, 64.1, 57.5, 49.44, 47.83, 47.7, 47.1, 51.47, 46.43] },
      velocityScore: { '1D': -8.9, '1W': -10.9, '1M': 0, '6M': null }, isNew: false,
      marketCap: '$6B', pe: 201.9, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.87, PRN: false, RSHO: false, IDEF: 0.18, BILT: false },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRCY', name: 'Mercury Systems, Inc.', easyScore: 2, avgWeight: 1.01, proScore: 0.4, coverage: 0.4,
      price: 99.38, weeklyPrices: [112.41, 114.25, 107.98, 98.26, 99.38], weeklyChange: -11.59, dayChange: 1.14, sortRank: 0, periodReturns: { '1M': -14.3, 'YTD': 36.1, '6M': 0.8, '1Y': 93.8 },
      priceHistory: { '1D': [98.26, 99.71, 99.38], '1W': [112.41, 114.25, 107.98, 98.26, 99.38], '1M': [115.93, 112.44, 115.5, 113.91, 111.76, 110.87, 105, 105.57, 109.38, 110.22, 122.33, 123.05, 126.21, 123.07, 115.83, 112.41, 114.25, 107.98, 98.26, 99.38], 'YTD': [73.01, 88.74, 103.02, 98.89, 93.89, 85.37, 86.66, 89.3, 89.18, 81.44, 77.81, 76.16, 74.22, 82.52, 84.12, 77.06, 78.53, 92.32, 92.8, 97.11, 117.82, 119.32, 113.91, 109.38, 115.83, 99.38], '6M': [98.62, 99.48, 98.29, 79.07, 80.25, 87.63, 89.03, 84.96, 81.44, 77.81, 76.16, 74.22, 79.6, 84.05, 77.99, 78.55, 90.34, 92.03, 98.55, 111.7, 111.27, 120.3, 111.76, 110.22, 115.83, 99.38], '1Y': [51.27, 52.37, 52.76, 53.56, 53.58, 66.8, 67.98, 67.55, 68.68, 72.81, 76.57, 75.28, 84, 76.69, 77.04, 78.55, 77.78, 74.65, 68.35, 66.67, 66.8, 71.94, 74.49, 73.51, 73.85, 84.8, 98.62, 99.48, 98.29, 79.07, 80.25, 87.63, 89.58, 84.96, 81.44, 77.81, 76.16, 74.22, 79.6, 84.05, 77.99, 78.55, 90.34, 92.03, 98.55, 111.7, 111.27, 120.3, 111.76, 110.22, 115.83, 99.38] },
      velocityScore: { '1D': -7, '1W': -16.7, '1M': -14.9, '6M': null }, isNew: false,
      marketCap: '$6B', pe: null, revenueGrowth: 12, eps: -0.23, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: 1.1, PRN: false, RSHO: false, IDEF: 0.91, BILT: false },
      tonyNote: 'Mercury Systems, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DRS', name: 'Leonardo DRS, Inc.', easyScore: 2, avgWeight: 0.57, proScore: 0.23, coverage: 0.4,
      price: 44.08, weeklyPrices: [44.71, 44.67, 44.15, 43.35, 44.08], weeklyChange: -1.41, dayChange: 1.68, sortRank: 0, periodReturns: { '1M': -5.6, 'YTD': 29.3, '6M': 6.4, '1Y': -8.1 },
      priceHistory: { '1D': [43.35, 44.05, 44.08], '1W': [44.71, 44.67, 44.15, 43.35, 44.08], '1M': [46.68, 45.59, 46.58, 46.08, 44.99, 45.74, 44.69, 44.36, 42.48, 40.95, 42.67, 42.69, 43.72, 45.37, 45.47, 44.71, 44.67, 44.15, 43.35, 44.08], 'YTD': [34.09, 38.84, 42.57, 40.63, 40.45, 40.22, 39.9, 42.36, 46.95, 45.91, 45.48, 46.53, 46.3, 47.43, 44.24, 40.72, 40, 42.87, 42.81, 45.35, 46.71, 49.69, 46.08, 42.48, 45.47, 44.08], '6M': [41.42, 41.28, 41.3, 37.27, 37.77, 40.03, 43.39, 45.82, 45.91, 45.48, 46.53, 46.3, 46.06, 44.57, 39.98, 40.03, 41.36, 41.5, 44.92, 48.76, 46.15, 48.53, 44.99, 40.95, 45.47, 44.08], '1Y': [47.97, 46.79, 48.08, 42.25, 41.58, 42.73, 41.03, 41.66, 41.05, 42.02, 42.88, 43.76, 45.29, 43.67, 39.91, 41.31, 36.62, 35.61, 34.28, 33.63, 33.24, 33.92, 33.68, 34.77, 34.09, 37.2, 41.42, 41.28, 41.3, 37.27, 37.77, 40.03, 43.34, 45.82, 45.91, 45.48, 46.53, 46.3, 46.06, 44.57, 39.98, 40.03, 41.36, 41.5, 44.92, 48.76, 46.15, 48.53, 44.99, 40.95, 45.47, 44.08] },
      velocityScore: { '1D': 0, '1W': 0, '1M': -4.2, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 41.2, revenueGrowth: 6, eps: 1.07, grossMargin: 24, dividendYield: 0.82,
      etfPresence: { AIRR: 0.86, PRN: false, RSHO: false, IDEF: 0.29, BILT: false },
      tonyNote: 'Leonardo DRS, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TPC', name: 'Tutor Perini Corporation', easyScore: 2, avgWeight: 0.36, proScore: 0.15, coverage: 0.4,
      price: 76.89, weeklyPrices: [75.49, 74.98, 75.89, 74.74, 76.89], weeklyChange: 1.85, dayChange: 2.88, sortRank: 0, periodReturns: { '1M': 0.4, 'YTD': 14.7, '6M': 4.1, '1Y': 55.3 },
      priceHistory: { '1D': [74.74, 77.2, 76.89], '1W': [75.49, 74.98, 75.89, 74.74, 76.89], '1M': [76.55, 76.19, 77.89, 77.99, 81.5, 81, 82.36, 81.56, 79.53, 81.88, 82.97, 79.51, 76.75, 79.91, 74.87, 75.49, 74.98, 75.89, 74.74, 76.89], 'YTD': [67.02, 70.17, 75.09, 77.34, 80.11, 84.07, 81.1, 86.1, 73.71, 69.2, 72.31, 76.24, 77.3, 83.8, 84.38, 87.5, 92.76, 82.69, 74.91, 74.47, 72.38, 73.61, 77.99, 79.53, 74.87, 76.89], '6M': [73.89, 76.79, 79.86, 79.95, 81.73, 86.9, 75.37, 71.12, 69.2, 72.31, 76.24, 77.3, 83.35, 84.22, 86.76, 93.68, 82.85, 79.49, 72.76, 71.49, 70.53, 74.92, 81.5, 81.88, 74.87, 76.89], '1Y': [49.51, 48.97, 47.63, 46.18, 56.6, 57.44, 58.52, 58.94, 61.83, 64.22, 66.81, 65.43, 62.84, 62.26, 67.11, 68.72, 68.21, 63.97, 58.76, 64.01, 66.43, 68.6, 67.81, 69.57, 67.92, 71.09, 73.89, 76.79, 79.86, 79.95, 81.73, 86.9, 89.38, 71.12, 69.2, 72.31, 76.24, 77.3, 83.35, 84.22, 86.76, 93.68, 82.85, 79.49, 72.76, 71.49, 70.53, 74.92, 81.5, 81.88, 74.87, 76.89] },
      velocityScore: { '1D': 0, '1W': 0, '1M': 7.1, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 52.7, revenueGrowth: 12, eps: 1.46, grossMargin: 12, dividendYield: 0.32,
      etfPresence: { AIRR: 0.7, PRN: false, RSHO: false, IDEF: 0.03, BILT: false },
      tonyNote: 'Tutor Perini Corporation appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RTX', name: 'RTX CORP', easyScore: 1, avgWeight: 8.76, proScore: 1.75, coverage: 0.2,
      price: 196.92, weeklyPrices: [194.91, 195.20, 195.93, 196.39, 196.92], weeklyChange: 1.03, dayChange: 0.24, sortRank: 0, periodReturns: { '1M': 7.2, 'YTD': 7.4, '6M': -1, '1Y': 31.9 },
      priceHistory: { '1D': [196.44, 197.11, 196.56, 196.92], '1W': [194.91, 195.2, 195.93, 196.39, 196.92], '1M': [183.64, 186.77, 192.58, 185.6, 181.83, 186.39, 185.06, 186.59, 187.99, 187.33, 189.73, 191.78, 199.25, 201.37, 200.85, 194.91, 195.2, 195.93, 196.39, 196.92], 'YTD': [183.4, 187.17, 201.92, 194.13, 201.09, 196.19, 204.81, 195.98, 208.82, 203.04, 200.73, 192.85, 196.21, 201.41, 195.79, 173.38, 172.9, 178.89, 174.49, 176.59, 179.41, 184.21, 185.6, 187.99, 200.85, 196.92], '6M': [198.84, 196.34, 199.88, 195.97, 201.14, 204.92, 202.62, 203.86, 203.04, 200.73, 192.85, 196.21, 201.56, 196.42, 174.26, 173.99, 176.09, 171.18, 177.01, 179.66, 180.99, 183.53, 181.83, 187.33, 200.85, 196.92], '1Y': [149.28, 151.56, 156.07, 157.38, 154.8, 155.5, 156.27, 158.6, 154.22, 158.37, 159.43, 163.63, 168.8, 158.85, 160.71, 179.24, 177.04, 179.03, 175.63, 173.21, 168.02, 171.52, 182.11, 185.68, 184.01, 185.73, 198.84, 196.34, 199.88, 195.97, 201.14, 204.92, 197.63, 203.86, 203.04, 200.73, 192.85, 196.21, 201.56, 196.42, 174.26, 173.99, 176.09, 171.18, 177.01, 179.66, 180.99, 183.53, 181.83, 187.33, 200.85, 196.92] },
      velocityScore: { '1D': 1.7, '1W': null, '1M': 10.1, '6M': null }, isNew: false,
      marketCap: '$265B', pe: 36.9, revenueGrowth: 9, eps: 5.33, grossMargin: 20, dividendYield: 1.49,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 8.76, BILT: false },
      tonyNote: 'RTX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 4.23, proScore: 4.23, coverage: 1,
      price: 218.28, weeklyPrices: [216.48, 216.20, 219.65, 210.51, 218.28], weeklyChange: 0.83, dayChange: 3.69, sortRank: 0, periodReturns: { '1M': -16.1, 'YTD': 160.8, '6M': 114, '1Y': 320.2 },
      priceHistory: { '1D': [210.51, 216.55, 217.75, 218.28], '1W': [216.48, 216.2, 219.65, 210.51, 218.28], '1M': [260.07, 265.1, 280.91, 286.69, 283.61, 275.25, 259.66, 256.63, 240.3, 261.15, 276.17, 229.18, 215.62, 213.02, 195.19, 216.48, 216.2, 219.65, 210.51, 218.28], 'YTD': [83.71, 97.3, 108.73, 91.46, 88.16, 92.88, 101.8, 106.12, 97.78, 108.04, 121.52, 105.97, 108.82, 154.56, 159.16, 144.96, 176.42, 179.11, 197.73, 208.37, 259.67, 222.24, 286.69, 240.3, 195.19, 218.28], '6M': [101.98, 96.85, 94.91, 73.87, 89.73, 97.92, 91.19, 95.65, 108.04, 121.52, 105.97, 108.82, 144.97, 157.14, 147.16, 154.49, 177.05, 219.94, 214.77, 231.09, 227.81, 232.36, 283.61, 261.15, 195.19, 218.28], '1Y': [51.95, 52.37, 52.75, 54.17, 70.24, 72.54, 70.02, 68.32, 64.06, 90.96, 106.6, 110.22, 124.94, 135.46, 109, 125.43, 120.47, 109.95, 85.98, 91.9, 100.15, 100.33, 81.14, 93.23, 85.17, 96.21, 101.98, 96.85, 94.91, 73.87, 89.73, 97.92, 104.88, 95.65, 108.04, 121.52, 105.97, 108.82, 144.97, 157.14, 147.16, 154.49, 177.05, 219.94, 214.77, 231.09, 227.81, 232.36, 283.61, 261.15, 195.19, 218.28] },
      velocityScore: { '1D': 0, '1W': 1.4, '1M': -4.9, '6M': null }, isNew: false,
      marketCap: '$55B', pe: 84.3, revenueGrowth: 684, eps: 2.59, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 3.03, MEME: 6.15, RKNG: 3.51 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 5.38, proScore: 3.59, coverage: 0.667,
      price: 249.62, weeklyPrices: [254.29, 257.02, 244.61, 233.49, 249.62], weeklyChange: -1.84, dayChange: 6.94, sortRank: 0, periodReturns: { '1M': -9.1, 'YTD': 187.3, '6M': 87, '1Y': 861.6 },
      priceHistory: { '1D': [233.41, 248.92, 249.5, 249.62], '1W': [254.29, 257.02, 244.61, 233.49, 249.62], '1M': [274.5, 280.88, 284.99, 328.91, 345.85, 321.98, 326.19, 309.18, 252.02, 275.01, 302.7, 289.5, 270.89, 295.05, 269.57, 254.29, 257.02, 244.61, 233.49, 249.62], 'YTD': [86.89, 121.84, 149.5, 139.62, 156.13, 155.17, 157.27, 174.77, 164.78, 157.17, 166.69, 133.52, 135.63, 176.67, 218.27, 234.68, 288.64, 280.69, 261.34, 293.8, 291.37, 248.88, 328.91, 252.02, 269.57, 249.62], '6M': [133.46, 145.63, 156.51, 136.6, 139.03, 147.55, 155.67, 159.99, 157.17, 166.69, 133.52, 135.63, 166.7, 207.86, 231.17, 290.52, 261.03, 275.95, 302.49, 285, 263.61, 260.22, 345.85, 275.01, 269.57, 249.62], '1Y': [25.96, 25.36, 34.78, 36.1, 37.65, 46.5, 49.35, 52.94, 53.44, 67.02, 86.27, 73.6, 86.97, 109.91, 109.06, 108.53, 142.37, 139.23, 107.11, 95.56, 98.93, 111.79, 89.58, 92.26, 87.26, 108, 133.46, 145.63, 156.51, 136.6, 139.03, 147.55, 168.57, 159.99, 157.17, 166.69, 133.52, 135.63, 166.7, 207.86, 231.17, 290.52, 261.03, 275.95, 302.49, 285, 263.61, 260.22, 345.85, 275.01, 269.57, 249.62] },
      velocityScore: { '1D': 0, '1W': 39.1, '1M': 12.9, '6M': null }, isNew: false,
      marketCap: '$71B', pe: null, revenueGrowth: 130, eps: -0.05, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 7.1, RKNG: 3.67 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 4.65, proScore: 3.1, coverage: 0.667,
      price: 1798.51, weeklyPrices: [1727.18, 1858.27, 1915.92, 1673.97, 1798.51], weeklyChange: 4.13, dayChange: 7.44, sortRank: 0, periodReturns: { '1M': -14.7, 'YTD': 657.6, '6M': 363.8, '1Y': 4133.8 },
      priceHistory: { '1D': [1673.97, 1782.61, 1798.51], '1W': [1727.18, 1858.27, 1915.92, 1673.97, 1798.51], '1M': [2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 1745, 1744.43, 1617.7, 1727.18, 1858.27, 1915.92, 1673.97, 1798.51], 'YTD': [237.38, 334.54, 413.62, 470.8, 665.24, 583.4, 600.4, 632.38, 599.06, 618.82, 772.09, 603.17, 701.59, 952.5, 913.02, 1070.2, 1255.86, 1452.02, 1383.29, 1589.94, 1759.68, 1881.51, 2184.75, 2090.71, 1617.7, 1798.51], '6M': [387.81, 503.44, 539.3, 576.2, 630.29, 649.97, 635.36, 565.59, 618.82, 772.09, 603.17, 701.59, 851.77, 920.99, 989.9, 1187, 1562.34, 1407.61, 1478.69, 1694.98, 1559.32, 1980.1, 2273.73, 2050.39, 1617.7, 1798.51], '1Y': [42.48, 41.61, 41.89, 42.51, 43.37, 45.52, 46.78, 52.47, 70.5, 90.09, 102.92, 113.5, 121.17, 134.61, 148.04, 176.49, 207.01, 267.95, 265.88, 226.96, 210.17, 225.47, 201.87, 241.05, 240.22, 353.56, 387.81, 503.44, 539.3, 576.2, 630.29, 649.97, 651.9, 565.59, 618.82, 772.09, 603.17, 701.59, 851.77, 920.99, 989.9, 1187, 1562.34, 1407.61, 1478.69, 1694.98, 1559.32, 1980.1, 2273.73, 2050.39, 1617.7, 1798.51] },
      velocityScore: { '1D': 0, '1W': -3.1, '1M': -22.9, '6M': null }, isNew: false,
      marketCap: '$266B', pe: 61.4, revenueGrowth: 251, eps: 29.29, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.98, RKNG: 3.32 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 2, avgWeight: 4.39, proScore: 2.93, coverage: 0.667,
      price: 585.6, weeklyPrices: [550.30, 578.05, 582.59, 555.55, 585.60], weeklyChange: 6.41, dayChange: 5.41, sortRank: 0, periodReturns: { '1M': -10.4, 'YTD': 239.9, '6M': 172.4, '1Y': 774.9 },
      priceHistory: { '1D': [555.55, 580, 585.6], '1W': [550.3, 578.05, 582.59, 555.55, 585.6], '1M': [653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539, 577.46, 532.1, 550.3, 578.05, 582.59, 555.55, 585.6], 'YTD': [172.27, 187.68, 221.51, 240.85, 270.23, 285.99, 296.56, 290.95, 261.3, 261.18, 316.93, 273.35, 294.97, 350.16, 374.11, 400.73, 442.36, 488.74, 455.8, 530.6, 575.5, 529.29, 746.23, 586.45, 532.1, 585.6], '6M': [215, 243.29, 278.41, 260.19, 284.1, 285.52, 279.7, 259.03, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 431.52, 480, 482.02, 484.28, 531.21, 511.72, 562.93, 732.62, 651.88, 532.1, 585.6], '1Y': [66.93, 68.74, 68.99, 77.29, 74.64, 76.29, 79.22, 80.34, 93.29, 102.39, 112.41, 116.74, 125.28, 118.86, 121.53, 126.67, 158.02, 174.22, 162.45, 150.93, 163.54, 169.78, 172.04, 176.76, 176.06, 199.88, 215, 243.29, 278.41, 260.19, 284.1, 285.52, 282.25, 259.03, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 431.52, 480, 482.02, 484.28, 531.21, 511.72, 562.93, 732.62, 651.88, 532.1, 585.6] },
      velocityScore: { '1D': 0, '1W': -3.3, '1M': 91.5, '6M': null }, isNew: false,
      marketCap: '$202B', pe: 36.7, revenueGrowth: 46, eps: 15.94, grossMargin: 45, dividendYield: 0.1,
      etfPresence: { BUZZ: false, MEME: 5.08, RKNG: 3.71 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'WULF', name: 'WULF', easyScore: 2, avgWeight: 4.35, proScore: 2.9, coverage: 0.667,
      price: 19.7, weeklyPrices: [22.83, 23.20, 21.97, 20.89, 19.70], weeklyChange: -13.69, dayChange: -5.67, sortRank: 0, periodReturns: { '1M': -30, 'YTD': 71.5, '6M': 38.7, '1Y': 285.6 },
      priceHistory: { '1D': [20.89, 19.42, 19.54, 19.7], '1W': [22.83, 23.2, 21.97, 20.89, 19.7], '1M': [28.17, 28.01, 27.86, 28.98, 28.31, 28.78, 26.97, 26.06, 25.83, 25.58, 24.7, 23.58, 21.18, 22.21, 20.24, 22.83, 23.2, 21.97, 20.89, 19.7], 'YTD': [11.49, 12.84, 13.85, 13.79, 13.44, 16.65, 15.38, 17.92, 15.37, 14.67, 15.74, 15.35, 14.88, 19.45, 20.5, 21.43, 22.29, 22.8, 21.34, 26.74, 26.19, 25.35, 28.98, 25.83, 20.24, 19.7], '6M': [14.21, 12.89, 14.54, 11.92, 15.91, 15.01, 16.22, 15.23, 14.67, 15.74, 15.35, 14.88, 18.87, 20.64, 20.01, 21.31, 23.39, 22.32, 22.82, 25.56, 24, 26.06, 28.31, 25.58, 20.24, 19.7], '1Y': [5.11, 4.99, 5.1, 4.89, 5.4, 9.38, 8.93, 9.45, 9.2, 10.49, 11.49, 11.6, 11.97, 14, 13.85, 13.64, 16.1, 14.3, 11.05, 12.63, 15.3, 14.96, 12.49, 12.47, 11.15, 12.49, 14.21, 12.89, 14.54, 11.92, 15.91, 15.01, 17.88, 15.23, 14.67, 15.74, 15.35, 14.88, 18.87, 20.64, 20.01, 21.31, 23.39, 22.32, 22.82, 25.56, 24, 26.06, 28.31, 25.58, 20.24, 19.7] },
      velocityScore: { '1D': 0, '1W': -1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: null, revenueGrowth: -1, eps: -2.51, grossMargin: 64, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.4, RKNG: 3.29 },
      tonyNote: 'WULF appears in 2 of 3 Meme ETFs (67% coverage) with average weight 4.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 2, avgWeight: 4.03, proScore: 2.69, coverage: 0.667,
      price: 39.12, weeklyPrices: [43.01, 41.72, 41.14, 38.98, 39.12], weeklyChange: -9.05, dayChange: 0.35, sortRank: 0, periodReturns: { '1M': -35.7, 'YTD': 3.6, '6M': -26, '1Y': 126.4 },
      priceHistory: { '1D': [38.98, 38.82, 38.86, 39.12], '1W': [43.01, 41.72, 41.14, 38.98, 39.12], '1M': [60.85, 59.18, 58.11, 59.96, 56.87, 54.72, 50.3, 47.74, 47.21, 45.91, 45.73, 43.32, 38.82, 43.91, 39.81, 43.01, 41.72, 41.14, 38.98, 39.12], 'YTD': [37.77, 45.68, 57.82, 52.36, 53.08, 46.15, 42.08, 44.03, 43.84, 41.37, 41.66, 37.45, 34.77, 43.07, 48.72, 48.36, 49.48, 56.56, 47.74, 67.84, 61.86, 56.71, 59.96, 47.21, 39.81, 39.12], '6M': [52.88, 52.26, 59.84, 39.79, 40.03, 39.98, 40.95, 40.13, 41.37, 41.66, 37.45, 34.77, 39.32, 48.12, 50.64, 45.66, 61.2, 52.94, 56.83, 63.54, 54.35, 59.77, 56.87, 45.91, 39.81, 39.12], '1Y': [17.28, 18.15, 16.58, 16.48, 17.97, 20.7, 23.12, 26.48, 26.19, 37.14, 41.9, 45.93, 57.75, 64.14, 59.22, 64.99, 67.75, 60.17, 47.41, 48.49, 48.49, 46.34, 35.48, 42.04, 38.3, 43.63, 52.88, 52.26, 59.84, 39.79, 40.03, 39.98, 44.24, 40.13, 41.37, 41.66, 37.45, 34.77, 39.32, 48.12, 50.64, 45.66, 61.2, 52.94, 56.83, 63.54, 54.35, 59.77, 56.87, 45.91, 39.81, 39.12] },
      velocityScore: { '1D': 0, '1W': -6.9, '1M': -30.7, '6M': null }, isNew: false,
      marketCap: '$14B', pe: 53.6, revenueGrowth: 0, eps: 0.73, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 2.23, MEME: 5.83, RKNG: false },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 2, avgWeight: 3.99, proScore: 2.66, coverage: 0.667,
      price: 70.15, weeklyPrices: [74.95, 73.88, 73.32, 67.58, 70.15], weeklyChange: -6.4, dayChange: 3.8, sortRank: 0, periodReturns: { '1M': -19.9, 'YTD': -3.4, '6M': -26.3, '1Y': 46.6 },
      priceHistory: { '1D': [67.58, 68.97, 69.54, 70.15], '1W': [74.95, 73.88, 73.32, 67.58, 70.15], '1M': [87.57, 82.25, 85.43, 80.66, 73.19, 72.87, 68.01, 65.62, 71.45, 86.77, 88.86, 86.1, 85.13, 80.64, 74.21, 74.95, 73.88, 73.32, 67.58, 70.15], 'YTD': [72.63, 90.56, 115.77, 104.78, 104.55, 102.12, 84.43, 82.36, 104.89, 87.09, 94.09, 87.86, 92.62, 98.97, 81, 77.2, 68.43, 72.96, 88.1, 129.6, 107.29, 97.56, 80.66, 71.45, 74.21, 70.15], '6M': [95.22, 116.37, 122.09, 93.27, 82.22, 80.2, 79.19, 93.86, 87.09, 94.09, 87.86, 92.62, 94.9, 85.53, 76.4, 70.89, 75.05, 83.67, 105.86, 113.41, 93.6, 82.41, 73.19, 86.77, 74.21, 70.15], '1Y': [47.86, 56.67, 54.22, 51.38, 45.92, 48.16, 50.01, 48.94, 40.77, 40.97, 48.85, 48.84, 72.9, 90.5, 82.81, 79.45, 71.14, 68.7, 56.6, 55, 52.61, 74, 67.81, 86.48, 74.68, 85.73, 95.22, 116.37, 122.09, 93.27, 82.22, 80.2, 85.76, 93.86, 87.09, 94.09, 87.86, 92.62, 94.9, 85.53, 76.4, 70.89, 75.05, 83.67, 105.86, 113.41, 93.6, 82.41, 73.19, 86.77, 74.21, 70.15] },
      velocityScore: { '1D': 0, '1W': 46.2, '1M': -32.7, '6M': null }, isNew: false,
      marketCap: '$27B', pe: null, revenueGrowth: 1952, eps: -1.66, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.31, MEME: 5.67, RKNG: false },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'AMD', name: 'AMD', easyScore: 2, avgWeight: 3.66, proScore: 2.44, coverage: 0.667,
      price: 563.2, weeklyPrices: [517.41, 546.72, 557.89, 534.39, 563.20], weeklyChange: 8.85, dayChange: 5.39, sortRank: 0, periodReturns: { '1M': 2.9, 'YTD': 163, '6M': 151.9, '1Y': 285.1 },
      priceHistory: { '1D': [534.39, 562.4, 563.2], '1W': [517.41, 546.72, 557.89, 534.39, 563.2], '1M': [547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 516.11, 517.41, 546.72, 557.89, 534.39, 563.2], 'YTD': [214.16, 204.68, 231.83, 251.31, 246.27, 216, 200.12, 210.86, 202.07, 197.74, 205.27, 203.77, 217.5, 246.83, 274.95, 334.63, 341.54, 448.29, 414.05, 495.54, 523.2, 488.45, 537.37, 521.58, 516.11, 563.2], '6M': [223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 200.21, 199.45, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 467.51, 516.1, 466.38, 511.57, 551.63, 539.49, 516.11, 563.2], '1Y': [146.24, 157, 173.66, 176.78, 172.28, 176.14, 163.36, 162.63, 151.41, 161.16, 159.79, 161.36, 203.71, 216.42, 240.56, 259.67, 259.65, 243.98, 240.52, 215.05, 219.76, 221.11, 207.58, 214.95, 215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 203.68, 199.45, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 467.51, 516.1, 466.38, 511.57, 551.63, 539.49, 516.11, 563.2] },
      velocityScore: { '1D': 0, '1W': 6.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$918B', pe: 188.4, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { BUZZ: 3.5, MEME: false, RKNG: 3.82 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 2, avgWeight: 3.33, proScore: 2.22, coverage: 0.667,
      price: 981.21, weeklyPrices: [948.80, 991.64, 979.30, 937.00, 981.21], weeklyChange: 3.42, dayChange: 4.72, sortRank: 0, periodReturns: { '1M': -9.8, 'YTD': 243.8, '6M': 194.3, '1Y': 727.3 },
      priceHistory: { '1D': [937, 977.69, 981.21], '1W': [948.8, 991.64, 979.3, 937, 981.21], '1M': [1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 938.38, 948.8, 991.64, 979.3, 937, 981.21], 'YTD': [285.41, 327.02, 362.75, 389.09, 437.8, 383.5, 420.95, 429, 400.77, 405.35, 444.27, 355.46, 366.24, 426.56, 448.42, 524.56, 576.45, 766.58, 698.74, 928.41, 996, 995.87, 1133.99, 1132.33, 938.38, 981.21], '6M': [333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 971, 864.01, 981.61, 1211.38, 1145.28, 938.38, 981.21], '1Y': [118.61, 113.23, 111.25, 107.77, 123.72, 123.55, 116.42, 119.01, 131.46, 157.77, 164.62, 163.9, 190.96, 192.77, 206.77, 220.1, 234.7, 253.3, 241.95, 223.93, 240.46, 246.92, 237.5, 276.59, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 415.56, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 971, 864.01, 981.61, 1211.38, 1145.28, 938.38, 981.21] },
      velocityScore: { '1D': 0, '1W': 0.5, '1M': -28.8, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 23.2, revenueGrowth: 346, eps: 42.35, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { BUZZ: 3.02, MEME: false, RKNG: 3.65 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'INTC', name: 'INTC', easyScore: 2, avgWeight: 2.96, proScore: 1.97, coverage: 0.667,
      price: 106.83, weeklyPrices: [110.24, 112.54, 109.84, 103.12, 106.83], weeklyChange: -3.1, dayChange: 3.59, sortRank: 0, periodReturns: { '1M': -16.5, 'YTD': 189.5, '6M': 119.3, '1Y': 358.5 },
      priceHistory: { '1D': [103.12, 107.1, 106.83], '1W': [110.24, 112.54, 109.84, 103.12, 106.83], '1M': [127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 127.02, 120.35, 122.2, 110.39, 110.24, 112.54, 109.84, 103.12, 106.83], 'YTD': [36.9, 41.11, 46.96, 42.49, 48.81, 50.24, 45.46, 46.88, 45.58, 45.25, 46.18, 44.1, 50.38, 65.18, 65.7, 84.99, 95.78, 120.61, 110.8, 121.77, 111.78, 116.96, 133.99, 128.32, 110.39, 106.83], '6M': [48.72, 54.32, 48.66, 48.24, 46.48, 44.11, 45.61, 45.95, 45.25, 46.18, 44.1, 50.38, 62.38, 68.5, 82.54, 99.62, 124.92, 108.77, 119.84, 114.68, 99.17, 124.57, 140.94, 131.72, 110.39, 106.83], '1Y': [23.3, 23.26, 20.68, 19.5, 20.65, 23.66, 24.55, 24.35, 24.48, 24.77, 28.76, 34.48, 36.59, 37.22, 38.1, 39.54, 39.5, 38.45, 34.71, 35.79, 40.01, 40.3, 37.51, 36.37, 37.3, 42.63, 48.72, 54.32, 48.66, 48.24, 46.48, 44.11, 45.46, 45.95, 45.25, 46.18, 44.1, 50.38, 62.38, 68.5, 82.54, 99.62, 124.92, 108.77, 119.84, 114.68, 99.17, 124.57, 140.94, 131.72, 110.39, 106.83] },
      velocityScore: { '1D': 0, '1W': -7.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$537B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 2.58, MEME: false, RKNG: 3.34 },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'DELL', name: 'DELL', easyScore: 2, avgWeight: 2.84, proScore: 1.89, coverage: 0.667,
      price: 447.3, weeklyPrices: [431.97, 450.22, 434.97, 427.11, 447.30], weeklyChange: 3.55, dayChange: 4.8, sortRank: 0, periodReturns: { '1M': 9.3, 'YTD': 255.3, '6M': 276.9, '1Y': 255.9 },
      priceHistory: { '1D': [426.81, 447.86, 445.57, 447.3], '1W': [431.97, 450.22, 434.97, 427.11, 447.3], '1M': [409.07, 404.08, 419.32, 409.5, 418.71, 427.78, 434.06, 409.45, 399.49, 414.61, 431.46, 425.25, 394.32, 411.8, 417.28, 431.97, 450.22, 434.97, 427.11, 447.3], 'YTD': [125.88, 118.5, 120.53, 115.93, 119.16, 120.91, 116.78, 123.48, 147.1, 149.91, 156.76, 175.82, 174.37, 189.79, 204.24, 215.97, 211.64, 238.94, 235.26, 305.32, 422.05, 391.45, 409.5, 399.49, 417.28, 447.3], '6M': [118.69, 117.17, 118.49, 115.39, 112.82, 122.27, 148.08, 146.52, 149.91, 156.76, 175.82, 174.37, 177.8, 196.55, 216.09, 210.17, 260.46, 241.99, 295.19, 420.91, 394.39, 395.57, 418.71, 414.61, 417.28, 447.3], '1Y': [125.67, 128.96, 133.86, 130.23, 138.32, 138.13, 131.01, 122.15, 123, 126.8, 135.69, 133.9, 145.76, 153.4, 147.87, 162.19, 160.11, 142.69, 122.48, 127.22, 132.09, 140.41, 130.51, 126.61, 127.92, 120.07, 118.69, 117.17, 118.49, 115.39, 112.82, 122.27, 121.45, 146.52, 149.91, 156.76, 175.82, 174.37, 177.8, 196.55, 216.09, 210.17, 260.46, 241.99, 295.19, 420.91, 394.39, 395.57, 418.71, 414.61, 417.28, 447.3] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$289B', pe: 36.2, revenueGrowth: 88, eps: 12.34, grossMargin: 19, dividendYield: 0.58,
      etfPresence: { BUZZ: 1.59, MEME: false, RKNG: 4.09 },
      tonyNote: 'DELL appears in 2 of 3 Meme ETFs (67% coverage) with average weight 2.8% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'GOOGL', easyScore: 2, avgWeight: 2.67, proScore: 1.78, coverage: 0.667,
      price: 352.29, weeklyPrices: [361.92, 358.89, 357.18, 352.51, 352.29], weeklyChange: -2.66, dayChange: -0.06, sortRank: 0, periodReturns: { '1M': -4.6, 'YTD': 12.6, '6M': 4.9, '1Y': 94 },
      priceHistory: { '1D': [352.51, 353.34, 352.29], '1W': [361.92, 358.89, 357.18, 352.51, 352.29], '1M': [369.35, 373.25, 363.79, 368.03, 349.68, 346.13, 345.29, 343.71, 337.39, 353.65, 357.37, 361.21, 359.91, 366.46, 367.03, 361.92, 358.89, 357.18, 352.51, 352.29], 'YTD': [313, 325.44, 330, 333.26, 343.69, 324.32, 303.33, 312.9, 303.13, 303.55, 307.13, 280.92, 295.77, 321.31, 337.42, 350.34, 383.25, 387.35, 387.66, 388.83, 372.19, 357.77, 368.03, 337.39, 367.03, 352.29], '6M': [335.84, 330.54, 338.25, 331.25, 309, 314.98, 311.76, 300.88, 303.55, 307.13, 280.92, 295.77, 317.24, 341.68, 344.4, 385.69, 400.8, 396.78, 382.97, 380.34, 368.53, 359.68, 349.68, 353.65, 367.03, 352.29], '1Y': [181.56, 190.1, 192.58, 195.04, 201, 203.5, 208.49, 212.91, 234.04, 251.61, 252.53, 244.05, 250.43, 244.15, 256.55, 269.27, 283.72, 290.1, 285.02, 318.58, 314.89, 313.72, 308.22, 309.78, 313.85, 321.98, 335.84, 330.54, 338.25, 331.25, 309, 314.98, 307.38, 300.88, 303.55, 307.13, 280.92, 295.77, 317.24, 341.68, 344.4, 385.69, 400.8, 396.78, 382.97, 380.34, 368.53, 359.68, 349.68, 353.65, 367.03, 352.29] },
      velocityScore: { '1D': 0, '1W': 6, '1M': 17.1, '6M': null }, isNew: false,
      marketCap: '$4.3T', pe: 26.9, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { BUZZ: 1.58, MEME: false, RKNG: 3.77 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 1, avgWeight: 6.68, proScore: 2.23, coverage: 0.333,
      price: 120.8, weeklyPrices: [114.44, 122.21, 119.92, 111.88, 120.80], weeklyChange: 5.56, dayChange: 7.97, sortRank: 0, periodReturns: { '1M': -36.9, 'YTD': 246.5, '6M': 250.4, '1Y': 309.6 },
      priceHistory: { '1D': [111.88, 117.97, 120.48, 120.8], '1W': [114.44, 122.21, 119.92, 111.88, 120.8], '1M': [191.55, 170.81, 167.34, 161.85, 171.23, 147.44, 146.97, 138.54, 135.69, 150.1, 148.16, 139, 120.95, 123.36, 114.41, 114.44, 122.21, 119.92, 111.88, 120.8], 'YTD': [34.86, 33.01, 37.04, 34.89, 44.16, 47.91, 43.44, 58.12, 99.71, 106.19, 101.92, 97.42, 103.91, 153.19, 163.47, 145.78, 172.98, 188.28, 171.33, 179.83, 202.89, 172.78, 161.85, 135.69, 114.41, 120.8], '6M': [34.47, 38.15, 39.57, 38.13, 43.99, 51.68, 84.23, 101.14, 106.19, 101.92, 97.42, 103.91, 150.6, 159.42, 162.17, 183.51, 148.94, 190.36, 181.49, 158.41, 177, 169.05, 171.23, 150.1, 114.41, 120.8], '1Y': [29.5, 28.23, 25.22, 22.19, 20.86, 26.13, 24.34, 24.2, 23.63, 29.56, 30.54, 25.94, 33.79, 29.1, 34.14, 37.22, 33.04, 25.42, 21.63, 22.47, 26.53, 27.84, 29.9, 39.1, 36.02, 38.06, 34.47, 38.15, 39.57, 38.13, 43.99, 51.68, 53.69, 101.14, 106.19, 101.92, 97.42, 103.91, 150.6, 159.42, 162.17, 183.51, 148.94, 190.36, 181.49, 158.41, 177, 169.05, 171.23, 150.1, 114.41, 120.8] },
      velocityScore: { '1D': 0, '1W': -4.7, '1M': -42.8, '6M': null }, isNew: false,
      marketCap: '$10B', pe: null, revenueGrowth: 51, eps: -0.6, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.68, RKNG: false },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 1, avgWeight: 5.27, proScore: 1.76, coverage: 0.333,
      price: 39.86, weeklyPrices: [45.08, 44.77, 42.86, 38.88, 39.86], weeklyChange: -11.58, dayChange: 2.47, sortRank: 0, periodReturns: { '1M': -34.8, 'YTD': -11.2, '6M': -21.7, '1Y': -6 },
      priceHistory: { '1D': [38.9, 39.56, 39.86, 39.86], '1W': [45.08, 44.77, 42.86, 38.88, 39.86], '1M': [61.18, 56.06, 54.69, 56.55, 58.32, 57.85, 53.6, 50.56, 49.31, 53.88, 53.26, 51.4, 49.12, 48.87, 45.36, 45.08, 44.77, 42.86, 38.88, 39.86], 'YTD': [44.87, 50.45, 50.8, 43.37, 38.56, 35.48, 33.34, 33.59, 37.13, 33.03, 31.9, 29.84, 29.3, 29.76, 48.32, 43.84, 45.75, 55.87, 48.44, 65.4, 65.66, 57.99, 56.55, 49.31, 45.36, 39.86], '6M': [50.88, 49.33, 43.24, 30.43, 31.3, 31.9, 38.37, 36.02, 33.03, 31.9, 29.84, 29.3, 28.79, 46.09, 42.69, 46.2, 49.24, 51.95, 63.64, 72.07, 56.78, 57.85, 58.32, 53.88, 45.36, 39.86], '1Y': [42.41, 44.43, 42.34, 39.86, 44.94, 40.23, 38.68, 42.74, 41.01, 59.11, 71.94, 64.26, 78.99, 82.09, 59.94, 62.8, 58.4, 55.37, 47.79, 46.76, 47.12, 54.36, 46.07, 53.86, 45.31, 49.78, 50.88, 49.33, 43.24, 30.43, 31.3, 31.9, 40.88, 36.02, 33.03, 31.9, 29.84, 29.3, 28.79, 46.09, 42.69, 46.2, 49.24, 51.95, 63.64, 72.07, 56.78, 57.85, 58.32, 53.88, 45.36, 39.86] },
      velocityScore: { '1D': 0, '1W': -0.6, '1M': -23.8, '6M': null }, isNew: false,
      marketCap: '$15B', pe: 113.9, revenueGrowth: 755, eps: 0.35, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.27, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'HIMS', name: 'HIMS', easyScore: 1, avgWeight: 5.24, proScore: 1.75, coverage: 0.333,
      price: 34.32, weeklyPrices: [36.07, 35.45, 34.38, 34.38, 34.32], weeklyChange: -4.84, dayChange: -0.1, sortRank: 0, periodReturns: { '1M': 13.8, 'YTD': 5.7, '6M': 9.6, '1Y': -34 },
      priceHistory: { '1D': [34.36, 34.38, 34.38, 34.32], '1W': [36.07, 35.45, 34.38, 34.38, 34.32], '1M': [30.17, 31.47, 31.89, 35.47, 33.54, 32.96, 32.7, 32.71, 33.94, 33.39, 34.67, 37.57, 36.8, 38.28, 36.17, 36.07, 35.45, 34.38, 34.38, 34.32], 'YTD': [32.47, 33.87, 31.38, 30.28, 26.44, 19.33, 15.84, 15.82, 16.45, 23.84, 24.16, 20.86, 19.14, 21.15, 31.01, 29.39, 27.27, 25.03, 22.44, 25.2, 28.01, 28.87, 35.47, 33.94, 36.17, 34.32], '6M': [31.32, 30.52, 29.87, 23.48, 15.8, 15.63, 14.52, 15.88, 23.84, 24.16, 20.86, 19.14, 19.43, 28.82, 30.56, 27.41, 28.27, 25.05, 23.75, 26.15, 26.19, 26.82, 33.54, 33.39, 36.17, 34.32], '1Y': [52.03, 47.6, 58.68, 63.35, 49.98, 45.1, 42.99, 42.35, 49.64, 53.96, 57.7, 59.12, 54.76, 54.73, 51.36, 48.23, 44.39, 41.05, 35.58, 37.78, 37.51, 39.12, 36.25, 35.05, 33.04, 35.46, 31.32, 30.52, 29.87, 23.48, 15.8, 15.63, 15.6, 15.88, 23.84, 24.16, 20.86, 19.14, 19.43, 28.82, 30.56, 27.41, 28.27, 25.05, 23.75, 26.15, 26.19, 26.82, 33.54, 33.39, 36.17, 34.32] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$8B', pe: null, revenueGrowth: 4, eps: -0.09, grossMargin: 73, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.24, RKNG: false },
      tonyNote: 'HIMS appears in 1 of 3 Meme ETFs (33% coverage) with average weight 5.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'COHR', name: 'COHR', easyScore: 1, avgWeight: 5.19, proScore: 1.73, coverage: 0.333,
      price: 311.96, weeklyPrices: [317.05, 327.24, 324.50, 307.39, 311.96], weeklyChange: -1.61, dayChange: 1.47, sortRank: 0, periodReturns: { '1M': -24.6, 'YTD': 69, '6M': 69.4, '1Y': 230 },
      priceHistory: { '1D': [307.43, 310.5, 311.97, 311.96], '1W': [317.05, 327.24, 324.5, 307.39, 311.96], '1M': [413.84, 382.81, 378.85, 389.57, 425.48, 381.22, 392.5, 407.25, 380.56, 391.22, 394.47, 368.65, 333.36, 335.7, 314.13, 317.05, 327.24, 324.5, 307.39, 311.96], 'YTD': [184.57, 173.15, 191.04, 197.76, 222.44, 242.46, 223.89, 267.9, 274.86, 241.27, 275.57, 243.29, 258.16, 307.93, 347.51, 321.53, 329.89, 374.01, 353.63, 380.18, 421.9, 363.58, 389.57, 380.56, 314.13, 311.96], '6M': [184.11, 202.72, 215.86, 209.24, 216.1, 248.18, 258.93, 253.87, 241.27, 275.57, 243.29, 258.16, 307.5, 345.02, 336.09, 329.5, 335.26, 382.45, 377.57, 361.47, 376.99, 385.03, 425.48, 391.22, 314.13, 311.96], '1Y': [94.52, 99.88, 104.3, 106.74, 113.6, 90.49, 90.5, 90.47, 98.67, 106.34, 114.6, 107.97, 114.77, 115.13, 120.2, 134.99, 132, 166.72, 139.07, 151.81, 163.5, 185.86, 178.45, 190.98, 186.81, 191.62, 184.11, 202.72, 215.86, 209.24, 216.1, 248.18, 250.14, 253.87, 241.27, 275.57, 243.29, 258.16, 307.5, 345.02, 336.09, 329.5, 335.26, 382.45, 377.57, 361.47, 376.99, 385.03, 425.48, 391.22, 314.13, 311.96] },
      velocityScore: { '1D': 0, '1W': -1.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$61B', pe: 156, revenueGrowth: 21, eps: 2, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.19, RKNG: false },
      tonyNote: 'COHR appears in 1 of 3 Meme ETFs (33% coverage) with average weight 5.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 1, avgWeight: 5.15, proScore: 1.72, coverage: 0.333,
      price: 28.8, weeklyPrices: [31.44, 32.29, 31.15, 28.84, 28.80], weeklyChange: -8.41, dayChange: -0.16, sortRank: 0, periodReturns: { '1M': -38, 'YTD': 17.4, '6M': -20.2, '1Y': 202.5 },
      priceHistory: { '1D': [28.84, 28.64, 28.8, 28.8], '1W': [31.44, 32.29, 31.15, 28.84, 28.8], '1M': [46.47, 46.27, 45.57, 46.59, 45.2, 45.27, 41.98, 40.95, 39.16, 37.77, 37.3, 35.52, 33.06, 33.5, 30.71, 31.44, 32.29, 31.15, 28.84, 28.8], 'YTD': [24.52, 31.94, 37.4, 36.18, 34.8, 38.26, 31.91, 29.08, 28.65, 27.48, 26.7, 25.72, 24.56, 27.6, 32.19, 33.67, 35.63, 43.93, 36.62, 48.98, 44.15, 41.47, 46.59, 39.16, 30.71, 28.8], '6M': [36.1, 34.74, 38.07, 27.84, 36.17, 29.04, 27.27, 28.09, 27.48, 26.7, 25.72, 24.56, 26.26, 31.53, 34.98, 33.55, 41.25, 42.56, 45.87, 47.28, 39.62, 42.7, 45.2, 37.77, 30.71, 28.8], '1Y': [9.52, 11.09, 10.58, 13.95, 14.03, 16.34, 15.95, 15.98, 13.91, 19.35, 24.45, 22.15, 27.71, 34.24, 35.9, 34.35, 32.87, 31.44, 22.93, 23.79, 28.21, 32.11, 22.98, 27.78, 24.08, 29.56, 36.1, 34.74, 38.07, 27.84, 36.17, 29.04, 28.65, 28.09, 27.48, 26.7, 25.72, 24.56, 26.26, 31.53, 34.98, 33.55, 41.25, 42.56, 45.87, 47.28, 39.62, 42.7, 45.2, 37.77, 30.71, 28.8] },
      velocityScore: { '1D': 0, '1W': -2.8, '1M': -53.5, '6M': null }, isNew: false,
      marketCap: '$8B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.15, RKNG: false },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'LITE', name: 'LITE', easyScore: 1, avgWeight: 5.11, proScore: 1.7, coverage: 0.333,
      price: 825.73, weeklyPrices: [707.10, 785.77, 802.01, 768.15, 825.73], weeklyChange: 16.78, dayChange: 7.5, sortRank: 0, periodReturns: { '1M': -13.7, 'YTD': 124, '6M': 149, '1Y': 795.2 },
      priceHistory: { '1D': [768.15, 817.51, 825.73], '1W': [707.1, 785.77, 802.01, 768.15, 825.73], '1M': [957.24, 875.36, 869.98, 850, 893.93, 827.92, 842.53, 861.97, 816.98, 851.4, 858.06, 801.16, 728.32, 731.25, 698.91, 707.1, 785.77, 802.01, 768.15, 825.73], 'YTD': [368.59, 348.26, 324.25, 332.45, 423.42, 577.15, 594.26, 723.39, 680.8, 616.09, 772.13, 688.8, 826.88, 871.18, 895.11, 859.68, 976.18, 992.37, 890.09, 902.31, 945.08, 889.59, 850, 816.98, 698.91, 825.73], '6M': [331.62, 354.49, 381.44, 504.42, 583.46, 667.77, 700.91, 650.82, 616.09, 772.13, 688.8, 826.88, 897.3, 894.07, 881.64, 949.93, 903.8, 970.7, 946.9, 854.96, 863.66, 921.56, 893.93, 851.4, 698.91, 825.73], '1Y': [92.24, 103.84, 107.17, 111.13, 115.03, 118.98, 123.42, 132.81, 149.4, 168.77, 164.71, 162.58, 160.6, 160.56, 161, 193.8, 199.58, 259.89, 242.07, 299.36, 317.93, 342.56, 334.69, 389.88, 371.18, 392.88, 331.62, 354.49, 381.44, 504.42, 583.46, 667.77, 677, 650.82, 616.09, 772.13, 688.8, 826.88, 897.3, 894.07, 881.64, 949.93, 903.8, 970.7, 946.9, 854.96, 863.66, 921.56, 893.93, 851.4, 698.91, 825.73] },
      velocityScore: { '1D': 0, '1W': -36.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$64B', pe: 151.5, revenueGrowth: 90, eps: 5.45, grossMargin: 41, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.11, RKNG: false },
      tonyNote: 'LITE appears in 1 of 3 Meme ETFs (33% coverage) with average weight 5.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'STX', easyScore: 1, avgWeight: 4.78, proScore: 1.59, coverage: 0.333,
      price: 902.58, weeklyPrices: [860.02, 890.09, 910.34, 860.66, 902.58], weeklyChange: 4.95, dayChange: 4.87, sortRank: 0, periodReturns: { '1M': -11.4, 'YTD': 227.7, '6M': 189, '1Y': 505.4 },
      priceHistory: { '1D': [860.66, 896.33, 902.58], '1W': [860.02, 890.09, 910.34, 860.66, 902.58], '1M': [1018.8, 1031.34, 1066.07, 1070.23, 1094.04, 1038.59, 993.25, 1025.36, 899.9, 968.53, 965, 915.19, 820.16, 868.26, 827.64, 860.02, 890.09, 910.34, 860.66, 902.58], 'YTD': [275.39, 284.47, 326.23, 358.29, 432.95, 425, 424.14, 421.85, 375.01, 373.98, 434.6, 378.79, 429.36, 513.28, 539.75, 595.86, 738.54, 808.8, 733.35, 870.66, 925.99, 868.09, 1070.23, 899.9, 827.64, 902.58], '6M': [312.28, 346.53, 446.57, 405.45, 431.17, 411.11, 407.84, 367.34, 373.98, 434.6, 378.79, 429.36, 503.13, 547.75, 586.25, 726.93, 782.64, 795.47, 812.73, 879.8, 847.47, 931.04, 1094.04, 968.53, 827.64, 902.58], '1Y': [149.08, 149.63, 150.46, 154.81, 151.69, 158.7, 164, 167.4, 189.24, 211.12, 229.33, 229.14, 242.83, 219.51, 214.4, 230.32, 265.55, 293.99, 261.38, 253.38, 270.1, 285.41, 285.58, 282.85, 280.08, 308.26, 312.28, 346.53, 446.57, 405.45, 431.17, 411.11, 409.67, 367.34, 373.98, 434.6, 378.79, 429.36, 503.13, 547.75, 586.25, 726.93, 782.64, 795.47, 812.73, 879.8, 847.47, 931.04, 1094.04, 968.53, 827.64, 902.58] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$202B', pe: 86, revenueGrowth: 44, eps: 10.5, grossMargin: 42, dividendYield: 0.34,
      etfPresence: { BUZZ: false, MEME: 4.78, RKNG: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'ALAB', name: 'ALAB', easyScore: 1, avgWeight: 4.6, proScore: 1.53, coverage: 0.333,
      price: 380.41, weeklyPrices: [393.16, 417.45, 412.97, 362.05, 380.41], weeklyChange: -3.24, dayChange: 5.07, sortRank: 0, periodReturns: { '1M': -2.3, 'YTD': 128.7, '6M': 121, '1Y': 321.2 },
      priceHistory: { '1D': [362.05, 376.09, 380.41], '1W': [393.16, 417.45, 412.97, 362.05, 380.41], '1M': [389.2, 361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86, 406.42, 432.74, 382.89, 393.16, 417.45, 412.97, 362.05, 380.41], 'YTD': [166.36, 156.73, 182, 163.25, 152.44, 187.67, 129.58, 128.15, 113.77, 119.9, 126.16, 113.61, 117.14, 166.79, 175.8, 196.64, 201.25, 204.42, 244.26, 325.33, 358.05, 367.47, 417.07, 391.74, 382.89, 380.41], '6M': [172.14, 176.35, 160.46, 142.82, 126.58, 129.68, 118.83, 120, 119.9, 126.16, 113.61, 117.14, 149.05, 174.05, 212.84, 202.68, 199.79, 232.68, 306.88, 342.85, 317.06, 367.15, 439.66, 455.96, 382.89, 380.41], '1Y': [90.32, 121.89, 124.05, 137.93, 179.43, 186.43, 174.15, 182.2, 216.1, 231.29, 237.3, 198.8, 220.81, 199.53, 156.31, 170.28, 191.56, 173.74, 141.39, 147.75, 165.19, 175.74, 143.66, 172.62, 170.84, 165.77, 172.14, 176.35, 160.46, 142.82, 126.58, 129.68, 124.67, 120, 119.9, 126.16, 113.61, 117.14, 149.05, 174.05, 212.84, 202.68, 199.79, 232.68, 306.88, 342.85, 317.06, 367.15, 439.66, 455.96, 382.89, 380.41] },
      velocityScore: { '1D': 0, '1W': -17.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$65B', pe: 257, revenueGrowth: 93, eps: 1.48, grossMargin: 76, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.6, RKNG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
