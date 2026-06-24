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
export const SPY_RET: Record<Period, number> = { '1W': -1, '1M': -1.7, 'YTD': 7.5, '6M': 6.2, '1Y': 20.8 };
// @@END_GENERATED:SPY_RET@@

// Top holdings per ETF (ticker + portfolio weight %), shown on ETF row hover.
export type EtfHolding = { t: string; w: number };

// @@GENERATED:ETF_TOP_HOLDINGS@@
export const ETF_TOP_HOLDINGS: Record<string, EtfHolding[]> = {
  AIS: [{ t: 'MU', w: 8.4 }, { t: 'MRVL', w: 4.5 }, { t: 'AMD', w: 4.4 }, { t: 'SIMO', w: 3.7 }, { t: 'VRT', w: 3.6 }],
  ARTY: [{ t: 'MU', w: 5.0 }, { t: 'AMD', w: 4.8 }, { t: 'CRWV', w: 4.6 }, { t: 'NVDA', w: 4.4 }, { t: 'AVGO', w: 4.3 }],
  BAI: [{ t: 'MU', w: 6.3 }, { t: 'AMD', w: 4.8 }, { t: 'LRCX', w: 4.6 }, { t: 'TSM', w: 4.3 }, { t: 'AVGO', w: 4.1 }],
  IGPT: [{ t: 'AMD', w: 8.1 }, { t: 'MU', w: 8.1 }, { t: 'META', w: 7.5 }, { t: 'NVDA', w: 7.5 }, { t: 'GOOGL', w: 7.4 }],
  IVES: [{ t: 'MU', w: 5.1 }, { t: 'AAPL', w: 5.0 }, { t: 'TSM', w: 5.0 }, { t: 'NVDA', w: 4.9 }, { t: 'AVGO', w: 4.8 }],
  ALAI: [{ t: 'NVDA', w: 12.6 }, { t: 'TSM', w: 5.6 }, { t: 'AMZN', w: 5.5 }, { t: 'MSFT', w: 4.9 }, { t: 'GOOG', w: 4.8 }],
  CHAT: [{ t: 'NVDA', w: 6.4 }, { t: 'GOOGL', w: 5.0 }, { t: 'AVGO', w: 4.0 }, { t: 'AMD', w: 4.0 }, { t: 'MU', w: 4.0 }],
  AIFD: [{ t: 'MU', w: 7.6 }, { t: 'MRVL', w: 6.5 }, { t: 'NVDA', w: 6.3 }, { t: 'LITE', w: 5.9 }, { t: 'DOCN', w: 5.5 }],
  SPRX: [{ t: 'ARM', w: 9.0 }, { t: 'ALAB', w: 8.5 }, { t: 'COHR', w: 8.3 }, { t: 'KLAC', w: 7.6 }, { t: 'MKSI', w: 6.2 }],
  AOTG: [{ t: 'AMD', w: 16.1 }, { t: 'MU', w: 11.2 }, { t: 'NVDA', w: 10.5 }, { t: 'TSM', w: 7.5 }, { t: 'TOST', w: 4.4 }],
  SOXX: [{ t: 'MU', w: 8.3 }, { t: 'AMD', w: 7.7 }, { t: 'NVDA', w: 7.2 }, { t: 'AVGO', w: 6.5 }, { t: 'INTC', w: 6.4 }],
  PSI: [{ t: 'AMAT', w: 6.1 }, { t: 'KLAC', w: 5.8 }, { t: 'MU', w: 5.6 }, { t: 'LRCX', w: 5.5 }, { t: 'INTC', w: 5.1 }],
  XSD: [{ t: 'ALGM', w: 2.7 }, { t: 'MXL', w: 2.7 }, { t: 'INTC', w: 2.7 }, { t: 'ALAB', w: 2.6 }, { t: 'TE', w: 2.6 }],
  DRAM: [{ t: 'SNDK', w: 5.4 }, { t: 'MU', w: 4.9 }, { t: 'STX', w: 4.5 }, { t: 'WDC', w: 4.3 }],
  PTF: [{ t: 'SNDK', w: 8.7 }, { t: 'WDC', w: 5.8 }, { t: 'STX', w: 5.4 }, { t: 'MU', w: 5.1 }, { t: 'AAPL', w: 4.2 }],
  WCLD: [{ t: 'DOCN', w: 3.9 }, { t: 'FROG', w: 3.2 }, { t: 'PANW', w: 2.8 }, { t: 'CRWD', w: 2.5 }, { t: 'TWLO', w: 2.4 }],
  IGV: [{ t: 'PANW', w: 9.2 }, { t: 'MSFT', w: 8.4 }, { t: 'PLTR', w: 8.0 }, { t: 'ORCL', w: 7.3 }, { t: 'CRWD', w: 6.7 }],
  FDTX: [{ t: 'MU', w: 9.4 }, { t: 'MRVL', w: 8.1 }, { t: 'TSM', w: 6.0 }, { t: 'NVDA', w: 4.6 }, { t: 'STX', w: 4.0 }],
  GTEK: [{ t: 'MRVL', w: 4.7 }, { t: 'DELL', w: 2.9 }, { t: 'CDNS', w: 2.4 }, { t: 'APH', w: 2.3 }, { t: 'TER', w: 2.1 }],
  ARKK: [{ t: 'TSLA', w: 9.7 }, { t: 'CRSP', w: 5.1 }, { t: 'TEM', w: 4.9 }, { t: 'HOOD', w: 4.8 }, { t: 'AMD', w: 4.7 }],
  MARS: [{ t: 'SPCX', w: 22.3 }, { t: 'RKLB', w: 10.2 }, { t: 'ASTS', w: 7.0 }, { t: 'PL', w: 4.7 }, { t: 'GSAT', w: 4.6 }],
  FRWD: [{ t: 'STX', w: 8.6 }, { t: 'NVDA', w: 8.2 }, { t: 'AMD', w: 7.1 }, { t: 'TSM', w: 5.9 }, { t: 'WDC', w: 5.9 }],
  BCTK: [{ t: 'TSM', w: 8.9 }, { t: 'LRCX', w: 8.5 }, { t: 'SPCX', w: 8.0 }, { t: 'AVGO', w: 6.8 }, { t: 'NVDA', w: 6.0 }],
  FWD: [{ t: 'AMD', w: 2.1 }, { t: 'AMAT', w: 2.0 }, { t: 'LRCX', w: 2.0 }, { t: 'SPCX', w: 2.0 }, { t: 'GOOGL', w: 1.9 }],
  CBSE: [{ t: 'BFLY', w: 3.9 }, { t: 'LRCX', w: 3.0 }, { t: 'TXG', w: 3.0 }, { t: 'KLAC', w: 2.9 }, { t: 'KRYS', w: 2.9 }],
  FCUS: [{ t: 'WDC', w: 5.5 }, { t: 'SNDK', w: 5.3 }, { t: 'INTC', w: 5.2 }, { t: 'BE', w: 5.0 }, { t: 'STX', w: 4.9 }],
  WGMI: [{ t: 'CIFR', w: 18.0 }, { t: 'IREN', w: 12.0 }, { t: 'WULF', w: 9.7 }, { t: 'CORZ', w: 7.3 }, { t: 'KEEL', w: 7.3 }],
  CNEQ: [{ t: 'NVDA', w: 13.4 }, { t: 'MSFT', w: 6.4 }, { t: 'AMZN', w: 5.8 }, { t: 'TSM', w: 5.7 }, { t: 'GOOG', w: 5.7 }],
  SGRT: [{ t: 'WDC', w: 10.2 }, { t: 'MU', w: 8.1 }, { t: 'LITE', w: 7.8 }, { t: 'NVDA', w: 6.4 }, { t: 'ARW', w: 4.8 }],
  SPMO: [{ t: 'MU', w: 11.8 }, { t: 'NVDA', w: 7.9 }, { t: 'AVGO', w: 6.6 }, { t: 'GOOGL', w: 4.4 }, { t: 'LRCX', w: 4.1 }],
  XMMO: [{ t: 'CW', w: 3.9 }, { t: 'FLEX', w: 3.9 }, { t: 'STRL', w: 3.4 }, { t: 'TTMI', w: 3.3 }, { t: 'ATI', w: 3.2 }],
  POW: [{ t: 'POWL', w: 6.5 }, { t: 'VICR', w: 5.7 }, { t: 'PWR', w: 4.6 }, { t: 'ETN', w: 4.1 }, { t: 'NVT', w: 4.0 }],
  VOLT: [{ t: 'BELFB', w: 7.5 }, { t: 'POWL', w: 7.3 }, { t: 'PWR', w: 5.3 }, { t: 'ETN', w: 5.2 }, { t: 'NEE', w: 4.9 }],
  PBD: [{ t: 'ALFEN', w: 1.1 }, { t: 'SHLS', w: 1.1 }],
  PBW: [{ t: 'FCEL', w: 3.9 }, { t: 'HYLN', w: 3.9 }, { t: 'NVTS', w: 2.8 }, { t: 'BE', w: 2.7 }, { t: 'ASPN', w: 2.2 }],
  IVEP: [{ t: 'BE', w: 5.8 }, { t: 'PWR', w: 4.2 }, { t: 'VRT', w: 4.1 }, { t: 'GEV', w: 4.0 }, { t: 'SBGSY', w: 4.0 }],
  AIRR: [{ t: 'STRL', w: 6.5 }, { t: 'AGX', w: 4.5 }, { t: 'FIX', w: 4.4 }, { t: 'MTZ', w: 4.0 }, { t: 'CHRW', w: 4.0 }],
  PRN: [{ t: 'TTMI', w: 6.5 }, { t: 'FIX', w: 4.7 }, { t: 'AGX', w: 4.7 }, { t: 'STRL', w: 4.5 }, { t: 'VICR', w: 4.3 }],
  RSHO: [{ t: 'TKR', w: 8.7 }, { t: 'POWL', w: 7.3 }, { t: 'CGNX', w: 7.2 }, { t: 'CAT', w: 6.9 }, { t: 'AIT', w: 6.0 }],
  IDEF: [{ t: 'RTX', w: 8.3 }, { t: 'LMT', w: 6.8 }, { t: 'GD', w: 5.9 }, { t: 'BA', w: 5.0 }, { t: 'NOC', w: 4.9 }],
  BILT: [{ t: 'UNP', w: 5.6 }, { t: 'AEP', w: 4.5 }, { t: 'AENA', w: 4.4 }, { t: 'XEL', w: 4.1 }, { t: 'LNG', w: 3.6 }],
  BUZZ: [{ t: 'MU', w: 4.3 }, { t: 'NBIS', w: 3.8 }, { t: 'AMD', w: 3.5 }, { t: 'INTC', w: 3.4 }, { t: 'SOFI', w: 3.3 }],
  MEME: [{ t: 'AAOI', w: 7.5 }, { t: 'NBIS', w: 7.0 }, { t: 'BE', w: 6.9 }, { t: 'IONQ', w: 6.4 }, { t: 'SNDK', w: 6.2 }],
  RKNG: [{ t: 'SNDK', w: 7.3 }, { t: 'WDC', w: 6.0 }, { t: 'MU', w: 5.9 }, { t: 'NBIS', w: 5.6 }, { t: 'NVTS', w: 5.2 }],
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
  'AI & ML':         { '1W': -2, '1M': 4.3, 'YTD': 47, '6M': 44.4, '1Y': 82.8 },
  'Semiconductors':  { '1W': 0.1, '1M': 12.9, 'YTD': 112.3, '6M': 109, '1Y': 155.4 },
  'Broad Tech':      { '1W': -2.5, '1M': 0.4, 'YTD': 27.7, '6M': 24.2, '1Y': 50.4 },
  'Electrification': { '1W': -1.9, '1M': -4.6, 'YTD': 29.3, '6M': 26.7, '1Y': 54.6 },
  'Industrials':     { '1W': 0, '1M': 2, 'YTD': 25.3, '6M': 22.3, '1Y': 43.4 },
  'Meme':            { '1W': -4.7, '1M': -7.2, 'YTD': 22.5, '6M': 17.4, '1Y': 8 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, IndexChartByPeriod> = {
  'AI & ML': {
    '1D': { top10: [100, 99.06, 99.41, 98.88, 99.84, 100.1, 100.05, 99.87, 99.74, 99.87, 99.86, 99.42, 99.23, 98.64, 98.13, 98.15, 98.01, 98.55, 98.37, 97.83, 97.5, 98.07, 98.36, 99.08], spy: [100, 100.3, 100.26, 100.18, 100.36, 100.66, 100.67, 100.83, 100.67, 100.62, 100.64, 100.4, 100.3, 100.16, 99.81, 99.85, 99.87, 100.03, 100.01, 99.8, 99.74, 99.78, 99.79, 99.95], top10Return: -0.9, spyReturn: -0.05, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 104.28, 105.09, 98.91, 98.03], spy: [100, 100.78, 100.46, 99, 98.96], top10Return: -2, spyReturn: -1, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.83, 101.64, 102.58, 105.61, 107.54, 106.51, 104.88, 95.95, 98.95, 96.99, 93.94, 98.99, 99.67, 104.88, 101.79, 102.3, 106.7, 107.53, 101.19, 100.3], spy: [100, 99.98, 100.53, 100.78, 101.06, 101.2, 100.49, 100.87, 98.26, 98.49, 98.2, 96.65, 98.29, 98.82, 100.56, 99.97, 98.72, 99.49, 99.17, 97.73, 97.69], top10Return: 4.3, spyReturn: -1.7, xLabels: ["May 27", "Jun 3", "Jun 10", "Jun 17", "Jun 24"] },
    'YTD': { top10: [100, 102.26, 104.35, 105.17, 107.24, 97.14, 101.92, 103.31, 104.49, 101.25, 100.28, 102.71, 102.1, 99.39, 106.63, 114.45, 121.34, 120.45, 133.39, 134.58, 131.19, 145.74, 155.81, 141.48, 148.76, 147.04], spy: [100, 101.11, 101.51, 101.04, 101.78, 99.37, 99.9, 100.38, 101.08, 99.91, 97.67, 97, 96.32, 96.09, 99.71, 102.64, 104.3, 104.35, 107.61, 108.25, 107.6, 110.05, 110.61, 108.08, 110.03, 107.53], top10Return: 47, spyReturn: 7.5, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 100.28, 101.8, 103.08, 102.98, 103.18, 102.79, 100.7, 100.12, 101.62, 100.15, 100.94, 99.7, 90.34, 99.34, 111.69, 115.59, 117, 126.57, 135.85, 129.79, 143.52, 154.32, 138.98, 146.13, 144.45], spy: [100, 98.96, 100.53, 100.19, 100.34, 100.73, 100.52, 98.75, 98.84, 99.42, 98.25, 96.91, 94.93, 91.54, 95.49, 100.59, 101.98, 103.09, 104.84, 107.09, 106.99, 108.72, 110.02, 106.76, 108.68, 106.21], top10Return: 44.4, spyReturn: 6.2, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 101.1, 102.34, 104.93, 106.33, 108.49, 108.79, 111.46, 106.35, 109.72, 110.25, 117.29, 121.15, 119.78, 124.53, 128.62, 125.72, 123.84, 134.37, 129.98, 127.07, 119.84, 122.44, 125.74, 128.24, 120.07, 125.81, 126.23, 128.14, 129.83, 129.66, 129.98, 129.62, 126.56, 128.81, 123.45, 126.26, 127.32, 125.74, 113.85, 125.3, 140.97, 145.89, 147.61, 159.79, 166.96, 163.92, 181.55, 195.2, 175.72, 184.84, 182.82], spy: [100, 102.2, 103.08, 103.45, 104.5, 104.11, 104.23, 106.22, 105.1, 106.51, 106.92, 108.32, 109.08, 108.39, 110.23, 110.55, 109.56, 109.99, 113.22, 111.61, 112.56, 109.14, 111.95, 112.73, 113.51, 111.42, 113.71, 112.53, 114.32, 113.92, 114.1, 114.54, 114.3, 112.47, 113.21, 112.06, 111.72, 110.2, 107.95, 104.09, 108.58, 114.39, 115.97, 117.22, 119.21, 121.59, 121.66, 123.63, 125.11, 121.4, 123.59, 120.77], top10Return: 82.8, spyReturn: 20.8, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Semiconductors': {
    '1D': { top10: [100, 98.9, 99.39, 98.73, 99.88, 100.35, 99.75, 99.69, 99.55, 99.86, 99.88, 99.35, 99.14, 98.36, 97.52, 97.68, 97.37, 98.12, 98.05, 97.45, 96.83, 97.55, 98.11, 99.37], spy: [100, 100.3, 100.26, 100.18, 100.36, 100.66, 100.67, 100.83, 100.67, 100.62, 100.64, 100.4, 100.3, 100.16, 99.81, 99.85, 99.87, 100.03, 100.01, 99.8, 99.74, 99.78, 99.79, 99.95], top10Return: -0.6, spyReturn: -0.05, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 107.49, 111, 100.77, 100.12], spy: [100, 100.78, 100.46, 99, 98.96], top10Return: 0.1, spyReturn: -1, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.16, 100.27, 99.34, 100.71, 105.58, 106.83, 104.03, 91.76, 97.24, 95.72, 92.49, 101.48, 102.93, 109.08, 103.42, 104.56, 112.46, 116.24, 105.29, 104.7], spy: [100, 99.98, 100.53, 100.78, 101.06, 101.2, 100.49, 100.87, 98.26, 98.49, 98.2, 96.65, 98.29, 98.82, 100.56, 99.97, 98.72, 99.49, 99.17, 97.73, 97.69], top10Return: 12.9, spyReturn: -1.7, xLabels: ["May 27", "Jun 3", "Jun 10", "Jun 17", "Jun 24"] },
    'YTD': { top10: [100, 107.01, 113.6, 119.4, 120.25, 115.11, 122.34, 123.35, 123.71, 120.25, 123.47, 131.44, 133.22, 133.14, 138.69, 149, 163.95, 170.72, 190.51, 192.21, 182.76, 197.55, 212.09, 202.71, 220.96, 212.27], spy: [100, 101.11, 101.51, 101.04, 101.78, 99.37, 99.9, 100.38, 101.08, 99.91, 97.67, 97, 96.32, 96.09, 99.71, 102.64, 104.3, 104.35, 107.61, 108.25, 107.6, 110.05, 110.61, 108.08, 110.03, 107.53], top10Return: 112.3, spyReturn: 7.5, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 103.15, 109.84, 115.53, 114.4, 116.66, 120.56, 122.26, 121.23, 123.27, 122.98, 129.75, 128.57, 124.29, 129.41, 146.45, 159.24, 164.58, 183.11, 194.54, 179.57, 196.08, 206.41, 199.61, 217.67, 208.96], spy: [100, 98.96, 100.53, 100.19, 100.34, 100.73, 100.52, 98.75, 98.84, 99.42, 98.25, 96.91, 94.93, 91.54, 95.49, 100.59, 101.98, 103.09, 104.84, 107.09, 106.99, 108.72, 110.02, 106.76, 108.68, 106.21], top10Return: 109, spyReturn: 6.2, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 103.26, 104.94, 107.7, 106.12, 105.63, 108.22, 112.45, 109.53, 113.77, 112.02, 116.05, 123.26, 121.35, 126.22, 129.64, 130.06, 128.49, 136.86, 136.56, 138.1, 133.39, 135.44, 146.81, 152, 140.96, 147.19, 146.93, 150.67, 154.81, 155.51, 161.02, 162.19, 169.46, 171.35, 165.05, 168.38, 170.99, 171.38, 159.16, 162.29, 183.06, 192, 194.33, 219.27, 229.99, 226.18, 253.25, 263.79, 252.65, 253.41, 255.39], spy: [100, 102.2, 103.08, 103.45, 104.5, 104.11, 104.23, 106.22, 105.1, 106.51, 106.92, 108.32, 109.08, 108.39, 110.23, 110.55, 109.56, 109.99, 113.22, 111.61, 112.56, 109.14, 111.95, 112.73, 113.51, 111.42, 113.71, 112.53, 114.32, 113.92, 114.1, 114.54, 114.3, 112.47, 113.21, 112.06, 111.72, 110.2, 107.95, 104.09, 108.58, 114.39, 115.97, 117.22, 119.21, 121.59, 121.66, 123.63, 125.11, 121.4, 123.59, 120.77], top10Return: 155.4, spyReturn: 20.8, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Broad Tech': {
    '1D': { top10: [100, 99.22, 99.3, 98.98, 99.57, 99.85, 99.93, 100.04, 99.74, 99.78, 99.9, 99.56, 99.33, 98.89, 98.63, 98.38, 98.25, 98.72, 98.45, 98.16, 98.01, 98.19, 98.47, 98.84], spy: [100, 100.3, 100.26, 100.18, 100.36, 100.66, 100.67, 100.83, 100.67, 100.62, 100.64, 100.4, 100.3, 100.16, 99.81, 99.85, 99.87, 100.03, 100.01, 99.8, 99.74, 99.78, 99.79, 99.95], top10Return: -1.1, spyReturn: -0.05, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 102.28, 101.97, 98.59, 97.53], spy: [100, 100.78, 100.46, 99, 98.96], top10Return: -2.5, spyReturn: -1, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.93, 101.33, 101.87, 103.55, 104.77, 103.46, 103.06, 95.99, 97.76, 96.03, 93.7, 97.78, 98.33, 101.85, 100.17, 99.79, 102.16, 101.93, 98.52, 97.5], spy: [100, 99.98, 100.53, 100.78, 101.06, 101.2, 100.49, 100.87, 98.26, 98.49, 98.2, 96.65, 98.29, 98.82, 100.56, 99.97, 98.72, 99.49, 99.17, 97.73, 97.69], top10Return: 0.4, spyReturn: -1.7, xLabels: ["May 27", "Jun 3", "Jun 10", "Jun 17", "Jun 24"] },
    'YTD': { top10: [100, 103.06, 104.96, 105, 104.88, 96.41, 100.14, 102.86, 104.51, 102.3, 100.68, 102.26, 101.27, 99.57, 105.18, 111.23, 116.27, 113.72, 125.31, 126.34, 121.44, 129.54, 134.65, 125.63, 131.2, 127.75], spy: [100, 101.11, 101.51, 101.04, 101.78, 99.37, 99.9, 100.38, 101.08, 99.91, 97.67, 97, 96.32, 96.09, 99.71, 102.64, 104.3, 104.35, 107.61, 108.25, 107.6, 110.05, 110.61, 108.08, 110.03, 107.53], top10Return: 27.7, spyReturn: 7.5, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 98.74, 101.57, 102.52, 101.81, 99.83, 99.84, 99.35, 98.74, 101.72, 99.84, 99.5, 98.17, 91.94, 99.2, 107.56, 111.1, 110.77, 119.19, 124.77, 119.03, 126, 131.8, 122.21, 127.58, 124.22], spy: [100, 98.96, 100.53, 100.19, 100.34, 100.73, 100.52, 98.75, 98.84, 99.42, 98.25, 96.91, 94.93, 91.54, 95.49, 100.59, 101.98, 103.09, 104.84, 107.09, 106.99, 108.72, 110.02, 106.76, 108.68, 106.21], top10Return: 24.2, spyReturn: 6.2, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.69, 103.71, 106.07, 106.79, 106.83, 106.77, 107.29, 105.64, 108.06, 107.95, 113.44, 117.43, 116.48, 120.73, 124.58, 126.03, 120.13, 127.1, 126.7, 121.12, 114.99, 118.76, 120.73, 121.55, 115.45, 119.73, 118.41, 121.37, 124.82, 124.05, 122.9, 123.73, 121.25, 123.16, 120.94, 121.49, 122.37, 123.25, 116.46, 122.32, 131.45, 134.17, 134.19, 142.59, 145.12, 142.29, 151.32, 157.86, 148.41, 154.17, 150.44], spy: [100, 102.2, 103.08, 103.45, 104.5, 104.11, 104.23, 106.22, 105.1, 106.51, 106.92, 108.32, 109.08, 108.39, 110.23, 110.55, 109.56, 109.99, 113.22, 111.61, 112.56, 109.14, 111.95, 112.73, 113.51, 111.42, 113.71, 112.53, 114.32, 113.92, 114.1, 114.54, 114.3, 112.47, 113.21, 112.06, 111.72, 110.2, 107.95, 104.09, 108.58, 114.39, 115.97, 117.22, 119.21, 121.59, 121.66, 123.63, 125.11, 121.4, 123.59, 120.77], top10Return: 50.4, spyReturn: 20.8, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Electrification': {
    '1D': { top10: [100, 98.91, 99.53, 99.18, 99.8, 100.02, 99.81, 100.05, 99.97, 99.92, 99.95, 99.83, 99.57, 99.19, 98.82, 98.62, 98.52, 98.67, 98.61, 98.58, 98.29, 98.31, 98.63, 99.03], spy: [100, 100.3, 100.26, 100.18, 100.36, 100.66, 100.67, 100.83, 100.67, 100.62, 100.64, 100.4, 100.3, 100.16, 99.81, 99.85, 99.87, 100.03, 100.01, 99.8, 99.74, 99.78, 99.79, 99.95], top10Return: -0.7, spyReturn: -0.05, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 102.29, 103.36, 98.79, 98.07], spy: [100, 100.78, 100.46, 99, 98.96], top10Return: -1.9, spyReturn: -1, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.17, 99.25, 98.2, 97.87, 99.92, 98.87, 98.79, 92.68, 92.79, 91.7, 88.74, 92.36, 93.24, 95.34, 94.37, 94.35, 96.51, 97.56, 93.26, 92.63], spy: [100, 99.98, 100.53, 100.78, 101.06, 101.2, 100.49, 100.87, 98.26, 98.49, 98.2, 96.65, 98.29, 98.82, 100.56, 99.97, 98.72, 99.49, 99.17, 97.73, 97.69], top10Return: -4.6, spyReturn: -1.7, xLabels: ["May 27", "Jun 3", "Jun 10", "Jun 17", "Jun 24"] },
    'YTD': { top10: [100, 103.61, 108.42, 111.38, 112.77, 109.91, 114.31, 115.08, 118.29, 112.19, 112.41, 113.97, 116.18, 113.26, 118.81, 122.45, 127.21, 128.02, 137.59, 136.19, 127.05, 137.67, 138.05, 128.91, 132.98, 129.27], spy: [100, 101.11, 101.51, 101.04, 101.78, 99.37, 99.9, 100.38, 101.08, 99.91, 97.67, 97, 96.32, 96.09, 99.71, 102.64, 104.3, 104.35, 107.61, 108.25, 107.6, 110.05, 110.61, 108.08, 110.03, 107.53], top10Return: 29.3, spyReturn: 7.5, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 101.46, 102.91, 107.28, 108.46, 108.38, 112.73, 112.68, 114.2, 115.33, 110.2, 112.22, 111.78, 107.03, 111.32, 120.48, 122.05, 124.9, 133.67, 136.51, 126.9, 135.59, 136.37, 126.32, 130.33, 126.72], spy: [100, 98.96, 100.53, 100.19, 100.34, 100.73, 100.52, 98.75, 98.84, 99.42, 98.25, 96.91, 94.93, 91.54, 95.49, 100.59, 101.98, 103.09, 104.84, 107.09, 106.99, 108.72, 110.02, 106.76, 108.68, 106.21], top10Return: 26.7, spyReturn: 6.2, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 103.46, 106.23, 108.17, 110.33, 107.3, 107.26, 111.05, 110.55, 112.07, 111.13, 112.46, 117.1, 117.99, 121.58, 125.8, 130.99, 125.61, 130.75, 130.87, 128.79, 124.18, 127.51, 129.67, 131.2, 128.34, 130.27, 129.51, 130.29, 134.96, 136.7, 135.62, 139, 138.13, 140.72, 136.98, 136.58, 139.73, 139.79, 136.38, 141.56, 150.32, 151.74, 152.16, 160.38, 162.95, 157.78, 166.79, 168.05, 157.68, 158.8, 154.6], spy: [100, 102.2, 103.08, 103.45, 104.5, 104.11, 104.23, 106.22, 105.1, 106.51, 106.92, 108.32, 109.08, 108.39, 110.23, 110.55, 109.56, 109.99, 113.22, 111.61, 112.56, 109.14, 111.95, 112.73, 113.51, 111.42, 113.71, 112.53, 114.32, 113.92, 114.1, 114.54, 114.3, 112.47, 113.21, 112.06, 111.72, 110.2, 107.95, 104.09, 108.58, 114.39, 115.97, 117.22, 119.21, 121.59, 121.66, 123.63, 125.11, 121.4, 123.59, 120.77], top10Return: 54.6, spyReturn: 20.8, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Industrials': {
    '1D': { top10: [100, 99.99, 99.84, 99.96, 100.35, 100.47, 100.71, 100.74, 100.65, 100.74, 100.91, 100.84, 100.79, 100.5, 100.17, 99.92, 99.84, 99.88, 99.79, 99.76, 99.42, 99.34, 99.35, 99.69], spy: [100, 100.3, 100.26, 100.18, 100.36, 100.66, 100.67, 100.83, 100.67, 100.62, 100.64, 100.4, 100.3, 100.16, 99.81, 99.85, 99.87, 100.03, 100.01, 99.8, 99.74, 99.78, 99.79, 99.95], top10Return: -0.1, spyReturn: -0.05, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 100.33, 101.43, 100.08, 99.99], spy: [100, 100.78, 100.46, 99, 98.96], top10Return: 0, spyReturn: -1, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 100, 100.47, 99.82, 98.35, 99.63, 99.38, 100.34, 97.56, 97.7, 97.81, 96.06, 98.25, 99.37, 99.4, 99.8, 99.53, 99.88, 101.01, 99.63, 99.55], spy: [100, 99.98, 100.53, 100.78, 101.06, 101.2, 100.49, 100.87, 98.26, 98.49, 98.2, 96.65, 98.29, 98.82, 100.56, 99.97, 98.72, 99.49, 99.17, 97.73, 97.69], top10Return: 2, spyReturn: -1.7, xLabels: ["May 27", "Jun 3", "Jun 10", "Jun 17", "Jun 24"] },
    'YTD': { top10: [100, 105.14, 110.15, 111.3, 111.44, 111.22, 116.05, 118.94, 119.6, 115.24, 112.17, 111.94, 113.75, 112.58, 118.78, 118.96, 120.02, 118.22, 125.56, 124.2, 118.95, 125.47, 124.73, 122.65, 125.33, 125.27], spy: [100, 101.11, 101.51, 101.04, 101.78, 99.37, 99.9, 100.38, 101.08, 99.91, 97.67, 97, 96.32, 96.09, 99.71, 102.64, 104.3, 104.35, 107.61, 108.25, 107.6, 110.05, 110.61, 108.08, 110.03, 107.53], top10Return: 25.3, spyReturn: 7.5, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 99.63, 104.04, 108.79, 107.84, 107.68, 113.79, 114.91, 116.2, 116.99, 111.46, 109.67, 108.3, 104.89, 110.65, 117.64, 116.83, 116.96, 120.26, 121.93, 117.97, 121.56, 121.29, 119.61, 122.35, 122.28], spy: [100, 98.96, 100.53, 100.19, 100.34, 100.73, 100.52, 98.75, 98.84, 99.42, 98.25, 96.91, 94.93, 91.54, 95.49, 100.59, 101.98, 103.09, 104.84, 107.09, 106.99, 108.72, 110.02, 106.76, 108.68, 106.21], top10Return: 22.3, spyReturn: 6.2, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 103.08, 104.46, 106.01, 106.39, 106.3, 106.34, 109.02, 105.99, 109.1, 108.56, 110.45, 111.79, 111.3, 114.18, 114.76, 114.59, 112.8, 116.89, 115.61, 114.21, 109.28, 112.24, 113.88, 116.92, 113.14, 116.96, 117.21, 122.76, 127.88, 127.12, 128.24, 134.22, 135.01, 135.97, 134.16, 130.19, 127.75, 127.76, 122.25, 129.53, 137.01, 137.11, 136.83, 140.52, 142.01, 137.48, 143.03, 142.14, 140.07, 143.06, 143.39], spy: [100, 102.2, 103.08, 103.45, 104.5, 104.11, 104.23, 106.22, 105.1, 106.51, 106.92, 108.32, 109.08, 108.39, 110.23, 110.55, 109.56, 109.99, 113.22, 111.61, 112.56, 109.14, 111.95, 112.73, 113.51, 111.42, 113.71, 112.53, 114.32, 113.92, 114.1, 114.54, 114.3, 112.47, 113.21, 112.06, 111.72, 110.2, 107.95, 104.09, 108.58, 114.39, 115.97, 117.22, 119.21, 121.59, 121.66, 123.63, 125.11, 121.4, 123.59, 120.77], top10Return: 43.4, spyReturn: 20.8, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Meme': {
    '1D': { top10: [100, 97.63, 97.91, 96.81, 97.67, 98.32, 98.34, 98.27, 97.84, 97.42, 97.74, 96.97, 96.6, 95.86, 95.55, 95.61, 95.56, 96.32, 96.21, 95.31, 95, 95.92, 96.28, 96.62], spy: [100, 100.3, 100.26, 100.18, 100.36, 100.66, 100.67, 100.83, 100.67, 100.62, 100.64, 100.4, 100.3, 100.16, 99.81, 99.85, 99.87, 100.03, 100.01, 99.8, 99.74, 99.78, 99.79, 99.95], top10Return: -3.3, spyReturn: -0.05, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 103.54, 103.4, 98.59, 95.28], spy: [100, 100.78, 100.46, 99, 98.96], top10Return: -4.7, spyReturn: -1, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 101.49, 103.34, 102.02, 102.24, 104.7, 101.07, 101.6, 91.3, 93.63, 90.34, 87.84, 93.47, 92.31, 97.44, 93.66, 94.22, 97.55, 97.4, 92.92, 89.84], spy: [100, 99.98, 100.53, 100.78, 101.06, 101.2, 100.49, 100.87, 98.26, 98.49, 98.2, 96.65, 98.29, 98.82, 100.56, 99.97, 98.72, 99.49, 99.17, 97.73, 97.69], top10Return: -7.2, spyReturn: -1.7, xLabels: ["May 27", "Jun 3", "Jun 10", "Jun 17", "Jun 24"] },
    'YTD': { top10: [100, 108.03, 108.23, 107.22, 102.68, 89.95, 92.02, 95.05, 95.18, 93.73, 92.78, 90.43, 93.62, 91.36, 100.37, 111.62, 113.88, 111.01, 124.96, 123.8, 122.14, 140.11, 139.02, 125.07, 128.2, 122.46], spy: [100, 101.11, 101.51, 101.04, 101.78, 99.37, 99.9, 100.38, 101.08, 99.91, 97.67, 97, 96.32, 96.09, 99.71, 102.64, 104.3, 104.35, 107.61, 108.25, 107.6, 110.05, 110.61, 108.08, 110.03, 107.53], top10Return: 22.5, spyReturn: 7.5, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 99.58, 103.35, 104.03, 98.06, 94.17, 94.08, 89.31, 89.39, 91.27, 89.21, 87.13, 89.11, 83.9, 92.57, 104.76, 108.31, 106.38, 116.12, 120.79, 118.54, 132.37, 137.22, 119.87, 122.9, 117.41], spy: [100, 98.96, 100.53, 100.19, 100.34, 100.73, 100.52, 98.75, 98.84, 99.42, 98.25, 96.91, 94.93, 91.54, 95.49, 100.59, 101.98, 103.09, 104.84, 107.09, 106.99, 108.72, 110.02, 106.76, 108.68, 106.21], top10Return: 17.4, spyReturn: 6.2, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.67, 101.12, 97.17, 96.69, 91.7, 90.47, 90.11, 83.87, 83.83, 84.44, 87.4, 90.06, 89.88, 87.84, 94, 92.17, 89.08, 95.2, 94.62, 93.69, 88.97, 87.94, 89.05, 87.72, 84.23, 89.03, 90.61, 92.16, 93.61, 93.35, 92.33, 90.71, 90.33, 87.34, 92.73, 94.37, 98.42, 101.28, 92.01, 93.68, 103.11, 108.71, 111.55, 109.84, 113.34, 114.07, 117.28, 116.76, 112.24, 116.57, 107.95], spy: [100, 102.2, 103.08, 103.45, 104.5, 104.11, 104.23, 106.22, 105.1, 106.51, 106.92, 108.32, 109.08, 108.39, 110.23, 110.55, 109.56, 109.99, 113.22, 111.61, 112.56, 109.14, 111.95, 112.73, 113.51, 111.42, 113.71, 112.53, 114.32, 113.92, 114.1, 114.54, 114.3, 112.47, 113.21, 112.06, 111.72, 110.2, 107.95, 104.09, 108.58, 114.39, 115.97, 117.22, 119.21, 121.59, 121.66, 123.63, 125.11, 121.4, 123.59, 120.77], top10Return: 8, spyReturn: 20.8, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
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
export const SCAN_TIMESTAMP    = '2026-06-24T21:44:44.723Z';
export const SCAN_TIMESTAMP_NY = 'June 24, 2026 at 5:44 PM ET';
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
export const HOLDINGS_COUNT = 1238;
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
  { ticker: 'MU', name: `MICRON TECHNOLOGY INC`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 14.18, bestProScore: 5.68, avgProScore: 4.73, price: 1048.51, weeklyChange: 0.51 },
  { ticker: 'NVDA', name: `NVIDIA CORP`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 12.98, bestProScore: 6.21, avgProScore: 4.33, price: 199.00, weeklyChange: -2.76 },
  { ticker: 'AMD', name: `ADVANCED MICRO DEVICES INC`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 10.32, bestProScore: 4.87, avgProScore: 3.44, price: 519.74, weeklyChange: 1.42 },
  { ticker: 'AVGO', name: `BROADCOM INC`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 6.43, bestProScore: 2.80, avgProScore: 2.14, price: 382.07, weeklyChange: -2.76 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 5.13, bestProScore: 3.14, avgProScore: 2.56, price: 294.49, weeklyChange: 0.16 },
  { ticker: 'INTC', name: `INTEL CORPORATION`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.81, bestProScore: 3.54, avgProScore: 2.41, price: 131.65, weeklyChange: 8.71 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.71, bestProScore: 2.90, avgProScore: 2.35, price: 440.83, weeklyChange: 2.01 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.57, bestProScore: 2.67, avgProScore: 2.29, price: 276.70, weeklyChange: -4.43 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 3.86, bestProScore: 2.48, avgProScore: 1.93, price: 374.80, weeklyChange: 0.17 },
  { ticker: 'WDC', name: `Western Digital Corp`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 3.72, bestProScore: 2.32, avgProScore: 1.86, price: 643.83, weeklyChange: -9.59 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': 0.5, '1M': 12.4, 'YTD': 112.5, '6M': 111.7, '1Y': 190 },
  ARTY: { '1W': -2.3, '1M': 7.5, 'YTD': 53.5, '6M': 52.4, '1Y': 84.7 },
  BAI:  { '1W': -1.4, '1M': 3.9, 'YTD': 49.2, '6M': 46.1, '1Y': 76.8 },
  IGPT: { '1W': -0.9, '1M': 8.7, 'YTD': 67.9, '6M': 67.2, '1Y': 106.8 },
  IVES: { '1W': -3.3, '1M': -3, 'YTD': 14.4, '6M': 11.7, '1Y': 34.1 },
  ALAI: { '1W': -2.9, '1M': 1.3, 'YTD': 22.2, '6M': 19.2, '1Y': 47.5 },
  CHAT: { '1W': -1.1, '1M': 6.6, 'YTD': 62.4, '6M': 56.8, '1Y': 100.8 },
  AIFD: { '1W': -3.5, '1M': 1.2, 'YTD': 38.1, '6M': 36, '1Y': 72.9 },
  SPRX: { '1W': -3.2, '1M': 1.8, 'YTD': 39.9, '6M': 34.9, '1Y': 87.1 },
  AOTG: { '1W': -1.5, '1M': 2.9, 'YTD': 10.3, '6M': 8.4, '1Y': 27.5 },
  // Semiconductors
  SOXX: { '1W': 0.3, '1M': 11.9, 'YTD': 99.7, '6M': 96.5, '1Y': 153.6 },
  PSI:  { '1W': 0.8, '1M': 9.8, 'YTD': 114, '6M': 108.8, '1Y': 184.1 },
  XSD:  { '1W': -0.6, '1M': -2.3, 'YTD': 83.5, '6M': 78.7, '1Y': 131.9 },
  DRAM: { '1W': 0, '1M': 32.4, 'YTD': 151.9, '6M': 151.9, '1Y': 151.9 },
  // Broad Tech
  PTF:  { '1W': -4.1, '1M': 2.6, 'YTD': 65.6, '6M': 60.1, '1Y': 89 },
  WCLD: { '1W': -0.4, '1M': -2.4, 'YTD': -15.8, '6M': -17, '1Y': -16.6 },
  IGV:  { '1W': -3.4, '1M': -8.3, 'YTD': -18.5, '6M': -20.4, '1Y': -20 },
  FDTX: { '1W': -2, '1M': 8.2, 'YTD': 35, '6M': 33.4, '1Y': 44.2 },
  GTEK: { '1W': 0.1, '1M': 6.4, 'YTD': 49.8, '6M': 48.9, '1Y': 68.6 },
  ARKK: { '1W': -2.3, '1M': 0.4, 'YTD': -0.3, '6M': -4.9, '1Y': 10.4 },
  MARS: { '1W': -14.6, '1M': -30.4, 'YTD': 15.9, '6M': 15.9, '1Y': 15.9 },
  FRWD: { '1W': -3, '1M': 4.8, 'YTD': 30.1, '6M': 30.1, '1Y': 30.1 },
  BCTK: { '1W': -2.7, '1M': 2, 'YTD': 20.8, '6M': 18.4, '1Y': 23 },
  FWD:  { '1W': -0.9, '1M': 3.1, 'YTD': 35.2, '6M': 32.5, '1Y': 61.8 },
  CBSE: { '1W': 1.1, '1M': 1.7, 'YTD': 27.6, '6M': 24.2, '1Y': 39.3 },
  FCUS: { '1W': -1.5, '1M': -0.4, 'YTD': 40.1, '6M': 31, '1Y': 75 },
  WGMI: { '1W': -2.9, '1M': 7.8, 'YTD': 74.4, '6M': 59.7, '1Y': 242.7 },
  CNEQ: { '1W': -2.4, '1M': -0.3, 'YTD': 16, '6M': 13.5, '1Y': 38.8 },
  SGRT: { '1W': -1.4, '1M': 3.7, 'YTD': 44.9, '6M': 40.4, '1Y': 81.3 },
  SPMO: { '1W': -1.1, '1M': 6.1, 'YTD': 28.9, '6M': 26.6, '1Y': 39.9 },
  XMMO: { '1W': -0.4, '1M': 2.5, 'YTD': 22, '6M': 19.3, '1Y': 34.2 },
  // Electrification
  POW:  { '1W': -2, '1M': -1.9, 'YTD': 53.8, '6M': 52.1, '1Y': 49.3 },
  VOLT: { '1W': 1.4, '1M': 3.2, 'YTD': 41.3, '6M': 39, '1Y': 64.7 },
  PBD:  { '1W': -4, '1M': -11.2, 'YTD': 19.9, '6M': 17.6, '1Y': 56.5 },
  PBW:  { '1W': -5.5, '1M': -12.2, 'YTD': 23.7, '6M': 17.3, '1Y': 94.8 },
  IVEP: { '1W': 0.5, '1M': -1, 'YTD': 7.6, '6M': 7.6, '1Y': 7.6 },
  // Industrials
  AIRR: { '1W': 1, '1M': 4.3, 'YTD': 32.7, '6M': 28.4, '1Y': 64.5 },
  PRN:  { '1W': 0.6, '1M': 6.5, 'YTD': 44.5, '6M': 38.9, '1Y': 65.1 },
  RSHO: { '1W': 2.3, '1M': 9.1, 'YTD': 39.4, '6M': 36.5, '1Y': 61.3 },
  IDEF: { '1W': -5.3, '1M': -5.2, 'YTD': 1, '6M': -1.2, '1Y': 14.1 },
  BILT: { '1W': 1.3, '1M': -4.5, 'YTD': 8.7, '6M': 8.8, '1Y': 12 },
  // Meme
  BUZZ: { '1W': -3.7, '1M': -5.1, 'YTD': 10.2, '6M': 6, '1Y': 21.8 },
  MEME: { '1W': -6.7, '1M': -14.6, 'YTD': 49.8, '6M': 38.9, '1Y': -5.3 },
  RKNG: { '1W': -3.8, '1M': -1.9, 'YTD': 7.4, '6M': 7.4, '1Y': 7.4 },
};
// @@END_GENERATED:ETF_RETURNS@@

// @@GENERATED:ETF_DAY_CHANGE@@
// Today's % move per ETF ticker (1D, vs prior close). Refreshed by the 3×/day
// price jobs. Powers the 1D ranking in the theme-ETF side panel.
export const ETF_DAY_CHANGE: Record<string, number> = {
  AIS:  -0.4,
  ARTY: -0.63,
  BAI:  -0.48,
  IGPT: -0.65,
  IVES: -1.36,
  ALAI: -1.34,
  CHAT: -0.63,
  AIFD: -1.07,
  SPRX: -1.91,
  AOTG: -0.71,
  SOXX: -0.31,
  PSI:  -0.99,
  XSD:  -2.26,
  DRAM: 1.03,
  PTF:  -2.27,
  WCLD: 0.68,
  IGV:  -1.32,
  FDTX: -0.6,
  GTEK: -0.48,
  ARKK: 0.05,
  MARS: -4.74,
  FRWD: -0.2,
  BCTK: -0.06,
  FWD:  -0.29,
  CBSE: 0.19,
  FCUS: -2.18,
  WGMI: -5.95,
  CNEQ: -0.32,
  SGRT: -0.11,
  SPMO: -0.36,
  XMMO: -0.38,
  POW:  -0.26,
  VOLT: 0.71,
  PBD:  -1.38,
  PBW:  -2.93,
  IVEP: 0.14,
  AIRR: 0.74,
  PRN:  -0.42,
  IDEF: -1.24,
  BILT: 0.44,
  BUZZ: -2.05,
  MEME: -4.72,
  RKNG: -3.08,
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
  'AI & ML': { etfs: ['AIS', 'AOTG', 'SPRX'], series: { '1W': [100, 104.81, 106.31, 99.46, 98.57], '1M': [100, 100.16, 101.99, 101.62, 103.66, 106.87, 106.09, 104.64, 94.8, 98.17, 96.1, 93.05, 99.12, 100.16, 105.27, 101.31, 102.17, 107.11, 108.66, 101.64, 100.73], 'YTD': [100, 102.87, 105.65, 107.25, 108.86, 96.78, 101.6, 103.13, 104.97, 101.61, 99.89, 102.48, 102.9, 98.32, 106.68, 114.17, 122.05, 120.68, 133.9, 136.37, 133.06, 152.08, 161.87, 145.78, 154.26, 154.23], '6M': [100, 100.99, 102.51, 104.55, 103.84, 103.85, 104.45, 100.54, 100.33, 102.8, 100.57, 101.41, 99.83, 89.14, 99.09, 111.81, 115.9, 117.01, 126.78, 137.87, 131.39, 149.61, 159.91, 143.3, 151.64, 151.66], '1Y': [100, 101.21, 102.72, 105.7, 107.44, 109.97, 111.43, 113.64, 108.22, 111.68, 112.07, 119.6, 124.88, 123.16, 128.5, 134.43, 130.76, 128.23, 139.72, 136.19, 132.43, 123.1, 125.9, 130.24, 133.57, 123.77, 131.11, 132.6, 134.6, 137.54, 136.49, 136.7, 137.83, 132.16, 135.4, 130.04, 132.54, 133.85, 131.74, 117.42, 130.78, 147.86, 153.24, 154.56, 167.76, 177.55, 173.98, 198.71, 212.39, 190.11, 201.38, 201.54] }, returns: { '1W': -1.4, '1M': 0.7, 'YTD': 54.2, '6M': 51.7, '1Y': 101.5 } },
  'Semiconductors': { etfs: ['DRAM', 'PSI', 'XSD'], series: { '1W': [100, 107.78, 111.6, 100.83, 100.06], '1M': [100, 99.23, 100.39, 99.18, 100.84, 105.4, 106.44, 103.47, 90.78, 96.24, 94.75, 91.65, 101, 102.37, 108.69, 103.33, 104.35, 112.56, 116.68, 105.11, 104.43], 'YTD': [100, 107.31, 114.14, 120.61, 120.35, 116.86, 124.21, 125.08, 125.45, 122.95, 128.09, 137.82, 139.42, 140.05, 143.02, 154.18, 170.81, 177.82, 197.91, 199.17, 188.69, 200.97, 214.64, 208.06, 229.17, 216.45], '6M': [100, 103.38, 110.65, 116.76, 115.18, 117.15, 122.34, 124.39, 122.79, 126.03, 127.36, 136.22, 134.78, 131.99, 134.68, 151.58, 166.52, 171.67, 191.59, 201.39, 185.44, 199.37, 209.33, 204.94, 225.85, 213.12], '1Y': [100, 103.65, 105.27, 108.95, 107.55, 107.11, 111.01, 114.26, 111.78, 116.37, 115.05, 118.88, 126.74, 124.11, 128.71, 132.07, 132.99, 131.39, 138.97, 139.15, 142.03, 138.28, 139.63, 152.7, 158.48, 146.91, 153.23, 151.82, 154.69, 158.29, 159.14, 165.13, 166.68, 176.19, 177.6, 173.02, 177.23, 180.52, 181.21, 168.68, 167.52, 187.7, 196.88, 197.46, 224.52, 234.14, 231.89, 257.56, 266.7, 257.87, 254.79, 256] }, returns: { '1W': 0.1, '1M': 4.4, 'YTD': 116.4, '6M': 113.1, '1Y': 156 } },
  'Broad Tech': { etfs: ['WGMI', 'PTF', 'SGRT'], series: { '1W': [100, 103.44, 104.65, 100.01, 97.19], '1M': [100, 101.9, 102.25, 101.28, 103.3, 105.97, 105.66, 104, 94.15, 97.56, 94.86, 91.61, 97.79, 100.02, 104.42, 102.57, 102.69, 106.25, 107.46, 102.75, 99.79], 'YTD': [100, 107.37, 113.44, 113.75, 116.83, 101.6, 110.12, 112.43, 116.08, 109.7, 107.02, 110.59, 112.57, 105.85, 119.91, 126.67, 134.16, 127.7, 152.7, 150.35, 142.42, 165.16, 171.27, 153.71, 166.3, 161.65], '6M': [100, 99.56, 103.75, 110.26, 106.52, 106.53, 108.95, 106.12, 107.04, 110.29, 102.25, 105.47, 104.65, 93.14, 105.41, 121.09, 123.74, 121.97, 137.67, 146.28, 136.47, 153.73, 162.96, 145.84, 157.74, 153.36], '1Y': [100, 110.87, 111.2, 115.92, 118.32, 116.55, 116.55, 117.78, 119.95, 124.47, 124.53, 139.45, 151.1, 151.94, 159.53, 177.57, 189.84, 165.05, 182.55, 190.06, 160.06, 148.29, 159.63, 164.62, 164.48, 145.68, 155.28, 154.53, 160.67, 175.42, 167.58, 167.84, 169.19, 158.54, 164.14, 156.29, 153.83, 158.27, 159.46, 147.6, 163.41, 186.35, 188.99, 191.36, 212.45, 215.61, 210.4, 236.41, 247.01, 227.53, 245.14, 237.67] }, returns: { '1W': -2.8, '1M': -0.2, 'YTD': 61.7, '6M': 53.4, '1Y': 137.7 } },
  'Electrification': { etfs: ['PBW', 'VOLT', 'POW'], series: { '1W': [100, 102.4, 103.46, 98.75, 97.95], '1M': [100, 99.41, 99.38, 98.37, 97.97, 100.1, 98.96, 98.85, 92.08, 92.77, 91.63, 88.59, 92.69, 93.46, 95.98, 94.92, 95.03, 97.27, 98.34, 93.89, 93.2], 'YTD': [100, 104.13, 109.93, 113.55, 115.16, 110.83, 117.42, 118.62, 121.85, 114.21, 114.69, 116.11, 119.56, 116.34, 123.8, 127.41, 134.02, 135.5, 147.78, 146.34, 134.86, 149.04, 148.29, 137.29, 142.31, 139.61], '6M': [100, 101.25, 102.46, 108.6, 108.86, 109.19, 114.92, 115.55, 116.29, 117.82, 111.89, 113.6, 113.42, 108.06, 113.68, 124.91, 127.13, 131.6, 142.53, 146.35, 134.15, 146.06, 145.94, 133.76, 138.68, 136.11], '1Y': [100, 103.56, 107.06, 109.7, 111.16, 108.1, 107.63, 112.34, 111.32, 113.72, 111.93, 112.77, 118.34, 120.92, 125.03, 129.39, 136.55, 129.53, 135.62, 135.04, 132.79, 128.11, 132.57, 135.83, 137.52, 133.83, 137.11, 135.8, 137.06, 142.28, 142.92, 142.58, 145.67, 144.7, 148.06, 145.27, 145.02, 147.93, 148.65, 145.57, 152.88, 163.37, 166.32, 164.8, 174.16, 177.87, 170.57, 181.66, 182.48, 170.78, 174.05, 169.63] }, returns: { '1W': -2, '1M': -6.8, 'YTD': 39.6, '6M': 36.1, '1Y': 69.6 } },
  'Industrials': { etfs: ['PRN', 'RSHO', 'BILT'], series: { '1W': [100, 100.67, 102.52, 101.43, 101.43], '1M': [100, 99.94, 99.46, 98.95, 97.76, 99.81, 100.04, 100.48, 97.73, 97.9, 98.27, 97.15, 97.89, 100, 99.5, 99.98, 99.76, 100.44, 102.33, 101.2, 101.2], 'YTD': [100, 102.86, 106.98, 108.43, 109.5, 110.83, 116.67, 118.63, 119.99, 115.33, 111.99, 111.2, 114.11, 112.82, 119.67, 119.44, 121.03, 120.71, 127.83, 127.48, 122.21, 129.06, 129.07, 126.62, 129.2, 130.88], '6M': [100, 99.26, 101.42, 105.98, 105.68, 106.27, 113.02, 115.67, 116.97, 116.84, 110.42, 109.15, 108.15, 106.82, 111.31, 118.8, 118.56, 119.71, 122.41, 125.17, 121.55, 124.89, 124.85, 123.72, 126.44, 128.06], '1Y': [100, 102.7, 103.86, 105.4, 105.74, 105.27, 104.31, 106.97, 104.62, 107.23, 106.69, 107.86, 108.83, 108.35, 110.32, 110.83, 111.59, 109.61, 113.07, 112.99, 111.41, 106.8, 109.62, 111.41, 114.21, 110.11, 113.75, 114.02, 117.02, 121.43, 121.71, 124.56, 130.25, 132.66, 132.57, 130.17, 125.3, 123.33, 124.82, 120.86, 126.77, 134.05, 135.49, 136.09, 138.69, 142.04, 137.29, 143.34, 142.32, 140.82, 143.59, 146.13] }, returns: { '1W': 1.4, '1M': 1.2, 'YTD': 30.9, '6M': 28.1, '1Y': 46.1 } },
  'Meme': { etfs: ['MEME', 'BUZZ', 'RKNG'], series: { '1W': [100, 103.54, 103.4, 98.59, 95.28], '1M': [100, 101.49, 103.34, 102.02, 102.24, 104.7, 101.07, 101.6, 91.3, 93.63, 90.34, 87.84, 93.47, 92.31, 97.44, 93.66, 94.22, 97.55, 97.4, 92.92, 89.84], 'YTD': [100, 108.03, 108.23, 107.22, 102.68, 89.95, 92.02, 95.05, 95.18, 93.73, 92.78, 90.43, 93.62, 91.36, 100.37, 111.62, 113.88, 111.01, 124.96, 123.8, 122.14, 140.11, 139.02, 125.07, 128.2, 122.46], '6M': [100, 99.58, 103.35, 104.03, 98.06, 94.17, 94.08, 89.31, 89.39, 91.27, 89.21, 87.13, 89.11, 83.9, 92.57, 104.76, 108.31, 106.38, 116.12, 120.79, 118.54, 132.37, 137.22, 119.87, 122.9, 117.41], '1Y': [100, 102.67, 101.12, 97.17, 96.69, 91.7, 90.47, 90.11, 83.87, 83.83, 84.44, 87.4, 90.06, 89.88, 87.84, 94, 92.17, 89.08, 95.2, 94.62, 93.69, 88.97, 87.94, 89.05, 87.72, 84.23, 89.03, 90.61, 92.16, 93.61, 93.35, 92.33, 90.71, 90.33, 87.34, 92.73, 94.37, 98.42, 101.28, 92.01, 93.68, 103.11, 108.71, 111.55, 109.84, 113.34, 114.07, 117.28, 116.76, 112.24, 116.57, 107.95] }, returns: { '1W': -4.7, '1M': -10.2, 'YTD': 22.5, '6M': 17.4, '1Y': 8 } },
};
// @@END_GENERATED:THEME_REPRESENTATIVES@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVDA', easyScore: 10, avgWeight: 6.21, proScore: 6.21, coverage: 1,
      price: 199, weeklyPrices: [204.65, 210.69, 208.65, 200.04, 199.00], weeklyChange: -2.76, dayChange: -0.5, sortRank: 0, periodReturns: { '1M': -7.6, 'YTD': 6.7, '6M': 5.5, '1Y': 29 },
      priceHistory: { '1D': [200, 200.7, 200.01, 198.98, 200.01, 200.81, 201.01, 200.91, 200.78, 200.79, 200.71, 199.78, 199.36, 198.87, 197.96, 197.96, 197.66, 198.31, 198, 197.46, 196.98, 197.74, 197.31, 199], '1W': [204.65, 210.69, 208.65, 200.04, 199], '1M': [214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199], 'YTD': [186.5, 185.04, 187.05, 184.84, 192.51, 171.88, 186.94, 187.9, 184.89, 183.34, 183.14, 180.4, 178.68, 175.75, 183.91, 198.87, 202.5, 209.25, 207.83, 220.78, 220.61, 212.6, 214.75, 208.19, 207.41, 199], '6M': [188.61, 188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 219.44, 222.32, 214.86, 222.82, 208.19, 207.41, 199], '1Y': [154.31, 157.25, 164.1, 173, 173.74, 177.87, 179.42, 181.59, 175.4, 181.6, 171.66, 177.17, 176.24, 177.69, 188.89, 192.57, 179.83, 180.28, 207.04, 195.21, 193.8, 186.52, 180.26, 183.38, 180.93, 174.14, 188.61, 188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 222.32, 214.86, 222.82, 208.19, 207.41, 199] },
      velocityScore: { '1D': -0.3, '1W': 3, '1M': 9.1, '6M': null }, isNew: false,
      marketCap: '$4.8T', pe: 30.5, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.5,
      etfPresence: { AIS: 2.26, ARTY: 4.43, BAI: 4.01, IGPT: 7.45, IVES: 4.89, ALAI: 12.57, CHAT: 6.37, AIFD: 6.3, SPRX: 3.34, AOTG: 10.51 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 9, avgWeight: 6.31, proScore: 5.68, coverage: 0.9,
      price: 1048.51, weeklyPrices: [1043.19, 1133.99, 1211.38, 1051.77, 1048.51], weeklyChange: 0.51, dayChange: -0.31, sortRank: 0, periodReturns: { '1M': 39.6, 'YTD': 267.4, '6M': 265.7, '1Y': 724 },
      priceHistory: { '1D': [1051.77, 1040, 1048.16, 1037.31, 1050.97, 1042.36, 1041.56, 1039.02, 1040.3, 1044.41, 1045.79, 1038.77, 1040.19, 1032.24, 1018.67, 1022.51, 1014.12, 1026.64, 1024.53, 1016.72, 997.88, 1012.91, 1026.37, 1048.51], '1W': [1043.19, 1133.99, 1211.38, 1051.77, 1048.51], '1M': [895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51], 'YTD': [285.41, 327.02, 336.63, 397.58, 435.79, 382.89, 413.97, 417.35, 415.56, 397.05, 405.35, 461.73, 382.09, 367.85, 421.51, 456.23, 487.48, 518.46, 666.59, 766.58, 698.74, 928.41, 1079.57, 935.89, 1020.76, 1048.51], '6M': [286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 795.33, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1048.51], '1Y': [127.25, 121.74, 123.11, 113.26, 111.73, 109.14, 108.78, 124.27, 117.21, 117.75, 124.21, 150.57, 168.89, 156.83, 183.75, 192.33, 191.94, 198.47, 226.63, 237.5, 244.9, 225.92, 230.26, 226.65, 258.46, 248.55, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1048.51] },
      velocityScore: { '1D': -6.6, '1W': -9.1, '1M': 8, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 49.6, revenueGrowth: 196, eps: 21.14, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { AIS: 8.38, ARTY: 4.98, BAI: 6.28, IGPT: 8.05, IVES: 5.05, ALAI: 1.24, CHAT: 3.97, AIFD: 7.6, SPRX: false, AOTG: 11.2 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'AMD', easyScore: 9, avgWeight: 5.41, proScore: 4.87, coverage: 0.9,
      price: 519.74, weeklyPrices: [512.48, 537.37, 551.63, 519.85, 519.74], weeklyChange: 1.42, dayChange: -0.02, sortRank: 0, periodReturns: { '1M': 11.2, 'YTD': 142.7, '6M': 141.7, '1Y': 262.4 },
      priceHistory: { '1D': [519.85, 511.32, 521.36, 514.3, 521.83, 518.56, 517.25, 519.98, 519.09, 520.91, 521.55, 518.81, 515.81, 512.72, 508.82, 510.36, 509.74, 512.71, 512.2, 508.7, 505.25, 511.21, 513.22, 519.74], '1W': [512.48, 537.37, 551.63, 519.85, 519.74], '1M': [503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74], 'YTD': [214.16, 204.68, 227.92, 253.73, 252.18, 192.5, 205.94, 203.37, 203.68, 199.45, 197.74, 199.46, 220.27, 210.21, 236.64, 258.12, 303.46, 337.11, 421.39, 448.29, 414.05, 495.54, 542.52, 475.51, 507.29, 519.74], '6M': [215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 458.79, 420.99, 503.89, 521.54, 475.51, 507.29, 519.74], '1Y': [143.4, 138.52, 144.16, 160.41, 162.12, 176.31, 163.12, 184.42, 165.2, 167.13, 161.79, 155.67, 157.92, 161.27, 169.73, 232.89, 238.6, 230.23, 264.33, 256.33, 258.89, 223.55, 214.24, 215.98, 221.43, 201.06, 215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 420.99, 503.89, 521.54, 475.51, 507.29, 519.74] },
      velocityScore: { '1D': -2.2, '1W': -1.6, '1M': -3.6, '6M': null }, isNew: false,
      marketCap: '$847B', pe: 172.1, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.39, ARTY: 4.75, BAI: 4.8, IGPT: 8.11, IVES: 4.74, ALAI: 1.24, CHAT: 3.97, AIFD: false, SPRX: 0.53, AOTG: 16.12 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 7, avgWeight: 3.99, proScore: 2.8, coverage: 0.7,
      price: 382.07, weeklyPrices: [392.90, 411.35, 392.13, 380.15, 382.07], weeklyChange: -2.76, dayChange: 0.51, sortRank: 0, periodReturns: { '1M': -7.7, 'YTD': 10.4, '6M': 9.1, '1Y': 44.4 },
      priceHistory: { '1D': [380.15, 382.2, 382.24, 380.63, 382.6, 383.62, 385.89, 385.63, 384.48, 384.23, 385.66, 384.06, 383.89, 383.23, 380.77, 380.74, 380.3, 381.49, 380.77, 378.22, 377.8, 378.42, 378.08, 382.07], '1W': [392.9, 411.35, 392.13, 380.15, 382.07], '1M': [422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07], 'YTD': [346.1, 332.48, 343.02, 325.49, 330.73, 310.51, 331.17, 333.99, 321.7, 332.77, 335.97, 315.93, 318.81, 313.49, 354.91, 396.72, 422.65, 405.45, 425.44, 419.3, 411.07, 421.86, 479.23, 392.16, 376.71, 382.07], '6M': [350.22, 347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 428.43, 420.71, 422.01, 481.57, 392.16, 376.71, 382.07], '1Y': [264.65, 269.9, 275.4, 286.45, 288.71, 293.7, 301.67, 309.09, 291.17, 300.25, 306.1, 359.63, 345.35, 336.1, 338.18, 345.02, 351.33, 340.3, 385.98, 358.98, 355.22, 354.42, 397.57, 381.03, 406.37, 329.88, 350.22, 347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 420.71, 422.01, 481.57, 392.16, 376.71, 382.07] },
      velocityScore: { '1D': 1.4, '1W': 5.3, '1M': -14.1, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 63.6, revenueGrowth: 48, eps: 6.01, grossMargin: 76, dividendYield: 0.68,
      etfPresence: { AIS: false, ARTY: 4.34, BAI: 4.13, IGPT: false, IVES: 4.78, ALAI: 3.9, CHAT: 4, AIFD: 5.26, SPRX: false, AOTG: 1.55 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MRVL', easyScore: 7, avgWeight: 3.81, proScore: 2.67, coverage: 0.7,
      price: 276.7, weeklyPrices: [289.54, 310.58, 307.86, 279.04, 276.70], weeklyChange: -4.43, dayChange: -0.84, sortRank: 0, periodReturns: { '1M': 40.9, 'YTD': 225.6, '6M': 219.9, '1Y': 264.4 },
      priceHistory: { '1D': [279.04, 270.68, 270.15, 266.54, 271.58, 273.66, 272.15, 269.87, 270.57, 272.26, 271.72, 271.1, 269.78, 267.92, 266, 268.48, 267.26, 269.59, 269.11, 267.5, 265, 269.58, 271.46, 276.7], '1W': [289.54, 310.58, 307.86, 279.04, 276.7], '1M': [208.26, 198.7, 204.83, 205, 219.43, 290.79, 301.65, 316.43, 263.47, 288.85, 266.88, 252.59, 280.71, 279.7, 308.88, 278.67, 289.54, 310.58, 307.86, 279.04, 276.7], 'YTD': [84.98, 83.45, 80.38, 83.1, 81.34, 74.21, 78.23, 79.61, 79.29, 75.68, 87.67, 87.62, 98.45, 106.71, 119.93, 134.6, 157.32, 156.57, 172.15, 164.5, 176.27, 198.7, 301.65, 266.88, 278.67, 276.7], '6M': [86.49, 89.39, 83.22, 80.46, 81.77, 78.66, 82.35, 78.61, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 170.84, 168.93, 208.26, 290.79, 266.88, 278.67, 276.7], '1Y': [75.93, 74.25, 73.36, 72.01, 74.04, 80.37, 75.32, 79.32, 71.22, 74.79, 64.1, 66.59, 74.23, 83.81, 86.2, 90.68, 88.89, 81.05, 90.15, 92.9, 89.33, 81.32, 87.72, 98.19, 89.43, 84.47, 86.49, 89.39, 83.22, 80.46, 81.77, 78.66, 82.35, 79.01, 78.39, 77.51, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 168.93, 208.26, 290.79, 266.88, 278.67, 276.7] },
      velocityScore: { '1D': -2.6, '1W': -1.5, '1M': 14.1, '6M': null }, isNew: false,
      marketCap: '$242B', pe: 95.4, revenueGrowth: 28, eps: 2.9, grossMargin: 52, dividendYield: 0.09,
      etfPresence: { AIS: 4.46, ARTY: 4.31, BAI: 1.93, IGPT: 3.56, IVES: false, ALAI: false, CHAT: 1.5, AIFD: 6.47, SPRX: 4.45, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'TSM', name: 'TSM', easyScore: 6, avgWeight: 4.83, proScore: 2.9, coverage: 0.6,
      price: 440.83, weeklyPrices: [432.15, 462.12, 467.67, 436.39, 440.83], weeklyChange: 2.01, dayChange: 1.02, sortRank: 0, periodReturns: { '1M': 9, 'YTD': 45.1, '6M': 47.5, '1Y': 97.9 },
      priceHistory: { '1D': [436.39, 434.62, 438.33, 437.17, 440.12, 441.11, 440, 441.68, 441.23, 442.35, 443.19, 441.12, 440.45, 438.6, 436.91, 437.54, 436.47, 438.58, 437.65, 436.81, 435.95, 436.97, 437.8, 440.83], '1W': [432.15, 462.12, 467.67, 436.39, 440.83], '1M': [412.32, 422.73, 424.86, 418.45, 435.63, 446.69, 436.69, 444.92, 415.17, 426.8, 427.92, 408.75, 421.07, 423.93, 441.4, 425.83, 432.15, 462.12, 467.67, 436.39, 440.83], 'YTD': [303.89, 318.01, 341.64, 327.37, 339.55, 330.73, 368.1, 360.39, 376.81, 353.86, 336.71, 339.57, 347.75, 341.49, 365.49, 375.1, 387.44, 393.83, 419.5, 397.28, 392.61, 422.73, 436.69, 427.92, 425.83, 440.83], '6M': [298.8, 319.61, 323.63, 342.4, 332.71, 341.36, 355.41, 366.36, 370.04, 369.11, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 404.54, 395.95, 412.32, 446.69, 427.92, 425.83, 440.83], '1Y': [222.74, 233.6, 229.76, 245.6, 241.6, 241.62, 231.37, 241.44, 228.6, 239.29, 235.21, 258.91, 268.64, 276.66, 288.11, 299.88, 304.71, 288.88, 305.09, 293.64, 290.62, 282.37, 289.96, 292.93, 304.85, 284.68, 298.8, 319.61, 323.63, 342.4, 332.71, 341.36, 355.41, 364.2, 385.75, 353.13, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 395.95, 412.32, 446.69, 427.92, 425.83, 440.83] },
      velocityScore: { '1D': -2, '1W': 3.2, '1M': -5.2, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 38, revenueGrowth: 35, eps: 11.61, grossMargin: 62, dividendYield: 0.87,
      etfPresence: { AIS: 3.12, ARTY: false, BAI: 4.31, IGPT: false, IVES: 4.99, ALAI: 5.6, CHAT: false, AIFD: 3.45, SPRX: false, AOTG: 7.53 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 4.81, proScore: 2.89, coverage: 0.6,
      price: 345.29, weeklyPrices: [363.79, 368.03, 349.68, 346.13, 345.29], weeklyChange: -5.09, dayChange: -0.23, sortRank: 0, periodReturns: { '1M': -9.8, 'YTD': 10.3, '6M': 9.9, '1Y': 102.3 },
      priceHistory: { '1D': [346.09, 348.44, 350.31, 349.73, 350.41, 352.71, 350.87, 350.96, 350.43, 350.22, 350.6, 348.9, 349.22, 349.53, 349.01, 348.79, 349.27, 346.65, 344.39, 342.88, 344.39, 344.73, 344.83, 345.29], '1W': [363.79, 368.03, 349.68, 346.13, 345.29], '1M': [388.88, 388.83, 390.13, 380.34, 376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68, 369.35, 373.25, 363.79, 368.03, 349.68, 346.13, 345.29], 'YTD': [313, 325.44, 332.78, 330.54, 338.25, 331.25, 309, 302.85, 307.38, 300.88, 303.55, 307.69, 290.93, 297.39, 318.49, 337.12, 339.32, 349.94, 398.04, 387.35, 387.66, 388.83, 358.99, 364.26, 373.25, 345.29], '6M': [314.09, 315.15, 328.57, 330, 333.26, 343.69, 324.32, 305.72, 311.49, 306.52, 306.36, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 388.43, 388.64, 396.94, 388.88, 361.85, 364.26, 373.25, 345.29], '1Y': [170.68, 178.64, 177.62, 183.58, 192.17, 191.9, 196.09, 201.96, 199.32, 207.48, 232.3, 240.37, 252.03, 245.79, 245.69, 241.53, 251.03, 251.69, 274.57, 284.31, 286.71, 292.81, 319.95, 317.62, 312.43, 302.46, 314.09, 315.15, 328.57, 330, 333.26, 343.69, 324.32, 302.02, 310.9, 303.58, 306.36, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 388.43, 387.35, 396.94, 388.88, 361.85, 364.26, 373.25, 345.29] },
      velocityScore: { '1D': 1.8, '1W': 1.4, '1M': -23.7, '6M': null }, isNew: false,
      marketCap: '$4.2T', pe: 26.3, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.13, IGPT: 7.38, IVES: 4.65, ALAI: false, CHAT: 5.01, AIFD: 4.69, SPRX: false, AOTG: 4 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'ANET', name: 'ARISTA NETWORKS INC', easyScore: 6, avgWeight: 2.24, proScore: 1.34, coverage: 0.6,
      price: 161.74, weeklyPrices: [164.93, 169.67, 174.56, 162.20, 161.74], weeklyChange: -1.93, dayChange: -0.28, sortRank: 0, periodReturns: { '1M': 5, 'YTD': 23.4, '6M': 23.7, '1Y': 67.9 },
      priceHistory: { '1D': [162.2, 161.63, 162.18, 161.88, 164.12, 164.21, 164.72, 164.68, 164.33, 164.03, 164.04, 163.71, 163.8, 163.93, 163.07, 163.73, 162.48, 163.59, 162.82, 162.38, 161.33, 161.54, 161.82, 161.74], '1W': [164.93, 169.67, 174.56, 162.2, 161.74], '1M': [158.01, 154.31, 155.27, 159.47, 170.68, 175.33, 174.37, 166.01, 154.27, 156.4, 152.16, 151.76, 156.4, 163.24, 169.09, 168.01, 164.93, 169.67, 174.56, 162.2, 161.74], 'YTD': [131.03, 123.72, 130.59, 138.41, 148.15, 128.67, 135.12, 137.23, 130.25, 139.4, 134.03, 136.07, 135.01, 124.85, 146.05, 154.33, 177.73, 168.68, 147.06, 142.54, 141.58, 154.31, 174.37, 152.16, 168.01, 161.74], '6M': [130.77, 133.6, 122.89, 129.83, 143.72, 138.37, 141.74, 141.59, 127.43, 129.3, 137.17, 135.35, 135.88, 116.13, 133.64, 154.37, 172.86, 165.29, 170.22, 136.43, 141.71, 158.01, 175.33, 152.16, 168.01, 161.74], '1Y': [96.31, 101.13, 106.29, 111.98, 114.04, 123.22, 138.78, 138.01, 131.47, 133.27, 141.17, 153.04, 146.66, 143.06, 144.46, 158.23, 143.38, 146.59, 162.03, 140.42, 134.98, 124.81, 127.65, 128.55, 134.39, 124.62, 130.77, 133.6, 122.89, 129.83, 143.72, 138.37, 141.74, 142.58, 128.77, 124.6, 137.17, 135.35, 135.88, 116.13, 133.64, 154.37, 172.86, 165.29, 170.22, 142.54, 141.71, 158.01, 175.33, 152.16, 168.01, 161.74] },
      velocityScore: { '1D': 0, '1W': -7.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$204B', pe: 55.8, revenueGrowth: 35, eps: 2.9, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: false, ARTY: 2.35, BAI: 1.36, IGPT: false, IVES: false, ALAI: 0.96, CHAT: 2.13, AIFD: 5.06, SPRX: 1.58, AOTG: false },
      tonyNote: 'ARISTA NETWORKS INC appears in 6 of 10 AI & ML ETFs (60% coverage) with average weight 2.2% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 5, avgWeight: 3.86, proScore: 1.93, coverage: 0.5,
      price: 557.67, weeklyPrices: [567.58, 577.22, 563.85, 562.20, 557.67], weeklyChange: -1.75, dayChange: -0.81, sortRank: 0, periodReturns: { '1M': -8.6, 'YTD': -15.5, '6M': -16.5, '1Y': -21.3 },
      priceHistory: { '1D': [562.2, 563.83, 561.21, 561.55, 559.93, 564.69, 566.2, 566.51, 563.43, 562.84, 564.4, 560.83, 559.89, 558.72, 556.86, 556.92, 557.41, 559.32, 560.51, 559.22, 558.74, 557.7, 557.69, 557.67], '1W': [567.58, 577.22, 563.85, 562.2, 557.67], '1M': [612.34, 635.26, 635.29, 632.51, 600.47, 597.63, 622.98, 627.57, 593, 585.39, 584.59, 570.98, 568.43, 566.98, 593.48, 600.21, 567.58, 577.22, 563.85, 562.2, 557.67], 'YTD': [660.09, 646.06, 620.8, 647.63, 738.31, 670.21, 649.81, 644.78, 657.01, 660.57, 638.18, 615.68, 594.89, 579.23, 628.39, 671.58, 674.72, 669.12, 612.88, 603, 602.61, 635.26, 622.98, 584.59, 600.21, 557.67], '6M': [667.55, 650.41, 653.06, 620.25, 672.36, 706.41, 677.22, 639.77, 637.25, 653.56, 647.39, 627.45, 604.06, 536.38, 575.05, 662.49, 668.84, 671.34, 604.96, 598.86, 611.21, 612.34, 597.63, 584.59, 600.21, 557.67], '1Y': [708.68, 713.57, 727.24, 701.41, 714.8, 773.44, 771.99, 780.08, 747.72, 747.38, 748.65, 750.9, 780.25, 748.91, 727.05, 733.51, 717.55, 733.41, 751.67, 635.95, 609.01, 590.32, 633.61, 661.53, 652.71, 664.45, 667.55, 650.41, 653.06, 620.25, 672.36, 706.41, 677.22, 639.29, 639.3, 655.08, 647.39, 627.45, 604.06, 536.38, 575.05, 662.49, 668.84, 671.34, 604.96, 603, 611.21, 612.34, 597.63, 584.59, 600.21, 557.67] },
      velocityScore: { '1D': 3.2, '1W': 16.3, '1M': -29.8, '6M': null }, isNew: false,
      marketCap: '$1.4T', pe: 20.3, revenueGrowth: 33, eps: 27.49, grossMargin: 82, dividendYield: 0.37,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: 7.54, IVES: 4.7, ALAI: 3.95, CHAT: 2.02, AIFD: false, SPRX: false, AOTG: 1.09 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.49, proScore: 1.75, coverage: 0.5,
      price: 365.46, weeklyPrices: [378.91, 379.40, 367.34, 373.94, 365.46], weeklyChange: -3.55, dayChange: -2.27, sortRank: 0, periodReturns: { '1M': -12.7, 'YTD': -24.4, '6M': -25.1, '1Y': -25.8 },
      priceHistory: { '1D': [373.94, 377.72, 373.32, 373.38, 372.78, 374.51, 374.61, 374.91, 373.57, 373.61, 374.22, 372.51, 372.72, 372.04, 370.91, 370.89, 371.31, 372.11, 370.81, 368.83, 368.86, 368.45, 368.11, 365.46], '1W': [378.91, 379.4, 367.34, 373.94, 365.46], '1M': [416.03, 412.67, 426.99, 450.24, 460.52, 441.31, 427.34, 428.05, 416.67, 411.74, 403.41, 397.36, 390.34, 390.74, 399.76, 393.83, 378.91, 379.4, 367.34, 373.94, 365.46], 'YTD': [483.62, 478.11, 456.66, 451.14, 433.5, 393.67, 401.84, 398.46, 401.72, 410.68, 401.86, 391.79, 371.04, 369.37, 373.07, 411.22, 432.92, 424.46, 413.96, 407.77, 417.42, 412.67, 427.34, 403.41, 393.83, 365.46], '6M': [488.02, 472.94, 479.28, 459.86, 470.28, 423.37, 413.6, 401.32, 384.47, 398.55, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 412.66, 423.54, 416.03, 441.31, 403.41, 393.83, 365.46], '1Y': [492.27, 491.09, 501.48, 511.7, 510.88, 533.5, 524.94, 520.58, 505.72, 506.74, 507.97, 501.01, 508.45, 507.03, 515.74, 522.4, 513.43, 520.54, 541.55, 507.16, 511.14, 487.12, 485.5, 480.84, 483.47, 483.98, 488.02, 472.94, 479.28, 459.86, 470.28, 423.37, 413.6, 396.86, 389, 403.93, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 423.54, 416.03, 441.31, 403.41, 393.83, 365.46] },
      velocityScore: { '1D': 6.1, '1W': 2.3, '1M': -32.2, '6M': null }, isNew: false,
      marketCap: '$2.7T', pe: 21.8, revenueGrowth: 18, eps: 16.79, grossMargin: 68, dividendYield: 0.97,
      etfPresence: { AIS: false, ARTY: 2.41, BAI: false, IGPT: false, IVES: 4.69, ALAI: 4.91, CHAT: 2.08, AIFD: false, SPRX: false, AOTG: 3.38 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'ALAB', name: 'ALAB', easyScore: 5, avgWeight: 3.14, proScore: 1.57, coverage: 0.5,
      price: 399.92, weeklyPrices: [374.68, 417.07, 439.66, 397.02, 399.92], weeklyChange: 6.74, dayChange: 0.73, sortRank: 0, periodReturns: { '1M': 30.3, 'YTD': 140.4, '6M': 135.3, '1Y': 346.2 },
      priceHistory: { '1D': [397.02, 402.6, 400.02, 397.11, 407.02, 410.27, 406.34, 403.64, 403.01, 403.48, 402.86, 399.23, 399.11, 395.31, 391.3, 395.4, 393.27, 397.4, 396.17, 392.89, 388.95, 393.31, 395.11, 399.92], '1W': [374.68, 417.07, 439.66, 397.02, 399.92], '1M': [318.72, 325.33, 349.17, 342.85, 320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 361.71, 374.68, 417.07, 439.66, 397.02, 399.92], 'YTD': [166.36, 156.73, 174.45, 176.35, 160.46, 142.82, 126.58, 132.62, 124.67, 120, 119.9, 126.34, 120.33, 106.33, 129.46, 172.09, 194.06, 196.85, 213.91, 204.42, 244.26, 325.33, 363.54, 341.7, 361.71, 399.92], '6M': [169.97, 179.56, 162.61, 182, 163.25, 152.44, 187.67, 129.32, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 207.35, 215.58, 318.72, 355.76, 341.7, 361.71, 399.92], '1Y': [89.63, 88.57, 97.02, 97.95, 121.68, 136.73, 174.39, 193.64, 172.45, 179.2, 187.95, 232.9, 251.88, 200.64, 209.6, 225.43, 161.46, 154.85, 173.62, 181.94, 157.79, 142.01, 154.22, 152.51, 173.7, 145.88, 169.97, 179.56, 162.61, 182, 163.25, 152.44, 187.67, 123.69, 128.4, 109.8, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 215.58, 318.72, 355.76, 341.7, 361.71, 399.92] },
      velocityScore: { '1D': -1.9, '1W': 2.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$69B', pe: 272.1, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 1.97, ARTY: 1.32, BAI: false, IGPT: false, IVES: false, ALAI: 1.16, CHAT: 2.77, AIFD: false, SPRX: 8.5, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 5, avgWeight: 2.8, proScore: 1.4, coverage: 0.5,
      price: 643.83, weeklyPrices: [712.13, 746.23, 732.62, 670.75, 643.83], weeklyChange: -9.59, dayChange: -4.01, sortRank: 0, periodReturns: { '1M': 32.9, 'YTD': 273.7, '6M': 258.6, '1Y': 929.3 },
      priceHistory: { '1D': [670.75, 640.52, 647.17, 639.69, 654.36, 653.51, 651.12, 651.01, 644.37, 647.8, 645.6, 638.46, 634.85, 629.6, 621.17, 621.34, 618.27, 625.93, 618.54, 617, 614.42, 618.22, 635.19, 643.83], '1W': [712.13, 746.23, 732.62, 670.75, 643.83], '1M': [524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83], 'YTD': [172.27, 187.68, 222.1, 243.29, 278.41, 260.19, 284.1, 284.67, 282.25, 259.03, 261.18, 304.9, 296.14, 297.73, 337.88, 365, 389.1, 412.76, 483.15, 488.74, 455.8, 530.6, 594.11, 517.72, 681.08, 643.83], '6M': [179.56, 187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 515.83, 458.68, 524.65, 563.1, 517.72, 681.08, 643.83], '1Y': [62.55, 65.78, 65.06, 67.02, 69.02, 78.69, 73.78, 76.07, 75.64, 80.67, 90.49, 96.15, 105.15, 107.21, 131.26, 119.7, 120.44, 120.47, 141.38, 160.1, 166.11, 153.97, 157.74, 161, 187.2, 175.01, 179.56, 187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 458.68, 524.65, 563.1, 517.72, 681.08, 643.83] },
      velocityScore: { '1D': -22.2, '1W': -19.5, '1M': -26.3, '6M': null }, isNew: false,
      marketCap: '$222B', pe: 38.6, revenueGrowth: 46, eps: 16.7, grossMargin: 45, dividendYield: 0.09,
      etfPresence: { AIS: 1.91, ARTY: 3.11, BAI: 3.5, IGPT: false, IVES: false, ALAI: 4.59, CHAT: false, AIFD: false, SPRX: false, AOTG: 0.87 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 5, avgWeight: 2.68, proScore: 1.34, coverage: 0.5,
      price: 842.53, weeklyPrices: [869.98, 850.00, 893.93, 827.92, 842.53], weeklyChange: -3.16, dayChange: 1.76, sortRank: 0, periodReturns: { '1M': -11, 'YTD': 128.6, '6M': 112.8, '1Y': 818.1 },
      priceHistory: { '1D': [827.92, 810, 827.67, 820.79, 844.33, 853.7, 847.42, 845.33, 845.37, 848.17, 850.88, 844.5, 842.24, 839.21, 832.57, 836.27, 831.35, 839.6, 837.21, 834.05, 828.57, 832.76, 839.07, 842.53], '1W': [869.98, 850, 893.93, 827.92, 842.53], '1M': [910.81, 902.31, 860.62, 854.96, 905, 1029.15, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93, 827.92, 842.53], 'YTD': [368.59, 348.26, 343.27, 354.49, 381.44, 504.42, 583.46, 635.64, 677, 650.82, 616.09, 700.81, 777.17, 764.65, 894.13, 824.01, 873.6, 858.32, 944.28, 992.37, 890.09, 902.31, 938, 821.76, 875.36, 842.53], '6M': [395.92, 386.11, 351.42, 324.25, 332.45, 423.42, 577.15, 562.74, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 1053.09, 884.98, 910.81, 1029.15, 821.76, 875.36, 842.53], '1Y': [91.77, 91.24, 92.62, 102.64, 102.85, 110.08, 110.01, 120.23, 115.89, 125.84, 141.91, 164.88, 171.5, 159.11, 169.75, 159.76, 156.57, 158.06, 214.28, 232.75, 253.81, 268.92, 308.28, 327.85, 372.09, 337.13, 395.92, 386.11, 351.42, 324.25, 332.45, 423.42, 577.15, 600.42, 688.27, 694.43, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 884.98, 910.81, 1029.15, 821.76, 875.36, 842.53] },
      velocityScore: { '1D': 1.5, '1W': -7.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$66B', pe: 147.6, revenueGrowth: 90, eps: 5.71, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.51, IGPT: false, IVES: false, ALAI: 0.39, CHAT: 1.35, AIFD: 5.9, SPRX: 3.24, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 5 of 10 AI & ML ETFs (50% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 5, avgWeight: 2.37, proScore: 1.19, coverage: 0.5,
      price: 1914.46, weeklyPrices: [1958.80, 2184.75, 2273.73, 1963.60, 1914.46], weeklyChange: -2.26, dayChange: -2.5, sortRank: 0, periodReturns: { '1M': 29.5, 'YTD': 706.5, '6M': 665.5, '1Y': 3951.8 },
      priceHistory: { '1D': [1963.6, 1939.49, 1955.82, 1936.81, 1954.65, 1942.06, 1919.03, 1925.52, 1917.98, 1936.66, 1931.5, 1919.5, 1915.21, 1893.62, 1873.99, 1878.06, 1864.2, 1889.95, 1886.89, 1876.01, 1872.16, 1893.48, 1911.06, 1914.46], '1W': [1958.8, 2184.75, 2273.73, 1963.6, 1914.46], '1M': [1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46], 'YTD': [237.38, 334.54, 409.24, 503.44, 539.3, 576.2, 630.29, 621.09, 651.9, 565.59, 618.82, 753.69, 677.86, 692.73, 851.57, 891.72, 979.07, 1064.21, 1409.98, 1452.02, 1383.29, 1589.94, 1831.5, 1646.54, 1991.55, 1914.46], '6M': [250.08, 275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1547.56, 1333.01, 1589.55, 1716.36, 1646.54, 1991.55, 1914.46], '1Y': [47.25, 46.21, 46.95, 41.52, 42.06, 42.92, 42.1, 47.01, 44.4, 48.44, 62.5, 84.3, 98.87, 94.29, 124.14, 129.68, 144.3, 146.95, 204.36, 216.5, 283.1, 245.96, 215.04, 213.31, 241.61, 219.46, 250.08, 275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 565.41, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1333.01, 1589.55, 1716.36, 1646.54, 1991.55, 1914.46] },
      velocityScore: { '1D': -6.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$284B', pe: 65.4, revenueGrowth: 251, eps: 29.26, grossMargin: 56, dividendYield: null,
      etfPresence: { AIS: 2.19, ARTY: false, BAI: 2.96, IGPT: 4.24, IVES: false, ALAI: 0.47, CHAT: false, AIFD: false, SPRX: false, AOTG: 2 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 4, avgWeight: 3.93, proScore: 1.57, coverage: 0.4,
      price: 234.27, weeklyPrices: [237.50, 244.39, 232.79, 234.11, 234.27], weeklyChange: -1.36, dayChange: 0.07, sortRank: 0, periodReturns: { '1M': -12, 'YTD': 1.5, '6M': 0.8, '1Y': 10.5 },
      priceHistory: { '1D': [234.11, 237.8, 236.77, 237.92, 238.14, 239.94, 241.89, 241.82, 241.07, 241.63, 241.53, 239.9, 239.7, 239.92, 239.34, 238.99, 238.57, 238.65, 237.42, 237.07, 236.37, 235.91, 235.21, 234.27], '1W': [237.5, 244.39, 232.79, 234.11, 234.27], '1M': [265.29, 271.85, 274, 270.64, 261.26, 256.52, 250.02, 253.79, 246.03, 245.22, 244.19, 238, 241.51, 238.55, 246.02, 246, 237.5, 244.39, 232.79, 234.11, 234.27], 'YTD': [230.82, 246.29, 238.18, 234.34, 241.73, 222.69, 199.6, 204.86, 207.92, 218.94, 209.53, 209.87, 211.71, 210.57, 233.65, 248.5, 255.36, 263.04, 274.99, 265.82, 259.34, 271.85, 250.02, 244.19, 246, 234.27], '6M': [232.38, 226.5, 247.38, 239.12, 238.42, 242.96, 208.72, 198.79, 205.27, 208.39, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 268.99, 264.86, 265.29, 256.52, 244.19, 246, 234.27], '1Y': [211.99, 219.92, 222.26, 223.88, 232.23, 234.11, 222.31, 224.56, 223.81, 229.12, 235.68, 229.95, 231.23, 218.15, 222.41, 227.74, 215.57, 217.95, 230.3, 250.2, 244.2, 222.69, 229.16, 229.11, 230.28, 226.76, 232.38, 226.5, 247.38, 239.12, 238.42, 242.96, 208.72, 201.15, 208.56, 208.73, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 264.86, 265.29, 256.52, 244.19, 246, 234.27] },
      velocityScore: { '1D': 5.4, '1W': -21.5, '1M': -48, '6M': null }, isNew: false,
      marketCap: '$2.5T', pe: 31.7, revenueGrowth: 17, eps: 7.4, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 4.77, ALAI: 5.46, CHAT: 2.29, AIFD: 3.19, SPRX: false, AOTG: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'ARM', name: 'ARM', easyScore: 4, avgWeight: 3.59, proScore: 1.44, coverage: 0.4,
      price: 359.08, weeklyPrices: [418.88, 439.46, 407.72, 366.39, 359.08], weeklyChange: -14.28, dayChange: -2, sortRank: 0, periodReturns: { '1M': 17.2, 'YTD': 228.5, '6M': 221.9, '1Y': 128.3 },
      priceHistory: { '1D': [366.39, 353.83, 351.07, 348.12, 358.27, 359.38, 356.23, 355.3, 355.47, 357.08, 355.5, 353.9, 352.39, 349.74, 349.13, 349.48, 348.86, 351.52, 351.38, 348.69, 345.93, 351.87, 353.39, 359.08], '1W': [418.88, 439.46, 407.72, 366.39, 359.08], '1M': [321.22, 302.71, 335.27, 353.29, 408.85, 402.71, 411.83, 393.44, 342.93, 346.39, 324.86, 307.43, 342.23, 380.81, 412.55, 396.34, 418.88, 439.46, 407.72, 366.39, 359.08], 'YTD': [109.31, 113.08, 105.11, 119.2, 108.43, 110.88, 122.19, 126.93, 129.26, 120.62, 115.12, 128.36, 157.07, 155.07, 149.79, 159.34, 196.57, 201.69, 237.3, 207.92, 223.15, 302.71, 411.83, 324.86, 396.34, 359.08], '6M': [111.55, 114.73, 111.79, 105.78, 114.73, 106.93, 124.61, 125.28, 123.78, 124.37, 117.63, 121.7, 136.89, 136.96, 143.86, 161.22, 175.49, 198.65, 208.84, 212.65, 215.12, 321.22, 402.71, 324.86, 396.34, 359.08], '1Y': [157.31, 154.63, 148.55, 157.18, 159.99, 141.38, 136.12, 141.6, 131.16, 140.66, 135.48, 154.7, 146.54, 140.65, 152.15, 170.66, 170.67, 165.71, 170.39, 160.19, 148.75, 136.99, 132.61, 140.49, 136.14, 113.51, 111.55, 114.73, 111.79, 105.78, 114.73, 106.93, 124.61, 126.89, 128.14, 121.72, 117.63, 121.7, 136.89, 136.96, 143.86, 161.22, 175.49, 198.65, 208.84, 207.92, 215.12, 321.22, 402.71, 324.86, 396.34, 359.08] },
      velocityScore: { '1D': -2.7, '1W': 2.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$384B', pe: 427.5, revenueGrowth: 20, eps: 0.84, grossMargin: 98, dividendYield: null,
      etfPresence: { AIS: 2.39, ARTY: false, BAI: false, IGPT: false, IVES: false, ALAI: 0.19, CHAT: 2.73, AIFD: false, SPRX: 9.04, AOTG: false },
      tonyNote: 'Arm Holdings is held across Broad Tech and AI ETFs as the CPU architecture licensor embedded in every mobile device and increasingly in AI inference chips and data center CPUs. Revenue grew and the royalty model is high-margin; the weight score reflects consistent institutional positioning as the AI chip design ecosystem expands on Arm cores.',
    },
    {
      ticker: 'INTC', name: 'INTC', easyScore: 4, avgWeight: 3.18, proScore: 1.27, coverage: 0.4,
      price: 131.65, weeklyPrices: [121.10, 133.99, 140.94, 132.28, 131.65], weeklyChange: 8.71, dayChange: -0.48, sortRank: 0, periodReturns: { '1M': 9.9, 'YTD': 256.8, '6M': 264.1, '1Y': 493 },
      priceHistory: { '1D': [132.28, 130.53, 131.93, 131.03, 134.84, 134.57, 134.71, 134.2, 134.25, 135.01, 134.65, 133.04, 131.97, 131.41, 130.35, 130.29, 129.2, 130.57, 130.35, 129.5, 128.35, 130.03, 130.11, 131.65], '1W': [121.1, 133.99, 140.94, 132.28, 131.65], '1M': [123.52, 121.77, 120.89, 114.68, 109.33, 107.93, 112.71, 111.78, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65], 'YTD': [36.9, 41.11, 48.32, 54.32, 48.66, 48.24, 46.48, 44.62, 45.46, 45.95, 45.25, 45.03, 47.18, 48.03, 61.72, 64.94, 65.27, 94.75, 113.01, 120.61, 110.8, 121.77, 112.71, 107.92, 117.05, 131.65], '6M': [36.16, 39.38, 45.55, 46.96, 42.49, 48.81, 50.24, 46.79, 43.63, 45.5, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 129.44, 108.17, 123.52, 107.93, 107.92, 117.05, 131.65], '1Y': [22.2, 21.88, 23.82, 22.8, 22.63, 19.8, 20.41, 22.22, 23.54, 24.85, 24.61, 24.61, 30.57, 33.99, 37.3, 37.8, 37.15, 36.92, 41.34, 38.38, 37.89, 35.11, 36.81, 40.5, 39.51, 36.28, 36.16, 39.38, 45.55, 46.96, 42.49, 48.81, 50.24, 46.18, 46.12, 43.1, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 108.17, 123.52, 107.93, 107.92, 117.05, 131.65] },
      velocityScore: { '1D': -1.6, '1W': -9.3, '1M': -56.2, '6M': null }, isNew: false,
      marketCap: '$662B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.33, ARTY: false, BAI: 3.23, IGPT: 4.85, IVES: false, ALAI: false, CHAT: 1.32, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'VRT', name: 'VRT', easyScore: 4, avgWeight: 3.04, proScore: 1.22, coverage: 0.4,
      price: 316.43, weeklyPrices: [317.58, 333.05, 357.96, 318.32, 316.43], weeklyChange: -0.36, dayChange: -0.59, sortRank: 0, periodReturns: { '1M': -3.4, 'YTD': 95.3, '6M': 89.6, '1Y': 160.1 },
      priceHistory: { '1D': [318.32, 311.91, 318.67, 316.26, 321.52, 321.82, 320.92, 322.14, 321.19, 321.77, 319.77, 318.45, 316.7, 315.47, 313.08, 314.31, 313.27, 313.81, 313.4, 312.5, 312.23, 312.46, 313.79, 316.43], '1W': [317.58, 333.05, 357.96, 318.32, 316.43], '1M': [323.91, 319.78, 314.18, 315.71, 323.39, 334.49, 331.44, 323.92, 300.51, 300.57, 289.52, 280.98, 297.88, 302.87, 311.93, 299.6, 317.58, 333.05, 357.96, 318.32, 316.43], 'YTD': [162.01, 160.78, 172.54, 181.12, 195.1, 177.75, 236.51, 243.06, 259.23, 249.75, 265.38, 264.71, 276.16, 259.37, 287.64, 301.16, 305.14, 306.18, 358.92, 367.13, 322.63, 319.78, 331.44, 289.52, 299.6, 316.43], '6M': [166.87, 175.61, 163.58, 176.93, 181.23, 190.01, 202, 234.53, 245.42, 257.75, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.92, 339.73, 323.91, 334.49, 289.52, 299.6, 316.43], '1Y': [121.64, 124.33, 120.72, 131.12, 130.87, 145.6, 139.75, 137.4, 127.54, 129.31, 125.7, 135.71, 141.96, 139.77, 161.64, 168.88, 180.51, 171.59, 199.27, 190.71, 173.37, 170.65, 172.02, 182.54, 178.66, 154.39, 166.87, 175.61, 163.58, 176.93, 181.23, 190.01, 202, 243.53, 253.15, 244.44, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.13, 339.73, 323.91, 334.49, 289.52, 299.6, 316.43] },
      velocityScore: { '1D': 0.8, '1W': null, '1M': -39, '6M': null }, isNew: false,
      marketCap: '$122B', pe: 79.5, revenueGrowth: 30, eps: 3.98, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 3.57, ARTY: false, BAI: 1.91, IGPT: false, IVES: false, ALAI: false, CHAT: 2.22, AIFD: 4.48, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'STX', name: 'STX', easyScore: 4, avgWeight: 2.9, proScore: 1.16, coverage: 0.4,
      price: 993.25, weeklyPrices: [1066.07, 1070.23, 1094.04, 1038.59, 993.25], weeklyChange: -6.83, dayChange: -4.37, sortRank: 0, periodReturns: { '1M': 22.2, 'YTD': 260.7, '6M': 248.2, '1Y': 616.9 },
      priceHistory: { '1D': [1038.59, 996.35, 1014.22, 994.29, 1024.75, 1026.5, 1012.82, 1013.02, 1006.88, 1006.86, 999.81, 989.78, 983.27, 978.03, 970.16, 971.19, 965.39, 970.89, 965.9, 960, 959.13, 965.85, 975.78, 993.25], '1W': [1066.07, 1070.23, 1094.04, 1038.59, 993.25], '1M': [845.76, 870.66, 880.72, 879.8, 921.26, 926.61, 940.69, 925.99, 847.47, 876.77, 846.01, 815.99, 868.09, 931.04, 1018.8, 1031.34, 1066.07, 1070.23, 1094.04, 1038.59, 993.25], 'YTD': [275.39, 284.47, 320.32, 346.53, 446.57, 405.45, 431.17, 408.97, 409.67, 367.34, 373.98, 406.77, 413.22, 423.12, 500.77, 519.6, 579.88, 643.3, 786.42, 808.8, 733.35, 870.66, 940.69, 846.01, 1031.34, 993.25], '6M': [285.27, 287.54, 304.01, 326.23, 358.29, 432.95, 425, 425.99, 407.4, 379.52, 374.33, 398.78, 404.02, 362.43, 468.72, 533.44, 559.9, 579.03, 771.01, 834.01, 740.84, 845.76, 926.61, 846.01, 1031.34, 993.25], '1Y': [138.54, 151.94, 144.5, 146.72, 152.73, 157.01, 147.27, 156.92, 158.4, 167.24, 183.98, 196.81, 216.64, 219.85, 254.74, 221.7, 219.38, 215.05, 265.62, 275.77, 283.26, 259.14, 272.28, 265.63, 307.85, 292, 285.27, 287.54, 304.01, 326.23, 358.29, 432.95, 425, 415.94, 396.02, 357.62, 374.33, 398.78, 404.02, 362.43, 468.72, 533.44, 559.9, 579.03, 771.01, 808.8, 740.84, 845.76, 926.61, 846.01, 1031.34, 993.25] },
      velocityScore: { '1D': null, '1W': -8.7, '1M': -39.3, '6M': null }, isNew: true,
      marketCap: '$223B', pe: 94.7, revenueGrowth: 44, eps: 10.49, grossMargin: 42, dividendYield: 0.29,
      etfPresence: { AIS: 2.94, ARTY: 3.06, BAI: false, IGPT: 3.4, IVES: false, ALAI: 2.19, CHAT: false, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 4, avgWeight: 2.77, proScore: 1.11, coverage: 0.4,
      price: 157.53, weeklyPrices: [183.53, 184.29, 175.07, 165.16, 157.53], weeklyChange: -14.17, dayChange: -4.62, sortRank: 0, periodReturns: { '1M': -18, 'YTD': -19.2, '6M': -20.2, '1Y': -25.2 },
      priceHistory: { '1D': [165.16, 164.39, 161.2, 160.39, 159.98, 160.19, 159.81, 160.34, 159.31, 158.31, 158.01, 157.43, 157.29, 156.21, 155.59, 155.9, 156.1, 157.7, 157.2, 155.93, 156.39, 156.64, 157.21, 157.53], '1W': [183.53, 184.29, 175.07, 165.16, 157.53], '1M': [193.06, 190.96, 203.7, 225.78, 248.15, 244.58, 230.33, 236.34, 213.68, 211.82, 205.81, 201.26, 184.1, 184.13, 192.64, 188.33, 183.53, 184.29, 175.07, 165.16, 157.53], 'YTD': [194.91, 189.65, 189.85, 178.18, 169.01, 136.48, 156.48, 156.54, 150.31, 154.79, 159.16, 152.9, 146.02, 145.23, 137.86, 169.81, 187.5, 163.83, 194.03, 186.83, 181.46, 190.96, 230.33, 205.81, 188.33, 157.53], '6M': [197.49, 195.71, 198.52, 191.09, 182.44, 160.06, 156.59, 160.14, 141.31, 149.25, 151.56, 155.97, 154.34, 138.8, 143.17, 163, 181.17, 165.96, 185.35, 193.84, 186.61, 193.06, 244.58, 205.81, 188.33, 157.53], '1Y': [210.72, 229.98, 235, 248.75, 242.83, 253.77, 256.43, 244.18, 235.06, 235.81, 223, 307.86, 296.62, 291.33, 288.78, 296.96, 303.62, 272.66, 275.3, 250.31, 226.99, 225.53, 204.96, 214.33, 198.85, 180.03, 197.49, 195.71, 198.52, 191.09, 182.44, 160.06, 156.59, 153.97, 146.14, 149.01, 151.56, 155.97, 154.34, 138.8, 143.17, 163, 181.17, 165.96, 185.35, 186.83, 186.61, 193.06, 244.58, 205.81, 188.33, 157.53] },
      velocityScore: { '1D': 0, '1W': -5.9, '1M': -41, '6M': null }, isNew: false,
      marketCap: '$454B', pe: 27, revenueGrowth: 21, eps: 5.83, grossMargin: 66, dividendYield: 1.21,
      etfPresence: { AIS: false, ARTY: 3.48, BAI: false, IGPT: false, IVES: 3.48, ALAI: false, CHAT: 1.42, AIFD: false, SPRX: false, AOTG: 2.69 },
      tonyNote: 'Oracle lands in 3 AI ETFs on the strength of its cloud database and AI infrastructure contracts. Revenue grew 22%, 67% gross margin, P/E of 40x. The 17.5% weekly return following a major earnings beat shows how quickly sentiment can reprice; the weight score at 2.04% is still modest, meaning ETF managers have started building positions but conviction is not yet deep.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 5.33, proScore: 5.33, coverage: 1,
      price: 1048.51, weeklyPrices: [1043.19, 1133.99, 1211.38, 1051.77, 1048.51], weeklyChange: 0.51, dayChange: -0.31, sortRank: 0, periodReturns: { '1M': 39.6, 'YTD': 267.4, '6M': 265.7, '1Y': 724 },
      priceHistory: { '1D': [1051.77, 1040, 1048.16, 1037.31, 1050.97, 1042.36, 1041.56, 1039.02, 1040.3, 1044.41, 1045.79, 1038.77, 1040.19, 1032.24, 1018.67, 1022.51, 1014.12, 1026.64, 1024.53, 1016.72, 997.88, 1012.91, 1026.37, 1048.51], '1W': [1043.19, 1133.99, 1211.38, 1051.77, 1048.51], '1M': [895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51], 'YTD': [285.41, 327.02, 336.63, 397.58, 435.79, 382.89, 413.97, 417.35, 415.56, 397.05, 405.35, 461.73, 382.09, 367.85, 421.51, 456.23, 487.48, 518.46, 666.59, 766.58, 698.74, 928.41, 1079.57, 935.89, 1020.76, 1048.51], '6M': [286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 795.33, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1048.51], '1Y': [127.25, 121.74, 123.11, 113.26, 111.73, 109.14, 108.78, 124.27, 117.21, 117.75, 124.21, 150.57, 168.89, 156.83, 183.75, 192.33, 191.94, 198.47, 226.63, 237.5, 244.9, 225.92, 230.26, 226.65, 258.46, 248.55, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1048.51] },
      velocityScore: { '1D': -5.7, '1W': -13.9, '1M': -7.3, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 49.6, revenueGrowth: 196, eps: 21.14, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { SOXX: 8.27, PSI: 5.59, XSD: 2.57, DRAM: 4.91 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 5.03, proScore: 3.78, coverage: 0.75,
      price: 519.74, weeklyPrices: [512.48, 537.37, 551.63, 519.85, 519.74], weeklyChange: 1.42, dayChange: -0.02, sortRank: 0, periodReturns: { '1M': 11.2, 'YTD': 142.7, '6M': 141.7, '1Y': 262.4 },
      priceHistory: { '1D': [519.85, 511.32, 521.36, 514.3, 521.83, 518.56, 517.25, 519.98, 519.09, 520.91, 521.55, 518.81, 515.81, 512.72, 508.82, 510.36, 509.74, 512.71, 512.2, 508.7, 505.25, 511.21, 513.22, 519.74], '1W': [512.48, 537.37, 551.63, 519.85, 519.74], '1M': [503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74], 'YTD': [214.16, 204.68, 227.92, 253.73, 252.18, 192.5, 205.94, 203.37, 203.68, 199.45, 197.74, 199.46, 220.27, 210.21, 236.64, 258.12, 303.46, 337.11, 421.39, 448.29, 414.05, 495.54, 542.52, 475.51, 507.29, 519.74], '6M': [215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 458.79, 420.99, 503.89, 521.54, 475.51, 507.29, 519.74], '1Y': [143.4, 138.52, 144.16, 160.41, 162.12, 176.31, 163.12, 184.42, 165.2, 167.13, 161.79, 155.67, 157.92, 161.27, 169.73, 232.89, 238.6, 230.23, 264.33, 256.33, 258.89, 223.55, 214.24, 215.98, 221.43, 201.06, 215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 420.99, 503.89, 521.54, 475.51, 507.29, 519.74] },
      velocityScore: { '1D': 2.2, '1W': -14.3, '1M': -33.7, '6M': null }, isNew: false,
      marketCap: '$847B', pe: 172.1, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 7.69, PSI: 4.91, XSD: 2.5, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.72, proScore: 3.54, coverage: 0.75,
      price: 131.65, weeklyPrices: [121.10, 133.99, 140.94, 132.28, 131.65], weeklyChange: 8.71, dayChange: -0.48, sortRank: 0, periodReturns: { '1M': 9.9, 'YTD': 256.8, '6M': 264.1, '1Y': 493 },
      priceHistory: { '1D': [132.28, 130.53, 131.93, 131.03, 134.84, 134.57, 134.71, 134.2, 134.25, 135.01, 134.65, 133.04, 131.97, 131.41, 130.35, 130.29, 129.2, 130.57, 130.35, 129.5, 128.35, 130.03, 130.11, 131.65], '1W': [121.1, 133.99, 140.94, 132.28, 131.65], '1M': [123.52, 121.77, 120.89, 114.68, 109.33, 107.93, 112.71, 111.78, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65], 'YTD': [36.9, 41.11, 48.32, 54.32, 48.66, 48.24, 46.48, 44.62, 45.46, 45.95, 45.25, 45.03, 47.18, 48.03, 61.72, 64.94, 65.27, 94.75, 113.01, 120.61, 110.8, 121.77, 112.71, 107.92, 117.05, 131.65], '6M': [36.16, 39.38, 45.55, 46.96, 42.49, 48.81, 50.24, 46.79, 43.63, 45.5, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 129.44, 108.17, 123.52, 107.93, 107.92, 117.05, 131.65], '1Y': [22.2, 21.88, 23.82, 22.8, 22.63, 19.8, 20.41, 22.22, 23.54, 24.85, 24.61, 24.61, 30.57, 33.99, 37.3, 37.8, 37.15, 36.92, 41.34, 38.38, 37.89, 35.11, 36.81, 40.5, 39.51, 36.28, 36.16, 39.38, 45.55, 46.96, 42.49, 48.81, 50.24, 46.18, 46.12, 43.1, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 108.17, 123.52, 107.93, 107.92, 117.05, 131.65] },
      velocityScore: { '1D': 1.7, '1W': -1.9, '1M': -5.9, '6M': null }, isNew: false,
      marketCap: '$662B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 6.37, PSI: 5.1, XSD: 2.69, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 4.61, proScore: 3.46, coverage: 0.75,
      price: 199, weeklyPrices: [204.65, 210.69, 208.65, 200.04, 199.00], weeklyChange: -2.76, dayChange: -0.5, sortRank: 0, periodReturns: { '1M': -7.6, 'YTD': 6.7, '6M': 5.5, '1Y': 29 },
      priceHistory: { '1D': [200, 200.7, 200.01, 198.98, 200.01, 200.81, 201.01, 200.91, 200.78, 200.79, 200.71, 199.78, 199.36, 198.87, 197.96, 197.96, 197.66, 198.31, 198, 197.46, 196.98, 197.74, 197.31, 199], '1W': [204.65, 210.69, 208.65, 200.04, 199], '1M': [214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199], 'YTD': [186.5, 185.04, 187.05, 184.84, 192.51, 171.88, 186.94, 187.9, 184.89, 183.34, 183.14, 180.4, 178.68, 175.75, 183.91, 198.87, 202.5, 209.25, 207.83, 220.78, 220.61, 212.6, 214.75, 208.19, 207.41, 199], '6M': [188.61, 188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 219.44, 222.32, 214.86, 222.82, 208.19, 207.41, 199], '1Y': [154.31, 157.25, 164.1, 173, 173.74, 177.87, 179.42, 181.59, 175.4, 181.6, 171.66, 177.17, 176.24, 177.69, 188.89, 192.57, 179.83, 180.28, 207.04, 195.21, 193.8, 186.52, 180.26, 183.38, 180.93, 174.14, 188.61, 188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 222.32, 214.86, 222.82, 208.19, 207.41, 199] },
      velocityScore: { '1D': 3.9, '1W': 15.7, '1M': 1.8, '6M': null }, isNew: false,
      marketCap: '$4.8T', pe: 30.5, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.5,
      etfPresence: { SOXX: 7.23, PSI: 4.44, XSD: 2.17, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.54, proScore: 2.66, coverage: 0.75,
      price: 413.16, weeklyPrices: [414.45, 434.46, 445.48, 407.26, 413.16], weeklyChange: -0.31, dayChange: 1.45, sortRank: 0, periodReturns: { '1M': 4.1, 'YTD': 52.3, '6M': 48.9, '1Y': 76.1 },
      priceHistory: { '1D': [407.26, 406.98, 409.26, 410.17, 410.4, 413.58, 412.04, 410.95, 411.2, 413.2, 412.53, 411.39, 411.23, 409.38, 408.7, 409.23, 408.92, 410.54, 410.05, 409.38, 409.19, 410.36, 409.51, 413.16], '1W': [414.45, 434.46, 445.48, 407.26, 413.16], '1M': [419.94, 416.88, 419.01, 413.85, 402.69, 423.2, 437.67, 428.76, 401.39, 403.89, 404.62, 392.67, 412.13, 417.79, 427.58, 416, 414.45, 434.46, 445.48, 407.26, 413.16], 'YTD': [271.2, 299.16, 302.1, 308.52, 318.7, 322.12, 331.36, 345.3, 354.35, 329.72, 307.27, 308.59, 322.03, 320.58, 351.36, 347.94, 381.42, 389.31, 415.63, 419.65, 414.31, 416.88, 437.67, 404.62, 416, 413.16], '6M': [277.56, 273.74, 300.93, 300.25, 304.01, 316.86, 322.97, 337.1, 355.15, 352.41, 319.71, 310.92, 312.19, 303.1, 327.41, 348.6, 375.27, 383.26, 404.77, 422.73, 418.58, 419.94, 423.2, 404.62, 416, 413.16], '1Y': [234.68, 245.15, 245.13, 240.97, 226.37, 224.63, 220.69, 237.63, 244.87, 255.5, 246.11, 248.24, 249.05, 247.53, 241.67, 237.88, 238.15, 240.36, 235.04, 236, 241.44, 232.2, 257.92, 277.26, 283.39, 274.92, 277.56, 273.74, 300.93, 300.25, 304.01, 316.86, 322.97, 337.51, 356.09, 338.99, 319.71, 310.92, 312.19, 303.1, 327.41, 348.6, 375.27, 383.26, 404.77, 419.65, 418.58, 419.94, 423.2, 404.62, 416, 413.16] },
      velocityScore: { '1D': -0.7, '1W': 10.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$201B', pe: 61.5, revenueGrowth: 37, eps: 6.72, grossMargin: 64, dividendYield: 1.08,
      etfPresence: { SOXX: 3.75, PSI: 4.62, XSD: 2.25, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 5.55, proScore: 2.77, coverage: 0.5,
      price: 588.97, weeklyPrices: [592.92, 617.11, 640.18, 585.88, 588.97], weeklyChange: -0.67, dayChange: 0.53, sortRank: 0, periodReturns: { '1M': 36.3, 'YTD': 129.2, '6M': 125.8, '1Y': 221.7 },
      priceHistory: { '1D': [585.88, 582.87, 588.27, 582.93, 587.83, 592.7, 586.56, 586.72, 588, 590.82, 591.17, 588.48, 586.53, 583.34, 575.33, 578.51, 574.79, 576.99, 574.86, 572.7, 571.62, 574.05, 576.62, 588.97], '1W': [592.92, 617.11, 640.18, 585.88, 588.97], '1M': [454.89, 448.25, 449.68, 450.06, 458.17, 490.05, 500.77, 501.7, 453.01, 492.17, 499.21, 497.01, 552.64, 567.25, 585.78, 568.23, 592.92, 617.11, 640.18, 585.88, 588.97], 'YTD': [256.99, 281.64, 319.08, 318.79, 341.34, 303.99, 328.39, 369.83, 375.72, 346.53, 337.27, 349.47, 369.34, 353.8, 397.81, 394.26, 403.48, 382.59, 428.62, 431.2, 406.91, 448.25, 500.77, 499.21, 568.23, 588.97], '6M': [260.78, 268.87, 301.18, 327.01, 319.46, 328.4, 330.57, 354.91, 373.55, 372.18, 338.94, 346.18, 361.79, 323.12, 354.31, 395.64, 394.33, 381.11, 410.82, 443.62, 413.57, 454.89, 490.05, 499.21, 568.23, 588.97], '1Y': [183.07, 190.01, 198.03, 192.52, 188.12, 180.06, 178.14, 190.03, 160.96, 164.39, 158.24, 170.15, 189.76, 199.6, 223.59, 220.3, 227.58, 220.56, 235.75, 240.89, 230.73, 235.13, 249.97, 269.44, 270.11, 253.5, 260.78, 268.87, 301.18, 327.01, 319.46, 328.4, 330.57, 359.13, 377.93, 351.32, 338.94, 346.18, 361.79, 323.12, 354.31, 395.64, 394.33, 381.11, 410.82, 431.2, 413.57, 454.89, 490.05, 499.21, 568.23, 588.97] },
      velocityScore: { '1D': -1.1, '1W': -3.5, '1M': -5.5, '6M': null }, isNew: false,
      marketCap: '$468B', pe: 55.6, revenueGrowth: 11, eps: 10.6, grossMargin: 49, dividendYield: 0.36,
      etfPresence: { SOXX: 4.97, PSI: 6.13, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 5.32, proScore: 2.66, coverage: 0.5,
      price: 240.48, weeklyPrices: [238.73, 259.56, 269.16, 244.49, 240.48], weeklyChange: 0.73, dayChange: -1.64, sortRank: 0, periodReturns: { '1M': 27.3, 'YTD': 97.9, '6M': 88.3, '1Y': 169.2 },
      priceHistory: { '1D': [244.49, 239.49, 242.71, 240.61, 240.91, 242.91, 240.1, 240.46, 239.99, 240.88, 241.11, 239.48, 238.99, 238.21, 235.8, 236.72, 236.23, 237.75, 236.99, 235.98, 236.07, 236.57, 238.32, 240.48], '1W': [238.73, 259.56, 269.16, 244.49, 240.48], '1M': [201.14, 195.72, 192.76, 192.17, 194, 204.52, 212.51, 213.11, 192.92, 210.81, 213.94, 213.56, 241.16, 254.54, 256.42, 237.33, 238.73, 259.56, 269.16, 244.49, 240.48], 'YTD': [121.51, 132.46, 154.5, 150, 168.47, 133.1, 145.09, 146.99, 152.43, 142.94, 140.96, 148.24, 154.38, 151.98, 172.73, 174.81, 181.21, 181.62, 181.63, 181.13, 174.06, 195.72, 212.51, 213.94, 237.33, 240.48], '6M': [127.7, 127.45, 140, 156.78, 154.3, 141.04, 144.02, 146.41, 148.77, 153.49, 142.91, 143.82, 151.14, 138.26, 154.88, 179.59, 178.54, 180.9, 173.29, 184.52, 175.65, 201.14, 204.52, 213.94, 237.33, 240.48], '1Y': [89.35, 92.11, 92.86, 93.71, 90.42, 87.9, 88.83, 94.95, 87.84, 88.89, 87.33, 95.93, 104.67, 105.91, 113.93, 105.35, 108.7, 111.43, 123.53, 122.71, 119.9, 116.75, 115.91, 120.81, 124.62, 122.24, 127.7, 127.45, 140, 156.78, 154.3, 141.04, 144.02, 147.02, 150.66, 144.13, 142.91, 143.82, 151.14, 138.26, 154.88, 179.59, 178.54, 180.9, 173.29, 181.13, 175.65, 201.14, 204.52, 213.94, 237.33, 240.48] },
      velocityScore: { '1D': -1.5, '1W': 12.7, '1M': 1.9, '6M': null }, isNew: false,
      marketCap: '$314B', pe: 68.3, revenueGrowth: 12, eps: 3.52, grossMargin: 61, dividendYield: 0.38,
      etfPresence: { SOXX: 4.85, PSI: 5.79, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 4.96, proScore: 2.48, coverage: 0.5,
      price: 374.8, weeklyPrices: [374.18, 389.04, 409.54, 371.33, 374.80], weeklyChange: 0.17, dayChange: 0.93, sortRank: 0, periodReturns: { '1M': 22.7, 'YTD': 119, '6M': 111.4, '1Y': 290.3 },
      priceHistory: { '1D': [371.33, 365.88, 370.1, 368.25, 371.55, 375.63, 369.18, 368.81, 368.67, 369.8, 370.49, 368.82, 367.81, 366.78, 362.76, 365.15, 363.13, 365.7, 364.69, 364.02, 362.97, 364.4, 368.17, 374.8], '1W': [374.18, 389.04, 409.54, 371.33, 374.8], '1M': [322.68, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04, 409.54, 371.33, 374.8], 'YTD': [171.18, 200.96, 217.47, 220.7, 248.17, 213.31, 231.29, 237.39, 239.07, 214.68, 209.49, 224.71, 233.45, 222.01, 258.76, 265.16, 265.55, 248.75, 297.17, 289.24, 273.38, 318.93, 343.71, 327.16, 369.34, 374.8], '6M': [177.33, 185.06, 218.36, 222.96, 222.87, 237.5, 229.28, 235.53, 242.27, 231, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 296.05, 277.96, 322.68, 334.41, 327.16, 369.34, 374.8], '1Y': [96.02, 98.83, 101.06, 100.79, 97.78, 94.84, 95.94, 106.74, 99.15, 103.67, 100.42, 115.58, 126.32, 128.13, 146.99, 141, 144.78, 141.25, 160.67, 165.05, 161.42, 148.8, 155.14, 157.09, 168.71, 164.7, 177.33, 185.06, 218.36, 222.96, 222.87, 237.5, 229.28, 235.58, 244.25, 217.27, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 277.96, 322.68, 334.41, 327.16, 369.34, 374.8] },
      velocityScore: { '1D': -1.6, '1W': 6.4, '1M': -6.8, '6M': null }, isNew: false,
      marketCap: '$469B', pe: 71.1, revenueGrowth: 24, eps: 5.27, grossMargin: 50, dividendYield: 0.28,
      etfPresence: { SOXX: 4.45, PSI: 5.48, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 4.35, proScore: 2.18, coverage: 0.5,
      price: 382.07, weeklyPrices: [392.90, 411.35, 392.13, 380.15, 382.07], weeklyChange: -2.76, dayChange: 0.51, sortRank: 0, periodReturns: { '1M': -7.7, 'YTD': 10.4, '6M': 9.1, '1Y': 44.4 },
      priceHistory: { '1D': [380.15, 382.2, 382.24, 380.63, 382.6, 383.62, 385.89, 385.63, 384.48, 384.23, 385.66, 384.06, 383.89, 383.23, 380.77, 380.74, 380.3, 381.49, 380.77, 378.22, 377.8, 378.42, 378.08, 382.07], '1W': [392.9, 411.35, 392.13, 380.15, 382.07], '1M': [422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07], 'YTD': [346.1, 332.48, 343.02, 325.49, 330.73, 310.51, 331.17, 333.99, 321.7, 332.77, 335.97, 315.93, 318.81, 313.49, 354.91, 396.72, 422.65, 405.45, 425.44, 419.3, 411.07, 421.86, 479.23, 392.16, 376.71, 382.07], '6M': [350.22, 347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 428.43, 420.71, 422.01, 481.57, 392.16, 376.71, 382.07], '1Y': [264.65, 269.9, 275.4, 286.45, 288.71, 293.7, 301.67, 309.09, 291.17, 300.25, 306.1, 359.63, 345.35, 336.1, 338.18, 345.02, 351.33, 340.3, 385.98, 358.98, 355.22, 354.42, 397.57, 381.03, 406.37, 329.88, 350.22, 347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 420.71, 422.01, 481.57, 392.16, 376.71, 382.07] },
      velocityScore: { '1D': 5.3, '1W': 19.8, '1M': -40.9, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 63.6, revenueGrowth: 48, eps: 6.01, grossMargin: 76, dividendYield: 0.68,
      etfPresence: { SOXX: 6.49, PSI: false, XSD: 2.22, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 3.8, proScore: 1.9, coverage: 0.5,
      price: 276.7, weeklyPrices: [289.54, 310.58, 307.86, 279.04, 276.70], weeklyChange: -4.43, dayChange: -0.84, sortRank: 0, periodReturns: { '1M': 40.9, 'YTD': 225.6, '6M': 219.9, '1Y': 264.4 },
      priceHistory: { '1D': [279.04, 270.68, 270.15, 266.54, 271.58, 273.66, 272.15, 269.87, 270.57, 272.26, 271.72, 271.1, 269.78, 267.92, 266, 268.48, 267.26, 269.59, 269.11, 267.5, 265, 269.58, 271.46, 276.7], '1W': [289.54, 310.58, 307.86, 279.04, 276.7], '1M': [208.26, 198.7, 204.83, 205, 219.43, 290.79, 301.65, 316.43, 263.47, 288.85, 266.88, 252.59, 280.71, 279.7, 308.88, 278.67, 289.54, 310.58, 307.86, 279.04, 276.7], 'YTD': [84.98, 83.45, 80.38, 83.1, 81.34, 74.21, 78.23, 79.61, 79.29, 75.68, 87.67, 87.62, 98.45, 106.71, 119.93, 134.6, 157.32, 156.57, 172.15, 164.5, 176.27, 198.7, 301.65, 266.88, 278.67, 276.7], '6M': [86.49, 89.39, 83.22, 80.46, 81.77, 78.66, 82.35, 78.61, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 170.84, 168.93, 208.26, 290.79, 266.88, 278.67, 276.7], '1Y': [75.93, 74.25, 73.36, 72.01, 74.04, 80.37, 75.32, 79.32, 71.22, 74.79, 64.1, 66.59, 74.23, 83.81, 86.2, 90.68, 88.89, 81.05, 90.15, 92.9, 89.33, 81.32, 87.72, 98.19, 89.43, 84.47, 86.49, 89.39, 83.22, 80.46, 81.77, 78.66, 82.35, 79.01, 78.39, 77.51, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 168.93, 208.26, 290.79, 266.88, 278.67, 276.7] },
      velocityScore: { '1D': -2.1, '1W': -40.6, '1M': -43.8, '6M': null }, isNew: false,
      marketCap: '$242B', pe: 95.4, revenueGrowth: 28, eps: 2.9, grossMargin: 52, dividendYield: 0.09,
      etfPresence: { SOXX: 5.19, PSI: false, XSD: 2.41, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 3.07, proScore: 1.54, coverage: 0.5,
      price: 303.11, weeklyPrices: [301.88, 322.86, 332.28, 304.36, 303.11], weeklyChange: 0.41, dayChange: -0.41, sortRank: 0, periodReturns: { '1M': -2, 'YTD': 74.7, '6M': 71.1, '1Y': 47.6 },
      priceHistory: { '1D': [304.36, 303.54, 303.55, 303.94, 306.1, 307.34, 304.89, 304.1, 304.01, 304.48, 304.64, 304.19, 303.95, 302.98, 301.48, 302.02, 302.19, 303.45, 303.55, 303.21, 302.64, 303.77, 303.46, 303.11], '1W': [301.88, 322.86, 332.28, 304.36, 303.11], '1M': [324.89, 317.45, 315.95, 305.68, 293.2, 308.12, 308.59, 305.37, 285.06, 290.9, 288.63, 282.01, 297.1, 301.12, 313.34, 305.71, 301.88, 322.86, 332.28, 304.36, 303.11], 'YTD': [173.49, 188.45, 189.12, 194.99, 218.97, 223.98, 223, 218.05, 212.63, 197.98, 190.05, 190.78, 196.77, 196.3, 214.98, 216.29, 236.31, 269.22, 289.44, 295.17, 302.31, 317.45, 308.59, 288.63, 305.71, 303.11], '6M': [177.13, 177.52, 190.31, 191.58, 196.59, 225.01, 218.77, 226.16, 219.86, 209.82, 196.2, 194.13, 188.63, 186.42, 199.74, 218.87, 233.15, 265, 281, 297.76, 300.6, 324.89, 308.12, 288.63, 305.71, 303.11], '1Y': [205.38, 215.59, 219.66, 216.59, 185.69, 181.06, 185.91, 193.29, 200.77, 205.47, 187.29, 184.35, 181.62, 182.04, 182.32, 178.96, 175.27, 170.71, 160.26, 163.57, 163.09, 157.09, 165.35, 180.12, 181.67, 176.19, 177.13, 177.52, 190.31, 191.58, 196.59, 225.01, 218.77, 225.69, 213.35, 202.67, 196.2, 194.13, 188.63, 186.42, 199.74, 218.87, 233.15, 265, 281, 295.17, 300.6, 324.89, 308.12, 288.63, 305.71, 303.11] },
      velocityScore: { '1D': -0.6, '1W': 6.9, '1M': -51.3, '6M': null }, isNew: false,
      marketCap: '$276B', pe: 51.9, revenueGrowth: 19, eps: 5.84, grossMargin: 57, dividendYield: 1.87,
      etfPresence: { SOXX: 3.8, PSI: false, XSD: 2.34, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.92, proScore: 1.46, coverage: 0.5,
      price: 294.06, weeklyPrices: [298.20, 313.27, 323.24, 299.94, 294.06], weeklyChange: -1.39, dayChange: -1.96, sortRank: 0, periodReturns: { '1M': -7.1, 'YTD': 35.5, '6M': 30.5, '1Y': 36 },
      priceHistory: { '1D': [299.94, 296.3, 294.76, 294.83, 294.77, 298.04, 297.4, 296.71, 296.13, 294.49, 294.91, 293.15, 293.02, 291.15, 289.39, 290.29, 289.6, 291.48, 290.6, 290.18, 289.42, 290.95, 291.2, 294.06], '1W': [298.2, 313.27, 323.24, 299.94, 294.06], '1M': [332.67, 329.24, 330.28, 321.35, 311.38, 323.62, 321.88, 322.22, 295.96, 301.14, 297.41, 285.56, 302.55, 304.86, 315.88, 302.89, 298.2, 313.27, 323.24, 299.94, 294.06], 'YTD': [217.06, 237.89, 238.6, 236.75, 233.5, 222.13, 242.19, 232.11, 232.23, 210.58, 191.22, 192.69, 197.61, 195.58, 205.67, 209.39, 225.75, 289.25, 303.55, 294.23, 294.28, 329.24, 321.88, 297.41, 302.89, 294.06], '6M': [225.26, 221.28, 241.15, 237.11, 231.05, 231.08, 228.91, 244.43, 231.16, 224.76, 205.25, 191.89, 193.39, 187.39, 195.12, 209.89, 224.5, 230.39, 292.35, 305.99, 291.68, 332.67, 323.62, 297.41, 302.89, 294.06], '1Y': [216.28, 231.15, 233.19, 224.5, 224.43, 213.77, 205.92, 230.52, 228.77, 237.67, 225.39, 223.21, 226.51, 226.81, 227.71, 221.42, 217.23, 217.16, 204.71, 210.44, 204.08, 190.06, 193.76, 226.16, 231.83, 222.08, 225.26, 221.28, 241.15, 237.11, 231.05, 231.08, 228.91, 245.09, 234.63, 215.25, 205.25, 191.89, 193.39, 187.39, 195.12, 209.89, 224.5, 230.39, 292.35, 294.23, 291.68, 332.67, 323.62, 297.41, 302.89, 294.06] },
      velocityScore: { '1D': 0.7, '1W': 6.6, '1M': -31.5, '6M': null }, isNew: false,
      marketCap: '$74B', pe: 28.1, revenueGrowth: 12, eps: 10.47, grossMargin: 56, dividendYield: 1.35,
      etfPresence: { SOXX: 3.56, PSI: false, XSD: 2.27, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 2.71, proScore: 1.36, coverage: 0.5,
      price: 197.41, weeklyPrices: [212.97, 226.11, 221.90, 204.13, 197.41], weeklyChange: -7.31, dayChange: -3.29, sortRank: 0, periodReturns: { '1M': -17.1, 'YTD': 15.4, '6M': 13, '1Y': 26.6 },
      priceHistory: { '1D': [204.13, 197.03, 194.93, 195.68, 196.22, 197.19, 197.9, 196.74, 196.13, 196.7, 196.91, 196.48, 196, 195, 195.73, 195.55, 195.67, 195.82, 194.85, 193.92, 193.4, 194.24, 193.95, 197.41], '1W': [212.97, 226.11, 221.9, 204.13, 197.41], '1M': [248.82, 233.4, 243.29, 251.02, 228.99, 240.84, 250.01, 242.57, 215.94, 217.77, 205.42, 191.2, 202.96, 211.72, 220.81, 214.07, 212.97, 226.11, 221.9, 204.13, 197.41], 'YTD': [171.05, 181.87, 161.39, 157.8, 152.22, 136.3, 138.47, 141.27, 145.59, 137, 131.15, 130.47, 130.35, 127.28, 127.75, 133.05, 136.07, 156, 192.57, 210.31, 195.61, 233.4, 250.01, 205.42, 214.07, 197.41], '6M': [174.77, 172.98, 177.78, 159.42, 154.52, 152.62, 138.93, 140.7, 140.41, 141.03, 138.11, 129.39, 128.35, 127.07, 124.07, 132.84, 135.56, 150, 186.55, 237.53, 203.64, 248.82, 240.84, 205.42, 214.07, 197.41], '1Y': [155.93, 162.32, 159.09, 152.61, 158.84, 146.76, 145.84, 156.59, 155.44, 159.77, 159.71, 161.51, 168.13, 169.68, 168.85, 165.66, 162.97, 169.27, 178.67, 179.72, 176.67, 166.11, 165.14, 174.35, 181.27, 174.19, 174.77, 172.98, 177.78, 159.42, 154.52, 152.62, 138.93, 142.63, 144.78, 138.13, 138.11, 129.39, 128.35, 127.07, 124.07, 132.84, 135.56, 150, 186.55, 210.31, 203.64, 248.82, 240.84, 205.42, 214.07, 197.41] },
      velocityScore: { '1D': -0.7, '1W': -9.3, '1M': -45.4, '6M': null }, isNew: false,
      marketCap: '$208B', pe: 21.2, revenueGrowth: -4, eps: 9.31, grossMargin: 55, dividendYield: 1.8,
      etfPresence: { SOXX: 3.1, PSI: false, XSD: 2.33, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.65, proScore: 1.32, coverage: 0.5,
      price: 1434.95, weeklyPrices: [1448.21, 1563.70, 1537.88, 1423.76, 1434.95], weeklyChange: -0.92, dayChange: 0.79, sortRank: 0, periodReturns: { '1M': -9.7, 'YTD': 58.3, '6M': 50.5, '1Y': 98.5 },
      priceHistory: { '1D': [1423.76, 1398.62, 1404.27, 1397.61, 1417.94, 1430.13, 1419.65, 1425.28, 1432.45, 1442.17, 1445, 1432.63, 1428, 1425.4, 1414.34, 1415.81, 1413.36, 1422.41, 1422.68, 1420.13, 1413.35, 1418.08, 1417.61, 1434.95], '1W': [1448.21, 1563.7, 1537.88, 1423.76, 1434.95], '1M': [1662.98, 1620.17, 1633.17, 1566.21, 1542.39, 1624.99, 1689.89, 1652.6, 1481.05, 1559.18, 1531.98, 1473.04, 1589.55, 1577.32, 1652.29, 1498.77, 1448.21, 1563.7, 1537.88, 1423.76, 1434.95], 'YTD': [906.36, 959.09, 1009.54, 1076.67, 1183.15, 1155.99, 1155.93, 1175.22, 1180.13, 1078.44, 1033.88, 1075.29, 1118.66, 1119.51, 1334.21, 1353, 1522.04, 1526.84, 1652.35, 1599.52, 1468.11, 1620.17, 1689.89, 1531.98, 1498.77, 1434.95], '6M': [953.25, 936.31, 958.97, 1033.17, 1068.14, 1173.22, 1206.18, 1171.47, 1190.06, 1142.58, 1062, 1077.4, 1076.35, 1002.34, 1191.22, 1363.42, 1527.95, 1504.08, 1588.12, 1661.1, 1486.33, 1662.98, 1624.99, 1531.98, 1498.77, 1434.95], '1Y': [722.82, 764.4, 740.45, 713.57, 713, 711.24, 805.85, 861.8, 826.27, 866.32, 848.11, 840.38, 917.78, 891.39, 930.51, 979.25, 1007.93, 1001.4, 1094.08, 1000.15, 958.35, 884.65, 924.95, 952.74, 981.48, 929.48, 953.25, 936.31, 958.97, 1033.17, 1068.14, 1173.22, 1206.18, 1173.18, 1213.67, 1074.37, 1062, 1077.4, 1076.35, 1002.34, 1191.22, 1363.42, 1527.95, 1504.08, 1588.12, 1599.52, 1486.33, 1662.98, 1624.99, 1531.98, 1498.77, 1434.95] },
      velocityScore: { '1D': 0, '1W': 0.8, '1M': -36.2, '6M': null }, isNew: false,
      marketCap: '$70B', pe: 102.9, revenueGrowth: 26, eps: 13.95, grossMargin: 55, dividendYield: 0.56,
      etfPresence: { SOXX: 3.2, PSI: false, XSD: 2.1, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 2.63, proScore: 1.31, coverage: 0.5,
      price: 399.92, weeklyPrices: [374.68, 417.07, 439.66, 397.02, 399.92], weeklyChange: 6.74, dayChange: 0.73, sortRank: 0, periodReturns: { '1M': 30.3, 'YTD': 140.4, '6M': 135.3, '1Y': 346.2 },
      priceHistory: { '1D': [397.02, 402.6, 400.02, 397.11, 407.02, 410.27, 406.34, 403.64, 403.01, 403.48, 402.86, 399.23, 399.11, 395.31, 391.3, 395.4, 393.27, 397.4, 396.17, 392.89, 388.95, 393.31, 395.11, 399.92], '1W': [374.68, 417.07, 439.66, 397.02, 399.92], '1M': [318.72, 325.33, 349.17, 342.85, 320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 361.71, 374.68, 417.07, 439.66, 397.02, 399.92], 'YTD': [166.36, 156.73, 174.45, 176.35, 160.46, 142.82, 126.58, 132.62, 124.67, 120, 119.9, 126.34, 120.33, 106.33, 129.46, 172.09, 194.06, 196.85, 213.91, 204.42, 244.26, 325.33, 363.54, 341.7, 361.71, 399.92], '6M': [169.97, 179.56, 162.61, 182, 163.25, 152.44, 187.67, 129.32, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 207.35, 215.58, 318.72, 355.76, 341.7, 361.71, 399.92], '1Y': [89.63, 88.57, 97.02, 97.95, 121.68, 136.73, 174.39, 193.64, 172.45, 179.2, 187.95, 232.9, 251.88, 200.64, 209.6, 225.43, 161.46, 154.85, 173.62, 181.94, 157.79, 142.01, 154.22, 152.51, 173.7, 145.88, 169.97, 179.56, 162.61, 182, 163.25, 152.44, 187.67, 123.69, 128.4, 109.8, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 215.58, 318.72, 355.76, 341.7, 361.71, 399.92] },
      velocityScore: { '1D': -3, '1W': -23.4, '1M': -37.9, '6M': null }, isNew: false,
      marketCap: '$69B', pe: 272.1, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.64, PSI: false, XSD: 2.61, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.33, proScore: 1.17, coverage: 0.5,
      price: 92.48, weeklyPrices: [94.11, 99.77, 102.71, 93.26, 92.48], weeklyChange: -1.73, dayChange: -0.84, sortRank: 0, periodReturns: { '1M': -1, 'YTD': 45.1, '6M': 41.5, '1Y': 29.2 },
      priceHistory: { '1D': [93.26, 92.14, 91.8, 92.5, 92.45, 93.18, 93.03, 92.94, 92.82, 93.13, 93.1, 92.33, 91.68, 90.86, 90.26, 90.39, 90.13, 90.75, 90.68, 90.32, 89.99, 90.94, 91.64, 92.48], '1W': [94.11, 99.77, 102.71, 93.26, 92.48], '1M': [98.05, 96.85, 96.04, 94.65, 91.52, 96.96, 96.55, 96.3, 88.34, 91.37, 91.47, 87.91, 92.94, 95.24, 100.32, 95.63, 94.11, 99.77, 102.71, 93.26, 92.48], 'YTD': [63.72, 73.53, 74.45, 75.47, 79.36, 78.04, 78.92, 77.16, 74.97, 67.81, 62.73, 64.71, 65.16, 65.38, 71.22, 74.49, 82.48, 90.17, 102.92, 97.7, 91.81, 96.85, 96.55, 91.47, 95.63, 92.48], '6M': [65.36, 65.03, 75.22, 74.7, 74.79, 78.08, 74.41, 78.56, 76.6, 74.31, 65, 63.83, 64.34, 60.06, 67.51, 74.5, 80.93, 84.26, 98.48, 99.03, 92.76, 98.05, 96.96, 91.47, 95.63, 92.48], '1Y': [71.6, 73.16, 75.08, 74.3, 67.81, 67.59, 66.17, 65.75, 66.76, 66.65, 64.43, 65.02, 66.26, 64.84, 66.13, 65.86, 65.21, 64.5, 62.54, 60.8, 55.63, 50.8, 52.57, 64.72, 69.09, 64.06, 65.36, 65.03, 75.22, 74.7, 74.79, 78.08, 74.41, 78.94, 75.93, 71.39, 65, 63.83, 64.34, 60.06, 67.51, 74.5, 80.93, 84.26, 98.48, 97.7, 92.76, 98.05, 96.96, 91.47, 95.63, 92.48] },
      velocityScore: { '1D': -1.7, '1W': -0.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$50B', pe: 420.4, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 1.95,
      etfPresence: { SOXX: 2.35, PSI: false, XSD: 2.31, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.32, proScore: 1.16, coverage: 0.5,
      price: 268.99, weeklyPrices: [249.33, 271.83, 302.52, 272.01, 268.99], weeklyChange: 7.89, dayChange: -1.11, sortRank: 0, periodReturns: { '1M': 23.2, 'YTD': 86.9, '6M': 79.1, '1Y': 191.7 },
      priceHistory: { '1D': [272, 268.94, 270.24, 267.21, 271.48, 271.52, 271.52, 273.44, 270.96, 270.93, 268.79, 267, 268.02, 265.67, 265.06, 265.03, 262.69, 266, 264.51, 262.94, 260.42, 264.54, 265.76, 268.99], '1W': [249.33, 271.83, 302.52, 272.01, 268.99], '1M': [221.64, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 217.5, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83, 302.52, 272.01, 268.99], 'YTD': [143.89, 141.59, 149.12, 135.1, 129.47, 98.06, 121.78, 130.66, 114.48, 114.74, 111.57, 101.72, 103.91, 95.92, 107.93, 168.35, 189.49, 175.77, 198.29, 198.57, 168.99, 221.23, 214.6, 234.32, 239.18, 268.99], '6M': [150.19, 143.22, 150.42, 150.97, 128.02, 119.96, 123.41, 121.44, 124.05, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 210.22, 156.27, 221.64, 229, 234.32, 239.18, 268.99], '1Y': [92.2, 89.37, 97.29, 98.45, 101.17, 111.55, 117.34, 121.13, 105.99, 122.73, 134, 159.32, 172.31, 144.94, 149.63, 151.15, 131.41, 137.2, 171.52, 173.16, 160.34, 141.88, 164.01, 180.92, 154.47, 138.57, 150.19, 143.22, 150.42, 150.97, 128.02, 119.96, 123.41, 124.8, 120.83, 97.3, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 156.27, 221.64, 229, 234.32, 239.18, 268.99] },
      velocityScore: { '1D': -2.5, '1W': -7.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$50B', pe: 107.6, revenueGrowth: 157, eps: 2.5, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 2.14, PSI: false, XSD: 2.49, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 2.24, proScore: 1.12, coverage: 0.5,
      price: 115.74, weeklyPrices: [112.92, 121.62, 131.55, 117.06, 115.74], weeklyChange: 2.5, dayChange: -1.13, sortRank: 0, periodReturns: { '1M': -0.4, 'YTD': 113.7, '6M': 110.1, '1Y': 115.4 },
      priceHistory: { '1D': [117.06, 113.5, 113.79, 113.72, 114.65, 116.01, 115.11, 114.86, 114.86, 115.43, 114.96, 114.34, 114.16, 113.12, 112.3, 112.44, 112.14, 112.85, 112.6, 112.07, 111.69, 112.84, 113.62, 115.74], '1W': [112.92, 121.62, 131.55, 117.06, 115.74], '1M': [127, 124.89, 123.77, 120.62, 120.92, 128.64, 133.93, 131.82, 117.26, 120.9, 117, 110.17, 115.96, 116.79, 125.9, 118.25, 112.92, 121.62, 131.55, 117.06, 115.74], 'YTD': [54.15, 60.89, 60.28, 63.07, 62.2, 63.1, 70.63, 68.09, 68.16, 60.85, 57.69, 60.46, 63.1, 62.2, 68.49, 72.43, 88.99, 98.86, 105.77, 104.11, 106.02, 124.89, 133.93, 117, 118.25, 115.74], '6M': [55.08, 56.7, 62.16, 60.33, 61.13, 61.53, 65.1, 72.21, 69.47, 66.48, 59.23, 59.88, 59.89, 55.66, 63.79, 72.05, 86.91, 93.3, 102.67, 107.24, 109.43, 127, 128.64, 117, 118.25, 115.74], '1Y': [53.74, 55.95, 59.52, 59.41, 55.44, 56.36, 46.98, 51.89, 49.47, 51.25, 48.06, 49.02, 51.83, 49.77, 48.74, 49.97, 50.36, 51.93, 51.4, 50.08, 49.27, 46.12, 49.64, 54.79, 55.97, 54.34, 55.08, 56.7, 62.16, 60.33, 61.13, 61.53, 65.1, 71.96, 70.03, 63.42, 59.23, 59.88, 59.89, 55.66, 63.79, 72.05, 86.91, 93.3, 102.67, 104.11, 109.43, 127, 128.64, 117, 118.25, 115.74] },
      velocityScore: { '1D': -3.4, '1W': -15.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$45B', pe: 85.1, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 2.17, PSI: false, XSD: 2.31, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 2, avgWeight: 1.75, proScore: 0.87, coverage: 0.5,
      price: 373.08, weeklyPrices: [367.11, 391.41, 396.26, 372.15, 373.08], weeklyChange: 1.63, dayChange: 0.25, sortRank: 0, periodReturns: { '1M': -3.3, 'YTD': 117.8, '6M': 112.2, '1Y': 168.1 },
      priceHistory: { '1D': [372.15, 370.24, 366.96, 366.49, 371.2, 371.98, 370.4, 372.93, 371.8, 373.36, 373.08, 370, 369.64, 366.71, 364.58, 366.37, 365.83, 366.6, 367.25, 365.11, 363.82, 364.05, 364.82, 373.08], '1W': [367.11, 391.41, 396.26, 372.15, 373.08], '1M': [409.68, 400.66, 391.09, 364.64, 353.79, 382.35, 390.34, 382.74, 345.4, 361.86, 358.72, 354.4, 374.76, 379.87, 384.77, 368.32, 367.11, 391.41, 396.26, 372.15, 373.08], 'YTD': [171.28, 167.66, 218.93, 224.29, 227.73, 227.8, 238.99, 242.56, 247.11, 228.98, 215.94, 218.89, 245.04, 229.36, 247.71, 261.16, 277, 269.63, 309.81, 362.76, 358.98, 400.66, 390.34, 358.72, 368.32, 373.08], '6M': [175.81, 174.96, 174.87, 220.68, 218.89, 228.56, 235.7, 244.16, 245.53, 258.54, 218.73, 224.92, 229.26, 209.49, 236.99, 263.92, 285.71, 265.61, 303.57, 365.88, 356.25, 409.68, 382.35, 358.72, 368.32, 373.08], '1Y': [139.17, 139.81, 137.19, 141.76, 137.29, 137.14, 139.03, 125.99, 121.15, 129.63, 131.89, 131.07, 129.73, 123.88, 128.09, 132.98, 136.83, 135.91, 152.66, 149.68, 170.89, 161.57, 168.06, 187.06, 189.86, 171.47, 175.81, 174.96, 174.87, 220.68, 218.89, 228.56, 235.7, 245.59, 248.29, 241.01, 218.73, 224.92, 229.26, 209.49, 236.99, 263.92, 285.71, 265.61, 303.57, 362.76, 356.25, 409.68, 382.35, 358.72, 368.32, 373.08] },
      velocityScore: { '1D': 1.2, '1W': -6.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$28B', pe: 159.4, revenueGrowth: 23, eps: 2.34, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: 1.22, PSI: false, XSD: 2.28, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SWKS', name: 'SKYWORKS SOLUTIONS INC', easyScore: 2, avgWeight: 1.39, proScore: 0.7, coverage: 0.5,
      price: 71.4, weeklyPrices: [69.38, 72.45, 76.18, 73.44, 71.40], weeklyChange: 2.91, dayChange: -2.78, sortRank: 0, periodReturns: { '1M': -13.4, 'YTD': 12.6, '6M': 10.7, '1Y': -3.9 },
      priceHistory: { '1D': [73.44, 71.42, 70.89, 71.45, 71.32, 72.21, 72.25, 72.19, 71.89, 72.25, 72.36, 71.89, 71.83, 71.46, 70.97, 70.39, 70.05, 70.14, 70.07, 70.02, 69.55, 69.95, 69.44, 71.4], '1W': [69.38, 72.45, 76.18, 73.44, 71.4], '1M': [83.42, 78.68, 81.41, 77.85, 75.49, 79.12, 80.66, 79.93, 73.57, 75.37, 73.56, 70.29, 72.73, 73.97, 76.26, 71.42, 69.38, 72.45, 76.18, 73.44, 71.4], 'YTD': [63.41, 60.66, 58.46, 59.67, 55.79, 60.92, 60.73, 59.22, 59.61, 56.48, 55.2, 53.58, 56.19, 53.22, 56.56, 57.93, 61.77, 62.66, 64.97, 66.31, 70.35, 78.68, 80.66, 73.56, 71.42, 71.4], '6M': [64.51, 64.4, 60.17, 57.77, 59.76, 56.83, 61.55, 62.1, 59.78, 58.93, 55.28, 54.54, 54.49, 52.5, 55.06, 57.28, 59.94, 60.98, 72.56, 70.13, 70.35, 83.42, 79.12, 73.56, 71.42, 71.4], '1Y': [74.27, 78.18, 77.7, 72.2, 72.34, 68.54, 67.52, 73.65, 75.12, 76.2, 74.64, 74.68, 77.03, 79.36, 77.37, 73.64, 74.22, 73.97, 78.74, 73.46, 69.46, 62.59, 65.34, 69.01, 68.25, 64.49, 64.51, 64.4, 60.17, 57.77, 59.76, 56.83, 61.55, 62.16, 59.9, 58.15, 55.28, 54.54, 54.49, 52.5, 55.06, 57.28, 59.94, 60.98, 72.56, 66.31, 70.35, 83.42, 79.12, 73.56, 71.42, 71.4] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$11B', pe: 29.8, revenueGrowth: -1, eps: 2.4, grossMargin: 41, dividendYield: 3.87,
      etfPresence: { SOXX: 0.52, PSI: false, XSD: 2.27, DRAM: false },
      tonyNote: 'SKYWORKS SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 10, avgWeight: 5.63, proScore: 3.31, coverage: 0.588,
      price: 199, weeklyPrices: [204.65, 210.69, 208.65, 200.04, 199.00], weeklyChange: -2.76, dayChange: -0.5, sortRank: 0, periodReturns: { '1M': -7.6, 'YTD': 6.7, '6M': 5.5, '1Y': 29 },
      priceHistory: { '1D': [200, 200.7, 200.01, 198.98, 200.01, 200.81, 201.01, 200.91, 200.78, 200.79, 200.71, 199.78, 199.36, 198.87, 197.96, 197.96, 197.66, 198.31, 198, 197.46, 196.98, 197.74, 197.31, 199], '1W': [204.65, 210.69, 208.65, 200.04, 199], '1M': [214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199], 'YTD': [186.5, 185.04, 187.05, 184.84, 192.51, 171.88, 186.94, 187.9, 184.89, 183.34, 183.14, 180.4, 178.68, 175.75, 183.91, 198.87, 202.5, 209.25, 207.83, 220.78, 220.61, 212.6, 214.75, 208.19, 207.41, 199], '6M': [188.61, 188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 219.44, 222.32, 214.86, 222.82, 208.19, 207.41, 199], '1Y': [154.31, 157.25, 164.1, 173, 173.74, 177.87, 179.42, 181.59, 175.4, 181.6, 171.66, 177.17, 176.24, 177.69, 188.89, 192.57, 179.83, 180.28, 207.04, 195.21, 193.8, 186.52, 180.26, 183.38, 180.93, 174.14, 188.61, 188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 222.32, 214.86, 222.82, 208.19, 207.41, 199] },
      velocityScore: { '1D': 0, '1W': 49.1, '1M': -31.8, '6M': null }, isNew: false,
      marketCap: '$4.8T', pe: 30.5, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.5,
      etfPresence: { PTF: 4.17, WCLD: false, IGV: false, FDTX: 4.62, GTEK: false, ARKK: 1.65, MARS: false, FRWD: 8.23, BCTK: 5.97, FWD: 1.91, CBSE: false, FCUS: false, WGMI: 1.94, CNEQ: 13.44, SGRT: 6.44, SPMO: 7.94, XMMO: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 10, avgWeight: 5.38, proScore: 3.17, coverage: 0.588,
      price: 1048.51, weeklyPrices: [1043.19, 1133.99, 1211.38, 1051.77, 1048.51], weeklyChange: 0.51, dayChange: -0.31, sortRank: 0, periodReturns: { '1M': 39.6, 'YTD': 267.4, '6M': 265.7, '1Y': 724 },
      priceHistory: { '1D': [1051.77, 1040, 1048.16, 1037.31, 1050.97, 1042.36, 1041.56, 1039.02, 1040.3, 1044.41, 1045.79, 1038.77, 1040.19, 1032.24, 1018.67, 1022.51, 1014.12, 1026.64, 1024.53, 1016.72, 997.88, 1012.91, 1026.37, 1048.51], '1W': [1043.19, 1133.99, 1211.38, 1051.77, 1048.51], '1M': [895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51], 'YTD': [285.41, 327.02, 336.63, 397.58, 435.79, 382.89, 413.97, 417.35, 415.56, 397.05, 405.35, 461.73, 382.09, 367.85, 421.51, 456.23, 487.48, 518.46, 666.59, 766.58, 698.74, 928.41, 1079.57, 935.89, 1020.76, 1048.51], '6M': [286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 795.33, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1048.51], '1Y': [127.25, 121.74, 123.11, 113.26, 111.73, 109.14, 108.78, 124.27, 117.21, 117.75, 124.21, 150.57, 168.89, 156.83, 183.75, 192.33, 191.94, 198.47, 226.63, 237.5, 244.9, 225.92, 230.26, 226.65, 258.46, 248.55, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1048.51] },
      velocityScore: { '1D': 1.3, '1W': 46.1, '1M': 27.3, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 49.6, revenueGrowth: 196, eps: 21.14, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { PTF: 5.11, WCLD: false, IGV: false, FDTX: 9.36, GTEK: false, ARKK: false, MARS: false, FRWD: 5.05, BCTK: 5.1, FWD: 1.54, CBSE: 2.45, FCUS: 4.64, WGMI: false, CNEQ: 0.7, SGRT: 8.08, SPMO: 11.78, XMMO: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 7, avgWeight: 5.62, proScore: 2.32, coverage: 0.412,
      price: 643.83, weeklyPrices: [712.13, 746.23, 732.62, 670.75, 643.83], weeklyChange: -9.59, dayChange: -4.01, sortRank: 0, periodReturns: { '1M': 32.9, 'YTD': 273.7, '6M': 258.6, '1Y': 929.3 },
      priceHistory: { '1D': [670.75, 640.52, 647.17, 639.69, 654.36, 653.51, 651.12, 651.01, 644.37, 647.8, 645.6, 638.46, 634.85, 629.6, 621.17, 621.34, 618.27, 625.93, 618.54, 617, 614.42, 618.22, 635.19, 643.83], '1W': [712.13, 746.23, 732.62, 670.75, 643.83], '1M': [524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83], 'YTD': [172.27, 187.68, 222.1, 243.29, 278.41, 260.19, 284.1, 284.67, 282.25, 259.03, 261.18, 304.9, 296.14, 297.73, 337.88, 365, 389.1, 412.76, 483.15, 488.74, 455.8, 530.6, 594.11, 517.72, 681.08, 643.83], '6M': [179.56, 187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 515.83, 458.68, 524.65, 563.1, 517.72, 681.08, 643.83], '1Y': [62.55, 65.78, 65.06, 67.02, 69.02, 78.69, 73.78, 76.07, 75.64, 80.67, 90.49, 96.15, 105.15, 107.21, 131.26, 119.7, 120.44, 120.47, 141.38, 160.1, 166.11, 153.97, 157.74, 161, 187.2, 175.01, 179.56, 187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 458.68, 524.65, 563.1, 517.72, 681.08, 643.83] },
      velocityScore: { '1D': -1.3, '1W': 61.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$222B', pe: 38.6, revenueGrowth: 46, eps: 16.7, grossMargin: 45, dividendYield: 0.09,
      etfPresence: { PTF: 5.76, WCLD: false, IGV: false, FDTX: 4, GTEK: false, ARKK: false, MARS: false, FRWD: 5.92, BCTK: false, FWD: false, CBSE: false, FCUS: 5.52, WGMI: false, CNEQ: 5.62, SGRT: 10.21, SPMO: 2.33, XMMO: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 7, avgWeight: 4.4, proScore: 1.81, coverage: 0.412,
      price: 440.83, weeklyPrices: [432.15, 462.12, 467.67, 436.39, 440.83], weeklyChange: 2.01, dayChange: 1.02, sortRank: 0, periodReturns: { '1M': 9, 'YTD': 45.1, '6M': 47.5, '1Y': 97.9 },
      priceHistory: { '1D': [436.39, 434.62, 438.33, 437.17, 440.12, 441.11, 440, 441.68, 441.23, 442.35, 443.19, 441.12, 440.45, 438.6, 436.91, 437.54, 436.47, 438.58, 437.65, 436.81, 435.95, 436.97, 437.8, 440.83], '1W': [432.15, 462.12, 467.67, 436.39, 440.83], '1M': [412.32, 422.73, 424.86, 418.45, 435.63, 446.69, 436.69, 444.92, 415.17, 426.8, 427.92, 408.75, 421.07, 423.93, 441.4, 425.83, 432.15, 462.12, 467.67, 436.39, 440.83], 'YTD': [303.89, 318.01, 341.64, 327.37, 339.55, 330.73, 368.1, 360.39, 376.81, 353.86, 336.71, 339.57, 347.75, 341.49, 365.49, 375.1, 387.44, 393.83, 419.5, 397.28, 392.61, 422.73, 436.69, 427.92, 425.83, 440.83], '6M': [298.8, 319.61, 323.63, 342.4, 332.71, 341.36, 355.41, 366.36, 370.04, 369.11, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 404.54, 395.95, 412.32, 446.69, 427.92, 425.83, 440.83], '1Y': [222.74, 233.6, 229.76, 245.6, 241.6, 241.62, 231.37, 241.44, 228.6, 239.29, 235.21, 258.91, 268.64, 276.66, 288.11, 299.88, 304.71, 288.88, 305.09, 293.64, 290.62, 282.37, 289.96, 292.93, 304.85, 284.68, 298.8, 319.61, 323.63, 342.4, 332.71, 341.36, 355.41, 364.2, 385.75, 353.13, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 395.95, 412.32, 446.69, 427.92, 425.83, 440.83] },
      velocityScore: { '1D': 0.6, '1W': -1.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 38, revenueGrowth: 35, eps: 11.61, grossMargin: 62, dividendYield: 0.87,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6, GTEK: false, ARKK: 0.97, MARS: false, FRWD: 5.94, BCTK: 8.93, FWD: false, CBSE: 2.64, FCUS: false, WGMI: 0.6, CNEQ: 5.74, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 7, avgWeight: 4.04, proScore: 1.67, coverage: 0.412,
      price: 519.74, weeklyPrices: [512.48, 537.37, 551.63, 519.85, 519.74], weeklyChange: 1.42, dayChange: -0.02, sortRank: 0, periodReturns: { '1M': 11.2, 'YTD': 142.7, '6M': 141.7, '1Y': 262.4 },
      priceHistory: { '1D': [519.85, 511.32, 521.36, 514.3, 521.83, 518.56, 517.25, 519.98, 519.09, 520.91, 521.55, 518.81, 515.81, 512.72, 508.82, 510.36, 509.74, 512.71, 512.2, 508.7, 505.25, 511.21, 513.22, 519.74], '1W': [512.48, 537.37, 551.63, 519.85, 519.74], '1M': [503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74], 'YTD': [214.16, 204.68, 227.92, 253.73, 252.18, 192.5, 205.94, 203.37, 203.68, 199.45, 197.74, 199.46, 220.27, 210.21, 236.64, 258.12, 303.46, 337.11, 421.39, 448.29, 414.05, 495.54, 542.52, 475.51, 507.29, 519.74], '6M': [215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 458.79, 420.99, 503.89, 521.54, 475.51, 507.29, 519.74], '1Y': [143.4, 138.52, 144.16, 160.41, 162.12, 176.31, 163.12, 184.42, 165.2, 167.13, 161.79, 155.67, 157.92, 161.27, 169.73, 232.89, 238.6, 230.23, 264.33, 256.33, 258.89, 223.55, 214.24, 215.98, 221.43, 201.06, 215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 420.99, 503.89, 521.54, 475.51, 507.29, 519.74] },
      velocityScore: { '1D': 0, '1W': 7.1, '1M': -41.8, '6M': null }, isNew: false,
      marketCap: '$847B', pe: 172.1, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.69, MARS: false, FRWD: 7.08, BCTK: 3.37, FWD: 2.12, CBSE: false, FCUS: 3.36, WGMI: false, CNEQ: false, SGRT: 3.64, SPMO: 4.05, XMMO: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'SPCX', name: 'SPACE EXPLORATION TECHN-CL A', easyScore: 6, avgWeight: 7.07, proScore: 2.5, coverage: 0.353,
      price: 154.54, weeklyPrices: [154.54], weeklyChange: -1.01, dayChange: -1.01, sortRank: 0, periodReturns: { '1M': 0, 'YTD': 0, '6M': 0, '1Y': 0 },
      priceHistory: undefined,
      velocityScore: { '1D': -1.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.0T', pe: null, revenueGrowth: 15, eps: -0.67, grossMargin: 49, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.24, MARS: 22.25, FRWD: 2.66, BCTK: 7.96, FWD: 1.96, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.35, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'SPACE EXPLORATION TECHN-CL A appears in 6 of 17 Broad Tech ETFs (35% coverage) with average weight 7.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 6, avgWeight: 4.12, proScore: 1.45, coverage: 0.353,
      price: 382.07, weeklyPrices: [392.90, 411.35, 392.13, 380.15, 382.07], weeklyChange: -2.76, dayChange: 0.51, sortRank: 0, periodReturns: { '1M': -7.7, 'YTD': 10.4, '6M': 9.1, '1Y': 44.4 },
      priceHistory: { '1D': [380.15, 382.2, 382.24, 380.63, 382.6, 383.62, 385.89, 385.63, 384.48, 384.23, 385.66, 384.06, 383.89, 383.23, 380.77, 380.74, 380.3, 381.49, 380.77, 378.22, 377.8, 378.42, 378.08, 382.07], '1W': [392.9, 411.35, 392.13, 380.15, 382.07], '1M': [422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07], 'YTD': [346.1, 332.48, 343.02, 325.49, 330.73, 310.51, 331.17, 333.99, 321.7, 332.77, 335.97, 315.93, 318.81, 313.49, 354.91, 396.72, 422.65, 405.45, 425.44, 419.3, 411.07, 421.86, 479.23, 392.16, 376.71, 382.07], '6M': [350.22, 347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 428.43, 420.71, 422.01, 481.57, 392.16, 376.71, 382.07], '1Y': [264.65, 269.9, 275.4, 286.45, 288.71, 293.7, 301.67, 309.09, 291.17, 300.25, 306.1, 359.63, 345.35, 336.1, 338.18, 345.02, 351.33, 340.3, 385.98, 358.98, 355.22, 354.42, 397.57, 381.03, 406.37, 329.88, 350.22, 347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 420.71, 422.01, 481.57, 392.16, 376.71, 382.07] },
      velocityScore: { '1D': -0.7, '1W': 20.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 63.6, revenueGrowth: 48, eps: 6.01, grossMargin: 76, dividendYield: 0.68,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.79, GTEK: false, ARKK: 1.13, MARS: false, FRWD: 5.09, BCTK: 6.82, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.32, SGRT: false, SPMO: 6.56, XMMO: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 5, avgWeight: 5.03, proScore: 1.48, coverage: 0.294,
      price: 993.25, weeklyPrices: [1066.07, 1070.23, 1094.04, 1038.59, 993.25], weeklyChange: -6.83, dayChange: -4.37, sortRank: 0, periodReturns: { '1M': 22.2, 'YTD': 260.7, '6M': 248.2, '1Y': 616.9 },
      priceHistory: { '1D': [1038.59, 996.35, 1014.22, 994.29, 1024.75, 1026.5, 1012.82, 1013.02, 1006.88, 1006.86, 999.81, 989.78, 983.27, 978.03, 970.16, 971.19, 965.39, 970.89, 965.9, 960, 959.13, 965.85, 975.78, 993.25], '1W': [1066.07, 1070.23, 1094.04, 1038.59, 993.25], '1M': [845.76, 870.66, 880.72, 879.8, 921.26, 926.61, 940.69, 925.99, 847.47, 876.77, 846.01, 815.99, 868.09, 931.04, 1018.8, 1031.34, 1066.07, 1070.23, 1094.04, 1038.59, 993.25], 'YTD': [275.39, 284.47, 320.32, 346.53, 446.57, 405.45, 431.17, 408.97, 409.67, 367.34, 373.98, 406.77, 413.22, 423.12, 500.77, 519.6, 579.88, 643.3, 786.42, 808.8, 733.35, 870.66, 940.69, 846.01, 1031.34, 993.25], '6M': [285.27, 287.54, 304.01, 326.23, 358.29, 432.95, 425, 425.99, 407.4, 379.52, 374.33, 398.78, 404.02, 362.43, 468.72, 533.44, 559.9, 579.03, 771.01, 834.01, 740.84, 845.76, 926.61, 846.01, 1031.34, 993.25], '1Y': [138.54, 151.94, 144.5, 146.72, 152.73, 157.01, 147.27, 156.92, 158.4, 167.24, 183.98, 196.81, 216.64, 219.85, 254.74, 221.7, 219.38, 215.05, 265.62, 275.77, 283.26, 259.14, 272.28, 265.63, 307.85, 292, 285.27, 287.54, 304.01, 326.23, 358.29, 432.95, 425, 415.94, 396.02, 357.62, 374.33, 398.78, 404.02, 362.43, 468.72, 533.44, 559.9, 579.03, 771.01, 808.8, 740.84, 845.76, 926.61, 846.01, 1031.34, 993.25] },
      velocityScore: { '1D': 0, '1W': -11.4, '1M': -35.4, '6M': null }, isNew: false,
      marketCap: '$223B', pe: 94.7, revenueGrowth: 44, eps: 10.49, grossMargin: 42, dividendYield: 0.29,
      etfPresence: { PTF: 5.44, WCLD: false, IGV: false, FDTX: 4.04, GTEK: false, ARKK: false, MARS: false, FRWD: 8.6, BCTK: false, FWD: false, CBSE: false, FCUS: 4.94, WGMI: false, CNEQ: false, SGRT: false, SPMO: 2.15, XMMO: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'LRCX', name: 'LRCX', easyScore: 5, avgWeight: 4.7, proScore: 1.38, coverage: 0.294,
      price: 374.8, weeklyPrices: [374.18, 389.04, 409.54, 371.33, 374.80], weeklyChange: 0.17, dayChange: 0.93, sortRank: 0, periodReturns: { '1M': 22.7, 'YTD': 119, '6M': 111.4, '1Y': 290.3 },
      priceHistory: { '1D': [371.33, 365.88, 370.1, 368.25, 371.55, 375.63, 369.18, 368.81, 368.67, 369.8, 370.49, 368.82, 367.81, 366.78, 362.76, 365.15, 363.13, 365.7, 364.69, 364.02, 362.97, 364.4, 368.17, 374.8], '1W': [374.18, 389.04, 409.54, 371.33, 374.8], '1M': [322.68, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04, 409.54, 371.33, 374.8], 'YTD': [171.18, 200.96, 217.47, 220.7, 248.17, 213.31, 231.29, 237.39, 239.07, 214.68, 209.49, 224.71, 233.45, 222.01, 258.76, 265.16, 265.55, 248.75, 297.17, 289.24, 273.38, 318.93, 343.71, 327.16, 369.34, 374.8], '6M': [177.33, 185.06, 218.36, 222.96, 222.87, 237.5, 229.28, 235.53, 242.27, 231, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 296.05, 277.96, 322.68, 334.41, 327.16, 369.34, 374.8], '1Y': [96.02, 98.83, 101.06, 100.79, 97.78, 94.84, 95.94, 106.74, 99.15, 103.67, 100.42, 115.58, 126.32, 128.13, 146.99, 141, 144.78, 141.25, 160.67, 165.05, 161.42, 148.8, 155.14, 157.09, 168.71, 164.7, 177.33, 185.06, 218.36, 222.96, 222.87, 237.5, 229.28, 235.58, 244.25, 217.27, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 277.96, 322.68, 334.41, 327.16, 369.34, 374.8] },
      velocityScore: { '1D': 3, '1W': 7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$469B', pe: 71.1, revenueGrowth: 24, eps: 5.27, grossMargin: 50, dividendYield: 0.28,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.9, BCTK: 8.51, FWD: 1.97, CBSE: 3.05, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 4.07, XMMO: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 5, avgWeight: 4.05, proScore: 1.19, coverage: 0.294,
      price: 345.04, weeklyPrices: [362.10, 367.46, 348.78, 346.08, 345.04], weeklyChange: -4.71, dayChange: -0.3, sortRank: 0, periodReturns: { '1M': -9.1, 'YTD': 10, '6M': 9.3, '1Y': 101.2 },
      priceHistory: { '1D': [346.08, 348.32, 349.86, 349.4, 349.92, 352.07, 350.15, 350.12, 349.73, 349.52, 349.85, 348.05, 348.32, 348.64, 348.07, 348.15, 348.76, 346.05, 343.99, 342.39, 343.7, 344.02, 344.05, 345.04], '1W': [362.1, 367.46, 348.78, 346.08, 345.04], '1M': [384.84, 384.83, 386.12, 376.43, 372.58, 358.39, 355.68, 369.27, 365.76, 361.17, 362.29, 353.32, 356.56, 358.16, 367.11, 371.1, 362.1, 367.46, 348.78, 346.08, 345.04], 'YTD': [313.8, 326.01, 333.16, 330.84, 338.66, 331.33, 309.37, 303.56, 307.15, 300.91, 303.21, 306.3, 289.59, 294.9, 316.37, 334.47, 337.73, 347.31, 395.14, 383.82, 384.9, 384.83, 355.68, 362.29, 371.1, 345.04], '6M': [315.67, 315.32, 329.14, 330.34, 333.59, 344.9, 324.4, 306.02, 311.69, 306.36, 306.01, 304.42, 299.02, 273.14, 303.93, 330.58, 330.47, 347.5, 384.27, 386.77, 393.11, 384.84, 358.39, 362.29, 371.1, 345.04], '1Y': [171.49, 179.76, 178.7, 184.7, 193.2, 192.86, 196.92, 203.03, 200.19, 208.21, 232.66, 240.78, 252.33, 246.57, 246.43, 242.21, 251.71, 252.53, 275.17, 284.75, 287.43, 292.99, 320.28, 318.39, 313.7, 303.75, 315.67, 315.32, 329.14, 330.34, 333.59, 344.9, 324.4, 302.82, 310.92, 303.56, 306.01, 304.42, 299.02, 273.14, 303.93, 330.58, 330.47, 347.5, 384.27, 383.82, 393.11, 384.84, 358.39, 362.29, 371.1, 345.04] },
      velocityScore: { '1D': 0.8, '1W': 40, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.2T', pe: 26.3, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.66, GTEK: false, ARKK: 1.92, MARS: false, FRWD: false, BCTK: 5.49, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 5.69, SGRT: false, SPMO: 3.5, XMMO: false },
      tonyNote: 'Alphabet Inc Class C appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 4.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 5, avgWeight: 3.28, proScore: 0.97, coverage: 0.294,
      price: 234.27, weeklyPrices: [237.50, 244.39, 232.79, 234.11, 234.27], weeklyChange: -1.36, dayChange: 0.07, sortRank: 0, periodReturns: { '1M': -12, 'YTD': 1.5, '6M': 0.8, '1Y': 10.5 },
      priceHistory: { '1D': [234.11, 237.8, 236.77, 237.92, 238.14, 239.94, 241.89, 241.82, 241.07, 241.63, 241.53, 239.9, 239.7, 239.92, 239.34, 238.99, 238.57, 238.65, 237.42, 237.07, 236.37, 235.91, 235.21, 234.27], '1W': [237.5, 244.39, 232.79, 234.11, 234.27], '1M': [265.29, 271.85, 274, 270.64, 261.26, 256.52, 250.02, 253.79, 246.03, 245.22, 244.19, 238, 241.51, 238.55, 246.02, 246, 237.5, 244.39, 232.79, 234.11, 234.27], 'YTD': [230.82, 246.29, 238.18, 234.34, 241.73, 222.69, 199.6, 204.86, 207.92, 218.94, 209.53, 209.87, 211.71, 210.57, 233.65, 248.5, 255.36, 263.04, 274.99, 265.82, 259.34, 271.85, 250.02, 244.19, 246, 234.27], '6M': [232.38, 226.5, 247.38, 239.12, 238.42, 242.96, 208.72, 198.79, 205.27, 208.39, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 268.99, 264.86, 265.29, 256.52, 244.19, 246, 234.27], '1Y': [211.99, 219.92, 222.26, 223.88, 232.23, 234.11, 222.31, 224.56, 223.81, 229.12, 235.68, 229.95, 231.23, 218.15, 222.41, 227.74, 215.57, 217.95, 230.3, 250.2, 244.2, 222.69, 229.16, 229.11, 230.28, 226.76, 232.38, 226.5, 247.38, 239.12, 238.42, 242.96, 208.72, 201.15, 208.56, 208.73, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 264.86, 265.29, 256.52, 244.19, 246, 234.27] },
      velocityScore: { '1D': -19.2, '1W': -16.4, '1M': -76.7, '6M': null }, isNew: false,
      marketCap: '$2.5T', pe: 31.7, revenueGrowth: 17, eps: 7.4, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.01, GTEK: false, ARKK: 2.36, MARS: false, FRWD: 2.8, BCTK: false, FWD: 1.46, CBSE: false, FCUS: false, WGMI: false, CNEQ: 5.78, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, avgWeight: 5.33, proScore: 1.25, coverage: 0.235,
      price: 365.46, weeklyPrices: [378.91, 379.40, 367.34, 373.94, 365.46], weeklyChange: -3.55, dayChange: -2.27, sortRank: 0, periodReturns: { '1M': -12.7, 'YTD': -24.4, '6M': -25.1, '1Y': -25.8 },
      priceHistory: { '1D': [373.94, 377.72, 373.32, 373.38, 372.78, 374.51, 374.61, 374.91, 373.57, 373.61, 374.22, 372.51, 372.72, 372.04, 370.91, 370.89, 371.31, 372.11, 370.81, 368.83, 368.86, 368.45, 368.11, 365.46], '1W': [378.91, 379.4, 367.34, 373.94, 365.46], '1M': [416.03, 412.67, 426.99, 450.24, 460.52, 441.31, 427.34, 428.05, 416.67, 411.74, 403.41, 397.36, 390.34, 390.74, 399.76, 393.83, 378.91, 379.4, 367.34, 373.94, 365.46], 'YTD': [483.62, 478.11, 456.66, 451.14, 433.5, 393.67, 401.84, 398.46, 401.72, 410.68, 401.86, 391.79, 371.04, 369.37, 373.07, 411.22, 432.92, 424.46, 413.96, 407.77, 417.42, 412.67, 427.34, 403.41, 393.83, 365.46], '6M': [488.02, 472.94, 479.28, 459.86, 470.28, 423.37, 413.6, 401.32, 384.47, 398.55, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 412.66, 423.54, 416.03, 441.31, 403.41, 393.83, 365.46], '1Y': [492.27, 491.09, 501.48, 511.7, 510.88, 533.5, 524.94, 520.58, 505.72, 506.74, 507.97, 501.01, 508.45, 507.03, 515.74, 522.4, 513.43, 520.54, 541.55, 507.16, 511.14, 487.12, 485.5, 480.84, 483.47, 483.98, 488.02, 472.94, 479.28, 459.86, 470.28, 423.37, 413.6, 396.86, 389, 403.93, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 423.54, 416.03, 441.31, 403.41, 393.83, 365.46] },
      velocityScore: { '1D': 1.6, '1W': 10.6, '1M': -74.9, '6M': null }, isNew: false,
      marketCap: '$2.7T', pe: 21.8, revenueGrowth: 18, eps: 16.79, grossMargin: 68, dividendYield: 0.97,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.37, FDTX: 3.79, GTEK: false, ARKK: false, MARS: false, FRWD: 2.78, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 6.38, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 4, avgWeight: 4.64, proScore: 1.09, coverage: 0.235,
      price: 1914.46, weeklyPrices: [1958.80, 2184.75, 2273.73, 1963.60, 1914.46], weeklyChange: -2.26, dayChange: -2.5, sortRank: 0, periodReturns: { '1M': 29.5, 'YTD': 706.5, '6M': 665.5, '1Y': 3951.8 },
      priceHistory: { '1D': [1963.6, 1939.49, 1955.82, 1936.81, 1954.65, 1942.06, 1919.03, 1925.52, 1917.98, 1936.66, 1931.5, 1919.5, 1915.21, 1893.62, 1873.99, 1878.06, 1864.2, 1889.95, 1886.89, 1876.01, 1872.16, 1893.48, 1911.06, 1914.46], '1W': [1958.8, 2184.75, 2273.73, 1963.6, 1914.46], '1M': [1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46], 'YTD': [237.38, 334.54, 409.24, 503.44, 539.3, 576.2, 630.29, 621.09, 651.9, 565.59, 618.82, 753.69, 677.86, 692.73, 851.57, 891.72, 979.07, 1064.21, 1409.98, 1452.02, 1383.29, 1589.94, 1831.5, 1646.54, 1991.55, 1914.46], '6M': [250.08, 275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1547.56, 1333.01, 1589.55, 1716.36, 1646.54, 1991.55, 1914.46], '1Y': [47.25, 46.21, 46.95, 41.52, 42.06, 42.92, 42.1, 47.01, 44.4, 48.44, 62.5, 84.3, 98.87, 94.29, 124.14, 129.68, 144.3, 146.95, 204.36, 216.5, 283.1, 245.96, 215.04, 213.31, 241.61, 219.46, 250.08, 275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 565.41, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1333.01, 1589.55, 1716.36, 1646.54, 1991.55, 1914.46] },
      velocityScore: { '1D': -4.4, '1W': -6, '1M': -50.2, '6M': null }, isNew: false,
      marketCap: '$284B', pe: 65.4, revenueGrowth: 251, eps: 29.26, grossMargin: 56, dividendYield: null,
      etfPresence: { PTF: 8.72, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.57, CBSE: false, FCUS: 5.3, WGMI: false, CNEQ: false, SGRT: false, SPMO: 2.98, XMMO: false },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks', easyScore: 4, avgWeight: 4.16, proScore: 0.98, coverage: 0.235,
      price: 285.26, weeklyPrices: [282.13, 287.78, 286.40, 290.92, 285.26], weeklyChange: 1.11, dayChange: -1.94, sortRank: 0, periodReturns: { '1M': 9.5, 'YTD': 54.9, '6M': 52.4, '1Y': 39.6 },
      priceHistory: { '1D': [290.92, 290.09, 286.64, 284.85, 288.56, 287.18, 285.84, 286.12, 287.51, 288.36, 288.38, 287.85, 288.06, 286.98, 285.98, 286.8, 286.32, 287.58, 286.69, 286.02, 285.62, 286.88, 285.44, 285.26], '1W': [282.13, 287.78, 286.4, 290.92, 285.26], '1M': [256.75, 248.47, 257.77, 281.69, 300.48, 297.18, 280.43, 279.25, 272.05, 266.33, 260.52, 263.22, 279.53, 279.62, 284.54, 279.9, 282.13, 287.78, 286.4, 290.92, 285.26], 'YTD': [184.2, 190.8, 187.73, 182.27, 176.2, 154.77, 162.81, 150.99, 149.4, 163.16, 168.12, 168.91, 153.22, 160.67, 166.99, 164.11, 181.2, 181.54, 183.68, 215.6, 240.13, 248.47, 280.43, 260.52, 279.9, 285.26], '6M': [187.22, 179.37, 189.02, 187.66, 184.22, 175.42, 166, 166.95, 144.14, 150.15, 165.1, 167.45, 164.05, 154.35, 169.87, 161.59, 174.96, 180.99, 183.98, 213.66, 247.55, 256.75, 297.18, 260.52, 279.9, 285.26], '1Y': [204.3, 196.97, 192.07, 196.28, 201.16, 173.6, 172.89, 176.86, 184.43, 187.61, 192.35, 198.33, 205.68, 202.21, 209.3, 215.17, 206.7, 212.42, 217.16, 213.18, 210.04, 199.9, 185.35, 195.68, 190.36, 185.88, 187.22, 179.37, 189.02, 187.66, 184.22, 175.42, 166, 163.5, 141.67, 156.09, 165.1, 167.45, 164.05, 154.35, 169.87, 161.59, 174.96, 180.99, 183.98, 215.6, 247.55, 256.75, 297.18, 260.52, 279.9, 285.26] },
      velocityScore: { '1D': 1, '1W': -13.3, '1M': -58.1, '6M': null }, isNew: false,
      marketCap: '$232B', pe: 245.9, revenueGrowth: 31, eps: 1.16, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.78, IGV: 9.15, FDTX: 3.67, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.03, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'LITE', name: 'Lumentum Holdings Inc', easyScore: 4, avgWeight: 3.77, proScore: 0.89, coverage: 0.235,
      price: 842.53, weeklyPrices: [869.98, 850.00, 893.93, 827.92, 842.53], weeklyChange: -3.16, dayChange: 1.76, sortRank: 0, periodReturns: { '1M': -11, 'YTD': 128.6, '6M': 112.8, '1Y': 818.1 },
      priceHistory: { '1D': [827.92, 810, 827.67, 820.79, 844.33, 853.7, 847.42, 845.33, 845.37, 848.17, 850.88, 844.5, 842.24, 839.21, 832.57, 836.27, 831.35, 839.6, 837.21, 834.05, 828.57, 832.76, 839.07, 842.53], '1W': [869.98, 850, 893.93, 827.92, 842.53], '1M': [910.81, 902.31, 860.62, 854.96, 905, 1029.15, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93, 827.92, 842.53], 'YTD': [368.59, 348.26, 343.27, 354.49, 381.44, 504.42, 583.46, 635.64, 677, 650.82, 616.09, 700.81, 777.17, 764.65, 894.13, 824.01, 873.6, 858.32, 944.28, 992.37, 890.09, 902.31, 938, 821.76, 875.36, 842.53], '6M': [395.92, 386.11, 351.42, 324.25, 332.45, 423.42, 577.15, 562.74, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 1053.09, 884.98, 910.81, 1029.15, 821.76, 875.36, 842.53], '1Y': [91.77, 91.24, 92.62, 102.64, 102.85, 110.08, 110.01, 120.23, 115.89, 125.84, 141.91, 164.88, 171.5, 159.11, 169.75, 159.76, 156.57, 158.06, 214.28, 232.75, 253.81, 268.92, 308.28, 327.85, 372.09, 337.13, 395.92, 386.11, 351.42, 324.25, 332.45, 423.42, 577.15, 600.42, 688.27, 694.43, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 884.98, 910.81, 1029.15, 821.76, 875.36, 842.53] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$66B', pe: 147.6, revenueGrowth: 90, eps: 5.71, grossMargin: 41, dividendYield: null,
      etfPresence: { PTF: 3.56, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 1.45, FWD: false, CBSE: false, FCUS: 2.31, WGMI: false, CNEQ: false, SGRT: 7.77, SPMO: false, XMMO: false },
      tonyNote: 'Lumentum Holdings Inc appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 4, avgWeight: 3.62, proScore: 0.85, coverage: 0.235,
      price: 113.5, weeklyPrices: [130.63, 128.47, 119.50, 116.70, 113.50], weeklyChange: -13.11, dayChange: -2.74, sortRank: 0, periodReturns: { '1M': -17.1, 'YTD': -36.1, '6M': -41.5, '1Y': -20.6 },
      priceHistory: { '1D': [116.7, 117.51, 116.62, 116.23, 115.81, 116.31, 115.54, 115.97, 114.24, 113.89, 114.1, 113.15, 113.31, 112.98, 112.86, 112.71, 112.67, 114.01, 113.96, 113.29, 113.31, 113.63, 114.14, 113.5], '1W': [130.63, 128.47, 119.5, 116.7, 113.5], '1M': [136.6, 132.51, 143.34, 156.54, 160.65, 152.17, 142.2, 141.7, 135.53, 136.47, 132.07, 130.21, 131.08, 127.99, 134.71, 133.25, 130.63, 128.47, 119.5, 116.7, 113.5], 'YTD': [177.75, 176.86, 177.07, 165.9, 151.86, 130.01, 129.13, 134.89, 135.94, 152.67, 153.5, 152.77, 154.96, 146.49, 130.49, 142.15, 152.62, 137.97, 133.79, 136, 135.26, 132.51, 142.2, 132.07, 133.25, 113.5], '6M': [194.17, 167.86, 177.49, 170.96, 167.47, 147.76, 142.91, 131.41, 130.6, 145.17, 156.43, 152.72, 160.84, 137.55, 150.07, 135.7, 145.97, 141.18, 135.91, 136.89, 135.14, 136.6, 152.17, 132.07, 133.25, 113.5], '1Y': [142.9, 132.12, 142.5, 153.99, 154.86, 158.35, 179.54, 184.37, 156.01, 156.72, 156.14, 164.36, 176.97, 179.12, 187.05, 185.47, 179.62, 175.49, 198.81, 187.9, 184.17, 165.42, 165.77, 177.92, 187.54, 185.69, 194.17, 167.86, 177.49, 170.96, 167.47, 147.76, 142.91, 133.02, 128.84, 147.22, 156.43, 152.72, 160.84, 137.55, 150.07, 135.7, 145.97, 141.18, 135.91, 136, 135.14, 136.6, 152.17, 132.07, 133.25, 113.5] },
      velocityScore: { '1D': -1.2, '1W': -12.4, '1M': -63, '6M': null }, isNew: false,
      marketCap: '$272B', pe: 127.5, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 7.97, FDTX: 2.87, GTEK: false, ARKK: 2.58, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.07, XMMO: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'SHOP', name: 'Shopify Inc Registered Shs -A- Subord Vtg', easyScore: 4, avgWeight: 2.82, proScore: 0.66, coverage: 0.235,
      price: 114.17, weeklyPrices: [108.09, 108.85, 107.98, 107.68, 114.17], weeklyChange: 5.62, dayChange: 6.03, sortRank: 0, periodReturns: { '1M': 10.8, 'YTD': -29.1, '6M': -32.6, '1Y': 0.2 },
      priceHistory: { '1D': [107.68, 109.99, 110.3, 110.56, 110.56, 111.07, 111.73, 112.32, 111.29, 110.37, 111.18, 111.72, 112.67, 111.63, 111.21, 112.08, 111.72, 113.53, 113.48, 113.37, 112.31, 112.72, 113.46, 114.17], '1W': [108.09, 108.85, 107.98, 107.68, 114.17], '1M': [104.9, 106.6, 115.03, 118.71, 124.12, 117.01, 112.94, 116.04, 109.54, 110.78, 110.42, 108.2, 110.47, 108.24, 112.49, 113.23, 108.09, 108.85, 107.98, 107.68, 114.17], 'YTD': [160.97, 168.28, 157.99, 137.64, 143.64, 111.24, 110.66, 123.8, 125.94, 134.79, 126.17, 123.75, 118.42, 118.52, 112.38, 127.41, 131.96, 121.26, 105.44, 99.84, 101.01, 106.6, 112.94, 110.42, 113.23, 114.17], '6M': [169.45, 157.2, 164.48, 155.81, 136.31, 132.2, 118.4, 112.7, 117.28, 119.38, 133.5, 126.58, 121.1, 111.77, 117.06, 117.64, 131.13, 122.05, 107.63, 102.54, 102.39, 104.9, 117.01, 110.42, 113.23, 114.17], '1Y': [113.89, 114.77, 115.16, 126.75, 122.08, 122.21, 154.9, 150.09, 137.29, 139.89, 145.15, 145.03, 152.11, 143.45, 151.3, 163.87, 156.21, 162.01, 179.01, 162.92, 156.59, 146, 159.34, 162.31, 164.75, 166.8, 169.45, 157.2, 164.48, 155.81, 136.31, 132.2, 118.4, 113.54, 116.93, 121.87, 133.5, 126.58, 121.1, 111.77, 117.06, 117.64, 131.13, 122.05, 107.63, 99.84, 102.39, 104.9, 117.01, 110.42, 113.23, 114.17] },
      velocityScore: { '1D': 0, '1W': -25.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$148B', pe: 111.9, revenueGrowth: 34, eps: 1.02, grossMargin: 48, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.89, GTEK: false, ARKK: 4.15, MARS: false, FRWD: 1.79, BCTK: 2.45, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Shopify Inc Registered Shs -A- Subord Vtg appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 2.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC-CL A', easyScore: 4, avgWeight: 2.5, proScore: 0.59, coverage: 0.235,
      price: 345.29, weeklyPrices: [363.79, 368.03, 349.68, 346.13, 345.29], weeklyChange: -5.09, dayChange: -0.23, sortRank: 0, periodReturns: { '1M': -9.8, 'YTD': 10.3, '6M': 9.9, '1Y': 102.3 },
      priceHistory: { '1D': [346.09, 348.44, 350.31, 349.73, 350.41, 352.71, 350.87, 350.96, 350.43, 350.22, 350.6, 348.9, 349.22, 349.53, 349.01, 348.79, 349.27, 346.65, 344.39, 342.88, 344.39, 344.73, 344.83, 345.29], '1W': [363.79, 368.03, 349.68, 346.13, 345.29], '1M': [388.88, 388.83, 390.13, 380.34, 376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68, 369.35, 373.25, 363.79, 368.03, 349.68, 346.13, 345.29], 'YTD': [313, 325.44, 332.78, 330.54, 338.25, 331.25, 309, 302.85, 307.38, 300.88, 303.55, 307.69, 290.93, 297.39, 318.49, 337.12, 339.32, 349.94, 398.04, 387.35, 387.66, 388.83, 358.99, 364.26, 373.25, 345.29], '6M': [314.09, 315.15, 328.57, 330, 333.26, 343.69, 324.32, 305.72, 311.49, 306.52, 306.36, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 388.43, 388.64, 396.94, 388.88, 361.85, 364.26, 373.25, 345.29], '1Y': [170.68, 178.64, 177.62, 183.58, 192.17, 191.9, 196.09, 201.96, 199.32, 207.48, 232.3, 240.37, 252.03, 245.79, 245.69, 241.53, 251.03, 251.69, 274.57, 284.31, 286.71, 292.81, 319.95, 317.62, 312.43, 302.46, 314.09, 315.15, 328.57, 330, 333.26, 343.69, 324.32, 302.02, 310.9, 303.58, 306.36, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 388.43, 387.35, 396.94, 388.88, 361.85, 364.26, 373.25, 345.29] },
      velocityScore: { '1D': 0, '1W': null, '1M': -85.6, '6M': null }, isNew: false,
      marketCap: '$4.2T', pe: 26.3, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 0.5, MARS: false, FRWD: 3.19, BCTK: false, FWD: 1.93, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 4.38, XMMO: false },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'KLAC', name: 'KLAC', easyScore: 4, avgWeight: 2.07, proScore: 0.49, coverage: 0.235,
      price: 240.48, weeklyPrices: [238.73, 259.56, 269.16, 244.49, 240.48], weeklyChange: 0.73, dayChange: -1.64, sortRank: 0, periodReturns: { '1M': 27.3, 'YTD': 97.9, '6M': 88.3, '1Y': 169.2 },
      priceHistory: { '1D': [244.49, 239.49, 242.71, 240.61, 240.91, 242.91, 240.1, 240.46, 239.99, 240.88, 241.11, 239.48, 238.99, 238.21, 235.8, 236.72, 236.23, 237.75, 236.99, 235.98, 236.07, 236.57, 238.32, 240.48], '1W': [238.73, 259.56, 269.16, 244.49, 240.48], '1M': [201.14, 195.72, 192.76, 192.17, 194, 204.52, 212.51, 213.11, 192.92, 210.81, 213.94, 213.56, 241.16, 254.54, 256.42, 237.33, 238.73, 259.56, 269.16, 244.49, 240.48], 'YTD': [121.51, 132.46, 154.5, 150, 168.47, 133.1, 145.09, 146.99, 152.43, 142.94, 140.96, 148.24, 154.38, 151.98, 172.73, 174.81, 181.21, 181.62, 181.63, 181.13, 174.06, 195.72, 212.51, 213.94, 237.33, 240.48], '6M': [127.7, 127.45, 140, 156.78, 154.3, 141.04, 144.02, 146.41, 148.77, 153.49, 142.91, 143.82, 151.14, 138.26, 154.88, 179.59, 178.54, 180.9, 173.29, 184.52, 175.65, 201.14, 204.52, 213.94, 237.33, 240.48], '1Y': [89.35, 92.11, 92.86, 93.71, 90.42, 87.9, 88.83, 94.95, 87.84, 88.89, 87.33, 95.93, 104.67, 105.91, 113.93, 105.35, 108.7, 111.43, 123.53, 122.71, 119.9, 116.75, 115.91, 120.81, 124.62, 122.24, 127.7, 127.45, 140, 156.78, 154.3, 141.04, 144.02, 147.02, 150.66, 144.13, 142.91, 143.82, 151.14, 138.26, 154.88, 179.59, 178.54, 180.9, 173.29, 181.13, 175.65, 201.14, 204.52, 213.94, 237.33, 240.48] },
      velocityScore: { '1D': 2.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$314B', pe: 68.3, revenueGrowth: 12, eps: 3.52, grossMargin: 61, dividendYield: 0.38,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: 1.79, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.78, CBSE: 2.94, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.76, XMMO: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 3, avgWeight: 5.29, proScore: 0.93, coverage: 0.176,
      price: 375.53, weeklyPrices: [396.38, 400.49, 405.05, 381.61, 375.53], weeklyChange: -5.26, dayChange: -1.59, sortRank: 0, periodReturns: { '1M': -11.8, 'YTD': -16.5, '6M': -22.6, '1Y': 14.6 },
      priceHistory: { '1D': [381.61, 383.45, 380.35, 380.55, 380.24, 382.08, 382.91, 383.77, 381.8, 380.98, 381.26, 378.62, 378.73, 377.6, 375.52, 375.06, 374.45, 376.51, 376.4, 374.65, 373.63, 376.22, 376.34, 375.53], '1W': [396.38, 400.49, 405.05, 381.61, 375.53], '1M': [433.59, 440.36, 442.1, 435.79, 415.88, 423.74, 423.7, 418.45, 391, 408.95, 396.68, 381.59, 399.15, 406.43, 411.15, 404.66, 396.38, 400.49, 405.05, 381.61, 375.53], 'YTD': [449.72, 435.8, 438.57, 449.36, 416.56, 397.21, 417.07, 411.71, 408.58, 405.55, 395.01, 392.78, 385.95, 381.26, 345.62, 391.95, 387.51, 372.8, 398.73, 433.45, 404.11, 440.36, 423.7, 396.68, 404.66, 375.53], '6M': [485.4, 438.07, 445.01, 437.5, 435.2, 421.81, 417.32, 417.44, 399.83, 403.32, 398.68, 395.56, 380.85, 355.28, 346.65, 364.2, 386.42, 376.02, 389.37, 445, 409.99, 433.59, 423.74, 396.68, 404.66, 375.53], '1Y': [327.55, 315.65, 309.87, 319.41, 305.3, 308.27, 319.91, 339.38, 323.9, 349.6, 338.53, 368.81, 416.85, 423.39, 436, 435.54, 435.15, 438.97, 461.51, 462.07, 430.6, 403.99, 426.58, 454.53, 446.89, 483.37, 485.4, 438.07, 445.01, 437.5, 435.2, 421.81, 417.32, 410.63, 409.38, 392.43, 398.68, 395.56, 380.85, 355.28, 346.65, 364.2, 386.42, 376.02, 389.37, 433.45, 409.99, 433.59, 423.74, 396.68, 404.66, 375.53] },
      velocityScore: { '1D': -2.1, '1W': -13.1, '1M': -82.1, '6M': null }, isNew: false,
      marketCap: '$1.4T', pe: 338.3, revenueGrowth: 16, eps: 1.11, grossMargin: 19, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 9.73, MARS: false, FRWD: false, BCTK: 3.19, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 2.95, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'POWL', name: 'POWL', easyScore: 3, avgWeight: 5.23, proScore: 3.14, coverage: 0.6,
      price: 294.49, weeklyPrices: [294.03, 297.20, 307.80, 291.50, 294.49], weeklyChange: 0.16, dayChange: 1.03, sortRank: 0, periodReturns: { '1M': 5.5, 'YTD': 177.1, '6M': 162.8, '1Y': 364.3 },
      priceHistory: { '1D': [291.5, 287.96, 297.8, 295.12, 297.89, 300.83, 300.95, 301.14, 299.85, 299.46, 299.61, 298.64, 297.36, 294.64, 293.04, 294.06, 293.17, 293.04, 293, 291.01, 290.96, 291.57, 293.17, 294.49], '1W': [294.03, 297.2, 307.8, 291.5, 294.49], '1M': [291.97, 295.94, 288.9, 284.42, 288.12, 299.07, 299.73, 300.06, 284.87, 293.6, 283.51, 262.34, 290.5, 294.75, 303.53, 292.7, 294.03, 297.2, 307.8, 291.5, 294.49], 'YTD': [106.26, 119.94, 135.18, 142.29, 152.31, 179.6, 197.63, 178.79, 176.96, 167.67, 171.19, 167.41, 194.85, 184.68, 230.81, 229.73, 242.77, 253.49, 320.3, 308.05, 261.58, 295.94, 299.73, 283.51, 292.7, 294.49], '6M': [112.06, 117.51, 121.83, 139.99, 141.15, 146.79, 187.3, 195.02, 181.38, 177.5, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 322.05, 266.8, 291.97, 299.07, 283.51, 292.7, 294.49], '1Y': [63.42, 72.84, 70.96, 78.84, 80.05, 79.03, 75.95, 86.57, 82.17, 91.46, 90.24, 97.47, 101.43, 94.58, 102.51, 103.18, 109.92, 110.96, 136.12, 131.92, 118.74, 95.1, 107.26, 112.31, 120.91, 109.59, 112.06, 117.51, 121.83, 139.99, 141.15, 146.79, 187.3, 187.21, 186.39, 170.37, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 266.8, 291.97, 299.07, 283.51, 292.7, 294.49] },
      velocityScore: { '1D': -0.6, '1W': -0.3, '1M': -37.7, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 57.4, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { POW: 6.53, VOLT: 7.27, PBD: false, PBW: 1.88, IVEP: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'PWR', name: 'PWR', easyScore: 3, avgWeight: 4.72, proScore: 2.83, coverage: 0.6,
      price: 701.88, weeklyPrices: [714.85, 702.25, 740.14, 702.29, 701.88], weeklyChange: -1.81, dayChange: -0.06, sortRank: 0, periodReturns: { '1M': -3, 'YTD': 66.3, '6M': 61.9, '1Y': 87.6 },
      priceHistory: { '1D': [702.29, 692.11, 703.45, 702.93, 704.94, 709.53, 707.32, 706.89, 706.76, 707.6, 705.73, 704.87, 702.33, 700.18, 695.95, 696.74, 696.33, 698.64, 699.61, 700.51, 700.7, 699.91, 700.53, 701.88], '1W': [714.85, 702.25, 740.14, 702.29, 701.88], '1M': [742.18, 733.62, 730.1, 711.73, 687.48, 706.06, 715.67, 719.17, 695.11, 693.81, 691.95, 650.92, 683.29, 707.74, 724.35, 719.29, 714.85, 702.25, 740.14, 702.29, 701.88], 'YTD': [422.06, 413.17, 447.64, 468.78, 483.43, 477.72, 515.88, 554, 565.05, 549.22, 566.91, 572, 573.5, 560.12, 582.06, 591.82, 613.78, 628.6, 785.24, 765.81, 714.13, 733.62, 715.67, 691.95, 719.29, 701.88], '6M': [433.58, 439.68, 422.57, 466.75, 470.77, 477.77, 514.56, 524.08, 549.11, 572.66, 568.04, 574.02, 567.45, 533.78, 555.57, 594.4, 605.89, 630.94, 771.61, 781.38, 723.03, 742.18, 706.06, 691.95, 719.29, 701.88], '1Y': [374.07, 373.41, 380.09, 397.9, 407.22, 406.13, 387.5, 379.96, 375.87, 381.56, 376.09, 389.64, 390.65, 400.41, 420.86, 429.92, 436.93, 412.21, 448.69, 453.45, 449.42, 445.47, 460.43, 464.84, 466.91, 421.31, 433.58, 439.68, 422.57, 466.75, 470.77, 477.77, 514.56, 525.13, 568.21, 566, 568.04, 574.02, 567.45, 533.78, 555.57, 594.4, 605.89, 630.94, 771.61, 765.81, 723.03, 742.18, 706.06, 691.95, 719.29, 701.88] },
      velocityScore: { '1D': -1, '1W': -3.4, '1M': -22.9, '6M': null }, isNew: false,
      marketCap: '$105B', pe: 96.1, revenueGrowth: 26, eps: 7.3, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.63, VOLT: 5.29, PBD: false, PBW: false, IVEP: 4.23 },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'ETN', name: 'ETN', easyScore: 3, avgWeight: 4.41, proScore: 2.65, coverage: 0.6,
      price: 404.59, weeklyPrices: [409.64, 421.77, 435.78, 405.28, 404.59], weeklyChange: -1.23, dayChange: -0.17, sortRank: 0, periodReturns: { '1M': 3.4, 'YTD': 27, '6M': 25, '1Y': 18.2 },
      priceHistory: { '1D': [405.28, 403.92, 405.38, 407.78, 408.27, 411.36, 409.49, 411.16, 409.32, 409.61, 409.49, 408.82, 407.18, 406.03, 403.19, 402.84, 402.01, 403.4, 402.96, 402.84, 402.89, 402.78, 403.4, 404.59], '1W': [409.64, 421.77, 435.78, 405.28, 404.59], '1M': [403.13, 406.37, 401.94, 400.6, 400.08, 417.62, 421.21, 418.61, 395.94, 403.14, 401.72, 375.46, 393.64, 391.39, 407.06, 407.71, 409.64, 421.77, 435.78, 405.28, 404.59], 'YTD': [318.51, 320.58, 333.46, 334.04, 354.37, 354.67, 390.33, 377.32, 374.59, 354.79, 348.64, 360.54, 375, 365.56, 400.44, 395.06, 413.87, 410.77, 421.39, 401.53, 371.88, 406.37, 421.21, 401.72, 407.71, 404.59], '6M': [323.67, 327.31, 324.51, 343.75, 332.28, 359.44, 377.06, 389.25, 362.05, 377.4, 353.87, 361.04, 359.74, 343.53, 368.85, 401.9, 409.7, 413.07, 410.86, 419, 381.87, 403.13, 417.62, 401.72, 407.71, 404.59], '1Y': [342.35, 358.19, 357.64, 380.72, 384.9, 384.72, 358.16, 357.49, 346.22, 351.4, 348.22, 360.08, 371.27, 364.74, 376.76, 377.19, 381.72, 360.6, 387.75, 385.44, 369.4, 345.65, 341.69, 338.93, 350.36, 315.95, 323.67, 327.31, 324.51, 343.75, 332.28, 359.44, 377.06, 391.49, 374.56, 355.56, 353.87, 361.04, 359.74, 343.53, 368.85, 401.9, 409.7, 413.07, 410.86, 401.53, 381.87, 403.13, 417.62, 401.72, 407.71, 404.59] },
      velocityScore: { '1D': -2.2, '1W': -0.4, '1M': -17.2, '6M': null }, isNew: false,
      marketCap: '$157B', pe: 39.6, revenueGrowth: 17, eps: 10.21, grossMargin: 37, dividendYield: 1.09,
      etfPresence: { POW: 4.13, VOLT: 5.23, PBD: false, PBW: false, IVEP: 3.88 },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CORP', easyScore: 3, avgWeight: 4.31, proScore: 2.59, coverage: 0.6,
      price: 326.19, weeklyPrices: [284.99, 328.91, 345.85, 321.98, 326.19], weeklyChange: 14.46, dayChange: 1.31, sortRank: 0, periodReturns: { '1M': 7.8, 'YTD': 275.4, '6M': 255, '1Y': 1410.1 },
      priceHistory: { '1D': [321.98, 320.42, 330.87, 324.73, 342.63, 341.83, 341.63, 339.8, 337.5, 336.08, 340.77, 333.61, 332.38, 328.39, 323, 325.64, 323.29, 325, 323.06, 320.1, 316.6, 323.52, 327.99, 326.19], '1W': [284.99, 328.91, 345.85, 321.98, 326.19], '1M': [302.4, 293.8, 290.01, 285, 273.51, 302.85, 287.32, 291.37, 263.61, 253.57, 259.61, 234.23, 248.88, 260.22, 274.5, 280.88, 284.99, 328.91, 345.85, 321.98, 326.19], 'YTD': [86.89, 121.84, 139.17, 145.63, 156.51, 136.6, 139.03, 159, 168.57, 159.99, 157.17, 156.58, 150.22, 132.45, 160.13, 213.84, 229.75, 287.97, 285.47, 280.69, 261.34, 293.8, 287.32, 259.61, 280.88, 326.19], '6M': [91.88, 98.69, 134.07, 149.5, 139.62, 156.13, 155.17, 139.74, 160.28, 166, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 283.92, 258.71, 302.4, 302.85, 259.61, 280.88, 326.19], '1Y': [21.6, 22.56, 25.85, 24.31, 33.06, 37.39, 38.86, 44.08, 44.51, 50.85, 54.91, 67.29, 80.97, 68.69, 88, 86.65, 116.58, 94.37, 133.71, 141.41, 126.72, 108.93, 101.14, 118.09, 108.99, 80.21, 91.88, 98.69, 134.07, 149.5, 139.62, 156.13, 155.17, 145.32, 166.2, 153.02, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 258.71, 302.4, 302.85, 259.61, 280.88, 326.19] },
      velocityScore: { '1D': -3, '1W': 13.6, '1M': 3.6, '6M': null }, isNew: false,
      marketCap: '$93B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: 4.51, PBD: false, PBW: 2.67, IVEP: 5.76 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'GEV', name: 'GEV', easyScore: 3, avgWeight: 3.97, proScore: 2.38, coverage: 0.6,
      price: 1057.65, weeklyPrices: [1048.86, 1109.73, 1127.59, 1034.98, 1057.65], weeklyChange: 0.84, dayChange: 2.19, sortRank: 0, periodReturns: { '1M': 1.8, 'YTD': 61.8, '6M': 58.5, '1Y': 110.4 },
      priceHistory: { '1D': [1034.98, 1029.01, 1042.95, 1040.1, 1056.68, 1063.49, 1062.01, 1066.19, 1064.91, 1066.98, 1067.86, 1064.98, 1058.56, 1055.4, 1051.7, 1051.14, 1050.57, 1050.65, 1055.29, 1051.44, 1047.79, 1045.84, 1047.81, 1057.65], '1W': [1048.86, 1109.73, 1127.59, 1034.98, 1057.65], '1M': [1070.47, 1031.89, 996, 968.32, 950.54, 969.67, 959.36, 963.33, 933.61, 933.85, 920.15, 867.09, 906.79, 940.66, 979.07, 982.35, 1048.86, 1109.73, 1127.59, 1034.98, 1057.65], 'YTD': [653.57, 628.4, 642.23, 661.67, 717.39, 737.53, 816.56, 834.61, 876.46, 815.01, 832.11, 858.47, 923.69, 894.78, 968.02, 985.92, 1127.56, 1063.11, 1118.96, 1071.98, 1011.8, 1031.89, 959.36, 920.15, 982.35, 1057.65], '6M': [667.32, 679.55, 622.5, 681.55, 665.99, 754.97, 801.54, 802.13, 831.7, 881.18, 830.1, 827.37, 882.64, 817.35, 910.75, 987.5, 991.3, 1088.93, 1095.21, 1073.08, 1012.25, 1070.47, 969.67, 920.15, 982.35, 1057.65], '1Y': [502.67, 505.07, 539.36, 570.17, 623.97, 660.29, 664.55, 634.31, 604.59, 622.39, 598.81, 634.15, 611, 607.52, 606.23, 634.27, 615.95, 576, 577.97, 559.7, 575.4, 595.37, 589.72, 629.11, 704.2, 639.43, 667.32, 679.55, 622.5, 681.55, 665.99, 754.97, 801.54, 819.15, 879.73, 842, 830.1, 827.37, 882.64, 817.35, 910.75, 987.5, 991.3, 1088.93, 1095.21, 1071.98, 1012.25, 1070.47, 969.67, 920.15, 982.35, 1057.65] },
      velocityScore: { '1D': -3.3, '1W': 6.2, '1M': -13.5, '6M': null }, isNew: false,
      marketCap: '$284B', pe: 30.9, revenueGrowth: 16, eps: 34.26, grossMargin: 20, dividendYield: 0.19,
      etfPresence: { POW: 3.73, VOLT: 4.14, PBD: false, PBW: false, IVEP: 4.04 },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'NEE', name: 'NEE', easyScore: 3, avgWeight: 3.47, proScore: 2.08, coverage: 0.6,
      price: 87.62, weeklyPrices: [85.73, 86.75, 86.08, 86.43, 87.62], weeklyChange: 2.2, dayChange: 1.38, sortRank: 0, periodReturns: { '1M': -1.1, 'YTD': 9.1, '6M': 8.9, '1Y': 24.6 },
      priceHistory: { '1D': [86.43, 86.87, 86.81, 86.71, 86.67, 86.74, 86.78, 87.03, 87.2, 87.14, 86.96, 86.78, 86.6, 86.79, 86.71, 86.66, 87, 87.04, 87.19, 87.44, 87.53, 87.41, 87.5, 87.62], '1W': [85.73, 86.75, 86.08, 86.43, 87.62], '1M': [87.65, 87.65, 87.25, 87.01, 83.66, 85.68, 84.58, 85.68, 85.84, 84.01, 84.83, 85.12, 84.84, 85.99, 86.12, 86.23, 85.73, 86.75, 86.08, 86.43, 87.62], 'YTD': [80.28, 79.49, 82.19, 85.07, 88.18, 89.21, 91.93, 91.64, 91.99, 91.13, 91.73, 90.96, 91.16, 92.85, 94.48, 91.24, 90, 94.17, 95.39, 94.59, 90.06, 87.65, 84.58, 84.83, 86.23, 87.62], '6M': [80.45, 80.93, 79.89, 83.63, 85.47, 86.33, 89.48, 93.8, 94.06, 92.71, 92.01, 92.82, 90.23, 92.05, 93.67, 91.31, 90.6, 96.51, 96.28, 94.84, 89.04, 87.65, 85.68, 84.83, 86.23, 87.62], '1Y': [70.34, 73.02, 74.64, 75.18, 71.97, 71.06, 70.54, 72.3, 76.18, 73.89, 70.87, 71.32, 70.79, 74.65, 78.18, 83.71, 85.79, 82.84, 81.76, 82.14, 85.89, 84.27, 85.54, 83.39, 81.21, 80.85, 80.45, 80.93, 79.89, 83.63, 85.47, 86.33, 89.48, 92.71, 95.68, 92.59, 92.01, 92.82, 90.23, 92.05, 93.67, 91.31, 90.6, 96.51, 96.28, 94.59, 89.04, 87.65, 85.68, 84.83, 86.23, 87.62] },
      velocityScore: { '1D': 3.5, '1W': -1, '1M': -16.8, '6M': null }, isNew: false,
      marketCap: '$183B', pe: 22.2, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.88,
      etfPresence: { POW: 1.96, VOLT: 4.9, PBD: false, PBW: false, IVEP: 3.54 },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'NVT', name: 'NVT', easyScore: 3, avgWeight: 3.43, proScore: 2.06, coverage: 0.6,
      price: 167.55, weeklyPrices: [170.94, 177.02, 184.34, 168.37, 167.55], weeklyChange: -1.98, dayChange: -0.49, sortRank: 0, periodReturns: { '1M': 1.8, 'YTD': 64.3, '6M': 61.2, '1Y': 132.7 },
      priceHistory: { '1D': [168.37, 165.03, 167.76, 167.39, 169.49, 171, 170.9, 171.22, 170.44, 170.41, 170.33, 169.37, 168.84, 168.19, 167.21, 167.54, 167.01, 167.32, 167.25, 166.55, 166.34, 166.38, 166.99, 167.55], '1W': [170.94, 177.02, 184.34, 168.37, 167.55], '1M': [169.29, 167.8, 164.87, 166.99, 171.55, 173.39, 176.39, 173.88, 162.86, 163.81, 163.8, 156.79, 164.52, 165.84, 169, 167.34, 170.94, 177.02, 184.34, 168.37, 167.55], 'YTD': [101.97, 102.72, 107.98, 111.57, 115.62, 113.87, 111.9, 116.88, 121.79, 110.55, 107.87, 120.27, 127.01, 121.26, 128.63, 131.38, 140.13, 137.37, 172.49, 170.74, 158.23, 167.8, 176.39, 163.8, 167.34, 167.55], '6M': [103.97, 106.82, 105.38, 112.5, 110.58, 115.79, 114.62, 113.25, 114.93, 120.27, 108.13, 114.3, 121, 112.75, 118.92, 134.48, 137, 138.3, 169.41, 173.39, 160.69, 169.29, 173.39, 163.8, 167.34, 167.55], '1Y': [72, 73.44, 74.67, 77.23, 77.09, 78.42, 90.24, 90.61, 88.04, 91.11, 91.93, 95.71, 98.65, 96.6, 99.43, 97.73, 101.1, 96.93, 106.28, 112.5, 111.46, 105.74, 106.53, 108.27, 109.15, 98.28, 103.97, 106.82, 105.38, 112.5, 110.58, 115.79, 114.62, 115.22, 118.22, 111.65, 108.13, 114.3, 121, 112.75, 118.92, 134.48, 137, 138.3, 169.41, 170.74, 160.69, 169.29, 173.39, 163.8, 167.34, 167.55] },
      velocityScore: { '1D': -2.8, '1W': 2, '1M': -14.5, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 56.8, revenueGrowth: 54, eps: 2.95, grossMargin: 37, dividendYield: 0.5,
      etfPresence: { POW: 4.02, VOLT: 3.07, PBD: false, PBW: false, IVEP: 3.19 },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'HUBB', name: 'HUBB', easyScore: 3, avgWeight: 2.99, proScore: 1.79, coverage: 0.6,
      price: 518.18, weeklyPrices: [508.87, 523.69, 539.39, 509.96, 518.18], weeklyChange: 1.83, dayChange: 1.61, sortRank: 0, periodReturns: { '1M': 9.1, 'YTD': 16.7, '6M': 13.6, '1Y': 29.9 },
      priceHistory: { '1D': [509.96, 507.46, 513.88, 514.29, 514.43, 516, 515.34, 515.97, 514.01, 516.08, 515.66, 515.54, 514.95, 513.94, 512.32, 512.21, 513.43, 514.55, 515.34, 514.99, 514.94, 514.29, 516.08, 518.18], '1W': [508.87, 523.69, 539.39, 509.96, 518.18], '1M': [478.05, 484.25, 473.93, 473.61, 462.93, 480.46, 484.91, 485.27, 476.82, 485.03, 486.47, 467.59, 469.32, 476.89, 489.73, 502.65, 508.87, 523.69, 539.39, 509.96, 518.18], 'YTD': [444.11, 460.87, 484.11, 484.06, 497.97, 487.4, 516.02, 526.56, 524.19, 476.51, 468.41, 477.47, 503.2, 500.38, 534.67, 526.94, 549.75, 545.93, 502.34, 485.98, 461.5, 484.25, 484.91, 486.47, 502.65, 518.18], '6M': [456.28, 463.03, 470.53, 489.31, 486.82, 495.59, 506.14, 524.12, 516.99, 516.98, 487.76, 472.64, 489.07, 472.07, 499.31, 545.62, 549.11, 544.71, 507.81, 490.16, 470.87, 478.05, 480.46, 486.47, 502.65, 518.18], '1Y': [399.06, 415.12, 422.26, 437.23, 437.5, 437.48, 423.57, 443.95, 429.96, 446.06, 437.16, 450.93, 440.1, 420.44, 423.42, 418.89, 434.05, 422.63, 472.57, 468.06, 453, 419.09, 428.47, 437.71, 462.82, 434.85, 456.28, 463.03, 470.53, 489.31, 486.82, 495.59, 506.14, 524.25, 526.75, 488.49, 487.76, 472.64, 489.07, 472.07, 499.31, 545.62, 549.11, 544.71, 507.81, 485.98, 470.87, 478.05, 480.46, 486.47, 502.65, 518.18] },
      velocityScore: { '1D': -1.6, '1W': 1.1, '1M': -15.6, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 30.6, revenueGrowth: 11, eps: 16.93, grossMargin: 36, dividendYield: 1.11,
      etfPresence: { POW: 3.04, VOLT: 3.39, PBD: false, PBW: false, IVEP: 2.53 },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'BELFB', name: 'BELFB', easyScore: 2, avgWeight: 5.44, proScore: 2.18, coverage: 0.4,
      price: 294.15, weeklyPrices: [299.84, 296.39, 304.33, 288.64, 294.15], weeklyChange: -1.9, dayChange: 1.91, sortRank: 0, periodReturns: { '1M': 8.9, 'YTD': 73.4, '6M': 67, '1Y': 221.2 },
      priceHistory: { '1D': [288.64, 284.61, 287.58, 292.9, 293.94, 300.01, 298, 299.12, 299.02, 296.36, 298.05, 294.59, 294.67, 291.38, 291.49, 291.49, 290.89, 291.77, 290.08, 290.19, 289.52, 289.25, 290.7, 294.15], '1W': [299.84, 296.39, 304.33, 288.64, 294.15], '1M': [276.25, 280.13, 276.96, 274.52, 269.86, 269.22, 280.09, 276.54, 262.56, 279.13, 276.04, 276.95, 296.55, 293.87, 302.15, 293.22, 299.84, 296.39, 304.33, 288.64, 294.15], 'YTD': [169.63, 180.24, 196.61, 200.29, 210.44, 208, 231.48, 230.06, 232.12, 202.58, 195.18, 205.74, 220.77, 203.04, 235, 236.04, 262.68, 258.26, 286.89, 298.22, 249.71, 280.13, 280.09, 276.04, 293.22, 294.15], '6M': [176.17, 172.78, 187.43, 200.11, 205.17, 215.59, 229.32, 232.84, 231.83, 222.45, 191.81, 205.11, 214.98, 197.83, 210.32, 237.34, 257.41, 249.82, 297.17, 302.73, 258.28, 276.25, 269.22, 276.04, 293.22, 294.15], '1Y': [91.58, 98.83, 102.3, 101.32, 102.98, 130.04, 131.1, 134.58, 128.41, 140.42, 143.06, 148.32, 150.97, 142.72, 142.44, 142.94, 150.77, 148.25, 152.46, 154.86, 153.75, 144.89, 152.69, 163.19, 175.36, 166.55, 176.17, 172.78, 187.43, 200.11, 205.17, 215.59, 229.32, 235.3, 234.4, 213.65, 191.81, 205.11, 214.98, 197.83, 210.32, 237.34, 257.41, 249.82, 297.17, 298.22, 258.28, 276.25, 269.22, 276.04, 293.22, 294.15] },
      velocityScore: { '1D': -0.9, '1W': -1.8, '1M': -40.1, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 70.7, revenueGrowth: 17, eps: 4.16, grossMargin: 39, dividendYield: 0.1,
      etfPresence: { POW: 3.41, VOLT: 7.47, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 2, avgWeight: 3.26, proScore: 1.3, coverage: 0.4,
      price: 316.43, weeklyPrices: [317.58, 333.05, 357.96, 318.32, 316.43], weeklyChange: -0.36, dayChange: -0.59, sortRank: 0, periodReturns: { '1M': -3.4, 'YTD': 95.3, '6M': 89.6, '1Y': 160.1 },
      priceHistory: { '1D': [318.32, 311.91, 318.67, 316.26, 321.52, 321.82, 320.92, 322.14, 321.19, 321.77, 319.77, 318.45, 316.7, 315.47, 313.08, 314.31, 313.27, 313.81, 313.4, 312.5, 312.23, 312.46, 313.79, 316.43], '1W': [317.58, 333.05, 357.96, 318.32, 316.43], '1M': [323.91, 319.78, 314.18, 315.71, 323.39, 334.49, 331.44, 323.92, 300.51, 300.57, 289.52, 280.98, 297.88, 302.87, 311.93, 299.6, 317.58, 333.05, 357.96, 318.32, 316.43], 'YTD': [162.01, 160.78, 172.54, 181.12, 195.1, 177.75, 236.51, 243.06, 259.23, 249.75, 265.38, 264.71, 276.16, 259.37, 287.64, 301.16, 305.14, 306.18, 358.92, 367.13, 322.63, 319.78, 331.44, 289.52, 299.6, 316.43], '6M': [166.87, 175.61, 163.58, 176.93, 181.23, 190.01, 202, 234.53, 245.42, 257.75, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.92, 339.73, 323.91, 334.49, 289.52, 299.6, 316.43], '1Y': [121.64, 124.33, 120.72, 131.12, 130.87, 145.6, 139.75, 137.4, 127.54, 129.31, 125.7, 135.71, 141.96, 139.77, 161.64, 168.88, 180.51, 171.59, 199.27, 190.71, 173.37, 170.65, 172.02, 182.54, 178.66, 154.39, 166.87, 175.61, 163.58, 176.93, 181.23, 190.01, 202, 243.53, 253.15, 244.44, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.13, 339.73, 323.91, 334.49, 289.52, 299.6, 316.43] },
      velocityScore: { '1D': -7.8, '1W': 4.8, '1M': -24, '6M': null }, isNew: false,
      marketCap: '$122B', pe: 79.5, revenueGrowth: 30, eps: 3.98, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 2.46, PBD: false, PBW: false, IVEP: 4.06 },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'AEP', name: 'AEP', easyScore: 2, avgWeight: 2.79, proScore: 1.12, coverage: 0.4,
      price: 134.96, weeklyPrices: [128.27, 127.69, 130.30, 133.74, 134.96], weeklyChange: 5.22, dayChange: 0.91, sortRank: 0, periodReturns: { '1M': 2.6, 'YTD': 17, '6M': 17, '1Y': 33.1 },
      priceHistory: { '1D': [133.74, 134.62, 134.33, 133.94, 133.56, 133.85, 133.64, 133.82, 133.97, 133.8, 133.43, 133.59, 133.09, 133.27, 133.07, 133.25, 133.76, 133.77, 134.3, 134.48, 134.72, 134.46, 134.8, 134.96], '1W': [128.27, 127.69, 130.3, 133.74, 134.96], '1M': [130.9, 129.57, 127.76, 126.67, 123.79, 127.11, 126.31, 127.79, 129.14, 126.77, 127.76, 128.53, 128.48, 129.23, 129.31, 129.75, 128.27, 127.69, 130.3, 133.74, 134.96], 'YTD': [115.31, 115.93, 119.4, 117.18, 119.21, 120.61, 126.43, 128.42, 132.1, 132.04, 132.22, 130.97, 128.3, 131.67, 137.15, 134.39, 131.62, 134.44, 132.56, 131.94, 128.92, 129.57, 126.31, 127.76, 129.75, 134.96], '6M': [115.31, 115.81, 116.91, 119.96, 118.02, 118.33, 121.1, 129.94, 132.03, 133.29, 131.86, 134.15, 127.92, 131.12, 132.92, 135.46, 131.89, 135.59, 137.04, 130.7, 127.68, 130.9, 127.11, 127.76, 129.75, 134.96], '1Y': [101.41, 103.26, 106.04, 105.93, 108.97, 113.14, 113.49, 113.11, 113.55, 112.89, 108.64, 108.74, 106.44, 107.86, 113.46, 116.91, 118.53, 117.27, 122.11, 119.76, 122.68, 121.71, 122.72, 118.04, 114.26, 115.58, 115.31, 115.81, 116.91, 119.96, 118.02, 118.33, 121.1, 130.24, 132.39, 131.92, 131.86, 134.15, 127.92, 131.12, 132.92, 135.46, 131.89, 135.59, 137.04, 131.94, 127.68, 130.9, 127.11, 127.76, 129.75, 134.96] },
      velocityScore: { '1D': 4.7, '1W': 0.9, '1M': -44.3, '6M': null }, isNew: false,
      marketCap: '$73B', pe: 20, revenueGrowth: 10, eps: 6.75, grossMargin: 47, dividendYield: 2.84,
      etfPresence: { POW: 1.33, VOLT: 4.26, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 2.62, proScore: 1.05, coverage: 0.4,
      price: 75.87, weeklyPrices: [71.25, 73.12, 74.95, 75.79, 75.87], weeklyChange: 6.48, dayChange: 0.11, sortRank: 0, periodReturns: { '1M': -3.3, 'YTD': 26.2, '6M': 27.6, '1Y': 25 },
      priceHistory: { '1D': [75.79, 74.87, 75.4, 74.98, 75.38, 75.56, 75.37, 75.38, 75.67, 75.25, 75.16, 75.29, 75.47, 75.49, 75.26, 75.11, 75.29, 75.42, 75.57, 75.79, 75.86, 75.59, 75.83, 75.87], '1W': [71.25, 73.12, 74.95, 75.79, 75.87], '1M': [76.34, 74.37, 73.13, 71.39, 70.04, 71.31, 71.66, 72.43, 71.96, 71.59, 71.59, 72.26, 71.62, 72.08, 71.49, 71.48, 71.25, 73.12, 74.95, 75.79, 75.87], 'YTD': [60.11, 61.15, 60.29, 63.72, 67.24, 67.42, 71.13, 72.17, 74.77, 74.77, 73.52, 72.8, 73.81, 71.83, 72.82, 70.76, 71.1, 73.32, 73.76, 74.73, 79.4, 74.37, 71.66, 71.59, 71.48, 75.87], '6M': [59.46, 60.85, 60.32, 61.55, 64.29, 66.34, 67.85, 72.28, 72.98, 76.26, 73.18, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 76.12, 74.18, 77.69, 76.34, 71.31, 71.59, 71.48, 75.87], '1Y': [60.69, 59.14, 57.78, 58.09, 58.75, 59.95, 58.64, 57.86, 57.22, 57.49, 57.58, 59.33, 60.38, 63.31, 64.06, 63.1, 63.78, 62.16, 56.98, 57.54, 60.43, 58.89, 60.22, 63.66, 60.92, 58.66, 59.46, 60.85, 60.32, 61.55, 64.29, 66.34, 67.85, 71.96, 73.5, 75.88, 73.18, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 76.12, 74.73, 77.69, 76.34, 71.31, 71.59, 71.48, 75.87] },
      velocityScore: { '1D': 5, '1W': 5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$93B', pe: 33.3, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.77,
      etfPresence: { POW: false, VOLT: 1.54, PBD: false, PBW: false, IVEP: 3.7 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'JCI', name: 'JOHNSON CONTROLS INTERNATIONAL PLC', easyScore: 2, avgWeight: 2.43, proScore: 0.97, coverage: 0.4,
      price: 142.81, weeklyPrices: [143.62, 144.82, 148.21, 141.28, 142.81], weeklyChange: -0.56, dayChange: 1.08, sortRank: 0, periodReturns: { '1M': 3.2, 'YTD': 19.3, '6M': 17.6, '1Y': 38.2 },
      priceHistory: { '1D': [141.28, 140.99, 141.88, 142.75, 143.32, 143.88, 143.9, 144.31, 143.43, 143.6, 143.18, 143.07, 142.95, 142.94, 142.5, 142.65, 142.71, 142.57, 142.56, 142.53, 142.69, 142.44, 142.58, 142.81], '1W': [143.62, 144.82, 148.21, 141.28, 142.81], '1M': [140.22, 138.2, 136.15, 134.06, 133.91, 141.99, 146.96, 147.4, 143.65, 144.05, 147.75, 139.36, 144.01, 144.96, 146.06, 145.17, 143.62, 144.82, 148.21, 141.28, 142.81], 'YTD': [119.75, 111.29, 112.95, 114.51, 120.28, 132.52, 138.57, 142.7, 143.42, 137.18, 130.94, 133.76, 137.48, 134.72, 141.85, 137.21, 139.81, 141.35, 143.14, 141.04, 135.42, 138.2, 146.96, 147.75, 145.17, 142.81], '6M': [121.39, 122.31, 110.85, 114.61, 115.07, 122.98, 139, 139.24, 142.83, 145.46, 133.09, 131.69, 133.27, 126.58, 133.15, 142.05, 139.72, 141.59, 144.82, 141.78, 137.31, 140.22, 141.99, 147.75, 145.17, 142.81], '1Y': [103.35, 105.07, 106.33, 108.95, 110.02, 105, 104.67, 105.77, 106, 109.27, 107.09, 107.82, 108.48, 105.77, 108.66, 107.76, 110.82, 108.54, 113.34, 120.86, 122.66, 114.42, 116.29, 114.2, 118.06, 117.74, 121.39, 122.31, 110.85, 114.61, 115.07, 122.98, 139, 142.21, 144.71, 139.58, 133.09, 131.69, 133.27, 126.58, 133.15, 142.05, 139.72, 141.59, 144.82, 141.04, 137.31, 140.22, 141.99, 147.75, 145.17, 142.81] },
      velocityScore: { '1D': -1, '1W': -4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$87B', pe: 43.8, revenueGrowth: 8, eps: 3.26, grossMargin: 37, dividendYield: 1.13,
      etfPresence: { POW: false, VOLT: 1.38, PBD: false, PBW: false, IVEP: 3.48 },
      tonyNote: 'JOHNSON CONTROLS INTERNATIONAL PLC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CEG', name: 'CEG', easyScore: 2, avgWeight: 2.39, proScore: 0.96, coverage: 0.4,
      price: 267.97, weeklyPrices: [267.17, 274.06, 275.53, 270.26, 267.97], weeklyChange: 0.3, dayChange: -0.85, sortRank: 0, periodReturns: { '1M': -8.9, 'YTD': -24.1, '6M': -26.4, '1Y': -15 },
      priceHistory: { '1D': [270.26, 270.27, 269.5, 269.52, 270.44, 272.25, 272.21, 273.32, 272.59, 272.21, 271.97, 271.57, 270.7, 269.99, 268.2, 267.94, 268.38, 269.36, 268.37, 267.67, 267.03, 266.4, 267.83, 267.97], '1W': [267.17, 274.06, 275.53, 270.26, 267.97], '1M': [301.57, 288.68, 286.31, 287.75, 265.7, 272.65, 267.24, 264.59, 254.83, 250.67, 251.65, 242.3, 246.71, 253.76, 262.35, 268, 267.17, 274.06, 275.53, 270.26, 267.97], 'YTD': [353.27, 322.54, 341.2, 287.35, 287.45, 247.06, 276.12, 291.66, 323.56, 332.07, 301.55, 317.22, 303.32, 279.46, 280.25, 294.73, 287.16, 297, 322.78, 293.6, 260.67, 288.68, 267.24, 251.65, 268, 267.97], '6M': [363.95, 366.25, 342.52, 307.71, 285.27, 270.88, 272.15, 288.43, 293.8, 327.16, 322.99, 305.58, 289.76, 298.61, 272.58, 296.61, 277.7, 305.71, 320.42, 299.69, 262, 301.57, 272.65, 251.65, 268, 267.97], '1Y': [315.14, 306.63, 313.62, 308.08, 321.67, 347.84, 338.46, 327.63, 314.21, 315.94, 309.06, 318, 322.71, 326.33, 357.46, 383.23, 403.95, 350.06, 401.43, 363.25, 354.02, 357.48, 359.09, 368.62, 378.6, 361.05, 363.95, 366.25, 342.52, 307.71, 285.27, 270.88, 272.15, 303.01, 312.64, 324.87, 322.99, 305.58, 289.76, 298.61, 272.58, 296.61, 277.7, 305.71, 320.42, 293.6, 262, 301.57, 272.65, 251.65, 268, 267.97] },
      velocityScore: { '1D': 2.1, '1W': 1.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$96B', pe: 23.3, revenueGrowth: 64, eps: 11.51, grossMargin: 23, dividendYield: 0.63,
      etfPresence: { POW: 1.38, VOLT: false, PBD: false, PBW: false, IVEP: 3.41 },
      tonyNote: 'CEG appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX TECHNOLOGIES INC', easyScore: 2, avgWeight: 2.22, proScore: 0.89, coverage: 0.4,
      price: 205.65, weeklyPrices: [203.07, 205.40, 210.00, 209.89, 205.65], weeklyChange: 1.27, dayChange: -2.02, sortRank: 0, periodReturns: { '1M': 1.4, 'YTD': 19, '6M': 16.1, '1Y': 46 },
      priceHistory: { '1D': [209.89, 208.01, 208.68, 208.94, 209.35, 210, 210.23, 210.41, 209.35, 210.33, 210.21, 209.78, 209.33, 208.8, 207.24, 207.48, 207.55, 208.31, 208.38, 207.32, 206.6, 206.34, 206.12, 205.65], '1W': [203.07, 205.4, 210, 209.89, 205.65], '1M': [204.38, 198.95, 199.27, 195.88, 188.39, 187.26, 184.72, 190.76, 185.95, 187.46, 188.96, 183, 194.68, 193.45, 193.94, 196.93, 203.07, 205.4, 210, 209.89, 205.65], 'YTD': [172.84, 193.2, 213.25, 206.33, 210.18, 187.42, 196.9, 209.07, 207.24, 195.5, 197.82, 208.98, 222.13, 212.81, 230.29, 238.42, 219.1, 208.08, 215.2, 206.83, 197.33, 198.95, 184.72, 188.96, 196.93, 205.65], '6M': [177.18, 181.85, 201.46, 217.89, 206.04, 206.04, 203, 200.4, 198.38, 216.47, 200.39, 204.67, 204.85, 191.59, 214.44, 238.27, 216.66, 216.18, 206.15, 210.8, 201.94, 204.38, 187.26, 188.96, 196.93, 205.65], '1Y': [140.86, 140.77, 136.45, 142.34, 143.84, 151.93, 179.74, 176.76, 163.56, 165.6, 163.79, 170.1, 174.03, 176.21, 185.7, 195.6, 203.82, 191.17, 213.69, 198.12, 196.77, 179.81, 178.18, 178.33, 183.38, 170.75, 177.18, 181.85, 201.46, 217.89, 206.04, 206.04, 203, 201.09, 204.23, 205.83, 200.39, 204.67, 204.85, 191.59, 214.44, 238.27, 216.66, 216.18, 206.15, 206.83, 201.94, 204.38, 187.26, 188.96, 196.93, 205.65] },
      velocityScore: { '1D': 3.5, '1W': 6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 54.7, revenueGrowth: 26, eps: 3.76, grossMargin: 23, dividendYield: 0.5,
      etfPresence: { POW: false, VOLT: 2.17, PBD: false, PBW: false, IVEP: 2.27 },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'XEL', name: 'XEL', easyScore: 2, avgWeight: 1.9, proScore: 0.76, coverage: 0.4,
      price: 81.47, weeklyPrices: [77.46, 77.41, 78.81, 80.33, 81.47], weeklyChange: 5.18, dayChange: 1.42, sortRank: 0, periodReturns: { '1M': 0.5, 'YTD': 10.3, '6M': 10, '1Y': 21 },
      priceHistory: { '1D': [80.33, 81.18, 81.04, 80.82, 80.66, 80.73, 80.65, 80.81, 80.9, 80.87, 80.82, 80.69, 80.39, 80.54, 80.46, 80.51, 80.88, 80.96, 81.18, 81.34, 81.39, 81.17, 81.39, 81.47], '1W': [77.46, 77.41, 78.81, 80.33, 81.47], '1M': [80.78, 81, 79.26, 79.5, 76.41, 77.87, 77.39, 77.77, 79.04, 77.62, 77.87, 78.1, 78.27, 79.22, 79.35, 78.98, 77.46, 77.41, 78.81, 80.33, 81.47], 'YTD': [73.86, 73.38, 75.36, 75.86, 75.97, 76.12, 78.98, 80.82, 83.47, 82.38, 80.82, 80.02, 77.7, 79.71, 82.77, 78.65, 78.11, 78.82, 80.55, 79.9, 79.73, 81, 77.39, 77.87, 78.98, 81.47], '6M': [74.09, 74.68, 74.26, 75.61, 75.73, 74.5, 76.43, 81.59, 83.35, 83.8, 82.1, 81.63, 76.95, 79.17, 80.54, 79.83, 79.08, 79.48, 81.45, 80.6, 78.1, 80.78, 77.87, 77.87, 78.98, 81.47], '1Y': [67.32, 67.56, 68.45, 69.65, 72.78, 73.44, 73.3, 72.92, 73.17, 72.87, 72.24, 72.85, 72.17, 77.25, 79.6, 81.26, 81.8, 80.69, 79.69, 81.19, 80.72, 79.67, 81.25, 77.77, 74.68, 73.61, 74.09, 74.68, 74.26, 75.61, 75.73, 74.5, 76.43, 80.75, 83.91, 83.17, 82.1, 81.63, 76.95, 79.17, 80.54, 79.83, 79.08, 79.48, 81.45, 79.9, 78.1, 80.78, 77.87, 77.87, 78.98, 81.47] },
      velocityScore: { '1D': 2.7, '1W': -1.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$51B', pe: 23.5, revenueGrowth: 3, eps: 3.47, grossMargin: 46, dividendYield: 2.95,
      etfPresence: { POW: 1.88, VOLT: 1.92, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'XEL appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 1.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NRG', name: 'NRG ENERGY INC', easyScore: 2, avgWeight: 1.65, proScore: 0.66, coverage: 0.4,
      price: 142.21, weeklyPrices: [132.13, 135.06, 138.91, 137.66, 142.21], weeklyChange: 7.63, dayChange: 3.31, sortRank: 0, periodReturns: { '1M': 3.3, 'YTD': -10.7, '6M': -11.4, '1Y': -7.2 },
      priceHistory: { '1D': [137.66, 137.67, 138.4, 139.3, 140.23, 140.61, 140.41, 141.33, 141.29, 141.91, 141.72, 142.74, 142.14, 141.79, 140.74, 140.67, 141.32, 141.65, 141.74, 141.64, 141.27, 141.13, 141.38, 142.21], '1W': [132.13, 135.06, 138.91, 137.66, 142.21], '1M': [140.43, 138, 137.5, 134.08, 129.47, 133.51, 133.76, 133.39, 129.2, 127.71, 129.96, 120.65, 123.7, 125.47, 130.4, 132.1, 132.13, 135.06, 138.91, 137.66, 142.21], 'YTD': [159.24, 143.53, 158.5, 151.09, 153.72, 144.44, 161.8, 175.01, 181.34, 160.46, 152.1, 159.11, 151.04, 149.9, 161.78, 168.45, 149.6, 149.01, 150.64, 137.34, 123.71, 138, 133.76, 129.96, 132.1, 142.21], '6M': [160.56, 166.16, 149.27, 152.05, 149.93, 149.11, 155.72, 172.35, 176.52, 175.58, 155.42, 152.48, 151.77, 141.23, 153.06, 170.96, 149.86, 154.81, 157.43, 137.3, 125.5, 140.43, 133.51, 129.96, 132.1, 142.21], '1Y': [153.32, 155.54, 151.36, 147.38, 157.97, 167.2, 148.56, 155, 148.19, 148.12, 147.95, 157.92, 164.19, 162.96, 167.3, 168.25, 171.33, 160.42, 178.5, 173.19, 168.84, 168.8, 168.54, 169.36, 170.64, 154.64, 160.56, 166.16, 149.27, 152.05, 149.93, 149.11, 155.72, 173.45, 184.03, 162.06, 155.42, 152.48, 151.77, 141.23, 153.06, 170.96, 149.86, 154.81, 157.43, 137.34, 125.5, 140.43, 133.51, 129.96, 132.1, 142.21] },
      velocityScore: { '1D': 3.1, '1W': -10.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$30B', pe: 156.3, revenueGrowth: 20, eps: 0.91, grossMargin: 16, dividendYield: 1.38,
      etfPresence: { POW: false, VOLT: 0.98, PBD: false, PBW: false, IVEP: 2.32 },
      tonyNote: 'NRG ENERGY INC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 1.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SHLS', name: 'Shoals Technologies Group Inc', easyScore: 2, avgWeight: 1.54, proScore: 0.62, coverage: 0.4,
      price: 10.2, weeklyPrices: [9.44, 10.42, 10.94, 10.28, 10.20], weeklyChange: 8.05, dayChange: -0.78, sortRank: 0, periodReturns: { '1M': 2.9, 'YTD': 20, '6M': 11, '1Y': 109.4 },
      priceHistory: { '1D': [10.28, 10.22, 10.31, 10.24, 10.44, 10.48, 10.43, 10.42, 10.41, 10.38, 10.44, 10.29, 10.24, 10.34, 10.31, 10.32, 10.16, 10.21, 10.13, 10.1, 9.99, 10.08, 10.23, 10.2], '1W': [9.44, 10.42, 10.94, 10.28, 10.2], '1M': [10.82, 12.12, 12.2, 12.45, 12.18, 12.46, 12.39, 12.77, 10.81, 10.88, 9.63, 9.25, 9.89, 10.43, 10.3, 9.96, 9.44, 10.42, 10.94, 10.28, 10.2], 'YTD': [8.5, 8.6, 9.37, 9.66, 10.02, 9.65, 9.66, 10.19, 6.35, 5.85, 6.12, 5.95, 6.91, 6.9, 6.97, 7.23, 7.5, 7.34, 8.33, 8.63, 9.28, 12.12, 12.39, 9.63, 9.96, 10.2], '6M': [9.19, 9.09, 8.66, 9.27, 9.27, 9.32, 10.4, 10.24, 9.9, 5.96, 5.75, 6.2, 6.24, 6.25, 6.41, 7.22, 6.87, 7.65, 8.13, 9.32, 9.66, 10.82, 12.46, 9.63, 9.96, 10.2], '1Y': [4.87, 5.47, 5.78, 5.7, 5.61, 5.39, 4.62, 4.88, 6.15, 6.5, 7.15, 6.92, 7.55, 7.58, 8.91, 9, 10.85, 9.94, 10.62, 9.33, 8.93, 8.09, 8.17, 7.93, 9.59, 8.64, 9.19, 9.09, 8.66, 9.27, 9.27, 9.32, 10.4, 10.7, 6.84, 5.91, 5.75, 6.2, 6.24, 6.25, 6.41, 7.22, 6.87, 7.65, 8.13, 8.63, 9.66, 10.82, 12.46, 9.63, 9.96, 10.2] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2B', pe: 51, revenueGrowth: 75, eps: 0.2, grossMargin: 33, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: 1.11, PBW: 1.98, IVEP: false },
      tonyNote: 'Shoals Technologies Group Inc appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 1.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VICR', name: 'VICR', easyScore: 1, avgWeight: 5.7, proScore: 1.14, coverage: 0.2,
      price: 322.28, weeklyPrices: [325.17, 331.37, 365.53, 336.12, 322.28], weeklyChange: -0.89, dayChange: -4.12, sortRank: 0, periodReturns: { '1M': 20.3, 'YTD': 194.1, '6M': 197.1, '1Y': 599.8 },
      priceHistory: { '1D': [336.12, 322.99, 327.18, 328.27, 337.39, 341.14, 336.01, 333.73, 333.42, 332.51, 333.94, 331.23, 329.04, 326.81, 321.61, 322.15, 321.68, 320.81, 319.96, 318.57, 315.74, 316.27, 316.89, 322.28], '1W': [325.17, 331.37, 365.53, 336.12, 322.28], '1M': [332.95, 345.84, 342.09, 334.84, 328.85, 332.95, 330.48, 306.12, 271.04, 274.97, 283.48, 275.51, 298.06, 303.77, 322.41, 320.46, 325.17, 331.37, 365.53, 336.12, 322.28], 'YTD': [109.6, 136.11, 145.48, 166.78, 171.53, 148.19, 164.29, 152.84, 205.64, 181.92, 167.81, 191.84, 186, 158.16, 184.92, 194.2, 265, 256.7, 280.34, 292.53, 243.43, 345.84, 330.48, 283.48, 320.46, 322.28], '6M': [108.46, 116.86, 142.31, 149.88, 158.46, 165.35, 159.04, 155.96, 171.8, 209.19, 170.03, 185.42, 173.07, 142.22, 159.83, 190.1, 246.24, 248.7, 266.01, 312.96, 249.02, 332.95, 332.95, 283.48, 320.46, 322.28], '1Y': [46.05, 45.85, 47.06, 48.39, 47.15, 44.44, 46.13, 49.48, 46.49, 51.32, 51.9, 50.96, 53.84, 52.14, 48.88, 52.62, 57.31, 85.76, 91.17, 94.88, 94.35, 85.07, 89.54, 94.54, 100.97, 98.29, 108.46, 116.86, 142.31, 149.88, 158.46, 165.35, 159.04, 157.28, 190.3, 201.97, 170.03, 185.42, 173.07, 142.22, 159.83, 190.1, 246.24, 248.7, 266.01, 292.53, 249.02, 332.95, 332.95, 283.48, 320.46, 322.28] },
      velocityScore: { '1D': 0, '1W': null, '1M': -50.6, '6M': null }, isNew: false,
      marketCap: '$15B', pe: 107.8, revenueGrowth: 20, eps: 2.99, grossMargin: 54, dividendYield: null,
      etfPresence: { POW: 5.7, VOLT: false, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Vicor Corp is a power conversion specialist — high-efficiency modules for AI server power delivery. It holds a niche position in Industrials ETFs on the data center power density thesis. Revenue growth has been lumpy, but when AI GPU clusters require Vicor\'s factorized power architecture, the order cycles are large.',
    },
    {
      ticker: 'AEIS', name: 'ADVANCED ENERGY INDUSTRIES INC', easyScore: 1, avgWeight: 4.5, proScore: 0.9, coverage: 0.2,
      price: 359.61, weeklyPrices: [353.32, 372.59, 388.23, 364.96, 359.61], weeklyChange: 1.78, dayChange: -1.47, sortRank: 0, periodReturns: { '1M': 10.7, 'YTD': 71.8, '6M': 65.5, '1Y': 169.8 },
      priceHistory: { '1D': [364.96, 356.8, 358.95, 361.33, 367.64, 369.57, 369.17, 367.82, 367.32, 366.61, 365.21, 363.12, 363.17, 360, 357.32, 357.97, 356.32, 357.76, 357.77, 357.09, 355.52, 356.3, 357.68, 359.61], '1W': [353.32, 372.59, 388.23, 364.96, 359.61], '1M': [339.65, 328.34, 317.08, 302.18, 294.65, 312.28, 322.5, 320.92, 294.81, 306.11, 311.64, 308.17, 340.4, 354.37, 370.66, 350.45, 353.32, 372.59, 388.23, 364.96, 359.61], 'YTD': [209.37, 210.99, 257.29, 275.57, 269.12, 257.64, 312.95, 320.64, 337.35, 311.42, 305.82, 319.63, 342.87, 332.82, 374.98, 374.32, 377.19, 361.39, 360.81, 339.42, 302.84, 328.34, 322.5, 311.64, 350.45, 359.61], '6M': [217.23, 221.99, 219.59, 253.86, 263.03, 261.82, 279.17, 314.27, 329.24, 340.42, 305.02, 308.31, 329.78, 298.29, 339.32, 385.73, 385, 369.08, 345.63, 354.97, 309.06, 339.65, 312.28, 311.64, 350.45, 359.61], '1Y': [133.28, 137.55, 143.62, 142.73, 140.91, 138.92, 139.81, 162.52, 147.74, 153.73, 150.14, 159.52, 169.75, 167.35, 178.08, 179.98, 189.96, 190.46, 208.05, 225.8, 212.79, 198.89, 209.9, 214.65, 224.11, 208.77, 217.23, 221.99, 219.59, 253.86, 263.03, 261.82, 279.17, 314.12, 335.74, 322.47, 305.02, 308.31, 329.78, 298.29, 339.32, 385.73, 385, 369.08, 345.63, 339.42, 309.06, 339.65, 312.28, 311.64, 350.45, 359.61] },
      velocityScore: { '1D': -2.2, '1W': -17.4, '1M': -50, '6M': null }, isNew: false,
      marketCap: '$14B', pe: 74.6, revenueGrowth: 26, eps: 4.82, grossMargin: 39, dividendYield: 0.11,
      etfPresence: { POW: false, VOLT: 4.5, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 5.53, proScore: 2.21, coverage: 0.4,
      price: 867.23, weeklyPrices: [838.21, 861.88, 932.75, 892.25, 867.23], weeklyChange: 3.46, dayChange: -2.8, sortRank: 0, periodReturns: { '1M': 18.3, 'YTD': 183.2, '6M': 176.2, '1Y': 286.1 },
      priceHistory: { '1D': [892.25, 884.78, 902.49, 900.98, 911.35, 914.06, 911.38, 912.67, 902.63, 898.15, 895.21, 888, 881.82, 870.99, 861, 868.28, 869.54, 870.1, 869.44, 866.72, 862.4, 861.88, 862.68, 867.23], '1W': [838.21, 861.88, 932.75, 892.25, 867.23], '1M': [783.53, 782.12, 842.96, 860.84, 845.39, 875.52, 957.03, 993.74, 882.43, 891.86, 842.01, 770.25, 838.55, 858.99, 866.67, 857.76, 838.21, 861.88, 932.75, 892.25, 867.23], 'YTD': [306.23, 297.62, 336.31, 364.25, 379.23, 365.07, 431.43, 415.13, 433.34, 398.87, 404.59, 421.23, 452.92, 421.29, 435.65, 456.08, 487.87, 469.75, 886.22, 851.35, 728.29, 782.12, 957.03, 842.01, 857.76, 867.23], '6M': [314, 319.16, 308.13, 350.96, 361.21, 367.95, 418.61, 437.77, 434.64, 432.87, 411.38, 417.76, 422.55, 382.55, 382.22, 464.54, 472.84, 471.85, 806, 868.18, 770.76, 783.53, 875.52, 842.01, 857.76, 867.23], '1Y': [224.64, 228.72, 236.29, 250.69, 252.68, 267.59, 299.42, 292.47, 274.89, 289.36, 288.68, 316.16, 348.58, 338.44, 351.66, 355.53, 365.39, 332.75, 403.35, 411.07, 380.7, 334.17, 339.75, 332.29, 340.51, 302.3, 314, 319.16, 308.13, 350.96, 361.21, 367.95, 418.61, 421.2, 459.72, 415.51, 411.38, 417.76, 422.55, 382.55, 382.22, 464.54, 472.84, 471.85, 806, 851.35, 770.76, 783.53, 875.52, 842.01, 857.76, 867.23] },
      velocityScore: { '1D': -1.3, '1W': 3.3, '1M': -53.4, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 77.8, revenueGrowth: 92, eps: 11.15, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 6.55, PRN: 4.5, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 5.16, proScore: 2.06, coverage: 0.4,
      price: 994.45, weeklyPrices: [955.92, 985.82, 1022.28, 984.24, 994.45], weeklyChange: 4.03, dayChange: 1.04, sortRank: 0, periodReturns: { '1M': 13, 'YTD': 73.6, '6M': 70.4, '1Y': 167.6 },
      priceHistory: { '1D': [984.24, 974.52, 988.99, 986.95, 994.56, 1001.38, 998.43, 1002.78, 1001.02, 999.88, 1001.84, 1000.79, 994.9, 989.83, 980.02, 981.79, 980.2, 981.81, 983.49, 981.87, 983.06, 982.86, 988.82, 994.45], '1W': [955.92, 985.82, 1022.28, 984.24, 994.45], '1M': [908.55, 909.93, 887.67, 875.87, 865.36, 909.81, 926.18, 940.48, 904.28, 915.64, 914.7, 856.16, 897.63, 910.57, 933.93, 945.46, 955.92, 985.82, 1022.28, 984.24, 994.45], 'YTD': [572.87, 608.13, 647.18, 648.41, 665.24, 678.31, 758.29, 760.53, 752.93, 706.08, 700.69, 693.62, 719.04, 730.32, 787.07, 770.17, 808.87, 810.05, 926.93, 912.14, 860.15, 909.93, 926.18, 914.7, 945.46, 994.45], '6M': [583.76, 598.41, 617.62, 646.89, 635.92, 690.91, 742.12, 774.2, 756.47, 752.32, 704.82, 699.78, 701.7, 667.43, 724.44, 794.25, 800.45, 817.87, 904.59, 926.79, 863.95, 908.55, 909.81, 914.7, 945.46, 994.45], '1Y': [371.58, 398.43, 408.33, 418.07, 429.52, 438.02, 427.72, 413.7, 420.59, 432.67, 420.22, 431.38, 466.96, 463.72, 490.57, 500.36, 534.05, 513.91, 585.49, 569.15, 573.02, 553.11, 573.73, 599.15, 625.61, 565.83, 583.76, 598.41, 617.62, 646.89, 635.92, 690.91, 742.12, 764.76, 768.23, 722.18, 704.82, 699.78, 701.7, 667.43, 724.44, 794.25, 800.45, 817.87, 904.59, 912.14, 863.95, 908.55, 909.81, 914.7, 945.46, 994.45] },
      velocityScore: { '1D': -0.5, '1W': 3, '1M': -10, '6M': null }, isNew: false,
      marketCap: '$458B', pe: 49.5, revenueGrowth: 22, eps: 20.08, grossMargin: 29, dividendYield: 0.66,
      etfPresence: { AIRR: false, PRN: 3.43, RSHO: 6.89, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 4.96, proScore: 1.99, coverage: 0.4,
      price: 294.49, weeklyPrices: [294.03, 297.20, 307.80, 291.50, 294.49], weeklyChange: 0.16, dayChange: 1.03, sortRank: 0, periodReturns: { '1M': 5.5, 'YTD': 177.1, '6M': 162.8, '1Y': 364.3 },
      priceHistory: { '1D': [291.5, 287.96, 297.8, 295.12, 297.89, 300.83, 300.95, 301.14, 299.85, 299.46, 299.61, 298.64, 297.36, 294.64, 293.04, 294.06, 293.17, 293.04, 293, 291.01, 290.96, 291.57, 293.17, 294.49], '1W': [294.03, 297.2, 307.8, 291.5, 294.49], '1M': [291.97, 295.94, 288.9, 284.42, 288.12, 299.07, 299.73, 300.06, 284.87, 293.6, 283.51, 262.34, 290.5, 294.75, 303.53, 292.7, 294.03, 297.2, 307.8, 291.5, 294.49], 'YTD': [106.26, 119.94, 135.18, 142.29, 152.31, 179.6, 197.63, 178.79, 176.96, 167.67, 171.19, 167.41, 194.85, 184.68, 230.81, 229.73, 242.77, 253.49, 320.3, 308.05, 261.58, 295.94, 299.73, 283.51, 292.7, 294.49], '6M': [112.06, 117.51, 121.83, 139.99, 141.15, 146.79, 187.3, 195.02, 181.38, 177.5, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 322.05, 266.8, 291.97, 299.07, 283.51, 292.7, 294.49], '1Y': [63.42, 72.84, 70.96, 78.84, 80.05, 79.03, 75.95, 86.57, 82.17, 91.46, 90.24, 97.47, 101.43, 94.58, 102.51, 103.18, 109.92, 110.96, 136.12, 131.92, 118.74, 95.1, 107.26, 112.31, 120.91, 109.59, 112.06, 117.51, 121.83, 139.99, 141.15, 146.79, 187.3, 187.21, 186.39, 170.37, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 266.8, 291.97, 299.07, 283.51, 292.7, 294.49] },
      velocityScore: { '1D': -0.5, '1W': -4.8, '1M': 9.3, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 57.4, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { AIRR: 2.6, PRN: false, RSHO: 7.33, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, avgWeight: 4.57, proScore: 1.83, coverage: 0.4,
      price: 732.24, weeklyPrices: [719.52, 738.85, 790.00, 736.77, 732.24], weeklyChange: 1.77, dayChange: -0.61, sortRank: 0, periodReturns: { '1M': 11.6, 'YTD': 133.7, '6M': 123.1, '1Y': 250.3 },
      priceHistory: { '1D': [736.77, 721.7, 738.56, 735.18, 738.22, 745.46, 742.3, 739.92, 740, 742.46, 748.56, 744.62, 746.37, 739.22, 734.72, 737.34, 731.47, 731.47, 732.53, 728.29, 727.18, 729.84, 727.39, 732.24], '1W': [719.52, 738.85, 790, 736.77, 732.24], '1M': [670.66, 673.51, 677.45, 667.02, 646.89, 663.14, 686.37, 689.43, 694.72, 619.98, 613.93, 588.9, 623.66, 641.68, 688.87, 690.39, 719.52, 738.85, 790, 736.77, 732.24], 'YTD': [313.32, 313.98, 329.66, 380.36, 355.51, 345.97, 413.65, 432.18, 452.53, 430.25, 459.3, 469.81, 437.48, 571.38, 609.29, 606.43, 651.68, 630.07, 727.54, 681.01, 639.58, 673.51, 686.37, 613.93, 690.39, 732.24], '6M': [328.26, 325.96, 311.87, 383.66, 353.5, 355.77, 370, 409.95, 441.71, 445.36, 466.38, 466.52, 463.15, 513.98, 576.95, 603.91, 615.42, 630.7, 720, 683.52, 664.76, 670.66, 663.14, 613.93, 690.39, 732.24], '1Y': [209.05, 206.15, 208.46, 203.84, 224.37, 244.98, 229.9, 229.52, 215.89, 226.87, 237.83, 232.59, 259.58, 258.17, 271.34, 270.09, 312.5, 267.62, 292.22, 324.93, 364.78, 358.72, 380.62, 356.39, 330.6, 313.9, 328.26, 325.96, 311.87, 383.66, 353.5, 355.77, 370, 406.88, 447.6, 438.93, 466.38, 466.52, 463.15, 513.98, 576.95, 603.91, 615.42, 630.7, 720, 681.01, 664.76, 670.66, 663.14, 613.93, 690.39, 732.24] },
      velocityScore: { '1D': -3.7, '1W': 6.4, '1M': -56.9, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 64.5, revenueGrowth: 50, eps: 11.35, grossMargin: 21, dividendYield: 0.27,
      etfPresence: { AIRR: 4.49, PRN: 4.65, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Argan Inc is an engineering and construction company for power generation facilities — natural gas and renewable power plants. It appears in Industrials ETFs because power plant construction is one of the fastest-growing categories in U.S. infrastructure spending, driven by data center load additions that the grid cannot currently support.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.52, proScore: 1.81, coverage: 0.4,
      price: 1954.47, weeklyPrices: [1931.77, 1967.41, 2066.51, 1908.07, 1954.47], weeklyChange: 1.18, dayChange: 2.43, sortRank: 0, periodReturns: { '1M': 6.9, 'YTD': 109.4, '6M': 104, '1Y': 285 },
      priceHistory: { '1D': [1908.07, 1902.32, 1961.16, 1972.38, 1984.59, 1993.04, 1987.25, 1983.38, 1975.64, 1982.97, 1979.82, 1972.52, 1970.36, 1961.33, 1943.24, 1952.53, 1945.77, 1948.35, 1950.94, 1939.05, 1934.73, 1934.82, 1938.32, 1954.47], '1W': [1931.77, 1967.41, 2066.51, 1908.07, 1954.47], '1M': [1883.56, 1867.09, 1855.15, 1828.21, 1787.88, 1883.26, 1850.04, 1914.65, 1843.94, 1852.03, 1831.56, 1719.48, 1843.42, 1877.61, 1952.02, 1913.94, 1931.77, 1967.41, 2066.51, 1908.07, 1954.47], 'YTD': [933.29, 971.49, 1091.04, 1131.7, 1171.46, 1147.97, 1300.02, 1373.52, 1438.23, 1348.22, 1373.76, 1423, 1470.64, 1428.52, 1574.45, 1648.96, 1724.49, 1724.14, 2011.49, 2016.31, 1825.5, 1867.09, 1850.04, 1831.56, 1913.94, 1954.47], '6M': [958.07, 1003.64, 1010.41, 1119.98, 1127.55, 1176.26, 1283.65, 1337.95, 1413.57, 1438.24, 1372.4, 1414.1, 1408.25, 1273.18, 1424.91, 1650.48, 1674.16, 1719.21, 1967.24, 2032.98, 1854.43, 1883.56, 1883.26, 1831.56, 1913.94, 1954.47], '1Y': [507.6, 529.9, 533.77, 550.5, 562.83, 703.3, 690.45, 702.1, 681.08, 709.83, 723.95, 764.91, 799.38, 781.88, 832.98, 834.7, 837.11, 790.72, 1010.64, 987.78, 973.18, 930.5, 970.95, 1004.65, 1024.92, 918.54, 958.07, 1003.64, 1010.41, 1119.98, 1127.55, 1176.26, 1283.65, 1337.75, 1468.58, 1391.16, 1372.4, 1414.1, 1408.25, 1273.18, 1424.91, 1650.48, 1674.16, 1719.21, 1967.24, 2016.31, 1854.43, 1883.56, 1883.26, 1831.56, 1913.94, 1954.47] },
      velocityScore: { '1D': -4.2, '1W': -0.5, '1M': -60, '6M': null }, isNew: false,
      marketCap: '$69B', pe: 56.3, revenueGrowth: 1, eps: 34.73, grossMargin: 25, dividendYield: 0.14,
      etfPresence: { AIRR: 4.37, PRN: 4.66, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.92, proScore: 1.57, coverage: 0.4,
      price: 333.78, weeklyPrices: [329.89, 337.96, 338.07, 330.90, 333.78], weeklyChange: 1.18, dayChange: 0.87, sortRank: 0, periodReturns: { '1M': 8.7, 'YTD': 30, '6M': 26.3, '1Y': 48.6 },
      priceHistory: { '1D': [330.9, 332.79, 333.99, 335.06, 336.57, 337.43, 337.45, 336.92, 336.53, 336.3, 336.67, 336.54, 335.74, 335.62, 334.14, 334.18, 334.68, 334.96, 335.74, 335.11, 335.82, 334.65, 334.36, 333.78], '1W': [329.89, 337.96, 338.07, 330.9, 333.78], '1M': [311.33, 312.65, 308.53, 303.81, 300.98, 308.31, 313.39, 313.67, 315.29, 314.42, 322.81, 314.08, 318.89, 320.11, 316.18, 324.38, 329.89, 337.96, 338.07, 330.9, 333.78], 'YTD': [256.77, 264.62, 282.47, 282.33, 259.51, 287.03, 279.03, 281.13, 283.5, 274.97, 259.88, 258.51, 266, 269.36, 286.41, 284.56, 289.82, 296.57, 315.39, 313.7, 302.64, 312.65, 313.39, 322.81, 324.38, 333.78], '6M': [264.33, 259.63, 272.25, 281.21, 281.54, 270.02, 282.45, 279.84, 278.74, 283.54, 267.57, 256.83, 262.23, 258.01, 272.54, 292.01, 293.59, 301.24, 305.48, 310.55, 305.22, 311.33, 308.31, 322.81, 324.38, 333.78], '1Y': [224.6, 245.19, 255.95, 261.93, 268.07, 271.5, 264.97, 275.72, 262.46, 268.4, 267.96, 269.68, 262.77, 259.1, 259.16, 251.03, 247.97, 253.5, 254.1, 257.9, 256.26, 243.79, 257.32, 258.83, 262.84, 259.48, 264.33, 259.63, 272.25, 281.21, 281.54, 270.02, 282.45, 278.31, 282.27, 277.7, 267.57, 256.83, 262.23, 258.01, 272.54, 292.01, 293.59, 301.24, 305.48, 313.7, 305.22, 311.33, 308.31, 322.81, 324.38, 333.78] },
      velocityScore: { '1D': 0, '1W': 13.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 31.5, revenueGrowth: 7, eps: 10.59, grossMargin: 30, dividendYield: 0.62,
      etfPresence: { AIRR: 1.81, PRN: false, RSHO: 6.04, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 2.81, proScore: 1.13, coverage: 0.4,
      price: 237.22, weeklyPrices: [235.29, 242.97, 246.41, 236.07, 237.22], weeklyChange: 0.82, dayChange: 0.49, sortRank: 0, periodReturns: { '1M': 14.2, 'YTD': 18.6, '6M': 13.8, '1Y': 46.9 },
      priceHistory: { '1D': [236.07, 237.02, 237.93, 237.95, 240.23, 241.29, 243.38, 243.44, 242.84, 242.73, 241.81, 241.2, 240.8, 240.54, 239.61, 240.16, 240.28, 240.76, 241.7, 240.21, 238.32, 236.57, 236.96, 237.22], '1W': [235.29, 242.97, 246.41, 236.07, 237.22], '1M': [219.08, 215.34, 213.82, 216.66, 220.92, 230.08, 234.08, 236.14, 227.8, 229.95, 228.01, 223.63, 233.49, 230.05, 237.06, 234.8, 235.29, 242.97, 246.41, 236.07, 237.22], 'YTD': [200.06, 207.44, 213.61, 217.13, 211.84, 218.02, 230.92, 241.01, 231.59, 211.9, 202.65, 202.46, 201.27, 203.16, 215.54, 219.99, 220.62, 211.36, 212.74, 198.99, 195.79, 215.34, 234.08, 228.01, 234.8, 237.22], '6M': [208.48, 203.26, 207.51, 217.65, 215.21, 212.73, 223.86, 239, 237.18, 225.02, 209.8, 203.42, 194.52, 190.71, 195.43, 224.82, 216.49, 216.36, 207.81, 203.24, 200.47, 219.08, 230.08, 228.01, 234.8, 237.22], '1Y': [161.46, 172.55, 173.08, 180.12, 175.41, 182.39, 203.53, 191.88, 186.26, 192.47, 186.63, 190.25, 190.48, 182.95, 187.73, 185.97, 185.21, 187.4, 200, 223.06, 219.09, 205.32, 215.87, 208.24, 224.76, 210.34, 208.48, 203.26, 207.51, 217.65, 215.21, 212.73, 223.86, 241.6, 243.04, 219.58, 209.8, 203.42, 194.52, 190.71, 195.43, 224.82, 216.49, 216.36, 207.81, 198.99, 200.47, 219.08, 230.08, 228.01, 234.8, 237.22] },
      velocityScore: { '1D': 0, '1W': 1.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 45.3, revenueGrowth: 17, eps: 5.24, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.67, PRN: false, RSHO: 3.96, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 2, avgWeight: 2.8, proScore: 1.12, coverage: 0.4,
      price: 276.06, weeklyPrices: [283.23, 277.66, 280.36, 275.13, 276.06], weeklyChange: -2.53, dayChange: 0.34, sortRank: 0, periodReturns: { '1M': 7.6, 'YTD': 34.7, '6M': 30.1, '1Y': 56.8 },
      priceHistory: { '1D': [275.13, 274.71, 275.84, 276.1, 276.33, 277.77, 276.79, 277.8, 277.33, 277.33, 277.28, 278.35, 278.89, 276.93, 275.79, 275.85, 275.84, 276.75, 277.48, 277.52, 276.99, 276.92, 276.93, 276.06], '1W': [283.23, 277.66, 280.36, 275.13, 276.06], '1M': [261.89, 258.02, 259.89, 258.25, 255.52, 250.72, 248.63, 249.33, 251.9, 246.55, 257.16, 249.49, 264.6, 264.67, 270.44, 277.42, 283.23, 277.66, 280.36, 275.13, 276.06], 'YTD': [205.02, 210.02, 224.26, 217.7, 208.93, 209.63, 244.79, 251.3, 260.31, 252.39, 243.82, 241.93, 241.62, 239.04, 254.06, 254.04, 240.88, 236.52, 256.43, 269.76, 253.12, 258.02, 248.63, 257.16, 277.42, 276.06], '6M': [212.17, 211.71, 218.27, 224.89, 215.39, 207.21, 225.15, 250.21, 257.04, 265.11, 254.14, 240.73, 236.04, 222.99, 236.02, 258.03, 247.72, 240.43, 242.69, 273.58, 256.99, 261.89, 250.72, 257.16, 277.42, 276.06], '1Y': [176.08, 175.95, 178.53, 188.83, 186.8, 179.77, 182.06, 176.8, 171.94, 175.65, 179.53, 184.21, 191.84, 189.85, 191.08, 188.83, 192.27, 191.23, 203.48, 206.31, 205.07, 202.06, 204.63, 196.27, 195.89, 198, 212.17, 211.71, 218.27, 224.89, 215.39, 207.21, 225.15, 252.55, 260.95, 258.84, 254.14, 240.73, 236.04, 222.99, 236.02, 258.03, 247.72, 240.43, 242.69, 269.76, 256.99, 261.89, 250.72, 257.16, 277.42, 276.06] },
      velocityScore: { '1D': 0.9, '1W': -0.9, '1M': -51.7, '6M': null }, isNew: false,
      marketCap: '$110B', pe: 63.9, revenueGrowth: 19, eps: 4.32, grossMargin: 35, dividendYield: 0.17,
      etfPresence: { AIRR: false, PRN: 3.33, RSHO: false, IDEF: 2.27, BILT: false },
      tonyNote: 'Howmet Aerospace is an aerospace structures and engine components manufacturer. It appears in Industrials ETFs for its aerospace and defense exposure — commercial air travel recovery and defense spending growth are the two demand drivers. Revenue grew and margins are expanding as Howmet prices power over OEM customers.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 2, avgWeight: 2.57, proScore: 1.03, coverage: 0.4,
      price: 205.65, weeklyPrices: [203.07, 205.40, 210.00, 209.89, 205.65], weeklyChange: 1.27, dayChange: -2.02, sortRank: 0, periodReturns: { '1M': 1.4, 'YTD': 19, '6M': 16.1, '1Y': 46 },
      priceHistory: { '1D': [209.89, 208.01, 208.68, 208.94, 209.35, 210, 210.23, 210.41, 209.35, 210.33, 210.21, 209.78, 209.33, 208.8, 207.24, 207.48, 207.55, 208.31, 208.38, 207.32, 206.6, 206.34, 206.12, 205.65], '1W': [203.07, 205.4, 210, 209.89, 205.65], '1M': [204.38, 198.95, 199.27, 195.88, 188.39, 187.26, 184.72, 190.76, 185.95, 187.46, 188.96, 183, 194.68, 193.45, 193.94, 196.93, 203.07, 205.4, 210, 209.89, 205.65], 'YTD': [172.84, 193.2, 213.25, 206.33, 210.18, 187.42, 196.9, 209.07, 207.24, 195.5, 197.82, 208.98, 222.13, 212.81, 230.29, 238.42, 219.1, 208.08, 215.2, 206.83, 197.33, 198.95, 184.72, 188.96, 196.93, 205.65], '6M': [177.18, 181.85, 201.46, 217.89, 206.04, 206.04, 203, 200.4, 198.38, 216.47, 200.39, 204.67, 204.85, 191.59, 214.44, 238.27, 216.66, 216.18, 206.15, 210.8, 201.94, 204.38, 187.26, 188.96, 196.93, 205.65], '1Y': [140.86, 140.77, 136.45, 142.34, 143.84, 151.93, 179.74, 176.76, 163.56, 165.6, 163.79, 170.1, 174.03, 176.21, 185.7, 195.6, 203.82, 191.17, 213.69, 198.12, 196.77, 179.81, 178.18, 178.33, 183.38, 170.75, 177.18, 181.85, 201.46, 217.89, 206.04, 206.04, 203, 201.09, 204.23, 205.83, 200.39, 204.67, 204.85, 191.59, 214.44, 238.27, 216.66, 216.18, 206.15, 206.83, 201.94, 204.38, 187.26, 188.96, 196.93, 205.65] },
      velocityScore: { '1D': 2, '1W': 8.4, '1M': -55.8, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 54.7, revenueGrowth: 26, eps: 3.76, grossMargin: 23, dividendYield: 0.5,
      etfPresence: { AIRR: 3.29, PRN: false, RSHO: false, IDEF: 1.85, BILT: false },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 2, avgWeight: 1.79, proScore: 0.72, coverage: 0.4,
      price: 279.62, weeklyPrices: [296.89, 285.43, 278.19, 283.48, 279.62], weeklyChange: -5.82, dayChange: -1.36, sortRank: 0, periodReturns: { '1M': -12.8, 'YTD': -17.8, '6M': -21.3, '1Y': 18.9 },
      priceHistory: { '1D': [283.48, 284.56, 282.73, 280.48, 278.65, 279.05, 280.08, 281.23, 281.26, 280.97, 280.45, 281.15, 280.88, 280.46, 280.87, 281.49, 281.55, 282.9, 283.65, 283.19, 282.99, 281.82, 280.46, 279.62], '1W': [296.89, 285.43, 278.19, 283.48, 279.62], '1M': [320.95, 317.56, 320.9, 308.17, 296.41, 293.66, 287.54, 294.53, 293.04, 292.26, 297.52, 289.13, 300.95, 297.68, 299.66, 298.51, 296.89, 285.43, 278.19, 283.48, 279.62], 'YTD': [340.07, 378.47, 418.86, 424.14, 427.83, 369.38, 406.76, 443.14, 443, 421.17, 414.56, 427.99, 402.56, 393.32, 403.37, 398.13, 366.88, 362.17, 319.54, 333.56, 324.6, 317.56, 287.54, 297.52, 298.51, 279.62], '6M': [355.45, 349.75, 386.99, 425.9, 413.56, 420.3, 405.82, 418.78, 438.01, 453.73, 429.58, 416.59, 396.57, 369.08, 402.28, 398.07, 378.21, 361.4, 326.13, 317.75, 329.35, 320.95, 293.66, 297.52, 298.51, 279.62], '1Y': [235.12, 250.15, 258.11, 255.35, 263.33, 278.86, 267.49, 269.43, 267.09, 276.39, 269.98, 276.07, 274.69, 271.25, 282.22, 286.14, 284.96, 283.64, 298.42, 306.68, 317.89, 309.74, 314.31, 315.88, 326.72, 322.63, 355.45, 349.75, 386.99, 425.9, 413.56, 420.3, 405.82, 417.83, 447.73, 440.33, 429.58, 416.59, 396.57, 369.08, 402.28, 398.07, 378.21, 361.4, 326.13, 333.56, 329.35, 320.95, 293.66, 297.52, 298.51, 279.62] },
      velocityScore: { '1D': 4.3, '1W': -4, '1M': -65.9, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 18.2, revenueGrowth: 13, eps: 15.39, grossMargin: 12, dividendYield: 1.95,
      etfPresence: { AIRR: 2.54, PRN: false, RSHO: false, IDEF: 1.04, BILT: false },
      tonyNote: 'Huntington Ingalls Industries is the only builder of nuclear-powered aircraft carriers for the U.S. Navy. Revenue is government-contracted and predictable; the ETF allocation in Industrials reflects defense spending growth and the Navy\'s backlog of nuclear submarine and carrier construction. A steady-state quality compounder in a market structure with no competition.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 2, avgWeight: 1.77, proScore: 0.71, coverage: 0.4,
      price: 47.95, weeklyPrices: [56.16, 54.21, 51.09, 50.80, 47.95], weeklyChange: -14.62, dayChange: -5.61, sortRank: 0, periodReturns: { '1M': -14.6, 'YTD': -36.8, '6M': -40, '1Y': 13.3 },
      priceHistory: { '1D': [50.8, 49.82, 49.62, 49.03, 49.05, 49.47, 49.81, 50.26, 49.88, 49.72, 49.35, 49.37, 49.49, 49.26, 48.91, 48.79, 48.88, 49.14, 49.19, 48.74, 48.24, 48.49, 48.19, 47.95], '1W': [56.16, 54.21, 51.09, 50.8, 47.95], '1M': [56.8, 57.3, 65.19, 64.13, 63.49, 63.27, 58.43, 63.4, 58.52, 57.73, 56.19, 54.82, 58.78, 57.75, 57.02, 56.34, 56.16, 54.21, 51.09, 50.8, 47.95], 'YTD': [75.91, 104.04, 124.56, 113.85, 108.16, 85.25, 87.05, 105.67, 92.14, 85.54, 89.46, 93.04, 79.98, 67.7, 68.33, 74.66, 68.61, 59.56, 61.52, 57.33, 53.47, 57.3, 58.43, 56.19, 56.34, 47.95], '6M': [79.97, 79.29, 113.7, 130.72, 111.32, 96.16, 98.81, 89.06, 94.31, 90.72, 92.47, 89.53, 83.69, 65.28, 71.96, 73.66, 68.55, 61.66, 59.31, 56.99, 54.22, 56.8, 63.27, 56.19, 56.34, 47.95], '1Y': [42.33, 43.28, 46.27, 58.91, 58.66, 58.7, 58.93, 68.75, 64.27, 67.92, 63.59, 67.67, 80.65, 84.2, 95.03, 98.55, 90.58, 84.3, 91.21, 77.41, 76.7, 70.67, 75.77, 77.68, 78.78, 71.4, 79.97, 79.29, 113.7, 130.72, 111.32, 96.16, 98.81, 91.97, 90.68, 88.95, 92.47, 89.53, 83.69, 65.28, 71.96, 73.66, 68.55, 61.66, 59.31, 57.33, 54.22, 56.8, 63.27, 56.19, 56.34, 47.95] },
      velocityScore: { '1D': 1.4, '1W': -7.8, '1M': -65.5, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 282.1, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.54, PRN: false, RSHO: false, IDEF: 1, BILT: false },
      tonyNote: 'Kratos Defense is a defense technology company focused on unmanned systems, satellite communications, and high-performance computing for government customers. It appears in Industrials ETFs as an AI-adjacent defense name — autonomous systems and AI-driven surveillance are direct end markets. Revenue grew and the government contract backlog is expanding.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 1.42, proScore: 0.57, coverage: 0.4,
      price: 75.87, weeklyPrices: [71.25, 73.12, 74.95, 75.79, 75.87], weeklyChange: 6.48, dayChange: 0.11, sortRank: 0, periodReturns: { '1M': -3.3, 'YTD': 26.2, '6M': 27.6, '1Y': 25 },
      priceHistory: { '1D': [75.79, 74.87, 75.4, 74.98, 75.38, 75.56, 75.37, 75.38, 75.67, 75.25, 75.16, 75.29, 75.47, 75.49, 75.26, 75.11, 75.29, 75.42, 75.57, 75.79, 75.86, 75.59, 75.83, 75.87], '1W': [71.25, 73.12, 74.95, 75.79, 75.87], '1M': [76.34, 74.37, 73.13, 71.39, 70.04, 71.31, 71.66, 72.43, 71.96, 71.59, 71.59, 72.26, 71.62, 72.08, 71.49, 71.48, 71.25, 73.12, 74.95, 75.79, 75.87], 'YTD': [60.11, 61.15, 60.29, 63.72, 67.24, 67.42, 71.13, 72.17, 74.77, 74.77, 73.52, 72.8, 73.81, 71.83, 72.82, 70.76, 71.1, 73.32, 73.76, 74.73, 79.4, 74.37, 71.66, 71.59, 71.48, 75.87], '6M': [59.46, 60.85, 60.32, 61.55, 64.29, 66.34, 67.85, 72.28, 72.98, 76.26, 73.18, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 76.12, 74.18, 77.69, 76.34, 71.31, 71.59, 71.48, 75.87], '1Y': [60.69, 59.14, 57.78, 58.09, 58.75, 59.95, 58.64, 57.86, 57.22, 57.49, 57.58, 59.33, 60.38, 63.31, 64.06, 63.1, 63.78, 62.16, 56.98, 57.54, 60.43, 58.89, 60.22, 63.66, 60.92, 58.66, 59.46, 60.85, 60.32, 61.55, 64.29, 66.34, 67.85, 71.96, 73.5, 75.88, 73.18, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 76.12, 74.73, 77.69, 76.34, 71.31, 71.59, 71.48, 75.87] },
      velocityScore: { '1D': 1.8, '1W': 3.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$93B', pe: 33.3, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.77,
      etfPresence: { AIRR: false, PRN: false, RSHO: 0.92, IDEF: false, BILT: 1.91 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RBC', name: 'RBC Bearings Incorporated', easyScore: 2, avgWeight: 1.2, proScore: 0.48, coverage: 0.4,
      price: 638.94, weeklyPrices: [625.73, 639.18, 645.73, 633.44, 638.94], weeklyChange: 2.11, dayChange: 0.87, sortRank: 0, periodReturns: { '1M': 14.1, 'YTD': 42.5, '6M': 39.4, '1Y': 67.9 },
      priceHistory: { '1D': [633.44, 632.14, 635.78, 640.21, 639.09, 641.97, 642.38, 644.57, 643.67, 645.22, 644.48, 645.02, 643.62, 643.11, 641.13, 640.58, 640.45, 640.82, 641.16, 639.92, 640.22, 637.41, 637.28, 638.94], '1W': [625.73, 639.18, 645.73, 633.44, 638.94], '1M': [584.4, 577.42, 577.83, 571.96, 566.14, 578.34, 584.18, 589.76, 590.09, 590.97, 592.41, 576.74, 607.46, 603.64, 616.95, 621.08, 625.73, 639.18, 645.73, 633.44, 638.94], 'YTD': [448.43, 485, 497.06, 504.99, 511.98, 520.16, 550.4, 551.42, 576.5, 566.06, 547.31, 547.81, 561.66, 551.99, 595.11, 586.98, 588.74, 584.49, 623.19, 613.1, 565.22, 577.42, 584.18, 592.41, 621.08, 638.94], '6M': [458.38, 458.79, 487.16, 498.82, 504.5, 507.13, 548.2, 552.44, 562.54, 584.89, 565.64, 546.91, 537.2, 524.38, 553.31, 598.23, 591.32, 594.39, 607.5, 613.59, 551.12, 584.4, 578.34, 592.41, 621.08, 638.94], '1Y': [380.57, 383.13, 378.91, 397.03, 385.02, 387.34, 404.38, 410.61, 392.76, 399.53, 391.1, 385.08, 384.72, 379.44, 374.99, 384.43, 372.71, 393.88, 408.94, 431.36, 445.34, 430.24, 443.29, 443.22, 458.15, 449.77, 458.38, 458.79, 487.16, 498.82, 504.5, 507.13, 548.2, 552.93, 571.57, 568.58, 565.64, 546.91, 537.2, 524.38, 553.31, 598.23, 591.32, 594.39, 607.5, 613.1, 551.12, 584.4, 578.34, 592.41, 621.08, 638.94] },
      velocityScore: { '1D': 0, '1W': 4.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$20B', pe: 70.1, revenueGrowth: 18, eps: 9.12, grossMargin: 45, dividendYield: null,
      etfPresence: { AIRR: 1.87, PRN: false, RSHO: false, IDEF: 0.52, BILT: false },
      tonyNote: 'RBC Bearings Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRCY', name: 'Mercury Systems, Inc.', easyScore: 2, avgWeight: 1.09, proScore: 0.44, coverage: 0.4,
      price: 105, weeklyPrices: [115.50, 113.91, 111.76, 110.87, 105.00], weeklyChange: -9.09, dayChange: -5.29, sortRank: 0, periodReturns: { '1M': 6.5, 'YTD': 43.8, '6M': 40.6, '1Y': 109.5 },
      priceHistory: { '1D': [110.87, 109.82, 109.84, 108.53, 109.94, 109.52, 109.7, 110.02, 110.28, 110.15, 109.55, 108.9, 108.99, 108.48, 107.66, 108.16, 107.8, 108.2, 107.28, 106.1, 105.25, 105.55, 104.66, 105], '1W': [115.5, 113.91, 111.76, 110.87, 105], '1M': [99.32, 97.11, 108.11, 111.7, 111.28, 112.87, 111.59, 117.82, 111.27, 110.94, 108.82, 106.81, 119.32, 120.3, 115.93, 112.44, 115.5, 113.91, 111.76, 110.87, 105], 'YTD': [73.01, 88.74, 102.95, 99.48, 98.29, 79.07, 80.25, 89.86, 89.58, 84.96, 81.44, 78.97, 78.71, 74.75, 79.23, 85.51, 82.61, 74.75, 91.66, 92.32, 92.8, 97.11, 111.59, 108.82, 112.44, 105], '6M': [74.7, 76.03, 93.48, 103.02, 98.89, 93.89, 85.37, 82.36, 85.9, 91.01, 89.36, 80.71, 78.29, 69.86, 77.53, 84.09, 83.36, 76.53, 82.96, 91.95, 93.39, 99.32, 112.87, 108.82, 112.44, 105], '1Y': [50.13, 50.5, 50.62, 52.2, 52.46, 52.59, 53.93, 68.39, 64.54, 68.13, 67.89, 73.08, 77.1, 73.13, 82.56, 80.96, 78.15, 75.54, 77.44, 78.19, 73.1, 67.55, 69.62, 71.35, 76.61, 68.88, 74.7, 76.03, 93.48, 103.02, 98.89, 93.89, 85.37, 83.32, 88.76, 89.43, 89.36, 80.71, 78.29, 69.86, 77.53, 84.09, 83.36, 76.53, 82.96, 92.32, 93.39, 99.32, 112.87, 108.82, 112.44, 105] },
      velocityScore: { '1D': 2.3, '1W': 2.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: null, revenueGrowth: 12, eps: -0.23, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: 1.16, PRN: false, RSHO: false, IDEF: 1.03, BILT: false },
      tonyNote: 'Mercury Systems, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, avgWeight: 0.99, proScore: 0.4, coverage: 0.4,
      price: 44.84, weeklyPrices: [52.03, 50.37, 47.70, 46.38, 44.84], weeklyChange: -13.82, dayChange: -3.32, sortRank: 0, periodReturns: { '1M': -30, 'YTD': -38.7, '6M': -44.5, '1Y': -8.3 },
      priceHistory: { '1D': [46.38, 46.15, 45.75, 45.74, 45.31, 44.93, 45.17, 45.45, 45.35, 45.35, 45.46, 45.17, 45.16, 44.88, 44.79, 44.6, 44.73, 44.92, 44.87, 44.56, 44.21, 44.33, 44.62, 44.84], '1W': [52.03, 50.37, 47.7, 46.38, 44.84], '1M': [60.66, 63.52, 65.86, 57.5, 53.65, 54.65, 51.84, 54.39, 49.44, 49.64, 48.37, 45.87, 49.58, 47.83, 48.27, 51.7, 52.03, 50.37, 47.7, 46.38, 44.84], 'YTD': [73.17, 101.28, 109.49, 111.61, 110.93, 89.78, 78.71, 88.46, 88.31, 97.14, 98.98, 101.43, 99.6, 82.69, 84.22, 92.73, 82.11, 65.98, 63.19, 62.48, 64.2, 63.52, 51.84, 48.37, 51.7, 44.84], '6M': [80.81, 76.85, 106.22, 108.5, 108.71, 102.87, 97.47, 75.79, 81.27, 93.04, 106.09, 104.08, 102.39, 74.82, 82, 90.18, 82.06, 70.3, 62.89, 58.82, 66.21, 60.66, 54.65, 48.37, 51.7, 44.84], '1Y': [48.89, 45.24, 47.44, 56.3, 49.41, 51.7, 48.6, 51.83, 50.76, 54.65, 53.38, 63.8, 65.45, 67.4, 73.41, 74.51, 75.96, 77.21, 85.79, 79.73, 67.74, 60.93, 67.43, 66.48, 69.37, 68.11, 80.81, 76.85, 106.22, 108.5, 108.71, 102.87, 97.47, 75.11, 83.6, 91.11, 106.09, 104.08, 102.39, 74.82, 82, 90.18, 82.06, 70.3, 62.89, 62.48, 66.21, 60.66, 54.65, 48.37, 51.7, 44.84] },
      velocityScore: { '1D': 0, '1W': -9.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: 195, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.8, PRN: false, RSHO: false, IDEF: 0.19, BILT: false },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DRS', name: 'Leonardo DRS, Inc.', easyScore: 2, avgWeight: 0.58, proScore: 0.23, coverage: 0.4,
      price: 44.69, weeklyPrices: [46.58, 46.08, 44.99, 45.74, 44.69], weeklyChange: -4.06, dayChange: -2.3, sortRank: 0, periodReturns: { '1M': -0.5, 'YTD': 31.1, '6M': 29.5, '1Y': 2.8 },
      priceHistory: { '1D': [45.74, 45.3, 45.68, 45.63, 45.44, 45.54, 45.69, 45.7, 45.65, 45.52, 45.46, 45.52, 45.65, 45.5, 45.28, 45.13, 45.26, 45.46, 45.31, 45.22, 44.96, 44.88, 44.69, 44.69], '1W': [46.58, 46.08, 44.99, 45.74, 44.69], '1M': [45.8, 45.35, 48.41, 48.76, 47.96, 47.39, 45.61, 46.71, 46.15, 46.55, 47.35, 46.11, 49.69, 48.53, 46.68, 45.59, 46.58, 46.08, 44.99, 45.74, 44.69], 'YTD': [34.09, 38.84, 42.26, 41.28, 41.3, 37.27, 37.77, 41.07, 43.34, 45.82, 45.91, 46.44, 46.32, 45.86, 47.1, 46.29, 42.07, 39.47, 41.79, 42.87, 42.81, 45.35, 45.61, 47.35, 45.59, 44.69], '6M': [34.52, 34.78, 40.99, 42.57, 40.63, 40.45, 40.22, 38.13, 38.14, 45.49, 47.41, 45.3, 44.4, 43.25, 46.19, 47.54, 43.2, 40.18, 39.7, 41.49, 42.84, 45.8, 47.39, 47.35, 45.59, 44.69], '1Y': [43.47, 45.31, 46.24, 48.33, 47.45, 41.6, 41.31, 41.9, 41.06, 42.03, 40.91, 41.61, 42.58, 42.35, 44.63, 44.21, 40.19, 39.94, 38.43, 35.76, 35.46, 33.43, 33.69, 34.31, 34.78, 33.17, 34.52, 34.78, 40.99, 42.57, 40.63, 40.45, 40.22, 39.13, 43.82, 45.51, 47.41, 45.3, 44.4, 43.25, 46.19, 47.54, 43.2, 40.18, 39.7, 42.87, 42.84, 45.8, 47.39, 47.35, 45.59, 44.69] },
      velocityScore: { '1D': 4.5, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 41.8, revenueGrowth: 6, eps: 1.07, grossMargin: 24, dividendYield: 0.79,
      etfPresence: { AIRR: 0.85, PRN: false, RSHO: false, IDEF: 0.31, BILT: false },
      tonyNote: 'Leonardo DRS, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TPC', name: 'Tutor Perini Corporation', easyScore: 2, avgWeight: 0.38, proScore: 0.15, coverage: 0.4,
      price: 82.36, weeklyPrices: [77.89, 77.99, 81.50, 81.00, 82.36], weeklyChange: 5.74, dayChange: 1.68, sortRank: 0, periodReturns: { '1M': 13.2, 'YTD': 22.9, '6M': 19.5, '1Y': 86.8 },
      priceHistory: { '1D': [81, 81.75, 82.77, 83.45, 83.43, 84.78, 85.51, 85.46, 85.17, 85.53, 84.31, 84.33, 84.32, 83.97, 83.52, 83.47, 83.08, 83.29, 83.47, 83.18, 82.89, 82.35, 82.11, 82.36], '1W': [77.89, 77.99, 81.5, 81, 82.36], '1M': [74.67, 74.47, 73.27, 71.49, 74.26, 74.29, 72.26, 72.38, 70.53, 72.13, 71.48, 68.72, 73.61, 74.92, 76.55, 76.19, 77.89, 77.99, 81.5, 81, 82.36], 'YTD': [67.02, 70.17, 75.17, 76.79, 79.86, 79.95, 81.73, 84.9, 89.38, 71.12, 69.2, 71.21, 78.37, 78.71, 81.5, 86.25, 84.19, 86.04, 96.98, 82.69, 74.91, 74.47, 72.26, 71.48, 76.19, 82.36], '6M': [68.93, 69.35, 70.53, 75.09, 77.34, 80.11, 84.07, 82.74, 84.99, 73.57, 72.04, 71.31, 72.44, 72.83, 77.31, 86.16, 85.11, 86.87, 97.31, 82.79, 75.43, 74.67, 74.29, 71.48, 76.19, 82.36], '1Y': [44.08, 47.46, 48.06, 50.89, 48.29, 48.15, 47.28, 57.75, 55.99, 58.79, 61, 62.89, 66.22, 64.33, 62.04, 61.75, 63.3, 64.22, 69.34, 67.92, 62.28, 60.11, 67.56, 68.64, 70.46, 67.56, 68.93, 69.35, 70.53, 75.09, 77.34, 80.11, 84.07, 82.24, 85.87, 69.95, 72.04, 71.31, 72.44, 72.83, 77.31, 86.16, 85.11, 86.87, 97.31, 82.69, 75.43, 74.67, 74.29, 71.48, 76.19, 82.36] },
      velocityScore: { '1D': 0, '1W': 7.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 56.4, revenueGrowth: 12, eps: 1.46, grossMargin: 12, dividendYield: 0.3,
      etfPresence: { AIRR: 0.71, PRN: false, RSHO: false, IDEF: 0.04, BILT: false },
      tonyNote: 'Tutor Perini Corporation appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TKR', name: 'TIMKEN CO/THE', easyScore: 1, avgWeight: 8.69, proScore: 1.74, coverage: 0.2,
      price: 137.99, weeklyPrices: [139.40, 142.36, 141.97, 137.64, 137.99], weeklyChange: -1.01, dayChange: 0.25, sortRank: 0, periodReturns: { '1M': 15, 'YTD': 64, '6M': 60.4, '1Y': 88.9 },
      priceHistory: { '1D': [137.64, 137.93, 138.99, 139.32, 139.07, 140.14, 139.47, 139.73, 139.25, 139.12, 139.37, 138.9, 138.48, 138.52, 137.66, 137.87, 137.98, 138.27, 138.08, 137.99, 138.05, 137.76, 138.12, 137.99], '1W': [139.4, 142.36, 141.97, 137.64, 137.99], '1M': [127.42, 127.16, 126.78, 127.98, 126.54, 131.9, 131.82, 133.66, 131.83, 134.67, 137.09, 132.39, 137.4, 137.06, 139.12, 140.28, 139.4, 142.36, 141.97, 137.64, 137.99], 'YTD': [84.13, 90.6, 93.73, 94.6, 94.15, 102.15, 107.35, 107.11, 109.88, 103.05, 99.7, 98.23, 101.9, 102.06, 106.92, 103.73, 106.79, 106.53, 119.7, 117.12, 109.36, 127.16, 131.82, 137.09, 140.28, 137.99], '6M': [86.02, 86.29, 91.17, 93.55, 94.02, 94.99, 108.93, 107.84, 107.83, 109.99, 100.58, 98.74, 98.99, 95.94, 99.17, 106.81, 108.75, 106.88, 109.63, 117.39, 112.73, 127.42, 131.9, 137.09, 140.28, 137.99], '1Y': [73.05, 76.72, 78.57, 79.13, 80.76, 76.09, 73.57, 80.39, 75.86, 79.01, 77.42, 79.16, 79.09, 74.2, 75.99, 74.32, 74.7, 75.85, 79.25, 78.46, 78.66, 74.82, 81.36, 82.76, 88.71, 84.92, 86.02, 86.29, 91.17, 93.55, 94.02, 94.99, 108.93, 105.54, 109.52, 106.58, 100.58, 98.74, 98.99, 95.94, 99.17, 106.81, 108.75, 106.88, 109.63, 117.12, 112.73, 127.42, 131.9, 137.09, 140.28, 137.99] },
      velocityScore: { '1D': 0, '1W': -5.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 31.4, revenueGrowth: 8, eps: 4.4, grossMargin: 31, dividendYield: 1.05,
      etfPresence: { AIRR: false, PRN: false, RSHO: 8.69, IDEF: false, BILT: false },
      tonyNote: 'TIMKEN CO/THE appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RTX', name: 'RTX CORP', easyScore: 1, avgWeight: 8.29, proScore: 1.66, coverage: 0.2,
      price: 185.06, weeklyPrices: [192.58, 185.60, 181.83, 186.39, 185.06], weeklyChange: -3.9, dayChange: -0.71, sortRank: 0, periodReturns: { '1M': 4.5, 'YTD': 0.9, '6M': -0.7, '1Y': 30.9 },
      priceHistory: { '1D': [186.39, 186.69, 186.87, 185.51, 185.16, 185.53, 185.77, 186.5, 185.93, 185.63, 185.51, 185.89, 185.95, 185.82, 184.88, 184.99, 185.64, 185.93, 186.74, 186.64, 186.54, 186.1, 185.53, 185.06], '1W': [192.58, 185.6, 181.83, 186.39, 185.06], '1M': [178.97, 176.59, 178.96, 179.66, 174.41, 174.26, 172.55, 179.41, 180.99, 178.66, 181.56, 177.41, 184.21, 183.53, 183.64, 186.77, 192.58, 185.6, 181.83, 186.39, 185.06], 'YTD': [183.4, 187.17, 199.83, 196.34, 199.88, 195.97, 201.14, 205.41, 197.63, 203.86, 203.04, 204.56, 195, 194.72, 203.19, 198.39, 180.91, 172.79, 176.74, 178.89, 174.49, 176.59, 172.55, 181.56, 186.77, 185.06], '6M': [186.38, 187.25, 188.5, 201.92, 194.13, 201.09, 196.19, 200.06, 201.92, 212.16, 208.23, 206.06, 194.82, 187.15, 197.92, 202.81, 187.17, 175.68, 172.87, 178.61, 175.95, 178.97, 174.26, 181.56, 186.77, 185.06], '1Y': [141.38, 144.52, 146.4, 151.5, 155.22, 157.57, 155.75, 155.71, 156.59, 159.84, 158.68, 157.65, 158.19, 160.51, 166.63, 162.18, 157, 177.98, 176.36, 174, 177.69, 173.77, 173.19, 171.31, 177.42, 178.29, 186.38, 187.25, 188.5, 201.92, 194.13, 201.09, 196.19, 203.5, 198.46, 206.52, 208.23, 206.06, 194.82, 187.15, 197.92, 202.81, 187.17, 175.68, 172.87, 178.89, 175.95, 178.97, 174.26, 181.56, 186.77, 185.06] },
      velocityScore: { '1D': 3.1, '1W': 3.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$249B', pe: 34.7, revenueGrowth: 9, eps: 5.33, grossMargin: 20, dividendYield: 1.49,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 8.29, BILT: false },
      tonyNote: 'RTX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CGNX', name: 'COGNEX CORP', easyScore: 1, avgWeight: 7.15, proScore: 1.43, coverage: 0.2,
      price: 63.64, weeklyPrices: [64.77, 66.10, 67.60, 63.96, 63.64], weeklyChange: -1.74, dayChange: -0.5, sortRank: 0, periodReturns: { '1M': -3.7, 'YTD': 76.9, '6M': 73.9, '1Y': 106.8 },
      priceHistory: { '1D': [63.96, 63.82, 64.3, 64.41, 64.42, 64.52, 64.37, 64.3, 64.09, 64.06, 64.22, 64.01, 63.79, 63.56, 63.24, 63.25, 63.03, 63.2, 63.25, 63.03, 62.9, 63.07, 63.31, 63.64], '1W': [64.77, 66.1, 67.6, 63.96, 63.64], '1M': [68.33, 66.7, 66.01, 65.85, 64.64, 66.08, 66.06, 64.67, 60.82, 62.39, 61.32, 58.69, 62.11, 63.61, 65.9, 65.41, 64.77, 66.1, 67.6, 63.96, 63.64], 'YTD': [35.98, 37.74, 40.59, 41.71, 39.09, 39.49, 58.67, 55.94, 55.36, 51.25, 48.77, 49.87, 51.61, 49.34, 53.91, 54.64, 54.03, 53.52, 62.26, 65.68, 60.65, 66.7, 66.06, 61.32, 65.41, 63.64], '6M': [36.6, 36.93, 39.01, 40.92, 39.37, 39.76, 43.72, 58.79, 56.47, 53.83, 50.82, 49.56, 50.8, 45.94, 51.69, 55.58, 53.72, 53.74, 58.83, 67.26, 61.91, 68.33, 66.08, 61.32, 65.41, 63.64], '1Y': [30.78, 32.78, 34.74, 33.81, 34.17, 40.77, 40.89, 44.18, 42.71, 44.25, 44.27, 44.95, 46.19, 44.87, 45.64, 46.57, 45.79, 46.29, 47.44, 40.5, 38.18, 36.1, 38.21, 38.9, 36.88, 36.17, 36.6, 36.93, 39.01, 40.92, 39.37, 39.76, 43.72, 57.09, 57.88, 53.61, 50.82, 49.56, 50.8, 45.94, 51.69, 55.58, 53.72, 53.74, 58.83, 65.68, 61.91, 68.33, 66.08, 61.32, 65.41, 63.64] },
      velocityScore: { '1D': 0, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 74.9, revenueGrowth: 24, eps: 0.85, grossMargin: 68, dividendYield: 0.52,
      etfPresence: { AIRR: false, PRN: false, RSHO: 7.15, IDEF: false, BILT: false },
      tonyNote: 'COGNEX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 7.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 5.47, proScore: 5.47, coverage: 1,
      price: 259.66, weeklyPrices: [280.91, 286.69, 283.61, 275.25, 259.66], weeklyChange: -7.56, dayChange: -5.66, sortRank: 0, periodReturns: { '1M': 20.9, 'YTD': 210.2, '6M': 184.9, '1Y': 435.2 },
      priceHistory: { '1D': [275.25, 259, 260.92, 254.99, 258.22, 256.57, 257.54, 258.5, 260.2, 259.45, 258.24, 255.13, 255.58, 253.08, 251.37, 251.58, 250.47, 253.88, 254.54, 252.6, 250.77, 253.41, 256.57, 259.66], '1W': [280.91, 286.69, 283.61, 275.25, 259.66], '1M': [208.06, 208.37, 226.34, 231.09, 264.51, 260.58, 251.68, 259.67, 227.81, 218, 220.12, 211.69, 222.24, 232.36, 260.07, 265.1, 280.91, 286.69, 283.61, 275.25, 259.66], 'YTD': [83.71, 97.3, 103.89, 96.85, 94.91, 73.87, 89.73, 107.61, 104.88, 95.65, 108.04, 118.56, 115.09, 101.95, 136.33, 166.77, 156.14, 141.19, 195.09, 179.11, 197.73, 208.37, 251.68, 220.12, 265.1, 259.66], '6M': [91.13, 89.95, 97.93, 108.73, 91.46, 88.16, 92.88, 98.01, 100.61, 91.01, 94.94, 129.85, 114.15, 92.26, 117.4, 161.94, 156.55, 135.51, 175.92, 186.1, 199.86, 208.06, 260.58, 220.12, 265.1, 259.66], '1Y': [48.52, 49.97, 46.43, 53.69, 52.16, 54.43, 55.09, 70.63, 67.47, 70.1, 64.91, 89.19, 94.12, 107.94, 125.87, 132.64, 125.83, 98.62, 125.1, 117, 94.36, 95.07, 94.69, 102.8, 94.28, 78.09, 91.13, 89.95, 97.93, 108.73, 91.46, 88.16, 92.88, 97.52, 102.58, 86.8, 94.94, 129.85, 114.15, 92.26, 117.4, 161.94, 156.55, 135.51, 175.92, 179.11, 199.86, 208.06, 260.58, 220.12, 265.1, 259.66] },
      velocityScore: { '1D': 0, '1W': 18.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$66B', pe: 100.3, revenueGrowth: 684, eps: 2.59, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 3.83, MEME: 6.96, RKNG: 5.62 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 3, avgWeight: 4.1, proScore: 4.1, coverage: 1,
      price: 41.98, weeklyPrices: [45.57, 46.59, 45.20, 45.27, 41.98], weeklyChange: -7.88, dayChange: -7.27, sortRank: 0, periodReturns: { '1M': -8.5, 'YTD': 71.2, '6M': 63.2, '1Y': 327.5 },
      priceHistory: { '1D': [45.27, 42.33, 42.67, 41.96, 42.89, 43.03, 42.8, 42.94, 42.65, 42.58, 42.52, 41.98, 42.05, 41.69, 41.29, 41.17, 40.94, 41.39, 41.13, 40.97, 40.62, 41.19, 41.62, 41.98], '1W': [45.57, 46.59, 45.2, 45.27, 41.98], '1M': [45.14, 48.98, 49.65, 47.28, 47.94, 47.86, 44.71, 44.15, 39.62, 40.94, 41.91, 38.92, 41.47, 42.7, 46.47, 46.27, 45.57, 46.59, 45.2, 45.27, 41.98], 'YTD': [24.52, 31.94, 35.22, 34.74, 38.07, 27.84, 36.17, 31.53, 28.65, 28.09, 27.48, 26.65, 28.37, 24.49, 25.57, 30.81, 32.43, 32.69, 44.24, 43.93, 36.62, 48.98, 44.71, 41.91, 46.27, 41.98], '6M': [25.72, 28.11, 37.68, 37.4, 36.18, 34.8, 38.26, 35.28, 30, 27.93, 27.03, 27.71, 27.26, 20.55, 25.18, 31.47, 31.32, 32.11, 39.88, 44.59, 39.14, 45.14, 47.86, 41.91, 46.27, 41.98], '1Y': [9.82, 10.56, 9.33, 10.91, 11.2, 13.14, 14.79, 14.8, 15.72, 16.7, 14.33, 17.18, 19.91, 22.59, 26.47, 29.29, 37.76, 30.62, 34.42, 33.09, 26.41, 23.09, 24.94, 31.14, 30.76, 23.9, 25.72, 28.11, 37.68, 37.4, 36.18, 34.8, 38.26, 33.56, 30.66, 26.15, 27.03, 27.71, 27.26, 20.55, 25.18, 31.47, 31.32, 32.11, 39.88, 43.93, 39.14, 45.14, 47.86, 41.91, 46.27, 41.98] },
      velocityScore: { '1D': 0.7, '1W': 8.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.53, MEME: 5.98, RKNG: 3.79 },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 3, avgWeight: 4.09, proScore: 4.09, coverage: 1,
      price: 50.3, weeklyPrices: [58.11, 59.96, 56.87, 54.72, 50.30], weeklyChange: -13.44, dayChange: -8.08, sortRank: 0, periodReturns: { '1M': -11.5, 'YTD': 33.2, '6M': 19.8, '1Y': 323.8 },
      priceHistory: { '1D': [54.72, 51.71, 51.78, 51.37, 52.55, 52.32, 52.03, 52.45, 52.11, 51.99, 51.96, 51.42, 51.29, 50.87, 50.56, 50.19, 49.72, 50.59, 50.09, 49.54, 49.03, 49.71, 49.76, 50.3], '1W': [58.11, 59.96, 56.87, 54.72, 50.3], '1M': [59.78, 67.84, 64.05, 63.54, 65.33, 66.6, 65.48, 61.86, 54.35, 59.19, 54.02, 51.52, 56.71, 59.77, 60.85, 59.18, 58.11, 59.96, 56.87, 54.72, 50.3], 'YTD': [37.77, 45.68, 51.89, 52.26, 59.84, 39.79, 40.03, 43.29, 44.24, 40.13, 41.37, 42.21, 41.43, 34.09, 37.06, 48.82, 48.39, 42.86, 60.98, 56.56, 47.74, 67.84, 65.48, 54.02, 59.18, 50.3], '6M': [41.98, 42.7, 46.03, 57.82, 52.36, 53.08, 46.15, 42.22, 42.36, 41.39, 38.84, 44.94, 42.16, 31.62, 35.74, 47.37, 45.17, 44.44, 54.74, 55.15, 50.46, 59.78, 66.6, 54.02, 59.18, 50.3], '1Y': [11.87, 15.66, 17.03, 18.05, 18.14, 16.11, 18.32, 17.73, 19.76, 22.35, 26.13, 32.85, 36.32, 46.29, 47.02, 63.85, 67.98, 51.83, 60.42, 76.41, 55.7, 45.83, 48.45, 46.45, 43.94, 35.8, 41.98, 42.7, 46.03, 57.82, 52.36, 53.08, 46.15, 40.97, 45.45, 38.85, 38.84, 44.94, 42.16, 31.62, 35.74, 47.37, 45.17, 44.44, 54.74, 56.56, 50.46, 59.78, 66.6, 54.02, 59.18, 50.3] },
      velocityScore: { '1D': -1.9, '1W': 3.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: 65.3, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 3.03, MEME: 6.07, RKNG: 3.18 },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 3, avgWeight: 3.69, proScore: 3.69, coverage: 1,
      price: 68.01, weeklyPrices: [85.43, 80.66, 73.19, 72.87, 68.01], weeklyChange: -20.39, dayChange: -6.67, sortRank: 0, periodReturns: { '1M': -35.8, 'YTD': -6.4, '6M': -12.9, '1Y': 36.1 },
      priceHistory: { '1D': [72.87, 68.49, 68.46, 68.14, 68.95, 69.24, 69.5, 69.93, 69.89, 69.45, 69.89, 69.13, 69.17, 68.26, 67.5, 67.46, 67.36, 68.25, 68.01, 67.78, 67.5, 68.07, 68.21, 68.01], '1W': [85.43, 80.66, 73.19, 72.87, 68.01], '1M': [119.7, 129.6, 133.09, 113.41, 105.65, 118.17, 107.73, 107.29, 93.6, 92.06, 88.71, 87.32, 97.56, 82.41, 87.57, 82.25, 85.43, 80.66, 73.19, 72.87, 68.01], 'YTD': [72.63, 90.56, 101.25, 116.37, 122.09, 93.27, 82.22, 86.4, 85.76, 93.86, 87.09, 90.74, 96.06, 83.99, 91.61, 86.91, 84.66, 69.85, 70.68, 72.96, 88.1, 129.6, 107.73, 88.71, 82.25, 68.01], '6M': [78.05, 83.47, 97.67, 115.77, 104.78, 104.55, 102.12, 82.51, 83.9, 86.92, 89.76, 89.11, 88.42, 73.82, 92.57, 88.57, 80.01, 71.88, 63.87, 82.55, 86.83, 119.7, 118.17, 88.71, 82.25, 68.01], '1Y': [49.97, 45.71, 43.97, 57.45, 60.06, 53.17, 51.79, 50.05, 45.08, 48.25, 41.86, 38.37, 41.44, 49.39, 66.16, 86.79, 95.69, 71.35, 80.06, 70.38, 64.49, 58.01, 55.52, 72.65, 84.75, 65.93, 78.05, 83.47, 97.67, 115.77, 104.78, 104.55, 102.12, 83.03, 85.82, 92.68, 89.76, 89.11, 88.42, 73.82, 92.57, 88.57, 80.01, 71.88, 63.87, 72.96, 86.83, 119.7, 118.17, 88.71, 82.25, 68.01] },
      velocityScore: { '1D': -4.2, '1W': 108.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$26B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.88, MEME: 6.11, RKNG: 2.07 },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 6.75, proScore: 4.5, coverage: 0.667,
      price: 1914.46, weeklyPrices: [1958.80, 2184.75, 2273.73, 1963.60, 1914.46], weeklyChange: -2.26, dayChange: -2.5, sortRank: 0, periodReturns: { '1M': 29.5, 'YTD': 706.5, '6M': 665.5, '1Y': 3951.8 },
      priceHistory: { '1D': [1963.6, 1939.49, 1955.82, 1936.81, 1954.65, 1942.06, 1919.03, 1925.52, 1917.98, 1936.66, 1931.5, 1919.5, 1915.21, 1893.62, 1873.99, 1878.06, 1864.2, 1889.95, 1886.89, 1876.01, 1872.16, 1893.48, 1911.06, 1914.46], '1W': [1958.8, 2184.75, 2273.73, 1963.6, 1914.46], '1M': [1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46], 'YTD': [237.38, 334.54, 409.24, 503.44, 539.3, 576.2, 630.29, 621.09, 651.9, 565.59, 618.82, 753.69, 677.86, 692.73, 851.57, 891.72, 979.07, 1064.21, 1409.98, 1452.02, 1383.29, 1589.94, 1831.5, 1646.54, 1991.55, 1914.46], '6M': [250.08, 275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1547.56, 1333.01, 1589.55, 1716.36, 1646.54, 1991.55, 1914.46], '1Y': [47.25, 46.21, 46.95, 41.52, 42.06, 42.92, 42.1, 47.01, 44.4, 48.44, 62.5, 84.3, 98.87, 94.29, 124.14, 129.68, 144.3, 146.95, 204.36, 216.5, 283.1, 245.96, 215.04, 213.31, 241.61, 219.46, 250.08, 275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 565.41, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1333.01, 1589.55, 1716.36, 1646.54, 1991.55, 1914.46] },
      velocityScore: { '1D': 1.1, '1W': 5.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$284B', pe: 65.4, revenueGrowth: 251, eps: 29.26, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.17, RKNG: 7.34 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 5.81, proScore: 3.87, coverage: 0.667,
      price: 326.19, weeklyPrices: [284.99, 328.91, 345.85, 321.98, 326.19], weeklyChange: 14.46, dayChange: 1.31, sortRank: 0, periodReturns: { '1M': 7.8, 'YTD': 275.4, '6M': 255, '1Y': 1410.1 },
      priceHistory: { '1D': [321.98, 320.42, 330.87, 324.73, 342.63, 341.83, 341.63, 339.8, 337.5, 336.08, 340.77, 333.61, 332.38, 328.39, 323, 325.64, 323.29, 325, 323.06, 320.1, 316.6, 323.52, 327.99, 326.19], '1W': [284.99, 328.91, 345.85, 321.98, 326.19], '1M': [302.4, 293.8, 290.01, 285, 273.51, 302.85, 287.32, 291.37, 263.61, 253.57, 259.61, 234.23, 248.88, 260.22, 274.5, 280.88, 284.99, 328.91, 345.85, 321.98, 326.19], 'YTD': [86.89, 121.84, 139.17, 145.63, 156.51, 136.6, 139.03, 159, 168.57, 159.99, 157.17, 156.58, 150.22, 132.45, 160.13, 213.84, 229.75, 287.97, 285.47, 280.69, 261.34, 293.8, 287.32, 259.61, 280.88, 326.19], '6M': [91.88, 98.69, 134.07, 149.5, 139.62, 156.13, 155.17, 139.74, 160.28, 166, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 283.92, 258.71, 302.4, 302.85, 259.61, 280.88, 326.19], '1Y': [21.6, 22.56, 25.85, 24.31, 33.06, 37.39, 38.86, 44.08, 44.51, 50.85, 54.91, 67.29, 80.97, 68.69, 88, 86.65, 116.58, 94.37, 133.71, 141.41, 126.72, 108.93, 101.14, 118.09, 108.99, 80.21, 91.88, 98.69, 134.07, 149.5, 139.62, 156.13, 155.17, 145.32, 166.2, 153.02, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 258.71, 302.4, 302.85, 259.61, 280.88, 326.19] },
      velocityScore: { '1D': 6.3, '1W': 20.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$93B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.94, RKNG: 4.68 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 2, avgWeight: 5.69, proScore: 3.79, coverage: 0.667,
      price: 643.83, weeklyPrices: [712.13, 746.23, 732.62, 670.75, 643.83], weeklyChange: -9.59, dayChange: -4.01, sortRank: 0, periodReturns: { '1M': 32.9, 'YTD': 273.7, '6M': 258.6, '1Y': 929.3 },
      priceHistory: { '1D': [670.75, 640.52, 647.17, 639.69, 654.36, 653.51, 651.12, 651.01, 644.37, 647.8, 645.6, 638.46, 634.85, 629.6, 621.17, 621.34, 618.27, 625.93, 618.54, 617, 614.42, 618.22, 635.19, 643.83], '1W': [712.13, 746.23, 732.62, 670.75, 643.83], '1M': [524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83], 'YTD': [172.27, 187.68, 222.1, 243.29, 278.41, 260.19, 284.1, 284.67, 282.25, 259.03, 261.18, 304.9, 296.14, 297.73, 337.88, 365, 389.1, 412.76, 483.15, 488.74, 455.8, 530.6, 594.11, 517.72, 681.08, 643.83], '6M': [179.56, 187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 515.83, 458.68, 524.65, 563.1, 517.72, 681.08, 643.83], '1Y': [62.55, 65.78, 65.06, 67.02, 69.02, 78.69, 73.78, 76.07, 75.64, 80.67, 90.49, 96.15, 105.15, 107.21, 131.26, 119.7, 120.44, 120.47, 141.38, 160.1, 166.11, 153.97, 157.74, 161, 187.2, 175.01, 179.56, 187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 458.68, 524.65, 563.1, 517.72, 681.08, 643.83] },
      velocityScore: { '1D': -2.1, '1W': 132.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$222B', pe: 38.6, revenueGrowth: 46, eps: 16.7, grossMargin: 45, dividendYield: 0.09,
      etfPresence: { BUZZ: false, MEME: 5.36, RKNG: 6.01 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 2, avgWeight: 5.57, proScore: 3.71, coverage: 0.667,
      price: 146.97, weeklyPrices: [167.34, 161.85, 171.23, 147.44, 146.97], weeklyChange: -12.17, dayChange: -0.32, sortRank: 0, periodReturns: { '1M': -19, 'YTD': 321.6, '6M': 258.5, '1Y': 460.3 },
      priceHistory: { '1D': [147.44, 142.64, 140.68, 138.73, 144.6, 145.36, 146.54, 145.68, 144.86, 145.03, 145.24, 143.74, 143.01, 142.48, 140.93, 142, 141.27, 143.96, 143.14, 142.55, 141.76, 143.79, 146.27, 146.97], '1W': [167.34, 161.85, 171.23, 147.44, 146.97], '1M': [177.62, 179.83, 169.02, 158.41, 185.67, 202.37, 184.07, 202.89, 177, 196.64, 162.88, 175.13, 172.78, 169.05, 191.55, 170.81, 167.34, 161.85, 171.23, 147.44, 146.97], 'YTD': [34.86, 33.01, 37, 38.15, 39.57, 38.13, 43.99, 46.98, 53.69, 101.14, 106.19, 92.63, 114.41, 86.35, 133.3, 142.55, 149.42, 152.83, 178.54, 188.28, 171.33, 179.83, 184.07, 162.88, 170.81, 146.97], '6M': [41, 39.6, 34.04, 37.04, 34.89, 44.16, 47.91, 44.46, 53.96, 102.51, 110.62, 94.07, 95.76, 85.19, 117.64, 146.39, 150.57, 137.26, 180.57, 184.9, 173.26, 177.62, 202.37, 162.88, 170.81, 146.97], '1Y': [26.23, 26.69, 28.25, 29.42, 25.84, 22.87, 23.23, 23.02, 21.93, 24.05, 23.32, 26.85, 29.04, 26.34, 27.98, 32.37, 32.95, 29.98, 35.48, 31.51, 23.94, 20.87, 25.57, 26.24, 36.32, 29.25, 41, 39.6, 34.04, 37.04, 34.89, 44.16, 47.91, 43.91, 56.27, 95.34, 110.62, 94.07, 95.76, 85.19, 117.64, 146.39, 150.57, 137.26, 180.57, 188.28, 173.26, 177.62, 202.37, 162.88, 170.81, 146.97] },
      velocityScore: { '1D': -4.9, '1W': -4.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 7.47, RKNG: 3.67 },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 2, avgWeight: 5.13, proScore: 3.42, coverage: 0.667,
      price: 1048.51, weeklyPrices: [1043.19, 1133.99, 1211.38, 1051.77, 1048.51], weeklyChange: 0.51, dayChange: -0.31, sortRank: 0, periodReturns: { '1M': 39.6, 'YTD': 267.4, '6M': 265.7, '1Y': 724 },
      priceHistory: { '1D': [1051.77, 1040, 1048.16, 1037.31, 1050.97, 1042.36, 1041.56, 1039.02, 1040.3, 1044.41, 1045.79, 1038.77, 1040.19, 1032.24, 1018.67, 1022.51, 1014.12, 1026.64, 1024.53, 1016.72, 997.88, 1012.91, 1026.37, 1048.51], '1W': [1043.19, 1133.99, 1211.38, 1051.77, 1048.51], '1M': [895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51], 'YTD': [285.41, 327.02, 336.63, 397.58, 435.79, 382.89, 413.97, 417.35, 415.56, 397.05, 405.35, 461.73, 382.09, 367.85, 421.51, 456.23, 487.48, 518.46, 666.59, 766.58, 698.74, 928.41, 1079.57, 935.89, 1020.76, 1048.51], '6M': [286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 795.33, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1048.51], '1Y': [127.25, 121.74, 123.11, 113.26, 111.73, 109.14, 108.78, 124.27, 117.21, 117.75, 124.21, 150.57, 168.89, 156.83, 183.75, 192.33, 191.94, 198.47, 226.63, 237.5, 244.9, 225.92, 230.26, 226.65, 258.46, 248.55, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1048.51] },
      velocityScore: { '1D': 2.4, '1W': 8.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 49.6, revenueGrowth: 196, eps: 21.14, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { BUZZ: 4.32, MEME: false, RKNG: 5.94 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'LITE', name: 'LITE', easyScore: 2, avgWeight: 4.42, proScore: 2.94, coverage: 0.667,
      price: 842.53, weeklyPrices: [869.98, 850.00, 893.93, 827.92, 842.53], weeklyChange: -3.16, dayChange: 1.76, sortRank: 0, periodReturns: { '1M': -11, 'YTD': 128.6, '6M': 112.8, '1Y': 818.1 },
      priceHistory: { '1D': [827.92, 810, 827.67, 820.79, 844.33, 853.7, 847.42, 845.33, 845.37, 848.17, 850.88, 844.5, 842.24, 839.21, 832.57, 836.27, 831.35, 839.6, 837.21, 834.05, 828.57, 832.76, 839.07, 842.53], '1W': [869.98, 850, 893.93, 827.92, 842.53], '1M': [910.81, 902.31, 860.62, 854.96, 905, 1029.15, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93, 827.92, 842.53], 'YTD': [368.59, 348.26, 343.27, 354.49, 381.44, 504.42, 583.46, 635.64, 677, 650.82, 616.09, 700.81, 777.17, 764.65, 894.13, 824.01, 873.6, 858.32, 944.28, 992.37, 890.09, 902.31, 938, 821.76, 875.36, 842.53], '6M': [395.92, 386.11, 351.42, 324.25, 332.45, 423.42, 577.15, 562.74, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 1053.09, 884.98, 910.81, 1029.15, 821.76, 875.36, 842.53], '1Y': [91.77, 91.24, 92.62, 102.64, 102.85, 110.08, 110.01, 120.23, 115.89, 125.84, 141.91, 164.88, 171.5, 159.11, 169.75, 159.76, 156.57, 158.06, 214.28, 232.75, 253.81, 268.92, 308.28, 327.85, 372.09, 337.13, 395.92, 386.11, 351.42, 324.25, 332.45, 423.42, 577.15, 600.42, 688.27, 694.43, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 884.98, 910.81, 1029.15, 821.76, 875.36, 842.53] },
      velocityScore: { '1D': -0.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$66B', pe: 147.6, revenueGrowth: 90, eps: 5.71, grossMargin: 41, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.86, RKNG: 2.97 },
      tonyNote: 'LITE appears in 2 of 3 Meme ETFs (67% coverage) with average weight 4.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'CRDO', easyScore: 2, avgWeight: 4.33, proScore: 2.88, coverage: 0.667,
      price: 268.99, weeklyPrices: [249.33, 271.83, 302.52, 272.01, 268.99], weeklyChange: 7.89, dayChange: -1.11, sortRank: 0, periodReturns: { '1M': 23.2, 'YTD': 86.9, '6M': 79.1, '1Y': 191.7 },
      priceHistory: { '1D': [272, 268.94, 270.24, 267.21, 271.48, 271.52, 271.52, 273.44, 270.96, 270.93, 268.79, 267, 268.02, 265.67, 265.06, 265.03, 262.69, 266, 264.51, 262.94, 260.42, 264.54, 265.76, 268.99], '1W': [249.33, 271.83, 302.52, 272.01, 268.99], '1M': [221.64, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 217.5, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83, 302.52, 272.01, 268.99], 'YTD': [143.89, 141.59, 149.12, 135.1, 129.47, 98.06, 121.78, 130.66, 114.48, 114.74, 111.57, 101.72, 103.91, 95.92, 107.93, 168.35, 189.49, 175.77, 198.29, 198.57, 168.99, 221.23, 214.6, 234.32, 239.18, 268.99], '6M': [150.19, 143.22, 150.42, 150.97, 128.02, 119.96, 123.41, 121.44, 124.05, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 210.22, 156.27, 221.64, 229, 234.32, 239.18, 268.99], '1Y': [92.2, 89.37, 97.29, 98.45, 101.17, 111.55, 117.34, 121.13, 105.99, 122.73, 134, 159.32, 172.31, 144.94, 149.63, 151.15, 131.41, 137.2, 171.52, 173.16, 160.34, 141.88, 164.01, 180.92, 154.47, 138.57, 150.19, 143.22, 150.42, 150.97, 128.02, 119.96, 123.41, 124.8, 120.83, 97.3, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 156.27, 221.64, 229, 234.32, 239.18, 268.99] },
      velocityScore: { '1D': 76.7, '1W': 0.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$50B', pe: 107.6, revenueGrowth: 157, eps: 2.5, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.54, RKNG: 5.11 },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 2, avgWeight: 4.08, proScore: 2.72, coverage: 0.667,
      price: 53.6, weeklyPrices: [54.69, 56.55, 58.32, 57.85, 53.60], weeklyChange: -1.99, dayChange: -7.35, sortRank: 0, periodReturns: { '1M': -15.8, 'YTD': 19.5, '6M': 7.6, '1Y': 40.6 },
      priceHistory: { '1D': [57.85, 53.88, 54.65, 53.65, 53.9, 53.88, 53.86, 54.04, 53.89, 54.36, 54.62, 54.28, 54.14, 53.19, 52.97, 53.17, 53, 53.75, 53.35, 53.1, 52.51, 53.03, 53.48, 53.6], '1W': [54.69, 56.55, 58.32, 57.85, 53.6], '1M': [63.62, 65.4, 70.14, 72.07, 69.28, 71.4, 68.23, 65.66, 56.78, 62.8, 56.69, 56.63, 57.99, 57.85, 61.18, 56.06, 54.69, 56.55, 58.32, 57.85, 53.6], 'YTD': [44.87, 50.45, 47.56, 49.33, 43.24, 30.43, 31.3, 33.43, 40.88, 36.02, 33.03, 32.38, 31.96, 27.79, 28.08, 43.25, 47.36, 42.11, 52.57, 55.87, 48.44, 65.4, 68.23, 56.69, 56.06, 53.6], '6M': [49.82, 46.77, 49.45, 50.8, 43.37, 38.56, 35.48, 34.11, 30.78, 38.34, 35.87, 33.29, 33.11, 26.59, 28.49, 35.76, 46.28, 43.08, 48, 56.89, 49.31, 63.62, 71.4, 56.69, 56.06, 53.6], '1Y': [38.11, 44.75, 45.93, 44.84, 43.9, 39.87, 41.23, 41.21, 36.79, 41.42, 42.11, 47.05, 66.81, 69.43, 69.6, 77.5, 72.41, 55.45, 61.11, 55.41, 50.71, 47.88, 46.9, 54.76, 52.55, 46.44, 49.82, 46.77, 49.45, 50.8, 43.37, 38.56, 35.48, 33.18, 31.62, 37.05, 35.87, 33.29, 33.11, 26.59, 28.49, 35.76, 46.28, 43.08, 48, 55.87, 49.31, 63.62, 71.4, 56.69, 56.06, 53.6] },
      velocityScore: { '1D': 6.7, '1W': 17.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$20B', pe: 137.4, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: 1.78, MEME: 6.37, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'RGTI', name: 'Rigetti Computing', easyScore: 2, avgWeight: 3.17, proScore: 2.12, coverage: 0.667,
      price: 19.53, weeklyPrices: [20.25, 21.36, 21.38, 21.28, 19.53], weeklyChange: -3.53, dayChange: -8.22, sortRank: 0, periodReturns: { '1M': -26.1, 'YTD': -11.8, '6M': -20.3, '1Y': 76.1 },
      priceHistory: { '1D': [21.28, 19.8, 19.88, 19.66, 19.76, 19.82, 19.87, 19.98, 19.84, 19.86, 19.89, 19.71, 19.66, 19.33, 19.24, 19.32, 19.25, 19.49, 19.4, 19.34, 19.1, 19.28, 19.32, 19.53], '1W': [20.25, 21.36, 21.38, 21.28, 19.53], '1M': [25.07, 24.62, 27.03, 25.54, 25.63, 26.88, 24.09, 24.16, 20.68, 21.76, 19.69, 19.44, 20.63, 20.98, 22.7, 20.64, 20.25, 21.36, 21.38, 21.28, 19.53], 'YTD': [22.15, 25.25, 24.7, 24.96, 19.85, 14.98, 14.99, 16.6, 18.64, 16.97, 16.07, 15.67, 15.14, 13.5, 14.31, 19.11, 18.38, 16.08, 20.09, 19.07, 15.96, 24.62, 24.09, 19.69, 20.64, 19.53], '6M': [24.51, 23.6, 24.72, 25.62, 21.76, 17.71, 17.59, 16.09, 16.02, 17.69, 17.6, 16.14, 15.88, 12.9, 13.84, 16.87, 18.25, 16.39, 18.27, 20.51, 16.62, 25.07, 26.88, 19.69, 20.64, 19.53], '1Y': [11.09, 13.08, 13.03, 17.14, 15.95, 14.5, 15.99, 17.24, 14.76, 15.39, 15.12, 16.69, 24.74, 32.1, 35.4, 47.11, 56.34, 36.06, 39.41, 37.29, 28.3, 25.46, 25.57, 30.06, 26.88, 22.82, 24.51, 23.6, 24.72, 25.62, 21.76, 17.71, 17.59, 15.59, 16.48, 16.96, 17.6, 16.14, 15.88, 12.9, 13.84, 16.87, 18.25, 16.39, 18.27, 19.07, 16.62, 25.07, 26.88, 19.69, 20.64, 19.53] },
      velocityScore: { '1D': 3.9, '1W': -2.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: null, revenueGrowth: 199, eps: -0.89, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.44, RKNG: 2.91 },
      tonyNote: 'Rigetti Computing is a quantum hardware company using superconducting qubit technology. It holds a position in Meme ETFs alongside IonQ and D-Wave as part of the quantum computing basket. Revenue is minimal, the technology is earlier-stage than IonQ, and the ETF allocation is speculative. The weight score is low; this is a high-risk, long-duration positioning.',
    },
    {
      ticker: 'GOOGL', name: 'GOOGL', easyScore: 2, avgWeight: 2.1, proScore: 1.4, coverage: 0.667,
      price: 345.29, weeklyPrices: [363.79, 368.03, 349.68, 346.13, 345.29], weeklyChange: -5.09, dayChange: -0.23, sortRank: 0, periodReturns: { '1M': -9.8, 'YTD': 10.3, '6M': 9.9, '1Y': 102.3 },
      priceHistory: { '1D': [346.09, 348.44, 350.31, 349.73, 350.41, 352.71, 350.87, 350.96, 350.43, 350.22, 350.6, 348.9, 349.22, 349.53, 349.01, 348.79, 349.27, 346.65, 344.39, 342.88, 344.39, 344.73, 344.83, 345.29], '1W': [363.79, 368.03, 349.68, 346.13, 345.29], '1M': [388.88, 388.83, 390.13, 380.34, 376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68, 369.35, 373.25, 363.79, 368.03, 349.68, 346.13, 345.29], 'YTD': [313, 325.44, 332.78, 330.54, 338.25, 331.25, 309, 302.85, 307.38, 300.88, 303.55, 307.69, 290.93, 297.39, 318.49, 337.12, 339.32, 349.94, 398.04, 387.35, 387.66, 388.83, 358.99, 364.26, 373.25, 345.29], '6M': [314.09, 315.15, 328.57, 330, 333.26, 343.69, 324.32, 305.72, 311.49, 306.52, 306.36, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 388.43, 388.64, 396.94, 388.88, 361.85, 364.26, 373.25, 345.29], '1Y': [170.68, 178.64, 177.62, 183.58, 192.17, 191.9, 196.09, 201.96, 199.32, 207.48, 232.3, 240.37, 252.03, 245.79, 245.69, 241.53, 251.03, 251.69, 274.57, 284.31, 286.71, 292.81, 319.95, 317.62, 312.43, 302.46, 314.09, 315.15, 328.57, 330, 333.26, 343.69, 324.32, 302.02, 310.9, 303.58, 306.36, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 388.43, 387.35, 396.94, 388.88, 361.85, 364.26, 373.25, 345.29] },
      velocityScore: { '1D': -2.1, '1W': -4.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.2T', pe: 26.3, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { BUZZ: 1.54, MEME: false, RKNG: 2.67 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'RDW', name: 'Redwire', easyScore: 1, avgWeight: 6.15, proScore: 2.05, coverage: 0.333,
      price: 11.38, weeklyPrices: [14.36, 14.35, 13.02, 12.22, 11.38], weeklyChange: -20.75, dayChange: -6.87, sortRank: 0, periodReturns: { '1M': -34.9, 'YTD': 49.7, '6M': 45.5, '1Y': -29 },
      priceHistory: { '1D': [12.22, 11.59, 11.56, 11.47, 11.64, 11.72, 11.78, 11.85, 11.83, 11.77, 11.8, 11.67, 11.65, 11.58, 11.47, 11.49, 11.47, 11.57, 11.51, 11.45, 11.36, 11.44, 11.39, 11.38], '1W': [14.36, 14.35, 13.02, 12.22, 11.38], '1M': [22.04, 24, 25.9, 24.57, 20.68, 20.58, 18.62, 21.43, 18.45, 18.57, 15.75, 14.87, 17.09, 15.12, 14.83, 13.5, 14.36, 14.35, 13.02, 12.22, 11.38], 'YTD': [7.6, 10.28, 10.86, 11.98, 12.81, 8.8, 7.89, 8.6, 9.55, 9.07, 9.48, 9.55, 9.16, 9.08, 9.22, 9.91, 11.93, 8.6, 9.64, 11.56, 13.91, 24, 18.62, 15.75, 13.5, 11.38], '6M': [7.82, 9.03, 10.98, 11.71, 10.96, 10.88, 10.09, 8.02, 8.12, 9.52, 9.65, 9.54, 9.38, 7.71, 9.65, 9.81, 10.31, 9.04, 8.69, 12.16, 13.96, 22.04, 20.58, 15.75, 13.5, 11.38], '1Y': [16.02, 15.6, 15.65, 19.09, 16.02, 14.29, 13.7, 9.66, 8.7, 8.99, 8.21, 8.45, 8.01, 8.96, 10.36, 9.65, 8.94, 7.64, 7.85, 7.3, 5.97, 5.48, 5.37, 6.14, 7.67, 7.02, 7.82, 9.03, 10.98, 11.71, 10.96, 10.88, 10.09, 8, 8.42, 8.95, 9.65, 9.54, 9.38, 7.71, 9.65, 9.81, 10.31, 9.04, 8.69, 11.56, 13.96, 22.04, 20.58, 15.75, 13.5, 11.38] },
      velocityScore: { '1D': -9.7, '1W': 6.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2B', pe: null, revenueGrowth: 58, eps: -2.59, grossMargin: 13, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.15, RKNG: false },
      tonyNote: 'Redwire Corp is a space infrastructure company — solar arrays, structures, and manufacturing in orbit. It appears in Meme and speculative ETFs as a high-risk space economy play. Revenue is growing from a small base but the business is pre-profitability; the ETF weight is minimal and reflects thematic positioning rather than fundamental conviction.',
    },
    {
      ticker: 'QBTS', name: 'D-Wave Quantum', easyScore: 1, avgWeight: 6.13, proScore: 2.04, coverage: 0.333,
      price: 22.98, weeklyPrices: [22.92, 24.69, 24.47, 25.03, 22.98], weeklyChange: 0.26, dayChange: -8.19, sortRank: 0, periodReturns: { '1M': -21.8, 'YTD': -12.1, '6M': -16.5, '1Y': 62.1 },
      priceHistory: { '1D': [25.03, 23.3, 23.4, 22.96, 23.05, 23.04, 23.17, 23.32, 23.18, 23.2, 23.25, 23.09, 23, 22.66, 22.64, 22.63, 22.63, 22.92, 22.76, 22.69, 22.45, 22.66, 22.77, 22.98], '1W': [22.92, 24.69, 24.47, 25.03, 22.98], '1M': [27.82, 27.48, 29.49, 30.14, 29.18, 29.91, 27.55, 27.64, 23.85, 25.83, 23.52, 23.25, 23.82, 23.37, 26.26, 23.94, 22.92, 24.69, 24.47, 25.03, 22.98], 'YTD': [26.15, 29.28, 28.72, 27.43, 23.22, 17.21, 18.82, 19.38, 20.14, 18.83, 17.83, 16.49, 16.19, 13.7, 13.87, 20.81, 21.24, 18.27, 23.83, 22.35, 18.19, 27.48, 27.55, 23.52, 23.94, 22.98], '6M': [27.52, 28.13, 28.11, 28.83, 23.75, 20.97, 21.21, 19.67, 18.05, 18.94, 19.04, 17.46, 16.31, 12.98, 13.74, 16.97, 20.36, 18.11, 21.54, 24.03, 19.06, 27.82, 29.91, 23.52, 23.94, 22.98], '1Y': [14.18, 15.98, 16.01, 19.24, 19.76, 17.19, 17.58, 18.65, 15.06, 15.23, 15.29, 16.52, 24.02, 26.34, 29.21, 35.07, 44.78, 27.29, 34.26, 31.02, 26.4, 23.44, 22.41, 28.73, 27.98, 24.89, 27.52, 28.13, 28.11, 28.83, 23.75, 20.97, 21.21, 18.44, 18.66, 18.24, 19.04, 17.46, 16.31, 12.98, 13.74, 16.97, 20.36, 18.11, 21.54, 22.35, 19.06, 27.82, 29.91, 23.52, 23.94, 22.98] },
      velocityScore: { '1D': 7.4, '1W': 12.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: -81, eps: -1.14, grossMargin: 66, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.13, RKNG: false },
      tonyNote: 'D-Wave Quantum is a quantum computing company — the only publicly traded business built around quantum annealing hardware. Revenue is minimal and profitability is many years away, but it holds a position in Meme ETFs as the purest-play quantum computing stock available to retail investors. The ETF weight is small and the position is purely thematic.',
    },
    {
      ticker: 'NVTS', name: 'Navitas Semiconductor', easyScore: 1, avgWeight: 5.24, proScore: 1.75, coverage: 0.333,
      price: 18.32, weeklyPrices: [22.34, 24.02, 23.70, 21.40, 18.32], weeklyChange: -17.99, dayChange: -14.39, sortRank: 0, periodReturns: { '1M': -37.4, 'YTD': 156.6, '6M': 139.2, '1Y': 161 },
      priceHistory: { '1D': [21.4, 19.69, 19.44, 18.81, 19.09, 18.93, 18.72, 18.83, 18.65, 18.59, 18.6, 18.31, 18.31, 18.12, 17.92, 17.87, 17.77, 18.14, 17.91, 17.83, 17.53, 17.78, 17.98, 18.32], '1W': [22.34, 24.02, 23.7, 21.4, 18.32], '1M': [31.79, 28.88, 28.51, 26.6, 24.86, 25.86, 30.84, 30.67, 25.08, 24.48, 22.85, 20.5, 22.21, 23.39, 23.73, 22.09, 22.34, 24.02, 23.7, 21.4, 18.32], 'YTD': [7.14, 10.06, 10, 11.29, 9.46, 7.43, 8.37, 8.08, 9.51, 8.96, 9.98, 9.06, 9.48, 8.54, 9.42, 10.26, 18.47, 15.48, 16.68, 19.25, 19.43, 28.88, 30.84, 22.85, 22.09, 18.32], '6M': [7.66, 8.38, 10.07, 10.91, 9.38, 8.62, 9.22, 8.3, 8.12, 9.55, 8.38, 10.49, 9.18, 7.83, 8.57, 9.87, 15.33, 15.12, 17.55, 22.65, 19.67, 31.79, 25.86, 22.85, 22.09, 18.32], '1Y': [7.02, 6.32, 6.26, 6.27, 8.98, 7.33, 6.35, 7.36, 6.25, 6.07, 5.54, 6.08, 6.73, 6.51, 8.19, 8, 15.16, 13.6, 13.57, 9.86, 8.64, 7.72, 8.34, 9.45, 9.18, 7.37, 7.66, 8.38, 10.07, 10.91, 9.38, 8.62, 9.22, 8.22, 8.26, 8.9, 8.38, 10.49, 9.18, 7.83, 8.57, 9.87, 15.33, 15.12, 17.55, 19.25, 19.67, 31.79, 25.86, 22.85, 22.09, 18.32] },
      velocityScore: { '1D': 3.6, '1W': -43, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 5.24 },
      tonyNote: 'Navitas Semiconductor is a small-cap wide-bandgap power semiconductor name — gallium nitride and silicon carbide for fast charging and EV applications. The $26.60 share price and small market cap position it as a speculative holding in ETFs willing to take higher-risk bets on next-generation power conversion.',
    },
    {
      ticker: 'WULF', name: 'WULF', easyScore: 1, avgWeight: 4.35, proScore: 1.45, coverage: 0.333,
      price: 26.97, weeklyPrices: [27.86, 28.98, 28.31, 28.78, 26.97], weeklyChange: -3.19, dayChange: -6.29, sortRank: 0, periodReturns: { '1M': 18.2, 'YTD': 134.7, '6M': 119.1, '1Y': 609.7 },
      priceHistory: { '1D': [28.78, 27.49, 28.18, 27.54, 27.94, 27.74, 27.52, 27.71, 27.7, 27.86, 27.89, 27.49, 27.38, 27.25, 27.01, 26.64, 26.41, 26.59, 26.25, 26.12, 26.04, 26.19, 26.7, 26.97], '1W': [27.86, 28.98, 28.31, 28.78, 26.97], '1M': [25.18, 26.74, 26.4, 25.56, 25.66, 26.49, 26.16, 26.19, 24, 25.86, 25.3, 23.19, 25.35, 26.06, 28.17, 28.01, 27.86, 28.98, 28.31, 28.78, 26.97], 'YTD': [11.49, 12.84, 13.83, 12.89, 14.54, 11.92, 15.91, 15.47, 17.88, 15.23, 14.67, 15.3, 16.86, 14.48, 19.03, 19.67, 20.55, 20.02, 25.74, 22.8, 21.34, 26.74, 26.16, 25.3, 28.01, 26.97], '6M': [12.31, 12.74, 13.1, 13.85, 13.79, 13.44, 16.65, 16.26, 15.68, 16.02, 13.85, 16.41, 16.19, 13.7, 16.57, 20.95, 19.77, 20.8, 23.49, 23.37, 21.14, 25.18, 26.49, 25.3, 28.01, 26.97], '1Y': [3.8, 5.04, 5.13, 5.36, 5.32, 5.16, 5.15, 5.46, 9.28, 9.13, 8.87, 10.64, 11.17, 10.97, 11.58, 13.59, 15.47, 12.62, 14.5, 15.36, 12.64, 12.23, 14.84, 15.1, 15.83, 11.79, 12.31, 12.74, 13.1, 13.85, 13.79, 13.44, 16.65, 16.18, 17.56, 14.74, 13.85, 16.41, 16.19, 13.7, 16.57, 20.95, 19.77, 20.8, 23.49, 22.8, 21.14, 25.18, 26.49, 25.3, 28.01, 26.97] },
      velocityScore: { '1D': -0.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: null, revenueGrowth: -1, eps: -2.51, grossMargin: 64, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.35 },
      tonyNote: 'WULF appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AXTI', name: 'AXT Inc', easyScore: 1, avgWeight: 4.33, proScore: 1.44, coverage: 0.333,
      price: 70.14, weeklyPrices: [92.11, 84.57, 92.44, 77.91, 70.14], weeklyChange: -23.85, dayChange: -9.97, sortRank: 0, periodReturns: { '1M': -50.2, 'YTD': 329, '6M': 367.3, '1Y': 3193 },
      priceHistory: { '1D': [77.91, 72.23, 69.65, 67.46, 69.01, 71.2, 73.08, 72.24, 71.15, 70.73, 70.62, 69.22, 68.62, 68.25, 67.82, 68.33, 67.71, 68.67, 68.56, 68.15, 68.05, 69, 69.62, 70.14], '1W': [92.11, 84.57, 92.44, 77.91, 70.14], '1M': [132.6, 122.77, 115.7, 103.16, 109.55, 110.85, 106.7, 105.99, 89.04, 90.78, 78.36, 85.29, 88.34, 97.18, 110.74, 93.04, 92.11, 84.57, 92.44, 77.91, 70.14], 'YTD': [16.35, 25.83, 25.72, 17.92, 16.38, 20.43, 24.79, 23.81, 37.12, 38.8, 46.73, 48.76, 67.35, 47.14, 63.12, 62.93, 86.94, 71.07, 104.83, 122.9, 112.88, 122.77, 106.7, 78.36, 93.04, 70.14], '6M': [15.01, 16.76, 22.99, 22.09, 17.8, 20.94, 27.77, 24.24, 28.43, 46.32, 38.56, 48.39, 64.44, 52.73, 45.46, 67.3, 74.97, 68.71, 107.55, 125.81, 105.88, 132.6, 110.85, 78.36, 93.04, 70.14], '1Y': [2.13, 2.08, 2.26, 2.5, 2.37, 2.08, 2.07, 2.18, 2.51, 2.87, 2.96, 3.39, 3.96, 4.75, 4.7, 5.23, 4.59, 4.94, 7.07, 9.1, 10.98, 10.11, 10.45, 12.1, 16.38, 14.01, 15.01, 16.76, 22.99, 22.09, 17.8, 20.94, 27.77, 23.21, 35.08, 41.76, 38.56, 48.39, 64.44, 52.73, 45.46, 67.3, 74.97, 68.71, 107.55, 122.9, 105.88, 132.6, 110.85, 78.36, 93.04, 70.14] },
      velocityScore: { '1D': -2.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5B', pe: null, revenueGrowth: 39, eps: -0.32, grossMargin: 21, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.33, RKNG: false },
      tonyNote: 'AXT Inc is a compound semiconductor substrate manufacturer — gallium arsenide, indium phosphide, and germanium wafers used in data center optical transceivers, 5G RF chips, and solar cells. Revenue is growing with optical networking demand. Small market cap but positioned at a genuine supply-chain chokepoint for III-V semiconductor materials.',
    },
    {
      ticker: 'LRCX', name: 'LRCX', easyScore: 1, avgWeight: 4.02, proScore: 1.34, coverage: 0.333,
      price: 374.8, weeklyPrices: [374.18, 389.04, 409.54, 371.33, 374.80], weeklyChange: 0.17, dayChange: 0.93, sortRank: 0, periodReturns: { '1M': 22.7, 'YTD': 119, '6M': 111.4, '1Y': 290.3 },
      priceHistory: { '1D': [371.33, 365.88, 370.1, 368.25, 371.55, 375.63, 369.18, 368.81, 368.67, 369.8, 370.49, 368.82, 367.81, 366.78, 362.76, 365.15, 363.13, 365.7, 364.69, 364.02, 362.97, 364.4, 368.17, 374.8], '1W': [374.18, 389.04, 409.54, 371.33, 374.8], '1M': [322.68, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04, 409.54, 371.33, 374.8], 'YTD': [171.18, 200.96, 217.47, 220.7, 248.17, 213.31, 231.29, 237.39, 239.07, 214.68, 209.49, 224.71, 233.45, 222.01, 258.76, 265.16, 265.55, 248.75, 297.17, 289.24, 273.38, 318.93, 343.71, 327.16, 369.34, 374.8], '6M': [177.33, 185.06, 218.36, 222.96, 222.87, 237.5, 229.28, 235.53, 242.27, 231, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 296.05, 277.96, 322.68, 334.41, 327.16, 369.34, 374.8], '1Y': [96.02, 98.83, 101.06, 100.79, 97.78, 94.84, 95.94, 106.74, 99.15, 103.67, 100.42, 115.58, 126.32, 128.13, 146.99, 141, 144.78, 141.25, 160.67, 165.05, 161.42, 148.8, 155.14, 157.09, 168.71, 164.7, 177.33, 185.06, 218.36, 222.96, 222.87, 237.5, 229.28, 235.58, 244.25, 217.27, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 277.96, 322.68, 334.41, 327.16, 369.34, 374.8] },
      velocityScore: { '1D': -0.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$469B', pe: 71.1, revenueGrowth: 24, eps: 5.27, grossMargin: 50, dividendYield: 0.28,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.02 },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
