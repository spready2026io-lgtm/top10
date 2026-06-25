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
export const SPY_RET: Record<Period, number> = { '1W': -1.2, '1M': -1.7, 'YTD': 8.2, '6M': 6.9, '1Y': 21.5 };
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
  'AI & ML':         { '1W': -2.4, '1M': 4.2, 'YTD': 52.7, '6M': 50.1, '1Y': 90 },
  'Semiconductors':  { '1W': -0.1, '1M': 12.6, 'YTD': 128.6, '6M': 125.1, '1Y': 174 },
  'Broad Tech':      { '1W': -2.5, '1M': -0.2, 'YTD': 30.1, '6M': 26.5, '1Y': 53.2 },
  'Electrification': { '1W': -2.5, '1M': -5.4, 'YTD': 31.2, '6M': 28.6, '1Y': 56.7 },
  'Industrials':     { '1W': 0.6, '1M': 1.3, 'YTD': 26.7, '6M': 23.6, '1Y': 45 },
  'Meme':            { '1W': -3.4, '1M': -5.9, 'YTD': 26.7, '6M': 21.4, '1Y': 11.4 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, IndexChartByPeriod> = {
  'AI & ML': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 4.3, spyReturn: 0.6, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 101.09, 95.58, 94.37, 97.6], spy: [100, 99.69, 98.24, 98.19, 98.79], top10Return: -2.4, spyReturn: -1.2, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.83, 101.64, 102.58, 105.61, 107.54, 106.51, 104.88, 95.95, 98.95, 94.22, 98.7, 99.58, 104.43, 102.03, 102.36, 106.37, 107.55, 101.6, 100.34, 103.84], spy: [100, 99.98, 100.53, 100.78, 101.06, 101.2, 100.49, 100.87, 98.26, 98.49, 96.65, 98.29, 98.82, 100.56, 99.97, 98.72, 99.49, 99.17, 97.73, 97.69, 98.29], top10Return: 4.2, spyReturn: -1.7, xLabels: ["May 28", "Jun 4", "Jun 11", "Jun 18", "Jun 25"] },
    'YTD': { top10: [100, 102.26, 104.35, 105.17, 107.24, 97.14, 101.92, 104.08, 104.49, 101.25, 100.28, 103.43, 97.27, 99.39, 106.63, 115.71, 119.73, 122.86, 133.39, 138.23, 135.23, 148.18, 153.3, 137.26, 149.81, 152.73], spy: [100, 101.11, 101.51, 101.04, 101.78, 99.37, 99.9, 101.1, 101.08, 99.91, 97.67, 96.76, 94.6, 96.09, 99.71, 102.89, 103.89, 105.39, 107.61, 108.86, 108.7, 110.66, 111.02, 106.38, 108.66, 108.18], top10Return: 52.7, spyReturn: 8.2, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 101.07, 103.14, 100.97, 105.48, 102.24, 102.23, 100.57, 102.08, 98.15, 100.63, 101.63, 99.37, 95.06, 104.33, 112.28, 119.05, 118.49, 130.81, 132.5, 129.11, 143.23, 153.41, 135, 147.36, 150.24], spy: [100, 99.62, 100.7, 98.16, 100.75, 99.89, 100.26, 98.92, 99.57, 98.55, 98.1, 97.17, 94.62, 94.21, 97.93, 101.4, 103.03, 103.08, 106.3, 106.93, 106.29, 108.71, 109.26, 105.09, 107.34, 106.87], top10Return: 50.1, spyReturn: 6.9, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 101.1, 102.34, 104.93, 106.33, 108.49, 109.01, 111.46, 106.35, 109.72, 110.25, 117.29, 121.15, 119.78, 124.53, 128.62, 125.65, 126.11, 131.72, 127.04, 127.07, 119.84, 122.44, 125.74, 128.24, 120.07, 125.57, 127, 129.61, 126.94, 132.64, 128.62, 129.62, 126.56, 128.81, 123.45, 126.69, 128, 125.15, 119.69, 131.48, 141.47, 150.08, 149.33, 164.98, 166.96, 162.86, 180.94, 193.83, 170.43, 186.21, 190.03], spy: [100, 102.2, 103.08, 103.45, 104.5, 104.11, 104.14, 106.22, 105.1, 106.51, 106.92, 108.32, 109.08, 108.39, 110.23, 110.55, 108.82, 110.65, 111.98, 110.41, 112.56, 109.14, 111.95, 112.73, 113.51, 111.42, 113.7, 113.28, 114.5, 111.61, 114.56, 113.57, 114.3, 112.47, 113.21, 112.06, 111.54, 110.49, 107.59, 107.12, 111.35, 115.29, 117.14, 117.21, 120.87, 121.59, 120.85, 123.61, 124.23, 119.49, 122.05, 121.51], top10Return: 90, spyReturn: 21.5, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Semiconductors': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 7.3, spyReturn: 0.6, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 103.26, 93.78, 93.16, 99.9], spy: [100, 99.69, 98.24, 98.19, 98.79], top10Return: -0.1, spyReturn: -1.2, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.16, 100.27, 99.34, 100.71, 105.58, 106.83, 104.03, 91.76, 97.24, 92.49, 101.48, 102.93, 109.08, 103.42, 104.56, 112.46, 116.24, 105.29, 104.7, 112.58], spy: [100, 99.98, 100.53, 100.78, 101.06, 101.2, 100.49, 100.87, 98.26, 98.49, 96.65, 98.29, 98.82, 100.56, 99.97, 98.72, 99.49, 99.17, 97.73, 97.69, 98.29], top10Return: 12.6, spyReturn: -1.7, xLabels: ["May 28", "Jun 4", "Jun 11", "Jun 18", "Jun 25"] },
    'YTD': { top10: [100, 107.01, 113.64, 119.4, 120.25, 115.11, 121.49, 124.3, 123.71, 122.11, 125.63, 132.37, 129.06, 130.72, 139.1, 150.9, 166.43, 175.55, 191.93, 195.07, 188.18, 205.18, 215.33, 198.41, 211.34, 228.61], spy: [100, 101.11, 101.51, 101.04, 101.78, 99.37, 99.9, 101.1, 101.08, 99.91, 97.67, 96.76, 94.6, 96.09, 99.71, 102.89, 103.89, 105.39, 107.61, 108.86, 108.7, 110.66, 111.02, 106.38, 108.66, 108.18], top10Return: 128.6, spyReturn: 8.2, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 104.36, 110.25, 114.62, 116.28, 115.29, 119.64, 122.12, 123.09, 120.87, 125.88, 130.27, 130.49, 126.89, 135.31, 146.95, 161.71, 168.95, 189.29, 189.49, 179.54, 201.55, 214.44, 195.66, 208.3, 225.4], spy: [100, 99.62, 100.7, 98.16, 100.75, 99.89, 100.26, 98.92, 99.57, 98.55, 98.1, 97.17, 94.62, 94.21, 97.93, 101.4, 103.03, 103.08, 106.3, 106.93, 106.29, 108.71, 109.26, 105.09, 107.34, 106.87], top10Return: 125.1, spyReturn: 6.9, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 103.26, 104.94, 107.7, 106.12, 106.64, 108.91, 112.45, 109.53, 113.77, 112.02, 116.05, 123.26, 122.11, 127.45, 128.52, 130.13, 131.36, 135.4, 134.66, 138.1, 133.39, 141.06, 148.86, 148.6, 143.88, 146.99, 148.32, 150.94, 153.39, 160.31, 157.64, 169.11, 169.66, 173.01, 165.61, 169.16, 171.49, 173.74, 156.66, 173.59, 182.88, 192.74, 206.04, 225.12, 235.44, 226.6, 256.99, 270.39, 236.78, 254.99, 274.02], spy: [100, 102.2, 103.08, 103.45, 104.5, 104.11, 104.14, 106.22, 105.1, 106.51, 106.92, 108.32, 109.08, 108.39, 110.23, 110.55, 108.82, 110.65, 111.98, 110.41, 112.56, 109.14, 111.95, 112.73, 113.51, 111.42, 113.7, 113.28, 114.5, 111.61, 114.56, 113.57, 114.3, 112.47, 113.21, 112.06, 111.54, 110.49, 107.59, 107.12, 111.35, 115.29, 117.14, 117.21, 120.87, 121.59, 120.85, 123.61, 124.23, 119.49, 122.05, 121.51], top10Return: 174, spyReturn: 21.5, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Broad Tech': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 1.9, spyReturn: 0.6, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 100.08, 97.66, 96.08, 97.53], spy: [100, 99.69, 98.24, 98.19, 98.79], top10Return: -2.5, spyReturn: -1.2, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.93, 101.33, 101.87, 103.55, 104.77, 103.46, 103.06, 95.99, 97.76, 94.02, 97.05, 98.17, 101.4, 100.63, 99.73, 101.56, 101.73, 99.2, 97.64, 99.22], spy: [100, 99.98, 100.53, 100.78, 101.06, 101.2, 100.49, 100.87, 98.26, 98.49, 96.65, 98.29, 98.82, 100.56, 99.97, 98.72, 99.49, 99.17, 97.73, 97.69, 98.29], top10Return: -0.2, spyReturn: -1.7, xLabels: ["May 28", "Jun 4", "Jun 11", "Jun 18", "Jun 25"] },
    'YTD': { top10: [100, 103.06, 104.96, 105, 104.88, 96.41, 100.14, 102.9, 104.61, 102.42, 100.7, 102.19, 98.49, 99.57, 105.23, 111.62, 115.11, 115.69, 125.38, 126.35, 122.94, 130.83, 134.35, 123.48, 130.58, 130.13], spy: [100, 101.11, 101.51, 101.04, 101.78, 99.37, 99.9, 101.1, 101.08, 99.91, 97.67, 96.76, 94.6, 96.09, 99.71, 102.89, 103.89, 105.39, 107.61, 108.86, 108.7, 110.66, 111.02, 106.38, 108.66, 108.18], top10Return: 30.1, spyReturn: 8.2, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 100.58, 102.97, 101.36, 103.65, 99.47, 99.92, 99.52, 100.75, 100.52, 100.16, 100.15, 98.24, 95.4, 102.38, 108.83, 113.15, 111.11, 122.38, 123.25, 118.45, 127.08, 132.05, 120.81, 127.72, 127.27], spy: [100, 99.62, 100.7, 98.16, 100.75, 99.89, 100.26, 98.92, 99.57, 98.55, 98.1, 97.17, 94.62, 94.21, 97.93, 101.4, 103.03, 103.08, 106.3, 106.93, 106.29, 108.71, 109.26, 105.09, 107.34, 106.87], top10Return: 26.5, spyReturn: 6.9, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.85, 103.71, 105.96, 106.79, 107.04, 106.3, 107.22, 105.77, 108.55, 108.05, 113.17, 117.43, 117.13, 120.7, 124.82, 123.66, 122.28, 125.23, 124.1, 121.12, 114.88, 118.75, 120.35, 121.93, 115.29, 118.9, 120.41, 122.88, 122.32, 126.14, 122.55, 123.34, 120.95, 123.25, 121.33, 120.76, 123.63, 123.27, 119.14, 125.36, 131.59, 136.33, 133.53, 145.99, 145.26, 141.56, 152.35, 157.67, 145.6, 153.39, 153.19], spy: [100, 102.2, 103.08, 103.45, 104.5, 104.11, 104.14, 106.22, 105.1, 106.51, 106.92, 108.32, 109.08, 108.39, 110.23, 110.55, 108.82, 110.65, 111.98, 110.41, 112.56, 109.14, 111.95, 112.73, 113.51, 111.42, 113.7, 113.28, 114.5, 111.61, 114.56, 113.57, 114.3, 112.47, 113.21, 112.06, 111.54, 110.49, 107.59, 107.12, 111.35, 115.29, 117.14, 117.21, 120.87, 121.59, 120.85, 123.61, 124.23, 119.49, 122.05, 121.51], top10Return: 53.2, spyReturn: 21.5, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Electrification': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 2.2, spyReturn: 0.6, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 101.13, 97.67, 96.35, 97.49], spy: [100, 99.69, 98.24, 98.19, 98.79], top10Return: -2.5, spyReturn: -1.2, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.17, 99.25, 98.2, 97.87, 99.92, 98.87, 98.79, 92.68, 92.79, 89.28, 91.77, 93.11, 95.19, 94.66, 94.49, 96.32, 97.43, 94.06, 92.87, 94.03], spy: [100, 99.98, 100.53, 100.78, 101.06, 101.2, 100.49, 100.87, 98.26, 98.49, 96.65, 98.29, 98.82, 100.56, 99.97, 98.72, 99.49, 99.17, 97.73, 97.69, 98.29], top10Return: -5.4, spyReturn: -1.7, xLabels: ["May 28", "Jun 4", "Jun 11", "Jun 18", "Jun 25"] },
    'YTD': { top10: [100, 103.61, 108.42, 111.38, 112.44, 109.91, 114.31, 115.46, 118.29, 112.19, 112.3, 114.46, 113.23, 113.26, 118.81, 122.71, 128.09, 131.53, 137.4, 135.87, 129.03, 137.63, 137.85, 126.89, 132.14, 131.17], spy: [100, 101.11, 101.51, 101.04, 101.78, 99.37, 99.9, 101.1, 101.08, 99.91, 97.67, 96.76, 94.6, 96.09, 99.71, 102.89, 103.89, 105.39, 107.61, 108.86, 108.7, 110.66, 111.02, 106.38, 108.66, 108.18], top10Return: 31.2, spyReturn: 8.2, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 102.36, 104.36, 106.63, 109.83, 110.23, 112.59, 112.75, 116.01, 112.39, 110.88, 112.73, 112.92, 109.56, 114.72, 120.18, 124.16, 125.08, 134.55, 133.59, 125.25, 135.19, 135.54, 124.52, 129.63, 128.73], spy: [100, 99.62, 100.7, 98.16, 100.75, 99.89, 100.26, 98.92, 99.57, 98.55, 98.1, 97.17, 94.62, 94.21, 97.93, 101.4, 103.03, 103.08, 106.3, 106.93, 106.29, 108.71, 109.26, 105.09, 107.34, 106.87], top10Return: 28.6, spyReturn: 6.9, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 103.46, 106.23, 108.17, 110.33, 107.3, 107.89, 110.68, 110.55, 112.52, 111.46, 112.68, 116.95, 117.99, 121.58, 125.8, 128.97, 127.06, 129.4, 129.08, 128.79, 123.81, 127.39, 129.67, 131.2, 128.34, 129.72, 129.59, 132.32, 134.4, 138.19, 137.51, 138.5, 138.42, 140.48, 137.12, 138.25, 139.77, 142.34, 138.81, 145.32, 151.17, 153.62, 152.07, 161.56, 162.66, 156.27, 165.67, 165.92, 153.85, 159.52, 156.7], spy: [100, 102.2, 103.08, 103.45, 104.5, 104.11, 104.14, 106.22, 105.1, 106.51, 106.92, 108.32, 109.08, 108.39, 110.23, 110.55, 108.82, 110.65, 111.98, 110.41, 112.56, 109.14, 111.95, 112.73, 113.51, 111.42, 113.7, 113.28, 114.5, 111.61, 114.56, 113.57, 114.3, 112.47, 113.21, 112.06, 111.54, 110.49, 107.59, 107.12, 111.35, 115.29, 117.14, 117.21, 120.87, 121.59, 120.85, 123.61, 124.23, 119.49, 122.05, 121.51], top10Return: 56.7, spyReturn: 21.5, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Industrials': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 1.9, spyReturn: 0.6, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 101.01, 99.67, 99.09, 100.67], spy: [100, 99.69, 98.24, 98.19, 98.79], top10Return: 0.6, spyReturn: -1.2, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 100, 100.47, 99.82, 98.35, 99.63, 99.38, 100.34, 97.56, 97.7, 96.05, 98.11, 99.26, 100.31, 99.73, 99.84, 99.87, 100.93, 99.55, 98.96, 100.58], spy: [100, 99.98, 100.53, 100.78, 101.06, 101.2, 100.49, 100.87, 98.26, 98.49, 96.65, 98.29, 98.82, 100.56, 99.97, 98.72, 99.49, 99.17, 97.73, 97.69, 98.29], top10Return: 1.3, spyReturn: -1.7, xLabels: ["May 28", "Jun 4", "Jun 11", "Jun 18", "Jun 25"] },
    'YTD': { top10: [100, 105.14, 110.48, 111.3, 111.44, 111.22, 116.08, 119.71, 119.6, 114.59, 111.47, 112.16, 111.02, 112.97, 119.22, 118.64, 120.38, 121.06, 126.6, 124.54, 120.04, 126.32, 125.76, 120.34, 125.39, 126.66], spy: [100, 101.11, 101.51, 101.04, 101.78, 99.37, 99.9, 101.1, 101.08, 99.91, 97.67, 96.76, 94.6, 96.09, 99.71, 102.89, 103.89, 105.39, 107.61, 108.86, 108.7, 110.66, 111.02, 106.38, 108.66, 108.18], top10Return: 26.7, spyReturn: 8.2, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 102.2, 105.8, 108.15, 109.28, 110.03, 113.75, 115.65, 117.02, 116, 111.9, 111.01, 109.79, 107.37, 114.34, 117.57, 117.64, 116.12, 123.04, 122.04, 116.46, 122.99, 122.23, 117.96, 122.86, 124.07], spy: [100, 99.62, 100.7, 98.16, 100.75, 99.89, 100.26, 98.92, 99.57, 98.55, 98.1, 97.17, 94.62, 94.21, 97.93, 101.4, 103.03, 103.08, 106.3, 106.93, 106.29, 108.71, 109.26, 105.09, 107.34, 106.87], top10Return: 23.6, spyReturn: 6.9, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 103.08, 104.46, 106.01, 106.39, 106.3, 106.51, 109.02, 105.99, 109.1, 108.56, 110.8, 112.19, 111.3, 114.18, 114.76, 113.81, 114.47, 115.73, 113.93, 113.63, 109.03, 112.24, 113.88, 116.92, 113.14, 116.51, 119.66, 124.19, 126.06, 128.24, 130, 134.22, 134.69, 136.49, 133.17, 129.93, 128.58, 128.68, 125.58, 133.26, 136.4, 137.58, 135.31, 143.28, 141.57, 135.58, 143.26, 142.76, 137.52, 143.12, 145.03], spy: [100, 102.2, 103.08, 103.45, 104.5, 104.11, 104.14, 106.22, 105.1, 106.51, 106.92, 108.32, 109.08, 108.39, 110.23, 110.55, 108.82, 110.65, 111.98, 110.41, 112.56, 109.14, 111.95, 112.73, 113.51, 111.42, 113.7, 113.28, 114.5, 111.61, 114.56, 113.57, 114.3, 112.47, 113.21, 112.06, 111.54, 110.49, 107.59, 107.12, 111.35, 115.29, 117.14, 117.21, 120.87, 121.59, 120.85, 123.61, 124.23, 119.49, 122.05, 121.51], top10Return: 45, spyReturn: 21.5, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Meme': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 2.5, spyReturn: 0.6, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 101.24, 98.44, 94.52, 96.56], spy: [100, 99.69, 98.24, 98.19, 98.79], top10Return: -3.4, spyReturn: -1.2, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 101.49, 103.34, 102.02, 102.24, 104.7, 101.07, 101.6, 91.3, 93.63, 88.68, 91.36, 92.18, 95.54, 94.77, 93.95, 96.07, 97.27, 94.68, 90.92, 92.85], spy: [100, 99.98, 100.53, 100.78, 101.06, 101.2, 100.49, 100.87, 98.26, 98.49, 96.65, 98.29, 98.82, 100.56, 99.97, 98.72, 99.49, 99.17, 97.73, 97.69, 98.29], top10Return: -5.9, spyReturn: -1.7, xLabels: ["May 28", "Jun 4", "Jun 11", "Jun 18", "Jun 25"] },
    'YTD': { top10: [100, 108.03, 108.23, 107.22, 102.68, 89.95, 92.02, 93.23, 95.18, 93.73, 92.78, 91.45, 89.25, 91.36, 100.37, 113.76, 110.76, 114.16, 124.96, 126.19, 125.42, 142.43, 140.06, 122.75, 128.86, 126.66], spy: [100, 101.11, 101.51, 101.04, 101.78, 99.37, 99.9, 101.1, 101.08, 99.91, 97.67, 96.76, 94.6, 96.09, 99.71, 102.89, 103.89, 105.39, 107.61, 108.86, 108.7, 110.66, 111.02, 106.38, 108.66, 108.18], top10Return: 26.7, spyReturn: 8.2, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 104.83, 107.25, 105.03, 103.07, 98.58, 94.69, 91.21, 92.79, 90.85, 91.58, 90.1, 91.06, 89.63, 97.73, 109.71, 111.89, 109.18, 122.8, 121.62, 120.08, 137.66, 136.62, 120.67, 126.67, 124.53], spy: [100, 99.62, 100.7, 98.16, 100.75, 99.89, 100.26, 98.92, 99.57, 98.55, 98.1, 97.17, 94.62, 94.21, 97.93, 101.4, 103.03, 103.08, 106.3, 106.93, 106.29, 108.71, 109.26, 105.09, 107.34, 106.87], top10Return: 21.4, spyReturn: 6.9, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.67, 101.12, 97.17, 96.69, 91.7, 90.72, 90.11, 83.87, 83.83, 84.44, 87.4, 90.06, 89.88, 87.84, 94, 91.22, 90.22, 94.41, 92.65, 93.28, 88.97, 86.45, 89.05, 89.18, 84.23, 88.79, 91.67, 93.72, 92.42, 94.6, 92.21, 89.49, 90.33, 88.8, 92.27, 95.07, 99.43, 99.69, 93.29, 96.06, 105.84, 112.29, 111.29, 113.08, 114.83, 112.95, 118.6, 114.95, 113.01, 116.49, 111.44], spy: [100, 102.2, 103.08, 103.45, 104.5, 104.11, 104.14, 106.22, 105.1, 106.51, 106.92, 108.32, 109.08, 108.39, 110.23, 110.55, 108.82, 110.65, 111.98, 110.41, 112.56, 109.14, 111.95, 112.73, 113.51, 111.42, 113.7, 113.28, 114.5, 111.61, 114.56, 113.57, 114.3, 112.47, 113.21, 112.06, 111.54, 110.49, 107.59, 107.12, 111.35, 115.29, 117.14, 117.21, 120.87, 121.59, 120.85, 123.61, 124.23, 119.49, 122.05, 121.51], top10Return: 11.4, spyReturn: 21.5, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
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
export const SCAN_TIMESTAMP    = '2026-06-25T13:37:21.993Z';
export const SCAN_TIMESTAMP_NY = 'June 25, 2026 at 9:37 AM ET';
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
  { ticker: 'NVDA', name: `NVIDIA Corp`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 13.00, bestProScore: 6.22, avgProScore: 4.33, price: 199.29, weeklyChange: -5.41 },
  { ticker: 'MU', name: `Micron Technology Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 12.83, bestProScore: 5.55, avgProScore: 4.28, price: 1251.06, weeklyChange: 10.32 },
  { ticker: 'AMD', name: `Advanced Micro Devices Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 10.42, bestProScore: 4.96, avgProScore: 3.47, price: 547.53, weeklyChange: 1.89 },
  { ticker: 'AVGO', name: `Broadcom Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 6.55, bestProScore: 2.90, avgProScore: 2.18, price: 386.39, weeklyChange: -6.07 },
  { ticker: 'INTC', name: `INTEL CORPORATION`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.85, bestProScore: 3.55, avgProScore: 2.42, price: 140.19, weeklyChange: 4.63 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 4.80, bestProScore: 2.81, avgProScore: 2.40, price: 315.62, weeklyChange: 6.20 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.74, bestProScore: 2.94, avgProScore: 2.37, price: 450.55, weeklyChange: -2.50 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.48, bestProScore: 2.58, avgProScore: 2.24, price: 287.09, weeklyChange: -7.56 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 3.87, bestProScore: 2.52, avgProScore: 1.94, price: 392.85, weeklyChange: 0.98 },
  { ticker: 'WDC', name: `Western Digital Corp`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 3.59, bestProScore: 2.28, avgProScore: 1.79, price: 706.90, weeklyChange: -5.27 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': 0.2, '1M': 11.7, 'YTD': 126.9, '6M': 126, '1Y': 209.7 },
  ARTY: { '1W': -2.8, '1M': 7, 'YTD': 59.2, '6M': 58.2, '1Y': 91.6 },
  BAI:  { '1W': -1.2, '1M': 5.1, 'YTD': 57.8, '6M': 54.5, '1Y': 87 },
  IGPT: { '1W': -1.3, '1M': 7.5, 'YTD': 76.6, '6M': 75.9, '1Y': 117.5 },
  IVES: { '1W': -4.3, '1M': -4.4, 'YTD': 15.1, '6M': 12.4, '1Y': 34.9 },
  ALAI: { '1W': -4.7, '1M': 0.8, 'YTD': 23.3, '6M': 20.3, '1Y': 48.8 },
  CHAT: { '1W': -2.3, '1M': 6.1, 'YTD': 69.5, '6M': 63.7, '1Y': 109.6 },
  AIFD: { '1W': -2.8, '1M': 2.9, 'YTD': 42.8, '6M': 40.7, '1Y': 78.9 },
  SPRX: { '1W': -3.2, '1M': 2.1, 'YTD': 45.6, '6M': 40.5, '1Y': 94.8 },
  AOTG: { '1W': -1.5, '1M': 2.9, 'YTD': 10.3, '6M': 8.4, '1Y': 27.5 },
  // Semiconductors
  SOXX: { '1W': -0.9, '1M': 11.2, 'YTD': 110.5, '6M': 107.1, '1Y': 167.3 },
  PSI:  { '1W': 0.3, '1M': 10.6, 'YTD': 126.8, '6M': 121.3, '1Y': 201.1 },
  XSD:  { '1W': -3.3, '1M': -2.7, 'YTD': 91.3, '6M': 86.3, '1Y': 141.9 },
  DRAM: { '1W': 3.4, '1M': 31.1, 'YTD': 185.8, '6M': 185.8, '1Y': 185.8 },
  // Broad Tech
  PTF:  { '1W': -2.5, '1M': 2.8, 'YTD': 74.9, '6M': 69, '1Y': 99.6 },
  WCLD: { '1W': -0.9, '1M': -2.9, 'YTD': -16.4, '6M': -17.5, '1Y': -17.2 },
  IGV:  { '1W': -3.7, '1M': -8.8, 'YTD': -18.8, '6M': -20.7, '1Y': -20.4 },
  FDTX: { '1W': -1.1, '1M': 8.4, 'YTD': 40.7, '6M': 39, '1Y': 50.2 },
  GTEK: { '1W': 0.1, '1M': 6.4, 'YTD': 49.8, '6M': 48.9, '1Y': 68.6 },
  ARKK: { '1W': -3.1, '1M': 0.6, 'YTD': 1, '6M': -3.6, '1Y': 11.8 },
  MARS: { '1W': -14, '1M': -36, 'YTD': 13.9, '6M': 13.9, '1Y': 13.9 },
  FRWD: { '1W': -2.8, '1M': 5.1, 'YTD': 34.4, '6M': 34.4, '1Y': 34.4 },
  BCTK: { '1W': -3.1, '1M': 1.7, 'YTD': 23.4, '6M': 20.9, '1Y': 25.6 },
  FWD:  { '1W': -1, '1M': 3.2, 'YTD': 39.6, '6M': 36.8, '1Y': 67.1 },
  CBSE: { '1W': 1.1, '1M': 1.7, 'YTD': 27.6, '6M': 24.2, '1Y': 39.3 },
  FCUS: { '1W': -1.5, '1M': -0.4, 'YTD': 40.1, '6M': 31, '1Y': 75 },
  WGMI: { '1W': -6.6, '1M': 3.9, 'YTD': 75.9, '6M': 61, '1Y': 245.6 },
  CNEQ: { '1W': -3.9, '1M': -0.5, 'YTD': 17, '6M': 14.4, '1Y': 40 },
  SGRT: { '1W': 0.8, '1M': 2.9, 'YTD': 50.6, '6M': 45.9, '1Y': 88.4 },
  SPMO: { '1W': 0.4, '1M': 7.2, 'YTD': 34.6, '6M': 32.2, '1Y': 46.1 },
  XMMO: { '1W': -0.2, '1M': 1.3, 'YTD': 23.9, '6M': 21.1, '1Y': 36.3 },
  // Electrification
  POW:  { '1W': -1.8, '1M': -5.1, 'YTD': 56.1, '6M': 54.4, '1Y': 51.5 },
  VOLT: { '1W': 2.1, '1M': 4.3, 'YTD': 45.2, '6M': 42.8, '1Y': 69.3 },
  PBD:  { '1W': -4, '1M': -11.2, 'YTD': 19.9, '6M': 17.6, '1Y': 56.5 },
  PBW:  { '1W': -8.5, '1M': -14.9, 'YTD': 24.5, '6M': 18, '1Y': 96.1 },
  IVEP: { '1W': -0.3, '1M': -0.2, 'YTD': 10.2, '6M': 10.2, '1Y': 10.2 },
  // Industrials
  AIRR: { '1W': 1.7, '1M': 3.8, 'YTD': 35.4, '6M': 31, '1Y': 67.8 },
  PRN:  { '1W': 1.4, '1M': 5.2, 'YTD': 48.4, '6M': 42.6, '1Y': 69.5 },
  RSHO: { '1W': 2.2, '1M': 9.1, 'YTD': 39.4, '6M': 36.3, '1Y': 61.3 },
  IDEF: { '1W': -3.4, '1M': -7.2, 'YTD': 1.4, '6M': -0.8, '1Y': 14.5 },
  BILT: { '1W': 1.3, '1M': -4.5, 'YTD': 8.7, '6M': 8.8, '1Y': 12 },
  // Meme
  BUZZ: { '1W': -5, '1M': -6.3, 'YTD': 11.1, '6M': 6.9, '1Y': 22.9 },
  MEME: { '1W': -6.5, '1M': -14.6, 'YTD': 56, '6M': 44.5, '1Y': -1.5 },
  RKNG: { '1W': 1.2, '1M': 3.2, 'YTD': 12.9, '6M': 12.9, '1Y': 12.9 },
};
// @@END_GENERATED:ETF_RETURNS@@

// @@GENERATED:ETF_DAY_CHANGE@@
// Today's % move per ETF ticker (1D, vs prior close). Refreshed by the 3×/day
// price jobs. Powers the 1D ranking in the theme-ETF side panel.
export const ETF_DAY_CHANGE: Record<string, number> = {
  AIS:  6.98,
  ARTY: 3.72,
  BAI:  5.7,
  IGPT: 5.24,
  IVES: 0.58,
  CHAT: 4.37,
  SPRX: 3.83,
  SOXX: 5.4,
  PSI:  5.92,
  XSD:  4.61,
  DRAM: 13.47,
  PTF:  5.45,
  WCLD: -0.71,
  IGV:  -0.54,
  FDTX: 4.06,
  ARKK: 1.15,
  MARS: -1.66,
  FRWD: 3.4,
  BCTK: 2.01,
  WGMI: 0.85,
  CNEQ: 1.1,
  SGRT: 4.2,
  SPMO: 4.39,
  XMMO: 1.61,
  POW:  2.44,
  VOLT: 2.75,
  PBW:  0.58,
  IVEP: 2.88,
  AIRR: 2.02,
  PRN:  3.28,
  IDEF: 0.37,
  BUZZ: 1.09,
  MEME: 3.86,
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
  'AI & ML': { etfs: ['AIS', 'AOTG', 'IVES'], series: { '1W': [100, 101.78, 97.88, 95.95, 98.11], '1M': [100, 99.74, 102.1, 103.52, 106.66, 107.49, 106.2, 104.7, 96.33, 98.58, 95.03, 97.49, 98.7, 102.1, 101.71, 101.35, 104.18, 106.1, 101.85, 99.89, 102.3], 'YTD': [100, 102.8, 104.13, 105.69, 106.74, 95.97, 100.31, 101.68, 102.84, 100.53, 99.09, 100.93, 96.06, 97.07, 103.25, 111.99, 117.45, 120.63, 131.35, 136.75, 133.67, 146.65, 151.74, 136.5, 147.49, 150.78], '6M': [100, 100.87, 103.09, 101.74, 104.94, 102.32, 100.48, 98.66, 99.56, 97.34, 99.62, 100.04, 97.47, 92.66, 100.95, 108.56, 116.14, 117.4, 128.21, 132.11, 128.66, 141.67, 152.51, 134.55, 145.42, 148.7], '1Y': [100, 100.73, 101.7, 104.19, 105.12, 106.16, 105.66, 107.97, 104.14, 107.12, 107.53, 114.28, 118.51, 117.82, 122.73, 126.23, 125.04, 125.61, 131.52, 127.22, 127.23, 119.53, 120.69, 123.78, 125.95, 119.82, 124.99, 126.29, 129.13, 127.6, 131.71, 128.61, 127.57, 124.23, 126.51, 122.29, 125.55, 126.24, 123, 116.94, 127.76, 137.36, 147.23, 148.98, 163.15, 167.53, 163.55, 180.72, 194.73, 171.35, 185.86, 190.71] }, returns: { '1W': -1.9, '1M': 2.3, 'YTD': 50.8, '6M': 48.7, '1Y': 90.7 } },
  'Semiconductors': { etfs: ['DRAM', 'PSI', 'XSD'], series: { '1W': [100, 103.53, 93.58, 92.85, 100.16], '1M': [100, 99.23, 100.39, 99.18, 100.84, 105.4, 106.44, 103.47, 90.78, 96.24, 91.65, 101, 102.37, 108.69, 103.33, 104.35, 112.56, 116.68, 105.11, 104.43, 113.03], 'YTD': [100, 107.31, 114.2, 120.61, 120.35, 116.86, 123.08, 125.95, 125.45, 125.43, 130.96, 138.83, 135.68, 136.82, 143.56, 156.26, 173.09, 182.99, 199.8, 201.63, 193.32, 210.54, 220.39, 204.61, 215.4, 234.64], '6M': [100, 104.5, 111.02, 116.08, 116.79, 116.07, 121.24, 124.26, 124.69, 124.69, 130.94, 136.64, 136.85, 133.39, 140.07, 152.17, 168.59, 176.26, 197.18, 196.46, 185.29, 207.31, 218.85, 201.9, 212.41, 231.49], '1Y': [100, 103.65, 105.27, 108.95, 107.55, 108.46, 111.38, 114.26, 111.78, 116.37, 115.05, 118.88, 126.74, 125.12, 130.35, 130.58, 132.9, 134.25, 137.62, 137.74, 142.03, 138.28, 147.14, 155.44, 153.94, 150.8, 152.98, 153.06, 154.84, 157.12, 164.42, 161.62, 175.91, 176.45, 179.81, 173.77, 177.94, 180.84, 183.73, 162.7, 179.41, 187.37, 196.31, 211.49, 228.93, 241.42, 232.33, 263.4, 274.01, 239.62, 255.71, 276.28] }, returns: { '1W': 0.2, '1M': 13, 'YTD': 134.6, '6M': 131.5, '1Y': 176.3 } },
  'Broad Tech': { etfs: ['WGMI', 'PTF', 'SGRT'], series: { '1W': [100, 101.18, 96.68, 93.97, 97.23], '1M': [100, 101.9, 102.25, 101.28, 103.3, 105.97, 105.66, 104, 94.15, 97.56, 91.61, 97.79, 100.02, 104.42, 102.57, 102.69, 106.25, 107.46, 102.75, 99.79, 103.2], 'YTD': [100, 107.37, 113.44, 113.75, 116.83, 101.6, 110.12, 112.37, 116.08, 109.7, 107.02, 111.73, 105.25, 105.85, 119.91, 127.7, 134.51, 133.73, 152.7, 152.99, 146.88, 165.77, 168.59, 148.37, 166.46, 167.14], '6M': [100, 105.48, 109.11, 110.36, 114.8, 109.99, 108.94, 107.5, 112.95, 106.88, 105.7, 108.63, 108.05, 100.69, 115.19, 123.15, 130.45, 124.19, 148.43, 146.17, 138.45, 160.5, 166.45, 144.22, 161.78, 162.46], '1Y': [100, 110.87, 111.2, 115.92, 118.32, 116.55, 115.2, 117.78, 119.95, 124.47, 125.06, 139.45, 151.1, 151.94, 159.53, 177.57, 179.33, 171.36, 178.72, 178.69, 160.06, 148.29, 159.63, 164.6, 164.78, 145.46, 151.25, 161.45, 165.42, 169.69, 176.8, 170.32, 167.03, 158.54, 164.14, 156.29, 152.34, 159.57, 162.92, 154.76, 171.24, 186.09, 195.14, 187.91, 224.99, 214.94, 211.82, 243.42, 246.86, 221.16, 245.63, 244.55] }, returns: { '1W': -2.8, '1M': 3.2, 'YTD': 67.1, '6M': 62.5, '1Y': 144.6 } },
  'Electrification': { etfs: ['PBW', 'VOLT', 'POW'], series: { '1W': [100, 101.06, 96.45, 95.69, 97.26], '1M': [100, 99.41, 99.38, 98.37, 97.97, 100.1, 98.96, 98.85, 92.08, 92.77, 88.59, 92.69, 93.46, 95.98, 94.92, 95.03, 97.27, 98.34, 93.89, 93.2, 94.76], 'YTD': [100, 104.13, 109.93, 113.55, 115.16, 110.83, 117.42, 119.25, 121.85, 114.21, 114.69, 117.34, 114.37, 116.34, 123.8, 127.86, 135.67, 141.8, 147.78, 147.19, 138.43, 148.98, 148.05, 132.77, 142.43, 141.92], '6M': [100, 102.74, 104.88, 107.52, 111.71, 112.28, 114.69, 115.65, 119.31, 112.93, 113.19, 114.85, 115.06, 112.28, 119.35, 124.41, 130.83, 132.34, 144.33, 142.87, 131.66, 145.39, 144.64, 129.61, 139.05, 138.61], '1Y': [100, 103.56, 107.06, 109.7, 111.16, 108.1, 108.68, 111.72, 111.32, 113.72, 111.93, 112.77, 118.42, 120.92, 125.03, 129.39, 133.18, 131.95, 133.36, 132.06, 132.79, 127.49, 132.37, 135.83, 137.52, 133.83, 136.83, 136.35, 139.59, 140.73, 145.26, 145.16, 145.39, 145.36, 148.06, 145.94, 146.55, 148.31, 152.85, 149.62, 159.14, 164.78, 169.45, 164.13, 175.31, 177.48, 167.95, 178.65, 178.41, 165.93, 175.2, 172.28] }, returns: { '1W': -2.7, '1M': -5.2, 'YTD': 41.9, '6M': 38.6, '1Y': 72.3 } },
  'Industrials': { etfs: ['PRN', 'RSHO', 'BILT'], series: { '1W': [100, 101.72, 100.63, 99.82, 101.68], '1M': [100, 99.94, 99.46, 98.95, 97.76, 99.81, 100.04, 100.48, 97.73, 97.9, 97.13, 97.65, 99.82, 101, 99.87, 100.27, 100.43, 102.21, 101.06, 100.21, 102.12], 'YTD': [100, 102.86, 107.52, 108.43, 109.5, 110.83, 116.72, 119.27, 119.99, 114.24, 110.81, 111.53, 112.24, 113.47, 120.42, 119.33, 121.74, 122.53, 129.56, 128.09, 122.54, 129.05, 129.41, 125.01, 129.62, 132.17], '6M': [100, 100.96, 103.02, 105.77, 106.68, 107.99, 113.22, 116.63, 117.49, 116.22, 111.49, 110.45, 110.24, 107.62, 114.14, 118.9, 118.85, 118.95, 125.48, 125.69, 119.78, 126.75, 126.7, 122.76, 127.21, 129.69], '1Y': [100, 102.7, 103.86, 105.4, 105.73, 105.27, 104.55, 106.97, 104.62, 107.23, 106.69, 108.44, 109.5, 108.35, 110.32, 110.83, 111.01, 110.7, 111.93, 111.57, 110.44, 106.38, 109.62, 111.41, 114.21, 110.11, 113.4, 115.4, 118.25, 119.91, 122.35, 125.26, 130.25, 132.13, 133.43, 128.51, 125.73, 124.01, 126.25, 122.75, 129.37, 133.79, 135.45, 134.79, 141.89, 141.31, 135.51, 143.53, 144.08, 139.29, 144.06, 147.61] }, returns: { '1W': 1.7, '1M': 2.1, 'YTD': 32.2, '6M': 29.7, '1Y': 47.6 } },
  'Meme': { etfs: ['MEME', 'BUZZ', 'RKNG'], series: { '1W': [100, 101.24, 98.44, 94.52, 96.56], '1M': [100, 101.49, 103.34, 102.02, 102.24, 104.7, 101.07, 101.6, 91.3, 93.63, 88.68, 91.36, 92.18, 95.54, 94.77, 93.95, 96.07, 97.27, 94.68, 90.92, 92.85], 'YTD': [100, 108.03, 108.23, 107.22, 102.68, 89.95, 92.02, 93.23, 95.18, 93.73, 92.78, 91.45, 89.25, 91.36, 100.37, 113.76, 110.76, 114.16, 124.96, 126.19, 125.42, 142.43, 140.06, 122.75, 128.86, 126.66], '6M': [100, 104.83, 107.25, 105.03, 103.07, 98.58, 94.69, 91.21, 92.79, 90.85, 91.58, 90.1, 91.06, 89.63, 97.73, 109.71, 111.89, 109.18, 122.8, 121.62, 120.08, 137.66, 136.62, 120.67, 126.67, 124.53], '1Y': [100, 102.67, 101.12, 97.17, 96.69, 91.7, 90.72, 90.11, 83.87, 83.83, 84.44, 87.4, 90.06, 89.88, 87.84, 94, 91.22, 90.22, 94.41, 92.65, 93.28, 88.97, 86.45, 89.05, 89.18, 84.23, 88.79, 91.67, 93.72, 92.42, 94.6, 92.21, 89.49, 90.33, 88.8, 92.27, 95.07, 99.43, 99.69, 93.29, 96.06, 105.84, 112.29, 111.29, 113.08, 114.83, 112.95, 118.6, 114.95, 113.01, 116.49, 111.44] }, returns: { '1W': -3.4, '1M': -7.2, 'YTD': 26.7, '6M': 24.5, '1Y': 11.4 } },
};
// @@END_GENERATED:THEME_REPRESENTATIVES@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 10, avgWeight: 6.22, proScore: 6.22, coverage: 1,
      price: 199.29, weeklyPrices: [210.69, 208.65, 200.04, 199.00, 199.29], weeklyChange: -5.41, dayChange: 0.19, sortRank: 0, periodReturns: { '1M': -7.2, 'YTD': 6.9, '6M': 5.7, '1Y': 29.1 },
      priceHistory: { '1D': [198.91, 199.05, 199.29], '1W': [210.69, 208.65, 200.04, 199, 199.29], '1M': [214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 199.29], 'YTD': [186.5, 185.04, 187.05, 184.84, 192.51, 171.88, 186.94, 189.82, 184.89, 183.34, 183.14, 178.56, 171.24, 175.75, 183.91, 198.35, 199.64, 199.57, 207.83, 225.83, 223.47, 214.25, 218.66, 200.42, 204.65, 199.29], '6M': [190.53, 188.12, 184.94, 178.07, 188.52, 180.34, 188.54, 184.97, 192.85, 180.05, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 220.78, 220.61, 212.6, 214.75, 200.42, 204.65, 199.29], '1Y': [154.31, 157.25, 164.1, 173, 173.74, 177.87, 180.77, 181.59, 175.4, 181.6, 171.66, 177.17, 176.24, 177.69, 188.89, 192.57, 181.81, 182.16, 202.89, 188.08, 193.8, 186.52, 180.26, 183.38, 180.93, 174.14, 190.53, 188.12, 184.94, 178.07, 188.52, 180.34, 190.04, 184.97, 192.85, 180.05, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 220.78, 220.61, 212.6, 214.75, 200.42, 204.65, 199.29] },
      velocityScore: { '1D': 0.2, '1W': 3.7, '1M': 9.3, '6M': null }, isNew: false,
      marketCap: '$4.8T', pe: 30.5, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.5,
      etfPresence: { AIS: 2.36, ARTY: 4.45, BAI: 4.03, IGPT: 7.47, IVES: 4.93, ALAI: 12.56, CHAT: 6.39, AIFD: 6.36, SPRX: 3.23, AOTG: 10.43 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 6.16, proScore: 5.55, coverage: 0.9,
      price: 1251.06, weeklyPrices: [1133.99, 1211.38, 1051.77, 1048.51, 1251.06], weeklyChange: 10.32, dayChange: 19.39, sortRank: 0, periodReturns: { '1M': 39.6, 'YTD': 338.3, '6M': 336.4, '1Y': 883.2 },
      priceHistory: { '1D': [1047.92, 1250.44, 1251.06], '1W': [1133.99, 1211.38, 1051.77, 1048.51, 1251.06], '1M': [895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1251.06], 'YTD': [285.41, 327.02, 336.63, 397.58, 435.79, 382.89, 413.97, 428.17, 415.56, 397.05, 405.35, 444.27, 355.46, 367.85, 421.51, 457.23, 481.72, 517.16, 666.59, 803.63, 731.99, 923.52, 996, 891.88, 1043.19, 1251.06], '6M': [284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 766.58, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1251.06], '1Y': [127.25, 121.74, 123.11, 113.26, 111.73, 109.14, 111.87, 124.27, 117.21, 117.75, 124.21, 150.57, 168.89, 156.83, 183.75, 192.33, 202.53, 206.71, 224.01, 238.33, 244.9, 225.92, 230.26, 226.65, 258.46, 248.55, 284.79, 312.15, 345.87, 365, 410.24, 419.44, 383.5, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 766.58, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1251.06] },
      velocityScore: { '1D': -2.3, '1W': -10.2, '1M': 5.5, '6M': null }, isNew: false,
      marketCap: '$1.4T', pe: 28.3, revenueGrowth: 196, eps: 44.25, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { AIS: 6.78, ARTY: 5.01, BAI: 6.31, IGPT: 8.09, IVES: 5.1, ALAI: 1.24, CHAT: 3.99, AIFD: 6.95, SPRX: false, AOTG: 11.99 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 9, avgWeight: 5.52, proScore: 4.96, coverage: 0.9,
      price: 547.53, weeklyPrices: [537.37, 551.63, 519.85, 519.74, 547.53], weeklyChange: 1.89, dayChange: 5.49, sortRank: 0, periodReturns: { '1M': 8.7, 'YTD': 155.7, '6M': 154.6, '1Y': 281.8 },
      priceHistory: { '1D': [519.05, 546.18, 547.53], '1W': [537.37, 551.63, 519.85, 519.74, 547.53], '1M': [503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 547.53], 'YTD': [214.16, 204.68, 227.92, 253.73, 252.18, 192.5, 205.94, 200.15, 203.68, 199.45, 197.74, 205.27, 203.77, 210.21, 236.64, 278.26, 305.33, 354.49, 421.39, 445.5, 447.58, 518.09, 523.2, 452.4, 512.48, 547.53], '6M': [214.99, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 203.08, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 448.29, 414.05, 495.54, 542.52, 452.4, 512.48, 547.53], '1Y': [143.4, 138.52, 144.16, 160.41, 162.12, 176.31, 172.4, 184.42, 165.2, 167.13, 161.79, 155.67, 157.92, 161.27, 169.73, 232.89, 234.56, 234.99, 254.84, 237.7, 258.89, 223.55, 214.24, 215.98, 221.43, 201.06, 214.99, 221.08, 207.69, 231.92, 252.03, 242.11, 216, 203.08, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 448.29, 414.05, 495.54, 542.52, 452.4, 512.48, 547.53] },
      velocityScore: { '1D': 1.8, '1W': -0.4, '1M': -1.8, '6M': null }, isNew: false,
      marketCap: '$893B', pe: 181.9, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.67, ARTY: 4.8, BAI: 4.83, IGPT: 8.18, IVES: 4.81, ALAI: 1.25, CHAT: 4, AIFD: false, SPRX: 0.53, AOTG: 16.58 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 8, avgWeight: 3.62, proScore: 2.9, coverage: 0.8,
      price: 386.39, weeklyPrices: [411.35, 392.13, 380.15, 382.07, 386.39], weeklyChange: -6.07, dayChange: 1.13, sortRank: 0, periodReturns: { '1M': -8.4, 'YTD': 11.6, '6M': 10.3, '1Y': 46 },
      priceHistory: { '1D': [382.08, 385.67, 386.39], '1W': [411.35, 392.13, 380.15, 382.07, 386.39], '1M': [422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 386.39], 'YTD': [346.1, 332.48, 343.02, 325.49, 330.73, 310.51, 331.17, 332.65, 321.7, 332.77, 335.97, 319.84, 309.42, 313.49, 354.91, 398.47, 419.94, 417.43, 425.44, 416.79, 417.76, 426.58, 418.91, 372.1, 392.9, 386.39], '6M': [352.13, 343.42, 352.21, 332.6, 332.79, 320.33, 340.44, 332.54, 325.49, 313.84, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 419.3, 411.07, 421.86, 479.23, 372.1, 392.9, 386.39], '1Y': [264.65, 269.9, 275.4, 286.45, 288.71, 293.7, 303.76, 309.09, 291.17, 300.25, 306.1, 359.63, 345.35, 336.1, 338.18, 345.02, 354.15, 344.29, 376.47, 355.59, 355.22, 354.42, 397.57, 381.03, 406.37, 329.88, 352.13, 343.42, 352.21, 332.6, 332.79, 320.33, 343.94, 332.54, 325.49, 313.84, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 419.3, 411.07, 421.86, 479.23, 372.1, 392.9, 386.39] },
      velocityScore: { '1D': 3.6, '1W': 5.8, '1M': -11, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 64.4, revenueGrowth: 48, eps: 6, grossMargin: 76, dividendYield: 0.68,
      etfPresence: { AIS: 0.65, ARTY: 4.4, BAI: 4.18, IGPT: false, IVES: 4.87, ALAI: 3.94, CHAT: 4.06, AIFD: 5.38, SPRX: false, AOTG: 1.48 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 7, avgWeight: 3.68, proScore: 2.58, coverage: 0.7,
      price: 287.09, weeklyPrices: [310.58, 307.86, 279.04, 276.70, 287.09], weeklyChange: -7.56, dayChange: 3.76, sortRank: 0, periodReturns: { '1M': 37.9, 'YTD': 237.8, '6M': 231.9, '1Y': 278.1 },
      priceHistory: { '1D': [276.69, 286.14, 287.09], '1W': [310.58, 307.86, 279.04, 276.7, 287.09], '1M': [208.26, 198.7, 204.83, 205, 219.43, 290.79, 301.65, 316.43, 263.47, 288.85, 252.59, 280.71, 279.7, 308.88, 278.67, 289.54, 310.58, 307.86, 279.04, 276.7, 287.09], 'YTD': [84.98, 83.45, 80.38, 83.1, 81.34, 74.21, 78.23, 79.48, 79.29, 75.68, 87.67, 89.53, 97.68, 106.71, 119.93, 133.37, 165.56, 165.15, 172.15, 177.95, 186.8, 204.83, 316.43, 252.59, 289.54, 287.09], '6M': [86.34, 90.23, 82.89, 79.8, 82.93, 75.54, 82.01, 79.01, 78.39, 77.51, 93.3, 90.79, 92.36, 99.05, 114.45, 134.6, 157.32, 156.57, 172.15, 164.5, 176.27, 198.7, 301.65, 252.59, 289.54, 287.09], '1Y': [75.93, 74.25, 73.36, 72.01, 74.04, 80.37, 75.85, 79.32, 71.22, 74.79, 64.1, 66.59, 74.23, 83.81, 86.2, 90.68, 88.23, 82.77, 88.57, 93.33, 89.33, 81.32, 87.72, 98.19, 89.43, 84.47, 86.34, 90.23, 82.89, 79.8, 82.93, 75.54, 82.35, 79.01, 78.39, 77.51, 93.3, 90.79, 92.36, 99.05, 114.45, 134.6, 157.32, 156.57, 172.15, 164.5, 176.27, 198.7, 301.65, 252.59, 289.54, 287.09] },
      velocityScore: { '1D': -3.4, '1W': -5.5, '1M': 10.3, '6M': null }, isNew: false,
      marketCap: '$251B', pe: 98.7, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.09,
      etfPresence: { AIS: 3.98, ARTY: 4.32, BAI: 1.93, IGPT: 3.56, IVES: false, ALAI: false, CHAT: 1.5, AIFD: 6.18, SPRX: 4.31, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'ANET', name: 'Arista Networks Inc', easyScore: 7, avgWeight: 2.11, proScore: 1.48, coverage: 0.7,
      price: 167.07, weeklyPrices: [169.67, 174.56, 162.20, 161.74, 167.07], weeklyChange: -1.53, dayChange: 3.19, sortRank: 0, periodReturns: { '1M': 5.7, 'YTD': 27.5, '6M': 27.8, '1Y': 73.5 },
      priceHistory: { '1D': [161.91, 167.38, 167.07], '1W': [169.67, 174.56, 162.2, 161.74, 167.07], '1M': [158.01, 154.31, 155.27, 159.47, 170.68, 175.33, 174.37, 166.01, 154.27, 156.4, 151.76, 156.4, 163.24, 169.09, 168.01, 164.93, 169.67, 174.56, 162.2, 161.74, 167.07], 'YTD': [131.03, 123.72, 130.59, 138.41, 148.15, 128.67, 135.12, 132.79, 130.25, 139.4, 134.03, 136.26, 122.55, 124.85, 146.05, 161.01, 172.55, 172.71, 147.06, 140.69, 140.49, 155.27, 166.01, 151.76, 164.93, 167.07], '6M': [131.84, 137.19, 123.42, 127.52, 146.69, 139.39, 143.45, 142.58, 128.77, 124.6, 139.62, 133.07, 130.8, 122.78, 145.07, 154.33, 177.73, 168.68, 147.06, 142.54, 141.58, 154.31, 174.37, 151.76, 164.93, 167.07], '1Y': [96.31, 101.13, 106.29, 111.98, 114.04, 123.22, 139.28, 138.01, 131.47, 133.27, 141.17, 153.04, 146.66, 143.06, 144.46, 158.23, 146.01, 152.76, 158.44, 134.02, 134.98, 124.81, 127.65, 128.55, 134.39, 124.62, 131.84, 137.19, 123.42, 127.52, 146.69, 139.39, 141.74, 142.58, 128.77, 124.6, 139.62, 133.07, 130.8, 122.78, 145.07, 154.33, 177.73, 168.68, 147.06, 142.54, 141.58, 154.31, 174.37, 151.76, 164.93, 167.07] },
      velocityScore: { '1D': 10.4, '1W': 10.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$210B', pe: 57.4, revenueGrowth: 35, eps: 2.91, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: 1.39, ARTY: 2.37, BAI: 1.36, IGPT: false, IVES: false, ALAI: 0.96, CHAT: 2.14, AIFD: 4.96, SPRX: 1.59, AOTG: false },
      tonyNote: 'Arista Networks Inc appears in 7 of 10 AI & ML ETFs (70% coverage) with average weight 2.1% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 6, avgWeight: 4.9, proScore: 2.94, coverage: 0.6,
      price: 450.55, weeklyPrices: [462.12, 467.67, 436.39, 440.83, 450.55], weeklyChange: -2.5, dayChange: 2.21, sortRank: 0, periodReturns: { '1M': 9.3, 'YTD': 48.3, '6M': 50.8, '1Y': 102.3 },
      priceHistory: { '1D': [440.8, 450.44, 450.55], '1W': [462.12, 467.67, 436.39, 440.83, 450.55], '1M': [412.32, 422.73, 424.86, 418.45, 435.63, 446.69, 436.69, 444.92, 415.17, 426.8, 408.75, 421.07, 423.93, 441.4, 425.83, 432.15, 462.12, 467.67, 436.39, 440.83, 450.55], 'YTD': [303.89, 318.01, 341.64, 327.37, 339.55, 330.73, 368.1, 370.54, 376.81, 353.86, 336.71, 338.79, 326.11, 341.49, 365.49, 363.35, 382.66, 396.06, 419.5, 399.8, 401.62, 424.86, 444.92, 408.75, 432.15, 450.55], '6M': [302.84, 322.25, 331.77, 327.16, 338.34, 335.75, 361.91, 364.2, 385.75, 353.13, 347.09, 345.98, 343.25, 337.95, 365.9, 375.1, 387.44, 393.83, 419.5, 397.28, 392.61, 422.73, 436.69, 408.75, 432.15, 450.55], '1Y': [222.74, 233.6, 229.76, 245.6, 241.6, 241.62, 242.62, 241.44, 228.6, 239.29, 235.21, 258.91, 268.64, 276.66, 288.11, 299.88, 299.84, 290.73, 303.22, 289.24, 290.62, 282.37, 289.96, 292.93, 304.85, 284.68, 302.84, 322.25, 331.77, 327.16, 338.34, 335.75, 355.41, 364.2, 385.75, 353.13, 347.09, 345.98, 343.25, 337.95, 365.9, 375.1, 387.44, 393.83, 419.5, 397.28, 392.61, 422.73, 436.69, 408.75, 432.15, 450.55] },
      velocityScore: { '1D': 1.4, '1W': 3.5, '1M': -3.9, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 38.9, revenueGrowth: 35, eps: 11.59, grossMargin: 62, dividendYield: 0.86,
      etfPresence: { AIS: 3.22, ARTY: false, BAI: 4.39, IGPT: false, IVES: 5.1, ALAI: 5.68, CHAT: false, AIFD: 3.39, SPRX: false, AOTG: 7.64 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 4.84, proScore: 2.9, coverage: 0.6,
      price: 336.39, weeklyPrices: [368.03, 349.68, 346.13, 345.29, 336.39], weeklyChange: -8.6, dayChange: -2.57, sortRank: 0, periodReturns: { '1M': -13.5, 'YTD': 7.5, '6M': 7.1, '1Y': 97.1 },
      priceHistory: { '1D': [345.28, 336.38, 336.39], '1W': [368.03, 349.68, 346.13, 345.29, 336.39], '1M': [388.88, 388.83, 390.13, 380.34, 376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 356.38, 357.77, 359.68, 369.35, 373.25, 363.79, 368.03, 349.68, 346.13, 345.29, 336.39], 'YTD': [313, 325.44, 332.78, 330.54, 338.25, 331.25, 309, 314.98, 307.38, 300.88, 303.55, 307.13, 280.92, 297.39, 318.49, 336.02, 338.89, 384.8, 398.04, 402.62, 388.91, 390.13, 372.19, 356.38, 363.79, 336.39], '6M': [313.51, 316.54, 331.86, 322, 334.55, 339.71, 318.58, 302.02, 310.9, 303.58, 307.04, 310.92, 290.44, 287.56, 317.32, 337.12, 339.32, 349.94, 398.04, 387.35, 387.66, 388.83, 358.99, 356.38, 363.79, 336.39], '1Y': [170.68, 178.64, 177.62, 183.58, 192.17, 191.9, 196.52, 201.96, 199.32, 207.48, 232.3, 240.37, 252.03, 245.79, 245.69, 241.53, 251.46, 253.08, 281.48, 284.75, 286.71, 292.81, 319.95, 317.62, 312.43, 302.46, 313.51, 316.54, 331.86, 322, 334.55, 339.71, 324.32, 302.02, 310.9, 303.58, 307.04, 310.92, 290.44, 287.56, 317.32, 337.12, 339.32, 349.94, 398.04, 387.35, 387.66, 388.83, 358.99, 356.38, 363.79, 336.39] },
      velocityScore: { '1D': 0.3, '1W': 2.8, '1M': -23.5, '6M': null }, isNew: false,
      marketCap: '$4.1T', pe: 25.6, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.15, IGPT: 7.42, IVES: 4.7, ALAI: false, CHAT: 5.04, AIFD: 4.89, SPRX: false, AOTG: 3.81 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 5, avgWeight: 3.97, proScore: 1.98, coverage: 0.5,
      price: 226.22, weeklyPrices: [244.39, 232.79, 234.11, 234.27, 226.22], weeklyChange: -7.43, dayChange: -3.48, sortRank: 0, periodReturns: { '1M': -14.7, 'YTD': -2, '6M': -2.7, '1Y': 6.7 },
      priceHistory: { '1D': [234.37, 226.23, 226.22], '1W': [244.39, 232.79, 234.11, 234.27, 226.22], '1M': [265.29, 271.85, 274, 270.64, 261.26, 256.52, 250.02, 253.79, 246.03, 245.22, 238, 241.51, 238.55, 246.02, 246, 237.5, 244.39, 232.79, 234.11, 234.27, 226.22], 'YTD': [230.82, 246.29, 238.18, 234.34, 241.73, 222.69, 199.6, 210.11, 207.92, 218.94, 209.53, 208.76, 207.54, 210.57, 233.65, 249.7, 255.08, 265.06, 274.99, 270.13, 265.01, 274, 253.79, 238, 237.5, 226.22], '6M': [232.52, 233.06, 246.47, 231, 244.68, 238.62, 206.96, 201.15, 208.56, 208.73, 214.33, 215.2, 207.24, 208.27, 221.25, 248.5, 255.36, 263.04, 274.99, 265.82, 259.34, 271.85, 250.02, 238, 237.5, 226.22], '1Y': [211.99, 219.92, 222.26, 223.88, 232.23, 234.11, 223.13, 224.56, 223.81, 229.12, 235.68, 229.95, 231.23, 218.15, 222.41, 227.74, 214.47, 221.09, 222.86, 243.04, 244.2, 222.69, 229.16, 229.11, 230.28, 226.76, 232.52, 233.06, 246.47, 231, 244.68, 238.62, 208.72, 201.15, 208.56, 208.73, 214.33, 215.2, 207.24, 208.27, 221.25, 248.5, 255.36, 263.04, 274.99, 265.82, 259.34, 271.85, 250.02, 238, 237.5, 226.22] },
      velocityScore: { '1D': 26.1, '1W': -0.5, '1M': -34.4, '6M': null }, isNew: false,
      marketCap: '$2.4T', pe: 30.6, revenueGrowth: 17, eps: 7.4, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 4.83, ALAI: 5.49, CHAT: 2.31, AIFD: 3.38, SPRX: false, AOTG: 3.82 },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 5, avgWeight: 3.86, proScore: 1.93, coverage: 0.5,
      price: 544.59, weeklyPrices: [577.22, 563.85, 562.20, 557.67, 544.59], weeklyChange: -5.65, dayChange: -2.37, sortRank: 0, periodReturns: { '1M': -11.1, 'YTD': -17.5, '6M': -18.4, '1Y': -23.2 },
      priceHistory: { '1D': [557.8, 544.8, 544.59], '1W': [577.22, 563.85, 562.2, 557.67, 544.59], '1M': [612.34, 635.26, 635.29, 632.51, 600.47, 597.63, 622.98, 627.57, 593, 585.39, 570.98, 568.43, 566.98, 593.48, 600.21, 567.58, 577.22, 563.85, 562.2, 557.67, 544.59], 'YTD': [660.09, 646.06, 620.8, 647.63, 738.31, 670.21, 649.81, 655.66, 657.01, 660.57, 638.18, 606.7, 547.54, 579.23, 628.39, 676.87, 659.15, 611.91, 612.88, 616.63, 605.06, 635.29, 627.57, 570.98, 567.58, 544.59], '6M': [663.29, 658.79, 641.97, 604.12, 672.97, 691.7, 670.72, 639.29, 639.3, 655.08, 654.07, 622.66, 592.92, 572.13, 612.42, 671.58, 674.72, 669.12, 612.88, 603, 602.61, 635.26, 622.98, 570.98, 567.58, 544.59], '1Y': [708.68, 713.57, 727.24, 701.41, 714.8, 773.44, 761.83, 780.08, 747.72, 747.38, 748.65, 750.9, 780.25, 748.91, 727.05, 733.51, 712.07, 734, 666.47, 618.94, 609.01, 590.32, 633.61, 661.53, 652.71, 664.45, 663.29, 658.79, 641.97, 604.12, 672.97, 691.7, 677.22, 639.29, 639.3, 655.08, 654.07, 622.66, 592.92, 572.13, 612.42, 671.58, 674.72, 669.12, 612.88, 603, 602.61, 635.26, 622.98, 570.98, 567.58, 544.59] },
      velocityScore: { '1D': 0, '1W': 20.6, '1M': -29.8, '6M': null }, isNew: false,
      marketCap: '$1.4T', pe: 19.8, revenueGrowth: 33, eps: 27.49, grossMargin: 82, dividendYield: 0.38,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: 7.55, IVES: 4.72, ALAI: 3.93, CHAT: 2.02, AIFD: false, SPRX: false, AOTG: 1.07 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 5, avgWeight: 3.45, proScore: 1.73, coverage: 0.5,
      price: 422.33, weeklyPrices: [417.07, 439.66, 397.02, 399.92, 422.33], weeklyChange: 1.26, dayChange: 5.6, sortRank: 0, periodReturns: { '1M': 32.5, 'YTD': 153.9, '6M': 148.5, '1Y': 371.2 },
      priceHistory: { '1D': [399.92, 419.74, 422.33], '1W': [417.07, 439.66, 397.02, 399.92, 422.33], '1M': [318.72, 325.33, 349.17, 342.85, 320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 330.86, 367.47, 367.15, 389.2, 361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 422.33], 'YTD': [166.36, 156.73, 174.45, 176.35, 160.46, 142.82, 126.58, 129.68, 124.67, 120, 119.9, 126.16, 113.61, 106.33, 129.46, 170.81, 197.54, 194.74, 213.91, 224.09, 287.48, 349.17, 358.05, 330.86, 374.68, 422.33], '6M': [167.26, 167.11, 172.57, 183.75, 170.93, 158.52, 182.86, 123.69, 128.4, 109.8, 116.48, 127.57, 121.76, 109.6, 125.46, 172.09, 194.06, 196.85, 213.91, 204.42, 244.26, 325.33, 363.54, 330.86, 374.68, 422.33], '1Y': [89.63, 88.57, 97.02, 97.95, 121.68, 136.73, 170.89, 193.64, 172.45, 179.2, 187.95, 232.9, 251.88, 200.64, 209.6, 225.43, 163.55, 163.64, 169.55, 162.83, 157.79, 142.01, 154.22, 152.51, 173.7, 145.88, 167.26, 167.11, 172.57, 183.75, 170.93, 158.52, 187.67, 123.69, 128.4, 109.8, 116.48, 127.57, 121.76, 109.6, 125.46, 172.09, 194.06, 196.85, 213.91, 204.42, 244.26, 325.33, 363.54, 330.86, 374.68, 422.33] },
      velocityScore: { '1D': 10.2, '1W': 10.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$72B', pe: 285.4, revenueGrowth: 93, eps: 1.48, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 2.04, ARTY: 1.34, BAI: false, IGPT: false, IVES: false, ALAI: 1.18, CHAT: 2.81, AIFD: false, SPRX: 9.9, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.44, proScore: 1.72, coverage: 0.5,
      price: 360.34, weeklyPrices: [379.40, 367.34, 373.94, 365.46, 360.34], weeklyChange: -5.02, dayChange: -1.4, sortRank: 0, periodReturns: { '1M': -13.4, 'YTD': -25.5, '6M': -26.2, '1Y': -26.8 },
      priceHistory: { '1D': [365.44, 359.96, 360.34], '1W': [379.4, 367.34, 373.94, 365.46, 360.34], '1M': [416.03, 412.67, 426.99, 450.24, 460.52, 441.31, 427.34, 428.05, 416.67, 411.74, 397.36, 390.34, 390.74, 399.76, 393.83, 378.91, 379.4, 367.34, 373.94, 365.46, 360.34], 'YTD': [483.62, 478.11, 456.66, 451.14, 433.5, 393.67, 401.84, 397.23, 401.72, 410.68, 401.86, 389.02, 365.97, 369.37, 373.07, 420.26, 415.75, 407.78, 413.96, 405.21, 421.06, 426.99, 428.05, 397.36, 378.91, 360.34], '6M': [487.71, 472.85, 477.18, 454.52, 480.58, 411.21, 413.27, 396.86, 389, 403.93, 405.76, 399.41, 372.74, 370.17, 374.33, 411.22, 432.92, 424.46, 413.96, 407.77, 417.42, 412.67, 427.34, 397.36, 378.91, 360.34], '1Y': [492.27, 491.09, 501.48, 511.7, 510.88, 533.5, 520.84, 520.58, 505.72, 506.74, 507.97, 501.01, 508.45, 507.03, 515.74, 522.4, 511.61, 520.56, 525.76, 497.1, 511.14, 487.12, 485.5, 480.84, 483.47, 483.98, 487.71, 472.85, 477.18, 454.52, 480.58, 411.21, 413.6, 396.86, 389, 403.93, 405.76, 399.41, 372.74, 370.17, 374.33, 411.22, 432.92, 424.46, 413.96, 407.77, 417.42, 412.67, 427.34, 397.36, 378.91, 360.34] },
      velocityScore: { '1D': -1.7, '1W': 1.8, '1M': -33.3, '6M': null }, isNew: false,
      marketCap: '$2.7T', pe: 21.5, revenueGrowth: 18, eps: 16.77, grossMargin: 68, dividendYield: 1,
      etfPresence: { AIS: false, ARTY: 2.38, BAI: false, IGPT: false, IVES: 4.64, ALAI: 4.83, CHAT: 2.05, AIFD: false, SPRX: false, AOTG: 3.28 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 5, avgWeight: 2.71, proScore: 1.36, coverage: 0.5,
      price: 881.57, weeklyPrices: [850.00, 893.93, 827.92, 842.53, 881.57], weeklyChange: 3.71, dayChange: 4.58, sortRank: 0, periodReturns: { '1M': -3.2, 'YTD': 139.2, '6M': 122.7, '1Y': 860.6 },
      priceHistory: { '1D': [842.95, 883.16, 881.57], '1W': [850, 893.93, 827.92, 842.53, 881.57], '1M': [910.81, 902.31, 860.62, 854.96, 905, 1029.15, 938, 945.08, 863.66, 895.4, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93, 827.92, 842.53, 881.57], 'YTD': [368.59, 348.26, 343.27, 354.49, 381.44, 504.42, 583.46, 667.77, 677, 650.82, 616.09, 772.13, 688.8, 764.65, 894.13, 891.22, 846.89, 902.32, 944.28, 1030.37, 868.07, 860.62, 945.08, 853.26, 869.98, 881.57], '6M': [390.77, 357.05, 339.87, 356.83, 370.66, 435.1, 561.13, 600.42, 688.27, 694.43, 672, 649.56, 801.99, 702.76, 896.02, 824.01, 873.6, 858.32, 944.28, 992.37, 890.09, 902.31, 938, 853.26, 869.98, 881.57], '1Y': [91.77, 91.24, 92.62, 102.64, 102.85, 110.08, 111.13, 120.23, 115.89, 125.84, 141.91, 164.88, 171.5, 159.11, 169.75, 159.76, 163.23, 168.5, 200.13, 239.68, 253.81, 268.92, 308.28, 327.85, 372.09, 337.13, 390.77, 357.05, 339.87, 356.83, 370.66, 435.1, 577.15, 600.42, 688.27, 694.43, 672, 649.56, 801.99, 702.76, 896.02, 824.01, 873.6, 858.32, 944.28, 992.37, 890.09, 902.31, 938, 853.26, 869.98, 881.57] },
      velocityScore: { '1D': 1.5, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$69B', pe: 156.3, revenueGrowth: 90, eps: 5.64, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.58, IGPT: false, IVES: false, ALAI: 0.51, CHAT: 1.39, AIFD: 5.76, SPRX: 3.33, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 5 of 10 AI & ML ETFs (50% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 5, avgWeight: 2.62, proScore: 1.31, coverage: 0.5,
      price: 706.9, weeklyPrices: [746.23, 732.62, 670.75, 643.83, 706.90], weeklyChange: -5.27, dayChange: 9.7, sortRank: 0, periodReturns: { '1M': 34.7, 'YTD': 310.3, '6M': 293.7, '1Y': 1030.1 },
      priceHistory: { '1D': [644.38, 697.82, 706.9], '1W': [746.23, 732.62, 670.75, 643.83, 706.9], '1M': [524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 706.9], 'YTD': [172.27, 187.68, 222.1, 243.29, 278.41, 260.19, 284.1, 285.52, 282.25, 259.03, 261.18, 316.93, 273.35, 297.73, 337.88, 361.69, 403.12, 434.52, 483.15, 494.09, 459.62, 531.18, 575.5, 490.09, 712.13, 706.9], '6M': [181.54, 187.88, 212.14, 222.97, 252.66, 290.24, 262.56, 284.11, 270.57, 250.61, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 488.74, 455.8, 530.6, 594.11, 490.09, 712.13, 706.9], '1Y': [62.55, 65.78, 65.06, 67.02, 69.02, 78.69, 74.44, 76.07, 75.64, 80.67, 90.49, 96.15, 105.15, 107.21, 131.26, 119.7, 125.92, 125.72, 138.13, 163.6, 166.11, 153.97, 157.74, 161, 187.2, 175.01, 181.54, 187.88, 212.14, 222.97, 252.66, 290.24, 285.99, 284.11, 270.57, 250.61, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 488.74, 455.8, 530.6, 594.11, 490.09, 712.13, 706.9] },
      velocityScore: { '1D': -6.4, '1W': -29.2, '1M': -31.1, '6M': null }, isNew: false,
      marketCap: '$244B', pe: 42.2, revenueGrowth: 46, eps: 16.74, grossMargin: 45, dividendYield: 0.09,
      etfPresence: { AIS: 1.43, ARTY: 3.02, BAI: 3.39, IGPT: false, IVES: false, ALAI: 4.43, CHAT: false, AIFD: false, SPRX: false, AOTG: 0.85 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 5, avgWeight: 2.51, proScore: 1.26, coverage: 0.5,
      price: 335.26, weeklyPrices: [333.05, 357.96, 318.32, 316.43, 335.26], weeklyChange: 0.66, dayChange: 5.94, sortRank: 0, periodReturns: { '1M': 3.5, 'YTD': 106.9, '6M': 100.9, '1Y': 175.6 },
      priceHistory: { '1D': [316.46, 335.22, 335.26], '1W': [333.05, 357.96, 318.32, 316.43, 335.26], '1M': [323.91, 319.78, 314.18, 315.71, 323.39, 334.49, 331.44, 323.92, 300.51, 300.57, 280.98, 297.88, 302.87, 311.93, 299.6, 317.58, 333.05, 357.96, 318.32, 316.43, 335.26], 'YTD': [162.01, 160.78, 172.54, 181.12, 195.1, 177.75, 236.51, 243.75, 259.23, 249.75, 265.38, 269.17, 252.4, 259.37, 287.64, 294.13, 321.75, 328.49, 358.92, 369.99, 315.67, 314.18, 323.92, 280.98, 317.58, 335.26], '6M': [167.58, 173.95, 170.03, 175.18, 189.21, 190.15, 199.62, 243.53, 253.15, 244.44, 270.06, 268.41, 270.89, 250.58, 281.03, 301.16, 305.14, 306.18, 358.92, 367.13, 322.63, 319.78, 331.44, 280.98, 317.58, 335.26], '1Y': [121.64, 124.33, 120.72, 131.12, 130.87, 145.6, 139.39, 137.4, 127.54, 129.31, 125.7, 135.71, 141.96, 139.77, 161.64, 168.88, 177.82, 183.2, 193.76, 183.02, 173.37, 170.65, 172.02, 182.54, 178.66, 154.39, 167.58, 173.95, 170.03, 175.18, 189.21, 190.15, 202, 243.53, 253.15, 244.44, 270.06, 268.41, 270.89, 250.58, 281.03, 301.16, 305.14, 306.18, 358.92, 367.13, 322.63, 319.78, 331.44, 280.98, 317.58, 335.26] },
      velocityScore: { '1D': 3.3, '1W': 9.6, '1M': -37, '6M': null }, isNew: false,
      marketCap: '$129B', pe: 84, revenueGrowth: 30, eps: 3.99, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 3.57, ARTY: false, BAI: 1.91, IGPT: false, IVES: false, ALAI: false, CHAT: 2.22, AIFD: 4.2, SPRX: false, AOTG: 0.67 },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 5, avgWeight: 2.36, proScore: 1.18, coverage: 0.5,
      price: 2277.11, weeklyPrices: [2184.75, 2273.73, 1963.60, 1914.46, 2277.11], weeklyChange: 4.23, dayChange: 18.51, sortRank: 0, periodReturns: { '1M': 43.3, 'YTD': 859.3, '6M': 810.6, '1Y': 4719.3 },
      priceHistory: { '1D': [1921.41, 2263.5, 2277.11], '1W': [2184.75, 2273.73, 1963.6, 1914.46, 2277.11], '1M': [1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2277.11], 'YTD': [237.38, 334.54, 409.24, 503.44, 539.3, 576.2, 630.29, 649.97, 651.9, 565.59, 618.82, 772.09, 603.17, 692.73, 851.57, 919.47, 932.43, 1096.51, 1409.98, 1447.23, 1392.56, 1641.64, 1759.68, 1643.23, 1958.8, 2277.11], '6M': [250.05, 274.08, 389.27, 453.12, 481.43, 695.51, 541.64, 590.59, 638.52, 565.41, 618.89, 720.17, 702.48, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1452.02, 1383.29, 1589.94, 1831.5, 1643.23, 1958.8, 2277.11], '1Y': [47.25, 46.21, 46.95, 41.52, 42.06, 42.92, 40.69, 47.01, 44.4, 48.44, 62.5, 84.3, 98.87, 94.29, 124.14, 129.68, 144.27, 167.05, 195.82, 207.69, 283.1, 245.96, 215.04, 213.31, 241.61, 219.46, 250.05, 274.08, 389.27, 453.12, 481.43, 695.51, 583.4, 590.59, 638.52, 565.41, 618.89, 720.17, 702.48, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1452.02, 1383.29, 1589.94, 1831.5, 1643.23, 1958.8, 2277.11] },
      velocityScore: { '1D': -0.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$337B', pe: 77.7, revenueGrowth: 251, eps: 29.29, grossMargin: 56, dividendYield: null,
      etfPresence: { AIS: 2.14, ARTY: false, BAI: 2.91, IGPT: 4.17, IVES: false, ALAI: 0.5, CHAT: false, AIFD: false, SPRX: false, AOTG: 2.08 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'CRDO', name: 'Credo Technology Group Holding Ltd', easyScore: 5, avgWeight: 2.06, proScore: 1.03, coverage: 0.5,
      price: 283.22, weeklyPrices: [271.83, 302.52, 272.01, 268.99, 283.22], weeklyChange: 4.19, dayChange: 5.21, sortRank: 0, periodReturns: { '1M': 27.8, 'YTD': 96.8, '6M': 88.6, '1Y': 207.2 },
      priceHistory: { '1D': [269.2, 282.57, 283.22], '1W': [271.83, 302.52, 272.01, 268.99, 283.22], '1M': [221.64, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 217.5, 206.89, 222.27, 237.68, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 283.22], 'YTD': [143.89, 141.59, 149.12, 135.1, 129.47, 98.06, 121.78, 124.06, 114.48, 114.74, 111.57, 107.09, 96.44, 95.92, 107.93, 158.93, 185.54, 174.01, 198.29, 189.36, 182.98, 222.35, 217.5, 237.68, 249.33, 283.22], '6M': [144.83, 140.24, 156.07, 153.22, 129.57, 111.31, 134.72, 124.8, 120.83, 97.3, 112.33, 104.06, 100.3, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 198.57, 168.99, 221.23, 214.6, 237.68, 249.33, 283.22], '1Y': [92.2, 89.37, 97.29, 98.45, 101.17, 111.55, 119.78, 121.13, 105.99, 122.73, 134, 159.32, 172.31, 144.94, 149.63, 151.15, 136.53, 150.97, 166.62, 162.74, 160.34, 141.88, 164.01, 180.92, 154.47, 138.57, 144.83, 140.24, 156.07, 153.22, 129.57, 111.31, 123.41, 124.8, 120.83, 97.3, 112.33, 104.06, 100.3, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 198.57, 168.99, 221.23, 214.6, 237.68, 249.33, 283.22] },
      velocityScore: { '1D': null, '1W': 13.2, '1M': null, '6M': null }, isNew: true,
      marketCap: '$53B', pe: 113.3, revenueGrowth: 157, eps: 2.5, grossMargin: 68, dividendYield: null,
      etfPresence: { AIS: 1.11, ARTY: 1.31, BAI: 2.2, IGPT: false, IVES: false, ALAI: false, CHAT: 2.33, AIFD: false, SPRX: 3.34, AOTG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'ARM', name: 'ARM Holdings PLC', easyScore: 4, avgWeight: 3.26, proScore: 1.3, coverage: 0.4,
      price: 367.49, weeklyPrices: [439.46, 407.72, 366.39, 359.08, 367.49], weeklyChange: -16.38, dayChange: 2.33, sortRank: 0, periodReturns: { '1M': 14.4, 'YTD': 236.2, '6M': 229.4, '1Y': 133.6 },
      priceHistory: { '1D': [359.12, 367.21, 367.49], '1W': [439.46, 407.72, 366.39, 359.08, 367.49], '1M': [321.22, 302.71, 335.27, 353.29, 408.85, 402.71, 411.83, 393.44, 342.93, 346.39, 307.43, 342.23, 380.81, 412.55, 396.34, 418.88, 439.46, 407.72, 366.39, 359.08, 367.49], 'YTD': [109.31, 113.08, 105.11, 119.2, 108.43, 110.88, 122.19, 125.58, 129.26, 120.62, 115.12, 129.82, 154.8, 155.07, 149.79, 162.33, 204.61, 210.32, 237.3, 221.21, 256.73, 335.27, 393.44, 307.43, 418.88, 367.49], '6M': [110.27, 116.11, 111.14, 107.17, 114.88, 104.55, 125.95, 126.89, 128.14, 121.72, 120.55, 127.31, 134.96, 151.28, 148.91, 159.34, 196.57, 201.69, 237.3, 207.92, 223.15, 302.71, 411.83, 307.43, 418.88, 367.49], '1Y': [157.31, 154.63, 148.55, 157.18, 159.99, 141.38, 135.57, 141.6, 131.16, 140.66, 135.48, 154.7, 146.54, 140.65, 152.15, 170.66, 171.19, 166.6, 165.45, 158.25, 148.75, 136.99, 132.61, 140.49, 136.14, 113.51, 110.27, 116.11, 111.14, 107.17, 114.88, 104.55, 124.61, 126.89, 128.14, 121.72, 120.55, 127.31, 134.96, 151.28, 148.91, 159.34, 196.57, 201.69, 237.3, 207.92, 223.15, 302.71, 411.83, 307.43, 418.88, 367.49] },
      velocityScore: { '1D': -9.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$393B', pe: 427.3, revenueGrowth: 20, eps: 0.86, grossMargin: 98, dividendYield: null,
      etfPresence: { AIS: 1.95, ARTY: false, BAI: false, IGPT: false, IVES: false, ALAI: 0.18, CHAT: 2.7, AIFD: false, SPRX: 8.2, AOTG: false },
      tonyNote: 'Arm Holdings is held across Broad Tech and AI ETFs as the CPU architecture licensor embedded in every mobile device and increasingly in AI inference chips and data center CPUs. Revenue grew and the royalty model is high-margin; the weight score reflects consistent institutional positioning as the AI chip design ecosystem expands on Arm cores.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 4, avgWeight: 3.24, proScore: 1.3, coverage: 0.4,
      price: 140.19, weeklyPrices: [133.99, 140.94, 132.28, 131.65, 140.19], weeklyChange: 4.63, dayChange: 6.28, sortRank: 0, periodReturns: { '1M': 13.5, 'YTD': 279.9, '6M': 287.7, '1Y': 531.5 },
      priceHistory: { '1D': [131.91, 140.29, 140.19], '1W': [133.99, 140.94, 132.28, 131.65, 140.19], '1M': [123.52, 121.77, 120.89, 114.68, 109.33, 107.93, 112.71, 111.78, 99.17, 110.27, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 140.19], 'YTD': [36.9, 41.11, 48.32, 54.32, 48.66, 48.24, 46.48, 44.11, 45.46, 45.95, 45.25, 46.18, 44.1, 48.03, 61.72, 68.5, 66.78, 94.48, 113.01, 120.29, 118.96, 120.89, 111.78, 107.04, 121.1, 140.19], '6M': [36.2, 39.37, 44.06, 48.56, 43.93, 49.25, 47.13, 46.18, 46.12, 43.1, 46.78, 44.06, 44.06, 44.13, 58.95, 64.94, 65.27, 94.75, 113.01, 120.61, 110.8, 121.77, 112.71, 107.04, 121.1, 140.19], '1Y': [22.2, 21.88, 23.82, 22.8, 22.63, 19.8, 19.77, 22.22, 23.54, 24.85, 24.61, 24.61, 30.57, 33.99, 37.3, 37.8, 36.84, 38.16, 40.16, 37.24, 37.89, 35.11, 36.81, 40.5, 39.51, 36.28, 36.2, 39.37, 44.06, 48.56, 43.93, 49.25, 50.24, 46.18, 46.12, 43.1, 46.78, 44.06, 44.06, 44.13, 58.95, 64.94, 65.27, 94.75, 113.01, 120.61, 110.8, 121.77, 112.71, 107.04, 121.1, 140.19] },
      velocityScore: { '1D': 2.4, '1W': -9.1, '1M': -55.2, '6M': null }, isNew: false,
      marketCap: '$705B', pe: null, revenueGrowth: 7, eps: -0.61, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.54, ARTY: false, BAI: 3.24, IGPT: 4.87, IVES: false, ALAI: false, CHAT: 1.32, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'NBIS', name: 'NEBIUS GROUP NV', easyScore: 4, avgWeight: 3.15, proScore: 1.26, coverage: 0.4,
      price: 272.23, weeklyPrices: [286.69, 283.61, 275.25, 259.66, 272.23], weeklyChange: -5.04, dayChange: 4.84, sortRank: 0, periodReturns: { '1M': 30.8, 'YTD': 225.2, '6M': 198.7, '1Y': 461.1 },
      priceHistory: { '1D': [259.66, 269.48, 272.23], '1W': [286.69, 283.61, 275.25, 259.66, 272.23], '1M': [208.06, 208.37, 226.34, 231.09, 264.51, 260.58, 251.68, 259.67, 227.81, 218, 211.69, 222.24, 232.36, 260.07, 265.1, 280.91, 286.69, 283.61, 275.25, 259.66, 272.23], 'YTD': [83.71, 97.3, 103.89, 96.85, 94.91, 73.87, 89.73, 97.92, 104.88, 95.65, 108.04, 121.52, 105.97, 101.95, 136.33, 165.34, 157.08, 138.23, 195.09, 207.27, 191.82, 226.34, 259.67, 211.69, 280.91, 272.23], '6M': [87.59, 92.83, 107.33, 99.29, 97.87, 89.95, 91.79, 97.52, 102.58, 86.8, 96.43, 116.33, 114.91, 103.76, 125, 166.77, 156.14, 141.19, 195.09, 179.11, 197.73, 208.37, 251.68, 211.69, 280.91, 272.23], '1Y': [48.52, 49.97, 46.43, 53.69, 52.16, 54.43, 65.31, 70.63, 67.47, 70.1, 64.91, 89.19, 94.12, 107.94, 125.87, 132.64, 123.04, 106.16, 124.18, 109.44, 94.36, 95.07, 94.69, 102.8, 94.28, 78.09, 87.59, 92.83, 107.33, 99.29, 97.87, 89.95, 92.88, 97.52, 102.58, 86.8, 96.43, 116.33, 114.91, 103.76, 125, 166.77, 156.14, 141.19, 195.09, 179.11, 197.73, 208.37, 251.68, 211.69, 280.91, 272.23] },
      velocityScore: { '1D': null, '1W': -3.8, '1M': -37.9, '6M': null }, isNew: true,
      marketCap: '$69B', pe: 104.7, revenueGrowth: 684, eps: 2.6, grossMargin: 72, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 2.73, ALAI: 4.16, CHAT: 3.67, AIFD: 2.04, SPRX: false, AOTG: false },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 4.3, proScore: 4.3, coverage: 1,
      price: 1251.06, weeklyPrices: [1133.99, 1211.38, 1051.77, 1048.51, 1251.06], weeklyChange: 10.32, dayChange: 19.39, sortRank: 0, periodReturns: { '1M': 39.6, 'YTD': 338.3, '6M': 336.4, '1Y': 883.2 },
      priceHistory: { '1D': [1047.92, 1250.44, 1251.06], '1W': [1133.99, 1211.38, 1051.77, 1048.51, 1251.06], '1M': [895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1251.06], 'YTD': [285.41, 327.02, 336.63, 397.58, 435.79, 382.89, 413.97, 428.17, 415.56, 397.05, 405.35, 444.27, 355.46, 367.85, 421.51, 457.23, 481.72, 517.16, 666.59, 803.63, 731.99, 923.52, 996, 891.88, 1043.19, 1251.06], '6M': [284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 766.58, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1251.06], '1Y': [127.25, 121.74, 123.11, 113.26, 111.73, 109.14, 111.87, 124.27, 117.21, 117.75, 124.21, 150.57, 168.89, 156.83, 183.75, 192.33, 202.53, 206.71, 224.01, 238.33, 244.9, 225.92, 230.26, 226.65, 258.46, 248.55, 284.79, 312.15, 345.87, 365, 410.24, 419.44, 383.5, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 766.58, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1251.06] },
      velocityScore: { '1D': -19.3, '1W': -31.1, '1M': -25.2, '6M': null }, isNew: false,
      marketCap: '$1.4T', pe: 28.3, revenueGrowth: 196, eps: 44.25, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { SOXX: 8.25, PSI: 5.62, XSD: 2.62, DRAM: 0.71 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 5.07, proScore: 3.8, coverage: 0.75,
      price: 547.53, weeklyPrices: [537.37, 551.63, 519.85, 519.74, 547.53], weeklyChange: 1.89, dayChange: 5.49, sortRank: 0, periodReturns: { '1M': 8.7, 'YTD': 155.7, '6M': 154.6, '1Y': 281.8 },
      priceHistory: { '1D': [519.05, 546.18, 547.53], '1W': [537.37, 551.63, 519.85, 519.74, 547.53], '1M': [503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 547.53], 'YTD': [214.16, 204.68, 227.92, 253.73, 252.18, 192.5, 205.94, 200.15, 203.68, 199.45, 197.74, 205.27, 203.77, 210.21, 236.64, 278.26, 305.33, 354.49, 421.39, 445.5, 447.58, 518.09, 523.2, 452.4, 512.48, 547.53], '6M': [214.99, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 203.08, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 448.29, 414.05, 495.54, 542.52, 452.4, 512.48, 547.53], '1Y': [143.4, 138.52, 144.16, 160.41, 162.12, 176.31, 172.4, 184.42, 165.2, 167.13, 161.79, 155.67, 157.92, 161.27, 169.73, 232.89, 234.56, 234.99, 254.84, 237.7, 258.89, 223.55, 214.24, 215.98, 221.43, 201.06, 214.99, 221.08, 207.69, 231.92, 252.03, 242.11, 216, 203.08, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 448.29, 414.05, 495.54, 542.52, 452.4, 512.48, 547.53] },
      velocityScore: { '1D': 0.5, '1W': -14.2, '1M': -33.3, '6M': null }, isNew: false,
      marketCap: '$893B', pe: 181.9, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 7.69, PSI: 4.96, XSD: 2.56, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.73, proScore: 3.55, coverage: 0.75,
      price: 140.19, weeklyPrices: [133.99, 140.94, 132.28, 131.65, 140.19], weeklyChange: 4.63, dayChange: 6.28, sortRank: 0, periodReturns: { '1M': 13.5, 'YTD': 279.9, '6M': 287.7, '1Y': 531.5 },
      priceHistory: { '1D': [131.91, 140.29, 140.19], '1W': [133.99, 140.94, 132.28, 131.65, 140.19], '1M': [123.52, 121.77, 120.89, 114.68, 109.33, 107.93, 112.71, 111.78, 99.17, 110.27, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 140.19], 'YTD': [36.9, 41.11, 48.32, 54.32, 48.66, 48.24, 46.48, 44.11, 45.46, 45.95, 45.25, 46.18, 44.1, 48.03, 61.72, 68.5, 66.78, 94.48, 113.01, 120.29, 118.96, 120.89, 111.78, 107.04, 121.1, 140.19], '6M': [36.2, 39.37, 44.06, 48.56, 43.93, 49.25, 47.13, 46.18, 46.12, 43.1, 46.78, 44.06, 44.06, 44.13, 58.95, 64.94, 65.27, 94.75, 113.01, 120.61, 110.8, 121.77, 112.71, 107.04, 121.1, 140.19], '1Y': [22.2, 21.88, 23.82, 22.8, 22.63, 19.8, 19.77, 22.22, 23.54, 24.85, 24.61, 24.61, 30.57, 33.99, 37.3, 37.8, 36.84, 38.16, 40.16, 37.24, 37.89, 35.11, 36.81, 40.5, 39.51, 36.28, 36.2, 39.37, 44.06, 48.56, 43.93, 49.25, 50.24, 46.18, 46.12, 43.1, 46.78, 44.06, 44.06, 44.13, 58.95, 64.94, 65.27, 94.75, 113.01, 120.61, 110.8, 121.77, 112.71, 107.04, 121.1, 140.19] },
      velocityScore: { '1D': 0.3, '1W': -4.3, '1M': -5.6, '6M': null }, isNew: false,
      marketCap: '$705B', pe: null, revenueGrowth: 7, eps: -0.61, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 6.34, PSI: 5.12, XSD: 2.74, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 4.62, proScore: 3.47, coverage: 0.75,
      price: 199.29, weeklyPrices: [210.69, 208.65, 200.04, 199.00, 199.29], weeklyChange: -5.41, dayChange: 0.19, sortRank: 0, periodReturns: { '1M': -7.2, 'YTD': 6.9, '6M': 5.7, '1Y': 29.1 },
      priceHistory: { '1D': [198.91, 199.05, 199.29], '1W': [210.69, 208.65, 200.04, 199, 199.29], '1M': [214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 199.29], 'YTD': [186.5, 185.04, 187.05, 184.84, 192.51, 171.88, 186.94, 189.82, 184.89, 183.34, 183.14, 178.56, 171.24, 175.75, 183.91, 198.35, 199.64, 199.57, 207.83, 225.83, 223.47, 214.25, 218.66, 200.42, 204.65, 199.29], '6M': [190.53, 188.12, 184.94, 178.07, 188.52, 180.34, 188.54, 184.97, 192.85, 180.05, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 220.78, 220.61, 212.6, 214.75, 200.42, 204.65, 199.29], '1Y': [154.31, 157.25, 164.1, 173, 173.74, 177.87, 180.77, 181.59, 175.4, 181.6, 171.66, 177.17, 176.24, 177.69, 188.89, 192.57, 181.81, 182.16, 202.89, 188.08, 193.8, 186.52, 180.26, 183.38, 180.93, 174.14, 190.53, 188.12, 184.94, 178.07, 188.52, 180.34, 190.04, 184.97, 192.85, 180.05, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 220.78, 220.61, 212.6, 214.75, 200.42, 204.65, 199.29] },
      velocityScore: { '1D': 0.3, '1W': 18.4, '1M': 2.1, '6M': null }, isNew: false,
      marketCap: '$4.8T', pe: 30.5, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.5,
      etfPresence: { SOXX: 7.2, PSI: 4.46, XSD: 2.21, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.63, proScore: 2.72, coverage: 0.75,
      price: 430.88, weeklyPrices: [434.46, 445.48, 407.26, 413.16, 430.88], weeklyChange: -0.83, dayChange: 4.29, sortRank: 0, periodReturns: { '1M': 2.6, 'YTD': 58.9, '6M': 55.2, '1Y': 83.6 },
      priceHistory: { '1D': [413.16, 430.8, 430.88], '1W': [434.46, 445.48, 407.26, 413.16, 430.88], '1M': [419.94, 416.88, 419.01, 413.85, 402.69, 423.2, 437.67, 428.76, 401.39, 403.89, 392.67, 412.13, 417.79, 427.58, 416, 414.45, 434.46, 445.48, 407.26, 413.16, 430.88], 'YTD': [271.2, 299.16, 302.1, 308.52, 318.7, 322.12, 331.36, 355.03, 354.35, 329.72, 307.27, 310.44, 313.42, 320.58, 351.36, 353.8, 403.88, 402.26, 415.63, 432.39, 398.05, 419.01, 428.76, 392.67, 414.45, 430.88], '6M': [276.84, 277.29, 293.86, 295.67, 303.83, 311.29, 325.16, 337.51, 356.09, 338.99, 318.81, 313.66, 321.83, 318.14, 346.21, 347.94, 381.42, 389.31, 415.63, 419.65, 414.31, 416.88, 437.67, 392.67, 414.45, 430.88], '1Y': [234.68, 245.15, 245.13, 240.97, 226.37, 224.63, 223.12, 237.63, 244.87, 255.5, 246.11, 248.24, 249.05, 247.53, 241.67, 237.88, 241.61, 243.29, 232.9, 232.88, 241.44, 232.2, 257.92, 277.26, 283.39, 274.92, 276.84, 277.29, 293.86, 295.67, 303.83, 311.29, 322.97, 337.51, 356.09, 338.99, 318.81, 313.66, 321.83, 318.14, 346.21, 347.94, 381.42, 389.31, 415.63, 419.65, 414.31, 416.88, 437.67, 392.67, 414.45, 430.88] },
      velocityScore: { '1D': 2.3, '1W': 14.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$210B', pe: 64, revenueGrowth: 37, eps: 6.73, grossMargin: 64, dividendYield: 1.06,
      etfPresence: { SOXX: 3.81, PSI: 4.73, XSD: 2.34, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.6% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 5.61, proScore: 2.8, coverage: 0.5,
      price: 629.64, weeklyPrices: [617.11, 640.18, 585.88, 588.97, 629.64], weeklyChange: 2.03, dayChange: 6.91, sortRank: 0, periodReturns: { '1M': 38.4, 'YTD': 145, '6M': 141.4, '1Y': 243.9 },
      priceHistory: { '1D': [588.97, 630.24, 629.64], '1W': [617.11, 640.18, 585.88, 588.97, 629.64], '1M': [454.89, 448.25, 449.68, 450.06, 458.17, 490.05, 500.77, 501.7, 453.01, 492.17, 497.01, 552.64, 567.25, 585.78, 568.23, 592.92, 617.11, 640.18, 585.88, 588.97, 629.64], 'YTD': [256.99, 281.64, 319.08, 318.79, 341.34, 303.99, 328.39, 375.38, 375.72, 346.53, 337.27, 357.21, 338.55, 353.8, 397.81, 389.9, 403.91, 394.49, 428.62, 436.61, 426.85, 449.68, 501.7, 497.01, 592.92, 629.64], '6M': [261.9, 284.32, 307.24, 318.23, 332.71, 318.67, 329.07, 359.13, 377.93, 351.32, 345.88, 352.46, 373.99, 341.79, 385.72, 394.26, 403.48, 382.59, 428.62, 431.2, 406.91, 448.25, 500.77, 497.01, 592.92, 629.64], '1Y': [183.07, 190.01, 198.03, 192.52, 188.12, 180.06, 183.15, 190.03, 160.96, 164.39, 158.24, 170.15, 189.76, 199.6, 223.59, 220.3, 227.72, 228.47, 232.55, 233.53, 230.73, 235.13, 249.97, 269.44, 270.11, 253.5, 261.9, 284.32, 307.24, 318.23, 332.71, 318.67, 330.57, 359.13, 377.93, 351.32, 345.88, 352.46, 373.99, 341.79, 385.72, 394.26, 403.48, 382.59, 428.62, 431.2, 406.91, 448.25, 500.77, 497.01, 592.92, 629.64] },
      velocityScore: { '1D': 1.1, '1W': -5.7, '1M': -4.4, '6M': null }, isNew: false,
      marketCap: '$500B', pe: 59.4, revenueGrowth: 11, eps: 10.6, grossMargin: 49, dividendYield: 0.36,
      etfPresence: { SOXX: 5, PSI: 6.22, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 5.26, proScore: 2.63, coverage: 0.5,
      price: 253.56, weeklyPrices: [259.56, 269.16, 244.49, 240.48, 253.56], weeklyChange: -2.31, dayChange: 5.44, sortRank: 0, periodReturns: { '1M': 26.1, 'YTD': 108.7, '6M': 98.6, '1Y': 183.8 },
      priceHistory: { '1D': [240.47, 253.45, 253.56], '1W': [259.56, 269.16, 244.49, 240.48, 253.56], '1M': [201.14, 195.72, 192.76, 192.17, 194, 204.52, 212.51, 213.11, 192.92, 210.81, 213.56, 241.16, 254.54, 256.42, 237.33, 238.73, 259.56, 269.16, 244.49, 240.48, 253.56], 'YTD': [121.51, 132.46, 154.5, 150, 168.47, 133.1, 145.09, 149.6, 152.43, 142.94, 140.96, 151.15, 145.11, 151.98, 172.73, 173.49, 181.54, 175.04, 181.63, 184.97, 182.95, 192.76, 213.11, 213.56, 238.73, 253.56], '6M': [127.96, 135.24, 142.82, 148.62, 161.63, 135.55, 143.08, 147.02, 150.66, 144.13, 145.29, 148.13, 156.62, 147.24, 167.23, 174.81, 181.21, 181.62, 181.63, 181.13, 174.06, 195.72, 212.51, 213.56, 238.73, 253.56], '1Y': [89.35, 92.11, 92.86, 93.71, 90.42, 87.9, 91.21, 94.95, 87.84, 88.89, 87.33, 95.93, 104.67, 105.91, 113.93, 105.35, 109.88, 115.9, 121.44, 120.64, 119.9, 116.75, 115.91, 120.81, 124.62, 122.24, 127.96, 135.24, 142.82, 148.62, 161.63, 135.55, 144.02, 147.02, 150.66, 144.13, 145.29, 148.13, 156.62, 147.24, 167.23, 174.81, 181.21, 181.62, 181.63, 181.13, 174.06, 195.72, 212.51, 213.56, 238.73, 253.56] },
      velocityScore: { '1D': -1.1, '1W': 11.9, '1M': 0.8, '6M': null }, isNew: false,
      marketCap: '$331B', pe: 71.6, revenueGrowth: 12, eps: 3.54, grossMargin: 61, dividendYield: 0.38,
      etfPresence: { SOXX: 4.78, PSI: 5.74, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 5.04, proScore: 2.52, coverage: 0.5,
      price: 392.85, weeklyPrices: [389.04, 409.54, 371.33, 374.80, 392.85], weeklyChange: 0.98, dayChange: 4.81, sortRank: 0, periodReturns: { '1M': 21.7, 'YTD': 129.5, '6M': 121.5, '1Y': 309.1 },
      priceHistory: { '1D': [374.82, 392.77, 392.85], '1W': [389.04, 409.54, 371.33, 374.8, 392.85], '1M': [322.68, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 321.8, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04, 409.54, 371.33, 374.8, 392.85], 'YTD': [171.18, 200.96, 217.47, 220.7, 248.17, 213.31, 231.29, 244.92, 239.07, 214.68, 209.49, 233.99, 211.62, 222.01, 258.76, 260.96, 258.56, 257.86, 297.17, 295.44, 292.09, 318, 336.41, 321.8, 374.18, 392.85], '6M': [178.07, 194.76, 220.4, 222.41, 238.46, 230.1, 226.61, 235.58, 244.25, 217.27, 215.23, 226.47, 238.84, 213.66, 246.49, 265.16, 265.55, 248.75, 297.17, 289.24, 273.38, 318.93, 343.71, 321.8, 374.18, 392.85], '1Y': [96.02, 98.83, 101.06, 100.79, 97.78, 94.84, 99.15, 106.74, 99.15, 103.67, 100.42, 115.58, 126.32, 128.13, 146.99, 141, 142.37, 147.54, 161.01, 162.19, 161.42, 148.8, 155.14, 157.09, 168.71, 164.7, 178.07, 194.76, 220.4, 222.41, 238.46, 230.1, 229.28, 235.58, 244.25, 217.27, 215.23, 226.47, 238.84, 213.66, 246.49, 265.16, 265.55, 248.75, 297.17, 289.24, 273.38, 318.93, 343.71, 321.8, 374.18, 392.85] },
      velocityScore: { '1D': 1.6, '1W': 7.7, '1M': -5.3, '6M': null }, isNew: false,
      marketCap: '$491B', pe: 74.4, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.28,
      etfPresence: { SOXX: 4.5, PSI: 5.59, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 4.41, proScore: 2.2, coverage: 0.5,
      price: 386.39, weeklyPrices: [411.35, 392.13, 380.15, 382.07, 386.39], weeklyChange: -6.07, dayChange: 1.13, sortRank: 0, periodReturns: { '1M': -8.4, 'YTD': 11.6, '6M': 10.3, '1Y': 46 },
      priceHistory: { '1D': [382.08, 385.67, 386.39], '1W': [411.35, 392.13, 380.15, 382.07, 386.39], '1M': [422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 386.39], 'YTD': [346.1, 332.48, 343.02, 325.49, 330.73, 310.51, 331.17, 332.65, 321.7, 332.77, 335.97, 319.84, 309.42, 313.49, 354.91, 398.47, 419.94, 417.43, 425.44, 416.79, 417.76, 426.58, 418.91, 372.1, 392.9, 386.39], '6M': [352.13, 343.42, 352.21, 332.6, 332.79, 320.33, 340.44, 332.54, 325.49, 313.84, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 419.3, 411.07, 421.86, 479.23, 372.1, 392.9, 386.39], '1Y': [264.65, 269.9, 275.4, 286.45, 288.71, 293.7, 303.76, 309.09, 291.17, 300.25, 306.1, 359.63, 345.35, 336.1, 338.18, 345.02, 354.15, 344.29, 376.47, 355.59, 355.22, 354.42, 397.57, 381.03, 406.37, 329.88, 352.13, 343.42, 352.21, 332.6, 332.79, 320.33, 343.94, 332.54, 325.49, 313.84, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 419.3, 411.07, 421.86, 479.23, 372.1, 392.9, 386.39] },
      velocityScore: { '1D': 0.9, '1W': 17, '1M': -40.4, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 64.4, revenueGrowth: 48, eps: 6, grossMargin: 76, dividendYield: 0.68,
      etfPresence: { SOXX: 6.53, PSI: false, XSD: 2.28, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 3.8, proScore: 1.9, coverage: 0.5,
      price: 287.09, weeklyPrices: [310.58, 307.86, 279.04, 276.70, 287.09], weeklyChange: -7.56, dayChange: 3.76, sortRank: 0, periodReturns: { '1M': 37.9, 'YTD': 237.8, '6M': 231.9, '1Y': 278.1 },
      priceHistory: { '1D': [276.69, 286.14, 287.09], '1W': [310.58, 307.86, 279.04, 276.7, 287.09], '1M': [208.26, 198.7, 204.83, 205, 219.43, 290.79, 301.65, 316.43, 263.47, 288.85, 252.59, 280.71, 279.7, 308.88, 278.67, 289.54, 310.58, 307.86, 279.04, 276.7, 287.09], 'YTD': [84.98, 83.45, 80.38, 83.1, 81.34, 74.21, 78.23, 79.48, 79.29, 75.68, 87.67, 89.53, 97.68, 106.71, 119.93, 133.37, 165.56, 165.15, 172.15, 177.95, 186.8, 204.83, 316.43, 252.59, 289.54, 287.09], '6M': [86.34, 90.23, 82.89, 79.8, 82.93, 75.54, 82.01, 79.01, 78.39, 77.51, 93.3, 90.79, 92.36, 99.05, 114.45, 134.6, 157.32, 156.57, 172.15, 164.5, 176.27, 198.7, 301.65, 252.59, 289.54, 287.09], '1Y': [75.93, 74.25, 73.36, 72.01, 74.04, 80.37, 75.85, 79.32, 71.22, 74.79, 64.1, 66.59, 74.23, 83.81, 86.2, 90.68, 88.23, 82.77, 88.57, 93.33, 89.33, 81.32, 87.72, 98.19, 89.43, 84.47, 86.34, 90.23, 82.89, 79.8, 82.93, 75.54, 82.35, 79.01, 78.39, 77.51, 93.3, 90.79, 92.36, 99.05, 114.45, 134.6, 157.32, 156.57, 172.15, 164.5, 176.27, 198.7, 301.65, 252.59, 289.54, 287.09] },
      velocityScore: { '1D': 0, '1W': -42.4, '1M': -43.8, '6M': null }, isNew: false,
      marketCap: '$251B', pe: 98.7, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.09,
      etfPresence: { SOXX: 5.16, PSI: false, XSD: 2.44, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 3.09, proScore: 1.54, coverage: 0.5,
      price: 316.33, weeklyPrices: [322.86, 332.28, 304.36, 303.11, 316.33], weeklyChange: -2.02, dayChange: 4.36, sortRank: 0, periodReturns: { '1M': -2.6, 'YTD': 82.3, '6M': 78.6, '1Y': 54 },
      priceHistory: { '1D': [303.11, 315.58, 316.33], '1W': [322.86, 332.28, 304.36, 303.11, 316.33], '1M': [324.89, 317.45, 315.95, 305.68, 293.2, 308.12, 308.59, 305.37, 285.06, 290.9, 282.01, 297.1, 301.12, 313.34, 305.71, 301.88, 322.86, 332.28, 304.36, 303.11, 316.33], 'YTD': [173.49, 188.45, 189.12, 194.99, 218.97, 223.98, 223, 219.73, 212.63, 197.98, 190.05, 188.29, 193.41, 196.3, 214.98, 223.1, 282.23, 281.08, 289.44, 306.34, 304.88, 315.95, 305.37, 282.01, 301.88, 316.33], '6M': [176.88, 177.17, 189.07, 189.59, 196.63, 225.21, 220.92, 225.69, 213.35, 202.67, 197.46, 194.45, 194.63, 194.14, 208.9, 216.29, 236.31, 269.22, 289.44, 295.17, 302.31, 317.45, 308.59, 282.01, 301.88, 316.33], '1Y': [205.38, 215.59, 219.66, 216.59, 185.69, 181.06, 185.91, 193.29, 200.77, 205.47, 187.29, 184.35, 181.62, 182.04, 182.32, 178.96, 175.48, 172.19, 160.51, 161.38, 163.09, 157.09, 165.35, 180.12, 181.67, 176.19, 176.88, 177.17, 189.07, 189.59, 196.63, 225.21, 218.77, 225.69, 213.35, 202.67, 197.46, 194.45, 194.63, 194.14, 208.9, 216.29, 236.31, 269.22, 289.44, 295.17, 302.31, 317.45, 308.59, 282.01, 301.88, 316.33] },
      velocityScore: { '1D': 0, '1W': 8.5, '1M': -51.3, '6M': null }, isNew: false,
      marketCap: '$288B', pe: 54.1, revenueGrowth: 19, eps: 5.85, grossMargin: 57, dividendYield: 1.87,
      etfPresence: { SOXX: 3.79, PSI: false, XSD: 2.39, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.89, proScore: 1.45, coverage: 0.5,
      price: 306.83, weeklyPrices: [313.27, 323.24, 299.94, 294.06, 306.83], weeklyChange: -2.06, dayChange: 4.24, sortRank: 0, periodReturns: { '1M': -7.8, 'YTD': 41.4, '6M': 36.2, '1Y': 41.9 },
      priceHistory: { '1D': [294.36, 306.69, 306.83], '1W': [313.27, 323.24, 299.94, 294.06, 306.83], '1M': [332.67, 329.24, 330.28, 321.35, 311.38, 323.62, 321.88, 322.22, 295.96, 301.14, 285.56, 302.55, 304.86, 315.88, 302.89, 298.2, 313.27, 323.24, 299.94, 294.06, 306.83], 'YTD': [217.06, 237.89, 238.6, 236.75, 233.5, 222.13, 242.19, 232.27, 232.23, 210.58, 191.22, 192.35, 196.92, 195.58, 205.67, 213.73, 241.16, 293.59, 303.55, 298.41, 310.15, 330.28, 322.22, 285.56, 298.2, 306.83], '6M': [222.87, 223.88, 238.33, 230.7, 229.42, 220.66, 236.62, 245.09, 234.63, 215.25, 203.03, 194.02, 196.4, 196.86, 204.27, 209.39, 225.75, 289.25, 303.55, 294.23, 294.28, 329.24, 321.88, 285.56, 298.2, 306.83], '1Y': [216.28, 231.15, 233.19, 224.5, 224.43, 213.77, 205.91, 230.52, 228.77, 237.67, 225.39, 223.21, 226.51, 226.81, 227.71, 221.42, 217.41, 220.73, 206.38, 206.45, 204.08, 190.06, 193.76, 226.16, 231.83, 222.08, 222.87, 223.88, 238.33, 230.7, 229.42, 220.66, 228.91, 245.09, 234.63, 215.25, 203.03, 194.02, 196.4, 196.86, 204.27, 209.39, 225.75, 289.25, 303.55, 294.23, 294.28, 329.24, 321.88, 285.56, 298.2, 306.83] },
      velocityScore: { '1D': -0.7, '1W': 8.2, '1M': -31.9, '6M': null }, isNew: false,
      marketCap: '$77B', pe: 29.3, revenueGrowth: 12, eps: 10.47, grossMargin: 56, dividendYield: 1.38,
      etfPresence: { SOXX: 3.5, PSI: false, XSD: 2.29, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.7, proScore: 1.35, coverage: 0.5,
      price: 1471.71, weeklyPrices: [1563.70, 1537.88, 1423.76, 1434.95, 1471.71], weeklyChange: -5.88, dayChange: 2.56, sortRank: 0, periodReturns: { '1M': -11.5, 'YTD': 62.4, '6M': 54.4, '1Y': 103.6 },
      priceHistory: { '1D': [1434.95, 1483.58, 1471.71], '1W': [1563.7, 1537.88, 1423.76, 1434.95, 1471.71], '1M': [1662.98, 1620.17, 1633.17, 1566.21, 1542.39, 1624.99, 1689.89, 1652.6, 1481.05, 1559.18, 1473.04, 1589.55, 1577.32, 1652.29, 1498.77, 1448.21, 1563.7, 1537.88, 1423.76, 1434.95, 1471.71], 'YTD': [906.36, 959.09, 1009.54, 1076.67, 1183.15, 1155.99, 1155.93, 1204.1, 1180.13, 1078.44, 1033.88, 1092.69, 1058.28, 1119.51, 1334.21, 1402.81, 1592.17, 1614.41, 1652.35, 1650.35, 1553.27, 1633.17, 1652.6, 1473.04, 1448.21, 1471.71], '6M': [946.32, 955.03, 967.16, 1034.49, 1095.49, 1164.83, 1142.02, 1173.18, 1213.67, 1074.37, 1055.82, 1066.66, 1101.59, 1093.35, 1312.94, 1353, 1522.04, 1526.84, 1652.35, 1599.52, 1468.11, 1620.17, 1689.89, 1473.04, 1448.21, 1471.71], '1Y': [722.82, 764.4, 740.45, 713.57, 713, 711.24, 797.94, 861.8, 826.27, 866.32, 848.11, 840.38, 917.78, 891.39, 930.51, 979.25, 1026.83, 1070.8, 1087.56, 958.07, 958.35, 884.65, 924.95, 952.74, 981.48, 929.48, 946.32, 955.03, 967.16, 1034.49, 1095.49, 1164.83, 1206.18, 1173.18, 1213.67, 1074.37, 1055.82, 1066.66, 1101.59, 1093.35, 1312.94, 1353, 1522.04, 1526.84, 1652.35, 1599.52, 1468.11, 1620.17, 1689.89, 1473.04, 1448.21, 1471.71] },
      velocityScore: { '1D': 2.3, '1W': 7.1, '1M': -34.8, '6M': null }, isNew: false,
      marketCap: '$72B', pe: 105.7, revenueGrowth: 26, eps: 13.92, grossMargin: 55, dividendYield: 0.56,
      etfPresence: { SOXX: 3.23, PSI: false, XSD: 2.16, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 2.68, proScore: 1.34, coverage: 0.5,
      price: 422.33, weeklyPrices: [417.07, 439.66, 397.02, 399.92, 422.33], weeklyChange: 1.26, dayChange: 5.6, sortRank: 0, periodReturns: { '1M': 32.5, 'YTD': 153.9, '6M': 148.5, '1Y': 371.2 },
      priceHistory: { '1D': [399.92, 419.74, 422.33], '1W': [417.07, 439.66, 397.02, 399.92, 422.33], '1M': [318.72, 325.33, 349.17, 342.85, 320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 330.86, 367.47, 367.15, 389.2, 361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 422.33], 'YTD': [166.36, 156.73, 174.45, 176.35, 160.46, 142.82, 126.58, 129.68, 124.67, 120, 119.9, 126.16, 113.61, 106.33, 129.46, 170.81, 197.54, 194.74, 213.91, 224.09, 287.48, 349.17, 358.05, 330.86, 374.68, 422.33], '6M': [167.26, 167.11, 172.57, 183.75, 170.93, 158.52, 182.86, 123.69, 128.4, 109.8, 116.48, 127.57, 121.76, 109.6, 125.46, 172.09, 194.06, 196.85, 213.91, 204.42, 244.26, 325.33, 363.54, 330.86, 374.68, 422.33], '1Y': [89.63, 88.57, 97.02, 97.95, 121.68, 136.73, 170.89, 193.64, 172.45, 179.2, 187.95, 232.9, 251.88, 200.64, 209.6, 225.43, 163.55, 163.64, 169.55, 162.83, 157.79, 142.01, 154.22, 152.51, 173.7, 145.88, 167.26, 167.11, 172.57, 183.75, 170.93, 158.52, 187.67, 123.69, 128.4, 109.8, 116.48, 127.57, 121.76, 109.6, 125.46, 172.09, 194.06, 196.85, 213.91, 204.42, 244.26, 325.33, 363.54, 330.86, 374.68, 422.33] },
      velocityScore: { '1D': 2.3, '1W': -24.3, '1M': -36.5, '6M': null }, isNew: false,
      marketCap: '$72B', pe: 285.4, revenueGrowth: 93, eps: 1.48, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.66, PSI: false, XSD: 2.7, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 2.65, proScore: 1.33, coverage: 0.5,
      price: 215.4, weeklyPrices: [226.11, 221.90, 204.13, 197.41, 215.40], weeklyChange: -4.74, dayChange: 9.16, sortRank: 0, periodReturns: { '1M': -13.4, 'YTD': 25.9, '6M': 23.2, '1Y': 38.1 },
      priceHistory: { '1D': [197.32, 216.02, 215.4], '1W': [226.11, 221.9, 204.13, 197.41, 215.4], '1M': [248.82, 233.4, 243.29, 251.02, 228.99, 240.84, 250.01, 242.57, 215.94, 217.77, 191.2, 202.96, 211.72, 220.81, 214.07, 212.97, 226.11, 221.9, 204.13, 197.41, 215.4], 'YTD': [171.05, 181.87, 161.39, 157.8, 152.22, 136.3, 138.47, 142.88, 145.59, 137, 131.15, 131.28, 130.54, 127.28, 127.75, 134.47, 133.95, 179.58, 192.57, 213.17, 202.51, 243.29, 242.57, 191.2, 212.97, 215.4], '6M': [174.81, 176.31, 169.27, 154.07, 153.04, 147.18, 140.09, 142.63, 144.78, 138.13, 135.2, 131.59, 128.67, 128.78, 127.51, 133.05, 136.07, 156, 192.57, 210.31, 195.61, 233.4, 250.01, 191.2, 212.97, 215.4], '1Y': [155.93, 162.32, 159.09, 152.61, 158.84, 146.76, 145.9, 156.59, 155.44, 159.77, 159.71, 161.51, 168.13, 169.68, 168.85, 165.66, 164.08, 170.03, 177.26, 173.2, 176.67, 166.11, 165.14, 174.35, 181.27, 174.19, 174.81, 176.31, 169.27, 154.07, 153.04, 147.18, 138.93, 142.63, 144.78, 138.13, 135.2, 131.59, 128.67, 128.78, 127.51, 133.05, 136.07, 156, 192.57, 210.31, 195.61, 233.4, 250.01, 191.2, 212.97, 215.4] },
      velocityScore: { '1D': -2.2, '1W': -10.1, '1M': -46.6, '6M': null }, isNew: false,
      marketCap: '$227B', pe: 23.2, revenueGrowth: -4, eps: 9.3, grossMargin: 55, dividendYield: 1.86,
      etfPresence: { SOXX: 3, PSI: false, XSD: 2.3, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.34, proScore: 1.17, coverage: 0.5,
      price: 96.63, weeklyPrices: [99.77, 102.71, 93.26, 92.48, 96.63], weeklyChange: -3.15, dayChange: 4.42, sortRank: 0, periodReturns: { '1M': -1.4, 'YTD': 51.6, '6M': 47.8, '1Y': 35 },
      priceHistory: { '1D': [92.54, 97, 96.63], '1W': [99.77, 102.71, 93.26, 92.48, 96.63], '1M': [98.05, 96.85, 96.04, 94.65, 91.52, 96.96, 96.55, 96.3, 88.34, 91.37, 87.91, 92.94, 95.24, 100.32, 95.63, 94.11, 99.77, 102.71, 93.26, 92.48, 96.63], 'YTD': [63.72, 73.53, 74.45, 75.47, 79.36, 78.04, 78.92, 77.73, 74.97, 67.81, 62.73, 63.29, 64.2, 65.38, 71.22, 76.87, 90.64, 92.91, 102.92, 96.71, 94.02, 96.04, 96.3, 87.91, 94.11, 96.63], '6M': [64.94, 67.06, 73.39, 73.17, 75.16, 76.66, 76.86, 78.94, 75.93, 71.39, 65.33, 64.59, 65.63, 64.61, 70.73, 74.49, 82.48, 90.17, 102.92, 97.7, 91.81, 96.85, 96.55, 87.91, 94.11, 96.63], '1Y': [71.6, 73.16, 75.08, 74.3, 67.81, 67.59, 66.22, 65.75, 66.76, 66.65, 64.43, 65.02, 66.26, 64.84, 66.13, 65.86, 65.35, 65.09, 62.07, 59.35, 55.63, 50.8, 52.57, 64.72, 69.09, 64.06, 64.94, 67.06, 73.39, 73.17, 75.16, 76.66, 74.41, 78.94, 75.93, 71.39, 65.33, 64.59, 65.63, 64.61, 70.73, 74.49, 82.48, 90.17, 102.92, 97.7, 91.81, 96.85, 96.55, 87.91, 94.11, 96.63] },
      velocityScore: { '1D': 0, '1W': 1.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$52B', pe: 439.2, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 1.97,
      etfPresence: { SOXX: 2.34, PSI: false, XSD: 2.35, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.32, proScore: 1.16, coverage: 0.5,
      price: 283.22, weeklyPrices: [271.83, 302.52, 272.01, 268.99, 283.22], weeklyChange: 4.19, dayChange: 5.21, sortRank: 0, periodReturns: { '1M': 27.8, 'YTD': 96.8, '6M': 88.6, '1Y': 207.2 },
      priceHistory: { '1D': [269.2, 282.57, 283.22], '1W': [271.83, 302.52, 272.01, 268.99, 283.22], '1M': [221.64, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 217.5, 206.89, 222.27, 237.68, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 283.22], 'YTD': [143.89, 141.59, 149.12, 135.1, 129.47, 98.06, 121.78, 124.06, 114.48, 114.74, 111.57, 107.09, 96.44, 95.92, 107.93, 158.93, 185.54, 174.01, 198.29, 189.36, 182.98, 222.35, 217.5, 237.68, 249.33, 283.22], '6M': [144.83, 140.24, 156.07, 153.22, 129.57, 111.31, 134.72, 124.8, 120.83, 97.3, 112.33, 104.06, 100.3, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 198.57, 168.99, 221.23, 214.6, 237.68, 249.33, 283.22], '1Y': [92.2, 89.37, 97.29, 98.45, 101.17, 111.55, 119.78, 121.13, 105.99, 122.73, 134, 159.32, 172.31, 144.94, 149.63, 151.15, 136.53, 150.97, 166.62, 162.74, 160.34, 141.88, 164.01, 180.92, 154.47, 138.57, 144.83, 140.24, 156.07, 153.22, 129.57, 111.31, 123.41, 124.8, 120.83, 97.3, 112.33, 104.06, 100.3, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 198.57, 168.99, 221.23, 214.6, 237.68, 249.33, 283.22] },
      velocityScore: { '1D': 0, '1W': -11.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$53B', pe: 113.3, revenueGrowth: 157, eps: 2.5, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 2.11, PSI: false, XSD: 2.52, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 2.24, proScore: 1.12, coverage: 0.5,
      price: 120.75, weeklyPrices: [121.62, 131.55, 117.06, 115.74, 120.75], weeklyChange: -0.72, dayChange: 4.29, sortRank: 0, periodReturns: { '1M': -4.9, 'YTD': 123, '6M': 119.2, '1Y': 124.7 },
      priceHistory: { '1D': [115.78, 120.75, 120.75], '1W': [121.62, 131.55, 117.06, 115.74, 120.75], '1M': [127, 124.89, 123.77, 120.62, 120.92, 128.64, 133.93, 131.82, 117.26, 120.9, 110.17, 115.96, 116.79, 125.9, 118.25, 112.92, 121.62, 131.55, 117.06, 115.74, 120.75], 'YTD': [54.15, 60.89, 60.28, 63.07, 62.2, 63.1, 70.63, 69.11, 68.16, 60.85, 57.69, 59.29, 60.87, 62.2, 68.49, 79.93, 97.78, 100.81, 105.77, 115.71, 110.21, 123.77, 131.82, 110.17, 112.92, 120.75], '6M': [54.93, 58.69, 58.75, 60.06, 62.63, 59.43, 67.38, 71.96, 70.03, 63.42, 59.59, 60.98, 62.34, 61.92, 68.38, 72.43, 88.99, 98.86, 105.77, 104.11, 106.02, 124.89, 133.93, 110.17, 112.92, 120.75], '1Y': [53.74, 55.95, 59.52, 59.41, 55.44, 56.36, 47.59, 51.89, 49.47, 51.25, 48.06, 49.02, 51.83, 49.77, 48.74, 49.97, 52.97, 51.78, 50.85, 48.8, 49.27, 46.12, 49.64, 54.79, 55.97, 54.34, 54.93, 58.69, 58.75, 60.06, 62.63, 59.43, 65.1, 71.96, 70.03, 63.42, 59.59, 60.98, 62.34, 61.92, 68.38, 72.43, 88.99, 98.86, 105.77, 104.11, 106.02, 124.89, 133.93, 110.17, 112.92, 120.75] },
      velocityScore: { '1D': 0, '1W': -11.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$47B', pe: 88.1, revenueGrowth: 5, eps: 1.37, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 2.14, PSI: false, XSD: 2.33, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 2, avgWeight: 1.78, proScore: 0.89, coverage: 0.5,
      price: 382.11, weeklyPrices: [391.41, 396.26, 372.15, 373.08, 382.11], weeklyChange: -2.38, dayChange: 2.42, sortRank: 0, periodReturns: { '1M': -6.7, 'YTD': 123.1, '6M': 117.3, '1Y': 174.6 },
      priceHistory: { '1D': [373.08, 382, 382.11], '1W': [391.41, 396.26, 372.15, 373.08, 382.11], '1M': [409.68, 400.66, 391.09, 364.64, 353.79, 382.35, 390.34, 382.74, 345.4, 361.86, 354.4, 374.76, 379.87, 384.77, 368.32, 367.11, 391.41, 396.26, 372.15, 373.08, 382.11], 'YTD': [171.28, 167.66, 218.93, 224.29, 227.73, 227.8, 238.99, 243.59, 247.11, 228.98, 215.94, 224.54, 228.5, 229.36, 247.71, 261.42, 284.4, 281.61, 309.81, 381.55, 375.71, 391.09, 382.74, 354.4, 367.11, 382.11], '6M': [175.01, 170.76, 197.55, 221.7, 219.2, 226.71, 230.54, 245.59, 248.29, 241.01, 220.59, 221.29, 237.23, 222.07, 247, 261.16, 277, 269.63, 309.81, 362.76, 358.98, 400.66, 390.34, 354.4, 367.11, 382.11], '1Y': [139.17, 139.81, 137.19, 141.76, 137.29, 137.14, 127.75, 125.99, 121.15, 129.63, 131.89, 131.07, 129.73, 123.88, 128.09, 132.98, 137.94, 139.31, 150.61, 166.92, 170.89, 161.57, 168.06, 187.06, 189.86, 171.47, 175.01, 170.76, 197.55, 221.7, 219.2, 226.71, 235.7, 245.59, 248.29, 241.01, 220.59, 221.29, 237.23, 222.07, 247, 261.16, 277, 269.63, 309.81, 362.76, 358.98, 400.66, 390.34, 354.4, 367.11, 382.11] },
      velocityScore: { '1D': 2.3, '1W': -4.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$29B', pe: 162.6, revenueGrowth: 23, eps: 2.35, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: 1.22, PSI: false, XSD: 2.34, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SWKS', name: 'SKYWORKS SOLUTIONS INC', easyScore: 2, avgWeight: 1.38, proScore: 0.69, coverage: 0.5,
      price: 74.14, weeklyPrices: [72.45, 76.18, 73.44, 71.40, 74.14], weeklyChange: 2.33, dayChange: 3.77, sortRank: 0, periodReturns: { '1M': -11.1, 'YTD': 16.9, '6M': 14.9, '1Y': -0.2 },
      priceHistory: { '1D': [71.44, 74.11, 74.14], '1W': [72.45, 76.18, 73.44, 71.4, 74.14], '1M': [83.42, 78.68, 81.41, 77.85, 75.49, 79.12, 80.66, 79.93, 73.57, 75.37, 70.29, 72.73, 73.97, 76.26, 71.42, 69.38, 72.45, 76.18, 73.44, 71.4, 74.14], 'YTD': [63.41, 60.66, 58.46, 59.67, 55.79, 60.92, 60.73, 60.05, 59.61, 56.48, 55.2, 54.12, 56.66, 53.22, 56.56, 58.7, 61.55, 70.17, 64.97, 68.14, 74.35, 81.41, 79.93, 70.29, 69.38, 74.14], '6M': [64.21, 65.16, 58.85, 57.41, 60.05, 55.93, 62.31, 62.16, 59.9, 58.15, 54.93, 53.71, 55.36, 53.55, 56.54, 57.93, 61.77, 62.66, 64.97, 66.31, 70.35, 78.68, 80.66, 70.29, 69.38, 74.14], '1Y': [74.27, 78.18, 77.7, 72.2, 72.34, 68.54, 68.55, 73.65, 75.12, 76.2, 74.64, 74.68, 77.03, 79.36, 77.37, 73.64, 74.47, 75.78, 79.16, 70.64, 69.46, 62.59, 65.34, 69.01, 68.25, 64.49, 64.21, 65.16, 58.85, 57.41, 60.05, 55.93, 61.55, 62.16, 59.9, 58.15, 54.93, 53.71, 55.36, 53.55, 56.54, 57.93, 61.77, 62.66, 64.97, 66.31, 70.35, 78.68, 80.66, 70.29, 69.38, 74.14] },
      velocityScore: { '1D': -1.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 30.9, revenueGrowth: -1, eps: 2.4, grossMargin: 41, dividendYield: 3.87,
      etfPresence: { SOXX: 0.51, PSI: false, XSD: 2.26, DRAM: false },
      tonyNote: 'SKYWORKS SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 10, avgWeight: 5.62, proScore: 3.31, coverage: 0.588,
      price: 199.29, weeklyPrices: [210.69, 208.65, 200.04, 199.00, 199.29], weeklyChange: -5.41, dayChange: 0.19, sortRank: 0, periodReturns: { '1M': -7.2, 'YTD': 6.9, '6M': 5.7, '1Y': 29.1 },
      priceHistory: { '1D': [198.91, 199.05, 199.29], '1W': [210.69, 208.65, 200.04, 199, 199.29], '1M': [214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 199.29], 'YTD': [186.5, 185.04, 187.05, 184.84, 192.51, 171.88, 186.94, 189.82, 184.89, 183.34, 183.14, 178.56, 171.24, 175.75, 183.91, 198.35, 199.64, 199.57, 207.83, 225.83, 223.47, 214.25, 218.66, 200.42, 204.65, 199.29], '6M': [190.53, 188.12, 184.94, 178.07, 188.52, 180.34, 188.54, 184.97, 192.85, 180.05, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 220.78, 220.61, 212.6, 214.75, 200.42, 204.65, 199.29], '1Y': [154.31, 157.25, 164.1, 173, 173.74, 177.87, 180.77, 181.59, 175.4, 181.6, 171.66, 177.17, 176.24, 177.69, 188.89, 192.57, 181.81, 182.16, 202.89, 188.08, 193.8, 186.52, 180.26, 183.38, 180.93, 174.14, 190.53, 188.12, 184.94, 178.07, 188.52, 180.34, 190.04, 184.97, 192.85, 180.05, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 220.78, 220.61, 212.6, 214.75, 200.42, 204.65, 199.29] },
      velocityScore: { '1D': 0, '1W': 51.1, '1M': -31.8, '6M': null }, isNew: false,
      marketCap: '$4.8T', pe: 30.5, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.5,
      etfPresence: { PTF: 4.24, WCLD: false, IGV: false, FDTX: 4.62, GTEK: false, ARKK: 1.64, MARS: false, FRWD: 8.23, BCTK: 6, FWD: 1.91, CBSE: false, FCUS: false, WGMI: 1.92, CNEQ: 13.42, SGRT: 6.44, SPMO: 7.8, XMMO: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 5.63, proScore: 2.98, coverage: 0.529,
      price: 1251.06, weeklyPrices: [1133.99, 1211.38, 1051.77, 1048.51, 1251.06], weeklyChange: 10.32, dayChange: 19.39, sortRank: 0, periodReturns: { '1M': 39.6, 'YTD': 338.3, '6M': 336.4, '1Y': 883.2 },
      priceHistory: { '1D': [1047.92, 1250.44, 1251.06], '1W': [1133.99, 1211.38, 1051.77, 1048.51, 1251.06], '1M': [895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1251.06], 'YTD': [285.41, 327.02, 336.63, 397.58, 435.79, 382.89, 413.97, 428.17, 415.56, 397.05, 405.35, 444.27, 355.46, 367.85, 421.51, 457.23, 481.72, 517.16, 666.59, 803.63, 731.99, 923.52, 996, 891.88, 1043.19, 1251.06], '6M': [284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 766.58, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1251.06], '1Y': [127.25, 121.74, 123.11, 113.26, 111.73, 109.14, 111.87, 124.27, 117.21, 117.75, 124.21, 150.57, 168.89, 156.83, 183.75, 192.33, 202.53, 206.71, 224.01, 238.33, 244.9, 225.92, 230.26, 226.65, 258.46, 248.55, 284.79, 312.15, 345.87, 365, 410.24, 419.44, 383.5, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 766.58, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1251.06] },
      velocityScore: { '1D': -6, '1W': 27.9, '1M': 19.7, '6M': null }, isNew: false,
      marketCap: '$1.4T', pe: 28.3, revenueGrowth: 196, eps: 44.25, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { PTF: 5.12, WCLD: false, IGV: false, FDTX: 9.36, GTEK: false, ARKK: false, MARS: false, FRWD: 5.05, BCTK: 4.64, FWD: 1.54, CBSE: false, FCUS: 4.64, WGMI: false, CNEQ: 0.91, SGRT: 8.08, SPMO: 11.31, XMMO: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 7, avgWeight: 5.54, proScore: 2.28, coverage: 0.412,
      price: 706.9, weeklyPrices: [746.23, 732.62, 670.75, 643.83, 706.90], weeklyChange: -5.27, dayChange: 9.7, sortRank: 0, periodReturns: { '1M': 34.7, 'YTD': 310.3, '6M': 293.7, '1Y': 1030.1 },
      priceHistory: { '1D': [644.38, 697.82, 706.9], '1W': [746.23, 732.62, 670.75, 643.83, 706.9], '1M': [524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 706.9], 'YTD': [172.27, 187.68, 222.1, 243.29, 278.41, 260.19, 284.1, 285.52, 282.25, 259.03, 261.18, 316.93, 273.35, 297.73, 337.88, 361.69, 403.12, 434.52, 483.15, 494.09, 459.62, 531.18, 575.5, 490.09, 712.13, 706.9], '6M': [181.54, 187.88, 212.14, 222.97, 252.66, 290.24, 262.56, 284.11, 270.57, 250.61, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 488.74, 455.8, 530.6, 594.11, 490.09, 712.13, 706.9], '1Y': [62.55, 65.78, 65.06, 67.02, 69.02, 78.69, 74.44, 76.07, 75.64, 80.67, 90.49, 96.15, 105.15, 107.21, 131.26, 119.7, 125.92, 125.72, 138.13, 163.6, 166.11, 153.97, 157.74, 161, 187.2, 175.01, 181.54, 187.88, 212.14, 222.97, 252.66, 290.24, 285.99, 284.11, 270.57, 250.61, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 488.74, 455.8, 530.6, 594.11, 490.09, 712.13, 706.9] },
      velocityScore: { '1D': -1.7, '1W': 51, '1M': null, '6M': null }, isNew: false,
      marketCap: '$244B', pe: 42.2, revenueGrowth: 46, eps: 16.74, grossMargin: 45, dividendYield: 0.09,
      etfPresence: { PTF: 5.56, WCLD: false, IGV: false, FDTX: 4, GTEK: false, ARKK: false, MARS: false, FRWD: 5.92, BCTK: false, FWD: false, CBSE: false, FCUS: 5.52, WGMI: false, CNEQ: 5.42, SGRT: 10.21, SPMO: 2.17, XMMO: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 7, avgWeight: 4.38, proScore: 1.8, coverage: 0.412,
      price: 450.55, weeklyPrices: [462.12, 467.67, 436.39, 440.83, 450.55], weeklyChange: -2.5, dayChange: 2.21, sortRank: 0, periodReturns: { '1M': 9.3, 'YTD': 48.3, '6M': 50.8, '1Y': 102.3 },
      priceHistory: { '1D': [440.8, 450.44, 450.55], '1W': [462.12, 467.67, 436.39, 440.83, 450.55], '1M': [412.32, 422.73, 424.86, 418.45, 435.63, 446.69, 436.69, 444.92, 415.17, 426.8, 408.75, 421.07, 423.93, 441.4, 425.83, 432.15, 462.12, 467.67, 436.39, 440.83, 450.55], 'YTD': [303.89, 318.01, 341.64, 327.37, 339.55, 330.73, 368.1, 370.54, 376.81, 353.86, 336.71, 338.79, 326.11, 341.49, 365.49, 363.35, 382.66, 396.06, 419.5, 399.8, 401.62, 424.86, 444.92, 408.75, 432.15, 450.55], '6M': [302.84, 322.25, 331.77, 327.16, 338.34, 335.75, 361.91, 364.2, 385.75, 353.13, 347.09, 345.98, 343.25, 337.95, 365.9, 375.1, 387.44, 393.83, 419.5, 397.28, 392.61, 422.73, 436.69, 408.75, 432.15, 450.55], '1Y': [222.74, 233.6, 229.76, 245.6, 241.6, 241.62, 242.62, 241.44, 228.6, 239.29, 235.21, 258.91, 268.64, 276.66, 288.11, 299.88, 299.84, 290.73, 303.22, 289.24, 290.62, 282.37, 289.96, 292.93, 304.85, 284.68, 302.84, 322.25, 331.77, 327.16, 338.34, 335.75, 355.41, 364.2, 385.75, 353.13, 347.09, 345.98, 343.25, 337.95, 365.9, 375.1, 387.44, 393.83, 419.5, 397.28, 392.61, 422.73, 436.69, 408.75, 432.15, 450.55] },
      velocityScore: { '1D': -0.6, '1W': -1.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 38.9, revenueGrowth: 35, eps: 11.59, grossMargin: 62, dividendYield: 0.86,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6, GTEK: false, ARKK: 0.98, MARS: false, FRWD: 5.94, BCTK: 8.74, FWD: false, CBSE: 2.58, FCUS: false, WGMI: 0.61, CNEQ: 5.83, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 7, avgWeight: 4.04, proScore: 1.66, coverage: 0.412,
      price: 547.53, weeklyPrices: [537.37, 551.63, 519.85, 519.74, 547.53], weeklyChange: 1.89, dayChange: 5.49, sortRank: 0, periodReturns: { '1M': 8.7, 'YTD': 155.7, '6M': 154.6, '1Y': 281.8 },
      priceHistory: { '1D': [519.05, 546.18, 547.53], '1W': [537.37, 551.63, 519.85, 519.74, 547.53], '1M': [503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 547.53], 'YTD': [214.16, 204.68, 227.92, 253.73, 252.18, 192.5, 205.94, 200.15, 203.68, 199.45, 197.74, 205.27, 203.77, 210.21, 236.64, 278.26, 305.33, 354.49, 421.39, 445.5, 447.58, 518.09, 523.2, 452.4, 512.48, 547.53], '6M': [214.99, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 203.08, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 448.29, 414.05, 495.54, 542.52, 452.4, 512.48, 547.53], '1Y': [143.4, 138.52, 144.16, 160.41, 162.12, 176.31, 172.4, 184.42, 165.2, 167.13, 161.79, 155.67, 157.92, 161.27, 169.73, 232.89, 234.56, 234.99, 254.84, 237.7, 258.89, 223.55, 214.24, 215.98, 221.43, 201.06, 214.99, 221.08, 207.69, 231.92, 252.03, 242.11, 216, 203.08, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 448.29, 414.05, 495.54, 542.52, 452.4, 512.48, 547.53] },
      velocityScore: { '1D': -0.6, '1W': 5.7, '1M': -42.2, '6M': null }, isNew: false,
      marketCap: '$893B', pe: 181.9, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.68, MARS: false, FRWD: 7.08, BCTK: 3.33, FWD: 2.12, CBSE: false, FCUS: 3.36, WGMI: false, CNEQ: false, SGRT: 3.64, SPMO: 4.06, XMMO: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'SPCX', name: 'SPACE EXPLORATION TECHN-CL A', easyScore: 6, avgWeight: 7.26, proScore: 2.56, coverage: 0.353,
      price: 157.48, weeklyPrices: [157.48], weeklyChange: 2.03, dayChange: 2.03, sortRank: 0, periodReturns: { '1M': 0, 'YTD': 0, '6M': 0, '1Y': 0 },
      priceHistory: undefined,
      velocityScore: { '1D': 2.4, '1W': -15.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.1T', pe: null, revenueGrowth: 15, eps: -0.68, grossMargin: 49, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.19, MARS: 23.02, FRWD: 2.66, BCTK: 8.43, FWD: 1.96, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.33, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'SPACE EXPLORATION TECHN-CL A appears in 6 of 17 Broad Tech ETFs (35% coverage) with average weight 7.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 6, avgWeight: 4.1, proScore: 1.45, coverage: 0.353,
      price: 386.39, weeklyPrices: [411.35, 392.13, 380.15, 382.07, 386.39], weeklyChange: -6.07, dayChange: 1.13, sortRank: 0, periodReturns: { '1M': -8.4, 'YTD': 11.6, '6M': 10.3, '1Y': 46 },
      priceHistory: { '1D': [382.08, 385.67, 386.39], '1W': [411.35, 392.13, 380.15, 382.07, 386.39], '1M': [422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 386.39], 'YTD': [346.1, 332.48, 343.02, 325.49, 330.73, 310.51, 331.17, 332.65, 321.7, 332.77, 335.97, 319.84, 309.42, 313.49, 354.91, 398.47, 419.94, 417.43, 425.44, 416.79, 417.76, 426.58, 418.91, 372.1, 392.9, 386.39], '6M': [352.13, 343.42, 352.21, 332.6, 332.79, 320.33, 340.44, 332.54, 325.49, 313.84, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 419.3, 411.07, 421.86, 479.23, 372.1, 392.9, 386.39], '1Y': [264.65, 269.9, 275.4, 286.45, 288.71, 293.7, 303.76, 309.09, 291.17, 300.25, 306.1, 359.63, 345.35, 336.1, 338.18, 345.02, 354.15, 344.29, 376.47, 355.59, 355.22, 354.42, 397.57, 381.03, 406.37, 329.88, 352.13, 343.42, 352.21, 332.6, 332.79, 320.33, 343.94, 332.54, 325.49, 313.84, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 419.3, 411.07, 421.86, 479.23, 372.1, 392.9, 386.39] },
      velocityScore: { '1D': 0, '1W': 22.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 64.4, revenueGrowth: 48, eps: 6, grossMargin: 76, dividendYield: 0.68,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.79, GTEK: false, ARKK: 1.13, MARS: false, FRWD: 5.09, BCTK: 6.93, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.36, SGRT: false, SPMO: 6.28, XMMO: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 6, avgWeight: 3.44, proScore: 1.22, coverage: 0.353,
      price: 226.22, weeklyPrices: [244.39, 232.79, 234.11, 234.27, 226.22], weeklyChange: -7.43, dayChange: -3.48, sortRank: 0, periodReturns: { '1M': -14.7, 'YTD': -2, '6M': -2.7, '1Y': 6.7 },
      priceHistory: { '1D': [234.37, 226.23, 226.22], '1W': [244.39, 232.79, 234.11, 234.27, 226.22], '1M': [265.29, 271.85, 274, 270.64, 261.26, 256.52, 250.02, 253.79, 246.03, 245.22, 238, 241.51, 238.55, 246.02, 246, 237.5, 244.39, 232.79, 234.11, 234.27, 226.22], 'YTD': [230.82, 246.29, 238.18, 234.34, 241.73, 222.69, 199.6, 210.11, 207.92, 218.94, 209.53, 208.76, 207.54, 210.57, 233.65, 249.7, 255.08, 265.06, 274.99, 270.13, 265.01, 274, 253.79, 238, 237.5, 226.22], '6M': [232.52, 233.06, 246.47, 231, 244.68, 238.62, 206.96, 201.15, 208.56, 208.73, 214.33, 215.2, 207.24, 208.27, 221.25, 248.5, 255.36, 263.04, 274.99, 265.82, 259.34, 271.85, 250.02, 238, 237.5, 226.22], '1Y': [211.99, 219.92, 222.26, 223.88, 232.23, 234.11, 223.13, 224.56, 223.81, 229.12, 235.68, 229.95, 231.23, 218.15, 222.41, 227.74, 214.47, 221.09, 222.86, 243.04, 244.2, 222.69, 229.16, 229.11, 230.28, 226.76, 232.52, 233.06, 246.47, 231, 244.68, 238.62, 208.72, 201.15, 208.56, 208.73, 214.33, 215.2, 207.24, 208.27, 221.25, 248.5, 255.36, 263.04, 274.99, 265.82, 259.34, 271.85, 250.02, 238, 237.5, 226.22] },
      velocityScore: { '1D': 25.8, '1W': 6.1, '1M': -70.7, '6M': null }, isNew: false,
      marketCap: '$2.4T', pe: 30.6, revenueGrowth: 17, eps: 7.4, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.01, GTEK: false, ARKK: 2.36, MARS: false, FRWD: 2.8, BCTK: 4.22, FWD: 1.46, CBSE: false, FCUS: false, WGMI: false, CNEQ: 5.81, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 5, avgWeight: 5, proScore: 1.47, coverage: 0.294,
      price: 1087.72, weeklyPrices: [1070.23, 1094.04, 1038.59, 993.25, 1087.72], weeklyChange: 1.63, dayChange: 9.48, sortRank: 0, periodReturns: { '1M': 28.6, 'YTD': 295, '6M': 281.3, '1Y': 685.1 },
      priceHistory: { '1D': [993.45, 1088, 1087.72], '1W': [1070.23, 1094.04, 1038.59, 993.25, 1087.72], '1M': [845.76, 870.66, 880.72, 879.8, 921.26, 926.61, 940.69, 925.99, 847.47, 876.77, 815.99, 868.09, 931.04, 1018.8, 1031.34, 1066.07, 1070.23, 1094.04, 1038.59, 993.25, 1087.72], 'YTD': [275.39, 284.47, 320.32, 346.53, 446.57, 405.45, 431.17, 411.11, 409.67, 367.34, 373.98, 434.6, 378.79, 423.12, 500.77, 531.81, 587.62, 673.64, 786.42, 817.35, 751.07, 880.72, 925.99, 815.99, 1066.07, 1087.72], '6M': [286.22, 289.83, 321.48, 325.99, 371.76, 444.45, 396.23, 415.94, 396.02, 357.62, 384.29, 421.09, 424.96, 391.76, 496.3, 519.6, 579.88, 643.3, 786.42, 808.8, 733.35, 870.66, 940.69, 815.99, 1066.07, 1087.72], '1Y': [138.54, 151.94, 144.5, 146.72, 152.73, 157.01, 148.1, 156.92, 158.4, 167.24, 183.98, 196.81, 216.64, 219.85, 254.74, 221.7, 226.03, 226.41, 268.34, 278.47, 283.26, 259.14, 272.28, 265.63, 307.85, 292, 286.22, 289.83, 321.48, 325.99, 371.76, 444.45, 425, 415.94, 396.02, 357.62, 384.29, 421.09, 424.96, 391.76, 496.3, 519.6, 579.88, 643.3, 786.42, 808.8, 733.35, 870.66, 940.69, 815.99, 1066.07, 1087.72] },
      velocityScore: { '1D': -0.7, '1W': -14, '1M': -35.8, '6M': null }, isNew: false,
      marketCap: '$246B', pe: 103.3, revenueGrowth: 44, eps: 10.53, grossMargin: 42, dividendYield: 0.3,
      etfPresence: { PTF: 5.24, WCLD: false, IGV: false, FDTX: 4.04, GTEK: false, ARKK: false, MARS: false, FRWD: 8.6, BCTK: false, FWD: false, CBSE: false, FCUS: 4.94, WGMI: false, CNEQ: false, SGRT: false, SPMO: 2.16, XMMO: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'LRCX', name: 'LRCX', easyScore: 5, avgWeight: 4.6, proScore: 1.35, coverage: 0.294,
      price: 392.85, weeklyPrices: [389.04, 409.54, 371.33, 374.80, 392.85], weeklyChange: 0.98, dayChange: 4.81, sortRank: 0, periodReturns: { '1M': 21.7, 'YTD': 129.5, '6M': 121.5, '1Y': 309.1 },
      priceHistory: { '1D': [374.82, 392.77, 392.85], '1W': [389.04, 409.54, 371.33, 374.8, 392.85], '1M': [322.68, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 321.8, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04, 409.54, 371.33, 374.8, 392.85], 'YTD': [171.18, 200.96, 217.47, 220.7, 248.17, 213.31, 231.29, 244.92, 239.07, 214.68, 209.49, 233.99, 211.62, 222.01, 258.76, 260.96, 258.56, 257.86, 297.17, 295.44, 292.09, 318, 336.41, 321.8, 374.18, 392.85], '6M': [178.07, 194.76, 220.4, 222.41, 238.46, 230.1, 226.61, 235.58, 244.25, 217.27, 215.23, 226.47, 238.84, 213.66, 246.49, 265.16, 265.55, 248.75, 297.17, 289.24, 273.38, 318.93, 343.71, 321.8, 374.18, 392.85], '1Y': [96.02, 98.83, 101.06, 100.79, 97.78, 94.84, 99.15, 106.74, 99.15, 103.67, 100.42, 115.58, 126.32, 128.13, 146.99, 141, 142.37, 147.54, 161.01, 162.19, 161.42, 148.8, 155.14, 157.09, 168.71, 164.7, 178.07, 194.76, 220.4, 222.41, 238.46, 230.1, 229.28, 235.58, 244.25, 217.27, 215.23, 226.47, 238.84, 213.66, 246.49, 265.16, 265.55, 248.75, 297.17, 289.24, 273.38, 318.93, 343.71, 321.8, 374.18, 392.85] },
      velocityScore: { '1D': -2.2, '1W': 5.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$491B', pe: 74.4, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.28,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.9, BCTK: 8.1, FWD: 1.97, CBSE: 3.01, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 4.02, XMMO: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 5, avgWeight: 4.08, proScore: 1.2, coverage: 0.294,
      price: 335.98, weeklyPrices: [367.46, 348.78, 346.08, 345.04, 335.98], weeklyChange: -8.57, dayChange: -2.62, sortRank: 0, periodReturns: { '1M': -12.7, 'YTD': 7.1, '6M': 6.4, '1Y': 95.9 },
      priceHistory: { '1D': [345.02, 336.27, 335.98], '1W': [367.46, 348.78, 346.08, 345.04, 335.98], '1M': [384.84, 384.83, 386.12, 376.43, 372.58, 358.39, 355.68, 369.27, 365.76, 361.17, 353.32, 356.56, 358.16, 367.11, 371.1, 362.1, 367.46, 348.78, 346.08, 345.04, 335.98], 'YTD': [313.8, 326.01, 333.16, 330.84, 338.66, 331.33, 309.37, 314.9, 307.15, 300.91, 303.21, 305.73, 280.74, 294.9, 316.37, 332.77, 337.75, 381.94, 395.14, 399.04, 384.9, 386.12, 369.27, 353.32, 362.1, 335.98], '6M': [314.96, 317.32, 332.73, 322.16, 335, 340.7, 318.63, 302.82, 310.92, 303.56, 306.93, 309.41, 289.2, 286.86, 314.74, 334.47, 337.73, 347.31, 395.14, 383.82, 384.9, 384.83, 355.68, 353.32, 362.1, 335.98], '1Y': [171.49, 179.76, 178.7, 184.7, 193.2, 192.86, 197.28, 203.03, 200.19, 208.21, 232.66, 240.78, 252.33, 246.57, 246.43, 242.21, 251.88, 253.73, 281.9, 285.34, 287.43, 292.99, 320.28, 318.39, 313.7, 303.75, 314.96, 317.32, 332.73, 322.16, 335, 340.7, 324.4, 302.82, 310.92, 303.56, 306.93, 309.41, 289.2, 286.86, 314.74, 334.47, 337.73, 347.31, 395.14, 383.82, 384.9, 384.83, 355.68, 353.32, 362.1, 335.98] },
      velocityScore: { '1D': 0.8, '1W': 39.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.1T', pe: 25.6, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.26,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.66, GTEK: false, ARKK: 1.91, MARS: false, FRWD: false, BCTK: 5.71, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 5.7, SGRT: false, SPMO: 3.41, XMMO: false },
      tonyNote: 'Alphabet Inc Class C appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 4.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, avgWeight: 5.28, proScore: 1.24, coverage: 0.235,
      price: 360.34, weeklyPrices: [379.40, 367.34, 373.94, 365.46, 360.34], weeklyChange: -5.02, dayChange: -1.4, sortRank: 0, periodReturns: { '1M': -13.4, 'YTD': -25.5, '6M': -26.2, '1Y': -26.8 },
      priceHistory: { '1D': [365.44, 359.96, 360.34], '1W': [379.4, 367.34, 373.94, 365.46, 360.34], '1M': [416.03, 412.67, 426.99, 450.24, 460.52, 441.31, 427.34, 428.05, 416.67, 411.74, 397.36, 390.34, 390.74, 399.76, 393.83, 378.91, 379.4, 367.34, 373.94, 365.46, 360.34], 'YTD': [483.62, 478.11, 456.66, 451.14, 433.5, 393.67, 401.84, 397.23, 401.72, 410.68, 401.86, 389.02, 365.97, 369.37, 373.07, 420.26, 415.75, 407.78, 413.96, 405.21, 421.06, 426.99, 428.05, 397.36, 378.91, 360.34], '6M': [487.71, 472.85, 477.18, 454.52, 480.58, 411.21, 413.27, 396.86, 389, 403.93, 405.76, 399.41, 372.74, 370.17, 374.33, 411.22, 432.92, 424.46, 413.96, 407.77, 417.42, 412.67, 427.34, 397.36, 378.91, 360.34], '1Y': [492.27, 491.09, 501.48, 511.7, 510.88, 533.5, 520.84, 520.58, 505.72, 506.74, 507.97, 501.01, 508.45, 507.03, 515.74, 522.4, 511.61, 520.56, 525.76, 497.1, 511.14, 487.12, 485.5, 480.84, 483.47, 483.98, 487.71, 472.85, 477.18, 454.52, 480.58, 411.21, 413.6, 396.86, 389, 403.93, 405.76, 399.41, 372.74, 370.17, 374.33, 411.22, 432.92, 424.46, 413.96, 407.77, 417.42, 412.67, 427.34, 397.36, 378.91, 360.34] },
      velocityScore: { '1D': -0.8, '1W': 11.7, '1M': -75.1, '6M': null }, isNew: false,
      marketCap: '$2.7T', pe: 21.5, revenueGrowth: 18, eps: 16.77, grossMargin: 68, dividendYield: 1,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.28, FDTX: 3.79, GTEK: false, ARKK: false, MARS: false, FRWD: 2.78, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 6.27, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 4, avgWeight: 4.55, proScore: 1.07, coverage: 0.235,
      price: 2277.11, weeklyPrices: [2184.75, 2273.73, 1963.60, 1914.46, 2277.11], weeklyChange: 4.23, dayChange: 18.51, sortRank: 0, periodReturns: { '1M': 43.3, 'YTD': 859.3, '6M': 810.6, '1Y': 4719.3 },
      priceHistory: { '1D': [1921.41, 2263.5, 2277.11], '1W': [2184.75, 2273.73, 1963.6, 1914.46, 2277.11], '1M': [1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2277.11], 'YTD': [237.38, 334.54, 409.24, 503.44, 539.3, 576.2, 630.29, 649.97, 651.9, 565.59, 618.82, 772.09, 603.17, 692.73, 851.57, 919.47, 932.43, 1096.51, 1409.98, 1447.23, 1392.56, 1641.64, 1759.68, 1643.23, 1958.8, 2277.11], '6M': [250.05, 274.08, 389.27, 453.12, 481.43, 695.51, 541.64, 590.59, 638.52, 565.41, 618.89, 720.17, 702.48, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1452.02, 1383.29, 1589.94, 1831.5, 1643.23, 1958.8, 2277.11], '1Y': [47.25, 46.21, 46.95, 41.52, 42.06, 42.92, 40.69, 47.01, 44.4, 48.44, 62.5, 84.3, 98.87, 94.29, 124.14, 129.68, 144.27, 167.05, 195.82, 207.69, 283.1, 245.96, 215.04, 213.31, 241.61, 219.46, 250.05, 274.08, 389.27, 453.12, 481.43, 695.51, 583.4, 590.59, 638.52, 565.41, 618.89, 720.17, 702.48, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1452.02, 1383.29, 1589.94, 1831.5, 1643.23, 1958.8, 2277.11] },
      velocityScore: { '1D': -1.8, '1W': -7, '1M': -51.1, '6M': null }, isNew: false,
      marketCap: '$337B', pe: 77.7, revenueGrowth: 251, eps: 29.29, grossMargin: 56, dividendYield: null,
      etfPresence: { PTF: 8.55, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.57, CBSE: false, FCUS: 5.3, WGMI: false, CNEQ: false, SGRT: false, SPMO: 2.77, XMMO: false },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks', easyScore: 4, avgWeight: 4.16, proScore: 0.98, coverage: 0.235,
      price: 289.35, weeklyPrices: [287.78, 286.40, 290.92, 285.26, 289.35], weeklyChange: 0.54, dayChange: 1.43, sortRank: 0, periodReturns: { '1M': 12.7, 'YTD': 57.1, '6M': 54.5, '1Y': 41.6 },
      priceHistory: { '1D': [285.26, 287.85, 289.35], '1W': [287.78, 286.4, 290.92, 285.26, 289.35], '1M': [256.75, 248.47, 257.77, 281.69, 300.48, 297.18, 280.43, 279.25, 272.05, 266.33, 263.22, 279.53, 279.62, 284.54, 279.9, 282.13, 287.78, 286.4, 290.92, 285.26, 289.35], 'YTD': [184.2, 190.8, 187.73, 182.27, 176.2, 154.77, 162.81, 148.7, 149.4, 163.16, 168.12, 169.74, 156.36, 160.67, 166.99, 166.97, 173.21, 179.32, 183.68, 227.79, 246.66, 257.77, 279.25, 263.22, 282.13, 289.35], '6M': [188.45, 182.12, 188.88, 184.06, 183.5, 166.24, 165.51, 163.5, 141.67, 156.09, 165.58, 169.19, 157.21, 160.32, 173.78, 164.11, 181.2, 181.54, 183.68, 215.6, 240.13, 248.47, 280.43, 263.22, 282.13, 289.35], '1Y': [204.3, 196.97, 192.07, 196.28, 201.16, 173.6, 168.1, 176.86, 184.43, 187.61, 192.35, 198.33, 205.68, 202.21, 209.3, 215.17, 205.51, 215.02, 218.27, 211.37, 210.04, 199.9, 185.35, 195.68, 190.36, 185.88, 188.45, 182.12, 188.88, 184.06, 183.5, 166.24, 166, 163.5, 141.67, 156.09, 165.58, 169.19, 157.21, 160.32, 173.78, 164.11, 181.2, 181.54, 183.68, 215.6, 240.13, 248.47, 280.43, 263.22, 282.13, 289.35] },
      velocityScore: { '1D': 0, '1W': -14.8, '1M': -58.1, '6M': null }, isNew: false,
      marketCap: '$236B', pe: 253.8, revenueGrowth: 31, eps: 1.14, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.83, IGV: 9.09, FDTX: 3.67, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.03, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'LITE', name: 'Lumentum Holdings Inc', easyScore: 4, avgWeight: 3.8, proScore: 0.89, coverage: 0.235,
      price: 881.57, weeklyPrices: [850.00, 893.93, 827.92, 842.53, 881.57], weeklyChange: 3.71, dayChange: 4.58, sortRank: 0, periodReturns: { '1M': -3.2, 'YTD': 139.2, '6M': 122.7, '1Y': 860.6 },
      priceHistory: { '1D': [842.95, 883.16, 881.57], '1W': [850, 893.93, 827.92, 842.53, 881.57], '1M': [910.81, 902.31, 860.62, 854.96, 905, 1029.15, 938, 945.08, 863.66, 895.4, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93, 827.92, 842.53, 881.57], 'YTD': [368.59, 348.26, 343.27, 354.49, 381.44, 504.42, 583.46, 667.77, 677, 650.82, 616.09, 772.13, 688.8, 764.65, 894.13, 891.22, 846.89, 902.32, 944.28, 1030.37, 868.07, 860.62, 945.08, 853.26, 869.98, 881.57], '6M': [390.77, 357.05, 339.87, 356.83, 370.66, 435.1, 561.13, 600.42, 688.27, 694.43, 672, 649.56, 801.99, 702.76, 896.02, 824.01, 873.6, 858.32, 944.28, 992.37, 890.09, 902.31, 938, 853.26, 869.98, 881.57], '1Y': [91.77, 91.24, 92.62, 102.64, 102.85, 110.08, 111.13, 120.23, 115.89, 125.84, 141.91, 164.88, 171.5, 159.11, 169.75, 159.76, 163.23, 168.5, 200.13, 239.68, 253.81, 268.92, 308.28, 327.85, 372.09, 337.13, 390.77, 357.05, 339.87, 356.83, 370.66, 435.1, 577.15, 600.42, 688.27, 694.43, 672, 649.56, 801.99, 702.76, 896.02, 824.01, 873.6, 858.32, 944.28, 992.37, 890.09, 902.31, 938, 853.26, 869.98, 881.57] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$69B', pe: 156.3, revenueGrowth: 90, eps: 5.64, grossMargin: 41, dividendYield: null,
      etfPresence: { PTF: 3.71, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 1.41, FWD: false, CBSE: false, FCUS: 2.31, WGMI: false, CNEQ: false, SGRT: 7.77, SPMO: false, XMMO: false },
      tonyNote: 'Lumentum Holdings Inc appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRWD', name: 'CrowdStrike', easyScore: 4, avgWeight: 2.93, proScore: 0.69, coverage: 0.235,
      price: 680.35, weeklyPrices: [684.86, 675.44, 680.92, 673.02, 680.35], weeklyChange: -0.66, dayChange: 1.09, sortRank: 0, periodReturns: { '1M': 1.3, 'YTD': 45.1, '6M': 42.6, '1Y': 37.7 },
      priceHistory: { '1D': [673.02, 679.21, 680.35], '1W': [684.86, 675.44, 680.92, 673.02, 680.35], '1M': [671.55, 645.36, 671, 731, 782.17, 768.95, 747.61, 719.09, 671.02, 658.79, 647.74, 691.53, 682.8, 692.91, 679.49, 682.96, 684.86, 675.44, 680.92, 673.02, 680.35], 'YTD': [468.76, 463.87, 455, 453.77, 444.62, 377.16, 411.54, 388.6, 381.1, 426.16, 441.54, 428.18, 392.62, 393.31, 394.68, 418.2, 445.39, 445.75, 468.07, 562.57, 650.11, 671, 719.09, 647.74, 682.96, 680.35], '6M': [481.19, 456.55, 466.99, 442.73, 476.66, 421.73, 413.39, 414.29, 350.25, 391.42, 436.33, 433.2, 392.99, 390.41, 426.51, 411.16, 466.68, 452.38, 468.07, 546.18, 616.88, 645.36, 747.61, 647.74, 682.96, 680.35], '1Y': [494.09, 496.1, 487.11, 469.83, 462.03, 454.57, 425, 432.12, 419.17, 422.61, 412.46, 433.38, 502.63, 473.09, 496.8, 509.13, 482.23, 521.98, 538.68, 532.52, 545.86, 520.59, 501.54, 513.12, 517.65, 477.26, 481.19, 456.55, 466.99, 442.73, 476.66, 421.73, 408.04, 414.29, 350.25, 391.42, 436.33, 433.2, 392.99, 390.41, 426.51, 411.16, 466.68, 452.38, 468.07, 546.18, 616.88, 645.36, 747.61, 647.74, 682.96, 680.35] },
      velocityScore: { '1D': null, '1W': -10.4, '1M': null, '6M': null }, isNew: true,
      marketCap: '$173B', pe: null, revenueGrowth: 26, eps: -0.13, grossMargin: 75, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.56, IGV: 6.73, FDTX: 1.24, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 1.17, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'CrowdStrike appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SHOP', name: 'Shopify Inc Registered Shs -A- Subord Vtg', easyScore: 4, avgWeight: 2.91, proScore: 0.68, coverage: 0.235,
      price: 113.06, weeklyPrices: [108.85, 107.98, 107.68, 114.17, 113.06], weeklyChange: 3.87, dayChange: -0.97, sortRank: 0, periodReturns: { '1M': 7.8, 'YTD': -29.8, '6M': -33.3, '1Y': -0.7 },
      priceHistory: { '1D': [114.17, 112.6, 113.06], '1W': [108.85, 107.98, 107.68, 114.17, 113.06], '1M': [104.9, 106.6, 115.03, 118.71, 124.12, 117.01, 112.94, 116.04, 109.54, 110.78, 108.2, 110.47, 108.24, 112.49, 113.23, 108.09, 108.85, 107.98, 107.68, 114.17, 113.06], 'YTD': [160.97, 168.28, 157.99, 137.64, 143.64, 111.24, 110.66, 126.2, 125.94, 134.79, 126.17, 122.37, 115.43, 118.52, 112.38, 126.94, 124.23, 121.13, 105.44, 95.4, 105.01, 115.03, 116.04, 108.2, 108.09, 113.06], '6M': [170.83, 166.21, 167.93, 144.5, 137.5, 119.29, 127.24, 113.54, 116.93, 121.87, 129.36, 127.8, 116.15, 118.62, 120.1, 127.41, 131.96, 121.26, 105.44, 99.84, 101.01, 106.6, 112.94, 108.2, 108.09, 113.06], '1Y': [113.89, 114.77, 115.16, 126.75, 122.08, 122.21, 151.07, 150.09, 137.29, 139.89, 145.15, 145.03, 152.11, 143.45, 151.3, 163.87, 156.57, 167.03, 173.61, 156.05, 156.59, 146, 159.34, 162.31, 164.75, 166.8, 170.83, 166.21, 167.93, 144.5, 137.5, 119.29, 118.4, 113.54, 116.93, 121.87, 129.36, 127.8, 116.15, 118.62, 120.1, 127.41, 131.96, 121.26, 105.44, 99.84, 101.01, 106.6, 112.94, 108.2, 108.09, 113.06] },
      velocityScore: { '1D': 3, '1W': -22.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$147B', pe: 110.8, revenueGrowth: 34, eps: 1.02, grossMargin: 48, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.89, GTEK: false, ARKK: 4.39, MARS: false, FRWD: 1.79, BCTK: 2.56, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Shopify Inc Registered Shs -A- Subord Vtg appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC-CL A', easyScore: 4, avgWeight: 2.47, proScore: 0.58, coverage: 0.235,
      price: 336.39, weeklyPrices: [368.03, 349.68, 346.13, 345.29, 336.39], weeklyChange: -8.6, dayChange: -2.57, sortRank: 0, periodReturns: { '1M': -13.5, 'YTD': 7.5, '6M': 7.1, '1Y': 97.1 },
      priceHistory: { '1D': [345.28, 336.38, 336.39], '1W': [368.03, 349.68, 346.13, 345.29, 336.39], '1M': [388.88, 388.83, 390.13, 380.34, 376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 356.38, 357.77, 359.68, 369.35, 373.25, 363.79, 368.03, 349.68, 346.13, 345.29, 336.39], 'YTD': [313, 325.44, 332.78, 330.54, 338.25, 331.25, 309, 314.98, 307.38, 300.88, 303.55, 307.13, 280.92, 297.39, 318.49, 336.02, 338.89, 384.8, 398.04, 402.62, 388.91, 390.13, 372.19, 356.38, 363.79, 336.39], '6M': [313.51, 316.54, 331.86, 322, 334.55, 339.71, 318.58, 302.02, 310.9, 303.58, 307.04, 310.92, 290.44, 287.56, 317.32, 337.12, 339.32, 349.94, 398.04, 387.35, 387.66, 388.83, 358.99, 356.38, 363.79, 336.39], '1Y': [170.68, 178.64, 177.62, 183.58, 192.17, 191.9, 196.52, 201.96, 199.32, 207.48, 232.3, 240.37, 252.03, 245.79, 245.69, 241.53, 251.46, 253.08, 281.48, 284.75, 286.71, 292.81, 319.95, 317.62, 312.43, 302.46, 313.51, 316.54, 331.86, 322, 334.55, 339.71, 324.32, 302.02, 310.9, 303.58, 307.04, 310.92, 290.44, 287.56, 317.32, 337.12, 339.32, 349.94, 398.04, 387.35, 387.66, 388.83, 358.99, 356.38, 363.79, 336.39] },
      velocityScore: { '1D': -1.7, '1W': null, '1M': -85.9, '6M': null }, isNew: false,
      marketCap: '$4.1T', pe: 25.6, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 0.49, MARS: false, FRWD: 3.19, BCTK: false, FWD: 1.93, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 4.26, XMMO: false },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'KLAC', name: 'KLAC', easyScore: 4, avgWeight: 2.01, proScore: 0.47, coverage: 0.235,
      price: 253.56, weeklyPrices: [259.56, 269.16, 244.49, 240.48, 253.56], weeklyChange: -2.31, dayChange: 5.44, sortRank: 0, periodReturns: { '1M': 26.1, 'YTD': 108.7, '6M': 98.6, '1Y': 183.8 },
      priceHistory: { '1D': [240.47, 253.45, 253.56], '1W': [259.56, 269.16, 244.49, 240.48, 253.56], '1M': [201.14, 195.72, 192.76, 192.17, 194, 204.52, 212.51, 213.11, 192.92, 210.81, 213.56, 241.16, 254.54, 256.42, 237.33, 238.73, 259.56, 269.16, 244.49, 240.48, 253.56], 'YTD': [121.51, 132.46, 154.5, 150, 168.47, 133.1, 145.09, 149.6, 152.43, 142.94, 140.96, 151.15, 145.11, 151.98, 172.73, 173.49, 181.54, 175.04, 181.63, 184.97, 182.95, 192.76, 213.11, 213.56, 238.73, 253.56], '6M': [127.96, 135.24, 142.82, 148.62, 161.63, 135.55, 143.08, 147.02, 150.66, 144.13, 145.29, 148.13, 156.62, 147.24, 167.23, 174.81, 181.21, 181.62, 181.63, 181.13, 174.06, 195.72, 212.51, 213.56, 238.73, 253.56], '1Y': [89.35, 92.11, 92.86, 93.71, 90.42, 87.9, 91.21, 94.95, 87.84, 88.89, 87.33, 95.93, 104.67, 105.91, 113.93, 105.35, 109.88, 115.9, 121.44, 120.64, 119.9, 116.75, 115.91, 120.81, 124.62, 122.24, 127.96, 135.24, 142.82, 148.62, 161.63, 135.55, 144.02, 147.02, 150.66, 144.13, 145.29, 148.13, 156.62, 147.24, 167.23, 174.81, 181.21, 181.62, 181.63, 181.13, 174.06, 195.72, 212.51, 213.56, 238.73, 253.56] },
      velocityScore: { '1D': -4.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$331B', pe: 71.6, revenueGrowth: 12, eps: 3.54, grossMargin: 61, dividendYield: 0.38,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: 1.67, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.78, CBSE: 2.86, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.72, XMMO: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 3, avgWeight: 5.21, proScore: 0.92, coverage: 0.176,
      price: 373.35, weeklyPrices: [400.49, 405.05, 381.61, 375.53, 373.35], weeklyChange: -6.78, dayChange: -0.56, sortRank: 0, periodReturns: { '1M': -13.9, 'YTD': -17, '6M': -23.1, '1Y': 14 },
      priceHistory: { '1D': [375.46, 373.29, 373.35], '1W': [400.49, 405.05, 381.61, 375.53, 373.35], '1M': [433.59, 440.36, 442.1, 435.79, 415.88, 423.74, 423.7, 418.45, 391, 408.95, 381.59, 399.15, 406.43, 411.15, 404.66, 396.38, 400.49, 405.05, 381.61, 375.53, 373.35], 'YTD': [449.72, 435.8, 438.57, 449.36, 416.56, 397.21, 417.07, 411.82, 408.58, 405.55, 395.01, 380.3, 372.11, 381.26, 345.62, 388.9, 373.72, 381.63, 398.73, 445.27, 417.26, 442.1, 418.45, 381.59, 396.38, 373.35], '6M': [475.19, 451.67, 448.96, 419.25, 430.9, 421.96, 425.21, 410.63, 409.38, 392.43, 399.24, 399.27, 383.03, 371.75, 343.25, 391.95, 387.51, 372.8, 398.73, 433.45, 404.11, 440.36, 423.7, 381.59, 396.38, 373.35], '1Y': [327.55, 315.65, 309.87, 319.41, 305.3, 308.27, 322.27, 339.38, 323.9, 349.6, 338.53, 368.81, 416.85, 423.39, 436, 435.54, 428.75, 448.98, 440.1, 445.91, 430.6, 403.99, 426.58, 454.53, 446.89, 483.37, 475.19, 451.67, 448.96, 419.25, 430.9, 421.96, 417.32, 410.63, 409.38, 392.43, 399.24, 399.27, 383.03, 371.75, 343.25, 391.95, 387.51, 372.8, 398.73, 433.45, 404.11, 440.36, 423.7, 381.59, 396.38, 373.35] },
      velocityScore: { '1D': -1.1, '1W': -14, '1M': -82.3, '6M': null }, isNew: false,
      marketCap: '$1.4T', pe: 342.5, revenueGrowth: 16, eps: 1.09, grossMargin: 19, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 9.55, MARS: false, FRWD: false, BCTK: 3.15, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 2.92, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'BE', name: 'Bloom Energy Corp', easyScore: 4, avgWeight: 3.74, proScore: 2.99, coverage: 0.8,
      price: 345.98, weeklyPrices: [328.91, 345.85, 321.98, 326.19, 345.98], weeklyChange: 5.19, dayChange: 6.29, sortRank: 0, periodReturns: { '1M': 14.4, 'YTD': 298.2, '6M': 276.6, '1Y': 1501.8 },
      priceHistory: { '1D': [325.5, 344.05, 345.98], '1W': [328.91, 345.85, 321.98, 326.19, 345.98], '1M': [302.4, 293.8, 290.01, 285, 273.51, 302.85, 287.32, 291.37, 263.61, 253.57, 234.23, 248.88, 260.22, 274.5, 280.88, 284.99, 328.91, 345.85, 321.98, 326.19, 345.98], 'YTD': [86.89, 121.84, 139.17, 145.63, 156.51, 136.6, 139.03, 147.55, 168.57, 159.99, 157.17, 166.69, 133.52, 132.45, 160.13, 210.06, 237.57, 283.36, 285.47, 289.76, 282.31, 290.01, 291.37, 234.23, 284.99, 345.98], '6M': [90.18, 103.87, 136.87, 151.75, 152.31, 168.89, 148.7, 145.32, 166.2, 153.02, 154, 160.05, 145.88, 135.49, 146.78, 213.84, 229.75, 287.97, 285.47, 280.69, 261.34, 293.8, 287.32, 234.23, 284.99, 345.98], '1Y': [21.6, 22.56, 25.85, 24.31, 33.06, 37.39, 36.8, 44.08, 44.51, 50.85, 54.91, 67.29, 80.97, 68.69, 88, 86.65, 115.09, 101.42, 127.85, 136.86, 126.72, 108.93, 101.14, 118.09, 108.99, 80.21, 90.18, 103.87, 136.87, 151.75, 152.31, 168.89, 155.17, 145.32, 166.2, 153.02, 154, 160.05, 145.88, 135.49, 146.78, 213.84, 229.75, 287.97, 285.47, 280.69, 261.34, 293.8, 287.32, 234.23, 284.99, 345.98] },
      velocityScore: { '1D': 15.4, '1W': 29.4, '1M': 19.6, '6M': null }, isNew: false,
      marketCap: '$98B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: 1.8, VOLT: 4.53, PBD: false, PBW: 2.79, IVEP: 5.85 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 3, avgWeight: 4.76, proScore: 2.86, coverage: 0.6,
      price: 712.35, weeklyPrices: [702.25, 740.14, 702.29, 701.88, 712.35], weeklyChange: 1.44, dayChange: 1.42, sortRank: 0, periodReturns: { '1M': -4, 'YTD': 68.8, '6M': 64.3, '1Y': 90.4 },
      priceHistory: { '1D': [702.36, 713.51, 712.35], '1W': [702.25, 740.14, 702.29, 701.88, 712.35], '1M': [742.18, 733.62, 730.1, 711.73, 687.48, 706.06, 715.67, 719.17, 695.11, 693.81, 650.92, 683.29, 707.74, 724.35, 719.29, 714.85, 702.25, 740.14, 702.29, 701.88, 712.35], 'YTD': [422.06, 413.17, 447.64, 468.78, 483.43, 477.72, 515.88, 552.66, 565.05, 549.22, 566.91, 577.95, 545.64, 560.12, 582.06, 587.42, 633.44, 727.77, 785.24, 773.72, 709.93, 730.1, 719.17, 650.92, 714.85, 712.35], '6M': [432.67, 435.82, 432.66, 463.49, 479.27, 488.6, 510.64, 525.13, 568.21, 566, 564.05, 571.64, 578.44, 549.02, 576.24, 591.82, 613.78, 628.6, 785.24, 765.81, 714.13, 733.62, 715.67, 650.92, 714.85, 712.35], '1Y': [374.07, 373.41, 380.09, 397.9, 407.22, 406.13, 387.35, 379.96, 375.87, 381.56, 376.09, 389.64, 390.65, 400.41, 420.86, 429.92, 437.52, 427.36, 453.83, 442.9, 449.42, 445.47, 460.43, 464.84, 466.91, 421.31, 432.67, 435.82, 432.66, 463.49, 479.27, 488.6, 514.56, 525.13, 568.21, 566, 564.05, 571.64, 578.44, 549.02, 576.24, 591.82, 613.78, 628.6, 785.24, 765.81, 714.13, 733.62, 715.67, 650.92, 714.85, 712.35] },
      velocityScore: { '1D': 1.1, '1W': -1.4, '1M': -22.1, '6M': null }, isNew: false,
      marketCap: '$107B', pe: 97.6, revenueGrowth: 26, eps: 7.3, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.8, VOLT: 5.25, PBD: false, PBW: false, IVEP: 4.24 },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 3, avgWeight: 4.68, proScore: 2.81, coverage: 0.6,
      price: 315.62, weeklyPrices: [297.20, 307.80, 291.50, 294.49, 315.62], weeklyChange: 6.2, dayChange: 7.12, sortRank: 0, periodReturns: { '1M': 8.1, 'YTD': 197, '6M': 181.7, '1Y': 397.7 },
      priceHistory: { '1D': [294.64, 314.27, 315.62], '1W': [297.2, 307.8, 291.5, 294.49, 315.62], '1M': [291.97, 295.94, 288.9, 284.42, 288.12, 299.07, 299.73, 300.06, 284.87, 293.6, 262.34, 290.5, 294.75, 303.53, 292.7, 294.03, 297.2, 307.8, 291.5, 294.49, 315.62], 'YTD': [106.26, 119.94, 135.18, 142.29, 152.31, 179.6, 197.63, 182.27, 176.96, 167.67, 171.19, 175.13, 174.8, 184.68, 230.81, 232.81, 252.18, 277.27, 320.3, 300.84, 271.05, 288.9, 300.06, 262.34, 294.03, 315.62], '6M': [113.62, 120.46, 128.85, 142.76, 147.43, 151.08, 190.09, 187.21, 186.39, 170.37, 176.51, 174.04, 186.82, 180.36, 218.07, 229.73, 242.77, 253.49, 320.3, 308.05, 261.58, 295.94, 299.73, 262.34, 294.03, 315.62], '1Y': [63.42, 72.84, 70.96, 78.84, 80.05, 79.03, 77.8, 86.57, 82.17, 91.46, 90.24, 97.47, 101.43, 94.58, 102.51, 103.18, 112.77, 113.88, 125.9, 125, 118.74, 95.1, 107.26, 112.31, 120.91, 109.59, 113.62, 120.46, 128.85, 142.76, 147.43, 151.08, 187.3, 187.21, 186.39, 170.37, 176.51, 174.04, 186.82, 180.36, 218.07, 229.73, 242.77, 253.49, 320.3, 308.05, 261.58, 295.94, 299.73, 262.34, 294.03, 315.62] },
      velocityScore: { '1D': -10.5, '1W': -10.8, '1M': -44.2, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 60.9, revenueGrowth: 7, eps: 5.18, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { POW: 4.78, VOLT: 7.3, PBD: false, PBW: 1.96, IVEP: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 3, avgWeight: 4.31, proScore: 2.59, coverage: 0.6,
      price: 421.3, weeklyPrices: [421.77, 435.78, 405.28, 404.59, 421.30], weeklyChange: -0.11, dayChange: 4.09, sortRank: 0, periodReturns: { '1M': 4.5, 'YTD': 32.3, '6M': 30.2, '1Y': 23.1 },
      priceHistory: { '1D': [404.73, 419.37, 421.3], '1W': [421.77, 435.78, 405.28, 404.59, 421.3], '1M': [403.13, 406.37, 401.94, 400.6, 400.08, 417.62, 421.21, 418.61, 395.94, 403.14, 375.46, 393.64, 391.39, 407.06, 407.71, 409.64, 421.77, 435.78, 405.28, 404.59, 421.3], 'YTD': [318.51, 320.58, 333.46, 334.04, 354.37, 354.67, 390.33, 373.38, 374.59, 354.79, 348.64, 360.23, 357.1, 365.56, 400.44, 392.73, 424.5, 433.01, 421.39, 406.94, 379.69, 401.94, 418.61, 375.46, 409.64, 421.3], '6M': [322.17, 322.26, 329.1, 337.59, 341.19, 362.53, 377.47, 391.49, 374.56, 355.56, 361.06, 363.95, 374.1, 357.67, 385.58, 395.06, 413.87, 410.77, 421.39, 401.53, 371.88, 406.37, 421.21, 375.46, 409.64, 421.3], '1Y': [342.35, 358.19, 357.64, 380.72, 384.9, 384.72, 360.16, 357.49, 346.22, 351.4, 348.22, 360.08, 371.27, 364.74, 376.76, 377.19, 375.59, 372.4, 383.09, 377.4, 369.4, 345.65, 341.69, 338.93, 350.36, 315.95, 322.17, 322.26, 329.1, 337.59, 341.19, 362.53, 377.06, 391.49, 374.56, 355.56, 361.06, 363.95, 374.1, 357.67, 385.58, 395.06, 413.87, 410.77, 421.39, 401.53, 371.88, 406.37, 421.21, 375.46, 409.64, 421.3] },
      velocityScore: { '1D': -2.3, '1W': -2.6, '1M': -19.1, '6M': null }, isNew: false,
      marketCap: '$164B', pe: 41.1, revenueGrowth: 17, eps: 10.24, grossMargin: 37, dividendYield: 1.09,
      etfPresence: { POW: 3.87, VOLT: 5.18, PBD: false, PBW: false, IVEP: 3.88 },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 3, avgWeight: 3.85, proScore: 2.31, coverage: 0.6,
      price: 1098.75, weeklyPrices: [1109.73, 1127.59, 1034.98, 1057.65, 1098.75], weeklyChange: -0.99, dayChange: 3.89, sortRank: 0, periodReturns: { '1M': 2.6, 'YTD': 68.1, '6M': 64.7, '1Y': 118.6 },
      priceHistory: { '1D': [1057.65, 1098.77, 1098.75], '1W': [1109.73, 1127.59, 1034.98, 1057.65, 1098.75], '1M': [1070.47, 1031.89, 996, 968.32, 950.54, 969.67, 959.36, 963.33, 933.61, 933.85, 867.09, 906.79, 940.66, 979.07, 982.35, 1048.86, 1109.73, 1127.59, 1034.98, 1057.65, 1098.75], 'YTD': [653.57, 628.4, 642.23, 661.67, 717.39, 737.53, 816.56, 830.34, 876.46, 815.01, 832.11, 877.39, 873.12, 894.78, 968.02, 978.32, 1149.53, 1083.46, 1118.96, 1062.57, 1024.52, 996, 963.33, 867.09, 1048.86, 1098.75], '6M': [663.46, 680.86, 639.77, 684.86, 692.7, 780.25, 790.79, 819.15, 879.73, 842, 839.2, 844.05, 909.41, 872.9, 936.07, 985.92, 1127.56, 1063.11, 1118.96, 1071.98, 1011.8, 1031.89, 959.36, 867.09, 1048.86, 1098.75], '1Y': [502.67, 505.07, 539.36, 570.17, 623.97, 660.29, 645.86, 634.31, 604.59, 622.39, 598.81, 634.15, 611, 607.52, 606.23, 634.27, 602, 595.15, 574.07, 550.17, 575.4, 595.37, 589.72, 629.11, 704.2, 639.43, 663.46, 680.86, 639.77, 684.86, 692.7, 780.25, 801.54, 819.15, 879.73, 842, 839.2, 844.05, 909.41, 872.9, 936.07, 985.92, 1127.56, 1063.11, 1118.96, 1071.98, 1011.8, 1031.89, 959.36, 867.09, 1048.86, 1098.75] },
      velocityScore: { '1D': -2.9, '1W': -2.9, '1M': -16, '6M': null }, isNew: false,
      marketCap: '$295B', pe: 32.1, revenueGrowth: 16, eps: 34.27, grossMargin: 20, dividendYield: 0.19,
      etfPresence: { POW: 3.19, VOLT: 4.21, PBD: false, PBW: false, IVEP: 4.14 },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 3, avgWeight: 3.5, proScore: 2.1, coverage: 0.6,
      price: 88.05, weeklyPrices: [86.75, 86.08, 86.43, 87.62, 88.05], weeklyChange: 1.5, dayChange: 0.5, sortRank: 0, periodReturns: { '1M': 0.5, 'YTD': 9.7, '6M': 9.4, '1Y': 25.2 },
      priceHistory: { '1D': [87.61, 87.96, 88.05], '1W': [86.75, 86.08, 86.43, 87.62, 88.05], '1M': [87.65, 87.65, 87.25, 87.01, 83.66, 85.68, 84.58, 85.68, 85.84, 84.01, 85.12, 84.84, 85.99, 86.12, 86.23, 85.73, 86.75, 86.08, 86.43, 87.62, 88.05], 'YTD': [80.28, 79.49, 82.19, 85.07, 88.18, 89.21, 91.93, 92.18, 91.99, 91.13, 91.73, 92.41, 91.16, 92.85, 94.48, 91.83, 96.25, 97.88, 95.39, 94.85, 88.27, 87.25, 85.68, 85.12, 85.73, 88.05], '6M': [80.41, 81.32, 81.12, 83.51, 87.15, 88.82, 90.83, 92.71, 95.68, 92.59, 91.54, 92.53, 91.62, 92.88, 94.17, 91.24, 90, 94.17, 95.39, 94.59, 90.06, 87.65, 84.58, 85.12, 85.73, 88.05], '1Y': [70.34, 73.02, 74.64, 75.18, 71.97, 71.06, 72.58, 72.3, 76.18, 73.89, 70.87, 71.32, 70.79, 74.65, 78.18, 83.71, 85.05, 83.25, 81.64, 82, 85.89, 84.27, 85.54, 83.39, 81.21, 80.85, 80.41, 81.32, 81.12, 83.51, 87.15, 88.82, 89.48, 92.71, 95.68, 92.59, 91.54, 92.53, 91.62, 92.88, 94.17, 91.24, 90, 94.17, 95.39, 94.59, 90.06, 87.65, 84.58, 85.12, 85.73, 88.05] },
      velocityScore: { '1D': 1, '1W': 1, '1M': -16, '6M': null }, isNew: false,
      marketCap: '$184B', pe: 22.3, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.85,
      etfPresence: { POW: 1.98, VOLT: 4.93, PBD: false, PBW: false, IVEP: 3.6 },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 3, avgWeight: 3.3, proScore: 1.98, coverage: 0.6,
      price: 174.85, weeklyPrices: [177.02, 184.34, 168.37, 167.55, 174.85], weeklyChange: -1.23, dayChange: 4.26, sortRank: 0, periodReturns: { '1M': 3.3, 'YTD': 71.5, '6M': 68.2, '1Y': 142.8 },
      priceHistory: { '1D': [167.71, 173.67, 174.85], '1W': [177.02, 184.34, 168.37, 167.55, 174.85], '1M': [169.29, 167.8, 164.87, 166.99, 171.55, 173.39, 176.39, 173.88, 162.86, 163.81, 156.79, 164.52, 165.84, 169, 167.34, 170.94, 177.02, 184.34, 168.37, 167.55, 174.85], 'YTD': [101.97, 102.72, 107.98, 111.57, 115.62, 113.87, 111.9, 116.87, 121.79, 110.55, 107.87, 122.58, 118.44, 121.26, 128.63, 129.7, 142.76, 142.9, 172.49, 172.91, 161.86, 164.87, 173.88, 156.79, 170.94, 174.85], '6M': [104.18, 106.61, 106.39, 109.9, 113.16, 119.43, 112.15, 115.22, 118.22, 111.65, 109.13, 114.71, 125.61, 118.28, 127.11, 131.38, 140.13, 137.37, 172.49, 170.74, 158.23, 167.8, 176.39, 156.79, 170.94, 174.85], '1Y': [72, 73.44, 74.67, 77.23, 77.09, 78.42, 89.1, 90.61, 88.04, 91.11, 91.93, 95.71, 98.65, 96.6, 99.43, 97.73, 100.54, 100.62, 104.35, 109.97, 111.46, 105.74, 106.53, 108.27, 109.15, 98.28, 104.18, 106.61, 106.39, 109.9, 113.16, 119.43, 114.62, 115.22, 118.22, 111.65, 109.13, 114.71, 125.61, 118.28, 127.11, 131.38, 140.13, 137.37, 172.49, 170.74, 158.23, 167.8, 176.39, 156.79, 170.94, 174.85] },
      velocityScore: { '1D': -3.9, '1W': -3.9, '1M': -17.8, '6M': null }, isNew: false,
      marketCap: '$28B', pe: 59.7, revenueGrowth: 54, eps: 2.93, grossMargin: 37, dividendYield: 0.5,
      etfPresence: { POW: 3.7, VOLT: 3.03, PBD: false, PBW: false, IVEP: 3.18 },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 3, avgWeight: 2.95, proScore: 1.77, coverage: 0.6,
      price: 533.56, weeklyPrices: [523.69, 539.39, 509.96, 518.18, 533.56], weeklyChange: 1.88, dayChange: 2.96, sortRank: 0, periodReturns: { '1M': 11.6, 'YTD': 20.1, '6M': 16.9, '1Y': 33.7 },
      priceHistory: { '1D': [518.25, 534.32, 533.56], '1W': [523.69, 539.39, 509.96, 518.18, 533.56], '1M': [478.05, 484.25, 473.93, 473.61, 462.93, 480.46, 484.91, 485.27, 476.82, 485.03, 467.59, 469.32, 476.89, 489.73, 502.65, 508.87, 523.69, 539.39, 509.96, 518.18, 533.56], 'YTD': [444.11, 460.87, 484.11, 484.06, 497.97, 487.4, 516.02, 526.73, 524.19, 476.51, 468.41, 492.65, 481.67, 500.38, 534.67, 521.71, 557.85, 508.17, 502.34, 483.79, 463.32, 473.93, 485.27, 467.59, 508.87, 533.56], '6M': [454.94, 465.48, 472.88, 472.54, 484.14, 503.86, 503.1, 524.25, 526.75, 488.49, 478.06, 471.22, 505.62, 490.74, 527.21, 526.94, 549.75, 545.93, 502.34, 485.98, 461.5, 484.25, 484.91, 467.59, 508.87, 533.56], '1Y': [399.06, 415.12, 422.26, 437.23, 437.5, 437.48, 417.84, 443.95, 429.96, 446.06, 437.16, 450.93, 440.1, 420.44, 423.42, 418.89, 428.82, 433.27, 469.96, 461.47, 453, 419.09, 428.47, 437.71, 462.82, 434.85, 454.94, 465.48, 472.88, 472.54, 484.14, 503.86, 506.14, 524.25, 526.75, 488.49, 478.06, 471.22, 505.62, 490.74, 527.21, 526.94, 549.75, 545.93, 502.34, 485.98, 461.5, 484.25, 484.91, 467.59, 508.87, 533.56] },
      velocityScore: { '1D': -1.1, '1W': -1.1, '1M': -16.5, '6M': null }, isNew: false,
      marketCap: '$28B', pe: 31.5, revenueGrowth: 11, eps: 16.94, grossMargin: 36, dividendYield: 1.1,
      etfPresence: { POW: 2.85, VOLT: 3.42, PBD: false, PBW: false, IVEP: 2.58 },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'NRG', name: 'NRG Energy Inc', easyScore: 3, avgWeight: 1.3, proScore: 0.78, coverage: 0.6,
      price: 146.9, weeklyPrices: [135.06, 138.91, 137.66, 142.21, 146.90], weeklyChange: 8.77, dayChange: 3.4, sortRank: 0, periodReturns: { '1M': 4.6, 'YTD': -7.7, '6M': -8.5, '1Y': -4.2 },
      priceHistory: { '1D': [142.07, 145.93, 146.9], '1W': [135.06, 138.91, 137.66, 142.21, 146.9], '1M': [140.43, 138, 137.5, 134.08, 129.47, 133.51, 133.76, 133.39, 129.2, 127.71, 120.65, 123.7, 125.47, 130.4, 132.1, 132.13, 135.06, 138.91, 137.66, 142.21, 146.9], 'YTD': [159.24, 143.53, 158.5, 151.09, 153.72, 144.44, 161.8, 179.18, 181.34, 160.46, 152.1, 161.4, 146.14, 149.9, 161.78, 168.5, 154.53, 155.58, 150.64, 131.08, 133.98, 137.5, 133.39, 120.65, 132.13, 146.9], '6M': [160.88, 161.59, 148.89, 148.91, 156.04, 152.18, 156.43, 173.45, 184.03, 162.06, 155.15, 154.75, 151.13, 146.14, 160.3, 168.45, 149.6, 149.01, 150.64, 137.34, 123.71, 138, 133.76, 120.65, 132.13, 146.9], '1Y': [153.32, 155.54, 151.36, 147.38, 157.97, 167.2, 153.22, 155, 148.19, 148.12, 147.95, 157.92, 164.19, 162.96, 167.3, 168.25, 169.93, 163.81, 173.14, 170.1, 168.84, 168.8, 168.54, 169.36, 170.64, 154.64, 160.88, 161.59, 148.89, 148.91, 156.04, 152.18, 155.72, 173.45, 184.03, 162.06, 155.15, 154.75, 151.13, 146.14, 160.3, 168.45, 149.6, 149.01, 150.64, 137.34, 123.71, 138, 133.76, 120.65, 132.13, 146.9] },
      velocityScore: { '1D': 18.2, '1W': 5.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$31B', pe: 161.4, revenueGrowth: 20, eps: 0.91, grossMargin: 16, dividendYield: 1.34,
      etfPresence: { POW: 0.51, VOLT: 1, PBD: false, PBW: false, IVEP: 2.4 },
      tonyNote: 'NRG Energy Inc appears in 3 of 5 Electrification ETFs (60% coverage) with average weight 1.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, avgWeight: 5.51, proScore: 2.21, coverage: 0.4,
      price: 302.89, weeklyPrices: [296.39, 304.33, 288.64, 294.15, 302.89], weeklyChange: 2.19, dayChange: 2.97, sortRank: 0, periodReturns: { '1M': 9.6, 'YTD': 78.6, '6M': 71.9, '1Y': 230.7 },
      priceHistory: { '1D': [294.15, 299.25, 302.89], '1W': [296.39, 304.33, 288.64, 294.15, 302.89], '1M': [276.25, 280.13, 276.96, 274.52, 269.86, 269.22, 280.09, 276.54, 262.56, 279.13, 276.95, 296.55, 293.87, 302.15, 293.22, 299.84, 296.39, 304.33, 288.64, 294.15, 302.89], 'YTD': [169.63, 180.24, 196.61, 200.29, 210.44, 208, 231.48, 235.04, 232.12, 202.58, 195.18, 214.95, 204.11, 203.04, 235, 241.49, 268.31, 275.84, 286.89, 266.92, 254.75, 276.96, 276.54, 276.95, 299.84, 302.89], '6M': [176.45, 175.77, 188, 201.17, 210.66, 217.25, 237.19, 235.3, 234.4, 213.65, 198.5, 209.52, 222.04, 197.98, 228.29, 236.04, 262.68, 258.26, 286.89, 298.22, 249.71, 280.13, 280.09, 276.95, 299.84, 302.89], '1Y': [91.58, 98.83, 102.3, 101.32, 102.98, 130.04, 132.61, 134.58, 128.41, 140.42, 143.06, 148.32, 150.97, 142.72, 142.44, 142.94, 148.88, 154.9, 150.62, 160.16, 153.75, 144.89, 152.69, 163.19, 175.36, 166.55, 176.45, 175.77, 188, 201.17, 210.66, 217.25, 229.32, 235.3, 234.4, 213.65, 198.5, 209.52, 222.04, 197.98, 228.29, 236.04, 262.68, 258.26, 286.89, 298.22, 249.71, 280.13, 280.09, 276.95, 299.84, 302.89] },
      velocityScore: { '1D': 1.4, '1W': -2.2, '1M': -39.3, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 73, revenueGrowth: 17, eps: 4.15, grossMargin: 39, dividendYield: 0.1,
      etfPresence: { POW: 3.47, VOLT: 7.56, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, avgWeight: 3.42, proScore: 1.37, coverage: 0.4,
      price: 135.88, weeklyPrices: [127.69, 130.30, 133.74, 134.96, 135.88], weeklyChange: 6.41, dayChange: 0.69, sortRank: 0, periodReturns: { '1M': 3.8, 'YTD': 17.8, '6M': 17.8, '1Y': 34 },
      priceHistory: { '1D': [134.95, 135.89, 135.88], '1W': [127.69, 130.3, 133.74, 134.96, 135.88], '1M': [130.9, 129.57, 127.76, 126.67, 123.79, 127.11, 126.31, 127.79, 129.14, 126.77, 128.53, 128.48, 129.23, 129.31, 129.75, 128.27, 127.69, 130.3, 133.74, 134.96, 135.88], 'YTD': [115.31, 115.93, 119.4, 117.18, 119.21, 120.61, 126.43, 129.37, 132.1, 132.04, 132.22, 128.72, 128.85, 131.67, 137.15, 134.56, 135.08, 137.11, 132.56, 127.95, 128.87, 127.76, 127.79, 128.53, 128.27, 135.88], '6M': [115.67, 114.07, 116.57, 119.22, 119.43, 120.67, 121.23, 130.24, 132.39, 131.92, 132.31, 133.62, 128.8, 131.08, 134.71, 134.39, 131.62, 134.44, 132.56, 131.94, 128.92, 129.57, 126.31, 128.53, 128.27, 135.88], '1Y': [101.41, 103.26, 106.04, 105.93, 108.97, 113.14, 113.73, 113.11, 113.55, 112.89, 108.64, 108.74, 106.44, 107.86, 113.46, 116.91, 117.53, 116.18, 121.89, 119.53, 122.68, 121.71, 122.72, 118.04, 114.26, 115.58, 115.67, 114.07, 116.57, 119.22, 119.43, 120.67, 121.1, 130.24, 132.39, 131.92, 132.31, 133.62, 128.8, 131.08, 134.71, 134.39, 131.62, 134.44, 132.56, 131.94, 128.92, 129.57, 126.31, 128.53, 128.27, 135.88] },
      velocityScore: { '1D': 22.3, '1W': 25.7, '1M': -31.8, '6M': null }, isNew: false,
      marketCap: '$74B', pe: 20.1, revenueGrowth: 10, eps: 6.76, grossMargin: 47, dividendYield: 2.82,
      etfPresence: { POW: 2.57, VOLT: 4.27, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 2, avgWeight: 3.24, proScore: 1.29, coverage: 0.4,
      price: 335.26, weeklyPrices: [333.05, 357.96, 318.32, 316.43, 335.26], weeklyChange: 0.66, dayChange: 5.94, sortRank: 0, periodReturns: { '1M': 3.5, 'YTD': 106.9, '6M': 100.9, '1Y': 175.6 },
      priceHistory: { '1D': [316.46, 335.22, 335.26], '1W': [333.05, 357.96, 318.32, 316.43, 335.26], '1M': [323.91, 319.78, 314.18, 315.71, 323.39, 334.49, 331.44, 323.92, 300.51, 300.57, 280.98, 297.88, 302.87, 311.93, 299.6, 317.58, 333.05, 357.96, 318.32, 316.43, 335.26], 'YTD': [162.01, 160.78, 172.54, 181.12, 195.1, 177.75, 236.51, 243.75, 259.23, 249.75, 265.38, 269.17, 252.4, 259.37, 287.64, 294.13, 321.75, 328.49, 358.92, 369.99, 315.67, 314.18, 323.92, 280.98, 317.58, 335.26], '6M': [167.58, 173.95, 170.03, 175.18, 189.21, 190.15, 199.62, 243.53, 253.15, 244.44, 270.06, 268.41, 270.89, 250.58, 281.03, 301.16, 305.14, 306.18, 358.92, 367.13, 322.63, 319.78, 331.44, 280.98, 317.58, 335.26], '1Y': [121.64, 124.33, 120.72, 131.12, 130.87, 145.6, 139.39, 137.4, 127.54, 129.31, 125.7, 135.71, 141.96, 139.77, 161.64, 168.88, 177.82, 183.2, 193.76, 183.02, 173.37, 170.65, 172.02, 182.54, 178.66, 154.39, 167.58, 173.95, 170.03, 175.18, 189.21, 190.15, 202, 243.53, 253.15, 244.44, 270.06, 268.41, 270.89, 250.58, 281.03, 301.16, 305.14, 306.18, 358.92, 367.13, 322.63, 319.78, 331.44, 280.98, 317.58, 335.26] },
      velocityScore: { '1D': -0.8, '1W': -1.5, '1M': -24.6, '6M': null }, isNew: false,
      marketCap: '$129B', pe: 84, revenueGrowth: 30, eps: 3.99, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 2.43, PBD: false, PBW: false, IVEP: 4.04 },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, avgWeight: 2.74, proScore: 1.1, coverage: 0.4,
      price: 375.99, weeklyPrices: [372.59, 388.23, 364.96, 359.61, 375.99], weeklyChange: 0.91, dayChange: 4.55, sortRank: 0, periodReturns: { '1M': 10.7, 'YTD': 79.6, '6M': 73.1, '1Y': 182.1 },
      priceHistory: { '1D': [359.61, 376.08, 375.99], '1W': [372.59, 388.23, 364.96, 359.61, 375.99], '1M': [339.65, 328.34, 317.08, 302.18, 294.65, 312.28, 322.5, 320.92, 294.81, 306.11, 308.17, 340.4, 354.37, 370.66, 350.45, 353.32, 372.59, 388.23, 364.96, 359.61, 375.99], 'YTD': [209.37, 210.99, 257.29, 275.57, 269.12, 257.64, 312.95, 331.23, 337.35, 311.42, 305.82, 327.8, 313.11, 332.82, 374.98, 372.23, 382.47, 383.91, 360.81, 339.19, 313.05, 317.08, 320.92, 308.17, 353.32, 375.99], '6M': [217.86, 227.65, 227.59, 250.95, 259.55, 263.03, 279.04, 314.12, 335.74, 322.47, 311.39, 315.91, 356.38, 322.71, 366.95, 374.32, 377.19, 361.39, 360.81, 339.42, 302.84, 328.34, 322.5, 308.17, 353.32, 375.99], '1Y': [133.28, 137.55, 143.62, 142.73, 140.91, 138.92, 146.5, 162.52, 147.74, 153.73, 150.14, 159.52, 169.75, 167.35, 178.08, 179.98, 192.22, 198.42, 205.61, 219.2, 212.79, 198.89, 209.9, 214.65, 224.11, 208.77, 217.86, 227.65, 227.59, 250.95, 259.55, 263.03, 279.17, 314.12, 335.74, 322.47, 311.39, 315.91, 356.38, 322.71, 366.95, 374.32, 377.19, 361.39, 360.81, 339.42, 302.84, 328.34, 322.5, 308.17, 353.32, 375.99] },
      velocityScore: { '1D': 22.2, '1W': 0.9, '1M': -38.9, '6M': null }, isNew: false,
      marketCap: '$15B', pe: 78, revenueGrowth: 26, eps: 4.82, grossMargin: 39, dividendYield: 0.11,
      etfPresence: { POW: 1.08, VOLT: 4.4, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'APH', name: 'Amphenol Corp', easyScore: 2, avgWeight: 2.67, proScore: 1.07, coverage: 0.4,
      price: 168.38, weeklyPrices: [163.96, 165.96, 158.70, 162.78, 168.38], weeklyChange: 2.7, dayChange: 3.48, sortRank: 0, periodReturns: { '1M': 20.7, 'YTD': 24.6, '6M': 22.1, '1Y': 73.6 },
      priceHistory: { '1D': [162.72, 167.69, 168.35, 168.38], '1W': [163.96, 165.96, 158.7, 162.78, 168.38], '1M': [139.56, 140.24, 147.68, 148.76, 146.34, 148.4, 147.62, 146.77, 138.81, 143.6, 149.22, 152.46, 153.8, 158.59, 158.81, 161.11, 163.96, 165.96, 158.7, 162.78, 168.38], 'YTD': [135.14, 136.25, 154.22, 152.5, 149.58, 127.63, 143.73, 151.04, 148.47, 136.24, 131.47, 130.65, 123.13, 127.7, 137.68, 148.96, 150.18, 147.27, 138.47, 124.64, 123.05, 147.68, 146.77, 149.22, 161.11, 168.38], '6M': [137.43, 139.88, 145.11, 152.33, 166.25, 147.06, 144.14, 148.57, 151.5, 129.58, 136.74, 135.12, 127.96, 126.35, 135.32, 146.98, 148.13, 148.38, 138.47, 127.87, 119.2, 140.24, 147.62, 149.22, 161.11, 168.38], '1Y': [97.02, 98.52, 98.31, 101.96, 104.46, 106.51, 108.55, 109.83, 108.65, 110.13, 112.75, 119.47, 122.07, 122.33, 123.58, 126.25, 127.36, 135.31, 139.11, 138.11, 141.92, 136.66, 138.72, 139.46, 139.09, 129.61, 137.43, 139.88, 145.11, 152.33, 166.25, 147.06, 144.2, 148.57, 151.5, 129.58, 136.74, 135.12, 127.96, 126.35, 135.32, 146.98, 148.13, 148.38, 138.47, 127.87, 119.2, 140.24, 147.62, 149.22, 161.11, 168.38] },
      velocityScore: { '1D': null, '1W': -0.9, '1M': null, '6M': null }, isNew: true,
      marketCap: '$207B', pe: 48.4, revenueGrowth: 58, eps: 3.48, grossMargin: 38, dividendYield: 0.61,
      etfPresence: { POW: 1, VOLT: 4.35, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 2.62, proScore: 1.05, coverage: 0.4,
      price: 76.07, weeklyPrices: [73.12, 74.95, 75.79, 75.87, 76.07], weeklyChange: 4.03, dayChange: 0.26, sortRank: 0, periodReturns: { '1M': -0.4, 'YTD': 26.6, '6M': 27.9, '1Y': 25.3 },
      priceHistory: { '1D': [75.87, 75.99, 76.06, 76.07], '1W': [73.12, 74.95, 75.79, 75.87, 76.07], '1M': [76.34, 74.37, 73.13, 71.39, 70.04, 71.31, 71.66, 72.43, 71.96, 71.59, 72.26, 71.62, 72.08, 71.49, 71.48, 71.25, 73.12, 74.95, 75.79, 75.87, 76.07], 'YTD': [60.11, 61.15, 60.29, 63.72, 67.24, 67.42, 71.13, 72.98, 74.77, 74.77, 73.52, 74.06, 74.06, 71.83, 72.82, 70.86, 71.65, 76.31, 73.76, 75.71, 77.88, 73.13, 72.43, 72.26, 71.25, 76.07], '6M': [59.52, 61.16, 59.56, 61.51, 65.48, 68.5, 68.84, 71.96, 73.5, 75.88, 73.84, 73.69, 74.46, 72.78, 73.01, 70.76, 71.1, 73.32, 73.76, 74.73, 79.4, 74.37, 71.66, 72.26, 71.25, 76.07], '1Y': [60.69, 59.14, 57.78, 58.09, 58.75, 59.95, 57.89, 57.86, 57.22, 57.49, 57.58, 59.33, 60.38, 63.31, 64.06, 63.1, 62.53, 58.93, 57.62, 57.94, 60.43, 58.89, 60.22, 63.66, 60.92, 58.66, 59.52, 61.16, 59.56, 61.51, 65.48, 68.5, 67.85, 71.96, 73.5, 75.88, 73.84, 73.69, 74.46, 72.78, 73.01, 70.76, 71.1, 73.32, 73.76, 74.73, 79.4, 74.37, 71.66, 72.26, 71.25, 76.07] },
      velocityScore: { '1D': 0, '1W': 6.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$93B', pe: 33.4, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.77,
      etfPresence: { POW: false, VOLT: 1.53, PBD: false, PBW: false, IVEP: 3.71 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'JCI', name: 'JOHNSON CONTROLS INTERNATIONAL PLC', easyScore: 2, avgWeight: 2.46, proScore: 0.98, coverage: 0.4,
      price: 145.87, weeklyPrices: [144.82, 148.21, 141.28, 142.81, 145.87], weeklyChange: 0.73, dayChange: 2.14, sortRank: 0, periodReturns: { '1M': 4, 'YTD': 21.8, '6M': 20.2, '1Y': 41.1 },
      priceHistory: { '1D': [142.82, 146.04, 146.04, 145.87], '1W': [144.82, 148.21, 141.28, 142.81, 145.87], '1M': [140.22, 138.2, 136.15, 134.06, 133.91, 141.99, 146.96, 147.4, 143.65, 144.05, 139.36, 144.01, 144.96, 146.06, 145.17, 143.62, 144.82, 148.21, 141.28, 142.81, 145.87], 'YTD': [119.75, 111.29, 112.95, 114.51, 120.28, 132.52, 138.57, 143.79, 143.42, 137.18, 130.94, 133.25, 131.57, 134.72, 141.85, 137.55, 141.73, 146.03, 143.14, 143.8, 137.75, 136.15, 147.4, 139.36, 143.62, 145.87], '6M': [122.06, 121.53, 111.39, 114.56, 116.96, 124.01, 138.75, 142.21, 144.71, 139.58, 133.94, 132.56, 136.43, 130.95, 139, 137.21, 139.81, 141.35, 143.14, 141.04, 135.42, 138.2, 146.96, 139.36, 143.62, 145.87], '1Y': [103.35, 105.07, 106.33, 108.95, 110.02, 105, 104.31, 105.77, 106, 109.27, 107.09, 107.82, 108.48, 105.77, 108.66, 107.76, 109.37, 110.55, 114.21, 122.25, 122.66, 114.42, 116.29, 114.2, 118.06, 117.74, 122.06, 121.53, 111.39, 114.56, 116.96, 124.01, 139, 142.21, 144.71, 139.58, 133.94, 132.56, 136.43, 130.95, 139, 137.21, 139.81, 141.35, 143.14, 141.04, 135.42, 138.2, 146.96, 139.36, 143.62, 145.87] },
      velocityScore: { '1D': 1, '1W': -2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$89B', pe: 44.6, revenueGrowth: 8, eps: 3.27, grossMargin: 37, dividendYield: 1.12,
      etfPresence: { POW: false, VOLT: 1.39, PBD: false, PBW: false, IVEP: 3.53 },
      tonyNote: 'JOHNSON CONTROLS INTERNATIONAL PLC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VST', name: 'Vistra Corp', easyScore: 2, avgWeight: 2.33, proScore: 0.93, coverage: 0.4,
      price: 169.59, weeklyPrices: [163.75, 167.26, 162.39, 162.87, 169.59], weeklyChange: 3.57, dayChange: 4.14, sortRank: 0, periodReturns: { '1M': 3.1, 'YTD': 5.1, '6M': 4.7, '1Y': -9 },
      priceHistory: { '1D': [162.85, 168.97, 169.62, 169.59], '1W': [163.75, 167.26, 162.39, 162.87, 169.59], '1M': [164.56, 160.15, 160.28, 160.23, 154.76, 157.97, 153.8, 153.7, 148.76, 146.9, 138.54, 146.38, 148.02, 153.52, 158.61, 158.83, 163.75, 167.26, 162.39, 162.87, 169.59], 'YTD': [161.33, 150.6, 180.18, 160.36, 162.58, 143.07, 163.1, 171.4, 176.82, 167.4, 159.58, 167.37, 152.3, 153.96, 152.75, 165.53, 156.85, 157.84, 158.29, 142.61, 144, 160.28, 153.7, 138.54, 158.83, 169.59], '6M': [161.67, 162.93, 172.58, 156.81, 164.26, 153, 159.6, 173.68, 171.62, 161.7, 164.4, 164.33, 152.72, 150.33, 155.89, 162.94, 155.79, 153.79, 158.29, 146.87, 134.71, 160.15, 153.8, 138.54, 158.83, 169.59], '1Y': [186.32, 187.02, 195.78, 182, 196.24, 208.54, 205.59, 205.28, 192.91, 194.6, 189.73, 204.05, 210.16, 201.62, 202.65, 210, 210.4, 191.37, 189.71, 184.62, 178.27, 179.14, 176.8, 176.07, 174.6, 166.17, 161.67, 162.93, 172.58, 156.81, 164.26, 153, 152.97, 173.68, 171.62, 161.7, 164.4, 164.33, 152.72, 150.33, 155.89, 162.94, 155.79, 153.79, 158.29, 146.87, 134.71, 160.15, 153.8, 138.54, 158.83, 169.59] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$57B', pe: 28.4, revenueGrowth: 43, eps: 5.98, grossMargin: 39, dividendYield: 0.56,
      etfPresence: { POW: 1.4, VOLT: false, PBD: false, PBW: false, IVEP: 3.27 },
      tonyNote: 'Vistra Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CEG', name: 'Constellation Energy Corp', easyScore: 2, avgWeight: 2.33, proScore: 0.93, coverage: 0.4,
      price: 274.49, weeklyPrices: [274.06, 275.53, 270.26, 267.97, 274.49], weeklyChange: 0.16, dayChange: 2.43, sortRank: 0, periodReturns: { '1M': -9, 'YTD': -22.3, '6M': -24.6, '1Y': -12.9 },
      priceHistory: { '1D': [267.97, 273.43, 274.88, 274.49], '1W': [274.06, 275.53, 270.26, 267.97, 274.49], '1M': [301.57, 288.68, 286.31, 287.75, 265.7, 272.65, 267.24, 264.59, 254.83, 250.67, 242.3, 246.71, 253.76, 262.35, 268, 267.17, 274.06, 275.53, 270.26, 267.97, 274.49], 'YTD': [353.27, 322.54, 341.2, 287.35, 287.45, 247.06, 276.12, 294.84, 323.56, 332.07, 301.55, 316.47, 295.19, 279.46, 280.25, 299.14, 292.77, 313, 322.78, 274.89, 281.26, 286.31, 264.59, 242.3, 267.17, 274.49], '6M': [360.46, 354.94, 335.86, 295.4, 288.76, 268.45, 271.14, 303.01, 312.64, 324.87, 317.09, 307.69, 294.85, 279.25, 284.27, 294.73, 287.16, 297, 322.78, 293.6, 260.67, 288.68, 267.24, 242.3, 267.17, 274.49], '1Y': [315.14, 306.63, 313.62, 308.08, 321.67, 347.84, 336.41, 327.63, 314.21, 315.94, 309.06, 318, 322.71, 326.33, 357.46, 383.23, 396.53, 365.8, 382.48, 351.3, 354.02, 357.48, 359.09, 368.62, 378.6, 361.05, 360.46, 354.94, 335.86, 295.4, 288.76, 268.45, 272.15, 303.01, 312.64, 324.87, 317.09, 307.69, 294.85, 279.25, 284.27, 294.73, 287.16, 297, 322.78, 293.6, 260.67, 288.68, 267.24, 242.3, 267.17, 274.49] },
      velocityScore: { '1D': -3.1, '1W': -2.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$98B', pe: 23.8, revenueGrowth: 64, eps: 11.52, grossMargin: 23, dividendYield: 0.64,
      etfPresence: { POW: 1.27, VOLT: false, PBD: false, PBW: false, IVEP: 3.38 },
      tonyNote: 'Constellation Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TLN', name: 'Talen Energy Corp', easyScore: 2, avgWeight: 2.24, proScore: 0.9, coverage: 0.4,
      price: 420.52, weeklyPrices: [436.29, 438.12, 411.92, 405.89, 420.52], weeklyChange: -3.61, dayChange: 3.6, sortRank: 0, periodReturns: { '1M': 8.1, 'YTD': 12.2, '6M': 9.6, '1Y': 46 },
      priceHistory: { '1D': [405.89, 419.63, 422.49, 420.52], '1W': [436.29, 438.12, 411.92, 405.89, 420.52], '1M': [389, 379.78, 381.47, 386.8, 377.2, 385.51, 379.59, 378.08, 364.74, 364.78, 336.59, 344.8, 360.54, 386.21, 406.51, 409.81, 436.29, 438.12, 411.92, 405.89, 420.52], 'YTD': [374.84, 356, 419.07, 379.86, 362.2, 324.63, 367.81, 382.25, 390.05, 334.86, 311.45, 340.07, 323.13, 328.08, 312.76, 362.4, 345.25, 372.42, 409.99, 351.03, 344.46, 381.47, 378.08, 336.59, 409.81, 420.52], '6M': [384.52, 395.2, 369.03, 356.66, 359.51, 341.42, 357.93, 388.28, 375.24, 341.39, 331.58, 327.14, 315.77, 319.23, 328.65, 353.3, 339.32, 351.91, 409.99, 374.61, 314.57, 379.78, 379.59, 336.59, 409.81, 420.52], '1Y': [288, 276.27, 267.62, 264, 339.16, 377.57, 375.58, 380.25, 360.1, 381.5, 380.44, 400.92, 415.25, 410.72, 434.07, 444.5, 418.03, 383.82, 391.82, 385.93, 367.54, 390.51, 392.42, 367.93, 368.82, 371.72, 384.52, 395.2, 369.03, 356.66, 359.51, 341.42, 353.66, 388.28, 375.24, 341.39, 331.58, 327.14, 315.77, 319.23, 328.65, 353.3, 339.32, 351.91, 409.99, 374.61, 314.57, 379.78, 379.59, 336.59, 409.81, 420.52] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$20B', pe: null, revenueGrowth: 97, eps: -0.53, grossMargin: 40, dividendYield: null,
      etfPresence: { POW: 1.66, VOLT: false, PBD: false, PBW: false, IVEP: 2.82 },
      tonyNote: 'Talen Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX TECHNOLOGIES INC', easyScore: 2, avgWeight: 2.17, proScore: 0.87, coverage: 0.4,
      price: 208.73, weeklyPrices: [205.40, 210.00, 209.89, 205.65, 208.73], weeklyChange: 1.62, dayChange: 1.52, sortRank: 0, periodReturns: { '1M': 2.1, 'YTD': 20.8, '6M': 17.8, '1Y': 48.2 },
      priceHistory: { '1D': [205.6, 208.01, 208.73], '1W': [205.4, 210, 209.89, 205.65, 208.73], '1M': [204.38, 198.95, 199.27, 195.88, 188.39, 187.26, 184.72, 190.76, 185.95, 187.46, 183, 194.68, 193.45, 193.94, 196.93, 203.07, 205.4, 210, 209.89, 205.65, 208.73], 'YTD': [172.84, 193.2, 213.25, 206.33, 210.18, 187.42, 196.9, 206.44, 207.24, 195.5, 197.82, 210.12, 205.09, 212.81, 230.29, 230.8, 225.51, 216.39, 215.2, 206.83, 202.66, 199.27, 190.76, 183, 203.07, 208.73], '6M': [175.88, 189.02, 206.62, 206.07, 212.4, 210.88, 199.83, 201.09, 204.23, 205.83, 195.91, 207.48, 204.76, 204.49, 231.78, 238.42, 219.1, 208.08, 215.2, 206.83, 197.33, 198.95, 184.72, 183, 203.07, 208.73], '1Y': [140.86, 140.77, 136.45, 142.34, 143.84, 151.93, 179.53, 176.76, 163.56, 165.6, 163.79, 170.1, 174.03, 176.21, 185.7, 195.6, 209.01, 199.92, 213.8, 193.93, 196.77, 179.81, 178.18, 178.33, 183.38, 170.75, 175.88, 189.02, 206.62, 206.07, 212.4, 210.88, 203, 201.09, 204.23, 205.83, 195.91, 207.48, 204.76, 204.49, 231.78, 238.42, 219.1, 208.08, 215.2, 206.83, 197.33, 198.95, 184.72, 183, 203.07, 208.73] },
      velocityScore: { '1D': -2.2, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 55.8, revenueGrowth: 26, eps: 3.74, grossMargin: 23, dividendYield: 0.51,
      etfPresence: { POW: false, VOLT: 2.12, PBD: false, PBW: false, IVEP: 2.23 },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 5.36, proScore: 2.14, coverage: 0.4,
      price: 895.07, weeklyPrices: [861.88, 932.75, 892.25, 867.23, 895.07], weeklyChange: 3.85, dayChange: 3.21, sortRank: 0, periodReturns: { '1M': 14.2, 'YTD': 192.3, '6M': 185.1, '1Y': 298.4 },
      priceHistory: { '1D': [867.23, 890, 894.36, 895.07], '1W': [861.88, 932.75, 892.25, 867.23, 895.07], '1M': [783.53, 782.12, 842.96, 860.84, 845.39, 875.52, 957.03, 993.74, 882.43, 891.86, 770.25, 838.55, 858.99, 866.67, 857.76, 838.21, 861.88, 932.75, 892.25, 867.23, 895.07], 'YTD': [306.23, 297.62, 336.31, 364.25, 379.23, 365.07, 431.43, 435.5, 433.34, 398.87, 404.59, 431.78, 415.93, 421.29, 435.65, 441.1, 495.67, 515.62, 886.22, 854.28, 752, 842.96, 993.74, 770.25, 838.21, 895.07], '6M': [316.55, 327.11, 307.58, 349.59, 372.25, 386.78, 415.19, 421.2, 459.72, 415.51, 411.53, 425.51, 446.16, 407.27, 423.35, 456.08, 487.87, 469.75, 886.22, 851.35, 728.29, 782.12, 957.03, 770.25, 838.21, 895.07], '1Y': [224.64, 228.72, 236.29, 250.69, 252.68, 267.59, 299.64, 292.47, 274.89, 289.36, 288.68, 316.16, 348.58, 338.44, 351.66, 355.53, 361.02, 353.8, 379.03, 388.68, 380.7, 334.17, 339.75, 332.29, 340.51, 302.3, 316.55, 327.11, 307.58, 349.59, 372.25, 386.78, 418.61, 421.2, 459.72, 415.51, 411.53, 425.51, 446.16, 407.27, 423.35, 456.08, 487.87, 469.75, 886.22, 851.35, 728.29, 782.12, 957.03, 770.25, 838.21, 895.07] },
      velocityScore: { '1D': -3.2, '1W': 2.4, '1M': -54.9, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 80, revenueGrowth: 92, eps: 11.19, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 6.33, PRN: 4.39, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 5.18, proScore: 2.07, coverage: 0.4,
      price: 1036.65, weeklyPrices: [985.82, 1022.28, 984.24, 994.45, 1036.65], weeklyChange: 5.16, dayChange: 4.23, sortRank: 0, periodReturns: { '1M': 14.1, 'YTD': 81, '6M': 77.6, '1Y': 179 },
      priceHistory: { '1D': [994.57, 1036.61, 1039.44, 1036.65], '1W': [985.82, 1022.28, 984.24, 994.45, 1036.65], '1M': [908.55, 909.93, 887.67, 875.87, 865.36, 909.81, 926.18, 940.48, 904.28, 915.64, 856.16, 897.63, 910.57, 933.93, 945.46, 955.92, 985.82, 1022.28, 984.24, 994.45, 1036.65], 'YTD': [572.87, 608.13, 647.18, 648.41, 665.24, 678.31, 758.29, 759.74, 752.93, 706.08, 700.69, 688.65, 703.19, 730.32, 787.07, 772.66, 835.24, 890.11, 926.93, 902.3, 872.56, 887.67, 940.48, 856.16, 955.92, 1036.65], '6M': [583, 616.1, 629.77, 629, 638.91, 702.89, 742.37, 764.76, 768.23, 722.18, 716.68, 702, 716.63, 708.46, 771.58, 770.17, 808.87, 810.05, 926.93, 912.14, 860.15, 909.93, 926.18, 856.16, 955.92, 1036.65], '1Y': [371.58, 398.43, 408.33, 418.07, 429.52, 438.02, 417.12, 413.7, 420.59, 432.67, 420.22, 431.38, 466.96, 463.72, 490.57, 500.36, 540.96, 520.5, 583.15, 569.78, 573.02, 553.11, 573.73, 599.15, 625.61, 565.83, 583, 616.1, 629.77, 629, 638.91, 702.89, 742.12, 764.76, 768.23, 722.18, 716.68, 702, 716.63, 708.46, 771.58, 770.17, 808.87, 810.05, 926.93, 912.14, 860.15, 909.93, 926.18, 856.16, 955.92, 1036.65] },
      velocityScore: { '1D': 0.5, '1W': 3.5, '1M': -9.6, '6M': null }, isNew: false,
      marketCap: '$477B', pe: 51.6, revenueGrowth: 22, eps: 20.09, grossMargin: 29, dividendYield: 0.66,
      etfPresence: { AIRR: false, PRN: 3.48, RSHO: 6.89, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 4.97, proScore: 1.99, coverage: 0.4,
      price: 315.62, weeklyPrices: [297.20, 307.80, 291.50, 294.49, 315.62], weeklyChange: 6.2, dayChange: 7.12, sortRank: 0, periodReturns: { '1M': 8.1, 'YTD': 197, '6M': 181.7, '1Y': 397.7 },
      priceHistory: { '1D': [294.64, 314.27, 315.62], '1W': [297.2, 307.8, 291.5, 294.49, 315.62], '1M': [291.97, 295.94, 288.9, 284.42, 288.12, 299.07, 299.73, 300.06, 284.87, 293.6, 262.34, 290.5, 294.75, 303.53, 292.7, 294.03, 297.2, 307.8, 291.5, 294.49, 315.62], 'YTD': [106.26, 119.94, 135.18, 142.29, 152.31, 179.6, 197.63, 182.27, 176.96, 167.67, 171.19, 175.13, 174.8, 184.68, 230.81, 232.81, 252.18, 277.27, 320.3, 300.84, 271.05, 288.9, 300.06, 262.34, 294.03, 315.62], '6M': [113.62, 120.46, 128.85, 142.76, 147.43, 151.08, 190.09, 187.21, 186.39, 170.37, 176.51, 174.04, 186.82, 180.36, 218.07, 229.73, 242.77, 253.49, 320.3, 308.05, 261.58, 295.94, 299.73, 262.34, 294.03, 315.62], '1Y': [63.42, 72.84, 70.96, 78.84, 80.05, 79.03, 77.8, 86.57, 82.17, 91.46, 90.24, 97.47, 101.43, 94.58, 102.51, 103.18, 112.77, 113.88, 125.9, 125, 118.74, 95.1, 107.26, 112.31, 120.91, 109.59, 113.62, 120.46, 128.85, 142.76, 147.43, 151.08, 187.3, 187.21, 186.39, 170.37, 176.51, 174.04, 186.82, 180.36, 218.07, 229.73, 242.77, 253.49, 320.3, 308.05, 261.58, 295.94, 299.73, 262.34, 294.03, 315.62] },
      velocityScore: { '1D': 0, '1W': -5.2, '1M': 9.3, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 60.9, revenueGrowth: 7, eps: 5.18, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { AIRR: 2.61, PRN: false, RSHO: 7.33, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.62, proScore: 1.85, coverage: 0.4,
      price: 2028.95, weeklyPrices: [1967.41, 2066.51, 1908.07, 1954.47, 2028.95], weeklyChange: 3.13, dayChange: 3.82, sortRank: 0, periodReturns: { '1M': 7.7, 'YTD': 117.4, '6M': 111.8, '1Y': 299.7 },
      priceHistory: { '1D': [1954.37, 2021.62, 2026, 2028.95], '1W': [1967.41, 2066.51, 1908.07, 1954.47, 2028.95], '1M': [1883.56, 1867.09, 1855.15, 1828.21, 1787.88, 1883.26, 1850.04, 1914.65, 1843.94, 1852.03, 1719.48, 1843.42, 1877.61, 1952.02, 1913.94, 1931.77, 1967.41, 2066.51, 1908.07, 1954.47, 2028.95], 'YTD': [933.29, 971.49, 1091.04, 1131.7, 1171.46, 1147.97, 1300.02, 1462.23, 1438.23, 1348.22, 1373.76, 1444.6, 1358.66, 1428.52, 1574.45, 1605.97, 1773.91, 1840.25, 2011.49, 2034.63, 1835.51, 1855.15, 1914.65, 1719.48, 1931.77, 2028.95], '6M': [963.83, 1032.31, 1038.18, 1134.75, 1160.38, 1209.97, 1269.63, 1337.75, 1468.58, 1391.16, 1383.62, 1424.46, 1461.52, 1378.99, 1525.16, 1648.96, 1724.49, 1724.14, 2011.49, 2016.31, 1825.5, 1867.09, 1850.04, 1719.48, 1931.77, 2028.95], '1Y': [507.6, 529.9, 533.77, 550.5, 562.83, 703.3, 694.43, 702.1, 681.08, 709.83, 723.95, 764.91, 799.38, 781.88, 832.98, 834.7, 838.78, 825, 963.3, 957.78, 973.18, 930.5, 970.95, 1004.65, 1024.92, 918.54, 963.83, 1032.31, 1038.18, 1134.75, 1160.38, 1209.97, 1283.65, 1337.75, 1468.58, 1391.16, 1383.62, 1424.46, 1461.52, 1378.99, 1525.16, 1648.96, 1724.49, 1724.14, 2011.49, 2016.31, 1825.5, 1867.09, 1850.04, 1719.48, 1931.77, 2028.95] },
      velocityScore: { '1D': 2.2, '1W': 0.5, '1M': -59.2, '6M': null }, isNew: false,
      marketCap: '$71B', pe: 58.7, revenueGrowth: 1, eps: 34.59, grossMargin: 25, dividendYield: 0.13,
      etfPresence: { AIRR: 4.45, PRN: 4.78, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, avgWeight: 4.53, proScore: 1.81, coverage: 0.4,
      price: 760, weeklyPrices: [738.85, 790.00, 736.77, 732.24, 760.00], weeklyChange: 2.86, dayChange: 3.88, sortRank: 0, periodReturns: { '1M': 13.3, 'YTD': 142.6, '6M': 131.5, '1Y': 263.5 },
      priceHistory: { '1D': [731.63, 760, 760], '1W': [738.85, 790, 736.77, 732.24, 760], '1M': [670.66, 673.51, 677.45, 667.02, 646.89, 663.14, 686.37, 689.43, 694.72, 619.98, 588.9, 623.66, 641.68, 688.87, 690.39, 719.52, 738.85, 790, 736.77, 732.24, 760], 'YTD': [313.32, 313.98, 329.66, 380.36, 355.51, 345.97, 413.65, 437.61, 452.53, 430.25, 459.3, 479.9, 410.85, 571.38, 609.29, 601.83, 656.79, 669.98, 727.54, 719.92, 630.5, 677.45, 689.43, 588.9, 719.52, 760], '6M': [325.14, 339.54, 309.26, 384.34, 362.58, 381.73, 371.47, 406.88, 447.6, 438.93, 458.71, 473.63, 444.83, 544.65, 588.28, 606.43, 651.68, 630.07, 727.54, 681.01, 639.58, 673.51, 686.37, 588.9, 719.52, 760], '1Y': [209.05, 206.15, 208.46, 203.84, 224.37, 244.98, 235, 229.52, 215.89, 226.87, 237.83, 232.59, 259.58, 258.17, 271.34, 270.09, 296.39, 276.12, 298.33, 311.38, 364.78, 358.72, 380.62, 356.39, 330.6, 313.9, 325.14, 339.54, 309.26, 384.34, 362.58, 381.73, 370, 406.88, 447.6, 438.93, 458.71, 473.63, 444.83, 544.65, 588.28, 606.43, 651.68, 630.07, 727.54, 681.01, 639.58, 673.51, 686.37, 588.9, 719.52, 760] },
      velocityScore: { '1D': -1.1, '1W': 0.6, '1M': -57.4, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 67, revenueGrowth: 50, eps: 11.35, grossMargin: 21, dividendYield: 0.27,
      etfPresence: { AIRR: 4.43, PRN: 4.63, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Argan Inc is an engineering and construction company for power generation facilities — natural gas and renewable power plants. It appears in Industrials ETFs because power plant construction is one of the fastest-growing categories in U.S. infrastructure spending, driven by data center load additions that the grid cannot currently support.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.92, proScore: 1.57, coverage: 0.4,
      price: 339.26, weeklyPrices: [337.96, 338.07, 330.90, 333.78, 339.26], weeklyChange: 0.39, dayChange: 1.59, sortRank: 0, periodReturns: { '1M': 9, 'YTD': 32.1, '6M': 28.3, '1Y': 51.1 },
      priceHistory: { '1D': [333.94, 337.24, 339.55, 339.26], '1W': [337.96, 338.07, 330.9, 333.78, 339.26], '1M': [311.33, 312.65, 308.53, 303.81, 300.98, 308.31, 313.39, 313.67, 315.29, 314.42, 314.08, 318.89, 320.11, 316.18, 324.38, 329.89, 337.96, 338.07, 330.9, 333.78, 339.26], 'YTD': [256.77, 264.62, 282.47, 282.33, 259.51, 287.03, 279.03, 281.97, 283.5, 274.97, 259.88, 256.58, 260.51, 269.36, 286.41, 284.39, 294.4, 305.75, 315.39, 310.87, 306.25, 308.53, 313.67, 314.08, 329.89, 339.26], '6M': [264.78, 263.15, 273.7, 277.44, 262.34, 273.22, 283.73, 278.31, 282.27, 277.7, 264.31, 261.37, 264.14, 265.32, 280.74, 284.56, 289.82, 296.57, 315.39, 313.7, 302.64, 312.65, 313.39, 314.08, 329.89, 339.26], '1Y': [224.6, 245.19, 255.95, 261.93, 268.07, 271.5, 263.43, 275.72, 262.46, 268.4, 267.96, 269.68, 262.77, 259.1, 259.16, 251.03, 244.84, 260, 255.91, 259.66, 256.26, 243.79, 257.32, 258.83, 262.84, 259.48, 264.78, 263.15, 273.7, 277.44, 262.34, 273.22, 282.45, 278.31, 282.27, 277.7, 264.31, 261.37, 264.14, 265.32, 280.74, 284.56, 289.82, 296.57, 315.39, 313.7, 302.64, 312.65, 313.39, 314.08, 329.89, 339.26] },
      velocityScore: { '1D': 0, '1W': 12.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 32.1, revenueGrowth: 7, eps: 10.58, grossMargin: 30, dividendYield: 0.61,
      etfPresence: { AIRR: 1.81, PRN: false, RSHO: 6.04, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 2, avgWeight: 2.83, proScore: 1.13, coverage: 0.4,
      price: 274.65, weeklyPrices: [277.66, 280.36, 275.13, 276.06, 274.65], weeklyChange: -1.08, dayChange: -0.53, sortRank: 0, periodReturns: { '1M': 4.9, 'YTD': 34, '6M': 29.5, '1Y': 56 },
      priceHistory: { '1D': [276.12, 274.86, 274.65], '1W': [277.66, 280.36, 275.13, 276.06, 274.65], '1M': [261.89, 258.02, 259.89, 258.25, 255.52, 250.72, 248.63, 249.33, 251.9, 246.55, 249.49, 264.6, 264.67, 270.44, 277.42, 283.23, 277.66, 280.36, 275.13, 276.06, 274.65], 'YTD': [205.02, 210.02, 224.26, 217.7, 208.93, 209.63, 244.79, 258.1, 260.31, 252.39, 243.82, 232.94, 230.51, 239.04, 254.06, 247.6, 246.16, 243.04, 256.43, 273.1, 261.21, 259.89, 249.33, 249.49, 283.23, 274.65], '6M': [211.22, 212.92, 220.15, 220.36, 215.53, 213.49, 224.47, 252.55, 260.95, 258.84, 253.91, 240.24, 239.51, 230.46, 250, 254.04, 240.88, 236.52, 256.43, 269.76, 253.12, 258.02, 248.63, 249.49, 283.23, 274.65], '1Y': [176.08, 175.95, 178.53, 188.83, 186.8, 179.77, 181.58, 176.8, 171.94, 175.65, 179.53, 184.21, 191.84, 189.85, 191.08, 188.83, 191.68, 200.1, 201.77, 205.72, 205.07, 202.06, 204.63, 196.27, 195.89, 198, 211.22, 212.92, 220.15, 220.36, 215.53, 213.49, 225.15, 252.55, 260.95, 258.84, 253.91, 240.24, 239.51, 230.46, 250, 254.04, 240.88, 236.52, 256.43, 269.76, 253.12, 258.02, 248.63, 249.49, 283.23, 274.65] },
      velocityScore: { '1D': 0.9, '1W': -0.9, '1M': -51.3, '6M': null }, isNew: false,
      marketCap: '$110B', pe: 63.7, revenueGrowth: 19, eps: 4.31, grossMargin: 35, dividendYield: 0.17,
      etfPresence: { AIRR: false, PRN: 3.35, RSHO: false, IDEF: 2.31, BILT: false },
      tonyNote: 'Howmet Aerospace is an aerospace structures and engine components manufacturer. It appears in Industrials ETFs for its aerospace and defense exposure — commercial air travel recovery and defense spending growth are the two demand drivers. Revenue grew and margins are expanding as Howmet prices power over OEM customers.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 2.81, proScore: 1.12, coverage: 0.4,
      price: 240.99, weeklyPrices: [242.97, 246.41, 236.07, 237.22, 240.99], weeklyChange: -0.82, dayChange: 1.58, sortRank: 0, periodReturns: { '1M': 10, 'YTD': 20.5, '6M': 15.6, '1Y': 49.3 },
      priceHistory: { '1D': [237.23, 241.07, 240.99], '1W': [242.97, 246.41, 236.07, 237.22, 240.99], '1M': [219.08, 215.34, 213.82, 216.66, 220.92, 230.08, 234.08, 236.14, 227.8, 229.95, 223.63, 233.49, 230.05, 237.06, 234.8, 235.29, 242.97, 246.41, 236.07, 237.22, 240.99], 'YTD': [200.06, 207.44, 213.61, 217.13, 211.84, 218.02, 230.92, 242.29, 231.59, 211.9, 202.65, 202.36, 200.45, 203.16, 215.54, 215.27, 223.96, 218.91, 212.74, 203.79, 205.55, 213.82, 236.14, 223.63, 235.29, 240.99], '6M': [208.48, 205.44, 208.56, 217.9, 215.68, 215.43, 231.2, 241.6, 243.04, 219.58, 210.96, 204.62, 200.67, 199.94, 212.22, 219.99, 220.62, 211.36, 212.74, 198.99, 195.79, 215.34, 234.08, 223.63, 235.29, 240.99], '1Y': [161.46, 172.55, 173.08, 180.12, 175.41, 182.39, 204.31, 191.88, 186.26, 192.47, 186.63, 190.25, 190.48, 182.95, 187.73, 185.97, 182.92, 190.4, 198.85, 217.63, 219.09, 205.32, 215.87, 208.24, 224.76, 210.34, 208.48, 205.44, 208.56, 217.9, 215.68, 215.43, 223.86, 241.6, 243.04, 219.58, 210.96, 204.62, 200.67, 199.94, 212.22, 219.99, 220.62, 211.36, 212.74, 198.99, 195.79, 215.34, 234.08, 223.63, 235.29, 240.99] },
      velocityScore: { '1D': -0.9, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 46.2, revenueGrowth: 17, eps: 5.22, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.66, PRN: false, RSHO: 3.96, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 2, avgWeight: 2.52, proScore: 1.01, coverage: 0.4,
      price: 208.73, weeklyPrices: [205.40, 210.00, 209.89, 205.65, 208.73], weeklyChange: 1.62, dayChange: 1.52, sortRank: 0, periodReturns: { '1M': 2.1, 'YTD': 20.8, '6M': 17.8, '1Y': 48.2 },
      priceHistory: { '1D': [205.6, 208.01, 208.73], '1W': [205.4, 210, 209.89, 205.65, 208.73], '1M': [204.38, 198.95, 199.27, 195.88, 188.39, 187.26, 184.72, 190.76, 185.95, 187.46, 183, 194.68, 193.45, 193.94, 196.93, 203.07, 205.4, 210, 209.89, 205.65, 208.73], 'YTD': [172.84, 193.2, 213.25, 206.33, 210.18, 187.42, 196.9, 206.44, 207.24, 195.5, 197.82, 210.12, 205.09, 212.81, 230.29, 230.8, 225.51, 216.39, 215.2, 206.83, 202.66, 199.27, 190.76, 183, 203.07, 208.73], '6M': [175.88, 189.02, 206.62, 206.07, 212.4, 210.88, 199.83, 201.09, 204.23, 205.83, 195.91, 207.48, 204.76, 204.49, 231.78, 238.42, 219.1, 208.08, 215.2, 206.83, 197.33, 198.95, 184.72, 183, 203.07, 208.73], '1Y': [140.86, 140.77, 136.45, 142.34, 143.84, 151.93, 179.53, 176.76, 163.56, 165.6, 163.79, 170.1, 174.03, 176.21, 185.7, 195.6, 209.01, 199.92, 213.8, 193.93, 196.77, 179.81, 178.18, 178.33, 183.38, 170.75, 175.88, 189.02, 206.62, 206.07, 212.4, 210.88, 203, 201.09, 204.23, 205.83, 195.91, 207.48, 204.76, 204.49, 231.78, 238.42, 219.1, 208.08, 215.2, 206.83, 197.33, 198.95, 184.72, 183, 203.07, 208.73] },
      velocityScore: { '1D': -1.9, '1W': 3.1, '1M': -56.7, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 55.8, revenueGrowth: 26, eps: 3.74, grossMargin: 23, dividendYield: 0.51,
      etfPresence: { AIRR: 3.2, PRN: false, RSHO: false, IDEF: 1.84, BILT: false },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 2, avgWeight: 1.77, proScore: 0.71, coverage: 0.4,
      price: 280.35, weeklyPrices: [285.43, 278.19, 283.48, 279.62, 280.35], weeklyChange: -1.78, dayChange: 0.22, sortRank: 0, periodReturns: { '1M': -12.6, 'YTD': -17.6, '6M': -21.1, '1Y': 19.2 },
      priceHistory: { '1D': [279.73, 277.61, 279.51, 280.35], '1W': [285.43, 278.19, 283.48, 279.62, 280.35], '1M': [320.95, 317.56, 320.9, 308.17, 296.41, 293.66, 287.54, 294.53, 293.04, 292.26, 289.13, 300.95, 297.68, 299.66, 298.51, 296.89, 285.43, 278.19, 283.48, 279.62, 280.35], 'YTD': [340.07, 378.47, 418.86, 424.14, 427.83, 369.38, 406.76, 437.57, 443, 421.17, 414.56, 418.42, 384.79, 393.32, 403.37, 396.17, 370.14, 364.29, 319.54, 334.22, 321.92, 320.9, 294.53, 289.13, 296.89, 280.35], '6M': [351.13, 363.48, 398.25, 415.58, 422.79, 429.64, 399.37, 417.83, 447.73, 440.33, 417.51, 422.94, 402.08, 379.9, 411.35, 398.13, 366.88, 362.17, 319.54, 333.56, 324.6, 317.56, 287.54, 289.13, 296.89, 280.35], '1Y': [235.12, 250.15, 258.11, 255.35, 263.33, 278.86, 266.45, 269.43, 267.09, 276.39, 269.98, 276.07, 274.69, 271.25, 282.22, 286.14, 282.66, 290.09, 319.07, 305.43, 317.89, 309.74, 314.31, 315.88, 326.72, 322.63, 351.13, 363.48, 398.25, 415.58, 422.79, 429.64, 405.82, 417.83, 447.73, 440.33, 417.51, 422.94, 402.08, 379.9, 411.35, 398.13, 366.88, 362.17, 319.54, 333.56, 324.6, 317.56, 287.54, 289.13, 296.89, 280.35] },
      velocityScore: { '1D': -1.4, '1W': -4.1, '1M': -66.4, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 18.2, revenueGrowth: 13, eps: 15.38, grossMargin: 12, dividendYield: 1.97,
      etfPresence: { AIRR: 2.49, PRN: false, RSHO: false, IDEF: 1.04, BILT: false },
      tonyNote: 'Huntington Ingalls Industries is the only builder of nuclear-powered aircraft carriers for the U.S. Navy. Revenue is government-contracted and predictable; the ETF allocation in Industrials reflects defense spending growth and the Navy\'s backlog of nuclear submarine and carrier construction. A steady-state quality compounder in a market structure with no competition.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 2, avgWeight: 1.67, proScore: 0.67, coverage: 0.4,
      price: 47.02, weeklyPrices: [54.21, 51.09, 50.80, 47.95, 47.02], weeklyChange: -13.27, dayChange: -1.94, sortRank: 0, periodReturns: { '1M': -17.2, 'YTD': -38.1, '6M': -41.2, '1Y': 11.1 },
      priceHistory: { '1D': [47.95, 46.51, 46.92, 47.02], '1W': [54.21, 51.09, 50.8, 47.95, 47.02], '1M': [56.8, 57.3, 65.19, 64.13, 63.49, 63.27, 58.43, 63.4, 58.52, 57.73, 54.82, 58.78, 57.75, 57.02, 56.34, 56.16, 54.21, 51.09, 50.8, 47.95, 47.02], 'YTD': [75.91, 104.04, 124.56, 113.85, 108.16, 85.25, 87.05, 96.08, 92.14, 85.54, 89.46, 92.78, 75.86, 67.7, 68.33, 74.41, 65.52, 63.05, 61.52, 52.49, 55.82, 65.19, 63.4, 54.82, 56.16, 47.02], '6M': [77.7, 89.93, 117.86, 128.68, 118.06, 103.37, 93.48, 91.97, 90.68, 88.95, 88.96, 95.31, 77.49, 70.51, 74.46, 74.66, 68.61, 59.56, 61.52, 57.33, 53.47, 57.3, 58.43, 54.82, 56.16, 47.02], '1Y': [42.33, 43.28, 46.27, 58.91, 58.66, 58.7, 59.08, 68.75, 64.27, 67.92, 63.59, 67.67, 80.65, 84.2, 95.03, 98.55, 88.62, 89.32, 88.3, 72.41, 76.7, 70.67, 75.77, 77.68, 78.78, 71.4, 77.7, 89.93, 117.86, 128.68, 118.06, 103.37, 98.81, 91.97, 90.68, 88.95, 88.96, 95.31, 77.49, 70.51, 74.46, 74.66, 68.61, 59.56, 61.52, 57.33, 53.47, 57.3, 58.43, 54.82, 56.16, 47.02] },
      velocityScore: { '1D': -5.6, '1W': -13, '1M': -67.5, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 276.6, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.38, PRN: false, RSHO: false, IDEF: 0.95, BILT: false },
      tonyNote: 'Kratos Defense is a defense technology company focused on unmanned systems, satellite communications, and high-performance computing for government customers. It appears in Industrials ETFs as an AI-adjacent defense name — autonomous systems and AI-driven surveillance are direct end markets. Revenue grew and the government contract backlog is expanding.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 1.42, proScore: 0.57, coverage: 0.4,
      price: 76.07, weeklyPrices: [73.12, 74.95, 75.79, 75.87, 76.07], weeklyChange: 4.03, dayChange: 0.26, sortRank: 0, periodReturns: { '1M': -0.4, 'YTD': 26.6, '6M': 27.9, '1Y': 25.3 },
      priceHistory: { '1D': [75.87, 75.99, 76.06, 76.07], '1W': [73.12, 74.95, 75.79, 75.87, 76.07], '1M': [76.34, 74.37, 73.13, 71.39, 70.04, 71.31, 71.66, 72.43, 71.96, 71.59, 72.26, 71.62, 72.08, 71.49, 71.48, 71.25, 73.12, 74.95, 75.79, 75.87, 76.07], 'YTD': [60.11, 61.15, 60.29, 63.72, 67.24, 67.42, 71.13, 72.98, 74.77, 74.77, 73.52, 74.06, 74.06, 71.83, 72.82, 70.86, 71.65, 76.31, 73.76, 75.71, 77.88, 73.13, 72.43, 72.26, 71.25, 76.07], '6M': [59.52, 61.16, 59.56, 61.51, 65.48, 68.5, 68.84, 71.96, 73.5, 75.88, 73.84, 73.69, 74.46, 72.78, 73.01, 70.76, 71.1, 73.32, 73.76, 74.73, 79.4, 74.37, 71.66, 72.26, 71.25, 76.07], '1Y': [60.69, 59.14, 57.78, 58.09, 58.75, 59.95, 57.89, 57.86, 57.22, 57.49, 57.58, 59.33, 60.38, 63.31, 64.06, 63.1, 62.53, 58.93, 57.62, 57.94, 60.43, 58.89, 60.22, 63.66, 60.92, 58.66, 59.52, 61.16, 59.56, 61.51, 65.48, 68.5, 67.85, 71.96, 73.5, 75.88, 73.84, 73.69, 74.46, 72.78, 73.01, 70.76, 71.1, 73.32, 73.76, 74.73, 79.4, 74.37, 71.66, 72.26, 71.25, 76.07] },
      velocityScore: { '1D': 0, '1W': 3.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$93B', pe: 33.4, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.77,
      etfPresence: { AIRR: false, PRN: false, RSHO: 0.92, IDEF: false, BILT: 1.91 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RBC', name: 'RBC Bearings Incorporated', easyScore: 2, avgWeight: 1.21, proScore: 0.48, coverage: 0.4,
      price: 652.44, weeklyPrices: [639.18, 645.73, 633.44, 638.94, 652.44], weeklyChange: 2.07, dayChange: 2.11, sortRank: 0, periodReturns: { '1M': 11.6, 'YTD': 45.5, '6M': 42.3, '1Y': 71.4 },
      priceHistory: { '1D': [638.94, 650.68, 646.62, 652.44], '1W': [639.18, 645.73, 633.44, 638.94, 652.44], '1M': [584.4, 577.42, 577.83, 571.96, 566.14, 578.34, 584.18, 589.76, 590.09, 590.97, 576.74, 607.46, 603.64, 616.95, 621.08, 625.73, 639.18, 645.73, 633.44, 638.94, 652.44], 'YTD': [448.43, 485, 497.06, 504.99, 511.98, 520.16, 550.4, 559.18, 576.5, 566.06, 547.31, 540.83, 548.95, 551.99, 595.11, 571.61, 601.39, 599.09, 623.19, 618.91, 571.05, 577.83, 589.76, 576.74, 625.73, 652.44], '6M': [456.33, 461.21, 488.31, 495.29, 504.54, 516.1, 547.51, 552.93, 571.57, 568.58, 560.28, 544.55, 552.23, 543.12, 580.55, 586.98, 588.74, 584.49, 623.19, 613.1, 565.22, 577.42, 584.18, 576.74, 625.73, 652.44], '1Y': [380.57, 383.13, 378.91, 397.03, 385.02, 387.34, 404.66, 410.61, 392.76, 399.53, 391.1, 385.08, 384.72, 379.44, 374.99, 384.43, 369.71, 407.3, 406.45, 431.93, 445.34, 430.24, 443.29, 443.22, 458.15, 449.77, 456.33, 461.21, 488.31, 495.29, 504.54, 516.1, 548.2, 552.93, 571.57, 568.58, 560.28, 544.55, 552.23, 543.12, 580.55, 586.98, 588.74, 584.49, 623.19, 613.1, 565.22, 577.42, 584.18, 576.74, 625.73, 652.44] },
      velocityScore: { '1D': 0, '1W': 2.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$21B', pe: 71.9, revenueGrowth: 18, eps: 9.07, grossMargin: 45, dividendYield: null,
      etfPresence: { AIRR: 1.88, PRN: false, RSHO: false, IDEF: 0.53, BILT: false },
      tonyNote: 'RBC Bearings Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRCY', name: 'Mercury Systems, Inc.', easyScore: 2, avgWeight: 1.04, proScore: 0.42, coverage: 0.4,
      price: 105.53, weeklyPrices: [113.91, 111.76, 110.87, 105.00, 105.53], weeklyChange: -7.35, dayChange: 0.51, sortRank: 0, periodReturns: { '1M': 6.3, 'YTD': 44.5, '6M': 41.3, '1Y': 110.5 },
      priceHistory: { '1D': [105, 105.38, 104, 105.53], '1W': [113.91, 111.76, 110.87, 105, 105.53], '1M': [99.32, 97.11, 108.11, 111.7, 111.28, 112.87, 111.59, 117.82, 111.27, 110.94, 106.81, 119.32, 120.3, 115.93, 112.44, 115.5, 113.91, 111.76, 110.87, 105, 105.53], 'YTD': [73.01, 88.74, 102.95, 99.48, 98.29, 79.07, 80.25, 87.63, 89.58, 84.96, 81.44, 77.81, 76.16, 74.75, 79.23, 84.91, 78.91, 78.91, 91.66, 92.5, 94.81, 108.11, 117.82, 106.81, 115.5, 105.53], '6M': [74.22, 81.29, 97.02, 97.1, 101.04, 99.28, 84.36, 83.32, 88.76, 89.43, 86.87, 81.35, 74.49, 72.91, 80.81, 85.51, 82.61, 74.75, 91.66, 92.32, 92.8, 97.11, 111.59, 106.81, 115.5, 105.53], '1Y': [50.13, 50.5, 50.62, 52.2, 52.46, 52.59, 52.62, 68.39, 64.54, 68.13, 67.89, 73.08, 77.1, 73.13, 82.56, 80.96, 77.1, 77.6, 76.8, 75.36, 73.1, 67.55, 69.62, 71.35, 76.61, 68.88, 74.22, 81.29, 97.02, 97.1, 101.04, 99.28, 85.37, 83.32, 88.76, 89.43, 86.87, 81.35, 74.49, 72.91, 80.81, 85.51, 82.61, 74.75, 91.66, 92.32, 92.8, 97.11, 111.59, 106.81, 115.5, 105.53] },
      velocityScore: { '1D': -4.5, '1W': -6.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: null, revenueGrowth: 12, eps: -0.23, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: 1.09, PRN: false, RSHO: false, IDEF: 0.99, BILT: false },
      tonyNote: 'Mercury Systems, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, avgWeight: 0.95, proScore: 0.38, coverage: 0.4,
      price: 44.82, weeklyPrices: [50.37, 47.70, 46.38, 44.84, 44.82], weeklyChange: -11.02, dayChange: -0.13, sortRank: 0, periodReturns: { '1M': -26.1, 'YTD': -38.7, '6M': -44.5, '1Y': -8.3 },
      priceHistory: { '1D': [44.88, 44.4, 44.39, 44.82], '1W': [50.37, 47.7, 46.38, 44.84, 44.82], '1M': [60.66, 63.52, 65.86, 57.5, 53.65, 54.65, 51.84, 54.39, 49.44, 49.64, 45.87, 49.58, 47.83, 48.27, 51.7, 52.03, 50.37, 47.7, 46.38, 44.84, 44.82], 'YTD': [73.17, 101.28, 109.49, 111.61, 110.93, 89.78, 78.71, 81.62, 88.31, 97.14, 98.98, 105.95, 86.01, 82.69, 84.22, 87.91, 76.6, 67.98, 63.19, 67.28, 65.76, 65.86, 54.39, 45.87, 52.03, 44.82], '6M': [77.55, 83.99, 107.5, 106.28, 113.34, 111.72, 91.25, 75.11, 83.6, 91.11, 102.79, 104.06, 101.84, 80.05, 87.75, 92.73, 82.11, 65.98, 63.19, 62.48, 64.2, 63.52, 51.84, 45.87, 52.03, 44.82], '1Y': [48.89, 45.24, 47.44, 56.3, 49.41, 51.7, 48.21, 51.83, 50.76, 54.65, 53.38, 63.8, 65.45, 67.4, 73.41, 74.51, 76.85, 81.99, 85.6, 74.98, 67.74, 60.93, 67.43, 66.48, 69.37, 68.11, 77.55, 83.99, 107.5, 106.28, 113.34, 111.72, 97.47, 75.11, 83.6, 91.11, 102.79, 104.06, 101.84, 80.05, 87.75, 92.73, 82.11, 65.98, 63.19, 62.48, 64.2, 63.52, 51.84, 45.87, 52.03, 44.82] },
      velocityScore: { '1D': -5, '1W': -13.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: 194.9, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.73, PRN: false, RSHO: false, IDEF: 0.18, BILT: false },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AIR', name: 'AIRBUS GROUP', easyScore: 2, avgWeight: 0.84, proScore: 0.34, coverage: 0.4,
      price: 135.5, weeklyPrices: [134.88, 134.28, 132.26, 132.94, 135.50], weeklyChange: 0.46, dayChange: 1.84, sortRank: 0, periodReturns: { '1M': 20.2, 'YTD': 63.7, '6M': 57.5, '1Y': 101.5 },
      priceHistory: { '1D': [133.06, 135.51, 135.5], '1W': [134.88, 134.28, 132.26, 132.94, 135.5], '1M': [112.74, 112.82, 114.97, 112.62, 109.99, 110.61, 111.36, 115.53, 116.65, 114.72, 117.36, 127.23, 129.01, 131.18, 129.96, 132.14, 134.88, 134.28, 132.26, 132.94, 135.5], 'YTD': [82.79, 94.73, 105.74, 107.74, 106.67, 106.87, 113.22, 116.97, 118.17, 110.71, 103.78, 109.21, 110.82, 111.37, 123.04, 118.51, 112.08, 110.37, 118.71, 107.47, 107.51, 114.97, 115.53, 117.36, 132.14, 135.5], '6M': [85.07, 88.02, 98.23, 103.67, 105.47, 109.89, 113.11, 113.54, 118.26, 116.84, 108.3, 108.76, 107.81, 109.46, 120.78, 122.75, 111.5, 105.69, 118.71, 111.51, 100.89, 112.82, 111.36, 117.36, 132.14, 135.5], '1Y': [67.26, 71.08, 74.55, 85.1, 77.5, 74.71, 72.06, 78.68, 71.77, 75.82, 77.11, 75.32, 75.93, 82.66, 83.95, 81.27, 82.86, 85.69, 84.22, 82.25, 83.65, 78.56, 82.98, 83.79, 84.34, 81.88, 85.07, 88.02, 98.23, 103.67, 105.47, 109.89, 114.34, 113.54, 118.26, 116.84, 108.3, 108.76, 107.81, 109.46, 120.78, 122.75, 111.5, 105.69, 118.71, 111.51, 100.89, 112.82, 111.36, 117.36, 132.14, 135.5] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$5B', pe: 29.8, revenueGrowth: 25, eps: 4.55, grossMargin: 19, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 1.52, BILT: false },
      tonyNote: 'AIRBUS GROUP appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DRS', name: 'Leonardo DRS, Inc.', easyScore: 2, avgWeight: 0.56, proScore: 0.23, coverage: 0.4,
      price: 44.91, weeklyPrices: [46.08, 44.99, 45.74, 44.69, 44.91], weeklyChange: -2.55, dayChange: 0.48, sortRank: 0, periodReturns: { '1M': -2, 'YTD': 31.7, '6M': 30.1, '1Y': 3.3 },
      priceHistory: { '1D': [44.69, 44.5, 44.91], '1W': [46.08, 44.99, 45.74, 44.69, 44.91], '1M': [45.8, 45.35, 48.41, 48.76, 47.96, 47.39, 45.61, 46.71, 46.15, 46.55, 46.11, 49.69, 48.53, 46.68, 45.59, 46.58, 46.08, 44.99, 45.74, 44.69, 44.91], 'YTD': [34.09, 38.84, 42.26, 41.28, 41.3, 37.27, 37.77, 40.03, 43.34, 45.82, 45.91, 45.48, 46.53, 45.86, 47.1, 44.94, 41.41, 40.63, 41.79, 42.5, 44.56, 48.41, 46.71, 46.11, 46.58, 44.91], '6M': [34.28, 37.01, 41.27, 42.07, 42.16, 41.51, 39.48, 39.13, 43.82, 45.51, 46.35, 45.6, 44.06, 44.52, 47.93, 46.29, 42.07, 39.47, 41.79, 42.87, 42.81, 45.35, 45.61, 46.11, 46.58, 44.91], '1Y': [43.47, 45.31, 46.24, 48.33, 47.45, 41.6, 41.25, 41.9, 41.06, 42.03, 40.91, 41.61, 42.58, 42.35, 44.63, 44.21, 39.6, 40.53, 36.05, 35.31, 35.46, 33.43, 33.69, 34.31, 34.78, 33.17, 34.28, 37.01, 41.27, 42.07, 42.16, 41.51, 40.22, 39.13, 43.82, 45.51, 46.35, 45.6, 44.06, 44.52, 47.93, 46.29, 42.07, 39.47, 41.79, 42.87, 42.81, 45.35, 45.61, 46.11, 46.58, 44.91] },
      velocityScore: { '1D': 0, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 42, revenueGrowth: 6, eps: 1.07, grossMargin: 24, dividendYield: 0.81,
      etfPresence: { AIRR: 0.82, PRN: false, RSHO: false, IDEF: 0.31, BILT: false },
      tonyNote: 'Leonardo DRS, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TPC', name: 'Tutor Perini Corporation', easyScore: 2, avgWeight: 0.38, proScore: 0.15, coverage: 0.4,
      price: 83.93, weeklyPrices: [77.99, 81.50, 81.00, 82.36, 83.93], weeklyChange: 7.62, dayChange: 1.82, sortRank: 0, periodReturns: { '1M': 12.4, 'YTD': 25.2, '6M': 21.8, '1Y': 90.4 },
      priceHistory: { '1D': [82.43, 83.97, 83.93], '1W': [77.99, 81.5, 81, 82.36, 83.93], '1M': [74.67, 74.47, 73.27, 71.49, 74.26, 74.29, 72.26, 72.38, 70.53, 72.13, 68.72, 73.61, 74.92, 76.55, 76.19, 77.89, 77.99, 81.5, 81, 82.36, 83.93], 'YTD': [67.02, 70.17, 75.17, 76.79, 79.86, 79.95, 81.73, 86.9, 89.38, 71.12, 69.2, 72.31, 76.24, 78.71, 81.5, 84.39, 86.48, 92.92, 96.98, 80.64, 76.99, 73.27, 72.38, 68.72, 77.89, 83.93], '6M': [69.06, 71.79, 74.25, 74.13, 78.53, 82.33, 86, 82.24, 85.87, 69.95, 71.29, 71.44, 75.25, 77.19, 80.54, 86.25, 84.19, 86.04, 96.98, 82.69, 74.91, 74.47, 72.26, 68.72, 77.89, 83.93], '1Y': [44.08, 47.46, 48.06, 50.89, 48.29, 48.15, 55.07, 57.75, 55.99, 58.79, 61, 62.89, 66.22, 64.33, 62.04, 61.75, 64.19, 67.67, 67.69, 67.4, 62.28, 60.11, 67.56, 68.64, 70.46, 67.56, 69.06, 71.79, 74.25, 74.13, 78.53, 82.33, 84.07, 82.24, 85.87, 69.95, 71.29, 71.44, 75.25, 77.19, 80.54, 86.25, 84.19, 86.04, 96.98, 82.69, 74.91, 74.47, 72.26, 68.72, 77.89, 83.93] },
      velocityScore: { '1D': 0, '1W': 7.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 57.5, revenueGrowth: 12, eps: 1.46, grossMargin: 12, dividendYield: 0.29,
      etfPresence: { AIRR: 0.72, PRN: false, RSHO: false, IDEF: 0.04, BILT: false },
      tonyNote: 'Tutor Perini Corporation appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TKR', name: 'TIMKEN CO/THE', easyScore: 1, avgWeight: 8.69, proScore: 1.74, coverage: 0.2,
      price: 142.12, weeklyPrices: [142.36, 141.97, 137.64, 137.99, 142.12], weeklyChange: -0.17, dayChange: 2.99, sortRank: 0, periodReturns: { '1M': 11.5, 'YTD': 68.9, '6M': 65.2, '1Y': 94.5 },
      priceHistory: { '1D': [137.99, 141.78, 142.5, 142.12], '1W': [142.36, 141.97, 137.64, 137.99, 142.12], '1M': [127.42, 127.16, 126.78, 127.98, 126.54, 131.9, 131.82, 133.66, 131.83, 134.67, 132.39, 137.4, 137.06, 139.12, 140.28, 139.4, 142.36, 141.97, 137.64, 137.99, 142.12], 'YTD': [84.13, 90.6, 93.73, 94.6, 94.15, 102.15, 107.35, 108.16, 109.88, 103.05, 99.7, 97.44, 99.06, 102.06, 106.92, 103.92, 108.7, 110.89, 119.7, 115.74, 117.2, 126.78, 133.66, 132.39, 139.4, 142.12], '6M': [86.52, 88.34, 90.83, 90.65, 93.89, 96.14, 109.41, 105.54, 109.52, 106.58, 102.18, 98.59, 101.03, 100.57, 105.88, 103.73, 106.79, 106.53, 119.7, 117.12, 109.36, 127.16, 131.82, 132.39, 139.4, 142.12], '1Y': [73.05, 76.72, 78.57, 79.13, 80.76, 76.09, 73.91, 80.39, 75.86, 79.01, 77.42, 79.16, 79.09, 74.2, 75.99, 74.32, 74.04, 77.71, 78.68, 77.95, 78.66, 74.82, 81.36, 82.76, 88.71, 84.92, 86.52, 88.34, 90.83, 90.65, 93.89, 96.14, 108.93, 105.54, 109.52, 106.58, 102.18, 98.59, 101.03, 100.57, 105.88, 103.73, 106.79, 106.53, 119.7, 117.12, 109.36, 127.16, 131.82, 132.39, 139.4, 142.12] },
      velocityScore: { '1D': 0, '1W': -5.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 32.3, revenueGrowth: 8, eps: 4.4, grossMargin: 31, dividendYield: 1.04,
      etfPresence: { AIRR: false, PRN: false, RSHO: 8.69, IDEF: false, BILT: false },
      tonyNote: 'TIMKEN CO/THE appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RTX', name: 'RTX CORP', easyScore: 1, avgWeight: 8.34, proScore: 1.67, coverage: 0.2,
      price: 186.5, weeklyPrices: [185.60, 181.83, 186.39, 185.06, 186.50], weeklyChange: 0.48, dayChange: 0.79, sortRank: 0, periodReturns: { '1M': 4.2, 'YTD': 1.7, '6M': 0.1, '1Y': 31.9 },
      priceHistory: { '1D': [185.03, 185.28, 185.84, 186.5], '1W': [185.6, 181.83, 186.39, 185.06, 186.5], '1M': [178.97, 176.59, 178.96, 179.66, 174.41, 174.26, 172.55, 179.41, 180.99, 178.66, 177.41, 184.21, 183.53, 183.64, 186.77, 192.58, 185.6, 181.83, 186.39, 185.06, 186.5], 'YTD': [183.4, 187.17, 199.83, 196.34, 199.88, 195.97, 201.14, 204.92, 197.63, 203.86, 203.04, 200.73, 192.85, 194.72, 203.19, 195.85, 179.3, 176.07, 176.74, 178.11, 174.85, 178.96, 179.41, 177.41, 192.58, 186.5], '6M': [185.17, 188.26, 193.85, 196.36, 201.28, 203.5, 195.19, 203.5, 198.46, 206.52, 207, 203.33, 194, 192.9, 203.48, 198.39, 180.91, 172.79, 176.74, 178.89, 174.49, 176.59, 172.55, 177.41, 192.58, 186.5], '1Y': [141.38, 144.52, 146.4, 151.5, 155.22, 157.57, 155.76, 155.71, 156.59, 159.84, 158.68, 157.65, 158.19, 160.51, 166.63, 162.18, 157.05, 179.44, 177.42, 175.1, 177.69, 173.77, 173.19, 171.31, 177.42, 178.29, 185.17, 188.26, 193.85, 196.36, 201.28, 203.5, 196.19, 203.5, 198.46, 206.52, 207, 203.33, 194, 192.9, 203.48, 198.39, 180.91, 172.79, 176.74, 178.89, 174.49, 176.59, 172.55, 177.41, 192.58, 186.5] },
      velocityScore: { '1D': 0.6, '1W': 1.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$251B', pe: 35, revenueGrowth: 9, eps: 5.33, grossMargin: 20, dividendYield: 1.49,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 8.34, BILT: false },
      tonyNote: 'RTX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 5.4, proScore: 5.4, coverage: 1,
      price: 272.23, weeklyPrices: [286.69, 283.61, 275.25, 259.66, 272.23], weeklyChange: -5.04, dayChange: 4.84, sortRank: 0, periodReturns: { '1M': 30.8, 'YTD': 225.2, '6M': 198.7, '1Y': 461.1 },
      priceHistory: { '1D': [259.66, 269.48, 272.23], '1W': [286.69, 283.61, 275.25, 259.66, 272.23], '1M': [208.06, 208.37, 226.34, 231.09, 264.51, 260.58, 251.68, 259.67, 227.81, 218, 211.69, 222.24, 232.36, 260.07, 265.1, 280.91, 286.69, 283.61, 275.25, 259.66, 272.23], 'YTD': [83.71, 97.3, 103.89, 96.85, 94.91, 73.87, 89.73, 97.92, 104.88, 95.65, 108.04, 121.52, 105.97, 101.95, 136.33, 165.34, 157.08, 138.23, 195.09, 207.27, 191.82, 226.34, 259.67, 211.69, 280.91, 272.23], '6M': [87.59, 92.83, 107.33, 99.29, 97.87, 89.95, 91.79, 97.52, 102.58, 86.8, 96.43, 116.33, 114.91, 103.76, 125, 166.77, 156.14, 141.19, 195.09, 179.11, 197.73, 208.37, 251.68, 211.69, 280.91, 272.23], '1Y': [48.52, 49.97, 46.43, 53.69, 52.16, 54.43, 65.31, 70.63, 67.47, 70.1, 64.91, 89.19, 94.12, 107.94, 125.87, 132.64, 123.04, 106.16, 124.18, 109.44, 94.36, 95.07, 94.69, 102.8, 94.28, 78.09, 87.59, 92.83, 107.33, 99.29, 97.87, 89.95, 92.88, 97.52, 102.58, 86.8, 96.43, 116.33, 114.91, 103.76, 125, 166.77, 156.14, 141.19, 195.09, 179.11, 197.73, 208.37, 251.68, 211.69, 280.91, 272.23] },
      velocityScore: { '1D': -1.3, '1W': 8.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$69B', pe: 104.7, revenueGrowth: 684, eps: 2.6, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 3.78, MEME: 6.88, RKNG: 5.53 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 3, avgWeight: 3.94, proScore: 3.94, coverage: 1,
      price: 51.08, weeklyPrices: [59.96, 56.87, 54.72, 50.30, 51.08], weeklyChange: -14.81, dayChange: 1.6, sortRank: 0, periodReturns: { '1M': -14.6, 'YTD': 35.2, '6M': 21.7, '1Y': 330.3 },
      priceHistory: { '1D': [50.27, 50.67, 51.08, 51.08], '1W': [59.96, 56.87, 54.72, 50.3, 51.08], '1M': [59.78, 67.84, 64.05, 63.54, 65.33, 66.6, 65.48, 61.86, 54.35, 59.19, 51.52, 56.71, 59.77, 60.85, 59.18, 58.11, 59.96, 56.87, 54.72, 50.3, 51.08], 'YTD': [37.77, 45.68, 51.89, 52.26, 59.84, 39.79, 40.03, 39.98, 44.24, 40.13, 41.37, 41.66, 37.45, 34.09, 37.06, 47.7, 52.02, 45.51, 60.98, 55.17, 52.71, 64.05, 61.86, 51.52, 58.11, 51.08], '6M': [40.3, 48.24, 50.33, 54.26, 59.99, 54.39, 42.93, 40.97, 45.45, 38.85, 38.12, 42.96, 41.12, 34.28, 36.83, 48.82, 48.39, 42.86, 60.98, 56.56, 47.74, 67.84, 65.48, 51.52, 58.11, 51.08], '1Y': [11.87, 15.66, 17.03, 18.05, 18.14, 16.11, 18.57, 17.73, 19.76, 22.35, 26.13, 32.85, 36.32, 46.29, 47.02, 63.85, 61.83, 55.86, 58.22, 66.96, 55.7, 45.83, 48.45, 46.45, 43.94, 35.8, 40.3, 48.24, 50.33, 54.26, 59.99, 54.39, 46.15, 40.97, 45.45, 38.85, 38.12, 42.96, 41.12, 34.28, 36.83, 48.82, 48.39, 42.86, 60.98, 56.56, 47.74, 67.84, 65.48, 51.52, 58.11, 51.08] },
      velocityScore: { '1D': -3.7, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: 66.3, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 2.97, MEME: 5.84, RKNG: 3 },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 3, avgWeight: 3.84, proScore: 3.84, coverage: 1,
      price: 42.8, weeklyPrices: [46.59, 45.20, 45.27, 41.98, 42.80], weeklyChange: -8.13, dayChange: 1.97, sortRank: 0, periodReturns: { '1M': -5.2, 'YTD': 74.6, '6M': 66.4, '1Y': 335.8 },
      priceHistory: { '1D': [41.98, 42.53, 42.83, 42.8], '1W': [46.59, 45.2, 45.27, 41.98, 42.8], '1M': [45.14, 48.98, 49.65, 47.28, 47.94, 47.86, 44.71, 44.15, 39.62, 40.94, 38.92, 41.47, 42.7, 46.47, 46.27, 45.57, 46.59, 45.2, 45.27, 41.98, 42.8], 'YTD': [24.52, 31.94, 35.22, 34.74, 38.07, 27.84, 36.17, 29.04, 28.65, 28.09, 27.48, 26.7, 25.72, 24.49, 25.57, 30.09, 36.35, 34.25, 44.24, 45.48, 39.52, 49.65, 44.15, 38.92, 45.57, 42.8], '6M': [24.05, 30.2, 38.21, 35.46, 41.35, 36.7, 37.47, 33.56, 30.66, 26.15, 27.4, 27.51, 26.79, 23.74, 27.79, 30.81, 32.43, 32.69, 44.24, 43.93, 36.62, 48.98, 44.71, 38.92, 45.57, 42.8], '1Y': [9.82, 10.56, 9.33, 10.91, 11.2, 13.14, 14.24, 14.8, 15.72, 16.7, 14.33, 17.18, 19.91, 22.59, 26.47, 29.29, 36.64, 33.38, 33.95, 31.08, 26.41, 23.09, 24.94, 31.14, 30.76, 23.9, 24.05, 30.2, 38.21, 35.46, 41.35, 36.7, 38.26, 33.56, 30.66, 26.15, 27.4, 27.51, 26.79, 23.74, 27.79, 30.81, 32.43, 32.69, 44.24, 43.93, 36.62, 48.98, 44.71, 38.92, 45.57, 42.8] },
      velocityScore: { '1D': -6.3, '1W': -3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.05, MEME: 5.81, RKNG: 3.65 },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 3, avgWeight: 3.35, proScore: 3.35, coverage: 1,
      price: 66.68, weeklyPrices: [80.66, 73.19, 72.87, 68.01, 66.68], weeklyChange: -17.33, dayChange: -1.95, sortRank: 0, periodReturns: { '1M': -44.3, 'YTD': -8.2, '6M': -14.6, '1Y': 33.4 },
      priceHistory: { '1D': [68.01, 65.68, 66.08, 66.68], '1W': [80.66, 73.19, 72.87, 68.01, 66.68], '1M': [119.7, 129.6, 133.09, 113.41, 105.65, 118.17, 107.73, 107.29, 93.6, 92.06, 87.32, 97.56, 82.41, 87.57, 82.25, 85.43, 80.66, 73.19, 72.87, 68.01, 66.68], 'YTD': [72.63, 90.56, 101.25, 116.37, 122.09, 93.27, 82.22, 80.2, 85.76, 93.86, 87.09, 94.09, 87.86, 83.99, 91.61, 90.94, 78.75, 73.9, 70.68, 74.81, 89.58, 133.09, 107.29, 87.32, 85.43, 66.68], '6M': [71.95, 90.92, 98.39, 112.44, 111.34, 115.76, 96.27, 83.03, 85.82, 92.68, 87.53, 95.7, 86.98, 82.87, 96.46, 86.91, 84.66, 69.85, 70.68, 72.96, 88.1, 129.6, 107.73, 87.32, 85.43, 66.68], '1Y': [49.97, 45.71, 43.97, 57.45, 60.06, 53.17, 47.71, 50.05, 45.08, 48.25, 41.86, 38.37, 41.44, 49.39, 66.16, 86.79, 89.5, 71.72, 76.68, 65.28, 64.49, 58.01, 55.52, 72.65, 84.75, 65.93, 71.95, 90.92, 98.39, 112.44, 111.34, 115.76, 102.12, 83.03, 85.82, 92.68, 87.53, 95.7, 86.98, 82.87, 96.46, 86.91, 84.66, 69.85, 70.68, 72.96, 88.1, 129.6, 107.73, 87.32, 85.43, 66.68] },
      velocityScore: { '1D': -9.2, '1W': -9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$26B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.22, MEME: 5.97, RKNG: 1.87 },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 6.95, proScore: 4.63, coverage: 0.667,
      price: 2277.11, weeklyPrices: [2184.75, 2273.73, 1963.60, 1914.46, 2277.11], weeklyChange: 4.23, dayChange: 18.51, sortRank: 0, periodReturns: { '1M': 43.3, 'YTD': 859.3, '6M': 810.6, '1Y': 4719.3 },
      priceHistory: { '1D': [1921.41, 2263.5, 2277.11], '1W': [2184.75, 2273.73, 1963.6, 1914.46, 2277.11], '1M': [1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2277.11], 'YTD': [237.38, 334.54, 409.24, 503.44, 539.3, 576.2, 630.29, 649.97, 651.9, 565.59, 618.82, 772.09, 603.17, 692.73, 851.57, 919.47, 932.43, 1096.51, 1409.98, 1447.23, 1392.56, 1641.64, 1759.68, 1643.23, 1958.8, 2277.11], '6M': [250.05, 274.08, 389.27, 453.12, 481.43, 695.51, 541.64, 590.59, 638.52, 565.41, 618.89, 720.17, 702.48, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1452.02, 1383.29, 1589.94, 1831.5, 1643.23, 1958.8, 2277.11], '1Y': [47.25, 46.21, 46.95, 41.52, 42.06, 42.92, 40.69, 47.01, 44.4, 48.44, 62.5, 84.3, 98.87, 94.29, 124.14, 129.68, 144.27, 167.05, 195.82, 207.69, 283.1, 245.96, 215.04, 213.31, 241.61, 219.46, 250.05, 274.08, 389.27, 453.12, 481.43, 695.51, 583.4, 590.59, 638.52, 565.41, 618.89, 720.17, 702.48, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1452.02, 1383.29, 1589.94, 1831.5, 1643.23, 1958.8, 2277.11] },
      velocityScore: { '1D': 2.9, '1W': 7.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$337B', pe: 77.7, revenueGrowth: 251, eps: 29.29, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.3, RKNG: 7.59 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 6.13, proScore: 4.08, coverage: 0.667,
      price: 345.98, weeklyPrices: [328.91, 345.85, 321.98, 326.19, 345.98], weeklyChange: 5.19, dayChange: 6.29, sortRank: 0, periodReturns: { '1M': 14.4, 'YTD': 298.2, '6M': 276.6, '1Y': 1501.8 },
      priceHistory: { '1D': [325.5, 344.05, 345.98], '1W': [328.91, 345.85, 321.98, 326.19, 345.98], '1M': [302.4, 293.8, 290.01, 285, 273.51, 302.85, 287.32, 291.37, 263.61, 253.57, 234.23, 248.88, 260.22, 274.5, 280.88, 284.99, 328.91, 345.85, 321.98, 326.19, 345.98], 'YTD': [86.89, 121.84, 139.17, 145.63, 156.51, 136.6, 139.03, 147.55, 168.57, 159.99, 157.17, 166.69, 133.52, 132.45, 160.13, 210.06, 237.57, 283.36, 285.47, 289.76, 282.31, 290.01, 291.37, 234.23, 284.99, 345.98], '6M': [90.18, 103.87, 136.87, 151.75, 152.31, 168.89, 148.7, 145.32, 166.2, 153.02, 154, 160.05, 145.88, 135.49, 146.78, 213.84, 229.75, 287.97, 285.47, 280.69, 261.34, 293.8, 287.32, 234.23, 284.99, 345.98], '1Y': [21.6, 22.56, 25.85, 24.31, 33.06, 37.39, 36.8, 44.08, 44.51, 50.85, 54.91, 67.29, 80.97, 68.69, 88, 86.65, 115.09, 101.42, 127.85, 136.86, 126.72, 108.93, 101.14, 118.09, 108.99, 80.21, 90.18, 103.87, 136.87, 151.75, 152.31, 168.89, 155.17, 145.32, 166.2, 153.02, 154, 160.05, 145.88, 135.49, 146.78, 213.84, 229.75, 287.97, 285.47, 280.69, 261.34, 293.8, 287.32, 234.23, 284.99, 345.98] },
      velocityScore: { '1D': 5.4, '1W': 21.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$98B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 7.36, RKNG: 4.89 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 2, avgWeight: 5.83, proScore: 3.88, coverage: 0.667,
      price: 148.66, weeklyPrices: [161.85, 171.23, 147.44, 146.97, 148.66], weeklyChange: -8.15, dayChange: 1.15, sortRank: 0, periodReturns: { '1M': -16.3, 'YTD': 326.5, '6M': 262.6, '1Y': 466.8 },
      priceHistory: { '1D': [146.97, 148.49, 148.99, 148.66], '1W': [161.85, 171.23, 147.44, 146.97, 148.66], '1M': [177.62, 179.83, 169.02, 158.41, 185.67, 202.37, 184.07, 202.89, 177, 196.64, 175.13, 172.78, 169.05, 191.55, 170.81, 167.34, 161.85, 171.23, 147.44, 146.97, 148.66], 'YTD': [34.86, 33.01, 37, 38.15, 39.57, 38.13, 43.99, 51.68, 53.69, 101.14, 106.19, 101.92, 97.42, 86.35, 133.3, 157.32, 137.73, 164.36, 178.54, 223.1, 165.26, 169.02, 202.89, 175.13, 167.34, 148.66], '6M': [37.17, 34.99, 33.72, 39.26, 37.39, 46.12, 48.49, 43.91, 56.27, 95.34, 120.49, 86.33, 113.9, 84.59, 132.7, 142.55, 149.42, 152.83, 178.54, 188.28, 171.33, 179.83, 184.07, 175.13, 167.34, 148.66], '1Y': [26.23, 26.69, 28.25, 29.42, 25.84, 22.87, 22.33, 23.02, 21.93, 24.05, 23.32, 26.85, 29.04, 26.34, 27.98, 32.37, 31.14, 31.4, 35.07, 29.1, 23.94, 20.87, 25.57, 26.24, 36.32, 29.25, 37.17, 34.99, 33.72, 39.26, 37.39, 46.12, 47.91, 43.91, 56.27, 95.34, 120.49, 86.33, 113.9, 84.59, 132.7, 142.55, 149.42, 152.83, 178.54, 188.28, 171.33, 179.83, 184.07, 175.13, 167.34, 148.66] },
      velocityScore: { '1D': 4.6, '1W': 0.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 7.79, RKNG: 3.86 },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 2, avgWeight: 5.63, proScore: 3.75, coverage: 0.667,
      price: 706.9, weeklyPrices: [746.23, 732.62, 670.75, 643.83, 706.90], weeklyChange: -5.27, dayChange: 9.7, sortRank: 0, periodReturns: { '1M': 34.7, 'YTD': 310.3, '6M': 293.7, '1Y': 1030.1 },
      priceHistory: { '1D': [644.38, 697.82, 706.9], '1W': [746.23, 732.62, 670.75, 643.83, 706.9], '1M': [524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 706.9], 'YTD': [172.27, 187.68, 222.1, 243.29, 278.41, 260.19, 284.1, 285.52, 282.25, 259.03, 261.18, 316.93, 273.35, 297.73, 337.88, 361.69, 403.12, 434.52, 483.15, 494.09, 459.62, 531.18, 575.5, 490.09, 712.13, 706.9], '6M': [181.54, 187.88, 212.14, 222.97, 252.66, 290.24, 262.56, 284.11, 270.57, 250.61, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 488.74, 455.8, 530.6, 594.11, 490.09, 712.13, 706.9], '1Y': [62.55, 65.78, 65.06, 67.02, 69.02, 78.69, 74.44, 76.07, 75.64, 80.67, 90.49, 96.15, 105.15, 107.21, 131.26, 119.7, 125.92, 125.72, 138.13, 163.6, 166.11, 153.97, 157.74, 161, 187.2, 175.01, 181.54, 187.88, 212.14, 222.97, 252.66, 290.24, 285.99, 284.11, 270.57, 250.61, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 488.74, 455.8, 530.6, 594.11, 490.09, 712.13, 706.9] },
      velocityScore: { '1D': -1.1, '1W': 110.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$244B', pe: 42.2, revenueGrowth: 46, eps: 16.74, grossMargin: 45, dividendYield: 0.09,
      etfPresence: { BUZZ: false, MEME: 5.39, RKNG: 5.87 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 2, avgWeight: 4.96, proScore: 3.3, coverage: 0.667,
      price: 1251.06, weeklyPrices: [1133.99, 1211.38, 1051.77, 1048.51, 1251.06], weeklyChange: 10.32, dayChange: 19.39, sortRank: 0, periodReturns: { '1M': 39.6, 'YTD': 338.3, '6M': 336.4, '1Y': 883.2 },
      priceHistory: { '1D': [1047.92, 1250.44, 1251.06], '1W': [1133.99, 1211.38, 1051.77, 1048.51, 1251.06], '1M': [895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1251.06], 'YTD': [285.41, 327.02, 336.63, 397.58, 435.79, 382.89, 413.97, 428.17, 415.56, 397.05, 405.35, 444.27, 355.46, 367.85, 421.51, 457.23, 481.72, 517.16, 666.59, 803.63, 731.99, 923.52, 996, 891.88, 1043.19, 1251.06], '6M': [284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 766.58, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1251.06], '1Y': [127.25, 121.74, 123.11, 113.26, 111.73, 109.14, 111.87, 124.27, 117.21, 117.75, 124.21, 150.57, 168.89, 156.83, 183.75, 192.33, 202.53, 206.71, 224.01, 238.33, 244.9, 225.92, 230.26, 226.65, 258.46, 248.55, 284.79, 312.15, 345.87, 365, 410.24, 419.44, 383.5, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 766.58, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1251.06] },
      velocityScore: { '1D': -3.5, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.4T', pe: 28.3, revenueGrowth: 196, eps: 44.25, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { BUZZ: 3.6, MEME: false, RKNG: 6.31 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'LITE', name: 'LITE', easyScore: 2, avgWeight: 4.67, proScore: 3.12, coverage: 0.667,
      price: 881.57, weeklyPrices: [850.00, 893.93, 827.92, 842.53, 881.57], weeklyChange: 3.71, dayChange: 4.58, sortRank: 0, periodReturns: { '1M': -3.2, 'YTD': 139.2, '6M': 122.7, '1Y': 860.6 },
      priceHistory: { '1D': [842.95, 883.16, 881.57], '1W': [850, 893.93, 827.92, 842.53, 881.57], '1M': [910.81, 902.31, 860.62, 854.96, 905, 1029.15, 938, 945.08, 863.66, 895.4, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93, 827.92, 842.53, 881.57], 'YTD': [368.59, 348.26, 343.27, 354.49, 381.44, 504.42, 583.46, 667.77, 677, 650.82, 616.09, 772.13, 688.8, 764.65, 894.13, 891.22, 846.89, 902.32, 944.28, 1030.37, 868.07, 860.62, 945.08, 853.26, 869.98, 881.57], '6M': [390.77, 357.05, 339.87, 356.83, 370.66, 435.1, 561.13, 600.42, 688.27, 694.43, 672, 649.56, 801.99, 702.76, 896.02, 824.01, 873.6, 858.32, 944.28, 992.37, 890.09, 902.31, 938, 853.26, 869.98, 881.57], '1Y': [91.77, 91.24, 92.62, 102.64, 102.85, 110.08, 111.13, 120.23, 115.89, 125.84, 141.91, 164.88, 171.5, 159.11, 169.75, 159.76, 163.23, 168.5, 200.13, 239.68, 253.81, 268.92, 308.28, 327.85, 372.09, 337.13, 390.77, 357.05, 339.87, 356.83, 370.66, 435.1, 577.15, 600.42, 688.27, 694.43, 672, 649.56, 801.99, 702.76, 896.02, 824.01, 873.6, 858.32, 944.28, 992.37, 890.09, 902.31, 938, 853.26, 869.98, 881.57] },
      velocityScore: { '1D': 6.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$69B', pe: 156.3, revenueGrowth: 90, eps: 5.64, grossMargin: 41, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.25, RKNG: 3.1 },
      tonyNote: 'LITE appears in 2 of 3 Meme ETFs (67% coverage) with average weight 4.7% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'CRDO', easyScore: 2, avgWeight: 4.67, proScore: 3.11, coverage: 0.667,
      price: 283.22, weeklyPrices: [271.83, 302.52, 272.01, 268.99, 283.22], weeklyChange: 4.19, dayChange: 5.21, sortRank: 0, periodReturns: { '1M': 27.8, 'YTD': 96.8, '6M': 88.6, '1Y': 207.2 },
      priceHistory: { '1D': [269.2, 282.57, 283.22], '1W': [271.83, 302.52, 272.01, 268.99, 283.22], '1M': [221.64, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 217.5, 206.89, 222.27, 237.68, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 283.22], 'YTD': [143.89, 141.59, 149.12, 135.1, 129.47, 98.06, 121.78, 124.06, 114.48, 114.74, 111.57, 107.09, 96.44, 95.92, 107.93, 158.93, 185.54, 174.01, 198.29, 189.36, 182.98, 222.35, 217.5, 237.68, 249.33, 283.22], '6M': [144.83, 140.24, 156.07, 153.22, 129.57, 111.31, 134.72, 124.8, 120.83, 97.3, 112.33, 104.06, 100.3, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 198.57, 168.99, 221.23, 214.6, 237.68, 249.33, 283.22], '1Y': [92.2, 89.37, 97.29, 98.45, 101.17, 111.55, 119.78, 121.13, 105.99, 122.73, 134, 159.32, 172.31, 144.94, 149.63, 151.15, 136.53, 150.97, 166.62, 162.74, 160.34, 141.88, 164.01, 180.92, 154.47, 138.57, 144.83, 140.24, 156.07, 153.22, 129.57, 111.31, 123.41, 124.8, 120.83, 97.3, 112.33, 104.06, 100.3, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 198.57, 168.99, 221.23, 214.6, 237.68, 249.33, 283.22] },
      velocityScore: { '1D': 8, '1W': 11.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$53B', pe: 113.3, revenueGrowth: 157, eps: 2.5, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.67, RKNG: 5.66 },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'RGTI', name: 'Rigetti Computing', easyScore: 2, avgWeight: 3.09, proScore: 2.06, coverage: 0.667,
      price: 20.32, weeklyPrices: [21.36, 21.38, 21.28, 19.53, 20.32], weeklyChange: -4.85, dayChange: 4.05, sortRank: 0, periodReturns: { '1M': -18.9, 'YTD': -8.2, '6M': -17.1, '1Y': 83.3 },
      priceHistory: { '1D': [19.54, 19.99, 20.19, 20.32], '1W': [21.36, 21.38, 21.28, 19.53, 20.32], '1M': [25.07, 24.62, 27.03, 25.54, 25.63, 26.88, 24.09, 24.16, 20.68, 21.76, 19.44, 20.63, 20.98, 22.7, 20.64, 20.25, 21.36, 21.38, 21.28, 19.53, 20.32], 'YTD': [22.15, 25.25, 24.7, 24.96, 19.85, 14.98, 14.99, 15.92, 18.64, 16.97, 16.07, 15.41, 14.41, 13.5, 14.31, 19.45, 16.86, 17.45, 20.09, 18.42, 16.88, 27.03, 24.16, 19.44, 20.25, 20.32], '6M': [22.38, 25.01, 25.53, 24.99, 22.31, 18.21, 16.97, 15.59, 16.48, 16.96, 16.99, 16.22, 15.6, 14.04, 14.53, 19.11, 18.38, 16.08, 20.09, 19.07, 15.96, 24.62, 24.09, 19.44, 20.25, 20.32], '1Y': [11.09, 13.08, 13.03, 17.14, 15.95, 14.5, 15.66, 17.24, 14.76, 15.39, 15.12, 16.69, 24.74, 32.1, 35.4, 47.11, 47.97, 39.6, 42.52, 34.36, 28.3, 25.46, 25.57, 30.06, 26.88, 22.82, 22.38, 25.01, 25.53, 24.99, 22.31, 18.21, 17.59, 15.59, 16.48, 16.96, 16.99, 16.22, 15.6, 14.04, 14.53, 19.11, 18.38, 16.08, 20.09, 19.07, 15.96, 24.62, 24.09, 19.44, 20.25, 20.32] },
      velocityScore: { '1D': -2.8, '1W': -4.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 199, eps: -0.89, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.3, RKNG: 2.89 },
      tonyNote: 'Rigetti Computing is a quantum hardware company using superconducting qubit technology. It holds a position in Meme ETFs alongside IonQ and D-Wave as part of the quantum computing basket. Revenue is minimal, the technology is earlier-stage than IonQ, and the ETF allocation is speculative. The weight score is low; this is a high-risk, long-duration positioning.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab', easyScore: 2, avgWeight: 2.54, proScore: 1.69, coverage: 0.667,
      price: 82.61, weeklyPrices: [107.24, 100.29, 95.12, 85.41, 82.61], weeklyChange: -22.97, dayChange: -3.28, sortRank: 0, periodReturns: { '1M': -42.3, 'YTD': 18.4, '6M': 7, '1Y': 155.4 },
      priceHistory: { '1D': [85.41, 81.82, 82.3, 82.61], '1W': [107.24, 100.29, 95.12, 85.41, 82.61], '1M': [143.2, 150.23, 148.03, 143.48, 122.39, 123.32, 114.7, 119.95, 110.08, 113.65, 105.05, 114.78, 102.39, 109.25, 104.63, 107.98, 107.24, 100.29, 95.12, 85.41, 82.61], 'YTD': [69.76, 83.08, 90.76, 87.98, 85.68, 66.32, 66.01, 70.86, 72.65, 70, 68.37, 71.93, 65.94, 65.52, 66.74, 82.93, 84.6, 82.51, 84.65, 124.15, 134.28, 148.03, 119.95, 105.05, 107.98, 82.61], '6M': [70.65, 78.14, 87.9, 89.16, 87, 81.27, 72.03, 69.89, 69.97, 70.13, 68.93, 78.59, 66.07, 64.22, 69.08, 73.6, 90.04, 77.02, 84.65, 117.56, 127.31, 150.23, 114.7, 105.05, 107.98, 82.61], '1Y': [32.35, 35.68, 39.1, 51.33, 48.13, 45.92, 44.21, 43, 40.69, 46.25, 42.99, 48.43, 47.18, 46.63, 52.47, 66.42, 67, 63.57, 60.92, 49.61, 49.97, 43.62, 41.93, 49.37, 63.53, 59.92, 70.65, 78.14, 87.9, 89.16, 87, 81.27, 75.84, 69.89, 69.97, 70.13, 68.93, 78.59, 66.07, 64.22, 69.08, 73.6, 90.04, 77.02, 84.65, 117.56, 127.31, 150.23, 114.7, 105.05, 107.98, 82.61] },
      velocityScore: { '1D': null, '1W': -7.1, '1M': null, '6M': null }, isNew: true,
      marketCap: '$52B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 1.84, MEME: false, RKNG: 3.23 },
      tonyNote: 'Rocket Lab is the small-launch and space systems name that Electrification and AI infrastructure ETFs hold for satellite connectivity exposure — relevant to both GPS-dependent grids and low-orbit broadband that supports remote AI compute. Small market cap, no earnings, but consistent revenue growth and a rapidly expanding backlog.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 1, avgWeight: 6.18, proScore: 2.06, coverage: 0.333,
      price: 54.92, weeklyPrices: [56.55, 58.32, 57.85, 53.60, 54.92], weeklyChange: -2.89, dayChange: 2.42, sortRank: 0, periodReturns: { '1M': -13.7, 'YTD': 22.4, '6M': 10.2, '1Y': 44.1 },
      priceHistory: { '1D': [53.62, 54.35, 54.56, 54.92], '1W': [56.55, 58.32, 57.85, 53.6, 54.92], '1M': [63.62, 65.4, 70.14, 72.07, 69.28, 71.4, 68.23, 65.66, 56.78, 62.8, 56.63, 57.99, 57.85, 61.18, 56.06, 54.69, 56.55, 58.32, 57.85, 53.6, 54.92], 'YTD': [44.87, 50.45, 47.56, 49.33, 43.24, 30.43, 31.3, 31.9, 40.88, 36.02, 33.03, 31.9, 29.84, 27.79, 28.08, 44.68, 43.63, 45.12, 52.57, 55.26, 52.47, 70.14, 65.66, 56.63, 54.69, 54.92], '6M': [46, 48.71, 50.95, 50.66, 45.49, 38.47, 35.19, 33.18, 31.62, 37.05, 35.12, 33.31, 32.7, 28.83, 28.99, 43.25, 47.36, 42.11, 52.57, 55.87, 48.44, 65.4, 68.23, 56.63, 54.69, 54.92], '1Y': [38.11, 44.75, 45.93, 44.84, 43.9, 39.87, 40.49, 41.21, 36.79, 41.42, 42.11, 47.05, 66.81, 69.43, 69.6, 77.5, 65.59, 59.37, 60.17, 57.43, 50.71, 47.88, 46.9, 54.76, 52.55, 46.44, 46, 48.71, 50.95, 50.66, 45.49, 38.47, 35.48, 33.18, 31.62, 37.05, 35.12, 33.31, 32.7, 28.83, 28.99, 43.25, 47.36, 42.11, 52.57, 55.87, 48.44, 65.4, 68.23, 56.63, 54.69, 54.92] },
      velocityScore: { '1D': -24.3, '1W': -9.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$20B', pe: 140.8, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.18, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'RDW', name: 'Redwire', easyScore: 1, avgWeight: 6, proScore: 2, coverage: 0.333,
      price: 10.92, weeklyPrices: [14.35, 13.02, 12.22, 11.38, 10.92], weeklyChange: -23.9, dayChange: -4.25, sortRank: 0, periodReturns: { '1M': -50.5, 'YTD': 43.7, '6M': 39.6, '1Y': -31.8 },
      priceHistory: { '1D': [11.4, 10.77, 10.85, 10.92], '1W': [14.35, 13.02, 12.22, 11.38, 10.92], '1M': [22.04, 24, 25.9, 24.57, 20.68, 20.58, 18.62, 21.43, 18.45, 18.57, 14.87, 17.09, 15.12, 14.83, 13.5, 14.36, 14.35, 13.02, 12.22, 11.38, 10.92], 'YTD': [7.6, 10.28, 10.86, 11.98, 12.81, 8.8, 7.89, 7.99, 9.55, 9.07, 9.48, 9.63, 8.87, 9.08, 9.22, 11.22, 10.04, 9.19, 9.64, 11.46, 14.77, 25.9, 21.43, 14.87, 14.36, 10.92], '6M': [7.15, 10.26, 10.66, 10.66, 14.2, 11.26, 9.38, 8, 8.42, 8.95, 9.23, 10.13, 9.05, 8.5, 9.61, 9.91, 11.93, 8.6, 9.64, 11.56, 13.91, 24, 18.62, 14.87, 14.36, 10.92], '1Y': [16.02, 15.6, 15.65, 19.09, 16.02, 14.29, 9.47, 9.66, 8.7, 8.99, 8.21, 8.45, 8.01, 8.96, 10.36, 9.65, 8.55, 7.74, 7.64, 5.98, 5.97, 5.48, 5.37, 6.14, 7.67, 7.02, 7.15, 10.26, 10.66, 10.66, 14.2, 11.26, 10.09, 8, 8.42, 8.95, 9.23, 10.13, 9.05, 8.5, 9.61, 9.91, 11.93, 8.6, 9.64, 11.56, 13.91, 24, 18.62, 14.87, 14.36, 10.92] },
      velocityScore: { '1D': -2.4, '1W': 7.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2B', pe: null, revenueGrowth: 58, eps: -2.59, grossMargin: 13, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6, RKNG: false },
      tonyNote: 'Redwire Corp is a space infrastructure company — solar arrays, structures, and manufacturing in orbit. It appears in Meme and speculative ETFs as a high-risk space economy play. Revenue is growing from a small base but the business is pre-profitability; the ETF weight is minimal and reflects thematic positioning rather than fundamental conviction.',
    },
    {
      ticker: 'QBTS', name: 'D-Wave Quantum', easyScore: 1, avgWeight: 5.89, proScore: 1.96, coverage: 0.333,
      price: 23.64, weeklyPrices: [24.69, 24.47, 25.03, 22.98, 23.64], weeklyChange: -4.25, dayChange: 2.9, sortRank: 0, periodReturns: { '1M': -15, 'YTD': -9.6, '6M': -14.1, '1Y': 66.7 },
      priceHistory: { '1D': [22.98, 23.41, 23.55, 23.64], '1W': [24.69, 24.47, 25.03, 22.98, 23.64], '1M': [27.82, 27.48, 29.49, 30.14, 29.18, 29.91, 27.55, 27.64, 23.85, 25.83, 23.25, 23.82, 23.37, 26.26, 23.94, 22.92, 24.69, 24.47, 25.03, 22.98, 23.64], 'YTD': [26.15, 29.28, 28.72, 27.43, 23.22, 17.21, 18.82, 18.06, 20.14, 18.83, 17.83, 16.1, 14.65, 13.7, 13.87, 21.52, 19.31, 20.28, 23.83, 21.44, 19.3, 29.49, 27.64, 23.25, 22.92, 23.64], '6M': [25.29, 30.64, 28.8, 27.04, 24.69, 21.4, 20.44, 18.44, 18.66, 18.24, 18.76, 17.47, 15.93, 14.43, 14.57, 20.81, 21.24, 18.27, 23.83, 22.35, 18.19, 27.48, 27.55, 23.25, 22.92, 23.64], '1Y': [14.18, 15.98, 16.01, 19.24, 19.76, 17.19, 17.17, 18.65, 15.06, 15.23, 15.29, 16.52, 24.02, 26.34, 29.21, 35.07, 40.46, 31.06, 36.11, 28.39, 26.4, 23.44, 22.41, 28.73, 27.98, 24.89, 25.29, 30.64, 28.8, 27.04, 24.69, 21.4, 21.21, 18.44, 18.66, 18.24, 18.76, 17.47, 15.93, 14.43, 14.57, 20.81, 21.24, 18.27, 23.83, 22.35, 18.19, 27.48, 27.55, 23.25, 22.92, 23.64] },
      velocityScore: { '1D': -3.9, '1W': 12, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: -81, eps: -1.14, grossMargin: 66, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.89, RKNG: false },
      tonyNote: 'D-Wave Quantum is a quantum computing company — the only publicly traded business built around quantum annealing hardware. Revenue is minimal and profitability is many years away, but it holds a position in Meme ETFs as the purest-play quantum computing stock available to retail investors. The ETF weight is small and the position is purely thematic.',
    },
    {
      ticker: 'NVTS', name: 'Navitas Semiconductor', easyScore: 1, avgWeight: 5.14, proScore: 1.71, coverage: 0.333,
      price: 18.8, weeklyPrices: [24.02, 23.70, 21.40, 18.32, 18.80], weeklyChange: -21.75, dayChange: 2.56, sortRank: 0, periodReturns: { '1M': -40.9, 'YTD': 163.2, '6M': 145.4, '1Y': 167.7 },
      priceHistory: { '1D': [18.32, 18.5, 18.83, 18.8], '1W': [24.02, 23.7, 21.4, 18.32, 18.8], '1M': [31.79, 28.88, 28.51, 26.6, 24.86, 25.86, 30.84, 30.67, 25.08, 24.48, 20.5, 22.21, 23.39, 23.73, 22.09, 22.34, 24.02, 23.7, 21.4, 18.32, 18.8], 'YTD': [7.14, 10.06, 10, 11.29, 9.46, 7.43, 8.37, 7.88, 9.51, 8.96, 9.98, 9.17, 9.02, 8.54, 9.42, 12.37, 18.51, 16.5, 16.68, 21.17, 22.99, 28.51, 30.67, 20.5, 22.34, 18.8], '6M': [7.4, 9.05, 10.43, 9.86, 9.56, 9.05, 8.79, 8.22, 8.26, 8.9, 8.68, 9.82, 9.28, 8.77, 9.55, 10.26, 18.47, 15.48, 16.68, 19.25, 19.43, 28.88, 30.84, 20.5, 22.34, 18.8], '1Y': [7.02, 6.32, 6.26, 6.27, 8.98, 7.33, 6.79, 7.36, 6.25, 6.07, 5.54, 6.08, 6.73, 6.51, 8.19, 8, 15.63, 13.61, 12.56, 8.84, 8.64, 7.72, 8.34, 9.45, 9.18, 7.37, 7.4, 9.05, 10.43, 9.86, 9.56, 9.05, 9.22, 8.22, 8.26, 8.9, 8.68, 9.82, 9.28, 8.77, 9.55, 10.26, 18.47, 15.48, 16.68, 19.25, 19.43, 28.88, 30.84, 20.5, 22.34, 18.8] },
      velocityScore: { '1D': -2.3, '1W': -42.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 5.14 },
      tonyNote: 'Navitas Semiconductor is a small-cap wide-bandgap power semiconductor name — gallium nitride and silicon carbide for fast charging and EV applications. The $26.60 share price and small market cap position it as a speculative holding in ETFs willing to take higher-risk bets on next-generation power conversion.',
    },
    {
      ticker: 'WULF', name: 'WULF', easyScore: 1, avgWeight: 4.23, proScore: 1.41, coverage: 0.333,
      price: 27.39, weeklyPrices: [28.98, 28.31, 28.78, 26.97, 27.39], weeklyChange: -5.47, dayChange: 1.58, sortRank: 0, periodReturns: { '1M': 8.8, 'YTD': 138.4, '6M': 122.5, '1Y': 620.9 },
      priceHistory: { '1D': [26.97, 27.39, 27.55, 27.39], '1W': [28.98, 28.31, 28.78, 26.97, 27.39], '1M': [25.18, 26.74, 26.4, 25.56, 25.66, 26.49, 26.16, 26.19, 24, 25.86, 23.19, 25.35, 26.06, 28.17, 28.01, 27.86, 28.98, 28.31, 28.78, 26.97, 27.39], 'YTD': [11.49, 12.84, 13.83, 12.89, 14.54, 11.92, 15.91, 15.01, 17.88, 15.23, 14.67, 15.74, 15.35, 14.48, 19.03, 19.31, 20.37, 21.73, 25.74, 23.12, 21.63, 26.4, 26.19, 23.19, 27.86, 27.39], '6M': [11.75, 13.62, 13.81, 13.33, 15.31, 14.8, 16.63, 16.18, 17.56, 14.74, 14.35, 16.04, 16.22, 14.43, 18.05, 19.67, 20.55, 20.02, 25.74, 22.8, 21.34, 26.74, 26.16, 23.19, 27.86, 27.39], '1Y': [3.8, 5.04, 5.13, 5.36, 5.32, 5.16, 4.94, 5.46, 9.28, 9.13, 8.87, 10.64, 11.17, 10.97, 11.58, 13.59, 13.86, 12.88, 14.82, 14.28, 12.64, 12.23, 14.84, 15.1, 15.83, 11.79, 11.75, 13.62, 13.81, 13.33, 15.31, 14.8, 16.65, 16.18, 17.56, 14.74, 14.35, 16.04, 16.22, 14.43, 18.05, 19.67, 20.55, 20.02, 25.74, 22.8, 21.34, 26.74, 26.16, 23.19, 27.86, 27.39] },
      velocityScore: { '1D': -2.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$14B', pe: null, revenueGrowth: -1, eps: -2.51, grossMargin: 64, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.23 },
      tonyNote: 'WULF appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LRCX', name: 'LRCX', easyScore: 1, avgWeight: 4.21, proScore: 1.4, coverage: 0.333,
      price: 392.85, weeklyPrices: [389.04, 409.54, 371.33, 374.80, 392.85], weeklyChange: 0.98, dayChange: 4.81, sortRank: 0, periodReturns: { '1M': 21.7, 'YTD': 129.5, '6M': 121.5, '1Y': 309.1 },
      priceHistory: { '1D': [374.82, 392.77, 392.85], '1W': [389.04, 409.54, 371.33, 374.8, 392.85], '1M': [322.68, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 321.8, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04, 409.54, 371.33, 374.8, 392.85], 'YTD': [171.18, 200.96, 217.47, 220.7, 248.17, 213.31, 231.29, 244.92, 239.07, 214.68, 209.49, 233.99, 211.62, 222.01, 258.76, 260.96, 258.56, 257.86, 297.17, 295.44, 292.09, 318, 336.41, 321.8, 374.18, 392.85], '6M': [178.07, 194.76, 220.4, 222.41, 238.46, 230.1, 226.61, 235.58, 244.25, 217.27, 215.23, 226.47, 238.84, 213.66, 246.49, 265.16, 265.55, 248.75, 297.17, 289.24, 273.38, 318.93, 343.71, 321.8, 374.18, 392.85], '1Y': [96.02, 98.83, 101.06, 100.79, 97.78, 94.84, 99.15, 106.74, 99.15, 103.67, 100.42, 115.58, 126.32, 128.13, 146.99, 141, 142.37, 147.54, 161.01, 162.19, 161.42, 148.8, 155.14, 157.09, 168.71, 164.7, 178.07, 194.76, 220.4, 222.41, 238.46, 230.1, 229.28, 235.58, 244.25, 217.27, 215.23, 226.47, 238.84, 213.66, 246.49, 265.16, 265.55, 248.75, 297.17, 289.24, 273.38, 318.93, 343.71, 321.8, 374.18, 392.85] },
      velocityScore: { '1D': 4.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$491B', pe: 74.4, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.28,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.21 },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'AXTI', name: 'AXT Inc', easyScore: 1, avgWeight: 4.08, proScore: 1.36, coverage: 0.333,
      price: 70.96, weeklyPrices: [84.57, 92.44, 77.91, 70.14, 70.96], weeklyChange: -16.1, dayChange: 1.17, sortRank: 0, periodReturns: { '1M': -46.5, 'YTD': 334, '6M': 372.7, '1Y': 3231.3 },
      priceHistory: { '1D': [70.14, 69.23, 70.5, 70.96], '1W': [84.57, 92.44, 77.91, 70.14, 70.96], '1M': [132.6, 122.77, 115.7, 103.16, 109.55, 110.85, 106.7, 105.99, 89.04, 90.78, 85.29, 88.34, 97.18, 110.74, 93.04, 92.11, 84.57, 92.44, 77.91, 70.14, 70.96], 'YTD': [16.35, 25.83, 25.72, 17.92, 16.38, 20.43, 24.79, 29.68, 37.12, 38.8, 46.73, 58.09, 58.51, 47.14, 63.12, 81.78, 75.27, 79.22, 104.83, 121.94, 104.61, 115.7, 105.99, 85.29, 92.11, 70.96], '6M': [15.37, 16.67, 22.24, 21.41, 17.2, 19.74, 24.35, 23.21, 35.08, 41.76, 44.3, 44.36, 68.44, 56.98, 53.18, 62.93, 86.94, 71.07, 104.83, 122.9, 112.88, 122.77, 106.7, 85.29, 92.11, 70.96], '1Y': [2.13, 2.08, 2.26, 2.5, 2.37, 2.08, 2.06, 2.18, 2.51, 2.87, 2.96, 3.39, 3.96, 4.75, 4.7, 5.23, 4.93, 5.18, 7.32, 8.87, 10.98, 10.11, 10.45, 12.1, 16.38, 14.01, 15.37, 16.67, 22.24, 21.41, 17.2, 19.74, 27.77, 23.21, 35.08, 41.76, 44.3, 44.36, 68.44, 56.98, 53.18, 62.93, 86.94, 71.07, 104.83, 122.9, 112.88, 122.77, 106.7, 85.29, 92.11, 70.96] },
      velocityScore: { '1D': -5.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5B', pe: null, revenueGrowth: 39, eps: -0.32, grossMargin: 21, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.08, RKNG: false },
      tonyNote: 'AXT Inc is a compound semiconductor substrate manufacturer — gallium arsenide, indium phosphide, and germanium wafers used in data center optical transceivers, 5G RF chips, and solar cells. Revenue is growing with optical networking demand. Small market cap but positioned at a genuine supply-chain chokepoint for III-V semiconductor materials.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
