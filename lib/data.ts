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
export const SPY_RET: Record<Period, number> = { '1W': -1.5, '1M': -2.3, 'YTD': 7.6, '6M': 6.3, '1Y': 19.9 };
// @@END_GENERATED:SPY_RET@@

// Top holdings per ETF (ticker + portfolio weight %), shown on ETF row hover.
export type EtfHolding = { t: string; w: number };

// @@GENERATED:ETF_TOP_HOLDINGS@@
export const ETF_TOP_HOLDINGS: Record<string, EtfHolding[]> = {
  AIS: [{ t: 'MU', w: 7.5 }, { t: 'AMD', w: 4.6 }, { t: 'MRVL', w: 3.9 }, { t: 'SIMO', w: 3.6 }, { t: 'VRT', w: 3.5 }],
  ARTY: [{ t: 'MU', w: 5.7 }, { t: 'AMD', w: 4.9 }, { t: 'MRVL', w: 4.3 }, { t: 'NVDA', w: 4.3 }, { t: 'AVGO', w: 4.3 }],
  BAI: [{ t: 'MU', w: 7.0 }, { t: 'LRCX', w: 4.9 }, { t: 'AMD', w: 4.8 }, { t: 'TSM', w: 4.2 }, { t: 'AVGO', w: 4.0 }],
  IGPT: [{ t: 'AMD', w: 8.2 }, { t: 'MU', w: 8.1 }, { t: 'META', w: 7.5 }, { t: 'NVDA', w: 7.5 }, { t: 'GOOGL', w: 7.4 }],
  IVES: [{ t: 'MU', w: 6.0 }, { t: 'TSM', w: 5.1 }, { t: 'AMD', w: 5.0 }, { t: 'NVDA', w: 4.9 }, { t: 'AVGO', w: 4.9 }],
  ALAI: [{ t: 'NVDA', w: 12.4 }, { t: 'TSM', w: 5.6 }, { t: 'AMZN', w: 5.3 }, { t: 'GOOG', w: 4.7 }, { t: 'MSFT', w: 4.7 }],
  CHAT: [{ t: 'NVDA', w: 6.1 }, { t: 'GOOGL', w: 4.9 }, { t: 'MU', w: 4.5 }, { t: 'AMD', w: 4.0 }, { t: 'AVGO', w: 3.9 }],
  AIFD: [{ t: 'MU', w: 7.0 }, { t: 'NVDA', w: 6.4 }, { t: 'MRVL', w: 6.2 }, { t: 'LITE', w: 5.9 }, { t: 'AVGO', w: 5.4 }],
  SPRX: [{ t: 'ALAB', w: 9.7 }, { t: 'COHR', w: 8.6 }, { t: 'ARM', w: 8.0 }, { t: 'KLAC', w: 7.5 }, { t: 'NET', w: 6.5 }],
  AOTG: [{ t: 'AMD', w: 16.3 }, { t: 'MU', w: 10.9 }, { t: 'NVDA', w: 10.4 }, { t: 'TSM', w: 7.4 }, { t: 'TOST', w: 4.6 }],
  SOXX: [{ t: 'MU', w: 9.2 }, { t: 'AMD', w: 7.6 }, { t: 'NVDA', w: 6.8 }, { t: 'AVGO', w: 6.3 }, { t: 'INTC', w: 6.2 }],
  PSI: [{ t: 'AMAT', w: 6.2 }, { t: 'KLAC', w: 5.7 }, { t: 'MU', w: 5.6 }, { t: 'LRCX', w: 5.6 }, { t: 'INTC', w: 5.1 }],
  XSD: [{ t: 'MU', w: 3.0 }, { t: 'ALGM', w: 3.0 }, { t: 'MXL', w: 2.9 }, { t: 'INTC', w: 2.7 }, { t: 'ALAB', w: 2.6 }],
  DRAM: [{ t: 'SNDK', w: 5.0 }, { t: 'WDC', w: 4.2 }, { t: 'STX', w: 4.2 }, { t: 'TWD', w: 1.1 }, { t: 'MU', w: 0.7 }],
  PTF: [{ t: 'SNDK', w: 8.6 }, { t: 'WDC', w: 5.6 }, { t: 'STX', w: 5.2 }, { t: 'MU', w: 5.1 }, { t: 'AAPL', w: 4.3 }],
  WCLD: [{ t: 'DOCN', w: 3.6 }, { t: 'FROG', w: 3.0 }, { t: 'PANW', w: 2.8 }, { t: 'DDOG', w: 2.8 }, { t: 'CRWD', w: 2.5 }],
  IGV: [{ t: 'PANW', w: 9.5 }, { t: 'MSFT', w: 8.1 }, { t: 'PLTR', w: 7.5 }, { t: 'ORCL', w: 6.9 }, { t: 'CRWD', w: 6.9 }],
  FDTX: [{ t: 'MU', w: 9.4 }, { t: 'MRVL', w: 8.1 }, { t: 'TSM', w: 6.0 }, { t: 'NVDA', w: 4.6 }, { t: 'STX', w: 4.0 }],
  GTEK: [{ t: 'MRVL', w: 4.4 }, { t: 'DELL', w: 3.1 }, { t: 'APH', w: 2.4 }, { t: 'CDNS', w: 2.4 }, { t: 'TER', w: 2.0 }],
  ARKK: [{ t: 'TSLA', w: 9.6 }, { t: 'TEM', w: 5.6 }, { t: 'CRSP', w: 5.1 }, { t: 'AMD', w: 4.8 }, { t: 'HOOD', w: 4.4 }],
  MARS: [{ t: 'SPCX', w: 23.6 }, { t: 'RKLB', w: 9.4 }, { t: 'ASTS', w: 6.8 }, { t: 'GSAT', w: 4.9 }, { t: 'PL', w: 4.7 }],
  FRWD: [{ t: 'STX', w: 8.6 }, { t: 'NVDA', w: 8.2 }, { t: 'AMD', w: 7.1 }, { t: 'TSM', w: 5.9 }, { t: 'WDC', w: 5.9 }],
  BCTK: [{ t: 'TSM', w: 8.8 }, { t: 'SPCX', w: 8.3 }, { t: 'LRCX', w: 8.2 }, { t: 'AVGO', w: 7.0 }, { t: 'NVDA', w: 6.0 }],
  FWD: [{ t: 'AMD', w: 2.1 }, { t: 'AMAT', w: 2.1 }, { t: 'LRCX', w: 2.0 }, { t: 'NVDA', w: 1.9 }, { t: 'AVGO', w: 1.8 }],
  CBSE: [{ t: 'LRCX', w: 3.0 }, { t: 'SBUX', w: 3.0 }, { t: 'SCI', w: 3.0 }, { t: 'KRYS', w: 2.9 }, { t: 'KLAC', w: 2.9 }],
  FCUS: [{ t: 'SNDK', w: 5.4 }, { t: 'INTC', w: 5.4 }, { t: 'WDC', w: 5.3 }, { t: 'BE', w: 5.1 }, { t: 'STX', w: 4.9 }],
  WGMI: [{ t: 'CIFR', w: 17.3 }, { t: 'IREN', w: 11.1 }, { t: 'WULF', w: 9.8 }, { t: 'KEEL', w: 7.8 }, { t: 'CORZ', w: 7.5 }],
  CNEQ: [{ t: 'NVDA', w: 13.3 }, { t: 'MSFT', w: 6.1 }, { t: 'TSM', w: 5.8 }, { t: 'WDC', w: 5.7 }, { t: 'GOOG', w: 5.7 }],
  SGRT: [{ t: 'WDC', w: 9.8 }, { t: 'MU', w: 8.4 }, { t: 'LITE', w: 8.0 }, { t: 'DELL', w: 6.4 }, { t: 'NVDA', w: 6.2 }],
  SPMO: [{ t: 'MU', w: 11.3 }, { t: 'NVDA', w: 7.8 }, { t: 'AVGO', w: 6.3 }, { t: 'GOOGL', w: 4.3 }, { t: 'AMD', w: 4.1 }],
  XMMO: [{ t: 'CW', w: 4.1 }, { t: 'STRL', w: 3.6 }, { t: 'TTMI', w: 3.4 }, { t: 'ATI', w: 3.3 }, { t: 'WWD', w: 3.0 }],
  POW: [{ t: 'POWL', w: 5.1 }, { t: 'PWR', w: 5.0 }, { t: 'PRY', w: 4.3 }, { t: 'ETN', w: 4.1 }, { t: 'NVT', w: 3.8 }],
  VOLT: [{ t: 'BELFB', w: 7.8 }, { t: 'POWL', w: 7.5 }, { t: 'ETN', w: 5.3 }, { t: 'PWR', w: 5.3 }, { t: 'NEE', w: 4.8 }],
  PBD: [{ t: 'ENRG', w: 1.1 }, { t: 'ALFEN', w: 1.1 }, { t: 'SHLS', w: 1.1 }],
  PBW: [{ t: 'FCEL', w: 4.0 }, { t: 'HYLN', w: 3.2 }, { t: 'BE', w: 2.8 }, { t: 'NVTS', w: 2.5 }, { t: 'ASPN', w: 2.2 }],
  IVEP: [{ t: 'BE', w: 5.5 }, { t: 'PWR', w: 4.3 }, { t: 'GEV', w: 4.2 }, { t: 'COHR', w: 4.2 }, { t: 'VRT', w: 4.1 }],
  AIRR: [{ t: 'STRL', w: 6.3 }, { t: 'FIX', w: 4.5 }, { t: 'AGX', w: 4.5 }, { t: 'MTZ', w: 4.1 }, { t: 'CHRW', w: 3.9 }],
  PRN: [{ t: 'TTMI', w: 6.4 }, { t: 'FIX', w: 4.8 }, { t: 'AGX', w: 4.6 }, { t: 'STRL', w: 4.4 }, { t: 'VICR', w: 4.2 }],
  RSHO: [{ t: 'TKR', w: 8.7 }, { t: 'POWL', w: 7.3 }, { t: 'CGNX', w: 7.2 }, { t: 'CAT', w: 6.9 }, { t: 'AIT', w: 6.0 }],
  IDEF: [{ t: 'RTX', w: 8.4 }, { t: 'LMT', w: 7.0 }, { t: 'BA', w: 5.1 }, { t: 'GD', w: 4.4 }, { t: 'FTNT', w: 3.4 }],
  BILT: [{ t: 'UNP', w: 5.7 }, { t: 'AEP', w: 4.6 }, { t: 'AENA', w: 4.5 }, { t: 'XEL', w: 4.2 }, { t: 'TRP', w: 3.8 }],
  BUZZ: [{ t: 'NBIS', w: 3.8 }, { t: 'AMD', w: 3.2 }, { t: 'MU', w: 3.2 }, { t: 'SMCI', w: 3.2 }, { t: 'SOFI', w: 3.1 }],
  MEME: [{ t: 'SNDK', w: 7.8 }, { t: 'AAOI', w: 7.5 }, { t: 'BE', w: 7.1 }, { t: 'NBIS', w: 6.9 }, { t: 'LITE', w: 6.5 }],
  RKNG: [{ t: 'BE', w: 4.0 }, { t: 'WDC', w: 4.0 }, { t: 'NBIS', w: 3.9 }, { t: 'CIFR', w: 3.7 }, { t: 'WULF', w: 3.6 }],
};
// @@END_GENERATED:ETF_TOP_HOLDINGS@@

// @@GENERATED:ETF_INFO@@
export const ETF_INFO: Record<string, { name: string; manager: string; aum?: number }> = {
  AIS: { name: "VistaShares Artificial Intelligence Supercycle ETF", manager: "VistaShares Advisors LLC", aum: 697229184 },
  ARTY: { name: "iShares Future AI & Tech ETF", manager: "iShares", aum: 3690797056 },
  BAI: { name: "iShares A.I. Innovation and Tech Active ETF", manager: "iShares", aum: 16266604544 },
  IGPT: { name: "Invesco AI and Next Gen Software ETF", manager: "Invesco", aum: 1213254528 },
  IVES: { name: "Dan IVES Wedbush AI Revolution ETF", manager: "Wedbush Funds", aum: 1190203648 },
  ALAI: { name: "Alger AI Enablers & Adopters ETF", manager: "Alger", aum: 437331872 },
  CHAT: { name: "Roundhill Generative AI & Technology ETF", manager: "Roundhill Investments", aum: 2057388288 },
  AIFD: { name: "TCW Artificial Intelligence ETF", manager: "TCW", aum: 130505640 },
  SPRX: { name: "Spear Alpha ETF", manager: "Spear", aum: 241482736 },
  AOTG: { name: "AOT Growth and Innovation ETF", manager: "AOT Invest LLC", aum: 104877952 },
  SOXX: { name: "iShares Semiconductor ETF", manager: "iShares", aum: 38373490688 },
  PSI: { name: "Invesco Semiconductors ETF", manager: "Invesco", aum: 2637922304 },
  XSD: { name: "State Street SPDR S&P Semiconductor ETF", manager: "State Street Investment Management", aum: 3338012416 },
  DRAM: { name: "Roundhill Memory ETF", manager: "Roundhill Investments", aum: 13879257088 },
  PTF: { name: "Invesco Dorsey Wright Technology Momentum ETF", manager: "Invesco", aum: 729403904 },
  WCLD: { name: "WisdomTree Cloud Computing Fund", manager: "WisdomTree", aum: 269380384 },
  IGV: { name: "iShares Expanded Tech-Software Sector ETF", manager: "iShares", aum: 16675979264 },
  FDTX: { name: "Fidelity Disruptive Technology ETF", manager: "Fidelity Investments", aum: 257849680 },
  GTEK: { name: "Goldman Sachs Future Tech Leaders Equity ETF", manager: "Goldman Sachs", aum: 243369856 },
  ARKK: { name: "ARK Innovation ETF", manager: "ARK ETF Trust", aum: 7262198784 },
  MARS: { name: "Roundhill Space & Technology ETF", manager: "Roundhill Investments", aum: 100911440 },
  FRWD: { name: "Nomura Transformational Technologies ETF", manager: "Nomura", aum: 222516800 },
  BCTK: { name: "Baron Technology ETF", manager: "Baron Capital Group, Inc.", aum: 187901088 },
  FWD: { name: "AB Disruptors ETF", manager: "AllianceBernstein", aum: 2887140352 },
  CBSE: { name: "Clough Select Equity ETF", manager: "Clough Capital Partners L.P.", aum: 52302356 },
  FCUS: { name: "Pinnacle Focused Opportunities ETF", manager: "Pinnacle", aum: 93743328 },
  WGMI: { name: "CoinShares Bitcoin Mining ETF", manager: "CoinShares ETF Trust", aum: 447991360 },
  CNEQ: { name: "Alger Concentrated Equity ETF", manager: "Alger", aum: 696849408 },
  SGRT: { name: "SMART Earnings Growth 30 ETF", manager: "SmartWay ETFs", aum: 58195344 },
  SPMO: { name: "Invesco S&P 500 Momentum ETF", manager: "Invesco", aum: 19899088896 },
  XMMO: { name: "Invesco S&P MidCap Momentum ETF", manager: "Invesco", aum: 7489659904 },
  POW: { name: "VistaShares Electrification Supercycle ETF", manager: "" },
  VOLT: { name: "Tema Electrification ETF", manager: "Tema Global Limited", aum: 723851136 },
  PBD: { name: "Invesco Global Clean Energy ETF", manager: "Invesco", aum: 232711888 },
  PBW: { name: "Invesco WilderHill Clean Energy ETF", manager: "Invesco", aum: 610229824 },
  IVEP: { name: "Dan IVES Wedbush AI Power & Infrastructure ETF", manager: "Wedbush Funds", aum: 20074692 },
  AIRR: { name: "First Trust RBA American Industrial RenaissanceTM ETF", manager: "First Trust", aum: 10617638912 },
  PRN: { name: "Invesco Dorsey Wright Industrials Momentum ETF", manager: "Invesco", aum: 449534592 },
  RSHO: { name: "Tema U.S. Manufacturing & Reshoring ETF", manager: "Tema Global Limited", aum: 274074464 },
  IDEF: { name: "iShares Defense Industrials Act", manager: "BlackRock", aum: 3899316992 },
  BILT: { name: "iShares Infrastructure Active ETF", manager: "BlackRock", aum: 30248424 },
  BUZZ: { name: "VanEck Social Sentiment ETF", manager: "VanEck", aum: 118610192 },
  MEME: { name: "Roundhill ETF Trust - Roundhill Meme Stock ETF", manager: "" },
  RKNG: { name: "Defiance Retail Kings ETF", manager: "Defiance ETFs LLC", aum: 7269615 },
};
// @@END_GENERATED:ETF_INFO@@

// @@GENERATED:TOP10_RET@@
// Top10 composite returns per theme per period (average of all ETFs in theme)
const TOP10_RET: Record<Theme, Record<Period, number>> = {
  'AI & ML':         { '1W': -7.2, '1M': -0.3, 'YTD': 46.1, '6M': 43.7, '1Y': 79.1 },
  'Semiconductors':  { '1W': -9.7, '1M': 5, 'YTD': 113.2, '6M': 110.2, '1Y': 153.5 },
  'Broad Tech':      { '1W': -4.3, '1M': -2.5, 'YTD': 27.6, '6M': 24.8, '1Y': 46.8 },
  'Electrification': { '1W': -6.8, '1M': -9, 'YTD': 27, '6M': 24.6, '1Y': 49.4 },
  'Industrials':     { '1W': -1.2, '1M': -0.2, 'YTD': 25.5, '6M': 23, '1Y': 41.8 },
  'Meme':            { '1W': -9.5, '1M': -11.8, 'YTD': 19.9, '6M': 17.9, '1Y': 5.3 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, IndexChartByPeriod> = {
  'AI & ML': {
    '1D': { top10: [100, 96.46, 96.39, 97.6, 97.41, 97.47, 97.08, 96.96, 96.71, 96.86, 97.36, 97.55, 97.43, 97.35, 97.49, 97.68, 97.7, 97.99, 97.71, 97.81, 97.69, 97.51, 97.44, 97.18], spy: [100, 99.31, 99.32, 99.83, 99.77, 99.87, 99.81, 99.75, 99.7, 99.93, 100.2, 100.04, 100.14, 99.96, 100.04, 99.96, 100.02, 100.18, 99.97, 99.97, 99.94, 99.99, 99.96, 99.89], top10Return: -2.4, spyReturn: -0.11, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 94.17, 93.33, 95.02, 92.81], spy: [100, 98.55, 98.5, 98.64, 98.54], top10Return: -7.2, spyReturn: -1.5, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.83, 101.64, 102.58, 105.61, 106.51, 104.88, 95.95, 98.95, 96.99, 93.94, 98.99, 99.67, 104.88, 101.79, 106.7, 107.53, 101.19, 100.3, 102.16, 99.71], spy: [100, 99.98, 100.53, 100.78, 101.06, 100.49, 100.87, 98.26, 98.49, 98.2, 96.65, 98.29, 98.82, 100.56, 99.97, 99.49, 99.17, 97.73, 97.69, 97.83, 97.72], top10Return: -0.3, spyReturn: -2.3, xLabels: ["May 29", "Jun 5", "Jun 12", "Jun 19", "Jun 26"] },
    'YTD': { top10: [100, 102.26, 104.35, 105.09, 107.24, 97.14, 101.92, 104.13, 103.13, 98.84, 100.28, 103.4, 96.97, 99.79, 107.99, 117.64, 119.47, 122.96, 130.64, 139.5, 138.81, 149.56, 153.24, 144.72, 156.53, 146.06], spy: [100, 101.11, 101.51, 101.07, 101.78, 99.37, 99.9, 101.1, 100.6, 98.6, 97.67, 96.76, 94.6, 96.17, 99.64, 104.14, 103.89, 105.39, 107.28, 109.72, 108.92, 110.93, 111.02, 108.19, 109.51, 107.56], top10Return: 46.1, spyReturn: 7.6, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 101.24, 103.18, 100.71, 105.52, 101.88, 102.25, 101.51, 104.15, 100.43, 101.51, 100.97, 100.38, 95.41, 104.52, 112.52, 119.31, 118.44, 131.18, 135.96, 133.23, 145.96, 150.71, 142.33, 153.96, 143.66], spy: [100, 99.62, 100.7, 98.16, 100.75, 99.89, 100.26, 99.42, 100.41, 99.25, 97.97, 95.82, 95.15, 94.21, 97.93, 101.4, 103.03, 103.08, 106.3, 107.53, 107.38, 109.31, 109.67, 106.87, 108.17, 106.26], top10Return: 43.7, spyReturn: 6.3, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 101.26, 100.4, 103.83, 105.45, 103.96, 107.97, 108.75, 104.57, 110.35, 109.54, 115.58, 120.24, 117.99, 122.2, 120.89, 123.17, 127.21, 131.16, 124.36, 120.36, 113.65, 122.36, 124.96, 121.13, 121.79, 123.09, 127.24, 127.87, 126.72, 132.54, 120.62, 126.9, 126, 129.35, 124.69, 126.03, 125.4, 124.69, 121.31, 130.26, 141.42, 146.04, 150.31, 159.66, 169.21, 165.79, 181.81, 187.76, 177.35, 191.94, 179.05], spy: [100, 102.2, 101.92, 102.57, 104.12, 101.61, 104.14, 105.41, 103.87, 106.06, 105.78, 107.44, 108.47, 108.16, 109.37, 106.73, 108.58, 110.69, 111.47, 109.66, 109.83, 106.65, 111.69, 112.06, 111.42, 111.23, 112.42, 113.06, 113.39, 112.02, 113.65, 112.15, 113.12, 112.16, 113.28, 111.97, 110.53, 108.1, 107.35, 107.09, 111.12, 114.67, 115.78, 117.45, 119.56, 121.32, 121.15, 123.33, 123.73, 120.57, 122.04, 119.88], top10Return: 79.1, spyReturn: 19.9, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Semiconductors': {
    '1D': { top10: [100, 94.97, 94.92, 96.85, 95.84, 95.98, 95.35, 95.3, 94.78, 95.29, 95.83, 95.46, 95.58, 95.4, 95.87, 96.05, 96.08, 96.5, 96.23, 95.97, 95.85, 95.67, 95.46, 95.31], spy: [100, 99.31, 99.32, 99.83, 99.77, 99.87, 99.81, 99.75, 99.7, 99.93, 100.2, 100.04, 100.14, 99.96, 100.04, 99.96, 100.02, 100.18, 99.97, 99.97, 99.94, 99.99, 99.96, 99.89], top10Return: -4.7, spyReturn: -0.11, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 90.85, 90.24, 94.76, 90.3], spy: [100, 98.55, 98.5, 98.64, 98.54], top10Return: -9.7, spyReturn: -1.5, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.16, 100.27, 99.34, 100.71, 106.83, 104.03, 91.76, 97.24, 95.72, 92.49, 101.48, 102.93, 109.08, 103.42, 112.46, 116.24, 105.29, 104.7, 110.24, 105.02], spy: [100, 99.98, 100.53, 100.78, 101.06, 100.49, 100.87, 98.26, 98.49, 98.2, 96.65, 98.29, 98.82, 100.56, 99.97, 99.49, 99.17, 97.73, 97.69, 97.83, 97.72], top10Return: 5, spyReturn: -2.3, xLabels: ["May 29", "Jun 5", "Jun 12", "Jun 19", "Jun 26"] },
    'YTD': { top10: [100, 107.01, 113.64, 117.36, 120.25, 114.98, 121.49, 124.3, 123.34, 118.4, 125.63, 134.42, 131.98, 131.3, 140.76, 152.37, 166.63, 175.55, 189.75, 186.65, 190.07, 202.7, 212.67, 215.94, 222.03, 213.2], spy: [100, 101.11, 101.51, 101.07, 101.78, 99.37, 99.9, 101.1, 100.6, 98.6, 97.67, 96.76, 94.6, 96.17, 99.64, 104.14, 103.89, 105.39, 107.28, 109.72, 108.92, 110.93, 111.02, 108.19, 109.51, 107.56], top10Return: 113.2, spyReturn: 7.6, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 104.36, 110.25, 114.62, 116.28, 115.16, 119.64, 122.25, 125.54, 121.9, 126.83, 131.79, 134.36, 126.89, 135.31, 145.58, 161.91, 168.95, 189.42, 183.38, 185.44, 202.1, 209.6, 212.94, 218.78, 210.19], spy: [100, 99.62, 100.7, 98.16, 100.75, 99.89, 100.26, 99.42, 100.41, 99.25, 97.97, 95.82, 95.15, 94.21, 97.93, 101.4, 103.03, 103.08, 106.3, 107.53, 107.38, 109.31, 109.67, 106.87, 108.17, 106.26], top10Return: 110.2, spyReturn: 6.3, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 103.02, 103.49, 106.97, 105.14, 104.75, 108.68, 111.3, 108.56, 113.68, 111.98, 117.14, 120.65, 121.16, 125.92, 121.05, 128.2, 131.27, 134.92, 135.86, 135.17, 126.37, 141.67, 148.65, 142.4, 145.22, 142.81, 149.35, 150.77, 157.38, 161.66, 153.34, 167.4, 170.07, 174.06, 169.96, 170.49, 169.6, 169.99, 158.1, 174.57, 181.49, 201.15, 209.55, 225.63, 234.33, 233.88, 255.48, 254.8, 249.87, 271.7, 253.47], spy: [100, 102.2, 101.92, 102.57, 104.12, 101.61, 104.14, 105.41, 103.87, 106.06, 105.78, 107.44, 108.47, 108.16, 109.37, 106.73, 108.58, 110.69, 111.47, 109.66, 109.83, 106.65, 111.69, 112.06, 111.42, 111.23, 112.42, 113.06, 113.39, 112.02, 113.65, 112.15, 113.12, 112.16, 113.28, 111.97, 110.53, 108.1, 107.35, 107.09, 111.12, 114.67, 115.78, 117.45, 119.56, 121.32, 121.15, 123.33, 123.73, 120.57, 122.04, 119.88], top10Return: 153.5, spyReturn: 19.9, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Broad Tech': {
    '1D': { top10: [100, 98.33, 98.4, 98.96, 99.03, 99.48, 99.22, 99.12, 98.99, 99.18, 99.49, 99.55, 99.72, 99.5, 99.63, 99.65, 99.54, 99.97, 99.77, 99.76, 99.74, 99.73, 99.66, 99.56], spy: [100, 99.31, 99.32, 99.83, 99.77, 99.87, 99.81, 99.75, 99.7, 99.93, 100.2, 100.04, 100.14, 99.96, 100.04, 99.96, 100.02, 100.18, 99.97, 99.97, 99.94, 99.99, 99.96, 99.89], top10Return: -0.7, spyReturn: -0.11, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 96.73, 95.68, 96.43, 95.68], spy: [100, 98.55, 98.5, 98.64, 98.54], top10Return: -4.3, spyReturn: -1.5, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.93, 101.33, 101.87, 103.55, 103.46, 103.06, 95.99, 97.76, 96.03, 93.7, 97.78, 98.33, 101.85, 100.17, 102.16, 101.93, 98.52, 97.5, 98.37, 97.49], spy: [100, 99.98, 100.53, 100.78, 101.06, 100.49, 100.87, 98.26, 98.49, 98.2, 96.65, 98.29, 98.82, 100.56, 99.97, 99.49, 99.17, 97.73, 97.69, 97.83, 97.72], top10Return: -2.5, spyReturn: -2.3, xLabels: ["May 29", "Jun 5", "Jun 12", "Jun 19", "Jun 26"] },
    'YTD': { top10: [100, 103.16, 104.96, 104.77, 104.88, 96.13, 100.38, 102.97, 103.38, 99.9, 100.7, 102.12, 97.68, 100.2, 105.32, 113.68, 114.67, 116.88, 123.94, 127.63, 125.37, 131.49, 133.48, 127.74, 133.68, 127.56], spy: [100, 101.11, 101.51, 101.07, 101.78, 99.37, 99.9, 101.1, 100.6, 98.6, 97.67, 96.76, 94.6, 96.17, 99.64, 104.14, 103.89, 105.39, 107.28, 109.72, 108.92, 110.93, 111.02, 108.19, 109.51, 107.56], top10Return: 27.6, spyReturn: 7.6, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 100.98, 103.25, 101.08, 104, 99.35, 100.16, 100.45, 102.78, 101.37, 100.72, 99.54, 99.09, 96.2, 102.87, 108.91, 113.37, 111.75, 123.43, 123.87, 120.76, 128.05, 130.63, 125.04, 130.83, 124.84], spy: [100, 99.62, 100.7, 98.16, 100.75, 99.89, 100.26, 99.42, 100.41, 99.25, 97.97, 95.82, 95.15, 94.21, 97.93, 101.4, 103.03, 103.08, 106.3, 107.53, 107.38, 109.31, 109.67, 106.87, 108.17, 106.26], top10Return: 24.8, spyReturn: 6.3, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.4, 101.08, 104.56, 105.25, 102.9, 104.25, 105.18, 103.73, 107.76, 106.9, 111.31, 115.97, 114.66, 118.52, 118.05, 119.93, 123.02, 123.61, 120.77, 114.19, 109.71, 117.52, 117.71, 115.99, 115.55, 116.05, 119.52, 121.93, 120.34, 124.76, 116.5, 120.87, 119.86, 122.41, 121.08, 120.17, 121.05, 122.51, 118.06, 123.76, 130.03, 132.4, 134.2, 140.92, 143.05, 141.38, 150.74, 153.47, 147.44, 153.36, 146.85], spy: [100, 102.2, 101.92, 102.57, 104.12, 101.61, 104.14, 105.41, 103.87, 106.06, 105.78, 107.44, 108.47, 108.16, 109.37, 106.73, 108.58, 110.69, 111.47, 109.66, 109.83, 106.65, 111.69, 112.06, 111.42, 111.23, 112.42, 113.06, 113.39, 112.02, 113.65, 112.15, 113.12, 112.16, 113.28, 111.97, 110.53, 108.1, 107.35, 107.09, 111.12, 114.67, 115.78, 117.45, 119.56, 121.32, 121.15, 123.33, 123.73, 120.57, 122.04, 119.88], top10Return: 46.8, spyReturn: 19.9, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Electrification': {
    '1D': { top10: [100, 97.75, 97.8, 98.3, 98.16, 98.38, 98.02, 98.05, 97.75, 97.7, 97.98, 98, 97.89, 98, 97.71, 97.76, 97.95, 98.11, 98.07, 98.02, 97.93, 97.81, 97.82, 97.78], spy: [100, 99.31, 99.32, 99.83, 99.77, 99.87, 99.81, 99.75, 99.7, 99.93, 100.2, 100.04, 100.14, 99.96, 100.04, 99.96, 100.02, 100.18, 99.97, 99.97, 99.94, 99.99, 99.96, 99.89], top10Return: -2.2, spyReturn: -0.11, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 95.57, 94.86, 95.37, 93.21], spy: [100, 98.55, 98.5, 98.64, 98.54], top10Return: -6.8, spyReturn: -1.5, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.17, 99.25, 98.2, 97.87, 98.87, 98.79, 92.68, 92.79, 91.7, 88.74, 92.36, 93.24, 95.34, 94.37, 96.51, 97.56, 93.26, 92.63, 93.17, 91.04], spy: [100, 99.98, 100.53, 100.78, 101.06, 100.49, 100.87, 98.26, 98.49, 98.2, 96.65, 98.29, 98.82, 100.56, 99.97, 99.49, 99.17, 97.73, 97.69, 97.83, 97.72], top10Return: -9, spyReturn: -2.3, xLabels: ["May 29", "Jun 5", "Jun 12", "Jun 19", "Jun 26"] },
    'YTD': { top10: [100, 103.61, 108.42, 111.14, 112.44, 109.91, 114.31, 115.68, 116.87, 110.79, 112.3, 114.56, 112.75, 112.87, 120.04, 125.15, 127.92, 132.22, 134.86, 136.09, 132.12, 136.99, 137.79, 130.95, 134.21, 127.01], spy: [100, 101.11, 101.51, 101.07, 101.78, 99.37, 99.9, 101.1, 100.6, 98.6, 97.67, 96.76, 94.6, 96.17, 99.64, 104.14, 103.89, 105.39, 107.28, 109.72, 108.92, 110.93, 111.02, 108.19, 109.51, 107.56], top10Return: 27, spyReturn: 7.6, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 102.37, 104.74, 106.75, 110.09, 110.73, 112.5, 112.61, 116.88, 112.56, 111.59, 111.66, 114.23, 110.02, 115.96, 120.52, 124.71, 125.37, 134.85, 133.55, 126.31, 135.48, 135.07, 128.48, 131.65, 124.64], spy: [100, 99.62, 100.7, 98.16, 100.75, 99.89, 100.26, 99.42, 100.41, 99.25, 97.97, 95.82, 95.15, 94.21, 97.93, 101.4, 103.03, 103.08, 106.3, 107.53, 107.38, 109.31, 109.67, 106.87, 108.17, 106.26], top10Return: 24.6, spyReturn: 6.3, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 103.32, 104.1, 107.4, 109.26, 104.81, 106.62, 108.24, 108.28, 111.29, 110.87, 111.17, 115.43, 115.86, 121.17, 121.36, 124.87, 127.44, 128.18, 127.22, 123.17, 119.67, 126.54, 127.5, 127, 127.23, 126.72, 128.3, 131.42, 133.66, 136.91, 134.86, 135.2, 135.81, 139.66, 136.98, 136.82, 137.4, 140.09, 139.66, 144.91, 149.36, 152.48, 153.27, 157.2, 160.83, 156.02, 164.04, 163.42, 154.66, 157.94, 149.45], spy: [100, 102.2, 101.92, 102.57, 104.12, 101.61, 104.14, 105.41, 103.87, 106.06, 105.78, 107.44, 108.47, 108.16, 109.37, 106.73, 108.58, 110.69, 111.47, 109.66, 109.83, 106.65, 111.69, 112.06, 111.42, 111.23, 112.42, 113.06, 113.39, 112.02, 113.65, 112.15, 113.12, 112.16, 113.28, 111.97, 110.53, 108.1, 107.35, 107.09, 111.12, 114.67, 115.78, 117.45, 119.56, 121.32, 121.15, 123.33, 123.73, 120.57, 122.04, 119.88], top10Return: 49.4, spyReturn: 19.9, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Industrials': {
    '1D': { top10: [100, 98.16, 98.31, 98.77, 98.77, 99.05, 98.82, 98.72, 98.79, 98.85, 99.03, 98.84, 98.94, 98.72, 98.81, 98.72, 98.75, 99.1, 98.86, 98.85, 98.79, 98.9, 98.98, 98.76], spy: [100, 99.31, 99.32, 99.83, 99.77, 99.87, 99.81, 99.75, 99.7, 99.93, 100.2, 100.04, 100.14, 99.96, 100.04, 99.96, 100.02, 100.18, 99.97, 99.97, 99.94, 99.99, 99.96, 99.89], top10Return: -0.8, spyReturn: -0.11, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 98.69, 98.12, 99.16, 98.84], spy: [100, 98.55, 98.5, 98.64, 98.54], top10Return: -1.2, spyReturn: -1.5, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 100, 100.47, 99.82, 98.35, 99.36, 100.27, 98.23, 97.42, 97.69, 95.19, 99.2, 99.53, 99.76, 99.78, 99.88, 101.01, 99.63, 99.04, 100.13, 99.78], spy: [100, 99.98, 100.53, 100.78, 101.06, 100.49, 100.87, 98.26, 98.49, 98.2, 96.65, 98.29, 98.82, 100.56, 99.97, 99.49, 99.17, 97.73, 97.69, 97.83, 97.72], top10Return: -0.2, spyReturn: -2.3, xLabels: ["May 29", "Jun 5", "Jun 12", "Jun 19", "Jun 26"] },
    'YTD': { top10: [100, 105.14, 110.48, 110.68, 111.44, 111.22, 116.08, 120, 118.83, 113.5, 111.47, 112.1, 110.08, 113.17, 119.02, 120.13, 121.18, 122.55, 123.91, 124.98, 120.98, 125.1, 125.94, 123.12, 125.6, 125.55], spy: [100, 101.11, 101.51, 101.07, 101.78, 99.37, 99.9, 101.1, 100.6, 98.6, 97.67, 96.76, 94.6, 96.17, 99.64, 104.14, 103.89, 105.39, 107.28, 109.72, 108.92, 110.93, 111.02, 108.19, 109.51, 107.56], top10Return: 25.5, spyReturn: 7.6, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 102.48, 105.98, 107.57, 109.43, 110.63, 114.02, 115.69, 117.19, 115.66, 111.74, 109.96, 111.18, 108.54, 115.89, 116.6, 117.62, 115.57, 124.04, 121.86, 117.7, 123.59, 123.29, 120.63, 123.02, 122.97], spy: [100, 99.62, 100.7, 98.16, 100.75, 99.89, 100.26, 99.42, 100.41, 99.25, 97.97, 95.82, 95.15, 94.21, 97.93, 101.4, 103.03, 103.08, 106.3, 107.53, 107.38, 109.31, 109.67, 106.87, 108.17, 106.26], top10Return: 23, spyReturn: 6.3, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.58, 102.96, 104.56, 106.42, 103.91, 105.24, 106.65, 104.83, 107.96, 107.4, 108.83, 110.65, 110.62, 112.93, 110.73, 111.56, 115.16, 115.1, 112.42, 109.27, 106.22, 111.28, 111.99, 113.41, 113.57, 114.37, 119.46, 123.38, 126.38, 126.5, 126.4, 132.09, 133.15, 133.95, 132.5, 127.42, 125.77, 128.61, 127.28, 133.41, 133.35, 136.05, 136.9, 139.88, 140.23, 136.57, 141.89, 141.94, 139.04, 142, 141.83], spy: [100, 102.2, 101.92, 102.57, 104.12, 101.61, 104.14, 105.41, 103.87, 106.06, 105.78, 107.44, 108.47, 108.16, 109.37, 106.73, 108.58, 110.69, 111.47, 109.66, 109.83, 106.65, 111.69, 112.06, 111.42, 111.23, 112.42, 113.06, 113.39, 112.02, 113.65, 112.15, 113.12, 112.16, 113.28, 111.97, 110.53, 108.1, 107.35, 107.09, 111.12, 114.67, 115.78, 117.45, 119.56, 121.32, 121.15, 123.33, 123.73, 120.57, 122.04, 119.88], top10Return: 41.8, spyReturn: 19.9, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Meme': {
    '1D': { top10: [100, 96.97, 97.46, 97.98, 98.77, 98.42, 99.08, 98.83, 98.6, 98.84, 98.54, 98.2, 98.73, 99.09, 99.08, 99.13, 99.13, 98.68, 99.36, 99.44, 99.59, 99.35, 99.41, 99.3], spy: [100, 99.31, 99.32, 99.83, 99.77, 99.87, 99.81, 99.75, 99.7, 99.93, 100.2, 100.04, 100.14, 99.96, 100.04, 99.96, 100.02, 100.18, 99.97, 99.97, 99.94, 99.99, 99.96, 99.89], top10Return: -1.1, spyReturn: -0.11, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 95.38, 92.19, 91.68, 90.52], spy: [100, 98.55, 98.5, 98.64, 98.54], top10Return: -9.5, spyReturn: -1.5, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 101.49, 103.34, 102.02, 102.24, 101.07, 101.6, 91.3, 93.63, 90.34, 87.84, 93.47, 92.31, 97.44, 93.66, 97.55, 97.4, 92.92, 89.84, 89.37, 88.25], spy: [100, 99.98, 100.53, 100.78, 101.06, 100.49, 100.87, 98.26, 98.49, 98.2, 96.65, 98.29, 98.82, 100.56, 99.97, 99.49, 99.17, 97.73, 97.69, 97.83, 97.72], top10Return: -11.8, spyReturn: -2.3, xLabels: ["May 29", "Jun 5", "Jun 12", "Jun 19", "Jun 26"] },
    'YTD': { top10: [100, 108.03, 105.55, 106.35, 102.68, 89.95, 92.33, 92.18, 92.7, 90.59, 93.05, 93.4, 89.34, 94.5, 102.68, 114.84, 112.18, 113.08, 121.59, 126.33, 132.96, 142.64, 136.93, 128.62, 133.59, 119.93], spy: [100, 101.11, 101.51, 101.07, 101.78, 99.37, 99.9, 101.1, 100.6, 98.6, 97.67, 96.76, 94.6, 96.17, 99.64, 104.14, 103.89, 105.39, 107.28, 109.72, 108.92, 110.93, 111.02, 108.19, 109.51, 107.56], top10Return: 19.9, spyReturn: 7.6, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 104.83, 104.57, 105.03, 103.07, 98.58, 94.99, 91.61, 93.79, 93.52, 93.18, 90.76, 92.08, 90.57, 98.18, 109.65, 113.31, 108.11, 123.47, 123.5, 125.02, 141.76, 134.5, 126.4, 131.33, 117.91], spy: [100, 99.62, 100.7, 98.16, 100.75, 99.89, 100.26, 99.42, 100.41, 99.25, 97.97, 95.82, 95.15, 94.21, 97.93, 101.4, 103.03, 103.08, 106.3, 107.53, 107.38, 109.31, 109.67, 106.87, 108.17, 106.26], top10Return: 17.9, spyReturn: 6.3, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 103.01, 100.31, 96.42, 95.87, 88.41, 89.17, 87.35, 83.01, 83.27, 83.85, 87.82, 89.82, 87.1, 86.77, 90.34, 88.7, 92.89, 93.6, 90.89, 90.29, 83.36, 84.59, 85.93, 87.42, 86.92, 88.68, 91.91, 93.39, 89.79, 93.44, 90.69, 88.73, 88.67, 90.12, 90.99, 95.36, 100.23, 96.11, 93.65, 98.21, 108.67, 110.44, 110.9, 111.23, 116.02, 114.67, 116.07, 113.09, 113.26, 113.35, 105.31], spy: [100, 102.2, 101.92, 102.57, 104.12, 101.61, 104.14, 105.41, 103.87, 106.06, 105.78, 107.44, 108.47, 108.16, 109.37, 106.73, 108.58, 110.69, 111.47, 109.66, 109.83, 106.65, 111.69, 112.06, 111.42, 111.23, 112.42, 113.06, 113.39, 112.02, 113.65, 112.15, 113.12, 112.16, 113.28, 111.97, 110.53, 108.1, 107.35, 107.09, 111.12, 114.67, 115.78, 117.45, 119.56, 121.32, 121.15, 123.33, 123.73, 120.57, 122.04, 119.88], top10Return: 5.3, spyReturn: 19.9, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
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
export const SCAN_TIMESTAMP    = '2026-06-26T18:22:22.066Z';
export const SCAN_TIMESTAMP_NY = 'June 26, 2026 at 2:22 PM ET';
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
export const HOLDINGS_COUNT = 1297;
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
  { ticker: 'MU', name: `Micron Technology Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 13.50, bestProScore: 5.84, avgProScore: 4.50, price: 1148.44, weeklyChange: -5.20 },
  { ticker: 'NVDA', name: `NVIDIA Corp`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 12.77, bestProScore: 6.14, avgProScore: 4.26, price: 194.28, weeklyChange: -6.89 },
  { ticker: 'AMD', name: `Advanced Micro Devices Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 10.45, bestProScore: 4.95, avgProScore: 3.48, price: 517.85, weeklyChange: -6.12 },
  { ticker: 'AVGO', name: `Broadcom Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 6.54, bestProScore: 2.86, avgProScore: 2.18, price: 369.14, weeklyChange: -5.86 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 4.92, bestProScore: 2.92, avgProScore: 2.46, price: 288.59, weeklyChange: -6.24 },
  { ticker: 'INTC', name: `INTEL CORPORATION`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.78, bestProScore: 3.50, avgProScore: 2.39, price: 127.50, weeklyChange: -9.54 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.68, bestProScore: 2.88, avgProScore: 2.34, price: 431.72, weeklyChange: -7.69 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.43, bestProScore: 2.56, avgProScore: 2.21, price: 264.72, weeklyChange: -14.01 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 3.68, bestProScore: 2.56, avgProScore: 1.84, price: 379.41, weeklyChange: -7.36 },
  { ticker: 'WDC', name: `Western Digital Corp`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 3.61, bestProScore: 2.26, avgProScore: 1.80, price: 585.24, weeklyChange: -20.12 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': -9.7, '1M': 4.1, 'YTD': 111.4, '6M': 109.6, '1Y': 185.2 },
  ARTY: { '1W': -8.6, '1M': 1.2, 'YTD': 50.7, '6M': 49.3, '1Y': 78.3 },
  BAI:  { '1W': -8.9, '1M': -1.2, 'YTD': 48.3, '6M': 45.5, '1Y': 72.7 },
  IGPT: { '1W': -8.2, '1M': 1.6, 'YTD': 66.9, '6M': 65.7, '1Y': 104.3 },
  IVES: { '1W': -3.7, '1M': -4.9, 'YTD': 14.4, '6M': 12.1, '1Y': 34 },
  ALAI: { '1W': -5, '1M': -0.8, 'YTD': 21.3, '6M': 18.7, '1Y': 43.9 },
  CHAT: { '1W': -9.6, '1M': -0.1, 'YTD': 59.5, '6M': 54.1, '1Y': 93.6 },
  AIFD: { '1W': -5.9, '1M': -0.6, 'YTD': 38.1, '6M': 35.9, '1Y': 70.4 },
  SPRX: { '1W': -9.4, '1M': -3.4, 'YTD': 37.8, '6M': 35.6, '1Y': 79.9 },
  AOTG: { '1W': -2.8, '1M': 1.2, 'YTD': 12.2, '6M': 10.2, '1Y': 28.3 },
  // Semiconductors
  SOXX: { '1W': -9.3, '1M': 4.2, 'YTD': 97.2, '6M': 94.1, '1Y': 148.4 },
  PSI:  { '1W': -8.9, '1M': 3.9, 'YTD': 113, '6M': 107.7, '1Y': 178.6 },
  XSD:  { '1W': -11.1, '1M': -8.9, 'YTD': 79.2, '6M': 75.6, '1Y': 123.5 },
  DRAM: { '1W': -9.4, '1M': 20.8, 'YTD': 163.4, '6M': 163.4, '1Y': 163.4 },
  // Broad Tech
  PTF:  { '1W': -8.5, '1M': -2.7, 'YTD': 65.6, '6M': 62.2, '1Y': 86.8 },
  WCLD: { '1W': 4.6, '1M': 0.4, 'YTD': -13.5, '6M': -15.1, '1Y': -15.3 },
  IGV:  { '1W': 0.3, '1M': -6.8, 'YTD': -17.1, '6M': -19, '1Y': -19.4 },
  FDTX: { '1W': -6.1, '1M': 3.3, 'YTD': 34.1, '6M': 32.3, '1Y': 41.4 },
  GTEK: { '1W': -4.6, '1M': 1.5, 'YTD': 49.5, '6M': 48.8, '1Y': 66.3 },
  ARKK: { '1W': -0.9, '1M': 0.7, 'YTD': 1.1, '6M': -2.5, '1Y': 9.4 },
  MARS: { '1W': -8, '1M': -35.7, 'YTD': 14.4, '6M': 14.4, '1Y': 14.4 },
  FRWD: { '1W': -5.7, '1M': 1.2, 'YTD': 29.5, '6M': 29.5, '1Y': 29.5 },
  BCTK: { '1W': -4.1, '1M': -0.5, 'YTD': 20.7, '6M': 18, '1Y': 22.8 },
  FWD:  { '1W': -5.1, '1M': 0.1, 'YTD': 35.3, '6M': 32.7, '1Y': 59.4 },
  CBSE: { '1W': -2.3, '1M': 0.2, 'YTD': 28.8, '6M': 26.4, '1Y': 37.8 },
  FCUS: { '1W': -7, '1M': -4.4, 'YTD': 38.3, '6M': 29.7, '1Y': 70.9 },
  WGMI: { '1W': -8.3, '1M': 1.8, 'YTD': 72.4, '6M': 66, '1Y': 206.9 },
  CNEQ: { '1W': -4.1, '1M': -2.6, 'YTD': 14.5, '6M': 12.2, '1Y': 34.6 },
  SGRT: { '1W': -6.7, '1M': -2, 'YTD': 43.4, '6M': 39.7, '1Y': 79.4 },
  SPMO: { '1W': -3.9, '1M': 3.8, 'YTD': 30.3, '6M': 28, '1Y': 39.7 },
  XMMO: { '1W': -3.3, '1M': -0.8, 'YTD': 21.4, '6M': 18.8, '1Y': 31.7 },
  // Electrification
  POW:  { '1W': -7, '1M': -8.6, 'YTD': 50.3, '6M': 48.8, '1Y': 45.9 },
  VOLT: { '1W': -3.5, '1M': 0.7, 'YTD': 40.3, '6M': 37.9, '1Y': 61.9 },
  PBD:  { '1W': -7.6, '1M': -15.7, 'YTD': 17.5, '6M': 15.3, '1Y': 50 },
  PBW:  { '1W': -10.3, '1M': -17.2, 'YTD': 21.1, '6M': 15.3, '1Y': 83.5 },
  IVEP: { '1W': -5.5, '1M': -4, 'YTD': 5.9, '6M': 5.9, '1Y': 5.9 },
  // Industrials
  AIRR: { '1W': -1.5, '1M': 2.3, 'YTD': 33.5, '6M': 29.6, '1Y': 63.1 },
  PRN:  { '1W': -4.1, '1M': 2.3, 'YTD': 44.2, '6M': 40, '1Y': 63.2 },
  RSHO: { '1W': 0, '1M': 5.8, 'YTD': 39.4, '6M': 36.3, '1Y': 58.5 },
  IDEF: { '1W': -2.2, '1M': -7.9, 'YTD': 0.6, '6M': -0.9, '1Y': 11.1 },
  BILT: { '1W': 2, '1M': -3.5, 'YTD': 10, '6M': 10, '1Y': 13.2 },
  // Meme
  BUZZ: { '1W': -4.6, '1M': -7.3, 'YTD': 10, '6M': 7.6, '1Y': 19.2 },
  MEME: { '1W': -14.1, '1M': -21.1, 'YTD': 44, '6M': 40.4, '1Y': -9 },
  RKNG: { '1W': -9.7, '1M': -6.9, 'YTD': 5.7, '6M': 5.7, '1Y': 5.7 },
};
// @@END_GENERATED:ETF_RETURNS@@

// @@GENERATED:ETF_DAY_CHANGE@@
// Today's % move per ETF ticker (1D, vs prior close). Refreshed by the 3×/day
// price jobs. Powers the 1D ranking in the theme-ETF side panel.
export const ETF_DAY_CHANGE: Record<string, number> = {
  AIS:  -4.91,
  ARTY: -2.9,
  BAI:  -4,
  IGPT: -3.56,
  IVES: 0.78,
  ALAI: -0.87,
  CHAT: -3.82,
  AIFD: -1.33,
  SPRX: -3.26,
  AOTG: 0.22,
  SOXX: -5.01,
  PSI:  -5.26,
  XSD:  -3.57,
  DRAM: -4.91,
  PTF:  -4.23,
  WCLD: 4.45,
  IGV:  3.36,
  FDTX: -2.74,
  GTEK: -0.59,
  ARKK: 1.57,
  MARS: 2.14,
  FRWD: -1.75,
  BCTK: -0.72,
  FWD:  -2.43,
  CBSE: -0.51,
  FCUS: -3.74,
  WGMI: 1.63,
  CNEQ: -0.56,
  SGRT: -4.09,
  SPMO: -2.64,
  XMMO: -1.77,
  POW:  -2.99,
  VOLT: -2.91,
  PBD:  -1.66,
  PBW:  -1.32,
  IVEP: -2.33,
  AIRR: -1.23,
  PRN:  -2.54,
  IDEF: 0.06,
  BILT: 0.38,
  BUZZ: 1.42,
  MEME: -2.83,
  RKNG: -1.84,
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
  'AI & ML': { etfs: ['AIS', 'IVES', 'SPRX'], series: { '1W': [100, 94.14, 93.01, 94.67, 92.4], '1M': [100, 99.66, 101.75, 101.76, 104.29, 106.2, 104.62, 94.74, 97.91, 95.58, 92.7, 98.59, 99.35, 104.12, 100.49, 105.66, 106.85, 100.42, 99.23, 101.15, 98.57], 'YTD': [100, 103.29, 107, 107.92, 110.57, 98.58, 104.16, 105.59, 105.36, 100.52, 102.21, 105.8, 98.65, 101.06, 109.89, 119.57, 122.57, 124.86, 131.51, 145.48, 145.7, 157.46, 162.54, 153.45, 165.78, 154.53], '6M': [100, 102.7, 105.48, 104.51, 108.79, 105.72, 105.65, 103.6, 106.9, 103.46, 103.83, 103.32, 103.19, 96.31, 106.66, 114.34, 122.64, 120.39, 133.63, 141.62, 139.45, 155.67, 160.3, 151.33, 163.52, 152.42], '1Y': [100, 101.18, 99.91, 103.84, 105.66, 104.44, 109.37, 110.15, 105.21, 112.09, 111.28, 119.38, 126.1, 123.57, 129.18, 128.45, 130.58, 135.47, 139.94, 132.21, 126.08, 118, 128.04, 130.97, 126.46, 127.77, 129.06, 134.91, 136.98, 137.07, 143.36, 129.11, 137.23, 134.6, 139.06, 134.47, 134.93, 134.3, 134.25, 128.07, 138.81, 150.84, 157.52, 160.64, 169.12, 185.03, 182.05, 203.53, 209.63, 198.01, 214.32, 199.68] }, returns: { '1W': -7.6, '1M': -1.4, 'YTD': 54.5, '6M': 52.4, '1Y': 99.7 } },
  'Semiconductors': { etfs: ['DRAM', 'PSI', 'XSD'], series: { '1W': [100, 90.42, 89.71, 94.53, 90.18], '1M': [100, 99.23, 100.39, 99.18, 100.84, 106.44, 103.47, 90.78, 96.24, 94.75, 91.65, 101, 102.37, 108.69, 103.33, 112.56, 116.68, 105.11, 104.43, 110.43, 105.3], 'YTD': [100, 107.31, 114.2, 118.33, 120.35, 116.69, 123.08, 125.95, 125.46, 122.06, 130.96, 141.57, 139.57, 137.47, 144.89, 157.14, 173.36, 182.99, 198.51, 190.2, 195.34, 207.27, 216.85, 222.95, 225.26, 218.53], '6M': [100, 104.5, 111.02, 116.08, 116.79, 115.91, 121.24, 124.02, 127.31, 125.34, 131.84, 138.87, 141.54, 133.39, 140.07, 150.34, 168.85, 176.26, 197.35, 186.96, 190.59, 207.44, 213.82, 219.99, 222.07, 215.57], '1Y': [100, 103.42, 103.67, 108.23, 106.52, 106.59, 111.04, 112.97, 110.96, 116.36, 114.86, 120.54, 123.79, 124.07, 128.86, 123.47, 130.75, 133.77, 137.15, 140.1, 139.88, 131.11, 147.52, 155.06, 148.11, 151.82, 147.84, 153.35, 154.56, 161.29, 165.29, 158.39, 174.2, 176.86, 180.76, 179, 179.62, 178.97, 178.52, 163.59, 179.97, 185.38, 206.71, 215.06, 232.19, 238.78, 239.29, 261.24, 255.7, 251.33, 273.11, 255.15] }, returns: { '1W': -9.8, '1M': 5.3, 'YTD': 118.5, '6M': 115.6, '1Y': 155.2 } },
  'Broad Tech': { etfs: ['WGMI', 'PTF', 'SGRT'], series: { '1W': [100, 95.57, 92.87, 94.37, 92.18], '1M': [100, 101.9, 102.25, 101.28, 103.3, 105.66, 104, 94.15, 97.56, 94.86, 91.61, 97.79, 100.02, 104.42, 102.57, 106.25, 107.46, 102.75, 99.79, 101.33, 99.05], 'YTD': [100, 107.37, 113.44, 114.56, 116.83, 101.6, 110.12, 112.37, 113.64, 103.39, 107.02, 111.73, 105.25, 108, 120.94, 131.34, 134.51, 133.73, 146.15, 155.68, 153.05, 164.13, 168.59, 158.45, 172.38, 160.47], '6M': [100, 105.48, 109.11, 110.36, 114.8, 109.99, 108.94, 108.56, 114.63, 110.42, 106.97, 107.54, 109.47, 100.69, 115.19, 123.15, 130.45, 124.19, 148.43, 148.74, 142.79, 161.09, 163.85, 154.01, 167.52, 155.96], '1Y': [100, 108.43, 104.98, 111.83, 112.64, 108.25, 110, 115.12, 114.39, 120.59, 121.09, 135.79, 145.43, 142.36, 154.52, 161.41, 167.01, 172.26, 170.96, 167.33, 141.95, 136.54, 155.51, 153.84, 148.62, 146.32, 144.45, 154.3, 162.37, 161.64, 169.82, 152.51, 156.93, 153.22, 158.48, 153.41, 148.31, 151.39, 159.01, 149.43, 165.17, 177.73, 186.49, 187.86, 206.74, 208.36, 207.99, 234.49, 231.87, 224.35, 243.28, 224.36] }, returns: { '1W': -7.8, '1M': -1, 'YTD': 60.5, '6M': 56, '1Y': 124.4 } },
  'Electrification': { etfs: ['VOLT', 'PBW', 'POW'], series: { '1W': [100, 95.43, 94.66, 95.37, 93.05], '1M': [100, 99.41, 99.38, 98.37, 97.97, 98.96, 98.85, 92.08, 92.77, 91.63, 88.59, 92.69, 93.46, 95.98, 94.92, 97.27, 98.34, 93.89, 93.2, 93.96, 91.64], 'YTD': [100, 104.13, 109.93, 112.37, 115.16, 110.83, 117.42, 119.25, 120.01, 111.47, 114.69, 117.34, 114.37, 116.18, 124.88, 130.69, 135.67, 141.8, 144.1, 147.09, 142.71, 147.45, 148.05, 138.91, 145.74, 137.22], '6M': [100, 102.74, 104.88, 107.52, 111.71, 112.28, 114.69, 114.95, 119.81, 114.14, 113.82, 113.37, 116.74, 112.28, 119.35, 124.41, 130.83, 132.34, 144.33, 143.68, 135.12, 145.3, 144.38, 135.59, 142.25, 134.01], '1Y': [100, 103.41, 104.54, 108.85, 110.16, 105, 106.94, 108.8, 109.17, 111.99, 110.89, 110.91, 116.84, 118.49, 124.49, 124.71, 128.26, 131.87, 132.65, 130.38, 125.75, 121.83, 131.48, 133.05, 131.87, 133.54, 133.07, 134.82, 138.09, 140.15, 143.52, 140.44, 141.32, 142.15, 147.75, 144.87, 144.76, 145.75, 150.88, 150.35, 157.65, 163.67, 166.79, 165.17, 169.48, 174.75, 168.36, 176.63, 177.77, 168.28, 173.34, 163.77] }, returns: { '1W': -7, '1M': -8.4, 'YTD': 37.2, '6M': 34, '1Y': 63.8 } },
  'Industrials': { etfs: ['PRN', 'RSHO', 'BILT'], series: { '1W': [100, 98.95, 98.17, 99.43, 99.29], '1M': [100, 99.94, 99.46, 98.95, 97.76, 100, 100.38, 98.85, 97.43, 98.06, 95.7, 99.48, 100.27, 100.1, 99.96, 100.44, 102.33, 101.2, 100.35, 101.67, 101.5], 'YTD': [100, 102.86, 107.52, 108, 109.5, 110.83, 116.72, 119.74, 119.16, 113.13, 110.81, 111.43, 110.68, 113.67, 120.64, 120.62, 123.07, 125.01, 127.1, 128.29, 124.22, 127.71, 129.7, 126.16, 129.98, 131.2], '6M': [100, 101.42, 103.32, 104.8, 106.92, 108.99, 113.68, 115.92, 118.22, 115.09, 111.52, 109.56, 111.51, 109.56, 116.73, 117.28, 118.81, 118.03, 127.14, 125.43, 120.41, 126.35, 127.13, 123.82, 127.5, 128.7], '1Y': [100, 102.56, 102.79, 104.41, 105.98, 103.66, 103.89, 105.2, 103.69, 106.36, 106.05, 106.95, 108.32, 107.69, 109.55, 108.04, 109.38, 111.86, 111.88, 110.24, 107.09, 104.67, 109.13, 110.14, 110.93, 111, 111.9, 115.34, 118.11, 120.72, 121.75, 122.94, 129.18, 130.37, 131.45, 128.44, 123.56, 122.04, 126.51, 125.03, 131.11, 130.9, 134.66, 135.63, 140.32, 140.82, 137.04, 141.34, 142.8, 139.36, 143.85, 144.99] }, returns: { '1W': -0.7, '1M': 1.5, 'YTD': 31.2, '6M': 28.7, '1Y': 45 } },
  'Meme': { etfs: ['MEME', 'BUZZ', 'RKNG'], series: { '1W': [100, 95.38, 92.19, 91.68, 90.52], '1M': [100, 101.49, 103.34, 102.02, 102.24, 101.07, 101.6, 91.3, 93.63, 90.34, 87.84, 93.47, 92.31, 97.44, 93.66, 97.55, 97.4, 92.92, 89.84, 89.37, 88.25], 'YTD': [100, 108.03, 105.55, 106.35, 102.68, 89.95, 92.33, 92.18, 92.7, 90.59, 93.05, 93.4, 89.34, 94.5, 102.68, 114.84, 112.18, 113.08, 121.59, 126.33, 132.96, 142.64, 136.93, 128.62, 133.59, 119.93], '6M': [100, 104.83, 104.57, 105.03, 103.07, 98.58, 94.99, 91.61, 93.79, 93.52, 93.18, 90.76, 92.08, 90.57, 98.18, 109.65, 113.31, 108.11, 123.47, 123.5, 125.02, 141.76, 134.5, 126.4, 131.33, 117.91], '1Y': [100, 103.01, 100.31, 96.42, 95.87, 88.41, 89.17, 87.35, 83.01, 83.27, 83.85, 87.82, 89.82, 87.1, 86.77, 90.34, 88.7, 92.89, 93.6, 90.89, 90.29, 83.36, 84.59, 85.93, 87.42, 86.92, 88.68, 91.91, 93.39, 89.79, 93.44, 90.69, 88.73, 88.67, 90.12, 90.99, 95.36, 100.23, 96.11, 93.65, 98.21, 108.67, 110.44, 110.9, 111.23, 116.02, 114.67, 116.07, 113.09, 113.26, 113.35, 105.31] }, returns: { '1W': -9.5, '1M': -11.8, 'YTD': 19.9, '6M': 17.9, '1Y': 5.3 } },
};
// @@END_GENERATED:THEME_REPRESENTATIVES@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 10, avgWeight: 6.14, proScore: 6.14, coverage: 1,
      price: 194.28, weeklyPrices: [208.65, 200.04, 199.00, 195.74, 194.28], weeklyChange: -6.89, dayChange: -0.75, sortRank: 0, periodReturns: { '1M': -9.6, 'YTD': 4.2, '6M': 2, '1Y': 25.3 },
      priceHistory: { '1D': [195.74, 193.07, 193.39, 193.84, 193.6, 193.75, 192.88, 193.1, 192.68, 193.35, 195.09, 194.74, 194.12, 193.77, 194.17, 194.37, 194.19, 194.72, 194.29, 195.21, 194.87, 194.59, 195.1, 194.28], '1W': [208.65, 200.04, 199, 195.74, 194.28], '1M': [214.86, 212.6, 214.25, 211.14, 224.36, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 210.69, 208.65, 200.04, 199, 195.74, 194.28], 'YTD': [186.5, 185.04, 187.05, 187.67, 192.51, 171.88, 186.94, 189.82, 177.19, 177.82, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 199.64, 199.57, 211.5, 235.74, 219.51, 211.14, 218.66, 204.87, 210.69, 194.28], '6M': [190.53, 188.12, 184.94, 178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 186.03, 180.4, 178.68, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 223.47, 214.25, 218.66, 204.87, 210.69, 194.28], '1Y': [155.02, 159.34, 164.92, 172.41, 173.5, 173.72, 182.7, 182.02, 174.98, 180.17, 167.02, 177.82, 176.67, 178.19, 187.62, 183.16, 183.22, 186.26, 202.49, 188.15, 186.86, 180.64, 177, 182.41, 175.02, 180.99, 188.22, 187.24, 185.81, 183.32, 191.52, 174.19, 188.54, 187.98, 195.56, 183.04, 186.03, 180.4, 178.68, 175.75, 183.91, 198.35, 199.64, 199.57, 211.5, 225.83, 223.47, 214.25, 218.66, 204.87, 210.69, 194.28] },
      velocityScore: { '1D': -1.3, '1W': 2.3, '1M': 12, '6M': null }, isNew: false,
      marketCap: '$4.7T', pe: 29.7, revenueGrowth: 85, eps: 6.54, grossMargin: 74, dividendYield: 0.51,
      etfPresence: { AIS: 2.23, ARTY: 4.32, BAI: 3.82, IGPT: 7.47, IVES: 4.9, ALAI: 12.41, CHAT: 6.14, AIFD: 6.38, SPRX: 3.35, AOTG: 10.43 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 6.48, proScore: 5.84, coverage: 0.9,
      price: 1148.44, weeklyPrices: [1211.38, 1051.77, 1048.51, 1213.56, 1148.44], weeklyChange: -5.2, dayChange: -5.37, sortRank: 0, periodReturns: { '1M': 28.2, 'YTD': 302.4, '6M': 303.3, '1Y': 811.5 },
      priceHistory: { '1D': [1213.56, 1144.96, 1148.87, 1192.91, 1176, 1174.57, 1163.56, 1162.42, 1154.62, 1161.92, 1173.44, 1164.51, 1165.24, 1168.26, 1185.4, 1181.86, 1179.43, 1186.09, 1177.83, 1172.64, 1168.23, 1159.21, 1152.07, 1148.44], '1W': [1211.38, 1051.77, 1048.51, 1213.56, 1148.44], '1M': [895.88, 928.41, 923.52, 971, 1035.5, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1148.44], 'YTD': [285.41, 327.02, 336.63, 399.65, 435.79, 382.89, 413.97, 428.17, 412.37, 370.3, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 481.72, 517.16, 646.63, 776.01, 762.1, 971, 996, 995.87, 1133.99, 1148.44], '6M': [284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 418.69, 461.73, 382.09, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 923.52, 996, 995.87, 1133.99, 1148.44], '1Y': [126, 122.29, 124.53, 114.39, 111.26, 104.88, 118.89, 125.29, 115.79, 122, 131.37, 157.23, 162.73, 157.27, 187.83, 181.6, 202.38, 219.02, 223.77, 237.92, 236.95, 201.37, 236.48, 237.22, 241.14, 265.92, 294.37, 343.43, 338.13, 389.11, 435.28, 379.4, 373.25, 420.95, 429, 400.77, 418.69, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 517.16, 646.63, 803.63, 731.99, 923.52, 996, 995.87, 1133.99, 1148.44] },
      velocityScore: { '1D': 5.2, '1W': -5.5, '1M': -3.3, '6M': null }, isNew: false,
      marketCap: '$1.3T', pe: 25.9, revenueGrowth: 346, eps: 44.29, grossMargin: 73, dividendYield: 0.04,
      etfPresence: { AIS: 7.54, ARTY: 5.73, BAI: 7.05, IGPT: 8.09, IVES: 5.97, ALAI: 1.62, CHAT: 4.52, AIFD: 6.98, SPRX: false, AOTG: 10.86 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 9, avgWeight: 5.5, proScore: 4.95, coverage: 0.9,
      price: 517.85, weeklyPrices: [551.63, 519.85, 519.74, 532.57, 517.85], weeklyChange: -6.12, dayChange: -2.76, sortRank: 0, periodReturns: { '1M': 2.8, 'YTD': 141.8, '6M': 140.9, '1Y': 260.4 },
      priceHistory: { '1D': [532.57, 513.63, 512.19, 520.7, 519.76, 521.97, 516.9, 516.44, 513.08, 517, 517.05, 518.36, 519.16, 518.65, 519.11, 519.18, 520.77, 521.63, 519.46, 523.68, 522.45, 519.24, 519.43, 517.85], '1W': [551.63, 519.85, 519.74, 532.57, 517.85], '1M': [503.89, 495.54, 518.09, 516.1, 510.13, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 537.37, 551.63, 519.85, 519.74, 532.57, 517.85], 'YTD': [214.16, 204.68, 227.92, 259.68, 252.18, 192.5, 205.94, 200.15, 200.21, 192.43, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 305.33, 354.49, 408.46, 449.7, 449.59, 516.1, 523.2, 488.45, 537.37, 517.85], '6M': [214.99, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 204.83, 199.46, 220.27, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 518.09, 523.2, 488.45, 537.37, 517.85], '1Y': [143.68, 137.91, 146.42, 156.99, 166.47, 171.7, 172.76, 180.95, 163.71, 168.58, 151.14, 158.57, 157.39, 159.46, 164.67, 214.9, 233.08, 252.92, 256.12, 233.54, 247.96, 206.02, 217.53, 217.97, 210.78, 213.43, 215.61, 214.35, 220.97, 249.8, 252.74, 200.19, 213.57, 200.12, 210.86, 202.07, 204.83, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 354.49, 408.46, 445.5, 447.58, 518.09, 523.2, 488.45, 537.37, 517.85] },
      velocityScore: { '1D': -0.2, '1W': -0.6, '1M': -5.5, '6M': null }, isNew: false,
      marketCap: '$844B', pe: 173.8, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.6, ARTY: 4.86, BAI: 4.78, IGPT: 8.18, IVES: 4.98, ALAI: 1.29, CHAT: 4.01, AIFD: false, SPRX: 0.54, AOTG: 16.3 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 8, avgWeight: 3.58, proScore: 2.86, coverage: 0.8,
      price: 369.14, weeklyPrices: [392.13, 380.15, 382.07, 378.91, 369.14], weeklyChange: -5.86, dayChange: -2.58, sortRank: 0, periodReturns: { '1M': -12.5, 'YTD': 6.7, '6M': 4.8, '1Y': 36.6 },
      priceHistory: { '1D': [378.91, 367.33, 367.73, 369.48, 369.28, 368.19, 366.05, 366.16, 366, 369.23, 371.79, 372.51, 370.38, 371.9, 370.95, 372.24, 371.69, 373.37, 371.14, 371.95, 371.4, 370.67, 370.78, 369.14], '1W': [392.13, 380.15, 382.07, 378.91, 369.14], '1M': [422.01, 421.86, 426.58, 446.77, 459.97, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 411.35, 392.13, 380.15, 382.07, 378.91, 369.14], 'YTD': [346.1, 332.48, 343.02, 320.05, 330.73, 310.51, 331.17, 332.65, 319.55, 330.48, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 419.94, 417.43, 412.56, 439.79, 414.57, 446.77, 418.91, 385.57, 411.35, 369.14], '6M': [352.13, 343.42, 352.21, 332.6, 332.79, 320.33, 340.44, 333.51, 332.31, 317.53, 341.57, 315.93, 318.81, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 417.76, 426.58, 418.91, 385.57, 411.35, 369.14], '1Y': [270.17, 275.18, 274.38, 283.34, 290.18, 288.64, 304.97, 311.23, 289.6, 308.65, 334.89, 359.87, 344.94, 334.53, 338.37, 324.63, 349.33, 354.13, 369.63, 349.43, 339.98, 346.82, 402.96, 390.24, 359.93, 340.36, 349.39, 343.77, 354.61, 328.8, 333.24, 308.05, 340.44, 333.51, 332.31, 317.53, 341.57, 315.93, 318.81, 313.49, 354.91, 398.47, 419.94, 417.43, 412.56, 416.79, 417.76, 426.58, 418.91, 385.57, 411.35, 369.14] },
      velocityScore: { '1D': -1.4, '1W': 4.4, '1M': -11.5, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 61.3, revenueGrowth: 48, eps: 6.02, grossMargin: 76, dividendYield: 0.69,
      etfPresence: { AIS: 0.62, ARTY: 4.31, BAI: 4.01, IGPT: false, IVES: 4.88, ALAI: 3.93, CHAT: 3.93, AIFD: 5.44, SPRX: false, AOTG: 1.5 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 7, avgWeight: 3.65, proScore: 2.56, coverage: 0.7,
      price: 264.72, weeklyPrices: [307.86, 279.04, 276.70, 281.26, 264.72], weeklyChange: -14.01, dayChange: -5.88, sortRank: 0, periodReturns: { '1M': 27.1, 'YTD': 211.5, '6M': 206.6, '1Y': 231 },
      priceHistory: { '1D': [281.26, 267.01, 269.21, 272.49, 270.48, 268.47, 267.01, 267.14, 262.93, 265.34, 267.36, 267.51, 268.83, 268.2, 268.5, 267.83, 266.37, 268.81, 266.47, 267.84, 267.61, 266.59, 265.81, 264.72], '1W': [307.86, 279.04, 276.7, 281.26, 264.72], '1M': [208.26, 198.7, 204.83, 205, 219.43, 301.65, 316.43, 263.47, 288.85, 266.88, 252.59, 280.71, 279.7, 308.88, 278.67, 310.58, 307.86, 279.04, 276.7, 281.26, 264.72], 'YTD': [84.98, 83.45, 80.38, 80.23, 81.34, 74.21, 78.23, 79.48, 81.69, 89.57, 87.67, 89.53, 97.68, 107.11, 128.49, 139.69, 165.56, 165.15, 160.01, 182.58, 190.69, 205, 316.43, 280.71, 310.58, 264.72], '6M': [86.34, 90.23, 82.89, 79.8, 82.93, 75.54, 82.01, 79.09, 80.92, 78.09, 90.44, 87.62, 98.45, 99.05, 114.45, 134.6, 157.32, 156.57, 172.15, 177.95, 186.8, 204.83, 316.43, 280.71, 310.58, 264.72], '1Y': [79.97, 75.18, 72.71, 74.65, 74.21, 74.45, 77.34, 79.04, 71.21, 77.23, 63.33, 67.35, 74.26, 83.17, 86.22, 85.61, 87.95, 84.13, 93.74, 90.92, 87.52, 76.68, 89.4, 98.91, 84.43, 84.09, 85.76, 88.23, 83.05, 82.55, 83.62, 73.73, 82.01, 79.09, 80.92, 78.09, 90.44, 87.62, 98.45, 106.71, 119.93, 133.37, 165.56, 165.15, 160.01, 177.95, 186.8, 204.83, 316.43, 280.71, 310.58, 264.72] },
      velocityScore: { '1D': -0.8, '1W': -6.2, '1M': 7.6, '6M': null }, isNew: false,
      marketCap: '$232B', pe: 91.3, revenueGrowth: 28, eps: 2.9, grossMargin: 52, dividendYield: 0.09,
      etfPresence: { AIS: 3.89, ARTY: 4.33, BAI: 1.9, IGPT: 3.56, IVES: false, ALAI: false, CHAT: 1.5, AIFD: 6.17, SPRX: 4.23, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'ANET', name: 'Arista Networks Inc', easyScore: 7, avgWeight: 2.12, proScore: 1.48, coverage: 0.7,
      price: 156.79, weeklyPrices: [174.56, 162.20, 161.74, 165.45, 156.79], weeklyChange: -10.18, dayChange: -5.23, sortRank: 0, periodReturns: { '1M': -0.8, 'YTD': 19.7, '6M': 18.9, '1Y': 54.3 },
      priceHistory: { '1D': [165.45, 158.37, 157.99, 160.42, 159.83, 159.85, 158.79, 158.34, 157.86, 158.12, 158.57, 158.74, 158.25, 157.9, 157.45, 157.99, 157.91, 158.2, 157.88, 157.63, 157.75, 157.07, 157.9, 156.79], '1W': [174.56, 162.2, 161.74, 165.45, 156.79], '1M': [158.01, 154.31, 155.27, 159.47, 170.68, 174.37, 166.01, 154.27, 156.4, 152.16, 151.76, 156.4, 163.24, 169.09, 168.01, 169.67, 174.56, 162.2, 161.74, 165.45, 156.79], 'YTD': [131.03, 123.72, 130.59, 136.34, 148.15, 128.67, 135.12, 132.79, 133.5, 132.89, 134.03, 136.26, 122.55, 126.68, 147.35, 164.23, 172.55, 172.71, 141.75, 147.81, 148.59, 159.47, 166.01, 156.4, 169.67, 156.79], '6M': [131.84, 137.19, 123.42, 127.52, 146.69, 139.39, 143.45, 139.54, 132.89, 134.83, 138.23, 136.07, 135.01, 122.78, 145.07, 154.33, 177.73, 168.68, 147.06, 140.69, 140.49, 155.27, 166.01, 156.4, 169.67, 156.79], '1Y': [101.59, 102.52, 108.57, 111.78, 114.28, 117.57, 139.18, 136.48, 132.03, 136.23, 142.85, 139.39, 149.61, 142.5, 145.5, 154.1, 143.1, 153.82, 157.69, 134.65, 130.3, 119.59, 130.68, 128.59, 124.76, 131.12, 134.15, 132.58, 129.93, 127.29, 150.15, 130.28, 143.45, 139.54, 132.89, 134.83, 138.23, 136.07, 135.01, 124.85, 146.05, 161.01, 172.55, 172.71, 141.75, 140.69, 140.49, 155.27, 166.01, 156.4, 169.67, 156.79] },
      velocityScore: { '1D': 0, '1W': 10.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$197B', pe: 53.9, revenueGrowth: 35, eps: 2.91, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: 1.36, ARTY: 2.39, BAI: 1.35, IGPT: false, IVES: false, ALAI: 0.99, CHAT: 2.14, AIFD: 4.98, SPRX: 1.6, AOTG: false },
      tonyNote: 'Arista Networks Inc appears in 7 of 10 AI & ML ETFs (70% coverage) with average weight 2.1% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 4.82, proScore: 2.89, coverage: 0.6,
      price: 341.06, weeklyPrices: [349.68, 346.13, 345.29, 343.71, 341.06], weeklyChange: -2.46, dayChange: -0.77, sortRank: 0, periodReturns: { '1M': -12.3, 'YTD': 9, '6M': 8.8, '1Y': 96.5 },
      priceHistory: { '1D': [343.71, 338.36, 337.64, 338.15, 339.5, 339.8, 340.51, 340.94, 341.61, 342.47, 343.01, 344.44, 346.1, 344.61, 343.44, 342.64, 341.98, 342.29, 342.37, 341.2, 341.1, 341.6, 341.37, 341.06], '1W': [349.68, 346.13, 345.29, 343.71, 341.06], '1M': [388.88, 388.83, 390.13, 380.34, 376.37, 358.99, 372.19, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68, 369.35, 373.25, 368.03, 349.68, 346.13, 345.29, 343.71, 341.06], 'YTD': [313, 325.44, 332.78, 327.93, 338.25, 331.25, 309, 314.98, 311.76, 298.52, 303.55, 307.13, 280.92, 295.77, 317.24, 341.68, 338.89, 384.8, 397.99, 401.07, 387.66, 380.34, 372.19, 357.77, 368.03, 341.06], '6M': [313.51, 316.54, 331.86, 322, 334.55, 339.71, 318.58, 303.33, 312.9, 303.13, 308.7, 307.69, 290.93, 287.56, 317.32, 337.12, 339.32, 349.94, 398.04, 402.62, 388.91, 390.13, 372.19, 357.77, 368.03, 341.06], '1Y': [173.54, 179.53, 180.19, 185.06, 193.18, 189.13, 201.42, 202.94, 199.75, 211.64, 235, 240.8, 254.72, 246.54, 245.35, 236.57, 253.3, 259.92, 281.19, 278.83, 278.57, 289.45, 320.18, 321.27, 309.29, 307.16, 313.56, 314.34, 335.97, 328.38, 336.01, 333.04, 318.58, 303.33, 312.9, 303.13, 308.7, 307.69, 290.93, 297.39, 318.49, 336.02, 338.89, 384.8, 397.99, 402.62, 388.91, 390.13, 372.19, 357.77, 368.03, 341.06] },
      velocityScore: { '1D': -0.3, '1W': 2.5, '1M': -22.1, '6M': null }, isNew: false,
      marketCap: '$4.2T', pe: 26, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.26,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.03, IGPT: 7.42, IVES: 4.73, ALAI: false, CHAT: 4.9, AIFD: 4.91, SPRX: false, AOTG: 3.94 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 6, avgWeight: 4.81, proScore: 2.88, coverage: 0.6,
      price: 431.72, weeklyPrices: [467.67, 436.39, 440.83, 434.99, 431.72], weeklyChange: -7.69, dayChange: -0.75, sortRank: 0, periodReturns: { '1M': 4.7, 'YTD': 42.1, '6M': 42.6, '1Y': 92.7 },
      priceHistory: { '1D': [434.99, 421.34, 420.36, 425.68, 425.14, 425.17, 424.73, 423.23, 422.39, 424.95, 429.14, 428.86, 429.1, 429.84, 431.17, 432.32, 433.05, 434.8, 433.92, 434.95, 435.8, 432.69, 432.85, 431.72], '1W': [467.67, 436.39, 440.83, 434.99, 431.72], '1M': [412.32, 422.73, 424.86, 418.45, 435.63, 436.69, 444.92, 415.17, 426.8, 427.92, 408.75, 421.07, 423.93, 441.4, 425.83, 462.12, 467.67, 436.39, 440.83, 434.99, 431.72], 'YTD': [303.89, 318.01, 341.64, 334.87, 339.55, 330.73, 368.1, 370.54, 374.58, 338.89, 336.71, 338.79, 326.11, 339.04, 370.6, 370.5, 382.66, 396.06, 414.15, 417.72, 407.15, 418.45, 444.92, 421.07, 462.12, 431.72], '6M': [302.84, 322.25, 331.77, 327.16, 338.34, 335.75, 361.91, 362.26, 387.73, 357.44, 354.56, 339.57, 347.75, 337.95, 365.9, 375.1, 387.44, 393.83, 419.5, 399.8, 401.62, 424.86, 444.92, 421.07, 462.12, 431.72], '1Y': [224.01, 234.8, 230.4, 240.4, 245.6, 235.21, 241.83, 241, 227.33, 238.27, 243.41, 259.33, 264.87, 273.36, 292.19, 280.66, 295.08, 294.96, 300.43, 286.5, 282.2, 277.5, 291.51, 294.72, 292.04, 288.95, 300.92, 327.43, 331.21, 326.12, 342.3, 325.74, 361.91, 362.26, 387.73, 357.44, 354.56, 339.57, 347.75, 341.49, 365.49, 363.35, 382.66, 396.06, 414.15, 399.8, 401.62, 424.86, 444.92, 421.07, 462.12, 431.72] },
      velocityScore: { '1D': -2, '1W': 1.4, '1M': -5, '6M': null }, isNew: false,
      marketCap: '$2.2T', pe: 37.2, revenueGrowth: 35, eps: 11.61, grossMargin: 62, dividendYield: 0.87,
      etfPresence: { AIS: 3.05, ARTY: false, BAI: 4.18, IGPT: false, IVES: 5.09, ALAI: 5.63, CHAT: false, AIFD: 3.45, SPRX: false, AOTG: 7.44 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 5, avgWeight: 3.94, proScore: 1.97, coverage: 0.5,
      price: 230.86, weeklyPrices: [232.79, 234.11, 234.27, 227.01, 230.86], weeklyChange: -0.83, dayChange: 1.7, sortRank: 0, periodReturns: { '1M': -13, 'YTD': 0, '6M': -0.7, '1Y': 6.3 },
      priceHistory: { '1D': [227.01, 228.34, 226.54, 229.93, 230.6, 230.98, 230.66, 230.55, 231.17, 231.76, 232.32, 232.19, 232.39, 231.96, 231.49, 231.82, 231.96, 231.51, 231.04, 230.34, 230.37, 230.82, 230.55, 230.86], '1W': [232.79, 234.11, 234.27, 227.01, 230.86], '1M': [265.29, 271.85, 274, 270.64, 261.26, 250.02, 253.79, 246.03, 245.22, 244.19, 238, 241.51, 238.55, 246.02, 246, 244.39, 232.79, 234.11, 234.27, 227.01, 230.86], 'YTD': [230.82, 246.29, 238.18, 239.16, 241.73, 222.69, 199.6, 210.11, 210, 213.21, 209.53, 208.76, 207.54, 209.77, 238.38, 250.56, 255.08, 265.06, 271.17, 267.22, 268.46, 270.64, 253.79, 241.51, 244.39, 230.86], '6M': [232.52, 233.06, 246.47, 231, 244.68, 238.62, 206.96, 204.79, 210.64, 216.82, 212.65, 209.87, 211.71, 208.27, 221.25, 248.5, 255.36, 263.04, 274.99, 270.13, 265.01, 274, 253.79, 241.51, 244.39, 230.86], '1Y': [217.12, 223.41, 225.02, 226.13, 231.44, 214.75, 222.69, 230.98, 221.95, 231.6, 232.33, 228.15, 231.48, 219.78, 219.51, 216.37, 213.04, 224.21, 244.22, 244.41, 237.58, 217.14, 233.22, 229.53, 226.19, 227.35, 232.07, 240.93, 242.6, 231.31, 243.01, 232.99, 206.96, 204.79, 210.64, 216.82, 212.65, 209.87, 211.71, 210.57, 233.65, 249.7, 255.08, 265.06, 271.17, 270.13, 265.01, 274, 253.79, 241.51, 244.39, 230.86] },
      velocityScore: { '1D': -0.5, '1W': -1, '1M': -33, '6M': null }, isNew: false,
      marketCap: '$2.5T', pe: 32.2, revenueGrowth: 17, eps: 7.17, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 4.73, ALAI: 5.35, CHAT: 2.19, AIFD: 3.41, SPRX: false, AOTG: 4 },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 5, avgWeight: 3.81, proScore: 1.91, coverage: 0.5,
      price: 555.24, weeklyPrices: [563.85, 562.20, 557.67, 542.87, 555.24], weeklyChange: -1.53, dayChange: 2.28, sortRank: 0, periodReturns: { '1M': -9.3, 'YTD': -15.9, '6M': -16.3, '1Y': -23.5 },
      priceHistory: { '1D': [542.87, 544.19, 543.03, 546.62, 550.57, 552.16, 551.57, 552.47, 553.87, 554.57, 555.95, 556.12, 556.78, 555.87, 554.44, 554.63, 554.23, 554.22, 553.78, 554.04, 554.41, 554.89, 555.28, 555.24], '1W': [563.85, 562.2, 557.67, 542.87, 555.24], '1M': [612.34, 635.26, 635.29, 632.51, 600.47, 622.98, 627.57, 593, 585.39, 584.59, 570.98, 568.43, 566.98, 593.48, 600.21, 577.22, 563.85, 562.2, 557.67, 542.87, 555.24], 'YTD': [660.09, 646.06, 620.8, 658.76, 738.31, 670.21, 649.81, 655.66, 648.18, 644.86, 638.18, 606.7, 547.54, 574.46, 629.86, 688.55, 659.15, 611.91, 616.81, 618.43, 607.38, 632.51, 627.57, 568.43, 577.22, 555.24], '6M': [663.29, 658.79, 641.97, 604.12, 672.97, 691.7, 670.72, 643.22, 653.69, 667.73, 654.86, 615.68, 594.89, 572.13, 612.42, 671.58, 674.72, 669.12, 612.88, 616.63, 605.06, 635.29, 627.57, 568.43, 577.22, 555.24], '1Y': [726.09, 719.01, 717.51, 704.28, 712.68, 750.01, 769.3, 782.13, 739.1, 751.11, 752.45, 755.59, 778.38, 743.75, 710.56, 705.3, 716.92, 738.36, 648.35, 621.71, 609.89, 589.15, 647.95, 673.42, 644.23, 658.77, 658.69, 660.62, 631.09, 612.96, 668.73, 668.99, 670.72, 643.22, 653.69, 667.73, 654.86, 615.68, 594.89, 579.23, 628.39, 676.87, 659.15, 611.91, 616.81, 616.63, 605.06, 635.29, 627.57, 568.43, 577.22, 555.24] },
      velocityScore: { '1D': -1, '1W': 19.4, '1M': -28.5, '6M': null }, isNew: false,
      marketCap: '$1.4T', pe: 20.2, revenueGrowth: 33, eps: 27.52, grossMargin: 82, dividendYield: 0.39,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: 7.55, IVES: 4.64, ALAI: 3.84, CHAT: 1.92, AIFD: false, SPRX: false, AOTG: 1.11 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.38, proScore: 1.69, coverage: 0.5,
      price: 371.21, weeklyPrices: [367.34, 373.94, 365.46, 352.83, 371.21], weeklyChange: 1.05, dayChange: 5.21, sortRank: 0, periodReturns: { '1M': -10.8, 'YTD': -23.2, '6M': -23.9, '1Y': -25.4 },
      priceHistory: { '1D': [352.83, 361.23, 362.82, 364.47, 364.56, 367.21, 367.36, 369.86, 368.96, 369.17, 370.98, 370.72, 369.98, 368.67, 367.98, 369.68, 370.47, 369.97, 369.79, 369.26, 371.16, 370.72, 371.58, 371.21], '1W': [367.34, 373.94, 365.46, 352.83, 371.21], '1M': [416.03, 412.67, 426.99, 450.24, 460.52, 427.34, 428.05, 416.67, 411.74, 403.41, 397.36, 390.34, 390.74, 399.76, 393.83, 379.4, 367.34, 373.94, 365.46, 352.83, 371.21], 'YTD': [483.62, 478.11, 456.66, 465.95, 433.5, 393.67, 401.84, 397.23, 392.74, 408.96, 401.86, 389.02, 365.97, 373.46, 370.87, 422.79, 415.75, 407.78, 420.77, 409.43, 419.09, 450.24, 428.05, 390.34, 379.4, 371.21], '6M': [487.71, 472.85, 477.18, 454.52, 480.58, 411.21, 413.27, 399.6, 400.6, 405.2, 404.88, 391.79, 371.04, 370.17, 374.33, 411.22, 432.92, 424.46, 413.96, 405.21, 421.06, 426.99, 428.05, 390.34, 379.4, 371.21], '1Y': [497.45, 498.84, 503.32, 510.05, 513.71, 524.11, 522.04, 522.48, 504.24, 509.64, 495, 509.9, 517.93, 511.46, 517.35, 510.96, 513.58, 523.61, 517.81, 496.82, 503.29, 478.43, 492.01, 483.16, 478.53, 485.92, 487.1, 478.51, 470.67, 444.11, 481.63, 414.19, 413.27, 399.6, 400.6, 405.2, 404.88, 391.79, 371.04, 369.37, 373.07, 420.26, 415.75, 407.78, 420.77, 405.21, 421.06, 426.99, 428.05, 390.34, 379.4, 371.21] },
      velocityScore: { '1D': -1.7, '1W': 0, '1M': -32.4, '6M': null }, isNew: false,
      marketCap: '$2.8T', pe: 22.1, revenueGrowth: 18, eps: 16.79, grossMargin: 68, dividendYield: 1.03,
      etfPresence: { AIS: false, ARTY: 2.27, BAI: false, IGPT: false, IVES: 4.53, ALAI: 4.68, CHAT: 1.94, AIFD: false, SPRX: false, AOTG: 3.49 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 5, avgWeight: 3.37, proScore: 1.69, coverage: 0.5,
      price: 390.92, weeklyPrices: [439.66, 397.02, 399.92, 398.00, 390.92], weeklyChange: -11.09, dayChange: -1.78, sortRank: 0, periodReturns: { '1M': 22.7, 'YTD': 135, '6M': 133.7, '1Y': 299.1 },
      priceHistory: { '1D': [398, 381.41, 379.47, 387.81, 381.11, 383.5, 375.58, 379, 374.87, 378.43, 379.6, 380.05, 379.45, 379.45, 382.05, 385.25, 390.39, 394.21, 391, 393, 392.83, 390.11, 392.54, 390.92], '1W': [439.66, 397.02, 399.92, 398, 390.92], '1M': [318.72, 325.33, 349.17, 342.85, 320.09, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 361.71, 417.07, 439.66, 397.02, 399.92, 398, 390.92], 'YTD': [166.36, 156.73, 174.45, 169.66, 160.46, 142.82, 126.58, 129.68, 118.83, 119.2, 119.9, 126.16, 113.61, 117.14, 149.05, 174.05, 197.54, 194.74, 195.65, 228.64, 297.84, 342.85, 358.05, 367.47, 417.07, 390.92], '6M': [167.26, 167.11, 172.57, 183.75, 170.93, 158.52, 182.86, 129.58, 128.15, 113.77, 124.71, 126.34, 120.33, 109.6, 125.46, 172.09, 194.06, 196.85, 213.91, 224.09, 287.48, 349.17, 358.05, 367.47, 417.07, 390.92], '1Y': [97.96, 90.8, 95.9, 102.13, 122.23, 131.1, 179.28, 190.69, 177.53, 189.15, 191.2, 229.5, 245.2, 197.78, 200.74, 206.21, 159.8, 164.97, 186.68, 165.49, 144.47, 139.29, 157.57, 161.23, 148.85, 164.4, 170.1, 161.01, 180.56, 176.01, 167.9, 144.67, 182.86, 129.58, 128.15, 113.77, 124.71, 126.34, 120.33, 106.33, 129.46, 170.81, 197.54, 194.74, 195.65, 224.09, 287.48, 349.17, 358.05, 367.47, 417.07, 390.92] },
      velocityScore: { '1D': -2.3, '1W': 7.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$67B', pe: 265.9, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 1.95, ARTY: 1.32, BAI: false, IGPT: false, IVES: false, ALAI: 1.18, CHAT: 2.74, AIFD: false, SPRX: 9.66, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 5, avgWeight: 2.76, proScore: 1.38, coverage: 0.5,
      price: 810.92, weeklyPrices: [893.93, 827.92, 842.53, 861.97, 810.92], weeklyChange: -9.29, dayChange: -5.92, sortRank: 0, periodReturns: { '1M': -11, 'YTD': 120, '6M': 107.5, '1Y': 756.2 },
      priceHistory: { '1D': [861.97, 784.45, 782.1, 794.42, 795.9, 793.42, 785.5, 783.27, 777.62, 788.14, 792.58, 790, 796, 794.88, 796.97, 804, 803.92, 819.25, 810.71, 813.23, 815.9, 810, 809.41, 810.92], '1W': [893.93, 827.92, 842.53, 861.97, 810.92], '1M': [910.81, 902.31, 860.62, 854.96, 905, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 850, 893.93, 827.92, 842.53, 861.97, 810.92], 'YTD': [368.59, 348.26, 343.27, 339.19, 381.44, 504.42, 583.46, 667.77, 700.91, 558.44, 616.09, 772.13, 688.8, 826.88, 897.3, 894.07, 846.89, 902.32, 892.58, 1001.81, 964.5, 854.96, 945.08, 889.59, 850, 810.92], '6M': [390.77, 357.05, 339.87, 356.83, 370.66, 435.1, 561.13, 594.26, 723.39, 680.8, 672, 700.81, 777.17, 702.76, 896.02, 824.01, 873.6, 858.32, 944.28, 1030.37, 868.07, 860.62, 945.08, 889.59, 850, 810.92], '1Y': [94.71, 92.75, 92.99, 102.22, 104.52, 106.68, 116.27, 114.62, 117.43, 135.55, 149.46, 163.02, 168.73, 160.75, 163.81, 149.61, 164.77, 179.3, 201.56, 240.11, 226.86, 233.24, 325.16, 331.41, 324.35, 371.43, 372.61, 397.42, 361.33, 362.44, 385, 465.54, 561.13, 594.26, 723.39, 680.8, 672, 700.81, 777.17, 764.65, 894.13, 891.22, 846.89, 902.32, 892.58, 1030.37, 868.07, 860.62, 945.08, 889.59, 850, 810.92] },
      velocityScore: { '1D': 1.5, '1W': 1.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$63B', pe: 142.5, revenueGrowth: 90, eps: 5.69, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.54, IGPT: false, IVES: false, ALAI: 0.63, CHAT: 1.39, AIFD: 5.9, SPRX: 3.33, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 5 of 10 AI & ML ETFs (50% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 5, avgWeight: 2.7, proScore: 1.35, coverage: 0.5,
      price: 585.24, weeklyPrices: [732.62, 670.75, 643.83, 675.39, 585.24], weeklyChange: -20.12, dayChange: -13.35, sortRank: 0, periodReturns: { '1M': 11.5, 'YTD': 239.7, '6M': 222.4, '1Y': 821.5 },
      priceHistory: { '1D': [675.39, 623.1, 619.02, 624.74, 617.99, 616.97, 615.4, 614.77, 605.33, 605.16, 605.83, 602.12, 604.28, 603.44, 604.25, 602.25, 597.42, 598.99, 594.26, 593.31, 596.89, 592.87, 588, 585.24], '1W': [732.62, 670.75, 643.83, 675.39, 585.24], '1M': [524.65, 530.6, 531.18, 531.21, 546.2, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 746.23, 732.62, 670.75, 643.83, 675.39, 585.24], 'YTD': [172.27, 187.68, 222.1, 236.39, 278.41, 260.19, 284.1, 285.52, 279.7, 245.25, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 403.12, 434.52, 463.91, 489.15, 486.46, 531.21, 575.5, 529.29, 746.23, 585.24], '6M': [181.54, 187.88, 212.14, 222.97, 252.66, 290.24, 262.56, 296.56, 290.95, 261.3, 268.81, 304.9, 296.14, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 459.62, 531.18, 575.5, 529.29, 746.23, 585.24], '1Y': [63.51, 66.08, 66.14, 68, 68.82, 76.55, 74.97, 76.24, 74.66, 82.04, 92.04, 97.66, 106.63, 106.88, 131.31, 115.42, 126.2, 129.43, 150.21, 162.96, 157.16, 140.23, 163.33, 168.89, 176.34, 181.08, 179.68, 219.38, 214, 241.9, 279.7, 269.41, 262.56, 296.56, 290.95, 261.3, 268.81, 304.9, 296.14, 297.73, 337.88, 361.69, 403.12, 434.52, 463.91, 494.09, 459.62, 531.18, 575.5, 529.29, 746.23, 585.24] },
      velocityScore: { '1D': 3.1, '1W': -27, '1M': -32.5, '6M': null }, isNew: false,
      marketCap: '$202B', pe: 35.1, revenueGrowth: 46, eps: 16.68, grossMargin: 45, dividendYield: 0.09,
      etfPresence: { AIS: 1.44, ARTY: 3.13, BAI: 3.43, IGPT: false, IVES: false, ALAI: 4.67, CHAT: false, AIFD: false, SPRX: false, AOTG: 0.81 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 5, avgWeight: 2.53, proScore: 1.26, coverage: 0.5,
      price: 2124.24, weeklyPrices: [2273.73, 1963.60, 1914.46, 2335.00, 2124.24], weeklyChange: -6.57, dayChange: -9.03, sortRank: 0, periodReturns: { '1M': 33.6, 'YTD': 794.9, '6M': 749.5, '1Y': 4377.7 },
      priceHistory: { '1D': [2335, 2156.99, 2164.79, 2242.85, 2217.21, 2214.83, 2196.25, 2182.83, 2153.04, 2148.5, 2179.6, 2158.48, 2154.13, 2145.64, 2166.03, 2172.93, 2166.27, 2178.14, 2164.84, 2163.04, 2157.5, 2144.49, 2135.39, 2124.24], '1W': [2273.73, 1963.6, 1914.46, 2335, 2124.24], '1M': [1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2124.24], 'YTD': [237.38, 334.54, 409.24, 473.83, 539.3, 576.2, 630.29, 649.97, 635.36, 527.33, 618.82, 772.09, 603.17, 701.59, 851.77, 920.99, 932.43, 1096.51, 1339.96, 1382.72, 1542.24, 1694.98, 1759.68, 1881.51, 2184.75, 2124.24], '6M': [250.05, 274.08, 389.27, 453.12, 481.43, 695.51, 541.64, 600.4, 632.38, 599.06, 655.43, 753.69, 677.86, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1447.23, 1392.56, 1641.64, 1759.68, 1881.51, 2184.75, 2124.24], '1Y': [47.44, 46.41, 46.09, 42.19, 42.48, 41.33, 44.34, 46.68, 45.5, 50.87, 68.55, 86.13, 102.21, 97.12, 128.41, 116.91, 140.16, 186.16, 199.33, 239.48, 243.57, 195.96, 223.28, 228.47, 206.18, 237.61, 244.25, 349.63, 389.81, 501.29, 527.63, 584.55, 541.64, 600.4, 632.38, 599.06, 655.43, 753.69, 677.86, 692.73, 851.57, 919.47, 932.43, 1096.51, 1339.96, 1447.23, 1392.56, 1641.64, 1759.68, 1881.51, 2184.75, 2124.24] },
      velocityScore: { '1D': 6.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$315B', pe: 72.8, revenueGrowth: 251, eps: 29.19, grossMargin: 56, dividendYield: null,
      etfPresence: { AIS: 2.5, ARTY: false, BAI: 3.43, IGPT: 4.17, IVES: false, ALAI: 0.67, CHAT: false, AIFD: false, SPRX: false, AOTG: 1.88 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'CRDO', name: 'Credo Technology Group Holding Ltd', easyScore: 5, avgWeight: 2, proScore: 1, coverage: 0.5,
      price: 254.13, weeklyPrices: [302.52, 272.01, 268.99, 268.03, 254.13], weeklyChange: -16, dayChange: -5.19, sortRank: 0, periodReturns: { '1M': 14.7, 'YTD': 76.6, '6M': 75.5, '1Y': 167.4 },
      priceHistory: { '1D': [268.03, 251.71, 254.46, 259.36, 256.24, 255.52, 251.35, 252.38, 249.59, 250.45, 254.58, 253.07, 251.85, 251.99, 252.94, 252.42, 255.26, 256.86, 255.09, 256.27, 256, 255.6, 254.37, 254.13], '1W': [302.52, 272.01, 268.99, 268.03, 254.13], '1M': [221.64, 221.23, 222.35, 236.03, 226.1, 214.6, 217.5, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81, 259.41, 239.18, 271.83, 302.52, 272.01, 268.99, 268.03, 254.13], 'YTD': [143.89, 141.59, 149.12, 133.16, 129.47, 98.06, 121.78, 124.06, 112.27, 109.83, 111.57, 107.09, 96.44, 101.45, 119.59, 160.69, 185.54, 174.01, 188.29, 184.54, 193.39, 236.03, 217.5, 264.76, 271.83, 254.13], '6M': [144.83, 140.24, 156.07, 153.22, 129.57, 111.31, 134.72, 127.91, 123.46, 102.54, 115.91, 101.72, 103.91, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 189.36, 182.98, 222.35, 217.5, 264.76, 271.83, 254.13], '1Y': [95.05, 93.61, 98.52, 93.47, 101.22, 107.56, 120.41, 117.33, 110.86, 131.82, 140.82, 161.99, 169.56, 142.93, 143.87, 138.83, 143.61, 155.55, 187.62, 163.61, 142.95, 134.73, 177.6, 176.04, 143.91, 150.13, 144.7, 132.95, 161.38, 139.16, 129.66, 96.95, 134.72, 127.91, 123.46, 102.54, 115.91, 101.72, 103.91, 95.92, 107.93, 158.93, 185.54, 174.01, 188.29, 189.36, 182.98, 222.35, 217.5, 264.76, 271.83, 254.13] },
      velocityScore: { '1D': -2.9, '1W': 9.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$47B', pe: 100.8, revenueGrowth: 157, eps: 2.52, grossMargin: 68, dividendYield: null,
      etfPresence: { AIS: 1.06, ARTY: 1.29, BAI: 2.11, IGPT: false, IVES: false, ALAI: false, CHAT: 2.27, AIFD: false, SPRX: 3.25, AOTG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 4, avgWeight: 3.19, proScore: 1.28, coverage: 0.4,
      price: 127.5, weeklyPrices: [140.94, 132.28, 131.65, 132.87, 127.50], weeklyChange: -9.54, dayChange: -4.04, sortRank: 0, periodReturns: { '1M': 3.2, 'YTD': 245.5, '6M': 252.2, '1Y': 466.7 },
      priceHistory: { '1D': [132.87, 126.41, 127.46, 130.88, 129.78, 129.67, 129.23, 129.01, 127.88, 128.9, 128.9, 128.3, 129.03, 128.52, 129.25, 128.51, 129.35, 129.94, 128.9, 129.19, 129, 128.3, 128.24, 127.5], '1W': [140.94, 132.28, 131.65, 132.87, 127.5], '1M': [123.52, 121.77, 120.89, 114.68, 109.33, 112.71, 111.78, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 133.99, 140.94, 132.28, 131.65, 132.87, 127.5], 'YTD': [36.9, 41.11, 48.32, 45.07, 48.66, 48.24, 46.48, 44.11, 45.61, 43.42, 45.25, 46.18, 44.1, 50.38, 62.38, 68.5, 66.78, 94.48, 109.62, 115.93, 118.5, 114.68, 111.78, 116.96, 133.99, 127.5], '6M': [36.2, 39.37, 44.06, 48.56, 43.93, 49.25, 47.13, 45.46, 46.88, 45.58, 47.98, 45.03, 47.18, 44.13, 58.95, 64.94, 65.27, 94.75, 113.01, 120.29, 118.96, 120.89, 111.78, 116.96, 133.99, 127.5], '1Y': [22.5, 22.49, 23.43, 23.1, 20.7, 19.31, 19.95, 23.86, 23.5, 24.93, 24.49, 24.08, 29.58, 35.5, 36.83, 36.37, 37.01, 38.28, 39.99, 38.13, 35.91, 33.62, 40.56, 41.41, 37.81, 36.82, 36.68, 40.04, 47.29, 54.25, 48.78, 48.6, 47.13, 45.46, 46.88, 45.58, 47.98, 45.03, 47.18, 48.03, 61.72, 68.5, 66.78, 94.48, 109.62, 120.29, 118.96, 120.89, 111.78, 116.96, 133.99, 127.5] },
      velocityScore: { '1D': -1.5, '1W': -10.5, '1M': -55.1, '6M': null }, isNew: false,
      marketCap: '$641B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.44, ARTY: false, BAI: 3.15, IGPT: 4.87, IVES: false, ALAI: false, CHAT: 1.31, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'ARM', name: 'ARM Holdings PLC', easyScore: 4, avgWeight: 3.13, proScore: 1.25, coverage: 0.4,
      price: 329.8, weeklyPrices: [407.72, 366.39, 359.08, 347.71, 329.80], weeklyChange: -19.11, dayChange: -5.15, sortRank: 0, periodReturns: { '1M': 2.7, 'YTD': 201.7, '6M': 199.1, '1Y': 108.5 },
      priceHistory: { '1D': [347.71, 334.95, 333.83, 337.02, 334.33, 335.29, 332.08, 333.48, 331.55, 334.24, 336.04, 335.15, 334.91, 333.48, 332.55, 332.02, 333.12, 334.17, 332, 332.72, 332.52, 330.2, 330.84, 329.8], '1W': [407.72, 366.39, 359.08, 347.71, 329.8], '1M': [321.22, 302.71, 335.27, 353.29, 408.85, 411.83, 393.44, 342.93, 346.39, 324.86, 307.43, 342.23, 380.81, 412.55, 396.34, 439.46, 407.72, 366.39, 359.08, 347.71, 329.8], 'YTD': [109.31, 113.08, 105.11, 116.07, 108.43, 110.88, 122.19, 125.58, 127.45, 114.38, 115.12, 129.82, 154.8, 149.11, 148.93, 166.73, 204.61, 210.32, 213.31, 228.5, 298.23, 353.29, 393.44, 342.23, 439.46, 329.8], '6M': [110.27, 116.11, 111.14, 107.17, 114.88, 104.55, 125.95, 127.24, 131.74, 124.11, 120.1, 128.36, 157.07, 151.28, 148.91, 159.34, 196.57, 201.69, 237.3, 221.21, 256.73, 335.27, 393.44, 342.23, 439.46, 329.8], '1Y': [158.15, 155.09, 145.94, 156.74, 163.17, 137.58, 138.5, 140.55, 133.28, 142.55, 138.17, 150.64, 142.91, 139.62, 152.64, 154.81, 165.61, 170.68, 169.82, 152.38, 140.31, 132.53, 135.56, 141.31, 130.89, 114.03, 110.51, 115.53, 107.84, 113.92, 109.96, 104.9, 125.95, 127.24, 131.74, 124.11, 120.1, 128.36, 157.07, 155.07, 149.79, 162.33, 204.61, 210.32, 213.31, 221.21, 256.73, 335.27, 393.44, 342.23, 439.46, 329.8] },
      velocityScore: { '1D': -3.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$352B', pe: 397.3, revenueGrowth: 20, eps: 0.83, grossMargin: 98, dividendYield: null,
      etfPresence: { AIS: 1.82, ARTY: false, BAI: false, IGPT: false, IVES: false, ALAI: 0.18, CHAT: 2.55, AIFD: false, SPRX: 7.97, AOTG: false },
      tonyNote: 'Arm Holdings is held across Broad Tech and AI ETFs as the CPU architecture licensor embedded in every mobile device and increasingly in AI inference chips and data center CPUs. Revenue grew and the royalty model is high-margin; the weight score reflects consistent institutional positioning as the AI chip design ecosystem expands on Arm cores.',
    },
    {
      ticker: 'NBIS', name: 'NEBIUS GROUP NV', easyScore: 4, avgWeight: 3.09, proScore: 1.24, coverage: 0.4,
      price: 238.6, weeklyPrices: [283.61, 275.25, 259.66, 256.63, 238.60], weeklyChange: -15.87, dayChange: -7.03, sortRank: 0, periodReturns: { '1M': 14.7, 'YTD': 185, '6M': 172.4, '1Y': 353.6 },
      priceHistory: { '1D': [256.63, 242.78, 242.57, 245.04, 242.36, 246, 241.18, 239.11, 237.54, 238.2, 240.42, 239.77, 240.07, 239.08, 238.57, 243.01, 243.61, 245.98, 243.59, 242.49, 240.02, 240.72, 241.44, 238.6], '1W': [283.61, 275.25, 259.66, 256.63, 238.6], '1M': [208.06, 208.37, 226.34, 231.09, 264.51, 251.68, 259.67, 227.81, 218, 220.12, 211.69, 222.24, 232.36, 260.07, 265.1, 286.69, 283.61, 275.25, 259.66, 256.63, 238.6], 'YTD': [83.71, 97.3, 103.89, 94.5, 94.91, 73.87, 89.73, 97.92, 91.19, 89.33, 108.04, 121.52, 105.97, 108.82, 144.97, 157.14, 157.08, 138.23, 184.77, 221.15, 219.93, 231.09, 259.67, 222.24, 286.69, 238.6], '6M': [87.59, 92.83, 107.33, 99.29, 97.87, 89.95, 91.79, 101.8, 106.12, 97.78, 112, 118.56, 115.09, 103.76, 125, 166.77, 156.14, 141.19, 195.09, 207.27, 191.82, 226.34, 259.67, 222.24, 286.69, 238.6], '1Y': [52.6, 50.25, 44.3, 52.79, 51.37, 52, 68.78, 68.46, 66.18, 72.04, 65.47, 90.41, 99.31, 107.7, 127.98, 129.58, 113.44, 117.26, 130.82, 111.28, 88.63, 84.64, 94.87, 98.04, 87.69, 89.46, 86.04, 100.24, 105.43, 98.87, 100.43, 82.39, 91.79, 101.8, 106.12, 97.78, 112, 118.56, 115.09, 101.95, 136.33, 165.34, 157.08, 138.23, 184.77, 207.27, 191.82, 226.34, 259.67, 222.24, 286.69, 238.6] },
      velocityScore: { '1D': -1.6, '1W': -5.3, '1M': -35.8, '6M': null }, isNew: false,
      marketCap: '$61B', pe: 92.1, revenueGrowth: 684, eps: 2.59, grossMargin: 72, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 2.73, ALAI: 4.13, CHAT: 3.55, AIFD: 1.94, SPRX: false, AOTG: false },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 4, avgWeight: 2.97, proScore: 1.19, coverage: 0.4,
      price: 304.04, weeklyPrices: [357.96, 318.32, 316.43, 325.57, 304.04], weeklyChange: -15.06, dayChange: -6.61, sortRank: 0, periodReturns: { '1M': -6.1, 'YTD': 87.7, '6M': 81.4, '1Y': 145.6 },
      priceHistory: { '1D': [325.57, 307.3, 309.64, 311.82, 308.93, 305.07, 304.01, 303.79, 301.3, 302.43, 305.4, 304.31, 304.94, 303.78, 303.6, 305.05, 304.66, 305.67, 305.42, 306.05, 304.39, 303.54, 304.49, 304.04], '1W': [357.96, 318.32, 316.43, 325.57, 304.04], '1M': [323.91, 319.78, 314.18, 315.71, 323.39, 331.44, 323.92, 300.51, 300.57, 289.52, 280.98, 297.88, 302.87, 311.93, 299.6, 333.05, 357.96, 318.32, 316.43, 325.57, 304.04], 'YTD': [162.01, 160.78, 172.54, 182.49, 195.1, 177.75, 236.51, 243.75, 254.89, 241.78, 265.38, 269.17, 252.4, 261.29, 295.11, 307.34, 321.75, 328.49, 340.01, 376.23, 323.4, 315.71, 323.92, 297.88, 333.05, 304.04], '6M': [167.58, 173.95, 170.03, 175.18, 189.21, 190.15, 199.62, 243.21, 262.19, 251.28, 268.26, 264.71, 276.16, 250.58, 281.03, 301.16, 305.14, 306.18, 358.92, 369.99, 315.67, 314.18, 323.92, 297.88, 333.05, 304.04], '1Y': [123.8, 127.84, 123.3, 129.06, 137.47, 141.59, 139.93, 132.52, 126.58, 134.23, 124, 134.84, 143.6, 138.62, 160.2, 169.01, 174, 186.06, 192.86, 179.8, 163.64, 159.61, 179.73, 189.02, 161.27, 159.82, 165.62, 174.95, 172.72, 181.47, 193.76, 182.56, 199.62, 243.21, 262.19, 251.28, 268.26, 264.71, 276.16, 259.37, 287.64, 294.13, 321.75, 328.49, 340.01, 369.99, 315.67, 314.18, 323.92, 297.88, 333.05, 304.04] },
      velocityScore: { '1D': -5.6, '1W': 3.5, '1M': -37.7, '6M': null }, isNew: false,
      marketCap: '$117B', pe: 76.6, revenueGrowth: 30, eps: 3.97, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 3.53, ARTY: false, BAI: 1.9, IGPT: false, IVES: false, ALAI: false, CHAT: 2.23, AIFD: 4.21, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 4.63, proScore: 4.63, coverage: 1,
      price: 1148.44, weeklyPrices: [1211.38, 1051.77, 1048.51, 1213.56, 1148.44], weeklyChange: -5.2, dayChange: -5.37, sortRank: 0, periodReturns: { '1M': 28.2, 'YTD': 302.4, '6M': 303.3, '1Y': 811.5 },
      priceHistory: { '1D': [1213.56, 1144.96, 1148.87, 1192.91, 1176, 1174.57, 1163.56, 1162.42, 1154.62, 1161.92, 1173.44, 1164.51, 1165.24, 1168.26, 1185.4, 1181.86, 1179.43, 1186.09, 1177.83, 1172.64, 1168.23, 1159.21, 1152.07, 1148.44], '1W': [1211.38, 1051.77, 1048.51, 1213.56, 1148.44], '1M': [895.88, 928.41, 923.52, 971, 1035.5, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1148.44], 'YTD': [285.41, 327.02, 336.63, 399.65, 435.79, 382.89, 413.97, 428.17, 412.37, 370.3, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 481.72, 517.16, 646.63, 776.01, 762.1, 971, 996, 995.87, 1133.99, 1148.44], '6M': [284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 418.69, 461.73, 382.09, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 923.52, 996, 995.87, 1133.99, 1148.44], '1Y': [126, 122.29, 124.53, 114.39, 111.26, 104.88, 118.89, 125.29, 115.79, 122, 131.37, 157.23, 162.73, 157.27, 187.83, 181.6, 202.38, 219.02, 223.77, 237.92, 236.95, 201.37, 236.48, 237.22, 241.14, 265.92, 294.37, 343.43, 338.13, 389.11, 435.28, 379.4, 373.25, 420.95, 429, 400.77, 418.69, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 517.16, 646.63, 803.63, 731.99, 923.52, 996, 995.87, 1133.99, 1148.44] },
      velocityScore: { '1D': 7.7, '1W': -25.8, '1M': -28.2, '6M': null }, isNew: false,
      marketCap: '$1.3T', pe: 25.9, revenueGrowth: 346, eps: 44.29, grossMargin: 73, dividendYield: 0.04,
      etfPresence: { SOXX: 9.21, PSI: 5.62, XSD: 2.99, DRAM: 0.71 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 5.05, proScore: 3.79, coverage: 0.75,
      price: 517.85, weeklyPrices: [551.63, 519.85, 519.74, 532.57, 517.85], weeklyChange: -6.12, dayChange: -2.76, sortRank: 0, periodReturns: { '1M': 2.8, 'YTD': 141.8, '6M': 140.9, '1Y': 260.4 },
      priceHistory: { '1D': [532.57, 513.63, 512.19, 520.7, 519.76, 521.97, 516.9, 516.44, 513.08, 517, 517.05, 518.36, 519.16, 518.65, 519.11, 519.18, 520.77, 521.63, 519.46, 523.68, 522.45, 519.24, 519.43, 517.85], '1W': [551.63, 519.85, 519.74, 532.57, 517.85], '1M': [503.89, 495.54, 518.09, 516.1, 510.13, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 537.37, 551.63, 519.85, 519.74, 532.57, 517.85], 'YTD': [214.16, 204.68, 227.92, 259.68, 252.18, 192.5, 205.94, 200.15, 200.21, 192.43, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 305.33, 354.49, 408.46, 449.7, 449.59, 516.1, 523.2, 488.45, 537.37, 517.85], '6M': [214.99, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 204.83, 199.46, 220.27, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 518.09, 523.2, 488.45, 537.37, 517.85], '1Y': [143.68, 137.91, 146.42, 156.99, 166.47, 171.7, 172.76, 180.95, 163.71, 168.58, 151.14, 158.57, 157.39, 159.46, 164.67, 214.9, 233.08, 252.92, 256.12, 233.54, 247.96, 206.02, 217.53, 217.97, 210.78, 213.43, 215.61, 214.35, 220.97, 249.8, 252.74, 200.19, 213.57, 200.12, 210.86, 202.07, 204.83, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 354.49, 408.46, 445.5, 447.58, 518.09, 523.2, 488.45, 537.37, 517.85] },
      velocityScore: { '1D': -0.3, '1W': -14.4, '1M': -34.9, '6M': null }, isNew: false,
      marketCap: '$844B', pe: 173.8, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 7.6, PSI: 4.96, XSD: 2.59, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.67, proScore: 3.5, coverage: 0.75,
      price: 127.5, weeklyPrices: [140.94, 132.28, 131.65, 132.87, 127.50], weeklyChange: -9.54, dayChange: -4.04, sortRank: 0, periodReturns: { '1M': 3.2, 'YTD': 245.5, '6M': 252.2, '1Y': 466.7 },
      priceHistory: { '1D': [132.87, 126.41, 127.46, 130.88, 129.78, 129.67, 129.23, 129.01, 127.88, 128.9, 128.9, 128.3, 129.03, 128.52, 129.25, 128.51, 129.35, 129.94, 128.9, 129.19, 129, 128.3, 128.24, 127.5], '1W': [140.94, 132.28, 131.65, 132.87, 127.5], '1M': [123.52, 121.77, 120.89, 114.68, 109.33, 112.71, 111.78, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 133.99, 140.94, 132.28, 131.65, 132.87, 127.5], 'YTD': [36.9, 41.11, 48.32, 45.07, 48.66, 48.24, 46.48, 44.11, 45.61, 43.42, 45.25, 46.18, 44.1, 50.38, 62.38, 68.5, 66.78, 94.48, 109.62, 115.93, 118.5, 114.68, 111.78, 116.96, 133.99, 127.5], '6M': [36.2, 39.37, 44.06, 48.56, 43.93, 49.25, 47.13, 45.46, 46.88, 45.58, 47.98, 45.03, 47.18, 44.13, 58.95, 64.94, 65.27, 94.75, 113.01, 120.29, 118.96, 120.89, 111.78, 116.96, 133.99, 127.5], '1Y': [22.5, 22.49, 23.43, 23.1, 20.7, 19.31, 19.95, 23.86, 23.5, 24.93, 24.49, 24.08, 29.58, 35.5, 36.83, 36.37, 37.01, 38.28, 39.99, 38.13, 35.91, 33.62, 40.56, 41.41, 37.81, 36.82, 36.68, 40.04, 47.29, 54.25, 48.78, 48.6, 47.13, 45.46, 46.88, 45.58, 47.98, 45.03, 47.18, 48.03, 61.72, 68.5, 66.78, 94.48, 109.62, 120.29, 118.96, 120.89, 111.78, 116.96, 133.99, 127.5] },
      velocityScore: { '1D': -1.4, '1W': -5.7, '1M': -4.6, '6M': null }, isNew: false,
      marketCap: '$641B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 6.17, PSI: 5.12, XSD: 2.73, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 4.48, proScore: 3.36, coverage: 0.75,
      price: 194.28, weeklyPrices: [208.65, 200.04, 199.00, 195.74, 194.28], weeklyChange: -6.89, dayChange: -0.75, sortRank: 0, periodReturns: { '1M': -9.6, 'YTD': 4.2, '6M': 2, '1Y': 25.3 },
      priceHistory: { '1D': [195.74, 193.07, 193.39, 193.84, 193.6, 193.75, 192.88, 193.1, 192.68, 193.35, 195.09, 194.74, 194.12, 193.77, 194.17, 194.37, 194.19, 194.72, 194.29, 195.21, 194.87, 194.59, 195.1, 194.28], '1W': [208.65, 200.04, 199, 195.74, 194.28], '1M': [214.86, 212.6, 214.25, 211.14, 224.36, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 210.69, 208.65, 200.04, 199, 195.74, 194.28], 'YTD': [186.5, 185.04, 187.05, 187.67, 192.51, 171.88, 186.94, 189.82, 177.19, 177.82, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 199.64, 199.57, 211.5, 235.74, 219.51, 211.14, 218.66, 204.87, 210.69, 194.28], '6M': [190.53, 188.12, 184.94, 178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 186.03, 180.4, 178.68, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 223.47, 214.25, 218.66, 204.87, 210.69, 194.28], '1Y': [155.02, 159.34, 164.92, 172.41, 173.5, 173.72, 182.7, 182.02, 174.98, 180.17, 167.02, 177.82, 176.67, 178.19, 187.62, 183.16, 183.22, 186.26, 202.49, 188.15, 186.86, 180.64, 177, 182.41, 175.02, 180.99, 188.22, 187.24, 185.81, 183.32, 191.52, 174.19, 188.54, 187.98, 195.56, 183.04, 186.03, 180.4, 178.68, 175.75, 183.91, 198.35, 199.64, 199.57, 211.5, 225.83, 223.47, 214.25, 218.66, 204.87, 210.69, 194.28] },
      velocityScore: { '1D': -3.2, '1W': 14.7, '1M': 4.7, '6M': null }, isNew: false,
      marketCap: '$4.7T', pe: 29.7, revenueGrowth: 85, eps: 6.54, grossMargin: 74, dividendYield: 0.51,
      etfPresence: { SOXX: 6.83, PSI: 4.46, XSD: 2.14, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.59, proScore: 2.69, coverage: 0.75,
      price: 383.12, weeklyPrices: [445.48, 407.26, 413.16, 417.93, 383.12], weeklyChange: -14, dayChange: -8.33, sortRank: 0, periodReturns: { '1M': -8.8, 'YTD': 41.3, '6M': 38.4, '1Y': 61.4 },
      priceHistory: { '1D': [417.93, 399.33, 396.29, 396.96, 393.17, 391.16, 390, 391.24, 388.63, 390.1, 389.01, 388.79, 387.87, 385.84, 385.36, 386.92, 388.17, 388.14, 386.36, 387.7, 385.99, 384.31, 384.43, 383.12], '1W': [445.48, 407.26, 413.16, 417.93, 383.12], '1M': [419.94, 416.88, 419.01, 413.85, 402.69, 437.67, 428.76, 401.39, 403.89, 404.62, 392.67, 412.13, 417.79, 427.58, 416, 434.46, 445.48, 407.26, 413.16, 417.93, 383.12], 'YTD': [271.2, 299.16, 302.1, 305.6, 318.7, 322.12, 331.36, 355.03, 355.79, 315.81, 307.27, 310.44, 313.42, 318.34, 350.14, 371.45, 403.88, 402.26, 408.52, 426.79, 384.21, 413.85, 428.76, 412.13, 434.46, 383.12], '6M': [276.84, 277.29, 293.86, 295.67, 303.83, 311.29, 325.16, 346.37, 360.8, 341.51, 319.22, 308.59, 322.03, 318.14, 346.21, 347.94, 381.42, 389.31, 415.63, 432.39, 398.05, 419.01, 428.76, 412.13, 434.46, 383.12], '1Y': [237.3, 245.68, 244.68, 241.85, 227.82, 221.71, 223.95, 236.21, 246.95, 254.25, 247.07, 245.21, 245.33, 247.56, 241.99, 225.32, 242.87, 238.01, 234.13, 228.48, 237.53, 225.2, 265.34, 281.29, 279.32, 274.44, 275.63, 292.94, 296.21, 304.97, 317.63, 320.44, 325.16, 346.37, 360.8, 341.51, 319.22, 308.59, 322.03, 320.58, 351.36, 353.8, 403.88, 402.26, 408.52, 432.39, 398.05, 419.01, 428.76, 412.13, 434.46, 383.12] },
      velocityScore: { '1D': -1.1, '1W': 13, '1M': null, '6M': null }, isNew: false,
      marketCap: '$187B', pe: 56.9, revenueGrowth: 37, eps: 6.73, grossMargin: 64, dividendYield: 1.05,
      etfPresence: { SOXX: 3.72, PSI: 4.73, XSD: 2.33, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.6% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 5.84, proScore: 2.92, coverage: 0.5,
      price: 642.01, weeklyPrices: [640.18, 585.88, 588.97, 668.00, 642.01], weeklyChange: 0.29, dayChange: -3.89, sortRank: 0, periodReturns: { '1M': 41.1, 'YTD': 149.8, '6M': 145.1, '1Y': 249.8 },
      priceHistory: { '1D': [668, 629.78, 632.54, 646.95, 644.54, 645.96, 638.59, 637.29, 632.91, 638.37, 647.23, 642.32, 643.2, 641.21, 644.26, 647.04, 653.83, 659.36, 651.43, 653.61, 648.01, 648.63, 645.23, 642.01], '1W': [640.18, 585.88, 588.97, 668, 642.01], '1M': [454.89, 448.25, 449.68, 450.06, 458.17, 500.77, 501.7, 453.01, 492.17, 499.21, 497.01, 552.64, 567.25, 585.78, 568.23, 617.11, 640.18, 585.88, 588.97, 668, 642.01], 'YTD': [256.99, 281.64, 319.08, 322.38, 341.34, 303.99, 328.39, 375.38, 372.3, 324.74, 337.27, 357.21, 338.55, 348.47, 399.49, 396.94, 403.91, 394.49, 410.64, 440.56, 427.36, 450.06, 501.7, 552.64, 617.11, 642.01], '6M': [261.9, 284.32, 307.24, 318.23, 332.71, 318.67, 329.07, 369.3, 394.95, 357.76, 351.07, 349.47, 369.34, 341.79, 385.72, 394.26, 403.48, 382.59, 428.62, 436.61, 426.85, 449.68, 501.7, 552.64, 617.11, 642.01], '1Y': [183.52, 191.05, 197.93, 190.44, 185.69, 179.99, 184.87, 188.24, 159.84, 165.27, 162.75, 167.8, 190.1, 203.92, 217.53, 209.95, 224.99, 228.75, 233.1, 230.07, 223.23, 220.23, 252.25, 268, 259.21, 256.41, 263.05, 296.01, 304.87, 325.24, 336.75, 297.6, 329.07, 369.3, 394.95, 357.76, 351.07, 349.47, 369.34, 353.8, 397.81, 389.9, 403.91, 394.49, 410.64, 436.61, 426.85, 449.68, 501.7, 552.64, 617.11, 642.01] },
      velocityScore: { '1D': 4.3, '1W': -1.7, '1M': 0, '6M': null }, isNew: false,
      marketCap: '$510B', pe: 60.5, revenueGrowth: 11, eps: 10.62, grossMargin: 49, dividendYield: 0.32,
      etfPresence: { SOXX: 5.47, PSI: 6.22, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 5.35, proScore: 2.67, coverage: 0.5,
      price: 245.48, weeklyPrices: [269.16, 244.49, 240.48, 258.80, 245.48], weeklyChange: -8.8, dayChange: -5.15, sortRank: 0, periodReturns: { '1M': 22, 'YTD': 102, '6M': 91.8, '1Y': 171.9 },
      priceHistory: { '1D': [258.8, 246.63, 245.91, 249.19, 247.99, 248.94, 246.69, 247.13, 244.05, 246.26, 247.75, 245.71, 245.59, 244.99, 246.12, 246.82, 247.62, 248.88, 247.75, 247.73, 246.49, 246.43, 245.87, 245.48], '1W': [269.16, 244.49, 240.48, 258.8, 245.48], '1M': [201.14, 195.72, 192.76, 192.17, 194, 212.51, 213.11, 192.92, 210.81, 213.94, 213.56, 241.16, 254.54, 256.42, 237.33, 259.56, 269.16, 244.49, 240.48, 258.8, 245.48], 'YTD': [121.51, 132.46, 154.5, 151.28, 168.47, 133.1, 145.09, 149.6, 152.46, 134.46, 140.96, 151.15, 145.11, 151.68, 173.73, 179.14, 181.54, 175.04, 176.32, 189.29, 184.22, 192.17, 213.11, 241.16, 259.56, 245.48], '6M': [127.96, 135.24, 142.82, 148.62, 161.63, 135.55, 143.08, 148.03, 154.67, 147.59, 146.5, 148.24, 154.38, 147.24, 167.23, 174.81, 181.21, 181.62, 181.63, 184.97, 182.95, 192.76, 213.11, 241.16, 259.56, 245.48], '1Y': [90.29, 92.46, 92.46, 93.11, 90.21, 88.66, 91.48, 95.54, 87.24, 89.4, 90.51, 96.4, 104.48, 106.43, 110.15, 98.28, 110.67, 118.28, 120.87, 119.34, 116.17, 110.25, 117.55, 121.45, 119.39, 124.57, 126.04, 139.5, 144.18, 152, 162.72, 130.72, 143.08, 148.03, 154.67, 147.59, 146.5, 148.24, 154.38, 151.98, 172.73, 173.49, 181.54, 175.04, 176.32, 184.97, 182.95, 192.76, 213.11, 241.16, 259.56, 245.48] },
      velocityScore: { '1D': 1.5, '1W': 13.6, '1M': 1.5, '6M': null }, isNew: false,
      marketCap: '$321B', pe: 69.7, revenueGrowth: 12, eps: 3.52, grossMargin: 61, dividendYield: 0.36,
      etfPresence: { SOXX: 4.96, PSI: 5.74, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 5.12, proScore: 2.56, coverage: 0.5,
      price: 379.41, weeklyPrices: [409.54, 371.33, 374.80, 401.82, 379.41], weeklyChange: -7.36, dayChange: -5.58, sortRank: 0, periodReturns: { '1M': 17.6, 'YTD': 121.6, '6M': 113.1, '1Y': 291.8 },
      priceHistory: { '1D': [401.82, 379.27, 378.68, 388.6, 384.55, 383.23, 380.37, 380.8, 377.01, 380.02, 382.18, 379.79, 379.34, 377.92, 378.65, 379.47, 382.37, 385.58, 383.35, 383.79, 382.76, 381.51, 380.76, 379.41], '1W': [409.54, 371.33, 374.8, 401.82, 379.41], '1M': [322.68, 318.93, 318, 318.18, 317.12, 343.71, 336.41, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81, 388.92, 369.34, 389.04, 409.54, 371.33, 374.8, 401.82, 379.41], 'YTD': [171.18, 200.96, 217.47, 217.94, 248.17, 213.31, 231.29, 244.92, 233.89, 199.33, 209.49, 233.99, 211.62, 218.44, 263.66, 267.6, 258.56, 257.86, 286.52, 299.15, 302.24, 318.18, 336.41, 362.52, 389.04, 379.41], '6M': [178.07, 194.76, 220.4, 222.41, 238.46, 230.1, 226.61, 240.09, 249.48, 222.99, 218.87, 224.71, 233.45, 213.66, 246.49, 265.16, 265.55, 248.75, 297.17, 295.44, 292.09, 318, 336.41, 362.52, 389.04, 379.41], '1Y': [96.84, 98.81, 101.73, 100.66, 96.96, 96.37, 101.75, 107.38, 98.41, 104.09, 102.95, 116.96, 126.92, 128.33, 145.81, 131.37, 141.51, 151.68, 157.46, 159.35, 153.32, 139.59, 156, 158.7, 160.52, 172.27, 175.87, 206.96, 214.38, 228.39, 239.58, 209.78, 226.61, 240.09, 249.48, 222.99, 218.87, 224.71, 233.45, 222.01, 258.76, 260.96, 258.56, 257.86, 286.52, 295.44, 292.09, 318, 336.41, 362.52, 389.04, 379.41] },
      velocityScore: { '1D': 1.6, '1W': 9.4, '1M': -3.8, '6M': null }, isNew: false,
      marketCap: '$474B', pe: 71.6, revenueGrowth: 24, eps: 5.3, grossMargin: 50, dividendYield: 0.26,
      etfPresence: { SOXX: 4.65, PSI: 5.59, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 4.24, proScore: 2.12, coverage: 0.5,
      price: 369.14, weeklyPrices: [392.13, 380.15, 382.07, 378.91, 369.14], weeklyChange: -5.86, dayChange: -2.58, sortRank: 0, periodReturns: { '1M': -12.5, 'YTD': 6.7, '6M': 4.8, '1Y': 36.6 },
      priceHistory: { '1D': [378.91, 367.33, 367.73, 369.48, 369.28, 368.19, 366.05, 366.16, 366, 369.23, 371.79, 372.51, 370.38, 371.9, 370.95, 372.24, 371.69, 373.37, 371.14, 371.95, 371.4, 370.67, 370.78, 369.14], '1W': [392.13, 380.15, 382.07, 378.91, 369.14], '1M': [422.01, 421.86, 426.58, 446.77, 459.97, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 411.35, 392.13, 380.15, 382.07, 378.91, 369.14], 'YTD': [346.1, 332.48, 343.02, 320.05, 330.73, 310.51, 331.17, 332.65, 319.55, 330.48, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 419.94, 417.43, 412.56, 439.79, 414.57, 446.77, 418.91, 385.57, 411.35, 369.14], '6M': [352.13, 343.42, 352.21, 332.6, 332.79, 320.33, 340.44, 333.51, 332.31, 317.53, 341.57, 315.93, 318.81, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 417.76, 426.58, 418.91, 385.57, 411.35, 369.14], '1Y': [270.17, 275.18, 274.38, 283.34, 290.18, 288.64, 304.97, 311.23, 289.6, 308.65, 334.89, 359.87, 344.94, 334.53, 338.37, 324.63, 349.33, 354.13, 369.63, 349.43, 339.98, 346.82, 402.96, 390.24, 359.93, 340.36, 349.39, 343.77, 354.61, 328.8, 333.24, 308.05, 340.44, 333.51, 332.31, 317.53, 341.57, 315.93, 318.81, 313.49, 354.91, 398.47, 419.94, 417.43, 412.56, 416.79, 417.76, 426.58, 418.91, 385.57, 411.35, 369.14] },
      velocityScore: { '1D': -3.6, '1W': 12.8, '1M': -40.4, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 61.3, revenueGrowth: 48, eps: 6.02, grossMargin: 76, dividendYield: 0.69,
      etfPresence: { SOXX: 6.25, PSI: false, XSD: 2.23, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 3.75, proScore: 1.87, coverage: 0.5,
      price: 264.72, weeklyPrices: [307.86, 279.04, 276.70, 281.26, 264.72], weeklyChange: -14.01, dayChange: -5.88, sortRank: 0, periodReturns: { '1M': 27.1, 'YTD': 211.5, '6M': 206.6, '1Y': 231 },
      priceHistory: { '1D': [281.26, 267.01, 269.21, 272.49, 270.48, 268.47, 267.01, 267.14, 262.93, 265.34, 267.36, 267.51, 268.83, 268.2, 268.5, 267.83, 266.37, 268.81, 266.47, 267.84, 267.61, 266.59, 265.81, 264.72], '1W': [307.86, 279.04, 276.7, 281.26, 264.72], '1M': [208.26, 198.7, 204.83, 205, 219.43, 301.65, 316.43, 263.47, 288.85, 266.88, 252.59, 280.71, 279.7, 308.88, 278.67, 310.58, 307.86, 279.04, 276.7, 281.26, 264.72], 'YTD': [84.98, 83.45, 80.38, 80.23, 81.34, 74.21, 78.23, 79.48, 81.69, 89.57, 87.67, 89.53, 97.68, 107.11, 128.49, 139.69, 165.56, 165.15, 160.01, 182.58, 190.69, 205, 316.43, 280.71, 310.58, 264.72], '6M': [86.34, 90.23, 82.89, 79.8, 82.93, 75.54, 82.01, 79.09, 80.92, 78.09, 90.44, 87.62, 98.45, 99.05, 114.45, 134.6, 157.32, 156.57, 172.15, 177.95, 186.8, 204.83, 316.43, 280.71, 310.58, 264.72], '1Y': [79.97, 75.18, 72.71, 74.65, 74.21, 74.45, 77.34, 79.04, 71.21, 77.23, 63.33, 67.35, 74.26, 83.17, 86.22, 85.61, 87.95, 84.13, 93.74, 90.92, 87.52, 76.68, 89.4, 98.91, 84.43, 84.09, 85.76, 88.23, 83.05, 82.55, 83.62, 73.73, 82.01, 79.09, 80.92, 78.09, 90.44, 87.62, 98.45, 106.71, 119.93, 133.37, 165.56, 165.15, 160.01, 177.95, 186.8, 204.83, 316.43, 280.71, 310.58, 264.72] },
      velocityScore: { '1D': -1.6, '1W': -43.3, '1M': -44.8, '6M': null }, isNew: false,
      marketCap: '$232B', pe: 91.3, revenueGrowth: 28, eps: 2.9, grossMargin: 52, dividendYield: 0.09,
      etfPresence: { SOXX: 5.05, PSI: false, XSD: 2.45, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 3.09, proScore: 1.54, coverage: 0.5,
      price: 293.5, weeklyPrices: [332.28, 304.36, 303.11, 311.81, 293.50], weeklyChange: -11.67, dayChange: -5.87, sortRank: 0, periodReturns: { '1M': -9.7, 'YTD': 69.2, '6M': 65.9, '1Y': 42.3 },
      priceHistory: { '1D': [311.81, 303.9, 302.38, 304.33, 302.21, 303.18, 302.15, 302.92, 301.68, 303.39, 301.89, 299.52, 298.68, 296.65, 296.96, 297.38, 297.48, 297.99, 296.53, 297.24, 294.81, 294.78, 294.04, 293.5], '1W': [332.28, 304.36, 303.11, 311.81, 293.5], '1M': [324.89, 317.45, 315.95, 305.68, 293.2, 308.59, 305.37, 285.06, 290.9, 288.63, 282.01, 297.1, 301.12, 313.34, 305.71, 322.86, 332.28, 304.36, 303.11, 311.81, 293.5], 'YTD': [173.49, 188.45, 189.12, 193.31, 218.97, 223.98, 223, 219.73, 212.11, 193.23, 190.05, 188.29, 193.41, 194.87, 214.73, 229.82, 282.23, 281.08, 285.24, 308.17, 298.39, 305.68, 305.37, 297.1, 322.86, 293.5], '6M': [176.88, 177.17, 189.07, 189.59, 196.63, 225.21, 220.92, 223.32, 213.9, 202.39, 198.67, 190.78, 196.77, 194.14, 208.9, 216.29, 236.31, 269.22, 289.44, 306.34, 304.88, 315.95, 305.37, 297.1, 322.86, 293.5], '1Y': [206.31, 216.02, 221.25, 216.62, 184.99, 180.86, 187.22, 193.71, 200.71, 204.09, 187.93, 182.6, 179.37, 184.55, 180.32, 171.7, 176.58, 169.13, 161.46, 160.55, 162.23, 153.33, 168.27, 182.54, 179.42, 176.29, 175.69, 192.1, 188.53, 194.41, 216.17, 222.92, 220.92, 223.32, 213.9, 202.39, 198.67, 190.78, 196.77, 196.3, 214.98, 223.1, 282.23, 281.08, 285.24, 306.34, 304.88, 315.95, 305.37, 297.1, 322.86, 293.5] },
      velocityScore: { '1D': 0, '1W': 8.5, '1M': -51, '6M': null }, isNew: false,
      marketCap: '$267B', pe: 50.1, revenueGrowth: 19, eps: 5.86, grossMargin: 57, dividendYield: 1.82,
      etfPresence: { SOXX: 3.76, PSI: false, XSD: 2.42, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.85, proScore: 1.43, coverage: 0.5,
      price: 278.11, weeklyPrices: [323.24, 299.94, 294.06, 298.64, 278.11], weeklyChange: -13.96, dayChange: -6.87, sortRank: 0, periodReturns: { '1M': -16.4, 'YTD': 28.1, '6M': 24.8, '1Y': 27.4 },
      priceHistory: { '1D': [298.64, 290.59, 286.48, 287.82, 284.9, 284.2, 282.4, 283.29, 281.83, 283.73, 285.02, 282.1, 282.41, 280.92, 280.23, 281.88, 282.35, 281.41, 279.16, 279.82, 279.33, 278.67, 278.6, 278.11], '1W': [323.24, 299.94, 294.06, 298.64, 278.11], '1M': [332.67, 329.24, 330.28, 321.35, 311.38, 321.88, 322.22, 295.96, 301.14, 297.41, 285.56, 302.55, 304.86, 315.88, 302.89, 313.27, 323.24, 299.94, 294.06, 298.64, 278.11], 'YTD': [217.06, 237.89, 238.6, 232.48, 233.5, 222.13, 242.19, 232.27, 227.01, 201.74, 191.22, 192.35, 196.92, 194.55, 204.37, 216.03, 241.16, 293.59, 290.22, 294.17, 299.38, 321.35, 322.22, 302.55, 313.27, 278.11], '6M': [222.87, 223.88, 238.33, 230.7, 229.42, 220.66, 236.62, 237.33, 235.07, 216.37, 199.87, 192.69, 197.61, 196.86, 204.27, 209.39, 225.75, 289.25, 303.55, 298.41, 310.15, 330.28, 322.22, 302.55, 313.27, 278.11], '1Y': [218.3, 232.1, 228.92, 225.9, 223.29, 209.92, 207.16, 231.54, 223.93, 239.07, 226.74, 218.82, 224.05, 226.04, 228.89, 205.37, 214.35, 219.16, 209.12, 204.56, 201.22, 184.19, 194.94, 227.95, 228.16, 226.27, 220.46, 245.95, 239.09, 233.72, 240.03, 226.86, 236.62, 237.33, 235.07, 216.37, 199.87, 192.69, 197.61, 195.58, 205.67, 213.73, 241.16, 293.59, 290.22, 298.41, 310.15, 330.28, 322.22, 302.55, 313.27, 278.11] },
      velocityScore: { '1D': -1.4, '1W': 6.7, '1M': -32.5, '6M': null }, isNew: false,
      marketCap: '$70B', pe: 26.6, revenueGrowth: 12, eps: 10.45, grossMargin: 56, dividendYield: 1.36,
      etfPresence: { SOXX: 3.42, PSI: false, XSD: 2.29, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 2.68, proScore: 1.34, coverage: 0.5,
      price: 196.4, weeklyPrices: [221.90, 204.13, 197.41, 204.90, 196.40], weeklyChange: -11.49, dayChange: -4.15, sortRank: 0, periodReturns: { '1M': -21.1, 'YTD': 14.8, '6M': 12.4, '1Y': 24.2 },
      priceHistory: { '1D': [204.9, 204.93, 206.13, 206.97, 204.76, 205.7, 205.15, 204.6, 202.13, 204.15, 203.66, 201.46, 200.12, 199.44, 197.9, 198.47, 198.73, 198.56, 198.21, 199.03, 198.32, 196.99, 197.11, 196.4], '1W': [221.9, 204.13, 197.41, 204.9, 196.4], '1M': [248.82, 233.4, 243.29, 251.02, 228.99, 250.01, 242.57, 215.94, 217.77, 205.42, 191.2, 202.96, 211.72, 220.81, 214.07, 226.11, 221.9, 204.13, 197.41, 204.9, 196.4], 'YTD': [171.05, 181.87, 161.39, 155.82, 152.22, 136.3, 138.47, 142.88, 142.36, 135.69, 131.15, 131.28, 130.54, 126.8, 128.06, 136.2, 133.95, 179.58, 202.55, 200.08, 213.41, 251.02, 242.57, 202.96, 226.11, 196.4], '6M': [174.81, 176.31, 169.27, 154.07, 153.04, 147.18, 140.09, 143.24, 145.82, 139.51, 134.12, 130.47, 130.35, 128.78, 127.51, 133.05, 136.07, 156, 192.57, 213.17, 202.51, 243.29, 242.57, 202.96, 226.11, 196.4], '1Y': [158.19, 162.21, 157.46, 154.8, 158.4, 148.19, 147.56, 158.09, 154.13, 160.8, 159.84, 161.83, 166.85, 169.2, 169.18, 153.59, 163.45, 168.94, 180.9, 170.89, 174.5, 159.59, 168.09, 174.81, 178.29, 175.25, 173.43, 182.45, 165.29, 156.37, 152.7, 148.89, 140.09, 143.24, 145.82, 139.51, 134.12, 130.47, 130.35, 127.28, 127.75, 134.47, 133.95, 179.58, 202.55, 213.17, 202.51, 243.29, 242.57, 202.96, 226.11, 196.4] },
      velocityScore: { '1D': 0.8, '1W': -9.5, '1M': -45.5, '6M': null }, isNew: false,
      marketCap: '$207B', pe: 21.1, revenueGrowth: -4, eps: 9.3, grossMargin: 55, dividendYield: 1.8,
      etfPresence: { SOXX: 3.01, PSI: false, XSD: 2.35, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.63, proScore: 1.31, coverage: 0.5,
      price: 1340.11, weeklyPrices: [1537.88, 1423.76, 1434.95, 1438.30, 1340.11], weeklyChange: -12.86, dayChange: -6.83, sortRank: 0, periodReturns: { '1M': -19.4, 'YTD': 47.9, '6M': 41.6, '1Y': 82.3 },
      priceHistory: { '1D': [1438.3, 1332.19, 1314.62, 1332.02, 1318.9, 1321.9, 1317.32, 1325.23, 1324.67, 1331.16, 1343.59, 1339.95, 1333.64, 1327.91, 1334.92, 1341.32, 1353.21, 1356.61, 1346.91, 1347.27, 1346.13, 1344.08, 1344.6, 1340.11], '1W': [1537.88, 1423.76, 1434.95, 1438.3, 1340.11], '1M': [1662.98, 1620.17, 1633.17, 1566.21, 1542.39, 1689.89, 1652.6, 1481.05, 1559.18, 1531.98, 1473.04, 1589.55, 1577.32, 1652.29, 1498.77, 1563.7, 1537.88, 1423.76, 1434.95, 1438.3, 1340.11], 'YTD': [906.36, 959.09, 1009.54, 1063.74, 1183.15, 1155.99, 1155.93, 1204.1, 1142.74, 1023.16, 1033.88, 1092.69, 1058.28, 1118.49, 1353.85, 1468.35, 1592.17, 1614.41, 1575.96, 1613.97, 1561.25, 1566.21, 1652.6, 1589.55, 1563.7, 1340.11], '6M': [946.32, 955.03, 967.16, 1034.49, 1095.49, 1164.83, 1142.02, 1188.32, 1231.95, 1099.02, 1071.09, 1075.29, 1118.66, 1093.35, 1312.94, 1353, 1522.04, 1526.84, 1652.35, 1650.35, 1553.27, 1633.17, 1652.6, 1589.55, 1563.7, 1340.11], '1Y': [735.17, 758.64, 736.06, 725.24, 714.68, 785.62, 804.29, 848.81, 820.74, 858.46, 865.86, 834.14, 916.36, 887.55, 918.83, 904.44, 1004.65, 1074.91, 1005, 958.26, 924.29, 857.19, 928.17, 963.28, 946.51, 937.11, 930.04, 1005.38, 983.28, 1074.93, 1161.78, 1136.83, 1142.02, 1188.32, 1231.95, 1099.02, 1071.09, 1075.29, 1118.66, 1119.51, 1334.21, 1402.81, 1592.17, 1614.41, 1575.96, 1650.35, 1553.27, 1633.17, 1652.6, 1589.55, 1563.7, 1340.11] },
      velocityScore: { '1D': -3, '1W': 4, '1M': -36.1, '6M': null }, isNew: false,
      marketCap: '$66B', pe: 96.1, revenueGrowth: 26, eps: 13.95, grossMargin: 55, dividendYield: 0.56,
      etfPresence: { SOXX: 3.12, PSI: false, XSD: 2.14, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 2.6, proScore: 1.3, coverage: 0.5,
      price: 390.92, weeklyPrices: [439.66, 397.02, 399.92, 398.00, 390.92], weeklyChange: -11.09, dayChange: -1.78, sortRank: 0, periodReturns: { '1M': 22.7, 'YTD': 135, '6M': 133.7, '1Y': 299.1 },
      priceHistory: { '1D': [398, 381.41, 379.47, 387.81, 381.11, 383.5, 375.58, 379, 374.87, 378.43, 379.6, 380.05, 379.45, 379.45, 382.05, 385.25, 390.39, 394.21, 391, 393, 392.83, 390.11, 392.54, 390.92], '1W': [439.66, 397.02, 399.92, 398, 390.92], '1M': [318.72, 325.33, 349.17, 342.85, 320.09, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 361.71, 417.07, 439.66, 397.02, 399.92, 398, 390.92], 'YTD': [166.36, 156.73, 174.45, 169.66, 160.46, 142.82, 126.58, 129.68, 118.83, 119.2, 119.9, 126.16, 113.61, 117.14, 149.05, 174.05, 197.54, 194.74, 195.65, 228.64, 297.84, 342.85, 358.05, 367.47, 417.07, 390.92], '6M': [167.26, 167.11, 172.57, 183.75, 170.93, 158.52, 182.86, 129.58, 128.15, 113.77, 124.71, 126.34, 120.33, 109.6, 125.46, 172.09, 194.06, 196.85, 213.91, 224.09, 287.48, 349.17, 358.05, 367.47, 417.07, 390.92], '1Y': [97.96, 90.8, 95.9, 102.13, 122.23, 131.1, 179.28, 190.69, 177.53, 189.15, 191.2, 229.5, 245.2, 197.78, 200.74, 206.21, 159.8, 164.97, 186.68, 165.49, 144.47, 139.29, 157.57, 161.23, 148.85, 164.4, 170.1, 161.01, 180.56, 176.01, 167.9, 144.67, 182.86, 129.58, 128.15, 113.77, 124.71, 126.34, 120.33, 106.33, 129.46, 170.81, 197.54, 194.74, 195.65, 224.09, 287.48, 349.17, 358.05, 367.47, 417.07, 390.92] },
      velocityScore: { '1D': -3, '1W': -26.6, '1M': -37.5, '6M': null }, isNew: false,
      marketCap: '$67B', pe: 265.9, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.55, PSI: false, XSD: 2.64, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.32, proScore: 1.16, coverage: 0.5,
      price: 87.07, weeklyPrices: [102.71, 93.26, 92.48, 94.12, 87.07], weeklyChange: -15.23, dayChange: -7.49, sortRank: 0, periodReturns: { '1M': -11.2, 'YTD': 36.6, '6M': 34.1, '1Y': 23 },
      priceHistory: { '1D': [94.12, 90.47, 89.7, 90.5, 89.3, 89.27, 88.68, 88.89, 88.21, 88.86, 88.62, 87.92, 87.79, 87.48, 87.22, 87.6, 87.89, 88.11, 87.56, 87.75, 87.52, 87.38, 87.33, 87.07], '1W': [102.71, 93.26, 92.48, 94.12, 87.07], '1M': [98.05, 96.85, 96.04, 94.65, 91.52, 96.55, 96.3, 88.34, 91.37, 91.47, 87.91, 92.94, 95.24, 100.32, 95.63, 99.77, 102.71, 93.26, 92.48, 94.12, 87.07], 'YTD': [63.72, 73.53, 74.45, 74.71, 79.36, 78.04, 78.92, 77.73, 74.64, 64.77, 62.73, 63.29, 64.2, 65.6, 71.56, 78.76, 90.64, 92.91, 101.58, 97.04, 91.11, 94.65, 96.3, 92.94, 99.77, 87.07], '6M': [64.94, 67.06, 73.39, 73.17, 75.16, 76.66, 76.86, 79.11, 75.47, 69.9, 65.79, 64.71, 65.16, 64.61, 70.73, 74.49, 82.48, 90.17, 102.92, 96.71, 94.02, 96.04, 96.3, 92.94, 99.77, 87.07], '1Y': [70.78, 73.06, 74.56, 74.78, 69.21, 66.36, 61.87, 65.99, 66.1, 65.25, 65.92, 64.7, 65.15, 64.42, 66.54, 60.41, 65.14, 63.17, 62.42, 56.28, 54.81, 49.02, 53.58, 65.81, 67.18, 64.91, 64.65, 74.87, 74.07, 76.2, 80.28, 78.23, 76.86, 79.11, 75.47, 69.9, 65.79, 64.71, 65.16, 65.38, 71.22, 76.87, 90.64, 92.91, 101.58, 96.71, 94.02, 96.04, 96.3, 92.94, 99.77, 87.07] },
      velocityScore: { '1D': -0.9, '1W': 0.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$47B', pe: 395.8, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 1.93,
      etfPresence: { SOXX: 2.29, PSI: false, XSD: 2.35, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.25, proScore: 1.13, coverage: 0.5,
      price: 254.13, weeklyPrices: [302.52, 272.01, 268.99, 268.03, 254.13], weeklyChange: -16, dayChange: -5.19, sortRank: 0, periodReturns: { '1M': 14.7, 'YTD': 76.6, '6M': 75.5, '1Y': 167.4 },
      priceHistory: { '1D': [268.03, 251.71, 254.46, 259.36, 256.24, 255.52, 251.35, 252.38, 249.59, 250.45, 254.58, 253.07, 251.85, 251.99, 252.94, 252.42, 255.26, 256.86, 255.09, 256.27, 256, 255.6, 254.37, 254.13], '1W': [302.52, 272.01, 268.99, 268.03, 254.13], '1M': [221.64, 221.23, 222.35, 236.03, 226.1, 214.6, 217.5, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81, 259.41, 239.18, 271.83, 302.52, 272.01, 268.99, 268.03, 254.13], 'YTD': [143.89, 141.59, 149.12, 133.16, 129.47, 98.06, 121.78, 124.06, 112.27, 109.83, 111.57, 107.09, 96.44, 101.45, 119.59, 160.69, 185.54, 174.01, 188.29, 184.54, 193.39, 236.03, 217.5, 264.76, 271.83, 254.13], '6M': [144.83, 140.24, 156.07, 153.22, 129.57, 111.31, 134.72, 127.91, 123.46, 102.54, 115.91, 101.72, 103.91, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 189.36, 182.98, 222.35, 217.5, 264.76, 271.83, 254.13], '1Y': [95.05, 93.61, 98.52, 93.47, 101.22, 107.56, 120.41, 117.33, 110.86, 131.82, 140.82, 161.99, 169.56, 142.93, 143.87, 138.83, 143.61, 155.55, 187.62, 163.61, 142.95, 134.73, 177.6, 176.04, 143.91, 150.13, 144.7, 132.95, 161.38, 139.16, 129.66, 96.95, 134.72, 127.91, 123.46, 102.54, 115.91, 101.72, 103.91, 95.92, 107.93, 158.93, 185.54, 174.01, 188.29, 189.36, 182.98, 222.35, 217.5, 264.76, 271.83, 254.13] },
      velocityScore: { '1D': -2.6, '1W': -13.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$47B', pe: 100.8, revenueGrowth: 157, eps: 2.52, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 2.03, PSI: false, XSD: 2.48, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 2.24, proScore: 1.12, coverage: 0.5,
      price: 89.67, weeklyPrices: [131.55, 117.06, 115.74, 118.74, 89.67], weeklyChange: -31.83, dayChange: -24.48, sortRank: 0, periodReturns: { '1M': -29.4, 'YTD': 65.6, '6M': 63.3, '1Y': 67.1 },
      priceHistory: { '1D': [118.74, 96.09, 95.46, 96.32, 94.9, 94.6, 93.73, 93.89, 92.6, 93.5, 93.9, 92.71, 92.63, 92.07, 91.61, 91.65, 91.43, 91.75, 90.98, 91.01, 90.7, 90.32, 90.09, 89.67], '1W': [131.55, 117.06, 115.74, 118.74, 89.67], '1M': [127, 124.89, 123.77, 120.62, 120.92, 133.93, 131.82, 117.26, 120.9, 117, 110.17, 115.96, 116.79, 125.9, 118.25, 121.62, 131.55, 117.06, 115.74, 118.74, 89.67], 'YTD': [54.15, 60.89, 60.28, 61.98, 62.2, 63.1, 70.63, 69.11, 66.48, 56.87, 57.69, 59.29, 60.87, 62.19, 68.65, 83.01, 97.78, 100.81, 100.61, 118.37, 109.61, 120.62, 131.82, 115.96, 121.62, 89.67], '6M': [54.93, 58.69, 58.75, 60.06, 62.63, 59.43, 67.38, 70.66, 69.68, 62.53, 59.24, 60.46, 63.1, 61.92, 68.38, 72.43, 88.99, 98.86, 105.77, 115.71, 110.21, 123.77, 131.82, 115.96, 121.62, 89.67], '1Y': [53.65, 56.6, 59.73, 60.72, 56.92, 56.82, 47.66, 51.62, 48.81, 50.78, 49.11, 48.26, 51.07, 50.16, 49.27, 45.74, 52.53, 50.71, 50.08, 47.83, 48.13, 44.9, 50.24, 54.74, 54.96, 55.21, 54.02, 61.76, 59.41, 63.13, 64.93, 62.06, 67.38, 70.66, 69.68, 62.53, 59.24, 60.46, 63.1, 62.2, 68.49, 79.93, 97.78, 100.81, 100.61, 115.71, 110.21, 123.77, 131.82, 115.96, 121.62, 89.67] },
      velocityScore: { '1D': 0, '1W': -11.1, '1M': -43.4, '6M': null }, isNew: false,
      marketCap: '$35B', pe: 65.5, revenueGrowth: 5, eps: 1.37, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 2.12, PSI: false, XSD: 2.36, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 2, avgWeight: 1.82, proScore: 0.91, coverage: 0.5,
      price: 366.83, weeklyPrices: [396.26, 372.15, 373.08, 390.19, 366.83], weeklyChange: -7.43, dayChange: -5.99, sortRank: 0, periodReturns: { '1M': -10.5, 'YTD': 114.2, '6M': 109.6, '1Y': 157.9 },
      priceHistory: { '1D': [390.19, 371.55, 371.36, 376.99, 371.9, 371.77, 369.25, 368.48, 366.78, 365.52, 366.72, 364.85, 362.87, 363.45, 363.65, 364.93, 365.94, 368.51, 368.1, 370.56, 367.89, 368.3, 369.04, 366.83], '1W': [396.26, 372.15, 373.08, 390.19, 366.83], '1M': [409.68, 400.66, 391.09, 364.64, 353.79, 390.34, 382.74, 345.4, 361.86, 358.72, 354.4, 374.76, 379.87, 384.77, 368.32, 391.41, 396.26, 372.15, 373.08, 390.19, 366.83], 'YTD': [171.28, 167.66, 218.93, 219.26, 227.73, 227.8, 238.99, 243.59, 248.12, 207.51, 215.94, 224.54, 228.5, 238.3, 258.11, 276.97, 284.4, 281.61, 344.47, 383.56, 380.45, 364.64, 382.74, 374.76, 391.41, 366.83], '6M': [175.01, 170.76, 197.55, 221.7, 219.2, 226.71, 230.54, 246.76, 253.37, 239, 222.55, 218.89, 245.04, 222.07, 247, 261.16, 277, 269.63, 309.81, 381.55, 375.71, 391.09, 382.74, 374.76, 391.41, 366.83], '1Y': [142.23, 140.68, 136.2, 142.11, 137.67, 136.31, 120.94, 125.4, 123.58, 133.89, 129.86, 131.87, 127.12, 129.39, 127.41, 122.18, 136.82, 140.85, 148.13, 170.03, 162.24, 155.39, 174.99, 184.1, 177.35, 174.42, 173.71, 171.77, 213.52, 226.25, 226.25, 215.03, 230.54, 246.76, 253.37, 239, 222.55, 218.89, 245.04, 229.36, 247.71, 261.42, 284.4, 281.61, 344.47, 381.55, 375.71, 391.09, 382.74, 374.76, 391.41, 366.83] },
      velocityScore: { '1D': 2.2, '1W': -2.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$28B', pe: 156.8, revenueGrowth: 23, eps: 2.34, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: 1.23, PSI: false, XSD: 2.41, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SWKS', name: 'SKYWORKS SOLUTIONS INC', easyScore: 2, avgWeight: 1.33, proScore: 0.66, coverage: 0.5,
      price: 67.81, weeklyPrices: [76.18, 73.44, 71.40, 69.94, 67.81], weeklyChange: -10.99, dayChange: -3.05, sortRank: 0, periodReturns: { '1M': -18.7, 'YTD': 6.9, '6M': 5.6, '1Y': -9.2 },
      priceHistory: { '1D': [69.94, 68.74, 68.57, 68.89, 67.89, 67.57, 67.22, 67.11, 66.93, 67.41, 67.44, 67.32, 67.51, 67.5, 67.35, 67.69, 68.1, 68.16, 67.88, 68.17, 68.02, 67.9, 68.11, 67.81], '1W': [76.18, 73.44, 71.4, 69.94, 67.81], '1M': [83.42, 78.68, 81.41, 77.85, 75.49, 80.66, 79.93, 73.57, 75.37, 73.56, 70.29, 72.73, 73.97, 76.26, 71.42, 72.45, 76.18, 73.44, 71.4, 69.94, 67.81], 'YTD': [63.41, 60.66, 58.46, 58.96, 55.79, 60.92, 60.73, 60.05, 59.58, 54.81, 55.2, 54.12, 56.66, 55.19, 56.36, 58.99, 61.55, 70.17, 65.04, 67.06, 73.54, 77.85, 79.93, 72.73, 72.45, 67.81], '6M': [64.21, 65.16, 58.85, 57.41, 60.05, 55.93, 62.31, 62, 59.82, 56.28, 55.35, 53.58, 56.19, 53.55, 56.54, 57.93, 61.77, 62.66, 64.97, 68.14, 74.35, 81.41, 79.93, 72.73, 72.45, 67.81], '1Y': [74.65, 78.76, 75.42, 72.77, 71.53, 67.69, 71.08, 75.36, 74.52, 75.1, 75.2, 74.46, 78.95, 79.51, 77.1, 69.16, 75.32, 74.04, 77.72, 69.58, 68.17, 60.5, 65.95, 69.32, 66.97, 64.68, 64.02, 66.27, 58.5, 58.55, 55.28, 59, 62.31, 62, 59.82, 56.28, 55.35, 53.58, 56.19, 53.22, 56.56, 58.7, 61.55, 70.17, 65.04, 68.14, 74.35, 81.41, 79.93, 72.73, 72.45, 67.81] },
      velocityScore: { '1D': -4.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 28.3, revenueGrowth: -1, eps: 2.4, grossMargin: 41, dividendYield: 4.06,
      etfPresence: { SOXX: 0.48, PSI: false, XSD: 2.18, DRAM: false },
      tonyNote: 'SKYWORKS SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 10, avgWeight: 5.57, proScore: 3.27, coverage: 0.588,
      price: 194.28, weeklyPrices: [208.65, 200.04, 199.00, 195.74, 194.28], weeklyChange: -6.89, dayChange: -0.75, sortRank: 0, periodReturns: { '1M': -9.6, 'YTD': 4.2, '6M': 2, '1Y': 25.3 },
      priceHistory: { '1D': [195.74, 193.07, 193.39, 193.84, 193.6, 193.75, 192.88, 193.1, 192.68, 193.35, 195.09, 194.74, 194.12, 193.77, 194.17, 194.37, 194.19, 194.72, 194.29, 195.21, 194.87, 194.59, 195.1, 194.28], '1W': [208.65, 200.04, 199, 195.74, 194.28], '1M': [214.86, 212.6, 214.25, 211.14, 224.36, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 210.69, 208.65, 200.04, 199, 195.74, 194.28], 'YTD': [186.5, 185.04, 187.05, 187.67, 192.51, 171.88, 186.94, 189.82, 177.19, 177.82, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 199.64, 199.57, 211.5, 235.74, 219.51, 211.14, 218.66, 204.87, 210.69, 194.28], '6M': [190.53, 188.12, 184.94, 178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 186.03, 180.4, 178.68, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 223.47, 214.25, 218.66, 204.87, 210.69, 194.28], '1Y': [155.02, 159.34, 164.92, 172.41, 173.5, 173.72, 182.7, 182.02, 174.98, 180.17, 167.02, 177.82, 176.67, 178.19, 187.62, 183.16, 183.22, 186.26, 202.49, 188.15, 186.86, 180.64, 177, 182.41, 175.02, 180.99, 188.22, 187.24, 185.81, 183.32, 191.52, 174.19, 188.54, 187.98, 195.56, 183.04, 186.03, 180.4, 178.68, 175.75, 183.91, 198.35, 199.64, 199.57, 211.5, 225.83, 223.47, 214.25, 218.66, 204.87, 210.69, 194.28] },
      velocityScore: { '1D': -1.2, '1W': 49.3, '1M': -31.6, '6M': null }, isNew: false,
      marketCap: '$4.7T', pe: 29.7, revenueGrowth: 85, eps: 6.54, grossMargin: 74, dividendYield: 0.51,
      etfPresence: { PTF: 4.24, WCLD: false, IGV: false, FDTX: 4.62, GTEK: false, ARKK: 1.62, MARS: false, FRWD: 8.23, BCTK: 5.96, FWD: 1.86, CBSE: false, FCUS: false, WGMI: 1.87, CNEQ: 13.28, SGRT: 6.21, SPMO: 7.78, XMMO: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 5.73, proScore: 3.03, coverage: 0.529,
      price: 1148.44, weeklyPrices: [1211.38, 1051.77, 1048.51, 1213.56, 1148.44], weeklyChange: -5.2, dayChange: -5.37, sortRank: 0, periodReturns: { '1M': 28.2, 'YTD': 302.4, '6M': 303.3, '1Y': 811.5 },
      priceHistory: { '1D': [1213.56, 1144.96, 1148.87, 1192.91, 1176, 1174.57, 1163.56, 1162.42, 1154.62, 1161.92, 1173.44, 1164.51, 1165.24, 1168.26, 1185.4, 1181.86, 1179.43, 1186.09, 1177.83, 1172.64, 1168.23, 1159.21, 1152.07, 1148.44], '1W': [1211.38, 1051.77, 1048.51, 1213.56, 1148.44], '1M': [895.88, 928.41, 923.52, 971, 1035.5, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1148.44], 'YTD': [285.41, 327.02, 336.63, 399.65, 435.79, 382.89, 413.97, 428.17, 412.37, 370.3, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 481.72, 517.16, 646.63, 776.01, 762.1, 971, 996, 995.87, 1133.99, 1148.44], '6M': [284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 418.69, 461.73, 382.09, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 923.52, 996, 995.87, 1133.99, 1148.44], '1Y': [126, 122.29, 124.53, 114.39, 111.26, 104.88, 118.89, 125.29, 115.79, 122, 131.37, 157.23, 162.73, 157.27, 187.83, 181.6, 202.38, 219.02, 223.77, 237.92, 236.95, 201.37, 236.48, 237.22, 241.14, 265.92, 294.37, 343.43, 338.13, 389.11, 435.28, 379.4, 373.25, 420.95, 429, 400.77, 418.69, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 517.16, 646.63, 803.63, 731.99, 923.52, 996, 995.87, 1133.99, 1148.44] },
      velocityScore: { '1D': 1.7, '1W': 30, '1M': 17.9, '6M': null }, isNew: false,
      marketCap: '$1.3T', pe: 25.9, revenueGrowth: 346, eps: 44.29, grossMargin: 73, dividendYield: 0.04,
      etfPresence: { PTF: 5.12, WCLD: false, IGV: false, FDTX: 9.36, GTEK: false, ARKK: false, MARS: false, FRWD: 5.05, BCTK: 4.62, FWD: 1.62, CBSE: false, FCUS: 4.85, WGMI: false, CNEQ: 1.21, SGRT: 8.41, SPMO: 11.31, XMMO: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 8, avgWeight: 3.64, proScore: 1.71, coverage: 0.471,
      price: 517.85, weeklyPrices: [551.63, 519.85, 519.74, 532.57, 517.85], weeklyChange: -6.12, dayChange: -2.76, sortRank: 0, periodReturns: { '1M': 2.8, 'YTD': 141.8, '6M': 140.9, '1Y': 260.4 },
      priceHistory: { '1D': [532.57, 513.63, 512.19, 520.7, 519.76, 521.97, 516.9, 516.44, 513.08, 517, 517.05, 518.36, 519.16, 518.65, 519.11, 519.18, 520.77, 521.63, 519.46, 523.68, 522.45, 519.24, 519.43, 517.85], '1W': [551.63, 519.85, 519.74, 532.57, 517.85], '1M': [503.89, 495.54, 518.09, 516.1, 510.13, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 537.37, 551.63, 519.85, 519.74, 532.57, 517.85], 'YTD': [214.16, 204.68, 227.92, 259.68, 252.18, 192.5, 205.94, 200.15, 200.21, 192.43, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 305.33, 354.49, 408.46, 449.7, 449.59, 516.1, 523.2, 488.45, 537.37, 517.85], '6M': [214.99, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 204.83, 199.46, 220.27, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 518.09, 523.2, 488.45, 537.37, 517.85], '1Y': [143.68, 137.91, 146.42, 156.99, 166.47, 171.7, 172.76, 180.95, 163.71, 168.58, 151.14, 158.57, 157.39, 159.46, 164.67, 214.9, 233.08, 252.92, 256.12, 233.54, 247.96, 206.02, 217.53, 217.97, 210.78, 213.43, 215.61, 214.35, 220.97, 249.8, 252.74, 200.19, 213.57, 200.12, 210.86, 202.07, 204.83, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 354.49, 408.46, 445.5, 447.58, 518.09, 523.2, 488.45, 537.37, 517.85] },
      velocityScore: { '1D': 3, '1W': 8.9, '1M': -43.2, '6M': null }, isNew: false,
      marketCap: '$844B', pe: 173.8, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.82, MARS: false, FRWD: 7.08, BCTK: 3.32, FWD: 2.15, CBSE: false, FCUS: 3.38, WGMI: false, CNEQ: 0.63, SGRT: 3.64, SPMO: 4.07, XMMO: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 7, avgWeight: 5.48, proScore: 2.26, coverage: 0.412,
      price: 585.24, weeklyPrices: [732.62, 670.75, 643.83, 675.39, 585.24], weeklyChange: -20.12, dayChange: -13.35, sortRank: 0, periodReturns: { '1M': 11.5, 'YTD': 239.7, '6M': 222.4, '1Y': 821.5 },
      priceHistory: { '1D': [675.39, 623.1, 619.02, 624.74, 617.99, 616.97, 615.4, 614.77, 605.33, 605.16, 605.83, 602.12, 604.28, 603.44, 604.25, 602.25, 597.42, 598.99, 594.26, 593.31, 596.89, 592.87, 588, 585.24], '1W': [732.62, 670.75, 643.83, 675.39, 585.24], '1M': [524.65, 530.6, 531.18, 531.21, 546.2, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 746.23, 732.62, 670.75, 643.83, 675.39, 585.24], 'YTD': [172.27, 187.68, 222.1, 236.39, 278.41, 260.19, 284.1, 285.52, 279.7, 245.25, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 403.12, 434.52, 463.91, 489.15, 486.46, 531.21, 575.5, 529.29, 746.23, 585.24], '6M': [181.54, 187.88, 212.14, 222.97, 252.66, 290.24, 262.56, 296.56, 290.95, 261.3, 268.81, 304.9, 296.14, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 459.62, 531.18, 575.5, 529.29, 746.23, 585.24], '1Y': [63.51, 66.08, 66.14, 68, 68.82, 76.55, 74.97, 76.24, 74.66, 82.04, 92.04, 97.66, 106.63, 106.88, 131.31, 115.42, 126.2, 129.43, 150.21, 162.96, 157.16, 140.23, 163.33, 168.89, 176.34, 181.08, 179.68, 219.38, 214, 241.9, 279.7, 269.41, 262.56, 296.56, 290.95, 261.3, 268.81, 304.9, 296.14, 297.73, 337.88, 361.69, 403.12, 434.52, 463.91, 494.09, 459.62, 531.18, 575.5, 529.29, 746.23, 585.24] },
      velocityScore: { '1D': -0.9, '1W': 49.7, '1M': 3.2, '6M': null }, isNew: false,
      marketCap: '$202B', pe: 35.1, revenueGrowth: 46, eps: 16.68, grossMargin: 45, dividendYield: 0.09,
      etfPresence: { PTF: 5.56, WCLD: false, IGV: false, FDTX: 4, GTEK: false, ARKK: false, MARS: false, FRWD: 5.92, BCTK: false, FWD: false, CBSE: false, FCUS: 5.3, WGMI: false, CNEQ: 5.71, SGRT: 9.77, SPMO: 2.09, XMMO: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 7, avgWeight: 4.38, proScore: 1.8, coverage: 0.412,
      price: 431.72, weeklyPrices: [467.67, 436.39, 440.83, 434.99, 431.72], weeklyChange: -7.69, dayChange: -0.75, sortRank: 0, periodReturns: { '1M': 4.7, 'YTD': 42.1, '6M': 42.6, '1Y': 92.7 },
      priceHistory: { '1D': [434.99, 421.34, 420.36, 425.68, 425.14, 425.17, 424.73, 423.23, 422.39, 424.95, 429.14, 428.86, 429.1, 429.84, 431.17, 432.32, 433.05, 434.8, 433.92, 434.95, 435.8, 432.69, 432.85, 431.72], '1W': [467.67, 436.39, 440.83, 434.99, 431.72], '1M': [412.32, 422.73, 424.86, 418.45, 435.63, 436.69, 444.92, 415.17, 426.8, 427.92, 408.75, 421.07, 423.93, 441.4, 425.83, 462.12, 467.67, 436.39, 440.83, 434.99, 431.72], 'YTD': [303.89, 318.01, 341.64, 334.87, 339.55, 330.73, 368.1, 370.54, 374.58, 338.89, 336.71, 338.79, 326.11, 339.04, 370.6, 370.5, 382.66, 396.06, 414.15, 417.72, 407.15, 418.45, 444.92, 421.07, 462.12, 431.72], '6M': [302.84, 322.25, 331.77, 327.16, 338.34, 335.75, 361.91, 362.26, 387.73, 357.44, 354.56, 339.57, 347.75, 337.95, 365.9, 375.1, 387.44, 393.83, 419.5, 399.8, 401.62, 424.86, 444.92, 421.07, 462.12, 431.72], '1Y': [224.01, 234.8, 230.4, 240.4, 245.6, 235.21, 241.83, 241, 227.33, 238.27, 243.41, 259.33, 264.87, 273.36, 292.19, 280.66, 295.08, 294.96, 300.43, 286.5, 282.2, 277.5, 291.51, 294.72, 292.04, 288.95, 300.92, 327.43, 331.21, 326.12, 342.3, 325.74, 361.91, 362.26, 387.73, 357.44, 354.56, 339.57, 347.75, 341.49, 365.49, 363.35, 382.66, 396.06, 414.15, 399.8, 401.62, 424.86, 444.92, 421.07, 462.12, 431.72] },
      velocityScore: { '1D': 0, '1W': -1.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.2T', pe: 37.2, revenueGrowth: 35, eps: 11.61, grossMargin: 62, dividendYield: 0.87,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6, GTEK: false, ARKK: 0.97, MARS: false, FRWD: 5.94, BCTK: 8.81, FWD: false, CBSE: 2.58, FCUS: false, WGMI: 0.57, CNEQ: 5.78, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 7, avgWeight: 3.78, proScore: 1.56, coverage: 0.412,
      price: 369.14, weeklyPrices: [392.13, 380.15, 382.07, 378.91, 369.14], weeklyChange: -5.86, dayChange: -2.58, sortRank: 0, periodReturns: { '1M': -12.5, 'YTD': 6.7, '6M': 4.8, '1Y': 36.6 },
      priceHistory: { '1D': [378.91, 367.33, 367.73, 369.48, 369.28, 368.19, 366.05, 366.16, 366, 369.23, 371.79, 372.51, 370.38, 371.9, 370.95, 372.24, 371.69, 373.37, 371.14, 371.95, 371.4, 370.67, 370.78, 369.14], '1W': [392.13, 380.15, 382.07, 378.91, 369.14], '1M': [422.01, 421.86, 426.58, 446.77, 459.97, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 411.35, 392.13, 380.15, 382.07, 378.91, 369.14], 'YTD': [346.1, 332.48, 343.02, 320.05, 330.73, 310.51, 331.17, 332.65, 319.55, 330.48, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 419.94, 417.43, 412.56, 439.79, 414.57, 446.77, 418.91, 385.57, 411.35, 369.14], '6M': [352.13, 343.42, 352.21, 332.6, 332.79, 320.33, 340.44, 333.51, 332.31, 317.53, 341.57, 315.93, 318.81, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 417.76, 426.58, 418.91, 385.57, 411.35, 369.14], '1Y': [270.17, 275.18, 274.38, 283.34, 290.18, 288.64, 304.97, 311.23, 289.6, 308.65, 334.89, 359.87, 344.94, 334.53, 338.37, 324.63, 349.33, 354.13, 369.63, 349.43, 339.98, 346.82, 402.96, 390.24, 359.93, 340.36, 349.39, 343.77, 354.61, 328.8, 333.24, 308.05, 340.44, 333.51, 332.31, 317.53, 341.57, 315.93, 318.81, 313.49, 354.91, 398.47, 419.94, 417.43, 412.56, 416.79, 417.76, 426.58, 418.91, 385.57, 411.35, 369.14] },
      velocityScore: { '1D': 7.6, '1W': 32.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 61.3, revenueGrowth: 48, eps: 6.02, grossMargin: 76, dividendYield: 0.69,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.79, GTEK: false, ARKK: 1.13, MARS: false, FRWD: 5.09, BCTK: 6.96, FWD: 1.84, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.35, SGRT: false, SPMO: 6.33, XMMO: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 6, avgWeight: 3.39, proScore: 1.2, coverage: 0.353,
      price: 230.86, weeklyPrices: [232.79, 234.11, 234.27, 227.01, 230.86], weeklyChange: -0.83, dayChange: 1.7, sortRank: 0, periodReturns: { '1M': -13, 'YTD': 0, '6M': -0.7, '1Y': 6.3 },
      priceHistory: { '1D': [227.01, 228.34, 226.54, 229.93, 230.6, 230.98, 230.66, 230.55, 231.17, 231.76, 232.32, 232.19, 232.39, 231.96, 231.49, 231.82, 231.96, 231.51, 231.04, 230.34, 230.37, 230.82, 230.55, 230.86], '1W': [232.79, 234.11, 234.27, 227.01, 230.86], '1M': [265.29, 271.85, 274, 270.64, 261.26, 250.02, 253.79, 246.03, 245.22, 244.19, 238, 241.51, 238.55, 246.02, 246, 244.39, 232.79, 234.11, 234.27, 227.01, 230.86], 'YTD': [230.82, 246.29, 238.18, 239.16, 241.73, 222.69, 199.6, 210.11, 210, 213.21, 209.53, 208.76, 207.54, 209.77, 238.38, 250.56, 255.08, 265.06, 271.17, 267.22, 268.46, 270.64, 253.79, 241.51, 244.39, 230.86], '6M': [232.52, 233.06, 246.47, 231, 244.68, 238.62, 206.96, 204.79, 210.64, 216.82, 212.65, 209.87, 211.71, 208.27, 221.25, 248.5, 255.36, 263.04, 274.99, 270.13, 265.01, 274, 253.79, 241.51, 244.39, 230.86], '1Y': [217.12, 223.41, 225.02, 226.13, 231.44, 214.75, 222.69, 230.98, 221.95, 231.6, 232.33, 228.15, 231.48, 219.78, 219.51, 216.37, 213.04, 224.21, 244.22, 244.41, 237.58, 217.14, 233.22, 229.53, 226.19, 227.35, 232.07, 240.93, 242.6, 231.31, 243.01, 232.99, 206.96, 204.79, 210.64, 216.82, 212.65, 209.87, 211.71, 210.57, 233.65, 249.7, 255.08, 265.06, 271.17, 270.13, 265.01, 274, 253.79, 241.51, 244.39, 230.86] },
      velocityScore: { '1D': -1.6, '1W': 4.3, '1M': -71.1, '6M': null }, isNew: false,
      marketCap: '$2.5T', pe: 32.2, revenueGrowth: 17, eps: 7.17, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.01, GTEK: false, ARKK: 2.3, MARS: false, FRWD: 2.8, BCTK: 4.21, FWD: 1.37, CBSE: false, FCUS: false, WGMI: false, CNEQ: 5.66, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'SPCX', name: 'SPACE EXPLORATION TECHN-CL A', easyScore: 5, avgWeight: 8.41, proScore: 2.47, coverage: 0.294,
      price: 153.43, weeklyPrices: [154.60, 156.11, 154.54, 153.00, 153.43], weeklyChange: -0.76, dayChange: 0.28, sortRank: 0, periodReturns: { '1M': -4.7, 'YTD': -4.7, '6M': -4.7, '1Y': -4.7 },
      priceHistory: { '1D': [153, 151.14, 149.55, 152.2, 153.23, 152.28, 152.09, 152.29, 153.2, 154.95, 156.37, 155.82, 156.63, 156.76, 158.27, 156.85, 157.34, 157.75, 156.8, 155.37, 155.45, 155.1, 154.3, 153.43], '1W': [154.6, 156.11, 154.54, 153, 153.43], '1M': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.43], 'YTD': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.43], '6M': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.43], '1Y': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.43] },
      velocityScore: { '1D': -3.5, '1W': -18.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.0T', pe: null, revenueGrowth: 15, eps: -0.67, grossMargin: 49, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.17, MARS: 23.56, FRWD: 2.66, BCTK: 8.33, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.31, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'SPACE EXPLORATION TECHN-CL A appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 8.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 5, avgWeight: 4.98, proScore: 1.46, coverage: 0.294,
      price: 929.2, weeklyPrices: [1094.04, 1038.59, 993.25, 1025.36, 929.20], weeklyChange: -15.07, dayChange: -9.38, sortRank: 0, periodReturns: { '1M': 9.9, 'YTD': 237.4, '6M': 224.6, '1Y': 560.5 },
      priceHistory: { '1D': [1025.36, 974.05, 960.86, 974.1, 966.14, 963.64, 959.52, 961.67, 944.88, 947.57, 950.32, 946.36, 946.09, 941.56, 937.76, 934.53, 936.68, 952.29, 946.69, 941, 945.84, 938.49, 926.43, 929.2], '1W': [1094.04, 1038.59, 993.25, 1025.36, 929.2], '1M': [845.76, 870.66, 880.72, 879.8, 921.26, 940.69, 925.99, 847.47, 876.77, 846.01, 815.99, 868.09, 931.04, 1018.8, 1031.34, 1070.23, 1094.04, 1038.59, 993.25, 1025.36, 929.2], 'YTD': [275.39, 284.47, 320.32, 346.1, 446.57, 405.45, 431.17, 411.11, 407.84, 352.8, 373.98, 434.6, 378.79, 429.36, 503.13, 547.75, 587.62, 673.64, 766.44, 804.76, 810.46, 879.8, 925.99, 868.09, 1070.23, 929.2], '6M': [286.22, 289.83, 321.48, 325.99, 371.76, 444.45, 396.23, 424.14, 421.85, 375.01, 385.97, 406.77, 413.22, 391.76, 496.3, 519.6, 579.88, 643.3, 786.42, 817.35, 751.07, 880.72, 925.99, 868.09, 1070.23, 929.2], '1Y': [140.69, 149.44, 147.18, 149.07, 150.89, 154.81, 150.45, 155.73, 154.6, 172.38, 188.16, 195.99, 221.23, 217.51, 252.79, 214.38, 225.4, 234.12, 255.88, 279.35, 262.56, 240.5, 276.69, 278.79, 287.64, 296.36, 281.3, 330.42, 318.44, 344.22, 442.93, 418.63, 396.23, 424.14, 421.85, 375.01, 385.97, 406.77, 413.22, 423.12, 500.77, 531.81, 587.62, 673.64, 766.44, 817.35, 751.07, 880.72, 925.99, 868.09, 1070.23, 929.2] },
      velocityScore: { '1D': -0.7, '1W': -14.6, '1M': -36, '6M': null }, isNew: false,
      marketCap: '$210B', pe: 88, revenueGrowth: 44, eps: 10.56, grossMargin: 42, dividendYield: 0.29,
      etfPresence: { PTF: 5.24, WCLD: false, IGV: false, FDTX: 4.04, GTEK: false, ARKK: false, MARS: false, FRWD: 8.6, BCTK: false, FWD: false, CBSE: false, FCUS: 4.94, WGMI: false, CNEQ: false, SGRT: false, SPMO: 2.07, XMMO: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 5, avgWeight: 4.07, proScore: 1.2, coverage: 0.294,
      price: 339.86, weeklyPrices: [348.78, 346.08, 345.04, 342.19, 339.86], weeklyChange: -2.56, dayChange: -0.68, sortRank: 0, periodReturns: { '1M': -11.7, 'YTD': 8.3, '6M': 7.9, '1Y': 94.8 },
      priceHistory: { '1D': [342.19, 335.9, 335.27, 335.75, 337.24, 337.55, 338.2, 338.6, 339.29, 340.29, 340.74, 342.7, 343.88, 342.01, 341.38, 339.21, 340.63, 340.86, 340.61, 339.67, 340.48, 340.76, 340.38, 339.86], '1W': [348.78, 346.08, 345.04, 342.19, 339.86], '1M': [384.84, 384.83, 386.12, 376.43, 372.58, 355.68, 369.27, 365.76, 361.17, 362.29, 353.32, 356.56, 358.16, 367.11, 371.1, 367.46, 348.78, 346.08, 345.04, 342.19, 339.86], 'YTD': [313.8, 326.01, 333.16, 328.43, 338.66, 331.33, 309.37, 314.9, 311.43, 298.3, 303.21, 305.73, 280.74, 294.46, 315.72, 339.4, 337.75, 381.94, 395.3, 397.17, 383.47, 376.43, 369.27, 356.56, 367.46, 339.86], '6M': [314.96, 317.32, 332.73, 322.16, 335, 340.7, 318.63, 303.94, 313.03, 303.45, 308.42, 306.3, 289.59, 286.86, 314.74, 334.47, 337.73, 347.31, 395.14, 399.04, 384.9, 386.12, 369.27, 356.56, 367.46, 339.86], '1Y': [174.43, 180.55, 181.31, 185.94, 194.08, 189.95, 202.09, 203.82, 200.62, 212.37, 235.17, 241.38, 255.24, 247.18, 246.45, 237.49, 253.79, 260.51, 281.82, 279.7, 279.12, 289.98, 320.12, 322.09, 310.52, 308.61, 314.39, 314.55, 336.43, 328.38, 336.28, 333.34, 318.63, 303.94, 313.03, 303.45, 308.42, 306.3, 289.59, 294.9, 316.37, 332.77, 337.75, 381.94, 395.3, 399.04, 384.9, 386.12, 369.27, 356.56, 367.46, 339.86] },
      velocityScore: { '1D': 0, '1W': 39.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.1T', pe: 25.9, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.26,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.66, GTEK: false, ARKK: 1.9, MARS: false, FRWD: false, BCTK: 5.68, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 5.68, SGRT: false, SPMO: 3.41, XMMO: false },
      tonyNote: 'Alphabet Inc Class C appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 4.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, avgWeight: 5.2, proScore: 1.22, coverage: 0.235,
      price: 371.21, weeklyPrices: [367.34, 373.94, 365.46, 352.83, 371.21], weeklyChange: 1.05, dayChange: 5.21, sortRank: 0, periodReturns: { '1M': -10.8, 'YTD': -23.2, '6M': -23.9, '1Y': -25.4 },
      priceHistory: { '1D': [352.83, 361.23, 362.82, 364.47, 364.56, 367.21, 367.36, 369.86, 368.96, 369.17, 370.98, 370.72, 369.98, 368.67, 367.98, 369.68, 370.47, 369.97, 369.79, 369.26, 371.16, 370.72, 371.58, 371.21], '1W': [367.34, 373.94, 365.46, 352.83, 371.21], '1M': [416.03, 412.67, 426.99, 450.24, 460.52, 427.34, 428.05, 416.67, 411.74, 403.41, 397.36, 390.34, 390.74, 399.76, 393.83, 379.4, 367.34, 373.94, 365.46, 352.83, 371.21], 'YTD': [483.62, 478.11, 456.66, 465.95, 433.5, 393.67, 401.84, 397.23, 392.74, 408.96, 401.86, 389.02, 365.97, 373.46, 370.87, 422.79, 415.75, 407.78, 420.77, 409.43, 419.09, 450.24, 428.05, 390.34, 379.4, 371.21], '6M': [487.71, 472.85, 477.18, 454.52, 480.58, 411.21, 413.27, 399.6, 400.6, 405.2, 404.88, 391.79, 371.04, 370.17, 374.33, 411.22, 432.92, 424.46, 413.96, 405.21, 421.06, 426.99, 428.05, 390.34, 379.4, 371.21], '1Y': [497.45, 498.84, 503.32, 510.05, 513.71, 524.11, 522.04, 522.48, 504.24, 509.64, 495, 509.9, 517.93, 511.46, 517.35, 510.96, 513.58, 523.61, 517.81, 496.82, 503.29, 478.43, 492.01, 483.16, 478.53, 485.92, 487.1, 478.51, 470.67, 444.11, 481.63, 414.19, 413.27, 399.6, 400.6, 405.2, 404.88, 391.79, 371.04, 369.37, 373.07, 420.26, 415.75, 407.78, 420.77, 405.21, 421.06, 426.99, 428.05, 390.34, 379.4, 371.21] },
      velocityScore: { '1D': -1.6, '1W': 9.9, '1M': -75.5, '6M': null }, isNew: false,
      marketCap: '$2.8T', pe: 22.1, revenueGrowth: 18, eps: 16.79, grossMargin: 68, dividendYield: 1.03,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.14, FDTX: 3.79, GTEK: false, ARKK: false, MARS: false, FRWD: 2.78, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 6.08, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'LRCX', name: 'LRCX', easyScore: 4, avgWeight: 4.78, proScore: 1.12, coverage: 0.235,
      price: 379.41, weeklyPrices: [409.54, 371.33, 374.80, 401.82, 379.41], weeklyChange: -7.36, dayChange: -5.58, sortRank: 0, periodReturns: { '1M': 17.6, 'YTD': 121.6, '6M': 113.1, '1Y': 291.8 },
      priceHistory: { '1D': [401.82, 379.27, 378.68, 388.6, 384.55, 383.23, 380.37, 380.8, 377.01, 380.02, 382.18, 379.79, 379.34, 377.92, 378.65, 379.47, 382.37, 385.58, 383.35, 383.79, 382.76, 381.51, 380.76, 379.41], '1W': [409.54, 371.33, 374.8, 401.82, 379.41], '1M': [322.68, 318.93, 318, 318.18, 317.12, 343.71, 336.41, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81, 388.92, 369.34, 389.04, 409.54, 371.33, 374.8, 401.82, 379.41], 'YTD': [171.18, 200.96, 217.47, 217.94, 248.17, 213.31, 231.29, 244.92, 233.89, 199.33, 209.49, 233.99, 211.62, 218.44, 263.66, 267.6, 258.56, 257.86, 286.52, 299.15, 302.24, 318.18, 336.41, 362.52, 389.04, 379.41], '6M': [178.07, 194.76, 220.4, 222.41, 238.46, 230.1, 226.61, 240.09, 249.48, 222.99, 218.87, 224.71, 233.45, 213.66, 246.49, 265.16, 265.55, 248.75, 297.17, 295.44, 292.09, 318, 336.41, 362.52, 389.04, 379.41], '1Y': [96.84, 98.81, 101.73, 100.66, 96.96, 96.37, 101.75, 107.38, 98.41, 104.09, 102.95, 116.96, 126.92, 128.33, 145.81, 131.37, 141.51, 151.68, 157.46, 159.35, 153.32, 139.59, 156, 158.7, 160.52, 172.27, 175.87, 206.96, 214.38, 228.39, 239.58, 209.78, 226.61, 240.09, 249.48, 222.99, 218.87, 224.71, 233.45, 222.01, 258.76, 260.96, 258.56, 257.86, 286.52, 295.44, 292.09, 318, 336.41, 362.52, 389.04, 379.41] },
      velocityScore: { '1D': -17, '1W': -12.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$474B', pe: 71.6, revenueGrowth: 24, eps: 5.3, grossMargin: 50, dividendYield: 0.26,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.9, BCTK: 8.15, FWD: 2.05, CBSE: 3.01, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 4, avgWeight: 4.57, proScore: 1.07, coverage: 0.235,
      price: 2124.24, weeklyPrices: [2273.73, 1963.60, 1914.46, 2335.00, 2124.24], weeklyChange: -6.57, dayChange: -9.03, sortRank: 0, periodReturns: { '1M': 33.6, 'YTD': 794.9, '6M': 749.5, '1Y': 4377.7 },
      priceHistory: { '1D': [2335, 2156.99, 2164.79, 2242.85, 2217.21, 2214.83, 2196.25, 2182.83, 2153.04, 2148.5, 2179.6, 2158.48, 2154.13, 2145.64, 2166.03, 2172.93, 2166.27, 2178.14, 2164.84, 2163.04, 2157.5, 2144.49, 2135.39, 2124.24], '1W': [2273.73, 1963.6, 1914.46, 2335, 2124.24], '1M': [1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2124.24], 'YTD': [237.38, 334.54, 409.24, 473.83, 539.3, 576.2, 630.29, 649.97, 635.36, 527.33, 618.82, 772.09, 603.17, 701.59, 851.77, 920.99, 932.43, 1096.51, 1339.96, 1382.72, 1542.24, 1694.98, 1759.68, 1881.51, 2184.75, 2124.24], '6M': [250.05, 274.08, 389.27, 453.12, 481.43, 695.51, 541.64, 600.4, 632.38, 599.06, 655.43, 753.69, 677.86, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1447.23, 1392.56, 1641.64, 1759.68, 1881.51, 2184.75, 2124.24], '1Y': [47.44, 46.41, 46.09, 42.19, 42.48, 41.33, 44.34, 46.68, 45.5, 50.87, 68.55, 86.13, 102.21, 97.12, 128.41, 116.91, 140.16, 186.16, 199.33, 239.48, 243.57, 195.96, 223.28, 228.47, 206.18, 237.61, 244.25, 349.63, 389.81, 501.29, 527.63, 584.55, 541.64, 600.4, 632.38, 599.06, 655.43, 753.69, 677.86, 692.73, 851.57, 919.47, 932.43, 1096.51, 1339.96, 1447.23, 1392.56, 1641.64, 1759.68, 1881.51, 2184.75, 2124.24] },
      velocityScore: { '1D': 0, '1W': -7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$315B', pe: 72.8, revenueGrowth: 251, eps: 29.19, grossMargin: 56, dividendYield: null,
      etfPresence: { PTF: 8.55, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.61, CBSE: false, FCUS: 5.4, WGMI: false, CNEQ: false, SGRT: false, SPMO: 2.71, XMMO: false },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'LITE', name: 'Lumentum Holdings Inc', easyScore: 4, avgWeight: 3.87, proScore: 0.91, coverage: 0.235,
      price: 810.92, weeklyPrices: [893.93, 827.92, 842.53, 861.97, 810.92], weeklyChange: -9.29, dayChange: -5.92, sortRank: 0, periodReturns: { '1M': -11, 'YTD': 120, '6M': 107.5, '1Y': 756.2 },
      priceHistory: { '1D': [861.97, 784.45, 782.1, 794.42, 795.9, 793.42, 785.5, 783.27, 777.62, 788.14, 792.58, 790, 796, 794.88, 796.97, 804, 803.92, 819.25, 810.71, 813.23, 815.9, 810, 809.41, 810.92], '1W': [893.93, 827.92, 842.53, 861.97, 810.92], '1M': [910.81, 902.31, 860.62, 854.96, 905, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 850, 893.93, 827.92, 842.53, 861.97, 810.92], 'YTD': [368.59, 348.26, 343.27, 339.19, 381.44, 504.42, 583.46, 667.77, 700.91, 558.44, 616.09, 772.13, 688.8, 826.88, 897.3, 894.07, 846.89, 902.32, 892.58, 1001.81, 964.5, 854.96, 945.08, 889.59, 850, 810.92], '6M': [390.77, 357.05, 339.87, 356.83, 370.66, 435.1, 561.13, 594.26, 723.39, 680.8, 672, 700.81, 777.17, 702.76, 896.02, 824.01, 873.6, 858.32, 944.28, 1030.37, 868.07, 860.62, 945.08, 889.59, 850, 810.92], '1Y': [94.71, 92.75, 92.99, 102.22, 104.52, 106.68, 116.27, 114.62, 117.43, 135.55, 149.46, 163.02, 168.73, 160.75, 163.81, 149.61, 164.77, 179.3, 201.56, 240.11, 226.86, 233.24, 325.16, 331.41, 324.35, 371.43, 372.61, 397.42, 361.33, 362.44, 385, 465.54, 561.13, 594.26, 723.39, 680.8, 672, 700.81, 777.17, 764.65, 894.13, 891.22, 846.89, 902.32, 892.58, 1030.37, 868.07, 860.62, 945.08, 889.59, 850, 810.92] },
      velocityScore: { '1D': 2.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$63B', pe: 142.5, revenueGrowth: 90, eps: 5.69, grossMargin: 41, dividendYield: null,
      etfPresence: { PTF: 3.71, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 1.43, FWD: false, CBSE: false, FCUS: 2.38, WGMI: false, CNEQ: false, SGRT: 7.97, SPMO: false, XMMO: false },
      tonyNote: 'Lumentum Holdings Inc appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRWD', name: 'CrowdStrike', easyScore: 4, avgWeight: 2.96, proScore: 0.7, coverage: 0.235,
      price: 688.75, weeklyPrices: [675.44, 680.92, 673.02, 678.65, 688.75], weeklyChange: 1.97, dayChange: 1.49, sortRank: 0, periodReturns: { '1M': 2.6, 'YTD': 46.9, '6M': 43.1, '1Y': 36.3 },
      priceHistory: { '1D': [678.65, 692.55, 687.3, 693.23, 691.48, 697.53, 691.46, 689.27, 687.7, 692.57, 700.3, 701.85, 699.73, 698.2, 692.99, 695.85, 695.08, 695.66, 692.85, 692.62, 693.02, 691.06, 693.6, 688.75], '1W': [675.44, 680.92, 673.02, 678.65, 688.75], '1M': [671.55, 645.36, 671, 731, 782.17, 747.61, 719.09, 671.02, 658.79, 644.93, 647.74, 691.53, 682.8, 692.91, 679.49, 684.86, 675.44, 680.92, 673.02, 678.65, 688.75], 'YTD': [468.76, 463.87, 455, 452.49, 444.62, 377.16, 411.54, 388.6, 371.98, 428.99, 441.54, 428.18, 392.62, 399.12, 379.02, 423.95, 445.39, 445.75, 505.72, 579.95, 648.23, 731, 719.09, 691.53, 684.86, 688.75], '6M': [481.19, 456.55, 466.99, 442.73, 476.66, 421.73, 413.39, 415.76, 363.31, 407.68, 442.03, 435.81, 385.86, 390.41, 426.51, 411.16, 466.68, 452.38, 468.07, 562.57, 650.11, 671, 719.09, 691.53, 684.86, 688.75], '1Y': [505.22, 514.1, 478.45, 475.96, 467.92, 446.66, 424.49, 424.86, 414.06, 442, 417.63, 436.1, 502.55, 481.42, 489.88, 493.66, 484.65, 527.32, 543.01, 539.81, 529.78, 501.31, 509.16, 512.03, 504.78, 481.28, 475.91, 458.32, 468.02, 445.88, 469.19, 415.36, 413.39, 415.76, 363.31, 407.68, 442.03, 435.81, 385.86, 393.31, 394.68, 418.2, 445.39, 445.75, 505.72, 562.57, 650.11, 671, 719.09, 691.53, 684.86, 688.75] },
      velocityScore: { '1D': 1.4, '1W': -9.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$175B', pe: null, revenueGrowth: 26, eps: -0.14, grossMargin: 75, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.55, IGV: 6.9, FDTX: 1.24, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 1.15, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'CrowdStrike appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SHOP', name: 'Shopify Inc Registered Shs -A- Subord Vtg', easyScore: 4, avgWeight: 2.92, proScore: 0.69, coverage: 0.235,
      price: 116.44, weeklyPrices: [107.98, 107.68, 114.17, 111.62, 116.44], weeklyChange: 7.83, dayChange: 4.31, sortRank: 0, periodReturns: { '1M': 11, 'YTD': -27.7, '6M': -31.8, '1Y': 3 },
      priceHistory: { '1D': [111.62, 114.76, 112.42, 113.5, 113.83, 116.16, 114.85, 115.03, 115.75, 116.57, 117.42, 117.49, 117.13, 117.32, 117.33, 116.35, 116.61, 116.99, 116.81, 116.39, 116.36, 116.4, 116.43, 116.44], '1W': [107.98, 107.68, 114.17, 111.62, 116.44], '1M': [104.9, 106.6, 115.03, 118.71, 124.12, 112.94, 116.04, 109.54, 110.78, 110.42, 108.2, 110.47, 108.24, 112.49, 113.23, 108.85, 107.98, 107.68, 114.17, 111.62, 116.44], 'YTD': [160.97, 168.28, 157.99, 137.89, 143.64, 111.24, 110.66, 126.2, 120.73, 130.2, 126.17, 122.37, 115.43, 118.25, 110.79, 131.15, 124.23, 121.13, 111.74, 97.42, 104.86, 118.71, 116.04, 110.47, 108.85, 116.44], '6M': [170.83, 166.21, 167.93, 144.5, 137.5, 119.29, 127.24, 121.64, 120.31, 129.65, 129.52, 123.75, 118.42, 118.62, 120.1, 127.41, 131.96, 121.26, 105.44, 95.4, 105.01, 115.03, 116.04, 110.47, 108.85, 116.44], '1Y': [113.07, 116.52, 112.11, 127.07, 124.43, 118.6, 149.61, 144.27, 136.68, 141.54, 146.82, 143.38, 153.3, 140.25, 161.14, 151.02, 157.76, 172.95, 173.86, 152.41, 146.34, 144.56, 158.64, 161.08, 164.19, 169.57, 167.88, 168.45, 167.44, 138.54, 138.92, 114.02, 127.24, 121.64, 120.31, 129.65, 129.52, 123.75, 118.42, 118.52, 112.38, 126.94, 124.23, 121.13, 111.74, 95.4, 105.01, 115.03, 116.04, 110.47, 108.85, 116.44] },
      velocityScore: { '1D': 1.5, '1W': -21.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$151B', pe: 114.2, revenueGrowth: 34, eps: 1.02, grossMargin: 48, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.89, GTEK: false, ARKK: 4.31, MARS: false, FRWD: 1.79, BCTK: 2.71, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Shopify Inc Registered Shs -A- Subord Vtg appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC-CL A', easyScore: 4, avgWeight: 2.44, proScore: 0.57, coverage: 0.235,
      price: 341.06, weeklyPrices: [349.68, 346.13, 345.29, 343.71, 341.06], weeklyChange: -2.46, dayChange: -0.77, sortRank: 0, periodReturns: { '1M': -12.3, 'YTD': 9, '6M': 8.8, '1Y': 96.5 },
      priceHistory: { '1D': [343.71, 338.36, 337.64, 338.15, 339.5, 339.8, 340.51, 340.94, 341.61, 342.47, 343.01, 344.44, 346.1, 344.61, 343.44, 342.64, 341.98, 342.29, 342.37, 341.2, 341.1, 341.6, 341.37, 341.06], '1W': [349.68, 346.13, 345.29, 343.71, 341.06], '1M': [388.88, 388.83, 390.13, 380.34, 376.37, 358.99, 372.19, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68, 369.35, 373.25, 368.03, 349.68, 346.13, 345.29, 343.71, 341.06], 'YTD': [313, 325.44, 332.78, 327.93, 338.25, 331.25, 309, 314.98, 311.76, 298.52, 303.55, 307.13, 280.92, 295.77, 317.24, 341.68, 338.89, 384.8, 397.99, 401.07, 387.66, 380.34, 372.19, 357.77, 368.03, 341.06], '6M': [313.51, 316.54, 331.86, 322, 334.55, 339.71, 318.58, 303.33, 312.9, 303.13, 308.7, 307.69, 290.93, 287.56, 317.32, 337.12, 339.32, 349.94, 398.04, 402.62, 388.91, 390.13, 372.19, 357.77, 368.03, 341.06], '1Y': [173.54, 179.53, 180.19, 185.06, 193.18, 189.13, 201.42, 202.94, 199.75, 211.64, 235, 240.8, 254.72, 246.54, 245.35, 236.57, 253.3, 259.92, 281.19, 278.83, 278.57, 289.45, 320.18, 321.27, 309.29, 307.16, 313.56, 314.34, 335.97, 328.38, 336.01, 333.04, 318.58, 303.33, 312.9, 303.13, 308.7, 307.69, 290.93, 297.39, 318.49, 336.02, 338.89, 384.8, 397.99, 402.62, 388.91, 390.13, 372.19, 357.77, 368.03, 341.06] },
      velocityScore: { '1D': -1.7, '1W': null, '1M': -86, '6M': null }, isNew: false,
      marketCap: '$4.2T', pe: 26, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.26,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 0.49, MARS: false, FRWD: 3.19, BCTK: false, FWD: 1.81, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 4.26, XMMO: false },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'KLAC', name: 'KLAC', easyScore: 4, avgWeight: 2.01, proScore: 0.47, coverage: 0.235,
      price: 245.48, weeklyPrices: [269.16, 244.49, 240.48, 258.80, 245.48], weeklyChange: -8.8, dayChange: -5.15, sortRank: 0, periodReturns: { '1M': 22, 'YTD': 102, '6M': 91.8, '1Y': 171.9 },
      priceHistory: { '1D': [258.8, 246.63, 245.91, 249.19, 247.99, 248.94, 246.69, 247.13, 244.05, 246.26, 247.75, 245.71, 245.59, 244.99, 246.12, 246.82, 247.62, 248.88, 247.75, 247.73, 246.49, 246.43, 245.87, 245.48], '1W': [269.16, 244.49, 240.48, 258.8, 245.48], '1M': [201.14, 195.72, 192.76, 192.17, 194, 212.51, 213.11, 192.92, 210.81, 213.94, 213.56, 241.16, 254.54, 256.42, 237.33, 259.56, 269.16, 244.49, 240.48, 258.8, 245.48], 'YTD': [121.51, 132.46, 154.5, 151.28, 168.47, 133.1, 145.09, 149.6, 152.46, 134.46, 140.96, 151.15, 145.11, 151.68, 173.73, 179.14, 181.54, 175.04, 176.32, 189.29, 184.22, 192.17, 213.11, 241.16, 259.56, 245.48], '6M': [127.96, 135.24, 142.82, 148.62, 161.63, 135.55, 143.08, 148.03, 154.67, 147.59, 146.5, 148.24, 154.38, 147.24, 167.23, 174.81, 181.21, 181.62, 181.63, 184.97, 182.95, 192.76, 213.11, 241.16, 259.56, 245.48], '1Y': [90.29, 92.46, 92.46, 93.11, 90.21, 88.66, 91.48, 95.54, 87.24, 89.4, 90.51, 96.4, 104.48, 106.43, 110.15, 98.28, 110.67, 118.28, 120.87, 119.34, 116.17, 110.25, 117.55, 121.45, 119.39, 124.57, 126.04, 139.5, 144.18, 152, 162.72, 130.72, 143.08, 148.03, 154.67, 147.59, 146.5, 148.24, 154.38, 151.98, 172.73, 173.49, 181.54, 175.04, 176.32, 184.97, 182.95, 192.76, 213.11, 241.16, 259.56, 245.48] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$321B', pe: 69.7, revenueGrowth: 12, eps: 3.52, grossMargin: 61, dividendYield: 0.36,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: 1.66, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.82, CBSE: 2.86, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.7, XMMO: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks', easyScore: 3, avgWeight: 5.34, proScore: 0.94, coverage: 0.176,
      price: 298.42, weeklyPrices: [286.40, 290.92, 285.26, 293.09, 298.42], weeklyChange: 4.2, dayChange: 1.82, sortRank: 0, periodReturns: { '1M': 16.2, 'YTD': 62, '6M': 58.4, '1Y': 47.5 },
      priceHistory: { '1D': [293.09, 296.58, 294.79, 297.45, 297.19, 298.54, 297.34, 296.5, 296.25, 297.86, 299.82, 300.39, 300.48, 299.95, 298.51, 299.98, 300.21, 300.34, 298.98, 298.74, 298.4, 298.23, 299.24, 298.42], '1W': [286.4, 290.92, 285.26, 293.09, 298.42], '1M': [256.75, 248.47, 257.77, 281.69, 300.48, 280.43, 279.25, 272.05, 266.33, 260.52, 263.22, 279.53, 279.62, 284.54, 279.9, 287.78, 286.4, 290.92, 285.26, 293.09, 298.42], 'YTD': [184.2, 190.8, 187.73, 180.18, 176.2, 154.77, 162.81, 148.7, 148.92, 165.05, 168.12, 169.74, 156.36, 163.21, 155.73, 167.85, 173.21, 179.32, 196.53, 238.21, 252.92, 281.69, 279.25, 279.53, 287.78, 298.42], '6M': [188.45, 182.12, 188.88, 184.06, 183.5, 166.24, 165.51, 152.35, 144.84, 158.56, 164.93, 168.91, 153.22, 160.32, 173.78, 164.11, 181.2, 181.54, 183.68, 227.79, 246.66, 257.77, 279.25, 279.53, 287.78, 298.42], '1Y': [202.34, 201.82, 187.39, 195.78, 203.27, 172.88, 167.06, 173.55, 183.32, 191.02, 194.46, 196.29, 208.19, 202.37, 207.19, 208.55, 207.89, 217.11, 220.24, 212.29, 204.77, 185.07, 190.13, 198.84, 191.69, 186.88, 186.85, 185.86, 190.85, 181.47, 183.74, 166.72, 165.51, 152.35, 144.84, 158.56, 164.93, 168.91, 153.22, 160.67, 166.99, 166.97, 173.21, 179.32, 196.53, 227.79, 246.66, 257.77, 279.25, 279.53, 287.78, 298.42] },
      velocityScore: { '1D': -4.1, '1W': -18.3, '1M': -56.5, '6M': null }, isNew: false,
      marketCap: '$243B', pe: 261.8, revenueGrowth: 31, eps: 1.14, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.84, IGV: 9.5, FDTX: 3.67, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 3, avgWeight: 5.2, proScore: 0.92, coverage: 0.176,
      price: 383.06, weeklyPrices: [405.05, 381.61, 375.53, 375.12, 383.06], weeklyChange: -5.43, dayChange: 2.12, sortRank: 0, periodReturns: { '1M': -11.7, 'YTD': -14.8, '6M': -19.4, '1Y': 17.6 },
      priceHistory: { '1D': [375.12, 373.31, 373.04, 376.26, 375.63, 377.29, 378.46, 378.2, 379.78, 384.05, 386.8, 385, 385.6, 383.42, 385.2, 384.66, 385.43, 386.21, 385.3, 385.71, 385.77, 384.48, 383.57, 383.06], '1W': [405.05, 381.61, 375.53, 375.12, 383.06], '1M': [433.59, 440.36, 442.1, 435.79, 415.88, 423.7, 418.45, 391, 408.95, 396.68, 381.59, 399.15, 406.43, 411.15, 404.66, 400.49, 405.05, 381.61, 375.53, 375.12, 383.06], 'YTD': [449.72, 435.8, 438.57, 449.06, 416.56, 397.21, 417.07, 411.82, 402.51, 396.73, 395.01, 380.3, 372.11, 360.59, 348.95, 400.62, 373.72, 381.63, 411.79, 443.3, 417.85, 435.79, 418.45, 399.15, 400.49, 383.06], '6M': [475.19, 451.67, 448.96, 419.25, 430.9, 421.96, 425.21, 411.32, 417.4, 405.94, 407.82, 392.78, 385.95, 371.75, 343.25, 391.95, 387.51, 372.8, 398.73, 445.27, 417.26, 442.1, 418.45, 399.15, 400.49, 383.06], '1Y': [325.78, 315.35, 313.51, 329.65, 316.06, 302.63, 329.65, 335.58, 320.11, 345.98, 350.84, 395.94, 426.07, 440.4, 429.83, 413.49, 439.31, 433.72, 456.56, 429.52, 401.99, 395.23, 430.17, 455, 458.96, 481.2, 459.64, 432.96, 447.2, 431.44, 431.46, 406.01, 425.21, 411.32, 417.4, 405.94, 407.82, 392.78, 385.95, 381.26, 345.62, 388.9, 373.72, 381.63, 411.79, 445.27, 417.26, 442.1, 418.45, 399.15, 400.49, 383.06] },
      velocityScore: { '1D': 0, '1W': -14, '1M': -82.4, '6M': null }, isNew: false,
      marketCap: '$1.4T', pe: 351.4, revenueGrowth: 16, eps: 1.09, grossMargin: 19, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 9.59, MARS: false, FRWD: false, BCTK: 3.09, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 2.93, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'BE', name: 'Bloom Energy Corp', easyScore: 4, avgWeight: 3.56, proScore: 2.85, coverage: 0.8,
      price: 266.45, weeklyPrices: [345.85, 321.98, 326.19, 309.18, 266.45], weeklyChange: -22.96, dayChange: -13.82, sortRank: 0, periodReturns: { '1M': -11.9, 'YTD': 206.7, '6M': 195.5, '1Y': 1093.2 },
      priceHistory: { '1D': [309.18, 281.8, 277.5, 278.44, 276.71, 274.9, 271.91, 268.91, 266.83, 269.09, 270.6, 269.65, 269.94, 265.95, 268.1, 267.12, 269.02, 272.68, 270.95, 270.55, 271.47, 268.68, 268.12, 266.45], '1W': [345.85, 321.98, 326.19, 309.18, 266.45], '1M': [302.4, 293.8, 290.01, 285, 273.51, 287.32, 291.37, 263.61, 253.57, 259.61, 234.23, 248.88, 260.22, 274.5, 280.88, 328.91, 345.85, 321.98, 326.19, 309.18, 266.45], 'YTD': [86.89, 121.84, 139.17, 144.89, 156.51, 136.6, 139.03, 147.55, 155.67, 135.19, 157.17, 166.69, 133.52, 135.63, 166.7, 207.86, 237.57, 283.36, 258.64, 303.41, 307.88, 285, 291.37, 248.88, 328.91, 266.45], '6M': [90.18, 103.87, 136.87, 151.75, 152.31, 168.89, 148.7, 157.27, 174.77, 164.78, 159.21, 156.58, 150.22, 135.49, 146.78, 213.84, 229.75, 287.97, 285.47, 289.76, 282.31, 290.01, 291.37, 248.88, 328.91, 266.45], '1Y': [22.33, 24.24, 25.4, 24.99, 34.34, 36.72, 36.8, 45.11, 44.83, 54.8, 57.07, 67.26, 84.93, 70.32, 90.29, 86.87, 111.5, 110.38, 132.16, 135.21, 103.55, 93.38, 109.24, 119.18, 94.98, 88.82, 88.41, 103.05, 139.77, 150.56, 165.39, 147.35, 148.7, 157.27, 174.77, 164.78, 159.21, 156.58, 150.22, 132.45, 160.13, 210.06, 237.57, 283.36, 258.64, 289.76, 282.31, 290.01, 291.37, 248.88, 328.91, 266.45] },
      velocityScore: { '1D': -4.7, '1W': 23.4, '1M': 16.8, '6M': null }, isNew: false,
      marketCap: '$76B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: 1.74, VOLT: 4.21, PBD: false, PBW: 2.79, IVEP: 5.5 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 3, avgWeight: 4.86, proScore: 2.92, coverage: 0.6,
      price: 288.59, weeklyPrices: [307.80, 291.50, 294.49, 309.20, 288.59], weeklyChange: -6.24, dayChange: -6.67, sortRank: 0, periodReturns: { '1M': -1.2, 'YTD': 171.6, '6M': 154, '1Y': 334.3 },
      priceHistory: { '1D': [309.2, 292.68, 290.03, 297.91, 293.11, 292.47, 289.3, 283.07, 279.52, 282.29, 285.34, 284.97, 284.44, 284.83, 284.63, 286.95, 287.81, 291.82, 290.63, 288.26, 287.61, 287.45, 288.92, 288.59], '1W': [307.8, 291.5, 294.49, 309.2, 288.59], '1M': [291.97, 295.94, 288.9, 284.42, 288.12, 299.73, 300.06, 284.87, 293.6, 283.51, 262.34, 290.5, 294.75, 303.53, 292.7, 297.2, 307.8, 291.5, 294.49, 309.2, 288.59], 'YTD': [106.26, 119.94, 135.18, 139.32, 152.31, 179.6, 197.63, 182.27, 174.53, 161.22, 171.19, 175.13, 174.8, 182.6, 230.94, 241.01, 252.18, 277.27, 305.93, 296.98, 270.75, 284.42, 300.06, 290.5, 297.2, 288.59], '6M': [113.62, 120.46, 128.85, 142.76, 147.43, 151.08, 190.09, 180.99, 183, 170.96, 171.73, 167.41, 194.85, 180.36, 218.07, 229.73, 242.77, 253.49, 320.3, 300.84, 271.05, 288.9, 300.06, 290.5, 297.2, 288.59], '1Y': [66.46, 72.55, 70.87, 76.08, 82.79, 75.89, 81.28, 85.17, 83.64, 90.42, 89.41, 95.89, 99.1, 96.99, 101.35, 100.35, 110.24, 121.66, 127.8, 121.79, 109.4, 98.12, 107.74, 114.04, 112.36, 110.97, 111.96, 120, 133.04, 140.62, 147.81, 175.77, 190.09, 180.99, 183, 170.96, 171.73, 167.41, 194.85, 184.68, 230.81, 232.81, 252.18, 277.27, 305.93, 300.84, 271.05, 288.9, 300.06, 290.5, 297.2, 288.59] },
      velocityScore: { '1D': 3.9, '1W': -7.3, '1M': -41.9, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 56.1, revenueGrowth: 7, eps: 5.14, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { POW: 5.11, VOLT: 7.51, PBD: false, PBW: 1.96, IVEP: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 3, avgWeight: 4.85, proScore: 2.91, coverage: 0.6,
      price: 702.71, weeklyPrices: [740.14, 702.29, 701.88, 718.59, 702.71], weeklyChange: -5.06, dayChange: -2.21, sortRank: 0, periodReturns: { '1M': -5.3, 'YTD': 66.5, '6M': 62.4, '1Y': 85.2 },
      priceHistory: { '1D': [718.59, 697.14, 701.91, 706.35, 701.3, 698.72, 698.39, 697.19, 694.72, 696.22, 699.18, 699.19, 699.52, 694.83, 696.29, 695.35, 700.71, 702.97, 700.32, 699.7, 699.04, 702.25, 703.69, 702.71], '1W': [740.14, 702.29, 701.88, 718.59, 702.71], '1M': [742.18, 733.62, 730.1, 711.73, 687.48, 715.67, 719.17, 695.11, 693.81, 691.95, 650.92, 683.29, 707.74, 724.35, 719.29, 702.25, 740.14, 702.29, 701.88, 718.59, 702.71], 'YTD': [422.06, 413.17, 447.64, 468.76, 483.43, 477.72, 515.88, 552.66, 563.08, 540.19, 566.91, 577.95, 545.64, 560.63, 585.36, 601.88, 633.44, 727.77, 750.73, 780.08, 716.91, 711.73, 719.17, 683.29, 702.25, 702.71], '6M': [432.67, 435.82, 432.66, 463.49, 479.27, 488.6, 510.64, 519.31, 562.77, 568.38, 567.71, 572, 573.5, 549.02, 576.24, 591.82, 613.78, 628.6, 785.24, 773.72, 709.93, 730.1, 719.17, 683.29, 702.25, 702.71], '1Y': [379.47, 386.51, 383.78, 403.31, 421.68, 395.17, 386.15, 377.51, 378.21, 385.96, 372.5, 382.53, 388.58, 405.44, 421.17, 417.61, 433.85, 440.93, 449.13, 445.01, 426.93, 429.78, 464.88, 460.64, 438.11, 426.66, 431.03, 438.22, 444.2, 473.24, 481.28, 464.57, 510.64, 519.31, 562.77, 568.38, 567.71, 572, 573.5, 560.12, 582.06, 587.42, 633.44, 727.77, 750.73, 773.72, 709.93, 730.1, 719.17, 683.29, 702.25, 702.71] },
      velocityScore: { '1D': 1.7, '1W': 0.3, '1M': -20.7, '6M': null }, isNew: false,
      marketCap: '$105B', pe: 96.8, revenueGrowth: 26, eps: 7.26, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 5, VOLT: 5.26, PBD: false, PBW: false, IVEP: 4.3 },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 3, avgWeight: 4.44, proScore: 2.66, coverage: 0.6,
      price: 400.97, weeklyPrices: [435.78, 405.28, 404.59, 419.87, 400.97], weeklyChange: -7.99, dayChange: -4.5, sortRank: 0, periodReturns: { '1M': -0.5, 'YTD': 25.9, '6M': 24.5, '1Y': 15.2 },
      priceHistory: { '1D': [419.87, 405.93, 406.77, 409.44, 406.37, 404.02, 402.66, 401.75, 400.51, 401.02, 402.95, 401.94, 401.85, 400.29, 399.9, 401.23, 401.42, 403.04, 401.47, 401.48, 399.9, 400.57, 401.68, 400.97], '1W': [435.78, 405.28, 404.59, 419.87, 400.97], '1M': [403.13, 406.37, 401.94, 400.6, 400.08, 421.21, 418.61, 395.94, 403.14, 401.72, 375.46, 393.64, 391.39, 407.06, 407.71, 421.77, 435.78, 405.28, 404.59, 419.87, 400.97], 'YTD': [318.51, 320.58, 333.46, 331.22, 354.37, 354.67, 390.33, 373.38, 375.92, 347.75, 348.64, 360.23, 357.1, 361.1, 403, 406.21, 424.5, 433.01, 399.15, 408.1, 381.51, 400.6, 418.61, 393.64, 421.77, 400.97], '6M': [322.17, 322.26, 329.1, 337.59, 341.19, 362.53, 377.47, 380.38, 373.53, 354.46, 355.79, 360.54, 375, 357.67, 385.58, 395.06, 413.87, 410.77, 421.39, 406.94, 379.69, 401.94, 418.61, 393.64, 421.77, 400.97], '1Y': [348.14, 362.22, 360.62, 378.62, 392.17, 381.29, 362.84, 355.1, 345.38, 355.34, 349.03, 365.9, 374.5, 365.58, 373.46, 369.08, 373.3, 376.29, 381.56, 373.77, 354.07, 328.19, 345.89, 337.66, 331.98, 317.8, 321.45, 332.97, 332.38, 337.96, 347.32, 365, 377.47, 380.38, 373.53, 354.46, 355.79, 360.54, 375, 365.56, 400.44, 392.73, 424.5, 433.01, 399.15, 406.94, 379.69, 401.94, 418.61, 393.64, 421.77, 400.97] },
      velocityScore: { '1D': 2.7, '1W': 0, '1M': -17.1, '6M': null }, isNew: false,
      marketCap: '$156B', pe: 39.3, revenueGrowth: 17, eps: 10.2, grossMargin: 37, dividendYield: 1.05,
      etfPresence: { POW: 4.06, VOLT: 5.27, PBD: false, PBW: false, IVEP: 3.99 },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 3, avgWeight: 3.91, proScore: 2.34, coverage: 0.6,
      price: 1051.58, weeklyPrices: [1127.59, 1034.98, 1057.65, 1085.47, 1051.58], weeklyChange: -6.74, dayChange: -3.12, sortRank: 0, periodReturns: { '1M': -1.8, 'YTD': 60.9, '6M': 58.5, '1Y': 107.5 },
      priceHistory: { '1D': [1085.47, 1059.97, 1070.28, 1079.8, 1075.23, 1065.98, 1061.82, 1057.17, 1054.7, 1059.31, 1063.31, 1066.5, 1065.45, 1058.63, 1057.12, 1054.54, 1051.88, 1061.57, 1055.81, 1055.67, 1054.93, 1053.91, 1052.95, 1051.58], '1W': [1127.59, 1034.98, 1057.65, 1085.47, 1051.58], '1M': [1070.47, 1031.89, 996, 968.32, 950.54, 959.36, 963.33, 933.61, 933.85, 920.15, 867.09, 906.79, 940.66, 979.07, 982.35, 1109.73, 1127.59, 1034.98, 1057.65, 1085.47, 1051.58], 'YTD': [653.57, 628.4, 642.23, 657.78, 717.39, 737.53, 816.56, 830.34, 873.6, 789.23, 832.11, 877.39, 873.12, 898.57, 991.32, 1002.75, 1149.53, 1083.46, 1045.63, 1090.53, 1043.82, 968.32, 963.33, 906.79, 1109.73, 1051.58], '6M': [663.46, 680.86, 639.77, 684.86, 692.7, 780.25, 790.79, 817.55, 876.01, 841.27, 847.65, 858.47, 923.69, 872.9, 936.07, 985.92, 1127.56, 1063.11, 1118.96, 1062.57, 1024.52, 996, 963.33, 906.79, 1109.73, 1051.58], '1Y': [506.81, 517.04, 539.16, 574.6, 644.59, 656.5, 649.09, 625.27, 606, 633.69, 582.08, 625.55, 624.17, 605.17, 594.99, 604.56, 600, 584.39, 585.14, 575.13, 558.17, 558.03, 599.77, 631.32, 671.71, 658.28, 663.46, 686.33, 652.09, 667.89, 711.59, 746.22, 790.79, 817.55, 876.01, 841.27, 847.65, 858.47, 923.69, 894.78, 968.02, 978.32, 1149.53, 1083.46, 1045.63, 1062.57, 1024.52, 996, 963.33, 906.79, 1109.73, 1051.58] },
      velocityScore: { '1D': 1.3, '1W': -1.7, '1M': -15.2, '6M': null }, isNew: false,
      marketCap: '$283B', pe: 30.8, revenueGrowth: 16, eps: 34.19, grossMargin: 20, dividendYield: 0.18,
      etfPresence: { POW: 3.28, VOLT: 4.23, PBD: false, PBW: false, IVEP: 4.21 },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 3, avgWeight: 3.47, proScore: 2.08, coverage: 0.6,
      price: 87.8, weeklyPrices: [86.08, 86.43, 87.62, 87.70, 87.80], weeklyChange: 2, dayChange: 0.11, sortRank: 0, periodReturns: { '1M': 0.2, 'YTD': 9.4, '6M': 9.2, '1Y': 23.7 },
      priceHistory: { '1D': [87.7, 88.03, 88.14, 88, 88, 87.92, 87.93, 87.99, 87.97, 88.05, 88.01, 88.07, 88.1, 87.99, 87.9, 88, 88.06, 88.1, 88.04, 87.99, 87.93, 87.76, 87.84, 87.8], '1W': [86.08, 86.43, 87.62, 87.7, 87.8], '1M': [87.65, 87.65, 87.25, 87.01, 83.66, 84.58, 85.68, 85.84, 84.01, 84.83, 85.12, 84.84, 85.99, 86.12, 86.23, 86.75, 86.08, 86.43, 87.62, 87.7, 87.8], 'YTD': [80.28, 79.49, 82.19, 84.81, 88.18, 89.21, 91.93, 92.18, 93.77, 91.02, 91.73, 92.41, 91.16, 93.15, 94.08, 91.98, 96.25, 97.88, 93.32, 95.68, 89.69, 87.01, 85.68, 84.84, 86.75, 87.8], '6M': [80.41, 81.32, 81.12, 83.51, 87.15, 88.82, 90.83, 91.22, 95.11, 92.6, 91.66, 90.96, 91.16, 92.88, 94.17, 91.24, 90, 94.17, 95.39, 94.85, 88.27, 87.25, 85.68, 84.84, 86.75, 87.8], '1Y': [70.99, 73.88, 74.4, 75.95, 71.85, 70.4, 72.41, 72.24, 76.08, 72.09, 70.9, 71.64, 71.08, 75.85, 80.06, 83.35, 84.53, 84.41, 81.4, 83.93, 83.99, 84.3, 86.29, 83.13, 81.65, 79.54, 80.27, 81.05, 81.64, 83.85, 87.57, 89.97, 90.83, 91.22, 95.11, 92.6, 91.66, 90.96, 91.16, 92.85, 94.48, 91.83, 96.25, 97.88, 93.32, 94.85, 88.27, 87.25, 85.68, 84.84, 86.75, 87.8] },
      velocityScore: { '1D': -1, '1W': 0, '1M': -0.5, '6M': null }, isNew: false,
      marketCap: '$183B', pe: 22.3, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.84,
      etfPresence: { POW: 2.01, VOLT: 4.84, PBD: false, PBW: false, IVEP: 3.57 },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 3, avgWeight: 3.38, proScore: 2.03, coverage: 0.6,
      price: 163.66, weeklyPrices: [184.34, 168.37, 167.55, 171.91, 163.66], weeklyChange: -11.22, dayChange: -4.8, sortRank: 0, periodReturns: { '1M': -3.3, 'YTD': 60.5, '6M': 57.1, '1Y': 123.8 },
      priceHistory: { '1D': [171.91, 165.5, 165.36, 167.19, 166.05, 165.56, 164.51, 164.6, 164.47, 165.18, 165.58, 164.93, 164.21, 163.64, 163.62, 164.34, 164.29, 164.84, 164.33, 163.79, 163.46, 163.15, 163.29, 163.66], '1W': [184.34, 168.37, 167.55, 171.91, 163.66], '1M': [169.29, 167.8, 164.87, 166.99, 171.55, 176.39, 173.88, 162.86, 163.81, 163.8, 156.79, 164.52, 165.84, 169, 167.34, 177.02, 184.34, 168.37, 167.55, 171.91, 163.66], 'YTD': [101.97, 102.72, 107.98, 110.29, 115.62, 113.87, 111.9, 116.87, 118.36, 106.02, 107.87, 122.58, 118.44, 117.96, 130.56, 134.69, 142.76, 142.9, 166.73, 173.96, 163.57, 166.99, 173.88, 164.52, 177.02, 163.66], '6M': [104.18, 106.61, 106.39, 109.9, 113.16, 119.43, 112.15, 115.65, 121.8, 113.83, 111.09, 120.27, 127.01, 118.28, 127.11, 131.38, 140.13, 137.37, 172.49, 172.91, 161.86, 164.87, 173.88, 164.52, 177.02, 163.66], '1Y': [73.13, 74.91, 74.87, 75.91, 78.53, 89.88, 88.68, 89.8, 88.02, 92.58, 92.8, 94.78, 98.99, 97, 97.8, 95.98, 99.33, 102.2, 114.35, 111.03, 105.92, 101.52, 107.27, 107.72, 101.71, 101.54, 103.26, 110.09, 106.64, 112.66, 114.15, 116.69, 112.15, 115.65, 121.8, 113.83, 111.09, 120.27, 127.01, 121.26, 128.63, 129.7, 142.76, 142.9, 166.73, 172.91, 161.86, 164.87, 173.88, 164.52, 177.02, 163.66] },
      velocityScore: { '1D': 2.5, '1W': -1.5, '1M': -16.1, '6M': null }, isNew: false,
      marketCap: '$26B', pe: 55.7, revenueGrowth: 54, eps: 2.94, grossMargin: 37, dividendYield: 0.49,
      etfPresence: { POW: 3.84, VOLT: 3.05, PBD: false, PBW: false, IVEP: 3.24 },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 3, avgWeight: 3.03, proScore: 1.82, coverage: 0.6,
      price: 519.09, weeklyPrices: [539.39, 509.96, 518.18, 536.04, 519.09], weeklyChange: -3.76, dayChange: -3.16, sortRank: 0, periodReturns: { '1M': 8.6, 'YTD': 16.9, '6M': 14.1, '1Y': 28.1 },
      priceHistory: { '1D': [536.04, 517.19, 519.99, 522.78, 520.27, 521.14, 519.44, 518.61, 517.65, 519.49, 521.4, 520.47, 520.58, 520.03, 518.74, 519.92, 519.72, 521.35, 519.41, 518.78, 518.26, 519.15, 517.82, 519.09], '1W': [539.39, 509.96, 518.18, 536.04, 519.09], '1M': [478.05, 484.25, 473.93, 473.61, 462.93, 484.91, 485.27, 476.82, 485.03, 486.47, 467.59, 469.32, 476.89, 489.73, 502.65, 523.69, 539.39, 509.96, 518.18, 536.04, 519.09], 'YTD': [444.11, 460.87, 484.11, 485.53, 497.97, 487.4, 516.02, 526.73, 511.63, 471.54, 468.41, 492.65, 481.67, 494.25, 536.01, 535.57, 557.85, 508.17, 493.04, 482.03, 460.98, 473.61, 485.27, 469.32, 523.69, 519.09], '6M': [454.94, 465.48, 472.88, 472.54, 484.14, 503.86, 503.1, 522.3, 527.9, 490.78, 477.97, 477.47, 503.2, 490.74, 527.21, 526.94, 549.75, 545.93, 502.34, 483.79, 463.32, 473.93, 485.27, 469.32, 523.69, 519.09], '1Y': [405.26, 414.84, 419.24, 430.28, 442.54, 426.74, 418.65, 437.67, 427.57, 445.8, 436.04, 437.43, 441.44, 425.22, 413, 408.46, 425.71, 434.39, 470, 462.43, 437.65, 407.36, 431.43, 440.53, 448, 442.51, 451.39, 477.46, 481.68, 482.5, 485.73, 487.16, 503.1, 522.3, 527.9, 490.78, 477.97, 477.47, 503.2, 500.38, 534.67, 521.71, 557.85, 508.17, 493.04, 483.79, 463.32, 473.93, 485.27, 469.32, 523.69, 519.09] },
      velocityScore: { '1D': 2.8, '1W': 1.7, '1M': -12.9, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 30.6, revenueGrowth: 11, eps: 16.94, grossMargin: 36, dividendYield: 1.06,
      etfPresence: { POW: 2.97, VOLT: 3.47, PBD: false, PBW: false, IVEP: 2.64 },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'NRG', name: 'NRG Energy Inc', easyScore: 3, avgWeight: 1.34, proScore: 0.8, coverage: 0.6,
      price: 146.12, weeklyPrices: [138.91, 137.66, 142.21, 147.11, 146.12], weeklyChange: 5.19, dayChange: -0.67, sortRank: 0, periodReturns: { '1M': 4.1, 'YTD': -8.2, '6M': -9.2, '1Y': -9.5 },
      priceHistory: { '1D': [147.11, 146.2, 145.69, 147.08, 146.97, 147.17, 147.19, 147.21, 147.38, 147.84, 147.9, 148.12, 148.4, 147.71, 147.67, 147.65, 147.34, 147.48, 147.2, 146.28, 146.26, 146.51, 146.49, 146.12], '1W': [138.91, 137.66, 142.21, 147.11, 146.12], '1M': [140.43, 138, 137.5, 134.08, 129.47, 133.76, 133.39, 129.2, 127.71, 129.96, 120.65, 123.7, 125.47, 130.4, 132.1, 135.06, 138.91, 137.66, 142.21, 147.11, 146.12], 'YTD': [159.24, 143.53, 158.5, 149.3, 153.72, 144.44, 161.8, 179.18, 178.96, 154.32, 152.1, 161.4, 146.14, 152.69, 164.07, 167.73, 154.53, 155.58, 141.86, 134.72, 136.92, 134.08, 133.39, 123.7, 135.06, 146.12], '6M': [160.88, 161.59, 148.89, 148.91, 156.04, 152.18, 156.43, 171.06, 183.59, 163.54, 148.63, 159.11, 151.04, 146.14, 160.3, 168.45, 149.6, 149.01, 150.64, 131.08, 133.98, 137.5, 133.39, 123.7, 135.06, 146.12], '1Y': [161.54, 158.39, 150.68, 151.75, 156.59, 167.63, 152.54, 153.78, 145.89, 148.66, 147.66, 164.84, 164.36, 168.57, 166.28, 160.43, 168.74, 170.36, 171.86, 172.5, 166.15, 160.46, 169.49, 163, 161.44, 156.2, 160.96, 159.63, 150.59, 150.68, 155.11, 143.99, 156.43, 171.06, 183.59, 163.54, 148.63, 159.11, 151.04, 149.9, 161.78, 168.5, 154.53, 155.58, 141.86, 131.08, 133.98, 137.5, 133.39, 123.7, 135.06, 146.12] },
      velocityScore: { '1D': 2.6, '1W': 8.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$31B', pe: 160.6, revenueGrowth: 20, eps: 0.91, grossMargin: 16, dividendYield: 1.29,
      etfPresence: { POW: 0.52, VOLT: 1.02, PBD: false, PBW: false, IVEP: 2.47 },
      tonyNote: 'NRG Energy Inc appears in 3 of 5 Electrification ETFs (60% coverage) with average weight 1.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, avgWeight: 5.77, proScore: 2.31, coverage: 0.4,
      price: 305.7, weeklyPrices: [304.33, 288.64, 294.15, 310.32, 305.70], weeklyChange: 0.45, dayChange: -1.49, sortRank: 0, periodReturns: { '1M': 10.7, 'YTD': 80.2, '6M': 73.3, '1Y': 225.7 },
      priceHistory: { '1D': [310.32, 298.52, 297.45, 304.04, 302.4, 302.1, 299.73, 299.75, 298.34, 302.12, 301.55, 300.95, 301.02, 300.08, 300.3, 301.5, 302.7, 305.06, 302.34, 302.71, 302.58, 303.65, 305.55, 305.7], '1W': [304.33, 288.64, 294.15, 310.32, 305.7], '1M': [276.25, 280.13, 276.96, 274.52, 269.86, 280.09, 276.54, 262.56, 279.13, 276.04, 276.95, 296.55, 293.87, 302.15, 293.22, 296.39, 304.33, 288.64, 294.15, 310.32, 305.7], 'YTD': [169.63, 180.24, 196.61, 196.5, 210.44, 208, 231.48, 235.04, 229.71, 191.87, 195.18, 214.95, 204.11, 204.65, 235.73, 254.25, 268.31, 275.84, 290.46, 268.73, 260.4, 274.52, 276.54, 296.55, 296.39, 305.7], '6M': [176.45, 175.77, 188, 201.17, 210.66, 217.25, 237.19, 221.19, 234.67, 213.8, 200.88, 205.74, 220.77, 197.98, 228.29, 236.04, 262.68, 258.26, 286.89, 266.92, 254.75, 276.96, 276.54, 296.55, 296.39, 305.7], '1Y': [93.87, 100.1, 101.14, 101.69, 119.84, 127.5, 132.58, 132.13, 128.91, 136.29, 143.88, 141.73, 142.08, 142.84, 138.97, 137.73, 146.11, 157, 153.99, 161.53, 146.49, 134.36, 154.03, 166, 173.12, 175.69, 174.34, 184, 193.82, 201.8, 207.78, 211.58, 237.19, 221.19, 234.67, 213.8, 200.88, 205.74, 220.77, 203.04, 235, 241.49, 268.31, 275.84, 290.46, 266.92, 254.75, 276.96, 276.54, 296.55, 296.39, 305.7] },
      velocityScore: { '1D': 4.5, '1W': 2.2, '1M': -36.5, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 73.7, revenueGrowth: 17, eps: 4.15, grossMargin: 39, dividendYield: 0.09,
      etfPresence: { POW: 3.72, VOLT: 7.82, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, avgWeight: 3.45, proScore: 1.38, coverage: 0.4,
      price: 138.35, weeklyPrices: [130.30, 133.74, 134.96, 137.00, 138.35], weeklyChange: 6.18, dayChange: 0.99, sortRank: 0, periodReturns: { '1M': 5.7, 'YTD': 20, '6M': 19.6, '1Y': 35.2 },
      priceHistory: { '1D': [137, 138.05, 138.32, 138, 138.23, 138, 137.96, 137.94, 137.92, 137.91, 137.95, 138.18, 138.26, 138.32, 137.99, 138.18, 138.25, 138.25, 138.36, 138.34, 138.32, 138.16, 138.2, 138.35], '1W': [130.3, 133.74, 134.96, 137, 138.35], '1M': [130.9, 129.57, 127.76, 126.67, 123.79, 126.31, 127.79, 129.14, 126.77, 127.76, 128.53, 128.48, 129.23, 129.31, 129.75, 127.69, 130.3, 133.74, 134.96, 137, 138.35], 'YTD': [115.31, 115.93, 119.4, 116.63, 119.21, 120.61, 126.43, 129.37, 133.82, 131.87, 132.22, 128.72, 128.85, 132.68, 136.3, 133.66, 135.08, 137.11, 131.76, 128.6, 129.61, 126.67, 127.79, 128.48, 127.69, 138.35], '6M': [115.67, 114.07, 116.57, 119.22, 119.43, 120.67, 121.23, 127.27, 132.46, 133.52, 131.26, 130.97, 128.3, 131.08, 134.71, 134.39, 131.62, 134.44, 132.56, 127.95, 128.87, 127.76, 127.79, 128.48, 127.69, 138.35], '1Y': [102.35, 103.86, 105.34, 107.4, 109.79, 113.58, 112.5, 112.86, 113.14, 111.78, 108.11, 109.46, 107.06, 109.14, 114.06, 117.04, 117.53, 115.98, 120.26, 121.43, 121.48, 120.9, 123.77, 117.54, 114.13, 114.49, 115.77, 115.04, 116.62, 118.98, 119.12, 119.98, 121.23, 127.27, 132.46, 133.52, 131.26, 130.97, 128.3, 131.67, 137.15, 134.56, 135.08, 137.11, 131.76, 127.95, 128.87, 127.76, 127.79, 128.48, 127.69, 138.35] },
      velocityScore: { '1D': 0.7, '1W': 26.6, '1M': -29.6, '6M': null }, isNew: false,
      marketCap: '$75B', pe: 20.5, revenueGrowth: 10, eps: 6.75, grossMargin: 47, dividendYield: 2.77,
      etfPresence: { POW: 2.65, VOLT: 4.25, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 2, avgWeight: 3.29, proScore: 1.32, coverage: 0.4,
      price: 304.04, weeklyPrices: [357.96, 318.32, 316.43, 325.57, 304.04], weeklyChange: -15.06, dayChange: -6.61, sortRank: 0, periodReturns: { '1M': -6.1, 'YTD': 87.7, '6M': 81.4, '1Y': 145.6 },
      priceHistory: { '1D': [325.57, 307.3, 309.64, 311.82, 308.93, 305.07, 304.01, 303.79, 301.3, 302.43, 305.4, 304.31, 304.94, 303.78, 303.6, 305.05, 304.66, 305.67, 305.42, 306.05, 304.39, 303.54, 304.49, 304.04], '1W': [357.96, 318.32, 316.43, 325.57, 304.04], '1M': [323.91, 319.78, 314.18, 315.71, 323.39, 331.44, 323.92, 300.51, 300.57, 289.52, 280.98, 297.88, 302.87, 311.93, 299.6, 333.05, 357.96, 318.32, 316.43, 325.57, 304.04], 'YTD': [162.01, 160.78, 172.54, 182.49, 195.1, 177.75, 236.51, 243.75, 254.89, 241.78, 265.38, 269.17, 252.4, 261.29, 295.11, 307.34, 321.75, 328.49, 340.01, 376.23, 323.4, 315.71, 323.92, 297.88, 333.05, 304.04], '6M': [167.58, 173.95, 170.03, 175.18, 189.21, 190.15, 199.62, 243.21, 262.19, 251.28, 268.26, 264.71, 276.16, 250.58, 281.03, 301.16, 305.14, 306.18, 358.92, 369.99, 315.67, 314.18, 323.92, 297.88, 333.05, 304.04], '1Y': [123.8, 127.84, 123.3, 129.06, 137.47, 141.59, 139.93, 132.52, 126.58, 134.23, 124, 134.84, 143.6, 138.62, 160.2, 169.01, 174, 186.06, 192.86, 179.8, 163.64, 159.61, 179.73, 189.02, 161.27, 159.82, 165.62, 174.95, 172.72, 181.47, 193.76, 182.56, 199.62, 243.21, 262.19, 251.28, 268.26, 264.71, 276.16, 259.37, 287.64, 294.13, 321.75, 328.49, 340.01, 369.99, 315.67, 314.18, 323.92, 297.88, 333.05, 304.04] },
      velocityScore: { '1D': 2.3, '1W': 0.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$117B', pe: 76.6, revenueGrowth: 30, eps: 3.97, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 2.45, PBD: false, PBW: false, IVEP: 4.13 },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, avgWeight: 2.81, proScore: 1.12, coverage: 0.4,
      price: 358.08, weeklyPrices: [388.23, 364.96, 359.61, 375.15, 358.08], weeklyChange: -7.76, dayChange: -4.55, sortRank: 0, periodReturns: { '1M': 5.4, 'YTD': 71, '6M': 64.4, '1Y': 167.5 },
      priceHistory: { '1D': [375.15, 357.34, 354.02, 362.99, 356.17, 358.61, 355.04, 355.94, 354.63, 357.5, 359.29, 358.5, 358.78, 359.41, 358.74, 359.8, 361.01, 362.19, 361.64, 359.42, 359.89, 358.06, 358.81, 358.08], '1W': [388.23, 364.96, 359.61, 375.15, 358.08], '1M': [339.65, 328.34, 317.08, 302.18, 294.65, 322.5, 320.92, 294.81, 306.11, 311.64, 308.17, 340.4, 354.37, 370.66, 350.45, 372.59, 388.23, 364.96, 359.61, 375.15, 358.08], 'YTD': [209.37, 210.99, 257.29, 262.19, 269.12, 257.64, 312.95, 331.23, 335.57, 290.78, 305.82, 327.8, 313.11, 332.31, 379.64, 375.6, 382.47, 383.91, 351.94, 344.6, 323.79, 302.18, 320.92, 340.4, 372.59, 358.08], '6M': [217.86, 227.65, 227.59, 250.95, 259.55, 263.03, 279.04, 321.34, 338.51, 330.54, 314.84, 319.63, 342.87, 322.71, 366.95, 374.32, 377.19, 361.39, 360.81, 339.19, 313.05, 317.08, 320.92, 340.4, 372.59, 358.08], '1Y': [133.84, 138.14, 140.73, 143.25, 140.54, 135.25, 150.82, 161.89, 148.07, 155.55, 153.74, 157.44, 174.35, 166.46, 173.86, 169.62, 191.98, 202.61, 202.73, 216.73, 202.82, 188.88, 211.19, 219.38, 215.07, 216.09, 217.26, 229.7, 233.92, 269, 263.76, 254.54, 279.04, 321.34, 338.51, 330.54, 314.84, 319.63, 342.87, 332.82, 374.98, 372.23, 382.47, 383.91, 351.94, 339.19, 313.05, 317.08, 320.92, 340.4, 372.59, 358.08] },
      velocityScore: { '1D': 1.8, '1W': 2.8, '1M': -39.1, '6M': null }, isNew: false,
      marketCap: '$14B', pe: 74.6, revenueGrowth: 26, eps: 4.8, grossMargin: 39, dividendYield: 0.11,
      etfPresence: { POW: 1.12, VOLT: 4.5, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'APH', name: 'Amphenol Corp', easyScore: 2, avgWeight: 2.66, proScore: 1.06, coverage: 0.4,
      price: 164.09, weeklyPrices: [165.96, 158.70, 162.78, 165.15, 164.09], weeklyChange: -1.12, dayChange: -0.64, sortRank: 0, periodReturns: { '1M': 17.6, 'YTD': 21.4, '6M': 19.4, '1Y': 69.2 },
      priceHistory: { '1D': [165.15, 161.77, 161.51, 163.38, 161.99, 162.1, 162.82, 162.57, 161.96, 162.69, 164.14, 163.53, 163.95, 164.12, 164.47, 164.72, 164.75, 165.8, 165.15, 165.39, 164.9, 164.64, 164.61, 164.09], '1W': [165.96, 158.7, 162.78, 165.15, 164.09], '1M': [139.56, 140.24, 147.68, 148.76, 146.34, 147.62, 146.77, 138.81, 143.6, 154.07, 149.22, 152.46, 153.8, 158.59, 158.81, 163.96, 165.96, 158.7, 162.78, 165.15, 164.09], 'YTD': [135.14, 136.25, 154.22, 150.99, 149.58, 127.63, 143.73, 151.04, 146.06, 131.87, 131.47, 130.65, 123.13, 128, 140.75, 151.06, 150.18, 147.27, 136.62, 129.19, 124.86, 148.76, 146.77, 152.46, 163.96, 164.09], '6M': [137.43, 139.88, 145.11, 152.33, 166.25, 147.06, 144.14, 147.73, 152.64, 132.75, 134.54, 127.81, 128.73, 126.35, 135.32, 146.98, 148.13, 148.38, 138.47, 124.64, 123.05, 147.68, 146.77, 152.46, 163.96, 164.09], '1Y': [96.98, 99.46, 98.76, 103.34, 105.02, 104.31, 109.98, 110.74, 108.81, 111.94, 110.45, 118.68, 123.94, 122.6, 122.22, 121.7, 125.65, 133.82, 139.34, 139.09, 135.25, 130.36, 140.9, 139.36, 129.24, 135.29, 136.9, 141.38, 148.97, 154.6, 145.96, 130, 144.14, 147.73, 152.64, 132.75, 134.54, 127.81, 128.73, 127.7, 137.68, 148.96, 150.18, 147.27, 136.62, 124.64, 123.05, 147.68, 146.77, 152.46, 163.96, 164.09] },
      velocityScore: { '1D': -0.9, '1W': -1.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$202B', pe: 47.2, revenueGrowth: 58, eps: 3.48, grossMargin: 38, dividendYield: 0.61,
      etfPresence: { POW: 1, VOLT: 4.32, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 2.64, proScore: 1.06, coverage: 0.4,
      price: 78.28, weeklyPrices: [74.95, 75.79, 75.87, 77.53, 78.28], weeklyChange: 4.44, dayChange: 0.97, sortRank: 0, periodReturns: { '1M': 2.5, 'YTD': 30.2, '6M': 31.5, '1Y': 24.5 },
      priceHistory: { '1D': [77.53, 77.93, 78.13, 78.04, 78.27, 78.01, 77.96, 77.88, 78.22, 78.28, 78.43, 78.9, 78.83, 78.47, 78.33, 78.36, 78.26, 78.29, 78.21, 78.31, 78.25, 78.39, 78.35, 78.28], '1W': [74.95, 75.79, 75.87, 77.53, 78.28], '1M': [76.34, 74.37, 73.13, 71.39, 70.04, 71.66, 72.43, 71.96, 71.59, 71.59, 72.26, 71.62, 72.08, 71.49, 71.48, 73.12, 74.95, 75.79, 75.87, 77.53, 78.28], 'YTD': [60.11, 61.15, 60.29, 64.96, 67.24, 67.42, 71.13, 72.98, 74.72, 74.24, 73.52, 74.06, 74.06, 72, 72.74, 71.15, 71.65, 76.31, 72.95, 77.69, 77.52, 71.39, 72.43, 71.62, 73.12, 78.28], '6M': [59.52, 61.16, 59.56, 61.51, 65.48, 68.5, 68.84, 72.14, 73.97, 75.77, 74.4, 72.8, 73.81, 72.78, 73.01, 70.76, 71.1, 73.32, 73.76, 75.71, 77.88, 73.13, 72.43, 71.62, 73.12, 78.28], '1Y': [62.87, 58.64, 58.22, 59.35, 57.82, 60.27, 57.89, 57.34, 57.8, 58, 57.2, 58.81, 60.11, 64.01, 64.48, 62.61, 62.46, 57.48, 57.87, 59.58, 59.59, 58.91, 60.93, 62.81, 59.74, 58.26, 59.8, 59.5, 60.49, 63.18, 66.92, 66.46, 68.84, 72.14, 73.97, 75.77, 74.4, 72.8, 73.81, 71.83, 72.82, 70.86, 71.65, 76.31, 72.95, 75.71, 77.88, 73.13, 72.43, 71.62, 73.12, 78.28] },
      velocityScore: { '1D': 1, '1W': 7.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$96B', pe: 34.3, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.71,
      etfPresence: { POW: false, VOLT: 1.53, PBD: false, PBW: false, IVEP: 3.76 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'JCI', name: 'JOHNSON CONTROLS INTERNATIONAL PLC', easyScore: 2, avgWeight: 2.48, proScore: 0.99, coverage: 0.4,
      price: 139.36, weeklyPrices: [148.21, 141.28, 142.81, 145.49, 139.36], weeklyChange: -5.97, dayChange: -4.21, sortRank: 0, periodReturns: { '1M': -0.6, 'YTD': 16.4, '6M': 14.2, '1Y': 33.4 },
      priceHistory: { '1D': [145.49, 141.61, 141.55, 141.51, 141.17, 140.77, 139.99, 140.17, 139.76, 139.71, 139.96, 139.9, 139.77, 139.7, 139.26, 139.19, 139.38, 139.93, 139.59, 139.65, 139.21, 139.11, 139.17, 139.36], '1W': [148.21, 141.28, 142.81, 145.49, 139.36], '1M': [140.22, 138.2, 136.15, 134.06, 133.91, 146.96, 147.4, 143.65, 144.05, 147.75, 139.36, 144.01, 144.96, 146.06, 145.17, 144.82, 148.21, 141.28, 142.81, 145.49, 139.36], 'YTD': [119.75, 111.29, 112.95, 113.59, 120.28, 132.52, 138.57, 143.79, 144.3, 132.4, 130.94, 133.25, 131.57, 132.97, 142.53, 140.87, 141.73, 146.03, 139.25, 145.03, 135.47, 134.06, 147.4, 144.01, 144.82, 139.36], '6M': [122.06, 121.53, 111.39, 114.56, 116.96, 124.01, 138.75, 139.48, 144.49, 140, 134.99, 133.76, 137.48, 130.95, 139, 137.21, 139.81, 141.35, 143.14, 143.8, 137.75, 136.15, 147.4, 144.01, 144.82, 139.36], '1Y': [104.44, 106.71, 105.85, 108.96, 111.73, 106.48, 105.55, 105.02, 104.75, 108.65, 106.23, 107.53, 108.69, 107.01, 108.79, 105.55, 108.83, 112.94, 114.39, 122.25, 120.2, 112.99, 116.31, 114.23, 114.76, 119.53, 121.71, 113.95, 112.09, 115.49, 116.74, 129.49, 138.75, 139.48, 144.49, 140, 134.99, 133.76, 137.48, 134.72, 141.85, 137.55, 141.73, 146.03, 139.25, 143.8, 137.75, 136.15, 147.4, 144.01, 144.82, 139.36] },
      velocityScore: { '1D': 1, '1W': -1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$85B', pe: 42.6, revenueGrowth: 8, eps: 3.27, grossMargin: 37, dividendYield: 1.1,
      etfPresence: { POW: false, VOLT: 1.39, PBD: false, PBW: false, IVEP: 3.57 },
      tonyNote: 'JOHNSON CONTROLS INTERNATIONAL PLC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VST', name: 'Vistra Corp', easyScore: 2, avgWeight: 2.4, proScore: 0.96, coverage: 0.4,
      price: 164.75, weeklyPrices: [167.26, 162.39, 162.87, 167.77, 164.75], weeklyChange: -1.5, dayChange: -1.8, sortRank: 0, periodReturns: { '1M': 0.1, 'YTD': 2.1, '6M': 1.9, '1Y': -13.5 },
      priceHistory: { '1D': [167.77, 165.65, 165.3, 166.49, 165.14, 165.21, 165.12, 165.16, 165.02, 165.09, 165.76, 166.23, 166.66, 166.23, 165.97, 166.08, 165.9, 166.21, 166, 165.79, 165.41, 165.18, 165.46, 164.75], '1W': [167.26, 162.39, 162.87, 167.77, 164.75], '1M': [164.56, 160.15, 160.28, 160.23, 154.76, 153.8, 153.7, 148.76, 146.9, 146.22, 138.54, 146.38, 148.02, 153.52, 158.61, 163.75, 167.26, 162.39, 162.87, 167.77, 164.75], 'YTD': [161.33, 150.6, 180.18, 160.12, 162.58, 143.07, 163.1, 171.4, 173.89, 158.65, 159.58, 167.37, 152.3, 151.18, 154.73, 163.46, 156.85, 157.84, 153.95, 141.9, 149.08, 160.23, 153.7, 146.38, 163.75, 164.75], '6M': [161.67, 162.93, 172.58, 156.81, 164.26, 153, 159.6, 170.57, 175.36, 163.36, 159.16, 170.12, 151.51, 150.33, 155.89, 162.94, 155.79, 153.79, 158.29, 142.61, 144, 160.28, 153.7, 146.38, 163.75, 164.75], '1Y': [190.4, 192.2, 196.58, 193.01, 192.2, 208.05, 202.12, 202.35, 190.28, 196.7, 188, 209.7, 211.28, 207.22, 201.99, 196.86, 201.35, 201.47, 188.3, 191, 171.56, 173.79, 178.86, 167.17, 170.1, 163.03, 161.84, 169.53, 171.42, 160.02, 165.64, 142.52, 159.6, 170.57, 175.36, 163.36, 159.16, 170.12, 151.51, 153.96, 152.75, 165.53, 156.85, 157.84, 153.95, 142.61, 144, 160.28, 153.7, 146.38, 163.75, 164.75] },
      velocityScore: { '1D': 3.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$56B', pe: 27.6, revenueGrowth: 43, eps: 5.97, grossMargin: 39, dividendYield: 0.55,
      etfPresence: { POW: 1.47, VOLT: false, PBD: false, PBW: false, IVEP: 3.34 },
      tonyNote: 'Vistra Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TLN', name: 'Talen Energy Corp', easyScore: 2, avgWeight: 2.31, proScore: 0.92, coverage: 0.4,
      price: 398.31, weeklyPrices: [438.12, 411.92, 405.89, 416.80, 398.31], weeklyChange: -9.09, dayChange: -4.44, sortRank: 0, periodReturns: { '1M': 2.4, 'YTD': 6.3, '6M': 3.6, '1Y': 36.7 },
      priceHistory: { '1D': [416.8, 403.06, 402.4, 405.84, 400.35, 403.58, 401.56, 406.68, 403.99, 403.54, 407.51, 407.82, 407.8, 407.04, 405.86, 405.55, 405.96, 406.29, 405.95, 403.31, 402, 400.86, 401.22, 398.31], '1W': [438.12, 411.92, 405.89, 416.8, 398.31], '1M': [389, 379.78, 381.47, 386.8, 377.2, 379.59, 378.08, 364.74, 364.78, 358.74, 336.59, 344.8, 360.54, 386.21, 406.51, 436.29, 438.12, 411.92, 405.89, 416.8, 398.31], 'YTD': [374.84, 356, 419.07, 366.43, 362.2, 324.63, 367.81, 382.25, 370.97, 320.56, 311.45, 340.07, 323.13, 327.58, 321.33, 365.35, 345.25, 372.42, 390.55, 352.88, 360.48, 386.8, 378.08, 344.8, 436.29, 398.31], '6M': [384.52, 395.2, 369.03, 356.66, 359.51, 341.42, 357.93, 380.29, 391.43, 336.57, 316.22, 338.6, 328.29, 319.23, 328.65, 353.3, 339.32, 351.91, 409.99, 351.03, 344.46, 381.47, 378.08, 344.8, 436.29, 398.31], '1Y': [291.38, 286.31, 276.17, 328.63, 346.62, 378.01, 374.68, 380.6, 357.86, 388.22, 389.19, 402.53, 423.56, 411.23, 438.5, 412.83, 406.45, 407.81, 399.78, 386.57, 355.04, 369.1, 394.27, 354.24, 356.36, 372.25, 380.27, 393.18, 376.86, 374.31, 365.17, 317.05, 357.93, 380.29, 391.43, 336.57, 316.22, 338.6, 328.29, 328.08, 312.76, 362.4, 345.25, 372.42, 390.55, 351.03, 344.46, 381.47, 378.08, 344.8, 436.29, 398.31] },
      velocityScore: { '1D': 2.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: null, revenueGrowth: 97, eps: -0.5, grossMargin: 40, dividendYield: null,
      etfPresence: { POW: 1.74, VOLT: false, PBD: false, PBW: false, IVEP: 2.87 },
      tonyNote: 'Talen Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CEG', name: 'Constellation Energy Corp', easyScore: 2, avgWeight: 2.31, proScore: 0.92, coverage: 0.4,
      price: 261.78, weeklyPrices: [275.53, 270.26, 267.97, 268.69, 261.78], weeklyChange: -4.99, dayChange: -2.57, sortRank: 0, periodReturns: { '1M': -13.2, 'YTD': -25.9, '6M': -27.4, '1Y': -18.8 },
      priceHistory: { '1D': [268.69, 263.52, 264.3, 265.07, 263.86, 264.56, 264.29, 264.01, 263.4, 263.98, 264.99, 264.91, 265.51, 264.51, 265.03, 264.16, 263.9, 264.68, 263.6, 262.97, 262.63, 262.21, 262.29, 261.78], '1W': [275.53, 270.26, 267.97, 268.69, 261.78], '1M': [301.57, 288.68, 286.31, 287.75, 265.7, 267.24, 264.59, 254.83, 250.67, 251.65, 242.3, 246.71, 253.76, 262.35, 268, 274.06, 275.53, 270.26, 267.97, 268.69, 261.78], 'YTD': [353.27, 322.54, 341.2, 289.06, 287.45, 247.06, 276.12, 294.84, 329.88, 319.06, 301.55, 316.47, 295.19, 272.82, 286.5, 296.21, 292.77, 313, 311.28, 275.26, 285.83, 287.75, 264.59, 246.71, 274.06, 261.78], '6M': [360.46, 354.94, 335.86, 295.4, 288.76, 268.45, 271.14, 294.05, 325.84, 322.85, 300.69, 317.22, 303.32, 279.25, 284.27, 294.73, 287.16, 297, 322.78, 274.89, 281.26, 286.31, 264.59, 246.71, 274.06, 261.78], '1Y': [322.51, 311.88, 321.54, 321.42, 327.35, 340.77, 335.77, 326.21, 312.52, 319.55, 301.58, 323.48, 330.9, 331.26, 360, 368.49, 386.5, 389.19, 377, 358.39, 335.74, 345.78, 364.36, 359.82, 351.98, 355.4, 358.33, 354.58, 333.53, 294.37, 287.95, 250.46, 271.14, 294.05, 325.84, 322.85, 300.69, 317.22, 303.32, 279.46, 280.25, 299.14, 292.77, 313, 311.28, 274.89, 281.26, 286.31, 264.59, 246.71, 274.06, 261.78] },
      velocityScore: { '1D': -1.1, '1W': -3.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$93B', pe: 22.8, revenueGrowth: 64, eps: 11.5, grossMargin: 23, dividendYield: 0.63,
      etfPresence: { POW: 1.26, VOLT: false, PBD: false, PBW: false, IVEP: 3.36 },
      tonyNote: 'Constellation Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX TECHNOLOGIES INC', easyScore: 2, avgWeight: 2.13, proScore: 0.85, coverage: 0.4,
      price: 198.29, weeklyPrices: [210.00, 209.89, 205.65, 204.77, 198.29], weeklyChange: -5.57, dayChange: -3.16, sortRank: 0, periodReturns: { '1M': -3, 'YTD': 14.7, '6M': 12.7, '1Y': 39.8 },
      priceHistory: { '1D': [204.77, 198.66, 199.91, 200.18, 199, 199.91, 199.02, 199.19, 199.22, 199.13, 200.42, 200.1, 201.11, 200.77, 200.29, 201.04, 200.61, 201.3, 200.39, 198.99, 198.73, 198.54, 199.01, 198.29], '1W': [210, 209.89, 205.65, 204.77, 198.29], '1M': [204.38, 198.95, 199.27, 195.88, 188.39, 184.72, 190.76, 185.95, 187.46, 188.96, 183, 194.68, 193.45, 193.94, 196.93, 205.4, 210, 209.89, 205.65, 204.77, 198.29], 'YTD': [172.84, 193.2, 213.25, 207.75, 210.18, 187.42, 196.9, 206.44, 205.98, 195.23, 197.82, 210.12, 205.09, 214.98, 229.57, 235.78, 225.51, 216.39, 209.89, 210.94, 202.52, 195.88, 190.76, 194.68, 205.4, 198.29], '6M': [175.88, 189.02, 206.62, 206.07, 212.4, 210.88, 199.83, 202.25, 208.27, 205.57, 195.98, 208.98, 222.13, 204.49, 231.78, 238.42, 219.1, 208.08, 215.2, 206.83, 202.66, 199.27, 190.76, 194.68, 205.4, 198.29], '1Y': [141.87, 142.91, 137.06, 142.95, 147.96, 149.5, 179.19, 174.7, 165.34, 165.83, 163.64, 168.33, 174.5, 180.62, 186.64, 190.08, 203.12, 203.28, 213.61, 193.55, 177.88, 175.28, 178.88, 177.87, 175.03, 176.43, 175.49, 195.3, 210.54, 209.52, 216.3, 190.1, 199.83, 202.25, 208.27, 205.57, 195.98, 208.98, 222.13, 212.81, 230.29, 230.8, 225.51, 216.39, 209.89, 206.83, 202.66, 199.27, 190.76, 194.68, 205.4, 198.29] },
      velocityScore: { '1D': -2.3, '1W': -2.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: 52.9, revenueGrowth: 26, eps: 3.75, grossMargin: 23, dividendYield: 0.51,
      etfPresence: { POW: false, VOLT: 2.06, PBD: false, PBW: false, IVEP: 2.2 },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 5.36, proScore: 2.14, coverage: 0.4,
      price: 848.89, weeklyPrices: [932.75, 892.25, 867.23, 881.92, 848.89], weeklyChange: -8.99, dayChange: -3.75, sortRank: 0, periodReturns: { '1M': 8.3, 'YTD': 177.2, '6M': 168.2, '1Y': 271.3 },
      priceHistory: { '1D': [881.92, 840.15, 842.78, 861.06, 849.54, 848.8, 833.96, 836.81, 831.73, 830.96, 844.43, 840.72, 843.29, 837.41, 839.56, 848.88, 846.6, 853.19, 846.3, 848.92, 849.87, 849.17, 848.96, 848.89], '1W': [932.75, 892.25, 867.23, 881.92, 848.89], '1M': [783.53, 782.12, 842.96, 860.84, 845.39, 957.03, 993.74, 882.43, 891.86, 842.01, 770.25, 838.55, 858.99, 866.67, 857.76, 861.88, 932.75, 892.25, 867.23, 881.92, 848.89], 'YTD': [306.23, 297.62, 336.31, 351.39, 379.23, 365.07, 431.43, 435.5, 428.13, 395.11, 404.59, 431.78, 415.93, 416.34, 446.36, 463.65, 495.67, 515.62, 811.41, 889.03, 733.77, 860.84, 993.74, 838.55, 861.88, 848.89], '6M': [316.55, 327.11, 307.58, 349.59, 372.25, 386.78, 415.19, 410.63, 455.25, 420.22, 420.6, 421.23, 452.92, 407.27, 423.35, 456.08, 487.87, 469.75, 886.22, 854.28, 752, 842.96, 993.74, 838.55, 861.88, 848.89], '1Y': [228.65, 236.67, 241.76, 250.95, 268.14, 263.05, 302.69, 282.14, 278.03, 290.95, 285.98, 313.56, 360.25, 342.11, 349.3, 336.63, 355.58, 379.08, 377.9, 377.84, 326.6, 314.56, 344.31, 325.1, 315.15, 308.58, 310.79, 317.41, 321.6, 362.53, 373.52, 360.16, 415.19, 410.63, 455.25, 420.22, 420.6, 421.23, 452.92, 421.29, 435.65, 441.1, 495.67, 515.62, 811.41, 854.28, 752, 842.96, 993.74, 838.55, 861.88, 848.89] },
      velocityScore: { '1D': 0, '1W': 2.4, '1M': -56.4, '6M': null }, isNew: false,
      marketCap: '$26B', pe: 75.8, revenueGrowth: 92, eps: 11.2, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 6.32, PRN: 4.39, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 5.18, proScore: 2.07, coverage: 0.4,
      price: 1006.29, weeklyPrices: [1022.28, 984.24, 994.45, 1057.01, 1006.29], weeklyChange: -1.56, dayChange: -4.8, sortRank: 0, periodReturns: { '1M': 10.8, 'YTD': 75.7, '6M': 72.6, '1Y': 163.5 },
      priceHistory: { '1D': [1057.01, 1014.68, 1012.88, 1014.27, 1019.74, 1013.48, 1016.48, 1010, 1008.55, 1014.73, 1014.58, 1012.97, 1012.82, 1009.78, 1015.15, 1012.78, 1014.36, 1017.81, 1014.46, 1014.1, 1010.18, 1007.23, 1005.87, 1006.29], '1W': [1022.28, 984.24, 994.45, 1057.01, 1006.29], '1M': [908.55, 909.93, 887.67, 875.87, 865.36, 926.18, 940.48, 904.28, 915.64, 914.7, 856.16, 897.63, 910.57, 933.93, 945.46, 985.82, 1022.28, 984.24, 994.45, 1057.01, 1006.29], 'YTD': [572.87, 608.13, 647.18, 626.62, 665.24, 678.31, 758.29, 759.74, 742.83, 680.9, 700.69, 688.65, 703.19, 717.22, 790.66, 794.65, 835.24, 890.11, 895.69, 920.22, 865.95, 875.87, 940.48, 897.63, 985.82, 1006.29], '6M': [583, 616.1, 629.77, 629, 638.91, 702.89, 742.37, 751.97, 766.61, 731.97, 707.59, 693.62, 719.04, 708.46, 771.58, 770.17, 808.87, 810.05, 926.93, 902.3, 872.56, 887.67, 940.48, 897.63, 985.82, 1006.29], '1Y': [381.88, 397.86, 405.92, 413.71, 433.75, 428.69, 416.52, 417.5, 417.89, 434.91, 423.08, 431.52, 466.54, 465.76, 497.85, 491.3, 527.08, 522.73, 577.26, 563.1, 553.55, 546.13, 575.76, 603.17, 597.89, 576.22, 578.61, 623.09, 636.53, 645.38, 643.28, 691.82, 742.37, 751.97, 766.61, 731.97, 707.59, 693.62, 719.04, 730.32, 787.07, 772.66, 835.24, 890.11, 895.69, 902.3, 872.56, 887.67, 940.48, 897.63, 985.82, 1006.29] },
      velocityScore: { '1D': 0, '1W': 3.5, '1M': -9.2, '6M': null }, isNew: false,
      marketCap: '$463B', pe: 50.1, revenueGrowth: 22, eps: 20.08, grossMargin: 29, dividendYield: 0.62,
      etfPresence: { AIRR: false, PRN: 3.48, RSHO: 6.89, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 5.01, proScore: 2, coverage: 0.4,
      price: 288.59, weeklyPrices: [307.80, 291.50, 294.49, 309.20, 288.59], weeklyChange: -6.24, dayChange: -6.67, sortRank: 0, periodReturns: { '1M': -1.2, 'YTD': 171.6, '6M': 154, '1Y': 334.3 },
      priceHistory: { '1D': [309.2, 292.68, 290.03, 297.91, 293.11, 292.47, 289.3, 283.07, 279.52, 282.29, 285.34, 284.97, 284.44, 284.83, 284.63, 286.95, 287.81, 291.82, 290.63, 288.26, 287.61, 287.45, 288.92, 288.59], '1W': [307.8, 291.5, 294.49, 309.2, 288.59], '1M': [291.97, 295.94, 288.9, 284.42, 288.12, 299.73, 300.06, 284.87, 293.6, 283.51, 262.34, 290.5, 294.75, 303.53, 292.7, 297.2, 307.8, 291.5, 294.49, 309.2, 288.59], 'YTD': [106.26, 119.94, 135.18, 139.32, 152.31, 179.6, 197.63, 182.27, 174.53, 161.22, 171.19, 175.13, 174.8, 182.6, 230.94, 241.01, 252.18, 277.27, 305.93, 296.98, 270.75, 284.42, 300.06, 290.5, 297.2, 288.59], '6M': [113.62, 120.46, 128.85, 142.76, 147.43, 151.08, 190.09, 180.99, 183, 170.96, 171.73, 167.41, 194.85, 180.36, 218.07, 229.73, 242.77, 253.49, 320.3, 300.84, 271.05, 288.9, 300.06, 290.5, 297.2, 288.59], '1Y': [66.46, 72.55, 70.87, 76.08, 82.79, 75.89, 81.28, 85.17, 83.64, 90.42, 89.41, 95.89, 99.1, 96.99, 101.35, 100.35, 110.24, 121.66, 127.8, 121.79, 109.4, 98.12, 107.74, 114.04, 112.36, 110.97, 111.96, 120, 133.04, 140.62, 147.81, 175.77, 190.09, 180.99, 183, 170.96, 171.73, 167.41, 194.85, 184.68, 230.81, 232.81, 252.18, 277.27, 305.93, 300.84, 271.05, 288.9, 300.06, 290.5, 297.2, 288.59] },
      velocityScore: { '1D': 0.5, '1W': -4.8, '1M': 7.5, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 56.1, revenueGrowth: 7, eps: 5.14, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { AIRR: 2.69, PRN: false, RSHO: 7.33, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.64, proScore: 1.86, coverage: 0.4,
      price: 1933.77, weeklyPrices: [2066.51, 1908.07, 1954.47, 2017.57, 1933.77], weeklyChange: -6.42, dayChange: -4.15, sortRank: 0, periodReturns: { '1M': 2.7, 'YTD': 107.2, '6M': 100.6, '1Y': 274.7 },
      priceHistory: { '1D': [2017.57, 1883.87, 1903.05, 1920.68, 1916.93, 1916.03, 1907.49, 1900.98, 1902.88, 1910.78, 1936.98, 1926.28, 1929.61, 1942.5, 1952.95, 1945.91, 1941.8, 1944.3, 1937.45, 1937.46, 1931.81, 1938.6, 1936.15, 1933.77], '1W': [2066.51, 1908.07, 1954.47, 2017.57, 1933.77], '1M': [1883.56, 1867.09, 1855.15, 1828.21, 1787.88, 1850.04, 1914.65, 1843.94, 1852.03, 1831.56, 1719.48, 1843.42, 1877.61, 1952.02, 1913.94, 1967.41, 2066.51, 1908.07, 1954.47, 2017.57, 1933.77], 'YTD': [933.29, 971.49, 1091.04, 1121.44, 1171.46, 1147.97, 1300.02, 1462.23, 1429.37, 1279.06, 1373.76, 1444.6, 1358.66, 1417.19, 1592.84, 1650.47, 1773.91, 1840.25, 1942.02, 2042.36, 1835.33, 1828.21, 1914.65, 1843.42, 1967.41, 1933.77], '6M': [963.83, 1032.31, 1038.18, 1134.75, 1160.38, 1209.97, 1269.63, 1319.47, 1450.6, 1430.38, 1407.32, 1423, 1470.64, 1378.99, 1525.16, 1648.96, 1724.49, 1724.14, 2011.49, 2034.63, 1835.51, 1855.15, 1914.65, 1843.42, 1967.41, 1933.77], '1Y': [516.08, 540.98, 539.5, 554.18, 688.74, 695.3, 691.76, 689.86, 694, 730.01, 706.31, 753.69, 797.71, 804.36, 818.01, 816.07, 827.92, 981.66, 965.58, 955.26, 897.52, 876.19, 976.94, 1001.48, 967.95, 940.74, 950.67, 1035.11, 1073.14, 1148, 1169.05, 1119.81, 1269.63, 1319.47, 1450.6, 1430.38, 1407.32, 1423, 1470.64, 1428.52, 1574.45, 1605.97, 1773.91, 1840.25, 1942.02, 2034.63, 1835.51, 1855.15, 1914.65, 1843.42, 1967.41, 1933.77] },
      velocityScore: { '1D': 0.5, '1W': 1.1, '1M': -58.8, '6M': null }, isNew: false,
      marketCap: '$68B', pe: 55.7, revenueGrowth: 1, eps: 34.7, grossMargin: 25, dividendYield: 0.13,
      etfPresence: { AIRR: 4.5, PRN: 4.78, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, avgWeight: 4.55, proScore: 1.82, coverage: 0.4,
      price: 761.24, weeklyPrices: [790.00, 736.77, 732.24, 753.07, 761.24], weeklyChange: -3.64, dayChange: 1.08, sortRank: 0, periodReturns: { '1M': 13.5, 'YTD': 143, '6M': 134.1, '1Y': 252.9 },
      priceHistory: { '1D': [753.07, 724.51, 730.18, 749.89, 750.41, 753.08, 749.03, 750.67, 749.09, 751.15, 756.35, 758.66, 760.21, 762.18, 759.54, 762.18, 760.1, 766.71, 762.48, 764.13, 763.89, 762.26, 765.53, 761.24], '1W': [790, 736.77, 732.24, 753.07, 761.24], '1M': [670.66, 673.51, 677.45, 667.02, 646.89, 686.37, 689.43, 694.72, 619.98, 613.93, 588.9, 623.66, 641.68, 688.87, 690.39, 738.85, 790, 736.77, 732.24, 753.07, 761.24], 'YTD': [313.32, 313.98, 329.66, 363.88, 355.51, 345.97, 413.65, 437.61, 451.25, 414.2, 459.3, 479.9, 410.85, 575.16, 603.84, 597.88, 656.79, 669.98, 690, 740.91, 644.64, 667.02, 689.43, 623.66, 738.85, 761.24], '6M': [325.14, 339.54, 309.26, 384.34, 362.58, 381.73, 371.47, 414.12, 442.34, 463.36, 472.86, 469.81, 437.48, 544.65, 588.28, 606.43, 651.68, 630.07, 727.54, 719.92, 630.5, 677.45, 689.43, 623.66, 738.85, 761.24], '1Y': [215.68, 211.09, 212.25, 206.63, 235.91, 225.27, 239.02, 224.54, 218.29, 242.08, 211.51, 230.31, 260.64, 266.73, 262.26, 256.15, 283.94, 296.55, 306.21, 311.58, 335.1, 353.3, 395.2, 313.7, 319.91, 325.59, 320.73, 330.42, 314.09, 397.42, 358.87, 354.14, 371.47, 414.12, 442.34, 463.36, 472.86, 469.81, 437.48, 571.38, 609.29, 601.83, 656.79, 669.98, 690, 719.92, 630.5, 677.45, 689.43, 623.66, 738.85, 761.24] },
      velocityScore: { '1D': 0.6, '1W': 1.1, '1M': -56.8, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 67, revenueGrowth: 50, eps: 11.37, grossMargin: 21, dividendYield: 0.27,
      etfPresence: { AIRR: 4.47, PRN: 4.63, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Argan Inc is an engineering and construction company for power generation facilities — natural gas and renewable power plants. It appears in Industrials ETFs because power plant construction is one of the fastest-growing categories in U.S. infrastructure spending, driven by data center load additions that the grid cannot currently support.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.94, proScore: 1.57, coverage: 0.4,
      price: 335.66, weeklyPrices: [338.07, 330.90, 333.78, 343.54, 335.66], weeklyChange: -0.71, dayChange: -2.29, sortRank: 0, periodReturns: { '1M': 7.8, 'YTD': 30.7, '6M': 26.8, '1Y': 44.6 },
      priceHistory: { '1D': [343.54, 341.11, 338.96, 340.76, 340.55, 338.89, 338.01, 337.48, 337.57, 337.55, 338.43, 337.81, 337.83, 337.24, 336.15, 336.95, 336.74, 337.5, 336.2, 336.14, 335.82, 336.04, 335.63, 335.66], '1W': [338.07, 330.9, 333.78, 343.54, 335.66], '1M': [311.33, 312.65, 308.53, 303.81, 300.98, 313.39, 313.67, 315.29, 314.42, 322.81, 314.08, 318.89, 320.11, 316.18, 324.38, 337.96, 338.07, 330.9, 333.78, 343.54, 335.66], 'YTD': [256.77, 264.62, 282.47, 280.14, 259.51, 287.03, 279.03, 281.97, 282.58, 267.78, 259.88, 256.58, 260.51, 267.12, 289.01, 291.03, 294.4, 305.75, 310.37, 315.72, 305.66, 303.81, 313.67, 318.89, 337.96, 335.66], '6M': [264.78, 263.15, 273.7, 277.44, 262.34, 273.22, 283.73, 279.27, 280.76, 279.91, 270.13, 258.51, 266, 265.32, 280.74, 284.56, 289.82, 296.57, 315.39, 310.87, 306.25, 308.53, 313.67, 318.89, 337.96, 335.66], '1Y': [232.21, 245.74, 253.91, 260.7, 272.13, 264.18, 263.13, 273.04, 258.76, 266.47, 265.44, 263.19, 260.45, 261.43, 258.41, 246.04, 247.92, 260.29, 257.09, 258.92, 250.89, 242.52, 258.82, 257.91, 261.74, 262.41, 263.4, 265.39, 278.77, 284, 256.26, 289.94, 283.73, 279.27, 280.76, 279.91, 270.13, 258.51, 266, 269.36, 286.41, 284.39, 294.4, 305.75, 310.37, 310.87, 306.25, 308.53, 313.67, 318.89, 337.96, 335.66] },
      velocityScore: { '1D': 0, '1W': 12.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 31.7, revenueGrowth: 7, eps: 10.58, grossMargin: 30, dividendYield: 0.59,
      etfPresence: { AIRR: 1.83, PRN: false, RSHO: 6.04, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 2.82, proScore: 1.13, coverage: 0.4,
      price: 244, weeklyPrices: [246.41, 236.07, 237.22, 244.56, 244.00], weeklyChange: -0.98, dayChange: -0.23, sortRank: 0, periodReturns: { '1M': 11.4, 'YTD': 22, '6M': 17, '1Y': 46.5 },
      priceHistory: { '1D': [244.56, 239.25, 239.48, 242.01, 241.44, 239.99, 240.98, 241.09, 241.15, 241.89, 242.74, 241.66, 242.37, 242.18, 242.98, 244.2, 244.19, 246.21, 245.26, 244.65, 244.95, 244.67, 244.15, 244], '1W': [246.41, 236.07, 237.22, 244.56, 244], '1M': [219.08, 215.34, 213.82, 216.66, 220.92, 234.08, 236.14, 227.8, 229.95, 228.01, 223.63, 233.49, 230.05, 237.06, 234.8, 242.97, 246.41, 236.07, 237.22, 244.56, 244], 'YTD': [200.06, 207.44, 213.61, 211.03, 211.84, 218.02, 230.92, 242.29, 226.94, 204.62, 202.65, 202.36, 200.45, 197.29, 215.97, 223.52, 223.96, 218.91, 205.27, 203.5, 205.39, 216.66, 236.14, 233.49, 242.97, 244], '6M': [208.48, 205.44, 208.56, 217.9, 215.68, 215.43, 231.2, 241.58, 226.66, 222.07, 210.15, 202.46, 201.27, 199.94, 212.22, 219.99, 220.62, 211.36, 212.74, 203.79, 205.55, 213.82, 236.14, 233.49, 242.97, 244], '1Y': [166.5, 173.03, 172.12, 177.85, 180.82, 196.36, 201.57, 186.56, 186.28, 191.13, 187.81, 186.32, 188.04, 182.95, 189.83, 184.77, 184.04, 194.03, 223.89, 221.92, 212.04, 199.31, 215.04, 208.67, 219.94, 203.17, 205.66, 208.63, 211.07, 220.86, 211.34, 212.76, 231.2, 241.58, 226.66, 222.07, 210.15, 202.46, 201.27, 203.16, 215.54, 215.27, 223.96, 218.91, 205.27, 203.79, 205.55, 213.82, 236.14, 233.49, 242.97, 244] },
      velocityScore: { '1D': 0.9, '1W': 0.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 46.7, revenueGrowth: 17, eps: 5.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.68, PRN: false, RSHO: 3.96, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 2, avgWeight: 2.82, proScore: 1.13, coverage: 0.4,
      price: 267.36, weeklyPrices: [280.36, 275.13, 276.06, 273.14, 267.36], weeklyChange: -4.64, dayChange: -2.12, sortRank: 0, periodReturns: { '1M': 2.1, 'YTD': 30.4, '6M': 26.6, '1Y': 51.2 },
      priceHistory: { '1D': [273.14, 259.14, 259.84, 264.4, 262.87, 262.19, 262.05, 263.86, 264.72, 266.3, 267.69, 268.48, 268.41, 267.17, 266.97, 266.03, 266.71, 267.16, 266.52, 267.4, 267.26, 267.85, 267.82, 267.36], '1W': [280.36, 275.13, 276.06, 273.14, 267.36], '1M': [261.89, 258.02, 259.89, 258.25, 255.52, 248.63, 249.33, 251.9, 246.55, 257.16, 249.49, 264.6, 264.67, 270.44, 277.42, 277.66, 280.36, 275.13, 276.06, 273.14, 267.36], 'YTD': [205.02, 210.02, 224.26, 214.89, 208.93, 209.63, 244.79, 258.1, 262.53, 250.13, 243.82, 232.94, 230.51, 232.68, 252.67, 255.69, 246.16, 243.04, 272.54, 272.37, 259.89, 258.25, 249.33, 264.6, 277.66, 267.36], '6M': [211.22, 212.92, 220.15, 220.36, 215.53, 213.49, 224.47, 249.35, 259.64, 260.09, 251.65, 241.93, 241.62, 230.46, 250, 254.04, 240.88, 236.52, 256.43, 273.1, 261.21, 259.89, 249.33, 264.6, 277.66, 267.36], '1Y': [176.85, 181.06, 179.68, 190.49, 189.52, 184.26, 180.75, 175.99, 173.25, 176.16, 178.2, 185.77, 190.23, 193.15, 189.25, 184.09, 189.68, 198.51, 205.95, 206.66, 201.3, 197.92, 204.59, 190.98, 198.31, 203.49, 209.49, 214.69, 219.64, 225, 210.84, 208.61, 224.47, 249.35, 259.64, 260.09, 251.65, 241.93, 241.62, 239.04, 254.06, 247.6, 246.16, 243.04, 272.54, 273.1, 261.21, 259.89, 249.33, 264.6, 277.66, 267.36] },
      velocityScore: { '1D': 0, '1W': -0.9, '1M': -50.4, '6M': null }, isNew: false,
      marketCap: '$107B', pe: 61.9, revenueGrowth: 19, eps: 4.32, grossMargin: 35, dividendYield: 0.18,
      etfPresence: { AIRR: false, PRN: 3.35, RSHO: false, IDEF: 2.29, BILT: false },
      tonyNote: 'Howmet Aerospace is an aerospace structures and engine components manufacturer. It appears in Industrials ETFs for its aerospace and defense exposure — commercial air travel recovery and defense spending growth are the two demand drivers. Revenue grew and margins are expanding as Howmet prices power over OEM customers.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 2, avgWeight: 2.48, proScore: 0.99, coverage: 0.4,
      price: 198.29, weeklyPrices: [210.00, 209.89, 205.65, 204.77, 198.29], weeklyChange: -5.57, dayChange: -3.16, sortRank: 0, periodReturns: { '1M': -3, 'YTD': 14.7, '6M': 12.7, '1Y': 39.8 },
      priceHistory: { '1D': [204.77, 198.66, 199.91, 200.18, 199, 199.91, 199.02, 199.19, 199.22, 199.13, 200.42, 200.1, 201.11, 200.77, 200.29, 201.04, 200.61, 201.3, 200.39, 198.99, 198.73, 198.54, 199.01, 198.29], '1W': [210, 209.89, 205.65, 204.77, 198.29], '1M': [204.38, 198.95, 199.27, 195.88, 188.39, 184.72, 190.76, 185.95, 187.46, 188.96, 183, 194.68, 193.45, 193.94, 196.93, 205.4, 210, 209.89, 205.65, 204.77, 198.29], 'YTD': [172.84, 193.2, 213.25, 207.75, 210.18, 187.42, 196.9, 206.44, 205.98, 195.23, 197.82, 210.12, 205.09, 214.98, 229.57, 235.78, 225.51, 216.39, 209.89, 210.94, 202.52, 195.88, 190.76, 194.68, 205.4, 198.29], '6M': [175.88, 189.02, 206.62, 206.07, 212.4, 210.88, 199.83, 202.25, 208.27, 205.57, 195.98, 208.98, 222.13, 204.49, 231.78, 238.42, 219.1, 208.08, 215.2, 206.83, 202.66, 199.27, 190.76, 194.68, 205.4, 198.29], '1Y': [141.87, 142.91, 137.06, 142.95, 147.96, 149.5, 179.19, 174.7, 165.34, 165.83, 163.64, 168.33, 174.5, 180.62, 186.64, 190.08, 203.12, 203.28, 213.61, 193.55, 177.88, 175.28, 178.88, 177.87, 175.03, 176.43, 175.49, 195.3, 210.54, 209.52, 216.3, 190.1, 199.83, 202.25, 208.27, 205.57, 195.98, 208.98, 222.13, 212.81, 230.29, 230.8, 225.51, 216.39, 209.89, 206.83, 202.66, 199.27, 190.76, 194.68, 205.4, 198.29] },
      velocityScore: { '1D': -2, '1W': 1, '1M': -56.8, '6M': null }, isNew: false,
      marketCap: '$18B', pe: 52.9, revenueGrowth: 26, eps: 3.75, grossMargin: 23, dividendYield: 0.51,
      etfPresence: { AIRR: 3.13, PRN: false, RSHO: false, IDEF: 1.84, BILT: false },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 2, avgWeight: 1.74, proScore: 0.7, coverage: 0.4,
      price: 283.29, weeklyPrices: [278.19, 283.48, 279.62, 279.09, 283.29], weeklyChange: 1.83, dayChange: 1.5, sortRank: 0, periodReturns: { '1M': -11.7, 'YTD': -16.7, '6M': -19.3, '1Y': 18.1 },
      priceHistory: { '1D': [279.09, 282.49, 282.96, 281.17, 281.97, 282.23, 281.93, 281.65, 282.8, 283.62, 284.01, 284.67, 285.55, 285.57, 285.04, 285.31, 285.64, 285.84, 284.61, 284.96, 283.74, 283.69, 283.23, 283.29], '1W': [278.19, 283.48, 279.62, 279.09, 283.29], '1M': [320.95, 317.56, 320.9, 308.17, 296.41, 287.54, 294.53, 293.04, 292.26, 297.52, 289.13, 300.95, 297.68, 299.66, 298.51, 285.43, 278.19, 283.48, 279.62, 279.09, 283.29], 'YTD': [340.07, 378.47, 418.86, 418.58, 427.83, 369.38, 406.76, 437.57, 444.52, 429.11, 414.56, 418.42, 384.79, 396.62, 394.41, 394.81, 370.14, 364.29, 314.72, 336.95, 317.55, 308.17, 294.53, 300.95, 285.43, 283.29], '6M': [351.13, 363.48, 398.25, 415.58, 422.79, 429.64, 399.37, 424.89, 435.58, 437.03, 413.7, 427.99, 402.56, 379.9, 411.35, 398.13, 366.88, 362.17, 319.54, 334.22, 321.92, 320.9, 294.53, 300.95, 285.43, 283.29], '1Y': [239.83, 252.08, 258.18, 254.49, 264.82, 269.83, 264.69, 267.46, 266.48, 275.27, 271.13, 274.71, 275.13, 278.77, 284.24, 282.99, 280.02, 299.91, 322.02, 309.56, 312.67, 301.83, 313.62, 304.58, 326.92, 336.64, 345.73, 367.6, 411.66, 422.68, 425.39, 413.14, 399.37, 424.89, 435.58, 437.03, 413.7, 427.99, 402.56, 393.32, 403.37, 396.17, 370.14, 364.29, 314.72, 334.22, 321.92, 320.9, 294.53, 300.95, 285.43, 283.29] },
      velocityScore: { '1D': -1.4, '1W': -5.4, '1M': -66, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 18.4, revenueGrowth: 13, eps: 15.38, grossMargin: 12, dividendYield: 1.98,
      etfPresence: { AIRR: 2.44, PRN: false, RSHO: false, IDEF: 1.04, BILT: false },
      tonyNote: 'Huntington Ingalls Industries is the only builder of nuclear-powered aircraft carriers for the U.S. Navy. Revenue is government-contracted and predictable; the ETF allocation in Industrials reflects defense spending growth and the Navy\'s backlog of nuclear submarine and carrier construction. A steady-state quality compounder in a market structure with no competition.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 2, avgWeight: 1.59, proScore: 0.64, coverage: 0.4,
      price: 48.41, weeklyPrices: [51.09, 50.80, 47.95, 46.32, 48.41], weeklyChange: -5.25, dayChange: 4.51, sortRank: 0, periodReturns: { '1M': -14.8, 'YTD': -36.2, '6M': -37.7, '1Y': 17.1 },
      priceHistory: { '1D': [46.32, 47.7, 47.62, 48.29, 48.07, 48.4, 48.06, 48.34, 48.22, 48.39, 48.7, 48.55, 48.78, 48.84, 48.88, 48.62, 48.77, 49.04, 48.85, 48.7, 48.69, 48.51, 48.49, 48.41], '1W': [51.09, 50.8, 47.95, 46.32, 48.41], '1M': [56.8, 57.3, 65.19, 64.13, 63.49, 58.43, 63.4, 58.52, 57.73, 56.19, 54.82, 58.78, 57.75, 57.02, 56.34, 54.21, 51.09, 50.8, 47.95, 46.32, 48.41], 'YTD': [75.91, 104.04, 124.56, 110.39, 108.16, 85.25, 87.05, 96.08, 86.18, 87, 89.46, 92.78, 75.86, 67.31, 70.34, 70.99, 65.52, 63.05, 57, 54.85, 54.67, 64.13, 63.4, 58.78, 54.21, 48.41], '6M': [77.7, 89.93, 117.86, 128.68, 118.06, 103.37, 93.48, 97.21, 88.23, 89.13, 88.92, 93.04, 79.98, 70.51, 74.46, 74.66, 68.61, 59.56, 61.52, 52.49, 55.82, 65.19, 63.4, 58.78, 54.21, 48.41], '1Y': [41.33, 44.66, 51.71, 59.12, 59.77, 56.71, 63.88, 69.12, 64.78, 68.51, 64.81, 69.2, 80.77, 86.28, 96.19, 94.63, 83.12, 91.18, 90.6, 77.88, 71.69, 67.31, 76.1, 76.5, 75.96, 75.39, 77.47, 91.93, 119.72, 120.59, 112.67, 91.33, 93.48, 97.21, 88.23, 89.13, 88.92, 93.04, 79.98, 67.7, 68.33, 74.41, 65.52, 63.05, 57, 52.49, 55.82, 65.19, 63.4, 58.78, 54.21, 48.41] },
      velocityScore: { '1D': -4.5, '1W': -16.9, '1M': -68.5, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 284.8, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.26, PRN: false, RSHO: false, IDEF: 0.92, BILT: false },
      tonyNote: 'Kratos Defense is a defense technology company focused on unmanned systems, satellite communications, and high-performance computing for government customers. It appears in Industrials ETFs as an AI-adjacent defense name — autonomous systems and AI-driven surveillance are direct end markets. Revenue grew and the government contract backlog is expanding.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 1.43, proScore: 0.57, coverage: 0.4,
      price: 78.28, weeklyPrices: [74.95, 75.79, 75.87, 77.53, 78.28], weeklyChange: 4.44, dayChange: 0.97, sortRank: 0, periodReturns: { '1M': 2.5, 'YTD': 30.2, '6M': 31.5, '1Y': 24.5 },
      priceHistory: { '1D': [77.53, 77.93, 78.13, 78.04, 78.27, 78.01, 77.96, 77.88, 78.22, 78.28, 78.43, 78.9, 78.83, 78.47, 78.33, 78.36, 78.26, 78.29, 78.21, 78.31, 78.25, 78.39, 78.35, 78.28], '1W': [74.95, 75.79, 75.87, 77.53, 78.28], '1M': [76.34, 74.37, 73.13, 71.39, 70.04, 71.66, 72.43, 71.96, 71.59, 71.59, 72.26, 71.62, 72.08, 71.49, 71.48, 73.12, 74.95, 75.79, 75.87, 77.53, 78.28], 'YTD': [60.11, 61.15, 60.29, 64.96, 67.24, 67.42, 71.13, 72.98, 74.72, 74.24, 73.52, 74.06, 74.06, 72, 72.74, 71.15, 71.65, 76.31, 72.95, 77.69, 77.52, 71.39, 72.43, 71.62, 73.12, 78.28], '6M': [59.52, 61.16, 59.56, 61.51, 65.48, 68.5, 68.84, 72.14, 73.97, 75.77, 74.4, 72.8, 73.81, 72.78, 73.01, 70.76, 71.1, 73.32, 73.76, 75.71, 77.88, 73.13, 72.43, 71.62, 73.12, 78.28], '1Y': [62.87, 58.64, 58.22, 59.35, 57.82, 60.27, 57.89, 57.34, 57.8, 58, 57.2, 58.81, 60.11, 64.01, 64.48, 62.61, 62.46, 57.48, 57.87, 59.58, 59.59, 58.91, 60.93, 62.81, 59.74, 58.26, 59.8, 59.5, 60.49, 63.18, 66.92, 66.46, 68.84, 72.14, 73.97, 75.77, 74.4, 72.8, 73.81, 71.83, 72.82, 70.86, 71.65, 76.31, 72.95, 75.71, 77.88, 73.13, 72.43, 71.62, 73.12, 78.28] },
      velocityScore: { '1D': 0, '1W': 3.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$96B', pe: 34.3, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.71,
      etfPresence: { AIRR: false, PRN: false, RSHO: 0.92, IDEF: false, BILT: 1.93 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AIR', name: 'AIRBUS GROUP', easyScore: 2, avgWeight: 1.36, proScore: 0.54, coverage: 0.4,
      price: 139.96, weeklyPrices: [134.28, 132.26, 132.94, 138.51, 139.96], weeklyChange: 4.23, dayChange: 1.05, sortRank: 0, periodReturns: { '1M': 24.1, 'YTD': 69.1, '6M': 64.5, '1Y': 104.1 },
      priceHistory: { '1D': [138.51, 139.16, 138.65, 139.58, 138.2, 139, 138.68, 138.55, 138.54, 138.9, 139.21, 140.48, 140.62, 140.2, 139.8, 140.04, 139.96, 140.23, 140.23, 140.23, 139.91, 140.3, 140.04, 139.96], '1W': [134.28, 132.26, 132.94, 138.51, 139.96], '1M': [112.74, 112.82, 114.97, 112.62, 109.99, 111.36, 115.53, 116.65, 114.72, 120.13, 117.36, 127.23, 129.01, 131.18, 129.96, 134.88, 134.28, 132.26, 132.94, 138.51, 139.96], 'YTD': [82.79, 94.73, 105.74, 105.66, 106.67, 106.87, 113.22, 116.97, 117.17, 108.52, 103.78, 109.21, 110.82, 109.78, 120.83, 123.04, 112.08, 110.37, 117.82, 108.64, 108.44, 112.62, 115.53, 127.23, 134.88, 139.96], '6M': [85.07, 88.02, 98.23, 103.67, 105.47, 109.89, 113.11, 114.63, 117.06, 118.61, 108.32, 108.85, 118.52, 109.46, 120.78, 122.75, 111.5, 105.69, 118.71, 107.47, 107.51, 114.97, 115.53, 127.23, 134.88, 139.96], '1Y': [68.58, 71.46, 74.84, 83.64, 76.48, 72.99, 74.79, 77.15, 71.73, 75.81, 75.3, 74.19, 75.3, 86.34, 81.8, 78.32, 83.01, 86.48, 84.21, 82.42, 80.08, 77.35, 83.21, 82.7, 83.68, 82.71, 84.51, 89.46, 97.71, 107.06, 104.06, 107.13, 113.11, 114.63, 117.06, 118.61, 108.32, 108.85, 118.52, 111.37, 123.04, 118.51, 112.08, 110.37, 117.82, 107.47, 107.51, 114.97, 115.53, 127.23, 134.88, 139.96] },
      velocityScore: { '1D': 58.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: 30.8, revenueGrowth: 25, eps: 4.54, grossMargin: 19, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 2.55, BILT: false },
      tonyNote: 'AIRBUS GROUP appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RBC', name: 'RBC Bearings Incorporated', easyScore: 2, avgWeight: 1.21, proScore: 0.48, coverage: 0.4,
      price: 629.14, weeklyPrices: [645.73, 633.44, 638.94, 648.89, 629.14], weeklyChange: -2.57, dayChange: -3.04, sortRank: 0, periodReturns: { '1M': 7.7, 'YTD': 40.3, '6M': 37.9, '1Y': 62.3 },
      priceHistory: { '1D': [648.89, 630.58, 629.82, 636.07, 633.73, 634.41, 631.39, 631.2, 631.17, 630.23, 631.92, 630.18, 630.67, 628.76, 624.27, 625.79, 625.71, 627.68, 626.41, 625.43, 625.54, 626.24, 626.73, 629.14], '1W': [645.73, 633.44, 638.94, 648.89, 629.14], '1M': [584.4, 577.42, 577.83, 571.96, 566.14, 584.18, 589.76, 590.09, 590.97, 592.41, 576.74, 607.46, 603.64, 616.95, 621.08, 639.18, 645.73, 633.44, 638.94, 648.89, 629.14], 'YTD': [448.43, 485, 497.06, 504.07, 511.98, 520.16, 550.4, 559.18, 575.92, 552.91, 547.31, 540.83, 548.95, 548.11, 598.3, 589.77, 601.39, 599.09, 611.54, 611.93, 566.96, 571.96, 589.76, 607.46, 639.18, 629.14], '6M': [456.33, 461.21, 488.31, 495.29, 504.54, 516.1, 547.51, 551.65, 565.44, 570.08, 559.52, 547.81, 561.66, 543.12, 580.55, 586.98, 588.74, 584.49, 623.19, 618.91, 571.05, 577.83, 589.76, 607.46, 639.18, 629.14], '1Y': [387.69, 388.59, 378.24, 397.33, 388.37, 399.8, 398.07, 401.92, 390.52, 398.71, 387.48, 375.1, 379.98, 384.82, 373.99, 372.64, 372.85, 412.19, 428.53, 434.25, 431.55, 427.81, 444.97, 443.44, 460.17, 451.06, 456.9, 475.7, 489.97, 504.71, 508.95, 516.78, 547.51, 551.65, 565.44, 570.08, 559.52, 547.81, 561.66, 551.99, 595.11, 571.61, 601.39, 599.09, 611.54, 618.91, 571.05, 577.83, 589.76, 607.46, 639.18, 629.14] },
      velocityScore: { '1D': 0, '1W': 2.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$20B', pe: 69.3, revenueGrowth: 18, eps: 9.08, grossMargin: 45, dividendYield: null,
      etfPresence: { AIRR: 1.87, PRN: false, RSHO: false, IDEF: 0.54, BILT: false },
      tonyNote: 'RBC Bearings Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRCY', name: 'Mercury Systems, Inc.', easyScore: 2, avgWeight: 1.04, proScore: 0.42, coverage: 0.4,
      price: 104.7, weeklyPrices: [111.76, 110.87, 105.00, 105.57, 104.70], weeklyChange: -6.32, dayChange: -0.82, sortRank: 0, periodReturns: { '1M': 5.4, 'YTD': 43.4, '6M': 41.1, '1Y': 103.9 },
      priceHistory: { '1D': [105.57, 105.5, 106.25, 107.56, 107.52, 107.93, 107.3, 108.53, 108.45, 107.76, 107.63, 107.12, 106.17, 105.64, 105.48, 105.11, 104.75, 104.6, 104.31, 103.38, 103.33, 103.91, 104.83, 104.7], '1W': [111.76, 110.87, 105, 105.57, 104.7], '1M': [99.32, 97.11, 108.11, 111.7, 111.28, 111.59, 117.82, 111.27, 110.94, 108.82, 106.81, 119.32, 120.3, 115.93, 112.44, 113.91, 111.76, 110.87, 105, 105.57, 104.7], 'YTD': [73.01, 88.74, 102.95, 99.05, 98.29, 79.07, 80.25, 87.63, 89.03, 86.42, 81.44, 77.81, 76.16, 74.22, 79.6, 84.05, 78.91, 78.91, 88.06, 94.55, 96.36, 111.7, 117.82, 119.32, 113.91, 104.7], '6M': [74.22, 81.29, 97.02, 97.1, 101.04, 99.28, 84.36, 86.66, 89.3, 89.18, 86, 78.97, 78.71, 72.91, 80.81, 85.51, 82.61, 74.75, 91.66, 92.5, 94.81, 108.11, 117.82, 119.32, 113.91, 104.7], '1Y': [51.36, 51.43, 50.96, 51.69, 52.98, 52.17, 52.83, 66.83, 65.64, 68.5, 68.93, 72.24, 75.77, 76.82, 83.5, 73.58, 75.54, 79.42, 77.41, 74.07, 71.26, 66.12, 69.89, 70.58, 74.49, 69.65, 74.93, 84.25, 99.14, 99.57, 100.02, 77.12, 84.36, 86.66, 89.3, 89.18, 86, 78.97, 78.71, 74.75, 79.23, 84.91, 78.91, 78.91, 88.06, 92.5, 94.81, 108.11, 117.82, 119.32, 113.91, 104.7] },
      velocityScore: { '1D': 0, '1W': -6.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: null, revenueGrowth: 12, eps: -0.23, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: 1.08, PRN: false, RSHO: false, IDEF: 1, BILT: false },
      tonyNote: 'Mercury Systems, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, avgWeight: 0.97, proScore: 0.39, coverage: 0.4,
      price: 46.21, weeklyPrices: [47.70, 46.38, 44.84, 46.27, 46.21], weeklyChange: -3.12, dayChange: -0.13, sortRank: 0, periodReturns: { '1M': -23.8, 'YTD': -36.8, '6M': -40.4, '1Y': -7.6 },
      priceHistory: { '1D': [46.27, 46.28, 46.46, 47.8, 47.14, 47.02, 46.84, 46.72, 46.39, 46.72, 47.13, 46.69, 46.9, 46.82, 46.88, 46.76, 46.67, 46.7, 46.54, 46.35, 46.33, 46.44, 46.41, 46.21], '1W': [47.7, 46.38, 44.84, 46.27, 46.21], '1M': [60.66, 63.52, 65.86, 57.5, 53.65, 51.84, 54.39, 49.44, 49.64, 48.37, 45.87, 49.58, 47.83, 48.27, 51.7, 50.37, 47.7, 46.38, 44.84, 46.27, 46.21], 'YTD': [73.17, 101.28, 109.49, 108.22, 110.93, 89.78, 78.71, 81.62, 88.11, 100.54, 98.98, 105.95, 86.01, 85.83, 82.52, 83.58, 76.6, 67.98, 60.45, 66.02, 65.3, 57.5, 54.39, 49.58, 50.37, 46.21], '6M': [77.55, 83.99, 107.5, 106.28, 113.34, 111.72, 91.25, 81, 83.44, 98.88, 104.84, 101.43, 99.6, 80.05, 87.75, 92.73, 82.11, 65.98, 63.19, 67.28, 65.76, 65.86, 54.39, 49.58, 50.37, 46.21], '1Y': [49.99, 45.02, 48.76, 55.74, 50.45, 50.22, 45.78, 50.91, 52.23, 55.45, 62.52, 64.33, 66.12, 68.42, 72.6, 74.71, 75.03, 84.15, 84.24, 70.68, 59.99, 58.96, 67.03, 65.45, 68.44, 71.65, 77.57, 90.41, 107.49, 104.79, 115.29, 97.94, 91.25, 81, 83.44, 98.88, 104.84, 101.43, 99.6, 82.69, 84.22, 87.91, 76.6, 67.98, 60.45, 67.28, 65.76, 65.86, 54.39, 49.58, 50.37, 46.21] },
      velocityScore: { '1D': 2.6, '1W': -11.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: 200.9, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.75, PRN: false, RSHO: false, IDEF: 0.19, BILT: false },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DRS', name: 'Leonardo DRS, Inc.', easyScore: 2, avgWeight: 0.55, proScore: 0.22, coverage: 0.4,
      price: 43.05, weeklyPrices: [44.99, 45.74, 44.69, 44.36, 43.05], weeklyChange: -4.3, dayChange: -2.94, sortRank: 0, periodReturns: { '1M': -6, 'YTD': 26.3, '6M': 25.6, '1Y': -3.5 },
      priceHistory: { '1D': [44.36, 44.42, 44.18, 44.21, 44.08, 43.93, 43.73, 43.62, 43.64, 43.66, 43.77, 43.72, 43.81, 43.58, 43.28, 43.43, 43.39, 43.37, 43.12, 43.07, 42.9, 42.97, 43.15, 43.05], '1W': [44.99, 45.74, 44.69, 44.36, 43.05], '1M': [45.8, 45.35, 48.41, 48.76, 47.96, 45.61, 46.71, 46.15, 46.55, 47.35, 46.11, 49.69, 48.53, 46.68, 45.59, 46.08, 44.99, 45.74, 44.69, 44.36, 43.05], 'YTD': [34.09, 38.84, 42.26, 40.99, 41.3, 37.27, 37.77, 40.03, 43.39, 46.58, 45.91, 45.48, 46.53, 46.3, 46.06, 44.57, 41.41, 40.63, 41.44, 42.86, 44.55, 48.76, 46.71, 49.69, 46.08, 43.05], '6M': [34.28, 37.01, 41.27, 42.07, 42.16, 41.51, 39.48, 39.9, 42.36, 46.95, 46.16, 46.44, 46.32, 44.52, 47.93, 46.29, 42.07, 39.47, 41.79, 42.5, 44.56, 48.41, 46.71, 49.69, 46.08, 43.05], '1Y': [44.6, 46.41, 47.57, 48.13, 48.44, 41.67, 41.49, 41.74, 41.04, 42.47, 41.2, 42.07, 41.44, 43.94, 44.39, 43.23, 39.34, 40.51, 36.56, 35.33, 34.53, 33.08, 34.17, 33.9, 34.46, 33.64, 34.13, 37.46, 40.85, 41.46, 42.47, 38.31, 39.48, 39.9, 42.36, 46.95, 46.16, 46.44, 46.32, 45.86, 47.1, 44.94, 41.41, 40.63, 41.44, 42.5, 44.56, 48.41, 46.71, 49.69, 46.08, 43.05] },
      velocityScore: { '1D': -4.3, '1W': -4.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 40.2, revenueGrowth: 6, eps: 1.07, grossMargin: 24, dividendYield: 0.81,
      etfPresence: { AIRR: 0.8, PRN: false, RSHO: false, IDEF: 0.3, BILT: false },
      tonyNote: 'Leonardo DRS, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TPC', name: 'Tutor Perini Corporation', easyScore: 2, avgWeight: 0.37, proScore: 0.15, coverage: 0.4,
      price: 79.35, weeklyPrices: [81.50, 81.00, 82.36, 81.56, 79.35], weeklyChange: -2.64, dayChange: -2.71, sortRank: 0, periodReturns: { '1M': 6.3, 'YTD': 18.4, '6M': 14.9, '1Y': 72.9 },
      priceHistory: { '1D': [81.56, 79.29, 79.33, 79.67, 80.32, 79.84, 79.72, 79.88, 79.83, 79.95, 80.04, 80.29, 80.36, 80.03, 79.81, 80.09, 80.07, 80.3, 80.29, 79.74, 79.48, 79.5, 79.27, 79.35], '1W': [81.5, 81, 82.36, 81.56, 79.35], '1M': [74.67, 74.47, 73.27, 71.49, 74.26, 72.26, 72.38, 70.53, 72.13, 71.48, 68.72, 73.61, 74.92, 76.55, 76.19, 77.99, 81.5, 81, 82.36, 81.56, 79.35], 'YTD': [67.02, 70.17, 75.17, 76.01, 79.86, 79.95, 81.73, 86.9, 75.37, 72.82, 69.2, 72.31, 76.24, 77.3, 83.35, 84.22, 86.48, 92.92, 81.96, 83.01, 74.88, 71.49, 72.38, 73.61, 77.99, 79.35], '6M': [69.06, 71.79, 74.25, 74.13, 78.53, 82.33, 86, 81.1, 86.1, 73.71, 69.83, 71.21, 78.37, 77.19, 80.54, 86.25, 84.19, 86.04, 96.98, 80.64, 76.99, 73.27, 72.38, 73.61, 77.99, 79.35], '1Y': [45.89, 48.18, 48.98, 50.08, 47.91, 45.65, 56.41, 57.25, 57.02, 59.93, 62.63, 63.96, 65.48, 64.67, 62.41, 60.61, 64.22, 68.84, 67.36, 62.94, 59.64, 59.75, 68.55, 67.82, 67.34, 69.99, 68.66, 71.14, 73.54, 75.27, 79.38, 78.83, 86, 81.1, 86.1, 73.71, 69.83, 71.21, 78.37, 78.71, 81.5, 84.39, 86.48, 92.92, 81.96, 80.64, 76.99, 73.27, 72.38, 73.61, 77.99, 79.35] },
      velocityScore: { '1D': 0, '1W': 7.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 54.3, revenueGrowth: 12, eps: 1.46, grossMargin: 12, dividendYield: 0.29,
      etfPresence: { AIRR: 0.7, PRN: false, RSHO: false, IDEF: 0.04, BILT: false },
      tonyNote: 'Tutor Perini Corporation appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TKR', name: 'TIMKEN CO/THE', easyScore: 1, avgWeight: 8.69, proScore: 1.74, coverage: 0.2,
      price: 139.83, weeklyPrices: [141.97, 137.64, 137.99, 144.01, 139.83], weeklyChange: -1.51, dayChange: -2.9, sortRank: 0, periodReturns: { '1M': 9.7, 'YTD': 66.2, '6M': 61.6, '1Y': 88.9 },
      priceHistory: { '1D': [144.01, 140.42, 139.94, 141.6, 140.64, 140.26, 139.76, 140, 140.03, 140.48, 140.38, 140.2, 140.44, 140.04, 139.44, 140.08, 140.12, 140.09, 140.15, 139.75, 139.74, 139.96, 139.91, 139.83], '1W': [141.97, 137.64, 137.99, 144.01, 139.83], '1M': [127.42, 127.16, 126.78, 127.98, 126.54, 131.82, 133.66, 131.83, 134.67, 137.09, 132.39, 137.4, 137.06, 139.12, 140.28, 142.36, 141.97, 137.64, 137.99, 144.01, 139.83], 'YTD': [84.13, 90.6, 93.73, 93.94, 94.15, 102.15, 107.35, 108.16, 108.38, 99.68, 99.7, 97.44, 99.06, 98.92, 106.75, 107.66, 108.7, 110.89, 116.34, 116.74, 118.93, 127.98, 133.66, 137.4, 142.36, 139.83], '6M': [86.52, 88.34, 90.83, 90.65, 93.89, 96.14, 109.41, 107.23, 107.69, 105.59, 103.33, 98.23, 101.9, 100.57, 105.88, 103.73, 106.79, 106.53, 119.7, 115.74, 117.2, 126.78, 133.66, 137.4, 142.36, 139.83], '1Y': [74.03, 76.67, 78.07, 79.16, 81.66, 73.5, 74.39, 77.08, 75.32, 78.21, 77.78, 77.51, 77.5, 75.55, 76.54, 70.79, 73.17, 78.12, 78.51, 78.99, 77.85, 74.55, 81.39, 83.21, 87.38, 85.26, 86.33, 90.95, 91.68, 93.89, 93.4, 98.99, 109.41, 107.23, 107.69, 105.59, 103.33, 98.23, 101.9, 102.06, 106.92, 103.92, 108.7, 110.89, 116.34, 115.74, 117.2, 126.78, 133.66, 137.4, 142.36, 139.83] },
      velocityScore: { '1D': 0, '1W': -5.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 31.7, revenueGrowth: 8, eps: 4.41, grossMargin: 31, dividendYield: 1,
      etfPresence: { AIRR: false, PRN: false, RSHO: 8.69, IDEF: false, BILT: false },
      tonyNote: 'TIMKEN CO/THE appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RTX', name: 'RTX CORP', easyScore: 1, avgWeight: 8.43, proScore: 1.69, coverage: 0.2,
      price: 189.03, weeklyPrices: [181.83, 186.39, 185.06, 186.59, 189.03], weeklyChange: 3.96, dayChange: 1.31, sortRank: 0, periodReturns: { '1M': 5.6, 'YTD': 3.1, '6M': 2.1, '1Y': 32.5 },
      priceHistory: { '1D': [186.59, 188.94, 189.17, 189.64, 189.59, 189.34, 189.36, 189.41, 189.99, 189.99, 190.08, 190.24, 190.18, 189.82, 189.69, 189.68, 189.55, 189.63, 189.35, 189.01, 188.89, 189.19, 189.27, 189.03], '1W': [181.83, 186.39, 185.06, 186.59, 189.03], '1M': [178.97, 176.59, 178.96, 179.66, 174.41, 172.55, 179.41, 180.99, 178.66, 181.56, 177.41, 184.21, 183.53, 183.64, 186.77, 185.6, 181.83, 186.39, 185.06, 186.59, 189.03], 'YTD': [183.4, 187.17, 199.83, 195.93, 199.88, 195.97, 201.14, 204.92, 202.62, 209.76, 203.04, 200.73, 192.85, 196.21, 201.56, 196.42, 179.3, 176.07, 176.78, 175.68, 175.98, 179.66, 179.41, 184.21, 185.6, 189.03], '6M': [185.17, 188.26, 193.85, 196.36, 201.28, 203.5, 195.19, 204.81, 195.98, 208.82, 207.26, 204.56, 195, 192.9, 203.48, 198.39, 180.91, 172.79, 176.74, 178.11, 174.85, 178.96, 179.41, 184.21, 185.6, 189.03], '1Y': [142.67, 145.75, 146.87, 151.5, 156.88, 156.81, 154.86, 155.08, 156.32, 160.66, 157.52, 155.85, 158.24, 163.35, 166.58, 157.7, 157.95, 178.65, 178.5, 176.97, 173.96, 172.73, 174.91, 171.1, 178.66, 182.01, 184.42, 190.4, 194.08, 197.5, 199.46, 196.74, 195.19, 204.81, 195.98, 208.82, 207.26, 204.56, 195, 194.72, 203.19, 195.85, 179.3, 176.07, 176.78, 178.11, 174.85, 178.96, 179.41, 184.21, 185.6, 189.03] },
      velocityScore: { '1D': 1.2, '1W': 3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$255B', pe: 35.4, revenueGrowth: 9, eps: 5.34, grossMargin: 20, dividendYield: 1.48,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 8.43, BILT: false },
      tonyNote: 'RTX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 4.85, proScore: 4.85, coverage: 1,
      price: 238.6, weeklyPrices: [283.61, 275.25, 259.66, 256.63, 238.60], weeklyChange: -15.87, dayChange: -7.03, sortRank: 0, periodReturns: { '1M': 14.7, 'YTD': 185, '6M': 172.4, '1Y': 353.6 },
      priceHistory: { '1D': [256.63, 242.78, 242.57, 245.04, 242.36, 246, 241.18, 239.11, 237.54, 238.2, 240.42, 239.77, 240.07, 239.08, 238.57, 243.01, 243.61, 245.98, 243.59, 242.49, 240.02, 240.72, 241.44, 238.6], '1W': [283.61, 275.25, 259.66, 256.63, 238.6], '1M': [208.06, 208.37, 226.34, 231.09, 264.51, 251.68, 259.67, 227.81, 218, 220.12, 211.69, 222.24, 232.36, 260.07, 265.1, 286.69, 283.61, 275.25, 259.66, 256.63, 238.6], 'YTD': [83.71, 97.3, 103.89, 94.5, 94.91, 73.87, 89.73, 97.92, 91.19, 89.33, 108.04, 121.52, 105.97, 108.82, 144.97, 157.14, 157.08, 138.23, 184.77, 221.15, 219.93, 231.09, 259.67, 222.24, 286.69, 238.6], '6M': [87.59, 92.83, 107.33, 99.29, 97.87, 89.95, 91.79, 101.8, 106.12, 97.78, 112, 118.56, 115.09, 103.76, 125, 166.77, 156.14, 141.19, 195.09, 207.27, 191.82, 226.34, 259.67, 222.24, 286.69, 238.6], '1Y': [52.6, 50.25, 44.3, 52.79, 51.37, 52, 68.78, 68.46, 66.18, 72.04, 65.47, 90.41, 99.31, 107.7, 127.98, 129.58, 113.44, 117.26, 130.82, 111.28, 88.63, 84.64, 94.87, 98.04, 87.69, 89.46, 86.04, 100.24, 105.43, 98.87, 100.43, 82.39, 91.79, 101.8, 106.12, 97.78, 112, 118.56, 115.09, 101.95, 136.33, 165.34, 157.08, 138.23, 184.77, 207.27, 191.82, 226.34, 259.67, 222.24, 286.69, 238.6] },
      velocityScore: { '1D': -10.2, '1W': -2.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$61B', pe: 92.1, revenueGrowth: 684, eps: 2.59, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 3.76, MEME: 6.92, RKNG: 3.88 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 3, avgWeight: 3.79, proScore: 3.79, coverage: 1,
      price: 39.98, weeklyPrices: [45.20, 45.27, 41.98, 40.95, 39.98], weeklyChange: -11.55, dayChange: -2.37, sortRank: 0, periodReturns: { '1M': -11.4, 'YTD': 63.1, '6M': 66.2, '1Y': 278.6 },
      priceHistory: { '1D': [40.95, 38.51, 38.34, 39.27, 39.55, 40.03, 39.95, 39.52, 39.18, 39.22, 39.38, 39.7, 39.67, 39.37, 39.76, 39.43, 39.5, 39.98, 39.61, 39.72, 39.87, 40.12, 40.16, 39.98], '1W': [45.2, 45.27, 41.98, 40.95, 39.98], '1M': [45.14, 48.98, 49.65, 47.28, 47.94, 44.71, 44.15, 39.62, 40.94, 41.91, 38.92, 41.47, 42.7, 46.47, 46.27, 46.59, 45.2, 45.27, 41.98, 40.95, 39.98], 'YTD': [24.52, 31.94, 35.22, 37.69, 38.07, 27.84, 36.17, 29.04, 27.27, 25.14, 27.48, 26.7, 25.72, 24.56, 26.26, 31.53, 36.35, 34.25, 41.53, 46.71, 48.02, 47.28, 44.15, 41.47, 46.59, 39.98], '6M': [24.05, 30.2, 38.21, 35.46, 41.35, 36.7, 37.47, 31.91, 29.08, 28.65, 28.52, 26.65, 28.37, 23.74, 27.79, 30.81, 32.43, 32.69, 44.24, 45.48, 39.52, 49.65, 44.15, 41.47, 46.59, 39.98], '1Y': [10.56, 10.45, 9.18, 11.93, 10.75, 12.52, 14.2, 14.55, 15.77, 16.6, 13.89, 18.68, 20.48, 21.71, 26.53, 33.99, 34.24, 33.43, 34.66, 30.98, 23.06, 21.37, 27.1, 31.22, 27.86, 27.85, 24.81, 30.26, 36.71, 35.06, 40.22, 31.54, 37.47, 31.91, 29.08, 28.65, 28.52, 26.65, 28.37, 24.49, 25.57, 30.09, 36.35, 34.25, 41.53, 45.48, 39.52, 49.65, 44.15, 41.47, 46.59, 39.98] },
      velocityScore: { '1D': -1.3, '1W': -4.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.11, MEME: 5.77, RKNG: 3.48 },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 5.58, proScore: 3.72, coverage: 0.667,
      price: 2124.24, weeklyPrices: [2273.73, 1963.60, 1914.46, 2335.00, 2124.24], weeklyChange: -6.57, dayChange: -9.03, sortRank: 0, periodReturns: { '1M': 33.6, 'YTD': 794.9, '6M': 749.5, '1Y': 4377.7 },
      priceHistory: { '1D': [2335, 2156.99, 2164.79, 2242.85, 2217.21, 2214.83, 2196.25, 2182.83, 2153.04, 2148.5, 2179.6, 2158.48, 2154.13, 2145.64, 2166.03, 2172.93, 2166.27, 2178.14, 2164.84, 2163.04, 2157.5, 2144.49, 2135.39, 2124.24], '1W': [2273.73, 1963.6, 1914.46, 2335, 2124.24], '1M': [1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2124.24], 'YTD': [237.38, 334.54, 409.24, 473.83, 539.3, 576.2, 630.29, 649.97, 635.36, 527.33, 618.82, 772.09, 603.17, 701.59, 851.77, 920.99, 932.43, 1096.51, 1339.96, 1382.72, 1542.24, 1694.98, 1759.68, 1881.51, 2184.75, 2124.24], '6M': [250.05, 274.08, 389.27, 453.12, 481.43, 695.51, 541.64, 600.4, 632.38, 599.06, 655.43, 753.69, 677.86, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1447.23, 1392.56, 1641.64, 1759.68, 1881.51, 2184.75, 2124.24], '1Y': [47.44, 46.41, 46.09, 42.19, 42.48, 41.33, 44.34, 46.68, 45.5, 50.87, 68.55, 86.13, 102.21, 97.12, 128.41, 116.91, 140.16, 186.16, 199.33, 239.48, 243.57, 195.96, 223.28, 228.47, 206.18, 237.61, 244.25, 349.63, 389.81, 501.29, 527.63, 584.55, 541.64, 600.4, 632.38, 599.06, 655.43, 753.69, 677.86, 692.73, 851.57, 919.47, 932.43, 1096.51, 1339.96, 1447.23, 1392.56, 1641.64, 1759.68, 1881.51, 2184.75, 2124.24] },
      velocityScore: { '1D': -19.7, '1W': -13.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$315B', pe: 72.8, revenueGrowth: 251, eps: 29.19, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 7.83, RKNG: 3.32 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 5.57, proScore: 3.71, coverage: 0.667,
      price: 266.45, weeklyPrices: [345.85, 321.98, 326.19, 309.18, 266.45], weeklyChange: -22.96, dayChange: -13.82, sortRank: 0, periodReturns: { '1M': -11.9, 'YTD': 206.7, '6M': 195.5, '1Y': 1093.2 },
      priceHistory: { '1D': [309.18, 281.8, 277.5, 278.44, 276.71, 274.9, 271.91, 268.91, 266.83, 269.09, 270.6, 269.65, 269.94, 265.95, 268.1, 267.12, 269.02, 272.68, 270.95, 270.55, 271.47, 268.68, 268.12, 266.45], '1W': [345.85, 321.98, 326.19, 309.18, 266.45], '1M': [302.4, 293.8, 290.01, 285, 273.51, 287.32, 291.37, 263.61, 253.57, 259.61, 234.23, 248.88, 260.22, 274.5, 280.88, 328.91, 345.85, 321.98, 326.19, 309.18, 266.45], 'YTD': [86.89, 121.84, 139.17, 144.89, 156.51, 136.6, 139.03, 147.55, 155.67, 135.19, 157.17, 166.69, 133.52, 135.63, 166.7, 207.86, 237.57, 283.36, 258.64, 303.41, 307.88, 285, 291.37, 248.88, 328.91, 266.45], '6M': [90.18, 103.87, 136.87, 151.75, 152.31, 168.89, 148.7, 157.27, 174.77, 164.78, 159.21, 156.58, 150.22, 135.49, 146.78, 213.84, 229.75, 287.97, 285.47, 289.76, 282.31, 290.01, 291.37, 248.88, 328.91, 266.45], '1Y': [22.33, 24.24, 25.4, 24.99, 34.34, 36.72, 36.8, 45.11, 44.83, 54.8, 57.07, 67.26, 84.93, 70.32, 90.29, 86.87, 111.5, 110.38, 132.16, 135.21, 103.55, 93.38, 109.24, 119.18, 94.98, 88.82, 88.41, 103.05, 139.77, 150.56, 165.39, 147.35, 148.7, 157.27, 174.77, 164.78, 159.21, 156.58, 150.22, 132.45, 160.13, 210.06, 237.57, 283.36, 258.64, 289.76, 282.31, 290.01, 291.37, 248.88, 328.91, 266.45] },
      velocityScore: { '1D': -9.1, '1W': 10.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$76B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 7.1, RKNG: 4.04 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 2, avgWeight: 4.87, proScore: 3.24, coverage: 0.667,
      price: 585.24, weeklyPrices: [732.62, 670.75, 643.83, 675.39, 585.24], weeklyChange: -20.12, dayChange: -13.35, sortRank: 0, periodReturns: { '1M': 11.5, 'YTD': 239.7, '6M': 222.4, '1Y': 821.5 },
      priceHistory: { '1D': [675.39, 623.1, 619.02, 624.74, 617.99, 616.97, 615.4, 614.77, 605.33, 605.16, 605.83, 602.12, 604.28, 603.44, 604.25, 602.25, 597.42, 598.99, 594.26, 593.31, 596.89, 592.87, 588, 585.24], '1W': [732.62, 670.75, 643.83, 675.39, 585.24], '1M': [524.65, 530.6, 531.18, 531.21, 546.2, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 746.23, 732.62, 670.75, 643.83, 675.39, 585.24], 'YTD': [172.27, 187.68, 222.1, 236.39, 278.41, 260.19, 284.1, 285.52, 279.7, 245.25, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 403.12, 434.52, 463.91, 489.15, 486.46, 531.21, 575.5, 529.29, 746.23, 585.24], '6M': [181.54, 187.88, 212.14, 222.97, 252.66, 290.24, 262.56, 296.56, 290.95, 261.3, 268.81, 304.9, 296.14, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 459.62, 531.18, 575.5, 529.29, 746.23, 585.24], '1Y': [63.51, 66.08, 66.14, 68, 68.82, 76.55, 74.97, 76.24, 74.66, 82.04, 92.04, 97.66, 106.63, 106.88, 131.31, 115.42, 126.2, 129.43, 150.21, 162.96, 157.16, 140.23, 163.33, 168.89, 176.34, 181.08, 179.68, 219.38, 214, 241.9, 279.7, 269.41, 262.56, 296.56, 290.95, 261.3, 268.81, 304.9, 296.14, 297.73, 337.88, 361.69, 403.12, 434.52, 463.91, 494.09, 459.62, 531.18, 575.5, 529.29, 746.23, 585.24] },
      velocityScore: { '1D': -13.6, '1W': 82, '1M': null, '6M': null }, isNew: false,
      marketCap: '$202B', pe: 35.1, revenueGrowth: 46, eps: 16.68, grossMargin: 45, dividendYield: 0.09,
      etfPresence: { BUZZ: false, MEME: 5.76, RKNG: 3.97 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 2, avgWeight: 4.29, proScore: 2.86, coverage: 0.667,
      price: 47.72, weeklyPrices: [56.87, 54.72, 50.30, 47.74, 47.72], weeklyChange: -16.08, dayChange: -0.04, sortRank: 0, periodReturns: { '1M': -20.2, 'YTD': 26.4, '6M': 18.4, '1Y': 264 },
      priceHistory: { '1D': [47.74, 45.71, 45.6, 46.43, 46.05, 46.4, 46.54, 46.16, 46.22, 46.55, 47.51, 47.43, 47.67, 47.27, 47.79, 47.55, 47.77, 48.3, 47.77, 47.57, 47.72, 48.12, 47.94, 47.72], '1W': [56.87, 54.72, 50.3, 47.74, 47.72], '1M': [59.78, 67.84, 64.05, 63.54, 65.33, 65.48, 61.86, 54.35, 59.19, 54.02, 51.52, 56.71, 59.77, 60.85, 59.18, 59.96, 56.87, 54.72, 50.3, 47.74, 47.72], 'YTD': [37.77, 45.68, 51.89, 56.68, 59.84, 39.79, 40.03, 39.98, 40.95, 36.7, 41.37, 41.66, 37.45, 34.77, 39.32, 48.12, 52.02, 45.51, 56.85, 58.4, 58.06, 63.54, 61.86, 56.71, 59.96, 47.72], '6M': [40.3, 48.24, 50.33, 54.26, 59.99, 54.39, 42.93, 42.08, 44.03, 43.84, 41.98, 42.21, 41.43, 34.28, 36.83, 48.82, 48.39, 42.86, 60.98, 55.17, 52.71, 64.05, 61.86, 56.71, 59.96, 47.72], '1Y': [13.11, 16.82, 16.23, 17.94, 17.72, 15.4, 18.45, 19.08, 19.59, 23.04, 26.15, 33.96, 38.64, 41.86, 50.46, 59.77, 60.72, 62.9, 60.75, 62.38, 48.65, 43.47, 47.81, 44.71, 40.13, 39.92, 39.41, 45.91, 52.99, 53.48, 62.94, 44.94, 42.93, 42.08, 44.03, 43.84, 41.98, 42.21, 41.43, 34.09, 37.06, 47.7, 52.02, 45.51, 56.85, 55.17, 52.71, 64.05, 61.86, 56.71, 59.96, 47.72] },
      velocityScore: { '1D': -27.4, '1W': -27.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$17B', pe: 62, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 2.93, MEME: 5.65, RKNG: false },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 2, avgWeight: 4.07, proScore: 2.71, coverage: 0.667,
      price: 72.32, weeklyPrices: [73.19, 72.87, 68.01, 65.62, 72.32], weeklyChange: -1.19, dayChange: 10.21, sortRank: 0, periodReturns: { '1M': -39.6, 'YTD': -0.4, '6M': 0.5, '1Y': 42.9 },
      priceHistory: { '1D': [65.62, 68.25, 69.06, 70.57, 70.83, 71.29, 71.42, 70.67, 70.77, 71.42, 72.22, 71.99, 71.93, 72.27, 72.83, 72.11, 72.87, 73.11, 72.67, 72.75, 72.95, 72.93, 73.07, 72.32], '1W': [73.19, 72.87, 68.01, 65.62, 72.32], '1M': [119.7, 129.6, 133.09, 113.41, 105.65, 107.73, 107.29, 93.6, 92.06, 88.71, 87.32, 97.56, 82.41, 87.57, 82.25, 80.66, 73.19, 72.87, 68.01, 65.62, 72.32], 'YTD': [72.63, 90.56, 101.25, 113.57, 122.09, 93.27, 82.22, 80.2, 79.19, 89.47, 87.09, 94.09, 87.86, 92.62, 94.9, 85.53, 78.75, 73.9, 65.35, 83.01, 96.23, 113.41, 107.29, 97.56, 80.66, 72.32], '6M': [71.95, 90.92, 98.39, 112.44, 111.34, 115.76, 96.27, 84.43, 82.36, 104.89, 88.21, 90.74, 96.06, 82.87, 96.46, 86.91, 84.66, 69.85, 70.68, 74.81, 89.58, 133.09, 107.29, 97.56, 80.66, 72.32], '1Y': [50.62, 45.6, 45.58, 57.98, 54.33, 52.46, 46.63, 48.5, 44.98, 48.95, 42.41, 38.72, 45.1, 49.09, 67.76, 82.03, 83.49, 73.7, 80.25, 69.19, 61.44, 50.7, 56.2, 73.92, 76.7, 75.84, 71.47, 97.49, 92.72, 103.5, 121.23, 103.5, 96.27, 84.43, 82.36, 104.89, 88.21, 90.74, 96.06, 83.99, 91.61, 90.94, 78.75, 73.9, 65.35, 74.81, 89.58, 133.09, 107.29, 97.56, 80.66, 72.32] },
      velocityScore: { '1D': -19.1, '1W': -26.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$28B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.27, MEME: 5.87, RKNG: false },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 2, avgWeight: 3.38, proScore: 2.26, coverage: 0.667,
      price: 1148.44, weeklyPrices: [1211.38, 1051.77, 1048.51, 1213.56, 1148.44], weeklyChange: -5.2, dayChange: -5.37, sortRank: 0, periodReturns: { '1M': 28.2, 'YTD': 302.4, '6M': 303.3, '1Y': 811.5 },
      priceHistory: { '1D': [1213.56, 1144.96, 1148.87, 1192.91, 1176, 1174.57, 1163.56, 1162.42, 1154.62, 1161.92, 1173.44, 1164.51, 1165.24, 1168.26, 1185.4, 1181.86, 1179.43, 1186.09, 1177.83, 1172.64, 1168.23, 1159.21, 1152.07, 1148.44], '1W': [1211.38, 1051.77, 1048.51, 1213.56, 1148.44], '1M': [895.88, 928.41, 923.52, 971, 1035.5, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1148.44], 'YTD': [285.41, 327.02, 336.63, 399.65, 435.79, 382.89, 413.97, 428.17, 412.37, 370.3, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 481.72, 517.16, 646.63, 776.01, 762.1, 971, 996, 995.87, 1133.99, 1148.44], '6M': [284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 418.69, 461.73, 382.09, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 923.52, 996, 995.87, 1133.99, 1148.44], '1Y': [126, 122.29, 124.53, 114.39, 111.26, 104.88, 118.89, 125.29, 115.79, 122, 131.37, 157.23, 162.73, 157.27, 187.83, 181.6, 202.38, 219.02, 223.77, 237.92, 236.95, 201.37, 236.48, 237.22, 241.14, 265.92, 294.37, 343.43, 338.13, 389.11, 435.28, 379.4, 373.25, 420.95, 429, 400.77, 418.69, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 517.16, 646.63, 803.63, 731.99, 923.52, 996, 995.87, 1133.99, 1148.44] },
      velocityScore: { '1D': -31.5, '1W': -31.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.3T', pe: 25.9, revenueGrowth: 346, eps: 44.29, grossMargin: 73, dividendYield: 0.04,
      etfPresence: { BUZZ: 3.21, MEME: false, RKNG: 3.56 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'AMD', easyScore: 2, avgWeight: 3.3, proScore: 2.2, coverage: 0.667,
      price: 517.85, weeklyPrices: [551.63, 519.85, 519.74, 532.57, 517.85], weeklyChange: -6.12, dayChange: -2.76, sortRank: 0, periodReturns: { '1M': 2.8, 'YTD': 141.8, '6M': 140.9, '1Y': 260.4 },
      priceHistory: { '1D': [532.57, 513.63, 512.19, 520.7, 519.76, 521.97, 516.9, 516.44, 513.08, 517, 517.05, 518.36, 519.16, 518.65, 519.11, 519.18, 520.77, 521.63, 519.46, 523.68, 522.45, 519.24, 519.43, 517.85], '1W': [551.63, 519.85, 519.74, 532.57, 517.85], '1M': [503.89, 495.54, 518.09, 516.1, 510.13, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 537.37, 551.63, 519.85, 519.74, 532.57, 517.85], 'YTD': [214.16, 204.68, 227.92, 259.68, 252.18, 192.5, 205.94, 200.15, 200.21, 192.43, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 305.33, 354.49, 408.46, 449.7, 449.59, 516.1, 523.2, 488.45, 537.37, 517.85], '6M': [214.99, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 204.83, 199.46, 220.27, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 518.09, 523.2, 488.45, 537.37, 517.85], '1Y': [143.68, 137.91, 146.42, 156.99, 166.47, 171.7, 172.76, 180.95, 163.71, 168.58, 151.14, 158.57, 157.39, 159.46, 164.67, 214.9, 233.08, 252.92, 256.12, 233.54, 247.96, 206.02, 217.53, 217.97, 210.78, 213.43, 215.61, 214.35, 220.97, 249.8, 252.74, 200.19, 213.57, 200.12, 210.86, 202.07, 204.83, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 354.49, 408.46, 445.5, 447.58, 518.09, 523.2, 488.45, 537.37, 517.85] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$844B', pe: 173.8, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { BUZZ: 3.23, MEME: false, RKNG: 3.37 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'INTC', name: 'INTC', easyScore: 2, avgWeight: 3.27, proScore: 2.18, coverage: 0.667,
      price: 127.5, weeklyPrices: [140.94, 132.28, 131.65, 132.87, 127.50], weeklyChange: -9.54, dayChange: -4.04, sortRank: 0, periodReturns: { '1M': 3.2, 'YTD': 245.5, '6M': 252.2, '1Y': 466.7 },
      priceHistory: { '1D': [132.87, 126.41, 127.46, 130.88, 129.78, 129.67, 129.23, 129.01, 127.88, 128.9, 128.9, 128.3, 129.03, 128.52, 129.25, 128.51, 129.35, 129.94, 128.9, 129.19, 129, 128.3, 128.24, 127.5], '1W': [140.94, 132.28, 131.65, 132.87, 127.5], '1M': [123.52, 121.77, 120.89, 114.68, 109.33, 112.71, 111.78, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 133.99, 140.94, 132.28, 131.65, 132.87, 127.5], 'YTD': [36.9, 41.11, 48.32, 45.07, 48.66, 48.24, 46.48, 44.11, 45.61, 43.42, 45.25, 46.18, 44.1, 50.38, 62.38, 68.5, 66.78, 94.48, 109.62, 115.93, 118.5, 114.68, 111.78, 116.96, 133.99, 127.5], '6M': [36.2, 39.37, 44.06, 48.56, 43.93, 49.25, 47.13, 45.46, 46.88, 45.58, 47.98, 45.03, 47.18, 44.13, 58.95, 64.94, 65.27, 94.75, 113.01, 120.29, 118.96, 120.89, 111.78, 116.96, 133.99, 127.5], '1Y': [22.5, 22.49, 23.43, 23.1, 20.7, 19.31, 19.95, 23.86, 23.5, 24.93, 24.49, 24.08, 29.58, 35.5, 36.83, 36.37, 37.01, 38.28, 39.99, 38.13, 35.91, 33.62, 40.56, 41.41, 37.81, 36.82, 36.68, 40.04, 47.29, 54.25, 48.78, 48.6, 47.13, 45.46, 46.88, 45.58, 47.98, 45.03, 47.18, 48.03, 61.72, 68.5, 66.78, 94.48, 109.62, 120.29, 118.96, 120.89, 111.78, 116.96, 133.99, 127.5] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$641B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 3.07, MEME: false, RKNG: 3.47 },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab', easyScore: 2, avgWeight: 2.42, proScore: 1.61, coverage: 0.667,
      price: 85.45, weeklyPrices: [100.29, 95.12, 85.41, 80.69, 85.45], weeklyChange: -14.8, dayChange: 5.9, sortRank: 0, periodReturns: { '1M': -40.3, 'YTD': 22.5, '6M': 20.9, '1Y': 136.4 },
      priceHistory: { '1D': [80.69, 83.73, 83.38, 84.43, 84.32, 84.84, 84.61, 84.18, 84.13, 84.68, 85.78, 85.61, 85.65, 85.91, 85.78, 85.15, 85.42, 85.84, 85.17, 85.38, 85.86, 85.46, 85.49, 85.45], '1W': [100.29, 95.12, 85.41, 80.69, 85.45], '1M': [143.2, 150.23, 148.03, 143.48, 122.39, 114.7, 119.95, 110.08, 113.65, 108.23, 105.05, 114.78, 102.39, 109.25, 104.63, 107.24, 100.29, 95.12, 85.41, 80.69, 85.45], 'YTD': [69.76, 83.08, 90.76, 88.9, 85.68, 66.32, 66.01, 70.86, 69.1, 70.11, 68.37, 71.93, 65.94, 67.73, 68.05, 84.8, 84.6, 82.51, 78.58, 132.55, 125.45, 143.48, 119.95, 114.78, 107.24, 85.45], '6M': [70.65, 78.14, 87.9, 89.16, 87, 81.27, 72.03, 74.42, 70.2, 71.91, 71.96, 69.48, 72.88, 64.22, 69.08, 73.6, 90.04, 77.02, 84.65, 124.15, 134.28, 148.03, 119.95, 114.78, 107.24, 85.45], '1Y': [36.14, 35.66, 39.03, 51.39, 47.43, 44.81, 44.69, 42.81, 41.53, 47.91, 45.84, 53.34, 47.79, 46.26, 56.16, 64.26, 66.27, 64.56, 62.98, 51.64, 45.25, 39.48, 42.14, 49.06, 61.49, 70.52, 70.12, 86.03, 86.58, 87.82, 88.57, 73.11, 72.03, 74.42, 70.2, 71.91, 71.96, 69.48, 72.88, 65.52, 66.74, 82.93, 84.6, 82.51, 78.58, 124.15, 134.28, 148.03, 119.95, 114.78, 107.24, 85.45] },
      velocityScore: { '1D': -4.7, '1W': -11.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$53B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 1.79, MEME: false, RKNG: 3.04 },
      tonyNote: 'Rocket Lab is the small-launch and space systems name that Electrification and AI infrastructure ETFs hold for satellite connectivity exposure — relevant to both GPS-dependent grids and low-orbit broadband that supports remote AI compute. Small market cap, no earnings, but consistent revenue growth and a rapidly expanding backlog.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 1, avgWeight: 7.48, proScore: 2.49, coverage: 0.333,
      price: 138.38, weeklyPrices: [171.23, 147.44, 146.97, 138.54, 138.38], weeklyChange: -19.18, dayChange: -0.12, sortRank: 0, periodReturns: { '1M': -22.1, 'YTD': 297, '6M': 272.3, '1Y': 398.3 },
      priceHistory: { '1D': [138.54, 128.7, 128.45, 132.3, 131.06, 131.34, 131.49, 130.93, 129.33, 130.45, 131.95, 131.15, 132.01, 131.26, 132.46, 134.84, 136.34, 138.85, 137.68, 137.31, 137.54, 138.2, 139.77, 138.38], '1W': [171.23, 147.44, 146.97, 138.54, 138.38], '1M': [177.62, 179.83, 169.02, 158.41, 185.67, 184.07, 202.89, 177, 196.64, 162.88, 175.13, 172.78, 169.05, 191.55, 170.81, 161.85, 171.23, 147.44, 146.97, 138.54, 138.38], 'YTD': [34.86, 33.01, 37, 35.72, 39.57, 38.13, 43.99, 51.68, 84.23, 95.58, 106.19, 101.92, 97.42, 103.91, 150.6, 159.42, 137.73, 164.36, 157.55, 203.57, 176.81, 158.41, 202.89, 172.78, 161.85, 138.38], '6M': [37.17, 34.99, 33.72, 39.26, 37.39, 46.12, 48.49, 43.44, 58.12, 99.71, 127.01, 92.63, 114.41, 84.59, 132.7, 142.55, 149.42, 152.83, 178.54, 223.1, 165.26, 169.02, 202.89, 172.78, 161.85, 138.38], '1Y': [27.77, 28.66, 28.4, 28.63, 27.13, 21.53, 21.59, 21.01, 23.7, 25.49, 23.99, 27.07, 28.99, 25.77, 27.93, 27.15, 31.92, 34.01, 35.56, 28.57, 20.91, 19.49, 26.78, 26.59, 32.06, 31.32, 36.75, 38.61, 34.18, 38.38, 45.23, 39.9, 48.49, 43.44, 58.12, 99.71, 127.01, 92.63, 114.41, 86.35, 133.3, 157.32, 137.73, 164.36, 157.55, 223.1, 165.26, 169.02, 202.89, 172.78, 161.85, 138.38] },
      velocityScore: { '1D': -35.8, '1W': -35.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 7.48, RKNG: false },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'LITE', name: 'LITE', easyScore: 1, avgWeight: 6.51, proScore: 2.17, coverage: 0.333,
      price: 810.92, weeklyPrices: [893.93, 827.92, 842.53, 861.97, 810.92], weeklyChange: -9.29, dayChange: -5.92, sortRank: 0, periodReturns: { '1M': -11, 'YTD': 120, '6M': 107.5, '1Y': 756.2 },
      priceHistory: { '1D': [861.97, 784.45, 782.1, 794.42, 795.9, 793.42, 785.5, 783.27, 777.62, 788.14, 792.58, 790, 796, 794.88, 796.97, 804, 803.92, 819.25, 810.71, 813.23, 815.9, 810, 809.41, 810.92], '1W': [893.93, 827.92, 842.53, 861.97, 810.92], '1M': [910.81, 902.31, 860.62, 854.96, 905, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 850, 893.93, 827.92, 842.53, 861.97, 810.92], 'YTD': [368.59, 348.26, 343.27, 339.19, 381.44, 504.42, 583.46, 667.77, 700.91, 558.44, 616.09, 772.13, 688.8, 826.88, 897.3, 894.07, 846.89, 902.32, 892.58, 1001.81, 964.5, 854.96, 945.08, 889.59, 850, 810.92], '6M': [390.77, 357.05, 339.87, 356.83, 370.66, 435.1, 561.13, 594.26, 723.39, 680.8, 672, 700.81, 777.17, 702.76, 896.02, 824.01, 873.6, 858.32, 944.28, 1030.37, 868.07, 860.62, 945.08, 889.59, 850, 810.92], '1Y': [94.71, 92.75, 92.99, 102.22, 104.52, 106.68, 116.27, 114.62, 117.43, 135.55, 149.46, 163.02, 168.73, 160.75, 163.81, 149.61, 164.77, 179.3, 201.56, 240.11, 226.86, 233.24, 325.16, 331.41, 324.35, 371.43, 372.61, 397.42, 361.33, 362.44, 385, 465.54, 561.13, 594.26, 723.39, 680.8, 672, 700.81, 777.17, 764.65, 894.13, 891.22, 846.89, 902.32, 892.58, 1030.37, 868.07, 860.62, 945.08, 889.59, 850, 810.92] },
      velocityScore: { '1D': -30.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$63B', pe: 142.5, revenueGrowth: 90, eps: 5.69, grossMargin: 41, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.51, RKNG: false },
      tonyNote: 'LITE appears in 1 of 3 Meme ETFs (33% coverage) with average weight 6.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 1, avgWeight: 5.94, proScore: 1.98, coverage: 0.333,
      price: 51.21, weeklyPrices: [58.32, 57.85, 53.60, 50.56, 51.21], weeklyChange: -12.19, dayChange: 1.29, sortRank: 0, periodReturns: { '1M': -19.5, 'YTD': 14.1, '6M': 11.3, '1Y': 24.5 },
      priceHistory: { '1D': [50.56, 49.85, 49.72, 50.52, 51.17, 52.05, 52.18, 51.87, 51.62, 51.5, 52.08, 51.72, 52.03, 51.52, 51.75, 51.28, 51.38, 51.69, 51.64, 51.44, 51.33, 51.36, 51.52, 51.21], '1W': [58.32, 57.85, 53.6, 50.56, 51.21], '1M': [63.62, 65.4, 70.14, 72.07, 69.28, 68.23, 65.66, 56.78, 62.8, 56.69, 56.63, 57.99, 57.85, 61.18, 56.06, 56.55, 58.32, 57.85, 53.6, 50.56, 51.21], 'YTD': [44.87, 50.45, 47.56, 47.25, 43.24, 30.43, 31.3, 31.9, 38.37, 35.73, 33.03, 31.9, 29.84, 29.3, 28.79, 46.09, 43.63, 45.12, 47.68, 57.47, 58.89, 72.07, 65.66, 57.99, 56.55, 51.21], '6M': [46, 48.71, 50.95, 50.66, 45.49, 38.47, 35.19, 33.34, 33.59, 37.13, 34.27, 32.38, 31.96, 28.83, 28.99, 43.25, 47.36, 42.11, 52.57, 55.26, 52.47, 70.14, 65.66, 57.99, 56.55, 51.21], '1Y': [41.12, 44.39, 41.81, 46.51, 43.17, 38.12, 41.85, 41.03, 37.17, 43.3, 41.8, 55.61, 70.41, 67.28, 73.28, 70.65, 62.94, 60.3, 62.38, 59.27, 45.4, 41, 49.3, 52.69, 50.35, 48.48, 45.25, 50.76, 48.94, 48.33, 45.8, 35.34, 35.19, 33.34, 33.59, 37.13, 34.27, 32.38, 31.96, 27.79, 28.08, 44.68, 43.63, 45.12, 47.68, 55.26, 52.47, 70.14, 65.66, 57.99, 56.55, 51.21] },
      velocityScore: { '1D': -3.9, '1W': -12.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 131.3, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.94, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'RDW', name: 'Redwire', easyScore: 1, avgWeight: 5.8, proScore: 1.93, coverage: 0.333,
      price: 11.01, weeklyPrices: [13.02, 12.22, 11.38, 10.80, 11.01], weeklyChange: -15.48, dayChange: 1.9, sortRank: 0, periodReturns: { '1M': -50.1, 'YTD': 44.8, '6M': 53.9, '1Y': -35.1 },
      priceHistory: { '1D': [10.8, 11.06, 10.94, 11.04, 10.85, 10.99, 10.91, 10.85, 10.84, 10.85, 11.06, 11.02, 11.05, 11.02, 11.06, 10.98, 11.01, 11.1, 11.02, 11.02, 11.05, 11.07, 11.1, 11.01], '1W': [13.02, 12.22, 11.38, 10.8, 11.01], '1M': [22.04, 24, 25.9, 24.57, 20.68, 18.62, 21.43, 18.45, 18.57, 15.75, 14.87, 17.09, 15.12, 14.83, 13.5, 14.35, 13.02, 12.22, 11.38, 10.8, 11.01], 'YTD': [7.6, 10.28, 10.86, 12.52, 12.81, 8.8, 7.89, 7.99, 9.07, 8.55, 9.48, 9.63, 8.87, 9.73, 9.29, 10.34, 10.04, 9.19, 9.2, 13.99, 15.35, 24.57, 21.43, 17.09, 14.35, 11.01], '6M': [7.15, 10.26, 10.66, 10.66, 14.2, 11.26, 9.38, 8.4, 8.62, 9.28, 9.46, 9.55, 9.16, 8.5, 9.61, 9.91, 11.93, 8.6, 9.64, 11.46, 14.77, 25.9, 21.43, 17.09, 14.35, 11.01], '1Y': [16.96, 15.99, 16.64, 19.41, 16.07, 13.87, 8.99, 9.09, 8.7, 9.2, 8.32, 8.69, 7.95, 8.83, 10.73, 8.74, 7.97, 8, 7.87, 6.56, 5.56, 5.06, 5.51, 6.39, 7.29, 8, 7, 10.64, 10.14, 10.2, 13.29, 10.03, 9.38, 8.4, 8.62, 9.28, 9.46, 9.55, 9.16, 9.08, 9.22, 11.22, 10.04, 9.19, 9.2, 11.46, 14.77, 25.9, 21.43, 17.09, 14.35, 11.01] },
      velocityScore: { '1D': -3.5, '1W': 3.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2B', pe: null, revenueGrowth: 58, eps: -2.59, grossMargin: 13, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.8, RKNG: false },
      tonyNote: 'Redwire Corp is a space infrastructure company — solar arrays, structures, and manufacturing in orbit. It appears in Meme and speculative ETFs as a high-risk space economy play. Revenue is growing from a small base but the business is pre-profitability; the ETF weight is minimal and reflects thematic positioning rather than fundamental conviction.',
    },
    {
      ticker: 'QBTS', name: 'D-Wave Quantum', easyScore: 1, avgWeight: 5.72, proScore: 1.91, coverage: 0.333,
      price: 22.29, weeklyPrices: [24.47, 25.03, 22.98, 21.91, 22.29], weeklyChange: -8.91, dayChange: 1.73, sortRank: 0, periodReturns: { '1M': -19.9, 'YTD': -14.8, '6M': -11.9, '1Y': 58.5 },
      priceHistory: { '1D': [21.91, 21.72, 21.37, 21.99, 22.15, 22.31, 22.25, 22.22, 22.08, 22.18, 22.5, 22.46, 22.53, 22.34, 22.44, 22.3, 22.33, 22.44, 22.35, 22.3, 22.27, 22.34, 22.41, 22.29], '1W': [24.47, 25.03, 22.98, 21.91, 22.29], '1M': [27.82, 27.48, 29.49, 30.14, 29.18, 27.55, 27.64, 23.85, 25.83, 23.52, 23.25, 23.82, 23.37, 26.26, 23.94, 24.69, 24.47, 25.03, 22.98, 21.91, 22.29], 'YTD': [26.15, 29.28, 28.72, 25.63, 23.22, 17.21, 18.82, 18.06, 18.78, 18.59, 17.83, 16.1, 14.65, 14.32, 14.25, 21.69, 19.31, 20.28, 21.99, 22.13, 25.74, 30.14, 27.64, 23.82, 24.69, 22.29], '6M': [25.29, 30.64, 28.8, 27.04, 24.69, 21.4, 20.44, 19.07, 19.65, 18.91, 18.91, 16.49, 16.19, 14.43, 14.57, 20.81, 21.24, 18.27, 23.83, 21.44, 19.3, 29.49, 27.64, 23.82, 24.69, 22.29], '1Y': [14.06, 16.79, 14.81, 18.89, 18.87, 16.38, 16.9, 18.18, 14.81, 15.92, 15.37, 17.76, 26.88, 26.76, 32.7, 33.02, 38.33, 32.65, 37.06, 29.5, 23.39, 20.51, 22.67, 27, 26.1, 26.82, 26.15, 31.27, 28.82, 26.04, 24.97, 20.11, 20.44, 19.07, 19.65, 18.91, 18.91, 16.49, 16.19, 13.7, 13.87, 21.52, 19.31, 20.28, 21.99, 21.44, 19.3, 29.49, 27.64, 23.82, 24.69, 22.29] },
      velocityScore: { '1D': -2.6, '1W': 9.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$8B', pe: null, revenueGrowth: -81, eps: -1.14, grossMargin: 66, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.72, RKNG: false },
      tonyNote: 'D-Wave Quantum is a quantum computing company — the only publicly traded business built around quantum annealing hardware. Revenue is minimal and profitability is many years away, but it holds a position in Meme ETFs as the purest-play quantum computing stock available to retail investors. The ETF weight is small and the position is purely thematic.',
    },
    {
      ticker: 'AXTI', name: 'AXT Inc', easyScore: 1, avgWeight: 4.1, proScore: 1.37, coverage: 0.333,
      price: 68.99, weeklyPrices: [92.44, 77.91, 70.14, 69.06, 68.99], weeklyChange: -25.37, dayChange: -0.1, sortRank: 0, periodReturns: { '1M': -48, 'YTD': 322, '6M': 348.9, '1Y': 3079.3 },
      priceHistory: { '1D': [69.06, 66.1, 66.27, 67.85, 66.93, 68.36, 67.35, 67.32, 67.09, 67.14, 67.57, 66.8, 66.88, 66.58, 67.44, 68.21, 68.35, 70.05, 69.21, 68.97, 69.16, 69.05, 69.63, 68.99], '1W': [92.44, 77.91, 70.14, 69.06, 68.99], '1M': [132.6, 122.77, 115.7, 103.16, 109.55, 106.7, 105.99, 89.04, 90.78, 78.36, 85.29, 88.34, 97.18, 110.74, 93.04, 84.57, 92.44, 77.91, 70.14, 69.06, 68.99], 'YTD': [16.35, 25.83, 25.72, 17.4, 16.38, 20.43, 24.79, 29.68, 37.9, 32.37, 46.73, 58.09, 58.51, 52.84, 64.18, 82.56, 75.27, 79.22, 108.42, 114.98, 121.02, 103.16, 105.99, 88.34, 84.57, 68.99], '6M': [15.37, 16.67, 22.24, 21.41, 17.2, 19.74, 24.35, 23.54, 40.97, 39.13, 47.36, 48.76, 67.35, 56.98, 53.18, 62.93, 86.94, 71.07, 104.83, 121.94, 104.61, 115.7, 105.99, 88.34, 84.57, 68.99], '1Y': [2.17, 2.14, 2.2, 2.44, 2.35, 1.92, 2.14, 2.16, 2.48, 2.92, 3.11, 3.66, 4.34, 4.66, 5.13, 4.03, 4.51, 6.06, 7.95, 9.46, 10.44, 9.45, 10.7, 11.58, 14.81, 14.65, 14.59, 20.17, 21.51, 19.78, 16.83, 18.75, 24.35, 23.54, 40.97, 39.13, 47.36, 48.76, 67.35, 47.14, 63.12, 81.78, 75.27, 79.22, 108.42, 121.94, 104.61, 115.7, 105.99, 88.34, 84.57, 68.99] },
      velocityScore: { '1D': 0.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5B', pe: null, revenueGrowth: 39, eps: -0.32, grossMargin: 21, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.1, RKNG: false },
      tonyNote: 'AXT Inc is a compound semiconductor substrate manufacturer — gallium arsenide, indium phosphide, and germanium wafers used in data center optical transceivers, 5G RF chips, and solar cells. Revenue is growing with optical networking demand. Small market cap but positioned at a genuine supply-chain chokepoint for III-V semiconductor materials.',
    },
    {
      ticker: 'CRDO', name: 'CRDO', easyScore: 1, avgWeight: 3.72, proScore: 1.24, coverage: 0.333,
      price: 254.13, weeklyPrices: [302.52, 272.01, 268.99, 268.03, 254.13], weeklyChange: -16, dayChange: -5.19, sortRank: 0, periodReturns: { '1M': 14.7, 'YTD': 76.6, '6M': 75.5, '1Y': 167.4 },
      priceHistory: { '1D': [268.03, 251.71, 254.46, 259.36, 256.24, 255.52, 251.35, 252.38, 249.59, 250.45, 254.58, 253.07, 251.85, 251.99, 252.94, 252.42, 255.26, 256.86, 255.09, 256.27, 256, 255.6, 254.37, 254.13], '1W': [302.52, 272.01, 268.99, 268.03, 254.13], '1M': [221.64, 221.23, 222.35, 236.03, 226.1, 214.6, 217.5, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81, 259.41, 239.18, 271.83, 302.52, 272.01, 268.99, 268.03, 254.13], 'YTD': [143.89, 141.59, 149.12, 133.16, 129.47, 98.06, 121.78, 124.06, 112.27, 109.83, 111.57, 107.09, 96.44, 101.45, 119.59, 160.69, 185.54, 174.01, 188.29, 184.54, 193.39, 236.03, 217.5, 264.76, 271.83, 254.13], '6M': [144.83, 140.24, 156.07, 153.22, 129.57, 111.31, 134.72, 127.91, 123.46, 102.54, 115.91, 101.72, 103.91, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 189.36, 182.98, 222.35, 217.5, 264.76, 271.83, 254.13], '1Y': [95.05, 93.61, 98.52, 93.47, 101.22, 107.56, 120.41, 117.33, 110.86, 131.82, 140.82, 161.99, 169.56, 142.93, 143.87, 138.83, 143.61, 155.55, 187.62, 163.61, 142.95, 134.73, 177.6, 176.04, 143.91, 150.13, 144.7, 132.95, 161.38, 139.16, 129.66, 96.95, 134.72, 127.91, 123.46, 102.54, 115.91, 101.72, 103.91, 95.92, 107.93, 158.93, 185.54, 174.01, 188.29, 189.36, 182.98, 222.35, 217.5, 264.76, 271.83, 254.13] },
      velocityScore: { '1D': -60.1, '1W': -55.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$47B', pe: 100.8, revenueGrowth: 157, eps: 2.52, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.72, RKNG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'CIFR', name: 'CIFR', easyScore: 1, avgWeight: 3.71, proScore: 1.24, coverage: 0.333,
      price: 25.65, weeklyPrices: [28.14, 27.64, 26.22, 25.68, 25.65], weeklyChange: -8.85, dayChange: -0.12, sortRank: 0, periodReturns: { '1M': 11.4, 'YTD': 73.8, '6M': 68.9, '1Y': 512.2 },
      priceHistory: { '1D': [25.68, 24.31, 24.26, 24.84, 24.94, 25.11, 25.59, 25.15, 25.21, 25.06, 25.32, 25.33, 25.25, 24.86, 25.12, 24.98, 25.17, 25.5, 25.37, 25.28, 25.44, 25.75, 25.7, 25.65], '1W': [28.14, 27.64, 26.22, 25.68, 25.65], '1M': [23.02, 25.16, 24.59, 23.65, 24.01, 26.24, 25.55, 22.45, 24.29, 23.03, 21.02, 22.63, 24.5, 26.03, 26.21, 29.18, 28.14, 27.64, 26.22, 25.68, 25.65], 'YTD': [14.76, 16.55, 17.52, 17.57, 17.7, 12.7, 16.1, 14.65, 15.6, 13.62, 13.71, 14.64, 14.35, 12.82, 16.53, 19.37, 18.69, 17.74, 20.68, 22.29, 21.52, 23.65, 25.55, 22.63, 29.18, 25.65], '6M': [15.19, 18.16, 17.68, 17.92, 18.75, 16.26, 17.1, 15.42, 16.61, 16.04, 14.11, 14.67, 15.88, 12.87, 15.42, 18, 19.44, 16.92, 21.91, 21.24, 19.48, 24.59, 25.55, 22.63, 29.18, 25.65], '1Y': [4.19, 6.05, 5.87, 6.36, 6.47, 4.93, 4.75, 5.32, 5.9, 7.02, 7.52, 10.85, 12.28, 11.47, 14.7, 16.97, 18.76, 20.66, 18.65, 20.69, 14.93, 14.56, 20.35, 19.28, 17.05, 16.21, 15.08, 17.54, 18.25, 17.72, 18.97, 14.25, 17.1, 15.42, 16.61, 16.04, 14.11, 14.67, 15.88, 12.64, 16.36, 17.34, 18.69, 17.74, 20.68, 21.24, 19.48, 24.59, 25.55, 22.63, 29.18, 25.65] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$10B', pe: null, revenueGrowth: -29, eps: -2.32, grossMargin: 12, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 3.71 },
      tonyNote: 'CIFR appears in 1 of 3 Meme ETFs (33% coverage) with average weight 3.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WULF', name: 'WULF', easyScore: 1, avgWeight: 3.63, proScore: 1.21, coverage: 0.333,
      price: 26.59, weeklyPrices: [28.31, 28.78, 26.97, 26.06, 26.59], weeklyChange: -6.08, dayChange: 2.03, sortRank: 0, periodReturns: { '1M': 5.6, 'YTD': 131.4, '6M': 126.3, '1Y': 505.7 },
      priceHistory: { '1D': [26.06, 24.92, 24.86, 25.17, 25.23, 25.42, 25.49, 25.24, 25.14, 25.19, 25.51, 25.46, 25.55, 25.42, 25.55, 25.43, 25.55, 25.92, 26.16, 26.31, 26.41, 26.73, 26.58, 26.59], '1W': [28.31, 28.78, 26.97, 26.06, 26.59], '1M': [25.18, 26.74, 26.4, 25.56, 25.66, 26.16, 26.19, 24, 25.86, 25.3, 23.19, 25.35, 26.06, 28.17, 28.01, 28.98, 28.31, 28.78, 26.97, 26.06, 26.59], 'YTD': [11.49, 12.84, 13.83, 14.12, 14.54, 11.92, 15.91, 15.01, 16.22, 13.75, 14.67, 15.74, 15.35, 14.88, 18.87, 20.64, 20.37, 21.73, 24.02, 24.17, 22.92, 25.56, 26.19, 25.35, 28.98, 26.59], '6M': [11.75, 13.62, 13.81, 13.33, 15.31, 14.8, 16.63, 15.38, 17.92, 15.37, 15.22, 15.3, 16.86, 14.43, 18.05, 19.67, 20.55, 20.02, 25.74, 23.12, 21.63, 26.4, 26.19, 25.35, 28.98, 26.59], '1Y': [4.39, 5.26, 4.89, 5.13, 5.17, 4.76, 5.03, 8.71, 9.19, 9.44, 9.13, 10.76, 10.98, 10.83, 11.92, 13.51, 13.93, 13.71, 15.5, 13.94, 11.68, 11.56, 15.51, 14.5, 14.33, 12.52, 11.42, 13.18, 14.14, 13.12, 15.11, 13.88, 16.63, 15.38, 17.92, 15.37, 15.22, 15.3, 16.86, 14.48, 19.03, 19.31, 20.37, 21.73, 24.02, 23.12, 21.63, 26.4, 26.19, 25.35, 28.98, 26.59] },
      velocityScore: { '1D': -14.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: null, revenueGrowth: -1, eps: -2.51, grossMargin: 64, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 3.63 },
      tonyNote: 'WULF appears in 1 of 3 Meme ETFs (33% coverage) with average weight 3.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
