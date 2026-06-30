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
export const SPY_RET: Record<Period, number> = { '1W': 1.1, '1M': -2, 'YTD': 8.8, '6M': 7.9, '1Y': 20 };
// @@END_GENERATED:SPY_RET@@

// Top holdings per ETF (ticker + portfolio weight %), shown on ETF row hover.
export type EtfHolding = { t: string; w: number };

// @@GENERATED:ETF_TOP_HOLDINGS@@
export const ETF_TOP_HOLDINGS: Record<string, EtfHolding[]> = {
  AIS: [{ t: 'MU', w: 7.3 }, { t: 'AMD', w: 4.8 }, { t: 'MRVL', w: 3.9 }, { t: 'SIMO', w: 3.8 }, { t: 'INTC', w: 3.5 }],
  ARTY: [{ t: 'MU', w: 5.5 }, { t: 'AMD', w: 5.0 }, { t: 'NVDA', w: 4.4 }, { t: 'MRVL', w: 4.4 }, { t: 'AVGO', w: 4.3 }],
  BAI: [{ t: 'MU', w: 6.8 }, { t: 'LRCX', w: 5.1 }, { t: 'AMD', w: 4.9 }, { t: 'TSM', w: 4.5 }, { t: 'AVGO', w: 4.0 }],
  IGPT: [{ t: 'MU', w: 8.7 }, { t: 'AMD', w: 8.4 }, { t: 'META', w: 7.5 }, { t: 'GOOGL', w: 7.5 }, { t: 'NVDA', w: 7.2 }],
  IVES: [{ t: 'MU', w: 5.4 }, { t: 'TSM', w: 5.1 }, { t: 'AMD', w: 4.8 }, { t: 'AMZN', w: 4.8 }, { t: 'AAPL', w: 4.7 }],
  ALAI: [{ t: 'NVDA', w: 12.1 }, { t: 'TSM', w: 5.8 }, { t: 'AMZN', w: 5.5 }, { t: 'MSFT', w: 4.8 }, { t: 'GOOG', w: 4.8 }],
  CHAT: [{ t: 'NVDA', w: 6.3 }, { t: 'GOOGL', w: 5.2 }, { t: 'MU', w: 4.4 }, { t: 'AMD', w: 4.2 }, { t: 'AVGO', w: 4.0 }],
  AIFD: [{ t: 'MU', w: 7.4 }, { t: 'NVDA', w: 6.0 }, { t: 'MRVL', w: 5.8 }, { t: 'LITE', w: 5.6 }, { t: 'PANW', w: 5.3 }],
  SPRX: [{ t: 'ALAB', w: 9.8 }, { t: 'COHR', w: 8.9 }, { t: 'KLAC', w: 7.9 }, { t: 'ARM', w: 7.5 }, { t: 'NET', w: 7.1 }],
  AOTG: [{ t: 'AMD', w: 16.5 }, { t: 'MU', w: 12.4 }, { t: 'NVDA', w: 10.1 }, { t: 'TSM', w: 7.3 }, { t: 'TOST', w: 4.8 }],
  SOXX: [{ t: 'MU', w: 8.8 }, { t: 'AMD', w: 7.8 }, { t: 'NVDA', w: 6.9 }, { t: 'AVGO', w: 6.3 }, { t: 'INTC', w: 6.2 }],
  PSI: [{ t: 'AMAT', w: 7.0 }, { t: 'KLAC', w: 6.3 }, { t: 'MU', w: 5.8 }, { t: 'LRCX', w: 5.8 }, { t: 'AMD', w: 4.9 }],
  XSD: [{ t: 'MXL', w: 3.3 }, { t: 'ALGM', w: 3.3 }, { t: 'ALAB', w: 3.1 }, { t: 'MU', w: 2.9 }, { t: 'INTC', w: 2.7 }],
  DRAM: [{ t: 'SNDK', w: 4.8 }, { t: 'WDC', w: 4.5 }, { t: 'STX', w: 4.3 }, { t: 'MU', w: 2.0 }, { t: 'JPY', w: 0.7 }],
  PTF: [{ t: 'SNDK', w: 7.1 }, { t: 'WDC', w: 4.3 }, { t: 'MU', w: 4.3 }, { t: 'NVDA', w: 4.2 }, { t: 'AAPL', w: 4.2 }],
  WCLD: [{ t: 'FROG', w: 3.2 }, { t: 'DOCN', w: 3.0 }, { t: 'DDOG', w: 2.9 }, { t: 'PANW', w: 2.8 }, { t: 'CRWD', w: 2.5 }],
  IGV: [{ t: 'PANW', w: 10.2 }, { t: 'MSFT', w: 8.0 }, { t: 'PLTR', w: 7.7 }, { t: 'CRWD', w: 7.1 }, { t: 'ORCL', w: 6.4 }],
  FDTX: [{ t: 'MU', w: 9.4 }, { t: 'MRVL', w: 8.1 }, { t: 'TSM', w: 6.0 }, { t: 'NVDA', w: 4.6 }, { t: 'STX', w: 4.0 }],
  GTEK: [{ t: 'MRVL', w: 4.3 }, { t: 'DELL', w: 2.9 }, { t: 'APH', w: 2.4 }, { t: 'NET', w: 2.1 }, { t: 'EBAY', w: 1.9 }],
  ARKK: [{ t: 'TSLA', w: 9.5 }, { t: 'TEM', w: 5.6 }, { t: 'CRSP', w: 5.1 }, { t: 'AMD', w: 4.6 }, { t: 'HOOD', w: 4.6 }],
  MARS: [{ t: 'SPCX', w: 22.8 }, { t: 'RKLB', w: 10.3 }, { t: 'ASTS', w: 8.1 }, { t: 'PL', w: 5.0 }, { t: 'VSAT', w: 4.9 }],
  FRWD: [{ t: 'NVDA', w: 8.2 }, { t: 'STX', w: 7.6 }, { t: 'AMD', w: 7.4 }, { t: 'LRCX', w: 6.1 }, { t: 'TSM', w: 6.0 }],
  BCTK: [{ t: 'TSM', w: 8.7 }, { t: 'SPCX', w: 8.3 }, { t: 'LRCX', w: 8.3 }, { t: 'AVGO', w: 6.7 }, { t: 'NVDA', w: 5.8 }],
  FWD: [{ t: 'AMD', w: 2.2 }, { t: 'AMAT', w: 2.2 }, { t: 'LRCX', w: 2.0 }, { t: 'AVGO', w: 1.8 }, { t: 'SPCX', w: 1.7 }],
  CBSE: [{ t: 'IBRX', w: 3.2 }, { t: 'TXG', w: 3.2 }, { t: 'KRYS', w: 3.1 }, { t: 'SBUX', w: 3.0 }, { t: 'SCI', w: 3.0 }],
  FCUS: [{ t: 'SNDK', w: 5.8 }, { t: 'INTC', w: 5.2 }, { t: 'WDC', w: 5.1 }, { t: 'MU', w: 5.0 }, { t: 'STX', w: 4.8 }],
  WGMI: [{ t: 'CIFR', w: 18.0 }, { t: 'HUT', w: 11.0 }, { t: 'KEEL', w: 11.0 }, { t: 'IREN', w: 9.7 }, { t: 'RIOT', w: 5.1 }],
  CNEQ: [{ t: 'NVDA', w: 12.9 }, { t: 'TSM', w: 5.9 }, { t: 'MSFT', w: 5.8 }, { t: 'GOOG', w: 5.7 }, { t: 'WDC', w: 5.4 }],
  SGRT: [{ t: 'WDC', w: 9.3 }, { t: 'MU', w: 8.7 }, { t: 'LITE', w: 7.9 }, { t: 'DELL', w: 6.4 }, { t: 'NVDA', w: 6.0 }],
  SPMO: [{ t: 'MU', w: 12.2 }, { t: 'NVDA', w: 7.5 }, { t: 'AVGO', w: 6.0 }, { t: 'JNJ', w: 4.2 }, { t: 'GOOGL', w: 4.2 }],
  XMMO: [{ t: 'CW', w: 4.0 }, { t: 'STRL', w: 3.4 }, { t: 'ATI', w: 3.3 }, { t: 'TTMI', w: 3.1 }, { t: 'WWD', w: 3.1 }],
  POW: [{ t: 'PWR', w: 5.0 }, { t: 'POWL', w: 4.7 }, { t: 'PRY', w: 4.3 }, { t: 'ETN', w: 4.0 }, { t: 'BELFB', w: 3.8 }],
  VOLT: [{ t: 'BELFB', w: 8.1 }, { t: 'POWL', w: 7.0 }, { t: 'PWR', w: 5.4 }, { t: 'ETN', w: 5.2 }, { t: 'NEE', w: 5.0 }],
  PBD: [{ t: 'RIVN', w: 1.2 }, { t: 'NFI', w: 1.1 }, { t: 'ENRG', w: 1.1 }, { t: 'SEDG', w: 1.1 }],
  PBW: [{ t: 'FCEL', w: 5.5 }, { t: 'HYLN', w: 3.1 }, { t: 'NVTS', w: 2.4 }, { t: 'BE', w: 2.4 }, { t: 'ASPN', w: 2.3 }],
  IVEP: [{ t: 'BE', w: 5.0 }, { t: 'PWR', w: 4.4 }, { t: 'GEV', w: 4.4 }, { t: 'SBGSY', w: 4.1 }, { t: 'COHR', w: 4.1 }],
  AIRR: [{ t: 'STRL', w: 5.9 }, { t: 'AGX', w: 4.7 }, { t: 'FIX', w: 4.4 }, { t: 'MTZ', w: 4.4 }, { t: 'CHRW', w: 4.0 }],
  PRN: [{ t: 'TTMI', w: 5.7 }, { t: 'AGX', w: 5.0 }, { t: 'FIX', w: 4.7 }, { t: 'VICR', w: 4.7 }, { t: 'STRL', w: 4.1 }],
  RSHO: [{ t: 'TKR', w: 8.7 }, { t: 'POWL', w: 7.3 }, { t: 'CGNX', w: 7.2 }, { t: 'CAT', w: 6.9 }, { t: 'AIT', w: 6.0 }],
  IDEF: [{ t: 'RTX', w: 8.4 }, { t: 'LMT', w: 6.9 }, { t: 'BA', w: 5.0 }, { t: 'GD', w: 4.4 }, { t: 'FTNT', w: 3.5 }],
  BILT: [{ t: 'UNP', w: 5.8 }, { t: 'AENA', w: 4.5 }, { t: 'AEP', w: 4.3 }, { t: 'XEL', w: 3.9 }, { t: 'TRP', w: 3.7 }],
  BUZZ: [{ t: 'IBRX', w: 3.8 }, { t: 'MU', w: 3.5 }, { t: 'NBIS', w: 3.4 }, { t: 'SOFI', w: 3.3 }, { t: 'AMD', w: 3.3 }],
  MEME: [{ t: 'AAOI', w: 9.7 }, { t: 'NBIS', w: 5.9 }, { t: 'ASTS', w: 5.7 }, { t: 'BE', w: 5.5 }, { t: 'QBTS', w: 5.2 }],
  RKNG: [{ t: 'MU', w: 4.2 }, { t: 'WDC', w: 4.1 }, { t: 'SNDK', w: 4.0 }, { t: 'BE', w: 4.0 }, { t: 'NBIS', w: 3.7 }],
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
  POW: { name: "VistaShares Electrification Supercycle ETF", manager: "VistaShares Advisors LLC", aum: 67637320 },
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
  'AI & ML':         { '1W': 2.8, '1M': 0.8, 'YTD': 51.5, '6M': 49.9, '1Y': 84.3 },
  'Semiconductors':  { '1W': 4.1, '1M': 9.7, 'YTD': 121.1, '6M': 119, '1Y': 164.6 },
  'Broad Tech':      { '1W': 2.5, '1M': -1.9, 'YTD': 30.6, '6M': 29.6, '1Y': 48 },
  'Electrification': { '1W': 0.3, '1M': -5.3, 'YTD': 29.7, '6M': 28.5, '1Y': 52.8 },
  'Industrials':     { '1W': 0.8, '1M': 0.1, 'YTD': 26.2, '6M': 24.6, '1Y': 41.1 },
  'Meme':            { '1W': 0.5, '1M': -10.5, 'YTD': 24.4, '6M': 23.4, '1Y': 8.5 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, IndexChartByPeriod> = {
  'AI & ML': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 1, spyReturn: 0.09, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 101.41, 99.18, 101.42, 102.81], spy: [100, 100.14, 99.42, 101.06, 101.14], top10Return: 2.8, spyReturn: 1.1, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 102.25, 101.87, 100.16, 92.71, 94.13, 92.76, 90.07, 93.79, 94.97, 99.12, 97.49, 97.61, 101.24, 102.75, 97.36, 95.92, 97.31, 95.13, 97.26, 98.61], spy: [100, 100.14, 99.43, 99.81, 97.23, 97.45, 97.17, 95.64, 97.26, 97.79, 99.51, 98.92, 97.68, 98.44, 98.13, 96.71, 96.66, 96.8, 96.1, 97.69, 97.77], top10Return: 0.8, spyReturn: -2, xLabels: ["Jun 2", "Jun 9", "Jun 16", "Jun 23", "Jun 30"] },
    'YTD': { top10: [100, 102.26, 104.35, 105.09, 104.21, 101.38, 102.53, 104.13, 103.13, 98.84, 99.95, 99.4, 95, 100.45, 110.25, 117.89, 122.67, 125.46, 137.81, 134.83, 140.17, 153.05, 144.05, 152.21, 149.41, 151.47], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 101.1, 100.6, 98.6, 97.12, 95.11, 92.99, 96.63, 100.61, 103.93, 104.88, 105.29, 108.41, 108.4, 109.34, 111.24, 108.4, 110.69, 107.58, 108.75], top10Return: 51.5, spyReturn: 8.8, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 103.04, 102.99, 103.83, 106.39, 96.35, 101.2, 102.96, 102.25, 98.25, 99.02, 99.12, 94.39, 98.62, 106.68, 116.05, 121.17, 123.06, 133.55, 133.94, 138.59, 151.45, 142.53, 150.6, 147.83, 149.87], spy: [100, 100.37, 100.49, 100.29, 101.02, 98.63, 99.16, 100.35, 99.85, 97.87, 96.4, 94.4, 92.3, 95.46, 98.9, 103.37, 103.92, 104.9, 107.37, 107.59, 108.53, 110.41, 107.6, 109.87, 106.78, 107.95], top10Return: 49.9, spyReturn: 7.9, xLabels: ["Dec", "Jan", "Mar", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 99.66, 101.08, 101.93, 105.22, 104.7, 108.46, 107.87, 105.83, 106.02, 111.52, 116.36, 119.04, 118.59, 122.2, 120.93, 123.07, 129.22, 126.35, 125.1, 118.15, 117.48, 121.55, 124.99, 118.28, 122.66, 120.93, 123.98, 125.89, 127.02, 126.45, 122.72, 123.38, 126.06, 124.9, 119.58, 121.16, 121.28, 115.5, 121.63, 133.64, 142.86, 148.71, 152.11, 167.28, 163.64, 170.15, 185.86, 175.01, 185.09, 181.7, 184.27], spy: [100, 100.4, 100.69, 101.78, 102.82, 101.64, 104.02, 104.12, 103.98, 103.63, 105.26, 106.82, 107.34, 107.82, 108.3, 107.18, 108.65, 111.2, 109.29, 110.54, 107.74, 108.24, 110.31, 110.55, 109.88, 111.35, 110.37, 111.6, 112.04, 111.55, 112, 111.78, 110.26, 111.59, 111.03, 108.83, 107.19, 104.97, 102.63, 106.65, 111.05, 114.71, 115.75, 116.21, 119.66, 119.64, 120.68, 122.77, 119.64, 122.17, 118.73, 120.03], top10Return: 84.3, spyReturn: 20, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Semiconductors': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 1.3, spyReturn: 0.09, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 105.06, 99.37, 102.73, 104.07], spy: [100, 100.14, 99.42, 101.06, 101.14], top10Return: 4.1, spyReturn: 1.1, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 104.94, 106.22, 103.58, 91.48, 96.85, 95.32, 92.14, 100.97, 102.47, 108.46, 102.8, 103.86, 111.62, 115.28, 104.66, 104, 109.3, 103.36, 106.91, 108.31], spy: [100, 100.14, 99.43, 99.81, 97.23, 97.45, 97.17, 95.64, 97.26, 97.79, 99.51, 98.92, 97.68, 98.44, 98.13, 96.71, 96.66, 96.8, 96.1, 97.69, 97.77], top10Return: 9.7, spyReturn: -2, xLabels: ["Jun 2", "Jun 9", "Jun 16", "Jun 23", "Jun 30"] },
    'YTD': { top10: [100, 107.01, 113.64, 117.36, 117.24, 119.41, 122.25, 123.18, 123.34, 121.84, 124.07, 132.29, 129.66, 130.74, 146.91, 160.68, 171.71, 182.45, 197.64, 185.87, 198.94, 206.92, 211.24, 219.31, 215.78, 221.14], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 101.1, 100.6, 98.6, 97.12, 95.11, 92.99, 96.63, 100.61, 103.93, 104.88, 105.29, 108.41, 108.4, 109.34, 111.24, 108.4, 110.69, 107.58, 108.75], top10Return: 121.1, spyReturn: 8.8, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 106.91, 111.3, 118.22, 119.53, 113.85, 120.28, 121.96, 122.14, 120.75, 122.95, 131.16, 128.54, 128.53, 143.56, 157.86, 173.04, 181.25, 191.72, 184.06, 197.03, 204.98, 209.31, 217.17, 213.71, 219.01], spy: [100, 100.37, 100.49, 100.29, 101.02, 98.63, 99.16, 100.35, 99.85, 97.87, 96.4, 94.4, 92.3, 95.46, 98.9, 103.37, 103.92, 104.9, 107.37, 107.59, 108.53, 110.41, 107.6, 109.87, 106.78, 107.95], top10Return: 119, spyReturn: 7.9, xLabels: ["Dec", "Jan", "Mar", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 103.09, 103.55, 106.16, 106.83, 105.98, 111.73, 110.42, 111.24, 110.36, 113.4, 118.97, 122.09, 122.32, 126.34, 126.46, 130.63, 134.74, 132.69, 136.45, 131.18, 137.87, 145.54, 146.56, 144.26, 146.25, 140.18, 147.64, 154.26, 157.95, 156.41, 166.91, 169.79, 171.41, 173.63, 165.1, 167.78, 155.97, 158.35, 164.29, 176.95, 194.42, 206.03, 214.47, 239.99, 237.75, 251.94, 244.88, 244.54, 265.38, 257.88, 264.55], spy: [100, 100.4, 100.69, 101.78, 102.82, 101.64, 104.02, 104.12, 103.98, 103.63, 105.26, 106.82, 107.34, 107.82, 108.3, 107.18, 108.65, 111.2, 109.29, 110.54, 107.74, 108.24, 110.31, 110.55, 109.88, 111.35, 110.37, 111.6, 112.04, 111.55, 112, 111.78, 110.26, 111.59, 111.03, 108.83, 107.19, 104.97, 102.63, 106.65, 111.05, 114.71, 115.75, 116.21, 119.66, 119.64, 120.68, 122.77, 119.64, 122.17, 118.73, 120.03], top10Return: 164.6, spyReturn: 20, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Broad Tech': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 0.1, spyReturn: 0.09, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 100.15, 100.42, 101.98, 102.47], spy: [100, 100.14, 99.42, 101.06, 101.14], top10Return: 2.5, spyReturn: 1.1, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 100.96, 100.4, 100.29, 94.88, 94.34, 93.53, 91.31, 93.96, 95.11, 98.09, 97.76, 96.8, 98.5, 98.68, 96.67, 94.72, 94.95, 95.1, 96.42, 96.92], spy: [100, 100.14, 99.43, 99.81, 97.23, 97.45, 97.17, 95.64, 97.26, 97.79, 99.51, 98.92, 97.68, 98.44, 98.13, 96.71, 96.66, 96.8, 96.1, 97.69, 97.77], top10Return: -1.9, spyReturn: -2, xLabels: ["Jun 2", "Jun 9", "Jun 16", "Jun 23", "Jun 30"] },
    'YTD': { top10: [100, 103.16, 104.96, 104.89, 102.11, 99.45, 101.25, 102.97, 103.55, 100.34, 100.08, 98.85, 95.92, 100.54, 108.03, 114.24, 116.24, 119.37, 127.19, 123.7, 126.03, 133.59, 127.37, 132.3, 130.33, 130.63], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 101.1, 100.6, 98.6, 97.12, 95.11, 92.99, 96.63, 100.61, 103.93, 104.88, 105.29, 108.41, 108.4, 109.34, 111.24, 108.4, 110.69, 107.58, 108.75], top10Return: 30.6, spyReturn: 8.8, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 103.35, 103.94, 103.9, 103.98, 95.64, 99.97, 101.92, 102.83, 100.28, 99.35, 98.81, 95.12, 99.15, 105.03, 112.79, 115.19, 117.34, 124.51, 123.26, 124.86, 132.5, 126.33, 131.22, 129.25, 129.55], spy: [100, 100.37, 100.49, 100.29, 101.02, 98.63, 99.16, 100.35, 99.85, 97.87, 96.4, 94.4, 92.3, 95.46, 98.9, 103.37, 103.92, 104.9, 107.37, 107.59, 108.53, 110.41, 107.6, 109.87, 106.78, 107.95], top10Return: 29.6, spyReturn: 7.9, xLabels: ["Dec", "Jan", "Mar", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 100.71, 100.99, 103.16, 103.53, 103.51, 104.05, 104.81, 104.7, 105.49, 107.93, 111.71, 115, 115.04, 118.6, 120.69, 118.88, 122.41, 120.45, 118.68, 111.74, 112.83, 114.24, 117.18, 112.58, 116, 113.71, 116.79, 119.61, 120.94, 119.17, 117.08, 117, 119.1, 119.9, 116.48, 117.54, 118.45, 114.36, 118.3, 124.81, 129.87, 131.89, 135.26, 142.21, 139.08, 142.91, 151.58, 144.25, 149.13, 147.99, 148.02], spy: [100, 100.4, 100.69, 101.78, 102.82, 101.64, 104.02, 104.12, 103.98, 103.63, 105.26, 106.82, 107.34, 107.82, 108.3, 107.18, 108.65, 111.2, 109.29, 110.54, 107.74, 108.24, 110.31, 110.55, 109.88, 111.35, 110.37, 111.6, 112.04, 111.55, 112, 111.78, 110.26, 111.59, 111.03, 108.83, 107.19, 104.97, 102.63, 106.65, 111.05, 114.71, 115.75, 116.21, 119.66, 119.64, 120.68, 122.77, 119.64, 122.17, 118.73, 120.03], top10Return: 48, spyReturn: 20, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Electrification': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 0.9, spyReturn: 0.09, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 100.39, 98.43, 99.65, 100.33], spy: [100, 100.14, 99.42, 101.06, 101.14], top10Return: 0.3, spyReturn: 1.1, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 101.13, 100.97, 100.67, 95.31, 94.73, 93.71, 91.17, 93.64, 94.84, 96.84, 96.37, 96.24, 97.85, 99.29, 96.08, 94.58, 95.02, 93.15, 94.19, 94.81], spy: [100, 100.14, 99.43, 99.81, 97.23, 97.45, 97.17, 95.64, 97.26, 97.79, 99.51, 98.92, 97.68, 98.44, 98.13, 96.71, 96.66, 96.8, 96.1, 97.69, 97.77], top10Return: -5.3, spyReturn: -2, xLabels: ["Jun 2", "Jun 9", "Jun 16", "Jun 23", "Jun 30"] },
    'YTD': { top10: [100, 103.61, 108.42, 111.14, 110.01, 113.49, 115.25, 116.39, 116.87, 110.79, 112.12, 111.52, 111.46, 113.26, 121.19, 125.13, 128.96, 133.32, 139.31, 132.79, 134.5, 137.37, 130.27, 133.42, 130.39, 129.73], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 101.1, 100.6, 98.6, 97.12, 95.11, 92.99, 96.63, 100.61, 103.93, 104.88, 105.29, 108.41, 108.4, 109.34, 111.24, 108.4, 110.69, 107.58, 108.75], top10Return: 29.7, spyReturn: 8.8, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 102.99, 106.54, 110.63, 111.35, 108.87, 113.23, 115.29, 115.77, 109.75, 111.06, 110.48, 110.41, 111.8, 118.91, 123.61, 128.18, 132.3, 135.46, 131.47, 133.16, 135.99, 128.99, 132.11, 129.13, 128.46], spy: [100, 100.37, 100.49, 100.29, 101.02, 98.63, 99.16, 100.35, 99.85, 97.87, 96.4, 94.4, 92.3, 95.46, 98.9, 103.37, 103.92, 104.9, 107.37, 107.59, 108.53, 110.41, 107.6, 109.87, 106.78, 107.95], top10Return: 28.5, spyReturn: 7.9, xLabels: ["Dec", "Jan", "Mar", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.75, 104.48, 108.57, 106.98, 106.23, 108.33, 109.76, 110.27, 109.2, 110.13, 112.63, 115.66, 116.27, 122.22, 126.03, 124.97, 126.81, 124.86, 127.72, 122.22, 122.14, 125.88, 127.57, 126, 127.95, 123.66, 127.09, 131.91, 135.59, 132.89, 135.16, 134.42, 136.28, 137.09, 133.17, 135.8, 134.76, 136.05, 139.95, 145.34, 150.65, 150.99, 155.6, 162.47, 158.72, 159.76, 161.02, 156.27, 157.81, 153.07, 152.78], spy: [100, 100.4, 100.69, 101.78, 102.82, 101.64, 104.02, 104.12, 103.98, 103.63, 105.26, 106.82, 107.34, 107.82, 108.3, 107.18, 108.65, 111.2, 109.29, 110.54, 107.74, 108.24, 110.31, 110.55, 109.88, 111.35, 110.37, 111.6, 112.04, 111.55, 112, 111.78, 110.26, 111.59, 111.03, 108.83, 107.19, 104.97, 102.63, 106.65, 111.05, 114.71, 115.75, 116.21, 119.66, 119.64, 120.68, 122.77, 119.64, 122.17, 118.73, 120.03], top10Return: 52.8, spyReturn: 20, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Industrials': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 0.1, spyReturn: 0.09, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 100.33, 99.5, 101.21, 100.82], spy: [100, 100.14, 99.42, 101.06, 101.14], top10Return: 0.8, spyReturn: 1.1, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 100.12, 99.84, 100.63, 98.5, 99.25, 98.96, 96.63, 99.88, 100.21, 100.23, 100.24, 100.53, 100.9, 101.5, 100.58, 100.5, 100.83, 99.96, 101.73, 101.31], spy: [100, 100.14, 99.43, 99.81, 97.23, 97.45, 97.17, 95.64, 97.26, 97.79, 99.51, 98.92, 97.68, 98.44, 98.13, 96.71, 96.66, 96.8, 96.1, 97.69, 97.77], top10Return: 0.1, spyReturn: -2, xLabels: ["Jun 2", "Jun 9", "Jun 16", "Jun 23", "Jun 30"] },
    'YTD': { top10: [100, 105.14, 110.48, 110.36, 110.07, 114.19, 117.26, 120, 118.69, 112.71, 110.92, 109.8, 109.55, 113.19, 119.92, 121.02, 120.91, 121.91, 124.71, 122.55, 121.81, 123.58, 123.27, 125.68, 125.26, 126.19], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 101.1, 100.6, 98.6, 97.12, 95.11, 92.99, 96.63, 100.61, 103.93, 104.88, 105.29, 108.41, 108.4, 109.34, 111.24, 108.4, 110.69, 107.58, 108.75], top10Return: 26.2, spyReturn: 8.8, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 103.67, 107.39, 109.35, 109.65, 109.37, 114.14, 118.24, 117.29, 112.91, 110.21, 109, 109.05, 111.32, 117.23, 118.66, 118.79, 120.24, 122.92, 121.26, 120.16, 122.14, 121.77, 124.15, 123.71, 124.63], spy: [100, 100.37, 100.49, 100.29, 101.02, 98.63, 99.16, 100.35, 99.85, 97.87, 96.4, 94.4, 92.3, 95.46, 98.9, 103.37, 103.92, 104.9, 107.37, 107.59, 108.53, 110.41, 107.6, 109.87, 106.78, 107.95], top10Return: 24.6, spyReturn: 7.9, xLabels: ["Dec", "Jan", "Mar", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 101.13, 101.77, 102.56, 104.53, 104.42, 105.36, 105.27, 105.4, 105.4, 105.8, 108.31, 110.37, 110.99, 112.11, 111.49, 112.44, 114.14, 111.98, 111.71, 107.02, 107.62, 108.96, 110.77, 111.62, 114.15, 111.89, 117.49, 123.59, 124.25, 123.78, 128.52, 130.02, 134.03, 131.76, 126.45, 122.96, 122.62, 122.6, 126.55, 133.5, 134.23, 135.38, 135.95, 139.32, 137.31, 135.97, 137.87, 137.61, 139.34, 140.15, 141.1], spy: [100, 100.4, 100.69, 101.78, 102.82, 101.64, 104.02, 104.12, 103.98, 103.63, 105.26, 106.82, 107.34, 107.82, 108.3, 107.18, 108.65, 111.2, 109.29, 110.54, 107.74, 108.24, 110.31, 110.55, 109.88, 111.35, 110.37, 111.6, 112.04, 111.55, 112, 111.78, 110.26, 111.59, 111.03, 108.83, 107.19, 104.97, 102.63, 106.65, 111.05, 114.71, 115.75, 116.21, 119.66, 119.64, 120.68, 122.77, 119.64, 122.17, 118.73, 120.03], top10Return: 41.1, spyReturn: 20, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Meme': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 0.1, spyReturn: 0.09, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 98.03, 97.25, 99.3, 100.5], spy: [100, 100.14, 99.42, 101.06, 101.14], top10Return: 0.5, spyReturn: 1.1, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 101.9, 100.32, 99.98, 93.35, 91.18, 89.78, 87.17, 89.81, 90.62, 93.92, 93.18, 92.37, 94.47, 95.69, 93.12, 89.39, 87.58, 86.99, 88.59, 89.75], spy: [100, 100.14, 99.43, 99.81, 97.23, 97.45, 97.17, 95.64, 97.26, 97.79, 99.51, 98.92, 97.68, 98.44, 98.13, 96.71, 96.66, 96.8, 96.1, 97.69, 97.77], top10Return: -10.5, spyReturn: -2, xLabels: ["Jun 2", "Jun 9", "Jun 16", "Jun 23", "Jun 30"] },
    'YTD': { top10: [100, 108.03, 105.55, 106.35, 99.1, 96.61, 93.56, 92.18, 92.59, 90.59, 93.4, 90.91, 89.09, 94.06, 106.02, 116.48, 112.46, 116.64, 129.64, 124.23, 135.41, 140.91, 127.35, 133.52, 126.94, 124.43], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 101.1, 100.6, 98.6, 97.12, 95.11, 92.99, 96.63, 100.61, 103.93, 104.88, 105.29, 108.41, 108.4, 109.34, 111.24, 108.4, 110.69, 107.58, 108.75], top10Return: 24.4, spyReturn: 8.8, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 106.61, 105.1, 106.36, 101.86, 90.21, 91.62, 91.46, 91.87, 89.89, 92.68, 90.19, 88.42, 93.79, 101.91, 114.45, 111.53, 114.5, 124.38, 123.24, 134.35, 139.8, 126.34, 132.49, 125.96, 123.47], spy: [100, 100.37, 100.49, 100.29, 101.02, 98.63, 99.16, 100.35, 99.85, 97.87, 96.4, 94.4, 92.3, 95.46, 98.9, 103.37, 103.92, 104.9, 107.37, 107.59, 108.53, 110.41, 107.6, 109.87, 106.78, 107.95], top10Return: 23.4, spyReturn: 7.9, xLabels: ["Dec", "Jan", "Mar", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.85, 100.55, 95.58, 95.13, 91.22, 89.55, 87.26, 83.69, 82.09, 84.62, 87.99, 90.52, 88.33, 87, 90.94, 88, 93.01, 91.61, 90.92, 88.28, 86.36, 84.62, 84.38, 85.33, 86.71, 86.87, 91.01, 91.03, 91.17, 90.25, 88.24, 88.68, 87.8, 91.78, 92.01, 96.64, 99.11, 91.76, 94.54, 102.28, 108.61, 111.24, 108, 112.92, 113.36, 115.07, 114.27, 113.6, 114.31, 107.91, 108.51], spy: [100, 100.4, 100.69, 101.78, 102.82, 101.64, 104.02, 104.12, 103.98, 103.63, 105.26, 106.82, 107.34, 107.82, 108.3, 107.18, 108.65, 111.2, 109.29, 110.54, 107.74, 108.24, 110.31, 110.55, 109.88, 111.35, 110.37, 111.6, 112.04, 111.55, 112, 111.78, 110.26, 111.59, 111.03, 108.83, 107.19, 104.97, 102.63, 106.65, 111.05, 114.71, 115.75, 116.21, 119.66, 119.64, 120.68, 122.77, 119.64, 122.17, 118.73, 120.03], top10Return: 8.5, spyReturn: 20, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
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
export const SCAN_TIMESTAMP    = '2026-06-30T13:37:00.719Z';
export const SCAN_TIMESTAMP_NY = 'June 30, 2026 at 9:37 AM ET';
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
export const HOLDINGS_COUNT = 1298;
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
  { ticker: 'MU', name: `Micron Technology Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 13.95, bestProScore: 5.95, avgProScore: 4.65, price: 1145.02, weeklyChange: 9.20 },
  { ticker: 'NVDA', name: `NVIDIA Corp`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 12.44, bestProScore: 6.04, avgProScore: 4.15, price: 198.20, weeklyChange: -0.40 },
  { ticker: 'AMD', name: `Advanced Micro Devices Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 10.62, bestProScore: 5.05, avgProScore: 3.54, price: 558.96, weeklyChange: 7.55 },
  { ticker: 'AVGO', name: `Broadcom Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 6.40, bestProScore: 2.79, avgProScore: 2.13, price: 375.82, weeklyChange: -1.64 },
  { ticker: 'INTC', name: `INTEL CORPORATION`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.74, bestProScore: 3.46, avgProScore: 2.37, price: 134.75, weeklyChange: 2.35 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 4.67, bestProScore: 2.71, avgProScore: 2.33, price: 284.89, weeklyChange: -3.26 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.41, bestProScore: 2.53, avgProScore: 2.21, price: 284.52, weeklyChange: 2.83 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.25, bestProScore: 2.60, avgProScore: 2.13, price: 458.13, weeklyChange: 3.92 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 4.07, bestProScore: 2.66, avgProScore: 2.04, price: 424.56, weeklyChange: 13.28 },
  { ticker: 'WDC', name: `Western Digital Corp`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 3.70, bestProScore: 2.05, avgProScore: 1.85, price: 646.47, weeklyChange: 0.41 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': 3.9, '1M': 8.8, 'YTD': 120.8, '6M': 118.5, '1Y': 196.5 },
  ARTY: { '1W': 1.2, '1M': 0.3, 'YTD': 55.4, '6M': 53.8, '1Y': 82.6 },
  BAI:  { '1W': 3.7, '1M': 3.3, 'YTD': 54.7, '6M': 53, '1Y': 78.6 },
  IGPT: { '1W': 2.2, '1M': 2.4, 'YTD': 71.7, '6M': 69.5, '1Y': 107.7 },
  IVES: { '1W': 3.6, '1M': -6.7, 'YTD': 18.5, '6M': 17.3, '1Y': 38.2 },
  ALAI: { '1W': 0.4, '1M': -1.7, 'YTD': 24.3, '6M': 22.4, '1Y': 45.5 },
  CHAT: { '1W': 1.1, '1M': -1.5, 'YTD': 64.1, '6M': 63.2, '1Y': 98.4 },
  AIFD: { '1W': 2.5, '1M': 1.2, 'YTD': 43.1, '6M': 41.6, '1Y': 74.8 },
  SPRX: { '1W': 5, '1M': 3.1, 'YTD': 46.8, '6M': 45.1, '1Y': 91 },
  AOTG: { '1W': 4.4, '1M': -1.1, 'YTD': 15.2, '6M': 14.2, '1Y': 29.3 },
  // Semiconductors
  SOXX: { '1W': 3.9, '1M': 9.8, 'YTD': 107.5, '6M': 104.9, '1Y': 161.7 },
  PSI:  { '1W': 7.1, '1M': 16.4, 'YTD': 129.2, '6M': 125.3, '1Y': 201.5 },
  XSD:  { '1W': 1.2, '1M': -2.7, 'YTD': 85.6, '6M': 83.5, '1Y': 132.7 },
  DRAM: { '1W': 4.1, '1M': 15.2, 'YTD': 162.3, '6M': 162.3, '1Y': 162.3 },
  // Broad Tech
  PTF:  { '1W': 4.9, '1M': 3, 'YTD': 73.7, '6M': 72.7, '1Y': 94.6 },
  WCLD: { '1W': 7.1, '1M': -4.1, 'YTD': -9.8, '6M': -10.7, '1Y': -12.6 },
  IGV:  { '1W': 4.1, '1M': -11.7, 'YTD': -15.1, '6M': -16.1, '1Y': -18.1 },
  FDTX: { '1W': 3.6, '1M': 5.6, 'YTD': 39.9, '6M': 38.9, '1Y': 46.1 },
  GTEK: { '1W': 3.3, '1M': 4.2, 'YTD': 54.7, '6M': 53.3, '1Y': 71.4 },
  ARKK: { '1W': 4.6, '1M': -2.1, 'YTD': 4.3, '6M': 3.1, '1Y': 14.2 },
  MARS: { '1W': 8.2, '1M': -27.7, 'YTD': 25.4, '6M': 25.4, '1Y': 25.4 },
  FRWD: { '1W': 1.3, '1M': 1.1, 'YTD': 32.3, '6M': 32.3, '1Y': 32.3 },
  BCTK: { '1W': 4.1, '1M': 2.1, 'YTD': 25.7, '6M': 25.1, '1Y': 28 },
  FWD:  { '1W': 2.9, '1M': 2.1, 'YTD': 39.1, '6M': 37.6, '1Y': 61.9 },
  CBSE: { '1W': 2.7, '1M': 2.6, 'YTD': 30.8, '6M': 29.4, '1Y': 40.3 },
  FCUS: { '1W': -2.5, '1M': -1.9, 'YTD': 39.7, '6M': 37.6, '1Y': 70 },
  WGMI: { '1W': -7.4, '1M': -9.2, 'YTD': 61.6, '6M': 61.6, '1Y': 172 },
  CNEQ: { '1W': 1, '1M': -2.2, 'YTD': 17.2, '6M': 15.9, '1Y': 35.7 },
  SGRT: { '1W': 0.4, '1M': -0.1, 'YTD': 45.7, '6M': 43.2, '1Y': 82.2 },
  SPMO: { '1W': 3.8, '1M': 6, 'YTD': 33.8, '6M': 32.7, '1Y': 42 },
  XMMO: { '1W': -0.3, '1M': -0.2, 'YTD': 21.7, '6M': 20.6, '1Y': 31 },
  // Electrification
  POW:  { '1W': 0.6, '1M': -2.6, 'YTD': 54.7, '6M': 53.2, '1Y': 50.2 },
  VOLT: { '1W': 0, '1M': 4.6, 'YTD': 41.2, '6M': 39.9, '1Y': 60.5 },
  PBD:  { '1W': 1, '1M': -12.2, 'YTD': 21.1, '6M': 19.9, '1Y': 54.6 },
  PBW:  { '1W': 1.8, '1M': -15.2, 'YTD': 25.9, '6M': 23.8, '1Y': 93 },
  IVEP: { '1W': -1.7, '1M': -1.2, 'YTD': 5.7, '6M': 5.7, '1Y': 5.7 },
  // Industrials
  AIRR: { '1W': 0.9, '1M': 1.9, 'YTD': 33.9, '6M': 32.2, '1Y': 61.7 },
  PRN:  { '1W': 1.2, '1M': 4, 'YTD': 46.2, '6M': 44.5, '1Y': 62.6 },
  RSHO: { '1W': 0, '1M': 5.8, 'YTD': 39.4, '6M': 36.1, '1Y': 57.4 },
  IDEF: { '1W': 0.7, '1M': -8.4, 'YTD': 1.7, '6M': 0.9, '1Y': 10.8 },
  BILT: { '1W': 1.3, '1M': -2.6, 'YTD': 9.7, '6M': 9.4, '1Y': 12.9 },
  // Meme
  BUZZ: { '1W': 2.1, '1M': -9.8, 'YTD': 12.5, '6M': 11.3, '1Y': 20.7 },
  MEME: { '1W': 1.4, '1M': -17.4, 'YTD': 51.9, '6M': 50.2, '1Y': -4 },
  RKNG: { '1W': -2, '1M': -4.3, 'YTD': 8.8, '6M': 8.8, '1Y': 8.8 },
};
// @@END_GENERATED:ETF_RETURNS@@

// @@GENERATED:ETF_DAY_CHANGE@@
// Today's % move per ETF ticker (1D, vs prior close). Refreshed by the 3×/day
// price jobs. Powers the 1D ranking in the theme-ETF side panel.
export const ETF_DAY_CHANGE: Record<string, number> = {
  AIS:  1.47,
  ARTY: 1.01,
  BAI:  1.37,
  IGPT: 0.85,
  IVES: 0.28,
  CHAT: 1.37,
  SPRX: 0.9,
  SOXX: 1.7,
  PSI:  1.56,
  XSD:  0.7,
  DRAM: 1.19,
  PTF:  0.84,
  WCLD: 0.13,
  IGV:  -0.24,
  FDTX: 0.48,
  GTEK: 1.38,
  ARKK: -0.43,
  MARS: 0.18,
  WGMI: -2.9,
  SPMO: 0.75,
  XMMO: 0.63,
  VOLT: 0.21,
  PBD:  1.35,
  PBW:  1,
  AIRR: 0.06,
  PRN:  0.03,
  IDEF: 0.08,
  BUZZ: 0,
  MEME: 0.11,
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
  'AI & ML': { etfs: ['AIS', 'SPRX', 'AIFD'], series: { '1W': [100, 101.74, 99.45, 101.83, 103.8], '1M': [100, 105.01, 105.85, 104.02, 96.2, 96.58, 95.55, 92.81, 97.26, 99.27, 102.94, 101.09, 101.11, 104.97, 107.42, 101.87, 99.41, 101.18, 98.87, 101.23, 103.18], 'YTD': [100, 102.79, 106.24, 107.11, 106.7, 105.69, 107.58, 108.91, 108.99, 103.04, 105.31, 105.27, 100.68, 106.68, 118.6, 125.85, 131.03, 133.28, 148.41, 146.37, 154.29, 164.36, 158.21, 169.32, 167.56, 170.24], '6M': [100, 104.2, 105.01, 106.39, 109.34, 99.56, 106.21, 107.55, 107.9, 102.77, 104.37, 105.26, 100.26, 104.58, 114.96, 123.44, 129.3, 130.96, 141.4, 145.92, 152.32, 162.59, 156.51, 167.49, 165.75, 168.4], '1Y': [100, 99.92, 100.83, 101.82, 106.15, 106.29, 111.07, 109.68, 107.75, 107.8, 113.98, 120.38, 124.45, 123.3, 128.09, 127.21, 129.17, 136.18, 133.95, 132.75, 123.74, 123.43, 128.33, 133.24, 124.1, 130.97, 129.19, 133.63, 136.85, 138.42, 138.2, 136.51, 138.02, 140.55, 140.7, 132.9, 136.12, 137.2, 130.7, 137.61, 153.18, 162.51, 169.34, 172.32, 192.19, 189.38, 199.4, 213.01, 204.91, 219.54, 217.09, 220.79] }, returns: { '1W': 3.8, '1M': 3.2, 'YTD': 70.2, '6M': 68.4, '1Y': 120.8 } },
  'Semiconductors': { etfs: ['PSI', 'DRAM', 'XSD'], series: { '1W': [100, 105.44, 99.8, 102.93, 104.14], '1M': [100, 104.66, 105.74, 102.98, 90.51, 95.83, 94.33, 91.29, 100.42, 101.88, 107.99, 102.61, 103.52, 111.56, 115.53, 104.38, 103.61, 109.3, 103.44, 106.74, 108.01], 'YTD': [100, 107.31, 114.2, 118.33, 117.99, 120.64, 123.75, 124.46, 125.46, 126.65, 128.75, 139.58, 137.07, 136.23, 152.34, 168.02, 178.54, 192.12, 204.55, 191.53, 205.78, 212.59, 218.39, 222.86, 220.92, 225.7], '6M': [100, 107.03, 112.11, 119.5, 119.9, 115.63, 121.95, 123.32, 124.34, 125.63, 127.71, 138.53, 136.03, 134.24, 149.15, 165.03, 180.26, 190.76, 198.75, 189.83, 203.97, 210.78, 216.61, 220.86, 218.99, 223.71], '1Y': [100, 103.47, 103.67, 107.54, 108.05, 107.96, 114.04, 112.45, 113.62, 113.24, 116.42, 122.52, 125.16, 125.23, 129.09, 129.64, 133.5, 137.14, 135.55, 140.72, 135.31, 144.35, 151.77, 151.82, 150.98, 152.42, 144.86, 152.22, 158.59, 162.46, 160.19, 173.88, 177.3, 178.36, 182.31, 174.95, 177.44, 161.53, 165.96, 171, 181, 200.92, 211.11, 221.44, 245.59, 245.98, 260.88, 246.64, 246.26, 266.07, 259.58, 265.49] }, returns: { '1W': 4.1, '1M': 8, 'YTD': 125.7, '6M': 123.7, '1Y': 165.5 } },
  'Broad Tech': { etfs: ['WGMI', 'PTF', 'SGRT'], series: { '1W': [100, 100.52, 100.35, 99.51, 99.32], '1M': [100, 101.92, 102.65, 101.64, 94.18, 94.2, 92.85, 89.78, 93.38, 96.52, 100.25, 100.4, 99.59, 102.65, 103.43, 101.69, 96.99, 97.52, 97.37, 96.55, 96.4], 'YTD': [100, 107.37, 113.44, 114.56, 110.78, 108.34, 111.41, 112.37, 113.64, 103.39, 107.2, 106.9, 103.3, 109.05, 124.04, 132.19, 134.81, 137.37, 152.43, 148.72, 154.31, 167.07, 157.31, 167.45, 169.52, 160.33], '6M': [100, 107.14, 113.06, 112.63, 116.03, 101.38, 109.85, 110.65, 112.79, 103.94, 106.55, 107.69, 102.42, 106.81, 119.55, 129.62, 133.66, 133.83, 147.4, 149.01, 152.96, 165.93, 156.23, 166.3, 168.33, 159.18], '1Y': [100, 104.11, 104.02, 109.81, 107.76, 108.67, 109.16, 114.34, 116.41, 119.72, 124.71, 136.5, 143.51, 142.73, 158.34, 171.1, 158.31, 167.03, 165.71, 152.76, 135.89, 142.91, 143.08, 152.2, 136.64, 144.13, 138.9, 148.22, 156.61, 158.55, 155.42, 151.11, 149.13, 148.41, 149.83, 139.11, 142.6, 144.51, 144.29, 150.73, 167.99, 176.4, 181.28, 188.12, 205.6, 200.19, 211.95, 230.55, 214.2, 228.52, 227.79, 216.25] }, returns: { '1W': -0.7, '1M': -3.6, 'YTD': 60.3, '6M': 59.2, '1Y': 116.3 } },
  'Electrification': { etfs: ['PBW', 'POW', 'VOLT'], series: { '1W': [100, 100.72, 97.81, 100.28, 100.77], '1M': [100, 102.15, 101.03, 100.91, 94.08, 94.79, 93.66, 90.58, 94.75, 95.54, 98.12, 97.06, 97.17, 99.44, 100.56, 96.04, 95.37, 96.17, 93.32, 95.59, 96.03], 'YTD': [100, 104.13, 109.93, 112.37, 112.23, 115.87, 118.59, 119.25, 120.01, 111.47, 114.68, 113.09, 113.84, 116.55, 126.22, 131.1, 137.06, 142.29, 150.16, 142.92, 144.82, 146.92, 138.96, 143.9, 140.65, 140.61], '6M': [100, 103.34, 107.18, 112.15, 113.74, 109.48, 116.01, 117.81, 118.57, 110.12, 113.29, 111.73, 112.48, 114.79, 123.39, 129.12, 136.17, 140.99, 144.71, 141.18, 143.06, 145.12, 137.26, 142.16, 138.96, 138.92], '1Y': [100, 103.07, 105.24, 109.87, 107.4, 106.89, 108.82, 110.15, 111.52, 109.89, 110.1, 112.63, 117.22, 118.7, 126.1, 130.39, 128.68, 130.33, 127.65, 131.73, 124.86, 125.83, 131.03, 133.28, 130.49, 134.51, 128.95, 132.28, 137.95, 141.8, 138.15, 141.38, 140.61, 142.86, 144.73, 139.81, 143.93, 143.71, 145.83, 150.88, 158.32, 164.11, 162.86, 168.18, 176.69, 172.68, 171.48, 173.4, 170.37, 172.45, 168.39, 167.88] }, returns: { '1W': 0.8, '1M': -4, 'YTD': 40.6, '6M': 38.9, '1Y': 67.9 } },
  'Industrials': { etfs: ['PRN', 'RSHO', 'BILT'], series: { '1W': [100, 100.08, 99.53, 101.55, 100.85], '1M': [100, 100.11, 100.31, 100.46, 98.8, 99.99, 99.69, 97.62, 100.11, 100.89, 100.38, 100.21, 100.92, 101.65, 102.66, 102.29, 102.28, 102.35, 101.75, 103.87, 103.13], 'YTD': [100, 102.86, 107.52, 107.45, 108.67, 112.77, 117.45, 119.74, 118.94, 111.8, 110.59, 109.93, 110.58, 113.06, 120.99, 121.98, 123.12, 124.85, 127.6, 126.49, 125.1, 126.65, 127.44, 129.97, 130.76, 131.78], '6M': [100, 101.96, 104.28, 105.98, 107.29, 108.52, 114.29, 117.65, 117.42, 112.92, 110.18, 109.35, 110.49, 111.36, 118.47, 119, 120.87, 122.01, 125.8, 125.16, 123.18, 125.08, 125.76, 128.26, 129, 130.02], '1Y': [100, 101.16, 101.86, 102.72, 104.59, 103.32, 103.39, 103.95, 104.13, 104.12, 104.85, 106.14, 107.96, 107.89, 108.61, 108.22, 109.8, 111.17, 109.12, 109.54, 105.08, 106.18, 107.12, 108.77, 109.48, 111.43, 109.88, 112.7, 117.99, 119.24, 120.38, 124.94, 128.36, 131.03, 128.89, 123.44, 119.64, 120.4, 121.44, 123.98, 131.65, 131.87, 135.16, 136.18, 139.5, 138.98, 136.69, 138.23, 139.2, 140.37, 143.38, 144.3] }, returns: { '1W': 0.8, '1M': 3.1, 'YTD': 31.8, '6M': 30, '1Y': 44.3 } },
  'Meme': { etfs: ['MEME', 'BUZZ', 'RKNG'], series: { '1W': [100, 98.03, 97.25, 99.3, 100.5], '1M': [100, 101.9, 100.32, 99.98, 93.35, 91.18, 89.78, 87.17, 89.81, 90.62, 93.92, 93.18, 92.37, 94.47, 95.69, 93.12, 89.39, 87.58, 86.99, 88.59, 89.75], 'YTD': [100, 108.03, 105.55, 106.35, 99.1, 96.61, 93.56, 92.18, 92.59, 90.59, 93.4, 90.91, 89.09, 94.06, 106.02, 116.48, 112.46, 116.64, 129.64, 124.23, 135.41, 140.91, 127.35, 133.52, 126.94, 124.43], '6M': [100, 106.61, 105.1, 106.36, 101.86, 90.21, 91.62, 91.46, 91.87, 89.89, 92.68, 90.19, 88.42, 93.79, 101.91, 114.45, 111.53, 114.5, 124.38, 123.24, 134.35, 139.8, 126.34, 132.49, 125.96, 123.47], '1Y': [100, 102.85, 100.55, 95.58, 95.13, 91.22, 89.55, 87.26, 83.69, 82.09, 84.62, 87.99, 90.52, 88.33, 87, 90.94, 88, 93.01, 91.61, 90.92, 88.28, 86.36, 84.62, 84.38, 85.33, 86.71, 86.87, 91.01, 91.03, 91.17, 90.25, 88.24, 88.68, 87.8, 91.78, 92.01, 96.64, 99.11, 91.76, 94.54, 102.28, 108.61, 111.24, 108, 112.92, 113.36, 115.07, 114.27, 113.6, 114.31, 107.91, 108.51] }, returns: { '1W': 0.5, '1M': -10.3, 'YTD': 24.4, '6M': 23.5, '1Y': 8.5 } },
};
// @@END_GENERATED:THEME_REPRESENTATIVES@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 10, avgWeight: 6.04, proScore: 6.04, coverage: 1,
      price: 198.2, weeklyPrices: [199.00, 195.74, 192.53, 194.97, 198.20], weeklyChange: -0.4, dayChange: 1.66, sortRank: 0, periodReturns: { '1M': -6.1, 'YTD': 6.3, '6M': 5.7, '1Y': 25.5 },
      priceHistory: { '1D': [194.97, 198.21, 198.2], '1W': [199, 195.74, 192.53, 194.97, 198.2], '1M': [224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 198.2], 'YTD': [186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 225.32, 215.33, 224.36, 208.64, 212.45, 200.04, 198.2], '6M': [187.54, 189.11, 183.14, 184.84, 192.51, 171.88, 186.94, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 225.32, 215.33, 224.36, 208.64, 212.45, 200.04, 198.2], '1Y': [157.99, 160, 170.7, 167.03, 175.51, 178.26, 183.16, 182.01, 179.81, 170.78, 170.76, 174.88, 178.43, 186.58, 185.04, 180.03, 181.16, 201.03, 198.69, 193.16, 186.6, 182.55, 181.46, 184.97, 177.72, 189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 186.94, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 225.32, 215.33, 224.36, 208.64, 212.45, 200.04, 198.2] },
      velocityScore: { '1D': -0.7, '1W': -3, '1M': 16.2, '6M': null }, isNew: false,
      marketCap: '$4.8T', pe: 30.4, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.51,
      etfPresence: { AIS: 2.28, ARTY: 4.4, BAI: 3.89, IGPT: 7.2, IVES: 4.69, ALAI: 12.14, CHAT: 6.33, AIFD: 6.05, SPRX: 3.33, AOTG: 10.11 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 6.61, proScore: 5.95, coverage: 0.9,
      price: 1145.02, weeklyPrices: [1048.51, 1213.56, 1132.33, 1145.28, 1145.02], weeklyChange: 9.2, dayChange: -0.02, sortRank: 0, periodReturns: { '1M': 17.9, 'YTD': 301.2, '6M': 291.3, '1Y': 829 },
      priceHistory: { '1D': [1145.28, 1144.12, 1145.02], '1W': [1048.51, 1213.56, 1132.33, 1145.28, 1145.02], '1M': [1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1145.02], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 724.66, 751, 1035.5, 949.28, 1087.99, 1051.77, 1145.02], '6M': [292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 1035.5, 949.28, 1087.99, 1051.77, 1145.02], '1Y': [123.25, 124.42, 120.11, 109.22, 111.96, 109.06, 127.75, 123.55, 116.42, 118.48, 135.24, 158.82, 166.41, 167.32, 185.69, 187.06, 202.29, 221.91, 218.03, 241.11, 241.95, 223.93, 239.49, 252.42, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 724.66, 751, 1035.5, 949.28, 1087.99, 1051.77, 1145.02] },
      velocityScore: { '1D': -0.8, '1W': -2.1, '1M': -5.9, '6M': null }, isNew: false,
      marketCap: '$1.3T', pe: 25.9, revenueGrowth: 346, eps: 44.21, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { AIS: 7.3, ARTY: 5.52, BAI: 6.8, IGPT: 8.71, IVES: 5.41, ALAI: 1.5, CHAT: 4.41, AIFD: 7.39, SPRX: false, AOTG: 12.41 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 9, avgWeight: 5.61, proScore: 5.05, coverage: 0.9,
      price: 558.96, weeklyPrices: [519.74, 532.57, 521.58, 539.49, 558.96], weeklyChange: 7.55, dayChange: 3.61, sortRank: 0, periodReturns: { '1M': 8.3, 'YTD': 161, '6M': 159.6, '1Y': 293.9 },
      priceHistory: { '1D': [539.49, 558.33, 558.96], '1W': [519.74, 532.57, 521.58, 539.49, 558.96], '1M': [510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 558.96], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 424.1, 467.51, 510.13, 490.33, 547.26, 519.85, 558.96], '6M': [215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 467.51, 510.13, 490.33, 547.26, 519.85, 558.96], '1Y': [141.9, 137.82, 155.61, 154.72, 177.44, 174.31, 174.95, 176.14, 163.36, 162.32, 155.82, 160.46, 160.9, 161.79, 211.51, 218.09, 238.03, 258.01, 250.05, 237.52, 240.52, 215.05, 215.24, 221.62, 209.17, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 205.94, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 424.1, 467.51, 510.13, 490.33, 547.26, 519.85, 558.96] },
      velocityScore: { '1D': 0.6, '1W': 1.4, '1M': -2.5, '6M': null }, isNew: false,
      marketCap: '$911B', pe: 185.1, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.78, ARTY: 5.03, BAI: 4.89, IGPT: 8.36, IVES: 4.84, ALAI: 1.28, CHAT: 4.2, AIFD: false, SPRX: 0.56, AOTG: 16.54 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 8, avgWeight: 3.49, proScore: 2.79, coverage: 0.8,
      price: 375.82, weeklyPrices: [382.07, 378.91, 365.02, 372.45, 375.82], weeklyChange: -1.64, dayChange: 0.9, sortRank: 0, periodReturns: { '1M': -15.9, 'YTD': 8.6, '6M': 7.4, '1Y': 36.3 },
      priceHistory: { '1D': [372.45, 375.3, 375.82], '1W': [382.07, 378.91, 365.02, 372.45, 375.82], '1M': [459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 375.82], 'YTD': [346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 425.19, 414.14, 459.97, 396.6, 393.94, 380.15, 375.82], '6M': [349.85, 343.5, 339.89, 325.49, 330.73, 310.51, 331.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 425.19, 414.14, 459.97, 396.6, 393.94, 380.15, 375.82], '1Y': [275.65, 271.8, 280.94, 278.59, 297.42, 292.93, 312.83, 305.76, 294.23, 298.24, 336.67, 360, 338.94, 329.91, 336.41, 344.13, 342.66, 372.97, 351.94, 351.96, 342.65, 377.96, 381.57, 406.29, 341.3, 349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 331.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 425.19, 414.14, 459.97, 396.6, 393.94, 380.15, 375.82] },
      velocityScore: { '1D': -0.7, '1W': 1.1, '1M': -15.5, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 62.6, revenueGrowth: 48, eps: 6, grossMargin: 76, dividendYield: 0.7,
      etfPresence: { AIS: 0.62, ARTY: 4.33, BAI: 4, IGPT: false, IVES: 4.6, ALAI: 3.79, CHAT: 4, AIFD: 5.1, SPRX: false, AOTG: 1.48 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 7, avgWeight: 3.62, proScore: 2.53, coverage: 0.7,
      price: 284.52, weeklyPrices: [276.70, 281.26, 266.77, 277.75, 284.52], weeklyChange: 2.83, dayChange: 2.44, sortRank: 0, periodReturns: { '1M': 38.8, 'YTD': 234.8, '6M': 227.9, '1Y': 267.6 },
      priceHistory: { '1D': [277.75, 283.73, 284.52], '1W': [276.7, 281.26, 266.77, 277.75, 284.52], '1M': [219.43, 290.79, 301.65, 316.43, 263.47, 288.85, 266.88, 252.59, 280.71, 279.7, 308.88, 278.67, 289.54, 310.58, 307.86, 279.04, 276.7, 281.26, 266.77, 277.75, 284.52], 'YTD': [84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 79.48, 81.69, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 163.66, 170.84, 176.89, 196.33, 219.43, 288.85, 308.88, 279.04, 284.52], '6M': [86.76, 84.64, 81.21, 83.1, 81.34, 74.21, 78.23, 79.48, 81.69, 89.57, 87.86, 87.91, 94.88, 107.11, 128.49, 139.69, 164.31, 164.95, 170.13, 176.89, 196.33, 219.43, 288.85, 308.88, 279.04, 284.52], '1Y': [77.4, 71.95, 72.41, 71.99, 76.34, 76.63, 77.81, 76.74, 72.95, 64.6, 66.84, 68.86, 74.62, 84.07, 86.97, 86.22, 84.26, 88.46, 87.59, 89.33, 83.45, 83.79, 92.89, 88.9, 84.07, 87.68, 84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.23, 79.48, 81.69, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 163.66, 170.84, 176.89, 196.33, 219.43, 288.85, 308.88, 279.04, 284.52] },
      velocityScore: { '1D': 0.8, '1W': -7.7, '1M': 12.4, '6M': null }, isNew: false,
      marketCap: '$249B', pe: 97.4, revenueGrowth: 28, eps: 2.92, grossMargin: 52, dividendYield: 0.09,
      etfPresence: { AIS: 3.94, ARTY: 4.37, BAI: 1.97, IGPT: 3.52, IVES: false, ALAI: false, CHAT: 1.53, AIFD: 5.83, SPRX: 4.18, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'ANET', name: 'Arista Networks Inc', easyScore: 7, avgWeight: 2.01, proScore: 1.41, coverage: 0.7,
      price: 163.6, weeklyPrices: [161.74, 165.45, 157.60, 164.10, 163.60], weeklyChange: 1.15, dayChange: -0.3, sortRank: 0, periodReturns: { '1M': 2.6, 'YTD': 24.9, '6M': 23.5, '1Y': 59.9 },
      priceHistory: { '1D': [164.1, 163.99, 163.6], '1W': [161.74, 165.45, 157.6, 164.1, 163.6], '1M': [170.68, 175.33, 174.37, 166.01, 154.27, 156.4, 152.16, 151.76, 156.4, 163.24, 169.09, 168.01, 164.93, 169.67, 174.56, 162.2, 161.74, 165.45, 157.6, 164.1, 163.6], 'YTD': [131.03, 123.72, 130.59, 136.34, 141.74, 137.49, 141.59, 132.79, 133.5, 132.89, 133.57, 131.22, 120.77, 126.25, 152.02, 166.85, 172.47, 172.62, 136.43, 141.97, 154.03, 170.68, 156.4, 169.09, 162.2, 163.6], '6M': [132.44, 130.08, 125.09, 138.41, 148.15, 128.67, 135.12, 132.79, 133.5, 132.89, 133.57, 131.22, 120.77, 126.68, 147.35, 164.23, 176.91, 172.7, 141.77, 141.97, 154.03, 170.68, 156.4, 169.09, 162.2, 163.6], '1Y': [102.31, 103.39, 107.37, 109.78, 118.62, 118.12, 141.25, 138.04, 133.04, 135.87, 141.91, 142.16, 144.09, 145.71, 145.29, 138.79, 145.94, 156.77, 153.55, 134.93, 127.26, 122.17, 127.22, 130.04, 126.13, 131.32, 131.03, 123.72, 130.59, 136.34, 141.74, 137.49, 135.12, 132.79, 133.5, 132.89, 133.57, 131.22, 120.77, 126.25, 152.02, 166.85, 172.47, 172.62, 136.43, 141.97, 154.03, 170.68, 156.4, 169.09, 162.2, 163.6] },
      velocityScore: { '1D': 0.7, '1W': 5.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$206B', pe: 56.4, revenueGrowth: 35, eps: 2.9, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: 1.38, ARTY: 2.42, BAI: 1.31, IGPT: false, IVES: false, ALAI: 0.4, CHAT: 2.2, AIFD: 4.75, SPRX: 1.6, AOTG: false },
      tonyNote: 'Arista Networks Inc appears in 7 of 10 AI & ML ETFs (70% coverage) with average weight 2.0% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 4.83, proScore: 2.9, coverage: 0.6,
      price: 351.38, weeklyPrices: [345.29, 343.71, 337.39, 353.65, 351.38], weeklyChange: 1.76, dayChange: -0.64, sortRank: 0, periodReturns: { '1M': -7.6, 'YTD': 12.3, '6M': 12, '1Y': 99.4 },
      priceHistory: { '1D': [353.65, 351.45, 351.38], '1W': [345.29, 343.71, 337.39, 353.65, 351.38], '1M': [376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68, 369.35, 373.25, 363.79, 368.03, 349.68, 346.13, 345.29, 343.71, 337.39, 353.65, 351.38], 'YTD': [313, 325.44, 332.78, 327.93, 338, 322.86, 305.72, 314.98, 311.76, 298.52, 302.28, 301, 274.34, 299.99, 321.31, 337.42, 350.34, 383.25, 388.64, 396.78, 382.97, 376.37, 363.31, 369.35, 346.13, 351.38], '6M': [313.85, 321.98, 335.84, 330.54, 338.25, 331.25, 309, 314.98, 311.76, 298.52, 302.28, 301, 274.34, 295.77, 317.24, 341.68, 344.4, 385.69, 400.8, 396.78, 382.97, 376.37, 363.31, 369.35, 346.13, 351.38], '1Y': [176.23, 174.36, 182, 191.34, 195.75, 194.67, 203.34, 203.5, 208.49, 211.35, 239.63, 251.16, 251.66, 243.1, 245.76, 245.45, 250.46, 267.47, 277.54, 291.31, 285.02, 318.58, 315.81, 317.08, 306.57, 314.35, 313, 325.44, 332.78, 327.93, 338, 322.86, 309, 314.98, 311.76, 298.52, 302.28, 301, 274.34, 299.99, 321.31, 337.42, 350.34, 383.25, 388.64, 396.78, 382.97, 376.37, 363.31, 369.35, 346.13, 351.38] },
      velocityScore: { '1D': 1.4, '1W': 2.1, '1M': -17.1, '6M': null }, isNew: false,
      marketCap: '$4.3T', pe: 26.8, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.05, IGPT: 7.48, IVES: 4.67, ALAI: false, CHAT: 5.22, AIFD: 4.71, SPRX: false, AOTG: 3.87 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 6, avgWeight: 2.74, proScore: 1.65, coverage: 0.6,
      price: 646.47, weeklyPrices: [643.83, 675.39, 586.45, 651.88, 646.47], weeklyChange: 0.41, dayChange: -0.83, sortRank: 0, periodReturns: { '1M': 21.7, 'YTD': 275.3, '6M': 267.2, '1Y': 910.3 },
      priceHistory: { '1D': [651.88, 646.15, 646.47], '1W': [643.83, 675.39, 586.45, 651.88, 646.47], '1M': [546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 646.47], 'YTD': [172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 482.02, 484.28, 546.2, 526.93, 653.53, 670.75, 646.47], '6M': [176.06, 199.88, 215, 243.29, 278.41, 260.19, 284.1, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 294.97, 343.43, 372.52, 404, 431.52, 480, 482.02, 484.28, 546.2, 526.93, 653.53, 670.75, 646.47], '1Y': [63.99, 64.02, 67.53, 67.06, 70.61, 75.84, 75.91, 76.29, 79.22, 81.91, 94.54, 103.09, 110.25, 120.06, 119.93, 113.13, 121.41, 124.92, 152.18, 169.99, 162.45, 150.93, 159.99, 169.54, 174.58, 178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 284.1, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 482.02, 484.28, 546.2, 526.93, 653.53, 670.75, 646.47] },
      velocityScore: { '1D': 8.6, '1W': -8.3, '1M': -15.4, '6M': null }, isNew: false,
      marketCap: '$223B', pe: 38.7, revenueGrowth: 46, eps: 16.69, grossMargin: 45, dividendYield: 0.09,
      etfPresence: { AIS: 1.43, ARTY: 3.08, BAI: 3.39, IGPT: 3.25, IVES: false, ALAI: 4.51, CHAT: false, AIFD: false, SPRX: false, AOTG: 0.81 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 5, avgWeight: 5.2, proScore: 2.6, coverage: 0.5,
      price: 458.13, weeklyPrices: [440.83, 434.99, 432.35, 455.10, 458.13], weeklyChange: 3.92, dayChange: 0.69, sortRank: 0, periodReturns: { '1M': 9.5, 'YTD': 50.8, '6M': 52.9, '1Y': 102.3 },
      priceHistory: { '1D': [455, 457.66, 458.13], '1W': [440.83, 434.99, 432.35, 455.1, 458.13], '1M': [435.63, 446.69, 436.69, 444.92, 415.17, 426.8, 427.92, 408.75, 421.07, 423.93, 441.4, 425.83, 432.15, 462.12, 467.67, 436.39, 440.83, 434.99, 432.35, 455.1, 458.13], 'YTD': [303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 370.54, 374.58, 338.89, 338.31, 329.24, 326.74, 341.76, 369.57, 366.24, 404.98, 401.61, 404.54, 404.35, 404.52, 435.63, 426.8, 441.4, 436.39, 458.13], '6M': [299.58, 318.68, 327.11, 327.37, 339.55, 330.73, 368.1, 370.54, 374.58, 338.89, 338.31, 329.24, 326.74, 339.04, 370.6, 370.5, 402.46, 397.67, 411.68, 404.35, 404.52, 435.63, 426.8, 441.4, 436.39, 458.13], '1Y': [226.49, 227.86, 236.95, 234.6, 241.33, 232.47, 244.29, 241.41, 235.59, 228.39, 250.92, 262.06, 282.71, 279.29, 294.03, 295.94, 294.51, 301.53, 294.05, 291.17, 282.01, 284.64, 292.09, 303.41, 286.87, 296.95, 303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 368.1, 370.54, 374.58, 338.89, 338.31, 329.24, 326.74, 341.76, 369.57, 366.24, 404.98, 401.61, 404.54, 404.35, 404.52, 435.63, 426.8, 441.4, 436.39, 458.13] },
      velocityScore: { '1D': 1.6, '1W': -12.2, '1M': -13, '6M': null }, isNew: false,
      marketCap: '$2.4T', pe: 39.8, revenueGrowth: 35, eps: 11.51, grossMargin: 62, dividendYield: 0.84,
      etfPresence: { AIS: 3.27, ARTY: false, BAI: 4.48, IGPT: false, IVES: 5.11, ALAI: 5.79, CHAT: false, AIFD: false, SPRX: false, AOTG: 7.34 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 5, avgWeight: 3.97, proScore: 1.99, coverage: 0.5,
      price: 239.96, weeklyPrices: [234.27, 227.01, 232.69, 240.14, 239.96], weeklyChange: 2.43, dayChange: -0.07, sortRank: 0, periodReturns: { '1M': -11.3, 'YTD': 4, '6M': 3.2, '1Y': 9.4 },
      priceHistory: { '1D': [240.14, 239.18, 239.96], '1W': [234.27, 227.01, 232.69, 240.14, 239.96], '1M': [261.26, 256.52, 250.02, 253.79, 246.03, 245.22, 244.19, 238, 241.51, 238.55, 246.02, 246, 237.5, 244.39, 232.79, 234.11, 234.27, 227.01, 232.69, 240.14, 239.96], 'YTD': [230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 198.79, 210.11, 210, 213.21, 207.67, 205.37, 199.34, 212.79, 239.89, 248.28, 261.12, 272.05, 268.99, 264.14, 266.32, 261.26, 245.22, 246.02, 234.11, 239.96], '6M': [232.53, 241.56, 236.65, 234.34, 241.73, 222.69, 199.6, 210.11, 210, 213.21, 207.67, 205.37, 199.34, 209.77, 238.38, 250.56, 263.99, 268.26, 272.68, 264.14, 266.32, 261.26, 245.22, 246.02, 234.11, 239.96], '1Y': [219.39, 219.36, 226.35, 227.47, 231.01, 213.75, 221.47, 231.49, 227.94, 225.34, 238.24, 234.05, 220.71, 219.57, 221.78, 216.39, 222.03, 229.25, 249.32, 249.1, 232.87, 226.28, 234.42, 227.92, 222.56, 232.14, 230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 199.6, 210.11, 210, 213.21, 207.67, 205.37, 199.34, 212.79, 239.89, 248.28, 261.12, 272.05, 268.99, 264.14, 266.32, 261.26, 245.22, 246.02, 234.11, 239.96] },
      velocityScore: { '1D': 0, '1W': 33.6, '1M': -30.9, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 31.6, revenueGrowth: 17, eps: 7.59, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 4.81, ALAI: 5.5, CHAT: 2.39, AIFD: 3.32, SPRX: false, AOTG: 3.84 },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 5, avgWeight: 3.83, proScore: 1.92, coverage: 0.5,
      price: 557.67, weeklyPrices: [557.67, 542.87, 550.25, 562.60, 557.67], weeklyChange: 0, dayChange: -0.88, sortRank: 0, periodReturns: { '1M': -11.8, 'YTD': -15.5, '6M': -16.3, '1Y': -24.4 },
      priceHistory: { '1D': [562.6, 556.48, 557.67], '1W': [557.67, 542.87, 550.25, 562.6, 557.67], '1M': [600.47, 597.63, 622.98, 627.57, 593, 585.39, 584.59, 570.98, 568.43, 566.98, 593.48, 600.21, 567.58, 577.22, 563.85, 562.2, 557.67, 542.87, 550.25, 562.6, 557.67], 'YTD': [660.09, 646.06, 620.8, 658.76, 716.5, 661.46, 639.77, 655.66, 648.18, 644.86, 613.71, 593.66, 525.72, 573.02, 634.53, 670.91, 678.62, 610.41, 598.86, 614.23, 610.26, 600.47, 585.39, 593.48, 562.2, 557.67], '6M': [665.95, 648.69, 615.52, 647.63, 738.31, 670.21, 649.81, 655.66, 648.18, 644.86, 613.71, 593.66, 525.72, 574.46, 629.86, 688.55, 675.03, 608.75, 609.63, 614.23, 610.26, 600.47, 585.39, 593.48, 562.2, 557.67], '1Y': [738.09, 720.67, 710.39, 704.81, 700, 763.46, 790, 767.37, 753.3, 735.11, 765.7, 779, 755.4, 734.38, 713.08, 708.65, 733.27, 751.44, 627.32, 627.08, 602.01, 613.05, 647.1, 656.96, 657.15, 664.94, 660.09, 646.06, 620.8, 658.76, 716.5, 661.46, 649.81, 655.66, 648.18, 644.86, 613.71, 593.66, 525.72, 573.02, 634.53, 670.91, 678.62, 610.41, 598.86, 614.23, 610.26, 600.47, 585.39, 593.48, 562.2, 557.67] },
      velocityScore: { '1D': 0, '1W': 2.7, '1M': -27.8, '6M': null }, isNew: false,
      marketCap: '$1.4T', pe: 20.3, revenueGrowth: 33, eps: 27.51, grossMargin: 82, dividendYield: 0.37,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: 7.49, IVES: 4.62, ALAI: 3.92, CHAT: 2.06, AIFD: false, SPRX: false, AOTG: 1.06 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 5, avgWeight: 3.65, proScore: 1.83, coverage: 0.5,
      price: 470.63, weeklyPrices: [399.92, 398.00, 391.74, 455.96, 470.63], weeklyChange: 17.68, dayChange: 3.22, sortRank: 0, periodReturns: { '1M': 37.3, 'YTD': 182.9, '6M': 175.5, '1Y': 420.5 },
      priceHistory: { '1D': [455.96, 466.45, 470.63], '1W': [399.92, 398, 391.74, 455.96, 470.63], '1M': [320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 470.63], 'YTD': [166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 129.68, 118.83, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 232.68, 306.88, 320.09, 346.33, 389.2, 397.02, 470.63], '6M': [170.84, 165.77, 172.14, 176.35, 160.46, 142.82, 126.58, 129.68, 118.83, 119.2, 120.31, 116.04, 112.47, 117.14, 149.05, 174.05, 212.84, 202.68, 199.79, 232.68, 306.88, 320.09, 346.33, 389.2, 397.02, 470.63], '1Y': [90.42, 92.3, 92.36, 116.91, 118.41, 135.54, 192, 186.43, 174.15, 174.24, 214.49, 238.79, 230.11, 195.8, 212.1, 161.55, 157.51, 168.25, 179.31, 167.55, 141.39, 147.75, 142.94, 167.08, 144.94, 168.83, 166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 126.58, 129.68, 118.83, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 232.68, 306.88, 320.09, 346.33, 389.2, 397.02, 470.63] },
      velocityScore: { '1D': 7, '1W': 14.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$81B', pe: 322.4, revenueGrowth: 93, eps: 1.46, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 2.29, ARTY: 1.55, BAI: false, IGPT: false, IVES: false, ALAI: 1.33, CHAT: 3.25, AIFD: false, SPRX: 9.85, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.43, proScore: 1.71, coverage: 0.5,
      price: 369.13, weeklyPrices: [365.46, 352.83, 372.97, 368.57, 369.13], weeklyChange: 1, dayChange: 0.15, sortRank: 0, periodReturns: { '1M': -18, 'YTD': -23.7, '6M': -24.3, '1Y': -25.8 },
      priceHistory: { '1D': [368.57, 369.15, 369.13], '1W': [365.46, 352.83, 372.97, 368.57, 369.13], '1M': [460.52, 441.31, 427.34, 428.05, 416.67, 411.74, 403.41, 397.36, 390.34, 390.74, 399.76, 393.83, 378.91, 379.4, 367.34, 373.94, 365.46, 352.83, 372.97, 368.57, 369.13], 'YTD': [483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 397.23, 392.74, 408.96, 395.55, 381.87, 356.77, 372.88, 384.37, 418.07, 424.82, 413.62, 412.66, 421.92, 418.57, 460.52, 411.74, 399.76, 373.94, 369.13], '6M': [487.48, 483.47, 459.38, 451.14, 433.5, 393.67, 401.84, 397.23, 392.74, 408.96, 395.55, 381.87, 356.77, 373.46, 370.87, 422.79, 424.62, 414.44, 415.12, 421.92, 418.57, 460.52, 411.74, 399.76, 373.94, 369.13], '1Y': [497.41, 496.62, 505.82, 505.27, 512.57, 527.75, 529.24, 517.1, 504.26, 505.12, 498.41, 509.04, 509.23, 517.95, 523.98, 513.57, 517.66, 542.07, 514.33, 508.68, 507.49, 474, 490, 492.02, 476.39, 486.85, 483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.84, 397.23, 392.74, 408.96, 395.55, 381.87, 356.77, 372.88, 384.37, 418.07, 424.82, 413.62, 412.66, 421.92, 418.57, 460.52, 411.74, 399.76, 373.94, 369.13] },
      velocityScore: { '1D': -3.4, '1W': 3.6, '1M': -34.2, '6M': null }, isNew: false,
      marketCap: '$2.7T', pe: 22, revenueGrowth: 18, eps: 16.81, grossMargin: 68, dividendYield: 0.99,
      etfPresence: { AIS: false, ARTY: 2.43, BAI: false, IGPT: false, IVES: 4.54, ALAI: 4.81, CHAT: 2.09, AIFD: false, SPRX: false, AOTG: 3.26 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 5, avgWeight: 2.75, proScore: 1.38, coverage: 0.5,
      price: 862.1, weeklyPrices: [842.53, 861.97, 816.98, 851.40, 862.10], weeklyChange: 2.32, dayChange: 1.26, sortRank: 0, periodReturns: { '1M': 0.8, 'YTD': 133.9, '6M': 132.3, '1Y': 806.9 },
      priceHistory: { '1D': [851.4, 856.48, 862.1], '1W': [842.53, 861.97, 816.98, 851.4, 862.1], '1M': [905, 1029.15, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93, 827.92, 842.53, 861.97, 816.98, 851.4, 862.1], 'YTD': [368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 667.77, 700.91, 558.44, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 1053.09, 970.7, 946.9, 905, 895.4, 957.24, 827.92, 862.1], '6M': [371.18, 392.88, 331.62, 354.49, 381.44, 504.42, 583.46, 667.77, 700.91, 558.44, 622.5, 706.35, 702.73, 826.88, 897.3, 894.07, 881.64, 949.93, 903.8, 970.7, 946.9, 905, 895.4, 957.24, 827.92, 862.1], '1Y': [95.06, 91.31, 98.14, 99.63, 109.48, 108.15, 119.66, 118.98, 123.42, 132.55, 151.73, 170.9, 163.99, 162.71, 157.15, 156.78, 162.95, 198.39, 188.36, 252.47, 242.07, 299.36, 302.81, 360.33, 316.15, 387.41, 368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 583.46, 667.77, 700.91, 558.44, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 1053.09, 970.7, 946.9, 905, 895.4, 957.24, 827.92, 862.1] },
      velocityScore: { '1D': 1.5, '1W': 4.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$67B', pe: 151.2, revenueGrowth: 90, eps: 5.7, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.57, IGPT: false, IVES: false, ALAI: 0.76, CHAT: 1.42, AIFD: 5.61, SPRX: 3.4, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 5 of 10 AI & ML ETFs (50% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 5, avgWeight: 2.51, proScore: 1.26, coverage: 0.5,
      price: 2124.89, weeklyPrices: [1914.46, 2335.00, 2090.71, 2050.39, 2124.89], weeklyChange: 10.99, dayChange: 3.63, sortRank: 0, periodReturns: { '1M': 25.4, 'YTD': 795.1, '6M': 784.6, '1Y': 4585.5 },
      priceHistory: { '1D': [2050.39, 2104.82, 2124.89], '1W': [1914.46, 2335, 2090.71, 2050.39, 2124.89], '1M': [1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2124.89], 'YTD': [237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 649.97, 635.36, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1407.61, 1478.69, 1761.43, 1642, 2107.86, 1963.6, 2124.89], '6M': [240.22, 353.56, 387.81, 503.44, 539.3, 576.2, 630.29, 649.97, 635.36, 527.33, 661.62, 709.71, 615.83, 701.59, 851.77, 920.99, 989.9, 1187, 1562.34, 1407.61, 1478.69, 1761.43, 1642, 2107.86, 1963.6, 2124.89], '1Y': [45.35, 46.17, 42.72, 41.36, 42.93, 41.93, 46.83, 45.52, 46.78, 51.07, 70.51, 91.55, 106.4, 112.2, 120.95, 127.29, 149.29, 175.53, 194.57, 271.58, 265.88, 226.96, 205.35, 219.46, 209.31, 244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 630.29, 649.97, 635.36, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1407.61, 1478.69, 1761.43, 1642, 2107.86, 1963.6, 2124.89] },
      velocityScore: { '1D': -3.1, '1W': -0.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$315B', pe: 72.5, revenueGrowth: 251, eps: 29.32, grossMargin: 56, dividendYield: null,
      etfPresence: { AIS: 2.25, ARTY: false, BAI: 3.12, IGPT: 4.4, IVES: false, ALAI: 0.58, CHAT: false, AIFD: false, SPRX: false, AOTG: 2.21 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'CRDO', name: 'Credo Technology Group Holding Ltd', easyScore: 5, avgWeight: 1.86, proScore: 0.93, coverage: 0.5,
      price: 256.75, weeklyPrices: [268.99, 268.03, 238.00, 245.68, 256.75], weeklyChange: -4.55, dayChange: 4.51, sortRank: 0, periodReturns: { '1M': 8.8, 'YTD': 78.4, '6M': 77.2, '1Y': 177.3 },
      priceHistory: { '1D': [245.68, 256.42, 256.75], '1W': [268.99, 268.03, 238, 245.68, 256.75], '1M': [226.1, 229, 214.6, 217.5, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 245.68, 256.75], 'YTD': [143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.06, 112.27, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 210.22, 172.17, 218.41, 226.1, 222.27, 259.41, 272.01, 256.75], '6M': [144.92, 141, 156.84, 135.1, 129.47, 98.06, 121.78, 124.06, 112.27, 109.83, 117.69, 103.4, 95.24, 101.45, 119.59, 160.69, 195.04, 184.38, 188.51, 172.17, 218.41, 226.1, 222.27, 259.41, 272.01, 256.75], '1Y': [92.59, 93.36, 102.59, 92.93, 109.38, 110.29, 125.38, 118.74, 115.41, 124.27, 149.03, 164.42, 162.26, 145.61, 137.2, 129.75, 144.17, 162.18, 164.23, 158.5, 145.58, 150.85, 188.44, 170.29, 140.34, 147.81, 143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.78, 124.06, 112.27, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 210.22, 172.17, 218.41, 226.1, 222.27, 259.41, 272.01, 256.75] },
      velocityScore: { '1D': -2.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$48B', pe: 102.3, revenueGrowth: 157, eps: 2.51, grossMargin: 68, dividendYield: null,
      etfPresence: { AIS: 1, ARTY: 1.21, BAI: 1.98, IGPT: false, IVES: false, ALAI: false, CHAT: 2.15, AIFD: false, SPRX: 2.94, AOTG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 4, avgWeight: 3.21, proScore: 1.28, coverage: 0.4,
      price: 134.75, weeklyPrices: [131.65, 132.87, 128.32, 131.72, 134.75], weeklyChange: 2.35, dayChange: 2.3, sortRank: 0, periodReturns: { '1M': 17.5, 'YTD': 265.2, '6M': 261.2, '1Y': 501.5 },
      priceHistory: { '1D': [131.72, 133.59, 134.75], '1W': [131.65, 132.87, 128.32, 131.72, 134.75], '1M': [109.33, 107.93, 112.71, 111.78, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 134.75], 'YTD': [36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 44.11, 45.61, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 129.44, 108.77, 119.84, 109.33, 110.27, 127.86, 132.28, 134.75], '6M': [37.3, 42.63, 48.72, 54.32, 48.66, 48.24, 46.48, 44.11, 45.61, 43.42, 45.77, 43.87, 43.13, 50.38, 62.38, 68.5, 82.54, 99.62, 124.92, 108.77, 119.84, 109.33, 110.27, 127.86, 132.28, 134.75], '1Y': [22.4, 23.59, 22.92, 23.24, 20.41, 20.19, 21.81, 23.66, 24.55, 24.21, 24.44, 25.27, 29.34, 33.55, 37.17, 35.63, 38.12, 41.53, 37.03, 37.88, 34.71, 35.79, 43.47, 40.5, 37.31, 36.35, 36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.48, 44.11, 45.61, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 129.44, 108.77, 119.84, 109.33, 110.27, 127.86, 132.28, 134.75] },
      velocityScore: { '1D': 0, '1W': -0.8, '1M': -50.6, '6M': null }, isNew: false,
      marketCap: '$677B', pe: null, revenueGrowth: 7, eps: -0.61, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.49, ARTY: false, BAI: 3.2, IGPT: 4.8, IVES: false, ALAI: false, CHAT: 1.34, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'ARM', name: 'ARM Holdings PLC', easyScore: 4, avgWeight: 3.03, proScore: 1.21, coverage: 0.4,
      price: 353.43, weeklyPrices: [359.08, 347.71, 334.27, 343.58, 353.43], weeklyChange: -1.57, dayChange: 2.87, sortRank: 0, periodReturns: { '1M': 0, 'YTD': 223.3, '6M': 218.8, '1Y': 118.5 },
      priceHistory: { '1D': [343.58, 352, 353.43], '1W': [359.08, 347.71, 334.27, 343.58, 353.43], '1M': [408.85, 402.71, 411.83, 393.44, 342.93, 346.39, 324.86, 307.43, 342.23, 380.81, 412.55, 396.34, 418.88, 439.46, 407.72, 366.39, 359.08, 347.71, 334.27, 343.58, 353.43], 'YTD': [109.31, 113.08, 105.11, 116.07, 105.36, 123.7, 125.28, 125.58, 127.45, 114.38, 115.75, 132.35, 144.13, 148.77, 157.58, 175.1, 215.88, 203.26, 212.65, 209.16, 306.51, 408.85, 346.39, 412.55, 366.39, 353.43], '6M': [110.86, 115.68, 104.99, 119.2, 108.43, 110.88, 122.19, 125.58, 127.45, 114.38, 115.75, 132.35, 144.13, 149.11, 148.93, 166.73, 234.81, 211.18, 213.27, 209.16, 306.51, 408.85, 346.39, 412.55, 366.39, 353.43], '1Y': [161.74, 147.79, 147.11, 156.5, 163.47, 137.23, 142.39, 141.06, 137.78, 132.34, 140.8, 153.85, 140.99, 141.49, 159.35, 168.16, 169.38, 173.09, 160.73, 149.74, 140.26, 134.71, 136.48, 141.93, 121.1, 112.02, 109.31, 113.08, 105.11, 116.07, 105.36, 123.7, 122.19, 125.58, 127.45, 114.38, 115.75, 132.35, 144.13, 148.77, 157.58, 175.1, 215.88, 203.26, 212.65, 209.16, 306.51, 408.85, 346.39, 412.55, 366.39, 353.43] },
      velocityScore: { '1D': 0, '1W': -18.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$377B', pe: 411, revenueGrowth: 20, eps: 0.86, grossMargin: 98, dividendYield: null,
      etfPresence: { AIS: 1.84, ARTY: false, BAI: false, IGPT: false, IVES: false, ALAI: 0.17, CHAT: 2.61, AIFD: false, SPRX: 7.51, AOTG: false },
      tonyNote: 'Arm Holdings is held across Broad Tech and AI ETFs as the CPU architecture licensor embedded in every mobile device and increasingly in AI inference chips and data center CPUs. Revenue grew and the royalty model is high-margin; the weight score reflects consistent institutional positioning as the AI chip design ecosystem expands on Arm cores.',
    },
    {
      ticker: 'NBIS', name: 'NEBIUS GROUP NV', easyScore: 4, avgWeight: 3.03, proScore: 1.21, coverage: 0.4,
      price: 266.51, weeklyPrices: [259.66, 256.63, 240.30, 261.15, 266.51], weeklyChange: 2.64, dayChange: 2.05, sortRank: 0, periodReturns: { '1M': 15.3, 'YTD': 218.4, '6M': 212.9, '1Y': 381.7 },
      priceHistory: { '1D': [261.15, 264.32, 266.51], '1W': [259.66, 256.63, 240.3, 261.15, 266.51], '1M': [264.51, 260.58, 251.68, 259.67, 227.81, 218, 220.12, 211.69, 222.24, 232.36, 260.07, 265.1, 280.91, 286.69, 283.61, 275.25, 259.66, 256.63, 240.3, 261.15, 266.51], 'YTD': [83.71, 97.3, 103.89, 94.5, 85.19, 86.1, 98.01, 97.92, 91.19, 89.33, 112.95, 117.62, 100.82, 112.54, 154.56, 159.16, 144.96, 176.42, 186.1, 219.94, 214.77, 264.51, 218, 260.07, 275.25, 266.51], '6M': [85.17, 96.21, 101.98, 96.85, 94.91, 73.87, 89.73, 97.92, 91.19, 89.33, 112.95, 117.62, 100.82, 108.82, 144.97, 157.14, 147.16, 154.49, 177.05, 219.94, 214.77, 264.51, 218, 260.07, 275.25, 266.51], '1Y': [55.33, 47.1, 53.53, 51.01, 50.4, 55.17, 75.33, 72.54, 70.02, 65.72, 95.72, 89.43, 107.8, 112.27, 117.7, 128.15, 104.28, 121.83, 110.54, 102.22, 85.98, 91.9, 96.45, 96.41, 80.95, 90.03, 83.71, 97.3, 103.89, 94.5, 85.19, 86.1, 89.73, 97.92, 91.19, 89.33, 112.95, 117.62, 100.82, 112.54, 154.56, 159.16, 144.96, 176.42, 186.1, 219.94, 214.77, 264.51, 218, 260.07, 275.25, 266.51] },
      velocityScore: { '1D': 3.4, '1W': null, '1M': -40.4, '6M': null }, isNew: false,
      marketCap: '$68B', pe: 102.9, revenueGrowth: 684, eps: 2.59, grossMargin: 72, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 2.67, ALAI: 3.96, CHAT: 3.73, AIFD: 1.76, SPRX: false, AOTG: false },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 4, avgWeight: 2.83, proScore: 1.13, coverage: 0.4,
      price: 312.51, weeklyPrices: [316.43, 325.57, 303.95, 306.97, 312.51], weeklyChange: -1.24, dayChange: 1.79, sortRank: 0, periodReturns: { '1M': -1, 'YTD': 92.9, '6M': 90.2, '1Y': 143.4 },
      priceHistory: { '1D': [307.01, 310.4, 312.51], '1W': [316.43, 325.57, 303.95, 306.97, 312.51], '1M': [323.39, 334.49, 331.44, 323.92, 300.51, 300.57, 289.52, 280.98, 297.88, 302.87, 311.93, 299.6, 317.58, 333.05, 357.96, 318.32, 316.43, 325.57, 303.95, 306.97, 312.51], 'YTD': [162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 234.53, 243.75, 254.89, 241.78, 258.88, 255.88, 251.07, 258.73, 299.96, 314.41, 322.43, 330.97, 367.92, 370.94, 327.46, 323.39, 300.57, 311.93, 318.32, 312.51], '6M': [164.34, 171.54, 170.86, 181.12, 195.1, 177.75, 236.51, 243.75, 254.89, 241.78, 258.88, 255.88, 251.07, 261.29, 295.11, 307.34, 323.46, 328.31, 339.97, 370.94, 327.46, 323.39, 300.57, 311.93, 318.32, 312.51], '1Y': [128.41, 125.89, 127.37, 125.29, 142.7, 138.76, 143.72, 135.69, 125.02, 124.01, 125.58, 136.65, 142.61, 150.86, 158.87, 175.15, 174.8, 190.57, 180.82, 179.05, 166.65, 168.91, 180.91, 178.38, 160.66, 166.26, 162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 236.51, 243.75, 254.89, 241.78, 258.88, 255.88, 251.07, 258.73, 299.96, 314.41, 322.43, 330.97, 367.92, 370.94, 327.46, 323.39, 300.57, 311.93, 318.32, 312.51] },
      velocityScore: { '1D': -1.7, '1W': -6.6, '1M': -39.6, '6M': null }, isNew: false,
      marketCap: '$120B', pe: 78.3, revenueGrowth: 30, eps: 3.99, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 3.41, ARTY: false, BAI: 1.78, IGPT: false, IVES: false, ALAI: false, CHAT: 2.18, AIFD: 3.96, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 4.89, proScore: 4.89, coverage: 1,
      price: 1145.02, weeklyPrices: [1048.51, 1213.56, 1132.33, 1145.28, 1145.02], weeklyChange: 9.2, dayChange: -0.02, sortRank: 0, periodReturns: { '1M': 17.9, 'YTD': 301.2, '6M': 291.3, '1Y': 829 },
      priceHistory: { '1D': [1145.28, 1144.12, 1145.02], '1W': [1048.51, 1213.56, 1132.33, 1145.28, 1145.02], '1M': [1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1145.02], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 724.66, 751, 1035.5, 949.28, 1087.99, 1051.77, 1145.02], '6M': [292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 1035.5, 949.28, 1087.99, 1051.77, 1145.02], '1Y': [123.25, 124.42, 120.11, 109.22, 111.96, 109.06, 127.75, 123.55, 116.42, 118.48, 135.24, 158.82, 166.41, 167.32, 185.69, 187.06, 202.29, 221.91, 218.03, 241.11, 241.95, 223.93, 239.49, 252.42, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 724.66, 751, 1035.5, 949.28, 1087.99, 1051.77, 1145.02] },
      velocityScore: { '1D': -1.8, '1W': -13.5, '1M': -28.5, '6M': null }, isNew: false,
      marketCap: '$1.3T', pe: 25.9, revenueGrowth: 346, eps: 44.21, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { SOXX: 8.84, PSI: 5.83, XSD: 2.85, DRAM: 2.04 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 5.12, proScore: 3.84, coverage: 0.75,
      price: 558.96, weeklyPrices: [519.74, 532.57, 521.58, 539.49, 558.96], weeklyChange: 7.55, dayChange: 3.61, sortRank: 0, periodReturns: { '1M': 8.3, 'YTD': 161, '6M': 159.6, '1Y': 293.9 },
      priceHistory: { '1D': [539.49, 558.33, 558.96], '1W': [519.74, 532.57, 521.58, 539.49, 558.96], '1M': [510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 558.96], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 424.1, 467.51, 510.13, 490.33, 547.26, 519.85, 558.96], '6M': [215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 467.51, 510.13, 490.33, 547.26, 519.85, 558.96], '1Y': [141.9, 137.82, 155.61, 154.72, 177.44, 174.31, 174.95, 176.14, 163.36, 162.32, 155.82, 160.46, 160.9, 161.79, 211.51, 218.09, 238.03, 258.01, 250.05, 237.52, 240.52, 215.05, 215.24, 221.62, 209.17, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 205.94, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 424.1, 467.51, 510.13, 490.33, 547.26, 519.85, 558.96] },
      velocityScore: { '1D': -1, '1W': 3.8, '1M': -36.9, '6M': null }, isNew: false,
      marketCap: '$911B', pe: 185.1, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 7.84, PSI: 4.88, XSD: 2.65, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.61, proScore: 3.46, coverage: 0.75,
      price: 134.75, weeklyPrices: [131.65, 132.87, 128.32, 131.72, 134.75], weeklyChange: 2.35, dayChange: 2.3, sortRank: 0, periodReturns: { '1M': 17.5, 'YTD': 265.2, '6M': 261.2, '1Y': 501.5 },
      priceHistory: { '1D': [131.72, 133.59, 134.75], '1W': [131.65, 132.87, 128.32, 131.72, 134.75], '1M': [109.33, 107.93, 112.71, 111.78, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 134.75], 'YTD': [36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 44.11, 45.61, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 129.44, 108.77, 119.84, 109.33, 110.27, 127.86, 132.28, 134.75], '6M': [37.3, 42.63, 48.72, 54.32, 48.66, 48.24, 46.48, 44.11, 45.61, 43.42, 45.77, 43.87, 43.13, 50.38, 62.38, 68.5, 82.54, 99.62, 124.92, 108.77, 119.84, 109.33, 110.27, 127.86, 132.28, 134.75], '1Y': [22.4, 23.59, 22.92, 23.24, 20.41, 20.19, 21.81, 23.66, 24.55, 24.21, 24.44, 25.27, 29.34, 33.55, 37.17, 35.63, 38.12, 41.53, 37.03, 37.88, 34.71, 35.79, 43.47, 40.5, 37.31, 36.35, 36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.48, 44.11, 45.61, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 129.44, 108.77, 119.84, 109.33, 110.27, 127.86, 132.28, 134.75] },
      velocityScore: { '1D': -1.7, '1W': -0.6, '1M': 0.3, '6M': null }, isNew: false,
      marketCap: '$677B', pe: null, revenueGrowth: 7, eps: -0.61, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 6.23, PSI: 4.86, XSD: 2.73, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 4.4, proScore: 3.3, coverage: 0.75,
      price: 198.2, weeklyPrices: [199.00, 195.74, 192.53, 194.97, 198.20], weeklyChange: -0.4, dayChange: 1.66, sortRank: 0, periodReturns: { '1M': -6.1, 'YTD': 6.3, '6M': 5.7, '1Y': 25.5 },
      priceHistory: { '1D': [194.97, 198.21, 198.2], '1W': [199, 195.74, 192.53, 194.97, 198.2], '1M': [224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 198.2], 'YTD': [186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 225.32, 215.33, 224.36, 208.64, 212.45, 200.04, 198.2], '6M': [187.54, 189.11, 183.14, 184.84, 192.51, 171.88, 186.94, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 225.32, 215.33, 224.36, 208.64, 212.45, 200.04, 198.2], '1Y': [157.99, 160, 170.7, 167.03, 175.51, 178.26, 183.16, 182.01, 179.81, 170.78, 170.76, 174.88, 178.43, 186.58, 185.04, 180.03, 181.16, 201.03, 198.69, 193.16, 186.6, 182.55, 181.46, 184.97, 177.72, 189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 186.94, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 225.32, 215.33, 224.36, 208.64, 212.45, 200.04, 198.2] },
      velocityScore: { '1D': -3.2, '1W': -0.9, '1M': 2.8, '6M': null }, isNew: false,
      marketCap: '$4.8T', pe: 30.4, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.51,
      etfPresence: { SOXX: 6.92, PSI: 4.14, XSD: 2.15, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.34, proScore: 2.5, coverage: 0.75,
      price: 396.86, weeklyPrices: [413.16, 417.93, 386.91, 391.78, 396.86], weeklyChange: -3.95, dayChange: 1.3, sortRank: 0, periodReturns: { '1M': -4.1, 'YTD': 46.3, '6M': 44.4, '1Y': 66.7 },
      priceHistory: { '1D': [391.78, 397.37, 396.86], '1W': [413.16, 417.93, 386.91, 391.78, 396.86], '1M': [402.69, 423.2, 437.67, 428.76, 401.39, 403.89, 404.62, 392.67, 412.13, 417.79, 427.58, 416, 414.45, 434.46, 445.48, 407.26, 413.16, 417.93, 386.91, 391.78, 396.86], 'YTD': [271.2, 299.16, 302.1, 305.6, 310.88, 320.45, 337.1, 355.03, 355.79, 315.81, 306.07, 309.43, 307.44, 327.36, 350.01, 381.05, 392.59, 397.02, 422.73, 417.49, 397.07, 402.69, 403.89, 427.58, 407.26, 396.86], '6M': [274.82, 292.89, 297.99, 308.52, 318.7, 322.12, 331.36, 355.03, 355.79, 315.81, 306.07, 309.43, 307.44, 318.34, 350.14, 371.45, 399.57, 397.69, 416.52, 417.49, 397.07, 402.69, 403.89, 427.58, 407.26, 396.86], '1Y': [238.02, 245.15, 240.42, 235.5, 230.75, 220.68, 232.04, 231.55, 254.49, 248.32, 248.18, 244.1, 246.78, 245.7, 233.75, 235.4, 246.37, 239.35, 229.38, 233.41, 229.94, 239.4, 272.97, 276.24, 278.4, 276.73, 271.2, 299.16, 302.1, 305.6, 310.88, 320.45, 331.36, 355.03, 355.79, 315.81, 306.07, 309.43, 307.44, 327.36, 350.01, 381.05, 392.59, 397.02, 422.73, 417.49, 397.07, 402.69, 403.89, 427.58, 407.26, 396.86] },
      velocityScore: { '1D': -3.1, '1W': -6.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$193B', pe: 58.9, revenueGrowth: 37, eps: 6.74, grossMargin: 64, dividendYield: 1.12,
      etfPresence: { SOXX: 3.55, PSI: 4.25, XSD: 2.21, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 6.37, proScore: 3.19, coverage: 0.5,
      price: 708.64, weeklyPrices: [588.97, 668.00, 626.84, 694.64, 708.64], weeklyChange: 20.32, dayChange: 2.01, sortRank: 0, periodReturns: { '1M': 57.5, 'YTD': 175.7, '6M': 172.6, '1Y': 287.1 },
      priceHistory: { '1D': [694.64, 705.28, 708.64], '1W': [588.97, 668, 626.84, 694.64, 708.64], '1M': [458.17, 490.05, 500.77, 501.7, 453.01, 492.17, 499.21, 497.01, 552.64, 567.25, 585.78, 568.23, 592.92, 617.11, 640.18, 585.88, 588.97, 668, 626.84, 694.64, 708.64], 'YTD': [256.99, 281.64, 319.08, 322.38, 322.32, 322.51, 354.91, 375.38, 372.3, 324.74, 341.53, 357.06, 337.17, 352.62, 395.73, 391.62, 404.86, 391.38, 443.62, 436.62, 432.16, 458.17, 492.17, 585.78, 585.88, 708.64], '6M': [259.97, 292.2, 301.89, 318.79, 341.34, 303.99, 328.39, 375.38, 372.3, 324.74, 341.53, 357.06, 337.17, 348.47, 399.49, 396.94, 417.04, 389.08, 435.44, 436.62, 432.16, 458.17, 492.17, 585.78, 585.88, 708.64], '1Y': [183.07, 194.99, 199.29, 187.14, 188.41, 179.15, 188.45, 163.53, 161.99, 157.57, 163.5, 173.54, 200.87, 204.74, 211.56, 218.19, 226, 227.64, 230.19, 228.67, 228.71, 230.91, 265.33, 267.14, 258.84, 260.23, 256.99, 281.64, 319.08, 322.38, 322.32, 322.51, 328.39, 375.38, 372.3, 324.74, 341.53, 357.06, 337.17, 352.62, 395.73, 391.62, 404.86, 391.38, 443.62, 436.62, 432.16, 458.17, 492.17, 585.78, 585.88, 708.64] },
      velocityScore: { '1D': 5.6, '1W': 13.9, '1M': 8.1, '6M': null }, isNew: false,
      marketCap: '$563B', pe: 66.7, revenueGrowth: 11, eps: 10.63, grossMargin: 49, dividendYield: 0.31,
      etfPresence: { SOXX: 5.78, PSI: 6.96, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 5.87, proScore: 2.93, coverage: 0.5,
      price: 287.36, weeklyPrices: [240.48, 258.80, 248.64, 278.39, 287.36], weeklyChange: 19.49, dayChange: 3.22, sortRank: 0, periodReturns: { '1M': 49.5, 'YTD': 136.5, '6M': 131.1, '1Y': 220.8 },
      priceHistory: { '1D': [278.39, 285.68, 287.36], '1W': [240.48, 258.8, 248.64, 278.39, 287.36], '1M': [194, 204.52, 212.51, 213.11, 192.92, 210.81, 213.94, 213.56, 241.16, 254.54, 256.42, 237.33, 238.73, 259.56, 269.16, 244.49, 240.48, 258.8, 248.64, 278.39, 287.36], 'YTD': [121.51, 132.46, 154.5, 151.28, 142.79, 144.29, 146.41, 149.6, 152.46, 134.46, 141.86, 149.87, 144.32, 154.01, 176.88, 180.53, 190, 171.33, 184.52, 180.43, 188.84, 194, 210.81, 256.42, 244.49, 287.36], '6M': [124.36, 135.97, 143.45, 150, 168.47, 133.1, 145.09, 149.6, 152.46, 134.46, 141.86, 149.87, 144.32, 151.68, 173.73, 179.14, 193.5, 172.63, 186.92, 180.43, 188.84, 194, 210.81, 256.42, 244.49, 287.36], '1Y': [89.57, 91.92, 93.65, 89.22, 91.61, 88.34, 93.55, 88.34, 87.96, 84.64, 91.77, 99.06, 107.12, 107.86, 108.47, 102.57, 114.74, 120.6, 119.35, 119.09, 113.37, 113.67, 118.99, 122.56, 122.34, 126.88, 121.51, 132.46, 154.5, 151.28, 142.79, 144.29, 145.09, 149.6, 152.46, 134.46, 141.86, 149.87, 144.32, 154.01, 176.88, 180.53, 190, 171.33, 184.52, 180.43, 188.84, 194, 210.81, 256.42, 244.49, 287.36] },
      velocityScore: { '1D': 6.5, '1W': 8.5, '1M': 14, '6M': null }, isNew: false,
      marketCap: '$375B', pe: 81.2, revenueGrowth: 12, eps: 3.54, grossMargin: 61, dividendYield: 0.33,
      etfPresence: { SOXX: 5.43, PSI: 6.31, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 5.32, proScore: 2.66, coverage: 0.5,
      price: 424.56, weeklyPrices: [374.80, 401.82, 379.09, 410.91, 424.56], weeklyChange: 13.28, dayChange: 3.32, sortRank: 0, periodReturns: { '1M': 33.4, 'YTD': 148, '6M': 144.3, '1Y': 336.2 },
      priceHistory: { '1D': [410.91, 421.32, 424.56], '1W': [374.8, 401.82, 379.09, 410.91, 424.56], '1M': [317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04, 409.54, 371.33, 374.8, 401.82, 379.09, 410.91, 424.56], 'YTD': [171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 244.92, 233.89, 199.33, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 258.57, 296.05, 284.72, 305.35, 317.12, 324.45, 388.92, 371.33, 424.56], '6M': [173.78, 203.08, 208.79, 220.7, 248.17, 213.31, 231.29, 244.92, 233.89, 199.33, 212.2, 228.36, 211.41, 218.44, 263.66, 267.6, 267.78, 256.72, 294.05, 284.72, 305.35, 317.12, 324.45, 388.92, 371.33, 424.56], '1Y': [97.34, 99.83, 101.07, 97.69, 98.94, 96.68, 105.28, 98.88, 101.28, 97.03, 105.57, 120.47, 131.93, 133.9, 140.35, 138.31, 145.04, 155.62, 155.78, 159.18, 147.46, 150.38, 158.19, 165.81, 163.26, 175.16, 171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 231.29, 244.92, 233.89, 199.33, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 258.57, 296.05, 284.72, 305.35, 317.12, 324.45, 388.92, 371.33, 424.56] },
      velocityScore: { '1D': 3.1, '1W': 5.6, '1M': -1.1, '6M': null }, isNew: false,
      marketCap: '$531B', pe: 80.1, revenueGrowth: 24, eps: 5.3, grossMargin: 50, dividendYield: 0.25,
      etfPresence: { SOXX: 4.84, PSI: 5.81, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 4.23, proScore: 2.12, coverage: 0.5,
      price: 375.82, weeklyPrices: [382.07, 378.91, 365.02, 372.45, 375.82], weeklyChange: -1.64, dayChange: 0.9, sortRank: 0, periodReturns: { '1M': -15.9, 'YTD': 8.6, '6M': 7.4, '1Y': 36.3 },
      priceHistory: { '1D': [372.45, 375.3, 375.82], '1W': [382.07, 378.91, 365.02, 372.45, 375.82], '1M': [459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 375.82], 'YTD': [346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 425.19, 414.14, 459.97, 396.6, 393.94, 380.15, 375.82], '6M': [349.85, 343.5, 339.89, 325.49, 330.73, 310.51, 331.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 425.19, 414.14, 459.97, 396.6, 393.94, 380.15, 375.82], '1Y': [275.65, 271.8, 280.94, 278.59, 297.42, 292.93, 312.83, 305.76, 294.23, 298.24, 336.67, 360, 338.94, 329.91, 336.41, 344.13, 342.66, 372.97, 351.94, 351.96, 342.65, 377.96, 381.57, 406.29, 341.3, 349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 331.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 425.19, 414.14, 459.97, 396.6, 393.94, 380.15, 375.82] },
      velocityScore: { '1D': -1.4, '1W': 2.4, '1M': -44.8, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 62.6, revenueGrowth: 48, eps: 6, grossMargin: 76, dividendYield: 0.7,
      etfPresence: { SOXX: 6.25, PSI: false, XSD: 2.21, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 3.76, proScore: 1.88, coverage: 0.5,
      price: 284.52, weeklyPrices: [276.70, 281.26, 266.77, 277.75, 284.52], weeklyChange: 2.83, dayChange: 2.44, sortRank: 0, periodReturns: { '1M': 38.8, 'YTD': 234.8, '6M': 227.9, '1Y': 267.6 },
      priceHistory: { '1D': [277.75, 283.73, 284.52], '1W': [276.7, 281.26, 266.77, 277.75, 284.52], '1M': [219.43, 290.79, 301.65, 316.43, 263.47, 288.85, 266.88, 252.59, 280.71, 279.7, 308.88, 278.67, 289.54, 310.58, 307.86, 279.04, 276.7, 281.26, 266.77, 277.75, 284.52], 'YTD': [84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 79.48, 81.69, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 163.66, 170.84, 176.89, 196.33, 219.43, 288.85, 308.88, 279.04, 284.52], '6M': [86.76, 84.64, 81.21, 83.1, 81.34, 74.21, 78.23, 79.48, 81.69, 89.57, 87.86, 87.91, 94.88, 107.11, 128.49, 139.69, 164.31, 164.95, 170.13, 176.89, 196.33, 219.43, 288.85, 308.88, 279.04, 284.52], '1Y': [77.4, 71.95, 72.41, 71.99, 76.34, 76.63, 77.81, 76.74, 72.95, 64.6, 66.84, 68.86, 74.62, 84.07, 86.97, 86.22, 84.26, 88.46, 87.59, 89.33, 83.45, 83.79, 92.89, 88.9, 84.07, 87.68, 84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.23, 79.48, 81.69, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 163.66, 170.84, 176.89, 196.33, 219.43, 288.85, 308.88, 279.04, 284.52] },
      velocityScore: { '1D': 0.5, '1W': -3.1, '1M': -44.4, '6M': null }, isNew: false,
      marketCap: '$249B', pe: 97.4, revenueGrowth: 28, eps: 2.92, grossMargin: 52, dividendYield: 0.09,
      etfPresence: { SOXX: 5.08, PSI: false, XSD: 2.44, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 3.02, proScore: 1.51, coverage: 0.5,
      price: 470.63, weeklyPrices: [399.92, 398.00, 391.74, 455.96, 470.63], weeklyChange: 17.68, dayChange: 3.22, sortRank: 0, periodReturns: { '1M': 37.3, 'YTD': 182.9, '6M': 175.5, '1Y': 420.5 },
      priceHistory: { '1D': [455.96, 466.45, 470.63], '1W': [399.92, 398, 391.74, 455.96, 470.63], '1M': [320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 470.63], 'YTD': [166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 129.68, 118.83, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 232.68, 306.88, 320.09, 346.33, 389.2, 397.02, 470.63], '6M': [170.84, 165.77, 172.14, 176.35, 160.46, 142.82, 126.58, 129.68, 118.83, 119.2, 120.31, 116.04, 112.47, 117.14, 149.05, 174.05, 212.84, 202.68, 199.79, 232.68, 306.88, 320.09, 346.33, 389.2, 397.02, 470.63], '1Y': [90.42, 92.3, 92.36, 116.91, 118.41, 135.54, 192, 186.43, 174.15, 174.24, 214.49, 238.79, 230.11, 195.8, 212.1, 161.55, 157.51, 168.25, 179.31, 167.55, 141.39, 147.75, 142.94, 167.08, 144.94, 168.83, 166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 126.58, 129.68, 118.83, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 232.68, 306.88, 320.09, 346.33, 389.2, 397.02, 470.63] },
      velocityScore: { '1D': 11.9, '1W': 11.9, '1M': -34.1, '6M': null }, isNew: false,
      marketCap: '$81B', pe: 322.4, revenueGrowth: 93, eps: 1.46, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.98, PSI: false, XSD: 3.06, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 2.87, proScore: 1.43, coverage: 0.5,
      price: 292.28, weeklyPrices: [303.11, 311.81, 285.43, 285.48, 292.28], weeklyChange: -3.57, dayChange: 2.38, sortRank: 0, periodReturns: { '1M': -4.4, 'YTD': 68.5, '6M': 66.6, '1Y': 40.8 },
      priceHistory: { '1D': [285.48, 292.18, 292.28], '1W': [303.11, 311.81, 285.43, 285.48, 292.28], '1M': [293.2, 308.12, 308.59, 305.37, 285.06, 290.9, 288.63, 282.01, 297.1, 301.12, 313.34, 305.71, 301.88, 322.86, 332.28, 304.36, 303.11, 311.81, 285.43, 285.48, 292.28], 'YTD': [173.49, 188.45, 189.12, 193.31, 215.55, 221.44, 226.16, 219.73, 212.11, 193.23, 190.78, 187.19, 190.33, 199.42, 216.71, 233.7, 269.5, 280.89, 297.76, 302.73, 309.21, 293.2, 290.9, 313.34, 304.36, 292.28], '6M': [175.42, 185.71, 193.45, 194.99, 218.97, 223.98, 223, 219.73, 212.11, 193.23, 190.78, 187.19, 190.33, 194.87, 214.73, 229.82, 277.14, 281.02, 287.8, 302.73, 309.21, 293.2, 290.9, 313.34, 304.36, 292.28], '1Y': [207.62, 216.63, 218.36, 214.92, 191.38, 185.4, 192.97, 194.33, 205.97, 199.81, 185.03, 177.63, 182.04, 183.73, 177.05, 173.94, 180.84, 166.91, 159.36, 159.73, 154.99, 161.26, 175.26, 179.52, 177.56, 177.08, 173.49, 188.45, 189.12, 193.31, 215.55, 221.44, 223, 219.73, 212.11, 193.23, 190.78, 187.19, 190.33, 199.42, 216.71, 233.7, 269.5, 280.89, 297.76, 302.73, 309.21, 293.2, 290.9, 313.34, 304.36, 292.28] },
      velocityScore: { '1D': -4, '1W': -7.7, '1M': -52.8, '6M': null }, isNew: false,
      marketCap: '$266B', pe: 50, revenueGrowth: 19, eps: 5.85, grossMargin: 57, dividendYield: 1.99,
      etfPresence: { SOXX: 3.5, PSI: false, XSD: 2.24, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.7, proScore: 1.35, coverage: 0.5,
      price: 277.4, weeklyPrices: [294.06, 298.64, 277.02, 278.37, 277.40], weeklyChange: -5.67, dayChange: -0.35, sortRank: 0, periodReturns: { '1M': -13.7, 'YTD': 27.8, '6M': 26.1, '1Y': 27 },
      priceHistory: { '1D': [278.37, 278.52, 277.4], '1W': [294.06, 298.64, 277.02, 278.37, 277.4], '1M': [311.38, 323.62, 321.88, 322.22, 295.96, 301.14, 297.41, 285.56, 302.55, 304.86, 315.88, 302.89, 298.2, 313.27, 323.24, 299.94, 294.06, 298.64, 277.02, 278.37, 277.4], 'YTD': [217.06, 237.89, 238.6, 232.48, 226.14, 224.32, 244.43, 232.27, 227.01, 201.74, 190.86, 191.37, 191.66, 197.08, 208, 221.34, 236.87, 290.76, 305.99, 291.5, 316.47, 311.38, 301.14, 315.88, 299.94, 277.4], '6M': [219.98, 239.34, 240.81, 236.75, 233.5, 222.13, 242.19, 232.27, 227.01, 201.74, 190.86, 191.37, 191.66, 194.55, 204.37, 216.03, 244.04, 295.24, 294.75, 291.5, 316.47, 311.38, 301.14, 315.88, 299.94, 277.4], '1Y': [218.49, 232.34, 221.06, 228, 226.74, 208.47, 220.05, 232.01, 236.67, 232.66, 223.69, 220.99, 225.62, 227.73, 219.58, 216.11, 222.34, 212.96, 204.42, 202.86, 190.51, 191.56, 215.35, 228.05, 229.75, 225.98, 217.06, 237.89, 238.6, 232.48, 226.14, 224.32, 242.19, 232.27, 227.01, 201.74, 190.86, 191.37, 191.66, 197.08, 208, 221.34, 236.87, 290.76, 305.99, 291.5, 316.47, 311.38, 301.14, 315.88, 299.94, 277.4] },
      velocityScore: { '1D': -3.6, '1W': -6.9, '1M': -35.1, '6M': null }, isNew: false,
      marketCap: '$70B', pe: 26.5, revenueGrowth: 12, eps: 10.47, grossMargin: 56, dividendYield: 1.46,
      etfPresence: { SOXX: 3.25, PSI: false, XSD: 2.16, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 2.51, proScore: 1.25, coverage: 0.5,
      price: 190.5, weeklyPrices: [197.41, 204.90, 189.39, 188.72, 190.50], weeklyChange: -3.5, dayChange: 0.94, sortRank: 0, periodReturns: { '1M': -24.1, 'YTD': 11.4, '6M': 9.7, '1Y': 19.6 },
      priceHistory: { '1D': [188.72, 190.1, 190.5], '1W': [197.41, 204.9, 189.39, 188.72, 190.5], '1M': [228.99, 240.84, 250.01, 242.57, 215.94, 217.77, 205.42, 191.2, 202.96, 211.72, 220.81, 214.07, 212.97, 226.11, 221.9, 204.13, 197.41, 204.9, 189.39, 188.72, 190.5], 'YTD': [171.05, 181.87, 161.39, 155.82, 151.59, 137.34, 140.7, 142.88, 142.36, 135.69, 129.82, 129.9, 127.11, 125.73, 131.24, 137.52, 150.26, 168.38, 237.53, 201.49, 238.16, 228.99, 217.77, 220.81, 204.13, 190.5], '6M': [173.65, 180.19, 164.54, 157.8, 152.22, 136.3, 138.47, 142.88, 142.36, 135.69, 129.82, 129.9, 127.11, 126.8, 128.06, 136.2, 148.85, 177.01, 219.09, 201.49, 238.16, 228.99, 217.77, 220.81, 204.13, 190.5], '1Y': [159.26, 159.45, 154.3, 157.99, 162.08, 146.71, 153.73, 158.9, 156.42, 158.78, 158.66, 164.14, 169.53, 166.36, 165.46, 161.74, 168.83, 181.03, 172.84, 173.98, 166.75, 165.06, 170.7, 176, 176.12, 174.75, 171.05, 181.87, 161.39, 155.82, 151.59, 137.34, 138.47, 142.88, 142.36, 135.69, 129.82, 129.9, 127.11, 125.73, 131.24, 137.52, 150.26, 168.38, 237.53, 201.49, 238.16, 228.99, 217.77, 220.81, 204.13, 190.5] },
      velocityScore: { '1D': -3.8, '1W': -8.8, '1M': -50.4, '6M': null }, isNew: false,
      marketCap: '$201B', pe: 20.5, revenueGrowth: -4, eps: 9.3, grossMargin: 55, dividendYield: 1.95,
      etfPresence: { SOXX: 2.82, PSI: false, XSD: 2.19, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.43, proScore: 1.22, coverage: 0.5,
      price: 1347.08, weeklyPrices: [1434.95, 1438.30, 1313.32, 1312.77, 1347.08], weeklyChange: -6.12, dayChange: 2.61, sortRank: 0, periodReturns: { '1M': -14, 'YTD': 48.6, '6M': 45.8, '1Y': 84.2 },
      priceHistory: { '1D': [1312.77, 1342.7, 1347.08], '1W': [1434.95, 1438.3, 1313.32, 1312.77, 1347.08], '1M': [1542.39, 1624.99, 1689.89, 1652.6, 1481.05, 1559.18, 1531.98, 1473.04, 1589.55, 1577.32, 1652.29, 1498.77, 1448.21, 1563.7, 1537.88, 1423.76, 1434.95, 1438.3, 1313.32, 1312.77, 1347.08], 'YTD': [906.36, 959.09, 1009.54, 1063.74, 1124.15, 1229.82, 1171.47, 1204.1, 1142.74, 1023.16, 1052.59, 1068.85, 1053.01, 1180.03, 1372.23, 1490.86, 1587.57, 1573.3, 1661.1, 1550.02, 1589.81, 1542.39, 1559.18, 1652.29, 1423.76, 1347.08], '6M': [923.91, 959.08, 983.6, 1076.67, 1183.15, 1155.99, 1155.93, 1204.1, 1142.74, 1023.16, 1052.59, 1068.85, 1053.01, 1118.49, 1353.85, 1468.35, 1632.06, 1583.48, 1600.84, 1550.02, 1589.81, 1542.39, 1559.18, 1652.29, 1423.76, 1347.08], '1Y': [731.38, 761.31, 717.62, 719.98, 724.37, 802.78, 840.56, 850.31, 837.86, 823.65, 857.87, 857.02, 914.27, 920.64, 945.49, 968.25, 1028.67, 1086.36, 957.87, 954.71, 897.01, 892.97, 952.18, 962.95, 951.36, 943.55, 906.36, 959.09, 1009.54, 1063.74, 1124.15, 1229.82, 1155.93, 1204.1, 1142.74, 1023.16, 1052.59, 1068.85, 1053.01, 1180.03, 1372.23, 1490.86, 1587.57, 1573.3, 1661.1, 1550.02, 1589.81, 1542.39, 1559.18, 1652.29, 1423.76, 1347.08] },
      velocityScore: { '1D': -3.9, '1W': -7.6, '1M': -37.8, '6M': null }, isNew: false,
      marketCap: '$66B', pe: 96.8, revenueGrowth: 26, eps: 13.92, grossMargin: 55, dividendYield: 0.61,
      etfPresence: { SOXX: 2.9, PSI: false, XSD: 1.97, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.23, proScore: 1.11, coverage: 0.5,
      price: 88.77, weeklyPrices: [92.48, 94.12, 87.93, 89.06, 88.77], weeklyChange: -4.02, dayChange: -0.33, sortRank: 0, periodReturns: { '1M': -6.2, 'YTD': 39.3, '6M': 37.2, '1Y': 26.1 },
      priceHistory: { '1D': [89.06, 88.9, 88.77], '1W': [92.48, 94.12, 87.93, 89.06, 88.77], '1M': [91.52, 96.96, 96.55, 96.3, 88.34, 91.37, 91.47, 87.91, 92.94, 95.24, 100.32, 95.63, 94.11, 99.77, 102.71, 93.26, 92.48, 94.12, 87.93, 89.06, 88.77], 'YTD': [63.72, 73.53, 74.45, 74.71, 75.92, 76.01, 78.56, 77.73, 74.64, 64.77, 61.94, 62.97, 62, 67.22, 73.55, 80.39, 86.84, 95.3, 99.03, 93.85, 93.43, 91.52, 91.37, 100.32, 93.26, 88.77], '6M': [64.68, 73.94, 74.68, 75.47, 79.36, 78.04, 78.92, 77.73, 74.64, 64.77, 61.94, 62.97, 62, 65.6, 71.56, 78.76, 89.44, 93.95, 99.09, 93.85, 93.43, 91.52, 91.37, 100.32, 93.26, 88.77], '1Y': [70.37, 74.56, 73.11, 75.26, 70.68, 67.13, 64.5, 65.56, 68.55, 63.6, 64.76, 64.45, 64.71, 64.22, 64.96, 64.6, 67.52, 63.64, 59.5, 54.71, 51.7, 51.25, 56.71, 66.85, 65.9, 65.35, 63.72, 73.53, 74.45, 74.71, 75.92, 76.01, 78.92, 77.73, 74.64, 64.77, 61.94, 62.97, 62, 67.22, 73.55, 80.39, 86.84, 95.3, 99.03, 93.85, 93.43, 91.52, 91.37, 100.32, 93.26, 88.77] },
      velocityScore: { '1D': -2.6, '1W': -6.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$48B', pe: 403.5, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 2.04,
      etfPresence: { SOXX: 2.21, PSI: false, XSD: 2.25, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.1, proScore: 1.05, coverage: 0.5,
      price: 256.75, weeklyPrices: [268.99, 268.03, 238.00, 245.68, 256.75], weeklyChange: -4.55, dayChange: 4.51, sortRank: 0, periodReturns: { '1M': 8.8, 'YTD': 78.4, '6M': 77.2, '1Y': 177.3 },
      priceHistory: { '1D': [245.68, 256.42, 256.75], '1W': [268.99, 268.03, 238, 245.68, 256.75], '1M': [226.1, 229, 214.6, 217.5, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 245.68, 256.75], 'YTD': [143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.06, 112.27, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 210.22, 172.17, 218.41, 226.1, 222.27, 259.41, 272.01, 256.75], '6M': [144.92, 141, 156.84, 135.1, 129.47, 98.06, 121.78, 124.06, 112.27, 109.83, 117.69, 103.4, 95.24, 101.45, 119.59, 160.69, 195.04, 184.38, 188.51, 172.17, 218.41, 226.1, 222.27, 259.41, 272.01, 256.75], '1Y': [92.59, 93.36, 102.59, 92.93, 109.38, 110.29, 125.38, 118.74, 115.41, 124.27, 149.03, 164.42, 162.26, 145.61, 137.2, 129.75, 144.17, 162.18, 164.23, 158.5, 145.58, 150.85, 188.44, 170.29, 140.34, 147.81, 143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.78, 124.06, 112.27, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 210.22, 172.17, 218.41, 226.1, 222.27, 259.41, 272.01, 256.75] },
      velocityScore: { '1D': 0, '1W': -11.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$48B', pe: 102.3, revenueGrowth: 157, eps: 2.51, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 1.9, PSI: false, XSD: 2.3, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 2, avgWeight: 1.76, proScore: 0.88, coverage: 0.5,
      price: 377.5, weeklyPrices: [373.08, 390.19, 369.18, 372.59, 377.50], weeklyChange: 1.19, dayChange: 1.32, sortRank: 0, periodReturns: { '1M': 3.5, 'YTD': 120.4, '6M': 115.9, '1Y': 163.5 },
      priceHistory: { '1D': [372.59, 376.17, 377.5], '1W': [373.08, 390.19, 369.18, 372.59, 377.5], '1M': [353.79, 382.35, 390.34, 382.74, 345.4, 361.86, 358.72, 354.4, 374.76, 379.87, 384.77, 368.32, 367.11, 391.41, 396.26, 372.15, 373.08, 390.19, 369.18, 372.59, 377.5], 'YTD': [171.28, 167.66, 218.93, 219.26, 219.06, 235.87, 244.16, 243.59, 248.12, 207.51, 217.8, 218.96, 225.44, 233.04, 263.63, 281.08, 279.44, 291.72, 365.88, 375.6, 385.98, 353.79, 361.86, 384.77, 372.15, 377.5], '6M': [174.87, 170.62, 215.01, 224.29, 227.73, 227.8, 238.99, 243.59, 248.12, 207.51, 217.8, 218.96, 225.44, 238.3, 258.11, 276.97, 287.64, 284.18, 359.88, 375.6, 385.98, 353.79, 361.86, 384.77, 372.15, 377.5], '1Y': [143.29, 137.37, 137.3, 136.76, 140.02, 137.28, 125.45, 124.55, 126.69, 131.05, 129.79, 131.18, 128.8, 124.49, 127.97, 131.54, 139.41, 147.88, 144.13, 169.98, 159.83, 165.97, 177.91, 188.08, 175.69, 176.28, 171.28, 167.66, 218.93, 219.26, 219.06, 235.87, 238.99, 243.59, 248.12, 207.51, 217.8, 218.96, 225.44, 233.04, 263.63, 281.08, 279.44, 291.72, 365.88, 375.6, 385.98, 353.79, 361.86, 384.77, 372.15, 377.5] },
      velocityScore: { '1D': -3.3, '1W': 2.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$29B', pe: 160.6, revenueGrowth: 23, eps: 2.35, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: 1.2, PSI: false, XSD: 2.33, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 1.69, proScore: 0.85, coverage: 0.5,
      price: 91.44, weeklyPrices: [115.74, 118.74, 90.65, 88.57, 91.44], weeklyChange: -21, dayChange: 3.24, sortRank: 0, periodReturns: { '1M': -24.2, 'YTD': 68.9, '6M': 68.6, '1Y': 74.5 },
      priceHistory: { '1D': [88.57, 91.1, 91.44], '1W': [115.74, 118.74, 90.65, 88.57, 91.44], '1M': [120.92, 128.64, 133.93, 131.82, 117.26, 120.9, 117, 110.17, 115.96, 116.79, 125.9, 118.25, 112.92, 121.62, 131.55, 117.06, 115.74, 118.74, 90.65, 88.57, 91.44], 'YTD': [54.15, 60.89, 60.28, 61.98, 59.89, 65.2, 72.21, 69.11, 66.48, 56.87, 58.55, 59.26, 58.35, 63.49, 71.02, 85.56, 98.04, 102.04, 107.24, 113.11, 116.2, 120.92, 120.9, 125.9, 117.06, 91.44], '6M': [54.24, 61.89, 60.58, 63.07, 62.2, 63.1, 70.63, 69.11, 66.48, 56.87, 58.55, 59.26, 58.35, 62.19, 68.65, 83.01, 98.4, 103.03, 103.2, 113.11, 116.2, 120.92, 120.9, 125.9, 117.06, 91.44], '1Y': [52.41, 57.62, 58.93, 62.45, 58.38, 47.24, 50.01, 50.53, 50.95, 48.94, 48.62, 49.56, 50.42, 49.31, 48.17, 49.54, 55.08, 51.8, 48.28, 48.43, 46.02, 47.39, 51.48, 55.23, 54.56, 55.69, 54.15, 60.89, 60.28, 61.98, 59.89, 65.2, 70.63, 69.11, 66.48, 56.87, 58.55, 59.26, 58.35, 63.49, 71.02, 85.56, 98.04, 102.04, 107.24, 113.11, 116.2, 120.92, 120.9, 125.9, 117.06, 91.44] },
      velocityScore: { '1D': -5.6, '1W': -26.7, '1M': -55.7, '6M': null }, isNew: false,
      marketCap: '$36B', pe: 67.2, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 1.61, PSI: false, XSD: 1.78, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'RMBS', name: 'RAMBUS INC', easyScore: 2, avgWeight: 1.3, proScore: 0.65, coverage: 0.5,
      price: 124.24, weeklyPrices: [124.52, 123.69, 114.73, 123.90, 124.24], weeklyChange: -0.22, dayChange: 0.27, sortRank: 0, periodReturns: { '1M': -14.6, 'YTD': 35.2, '6M': 31.2, '1Y': 94.1 },
      priceHistory: { '1D': [123.9, 124.25, 124.24], '1W': [124.52, 123.69, 114.73, 123.9, 124.24], '1M': [147.48, 166.78, 170.66, 169.35, 145.31, 152.03, 146.84, 138.12, 144.47, 146.56, 143.29, 132.48, 130.1, 141.17, 140.35, 128.21, 124.52, 123.69, 114.73, 123.9, 124.24], 'YTD': [91.89, 91.34, 103.07, 115.31, 113.83, 107.1, 101.95, 102.64, 99.66, 88.12, 94.01, 91.7, 89.73, 92.22, 113.16, 126.87, 141.31, 111.5, 134.51, 127.05, 142.98, 147.48, 152.03, 143.29, 128.21, 124.24], '6M': [94.69, 91.65, 100.62, 124.77, 121.6, 98.1, 95.8, 102.64, 99.66, 88.12, 94.01, 91.7, 89.73, 93.03, 110.44, 126.93, 158.4, 111.93, 129.25, 127.05, 142.98, 147.48, 152.03, 143.29, 128.21, 124.24], '1Y': [64.02, 65.18, 64.53, 66.61, 73.15, 73.79, 76.44, 75.77, 73.3, 73.49, 74.55, 97.05, 102.62, 104.2, 96.84, 94.85, 97.51, 103.72, 100.32, 104.93, 91.13, 92.75, 96.21, 104.71, 94.69, 94.19, 91.89, 91.34, 103.07, 115.31, 113.83, 107.1, 95.8, 102.64, 99.66, 88.12, 94.01, 91.7, 89.73, 92.22, 113.16, 126.87, 141.31, 111.5, 134.51, 127.05, 142.98, 147.48, 152.03, 143.29, 128.21, 124.24] },
      velocityScore: { '1D': null, '1W': -4.4, '1M': null, '6M': null }, isNew: true,
      marketCap: '$13B', pe: 59.2, revenueGrowth: 8, eps: 2.1, grossMargin: 80, dividendYield: null,
      etfPresence: { SOXX: 0.62, PSI: false, XSD: 1.98, DRAM: false },
      tonyNote: 'RAMBUS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 5.87, proScore: 3.11, coverage: 0.529,
      price: 1145.02, weeklyPrices: [1048.51, 1213.56, 1132.33, 1145.28, 1145.02], weeklyChange: 9.2, dayChange: -0.02, sortRank: 0, periodReturns: { '1M': 17.9, 'YTD': 301.2, '6M': 291.3, '1Y': 829 },
      priceHistory: { '1D': [1145.28, 1144.12, 1145.02], '1W': [1048.51, 1213.56, 1132.33, 1145.28, 1145.02], '1M': [1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1145.02], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 724.66, 751, 1035.5, 949.28, 1087.99, 1051.77, 1145.02], '6M': [292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 1035.5, 949.28, 1087.99, 1051.77, 1145.02], '1Y': [123.25, 124.42, 120.11, 109.22, 111.96, 109.06, 127.75, 123.55, 116.42, 118.48, 135.24, 158.82, 166.41, 167.32, 185.69, 187.06, 202.29, 221.91, 218.03, 241.11, 241.95, 223.93, 239.49, 252.42, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 724.66, 751, 1035.5, 949.28, 1087.99, 1051.77, 1145.02] },
      velocityScore: { '1D': 0, '1W': -0.6, '1M': 16.5, '6M': null }, isNew: false,
      marketCap: '$1.3T', pe: 25.9, revenueGrowth: 346, eps: 44.21, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { PTF: 4.31, WCLD: false, IGV: false, FDTX: 9.36, GTEK: false, ARKK: false, MARS: false, FRWD: 5.36, BCTK: 5.01, FWD: 1.35, CBSE: false, FCUS: 5.04, WGMI: false, CNEQ: 1.59, SGRT: 8.65, SPMO: 12.19, XMMO: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 9, avgWeight: 5.85, proScore: 3.1, coverage: 0.529,
      price: 198.2, weeklyPrices: [199.00, 195.74, 192.53, 194.97, 198.20], weeklyChange: -0.4, dayChange: 1.66, sortRank: 0, periodReturns: { '1M': -6.1, 'YTD': 6.3, '6M': 5.7, '1Y': 25.5 },
      priceHistory: { '1D': [194.97, 198.21, 198.2], '1W': [199, 195.74, 192.53, 194.97, 198.2], '1M': [224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 198.2], 'YTD': [186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 225.32, 215.33, 224.36, 208.64, 212.45, 200.04, 198.2], '6M': [187.54, 189.11, 183.14, 184.84, 192.51, 171.88, 186.94, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 225.32, 215.33, 224.36, 208.64, 212.45, 200.04, 198.2], '1Y': [157.99, 160, 170.7, 167.03, 175.51, 178.26, 183.16, 182.01, 179.81, 170.78, 170.76, 174.88, 178.43, 186.58, 185.04, 180.03, 181.16, 201.03, 198.69, 193.16, 186.6, 182.55, 181.46, 184.97, 177.72, 189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 186.94, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 225.32, 215.33, 224.36, 208.64, 212.45, 200.04, 198.2] },
      velocityScore: { '1D': -0.6, '1W': -6.3, '1M': -30.2, '6M': null }, isNew: false,
      marketCap: '$4.8T', pe: 30.4, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.51,
      etfPresence: { PTF: 4.24, WCLD: false, IGV: false, FDTX: 4.62, GTEK: false, ARKK: 1.57, MARS: false, FRWD: 8.17, BCTK: 5.79, FWD: false, CBSE: false, FCUS: false, WGMI: 1.84, CNEQ: 12.93, SGRT: 5.98, SPMO: 7.51, XMMO: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 8, avgWeight: 3.68, proScore: 1.73, coverage: 0.471,
      price: 558.96, weeklyPrices: [519.74, 532.57, 521.58, 539.49, 558.96], weeklyChange: 7.55, dayChange: 3.61, sortRank: 0, periodReturns: { '1M': 8.3, 'YTD': 161, '6M': 159.6, '1Y': 293.9 },
      priceHistory: { '1D': [539.49, 558.33, 558.96], '1W': [519.74, 532.57, 521.58, 539.49, 558.96], '1M': [510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 558.96], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 424.1, 467.51, 510.13, 490.33, 547.26, 519.85, 558.96], '6M': [215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 467.51, 510.13, 490.33, 547.26, 519.85, 558.96], '1Y': [141.9, 137.82, 155.61, 154.72, 177.44, 174.31, 174.95, 176.14, 163.36, 162.32, 155.82, 160.46, 160.9, 161.79, 211.51, 218.09, 238.03, 258.01, 250.05, 237.52, 240.52, 215.05, 215.24, 221.62, 209.17, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 205.94, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 424.1, 467.51, 510.13, 490.33, 547.26, 519.85, 558.96] },
      velocityScore: { '1D': 0, '1W': 3.6, '1M': -11.3, '6M': null }, isNew: false,
      marketCap: '$911B', pe: 185.1, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.64, MARS: false, FRWD: 7.37, BCTK: 3.35, FWD: 2.17, CBSE: false, FCUS: 3.38, WGMI: false, CNEQ: 0.85, SGRT: 3.6, SPMO: 4.08, XMMO: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 7, avgWeight: 4.98, proScore: 2.05, coverage: 0.412,
      price: 646.47, weeklyPrices: [643.83, 675.39, 586.45, 651.88, 646.47], weeklyChange: 0.41, dayChange: -0.83, sortRank: 0, periodReturns: { '1M': 21.7, 'YTD': 275.3, '6M': 267.2, '1Y': 910.3 },
      priceHistory: { '1D': [651.88, 646.15, 646.47], '1W': [643.83, 675.39, 586.45, 651.88, 646.47], '1M': [546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 646.47], 'YTD': [172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 482.02, 484.28, 546.2, 526.93, 653.53, 670.75, 646.47], '6M': [176.06, 199.88, 215, 243.29, 278.41, 260.19, 284.1, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 294.97, 343.43, 372.52, 404, 431.52, 480, 482.02, 484.28, 546.2, 526.93, 653.53, 670.75, 646.47], '1Y': [63.99, 64.02, 67.53, 67.06, 70.61, 75.84, 75.91, 76.29, 79.22, 81.91, 94.54, 103.09, 110.25, 120.06, 119.93, 113.13, 121.41, 124.92, 152.18, 169.99, 162.45, 150.93, 159.99, 169.54, 174.58, 178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 284.1, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 482.02, 484.28, 546.2, 526.93, 653.53, 670.75, 646.47] },
      velocityScore: { '1D': -0.5, '1W': -12.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$223B', pe: 38.7, revenueGrowth: 46, eps: 16.69, grossMargin: 45, dividendYield: 0.09,
      etfPresence: { PTF: 4.34, WCLD: false, IGV: false, FDTX: 4, GTEK: false, ARKK: false, MARS: false, FRWD: 4.88, BCTK: false, FWD: false, CBSE: false, FCUS: 5.07, WGMI: false, CNEQ: 5.4, SGRT: 9.25, SPMO: 1.9, XMMO: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 7, avgWeight: 3.62, proScore: 1.49, coverage: 0.412,
      price: 375.82, weeklyPrices: [382.07, 378.91, 365.02, 372.45, 375.82], weeklyChange: -1.64, dayChange: 0.9, sortRank: 0, periodReturns: { '1M': -15.9, 'YTD': 8.6, '6M': 7.4, '1Y': 36.3 },
      priceHistory: { '1D': [372.45, 375.3, 375.82], '1W': [382.07, 378.91, 365.02, 372.45, 375.82], '1M': [459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 375.82], 'YTD': [346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 425.19, 414.14, 459.97, 396.6, 393.94, 380.15, 375.82], '6M': [349.85, 343.5, 339.89, 325.49, 330.73, 310.51, 331.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 425.19, 414.14, 459.97, 396.6, 393.94, 380.15, 375.82], '1Y': [275.65, 271.8, 280.94, 278.59, 297.42, 292.93, 312.83, 305.76, 294.23, 298.24, 336.67, 360, 338.94, 329.91, 336.41, 344.13, 342.66, 372.97, 351.94, 351.96, 342.65, 377.96, 381.57, 406.29, 341.3, 349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 331.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 425.19, 414.14, 459.97, 396.6, 393.94, 380.15, 375.82] },
      velocityScore: { '1D': 0, '1W': 2.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 62.6, revenueGrowth: 48, eps: 6, grossMargin: 76, dividendYield: 0.7,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.79, GTEK: false, ARKK: 1.07, MARS: false, FRWD: 4.75, BCTK: 6.67, FWD: 1.83, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.18, SGRT: false, SPMO: 6.03, XMMO: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'SPCX', name: 'SPACE EXPLORATION TECHN-CL A', easyScore: 6, avgWeight: 7.13, proScore: 2.52, coverage: 0.353,
      price: 165.16, weeklyPrices: [154.54, 153.00, 153.23, 164.19, 165.16], weeklyChange: 6.87, dayChange: 0.59, sortRank: 0, periodReturns: { '1M': 2.6, 'YTD': 2.6, '6M': 2.6, '1Y': 2.6 },
      priceHistory: { '1D': [164.19, 164.79, 165.16], '1W': [154.54, 153, 153.23, 164.19, 165.16], '1M': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 165.16], 'YTD': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 165.16], '6M': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 165.16], '1Y': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 165.16] },
      velocityScore: { '1D': -0.8, '1W': -0.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.2T', pe: null, revenueGrowth: 15, eps: -0.67, grossMargin: 49, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.17, MARS: 22.77, FRWD: 2.34, BCTK: 8.29, FWD: 1.71, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.48, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'SPACE EXPLORATION TECHN-CL A appears in 6 of 17 Broad Tech ETFs (35% coverage) with average weight 7.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 6, avgWeight: 4.68, proScore: 1.65, coverage: 0.353,
      price: 458.13, weeklyPrices: [440.83, 434.99, 432.35, 455.10, 458.13], weeklyChange: 3.92, dayChange: 0.69, sortRank: 0, periodReturns: { '1M': 9.5, 'YTD': 50.8, '6M': 52.9, '1Y': 102.3 },
      priceHistory: { '1D': [455, 457.66, 458.13], '1W': [440.83, 434.99, 432.35, 455.1, 458.13], '1M': [435.63, 446.69, 436.69, 444.92, 415.17, 426.8, 427.92, 408.75, 421.07, 423.93, 441.4, 425.83, 432.15, 462.12, 467.67, 436.39, 440.83, 434.99, 432.35, 455.1, 458.13], 'YTD': [303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 370.54, 374.58, 338.89, 338.31, 329.24, 326.74, 341.76, 369.57, 366.24, 404.98, 401.61, 404.54, 404.35, 404.52, 435.63, 426.8, 441.4, 436.39, 458.13], '6M': [299.58, 318.68, 327.11, 327.37, 339.55, 330.73, 368.1, 370.54, 374.58, 338.89, 338.31, 329.24, 326.74, 339.04, 370.6, 370.5, 402.46, 397.67, 411.68, 404.35, 404.52, 435.63, 426.8, 441.4, 436.39, 458.13], '1Y': [226.49, 227.86, 236.95, 234.6, 241.33, 232.47, 244.29, 241.41, 235.59, 228.39, 250.92, 262.06, 282.71, 279.29, 294.03, 295.94, 294.51, 301.53, 294.05, 291.17, 282.01, 284.64, 292.09, 303.41, 286.87, 296.95, 303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 368.1, 370.54, 374.58, 338.89, 338.31, 329.24, 326.74, 341.76, 369.57, 366.24, 404.98, 401.61, 404.54, 404.35, 404.52, 435.63, 426.8, 441.4, 436.39, 458.13] },
      velocityScore: { '1D': 0, '1W': -8.3, '1M': -13.6, '6M': null }, isNew: false,
      marketCap: '$2.4T', pe: 39.8, revenueGrowth: 35, eps: 11.51, grossMargin: 62, dividendYield: 0.84,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6, GTEK: false, ARKK: 0.95, MARS: false, FRWD: 6, BCTK: 8.68, FWD: false, CBSE: false, FCUS: false, WGMI: 0.56, CNEQ: 5.92, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 6, avgWeight: 3.27, proScore: 1.15, coverage: 0.353,
      price: 239.96, weeklyPrices: [234.27, 227.01, 232.69, 240.14, 239.96], weeklyChange: 2.43, dayChange: -0.07, sortRank: 0, periodReturns: { '1M': -11.3, 'YTD': 4, '6M': 3.2, '1Y': 9.4 },
      priceHistory: { '1D': [240.14, 239.18, 239.96], '1W': [234.27, 227.01, 232.69, 240.14, 239.96], '1M': [261.26, 256.52, 250.02, 253.79, 246.03, 245.22, 244.19, 238, 241.51, 238.55, 246.02, 246, 237.5, 244.39, 232.79, 234.11, 234.27, 227.01, 232.69, 240.14, 239.96], 'YTD': [230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 198.79, 210.11, 210, 213.21, 207.67, 205.37, 199.34, 212.79, 239.89, 248.28, 261.12, 272.05, 268.99, 264.14, 266.32, 261.26, 245.22, 246.02, 234.11, 239.96], '6M': [232.53, 241.56, 236.65, 234.34, 241.73, 222.69, 199.6, 210.11, 210, 213.21, 207.67, 205.37, 199.34, 209.77, 238.38, 250.56, 263.99, 268.26, 272.68, 264.14, 266.32, 261.26, 245.22, 246.02, 234.11, 239.96], '1Y': [219.39, 219.36, 226.35, 227.47, 231.01, 213.75, 221.47, 231.49, 227.94, 225.34, 238.24, 234.05, 220.71, 219.57, 221.78, 216.39, 222.03, 229.25, 249.32, 249.1, 232.87, 226.28, 234.42, 227.92, 222.56, 232.14, 230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 199.6, 210.11, 210, 213.21, 207.67, 205.37, 199.34, 212.79, 239.89, 248.28, 261.12, 272.05, 268.99, 264.14, 266.32, 261.26, 245.22, 246.02, 234.11, 239.96] },
      velocityScore: { '1D': 0, '1W': -4.2, '1M': -73.9, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 31.6, revenueGrowth: 17, eps: 7.59, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.01, GTEK: false, ARKK: 2.32, MARS: false, FRWD: 2.88, BCTK: 4.2, FWD: 1.46, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.73, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'LRCX', name: 'Lam Research Corp', easyScore: 5, avgWeight: 4.8, proScore: 1.41, coverage: 0.294,
      price: 424.56, weeklyPrices: [374.80, 401.82, 379.09, 410.91, 424.56], weeklyChange: 13.28, dayChange: 3.32, sortRank: 0, periodReturns: { '1M': 33.4, 'YTD': 148, '6M': 144.3, '1Y': 336.2 },
      priceHistory: { '1D': [410.91, 421.32, 424.56], '1W': [374.8, 401.82, 379.09, 410.91, 424.56], '1M': [317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04, 409.54, 371.33, 374.8, 401.82, 379.09, 410.91, 424.56], 'YTD': [171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 244.92, 233.89, 199.33, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 258.57, 296.05, 284.72, 305.35, 317.12, 324.45, 388.92, 371.33, 424.56], '6M': [173.78, 203.08, 208.79, 220.7, 248.17, 213.31, 231.29, 244.92, 233.89, 199.33, 212.2, 228.36, 211.41, 218.44, 263.66, 267.6, 267.78, 256.72, 294.05, 284.72, 305.35, 317.12, 324.45, 388.92, 371.33, 424.56], '1Y': [97.34, 99.83, 101.07, 97.69, 98.94, 96.68, 105.28, 98.88, 101.28, 97.03, 105.57, 120.47, 131.93, 133.9, 140.35, 138.31, 145.04, 155.62, 155.78, 159.18, 147.46, 150.38, 158.19, 165.81, 163.26, 175.16, 171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 231.29, 244.92, 233.89, 199.33, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 258.57, 296.05, 284.72, 305.35, 317.12, 324.45, 388.92, 371.33, 424.56] },
      velocityScore: { '1D': 1.4, '1W': 5.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$531B', pe: 80.1, revenueGrowth: 24, eps: 5.3, grossMargin: 50, dividendYield: 0.25,
      etfPresence: { PTF: 3.44, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 6.13, BCTK: 8.28, FWD: 2.02, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 4.11, XMMO: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 5, avgWeight: 4.46, proScore: 1.31, coverage: 0.294,
      price: 958.38, weeklyPrices: [993.25, 1025.36, 899.90, 968.53, 958.38], weeklyChange: -3.51, dayChange: -1.05, sortRank: 0, periodReturns: { '1M': 8.9, 'YTD': 248, '6M': 242.2, '1Y': 564 },
      priceHistory: { '1D': [968.53, 952.27, 958.38], '1W': [993.25, 1025.36, 899.9, 968.53, 958.38], '1M': [921.26, 926.61, 940.69, 925.99, 847.47, 876.77, 846.01, 815.99, 868.09, 931.04, 1018.8, 1031.34, 1066.07, 1070.23, 1094.04, 1038.59, 993.25, 1025.36, 899.9, 968.53, 958.38], 'YTD': [275.39, 284.47, 320.32, 346.1, 407.69, 429.32, 425.99, 411.11, 407.84, 352.8, 383.71, 411.23, 380.07, 453.3, 513.28, 539.75, 595.86, 738.54, 834.01, 795.47, 812.73, 921.26, 876.77, 1018.8, 1038.59, 958.38], '6M': [280.08, 308.26, 312.28, 346.53, 446.57, 405.45, 431.17, 411.11, 407.84, 352.8, 383.71, 411.23, 380.07, 429.36, 503.13, 547.75, 586.25, 726.93, 782.64, 795.47, 812.73, 921.26, 876.77, 1018.8, 1038.59, 958.38], '1Y': [144.33, 144.47, 149.05, 146.59, 152.68, 151.74, 155.59, 158.7, 164, 170.5, 191.59, 211.13, 228.13, 236.06, 225.01, 211.63, 214.57, 223, 250.38, 288, 261.38, 253.38, 266.87, 282.86, 288.13, 282.8, 275.39, 284.47, 320.32, 346.1, 407.69, 429.32, 431.17, 411.11, 407.84, 352.8, 383.71, 411.23, 380.07, 453.3, 513.28, 539.75, 595.86, 738.54, 834.01, 795.47, 812.73, 921.26, 876.77, 1018.8, 1038.59, 958.38] },
      velocityScore: { '1D': -3.7, '1W': -11.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$217B', pe: 90.8, revenueGrowth: 44, eps: 10.56, grossMargin: 42, dividendYield: 0.31,
      etfPresence: { PTF: 3.94, WCLD: false, IGV: false, FDTX: 4.04, GTEK: false, ARKK: false, MARS: false, FRWD: 7.63, BCTK: false, FWD: false, CBSE: false, FCUS: 4.81, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.87, XMMO: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 5, avgWeight: 4.01, proScore: 1.18, coverage: 0.294,
      price: 348.9, weeklyPrices: [345.04, 342.19, 334.69, 351.28, 348.90], weeklyChange: 1.12, dayChange: -0.68, sortRank: 0, periodReturns: { '1M': -7.3, 'YTD': 11.2, '6M': 10.9, '1Y': 96.7 },
      priceHistory: { '1D': [351.28, 349.03, 348.9], '1W': [345.04, 342.19, 334.69, 351.28, 348.9], '1M': [372.58, 358.39, 355.68, 369.27, 365.76, 361.17, 362.29, 353.32, 356.56, 358.16, 367.11, 371.1, 362.1, 367.46, 348.78, 346.08, 345.04, 342.19, 334.69, 351.28, 348.9], 'YTD': [313.8, 326.01, 333.16, 328.43, 338.53, 323.1, 306.02, 314.9, 311.43, 298.3, 301.46, 298.79, 273.76, 297.66, 319.21, 335.4, 348.52, 379.64, 386.77, 393.32, 379.38, 372.58, 361.17, 367.11, 346.08, 348.9], '6M': [314.55, 322.43, 336.31, 330.84, 338.66, 331.33, 309.37, 314.9, 311.43, 298.3, 301.46, 298.79, 273.76, 294.46, 315.72, 339.4, 342.32, 383.22, 397.05, 393.32, 379.38, 372.58, 361.17, 367.11, 346.08, 348.9], '1Y': [177.39, 175.16, 183.1, 192.11, 196.43, 195.32, 204.16, 204.29, 209.16, 211.99, 239.94, 251.42, 252.34, 243.55, 247.13, 246.19, 251.34, 268.43, 278.06, 291.74, 285.6, 318.47, 316.02, 317.75, 307.73, 315.68, 313.8, 326.01, 333.16, 328.43, 338.53, 323.1, 309.37, 314.9, 311.43, 298.3, 301.46, 298.79, 273.76, 297.66, 319.21, 335.4, 348.52, 379.64, 386.77, 393.32, 379.38, 372.58, 361.17, 367.11, 346.08, 348.9] },
      velocityScore: { '1D': 0.9, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.3T', pe: 26.6, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.66, GTEK: false, ARKK: 1.83, MARS: false, FRWD: false, BCTK: 5.54, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 5.71, SGRT: false, SPMO: 3.3, XMMO: false },
      tonyNote: 'Alphabet Inc Class C appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 4.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRWD', name: 'CrowdStrike', easyScore: 5, avgWeight: 2.63, proScore: 0.77, coverage: 0.294,
      price: 751.65, weeklyPrices: [673.02, 678.65, 701.09, 742.91, 751.65], weeklyChange: 11.68, dayChange: 1.18, sortRank: 0, periodReturns: { '1M': 2.8, 'YTD': 60.3, '6M': 58, '1Y': 47.6 },
      priceHistory: { '1D': [742.91, 750.18, 751.65], '1W': [673.02, 678.65, 701.09, 742.91, 751.65], '1M': [782.17, 768.95, 747.61, 719.09, 671.02, 658.79, 644.93, 647.74, 691.53, 682.8, 692.91, 679.49, 682.96, 684.86, 675.44, 680.92, 673.02, 678.65, 701.09, 742.91, 751.65], 'YTD': [468.76, 463.87, 455, 452.49, 441.4, 395.5, 429.64, 388.6, 371.98, 428.99, 441.78, 409, 369.58, 398.61, 402.24, 433.15, 454.61, 469.24, 542.26, 594.08, 663.46, 782.17, 658.79, 692.91, 680.92, 751.65], '6M': [475.63, 478.91, 460.7, 453.77, 444.62, 377.16, 411.54, 388.6, 371.98, 428.99, 441.78, 409, 369.58, 399.12, 379.02, 423.95, 448.13, 455.64, 527.77, 594.08, 663.46, 782.17, 658.79, 692.91, 680.92, 751.65], '1Y': [509.31, 507.71, 473.28, 471.23, 465.51, 441.75, 435.8, 426.34, 418.83, 413.5, 423.51, 444.98, 484.1, 490.38, 484.62, 488.94, 503.95, 546.94, 533.92, 556.73, 529.78, 506.82, 516.55, 517.98, 488.53, 478.84, 468.76, 463.87, 455, 452.49, 441.4, 395.5, 411.54, 388.6, 371.98, 428.99, 441.78, 409, 369.58, 398.61, 402.24, 433.15, 454.61, 469.24, 542.26, 594.08, 663.46, 782.17, 658.79, 692.91, 680.92, 751.65] },
      velocityScore: { '1D': 1.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$191B', pe: null, revenueGrowth: 26, eps: -0.15, grossMargin: 75, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.5, IGV: 7.14, FDTX: 1.24, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 1.2, FWD: 1.09, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'CrowdStrike appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 2.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, avgWeight: 5.15, proScore: 1.21, coverage: 0.235,
      price: 369.13, weeklyPrices: [365.46, 352.83, 372.97, 368.57, 369.13], weeklyChange: 1, dayChange: 0.15, sortRank: 0, periodReturns: { '1M': -18, 'YTD': -23.7, '6M': -24.3, '1Y': -25.8 },
      priceHistory: { '1D': [368.57, 369.15, 369.13], '1W': [365.46, 352.83, 372.97, 368.57, 369.13], '1M': [460.52, 441.31, 427.34, 428.05, 416.67, 411.74, 403.41, 397.36, 390.34, 390.74, 399.76, 393.83, 378.91, 379.4, 367.34, 373.94, 365.46, 352.83, 372.97, 368.57, 369.13], 'YTD': [483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 397.23, 392.74, 408.96, 395.55, 381.87, 356.77, 372.88, 384.37, 418.07, 424.82, 413.62, 412.66, 421.92, 418.57, 460.52, 411.74, 399.76, 373.94, 369.13], '6M': [487.48, 483.47, 459.38, 451.14, 433.5, 393.67, 401.84, 397.23, 392.74, 408.96, 395.55, 381.87, 356.77, 373.46, 370.87, 422.79, 424.62, 414.44, 415.12, 421.92, 418.57, 460.52, 411.74, 399.76, 373.94, 369.13], '1Y': [497.41, 496.62, 505.82, 505.27, 512.57, 527.75, 529.24, 517.1, 504.26, 505.12, 498.41, 509.04, 509.23, 517.95, 523.98, 513.57, 517.66, 542.07, 514.33, 508.68, 507.49, 474, 490, 492.02, 476.39, 486.85, 483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.84, 397.23, 392.74, 408.96, 395.55, 381.87, 356.77, 372.88, 384.37, 418.07, 424.82, 413.62, 412.66, 421.92, 418.57, 460.52, 411.74, 399.76, 373.94, 369.13] },
      velocityScore: { '1D': -2.4, '1W': -1.6, '1M': -77.5, '6M': null }, isNew: false,
      marketCap: '$2.7T', pe: 22, revenueGrowth: 18, eps: 16.81, grossMargin: 68, dividendYield: 0.99,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.03, FDTX: 3.79, GTEK: false, ARKK: false, MARS: false, FRWD: 2.95, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 5.83, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks', easyScore: 4, avgWeight: 4.45, proScore: 1.05, coverage: 0.235,
      price: 336.68, weeklyPrices: [285.26, 293.09, 304.20, 332.00, 336.68], weeklyChange: 18.02, dayChange: 1.41, sortRank: 0, periodReturns: { '1M': 19.5, 'YTD': 82.8, '6M': 80.2, '1Y': 64.5 },
      priceHistory: { '1D': [332, 336.36, 336.68], '1W': [285.26, 293.09, 304.2, 332, 336.68], '1M': [300.48, 297.18, 280.43, 279.25, 272.05, 266.33, 260.52, 263.22, 279.53, 279.62, 284.54, 279.9, 282.13, 287.78, 286.4, 290.92, 285.26, 293.09, 304.2, 332, 336.68], 'YTD': [184.2, 190.8, 187.73, 180.18, 176.97, 159.32, 166.95, 148.7, 148.92, 165.05, 167.02, 162.95, 147.02, 161.95, 162.51, 169.56, 182.9, 184.56, 213.66, 242.83, 260.58, 300.48, 266.33, 284.54, 290.92, 336.68], '6M': [186.85, 193.9, 190.93, 182.27, 176.2, 154.77, 162.81, 148.7, 148.92, 165.05, 167.02, 162.95, 147.02, 163.21, 155.73, 167.85, 178.54, 181.08, 207.88, 242.83, 260.58, 300.48, 266.33, 284.54, 290.92, 336.68], '1Y': [204.64, 203.99, 192.25, 196.73, 193.84, 169.09, 175.4, 176.17, 184.55, 190.52, 197.55, 201.34, 203.25, 203.62, 211.04, 207.56, 214.4, 221.38, 214.52, 218.27, 202.9, 183.89, 189.88, 195, 187.09, 188.12, 184.2, 190.8, 187.73, 180.18, 176.97, 159.32, 162.81, 148.7, 148.92, 165.05, 167.02, 162.95, 147.02, 161.95, 162.51, 169.56, 182.9, 184.56, 213.66, 242.83, 260.58, 300.48, 266.33, 284.54, 290.92, 336.68] },
      velocityScore: { '1D': 4, '1W': 8.2, '1M': -59.6, '6M': null }, isNew: false,
      marketCap: '$274B', pe: 290.2, revenueGrowth: 31, eps: 1.16, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.83, IGV: 10.17, FDTX: 3.67, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.14, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 4, avgWeight: 4.34, proScore: 1.02, coverage: 0.235,
      price: 2124.89, weeklyPrices: [1914.46, 2335.00, 2090.71, 2050.39, 2124.89], weeklyChange: 10.99, dayChange: 3.63, sortRank: 0, periodReturns: { '1M': 25.4, 'YTD': 795.1, '6M': 784.6, '1Y': 4585.5 },
      priceHistory: { '1D': [2050.39, 2104.82, 2124.89], '1W': [1914.46, 2335, 2090.71, 2050.39, 2124.89], '1M': [1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2124.89], 'YTD': [237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 649.97, 635.36, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1407.61, 1478.69, 1761.43, 1642, 2107.86, 1963.6, 2124.89], '6M': [240.22, 353.56, 387.81, 503.44, 539.3, 576.2, 630.29, 649.97, 635.36, 527.33, 661.62, 709.71, 615.83, 701.59, 851.77, 920.99, 989.9, 1187, 1562.34, 1407.61, 1478.69, 1761.43, 1642, 2107.86, 1963.6, 2124.89], '1Y': [45.35, 46.17, 42.72, 41.36, 42.93, 41.93, 46.83, 45.52, 46.78, 51.07, 70.51, 91.55, 106.4, 112.2, 120.95, 127.29, 149.29, 175.53, 194.57, 271.58, 265.88, 226.96, 205.35, 219.46, 209.31, 244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 630.29, 649.97, 635.36, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1407.61, 1478.69, 1761.43, 1642, 2107.86, 1963.6, 2124.89] },
      velocityScore: { '1D': -11.3, '1W': -10.5, '1M': -62.1, '6M': null }, isNew: false,
      marketCap: '$315B', pe: 72.5, revenueGrowth: 251, eps: 29.32, grossMargin: 56, dividendYield: null,
      etfPresence: { PTF: 7.06, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.58, CBSE: false, FCUS: 5.75, WGMI: false, CNEQ: false, SGRT: false, SPMO: 2.96, XMMO: false },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC-CL A', easyScore: 4, avgWeight: 2.33, proScore: 0.55, coverage: 0.235,
      price: 351.38, weeklyPrices: [345.29, 343.71, 337.39, 353.65, 351.38], weeklyChange: 1.76, dayChange: -0.64, sortRank: 0, periodReturns: { '1M': -7.6, 'YTD': 12.3, '6M': 12, '1Y': 99.4 },
      priceHistory: { '1D': [353.65, 351.45, 351.38], '1W': [345.29, 343.71, 337.39, 353.65, 351.38], '1M': [376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68, 369.35, 373.25, 363.79, 368.03, 349.68, 346.13, 345.29, 343.71, 337.39, 353.65, 351.38], 'YTD': [313, 325.44, 332.78, 327.93, 338, 322.86, 305.72, 314.98, 311.76, 298.52, 302.28, 301, 274.34, 299.99, 321.31, 337.42, 350.34, 383.25, 388.64, 396.78, 382.97, 376.37, 363.31, 369.35, 346.13, 351.38], '6M': [313.85, 321.98, 335.84, 330.54, 338.25, 331.25, 309, 314.98, 311.76, 298.52, 302.28, 301, 274.34, 295.77, 317.24, 341.68, 344.4, 385.69, 400.8, 396.78, 382.97, 376.37, 363.31, 369.35, 346.13, 351.38], '1Y': [176.23, 174.36, 182, 191.34, 195.75, 194.67, 203.34, 203.5, 208.49, 211.35, 239.63, 251.16, 251.66, 243.1, 245.76, 245.45, 250.46, 267.47, 277.54, 291.31, 285.02, 318.58, 315.81, 317.08, 306.57, 314.35, 313, 325.44, 332.78, 327.93, 338, 322.86, 309, 314.98, 311.76, 298.52, 302.28, 301, 274.34, 299.99, 321.31, 337.42, 350.34, 383.25, 388.64, 396.78, 382.97, 376.37, 363.31, 369.35, 346.13, 351.38] },
      velocityScore: { '1D': 0, '1W': -6.8, '1M': -89.1, '6M': null }, isNew: false,
      marketCap: '$4.3T', pe: 26.8, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 0.48, MARS: false, FRWD: 3.17, BCTK: false, FWD: 1.53, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 4.16, XMMO: false },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 3, avgWeight: 5.28, proScore: 0.93, coverage: 0.176,
      price: 410.38, weeklyPrices: [375.53, 375.12, 379.71, 411.84, 410.38], weeklyChange: 9.28, dayChange: -0.35, sortRank: 0, periodReturns: { '1M': -5.8, 'YTD': -8.7, '6M': -9.7, '1Y': 29.2 },
      priceHistory: { '1D': [411.84, 409.49, 410.38], '1W': [375.53, 375.12, 379.71, 411.84, 410.38], '1M': [415.88, 423.74, 423.7, 418.45, 391, 408.95, 396.68, 381.59, 399.15, 406.43, 411.15, 404.66, 396.38, 400.49, 405.05, 381.61, 375.53, 375.12, 379.71, 411.84, 410.38], 'YTD': [449.72, 435.8, 438.57, 449.06, 430.41, 411.11, 417.44, 411.82, 402.51, 396.73, 391.2, 367.96, 361.83, 352.82, 352.42, 392.5, 378.67, 392.51, 445, 422.24, 426.01, 415.88, 408.95, 411.15, 381.61, 410.38], '6M': [454.43, 431.41, 439.2, 449.36, 416.56, 397.21, 417.07, 411.82, 402.51, 396.73, 391.2, 367.96, 361.83, 360.59, 348.95, 400.62, 376.3, 390.82, 428.35, 422.24, 426.01, 415.88, 408.95, 411.15, 381.61, 410.38], '1Y': [317.66, 297.81, 310.78, 332.11, 321.2, 308.72, 340.84, 335.16, 346.6, 329.36, 346.97, 421.62, 425.85, 444.72, 433.09, 429.24, 442.6, 460.55, 444.26, 439.62, 408.92, 417.78, 429.24, 445.17, 489.88, 485.56, 449.72, 435.8, 438.57, 449.06, 430.41, 411.11, 417.07, 411.82, 402.51, 396.73, 391.2, 367.96, 361.83, 352.82, 352.42, 392.5, 378.67, 392.51, 445, 422.24, 426.01, 415.88, 408.95, 411.15, 381.61, 410.38] },
      velocityScore: { '1D': 1.1, '1W': -2.1, '1M': -84.9, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 383.5, revenueGrowth: 16, eps: 1.07, grossMargin: 19, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 9.54, MARS: false, FRWD: false, BCTK: 3.14, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.15, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
    {
      ticker: 'DELL', name: 'DELL', easyScore: 3, avgWeight: 4.58, proScore: 0.81, coverage: 0.176,
      price: 413.04, weeklyPrices: [434.06, 409.45, 399.49, 414.61, 413.04], weeklyChange: -4.84, dayChange: -0.31, sortRank: 0, periodReturns: { '1M': -1.9, 'YTD': 228.1, '6M': 222.9, '1Y': 236.9 },
      priceHistory: { '1D': [414.31, 415.16, 413.04], '1W': [434.06, 409.45, 399.49, 414.61, 413.04], '1M': [465.96, 435.31, 421.08, 422.05, 394.39, 400.77, 381.78, 369.83, 391.45, 395.57, 409.07, 404.08, 419.32, 409.5, 418.71, 427.78, 434.06, 409.45, 399.49, 414.61, 413.04], 'YTD': [125.88, 118.5, 119.66, 115.43, 114.44, 121.05, 117.49, 122.27, 148.08, 146.48, 151.62, 157.67, 171.81, 173.18, 189.79, 204.24, 215.97, 211.64, 247.04, 241.99, 295.19, 465.96, 400.77, 409.07, 427.78, 413.04], '6M': [127.92, 120.07, 118.69, 117.17, 118.49, 115.39, 112.82, 122.27, 148.08, 146.48, 151.62, 157.67, 171.81, 174.37, 177.8, 196.55, 216.09, 210.17, 260.46, 241.99, 295.19, 465.96, 400.77, 409.07, 427.78, 413.04], '1Y': [122.6, 124.39, 125.69, 124.33, 133.51, 130.48, 141.64, 138.13, 131.01, 120.96, 121.29, 127.68, 134.34, 141.77, 150.87, 148.77, 149.43, 164.88, 154.64, 138.76, 122.48, 127.22, 135.95, 138.22, 133.75, 127.62, 125.88, 118.5, 119.66, 115.43, 114.44, 121.05, 112.82, 122.27, 148.08, 146.48, 151.62, 157.67, 171.81, 173.18, 189.79, 204.24, 215.97, 211.64, 247.04, 241.99, 295.19, 465.96, 400.77, 409.07, 427.78, 413.04] },
      velocityScore: { '1D': -3.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$267B', pe: 32.9, revenueGrowth: 88, eps: 12.56, grossMargin: 19, dividendYield: 0.61,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: 2.91, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: 4.38, WGMI: false, CNEQ: false, SGRT: 6.44, SPMO: false, XMMO: false },
      tonyNote: 'DELL appears in 3 of 17 Broad Tech ETFs (18% coverage) with average weight 4.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LITE', name: 'Lumentum Holdings Inc', easyScore: 3, avgWeight: 4.37, proScore: 0.77, coverage: 0.176,
      price: 862.1, weeklyPrices: [842.53, 861.97, 816.98, 851.40, 862.10], weeklyChange: 2.32, dayChange: 1.26, sortRank: 0, periodReturns: { '1M': 0.8, 'YTD': 133.9, '6M': 132.3, '1Y': 806.9 },
      priceHistory: { '1D': [851.4, 856.48, 862.1], '1W': [842.53, 861.97, 816.98, 851.4, 862.1], '1M': [905, 1029.15, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93, 827.92, 842.53, 861.97, 816.98, 851.4, 862.1], 'YTD': [368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 667.77, 700.91, 558.44, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 1053.09, 970.7, 946.9, 905, 895.4, 957.24, 827.92, 862.1], '6M': [371.18, 392.88, 331.62, 354.49, 381.44, 504.42, 583.46, 667.77, 700.91, 558.44, 622.5, 706.35, 702.73, 826.88, 897.3, 894.07, 881.64, 949.93, 903.8, 970.7, 946.9, 905, 895.4, 957.24, 827.92, 862.1], '1Y': [95.06, 91.31, 98.14, 99.63, 109.48, 108.15, 119.66, 118.98, 123.42, 132.55, 151.73, 170.9, 163.99, 162.71, 157.15, 156.78, 162.95, 198.39, 188.36, 252.47, 242.07, 299.36, 302.81, 360.33, 316.15, 387.41, 368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 583.46, 667.77, 700.91, 558.44, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 1053.09, 970.7, 946.9, 905, 895.4, 957.24, 827.92, 862.1] },
      velocityScore: { '1D': 1.3, '1W': -13.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$67B', pe: 151.2, revenueGrowth: 90, eps: 5.7, grossMargin: 41, dividendYield: null,
      etfPresence: { PTF: 3.84, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 1.4, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: 7.88, SPMO: false, XMMO: false },
      tonyNote: 'Lumentum Holdings Inc appears in 3 of 17 Broad Tech ETFs (18% coverage) with average weight 4.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 3, avgWeight: 4.37, proScore: 0.77, coverage: 0.176,
      price: 115.37, weeklyPrices: [113.50, 107.27, 112.93, 115.70, 115.37], weeklyChange: 1.65, dayChange: -0.29, sortRank: 0, periodReturns: { '1M': -26.3, 'YTD': -35.1, '6M': -36.2, '1Y': -15.4 },
      priceHistory: { '1D': [115.7, 115.49, 115.37], '1W': [113.5, 107.27, 112.93, 115.7, 115.37], '1M': [160.65, 152.17, 142.2, 141.7, 135.53, 136.47, 132.07, 130.21, 131.08, 127.99, 134.71, 133.25, 130.63, 128.47, 119.5, 116.7, 113.5, 107.27, 112.93, 115.7, 115.37], 'YTD': [177.75, 176.86, 177.07, 169.6, 146.59, 135.9, 131.41, 135.24, 137.19, 157.16, 150.95, 150.68, 143.06, 147.93, 132.37, 145.89, 143.1, 146.03, 136.89, 133.99, 136.88, 160.65, 136.47, 134.71, 116.7, 115.37], '6M': [180.84, 181.68, 178.4, 165.9, 151.86, 130.01, 129.13, 135.24, 137.19, 157.16, 150.95, 150.68, 143.06, 148.46, 128.06, 146.39, 143.09, 144.07, 137.8, 133.99, 136.88, 160.65, 136.47, 134.71, 116.7, 115.37], '1Y': [136.32, 139.71, 148.58, 149.07, 156.24, 173.27, 186.97, 174.03, 157.17, 157.09, 162.36, 170.26, 182.55, 182.42, 182.17, 179.74, 181.51, 189.6, 190.74, 190.96, 171.25, 162.25, 170.69, 181.84, 187.75, 194.13, 177.75, 176.86, 177.07, 169.6, 146.59, 135.9, 129.13, 135.24, 137.19, 157.16, 150.95, 150.68, 143.06, 147.93, 132.37, 145.89, 143.1, 146.03, 136.89, 133.99, 136.88, 160.65, 136.47, 134.71, 116.7, 115.37] },
      velocityScore: { '1D': 0, '1W': -10.5, '1M': -72.5, '6M': null }, isNew: false,
      marketCap: '$277B', pe: 129.6, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 7.69, FDTX: 2.87, GTEK: false, ARKK: 2.56, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'BE', name: 'Bloom Energy Corp', easyScore: 4, avgWeight: 3.19, proScore: 2.55, coverage: 0.8,
      price: 292.03, weeklyPrices: [326.19, 309.18, 252.02, 275.01, 292.03], weeklyChange: -10.47, dayChange: 6.19, sortRank: 0, periodReturns: { '1M': 2.5, 'YTD': 236.1, '6M': 234.7, '1Y': 1120.8 },
      priceHistory: { '1D': [275.01, 290.75, 292.03], '1W': [326.19, 309.18, 252.02, 275.01, 292.03], '1M': [273.51, 302.85, 287.32, 291.37, 263.61, 253.57, 259.61, 234.23, 248.88, 260.22, 274.5, 280.88, 284.99, 328.91, 345.85, 321.98, 326.19, 309.18, 252.02, 275.01, 292.03], 'YTD': [86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 147.55, 155.67, 135.19, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 288.64, 283.92, 275.95, 302.49, 273.51, 253.57, 274.5, 321.98, 292.03], '6M': [87.26, 108, 133.46, 145.63, 156.51, 136.6, 139.03, 147.55, 155.67, 135.19, 154.51, 150.12, 133.24, 135.63, 166.7, 207.86, 231.17, 290.52, 261.03, 275.95, 302.49, 273.51, 253.57, 274.5, 321.98, 292.03], '1Y': [23.92, 24.3, 25.31, 25.93, 34.75, 37.61, 41.25, 46.5, 49.35, 51.35, 55, 73.29, 77.38, 84.57, 86.06, 114.06, 104.38, 113.28, 129.05, 127.07, 107.11, 95.56, 105, 109.44, 87.61, 91.43, 86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.03, 147.55, 155.67, 135.19, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 288.64, 283.92, 275.95, 302.49, 273.51, 253.57, 274.5, 321.98, 292.03] },
      velocityScore: { '1D': 7.6, '1W': -4.5, '1M': 9.4, '6M': null }, isNew: false,
      marketCap: '$83B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: 1.57, VOLT: 3.83, PBD: false, PBW: 2.35, IVEP: 5.02 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 3, avgWeight: 4.92, proScore: 2.95, coverage: 0.6,
      price: 705.32, weeklyPrices: [701.88, 718.59, 687.87, 714.45, 705.32], weeklyChange: 0.49, dayChange: -1.27, sortRank: 0, periodReturns: { '1M': -0.9, 'YTD': 67.1, '6M': 64.5, '1Y': 86.6 },
      priceHistory: { '1D': [714.39, 706.43, 705.32], '1W': [701.88, 718.59, 687.87, 714.45, 705.32], '1M': [687.48, 706.06, 715.67, 719.17, 695.11, 693.81, 691.95, 650.92, 683.29, 707.74, 724.35, 719.29, 714.85, 702.25, 740.14, 702.29, 701.88, 718.59, 687.87, 714.45, 705.32], 'YTD': [422.06, 413.17, 447.64, 468.76, 474.63, 508.11, 524.08, 552.66, 563.08, 540.19, 559.02, 555.39, 549.98, 554.38, 595.84, 604.97, 637.28, 757.34, 781.38, 769.99, 723.44, 687.48, 693.81, 724.35, 702.29, 705.32], '6M': [428.81, 436.89, 437.07, 468.78, 483.43, 477.72, 515.88, 552.66, 563.08, 540.19, 559.02, 555.39, 549.98, 560.63, 585.36, 601.88, 624.84, 742.21, 745, 769.99, 723.44, 687.48, 693.81, 724.35, 702.29, 705.32], '1Y': [378.08, 377.56, 386.54, 394.93, 410.99, 389.12, 391.57, 383.32, 378.31, 374.68, 373.47, 378.24, 389.53, 414.42, 421.51, 431.6, 437.43, 439.57, 438.66, 448.91, 426.87, 442.64, 454.72, 457.96, 438.49, 435.2, 422.06, 413.17, 447.64, 468.76, 474.63, 508.11, 515.88, 552.66, 563.08, 540.19, 559.02, 555.39, 549.98, 554.38, 595.84, 604.97, 637.28, 757.34, 781.38, 769.99, 723.44, 687.48, 693.81, 724.35, 702.29, 705.32] },
      velocityScore: { '1D': 2.4, '1W': 3.1, '1M': -18.7, '6M': null }, isNew: false,
      marketCap: '$106B', pe: 96.8, revenueGrowth: 26, eps: 7.29, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 5.02, VOLT: 5.36, PBD: false, PBW: false, IVEP: 4.39 },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 3, avgWeight: 4.51, proScore: 2.71, coverage: 0.6,
      price: 284.89, weeklyPrices: [294.49, 309.20, 279.77, 281.09, 284.89], weeklyChange: -3.26, dayChange: 1.35, sortRank: 0, periodReturns: { '1M': 0.2, 'YTD': 168.1, '6M': 161, '1Y': 306.1 },
      priceHistory: { '1D': [281.09, 282.37, 284.89], '1W': [294.49, 309.2, 279.77, 281.09, 284.89], '1M': [288.12, 299.07, 299.73, 300.06, 284.87, 293.6, 283.51, 262.34, 290.5, 294.75, 303.53, 292.7, 294.03, 297.2, 307.8, 291.5, 294.49, 309.2, 279.77, 281.09, 284.89], 'YTD': [106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 182.27, 174.53, 161.22, 167.57, 172, 179.35, 186.72, 228.99, 241.65, 260.52, 269.95, 322.05, 292.65, 279.22, 288.12, 293.6, 303.53, 291.5, 284.89], '6M': [109.16, 118.62, 133.76, 142.29, 152.31, 179.6, 197.63, 182.27, 174.53, 161.22, 167.57, 172, 179.35, 182.6, 230.94, 241.01, 252.76, 275.33, 309.39, 292.65, 279.22, 288.12, 293.6, 303.53, 291.5, 284.89], '1Y': [70.15, 72.14, 70.37, 73.67, 77.77, 78.75, 90.06, 86.57, 86.12, 87.92, 92.3, 99.41, 97.41, 101.6, 104.42, 105.73, 116.11, 128.09, 126.71, 121.07, 105.94, 100.03, 107.5, 115.02, 110.88, 112.88, 106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 197.63, 182.27, 174.53, 161.22, 167.57, 172, 179.35, 186.72, 228.99, 241.65, 260.52, 269.95, 322.05, 292.65, 279.22, 288.12, 293.6, 303.53, 291.5, 284.89] },
      velocityScore: { '1D': -1.1, '1W': -14.2, '1M': -45.3, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 55.6, revenueGrowth: 7, eps: 5.12, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { POW: 4.69, VOLT: 6.98, PBD: false, PBW: 1.87, IVEP: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 3, avgWeight: 4.4, proScore: 2.64, coverage: 0.6,
      price: 410.33, weeklyPrices: [404.59, 419.87, 402.68, 408.26, 410.33], weeklyChange: 1.42, dayChange: 0.51, sortRank: 0, periodReturns: { '1M': 2.4, 'YTD': 28.8, '6M': 27.9, '1Y': 14.9 },
      priceHistory: { '1D': [408.26, 410.88, 410.33], '1W': [404.59, 419.87, 402.68, 408.26, 410.33], '1M': [400.08, 417.62, 421.21, 418.61, 395.94, 403.14, 401.72, 375.46, 393.64, 391.39, 407.06, 407.71, 409.64, 421.77, 435.78, 405.28, 404.59, 419.87, 402.68, 408.26, 410.33], 'YTD': [318.51, 320.58, 333.46, 331.22, 351.42, 373.82, 389.25, 373.38, 375.92, 347.75, 355.4, 356.8, 357.36, 363.89, 403.36, 407.57, 416.77, 422.44, 419, 399.44, 391.35, 400.08, 403.14, 407.06, 405.28, 410.33], '6M': [320.86, 322.67, 331.14, 334.04, 354.37, 354.67, 390.33, 373.38, 375.92, 347.75, 355.4, 356.8, 357.36, 361.1, 403, 406.21, 423.92, 425.55, 401.51, 399.44, 391.35, 400.08, 403.14, 407.06, 405.28, 410.33], '1Y': [356.99, 356.98, 362.11, 372.65, 390.01, 356.45, 363.3, 353.5, 345.76, 343.75, 348.23, 371.19, 368.52, 374.25, 370.94, 374.35, 373.46, 376.01, 377.72, 367.91, 342.75, 330.43, 333.11, 341.76, 329.93, 322.81, 318.51, 320.58, 333.46, 331.22, 351.42, 373.82, 390.33, 373.38, 375.92, 347.75, 355.4, 356.8, 357.36, 363.89, 403.36, 407.57, 416.77, 422.44, 419, 399.44, 391.35, 400.08, 403.14, 407.06, 405.28, 410.33] },
      velocityScore: { '1D': 0, '1W': -2.6, '1M': -19.8, '6M': null }, isNew: false,
      marketCap: '$159B', pe: 40.2, revenueGrowth: 17, eps: 10.21, grossMargin: 37, dividendYield: 1.08,
      etfPresence: { POW: 3.99, VOLT: 5.24, PBD: false, PBW: false, IVEP: 3.98 },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 3, avgWeight: 4.05, proScore: 2.43, coverage: 0.6,
      price: 1110.66, weeklyPrices: [1057.65, 1085.47, 1045.17, 1102.51, 1110.66], weeklyChange: 5.01, dayChange: 0.83, sortRank: 0, periodReturns: { '1M': 14.7, 'YTD': 69.9, '6M': 68.4, '1Y': 109.9 },
      priceHistory: { '1D': [1101.5, 1106, 1110.66], '1W': [1057.65, 1085.47, 1045.17, 1102.51, 1110.66], '1M': [950.54, 969.67, 959.36, 963.33, 933.61, 933.85, 920.15, 867.09, 906.79, 940.66, 979.07, 982.35, 1048.86, 1109.73, 1127.59, 1034.98, 1057.65, 1085.47, 1045.17, 1102.51, 1110.66], 'YTD': [653.57, 628.4, 642.23, 657.78, 726.37, 779.35, 802.13, 830.34, 873.6, 789.23, 805.02, 851.07, 853.16, 897.36, 991.12, 990.18, 1120.23, 1073.95, 1073.08, 1049.23, 1038.74, 950.54, 933.85, 979.07, 1034.98, 1110.66], '6M': [659.64, 662.32, 644.18, 661.67, 717.39, 737.53, 816.56, 830.34, 873.6, 789.23, 805.02, 851.07, 853.16, 898.57, 991.32, 1002.75, 1149.19, 1062.95, 1040.15, 1049.23, 1038.74, 950.54, 933.85, 979.07, 1034.98, 1110.66], '1Y': [529.15, 530, 559.61, 548.99, 632.67, 649.72, 657.44, 625.02, 602.31, 579.68, 605.7, 617.91, 633.41, 614.9, 606.12, 644.41, 585.33, 570.98, 547.96, 576.08, 577.02, 580.49, 601.58, 625.3, 686.22, 661.45, 653.57, 628.4, 642.23, 657.78, 726.37, 779.35, 816.56, 830.34, 873.6, 789.23, 805.02, 851.07, 853.16, 897.36, 991.12, 990.18, 1120.23, 1073.95, 1073.08, 1049.23, 1038.74, 950.54, 933.85, 979.07, 1034.98, 1110.66] },
      velocityScore: { '1D': 4.3, '1W': -1.2, '1M': -5.8, '6M': null }, isNew: false,
      marketCap: '$298B', pe: 32.5, revenueGrowth: 16, eps: 34.18, grossMargin: 20, dividendYield: 0.18,
      etfPresence: { POW: 3.37, VOLT: 4.4, PBD: false, PBW: false, IVEP: 4.39 },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 3, avgWeight: 3.58, proScore: 2.15, coverage: 0.6,
      price: 87.6, weeklyPrices: [87.62, 87.70, 88.56, 88.66, 87.60], weeklyChange: -0.02, dayChange: -1.15, sortRank: 0, periodReturns: { '1M': 0.7, 'YTD': 9.1, '6M': 8.8, '1Y': 26.2 },
      priceHistory: { '1D': [88.61, 87.96, 87.6], '1W': [87.62, 87.7, 88.56, 88.66, 87.6], '1M': [83.66, 85.68, 84.58, 85.68, 85.84, 84.01, 84.83, 85.12, 84.84, 85.99, 86.12, 86.23, 85.73, 86.75, 86.08, 86.43, 87.62, 87.7, 88.56, 88.66, 87.6], 'YTD': [80.28, 79.49, 82.19, 84.81, 87.9, 89.47, 93.8, 92.18, 93.77, 91.02, 92.78, 89.5, 91.4, 92.73, 92.3, 92.01, 94.83, 95.51, 94.84, 93.36, 88.55, 83.66, 84.01, 86.12, 86.43, 87.6], '6M': [80.53, 78.37, 81.98, 85.07, 88.18, 89.21, 91.93, 92.18, 93.77, 91.02, 92.78, 89.5, 91.4, 93.15, 94.08, 91.98, 95.28, 96.95, 93.1, 93.36, 88.55, 83.66, 84.01, 86.12, 86.43, 87.6], '1Y': [69.42, 72.46, 74.7, 77.54, 71.95, 71.18, 71.86, 75.72, 75.32, 72.65, 70.07, 69.83, 72.32, 75.49, 83.21, 84.64, 83.99, 83.57, 81.69, 85.76, 85.75, 84.23, 84.58, 79.64, 81.32, 79.79, 80.28, 79.49, 82.19, 84.81, 87.9, 89.47, 91.93, 92.18, 93.77, 91.02, 92.78, 89.5, 91.4, 92.73, 92.3, 92.01, 94.83, 95.51, 94.84, 93.36, 88.55, 83.66, 84.01, 86.12, 86.43, 87.6] },
      velocityScore: { '1D': -0.9, '1W': 7, '1M': 0.5, '6M': null }, isNew: false,
      marketCap: '$183B', pe: 22.2, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.81,
      etfPresence: { POW: 2.05, VOLT: 5, PBD: false, PBW: false, IVEP: 3.7 },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 3, avgWeight: 3.27, proScore: 1.96, coverage: 0.6,
      price: 164.36, weeklyPrices: [167.55, 171.91, 162.92, 163.35, 164.36], weeklyChange: -1.9, dayChange: 0.61, sortRank: 0, periodReturns: { '1M': -1.6, 'YTD': 61.2, '6M': 59.6, '1Y': 124.4 },
      priceHistory: { '1D': [163.37, 164.2, 164.36], '1W': [167.55, 171.91, 162.92, 163.35, 164.36], '1M': [171.55, 173.39, 176.39, 173.88, 162.86, 163.81, 163.8, 156.79, 164.52, 165.84, 169, 167.34, 170.94, 177.02, 184.34, 168.37, 167.55, 171.91, 162.92, 163.35, 164.36], 'YTD': [101.97, 102.72, 107.98, 110.29, 112.26, 112.64, 113.25, 116.87, 118.36, 106.02, 109.93, 116.3, 116.98, 117.41, 133.16, 135.8, 141.71, 162.69, 173.39, 169.01, 164.66, 171.55, 163.81, 169, 168.37, 164.36], '6M': [103.01, 106.48, 104.54, 111.57, 115.62, 113.87, 111.9, 116.87, 118.36, 106.02, 109.93, 116.3, 116.98, 117.96, 130.56, 134.69, 142.17, 158.92, 169.95, 169.01, 164.66, 171.55, 163.81, 169, 168.37, 164.36], '1Y': [73.25, 74.2, 74.55, 74.63, 79.72, 89.73, 91.84, 89.41, 89.4, 89.48, 91.44, 96.2, 97.7, 98.64, 96, 99.51, 99.65, 104.22, 109.62, 109.59, 104.09, 104.1, 105.36, 107.42, 102.41, 103.97, 101.97, 102.72, 107.98, 110.29, 112.26, 112.64, 111.9, 116.87, 118.36, 106.02, 109.93, 116.3, 116.98, 117.41, 133.16, 135.8, 141.71, 162.69, 173.39, 169.01, 164.66, 171.55, 163.81, 169, 168.37, 164.36] },
      velocityScore: { '1D': -1.5, '1W': -7.5, '1M': -20.3, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 55.9, revenueGrowth: 54, eps: 2.94, grossMargin: 37, dividendYield: 0.51,
      etfPresence: { POW: 3.69, VOLT: 2.97, PBD: false, PBW: false, IVEP: 3.16 },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 3, avgWeight: 2.97, proScore: 1.78, coverage: 0.6,
      price: 515.41, weeklyPrices: [518.18, 536.04, 517.02, 514.71, 515.41], weeklyChange: -0.53, dayChange: 0.16, sortRank: 0, periodReturns: { '1M': 8.8, 'YTD': 16.1, '6M': 15.4, '1Y': 26.2 },
      priceHistory: { '1D': [514.61, 515.79, 515.41], '1W': [518.18, 536.04, 517.02, 514.71, 515.41], '1M': [462.93, 480.46, 484.91, 485.27, 476.82, 485.03, 486.47, 467.59, 469.32, 476.89, 489.73, 502.65, 508.87, 523.69, 539.39, 509.96, 518.18, 536.04, 517.02, 514.71, 515.41], 'YTD': [444.11, 460.87, 484.11, 485.53, 487.94, 503.8, 524.12, 526.73, 511.63, 471.54, 467.38, 475.74, 480.97, 499.2, 539.79, 546.23, 555.34, 516, 490.16, 479.97, 475.01, 462.93, 485.03, 489.73, 509.96, 515.41], '6M': [446.61, 468.2, 476.06, 484.06, 497.97, 487.4, 516.02, 526.73, 511.63, 471.54, 467.38, 475.74, 480.97, 494.25, 536.01, 535.57, 553.07, 508.43, 492.58, 479.97, 475.01, 462.93, 485.03, 489.73, 509.96, 515.41], '1Y': [408.41, 412.5, 414.86, 428.55, 427.33, 427.67, 432.14, 432.22, 437.56, 430.15, 437.24, 435.44, 435.23, 430.31, 412.93, 427.43, 435.29, 455.34, 459.44, 450.12, 420.57, 424.08, 427.48, 438.7, 438.42, 455.92, 444.11, 460.87, 484.11, 485.53, 487.94, 503.8, 516.02, 526.73, 511.63, 471.54, 467.38, 475.74, 480.97, 499.2, 539.79, 546.23, 555.34, 516, 490.16, 479.97, 475.01, 462.93, 485.03, 489.73, 509.96, 515.41] },
      velocityScore: { '1D': -12.3, '1W': -2.2, '1M': -16.4, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 30.4, revenueGrowth: 11, eps: 16.93, grossMargin: 36, dividendYield: 1.1,
      etfPresence: { POW: 2.88, VOLT: 3.41, PBD: false, PBW: false, IVEP: 2.61 },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'NRG', name: 'NRG Energy Inc', easyScore: 3, avgWeight: 1.38, proScore: 0.83, coverage: 0.6,
      price: 148.14, weeklyPrices: [142.21, 147.11, 149.36, 149.11, 148.14], weeklyChange: 4.17, dayChange: -0.64, sortRank: 0, periodReturns: { '1M': 10.5, 'YTD': -7, '6M': -7.7, '1Y': -7.7 },
      priceHistory: { '1D': [149.09, 148.21, 148.14], '1W': [142.21, 147.11, 149.36, 149.11, 148.14], '1M': [129.47, 133.51, 133.76, 133.39, 129.2, 127.71, 129.96, 120.65, 123.7, 125.47, 130.4, 132.1, 132.13, 135.06, 138.91, 137.66, 142.21, 147.11, 149.36, 149.11, 148.14], 'YTD': [159.24, 143.53, 158.5, 149.3, 152.63, 153.32, 172.35, 179.18, 178.96, 154.32, 152.87, 145.8, 147.74, 149.8, 170.24, 157.18, 160.15, 154.82, 137.3, 127.81, 137.65, 129.47, 127.71, 130.4, 137.66, 148.14], '6M': [160.43, 148.91, 149.83, 151.09, 153.72, 144.44, 161.8, 179.18, 178.96, 154.32, 152.87, 145.8, 147.74, 152.69, 164.07, 167.73, 159.81, 153.37, 138.11, 127.81, 137.65, 129.47, 127.71, 130.4, 137.66, 148.14], '1Y': [160.58, 151.27, 146.88, 153.96, 159.87, 171.96, 156.69, 150.44, 144.77, 145.11, 152.26, 164.22, 167.43, 161.95, 162.61, 165.61, 163.59, 172.76, 167.99, 162.84, 163.21, 166.85, 164.08, 166.75, 160.15, 158.11, 159.24, 143.53, 158.5, 149.3, 152.63, 153.32, 161.8, 179.18, 178.96, 154.32, 152.87, 145.8, 147.74, 149.8, 170.24, 157.18, 160.15, 154.82, 137.3, 127.81, 137.65, 129.47, 127.71, 130.4, 137.66, 148.14] },
      velocityScore: { '1D': -1.2, '1W': 29.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$31B', pe: 162.8, revenueGrowth: 20, eps: 0.91, grossMargin: 16, dividendYield: 1.27,
      etfPresence: { POW: 0.54, VOLT: 1.05, PBD: false, PBW: false, IVEP: 2.56 },
      tonyNote: 'NRG Energy Inc appears in 3 of 5 Electrification ETFs (60% coverage) with average weight 1.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, avgWeight: 5.99, proScore: 2.39, coverage: 0.4,
      price: 310.11, weeklyPrices: [294.15, 310.32, 310.64, 315.65, 310.11], weeklyChange: 5.43, dayChange: -1.76, sortRank: 0, periodReturns: { '1M': 13, 'YTD': 82.8, '6M': 79.3, '1Y': 217.4 },
      priceHistory: { '1D': [315.65, 311.79, 310.11], '1W': [294.15, 310.32, 310.64, 315.65, 310.11], '1M': [269.86, 269.22, 280.09, 276.54, 262.56, 279.13, 276.04, 276.95, 296.55, 293.87, 302.15, 293.22, 299.84, 296.39, 304.33, 288.64, 294.15, 310.32, 310.64, 315.65, 310.11], 'YTD': [169.63, 180.24, 196.61, 196.5, 201.19, 220.78, 232.84, 235.04, 229.71, 191.87, 197.65, 204.09, 203.53, 206.9, 237.93, 254.38, 250.96, 286.69, 302.73, 256.72, 270.01, 269.86, 279.13, 302.15, 288.64, 310.11], '6M': [172.95, 181.03, 192.96, 200.29, 210.44, 208, 231.48, 235.04, 229.71, 191.87, 197.65, 204.09, 203.53, 204.65, 235.73, 254.25, 276.65, 283.6, 297.98, 256.72, 270.01, 269.86, 279.13, 302.15, 288.64, 310.11], '1Y': [97.69, 101.2, 98.24, 106, 130.49, 131.71, 134.66, 131.57, 137.03, 135.97, 143.15, 148.78, 146.79, 141.02, 141.25, 147.14, 148, 154.78, 154.25, 152.12, 141.86, 145.88, 161.55, 167.43, 171.76, 177.23, 169.63, 180.24, 196.61, 196.5, 201.19, 220.78, 231.48, 235.04, 229.71, 191.87, 197.65, 204.09, 203.53, 206.9, 237.93, 254.38, 250.96, 286.69, 302.73, 256.72, 270.01, 269.86, 279.13, 302.15, 288.64, 310.11] },
      velocityScore: { '1D': 0, '1W': 8.6, '1M': -35.9, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 74.9, revenueGrowth: 17, eps: 4.14, grossMargin: 39, dividendYield: 0.09,
      etfPresence: { POW: 3.83, VOLT: 8.14, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, avgWeight: 3.54, proScore: 1.41, coverage: 0.4,
      price: 136.31, weeklyPrices: [134.96, 137.00, 138.69, 137.97, 136.31], weeklyChange: 1, dayChange: -1.2, sortRank: 0, periodReturns: { '1M': 7.6, 'YTD': 18.2, '6M': 17.5, '1Y': 31.4 },
      priceHistory: { '1D': [137.97, 136.74, 136.31], '1W': [134.96, 137, 138.69, 137.97, 136.31], '1M': [123.79, 127.11, 126.31, 127.79, 129.14, 126.77, 127.76, 128.53, 128.48, 129.23, 129.31, 129.75, 128.27, 127.69, 130.3, 133.74, 134.96, 137, 138.69, 137.97, 136.31], 'YTD': [115.31, 115.93, 119.4, 116.63, 119.78, 120.8, 129.94, 129.37, 133.82, 131.87, 133.61, 125.66, 130.1, 132.36, 134.46, 133.28, 135.07, 134.66, 130.7, 125.15, 131.59, 123.79, 126.77, 129.31, 133.74, 136.31], '6M': [115.99, 113.7, 118.11, 117.18, 119.21, 120.61, 126.43, 129.37, 133.82, 131.87, 133.61, 125.66, 130.1, 132.68, 136.3, 133.66, 134.73, 136.91, 130.16, 125.15, 131.59, 123.79, 126.77, 129.31, 133.74, 136.31], '1Y': [103.76, 103.96, 104.4, 110.16, 109.22, 113.24, 111.99, 110.7, 113.01, 110.09, 108.36, 106.84, 108.14, 112.5, 118.16, 118.38, 117.43, 115.11, 120.3, 122.73, 123.72, 122.04, 119.23, 116.07, 114.57, 115.15, 115.31, 115.93, 119.4, 116.63, 119.78, 120.8, 126.43, 129.37, 133.82, 131.87, 133.61, 125.66, 130.1, 132.36, 134.46, 133.28, 135.07, 134.66, 130.7, 125.15, 131.59, 123.79, 126.77, 129.31, 133.74, 136.31] },
      velocityScore: { '1D': -2.1, '1W': 31.8, '1M': -27.7, '6M': null }, isNew: false,
      marketCap: '$74B', pe: 20.2, revenueGrowth: 10, eps: 6.76, grossMargin: 47, dividendYield: 2.75,
      etfPresence: { POW: 2.69, VOLT: 4.38, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 2, avgWeight: 3.18, proScore: 1.27, coverage: 0.4,
      price: 312.51, weeklyPrices: [316.43, 325.57, 303.95, 306.97, 312.51], weeklyChange: -1.24, dayChange: 1.79, sortRank: 0, periodReturns: { '1M': -1, 'YTD': 92.9, '6M': 90.2, '1Y': 143.4 },
      priceHistory: { '1D': [307.01, 310.4, 312.51], '1W': [316.43, 325.57, 303.95, 306.97, 312.51], '1M': [323.39, 334.49, 331.44, 323.92, 300.51, 300.57, 289.52, 280.98, 297.88, 302.87, 311.93, 299.6, 317.58, 333.05, 357.96, 318.32, 316.43, 325.57, 303.95, 306.97, 312.51], 'YTD': [162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 234.53, 243.75, 254.89, 241.78, 258.88, 255.88, 251.07, 258.73, 299.96, 314.41, 322.43, 330.97, 367.92, 370.94, 327.46, 323.39, 300.57, 311.93, 318.32, 312.51], '6M': [164.34, 171.54, 170.86, 181.12, 195.1, 177.75, 236.51, 243.75, 254.89, 241.78, 258.88, 255.88, 251.07, 261.29, 295.11, 307.34, 323.46, 328.31, 339.97, 370.94, 327.46, 323.39, 300.57, 311.93, 318.32, 312.51], '1Y': [128.41, 125.89, 127.37, 125.29, 142.7, 138.76, 143.72, 135.69, 125.02, 124.01, 125.58, 136.65, 142.61, 150.86, 158.87, 175.15, 174.8, 190.57, 180.82, 179.05, 166.65, 168.91, 180.91, 178.38, 160.66, 166.26, 162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 236.51, 243.75, 254.89, 241.78, 258.88, 255.88, 251.07, 258.73, 299.96, 314.41, 322.43, 330.97, 367.92, 370.94, 327.46, 323.39, 300.57, 311.93, 318.32, 312.51] },
      velocityScore: { '1D': 0, '1W': -9.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$120B', pe: 78.3, revenueGrowth: 30, eps: 3.99, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 2.36, PBD: false, PBW: false, IVEP: 3.99 },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'APH', name: 'Amphenol Corp', easyScore: 2, avgWeight: 2.74, proScore: 1.1, coverage: 0.4,
      price: 169.71, weeklyPrices: [162.78, 165.15, 163.72, 166.42, 169.71], weeklyChange: 4.25, dayChange: 1.99, sortRank: 0, periodReturns: { '1M': 14.1, 'YTD': 25.6, '6M': 24.6, '1Y': 71.9 },
      priceHistory: { '1D': [166.4, 168.79, 169.71], '1W': [162.78, 165.15, 163.72, 166.42, 169.71], '1M': [146.34, 148.4, 147.62, 146.77, 138.81, 143.6, 154.07, 149.22, 152.46, 153.8, 158.59, 158.81, 161.11, 163.96, 165.96, 158.7, 162.78, 165.15, 163.72, 166.42, 169.71], 'YTD': [135.14, 136.25, 154.22, 150.99, 144.08, 136.23, 146.72, 151.04, 146.06, 131.87, 133.92, 126.74, 123.62, 126.49, 145.27, 152.81, 148.64, 141.03, 122.47, 125, 132.06, 146.34, 143.6, 158.59, 158.7, 169.71], '6M': [136.2, 138.91, 146.75, 152.5, 149.58, 127.63, 143.73, 151.04, 146.06, 131.87, 133.92, 126.74, 123.62, 128, 140.75, 151.06, 149.71, 142.3, 128.03, 125, 132.06, 146.34, 143.6, 158.59, 158.7, 169.71], '1Y': [98.75, 97.41, 99.44, 101.78, 105.31, 107.93, 111.85, 111.06, 109.73, 109.25, 116.79, 119.04, 125.4, 123.75, 124.53, 122.64, 124.44, 137.29, 136.7, 143.47, 132.33, 137.88, 141.49, 138.58, 129.13, 137.12, 135.14, 136.25, 154.22, 150.99, 144.08, 136.23, 143.73, 151.04, 146.06, 131.87, 133.92, 126.74, 123.62, 126.49, 145.27, 152.81, 148.64, 141.03, 122.47, 125, 132.06, 146.34, 143.6, 158.59, 158.7, 169.71] },
      velocityScore: { '1D': 0.9, '1W': null, '1M': -38.9, '6M': null }, isNew: false,
      marketCap: '$209B', pe: 48.8, revenueGrowth: 58, eps: 3.48, grossMargin: 38, dividendYield: 0.6,
      etfPresence: { POW: 1.02, VOLT: 4.46, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, avgWeight: 2.66, proScore: 1.06, coverage: 0.4,
      price: 360.58, weeklyPrices: [359.61, 375.15, 348.11, 348.15, 360.58], weeklyChange: 0.27, dayChange: 3.57, sortRank: 0, periodReturns: { '1M': 19.3, 'YTD': 72.2, '6M': 69, '1Y': 172.1 },
      priceHistory: { '1D': [348.15, 361.3, 360.58], '1W': [359.61, 375.15, 348.11, 348.15, 360.58], '1M': [294.65, 312.28, 322.5, 320.92, 294.81, 306.11, 311.64, 308.17, 340.4, 354.37, 370.66, 350.45, 353.32, 372.59, 388.23, 364.96, 359.61, 375.15, 348.11, 348.15, 360.58], 'YTD': [209.37, 210.99, 257.29, 262.19, 255.36, 273.26, 314.27, 331.23, 335.57, 290.78, 302.02, 317.21, 310.76, 331.9, 378.94, 380.22, 385.68, 387.03, 354.97, 323.46, 324.86, 294.65, 306.11, 370.66, 364.96, 360.58], '6M': [213.41, 224.4, 237.9, 275.57, 269.12, 257.64, 312.95, 331.23, 335.57, 290.78, 302.02, 317.21, 310.76, 332.31, 379.64, 375.6, 387.24, 389.05, 357.24, 323.46, 324.86, 294.65, 306.11, 370.66, 364.96, 360.58], '1Y': [132.5, 138.07, 139.1, 140.68, 142.21, 139.58, 158.81, 153.23, 153.01, 145.49, 154.76, 158.03, 176.59, 170.14, 173.09, 182.75, 196.58, 204.62, 195.05, 215.98, 198.54, 206.04, 210.94, 221.27, 215.16, 217.51, 209.37, 210.99, 257.29, 262.19, 255.36, 273.26, 312.95, 331.23, 335.57, 290.78, 302.02, 317.21, 310.76, 331.9, 378.94, 380.22, 385.68, 387.03, 354.97, 323.46, 324.86, 294.65, 306.11, 370.66, 364.96, 360.58] },
      velocityScore: { '1D': -1.9, '1W': 15.2, '1M': -37.3, '6M': null }, isNew: false,
      marketCap: '$14B', pe: 75, revenueGrowth: 26, eps: 4.81, grossMargin: 39, dividendYield: 0.11,
      etfPresence: { POW: 1.05, VOLT: 4.27, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 2.63, proScore: 1.05, coverage: 0.4,
      price: 74.92, weeklyPrices: [75.87, 77.53, 77.92, 75.06, 74.92], weeklyChange: -1.25, dayChange: -0.17, sortRank: 0, periodReturns: { '1M': 4.9, 'YTD': 24.6, '6M': 24.5, '1Y': 19.3 },
      priceHistory: { '1D': [75.05, 75.09, 74.92], '1W': [75.87, 77.53, 77.92, 75.06, 74.92], '1M': [70.04, 71.31, 71.66, 72.43, 71.96, 71.59, 71.59, 72.26, 71.62, 72.08, 71.49, 71.48, 71.25, 73.12, 74.95, 75.79, 75.87, 77.53, 77.92, 75.06, 74.92], 'YTD': [60.11, 61.15, 60.29, 64.96, 67.26, 66.92, 72.28, 72.98, 74.72, 74.24, 73.34, 72.41, 73.58, 72.59, 71.54, 70.91, 71.61, 75.41, 74.18, 77.72, 78.47, 70.04, 71.59, 71.49, 75.79, 74.92], '6M': [60.16, 60.39, 60.71, 63.72, 67.24, 67.42, 71.13, 72.98, 74.72, 74.24, 73.34, 72.41, 73.58, 72, 72.74, 71.15, 72.18, 75.54, 71.96, 77.72, 78.47, 70.04, 71.59, 71.49, 75.79, 74.92], '1Y': [62.81, 57.69, 58.37, 57.36, 58.89, 59, 57.76, 56.52, 56.83, 57.38, 57.57, 57.95, 61.39, 63.35, 63.97, 62.36, 62.34, 57.59, 56.51, 60.6, 59.91, 59.43, 60.21, 61.55, 58.41, 59.75, 60.11, 61.15, 60.29, 64.96, 67.26, 66.92, 71.13, 72.98, 74.72, 74.24, 73.34, 72.41, 73.58, 72.59, 71.54, 70.91, 71.61, 75.41, 74.18, 77.72, 78.47, 70.04, 71.59, 71.49, 75.79, 74.92] },
      velocityScore: { '1D': -4.5, '1W': 5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$92B', pe: 32.9, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.8,
      etfPresence: { POW: false, VOLT: 1.52, PBD: false, PBW: false, IVEP: 3.73 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'JCI', name: 'JOHNSON CONTROLS INTERNATIONAL PLC', easyScore: 2, avgWeight: 2.45, proScore: 0.98, coverage: 0.4,
      price: 142.1, weeklyPrices: [142.81, 145.49, 138.40, 140.47, 142.10], weeklyChange: -0.5, dayChange: 1.18, sortRank: 0, periodReturns: { '1M': 6, 'YTD': 18.7, '6M': 17.5, '1Y': 34.5 },
      priceHistory: { '1D': [140.44, 142.09, 142.1], '1W': [142.81, 145.49, 138.4, 140.47, 142.1], '1M': [133.91, 141.99, 146.96, 147.4, 143.65, 144.05, 147.75, 139.36, 144.01, 144.96, 146.06, 145.17, 143.62, 144.82, 148.21, 141.28, 142.81, 145.49, 138.4, 140.47, 142.1], 'YTD': [119.75, 111.29, 112.95, 113.59, 119.26, 137.65, 139.24, 143.79, 144.3, 132.4, 130.16, 129.7, 131.29, 133.75, 142.82, 140.98, 143.38, 144.4, 141.78, 143.08, 138.36, 133.91, 144.05, 146.06, 141.28, 142.1], '6M': [120.94, 112.41, 112.13, 114.51, 120.28, 132.52, 138.57, 143.79, 144.3, 132.4, 130.16, 129.7, 131.29, 132.97, 142.53, 140.87, 141.92, 145.08, 139.52, 143.08, 138.36, 133.91, 144.05, 146.06, 141.28, 142.1], '1Y': [105.62, 105.5, 106.02, 108.3, 103.24, 104.84, 106.64, 105.71, 106.4, 105.96, 106.29, 106.96, 108.29, 109.95, 108.31, 107.85, 111.18, 112.21, 111.04, 121.94, 116.38, 114.19, 115.28, 115.77, 118.85, 121.13, 119.75, 111.29, 112.95, 113.59, 119.26, 137.65, 138.57, 143.79, 144.3, 132.4, 130.16, 129.7, 131.29, 133.75, 142.82, 140.98, 143.38, 144.4, 141.78, 143.08, 138.36, 133.91, 144.05, 146.06, 141.28, 142.1] },
      velocityScore: { '1D': 1, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$87B', pe: 43.5, revenueGrowth: 8, eps: 3.27, grossMargin: 37, dividendYield: 1.14,
      etfPresence: { POW: false, VOLT: 1.37, PBD: false, PBW: false, IVEP: 3.53 },
      tonyNote: 'JOHNSON CONTROLS INTERNATIONAL PLC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VST', name: 'Vistra Corp', easyScore: 2, avgWeight: 2.37, proScore: 0.95, coverage: 0.4,
      price: 161.5, weeklyPrices: [162.87, 167.77, 163.49, 162.38, 161.50], weeklyChange: -0.84, dayChange: -0.6, sortRank: 0, periodReturns: { '1M': 0.8, 'YTD': 0.1, '6M': -0.7, '1Y': -16.7 },
      priceHistory: { '1D': [162.47, 161.89, 161.5], '1W': [162.87, 167.77, 163.49, 162.38, 161.5], '1M': [154.76, 157.97, 153.8, 153.7, 148.76, 146.9, 146.22, 138.54, 146.38, 148.02, 153.52, 158.61, 158.83, 163.75, 167.26, 162.39, 162.87, 167.77, 163.49, 162.38, 161.5], 'YTD': [161.33, 150.6, 180.18, 160.12, 158.35, 149.65, 171.49, 171.4, 173.89, 158.65, 158.95, 146.02, 155.48, 151.59, 158.2, 159.6, 166.58, 160.85, 152.05, 139.68, 156.27, 154.76, 146.9, 153.52, 162.39, 161.5], '6M': [162.62, 154.6, 168.97, 160.36, 162.58, 143.07, 163.1, 171.4, 173.89, 158.65, 158.95, 146.02, 155.48, 151.18, 154.73, 163.46, 164.35, 155.28, 147.72, 139.68, 156.27, 154.76, 146.9, 153.52, 162.39, 161.5], '1Y': [193.81, 190.18, 191.37, 189.09, 198, 209.6, 209.56, 198.96, 190.08, 185.81, 193.78, 209.43, 204.24, 195.92, 199.62, 205.51, 186.52, 190.59, 185.74, 179.16, 175, 175.14, 172.55, 164.81, 173.45, 161.67, 161.33, 150.6, 180.18, 160.12, 158.35, 149.65, 163.1, 171.4, 173.89, 158.65, 158.95, 146.02, 155.48, 151.59, 158.2, 159.6, 166.58, 160.85, 152.05, 139.68, 156.27, 154.76, 146.9, 153.52, 162.39, 161.5] },
      velocityScore: { '1D': -2.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$54B', pe: 27, revenueGrowth: 43, eps: 5.98, grossMargin: 39, dividendYield: 0.56,
      etfPresence: { POW: 1.43, VOLT: false, PBD: false, PBW: false, IVEP: 3.32 },
      tonyNote: 'Vistra Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CEG', name: 'Constellation Energy Corp', easyScore: 2, avgWeight: 2.28, proScore: 0.91, coverage: 0.4,
      price: 254.19, weeklyPrices: [267.97, 268.69, 264.02, 259.32, 254.19], weeklyChange: -5.14, dayChange: -1.98, sortRank: 0, periodReturns: { '1M': -11.7, 'YTD': -28, '6M': -28.8, '1Y': -21.2 },
      priceHistory: { '1D': [259.32, 254.14, 254.19], '1W': [267.97, 268.69, 264.02, 259.32, 254.19], '1M': [265.7, 272.65, 267.24, 264.59, 254.83, 250.67, 251.65, 242.3, 246.71, 253.76, 262.35, 268, 267.17, 274.06, 275.53, 270.26, 267.97, 268.69, 264.02, 259.32, 254.19], 'YTD': [353.27, 322.54, 341.2, 289.06, 280.68, 261.42, 288.43, 294.84, 329.88, 319.06, 301.77, 281.99, 301.49, 275.16, 291.72, 287.56, 315.17, 321.05, 299.69, 267.2, 294.07, 265.7, 250.67, 262.35, 270.26, 254.19], '6M': [357.12, 338.63, 330.38, 287.35, 287.45, 247.06, 276.12, 294.84, 329.88, 319.06, 301.77, 281.99, 301.49, 272.82, 286.5, 296.21, 313.53, 307.81, 303.63, 267.2, 294.07, 265.7, 250.67, 262.35, 270.26, 254.19], '1Y': [322.76, 312.84, 317.99, 317.79, 330.52, 343.57, 338.57, 322.77, 310.68, 307.19, 300.82, 322.91, 336.65, 329.07, 358.16, 389.56, 358.79, 384.95, 362.82, 351.67, 338.67, 354.11, 363.67, 359.15, 365.63, 361.33, 353.27, 322.54, 341.2, 289.06, 280.68, 261.42, 276.12, 294.84, 329.88, 319.06, 301.77, 281.99, 301.49, 275.16, 291.72, 287.56, 315.17, 321.05, 299.69, 267.2, 294.07, 265.7, 250.67, 262.35, 270.26, 254.19] },
      velocityScore: { '1D': -3.2, '1W': -3.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$91B', pe: 22.1, revenueGrowth: 64, eps: 11.51, grossMargin: 23, dividendYield: 0.66,
      etfPresence: { POW: 1.23, VOLT: false, PBD: false, PBW: false, IVEP: 3.33 },
      tonyNote: 'Constellation Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TLN', name: 'Talen Energy Corp', easyScore: 2, avgWeight: 2.26, proScore: 0.9, coverage: 0.4,
      price: 401.09, weeklyPrices: [405.89, 416.80, 404.09, 399.34, 401.09], weeklyChange: -1.18, dayChange: 0.44, sortRank: 0, periodReturns: { '1M': 3.7, 'YTD': 7, '6M': 5.8, '1Y': 37.9 },
      priceHistory: { '1D': [399.34, 401.35, 401.09], '1W': [405.89, 416.8, 404.09, 399.34, 401.09], '1M': [377.2, 385.51, 379.59, 378.08, 364.74, 364.78, 358.74, 336.59, 344.8, 360.54, 386.21, 406.51, 409.81, 436.29, 438.12, 411.92, 405.89, 416.8, 404.09, 399.34, 401.09], 'YTD': [374.84, 356, 419.07, 366.43, 348.36, 345, 376.7, 382.25, 370.97, 320.56, 316.14, 302.97, 324.54, 324.09, 326.08, 346.26, 369.67, 384.64, 383.44, 334.24, 372.45, 377.2, 364.78, 386.21, 411.92, 401.09], '6M': [378.97, 374.71, 374.83, 379.86, 362.2, 324.63, 367.81, 382.25, 370.97, 320.56, 316.14, 302.97, 324.54, 327.58, 321.33, 365.35, 364.32, 372.16, 386.37, 334.24, 372.45, 377.2, 364.78, 386.21, 411.92, 401.09], '1Y': [290.77, 277.46, 268.15, 313.58, 361.21, 384.27, 380.61, 376.89, 355.53, 375.15, 389.43, 409.6, 423.13, 425.38, 431.04, 417.75, 382.09, 394, 395.25, 374.55, 368.65, 380.49, 367.96, 348.38, 376.77, 380.75, 374.84, 356, 419.07, 366.43, 348.36, 345, 367.81, 382.25, 370.97, 320.56, 316.14, 302.97, 324.54, 324.09, 326.08, 346.26, 369.67, 384.64, 383.44, 334.24, 372.45, 377.2, 364.78, 386.21, 411.92, 401.09] },
      velocityScore: { '1D': -2.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: null, revenueGrowth: 97, eps: -0.52, grossMargin: 40, dividendYield: null,
      etfPresence: { POW: 1.69, VOLT: false, PBD: false, PBW: false, IVEP: 2.82 },
      tonyNote: 'Talen Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SO', name: 'Southern Co/The', easyScore: 2, avgWeight: 2.04, proScore: 0.82, coverage: 0.4,
      price: 95.44, weeklyPrices: [95.78, 95.91, 97.16, 96.75, 95.44], weeklyChange: -0.36, dayChange: -1.34, sortRank: 0, periodReturns: { '1M': 3.7, 'YTD': 9.4, '6M': 9, '1Y': 3.9 },
      priceHistory: { '1D': [96.73, 95.55, 95.44], '1W': [95.78, 95.91, 97.16, 96.75, 95.44], '1M': [89.03, 90.51, 90.49, 91.62, 92.6, 91.28, 92.95, 94.02, 93.27, 94, 93.82, 94.31, 92.53, 93.09, 93.43, 94.93, 95.78, 95.91, 97.16, 96.75, 95.44], 'YTD': [87.2, 87.22, 88.78, 87.54, 89.31, 90.08, 94.95, 94.3, 97.38, 97.48, 98.01, 93.39, 95.55, 96.94, 95.93, 93.51, 93.77, 95.99, 93.1, 92.55, 94.55, 89.03, 91.28, 93.82, 94.93, 95.44], '6M': [87.57, 86.27, 88.42, 87.51, 89.14, 91.08, 92.56, 94.3, 97.38, 97.48, 98.01, 93.39, 95.55, 97.45, 97.15, 94.51, 93.49, 96.71, 91.8, 92.55, 94.55, 89.03, 91.28, 93.82, 94.93, 95.44], '1Y': [91.83, 91.26, 92.47, 95.85, 95.2, 94.39, 93.96, 92.85, 93.13, 92.09, 91.21, 91.36, 93.72, 94.77, 96.42, 99.68, 97, 93.91, 92.73, 91.14, 90.58, 89.14, 89.04, 85.49, 85.71, 86.39, 87.2, 87.22, 88.78, 87.54, 89.31, 90.08, 92.56, 94.3, 97.38, 97.48, 98.01, 93.39, 95.55, 96.94, 95.93, 93.51, 93.77, 95.99, 93.1, 92.55, 94.55, 89.03, 91.28, 93.82, 94.93, 95.44] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$108B', pe: 24.4, revenueGrowth: 8, eps: 3.91, grossMargin: 48, dividendYield: 3.14,
      etfPresence: { POW: 0.31, VOLT: false, PBD: false, PBW: false, IVEP: 3.78 },
      tonyNote: 'Southern Co/The appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 5.23, proScore: 2.09, coverage: 0.4,
      price: 1041.98, weeklyPrices: [994.45, 1057.01, 997.47, 1033.19, 1041.98], weeklyChange: 4.78, dayChange: 0.91, sortRank: 0, periodReturns: { '1M': 19, 'YTD': 81.9, '6M': 80.5, '1Y': 168.4 },
      priceHistory: { '1D': [1032.6, 1038.65, 1041.98], '1W': [994.45, 1057.01, 997.47, 1033.19, 1041.98], '1M': [865.36, 909.81, 926.18, 940.48, 904.28, 915.64, 914.7, 856.16, 897.63, 910.57, 933.93, 945.46, 955.92, 985.82, 1022.28, 984.24, 994.45, 1057.01, 997.47, 1033.19, 1041.98], 'YTD': [572.87, 608.13, 647.18, 626.62, 657.36, 726.2, 774.2, 759.74, 742.83, 680.9, 693.99, 680.88, 695.4, 721.24, 791.73, 798.4, 828.79, 874.78, 926.79, 888.31, 879.89, 865.36, 915.64, 933.93, 984.24, 1041.98], '6M': [577.39, 596.52, 638.75, 648.41, 665.24, 678.31, 758.29, 759.74, 742.83, 680.9, 693.99, 680.88, 695.4, 717.22, 790.66, 794.65, 830.79, 889.67, 897.45, 888.31, 879.89, 865.36, 915.64, 933.93, 984.24, 1041.98], '1Y': [388.21, 394.29, 404.64, 417.19, 430.05, 434.23, 412.71, 412.64, 432.3, 416.05, 418.09, 440.67, 471.26, 477.15, 486.71, 527.47, 524.65, 524.47, 547.58, 567.93, 552.05, 559.6, 582.47, 594.36, 588.93, 582.42, 572.87, 608.13, 647.18, 626.62, 657.36, 726.2, 758.29, 759.74, 742.83, 680.9, 693.99, 680.88, 695.4, 721.24, 791.73, 798.4, 828.79, 874.78, 926.79, 888.31, 879.89, 865.36, 915.64, 933.93, 984.24, 1041.98] },
      velocityScore: { '1D': 0, '1W': 1, '1M': -32.4, '6M': null }, isNew: false,
      marketCap: '$480B', pe: 52, revenueGrowth: 22, eps: 20.04, grossMargin: 29, dividendYield: 0.63,
      etfPresence: { AIRR: false, PRN: 3.57, RSHO: 6.89, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 4.98, proScore: 1.99, coverage: 0.4,
      price: 805.99, weeklyPrices: [867.23, 881.92, 804.76, 813.77, 805.99], weeklyChange: -7.06, dayChange: -0.96, sortRank: 0, periodReturns: { '1M': -6.4, 'YTD': 163.2, '6M': 162, '1Y': 249.3 },
      priceHistory: { '1D': [813.77, 799, 805.99], '1W': [867.23, 881.92, 804.76, 813.77, 805.99], '1M': [845.39, 875.52, 957.03, 993.74, 882.43, 891.86, 842.01, 770.25, 838.55, 858.99, 866.67, 857.76, 838.21, 861.88, 932.75, 892.25, 867.23, 881.92, 804.76, 813.77, 805.99], 'YTD': [306.23, 297.62, 336.31, 351.39, 357.91, 401.29, 437.77, 435.5, 428.13, 395.11, 398.12, 401.61, 420.24, 393.71, 459.02, 472.9, 505.45, 529.49, 868.18, 848.84, 732.94, 845.39, 891.86, 866.67, 892.25, 805.99], '6M': [307.68, 312.24, 319.27, 364.25, 379.23, 365.07, 431.43, 435.5, 428.13, 395.11, 398.12, 401.61, 420.24, 416.34, 446.36, 463.65, 497.18, 532.67, 844.8, 848.84, 732.94, 845.39, 891.86, 866.67, 892.25, 805.99], '1Y': [230.73, 227.02, 238.4, 242.01, 264.08, 296.58, 308.4, 283.2, 286.49, 276.91, 286.69, 319.38, 371.84, 339.68, 348.57, 361.44, 364.32, 379.89, 382.57, 381.22, 332.82, 342.44, 327.78, 324.1, 319.13, 315.87, 306.23, 297.62, 336.31, 351.39, 357.91, 401.29, 431.43, 435.5, 428.13, 395.11, 398.12, 401.61, 420.24, 393.71, 459.02, 472.9, 505.45, 529.49, 868.18, 848.84, 732.94, 845.39, 891.86, 866.67, 892.25, 805.99] },
      velocityScore: { '1D': -0.5, '1W': -11.2, '1M': -41.6, '6M': null }, isNew: false,
      marketCap: '$25B', pe: 71.8, revenueGrowth: 92, eps: 11.23, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 5.88, PRN: 4.08, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 4.9, proScore: 1.96, coverage: 0.4,
      price: 284.89, weeklyPrices: [294.49, 309.20, 279.77, 281.09, 284.89], weeklyChange: -3.26, dayChange: 1.35, sortRank: 0, periodReturns: { '1M': 0.2, 'YTD': 168.1, '6M': 161, '1Y': 306.1 },
      priceHistory: { '1D': [281.09, 282.37, 284.89], '1W': [294.49, 309.2, 279.77, 281.09, 284.89], '1M': [288.12, 299.07, 299.73, 300.06, 284.87, 293.6, 283.51, 262.34, 290.5, 294.75, 303.53, 292.7, 294.03, 297.2, 307.8, 291.5, 294.49, 309.2, 279.77, 281.09, 284.89], 'YTD': [106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 182.27, 174.53, 161.22, 167.57, 172, 179.35, 186.72, 228.99, 241.65, 260.52, 269.95, 322.05, 292.65, 279.22, 288.12, 293.6, 303.53, 291.5, 284.89], '6M': [109.16, 118.62, 133.76, 142.29, 152.31, 179.6, 197.63, 182.27, 174.53, 161.22, 167.57, 172, 179.35, 182.6, 230.94, 241.01, 252.76, 275.33, 309.39, 292.65, 279.22, 288.12, 293.6, 303.53, 291.5, 284.89], '1Y': [70.15, 72.14, 70.37, 73.67, 77.77, 78.75, 90.06, 86.57, 86.12, 87.92, 92.3, 99.41, 97.41, 101.6, 104.42, 105.73, 116.11, 128.09, 126.71, 121.07, 105.94, 100.03, 107.5, 115.02, 110.88, 112.88, 106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 197.63, 182.27, 174.53, 161.22, 167.57, 172, 179.35, 186.72, 228.99, 241.65, 260.52, 269.95, 322.05, 292.65, 279.22, 288.12, 293.6, 303.53, 291.5, 284.89] },
      velocityScore: { '1D': 0, '1W': -2, '1M': -40.8, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 55.6, revenueGrowth: 7, eps: 5.12, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { AIRR: 2.47, PRN: false, RSHO: 7.33, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, avgWeight: 4.85, proScore: 1.94, coverage: 0.4,
      price: 790.15, weeklyPrices: [732.24, 753.07, 765.46, 791.56, 790.15], weeklyChange: 7.91, dayChange: -0.27, sortRank: 0, periodReturns: { '1M': 18.5, 'YTD': 152.2, '6M': 150.5, '1Y': 258.4 },
      priceHistory: { '1D': [792.29, 785.04, 790.15], '1W': [732.24, 753.07, 765.46, 791.56, 790.15], '1M': [646.89, 663.14, 686.37, 689.43, 694.72, 619.98, 613.93, 588.9, 623.66, 641.68, 688.87, 690.39, 719.52, 738.85, 790, 736.77, 732.24, 753.07, 765.46, 791.56, 790.15], 'YTD': [313.32, 313.98, 329.66, 363.88, 347.11, 352.09, 409.95, 437.61, 451.25, 414.2, 458.31, 473.85, 566.62, 572.31, 598.44, 611.21, 660.85, 697.15, 683.52, 722.31, 656.35, 646.89, 619.98, 688.87, 736.77, 790.15], '6M': [315.44, 337.03, 317.76, 380.36, 355.51, 345.97, 413.65, 437.61, 451.25, 414.2, 458.31, 473.85, 566.62, 575.16, 603.84, 597.88, 652.99, 702.27, 680.26, 722.31, 656.35, 646.89, 619.98, 688.87, 736.77, 790.15], '1Y': [220.48, 202.53, 222.2, 205.66, 238.15, 233.13, 239.05, 225.32, 226.88, 224.09, 217.41, 238.22, 266.64, 270.05, 268.53, 300.72, 281, 292.46, 303.2, 347.88, 346.35, 371.95, 357.48, 332.87, 320.1, 333.23, 313.32, 313.98, 329.66, 363.88, 347.11, 352.09, 413.65, 437.61, 451.25, 414.2, 458.31, 473.85, 566.62, 572.31, 598.44, 611.21, 660.85, 697.15, 683.52, 722.31, 656.35, 646.89, 619.98, 688.87, 736.77, 790.15] },
      velocityScore: { '1D': 1.6, '1W': 2.1, '1M': -26.5, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 69.3, revenueGrowth: 50, eps: 11.4, grossMargin: 21, dividendYield: 0.25,
      etfPresence: { AIRR: 4.74, PRN: 4.96, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Argan Inc is an engineering and construction company for power generation facilities — natural gas and renewable power plants. It appears in Industrials ETFs because power plant construction is one of the fastest-growing categories in U.S. infrastructure spending, driven by data center load additions that the grid cannot currently support.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.56, proScore: 1.82, coverage: 0.4,
      price: 1933.39, weeklyPrices: [1954.47, 2017.57, 1854.23, 1948.69, 1933.39], weeklyChange: -1.08, dayChange: -0.7, sortRank: 0, periodReturns: { '1M': 5.8, 'YTD': 107.2, '6M': 104.2, '1Y': 260.6 },
      priceHistory: { '1D': [1947.01, 1933.02, 1935.64, 1933.39], '1W': [1954.47, 2017.57, 1854.23, 1948.69, 1933.39], '1M': [1787.88, 1883.26, 1850.04, 1914.65, 1843.94, 1852.03, 1831.56, 1719.48, 1843.42, 1877.61, 1952.02, 1913.94, 1931.77, 1967.41, 2066.51, 1908.07, 1954.47, 2017.57, 1854.23, 1948.69, 1933.39], 'YTD': [933.29, 971.49, 1091.04, 1121.44, 1142.1, 1230.26, 1337.95, 1462.23, 1429.37, 1279.06, 1365.34, 1356.75, 1366.77, 1434.09, 1627.81, 1680.09, 1794.04, 1891.95, 2032.98, 1992.74, 1828.25, 1787.88, 1852.03, 1952.02, 1908.07, 1933.39], '6M': [946.93, 1035.12, 1053.1, 1131.7, 1171.46, 1147.97, 1300.02, 1462.23, 1429.37, 1279.06, 1365.34, 1356.75, 1366.77, 1417.19, 1592.84, 1650.47, 1726.12, 1867.02, 1952.37, 1992.74, 1828.25, 1787.88, 1852.03, 1952.02, 1908.07, 1933.39], '1Y': [536.21, 527.42, 539.02, 532.14, 687.67, 691.45, 718.61, 695.76, 691.18, 698.61, 709.53, 777.18, 804.24, 825.18, 816.53, 831.89, 829.36, 980.97, 955.96, 954.53, 919.82, 945.07, 935.78, 983.61, 968.5, 965.37, 933.29, 971.49, 1091.04, 1121.44, 1142.1, 1230.26, 1300.02, 1462.23, 1429.37, 1279.06, 1365.34, 1356.75, 1366.77, 1434.09, 1627.81, 1680.09, 1794.04, 1891.95, 2032.98, 1992.74, 1828.25, 1787.88, 1852.03, 1952.02, 1908.07, 1933.39] },
      velocityScore: { '1D': 2.8, '1W': -3.7, '1M': -34.1, '6M': null }, isNew: false,
      marketCap: '$68B', pe: 55.7, revenueGrowth: 1, eps: 34.69, grossMargin: 25, dividendYield: 0.13,
      etfPresence: { AIRR: 4.39, PRN: 4.73, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.92, proScore: 1.57, coverage: 0.4,
      price: 336.9, weeklyPrices: [333.78, 343.54, 337.08, 334.16, 336.90], weeklyChange: 0.93, dayChange: 0.8, sortRank: 0, periodReturns: { '1M': 10.9, 'YTD': 31.2, '6M': 29, '1Y': 44.9 },
      priceHistory: { '1W': [333.78, 343.54, 337.08, 334.16, 336.9], '1M': [300.98, 308.31, 313.39, 313.67, 315.29, 314.42, 322.81, 314.08, 318.89, 320.11, 316.18, 324.38, 329.89, 337.96, 338.07, 330.9, 333.78, 343.54, 337.08, 334.16, 336.9], 'YTD': [256.77, 264.62, 282.47, 280.14, 260.41, 291.74, 279.84, 281.97, 282.58, 267.78, 255.65, 253.77, 260.67, 269.55, 293.26, 293.92, 298.1, 303.99, 310.55, 307.17, 307.1, 300.98, 314.42, 316.18, 330.9, 336.9], '6M': [261.16, 260.8, 277.62, 282.33, 259.51, 287.03, 279.03, 281.97, 282.58, 267.78, 255.65, 253.77, 260.67, 267.12, 289.01, 291.03, 293.35, 302.99, 308.87, 307.17, 307.1, 300.98, 314.42, 316.18, 330.9, 336.9], '1Y': [232.45, 247.66, 254.41, 264.89, 272.4, 269.28, 270.68, 262.36, 264.21, 263.15, 261.61, 262.58, 264.9, 261.05, 252.74, 252.95, 258.78, 258.03, 256.47, 255.53, 240.63, 249.05, 257.32, 257.3, 258.47, 263.58, 256.77, 264.62, 282.47, 280.14, 260.41, 291.74, 279.03, 281.97, 282.58, 267.78, 255.65, 253.77, 260.67, 269.55, 293.26, 293.92, 298.1, 303.99, 310.55, 307.17, 307.1, 300.98, 314.42, 316.18, 330.9, 336.9] },
      velocityScore: { '1D': -0.6, '1W': 0, '1M': -26.6, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 31.8, revenueGrowth: 7, eps: 10.59, grossMargin: 30, dividendYield: 0.61,
      etfPresence: { AIRR: 1.8, PRN: false, RSHO: 6.04, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MTZ', name: 'MasTec, Inc.', easyScore: 2, avgWeight: 3.85, proScore: 1.54, coverage: 0.4,
      price: 418.57, weeklyPrices: [393.14, 403.57, 396.25, 429.09, 418.57], weeklyChange: 6.47, dayChange: -2.39, sortRank: 0, periodReturns: { '1M': 10.6, 'YTD': 92.6, '6M': 90, '1Y': 145.6 },
      priceHistory: { '1D': [428.82, 419.61, 418.58, 418.57], '1W': [393.14, 403.57, 396.25, 429.09, 418.57], '1M': [362.09, 366.3, 369.66, 374.73, 363.89, 361.7, 353.08, 335.58, 358.5, 362.97, 371.85, 369.35, 374.91, 379.66, 406.32, 390.44, 393.14, 403.57, 396.25, 429.09, 418.57], 'YTD': [217.37, 219.03, 235.89, 241.8, 240.48, 259.16, 269.53, 283.86, 298.02, 285.61, 290, 300.58, 316.01, 337.27, 365.55, 371.59, 385.89, 425.39, 421.37, 414.9, 382.11, 362.09, 361.7, 371.85, 390.44, 418.57], '6M': [220.33, 235.75, 226, 244.57, 245.08, 244.86, 265.29, 283.86, 298.02, 285.61, 290, 300.58, 316.01, 336.25, 361.22, 370.89, 376.12, 417.41, 414.29, 414.9, 382.11, 362.09, 361.7, 371.85, 390.44, 418.57], '1Y': [170.43, 168.24, 171.92, 173.89, 188.23, 177.7, 184.39, 178.45, 177.13, 180, 174.99, 191.96, 206.25, 212.81, 212.98, 205.38, 207.18, 212.04, 195.51, 197.6, 193.39, 204.62, 212.98, 220.38, 218.19, 224.98, 217.37, 219.03, 235.89, 241.8, 240.48, 259.16, 265.29, 283.86, 298.02, 285.61, 290, 300.58, 316.01, 337.27, 365.55, 371.59, 385.89, 425.39, 421.37, 414.9, 382.11, 362.09, 361.7, 371.85, 390.44, 418.57] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$33B', pe: 73.3, revenueGrowth: 35, eps: 5.71, grossMargin: 13, dividendYield: null,
      etfPresence: { AIRR: 4.36, PRN: 3.33, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'MasTec is an infrastructure construction company — fiber networks, power transmission, renewable energy installations. Revenue grew strongly as utility and telecom capex accelerated. The ETF weight in Industrials reflects MasTec\'s breadth across the electrification, connectivity, and clean energy build-outs that are reshaping U.S. infrastructure spending.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 2.81, proScore: 1.12, coverage: 0.4,
      price: 238.07, weeklyPrices: [237.22, 244.56, 231.87, 238.21, 238.07], weeklyChange: 0.36, dayChange: -0.09, sortRank: 0, periodReturns: { '1M': 9.9, 'YTD': 19, '6M': 17, '1Y': 42 },
      priceHistory: { '1D': [238.29, 237.44, 238.07], '1W': [237.22, 244.56, 231.87, 238.21, 238.07], '1M': [220.92, 230.08, 234.08, 236.14, 227.8, 229.95, 228.01, 223.63, 233.49, 230.05, 237.06, 234.8, 235.29, 242.97, 246.41, 236.07, 237.22, 244.56, 231.87, 238.21, 238.07], 'YTD': [200.06, 207.44, 213.61, 211.03, 208.41, 222.32, 239, 242.29, 226.94, 204.62, 199.45, 186.77, 200, 196.9, 221.27, 217.61, 222.45, 201.12, 203.24, 200.99, 207.8, 220.92, 229.95, 237.06, 236.07, 238.07], '6M': [203.51, 208, 209.78, 217.13, 211.84, 218.02, 230.92, 242.29, 226.94, 204.62, 199.45, 186.77, 200, 197.29, 215.97, 223.52, 222.82, 208.13, 202.84, 200.99, 207.8, 220.92, 229.95, 237.06, 236.07, 238.07], '1Y': [167.68, 170.53, 170.82, 173.83, 180.24, 203.71, 191.17, 187.85, 188.95, 184.11, 186.04, 185.77, 187.6, 186.78, 188.32, 185.28, 191.84, 197.07, 213.49, 221.42, 207.28, 211.97, 209.18, 209.32, 216.89, 205.46, 200.06, 207.44, 213.61, 211.03, 208.41, 222.32, 230.92, 242.29, 226.94, 204.62, 199.45, 186.77, 200, 196.9, 221.27, 217.61, 222.45, 201.12, 203.24, 200.99, 207.8, 220.92, 229.95, 237.06, 236.07, 238.07] },
      velocityScore: { '1D': 0, '1W': -0.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 45.4, revenueGrowth: 17, eps: 5.24, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.66, PRN: false, RSHO: 3.96, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 2, avgWeight: 2.3, proScore: 0.92, coverage: 0.4,
      price: 190.49, weeklyPrices: [205.65, 204.77, 197.91, 189.25, 190.49], weeklyChange: -7.37, dayChange: 0.51, sortRank: 0, periodReturns: { '1M': -2.8, 'YTD': 10.2, '6M': 9.3, '1Y': 32.2 },
      priceHistory: { '1D': [189.52, 190, 190.49], '1W': [205.65, 204.77, 197.91, 189.25, 190.49], '1M': [188.39, 187.26, 184.72, 190.76, 185.95, 187.46, 188.96, 183, 194.68, 193.45, 193.94, 196.93, 203.07, 205.4, 210, 209.89, 205.65, 204.77, 197.91, 189.25, 190.49], 'YTD': [172.84, 193.2, 213.25, 207.75, 205.43, 197.19, 200.4, 206.44, 205.98, 195.23, 194.13, 199.75, 202.59, 215.98, 232.83, 228.24, 222.07, 216.68, 210.8, 204.72, 202.91, 188.39, 187.46, 193.94, 209.89, 190.49], '6M': [174.36, 192.24, 204.08, 206.33, 210.18, 187.42, 196.9, 206.44, 205.98, 195.23, 194.13, 199.75, 202.59, 214.98, 229.57, 235.78, 223.15, 216.31, 205.33, 204.72, 202.91, 188.39, 187.46, 193.94, 209.89, 190.49], '1Y': [144.06, 137.37, 137.45, 140.04, 150.28, 182, 179.51, 170.94, 162.84, 160.03, 162.23, 176.65, 178.02, 184.37, 191.39, 202.46, 205.24, 207.62, 200.39, 195.65, 176.18, 174.62, 176.2, 177.16, 173.2, 177.62, 172.84, 193.2, 213.25, 207.75, 205.43, 197.19, 196.9, 206.44, 205.98, 195.23, 194.13, 199.75, 202.59, 215.98, 232.83, 228.24, 222.07, 216.68, 210.8, 204.72, 202.91, 188.39, 187.46, 193.94, 209.89, 190.49] },
      velocityScore: { '1D': -5.2, '1W': -8.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$17B', pe: 50.8, revenueGrowth: 26, eps: 3.75, grossMargin: 23, dividendYield: 0.55,
      etfPresence: { AIRR: 2.92, PRN: false, RSHO: false, IDEF: 1.69, BILT: false },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 2, avgWeight: 1.74, proScore: 0.7, coverage: 0.4,
      price: 277.98, weeklyPrices: [279.62, 279.09, 281.99, 277.39, 277.98], weeklyChange: -0.59, dayChange: 0.23, sortRank: 0, periodReturns: { '1M': -9.8, 'YTD': -18.3, '6M': -18.7, '1Y': 15.1 },
      priceHistory: { '1D': [277.34, 278.07, 277.58, 277.98], '1W': [279.62, 279.09, 281.99, 277.39, 277.98], '1M': [296.41, 293.66, 287.54, 294.53, 293.04, 292.26, 297.52, 289.13, 300.95, 297.68, 299.66, 298.51, 296.89, 285.43, 278.19, 283.48, 279.62, 279.09, 281.99, 277.39, 277.98], 'YTD': [340.07, 378.47, 418.86, 418.58, 420.51, 397.77, 418.78, 437.57, 444.52, 429.11, 415.71, 407.98, 381.79, 407.66, 394.46, 392.19, 358.4, 363.37, 317.75, 326.17, 320.63, 296.41, 292.26, 299.66, 283.48, 277.98], '6M': [341.98, 356.45, 415.39, 424.14, 427.83, 369.38, 406.76, 437.57, 444.52, 429.11, 415.71, 407.98, 381.79, 396.62, 394.41, 394.81, 359.29, 360.6, 316.28, 326.17, 320.63, 296.41, 292.26, 299.66, 283.48, 277.98], '1Y': [241.46, 247.95, 253.68, 253.96, 260.84, 270.92, 268, 267.6, 270.72, 269.71, 267.07, 273.19, 276.01, 287.91, 285.38, 291.94, 287.53, 299.14, 315.9, 324.19, 309.74, 309.92, 307.2, 314.95, 326.8, 354.52, 340.07, 378.47, 418.86, 418.58, 420.51, 397.77, 406.76, 437.57, 444.52, 429.11, 415.71, 407.98, 381.79, 407.66, 394.46, 392.19, 358.4, 363.37, 317.75, 326.17, 320.63, 296.41, 292.26, 299.66, 283.48, 277.98] },
      velocityScore: { '1D': -2.8, '1W': 1.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 18.1, revenueGrowth: 13, eps: 15.4, grossMargin: 12, dividendYield: 1.99,
      etfPresence: { AIRR: 2.45, PRN: false, RSHO: false, IDEF: 1.03, BILT: false },
      tonyNote: 'Huntington Ingalls Industries is the only builder of nuclear-powered aircraft carriers for the U.S. Navy. Revenue is government-contracted and predictable; the ETF allocation in Industrials reflects defense spending growth and the Navy\'s backlog of nuclear submarine and carrier construction. A steady-state quality compounder in a market structure with no competition.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 1.64, proScore: 0.66, coverage: 0.4,
      price: 74.92, weeklyPrices: [75.87, 77.53, 77.92, 75.06, 74.92], weeklyChange: -1.25, dayChange: -0.17, sortRank: 0, periodReturns: { '1M': 4.9, 'YTD': 24.6, '6M': 24.5, '1Y': 19.3 },
      priceHistory: { '1D': [75.05, 75.09, 74.92], '1W': [75.87, 77.53, 77.92, 75.06, 74.92], '1M': [70.04, 71.31, 71.66, 72.43, 71.96, 71.59, 71.59, 72.26, 71.62, 72.08, 71.49, 71.48, 71.25, 73.12, 74.95, 75.79, 75.87, 77.53, 77.92, 75.06, 74.92], 'YTD': [60.11, 61.15, 60.29, 64.96, 67.26, 66.92, 72.28, 72.98, 74.72, 74.24, 73.34, 72.41, 73.58, 72.59, 71.54, 70.91, 71.61, 75.41, 74.18, 77.72, 78.47, 70.04, 71.59, 71.49, 75.79, 74.92], '6M': [60.16, 60.39, 60.71, 63.72, 67.24, 67.42, 71.13, 72.98, 74.72, 74.24, 73.34, 72.41, 73.58, 72, 72.74, 71.15, 72.18, 75.54, 71.96, 77.72, 78.47, 70.04, 71.59, 71.49, 75.79, 74.92], '1Y': [62.81, 57.69, 58.37, 57.36, 58.89, 59, 57.76, 56.52, 56.83, 57.38, 57.57, 57.95, 61.39, 63.35, 63.97, 62.36, 62.34, 57.59, 56.51, 60.6, 59.91, 59.43, 60.21, 61.55, 58.41, 59.75, 60.11, 61.15, 60.29, 64.96, 67.26, 66.92, 71.13, 72.98, 74.72, 74.24, 73.34, 72.41, 73.58, 72.59, 71.54, 70.91, 71.61, 75.41, 74.18, 77.72, 78.47, 70.04, 71.59, 71.49, 75.79, 74.92] },
      velocityScore: { '1D': 15.8, '1W': 17.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$92B', pe: 32.9, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.8,
      etfPresence: { AIRR: false, PRN: false, RSHO: 0.92, IDEF: false, BILT: 2.36 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 2, avgWeight: 1.62, proScore: 0.65, coverage: 0.4,
      price: 49.9, weeklyPrices: [47.95, 46.32, 47.21, 46.95, 49.90], weeklyChange: 4.07, dayChange: 6.29, sortRank: 0, periodReturns: { '1M': -22.2, 'YTD': -34.3, '6M': -34.3, '1Y': 7.4 },
      priceHistory: { '1D': [46.95, 49.78, 49.86, 49.9], '1W': [47.95, 46.32, 47.21, 46.95, 49.9], '1M': [63.49, 63.27, 58.43, 63.4, 58.52, 57.73, 56.19, 54.82, 58.78, 57.75, 57.02, 56.34, 56.16, 54.21, 51.09, 50.8, 47.95, 46.32, 47.21, 46.95, 49.9], 'YTD': [75.91, 104.04, 124.56, 110.39, 103.01, 94.41, 89.06, 96.08, 86.18, 87, 87.53, 84.62, 71.94, 74.09, 73.55, 69.83, 63.16, 61.93, 56.99, 52.09, 56.18, 63.49, 57.73, 57.02, 50.8, 49.9], '6M': [75.98, 91.44, 121.5, 113.85, 108.16, 85.25, 87.05, 96.08, 86.18, 87, 87.53, 84.62, 71.94, 67.31, 70.34, 70.99, 61.26, 62.05, 57.89, 52.09, 56.18, 63.49, 57.73, 57.02, 50.8, 49.9], '1Y': [46.45, 44.34, 51.12, 55.42, 57.09, 59.4, 69.14, 68.74, 66.9, 66.09, 64.56, 76.35, 83.9, 91.37, 103.69, 95.3, 90.62, 89.78, 90.22, 76.59, 70.24, 74.11, 70.96, 77.03, 73.13, 82.3, 75.91, 104.04, 124.56, 110.39, 103.01, 94.41, 87.05, 96.08, 86.18, 87, 87.53, 84.62, 71.94, 74.09, 73.55, 69.83, 63.16, 61.93, 56.99, 52.09, 56.18, 63.49, 57.73, 57.02, 50.8, 49.9] },
      velocityScore: { '1D': -1.5, '1W': -7.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 293.5, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.31, PRN: false, RSHO: false, IDEF: 0.93, BILT: false },
      tonyNote: 'Kratos Defense is a defense technology company focused on unmanned systems, satellite communications, and high-performance computing for government customers. It appears in Industrials ETFs as an AI-adjacent defense name — autonomous systems and AI-driven surveillance are direct end markets. Revenue grew and the government contract backlog is expanding.',
    },
    {
      ticker: 'AIR', name: 'AIRBUS GROUP', easyScore: 2, avgWeight: 1.34, proScore: 0.54, coverage: 0.4,
      price: 139.09, weeklyPrices: [132.94, 138.51, 143.14, 141.85, 139.09], weeklyChange: 4.63, dayChange: -2, sortRank: 0, periodReturns: { '1M': 23.5, 'YTD': 68, '6M': 66.5, '1Y': 102.2 },
      priceHistory: { '1D': [141.94, 139.43, 139.09], '1W': [132.94, 138.51, 143.14, 141.85, 139.09], '1M': [109.99, 110.61, 111.36, 115.53, 116.65, 114.72, 120.13, 117.36, 127.23, 129.01, 131.18, 129.96, 132.14, 134.88, 134.28, 132.26, 132.94, 138.51, 143.14, 141.85, 139.09], 'YTD': [82.79, 94.73, 105.74, 105.66, 105.91, 113.09, 112.98, 116.97, 117.17, 108.52, 101.91, 101.33, 107.25, 114, 123.77, 121.97, 110.2, 109.56, 117.57, 104.55, 108.41, 109.99, 114.72, 131.18, 132.26, 139.09], '6M': [83.52, 91.34, 101.08, 107.74, 106.67, 106.87, 113.22, 116.97, 117.17, 108.52, 101.91, 101.33, 107.25, 109.78, 120.83, 123.04, 110.54, 110.35, 117.78, 104.55, 108.41, 109.99, 114.72, 131.18, 132.26, 139.09], '1Y': [68.79, 71.65, 73.39, 79.01, 76.1, 72.4, 78.01, 75.75, 75.09, 76.37, 73.92, 75.75, 78.35, 89.67, 83.06, 82.93, 84.73, 84.56, 83.96, 83.84, 78.95, 79.67, 82.88, 79.47, 81.49, 85.44, 82.79, 94.73, 105.74, 105.66, 105.91, 113.09, 113.22, 116.97, 117.17, 108.52, 101.91, 101.33, 107.25, 114, 123.77, 121.97, 110.2, 109.56, 117.57, 104.55, 108.41, 109.99, 114.72, 131.18, 132.26, 139.09] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: 30.6, revenueGrowth: 25, eps: 4.55, grossMargin: 19, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 2.5, BILT: false },
      tonyNote: 'AIRBUS GROUP appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RBC', name: 'RBC Bearings Incorporated', easyScore: 2, avgWeight: 1.19, proScore: 0.47, coverage: 0.4,
      price: 638.48, weeklyPrices: [638.94, 648.89, 630.36, 634.78, 638.48], weeklyChange: -0.07, dayChange: 0.67, sortRank: 0, periodReturns: { '1M': 11.6, 'YTD': 42.4, '6M': 41, '1Y': 65.9 },
      priceHistory: { '1W': [638.94, 648.89, 630.36, 634.78, 638.48], '1M': [566.14, 578.34, 584.18, 589.76, 590.09, 590.97, 592.41, 576.74, 607.46, 603.64, 616.95, 621.08, 625.73, 639.18, 645.73, 633.44, 638.94, 648.89, 630.36, 634.78, 638.48], 'YTD': [448.43, 485, 497.06, 504.07, 499.67, 544.02, 552.44, 559.18, 575.92, 552.91, 536.37, 531.11, 532.25, 552.4, 595.74, 596.86, 591, 593.12, 613.59, 569.06, 559.95, 566.14, 590.97, 616.95, 633.44, 638.48], '6M': [452.89, 467.37, 489.33, 504.99, 511.98, 520.16, 550.4, 559.18, 575.92, 552.91, 536.37, 531.11, 532.25, 548.11, 598.3, 589.77, 589.51, 595.76, 605.99, 569.06, 559.95, 566.14, 590.97, 616.95, 633.44, 638.48], '1Y': [384.8, 381.6, 375.51, 392.38, 385.08, 403.78, 404.99, 398.93, 399.58, 387.71, 374.88, 378.73, 383.7, 390.29, 373.47, 383.98, 392.33, 408.15, 427.24, 442.47, 429.28, 430, 440.04, 436.5, 451.17, 457.07, 448.43, 485, 497.06, 504.07, 499.67, 544.02, 550.4, 559.18, 575.92, 552.91, 536.37, 531.11, 532.25, 552.4, 595.74, 596.86, 591, 593.12, 613.59, 569.06, 559.95, 566.14, 590.97, 616.95, 633.44, 638.48] },
      velocityScore: { '1D': -2.1, '1W': -2.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$20B', pe: 70.3, revenueGrowth: 18, eps: 9.08, grossMargin: 45, dividendYield: null,
      etfPresence: { AIRR: 1.85, PRN: false, RSHO: false, IDEF: 0.52, BILT: false },
      tonyNote: 'RBC Bearings Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRCY', name: 'Mercury Systems, Inc.', easyScore: 2, avgWeight: 1.08, proScore: 0.43, coverage: 0.4,
      price: 111.97, weeklyPrices: [105.00, 105.57, 109.38, 110.22, 111.97], weeklyChange: 6.64, dayChange: 1.59, sortRank: 0, periodReturns: { '1M': 0.2, 'YTD': 53.4, '6M': 51.6, '1Y': 107.9 },
      priceHistory: { '1D': [110.22, 111.97, 111.97], '1W': [105, 105.57, 109.38, 110.22, 111.97], '1M': [111.28, 112.87, 111.59, 117.82, 111.27, 110.94, 108.82, 106.81, 119.32, 120.3, 115.93, 112.44, 115.5, 113.91, 111.76, 110.87, 105, 105.57, 109.38, 110.22, 111.97], 'YTD': [73.01, 88.74, 102.95, 99.05, 93.88, 82.2, 82.36, 87.63, 89.03, 86.42, 78.16, 77.26, 71.4, 75.76, 82.52, 84.12, 77.06, 78.53, 91.95, 92.03, 98.55, 111.28, 110.94, 115.93, 110.87, 111.97], '6M': [73.85, 84.8, 98.62, 99.48, 98.29, 79.07, 80.25, 87.63, 89.03, 86.42, 78.16, 77.26, 71.4, 74.22, 79.6, 84.05, 77.99, 78.55, 90.34, 92.03, 98.55, 111.28, 110.94, 115.93, 110.87, 111.97], '1Y': [53.86, 52, 50.09, 51.51, 51.88, 54.24, 68.02, 66.8, 67.98, 67.66, 68.69, 74.59, 75.34, 77.4, 83.47, 77.76, 78.81, 77.6, 75.71, 72.74, 68.35, 66.67, 67.69, 71.86, 71.8, 75.07, 73.01, 88.74, 102.95, 99.05, 93.88, 82.2, 80.25, 87.63, 89.03, 86.42, 78.16, 77.26, 71.4, 75.76, 82.52, 84.12, 77.06, 78.53, 91.95, 92.03, 98.55, 111.28, 110.94, 115.93, 110.87, 111.97] },
      velocityScore: { '1D': 0, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 12, eps: -0.23, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: 1.13, PRN: false, RSHO: false, IDEF: 1.03, BILT: false },
      tonyNote: 'Mercury Systems, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, avgWeight: 0.99, proScore: 0.4, coverage: 0.4,
      price: 48.21, weeklyPrices: [44.84, 46.27, 46.42, 47.10, 48.21], weeklyChange: 7.52, dayChange: 2.37, sortRank: 0, periodReturns: { '1M': -16.2, 'YTD': -34.1, '6M': -35.4, '1Y': -4.3 },
      priceHistory: { '1D': [47.09, 48.59, 48.19, 48.21], '1W': [44.84, 46.27, 46.42, 47.1, 48.21], '1M': [53.65, 54.65, 51.84, 54.39, 49.44, 49.64, 48.37, 45.87, 49.58, 47.83, 48.27, 51.7, 52.03, 50.37, 47.7, 46.38, 44.84, 46.27, 46.42, 47.1, 48.21], 'YTD': [73.17, 101.28, 109.49, 108.22, 103.8, 95.36, 75.79, 81.62, 88.11, 100.54, 99.98, 99.38, 84.07, 86.1, 87.79, 82.69, 71.95, 65.32, 58.82, 62.77, 64.1, 53.65, 49.64, 48.27, 46.38, 48.21], '6M': [74.62, 91.72, 108.01, 111.61, 110.93, 89.78, 78.71, 81.62, 88.11, 100.54, 99.98, 99.38, 84.07, 85.83, 82.52, 83.58, 70.22, 65.73, 60.84, 62.77, 64.1, 53.65, 49.64, 48.27, 46.38, 48.21], '1Y': [50.37, 45.03, 48.31, 51.96, 51.41, 50.39, 49.03, 51.78, 53.04, 53.89, 62.51, 64.86, 68.71, 72.2, 75.2, 77, 78.99, 85.34, 84.7, 69.38, 58.28, 63.9, 63.83, 63.75, 67.19, 79.98, 73.17, 101.28, 109.49, 108.22, 103.8, 95.36, 78.71, 81.62, 88.11, 100.54, 99.98, 99.38, 84.07, 86.1, 87.79, 82.69, 71.95, 65.32, 58.82, 62.77, 64.1, 53.65, 49.64, 48.27, 46.38, 48.21] },
      velocityScore: { '1D': 0, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: 209.6, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.8, PRN: false, RSHO: false, IDEF: 0.19, BILT: false },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DRS', name: 'Leonardo DRS, Inc.', easyScore: 2, avgWeight: 0.52, proScore: 0.21, coverage: 0.4,
      price: 41.71, weeklyPrices: [44.69, 44.36, 42.48, 40.95, 41.71], weeklyChange: -6.67, dayChange: 1.86, sortRank: 0, periodReturns: { '1M': -14.5, 'YTD': 22.4, '6M': 22.4, '1Y': -10.3 },
      priceHistory: { '1D': [40.95, 41.67, 41.71], '1W': [44.69, 44.36, 42.48, 40.95, 41.71], '1M': [47.96, 47.39, 45.61, 46.71, 46.15, 46.55, 47.35, 46.11, 49.69, 48.53, 46.68, 45.59, 46.58, 46.08, 44.99, 45.74, 44.69, 44.36, 42.48, 40.95, 41.71], 'YTD': [34.09, 38.84, 42.26, 40.99, 41.06, 38.93, 38.13, 40.03, 43.39, 46.58, 45.3, 43.82, 44.84, 46.73, 47.43, 44.24, 40.72, 40, 41.49, 41.5, 44.92, 47.96, 46.55, 46.68, 45.74, 41.71], '6M': [34.09, 37.2, 41.42, 41.28, 41.3, 37.27, 37.77, 40.03, 43.39, 46.58, 45.3, 43.82, 44.84, 46.3, 46.06, 44.57, 39.98, 40.03, 41.36, 41.5, 44.92, 47.96, 46.55, 46.68, 45.74, 41.71], '1Y': [46.48, 46.44, 47.59, 46.14, 48.2, 41.48, 41.87, 42.73, 41.03, 42.01, 40.33, 41.78, 43.1, 45.4, 44.72, 43.85, 40.35, 40.18, 36.15, 35.59, 34.28, 33.63, 33.18, 33.96, 33.12, 34.62, 34.09, 38.84, 42.26, 40.99, 41.06, 38.93, 37.77, 40.03, 43.39, 46.58, 45.3, 43.82, 44.84, 46.73, 47.43, 44.24, 40.72, 40, 41.49, 41.5, 44.92, 47.96, 46.55, 46.68, 45.74, 41.71] },
      velocityScore: { '1D': 0, '1W': -4.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 39, revenueGrowth: 6, eps: 1.07, grossMargin: 24, dividendYield: 0.88,
      etfPresence: { AIRR: 0.75, PRN: false, RSHO: false, IDEF: 0.28, BILT: false },
      tonyNote: 'Leonardo DRS, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TPC', name: 'Tutor Perini Corporation', easyScore: 2, avgWeight: 0.38, proScore: 0.15, coverage: 0.4,
      price: 82.09, weeklyPrices: [82.36, 81.56, 79.53, 81.88, 82.09], weeklyChange: -0.32, dayChange: 0.26, sortRank: 0, periodReturns: { '1M': 14.8, 'YTD': 22.5, '6M': 20.9, '1Y': 75.5 },
      priceHistory: { '1W': [82.36, 81.56, 79.53, 81.88, 82.09], '1M': [74.26, 74.29, 72.26, 72.38, 70.53, 72.13, 71.48, 68.72, 73.61, 74.92, 76.55, 76.19, 77.89, 77.99, 81.5, 81, 82.36, 81.56, 79.53, 81.88, 82.09], 'YTD': [67.02, 70.17, 75.17, 76.01, 78.89, 83.48, 82.74, 86.9, 75.37, 72.82, 67.76, 69.34, 76.15, 77.66, 83.8, 84.38, 87.5, 92.76, 82.79, 79.49, 72.76, 74.26, 72.13, 76.55, 81, 82.09], '6M': [67.92, 71.09, 73.89, 76.79, 79.86, 79.95, 81.73, 86.9, 75.37, 72.82, 67.76, 69.34, 76.15, 77.3, 83.35, 84.22, 86.76, 93.68, 82.85, 79.49, 72.76, 74.26, 72.13, 76.55, 81, 82.09], '1Y': [46.78, 47.15, 48.83, 48.51, 46.91, 47.66, 58.77, 57.44, 58.52, 59.13, 60.47, 63.88, 66.54, 65.59, 61.61, 63.27, 66.87, 68.4, 65.72, 62.63, 58.76, 64.01, 66.47, 68.59, 69.46, 68.65, 67.02, 70.17, 75.17, 76.01, 78.89, 83.48, 81.73, 86.9, 75.37, 72.82, 67.76, 69.34, 76.15, 77.66, 83.8, 84.38, 87.5, 92.76, 82.79, 79.49, 72.76, 74.26, 72.13, 76.55, 81, 82.09] },
      velocityScore: { '1D': 0, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 56.2, revenueGrowth: 12, eps: 1.46, grossMargin: 12, dividendYield: 0.29,
      etfPresence: { AIRR: 0.71, PRN: false, RSHO: false, IDEF: 0.04, BILT: false },
      tonyNote: 'Tutor Perini Corporation appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TKR', name: 'TIMKEN CO/THE', easyScore: 1, avgWeight: 8.69, proScore: 1.74, coverage: 0.2,
      price: 144.33, weeklyPrices: [137.99, 144.01, 141.22, 143.50, 144.33], weeklyChange: 4.59, dayChange: 0.59, sortRank: 0, periodReturns: { '1M': 12.8, 'YTD': 71.6, '6M': 68.2, '1Y': 98.9 },
      priceHistory: { '1D': [143.49, 144.55, 144.54, 144.33], '1W': [137.99, 144.01, 141.22, 143.5, 144.33], '1M': [126.54, 131.9, 131.82, 133.66, 131.83, 134.67, 137.09, 132.39, 137.4, 137.06, 139.12, 140.28, 139.4, 142.36, 141.97, 137.64, 137.99, 144.01, 141.22, 143.5, 144.33], 'YTD': [84.13, 90.6, 93.73, 93.94, 93.19, 106.04, 107.84, 108.16, 108.38, 99.68, 97.54, 95.25, 97.56, 98.94, 106.9, 108.45, 108.7, 107.12, 117.39, 114.49, 119.95, 126.54, 134.67, 139.12, 137.64, 144.33], '6M': [85.81, 88.05, 91.91, 94.6, 94.15, 102.15, 107.35, 108.16, 108.38, 99.68, 97.54, 95.25, 97.56, 98.92, 106.75, 107.66, 107.2, 109, 117.97, 114.49, 119.95, 126.54, 134.67, 139.12, 137.64, 144.33], '1Y': [72.55, 76.94, 76.33, 80.02, 80.98, 74.65, 76.91, 76.69, 79.25, 76.49, 76.14, 77.91, 76.75, 75.18, 75.83, 74.28, 77.3, 77.22, 76.29, 78.2, 74.42, 79.9, 79.82, 83.16, 85.77, 86.09, 84.13, 90.6, 93.73, 93.94, 93.19, 106.04, 107.35, 108.16, 108.38, 99.68, 97.54, 95.25, 97.56, 98.94, 106.9, 108.45, 108.7, 107.12, 117.39, 114.49, 119.95, 126.54, 134.67, 139.12, 137.64, 144.33] },
      velocityScore: { '1D': 0, '1W': 0, '1M': -55.6, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 32.7, revenueGrowth: 8, eps: 4.41, grossMargin: 31, dividendYield: 1,
      etfPresence: { AIRR: false, PRN: false, RSHO: 8.69, IDEF: false, BILT: false },
      tonyNote: 'TIMKEN CO/THE appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RTX', name: 'RTX CORP', easyScore: 1, avgWeight: 8.4, proScore: 1.68, coverage: 0.2,
      price: 187.4, weeklyPrices: [185.06, 186.59, 187.99, 187.33, 187.40], weeklyChange: 1.26, dayChange: 0, sortRank: 0, periodReturns: { '1M': 4.3, 'YTD': 2.2, '6M': 1.8, '1Y': 28.3 },
      priceHistory: { '1D': [187.4, 187.55, 187.4], '1W': [185.06, 186.59, 187.99, 187.33, 187.4], '1M': [174.41, 174.26, 172.55, 179.41, 180.99, 178.66, 181.56, 177.41, 184.21, 183.53, 183.64, 186.77, 192.58, 185.6, 181.83, 186.39, 185.06, 186.59, 187.99, 187.33, 187.4], 'YTD': [183.4, 187.17, 199.83, 195.93, 200.93, 198.66, 200.06, 204.92, 202.62, 209.76, 204.52, 198.16, 189.71, 198.41, 201.41, 195.79, 173.38, 172.9, 178.61, 171.18, 177.01, 174.41, 178.66, 183.64, 186.39, 187.4], '6M': [184.01, 185.73, 198.84, 196.34, 199.88, 195.97, 201.14, 204.92, 202.62, 209.76, 204.52, 198.16, 189.71, 196.21, 201.56, 196.42, 174.26, 173.99, 176.09, 171.18, 177.01, 174.41, 178.66, 183.64, 186.39, 187.4], '1Y': [146.02, 144.91, 148.68, 149.17, 157.12, 156.33, 155.49, 155.5, 156.27, 158.01, 151.75, 158.58, 160.54, 167.33, 169.27, 159.4, 173.04, 178.67, 175.61, 179.22, 175.63, 173.21, 168.8, 171.93, 179.93, 185.76, 183.4, 187.17, 199.83, 195.93, 200.93, 198.66, 201.14, 204.92, 202.62, 209.76, 204.52, 198.16, 189.71, 198.41, 201.41, 195.79, 173.38, 172.9, 178.61, 171.18, 177.01, 174.41, 178.66, 183.64, 186.39, 187.4] },
      velocityScore: { '1D': -1.2, '1W': 4.3, '1M': -46.3, '6M': null }, isNew: false,
      marketCap: '$252B', pe: 35.1, revenueGrowth: 9, eps: 5.34, grossMargin: 20, dividendYield: 1.56,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 8.4, BILT: false },
      tonyNote: 'RTX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 4.33, proScore: 4.33, coverage: 1,
      price: 266.51, weeklyPrices: [259.66, 256.63, 240.30, 261.15, 266.51], weeklyChange: 2.64, dayChange: 2.05, sortRank: 0, periodReturns: { '1M': 15.3, 'YTD': 218.4, '6M': 212.9, '1Y': 381.7 },
      priceHistory: { '1D': [261.15, 264.32, 266.51], '1W': [259.66, 256.63, 240.3, 261.15, 266.51], '1M': [264.51, 260.58, 251.68, 259.67, 227.81, 218, 220.12, 211.69, 222.24, 232.36, 260.07, 265.1, 280.91, 286.69, 283.61, 275.25, 259.66, 256.63, 240.3, 261.15, 266.51], 'YTD': [83.71, 97.3, 103.89, 94.5, 85.19, 86.1, 98.01, 97.92, 91.19, 89.33, 112.95, 117.62, 100.82, 112.54, 154.56, 159.16, 144.96, 176.42, 186.1, 219.94, 214.77, 264.51, 218, 260.07, 275.25, 266.51], '6M': [85.17, 96.21, 101.98, 96.85, 94.91, 73.87, 89.73, 97.92, 91.19, 89.33, 112.95, 117.62, 100.82, 108.82, 144.97, 157.14, 147.16, 154.49, 177.05, 219.94, 214.77, 264.51, 218, 260.07, 275.25, 266.51], '1Y': [55.33, 47.1, 53.53, 51.01, 50.4, 55.17, 75.33, 72.54, 70.02, 65.72, 95.72, 89.43, 107.8, 112.27, 117.7, 128.15, 104.28, 121.83, 110.54, 102.22, 85.98, 91.9, 96.45, 96.41, 80.95, 90.03, 83.71, 97.3, 103.89, 94.5, 85.19, 86.1, 89.73, 97.92, 91.19, 89.33, 112.95, 117.62, 100.82, 112.54, 154.56, 159.16, 144.96, 176.42, 186.1, 219.94, 214.77, 264.51, 218, 260.07, 275.25, 266.51] },
      velocityScore: { '1D': 0.2, '1W': -20.8, '1M': 1.6, '6M': null }, isNew: false,
      marketCap: '$68B', pe: 102.9, revenueGrowth: 684, eps: 2.59, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 3.36, MEME: 5.89, RKNG: 3.74 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 3, avgWeight: 3.56, proScore: 3.56, coverage: 1,
      price: 1145.02, weeklyPrices: [1048.51, 1213.56, 1132.33, 1145.28, 1145.02], weeklyChange: 9.2, dayChange: -0.02, sortRank: 0, periodReturns: { '1M': 17.9, 'YTD': 301.2, '6M': 291.3, '1Y': 829 },
      priceHistory: { '1D': [1145.28, 1144.12, 1145.02], '1W': [1048.51, 1213.56, 1132.33, 1145.28, 1145.02], '1M': [1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1145.02], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 724.66, 751, 1035.5, 949.28, 1087.99, 1051.77, 1145.02], '6M': [292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 1035.5, 949.28, 1087.99, 1051.77, 1145.02], '1Y': [123.25, 124.42, 120.11, 109.22, 111.96, 109.06, 127.75, 123.55, 116.42, 118.48, 135.24, 158.82, 166.41, 167.32, 185.69, 187.06, 202.29, 221.91, 218.03, 241.11, 241.95, 223.93, 239.49, 252.42, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 724.66, 751, 1035.5, 949.28, 1087.99, 1051.77, 1145.02] },
      velocityScore: { '1D': 3.8, '1W': 6.6, '1M': 6, '6M': null }, isNew: false,
      marketCap: '$1.3T', pe: 25.9, revenueGrowth: 346, eps: 44.21, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { BUZZ: 3.54, MEME: 2.93, RKNG: 4.2 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 3, avgWeight: 3.2, proScore: 3.2, coverage: 1,
      price: 37.65, weeklyPrices: [41.98, 40.95, 39.16, 37.77, 37.65], weeklyChange: -10.32, dayChange: -0.33, sortRank: 0, periodReturns: { '1M': -20.4, 'YTD': 53.5, '6M': 56.3, '1Y': 273.9 },
      priceHistory: { '1D': [37.77, 37.5, 37.49, 37.65], '1W': [41.98, 40.95, 39.16, 37.77, 37.65], '1M': [47.94, 47.86, 44.71, 44.15, 39.62, 40.94, 41.91, 38.92, 41.47, 42.7, 46.47, 46.27, 45.57, 46.59, 45.2, 45.27, 41.98, 40.95, 39.16, 37.77, 37.65], 'YTD': [24.52, 31.94, 35.22, 37.69, 33.88, 34.95, 35.28, 29.04, 27.27, 25.14, 27.05, 25.93, 23.76, 25.19, 27.6, 32.19, 33.67, 35.63, 44.59, 42.56, 45.87, 47.94, 40.94, 46.47, 45.27, 37.65], '6M': [24.08, 29.56, 36.1, 34.74, 38.07, 27.84, 36.17, 29.04, 27.27, 25.14, 27.05, 25.93, 23.76, 24.56, 26.26, 31.53, 34.98, 33.55, 41.25, 42.56, 45.87, 47.94, 40.94, 46.47, 45.27, 37.65], '1Y': [10.07, 9.22, 9.97, 10.95, 10.12, 14.89, 14.97, 16.34, 15.95, 15.26, 15.2, 19.46, 24.67, 22.94, 27.3, 35.04, 32.54, 34.33, 31.06, 28.57, 22.93, 23.79, 28.05, 32.77, 24.24, 26.08, 24.52, 31.94, 35.22, 37.69, 33.88, 34.95, 36.17, 29.04, 27.27, 25.14, 27.05, 25.93, 23.76, 25.19, 27.6, 32.19, 33.67, 35.63, 44.59, 42.56, 45.87, 47.94, 40.94, 46.47, 45.27, 37.65] },
      velocityScore: { '1D': -5.6, '1W': -21.4, '1M': -19, '6M': null }, isNew: false,
      marketCap: '$11B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 1.87, MEME: 4.47, RKNG: 3.25 },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 4.75, proScore: 3.16, coverage: 0.667,
      price: 292.03, weeklyPrices: [326.19, 309.18, 252.02, 275.01, 292.03], weeklyChange: -10.47, dayChange: 6.19, sortRank: 0, periodReturns: { '1M': 2.5, 'YTD': 236.1, '6M': 234.7, '1Y': 1120.8 },
      priceHistory: { '1D': [275.01, 290.75, 292.03], '1W': [326.19, 309.18, 252.02, 275.01, 292.03], '1M': [273.51, 302.85, 287.32, 291.37, 263.61, 253.57, 259.61, 234.23, 248.88, 260.22, 274.5, 280.88, 284.99, 328.91, 345.85, 321.98, 326.19, 309.18, 252.02, 275.01, 292.03], 'YTD': [86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 147.55, 155.67, 135.19, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 288.64, 283.92, 275.95, 302.49, 273.51, 253.57, 274.5, 321.98, 292.03], '6M': [87.26, 108, 133.46, 145.63, 156.51, 136.6, 139.03, 147.55, 155.67, 135.19, 154.51, 150.12, 133.24, 135.63, 166.7, 207.86, 231.17, 290.52, 261.03, 275.95, 302.49, 273.51, 253.57, 274.5, 321.98, 292.03], '1Y': [23.92, 24.3, 25.31, 25.93, 34.75, 37.61, 41.25, 46.5, 49.35, 51.35, 55, 73.29, 77.38, 84.57, 86.06, 114.06, 104.38, 113.28, 129.05, 127.07, 107.11, 95.56, 105, 109.44, 87.61, 91.43, 86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.03, 147.55, 155.67, 135.19, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 288.64, 283.92, 275.95, 302.49, 273.51, 253.57, 274.5, 321.98, 292.03] },
      velocityScore: { '1D': -1.6, '1W': -13.2, '1M': -22.4, '6M': null }, isNew: false,
      marketCap: '$83B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.48, RKNG: 4.01 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 2, avgWeight: 4.55, proScore: 3.04, coverage: 0.667,
      price: 646.47, weeklyPrices: [643.83, 675.39, 586.45, 651.88, 646.47], weeklyChange: 0.41, dayChange: -0.83, sortRank: 0, periodReturns: { '1M': 21.7, 'YTD': 275.3, '6M': 267.2, '1Y': 910.3 },
      priceHistory: { '1D': [651.88, 646.15, 646.47], '1W': [643.83, 675.39, 586.45, 651.88, 646.47], '1M': [546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 646.47], 'YTD': [172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 482.02, 484.28, 546.2, 526.93, 653.53, 670.75, 646.47], '6M': [176.06, 199.88, 215, 243.29, 278.41, 260.19, 284.1, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 294.97, 343.43, 372.52, 404, 431.52, 480, 482.02, 484.28, 546.2, 526.93, 653.53, 670.75, 646.47], '1Y': [63.99, 64.02, 67.53, 67.06, 70.61, 75.84, 75.91, 76.29, 79.22, 81.91, 94.54, 103.09, 110.25, 120.06, 119.93, 113.13, 121.41, 124.92, 152.18, 169.99, 162.45, 150.93, 159.99, 169.54, 174.58, 178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 284.1, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 482.02, 484.28, 546.2, 526.93, 653.53, 670.75, 646.47] },
      velocityScore: { '1D': 4.1, '1W': -21.4, '1M': 22.1, '6M': null }, isNew: false,
      marketCap: '$223B', pe: 38.7, revenueGrowth: 46, eps: 16.69, grossMargin: 45, dividendYield: 0.09,
      etfPresence: { BUZZ: false, MEME: 5.02, RKNG: 4.09 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 4.49, proScore: 2.99, coverage: 0.667,
      price: 2124.89, weeklyPrices: [1914.46, 2335.00, 2090.71, 2050.39, 2124.89], weeklyChange: 10.99, dayChange: 3.63, sortRank: 0, periodReturns: { '1M': 25.4, 'YTD': 795.1, '6M': 784.6, '1Y': 4585.5 },
      priceHistory: { '1D': [2050.39, 2104.82, 2124.89], '1W': [1914.46, 2335, 2090.71, 2050.39, 2124.89], '1M': [1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2124.89], 'YTD': [237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 649.97, 635.36, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1407.61, 1478.69, 1761.43, 1642, 2107.86, 1963.6, 2124.89], '6M': [240.22, 353.56, 387.81, 503.44, 539.3, 576.2, 630.29, 649.97, 635.36, 527.33, 661.62, 709.71, 615.83, 701.59, 851.77, 920.99, 989.9, 1187, 1562.34, 1407.61, 1478.69, 1761.43, 1642, 2107.86, 1963.6, 2124.89], '1Y': [45.35, 46.17, 42.72, 41.36, 42.93, 41.93, 46.83, 45.52, 46.78, 51.07, 70.51, 91.55, 106.4, 112.2, 120.95, 127.29, 149.29, 175.53, 194.57, 271.58, 265.88, 226.96, 205.35, 219.46, 209.31, 244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 630.29, 649.97, 635.36, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1407.61, 1478.69, 1761.43, 1642, 2107.86, 1963.6, 2124.89] },
      velocityScore: { '1D': 2.7, '1W': -32.8, '1M': -33.7, '6M': null }, isNew: false,
      marketCap: '$315B', pe: 72.5, revenueGrowth: 251, eps: 29.32, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.94, RKNG: 4.04 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 2, avgWeight: 4.01, proScore: 2.67, coverage: 0.667,
      price: 83.94, weeklyPrices: [68.01, 65.62, 71.45, 86.77, 83.94], weeklyChange: 23.42, dayChange: -3.26, sortRank: 0, periodReturns: { '1M': -26, 'YTD': 15.6, '6M': 12.4, '1Y': 79.6 },
      priceHistory: { '1D': [86.77, 83.68, 84.19, 83.94], '1W': [68.01, 65.62, 71.45, 86.77, 83.94], '1M': [105.65, 118.17, 107.73, 107.29, 93.6, 92.06, 88.71, 87.32, 97.56, 82.41, 87.57, 82.25, 85.43, 80.66, 73.19, 72.87, 68.01, 65.62, 71.45, 86.77, 83.94], 'YTD': [72.63, 90.56, 101.25, 113.57, 111.21, 101.79, 82.51, 80.2, 79.19, 89.47, 86.34, 89.93, 78.67, 94.81, 98.97, 81, 77.2, 68.43, 82.55, 83.67, 105.86, 105.65, 92.06, 87.57, 72.87, 83.94], '6M': [74.68, 85.73, 95.22, 116.37, 122.09, 93.27, 82.22, 80.2, 79.19, 89.47, 86.34, 89.93, 78.67, 92.62, 94.9, 85.53, 76.4, 70.89, 75.05, 83.67, 105.86, 105.65, 92.06, 87.57, 72.87, 83.94], '1Y': [46.73, 45.46, 51.12, 57.09, 53.09, 52.57, 49.76, 48.16, 50.01, 48.76, 36.91, 40.43, 54.8, 49.08, 74.75, 94.5, 78.61, 77.77, 70.05, 67.89, 56.6, 55, 56.89, 72.84, 68.37, 85.67, 72.63, 90.56, 101.25, 113.57, 111.21, 101.79, 82.22, 80.2, 79.19, 89.47, 86.34, 89.93, 78.67, 94.81, 98.97, 81, 77.2, 68.43, 82.55, 83.67, 105.86, 105.65, 92.06, 87.57, 72.87, 83.94] },
      velocityScore: { '1D': 9.4, '1W': -30.6, '1M': -42.2, '6M': null }, isNew: false,
      marketCap: '$33B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.28, MEME: 5.74, RKNG: false },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'LITE', name: 'LITE', easyScore: 2, avgWeight: 3.89, proScore: 2.59, coverage: 0.667,
      price: 862.1, weeklyPrices: [842.53, 861.97, 816.98, 851.40, 862.10], weeklyChange: 2.32, dayChange: 1.26, sortRank: 0, periodReturns: { '1M': 0.8, 'YTD': 133.9, '6M': 132.3, '1Y': 806.9 },
      priceHistory: { '1D': [851.4, 856.48, 862.1], '1W': [842.53, 861.97, 816.98, 851.4, 862.1], '1M': [905, 1029.15, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93, 827.92, 842.53, 861.97, 816.98, 851.4, 862.1], 'YTD': [368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 667.77, 700.91, 558.44, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 1053.09, 970.7, 946.9, 905, 895.4, 957.24, 827.92, 862.1], '6M': [371.18, 392.88, 331.62, 354.49, 381.44, 504.42, 583.46, 667.77, 700.91, 558.44, 622.5, 706.35, 702.73, 826.88, 897.3, 894.07, 881.64, 949.93, 903.8, 970.7, 946.9, 905, 895.4, 957.24, 827.92, 862.1], '1Y': [95.06, 91.31, 98.14, 99.63, 109.48, 108.15, 119.66, 118.98, 123.42, 132.55, 151.73, 170.9, 163.99, 162.71, 157.15, 156.78, 162.95, 198.39, 188.36, 252.47, 242.07, 299.36, 302.81, 360.33, 316.15, 387.41, 368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 583.46, 667.77, 700.91, 558.44, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 1053.09, 970.7, 946.9, 905, 895.4, 957.24, 827.92, 862.1] },
      velocityScore: { '1D': -1.1, '1W': -12.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$67B', pe: 151.2, revenueGrowth: 90, eps: 5.7, grossMargin: 41, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.67, RKNG: 3.11 },
      tonyNote: 'LITE appears in 2 of 3 Meme ETFs (67% coverage) with average weight 3.9% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 2, avgWeight: 3.67, proScore: 2.45, coverage: 0.667,
      price: 45.24, weeklyPrices: [50.30, 47.74, 47.21, 45.91, 45.24], weeklyChange: -10.05, dayChange: -1.45, sortRank: 0, periodReturns: { '1M': -28.8, 'YTD': 19.8, '6M': 18.1, '1Y': 210.5 },
      priceHistory: { '1D': [45.91, 45.1, 45.21, 45.24], '1W': [50.3, 47.74, 47.21, 45.91, 45.24], '1M': [65.33, 66.6, 65.48, 61.86, 54.35, 59.19, 54.02, 51.52, 56.71, 59.77, 60.85, 59.18, 58.11, 59.96, 56.87, 54.72, 50.3, 47.74, 47.21, 45.91, 45.24], 'YTD': [37.77, 45.68, 51.89, 56.68, 53.74, 41.83, 42.22, 39.98, 40.95, 36.7, 41.58, 41.29, 35.09, 35.13, 43.07, 48.72, 48.36, 49.48, 55.15, 52.94, 56.83, 65.33, 59.19, 60.85, 54.72, 45.24], '6M': [38.3, 43.63, 52.88, 52.26, 59.84, 39.79, 40.03, 39.98, 40.95, 36.7, 41.58, 41.29, 35.09, 34.77, 39.32, 48.12, 50.64, 45.66, 61.2, 52.94, 56.83, 65.33, 59.19, 60.85, 54.72, 45.24], '1Y': [14.57, 16.89, 16.88, 18.59, 15.79, 16.45, 17.83, 20.7, 23.12, 29.11, 30.19, 36.45, 41.77, 46.93, 61.68, 69.56, 55.19, 62.42, 66.63, 57.38, 47.41, 48.49, 41.12, 46.84, 36.59, 42.07, 37.77, 45.68, 51.89, 56.68, 53.74, 41.83, 40.03, 39.98, 40.95, 36.7, 41.58, 41.29, 35.09, 35.13, 43.07, 48.72, 48.36, 49.48, 55.15, 52.94, 56.83, 65.33, 59.19, 60.85, 54.72, 45.24] },
      velocityScore: { '1D': -5.8, '1W': -41.2, '1M': -39.7, '6M': null }, isNew: false,
      marketCap: '$16B', pe: 58.8, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 2.59, MEME: 4.75, RKNG: false },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'AMD', name: 'AMD', easyScore: 2, avgWeight: 3.42, proScore: 2.28, coverage: 0.667,
      price: 558.96, weeklyPrices: [519.74, 532.57, 521.58, 539.49, 558.96], weeklyChange: 7.55, dayChange: 3.61, sortRank: 0, periodReturns: { '1M': 8.3, 'YTD': 161, '6M': 159.6, '1Y': 293.9 },
      priceHistory: { '1D': [539.49, 558.33, 558.96], '1W': [519.74, 532.57, 521.58, 539.49, 558.96], '1M': [510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 558.96], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 424.1, 467.51, 510.13, 490.33, 547.26, 519.85, 558.96], '6M': [215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 467.51, 510.13, 490.33, 547.26, 519.85, 558.96], '1Y': [141.9, 137.82, 155.61, 154.72, 177.44, 174.31, 174.95, 176.14, 163.36, 162.32, 155.82, 160.46, 160.9, 161.79, 211.51, 218.09, 238.03, 258.01, 250.05, 237.52, 240.52, 215.05, 215.24, 221.62, 209.17, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 205.94, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 424.1, 467.51, 510.13, 490.33, 547.26, 519.85, 558.96] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$911B', pe: 185.1, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { BUZZ: 3.32, MEME: false, RKNG: 3.53 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'INTC', name: 'INTC', easyScore: 2, avgWeight: 3.33, proScore: 2.22, coverage: 0.667,
      price: 134.75, weeklyPrices: [131.65, 132.87, 128.32, 131.72, 134.75], weeklyChange: 2.35, dayChange: 2.3, sortRank: 0, periodReturns: { '1M': 17.5, 'YTD': 265.2, '6M': 261.2, '1Y': 501.5 },
      priceHistory: { '1D': [131.72, 133.59, 134.75], '1W': [131.65, 132.87, 128.32, 131.72, 134.75], '1M': [109.33, 107.93, 112.71, 111.78, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 134.75], 'YTD': [36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 44.11, 45.61, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 129.44, 108.77, 119.84, 109.33, 110.27, 127.86, 132.28, 134.75], '6M': [37.3, 42.63, 48.72, 54.32, 48.66, 48.24, 46.48, 44.11, 45.61, 43.42, 45.77, 43.87, 43.13, 50.38, 62.38, 68.5, 82.54, 99.62, 124.92, 108.77, 119.84, 109.33, 110.27, 127.86, 132.28, 134.75], '1Y': [22.4, 23.59, 22.92, 23.24, 20.41, 20.19, 21.81, 23.66, 24.55, 24.21, 24.44, 25.27, 29.34, 33.55, 37.17, 35.63, 38.12, 41.53, 37.03, 37.88, 34.71, 35.79, 43.47, 40.5, 37.31, 36.35, 36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.48, 44.11, 45.61, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 129.44, 108.77, 119.84, 109.33, 110.27, 127.86, 132.28, 134.75] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$677B', pe: null, revenueGrowth: 7, eps: -0.61, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 3.05, MEME: false, RKNG: 3.62 },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab', easyScore: 2, avgWeight: 3.23, proScore: 2.15, coverage: 0.667,
      price: 98.84, weeklyPrices: [85.41, 80.69, 84.54, 98.01, 98.84], weeklyChange: 15.72, dayChange: 0.91, sortRank: 0, periodReturns: { '1M': -31.1, 'YTD': 41.7, '6M': 40.3, '1Y': 176.3 },
      priceHistory: { '1D': [97.95, 99.01, 99.33, 98.84], '1W': [85.41, 80.69, 84.54, 98.01, 98.84], '1M': [122.39, 123.32, 114.7, 119.95, 110.08, 113.65, 108.23, 105.05, 114.78, 102.39, 109.25, 104.63, 107.98, 107.24, 100.29, 95.12, 85.41, 80.69, 84.54, 98.01, 98.84], 'YTD': [69.76, 83.08, 90.76, 88.9, 80.07, 72.32, 67.44, 70.86, 69.1, 70.11, 68.41, 67.23, 60.93, 67.67, 70.62, 89.46, 82.29, 80.31, 117.35, 124.77, 135.76, 122.39, 113.65, 109.25, 95.12, 98.84], '6M': [70.45, 84.08, 91.8, 87.98, 85.68, 66.32, 66.01, 70.86, 69.1, 70.11, 68.41, 67.23, 60.93, 67.73, 68.05, 84.8, 79.68, 78.81, 105.47, 124.77, 135.76, 122.39, 113.65, 109.25, 95.12, 98.84], '1Y': [35.77, 38.74, 44.6, 46.88, 43.79, 44.75, 43.43, 44.97, 47.22, 49.31, 47.03, 47.24, 52.91, 47.91, 61.51, 68.03, 65.4, 63.75, 56.57, 51.24, 43.31, 42.45, 41.9, 53.43, 55.49, 77.18, 69.76, 83.08, 90.76, 88.9, 80.07, 72.32, 66.01, 70.86, 69.1, 70.11, 68.41, 67.23, 60.93, 67.67, 70.62, 89.46, 82.29, 80.31, 117.35, 124.77, 135.76, 122.39, 113.65, 109.25, 95.12, 98.84] },
      velocityScore: { '1D': 6.4, '1W': null, '1M': -48.1, '6M': null }, isNew: false,
      marketCap: '$62B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 1.63, MEME: 4.83, RKNG: false },
      tonyNote: 'Rocket Lab is the small-launch and space systems name that Electrification and AI infrastructure ETFs hold for satellite connectivity exposure — relevant to both GPS-dependent grids and low-orbit broadband that supports remote AI compute. Small market cap, no earnings, but consistent revenue growth and a rapidly expanding backlog.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 1, avgWeight: 9.72, proScore: 3.24, coverage: 0.333,
      price: 149.79, weeklyPrices: [146.97, 138.54, 135.69, 150.10, 149.79], weeklyChange: 1.92, dayChange: -0.2, sortRank: 0, periodReturns: { '1M': -5.4, 'YTD': 329.7, '6M': 315.9, '1Y': 483.1 },
      priceHistory: { '1D': [150.1, 148.38, 149.5, 149.79], '1W': [146.97, 138.54, 135.69, 150.1, 149.79], '1M': [185.67, 202.37, 184.07, 202.89, 177, 196.64, 162.88, 175.13, 172.78, 169.05, 191.55, 170.81, 167.34, 161.85, 171.23, 147.44, 146.97, 138.54, 135.69, 150.1, 149.79], 'YTD': [34.86, 33.01, 37, 35.72, 43.61, 44.3, 44.46, 51.68, 84.23, 95.58, 96.81, 87.54, 98.21, 107.45, 153.19, 163.47, 145.78, 172.98, 184.9, 190.36, 181.49, 185.67, 196.64, 191.55, 147.44, 149.79], '6M': [36.02, 38.06, 34.47, 38.15, 39.57, 38.13, 43.99, 51.68, 84.23, 95.58, 96.81, 87.54, 98.21, 103.91, 150.6, 159.42, 162.17, 183.51, 148.94, 190.36, 181.49, 185.67, 196.64, 191.55, 147.44, 149.79], '1Y': [25.69, 26.88, 29.24, 26.35, 24.11, 21.42, 22.79, 26.13, 24.34, 23.35, 23.72, 28.93, 28.06, 25.93, 31.33, 28.48, 33.4, 36.87, 29.5, 23.75, 21.63, 22.47, 26.02, 30.38, 28.96, 40.64, 34.86, 33.01, 37, 35.72, 43.61, 44.3, 43.99, 51.68, 84.23, 95.58, 96.81, 87.54, 98.21, 107.45, 153.19, 163.47, 145.78, 172.98, 184.9, 190.36, 181.49, 185.67, 196.64, 191.55, 147.44, 149.79] },
      velocityScore: { '1D': -21.4, '1W': -16.9, '1M': -25.7, '6M': null }, isNew: false,
      marketCap: '$12B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 9.72, RKNG: false },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'QBTS', name: 'D-Wave Quantum', easyScore: 1, avgWeight: 5.21, proScore: 1.74, coverage: 0.333,
      price: 23.38, weeklyPrices: [22.98, 21.91, 22.76, 23.83, 23.38], weeklyChange: 1.72, dayChange: -1.93, sortRank: 0, periodReturns: { '1M': -22.4, 'YTD': -10.6, '6M': -11, '1Y': 59.7 },
      priceHistory: { '1D': [23.84, 23.5, 23.4, 23.38], '1W': [22.98, 21.91, 22.76, 23.83, 23.38], '1M': [29.18, 29.91, 27.55, 27.64, 23.85, 25.83, 23.52, 23.25, 23.82, 23.37, 26.26, 23.94, 22.92, 24.69, 24.47, 25.03, 22.98, 21.91, 22.76, 23.83, 23.38], 'YTD': [26.15, 29.28, 28.72, 25.63, 21.22, 20.72, 19.67, 18.06, 18.78, 18.59, 17.55, 15.73, 13.9, 14.14, 14.65, 21.66, 18.8, 20.92, 24.03, 20.35, 29.4, 29.18, 25.83, 26.26, 25.03, 23.38], '6M': [26.25, 30.2, 30.15, 27.43, 23.22, 17.21, 18.82, 18.06, 18.78, 18.59, 17.55, 15.73, 13.9, 14.32, 14.25, 21.69, 18.49, 20.49, 22.57, 20.35, 29.4, 29.18, 25.83, 26.26, 25.03, 23.38], '1Y': [14.64, 15.99, 16.15, 17.59, 17.67, 18.3, 18.51, 16.56, 15.02, 15.85, 16.15, 18.98, 27.52, 24.71, 35.72, 43.06, 32.19, 32, 29.74, 28.99, 22.83, 23.11, 22.5, 28.33, 25.52, 29.12, 26.15, 29.28, 28.72, 25.63, 21.22, 20.72, 18.82, 18.06, 18.78, 18.59, 17.55, 15.73, 13.9, 14.14, 14.65, 21.66, 18.8, 20.92, 24.03, 20.35, 29.4, 29.18, 25.83, 26.26, 25.03, 23.38] },
      velocityScore: { '1D': -1.7, '1W': -8.4, '1M': -47.1, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: -81, eps: -1.14, grossMargin: 66, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.21, RKNG: false },
      tonyNote: 'D-Wave Quantum is a quantum computing company — the only publicly traded business built around quantum annealing hardware. Revenue is minimal and profitability is many years away, but it holds a position in Meme ETFs as the purest-play quantum computing stock available to retail investors. The ETF weight is small and the position is purely thematic.',
    },
    {
      ticker: 'COHR', name: 'COHR', easyScore: 1, avgWeight: 4.91, proScore: 1.64, coverage: 0.333,
      price: 395.49, weeklyPrices: [392.50, 407.25, 380.56, 391.22, 395.49], weeklyChange: 0.76, dayChange: 1.1, sortRank: 0, periodReturns: { '1M': 9.4, 'YTD': 114.3, '6M': 111.7, '1Y': 343.3 },
      priceHistory: { '1D': [391.18, 389.54, 394.35, 395.49], '1W': [392.5, 407.25, 380.56, 391.22, 395.49], '1M': [362.9, 426.89, 417.43, 421.9, 376.99, 401.93, 355.94, 354.77, 363.58, 385.03, 413.84, 382.81, 378.85, 389.57, 425.48, 381.22, 392.5, 407.25, 380.56, 391.22, 395.49], 'YTD': [184.57, 173.15, 195.96, 196.94, 212.18, 227.68, 217.23, 248.18, 258.93, 235.72, 242.76, 253.63, 243.48, 253.22, 307.93, 347.51, 321.53, 329.89, 379.69, 382.45, 377.57, 362.9, 401.93, 413.84, 381.22, 395.49], '6M': [186.81, 191.62, 184.11, 202.72, 215.86, 209.24, 216.1, 248.18, 258.93, 235.72, 242.76, 253.63, 243.48, 258.16, 307.5, 345.02, 336.09, 329.5, 335.26, 382.45, 377.57, 362.9, 401.93, 413.84, 381.22, 395.49], '1Y': [89.21, 90.4, 96.07, 97.02, 106.98, 105.6, 116.56, 90.49, 90.5, 87.8, 99.22, 104.47, 109.29, 107.72, 113.56, 109.37, 120.79, 134.24, 128.7, 158.01, 139.07, 151.81, 164.89, 192.73, 175.2, 191.87, 184.57, 173.15, 195.96, 196.94, 212.18, 227.68, 216.1, 248.18, 258.93, 235.72, 242.76, 253.63, 243.48, 253.22, 307.93, 347.51, 321.53, 329.89, 379.69, 382.45, 377.57, 362.9, 401.93, 413.84, 381.22, 395.49] },
      velocityScore: { '1D': -3.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$77B', pe: 187.4, revenueGrowth: 21, eps: 2.11, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.91, RKNG: false },
      tonyNote: 'COHR appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 1, avgWeight: 4.8, proScore: 1.6, coverage: 0.333,
      price: 52.66, weeklyPrices: [53.60, 50.56, 49.31, 53.88, 52.66], weeklyChange: -1.76, dayChange: -2.36, sortRank: 0, periodReturns: { '1M': -26.9, 'YTD': 17.4, '6M': 16.2, '1Y': 22.5 },
      priceHistory: { '1D': [53.93, 52.7, 52.67, 52.66], '1W': [53.6, 50.56, 49.31, 53.88, 52.66], '1M': [69.28, 71.4, 68.23, 65.66, 56.78, 62.8, 56.69, 56.63, 57.99, 57.85, 61.18, 56.06, 54.69, 56.55, 58.32, 57.85, 53.6, 50.56, 49.31, 53.88, 52.66], 'YTD': [44.87, 50.45, 47.56, 47.25, 39.98, 34.99, 34.11, 31.9, 38.37, 35.73, 32.98, 31.2, 27.51, 29.24, 29.76, 48.32, 43.84, 45.75, 56.89, 51.95, 63.64, 69.28, 62.8, 61.18, 57.85, 52.66], '6M': [45.31, 49.78, 50.88, 49.33, 43.24, 30.43, 31.3, 31.9, 38.37, 35.73, 32.98, 31.2, 27.51, 29.3, 28.79, 46.09, 42.69, 46.2, 49.24, 51.95, 63.64, 69.28, 62.8, 61.18, 57.85, 52.66], '1Y': [42.97, 44.97, 41.47, 41.94, 40.53, 42.02, 43, 40.23, 38.68, 42.99, 44, 62.26, 75.14, 61.5, 79.23, 77.55, 59.5, 57.15, 53.38, 54.42, 47.79, 46.76, 46.93, 54.44, 49.67, 51.39, 44.87, 50.45, 47.56, 47.25, 39.98, 34.99, 31.3, 31.9, 38.37, 35.73, 32.98, 31.2, 27.51, 29.24, 29.76, 48.32, 43.84, 45.75, 56.89, 51.95, 63.64, 69.28, 62.8, 61.18, 57.85, 52.66] },
      velocityScore: { '1D': 2.6, '1W': -37.3, '1M': -49, '6M': null }, isNew: false,
      marketCap: '$20B', pe: 135, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.8, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'AXTI', name: 'AXT Inc', easyScore: 1, avgWeight: 4.62, proScore: 1.54, coverage: 0.333,
      price: 72.34, weeklyPrices: [70.14, 69.06, 70.15, 71.46, 72.34], weeklyChange: 3.14, dayChange: 1.23, sortRank: 0, periodReturns: { '1M': -29.9, 'YTD': 342.4, '6M': 357.8, '1Y': 3361.2 },
      priceHistory: { '1D': [71.46, 71.95, 72.5, 72.34], '1W': [70.14, 69.06, 70.15, 71.46, 72.34], '1M': [109.55, 110.85, 106.7, 105.99, 89.04, 90.78, 78.36, 85.29, 88.34, 97.18, 110.74, 93.04, 92.11, 84.57, 92.44, 77.91, 70.14, 69.06, 70.15, 71.46, 72.34], 'YTD': [16.35, 25.83, 25.72, 17.4, 18.54, 24.06, 24.24, 29.68, 37.9, 32.37, 48.86, 54.24, 60.63, 41.99, 66.45, 78.76, 70.15, 106, 125.81, 123.78, 140.83, 109.55, 90.78, 110.74, 77.91, 72.34], '6M': [15.8, 24.11, 22.1, 17.92, 16.38, 20.43, 24.79, 29.68, 37.9, 32.37, 48.86, 54.24, 60.63, 52.84, 64.18, 82.56, 76.16, 96, 116.36, 123.78, 140.83, 109.55, 90.78, 110.74, 77.91, 72.34], '1Y': [2.09, 2.37, 2.36, 2.35, 2.29, 2.05, 2.23, 2.07, 2.84, 3.28, 3.04, 4.01, 4.8, 4.49, 5.31, 4.57, 5.17, 6.6, 8.54, 10.56, 10.25, 9.34, 11.76, 14.96, 13, 14.64, 16.35, 25.83, 25.72, 17.4, 18.54, 24.06, 24.79, 29.68, 37.9, 32.37, 48.86, 54.24, 60.63, 41.99, 66.45, 78.76, 70.15, 106, 125.81, 123.78, 140.83, 109.55, 90.78, 110.74, 77.91, 72.34] },
      velocityScore: { '1D': -4.3, '1W': 4.1, '1M': -38.2, '6M': null }, isNew: false,
      marketCap: '$5B', pe: null, revenueGrowth: 39, eps: -0.32, grossMargin: 21, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.62, RKNG: false },
      tonyNote: 'AXT Inc is a compound semiconductor substrate manufacturer — gallium arsenide, indium phosphide, and germanium wafers used in data center optical transceivers, 5G RF chips, and solar cells. Revenue is growing with optical networking demand. Small market cap but positioned at a genuine supply-chain chokepoint for III-V semiconductor materials.',
    },
    {
      ticker: 'CRWV', name: 'CRWV', easyScore: 1, avgWeight: 4.1, proScore: 1.37, coverage: 0.333,
      price: 95.12, weeklyPrices: [100.88, 98.76, 96.58, 95.51, 95.12], weeklyChange: -5.71, dayChange: -0.41, sortRank: 0, periodReturns: { '1M': -13.2, 'YTD': 32.8, '6M': 28.7, '1Y': -41.7 },
      priceHistory: { '1D': [95.51, 94.24, 94.9, 95.12], '1W': [100.88, 98.76, 96.58, 95.51, 95.12], '1M': [124.82, 119.27, 110.93, 108.03, 100.39, 102.37, 98.45, 95.61, 95.74, 100.55, 106.71, 117.03, 115.21, 117.95, 111.29, 105.72, 100.88, 98.76, 96.58, 95.51, 95.12], 'YTD': [71.61, 77.09, 95.01, 92.98, 93.19, 89.95, 96.04, 89.25, 79.56, 72.99, 81.11, 81.47, 74.81, 80.94, 110.27, 117.43, 112.06, 125.43, 114.7, 107.3, 105.49, 124.82, 102.37, 106.71, 105.72, 95.12], '6M': [73.9, 77.18, 89.8, 91.79, 99.53, 74.65, 95.7, 89.25, 79.56, 72.99, 81.11, 81.47, 74.81, 82.24, 102, 116.85, 110.14, 119.01, 114.15, 107.3, 105.49, 124.82, 102.37, 106.71, 105.72, 95.12], '1Y': [163.06, 151.45, 140.59, 129.77, 108.74, 111.84, 148.75, 96.8, 92.38, 93.34, 100.22, 118.75, 130.89, 136.85, 128.83, 134.06, 125.06, 134.8, 115.75, 88.39, 75.33, 73.6, 76.03, 90.66, 69.5, 80.26, 71.61, 77.09, 95.01, 92.98, 93.19, 89.95, 95.7, 89.25, 79.56, 72.99, 81.11, 81.47, 74.81, 80.94, 110.27, 117.43, 112.06, 125.43, 114.7, 107.3, 105.49, 124.82, 102.37, 106.71, 105.72, 95.12] },
      velocityScore: { '1D': -7.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$52B', pe: null, revenueGrowth: 112, eps: -2.72, grossMargin: 69, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.1, RKNG: false },
      tonyNote: 'CRWV appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ALAB', name: 'ALAB', easyScore: 1, avgWeight: 3.88, proScore: 1.29, coverage: 0.333,
      price: 470.63, weeklyPrices: [399.92, 398.00, 391.74, 455.96, 470.63], weeklyChange: 17.68, dayChange: 3.22, sortRank: 0, periodReturns: { '1M': 37.3, 'YTD': 182.9, '6M': 175.5, '1Y': 420.5 },
      priceHistory: { '1D': [455.96, 466.45, 470.63], '1W': [399.92, 398, 391.74, 455.96, 470.63], '1M': [320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 470.63], 'YTD': [166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 129.68, 118.83, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 232.68, 306.88, 320.09, 346.33, 389.2, 397.02, 470.63], '6M': [170.84, 165.77, 172.14, 176.35, 160.46, 142.82, 126.58, 129.68, 118.83, 119.2, 120.31, 116.04, 112.47, 117.14, 149.05, 174.05, 212.84, 202.68, 199.79, 232.68, 306.88, 320.09, 346.33, 389.2, 397.02, 470.63], '1Y': [90.42, 92.3, 92.36, 116.91, 118.41, 135.54, 192, 186.43, 174.15, 174.24, 214.49, 238.79, 230.11, 195.8, 212.1, 161.55, 157.51, 168.25, 179.31, 167.55, 141.39, 147.75, 142.94, 167.08, 144.94, 168.83, 166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 126.58, 129.68, 118.83, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 232.68, 306.88, 320.09, 346.33, 389.2, 397.02, 470.63] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$81B', pe: 322.4, revenueGrowth: 93, eps: 1.46, grossMargin: 76, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.88, RKNG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'WEN', name: 'WEN', easyScore: 1, avgWeight: 3.85, proScore: 1.28, coverage: 0.333,
      price: 8.03, weeklyPrices: [7.86, 7.33, 7.80, 8.26, 8.03], weeklyChange: 2.15, dayChange: -2.74, sortRank: 0, periodReturns: { '1M': 4.3, 'YTD': -3.6, '6M': -3, '1Y': -29.7 },
      priceHistory: { '1D': [8.26, 8.02, 8.06, 8.03], '1W': [7.86, 7.33, 7.8, 8.26, 8.03], '1M': [7.85, 7.21, 6.85, 6.75, 6.71, 6.74, 6.71, 6.63, 6.79, 6.79, 6.91, 6.77, 6.95, 6.8, 6.17, 6.26, 7.86, 7.33, 7.8, 8.26, 8.03], 'YTD': [8.33, 8.38, 8.54, 8.42, 7.79, 8.02, 7.48, 8.09, 7.66, 7.42, 7.17, 7.09, 6.8, 7.09, 6.7, 7.13, 6.9, 6.54, 6.76, 8.02, 7.81, 7.85, 6.74, 6.91, 6.26, 8.03], '6M': [8.28, 8.22, 8.48, 8.43, 7.72, 8.04, 7.27, 8.09, 7.66, 7.42, 7.17, 7.09, 6.8, 6.88, 6.89, 6.95, 7.14, 6.7, 7.3, 8.02, 7.81, 7.85, 6.74, 6.91, 6.26, 8.03], '1Y': [11.42, 11.29, 10.51, 10.84, 10.18, 9.95, 10.11, 10.68, 10.52, 10.27, 9.92, 9.56, 9.09, 9.16, 9.11, 8.92, 9.33, 8.73, 8.89, 8.85, 8.4, 7.9, 8.49, 8.16, 8.35, 8.22, 8.33, 8.38, 8.54, 8.42, 7.79, 8.02, 7.27, 8.09, 7.66, 7.42, 7.17, 7.09, 6.8, 7.09, 6.7, 7.13, 6.9, 6.54, 6.76, 8.02, 7.81, 7.85, 6.74, 6.91, 6.26, 8.03] },
      velocityScore: { '1D': -0.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2B', pe: 10.4, revenueGrowth: 3, eps: 0.77, grossMargin: 34, dividendYield: 6.78,
      etfPresence: { BUZZ: false, MEME: 3.85, RKNG: false },
      tonyNote: 'WEN appears in 1 of 3 Meme ETFs (33% coverage) with average weight 3.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
