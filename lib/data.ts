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
export const SPY_RET: Record<Period, number> = { '1W': -1.7, '1M': -2.2, 'YTD': 7.7, '6M': 6.4, '1Y': 20 };
// @@END_GENERATED:SPY_RET@@

// Top holdings per ETF (ticker + portfolio weight %), shown on ETF row hover.
export type EtfHolding = { t: string; w: number };

// @@GENERATED:ETF_TOP_HOLDINGS@@
export const ETF_TOP_HOLDINGS: Record<string, EtfHolding[]> = {
  AIS: [{ t: 'MU', w: 6.8 }, { t: 'AMD', w: 4.7 }, { t: 'MRVL', w: 4.0 }, { t: 'SIMO', w: 3.7 }, { t: 'VRT', w: 3.6 }],
  ARTY: [{ t: 'MU', w: 5.0 }, { t: 'AMD', w: 4.8 }, { t: 'NVDA', w: 4.5 }, { t: 'CRWV', w: 4.4 }, { t: 'AVGO', w: 4.4 }],
  BAI: [{ t: 'MU', w: 6.3 }, { t: 'AMD', w: 4.8 }, { t: 'LRCX', w: 4.7 }, { t: 'TSM', w: 4.4 }, { t: 'AVGO', w: 4.2 }],
  IGPT: [{ t: 'AMD', w: 8.2 }, { t: 'MU', w: 8.1 }, { t: 'META', w: 7.5 }, { t: 'NVDA', w: 7.5 }, { t: 'GOOGL', w: 7.4 }],
  IVES: [{ t: 'MU', w: 5.1 }, { t: 'TSM', w: 5.1 }, { t: 'AAPL', w: 5.1 }, { t: 'NVDA', w: 4.9 }, { t: 'AVGO', w: 4.9 }],
  ALAI: [{ t: 'NVDA', w: 12.6 }, { t: 'TSM', w: 5.7 }, { t: 'AMZN', w: 5.5 }, { t: 'MSFT', w: 4.8 }, { t: 'GOOG', w: 4.8 }],
  CHAT: [{ t: 'NVDA', w: 6.4 }, { t: 'GOOGL', w: 5.0 }, { t: 'AVGO', w: 4.1 }, { t: 'AMD', w: 4.0 }, { t: 'MU', w: 4.0 }],
  AIFD: [{ t: 'MU', w: 7.0 }, { t: 'NVDA', w: 6.4 }, { t: 'MRVL', w: 6.2 }, { t: 'LITE', w: 5.8 }, { t: 'DOCN', w: 5.5 }],
  SPRX: [{ t: 'ALAB', w: 9.9 }, { t: 'COHR', w: 8.9 }, { t: 'ARM', w: 8.2 }, { t: 'KLAC', w: 7.7 }, { t: 'MKSI', w: 6.3 }],
  AOTG: [{ t: 'AMD', w: 16.6 }, { t: 'MU', w: 12.0 }, { t: 'NVDA', w: 10.4 }, { t: 'TSM', w: 7.6 }, { t: 'TOST', w: 4.4 }],
  SOXX: [{ t: 'MU', w: 8.3 }, { t: 'AMD', w: 7.7 }, { t: 'NVDA', w: 7.2 }, { t: 'AVGO', w: 6.5 }, { t: 'INTC', w: 6.3 }],
  PSI: [{ t: 'AMAT', w: 6.2 }, { t: 'KLAC', w: 5.7 }, { t: 'MU', w: 5.6 }, { t: 'LRCX', w: 5.6 }, { t: 'INTC', w: 5.1 }],
  XSD: [{ t: 'ALGM', w: 2.8 }, { t: 'INTC', w: 2.7 }, { t: 'ALAB', w: 2.7 }, { t: 'MXL', w: 2.6 }, { t: 'MU', w: 2.6 }],
  DRAM: [{ t: 'SNDK', w: 4.5 }, { t: 'WDC', w: 4.5 }, { t: 'STX', w: 4.5 }, { t: 'MU', w: 0.7 }],
  PTF: [{ t: 'SNDK', w: 8.6 }, { t: 'WDC', w: 5.6 }, { t: 'STX', w: 5.2 }, { t: 'MU', w: 5.1 }, { t: 'AAPL', w: 4.3 }],
  WCLD: [{ t: 'DOCN', w: 3.8 }, { t: 'FROG', w: 3.1 }, { t: 'PANW', w: 2.8 }, { t: 'DDOG', w: 2.8 }, { t: 'CRWD', w: 2.6 }],
  IGV: [{ t: 'PANW', w: 9.1 }, { t: 'MSFT', w: 8.3 }, { t: 'PLTR', w: 7.8 }, { t: 'ORCL', w: 7.0 }, { t: 'CRWD', w: 6.7 }],
  FDTX: [{ t: 'MU', w: 9.4 }, { t: 'MRVL', w: 8.1 }, { t: 'TSM', w: 6.0 }, { t: 'NVDA', w: 4.6 }, { t: 'STX', w: 4.0 }],
  GTEK: [{ t: 'MRVL', w: 4.4 }, { t: 'DELL', w: 3.0 }, { t: 'APH', w: 2.3 }, { t: 'TER', w: 2.0 }, { t: 'NET', w: 1.9 }],
  ARKK: [{ t: 'TSLA', w: 9.6 }, { t: 'TEM', w: 5.3 }, { t: 'CRSP', w: 5.0 }, { t: 'AMD', w: 4.7 }, { t: 'HOOD', w: 4.5 }],
  MARS: [{ t: 'SPCX', w: 23.0 }, { t: 'RKLB', w: 9.6 }, { t: 'ASTS', w: 6.8 }, { t: 'GSAT', w: 4.8 }, { t: 'PL', w: 4.5 }],
  FRWD: [{ t: 'STX', w: 8.6 }, { t: 'NVDA', w: 8.2 }, { t: 'AMD', w: 7.1 }, { t: 'TSM', w: 5.9 }, { t: 'WDC', w: 5.9 }],
  BCTK: [{ t: 'TSM', w: 8.7 }, { t: 'SPCX', w: 8.4 }, { t: 'LRCX', w: 8.1 }, { t: 'AVGO', w: 6.9 }, { t: 'NVDA', w: 6.0 }],
  FWD: [{ t: 'AMD', w: 2.1 }, { t: 'AMAT', w: 2.0 }, { t: 'LRCX', w: 2.0 }, { t: 'SPCX', w: 2.0 }, { t: 'GOOGL', w: 1.9 }],
  CBSE: [{ t: 'LRCX', w: 3.0 }, { t: 'SBUX', w: 3.0 }, { t: 'SCI', w: 3.0 }, { t: 'KRYS', w: 2.9 }, { t: 'KLAC', w: 2.9 }],
  FCUS: [{ t: 'WDC', w: 5.5 }, { t: 'SNDK', w: 5.3 }, { t: 'INTC', w: 5.2 }, { t: 'BE', w: 5.0 }, { t: 'STX', w: 4.9 }],
  WGMI: [{ t: 'CIFR', w: 17.4 }, { t: 'IREN', w: 11.4 }, { t: 'WULF', w: 9.5 }, { t: 'KEEL', w: 7.8 }, { t: 'CORZ', w: 7.3 }],
  CNEQ: [{ t: 'NVDA', w: 13.4 }, { t: 'MSFT', w: 6.3 }, { t: 'TSM', w: 5.8 }, { t: 'AMZN', w: 5.8 }, { t: 'GOOG', w: 5.7 }],
  SGRT: [{ t: 'WDC', w: 10.2 }, { t: 'MU', w: 8.1 }, { t: 'LITE', w: 7.8 }, { t: 'NVDA', w: 6.4 }, { t: 'ARW', w: 4.8 }],
  SPMO: [{ t: 'MU', w: 11.3 }, { t: 'NVDA', w: 7.8 }, { t: 'AVGO', w: 6.3 }, { t: 'GOOGL', w: 4.3 }, { t: 'AMD', w: 4.1 }],
  XMMO: [{ t: 'CW', w: 4.1 }, { t: 'STRL', w: 3.7 }, { t: 'TTMI', w: 3.5 }, { t: 'ATI', w: 3.3 }, { t: 'FTI', w: 3.1 }],
  POW: [{ t: 'PWR', w: 4.8 }, { t: 'POWL', w: 4.8 }, { t: 'PRY', w: 4.3 }, { t: 'ETN', w: 3.9 }, { t: 'NVT', w: 3.7 }],
  VOLT: [{ t: 'BELFB', w: 7.6 }, { t: 'POWL', w: 7.3 }, { t: 'PWR', w: 5.3 }, { t: 'ETN', w: 5.2 }, { t: 'NEE', w: 4.9 }],
  PBD: [{ t: 'ENRG', w: 1.1 }, { t: 'ALFEN', w: 1.1 }, { t: 'SHLS', w: 1.1 }],
  PBW: [{ t: 'FCEL', w: 4.0 }, { t: 'HYLN', w: 3.2 }, { t: 'BE', w: 2.8 }, { t: 'NVTS', w: 2.5 }, { t: 'ASPN', w: 2.2 }],
  IVEP: [{ t: 'BE', w: 5.8 }, { t: 'PWR', w: 4.2 }, { t: 'GEV', w: 4.1 }, { t: 'VRT', w: 4.0 }, { t: 'COHR', w: 4.0 }],
  AIRR: [{ t: 'STRL', w: 6.3 }, { t: 'FIX', w: 4.5 }, { t: 'AGX', w: 4.4 }, { t: 'MTZ', w: 4.0 }, { t: 'CHRW', w: 3.9 }],
  PRN: [{ t: 'TTMI', w: 6.4 }, { t: 'FIX', w: 4.8 }, { t: 'AGX', w: 4.6 }, { t: 'STRL', w: 4.4 }, { t: 'VICR', w: 4.2 }],
  RSHO: [{ t: 'TKR', w: 8.7 }, { t: 'POWL', w: 7.3 }, { t: 'CGNX', w: 7.2 }, { t: 'CAT', w: 6.9 }, { t: 'AIT', w: 6.0 }],
  IDEF: [{ t: 'RTX', w: 8.3 }, { t: 'LMT', w: 6.8 }, { t: 'BA', w: 5.2 }, { t: 'GD', w: 4.4 }, { t: 'NOC', w: 3.3 }],
  BILT: [{ t: 'UNP', w: 5.6 }, { t: 'AEP', w: 4.6 }, { t: 'AENA', w: 4.5 }, { t: 'XEL', w: 4.2 }, { t: 'TRP', w: 3.5 }],
  BUZZ: [{ t: 'NBIS', w: 3.8 }, { t: 'MU', w: 3.6 }, { t: 'AMD', w: 3.3 }, { t: 'SMCI', w: 3.3 }, { t: 'MRVL', w: 3.3 }],
  MEME: [{ t: 'AAOI', w: 7.8 }, { t: 'BE', w: 7.4 }, { t: 'NBIS', w: 6.9 }, { t: 'SNDK', w: 6.3 }, { t: 'LITE', w: 6.3 }],
  RKNG: [{ t: 'SNDK', w: 7.6 }, { t: 'MU', w: 6.3 }, { t: 'WDC', w: 5.9 }, { t: 'CRDO', w: 5.7 }, { t: 'NBIS', w: 5.5 }],
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
  SGRT: { name: "SMART Earnings Growth 30 ETF", manager: "" },
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
  'AI & ML':         { '1W': -4.3, '1M': 2.2, 'YTD': 50.1, '6M': 47.5, '1Y': 84.1 },
  'Semiconductors':  { '1W': -2.2, '1M': 10.3, 'YTD': 123.8, '6M': 120.4, '1Y': 166.1 },
  'Broad Tech':      { '1W': -3.9, '1M': -1.6, 'YTD': 29, '6M': 25.4, '1Y': 48.5 },
  'Electrification': { '1W': -3.6, '1M': -6.8, 'YTD': 30, '6M': 27.4, '1Y': 52.8 },
  'Industrials':     { '1W': 0.5, '1M': 1.1, 'YTD': 26.5, '6M': 23.4, '1Y': 42.9 },
  'Meme':            { '1W': -8.4, '1M': -10.6, 'YTD': 21.7, '6M': 16.7, '1Y': 6.5 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, IndexChartByPeriod> = {
  'AI & ML': {
    '1D': { top10: [100, 102.19, 99.9, 100.96, 101.36, 101.71, 101.19, 101.3, 101.36, 101.49, 102.23, 101.96, 101.83, 101.94, 101.93, 101.78, 101.81, 102.08, 101.75, 101.71, 101.28, 101.35, 101.36, 101.9], spy: [100, 100.14, 100, 100.32, 100.46, 100.62, 99.96, 100.14, 100.21, 100.12, 100.31, 99.94, 99.93, 100, 100, 99.81, 99.82, 100.22, 100.17, 100.06, 99.88, 99.88, 99.8, 100.14], top10Return: 1.9, spyReturn: 0.14, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 100.75, 94.85, 94.01, 95.73], spy: [100, 99.69, 98.24, 98.19, 98.33], top10Return: -4.3, spyReturn: -1.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.83, 101.64, 102.58, 105.61, 107.54, 106.51, 104.88, 95.95, 98.95, 93.94, 98.99, 99.67, 104.88, 101.79, 102.3, 106.7, 107.53, 101.19, 100.3, 102.16], spy: [100, 99.98, 100.53, 100.78, 101.06, 101.2, 100.49, 100.87, 98.26, 98.49, 96.65, 98.29, 98.82, 100.56, 99.97, 98.72, 99.49, 99.17, 97.73, 97.69, 97.83], top10Return: 2.2, spyReturn: -2.2, xLabels: ["May 28", "Jun 4", "Jun 11", "Jun 18", "Jun 25"] },
    'YTD': { top10: [100, 102.26, 104.35, 105.17, 107.24, 97.14, 101.92, 104.13, 104.49, 101.25, 100.28, 103.4, 96.97, 99.39, 106.63, 115.79, 119.47, 122.96, 133.39, 138.24, 135.48, 148.42, 153.24, 136.95, 149.74, 150.09], spy: [100, 101.11, 101.51, 101.04, 101.78, 99.37, 99.9, 101.1, 101.08, 99.91, 97.67, 96.76, 94.6, 96.09, 99.71, 102.89, 103.89, 105.39, 107.61, 108.86, 108.7, 110.66, 111.02, 106.38, 108.66, 107.68], top10Return: 50.1, spyReturn: 7.7, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 101.24, 103.18, 100.71, 105.52, 101.88, 102.25, 100.52, 102.26, 98.05, 100.54, 101.7, 99.18, 95.41, 104.52, 112.52, 119.31, 118.44, 131.18, 132.35, 129, 143.33, 153.24, 134.69, 147.28, 147.63], spy: [100, 99.62, 100.7, 98.16, 100.75, 99.89, 100.26, 98.92, 99.57, 98.55, 98.1, 97.17, 94.62, 94.21, 97.93, 101.4, 103.03, 103.08, 106.3, 106.93, 106.29, 108.71, 109.26, 105.09, 107.34, 106.37], top10Return: 47.5, spyReturn: 6.4, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 101.26, 100.4, 103.83, 105.45, 103.96, 107.54, 108.75, 104.57, 110.35, 109.54, 115.58, 120.24, 117.99, 122.2, 120.89, 123.82, 124.54, 129.68, 124.86, 120.36, 113.65, 122.36, 124.96, 121.13, 121.79, 123.83, 125.43, 127.87, 124.89, 130.85, 126.43, 126.9, 126, 129.35, 124.69, 124.82, 126.3, 123.18, 118.43, 129.86, 139.77, 148.29, 147.21, 163.12, 169.21, 160.48, 178.53, 190.93, 167.7, 183.52, 184.1], spy: [100, 102.2, 101.92, 102.57, 104.12, 101.61, 103.33, 105.41, 103.87, 106.06, 105.78, 107.44, 108.47, 108.16, 109.37, 106.73, 107.97, 109.79, 111.11, 109.55, 109.83, 106.65, 111.69, 112.06, 111.42, 111.23, 112.82, 112.4, 113.61, 110.74, 113.67, 112.69, 113.12, 112.16, 113.28, 111.97, 110.67, 109.63, 106.75, 106.29, 110.48, 114.39, 116.24, 116.3, 119.93, 121.32, 119.92, 122.65, 123.27, 118.56, 121.1, 120.01], top10Return: 84.1, spyReturn: 20, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Semiconductors': {
    '1D': { top10: [100, 104.74, 101.72, 102.58, 103.58, 104.28, 103.26, 103.4, 104.03, 104.25, 105.62, 105.12, 105.12, 105.39, 105.67, 105.25, 105.32, 105.46, 104.84, 104.98, 104.36, 104.6, 104.39, 105.06], spy: [100, 100.14, 100, 100.32, 100.46, 100.62, 99.96, 100.14, 100.21, 100.12, 100.31, 99.94, 99.93, 100, 100, 99.81, 99.82, 100.22, 100.17, 100.06, 99.88, 99.88, 99.8, 100.14], top10Return: 5.1, spyReturn: 0.14, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 103.26, 93.78, 93.16, 97.85], spy: [100, 99.69, 98.24, 98.19, 98.33], top10Return: -2.2, spyReturn: -1.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.16, 100.27, 99.34, 100.71, 105.58, 106.83, 104.03, 91.76, 97.24, 92.49, 101.48, 102.93, 109.08, 103.42, 104.56, 112.46, 116.24, 105.29, 104.7, 110.24], spy: [100, 99.98, 100.53, 100.78, 101.06, 101.2, 100.49, 100.87, 98.26, 98.49, 96.65, 98.29, 98.82, 100.56, 99.97, 98.72, 99.49, 99.17, 97.73, 97.69, 97.83], top10Return: 10.3, spyReturn: -2.2, xLabels: ["May 28", "Jun 4", "Jun 11", "Jun 18", "Jun 25"] },
    'YTD': { top10: [100, 107.01, 113.64, 119.4, 120.25, 115.11, 121.49, 124.3, 123.71, 122.11, 125.63, 132.37, 129.06, 130.72, 139.1, 150.9, 166.43, 175.55, 191.93, 195.07, 188.18, 205.18, 215.33, 198.41, 211.34, 223.81], spy: [100, 101.11, 101.51, 101.04, 101.78, 99.37, 99.9, 101.1, 101.08, 99.91, 97.67, 96.76, 94.6, 96.09, 99.71, 102.89, 103.89, 105.39, 107.61, 108.86, 108.7, 110.66, 111.02, 106.38, 108.66, 107.68], top10Return: 123.8, spyReturn: 7.7, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 104.36, 110.25, 114.62, 116.28, 115.29, 119.64, 122.12, 123.09, 120.87, 125.88, 130.27, 130.49, 126.89, 135.31, 146.95, 161.71, 168.95, 189.29, 189.49, 179.54, 201.55, 214.44, 195.66, 208.3, 220.66], spy: [100, 99.62, 100.7, 98.16, 100.75, 99.89, 100.26, 98.92, 99.57, 98.55, 98.1, 97.17, 94.62, 94.21, 97.93, 101.4, 103.03, 103.08, 106.3, 106.93, 106.29, 108.71, 109.26, 105.09, 107.34, 106.37], top10Return: 120.4, spyReturn: 6.4, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 103.02, 103.49, 106.97, 105.1, 104.75, 107.98, 111.3, 108.56, 113.68, 111.98, 115, 121.5, 121.16, 125.92, 121.05, 128.97, 130.19, 134.2, 133.49, 133.01, 128.29, 141.67, 148.65, 142.4, 145.22, 145.79, 147.07, 149.65, 152.07, 158.96, 156.3, 167.4, 168.41, 173.49, 165.64, 167.85, 170.16, 172.38, 155.36, 172.14, 181.31, 191.01, 204.24, 223.08, 236.98, 224.57, 254.69, 267.99, 234.66, 252.65, 266.08], spy: [100, 102.2, 101.92, 102.57, 104.12, 101.61, 103.33, 105.41, 103.87, 106.06, 105.78, 107.44, 108.47, 108.16, 109.37, 106.73, 107.97, 109.79, 111.11, 109.55, 109.83, 106.65, 111.69, 112.06, 111.42, 111.23, 112.82, 112.4, 113.61, 110.74, 113.67, 112.69, 113.12, 112.16, 113.28, 111.97, 110.67, 109.63, 106.75, 106.29, 110.48, 114.39, 116.24, 116.3, 119.93, 121.32, 119.92, 122.65, 123.27, 118.56, 121.1, 120.01], top10Return: 166.1, spyReturn: 20, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Broad Tech': {
    '1D': { top10: [100, 101.05, 99.82, 100.09, 100.28, 100.49, 100.19, 100.32, 100.49, 100.5, 100.88, 100.78, 100.67, 100.7, 100.7, 100.65, 100.69, 100.86, 100.66, 100.63, 100.45, 100.34, 100.42, 100.74], spy: [100, 100.14, 100, 100.32, 100.46, 100.62, 99.96, 100.14, 100.21, 100.12, 100.31, 99.94, 99.93, 100, 100, 99.81, 99.82, 100.22, 100.17, 100.06, 99.88, 99.88, 99.8, 100.14], top10Return: 0.8, spyReturn: 0.14, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 99.67, 96.39, 95.35, 96.14], spy: [100, 99.69, 98.24, 98.19, 98.33], top10Return: -3.9, spyReturn: -1.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.93, 101.33, 101.87, 103.55, 104.77, 103.46, 103.06, 95.99, 97.76, 93.7, 97.78, 98.33, 101.85, 100.17, 99.79, 102.16, 101.93, 98.52, 97.5, 98.37], spy: [100, 99.98, 100.53, 100.78, 101.06, 101.2, 100.49, 100.87, 98.26, 98.49, 96.65, 98.29, 98.82, 100.56, 99.97, 98.72, 99.49, 99.17, 97.73, 97.69, 97.83], top10Return: -1.6, spyReturn: -2.2, xLabels: ["May 28", "Jun 4", "Jun 11", "Jun 18", "Jun 25"] },
    'YTD': { top10: [100, 103.06, 104.96, 105, 104.88, 96.41, 100.14, 103.01, 104.61, 102.42, 100.7, 102.38, 97.68, 99.57, 105.23, 111.95, 114.97, 116.49, 125.38, 126.62, 123.35, 131.02, 134.18, 123.02, 130.67, 129], spy: [100, 101.11, 101.51, 101.04, 101.78, 99.37, 99.9, 101.1, 101.08, 99.91, 97.67, 96.76, 94.6, 96.09, 99.71, 102.89, 103.89, 105.39, 107.61, 108.86, 108.7, 110.66, 111.02, 106.38, 108.66, 107.68], top10Return: 29, spyReturn: 7.7, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 100.87, 103.25, 101.22, 104, 99.62, 99.91, 99.54, 101.2, 99.68, 100.36, 100.56, 98.38, 96.15, 103.2, 108.9, 113.67, 111.36, 122.75, 122.9, 118.31, 126.92, 132.1, 120.44, 127.89, 126.24], spy: [100, 99.62, 100.7, 98.16, 100.75, 99.89, 100.26, 98.92, 99.57, 98.55, 98.1, 97.17, 94.62, 94.21, 97.93, 101.4, 103.03, 103.08, 106.3, 106.93, 106.29, 108.71, 109.26, 105.09, 107.34, 106.37], top10Return: 25.4, spyReturn: 6.4, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.4, 101.08, 104.48, 105.25, 102.9, 104.44, 105.26, 103.73, 107.75, 106.9, 111.31, 116.09, 114.85, 118.52, 118.18, 120.74, 120.06, 122.11, 120.95, 114.08, 109.59, 117.9, 117.75, 116.1, 115.75, 116.58, 118.25, 120.66, 119.61, 123.9, 120.28, 120.38, 119.64, 122.38, 121.3, 118.78, 121.81, 121.19, 117.94, 123.94, 129.04, 134.19, 131.26, 143.3, 143.38, 138.5, 148.75, 154.23, 142.1, 150.17, 148.47], spy: [100, 102.2, 101.92, 102.57, 104.12, 101.61, 103.33, 105.41, 103.87, 106.06, 105.78, 107.44, 108.47, 108.16, 109.37, 106.73, 107.97, 109.79, 111.11, 109.55, 109.83, 106.65, 111.69, 112.06, 111.42, 111.23, 112.82, 112.4, 113.61, 110.74, 113.67, 112.69, 113.12, 112.16, 113.28, 111.97, 110.67, 109.63, 106.75, 106.29, 110.48, 114.39, 116.24, 116.3, 119.93, 121.32, 119.92, 122.65, 123.27, 118.56, 121.1, 120.01], top10Return: 48.5, spyReturn: 20, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Electrification': {
    '1D': { top10: [100, 101.43, 100.3, 100.37, 100.58, 100.72, 100.52, 100.47, 100.41, 100.23, 100.59, 100.46, 100.49, 100.51, 100.47, 100.38, 100.25, 100.31, 100.23, 100.06, 100.04, 100, 100.18, 100.51], spy: [100, 100.14, 100, 100.32, 100.46, 100.62, 99.96, 100.14, 100.21, 100.12, 100.31, 99.94, 99.93, 100, 100, 99.81, 99.82, 100.22, 100.17, 100.06, 99.88, 99.88, 99.8, 100.14], top10Return: 0.5, spyReturn: 0.14, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 101.06, 96.59, 95.89, 96.4], spy: [100, 99.69, 98.24, 98.19, 98.33], top10Return: -3.6, spyReturn: -1.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.17, 99.25, 98.2, 97.87, 99.92, 98.87, 98.79, 92.68, 92.79, 88.74, 92.36, 93.24, 95.34, 94.37, 94.35, 96.51, 97.56, 93.26, 92.63, 93.17], spy: [100, 99.98, 100.53, 100.78, 101.06, 101.2, 100.49, 100.87, 98.26, 98.49, 96.65, 98.29, 98.82, 100.56, 99.97, 98.72, 99.49, 99.17, 97.73, 97.69, 97.83], top10Return: -6.8, spyReturn: -2.2, xLabels: ["May 28", "Jun 4", "Jun 11", "Jun 18", "Jun 25"] },
    'YTD': { top10: [100, 103.61, 108.42, 111.38, 112.44, 109.91, 114.31, 115.68, 118.29, 112.19, 112.3, 114.56, 112.75, 113.26, 118.81, 122.86, 127.92, 132.22, 137.4, 136.25, 129.44, 137.9, 137.79, 126.13, 131.94, 130], spy: [100, 101.11, 101.51, 101.04, 101.78, 99.37, 99.9, 101.1, 101.08, 99.91, 97.67, 96.76, 94.6, 96.09, 99.71, 102.89, 103.89, 105.39, 107.61, 108.86, 108.7, 110.66, 111.02, 106.38, 108.66, 107.68], top10Return: 30, spyReturn: 7.7, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 102.37, 104.74, 106.42, 110.09, 110.73, 112.5, 112.88, 116.38, 111.26, 110.88, 112.96, 112.74, 110.27, 115.6, 120.18, 124.71, 125.37, 134.82, 132.77, 124.49, 134.96, 135.28, 123.77, 129.44, 127.59], spy: [100, 99.62, 100.7, 98.16, 100.75, 99.89, 100.26, 98.92, 99.57, 98.55, 98.1, 97.17, 94.62, 94.21, 97.93, 101.4, 103.03, 103.08, 106.3, 106.93, 106.29, 108.71, 109.26, 105.09, 107.34, 106.37], top10Return: 27.4, spyReturn: 6.4, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 103.32, 104.1, 107.4, 109.26, 104.81, 106.5, 108.28, 108.62, 111.29, 110.87, 110.95, 115.43, 115.86, 121.17, 121.57, 126.47, 125.32, 126.93, 126.77, 123.49, 119.05, 126.79, 127.46, 126.54, 127.72, 127.67, 127.49, 130.64, 131.92, 136.25, 135.94, 135.86, 136.21, 138.55, 136.23, 136.1, 137.89, 139.95, 137.62, 144.28, 148.82, 151.88, 150.02, 159.27, 161.11, 152.77, 162.52, 162.72, 150.41, 156.68, 152.82], spy: [100, 102.2, 101.92, 102.57, 104.12, 101.61, 103.33, 105.41, 103.87, 106.06, 105.78, 107.44, 108.47, 108.16, 109.37, 106.73, 107.97, 109.79, 111.11, 109.55, 109.83, 106.65, 111.69, 112.06, 111.42, 111.23, 112.82, 112.4, 113.61, 110.74, 113.67, 112.69, 113.12, 112.16, 113.28, 111.97, 110.67, 109.63, 106.75, 106.29, 110.48, 114.39, 116.24, 116.3, 119.93, 121.32, 119.92, 122.65, 123.27, 118.56, 121.1, 120.01], top10Return: 52.8, spyReturn: 20, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Industrials': {
    '1D': { top10: [100, 101.81, 101.4, 102.13, 102.55, 102.58, 101.97, 101.9, 101.44, 101.36, 101.55, 101.41, 101.63, 101.63, 101.47, 101.26, 101.15, 101.42, 101.22, 101.1, 100.9, 100.78, 100.95, 101.41], spy: [100, 100.14, 100, 100.32, 100.46, 100.62, 99.96, 100.14, 100.21, 100.12, 100.31, 99.94, 99.93, 100, 100, 99.81, 99.82, 100.22, 100.17, 100.06, 99.88, 99.88, 99.8, 100.14], top10Return: 1.2, spyReturn: 0.14, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 101.08, 99.74, 99.16, 100.53], spy: [100, 99.69, 98.24, 98.19, 98.33], top10Return: 0.5, spyReturn: -1.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 100, 100.47, 99.82, 98.35, 99.63, 99.38, 100.34, 97.56, 97.7, 96.06, 98.25, 99.37, 99.4, 99.8, 99.53, 99.88, 101.01, 99.63, 99.04, 100.44], spy: [100, 99.98, 100.53, 100.78, 101.06, 101.2, 100.49, 100.87, 98.26, 98.49, 96.65, 98.29, 98.82, 100.56, 99.97, 98.72, 99.49, 99.17, 97.73, 97.69, 97.83], top10Return: 1.1, spyReturn: -2.2, xLabels: ["May 28", "Jun 4", "Jun 11", "Jun 18", "Jun 25"] },
    'YTD': { top10: [100, 105.14, 110.48, 111.3, 111.44, 111.22, 116.08, 119.86, 119.6, 114.59, 111.47, 112.15, 110.97, 112.97, 119.22, 118.71, 120.82, 121.6, 126.6, 124.38, 120.11, 126.14, 125.85, 120.36, 125.04, 126.48], spy: [100, 101.11, 101.51, 101.04, 101.78, 99.37, 99.9, 101.1, 101.08, 99.91, 97.67, 96.76, 94.6, 96.09, 99.71, 102.89, 103.89, 105.39, 107.61, 108.86, 108.7, 110.66, 111.02, 106.38, 108.66, 107.68], top10Return: 26.5, spyReturn: 7.7, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 102.18, 105.81, 108.01, 109.45, 110.3, 113.95, 115.66, 117.14, 115.75, 111.8, 110.92, 109.82, 107.53, 114.61, 117.37, 117.63, 115.89, 123.05, 122.09, 116.6, 122.96, 122.22, 117.97, 122.51, 123.9], spy: [100, 99.62, 100.7, 98.16, 100.75, 99.89, 100.26, 98.92, 99.57, 98.55, 98.1, 97.17, 94.62, 94.21, 97.93, 101.4, 103.03, 103.08, 106.3, 106.93, 106.29, 108.71, 109.26, 105.09, 107.34, 106.37], top10Return: 23.4, spyReturn: 6.4, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.58, 102.96, 104.56, 106.18, 103.91, 105.28, 106.65, 104.77, 107.96, 107.18, 109.08, 110.78, 110.62, 112.93, 110.76, 112.25, 113.56, 114.43, 112.45, 109.38, 105.88, 111.27, 111.99, 113.32, 113.57, 114.98, 118.1, 122.54, 124.57, 126.76, 128.71, 132.09, 133.55, 134.28, 132.28, 127.76, 126.82, 127, 125.3, 132.84, 134.59, 135.81, 133.6, 141.5, 140.11, 133.92, 141.18, 140.99, 135.9, 141.25, 142.92], spy: [100, 102.2, 101.92, 102.57, 104.12, 101.61, 103.33, 105.41, 103.87, 106.06, 105.78, 107.44, 108.47, 108.16, 109.37, 106.73, 107.97, 109.79, 111.11, 109.55, 109.83, 106.65, 111.69, 112.06, 111.42, 111.23, 112.82, 112.4, 113.61, 110.74, 113.67, 112.69, 113.12, 112.16, 113.28, 111.97, 110.67, 109.63, 106.75, 106.29, 110.48, 114.39, 116.24, 116.3, 119.93, 121.32, 119.92, 122.65, 123.27, 118.56, 121.1, 120.01], top10Return: 42.9, spyReturn: 20, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Meme': {
    '1D': { top10: [100, 102.44, 98.95, 97.48, 98.63, 99.29, 98.92, 98.86, 98.17, 98.21, 98.15, 98.99, 99.26, 98.56, 98.57, 98.74, 98.44, 98.53, 98.31, 98.55, 98.1, 97.62, 98.2, 98.7], spy: [100, 100.14, 100, 100.32, 100.46, 100.62, 99.96, 100.14, 100.21, 100.12, 100.31, 99.94, 99.93, 100, 100, 99.81, 99.82, 100.22, 100.17, 100.06, 99.88, 99.88, 99.8, 100.14], top10Return: 0.1, spyReturn: 0.14, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 99.86, 95.23, 92.04, 91.53], spy: [100, 99.69, 98.24, 98.19, 98.33], top10Return: -8.4, spyReturn: -1.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 101.49, 103.34, 102.02, 102.24, 104.7, 101.07, 101.6, 91.3, 93.63, 87.84, 93.47, 92.31, 97.44, 93.66, 94.22, 97.55, 97.4, 92.92, 89.84, 89.37], spy: [100, 99.98, 100.53, 100.78, 101.06, 101.2, 100.49, 100.87, 98.26, 98.49, 96.65, 98.29, 98.82, 100.56, 99.97, 98.72, 99.49, 99.17, 97.73, 97.69, 97.83], top10Return: -10.6, spyReturn: -2.2, xLabels: ["May 28", "Jun 4", "Jun 11", "Jun 18", "Jun 25"] },
    'YTD': { top10: [100, 108.03, 108.23, 107.22, 102.68, 89.95, 92.02, 92.18, 95.18, 93.73, 92.78, 93.4, 89.34, 91.36, 100.37, 113.7, 112.18, 115.44, 124.96, 125.75, 126.77, 143.03, 135.95, 122.9, 130.54, 121.71], spy: [100, 101.11, 101.51, 101.04, 101.78, 99.37, 99.9, 101.1, 101.08, 99.91, 97.67, 96.76, 94.6, 96.09, 99.71, 102.89, 103.89, 105.39, 107.61, 108.86, 108.7, 110.66, 111.02, 106.38, 108.66, 107.68], top10Return: 21.7, spyReturn: 7.7, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 104.83, 107.25, 105.03, 103.07, 98.58, 94.69, 90.16, 92.79, 90.85, 91.58, 92.06, 91.16, 89.63, 97.73, 109.65, 113.31, 110.46, 122.8, 121.18, 121.44, 138.25, 132.51, 120.82, 128.34, 119.66], spy: [100, 99.62, 100.7, 98.16, 100.75, 99.89, 100.26, 98.92, 99.57, 98.55, 98.1, 97.17, 94.62, 94.21, 97.93, 101.4, 103.03, 103.08, 106.3, 106.93, 106.29, 108.71, 109.26, 105.09, 107.34, 106.37], top10Return: 16.7, spyReturn: 6.4, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.27, 100.31, 96.36, 95.87, 89.8, 89.99, 87.82, 83.01, 83.44, 83.85, 87.17, 89.82, 89.34, 86.77, 91.09, 90.34, 89.38, 93.55, 91.84, 90.29, 84.52, 84.59, 88.38, 87.42, 86.51, 88.02, 90.88, 92.91, 91.63, 93.79, 91.46, 88.73, 90.69, 90.12, 90.53, 96.17, 99.37, 97.36, 92.19, 97.47, 106.43, 111.85, 110.52, 112.23, 115.27, 111.17, 117.84, 112.77, 113.87, 113.64, 106.53], spy: [100, 102.2, 101.92, 102.57, 104.12, 101.61, 103.33, 105.41, 103.87, 106.06, 105.78, 107.44, 108.47, 108.16, 109.37, 106.73, 107.97, 109.79, 111.11, 109.55, 109.83, 106.65, 111.69, 112.06, 111.42, 111.23, 112.82, 112.4, 113.61, 110.74, 113.67, 112.69, 113.12, 112.16, 113.28, 111.97, 110.67, 109.63, 106.75, 106.29, 110.48, 114.39, 116.24, 116.3, 119.93, 121.32, 119.92, 122.65, 123.27, 118.56, 121.1, 120.01], top10Return: 6.5, spyReturn: 20, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
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
export const SCAN_TIMESTAMP    = '2026-06-25T21:54:08.789Z';
export const SCAN_TIMESTAMP_NY = 'June 25, 2026 at 5:54 PM ET';
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
  { ticker: 'NVDA', name: `NVIDIA Corp`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 13.00, bestProScore: 6.22, avgProScore: 4.33, price: 195.74, weeklyChange: -7.10 },
  { ticker: 'MU', name: `Micron Technology Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 12.83, bestProScore: 5.55, avgProScore: 4.28, price: 1213.56, weeklyChange: 7.02 },
  { ticker: 'AMD', name: `Advanced Micro Devices Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 10.42, bestProScore: 4.96, avgProScore: 3.47, price: 532.57, weeklyChange: -0.89 },
  { ticker: 'AVGO', name: `Broadcom Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 6.55, bestProScore: 2.90, avgProScore: 2.18, price: 378.91, weeklyChange: -7.89 },
  { ticker: 'INTC', name: `INTEL CORPORATION`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.85, bestProScore: 3.55, avgProScore: 2.42, price: 132.87, weeklyChange: -0.84 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 4.80, bestProScore: 2.81, avgProScore: 2.40, price: 309.20, weeklyChange: 4.04 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.74, bestProScore: 2.94, avgProScore: 2.37, price: 434.99, weeklyChange: -5.87 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.48, bestProScore: 2.58, avgProScore: 2.24, price: 281.26, weeklyChange: -9.44 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 3.87, bestProScore: 2.52, avgProScore: 1.94, price: 401.82, weeklyChange: 3.29 },
  { ticker: 'WDC', name: `Western Digital Corp`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 3.59, bestProScore: 2.28, avgProScore: 1.79, price: 675.39, weeklyChange: -9.49 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': -1.8, '1M': 9.5, 'YTD': 122.4, '6M': 121.5, '1Y': 199.9 },
  ARTY: { '1W': -5.2, '1M': 4.3, 'YTD': 55.2, '6M': 54.1, '1Y': 83.6 },
  BAI:  { '1W': -3.3, '1M': 2.9, 'YTD': 54.5, '6M': 51.3, '1Y': 79.9 },
  IGPT: { '1W': -3.3, '1M': 5.4, 'YTD': 73.1, '6M': 72.4, '1Y': 111.9 },
  IVES: { '1W': -5.7, '1M': -5.7, 'YTD': 13.5, '6M': 10.8, '1Y': 32.9 },
  ALAI: { '1W': -5.5, '1M': 0.1, 'YTD': 22.4, '6M': 19.4, '1Y': 45.1 },
  CHAT: { '1W': -4.5, '1M': 3.8, 'YTD': 65.8, '6M': 60.1, '1Y': 101.3 },
  AIFD: { '1W': -4.5, '1M': 1, 'YTD': 40.3, '6M': 38.2, '1Y': 73.1 },
  SPRX: { '1W': -5.5, '1M': -0.4, 'YTD': 42.2, '6M': 37.1, '1Y': 85.6 },
  AOTG: { '1W': -3.5, '1M': 0.7, 'YTD': 11.6, '6M': 9.7, '1Y': 27.6 },
  // Semiconductors
  SOXX: { '1W': -2.2, '1M': 9.7, 'YTD': 107.6, '6M': 104.2, '1Y': 161.5 },
  PSI:  { '1W': -0.5, '1M': 9.7, 'YTD': 124.9, '6M': 119.4, '1Y': 194 },
  XSD:  { '1W': -6.1, '1M': -5.5, 'YTD': 85.8, '6M': 81, '1Y': 131.8 },
  DRAM: { '1W': 0.2, '1M': 27.1, 'YTD': 177, '6M': 177, '1Y': 177 },
  // Broad Tech
  PTF:  { '1W': -3.6, '1M': 1.7, 'YTD': 72.9, '6M': 67.1, '1Y': 95 },
  WCLD: { '1W': -1.9, '1M': -3.9, 'YTD': -17.2, '6M': -18.4, '1Y': -18.9 },
  IGV:  { '1W': -4.9, '1M': -9.9, 'YTD': -19.8, '6M': -21.7, '1Y': -22 },
  FDTX: { '1W': -3.1, '1M': 6.2, 'YTD': 37.8, '6M': 36.1, '1Y': 45.4 },
  GTEK: { '1W': -3.1, '1M': 2.1, 'YTD': 50.4, '6M': 49.5, '1Y': 67.3 },
  ARKK: { '1W': -4.6, '1M': -0.9, 'YTD': -0.5, '6M': -5.1, '1Y': 7.8 },
  MARS: { '1W': -15.4, '1M': -37.1, 'YTD': 12, '6M': 12, '1Y': 12 },
  FRWD: { '1W': -4.6, '1M': 3.2, 'YTD': 32, '6M': 32, '1Y': 32 },
  BCTK: { '1W': -4.3, '1M': 0.5, 'YTD': 21.9, '6M': 19.4, '1Y': 24 },
  FWD:  { '1W': -1.6, '1M': 2.6, 'YTD': 38.7, '6M': 35.9, '1Y': 63.4 },
  CBSE: { '1W': -1.4, '1M': 0.7, 'YTD': 29.4, '6M': 26, '1Y': 38.5 },
  FCUS: { '1W': -1.4, '1M': -0.6, 'YTD': 43.7, '6M': 34.4, '1Y': 77.5 },
  WGMI: { '1W': -9.9, '1M': 0.2, 'YTD': 69.7, '6M': 55.3, '1Y': 202 },
  CNEQ: { '1W': -5.4, '1M': -2.1, 'YTD': 15.1, '6M': 12.6, '1Y': 35.4 },
  SGRT: { '1W': 0.1, '1M': 2.2, 'YTD': 49.5, '6M': 44.8, '1Y': 87 },
  SPMO: { '1W': -0.2, '1M': 6.6, 'YTD': 33.8, '6M': 31.4, '1Y': 43.5 },
  XMMO: { '1W': -0.4, '1M': 1, 'YTD': 23.6, '6M': 20.8, '1Y': 34.1 },
  // Electrification
  POW:  { '1W': -2.5, '1M': -5.8, 'YTD': 54.9, '6M': 53.2, '1Y': 50.4 },
  VOLT: { '1W': 1.6, '1M': 3.7, 'YTD': 44.5, '6M': 42.1, '1Y': 66.8 },
  PBD:  { '1W': -5.4, '1M': -14.3, 'YTD': 19.5, '6M': 17.2, '1Y': 52.6 },
  PBW:  { '1W': -9.8, '1M': -16.1, 'YTD': 22.7, '6M': 16.3, '1Y': 86 },
  IVEP: { '1W': -1.9, '1M': -1.7, 'YTD': 8.4, '6M': 8.4, '1Y': 8.4 },
  // Industrials
  AIRR: { '1W': 1.5, '1M': 3.6, 'YTD': 35.2, '6M': 30.8, '1Y': 65.1 },
  PRN:  { '1W': 1, '1M': 4.7, 'YTD': 47.7, '6M': 41.9, '1Y': 67.1 },
  RSHO: { '1W': 2.2, '1M': 9.1, 'YTD': 39.4, '6M': 36.3, '1Y': 58.5 },
  IDEF: { '1W': -4.1, '1M': -8, 'YTD': 0.6, '6M': -1.6, '1Y': 11 },
  BILT: { '1W': 2.1, '1M': -3.9, 'YTD': 9.6, '6M': 9.6, '1Y': 12.8 },
  // Meme
  BUZZ: { '1W': -7.2, '1M': -8.6, 'YTD': 8.5, '6M': 4.4, '1Y': 17.5 },
  MEME: { '1W': -11.1, '1M': -18.8, 'YTD': 48.2, '6M': 37.4, '1Y': -6.4 },
  RKNG: { '1W': -7, '1M': -4.5, 'YTD': 8.4, '6M': 8.4, '1Y': 8.4 },
};
// @@END_GENERATED:ETF_RETURNS@@

// @@GENERATED:ETF_DAY_CHANGE@@
// Today's % move per ETF ticker (1D, vs prior close). Refreshed by the 3×/day
// price jobs. Powers the 1D ranking in the theme-ETF side panel.
export const ETF_DAY_CHANGE: Record<string, number> = {
  AIS:  4.63,
  ARTY: 1.1,
  BAI:  3.52,
  IGPT: 3.09,
  IVES: -0.75,
  ALAI: 0.17,
  CHAT: 2.11,
  AIFD: 2.35,
  SPRX: 1.35,
  AOTG: 1.76,
  SOXX: 3.94,
  PSI:  5.08,
  XSD:  1.29,
  DRAM: 9.95,
  PTF:  4.25,
  WCLD: -1.73,
  IGV:  -1.64,
  FDTX: 1.94,
  GTEK: 0.4,
  ARKK: -0.23,
  MARS: -3.31,
  FRWD: 1.55,
  BCTK: 0.75,
  FWD:  2.6,
  CBSE: 1.45,
  FCUS: 2.59,
  WGMI: -2.74,
  CNEQ: -0.8,
  SGRT: 3.17,
  SPMO: 3.8,
  XMMO: 1.28,
  POW:  0.73,
  VOLT: 2.25,
  PBD:  -0.36,
  PBW:  -0.82,
  IVEP: 0.75,
  AIRR: 1.87,
  PRN:  2.8,
  IDEF: -0.45,
  BILT: 0.76,
  BUZZ: -1.51,
  MEME: -1.08,
  RKNG: 2.94,
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
  'AI & ML': { etfs: ['AIS', 'AOTG', 'SPRX'], series: { '1W': [100, 101.4, 94.9, 94.05, 96.38], '1M': [100, 100.16, 101.99, 101.62, 103.66, 106.87, 106.09, 104.64, 94.8, 98.17, 93.05, 99.12, 100.16, 105.27, 101.31, 102.17, 107.11, 108.66, 101.64, 100.73, 103.27], 'YTD': [100, 102.87, 105.65, 107.25, 108.86, 96.78, 101.6, 103.63, 104.97, 101.61, 99.89, 103.51, 96.84, 98.32, 106.68, 115.69, 120.39, 123.67, 133.9, 140.87, 138.48, 154.88, 159.26, 141.03, 156.04, 158.71], '6M': [100, 102.34, 104.42, 103.02, 107.24, 103.6, 103.79, 100.62, 103.02, 99.06, 100.76, 102.45, 99.74, 94.87, 105.1, 112.62, 120.41, 119.07, 132.12, 134.57, 131.29, 150.07, 159.75, 139.17, 153.99, 156.66], '1Y': [100, 101.1, 100.41, 104.56, 106.38, 105.19, 109.75, 110.45, 106.19, 112.55, 110.78, 117.69, 123.62, 120.95, 126.32, 125.53, 128.28, 129.73, 135.07, 130.38, 124.22, 116.07, 126.28, 128.91, 124.9, 126.33, 128.39, 131.57, 134.35, 132.77, 138.22, 133.76, 134.07, 131.05, 135.88, 131.72, 130.19, 132.5, 129.07, 122.58, 136.13, 145.83, 156.12, 154.4, 171.56, 180.84, 170.57, 195.4, 208.19, 181.07, 200.72, 204.39] }, returns: { '1W': -3.6, '1M': 3.3, 'YTD': 58.7, '6M': 56.7, '1Y': 104.4 } },
  'Semiconductors': { etfs: ['DRAM', 'PSI', 'XSD'], series: { '1W': [100, 103.53, 93.58, 92.85, 97.88], '1M': [100, 99.23, 100.39, 99.18, 100.84, 105.4, 106.44, 103.47, 90.78, 96.24, 91.65, 101, 102.37, 108.69, 103.33, 104.35, 112.56, 116.68, 105.11, 104.43, 110.43], 'YTD': [100, 107.31, 114.2, 120.61, 120.35, 116.86, 123.08, 125.95, 125.45, 125.43, 130.96, 138.83, 135.68, 136.82, 143.56, 156.26, 173.09, 182.99, 199.8, 201.63, 193.32, 210.54, 220.39, 204.61, 215.4, 229.22], '6M': [100, 104.5, 111.02, 116.08, 116.79, 116.07, 121.24, 124.26, 124.69, 124.69, 130.94, 136.64, 136.85, 133.39, 140.07, 152.17, 168.59, 176.26, 197.18, 196.46, 185.29, 207.31, 218.85, 201.9, 212.41, 226.12], '1Y': [100, 103.42, 103.67, 108.23, 106.46, 106.59, 110.4, 112.97, 110.96, 116.36, 114.86, 117.7, 124.92, 124.07, 128.86, 123.47, 131.67, 133.01, 136.35, 136.51, 137.01, 133.67, 147.52, 155.06, 148.11, 151.82, 151.72, 151.75, 153.47, 155.72, 163, 160.21, 174.2, 174.65, 180.01, 173.23, 176.56, 179.44, 182.3, 161.32, 177.87, 185.71, 194.48, 209.57, 226.77, 242.32, 230.17, 260.95, 271.48, 237.37, 253.25, 267.61] }, returns: { '1W': -2.1, '1M': 10.4, 'YTD': 129.2, '6M': 126.1, '1Y': 167.6 } },
  'Broad Tech': { etfs: ['WGMI', 'PTF', 'SGRT'], series: { '1W': [100, 101.18, 96.68, 93.97, 95.52], '1M': [100, 101.9, 102.25, 101.28, 103.3, 105.97, 105.66, 104, 94.15, 97.56, 91.61, 97.79, 100.02, 104.42, 102.57, 102.69, 106.25, 107.46, 102.75, 99.79, 101.33], 'YTD': [100, 107.37, 113.44, 113.75, 116.83, 101.6, 110.12, 112.37, 116.08, 109.7, 107.02, 111.73, 105.25, 105.85, 119.91, 127.7, 134.51, 133.73, 152.7, 152.99, 146.88, 165.77, 168.59, 148.37, 166.46, 164.03], '6M': [100, 105.48, 109.11, 110.36, 114.8, 109.99, 108.94, 107.5, 112.95, 106.88, 105.7, 108.63, 108.05, 100.69, 115.19, 123.15, 130.45, 124.19, 148.43, 146.17, 138.45, 160.5, 166.45, 144.22, 161.78, 159.45], '1Y': [100, 108.43, 104.98, 111.38, 112.64, 108.25, 110.72, 115.12, 114.39, 120.57, 121.09, 135.79, 145.43, 142.36, 154.52, 162.12, 169.33, 162.22, 169.13, 169.14, 140.65, 136.36, 156, 153.84, 148.62, 146.32, 144.39, 153.59, 157.3, 161.45, 168.12, 162.52, 156.68, 152.44, 157.64, 155.46, 145.81, 152.59, 156.12, 148.65, 164.15, 177.89, 186.44, 179.98, 214.51, 207.44, 202.33, 231.6, 234.7, 210.91, 233.81, 228.02] }, returns: { '1W': -4.5, '1M': 1.3, 'YTD': 64, '6M': 59.4, '1Y': 128 } },
  'Electrification': { etfs: ['VOLT', 'POW', 'PBW'], series: { '1W': [100, 101.06, 96.45, 95.69, 96.42], '1M': [100, 99.41, 99.38, 98.37, 97.97, 100.1, 98.96, 98.85, 92.08, 92.77, 88.59, 92.69, 93.46, 95.98, 94.92, 95.03, 97.27, 98.34, 93.89, 93.2, 93.96], 'YTD': [100, 104.13, 109.93, 113.55, 115.16, 110.83, 117.42, 119.25, 121.85, 114.21, 114.69, 117.34, 114.37, 116.34, 123.8, 127.86, 135.67, 141.8, 147.78, 147.19, 138.43, 148.98, 148.05, 132.77, 142.43, 140.7], '6M': [100, 102.74, 104.88, 107.52, 111.71, 112.28, 114.69, 115.65, 119.31, 112.93, 113.19, 114.85, 115.06, 112.28, 119.35, 124.41, 130.83, 132.34, 144.33, 142.87, 131.66, 145.39, 144.64, 129.61, 139.05, 137.43], '1Y': [100, 103.41, 104.54, 108.85, 110.16, 105, 106.8, 108.8, 109.17, 111.99, 110.89, 110.55, 116.84, 118.49, 124.49, 125.07, 130.57, 129.45, 130.86, 129.61, 126.1, 121.83, 131.48, 133.05, 131.38, 133.13, 134.36, 133.8, 136.95, 138.06, 142.51, 142.47, 142.23, 142.43, 145.46, 144.87, 143.98, 145.73, 150.29, 147.11, 156.54, 162.01, 166.5, 161.24, 172.16, 175.33, 164.98, 175.2, 174.94, 162.99, 172.07, 167.7] }, returns: { '1W': -3.6, '1M': -6, 'YTD': 40.7, '6M': 37.4, '1Y': 67.7 } },
  'Industrials': { etfs: ['PRN', 'RSHO', 'BILT'], series: { '1W': [100, 101.84, 100.76, 99.95, 101.75], '1M': [100, 99.94, 99.46, 98.95, 97.76, 99.81, 100.04, 100.48, 97.73, 97.9, 97.15, 97.89, 100, 99.5, 99.98, 99.76, 100.44, 102.33, 101.2, 100.35, 102.19], 'YTD': [100, 102.86, 107.52, 108.43, 109.5, 110.83, 116.72, 119.52, 119.99, 114.24, 110.81, 111.52, 112.15, 113.47, 120.42, 119.43, 122.48, 123.42, 129.56, 127.82, 122.66, 128.76, 129.56, 125.04, 129.03, 132.21], '6M': [100, 100.92, 103.04, 105.53, 106.96, 108.43, 113.57, 116.64, 117.69, 115.79, 111.32, 110.29, 110.3, 107.88, 114.59, 118.56, 118.82, 118.56, 125.5, 125.77, 120.02, 126.7, 126.7, 122.79, 126.62, 129.73], '1Y': [100, 102.56, 102.79, 104.41, 105.58, 103.66, 103.86, 105.2, 103.59, 106.36, 105.68, 107.37, 108.53, 107.69, 109.55, 108.08, 109.88, 110.66, 111.25, 110.54, 107.29, 104.1, 109.11, 110.14, 110.77, 111, 112.34, 114.35, 117.14, 119.09, 121.57, 124.79, 129.18, 131.04, 132.02, 128.08, 123.79, 122.76, 125.07, 123.89, 130.37, 132.47, 134.2, 133.58, 140.68, 140.62, 134.37, 141.78, 142.83, 138.21, 142.65, 146.15] }, returns: { '1W': 1.8, '1M': 2.2, 'YTD': 32.2, '6M': 29.7, '1Y': 46.2 } },
  'Meme': { etfs: ['MEME', 'BUZZ', 'RKNG'], series: { '1W': [100, 99.86, 95.23, 92.04, 91.53], '1M': [100, 101.49, 103.34, 102.02, 102.24, 104.7, 101.07, 101.6, 91.3, 93.63, 87.84, 93.47, 92.31, 97.44, 93.66, 94.22, 97.55, 97.4, 92.92, 89.84, 89.37], 'YTD': [100, 108.03, 108.23, 107.22, 102.68, 89.95, 92.02, 92.18, 95.18, 93.73, 92.78, 93.4, 89.34, 91.36, 100.37, 113.7, 112.18, 115.44, 124.96, 125.75, 126.77, 143.03, 135.95, 122.9, 130.54, 121.71], '6M': [100, 104.83, 107.25, 105.03, 103.07, 98.58, 94.69, 90.16, 92.79, 90.85, 91.58, 92.06, 91.16, 89.63, 97.73, 109.65, 113.31, 110.46, 122.8, 121.18, 121.44, 138.25, 132.51, 120.82, 128.34, 119.66], '1Y': [100, 102.27, 100.31, 96.36, 95.87, 89.8, 89.99, 87.82, 83.01, 83.44, 83.85, 87.17, 89.82, 89.34, 86.77, 91.09, 90.34, 89.38, 93.55, 91.84, 90.29, 84.52, 84.59, 88.38, 87.42, 86.51, 88.02, 90.88, 92.91, 91.63, 93.79, 91.46, 88.73, 90.69, 90.12, 90.53, 96.17, 99.37, 97.36, 92.19, 97.47, 106.43, 111.85, 110.52, 112.23, 115.27, 111.17, 117.84, 112.77, 113.87, 113.64, 106.53] }, returns: { '1W': -8.5, '1M': -10.6, 'YTD': 21.7, '6M': 19.7, '1Y': 6.5 } },
};
// @@END_GENERATED:THEME_REPRESENTATIVES@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 10, avgWeight: 6.22, proScore: 6.22, coverage: 1,
      price: 195.74, weeklyPrices: [210.69, 208.65, 200.04, 199.00, 195.74], weeklyChange: -7.1, dayChange: -1.59, sortRank: 0, periodReturns: { '1M': -8.9, 'YTD': 5, '6M': 3.8, '1Y': 26.3 },
      priceHistory: { '1D': [198.91, 196.11, 193.98, 194.5, 195.11, 196.37, 195.59, 195.17, 195.77, 195.83, 196.54, 195.26, 194.92, 195.21, 195.4, 194.51, 194, 195.07, 195.1, 194.43, 194.1, 194.38, 194.3, 195.74], '1W': [210.69, 208.65, 200.04, 199, 195.74], '1M': [214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74], 'YTD': [186.5, 185.04, 187.05, 184.84, 192.51, 171.88, 186.94, 189.82, 184.89, 183.34, 183.14, 178.56, 171.24, 175.75, 183.91, 198.35, 199.64, 199.57, 207.83, 225.83, 223.47, 214.25, 218.66, 200.42, 204.65, 195.74], '6M': [190.53, 188.12, 184.94, 178.07, 188.52, 180.34, 188.54, 184.97, 192.85, 180.05, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 220.78, 220.61, 212.6, 214.75, 200.42, 204.65, 195.74], '1Y': [155.02, 159.34, 164.92, 172.41, 173.5, 173.72, 180.77, 182.02, 174.98, 180.17, 167.02, 177.82, 176.67, 178.19, 187.62, 183.16, 181.81, 182.16, 202.89, 188.08, 186.86, 180.64, 177, 182.41, 175.02, 180.99, 190.53, 188.12, 184.94, 178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 220.61, 212.6, 214.75, 200.42, 204.65, 195.74] },
      velocityScore: { '1D': 0.2, '1W': 3.7, '1M': 9.3, '6M': null }, isNew: false,
      marketCap: '$4.7T', pe: 30, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.5,
      etfPresence: { AIS: 2.36, ARTY: 4.45, BAI: 4.03, IGPT: 7.47, IVES: 4.93, ALAI: 12.56, CHAT: 6.39, AIFD: 6.36, SPRX: 3.23, AOTG: 10.43 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 6.16, proScore: 5.55, coverage: 0.9,
      price: 1213.56, weeklyPrices: [1133.99, 1211.38, 1051.77, 1048.51, 1213.56], weeklyChange: 7.02, dayChange: 15.81, sortRank: 0, periodReturns: { '1M': 35.5, 'YTD': 325.2, '6M': 323.3, '1Y': 863.1 },
      priceHistory: { '1D': [1047.92, 1216.69, 1146.21, 1160.79, 1173.33, 1176.13, 1169.9, 1174.04, 1192.3, 1202.52, 1210.46, 1212.73, 1217.82, 1222.73, 1227.89, 1229.99, 1228.53, 1223.31, 1215.09, 1228.88, 1208.61, 1205.19, 1201.45, 1213.56], '1W': [1133.99, 1211.38, 1051.77, 1048.51, 1213.56], '1M': [895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56], 'YTD': [285.41, 327.02, 336.63, 397.58, 435.79, 382.89, 413.97, 428.17, 415.56, 397.05, 405.35, 444.27, 355.46, 367.85, 421.51, 457.23, 481.72, 517.16, 666.59, 803.63, 731.99, 923.52, 996, 891.88, 1043.19, 1213.56], '6M': [284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 766.58, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1213.56], '1Y': [126, 122.29, 124.53, 114.39, 111.26, 104.88, 111.87, 125.29, 115.79, 122, 131.37, 157.23, 162.73, 157.27, 187.83, 181.6, 202.53, 206.71, 224.01, 238.33, 236.95, 201.37, 236.48, 237.22, 241.14, 265.92, 284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1213.56] },
      velocityScore: { '1D': -2.3, '1W': -10.2, '1M': 5.5, '6M': null }, isNew: false,
      marketCap: '$1.4T', pe: 27.4, revenueGrowth: 196, eps: 44.25, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { AIS: 6.78, ARTY: 5.01, BAI: 6.31, IGPT: 8.09, IVES: 5.1, ALAI: 1.24, CHAT: 3.99, AIFD: 6.95, SPRX: false, AOTG: 11.99 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 9, avgWeight: 5.52, proScore: 4.96, coverage: 0.9,
      price: 532.57, weeklyPrices: [537.37, 551.63, 519.85, 519.74, 532.57], weeklyChange: -0.89, dayChange: 2.6, sortRank: 0, periodReturns: { '1M': 5.7, 'YTD': 148.7, '6M': 147.7, '1Y': 270.7 },
      priceHistory: { '1D': [519.05, 531.41, 512.61, 518.03, 519.42, 523.05, 516.27, 517.86, 519.64, 523.15, 529.48, 524.35, 524.64, 526.07, 527.78, 526.28, 526.75, 528.21, 524.03, 525.18, 523.07, 524.33, 525.02, 532.57], '1W': [537.37, 551.63, 519.85, 519.74, 532.57], '1M': [503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57], 'YTD': [214.16, 204.68, 227.92, 253.73, 252.18, 192.5, 205.94, 200.15, 203.68, 199.45, 197.74, 205.27, 203.77, 210.21, 236.64, 278.26, 305.33, 354.49, 421.39, 445.5, 447.58, 518.09, 523.2, 452.4, 512.48, 532.57], '6M': [214.99, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 203.08, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 448.29, 414.05, 495.54, 542.52, 452.4, 512.48, 532.57], '1Y': [143.68, 137.91, 146.42, 156.99, 166.47, 171.7, 172.4, 180.95, 163.71, 168.58, 151.14, 158.57, 157.39, 159.46, 164.67, 214.9, 234.56, 234.99, 254.84, 237.7, 247.96, 206.02, 217.53, 217.97, 210.78, 213.43, 214.99, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 414.05, 495.54, 542.52, 452.4, 512.48, 532.57] },
      velocityScore: { '1D': 1.8, '1W': -0.4, '1M': -1.8, '6M': null }, isNew: false,
      marketCap: '$868B', pe: 176.9, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.67, ARTY: 4.8, BAI: 4.83, IGPT: 8.18, IVES: 4.81, ALAI: 1.25, CHAT: 4, AIFD: false, SPRX: 0.53, AOTG: 16.58 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 8, avgWeight: 3.62, proScore: 2.9, coverage: 0.8,
      price: 378.91, weeklyPrices: [411.35, 392.13, 380.15, 382.07, 378.91], weeklyChange: -7.89, dayChange: -0.83, sortRank: 0, periodReturns: { '1M': -10.2, 'YTD': 9.5, '6M': 8.2, '1Y': 40.2 },
      priceHistory: { '1D': [382.08, 381.97, 375.37, 379.45, 380.27, 384.48, 379.33, 381.11, 382.88, 382.58, 385.41, 380.82, 380.59, 380.78, 380.27, 379.74, 379.38, 381.33, 379.9, 379.7, 378.46, 378.33, 377.97, 378.91], '1W': [411.35, 392.13, 380.15, 382.07, 378.91], '1M': [422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91], 'YTD': [346.1, 332.48, 343.02, 325.49, 330.73, 310.51, 331.17, 332.65, 321.7, 332.77, 335.97, 319.84, 309.42, 313.49, 354.91, 398.47, 419.94, 417.43, 425.44, 416.79, 417.76, 426.58, 418.91, 372.1, 392.9, 378.91], '6M': [352.13, 343.42, 352.21, 332.6, 332.79, 320.33, 340.44, 332.54, 325.49, 313.84, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 419.3, 411.07, 421.86, 479.23, 372.1, 392.9, 378.91], '1Y': [270.17, 275.18, 274.38, 283.34, 290.18, 288.64, 303.76, 311.23, 289.6, 308.65, 334.89, 359.87, 344.94, 334.53, 338.37, 324.63, 354.15, 344.29, 376.47, 355.59, 339.98, 346.82, 402.96, 390.24, 359.93, 340.36, 352.13, 343.42, 352.21, 332.6, 332.79, 320.33, 340.44, 333.51, 332.31, 317.53, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 411.07, 421.86, 479.23, 372.1, 392.9, 378.91] },
      velocityScore: { '1D': 3.6, '1W': 5.8, '1M': -11, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 63.2, revenueGrowth: 48, eps: 6, grossMargin: 76, dividendYield: 0.68,
      etfPresence: { AIS: 0.65, ARTY: 4.4, BAI: 4.18, IGPT: false, IVES: 4.87, ALAI: 3.94, CHAT: 4.06, AIFD: 5.38, SPRX: false, AOTG: 1.48 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 7, avgWeight: 3.68, proScore: 2.58, coverage: 0.7,
      price: 281.26, weeklyPrices: [310.58, 307.86, 279.04, 276.70, 281.26], weeklyChange: -9.44, dayChange: 1.65, sortRank: 0, periodReturns: { '1M': 35.1, 'YTD': 231, '6M': 225.2, '1Y': 251.7 },
      priceHistory: { '1D': [276.69, 270.1, 267.2, 269.25, 273.42, 275.91, 272.52, 273.18, 274.7, 276.74, 280.04, 277.9, 277.54, 278.79, 280.19, 280.37, 281.68, 279.48, 276.54, 279.29, 278.13, 280.04, 278.24, 281.26], '1W': [310.58, 307.86, 279.04, 276.7, 281.26], '1M': [208.26, 198.7, 204.83, 205, 219.43, 290.79, 301.65, 316.43, 263.47, 288.85, 252.59, 280.71, 279.7, 308.88, 278.67, 289.54, 310.58, 307.86, 279.04, 276.7, 281.26], 'YTD': [84.98, 83.45, 80.38, 83.1, 81.34, 74.21, 78.23, 79.48, 79.29, 75.68, 87.67, 89.53, 97.68, 106.71, 119.93, 133.37, 165.56, 165.15, 172.15, 177.95, 186.8, 204.83, 316.43, 252.59, 289.54, 281.26], '6M': [86.34, 90.23, 82.89, 79.8, 82.93, 75.54, 82.01, 79.01, 78.39, 77.51, 93.3, 90.79, 92.36, 99.05, 114.45, 134.6, 157.32, 156.57, 172.15, 164.5, 176.27, 198.7, 301.65, 252.59, 289.54, 281.26], '1Y': [79.97, 75.18, 72.71, 74.65, 74.21, 74.45, 75.85, 79.04, 71.21, 77.23, 63.33, 67.35, 74.26, 83.17, 86.22, 85.61, 88.23, 82.77, 88.57, 93.33, 87.52, 76.68, 89.4, 98.91, 84.43, 84.09, 86.34, 90.23, 82.89, 79.8, 82.93, 75.54, 82.01, 79.09, 80.92, 78.09, 93.3, 90.79, 92.36, 99.05, 114.45, 134.6, 157.32, 156.57, 172.15, 177.95, 176.27, 198.7, 301.65, 252.59, 289.54, 281.26] },
      velocityScore: { '1D': -3.4, '1W': -5.5, '1M': 10.3, '6M': null }, isNew: false,
      marketCap: '$246B', pe: 96.7, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.09,
      etfPresence: { AIS: 3.98, ARTY: 4.32, BAI: 1.93, IGPT: 3.56, IVES: false, ALAI: false, CHAT: 1.5, AIFD: 6.18, SPRX: 4.31, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'ANET', name: 'Arista Networks Inc', easyScore: 7, avgWeight: 2.11, proScore: 1.48, coverage: 0.7,
      price: 165.45, weeklyPrices: [169.67, 174.56, 162.20, 161.74, 165.45], weeklyChange: -2.49, dayChange: 2.29, sortRank: 0, periodReturns: { '1M': 4.7, 'YTD': 26.3, '6M': 26.5, '1Y': 62.9 },
      priceHistory: { '1D': [161.74, 164.42, 160.74, 165.88, 168.77, 168.49, 167.49, 167.77, 167.91, 167.74, 168.68, 168.12, 167.73, 167.54, 168.12, 167.49, 167.58, 169.3, 169.3, 168.4, 167.07, 166.35, 166.1, 165.45], '1W': [169.67, 174.56, 162.2, 161.74, 165.45], '1M': [158.01, 154.31, 155.27, 159.47, 170.68, 175.33, 174.37, 166.01, 154.27, 156.4, 151.76, 156.4, 163.24, 169.09, 168.01, 164.93, 169.67, 174.56, 162.2, 161.74, 165.45], 'YTD': [131.03, 123.72, 130.59, 138.41, 148.15, 128.67, 135.12, 132.79, 130.25, 139.4, 134.03, 136.26, 122.55, 124.85, 146.05, 161.01, 172.55, 172.71, 147.06, 140.69, 140.49, 155.27, 166.01, 151.76, 164.93, 165.45], '6M': [131.84, 137.19, 123.42, 127.52, 146.69, 139.39, 143.45, 142.58, 128.77, 124.6, 139.62, 133.07, 130.8, 122.78, 145.07, 154.33, 177.73, 168.68, 147.06, 142.54, 141.58, 154.31, 174.37, 151.76, 164.93, 165.45], '1Y': [101.59, 102.52, 108.57, 111.78, 114.28, 117.57, 139.28, 136.48, 132.03, 136.23, 142.85, 139.39, 149.61, 142.5, 145.5, 154.1, 146.01, 152.76, 158.44, 134.02, 130.3, 119.59, 130.68, 128.59, 124.76, 131.12, 131.84, 137.19, 123.42, 127.52, 146.69, 139.39, 143.45, 139.54, 132.89, 134.83, 139.62, 133.07, 130.8, 122.78, 145.07, 154.33, 177.73, 168.68, 147.06, 140.69, 141.58, 154.31, 174.37, 151.76, 164.93, 165.45] },
      velocityScore: { '1D': 10.4, '1W': 10.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$208B', pe: 56.9, revenueGrowth: 35, eps: 2.91, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: 1.39, ARTY: 2.37, BAI: 1.36, IGPT: false, IVES: false, ALAI: 0.96, CHAT: 2.14, AIFD: 4.96, SPRX: 1.59, AOTG: false },
      tonyNote: 'Arista Networks Inc appears in 7 of 10 AI & ML ETFs (70% coverage) with average weight 2.1% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 6, avgWeight: 4.9, proScore: 2.94, coverage: 0.6,
      price: 434.99, weeklyPrices: [462.12, 467.67, 436.39, 440.83, 434.99], weeklyChange: -5.87, dayChange: -1.32, sortRank: 0, periodReturns: { '1M': 5.5, 'YTD': 43.1, '6M': 45.6, '1Y': 94.2 },
      priceHistory: { '1D': [440.83, 443.75, 437.85, 439.89, 441.4, 441.73, 438.52, 439.24, 441.24, 440.55, 445.6, 442.74, 441.52, 441.83, 441.72, 440.96, 441.06, 442.17, 439.46, 439.01, 437.68, 437.51, 433.91, 434.99], '1W': [462.12, 467.67, 436.39, 440.83, 434.99], '1M': [412.32, 422.73, 424.86, 418.45, 435.63, 446.69, 436.69, 444.92, 415.17, 426.8, 408.75, 421.07, 423.93, 441.4, 425.83, 432.15, 462.12, 467.67, 436.39, 440.83, 434.99], 'YTD': [303.89, 318.01, 341.64, 327.37, 339.55, 330.73, 368.1, 370.54, 376.81, 353.86, 336.71, 338.79, 326.11, 341.49, 365.49, 363.35, 382.66, 396.06, 419.5, 399.8, 401.62, 424.86, 444.92, 408.75, 432.15, 434.99], '6M': [302.84, 322.25, 331.77, 327.16, 338.34, 335.75, 361.91, 364.2, 385.75, 353.13, 347.09, 345.98, 343.25, 337.95, 365.9, 375.1, 387.44, 393.83, 419.5, 397.28, 392.61, 422.73, 436.69, 408.75, 432.15, 434.99], '1Y': [224.01, 234.8, 230.4, 240.4, 245.6, 235.21, 242.62, 241, 227.33, 238.27, 243.41, 259.33, 264.87, 273.36, 292.19, 280.66, 299.84, 290.73, 303.22, 289.24, 282.2, 277.5, 291.51, 294.72, 292.04, 288.95, 302.84, 322.25, 331.77, 327.16, 338.34, 335.75, 361.91, 362.26, 387.73, 357.44, 347.09, 345.98, 343.25, 337.95, 365.9, 375.1, 387.44, 393.83, 419.5, 399.8, 392.61, 422.73, 436.69, 408.75, 432.15, 434.99] },
      velocityScore: { '1D': 1.4, '1W': 3.5, '1M': -3.9, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 37.5, revenueGrowth: 35, eps: 11.59, grossMargin: 62, dividendYield: 0.86,
      etfPresence: { AIS: 3.22, ARTY: false, BAI: 4.39, IGPT: false, IVES: 5.1, ALAI: 5.68, CHAT: false, AIFD: 3.39, SPRX: false, AOTG: 7.64 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 4.84, proScore: 2.9, coverage: 0.6,
      price: 343.71, weeklyPrices: [368.03, 349.68, 346.13, 345.29, 343.71], weeklyChange: -6.61, dayChange: -0.45, sortRank: 0, periodReturns: { '1M': -11.6, 'YTD': 9.8, '6M': 9.4, '1Y': 98.1 },
      priceHistory: { '1D': [345.28, 336.88, 340.52, 339.93, 342.39, 342.83, 339.86, 341.11, 341.24, 341.23, 342.01, 340.93, 341.33, 341.03, 341.11, 339.77, 340.86, 342.85, 342.51, 343.06, 342.89, 344.06, 341.77, 343.71], '1W': [368.03, 349.68, 346.13, 345.29, 343.71], '1M': [388.88, 388.83, 390.13, 380.34, 376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 356.38, 357.77, 359.68, 369.35, 373.25, 363.79, 368.03, 349.68, 346.13, 345.29, 343.71], 'YTD': [313, 325.44, 332.78, 330.54, 338.25, 331.25, 309, 314.98, 307.38, 300.88, 303.55, 307.13, 280.92, 297.39, 318.49, 336.02, 338.89, 384.8, 398.04, 402.62, 388.91, 390.13, 372.19, 356.38, 363.79, 343.71], '6M': [313.51, 316.54, 331.86, 322, 334.55, 339.71, 318.58, 302.02, 310.9, 303.58, 307.04, 310.92, 290.44, 287.56, 317.32, 337.12, 339.32, 349.94, 398.04, 387.35, 387.66, 388.83, 358.99, 356.38, 363.79, 343.71], '1Y': [173.54, 179.53, 180.19, 185.06, 193.18, 189.13, 196.52, 202.94, 199.75, 211.64, 235, 240.8, 254.72, 246.54, 245.35, 236.57, 251.46, 253.08, 281.48, 284.75, 278.57, 289.45, 320.18, 321.27, 309.29, 307.16, 313.51, 316.54, 331.86, 322, 334.55, 339.71, 318.58, 303.33, 312.9, 303.13, 307.04, 310.92, 290.44, 287.56, 317.32, 337.12, 339.32, 349.94, 398.04, 402.62, 387.66, 388.83, 358.99, 356.38, 363.79, 343.71] },
      velocityScore: { '1D': 0.3, '1W': 2.8, '1M': -23.5, '6M': null }, isNew: false,
      marketCap: '$4.2T', pe: 26.2, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.15, IGPT: 7.42, IVES: 4.7, ALAI: false, CHAT: 5.04, AIFD: 4.89, SPRX: false, AOTG: 3.81 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 5, avgWeight: 3.97, proScore: 1.98, coverage: 0.5,
      price: 227.01, weeklyPrices: [244.39, 232.79, 234.11, 234.27, 227.01], weeklyChange: -7.11, dayChange: -3.14, sortRank: 0, periodReturns: { '1M': -14.4, 'YTD': -1.7, '6M': -2.3, '1Y': 4.6 },
      priceHistory: { '1D': [234.37, 227.25, 228.67, 228.68, 229.5, 229.44, 228.93, 229.85, 230.29, 229.07, 228.88, 227.69, 228.34, 228.24, 228.24, 228.02, 228.27, 229.49, 229.95, 229.15, 228.69, 227.27, 226.98, 227.01], '1W': [244.39, 232.79, 234.11, 234.27, 227.01], '1M': [265.29, 271.85, 274, 270.64, 261.26, 256.52, 250.02, 253.79, 246.03, 245.22, 238, 241.51, 238.55, 246.02, 246, 237.5, 244.39, 232.79, 234.11, 234.27, 227.01], 'YTD': [230.82, 246.29, 238.18, 234.34, 241.73, 222.69, 199.6, 210.11, 207.92, 218.94, 209.53, 208.76, 207.54, 210.57, 233.65, 249.7, 255.08, 265.06, 274.99, 270.13, 265.01, 274, 253.79, 238, 237.5, 227.01], '6M': [232.52, 233.06, 246.47, 231, 244.68, 238.62, 206.96, 201.15, 208.56, 208.73, 214.33, 215.2, 207.24, 208.27, 221.25, 248.5, 255.36, 263.04, 274.99, 265.82, 259.34, 271.85, 250.02, 238, 237.5, 227.01], '1Y': [217.12, 223.41, 225.02, 226.13, 231.44, 214.75, 223.13, 230.98, 221.95, 231.6, 232.33, 228.15, 231.48, 219.78, 219.51, 216.37, 214.47, 221.09, 222.86, 243.04, 237.58, 217.14, 233.22, 229.53, 226.19, 227.35, 232.52, 233.06, 246.47, 231, 244.68, 238.62, 206.96, 204.79, 210.64, 216.82, 214.33, 215.2, 207.24, 208.27, 221.25, 248.5, 255.36, 263.04, 274.99, 270.13, 259.34, 271.85, 250.02, 238, 237.5, 227.01] },
      velocityScore: { '1D': 26.1, '1W': -0.5, '1M': -34.4, '6M': null }, isNew: false,
      marketCap: '$2.4T', pe: 30.7, revenueGrowth: 17, eps: 7.4, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 4.83, ALAI: 5.49, CHAT: 2.31, AIFD: 3.38, SPRX: false, AOTG: 3.82 },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 5, avgWeight: 3.86, proScore: 1.93, coverage: 0.5,
      price: 542.87, weeklyPrices: [577.22, 563.85, 562.20, 557.67, 542.87], weeklyChange: -5.95, dayChange: -2.68, sortRank: 0, periodReturns: { '1M': -11.3, 'YTD': -17.8, '6M': -18.7, '1Y': -25.2 },
      priceHistory: { '1D': [557.8, 544.32, 549.76, 551.41, 555.57, 556.08, 550.39, 552.88, 551.85, 548.95, 548.48, 545.86, 547.02, 545.7, 544.33, 543.23, 544, 548, 547.46, 546.77, 546.15, 545.76, 544.26, 542.87], '1W': [577.22, 563.85, 562.2, 557.67, 542.87], '1M': [612.34, 635.26, 635.29, 632.51, 600.47, 597.63, 622.98, 627.57, 593, 585.39, 570.98, 568.43, 566.98, 593.48, 600.21, 567.58, 577.22, 563.85, 562.2, 557.67, 542.87], 'YTD': [660.09, 646.06, 620.8, 647.63, 738.31, 670.21, 649.81, 655.66, 657.01, 660.57, 638.18, 606.7, 547.54, 579.23, 628.39, 676.87, 659.15, 611.91, 612.88, 616.63, 605.06, 635.29, 627.57, 570.98, 567.58, 542.87], '6M': [663.29, 658.79, 641.97, 604.12, 672.97, 691.7, 670.72, 639.29, 639.3, 655.08, 654.07, 622.66, 592.92, 572.13, 612.42, 671.58, 674.72, 669.12, 612.88, 603, 602.61, 635.26, 622.98, 570.98, 567.58, 542.87], '1Y': [726.09, 719.01, 717.51, 704.28, 712.68, 750.01, 761.83, 782.13, 739.1, 751.11, 752.45, 755.59, 778.38, 743.75, 710.56, 705.3, 712.07, 734, 666.47, 618.94, 609.89, 589.15, 647.95, 673.42, 644.23, 658.77, 663.29, 658.79, 641.97, 604.12, 672.97, 691.7, 670.72, 643.22, 653.69, 667.73, 654.07, 622.66, 592.92, 572.13, 612.42, 671.58, 674.72, 669.12, 612.88, 616.63, 602.61, 635.26, 622.98, 570.98, 567.58, 542.87] },
      velocityScore: { '1D': 0, '1W': 20.6, '1M': -29.8, '6M': null }, isNew: false,
      marketCap: '$1.4T', pe: 19.7, revenueGrowth: 33, eps: 27.49, grossMargin: 82, dividendYield: 0.38,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: 7.55, IVES: 4.72, ALAI: 3.93, CHAT: 2.02, AIFD: false, SPRX: false, AOTG: 1.07 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 5, avgWeight: 3.45, proScore: 1.73, coverage: 0.5,
      price: 398, weeklyPrices: [417.07, 439.66, 397.02, 399.92, 398.00], weeklyChange: -4.57, dayChange: -0.48, sortRank: 0, periodReturns: { '1M': 24.9, 'YTD': 139.2, '6M': 134.2, '1Y': 306.3 },
      priceHistory: { '1D': [399.92, 408.27, 391.09, 395.84, 406.01, 405.86, 399.9, 401.9, 407.38, 406.08, 413.36, 407.12, 404.35, 402.8, 404.12, 400.33, 402.22, 400, 394.6, 394.61, 389.58, 393.08, 392.92, 398], '1W': [417.07, 439.66, 397.02, 399.92, 398], '1M': [318.72, 325.33, 349.17, 342.85, 320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 330.86, 367.47, 367.15, 389.2, 361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 398], 'YTD': [166.36, 156.73, 174.45, 176.35, 160.46, 142.82, 126.58, 129.68, 124.67, 120, 119.9, 126.16, 113.61, 106.33, 129.46, 170.81, 197.54, 194.74, 213.91, 224.09, 287.48, 349.17, 358.05, 330.86, 374.68, 398], '6M': [167.26, 167.11, 172.57, 183.75, 170.93, 158.52, 182.86, 123.69, 128.4, 109.8, 116.48, 127.57, 121.76, 109.6, 125.46, 172.09, 194.06, 196.85, 213.91, 204.42, 244.26, 325.33, 363.54, 330.86, 374.68, 398], '1Y': [97.96, 90.8, 95.9, 102.13, 122.23, 131.1, 170.89, 190.69, 177.53, 189.15, 191.2, 229.5, 245.2, 197.78, 200.74, 206.21, 163.55, 163.64, 169.55, 162.83, 144.47, 139.29, 157.57, 161.23, 148.85, 164.4, 167.26, 167.11, 172.57, 183.75, 170.93, 158.52, 182.86, 129.58, 128.15, 113.77, 116.48, 127.57, 121.76, 109.6, 125.46, 172.09, 194.06, 196.85, 213.91, 224.09, 244.26, 325.33, 363.54, 330.86, 374.68, 398] },
      velocityScore: { '1D': 10.2, '1W': 10.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$68B', pe: 268.9, revenueGrowth: 93, eps: 1.48, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 2.04, ARTY: 1.34, BAI: false, IGPT: false, IVES: false, ALAI: 1.18, CHAT: 2.81, AIFD: false, SPRX: 9.9, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.44, proScore: 1.72, coverage: 0.5,
      price: 352.83, weeklyPrices: [379.40, 367.34, 373.94, 365.46, 352.83], weeklyChange: -7, dayChange: -3.45, sortRank: 0, periodReturns: { '1M': -15.2, 'YTD': -27, '6M': -27.7, '1Y': -29.1 },
      priceHistory: { '1D': [365.44, 359.04, 358.06, 359.76, 358.2, 357.68, 354.82, 356.06, 355.76, 354.53, 353.89, 352.05, 351.42, 351.88, 351.62, 349.66, 350.95, 354.54, 356.77, 355.59, 354.57, 352.62, 353.66, 352.83], '1W': [379.4, 367.34, 373.94, 365.46, 352.83], '1M': [416.03, 412.67, 426.99, 450.24, 460.52, 441.31, 427.34, 428.05, 416.67, 411.74, 397.36, 390.34, 390.74, 399.76, 393.83, 378.91, 379.4, 367.34, 373.94, 365.46, 352.83], 'YTD': [483.62, 478.11, 456.66, 451.14, 433.5, 393.67, 401.84, 397.23, 401.72, 410.68, 401.86, 389.02, 365.97, 369.37, 373.07, 420.26, 415.75, 407.78, 413.96, 405.21, 421.06, 426.99, 428.05, 397.36, 378.91, 352.83], '6M': [487.71, 472.85, 477.18, 454.52, 480.58, 411.21, 413.27, 396.86, 389, 403.93, 405.76, 399.41, 372.74, 370.17, 374.33, 411.22, 432.92, 424.46, 413.96, 407.77, 417.42, 412.67, 427.34, 397.36, 378.91, 352.83], '1Y': [497.45, 498.84, 503.32, 510.05, 513.71, 524.11, 520.84, 522.48, 504.24, 509.64, 495, 509.9, 517.93, 511.46, 517.35, 510.96, 511.61, 520.56, 525.76, 497.1, 503.29, 478.43, 492.01, 483.16, 478.53, 485.92, 487.71, 472.85, 477.18, 454.52, 480.58, 411.21, 413.27, 399.6, 400.6, 405.2, 405.76, 399.41, 372.74, 370.17, 374.33, 411.22, 432.92, 424.46, 413.96, 405.21, 417.42, 412.67, 427.34, 397.36, 378.91, 352.83] },
      velocityScore: { '1D': -1.7, '1W': 1.8, '1M': -33.3, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 21, revenueGrowth: 18, eps: 16.77, grossMargin: 68, dividendYield: 1,
      etfPresence: { AIS: false, ARTY: 2.38, BAI: false, IGPT: false, IVES: 4.64, ALAI: 4.83, CHAT: 2.05, AIFD: false, SPRX: false, AOTG: 3.28 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 5, avgWeight: 2.71, proScore: 1.36, coverage: 0.5,
      price: 861.97, weeklyPrices: [850.00, 893.93, 827.92, 842.53, 861.97], weeklyChange: 1.41, dayChange: 2.26, sortRank: 0, periodReturns: { '1M': -5.4, 'YTD': 133.9, '6M': 117.7, '1Y': 810.1 },
      priceHistory: { '1D': [842.95, 864.75, 811.55, 828.41, 846.93, 856.2, 838.96, 843.86, 842.51, 847.51, 863.24, 860.23, 858.78, 859.48, 859.01, 846.13, 851.12, 852.9, 856.16, 859.2, 855.03, 858.35, 860.27, 861.97], '1W': [850, 893.93, 827.92, 842.53, 861.97], '1M': [910.81, 902.31, 860.62, 854.96, 905, 1029.15, 938, 945.08, 863.66, 895.4, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93, 827.92, 842.53, 861.97], 'YTD': [368.59, 348.26, 343.27, 354.49, 381.44, 504.42, 583.46, 667.77, 677, 650.82, 616.09, 772.13, 688.8, 764.65, 894.13, 891.22, 846.89, 902.32, 944.28, 1030.37, 868.07, 860.62, 945.08, 853.26, 869.98, 861.97], '6M': [390.77, 357.05, 339.87, 356.83, 370.66, 435.1, 561.13, 600.42, 688.27, 694.43, 672, 649.56, 801.99, 702.76, 896.02, 824.01, 873.6, 858.32, 944.28, 992.37, 890.09, 902.31, 938, 853.26, 869.98, 861.97], '1Y': [94.71, 92.75, 92.99, 102.22, 104.52, 106.68, 111.13, 114.62, 117.43, 135.55, 149.46, 163.02, 168.73, 160.75, 163.81, 149.61, 163.23, 168.5, 200.13, 239.68, 226.86, 233.24, 325.16, 331.41, 324.35, 371.43, 390.77, 357.05, 339.87, 356.83, 370.66, 435.1, 561.13, 594.26, 723.39, 680.8, 672, 649.56, 801.99, 702.76, 896.02, 824.01, 873.6, 858.32, 944.28, 1030.37, 890.09, 902.31, 938, 853.26, 869.98, 861.97] },
      velocityScore: { '1D': 1.5, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$67B', pe: 152.8, revenueGrowth: 90, eps: 5.64, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.58, IGPT: false, IVES: false, ALAI: 0.51, CHAT: 1.39, AIFD: 5.76, SPRX: 3.33, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 5 of 10 AI & ML ETFs (50% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 5, avgWeight: 2.62, proScore: 1.31, coverage: 0.5,
      price: 675.39, weeklyPrices: [746.23, 732.62, 670.75, 643.83, 675.39], weeklyChange: -9.49, dayChange: 4.81, sortRank: 0, periodReturns: { '1M': 28.7, 'YTD': 292.1, '6M': 276.1, '1Y': 963.4 },
      priceHistory: { '1D': [644.38, 689.46, 667.18, 667.43, 670.87, 679.25, 671.88, 675.84, 682.78, 682.65, 692.05, 687.33, 685.35, 681.5, 678.13, 674.8, 676.52, 677.21, 672.57, 673.53, 668.85, 668.15, 668.35, 675.39], '1W': [746.23, 732.62, 670.75, 643.83, 675.39], '1M': [524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39], 'YTD': [172.27, 187.68, 222.1, 243.29, 278.41, 260.19, 284.1, 285.52, 282.25, 259.03, 261.18, 316.93, 273.35, 297.73, 337.88, 361.69, 403.12, 434.52, 483.15, 494.09, 459.62, 531.18, 575.5, 490.09, 712.13, 675.39], '6M': [181.54, 187.88, 212.14, 222.97, 252.66, 290.24, 262.56, 284.11, 270.57, 250.61, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 488.74, 455.8, 530.6, 594.11, 490.09, 712.13, 675.39], '1Y': [63.51, 66.08, 66.14, 68, 68.82, 76.55, 74.44, 76.24, 74.66, 82.04, 92.04, 97.66, 106.63, 106.88, 131.31, 115.42, 125.92, 125.72, 138.13, 163.6, 157.16, 140.23, 163.33, 168.89, 176.34, 181.08, 181.54, 187.88, 212.14, 222.97, 252.66, 290.24, 262.56, 296.56, 290.95, 261.3, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 455.8, 530.6, 594.11, 490.09, 712.13, 675.39] },
      velocityScore: { '1D': -6.4, '1W': -29.2, '1M': -31.1, '6M': null }, isNew: false,
      marketCap: '$233B', pe: 40.3, revenueGrowth: 46, eps: 16.74, grossMargin: 45, dividendYield: 0.09,
      etfPresence: { AIS: 1.43, ARTY: 3.02, BAI: 3.39, IGPT: false, IVES: false, ALAI: 4.43, CHAT: false, AIFD: false, SPRX: false, AOTG: 0.85 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 5, avgWeight: 2.51, proScore: 1.26, coverage: 0.5,
      price: 325.57, weeklyPrices: [333.05, 357.96, 318.32, 316.43, 325.57], weeklyChange: -2.25, dayChange: 2.89, sortRank: 0, periodReturns: { '1M': 0.5, 'YTD': 101, '6M': 95.1, '1Y': 163 },
      priceHistory: { '1D': [316.43, 335.1, 326.05, 326.07, 332.28, 331.71, 327.57, 326.72, 326.46, 324.94, 328.89, 328.13, 327.23, 327.27, 326.86, 325.86, 326.05, 326.98, 325.53, 325.21, 323.52, 323.19, 323.04, 325.57], '1W': [333.05, 357.96, 318.32, 316.43, 325.57], '1M': [323.91, 319.78, 314.18, 315.71, 323.39, 334.49, 331.44, 323.92, 300.51, 300.57, 280.98, 297.88, 302.87, 311.93, 299.6, 317.58, 333.05, 357.96, 318.32, 316.43, 325.57], 'YTD': [162.01, 160.78, 172.54, 181.12, 195.1, 177.75, 236.51, 243.75, 259.23, 249.75, 265.38, 269.17, 252.4, 259.37, 287.64, 294.13, 321.75, 328.49, 358.92, 369.99, 315.67, 314.18, 323.92, 280.98, 317.58, 325.57], '6M': [167.58, 173.95, 170.03, 175.18, 189.21, 190.15, 199.62, 243.53, 253.15, 244.44, 270.06, 268.41, 270.89, 250.58, 281.03, 301.16, 305.14, 306.18, 358.92, 367.13, 322.63, 319.78, 331.44, 280.98, 317.58, 325.57], '1Y': [123.8, 127.84, 123.3, 129.06, 137.47, 141.59, 139.39, 132.52, 126.58, 134.23, 124, 134.84, 143.6, 138.62, 160.2, 169.01, 177.82, 183.2, 193.76, 183.02, 163.64, 159.61, 179.73, 189.02, 161.27, 159.82, 167.58, 173.95, 170.03, 175.18, 189.21, 190.15, 199.62, 243.21, 262.19, 251.28, 270.06, 268.41, 270.89, 250.58, 281.03, 301.16, 305.14, 306.18, 358.92, 369.99, 322.63, 319.78, 331.44, 280.98, 317.58, 325.57] },
      velocityScore: { '1D': 3.3, '1W': 9.6, '1M': -37, '6M': null }, isNew: false,
      marketCap: '$125B', pe: 81.6, revenueGrowth: 30, eps: 3.99, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 3.57, ARTY: false, BAI: 1.91, IGPT: false, IVES: false, ALAI: false, CHAT: 2.22, AIFD: 4.2, SPRX: false, AOTG: 0.67 },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 5, avgWeight: 2.36, proScore: 1.18, coverage: 0.5,
      price: 2335, weeklyPrices: [2184.75, 2273.73, 1963.60, 1914.46, 2335.00], weeklyChange: 6.88, dayChange: 21.53, sortRank: 0, periodReturns: { '1M': 46.9, 'YTD': 883.7, '6M': 833.7, '1Y': 4822 },
      priceHistory: { '1D': [1921.41, 2236, 2135, 2138.13, 2185, 2210.93, 2188, 2200, 2219, 2219.2, 2254.62, 2259, 2269.22, 2275.45, 2272.94, 2293.29, 2298.75, 2304.14, 2302.98, 2302.01, 2278.4, 2313.48, 2301.64, 2335], '1W': [2184.75, 2273.73, 1963.6, 1914.46, 2335], '1M': [1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335], 'YTD': [237.38, 334.54, 409.24, 503.44, 539.3, 576.2, 630.29, 649.97, 651.9, 565.59, 618.82, 772.09, 603.17, 692.73, 851.57, 919.47, 932.43, 1096.51, 1409.98, 1447.23, 1392.56, 1641.64, 1759.68, 1643.23, 1958.8, 2335], '6M': [250.05, 274.08, 389.27, 453.12, 481.43, 695.51, 541.64, 590.59, 638.52, 565.41, 618.89, 720.17, 702.48, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1452.02, 1383.29, 1589.94, 1831.5, 1643.23, 1958.8, 2335], '1Y': [47.44, 46.41, 46.09, 42.19, 42.48, 41.33, 40.69, 46.68, 45.5, 50.87, 68.55, 86.13, 102.21, 97.12, 128.41, 116.91, 144.27, 167.05, 195.82, 207.69, 243.57, 195.96, 223.28, 228.47, 206.18, 237.61, 250.05, 274.08, 389.27, 453.12, 481.43, 695.51, 541.64, 600.4, 632.38, 599.06, 618.89, 720.17, 702.48, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1447.23, 1383.29, 1589.94, 1831.5, 1643.23, 1958.8, 2335] },
      velocityScore: { '1D': -0.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$346B', pe: 79.7, revenueGrowth: 251, eps: 29.29, grossMargin: 56, dividendYield: null,
      etfPresence: { AIS: 2.14, ARTY: false, BAI: 2.91, IGPT: 4.17, IVES: false, ALAI: 0.5, CHAT: false, AIFD: false, SPRX: false, AOTG: 2.08 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'CRDO', name: 'Credo Technology Group Holding Ltd', easyScore: 5, avgWeight: 2.06, proScore: 1.03, coverage: 0.5,
      price: 268.03, weeklyPrices: [271.83, 302.52, 272.01, 268.99, 268.03], weeklyChange: -1.4, dayChange: -0.43, sortRank: 0, periodReturns: { '1M': 20.9, 'YTD': 86.3, '6M': 78.5, '1Y': 182 },
      priceHistory: { '1D': [269.2, 276, 265.61, 269.53, 276.86, 277.32, 271.34, 269.29, 273.48, 268.94, 273.14, 271.18, 271.36, 270.95, 272.43, 268.2, 268.99, 269.32, 266.59, 265.73, 262.63, 262.34, 264.21, 268.03], '1W': [271.83, 302.52, 272.01, 268.99, 268.03], '1M': [221.64, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 217.5, 206.89, 222.27, 237.68, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03], 'YTD': [143.89, 141.59, 149.12, 135.1, 129.47, 98.06, 121.78, 124.06, 114.48, 114.74, 111.57, 107.09, 96.44, 95.92, 107.93, 158.93, 185.54, 174.01, 198.29, 189.36, 182.98, 222.35, 217.5, 237.68, 249.33, 268.03], '6M': [144.83, 140.24, 156.07, 153.22, 129.57, 111.31, 134.72, 124.8, 120.83, 97.3, 112.33, 104.06, 100.3, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 198.57, 168.99, 221.23, 214.6, 237.68, 249.33, 268.03], '1Y': [95.05, 93.61, 98.52, 93.47, 101.22, 107.56, 119.78, 117.33, 110.86, 131.82, 140.82, 161.99, 169.56, 142.93, 143.87, 138.83, 136.53, 150.97, 166.62, 162.74, 142.95, 134.73, 177.6, 176.04, 143.91, 150.13, 144.83, 140.24, 156.07, 153.22, 129.57, 111.31, 134.72, 127.91, 123.46, 102.54, 112.33, 104.06, 100.3, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 189.36, 168.99, 221.23, 214.6, 237.68, 249.33, 268.03] },
      velocityScore: { '1D': null, '1W': 13.2, '1M': null, '6M': null }, isNew: true,
      marketCap: '$50B', pe: 107.2, revenueGrowth: 157, eps: 2.5, grossMargin: 68, dividendYield: null,
      etfPresence: { AIS: 1.11, ARTY: 1.31, BAI: 2.2, IGPT: false, IVES: false, ALAI: false, CHAT: 2.33, AIFD: false, SPRX: 3.34, AOTG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'ARM', name: 'ARM Holdings PLC', easyScore: 4, avgWeight: 3.26, proScore: 1.3, coverage: 0.4,
      price: 347.71, weeklyPrices: [439.46, 407.72, 366.39, 359.08, 347.71], weeklyChange: -20.88, dayChange: -3.18, sortRank: 0, periodReturns: { '1M': 8.2, 'YTD': 218.1, '6M': 211.7, '1Y': 119.9 },
      priceHistory: { '1D': [359.12, 348.86, 342.74, 348.97, 351.46, 353.5, 347.76, 352.09, 354, 354.22, 360.36, 357.11, 356.89, 357.76, 356.81, 355.12, 354.23, 354.43, 349.8, 350.6, 346.92, 347.9, 346.32, 347.71], '1W': [439.46, 407.72, 366.39, 359.08, 347.71], '1M': [321.22, 302.71, 335.27, 353.29, 408.85, 402.71, 411.83, 393.44, 342.93, 346.39, 307.43, 342.23, 380.81, 412.55, 396.34, 418.88, 439.46, 407.72, 366.39, 359.08, 347.71], 'YTD': [109.31, 113.08, 105.11, 119.2, 108.43, 110.88, 122.19, 125.58, 129.26, 120.62, 115.12, 129.82, 154.8, 155.07, 149.79, 162.33, 204.61, 210.32, 237.3, 221.21, 256.73, 335.27, 393.44, 307.43, 418.88, 347.71], '6M': [110.27, 116.11, 111.14, 107.17, 114.88, 104.55, 125.95, 126.89, 128.14, 121.72, 120.55, 127.31, 134.96, 151.28, 148.91, 159.34, 196.57, 201.69, 237.3, 207.92, 223.15, 302.71, 411.83, 307.43, 418.88, 347.71], '1Y': [158.15, 155.09, 145.94, 156.74, 163.17, 137.58, 135.57, 140.55, 133.28, 142.55, 138.17, 150.64, 142.91, 139.62, 152.64, 154.81, 171.19, 166.6, 165.45, 158.25, 140.31, 132.53, 135.56, 141.31, 130.89, 114.03, 110.27, 116.11, 111.14, 107.17, 114.88, 104.55, 125.95, 127.24, 131.74, 124.11, 120.55, 127.31, 134.96, 151.28, 148.91, 159.34, 196.57, 201.69, 237.3, 221.21, 223.15, 302.71, 411.83, 307.43, 418.88, 347.71] },
      velocityScore: { '1D': -9.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$371B', pe: 404.3, revenueGrowth: 20, eps: 0.86, grossMargin: 98, dividendYield: null,
      etfPresence: { AIS: 1.95, ARTY: false, BAI: false, IGPT: false, IVES: false, ALAI: 0.18, CHAT: 2.7, AIFD: false, SPRX: 8.2, AOTG: false },
      tonyNote: 'Arm Holdings is held across Broad Tech and AI ETFs as the CPU architecture licensor embedded in every mobile device and increasingly in AI inference chips and data center CPUs. Revenue grew and the royalty model is high-margin; the weight score reflects consistent institutional positioning as the AI chip design ecosystem expands on Arm cores.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 4, avgWeight: 3.24, proScore: 1.3, coverage: 0.4,
      price: 132.87, weeklyPrices: [133.99, 140.94, 132.28, 131.65, 132.87], weeklyChange: -0.84, dayChange: 0.73, sortRank: 0, periodReturns: { '1M': 7.6, 'YTD': 260.1, '6M': 267.5, '1Y': 490.5 },
      priceHistory: { '1D': [131.91, 136.14, 126.9, 129.51, 130.01, 131.17, 128.71, 129, 129.81, 129.63, 131.33, 129.36, 130.32, 131.9, 132.27, 131.36, 131.53, 131.84, 130.95, 130.29, 130.09, 130.99, 131.02, 132.87], '1W': [133.99, 140.94, 132.28, 131.65, 132.87], '1M': [123.52, 121.77, 120.89, 114.68, 109.33, 107.93, 112.71, 111.78, 99.17, 110.27, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87], 'YTD': [36.9, 41.11, 48.32, 54.32, 48.66, 48.24, 46.48, 44.11, 45.46, 45.95, 45.25, 46.18, 44.1, 48.03, 61.72, 68.5, 66.78, 94.48, 113.01, 120.29, 118.96, 120.89, 111.78, 107.04, 121.1, 132.87], '6M': [36.2, 39.37, 44.06, 48.56, 43.93, 49.25, 47.13, 46.18, 46.12, 43.1, 46.78, 44.06, 44.06, 44.13, 58.95, 64.94, 65.27, 94.75, 113.01, 120.61, 110.8, 121.77, 112.71, 107.04, 121.1, 132.87], '1Y': [22.5, 22.49, 23.43, 23.1, 20.7, 19.31, 19.77, 23.86, 23.5, 24.93, 24.49, 24.08, 29.58, 35.5, 36.83, 36.37, 36.84, 38.16, 40.16, 37.24, 35.91, 33.62, 40.56, 41.41, 37.81, 36.82, 36.2, 39.37, 44.06, 48.56, 43.93, 49.25, 47.13, 45.46, 46.88, 45.58, 46.78, 44.06, 44.06, 44.13, 58.95, 64.94, 65.27, 94.75, 113.01, 120.29, 110.8, 121.77, 112.71, 107.04, 121.1, 132.87] },
      velocityScore: { '1D': 2.4, '1W': -9.1, '1M': -55.2, '6M': null }, isNew: false,
      marketCap: '$668B', pe: null, revenueGrowth: 7, eps: -0.61, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.54, ARTY: false, BAI: 3.24, IGPT: 4.87, IVES: false, ALAI: false, CHAT: 1.32, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'NBIS', name: 'NEBIUS GROUP NV', easyScore: 4, avgWeight: 3.15, proScore: 1.26, coverage: 0.4,
      price: 256.63, weeklyPrices: [286.69, 283.61, 275.25, 259.66, 256.63], weeklyChange: -10.49, dayChange: -1.17, sortRank: 0, periodReturns: { '1M': 23.3, 'YTD': 206.6, '6M': 181.6, '1Y': 387.9 },
      priceHistory: { '1D': [259.66, 265.21, 256.47, 258.67, 260.96, 262.11, 255.57, 256.32, 257.78, 256.5, 260.12, 257.29, 258.24, 257.79, 257.73, 256.17, 257.39, 257.79, 256.73, 257.43, 254.57, 254.85, 256.32, 256.63], '1W': [286.69, 283.61, 275.25, 259.66, 256.63], '1M': [208.06, 208.37, 226.34, 231.09, 264.51, 260.58, 251.68, 259.67, 227.81, 218, 211.69, 222.24, 232.36, 260.07, 265.1, 280.91, 286.69, 283.61, 275.25, 259.66, 256.63], 'YTD': [83.71, 97.3, 103.89, 96.85, 94.91, 73.87, 89.73, 97.92, 104.88, 95.65, 108.04, 121.52, 105.97, 101.95, 136.33, 165.34, 157.08, 138.23, 195.09, 207.27, 191.82, 226.34, 259.67, 211.69, 280.91, 256.63], '6M': [87.59, 92.83, 107.33, 99.29, 97.87, 89.95, 91.79, 97.52, 102.58, 86.8, 96.43, 116.33, 114.91, 103.76, 125, 166.77, 156.14, 141.19, 195.09, 179.11, 197.73, 208.37, 251.68, 211.69, 280.91, 256.63], '1Y': [52.6, 50.25, 44.3, 52.79, 51.37, 52, 65.31, 68.46, 66.18, 72.04, 65.47, 90.41, 99.31, 107.7, 127.98, 129.58, 123.04, 106.16, 124.18, 109.44, 88.63, 84.64, 94.87, 98.04, 87.69, 89.46, 87.59, 92.83, 107.33, 99.29, 97.87, 89.95, 91.79, 101.8, 106.12, 97.78, 96.43, 116.33, 114.91, 103.76, 125, 166.77, 156.14, 141.19, 195.09, 207.27, 197.73, 208.37, 251.68, 211.69, 280.91, 256.63] },
      velocityScore: { '1D': null, '1W': -3.8, '1M': -37.9, '6M': null }, isNew: true,
      marketCap: '$65B', pe: 98.7, revenueGrowth: 684, eps: 2.6, grossMargin: 72, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 2.73, ALAI: 4.16, CHAT: 3.67, AIFD: 2.04, SPRX: false, AOTG: false },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 4.3, proScore: 4.3, coverage: 1,
      price: 1213.56, weeklyPrices: [1133.99, 1211.38, 1051.77, 1048.51, 1213.56], weeklyChange: 7.02, dayChange: 15.81, sortRank: 0, periodReturns: { '1M': 35.5, 'YTD': 325.2, '6M': 323.3, '1Y': 863.1 },
      priceHistory: { '1D': [1047.92, 1216.69, 1146.21, 1160.79, 1173.33, 1176.13, 1169.9, 1174.04, 1192.3, 1202.52, 1210.46, 1212.73, 1217.82, 1222.73, 1227.89, 1229.99, 1228.53, 1223.31, 1215.09, 1228.88, 1208.61, 1205.19, 1201.45, 1213.56], '1W': [1133.99, 1211.38, 1051.77, 1048.51, 1213.56], '1M': [895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56], 'YTD': [285.41, 327.02, 336.63, 397.58, 435.79, 382.89, 413.97, 428.17, 415.56, 397.05, 405.35, 444.27, 355.46, 367.85, 421.51, 457.23, 481.72, 517.16, 666.59, 803.63, 731.99, 923.52, 996, 891.88, 1043.19, 1213.56], '6M': [284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 766.58, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1213.56], '1Y': [126, 122.29, 124.53, 114.39, 111.26, 104.88, 111.87, 125.29, 115.79, 122, 131.37, 157.23, 162.73, 157.27, 187.83, 181.6, 202.53, 206.71, 224.01, 238.33, 236.95, 201.37, 236.48, 237.22, 241.14, 265.92, 284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1213.56] },
      velocityScore: { '1D': -19.3, '1W': -31.1, '1M': -25.2, '6M': null }, isNew: false,
      marketCap: '$1.4T', pe: 27.4, revenueGrowth: 196, eps: 44.25, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { SOXX: 8.25, PSI: 5.62, XSD: 2.62, DRAM: 0.71 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 5.07, proScore: 3.8, coverage: 0.75,
      price: 532.57, weeklyPrices: [537.37, 551.63, 519.85, 519.74, 532.57], weeklyChange: -0.89, dayChange: 2.6, sortRank: 0, periodReturns: { '1M': 5.7, 'YTD': 148.7, '6M': 147.7, '1Y': 270.7 },
      priceHistory: { '1D': [519.05, 531.41, 512.61, 518.03, 519.42, 523.05, 516.27, 517.86, 519.64, 523.15, 529.48, 524.35, 524.64, 526.07, 527.78, 526.28, 526.75, 528.21, 524.03, 525.18, 523.07, 524.33, 525.02, 532.57], '1W': [537.37, 551.63, 519.85, 519.74, 532.57], '1M': [503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57], 'YTD': [214.16, 204.68, 227.92, 253.73, 252.18, 192.5, 205.94, 200.15, 203.68, 199.45, 197.74, 205.27, 203.77, 210.21, 236.64, 278.26, 305.33, 354.49, 421.39, 445.5, 447.58, 518.09, 523.2, 452.4, 512.48, 532.57], '6M': [214.99, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 203.08, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 448.29, 414.05, 495.54, 542.52, 452.4, 512.48, 532.57], '1Y': [143.68, 137.91, 146.42, 156.99, 166.47, 171.7, 172.4, 180.95, 163.71, 168.58, 151.14, 158.57, 157.39, 159.46, 164.67, 214.9, 234.56, 234.99, 254.84, 237.7, 247.96, 206.02, 217.53, 217.97, 210.78, 213.43, 214.99, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 414.05, 495.54, 542.52, 452.4, 512.48, 532.57] },
      velocityScore: { '1D': 0.5, '1W': -14.2, '1M': -33.3, '6M': null }, isNew: false,
      marketCap: '$868B', pe: 176.9, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 7.69, PSI: 4.96, XSD: 2.56, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.73, proScore: 3.55, coverage: 0.75,
      price: 132.87, weeklyPrices: [133.99, 140.94, 132.28, 131.65, 132.87], weeklyChange: -0.84, dayChange: 0.73, sortRank: 0, periodReturns: { '1M': 7.6, 'YTD': 260.1, '6M': 267.5, '1Y': 490.5 },
      priceHistory: { '1D': [131.91, 136.14, 126.9, 129.51, 130.01, 131.17, 128.71, 129, 129.81, 129.63, 131.33, 129.36, 130.32, 131.9, 132.27, 131.36, 131.53, 131.84, 130.95, 130.29, 130.09, 130.99, 131.02, 132.87], '1W': [133.99, 140.94, 132.28, 131.65, 132.87], '1M': [123.52, 121.77, 120.89, 114.68, 109.33, 107.93, 112.71, 111.78, 99.17, 110.27, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87], 'YTD': [36.9, 41.11, 48.32, 54.32, 48.66, 48.24, 46.48, 44.11, 45.46, 45.95, 45.25, 46.18, 44.1, 48.03, 61.72, 68.5, 66.78, 94.48, 113.01, 120.29, 118.96, 120.89, 111.78, 107.04, 121.1, 132.87], '6M': [36.2, 39.37, 44.06, 48.56, 43.93, 49.25, 47.13, 46.18, 46.12, 43.1, 46.78, 44.06, 44.06, 44.13, 58.95, 64.94, 65.27, 94.75, 113.01, 120.61, 110.8, 121.77, 112.71, 107.04, 121.1, 132.87], '1Y': [22.5, 22.49, 23.43, 23.1, 20.7, 19.31, 19.77, 23.86, 23.5, 24.93, 24.49, 24.08, 29.58, 35.5, 36.83, 36.37, 36.84, 38.16, 40.16, 37.24, 35.91, 33.62, 40.56, 41.41, 37.81, 36.82, 36.2, 39.37, 44.06, 48.56, 43.93, 49.25, 47.13, 45.46, 46.88, 45.58, 46.78, 44.06, 44.06, 44.13, 58.95, 64.94, 65.27, 94.75, 113.01, 120.29, 110.8, 121.77, 112.71, 107.04, 121.1, 132.87] },
      velocityScore: { '1D': 0.3, '1W': -4.3, '1M': -5.6, '6M': null }, isNew: false,
      marketCap: '$668B', pe: null, revenueGrowth: 7, eps: -0.61, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 6.34, PSI: 5.12, XSD: 2.74, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 4.62, proScore: 3.47, coverage: 0.75,
      price: 195.74, weeklyPrices: [210.69, 208.65, 200.04, 199.00, 195.74], weeklyChange: -7.1, dayChange: -1.59, sortRank: 0, periodReturns: { '1M': -8.9, 'YTD': 5, '6M': 3.8, '1Y': 26.3 },
      priceHistory: { '1D': [198.91, 196.11, 193.98, 194.5, 195.11, 196.37, 195.59, 195.17, 195.77, 195.83, 196.54, 195.26, 194.92, 195.21, 195.4, 194.51, 194, 195.07, 195.1, 194.43, 194.1, 194.38, 194.3, 195.74], '1W': [210.69, 208.65, 200.04, 199, 195.74], '1M': [214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74], 'YTD': [186.5, 185.04, 187.05, 184.84, 192.51, 171.88, 186.94, 189.82, 184.89, 183.34, 183.14, 178.56, 171.24, 175.75, 183.91, 198.35, 199.64, 199.57, 207.83, 225.83, 223.47, 214.25, 218.66, 200.42, 204.65, 195.74], '6M': [190.53, 188.12, 184.94, 178.07, 188.52, 180.34, 188.54, 184.97, 192.85, 180.05, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 220.78, 220.61, 212.6, 214.75, 200.42, 204.65, 195.74], '1Y': [155.02, 159.34, 164.92, 172.41, 173.5, 173.72, 180.77, 182.02, 174.98, 180.17, 167.02, 177.82, 176.67, 178.19, 187.62, 183.16, 181.81, 182.16, 202.89, 188.08, 186.86, 180.64, 177, 182.41, 175.02, 180.99, 190.53, 188.12, 184.94, 178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 220.61, 212.6, 214.75, 200.42, 204.65, 195.74] },
      velocityScore: { '1D': 0.3, '1W': 18.4, '1M': 2.1, '6M': null }, isNew: false,
      marketCap: '$4.7T', pe: 30, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.5,
      etfPresence: { SOXX: 7.2, PSI: 4.46, XSD: 2.21, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.63, proScore: 2.72, coverage: 0.75,
      price: 417.93, weeklyPrices: [434.46, 445.48, 407.26, 413.16, 417.93], weeklyChange: -3.8, dayChange: 1.15, sortRank: 0, periodReturns: { '1M': -0.5, 'YTD': 54.1, '6M': 50.6, '1Y': 76.1 },
      priceHistory: { '1D': [413.16, 419.76, 419.07, 419.86, 422.46, 424.61, 420.99, 421.4, 421.86, 419.89, 423.57, 420.95, 420.4, 421.27, 423.1, 421.6, 422, 424.07, 420.2, 419.75, 416.92, 417.86, 416.45, 417.93], '1W': [434.46, 445.48, 407.26, 413.16, 417.93], '1M': [419.94, 416.88, 419.01, 413.85, 402.69, 423.2, 437.67, 428.76, 401.39, 403.89, 392.67, 412.13, 417.79, 427.58, 416, 414.45, 434.46, 445.48, 407.26, 413.16, 417.93], 'YTD': [271.2, 299.16, 302.1, 308.52, 318.7, 322.12, 331.36, 355.03, 354.35, 329.72, 307.27, 310.44, 313.42, 320.58, 351.36, 353.8, 403.88, 402.26, 415.63, 432.39, 398.05, 419.01, 428.76, 392.67, 414.45, 417.93], '6M': [276.84, 277.29, 293.86, 295.67, 303.83, 311.29, 325.16, 337.51, 356.09, 338.99, 318.81, 313.66, 321.83, 318.14, 346.21, 347.94, 381.42, 389.31, 415.63, 419.65, 414.31, 416.88, 437.67, 392.67, 414.45, 417.93], '1Y': [237.3, 245.68, 244.68, 241.85, 227.82, 221.71, 223.12, 236.21, 246.95, 254.25, 247.07, 245.21, 245.33, 247.56, 241.99, 225.32, 241.61, 243.29, 232.9, 232.88, 237.53, 225.2, 265.34, 281.29, 279.32, 274.44, 276.84, 277.29, 293.86, 295.67, 303.83, 311.29, 325.16, 346.37, 360.8, 341.51, 318.81, 313.66, 321.83, 318.14, 346.21, 347.94, 381.42, 389.31, 415.63, 432.39, 414.31, 416.88, 437.67, 392.67, 414.45, 417.93] },
      velocityScore: { '1D': 2.3, '1W': 14.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$204B', pe: 62.1, revenueGrowth: 37, eps: 6.73, grossMargin: 64, dividendYield: 1.06,
      etfPresence: { SOXX: 3.81, PSI: 4.73, XSD: 2.34, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.6% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 5.61, proScore: 2.8, coverage: 0.5,
      price: 668, weeklyPrices: [617.11, 640.18, 585.88, 588.97, 668.00], weeklyChange: 8.25, dayChange: 13.42, sortRank: 0, periodReturns: { '1M': 46.8, 'YTD': 159.9, '6M': 156.2, '1Y': 264 },
      priceHistory: { '1D': [588.97, 625.22, 614.42, 622.64, 629.94, 634.15, 628.39, 629.81, 633.91, 636.48, 648.89, 649.54, 649.2, 654.41, 653.32, 651.28, 653.61, 654.05, 649.68, 651.04, 650.83, 655.45, 660.06, 668], '1W': [617.11, 640.18, 585.88, 588.97, 668], '1M': [454.89, 448.25, 449.68, 450.06, 458.17, 490.05, 500.77, 501.7, 453.01, 492.17, 497.01, 552.64, 567.25, 585.78, 568.23, 592.92, 617.11, 640.18, 585.88, 588.97, 668], 'YTD': [256.99, 281.64, 319.08, 318.79, 341.34, 303.99, 328.39, 375.38, 375.72, 346.53, 337.27, 357.21, 338.55, 353.8, 397.81, 389.9, 403.91, 394.49, 428.62, 436.61, 426.85, 449.68, 501.7, 497.01, 592.92, 668], '6M': [261.9, 284.32, 307.24, 318.23, 332.71, 318.67, 329.07, 359.13, 377.93, 351.32, 345.88, 352.46, 373.99, 341.79, 385.72, 394.26, 403.48, 382.59, 428.62, 431.2, 406.91, 448.25, 500.77, 497.01, 592.92, 668], '1Y': [183.52, 191.05, 197.93, 190.44, 185.69, 179.99, 183.15, 188.24, 159.84, 165.27, 162.75, 167.8, 190.1, 203.92, 217.53, 209.95, 227.72, 228.47, 232.55, 233.53, 223.23, 220.23, 252.25, 268, 259.21, 256.41, 261.9, 284.32, 307.24, 318.23, 332.71, 318.67, 329.07, 369.3, 394.95, 357.76, 345.88, 352.46, 373.99, 341.79, 385.72, 394.26, 403.48, 382.59, 428.62, 436.61, 406.91, 448.25, 500.77, 497.01, 592.92, 668] },
      velocityScore: { '1D': 1.1, '1W': -5.7, '1M': -4.4, '6M': null }, isNew: false,
      marketCap: '$530B', pe: 63, revenueGrowth: 11, eps: 10.6, grossMargin: 49, dividendYield: 0.36,
      etfPresence: { SOXX: 5, PSI: 6.22, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 5.26, proScore: 2.63, coverage: 0.5,
      price: 258.8, weeklyPrices: [259.56, 269.16, 244.49, 240.48, 258.80], weeklyChange: -0.29, dayChange: 7.62, sortRank: 0, periodReturns: { '1M': 28.7, 'YTD': 113, '6M': 102.7, '1Y': 186.6 },
      priceHistory: { '1D': [240.47, 249.96, 245.5, 246.88, 249.32, 252.24, 250.79, 251.88, 252.91, 253.66, 258.63, 257.9, 256.25, 258.45, 258.86, 258.25, 258.79, 259.96, 258.67, 258.5, 257.45, 257.99, 258.2, 258.8], '1W': [259.56, 269.16, 244.49, 240.48, 258.8], '1M': [201.14, 195.72, 192.76, 192.17, 194, 204.52, 212.51, 213.11, 192.92, 210.81, 213.56, 241.16, 254.54, 256.42, 237.33, 238.73, 259.56, 269.16, 244.49, 240.48, 258.8], 'YTD': [121.51, 132.46, 154.5, 150, 168.47, 133.1, 145.09, 149.6, 152.43, 142.94, 140.96, 151.15, 145.11, 151.98, 172.73, 173.49, 181.54, 175.04, 181.63, 184.97, 182.95, 192.76, 213.11, 213.56, 238.73, 258.8], '6M': [127.96, 135.24, 142.82, 148.62, 161.63, 135.55, 143.08, 147.02, 150.66, 144.13, 145.29, 148.13, 156.62, 147.24, 167.23, 174.81, 181.21, 181.62, 181.63, 181.13, 174.06, 195.72, 212.51, 213.56, 238.73, 258.8], '1Y': [90.29, 92.46, 92.46, 93.11, 90.21, 88.66, 91.21, 95.54, 87.24, 89.4, 90.51, 96.4, 104.48, 106.43, 110.15, 98.28, 109.88, 115.9, 121.44, 120.64, 116.17, 110.25, 117.55, 121.45, 119.39, 124.57, 127.96, 135.24, 142.82, 148.62, 161.63, 135.55, 143.08, 148.03, 154.67, 147.59, 145.29, 148.13, 156.62, 147.24, 167.23, 174.81, 181.21, 181.62, 181.63, 184.97, 174.06, 195.72, 212.51, 213.56, 238.73, 258.8] },
      velocityScore: { '1D': -1.1, '1W': 11.9, '1M': 0.8, '6M': null }, isNew: false,
      marketCap: '$338B', pe: 73.1, revenueGrowth: 12, eps: 3.54, grossMargin: 61, dividendYield: 0.38,
      etfPresence: { SOXX: 4.78, PSI: 5.74, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 5.04, proScore: 2.52, coverage: 0.5,
      price: 401.82, weeklyPrices: [389.04, 409.54, 371.33, 374.80, 401.82], weeklyChange: 3.29, dayChange: 7.2, sortRank: 0, periodReturns: { '1M': 24.5, 'YTD': 134.7, '6M': 126.6, '1Y': 314.9 },
      priceHistory: { '1D': [374.82, 385.03, 374.61, 378.53, 383, 383.78, 377.63, 381.5, 383.37, 386.69, 395.63, 394.43, 392.3, 394.27, 393.94, 392.85, 393.3, 395.16, 392.95, 394.75, 393.57, 396.22, 397.89, 401.82], '1W': [389.04, 409.54, 371.33, 374.8, 401.82], '1M': [322.68, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 321.8, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04, 409.54, 371.33, 374.8, 401.82], 'YTD': [171.18, 200.96, 217.47, 220.7, 248.17, 213.31, 231.29, 244.92, 239.07, 214.68, 209.49, 233.99, 211.62, 222.01, 258.76, 260.96, 258.56, 257.86, 297.17, 295.44, 292.09, 318, 336.41, 321.8, 374.18, 401.82], '6M': [178.07, 194.76, 220.4, 222.41, 238.46, 230.1, 226.61, 235.58, 244.25, 217.27, 215.23, 226.47, 238.84, 213.66, 246.49, 265.16, 265.55, 248.75, 297.17, 289.24, 273.38, 318.93, 343.71, 321.8, 374.18, 401.82], '1Y': [96.84, 98.81, 101.73, 100.66, 96.96, 96.37, 99.15, 107.38, 98.41, 104.09, 102.95, 116.96, 126.92, 128.33, 145.81, 131.37, 142.37, 147.54, 161.01, 162.19, 153.32, 139.59, 156, 158.7, 160.52, 172.27, 178.07, 194.76, 220.4, 222.41, 238.46, 230.1, 226.61, 240.09, 249.48, 222.99, 215.23, 226.47, 238.84, 213.66, 246.49, 265.16, 265.55, 248.75, 297.17, 295.44, 273.38, 318.93, 343.71, 321.8, 374.18, 401.82] },
      velocityScore: { '1D': 1.6, '1W': 7.7, '1M': -5.3, '6M': null }, isNew: false,
      marketCap: '$503B', pe: 76.1, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.28,
      etfPresence: { SOXX: 4.5, PSI: 5.59, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 4.41, proScore: 2.2, coverage: 0.5,
      price: 378.91, weeklyPrices: [411.35, 392.13, 380.15, 382.07, 378.91], weeklyChange: -7.89, dayChange: -0.83, sortRank: 0, periodReturns: { '1M': -10.2, 'YTD': 9.5, '6M': 8.2, '1Y': 40.2 },
      priceHistory: { '1D': [382.08, 381.97, 375.37, 379.45, 380.27, 384.48, 379.33, 381.11, 382.88, 382.58, 385.41, 380.82, 380.59, 380.78, 380.27, 379.74, 379.38, 381.33, 379.9, 379.7, 378.46, 378.33, 377.97, 378.91], '1W': [411.35, 392.13, 380.15, 382.07, 378.91], '1M': [422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91], 'YTD': [346.1, 332.48, 343.02, 325.49, 330.73, 310.51, 331.17, 332.65, 321.7, 332.77, 335.97, 319.84, 309.42, 313.49, 354.91, 398.47, 419.94, 417.43, 425.44, 416.79, 417.76, 426.58, 418.91, 372.1, 392.9, 378.91], '6M': [352.13, 343.42, 352.21, 332.6, 332.79, 320.33, 340.44, 332.54, 325.49, 313.84, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 419.3, 411.07, 421.86, 479.23, 372.1, 392.9, 378.91], '1Y': [270.17, 275.18, 274.38, 283.34, 290.18, 288.64, 303.76, 311.23, 289.6, 308.65, 334.89, 359.87, 344.94, 334.53, 338.37, 324.63, 354.15, 344.29, 376.47, 355.59, 339.98, 346.82, 402.96, 390.24, 359.93, 340.36, 352.13, 343.42, 352.21, 332.6, 332.79, 320.33, 340.44, 333.51, 332.31, 317.53, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 411.07, 421.86, 479.23, 372.1, 392.9, 378.91] },
      velocityScore: { '1D': 0.9, '1W': 17, '1M': -40.4, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 63.2, revenueGrowth: 48, eps: 6, grossMargin: 76, dividendYield: 0.68,
      etfPresence: { SOXX: 6.53, PSI: false, XSD: 2.28, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 3.8, proScore: 1.9, coverage: 0.5,
      price: 281.26, weeklyPrices: [310.58, 307.86, 279.04, 276.70, 281.26], weeklyChange: -9.44, dayChange: 1.65, sortRank: 0, periodReturns: { '1M': 35.1, 'YTD': 231, '6M': 225.2, '1Y': 251.7 },
      priceHistory: { '1D': [276.69, 270.1, 267.2, 269.25, 273.42, 275.91, 272.52, 273.18, 274.7, 276.74, 280.04, 277.9, 277.54, 278.79, 280.19, 280.37, 281.68, 279.48, 276.54, 279.29, 278.13, 280.04, 278.24, 281.26], '1W': [310.58, 307.86, 279.04, 276.7, 281.26], '1M': [208.26, 198.7, 204.83, 205, 219.43, 290.79, 301.65, 316.43, 263.47, 288.85, 252.59, 280.71, 279.7, 308.88, 278.67, 289.54, 310.58, 307.86, 279.04, 276.7, 281.26], 'YTD': [84.98, 83.45, 80.38, 83.1, 81.34, 74.21, 78.23, 79.48, 79.29, 75.68, 87.67, 89.53, 97.68, 106.71, 119.93, 133.37, 165.56, 165.15, 172.15, 177.95, 186.8, 204.83, 316.43, 252.59, 289.54, 281.26], '6M': [86.34, 90.23, 82.89, 79.8, 82.93, 75.54, 82.01, 79.01, 78.39, 77.51, 93.3, 90.79, 92.36, 99.05, 114.45, 134.6, 157.32, 156.57, 172.15, 164.5, 176.27, 198.7, 301.65, 252.59, 289.54, 281.26], '1Y': [79.97, 75.18, 72.71, 74.65, 74.21, 74.45, 75.85, 79.04, 71.21, 77.23, 63.33, 67.35, 74.26, 83.17, 86.22, 85.61, 88.23, 82.77, 88.57, 93.33, 87.52, 76.68, 89.4, 98.91, 84.43, 84.09, 86.34, 90.23, 82.89, 79.8, 82.93, 75.54, 82.01, 79.09, 80.92, 78.09, 93.3, 90.79, 92.36, 99.05, 114.45, 134.6, 157.32, 156.57, 172.15, 177.95, 176.27, 198.7, 301.65, 252.59, 289.54, 281.26] },
      velocityScore: { '1D': 0, '1W': -42.4, '1M': -43.8, '6M': null }, isNew: false,
      marketCap: '$246B', pe: 96.7, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.09,
      etfPresence: { SOXX: 5.16, PSI: false, XSD: 2.44, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 3.09, proScore: 1.54, coverage: 0.5,
      price: 311.81, weeklyPrices: [322.86, 332.28, 304.36, 303.11, 311.81], weeklyChange: -3.42, dayChange: 2.87, sortRank: 0, periodReturns: { '1M': -4, 'YTD': 79.7, '6M': 76, '1Y': 51.1 },
      priceHistory: { '1D': [303.11, 309.98, 308.55, 309.71, 311.58, 311.52, 309.6, 309.68, 310.2, 310.67, 313.59, 312.17, 311.22, 312.49, 312.86, 312.87, 312.93, 314.35, 311.73, 311.26, 310.85, 311.85, 310.57, 311.81], '1W': [322.86, 332.28, 304.36, 303.11, 311.81], '1M': [324.89, 317.45, 315.95, 305.68, 293.2, 308.12, 308.59, 305.37, 285.06, 290.9, 282.01, 297.1, 301.12, 313.34, 305.71, 301.88, 322.86, 332.28, 304.36, 303.11, 311.81], 'YTD': [173.49, 188.45, 189.12, 194.99, 218.97, 223.98, 223, 219.73, 212.63, 197.98, 190.05, 188.29, 193.41, 196.3, 214.98, 223.1, 282.23, 281.08, 289.44, 306.34, 304.88, 315.95, 305.37, 282.01, 301.88, 311.81], '6M': [176.88, 177.17, 189.07, 189.59, 196.63, 225.21, 220.92, 225.69, 213.35, 202.67, 197.46, 194.45, 194.63, 194.14, 208.9, 216.29, 236.31, 269.22, 289.44, 295.17, 302.31, 317.45, 308.59, 282.01, 301.88, 311.81], '1Y': [206.31, 216.02, 221.25, 216.62, 184.99, 180.86, 185.91, 193.71, 200.71, 204.09, 187.93, 182.6, 179.37, 184.55, 180.32, 171.7, 175.48, 172.19, 160.51, 161.38, 162.23, 153.33, 168.27, 182.54, 179.42, 176.29, 176.88, 177.17, 189.07, 189.59, 196.63, 225.21, 220.92, 223.32, 213.9, 202.39, 197.46, 194.45, 194.63, 194.14, 208.9, 216.29, 236.31, 269.22, 289.44, 306.34, 302.31, 317.45, 308.59, 282.01, 301.88, 311.81] },
      velocityScore: { '1D': 0, '1W': 8.5, '1M': -51.3, '6M': null }, isNew: false,
      marketCap: '$284B', pe: 53.3, revenueGrowth: 19, eps: 5.85, grossMargin: 57, dividendYield: 1.87,
      etfPresence: { SOXX: 3.79, PSI: false, XSD: 2.39, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.89, proScore: 1.45, coverage: 0.5,
      price: 298.64, weeklyPrices: [313.27, 323.24, 299.94, 294.06, 298.64], weeklyChange: -4.67, dayChange: 1.45, sortRank: 0, periodReturns: { '1M': -10.2, 'YTD': 37.6, '6M': 32.6, '1Y': 36.8 },
      priceHistory: { '1D': [294.36, 299.11, 297.09, 298.48, 299.71, 301.29, 298.53, 300.77, 300.89, 300.67, 303.2, 301.78, 301.16, 303.3, 304.15, 302.19, 302.05, 302.65, 300.16, 299.93, 298.99, 299.3, 297.6, 298.64], '1W': [313.27, 323.24, 299.94, 294.06, 298.64], '1M': [332.67, 329.24, 330.28, 321.35, 311.38, 323.62, 321.88, 322.22, 295.96, 301.14, 285.56, 302.55, 304.86, 315.88, 302.89, 298.2, 313.27, 323.24, 299.94, 294.06, 298.64], 'YTD': [217.06, 237.89, 238.6, 236.75, 233.5, 222.13, 242.19, 232.27, 232.23, 210.58, 191.22, 192.35, 196.92, 195.58, 205.67, 213.73, 241.16, 293.59, 303.55, 298.41, 310.15, 330.28, 322.22, 285.56, 298.2, 298.64], '6M': [222.87, 223.88, 238.33, 230.7, 229.42, 220.66, 236.62, 245.09, 234.63, 215.25, 203.03, 194.02, 196.4, 196.86, 204.27, 209.39, 225.75, 289.25, 303.55, 294.23, 294.28, 329.24, 321.88, 285.56, 298.2, 298.64], '1Y': [218.3, 232.1, 228.92, 225.9, 223.29, 209.92, 205.91, 231.54, 223.93, 239.07, 226.74, 218.82, 224.05, 226.04, 228.89, 205.37, 217.41, 220.73, 206.38, 206.45, 201.22, 184.19, 194.94, 227.95, 228.16, 226.27, 222.87, 223.88, 238.33, 230.7, 229.42, 220.66, 236.62, 237.33, 235.07, 216.37, 203.03, 194.02, 196.4, 196.86, 204.27, 209.39, 225.75, 289.25, 303.55, 298.41, 294.28, 329.24, 321.88, 285.56, 298.2, 298.64] },
      velocityScore: { '1D': -0.7, '1W': 8.2, '1M': -31.9, '6M': null }, isNew: false,
      marketCap: '$75B', pe: 28.5, revenueGrowth: 12, eps: 10.47, grossMargin: 56, dividendYield: 1.38,
      etfPresence: { SOXX: 3.5, PSI: false, XSD: 2.29, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.7, proScore: 1.35, coverage: 0.5,
      price: 1438.3, weeklyPrices: [1563.70, 1537.88, 1423.76, 1434.95, 1438.30], weeklyChange: -8.02, dayChange: 0.23, sortRank: 0, periodReturns: { '1M': -13.5, 'YTD': 58.7, '6M': 50.9, '1Y': 95.6 },
      priceHistory: { '1D': [1434.95, 1416.71, 1394.8, 1413.65, 1424.18, 1437.99, 1427.23, 1439.6, 1447.51, 1443.93, 1462.82, 1452.08, 1445.02, 1452.49, 1450.32, 1445.8, 1449.55, 1463.35, 1441.5, 1438.21, 1432.11, 1437.03, 1433.51, 1438.3], '1W': [1563.7, 1537.88, 1423.76, 1434.95, 1438.3], '1M': [1662.98, 1620.17, 1633.17, 1566.21, 1542.39, 1624.99, 1689.89, 1652.6, 1481.05, 1559.18, 1473.04, 1589.55, 1577.32, 1652.29, 1498.77, 1448.21, 1563.7, 1537.88, 1423.76, 1434.95, 1438.3], 'YTD': [906.36, 959.09, 1009.54, 1076.67, 1183.15, 1155.99, 1155.93, 1204.1, 1180.13, 1078.44, 1033.88, 1092.69, 1058.28, 1119.51, 1334.21, 1402.81, 1592.17, 1614.41, 1652.35, 1650.35, 1553.27, 1633.17, 1652.6, 1473.04, 1448.21, 1438.3], '6M': [946.32, 955.03, 967.16, 1034.49, 1095.49, 1164.83, 1142.02, 1173.18, 1213.67, 1074.37, 1055.82, 1066.66, 1101.59, 1093.35, 1312.94, 1353, 1522.04, 1526.84, 1652.35, 1599.52, 1468.11, 1620.17, 1689.89, 1473.04, 1448.21, 1438.3], '1Y': [735.17, 758.64, 736.06, 725.24, 714.68, 785.62, 797.94, 848.81, 820.74, 858.46, 865.86, 834.14, 916.36, 887.55, 918.83, 904.44, 1026.83, 1070.8, 1087.56, 958.07, 924.29, 857.19, 928.17, 963.28, 946.51, 937.11, 946.32, 955.03, 967.16, 1034.49, 1095.49, 1164.83, 1142.02, 1188.32, 1231.95, 1099.02, 1055.82, 1066.66, 1101.59, 1093.35, 1312.94, 1353, 1522.04, 1526.84, 1652.35, 1650.35, 1468.11, 1620.17, 1689.89, 1473.04, 1448.21, 1438.3] },
      velocityScore: { '1D': 2.3, '1W': 7.1, '1M': -34.8, '6M': null }, isNew: false,
      marketCap: '$71B', pe: 103.3, revenueGrowth: 26, eps: 13.92, grossMargin: 55, dividendYield: 0.56,
      etfPresence: { SOXX: 3.23, PSI: false, XSD: 2.16, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 2.68, proScore: 1.34, coverage: 0.5,
      price: 398, weeklyPrices: [417.07, 439.66, 397.02, 399.92, 398.00], weeklyChange: -4.57, dayChange: -0.48, sortRank: 0, periodReturns: { '1M': 24.9, 'YTD': 139.2, '6M': 134.2, '1Y': 306.3 },
      priceHistory: { '1D': [399.92, 408.27, 391.09, 395.84, 406.01, 405.86, 399.9, 401.9, 407.38, 406.08, 413.36, 407.12, 404.35, 402.8, 404.12, 400.33, 402.22, 400, 394.6, 394.61, 389.58, 393.08, 392.92, 398], '1W': [417.07, 439.66, 397.02, 399.92, 398], '1M': [318.72, 325.33, 349.17, 342.85, 320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 330.86, 367.47, 367.15, 389.2, 361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 398], 'YTD': [166.36, 156.73, 174.45, 176.35, 160.46, 142.82, 126.58, 129.68, 124.67, 120, 119.9, 126.16, 113.61, 106.33, 129.46, 170.81, 197.54, 194.74, 213.91, 224.09, 287.48, 349.17, 358.05, 330.86, 374.68, 398], '6M': [167.26, 167.11, 172.57, 183.75, 170.93, 158.52, 182.86, 123.69, 128.4, 109.8, 116.48, 127.57, 121.76, 109.6, 125.46, 172.09, 194.06, 196.85, 213.91, 204.42, 244.26, 325.33, 363.54, 330.86, 374.68, 398], '1Y': [97.96, 90.8, 95.9, 102.13, 122.23, 131.1, 170.89, 190.69, 177.53, 189.15, 191.2, 229.5, 245.2, 197.78, 200.74, 206.21, 163.55, 163.64, 169.55, 162.83, 144.47, 139.29, 157.57, 161.23, 148.85, 164.4, 167.26, 167.11, 172.57, 183.75, 170.93, 158.52, 182.86, 129.58, 128.15, 113.77, 116.48, 127.57, 121.76, 109.6, 125.46, 172.09, 194.06, 196.85, 213.91, 224.09, 244.26, 325.33, 363.54, 330.86, 374.68, 398] },
      velocityScore: { '1D': 2.3, '1W': -24.3, '1M': -36.5, '6M': null }, isNew: false,
      marketCap: '$68B', pe: 268.9, revenueGrowth: 93, eps: 1.48, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.66, PSI: false, XSD: 2.7, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 2.65, proScore: 1.33, coverage: 0.5,
      price: 204.9, weeklyPrices: [226.11, 221.90, 204.13, 197.41, 204.90], weeklyChange: -9.38, dayChange: 3.84, sortRank: 0, periodReturns: { '1M': -17.7, 'YTD': 19.8, '6M': 17.2, '1Y': 29.5 },
      priceHistory: { '1D': [197.32, 208.99, 204.01, 206.97, 205.84, 206.65, 202.95, 204.95, 205.33, 209.56, 212.87, 212.07, 212.65, 213.93, 213.73, 211.91, 211.52, 210.7, 209.02, 208.56, 206.49, 207.24, 205.47, 204.9], '1W': [226.11, 221.9, 204.13, 197.41, 204.9], '1M': [248.82, 233.4, 243.29, 251.02, 228.99, 240.84, 250.01, 242.57, 215.94, 217.77, 191.2, 202.96, 211.72, 220.81, 214.07, 212.97, 226.11, 221.9, 204.13, 197.41, 204.9], 'YTD': [171.05, 181.87, 161.39, 157.8, 152.22, 136.3, 138.47, 142.88, 145.59, 137, 131.15, 131.28, 130.54, 127.28, 127.75, 134.47, 133.95, 179.58, 192.57, 213.17, 202.51, 243.29, 242.57, 191.2, 212.97, 204.9], '6M': [174.81, 176.31, 169.27, 154.07, 153.04, 147.18, 140.09, 142.63, 144.78, 138.13, 135.2, 131.59, 128.67, 128.78, 127.51, 133.05, 136.07, 156, 192.57, 210.31, 195.61, 233.4, 250.01, 191.2, 212.97, 204.9], '1Y': [158.19, 162.21, 157.46, 154.8, 158.4, 148.19, 145.9, 158.09, 154.13, 160.8, 159.84, 161.83, 166.85, 169.2, 169.18, 153.59, 164.08, 170.03, 177.26, 173.2, 174.5, 159.59, 168.09, 174.81, 178.29, 175.25, 174.81, 176.31, 169.27, 154.07, 153.04, 147.18, 140.09, 143.24, 145.82, 139.51, 135.2, 131.59, 128.67, 128.78, 127.51, 133.05, 136.07, 156, 192.57, 213.17, 195.61, 233.4, 250.01, 191.2, 212.97, 204.9] },
      velocityScore: { '1D': -2.2, '1W': -10.1, '1M': -46.6, '6M': null }, isNew: false,
      marketCap: '$216B', pe: 22, revenueGrowth: -4, eps: 9.3, grossMargin: 55, dividendYield: 1.86,
      etfPresence: { SOXX: 3, PSI: false, XSD: 2.3, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.34, proScore: 1.17, coverage: 0.5,
      price: 94.12, weeklyPrices: [99.77, 102.71, 93.26, 92.48, 94.12], weeklyChange: -5.66, dayChange: 1.71, sortRank: 0, periodReturns: { '1M': -4, 'YTD': 47.7, '6M': 44, '1Y': 33 },
      priceHistory: { '1D': [92.54, 94.05, 93.34, 93.65, 94.23, 94.89, 94.18, 94.7, 94.75, 94.63, 95.67, 95.09, 94.72, 95.48, 95.68, 95.3, 95.25, 95.63, 94.81, 94.67, 94.18, 94.27, 93.56, 94.12], '1W': [99.77, 102.71, 93.26, 92.48, 94.12], '1M': [98.05, 96.85, 96.04, 94.65, 91.52, 96.96, 96.55, 96.3, 88.34, 91.37, 87.91, 92.94, 95.24, 100.32, 95.63, 94.11, 99.77, 102.71, 93.26, 92.48, 94.12], 'YTD': [63.72, 73.53, 74.45, 75.47, 79.36, 78.04, 78.92, 77.73, 74.97, 67.81, 62.73, 63.29, 64.2, 65.38, 71.22, 76.87, 90.64, 92.91, 102.92, 96.71, 94.02, 96.04, 96.3, 87.91, 94.11, 94.12], '6M': [64.94, 67.06, 73.39, 73.17, 75.16, 76.66, 76.86, 78.94, 75.93, 71.39, 65.33, 64.59, 65.63, 64.61, 70.73, 74.49, 82.48, 90.17, 102.92, 97.7, 91.81, 96.85, 96.55, 87.91, 94.11, 94.12], '1Y': [70.78, 73.06, 74.56, 74.78, 69.21, 66.36, 66.22, 65.99, 66.1, 65.25, 65.92, 64.7, 65.15, 64.42, 66.54, 60.41, 65.35, 65.09, 62.07, 59.35, 54.81, 49.02, 53.58, 65.81, 67.18, 64.91, 64.94, 67.06, 73.39, 73.17, 75.16, 76.66, 76.86, 79.11, 75.47, 69.9, 65.33, 64.59, 65.63, 64.61, 70.73, 74.49, 82.48, 90.17, 102.92, 96.71, 91.81, 96.85, 96.55, 87.91, 94.11, 94.12] },
      velocityScore: { '1D': 0, '1W': 1.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$51B', pe: 427.8, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 1.97,
      etfPresence: { SOXX: 2.34, PSI: false, XSD: 2.35, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.32, proScore: 1.16, coverage: 0.5,
      price: 268.03, weeklyPrices: [271.83, 302.52, 272.01, 268.99, 268.03], weeklyChange: -1.4, dayChange: -0.43, sortRank: 0, periodReturns: { '1M': 20.9, 'YTD': 86.3, '6M': 78.5, '1Y': 182 },
      priceHistory: { '1D': [269.2, 276, 265.61, 269.53, 276.86, 277.32, 271.34, 269.29, 273.48, 268.94, 273.14, 271.18, 271.36, 270.95, 272.43, 268.2, 268.99, 269.32, 266.59, 265.73, 262.63, 262.34, 264.21, 268.03], '1W': [271.83, 302.52, 272.01, 268.99, 268.03], '1M': [221.64, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 217.5, 206.89, 222.27, 237.68, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03], 'YTD': [143.89, 141.59, 149.12, 135.1, 129.47, 98.06, 121.78, 124.06, 114.48, 114.74, 111.57, 107.09, 96.44, 95.92, 107.93, 158.93, 185.54, 174.01, 198.29, 189.36, 182.98, 222.35, 217.5, 237.68, 249.33, 268.03], '6M': [144.83, 140.24, 156.07, 153.22, 129.57, 111.31, 134.72, 124.8, 120.83, 97.3, 112.33, 104.06, 100.3, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 198.57, 168.99, 221.23, 214.6, 237.68, 249.33, 268.03], '1Y': [95.05, 93.61, 98.52, 93.47, 101.22, 107.56, 119.78, 117.33, 110.86, 131.82, 140.82, 161.99, 169.56, 142.93, 143.87, 138.83, 136.53, 150.97, 166.62, 162.74, 142.95, 134.73, 177.6, 176.04, 143.91, 150.13, 144.83, 140.24, 156.07, 153.22, 129.57, 111.31, 134.72, 127.91, 123.46, 102.54, 112.33, 104.06, 100.3, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 189.36, 168.99, 221.23, 214.6, 237.68, 249.33, 268.03] },
      velocityScore: { '1D': 0, '1W': -11.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$50B', pe: 107.2, revenueGrowth: 157, eps: 2.5, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 2.11, PSI: false, XSD: 2.52, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 2.24, proScore: 1.12, coverage: 0.5,
      price: 118.74, weeklyPrices: [121.62, 131.55, 117.06, 115.74, 118.74], weeklyChange: -2.37, dayChange: 2.56, sortRank: 0, periodReturns: { '1M': -6.5, 'YTD': 119.3, '6M': 115.6, '1Y': 121.3 },
      priceHistory: { '1D': [115.78, 117.41, 114.53, 116.18, 117.77, 118.82, 117.28, 118.07, 118.71, 118.8, 120.45, 119.68, 119.7, 120.54, 120.68, 120.03, 120.29, 121.05, 119.7, 119.61, 118.73, 118.9, 117.99, 118.74], '1W': [121.62, 131.55, 117.06, 115.74, 118.74], '1M': [127, 124.89, 123.77, 120.62, 120.92, 128.64, 133.93, 131.82, 117.26, 120.9, 110.17, 115.96, 116.79, 125.9, 118.25, 112.92, 121.62, 131.55, 117.06, 115.74, 118.74], 'YTD': [54.15, 60.89, 60.28, 63.07, 62.2, 63.1, 70.63, 69.11, 68.16, 60.85, 57.69, 59.29, 60.87, 62.2, 68.49, 79.93, 97.78, 100.81, 105.77, 115.71, 110.21, 123.77, 131.82, 110.17, 112.92, 118.74], '6M': [54.93, 58.69, 58.75, 60.06, 62.63, 59.43, 67.38, 71.96, 70.03, 63.42, 59.59, 60.98, 62.34, 61.92, 68.38, 72.43, 88.99, 98.86, 105.77, 104.11, 106.02, 124.89, 133.93, 110.17, 112.92, 118.74], '1Y': [53.65, 56.6, 59.73, 60.72, 56.92, 56.82, 47.59, 51.62, 48.81, 50.78, 49.11, 48.26, 51.07, 50.16, 49.27, 45.74, 52.97, 51.78, 50.85, 48.8, 48.13, 44.9, 50.24, 54.74, 54.96, 55.21, 54.93, 58.69, 58.75, 60.06, 62.63, 59.43, 67.38, 70.66, 69.68, 62.53, 59.59, 60.98, 62.34, 61.92, 68.38, 72.43, 88.99, 98.86, 105.77, 115.71, 106.02, 124.89, 133.93, 110.17, 112.92, 118.74] },
      velocityScore: { '1D': 0, '1W': -11.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$46B', pe: 86.7, revenueGrowth: 5, eps: 1.37, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 2.14, PSI: false, XSD: 2.33, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 2, avgWeight: 1.78, proScore: 0.89, coverage: 0.5,
      price: 390.19, weeklyPrices: [391.41, 396.26, 372.15, 373.08, 390.19], weeklyChange: -0.31, dayChange: 4.59, sortRank: 0, periodReturns: { '1M': -4.8, 'YTD': 127.8, '6M': 121.9, '1Y': 174.3 },
      priceHistory: { '1D': [373.08, 374.99, 368.25, 374.85, 378.27, 385.8, 381.01, 381.72, 382.92, 382.73, 388.07, 387.08, 387.56, 390.36, 388.54, 388.96, 389.26, 390.32, 388.26, 386.84, 385.98, 390, 388.59, 390.19], '1W': [391.41, 396.26, 372.15, 373.08, 390.19], '1M': [409.68, 400.66, 391.09, 364.64, 353.79, 382.35, 390.34, 382.74, 345.4, 361.86, 354.4, 374.76, 379.87, 384.77, 368.32, 367.11, 391.41, 396.26, 372.15, 373.08, 390.19], 'YTD': [171.28, 167.66, 218.93, 224.29, 227.73, 227.8, 238.99, 243.59, 247.11, 228.98, 215.94, 224.54, 228.5, 229.36, 247.71, 261.42, 284.4, 281.61, 309.81, 381.55, 375.71, 391.09, 382.74, 354.4, 367.11, 390.19], '6M': [175.01, 170.76, 197.55, 221.7, 219.2, 226.71, 230.54, 245.59, 248.29, 241.01, 220.59, 221.29, 237.23, 222.07, 247, 261.16, 277, 269.63, 309.81, 362.76, 358.98, 400.66, 390.34, 354.4, 367.11, 390.19], '1Y': [142.23, 140.68, 136.2, 142.11, 137.67, 136.31, 127.75, 125.4, 123.58, 133.89, 129.86, 131.87, 127.12, 129.39, 127.41, 122.18, 137.94, 139.31, 150.61, 166.92, 162.24, 155.39, 174.99, 184.1, 177.35, 174.42, 175.01, 170.76, 197.55, 221.7, 219.2, 226.71, 230.54, 246.76, 253.37, 239, 220.59, 221.29, 237.23, 222.07, 247, 261.16, 277, 269.63, 309.81, 381.55, 358.98, 400.66, 390.34, 354.4, 367.11, 390.19] },
      velocityScore: { '1D': 2.3, '1W': -4.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$30B', pe: 166, revenueGrowth: 23, eps: 2.35, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: 1.22, PSI: false, XSD: 2.34, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SWKS', name: 'SKYWORKS SOLUTIONS INC', easyScore: 2, avgWeight: 1.38, proScore: 0.69, coverage: 0.5,
      price: 69.94, weeklyPrices: [72.45, 76.18, 73.44, 71.40, 69.94], weeklyChange: -3.46, dayChange: -2.11, sortRank: 0, periodReturns: { '1M': -16.2, 'YTD': 10.3, '6M': 8.4, '1Y': -6.3 },
      priceHistory: { '1D': [71.44, 71.6, 70.25, 70.88, 71.17, 71.48, 70.47, 71.02, 71.44, 70.93, 71.38, 71.25, 70.98, 71.73, 71.5, 71.25, 71.22, 71.33, 70.63, 70.63, 70.42, 70.33, 70.13, 69.94], '1W': [72.45, 76.18, 73.44, 71.4, 69.94], '1M': [83.42, 78.68, 81.41, 77.85, 75.49, 79.12, 80.66, 79.93, 73.57, 75.37, 70.29, 72.73, 73.97, 76.26, 71.42, 69.38, 72.45, 76.18, 73.44, 71.4, 69.94], 'YTD': [63.41, 60.66, 58.46, 59.67, 55.79, 60.92, 60.73, 60.05, 59.61, 56.48, 55.2, 54.12, 56.66, 53.22, 56.56, 58.7, 61.55, 70.17, 64.97, 68.14, 74.35, 81.41, 79.93, 70.29, 69.38, 69.94], '6M': [64.21, 65.16, 58.85, 57.41, 60.05, 55.93, 62.31, 62.16, 59.9, 58.15, 54.93, 53.71, 55.36, 53.55, 56.54, 57.93, 61.77, 62.66, 64.97, 66.31, 70.35, 78.68, 80.66, 70.29, 69.38, 69.94], '1Y': [74.65, 78.76, 75.42, 72.77, 71.53, 67.69, 68.55, 75.36, 74.52, 75.1, 75.2, 74.46, 78.95, 79.51, 77.1, 69.16, 74.47, 75.78, 79.16, 70.64, 68.17, 60.5, 65.95, 69.32, 66.97, 64.68, 64.21, 65.16, 58.85, 57.41, 60.05, 55.93, 62.31, 62, 59.82, 56.28, 54.93, 53.71, 55.36, 53.55, 56.54, 57.93, 61.77, 62.66, 64.97, 68.14, 70.35, 78.68, 80.66, 70.29, 69.38, 69.94] },
      velocityScore: { '1D': -1.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 29.1, revenueGrowth: -1, eps: 2.4, grossMargin: 41, dividendYield: 3.98,
      etfPresence: { SOXX: 0.51, PSI: false, XSD: 2.26, DRAM: false },
      tonyNote: 'SKYWORKS SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 10, avgWeight: 5.62, proScore: 3.31, coverage: 0.588,
      price: 195.74, weeklyPrices: [210.69, 208.65, 200.04, 199.00, 195.74], weeklyChange: -7.1, dayChange: -1.59, sortRank: 0, periodReturns: { '1M': -8.9, 'YTD': 5, '6M': 3.8, '1Y': 26.3 },
      priceHistory: { '1D': [198.91, 196.11, 193.98, 194.5, 195.11, 196.37, 195.59, 195.17, 195.77, 195.83, 196.54, 195.26, 194.92, 195.21, 195.4, 194.51, 194, 195.07, 195.1, 194.43, 194.1, 194.38, 194.3, 195.74], '1W': [210.69, 208.65, 200.04, 199, 195.74], '1M': [214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74], 'YTD': [186.5, 185.04, 187.05, 184.84, 192.51, 171.88, 186.94, 189.82, 184.89, 183.34, 183.14, 178.56, 171.24, 175.75, 183.91, 198.35, 199.64, 199.57, 207.83, 225.83, 223.47, 214.25, 218.66, 200.42, 204.65, 195.74], '6M': [190.53, 188.12, 184.94, 178.07, 188.52, 180.34, 188.54, 184.97, 192.85, 180.05, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 220.78, 220.61, 212.6, 214.75, 200.42, 204.65, 195.74], '1Y': [155.02, 159.34, 164.92, 172.41, 173.5, 173.72, 180.77, 182.02, 174.98, 180.17, 167.02, 177.82, 176.67, 178.19, 187.62, 183.16, 181.81, 182.16, 202.89, 188.08, 186.86, 180.64, 177, 182.41, 175.02, 180.99, 190.53, 188.12, 184.94, 178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 220.61, 212.6, 214.75, 200.42, 204.65, 195.74] },
      velocityScore: { '1D': 0, '1W': 51.1, '1M': -31.8, '6M': null }, isNew: false,
      marketCap: '$4.7T', pe: 30, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.5,
      etfPresence: { PTF: 4.24, WCLD: false, IGV: false, FDTX: 4.62, GTEK: false, ARKK: 1.64, MARS: false, FRWD: 8.23, BCTK: 6, FWD: 1.91, CBSE: false, FCUS: false, WGMI: 1.92, CNEQ: 13.42, SGRT: 6.44, SPMO: 7.8, XMMO: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 5.63, proScore: 2.98, coverage: 0.529,
      price: 1213.56, weeklyPrices: [1133.99, 1211.38, 1051.77, 1048.51, 1213.56], weeklyChange: 7.02, dayChange: 15.81, sortRank: 0, periodReturns: { '1M': 35.5, 'YTD': 325.2, '6M': 323.3, '1Y': 863.1 },
      priceHistory: { '1D': [1047.92, 1216.69, 1146.21, 1160.79, 1173.33, 1176.13, 1169.9, 1174.04, 1192.3, 1202.52, 1210.46, 1212.73, 1217.82, 1222.73, 1227.89, 1229.99, 1228.53, 1223.31, 1215.09, 1228.88, 1208.61, 1205.19, 1201.45, 1213.56], '1W': [1133.99, 1211.38, 1051.77, 1048.51, 1213.56], '1M': [895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56], 'YTD': [285.41, 327.02, 336.63, 397.58, 435.79, 382.89, 413.97, 428.17, 415.56, 397.05, 405.35, 444.27, 355.46, 367.85, 421.51, 457.23, 481.72, 517.16, 666.59, 803.63, 731.99, 923.52, 996, 891.88, 1043.19, 1213.56], '6M': [284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 766.58, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1213.56], '1Y': [126, 122.29, 124.53, 114.39, 111.26, 104.88, 111.87, 125.29, 115.79, 122, 131.37, 157.23, 162.73, 157.27, 187.83, 181.6, 202.53, 206.71, 224.01, 238.33, 236.95, 201.37, 236.48, 237.22, 241.14, 265.92, 284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1213.56] },
      velocityScore: { '1D': -6, '1W': 27.9, '1M': 19.7, '6M': null }, isNew: false,
      marketCap: '$1.4T', pe: 27.4, revenueGrowth: 196, eps: 44.25, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { PTF: 5.12, WCLD: false, IGV: false, FDTX: 9.36, GTEK: false, ARKK: false, MARS: false, FRWD: 5.05, BCTK: 4.64, FWD: 1.54, CBSE: false, FCUS: 4.64, WGMI: false, CNEQ: 0.91, SGRT: 8.08, SPMO: 11.31, XMMO: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 7, avgWeight: 5.54, proScore: 2.28, coverage: 0.412,
      price: 675.39, weeklyPrices: [746.23, 732.62, 670.75, 643.83, 675.39], weeklyChange: -9.49, dayChange: 4.81, sortRank: 0, periodReturns: { '1M': 28.7, 'YTD': 292.1, '6M': 276.1, '1Y': 963.4 },
      priceHistory: { '1D': [644.38, 689.46, 667.18, 667.43, 670.87, 679.25, 671.88, 675.84, 682.78, 682.65, 692.05, 687.33, 685.35, 681.5, 678.13, 674.8, 676.52, 677.21, 672.57, 673.53, 668.85, 668.15, 668.35, 675.39], '1W': [746.23, 732.62, 670.75, 643.83, 675.39], '1M': [524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39], 'YTD': [172.27, 187.68, 222.1, 243.29, 278.41, 260.19, 284.1, 285.52, 282.25, 259.03, 261.18, 316.93, 273.35, 297.73, 337.88, 361.69, 403.12, 434.52, 483.15, 494.09, 459.62, 531.18, 575.5, 490.09, 712.13, 675.39], '6M': [181.54, 187.88, 212.14, 222.97, 252.66, 290.24, 262.56, 284.11, 270.57, 250.61, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 488.74, 455.8, 530.6, 594.11, 490.09, 712.13, 675.39], '1Y': [63.51, 66.08, 66.14, 68, 68.82, 76.55, 74.44, 76.24, 74.66, 82.04, 92.04, 97.66, 106.63, 106.88, 131.31, 115.42, 125.92, 125.72, 138.13, 163.6, 157.16, 140.23, 163.33, 168.89, 176.34, 181.08, 181.54, 187.88, 212.14, 222.97, 252.66, 290.24, 262.56, 296.56, 290.95, 261.3, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 455.8, 530.6, 594.11, 490.09, 712.13, 675.39] },
      velocityScore: { '1D': -1.7, '1W': 51, '1M': null, '6M': null }, isNew: false,
      marketCap: '$233B', pe: 40.3, revenueGrowth: 46, eps: 16.74, grossMargin: 45, dividendYield: 0.09,
      etfPresence: { PTF: 5.56, WCLD: false, IGV: false, FDTX: 4, GTEK: false, ARKK: false, MARS: false, FRWD: 5.92, BCTK: false, FWD: false, CBSE: false, FCUS: 5.52, WGMI: false, CNEQ: 5.42, SGRT: 10.21, SPMO: 2.17, XMMO: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 7, avgWeight: 4.38, proScore: 1.8, coverage: 0.412,
      price: 434.99, weeklyPrices: [462.12, 467.67, 436.39, 440.83, 434.99], weeklyChange: -5.87, dayChange: -1.32, sortRank: 0, periodReturns: { '1M': 5.5, 'YTD': 43.1, '6M': 45.6, '1Y': 94.2 },
      priceHistory: { '1D': [440.83, 443.75, 437.85, 439.89, 441.4, 441.73, 438.52, 439.24, 441.24, 440.55, 445.6, 442.74, 441.52, 441.83, 441.72, 440.96, 441.06, 442.17, 439.46, 439.01, 437.68, 437.51, 433.91, 434.99], '1W': [462.12, 467.67, 436.39, 440.83, 434.99], '1M': [412.32, 422.73, 424.86, 418.45, 435.63, 446.69, 436.69, 444.92, 415.17, 426.8, 408.75, 421.07, 423.93, 441.4, 425.83, 432.15, 462.12, 467.67, 436.39, 440.83, 434.99], 'YTD': [303.89, 318.01, 341.64, 327.37, 339.55, 330.73, 368.1, 370.54, 376.81, 353.86, 336.71, 338.79, 326.11, 341.49, 365.49, 363.35, 382.66, 396.06, 419.5, 399.8, 401.62, 424.86, 444.92, 408.75, 432.15, 434.99], '6M': [302.84, 322.25, 331.77, 327.16, 338.34, 335.75, 361.91, 364.2, 385.75, 353.13, 347.09, 345.98, 343.25, 337.95, 365.9, 375.1, 387.44, 393.83, 419.5, 397.28, 392.61, 422.73, 436.69, 408.75, 432.15, 434.99], '1Y': [224.01, 234.8, 230.4, 240.4, 245.6, 235.21, 242.62, 241, 227.33, 238.27, 243.41, 259.33, 264.87, 273.36, 292.19, 280.66, 299.84, 290.73, 303.22, 289.24, 282.2, 277.5, 291.51, 294.72, 292.04, 288.95, 302.84, 322.25, 331.77, 327.16, 338.34, 335.75, 361.91, 362.26, 387.73, 357.44, 347.09, 345.98, 343.25, 337.95, 365.9, 375.1, 387.44, 393.83, 419.5, 399.8, 392.61, 422.73, 436.69, 408.75, 432.15, 434.99] },
      velocityScore: { '1D': -0.6, '1W': -1.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 37.5, revenueGrowth: 35, eps: 11.59, grossMargin: 62, dividendYield: 0.86,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6, GTEK: false, ARKK: 0.98, MARS: false, FRWD: 5.94, BCTK: 8.74, FWD: false, CBSE: 2.58, FCUS: false, WGMI: 0.61, CNEQ: 5.83, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 7, avgWeight: 4.04, proScore: 1.66, coverage: 0.412,
      price: 532.57, weeklyPrices: [537.37, 551.63, 519.85, 519.74, 532.57], weeklyChange: -0.89, dayChange: 2.6, sortRank: 0, periodReturns: { '1M': 5.7, 'YTD': 148.7, '6M': 147.7, '1Y': 270.7 },
      priceHistory: { '1D': [519.05, 531.41, 512.61, 518.03, 519.42, 523.05, 516.27, 517.86, 519.64, 523.15, 529.48, 524.35, 524.64, 526.07, 527.78, 526.28, 526.75, 528.21, 524.03, 525.18, 523.07, 524.33, 525.02, 532.57], '1W': [537.37, 551.63, 519.85, 519.74, 532.57], '1M': [503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57], 'YTD': [214.16, 204.68, 227.92, 253.73, 252.18, 192.5, 205.94, 200.15, 203.68, 199.45, 197.74, 205.27, 203.77, 210.21, 236.64, 278.26, 305.33, 354.49, 421.39, 445.5, 447.58, 518.09, 523.2, 452.4, 512.48, 532.57], '6M': [214.99, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 203.08, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 448.29, 414.05, 495.54, 542.52, 452.4, 512.48, 532.57], '1Y': [143.68, 137.91, 146.42, 156.99, 166.47, 171.7, 172.4, 180.95, 163.71, 168.58, 151.14, 158.57, 157.39, 159.46, 164.67, 214.9, 234.56, 234.99, 254.84, 237.7, 247.96, 206.02, 217.53, 217.97, 210.78, 213.43, 214.99, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 414.05, 495.54, 542.52, 452.4, 512.48, 532.57] },
      velocityScore: { '1D': -0.6, '1W': 5.7, '1M': -42.2, '6M': null }, isNew: false,
      marketCap: '$868B', pe: 176.9, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.68, MARS: false, FRWD: 7.08, BCTK: 3.33, FWD: 2.12, CBSE: false, FCUS: 3.36, WGMI: false, CNEQ: false, SGRT: 3.64, SPMO: 4.06, XMMO: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'SPCX', name: 'SPACE EXPLORATION TECHN-CL A', easyScore: 6, avgWeight: 7.26, proScore: 2.56, coverage: 0.353,
      price: 153, weeklyPrices: [153.00], weeklyChange: -0.87, dayChange: -0.87, sortRank: 0, periodReturns: { '1M': 0, 'YTD': 0, '6M': 0, '1Y': 0 },
      priceHistory: undefined,
      velocityScore: { '1D': 2.4, '1W': -15.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.0T', pe: null, revenueGrowth: 15, eps: -0.68, grossMargin: 49, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.19, MARS: 23.02, FRWD: 2.66, BCTK: 8.43, FWD: 1.96, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.33, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'SPACE EXPLORATION TECHN-CL A appears in 6 of 17 Broad Tech ETFs (35% coverage) with average weight 7.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 6, avgWeight: 4.1, proScore: 1.45, coverage: 0.353,
      price: 378.91, weeklyPrices: [411.35, 392.13, 380.15, 382.07, 378.91], weeklyChange: -7.89, dayChange: -0.83, sortRank: 0, periodReturns: { '1M': -10.2, 'YTD': 9.5, '6M': 8.2, '1Y': 40.2 },
      priceHistory: { '1D': [382.08, 381.97, 375.37, 379.45, 380.27, 384.48, 379.33, 381.11, 382.88, 382.58, 385.41, 380.82, 380.59, 380.78, 380.27, 379.74, 379.38, 381.33, 379.9, 379.7, 378.46, 378.33, 377.97, 378.91], '1W': [411.35, 392.13, 380.15, 382.07, 378.91], '1M': [422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91], 'YTD': [346.1, 332.48, 343.02, 325.49, 330.73, 310.51, 331.17, 332.65, 321.7, 332.77, 335.97, 319.84, 309.42, 313.49, 354.91, 398.47, 419.94, 417.43, 425.44, 416.79, 417.76, 426.58, 418.91, 372.1, 392.9, 378.91], '6M': [352.13, 343.42, 352.21, 332.6, 332.79, 320.33, 340.44, 332.54, 325.49, 313.84, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 419.3, 411.07, 421.86, 479.23, 372.1, 392.9, 378.91], '1Y': [270.17, 275.18, 274.38, 283.34, 290.18, 288.64, 303.76, 311.23, 289.6, 308.65, 334.89, 359.87, 344.94, 334.53, 338.37, 324.63, 354.15, 344.29, 376.47, 355.59, 339.98, 346.82, 402.96, 390.24, 359.93, 340.36, 352.13, 343.42, 352.21, 332.6, 332.79, 320.33, 340.44, 333.51, 332.31, 317.53, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 411.07, 421.86, 479.23, 372.1, 392.9, 378.91] },
      velocityScore: { '1D': 0, '1W': 22.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 63.2, revenueGrowth: 48, eps: 6, grossMargin: 76, dividendYield: 0.68,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.79, GTEK: false, ARKK: 1.13, MARS: false, FRWD: 5.09, BCTK: 6.93, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.36, SGRT: false, SPMO: 6.28, XMMO: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 6, avgWeight: 3.44, proScore: 1.22, coverage: 0.353,
      price: 227.01, weeklyPrices: [244.39, 232.79, 234.11, 234.27, 227.01], weeklyChange: -7.11, dayChange: -3.14, sortRank: 0, periodReturns: { '1M': -14.4, 'YTD': -1.7, '6M': -2.3, '1Y': 4.6 },
      priceHistory: { '1D': [234.37, 227.25, 228.67, 228.68, 229.5, 229.44, 228.93, 229.85, 230.29, 229.07, 228.88, 227.69, 228.34, 228.24, 228.24, 228.02, 228.27, 229.49, 229.95, 229.15, 228.69, 227.27, 226.98, 227.01], '1W': [244.39, 232.79, 234.11, 234.27, 227.01], '1M': [265.29, 271.85, 274, 270.64, 261.26, 256.52, 250.02, 253.79, 246.03, 245.22, 238, 241.51, 238.55, 246.02, 246, 237.5, 244.39, 232.79, 234.11, 234.27, 227.01], 'YTD': [230.82, 246.29, 238.18, 234.34, 241.73, 222.69, 199.6, 210.11, 207.92, 218.94, 209.53, 208.76, 207.54, 210.57, 233.65, 249.7, 255.08, 265.06, 274.99, 270.13, 265.01, 274, 253.79, 238, 237.5, 227.01], '6M': [232.52, 233.06, 246.47, 231, 244.68, 238.62, 206.96, 201.15, 208.56, 208.73, 214.33, 215.2, 207.24, 208.27, 221.25, 248.5, 255.36, 263.04, 274.99, 265.82, 259.34, 271.85, 250.02, 238, 237.5, 227.01], '1Y': [217.12, 223.41, 225.02, 226.13, 231.44, 214.75, 223.13, 230.98, 221.95, 231.6, 232.33, 228.15, 231.48, 219.78, 219.51, 216.37, 214.47, 221.09, 222.86, 243.04, 237.58, 217.14, 233.22, 229.53, 226.19, 227.35, 232.52, 233.06, 246.47, 231, 244.68, 238.62, 206.96, 204.79, 210.64, 216.82, 214.33, 215.2, 207.24, 208.27, 221.25, 248.5, 255.36, 263.04, 274.99, 270.13, 259.34, 271.85, 250.02, 238, 237.5, 227.01] },
      velocityScore: { '1D': 25.8, '1W': 6.1, '1M': -70.7, '6M': null }, isNew: false,
      marketCap: '$2.4T', pe: 30.7, revenueGrowth: 17, eps: 7.4, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.01, GTEK: false, ARKK: 2.36, MARS: false, FRWD: 2.8, BCTK: 4.22, FWD: 1.46, CBSE: false, FCUS: false, WGMI: false, CNEQ: 5.81, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 5, avgWeight: 5, proScore: 1.47, coverage: 0.294,
      price: 1025.36, weeklyPrices: [1070.23, 1094.04, 1038.59, 993.25, 1025.36], weeklyChange: -4.19, dayChange: 3.21, sortRank: 0, periodReturns: { '1M': 21.2, 'YTD': 272.3, '6M': 259.4, '1Y': 628.8 },
      priceHistory: { '1D': [993.45, 1079.83, 1014.92, 1008.79, 1025.53, 1030.31, 1011.58, 1014.64, 1022.29, 1021.69, 1035.13, 1026.33, 1028.32, 1029.99, 1027.3, 1024.81, 1024.99, 1028.81, 1021.66, 1024.14, 1021.66, 1021.42, 1015.68, 1025.36], '1W': [1070.23, 1094.04, 1038.59, 993.25, 1025.36], '1M': [845.76, 870.66, 880.72, 879.8, 921.26, 926.61, 940.69, 925.99, 847.47, 876.77, 815.99, 868.09, 931.04, 1018.8, 1031.34, 1066.07, 1070.23, 1094.04, 1038.59, 993.25, 1025.36], 'YTD': [275.39, 284.47, 320.32, 346.53, 446.57, 405.45, 431.17, 411.11, 409.67, 367.34, 373.98, 434.6, 378.79, 423.12, 500.77, 531.81, 587.62, 673.64, 786.42, 817.35, 751.07, 880.72, 925.99, 815.99, 1066.07, 1025.36], '6M': [286.22, 289.83, 321.48, 325.99, 371.76, 444.45, 396.23, 415.94, 396.02, 357.62, 384.29, 421.09, 424.96, 391.76, 496.3, 519.6, 579.88, 643.3, 786.42, 808.8, 733.35, 870.66, 940.69, 815.99, 1066.07, 1025.36], '1Y': [140.69, 149.44, 147.18, 149.07, 150.89, 154.81, 148.1, 155.73, 154.6, 172.38, 188.16, 195.99, 221.23, 217.51, 252.79, 214.38, 226.03, 226.41, 268.34, 278.47, 262.56, 240.5, 276.69, 278.79, 287.64, 296.36, 286.22, 289.83, 321.48, 325.99, 371.76, 444.45, 396.23, 424.14, 421.85, 375.01, 384.29, 421.09, 424.96, 391.76, 496.3, 519.6, 579.88, 643.3, 786.42, 817.35, 733.35, 870.66, 940.69, 815.99, 1066.07, 1025.36] },
      velocityScore: { '1D': -0.7, '1W': -14, '1M': -35.8, '6M': null }, isNew: false,
      marketCap: '$230B', pe: 97.4, revenueGrowth: 44, eps: 10.53, grossMargin: 42, dividendYield: 0.3,
      etfPresence: { PTF: 5.24, WCLD: false, IGV: false, FDTX: 4.04, GTEK: false, ARKK: false, MARS: false, FRWD: 8.6, BCTK: false, FWD: false, CBSE: false, FCUS: 4.94, WGMI: false, CNEQ: false, SGRT: false, SPMO: 2.16, XMMO: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'LRCX', name: 'LRCX', easyScore: 5, avgWeight: 4.6, proScore: 1.35, coverage: 0.294,
      price: 401.82, weeklyPrices: [389.04, 409.54, 371.33, 374.80, 401.82], weeklyChange: 3.29, dayChange: 7.2, sortRank: 0, periodReturns: { '1M': 24.5, 'YTD': 134.7, '6M': 126.6, '1Y': 314.9 },
      priceHistory: { '1D': [374.82, 385.03, 374.61, 378.53, 383, 383.78, 377.63, 381.5, 383.37, 386.69, 395.63, 394.43, 392.3, 394.27, 393.94, 392.85, 393.3, 395.16, 392.95, 394.75, 393.57, 396.22, 397.89, 401.82], '1W': [389.04, 409.54, 371.33, 374.8, 401.82], '1M': [322.68, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 321.8, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04, 409.54, 371.33, 374.8, 401.82], 'YTD': [171.18, 200.96, 217.47, 220.7, 248.17, 213.31, 231.29, 244.92, 239.07, 214.68, 209.49, 233.99, 211.62, 222.01, 258.76, 260.96, 258.56, 257.86, 297.17, 295.44, 292.09, 318, 336.41, 321.8, 374.18, 401.82], '6M': [178.07, 194.76, 220.4, 222.41, 238.46, 230.1, 226.61, 235.58, 244.25, 217.27, 215.23, 226.47, 238.84, 213.66, 246.49, 265.16, 265.55, 248.75, 297.17, 289.24, 273.38, 318.93, 343.71, 321.8, 374.18, 401.82], '1Y': [96.84, 98.81, 101.73, 100.66, 96.96, 96.37, 99.15, 107.38, 98.41, 104.09, 102.95, 116.96, 126.92, 128.33, 145.81, 131.37, 142.37, 147.54, 161.01, 162.19, 153.32, 139.59, 156, 158.7, 160.52, 172.27, 178.07, 194.76, 220.4, 222.41, 238.46, 230.1, 226.61, 240.09, 249.48, 222.99, 215.23, 226.47, 238.84, 213.66, 246.49, 265.16, 265.55, 248.75, 297.17, 295.44, 273.38, 318.93, 343.71, 321.8, 374.18, 401.82] },
      velocityScore: { '1D': -2.2, '1W': 5.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$503B', pe: 76.1, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.28,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.9, BCTK: 8.1, FWD: 1.97, CBSE: 3.01, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 4.02, XMMO: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 5, avgWeight: 4.08, proScore: 1.2, coverage: 0.294,
      price: 342.19, weeklyPrices: [367.46, 348.78, 346.08, 345.04, 342.19], weeklyChange: -6.88, dayChange: -0.82, sortRank: 0, periodReturns: { '1M': -11.1, 'YTD': 9, '6M': 8.4, '1Y': 96.2 },
      priceHistory: { '1D': [345.02, 336.81, 340.19, 339.83, 342.14, 342.48, 339.46, 340.61, 340.88, 340.84, 341.65, 340.54, 340.83, 340.23, 339.67, 338.18, 339.04, 340.94, 340.54, 340.76, 340.69, 341.62, 339.77, 342.19], '1W': [367.46, 348.78, 346.08, 345.04, 342.19], '1M': [384.84, 384.83, 386.12, 376.43, 372.58, 358.39, 355.68, 369.27, 365.76, 361.17, 353.32, 356.56, 358.16, 367.11, 371.1, 362.1, 367.46, 348.78, 346.08, 345.04, 342.19], 'YTD': [313.8, 326.01, 333.16, 330.84, 338.66, 331.33, 309.37, 314.9, 307.15, 300.91, 303.21, 305.73, 280.74, 294.9, 316.37, 332.77, 337.75, 381.94, 395.14, 399.04, 384.9, 386.12, 369.27, 353.32, 362.1, 342.19], '6M': [314.96, 317.32, 332.73, 322.16, 335, 340.7, 318.63, 302.82, 310.92, 303.56, 306.93, 309.41, 289.2, 286.86, 314.74, 334.47, 337.73, 347.31, 395.14, 383.82, 384.9, 384.83, 355.68, 353.32, 362.1, 342.19], '1Y': [174.43, 180.55, 181.31, 185.94, 194.08, 189.95, 197.28, 203.82, 200.62, 212.37, 235.17, 241.38, 255.24, 247.18, 246.45, 237.49, 251.88, 253.73, 281.9, 285.34, 279.12, 289.98, 320.12, 322.09, 310.52, 308.61, 314.96, 317.32, 332.73, 322.16, 335, 340.7, 318.63, 303.94, 313.03, 303.45, 306.93, 309.41, 289.2, 286.86, 314.74, 334.47, 337.73, 347.31, 395.14, 399.04, 384.9, 384.83, 355.68, 353.32, 362.1, 342.19] },
      velocityScore: { '1D': 0.8, '1W': 39.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.2T', pe: 26.1, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.26,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.66, GTEK: false, ARKK: 1.91, MARS: false, FRWD: false, BCTK: 5.71, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 5.7, SGRT: false, SPMO: 3.41, XMMO: false },
      tonyNote: 'Alphabet Inc Class C appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 4.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, avgWeight: 5.28, proScore: 1.24, coverage: 0.235,
      price: 352.83, weeklyPrices: [379.40, 367.34, 373.94, 365.46, 352.83], weeklyChange: -7, dayChange: -3.45, sortRank: 0, periodReturns: { '1M': -15.2, 'YTD': -27, '6M': -27.7, '1Y': -29.1 },
      priceHistory: { '1D': [365.44, 359.04, 358.06, 359.76, 358.2, 357.68, 354.82, 356.06, 355.76, 354.53, 353.89, 352.05, 351.42, 351.88, 351.62, 349.66, 350.95, 354.54, 356.77, 355.59, 354.57, 352.62, 353.66, 352.83], '1W': [379.4, 367.34, 373.94, 365.46, 352.83], '1M': [416.03, 412.67, 426.99, 450.24, 460.52, 441.31, 427.34, 428.05, 416.67, 411.74, 397.36, 390.34, 390.74, 399.76, 393.83, 378.91, 379.4, 367.34, 373.94, 365.46, 352.83], 'YTD': [483.62, 478.11, 456.66, 451.14, 433.5, 393.67, 401.84, 397.23, 401.72, 410.68, 401.86, 389.02, 365.97, 369.37, 373.07, 420.26, 415.75, 407.78, 413.96, 405.21, 421.06, 426.99, 428.05, 397.36, 378.91, 352.83], '6M': [487.71, 472.85, 477.18, 454.52, 480.58, 411.21, 413.27, 396.86, 389, 403.93, 405.76, 399.41, 372.74, 370.17, 374.33, 411.22, 432.92, 424.46, 413.96, 407.77, 417.42, 412.67, 427.34, 397.36, 378.91, 352.83], '1Y': [497.45, 498.84, 503.32, 510.05, 513.71, 524.11, 520.84, 522.48, 504.24, 509.64, 495, 509.9, 517.93, 511.46, 517.35, 510.96, 511.61, 520.56, 525.76, 497.1, 503.29, 478.43, 492.01, 483.16, 478.53, 485.92, 487.71, 472.85, 477.18, 454.52, 480.58, 411.21, 413.27, 399.6, 400.6, 405.2, 405.76, 399.41, 372.74, 370.17, 374.33, 411.22, 432.92, 424.46, 413.96, 405.21, 417.42, 412.67, 427.34, 397.36, 378.91, 352.83] },
      velocityScore: { '1D': -0.8, '1W': 11.7, '1M': -75.1, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 21, revenueGrowth: 18, eps: 16.77, grossMargin: 68, dividendYield: 1,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.28, FDTX: 3.79, GTEK: false, ARKK: false, MARS: false, FRWD: 2.78, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 6.27, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 4, avgWeight: 4.55, proScore: 1.07, coverage: 0.235,
      price: 2335, weeklyPrices: [2184.75, 2273.73, 1963.60, 1914.46, 2335.00], weeklyChange: 6.88, dayChange: 21.53, sortRank: 0, periodReturns: { '1M': 46.9, 'YTD': 883.7, '6M': 833.7, '1Y': 4822 },
      priceHistory: { '1D': [1921.41, 2236, 2135, 2138.13, 2185, 2210.93, 2188, 2200, 2219, 2219.2, 2254.62, 2259, 2269.22, 2275.45, 2272.94, 2293.29, 2298.75, 2304.14, 2302.98, 2302.01, 2278.4, 2313.48, 2301.64, 2335], '1W': [2184.75, 2273.73, 1963.6, 1914.46, 2335], '1M': [1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335], 'YTD': [237.38, 334.54, 409.24, 503.44, 539.3, 576.2, 630.29, 649.97, 651.9, 565.59, 618.82, 772.09, 603.17, 692.73, 851.57, 919.47, 932.43, 1096.51, 1409.98, 1447.23, 1392.56, 1641.64, 1759.68, 1643.23, 1958.8, 2335], '6M': [250.05, 274.08, 389.27, 453.12, 481.43, 695.51, 541.64, 590.59, 638.52, 565.41, 618.89, 720.17, 702.48, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1452.02, 1383.29, 1589.94, 1831.5, 1643.23, 1958.8, 2335], '1Y': [47.44, 46.41, 46.09, 42.19, 42.48, 41.33, 40.69, 46.68, 45.5, 50.87, 68.55, 86.13, 102.21, 97.12, 128.41, 116.91, 144.27, 167.05, 195.82, 207.69, 243.57, 195.96, 223.28, 228.47, 206.18, 237.61, 250.05, 274.08, 389.27, 453.12, 481.43, 695.51, 541.64, 600.4, 632.38, 599.06, 618.89, 720.17, 702.48, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1447.23, 1383.29, 1589.94, 1831.5, 1643.23, 1958.8, 2335] },
      velocityScore: { '1D': -1.8, '1W': -7, '1M': -51.1, '6M': null }, isNew: false,
      marketCap: '$346B', pe: 79.7, revenueGrowth: 251, eps: 29.29, grossMargin: 56, dividendYield: null,
      etfPresence: { PTF: 8.55, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.57, CBSE: false, FCUS: 5.3, WGMI: false, CNEQ: false, SGRT: false, SPMO: 2.77, XMMO: false },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks', easyScore: 4, avgWeight: 4.16, proScore: 0.98, coverage: 0.235,
      price: 293.09, weeklyPrices: [287.78, 286.40, 290.92, 285.26, 293.09], weeklyChange: 1.85, dayChange: 2.74, sortRank: 0, periodReturns: { '1M': 14.2, 'YTD': 59.1, '6M': 56.5, '1Y': 44.9 },
      priceHistory: { '1D': [285.26, 289.86, 289.03, 293.43, 295.09, 293.69, 291.89, 293.03, 293.04, 290.95, 292.82, 291.61, 291.12, 292.59, 292.41, 291.23, 292.99, 293.95, 293.66, 294.1, 294.07, 292.72, 293.91, 293.09], '1W': [287.78, 286.4, 290.92, 285.26, 293.09], '1M': [256.75, 248.47, 257.77, 281.69, 300.48, 297.18, 280.43, 279.25, 272.05, 266.33, 263.22, 279.53, 279.62, 284.54, 279.9, 282.13, 287.78, 286.4, 290.92, 285.26, 293.09], 'YTD': [184.2, 190.8, 187.73, 182.27, 176.2, 154.77, 162.81, 148.7, 149.4, 163.16, 168.12, 169.74, 156.36, 160.67, 166.99, 166.97, 173.21, 179.32, 183.68, 227.79, 246.66, 257.77, 279.25, 263.22, 282.13, 293.09], '6M': [188.45, 182.12, 188.88, 184.06, 183.5, 166.24, 165.51, 163.5, 141.67, 156.09, 165.58, 169.19, 157.21, 160.32, 173.78, 164.11, 181.2, 181.54, 183.68, 215.6, 240.13, 248.47, 280.43, 263.22, 282.13, 293.09], '1Y': [202.34, 201.82, 187.39, 195.78, 203.27, 172.88, 168.1, 173.55, 183.32, 191.02, 194.46, 196.29, 208.19, 202.37, 207.19, 208.55, 205.51, 215.02, 218.27, 211.37, 204.77, 185.07, 190.13, 198.84, 191.69, 186.88, 188.45, 182.12, 188.88, 184.06, 183.5, 166.24, 165.51, 152.35, 144.84, 158.56, 165.58, 169.19, 157.21, 160.32, 173.78, 164.11, 181.2, 181.54, 183.68, 227.79, 240.13, 248.47, 280.43, 263.22, 282.13, 293.09] },
      velocityScore: { '1D': 0, '1W': -14.8, '1M': -58.1, '6M': null }, isNew: false,
      marketCap: '$239B', pe: 257.1, revenueGrowth: 31, eps: 1.14, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.83, IGV: 9.09, FDTX: 3.67, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.03, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'LITE', name: 'Lumentum Holdings Inc', easyScore: 4, avgWeight: 3.8, proScore: 0.89, coverage: 0.235,
      price: 861.97, weeklyPrices: [850.00, 893.93, 827.92, 842.53, 861.97], weeklyChange: 1.41, dayChange: 2.26, sortRank: 0, periodReturns: { '1M': -5.4, 'YTD': 133.9, '6M': 117.7, '1Y': 810.1 },
      priceHistory: { '1D': [842.95, 864.75, 811.55, 828.41, 846.93, 856.2, 838.96, 843.86, 842.51, 847.51, 863.24, 860.23, 858.78, 859.48, 859.01, 846.13, 851.12, 852.9, 856.16, 859.2, 855.03, 858.35, 860.27, 861.97], '1W': [850, 893.93, 827.92, 842.53, 861.97], '1M': [910.81, 902.31, 860.62, 854.96, 905, 1029.15, 938, 945.08, 863.66, 895.4, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93, 827.92, 842.53, 861.97], 'YTD': [368.59, 348.26, 343.27, 354.49, 381.44, 504.42, 583.46, 667.77, 677, 650.82, 616.09, 772.13, 688.8, 764.65, 894.13, 891.22, 846.89, 902.32, 944.28, 1030.37, 868.07, 860.62, 945.08, 853.26, 869.98, 861.97], '6M': [390.77, 357.05, 339.87, 356.83, 370.66, 435.1, 561.13, 600.42, 688.27, 694.43, 672, 649.56, 801.99, 702.76, 896.02, 824.01, 873.6, 858.32, 944.28, 992.37, 890.09, 902.31, 938, 853.26, 869.98, 861.97], '1Y': [94.71, 92.75, 92.99, 102.22, 104.52, 106.68, 111.13, 114.62, 117.43, 135.55, 149.46, 163.02, 168.73, 160.75, 163.81, 149.61, 163.23, 168.5, 200.13, 239.68, 226.86, 233.24, 325.16, 331.41, 324.35, 371.43, 390.77, 357.05, 339.87, 356.83, 370.66, 435.1, 561.13, 594.26, 723.39, 680.8, 672, 649.56, 801.99, 702.76, 896.02, 824.01, 873.6, 858.32, 944.28, 1030.37, 890.09, 902.31, 938, 853.26, 869.98, 861.97] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$67B', pe: 152.8, revenueGrowth: 90, eps: 5.64, grossMargin: 41, dividendYield: null,
      etfPresence: { PTF: 3.71, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 1.41, FWD: false, CBSE: false, FCUS: 2.31, WGMI: false, CNEQ: false, SGRT: 7.77, SPMO: false, XMMO: false },
      tonyNote: 'Lumentum Holdings Inc appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRWD', name: 'CrowdStrike', easyScore: 4, avgWeight: 2.93, proScore: 0.69, coverage: 0.235,
      price: 678.65, weeklyPrices: [684.86, 675.44, 680.92, 673.02, 678.65], weeklyChange: -0.91, dayChange: 0.84, sortRank: 0, periodReturns: { '1M': 1.1, 'YTD': 44.8, '6M': 42.2, '1Y': 34.3 },
      priceHistory: { '1D': [673.02, 681.02, 679.86, 688.61, 690.5, 686.97, 679.6, 679.93, 682.74, 674.66, 678.15, 673.03, 672.11, 676, 675.74, 673.67, 678.13, 679.15, 680.9, 680.69, 679.96, 677.63, 682.64, 678.65], '1W': [684.86, 675.44, 680.92, 673.02, 678.65], '1M': [671.55, 645.36, 671, 731, 782.17, 768.95, 747.61, 719.09, 671.02, 658.79, 647.74, 691.53, 682.8, 692.91, 679.49, 682.96, 684.86, 675.44, 680.92, 673.02, 678.65], 'YTD': [468.76, 463.87, 455, 453.77, 444.62, 377.16, 411.54, 388.6, 381.1, 426.16, 441.54, 428.18, 392.62, 393.31, 394.68, 418.2, 445.39, 445.75, 468.07, 562.57, 650.11, 671, 719.09, 647.74, 682.96, 678.65], '6M': [481.19, 456.55, 466.99, 442.73, 476.66, 421.73, 413.39, 414.29, 350.25, 391.42, 436.33, 433.2, 392.99, 390.41, 426.51, 411.16, 466.68, 452.38, 468.07, 546.18, 616.88, 645.36, 747.61, 647.74, 682.96, 678.65], '1Y': [505.22, 514.1, 478.45, 475.96, 467.92, 446.66, 425, 424.86, 414.06, 442, 417.63, 436.1, 502.55, 481.42, 489.88, 493.66, 482.23, 521.98, 538.68, 532.52, 529.78, 501.31, 509.16, 512.03, 504.78, 481.28, 481.19, 456.55, 466.99, 442.73, 476.66, 421.73, 413.39, 415.76, 363.31, 407.68, 436.33, 433.2, 392.99, 390.41, 426.51, 411.16, 466.68, 452.38, 468.07, 562.57, 616.88, 645.36, 747.61, 647.74, 682.96, 678.65] },
      velocityScore: { '1D': null, '1W': -10.4, '1M': null, '6M': null }, isNew: true,
      marketCap: '$173B', pe: null, revenueGrowth: 26, eps: -0.13, grossMargin: 75, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.56, IGV: 6.73, FDTX: 1.24, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 1.17, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'CrowdStrike appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SHOP', name: 'Shopify Inc Registered Shs -A- Subord Vtg', easyScore: 4, avgWeight: 2.91, proScore: 0.68, coverage: 0.235,
      price: 111.62, weeklyPrices: [108.85, 107.98, 107.68, 114.17, 111.62], weeklyChange: 2.54, dayChange: -2.23, sortRank: 0, periodReturns: { '1M': 6.4, 'YTD': -30.7, '6M': -34.1, '1Y': -1.3 },
      priceHistory: { '1D': [114.17, 113.11, 114.38, 114.9, 115.2, 114.93, 113.64, 114.33, 114.49, 114.61, 115.43, 114.46, 114.85, 114.35, 114.08, 113.81, 113.41, 114.18, 113.24, 112.68, 112.55, 112.28, 112.08, 111.62], '1W': [108.85, 107.98, 107.68, 114.17, 111.62], '1M': [104.9, 106.6, 115.03, 118.71, 124.12, 117.01, 112.94, 116.04, 109.54, 110.78, 108.2, 110.47, 108.24, 112.49, 113.23, 108.09, 108.85, 107.98, 107.68, 114.17, 111.62], 'YTD': [160.97, 168.28, 157.99, 137.64, 143.64, 111.24, 110.66, 126.2, 125.94, 134.79, 126.17, 122.37, 115.43, 118.52, 112.38, 126.94, 124.23, 121.13, 105.44, 95.4, 105.01, 115.03, 116.04, 108.2, 108.09, 111.62], '6M': [170.83, 166.21, 167.93, 144.5, 137.5, 119.29, 127.24, 113.54, 116.93, 121.87, 129.36, 127.8, 116.15, 118.62, 120.1, 127.41, 131.96, 121.26, 105.44, 99.84, 101.01, 106.6, 112.94, 108.2, 108.09, 111.62], '1Y': [113.07, 116.52, 112.11, 127.07, 124.43, 118.6, 151.07, 144.27, 136.68, 141.54, 146.82, 143.38, 153.3, 140.25, 161.14, 151.02, 156.57, 167.03, 173.61, 156.05, 146.34, 144.56, 158.64, 161.08, 164.19, 169.57, 170.83, 166.21, 167.93, 144.5, 137.5, 119.29, 127.24, 121.64, 120.31, 129.65, 129.36, 127.8, 116.15, 118.62, 120.1, 127.41, 131.96, 121.26, 105.44, 95.4, 101.01, 106.6, 112.94, 108.2, 108.09, 111.62] },
      velocityScore: { '1D': 3, '1W': -22.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$145B', pe: 109.4, revenueGrowth: 34, eps: 1.02, grossMargin: 48, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.89, GTEK: false, ARKK: 4.39, MARS: false, FRWD: 1.79, BCTK: 2.56, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Shopify Inc Registered Shs -A- Subord Vtg appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC-CL A', easyScore: 4, avgWeight: 2.47, proScore: 0.58, coverage: 0.235,
      price: 343.71, weeklyPrices: [368.03, 349.68, 346.13, 345.29, 343.71], weeklyChange: -6.61, dayChange: -0.45, sortRank: 0, periodReturns: { '1M': -11.6, 'YTD': 9.8, '6M': 9.4, '1Y': 98.1 },
      priceHistory: { '1D': [345.28, 336.88, 340.52, 339.93, 342.39, 342.83, 339.86, 341.11, 341.24, 341.23, 342.01, 340.93, 341.33, 341.03, 341.11, 339.77, 340.86, 342.85, 342.51, 343.06, 342.89, 344.06, 341.77, 343.71], '1W': [368.03, 349.68, 346.13, 345.29, 343.71], '1M': [388.88, 388.83, 390.13, 380.34, 376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 356.38, 357.77, 359.68, 369.35, 373.25, 363.79, 368.03, 349.68, 346.13, 345.29, 343.71], 'YTD': [313, 325.44, 332.78, 330.54, 338.25, 331.25, 309, 314.98, 307.38, 300.88, 303.55, 307.13, 280.92, 297.39, 318.49, 336.02, 338.89, 384.8, 398.04, 402.62, 388.91, 390.13, 372.19, 356.38, 363.79, 343.71], '6M': [313.51, 316.54, 331.86, 322, 334.55, 339.71, 318.58, 302.02, 310.9, 303.58, 307.04, 310.92, 290.44, 287.56, 317.32, 337.12, 339.32, 349.94, 398.04, 387.35, 387.66, 388.83, 358.99, 356.38, 363.79, 343.71], '1Y': [173.54, 179.53, 180.19, 185.06, 193.18, 189.13, 196.52, 202.94, 199.75, 211.64, 235, 240.8, 254.72, 246.54, 245.35, 236.57, 251.46, 253.08, 281.48, 284.75, 278.57, 289.45, 320.18, 321.27, 309.29, 307.16, 313.51, 316.54, 331.86, 322, 334.55, 339.71, 318.58, 303.33, 312.9, 303.13, 307.04, 310.92, 290.44, 287.56, 317.32, 337.12, 339.32, 349.94, 398.04, 402.62, 387.66, 388.83, 358.99, 356.38, 363.79, 343.71] },
      velocityScore: { '1D': -1.7, '1W': null, '1M': -85.9, '6M': null }, isNew: false,
      marketCap: '$4.2T', pe: 26.2, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 0.49, MARS: false, FRWD: 3.19, BCTK: false, FWD: 1.93, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 4.26, XMMO: false },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'KLAC', name: 'KLAC', easyScore: 4, avgWeight: 2.01, proScore: 0.47, coverage: 0.235,
      price: 258.8, weeklyPrices: [259.56, 269.16, 244.49, 240.48, 258.80], weeklyChange: -0.29, dayChange: 7.62, sortRank: 0, periodReturns: { '1M': 28.7, 'YTD': 113, '6M': 102.7, '1Y': 186.6 },
      priceHistory: { '1D': [240.47, 249.96, 245.5, 246.88, 249.32, 252.24, 250.79, 251.88, 252.91, 253.66, 258.63, 257.9, 256.25, 258.45, 258.86, 258.25, 258.79, 259.96, 258.67, 258.5, 257.45, 257.99, 258.2, 258.8], '1W': [259.56, 269.16, 244.49, 240.48, 258.8], '1M': [201.14, 195.72, 192.76, 192.17, 194, 204.52, 212.51, 213.11, 192.92, 210.81, 213.56, 241.16, 254.54, 256.42, 237.33, 238.73, 259.56, 269.16, 244.49, 240.48, 258.8], 'YTD': [121.51, 132.46, 154.5, 150, 168.47, 133.1, 145.09, 149.6, 152.43, 142.94, 140.96, 151.15, 145.11, 151.98, 172.73, 173.49, 181.54, 175.04, 181.63, 184.97, 182.95, 192.76, 213.11, 213.56, 238.73, 258.8], '6M': [127.96, 135.24, 142.82, 148.62, 161.63, 135.55, 143.08, 147.02, 150.66, 144.13, 145.29, 148.13, 156.62, 147.24, 167.23, 174.81, 181.21, 181.62, 181.63, 181.13, 174.06, 195.72, 212.51, 213.56, 238.73, 258.8], '1Y': [90.29, 92.46, 92.46, 93.11, 90.21, 88.66, 91.21, 95.54, 87.24, 89.4, 90.51, 96.4, 104.48, 106.43, 110.15, 98.28, 109.88, 115.9, 121.44, 120.64, 116.17, 110.25, 117.55, 121.45, 119.39, 124.57, 127.96, 135.24, 142.82, 148.62, 161.63, 135.55, 143.08, 148.03, 154.67, 147.59, 145.29, 148.13, 156.62, 147.24, 167.23, 174.81, 181.21, 181.62, 181.63, 184.97, 174.06, 195.72, 212.51, 213.56, 238.73, 258.8] },
      velocityScore: { '1D': -4.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$338B', pe: 73.1, revenueGrowth: 12, eps: 3.54, grossMargin: 61, dividendYield: 0.38,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: 1.67, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.78, CBSE: 2.86, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.72, XMMO: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 3, avgWeight: 5.21, proScore: 0.92, coverage: 0.176,
      price: 375.12, weeklyPrices: [400.49, 405.05, 381.61, 375.53, 375.12], weeklyChange: -6.33, dayChange: -0.09, sortRank: 0, periodReturns: { '1M': -13.5, 'YTD': -16.6, '6M': -22.7, '1Y': 15.1 },
      priceHistory: { '1D': [375.46, 375.46, 375.06, 376.67, 377.62, 377.64, 373.14, 375, 375.92, 375.23, 375.79, 373.48, 373.54, 374, 374.36, 373.51, 373.02, 374.92, 374.58, 374.4, 373.55, 373.54, 373.82, 375.12], '1W': [400.49, 405.05, 381.61, 375.53, 375.12], '1M': [433.59, 440.36, 442.1, 435.79, 415.88, 423.74, 423.7, 418.45, 391, 408.95, 381.59, 399.15, 406.43, 411.15, 404.66, 396.38, 400.49, 405.05, 381.61, 375.53, 375.12], 'YTD': [449.72, 435.8, 438.57, 449.36, 416.56, 397.21, 417.07, 411.82, 408.58, 405.55, 395.01, 380.3, 372.11, 381.26, 345.62, 388.9, 373.72, 381.63, 398.73, 445.27, 417.26, 442.1, 418.45, 381.59, 396.38, 375.12], '6M': [475.19, 451.67, 448.96, 419.25, 430.9, 421.96, 425.21, 410.63, 409.38, 392.43, 399.24, 399.27, 383.03, 371.75, 343.25, 391.95, 387.51, 372.8, 398.73, 433.45, 404.11, 440.36, 423.7, 381.59, 396.38, 375.12], '1Y': [325.78, 315.35, 313.51, 329.65, 316.06, 302.63, 322.27, 335.58, 320.11, 345.98, 350.84, 395.94, 426.07, 440.4, 429.83, 413.49, 428.75, 448.98, 440.1, 445.91, 401.99, 395.23, 430.17, 455, 458.96, 481.2, 475.19, 451.67, 448.96, 419.25, 430.9, 421.96, 425.21, 411.32, 417.4, 405.94, 399.24, 399.27, 383.03, 371.75, 343.25, 391.95, 387.51, 372.8, 398.73, 445.27, 404.11, 440.36, 423.7, 381.59, 396.38, 375.12] },
      velocityScore: { '1D': -1.1, '1W': -14, '1M': -82.3, '6M': null }, isNew: false,
      marketCap: '$1.4T', pe: 344.1, revenueGrowth: 16, eps: 1.09, grossMargin: 19, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 9.55, MARS: false, FRWD: false, BCTK: 3.15, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 2.92, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'BE', name: 'Bloom Energy Corp', easyScore: 4, avgWeight: 3.74, proScore: 2.99, coverage: 0.8,
      price: 309.18, weeklyPrices: [328.91, 345.85, 321.98, 326.19, 309.18], weeklyChange: -6, dayChange: -5.21, sortRank: 0, periodReturns: { '1M': 2.2, 'YTD': 255.8, '6M': 236.5, '1Y': 1284.6 },
      priceHistory: { '1D': [326.19, 337.5, 325.15, 320.01, 324.84, 323.46, 311.59, 308.18, 308.05, 305.3, 311.5, 308.61, 308.65, 306.57, 304.1, 302.2, 303.42, 301.91, 302.97, 305.48, 300.73, 301.45, 305.14, 309.18], '1W': [328.91, 345.85, 321.98, 326.19, 309.18], '1M': [302.4, 293.8, 290.01, 285, 273.51, 302.85, 287.32, 291.37, 263.61, 253.57, 234.23, 248.88, 260.22, 274.5, 280.88, 284.99, 328.91, 345.85, 321.98, 326.19, 309.18], 'YTD': [86.89, 121.84, 139.17, 145.63, 156.51, 136.6, 139.03, 147.55, 168.57, 159.99, 157.17, 166.69, 133.52, 132.45, 160.13, 210.06, 237.57, 283.36, 285.47, 289.76, 282.31, 290.01, 291.37, 234.23, 284.99, 309.18], '6M': [90.18, 103.87, 136.87, 151.75, 152.31, 168.89, 148.7, 145.32, 166.2, 153.02, 154, 160.05, 145.88, 135.49, 146.78, 213.84, 229.75, 287.97, 285.47, 280.69, 261.34, 293.8, 287.32, 234.23, 284.99, 309.18], '1Y': [22.33, 24.24, 25.4, 24.99, 34.34, 36.72, 36.8, 45.11, 44.83, 54.8, 57.07, 67.26, 84.93, 70.32, 90.29, 86.87, 115.09, 101.42, 127.85, 136.86, 103.55, 93.38, 109.24, 119.18, 94.98, 88.82, 90.18, 103.87, 136.87, 151.75, 152.31, 168.89, 148.7, 157.27, 174.77, 164.78, 154, 160.05, 145.88, 135.49, 146.78, 213.84, 229.75, 287.97, 285.47, 289.76, 261.34, 293.8, 287.32, 234.23, 284.99, 309.18] },
      velocityScore: { '1D': 15.4, '1W': 29.4, '1M': 19.6, '6M': null }, isNew: false,
      marketCap: '$88B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: 1.8, VOLT: 4.53, PBD: false, PBW: 2.79, IVEP: 5.85 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 3, avgWeight: 4.76, proScore: 2.86, coverage: 0.6,
      price: 718.59, weeklyPrices: [702.25, 740.14, 702.29, 701.88, 718.59], weeklyChange: 2.33, dayChange: 2.38, sortRank: 0, periodReturns: { '1M': -3.2, 'YTD': 70.3, '6M': 65.7, '1Y': 89.4 },
      priceHistory: { '1D': [701.88, 708.49, 698.39, 700.16, 706.78, 705.6, 698.72, 695.03, 693.72, 696, 703.21, 703.22, 705.34, 709.21, 708.79, 709.37, 708.18, 710.93, 709.9, 710.23, 710.16, 708.6, 713.95, 718.59], '1W': [702.25, 740.14, 702.29, 701.88, 718.59], '1M': [742.18, 733.62, 730.1, 711.73, 687.48, 706.06, 715.67, 719.17, 695.11, 693.81, 650.92, 683.29, 707.74, 724.35, 719.29, 714.85, 702.25, 740.14, 702.29, 701.88, 718.59], 'YTD': [422.06, 413.17, 447.64, 468.78, 483.43, 477.72, 515.88, 552.66, 565.05, 549.22, 566.91, 577.95, 545.64, 560.12, 582.06, 587.42, 633.44, 727.77, 785.24, 773.72, 709.93, 730.1, 719.17, 650.92, 714.85, 718.59], '6M': [432.67, 435.82, 432.66, 463.49, 479.27, 488.6, 510.64, 525.13, 568.21, 566, 564.05, 571.64, 578.44, 549.02, 576.24, 591.82, 613.78, 628.6, 785.24, 765.81, 714.13, 733.62, 715.67, 650.92, 714.85, 718.59], '1Y': [379.47, 386.51, 383.78, 403.31, 421.68, 395.17, 387.35, 377.51, 378.21, 385.96, 372.5, 382.53, 388.58, 405.44, 421.17, 417.61, 437.52, 427.36, 453.83, 442.9, 426.93, 429.78, 464.88, 460.64, 438.11, 426.66, 432.67, 435.82, 432.66, 463.49, 479.27, 488.6, 510.64, 519.31, 562.77, 568.38, 564.05, 571.64, 578.44, 549.02, 576.24, 591.82, 613.78, 628.6, 785.24, 773.72, 714.13, 733.62, 715.67, 650.92, 714.85, 718.59] },
      velocityScore: { '1D': 1.1, '1W': -1.4, '1M': -22.1, '6M': null }, isNew: false,
      marketCap: '$108B', pe: 98.4, revenueGrowth: 26, eps: 7.3, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.8, VOLT: 5.25, PBD: false, PBW: false, IVEP: 4.24 },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 3, avgWeight: 4.68, proScore: 2.81, coverage: 0.6,
      price: 309.2, weeklyPrices: [297.20, 307.80, 291.50, 294.49, 309.20], weeklyChange: 4.04, dayChange: 4.94, sortRank: 0, periodReturns: { '1M': 5.9, 'YTD': 191, '6M': 175.9, '1Y': 365.3 },
      priceHistory: { '1D': [294.64, 314.07, 306.57, 307.92, 315.38, 313.99, 308, 309.96, 310.71, 307.55, 311.54, 311.78, 313.13, 312.6, 311.61, 308.21, 308.57, 308.88, 307.44, 306.78, 304.72, 305.12, 305.33, 309.2], '1W': [297.2, 307.8, 291.5, 294.49, 309.2], '1M': [291.97, 295.94, 288.9, 284.42, 288.12, 299.07, 299.73, 300.06, 284.87, 293.6, 262.34, 290.5, 294.75, 303.53, 292.7, 294.03, 297.2, 307.8, 291.5, 294.49, 309.2], 'YTD': [106.26, 119.94, 135.18, 142.29, 152.31, 179.6, 197.63, 182.27, 176.96, 167.67, 171.19, 175.13, 174.8, 184.68, 230.81, 232.81, 252.18, 277.27, 320.3, 300.84, 271.05, 288.9, 300.06, 262.34, 294.03, 309.2], '6M': [113.62, 120.46, 128.85, 142.76, 147.43, 151.08, 190.09, 187.21, 186.39, 170.37, 176.51, 174.04, 186.82, 180.36, 218.07, 229.73, 242.77, 253.49, 320.3, 308.05, 261.58, 295.94, 299.73, 262.34, 294.03, 309.2], '1Y': [66.46, 72.55, 70.87, 76.08, 82.79, 75.89, 77.8, 85.17, 83.64, 90.42, 89.41, 95.89, 99.1, 96.99, 101.35, 100.35, 112.77, 113.88, 125.9, 125, 109.4, 98.12, 107.74, 114.04, 112.36, 110.97, 113.62, 120.46, 128.85, 142.76, 147.43, 151.08, 190.09, 180.99, 183, 170.96, 176.51, 174.04, 186.82, 180.36, 218.07, 229.73, 242.77, 253.49, 320.3, 300.84, 261.58, 295.94, 299.73, 262.34, 294.03, 309.2] },
      velocityScore: { '1D': -10.5, '1W': -10.8, '1M': -44.2, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 60.4, revenueGrowth: 7, eps: 5.12, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { POW: 4.78, VOLT: 7.3, PBD: false, PBW: 1.96, IVEP: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 3, avgWeight: 4.31, proScore: 2.59, coverage: 0.6,
      price: 419.87, weeklyPrices: [421.77, 435.78, 405.28, 404.59, 419.87], weeklyChange: -0.45, dayChange: 3.78, sortRank: 0, periodReturns: { '1M': 4.2, 'YTD': 31.8, '6M': 29.7, '1Y': 20.6 },
      priceHistory: { '1D': [404.59, 419.87, 417.58, 422.3, 424.16, 424.75, 421.4, 420.09, 419.49, 419.73, 422.83, 421.26, 420.12, 420.69, 420.11, 418.52, 419.03, 419.86, 417.8, 418.42, 418.13, 417.36, 418.44, 419.87], '1W': [421.77, 435.78, 405.28, 404.59, 419.87], '1M': [403.13, 406.37, 401.94, 400.6, 400.08, 417.62, 421.21, 418.61, 395.94, 403.14, 375.46, 393.64, 391.39, 407.06, 407.71, 409.64, 421.77, 435.78, 405.28, 404.59, 419.87], 'YTD': [318.51, 320.58, 333.46, 334.04, 354.37, 354.67, 390.33, 373.38, 374.59, 354.79, 348.64, 360.23, 357.1, 365.56, 400.44, 392.73, 424.5, 433.01, 421.39, 406.94, 379.69, 401.94, 418.61, 375.46, 409.64, 419.87], '6M': [322.17, 322.26, 329.1, 337.59, 341.19, 362.53, 377.47, 391.49, 374.56, 355.56, 361.06, 363.95, 374.1, 357.67, 385.58, 395.06, 413.87, 410.77, 421.39, 401.53, 371.88, 406.37, 421.21, 375.46, 409.64, 419.87], '1Y': [348.14, 362.22, 360.62, 378.62, 392.17, 381.29, 360.16, 355.1, 345.38, 355.34, 349.03, 365.9, 374.5, 365.58, 373.46, 369.08, 375.59, 372.4, 383.09, 377.4, 354.07, 328.19, 345.89, 337.66, 331.98, 317.8, 322.17, 322.26, 329.1, 337.59, 341.19, 362.53, 377.47, 380.38, 373.53, 354.46, 361.06, 363.95, 374.1, 357.67, 385.58, 395.06, 413.87, 410.77, 421.39, 406.94, 371.88, 406.37, 421.21, 375.46, 409.64, 419.87] },
      velocityScore: { '1D': -2.3, '1W': -2.6, '1M': -19.1, '6M': null }, isNew: false,
      marketCap: '$163B', pe: 41, revenueGrowth: 17, eps: 10.24, grossMargin: 37, dividendYield: 1.09,
      etfPresence: { POW: 3.87, VOLT: 5.18, PBD: false, PBW: false, IVEP: 3.88 },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 3, avgWeight: 3.85, proScore: 2.31, coverage: 0.6,
      price: 1085.47, weeklyPrices: [1109.73, 1127.59, 1034.98, 1057.65, 1085.47], weeklyChange: -2.19, dayChange: 2.63, sortRank: 0, periodReturns: { '1M': 1.4, 'YTD': 66.1, '6M': 62.7, '1Y': 114.2 },
      priceHistory: { '1D': [1057.65, 1097.66, 1061.61, 1075, 1095.43, 1098.56, 1089.38, 1084, 1084.38, 1087.44, 1099.47, 1095.57, 1094.21, 1093.14, 1088.82, 1086.06, 1088.39, 1091.27, 1088.97, 1087.67, 1083.65, 1085.23, 1080.14, 1085.47], '1W': [1109.73, 1127.59, 1034.98, 1057.65, 1085.47], '1M': [1070.47, 1031.89, 996, 968.32, 950.54, 969.67, 959.36, 963.33, 933.61, 933.85, 867.09, 906.79, 940.66, 979.07, 982.35, 1048.86, 1109.73, 1127.59, 1034.98, 1057.65, 1085.47], 'YTD': [653.57, 628.4, 642.23, 661.67, 717.39, 737.53, 816.56, 830.34, 876.46, 815.01, 832.11, 877.39, 873.12, 894.78, 968.02, 978.32, 1149.53, 1083.46, 1118.96, 1062.57, 1024.52, 996, 963.33, 867.09, 1048.86, 1085.47], '6M': [663.46, 680.86, 639.77, 684.86, 692.7, 780.25, 790.79, 819.15, 879.73, 842, 839.2, 844.05, 909.41, 872.9, 936.07, 985.92, 1127.56, 1063.11, 1118.96, 1071.98, 1011.8, 1031.89, 959.36, 867.09, 1048.86, 1085.47], '1Y': [506.81, 517.04, 539.16, 574.6, 644.59, 656.5, 645.86, 625.27, 606, 633.69, 582.08, 625.55, 624.17, 605.17, 594.99, 604.56, 602, 595.15, 574.07, 550.17, 558.17, 558.03, 599.77, 631.32, 671.71, 658.28, 663.46, 680.86, 639.77, 684.86, 692.7, 780.25, 790.79, 817.55, 876.01, 841.27, 839.2, 844.05, 909.41, 872.9, 936.07, 985.92, 1127.56, 1063.11, 1118.96, 1062.57, 1011.8, 1031.89, 959.36, 867.09, 1048.86, 1085.47] },
      velocityScore: { '1D': -2.9, '1W': -2.9, '1M': -16, '6M': null }, isNew: false,
      marketCap: '$292B', pe: 31.7, revenueGrowth: 16, eps: 34.27, grossMargin: 20, dividendYield: 0.19,
      etfPresence: { POW: 3.19, VOLT: 4.21, PBD: false, PBW: false, IVEP: 4.14 },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 3, avgWeight: 3.5, proScore: 2.1, coverage: 0.6,
      price: 87.7, weeklyPrices: [86.75, 86.08, 86.43, 87.62, 87.70], weeklyChange: 1.1, dayChange: 0.09, sortRank: 0, periodReturns: { '1M': 0.1, 'YTD': 9.2, '6M': 9, '1Y': 23.5 },
      priceHistory: { '1D': [87.62, 88.11, 88.44, 88.15, 87.71, 87.75, 87.71, 87.14, 87.04, 86.96, 87.15, 87.16, 87.13, 87.32, 87.47, 87.82, 87.71, 87.76, 87.72, 87.77, 87.89, 87.78, 87.89, 87.7], '1W': [86.75, 86.08, 86.43, 87.62, 87.7], '1M': [87.65, 87.65, 87.25, 87.01, 83.66, 85.68, 84.58, 85.68, 85.84, 84.01, 85.12, 84.84, 85.99, 86.12, 86.23, 85.73, 86.75, 86.08, 86.43, 87.62, 87.7], 'YTD': [80.28, 79.49, 82.19, 85.07, 88.18, 89.21, 91.93, 92.18, 91.99, 91.13, 91.73, 92.41, 91.16, 92.85, 94.48, 91.83, 96.25, 97.88, 95.39, 94.85, 88.27, 87.25, 85.68, 85.12, 85.73, 87.7], '6M': [80.41, 81.32, 81.12, 83.51, 87.15, 88.82, 90.83, 92.71, 95.68, 92.59, 91.54, 92.53, 91.62, 92.88, 94.17, 91.24, 90, 94.17, 95.39, 94.59, 90.06, 87.65, 84.58, 85.12, 85.73, 87.7], '1Y': [70.99, 73.88, 74.4, 75.95, 71.85, 70.4, 72.58, 72.24, 76.08, 72.09, 70.9, 71.64, 71.08, 75.85, 80.06, 83.35, 85.05, 83.25, 81.64, 82, 83.99, 84.3, 86.29, 83.13, 81.65, 79.54, 80.41, 81.32, 81.12, 83.51, 87.15, 88.82, 90.83, 91.22, 95.11, 92.6, 91.54, 92.53, 91.62, 92.88, 94.17, 91.24, 90, 94.17, 95.39, 94.85, 90.06, 87.65, 84.58, 85.12, 85.73, 87.7] },
      velocityScore: { '1D': 1, '1W': 1, '1M': -16, '6M': null }, isNew: false,
      marketCap: '$183B', pe: 22.3, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.85,
      etfPresence: { POW: 1.98, VOLT: 4.93, PBD: false, PBW: false, IVEP: 3.6 },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 3, avgWeight: 3.3, proScore: 1.98, coverage: 0.6,
      price: 171.91, weeklyPrices: [177.02, 184.34, 168.37, 167.55, 171.91], weeklyChange: -2.89, dayChange: 2.6, sortRank: 0, periodReturns: { '1M': 1.5, 'YTD': 68.6, '6M': 65.3, '1Y': 135.1 },
      priceHistory: { '1D': [167.55, 174.23, 172.82, 174.51, 176.46, 176.23, 174.35, 172.24, 172.55, 172.41, 173.28, 172.76, 172.64, 173.75, 173.74, 173.24, 173.53, 173.96, 173, 172.63, 171.9, 171.91, 171.95, 171.91], '1W': [177.02, 184.34, 168.37, 167.55, 171.91], '1M': [169.29, 167.8, 164.87, 166.99, 171.55, 173.39, 176.39, 173.88, 162.86, 163.81, 156.79, 164.52, 165.84, 169, 167.34, 170.94, 177.02, 184.34, 168.37, 167.55, 171.91], 'YTD': [101.97, 102.72, 107.98, 111.57, 115.62, 113.87, 111.9, 116.87, 121.79, 110.55, 107.87, 122.58, 118.44, 121.26, 128.63, 129.7, 142.76, 142.9, 172.49, 172.91, 161.86, 164.87, 173.88, 156.79, 170.94, 171.91], '6M': [104.18, 106.61, 106.39, 109.9, 113.16, 119.43, 112.15, 115.22, 118.22, 111.65, 109.13, 114.71, 125.61, 118.28, 127.11, 131.38, 140.13, 137.37, 172.49, 170.74, 158.23, 167.8, 176.39, 156.79, 170.94, 171.91], '1Y': [73.13, 74.91, 74.87, 75.91, 78.53, 89.88, 89.1, 89.8, 88.02, 92.58, 92.8, 94.78, 98.99, 97, 97.8, 95.98, 100.54, 100.62, 104.35, 109.97, 105.92, 101.52, 107.27, 107.72, 101.71, 101.54, 104.18, 106.61, 106.39, 109.9, 113.16, 119.43, 112.15, 115.65, 121.8, 113.83, 109.13, 114.71, 125.61, 118.28, 127.11, 131.38, 140.13, 137.37, 172.49, 172.91, 158.23, 167.8, 176.39, 156.79, 170.94, 171.91] },
      velocityScore: { '1D': -3.9, '1W': -3.9, '1M': -17.8, '6M': null }, isNew: false,
      marketCap: '$28B', pe: 58.7, revenueGrowth: 54, eps: 2.93, grossMargin: 37, dividendYield: 0.5,
      etfPresence: { POW: 3.7, VOLT: 3.03, PBD: false, PBW: false, IVEP: 3.18 },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 3, avgWeight: 2.95, proScore: 1.77, coverage: 0.6,
      price: 536.04, weeklyPrices: [523.69, 539.39, 509.96, 518.18, 536.04], weeklyChange: 2.36, dayChange: 3.45, sortRank: 0, periodReturns: { '1M': 12.1, 'YTD': 20.7, '6M': 17.5, '1Y': 32.3 },
      priceHistory: { '1D': [518.18, 534.15, 537.5, 543.49, 545.92, 545.82, 538.9, 535.75, 534.56, 534.14, 537.97, 536.64, 535.51, 535.01, 534.63, 533.38, 532.91, 535.07, 533.46, 532.47, 531.95, 532.58, 530.74, 536.04], '1W': [523.69, 539.39, 509.96, 518.18, 536.04], '1M': [478.05, 484.25, 473.93, 473.61, 462.93, 480.46, 484.91, 485.27, 476.82, 485.03, 467.59, 469.32, 476.89, 489.73, 502.65, 508.87, 523.69, 539.39, 509.96, 518.18, 536.04], 'YTD': [444.11, 460.87, 484.11, 484.06, 497.97, 487.4, 516.02, 526.73, 524.19, 476.51, 468.41, 492.65, 481.67, 500.38, 534.67, 521.71, 557.85, 508.17, 502.34, 483.79, 463.32, 473.93, 485.27, 467.59, 508.87, 536.04], '6M': [454.94, 465.48, 472.88, 472.54, 484.14, 503.86, 503.1, 524.25, 526.75, 488.49, 478.06, 471.22, 505.62, 490.74, 527.21, 526.94, 549.75, 545.93, 502.34, 485.98, 461.5, 484.25, 484.91, 467.59, 508.87, 536.04], '1Y': [405.26, 414.84, 419.24, 430.28, 442.54, 426.74, 417.84, 437.67, 427.57, 445.8, 436.04, 437.43, 441.44, 425.22, 413, 408.46, 428.82, 433.27, 469.96, 461.47, 437.65, 407.36, 431.43, 440.53, 448, 442.51, 454.94, 465.48, 472.88, 472.54, 484.14, 503.86, 503.1, 522.3, 527.9, 490.78, 478.06, 471.22, 505.62, 490.74, 527.21, 526.94, 549.75, 545.93, 502.34, 483.79, 461.5, 484.25, 484.91, 467.59, 508.87, 536.04] },
      velocityScore: { '1D': -1.1, '1W': -1.1, '1M': -16.5, '6M': null }, isNew: false,
      marketCap: '$28B', pe: 31.6, revenueGrowth: 11, eps: 16.94, grossMargin: 36, dividendYield: 1.1,
      etfPresence: { POW: 2.85, VOLT: 3.42, PBD: false, PBW: false, IVEP: 2.58 },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'NRG', name: 'NRG Energy Inc', easyScore: 3, avgWeight: 1.3, proScore: 0.78, coverage: 0.6,
      price: 147.11, weeklyPrices: [135.06, 138.91, 137.66, 142.21, 147.11], weeklyChange: 8.92, dayChange: 3.45, sortRank: 0, periodReturns: { '1M': 4.8, 'YTD': -7.6, '6M': -8.4, '1Y': -8.9 },
      priceHistory: { '1D': [142.21, 145.82, 145.37, 144.99, 144.98, 144.88, 144.68, 144.82, 144.65, 144.61, 145.74, 145.44, 145.57, 145.93, 145.79, 145.51, 145.27, 145.9, 145.69, 145.59, 145.59, 145.85, 146.71, 147.11], '1W': [135.06, 138.91, 137.66, 142.21, 147.11], '1M': [140.43, 138, 137.5, 134.08, 129.47, 133.51, 133.76, 133.39, 129.2, 127.71, 120.65, 123.7, 125.47, 130.4, 132.1, 132.13, 135.06, 138.91, 137.66, 142.21, 147.11], 'YTD': [159.24, 143.53, 158.5, 151.09, 153.72, 144.44, 161.8, 179.18, 181.34, 160.46, 152.1, 161.4, 146.14, 149.9, 161.78, 168.5, 154.53, 155.58, 150.64, 131.08, 133.98, 137.5, 133.39, 120.65, 132.13, 147.11], '6M': [160.88, 161.59, 148.89, 148.91, 156.04, 152.18, 156.43, 173.45, 184.03, 162.06, 155.15, 154.75, 151.13, 146.14, 160.3, 168.45, 149.6, 149.01, 150.64, 137.34, 123.71, 138, 133.76, 120.65, 132.13, 147.11], '1Y': [161.54, 158.39, 150.68, 151.75, 156.59, 167.63, 153.22, 153.78, 145.89, 148.66, 147.66, 164.84, 164.36, 168.57, 166.28, 160.43, 169.93, 163.81, 173.14, 170.1, 166.15, 160.46, 169.49, 163, 161.44, 156.2, 160.88, 161.59, 148.89, 148.91, 156.04, 152.18, 156.43, 171.06, 183.59, 163.54, 155.15, 154.75, 151.13, 146.14, 160.3, 168.45, 149.6, 149.01, 150.64, 131.08, 123.71, 138, 133.76, 120.65, 132.13, 147.11] },
      velocityScore: { '1D': 18.2, '1W': 5.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$31B', pe: 161.7, revenueGrowth: 20, eps: 0.91, grossMargin: 16, dividendYield: 1.34,
      etfPresence: { POW: 0.51, VOLT: 1, PBD: false, PBW: false, IVEP: 2.4 },
      tonyNote: 'NRG Energy Inc appears in 3 of 5 Electrification ETFs (60% coverage) with average weight 1.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, avgWeight: 5.51, proScore: 2.21, coverage: 0.4,
      price: 310.32, weeklyPrices: [296.39, 304.33, 288.64, 294.15, 310.32], weeklyChange: 4.7, dayChange: 5.5, sortRank: 0, periodReturns: { '1M': 12.3, 'YTD': 82.9, '6M': 76.1, '1Y': 230.6 },
      priceHistory: { '1D': [294.15, 299.07, 302.59, 300.02, 302.42, 304.9, 305.96, 304.5, 303.53, 307.72, 305.64, 308.19, 310.85, 308.86, 308.14, 309.26, 308.59, 309.53, 307.96, 306.89, 307.02, 308.5, 308.5, 310.32], '1W': [296.39, 304.33, 288.64, 294.15, 310.32], '1M': [276.25, 280.13, 276.96, 274.52, 269.86, 269.22, 280.09, 276.54, 262.56, 279.13, 276.95, 296.55, 293.87, 302.15, 293.22, 299.84, 296.39, 304.33, 288.64, 294.15, 310.32], 'YTD': [169.63, 180.24, 196.61, 200.29, 210.44, 208, 231.48, 235.04, 232.12, 202.58, 195.18, 214.95, 204.11, 203.04, 235, 241.49, 268.31, 275.84, 286.89, 266.92, 254.75, 276.96, 276.54, 276.95, 299.84, 310.32], '6M': [176.45, 175.77, 188, 201.17, 210.66, 217.25, 237.19, 235.3, 234.4, 213.65, 198.5, 209.52, 222.04, 197.98, 228.29, 236.04, 262.68, 258.26, 286.89, 298.22, 249.71, 280.13, 280.09, 276.95, 299.84, 310.32], '1Y': [93.87, 100.1, 101.14, 101.69, 119.84, 127.5, 132.61, 132.13, 128.91, 136.29, 143.88, 141.73, 142.08, 142.84, 138.97, 137.73, 148.88, 154.9, 150.62, 160.16, 146.49, 134.36, 154.03, 166, 173.12, 175.69, 176.45, 175.77, 188, 201.17, 210.66, 217.25, 237.19, 221.19, 234.67, 213.8, 198.5, 209.52, 222.04, 197.98, 228.29, 236.04, 262.68, 258.26, 286.89, 266.92, 249.71, 280.13, 280.09, 276.95, 299.84, 310.32] },
      velocityScore: { '1D': 1.4, '1W': -2.2, '1M': -39.3, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 74.8, revenueGrowth: 17, eps: 4.15, grossMargin: 39, dividendYield: 0.1,
      etfPresence: { POW: 3.47, VOLT: 7.56, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, avgWeight: 3.42, proScore: 1.37, coverage: 0.4,
      price: 137, weeklyPrices: [127.69, 130.30, 133.74, 134.96, 137.00], weeklyChange: 7.29, dayChange: 1.52, sortRank: 0, periodReturns: { '1M': 4.7, 'YTD': 18.8, '6M': 18.8, '1Y': 33.9 },
      priceHistory: { '1D': [134.95, 136.35, 137.53, 136.35, 135.85, 135.98, 136.22, 135.85, 135.51, 135.1, 135.18, 135.24, 135.12, 135.5, 135.86, 136.12, 136.39, 136.66, 136.83, 136.83, 137.07, 136.87, 136.96, 137], '1W': [127.69, 130.3, 133.74, 134.96, 137], '1M': [130.9, 129.57, 127.76, 126.67, 123.79, 127.11, 126.31, 127.79, 129.14, 126.77, 128.53, 128.48, 129.23, 129.31, 129.75, 128.27, 127.69, 130.3, 133.74, 134.96, 137], 'YTD': [115.31, 115.93, 119.4, 117.18, 119.21, 120.61, 126.43, 129.37, 132.1, 132.04, 132.22, 128.72, 128.85, 131.67, 137.15, 134.56, 135.08, 137.11, 132.56, 127.95, 128.87, 127.76, 127.79, 128.53, 128.27, 137], '6M': [115.67, 114.07, 116.57, 119.22, 119.43, 120.67, 121.23, 130.24, 132.39, 131.92, 132.31, 133.62, 128.8, 131.08, 134.71, 134.39, 131.62, 134.44, 132.56, 131.94, 128.92, 129.57, 126.31, 128.53, 128.27, 137], '1Y': [102.35, 103.86, 105.34, 107.4, 109.79, 113.58, 113.73, 112.86, 113.14, 111.78, 108.11, 109.46, 107.06, 109.14, 114.06, 117.04, 117.53, 116.18, 121.89, 119.53, 121.48, 120.9, 123.77, 117.54, 114.13, 114.49, 115.67, 114.07, 116.57, 119.22, 119.43, 120.67, 121.23, 127.27, 132.46, 133.52, 132.31, 133.62, 128.8, 131.08, 134.71, 134.39, 131.62, 134.44, 132.56, 127.95, 128.92, 129.57, 126.31, 128.53, 128.27, 137] },
      velocityScore: { '1D': 22.3, '1W': 25.7, '1M': -31.8, '6M': null }, isNew: false,
      marketCap: '$75B', pe: 20.3, revenueGrowth: 10, eps: 6.76, grossMargin: 47, dividendYield: 2.82,
      etfPresence: { POW: 2.57, VOLT: 4.27, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 2, avgWeight: 3.24, proScore: 1.29, coverage: 0.4,
      price: 325.57, weeklyPrices: [333.05, 357.96, 318.32, 316.43, 325.57], weeklyChange: -2.25, dayChange: 2.89, sortRank: 0, periodReturns: { '1M': 0.5, 'YTD': 101, '6M': 95.1, '1Y': 163 },
      priceHistory: { '1D': [316.43, 335.1, 326.05, 326.07, 332.28, 331.71, 327.57, 326.72, 326.46, 324.94, 328.89, 328.13, 327.23, 327.27, 326.86, 325.86, 326.05, 326.98, 325.53, 325.21, 323.52, 323.19, 323.04, 325.57], '1W': [333.05, 357.96, 318.32, 316.43, 325.57], '1M': [323.91, 319.78, 314.18, 315.71, 323.39, 334.49, 331.44, 323.92, 300.51, 300.57, 280.98, 297.88, 302.87, 311.93, 299.6, 317.58, 333.05, 357.96, 318.32, 316.43, 325.57], 'YTD': [162.01, 160.78, 172.54, 181.12, 195.1, 177.75, 236.51, 243.75, 259.23, 249.75, 265.38, 269.17, 252.4, 259.37, 287.64, 294.13, 321.75, 328.49, 358.92, 369.99, 315.67, 314.18, 323.92, 280.98, 317.58, 325.57], '6M': [167.58, 173.95, 170.03, 175.18, 189.21, 190.15, 199.62, 243.53, 253.15, 244.44, 270.06, 268.41, 270.89, 250.58, 281.03, 301.16, 305.14, 306.18, 358.92, 367.13, 322.63, 319.78, 331.44, 280.98, 317.58, 325.57], '1Y': [123.8, 127.84, 123.3, 129.06, 137.47, 141.59, 139.39, 132.52, 126.58, 134.23, 124, 134.84, 143.6, 138.62, 160.2, 169.01, 177.82, 183.2, 193.76, 183.02, 163.64, 159.61, 179.73, 189.02, 161.27, 159.82, 167.58, 173.95, 170.03, 175.18, 189.21, 190.15, 199.62, 243.21, 262.19, 251.28, 270.06, 268.41, 270.89, 250.58, 281.03, 301.16, 305.14, 306.18, 358.92, 369.99, 322.63, 319.78, 331.44, 280.98, 317.58, 325.57] },
      velocityScore: { '1D': -0.8, '1W': -1.5, '1M': -24.6, '6M': null }, isNew: false,
      marketCap: '$125B', pe: 81.6, revenueGrowth: 30, eps: 3.99, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 2.43, PBD: false, PBW: false, IVEP: 4.04 },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, avgWeight: 2.74, proScore: 1.1, coverage: 0.4,
      price: 375.15, weeklyPrices: [372.59, 388.23, 364.96, 359.61, 375.15], weeklyChange: 0.69, dayChange: 4.32, sortRank: 0, periodReturns: { '1M': 10.5, 'YTD': 79.2, '6M': 72.7, '1Y': 180.3 },
      priceHistory: { '1D': [359.61, 371.51, 366, 367.23, 371.77, 375.58, 369.67, 369.89, 369.35, 370.03, 373.13, 374.04, 373.44, 373.55, 372.17, 371.41, 371.02, 372.14, 371.02, 370.96, 369.68, 370.74, 372.34, 375.15], '1W': [372.59, 388.23, 364.96, 359.61, 375.15], '1M': [339.65, 328.34, 317.08, 302.18, 294.65, 312.28, 322.5, 320.92, 294.81, 306.11, 308.17, 340.4, 354.37, 370.66, 350.45, 353.32, 372.59, 388.23, 364.96, 359.61, 375.15], 'YTD': [209.37, 210.99, 257.29, 275.57, 269.12, 257.64, 312.95, 331.23, 337.35, 311.42, 305.82, 327.8, 313.11, 332.82, 374.98, 372.23, 382.47, 383.91, 360.81, 339.19, 313.05, 317.08, 320.92, 308.17, 353.32, 375.15], '6M': [217.86, 227.65, 227.59, 250.95, 259.55, 263.03, 279.04, 314.12, 335.74, 322.47, 311.39, 315.91, 356.38, 322.71, 366.95, 374.32, 377.19, 361.39, 360.81, 339.42, 302.84, 328.34, 322.5, 308.17, 353.32, 375.15], '1Y': [133.84, 138.14, 140.73, 143.25, 140.54, 135.25, 146.5, 161.89, 148.07, 155.55, 153.74, 157.44, 174.35, 166.46, 173.86, 169.62, 192.22, 198.42, 205.61, 219.2, 202.82, 188.88, 211.19, 219.38, 215.07, 216.09, 217.86, 227.65, 227.59, 250.95, 259.55, 263.03, 279.04, 321.34, 338.51, 330.54, 311.39, 315.91, 356.38, 322.71, 366.95, 374.32, 377.19, 361.39, 360.81, 339.19, 302.84, 328.34, 322.5, 308.17, 353.32, 375.15] },
      velocityScore: { '1D': 22.2, '1W': 0.9, '1M': -38.9, '6M': null }, isNew: false,
      marketCap: '$15B', pe: 77.8, revenueGrowth: 26, eps: 4.82, grossMargin: 39, dividendYield: 0.11,
      etfPresence: { POW: 1.08, VOLT: 4.4, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'APH', name: 'Amphenol Corp', easyScore: 2, avgWeight: 2.67, proScore: 1.07, coverage: 0.4,
      price: 165.15, weeklyPrices: [163.96, 165.96, 158.70, 162.78, 165.15], weeklyChange: 0.73, dayChange: 1.46, sortRank: 0, periodReturns: { '1M': 18.3, 'YTD': 22.2, '6M': 19.7, '1Y': 70.3 },
      priceHistory: { '1D': [162.78, 166.86, 164.66, 166.12, 167.15, 167.56, 165.53, 165.61, 166.38, 165.73, 166.5, 166.76, 165.71, 165.9, 165.41, 165.55, 165.51, 166.4, 165.95, 166.3, 165.17, 164.59, 165.43, 165.15], '1W': [163.96, 165.96, 158.7, 162.78, 165.15], '1M': [139.56, 140.24, 147.68, 148.76, 146.34, 148.4, 147.62, 146.77, 138.81, 143.6, 149.22, 152.46, 153.8, 158.59, 158.81, 161.11, 163.96, 165.96, 158.7, 162.78, 165.15], 'YTD': [135.14, 136.25, 154.22, 152.5, 149.58, 127.63, 143.73, 151.04, 148.47, 136.24, 131.47, 130.65, 123.13, 127.7, 137.68, 148.96, 150.18, 147.27, 138.47, 124.64, 123.05, 147.68, 146.77, 149.22, 161.11, 165.15], '6M': [137.43, 139.88, 145.11, 152.33, 166.25, 147.06, 144.14, 148.57, 151.5, 129.58, 136.74, 135.12, 127.96, 126.35, 135.32, 146.98, 148.13, 148.38, 138.47, 127.87, 119.2, 140.24, 147.62, 149.22, 161.11, 165.15], '1Y': [96.98, 99.46, 98.76, 103.34, 105.02, 104.31, 108.55, 110.74, 108.81, 111.94, 110.45, 118.68, 123.94, 122.6, 122.22, 121.7, 127.36, 135.31, 139.11, 138.11, 135.25, 130.36, 140.9, 139.36, 129.24, 135.29, 137.43, 139.88, 145.11, 152.33, 166.25, 147.06, 144.14, 147.73, 152.64, 132.75, 136.74, 135.12, 127.96, 126.35, 135.32, 146.98, 148.13, 148.38, 138.47, 124.64, 119.2, 140.24, 147.62, 149.22, 161.11, 165.15] },
      velocityScore: { '1D': null, '1W': -0.9, '1M': null, '6M': null }, isNew: true,
      marketCap: '$203B', pe: 47.5, revenueGrowth: 58, eps: 3.48, grossMargin: 38, dividendYield: 0.61,
      etfPresence: { POW: 1, VOLT: 4.35, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 2.62, proScore: 1.05, coverage: 0.4,
      price: 77.53, weeklyPrices: [73.12, 74.95, 75.79, 75.87, 77.53], weeklyChange: 6.03, dayChange: 2.19, sortRank: 0, periodReturns: { '1M': 1.6, 'YTD': 29, '6M': 30.4, '1Y': 23.3 },
      priceHistory: { '1D': [75.87, 76.46, 77.12, 77.13, 76.98, 77.11, 77.33, 77.29, 76.86, 76.66, 76.72, 76.92, 76.94, 76.75, 76.89, 77.07, 77.43, 77.57, 77.61, 77.62, 77.37, 77.26, 77.26, 77.53], '1W': [73.12, 74.95, 75.79, 75.87, 77.53], '1M': [76.34, 74.37, 73.13, 71.39, 70.04, 71.31, 71.66, 72.43, 71.96, 71.59, 72.26, 71.62, 72.08, 71.49, 71.48, 71.25, 73.12, 74.95, 75.79, 75.87, 77.53], 'YTD': [60.11, 61.15, 60.29, 63.72, 67.24, 67.42, 71.13, 72.98, 74.77, 74.77, 73.52, 74.06, 74.06, 71.83, 72.82, 70.86, 71.65, 76.31, 73.76, 75.71, 77.88, 73.13, 72.43, 72.26, 71.25, 77.53], '6M': [59.52, 61.16, 59.56, 61.51, 65.48, 68.5, 68.84, 71.96, 73.5, 75.88, 73.84, 73.69, 74.46, 72.78, 73.01, 70.76, 71.1, 73.32, 73.76, 74.73, 79.4, 74.37, 71.66, 72.26, 71.25, 77.53], '1Y': [62.87, 58.64, 58.22, 59.35, 57.82, 60.27, 57.89, 57.34, 57.8, 58, 57.2, 58.81, 60.11, 64.01, 64.48, 62.61, 62.53, 58.93, 57.62, 57.94, 59.59, 58.91, 60.93, 62.81, 59.74, 58.26, 59.52, 61.16, 59.56, 61.51, 65.48, 68.5, 68.84, 72.14, 73.97, 75.77, 73.84, 73.69, 74.46, 72.78, 73.01, 70.76, 71.1, 73.32, 73.76, 75.71, 79.4, 74.37, 71.66, 72.26, 71.25, 77.53] },
      velocityScore: { '1D': 0, '1W': 6.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$95B', pe: 34, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.77,
      etfPresence: { POW: false, VOLT: 1.53, PBD: false, PBW: false, IVEP: 3.71 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'JCI', name: 'JOHNSON CONTROLS INTERNATIONAL PLC', easyScore: 2, avgWeight: 2.46, proScore: 0.98, coverage: 0.4,
      price: 145.49, weeklyPrices: [144.82, 148.21, 141.28, 142.81, 145.49], weeklyChange: 0.46, dayChange: 1.88, sortRank: 0, periodReturns: { '1M': 3.8, 'YTD': 21.5, '6M': 19.9, '1Y': 39.3 },
      priceHistory: { '1D': [142.81, 145.71, 146.53, 147.05, 147.64, 147.4, 145.81, 145.57, 145.01, 145.2, 145.95, 145.65, 145.25, 145.43, 145.66, 145.72, 145.69, 145.77, 145.46, 145.36, 145.42, 145.38, 145.35, 145.49], '1W': [144.82, 148.21, 141.28, 142.81, 145.49], '1M': [140.22, 138.2, 136.15, 134.06, 133.91, 141.99, 146.96, 147.4, 143.65, 144.05, 139.36, 144.01, 144.96, 146.06, 145.17, 143.62, 144.82, 148.21, 141.28, 142.81, 145.49], 'YTD': [119.75, 111.29, 112.95, 114.51, 120.28, 132.52, 138.57, 143.79, 143.42, 137.18, 130.94, 133.25, 131.57, 134.72, 141.85, 137.55, 141.73, 146.03, 143.14, 143.8, 137.75, 136.15, 147.4, 139.36, 143.62, 145.49], '6M': [122.06, 121.53, 111.39, 114.56, 116.96, 124.01, 138.75, 142.21, 144.71, 139.58, 133.94, 132.56, 136.43, 130.95, 139, 137.21, 139.81, 141.35, 143.14, 141.04, 135.42, 138.2, 146.96, 139.36, 143.62, 145.49], '1Y': [104.44, 106.71, 105.85, 108.96, 111.73, 106.48, 104.31, 105.02, 104.75, 108.65, 106.23, 107.53, 108.69, 107.01, 108.79, 105.55, 109.37, 110.55, 114.21, 122.25, 120.2, 112.99, 116.31, 114.23, 114.76, 119.53, 122.06, 121.53, 111.39, 114.56, 116.96, 124.01, 138.75, 139.48, 144.49, 140, 133.94, 132.56, 136.43, 130.95, 139, 137.21, 139.81, 141.35, 143.14, 143.8, 135.42, 138.2, 146.96, 139.36, 143.62, 145.49] },
      velocityScore: { '1D': 1, '1W': -2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$89B', pe: 44.5, revenueGrowth: 8, eps: 3.27, grossMargin: 37, dividendYield: 1.12,
      etfPresence: { POW: false, VOLT: 1.39, PBD: false, PBW: false, IVEP: 3.53 },
      tonyNote: 'JOHNSON CONTROLS INTERNATIONAL PLC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VST', name: 'Vistra Corp', easyScore: 2, avgWeight: 2.33, proScore: 0.93, coverage: 0.4,
      price: 167.77, weeklyPrices: [163.75, 167.26, 162.39, 162.87, 167.77], weeklyChange: 2.45, dayChange: 3.01, sortRank: 0, periodReturns: { '1M': 2, 'YTD': 4, '6M': 3.6, '1Y': -11.9 },
      priceHistory: { '1D': [162.87, 169.48, 168.47, 168.34, 168.7, 168.84, 166.88, 167.14, 166.57, 166.34, 168.33, 168.17, 167.78, 167.7, 167.68, 167.73, 167.49, 168.07, 168.05, 168.21, 168.1, 167.61, 167.93, 167.77], '1W': [163.75, 167.26, 162.39, 162.87, 167.77], '1M': [164.56, 160.15, 160.28, 160.23, 154.76, 157.97, 153.8, 153.7, 148.76, 146.9, 138.54, 146.38, 148.02, 153.52, 158.61, 158.83, 163.75, 167.26, 162.39, 162.87, 167.77], 'YTD': [161.33, 150.6, 180.18, 160.36, 162.58, 143.07, 163.1, 171.4, 176.82, 167.4, 159.58, 167.37, 152.3, 153.96, 152.75, 165.53, 156.85, 157.84, 158.29, 142.61, 144, 160.28, 153.7, 138.54, 158.83, 167.77], '6M': [161.67, 162.93, 172.58, 156.81, 164.26, 153, 159.6, 173.68, 171.62, 161.7, 164.4, 164.33, 152.72, 150.33, 155.89, 162.94, 155.79, 153.79, 158.29, 146.87, 134.71, 160.15, 153.8, 138.54, 158.83, 167.77], '1Y': [190.4, 192.2, 196.58, 193.01, 192.2, 208.05, 205.59, 202.35, 190.28, 196.7, 188, 209.7, 211.28, 207.22, 201.99, 196.86, 210.4, 191.37, 189.71, 184.62, 171.56, 173.79, 178.86, 167.17, 170.1, 163.03, 161.67, 162.93, 172.58, 156.81, 164.26, 153, 159.6, 170.57, 175.36, 163.36, 164.4, 164.33, 152.72, 150.33, 155.89, 162.94, 155.79, 153.79, 158.29, 142.61, 134.71, 160.15, 153.8, 138.54, 158.83, 167.77] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$57B', pe: 28.1, revenueGrowth: 43, eps: 5.98, grossMargin: 39, dividendYield: 0.56,
      etfPresence: { POW: 1.4, VOLT: false, PBD: false, PBW: false, IVEP: 3.27 },
      tonyNote: 'Vistra Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CEG', name: 'Constellation Energy Corp', easyScore: 2, avgWeight: 2.33, proScore: 0.93, coverage: 0.4,
      price: 268.69, weeklyPrices: [274.06, 275.53, 270.26, 267.97, 268.69], weeklyChange: -1.96, dayChange: 0.27, sortRank: 0, periodReturns: { '1M': -10.9, 'YTD': -23.9, '6M': -26.2, '1Y': -16.7 },
      priceHistory: { '1D': [267.97, 272.05, 272.76, 272.98, 274.85, 274.39, 270.5, 270.53, 270.27, 269.24, 271.22, 271.66, 270.73, 270.75, 270.83, 270.86, 270.17, 270.88, 270.85, 270.8, 270.41, 269.18, 269.29, 268.69], '1W': [274.06, 275.53, 270.26, 267.97, 268.69], '1M': [301.57, 288.68, 286.31, 287.75, 265.7, 272.65, 267.24, 264.59, 254.83, 250.67, 242.3, 246.71, 253.76, 262.35, 268, 267.17, 274.06, 275.53, 270.26, 267.97, 268.69], 'YTD': [353.27, 322.54, 341.2, 287.35, 287.45, 247.06, 276.12, 294.84, 323.56, 332.07, 301.55, 316.47, 295.19, 279.46, 280.25, 299.14, 292.77, 313, 322.78, 274.89, 281.26, 286.31, 264.59, 242.3, 267.17, 268.69], '6M': [360.46, 354.94, 335.86, 295.4, 288.76, 268.45, 271.14, 303.01, 312.64, 324.87, 317.09, 307.69, 294.85, 279.25, 284.27, 294.73, 287.16, 297, 322.78, 293.6, 260.67, 288.68, 267.24, 242.3, 267.17, 268.69], '1Y': [322.51, 311.88, 321.54, 321.42, 327.35, 340.77, 336.41, 326.21, 312.52, 319.55, 301.58, 323.48, 330.9, 331.26, 360, 368.49, 396.53, 365.8, 382.48, 351.3, 335.74, 345.78, 364.36, 359.82, 351.98, 355.4, 360.46, 354.94, 335.86, 295.4, 288.76, 268.45, 271.14, 294.05, 325.84, 322.85, 317.09, 307.69, 294.85, 279.25, 284.27, 294.73, 287.16, 297, 322.78, 274.89, 260.67, 288.68, 267.24, 242.3, 267.17, 268.69] },
      velocityScore: { '1D': -3.1, '1W': -2.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$96B', pe: 23.3, revenueGrowth: 64, eps: 11.52, grossMargin: 23, dividendYield: 0.64,
      etfPresence: { POW: 1.27, VOLT: false, PBD: false, PBW: false, IVEP: 3.38 },
      tonyNote: 'Constellation Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TLN', name: 'Talen Energy Corp', easyScore: 2, avgWeight: 2.24, proScore: 0.9, coverage: 0.4,
      price: 416.8, weeklyPrices: [436.29, 438.12, 411.92, 405.89, 416.80], weeklyChange: -4.47, dayChange: 2.69, sortRank: 0, periodReturns: { '1M': 7.1, 'YTD': 11.2, '6M': 8.7, '1Y': 43 },
      priceHistory: { '1D': [405.89, 420.24, 417.04, 418.48, 420.07, 419.84, 417.74, 417.7, 419.64, 415.86, 418.63, 417.77, 416.73, 416.15, 416.2, 415.78, 414.6, 416.17, 415.27, 416.6, 415.84, 414.61, 415.39, 416.8], '1W': [436.29, 438.12, 411.92, 405.89, 416.8], '1M': [389, 379.78, 381.47, 386.8, 377.2, 385.51, 379.59, 378.08, 364.74, 364.78, 336.59, 344.8, 360.54, 386.21, 406.51, 409.81, 436.29, 438.12, 411.92, 405.89, 416.8], 'YTD': [374.84, 356, 419.07, 379.86, 362.2, 324.63, 367.81, 382.25, 390.05, 334.86, 311.45, 340.07, 323.13, 328.08, 312.76, 362.4, 345.25, 372.42, 409.99, 351.03, 344.46, 381.47, 378.08, 336.59, 409.81, 416.8], '6M': [384.52, 395.2, 369.03, 356.66, 359.51, 341.42, 357.93, 388.28, 375.24, 341.39, 331.58, 327.14, 315.77, 319.23, 328.65, 353.3, 339.32, 351.91, 409.99, 374.61, 314.57, 379.78, 379.59, 336.59, 409.81, 416.8], '1Y': [291.38, 286.31, 276.17, 328.63, 346.62, 378.01, 375.58, 380.6, 357.86, 388.22, 389.19, 402.53, 423.56, 411.23, 438.5, 412.83, 418.03, 383.82, 391.82, 385.93, 355.04, 369.1, 394.27, 354.24, 356.36, 372.25, 384.52, 395.2, 369.03, 356.66, 359.51, 341.42, 357.93, 380.29, 391.43, 336.57, 331.58, 327.14, 315.77, 319.23, 328.65, 353.3, 339.32, 351.91, 409.99, 351.03, 314.57, 379.78, 379.59, 336.59, 409.81, 416.8] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$20B', pe: null, revenueGrowth: 97, eps: -0.53, grossMargin: 40, dividendYield: null,
      etfPresence: { POW: 1.66, VOLT: false, PBD: false, PBW: false, IVEP: 2.82 },
      tonyNote: 'Talen Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX TECHNOLOGIES INC', easyScore: 2, avgWeight: 2.17, proScore: 0.87, coverage: 0.4,
      price: 204.77, weeklyPrices: [205.40, 210.00, 209.89, 205.65, 204.77], weeklyChange: -0.31, dayChange: -0.43, sortRank: 0, periodReturns: { '1M': 0.2, 'YTD': 18.5, '6M': 15.6, '1Y': 44.3 },
      priceHistory: { '1D': [205.65, 208.27, 208.36, 208.32, 211, 209.03, 206.28, 206.14, 205.21, 204.42, 205.71, 205.18, 204.75, 205.21, 205.28, 205, 204.87, 205.65, 204.95, 204.02, 203.71, 203.57, 204.38, 204.77], '1W': [205.4, 210, 209.89, 205.65, 204.77], '1M': [204.38, 198.95, 199.27, 195.88, 188.39, 187.26, 184.72, 190.76, 185.95, 187.46, 183, 194.68, 193.45, 193.94, 196.93, 203.07, 205.4, 210, 209.89, 205.65, 204.77], 'YTD': [172.84, 193.2, 213.25, 206.33, 210.18, 187.42, 196.9, 206.44, 207.24, 195.5, 197.82, 210.12, 205.09, 212.81, 230.29, 230.8, 225.51, 216.39, 215.2, 206.83, 202.66, 199.27, 190.76, 183, 203.07, 204.77], '6M': [175.88, 189.02, 206.62, 206.07, 212.4, 210.88, 199.83, 201.09, 204.23, 205.83, 195.91, 207.48, 204.76, 204.49, 231.78, 238.42, 219.1, 208.08, 215.2, 206.83, 197.33, 198.95, 184.72, 183, 203.07, 204.77], '1Y': [141.87, 142.91, 137.06, 142.95, 147.96, 149.5, 179.53, 174.7, 165.34, 165.83, 163.64, 168.33, 174.5, 180.62, 186.64, 190.08, 209.01, 199.92, 213.8, 193.93, 177.88, 175.28, 178.88, 177.87, 175.03, 176.43, 175.88, 189.02, 206.62, 206.07, 212.4, 210.88, 199.83, 202.25, 208.27, 205.57, 195.91, 207.48, 204.76, 204.49, 231.78, 238.42, 219.1, 208.08, 215.2, 206.83, 197.33, 198.95, 184.72, 183, 203.07, 204.77] },
      velocityScore: { '1D': -2.2, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 54.8, revenueGrowth: 26, eps: 3.74, grossMargin: 23, dividendYield: 0.51,
      etfPresence: { POW: false, VOLT: 2.12, PBD: false, PBW: false, IVEP: 2.23 },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 5.36, proScore: 2.14, coverage: 0.4,
      price: 881.92, weeklyPrices: [861.88, 932.75, 892.25, 867.23, 881.92], weeklyChange: 2.33, dayChange: 1.69, sortRank: 0, periodReturns: { '1M': 12.6, 'YTD': 188, '6M': 180.9, '1Y': 285.7 },
      priceHistory: { '1D': [867.23, 882.09, 884.26, 897.16, 925, 913.45, 896.43, 884.97, 894.07, 894.3, 899.61, 900.43, 896.51, 891.55, 882, 875.96, 878.27, 882.66, 877.54, 876.6, 869.77, 866.08, 867.15, 881.92], '1W': [861.88, 932.75, 892.25, 867.23, 881.92], '1M': [783.53, 782.12, 842.96, 860.84, 845.39, 875.52, 957.03, 993.74, 882.43, 891.86, 770.25, 838.55, 858.99, 866.67, 857.76, 838.21, 861.88, 932.75, 892.25, 867.23, 881.92], 'YTD': [306.23, 297.62, 336.31, 364.25, 379.23, 365.07, 431.43, 435.5, 433.34, 398.87, 404.59, 431.78, 415.93, 421.29, 435.65, 441.1, 495.67, 515.62, 886.22, 854.28, 752, 842.96, 993.74, 770.25, 838.21, 881.92], '6M': [316.55, 327.11, 307.58, 349.59, 372.25, 386.78, 415.19, 421.2, 459.72, 415.51, 411.53, 425.51, 446.16, 407.27, 423.35, 456.08, 487.87, 469.75, 886.22, 851.35, 728.29, 782.12, 957.03, 770.25, 838.21, 881.92], '1Y': [228.65, 236.67, 241.76, 250.95, 268.14, 263.05, 299.64, 282.14, 278.03, 290.95, 285.98, 313.56, 360.25, 342.11, 349.3, 336.63, 361.02, 353.8, 379.03, 388.68, 326.6, 314.56, 344.31, 325.1, 315.15, 308.58, 316.55, 327.11, 307.58, 349.59, 372.25, 386.78, 415.19, 410.63, 455.25, 420.22, 411.53, 425.51, 446.16, 407.27, 423.35, 456.08, 487.87, 469.75, 886.22, 854.28, 728.29, 782.12, 957.03, 770.25, 838.21, 881.92] },
      velocityScore: { '1D': -3.2, '1W': 2.4, '1M': -54.9, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 78.8, revenueGrowth: 92, eps: 11.19, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 6.33, PRN: 4.39, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 5.18, proScore: 2.07, coverage: 0.4,
      price: 1057.01, weeklyPrices: [985.82, 1022.28, 984.24, 994.45, 1057.01], weeklyChange: 7.22, dayChange: 6.29, sortRank: 0, periodReturns: { '1M': 16.3, 'YTD': 84.5, '6M': 81.1, '1Y': 176.8 },
      priceHistory: { '1D': [994.45, 1033.22, 1032.42, 1044.76, 1048.03, 1048.1, 1044.44, 1039.44, 1038.6, 1039.09, 1052.62, 1050.45, 1047.83, 1049.74, 1048.96, 1048.21, 1047.31, 1046.8, 1042.39, 1046.49, 1048.48, 1047.99, 1051.94, 1057.01], '1W': [985.82, 1022.28, 984.24, 994.45, 1057.01], '1M': [908.55, 909.93, 887.67, 875.87, 865.36, 909.81, 926.18, 940.48, 904.28, 915.64, 856.16, 897.63, 910.57, 933.93, 945.46, 955.92, 985.82, 1022.28, 984.24, 994.45, 1057.01], 'YTD': [572.87, 608.13, 647.18, 648.41, 665.24, 678.31, 758.29, 759.74, 752.93, 706.08, 700.69, 688.65, 703.19, 730.32, 787.07, 772.66, 835.24, 890.11, 926.93, 902.3, 872.56, 887.67, 940.48, 856.16, 955.92, 1057.01], '6M': [583, 616.1, 629.77, 629, 638.91, 702.89, 742.37, 764.76, 768.23, 722.18, 716.68, 702, 716.63, 708.46, 771.58, 770.17, 808.87, 810.05, 926.93, 912.14, 860.15, 909.93, 926.18, 856.16, 955.92, 1057.01], '1Y': [381.88, 397.86, 405.92, 413.71, 433.75, 428.69, 417.12, 417.5, 417.89, 434.91, 423.08, 431.52, 466.54, 465.76, 497.85, 491.3, 540.96, 520.5, 583.15, 569.78, 553.55, 546.13, 575.76, 603.17, 597.89, 576.22, 583, 616.1, 629.77, 629, 638.91, 702.89, 742.37, 751.97, 766.61, 731.97, 716.68, 702, 716.63, 708.46, 771.58, 770.17, 808.87, 810.05, 926.93, 902.3, 860.15, 909.93, 926.18, 856.16, 955.92, 1057.01] },
      velocityScore: { '1D': 0.5, '1W': 3.5, '1M': -9.6, '6M': null }, isNew: false,
      marketCap: '$487B', pe: 52.6, revenueGrowth: 22, eps: 20.09, grossMargin: 29, dividendYield: 0.66,
      etfPresence: { AIRR: false, PRN: 3.48, RSHO: 6.89, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 4.97, proScore: 1.99, coverage: 0.4,
      price: 309.2, weeklyPrices: [297.20, 307.80, 291.50, 294.49, 309.20], weeklyChange: 4.04, dayChange: 4.94, sortRank: 0, periodReturns: { '1M': 5.9, 'YTD': 191, '6M': 175.9, '1Y': 365.3 },
      priceHistory: { '1D': [294.64, 314.07, 306.57, 307.92, 315.38, 313.99, 308, 309.96, 310.71, 307.55, 311.54, 311.78, 313.13, 312.6, 311.61, 308.21, 308.57, 308.88, 307.44, 306.78, 304.72, 305.12, 305.33, 309.2], '1W': [297.2, 307.8, 291.5, 294.49, 309.2], '1M': [291.97, 295.94, 288.9, 284.42, 288.12, 299.07, 299.73, 300.06, 284.87, 293.6, 262.34, 290.5, 294.75, 303.53, 292.7, 294.03, 297.2, 307.8, 291.5, 294.49, 309.2], 'YTD': [106.26, 119.94, 135.18, 142.29, 152.31, 179.6, 197.63, 182.27, 176.96, 167.67, 171.19, 175.13, 174.8, 184.68, 230.81, 232.81, 252.18, 277.27, 320.3, 300.84, 271.05, 288.9, 300.06, 262.34, 294.03, 309.2], '6M': [113.62, 120.46, 128.85, 142.76, 147.43, 151.08, 190.09, 187.21, 186.39, 170.37, 176.51, 174.04, 186.82, 180.36, 218.07, 229.73, 242.77, 253.49, 320.3, 308.05, 261.58, 295.94, 299.73, 262.34, 294.03, 309.2], '1Y': [66.46, 72.55, 70.87, 76.08, 82.79, 75.89, 77.8, 85.17, 83.64, 90.42, 89.41, 95.89, 99.1, 96.99, 101.35, 100.35, 112.77, 113.88, 125.9, 125, 109.4, 98.12, 107.74, 114.04, 112.36, 110.97, 113.62, 120.46, 128.85, 142.76, 147.43, 151.08, 190.09, 180.99, 183, 170.96, 176.51, 174.04, 186.82, 180.36, 218.07, 229.73, 242.77, 253.49, 320.3, 300.84, 261.58, 295.94, 299.73, 262.34, 294.03, 309.2] },
      velocityScore: { '1D': 0, '1W': -5.2, '1M': 9.3, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 60.4, revenueGrowth: 7, eps: 5.12, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { AIRR: 2.61, PRN: false, RSHO: 7.33, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.62, proScore: 1.85, coverage: 0.4,
      price: 2017.57, weeklyPrices: [1967.41, 2066.51, 1908.07, 1954.47, 2017.57], weeklyChange: 2.55, dayChange: 3.23, sortRank: 0, periodReturns: { '1M': 7.1, 'YTD': 116.2, '6M': 110.6, '1Y': 290.9 },
      priceHistory: { '1D': [1954.47, 2016.67, 1993.95, 2004.91, 2033.23, 2020.81, 1992.7, 1988.13, 1989.2, 1973.28, 2007.77, 2001.1, 2003.68, 1998.63, 1993.16, 1990.69, 1989.41, 2003.24, 2000.54, 2000.86, 1990.02, 1984.82, 1990.56, 2017.57], '1W': [1967.41, 2066.51, 1908.07, 1954.47, 2017.57], '1M': [1883.56, 1867.09, 1855.15, 1828.21, 1787.88, 1883.26, 1850.04, 1914.65, 1843.94, 1852.03, 1719.48, 1843.42, 1877.61, 1952.02, 1913.94, 1931.77, 1967.41, 2066.51, 1908.07, 1954.47, 2017.57], 'YTD': [933.29, 971.49, 1091.04, 1131.7, 1171.46, 1147.97, 1300.02, 1462.23, 1438.23, 1348.22, 1373.76, 1444.6, 1358.66, 1428.52, 1574.45, 1605.97, 1773.91, 1840.25, 2011.49, 2034.63, 1835.51, 1855.15, 1914.65, 1719.48, 1931.77, 2017.57], '6M': [963.83, 1032.31, 1038.18, 1134.75, 1160.38, 1209.97, 1269.63, 1337.75, 1468.58, 1391.16, 1383.62, 1424.46, 1461.52, 1378.99, 1525.16, 1648.96, 1724.49, 1724.14, 2011.49, 2016.31, 1825.5, 1867.09, 1850.04, 1719.48, 1931.77, 2017.57], '1Y': [516.08, 540.98, 539.5, 554.18, 688.74, 695.3, 694.43, 689.86, 694, 730.01, 706.31, 753.69, 797.71, 804.36, 818.01, 816.07, 838.78, 825, 963.3, 957.78, 897.52, 876.19, 976.94, 1001.48, 967.95, 940.74, 963.83, 1032.31, 1038.18, 1134.75, 1160.38, 1209.97, 1269.63, 1319.47, 1450.6, 1430.38, 1383.62, 1424.46, 1461.52, 1378.99, 1525.16, 1648.96, 1724.49, 1724.14, 2011.49, 2034.63, 1825.5, 1867.09, 1850.04, 1719.48, 1931.77, 2017.57] },
      velocityScore: { '1D': 2.2, '1W': 0.5, '1M': -59.2, '6M': null }, isNew: false,
      marketCap: '$71B', pe: 58.3, revenueGrowth: 1, eps: 34.59, grossMargin: 25, dividendYield: 0.13,
      etfPresence: { AIRR: 4.45, PRN: 4.78, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, avgWeight: 4.53, proScore: 1.81, coverage: 0.4,
      price: 753.07, weeklyPrices: [738.85, 790.00, 736.77, 732.24, 753.07], weeklyChange: 1.92, dayChange: 2.84, sortRank: 0, periodReturns: { '1M': 12.3, 'YTD': 140.4, '6M': 129.4, '1Y': 249.2 },
      priceHistory: { '1D': [732.24, 753.45, 748.86, 756.13, 771.82, 775.33, 767.25, 760.9, 753.72, 754.66, 761.56, 762.86, 760.29, 755.98, 752.91, 746.92, 750.11, 751.11, 750.42, 749.01, 745.02, 745.77, 749.49, 753.07], '1W': [738.85, 790, 736.77, 732.24, 753.07], '1M': [670.66, 673.51, 677.45, 667.02, 646.89, 663.14, 686.37, 689.43, 694.72, 619.98, 588.9, 623.66, 641.68, 688.87, 690.39, 719.52, 738.85, 790, 736.77, 732.24, 753.07], 'YTD': [313.32, 313.98, 329.66, 380.36, 355.51, 345.97, 413.65, 437.61, 452.53, 430.25, 459.3, 479.9, 410.85, 571.38, 609.29, 601.83, 656.79, 669.98, 727.54, 719.92, 630.5, 677.45, 689.43, 588.9, 719.52, 753.07], '6M': [325.14, 339.54, 309.26, 384.34, 362.58, 381.73, 371.47, 406.88, 447.6, 438.93, 458.71, 473.63, 444.83, 544.65, 588.28, 606.43, 651.68, 630.07, 727.54, 681.01, 639.58, 673.51, 686.37, 588.9, 719.52, 753.07], '1Y': [215.68, 211.09, 212.25, 206.63, 235.91, 225.27, 235, 224.54, 218.29, 242.08, 211.51, 230.31, 260.64, 266.73, 262.26, 256.15, 296.39, 276.12, 298.33, 311.38, 335.1, 353.3, 395.2, 313.7, 319.91, 325.59, 325.14, 339.54, 309.26, 384.34, 362.58, 381.73, 371.47, 414.12, 442.34, 463.36, 458.71, 473.63, 444.83, 544.65, 588.28, 606.43, 651.68, 630.07, 727.54, 719.92, 639.58, 673.51, 686.37, 588.9, 719.52, 753.07] },
      velocityScore: { '1D': -1.1, '1W': 0.6, '1M': -57.4, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 66.3, revenueGrowth: 50, eps: 11.35, grossMargin: 21, dividendYield: 0.27,
      etfPresence: { AIRR: 4.43, PRN: 4.63, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Argan Inc is an engineering and construction company for power generation facilities — natural gas and renewable power plants. It appears in Industrials ETFs because power plant construction is one of the fastest-growing categories in U.S. infrastructure spending, driven by data center load additions that the grid cannot currently support.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.92, proScore: 1.57, coverage: 0.4,
      price: 343.54, weeklyPrices: [337.96, 338.07, 330.90, 333.78, 343.54], weeklyChange: 1.65, dayChange: 2.92, sortRank: 0, periodReturns: { '1M': 10.3, 'YTD': 33.8, '6M': 30, '1Y': 47.9 },
      priceHistory: { '1D': [333.78, 340.49, 342.43, 342.68, 344.93, 344.36, 342.33, 341.84, 341.56, 341.33, 343.25, 342.18, 342.17, 341.49, 342.75, 342.06, 340.92, 342.05, 339.92, 340.38, 341.21, 341.66, 341.32, 343.54], '1W': [337.96, 338.07, 330.9, 333.78, 343.54], '1M': [311.33, 312.65, 308.53, 303.81, 300.98, 308.31, 313.39, 313.67, 315.29, 314.42, 314.08, 318.89, 320.11, 316.18, 324.38, 329.89, 337.96, 338.07, 330.9, 333.78, 343.54], 'YTD': [256.77, 264.62, 282.47, 282.33, 259.51, 287.03, 279.03, 281.97, 283.5, 274.97, 259.88, 256.58, 260.51, 269.36, 286.41, 284.39, 294.4, 305.75, 315.39, 310.87, 306.25, 308.53, 313.67, 314.08, 329.89, 343.54], '6M': [264.78, 263.15, 273.7, 277.44, 262.34, 273.22, 283.73, 278.31, 282.27, 277.7, 264.31, 261.37, 264.14, 265.32, 280.74, 284.56, 289.82, 296.57, 315.39, 313.7, 302.64, 312.65, 313.39, 314.08, 329.89, 343.54], '1Y': [232.21, 245.74, 253.91, 260.7, 272.13, 264.18, 263.43, 273.04, 258.76, 266.47, 265.44, 263.19, 260.45, 261.43, 258.41, 246.04, 244.84, 260, 255.91, 259.66, 250.89, 242.52, 258.82, 257.91, 261.74, 262.41, 264.78, 263.15, 273.7, 277.44, 262.34, 273.22, 283.73, 279.27, 280.76, 279.91, 264.31, 261.37, 264.14, 265.32, 280.74, 284.56, 289.82, 296.57, 315.39, 310.87, 302.64, 312.65, 313.39, 314.08, 329.89, 343.54] },
      velocityScore: { '1D': 0, '1W': 12.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 32.5, revenueGrowth: 7, eps: 10.58, grossMargin: 30, dividendYield: 0.61,
      etfPresence: { AIRR: 1.81, PRN: false, RSHO: 6.04, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 2, avgWeight: 2.83, proScore: 1.13, coverage: 0.4,
      price: 273.14, weeklyPrices: [277.66, 280.36, 275.13, 276.06, 273.14], weeklyChange: -1.63, dayChange: -1.06, sortRank: 0, periodReturns: { '1M': 4.3, 'YTD': 33.2, '6M': 28.7, '1Y': 54.4 },
      priceHistory: { '1D': [276.06, 276.9, 277.38, 278.55, 281.11, 280.15, 278.2, 277.74, 275.69, 274.94, 274.05, 273.82, 273.9, 273.48, 273.43, 273.52, 273.35, 273.69, 272.77, 271.95, 271.25, 271.29, 270.66, 273.14], '1W': [277.66, 280.36, 275.13, 276.06, 273.14], '1M': [261.89, 258.02, 259.89, 258.25, 255.52, 250.72, 248.63, 249.33, 251.9, 246.55, 249.49, 264.6, 264.67, 270.44, 277.42, 283.23, 277.66, 280.36, 275.13, 276.06, 273.14], 'YTD': [205.02, 210.02, 224.26, 217.7, 208.93, 209.63, 244.79, 258.1, 260.31, 252.39, 243.82, 232.94, 230.51, 239.04, 254.06, 247.6, 246.16, 243.04, 256.43, 273.1, 261.21, 259.89, 249.33, 249.49, 283.23, 273.14], '6M': [211.22, 212.92, 220.15, 220.36, 215.53, 213.49, 224.47, 252.55, 260.95, 258.84, 253.91, 240.24, 239.51, 230.46, 250, 254.04, 240.88, 236.52, 256.43, 269.76, 253.12, 258.02, 248.63, 249.49, 283.23, 273.14], '1Y': [176.85, 181.06, 179.68, 190.49, 189.52, 184.26, 181.58, 175.99, 173.25, 176.16, 178.2, 185.77, 190.23, 193.15, 189.25, 184.09, 191.68, 200.1, 201.77, 205.72, 201.3, 197.92, 204.59, 190.98, 198.31, 203.49, 211.22, 212.92, 220.15, 220.36, 215.53, 213.49, 224.47, 249.35, 259.64, 260.09, 253.91, 240.24, 239.51, 230.46, 250, 254.04, 240.88, 236.52, 256.43, 273.1, 253.12, 258.02, 248.63, 249.49, 283.23, 273.14] },
      velocityScore: { '1D': 0.9, '1W': -0.9, '1M': -51.3, '6M': null }, isNew: false,
      marketCap: '$109B', pe: 63.4, revenueGrowth: 19, eps: 4.31, grossMargin: 35, dividendYield: 0.17,
      etfPresence: { AIRR: false, PRN: 3.35, RSHO: false, IDEF: 2.31, BILT: false },
      tonyNote: 'Howmet Aerospace is an aerospace structures and engine components manufacturer. It appears in Industrials ETFs for its aerospace and defense exposure — commercial air travel recovery and defense spending growth are the two demand drivers. Revenue grew and margins are expanding as Howmet prices power over OEM customers.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 2.81, proScore: 1.12, coverage: 0.4,
      price: 244.56, weeklyPrices: [242.97, 246.41, 236.07, 237.22, 244.56], weeklyChange: 0.65, dayChange: 3.09, sortRank: 0, periodReturns: { '1M': 11.6, 'YTD': 22.2, '6M': 17.3, '1Y': 46.9 },
      priceHistory: { '1D': [237.22, 242.1, 245.69, 246.3, 248.42, 250, 246.38, 244.79, 244.59, 243.3, 245.51, 244.82, 244.84, 245.66, 245.61, 244.29, 243.46, 243.69, 242.46, 242.75, 243.24, 243.04, 244.74, 244.56], '1W': [242.97, 246.41, 236.07, 237.22, 244.56], '1M': [219.08, 215.34, 213.82, 216.66, 220.92, 230.08, 234.08, 236.14, 227.8, 229.95, 223.63, 233.49, 230.05, 237.06, 234.8, 235.29, 242.97, 246.41, 236.07, 237.22, 244.56], 'YTD': [200.06, 207.44, 213.61, 217.13, 211.84, 218.02, 230.92, 242.29, 231.59, 211.9, 202.65, 202.36, 200.45, 203.16, 215.54, 215.27, 223.96, 218.91, 212.74, 203.79, 205.55, 213.82, 236.14, 223.63, 235.29, 244.56], '6M': [208.48, 205.44, 208.56, 217.9, 215.68, 215.43, 231.2, 241.6, 243.04, 219.58, 210.96, 204.62, 200.67, 199.94, 212.22, 219.99, 220.62, 211.36, 212.74, 198.99, 195.79, 215.34, 234.08, 223.63, 235.29, 244.56], '1Y': [166.5, 173.03, 172.12, 177.85, 180.82, 196.36, 204.31, 186.56, 186.28, 191.13, 187.81, 186.32, 188.04, 182.95, 189.83, 184.77, 182.92, 190.4, 198.85, 217.63, 212.04, 199.31, 215.04, 208.67, 219.94, 203.17, 208.48, 205.44, 208.56, 217.9, 215.68, 215.43, 231.2, 241.58, 226.66, 222.07, 210.96, 204.62, 200.67, 199.94, 212.22, 219.99, 220.62, 211.36, 212.74, 203.79, 195.79, 215.34, 234.08, 223.63, 235.29, 244.56] },
      velocityScore: { '1D': -0.9, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 46.9, revenueGrowth: 17, eps: 5.22, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.66, PRN: false, RSHO: 3.96, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 2, avgWeight: 2.52, proScore: 1.01, coverage: 0.4,
      price: 204.77, weeklyPrices: [205.40, 210.00, 209.89, 205.65, 204.77], weeklyChange: -0.31, dayChange: -0.43, sortRank: 0, periodReturns: { '1M': 0.2, 'YTD': 18.5, '6M': 15.6, '1Y': 44.3 },
      priceHistory: { '1D': [205.65, 208.27, 208.36, 208.32, 211, 209.03, 206.28, 206.14, 205.21, 204.42, 205.71, 205.18, 204.75, 205.21, 205.28, 205, 204.87, 205.65, 204.95, 204.02, 203.71, 203.57, 204.38, 204.77], '1W': [205.4, 210, 209.89, 205.65, 204.77], '1M': [204.38, 198.95, 199.27, 195.88, 188.39, 187.26, 184.72, 190.76, 185.95, 187.46, 183, 194.68, 193.45, 193.94, 196.93, 203.07, 205.4, 210, 209.89, 205.65, 204.77], 'YTD': [172.84, 193.2, 213.25, 206.33, 210.18, 187.42, 196.9, 206.44, 207.24, 195.5, 197.82, 210.12, 205.09, 212.81, 230.29, 230.8, 225.51, 216.39, 215.2, 206.83, 202.66, 199.27, 190.76, 183, 203.07, 204.77], '6M': [175.88, 189.02, 206.62, 206.07, 212.4, 210.88, 199.83, 201.09, 204.23, 205.83, 195.91, 207.48, 204.76, 204.49, 231.78, 238.42, 219.1, 208.08, 215.2, 206.83, 197.33, 198.95, 184.72, 183, 203.07, 204.77], '1Y': [141.87, 142.91, 137.06, 142.95, 147.96, 149.5, 179.53, 174.7, 165.34, 165.83, 163.64, 168.33, 174.5, 180.62, 186.64, 190.08, 209.01, 199.92, 213.8, 193.93, 177.88, 175.28, 178.88, 177.87, 175.03, 176.43, 175.88, 189.02, 206.62, 206.07, 212.4, 210.88, 199.83, 202.25, 208.27, 205.57, 195.91, 207.48, 204.76, 204.49, 231.78, 238.42, 219.1, 208.08, 215.2, 206.83, 197.33, 198.95, 184.72, 183, 203.07, 204.77] },
      velocityScore: { '1D': -1.9, '1W': 3.1, '1M': -56.7, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 54.8, revenueGrowth: 26, eps: 3.74, grossMargin: 23, dividendYield: 0.51,
      etfPresence: { AIRR: 3.2, PRN: false, RSHO: false, IDEF: 1.84, BILT: false },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 2, avgWeight: 1.77, proScore: 0.71, coverage: 0.4,
      price: 279.09, weeklyPrices: [285.43, 278.19, 283.48, 279.62, 279.09], weeklyChange: -2.22, dayChange: -0.19, sortRank: 0, periodReturns: { '1M': -13, 'YTD': -17.9, '6M': -21.5, '1Y': 16.4 },
      priceHistory: { '1D': [279.62, 282, 282.8, 282.73, 281.82, 281.94, 280, 280.3, 279.33, 277.95, 278.08, 278.1, 278.23, 278.79, 278.55, 278.8, 278.99, 278.88, 279.3, 277.73, 277.45, 277.31, 277.59, 279.09], '1W': [285.43, 278.19, 283.48, 279.62, 279.09], '1M': [320.95, 317.56, 320.9, 308.17, 296.41, 293.66, 287.54, 294.53, 293.04, 292.26, 289.13, 300.95, 297.68, 299.66, 298.51, 296.89, 285.43, 278.19, 283.48, 279.62, 279.09], 'YTD': [340.07, 378.47, 418.86, 424.14, 427.83, 369.38, 406.76, 437.57, 443, 421.17, 414.56, 418.42, 384.79, 393.32, 403.37, 396.17, 370.14, 364.29, 319.54, 334.22, 321.92, 320.9, 294.53, 289.13, 296.89, 279.09], '6M': [351.13, 363.48, 398.25, 415.58, 422.79, 429.64, 399.37, 417.83, 447.73, 440.33, 417.51, 422.94, 402.08, 379.9, 411.35, 398.13, 366.88, 362.17, 319.54, 333.56, 324.6, 317.56, 287.54, 289.13, 296.89, 279.09], '1Y': [239.83, 252.08, 258.18, 254.49, 264.82, 269.83, 266.45, 267.46, 266.48, 275.27, 271.13, 274.71, 275.13, 278.77, 284.24, 282.99, 282.66, 290.09, 319.07, 305.43, 312.67, 301.83, 313.62, 304.58, 326.92, 336.64, 351.13, 363.48, 398.25, 415.58, 422.79, 429.64, 399.37, 424.89, 435.58, 437.03, 417.51, 422.94, 402.08, 379.9, 411.35, 398.13, 366.88, 362.17, 319.54, 334.22, 324.6, 317.56, 287.54, 289.13, 296.89, 279.09] },
      velocityScore: { '1D': -1.4, '1W': -4.1, '1M': -66.4, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 18.1, revenueGrowth: 13, eps: 15.38, grossMargin: 12, dividendYield: 1.97,
      etfPresence: { AIRR: 2.49, PRN: false, RSHO: false, IDEF: 1.04, BILT: false },
      tonyNote: 'Huntington Ingalls Industries is the only builder of nuclear-powered aircraft carriers for the U.S. Navy. Revenue is government-contracted and predictable; the ETF allocation in Industrials reflects defense spending growth and the Navy\'s backlog of nuclear submarine and carrier construction. A steady-state quality compounder in a market structure with no competition.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 2, avgWeight: 1.67, proScore: 0.67, coverage: 0.4,
      price: 46.32, weeklyPrices: [54.21, 51.09, 50.80, 47.95, 46.32], weeklyChange: -14.55, dayChange: -3.4, sortRank: 0, periodReturns: { '1M': -18.5, 'YTD': -39, '6M': -42.1, '1Y': 12.1 },
      priceHistory: { '1D': [47.95, 47.23, 46.73, 47.33, 47.58, 47.31, 46.41, 46.94, 46.78, 46.5, 46.89, 46.58, 46.52, 46.78, 46.6, 46.46, 46.42, 46.42, 46.56, 46.39, 46.26, 46.22, 46.33, 46.32], '1W': [54.21, 51.09, 50.8, 47.95, 46.32], '1M': [56.8, 57.3, 65.19, 64.13, 63.49, 63.27, 58.43, 63.4, 58.52, 57.73, 54.82, 58.78, 57.75, 57.02, 56.34, 56.16, 54.21, 51.09, 50.8, 47.95, 46.32], 'YTD': [75.91, 104.04, 124.56, 113.85, 108.16, 85.25, 87.05, 96.08, 92.14, 85.54, 89.46, 92.78, 75.86, 67.7, 68.33, 74.41, 65.52, 63.05, 61.52, 52.49, 55.82, 65.19, 63.4, 54.82, 56.16, 46.32], '6M': [77.7, 89.93, 117.86, 128.68, 118.06, 103.37, 93.48, 91.97, 90.68, 88.95, 88.96, 95.31, 77.49, 70.51, 74.46, 74.66, 68.61, 59.56, 61.52, 57.33, 53.47, 57.3, 58.43, 54.82, 56.16, 46.32], '1Y': [41.33, 44.66, 51.71, 59.12, 59.77, 56.71, 59.08, 69.12, 64.78, 68.51, 64.81, 69.2, 80.77, 86.28, 96.19, 94.63, 88.62, 89.32, 88.3, 72.41, 71.69, 67.31, 76.1, 76.5, 75.96, 75.39, 77.7, 89.93, 117.86, 128.68, 118.06, 103.37, 93.48, 97.21, 88.23, 89.13, 88.96, 95.31, 77.49, 70.51, 74.46, 74.66, 68.61, 59.56, 61.52, 52.49, 53.47, 57.3, 58.43, 54.82, 56.16, 46.32] },
      velocityScore: { '1D': -5.6, '1W': -13, '1M': -67.5, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 272.5, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.38, PRN: false, RSHO: false, IDEF: 0.95, BILT: false },
      tonyNote: 'Kratos Defense is a defense technology company focused on unmanned systems, satellite communications, and high-performance computing for government customers. It appears in Industrials ETFs as an AI-adjacent defense name — autonomous systems and AI-driven surveillance are direct end markets. Revenue grew and the government contract backlog is expanding.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 1.42, proScore: 0.57, coverage: 0.4,
      price: 77.53, weeklyPrices: [73.12, 74.95, 75.79, 75.87, 77.53], weeklyChange: 6.03, dayChange: 2.19, sortRank: 0, periodReturns: { '1M': 1.6, 'YTD': 29, '6M': 30.4, '1Y': 23.3 },
      priceHistory: { '1D': [75.87, 76.46, 77.12, 77.13, 76.98, 77.11, 77.33, 77.29, 76.86, 76.66, 76.72, 76.92, 76.94, 76.75, 76.89, 77.07, 77.43, 77.57, 77.61, 77.62, 77.37, 77.26, 77.26, 77.53], '1W': [73.12, 74.95, 75.79, 75.87, 77.53], '1M': [76.34, 74.37, 73.13, 71.39, 70.04, 71.31, 71.66, 72.43, 71.96, 71.59, 72.26, 71.62, 72.08, 71.49, 71.48, 71.25, 73.12, 74.95, 75.79, 75.87, 77.53], 'YTD': [60.11, 61.15, 60.29, 63.72, 67.24, 67.42, 71.13, 72.98, 74.77, 74.77, 73.52, 74.06, 74.06, 71.83, 72.82, 70.86, 71.65, 76.31, 73.76, 75.71, 77.88, 73.13, 72.43, 72.26, 71.25, 77.53], '6M': [59.52, 61.16, 59.56, 61.51, 65.48, 68.5, 68.84, 71.96, 73.5, 75.88, 73.84, 73.69, 74.46, 72.78, 73.01, 70.76, 71.1, 73.32, 73.76, 74.73, 79.4, 74.37, 71.66, 72.26, 71.25, 77.53], '1Y': [62.87, 58.64, 58.22, 59.35, 57.82, 60.27, 57.89, 57.34, 57.8, 58, 57.2, 58.81, 60.11, 64.01, 64.48, 62.61, 62.53, 58.93, 57.62, 57.94, 59.59, 58.91, 60.93, 62.81, 59.74, 58.26, 59.52, 61.16, 59.56, 61.51, 65.48, 68.5, 68.84, 72.14, 73.97, 75.77, 73.84, 73.69, 74.46, 72.78, 73.01, 70.76, 71.1, 73.32, 73.76, 75.71, 79.4, 74.37, 71.66, 72.26, 71.25, 77.53] },
      velocityScore: { '1D': 0, '1W': 3.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$95B', pe: 34, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.77,
      etfPresence: { AIRR: false, PRN: false, RSHO: 0.92, IDEF: false, BILT: 1.91 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RBC', name: 'RBC Bearings Incorporated', easyScore: 2, avgWeight: 1.21, proScore: 0.48, coverage: 0.4,
      price: 648.89, weeklyPrices: [639.18, 645.73, 633.44, 638.94, 648.89], weeklyChange: 1.52, dayChange: 1.56, sortRank: 0, periodReturns: { '1M': 11, 'YTD': 44.7, '6M': 41.6, '1Y': 67.4 },
      priceHistory: { '1D': [638.94, 652.32, 653.29, 661.55, 663.02, 666.13, 661.68, 656.96, 653.92, 655.52, 659.11, 657.76, 657.98, 656.84, 654.93, 652.09, 649.41, 649.71, 647.66, 647.89, 647.73, 646.91, 647.9, 648.89], '1W': [639.18, 645.73, 633.44, 638.94, 648.89], '1M': [584.4, 577.42, 577.83, 571.96, 566.14, 578.34, 584.18, 589.76, 590.09, 590.97, 576.74, 607.46, 603.64, 616.95, 621.08, 625.73, 639.18, 645.73, 633.44, 638.94, 648.89], 'YTD': [448.43, 485, 497.06, 504.99, 511.98, 520.16, 550.4, 559.18, 576.5, 566.06, 547.31, 540.83, 548.95, 551.99, 595.11, 571.61, 601.39, 599.09, 623.19, 618.91, 571.05, 577.83, 589.76, 576.74, 625.73, 648.89], '6M': [456.33, 461.21, 488.31, 495.29, 504.54, 516.1, 547.51, 552.93, 571.57, 568.58, 560.28, 544.55, 552.23, 543.12, 580.55, 586.98, 588.74, 584.49, 623.19, 613.1, 565.22, 577.42, 584.18, 576.74, 625.73, 648.89], '1Y': [387.69, 388.59, 378.24, 397.33, 388.37, 399.8, 404.66, 401.92, 390.52, 398.71, 387.48, 375.1, 379.98, 384.82, 373.99, 372.64, 369.71, 407.3, 406.45, 431.93, 431.55, 427.81, 444.97, 443.44, 460.17, 451.06, 456.33, 461.21, 488.31, 495.29, 504.54, 516.1, 547.51, 551.65, 565.44, 570.08, 560.28, 544.55, 552.23, 543.12, 580.55, 586.98, 588.74, 584.49, 623.19, 618.91, 565.22, 577.42, 584.18, 576.74, 625.73, 648.89] },
      velocityScore: { '1D': 0, '1W': 2.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$21B', pe: 71.5, revenueGrowth: 18, eps: 9.07, grossMargin: 45, dividendYield: null,
      etfPresence: { AIRR: 1.88, PRN: false, RSHO: false, IDEF: 0.53, BILT: false },
      tonyNote: 'RBC Bearings Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRCY', name: 'Mercury Systems, Inc.', easyScore: 2, avgWeight: 1.04, proScore: 0.42, coverage: 0.4,
      price: 105.57, weeklyPrices: [113.91, 111.76, 110.87, 105.00, 105.57], weeklyChange: -7.32, dayChange: 0.54, sortRank: 0, periodReturns: { '1M': 6.3, 'YTD': 44.6, '6M': 41.3, '1Y': 105.5 },
      priceHistory: { '1D': [105, 105.17, 105.75, 107.8, 108.7, 108.58, 107, 107.18, 107.11, 107.69, 107.7, 107.46, 107.29, 106.96, 106.97, 106.52, 106.17, 106.3, 106.47, 106.44, 106.02, 105.22, 105.5, 105.57], '1W': [113.91, 111.76, 110.87, 105, 105.57], '1M': [99.32, 97.11, 108.11, 111.7, 111.28, 112.87, 111.59, 117.82, 111.27, 110.94, 106.81, 119.32, 120.3, 115.93, 112.44, 115.5, 113.91, 111.76, 110.87, 105, 105.57], 'YTD': [73.01, 88.74, 102.95, 99.48, 98.29, 79.07, 80.25, 87.63, 89.58, 84.96, 81.44, 77.81, 76.16, 74.75, 79.23, 84.91, 78.91, 78.91, 91.66, 92.5, 94.81, 108.11, 117.82, 106.81, 115.5, 105.57], '6M': [74.22, 81.29, 97.02, 97.1, 101.04, 99.28, 84.36, 83.32, 88.76, 89.43, 86.87, 81.35, 74.49, 72.91, 80.81, 85.51, 82.61, 74.75, 91.66, 92.32, 92.8, 97.11, 111.59, 106.81, 115.5, 105.57], '1Y': [51.36, 51.43, 50.96, 51.69, 52.98, 52.17, 52.62, 66.83, 65.64, 68.5, 68.93, 72.24, 75.77, 76.82, 83.5, 73.58, 77.1, 77.6, 76.8, 75.36, 71.26, 66.12, 69.89, 70.58, 74.49, 69.65, 74.22, 81.29, 97.02, 97.1, 101.04, 99.28, 84.36, 86.66, 89.3, 89.18, 86.87, 81.35, 74.49, 72.91, 80.81, 85.51, 82.61, 74.75, 91.66, 92.5, 92.8, 97.11, 111.59, 106.81, 115.5, 105.57] },
      velocityScore: { '1D': -4.5, '1W': -6.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: null, revenueGrowth: 12, eps: -0.23, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: 1.09, PRN: false, RSHO: false, IDEF: 0.99, BILT: false },
      tonyNote: 'Mercury Systems, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, avgWeight: 0.95, proScore: 0.38, coverage: 0.4,
      price: 46.27, weeklyPrices: [50.37, 47.70, 46.38, 44.84, 46.27], weeklyChange: -8.14, dayChange: 3.19, sortRank: 0, periodReturns: { '1M': -23.7, 'YTD': -36.8, '6M': -42.7, '1Y': -7.4 },
      priceHistory: { '1D': [44.84, 45.27, 45.03, 45.44, 46.45, 46.22, 45.47, 46.38, 46.17, 46.35, 46.49, 46.13, 46.06, 46.38, 46.42, 46.61, 46.28, 46.44, 46.36, 46.24, 45.9, 46.01, 45.8, 46.27], '1W': [50.37, 47.7, 46.38, 44.84, 46.27], '1M': [60.66, 63.52, 65.86, 57.5, 53.65, 54.65, 51.84, 54.39, 49.44, 49.64, 45.87, 49.58, 47.83, 48.27, 51.7, 52.03, 50.37, 47.7, 46.38, 44.84, 46.27], 'YTD': [73.17, 101.28, 109.49, 111.61, 110.93, 89.78, 78.71, 81.62, 88.31, 97.14, 98.98, 105.95, 86.01, 82.69, 84.22, 87.91, 76.6, 67.98, 63.19, 67.28, 65.76, 65.86, 54.39, 45.87, 52.03, 46.27], '6M': [77.55, 83.99, 107.5, 106.28, 113.34, 111.72, 91.25, 75.11, 83.6, 91.11, 102.79, 104.06, 101.84, 80.05, 87.75, 92.73, 82.11, 65.98, 63.19, 62.48, 64.2, 63.52, 51.84, 45.87, 52.03, 46.27], '1Y': [49.99, 45.02, 48.76, 55.74, 50.45, 50.22, 48.21, 50.91, 52.23, 55.45, 62.52, 64.33, 66.12, 68.42, 72.6, 74.71, 76.85, 81.99, 85.6, 74.98, 59.99, 58.96, 67.03, 65.45, 68.44, 71.65, 77.55, 83.99, 107.5, 106.28, 113.34, 111.72, 91.25, 81, 83.44, 98.88, 102.79, 104.06, 101.84, 80.05, 87.75, 92.73, 82.11, 65.98, 63.19, 67.28, 64.2, 63.52, 51.84, 45.87, 52.03, 46.27] },
      velocityScore: { '1D': -5, '1W': -13.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: 201.2, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.73, PRN: false, RSHO: false, IDEF: 0.18, BILT: false },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AIR', name: 'AIRBUS GROUP', easyScore: 2, avgWeight: 0.84, proScore: 0.34, coverage: 0.4,
      price: 138.51, weeklyPrices: [134.88, 134.28, 132.26, 132.94, 138.51], weeklyChange: 2.69, dayChange: 4.19, sortRank: 0, periodReturns: { '1M': 22.9, 'YTD': 67.3, '6M': 61, '1Y': 102 },
      priceHistory: { '1D': [132.94, 136.68, 138.88, 138.86, 140.2, 140.41, 140.24, 139.45, 138.66, 138.57, 138.45, 138.57, 138.23, 138.68, 138.53, 138, 138.07, 137.85, 137.52, 136.64, 136.79, 137.2, 137.65, 138.51], '1W': [134.88, 134.28, 132.26, 132.94, 138.51], '1M': [112.74, 112.82, 114.97, 112.62, 109.99, 110.61, 111.36, 115.53, 116.65, 114.72, 117.36, 127.23, 129.01, 131.18, 129.96, 132.14, 134.88, 134.28, 132.26, 132.94, 138.51], 'YTD': [82.79, 94.73, 105.74, 107.74, 106.67, 106.87, 113.22, 116.97, 118.17, 110.71, 103.78, 109.21, 110.82, 111.37, 123.04, 118.51, 112.08, 110.37, 118.71, 107.47, 107.51, 114.97, 115.53, 117.36, 132.14, 138.51], '6M': [85.07, 88.02, 98.23, 103.67, 105.47, 109.89, 113.11, 113.54, 118.26, 116.84, 108.3, 108.76, 107.81, 109.46, 120.78, 122.75, 111.5, 105.69, 118.71, 111.51, 100.89, 112.82, 111.36, 117.36, 132.14, 138.51], '1Y': [68.58, 71.46, 74.84, 83.64, 76.48, 72.99, 72.06, 77.15, 71.73, 75.81, 75.3, 74.19, 75.3, 86.34, 81.8, 78.32, 82.86, 85.69, 84.22, 82.25, 80.08, 77.35, 83.21, 82.7, 83.68, 82.71, 85.07, 88.02, 98.23, 103.67, 105.47, 109.89, 113.11, 114.63, 117.06, 118.61, 108.3, 108.76, 107.81, 109.46, 120.78, 122.75, 111.5, 105.69, 118.71, 107.47, 100.89, 112.82, 111.36, 117.36, 132.14, 138.51] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$6B', pe: 30.4, revenueGrowth: 25, eps: 4.55, grossMargin: 19, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 1.52, BILT: false },
      tonyNote: 'AIRBUS GROUP appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DRS', name: 'Leonardo DRS, Inc.', easyScore: 2, avgWeight: 0.56, proScore: 0.23, coverage: 0.4,
      price: 44.36, weeklyPrices: [46.08, 44.99, 45.74, 44.69, 44.36], weeklyChange: -3.73, dayChange: -0.74, sortRank: 0, periodReturns: { '1M': -3.1, 'YTD': 30.1, '6M': 28.5, '1Y': -0.5 },
      priceHistory: { '1D': [44.69, 44.83, 45.21, 45.23, 45.31, 44.93, 44.51, 44.69, 44.42, 44.38, 44.62, 44.77, 44.69, 44.62, 44.69, 44.64, 44.69, 44.67, 44.55, 44.46, 44.44, 44.25, 44.26, 44.36], '1W': [46.08, 44.99, 45.74, 44.69, 44.36], '1M': [45.8, 45.35, 48.41, 48.76, 47.96, 47.39, 45.61, 46.71, 46.15, 46.55, 46.11, 49.69, 48.53, 46.68, 45.59, 46.58, 46.08, 44.99, 45.74, 44.69, 44.36], 'YTD': [34.09, 38.84, 42.26, 41.28, 41.3, 37.27, 37.77, 40.03, 43.34, 45.82, 45.91, 45.48, 46.53, 45.86, 47.1, 44.94, 41.41, 40.63, 41.79, 42.5, 44.56, 48.41, 46.71, 46.11, 46.58, 44.36], '6M': [34.28, 37.01, 41.27, 42.07, 42.16, 41.51, 39.48, 39.13, 43.82, 45.51, 46.35, 45.6, 44.06, 44.52, 47.93, 46.29, 42.07, 39.47, 41.79, 42.87, 42.81, 45.35, 45.61, 46.11, 46.58, 44.36], '1Y': [44.6, 46.41, 47.57, 48.13, 48.44, 41.67, 41.25, 41.74, 41.04, 42.47, 41.2, 42.07, 41.44, 43.94, 44.39, 43.23, 39.6, 40.53, 36.05, 35.31, 34.53, 33.08, 34.17, 33.9, 34.46, 33.64, 34.28, 37.01, 41.27, 42.07, 42.16, 41.51, 39.48, 39.9, 42.36, 46.95, 46.35, 45.6, 44.06, 44.52, 47.93, 46.29, 42.07, 39.47, 41.79, 42.5, 42.81, 45.35, 45.61, 46.11, 46.58, 44.36] },
      velocityScore: { '1D': 0, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 41.5, revenueGrowth: 6, eps: 1.07, grossMargin: 24, dividendYield: 0.81,
      etfPresence: { AIRR: 0.82, PRN: false, RSHO: false, IDEF: 0.31, BILT: false },
      tonyNote: 'Leonardo DRS, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TPC', name: 'Tutor Perini Corporation', easyScore: 2, avgWeight: 0.38, proScore: 0.15, coverage: 0.4,
      price: 81.56, weeklyPrices: [77.99, 81.50, 81.00, 82.36, 81.56], weeklyChange: 4.58, dayChange: -0.97, sortRank: 0, periodReturns: { '1M': 9.2, 'YTD': 21.7, '6M': 18.3, '1Y': 77.7 },
      priceHistory: { '1D': [82.36, 84.74, 83.18, 83.58, 84.78, 84.44, 83.6, 82.65, 82.63, 82.22, 82.42, 81.67, 81.74, 81.36, 81.32, 81.2, 81.33, 81.39, 81.45, 81.1, 80.99, 80.71, 80.83, 81.56], '1W': [77.99, 81.5, 81, 82.36, 81.56], '1M': [74.67, 74.47, 73.27, 71.49, 74.26, 74.29, 72.26, 72.38, 70.53, 72.13, 68.72, 73.61, 74.92, 76.55, 76.19, 77.89, 77.99, 81.5, 81, 82.36, 81.56], 'YTD': [67.02, 70.17, 75.17, 76.79, 79.86, 79.95, 81.73, 86.9, 89.38, 71.12, 69.2, 72.31, 76.24, 78.71, 81.5, 84.39, 86.48, 92.92, 96.98, 80.64, 76.99, 73.27, 72.38, 68.72, 77.89, 81.56], '6M': [69.06, 71.79, 74.25, 74.13, 78.53, 82.33, 86, 82.24, 85.87, 69.95, 71.29, 71.44, 75.25, 77.19, 80.54, 86.25, 84.19, 86.04, 96.98, 82.69, 74.91, 74.47, 72.26, 68.72, 77.89, 81.56], '1Y': [45.89, 48.18, 48.98, 50.08, 47.91, 45.65, 55.07, 57.25, 57.02, 59.93, 62.63, 63.96, 65.48, 64.67, 62.41, 60.61, 64.19, 67.67, 67.69, 67.4, 59.64, 59.75, 68.55, 67.82, 67.34, 69.99, 69.06, 71.79, 74.25, 74.13, 78.53, 82.33, 86, 81.1, 86.1, 73.71, 71.29, 71.44, 75.25, 77.19, 80.54, 86.25, 84.19, 86.04, 96.98, 80.64, 74.91, 74.47, 72.26, 68.72, 77.89, 81.56] },
      velocityScore: { '1D': 0, '1W': 7.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 55.9, revenueGrowth: 12, eps: 1.46, grossMargin: 12, dividendYield: 0.29,
      etfPresence: { AIRR: 0.72, PRN: false, RSHO: false, IDEF: 0.04, BILT: false },
      tonyNote: 'Tutor Perini Corporation appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TKR', name: 'TIMKEN CO/THE', easyScore: 1, avgWeight: 8.69, proScore: 1.74, coverage: 0.2,
      price: 144.01, weeklyPrices: [142.36, 141.97, 137.64, 137.99, 144.01], weeklyChange: 1.16, dayChange: 4.36, sortRank: 0, periodReturns: { '1M': 13, 'YTD': 71.2, '6M': 67.4, '1Y': 94.5 },
      priceHistory: { '1D': [137.99, 142.08, 143.57, 144.32, 145.29, 145.29, 143.49, 143.02, 142, 143.02, 144.02, 143.43, 143.49, 143.46, 143.25, 142.56, 142.21, 142.83, 142.01, 141.85, 141.78, 142.34, 142.77, 144.01], '1W': [142.36, 141.97, 137.64, 137.99, 144.01], '1M': [127.42, 127.16, 126.78, 127.98, 126.54, 131.9, 131.82, 133.66, 131.83, 134.67, 132.39, 137.4, 137.06, 139.12, 140.28, 139.4, 142.36, 141.97, 137.64, 137.99, 144.01], 'YTD': [84.13, 90.6, 93.73, 94.6, 94.15, 102.15, 107.35, 108.16, 109.88, 103.05, 99.7, 97.44, 99.06, 102.06, 106.92, 103.92, 108.7, 110.89, 119.7, 115.74, 117.2, 126.78, 133.66, 132.39, 139.4, 144.01], '6M': [86.52, 88.34, 90.83, 90.65, 93.89, 96.14, 109.41, 105.54, 109.52, 106.58, 102.18, 98.59, 101.03, 100.57, 105.88, 103.73, 106.79, 106.53, 119.7, 117.12, 109.36, 127.16, 131.82, 132.39, 139.4, 144.01], '1Y': [74.03, 76.67, 78.07, 79.16, 81.66, 73.5, 73.91, 77.08, 75.32, 78.21, 77.78, 77.51, 77.5, 75.55, 76.54, 70.79, 74.04, 77.71, 78.68, 77.95, 77.85, 74.55, 81.39, 83.21, 87.38, 85.26, 86.52, 88.34, 90.83, 90.65, 93.89, 96.14, 109.41, 107.23, 107.69, 105.59, 102.18, 98.59, 101.03, 100.57, 105.88, 103.73, 106.79, 106.53, 119.7, 115.74, 109.36, 127.16, 131.82, 132.39, 139.4, 144.01] },
      velocityScore: { '1D': 0, '1W': -5.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 32.7, revenueGrowth: 8, eps: 4.4, grossMargin: 31, dividendYield: 1.04,
      etfPresence: { AIRR: false, PRN: false, RSHO: 8.69, IDEF: false, BILT: false },
      tonyNote: 'TIMKEN CO/THE appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RTX', name: 'RTX CORP', easyScore: 1, avgWeight: 8.34, proScore: 1.67, coverage: 0.2,
      price: 186.59, weeklyPrices: [185.60, 181.83, 186.39, 185.06, 186.59], weeklyChange: 0.53, dayChange: 0.83, sortRank: 0, periodReturns: { '1M': 4.3, 'YTD': 1.7, '6M': 0.1, '1Y': 30.8 },
      priceHistory: { '1D': [185.06, 187.67, 189.11, 189.19, 189.41, 188.81, 187.62, 187.91, 187.03, 186.55, 186.82, 186.27, 185.82, 185.82, 185.82, 185.98, 185.86, 186.06, 186.04, 185.73, 185.99, 185.86, 186.12, 186.59], '1W': [185.6, 181.83, 186.39, 185.06, 186.59], '1M': [178.97, 176.59, 178.96, 179.66, 174.41, 174.26, 172.55, 179.41, 180.99, 178.66, 177.41, 184.21, 183.53, 183.64, 186.77, 192.58, 185.6, 181.83, 186.39, 185.06, 186.59], 'YTD': [183.4, 187.17, 199.83, 196.34, 199.88, 195.97, 201.14, 204.92, 197.63, 203.86, 203.04, 200.73, 192.85, 194.72, 203.19, 195.85, 179.3, 176.07, 176.74, 178.11, 174.85, 178.96, 179.41, 177.41, 192.58, 186.59], '6M': [185.17, 188.26, 193.85, 196.36, 201.28, 203.5, 195.19, 203.5, 198.46, 206.52, 207, 203.33, 194, 192.9, 203.48, 198.39, 180.91, 172.79, 176.74, 178.89, 174.49, 176.59, 172.55, 177.41, 192.58, 186.59], '1Y': [142.67, 145.75, 146.87, 151.5, 156.88, 156.81, 155.76, 155.08, 156.32, 160.66, 157.52, 155.85, 158.24, 163.35, 166.58, 157.7, 157.05, 179.44, 177.42, 175.1, 173.96, 172.73, 174.91, 171.1, 178.66, 182.01, 185.17, 188.26, 193.85, 196.36, 201.28, 203.5, 195.19, 204.81, 195.98, 208.82, 207, 203.33, 194, 192.9, 203.48, 198.39, 180.91, 172.79, 176.74, 178.11, 174.49, 176.59, 172.55, 177.41, 192.58, 186.59] },
      velocityScore: { '1D': 0.6, '1W': 1.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$251B', pe: 35, revenueGrowth: 9, eps: 5.33, grossMargin: 20, dividendYield: 1.5,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 8.34, BILT: false },
      tonyNote: 'RTX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 5.4, proScore: 5.4, coverage: 1,
      price: 256.63, weeklyPrices: [286.69, 283.61, 275.25, 259.66, 256.63], weeklyChange: -10.49, dayChange: -1.17, sortRank: 0, periodReturns: { '1M': 23.3, 'YTD': 206.6, '6M': 181.6, '1Y': 387.9 },
      priceHistory: { '1D': [259.66, 265.21, 256.47, 258.67, 260.96, 262.11, 255.57, 256.32, 257.78, 256.5, 260.12, 257.29, 258.24, 257.79, 257.73, 256.17, 257.39, 257.79, 256.73, 257.43, 254.57, 254.85, 256.32, 256.63], '1W': [286.69, 283.61, 275.25, 259.66, 256.63], '1M': [208.06, 208.37, 226.34, 231.09, 264.51, 260.58, 251.68, 259.67, 227.81, 218, 211.69, 222.24, 232.36, 260.07, 265.1, 280.91, 286.69, 283.61, 275.25, 259.66, 256.63], 'YTD': [83.71, 97.3, 103.89, 96.85, 94.91, 73.87, 89.73, 97.92, 104.88, 95.65, 108.04, 121.52, 105.97, 101.95, 136.33, 165.34, 157.08, 138.23, 195.09, 207.27, 191.82, 226.34, 259.67, 211.69, 280.91, 256.63], '6M': [87.59, 92.83, 107.33, 99.29, 97.87, 89.95, 91.79, 97.52, 102.58, 86.8, 96.43, 116.33, 114.91, 103.76, 125, 166.77, 156.14, 141.19, 195.09, 179.11, 197.73, 208.37, 251.68, 211.69, 280.91, 256.63], '1Y': [52.6, 50.25, 44.3, 52.79, 51.37, 52, 65.31, 68.46, 66.18, 72.04, 65.47, 90.41, 99.31, 107.7, 127.98, 129.58, 123.04, 106.16, 124.18, 109.44, 88.63, 84.64, 94.87, 98.04, 87.69, 89.46, 87.59, 92.83, 107.33, 99.29, 97.87, 89.95, 91.79, 101.8, 106.12, 97.78, 96.43, 116.33, 114.91, 103.76, 125, 166.77, 156.14, 141.19, 195.09, 207.27, 197.73, 208.37, 251.68, 211.69, 280.91, 256.63] },
      velocityScore: { '1D': -1.3, '1W': 8.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$65B', pe: 98.7, revenueGrowth: 684, eps: 2.6, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 3.78, MEME: 6.88, RKNG: 5.53 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 3, avgWeight: 3.94, proScore: 3.94, coverage: 1,
      price: 47.74, weeklyPrices: [59.96, 56.87, 54.72, 50.30, 47.74], weeklyChange: -20.38, dayChange: -5.04, sortRank: 0, periodReturns: { '1M': -20.1, 'YTD': 26.4, '6M': 13.7, '1Y': 264.1 },
      priceHistory: { '1D': [50.27, 49.46, 47.84, 48.24, 49.13, 49.3, 48.16, 48.36, 48.46, 48.41, 49.1, 48.6, 48.19, 48.2, 48.23, 48.4, 48.55, 48.28, 47.76, 47.71, 47.45, 47.47, 47.51, 47.74], '1W': [59.96, 56.87, 54.72, 50.3, 47.74], '1M': [59.78, 67.84, 64.05, 63.54, 65.33, 66.6, 65.48, 61.86, 54.35, 59.19, 51.52, 56.71, 59.77, 60.85, 59.18, 58.11, 59.96, 56.87, 54.72, 50.3, 47.74], 'YTD': [37.77, 45.68, 51.89, 52.26, 59.84, 39.79, 40.03, 39.98, 44.24, 40.13, 41.37, 41.66, 37.45, 34.09, 37.06, 47.7, 52.02, 45.51, 60.98, 55.17, 52.71, 64.05, 61.86, 51.52, 58.11, 47.74], '6M': [40.3, 48.24, 50.33, 54.26, 59.99, 54.39, 42.93, 40.97, 45.45, 38.85, 38.12, 42.96, 41.12, 34.28, 36.83, 48.82, 48.39, 42.86, 60.98, 56.56, 47.74, 67.84, 65.48, 51.52, 58.11, 47.74], '1Y': [13.11, 16.82, 16.23, 17.94, 17.72, 15.4, 18.57, 19.08, 19.59, 23.04, 26.15, 33.96, 38.64, 41.86, 50.46, 59.77, 61.83, 55.86, 58.22, 66.96, 48.65, 43.47, 47.81, 44.71, 40.13, 39.92, 40.3, 48.24, 50.33, 54.26, 59.99, 54.39, 42.93, 42.08, 44.03, 43.84, 38.12, 42.96, 41.12, 34.28, 36.83, 48.82, 48.39, 42.86, 60.98, 55.17, 47.74, 67.84, 65.48, 51.52, 58.11, 47.74] },
      velocityScore: { '1D': -3.7, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$17B', pe: 62, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 2.97, MEME: 5.84, RKNG: 3 },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 3, avgWeight: 3.84, proScore: 3.84, coverage: 1,
      price: 40.95, weeklyPrices: [46.59, 45.20, 45.27, 41.98, 40.95], weeklyChange: -12.11, dayChange: -2.44, sortRank: 0, periodReturns: { '1M': -9.3, 'YTD': 67, '6M': 59.2, '1Y': 287.8 },
      priceHistory: { '1D': [41.98, 41.37, 40.6, 40.83, 41.36, 41.42, 40.38, 40.49, 40.47, 40.32, 40.95, 40.72, 40.69, 40.62, 40.61, 40.55, 40.7, 40.56, 40.15, 40.15, 40.02, 40.14, 40.4, 40.95], '1W': [46.59, 45.2, 45.27, 41.98, 40.95], '1M': [45.14, 48.98, 49.65, 47.28, 47.94, 47.86, 44.71, 44.15, 39.62, 40.94, 38.92, 41.47, 42.7, 46.47, 46.27, 45.57, 46.59, 45.2, 45.27, 41.98, 40.95], 'YTD': [24.52, 31.94, 35.22, 34.74, 38.07, 27.84, 36.17, 29.04, 28.65, 28.09, 27.48, 26.7, 25.72, 24.49, 25.57, 30.09, 36.35, 34.25, 44.24, 45.48, 39.52, 49.65, 44.15, 38.92, 45.57, 40.95], '6M': [24.05, 30.2, 38.21, 35.46, 41.35, 36.7, 37.47, 33.56, 30.66, 26.15, 27.4, 27.51, 26.79, 23.74, 27.79, 30.81, 32.43, 32.69, 44.24, 43.93, 36.62, 48.98, 44.71, 38.92, 45.57, 40.95], '1Y': [10.56, 10.45, 9.18, 11.93, 10.75, 12.52, 14.24, 14.55, 15.77, 16.6, 13.89, 18.68, 20.48, 21.71, 26.53, 33.99, 36.64, 33.38, 33.95, 31.08, 23.06, 21.37, 27.1, 31.22, 27.86, 27.85, 24.05, 30.2, 38.21, 35.46, 41.35, 36.7, 37.47, 31.91, 29.08, 28.65, 27.4, 27.51, 26.79, 23.74, 27.79, 30.81, 32.43, 32.69, 44.24, 45.48, 36.62, 48.98, 44.71, 38.92, 45.57, 40.95] },
      velocityScore: { '1D': -6.3, '1W': -3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.05, MEME: 5.81, RKNG: 3.65 },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 3, avgWeight: 3.35, proScore: 3.35, coverage: 1,
      price: 65.62, weeklyPrices: [80.66, 73.19, 72.87, 68.01, 65.62], weeklyChange: -18.65, dayChange: -3.51, sortRank: 0, periodReturns: { '1M': -45.2, 'YTD': -9.7, '6M': -15.9, '1Y': 29.6 },
      priceHistory: { '1D': [68.01, 65.63, 64.26, 65.14, 65.72, 65.73, 64.21, 64.62, 64.5, 64.31, 65.58, 65.21, 65.43, 66.52, 66.25, 65.63, 65.82, 65.85, 65.81, 66.27, 66.16, 66.23, 65.68, 65.62], '1W': [80.66, 73.19, 72.87, 68.01, 65.62], '1M': [119.7, 129.6, 133.09, 113.41, 105.65, 118.17, 107.73, 107.29, 93.6, 92.06, 87.32, 97.56, 82.41, 87.57, 82.25, 85.43, 80.66, 73.19, 72.87, 68.01, 65.62], 'YTD': [72.63, 90.56, 101.25, 116.37, 122.09, 93.27, 82.22, 80.2, 85.76, 93.86, 87.09, 94.09, 87.86, 83.99, 91.61, 90.94, 78.75, 73.9, 70.68, 74.81, 89.58, 133.09, 107.29, 87.32, 85.43, 65.62], '6M': [71.95, 90.92, 98.39, 112.44, 111.34, 115.76, 96.27, 83.03, 85.82, 92.68, 87.53, 95.7, 86.98, 82.87, 96.46, 86.91, 84.66, 69.85, 70.68, 72.96, 88.1, 129.6, 107.73, 87.32, 85.43, 65.62], '1Y': [50.62, 45.6, 45.58, 57.98, 54.33, 52.46, 47.71, 48.5, 44.98, 48.95, 42.41, 38.72, 45.1, 49.09, 67.76, 82.03, 89.5, 71.72, 76.68, 65.28, 61.44, 50.7, 56.2, 73.92, 76.7, 75.84, 71.95, 90.92, 98.39, 112.44, 111.34, 115.76, 96.27, 84.43, 82.36, 104.89, 87.53, 95.7, 86.98, 82.87, 96.46, 86.91, 84.66, 69.85, 70.68, 74.81, 88.1, 129.6, 107.73, 87.32, 85.43, 65.62] },
      velocityScore: { '1D': -9.2, '1W': -9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$25B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.22, MEME: 5.97, RKNG: 1.87 },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 6.95, proScore: 4.63, coverage: 0.667,
      price: 2335, weeklyPrices: [2184.75, 2273.73, 1963.60, 1914.46, 2335.00], weeklyChange: 6.88, dayChange: 21.53, sortRank: 0, periodReturns: { '1M': 46.9, 'YTD': 883.7, '6M': 833.7, '1Y': 4822 },
      priceHistory: { '1D': [1921.41, 2236, 2135, 2138.13, 2185, 2210.93, 2188, 2200, 2219, 2219.2, 2254.62, 2259, 2269.22, 2275.45, 2272.94, 2293.29, 2298.75, 2304.14, 2302.98, 2302.01, 2278.4, 2313.48, 2301.64, 2335], '1W': [2184.75, 2273.73, 1963.6, 1914.46, 2335], '1M': [1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335], 'YTD': [237.38, 334.54, 409.24, 503.44, 539.3, 576.2, 630.29, 649.97, 651.9, 565.59, 618.82, 772.09, 603.17, 692.73, 851.57, 919.47, 932.43, 1096.51, 1409.98, 1447.23, 1392.56, 1641.64, 1759.68, 1643.23, 1958.8, 2335], '6M': [250.05, 274.08, 389.27, 453.12, 481.43, 695.51, 541.64, 590.59, 638.52, 565.41, 618.89, 720.17, 702.48, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1452.02, 1383.29, 1589.94, 1831.5, 1643.23, 1958.8, 2335], '1Y': [47.44, 46.41, 46.09, 42.19, 42.48, 41.33, 40.69, 46.68, 45.5, 50.87, 68.55, 86.13, 102.21, 97.12, 128.41, 116.91, 144.27, 167.05, 195.82, 207.69, 243.57, 195.96, 223.28, 228.47, 206.18, 237.61, 250.05, 274.08, 389.27, 453.12, 481.43, 695.51, 541.64, 600.4, 632.38, 599.06, 618.89, 720.17, 702.48, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1447.23, 1383.29, 1589.94, 1831.5, 1643.23, 1958.8, 2335] },
      velocityScore: { '1D': 2.9, '1W': 7.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$346B', pe: 79.7, revenueGrowth: 251, eps: 29.29, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.3, RKNG: 7.59 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 6.13, proScore: 4.08, coverage: 0.667,
      price: 309.18, weeklyPrices: [328.91, 345.85, 321.98, 326.19, 309.18], weeklyChange: -6, dayChange: -5.21, sortRank: 0, periodReturns: { '1M': 2.2, 'YTD': 255.8, '6M': 236.5, '1Y': 1284.6 },
      priceHistory: { '1D': [326.19, 337.5, 325.15, 320.01, 324.84, 323.46, 311.59, 308.18, 308.05, 305.3, 311.5, 308.61, 308.65, 306.57, 304.1, 302.2, 303.42, 301.91, 302.97, 305.48, 300.73, 301.45, 305.14, 309.18], '1W': [328.91, 345.85, 321.98, 326.19, 309.18], '1M': [302.4, 293.8, 290.01, 285, 273.51, 302.85, 287.32, 291.37, 263.61, 253.57, 234.23, 248.88, 260.22, 274.5, 280.88, 284.99, 328.91, 345.85, 321.98, 326.19, 309.18], 'YTD': [86.89, 121.84, 139.17, 145.63, 156.51, 136.6, 139.03, 147.55, 168.57, 159.99, 157.17, 166.69, 133.52, 132.45, 160.13, 210.06, 237.57, 283.36, 285.47, 289.76, 282.31, 290.01, 291.37, 234.23, 284.99, 309.18], '6M': [90.18, 103.87, 136.87, 151.75, 152.31, 168.89, 148.7, 145.32, 166.2, 153.02, 154, 160.05, 145.88, 135.49, 146.78, 213.84, 229.75, 287.97, 285.47, 280.69, 261.34, 293.8, 287.32, 234.23, 284.99, 309.18], '1Y': [22.33, 24.24, 25.4, 24.99, 34.34, 36.72, 36.8, 45.11, 44.83, 54.8, 57.07, 67.26, 84.93, 70.32, 90.29, 86.87, 115.09, 101.42, 127.85, 136.86, 103.55, 93.38, 109.24, 119.18, 94.98, 88.82, 90.18, 103.87, 136.87, 151.75, 152.31, 168.89, 148.7, 157.27, 174.77, 164.78, 154, 160.05, 145.88, 135.49, 146.78, 213.84, 229.75, 287.97, 285.47, 289.76, 261.34, 293.8, 287.32, 234.23, 284.99, 309.18] },
      velocityScore: { '1D': 5.4, '1W': 21.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$88B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 7.36, RKNG: 4.89 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 2, avgWeight: 5.83, proScore: 3.88, coverage: 0.667,
      price: 138.54, weeklyPrices: [161.85, 171.23, 147.44, 146.97, 138.54], weeklyChange: -14.4, dayChange: -5.74, sortRank: 0, periodReturns: { '1M': -22, 'YTD': 297.4, '6M': 237.9, '1Y': 398.9 },
      priceHistory: { '1D': [146.97, 143.12, 136.18, 136.65, 140.05, 140.75, 136.99, 136.52, 135.13, 135.58, 137.22, 137.5, 137.43, 137.97, 137.78, 136.7, 137.44, 137.69, 137.07, 137.1, 137.37, 141.18, 139.26, 138.54], '1W': [161.85, 171.23, 147.44, 146.97, 138.54], '1M': [177.62, 179.83, 169.02, 158.41, 185.67, 202.37, 184.07, 202.89, 177, 196.64, 175.13, 172.78, 169.05, 191.55, 170.81, 167.34, 161.85, 171.23, 147.44, 146.97, 138.54], 'YTD': [34.86, 33.01, 37, 38.15, 39.57, 38.13, 43.99, 51.68, 53.69, 101.14, 106.19, 101.92, 97.42, 86.35, 133.3, 157.32, 137.73, 164.36, 178.54, 223.1, 165.26, 169.02, 202.89, 175.13, 167.34, 138.54], '6M': [37.17, 34.99, 33.72, 39.26, 37.39, 46.12, 48.49, 43.91, 56.27, 95.34, 120.49, 86.33, 113.9, 84.59, 132.7, 142.55, 149.42, 152.83, 178.54, 188.28, 171.33, 179.83, 184.07, 175.13, 167.34, 138.54], '1Y': [27.77, 28.66, 28.4, 28.63, 27.13, 21.53, 22.33, 21.01, 23.7, 25.49, 23.99, 27.07, 28.99, 25.77, 27.93, 27.15, 31.14, 31.4, 35.07, 29.1, 20.91, 19.49, 26.78, 26.59, 32.06, 31.32, 37.17, 34.99, 33.72, 39.26, 37.39, 46.12, 48.49, 43.44, 58.12, 99.71, 120.49, 86.33, 113.9, 84.59, 132.7, 142.55, 149.42, 152.83, 178.54, 223.1, 171.33, 179.83, 184.07, 175.13, 167.34, 138.54] },
      velocityScore: { '1D': 4.6, '1W': 0.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 7.79, RKNG: 3.86 },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 2, avgWeight: 5.63, proScore: 3.75, coverage: 0.667,
      price: 675.39, weeklyPrices: [746.23, 732.62, 670.75, 643.83, 675.39], weeklyChange: -9.49, dayChange: 4.81, sortRank: 0, periodReturns: { '1M': 28.7, 'YTD': 292.1, '6M': 276.1, '1Y': 963.4 },
      priceHistory: { '1D': [644.38, 689.46, 667.18, 667.43, 670.87, 679.25, 671.88, 675.84, 682.78, 682.65, 692.05, 687.33, 685.35, 681.5, 678.13, 674.8, 676.52, 677.21, 672.57, 673.53, 668.85, 668.15, 668.35, 675.39], '1W': [746.23, 732.62, 670.75, 643.83, 675.39], '1M': [524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39], 'YTD': [172.27, 187.68, 222.1, 243.29, 278.41, 260.19, 284.1, 285.52, 282.25, 259.03, 261.18, 316.93, 273.35, 297.73, 337.88, 361.69, 403.12, 434.52, 483.15, 494.09, 459.62, 531.18, 575.5, 490.09, 712.13, 675.39], '6M': [181.54, 187.88, 212.14, 222.97, 252.66, 290.24, 262.56, 284.11, 270.57, 250.61, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 488.74, 455.8, 530.6, 594.11, 490.09, 712.13, 675.39], '1Y': [63.51, 66.08, 66.14, 68, 68.82, 76.55, 74.44, 76.24, 74.66, 82.04, 92.04, 97.66, 106.63, 106.88, 131.31, 115.42, 125.92, 125.72, 138.13, 163.6, 157.16, 140.23, 163.33, 168.89, 176.34, 181.08, 181.54, 187.88, 212.14, 222.97, 252.66, 290.24, 262.56, 296.56, 290.95, 261.3, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 455.8, 530.6, 594.11, 490.09, 712.13, 675.39] },
      velocityScore: { '1D': -1.1, '1W': 110.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$233B', pe: 40.3, revenueGrowth: 46, eps: 16.74, grossMargin: 45, dividendYield: 0.09,
      etfPresence: { BUZZ: false, MEME: 5.39, RKNG: 5.87 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 2, avgWeight: 4.96, proScore: 3.3, coverage: 0.667,
      price: 1213.56, weeklyPrices: [1133.99, 1211.38, 1051.77, 1048.51, 1213.56], weeklyChange: 7.02, dayChange: 15.81, sortRank: 0, periodReturns: { '1M': 35.5, 'YTD': 325.2, '6M': 323.3, '1Y': 863.1 },
      priceHistory: { '1D': [1047.92, 1216.69, 1146.21, 1160.79, 1173.33, 1176.13, 1169.9, 1174.04, 1192.3, 1202.52, 1210.46, 1212.73, 1217.82, 1222.73, 1227.89, 1229.99, 1228.53, 1223.31, 1215.09, 1228.88, 1208.61, 1205.19, 1201.45, 1213.56], '1W': [1133.99, 1211.38, 1051.77, 1048.51, 1213.56], '1M': [895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56], 'YTD': [285.41, 327.02, 336.63, 397.58, 435.79, 382.89, 413.97, 428.17, 415.56, 397.05, 405.35, 444.27, 355.46, 367.85, 421.51, 457.23, 481.72, 517.16, 666.59, 803.63, 731.99, 923.52, 996, 891.88, 1043.19, 1213.56], '6M': [284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 766.58, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1213.56], '1Y': [126, 122.29, 124.53, 114.39, 111.26, 104.88, 111.87, 125.29, 115.79, 122, 131.37, 157.23, 162.73, 157.27, 187.83, 181.6, 202.53, 206.71, 224.01, 238.33, 236.95, 201.37, 236.48, 237.22, 241.14, 265.92, 284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1213.56] },
      velocityScore: { '1D': -3.5, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.4T', pe: 27.4, revenueGrowth: 196, eps: 44.25, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { BUZZ: 3.6, MEME: false, RKNG: 6.31 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'LITE', name: 'LITE', easyScore: 2, avgWeight: 4.67, proScore: 3.12, coverage: 0.667,
      price: 861.97, weeklyPrices: [850.00, 893.93, 827.92, 842.53, 861.97], weeklyChange: 1.41, dayChange: 2.26, sortRank: 0, periodReturns: { '1M': -5.4, 'YTD': 133.9, '6M': 117.7, '1Y': 810.1 },
      priceHistory: { '1D': [842.95, 864.75, 811.55, 828.41, 846.93, 856.2, 838.96, 843.86, 842.51, 847.51, 863.24, 860.23, 858.78, 859.48, 859.01, 846.13, 851.12, 852.9, 856.16, 859.2, 855.03, 858.35, 860.27, 861.97], '1W': [850, 893.93, 827.92, 842.53, 861.97], '1M': [910.81, 902.31, 860.62, 854.96, 905, 1029.15, 938, 945.08, 863.66, 895.4, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93, 827.92, 842.53, 861.97], 'YTD': [368.59, 348.26, 343.27, 354.49, 381.44, 504.42, 583.46, 667.77, 677, 650.82, 616.09, 772.13, 688.8, 764.65, 894.13, 891.22, 846.89, 902.32, 944.28, 1030.37, 868.07, 860.62, 945.08, 853.26, 869.98, 861.97], '6M': [390.77, 357.05, 339.87, 356.83, 370.66, 435.1, 561.13, 600.42, 688.27, 694.43, 672, 649.56, 801.99, 702.76, 896.02, 824.01, 873.6, 858.32, 944.28, 992.37, 890.09, 902.31, 938, 853.26, 869.98, 861.97], '1Y': [94.71, 92.75, 92.99, 102.22, 104.52, 106.68, 111.13, 114.62, 117.43, 135.55, 149.46, 163.02, 168.73, 160.75, 163.81, 149.61, 163.23, 168.5, 200.13, 239.68, 226.86, 233.24, 325.16, 331.41, 324.35, 371.43, 390.77, 357.05, 339.87, 356.83, 370.66, 435.1, 561.13, 594.26, 723.39, 680.8, 672, 649.56, 801.99, 702.76, 896.02, 824.01, 873.6, 858.32, 944.28, 1030.37, 890.09, 902.31, 938, 853.26, 869.98, 861.97] },
      velocityScore: { '1D': 6.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$67B', pe: 152.8, revenueGrowth: 90, eps: 5.64, grossMargin: 41, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.25, RKNG: 3.1 },
      tonyNote: 'LITE appears in 2 of 3 Meme ETFs (67% coverage) with average weight 4.7% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'CRDO', easyScore: 2, avgWeight: 4.67, proScore: 3.11, coverage: 0.667,
      price: 268.03, weeklyPrices: [271.83, 302.52, 272.01, 268.99, 268.03], weeklyChange: -1.4, dayChange: -0.43, sortRank: 0, periodReturns: { '1M': 20.9, 'YTD': 86.3, '6M': 78.5, '1Y': 182 },
      priceHistory: { '1D': [269.2, 276, 265.61, 269.53, 276.86, 277.32, 271.34, 269.29, 273.48, 268.94, 273.14, 271.18, 271.36, 270.95, 272.43, 268.2, 268.99, 269.32, 266.59, 265.73, 262.63, 262.34, 264.21, 268.03], '1W': [271.83, 302.52, 272.01, 268.99, 268.03], '1M': [221.64, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 217.5, 206.89, 222.27, 237.68, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03], 'YTD': [143.89, 141.59, 149.12, 135.1, 129.47, 98.06, 121.78, 124.06, 114.48, 114.74, 111.57, 107.09, 96.44, 95.92, 107.93, 158.93, 185.54, 174.01, 198.29, 189.36, 182.98, 222.35, 217.5, 237.68, 249.33, 268.03], '6M': [144.83, 140.24, 156.07, 153.22, 129.57, 111.31, 134.72, 124.8, 120.83, 97.3, 112.33, 104.06, 100.3, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 198.57, 168.99, 221.23, 214.6, 237.68, 249.33, 268.03], '1Y': [95.05, 93.61, 98.52, 93.47, 101.22, 107.56, 119.78, 117.33, 110.86, 131.82, 140.82, 161.99, 169.56, 142.93, 143.87, 138.83, 136.53, 150.97, 166.62, 162.74, 142.95, 134.73, 177.6, 176.04, 143.91, 150.13, 144.83, 140.24, 156.07, 153.22, 129.57, 111.31, 134.72, 127.91, 123.46, 102.54, 112.33, 104.06, 100.3, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 189.36, 168.99, 221.23, 214.6, 237.68, 249.33, 268.03] },
      velocityScore: { '1D': 8, '1W': 11.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$50B', pe: 107.2, revenueGrowth: 157, eps: 2.5, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.67, RKNG: 5.66 },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'RGTI', name: 'Rigetti Computing', easyScore: 2, avgWeight: 3.09, proScore: 2.06, coverage: 0.667,
      price: 18.41, weeklyPrices: [21.36, 21.38, 21.28, 19.53, 18.41], weeklyChange: -13.81, dayChange: -5.76, sortRank: 0, periodReturns: { '1M': -26.6, 'YTD': -16.9, '6M': -24.9, '1Y': 65.7 },
      priceHistory: { '1D': [19.54, 19.7, 18.73, 19.05, 19.31, 19.28, 18.83, 18.88, 18.9, 18.72, 19.09, 18.81, 18.79, 18.77, 18.82, 18.76, 18.78, 18.78, 18.72, 18.6, 18.48, 18.48, 18.43, 18.41], '1W': [21.36, 21.38, 21.28, 19.53, 18.41], '1M': [25.07, 24.62, 27.03, 25.54, 25.63, 26.88, 24.09, 24.16, 20.68, 21.76, 19.44, 20.63, 20.98, 22.7, 20.64, 20.25, 21.36, 21.38, 21.28, 19.53, 18.41], 'YTD': [22.15, 25.25, 24.7, 24.96, 19.85, 14.98, 14.99, 15.92, 18.64, 16.97, 16.07, 15.41, 14.41, 13.5, 14.31, 19.45, 16.86, 17.45, 20.09, 18.42, 16.88, 27.03, 24.16, 19.44, 20.25, 18.41], '6M': [22.38, 25.01, 25.53, 24.99, 22.31, 18.21, 16.97, 15.59, 16.48, 16.96, 16.99, 16.22, 15.6, 14.04, 14.53, 19.11, 18.38, 16.08, 20.09, 19.07, 15.96, 24.62, 24.09, 19.44, 20.25, 18.41], '1Y': [11.11, 13.45, 12.18, 17.16, 15.44, 14.12, 15.66, 17.98, 14.27, 16.58, 15.1, 19.09, 28.52, 31.18, 40.06, 43.92, 47.97, 39.6, 42.52, 34.36, 25.2, 22.8, 25.57, 28.11, 25.84, 23.76, 22.38, 25.01, 25.53, 24.99, 22.31, 18.21, 16.97, 16.18, 17.63, 17.76, 16.99, 16.22, 15.6, 14.04, 14.53, 19.11, 18.38, 16.08, 20.09, 18.42, 15.96, 24.62, 24.09, 19.44, 20.25, 18.41] },
      velocityScore: { '1D': -2.8, '1W': -4.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: null, revenueGrowth: 199, eps: -0.89, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.3, RKNG: 2.89 },
      tonyNote: 'Rigetti Computing is a quantum hardware company using superconducting qubit technology. It holds a position in Meme ETFs alongside IonQ and D-Wave as part of the quantum computing basket. Revenue is minimal, the technology is earlier-stage than IonQ, and the ETF allocation is speculative. The weight score is low; this is a high-risk, long-duration positioning.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab', easyScore: 2, avgWeight: 2.54, proScore: 1.69, coverage: 0.667,
      price: 80.69, weeklyPrices: [107.24, 100.29, 95.12, 85.41, 80.69], weeklyChange: -24.76, dayChange: -5.53, sortRank: 0, periodReturns: { '1M': -43.7, 'YTD': 15.7, '6M': 4.5, '1Y': 123.3 },
      priceHistory: { '1D': [85.41, 81.38, 80.48, 80.93, 82.64, 82.44, 80.41, 80.91, 80.61, 80.56, 81.32, 80.74, 80.63, 81.1, 80.93, 80.69, 80.87, 81.1, 81, 81.08, 80.47, 80.32, 80.36, 80.69], '1W': [107.24, 100.29, 95.12, 85.41, 80.69], '1M': [143.2, 150.23, 148.03, 143.48, 122.39, 123.32, 114.7, 119.95, 110.08, 113.65, 105.05, 114.78, 102.39, 109.25, 104.63, 107.98, 107.24, 100.29, 95.12, 85.41, 80.69], 'YTD': [69.76, 83.08, 90.76, 87.98, 85.68, 66.32, 66.01, 70.86, 72.65, 70, 68.37, 71.93, 65.94, 65.52, 66.74, 82.93, 84.6, 82.51, 84.65, 124.15, 134.28, 148.03, 119.95, 105.05, 107.98, 80.69], '6M': [70.65, 78.14, 87.9, 89.16, 87, 81.27, 72.03, 69.89, 69.97, 70.13, 68.93, 78.59, 66.07, 64.22, 69.08, 73.6, 90.04, 77.02, 84.65, 117.56, 127.31, 150.23, 114.7, 105.05, 107.98, 80.69], '1Y': [36.14, 35.66, 39.03, 51.39, 47.43, 44.81, 44.21, 42.81, 41.53, 47.91, 45.84, 53.34, 47.79, 46.26, 56.16, 64.26, 67, 63.57, 60.92, 49.61, 45.25, 39.48, 42.14, 49.06, 61.49, 70.52, 70.65, 78.14, 87.9, 89.16, 87, 81.27, 72.03, 74.42, 70.2, 71.91, 68.93, 78.59, 66.07, 64.22, 69.08, 73.6, 90.04, 77.02, 84.65, 124.15, 127.31, 150.23, 114.7, 105.05, 107.98, 80.69] },
      velocityScore: { '1D': null, '1W': -7.1, '1M': null, '6M': null }, isNew: true,
      marketCap: '$50B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 1.84, MEME: false, RKNG: 3.23 },
      tonyNote: 'Rocket Lab is the small-launch and space systems name that Electrification and AI infrastructure ETFs hold for satellite connectivity exposure — relevant to both GPS-dependent grids and low-orbit broadband that supports remote AI compute. Small market cap, no earnings, but consistent revenue growth and a rapidly expanding backlog.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 1, avgWeight: 6.18, proScore: 2.06, coverage: 0.333,
      price: 50.56, weeklyPrices: [56.55, 58.32, 57.85, 53.60, 50.56], weeklyChange: -10.59, dayChange: -5.67, sortRank: 0, periodReturns: { '1M': -20.5, 'YTD': 12.7, '6M': 1.5, '1Y': 23 },
      priceHistory: { '1D': [53.6, 53.19, 50.84, 51.61, 52.17, 52.17, 50.94, 51.13, 51.26, 50.6, 51.42, 50.8, 50.82, 50.83, 50.94, 50.81, 50.92, 50.98, 50.78, 50.97, 50.72, 50.69, 50.51, 50.56], '1W': [56.55, 58.32, 57.85, 53.6, 50.56], '1M': [63.62, 65.4, 70.14, 72.07, 69.28, 71.4, 68.23, 65.66, 56.78, 62.8, 56.63, 57.99, 57.85, 61.18, 56.06, 54.69, 56.55, 58.32, 57.85, 53.6, 50.56], 'YTD': [44.87, 50.45, 47.56, 49.33, 43.24, 30.43, 31.3, 31.9, 40.88, 36.02, 33.03, 31.9, 29.84, 27.79, 28.08, 44.68, 43.63, 45.12, 52.57, 55.26, 52.47, 70.14, 65.66, 56.63, 54.69, 50.56], '6M': [46, 48.71, 50.95, 50.66, 45.49, 38.47, 35.19, 33.18, 31.62, 37.05, 35.12, 33.31, 32.7, 28.83, 28.99, 43.25, 47.36, 42.11, 52.57, 55.87, 48.44, 65.4, 68.23, 56.63, 54.69, 50.56], '1Y': [41.12, 44.39, 41.81, 46.51, 43.17, 38.12, 40.49, 41.03, 37.17, 43.3, 41.8, 55.61, 70.41, 67.28, 73.28, 70.65, 65.59, 59.37, 60.17, 57.43, 45.4, 41, 49.3, 52.69, 50.35, 48.48, 46, 48.71, 50.95, 50.66, 45.49, 38.47, 35.19, 33.34, 33.59, 37.13, 35.12, 33.31, 32.7, 28.83, 28.99, 43.25, 47.36, 42.11, 52.57, 55.26, 48.44, 65.4, 68.23, 56.63, 54.69, 50.56] },
      velocityScore: { '1D': -24.3, '1W': -9.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 129.6, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.18, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'RDW', name: 'Redwire', easyScore: 1, avgWeight: 6, proScore: 2, coverage: 0.333,
      price: 10.8, weeklyPrices: [14.35, 13.02, 12.22, 11.38, 10.80], weeklyChange: -24.74, dayChange: -5.1, sortRank: 0, periodReturns: { '1M': -51, 'YTD': 42.1, '6M': 38.1, '1Y': -36.3 },
      priceHistory: { '1D': [11.38, 10.65, 10.48, 10.51, 10.69, 10.72, 10.43, 10.51, 10.47, 10.44, 10.55, 10.43, 10.47, 10.63, 10.69, 10.66, 10.68, 10.69, 10.69, 10.76, 10.64, 10.78, 10.74, 10.8], '1W': [14.35, 13.02, 12.22, 11.38, 10.8], '1M': [22.04, 24, 25.9, 24.57, 20.68, 20.58, 18.62, 21.43, 18.45, 18.57, 14.87, 17.09, 15.12, 14.83, 13.5, 14.36, 14.35, 13.02, 12.22, 11.38, 10.8], 'YTD': [7.6, 10.28, 10.86, 11.98, 12.81, 8.8, 7.89, 7.99, 9.55, 9.07, 9.48, 9.63, 8.87, 9.08, 9.22, 11.22, 10.04, 9.19, 9.64, 11.46, 14.77, 25.9, 21.43, 14.87, 14.36, 10.8], '6M': [7.15, 10.26, 10.66, 10.66, 14.2, 11.26, 9.38, 8, 8.42, 8.95, 9.23, 10.13, 9.05, 8.5, 9.61, 9.91, 11.93, 8.6, 9.64, 11.56, 13.91, 24, 18.62, 14.87, 14.36, 10.8], '1Y': [16.96, 15.99, 16.64, 19.41, 16.07, 13.87, 9.47, 9.09, 8.7, 9.2, 8.32, 8.69, 7.95, 8.83, 10.73, 8.74, 8.55, 7.74, 7.64, 5.98, 5.56, 5.06, 5.51, 6.39, 7.29, 8, 7.15, 10.26, 10.66, 10.66, 14.2, 11.26, 9.38, 8.4, 8.62, 9.28, 9.23, 10.13, 9.05, 8.5, 9.61, 9.91, 11.93, 8.6, 9.64, 11.46, 13.91, 24, 18.62, 14.87, 14.36, 10.8] },
      velocityScore: { '1D': -2.4, '1W': 7.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2B', pe: null, revenueGrowth: 58, eps: -2.59, grossMargin: 13, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6, RKNG: false },
      tonyNote: 'Redwire Corp is a space infrastructure company — solar arrays, structures, and manufacturing in orbit. It appears in Meme and speculative ETFs as a high-risk space economy play. Revenue is growing from a small base but the business is pre-profitability; the ETF weight is minimal and reflects thematic positioning rather than fundamental conviction.',
    },
    {
      ticker: 'QBTS', name: 'D-Wave Quantum', easyScore: 1, avgWeight: 5.89, proScore: 1.96, coverage: 0.333,
      price: 21.91, weeklyPrices: [24.69, 24.47, 25.03, 22.98, 21.91], weeklyChange: -11.26, dayChange: -4.66, sortRank: 0, periodReturns: { '1M': -21.2, 'YTD': -16.2, '6M': -20.4, '1Y': 55.8 },
      priceHistory: { '1D': [22.98, 23.05, 22.23, 22.42, 22.72, 22.71, 22.2, 22.33, 22.33, 22.18, 22.55, 22.2, 22.16, 22.18, 22.21, 22.09, 22.11, 22.14, 22.04, 21.98, 21.83, 21.88, 21.75, 21.91], '1W': [24.69, 24.47, 25.03, 22.98, 21.91], '1M': [27.82, 27.48, 29.49, 30.14, 29.18, 29.91, 27.55, 27.64, 23.85, 25.83, 23.25, 23.82, 23.37, 26.26, 23.94, 22.92, 24.69, 24.47, 25.03, 22.98, 21.91], 'YTD': [26.15, 29.28, 28.72, 27.43, 23.22, 17.21, 18.82, 18.06, 20.14, 18.83, 17.83, 16.1, 14.65, 13.7, 13.87, 21.52, 19.31, 20.28, 23.83, 21.44, 19.3, 29.49, 27.64, 23.25, 22.92, 21.91], '6M': [25.29, 30.64, 28.8, 27.04, 24.69, 21.4, 20.44, 18.44, 18.66, 18.24, 18.76, 17.47, 15.93, 14.43, 14.57, 20.81, 21.24, 18.27, 23.83, 22.35, 18.19, 27.48, 27.55, 23.25, 22.92, 21.91], '1Y': [14.06, 16.79, 14.81, 18.89, 18.87, 16.38, 17.17, 18.18, 14.81, 15.92, 15.37, 17.76, 26.88, 26.76, 32.7, 33.02, 40.46, 31.06, 36.11, 28.39, 23.39, 20.51, 22.67, 27, 26.1, 26.82, 25.29, 30.64, 28.8, 27.04, 24.69, 21.4, 20.44, 19.07, 19.65, 18.91, 18.76, 17.47, 15.93, 14.43, 14.57, 20.81, 21.24, 18.27, 23.83, 21.44, 18.19, 27.48, 27.55, 23.25, 22.92, 21.91] },
      velocityScore: { '1D': -3.9, '1W': 12, '1M': null, '6M': null }, isNew: false,
      marketCap: '$8B', pe: null, revenueGrowth: -81, eps: -1.14, grossMargin: 66, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.89, RKNG: false },
      tonyNote: 'D-Wave Quantum is a quantum computing company — the only publicly traded business built around quantum annealing hardware. Revenue is minimal and profitability is many years away, but it holds a position in Meme ETFs as the purest-play quantum computing stock available to retail investors. The ETF weight is small and the position is purely thematic.',
    },
    {
      ticker: 'NVTS', name: 'Navitas Semiconductor', easyScore: 1, avgWeight: 5.14, proScore: 1.71, coverage: 0.333,
      price: 17.7, weeklyPrices: [24.02, 23.70, 21.40, 18.32, 17.70], weeklyChange: -26.31, dayChange: -3.41, sortRank: 0, periodReturns: { '1M': -44.3, 'YTD': 147.9, '6M': 131.1, '1Y': 167.8 },
      priceHistory: { '1D': [18.32, 18.05, 17.49, 17.61, 17.91, 18.05, 17.77, 17.85, 18.02, 17.91, 18.36, 18.12, 18.07, 18.19, 18.27, 18.05, 18, 17.94, 17.82, 17.77, 17.6, 17.67, 17.59, 17.7], '1W': [24.02, 23.7, 21.4, 18.32, 17.7], '1M': [31.79, 28.88, 28.51, 26.6, 24.86, 25.86, 30.84, 30.67, 25.08, 24.48, 20.5, 22.21, 23.39, 23.73, 22.09, 22.34, 24.02, 23.7, 21.4, 18.32, 17.7], 'YTD': [7.14, 10.06, 10, 11.29, 9.46, 7.43, 8.37, 7.88, 9.51, 8.96, 9.98, 9.17, 9.02, 8.54, 9.42, 12.37, 18.51, 16.5, 16.68, 21.17, 22.99, 28.51, 30.67, 20.5, 22.34, 17.7], '6M': [7.4, 9.05, 10.43, 9.86, 9.56, 9.05, 8.79, 8.22, 8.26, 8.9, 8.68, 9.82, 9.28, 8.77, 9.55, 10.26, 18.47, 15.48, 16.68, 19.25, 19.43, 28.88, 30.84, 20.5, 22.34, 17.7], '1Y': [6.61, 6.44, 5.84, 6.79, 8.79, 7.96, 6.79, 7.25, 6.21, 6.04, 5.6, 6.17, 7.01, 6.43, 7.82, 8.23, 15.63, 13.61, 12.56, 8.84, 7.91, 7.55, 8.74, 9.48, 8.59, 7.81, 7.4, 9.05, 10.43, 9.86, 9.56, 9.05, 8.79, 8.09, 9.88, 9.22, 8.68, 9.82, 9.28, 8.77, 9.55, 10.26, 18.47, 15.48, 16.68, 21.17, 19.43, 28.88, 30.84, 20.5, 22.34, 17.7] },
      velocityScore: { '1D': -2.3, '1W': -42.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 5.14 },
      tonyNote: 'Navitas Semiconductor is a small-cap wide-bandgap power semiconductor name — gallium nitride and silicon carbide for fast charging and EV applications. The $26.60 share price and small market cap position it as a speculative holding in ETFs willing to take higher-risk bets on next-generation power conversion.',
    },
    {
      ticker: 'WULF', name: 'WULF', easyScore: 1, avgWeight: 4.23, proScore: 1.41, coverage: 0.333,
      price: 26.06, weeklyPrices: [28.98, 28.31, 28.78, 26.97, 26.06], weeklyChange: -10.08, dayChange: -3.37, sortRank: 0, periodReturns: { '1M': 3.5, 'YTD': 126.8, '6M': 111.7, '1Y': 493.6 },
      priceHistory: { '1D': [26.97, 26.32, 25.81, 26.11, 26.4, 26.53, 26.11, 26.06, 26.05, 26.04, 26.65, 26.23, 26.17, 26.22, 26.26, 26.17, 26.28, 26.29, 26.03, 25.98, 25.95, 25.94, 26.06, 26.06], '1W': [28.98, 28.31, 28.78, 26.97, 26.06], '1M': [25.18, 26.74, 26.4, 25.56, 25.66, 26.49, 26.16, 26.19, 24, 25.86, 23.19, 25.35, 26.06, 28.17, 28.01, 27.86, 28.98, 28.31, 28.78, 26.97, 26.06], 'YTD': [11.49, 12.84, 13.83, 12.89, 14.54, 11.92, 15.91, 15.01, 17.88, 15.23, 14.67, 15.74, 15.35, 14.48, 19.03, 19.31, 20.37, 21.73, 25.74, 23.12, 21.63, 26.4, 26.19, 23.19, 27.86, 26.06], '6M': [11.75, 13.62, 13.81, 13.33, 15.31, 14.8, 16.63, 16.18, 17.56, 14.74, 14.35, 16.04, 16.22, 14.43, 18.05, 19.67, 20.55, 20.02, 25.74, 22.8, 21.34, 26.74, 26.16, 23.19, 27.86, 26.06], '1Y': [4.39, 5.26, 4.89, 5.13, 5.17, 4.76, 4.94, 8.71, 9.19, 9.44, 9.13, 10.76, 10.98, 10.83, 11.92, 13.51, 13.86, 12.88, 14.82, 14.28, 11.68, 11.56, 15.51, 14.5, 14.33, 12.52, 11.75, 13.62, 13.81, 13.33, 15.31, 14.8, 16.63, 15.38, 17.92, 15.37, 14.35, 16.04, 16.22, 14.43, 18.05, 19.67, 20.55, 20.02, 25.74, 23.12, 21.34, 26.74, 26.16, 23.19, 27.86, 26.06] },
      velocityScore: { '1D': -2.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: null, revenueGrowth: -1, eps: -2.51, grossMargin: 64, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.23 },
      tonyNote: 'WULF appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LRCX', name: 'LRCX', easyScore: 1, avgWeight: 4.21, proScore: 1.4, coverage: 0.333,
      price: 401.82, weeklyPrices: [389.04, 409.54, 371.33, 374.80, 401.82], weeklyChange: 3.29, dayChange: 7.2, sortRank: 0, periodReturns: { '1M': 24.5, 'YTD': 134.7, '6M': 126.6, '1Y': 314.9 },
      priceHistory: { '1D': [374.82, 385.03, 374.61, 378.53, 383, 383.78, 377.63, 381.5, 383.37, 386.69, 395.63, 394.43, 392.3, 394.27, 393.94, 392.85, 393.3, 395.16, 392.95, 394.75, 393.57, 396.22, 397.89, 401.82], '1W': [389.04, 409.54, 371.33, 374.8, 401.82], '1M': [322.68, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 321.8, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04, 409.54, 371.33, 374.8, 401.82], 'YTD': [171.18, 200.96, 217.47, 220.7, 248.17, 213.31, 231.29, 244.92, 239.07, 214.68, 209.49, 233.99, 211.62, 222.01, 258.76, 260.96, 258.56, 257.86, 297.17, 295.44, 292.09, 318, 336.41, 321.8, 374.18, 401.82], '6M': [178.07, 194.76, 220.4, 222.41, 238.46, 230.1, 226.61, 235.58, 244.25, 217.27, 215.23, 226.47, 238.84, 213.66, 246.49, 265.16, 265.55, 248.75, 297.17, 289.24, 273.38, 318.93, 343.71, 321.8, 374.18, 401.82], '1Y': [96.84, 98.81, 101.73, 100.66, 96.96, 96.37, 99.15, 107.38, 98.41, 104.09, 102.95, 116.96, 126.92, 128.33, 145.81, 131.37, 142.37, 147.54, 161.01, 162.19, 153.32, 139.59, 156, 158.7, 160.52, 172.27, 178.07, 194.76, 220.4, 222.41, 238.46, 230.1, 226.61, 240.09, 249.48, 222.99, 215.23, 226.47, 238.84, 213.66, 246.49, 265.16, 265.55, 248.75, 297.17, 295.44, 273.38, 318.93, 343.71, 321.8, 374.18, 401.82] },
      velocityScore: { '1D': 4.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$503B', pe: 76.1, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.28,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.21 },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'AXTI', name: 'AXT Inc', easyScore: 1, avgWeight: 4.08, proScore: 1.36, coverage: 0.333,
      price: 69.06, weeklyPrices: [84.57, 92.44, 77.91, 70.14, 69.06], weeklyChange: -18.34, dayChange: -1.53, sortRank: 0, periodReturns: { '1M': -47.9, 'YTD': 322.4, '6M': 360.1, '1Y': 3082.5 },
      priceHistory: { '1D': [70.14, 65.65, 64.97, 66.64, 69.51, 68.91, 67.06, 67.19, 67.03, 67.53, 69.89, 69.9, 69.94, 70.29, 69.81, 69.05, 69.04, 69.05, 68.43, 67.94, 67.48, 68.22, 69.18, 69.06], '1W': [84.57, 92.44, 77.91, 70.14, 69.06], '1M': [132.6, 122.77, 115.7, 103.16, 109.55, 110.85, 106.7, 105.99, 89.04, 90.78, 85.29, 88.34, 97.18, 110.74, 93.04, 92.11, 84.57, 92.44, 77.91, 70.14, 69.06], 'YTD': [16.35, 25.83, 25.72, 17.92, 16.38, 20.43, 24.79, 29.68, 37.12, 38.8, 46.73, 58.09, 58.51, 47.14, 63.12, 81.78, 75.27, 79.22, 104.83, 121.94, 104.61, 115.7, 105.99, 85.29, 92.11, 69.06], '6M': [15.37, 16.67, 22.24, 21.41, 17.2, 19.74, 24.35, 23.21, 35.08, 41.76, 44.3, 44.36, 68.44, 56.98, 53.18, 62.93, 86.94, 71.07, 104.83, 122.9, 112.88, 122.77, 106.7, 85.29, 92.11, 69.06], '1Y': [2.17, 2.14, 2.2, 2.44, 2.35, 1.92, 2.06, 2.16, 2.48, 2.92, 3.11, 3.66, 4.34, 4.66, 5.13, 4.03, 4.93, 5.18, 7.32, 8.87, 10.44, 9.45, 10.7, 11.58, 14.81, 14.65, 15.37, 16.67, 22.24, 21.41, 17.2, 19.74, 24.35, 23.54, 40.97, 39.13, 44.3, 44.36, 68.44, 56.98, 53.18, 62.93, 86.94, 71.07, 104.83, 121.94, 112.88, 122.77, 106.7, 85.29, 92.11, 69.06] },
      velocityScore: { '1D': -5.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5B', pe: null, revenueGrowth: 39, eps: -0.32, grossMargin: 21, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.08, RKNG: false },
      tonyNote: 'AXT Inc is a compound semiconductor substrate manufacturer — gallium arsenide, indium phosphide, and germanium wafers used in data center optical transceivers, 5G RF chips, and solar cells. Revenue is growing with optical networking demand. Small market cap but positioned at a genuine supply-chain chokepoint for III-V semiconductor materials.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
