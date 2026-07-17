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
export const SPY_RET: Record<Period, number> = { '1W': -0.9, '1M': 0.2, 'YTD': 8.9, '6M': 7.4, '1Y': 18.2 };
// @@END_GENERATED:SPY_RET@@

// Top holdings per ETF (ticker + portfolio weight %), shown on ETF row hover.
export type EtfHolding = { t: string; w: number };

// @@GENERATED:ETF_TOP_HOLDINGS@@
export const ETF_TOP_HOLDINGS: Record<string, EtfHolding[]> = {
  AIS: [{ t: 'MU', w: 6.5 }, { t: 'AMD', w: 5.3 }, { t: 'VRT', w: 3.9 }, { t: 'SIMO', w: 3.7 }, { t: 'TSM', w: 3.5 }],
  ARTY: [{ t: 'NVDA', w: 5.2 }, { t: 'AMD', w: 5.2 }, { t: 'AVGO', w: 4.8 }, { t: 'MU', w: 4.5 }, { t: 'CRWV', w: 3.6 }],
  BAI: [{ t: 'MU', w: 5.9 }, { t: 'AMD', w: 5.2 }, { t: 'NVDA', w: 4.9 }, { t: 'AVGO', w: 4.7 }, { t: 'TSM', w: 4.7 }],
  IGPT: [{ t: 'META', w: 10.0 }, { t: 'AMD', w: 8.7 }, { t: 'NVDA', w: 8.6 }, { t: 'GOOGL', w: 8.4 }, { t: 'MU', w: 7.3 }],
  IVES: [{ t: 'AAPL', w: 5.7 }, { t: 'META', w: 5.5 }, { t: 'AMZN', w: 5.1 }, { t: 'NVDA', w: 5.1 }, { t: 'MSFT', w: 5.0 }],
  ALAI: [{ t: 'NVDA', w: 13.5 }, { t: 'MSFT', w: 5.4 }, { t: 'TSM', w: 5.3 }, { t: 'AMZN', w: 5.1 }, { t: 'META', w: 4.7 }],
  CHAT: [{ t: 'NVDA', w: 7.4 }, { t: 'GOOGL', w: 5.6 }, { t: 'AVGO', w: 4.8 }, { t: 'AMD', w: 4.1 }, { t: 'MU', w: 3.6 }],
  AIFD: [{ t: 'NVDA', w: 6.6 }, { t: 'MU', w: 6.3 }, { t: 'PANW', w: 5.9 }, { t: 'ANET', w: 5.6 }, { t: 'AVGO', w: 5.5 }],
  SPRX: [{ t: 'ALAB', w: 9.9 }, { t: 'KLAC', w: 9.4 }, { t: 'NET', w: 9.2 }, { t: 'MKSI', w: 8.0 }, { t: 'COHR', w: 7.9 }],
  AOTG: [{ t: 'AMD', w: 16.4 }, { t: 'NVDA', w: 10.1 }, { t: 'MU', w: 9.8 }, { t: 'TSM', w: 7.1 }, { t: 'TOST', w: 5.2 }],
  SOXX: [{ t: 'NVDA', w: 8.5 }, { t: 'AMD', w: 8.4 }, { t: 'MU', w: 7.6 }, { t: 'AVGO', w: 7.3 }, { t: 'AMAT', w: 5.4 }],
  PSI: [{ t: 'AMAT', w: 6.9 }, { t: 'KLAC', w: 6.1 }, { t: 'LRCX', w: 5.6 }, { t: 'AMD', w: 5.6 }, { t: 'NVDA', w: 5.4 }],
  XSD: [{ t: 'PI', w: 3.0 }, { t: 'PENG', w: 2.9 }, { t: 'AMD', w: 2.9 }, { t: 'ALGM', w: 2.7 }, { t: 'MXL', w: 2.7 }],
  DRAM: [{ t: 'SNDK', w: 4.9 }, { t: 'WDC', w: 4.5 }, { t: 'STX', w: 4.5 }, { t: 'MU', w: 3.4 }],
  PTF: [{ t: 'MU', w: 4.8 }, { t: 'SNDK', w: 4.7 }, { t: 'KLAC', w: 4.4 }, { t: 'WDC', w: 4.0 }, { t: 'STX', w: 3.6 }],
  WCLD: [{ t: 'FROG', w: 3.0 }, { t: 'DDOG', w: 2.8 }, { t: 'PANW', w: 2.7 }, { t: 'TENB', w: 2.4 }, { t: 'DOCN', w: 2.4 }],
  IGV: [{ t: 'PANW', w: 10.4 }, { t: 'PLTR', w: 8.6 }, { t: 'MSFT', w: 8.4 }, { t: 'CRWD', w: 7.5 }, { t: 'ORCL', w: 5.1 }],
  FDTX: [{ t: 'MRVL', w: 9.7 }, { t: 'MU', w: 9.3 }, { t: 'TSM', w: 6.4 }, { t: 'WDC', w: 4.5 }, { t: 'PANW', w: 4.2 }],
  GTEK: [{ t: 'MRVL', w: 3.8 }, { t: 'NET', w: 3.1 }, { t: 'CDNS', w: 2.5 }, { t: 'DELL', w: 2.5 }, { t: 'APH', w: 2.4 }],
  ARKK: [{ t: 'TSLA', w: 10.4 }, { t: 'TEM', w: 5.4 }, { t: 'SHOP', w: 4.8 }, { t: 'HOOD', w: 4.7 }, { t: 'CRSP', w: 4.6 }],
  MARS: [{ t: 'SPCX', w: 22.3 }, { t: 'RKLB', w: 9.3 }, { t: 'ASTS', w: 7.3 }, { t: 'GSAT', w: 5.1 }, { t: 'VSAT', w: 5.1 }],
  FRWD: [{ t: 'NVDA', w: 9.2 }, { t: 'AMD', w: 7.5 }, { t: 'STX', w: 7.0 }, { t: 'TSM', w: 5.9 }, { t: 'LRCX', w: 5.5 }],
  BCTK: [{ t: 'TSM', w: 8.5 }, { t: 'SPCX', w: 7.7 }, { t: 'LRCX', w: 7.5 }, { t: 'AVGO', w: 7.2 }, { t: 'GOOG', w: 6.4 }],
  FWD: [{ t: 'NVDA', w: 3.1 }, { t: 'AVGO', w: 2.5 }, { t: 'AMD', w: 2.3 }, { t: 'AMAT', w: 2.3 }, { t: 'LRCX', w: 1.9 }],
  CBSE: [{ t: 'TXG', w: 3.4 }, { t: 'VG', w: 3.2 }, { t: 'SCI', w: 3.2 }, { t: 'META', w: 3.2 }, { t: 'SBUX', w: 3.1 }],
  FCUS: [{ t: 'INTC', w: 4.3 }, { t: 'MU', w: 4.3 }, { t: 'DELL', w: 4.2 }, { t: 'BE', w: 4.2 }, { t: 'WDC', w: 4.2 }],
  WGMI: [{ t: 'CIFR', w: 17.6 }, { t: 'HUT', w: 10.8 }, { t: 'KEEL', w: 10.2 }, { t: 'IREN', w: 10.2 }, { t: 'MARA', w: 5.1 }],
  CNEQ: [{ t: 'NVDA', w: 14.2 }, { t: 'MSFT', w: 6.7 }, { t: 'GOOG', w: 6.0 }, { t: 'TSM', w: 5.6 }, { t: 'AAPL', w: 5.4 }],
  SGRT: [{ t: 'VRT', w: 12.6 }, { t: 'WDC', w: 11.1 }, { t: 'MU', w: 6.8 }, { t: 'ARW', w: 5.9 }, { t: 'WELL', w: 5.3 }],
  SPMO: [{ t: 'MU', w: 10.7 }, { t: 'NVDA', w: 8.4 }, { t: 'AVGO', w: 6.5 }, { t: 'GOOGL', w: 4.5 }, { t: 'AMD', w: 4.3 }],
  XMMO: [{ t: 'CW', w: 4.2 }, { t: 'FTI', w: 3.6 }, { t: 'ATI', w: 3.4 }, { t: 'WWD', w: 3.0 }, { t: 'STRL', w: 2.9 }],
  POW: [{ t: 'PWR', w: 5.0 }, { t: 'POWL', w: 4.4 }, { t: 'PRY', w: 4.3 }, { t: 'ETN', w: 4.3 }, { t: 'NVT', w: 3.9 }],
  VOLT: [{ t: 'BELFB', w: 7.4 }, { t: 'POWL', w: 6.3 }, { t: 'ETN', w: 5.5 }, { t: 'NEE', w: 5.5 }, { t: 'PWR', w: 5.1 }],
  PBD: [{ t: 'NFI', w: 1.3 }, { t: 'RIVN', w: 1.3 }, { t: 'SHLS', w: 1.2 }, { t: 'BLBD', w: 1.1 }, { t: 'ITRI', w: 1.1 }],
  PBW: [{ t: 'OPAL', w: 2.5 }, { t: 'DAR', w: 2.0 }, { t: 'BETA', w: 2.0 }, { t: 'GEVO', w: 2.0 }, { t: 'RIVN', w: 1.9 }],
  IVEP: [{ t: 'NEE', w: 4.5 }, { t: 'SO', w: 4.3 }, { t: 'CEG', w: 4.2 }, { t: 'ETN', w: 4.2 }, { t: 'WMB', w: 4.1 }],
  AIRR: [{ t: 'STRL', w: 5.0 }, { t: 'CHRW', w: 4.9 }, { t: 'FIX', w: 4.1 }, { t: 'SAIA', w: 4.0 }, { t: 'OC', w: 3.9 }],
  PRN: [{ t: 'FIX', w: 4.6 }, { t: 'HWM', w: 4.3 }, { t: 'PWR', w: 4.2 }, { t: 'STRL', w: 3.9 }, { t: 'JBL', w: 3.5 }],
  RSHO: [{ t: 'TKR', w: 8.7 }, { t: 'POWL', w: 7.3 }, { t: 'CGNX', w: 7.2 }, { t: 'CAT', w: 6.9 }, { t: 'AIT', w: 6.0 }],
  IDEF: [{ t: 'RTX', w: 8.8 }, { t: 'LMT', w: 7.1 }, { t: 'BA', w: 5.0 }, { t: 'GD', w: 4.7 }, { t: 'FTNT', w: 3.6 }],
  BILT: [{ t: 'UNP', w: 6.3 }, { t: 'AENA', w: 4.8 }, { t: 'AEP', w: 4.4 }, { t: 'TRP', w: 4.3 }, { t: 'XEL', w: 3.7 }],
  BUZZ: [{ t: 'META', w: 3.6 }, { t: 'IBRX', w: 3.5 }, { t: 'AMD', w: 3.5 }, { t: 'SOFI', w: 3.5 }, { t: 'NOW', w: 3.2 }],
  MEME: [{ t: 'BE', w: 7.2 }, { t: 'AAOI', w: 6.7 }, { t: 'HIMS', w: 6.1 }, { t: 'IREN', w: 5.9 }, { t: 'NBIS', w: 5.8 }],
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
  'AI & ML':         { '1W': -7.4, '1M': -12.9, 'YTD': 29.1, '6M': 22.8, '1Y': 52.8 },
  'Semiconductors':  { '1W': -9.5, '1M': -19.5, 'YTD': 69.5, '6M': 54.3, '1Y': 98.4 },
  'Broad Tech':      { '1W': -5.7, '1M': -11.1, 'YTD': 13.9, '6M': 8.6, '1Y': 24.4 },
  'Electrification': { '1W': -3.1, '1M': -11.8, 'YTD': 16, '6M': 6.8, '1Y': 28.4 },
  'Industrials':     { '1W': -1.9, '1M': -6.7, 'YTD': 13.7, '6M': 1.8, '1Y': 23.1 },
  'Meme':            { '1W': -12, '1M': -20.4, 'YTD': 0.5, '6M': -11.2, '1Y': -13.3 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, IndexChartByPeriod> = {
  'AI & ML': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: -3.5, spyReturn: -1.1, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 100.91, 99.7, 95.66, 92.57], spy: [100, 100.36, 100.75, 100.21, 99.11], top10Return: -7.4, spyReturn: -0.9, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 103.9, 105.04, 99.25, 98.02, 99.66, 97.21, 99.91, 102.81, 99.26, 95.12, 97.17, 94.14, 95.11, 97.48, 97.29, 93.95, 94.75, 93.68, 89.96, 87.08], spy: [100, 100.78, 100.46, 99, 98.96, 99.1, 98.38, 100.01, 100.78, 100.65, 100.52, 101.39, 100.91, 100.6, 101.45, 101.89, 101.11, 101.47, 101.87, 101.32, 100.21], top10Return: -12.9, spyReturn: 0.2, xLabels: ["Jun 19", "Jun 26", "Jul 3", "Jul 10", "Jul 17"] },
    'YTD': { top10: [100, 102.26, 105.03, 104.9, 103.97, 103.99, 103.25, 104.49, 101.25, 100.03, 99.4, 95, 101.2, 113.76, 121.07, 120.49, 133.39, 139.34, 138.76, 153.67, 144.19, 153.46, 147.09, 148.42, 145.26, 129.12], spy: [100, 101.11, 101.43, 101.59, 101.12, 101.5, 100.64, 101.08, 99.91, 97.12, 95.11, 92.99, 96.67, 101.84, 104.3, 104.35, 107.61, 109.72, 108.92, 111.24, 108.4, 110.69, 107.53, 109.36, 110.71, 108.89], top10Return: 29.1, spyReturn: 8.9, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 104.46, 101.22, 101.21, 100.38, 102.93, 99.2, 99.66, 100.61, 98.38, 94.14, 103.25, 111.13, 117.75, 117.19, 129.29, 134.31, 131.41, 143.87, 151.41, 133.34, 145.43, 145.49, 137.82, 141.1, 125.58], spy: [100, 102.64, 101.76, 102.15, 101.29, 102.3, 101.11, 99.94, 99, 96.4, 95.98, 99.77, 103.3, 104.96, 105.02, 108.3, 109.55, 109.4, 111.37, 111.31, 107.06, 109.35, 108.37, 109.92, 111.42, 109.59], top10Return: 22.8, spyReturn: 7.4, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 101.34, 103.38, 103.92, 105.1, 101.06, 106.55, 105.06, 111.77, 115.46, 114.16, 118.68, 122.57, 119.69, 120.39, 125.36, 121.08, 116.76, 110.21, 118.21, 119.84, 122.22, 114.47, 119.72, 121.27, 123.63, 121.02, 126.46, 122.64, 122.69, 121.73, 124.95, 117.73, 120.73, 122.16, 119.15, 114.16, 125.4, 134.93, 143.16, 142.48, 157.43, 163.74, 160.17, 175.7, 184.79, 162.63, 177.7, 178.06, 168.12, 172.15, 152.76], spy: [100, 101.02, 100.64, 100.67, 102.69, 101.2, 103.32, 103.36, 104.71, 105.45, 104.78, 106.56, 106.87, 105.19, 106.96, 108.25, 106.73, 107.01, 103.9, 108.81, 108.97, 109.73, 107.71, 109.91, 109.5, 110.69, 107.89, 110.74, 109.79, 110.2, 109.27, 110.37, 108.33, 107.82, 106.81, 104, 103.55, 107.64, 111.45, 113.24, 113.3, 116.84, 118.19, 118.03, 120.15, 120.09, 115.51, 117.98, 116.92, 118.59, 120.21, 118.23], top10Return: 52.8, spyReturn: 18.2, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Semiconductors': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: -4, spyReturn: -1.1, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 103.84, 100.44, 94.3, 90.53], spy: [100, 100.36, 100.75, 100.21, 99.11], top10Return: -9.5, spyReturn: -0.9, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 107.49, 111, 100.77, 100.12, 105.2, 99.49, 102.86, 107.42, 99.69, 92.29, 95.28, 89.34, 91.31, 95.05, 94.3, 88.84, 92.19, 89.24, 83.85, 80.49], spy: [100, 100.78, 100.46, 99, 98.96, 99.1, 98.38, 100.01, 100.78, 100.65, 100.52, 101.39, 100.91, 100.6, 101.45, 101.89, 101.11, 101.47, 101.87, 101.32, 100.21], top10Return: -19.5, spyReturn: 0.2, xLabels: ["Jun 19", "Jun 26", "Jul 3", "Jul 10", "Jul 17"] },
    'YTD': { top10: [100, 109.74, 115.62, 116.28, 116.9, 121.45, 122.96, 125.67, 127.7, 131.75, 131.13, 126.03, 134.49, 154.42, 170.69, 173.54, 183.18, 194.96, 199.16, 205.25, 206.88, 223.48, 207.62, 209.37, 197.74, 169.53], spy: [100, 101.11, 101.43, 101.59, 101.12, 101.5, 100.64, 101.08, 99.91, 97.12, 95.11, 92.99, 96.67, 101.84, 104.3, 104.35, 107.61, 109.72, 108.92, 111.24, 108.4, 110.69, 107.53, 109.36, 110.71, 108.89], top10Return: 69.5, spyReturn: 8.9, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 106.16, 106.21, 110.43, 110.89, 114.51, 109.52, 110.84, 118.89, 126.06, 121.81, 126.9, 136.49, 152, 162.93, 174.13, 174.78, 177.99, 193.41, 199, 185.18, 198.97, 195.66, 182.69, 181.91, 155.74], spy: [100, 102.64, 101.76, 102.15, 101.29, 102.3, 101.11, 99.94, 99, 96.4, 95.98, 99.77, 103.3, 104.96, 105.02, 108.3, 109.55, 109.4, 111.37, 111.31, 107.06, 109.35, 108.37, 109.92, 111.42, 109.59], top10Return: 54.3, spyReturn: 7.4, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 99.83, 102.3, 102.65, 107.87, 106.54, 110.02, 108.93, 112.44, 119.29, 117.43, 123.35, 124.32, 125.89, 128.08, 132.88, 136, 130.31, 129.28, 137.29, 144, 143.92, 135.01, 139.04, 146.75, 149.42, 158.51, 162.86, 166.51, 171.96, 172.88, 163.67, 158.46, 154.89, 162.75, 164.68, 163.13, 176.91, 196.06, 197.25, 203.94, 224.02, 232.24, 224.73, 235.01, 243.59, 222.69, 241.61, 242.22, 228.1, 222.89, 198.4], spy: [100, 101.02, 100.64, 100.67, 102.69, 101.2, 103.32, 103.36, 104.71, 105.45, 104.78, 106.56, 106.87, 105.19, 106.96, 108.25, 106.73, 107.01, 103.9, 108.81, 108.97, 109.73, 107.71, 109.91, 109.5, 110.69, 107.89, 110.74, 109.79, 110.2, 109.27, 110.37, 108.33, 107.82, 106.81, 104, 103.55, 107.64, 111.45, 113.24, 113.3, 116.84, 118.19, 118.03, 120.15, 120.09, 115.51, 117.98, 116.92, 118.59, 120.21, 118.23], top10Return: 98.4, spyReturn: 18.2, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Broad Tech': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: -2.4, spyReturn: -1.1, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 101.46, 100.28, 96.69, 94.29], spy: [100, 100.36, 100.75, 100.21, 99.11], top10Return: -5.7, spyReturn: -0.9, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 102.06, 101.96, 98.82, 97.54, 98.28, 97.48, 99.91, 101.93, 99.64, 96.26, 97.96, 94.91, 95.25, 97.26, 96.51, 93.94, 95.29, 94.22, 91.05, 88.87], spy: [100, 100.78, 100.46, 99, 98.96, 99.1, 98.38, 100.01, 100.78, 100.65, 100.52, 101.39, 100.91, 100.6, 101.45, 101.89, 101.11, 101.47, 101.87, 101.32, 100.21], top10Return: -11.1, spyReturn: 0.2, xLabels: ["Jun 19", "Jun 26", "Jul 3", "Jul 10", "Jul 17"] },
    'YTD': { top10: [100, 103.22, 105.67, 104.32, 101.89, 102.18, 102.7, 104.78, 102.84, 100.29, 98.6, 96.32, 101.32, 110.59, 116.08, 114.53, 125.8, 126.39, 124.64, 134.09, 126.6, 132.01, 128.47, 128.66, 124.63, 113.89], spy: [100, 101.11, 101.43, 101.59, 101.12, 101.5, 100.64, 101.08, 99.91, 97.12, 95.11, 92.99, 96.67, 101.84, 104.3, 104.35, 107.61, 109.72, 108.92, 111.24, 108.4, 110.69, 107.53, 109.36, 110.71, 108.89], top10Return: 13.9, spyReturn: 8.9, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 103.06, 98.6, 99.05, 98.76, 100.85, 99.97, 99.02, 99.98, 98.24, 94.49, 101.12, 106.32, 111.8, 109.89, 120.75, 122.26, 119.28, 125.78, 130.37, 117.94, 124.96, 125.06, 119.96, 120.7, 110.64], spy: [100, 102.64, 101.76, 102.15, 101.29, 102.3, 101.11, 99.94, 99, 96.4, 95.98, 99.77, 103.3, 104.96, 105.02, 108.3, 109.55, 109.4, 111.37, 111.31, 107.06, 109.35, 108.37, 109.92, 111.42, 109.59], top10Return: 8.6, spyReturn: 7.4, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 100.64, 100.66, 100.32, 101.81, 99.99, 103.31, 102.12, 107.17, 110.3, 109.6, 114.13, 116.81, 115.89, 114.36, 116.38, 115, 110.32, 105.32, 112.75, 113.11, 113.73, 109.13, 112.11, 114.11, 117.13, 115.58, 119.65, 115.89, 116.52, 116.17, 119.72, 116.56, 115.11, 116.06, 114.49, 112.09, 117.76, 124.03, 128.53, 126.62, 135.91, 135.84, 134.94, 143.91, 146.72, 136.49, 143.43, 141.77, 135.67, 135.88, 124.39], spy: [100, 101.02, 100.64, 100.67, 102.69, 101.2, 103.32, 103.36, 104.71, 105.45, 104.78, 106.56, 106.87, 105.19, 106.96, 108.25, 106.73, 107.01, 103.9, 108.81, 108.97, 109.73, 107.71, 109.91, 109.5, 110.69, 107.89, 110.74, 109.79, 110.2, 109.27, 110.37, 108.33, 107.82, 106.81, 104, 103.55, 107.64, 111.45, 113.24, 113.3, 116.84, 118.19, 118.03, 120.15, 120.09, 115.51, 117.98, 116.92, 118.59, 120.21, 118.23], top10Return: 24.4, spyReturn: 18.2, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Electrification': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: -1.7, spyReturn: -1.1, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 101.26, 101.39, 98.59, 96.89], spy: [100, 100.36, 100.75, 100.21, 99.11], top10Return: -3.1, spyReturn: -0.9, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 101.71, 103.13, 99.71, 98.1, 98.5, 96.58, 97.73, 99.67, 97.76, 94.8, 95.82, 92.77, 92, 92.76, 93.04, 91.09, 92.19, 92.32, 89.81, 88.26], spy: [100, 100.78, 100.46, 99, 98.96, 99.1, 98.38, 100.01, 100.78, 100.65, 100.52, 101.39, 100.91, 100.6, 101.45, 101.89, 101.11, 101.47, 101.87, 101.32, 100.21], top10Return: -11.8, spyReturn: 0.2, xLabels: ["Jun 19", "Jun 26", "Jul 3", "Jul 10", "Jul 17"] },
    'YTD': { top10: [100, 103.75, 109.42, 110.69, 112.85, 114.19, 115.44, 118.36, 111.64, 112.49, 110.94, 111.34, 114.28, 122.75, 127.34, 127.51, 135.7, 136.22, 133.56, 137.46, 130.55, 133.35, 128.59, 127.82, 122.19, 116.05], spy: [100, 101.11, 101.43, 101.59, 101.12, 101.5, 100.64, 101.08, 99.91, 97.12, 95.11, 92.99, 96.67, 101.84, 104.3, 104.35, 107.61, 109.72, 108.92, 111.24, 108.4, 110.69, 107.53, 109.36, 110.71, 108.89], top10Return: 16, spyReturn: 8.9, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 104.03, 104.1, 106.11, 106.95, 109.78, 106.23, 105.6, 106.65, 106.62, 104.84, 109.44, 114.09, 117.96, 119.29, 126.59, 125.32, 120.28, 128.44, 127.94, 116.68, 122.27, 119.78, 115.63, 113.38, 107.75], spy: [100, 102.64, 101.76, 102.15, 101.29, 102.3, 101.11, 99.94, 99, 96.4, 95.98, 99.77, 103.3, 104.96, 105.02, 108.3, 109.55, 109.4, 111.37, 111.31, 107.06, 109.35, 108.37, 109.92, 111.42, 109.59], top10Return: 6.8, spyReturn: 7.4, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 102.72, 100.45, 101.72, 101.94, 101.6, 104.66, 102.77, 105.42, 108.59, 108.99, 111.93, 115.71, 118.41, 116.24, 118.1, 117.44, 116.2, 112.83, 118.3, 119.03, 120.44, 116.51, 120.93, 122.49, 122.58, 124.16, 127.74, 125.86, 127.7, 127.73, 129.68, 126.31, 126.29, 128.81, 131.32, 131.77, 137.23, 142.53, 142.77, 141.73, 150.08, 150.64, 143.61, 150.77, 152.95, 141.08, 143.8, 142.03, 136.5, 134.2, 128.36], spy: [100, 101.02, 100.64, 100.67, 102.69, 101.2, 103.32, 103.36, 104.71, 105.45, 104.78, 106.56, 106.87, 105.19, 106.96, 108.25, 106.73, 107.01, 103.9, 108.81, 108.97, 109.73, 107.71, 109.91, 109.5, 110.69, 107.89, 110.74, 109.79, 110.2, 109.27, 110.37, 108.33, 107.82, 106.81, 104, 103.55, 107.64, 111.45, 113.24, 113.3, 116.84, 118.19, 118.03, 120.15, 120.09, 115.51, 117.98, 116.92, 118.59, 120.21, 118.23], top10Return: 28.4, spyReturn: 18.2, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Industrials': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: -3.4, spyReturn: -1.1, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 101.06, 101, 99.51, 98.1], spy: [100, 100.36, 100.75, 100.21, 99.11], top10Return: -1.9, spyReturn: -0.9, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.98, 100.7, 99, 98.89, 99.92, 98.64, 99.99, 101.1, 99.21, 97.76, 99.11, 96.59, 96.25, 96.8, 96.35, 95.03, 96.01, 95.96, 94.58, 93.3], spy: [100, 100.78, 100.46, 99, 98.96, 99.1, 98.38, 100.01, 100.78, 100.65, 100.52, 101.39, 100.91, 100.6, 101.45, 101.89, 101.11, 101.47, 101.87, 101.32, 100.21], top10Return: -6.7, spyReturn: 0.2, xLabels: ["Jun 19", "Jun 26", "Jul 3", "Jul 10", "Jul 17"] },
    'YTD': { top10: [100, 105.38, 111.97, 110.81, 112.25, 115.09, 116.56, 118.59, 114.12, 110.74, 109.45, 109.11, 113.15, 119.5, 119.02, 116.96, 125.09, 123.48, 119.72, 122.06, 120.56, 122.59, 121.62, 121.82, 117.78, 113.72], spy: [100, 101.11, 101.43, 101.59, 101.12, 101.5, 100.64, 101.08, 99.91, 97.12, 95.11, 92.99, 96.67, 101.84, 104.3, 104.35, 107.61, 109.72, 108.92, 111.24, 108.4, 110.69, 107.53, 109.36, 110.71, 108.89], top10Return: 13.7, spyReturn: 8.9, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 101.31, 101.55, 103.92, 105.82, 107, 106.35, 103.25, 102.84, 101.38, 99.81, 106.12, 107.44, 107.74, 105.99, 113.2, 111.33, 108.37, 113.21, 110.93, 106.33, 111, 111.34, 108.2, 106.66, 103.07], spy: [100, 102.64, 101.76, 102.15, 101.29, 102.3, 101.11, 99.94, 99, 96.4, 95.98, 99.77, 103.3, 104.96, 105.02, 108.3, 109.55, 109.4, 111.37, 111.31, 107.06, 109.35, 108.37, 109.92, 111.42, 109.59], top10Return: 1.8, spyReturn: 7.4, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 100.58, 101.3, 102.23, 102.61, 100.77, 103.39, 102.55, 104.75, 106.31, 106, 109.13, 110.06, 108.64, 109.05, 110.64, 108.05, 105.07, 102.44, 107.06, 107.79, 110.04, 107.23, 110.21, 113.1, 117.53, 119.8, 121.36, 122.49, 125.48, 126.48, 127.95, 125.68, 123.02, 121.58, 121.19, 119.53, 127.18, 128.23, 129.35, 126.97, 135.25, 133.15, 129.64, 135.24, 132.86, 127.06, 132.48, 133.62, 129.97, 127.55, 123.09], spy: [100, 101.02, 100.64, 100.67, 102.69, 101.2, 103.32, 103.36, 104.71, 105.45, 104.78, 106.56, 106.87, 105.19, 106.96, 108.25, 106.73, 107.01, 103.9, 108.81, 108.97, 109.73, 107.71, 109.91, 109.5, 110.69, 107.89, 110.74, 109.79, 110.2, 109.27, 110.37, 108.33, 107.82, 106.81, 104, 103.55, 107.64, 111.45, 113.24, 113.3, 116.84, 118.19, 118.03, 120.15, 120.09, 115.51, 117.98, 116.92, 118.59, 120.21, 118.23], top10Return: 23.1, spyReturn: 18.2, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Meme': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 0, spyReturn: -1.1, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 95.62, 96.98, 94.59, 88.03], spy: [100, 100.36, 100.75, 100.21, 99.11], top10Return: -12, spyReturn: -0.9, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 100.64, 104.2, 104.07, 99.22, 95.88, 95.36, 93.36, 97.43, 99.45, 95.72, 90.73, 92.43, 87.69, 88.92, 91.5, 90.2, 86.33, 87.53, 85.44, 79.63], spy: [100, 100.78, 100.46, 99, 98.96, 99.1, 98.38, 100.01, 100.78, 100.65, 100.52, 101.39, 100.91, 100.6, 101.45, 101.89, 101.11, 101.47, 101.87, 101.32, 100.21], top10Return: -20.4, spyReturn: 0.2, xLabels: ["Jun 19", "Jun 26", "Jul 3", "Jul 10", "Jul 17"] },
    'YTD': { top10: [100, 106.79, 106.11, 103.33, 99.33, 97.65, 94.29, 95.18, 93.73, 93.05, 90.91, 89.01, 95.05, 109.79, 113.13, 112.05, 125.63, 127.09, 127.15, 141.61, 124.17, 132.57, 126.05, 125.11, 116.24, 100.51], spy: [100, 101.11, 101.43, 101.59, 101.12, 101.5, 100.64, 101.08, 99.91, 97.12, 95.11, 92.99, 96.67, 101.84, 104.3, 104.35, 107.61, 109.72, 108.92, 111.24, 108.4, 110.69, 107.53, 109.36, 110.71, 108.89], top10Return: 0.5, spyReturn: 8.9, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 94.82, 85.76, 87.87, 83.33, 84.53, 81.37, 81.8, 83.73, 82.66, 73.54, 81.46, 94.5, 100.19, 94.25, 107.07, 110.74, 104.37, 122.21, 124.9, 107.23, 112.42, 107.8, 107.17, 102.32, 88.81], spy: [100, 102.64, 101.76, 102.15, 101.29, 102.3, 101.11, 99.94, 99, 96.4, 95.98, 99.77, 103.3, 104.96, 105.02, 108.3, 109.55, 109.4, 111.37, 111.31, 107.06, 109.35, 108.37, 109.92, 111.42, 109.59], top10Return: -11.2, spyReturn: 7.4, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 102.28, 98.14, 92.15, 90.3, 87.18, 87.03, 81.5, 83.2, 83.75, 85.25, 88.58, 90.87, 83.98, 87.04, 85.04, 87.71, 87.31, 85.04, 84.13, 86.33, 84.44, 83.28, 83.47, 87.52, 90.24, 90.24, 87.24, 86.67, 88.68, 88.5, 85.7, 88.4, 91.44, 92.8, 94.73, 93.64, 95.36, 102.99, 107.75, 103.32, 101.92, 114.93, 113.34, 111.2, 111.16, 107.79, 102.65, 101.1, 100.12, 97.33, 86.7], spy: [100, 101.02, 100.64, 100.67, 102.69, 101.2, 103.32, 103.36, 104.71, 105.45, 104.78, 106.56, 106.87, 105.19, 106.96, 108.25, 106.73, 107.01, 103.9, 108.81, 108.97, 109.73, 107.71, 109.91, 109.5, 110.69, 107.89, 110.74, 109.79, 110.2, 109.27, 110.37, 108.33, 107.82, 106.81, 104, 103.55, 107.64, 111.45, 113.24, 113.3, 116.84, 118.19, 118.03, 120.15, 120.09, 115.51, 117.98, 116.92, 118.59, 120.21, 118.23], top10Return: -13.3, spyReturn: 18.2, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
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
export const SCAN_TIMESTAMP    = '2026-07-17T13:38:57.986Z';
export const SCAN_TIMESTAMP_NY = 'July 17, 2026 at 9:38 AM ET';
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
export const HOLDINGS_COUNT = 1270;
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
  { ticker: 'NVDA', name: `NVIDIA Corp`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 13.66, bestProScore: 6.43, avgProScore: 4.55, price: 202.11, weeklyChange: -0.70 },
  { ticker: 'MU', name: `Micron Technology Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 12.35, bestProScore: 4.90, avgProScore: 4.12, price: 828.90, weeklyChange: -11.54 },
  { ticker: 'AMD', name: `Advanced Micro Devices Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 11.10, bestProScore: 5.15, avgProScore: 3.70, price: 481.14, weeklyChange: -9.96 },
  { ticker: 'AVGO', name: `Broadcom Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 7.19, bestProScore: 3.08, avgProScore: 2.40, price: 367.40, weeklyChange: -4.34 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.65, bestProScore: 2.86, avgProScore: 2.33, price: 390.11, weeklyChange: -7.46 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 4.05, bestProScore: 2.14, avgProScore: 2.02, price: 224.19, weeklyChange: -0.65 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 3.76, bestProScore: 2.48, avgProScore: 1.88, price: 305.03, weeklyChange: -7.54 },
  { ticker: 'GOOGL', name: `ALPHABET INC CLASS A`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 3.74, bestProScore: 3.13, avgProScore: 1.87, price: 347.65, weeklyChange: -1.38 },
  { ticker: 'META', name: `Meta Platforms Inc Class A`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 3.54, bestProScore: 2.86, avgProScore: 1.77, price: 645.72, weeklyChange: -1.68 },
  { ticker: 'AMZN', name: `AMAZON.COM INC`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 3.20, bestProScore: 2.05, avgProScore: 1.60, price: 245.63, weeklyChange: -0.68 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': -10.5, '1M': -19.4, 'YTD': 70.5, '6M': 54.1, '1Y': 125.8 },
  ARTY: { '1W': -8.2, '1M': -15.5, 'YTD': 32.7, '6M': 23.9, '1Y': 51.2 },
  BAI:  { '1W': -8.6, '1M': -17.6, 'YTD': 24.6, '6M': 18.9, '1Y': 38.9 },
  IGPT: { '1W': -8.4, '1M': -14.1, 'YTD': 45.6, '6M': 38.2, '1Y': 73.5 },
  IVES: { '1W': -3.3, '1M': -3.1, 'YTD': 14.6, '6M': 9.2, '1Y': 30.6 },
  ALAI: { '1W': -4.3, '1M': -6.8, 'YTD': 17.3, '6M': 14.7, '1Y': 34.9 },
  CHAT: { '1W': -8.5, '1M': -17.2, 'YTD': 36, '6M': 29.9, '1Y': 60.8 },
  AIFD: { '1W': -6.1, '1M': -10.1, 'YTD': 28.7, '6M': 26.7, '1Y': 54.2 },
  SPRX: { '1W': -11.3, '1M': -23.1, 'YTD': 11.1, '6M': 1.1, '1Y': 38.4 },
  AOTG: { '1W': -5.1, '1M': -2.2, 'YTD': 10.2, '6M': 11.1, '1Y': 19.4 },
  // Semiconductors
  SOXX: { '1W': -7.9, '1M': -14.9, 'YTD': 69.4, '6M': 48.9, '1Y': 106.9 },
  PSI:  { '1W': -8.7, '1M': -17.3, 'YTD': 75.6, '6M': 49.7, '1Y': 123.9 },
  XSD:  { '1W': -9.3, '1M': -17.8, 'YTD': 51.6, '6M': 37.2, '1Y': 81.3 },
  DRAM: { '1W': -12.1, '1M': -28, 'YTD': 81.5, '6M': 81.5, '1Y': 81.5 },
  // Broad Tech
  PTF:  { '1W': -11, '1M': -26.5, 'YTD': 26.9, '6M': 16.2, '1Y': 39.6 },
  WCLD: { '1W': 0.6, '1M': 17.5, 'YTD': -0.6, '6M': 8.5, '1Y': -2.7 },
  IGV:  { '1W': 0.6, '1M': 4.6, 'YTD': -11.8, '6M': -5.1, '1Y': -16.2 },
  FDTX: { '1W': -6.2, '1M': -11.2, 'YTD': 22.4, '6M': 22.1, '1Y': 25.9 },
  GTEK: { '1W': -6.7, '1M': -11.5, 'YTD': 32.5, '6M': 26.6, '1Y': 46.8 },
  ARKK: { '1W': -4.4, '1M': -4.8, 'YTD': -2.8, '6M': -8.5, '1Y': -1.9 },
  MARS: { '1W': -9.5, '1M': -28.2, 'YTD': -2.6, '6M': -2.6, '1Y': -2.6 },
  FRWD: { '1W': -6.3, '1M': -11.5, 'YTD': 18.7, '6M': 18.2, '1Y': 18.7 },
  BCTK: { '1W': -5.3, '1M': -8.8, 'YTD': 13.2, '6M': 11.4, '1Y': 15.2 },
  FWD:  { '1W': -5.9, '1M': -12, 'YTD': 20.2, '6M': 10.3, '1Y': 37.3 },
  CBSE: { '1W': -1.8, '1M': -1.5, 'YTD': 24, '6M': 12.1, '1Y': 29.2 },
  FCUS: { '1W': -9.2, '1M': -21.6, 'YTD': 11.4, '6M': -3.3, '1Y': 31 },
  WGMI: { '1W': -12, '1M': -33.1, 'YTD': 20.2, '6M': -9.9, '1Y': 71.5 },
  CNEQ: { '1W': -3.7, '1M': -6.7, 'YTD': 10.9, '6M': 9, '1Y': 26.2 },
  SGRT: { '1W': -8.5, '1M': -16.6, 'YTD': 22.7, '6M': 15.2, '1Y': 53.4 },
  SPMO: { '1W': -5.1, '1M': -8.6, 'YTD': 19.1, '6M': 18.4, '1Y': 24.9 },
  XMMO: { '1W': -2.5, '1M': -8.8, 'YTD': 11.8, '6M': 8.1, '1Y': 18.3 },
  // Electrification
  POW:  { '1W': -3.1, '1M': -14.3, 'YTD': 34.6, '6M': 21.9, '1Y': 30.7 },
  VOLT: { '1W': -2.6, '1M': -7.6, 'YTD': 28.7, '6M': 18.3, '1Y': 40.9 },
  PBD:  { '1W': -1.9, '1M': -11, 'YTD': 11.3, '6M': 2.6, '1Y': 33.2 },
  PBW:  { '1W': -3.7, '1M': -18.1, 'YTD': 7.2, '6M': -7.3, '1Y': 38.6 },
  IVEP: { '1W': -4.3, '1M': -7.8, 'YTD': -1.6, '6M': -1.6, '1Y': -1.6 },
  // Industrials
  AIRR: { '1W': -1.4, '1M': -7.3, 'YTD': 21.8, '6M': 5.5, '1Y': 40.5 },
  PRN:  { '1W': -5, '1M': -14.9, 'YTD': 22.1, '6M': 7.8, '1Y': 31.5 },
  IDEF: { '1W': -1.7, '1M': -6, 'YTD': 0.2, '6M': -14.2, '1Y': 6.4 },
  BILT: { '1W': 0.5, '1M': 1.5, 'YTD': 10.7, '6M': 8.1, '1Y': 14 },
  // Meme
  BUZZ: { '1W': -6, '1M': -9.1, 'YTD': 4.7, '6M': -3.6, '1Y': 4 },
  MEME: { '1W': -17.3, '1M': -29.9, 'YTD': 10.6, '6M': -16.1, '1Y': -30.1 },
  RKNG: { '1W': -12.6, '1M': -22.1, 'YTD': -13.8, '6M': -13.8, '1Y': -13.8 },
};
// @@END_GENERATED:ETF_RETURNS@@

// @@GENERATED:ETF_DAY_CHANGE@@
// Today's % move per ETF ticker (1D, vs prior close). Refreshed by the 3×/day
// price jobs. Powers the 1D ranking in the theme-ETF side panel.
export const ETF_DAY_CHANGE: Record<string, number> = {
  AIS:  -4.18,
  ARTY: -3.33,
  BAI:  -3.86,
  IVES: -1.5,
  CHAT: -4.27,
  SPRX: -3.95,
  SOXX: -3.85,
  PSI:  -4.69,
  XSD:  -3.63,
  DRAM: -3.87,
  PTF:  -4.02,
  WCLD: -0.14,
  IGV:  -0.54,
  FDTX: -2.14,
  ARKK: -2.61,
  MARS: -2.29,
  FRWD: -3.05,
  FWD:  -2.96,
  WGMI: -4.36,
  SPMO: -2.24,
  XMMO: -2.02,
  VOLT: -1.25,
  PBD:  -1.68,
  PBW:  -2.06,
  PRN:  -3.42,
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
  'AI & ML': { etfs: ['AIS', 'IVES', 'AOTG'], series: { '1W': [100, 100.23, 99.6, 96.55, 93.69], '1M': [100, 102.74, 104.59, 100.46, 98.52, 99.67, 98.59, 100.63, 103.31, 101.57, 98.26, 99.55, 97.93, 97.78, 99.73, 99.93, 97.78, 97.89, 97.38, 94.53, 91.76], 'YTD': [100, 102.8, 104.9, 105.16, 103.9, 102.09, 101.04, 102.84, 100.53, 99.04, 97.72, 92.9, 98.84, 109.57, 117.85, 119.13, 131.35, 137.56, 136.72, 152.22, 141.5, 150.61, 145.91, 149.11, 146.03, 131.75], '6M': [100, 103.09, 100.42, 98.52, 97.07, 99.66, 96.76, 97.6, 97.94, 95.41, 90.7, 98.64, 106.1, 113.35, 114.53, 124.84, 131.15, 128.26, 140.54, 148.19, 130.96, 141.21, 142.16, 137.34, 140.01, 126.66], '1Y': [100, 100.9, 101.91, 101.62, 102.91, 99.43, 104.31, 103.24, 109.76, 113.84, 113.2, 117.93, 121.28, 119.94, 121.29, 125.75, 122.22, 119.18, 111.45, 117.19, 118.92, 121.01, 115.1, 120.12, 122.01, 124.31, 122.64, 126.62, 123.65, 121.62, 120.22, 123.85, 117.62, 120.45, 121.71, 117.63, 112.51, 122.94, 132.18, 141.72, 143.38, 157.09, 165.41, 161.51, 177.64, 186.97, 164.96, 179, 181.12, 173.12, 176.73, 158.59] }, returns: { '1W': -6.3, '1M': -8.2, 'YTD': 31.8, '6M': 26.7, '1Y': 58.6 } },
  'Semiconductors': { etfs: ['PSI', 'DRAM', 'XSD'], series: { '1W': [100, 104.26, 100.48, 93.79, 89.99], '1M': [100, 107.78, 111.6, 100.83, 100.06, 105.51, 99.86, 103, 107.62, 99.59, 91.58, 94.72, 88.46, 90.51, 94.41, 93.43, 87.69, 91.35, 88.12, 82.32, 78.97], 'YTD': [100, 110.95, 116.25, 117.07, 117.62, 123.03, 124.33, 128.07, 132.88, 138.99, 138.03, 132.24, 140.82, 161.48, 179.8, 181.58, 188.14, 201.28, 207.46, 210.36, 212.59, 228.42, 210.24, 212.78, 199.31, 169.58], '6M': [100, 106.86, 107.46, 112.51, 112.49, 116.32, 112.28, 114.31, 124.9, 134.38, 129.94, 132.6, 142.28, 160, 172.78, 182.08, 180.84, 185.91, 201.61, 204.49, 193.4, 206.03, 199.11, 187.63, 185.1, 157.25], '1Y': [100, 100.45, 103.94, 104.3, 109.46, 109.28, 112.54, 112.22, 115.41, 122.87, 120.3, 126.38, 126.52, 128.78, 131.43, 135.88, 141.11, 134.62, 136.12, 142.92, 150.59, 149.37, 140.53, 144.01, 152.66, 154.57, 165.74, 169.68, 175.28, 181.77, 182.12, 168.46, 166.01, 160.71, 170.99, 173.47, 173.07, 185.8, 207.07, 204.62, 211.07, 230.16, 238.23, 229.29, 236.35, 241.55, 223.7, 241.06, 238.42, 227.56, 218.58, 195.56] }, returns: { '1W': -10, '1M': -21, 'YTD': 69.6, '6M': 57.3, '1Y': 95.6 } },
  'Broad Tech': { etfs: ['GTEK', 'SGRT', 'WGMI'], series: { '1W': [100, 101.15, 100.06, 94.53, 90.93], '1M': [100, 103.39, 104.62, 100.83, 98.59, 98.88, 97.74, 97.9, 99.62, 95.25, 89.51, 92.26, 87.81, 89.63, 92.66, 91.55, 87.37, 88.44, 87.36, 82.75, 79.63], 'YTD': [100, 107.13, 114.87, 111.53, 109.34, 108.92, 107.84, 112.38, 105.29, 103.2, 102.48, 99.36, 105.37, 122.14, 128.6, 122.72, 145.44, 147.85, 145.6, 161.33, 152.27, 161.07, 156.39, 150.25, 144.25, 125.13], '6M': [100, 104.9, 98.46, 98.45, 97.77, 102.54, 98.46, 95.07, 97.31, 95.9, 91.01, 102.65, 109.99, 116.3, 111.34, 130.91, 131.39, 126.25, 142.39, 146.58, 128.71, 142.59, 140.98, 127.74, 130.6, 113.61], '1Y': [100, 101.54, 98.76, 100.22, 103.55, 104.15, 110.39, 109.1, 119.11, 129.25, 129.27, 138.57, 150.57, 151.16, 142.8, 146.52, 147.59, 130.21, 122.96, 138.77, 138.31, 137.49, 125.94, 130.55, 139.75, 143.18, 140.77, 149.83, 141.33, 141.56, 136.51, 140.08, 131.04, 130.23, 132.99, 133.37, 132.42, 144.78, 155.96, 163.35, 161.37, 185.42, 180.13, 181.7, 204.12, 202.82, 187.76, 204.74, 196.94, 178.56, 179.71, 157.23] }, returns: { '1W': -9.1, '1M': -20.4, 'YTD': 25.1, '6M': 13.6, '1Y': 57.2 } },
  'Electrification': { etfs: ['VOLT', 'POW', 'PBD'], series: { '1W': [100, 101.68, 101.54, 98.72, 97.48], '1M': [100, 101.45, 103.01, 98.73, 98.44, 99.32, 96.39, 98.33, 100.6, 97.69, 95.19, 96.46, 92.65, 92.3, 93.2, 93.66, 91.35, 92.88, 92.75, 90.19, 89.05], 'YTD': [100, 102.4, 109.24, 111.12, 114.25, 117.52, 119.18, 123.46, 115.62, 115.76, 115.54, 116.17, 119.65, 131.03, 134.75, 137.86, 149.14, 146.46, 141.56, 143.79, 136.76, 141.97, 138.34, 137.23, 131.47, 124.87], '6M': [100, 104.65, 105.47, 108.48, 110.02, 114.77, 109.18, 107.77, 110.25, 110.09, 108.64, 115.62, 119.72, 124.35, 127.2, 137.59, 135.11, 127.52, 134.19, 133.73, 122.06, 129.57, 128.81, 123.28, 121.31, 115.22], '1Y': [100, 102.71, 101.04, 101.74, 101.1, 100, 103.02, 101.57, 104.07, 105.27, 104.18, 107.87, 110, 112.58, 111.28, 113.82, 115.19, 114.12, 111.58, 115.88, 117.12, 118.92, 115.95, 120.25, 121.12, 118.81, 122.07, 126.77, 125.59, 128.14, 129.4, 133.01, 131.43, 131.28, 134.14, 137.74, 139.5, 147.16, 150.91, 149.09, 148.82, 158.59, 156.58, 147.85, 152.46, 156.21, 148.15, 149.07, 149.56, 142.15, 140.24, 134.92] }, returns: { '1W': -2.5, '1M': -11, 'YTD': 24.9, '6M': 15.2, '1Y': 34.9 } },
  'Industrials': { etfs: ['AIRR', 'BILT', 'IDEF'], series: { '1W': [100, 100.74, 100.82, 99.87, 99.14], '1M': [100, 99.35, 99.34, 98.32, 98.31, 98.94, 98.35, 99.34, 100.13, 99.02, 99.07, 100.51, 98.52, 98.12, 98.23, 97.83, 96.86, 97.56, 97.64, 96.73, 96.05], 'YTD': [100, 105.81, 111.55, 110.52, 111.77, 114.45, 115.86, 117.35, 114.26, 111.27, 109.13, 108.57, 112.55, 117.2, 115.92, 113.99, 119.3, 117.33, 115, 116.84, 115.61, 115.72, 114, 114.68, 113.06, 110.92], '6M': [100, 101.17, 101.37, 103.55, 105.58, 106.12, 106.47, 103.61, 103.29, 100.59, 99.73, 105.05, 105.91, 105.26, 103.65, 108.3, 106.35, 104.51, 108.44, 105.47, 102.75, 105.04, 104.26, 103.95, 102.72, 100.88], '1Y': [100, 100.85, 101.32, 102.6, 103.18, 101.21, 103.65, 103.01, 105.14, 106.77, 106.84, 109.51, 110.29, 108.34, 109.11, 110.44, 108.04, 105.97, 103.83, 107.27, 107.7, 109.26, 107.76, 109.98, 113, 117.85, 119.76, 121.13, 122.51, 125.31, 126.05, 126.76, 125.79, 123.19, 121.54, 120.1, 119.38, 125.87, 126.19, 126.41, 124.12, 129.2, 127.05, 124.91, 129.34, 126.25, 122.6, 125.11, 125.17, 124.96, 122.7, 120.3] }, returns: { '1W': -0.9, '1M': -4, 'YTD': 10.9, '6M': 0.9, '1Y': 20.3 } },
  'Meme': { etfs: ['BUZZ', 'RKNG', 'MEME'], series: { '1W': [100, 95.62, 96.98, 94.59, 88.03], '1M': [100, 100.64, 104.2, 104.07, 99.22, 95.88, 95.36, 93.36, 97.43, 99.45, 95.72, 90.73, 92.43, 87.69, 88.92, 91.5, 90.2, 86.33, 87.53, 85.44, 79.63], 'YTD': [100, 106.79, 106.11, 103.33, 99.33, 97.65, 94.29, 95.18, 93.73, 93.05, 90.91, 89.01, 95.05, 109.79, 113.13, 112.05, 125.63, 127.09, 127.15, 141.61, 124.17, 132.57, 126.05, 125.11, 116.24, 100.51], '6M': [100, 94.82, 85.76, 87.87, 83.33, 84.53, 81.37, 81.8, 83.73, 82.66, 73.54, 81.46, 94.5, 100.19, 94.25, 107.07, 110.74, 104.37, 122.21, 124.9, 107.23, 112.42, 107.8, 107.17, 102.32, 88.81], '1Y': [100, 102.28, 98.14, 92.15, 90.3, 87.18, 87.03, 81.5, 83.2, 83.75, 85.25, 88.58, 90.87, 83.98, 87.04, 85.04, 87.71, 87.31, 85.04, 84.13, 86.33, 84.44, 83.28, 83.47, 87.52, 90.24, 90.24, 87.24, 86.67, 88.68, 88.5, 85.7, 88.4, 91.44, 92.8, 94.73, 93.64, 95.36, 102.99, 107.75, 103.32, 101.92, 114.93, 113.34, 111.2, 111.16, 107.79, 102.65, 101.1, 100.12, 97.33, 86.7] }, returns: { '1W': -12, '1M': -20.4, 'YTD': 0.5, '6M': -11.2, '1Y': -13.3 } },
};
// @@END_GENERATED:THEME_REPRESENTATIVES@@

// @@GENERATED:THEME_UNIVERSE@@
export const THEME_UNIVERSE: Partial<Record<Theme, ThemeUniverseFund[]>> = {
  'AI & ML': [
    { t: 'AIS', chosen: true, anchor: true, score: 90, ret6: 54.1, ret1: 125.8, corr: 0.76, reason: 'anchor', series: { '1W': [100, 102.92, 99.67, 93.48, 89.53], '1M': [100, 107.08, 110.64, 100.85, 100.45, 105.11, 99.89, 102.9, 106.76, 99.47, 92.89, 96.45, 90.56, 92.55, 96.65, 95.75, 90.03, 92.65, 89.73, 84.16, 80.6], 'YTD': [100, 105.32, 110.67, 111.78, 114.51, 115.09, 116.94, 121.9, 114.16, 114.61, 114.22, 109.56, 117.66, 136.4, 149.72, 153.85, 175.11, 188.48, 185.86, 208.13, 196, 215.2, 212.52, 210.46, 202.57, 170.53], '6M': [100, 104.5, 104.72, 105.25, 106.95, 113.7, 107.36, 106.71, 109.3, 106.8, 101.48, 115.88, 124, 136.92, 140.7, 160.15, 171.77, 165.33, 187.31, 199.93, 170.1, 193.49, 203.37, 179.73, 185.25, 155.96] } },
    { t: 'IGPT', chosen: false, anchor: false, score: 55.9, ret6: 38.2, ret1: 73.5, corr: 0.96, reason: 'correlated', series: { '1W': [100, 101.95, 99.77, 94.93, 91.58], '1M': [100, 105.56, 107.25, 99.7, 99.06, 102.12, 98.06, 100.51, 103.27, 99.35, 94.51, 97.36, 93.87, 94.8, 97.97, 98.17, 93.78, 95.61, 93.56, 89.03, 85.88], 'YTD': [100, 103.85, 105.3, 107.7, 107.82, 105.43, 105.95, 108.05, 104.09, 102.25, 101.7, 95.71, 101.72, 115.03, 122.8, 128.22, 146.01, 152.7, 153.07, 171.3, 159.98, 173.15, 167.9, 168.39, 166.4, 145.57], '6M': [100, 105.99, 104.29, 101.98, 102.49, 105.74, 102.18, 101.09, 102.67, 98.06, 94.44, 103.85, 111.87, 118.79, 124.02, 141.23, 148.96, 144.89, 161.79, 166.85, 147.63, 163.96, 167.44, 154.96, 160.96, 140.81] } },
    { t: 'CHAT', chosen: false, anchor: false, score: 45.3, ret6: 29.9, ret1: 60.8, corr: 0.94, reason: 'correlated', series: { '1W': [100, 101.32, 100.9, 95.55, 91.48], '1M': [100, 105.65, 107.43, 99.48, 98.85, 100.94, 96.63, 98.51, 101.87, 96.54, 91.66, 93.94, 90.43, 92.71, 95.38, 94.7, 90.46, 91.66, 91.28, 86.44, 82.76], 'YTD': [100, 102.34, 104.65, 104.82, 104.99, 106.41, 108.94, 109.89, 105.29, 106.45, 106.05, 102.24, 109.57, 124.59, 132.95, 129.63, 145.64, 150.58, 150.51, 173.05, 158.75, 167.15, 162.42, 158.62, 155.6, 135.97], '6M': [100, 106.76, 103.86, 105.27, 107.77, 110.17, 104.87, 109.6, 109.55, 106.86, 103.78, 113.96, 122.75, 131.53, 128.24, 144.08, 148.62, 144.8, 162.52, 172.43, 147.01, 162.53, 164.06, 148.98, 153.93, 134.51] } },
    { t: 'AIFD', chosen: false, anchor: false, score: 40.5, ret6: 26.7, ret1: 54.2, corr: 0.88, reason: 'correlated', series: { '1W': [100, 101.2, 99.55, 96.34, 93.93], '1M': [100, 102.62, 102.58, 97.5, 96.48, 98.01, 96.47, 99.71, 103.05, 99.91, 95.95, 98.42, 95.55, 96.73, 98.68, 98.14, 95.72, 96.87, 95.29, 92.22, 89.91], 'YTD': [100, 100.69, 101.61, 102.21, 101.03, 104.47, 105.34, 105.38, 104.7, 103.85, 103.98, 100.06, 107.16, 116.95, 124.18, 121.64, 132.44, 137.89, 135.48, 147.62, 141.22, 147.16, 138.09, 143, 140.47, 128.7], '6M': [100, 104.77, 101.83, 105.29, 106.17, 108.45, 105.21, 106.94, 107.63, 107.12, 103.42, 112.7, 118.68, 125.16, 122.6, 133.49, 136.93, 133.25, 139.72, 151.16, 137.07, 144.27, 141.4, 138.42, 141.58, 129.71] } },
    { t: 'ARTY', chosen: false, anchor: false, score: 37.5, ret6: 23.9, ret1: 51.2, corr: 0.91, reason: 'correlated', series: { '1W': [100, 100.45, 98.74, 94.83, 91.82], '1M': [100, 104.25, 104.94, 98.34, 97.71, 98.78, 95.51, 97.93, 100.63, 96.64, 93.93, 95.73, 92.4, 93.92, 96.09, 95.8, 92.03, 92.44, 90.87, 87.28, 84.5], 'YTD': [100, 102.74, 107.12, 108.57, 106.14, 106.72, 106.27, 107.49, 101.25, 100.48, 99.15, 95.16, 100.42, 116.77, 127.19, 125.86, 140.81, 142.32, 141.37, 162, 153.36, 160.59, 153.49, 151.81, 150.48, 132.73], '6M': [100, 106.12, 101.35, 101.9, 101.47, 103.88, 97.86, 97.4, 99.64, 96.08, 92.21, 100.85, 112.39, 121.44, 120.17, 134.44, 134.3, 131.47, 144.09, 158.58, 135.91, 149.98, 148.16, 140.88, 143.68, 126.73] } },
    { t: 'BAI', chosen: false, anchor: false, score: 28.9, ret6: 18.9, ret1: 38.9, corr: 0.95, reason: 'correlated', series: { '1W': [100, 102.71, 100.02, 94.98, 91.38], '1M': [100, 105.62, 107.66, 99.13, 98.65, 102.12, 97.52, 100.91, 104.67, 98.25, 93.31, 95.69, 90.45, 92.18, 95.39, 94.72, 90.17, 92.61, 90.19, 85.65, 82.4], 'YTD': [100, 100.96, 104.8, 103.78, 102.88, 104.92, 104.68, 105.86, 101.41, 99.7, 100.54, 97.96, 104.38, 118.95, 124.83, 124.65, 138.56, 146.07, 142.64, 153.03, 143.66, 156.46, 149.22, 148.62, 143.27, 124.64], '6M': [100, 104.3, 100.85, 102.86, 102.62, 106.21, 100.82, 100.32, 100.97, 102.27, 97, 109.63, 116.51, 122.37, 122.2, 135.83, 142.54, 136.27, 147.66, 152.22, 134.18, 148.28, 151.43, 138.36, 140.45, 122.18] } },
    { t: 'ALAI', chosen: false, anchor: false, score: 24.8, ret6: 14.7, ret1: 34.9, corr: 0.9, reason: 'correlated', series: { '1W': [100, 99.8, 100.86, 97.99, 95.68], '1M': [100, 102.93, 101.59, 98.46, 97.14, 97.3, 96.92, 98.86, 100.48, 99.14, 95.93, 98.97, 97.31, 98.05, 99.03, 99.89, 97.42, 97.23, 98.26, 95.46, 93.22], 'YTD': [100, 101.24, 102.19, 100.8, 98.03, 97.71, 96.32, 96.61, 94.9, 93.02, 91.79, 87.74, 93.99, 104.9, 108.5, 108.76, 116.89, 120.2, 120.49, 129.35, 120.58, 127.44, 122.18, 124.7, 125.64, 117.25], '6M': [100, 103.53, 98.99, 98.67, 97.26, 98.74, 95.61, 95.75, 96.27, 93.48, 92.39, 98.74, 107.47, 109.56, 109.82, 118.04, 119.46, 119.71, 125.82, 128.41, 117, 127.01, 123.59, 121.84, 126.87, 118.4] } },
    { t: 'IVES', chosen: true, anchor: false, score: 19.9, ret6: 9.2, ret1: 30.6, corr: 0.84, reason: 'diversifier', series: { '1W': [100, 100.24, 100.24, 98.1, 96.66], '1M': [100, 101.77, 100.51, 98.07, 96.74, 96.01, 96.82, 99.89, 101.95, 101.45, 99.76, 102.22, 100.51, 100.51, 102.09, 101.47, 100.24, 100.48, 100.48, 98.34, 96.9], 'YTD': [100, 102.18, 104.87, 103.7, 100.19, 98.54, 96.58, 96.68, 96.05, 94.31, 92.57, 87, 91.9, 98.83, 106.8, 103.73, 111.89, 117.02, 117.37, 132.02, 119.39, 121.2, 114.36, 119.93, 119.96, 114.55], '6M': [100, 103.93, 98.75, 97.13, 95.2, 95.32, 93.98, 94.29, 95.04, 90.86, 88.46, 92.49, 100.03, 105.27, 102.25, 110.29, 113.72, 114.09, 121.42, 125.32, 112.5, 116.53, 111.88, 116.25, 118.24, 112.91] } },
    { t: 'SPRX', chosen: false, anchor: false, score: 19.8, ret6: 1.1, ret1: 38.4, corr: 0.88, reason: 'correlated', series: { '1W': [100, 100.96, 98.36, 92.33, 88.74], '1M': [100, 104.1, 105.19, 98.56, 96.75, 98.34, 95.18, 100.72, 104.19, 98.02, 91.18, 92.96, 87.6, 89.38, 93.05, 91.73, 86.6, 87.44, 85.18, 79.96, 76.86], 'YTD': [100, 102.37, 109.87, 105.67, 107.15, 108.01, 101.82, 103.07, 99.31, 97.48, 97.61, 92.42, 98.26, 111.67, 116.68, 108.73, 119.53, 130.94, 133.87, 143.65, 139.82, 150.81, 139.86, 141.69, 132.6, 111.09], '6M': [100, 103.85, 99.77, 100.56, 94.8, 97.14, 95.13, 92.7, 95.55, 93.68, 86.09, 96.9, 103.29, 108.63, 101.23, 111.29, 118.82, 118.91, 135.53, 139.9, 121.77, 134.58, 132.35, 122.71, 123.46, 103.43] } },
    { t: 'AOTG', chosen: true, anchor: false, score: 15.3, ret6: 11.1, ret1: 19.4, corr: 0.84, reason: 'diversifier', series: { '1W': [100, 97.53, 98.88, 98.07, 94.87], '1M': [100, 99.38, 102.63, 102.46, 98.37, 97.9, 99.06, 99.11, 101.21, 103.79, 102.12, 99.98, 102.73, 100.28, 100.46, 102.56, 103.07, 100.53, 101.92, 101.08, 97.78], 'YTD': [100, 100.91, 99.17, 99.99, 96.99, 92.64, 89.61, 89.93, 91.37, 88.19, 86.37, 82.15, 86.96, 93.49, 97.04, 99.82, 107.05, 107.18, 106.94, 116.51, 109.1, 115.44, 110.85, 116.95, 115.57, 110.18], '6M': [100, 100.83, 97.8, 93.18, 89.05, 89.97, 88.94, 91.81, 89.47, 88.58, 82.16, 87.54, 94.27, 97.85, 100.65, 104.07, 107.95, 105.36, 112.88, 119.33, 110.28, 113.62, 111.24, 116.03, 116.54, 111.11] } },
  ],
  'Semiconductors': [
    { t: 'PSI', chosen: true, anchor: true, score: 86.8, ret6: 49.7, ret1: 123.9, corr: 0.91, reason: 'anchor', series: { '1W': [100, 104.1, 101.33, 95.73, 91.32], '1M': [100, 106.42, 110.13, 101.77, 100.76, 105.88, 100.42, 106.27, 112.14, 104.14, 94.35, 95.28, 88.57, 90.36, 95.22, 95.19, 90.57, 94.28, 91.77, 86.7, 82.7], 'YTD': [100, 109.1, 117.35, 116.38, 119.05, 126.02, 126.67, 127.64, 119.55, 116.76, 120.02, 118.2, 126.21, 144.69, 157.37, 163.42, 183.38, 193.9, 191.12, 194.81, 193.39, 222.67, 213.99, 221.16, 202.16, 175.64], '6M': [100, 102.8, 102.56, 108.56, 109.12, 114.41, 105.77, 102.8, 104.6, 109.27, 103.1, 116.09, 124.48, 135.57, 140.78, 157.97, 166.06, 162.89, 173.12, 178.94, 162.55, 182.96, 193.72, 172.61, 174.15, 151.31] } },
    { t: 'DRAM', chosen: true, anchor: false, score: 81.5, ret6: 81.5, ret1: 81.5, corr: -0.14, reason: 'diversifier', series: { '1W': [100, 106.86, 100.17, 91.34, 87.92], '1M': [100, 109.66, 115.4, 98.96, 99.97, 109.92, 102.76, 102.84, 105.58, 94.15, 86.68, 92.58, 86.62, 88.69, 92.01, 90.12, 81.92, 87.53, 82.06, 74.82, 72.02], 'YTD': [100, 116.97, 120.86, 126.22, 125.83, 130.98, 134.47, 145.57, 175.36, 198.41, 193.77, 179.29, 190.27, 218.77, 244.96, 236.67, 215.63, 234.19, 251.98, 249.35, 258.93, 266.03, 233.29, 231.84, 220.57, 181.48], '6M': [100, 116.97, 120.86, 126.22, 125.83, 130.98, 134.47, 145.57, 175.36, 198.41, 193.77, 179.29, 190.27, 218.77, 244.96, 236.67, 215.63, 234.19, 251.98, 249.35, 258.93, 266.03, 233.29, 231.84, 220.57, 181.48] } },
    { t: 'SOXX', chosen: false, anchor: false, score: 77.9, ret6: 48.9, ret1: 106.9, corr: 0.95, reason: 'correlated', series: { '1W': [100, 102.58, 100.3, 95.83, 92.14], '1M': [100, 106.62, 109.22, 100.61, 100.3, 104.25, 98.37, 102.44, 106.84, 100, 94.43, 96.96, 91.99, 93.71, 96.99, 96.93, 92.31, 94.7, 92.59, 88.46, 85.05], 'YTD': [100, 106.12, 113.72, 113.92, 114.77, 116.7, 118.85, 118.48, 112.16, 110.02, 110.41, 107.41, 115.48, 133.24, 143.37, 149.42, 168.31, 176, 174.24, 189.92, 189.76, 208.68, 199.73, 199.14, 193.04, 169.38], '6M': [100, 104.07, 102.46, 104.17, 106.1, 109.09, 101.24, 100.43, 100.86, 101.09, 97.42, 109.8, 119.12, 127.99, 133.39, 150.25, 156.6, 154.23, 168.81, 182.5, 160.52, 177.78, 185.33, 167.87, 172.33, 151.2] } },
    { t: 'XSD', chosen: true, anchor: false, score: 59.3, ret6: 37.2, ret1: 81.3, corr: 0.91, reason: 'diversifier', series: { '1W': [100, 101.81, 99.94, 94.31, 90.73], '1M': [100, 107.26, 109.27, 101.75, 99.45, 100.73, 96.4, 99.9, 105.13, 100.47, 93.7, 96.29, 90.19, 92.48, 95.99, 94.97, 90.58, 92.23, 90.53, 85.43, 82.19], 'YTD': [100, 106.78, 110.53, 108.61, 107.97, 112.09, 111.85, 111, 103.74, 101.8, 100.31, 99.24, 105.99, 120.98, 137.07, 144.65, 165.4, 175.74, 179.28, 186.93, 185.46, 196.55, 183.45, 185.34, 175.2, 151.61], '6M': [100, 100.82, 98.97, 102.75, 102.53, 103.57, 96.61, 94.55, 94.75, 95.45, 92.95, 102.42, 112.09, 125.65, 132.59, 151.61, 160.83, 160.64, 179.73, 185.19, 158.73, 169.09, 170.32, 158.44, 160.59, 138.97] } },
  ],
  'Broad Tech': [
    { t: 'GTEK', chosen: true, anchor: true, score: 36.7, ret6: 26.6, ret1: 46.8, corr: 0.76, reason: 'anchor', series: { '1W': [100, 101.3, 99.98, 96.95, 93.27], '1M': [100, 103.68, 104.67, 100.57, 100.08, 100.49, 99.71, 101.99, 105.14, 103.25, 99.65, 101.01, 96.97, 96.82, 99.48, 99.28, 94.94, 96.17, 94.92, 92.04, 88.55], 'YTD': [100, 103.18, 104.7, 106.43, 103.19, 106.83, 107.3, 110.48, 103.35, 101.72, 102.39, 100.49, 105.62, 116.96, 127.44, 125.95, 137.3, 138.17, 136.84, 152.07, 145.21, 153.22, 149.79, 154.52, 148.59, 132.52], '6M': [100, 106.19, 100.95, 104.51, 104.97, 108.52, 103.21, 102.44, 103.55, 102.96, 100.12, 110.26, 115.45, 124.67, 123.21, 134.32, 135.1, 131.06, 145.56, 150.12, 136.67, 146.41, 147.12, 145.9, 145.36, 129.65] } },
    { t: 'SGRT', chosen: true, anchor: false, score: 34.3, ret6: 15.2, ret1: 53.4, corr: 0.14, reason: 'diversifier', series: { '1W': [100, 102.23, 98.81, 94.63, 91.51], '1M': [100, 101.6, 104.49, 98.67, 98.56, 101.69, 97.88, 99.05, 101.96, 97.01, 91.49, 93.61, 89.89, 91.87, 95.32, 94.62, 91.14, 93.16, 90.05, 86.24, 83.4], 'YTD': [100, 101.94, 106.48, 106.44, 106.45, 108.56, 111.58, 116.47, 109.96, 107.86, 106.6, 105.64, 112.32, 125.27, 127.51, 123.63, 140.26, 144.54, 139.02, 147.02, 139.8, 149.66, 144.94, 142.66, 139.14, 122.65], '6M': [100, 102.94, 100.46, 102.45, 105.3, 111.28, 106.72, 105.28, 105.15, 104.11, 100.68, 113.66, 116.42, 120.34, 116.68, 132.38, 136.94, 128.79, 137.96, 142.94, 126.28, 138.79, 141.13, 126.98, 131.32, 115.75] } },
    { t: 'WGMI', chosen: true, anchor: false, score: 30.8, ret6: -9.9, ret1: 71.5, corr: 0.76, reason: 'diversifier', series: { '1W': [100, 99.92, 101.4, 92.02, 88.01], '1M': [100, 104.89, 104.71, 103.26, 97.12, 94.46, 95.62, 92.67, 91.75, 85.5, 77.38, 82.16, 76.56, 80.2, 83.19, 80.74, 76.04, 75.98, 77.1, 69.97, 66.93], 'YTD': [100, 116.28, 133.42, 121.71, 118.37, 111.37, 104.63, 110.19, 102.56, 100.01, 98.46, 91.95, 98.17, 124.2, 130.86, 118.58, 158.77, 160.83, 160.94, 184.9, 171.81, 180.32, 174.44, 153.57, 145.02, 120.21], '6M': [100, 105.58, 93.96, 88.4, 83.05, 87.82, 85.46, 77.49, 83.24, 80.63, 72.23, 84.03, 98.11, 103.88, 94.13, 126.03, 122.13, 118.9, 143.66, 146.68, 123.17, 142.58, 134.68, 110.33, 115.12, 95.43] } },
    { t: 'PTF', chosen: false, anchor: false, score: 27.9, ret6: 16.2, ret1: 39.6, corr: 0.87, reason: 'correlated', series: { '1W': [100, 103.71, 99.76, 92.71, 88.99], '1M': [100, 103.84, 104.74, 98.1, 95.87, 100.11, 95.41, 99.63, 103.19, 95.97, 85.85, 87.59, 81.85, 84.97, 89.09, 87.62, 82.57, 85.63, 82.37, 76.55, 73.47], 'YTD': [100, 103.88, 109.18, 108.69, 114.69, 116.25, 118.71, 121.57, 116.58, 113.73, 115.64, 112.3, 121.66, 132.7, 144.11, 140.88, 159.07, 161.66, 159.18, 170.57, 162.79, 177.81, 165.58, 165.73, 151.31, 126.89], '6M': [100, 103.29, 105.41, 106.84, 109.1, 114.95, 110.21, 107.38, 109.24, 111.57, 103.72, 118.54, 122.28, 132.44, 129.47, 146.19, 147.07, 141.9, 156.36, 163.2, 143.51, 158.72, 158.89, 136.26, 139.06, 116.62] } },
    { t: 'FDTX', chosen: false, anchor: false, score: 24, ret6: 22.1, ret1: 25.9, corr: 0.91, reason: 'correlated', series: { '1W': [100, 101.79, 99.53, 95.85, 93.79], '1M': [100, 103.2, 103.58, 98.66, 98, 100, 97.32, 100.9, 103.13, 100.18, 95.96, 97.9, 94.91, 95.57, 98, 97.58, 94.67, 96.37, 94.23, 90.75, 88.8], 'YTD': [100, 101.9, 100.24, 101.79, 96.05, 96.36, 95.3, 95.95, 95.53, 93.45, 92.15, 87.82, 93.86, 102.27, 111.26, 110.64, 119.54, 123.89, 123.96, 137.82, 134.08, 141.26, 135.04, 138.05, 134.46, 122.36], '6M': [100, 105.39, 98.16, 98.48, 97.4, 99.03, 97.68, 97.62, 98.15, 94.89, 92.62, 99.5, 106.37, 113.71, 113.08, 122.17, 125.85, 123.91, 133.76, 145.52, 130.07, 140.83, 140.83, 135.14, 137.42, 125.05] } },
    { t: 'FWD', chosen: false, anchor: false, score: 23.8, ret6: 10.3, ret1: 37.3, corr: 0.93, reason: 'correlated', series: { '1W': [100, 101.66, 100.4, 96.95, 94.08], '1M': [100, 103.31, 104.45, 99.35, 99.06, 101.64, 98.8, 101.25, 103.94, 100.29, 96.53, 98.35, 94.7, 95.06, 97.27, 96.95, 93.59, 95.14, 93.96, 90.74, 88.05], 'YTD': [100, 105.07, 108.98, 108.75, 108.2, 108.72, 110.41, 112.59, 107.68, 104.78, 103.47, 101.35, 107.13, 117.13, 120.08, 118.97, 128.45, 130.95, 129.85, 137.55, 131.68, 139.01, 135.2, 136.87, 132.32, 120.17], '6M': [100, 103.76, 101.11, 101.59, 103.18, 106.36, 103.05, 101.09, 100.45, 99.28, 97.16, 105.24, 108.84, 112.22, 111.18, 120.03, 122.18, 119.67, 126.66, 130.93, 118.51, 127.54, 129.62, 123.11, 123.66, 112.3] } },
    { t: 'SPMO', chosen: false, anchor: false, score: 21.6, ret6: 18.4, ret1: 24.9, corr: 0.83, reason: 'correlated', series: { '1W': [100, 102.09, 100.18, 97.03, 94.87], '1M': [100, 102.84, 103.97, 99.26, 98.91, 102.67, 99.17, 101.96, 103.89, 99.89, 97, 98.39, 96.1, 96.84, 98.45, 98.88, 96.3, 98.31, 96.47, 93.43, 91.36], 'YTD': [100, 99.75, 100.57, 99.59, 100.17, 101.22, 100.01, 100.54, 100.28, 97.37, 95.36, 92.45, 97.76, 106.14, 108.2, 109.6, 118.66, 123.63, 121.26, 127.66, 123.94, 132.28, 128.89, 130.17, 128.86, 119.05], '6M': [100, 102.25, 102.17, 103.25, 102.01, 103, 102.8, 101.8, 100.32, 98.17, 95.84, 103.74, 108.21, 110.37, 111.79, 121.04, 125.06, 122.51, 128.34, 132.58, 122.82, 132.92, 136.47, 128.94, 131.43, 121.43] } },
    { t: 'CBSE', chosen: false, anchor: false, score: 20.6, ret6: 12.1, ret1: 29.2, corr: 0.7, reason: 'diverse', series: { '1W': [100, 98.91, 100.05, 99.59, 98.18], '1M': [100, 100.34, 104.35, 104.78, 101.22, 101.41, 102.88, 102.94, 103.94, 105.55, 102.75, 101.53, 101.96, 99.42, 98.95, 101.02, 100.37, 99.27, 100.42, 99.96, 98.54], 'YTD': [100, 105.79, 110.62, 108.72, 106.51, 108.84, 109.38, 110.39, 105.94, 102.49, 102.51, 101.53, 102.31, 113.36, 115.04, 112.88, 123.93, 126.26, 122.56, 127.49, 121.77, 128.91, 127.35, 132.79, 127.09, 123.97], '6M': [100, 98.28, 96.29, 99.18, 97.24, 100.4, 96.05, 94.72, 93.52, 94.62, 88.97, 93.15, 102.48, 104, 102.04, 109.82, 113.04, 109.67, 114.17, 120.61, 111, 113.73, 115.34, 116.86, 114.89, 112.07] } },
    { t: 'FRWD', chosen: false, anchor: false, score: 18.4, ret6: 18.2, ret1: 18.7, corr: -0.13, reason: 'diverse', series: { '1W': [100, 101.8, 100.3, 96.48, 93.67], '1M': [100, 103.12, 102.35, 97.28, 96.96, 98.42, 95.94, 98.58, 100.96, 97.75, 94.75, 97.12, 94.31, 95.39, 97.15, 97.48, 94.49, 96.2, 94.77, 91.16, 88.51], 'YTD': [100, 100.4, 106.5, 95.49, 98.31, 97.68, 97.41, 94.03, 94.04, 93.4, 88.9, 94.33, 103.2, 108.33, 112.92, 114.35, 123.47, 118.96, 127.94, 135.15, 122.39, 134.17, 132.04, 127.12, 130.79, 118.75], '6M': [100, 105.76, 101.81, 99.27, 99.25, 100.31, 97.88, 97.61, 98.99, 95.54, 92.46, 101.01, 108.49, 112.31, 112.82, 123.01, 124.12, 122.71, 131.69, 137.04, 124.11, 136.05, 133.9, 128.9, 132.63, 120.42] } },
    { t: 'CNEQ', chosen: false, anchor: false, score: 17.6, ret6: 9, ret1: 26.2, corr: 0.82, reason: 'correlated', series: { '1W': [100, 100.58, 100.96, 98.17, 96.27], '1M': [100, 102.35, 100.34, 97.92, 97.6, 96.82, 96.75, 99.24, 100.98, 99.14, 97.11, 98.77, 96.55, 97.26, 99.51, 99.27, 96.89, 97.46, 97.82, 95.12, 93.28], 'YTD': [100, 101.16, 101.69, 100.41, 97.88, 98.2, 97.21, 97.38, 95.84, 93.37, 91.16, 87.81, 92.87, 103.03, 106.37, 105.47, 111.14, 115.76, 116.11, 120.71, 114.34, 119.46, 116.03, 117.86, 118, 110.89], '6M': [100, 102.97, 99, 99.32, 98.32, 100.06, 96.76, 96.97, 96.47, 93.2, 91.56, 97.18, 105.88, 107.59, 106.68, 112.42, 114.86, 116.8, 121.77, 121.09, 111.74, 120.24, 116.42, 116.77, 119.36, 112.16] } },
    { t: 'FCUS', chosen: false, anchor: false, score: 13.8, ret6: -3.3, ret1: 31, corr: 0.78, reason: 'diverse', series: { '1W': [100, 103.26, 99.65, 93.51, 90.76], '1M': [100, 102.58, 104.69, 100.74, 98.54, 101.1, 96.32, 98.26, 100.53, 96.64, 88.92, 91.19, 86.55, 88.32, 90.8, 89.56, 86.39, 89.2, 86.09, 80.78, 78.41], 'YTD': [100, 108.28, 115.26, 117.36, 120.72, 119.52, 123.02, 125.51, 114.59, 112.6, 113.92, 112.95, 118.82, 124.27, 127.42, 127.57, 139.39, 142.99, 140.38, 144.1, 140.25, 145.32, 140.06, 137.35, 127.29, 111.44], '6M': [100, 102.82, 103.6, 102.57, 105.58, 108.9, 102.51, 99.91, 102.37, 101.45, 98.32, 103.39, 105.67, 109.35, 109.48, 119.62, 122.82, 117.52, 122.63, 128.78, 115.77, 121.97, 123.31, 108.46, 109.24, 95.64] } },
    { t: 'BCTK', chosen: false, anchor: false, score: 13.3, ret6: 11.4, ret1: 15.2, corr: 0.41, reason: 'diverse', series: { '1W': [100, 101.72, 100.63, 97.49, 94.74], '1M': [100, 102.53, 101.34, 97.26, 97.28, 98.14, 96.96, 100.99, 104.14, 100.84, 97.94, 100.13, 97.1, 97.74, 99.88, 99.15, 96.22, 97.87, 96.83, 93.81, 91.15], 'YTD': [100, 100.78, 101.56, 100.7, 96.46, 98.04, 97.49, 98.97, 99.36, 96, 94.94, 90.57, 94.66, 102.89, 108.95, 106.73, 114.36, 118.85, 117.76, 126.18, 120.24, 127.72, 120.79, 125.21, 123.11, 113.18], '6M': [100, 103.83, 97.86, 99.46, 98.91, 101.95, 100.46, 100.83, 99.96, 98.05, 94.22, 99.68, 106.22, 110.53, 108.28, 116.02, 118.42, 117.37, 123.64, 129.3, 117.05, 125.97, 123.62, 123.38, 124.9, 114.82] } },
    { t: 'XMMO', chosen: false, anchor: false, score: 13.2, ret6: 8.1, ret1: 18.3, corr: 0.8, reason: 'diverse', series: { '1W': [100, 101.32, 101.26, 99.52, 97.52], '1M': [100, 101.25, 102.42, 99.94, 99.56, 100.83, 98.44, 98.65, 100.25, 97.81, 96.13, 97.11, 94.43, 94.46, 95.73, 95.17, 93.5, 94.74, 94.68, 93.05, 91.18], 'YTD': [100, 101.24, 103.39, 102.17, 103.06, 105.75, 106.49, 108.85, 106.33, 103.17, 102.5, 103.47, 106.85, 114.15, 114.01, 111.77, 121.77, 122.04, 118.01, 120.15, 119.44, 123.72, 122.03, 119.89, 116.65, 111.76], '6M': [100, 100.91, 100.98, 103.62, 104.35, 106.09, 105.37, 103.47, 102.85, 104.51, 102.63, 108.82, 110.97, 111.71, 109.51, 119.31, 118.89, 115, 119.46, 121.02, 114.05, 120.1, 121.1, 115.45, 114.29, 109.5] } },
    { t: 'WCLD', chosen: false, anchor: false, score: 2.9, ret6: 8.5, ret1: -2.7, corr: 0.28, reason: 'diverse', series: { '1W': [100, 101.14, 100.29, 100.78, 100.64], '1M': [100, 99.76, 97.7, 98.89, 99.56, 97.84, 103.68, 106.52, 108.22, 112.05, 113.17, 115.19, 116.27, 113.98, 116.54, 114.31, 116.78, 118.11, 117.12, 117.69, 117.52], 'YTD': [100, 99.63, 91.6, 94.32, 80.41, 81.69, 79.89, 79.52, 84.26, 80.78, 79.86, 74.84, 78.65, 71.78, 80.52, 78.09, 82.42, 79.72, 84.52, 102.68, 90.9, 88.12, 84.23, 94.8, 96.72, 99.43], '6M': [100, 103.47, 89.74, 91.17, 89.16, 85.37, 90.79, 91.76, 91.2, 86.39, 87.09, 85.69, 84.79, 89.86, 87.15, 91.98, 87.63, 95.76, 97.29, 105.45, 98.21, 94.42, 92.38, 106.85, 107.94, 110.97] } },
    { t: 'MARS', chosen: false, anchor: false, score: -2.6, ret6: -2.6, ret1: -2.6, corr: 0.13, reason: 'diverse', series: { '1W': [100, 100.67, 98.43, 92.95, 90.48], '1M': [100, 97.68, 91.7, 89.68, 85.42, 82.59, 83.75, 92.29, 96.13, 93.1, 93.31, 92.5, 86.28, 85.45, 84.92, 83.07, 79.38, 79.92, 78.13, 73.79, 71.82], 'YTD': [100, 101.98, 102.95, 103.47, 105.45, 103.27, 116.71, 123.69, 132.89, 133.29, 119.94, 123.16, 123, 145.04, 151.69, 166.42, 173.45, 153.15, 133.37, 138.01, 124.37, 112.03, 126.27, 115.9, 107.67, 97.42], '6M': [100, 101.98, 102.95, 103.47, 105.45, 103.27, 116.71, 123.69, 132.89, 133.29, 119.94, 123.16, 123, 145.04, 151.69, 166.42, 173.45, 153.15, 133.37, 138.01, 124.37, 112.03, 126.27, 115.9, 107.67, 97.42] } },
    { t: 'ARKK', chosen: false, anchor: false, score: -5.2, ret6: -8.5, ret1: -1.9, corr: 0.74, reason: 'diverse', series: { '1W': [100, 101.64, 101.74, 97.99, 95.55], '1M': [100, 102.17, 99.92, 97.69, 97.74, 97.52, 99.54, 102.73, 102.97, 104.28, 103.52, 106.52, 103.44, 102.13, 103.87, 102.24, 99.68, 101.31, 101.41, 97.68, 95.25], 'YTD': [100, 104.72, 106.19, 103.9, 95.48, 93.94, 92.81, 97, 96.19, 91.33, 89.9, 84.02, 89.39, 97.28, 103.09, 95.59, 103.46, 101.4, 99.61, 105.64, 98.65, 103.52, 99.74, 106.41, 104.32, 97.19], '6M': [100, 100.68, 92.69, 91.2, 90.1, 92.82, 94.57, 92, 92.21, 87.09, 85.31, 88.8, 97.78, 100.09, 92.81, 100.44, 98.51, 95.72, 102.25, 98.65, 92.15, 99.07, 96.6, 102.55, 101.28, 94.36] } },
    { t: 'IGV', chosen: false, anchor: false, score: -10.6, ret6: -5.1, ret1: -16.2, corr: 0.46, reason: 'diverse', series: { '1W': [100, 101, 101.34, 101.08, 100.6], '1M': [100, 99.92, 97.93, 97.94, 96.65, 95.07, 98.92, 100.82, 101.62, 104.69, 104.95, 106.31, 105.57, 103.72, 105.29, 103.65, 103.97, 105.01, 105.36, 105.09, 104.6], 'YTD': [100, 98.82, 93.02, 93.49, 80.79, 80.81, 77.59, 78.15, 82.9, 79.66, 78.52, 72.75, 76.17, 75.2, 83.96, 79.95, 83.09, 85.76, 87.5, 101.9, 90.5, 87.69, 81.53, 88.31, 87.43, 88.24], '6M': [100, 101.91, 89.01, 89.03, 85.48, 84.28, 89.28, 89.28, 89.16, 84.25, 83.45, 83.13, 86.5, 92.5, 88.09, 91.55, 92.36, 97.28, 99.74, 104.45, 95.47, 92.94, 88.36, 97.54, 96.33, 97.22] } },
  ],
  'Electrification': [
    { t: 'VOLT', chosen: true, anchor: true, score: 29.6, ret6: 18.3, ret1: 40.9, corr: 0.64, reason: 'anchor', series: { '1W': [100, 101.7, 100.92, 98.67, 97.44], '1M': [100, 102.06, 104.32, 100.67, 101.39, 103.67, 100.07, 101.14, 103.92, 100.17, 97.17, 98.31, 95.41, 95.14, 96.28, 96.48, 94.79, 96.4, 95.66, 93.53, 92.36], 'YTD': [100, 101.4, 108.84, 109.01, 114.4, 118.79, 120.64, 123.8, 117.86, 117.17, 116.13, 117.48, 121.59, 131.75, 133.14, 134.45, 143.13, 141.26, 135.07, 133.1, 133.31, 139.12, 141.3, 139.6, 134.45, 128.71], '6M': [100, 103.16, 105.98, 110.05, 111.76, 115.56, 111.3, 109.85, 110.72, 112.32, 109.66, 117.57, 120.42, 123.34, 124.56, 132.59, 129.65, 123.85, 126.06, 127.13, 119.88, 129.1, 133.84, 125.45, 124.56, 119.24] } },
    { t: 'POW', chosen: true, anchor: false, score: 26.3, ret6: 21.9, ret1: 30.7, corr: 0.13, reason: 'diversifier', series: { '1W': [100, 101.9, 101.39, 97.66, 96.91], '1M': [100, 101.23, 102.97, 98.22, 97.96, 98.67, 95.21, 98.18, 100.32, 96.79, 93.62, 94.01, 89.51, 89.54, 90.64, 91.77, 88.47, 90.16, 89.7, 86.4, 85.74], 'YTD': [100, 102.18, 110.41, 112.09, 117.22, 121.09, 122.86, 130.9, 121.29, 121.4, 122.1, 122.25, 126.09, 140, 145.81, 152.45, 168.97, 162.87, 156.97, 159.21, 149.54, 158.86, 153.82, 151.99, 144.11, 134.63], '6M': [100, 105.06, 106.96, 110.48, 112.11, 119.76, 113.45, 111.96, 115.12, 115.63, 112.44, 121.52, 125.77, 133.04, 139.1, 154.17, 149.68, 138.78, 146.57, 145.22, 132.88, 143.28, 141.37, 134.14, 131.49, 122.84] } },
    { t: 'PBD', chosen: true, anchor: false, score: 17.9, ret6: 2.6, ret1: 33.2, corr: 0.64, reason: 'diversifier', series: { '1W': [100, 101.43, 102.3, 99.84, 98.08], '1M': [100, 101.05, 101.74, 97.31, 95.97, 95.62, 93.88, 95.67, 97.56, 96.12, 94.77, 97.06, 93.03, 92.23, 92.68, 92.73, 90.79, 92.09, 92.88, 90.64, 89.05], 'YTD': [100, 103.61, 108.46, 112.25, 111.13, 112.69, 114.05, 115.67, 107.71, 108.71, 108.4, 108.77, 111.26, 121.33, 125.31, 126.68, 135.32, 135.26, 132.65, 139.05, 127.43, 127.92, 119.9, 120.09, 115.86, 111.26], '6M': [100, 105.73, 103.47, 104.92, 106.2, 108.98, 102.78, 101.51, 104.92, 102.32, 103.82, 107.76, 112.97, 116.68, 117.95, 126, 126, 119.92, 129.94, 128.84, 113.43, 116.33, 111.23, 110.25, 107.87, 103.59] } },
    { t: 'PBW', chosen: false, anchor: false, score: 15.7, ret6: -7.3, ret1: 38.6, corr: 0.9, reason: 'correlated', series: { '1W': [100, 102.88, 102.71, 98.32, 96.32], '1M': [100, 103.9, 103.1, 97.35, 94.5, 93.72, 92.17, 95.3, 97.57, 95.35, 91.5, 93.85, 88.29, 87.87, 89.24, 88.09, 85.04, 87.49, 87.34, 83.62, 81.92], 'YTD': [100, 108.81, 115.62, 114.51, 113.72, 112.77, 109.82, 110.84, 103.47, 105.47, 101.05, 101.8, 102.1, 112.57, 123.12, 119.61, 131.24, 137.13, 136.08, 148.46, 134.02, 133.73, 123.71, 124.82, 115.32, 107.24], '6M': [100, 103.44, 100.35, 99.51, 96.91, 98.99, 93.76, 94.05, 94.63, 93.12, 91.25, 93.96, 100.95, 108.64, 105.55, 115.8, 121.41, 114.27, 132.56, 131.03, 108.78, 115.52, 108.26, 105.69, 101.76, 94.63] } },
    { t: 'IVEP', chosen: false, anchor: false, score: -1.6, ret6: -1.6, ret1: -1.6, corr: 0.17, reason: 'diverse', series: { '1W': [100, 98.4, 99.63, 98.44, 95.68], '1M': [100, 100.29, 103.52, 104.99, 100.68, 100.83, 101.58, 98.38, 98.99, 100.36, 96.95, 95.87, 97.63, 95.23, 94.97, 96.12, 96.37, 94.83, 96.02, 94.87, 92.21], 'YTD': [100, 102.76, 103.75, 105.59, 107.78, 105.63, 109.85, 110.61, 107.85, 109.69, 107.01, 106.4, 110.34, 108.12, 109.31, 104.37, 99.85, 104.6, 107.05, 107.47, 108.43, 107.13, 104.21, 102.61, 101.23, 98.43], '6M': [100, 102.76, 103.75, 105.59, 107.78, 105.63, 109.85, 110.61, 107.85, 109.69, 107.01, 106.4, 110.34, 108.12, 109.31, 104.37, 99.85, 104.6, 107.05, 107.47, 108.43, 107.13, 104.21, 102.61, 101.23, 98.43] } },
  ],
  'Industrials': [
    { t: 'AIRR', chosen: true, anchor: true, score: 23, ret6: 5.5, ret1: 40.5, corr: 0.53, reason: 'anchor', series: { '1W': [100, 101.53, 101.47, 100.67, 98.63], '1M': [100, 101.28, 103.09, 100.21, 100.95, 102.84, 100.34, 101.8, 103.09, 100.09, 97.42, 98.24, 95.06, 94.82, 96.21, 95.64, 93.97, 95.4, 95.34, 94.59, 92.68], 'YTD': [100, 107.26, 115.48, 114.29, 117.4, 121.22, 120.89, 121.89, 115.42, 110.41, 109.54, 111.65, 115.37, 124.89, 126.07, 123.66, 134.19, 133.34, 126.77, 129.67, 130.33, 132.6, 132.71, 131.57, 125.73, 121.84], '6M': [100, 101.42, 103.34, 106.7, 106.41, 106.53, 105.6, 100.5, 99.72, 100.5, 99.18, 106.68, 108.55, 110.97, 108.85, 118.12, 115.92, 112.21, 116.82, 115.92, 109.91, 115.71, 119, 112.72, 110.67, 107.24] } },
    { t: 'PRN', chosen: false, anchor: false, score: 19.6, ret6: 7.8, ret1: 31.5, corr: 0.93, reason: 'correlated', series: { '1W': [100, 102.04, 101.55, 98.41, 95], '1M': [100, 101.87, 104.78, 101.05, 100.63, 102.84, 99.49, 101.92, 104.01, 99.77, 93.82, 94.9, 90.8, 90.61, 92.52, 91.91, 89.54, 91.36, 90.93, 88.11, 85.06], 'YTD': [100, 104.08, 113.24, 111.67, 113.68, 117.01, 118.67, 122.32, 113.7, 109.14, 110.39, 110.73, 114.96, 126.41, 128.3, 125.87, 142.47, 141.91, 133.88, 137.71, 135.42, 143.2, 144.48, 143.24, 131.96, 122.12], '6M': [100, 101.76, 102.07, 105.06, 106.54, 109.66, 105.99, 102.15, 101.46, 103.77, 100.04, 109.33, 112.03, 115.19, 113.01, 127.91, 126.29, 119.94, 127.5, 127.31, 117.08, 128.9, 132.57, 120.93, 118.47, 109.64] } },
    { t: 'BILT', chosen: true, anchor: false, score: 11.1, ret6: 8.1, ret1: 14, corr: -0.06, reason: 'diversifier', series: { '1W': [100, 100.4, 100.54, 99.91, 100.47], '1M': [100, 98.4, 98.45, 98.85, 99.28, 99.71, 100.47, 100.98, 100.58, 99.37, 99.4, 101.07, 100.61, 101.32, 100.75, 100.57, 101.02, 101.42, 101.56, 100.93, 101.49], 'YTD': [100, 100.31, 102.35, 103.24, 103.99, 109.04, 111.65, 114.01, 112.55, 111, 108.17, 109.66, 112.2, 113.28, 110.76, 113.04, 113.58, 111.97, 112.77, 112.58, 112.8, 108.68, 108.27, 108.37, 109.68, 110.69], '6M': [100, 100.87, 101.6, 105.5, 110.2, 111.24, 110.78, 109.41, 109.65, 106.38, 107.56, 109.82, 110.68, 108.22, 110.45, 110.91, 110.2, 109.84, 111.25, 109.31, 109.73, 106.55, 106.25, 105.92, 107.16, 108.14] } },
    { t: 'IDEF', chosen: true, anchor: false, score: -3.9, ret6: -14.2, ret1: 6.4, corr: 0.53, reason: 'diversifier', series: { '1W': [100, 100.29, 100.45, 99.04, 98.31], '1M': [100, 98.36, 96.47, 95.89, 94.7, 94.28, 94.25, 95.25, 96.71, 97.6, 100.4, 102.22, 99.88, 98.23, 97.72, 97.29, 95.59, 95.86, 96.01, 94.67, 93.97], 'YTD': [100, 109.87, 116.82, 114.04, 113.93, 113.08, 115.03, 116.14, 114.8, 112.41, 109.68, 104.39, 110.07, 113.44, 110.94, 105.28, 110.13, 106.69, 105.46, 108.28, 103.7, 105.88, 101.01, 104.09, 103.77, 100.23], '6M': [100, 101.21, 99.18, 98.44, 100.14, 100.58, 103.02, 100.93, 100.51, 94.88, 92.45, 98.64, 98.5, 96.58, 91.65, 95.87, 92.93, 91.49, 97.26, 91.18, 88.61, 92.85, 87.54, 93.22, 90.33, 87.25] } },
  ],
  'Meme': [
    { t: 'BUZZ', chosen: true, anchor: true, score: 0.2, ret6: -3.6, ret1: 4, corr: 0.14, reason: 'anchor', series: { '1W': [100, 97.79, 98.23, 97.62, 94], '1M': [100, 99.33, 101.6, 100.21, 97.7, 95.7, 94.25, 95.27, 97.86, 98.8, 98.45, 97.14, 98.61, 95.67, 95.96, 97.41, 96.74, 94.6, 95.03, 94.44, 90.94], 'YTD': [100, 105.57, 108.62, 105.51, 101.23, 97.32, 94.24, 96.34, 97.2, 94.61, 91.32, 85.66, 90.6, 99.11, 103.45, 103.08, 113.73, 114.31, 112.77, 124.78, 113.45, 117.88, 112.47, 113.73, 112.13, 104.68], '6M': [100, 97.14, 93.2, 90.96, 85.78, 86.74, 86.8, 88.86, 88.61, 85.46, 77.13, 83.28, 91.24, 95.24, 94.9, 100.17, 104.45, 100.99, 110.91, 115.25, 104.48, 105.98, 101.42, 104.34, 103.23, 96.37] } },
    { t: 'RKNG', chosen: true, anchor: false, score: -13.8, ret6: -13.8, ret1: -13.8, corr: 0.08, reason: 'diversifier', series: { '1W': [100, 95.09, 97.4, 94.81, 87.43], '1M': [100, 100.85, 105.38, 105.77, 100.37, 97.04, 97.96, 95.03, 98.61, 101.19, 96.05, 89.36, 91.64, 86.51, 88.05, 91.2, 89.08, 84.71, 86.77, 84.46, 77.89], 'YTD': [100, 95.76, 77.78, 83.66, 82.9, 82.25, 77.98, 77.44, 78.34, 78.89, 73.19, 80.89, 90.93, 96.54, 92.38, 107.09, 106.39, 100.51, 114.64, 116.17, 100.35, 111.6, 108.41, 106.29, 100.93, 86.2], '6M': [100, 95.76, 77.78, 83.66, 82.9, 82.25, 77.98, 77.44, 78.34, 78.89, 73.19, 80.89, 90.93, 96.54, 92.38, 107.09, 106.39, 100.51, 114.64, 116.17, 100.35, 111.6, 108.41, 106.29, 100.93, 86.2] } },
    { t: 'MEME', chosen: true, anchor: false, score: -23.1, ret6: -16.1, ret1: -30.1, corr: 0.14, reason: 'diversifier', series: { '1W': [100, 93.98, 95.3, 91.33, 82.65], '1M': [100, 101.74, 105.62, 106.23, 99.59, 94.89, 93.87, 89.79, 95.81, 98.37, 92.65, 85.7, 87.03, 80.9, 82.74, 85.9, 84.78, 79.67, 80.8, 77.43, 70.07], 'YTD': [100, 119.03, 131.94, 120.81, 113.87, 113.39, 110.65, 111.77, 105.65, 105.65, 108.23, 100.48, 103.63, 133.71, 143.55, 125.97, 156.77, 166.45, 154.03, 183.87, 158.71, 168.23, 157.26, 155.32, 135.65, 110.65], '6M': [100, 91.56, 86.31, 89, 81.3, 84.6, 79.34, 79.1, 84.23, 83.62, 70.29, 80.2, 101.34, 108.8, 95.48, 113.94, 121.39, 111.61, 141.08, 143.28, 116.87, 119.68, 113.57, 110.88, 102.81, 83.86] } },
  ],
};
// @@END_GENERATED:THEME_UNIVERSE@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 9, avgWeight: 7.15, proScore: 6.43, coverage: 0.9,
      price: 202.11, weeklyPrices: [203.53, 211.80, 212.50, 207.40, 202.11], weeklyChange: -0.7, dayChange: -2.55, sortRank: 0, periodReturns: { '1M': -1.2, 'YTD': 8.4, '6M': 8.5, '1Y': 16.8 },
      priceHistory: { '1D': [207.4, 202.69, 202.11], '1W': [203.53, 211.8, 212.5, 207.4, 202.11], '1M': [204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83, 195.55, 196.93, 204.12, 202.78, 210.96, 203.53, 211.8, 212.5, 207.4, 202.11], 'YTD': [186.5, 185.04, 186.23, 186.47, 180.34, 188.54, 187.98, 184.89, 183.34, 180.25, 172.7, 167.52, 178.1, 196.51, 202.5, 209.25, 207.83, 235.74, 219.51, 224.36, 208.64, 212.45, 199, 197.58, 210.96, 202.11], '6M': [178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 223.47, 214.25, 214.75, 200.42, 204.65, 195.74, 194.83, 210.96, 202.11], '1Y': [173, 173.74, 177.87, 180.77, 182.02, 174.98, 180.17, 171.66, 177.17, 176.24, 177.69, 188.89, 192.57, 181.81, 182.16, 202.89, 188.08, 186.86, 180.64, 177, 183.38, 180.93, 174.14, 190.53, 188.12, 184.94, 178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 180.05, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 223.47, 214.25, 214.75, 200.42, 204.65, 195.74, 194.83, 210.96, 202.11] },
      velocityScore: { '1D': 0.6, '1W': 5.9, '1M': 6.6, '6M': null }, isNew: false,
      marketCap: '$4.9T', pe: 31, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.48,
      etfPresence: { AIS: 2.92, ARTY: 5.16, BAI: 4.9, IGPT: 8.63, IVES: 5.06, ALAI: 13.5, CHAT: 7.43, AIFD: 6.59, SPRX: false, AOTG: 10.13 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 9, avgWeight: 5.72, proScore: 5.15, coverage: 0.9,
      price: 481.14, weeklyPrices: [534.39, 548.13, 529.14, 500.94, 481.14], weeklyChange: -9.96, dayChange: -3.95, sortRank: 0, periodReturns: { '1M': -6.1, 'YTD': 124.7, '6M': 107.5, '1Y': 199.9 },
      priceHistory: { '1D': [500.94, 479.85, 481.14], '1W': [534.39, 548.13, 529.14, 500.94, 481.14], '1M': [512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 516.11, 517.41, 546.72, 557.89, 534.39, 548.13, 529.14, 500.94, 481.14], 'YTD': [214.16, 204.68, 231.83, 251.31, 242.11, 213.57, 200.12, 203.68, 199.45, 193.39, 201.33, 201.99, 221.53, 255.07, 303.46, 337.11, 421.39, 449.7, 449.59, 510.13, 490.33, 547.26, 519.74, 540.88, 557.89, 481.14], '6M': [231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 518.09, 542.52, 452.4, 512.48, 532.57, 517.82, 557.89, 481.14], '1Y': [160.41, 162.12, 176.31, 172.4, 180.95, 163.71, 168.58, 161.79, 155.67, 157.92, 161.27, 169.73, 232.89, 234.56, 234.99, 254.84, 237.7, 247.96, 206.02, 217.53, 215.98, 221.43, 201.06, 214.99, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 190.95, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 518.09, 542.52, 452.4, 512.48, 532.57, 517.82, 557.89, 481.14] },
      velocityScore: { '1D': -0.4, '1W': 1.2, '1M': 4, '6M': null }, isNew: false,
      marketCap: '$785B', pe: 159.8, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 5.33, ARTY: 5.15, BAI: 5.24, IGPT: 8.74, IVES: 4.57, ALAI: 1.31, CHAT: 4.06, AIFD: false, SPRX: 0.65, AOTG: 16.43 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 5.45, proScore: 4.9, coverage: 0.9,
      price: 828.9, weeklyPrices: [937.00, 983.12, 904.28, 853.20, 828.90], weeklyChange: -11.54, dayChange: -2.85, sortRank: 0, periodReturns: { '1M': -20.5, 'YTD': 190.4, '6M': 128.5, '1Y': 631.9 },
      priceHistory: { '1D': [853.2, 825.41, 828.9], '1W': [937, 983.12, 904.28, 853.2, 828.9], '1M': [1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 938.38, 948.8, 991.64, 979.3, 937, 983.12, 904.28, 853.2, 828.9], 'YTD': [285.41, 327.02, 362.75, 389.09, 419.44, 373.25, 420.95, 415.56, 397.05, 426.13, 422.9, 357.22, 377.58, 465.66, 487.48, 518.46, 666.59, 776.01, 762.1, 1035.5, 949.28, 1087.99, 1048.51, 1032.28, 979.3, 828.9], '6M': [365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 923.52, 1079.57, 891.88, 1043.19, 1213.56, 975.56, 979.3, 828.9], '1Y': [113.26, 111.73, 109.14, 111.87, 125.29, 115.79, 122, 124.21, 150.57, 168.89, 156.83, 183.75, 192.33, 202.53, 206.71, 224.01, 238.33, 236.95, 201.37, 236.48, 226.65, 258.46, 248.55, 284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 420.95, 429, 379.68, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 923.52, 1079.57, 891.88, 1043.19, 1213.56, 975.56, 979.3, 828.9] },
      velocityScore: { '1D': -0.4, '1W': -3.7, '1M': -21.6, '6M': null }, isNew: false,
      marketCap: '$936B', pe: 18.7, revenueGrowth: 346, eps: 44.28, grossMargin: 73, dividendYield: 0.06,
      etfPresence: { AIS: 6.54, ARTY: 4.54, BAI: 5.89, IGPT: 7.3, IVES: 4.1, ALAI: 0.97, CHAT: 3.56, AIFD: 6.3, SPRX: false, AOTG: 9.81 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 8, avgWeight: 3.85, proScore: 3.08, coverage: 0.8,
      price: 367.4, weeklyPrices: [384.05, 389.11, 394.28, 374.45, 367.40], weeklyChange: -4.34, dayChange: -1.88, sortRank: 0, periodReturns: { '1M': -6.5, 'YTD': 6.2, '6M': 4.5, '1Y': 28.3 },
      priceHistory: { '1D': [374.45, 366.83, 367.4], '1W': [384.05, 389.11, 394.28, 374.45, 367.4], '1M': [392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45, 373.9, 370.78, 388.69, 401.11, 399.97, 384.05, 389.11, 394.28, 374.45, 367.4], 'YTD': [346.1, 332.48, 351.71, 324.85, 320.33, 340.44, 333.51, 321.7, 332.77, 322.16, 310.51, 300.68, 333.97, 380.78, 422.65, 405.45, 425.44, 439.79, 414.57, 459.97, 396.6, 393.94, 382.07, 369.34, 399.97, 367.4], '6M': [332.6, 332.79, 320.33, 340.44, 333.51, 332.31, 317.53, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 417.76, 426.58, 479.23, 372.1, 392.9, 378.91, 360.45, 399.97, 367.4], '1Y': [286.45, 288.71, 293.7, 303.76, 311.23, 289.6, 308.65, 306.1, 359.63, 345.35, 336.1, 338.18, 345.02, 354.15, 344.29, 376.47, 355.59, 339.98, 346.82, 402.96, 381.03, 406.37, 329.88, 352.13, 343.42, 352.21, 332.6, 332.79, 320.33, 340.44, 333.51, 332.31, 313.84, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 417.76, 426.58, 479.23, 372.1, 392.9, 378.91, 360.45, 399.97, 367.4] },
      velocityScore: { '1D': -1.3, '1W': 2.3, '1M': 15.8, '6M': null }, isNew: false,
      marketCap: '$1.7T', pe: 60.9, revenueGrowth: 48, eps: 6.03, grossMargin: 76, dividendYield: 0.69,
      etfPresence: { AIS: 0.75, ARTY: 4.8, BAI: 4.72, IGPT: false, IVES: 4.7, ALAI: 4.05, CHAT: 4.76, AIFD: 5.53, SPRX: false, AOTG: 1.51 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'ANET', name: 'Arista Networks Inc', easyScore: 7, avgWeight: 2.38, proScore: 1.66, coverage: 0.7,
      price: 161.79, weeklyPrices: [181.15, 182.57, 171.92, 168.56, 161.79], weeklyChange: -10.69, dayChange: -4.02, sortRank: 0, periodReturns: { '1M': -1.9, 'YTD': 23.5, '6M': 24.6, '1Y': 44.5 },
      priceHistory: { '1D': [168.57, 162.34, 161.79], '1W': [181.15, 182.57, 171.92, 168.56, 161.79], '1M': [164.93, 169.67, 174.56, 162.2, 161.74, 165.45, 157.6, 164.1, 169.88, 166.62, 159.99, 173.28, 166.46, 181.05, 184.69, 186.96, 181.15, 182.57, 171.92, 168.56, 161.79], 'YTD': [131.03, 123.72, 129.83, 143.72, 139.39, 143.45, 139.54, 130.25, 139.4, 133.57, 131.22, 120.77, 133.64, 154.37, 177.73, 168.68, 147.06, 147.81, 148.59, 170.68, 156.4, 169.09, 161.74, 166.62, 186.96, 161.79], '6M': [127.52, 146.69, 139.39, 143.45, 139.54, 132.89, 134.83, 139.62, 133.07, 130.8, 122.78, 145.07, 154.33, 177.73, 168.68, 147.06, 140.69, 140.49, 155.27, 174.37, 151.76, 164.93, 165.45, 159.99, 186.96, 161.79], '1Y': [111.98, 114.04, 123.22, 139.28, 136.48, 132.03, 136.23, 141.17, 153.04, 146.66, 143.06, 144.46, 158.23, 146.01, 152.76, 158.44, 134.02, 130.3, 119.59, 130.68, 128.55, 134.39, 124.62, 131.84, 137.19, 123.42, 127.52, 146.69, 139.39, 143.45, 139.54, 132.89, 124.6, 139.62, 133.07, 130.8, 122.78, 145.07, 154.33, 177.73, 168.68, 147.06, 140.69, 140.49, 155.27, 174.37, 151.76, 164.93, 165.45, 159.99, 186.96, 161.79] },
      velocityScore: { '1D': 3.7, '1W': 15.3, '1M': 14.5, '6M': null }, isNew: false,
      marketCap: '$204B', pe: 56.8, revenueGrowth: 35, eps: 2.85, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: 1.71, ARTY: 2.75, BAI: 1.54, IGPT: false, IVES: false, ALAI: 0.36, CHAT: 2.45, AIFD: 5.63, SPRX: 2.2, AOTG: false },
      tonyNote: 'Arista Networks Inc appears in 7 of 10 AI & ML ETFs (70% coverage) with average weight 2.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 5.22, proScore: 3.13, coverage: 0.6,
      price: 347.65, weeklyPrices: [352.51, 359.51, 370.92, 354.46, 347.65], weeklyChange: -1.38, dayChange: -1.92, sortRank: 0, periodReturns: { '1M': -4.4, 'YTD': 11.1, '6M': 5.3, '1Y': 89.4 },
      priceHistory: { '1D': [354.46, 347.83, 347.65], '1W': [352.51, 359.51, 370.92, 354.46, 347.65], '1M': [363.79, 368.03, 349.68, 346.13, 345.29, 343.71, 337.39, 353.65, 357.37, 361.21, 359.91, 366.46, 367.03, 361.92, 358.89, 357.18, 352.51, 359.51, 370.92, 354.46, 347.65], 'YTD': [313, 325.44, 330, 333.26, 339.71, 318.58, 303.33, 307.38, 300.88, 302.28, 301, 274.34, 305.46, 332.91, 339.32, 349.94, 398.04, 401.07, 387.66, 376.37, 363.31, 369.35, 345.29, 361.21, 357.18, 347.65], '6M': [322, 334.55, 339.71, 318.58, 303.33, 312.9, 303.13, 307.04, 310.92, 290.44, 287.56, 317.32, 337.12, 339.32, 349.94, 398.04, 402.62, 388.91, 390.13, 358.99, 356.38, 363.79, 343.71, 359.91, 357.18, 347.65], '1Y': [183.58, 192.17, 191.9, 196.52, 202.94, 199.75, 211.64, 232.3, 240.37, 252.03, 245.79, 245.69, 241.53, 251.46, 253.08, 281.48, 284.75, 278.57, 289.45, 320.18, 317.62, 312.43, 302.46, 313.51, 316.54, 331.86, 322, 334.55, 339.71, 318.58, 303.33, 312.9, 303.58, 307.04, 310.92, 290.44, 287.56, 317.32, 337.12, 339.32, 349.94, 398.04, 402.62, 388.91, 390.13, 358.99, 356.38, 363.79, 343.71, 359.91, 357.18, 347.65] },
      velocityScore: { '1D': -0.9, '1W': 3, '1M': 9.8, '6M': null }, isNew: false,
      marketCap: '$4.2T', pe: 27.8, revenueGrowth: 22, eps: 12.51, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.52, IGPT: 8.44, IVES: 4.75, ALAI: false, CHAT: 5.63, AIFD: 5.07, SPRX: false, AOTG: 3.91 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 6, avgWeight: 4.77, proScore: 2.86, coverage: 0.6,
      price: 390.11, weeklyPrices: [421.58, 420.39, 419.48, 409.74, 390.11], weeklyChange: -7.46, dayChange: -4.86, sortRank: 0, periodReturns: { '1M': -9.7, 'YTD': 28.4, '6M': 13.9, '1Y': 58.8 },
      priceHistory: { '1D': [410.06, 390.5, 390.11], '1W': [421.58, 420.39, 419.48, 409.74, 390.11], '1M': [432.15, 462.12, 467.67, 436.39, 440.83, 434.99, 432.35, 455.1, 477.57, 444.23, 434.16, 451.79, 432.57, 436.98, 436.96, 434.11, 421.58, 420.39, 419.48, 409.74, 390.11], 'YTD': [303.89, 318.01, 342.4, 332.71, 335.75, 361.91, 362.26, 376.81, 353.86, 338.31, 329.24, 326.74, 345.32, 379.89, 387.44, 393.83, 419.5, 417.72, 407.15, 435.63, 426.8, 441.4, 440.83, 444.23, 434.11, 390.11], '6M': [327.16, 338.34, 335.75, 361.91, 362.26, 387.73, 357.44, 347.09, 345.98, 343.25, 337.95, 365.9, 375.1, 387.44, 393.83, 419.5, 399.8, 401.62, 424.86, 436.69, 408.75, 432.15, 434.99, 434.16, 434.11, 390.11], '1Y': [245.6, 241.6, 241.62, 242.62, 241, 227.33, 238.27, 235.21, 258.91, 268.64, 276.66, 288.11, 299.88, 299.84, 290.73, 303.22, 289.24, 282.2, 277.5, 291.51, 292.93, 304.85, 284.68, 302.84, 322.25, 331.77, 327.16, 338.34, 335.75, 361.91, 362.26, 387.73, 353.13, 347.09, 345.98, 343.25, 337.95, 365.9, 375.1, 387.44, 393.83, 419.5, 399.8, 401.62, 424.86, 436.69, 408.75, 432.15, 434.99, 434.16, 434.11, 390.11] },
      velocityScore: { '1D': 1.1, '1W': -1, '1M': 1.8, '6M': null }, isNew: false,
      marketCap: '$2.0T', pe: 29.2, revenueGrowth: 35, eps: 13.36, grossMargin: 62, dividendYield: 0.92,
      etfPresence: { AIS: 3.54, ARTY: false, BAI: 4.68, IGPT: false, IVES: 4.67, ALAI: 5.25, CHAT: false, AIFD: 3.33, SPRX: false, AOTG: 7.13 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 6, avgWeight: 4.76, proScore: 2.86, coverage: 0.6,
      price: 645.72, weeklyPrices: [656.73, 661.04, 681.31, 664.54, 645.72], weeklyChange: -1.68, dayChange: -2.83, sortRank: 0, periodReturns: { '1M': 13.8, 'YTD': -2.2, '6M': 4.1, '1Y': -7.9 },
      priceHistory: { '1D': [664.54, 644.75, 645.72], '1W': [656.73, 661.04, 681.31, 664.54, 645.72], '1M': [567.58, 577.22, 563.85, 562.2, 557.67, 542.87, 550.25, 562.6, 563.29, 612.91, 582.9, 600.29, 615.58, 603.12, 631.48, 669.21, 656.73, 661.04, 681.31, 664.54, 645.72], 'YTD': [660.09, 646.06, 620.25, 672.36, 691.7, 670.72, 643.22, 657.01, 660.57, 613.71, 593.66, 525.72, 575.05, 662.49, 674.72, 669.12, 612.88, 618.43, 607.38, 600.47, 585.39, 593.48, 557.67, 612.91, 669.21, 645.72], '6M': [604.12, 672.97, 691.7, 670.72, 643.22, 653.69, 667.73, 654.07, 622.66, 592.92, 572.13, 612.42, 671.58, 674.72, 669.12, 612.88, 616.63, 605.06, 635.29, 622.98, 570.98, 567.58, 542.87, 582.9, 669.21, 645.72], '1Y': [701.41, 714.8, 773.44, 761.83, 782.13, 739.1, 751.11, 748.65, 750.9, 780.25, 748.91, 727.05, 733.51, 712.07, 734, 666.47, 618.94, 609.89, 589.15, 647.95, 661.53, 652.71, 664.45, 663.29, 658.79, 641.97, 604.12, 672.97, 691.7, 670.72, 643.22, 653.69, 655.08, 654.07, 622.66, 592.92, 572.13, 612.42, 671.58, 674.72, 669.12, 612.88, 616.63, 605.06, 635.29, 622.98, 570.98, 567.58, 542.87, 582.9, 669.21, 645.72] },
      velocityScore: { '1D': 0.7, '1W': 33, '1M': 72.3, '6M': null }, isNew: false,
      marketCap: '$1.6T', pe: 23.5, revenueGrowth: 33, eps: 27.51, grossMargin: 82, dividendYield: 0.32,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: 9.97, IVES: 5.55, ALAI: 4.74, CHAT: 2.48, AIFD: false, SPRX: 4.63, AOTG: 1.2 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 5, avgWeight: 4.11, proScore: 2.05, coverage: 0.5,
      price: 245.63, weeklyPrices: [247.31, 247.49, 254.96, 249.89, 245.63], weeklyChange: -0.68, dayChange: -1.7, sortRank: 0, periodReturns: { '1M': 3.4, 'YTD': 6.4, '6M': 2.7, '1Y': 9.7 },
      priceHistory: { '1D': [249.89, 245.03, 245.63], '1W': [247.31, 247.49, 254.96, 249.89, 245.63], '1M': [237.5, 244.39, 232.79, 234.11, 234.27, 227.01, 232.69, 240.14, 238.34, 241.7, 242.67, 244.16, 245.98, 243.62, 247.04, 245.34, 247.31, 247.49, 254.96, 249.89, 245.63], 'YTD': [230.82, 246.29, 239.12, 238.42, 238.62, 206.96, 204.79, 207.92, 218.94, 207.67, 205.37, 199.34, 213.77, 249.02, 255.36, 263.04, 274.99, 267.22, 268.46, 261.26, 245.22, 246.02, 234.27, 241.7, 245.34, 245.63], '6M': [231, 244.68, 238.62, 206.96, 204.79, 210.64, 216.82, 214.33, 215.2, 207.24, 208.27, 221.25, 248.5, 255.36, 263.04, 274.99, 270.13, 265.01, 274, 250.02, 238, 237.5, 227.01, 242.67, 245.34, 245.63], '1Y': [223.88, 232.23, 234.11, 223.13, 230.98, 221.95, 231.6, 235.68, 229.95, 231.23, 218.15, 222.41, 227.74, 214.47, 221.09, 222.86, 243.04, 237.58, 217.14, 233.22, 229.11, 230.28, 226.76, 232.52, 233.06, 246.47, 231, 244.68, 238.62, 206.96, 204.79, 210.64, 208.73, 214.33, 215.2, 207.24, 208.27, 221.25, 248.5, 255.36, 263.04, 274.99, 270.13, 265.01, 274, 250.02, 238, 237.5, 227.01, 242.67, 245.34, 245.63] },
      velocityScore: { '1D': 0, '1W': 3, '1M': 2.5, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 29.3, revenueGrowth: 17, eps: 8.37, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 5.08, ALAI: 5.1, CHAT: 2.67, AIFD: 3.64, SPRX: false, AOTG: 4.05 },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.85, proScore: 1.92, coverage: 0.5,
      price: 394.62, weeklyPrices: [390.99, 384.93, 395.63, 401.10, 394.62], weeklyChange: 0.93, dayChange: -1.62, sortRank: 0, periodReturns: { '1M': 4.1, 'YTD': -18.4, '6M': -14.2, '1Y': -22.9 },
      priceHistory: { '1D': [401.1, 394.05, 394.62], '1W': [390.99, 384.93, 395.63, 401.1, 394.62], '1M': [378.91, 379.4, 367.34, 373.94, 365.46, 352.83, 372.97, 368.57, 373.02, 384.28, 390.49, 386.74, 388.84, 383.34, 384.36, 385.1, 390.99, 384.93, 395.63, 401.1, 394.62], 'YTD': [483.62, 478.11, 459.86, 470.28, 411.21, 413.27, 399.6, 401.72, 410.68, 395.55, 381.87, 356.77, 372.29, 393.11, 432.92, 424.46, 413.96, 409.43, 419.09, 460.52, 411.74, 399.76, 365.46, 384.28, 385.1, 394.62], '6M': [454.52, 480.58, 411.21, 413.27, 399.6, 400.6, 405.2, 405.76, 399.41, 372.74, 370.17, 374.33, 411.22, 432.92, 424.46, 413.96, 405.21, 421.06, 426.99, 427.34, 397.36, 378.91, 352.83, 390.49, 385.1, 394.62], '1Y': [511.7, 510.88, 533.5, 520.84, 522.48, 504.24, 509.64, 507.97, 501.01, 508.45, 507.03, 515.74, 522.4, 511.61, 520.56, 525.76, 497.1, 503.29, 478.43, 492.01, 480.84, 483.47, 483.98, 487.71, 472.85, 477.18, 454.52, 480.58, 411.21, 413.27, 399.6, 400.6, 403.93, 405.76, 399.41, 372.74, 370.17, 374.33, 411.22, 432.92, 424.46, 413.96, 405.21, 421.06, 426.99, 427.34, 397.36, 378.91, 352.83, 390.49, 385.1, 394.62] },
      velocityScore: { '1D': 3.2, '1W': 6.1, '1M': 12.3, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 23.5, revenueGrowth: 18, eps: 16.81, grossMargin: 68, dividendYield: 0.91,
      etfPresence: { AIS: false, ARTY: 2.91, BAI: false, IGPT: false, IVES: 5.02, ALAI: 5.38, CHAT: 2.49, AIFD: false, SPRX: false, AOTG: 3.43 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 5, avgWeight: 3.22, proScore: 1.61, coverage: 0.5,
      price: 301.26, weeklyPrices: [362.05, 361.78, 350.62, 319.74, 301.26], weeklyChange: -16.79, dayChange: -5.78, sortRank: 0, periodReturns: { '1M': -19.6, 'YTD': 81.1, '6M': 65.5, '1Y': 207.6 },
      priceHistory: { '1D': [319.74, 302, 301.26], '1W': [362.05, 361.78, 350.62, 319.74, 301.26], '1M': [374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86, 406.42, 432.74, 382.89, 393.16, 417.45, 412.97, 362.05, 361.78, 350.62, 319.74, 301.26], 'YTD': [166.36, 156.73, 182, 163.25, 158.52, 182.86, 129.58, 124.67, 120, 120.31, 116.04, 112.47, 118.99, 170.6, 194.06, 196.85, 213.91, 228.64, 297.84, 320.09, 346.33, 389.2, 399.92, 430.86, 412.97, 301.26], '6M': [183.75, 170.93, 158.52, 182.86, 129.58, 128.15, 113.77, 116.48, 127.57, 121.76, 109.6, 125.46, 172.09, 194.06, 196.85, 213.91, 224.09, 287.48, 349.17, 363.54, 330.86, 374.68, 398, 406.42, 412.97, 301.26], '1Y': [97.95, 121.68, 136.73, 170.89, 190.69, 177.53, 189.15, 187.95, 232.9, 251.88, 200.64, 209.6, 225.43, 163.55, 163.64, 169.55, 162.83, 144.47, 139.29, 157.57, 152.51, 173.7, 145.88, 167.26, 167.11, 172.57, 183.75, 170.93, 158.52, 182.86, 129.58, 128.15, 109.8, 116.48, 127.57, 121.76, 109.6, 125.46, 172.09, 194.06, 196.85, 213.91, 224.09, 287.48, 349.17, 363.54, 330.86, 374.68, 398, 406.42, 412.97, 301.26] },
      velocityScore: { '1D': -0.6, '1W': -16.1, '1M': 5.2, '6M': null }, isNew: false,
      marketCap: '$52B', pe: 204.9, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 1.93, ARTY: 1.2, BAI: false, IGPT: false, IVES: false, ALAI: 0.87, CHAT: 2.23, AIFD: false, SPRX: 9.87, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 5, avgWeight: 3.15, proScore: 1.57, coverage: 0.5,
      price: 183.79, weeklyPrices: [217.53, 222.44, 206.26, 188.30, 183.79], weeklyChange: -15.51, dayChange: -2.4, sortRank: 0, periodReturns: { '1M': -36.5, 'YTD': 116.3, '6M': 128.4, '1Y': 155.2 },
      priceHistory: { '1D': [188.3, 184.27, 183.79], '1W': [217.53, 222.44, 206.26, 188.3, 183.79], '1M': [289.54, 310.58, 307.86, 279.04, 276.7, 281.26, 266.77, 277.75, 297.89, 272.05, 245.29, 249.27, 230.7, 231.71, 243.27, 235.81, 217.53, 222.44, 206.26, 188.3, 183.79], 'YTD': [84.98, 83.45, 80.46, 81.77, 75.54, 82.01, 79.09, 79.29, 75.68, 87.86, 87.91, 94.88, 109.38, 133.83, 157.32, 156.57, 172.15, 182.58, 190.69, 219.43, 288.85, 308.88, 276.7, 272.05, 235.81, 183.79], '6M': [79.8, 82.93, 75.54, 82.01, 79.09, 80.92, 78.09, 93.3, 90.79, 92.36, 99.05, 114.45, 134.6, 157.32, 156.57, 172.15, 177.95, 186.8, 204.83, 301.65, 252.59, 289.54, 281.26, 245.29, 235.81, 183.79], '1Y': [72.01, 74.04, 80.37, 75.85, 79.04, 71.21, 77.23, 64.1, 66.59, 74.23, 83.81, 86.2, 90.68, 88.23, 82.77, 88.57, 93.33, 87.52, 76.68, 89.4, 98.19, 89.43, 84.47, 86.34, 90.23, 82.89, 79.8, 82.93, 75.54, 82.01, 79.09, 80.92, 77.51, 93.3, 90.79, 92.36, 99.05, 114.45, 134.6, 157.32, 156.57, 172.15, 177.95, 186.8, 204.83, 301.65, 252.59, 289.54, 281.26, 245.29, 235.81, 183.79] },
      velocityScore: { '1D': -9.8, '1W': -29.9, '1M': -42.1, '6M': null }, isNew: false,
      marketCap: '$165B', pe: 63.2, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.13,
      etfPresence: { AIS: 3.21, ARTY: 3.27, BAI: 1.52, IGPT: false, IVES: false, ALAI: false, CHAT: false, AIFD: 4.9, SPRX: 2.83, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 5, avgWeight: 1.98, proScore: 0.99, coverage: 0.5,
      price: 1385.68, weeklyPrices: [1673.97, 1757.82, 1615.00, 1411.08, 1385.68], weeklyChange: -17.22, dayChange: -1.8, sortRank: 0, periodReturns: { '1M': -29.3, 'YTD': 483.7, '6M': 235, '1Y': 3237.4 },
      priceHistory: { '1D': [1411.08, 1353, 1385.68], '1W': [1673.97, 1757.82, 1615, 1411.08, 1385.68], '1M': [1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 1745, 1744.43, 1617.7, 1727.18, 1858.27, 1915.92, 1673.97, 1757.82, 1615, 1411.08, 1385.68], 'YTD': [237.38, 334.54, 413.62, 470.8, 695.51, 541.64, 600.4, 651.9, 565.59, 661.62, 709.71, 615.83, 710.8, 944.46, 979.07, 1064.21, 1409.98, 1382.72, 1542.24, 1761.43, 1642, 2107.86, 1914.46, 2032.22, 1915.92, 1385.68], '6M': [453.12, 481.43, 695.51, 541.64, 600.4, 632.38, 599.06, 618.89, 720.17, 702.48, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1447.23, 1392.56, 1641.64, 1831.5, 1643.23, 1958.8, 2335, 1745, 1915.92, 1385.68], '1Y': [41.52, 42.06, 42.92, 40.69, 46.68, 45.5, 50.87, 62.5, 84.3, 98.87, 94.29, 124.14, 129.68, 144.27, 167.05, 195.82, 207.69, 243.57, 195.96, 223.28, 213.31, 241.61, 219.46, 250.05, 274.08, 389.27, 453.12, 481.43, 695.51, 541.64, 600.4, 632.38, 565.41, 618.89, 720.17, 702.48, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1447.23, 1392.56, 1641.64, 1831.5, 1643.23, 1958.8, 2335, 1745, 1915.92, 1385.68] },
      velocityScore: { '1D': -6.6, '1W': -11.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$205B', pe: 47.4, revenueGrowth: 251, eps: 29.21, grossMargin: 56, dividendYield: null,
      etfPresence: { AIS: 1.86, ARTY: false, BAI: 2.5, IGPT: 3.41, IVES: false, ALAI: 0.41, CHAT: false, AIFD: false, SPRX: false, AOTG: 1.7 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'CRDO', name: 'Credo Technology Group Holding Ltd', easyScore: 5, avgWeight: 1.84, proScore: 0.92, coverage: 0.5,
      price: 191.46, weeklyPrices: [236.88, 236.18, 226.74, 207.97, 191.46], weeklyChange: -19.17, dayChange: -7.94, sortRank: 0, periodReturns: { '1M': -23.2, 'YTD': 33.1, '6M': 26.8, '1Y': 94.5 },
      priceHistory: { '1D': [207.97, 192.07, 191.46], '1W': [236.88, 236.18, 226.74, 207.97, 191.46], '1M': [249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.09, 241.91, 265.55, 246.4, 258.69, 265.65, 257.79, 236.88, 236.18, 226.74, 207.97, 191.46], 'YTD': [143.89, 141.59, 150.97, 128.02, 111.31, 134.72, 127.91, 114.48, 114.74, 117.69, 103.4, 95.24, 106.79, 159.52, 189.49, 175.77, 198.29, 184.54, 193.39, 226.1, 222.27, 259.41, 268.99, 259.09, 257.79, 191.46], '6M': [153.22, 129.57, 111.31, 134.72, 127.91, 123.46, 102.54, 112.33, 104.06, 100.3, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 189.36, 182.98, 222.35, 214.6, 237.68, 249.33, 268.03, 241.91, 257.79, 191.46], '1Y': [98.45, 101.17, 111.55, 119.78, 117.33, 110.86, 131.82, 134, 159.32, 172.31, 144.94, 149.63, 151.15, 136.53, 150.97, 166.62, 162.74, 142.95, 134.73, 177.6, 180.92, 154.47, 138.57, 144.83, 140.24, 156.07, 153.22, 129.57, 111.31, 134.72, 127.91, 123.46, 97.3, 112.33, 104.06, 100.3, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 189.36, 182.98, 222.35, 214.6, 237.68, 249.33, 268.03, 241.91, 257.79, 191.46] },
      velocityScore: { '1D': 0, '1W': -1.1, '1M': 2.2, '6M': null }, isNew: false,
      marketCap: '$36B', pe: 76, revenueGrowth: 157, eps: 2.52, grossMargin: 68, dividendYield: null,
      etfPresence: { AIS: 1.02, ARTY: 1.13, BAI: 1.96, IGPT: false, IVES: false, ALAI: false, CHAT: 1.91, AIFD: false, SPRX: 3.16, AOTG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 4, avgWeight: 3.07, proScore: 1.23, coverage: 0.4,
      price: 276.44, weeklyPrices: [305.87, 303.58, 304.57, 294.11, 276.44], weeklyChange: -9.62, dayChange: -6.04, sortRank: 0, periodReturns: { '1M': -13, 'YTD': 70.6, '6M': 56.2, '1Y': 110.8 },
      priceHistory: { '1D': [294.21, 276.4, 276.44], '1W': [305.87, 303.58, 304.57, 294.11, 276.44], '1M': [317.58, 333.05, 357.96, 318.32, 316.43, 325.57, 303.95, 306.97, 334.82, 311.42, 300.53, 318.47, 305.58, 317.81, 323.92, 318.86, 305.87, 303.58, 304.57, 294.11, 276.44], 'YTD': [162.01, 160.78, 176.93, 181.23, 190.15, 199.62, 243.21, 259.23, 249.75, 258.88, 255.88, 251.07, 262.3, 310.51, 305.14, 306.18, 358.92, 376.23, 323.4, 323.39, 300.57, 311.93, 316.43, 311.42, 318.86, 276.44], '6M': [175.18, 189.21, 190.15, 199.62, 243.21, 262.19, 251.28, 270.06, 268.41, 270.89, 250.58, 281.03, 301.16, 305.14, 306.18, 358.92, 369.99, 315.67, 314.18, 331.44, 280.98, 317.58, 325.57, 300.53, 318.86, 276.44], '1Y': [131.12, 130.87, 145.6, 139.39, 132.52, 126.58, 134.23, 125.7, 135.71, 141.96, 139.77, 161.64, 168.88, 177.82, 183.2, 193.76, 183.02, 163.64, 159.61, 179.73, 182.54, 178.66, 154.39, 167.58, 173.95, 170.03, 175.18, 189.21, 190.15, 199.62, 243.21, 262.19, 244.44, 270.06, 268.41, 270.89, 250.58, 281.03, 301.16, 305.14, 306.18, 358.92, 369.99, 315.67, 314.18, 331.44, 280.98, 317.58, 325.57, 300.53, 318.86, 276.44] },
      velocityScore: { '1D': 1.7, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$106B', pe: 69.6, revenueGrowth: 30, eps: 3.97, grossMargin: 37, dividendYield: 0.09,
      etfPresence: { AIS: 3.93, ARTY: false, BAI: 1.97, IGPT: false, IVES: false, ALAI: false, CHAT: 2.25, AIFD: 4.11, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 4, avgWeight: 3.04, proScore: 1.22, coverage: 0.4,
      price: 690.43, weeklyPrices: [768.15, 814.80, 752.00, 706.23, 690.43], weeklyChange: -10.12, dayChange: -2.24, sortRank: 0, periodReturns: { '1M': -20.6, 'YTD': 87.3, '6M': 112.9, '1Y': 572.7 },
      priceHistory: { '1D': [706.23, 693.06, 690.43], '1W': [768.15, 814.8, 752, 706.23, 690.43], '1M': [869.98, 850, 893.93, 827.92, 842.53, 861.97, 816.98, 851.4, 858.06, 801.16, 728.32, 731.25, 698.91, 707.1, 785.77, 802.01, 768.15, 814.8, 752, 706.23, 690.43], 'YTD': [368.59, 348.26, 324.25, 332.45, 435.1, 561.13, 594.26, 677, 650.82, 622.5, 706.35, 702.73, 815.75, 852.79, 873.6, 858.32, 944.28, 1001.81, 964.5, 905, 895.4, 957.24, 842.53, 801.16, 802.01, 690.43], '6M': [356.83, 370.66, 435.1, 561.13, 594.26, 723.39, 680.8, 672, 649.56, 801.99, 702.76, 896.02, 824.01, 873.6, 858.32, 944.28, 1030.37, 868.07, 860.62, 938, 853.26, 869.98, 861.97, 728.32, 802.01, 690.43], '1Y': [102.64, 102.85, 110.08, 111.13, 114.62, 117.43, 135.55, 141.91, 164.88, 171.5, 159.11, 169.75, 159.76, 163.23, 168.5, 200.13, 239.68, 226.86, 233.24, 325.16, 327.85, 372.09, 337.13, 390.77, 357.05, 339.87, 356.83, 370.66, 435.1, 561.13, 594.26, 723.39, 694.43, 672, 649.56, 801.99, 702.76, 896.02, 824.01, 873.6, 858.32, 944.28, 1030.37, 868.07, 860.62, 938, 853.26, 869.98, 861.97, 728.32, 802.01, 690.43] },
      velocityScore: { '1D': -10.9, '1W': -6.9, '1M': -15.9, '6M': null }, isNew: false,
      marketCap: '$54B', pe: 122.2, revenueGrowth: 90, eps: 5.65, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.48, IGPT: false, IVES: false, ALAI: 1.22, CHAT: false, AIFD: 4.45, SPRX: 4.01, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 4 of 10 AI & ML ETFs (40% coverage) with average weight 3.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 4, avgWeight: 2.56, proScore: 1.02, coverage: 0.4,
      price: 382.61, weeklyPrices: [394.76, 396.18, 394.46, 391.06, 382.61], weeklyChange: -3.08, dayChange: -2.16, sortRank: 0, periodReturns: { '1M': -3.5, 'YTD': -14.9, '6M': -12.5, '1Y': 19.8 },
      priceHistory: { '1D': [391.06, 381.5, 382.61], '1W': [394.76, 396.18, 394.46, 391.06, 382.61], '1M': [396.38, 400.49, 405.05, 381.61, 375.53, 375.12, 379.71, 411.84, 420.6, 425.3, 393.45, 419.77, 402.9, 394.06, 406.55, 407.76, 394.76, 396.18, 394.46, 391.06, 382.61], 'YTD': [449.72, 435.8, 437.5, 435.2, 421.96, 425.21, 411.32, 408.58, 405.55, 391.2, 367.96, 361.83, 346.65, 364.2, 387.51, 372.8, 398.73, 443.3, 417.85, 415.88, 408.95, 411.15, 375.53, 425.3, 407.76, 382.61], '6M': [419.25, 430.9, 421.96, 425.21, 411.32, 417.4, 405.94, 399.24, 399.27, 383.03, 371.75, 343.25, 391.95, 387.51, 372.8, 398.73, 445.27, 417.26, 442.1, 423.7, 381.59, 396.38, 375.12, 393.45, 407.76, 382.61], '1Y': [319.41, 305.3, 308.27, 322.27, 335.58, 320.11, 345.98, 338.53, 368.81, 416.85, 423.39, 436, 435.54, 428.75, 448.98, 440.1, 445.91, 401.99, 395.23, 430.17, 454.53, 446.89, 483.37, 475.19, 451.67, 448.96, 419.25, 430.9, 421.96, 425.21, 411.32, 417.4, 392.43, 399.24, 399.27, 383.03, 371.75, 343.25, 391.95, 387.51, 372.8, 398.73, 445.27, 417.26, 442.1, 423.7, 381.59, 396.38, 375.12, 393.45, 407.76, 382.61] },
      velocityScore: { '1D': 1, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.4T', pe: 351, revenueGrowth: 16, eps: 1.09, grossMargin: 19, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 1.01, IGPT: false, IVES: 4.54, ALAI: 2.73, CHAT: false, AIFD: 1.95, SPRX: false, AOTG: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 4, avgWeight: 2.51, proScore: 1.01, coverage: 0.4,
      price: 449.4, weeklyPrices: [555.55, 563.32, 513.84, 466.81, 449.40], weeklyChange: -19.11, dayChange: -3.73, sortRank: 0, periodReturns: { '1M': -36.9, 'YTD': 160.9, '6M': 102.9, '1Y': 570.5 },
      priceHistory: { '1D': [466.81, 445, 449.4], '1W': [555.55, 563.32, 513.84, 466.81, 449.4], '1M': [712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539, 577.46, 532.1, 550.3, 578.05, 582.59, 555.55, 563.32, 513.84, 466.81, 449.4], 'YTD': [172.27, 187.68, 221.51, 240.85, 290.24, 262.56, 296.56, 282.25, 259.03, 272.29, 293.1, 275.34, 311.96, 366.22, 389.1, 412.76, 483.15, 489.15, 486.46, 546.2, 526.93, 653.53, 643.83, 598.37, 582.59, 449.4], '6M': [222.97, 252.66, 290.24, 262.56, 296.56, 290.95, 261.3, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 459.62, 531.18, 594.11, 490.09, 712.13, 675.39, 539, 582.59, 449.4], '1Y': [67.02, 69.02, 78.69, 74.44, 76.24, 74.66, 82.04, 90.49, 96.15, 105.15, 107.21, 131.26, 119.7, 125.92, 125.72, 138.13, 163.6, 157.16, 140.23, 163.33, 161, 187.2, 175.01, 181.54, 187.88, 212.14, 222.97, 252.66, 290.24, 262.56, 296.56, 290.95, 250.61, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 459.62, 531.18, 594.11, 490.09, 712.13, 675.39, 539, 582.59, 449.4] },
      velocityScore: { '1D': -4.7, '1W': null, '1M': -42, '6M': null }, isNew: false,
      marketCap: '$155B', pe: 26.9, revenueGrowth: 46, eps: 16.71, grossMargin: 45, dividendYield: 0.13,
      etfPresence: { AIS: 1.23, ARTY: 2.43, BAI: 2.82, IGPT: false, IVES: false, ALAI: 3.57, CHAT: false, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 4, avgWeight: 2.38, proScore: 0.95, coverage: 0.4,
      price: 123.74, weeklyPrices: [131.54, 127.94, 132.49, 124.21, 123.74], weeklyChange: -5.93, dayChange: -0.4, sortRank: 0, periodReturns: { '1M': -32.6, 'YTD': -36.5, '6M': -35.2, '1Y': -50.3 },
      priceHistory: { '1D': [124.24, 123.64, 123.74], '1W': [131.54, 127.94, 132.49, 124.21, 123.74], '1M': [183.53, 184.29, 175.07, 165.16, 157.53, 152.46, 148.53, 147.76, 146.55, 142.5, 140.27, 143.76, 141.6, 140.49, 144.22, 140.64, 131.54, 127.94, 132.49, 124.21, 123.74], 'YTD': [194.91, 189.65, 191.09, 182.44, 154.67, 159.89, 156.17, 150.31, 154.79, 155.11, 149.68, 139.66, 143.17, 163, 187.5, 163.83, 194.03, 195.61, 189.77, 248.15, 211.82, 192.64, 157.53, 142.5, 140.64, 123.74], '6M': [179.92, 174.9, 154.67, 159.89, 156.17, 147.89, 152.37, 149.4, 154.69, 147.09, 147.11, 143.66, 169.81, 187.5, 163.83, 194.03, 189.76, 188.16, 203.7, 230.33, 201.26, 183.53, 152.46, 140.27, 140.64, 123.74], '1Y': [248.75, 242.83, 253.77, 249.39, 244.96, 233.16, 240.32, 223, 307.86, 296.62, 291.33, 288.78, 296.96, 313, 280.07, 256.89, 243.8, 217.57, 210.69, 201.95, 214.33, 198.85, 180.03, 197.99, 192.59, 204.68, 179.92, 174.9, 154.67, 159.89, 156.17, 147.89, 149.01, 149.4, 154.69, 147.09, 147.11, 143.66, 169.81, 187.5, 163.83, 194.03, 189.76, 188.16, 203.7, 230.33, 201.26, 183.53, 152.46, 140.27, 140.64, 123.74] },
      velocityScore: { '1D': -2.1, '1W': -5.9, '1M': -19.5, '6M': null }, isNew: false,
      marketCap: '$356B', pe: 21.2, revenueGrowth: 21, eps: 5.83, grossMargin: 66, dividendYield: 1.61,
      etfPresence: { AIS: false, ARTY: 2.94, BAI: false, IGPT: false, IVES: 2.62, ALAI: false, CHAT: 1.85, AIFD: false, SPRX: false, AOTG: 2.1 },
      tonyNote: 'Oracle lands in 3 AI ETFs on the strength of its cloud database and AI infrastructure contracts. Revenue grew 22%, 67% gross margin, P/E of 40x. The 17.5% weekly return following a major earnings beat shows how quickly sentiment can reprice; the weight score at 2.04% is still modest, meaning ETF managers have started building positions but conviction is not yet deep.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 4, avgWeight: 2.26, proScore: 0.91, coverage: 0.4,
      price: 720.83, weeklyPrices: [860.66, 878.31, 828.30, 745.49, 720.83], weeklyChange: -16.25, dayChange: -3.32, sortRank: 0, periodReturns: { '1M': -32.4, 'YTD': 161.7, '6M': 121, '1Y': 391.3 },
      priceHistory: { '1D': [745.49, 713.43, 720.83], '1W': [860.66, 878.31, 828.3, 745.49, 720.83], '1M': [1066.07, 1070.23, 1094.04, 1038.59, 993.25, 1025.36, 899.9, 968.53, 965, 915.19, 820.16, 868.26, 827.64, 860.02, 890.09, 910.34, 860.66, 878.31, 828.3, 745.49, 720.83], 'YTD': [275.39, 284.47, 326.23, 358.29, 444.45, 396.23, 424.14, 409.67, 367.34, 383.71, 411.23, 380.07, 468.72, 533.44, 579.88, 643.3, 786.42, 804.76, 810.46, 921.26, 876.77, 1018.8, 993.25, 915.19, 910.34, 720.83], '6M': [325.99, 371.76, 444.45, 396.23, 424.14, 421.85, 375.01, 384.29, 421.09, 424.96, 391.76, 496.3, 519.6, 579.88, 643.3, 786.42, 817.35, 751.07, 880.72, 940.69, 815.99, 1066.07, 1025.36, 820.16, 910.34, 720.83], '1Y': [146.72, 152.73, 157.01, 148.1, 155.73, 154.6, 172.38, 183.98, 196.81, 216.64, 219.85, 254.74, 221.7, 226.03, 226.41, 268.34, 278.47, 262.56, 240.5, 276.69, 265.63, 307.85, 292, 286.22, 289.83, 321.48, 325.99, 371.76, 444.45, 396.23, 424.14, 421.85, 357.62, 384.29, 421.09, 424.96, 391.76, 496.3, 519.6, 579.88, 643.3, 786.42, 817.35, 751.07, 880.72, 940.69, 815.99, 1066.07, 1025.36, 820.16, 910.34, 720.83] },
      velocityScore: { '1D': null, '1W': null, '1M': -28.3, '6M': null }, isNew: true,
      marketCap: '$163B', pe: 68.6, revenueGrowth: 44, eps: 10.51, grossMargin: 42, dividendYield: 0.4,
      etfPresence: { AIS: 2.2, ARTY: 2.47, BAI: false, IGPT: 2.72, IVES: false, ALAI: 1.66, CHAT: false, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 4.7, proScore: 4.7, coverage: 1,
      price: 828.9, weeklyPrices: [937.00, 983.12, 904.28, 853.20, 828.90], weeklyChange: -11.54, dayChange: -2.85, sortRank: 0, periodReturns: { '1M': -20.5, 'YTD': 190.4, '6M': 128.5, '1Y': 631.9 },
      priceHistory: { '1D': [853.2, 825.41, 828.9], '1W': [937, 983.12, 904.28, 853.2, 828.9], '1M': [1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 938.38, 948.8, 991.64, 979.3, 937, 983.12, 904.28, 853.2, 828.9], 'YTD': [285.41, 327.02, 362.75, 389.09, 419.44, 373.25, 420.95, 415.56, 397.05, 426.13, 422.9, 357.22, 377.58, 465.66, 487.48, 518.46, 666.59, 776.01, 762.1, 1035.5, 949.28, 1087.99, 1048.51, 1032.28, 979.3, 828.9], '6M': [365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 923.52, 1079.57, 891.88, 1043.19, 1213.56, 975.56, 979.3, 828.9], '1Y': [113.26, 111.73, 109.14, 111.87, 125.29, 115.79, 122, 124.21, 150.57, 168.89, 156.83, 183.75, 192.33, 202.53, 206.71, 224.01, 238.33, 236.95, 201.37, 236.48, 226.65, 258.46, 248.55, 284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 420.95, 429, 379.68, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 923.52, 1079.57, 891.88, 1043.19, 1213.56, 975.56, 979.3, 828.9] },
      velocityScore: { '1D': 4, '1W': -4.3, '1M': -24.1, '6M': null }, isNew: false,
      marketCap: '$936B', pe: 18.7, revenueGrowth: 346, eps: 44.28, grossMargin: 73, dividendYield: 0.06,
      etfPresence: { SOXX: 7.63, PSI: 5.32, XSD: 2.49, DRAM: 3.36 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 5.62, proScore: 4.22, coverage: 0.75,
      price: 481.14, weeklyPrices: [534.39, 548.13, 529.14, 500.94, 481.14], weeklyChange: -9.96, dayChange: -3.95, sortRank: 0, periodReturns: { '1M': -6.1, 'YTD': 124.7, '6M': 107.5, '1Y': 199.9 },
      priceHistory: { '1D': [500.94, 479.85, 481.14], '1W': [534.39, 548.13, 529.14, 500.94, 481.14], '1M': [512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 516.11, 517.41, 546.72, 557.89, 534.39, 548.13, 529.14, 500.94, 481.14], 'YTD': [214.16, 204.68, 231.83, 251.31, 242.11, 213.57, 200.12, 203.68, 199.45, 193.39, 201.33, 201.99, 221.53, 255.07, 303.46, 337.11, 421.39, 449.7, 449.59, 510.13, 490.33, 547.26, 519.74, 540.88, 557.89, 481.14], '6M': [231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 518.09, 542.52, 452.4, 512.48, 532.57, 517.82, 557.89, 481.14], '1Y': [160.41, 162.12, 176.31, 172.4, 180.95, 163.71, 168.58, 161.79, 155.67, 157.92, 161.27, 169.73, 232.89, 234.56, 234.99, 254.84, 237.7, 247.96, 206.02, 217.53, 215.98, 221.43, 201.06, 214.99, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 190.95, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 518.09, 542.52, 452.4, 512.48, 532.57, 517.82, 557.89, 481.14] },
      velocityScore: { '1D': -0.2, '1W': 1.2, '1M': -4.3, '6M': null }, isNew: false,
      marketCap: '$785B', pe: 159.8, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 8.43, PSI: 5.56, XSD: 2.88, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 5.53, proScore: 4.15, coverage: 0.75,
      price: 202.11, weeklyPrices: [203.53, 211.80, 212.50, 207.40, 202.11], weeklyChange: -0.7, dayChange: -2.55, sortRank: 0, periodReturns: { '1M': -1.2, 'YTD': 8.4, '6M': 8.5, '1Y': 16.8 },
      priceHistory: { '1D': [207.4, 202.69, 202.11], '1W': [203.53, 211.8, 212.5, 207.4, 202.11], '1M': [204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83, 195.55, 196.93, 204.12, 202.78, 210.96, 203.53, 211.8, 212.5, 207.4, 202.11], 'YTD': [186.5, 185.04, 186.23, 186.47, 180.34, 188.54, 187.98, 184.89, 183.34, 180.25, 172.7, 167.52, 178.1, 196.51, 202.5, 209.25, 207.83, 235.74, 219.51, 224.36, 208.64, 212.45, 199, 197.58, 210.96, 202.11], '6M': [178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 223.47, 214.25, 214.75, 200.42, 204.65, 195.74, 194.83, 210.96, 202.11], '1Y': [173, 173.74, 177.87, 180.77, 182.02, 174.98, 180.17, 171.66, 177.17, 176.24, 177.69, 188.89, 192.57, 181.81, 182.16, 202.89, 188.08, 186.86, 180.64, 177, 183.38, 180.93, 174.14, 190.53, 188.12, 184.94, 178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 180.05, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 223.47, 214.25, 214.75, 200.42, 204.65, 195.74, 194.83, 210.96, 202.11] },
      velocityScore: { '1D': 2.7, '1W': 12.8, '1M': 38.8, '6M': null }, isNew: false,
      marketCap: '$4.9T', pe: 31, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.48,
      etfPresence: { SOXX: 8.53, PSI: 5.39, XSD: 2.68, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.02, proScore: 3.01, coverage: 0.75,
      price: 92.94, weeklyPrices: [103.12, 107.76, 102.99, 96.98, 92.94], weeklyChange: -9.87, dayChange: -4.17, sortRank: 0, periodReturns: { '1M': -23.3, 'YTD': 151.9, '6M': 97.9, '1Y': 307.6 },
      priceHistory: { '1D': [96.98, 93.17, 92.94], '1W': [103.12, 107.76, 102.99, 96.98, 92.94], '1M': [121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 127.02, 120.35, 122.2, 110.39, 110.24, 112.54, 109.84, 103.12, 107.76, 102.99, 96.98, 92.94], 'YTD': [36.9, 41.11, 46.96, 42.49, 49.25, 47.13, 45.46, 45.46, 45.95, 45.77, 43.87, 43.13, 52.91, 63.81, 65.27, 94.75, 113.01, 115.93, 118.5, 109.33, 110.27, 127.86, 131.65, 127.02, 109.84, 92.94], '6M': [48.56, 43.93, 49.25, 47.13, 45.46, 46.88, 45.58, 46.78, 44.06, 44.06, 44.13, 58.95, 64.94, 65.27, 94.75, 113.01, 120.29, 118.96, 120.89, 112.71, 107.04, 121.1, 132.87, 120.35, 109.84, 92.94], '1Y': [22.8, 22.63, 19.8, 19.77, 23.86, 23.5, 24.93, 24.61, 24.61, 30.57, 33.99, 37.3, 37.8, 36.84, 38.16, 40.16, 37.24, 35.91, 33.62, 40.56, 40.5, 39.51, 36.28, 36.2, 39.37, 44.06, 48.56, 43.93, 49.25, 47.13, 45.46, 46.88, 43.1, 46.78, 44.06, 44.06, 44.13, 58.95, 64.94, 65.27, 94.75, 113.01, 120.29, 118.96, 120.89, 112.71, 107.04, 121.1, 132.87, 120.35, 109.84, 92.94] },
      velocityScore: { '1D': -1, '1W': -5, '1M': -16.6, '6M': null }, isNew: false,
      marketCap: '$467B', pe: null, revenueGrowth: 7, eps: -0.56, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 5.31, PSI: 4.39, XSD: 2.35, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.85, proScore: 2.89, coverage: 0.75,
      price: 369.53, weeklyPrices: [386.01, 392.75, 390.96, 380.53, 369.53], weeklyChange: -4.27, dayChange: -2.89, sortRank: 0, periodReturns: { '1M': -10.8, 'YTD': 36.3, '6M': 23.1, '1Y': 53.4 },
      priceHistory: { '1D': [380.53, 369.71, 369.53], '1W': [386.01, 392.75, 390.96, 380.53, 369.53], '1M': [414.45, 434.46, 445.48, 407.26, 413.16, 417.93, 386.91, 391.78, 397.17, 388.98, 377.16, 388.83, 379.03, 385.4, 393.64, 395.65, 386.01, 392.75, 390.96, 380.53, 369.53], 'YTD': [271.2, 299.16, 300.25, 304.01, 311.29, 325.16, 346.37, 354.35, 329.72, 306.07, 309.43, 307.44, 327.41, 348.6, 381.42, 389.31, 415.63, 426.79, 384.21, 402.69, 403.89, 427.58, 413.16, 388.98, 395.65, 369.53], '6M': [295.67, 303.83, 311.29, 325.16, 346.37, 360.8, 341.51, 318.81, 313.66, 321.83, 318.14, 346.21, 347.94, 381.42, 389.31, 415.63, 432.39, 398.05, 419.01, 437.67, 392.67, 414.45, 417.93, 377.16, 395.65, 369.53], '1Y': [240.97, 226.37, 224.63, 223.12, 236.21, 246.95, 254.25, 246.11, 248.24, 249.05, 247.53, 241.67, 237.88, 241.61, 243.29, 232.9, 232.88, 237.53, 225.2, 265.34, 277.26, 283.39, 274.92, 276.84, 277.29, 293.86, 295.67, 303.83, 311.29, 325.16, 346.37, 360.8, 338.99, 318.81, 313.66, 321.83, 318.14, 346.21, 347.94, 381.42, 389.31, 415.63, 432.39, 398.05, 419.01, 437.67, 392.67, 414.45, 417.93, 377.16, 395.65, 369.53] },
      velocityScore: { '1D': 2.5, '1W': 6.6, '1M': 20.4, '6M': null }, isNew: false,
      marketCap: '$180B', pe: 54.8, revenueGrowth: 37, eps: 6.74, grossMargin: 64, dividendYield: 1.16,
      etfPresence: { SOXX: 3.99, PSI: 5.06, XSD: 2.51, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.9% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 6.15, proScore: 3.08, coverage: 0.5,
      price: 529.84, weeklyPrices: [575.39, 595.70, 579.43, 560.93, 529.84], weeklyChange: -7.92, dayChange: -5.54, sortRank: 0, periodReturns: { '1M': -10.6, 'YTD': 106.2, '6M': 62, '1Y': 175.2 },
      priceHistory: { '1D': [560.93, 529.28, 529.84], '1W': [575.39, 595.7, 579.43, 560.93, 529.84], '1M': [592.92, 617.11, 640.18, 585.88, 588.97, 668, 626.84, 694.64, 723, 650.91, 603.04, 592.79, 554.5, 570.5, 588.66, 602.5, 575.39, 595.7, 579.43, 560.93, 529.84], 'YTD': [256.99, 281.64, 327.01, 319.46, 318.67, 329.07, 369.3, 375.72, 346.53, 341.53, 357.06, 337.17, 354.31, 395.64, 403.48, 382.59, 428.62, 440.56, 427.36, 458.17, 492.17, 585.78, 588.97, 650.91, 602.5, 529.84], '6M': [318.23, 332.71, 318.67, 329.07, 369.3, 394.95, 357.76, 345.88, 352.46, 373.99, 341.79, 385.72, 394.26, 403.48, 382.59, 428.62, 436.61, 426.85, 449.68, 500.77, 497.01, 592.92, 668, 603.04, 602.5, 529.84], '1Y': [192.52, 188.12, 180.06, 183.15, 188.24, 159.84, 165.27, 158.24, 170.15, 189.76, 199.6, 223.59, 220.3, 227.72, 228.47, 232.55, 233.53, 223.23, 220.23, 252.25, 269.44, 270.11, 253.5, 261.9, 284.32, 307.24, 318.23, 332.71, 318.67, 329.07, 369.3, 394.95, 351.32, 345.88, 352.46, 373.99, 341.79, 385.72, 394.26, 403.48, 382.59, 428.62, 436.61, 426.85, 449.68, 500.77, 497.01, 592.92, 668, 603.04, 602.5, 529.84] },
      velocityScore: { '1D': 2.3, '1W': 4.8, '1M': 7.3, '6M': null }, isNew: false,
      marketCap: '$421B', pe: 49.7, revenueGrowth: 11, eps: 10.66, grossMargin: 49, dividendYield: 0.38,
      etfPresence: { SOXX: 5.41, PSI: 6.89, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 5.53, proScore: 2.76, coverage: 0.5,
      price: 209.77, weeklyPrices: [222.25, 230.37, 224.50, 219.37, 209.77], weeklyChange: -5.62, dayChange: -4.38, sortRank: 0, periodReturns: { '1M': -12.1, 'YTD': 72.6, '6M': 33.8, '1Y': 123.9 },
      priceHistory: { '1D': [219.37, 210.01, 209.77], '1W': [222.25, 230.37, 224.5, 219.37, 209.77], '1M': [238.73, 259.56, 269.16, 244.49, 240.48, 258.8, 248.64, 278.39, 301.71, 266.19, 235.55, 233.31, 216.47, 221.18, 229.52, 231.52, 222.25, 230.37, 224.5, 219.37, 209.77], 'YTD': [121.51, 132.46, 156.78, 154.3, 135.55, 143.08, 148.03, 152.43, 142.94, 141.86, 149.87, 144.32, 154.88, 179.59, 181.21, 181.62, 181.63, 189.29, 184.22, 194, 210.81, 256.42, 240.48, 266.19, 231.52, 209.77], '6M': [148.62, 161.63, 135.55, 143.08, 148.03, 154.67, 147.59, 145.29, 148.13, 156.62, 147.24, 167.23, 174.81, 181.21, 181.62, 181.63, 184.97, 182.95, 192.76, 212.51, 213.56, 238.73, 258.8, 235.55, 231.52, 209.77], '1Y': [93.71, 90.42, 87.9, 91.21, 95.54, 87.24, 89.4, 87.33, 95.93, 104.67, 105.91, 113.93, 105.35, 109.88, 115.9, 121.44, 120.64, 116.17, 110.25, 117.55, 120.81, 124.62, 122.24, 127.96, 135.24, 142.82, 148.62, 161.63, 135.55, 143.08, 148.03, 154.67, 144.13, 145.29, 148.13, 156.62, 147.24, 167.23, 174.81, 181.21, 181.62, 181.63, 184.97, 182.95, 192.76, 212.51, 213.56, 238.73, 258.8, 235.55, 231.52, 209.77] },
      velocityScore: { '1D': 3, '1W': 4.9, '1M': 16.9, '6M': null }, isNew: false,
      marketCap: '$274B', pe: 59.4, revenueGrowth: 12, eps: 3.53, grossMargin: 61, dividendYield: 0.42,
      etfPresence: { SOXX: 4.96, PSI: 6.09, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 4.97, proScore: 2.48, coverage: 0.5,
      price: 305.03, weeklyPrices: [329.92, 346.10, 335.43, 320.96, 305.03], weeklyChange: -7.54, dayChange: -4.96, sortRank: 0, periodReturns: { '1M': -18.5, 'YTD': 78.2, '6M': 36.8, '1Y': 202.6 },
      priceHistory: { '1D': [320.96, 304.88, 305.03], '1W': [329.92, 346.1, 335.43, 320.96, 305.03], '1M': [374.18, 389.04, 409.54, 371.33, 374.8, 401.82, 379.09, 410.91, 433.33, 391.26, 351.41, 350.2, 326.13, 333.15, 353.17, 350.33, 329.92, 346.1, 335.43, 320.96, 305.03], 'YTD': [171.18, 200.96, 222.96, 222.87, 230.1, 226.61, 240.09, 239.07, 214.68, 212.2, 228.36, 211.41, 224.35, 272.41, 265.55, 248.75, 297.17, 299.15, 302.24, 317.12, 324.45, 388.92, 374.8, 391.26, 350.33, 305.03], '6M': [222.41, 238.46, 230.1, 226.61, 240.09, 249.48, 222.99, 215.23, 226.47, 238.84, 213.66, 246.49, 265.16, 265.55, 248.75, 297.17, 295.44, 292.09, 318, 343.71, 321.8, 374.18, 401.82, 351.41, 350.33, 305.03], '1Y': [100.79, 97.78, 94.84, 99.15, 107.38, 98.41, 104.09, 100.42, 115.58, 126.32, 128.13, 146.99, 141, 142.37, 147.54, 161.01, 162.19, 153.32, 139.59, 156, 157.09, 168.71, 164.7, 178.07, 194.76, 220.4, 222.41, 238.46, 230.1, 226.61, 240.09, 249.48, 217.27, 215.23, 226.47, 238.84, 213.66, 246.49, 265.16, 265.55, 248.75, 297.17, 295.44, 292.09, 318, 343.71, 321.8, 374.18, 401.82, 351.41, 350.33, 305.03] },
      velocityScore: { '1D': 0.8, '1W': -0.4, '1M': 6.4, '6M': null }, isNew: false,
      marketCap: '$381B', pe: 57.6, revenueGrowth: 24, eps: 5.3, grossMargin: 50, dividendYield: 0.32,
      etfPresence: { SOXX: 4.38, PSI: 5.56, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 4.94, proScore: 2.47, coverage: 0.5,
      price: 367.4, weeklyPrices: [384.05, 389.11, 394.28, 374.45, 367.40], weeklyChange: -4.34, dayChange: -1.88, sortRank: 0, periodReturns: { '1M': -6.5, 'YTD': 6.2, '6M': 4.5, '1Y': 28.3 },
      priceHistory: { '1D': [374.45, 366.83, 367.4], '1W': [384.05, 389.11, 394.28, 374.45, 367.4], '1M': [392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45, 373.9, 370.78, 388.69, 401.11, 399.97, 384.05, 389.11, 394.28, 374.45, 367.4], 'YTD': [346.1, 332.48, 351.71, 324.85, 320.33, 340.44, 333.51, 321.7, 332.77, 322.16, 310.51, 300.68, 333.97, 380.78, 422.65, 405.45, 425.44, 439.79, 414.57, 459.97, 396.6, 393.94, 382.07, 369.34, 399.97, 367.4], '6M': [332.6, 332.79, 320.33, 340.44, 333.51, 332.31, 317.53, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 417.76, 426.58, 479.23, 372.1, 392.9, 378.91, 360.45, 399.97, 367.4], '1Y': [286.45, 288.71, 293.7, 303.76, 311.23, 289.6, 308.65, 306.1, 359.63, 345.35, 336.1, 338.18, 345.02, 354.15, 344.29, 376.47, 355.59, 339.98, 346.82, 402.96, 381.03, 406.37, 329.88, 352.13, 343.42, 352.21, 332.6, 332.79, 320.33, 340.44, 333.51, 332.31, 313.84, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 417.76, 426.58, 479.23, 372.1, 392.9, 378.91, 360.45, 399.97, 367.4] },
      velocityScore: { '1D': -0.4, '1W': 2.9, '1M': 35.7, '6M': null }, isNew: false,
      marketCap: '$1.7T', pe: 60.9, revenueGrowth: 48, eps: 6.03, grossMargin: 76, dividendYield: 0.69,
      etfPresence: { SOXX: 7.28, PSI: false, XSD: 2.6, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 3.41, proScore: 1.7, coverage: 0.5,
      price: 281.82, weeklyPrices: [298.57, 305.55, 301.19, 291.22, 281.82], weeklyChange: -5.61, dayChange: -3.23, sortRank: 0, periodReturns: { '1M': -6.6, 'YTD': 62.4, '6M': 47.1, '1Y': 30.1 },
      priceHistory: { '1D': [291.22, 282.79, 281.82], '1W': [298.57, 305.55, 301.19, 291.22, 281.82], '1M': [301.88, 322.86, 332.28, 304.36, 303.11, 311.81, 285.43, 285.48, 298.07, 298.41, 293.08, 303.5, 293.3, 301.32, 308.53, 311.46, 298.57, 305.55, 301.19, 291.22, 281.82], 'YTD': [173.49, 188.45, 191.58, 196.59, 225.21, 220.92, 223.32, 212.63, 197.98, 190.78, 187.19, 190.33, 199.74, 218.87, 236.31, 269.22, 289.44, 308.17, 298.39, 293.2, 290.9, 313.34, 303.11, 298.41, 311.46, 281.82], '6M': [189.59, 196.63, 225.21, 220.92, 223.32, 213.9, 202.39, 197.46, 194.45, 194.63, 194.14, 208.9, 216.29, 236.31, 269.22, 289.44, 306.34, 304.88, 315.95, 308.59, 282.01, 301.88, 311.81, 293.08, 311.46, 281.82], '1Y': [216.59, 185.69, 181.06, 185.91, 193.71, 200.71, 204.09, 187.29, 184.35, 181.62, 182.04, 182.32, 178.96, 175.48, 172.19, 160.51, 161.38, 162.23, 153.33, 168.27, 180.12, 181.67, 176.19, 176.88, 177.17, 189.07, 189.59, 196.63, 225.21, 220.92, 223.32, 213.9, 202.67, 197.46, 194.45, 194.63, 194.14, 208.9, 216.29, 236.31, 269.22, 289.44, 306.34, 304.88, 315.95, 308.59, 282.01, 301.88, 311.81, 293.08, 311.46, 281.82] },
      velocityScore: { '1D': 1.8, '1W': 4.3, '1M': 18.1, '6M': null }, isNew: false,
      marketCap: '$256B', pe: 48.2, revenueGrowth: 19, eps: 5.85, grossMargin: 57, dividendYield: 1.95,
      etfPresence: { SOXX: 4.14, PSI: false, XSD: 2.67, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 3.06, proScore: 1.53, coverage: 0.5,
      price: 259.58, weeklyPrices: [278.39, 283.87, 279.01, 270.66, 259.58], weeklyChange: -6.75, dayChange: -4.09, sortRank: 0, periodReturns: { '1M': -12.9, 'YTD': 19.6, '6M': 9.5, '1Y': 15.6 },
      priceHistory: { '1D': [270.66, 261.24, 259.58], '1W': [278.39, 283.87, 279.01, 270.66, 259.58], '1M': [298.2, 313.27, 323.24, 299.94, 294.06, 298.64, 277.02, 278.37, 281.03, 279.18, 273.36, 280.51, 273.15, 283.81, 290.54, 292.26, 278.39, 283.87, 279.01, 270.66, 259.58], 'YTD': [217.06, 237.89, 237.11, 231.05, 220.66, 236.62, 237.33, 232.23, 210.58, 190.86, 191.37, 191.66, 195.12, 209.89, 225.75, 289.25, 303.55, 294.17, 299.38, 311.38, 301.14, 315.88, 294.06, 279.18, 292.26, 259.58], '6M': [230.7, 229.42, 220.66, 236.62, 237.33, 235.07, 216.37, 203.03, 194.02, 196.4, 196.86, 204.27, 209.39, 225.75, 289.25, 303.55, 298.41, 310.15, 330.28, 321.88, 285.56, 298.2, 298.64, 273.36, 292.26, 259.58], '1Y': [224.5, 224.43, 213.77, 205.91, 231.54, 223.93, 239.07, 225.39, 223.21, 226.51, 226.81, 227.71, 221.42, 217.41, 220.73, 206.38, 206.45, 201.22, 184.19, 194.94, 226.16, 231.83, 222.08, 222.87, 223.88, 238.33, 230.7, 229.42, 220.66, 236.62, 237.33, 235.07, 215.25, 203.03, 194.02, 196.4, 196.86, 204.27, 209.39, 225.75, 289.25, 303.55, 298.41, 310.15, 330.28, 321.88, 285.56, 298.2, 298.64, 273.36, 292.26, 259.58] },
      velocityScore: { '1D': 2, '1W': 3.4, '1M': 11.7, '6M': null }, isNew: false,
      marketCap: '$66B', pe: 25.6, revenueGrowth: 12, eps: 10.15, grossMargin: 56, dividendYield: 1.5,
      etfPresence: { SOXX: 3.66, PSI: false, XSD: 2.45, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 2.96, proScore: 1.48, coverage: 0.5,
      price: 183.79, weeklyPrices: [217.53, 222.44, 206.26, 188.30, 183.79], weeklyChange: -15.51, dayChange: -2.4, sortRank: 0, periodReturns: { '1M': -36.5, 'YTD': 116.3, '6M': 128.4, '1Y': 155.2 },
      priceHistory: { '1D': [188.3, 184.27, 183.79], '1W': [217.53, 222.44, 206.26, 188.3, 183.79], '1M': [289.54, 310.58, 307.86, 279.04, 276.7, 281.26, 266.77, 277.75, 297.89, 272.05, 245.29, 249.27, 230.7, 231.71, 243.27, 235.81, 217.53, 222.44, 206.26, 188.3, 183.79], 'YTD': [84.98, 83.45, 80.46, 81.77, 75.54, 82.01, 79.09, 79.29, 75.68, 87.86, 87.91, 94.88, 109.38, 133.83, 157.32, 156.57, 172.15, 182.58, 190.69, 219.43, 288.85, 308.88, 276.7, 272.05, 235.81, 183.79], '6M': [79.8, 82.93, 75.54, 82.01, 79.09, 80.92, 78.09, 93.3, 90.79, 92.36, 99.05, 114.45, 134.6, 157.32, 156.57, 172.15, 177.95, 186.8, 204.83, 301.65, 252.59, 289.54, 281.26, 245.29, 235.81, 183.79], '1Y': [72.01, 74.04, 80.37, 75.85, 79.04, 71.21, 77.23, 64.1, 66.59, 74.23, 83.81, 86.2, 90.68, 88.23, 82.77, 88.57, 93.33, 87.52, 76.68, 89.4, 98.19, 89.43, 84.47, 86.34, 90.23, 82.89, 79.8, 82.93, 75.54, 82.01, 79.09, 80.92, 77.51, 93.3, 90.79, 92.36, 99.05, 114.45, 134.6, 157.32, 156.57, 172.15, 177.95, 186.8, 204.83, 301.65, 252.59, 289.54, 281.26, 245.29, 235.81, 183.79] },
      velocityScore: { '1D': -3.9, '1W': -14.5, '1M': -53.8, '6M': null }, isNew: false,
      marketCap: '$165B', pe: 63.2, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.13,
      etfPresence: { SOXX: 3.99, PSI: false, XSD: 1.94, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.82, proScore: 1.41, coverage: 0.5,
      price: 1256.48, weeklyPrices: [1291.38, 1376.41, 1352.66, 1305.65, 1256.48], weeklyChange: -2.7, dayChange: -3.76, sortRank: 0, periodReturns: { '1M': -13.2, 'YTD': 38.6, '6M': 21.6, '1Y': 76.1 },
      priceHistory: { '1D': [1305.65, 1257.14, 1256.48], '1W': [1291.38, 1376.41, 1352.66, 1305.65, 1256.48], '1M': [1448.21, 1563.7, 1537.88, 1423.76, 1434.95, 1438.3, 1313.32, 1312.77, 1382.36, 1331.73, 1288.16, 1346.13, 1272.81, 1315.51, 1374.13, 1352.74, 1291.38, 1376.41, 1352.66, 1305.65, 1256.48], 'YTD': [906.36, 959.09, 1033.17, 1068.14, 1164.83, 1142.02, 1188.32, 1180.13, 1078.44, 1052.59, 1068.85, 1053.01, 1191.22, 1363.42, 1522.04, 1526.84, 1652.35, 1613.97, 1561.25, 1542.39, 1559.18, 1652.29, 1434.95, 1331.73, 1352.74, 1256.48], '6M': [1034.49, 1095.49, 1164.83, 1142.02, 1188.32, 1231.95, 1099.02, 1055.82, 1066.66, 1101.59, 1093.35, 1312.94, 1353, 1522.04, 1526.84, 1652.35, 1650.35, 1553.27, 1633.17, 1689.89, 1473.04, 1448.21, 1438.3, 1288.16, 1352.74, 1256.48], '1Y': [713.57, 713, 711.24, 797.94, 848.81, 820.74, 858.46, 848.11, 840.38, 917.78, 891.39, 930.51, 979.25, 1026.83, 1070.8, 1087.56, 958.07, 924.29, 857.19, 928.17, 952.74, 981.48, 929.48, 946.32, 955.03, 967.16, 1034.49, 1095.49, 1164.83, 1142.02, 1188.32, 1231.95, 1074.37, 1055.82, 1066.66, 1101.59, 1093.35, 1312.94, 1353, 1522.04, 1526.84, 1652.35, 1650.35, 1553.27, 1633.17, 1689.89, 1473.04, 1448.21, 1438.3, 1288.16, 1352.74, 1256.48] },
      velocityScore: { '1D': 1.4, '1W': 5.2, '1M': 7.6, '6M': null }, isNew: false,
      marketCap: '$62B', pe: 89.9, revenueGrowth: 26, eps: 13.97, grossMargin: 55, dividendYield: 0.61,
      etfPresence: { SOXX: 3.34, PSI: false, XSD: 2.29, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 2.63, proScore: 1.32, coverage: 0.5,
      price: 166.33, weeklyPrices: [183.98, 178.10, 177.98, 170.61, 166.33], weeklyChange: -9.59, dayChange: -2.54, sortRank: 0, periodReturns: { '1M': -21.9, 'YTD': -2.8, '6M': 4.3, '1Y': 9 },
      priceHistory: { '1D': [170.67, 165.52, 166.33], '1W': [183.98, 178.1, 177.98, 170.61, 166.33], '1M': [212.97, 226.11, 221.9, 204.13, 197.41, 204.9, 189.39, 188.72, 184.79, 181.92, 176.25, 186.48, 182.97, 186.56, 191.11, 189.16, 183.98, 178.1, 177.98, 170.61, 166.33], 'YTD': [171.05, 181.87, 159.42, 154.52, 147.18, 140.09, 143.24, 145.59, 137, 129.82, 129.9, 127.11, 124.07, 132.84, 136.07, 156, 192.57, 200.08, 213.41, 228.99, 217.77, 220.81, 197.41, 181.92, 189.16, 166.33], '6M': [154.07, 153.04, 147.18, 140.09, 143.24, 145.82, 139.51, 135.2, 131.59, 128.67, 128.78, 127.51, 133.05, 136.07, 156, 192.57, 213.17, 202.51, 243.29, 250.01, 191.2, 212.97, 204.9, 176.25, 189.16, 166.33], '1Y': [152.61, 158.84, 146.76, 145.9, 158.09, 154.13, 160.8, 159.71, 161.51, 168.13, 169.68, 168.85, 165.66, 164.08, 170.03, 177.26, 173.2, 174.5, 159.59, 168.09, 174.35, 181.27, 174.19, 174.81, 176.31, 169.27, 154.07, 153.04, 147.18, 140.09, 143.24, 145.82, 138.13, 135.2, 131.59, 128.67, 128.78, 127.51, 133.05, 136.07, 156, 192.57, 213.17, 202.51, 243.29, 250.01, 191.2, 212.97, 204.9, 176.25, 189.16, 166.33] },
      velocityScore: { '1D': 0.8, '1W': -0.8, '1M': -12, '6M': null }, isNew: false,
      marketCap: '$175B', pe: 17.9, revenueGrowth: -4, eps: 9.3, grossMargin: 55, dividendYield: 2.16,
      etfPresence: { SOXX: 2.95, PSI: false, XSD: 2.32, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 2.47, proScore: 1.23, coverage: 0.5,
      price: 301.26, weeklyPrices: [362.05, 361.78, 350.62, 319.74, 301.26], weeklyChange: -16.79, dayChange: -5.78, sortRank: 0, periodReturns: { '1M': -19.6, 'YTD': 81.1, '6M': 65.5, '1Y': 207.6 },
      priceHistory: { '1D': [319.74, 302, 301.26], '1W': [362.05, 361.78, 350.62, 319.74, 301.26], '1M': [374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86, 406.42, 432.74, 382.89, 393.16, 417.45, 412.97, 362.05, 361.78, 350.62, 319.74, 301.26], 'YTD': [166.36, 156.73, 182, 163.25, 158.52, 182.86, 129.58, 124.67, 120, 120.31, 116.04, 112.47, 118.99, 170.6, 194.06, 196.85, 213.91, 228.64, 297.84, 320.09, 346.33, 389.2, 399.92, 430.86, 412.97, 301.26], '6M': [183.75, 170.93, 158.52, 182.86, 129.58, 128.15, 113.77, 116.48, 127.57, 121.76, 109.6, 125.46, 172.09, 194.06, 196.85, 213.91, 224.09, 287.48, 349.17, 363.54, 330.86, 374.68, 398, 406.42, 412.97, 301.26], '1Y': [97.95, 121.68, 136.73, 170.89, 190.69, 177.53, 189.15, 187.95, 232.9, 251.88, 200.64, 209.6, 225.43, 163.55, 163.64, 169.55, 162.83, 144.47, 139.29, 157.57, 152.51, 173.7, 145.88, 167.26, 167.11, 172.57, 183.75, 170.93, 158.52, 182.86, 129.58, 128.15, 109.8, 116.48, 127.57, 121.76, 109.6, 125.46, 172.09, 194.06, 196.85, 213.91, 224.09, 287.48, 349.17, 363.54, 330.86, 374.68, 398, 406.42, 412.97, 301.26] },
      velocityScore: { '1D': -3.9, '1W': -15.2, '1M': -28.1, '6M': null }, isNew: false,
      marketCap: '$52B', pe: 204.9, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.42, PSI: false, XSD: 2.51, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.38, proScore: 1.19, coverage: 0.5,
      price: 79.16, weeklyPrices: [84.23, 87.11, 86.26, 81.68, 79.16], weeklyChange: -6.02, dayChange: -3.09, sortRank: 0, periodReturns: { '1M': -15.9, 'YTD': 24.2, '6M': 6, '1Y': 6.5 },
      priceHistory: { '1D': [81.68, 79.36, 79.16], '1W': [84.23, 87.11, 86.26, 81.68, 79.16], '1M': [94.11, 99.77, 102.71, 93.26, 92.48, 94.12, 87.93, 89.06, 91.2, 88.69, 84.64, 87.59, 84.15, 85.49, 88.26, 88.59, 84.23, 87.11, 86.26, 81.68, 79.16], 'YTD': [63.72, 73.53, 74.7, 74.79, 76.66, 76.86, 79.11, 74.97, 67.81, 61.94, 62.97, 62, 67.51, 74.5, 82.48, 90.17, 102.92, 97.04, 91.11, 91.52, 91.37, 100.32, 92.48, 88.69, 88.59, 79.16], '6M': [73.17, 75.16, 76.66, 76.86, 79.11, 75.47, 69.9, 65.33, 64.59, 65.63, 64.61, 70.73, 74.49, 82.48, 90.17, 102.92, 96.71, 94.02, 96.04, 96.55, 87.91, 94.11, 94.12, 84.64, 88.59, 79.16], '1Y': [74.3, 67.81, 67.59, 66.22, 65.99, 66.1, 65.25, 64.43, 65.02, 66.26, 64.84, 66.13, 65.86, 65.35, 65.09, 62.07, 59.35, 54.81, 49.02, 53.58, 64.72, 69.09, 64.06, 64.94, 67.06, 73.39, 73.17, 75.16, 76.66, 76.86, 79.11, 75.47, 71.39, 65.33, 64.59, 65.63, 64.61, 70.73, 74.49, 82.48, 90.17, 102.92, 96.71, 94.02, 96.04, 96.55, 87.91, 94.11, 94.12, 84.64, 88.59, 79.16] },
      velocityScore: { '1D': 0, '1W': 2.6, '1M': 0.8, '6M': null }, isNew: false,
      marketCap: '$43B', pe: 359.8, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 2.23,
      etfPresence: { SOXX: 2.35, PSI: false, XSD: 2.41, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.07, proScore: 1.03, coverage: 0.5,
      price: 191.46, weeklyPrices: [236.88, 236.18, 226.74, 207.97, 191.46], weeklyChange: -19.17, dayChange: -7.94, sortRank: 0, periodReturns: { '1M': -23.2, 'YTD': 33.1, '6M': 26.8, '1Y': 94.5 },
      priceHistory: { '1D': [207.97, 192.07, 191.46], '1W': [236.88, 236.18, 226.74, 207.97, 191.46], '1M': [249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.09, 241.91, 265.55, 246.4, 258.69, 265.65, 257.79, 236.88, 236.18, 226.74, 207.97, 191.46], 'YTD': [143.89, 141.59, 150.97, 128.02, 111.31, 134.72, 127.91, 114.48, 114.74, 117.69, 103.4, 95.24, 106.79, 159.52, 189.49, 175.77, 198.29, 184.54, 193.39, 226.1, 222.27, 259.41, 268.99, 259.09, 257.79, 191.46], '6M': [153.22, 129.57, 111.31, 134.72, 127.91, 123.46, 102.54, 112.33, 104.06, 100.3, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 189.36, 182.98, 222.35, 214.6, 237.68, 249.33, 268.03, 241.91, 257.79, 191.46], '1Y': [98.45, 101.17, 111.55, 119.78, 117.33, 110.86, 131.82, 134, 159.32, 172.31, 144.94, 149.63, 151.15, 136.53, 150.97, 166.62, 162.74, 142.95, 134.73, 177.6, 180.92, 154.47, 138.57, 144.83, 140.24, 156.07, 153.22, 129.57, 111.31, 134.72, 127.91, 123.46, 97.3, 112.33, 104.06, 100.3, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 189.36, 182.98, 222.35, 214.6, 237.68, 249.33, 268.03, 241.91, 257.79, 191.46] },
      velocityScore: { '1D': -3.7, '1W': -12.7, '1M': -18.3, '6M': null }, isNew: false,
      marketCap: '$36B', pe: 76, revenueGrowth: 157, eps: 2.52, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 1.86, PSI: false, XSD: 2.27, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 1.96, proScore: 0.98, coverage: 0.5,
      price: 84.91, weeklyPrices: [90.37, 93.73, 92.54, 88.12, 84.91], weeklyChange: -6.04, dayChange: -3.64, sortRank: 0, periodReturns: { '1M': -24.8, 'YTD': 56.8, '6M': 40.7, '1Y': 42.9 },
      priceHistory: { '1D': [88.12, 84.89, 84.91], '1W': [90.37, 93.73, 92.54, 88.12, 84.91], '1M': [112.92, 121.62, 131.55, 117.06, 115.74, 118.74, 90.65, 88.57, 94.54, 94.63, 91.22, 94.69, 91.1, 93.79, 97.87, 95.96, 90.37, 93.73, 92.54, 88.12, 84.91], 'YTD': [54.15, 60.89, 60.33, 61.13, 59.43, 67.38, 70.66, 68.16, 60.85, 58.55, 59.26, 58.35, 63.79, 72.05, 88.99, 98.86, 105.77, 118.37, 109.61, 120.92, 120.9, 125.9, 115.74, 94.63, 95.96, 84.91], '6M': [60.06, 62.63, 59.43, 67.38, 70.66, 69.68, 62.53, 59.59, 60.98, 62.34, 61.92, 68.38, 72.43, 88.99, 98.86, 105.77, 115.71, 110.21, 123.77, 133.93, 110.17, 112.92, 118.74, 91.22, 95.96, 84.91], '1Y': [59.41, 55.44, 56.36, 47.59, 51.62, 48.81, 50.78, 48.06, 49.02, 51.83, 49.77, 48.74, 49.97, 52.97, 51.78, 50.85, 48.8, 48.13, 44.9, 50.24, 54.79, 55.97, 54.34, 54.93, 58.69, 58.75, 60.06, 62.63, 59.43, 67.38, 70.66, 69.68, 63.42, 59.59, 60.98, 62.34, 61.92, 68.38, 72.43, 88.99, 98.86, 105.77, 115.71, 110.21, 123.77, 133.93, 110.17, 112.92, 118.74, 91.22, 95.96, 84.91] },
      velocityScore: { '1D': 0, '1W': 0, '1M': -26.3, '6M': null }, isNew: false,
      marketCap: '$33B', pe: 65.3, revenueGrowth: 5, eps: 1.3, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 1.85, PSI: false, XSD: 2.07, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 2, avgWeight: 1.52, proScore: 0.76, coverage: 0.5,
      price: 263.24, weeklyPrices: [294.24, 301.76, 293.02, 275.49, 263.24], weeklyChange: -10.54, dayChange: -4.45, sortRank: 0, periodReturns: { '1M': -28.3, 'YTD': 53.7, '6M': 19.3, '1Y': 85.7 },
      priceHistory: { '1D': [275.49, 263.95, 263.24], '1W': [294.24, 301.76, 293.02, 275.49, 263.24], '1M': [367.11, 391.41, 396.26, 372.15, 373.08, 390.19, 369.18, 372.59, 380.37, 350.63, 322.26, 327.64, 304.82, 305.23, 317.35, 308.52, 294.24, 301.76, 293.02, 275.49, 263.24], 'YTD': [171.28, 167.66, 220.68, 218.89, 226.71, 230.54, 246.76, 247.11, 228.98, 217.8, 218.96, 225.44, 236.99, 263.92, 277, 269.63, 309.81, 383.56, 380.45, 353.79, 361.86, 384.77, 373.08, 350.63, 308.52, 263.24], '6M': [221.7, 219.2, 226.71, 230.54, 246.76, 253.37, 239, 220.59, 221.29, 237.23, 222.07, 247, 261.16, 277, 269.63, 309.81, 381.55, 375.71, 391.09, 390.34, 354.4, 367.11, 390.19, 322.26, 308.52, 263.24], '1Y': [141.76, 137.29, 137.14, 127.75, 125.4, 123.58, 133.89, 131.89, 131.07, 129.73, 123.88, 128.09, 132.98, 137.94, 139.31, 150.61, 166.92, 162.24, 155.39, 174.99, 187.06, 189.86, 171.47, 175.01, 170.76, 197.55, 221.7, 219.2, 226.71, 230.54, 246.76, 253.37, 241.01, 220.59, 221.29, 237.23, 222.07, 247, 261.16, 277, 269.63, 309.81, 381.55, 375.71, 391.09, 390.34, 354.4, 367.11, 390.19, 322.26, 308.52, 263.24] },
      velocityScore: { '1D': 0, '1W': -2.6, '1M': -18.3, '6M': null }, isNew: false,
      marketCap: '$20B', pe: 119.7, revenueGrowth: 23, eps: 2.2, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: 1.03, PSI: false, XSD: 2.01, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SWKS', name: 'SKYWORKS SOLUTIONS INC', easyScore: 2, avgWeight: 1.3, proScore: 0.65, coverage: 0.5,
      price: 57.59, weeklyPrices: [58.24, 56.58, 57.51, 57.63, 57.59], weeklyChange: -1.12, dayChange: -0.07, sortRank: 0, periodReturns: { '1M': -17, 'YTD': -9.2, '6M': -0.3, '1Y': -20.2 },
      priceHistory: { '1D': [57.63, 57.44, 57.59], '1W': [58.24, 56.58, 57.51, 57.63, 57.59], '1M': [69.38, 72.45, 76.18, 73.44, 71.4, 69.94, 68, 67.71, 67.8, 65.93, 62.56, 61.91, 59.76, 58.49, 59.95, 60.38, 58.24, 56.58, 57.51, 57.63, 57.59], 'YTD': [63.41, 60.66, 57.77, 59.76, 55.93, 62.31, 62, 59.61, 56.48, 54.74, 54.44, 53.65, 55.06, 57.28, 61.77, 62.66, 64.97, 67.06, 73.54, 75.49, 75.37, 76.26, 71.4, 65.93, 60.38, 57.59], '6M': [57.41, 60.05, 55.93, 62.31, 62, 59.82, 56.28, 54.93, 53.71, 55.36, 53.55, 56.54, 57.93, 61.77, 62.66, 64.97, 68.14, 74.35, 81.41, 80.66, 70.29, 69.38, 69.94, 62.56, 60.38, 57.59], '1Y': [72.2, 72.34, 68.54, 68.55, 75.36, 74.52, 75.1, 74.64, 74.68, 77.03, 79.36, 77.37, 73.64, 74.47, 75.78, 79.16, 70.64, 68.17, 60.5, 65.95, 69.01, 68.25, 64.49, 64.21, 65.16, 58.85, 57.41, 60.05, 55.93, 62.31, 62, 59.82, 58.15, 54.93, 53.71, 55.36, 53.55, 56.54, 57.93, 61.77, 62.66, 64.97, 68.14, 74.35, 81.41, 80.66, 70.29, 69.38, 69.94, 62.56, 60.38, 57.59] },
      velocityScore: { '1D': 6.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 24, revenueGrowth: -1, eps: 2.4, grossMargin: 41, dividendYield: 4.93,
      etfPresence: { SOXX: 0.47, PSI: false, XSD: 2.12, DRAM: false },
      tonyNote: 'SKYWORKS SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 9, avgWeight: 5.81, proScore: 3.08, coverage: 0.529,
      price: 202.11, weeklyPrices: [203.53, 211.80, 212.50, 207.40, 202.11], weeklyChange: -0.7, dayChange: -2.55, sortRank: 0, periodReturns: { '1M': -1.2, 'YTD': 8.4, '6M': 8.5, '1Y': 16.8 },
      priceHistory: { '1D': [207.4, 202.69, 202.11], '1W': [203.53, 211.8, 212.5, 207.4, 202.11], '1M': [204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83, 195.55, 196.93, 204.12, 202.78, 210.96, 203.53, 211.8, 212.5, 207.4, 202.11], 'YTD': [186.5, 185.04, 186.23, 186.47, 180.34, 188.54, 187.98, 184.89, 183.34, 180.25, 172.7, 167.52, 178.1, 196.51, 202.5, 209.25, 207.83, 235.74, 219.51, 224.36, 208.64, 212.45, 199, 197.58, 210.96, 202.11], '6M': [178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 223.47, 214.25, 214.75, 200.42, 204.65, 195.74, 194.83, 210.96, 202.11], '1Y': [173, 173.74, 177.87, 180.77, 182.02, 174.98, 180.17, 171.66, 177.17, 176.24, 177.69, 188.89, 192.57, 181.81, 182.16, 202.89, 188.08, 186.86, 180.64, 177, 183.38, 180.93, 174.14, 190.53, 188.12, 184.94, 178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 180.05, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 223.47, 214.25, 214.75, 200.42, 204.65, 195.74, 194.83, 210.96, 202.11] },
      velocityScore: { '1D': 7.3, '1W': 15.8, '1M': 38.7, '6M': null }, isNew: false,
      marketCap: '$4.9T', pe: 31, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.48,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.09, GTEK: false, ARKK: 1.71, MARS: false, FRWD: 9.18, BCTK: 6.2, FWD: 3.14, CBSE: 3.07, FCUS: false, WGMI: 2.33, CNEQ: 14.21, SGRT: false, SPMO: 8.36, XMMO: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 8, avgWeight: 5.85, proScore: 2.75, coverage: 0.471,
      price: 828.9, weeklyPrices: [937.00, 983.12, 904.28, 853.20, 828.90], weeklyChange: -11.54, dayChange: -2.85, sortRank: 0, periodReturns: { '1M': -20.5, 'YTD': 190.4, '6M': 128.5, '1Y': 631.9 },
      priceHistory: { '1D': [853.2, 825.41, 828.9], '1W': [937, 983.12, 904.28, 853.2, 828.9], '1M': [1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 938.38, 948.8, 991.64, 979.3, 937, 983.12, 904.28, 853.2, 828.9], 'YTD': [285.41, 327.02, 362.75, 389.09, 419.44, 373.25, 420.95, 415.56, 397.05, 426.13, 422.9, 357.22, 377.58, 465.66, 487.48, 518.46, 666.59, 776.01, 762.1, 1035.5, 949.28, 1087.99, 1048.51, 1032.28, 979.3, 828.9], '6M': [365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 923.52, 1079.57, 891.88, 1043.19, 1213.56, 975.56, 979.3, 828.9], '1Y': [113.26, 111.73, 109.14, 111.87, 125.29, 115.79, 122, 124.21, 150.57, 168.89, 156.83, 183.75, 192.33, 202.53, 206.71, 224.01, 238.33, 236.95, 201.37, 236.48, 226.65, 258.46, 248.55, 284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 420.95, 429, 379.68, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 923.52, 1079.57, 891.88, 1043.19, 1213.56, 975.56, 979.3, 828.9] },
      velocityScore: { '1D': -0.4, '1W': 0.7, '1M': 26.7, '6M': null }, isNew: false,
      marketCap: '$936B', pe: 18.7, revenueGrowth: 346, eps: 44.28, grossMargin: 73, dividendYield: 0.06,
      etfPresence: { PTF: 4.84, WCLD: false, IGV: false, FDTX: 9.33, GTEK: false, ARKK: false, MARS: false, FRWD: 4.18, BCTK: 4.41, FWD: false, CBSE: false, FCUS: 4.32, WGMI: false, CNEQ: 2.26, SGRT: 6.76, SPMO: 10.7, XMMO: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 8, avgWeight: 3.68, proScore: 1.73, coverage: 0.471,
      price: 481.14, weeklyPrices: [534.39, 548.13, 529.14, 500.94, 481.14], weeklyChange: -9.96, dayChange: -3.95, sortRank: 0, periodReturns: { '1M': -6.1, 'YTD': 124.7, '6M': 107.5, '1Y': 199.9 },
      priceHistory: { '1D': [500.94, 479.85, 481.14], '1W': [534.39, 548.13, 529.14, 500.94, 481.14], '1M': [512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 516.11, 517.41, 546.72, 557.89, 534.39, 548.13, 529.14, 500.94, 481.14], 'YTD': [214.16, 204.68, 231.83, 251.31, 242.11, 213.57, 200.12, 203.68, 199.45, 193.39, 201.33, 201.99, 221.53, 255.07, 303.46, 337.11, 421.39, 449.7, 449.59, 510.13, 490.33, 547.26, 519.74, 540.88, 557.89, 481.14], '6M': [231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 518.09, 542.52, 452.4, 512.48, 532.57, 517.82, 557.89, 481.14], '1Y': [160.41, 162.12, 176.31, 172.4, 180.95, 163.71, 168.58, 161.79, 155.67, 157.92, 161.27, 169.73, 232.89, 234.56, 234.99, 254.84, 237.7, 247.96, 206.02, 217.53, 215.98, 221.43, 201.06, 214.99, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 190.95, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 518.09, 542.52, 452.4, 512.48, 532.57, 517.82, 557.89, 481.14] },
      velocityScore: { '1D': -1.7, '1W': 11.6, '1M': 10.9, '6M': null }, isNew: false,
      marketCap: '$785B', pe: 159.8, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: 3.17, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.04, MARS: false, FRWD: 7.5, BCTK: 3.5, FWD: 2.3, CBSE: false, FCUS: false, WGMI: false, CNEQ: 1.07, SGRT: 3.55, SPMO: 4.33, XMMO: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 7, avgWeight: 4.36, proScore: 1.79, coverage: 0.412,
      price: 390.11, weeklyPrices: [421.58, 420.39, 419.48, 409.74, 390.11], weeklyChange: -7.46, dayChange: -4.86, sortRank: 0, periodReturns: { '1M': -9.7, 'YTD': 28.4, '6M': 13.9, '1Y': 58.8 },
      priceHistory: { '1D': [410.06, 390.5, 390.11], '1W': [421.58, 420.39, 419.48, 409.74, 390.11], '1M': [432.15, 462.12, 467.67, 436.39, 440.83, 434.99, 432.35, 455.1, 477.57, 444.23, 434.16, 451.79, 432.57, 436.98, 436.96, 434.11, 421.58, 420.39, 419.48, 409.74, 390.11], 'YTD': [303.89, 318.01, 342.4, 332.71, 335.75, 361.91, 362.26, 376.81, 353.86, 338.31, 329.24, 326.74, 345.32, 379.89, 387.44, 393.83, 419.5, 417.72, 407.15, 435.63, 426.8, 441.4, 440.83, 444.23, 434.11, 390.11], '6M': [327.16, 338.34, 335.75, 361.91, 362.26, 387.73, 357.44, 347.09, 345.98, 343.25, 337.95, 365.9, 375.1, 387.44, 393.83, 419.5, 399.8, 401.62, 424.86, 436.69, 408.75, 432.15, 434.99, 434.16, 434.11, 390.11], '1Y': [245.6, 241.6, 241.62, 242.62, 241, 227.33, 238.27, 235.21, 258.91, 268.64, 276.66, 288.11, 299.88, 299.84, 290.73, 303.22, 289.24, 282.2, 277.5, 291.51, 292.93, 304.85, 284.68, 302.84, 322.25, 331.77, 327.16, 338.34, 335.75, 361.91, 362.26, 387.73, 353.13, 347.09, 345.98, 343.25, 337.95, 365.9, 375.1, 387.44, 393.83, 419.5, 399.8, 401.62, 424.86, 436.69, 408.75, 432.15, 434.99, 434.16, 434.11, 390.11] },
      velocityScore: { '1D': -0.6, '1W': -2.7, '1M': -2.7, '6M': null }, isNew: false,
      marketCap: '$2.0T', pe: 29.2, revenueGrowth: 35, eps: 13.36, grossMargin: 62, dividendYield: 0.92,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6.39, GTEK: false, ARKK: 0.91, MARS: false, FRWD: 5.87, BCTK: 8.52, FWD: false, CBSE: 2.51, FCUS: false, WGMI: 0.72, CNEQ: 5.59, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 7, avgWeight: 3.97, proScore: 1.64, coverage: 0.412,
      price: 367.4, weeklyPrices: [384.05, 389.11, 394.28, 374.45, 367.40], weeklyChange: -4.34, dayChange: -1.88, sortRank: 0, periodReturns: { '1M': -6.5, 'YTD': 6.2, '6M': 4.5, '1Y': 28.3 },
      priceHistory: { '1D': [374.45, 366.83, 367.4], '1W': [384.05, 389.11, 394.28, 374.45, 367.4], '1M': [392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45, 373.9, 370.78, 388.69, 401.11, 399.97, 384.05, 389.11, 394.28, 374.45, 367.4], 'YTD': [346.1, 332.48, 351.71, 324.85, 320.33, 340.44, 333.51, 321.7, 332.77, 322.16, 310.51, 300.68, 333.97, 380.78, 422.65, 405.45, 425.44, 439.79, 414.57, 459.97, 396.6, 393.94, 382.07, 369.34, 399.97, 367.4], '6M': [332.6, 332.79, 320.33, 340.44, 333.51, 332.31, 317.53, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 417.76, 426.58, 479.23, 372.1, 392.9, 378.91, 360.45, 399.97, 367.4], '1Y': [286.45, 288.71, 293.7, 303.76, 311.23, 289.6, 308.65, 306.1, 359.63, 345.35, 336.1, 338.18, 345.02, 354.15, 344.29, 376.47, 355.59, 339.98, 346.82, 402.96, 381.03, 406.37, 329.88, 352.13, 343.42, 352.21, 332.6, 332.79, 320.33, 340.44, 333.51, 332.31, 313.84, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 417.76, 426.58, 479.23, 372.1, 392.9, 378.91, 360.45, 399.97, 367.4] },
      velocityScore: { '1D': -0.6, '1W': 6.5, '1M': 36.7, '6M': null }, isNew: false,
      marketCap: '$1.7T', pe: 60.9, revenueGrowth: 48, eps: 6.03, grossMargin: 76, dividendYield: 0.69,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.62, GTEK: false, ARKK: 1.11, MARS: false, FRWD: 5.08, BCTK: 7.15, FWD: 2.52, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.84, SGRT: false, SPMO: 6.5, XMMO: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'SPCX', name: 'SPACE EXPLORATION TECHN-CL A', easyScore: 6, avgWeight: 6.7, proScore: 2.36, coverage: 0.353,
      price: 126.32, weeklyPrices: [139.14, 136.08, 135.27, 131.11, 126.32], weeklyChange: -9.21, dayChange: -3.65, sortRank: 0, periodReturns: { '1M': -34.1, 'YTD': -21.5, '6M': -21.5, '1Y': -21.5 },
      priceHistory: { '1D': [131.11, 126.7, 126.32], '1W': [139.14, 136.08, 135.27, 131.11, 126.32], '1M': [191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 149.47, 148.3, 152.16, 145.3, 139.14, 136.08, 135.27, 131.11, 126.32], 'YTD': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 149.47, 148.3, 152.16, 145.3, 139.14, 136.08, 135.27, 131.11, 126.32], '6M': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 149.47, 148.3, 152.16, 145.3, 139.14, 136.08, 135.27, 131.11, 126.32], '1Y': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 149.47, 148.3, 152.16, 145.3, 139.14, 136.08, 135.27, 131.11, 126.32] },
      velocityScore: { '1D': 0.4, '1W': -6.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.7T', pe: null, revenueGrowth: 15, eps: -0.67, grossMargin: 49, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.39, MARS: 22.29, FRWD: 2.1, BCTK: 7.69, FWD: 1.35, CBSE: false, FCUS: false, WGMI: false, CNEQ: 2.37, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'SPACE EXPLORATION TECHN-CL A appears in 6 of 17 Broad Tech ETFs (35% coverage) with average weight 6.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 6, avgWeight: 5.33, proScore: 1.88, coverage: 0.353,
      price: 449.4, weeklyPrices: [555.55, 563.32, 513.84, 466.81, 449.40], weeklyChange: -19.11, dayChange: -3.73, sortRank: 0, periodReturns: { '1M': -36.9, 'YTD': 160.9, '6M': 102.9, '1Y': 570.5 },
      priceHistory: { '1D': [466.81, 445, 449.4], '1W': [555.55, 563.32, 513.84, 466.81, 449.4], '1M': [712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539, 577.46, 532.1, 550.3, 578.05, 582.59, 555.55, 563.32, 513.84, 466.81, 449.4], 'YTD': [172.27, 187.68, 221.51, 240.85, 290.24, 262.56, 296.56, 282.25, 259.03, 272.29, 293.1, 275.34, 311.96, 366.22, 389.1, 412.76, 483.15, 489.15, 486.46, 546.2, 526.93, 653.53, 643.83, 598.37, 582.59, 449.4], '6M': [222.97, 252.66, 290.24, 262.56, 296.56, 290.95, 261.3, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 459.62, 531.18, 594.11, 490.09, 712.13, 675.39, 539, 582.59, 449.4], '1Y': [67.02, 69.02, 78.69, 74.44, 76.24, 74.66, 82.04, 90.49, 96.15, 105.15, 107.21, 131.26, 119.7, 125.92, 125.72, 138.13, 163.6, 157.16, 140.23, 163.33, 161, 187.2, 175.01, 181.54, 187.88, 212.14, 222.97, 252.66, 290.24, 262.56, 296.56, 290.95, 250.61, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 459.62, 531.18, 594.11, 490.09, 712.13, 675.39, 539, 582.59, 449.4] },
      velocityScore: { '1D': -2.6, '1W': -7.8, '1M': 30.6, '6M': null }, isNew: false,
      marketCap: '$155B', pe: 26.9, revenueGrowth: 46, eps: 16.71, grossMargin: 45, dividendYield: 0.13,
      etfPresence: { PTF: 4.05, WCLD: false, IGV: false, FDTX: 4.49, GTEK: false, ARKK: false, MARS: false, FRWD: 4.16, BCTK: false, FWD: false, CBSE: false, FCUS: 4.18, WGMI: false, CNEQ: 3.96, SGRT: 11.12, SPMO: false, XMMO: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 6, avgWeight: 3.27, proScore: 1.15, coverage: 0.353,
      price: 245.63, weeklyPrices: [247.31, 247.49, 254.96, 249.89, 245.63], weeklyChange: -0.68, dayChange: -1.7, sortRank: 0, periodReturns: { '1M': 3.4, 'YTD': 6.4, '6M': 2.7, '1Y': 9.7 },
      priceHistory: { '1D': [249.89, 245.03, 245.63], '1W': [247.31, 247.49, 254.96, 249.89, 245.63], '1M': [237.5, 244.39, 232.79, 234.11, 234.27, 227.01, 232.69, 240.14, 238.34, 241.7, 242.67, 244.16, 245.98, 243.62, 247.04, 245.34, 247.31, 247.49, 254.96, 249.89, 245.63], 'YTD': [230.82, 246.29, 239.12, 238.42, 238.62, 206.96, 204.79, 207.92, 218.94, 207.67, 205.37, 199.34, 213.77, 249.02, 255.36, 263.04, 274.99, 267.22, 268.46, 261.26, 245.22, 246.02, 234.27, 241.7, 245.34, 245.63], '6M': [231, 244.68, 238.62, 206.96, 204.79, 210.64, 216.82, 214.33, 215.2, 207.24, 208.27, 221.25, 248.5, 255.36, 263.04, 274.99, 270.13, 265.01, 274, 250.02, 238, 237.5, 227.01, 242.67, 245.34, 245.63], '1Y': [223.88, 232.23, 234.11, 223.13, 230.98, 221.95, 231.6, 235.68, 229.95, 231.23, 218.15, 222.41, 227.74, 214.47, 221.09, 222.86, 243.04, 237.58, 217.14, 233.22, 229.11, 230.28, 226.76, 232.52, 233.06, 246.47, 231, 244.68, 238.62, 206.96, 204.79, 210.64, 208.73, 214.33, 215.2, 207.24, 208.27, 221.25, 248.5, 255.36, 263.04, 274.99, 270.13, 265.01, 274, 250.02, 238, 237.5, 227.01, 242.67, 245.34, 245.63] },
      velocityScore: { '1D': 33.7, '1W': 3.6, '1M': -0.9, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 29.3, revenueGrowth: 17, eps: 8.37, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.29, GTEK: false, ARKK: 2.58, MARS: false, FRWD: 3.19, BCTK: 4.33, FWD: 1.67, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.53, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'LRCX', name: 'Lam Research Corp', easyScore: 5, avgWeight: 4.36, proScore: 1.28, coverage: 0.294,
      price: 305.03, weeklyPrices: [329.92, 346.10, 335.43, 320.96, 305.03], weeklyChange: -7.54, dayChange: -4.96, sortRank: 0, periodReturns: { '1M': -18.5, 'YTD': 78.2, '6M': 36.8, '1Y': 202.6 },
      priceHistory: { '1D': [320.96, 304.88, 305.03], '1W': [329.92, 346.1, 335.43, 320.96, 305.03], '1M': [374.18, 389.04, 409.54, 371.33, 374.8, 401.82, 379.09, 410.91, 433.33, 391.26, 351.41, 350.2, 326.13, 333.15, 353.17, 350.33, 329.92, 346.1, 335.43, 320.96, 305.03], 'YTD': [171.18, 200.96, 222.96, 222.87, 230.1, 226.61, 240.09, 239.07, 214.68, 212.2, 228.36, 211.41, 224.35, 272.41, 265.55, 248.75, 297.17, 299.15, 302.24, 317.12, 324.45, 388.92, 374.8, 391.26, 350.33, 305.03], '6M': [222.41, 238.46, 230.1, 226.61, 240.09, 249.48, 222.99, 215.23, 226.47, 238.84, 213.66, 246.49, 265.16, 265.55, 248.75, 297.17, 295.44, 292.09, 318, 343.71, 321.8, 374.18, 401.82, 351.41, 350.33, 305.03], '1Y': [100.79, 97.78, 94.84, 99.15, 107.38, 98.41, 104.09, 100.42, 115.58, 126.32, 128.13, 146.99, 141, 142.37, 147.54, 161.01, 162.19, 153.32, 139.59, 156, 157.09, 168.71, 164.7, 178.07, 194.76, 220.4, 222.41, 238.46, 230.1, 226.61, 240.09, 249.48, 217.27, 215.23, 226.47, 238.84, 213.66, 246.49, 265.16, 265.55, 248.75, 297.17, 295.44, 292.09, 318, 343.71, 321.8, 374.18, 401.82, 351.41, 350.33, 305.03] },
      velocityScore: { '1D': -0.8, '1W': 1.6, '1M': -0.8, '6M': null }, isNew: false,
      marketCap: '$381B', pe: 57.6, revenueGrowth: 24, eps: 5.3, grossMargin: 50, dividendYield: 0.32,
      etfPresence: { PTF: 3.19, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.45, BCTK: 7.49, FWD: 1.87, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 3.79, XMMO: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 5, avgWeight: 4.24, proScore: 1.25, coverage: 0.294,
      price: 347.32, weeklyPrices: [350.67, 357.33, 370.21, 353.81, 347.32], weeklyChange: -0.96, dayChange: -1.83, sortRank: 0, periodReturns: { '1M': -4.1, 'YTD': 10.7, '6M': 5.1, '1Y': 88 },
      priceHistory: { '1D': [353.81, 346.62, 347.32], '1W': [350.67, 357.33, 370.21, 353.81, 347.32], '1M': [362.1, 367.46, 348.78, 346.08, 345.04, 342.19, 334.69, 351.28, 353.33, 357.89, 356.18, 364.9, 363.62, 358.71, 356.24, 355.03, 350.67, 357.33, 370.21, 353.81, 347.32], 'YTD': [313.8, 326.01, 330.34, 333.59, 340.7, 318.63, 303.94, 307.15, 300.91, 301.46, 298.79, 273.76, 303.93, 330.58, 337.73, 347.31, 395.14, 397.17, 383.47, 372.58, 361.17, 367.11, 345.04, 357.89, 355.03, 347.32], '6M': [322.16, 335, 340.7, 318.63, 303.94, 313.03, 303.45, 306.93, 309.41, 289.2, 286.86, 314.74, 334.47, 337.73, 347.31, 395.14, 399.04, 384.9, 386.12, 355.68, 353.32, 362.1, 342.19, 356.18, 355.03, 347.32], '1Y': [184.7, 193.2, 192.86, 197.28, 203.82, 200.62, 212.37, 232.66, 240.78, 252.33, 246.57, 246.43, 242.21, 251.88, 253.73, 281.9, 285.34, 279.12, 289.98, 320.12, 318.39, 313.7, 303.75, 314.96, 317.32, 332.73, 322.16, 335, 340.7, 318.63, 303.94, 313.03, 303.56, 306.93, 309.41, 289.2, 286.86, 314.74, 334.47, 337.73, 347.31, 395.14, 399.04, 384.9, 386.12, 355.68, 353.32, 362.1, 342.19, 356.18, 355.03, 347.32] },
      velocityScore: { '1D': 0, '1W': 0.8, '1M': 47.1, '6M': null }, isNew: false,
      marketCap: '$4.2T', pe: 27.7, revenueGrowth: 22, eps: 12.52, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.21, GTEK: false, ARKK: 1.96, MARS: false, FRWD: false, BCTK: 6.41, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 6.05, SGRT: false, SPMO: 3.57, XMMO: false },
      tonyNote: 'Alphabet Inc Class C appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 4.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 5, avgWeight: 4.15, proScore: 1.22, coverage: 0.294,
      price: 720.83, weeklyPrices: [860.66, 878.31, 828.30, 745.49, 720.83], weeklyChange: -16.25, dayChange: -3.32, sortRank: 0, periodReturns: { '1M': -32.4, 'YTD': 161.7, '6M': 121, '1Y': 391.3 },
      priceHistory: { '1D': [745.49, 713.43, 720.83], '1W': [860.66, 878.31, 828.3, 745.49, 720.83], '1M': [1066.07, 1070.23, 1094.04, 1038.59, 993.25, 1025.36, 899.9, 968.53, 965, 915.19, 820.16, 868.26, 827.64, 860.02, 890.09, 910.34, 860.66, 878.31, 828.3, 745.49, 720.83], 'YTD': [275.39, 284.47, 326.23, 358.29, 444.45, 396.23, 424.14, 409.67, 367.34, 383.71, 411.23, 380.07, 468.72, 533.44, 579.88, 643.3, 786.42, 804.76, 810.46, 921.26, 876.77, 1018.8, 993.25, 915.19, 910.34, 720.83], '6M': [325.99, 371.76, 444.45, 396.23, 424.14, 421.85, 375.01, 384.29, 421.09, 424.96, 391.76, 496.3, 519.6, 579.88, 643.3, 786.42, 817.35, 751.07, 880.72, 940.69, 815.99, 1066.07, 1025.36, 820.16, 910.34, 720.83], '1Y': [146.72, 152.73, 157.01, 148.1, 155.73, 154.6, 172.38, 183.98, 196.81, 216.64, 219.85, 254.74, 221.7, 226.03, 226.41, 268.34, 278.47, 262.56, 240.5, 276.69, 265.63, 307.85, 292, 286.22, 289.83, 321.48, 325.99, 371.76, 444.45, 396.23, 424.14, 421.85, 357.62, 384.29, 421.09, 424.96, 391.76, 496.3, 519.6, 579.88, 643.3, 786.42, 817.35, 751.07, 880.72, 940.69, 815.99, 1066.07, 1025.36, 820.16, 910.34, 720.83] },
      velocityScore: { '1D': -3.2, '1W': -1.6, '1M': -26.9, '6M': null }, isNew: false,
      marketCap: '$163B', pe: 68.6, revenueGrowth: 44, eps: 10.51, grossMargin: 42, dividendYield: 0.4,
      etfPresence: { PTF: 3.65, WCLD: false, IGV: false, FDTX: 4.14, GTEK: false, ARKK: false, MARS: false, FRWD: 6.99, BCTK: false, FWD: false, CBSE: false, FCUS: 4.13, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.85, XMMO: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc Class A', easyScore: 5, avgWeight: 2.31, proScore: 0.68, coverage: 0.294,
      price: 645.72, weeklyPrices: [656.73, 661.04, 681.31, 664.54, 645.72], weeklyChange: -1.68, dayChange: -2.83, sortRank: 0, periodReturns: { '1M': 13.8, 'YTD': -2.2, '6M': 4.1, '1Y': -7.9 },
      priceHistory: { '1D': [664.54, 644.75, 645.72], '1W': [656.73, 661.04, 681.31, 664.54, 645.72], '1M': [567.58, 577.22, 563.85, 562.2, 557.67, 542.87, 550.25, 562.6, 563.29, 612.91, 582.9, 600.29, 615.58, 603.12, 631.48, 669.21, 656.73, 661.04, 681.31, 664.54, 645.72], 'YTD': [660.09, 646.06, 620.25, 672.36, 691.7, 670.72, 643.22, 657.01, 660.57, 613.71, 593.66, 525.72, 575.05, 662.49, 674.72, 669.12, 612.88, 618.43, 607.38, 600.47, 585.39, 593.48, 557.67, 612.91, 669.21, 645.72], '6M': [604.12, 672.97, 691.7, 670.72, 643.22, 653.69, 667.73, 654.07, 622.66, 592.92, 572.13, 612.42, 671.58, 674.72, 669.12, 612.88, 616.63, 605.06, 635.29, 622.98, 570.98, 567.58, 542.87, 582.9, 669.21, 645.72], '1Y': [701.41, 714.8, 773.44, 761.83, 782.13, 739.1, 751.11, 748.65, 750.9, 780.25, 748.91, 727.05, 733.51, 712.07, 734, 666.47, 618.94, 609.89, 589.15, 647.95, 661.53, 652.71, 664.45, 663.29, 658.79, 641.97, 604.12, 672.97, 691.7, 670.72, 643.22, 653.69, 655.08, 654.07, 622.66, 592.92, 572.13, 612.42, 671.58, 674.72, 669.12, 612.88, 616.63, 605.06, 635.29, 622.98, 570.98, 567.58, 542.87, 582.9, 669.21, 645.72] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$1.6T', pe: 23.5, revenueGrowth: 33, eps: 27.51, grossMargin: 82, dividendYield: 0.32,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.36, GTEK: false, ARKK: 1.34, MARS: false, FRWD: false, BCTK: false, FWD: 1.19, CBSE: 3.16, FCUS: false, WGMI: false, CNEQ: 3.51, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, avgWeight: 5.28, proScore: 1.24, coverage: 0.235,
      price: 394.62, weeklyPrices: [390.99, 384.93, 395.63, 401.10, 394.62], weeklyChange: 0.93, dayChange: -1.62, sortRank: 0, periodReturns: { '1M': 4.1, 'YTD': -18.4, '6M': -14.2, '1Y': -22.9 },
      priceHistory: { '1D': [401.1, 394.05, 394.62], '1W': [390.99, 384.93, 395.63, 401.1, 394.62], '1M': [378.91, 379.4, 367.34, 373.94, 365.46, 352.83, 372.97, 368.57, 373.02, 384.28, 390.49, 386.74, 388.84, 383.34, 384.36, 385.1, 390.99, 384.93, 395.63, 401.1, 394.62], 'YTD': [483.62, 478.11, 459.86, 470.28, 411.21, 413.27, 399.6, 401.72, 410.68, 395.55, 381.87, 356.77, 372.29, 393.11, 432.92, 424.46, 413.96, 409.43, 419.09, 460.52, 411.74, 399.76, 365.46, 384.28, 385.1, 394.62], '6M': [454.52, 480.58, 411.21, 413.27, 399.6, 400.6, 405.2, 405.76, 399.41, 372.74, 370.17, 374.33, 411.22, 432.92, 424.46, 413.96, 405.21, 421.06, 426.99, 427.34, 397.36, 378.91, 352.83, 390.49, 385.1, 394.62], '1Y': [511.7, 510.88, 533.5, 520.84, 522.48, 504.24, 509.64, 507.97, 501.01, 508.45, 507.03, 515.74, 522.4, 511.61, 520.56, 525.76, 497.1, 503.29, 478.43, 492.01, 480.84, 483.47, 483.98, 487.71, 472.85, 477.18, 454.52, 480.58, 411.21, 413.27, 399.6, 400.6, 403.93, 405.76, 399.41, 372.74, 370.17, 374.33, 411.22, 432.92, 424.46, 413.96, 405.21, 421.06, 426.99, 427.34, 397.36, 378.91, 352.83, 390.49, 385.1, 394.62] },
      velocityScore: { '1D': 2.5, '1W': 5.1, '1M': 9.7, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 23.5, revenueGrowth: 18, eps: 16.81, grossMargin: 68, dividendYield: 0.91,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.39, FDTX: 2.93, GTEK: false, ARKK: false, MARS: false, FRWD: 3.15, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 6.65, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks', easyScore: 4, avgWeight: 4.67, proScore: 1.1, coverage: 0.235,
      price: 361.35, weeklyPrices: [330.30, 352.89, 354.02, 353.99, 361.35], weeklyChange: 9.4, dayChange: 2.08, sortRank: 0, periodReturns: { '1M': 28.1, 'YTD': 96.2, '6M': 92.6, '1Y': 84.1 },
      priceHistory: { '1D': [353.99, 354.35, 361.35], '1W': [330.3, 352.89, 354.02, 353.99, 361.35], '1M': [282.13, 287.78, 286.4, 290.92, 285.26, 293.09, 304.2, 332, 341.02, 352.04, 348.06, 357.53, 337.04, 320.59, 338.31, 325.91, 330.3, 352.89, 354.02, 353.99, 361.35], 'YTD': [184.2, 190.8, 187.66, 184.22, 166.24, 165.51, 152.35, 149.4, 163.16, 167.02, 162.95, 147.02, 169.87, 161.59, 181.2, 181.54, 183.68, 238.21, 252.92, 300.48, 266.33, 284.54, 285.26, 352.04, 325.91, 361.35], '6M': [184.06, 183.5, 166.24, 165.51, 152.35, 144.84, 158.56, 165.58, 169.19, 157.21, 160.32, 173.78, 164.11, 181.2, 181.54, 183.68, 227.79, 246.66, 257.77, 280.43, 263.22, 282.13, 293.09, 348.06, 325.91, 361.35], '1Y': [196.28, 201.16, 173.6, 168.1, 173.55, 183.32, 191.02, 192.35, 198.33, 205.68, 202.21, 209.3, 215.17, 205.51, 215.02, 218.27, 211.37, 204.77, 185.07, 190.13, 195.68, 190.36, 185.88, 188.45, 182.12, 188.88, 184.06, 183.5, 166.24, 165.51, 152.35, 144.84, 156.09, 165.58, 169.19, 157.21, 160.32, 173.78, 164.11, 181.2, 181.54, 183.68, 227.79, 246.66, 257.77, 280.43, 263.22, 282.13, 293.09, 348.06, 325.91, 361.35] },
      velocityScore: { '1D': 0, '1W': 1.9, '1M': -2.7, '6M': null }, isNew: false,
      marketCap: '$295B', pe: 319.8, revenueGrowth: 31, eps: 1.13, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.73, IGV: 10.4, FDTX: 4.15, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.39, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 4, avgWeight: 3.73, proScore: 0.88, coverage: 0.235,
      price: 131.67, weeklyPrices: [130.04, 133.72, 133.76, 134.44, 131.67], weeklyChange: 1.25, dayChange: -2.06, sortRank: 0, periodReturns: { '1M': 0.8, 'YTD': -25.9, '6M': -23, '1Y': -14.5 },
      priceHistory: { '1D': [134.44, 130.83, 131.67], '1W': [130.04, 133.72, 133.76, 134.44, 131.67], '1M': [130.63, 128.47, 119.5, 116.7, 113.5, 107.27, 112.93, 115.7, 116.67, 125.73, 129.3, 132.54, 134.37, 132.22, 129.04, 126.79, 130.04, 133.72, 133.76, 134.44, 131.67], 'YTD': [177.75, 176.86, 170.96, 167.47, 157.88, 139.51, 135.38, 135.94, 152.67, 150.95, 150.68, 143.06, 150.07, 135.7, 152.62, 137.97, 133.79, 133.73, 137.41, 160.65, 136.47, 134.71, 113.5, 125.73, 126.79, 131.67], '6M': [168.53, 165.7, 157.88, 139.51, 135.38, 134.19, 153.19, 151.14, 155.08, 154.78, 146.28, 140.76, 142.15, 152.62, 137.97, 133.79, 130.05, 137.15, 143.34, 142.2, 130.21, 130.63, 107.27, 129.3, 126.79, 131.67], '1Y': [153.99, 154.86, 158.35, 182.2, 181.02, 156.18, 158.12, 156.14, 164.36, 176.97, 179.12, 187.05, 185.47, 178.12, 180.48, 194.55, 175.05, 172.14, 155.74, 168.45, 177.92, 187.54, 185.69, 188.71, 174.04, 179.41, 168.53, 165.7, 157.88, 139.51, 135.38, 134.19, 147.22, 151.14, 155.08, 154.78, 146.28, 140.76, 142.15, 152.62, 137.97, 133.79, 130.05, 137.15, 143.34, 142.2, 130.21, 130.63, 107.27, 129.3, 126.79, 131.67] },
      velocityScore: { '1D': 2.3, '1W': 4.8, '1M': -9.3, '6M': null }, isNew: false,
      marketCap: '$316B', pe: 147.9, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.58, FDTX: 2, GTEK: false, ARKK: 3.16, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.17, XMMO: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 4, avgWeight: 3.19, proScore: 0.75, coverage: 0.235,
      price: 1385.68, weeklyPrices: [1673.97, 1757.82, 1615.00, 1411.08, 1385.68], weeklyChange: -17.22, dayChange: -1.8, sortRank: 0, periodReturns: { '1M': -29.3, 'YTD': 483.7, '6M': 235, '1Y': 3237.4 },
      priceHistory: { '1D': [1411.08, 1353, 1385.68], '1W': [1673.97, 1757.82, 1615, 1411.08, 1385.68], '1M': [1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 1745, 1744.43, 1617.7, 1727.18, 1858.27, 1915.92, 1673.97, 1757.82, 1615, 1411.08, 1385.68], 'YTD': [237.38, 334.54, 413.62, 470.8, 695.51, 541.64, 600.4, 651.9, 565.59, 661.62, 709.71, 615.83, 710.8, 944.46, 979.07, 1064.21, 1409.98, 1382.72, 1542.24, 1761.43, 1642, 2107.86, 1914.46, 2032.22, 1915.92, 1385.68], '6M': [453.12, 481.43, 695.51, 541.64, 600.4, 632.38, 599.06, 618.89, 720.17, 702.48, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1447.23, 1392.56, 1641.64, 1831.5, 1643.23, 1958.8, 2335, 1745, 1915.92, 1385.68], '1Y': [41.52, 42.06, 42.92, 40.69, 46.68, 45.5, 50.87, 62.5, 84.3, 98.87, 94.29, 124.14, 129.68, 144.27, 167.05, 195.82, 207.69, 243.57, 195.96, 223.28, 213.31, 241.61, 219.46, 250.05, 274.08, 389.27, 453.12, 481.43, 695.51, 541.64, 600.4, 632.38, 565.41, 618.89, 720.17, 702.48, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1447.23, 1392.56, 1641.64, 1831.5, 1643.23, 1958.8, 2335, 1745, 1915.92, 1385.68] },
      velocityScore: { '1D': -5.1, '1W': -2.6, '1M': -35.3, '6M': null }, isNew: false,
      marketCap: '$205B', pe: 47.4, revenueGrowth: 251, eps: 29.21, grossMargin: 56, dividendYield: null,
      etfPresence: { PTF: 4.7, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.58, CBSE: false, FCUS: 3.97, WGMI: false, CNEQ: false, SGRT: false, SPMO: 2.51, XMMO: false },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'SHOP', name: 'Shopify Inc Registered Shs -A- Subord Vtg', easyScore: 4, avgWeight: 3.12, proScore: 0.73, coverage: 0.235,
      price: 123.58, weeklyPrices: [124.74, 125.68, 123.55, 125.06, 123.58], weeklyChange: -0.93, dayChange: -1.18, sortRank: 0, periodReturns: { '1M': 14.3, 'YTD': -23.2, '6M': -20.7, '1Y': -2.5 },
      priceHistory: { '1D': [125.06, 123.3, 123.58], '1W': [124.74, 125.68, 123.55, 125.06, 123.58], '1M': [108.09, 108.85, 107.98, 107.68, 114.17, 111.62, 116.86, 114.21, 114.18, 121.63, 119.46, 120.14, 121.88, 119.22, 123.17, 122.54, 124.74, 125.68, 123.55, 125.06, 123.58], 'YTD': [160.97, 168.28, 155.81, 136.31, 119.29, 127.24, 121.64, 125.94, 134.79, 122.96, 116.78, 111.85, 117.06, 117.64, 131.96, 121.26, 105.44, 97.42, 104.86, 124.12, 110.78, 112.49, 114.17, 121.63, 122.54, 123.58], '6M': [144.5, 137.5, 119.29, 127.24, 121.64, 120.31, 129.65, 129.36, 127.8, 116.15, 118.62, 120.1, 127.41, 131.96, 121.26, 105.44, 95.4, 105.01, 115.03, 112.94, 108.2, 108.09, 111.62, 119.46, 122.54, 123.58], '1Y': [126.75, 122.08, 122.21, 151.07, 144.27, 136.68, 141.54, 145.15, 145.03, 152.11, 143.45, 151.3, 163.87, 156.57, 167.03, 173.61, 156.05, 146.34, 144.56, 158.64, 162.31, 164.75, 166.8, 170.83, 166.21, 167.93, 144.5, 137.5, 119.29, 127.24, 121.64, 120.31, 121.87, 129.36, 127.8, 116.15, 118.62, 120.1, 127.41, 131.96, 121.26, 105.44, 95.4, 105.01, 115.03, 112.94, 108.2, 108.09, 111.62, 119.46, 122.54, 123.58] },
      velocityScore: { '1D': 1.4, '1W': 4.3, '1M': -18, '6M': null }, isNew: false,
      marketCap: '$160B', pe: 120, revenueGrowth: 34, eps: 1.03, grossMargin: 48, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.59, GTEK: false, ARKK: 4.82, MARS: false, FRWD: 2.21, BCTK: 2.86, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Shopify Inc Registered Shs -A- Subord Vtg appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DDOG', name: 'DDOG', easyScore: 4, avgWeight: 3.01, proScore: 0.71, coverage: 0.235,
      price: 255.87, weeklyPrices: [260.24, 270.73, 264.46, 262.32, 255.87], weeklyChange: -1.68, dayChange: -2.46, sortRank: 0, periodReturns: { '1M': 12.9, 'YTD': 88.2, '6M': 115, '1Y': 78.7 },
      priceHistory: { '1D': [262.32, 253.57, 255.87], '1W': [260.24, 270.73, 264.46, 262.32, 255.87], '1M': [226.63, 223, 221.37, 220.57, 222.65, 220.94, 239.77, 248.57, 260.36, 264.48, 260.36, 255.37, 256.81, 261.09, 269, 257.54, 260.24, 270.73, 264.46, 262.32, 255.87], 'YTD': [135.99, 130.68, 119.02, 136.64, 119.66, 129.67, 121.78, 116.46, 122.36, 124.52, 125.08, 114.48, 116.54, 110.57, 132.14, 133.98, 143.71, 202.84, 218.04, 277.49, 231.68, 233.09, 222.65, 264.48, 257.54, 255.87], '6M': [117, 138.21, 119.66, 129.67, 121.78, 110.33, 118.33, 123.08, 128.87, 122.57, 118.05, 116.5, 121.06, 132.14, 133.98, 143.71, 205.31, 212.24, 225.24, 250.33, 227.63, 226.63, 220.94, 260.36, 257.54, 255.87], '1Y': [143.15, 146.56, 139.98, 136.38, 124.52, 129.15, 140.96, 131.78, 139.15, 136.81, 136.6, 151.57, 164.07, 151.17, 156.59, 157.07, 190.82, 185.97, 159.57, 160.01, 153, 149.9, 138.29, 138.32, 133.64, 126.57, 117, 138.21, 119.66, 129.67, 121.78, 110.33, 111.77, 123.08, 128.87, 122.57, 118.05, 116.5, 121.06, 132.14, 133.98, 143.71, 205.31, 212.24, 225.24, 250.33, 227.63, 226.63, 220.94, 260.36, 257.54, 255.87] },
      velocityScore: { '1D': 0, '1W': -2.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$91B', pe: 656.1, revenueGrowth: 32, eps: 0.39, grossMargin: 80, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.77, IGV: 3.17, FDTX: 2.39, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: 3.71, SPMO: false, XMMO: false },
      tonyNote: 'DDOG appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASML', name: 'ASML Holding', easyScore: 4, avgWeight: 2.88, proScore: 0.68, coverage: 0.235,
      price: 1737.7, weeklyPrices: [1726.04, 1775.64, 1815.27, 1784.87, 1737.70], weeklyChange: 0.68, dayChange: -2.64, sortRank: 0, periodReturns: { '1M': -7, 'YTD': 62.4, '6M': 27.9, '1Y': 133.3 },
      priceHistory: { '1D': [1784.87, 1736.74, 1737.7], '1W': [1726.04, 1775.64, 1815.27, 1784.87, 1737.7], '1M': [1867.83, 1929.68, 1929.25, 1778.46, 1762.77, 1841.18, 1794.62, 1883.11, 1989.44, 1843.04, 1769.32, 1825.07, 1747.28, 1768.65, 1804.25, 1797.32, 1726.04, 1775.64, 1815.27, 1784.87, 1737.7], 'YTD': [1069.86, 1194.32, 1358.57, 1413.35, 1395.88, 1413.62, 1468.72, 1463.8, 1368.36, 1345.69, 1317.25, 1302.47, 1306.45, 1518.3, 1443.66, 1394.08, 1544.74, 1584.51, 1592, 1628.57, 1749.04, 1892.66, 1762.77, 1843.04, 1797.32, 1737.7], '6M': [1326.07, 1454.59, 1395.88, 1413.62, 1468.72, 1526.51, 1399.37, 1383.4, 1389.16, 1399.42, 1320.83, 1421.05, 1481.77, 1443.66, 1394.08, 1544.74, 1581.58, 1550.13, 1605.77, 1726.36, 1734.19, 1867.83, 1841.18, 1769.32, 1797.32, 1737.7], '1Y': [744.91, 725.08, 694.71, 713.12, 755.21, 735.4, 763.46, 753.43, 804.16, 927.8, 949.55, 1030.17, 980.54, 1019.59, 1036.41, 1075.45, 1029.2, 1019.86, 981.04, 1060, 1110.08, 1122.84, 1036.31, 1072.75, 1228.19, 1281.23, 1326.07, 1454.59, 1395.88, 1413.62, 1468.72, 1526.51, 1360.94, 1383.4, 1389.16, 1399.42, 1320.83, 1421.05, 1481.77, 1443.66, 1394.08, 1544.74, 1581.58, 1550.13, 1605.77, 1726.36, 1734.19, 1867.83, 1841.18, 1769.32, 1797.32, 1737.7] },
      velocityScore: { '1D': 3, '1W': 3, '1M': -21.8, '6M': null }, isNew: false,
      marketCap: '$667B', pe: 55.3, revenueGrowth: 13, eps: 31.41, grossMargin: 53, dividendYield: 0.51,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 4.91, BCTK: 2.18, FWD: 1.84, CBSE: 2.59, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'ASML Holding appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC-CL A', easyScore: 4, avgWeight: 2.57, proScore: 0.61, coverage: 0.235,
      price: 347.65, weeklyPrices: [352.51, 359.51, 370.92, 354.46, 347.65], weeklyChange: -1.38, dayChange: -1.92, sortRank: 0, periodReturns: { '1M': -4.4, 'YTD': 11.1, '6M': 5.3, '1Y': 89.4 },
      priceHistory: { '1D': [354.46, 347.83, 347.65], '1W': [352.51, 359.51, 370.92, 354.46, 347.65], '1M': [363.79, 368.03, 349.68, 346.13, 345.29, 343.71, 337.39, 353.65, 357.37, 361.21, 359.91, 366.46, 367.03, 361.92, 358.89, 357.18, 352.51, 359.51, 370.92, 354.46, 347.65], 'YTD': [313, 325.44, 330, 333.26, 339.71, 318.58, 303.33, 307.38, 300.88, 302.28, 301, 274.34, 305.46, 332.91, 339.32, 349.94, 398.04, 401.07, 387.66, 376.37, 363.31, 369.35, 345.29, 361.21, 357.18, 347.65], '6M': [322, 334.55, 339.71, 318.58, 303.33, 312.9, 303.13, 307.04, 310.92, 290.44, 287.56, 317.32, 337.12, 339.32, 349.94, 398.04, 402.62, 388.91, 390.13, 358.99, 356.38, 363.79, 343.71, 359.91, 357.18, 347.65], '1Y': [183.58, 192.17, 191.9, 196.52, 202.94, 199.75, 211.64, 232.3, 240.37, 252.03, 245.79, 245.69, 241.53, 251.46, 253.08, 281.48, 284.75, 278.57, 289.45, 320.18, 317.62, 312.43, 302.46, 313.51, 316.54, 331.86, 322, 334.55, 339.71, 318.58, 303.33, 312.9, 303.58, 307.04, 310.92, 290.44, 287.56, 317.32, 337.12, 339.32, 349.94, 398.04, 402.62, 388.91, 390.13, 358.99, 356.38, 363.79, 343.71, 359.91, 357.18, 347.65] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$4.2T', pe: 27.8, revenueGrowth: 22, eps: 12.51, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 0.51, MARS: false, FRWD: 3.54, BCTK: false, FWD: 1.76, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 4.48, XMMO: false },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 3, avgWeight: 4.66, proScore: 2.79, coverage: 0.6,
      price: 384.55, weeklyPrices: [402.85, 415.52, 412.86, 396.27, 384.55], weeklyChange: -4.54, dayChange: -2.92, sortRank: 0, periodReturns: { '1M': -6.1, 'YTD': 20.7, '6M': 11.9, '1Y': 1 },
      priceHistory: { '1D': [396.12, 383.46, 384.55], '1W': [402.85, 415.52, 412.86, 396.27, 384.55], '1M': [409.64, 421.77, 435.78, 405.28, 404.59, 419.87, 402.68, 408.26, 426.12, 412.31, 398.52, 413.42, 395.68, 399.56, 405.83, 407.28, 402.85, 415.52, 412.86, 396.27, 384.55], 'YTD': [318.51, 320.58, 343.75, 332.28, 362.53, 377.47, 380.38, 374.59, 354.79, 355.4, 356.8, 357.36, 368.85, 401.9, 413.87, 410.77, 421.39, 408.1, 381.51, 400.08, 403.14, 407.06, 404.59, 412.31, 407.28, 384.55], '6M': [337.59, 341.19, 362.53, 377.47, 380.38, 373.53, 354.46, 361.06, 363.95, 374.1, 357.67, 385.58, 395.06, 413.87, 410.77, 421.39, 406.94, 379.69, 401.94, 421.21, 375.46, 409.64, 419.87, 398.52, 407.28, 384.55], '1Y': [380.72, 384.9, 384.72, 360.16, 355.1, 345.38, 355.34, 348.22, 360.08, 371.27, 364.74, 376.76, 377.19, 375.59, 372.4, 383.09, 377.4, 354.07, 328.19, 345.89, 338.93, 350.36, 315.95, 322.17, 322.26, 329.1, 337.59, 341.19, 362.53, 377.47, 380.38, 373.53, 355.56, 361.06, 363.95, 374.1, 357.67, 385.58, 395.06, 413.87, 410.77, 421.39, 406.94, 379.69, 401.94, 421.21, 375.46, 409.64, 419.87, 398.52, 407.28, 384.55] },
      velocityScore: { '1D': -1.4, '1W': 1.5, '1M': 4.9, '6M': null }, isNew: false,
      marketCap: '$149B', pe: 37.6, revenueGrowth: 17, eps: 10.22, grossMargin: 37, dividendYield: 1.11,
      etfPresence: { POW: 4.31, VOLT: 5.5, PBD: false, PBW: false, IVEP: 4.16 },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 3, avgWeight: 4.63, proScore: 2.78, coverage: 0.6,
      price: 612.6, weeklyPrices: [646.70, 660.94, 648.84, 631.02, 612.60], weeklyChange: -5.27, dayChange: -2.89, sortRank: 0, periodReturns: { '1M': -14.3, 'YTD': 45.1, '6M': 31.2, '1Y': 54 },
      priceHistory: { '1D': [630.82, 614.05, 612.6], '1W': [646.7, 660.94, 648.84, 631.02, 612.6], '1M': [714.85, 702.25, 740.14, 702.29, 701.88, 718.59, 687.87, 714.45, 720.04, 691.4, 668.31, 674.04, 656.79, 666.33, 668.17, 658.56, 646.7, 660.94, 648.84, 631.02, 612.6], 'YTD': [422.06, 413.17, 466.75, 470.77, 488.6, 510.64, 519.31, 565.05, 549.22, 559.02, 555.39, 549.98, 555.57, 594.4, 613.78, 628.6, 785.24, 780.08, 716.91, 687.48, 693.81, 724.35, 701.88, 691.4, 658.56, 612.6], '6M': [463.49, 479.27, 488.6, 510.64, 519.31, 562.77, 568.38, 564.05, 571.64, 578.44, 549.02, 576.24, 591.82, 613.78, 628.6, 785.24, 773.72, 709.93, 730.1, 715.67, 650.92, 714.85, 718.59, 668.31, 658.56, 612.6], '1Y': [397.9, 407.22, 406.13, 387.35, 377.51, 378.21, 385.96, 376.09, 389.64, 390.65, 400.41, 420.86, 429.92, 437.52, 427.36, 453.83, 442.9, 426.93, 429.78, 464.88, 464.84, 466.91, 421.31, 432.67, 435.82, 432.66, 463.49, 479.27, 488.6, 510.64, 519.31, 562.77, 566, 564.05, 571.64, 578.44, 549.02, 576.24, 591.82, 613.78, 628.6, 785.24, 773.72, 709.93, 730.1, 715.67, 650.92, 714.85, 718.59, 668.31, 658.56, 612.6] },
      velocityScore: { '1D': 0, '1W': -1.8, '1M': -5.1, '6M': null }, isNew: false,
      marketCap: '$92B', pe: 83.7, revenueGrowth: 26, eps: 7.32, grossMargin: 15, dividendYield: 0.07,
      etfPresence: { POW: 4.95, VOLT: 5.11, PBD: false, PBW: false, IVEP: 3.82 },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 3, avgWeight: 4.08, proScore: 2.45, coverage: 0.6,
      price: 90.2, weeklyPrices: [88.38, 89.54, 89.10, 89.35, 90.20], weeklyChange: 2.06, dayChange: 0.95, sortRank: 0, periodReturns: { '1M': 5.2, 'YTD': 12.4, '6M': 7.9, '1Y': 20 },
      priceHistory: { '1D': [89.36, 90.2, 90.2], '1W': [88.38, 89.54, 89.1, 89.35, 90.2], '1M': [85.73, 86.75, 86.08, 86.43, 87.62, 87.7, 88.56, 88.66, 87.77, 86.37, 88.34, 87.44, 88.47, 87.44, 87.1, 87.96, 88.38, 89.54, 89.1, 89.35, 90.2], 'YTD': [80.28, 79.49, 83.63, 85.47, 88.82, 90.83, 91.22, 91.99, 91.13, 92.78, 89.5, 91.4, 93.67, 91.31, 90, 94.17, 95.39, 95.68, 89.69, 83.66, 84.01, 86.12, 87.62, 86.37, 87.96, 90.2], '6M': [83.51, 87.15, 88.82, 90.83, 91.22, 95.11, 92.6, 91.54, 92.53, 91.62, 92.88, 94.17, 91.24, 90, 94.17, 95.39, 94.85, 88.27, 87.25, 84.58, 85.12, 85.73, 87.7, 88.34, 87.96, 90.2], '1Y': [75.18, 71.97, 71.06, 72.58, 72.24, 76.08, 72.09, 70.87, 71.32, 70.79, 74.65, 78.18, 83.71, 85.05, 83.25, 81.64, 82, 83.99, 84.3, 86.29, 83.39, 81.21, 80.85, 80.41, 81.32, 81.12, 83.51, 87.15, 88.82, 90.83, 91.22, 95.11, 92.59, 91.54, 92.53, 91.62, 92.88, 94.17, 91.24, 90, 94.17, 95.39, 94.85, 88.27, 87.25, 84.58, 85.12, 85.73, 87.7, 88.34, 87.96, 90.2] },
      velocityScore: { '1D': 2.9, '1W': 31, '1M': 16.7, '6M': null }, isNew: false,
      marketCap: '$188B', pe: 22.8, revenueGrowth: 7, eps: 3.95, grossMargin: 61, dividendYield: 2.79,
      etfPresence: { POW: 2.3, VOLT: 5.45, PBD: false, PBW: false, IVEP: 4.48 },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 3, avgWeight: 3.99, proScore: 2.4, coverage: 0.6,
      price: 984.93, weeklyPrices: [1042.60, 1066.01, 1055.28, 1036.22, 984.93], weeklyChange: -5.53, dayChange: -4.93, sortRank: 0, periodReturns: { '1M': -6.1, 'YTD': 50.7, '6M': 44.5, '1Y': 72.7 },
      priceHistory: { '1D': [1036.01, 992, 984.93], '1W': [1042.6, 1066.01, 1055.28, 1036.22, 984.93], '1M': [1048.86, 1109.73, 1127.59, 1034.98, 1057.65, 1085.47, 1045.17, 1102.51, 1174.86, 1134.35, 1113.11, 1152.04, 1077.08, 1070.99, 1075.26, 1091.57, 1042.6, 1066.01, 1055.28, 1036.22, 984.93], 'YTD': [653.57, 628.4, 681.55, 665.99, 780.25, 790.79, 817.55, 876.46, 815.01, 805.02, 851.07, 853.16, 910.75, 987.5, 1127.56, 1063.11, 1118.96, 1090.53, 1043.82, 950.54, 933.85, 979.07, 1057.65, 1134.35, 1091.57, 984.93], '6M': [684.86, 692.7, 780.25, 790.79, 817.55, 876.01, 841.27, 839.2, 844.05, 909.41, 872.9, 936.07, 985.92, 1127.56, 1063.11, 1118.96, 1062.57, 1024.52, 996, 959.36, 867.09, 1048.86, 1085.47, 1113.11, 1091.57, 984.93], '1Y': [570.17, 623.97, 660.29, 645.86, 625.27, 606, 633.69, 598.81, 634.15, 611, 607.52, 606.23, 634.27, 602, 595.15, 574.07, 550.17, 558.17, 558.03, 599.77, 629.11, 704.2, 639.43, 663.46, 680.86, 639.77, 684.86, 692.7, 780.25, 790.79, 817.55, 876.01, 842, 839.2, 844.05, 909.41, 872.9, 936.07, 985.92, 1127.56, 1063.11, 1118.96, 1062.57, 1024.52, 996, 959.36, 867.09, 1048.86, 1085.47, 1113.11, 1091.57, 984.93] },
      velocityScore: { '1D': 1.3, '1W': 0, '1M': 7.1, '6M': null }, isNew: false,
      marketCap: '$265B', pe: 28.8, revenueGrowth: 16, eps: 34.2, grossMargin: 20, dividendYield: 0.19,
      etfPresence: { POW: 3.54, VOLT: 4.46, PBD: false, PBW: false, IVEP: 3.98 },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 3, avgWeight: 3.27, proScore: 1.96, coverage: 0.6,
      price: 470.86, weeklyPrices: [477.03, 483.89, 479.92, 482.04, 470.86], weeklyChange: -1.29, dayChange: -2.33, sortRank: 0, periodReturns: { '1M': -7.5, 'YTD': 6, '6M': -3.8, '1Y': 7.7 },
      priceHistory: { '1W': [477.03, 483.89, 479.92, 482.04, 470.86], '1M': [508.87, 523.69, 539.39, 509.96, 518.18, 536.04, 517.02, 514.71, 523.2, 490.12, 487.1, 495.6, 478.89, 480.5, 485.41, 490.94, 477.03, 483.89, 479.92, 482.04, 470.86], 'YTD': [444.11, 460.87, 489.31, 486.82, 503.86, 503.1, 522.3, 524.19, 476.51, 467.38, 475.74, 480.97, 499.31, 545.62, 549.75, 545.93, 502.34, 482.03, 460.98, 462.93, 485.03, 489.73, 518.18, 490.12, 490.94, 470.86], '6M': [472.54, 484.14, 503.86, 503.1, 522.3, 527.9, 490.78, 478.06, 471.22, 505.62, 490.74, 527.21, 526.94, 549.75, 545.93, 502.34, 483.79, 463.32, 473.93, 484.91, 467.59, 508.87, 536.04, 487.1, 490.94, 470.86], '1Y': [437.23, 437.5, 437.48, 417.84, 437.67, 427.57, 445.8, 437.16, 450.93, 440.1, 420.44, 423.42, 418.89, 428.82, 433.27, 469.96, 461.47, 437.65, 407.36, 431.43, 437.71, 462.82, 434.85, 454.94, 465.48, 472.88, 472.54, 484.14, 503.86, 503.1, 522.3, 527.9, 488.49, 478.06, 471.22, 505.62, 490.74, 527.21, 526.94, 549.75, 545.93, 502.34, 483.79, 463.32, 473.93, 484.91, 467.59, 508.87, 536.04, 487.1, 490.94, 470.86] },
      velocityScore: { '1D': 3.2, '1W': 48.5, '1M': 10.7, '6M': null }, isNew: false,
      marketCap: '$25B', pe: 27.8, revenueGrowth: 11, eps: 16.92, grossMargin: 36, dividendYield: 1.18,
      etfPresence: { POW: 3.01, VOLT: 3.88, PBD: false, PBW: false, IVEP: 2.91 },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 3, avgWeight: 3.24, proScore: 1.94, coverage: 0.6,
      price: 148.62, weeklyPrices: [158.02, 161.78, 159.46, 153.65, 148.62], weeklyChange: -5.95, dayChange: -3.29, sortRank: 0, periodReturns: { '1M': -13.1, 'YTD': 45.7, '6M': 32.1, '1Y': 92.4 },
      priceHistory: { '1D': [153.67, 148.55, 148.62], '1W': [158.02, 161.78, 159.46, 153.65, 148.62], '1M': [170.94, 177.02, 184.34, 168.37, 167.55, 171.91, 162.92, 163.35, 169.61, 159.99, 152.15, 156.89, 153.18, 154.76, 158.05, 160.72, 158.02, 161.78, 159.46, 153.65, 148.62], 'YTD': [101.97, 102.72, 112.5, 110.58, 119.43, 112.15, 115.65, 121.79, 110.55, 109.93, 116.3, 116.98, 118.92, 134.48, 140.13, 137.37, 172.49, 173.96, 163.57, 171.55, 163.81, 169, 167.55, 159.99, 160.72, 148.62], '6M': [109.9, 113.16, 119.43, 112.15, 115.65, 121.8, 113.83, 109.13, 114.71, 125.61, 118.28, 127.11, 131.38, 140.13, 137.37, 172.49, 172.91, 161.86, 164.87, 176.39, 156.79, 170.94, 171.91, 152.15, 160.72, 148.62], '1Y': [77.23, 77.09, 78.42, 89.1, 89.8, 88.02, 92.58, 91.93, 95.71, 98.65, 96.6, 99.43, 97.73, 100.54, 100.62, 104.35, 109.97, 105.92, 101.52, 107.27, 108.27, 109.15, 98.28, 104.18, 106.61, 106.39, 109.9, 113.16, 119.43, 112.15, 115.65, 121.8, 111.65, 109.13, 114.71, 125.61, 118.28, 127.11, 131.38, 140.13, 137.37, 172.49, 172.91, 161.86, 164.87, 176.39, 156.79, 170.94, 171.91, 152.15, 160.72, 148.62] },
      velocityScore: { '1D': -1, '1W': 1.6, '1M': -4, '6M': null }, isNew: false,
      marketCap: '$24B', pe: 50.7, revenueGrowth: 54, eps: 2.93, grossMargin: 37, dividendYield: 0.55,
      etfPresence: { POW: 3.87, VOLT: 3.01, PBD: false, PBW: false, IVEP: 2.84 },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy Corp', easyScore: 3, avgWeight: 2.4, proScore: 1.44, coverage: 0.6,
      price: 200.05, weeklyPrices: [233.49, 243.40, 239.38, 206.73, 200.05], weeklyChange: -14.32, dayChange: -3.13, sortRank: 0, periodReturns: { '1M': -29.8, 'YTD': 130.2, '6M': 33.8, '1Y': 722.9 },
      priceHistory: { '1D': [206.5, 199.51, 200.05], '1W': [233.49, 243.4, 239.38, 206.73, 200.05], '1M': [284.99, 328.91, 345.85, 321.98, 326.19, 309.18, 252.02, 275.01, 302.7, 289.5, 270.89, 295.05, 269.57, 254.29, 257.02, 244.61, 233.49, 243.4, 239.38, 206.73, 200.05], 'YTD': [86.89, 121.84, 149.5, 139.62, 168.89, 148.7, 157.27, 168.57, 159.99, 154.51, 150.12, 133.24, 135.91, 219.03, 229.75, 287.97, 285.47, 303.41, 307.88, 273.51, 253.57, 274.5, 326.19, 289.5, 244.61, 200.05], '6M': [151.75, 152.31, 168.89, 148.7, 157.27, 174.77, 164.78, 154, 160.05, 145.88, 135.49, 146.78, 213.84, 229.75, 287.97, 285.47, 289.76, 282.31, 290.01, 287.32, 234.23, 284.99, 309.18, 270.89, 244.61, 200.05], '1Y': [24.31, 33.06, 37.39, 36.8, 45.11, 44.83, 54.8, 54.91, 67.29, 80.97, 68.69, 88, 86.65, 115.09, 101.42, 127.85, 136.86, 103.55, 93.38, 109.24, 118.09, 108.99, 80.21, 90.18, 103.87, 136.87, 151.75, 152.31, 168.89, 148.7, 157.27, 174.77, 153.02, 154, 160.05, 145.88, 135.49, 146.78, 213.84, 229.75, 287.97, 285.47, 289.76, 282.31, 290.01, 287.32, 234.23, 284.99, 309.18, 270.89, 244.61, 200.05] },
      velocityScore: { '1D': -11.7, '1W': -17.7, '1M': -36.8, '6M': null }, isNew: false,
      marketCap: '$57B', pe: null, revenueGrowth: 130, eps: -0.04, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: 1.32, VOLT: 3.11, PBD: false, PBW: false, IVEP: 2.78 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'NRG', name: 'NRG Energy Inc', easyScore: 3, avgWeight: 1.47, proScore: 0.88, coverage: 0.6,
      price: 129.52, weeklyPrices: [139.48, 138.36, 137.90, 132.75, 129.52], weeklyChange: -7.14, dayChange: -2.27, sortRank: 0, periodReturns: { '1M': -2, 'YTD': -18.7, '6M': -14.8, '1Y': -12.1 },
      priceHistory: { '1D': [132.53, 130.38, 129.52], '1W': [139.48, 138.36, 137.9, 132.75, 129.52], '1M': [132.13, 135.06, 138.91, 137.66, 142.21, 147.11, 149.36, 149.11, 146.06, 140.8, 136.7, 141.01, 138.01, 137.48, 140.48, 140.42, 139.48, 138.36, 137.9, 132.75, 129.52], 'YTD': [159.24, 143.53, 152.05, 149.93, 152.18, 156.43, 171.06, 181.34, 160.46, 152.87, 145.8, 147.74, 153.06, 170.96, 149.6, 149.01, 150.64, 134.72, 136.92, 129.47, 127.71, 130.4, 142.21, 140.8, 140.42, 129.52], '6M': [148.91, 156.04, 152.18, 156.43, 171.06, 183.59, 163.54, 155.15, 154.75, 151.13, 146.14, 160.3, 168.45, 149.6, 149.01, 150.64, 131.08, 133.98, 137.5, 133.76, 120.65, 132.13, 147.11, 136.7, 140.42, 129.52], '1Y': [147.38, 157.97, 167.2, 153.22, 153.78, 145.89, 148.66, 147.95, 157.92, 164.19, 162.96, 167.3, 168.25, 169.93, 163.81, 173.14, 170.1, 166.15, 160.46, 169.49, 169.36, 170.64, 154.64, 160.88, 161.59, 148.89, 148.91, 156.04, 152.18, 156.43, 171.06, 183.59, 162.06, 155.15, 154.75, 151.13, 146.14, 160.3, 168.45, 149.6, 149.01, 150.64, 131.08, 133.98, 137.5, 133.76, 120.65, 132.13, 147.11, 136.7, 140.42, 129.52] },
      velocityScore: { '1D': -1.1, '1W': 11.4, '1M': 18.9, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 140.8, revenueGrowth: 20, eps: 0.92, grossMargin: 16, dividendYield: 1.43,
      etfPresence: { POW: 0.53, VOLT: 1.01, PBD: false, PBW: false, IVEP: 2.86 },
      tonyNote: 'NRG Energy Inc appears in 3 of 5 Electrification ETFs (60% coverage) with average weight 1.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ITRI', name: 'ITRON INC', easyScore: 3, avgWeight: 1.35, proScore: 0.81, coverage: 0.6,
      price: 84.75, weeklyPrices: [83.39, 83.46, 83.99, 85.90, 84.75], weeklyChange: 1.62, dayChange: -1.34, sortRank: 0, periodReturns: { '1M': 6.9, 'YTD': -8.7, '6M': -15.3, '1Y': -38 },
      priceHistory: { '1W': [83.39, 83.46, 83.99, 85.9, 84.75], '1M': [79.26, 80.81, 81.76, 81.1, 81.61, 82.95, 83.87, 83.72, 86.53, 84.49, 85.11, 86.74, 84.44, 84.05, 84.99, 85.1, 83.39, 83.46, 83.99, 85.9, 84.75], 'YTD': [92.86, 98.44, 100.04, 98.38, 101.11, 105.57, 99.58, 96.08, 91.22, 90, 91.28, 85.6, 89.98, 96.36, 89.68, 82.69, 82.97, 81.53, 81.85, 84.79, 81.8, 80.71, 81.61, 84.49, 85.1, 84.75], '6M': [96.81, 99, 101.11, 105.57, 99.58, 97.15, 92.29, 93.04, 92.31, 92.69, 89.63, 92.99, 97.55, 89.68, 82.69, 82.97, 82.22, 81.35, 83.59, 82.12, 79.68, 79.26, 82.95, 85.11, 85.1, 84.75], '1Y': [136.61, 133.99, 124.54, 124.68, 125.37, 123.41, 123.48, 121.12, 120.5, 121.09, 122.71, 123.59, 126.61, 134.25, 134.01, 108.99, 105.99, 99.47, 94.21, 99.04, 99.16, 98.27, 94.56, 96.46, 96.73, 97.44, 96.81, 99, 101.11, 105.57, 99.58, 97.15, 93.94, 93.04, 92.31, 92.69, 89.63, 92.99, 97.55, 89.68, 82.69, 82.97, 82.22, 81.35, 83.59, 82.12, 79.68, 79.26, 82.95, 85.11, 85.1, 84.75] },
      velocityScore: { '1D': null, '1W': 47.3, '1M': null, '6M': null }, isNew: true,
      marketCap: '$4B', pe: 13.2, revenueGrowth: -3, eps: 6.4, grossMargin: 39, dividendYield: null,
      etfPresence: { POW: false, VOLT: 1.13, PBD: 1.13, PBW: 1.79, IVEP: false },
      tonyNote: 'ITRON INC appears in 3 of 5 Electrification ETFs (60% coverage) with average weight 1.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, avgWeight: 5.51, proScore: 2.21, coverage: 0.4,
      price: 265.31, weeklyPrices: [263.26, 279.39, 275.00, 266.80, 265.31], weeklyChange: 0.78, dayChange: -0.56, sortRank: 0, periodReturns: { '1M': -11.5, 'YTD': 56.4, '6M': 32.6, '1Y': 161.9 },
      priceHistory: { '1W': [263.26, 279.39, 275, 266.8, 265.31], '1M': [299.84, 296.39, 304.33, 288.64, 294.15, 310.32, 310.64, 315.65, 333.04, 318.06, 266.94, 277.45, 251.53, 258.67, 267.69, 272.58, 263.26, 279.39, 275, 266.8, 265.31], 'YTD': [169.63, 180.24, 200.11, 205.17, 217.25, 237.19, 221.19, 232.12, 202.58, 197.65, 204.09, 203.53, 210.32, 237.34, 262.68, 258.26, 286.89, 268.73, 260.4, 269.86, 279.13, 302.15, 294.15, 318.06, 272.58, 265.31], '6M': [201.17, 210.66, 217.25, 237.19, 221.19, 234.67, 213.8, 198.5, 209.52, 222.04, 197.98, 228.29, 236.04, 262.68, 258.26, 286.89, 266.92, 254.75, 276.96, 280.09, 276.95, 299.84, 310.32, 266.94, 272.58, 265.31], '1Y': [101.32, 102.98, 130.04, 132.61, 132.13, 128.91, 136.29, 143.06, 148.32, 150.97, 142.72, 142.44, 142.94, 148.88, 154.9, 150.62, 160.16, 146.49, 134.36, 154.03, 163.19, 175.36, 166.55, 176.45, 175.77, 188, 201.17, 210.66, 217.25, 237.19, 221.19, 234.67, 213.65, 198.5, 209.52, 222.04, 197.98, 228.29, 236.04, 262.68, 258.26, 286.89, 266.92, 254.75, 276.96, 280.09, 276.95, 299.84, 310.32, 266.94, 272.58, 265.31] },
      velocityScore: { '1D': -0.5, '1W': 4.7, '1M': -0.5, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 65.8, revenueGrowth: 17, eps: 4.03, grossMargin: 39, dividendYield: 0.1,
      etfPresence: { POW: 3.6, VOLT: 7.43, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 2, avgWeight: 5.36, proScore: 2.14, coverage: 0.4,
      price: 224.19, weeklyPrices: [225.66, 234.25, 247.01, 235.79, 224.19], weeklyChange: -0.65, dayChange: -4.92, sortRank: 0, periodReturns: { '1M': -23.8, 'YTD': 111, '6M': 60.1, '1Y': 184.4 },
      priceHistory: { '1D': [235.79, 227.66, 224.19], '1W': [225.66, 234.25, 247.01, 235.79, 224.19], '1M': [294.03, 297.2, 307.8, 291.5, 294.49, 309.2, 279.77, 281.09, 286.36, 264.86, 246.33, 248.05, 234.05, 231.85, 236.58, 232.19, 225.66, 234.25, 247.01, 235.79, 224.19], 'YTD': [106.26, 119.94, 139.99, 141.15, 151.08, 190.09, 180.99, 176.96, 167.67, 167.57, 172, 179.35, 201.7, 234.42, 242.77, 253.49, 320.3, 296.98, 270.75, 288.12, 293.6, 303.53, 294.49, 264.86, 232.19, 224.19], '6M': [142.76, 147.43, 151.08, 190.09, 180.99, 183, 170.96, 176.51, 174.04, 186.82, 180.36, 218.07, 229.73, 242.77, 253.49, 320.3, 300.84, 271.05, 288.9, 299.73, 262.34, 294.03, 309.2, 246.33, 232.19, 224.19], '1Y': [78.84, 80.05, 79.03, 77.8, 85.17, 83.64, 90.42, 90.24, 97.47, 101.43, 94.58, 102.51, 103.18, 112.77, 113.88, 125.9, 125, 109.4, 98.12, 107.74, 112.31, 120.91, 109.59, 113.62, 120.46, 128.85, 142.76, 147.43, 151.08, 190.09, 180.99, 183, 170.37, 176.51, 174.04, 186.82, 180.36, 218.07, 229.73, 242.77, 253.49, 320.3, 300.84, 271.05, 288.9, 299.73, 262.34, 294.03, 309.2, 246.33, 232.19, 224.19] },
      velocityScore: { '1D': -2.3, '1W': 2.9, '1M': -32.1, '6M': null }, isNew: false,
      marketCap: '$8B', pe: 45.9, revenueGrowth: 7, eps: 4.88, grossMargin: 30, dividendYield: 0.15,
      etfPresence: { POW: 4.39, VOLT: 6.33, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, avgWeight: 3.72, proScore: 1.49, coverage: 0.4,
      price: 135.33, weeklyPrices: [135.63, 134.94, 132.50, 133.13, 135.33], weeklyChange: -0.22, dayChange: 1.65, sortRank: 0, periodReturns: { '1M': 5.5, 'YTD': 17.4, '6M': 12.8, '1Y': 27.8 },
      priceHistory: { '1D': [133.13, 134.98, 135.33], '1W': [135.63, 134.94, 132.5, 133.13, 135.33], '1M': [128.27, 127.69, 130.3, 133.74, 134.96, 137, 138.69, 137.97, 136.81, 135.05, 138.51, 135.98, 137.53, 135.9, 133.85, 135.43, 135.63, 134.94, 132.5, 133.13, 135.33], 'YTD': [115.31, 115.93, 119.96, 118.02, 120.67, 121.23, 127.27, 132.1, 132.04, 133.61, 125.66, 130.1, 132.92, 135.46, 131.62, 134.44, 132.56, 128.6, 129.61, 123.79, 126.77, 129.31, 134.96, 135.05, 135.43, 135.33], '6M': [119.22, 119.43, 120.67, 121.23, 127.27, 132.46, 133.52, 132.31, 133.62, 128.8, 131.08, 134.71, 134.39, 131.62, 134.44, 132.56, 127.95, 128.87, 127.76, 126.31, 128.53, 128.27, 137, 138.51, 135.43, 135.33], '1Y': [105.93, 108.97, 113.14, 113.73, 112.86, 113.14, 111.78, 108.64, 108.74, 106.44, 107.86, 113.46, 116.91, 117.53, 116.18, 121.89, 119.53, 121.48, 120.9, 123.77, 118.04, 114.26, 115.58, 115.67, 114.07, 116.57, 119.22, 119.43, 120.67, 121.23, 127.27, 132.46, 131.92, 132.31, 133.62, 128.8, 131.08, 134.71, 134.39, 131.62, 134.44, 132.56, 127.95, 128.87, 127.76, 126.31, 128.53, 128.27, 137, 138.51, 135.43, 135.33] },
      velocityScore: { '1D': 2.8, '1W': 0.7, '1M': 34.2, '6M': null }, isNew: false,
      marketCap: '$74B', pe: 20, revenueGrowth: 10, eps: 6.76, grossMargin: 47, dividendYield: 2.85,
      etfPresence: { POW: 2.89, VOLT: 4.56, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 2, avgWeight: 3.26, proScore: 1.3, coverage: 0.4,
      price: 276.44, weeklyPrices: [305.87, 303.58, 304.57, 294.11, 276.44], weeklyChange: -9.62, dayChange: -6.04, sortRank: 0, periodReturns: { '1M': -13, 'YTD': 70.6, '6M': 56.2, '1Y': 110.8 },
      priceHistory: { '1D': [294.21, 276.4, 276.44], '1W': [305.87, 303.58, 304.57, 294.11, 276.44], '1M': [317.58, 333.05, 357.96, 318.32, 316.43, 325.57, 303.95, 306.97, 334.82, 311.42, 300.53, 318.47, 305.58, 317.81, 323.92, 318.86, 305.87, 303.58, 304.57, 294.11, 276.44], 'YTD': [162.01, 160.78, 176.93, 181.23, 190.15, 199.62, 243.21, 259.23, 249.75, 258.88, 255.88, 251.07, 262.3, 310.51, 305.14, 306.18, 358.92, 376.23, 323.4, 323.39, 300.57, 311.93, 316.43, 311.42, 318.86, 276.44], '6M': [175.18, 189.21, 190.15, 199.62, 243.21, 262.19, 251.28, 270.06, 268.41, 270.89, 250.58, 281.03, 301.16, 305.14, 306.18, 358.92, 369.99, 315.67, 314.18, 331.44, 280.98, 317.58, 325.57, 300.53, 318.86, 276.44], '1Y': [131.12, 130.87, 145.6, 139.39, 132.52, 126.58, 134.23, 125.7, 135.71, 141.96, 139.77, 161.64, 168.88, 177.82, 183.2, 193.76, 183.02, 163.64, 159.61, 179.73, 182.54, 178.66, 154.39, 167.58, 173.95, 170.03, 175.18, 189.21, 190.15, 199.62, 243.21, 262.19, 244.44, 270.06, 268.41, 270.89, 250.58, 281.03, 301.16, 305.14, 306.18, 358.92, 369.99, 315.67, 314.18, 331.44, 280.98, 317.58, 325.57, 300.53, 318.86, 276.44] },
      velocityScore: { '1D': -0.8, '1W': -5.8, '1M': 4.8, '6M': null }, isNew: false,
      marketCap: '$106B', pe: 69.6, revenueGrowth: 30, eps: 3.97, grossMargin: 37, dividendYield: 0.09,
      etfPresence: { POW: false, VOLT: 2.44, PBD: false, PBW: false, IVEP: 4.07 },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 3.12, proScore: 1.25, coverage: 0.4,
      price: 74.92, weeklyPrices: [74.46, 75.98, 74.38, 74.73, 74.92], weeklyChange: 0.62, dayChange: 0.19, sortRank: 0, periodReturns: { '1M': 5.2, 'YTD': 24.6, '6M': 21.7, '1Y': 29 },
      priceHistory: { '1D': [74.78, 74.96, 74.92], '1W': [74.46, 75.98, 74.38, 74.73, 74.92], '1M': [71.25, 73.12, 74.95, 75.79, 75.87, 77.53, 77.92, 75.06, 74.34, 72.77, 73.14, 72.82, 75.08, 75.27, 75.45, 75.02, 74.46, 75.98, 74.38, 74.73, 74.92], 'YTD': [60.11, 61.15, 61.55, 64.29, 68.5, 68.84, 72.14, 74.77, 74.77, 73.34, 72.41, 73.58, 74.04, 71.44, 71.1, 73.32, 73.76, 77.69, 77.52, 70.04, 71.59, 71.49, 75.87, 72.77, 75.02, 74.92], '6M': [61.51, 65.48, 68.5, 68.84, 72.14, 73.97, 75.77, 73.84, 73.69, 74.46, 72.78, 73.01, 70.76, 71.1, 73.32, 73.76, 75.71, 77.88, 73.13, 71.66, 72.26, 71.25, 77.53, 73.14, 75.02, 74.92], '1Y': [58.09, 58.75, 59.95, 57.89, 57.34, 57.8, 58, 57.58, 59.33, 60.38, 63.31, 64.06, 63.1, 62.53, 58.93, 57.62, 57.94, 59.59, 58.91, 60.93, 63.66, 60.92, 58.66, 59.52, 61.16, 59.56, 61.51, 65.48, 68.5, 68.84, 72.14, 73.97, 75.88, 73.84, 73.69, 74.46, 72.78, 73.01, 70.76, 71.1, 73.32, 73.76, 75.71, 77.88, 73.13, 71.66, 72.26, 71.25, 77.53, 73.14, 75.02, 74.92] },
      velocityScore: { '1D': 3.3, '1W': 11.6, '1M': 25, '6M': null }, isNew: false,
      marketCap: '$92B', pe: 32.9, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.81,
      etfPresence: { POW: false, VOLT: 2.09, PBD: false, PBW: false, IVEP: 4.14 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 3.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CEG', name: 'Constellation Energy Corp', easyScore: 2, avgWeight: 2.76, proScore: 1.1, coverage: 0.4,
      price: 246.38, weeklyPrices: [257.57, 256.43, 258.11, 251.77, 246.38], weeklyChange: -4.34, dayChange: -2.14, sortRank: 0, periodReturns: { '1M': -7.8, 'YTD': -30.3, '6M': -19.9, '1Y': -20 },
      priceHistory: { '1D': [251.77, 245.55, 246.38], '1W': [257.57, 256.43, 258.11, 251.77, 246.38], '1M': [267.17, 274.06, 275.53, 270.26, 267.97, 268.69, 264.02, 259.32, 248.37, 236.5, 239.25, 245.87, 239.71, 244.52, 250.74, 251.38, 257.57, 256.43, 258.11, 251.77, 246.38], 'YTD': [353.27, 322.54, 307.71, 285.27, 268.45, 271.14, 294.05, 323.56, 332.07, 301.77, 281.99, 301.49, 272.58, 296.61, 287.16, 297, 322.78, 275.26, 285.83, 265.7, 250.67, 262.35, 267.97, 236.5, 251.38, 246.38], '6M': [295.4, 288.76, 268.45, 271.14, 294.05, 325.84, 322.85, 317.09, 307.69, 294.85, 279.25, 284.27, 294.73, 287.16, 297, 322.78, 274.89, 281.26, 286.31, 267.24, 242.3, 267.17, 268.69, 239.25, 251.38, 246.38], '1Y': [308.08, 321.67, 347.84, 336.41, 326.21, 312.52, 319.55, 309.06, 318, 322.71, 326.33, 357.46, 383.23, 396.53, 365.8, 382.48, 351.3, 335.74, 345.78, 364.36, 368.62, 378.6, 361.05, 360.46, 354.94, 335.86, 295.4, 288.76, 268.45, 271.14, 294.05, 325.84, 324.87, 317.09, 307.69, 294.85, 279.25, 284.27, 294.73, 287.16, 297, 322.78, 274.89, 281.26, 286.31, 267.24, 242.3, 267.17, 268.69, 239.25, 251.38, 246.38] },
      velocityScore: { '1D': 0, '1W': null, '1M': 15.8, '6M': null }, isNew: false,
      marketCap: '$88B', pe: 21.9, revenueGrowth: 64, eps: 11.23, grossMargin: 23, dividendYield: 0.68,
      etfPresence: { POW: 1.34, VOLT: false, PBD: false, PBW: false, IVEP: 4.17 },
      tonyNote: 'Constellation Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'APH', name: 'Amphenol Corp', easyScore: 2, avgWeight: 2.73, proScore: 1.09, coverage: 0.4,
      price: 148.33, weeklyPrices: [155.99, 158.37, 157.04, 153.14, 148.33], weeklyChange: -4.91, dayChange: -3.17, sortRank: 0, periodReturns: { '1M': -7.9, 'YTD': 9.8, '6M': -3.9, '1Y': 45.5 },
      priceHistory: { '1D': [153.19, 149.41, 148.33], '1W': [155.99, 158.37, 157.04, 153.14, 148.33], '1M': [161.11, 163.96, 165.96, 158.7, 162.78, 165.15, 163.72, 166.42, 176.32, 172.22, 164.59, 166.81, 158.61, 158.22, 162.24, 159.06, 155.99, 158.37, 157.04, 153.14, 148.33], 'YTD': [135.14, 136.25, 154.39, 155.56, 147.06, 144.14, 147.73, 148.47, 136.24, 133.92, 126.74, 123.62, 128.38, 148.72, 148.13, 148.38, 138.47, 129.19, 124.86, 146.34, 143.6, 158.59, 162.78, 172.22, 159.06, 148.33], '6M': [152.33, 166.25, 147.06, 144.14, 147.73, 152.64, 132.75, 136.74, 135.12, 127.96, 126.35, 135.32, 146.98, 148.13, 148.38, 138.47, 124.64, 123.05, 147.68, 147.62, 149.22, 161.11, 165.15, 164.59, 159.06, 148.33], '1Y': [101.96, 104.46, 106.51, 108.55, 110.74, 108.81, 111.94, 112.75, 119.47, 122.07, 122.33, 123.58, 126.25, 127.36, 135.31, 139.11, 138.11, 135.25, 130.36, 140.9, 139.46, 139.09, 129.61, 137.43, 139.88, 145.11, 152.33, 166.25, 147.06, 144.14, 147.73, 152.64, 129.58, 136.74, 135.12, 127.96, 126.35, 135.32, 146.98, 148.13, 148.38, 138.47, 124.64, 123.05, 147.68, 147.62, 149.22, 161.11, 165.15, 164.59, 159.06, 148.33] },
      velocityScore: { '1D': -0.9, '1W': null, '1M': 2.8, '6M': null }, isNew: false,
      marketCap: '$182B', pe: 42.6, revenueGrowth: 58, eps: 3.48, grossMargin: 38, dividendYield: 0.65,
      etfPresence: { POW: 1.04, VOLT: 4.43, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'JCI', name: 'JOHNSON CONTROLS INTERNATIONAL PLC', easyScore: 2, avgWeight: 2.71, proScore: 1.08, coverage: 0.4,
      price: 138.03, weeklyPrices: [143.93, 145.24, 142.76, 141.26, 138.03], weeklyChange: -4.1, dayChange: -2.31, sortRank: 0, periodReturns: { '1M': -3.9, 'YTD': 15.3, '6M': 20.4, '1Y': 26.7 },
      priceHistory: { '1D': [141.29, 138.02, 138.03], '1W': [143.93, 145.24, 142.76, 141.26, 138.03], '1M': [143.62, 144.82, 148.21, 141.28, 142.81, 145.49, 138.4, 140.47, 146.11, 144.8, 140.76, 142.72, 140.62, 140.23, 140.53, 142.81, 143.93, 145.24, 142.76, 141.26, 138.03], 'YTD': [119.75, 111.29, 114.61, 115.07, 124.01, 138.75, 139.48, 143.42, 137.18, 130.16, 129.7, 131.29, 133.15, 142.05, 139.81, 141.35, 143.14, 145.03, 135.47, 133.91, 144.05, 146.06, 142.81, 144.8, 142.81, 138.03], '6M': [114.56, 116.96, 124.01, 138.75, 139.48, 144.49, 140, 133.94, 132.56, 136.43, 130.95, 139, 137.21, 139.81, 141.35, 143.14, 143.8, 137.75, 136.15, 146.96, 139.36, 143.62, 145.49, 140.76, 142.81, 138.03], '1Y': [108.95, 110.02, 105, 104.31, 105.02, 104.75, 108.65, 107.09, 107.82, 108.48, 105.77, 108.66, 107.76, 109.37, 110.55, 114.21, 122.25, 120.2, 112.99, 116.31, 114.2, 118.06, 117.74, 122.06, 121.53, 111.39, 114.56, 116.96, 124.01, 138.75, 139.48, 144.49, 139.58, 133.94, 132.56, 136.43, 130.95, 139, 137.21, 139.81, 141.35, 143.14, 143.8, 137.75, 136.15, 146.96, 139.36, 143.62, 145.49, 140.76, 142.81, 138.03] },
      velocityScore: { '1D': 1.9, '1W': 3.8, '1M': 6.9, '6M': null }, isNew: false,
      marketCap: '$84B', pe: 42.3, revenueGrowth: 8, eps: 3.26, grossMargin: 37, dividendYield: 1.13,
      etfPresence: { POW: false, VOLT: 1.49, PBD: false, PBW: false, IVEP: 3.93 },
      tonyNote: 'JOHNSON CONTROLS INTERNATIONAL PLC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VST', name: 'Vistra Corp', easyScore: 2, avgWeight: 2.5, proScore: 1, coverage: 0.4,
      price: 149.09, weeklyPrices: [158.12, 158.43, 160.23, 152.56, 149.09], weeklyChange: -5.71, dayChange: -2.26, sortRank: 0, periodReturns: { '1M': -6.1, 'YTD': -7.6, '6M': -10.5, '1Y': -18.1 },
      priceHistory: { '1D': [152.53, 149.26, 149.09], '1W': [158.12, 158.43, 160.23, 152.56, 149.09], '1M': [158.83, 163.75, 167.26, 162.39, 162.87, 167.77, 163.49, 162.38, 158.63, 153.16, 151.05, 157.22, 155.73, 154.82, 157.98, 158.86, 158.12, 158.43, 160.23, 152.56, 149.09], 'YTD': [161.33, 150.6, 166.6, 158.81, 153, 159.6, 170.57, 176.82, 167.4, 158.95, 146.02, 155.48, 153.68, 163.97, 155.79, 153.79, 158.29, 141.9, 149.08, 154.76, 146.9, 153.52, 162.87, 153.16, 158.86, 149.09], '6M': [156.81, 164.26, 153, 159.6, 170.57, 175.36, 163.36, 164.4, 164.33, 152.72, 150.33, 155.89, 162.94, 155.79, 153.79, 158.29, 142.61, 144, 160.28, 153.8, 138.54, 158.83, 167.77, 151.05, 158.86, 149.09], '1Y': [182, 196.24, 208.54, 205.59, 202.35, 190.28, 196.7, 189.73, 204.05, 210.16, 201.62, 202.65, 210, 210.4, 191.37, 189.71, 184.62, 171.56, 173.79, 178.86, 176.07, 174.6, 166.17, 161.67, 162.93, 172.58, 156.81, 164.26, 153, 159.6, 170.57, 175.36, 161.7, 164.4, 164.33, 152.72, 150.33, 155.89, 162.94, 155.79, 153.79, 158.29, 142.61, 144, 160.28, 153.8, 138.54, 158.83, 167.77, 151.05, 158.86, 149.09] },
      velocityScore: { '1D': -2, '1W': 1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$50B', pe: 24.9, revenueGrowth: 43, eps: 5.98, grossMargin: 39, dividendYield: 0.6,
      etfPresence: { POW: 1.5, VOLT: false, PBD: false, PBW: false, IVEP: 3.5 },
      tonyNote: 'Vistra Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, avgWeight: 2.38, proScore: 0.95, coverage: 0.4,
      price: 271.38, weeklyPrices: [298.52, 305.20, 301.88, 285.89, 271.38], weeklyChange: -9.09, dayChange: -5.07, sortRank: 0, periodReturns: { '1M': -23.2, 'YTD': 29.6, '6M': 6.9, '1Y': 90.1 },
      priceHistory: { '1D': [285.89, 272.63, 271.38], '1W': [298.52, 305.2, 301.88, 285.89, 271.38], '1M': [353.32, 372.59, 388.23, 364.96, 359.61, 375.15, 348.11, 348.15, 372.87, 356.35, 311.27, 310.84, 287.73, 293.64, 309.27, 308.05, 298.52, 305.2, 301.88, 285.89, 271.38], 'YTD': [209.37, 210.99, 253.86, 263.03, 263.03, 279.04, 321.34, 337.35, 311.42, 302.02, 317.21, 310.76, 339.32, 385.73, 377.19, 361.39, 360.81, 344.6, 323.79, 294.65, 306.11, 370.66, 359.61, 356.35, 308.05, 271.38], '6M': [250.95, 259.55, 263.03, 279.04, 321.34, 338.51, 330.54, 311.39, 315.91, 356.38, 322.71, 366.95, 374.32, 377.19, 361.39, 360.81, 339.19, 313.05, 317.08, 322.5, 308.17, 353.32, 375.15, 311.27, 308.05, 271.38], '1Y': [142.73, 140.91, 138.92, 146.5, 161.89, 148.07, 155.55, 150.14, 159.52, 169.75, 167.35, 178.08, 179.98, 192.22, 198.42, 205.61, 219.2, 202.82, 188.88, 211.19, 214.65, 224.11, 208.77, 217.86, 227.65, 227.59, 250.95, 259.55, 263.03, 279.04, 321.34, 338.51, 322.47, 311.39, 315.91, 356.38, 322.71, 366.95, 374.32, 377.19, 361.39, 360.81, 339.19, 313.05, 317.08, 322.5, 308.17, 353.32, 375.15, 311.27, 308.05, 271.38] },
      velocityScore: { '1D': -3.1, '1W': null, '1M': -12.8, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 59.6, revenueGrowth: 26, eps: 4.55, grossMargin: 39, dividendYield: 0.14,
      etfPresence: { POW: 0.96, VOLT: 3.79, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'SO', name: 'Southern Co/The', easyScore: 2, avgWeight: 2.31, proScore: 0.92, coverage: 0.4,
      price: 97.16, weeklyPrices: [96.47, 95.96, 94.60, 96.07, 97.16], weeklyChange: 0.71, dayChange: 1.13, sortRank: 0, periodReturns: { '1M': 5, 'YTD': 11.4, '6M': 9.3, '1Y': 4.1 },
      priceHistory: { '1D': [96.07, 97.03, 97.16], '1W': [96.47, 95.96, 94.6, 96.07, 97.16], '1M': [92.53, 93.09, 93.43, 94.93, 95.78, 95.91, 97.16, 96.75, 95.71, 95.12, 97.98, 95.99, 97.29, 96.38, 95.17, 95.61, 96.47, 95.96, 94.6, 96.07, 97.16], 'YTD': [87.2, 87.22, 88.9, 88.16, 90.13, 90.72, 91.04, 96.35, 97.2, 98.01, 93.39, 95.55, 96.82, 95.96, 91.87, 93.51, 93.51, 93.68, 94.24, 89.03, 91.28, 93.82, 95.78, 95.12, 95.61, 97.16], '6M': [88.82, 88.84, 90.13, 90.72, 91.04, 95.92, 97.63, 96.27, 98.27, 93.98, 96.52, 97.17, 94.64, 91.87, 93.51, 93.51, 93.14, 93.62, 92.52, 90.49, 94.02, 92.53, 95.91, 97.98, 95.61, 97.16], '1Y': [93.33, 95, 94.48, 95.35, 94.19, 94.62, 92.24, 91.87, 92.13, 91.45, 93.69, 93.89, 96.13, 98.43, 96.15, 95.07, 90.9, 91.17, 88.57, 91.12, 87.33, 84.73, 87.22, 87.17, 86.87, 86.74, 88.82, 88.84, 90.13, 90.72, 91.04, 95.92, 96.79, 96.27, 98.27, 93.98, 96.52, 97.17, 94.64, 91.87, 93.51, 93.51, 93.14, 93.62, 92.52, 90.49, 94.02, 92.53, 95.91, 97.98, 95.61, 97.16] },
      velocityScore: { '1D': 4.5, '1W': null, '1M': 16.5, '6M': null }, isNew: false,
      marketCap: '$110B', pe: 24.8, revenueGrowth: 8, eps: 3.91, grossMargin: 48, dividendYield: 3.16,
      etfPresence: { POW: 0.35, VOLT: false, PBD: false, PBW: false, IVEP: 4.27 },
      tonyNote: 'Southern Co/The appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 5.05, proScore: 2.02, coverage: 0.4,
      price: 0, weeklyPrices: [0.00], weeklyChange: 0, dayChange: 0, sortRank: 0, periodReturns: { '1M': 0, 'YTD': 0, '6M': 0, '1Y': 0 },
      priceHistory: undefined,
      velocityScore: { '1D': -0.5, '1W': -0.5, '1M': 1, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: null, revenueGrowth: 0, eps: 0, grossMargin: 0, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 3.21, RSHO: 6.89, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 4.78, proScore: 1.91, coverage: 0.4,
      price: 224.19, weeklyPrices: [225.66, 234.25, 247.01, 235.79, 224.19], weeklyChange: -0.65, dayChange: -4.92, sortRank: 0, periodReturns: { '1M': -23.8, 'YTD': 111, '6M': 60.1, '1Y': 184.4 },
      priceHistory: { '1D': [235.79, 227.66, 224.19], '1W': [225.66, 234.25, 247.01, 235.79, 224.19], '1M': [294.03, 297.2, 307.8, 291.5, 294.49, 309.2, 279.77, 281.09, 286.36, 264.86, 246.33, 248.05, 234.05, 231.85, 236.58, 232.19, 225.66, 234.25, 247.01, 235.79, 224.19], 'YTD': [106.26, 119.94, 139.99, 141.15, 151.08, 190.09, 180.99, 176.96, 167.67, 167.57, 172, 179.35, 201.7, 234.42, 242.77, 253.49, 320.3, 296.98, 270.75, 288.12, 293.6, 303.53, 294.49, 264.86, 232.19, 224.19], '6M': [142.76, 147.43, 151.08, 190.09, 180.99, 183, 170.96, 176.51, 174.04, 186.82, 180.36, 218.07, 229.73, 242.77, 253.49, 320.3, 300.84, 271.05, 288.9, 299.73, 262.34, 294.03, 309.2, 246.33, 232.19, 224.19], '1Y': [78.84, 80.05, 79.03, 77.8, 85.17, 83.64, 90.42, 90.24, 97.47, 101.43, 94.58, 102.51, 103.18, 112.77, 113.88, 125.9, 125, 109.4, 98.12, 107.74, 112.31, 120.91, 109.59, 113.62, 120.46, 128.85, 142.76, 147.43, 151.08, 190.09, 180.99, 183, 170.37, 176.51, 174.04, 186.82, 180.36, 218.07, 229.73, 242.77, 253.49, 320.3, 300.84, 271.05, 288.9, 299.73, 262.34, 294.03, 309.2, 246.33, 232.19, 224.19] },
      velocityScore: { '1D': -1, '1W': 0, '1M': -8.6, '6M': null }, isNew: false,
      marketCap: '$8B', pe: 45.9, revenueGrowth: 7, eps: 4.88, grossMargin: 30, dividendYield: 0.15,
      etfPresence: { AIRR: 2.23, PRN: false, RSHO: 7.33, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 4.45, proScore: 1.78, coverage: 0.4,
      price: 604.97, weeklyPrices: [660.04, 679.62, 668.82, 641.35, 604.97], weeklyChange: -8.34, dayChange: -5.67, sortRank: 0, periodReturns: { '1M': -27.8, 'YTD': 97.6, '6M': 72.4, '1Y': 141.3 },
      priceHistory: { '1D': [641.35, 603.76, 604.97], '1W': [660.04, 679.62, 668.82, 641.35, 604.97], '1M': [838.21, 861.88, 932.75, 892.25, 867.23, 881.92, 804.76, 813.77, 839.36, 776.55, 700.75, 717.11, 674.39, 660.72, 707.17, 682.29, 660.04, 679.62, 668.82, 641.35, 604.97], 'YTD': [306.23, 297.62, 350.96, 361.21, 386.78, 415.19, 410.63, 433.34, 398.87, 398.12, 401.61, 420.24, 382.22, 464.54, 487.87, 469.75, 886.22, 889.03, 733.77, 845.39, 891.86, 866.67, 867.23, 776.55, 682.29, 604.97], '6M': [349.59, 372.25, 386.78, 415.19, 410.63, 455.25, 420.22, 411.53, 425.51, 446.16, 407.27, 423.35, 456.08, 487.87, 469.75, 886.22, 854.28, 752, 842.96, 957.03, 770.25, 838.21, 881.92, 700.75, 682.29, 604.97], '1Y': [250.69, 252.68, 267.59, 299.64, 282.14, 278.03, 290.95, 288.68, 316.16, 348.58, 338.44, 351.66, 355.53, 361.02, 353.8, 379.03, 388.68, 326.6, 314.56, 344.31, 332.29, 340.51, 302.3, 316.55, 327.11, 307.58, 349.59, 372.25, 386.78, 415.19, 410.63, 455.25, 415.51, 411.53, 425.51, 446.16, 407.27, 423.35, 456.08, 487.87, 469.75, 886.22, 854.28, 752, 842.96, 957.03, 770.25, 838.21, 881.92, 700.75, 682.29, 604.97] },
      velocityScore: { '1D': -2.2, '1W': -6.3, '1M': -16.8, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 54.2, revenueGrowth: 92, eps: 11.16, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 4.99, PRN: 3.9, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.36, proScore: 1.74, coverage: 0.4,
      price: 1585, weeklyPrices: [1732.03, 1775.10, 1736.70, 1680.60, 1585.00], weeklyChange: -8.49, dayChange: -5.75, sortRank: 0, periodReturns: { '1M': -18, 'YTD': 69.8, '6M': 41.5, '1Y': 187.9 },
      priceHistory: { '1D': [1681.62, 1575.3, 1585], '1W': [1732.03, 1775.1, 1736.7, 1680.6, 1585], '1M': [1931.77, 1967.41, 2066.51, 1908.07, 1954.47, 2017.57, 1854.23, 1948.69, 1981.95, 1865.15, 1741.3, 1793.03, 1683.44, 1684.94, 1781.42, 1756.09, 1732.03, 1775.1, 1736.7, 1680.6, 1585], 'YTD': [933.29, 971.49, 1119.98, 1127.55, 1209.97, 1269.63, 1319.47, 1438.23, 1348.22, 1365.34, 1356.75, 1366.77, 1424.91, 1650.48, 1724.49, 1724.14, 2011.49, 2042.36, 1835.33, 1787.88, 1852.03, 1952.02, 1954.47, 1865.15, 1756.09, 1585], '6M': [1134.75, 1160.38, 1209.97, 1269.63, 1319.47, 1450.6, 1430.38, 1383.62, 1424.46, 1461.52, 1378.99, 1525.16, 1648.96, 1724.49, 1724.14, 2011.49, 2034.63, 1835.51, 1855.15, 1850.04, 1719.48, 1931.77, 2017.57, 1741.3, 1756.09, 1585], '1Y': [550.5, 562.83, 703.3, 694.43, 689.86, 694, 730.01, 723.95, 764.91, 799.38, 781.88, 832.98, 834.7, 838.78, 825, 963.3, 957.78, 897.52, 876.19, 976.94, 1004.65, 1024.92, 918.54, 963.83, 1032.31, 1038.18, 1134.75, 1160.38, 1209.97, 1269.63, 1319.47, 1450.6, 1391.16, 1383.62, 1424.46, 1461.52, 1378.99, 1525.16, 1648.96, 1724.49, 1724.14, 2011.49, 2034.63, 1835.51, 1855.15, 1850.04, 1719.48, 1931.77, 2017.57, 1741.3, 1756.09, 1585] },
      velocityScore: { '1D': -1.1, '1W': -2.2, '1M': -4.4, '6M': null }, isNew: false,
      marketCap: '$56B', pe: 45.8, revenueGrowth: 1, eps: 34.62, grossMargin: 25, dividendYield: 0.15,
      etfPresence: { AIRR: 4.08, PRN: 4.63, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.98, proScore: 1.59, coverage: 0.4,
      price: 326.55, weeklyPrices: [329.35, 327.49, 327.65, 332.13, 326.55], weeklyChange: -0.85, dayChange: -1.67, sortRank: 0, periodReturns: { '1M': -1, 'YTD': 27.2, '6M': 16.1, '1Y': 24.7 },
      priceHistory: { '1W': [329.35, 327.49, 327.65, 332.13, 326.55], '1M': [329.89, 337.96, 338.07, 330.9, 333.78, 343.54, 337.08, 334.16, 338.15, 332.08, 330.85, 328.53, 315.33, 315.88, 322.49, 331.15, 329.35, 327.49, 327.65, 332.13, 326.55], 'YTD': [256.77, 264.62, 281.21, 281.54, 273.22, 283.73, 279.27, 283.5, 274.97, 255.65, 253.77, 260.67, 272.54, 292.01, 289.82, 296.57, 315.39, 315.72, 305.66, 300.98, 314.42, 316.18, 333.78, 332.08, 331.15, 326.55], '6M': [277.44, 262.34, 273.22, 283.73, 279.27, 280.76, 279.91, 264.31, 261.37, 264.14, 265.32, 280.74, 284.56, 289.82, 296.57, 315.39, 310.87, 306.25, 308.53, 313.39, 314.08, 329.89, 343.54, 330.85, 331.15, 326.55], '1Y': [261.93, 268.07, 271.5, 263.43, 273.04, 258.76, 266.47, 267.96, 269.68, 262.77, 259.1, 259.16, 251.03, 244.84, 260, 255.91, 259.66, 250.89, 242.52, 258.82, 258.83, 262.84, 259.48, 264.78, 263.15, 273.7, 277.44, 262.34, 273.22, 283.73, 279.27, 280.76, 277.7, 264.31, 261.37, 264.14, 265.32, 280.74, 284.56, 289.82, 296.57, 315.39, 310.87, 306.25, 308.53, 313.39, 314.08, 329.89, 343.54, 330.85, 331.15, 326.55] },
      velocityScore: { '1D': 0, '1W': 0.6, '1M': 15.2, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 30.4, revenueGrowth: 7, eps: 10.73, grossMargin: 30, dividendYield: 0.61,
      etfPresence: { AIRR: 1.93, PRN: false, RSHO: 6.04, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 4.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'EME', name: 'EMCOR Group, Inc.', easyScore: 2, avgWeight: 3.55, proScore: 1.42, coverage: 0.4,
      price: 725.41, weeklyPrices: [764.90, 774.74, 769.72, 750.04, 725.41], weeklyChange: -5.16, dayChange: -3.28, sortRank: 0, periodReturns: { '1M': -12.3, 'YTD': 18.6, '6M': 3.8, '1Y': 29.7 },
      priceHistory: { '1D': [750.02, 729.6, 725.41], '1W': [764.9, 774.74, 769.72, 750.04, 725.41], '1M': [827.5, 836.59, 868.88, 838.61, 847.17, 862.66, 798.1, 814.41, 829.88, 804.33, 774.66, 787.29, 768.38, 768.98, 783.41, 781.78, 764.9, 774.74, 769.72, 750.04, 725.41], 'YTD': [611.79, 628.27, 698.69, 706.87, 744.53, 779.09, 783.06, 746.18, 719.01, 709.91, 724.93, 732.89, 750.42, 814.18, 860, 833.37, 943.75, 930.03, 849.2, 830.95, 823.79, 842.3, 847.17, 804.33, 781.78, 725.41], '6M': [687.76, 716.28, 744.53, 779.09, 783.06, 801.8, 740.87, 723.38, 728.55, 761.27, 738.31, 789.19, 803.64, 860, 833.37, 943.75, 923.01, 853.15, 848.45, 839.54, 776.72, 827.5, 862.66, 774.66, 781.78, 725.41], '1Y': [559.25, 578.8, 627.49, 617.51, 609.75, 610.85, 633.25, 640.57, 640, 628.92, 625, 660.28, 680.83, 687.22, 696.28, 648, 653.75, 618.96, 583.08, 615.07, 635.36, 639.58, 612.86, 627.09, 653.57, 660.65, 687.76, 716.28, 744.53, 779.09, 783.06, 801.8, 736.3, 723.38, 728.55, 761.27, 738.31, 789.19, 803.64, 860, 833.37, 943.75, 923.01, 853.15, 848.45, 839.54, 776.72, 827.5, 862.66, 774.66, 781.78, 725.41] },
      velocityScore: { '1D': -0.7, '1W': -1.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$32B', pe: 24.4, revenueGrowth: 20, eps: 29.78, grossMargin: 19, dividendYield: 0.21,
      etfPresence: { AIRR: 3.69, PRN: 3.42, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'EMCOR Group is an electrical and mechanical construction services company. Revenue grew substantially, and EMCOR is a core Industrials ETF holding because it builds the electrical systems inside data centers, manufacturing plants, and commercial buildings. The $827 share price reflects years of consistent execution and market share gains in a fragmented contractor market.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 2, avgWeight: 3.3, proScore: 1.32, coverage: 0.4,
      price: 266.35, weeklyPrices: [271.28, 276.78, 279.24, 271.19, 266.35], weeklyChange: -1.82, dayChange: -1.75, sortRank: 0, periodReturns: { '1M': -6, 'YTD': 29.9, '6M': 18.4, '1Y': 41.1 },
      priceHistory: { '1D': [271.08, 268.48, 266.35], '1W': [271.28, 276.78, 279.24, 271.19, 266.35], '1M': [283.23, 277.66, 280.36, 275.13, 276.06, 273.14, 268.87, 268.57, 268.86, 267.41, 270.41, 277.91, 275.43, 271.58, 273.77, 270.85, 271.28, 276.78, 279.24, 271.19, 266.35], 'YTD': [205.02, 210.02, 224.89, 215.39, 213.49, 224.47, 249.35, 260.31, 252.39, 236.75, 231.21, 227.9, 236.02, 258.03, 240.88, 236.52, 256.43, 272.37, 259.89, 255.52, 246.55, 270.44, 276.06, 267.41, 270.85, 266.35], '6M': [220.36, 215.53, 213.49, 224.47, 249.35, 259.64, 260.09, 253.91, 240.24, 239.51, 230.46, 250, 254.04, 240.88, 236.52, 256.43, 273.1, 261.21, 259.89, 248.63, 249.49, 283.23, 273.14, 270.41, 270.85, 266.35], '1Y': [188.83, 186.8, 179.77, 181.58, 175.99, 173.25, 176.16, 179.53, 184.21, 191.84, 189.85, 191.08, 188.83, 191.68, 200.1, 201.77, 205.72, 201.3, 197.92, 204.59, 196.27, 195.89, 198, 211.22, 212.92, 220.15, 220.36, 215.53, 213.49, 224.47, 249.35, 259.64, 258.84, 253.91, 240.24, 239.51, 230.46, 250, 254.04, 240.88, 236.52, 256.43, 273.1, 261.21, 259.89, 248.63, 249.49, 283.23, 273.14, 270.41, 270.85, 266.35] },
      velocityScore: { '1D': 0, '1W': 3.1, '1M': 16.8, '6M': null }, isNew: false,
      marketCap: '$107B', pe: 63.7, revenueGrowth: 19, eps: 4.18, grossMargin: 35, dividendYield: 0.18,
      etfPresence: { AIRR: false, PRN: 4.33, RSHO: false, IDEF: 2.27, BILT: false },
      tonyNote: 'Howmet Aerospace is an aerospace structures and engine components manufacturer. It appears in Industrials ETFs for its aerospace and defense exposure — commercial air travel recovery and defense spending growth are the two demand drivers. Revenue grew and margins are expanding as Howmet prices power over OEM customers.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 2.79, proScore: 1.12, coverage: 0.4,
      price: 215.96, weeklyPrices: [219.87, 215.14, 218.02, 217.59, 215.96], weeklyChange: -1.78, dayChange: -0.75, sortRank: 0, periodReturns: { '1M': -8, 'YTD': 7.9, '6M': -0.8, '1Y': 19.9 },
      priceHistory: { '1W': [219.87, 215.14, 218.02, 217.59, 215.96], '1M': [234.8, 235.29, 242.97, 246.41, 236.07, 237.22, 244.56, 231.87, 238.21, 245.17, 231.72, 227.74, 232.19, 218.83, 213.56, 216.63, 219.87, 215.14, 218.02, 217.59, 215.96], 'YTD': [200.06, 207.44, 217.65, 215.21, 212.73, 231.2, 241.58, 231.59, 211.9, 202.65, 186.77, 200, 196.9, 224.82, 216.49, 216.36, 212.74, 203.79, 205.55, 216.66, 227.8, 237.06, 236.07, 245.17, 216.63, 215.96], '6M': [217.65, 215.21, 212.73, 223.86, 241.6, 243.04, 219.58, 209.8, 203.42, 194.52, 190.71, 195.43, 224.82, 216.49, 216.36, 207.81, 198.99, 195.79, 215.34, 230.08, 228.01, 234.8, 237.22, 231.72, 216.63, 215.96], '1Y': [180.12, 175.41, 182.39, 204.31, 186.56, 186.28, 192.47, 186.63, 190.25, 190.48, 182.95, 187.73, 185.97, 182.92, 190.4, 198.85, 223.06, 219.09, 205.32, 215.87, 208.24, 224.76, 210.34, 208.48, 205.44, 208.56, 217.65, 215.21, 212.73, 223.86, 241.6, 243.04, 219.58, 210.96, 204.62, 200.67, 190.71, 195.43, 224.82, 216.49, 216.36, 207.81, 198.99, 195.79, 215.34, 234.08, 228.01, 234.8, 237.22, 231.72, 216.63, 215.96] },
      velocityScore: { '1D': 0, '1W': 0.9, '1M': 0.9, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 41.3, revenueGrowth: 17, eps: 5.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.62, PRN: false, RSHO: 3.96, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 2, avgWeight: 2.23, proScore: 0.89, coverage: 0.4,
      price: 168.3, weeklyPrices: [177.14, 179.83, 176.91, 173.74, 168.30], weeklyChange: -4.99, dayChange: -3.12, sortRank: 0, periodReturns: { '1M': -17.1, 'YTD': -2.6, '6M': -22.8, '1Y': 18.2 },
      priceHistory: { '1D': [173.74, 169.19, 168.3], '1W': [177.14, 179.83, 176.91, 173.74, 168.3], '1M': [203.07, 205.4, 210, 209.89, 205.65, 204.77, 197.91, 189.25, 194.65, 191.25, 191.06, 196.89, 186.08, 184.11, 186.99, 186, 177.14, 179.83, 176.91, 173.74, 168.3], 'YTD': [172.84, 193.2, 217.89, 206.04, 210.88, 199.83, 202.25, 207.24, 195.5, 194.13, 199.75, 202.59, 214.44, 238.27, 219.1, 208.08, 215.2, 210.94, 202.52, 188.39, 187.46, 193.94, 205.65, 191.25, 186, 168.3], '6M': [206.07, 212.4, 210.88, 199.83, 202.25, 208.27, 205.57, 195.91, 207.48, 204.76, 204.49, 231.78, 238.42, 219.1, 208.08, 215.2, 206.83, 202.66, 199.27, 184.72, 183, 203.07, 204.77, 191.06, 186, 168.3], '1Y': [142.34, 143.84, 151.93, 179.53, 174.7, 165.34, 165.83, 163.79, 170.1, 174.03, 176.21, 185.7, 195.6, 209.01, 199.92, 213.8, 193.93, 177.88, 175.28, 178.88, 178.33, 183.38, 170.75, 175.88, 189.02, 206.62, 206.07, 212.4, 210.88, 199.83, 202.25, 208.27, 205.83, 195.91, 207.48, 204.76, 204.49, 231.78, 238.42, 219.1, 208.08, 215.2, 206.83, 202.66, 199.27, 184.72, 183, 203.07, 204.77, 191.06, 186, 168.3] },
      velocityScore: { '1D': -1.1, '1W': -5.3, '1M': -6.3, '6M': null }, isNew: false,
      marketCap: '$15B', pe: 44.9, revenueGrowth: 26, eps: 3.75, grossMargin: 23, dividendYield: 0.6,
      etfPresence: { AIRR: 2.89, PRN: false, RSHO: false, IDEF: 1.56, BILT: false },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 2, avgWeight: 1.79, proScore: 0.72, coverage: 0.4,
      price: 273.48, weeklyPrices: [284.86, 280.00, 277.79, 271.05, 273.48], weeklyChange: -3.99, dayChange: 0.92, sortRank: 0, periodReturns: { '1M': -7.9, 'YTD': -19.6, '6M': -35.8, '1Y': 7.1 },
      priceHistory: { '1D': [270.97, 273.15, 273.48], '1W': [284.86, 280, 277.79, 271.05, 273.48], '1M': [296.89, 285.43, 278.19, 283.48, 279.62, 279.09, 281.99, 277.39, 279.89, 278.97, 291.5, 294.1, 289.46, 289.47, 286.21, 286.09, 284.86, 280, 277.79, 271.05, 273.48], 'YTD': [340.07, 378.47, 425.9, 413.56, 429.64, 399.37, 424.89, 443, 421.17, 415.71, 407.98, 381.79, 402.28, 398.07, 366.88, 362.17, 319.54, 336.95, 317.55, 296.41, 292.26, 299.66, 279.62, 278.97, 286.09, 273.48], '6M': [415.58, 422.79, 429.64, 399.37, 424.89, 435.58, 437.03, 417.51, 422.94, 402.08, 379.9, 411.35, 398.13, 366.88, 362.17, 319.54, 334.22, 321.92, 320.9, 287.54, 289.13, 296.89, 279.09, 291.5, 286.09, 273.48], '1Y': [255.35, 263.33, 278.86, 266.45, 267.46, 266.48, 275.27, 269.98, 276.07, 274.69, 271.25, 282.22, 286.14, 282.66, 290.09, 319.07, 305.43, 312.67, 301.83, 313.62, 315.88, 326.72, 322.63, 351.13, 363.48, 398.25, 415.58, 422.79, 429.64, 399.37, 424.89, 435.58, 440.33, 417.51, 422.94, 402.08, 379.9, 411.35, 398.13, 366.88, 362.17, 319.54, 334.22, 321.92, 320.9, 287.54, 289.13, 296.89, 279.09, 291.5, 286.09, 273.48] },
      velocityScore: { '1D': -1.4, '1W': -2.7, '1M': -4, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 17.8, revenueGrowth: 13, eps: 15.4, grossMargin: 12, dividendYield: 2.04,
      etfPresence: { AIRR: 2.58, PRN: false, RSHO: false, IDEF: 1.01, BILT: false },
      tonyNote: 'Huntington Ingalls Industries is the only builder of nuclear-powered aircraft carriers for the U.S. Navy. Revenue is government-contracted and predictable; the ETF allocation in Industrials reflects defense spending growth and the Navy\'s backlog of nuclear submarine and carrier construction. A steady-state quality compounder in a market structure with no competition.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 2, avgWeight: 1.71, proScore: 0.68, coverage: 0.4,
      price: 46.3, weeklyPrices: [46.96, 50.36, 49.68, 46.96, 46.30], weeklyChange: -1.4, dayChange: -1.4, sortRank: 0, periodReturns: { '1M': -17.6, 'YTD': -39, '6M': -64.6, '1Y': -21.4 },
      priceHistory: { '1D': [46.96, 46.36, 46.3], '1W': [46.96, 50.36, 49.68, 46.96, 46.3], '1M': [56.16, 54.21, 51.09, 50.8, 47.95, 46.32, 47.21, 46.95, 49.86, 53.04, 55.35, 53.54, 50.34, 50.38, 48.85, 48.19, 46.96, 50.36, 49.68, 46.96, 46.3], 'YTD': [75.91, 104.04, 130.72, 111.32, 103.37, 93.48, 97.21, 92.14, 85.54, 87.53, 84.62, 71.94, 71.96, 73.66, 68.61, 59.56, 61.52, 54.85, 54.67, 63.49, 57.73, 57.02, 47.95, 53.04, 48.19, 46.3], '6M': [128.68, 118.06, 103.37, 93.48, 97.21, 88.23, 89.13, 88.96, 95.31, 77.49, 70.51, 74.46, 74.66, 68.61, 59.56, 61.52, 52.49, 55.82, 65.19, 58.43, 54.82, 56.16, 46.32, 55.35, 48.19, 46.3], '1Y': [58.91, 58.66, 58.7, 59.08, 69.12, 64.78, 68.51, 63.59, 67.67, 80.65, 84.2, 95.03, 98.55, 88.62, 89.32, 88.3, 72.41, 71.69, 67.31, 76.1, 77.68, 78.78, 71.4, 77.7, 89.93, 117.86, 128.68, 118.06, 103.37, 93.48, 97.21, 88.23, 88.95, 88.96, 95.31, 77.49, 70.51, 74.46, 74.66, 68.61, 59.56, 61.52, 52.49, 55.82, 65.19, 58.43, 54.82, 56.16, 46.32, 55.35, 48.19, 46.3] },
      velocityScore: { '1D': -5.6, '1W': -2.9, '1M': -11.7, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 272.4, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.49, PRN: false, RSHO: false, IDEF: 0.93, BILT: false },
      tonyNote: 'Kratos Defense is a defense technology company focused on unmanned systems, satellite communications, and high-performance computing for government customers. It appears in Industrials ETFs as an AI-adjacent defense name — autonomous systems and AI-driven surveillance are direct end markets. Revenue grew and the government contract backlog is expanding.',
    },
    {
      ticker: 'AIR', name: 'AIRBUS GROUP', easyScore: 2, avgWeight: 1.36, proScore: 0.55, coverage: 0.4,
      price: 130, weeklyPrices: [130.90, 134.46, 135.73, 133.48, 130.00], weeklyChange: -0.69, dayChange: -2.53, sortRank: 0, periodReturns: { '1M': -1.6, 'YTD': 57, '6M': 23.7, '1Y': 52.8 },
      priceHistory: { '1W': [130.9, 134.46, 135.73, 133.48, 130], '1M': [132.14, 134.88, 134.28, 132.26, 132.94, 138.51, 143.14, 141.85, 142.93, 142.76, 140.11, 143.61, 136.63, 133.3, 136.57, 135.67, 130.9, 134.46, 135.73, 133.48, 130], 'YTD': [82.79, 94.73, 105.08, 104.26, 109.89, 113.11, 114.63, 118.17, 110.71, 101.91, 101.33, 107.25, 113.86, 125.99, 111.5, 105.69, 118.71, 108.64, 108.44, 109.99, 114.72, 131.18, 132.94, 142.76, 135.67, 130], '6M': [103.67, 105.47, 109.89, 113.11, 114.63, 117.06, 118.61, 108.3, 108.76, 107.81, 109.46, 120.78, 122.75, 111.5, 105.69, 118.71, 107.47, 107.51, 114.97, 111.36, 117.36, 132.14, 138.51, 140.11, 135.67, 130], '1Y': [85.1, 77.5, 74.71, 72.06, 77.15, 71.73, 75.81, 77.11, 75.32, 75.93, 82.66, 83.95, 81.27, 82.86, 85.69, 84.22, 82.25, 80.08, 77.35, 83.21, 83.79, 84.34, 81.88, 85.07, 88.02, 98.23, 103.67, 105.47, 109.89, 113.11, 114.63, 117.06, 116.84, 108.3, 108.76, 107.81, 109.46, 120.78, 122.75, 111.5, 105.69, 118.71, 107.47, 107.51, 114.97, 111.36, 117.36, 132.14, 138.51, 140.11, 135.67, 130] },
      velocityScore: { '1D': 1.9, '1W': 3.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5B', pe: 28.6, revenueGrowth: 25, eps: 4.55, grossMargin: 19, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 2.56, BILT: false },
      tonyNote: 'AIRBUS GROUP appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 1.26, proScore: 0.5, coverage: 0.4,
      price: 74.92, weeklyPrices: [74.46, 75.98, 74.38, 74.73, 74.92], weeklyChange: 0.62, dayChange: 0.19, sortRank: 0, periodReturns: { '1M': 5.2, 'YTD': 24.6, '6M': 21.7, '1Y': 29 },
      priceHistory: { '1D': [74.78, 74.96, 74.92], '1W': [74.46, 75.98, 74.38, 74.73, 74.92], '1M': [71.25, 73.12, 74.95, 75.79, 75.87, 77.53, 77.92, 75.06, 74.34, 72.77, 73.14, 72.82, 75.08, 75.27, 75.45, 75.02, 74.46, 75.98, 74.38, 74.73, 74.92], 'YTD': [60.11, 61.15, 61.55, 64.29, 68.5, 68.84, 72.14, 74.77, 74.77, 73.34, 72.41, 73.58, 74.04, 71.44, 71.1, 73.32, 73.76, 77.69, 77.52, 70.04, 71.59, 71.49, 75.87, 72.77, 75.02, 74.92], '6M': [61.51, 65.48, 68.5, 68.84, 72.14, 73.97, 75.77, 73.84, 73.69, 74.46, 72.78, 73.01, 70.76, 71.1, 73.32, 73.76, 75.71, 77.88, 73.13, 71.66, 72.26, 71.25, 77.53, 73.14, 75.02, 74.92], '1Y': [58.09, 58.75, 59.95, 57.89, 57.34, 57.8, 58, 57.58, 59.33, 60.38, 63.31, 64.06, 63.1, 62.53, 58.93, 57.62, 57.94, 59.59, 58.91, 60.93, 63.66, 60.92, 58.66, 59.52, 61.16, 59.56, 61.51, 65.48, 68.5, 68.84, 72.14, 73.97, 75.88, 73.84, 73.69, 74.46, 72.78, 73.01, 70.76, 71.1, 73.32, 73.76, 75.71, 77.88, 73.13, 71.66, 72.26, 71.25, 77.53, 73.14, 75.02, 74.92] },
      velocityScore: { '1D': -2, '1W': -10.7, '1M': -9.1, '6M': null }, isNew: false,
      marketCap: '$92B', pe: 32.9, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.81,
      etfPresence: { AIRR: false, PRN: false, RSHO: 0.92, IDEF: false, BILT: 1.6 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RBC', name: 'RBC Bearings Incorporated', easyScore: 2, avgWeight: 1.15, proScore: 0.46, coverage: 0.4,
      price: 580.27, weeklyPrices: [595.49, 584.59, 588.18, 590.14, 580.27], weeklyChange: -2.56, dayChange: -1.67, sortRank: 0, periodReturns: { '1M': -6.6, 'YTD': 29.4, '6M': 16.3, '1Y': 46.2 },
      priceHistory: { '1W': [595.49, 584.59, 588.18, 590.14, 580.27], '1M': [621.08, 625.73, 639.18, 645.73, 633.44, 638.94, 648.89, 630.36, 634.78, 644.06, 620.47, 604.56, 609.6, 600.26, 593.89, 595.61, 595.49, 584.59, 588.18, 590.14, 580.27], 'YTD': [448.43, 485, 498.82, 504.5, 507.13, 547.51, 551.65, 576.5, 566.06, 547.31, 531.11, 532.25, 552.4, 598.23, 591.32, 594.39, 623.19, 618.91, 571.05, 571.96, 590.09, 616.95, 633.44, 644.06, 595.61, 580.27], '6M': [498.82, 504.5, 507.13, 548.2, 552.93, 571.57, 568.58, 565.64, 546.91, 537.2, 524.38, 553.31, 598.23, 591.32, 594.39, 607.5, 613.1, 565.22, 577.42, 578.34, 592.41, 621.08, 638.94, 620.47, 595.61, 580.27], '1Y': [397.03, 385.02, 387.34, 404.66, 401.92, 390.52, 399.53, 391.1, 385.08, 384.72, 379.44, 374.99, 384.43, 369.71, 407.3, 406.45, 431.36, 445.34, 430.24, 443.29, 443.22, 458.15, 449.77, 456.33, 461.21, 488.31, 498.82, 504.5, 507.13, 548.2, 552.93, 571.57, 568.58, 560.28, 544.55, 552.23, 524.38, 553.31, 598.23, 591.32, 594.39, 607.5, 613.1, 565.22, 577.42, 584.18, 592.41, 621.08, 638.94, 620.47, 595.61, 580.27] },
      velocityScore: { '1D': 0, '1W': 0, '1M': 0, '6M': null }, isNew: false,
      marketCap: '$18B', pe: 63.7, revenueGrowth: 18, eps: 9.11, grossMargin: 45, dividendYield: null,
      etfPresence: { AIRR: 1.82, PRN: false, RSHO: false, IDEF: 0.48, BILT: false },
      tonyNote: 'RBC Bearings Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, avgWeight: 1.07, proScore: 0.43, coverage: 0.4,
      price: 46.48, weeklyPrices: [45.13, 45.83, 48.78, 47.45, 46.48], weeklyChange: 2.99, dayChange: -2.15, sortRank: 0, periodReturns: { '1M': -10.7, 'YTD': -36.5, '6M': -57.2, '1Y': -17.4 },
      priceHistory: { '1D': [47.5, 46.58, 46.48], '1W': [45.13, 45.83, 48.78, 47.45, 46.48], '1M': [52.03, 50.37, 47.7, 46.38, 44.84, 46.27, 46.42, 47.1, 49.92, 54.93, 56.37, 53.36, 51.47, 49.96, 50.05, 50.01, 45.13, 45.83, 48.78, 47.45, 46.48], 'YTD': [73.17, 101.28, 108.5, 108.71, 111.72, 91.25, 81, 88.31, 97.14, 99.98, 99.38, 84.07, 82, 90.18, 82.11, 65.98, 63.19, 66.02, 65.3, 53.65, 49.64, 48.27, 44.84, 54.93, 50.01, 46.48], '6M': [106.28, 113.34, 111.72, 91.25, 81, 83.44, 98.88, 102.79, 104.06, 101.84, 80.05, 87.75, 92.73, 82.11, 65.98, 63.19, 67.28, 65.76, 65.86, 51.84, 45.87, 52.03, 46.27, 56.37, 50.01, 46.48], '1Y': [56.3, 49.41, 51.7, 48.21, 50.91, 52.23, 55.45, 53.38, 63.8, 65.45, 67.4, 73.41, 74.51, 76.85, 81.99, 85.6, 74.98, 59.99, 58.96, 67.03, 66.48, 69.37, 68.11, 77.55, 83.99, 107.5, 106.28, 113.34, 111.72, 91.25, 81, 83.44, 91.11, 102.79, 104.06, 101.84, 80.05, 87.75, 92.73, 82.11, 65.98, 63.19, 67.28, 65.76, 65.86, 51.84, 45.87, 52.03, 46.27, 56.37, 50.01, 46.48] },
      velocityScore: { '1D': -2.3, '1W': -2.3, '1M': -2.3, '6M': null }, isNew: false,
      marketCap: '$6B', pe: 211.3, revenueGrowth: 51, eps: 0.22, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.95, PRN: false, RSHO: false, IDEF: 0.19, BILT: false },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRCY', name: 'Mercury Systems, Inc.', easyScore: 2, avgWeight: 0.98, proScore: 0.39, coverage: 0.4,
      price: 92.9, weeklyPrices: [98.26, 100.32, 102.97, 96.00, 92.90], weeklyChange: -5.45, dayChange: -3.23, sortRank: 0, periodReturns: { '1M': -19.6, 'YTD': 27.2, '6M': -9.8, '1Y': 78 },
      priceHistory: { '1D': [96, 92.61, 92.9], '1W': [98.26, 100.32, 102.97, 96, 92.9], '1M': [115.5, 113.91, 111.76, 110.87, 105, 105.57, 109.38, 110.22, 122.33, 123.05, 126.21, 123.07, 115.83, 112.41, 114.25, 107.98, 98.26, 100.32, 102.97, 96, 92.9], 'YTD': [73.01, 88.74, 103.02, 98.89, 99.28, 84.36, 86.66, 89.58, 84.96, 78.16, 77.26, 71.4, 77.53, 84.09, 82.61, 74.75, 91.66, 94.55, 96.36, 111.28, 110.94, 115.93, 105, 123.05, 107.98, 92.9], '6M': [97.1, 101.04, 99.28, 84.36, 86.66, 89.3, 89.18, 86.87, 81.35, 74.49, 72.91, 80.81, 85.51, 82.61, 74.75, 91.66, 92.5, 94.81, 108.11, 111.59, 106.81, 115.5, 105.57, 126.21, 107.98, 92.9], '1Y': [52.2, 52.46, 52.59, 52.62, 66.83, 65.64, 68.5, 67.89, 73.08, 77.1, 73.13, 82.56, 80.96, 77.1, 77.6, 76.8, 75.36, 71.26, 66.12, 69.89, 71.35, 76.61, 68.88, 74.22, 81.29, 97.02, 97.1, 101.04, 99.28, 84.36, 86.66, 89.3, 89.43, 86.87, 81.35, 74.49, 72.91, 80.81, 85.51, 82.61, 74.75, 91.66, 92.5, 94.81, 108.11, 111.59, 106.81, 115.5, 105.57, 126.21, 107.98, 92.9] },
      velocityScore: { '1D': -7.1, '1W': -15.2, '1M': -9.3, '6M': null }, isNew: false,
      marketCap: '$6B', pe: null, revenueGrowth: 12, eps: -0.23, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: 1.06, PRN: false, RSHO: false, IDEF: 0.9, BILT: false },
      tonyNote: 'Mercury Systems, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DRS', name: 'Leonardo DRS, Inc.', easyScore: 2, avgWeight: 0.57, proScore: 0.23, coverage: 0.4,
      price: 42.51, weeklyPrices: [43.35, 44.37, 43.82, 43.10, 42.51], weeklyChange: -1.94, dayChange: -1.37, sortRank: 0, periodReturns: { '1M': -8.7, 'YTD': 24.7, '6M': -0.1, '1Y': -12 },
      priceHistory: { '1D': [43.1, 43.01, 42.51], '1W': [43.35, 44.37, 43.82, 43.1, 42.51], '1M': [46.58, 46.08, 44.99, 45.74, 44.69, 44.36, 42.48, 40.95, 42.67, 42.69, 43.72, 45.37, 45.47, 44.71, 44.67, 44.15, 43.35, 44.37, 43.82, 43.1, 42.51], 'YTD': [34.09, 38.84, 42.57, 40.63, 41.51, 39.48, 39.9, 43.34, 45.82, 45.3, 43.82, 44.84, 46.19, 47.54, 42.07, 39.47, 41.79, 42.86, 44.55, 47.96, 46.55, 46.68, 44.69, 42.69, 44.15, 42.51], '6M': [42.07, 42.16, 41.51, 39.48, 39.9, 42.36, 46.95, 46.35, 45.6, 44.06, 44.52, 47.93, 46.29, 42.07, 39.47, 41.79, 42.5, 44.56, 48.41, 45.61, 46.11, 46.58, 44.36, 43.72, 44.15, 42.51], '1Y': [48.33, 47.45, 41.6, 41.25, 41.74, 41.04, 42.47, 40.91, 41.61, 42.58, 42.35, 44.63, 44.21, 39.6, 40.53, 36.05, 35.31, 34.53, 33.08, 34.17, 34.31, 34.78, 33.17, 34.28, 37.01, 41.27, 42.07, 42.16, 41.51, 39.48, 39.9, 42.36, 45.51, 46.35, 45.6, 44.06, 44.52, 47.93, 46.29, 42.07, 39.47, 41.79, 42.5, 44.56, 48.41, 45.61, 46.11, 46.58, 44.36, 43.72, 44.15, 42.51] },
      velocityScore: { '1D': 0, '1W': 0, '1M': 0, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 39.7, revenueGrowth: 6, eps: 1.07, grossMargin: 24, dividendYield: 0.84,
      etfPresence: { AIRR: 0.84, PRN: false, RSHO: false, IDEF: 0.3, BILT: false },
      tonyNote: 'Leonardo DRS, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TPC', name: 'Tutor Perini Corporation', easyScore: 2, avgWeight: 0.39, proScore: 0.15, coverage: 0.4,
      price: 78.89, weeklyPrices: [75.89, 74.74, 77.77, 79.29, 78.89], weeklyChange: 3.95, dayChange: -0.5, sortRank: 0, periodReturns: { '1M': 3.5, 'YTD': 17.7, '6M': 5.1, '1Y': 55 },
      priceHistory: { '1W': [75.89, 74.74, 77.77, 79.29, 78.89], '1M': [76.19, 77.89, 77.99, 81.5, 81, 82.36, 81.56, 79.53, 81.88, 82.97, 79.51, 76.75, 79.91, 74.87, 75.49, 74.98, 75.89, 74.74, 77.77, 79.29, 78.89], 'YTD': [67.02, 70.17, 75.09, 77.34, 80.11, 86, 81.1, 89.38, 71.12, 69.2, 69.34, 76.15, 77.66, 86.16, 85.11, 86.87, 96.98, 80.64, 76.99, 71.49, 70.53, 76.55, 81, 82.97, 74.98, 78.89], '6M': [75.09, 77.34, 80.11, 84.07, 82.24, 85.87, 69.95, 72.04, 71.31, 72.44, 72.83, 77.31, 86.16, 85.11, 86.87, 97.31, 82.69, 74.91, 74.47, 74.29, 71.48, 76.19, 82.36, 79.51, 74.98, 78.89], '1Y': [50.89, 48.29, 48.15, 55.07, 57.25, 57.02, 58.79, 61, 62.89, 66.22, 64.33, 62.04, 61.75, 64.19, 67.67, 67.69, 67.92, 62.28, 60.11, 67.56, 68.64, 70.46, 67.56, 69.06, 71.79, 74.25, 75.09, 77.34, 80.11, 84.07, 82.24, 85.87, 69.95, 71.29, 71.44, 75.25, 72.83, 77.31, 86.16, 85.11, 86.87, 97.31, 82.69, 74.91, 74.47, 72.26, 71.48, 76.19, 82.36, 79.51, 74.98, 78.89] },
      velocityScore: { '1D': 0, '1W': 7.1, '1M': 7.1, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 54, revenueGrowth: 12, eps: 1.46, grossMargin: 12, dividendYield: 0.3,
      etfPresence: { AIRR: 0.73, PRN: false, RSHO: false, IDEF: 0.04, BILT: false },
      tonyNote: 'Tutor Perini Corporation appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RTX', name: 'RTX CORP', easyScore: 1, avgWeight: 8.76, proScore: 1.75, coverage: 0.2,
      price: 194.18, weeklyPrices: [196.39, 193.39, 195.89, 194.36, 194.18], weeklyChange: -1.13, dayChange: -0.09, sortRank: 0, periodReturns: { '1M': 0.8, 'YTD': 5.9, '6M': -3.8, '1Y': 28.2 },
      priceHistory: { '1D': [194.35, 195.1, 194.18], '1W': [196.39, 193.39, 195.89, 194.36, 194.18], '1M': [192.58, 185.6, 181.83, 186.39, 185.06, 186.59, 187.99, 187.33, 189.73, 191.78, 199.25, 201.37, 200.85, 194.91, 195.2, 195.93, 196.39, 193.39, 195.89, 194.36, 194.18], 'YTD': [183.4, 187.17, 201.92, 194.13, 203.5, 195.19, 204.81, 197.63, 203.86, 204.52, 198.16, 189.71, 197.92, 202.81, 180.91, 172.79, 176.74, 175.68, 175.98, 174.41, 178.66, 183.64, 185.06, 191.78, 195.93, 194.18], '6M': [196.36, 201.28, 203.5, 195.19, 204.81, 195.98, 208.82, 207, 203.33, 194, 192.9, 203.48, 198.39, 180.91, 172.79, 176.74, 178.11, 174.85, 178.96, 172.55, 177.41, 192.58, 186.59, 199.25, 195.93, 194.18], '1Y': [151.5, 155.22, 157.57, 155.76, 155.08, 156.32, 160.66, 158.68, 157.65, 158.19, 160.51, 166.63, 162.18, 157.05, 179.44, 177.42, 175.1, 173.96, 172.73, 174.91, 171.31, 177.42, 178.29, 185.17, 188.26, 193.85, 196.36, 201.28, 203.5, 195.19, 204.81, 195.98, 206.52, 207, 203.33, 194, 192.9, 203.48, 198.39, 180.91, 172.79, 176.74, 178.11, 174.85, 178.96, 172.55, 177.41, 192.58, 186.59, 199.25, 195.93, 194.18] },
      velocityScore: { '1D': 0.6, '1W': null, '1M': 9.4, '6M': null }, isNew: false,
      marketCap: '$261B', pe: 36.4, revenueGrowth: 9, eps: 5.33, grossMargin: 20, dividendYield: 1.5,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 8.76, BILT: false },
      tonyNote: 'RTX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TKR', name: 'TIMKEN CO/THE', easyScore: 1, avgWeight: 8.69, proScore: 1.74, coverage: 0.2,
      price: 133, weeklyPrices: [138.34, 139.60, 139.47, 137.69, 133.00], weeklyChange: -3.86, dayChange: -3.39, sortRank: 0, periodReturns: { '1M': -4.6, 'YTD': 58.1, '6M': 42.2, '1Y': 68.1 },
      priceHistory: { '1D': [137.66, 133.01, 133], '1W': [138.34, 139.6, 139.47, 137.69, 133], '1M': [139.4, 142.36, 141.97, 137.64, 137.99, 144.01, 141.22, 143.5, 145.32, 141.75, 139.16, 142.36, 138.06, 137.23, 137.93, 137.31, 138.34, 139.6, 139.47, 137.69, 133], 'YTD': [84.13, 90.6, 93.55, 94.02, 96.14, 109.41, 107.23, 109.88, 103.05, 97.54, 95.25, 97.56, 99.17, 106.81, 106.79, 106.53, 119.7, 116.74, 118.93, 126.54, 134.67, 139.12, 137.99, 141.75, 137.31, 133], '6M': [90.65, 93.89, 96.14, 109.41, 107.23, 107.69, 105.59, 102.18, 98.59, 101.03, 100.57, 105.88, 103.73, 106.79, 106.53, 119.7, 115.74, 117.2, 126.78, 131.82, 132.39, 139.4, 144.01, 139.16, 137.31, 133], '1Y': [79.13, 80.76, 76.09, 73.91, 77.08, 75.32, 78.21, 77.42, 79.16, 79.09, 74.2, 75.99, 74.32, 74.04, 77.71, 78.68, 77.95, 77.85, 74.55, 81.39, 82.76, 88.71, 84.92, 86.52, 88.34, 90.83, 90.65, 93.89, 96.14, 109.41, 107.23, 107.69, 106.58, 102.18, 98.59, 101.03, 100.57, 105.88, 103.73, 106.79, 106.53, 119.7, 115.74, 117.2, 126.78, 131.82, 132.39, 139.4, 144.01, 139.16, 137.31, 133] },
      velocityScore: { '1D': 0, '1W': 0, '1M': -5.4, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 30.2, revenueGrowth: 8, eps: 4.41, grossMargin: 31, dividendYield: 1.05,
      etfPresence: { AIRR: false, PRN: false, RSHO: 8.69, IDEF: false, BILT: false },
      tonyNote: 'TIMKEN CO/THE appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 3.99, proScore: 3.99, coverage: 1,
      price: 166.48, weeklyPrices: [210.51, 194.09, 199.51, 171.77, 166.48], weeklyChange: -20.92, dayChange: -3.08, sortRank: 0, periodReturns: { '1M': -40.7, 'YTD': 98.9, '6M': 53.1, '1Y': 210.1 },
      priceHistory: { '1D': [171.77, 165.53, 166.48], '1W': [210.51, 194.09, 199.51, 171.77, 166.48], '1M': [280.91, 286.69, 283.61, 275.25, 259.66, 256.63, 240.3, 261.15, 276.17, 229.18, 215.62, 213.02, 195.19, 216.48, 216.2, 219.65, 210.51, 194.09, 199.51, 171.77, 166.48], 'YTD': [83.71, 97.3, 108.73, 91.46, 89.95, 91.79, 101.8, 104.88, 95.65, 112.95, 117.62, 100.82, 117.4, 161.94, 156.14, 141.19, 195.09, 221.15, 219.93, 264.51, 218, 260.07, 259.66, 229.18, 219.65, 166.48], '6M': [99.29, 97.87, 89.95, 91.79, 101.8, 106.12, 97.78, 96.43, 116.33, 114.91, 103.76, 125, 166.77, 156.14, 141.19, 195.09, 207.27, 191.82, 226.34, 251.68, 211.69, 280.91, 256.63, 215.62, 219.65, 166.48], '1Y': [53.69, 52.16, 54.43, 65.31, 68.46, 66.18, 72.04, 64.91, 89.19, 94.12, 107.94, 125.87, 132.64, 123.04, 106.16, 124.18, 109.44, 88.63, 84.64, 94.87, 102.8, 94.28, 78.09, 87.59, 92.83, 107.33, 99.29, 97.87, 89.95, 91.79, 101.8, 106.12, 86.8, 96.43, 116.33, 114.91, 103.76, 125, 166.77, 156.14, 141.19, 195.09, 207.27, 191.82, 226.34, 251.68, 211.69, 280.91, 256.63, 215.62, 219.65, 166.48] },
      velocityScore: { '1D': -2.9, '1W': -2.7, '1M': -13.8, '6M': null }, isNew: false,
      marketCap: '$42B', pe: 64.3, revenueGrowth: 684, eps: 2.59, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 3.03, MEME: 5.75, RKNG: 3.2 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 5.38, proScore: 3.59, coverage: 0.667,
      price: 200.05, weeklyPrices: [233.49, 243.40, 239.38, 206.73, 200.05], weeklyChange: -14.32, dayChange: -3.13, sortRank: 0, periodReturns: { '1M': -29.8, 'YTD': 130.2, '6M': 33.8, '1Y': 722.9 },
      priceHistory: { '1D': [206.5, 199.51, 200.05], '1W': [233.49, 243.4, 239.38, 206.73, 200.05], '1M': [284.99, 328.91, 345.85, 321.98, 326.19, 309.18, 252.02, 275.01, 302.7, 289.5, 270.89, 295.05, 269.57, 254.29, 257.02, 244.61, 233.49, 243.4, 239.38, 206.73, 200.05], 'YTD': [86.89, 121.84, 149.5, 139.62, 168.89, 148.7, 157.27, 168.57, 159.99, 154.51, 150.12, 133.24, 135.91, 219.03, 229.75, 287.97, 285.47, 303.41, 307.88, 273.51, 253.57, 274.5, 326.19, 289.5, 244.61, 200.05], '6M': [151.75, 152.31, 168.89, 148.7, 157.27, 174.77, 164.78, 154, 160.05, 145.88, 135.49, 146.78, 213.84, 229.75, 287.97, 285.47, 289.76, 282.31, 290.01, 287.32, 234.23, 284.99, 309.18, 270.89, 244.61, 200.05], '1Y': [24.31, 33.06, 37.39, 36.8, 45.11, 44.83, 54.8, 54.91, 67.29, 80.97, 68.69, 88, 86.65, 115.09, 101.42, 127.85, 136.86, 103.55, 93.38, 109.24, 118.09, 108.99, 80.21, 90.18, 103.87, 136.87, 151.75, 152.31, 168.89, 148.7, 157.27, 174.77, 153.02, 154, 160.05, 145.88, 135.49, 146.78, 213.84, 229.75, 287.97, 285.47, 289.76, 282.31, 290.01, 287.32, 234.23, 284.99, 309.18, 270.89, 244.61, 200.05] },
      velocityScore: { '1D': -3.8, '1W': -0.6, '1M': 11.8, '6M': null }, isNew: false,
      marketCap: '$57B', pe: null, revenueGrowth: 130, eps: -0.04, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 7.19, RKNG: 3.57 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 2, avgWeight: 4.78, proScore: 3.18, coverage: 0.667,
      price: 98, weeklyPrices: [111.88, 125.45, 109.09, 100.24, 98.00], weeklyChange: -12.41, dayChange: -2.23, sortRank: 0, periodReturns: { '1M': -41.4, 'YTD': 181.1, '6M': 164.6, '1Y': 233.1 },
      priceHistory: { '1D': [100.24, 96.33, 98], '1W': [111.88, 125.45, 109.09, 100.24, 98], '1M': [167.34, 161.85, 171.23, 147.44, 146.97, 138.54, 135.69, 150.1, 148.16, 139, 120.95, 123.36, 114.41, 114.44, 122.21, 119.92, 111.88, 125.45, 109.09, 100.24, 98], 'YTD': [34.86, 33.01, 37.04, 34.89, 46.12, 48.49, 43.44, 53.69, 101.14, 96.81, 87.54, 98.21, 117.64, 146.39, 149.42, 152.83, 178.54, 203.57, 176.81, 185.67, 196.64, 191.55, 146.97, 139, 119.92, 98], '6M': [39.26, 37.39, 46.12, 48.49, 43.44, 58.12, 99.71, 120.49, 86.33, 113.9, 84.59, 132.7, 142.55, 149.42, 152.83, 178.54, 223.1, 165.26, 169.02, 184.07, 175.13, 167.34, 138.54, 120.95, 119.92, 98], '1Y': [29.42, 25.84, 22.87, 22.33, 21.01, 23.7, 25.49, 23.32, 26.85, 29.04, 26.34, 27.98, 32.37, 31.14, 31.4, 35.07, 29.1, 20.91, 19.49, 26.78, 26.24, 36.32, 29.25, 37.17, 34.99, 33.72, 39.26, 37.39, 46.12, 48.49, 43.44, 58.12, 95.34, 120.49, 86.33, 113.9, 84.59, 132.7, 142.55, 149.42, 152.83, 178.54, 223.1, 165.26, 169.02, 184.07, 175.13, 167.34, 138.54, 120.95, 119.92, 98] },
      velocityScore: { '1D': 0.3, '1W': 34.7, '1M': -18.5, '6M': null }, isNew: false,
      marketCap: '$8B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.69, RKNG: 2.86 },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 4.42, proScore: 2.95, coverage: 0.667,
      price: 1385.68, weeklyPrices: [1673.97, 1757.82, 1615.00, 1411.08, 1385.68], weeklyChange: -17.22, dayChange: -1.8, sortRank: 0, periodReturns: { '1M': -29.3, 'YTD': 483.7, '6M': 235, '1Y': 3237.4 },
      priceHistory: { '1D': [1411.08, 1353, 1385.68], '1W': [1673.97, 1757.82, 1615, 1411.08, 1385.68], '1M': [1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 1745, 1744.43, 1617.7, 1727.18, 1858.27, 1915.92, 1673.97, 1757.82, 1615, 1411.08, 1385.68], 'YTD': [237.38, 334.54, 413.62, 470.8, 695.51, 541.64, 600.4, 651.9, 565.59, 661.62, 709.71, 615.83, 710.8, 944.46, 979.07, 1064.21, 1409.98, 1382.72, 1542.24, 1761.43, 1642, 2107.86, 1914.46, 2032.22, 1915.92, 1385.68], '6M': [453.12, 481.43, 695.51, 541.64, 600.4, 632.38, 599.06, 618.89, 720.17, 702.48, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1447.23, 1392.56, 1641.64, 1831.5, 1643.23, 1958.8, 2335, 1745, 1915.92, 1385.68], '1Y': [41.52, 42.06, 42.92, 40.69, 46.68, 45.5, 50.87, 62.5, 84.3, 98.87, 94.29, 124.14, 129.68, 144.27, 167.05, 195.82, 207.69, 243.57, 195.96, 223.28, 213.31, 241.61, 219.46, 250.05, 274.08, 389.27, 453.12, 481.43, 695.51, 541.64, 600.4, 632.38, 565.41, 618.89, 720.17, 702.48, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1447.23, 1392.56, 1641.64, 1831.5, 1643.23, 1958.8, 2335, 1745, 1915.92, 1385.68] },
      velocityScore: { '1D': -1.3, '1W': -8.4, '1M': -31.1, '6M': null }, isNew: false,
      marketCap: '$205B', pe: 47.4, revenueGrowth: 251, eps: 29.21, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.4, RKNG: 3.44 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'LITE', name: 'LITE', easyScore: 2, avgWeight: 4.37, proScore: 2.91, coverage: 0.667,
      price: 690.43, weeklyPrices: [768.15, 814.80, 752.00, 706.23, 690.43], weeklyChange: -10.12, dayChange: -2.24, sortRank: 0, periodReturns: { '1M': -20.6, 'YTD': 87.3, '6M': 112.9, '1Y': 572.7 },
      priceHistory: { '1D': [706.23, 693.06, 690.43], '1W': [768.15, 814.8, 752, 706.23, 690.43], '1M': [869.98, 850, 893.93, 827.92, 842.53, 861.97, 816.98, 851.4, 858.06, 801.16, 728.32, 731.25, 698.91, 707.1, 785.77, 802.01, 768.15, 814.8, 752, 706.23, 690.43], 'YTD': [368.59, 348.26, 324.25, 332.45, 435.1, 561.13, 594.26, 677, 650.82, 622.5, 706.35, 702.73, 815.75, 852.79, 873.6, 858.32, 944.28, 1001.81, 964.5, 905, 895.4, 957.24, 842.53, 801.16, 802.01, 690.43], '6M': [356.83, 370.66, 435.1, 561.13, 594.26, 723.39, 680.8, 672, 649.56, 801.99, 702.76, 896.02, 824.01, 873.6, 858.32, 944.28, 1030.37, 868.07, 860.62, 938, 853.26, 869.98, 861.97, 728.32, 802.01, 690.43], '1Y': [102.64, 102.85, 110.08, 111.13, 114.62, 117.43, 135.55, 141.91, 164.88, 171.5, 159.11, 169.75, 159.76, 163.23, 168.5, 200.13, 239.68, 226.86, 233.24, 325.16, 327.85, 372.09, 337.13, 390.77, 357.05, 339.87, 356.83, 370.66, 435.1, 561.13, 594.26, 723.39, 694.43, 672, 649.56, 801.99, 702.76, 896.02, 824.01, 873.6, 858.32, 944.28, 1030.37, 868.07, 860.62, 938, 853.26, 869.98, 861.97, 728.32, 802.01, 690.43] },
      velocityScore: { '1D': 2.1, '1W': 57.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$54B', pe: 122.2, revenueGrowth: 90, eps: 5.65, grossMargin: 41, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.41, RKNG: 3.32 },
      tonyNote: 'LITE appears in 2 of 3 Meme ETFs (67% coverage) with average weight 4.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 2, avgWeight: 4.07, proScore: 2.71, coverage: 0.667,
      price: 33.7, weeklyPrices: [38.98, 38.59, 38.28, 34.83, 33.70], weeklyChange: -13.55, dayChange: -3.24, sortRank: 0, periodReturns: { '1M': -42, 'YTD': -10.8, '6M': -41.7, '1Y': 86.7 },
      priceHistory: { '1D': [34.83, 33.78, 33.7], '1W': [38.98, 38.59, 38.28, 34.83, 33.7], '1M': [58.11, 59.96, 56.87, 54.72, 50.3, 47.74, 47.21, 45.91, 45.73, 43.32, 38.82, 43.91, 39.81, 43.01, 41.72, 41.14, 38.98, 38.59, 38.28, 34.83, 33.7], 'YTD': [37.77, 45.68, 57.82, 52.36, 54.39, 42.93, 42.08, 44.24, 40.13, 41.58, 41.29, 35.09, 35.74, 47.37, 48.39, 42.86, 60.98, 58.4, 58.06, 65.33, 59.19, 60.85, 50.3, 43.32, 41.14, 33.7], '6M': [54.26, 59.99, 54.39, 42.93, 42.08, 44.03, 43.84, 38.12, 42.96, 41.12, 34.28, 36.83, 48.82, 48.39, 42.86, 60.98, 55.17, 52.71, 64.05, 65.48, 51.52, 58.11, 47.74, 38.82, 41.14, 33.7], '1Y': [18.05, 18.14, 16.11, 18.57, 19.08, 19.59, 23.04, 26.13, 32.85, 36.32, 46.29, 47.02, 63.85, 61.83, 55.86, 58.22, 66.96, 48.65, 43.47, 47.81, 46.45, 43.94, 35.8, 40.3, 48.24, 50.33, 54.26, 59.99, 54.39, 42.93, 42.08, 44.03, 38.85, 38.12, 42.96, 41.12, 34.28, 36.83, 48.82, 48.39, 42.86, 60.98, 55.17, 52.71, 64.05, 65.48, 51.52, 58.11, 47.74, 38.82, 41.14, 33.7] },
      velocityScore: { '1D': -0.4, '1W': -4.9, '1M': -31.4, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 43.8, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 2.23, MEME: 5.9, RKNG: false },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'WULF', name: 'WULF', easyScore: 2, avgWeight: 4.07, proScore: 2.71, coverage: 0.667,
      price: 17.15, weeklyPrices: [20.89, 19.41, 19.37, 17.98, 17.15], weeklyChange: -17.9, dayChange: -4.62, sortRank: 0, periodReturns: { '1M': -38.4, 'YTD': 49.3, '6M': 23.8, '1Y': 220 },
      priceHistory: { '1D': [17.98, 17.17, 17.15], '1W': [20.89, 19.41, 19.37, 17.98, 17.15], '1M': [27.86, 28.98, 28.31, 28.78, 26.97, 26.06, 25.83, 25.58, 24.7, 23.58, 21.18, 22.21, 20.24, 22.83, 23.2, 21.97, 20.89, 19.41, 19.37, 17.98, 17.15], 'YTD': [11.49, 12.84, 13.85, 13.79, 14.8, 16.63, 15.38, 17.88, 15.23, 14.67, 15.1, 14.89, 16.57, 20.95, 20.55, 20.02, 25.74, 24.17, 22.92, 25.66, 25.86, 28.17, 26.97, 23.58, 21.97, 17.15], '6M': [13.33, 15.31, 14.8, 16.63, 15.38, 17.92, 15.37, 14.35, 16.04, 16.22, 14.43, 18.05, 19.67, 20.55, 20.02, 25.74, 23.12, 21.63, 26.4, 26.16, 23.19, 27.86, 26.06, 21.18, 21.97, 17.15], '1Y': [5.36, 5.32, 5.16, 4.94, 8.71, 9.19, 9.44, 8.87, 10.64, 11.17, 10.97, 11.58, 13.59, 13.86, 12.88, 14.82, 14.28, 11.68, 11.56, 15.51, 15.1, 15.83, 11.79, 11.75, 13.62, 13.81, 13.33, 15.31, 14.8, 16.63, 15.38, 17.92, 14.74, 14.35, 16.04, 16.22, 14.43, 18.05, 19.67, 20.55, 20.02, 25.74, 23.12, 21.63, 26.4, 26.16, 23.19, 27.86, 26.06, 21.18, 21.97, 17.15] },
      velocityScore: { '1D': 0.7, '1W': -9.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$8B', pe: null, revenueGrowth: -1, eps: -2.51, grossMargin: 64, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.28, RKNG: 2.85 },
      tonyNote: 'WULF appears in 2 of 3 Meme ETFs (67% coverage) with average weight 4.1% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'AMD', easyScore: 2, avgWeight: 3.81, proScore: 2.54, coverage: 0.667,
      price: 481.14, weeklyPrices: [534.39, 548.13, 529.14, 500.94, 481.14], weeklyChange: -9.96, dayChange: -3.95, sortRank: 0, periodReturns: { '1M': -6.1, 'YTD': 124.7, '6M': 107.5, '1Y': 199.9 },
      priceHistory: { '1D': [500.94, 479.85, 481.14], '1W': [534.39, 548.13, 529.14, 500.94, 481.14], '1M': [512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 516.11, 517.41, 546.72, 557.89, 534.39, 548.13, 529.14, 500.94, 481.14], 'YTD': [214.16, 204.68, 231.83, 251.31, 242.11, 213.57, 200.12, 203.68, 199.45, 193.39, 201.33, 201.99, 221.53, 255.07, 303.46, 337.11, 421.39, 449.7, 449.59, 510.13, 490.33, 547.26, 519.74, 540.88, 557.89, 481.14], '6M': [231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 518.09, 542.52, 452.4, 512.48, 532.57, 517.82, 557.89, 481.14], '1Y': [160.41, 162.12, 176.31, 172.4, 180.95, 163.71, 168.58, 161.79, 155.67, 157.92, 161.27, 169.73, 232.89, 234.56, 234.99, 254.84, 237.7, 247.96, 206.02, 217.53, 215.98, 221.43, 201.06, 214.99, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 190.95, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 518.09, 542.52, 452.4, 512.48, 532.57, 517.82, 557.89, 481.14] },
      velocityScore: { '1D': 0, '1W': 6.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$785B', pe: 159.8, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { BUZZ: 3.5, MEME: false, RKNG: 4.11 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 2, avgWeight: 3.7, proScore: 2.47, coverage: 0.667,
      price: 56.25, weeklyPrices: [67.58, 68.82, 66.31, 55.01, 56.25], weeklyChange: -16.77, dayChange: 2.25, sortRank: 0, periodReturns: { '1M': -34.2, 'YTD': -22.6, '6M': -51.4, '1Y': -2.1 },
      priceHistory: { '1D': [55.01, 55.73, 56.25], '1W': [67.58, 68.82, 66.31, 55.01, 56.25], '1M': [85.43, 80.66, 73.19, 72.87, 68.01, 65.62, 71.45, 86.77, 88.86, 86.1, 85.13, 80.64, 74.21, 74.95, 73.88, 73.32, 67.58, 68.82, 66.31, 55.01, 56.25], 'YTD': [72.63, 90.56, 115.77, 104.78, 115.76, 96.27, 84.43, 85.76, 93.86, 86.34, 89.93, 78.67, 92.57, 88.57, 84.66, 69.85, 70.68, 83.01, 96.23, 105.65, 92.06, 87.57, 68.01, 86.1, 73.32, 56.25], '6M': [112.44, 111.34, 115.76, 96.27, 84.43, 82.36, 104.89, 87.53, 95.7, 86.98, 82.87, 96.46, 86.91, 84.66, 69.85, 70.68, 74.81, 89.58, 133.09, 107.73, 87.32, 85.43, 65.62, 85.13, 73.32, 56.25], '1Y': [57.45, 60.06, 53.17, 47.71, 48.5, 44.98, 48.95, 41.86, 38.37, 41.44, 49.39, 66.16, 86.79, 89.5, 71.72, 76.68, 65.28, 61.44, 50.7, 56.2, 72.65, 84.75, 65.93, 71.95, 90.92, 98.39, 112.44, 111.34, 115.76, 96.27, 84.43, 82.36, 92.68, 87.53, 95.7, 86.98, 82.87, 96.46, 86.91, 84.66, 69.85, 70.68, 74.81, 89.58, 133.09, 107.73, 87.32, 85.43, 65.62, 85.13, 73.32, 56.25] },
      velocityScore: { '1D': -6.4, '1W': -0.4, '1M': 39.5, '6M': null }, isNew: false,
      marketCap: '$22B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.31, MEME: 5.09, RKNG: false },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 2, avgWeight: 3.44, proScore: 2.29, coverage: 0.667,
      price: 828.9, weeklyPrices: [937.00, 983.12, 904.28, 853.20, 828.90], weeklyChange: -11.54, dayChange: -2.85, sortRank: 0, periodReturns: { '1M': -20.5, 'YTD': 190.4, '6M': 128.5, '1Y': 631.9 },
      priceHistory: { '1D': [853.2, 825.41, 828.9], '1W': [937, 983.12, 904.28, 853.2, 828.9], '1M': [1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 938.38, 948.8, 991.64, 979.3, 937, 983.12, 904.28, 853.2, 828.9], 'YTD': [285.41, 327.02, 362.75, 389.09, 419.44, 373.25, 420.95, 415.56, 397.05, 426.13, 422.9, 357.22, 377.58, 465.66, 487.48, 518.46, 666.59, 776.01, 762.1, 1035.5, 949.28, 1087.99, 1048.51, 1032.28, 979.3, 828.9], '6M': [365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 923.52, 1079.57, 891.88, 1043.19, 1213.56, 975.56, 979.3, 828.9], '1Y': [113.26, 111.73, 109.14, 111.87, 125.29, 115.79, 122, 124.21, 150.57, 168.89, 156.83, 183.75, 192.33, 202.53, 206.71, 224.01, 238.33, 236.95, 201.37, 236.48, 226.65, 258.46, 248.55, 284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 420.95, 429, 379.68, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 923.52, 1079.57, 891.88, 1043.19, 1213.56, 975.56, 979.3, 828.9] },
      velocityScore: { '1D': 0, '1W': 4.1, '1M': -27.1, '6M': null }, isNew: false,
      marketCap: '$936B', pe: 18.7, revenueGrowth: 346, eps: 44.28, grossMargin: 73, dividendYield: 0.06,
      etfPresence: { BUZZ: 3.02, MEME: false, RKNG: 3.85 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'DELL', name: 'DELL', easyScore: 2, avgWeight: 3, proScore: 2, coverage: 0.667,
      price: 383.21, weeklyPrices: [427.11, 457.54, 412.68, 391.38, 383.21], weeklyChange: -10.28, dayChange: -2.04, sortRank: 0, periodReturns: { '1M': -8.6, 'YTD': 204.4, '6M': 217.9, '1Y': 209.3 },
      priceHistory: { '1D': [391.17, 380, 383.21], '1W': [427.11, 457.54, 412.68, 391.38, 383.21], '1M': [419.32, 409.5, 418.71, 427.78, 434.06, 409.45, 399.49, 414.61, 431.46, 425.25, 394.32, 411.8, 417.28, 431.97, 450.22, 434.97, 427.11, 457.54, 412.68, 391.38, 383.21], 'YTD': [125.88, 118.5, 120.53, 115.93, 117.15, 126.01, 116.78, 121.45, 146.52, 151.62, 157.67, 171.81, 177.69, 184.51, 214.65, 205.66, 238.8, 247.89, 252.8, 465.96, 400.77, 409.07, 434.06, 425.25, 434.97, 383.21], '6M': [111.07, 114.66, 117.15, 126.01, 116.78, 123.48, 147.1, 143.8, 153.01, 176.91, 164.13, 185.47, 177.28, 214.65, 205.66, 238.8, 243.87, 242.93, 317.05, 421.08, 369.83, 419.32, 409.45, 394.32, 434.97, 383.21], '1Y': [123.88, 128.35, 132.69, 133.93, 138.86, 127.83, 134.05, 126.67, 125.37, 132.11, 130.96, 147.37, 155.95, 151.31, 154.23, 161.01, 149.18, 133.94, 117.4, 133.35, 138.99, 138.6, 122.94, 129.24, 124.01, 120.47, 111.07, 114.66, 117.15, 126.01, 116.78, 123.48, 145.18, 143.8, 153.01, 176.91, 164.13, 185.47, 177.28, 214.65, 205.66, 238.8, 243.87, 242.93, 317.05, 421.08, 369.83, 419.32, 409.45, 394.32, 434.97, 383.21] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$248B', pe: 30.5, revenueGrowth: 88, eps: 12.56, grossMargin: 19, dividendYield: 0.64,
      etfPresence: { BUZZ: 1.59, MEME: false, RKNG: 4.4 },
      tonyNote: 'DELL appears in 2 of 3 Meme ETFs (67% coverage) with average weight 3.0% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HIMS', name: 'HIMS', easyScore: 1, avgWeight: 6.13, proScore: 2.04, coverage: 0.333,
      price: 32.75, weeklyPrices: [34.38, 35.15, 37.17, 33.68, 32.75], weeklyChange: -4.74, dayChange: -2.7, sortRank: 0, periodReturns: { '1M': 2.7, 'YTD': 0.9, '6M': 4.4, '1Y': -34.5 },
      priceHistory: { '1D': [33.66, 32.48, 32.75], '1W': [34.38, 35.15, 37.17, 33.68, 32.75], '1M': [31.89, 35.47, 33.54, 32.96, 32.7, 32.71, 33.94, 33.39, 34.67, 37.57, 36.8, 38.28, 36.17, 36.07, 35.45, 34.38, 34.38, 35.15, 37.17, 33.68, 32.75], 'YTD': [32.47, 33.87, 31.38, 30.28, 25.54, 17.24, 15.84, 15.6, 15.88, 24.77, 22.02, 19.38, 19.5, 21.36, 29.01, 26.33, 26.88, 24.24, 24.01, 27.76, 27.17, 30.17, 32.7, 37.57, 34.38, 32.75], '6M': [30.47, 29.68, 25.54, 17.24, 15.84, 15.82, 16.45, 23.47, 24.98, 21.34, 20.76, 19.39, 24.29, 29.01, 26.33, 26.88, 24.14, 23.04, 25.38, 27.51, 27.78, 31.89, 32.71, 36.8, 34.38, 32.75], '1Y': [49.99, 57.32, 66.18, 51.05, 47.13, 43.96, 44.12, 48.11, 51.76, 56.2, 54.87, 57.87, 58.25, 59.15, 48.49, 44.06, 41.52, 36.05, 33.62, 39.76, 40.02, 37.77, 34.77, 34.31, 34.71, 32.34, 30.47, 29.68, 25.54, 17.24, 15.84, 15.82, 15.82, 23.47, 24.98, 21.34, 20.76, 19.39, 24.29, 29.01, 26.33, 26.88, 24.14, 23.04, 25.38, 27.51, 27.78, 31.89, 32.71, 36.8, 34.38, 32.75] },
      velocityScore: { '1D': -1.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$8B', pe: null, revenueGrowth: 4, eps: -0.09, grossMargin: 73, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.13, RKNG: false },
      tonyNote: 'HIMS appears in 1 of 3 Meme ETFs (33% coverage) with average weight 6.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'COHR', name: 'COHR', easyScore: 1, avgWeight: 5.3, proScore: 1.77, coverage: 0.333,
      price: 267.5, weeklyPrices: [307.39, 310.77, 299.38, 276.96, 267.50], weeklyChange: -12.98, dayChange: -3.41, sortRank: 0, periodReturns: { '1M': -29.4, 'YTD': 44.9, '6M': 40, '1Y': 166.8 },
      priceHistory: { '1D': [276.94, 267.42, 267.5], '1W': [307.39, 310.77, 299.38, 276.96, 267.5], '1M': [378.85, 389.57, 425.48, 381.22, 392.5, 407.25, 380.56, 391.22, 394.47, 368.65, 333.36, 335.7, 314.13, 317.05, 327.24, 324.5, 307.39, 310.77, 299.38, 276.96, 267.5], 'YTD': [184.57, 173.15, 191.04, 197.76, 229.18, 228.37, 223.89, 250.14, 253.87, 242.76, 253.63, 243.48, 255.1, 313.42, 350.47, 304.93, 344.67, 404.94, 378, 362.9, 401.93, 413.84, 392.5, 368.65, 324.5, 267.5], '6M': [193.46, 214, 229.18, 228.37, 223.89, 267.9, 274.86, 260.64, 245.8, 272.33, 238.21, 281.79, 308.2, 350.47, 304.93, 344.67, 403.71, 358.5, 376.95, 417.43, 354.77, 378.85, 407.25, 333.36, 324.5, 267.5], '1Y': [100.28, 98.72, 107.6, 113.82, 91.65, 86.6, 95.2, 95.62, 103.51, 108.05, 106.57, 112.79, 122.35, 115.96, 121.52, 132.71, 159.3, 139.97, 135.61, 164.26, 177.35, 198.5, 175.71, 191.72, 186.36, 185.18, 193.46, 214, 229.18, 228.37, 223.89, 267.9, 280.81, 260.64, 245.8, 272.33, 238.21, 281.79, 308.2, 350.47, 304.93, 344.67, 403.71, 358.5, 376.95, 417.43, 354.77, 378.85, 407.25, 333.36, 324.5, 267.5] },
      velocityScore: { '1D': null, '1W': 2.3, '1M': null, '6M': null }, isNew: true,
      marketCap: '$52B', pe: 127.4, revenueGrowth: 21, eps: 2.1, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.3, RKNG: false },
      tonyNote: 'COHR appears in 1 of 3 Meme ETFs (33% coverage) with average weight 5.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 1, avgWeight: 5.23, proScore: 1.74, coverage: 0.333,
      price: 25.2, weeklyPrices: [28.84, 28.47, 29.03, 26.44, 25.20], weeklyChange: -12.6, dayChange: -4.67, sortRank: 0, periodReturns: { '1M': -44.7, 'YTD': 2.8, '6M': -32.6, '1Y': 131 },
      priceHistory: { '1D': [26.44, 25.24, 25.2], '1W': [28.84, 28.47, 29.03, 26.44, 25.2], '1M': [45.57, 46.59, 45.2, 45.27, 41.98, 40.95, 39.16, 37.77, 37.3, 35.52, 33.06, 33.5, 30.71, 31.44, 32.29, 31.15, 28.84, 28.47, 29.03, 26.44, 25.2], 'YTD': [24.52, 31.94, 37.4, 36.18, 36.7, 37.47, 31.91, 28.65, 28.09, 27.05, 25.93, 23.76, 25.18, 31.47, 32.43, 32.69, 44.24, 46.71, 48.02, 47.94, 40.94, 46.47, 41.98, 35.52, 31.15, 25.2], '6M': [35.46, 41.35, 36.7, 37.47, 31.91, 29.08, 28.65, 27.4, 27.51, 26.79, 23.74, 27.79, 30.81, 32.43, 32.69, 44.24, 45.48, 39.52, 49.65, 44.71, 38.92, 45.57, 40.95, 33.06, 31.15, 25.2], '1Y': [10.91, 11.2, 13.14, 14.24, 14.55, 15.77, 16.6, 14.33, 17.18, 19.91, 22.59, 26.47, 29.29, 36.64, 33.38, 33.95, 31.08, 23.06, 21.37, 27.1, 31.14, 30.76, 23.9, 24.05, 30.2, 38.21, 35.46, 41.35, 36.7, 37.47, 31.91, 29.08, 26.15, 27.4, 27.51, 26.79, 23.74, 27.79, 30.81, 32.43, 32.69, 44.24, 45.48, 39.52, 49.65, 44.71, 38.92, 45.57, 40.95, 33.06, 31.15, 25.2] },
      velocityScore: { '1D': -0.6, '1W': 0, '1M': -54.1, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 139, eps: -0.35, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.23, RKNG: false },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 1, avgWeight: 5.15, proScore: 1.72, coverage: 0.333,
      price: 34.67, weeklyPrices: [38.88, 39.29, 37.51, 35.10, 34.67], weeklyChange: -10.83, dayChange: -1.3, sortRank: 0, periodReturns: { '1M': -36.6, 'YTD': -22.7, '6M': -31.8, '1Y': -22.7 },
      priceHistory: { '1D': [35.13, 34.87, 34.67], '1W': [38.88, 39.29, 37.51, 35.1, 34.67], '1M': [54.69, 56.55, 58.32, 57.85, 53.6, 50.56, 49.31, 53.88, 53.26, 51.4, 49.12, 48.87, 45.36, 45.08, 44.77, 42.86, 38.88, 39.29, 37.51, 35.1, 34.67], 'YTD': [44.87, 50.45, 50.8, 43.37, 38.47, 35.19, 33.34, 40.88, 36.02, 32.98, 31.2, 27.51, 28.49, 35.76, 47.36, 42.11, 52.57, 57.47, 58.89, 69.28, 62.8, 61.18, 53.6, 51.4, 42.86, 34.67], '6M': [50.66, 45.49, 38.47, 35.19, 33.34, 33.59, 37.13, 35.12, 33.31, 32.7, 28.83, 28.99, 43.25, 47.36, 42.11, 52.57, 55.26, 52.47, 70.14, 68.23, 56.63, 54.69, 50.56, 49.12, 42.86, 34.67], '1Y': [44.84, 43.9, 39.87, 40.49, 41.03, 37.17, 43.3, 42.11, 47.05, 66.81, 69.43, 69.6, 77.5, 65.59, 59.37, 60.17, 57.43, 45.4, 41, 49.3, 54.76, 52.55, 46.44, 46, 48.71, 50.95, 50.66, 45.49, 38.47, 35.19, 33.34, 33.59, 37.05, 35.12, 33.31, 32.7, 28.83, 28.99, 43.25, 47.36, 42.11, 52.57, 55.26, 52.47, 70.14, 68.23, 56.63, 54.69, 50.56, 49.12, 42.86, 34.67] },
      velocityScore: { '1D': 2.4, '1W': null, '1M': -25.5, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 88.9, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.15, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 1, avgWeight: 4.87, proScore: 1.62, coverage: 0.333,
      price: 449.4, weeklyPrices: [555.55, 563.32, 513.84, 466.81, 449.40], weeklyChange: -19.11, dayChange: -3.73, sortRank: 0, periodReturns: { '1M': -36.9, 'YTD': 160.9, '6M': 102.9, '1Y': 570.5 },
      priceHistory: { '1D': [466.81, 445, 449.4], '1W': [555.55, 563.32, 513.84, 466.81, 449.4], '1M': [712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539, 577.46, 532.1, 550.3, 578.05, 582.59, 555.55, 563.32, 513.84, 466.81, 449.4], 'YTD': [172.27, 187.68, 221.51, 240.85, 290.24, 262.56, 296.56, 282.25, 259.03, 272.29, 293.1, 275.34, 311.96, 366.22, 389.1, 412.76, 483.15, 489.15, 486.46, 546.2, 526.93, 653.53, 643.83, 598.37, 582.59, 449.4], '6M': [222.97, 252.66, 290.24, 262.56, 296.56, 290.95, 261.3, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 459.62, 531.18, 594.11, 490.09, 712.13, 675.39, 539, 582.59, 449.4], '1Y': [67.02, 69.02, 78.69, 74.44, 76.24, 74.66, 82.04, 90.49, 96.15, 105.15, 107.21, 131.26, 119.7, 125.92, 125.72, 138.13, 163.6, 157.16, 140.23, 163.33, 161, 187.2, 175.01, 181.54, 187.88, 212.14, 222.97, 252.66, 290.24, 262.56, 296.56, 290.95, 250.61, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 459.62, 531.18, 594.11, 490.09, 712.13, 675.39, 539, 582.59, 449.4] },
      velocityScore: { '1D': -1.2, '1W': -46.9, '1M': -0.6, '6M': null }, isNew: false,
      marketCap: '$155B', pe: 26.9, revenueGrowth: 46, eps: 16.71, grossMargin: 45, dividendYield: 0.13,
      etfPresence: { BUZZ: false, MEME: 4.87, RKNG: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'STX', name: 'STX', easyScore: 1, avgWeight: 4.81, proScore: 1.6, coverage: 0.333,
      price: 720.83, weeklyPrices: [860.66, 878.31, 828.30, 745.49, 720.83], weeklyChange: -16.25, dayChange: -3.32, sortRank: 0, periodReturns: { '1M': -32.4, 'YTD': 161.7, '6M': 121, '1Y': 391.3 },
      priceHistory: { '1D': [745.49, 713.43, 720.83], '1W': [860.66, 878.31, 828.3, 745.49, 720.83], '1M': [1066.07, 1070.23, 1094.04, 1038.59, 993.25, 1025.36, 899.9, 968.53, 965, 915.19, 820.16, 868.26, 827.64, 860.02, 890.09, 910.34, 860.66, 878.31, 828.3, 745.49, 720.83], 'YTD': [275.39, 284.47, 326.23, 358.29, 444.45, 396.23, 424.14, 409.67, 367.34, 383.71, 411.23, 380.07, 468.72, 533.44, 579.88, 643.3, 786.42, 804.76, 810.46, 921.26, 876.77, 1018.8, 993.25, 915.19, 910.34, 720.83], '6M': [325.99, 371.76, 444.45, 396.23, 424.14, 421.85, 375.01, 384.29, 421.09, 424.96, 391.76, 496.3, 519.6, 579.88, 643.3, 786.42, 817.35, 751.07, 880.72, 940.69, 815.99, 1066.07, 1025.36, 820.16, 910.34, 720.83], '1Y': [146.72, 152.73, 157.01, 148.1, 155.73, 154.6, 172.38, 183.98, 196.81, 216.64, 219.85, 254.74, 221.7, 226.03, 226.41, 268.34, 278.47, 262.56, 240.5, 276.69, 265.63, 307.85, 292, 286.22, 289.83, 321.48, 325.99, 371.76, 444.45, 396.23, 424.14, 421.85, 357.62, 384.29, 421.09, 424.96, 391.76, 496.3, 519.6, 579.88, 643.3, 786.42, 817.35, 751.07, 880.72, 940.69, 815.99, 1066.07, 1025.36, 820.16, 910.34, 720.83] },
      velocityScore: { '1D': 0.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$163B', pe: 68.6, revenueGrowth: 44, eps: 10.51, grossMargin: 42, dividendYield: 0.4,
      etfPresence: { BUZZ: false, MEME: 4.81, RKNG: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'CBRS', name: 'CBRS', easyScore: 1, avgWeight: 4.47, proScore: 1.49, coverage: 0.333,
      price: 173, weeklyPrices: [204.62, 203.81, 184.01, 180.46, 173.00], weeklyChange: -15.45, dayChange: -4.13, sortRank: 0, periodReturns: { '1M': -19, 'YTD': -44.4, '6M': -44.4, '1Y': -44.4 },
      priceHistory: { '1D': [180.46, 173.82, 173], '1W': [204.62, 203.81, 184.01, 180.46, 173], '1M': [213.67, 234.71, 224.43, 226.72, 182.26, 168.52, 181.59, 216.16, 221, 221.27, 204.86, 192.01, 176.61, 181.72, 198.53, 215.08, 204.62, 203.81, 184.01, 180.46, 173], 'YTD': [311.07, 296.65, 303.63, 281.86, 241.71, 242.59, 236.99, 236.52, 215.4, 201.01, 226.82, 226.55, 218.03, 212.25, 234.71, 226.72, 168.52, 181.59, 221, 204.86, 192.01, 181.72, 215.08, 203.81, 184.01, 173], '6M': [311.07, 296.65, 303.63, 281.86, 241.71, 242.59, 236.99, 236.52, 215.4, 201.01, 226.82, 226.55, 218.03, 212.25, 234.71, 226.72, 168.52, 181.59, 221, 204.86, 192.01, 181.72, 215.08, 203.81, 184.01, 173], '1Y': [311.07, 279.72, 296.65, 303.63, 290.69, 281.86, 256.78, 241.71, 266.9, 242.59, 236.99, 213.28, 236.52, 214.94, 215.4, 201.01, 237.83, 226.82, 237.33, 226.55, 214, 218.03, 212.25, 213.67, 234.71, 224.43, 226.72, 182.26, 168.52, 181.59, 216.16, 221, 221.27, 204.86, 192.01, 176.61, 181.72, 198.53, 215.08, 204.62, 203.81, 184.01, 180.46, 173] },
      velocityScore: { '1D': 8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$39B', pe: 384.4, revenueGrowth: 94, eps: 0.45, grossMargin: 40, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.47, RKNG: false },
      tonyNote: 'CBRS appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'CRDO', easyScore: 1, avgWeight: 4.35, proScore: 1.45, coverage: 0.333,
      price: 191.46, weeklyPrices: [236.88, 236.18, 226.74, 207.97, 191.46], weeklyChange: -19.17, dayChange: -7.94, sortRank: 0, periodReturns: { '1M': -23.2, 'YTD': 33.1, '6M': 26.8, '1Y': 94.5 },
      priceHistory: { '1D': [207.97, 192.07, 191.46], '1W': [236.88, 236.18, 226.74, 207.97, 191.46], '1M': [249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.09, 241.91, 265.55, 246.4, 258.69, 265.65, 257.79, 236.88, 236.18, 226.74, 207.97, 191.46], 'YTD': [143.89, 141.59, 150.97, 128.02, 111.31, 134.72, 127.91, 114.48, 114.74, 117.69, 103.4, 95.24, 106.79, 159.52, 189.49, 175.77, 198.29, 184.54, 193.39, 226.1, 222.27, 259.41, 268.99, 259.09, 257.79, 191.46], '6M': [153.22, 129.57, 111.31, 134.72, 127.91, 123.46, 102.54, 112.33, 104.06, 100.3, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 189.36, 182.98, 222.35, 214.6, 237.68, 249.33, 268.03, 241.91, 257.79, 191.46], '1Y': [98.45, 101.17, 111.55, 119.78, 117.33, 110.86, 131.82, 134, 159.32, 172.31, 144.94, 149.63, 151.15, 136.53, 150.97, 166.62, 162.74, 142.95, 134.73, 177.6, 180.92, 154.47, 138.57, 144.83, 140.24, 156.07, 153.22, 129.57, 111.31, 134.72, 127.91, 123.46, 97.3, 112.33, 104.06, 100.3, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 189.36, 182.98, 222.35, 214.6, 237.68, 249.33, 268.03, 241.91, 257.79, 191.46] },
      velocityScore: { '1D': 0.7, '1W': -25.3, '1M': -49.3, '6M': null }, isNew: false,
      marketCap: '$36B', pe: 76, revenueGrowth: 157, eps: 2.52, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.35, RKNG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'ALAB', name: 'ALAB', easyScore: 1, avgWeight: 4.26, proScore: 1.42, coverage: 0.333,
      price: 301.26, weeklyPrices: [362.05, 361.78, 350.62, 319.74, 301.26], weeklyChange: -16.79, dayChange: -5.78, sortRank: 0, periodReturns: { '1M': -19.6, 'YTD': 81.1, '6M': 65.5, '1Y': 207.6 },
      priceHistory: { '1D': [319.74, 302, 301.26], '1W': [362.05, 361.78, 350.62, 319.74, 301.26], '1M': [374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86, 406.42, 432.74, 382.89, 393.16, 417.45, 412.97, 362.05, 361.78, 350.62, 319.74, 301.26], 'YTD': [166.36, 156.73, 182, 163.25, 158.52, 182.86, 129.58, 124.67, 120, 120.31, 116.04, 112.47, 118.99, 170.6, 194.06, 196.85, 213.91, 228.64, 297.84, 320.09, 346.33, 389.2, 399.92, 430.86, 412.97, 301.26], '6M': [183.75, 170.93, 158.52, 182.86, 129.58, 128.15, 113.77, 116.48, 127.57, 121.76, 109.6, 125.46, 172.09, 194.06, 196.85, 213.91, 224.09, 287.48, 349.17, 363.54, 330.86, 374.68, 398, 406.42, 412.97, 301.26], '1Y': [97.95, 121.68, 136.73, 170.89, 190.69, 177.53, 189.15, 187.95, 232.9, 251.88, 200.64, 209.6, 225.43, 163.55, 163.64, 169.55, 162.83, 144.47, 139.29, 157.57, 152.51, 173.7, 145.88, 167.26, 167.11, 172.57, 183.75, 170.93, 158.52, 182.86, 129.58, 128.15, 109.8, 116.48, 127.57, 121.76, 109.6, 125.46, 172.09, 194.06, 196.85, 213.91, 224.09, 287.48, 349.17, 363.54, 330.86, 374.68, 398, 406.42, 412.97, 301.26] },
      velocityScore: { '1D': 0, '1W': -22, '1M': null, '6M': null }, isNew: false,
      marketCap: '$52B', pe: 204.9, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.26, RKNG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
