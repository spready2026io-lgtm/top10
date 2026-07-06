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
export const SPY_RET: Record<Period, number> = { '1W': 1.2, '1M': 1.7, 'YTD': 10, '6M': 8.4, '1Y': 20.9 };
// @@END_GENERATED:SPY_RET@@

// Top holdings per ETF (ticker + portfolio weight %), shown on ETF row hover.
export type EtfHolding = { t: string; w: number };

// @@GENERATED:ETF_TOP_HOLDINGS@@
export const ETF_TOP_HOLDINGS: Record<string, EtfHolding[]> = {
  AIS: [{ t: 'MU', w: 6.7 }, { t: 'AMD', w: 4.9 }, { t: 'MRVL', w: 3.9 }, { t: 'SIMO', w: 3.7 }, { t: 'VRT', w: 3.5 }],
  ARTY: [{ t: 'AMD', w: 5.0 }, { t: 'MU', w: 4.8 }, { t: 'NVDA', w: 4.5 }, { t: 'AVGO', w: 4.3 }, { t: 'MRVL', w: 4.0 }],
  BAI: [{ t: 'MU', w: 6.2 }, { t: 'AMD', w: 5.0 }, { t: 'LRCX', w: 4.7 }, { t: 'TSM', w: 4.6 }, { t: 'NVDA', w: 4.1 }],
  IGPT: [{ t: 'AMD', w: 8.5 }, { t: 'META', w: 8.3 }, { t: 'GOOGL', w: 8.1 }, { t: 'MU', w: 7.9 }, { t: 'NVDA', w: 7.7 }],
  IVES: [{ t: 'AAPL', w: 5.2 }, { t: 'TSM', w: 4.9 }, { t: 'AMZN', w: 4.9 }, { t: 'MSFT', w: 4.8 }, { t: 'META', w: 4.8 }],
  ALAI: [{ t: 'NVDA', w: 12.3 }, { t: 'TSM', w: 5.6 }, { t: 'MSFT', w: 5.2 }, { t: 'AMZN', w: 5.2 }, { t: 'GOOG', w: 4.9 }],
  CHAT: [{ t: 'NVDA', w: 7.0 }, { t: 'GOOGL', w: 5.7 }, { t: 'AVGO', w: 4.4 }, { t: 'AMD', w: 3.9 }, { t: 'MU', w: 3.6 }],
  AIFD: [{ t: 'MU', w: 6.5 }, { t: 'NVDA', w: 6.3 }, { t: 'PANW', w: 6.2 }, { t: 'MRVL', w: 5.5 }, { t: 'AVGO', w: 5.2 }],
  SPRX: [{ t: 'ALAB', w: 11.6 }, { t: 'COHR', w: 8.9 }, { t: 'KLAC', w: 8.6 }, { t: 'NET', w: 8.3 }, { t: 'ARM', w: 8.0 }],
  AOTG: [{ t: 'AMD', w: 15.9 }, { t: 'NVDA', w: 10.0 }, { t: 'MU', w: 9.9 }, { t: 'TSM', w: 7.3 }, { t: 'TOST', w: 5.3 }],
  SOXX: [{ t: 'MU', w: 8.2 }, { t: 'AMD', w: 8.2 }, { t: 'NVDA', w: 7.5 }, { t: 'AVGO', w: 6.6 }, { t: 'INTC', w: 6.2 }],
  PSI: [{ t: 'AMAT', w: 6.8 }, { t: 'KLAC', w: 6.0 }, { t: 'LRCX', w: 5.6 }, { t: 'MU', w: 5.6 }, { t: 'AMD', w: 5.3 }],
  XSD: [{ t: 'MXL', w: 3.1 }, { t: 'AMBA', w: 3.0 }, { t: 'ALGM', w: 2.9 }, { t: 'ALAB', w: 2.9 }, { t: 'PI', w: 2.7 }],
  DRAM: [{ t: 'SNDK', w: 4.8 }, { t: 'WDC', w: 4.3 }, { t: 'STX', w: 4.2 }, { t: 'MU', w: 3.0 }, { t: 'JPY', w: 0.8 }],
  PTF: [{ t: 'SNDK', w: 5.2 }, { t: 'MU', w: 4.9 }, { t: 'KLAC', w: 4.2 }, { t: 'WDC', w: 4.2 }, { t: 'AXTI', w: 3.7 }],
  WCLD: [{ t: 'FROG', w: 3.2 }, { t: 'PANW', w: 3.0 }, { t: 'DDOG', w: 2.9 }, { t: 'DOCN', w: 2.6 }, { t: 'CRWD', w: 2.5 }],
  IGV: [{ t: 'PANW', w: 10.3 }, { t: 'PLTR', w: 8.3 }, { t: 'MSFT', w: 8.2 }, { t: 'CRWD', w: 7.2 }, { t: 'ORCL', w: 5.8 }],
  FDTX: [{ t: 'MRVL', w: 9.7 }, { t: 'MU', w: 9.3 }, { t: 'TSM', w: 6.4 }, { t: 'WDC', w: 4.5 }, { t: 'PANW', w: 4.2 }],
  GTEK: [{ t: 'MRVL', w: 3.9 }, { t: 'APH', w: 2.4 }, { t: 'CDNS', w: 2.4 }, { t: 'AXON', w: 2.2 }, { t: 'NET', w: 2.1 }],
  ARKK: [{ t: 'TSLA', w: 9.9 }, { t: 'TEM', w: 5.8 }, { t: 'CRSP', w: 5.3 }, { t: 'HOOD', w: 5.0 }, { t: 'AMD', w: 4.4 }],
  MARS: [{ t: 'SPCX', w: 22.2 }, { t: 'RKLB', w: 10.4 }, { t: 'ASTS', w: 7.8 }, { t: 'VSAT', w: 5.2 }, { t: 'PL', w: 5.0 }],
  FRWD: [{ t: 'NVDA', w: 8.4 }, { t: 'AMD', w: 7.4 }, { t: 'STX', w: 7.0 }, { t: 'TSM', w: 6.1 }, { t: 'LRCX', w: 5.7 }],
  BCTK: [{ t: 'SPCX', w: 8.7 }, { t: 'TSM', w: 8.6 }, { t: 'LRCX', w: 7.6 }, { t: 'AVGO', w: 6.5 }, { t: 'GOOG', w: 6.5 }],
  FWD: [{ t: 'AMD', w: 2.2 }, { t: 'AMAT', w: 2.1 }, { t: 'LRCX', w: 1.9 }, { t: 'NVDA', w: 1.9 }, { t: 'AVGO', w: 1.8 }],
  CBSE: [{ t: 'TENB', w: 3.7 }, { t: 'IBRX', w: 3.5 }, { t: 'KRYS', w: 3.2 }, { t: 'SCI', w: 3.1 }, { t: 'SBUX', w: 3.0 }],
  FCUS: [{ t: 'INTC', w: 5.3 }, { t: 'SNDK', w: 5.2 }, { t: 'DELL', w: 4.8 }, { t: 'WDC', w: 4.7 }, { t: 'BE', w: 4.7 }],
  WGMI: [{ t: 'CIFR', w: 17.6 }, { t: 'HUT', w: 10.8 }, { t: 'KEEL', w: 10.2 }, { t: 'IREN', w: 10.2 }, { t: 'MARA', w: 5.1 }],
  CNEQ: [{ t: 'NVDA', w: 13.2 }, { t: 'MSFT', w: 6.3 }, { t: 'GOOG', w: 5.9 }, { t: 'TSM', w: 5.8 }, { t: 'AAPL', w: 4.9 }],
  SGRT: [{ t: 'VRT', w: 12.0 }, { t: 'WDC', w: 11.2 }, { t: 'MU', w: 7.0 }, { t: 'ARW', w: 5.8 }, { t: 'WELL', w: 5.1 }],
  SPMO: [{ t: 'MU', w: 10.7 }, { t: 'NVDA', w: 7.8 }, { t: 'AVGO', w: 6.1 }, { t: 'GOOGL', w: 4.5 }, { t: 'JNJ', w: 4.5 }],
  XMMO: [{ t: 'CW', w: 4.2 }, { t: 'ATI', w: 3.3 }, { t: 'WWD', w: 3.0 }, { t: 'STRL', w: 3.0 }, { t: 'TTMI', w: 2.6 }],
  POW: [{ t: 'PWR', w: 4.9 }, { t: 'POWL', w: 4.4 }, { t: 'ETN', w: 4.0 }, { t: 'BELFB', w: 3.9 }, { t: 'NVT', w: 3.6 }],
  VOLT: [{ t: 'BELFB', w: 7.2 }, { t: 'POWL', w: 6.4 }, { t: 'ETN', w: 5.3 }, { t: 'PWR', w: 5.2 }, { t: 'NEE', w: 5.2 }],
  PBD: [{ t: 'RIVN', w: 1.3 }, { t: 'ENRG', w: 1.1 }],
  PBW: [{ t: 'RIVN', w: 1.9 }, { t: 'OPAL', w: 1.9 }, { t: 'FCEL', w: 1.8 }, { t: 'BETA', w: 1.8 }, { t: 'IONR', w: 1.8 }],
  IVEP: [{ t: 'BE', w: 5.1 }, { t: 'GEV', w: 4.6 }, { t: 'PWR', w: 4.3 }, { t: 'SBGSY', w: 4.2 }, { t: 'VRT', w: 4.1 }],
  AIRR: [{ t: 'STRL', w: 5.3 }, { t: 'AGX', w: 4.4 }, { t: 'CHRW', w: 4.3 }, { t: 'FIX', w: 4.1 }, { t: 'MTZ', w: 4.0 }],
  PRN: [{ t: 'FIX', w: 4.5 }, { t: 'PWR', w: 4.1 }, { t: 'HWM', w: 4.0 }, { t: 'STRL', w: 4.0 }, { t: 'JBL', w: 3.6 }],
  RSHO: [{ t: 'TKR', w: 8.7 }, { t: 'POWL', w: 7.3 }, { t: 'CGNX', w: 7.2 }, { t: 'CAT', w: 6.9 }, { t: 'AIT', w: 6.0 }],
  IDEF: [{ t: 'RTX', w: 8.5 }, { t: 'LMT', w: 7.1 }, { t: 'BA', w: 5.0 }, { t: 'GD', w: 4.5 }, { t: 'NOC', w: 3.4 }],
  BILT: [{ t: 'UNP', w: 6.0 }, { t: 'AENA', w: 4.5 }, { t: 'AEP', w: 4.5 }, { t: 'TRP', w: 3.7 }, { t: 'XEL', w: 3.5 }],
  BUZZ: [{ t: 'IBRX', w: 4.0 }, { t: 'SOFI', w: 3.3 }, { t: 'AMD', w: 3.2 }, { t: 'NOW', w: 3.1 }, { t: 'GME', w: 3.1 }],
  MEME: [{ t: 'BE', w: 7.2 }, { t: 'AAOI', w: 7.0 }, { t: 'NBIS', w: 6.3 }, { t: 'SNDK', w: 6.1 }, { t: 'IREN', w: 5.9 }],
  RKNG: [{ t: 'OPEN', w: 3.8 }, { t: 'WDC', w: 3.7 }, { t: 'DELL', w: 3.7 }, { t: 'AMD', w: 3.7 }, { t: 'MU', w: 3.6 }],
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
  'AI & ML':         { '1W': -2.5, '1M': 3.1, 'YTD': 45.4, '6M': 39.2, '1Y': 78.1 },
  'Semiconductors':  { '1W': -7, '1M': 8.8, 'YTD': 102.2, '6M': 89.1, '1Y': 141.3 },
  'Broad Tech':      { '1W': -2, '1M': 1.7, 'YTD': 26.9, '6M': 21.3, '1Y': 42 },
  'Electrification': { '1W': -1.6, '1M': -2.1, 'YTD': 26.7, '6M': 21.1, '1Y': 46 },
  'Industrials':     { '1W': -0.3, '1M': 1.4, 'YTD': 24.8, '6M': 18.9, '1Y': 38.1 },
  'Meme':            { '1W': -4.5, '1M': -4.5, 'YTD': 18.3, '6M': 8.5, '1Y': 3.9 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, IndexChartByPeriod> = {
  'AI & ML': {
    '1D': { top10: [100, 102.71, 103.39, 103.41, 103.86, 103.8, 103.98, 103.87, 103.76, 103.51, 103.42, 103.64, 103.6, 103.64, 103.68, 103.63, 103.54, 103.42, 103.28, 103.24, 103.15, 102.88, 102.67, 102.53], spy: [100, 100.47, 100.55, 100.48, 100.62, 100.69, 100.66, 100.67, 100.74, 100.72, 100.75, 100.78, 100.82, 100.81, 100.83, 100.82, 100.79, 100.8, 100.78, 100.89, 100.85, 100.79, 100.71, 100.73], top10Return: 2.5, spyReturn: 0.73, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 102.9, 99.37, 95.24, 97.52], spy: [100, 100.78, 100.64, 100.51, 101.25], top10Return: -2.5, spyReturn: 1.2, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.02, 95.17, 99.41, 100.16, 104.86, 104.6, 101.98, 102.65, 107.21, 107.79, 102.08, 101.21, 102.61, 99.86, 102.76, 102.77, 105.77, 102.03, 97.73, 100.09], spy: [100, 99.71, 98.13, 99.8, 100.34, 102.11, 102.11, 101.5, 100.24, 101.02, 100.7, 99.24, 99.19, 99.33, 98.62, 100.24, 100.24, 101.02, 100.88, 100.75, 101.49], top10Return: 3.1, spyReturn: 1.7, xLabels: ["Jun 8", "Jun 15", "Jun 22", "Jun 29", "Jul 6"] },
    'YTD': { top10: [100, 102.26, 104.35, 105.09, 104.21, 102.1, 102.57, 101.98, 103.51, 102.02, 102.81, 101.55, 92.02, 106.11, 114.2, 121.07, 120.49, 133.01, 138.23, 135.23, 148.18, 153.3, 144.4, 156.17, 145.75, 145.4], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 100.07, 100.65, 99.46, 98.11, 96.11, 92.68, 99.13, 102.64, 104.3, 104.35, 107.61, 108.86, 108.7, 110.66, 111.02, 108.19, 109.51, 106.9, 110.02], top10Return: 45.4, spyReturn: 10, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 100.71, 99.82, 104.17, 95.61, 99.9, 98.92, 101.4, 97.72, 99, 98.59, 97.77, 95.24, 102.01, 110.66, 114.47, 117.75, 124.81, 133.42, 129.52, 141.86, 146.76, 138.22, 149.44, 139.5, 139.23], spy: [100, 100.28, 99.07, 100.52, 99.19, 100.02, 98.94, 100.19, 99.03, 97.76, 95.61, 94.94, 94.71, 98.28, 101.42, 102.41, 103.88, 105.75, 108.15, 107.15, 109.08, 109.44, 106.64, 107.94, 105.37, 108.45], top10Return: 39.2, spyReturn: 8.4, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 100.72, 104.03, 106.22, 106.3, 107.71, 108.51, 106.8, 108.07, 111.09, 117.1, 121.24, 119.14, 124.44, 124.47, 124.35, 127.1, 131.05, 124.25, 120.54, 113.65, 121.85, 125.69, 119.37, 123.17, 122.87, 127.13, 127.76, 126.64, 132.45, 121.02, 127.1, 126.01, 127.61, 123.38, 122.57, 125.35, 124.64, 121.27, 130.22, 141.29, 146.3, 150.19, 159.69, 170.59, 169.89, 181.86, 187.88, 177.03, 191.61, 178.74, 178.12], spy: [100, 100.67, 101.3, 102.62, 101.69, 102.46, 103.67, 103.97, 103.93, 104.54, 106.48, 107.44, 106.93, 108.21, 106.82, 108.16, 109.11, 109.89, 108.1, 108.26, 106.18, 109.6, 110.14, 109.67, 110.34, 110.69, 111.46, 111.78, 110.43, 112.04, 110.55, 111.48, 110.28, 111.06, 109.77, 107.31, 106.57, 105.82, 105.57, 109.54, 113.05, 114.14, 115.79, 117.87, 120.54, 119.66, 121.58, 121.98, 118.86, 120.31, 117.45, 120.87], top10Return: 78.1, spyReturn: 20.9, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Semiconductors': {
    '1D': { top10: [100, 104.75, 105.31, 105.39, 106.14, 106.04, 106.08, 106.16, 105.81, 105.25, 104.95, 105.28, 105.46, 105.49, 105.48, 105.22, 105.09, 105.01, 104.72, 104.64, 104.44, 103.82, 103.55, 103.67], spy: [100, 100.47, 100.55, 100.48, 100.62, 100.69, 100.66, 100.67, 100.74, 100.72, 100.75, 100.78, 100.82, 100.81, 100.83, 100.82, 100.79, 100.8, 100.78, 100.89, 100.85, 100.79, 100.71, 100.73], top10Return: 3.7, spyReturn: 0.73, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 104.43, 96.93, 89.76, 93.01], spy: [100, 100.78, 100.64, 100.51, 101.25], top10Return: -7, spyReturn: 1.2, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.43, 95.13, 104.34, 105.85, 112.13, 112.13, 106.31, 107.45, 115.55, 119.41, 108.23, 107.6, 113.23, 107.04, 110.61, 110.61, 115.47, 107.01, 99.02, 102.64], spy: [100, 99.71, 98.13, 99.8, 100.34, 102.11, 102.11, 101.5, 100.24, 101.02, 100.7, 99.24, 99.19, 99.33, 98.62, 100.24, 100.24, 101.02, 100.88, 100.75, 101.49], top10Return: 8.8, spyReturn: 1.7, xLabels: ["Jun 8", "Jun 15", "Jun 22", "Jun 29", "Jul 6"] },
    'YTD': { top10: [100, 109.74, 113.64, 116.38, 117.24, 121.55, 123.01, 123.21, 125.24, 126.98, 131.62, 133.35, 123.59, 138.76, 147.63, 165.8, 175.61, 188.44, 190.41, 192.92, 210.54, 220.41, 209.19, 223.78, 213.25, 202.22], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 100.07, 100.65, 99.46, 98.11, 96.11, 92.68, 99.13, 102.64, 104.3, 104.35, 107.61, 108.86, 108.7, 110.66, 111.02, 108.19, 109.51, 106.9, 110.02], top10Return: 102.2, spyReturn: 10, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 104.95, 108.49, 111.57, 107.62, 116.39, 114.03, 118.03, 113.99, 120.82, 123.78, 128.18, 122.98, 132.05, 140.21, 158.06, 169.04, 174.54, 178.46, 180.67, 197.19, 206.64, 195.8, 209.27, 199.84, 189.08], spy: [100, 100.28, 99.07, 100.52, 99.19, 100.02, 98.94, 100.19, 99.03, 97.76, 95.61, 94.94, 94.71, 98.28, 101.42, 102.41, 103.88, 105.75, 108.15, 107.15, 109.08, 109.44, 106.64, 107.94, 105.37, 108.45], top10Return: 89.1, spyReturn: 8.4, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 102.47, 104.39, 106.52, 105.19, 106.54, 110.41, 111.22, 111.43, 112.87, 115.87, 121.92, 120.9, 128.04, 126.12, 131.06, 132.14, 136.68, 135.77, 134.69, 133.56, 143.03, 146.16, 144.58, 143.37, 141, 149.64, 152.22, 158.44, 167.1, 160.35, 172.2, 173.92, 176.19, 169.42, 163.16, 156.94, 164.61, 159.4, 178.58, 188.23, 203.69, 213.83, 230.53, 246.12, 236.05, 255.44, 257, 251.48, 261.55, 241.26, 241.33], spy: [100, 100.67, 101.3, 102.62, 101.69, 102.46, 103.67, 103.97, 103.93, 104.54, 106.48, 107.44, 106.93, 108.21, 106.82, 108.16, 109.11, 109.89, 108.1, 108.26, 106.18, 109.6, 110.14, 109.67, 110.34, 110.69, 111.46, 111.78, 110.43, 112.04, 110.55, 111.48, 110.28, 111.06, 109.77, 107.31, 106.57, 105.82, 105.57, 109.54, 113.05, 114.14, 115.79, 117.87, 120.54, 119.66, 121.58, 121.98, 118.86, 120.31, 117.45, 120.87], top10Return: 141.3, spyReturn: 20.9, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Broad Tech': {
    '1D': { top10: [100, 101.92, 102.63, 102.64, 102.77, 102.99, 102.99, 102.92, 102.84, 102.81, 102.78, 102.76, 102.8, 102.9, 102.87, 102.95, 102.86, 102.76, 102.63, 102.48, 102.47, 102.36, 101.93, 101.9], spy: [100, 100.47, 100.55, 100.48, 100.62, 100.69, 100.66, 100.67, 100.74, 100.72, 100.75, 100.78, 100.82, 100.81, 100.83, 100.82, 100.79, 100.8, 100.78, 100.89, 100.85, 100.79, 100.71, 100.73], top10Return: 2, spyReturn: 0.73, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 102.05, 99.46, 96.12, 97.99], spy: [100, 100.78, 100.64, 100.51, 101.25], top10Return: -2, spyReturn: 1.2, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.2, 95.84, 100.12, 100.58, 104.17, 104.17, 102.45, 102.08, 104.45, 104.18, 100.68, 99.59, 100.48, 99.49, 102, 102, 104.1, 101.42, 97.99, 99.91], spy: [100, 99.71, 98.13, 99.8, 100.34, 102.11, 102.11, 101.5, 100.24, 101.02, 100.7, 99.24, 99.19, 99.33, 98.62, 100.24, 100.24, 101.02, 100.88, 100.75, 101.49], top10Return: 1.7, spyReturn: 1.7, xLabels: ["Jun 8", "Jun 15", "Jun 22", "Jun 29", "Jul 6"] },
    'YTD': { top10: [100, 103.16, 105.13, 104.89, 102.07, 100.23, 102.1, 101.54, 104.62, 102.5, 102.21, 100.47, 94.09, 105.18, 111.24, 115.97, 114, 125.99, 125.72, 123.65, 130.61, 133.65, 127.55, 133.28, 128.36, 126.87], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 100.07, 100.65, 99.46, 98.11, 96.11, 92.68, 99.13, 102.64, 104.3, 104.35, 107.61, 108.86, 108.7, 110.66, 111.02, 108.19, 109.51, 106.9, 110.02], top10Return: 26.9, spyReturn: 10, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 100.86, 99.78, 101.84, 94.4, 97.27, 98.4, 100.37, 99.09, 98.47, 97.9, 96.47, 95.08, 100.43, 107.05, 109.76, 111.66, 118.41, 121.09, 118.16, 124.57, 127.49, 121.72, 127.02, 122.47, 121.26], spy: [100, 100.28, 99.07, 100.52, 99.19, 100.02, 98.94, 100.19, 99.03, 97.76, 95.61, 94.94, 94.71, 98.28, 101.42, 102.41, 103.88, 105.75, 108.15, 107.15, 109.08, 109.44, 106.64, 107.94, 105.37, 108.45], top10Return: 21.3, spyReturn: 8.4, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 100.5, 102.38, 103.46, 102.86, 102.59, 103.6, 103.72, 105.05, 105.96, 110.21, 114.93, 114.67, 117.8, 119.44, 118.76, 119.92, 120.72, 118.08, 111.87, 108.02, 114.14, 115.72, 111.55, 115.25, 113.3, 117.32, 118.97, 119.39, 122.03, 115.04, 117.94, 118.13, 120.22, 118.46, 117.03, 118.76, 118.62, 115.96, 121.25, 127.2, 129.95, 132.78, 137.91, 140.61, 140.61, 147.44, 148.94, 143.09, 150.72, 145.03, 141.97], spy: [100, 100.67, 101.3, 102.62, 101.69, 102.46, 103.67, 103.97, 103.93, 104.54, 106.48, 107.44, 106.93, 108.21, 106.82, 108.16, 109.11, 109.89, 108.1, 108.26, 106.18, 109.6, 110.14, 109.67, 110.34, 110.69, 111.46, 111.78, 110.43, 112.04, 110.55, 111.48, 110.28, 111.06, 109.77, 107.31, 106.57, 105.82, 105.57, 109.54, 113.05, 114.14, 115.79, 117.87, 120.54, 119.66, 121.58, 121.98, 118.86, 120.31, 117.45, 120.87], top10Return: 42, spyReturn: 20.9, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Electrification': {
    '1D': { top10: [100, 101.3, 102.11, 102.23, 102.39, 102.41, 102.43, 102.56, 102.54, 102.48, 102.48, 102.54, 102.37, 102.36, 102.41, 102.33, 102.28, 102.24, 102.09, 102.08, 102.06, 101.95, 101.87, 101.79], spy: [100, 100.47, 100.55, 100.48, 100.62, 100.69, 100.66, 100.67, 100.74, 100.72, 100.75, 100.78, 100.82, 100.81, 100.83, 100.82, 100.79, 100.8, 100.78, 100.89, 100.85, 100.79, 100.71, 100.73], top10Return: 1.8, spyReturn: 0.73, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 102.14, 99.21, 96.67, 98.39], spy: [100, 100.78, 100.64, 100.51, 101.25], top10Return: -1.6, spyReturn: 1.2, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.81, 95.62, 99.53, 100.47, 102.74, 102.74, 101.69, 101.65, 103.97, 105.09, 100.45, 99.76, 100.32, 97.54, 99.48, 99.48, 101.6, 98.66, 96.13, 97.8], spy: [100, 99.71, 98.13, 99.8, 100.34, 102.11, 102.11, 101.5, 100.24, 101.02, 100.7, 99.24, 99.19, 99.33, 98.62, 100.24, 100.24, 101.02, 100.88, 100.75, 101.49], top10Return: -2.1, spyReturn: 1.7, xLabels: ["Jun 8", "Jun 15", "Jun 22", "Jun 29", "Jul 6"] },
    'YTD': { top10: [100, 103.61, 108.25, 111.14, 110.46, 113.71, 114.8, 116.45, 117.59, 112.25, 114.18, 114.11, 108.85, 118.11, 122.45, 126.86, 128.5, 136.61, 136.01, 129.73, 138.65, 138.54, 130.06, 133.69, 126.08, 126.73], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 100.07, 100.65, 99.46, 98.11, 96.11, 92.68, 99.13, 102.64, 104.3, 104.35, 107.61, 108.86, 108.7, 110.66, 111.02, 108.19, 109.51, 106.9, 110.02], top10Return: 26.7, spyReturn: 10, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 102.1, 104.67, 107.9, 106.86, 111.31, 109.96, 113.94, 109.46, 108.78, 108.87, 111.37, 108.15, 114.07, 117.51, 122.05, 127.1, 128.04, 129.77, 123.92, 132.27, 132.21, 124.25, 127.65, 120.5, 121.11], spy: [100, 100.28, 99.07, 100.52, 99.19, 100.02, 98.94, 100.19, 99.03, 97.76, 95.61, 94.94, 94.71, 98.28, 101.42, 102.41, 103.88, 105.75, 108.15, 107.15, 109.08, 109.44, 106.64, 107.94, 105.37, 108.45], top10Return: 21.1, spyReturn: 8.4, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 101.91, 104.83, 106.61, 104.02, 104.56, 106.71, 108.04, 107.61, 108.77, 110.52, 113.76, 113.22, 119.38, 122.15, 123.21, 123.58, 124.88, 122.94, 121.06, 117.63, 122.35, 124.7, 122.32, 124.81, 123.19, 126.14, 128.66, 130.4, 133.64, 131.27, 133.26, 133.21, 136.01, 131.74, 132.6, 133.41, 136.04, 136.51, 142.46, 147.4, 148.37, 150.82, 155.97, 157.24, 154.49, 159.26, 160.15, 150.97, 153.06, 146.3, 145.95], spy: [100, 100.67, 101.3, 102.62, 101.69, 102.46, 103.67, 103.97, 103.93, 104.54, 106.48, 107.44, 106.93, 108.21, 106.82, 108.16, 109.11, 109.89, 108.1, 108.26, 106.18, 109.6, 110.14, 109.67, 110.34, 110.69, 111.46, 111.78, 110.43, 112.04, 110.55, 111.48, 110.28, 111.06, 109.77, 107.31, 106.57, 105.82, 105.57, 109.54, 113.05, 114.14, 115.79, 117.87, 120.54, 119.66, 121.58, 121.98, 118.86, 120.31, 117.45, 120.87], top10Return: 46, spyReturn: 20.9, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Industrials': {
    '1D': { top10: [100, 101.63, 102.16, 102.06, 102.04, 102.05, 102.12, 102.11, 102.12, 102.22, 102.17, 101.98, 102.01, 101.84, 101.86, 101.78, 101.75, 101.68, 101.62, 101.59, 101.57, 101.52, 101.44, 101.4], spy: [100, 100.47, 100.55, 100.48, 100.62, 100.69, 100.66, 100.67, 100.74, 100.72, 100.75, 100.78, 100.82, 100.81, 100.83, 100.82, 100.79, 100.8, 100.78, 100.89, 100.85, 100.79, 100.71, 100.73], top10Return: 0.9, spyReturn: 0.73, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 100.83, 100.09, 98.65, 99.67], spy: [100, 100.78, 100.64, 100.51, 101.25], top10Return: -0.3, spyReturn: 1.2, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 100.02, 98.28, 100.78, 101.22, 101.21, 100.36, 101.33, 101.24, 101.92, 102.6, 101.65, 101.55, 101.96, 101.03, 102.63, 102.03, 102.9, 102.09, 100.5, 101.55], spy: [100, 99.71, 98.13, 99.8, 100.34, 102.11, 102.11, 101.5, 100.24, 101.02, 100.7, 99.24, 99.19, 99.33, 98.62, 100.24, 100.24, 101.02, 100.88, 100.75, 101.49], top10Return: 1.4, spyReturn: 1.7, xLabels: ["Jun 8", "Jun 15", "Jun 22", "Jun 29", "Jul 6"] },
    'YTD': { top10: [100, 105.14, 110.48, 110.36, 109.83, 115.16, 118.01, 118.74, 119.88, 114.47, 112.58, 111.56, 106.64, 116.88, 119.72, 120, 118.22, 125.56, 124.38, 120.11, 126.14, 125.85, 123.12, 125.6, 125.42, 124.78], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 100.07, 100.65, 99.46, 98.11, 96.11, 92.68, 99.13, 102.64, 104.3, 104.35, 107.61, 108.86, 108.7, 110.66, 111.02, 108.19, 109.51, 106.9, 110.02], top10Return: 24.8, spyReturn: 10, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 103.09, 105.91, 105.8, 105.55, 111.07, 113.34, 113.87, 112.34, 108.54, 106.79, 107.99, 107.24, 111.82, 113.79, 115.05, 116.1, 117.02, 119.11, 114.39, 120.1, 119.86, 117.25, 119.59, 119.52, 118.86], spy: [100, 100.28, 99.07, 100.52, 99.19, 100.02, 98.94, 100.19, 99.03, 97.76, 95.61, 94.94, 94.71, 98.28, 101.42, 102.41, 103.88, 105.75, 108.15, 107.15, 109.08, 109.44, 106.64, 107.94, 105.37, 108.45], top10Return: 18.9, spyReturn: 8.4, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 101.55, 101.76, 104.07, 102.73, 103.13, 103.53, 104.81, 104.63, 105.56, 107.74, 109, 109.16, 111.92, 109.67, 110.61, 113.46, 112.93, 110.54, 107.6, 104.85, 107.47, 109.98, 110.98, 113.02, 111.41, 117.07, 120.91, 123.55, 123.5, 124.98, 130.1, 132.08, 131.8, 127.05, 123.71, 123.37, 126.06, 125.41, 131.3, 130.81, 133.43, 134.25, 137.15, 138.13, 133.9, 138.83, 139.24, 136.33, 139.18, 138.84, 138.09], spy: [100, 100.67, 101.3, 102.62, 101.69, 102.46, 103.67, 103.97, 103.93, 104.54, 106.48, 107.44, 106.93, 108.21, 106.82, 108.16, 109.11, 109.89, 108.1, 108.26, 106.18, 109.6, 110.14, 109.67, 110.34, 110.69, 111.46, 111.78, 110.43, 112.04, 110.55, 111.48, 110.28, 111.06, 109.77, 107.31, 106.57, 105.82, 105.57, 109.54, 113.05, 114.14, 115.79, 117.87, 120.54, 119.66, 121.58, 121.98, 118.86, 120.31, 117.45, 120.87], top10Return: 38.1, spyReturn: 20.9, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Meme': {
    '1D': { top10: [100, 101.42, 102.45, 103.11, 103.29, 103.34, 103.66, 103.75, 103.59, 103.63, 103.6, 103.17, 103.2, 103.1, 103.25, 103.5, 103.42, 103.46, 103.31, 103.09, 102.97, 102.73, 102.25, 101.72], spy: [100, 100.47, 100.55, 100.48, 100.62, 100.69, 100.66, 100.67, 100.74, 100.72, 100.75, 100.78, 100.82, 100.81, 100.83, 100.82, 100.79, 100.8, 100.78, 100.89, 100.85, 100.79, 100.71, 100.73], top10Return: 3, spyReturn: 0.73, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 102.08, 98.23, 93.11, 95.52], spy: [100, 100.78, 100.64, 100.51, 101.25], top10Return: -4.5, spyReturn: 1.2, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 96.44, 93.79, 99.87, 98.57, 104.08, 104.08, 99.99, 100.62, 104.2, 104.07, 99.23, 95.89, 95.4, 93.4, 97.45, 97.45, 99.47, 95.73, 90.74, 93.12], spy: [100, 99.71, 98.13, 99.8, 100.34, 102.11, 102.11, 101.5, 100.24, 101.02, 100.7, 99.24, 99.19, 99.33, 98.62, 100.24, 100.24, 101.02, 100.88, 100.75, 101.49], top10Return: -4.5, spyReturn: 1.7, xLabels: ["Jun 8", "Jun 15", "Jun 22", "Jun 29", "Jul 6"] },
    'YTD': { top10: [100, 108.03, 105.55, 106.35, 99.62, 96.61, 92.49, 93.37, 95.86, 92.23, 92.76, 92.76, 86.26, 98.8, 111.62, 113.88, 112.29, 124.96, 125.75, 126.77, 144.28, 136.93, 130.77, 133.59, 120.19, 118.24], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 100.07, 100.65, 99.46, 98.11, 96.11, 92.68, 99.13, 102.64, 104.3, 104.35, 107.61, 108.86, 108.7, 110.66, 111.02, 108.19, 109.51, 106.9, 110.02], top10Return: 18.3, spyReturn: 10, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 102.48, 96.84, 98.11, 88.02, 88.68, 86.42, 87.53, 87.83, 85.95, 84.23, 85.42, 83.17, 91.64, 103.95, 101.32, 106.01, 110.7, 114.98, 116.16, 131.48, 124.61, 119.58, 122.2, 110.3, 108.47], spy: [100, 100.28, 99.07, 100.52, 99.19, 100.02, 98.94, 100.19, 99.03, 97.76, 95.61, 94.94, 94.71, 98.28, 101.42, 102.41, 103.88, 105.75, 108.15, 107.15, 109.08, 109.44, 106.64, 107.94, 105.37, 108.45], top10Return: 8.5, spyReturn: 8.4, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 103.69, 101.29, 95.47, 92.15, 91.36, 89.96, 86.76, 84.54, 81.55, 87.46, 91.38, 90.76, 88.32, 90.7, 90.96, 88.16, 94.1, 90.52, 89.87, 84.82, 85.27, 86.78, 84.21, 86.51, 87.7, 91.17, 91.73, 90.86, 92.88, 88.06, 89.19, 90.63, 91.02, 93.01, 94.73, 98.13, 95.24, 95.34, 100.63, 107.89, 110.71, 107.37, 110.75, 117.29, 119.02, 115.4, 115.73, 110.09, 109.62, 106.38, 103.91], spy: [100, 100.67, 101.3, 102.62, 101.69, 102.46, 103.67, 103.97, 103.93, 104.54, 106.48, 107.44, 106.93, 108.21, 106.82, 108.16, 109.11, 109.89, 108.1, 108.26, 106.18, 109.6, 110.14, 109.67, 110.34, 110.69, 111.46, 111.78, 110.43, 112.04, 110.55, 111.48, 110.28, 111.06, 109.77, 107.31, 106.57, 105.82, 105.57, 109.54, 113.05, 114.14, 115.79, 117.87, 120.54, 119.66, 121.58, 121.98, 118.86, 120.31, 117.45, 120.87], top10Return: 3.9, spyReturn: 20.9, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
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
export const SCAN_TIMESTAMP    = '2026-07-06T17:46:57.440Z';
export const SCAN_TIMESTAMP_NY = 'July 6, 2026 at 1:46 PM ET';
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
export const HOLDINGS_COUNT = 1234;
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
  { ticker: 'MU', name: `MICRON TECHNOLOGY INC`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 12.74, bestProScore: 5.16, avgProScore: 4.25, price: 984.12, weeklyChange: -14.07 },
  { ticker: 'NVDA', name: `NVIDIA CORP`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 12.14, bestProScore: 5.89, avgProScore: 4.05, price: 195.80, weeklyChange: 0.43 },
  { ticker: 'AMD', name: `ADVANCED MICRO DEVICES INC`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 10.52, bestProScore: 4.97, avgProScore: 3.51, price: 553.24, weeklyChange: 2.55 },
  { ticker: 'AVGO', name: `BROADCOM INC`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 6.43, bestProScore: 2.76, avgProScore: 2.14, price: 374.25, weeklyChange: 0.48 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.73, bestProScore: 2.90, avgProScore: 2.37, price: 453.50, weeklyChange: -0.35 },
  { ticker: 'INTC', name: `INTEL CORPORATION`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.69, bestProScore: 3.46, avgProScore: 2.34, price: 122.57, weeklyChange: -6.95 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.12, bestProScore: 2.33, avgProScore: 2.06, price: 249.57, weeklyChange: -10.15 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 4.08, bestProScore: 2.16, avgProScore: 2.04, price: 249.81, weeklyChange: -11.13 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 3.83, bestProScore: 2.52, avgProScore: 1.92, price: 350.92, weeklyChange: -14.60 },
  { ticker: 'ALAB', name: `ASTERA LABS INC`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 3.31, bestProScore: 1.86, avgProScore: 1.66, price: 429.10, weeklyChange: -5.89 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': -6.2, '1M': 8.9, 'YTD': 104.2, '6M': 89.8, '1Y': 179.7 },
  ARTY: { '1W': -2.3, '1M': 2.5, 'YTD': 50.2, '6M': 42.1, '1Y': 76.9 },
  BAI:  { '1W': -5.1, '1M': 5.9, 'YTD': 44.8, '6M': 40, '1Y': 67.4 },
  IGPT: { '1W': -3.5, '1M': 7.5, 'YTD': 64.3, '6M': 55.6, '1Y': 101.7 },
  IVES: { '1W': 2.3, '1M': 2.2, 'YTD': 20.9, '6M': 16.7, '1Y': 41.2 },
  ALAI: { '1W': -0.3, '1M': 3.5, 'YTD': 24, '6M': 20.1, '1Y': 47 },
  CHAT: { '1W': -4.8, '1M': 0.2, 'YTD': 54.1, '6M': 48.3, '1Y': 88.9 },
  AIFD: { '1W': -1.1, '1M': 1.7, 'YTD': 41.1, '6M': 36.2, '1Y': 73.1 },
  SPRX: { '1W': -7.8, '1M': 0.5, 'YTD': 34.3, '6M': 26.7, '1Y': 74.2 },
  AOTG: { '1W': 4.1, '1M': -1.8, 'YTD': 16.2, '6M': 16.7, '1Y': 31.1 },
  // Semiconductors
  SOXX: { '1W': -5.1, '1M': 8, 'YTD': 93.6, '6M': 77.5, '1Y': 144.1 },
  PSI:  { '1W': -9.7, '1M': 10.8, 'YTD': 103.8, '6M': 82.7, '1Y': 165.6 },
  XSD:  { '1W': -2.9, '1M': 0.7, 'YTD': 78.9, '6M': 63.6, '1Y': 123.1 },
  DRAM: { '1W': -10.3, '1M': 15.7, 'YTD': 132.6, '6M': 132.6, '1Y': 132.6 },
  // Broad Tech
  PTF:  { '1W': -11.4, '1M': -4.2, 'YTD': 52.5, '6M': 42.2, '1Y': 71.5 },
  WCLD: { '1W': 8.6, '1M': 6.4, 'YTD': -2.2, '6M': -2.3, '1Y': -6.3 },
  IGV:  { '1W': 5.5, '1M': -1, 'YTD': -10.3, '6M': -9.6, '1Y': -14.3 },
  FDTX: { '1W': -3, '1M': 3.2, 'YTD': 34.9, '6M': 30.3, '1Y': 41.2 },
  GTEK: { '1W': -1.3, '1M': 6.2, 'YTD': 50.6, '6M': 43.7, '1Y': 67.3 },
  ARKK: { '1W': 3.5, '1M': 12, 'YTD': 8.5, '6M': 1.9, '1Y': 18.4 },
  MARS: { '1W': -0.5, '1M': -10.3, 'YTD': 24.6, '6M': 24.6, '1Y': 24.6 },
  FRWD: { '1W': -1.4, '1M': 5.1, 'YTD': 30.4, '6M': 30.4, '1Y': 30.4 },
  BCTK: { '1W': -0.3, '1M': 6.3, 'YTD': 25, '6M': 21.7, '1Y': 27.3 },
  FWD:  { '1W': -3.1, '1M': 3.7, 'YTD': 33.9, '6M': 25.6, '1Y': 57.3 },
  CBSE: { '1W': -1.3, '1M': 6, 'YTD': 29.1, '6M': 22.1, '1Y': 37.9 },
  FCUS: { '1W': -7.1, '1M': -5.3, 'YTD': 29.8, '6M': 18.1, '1Y': 57.1 },
  WGMI: { '1W': -11.1, '1M': -8, 'YTD': 48, '6M': 25.9, '1Y': 127.6 },
  CNEQ: { '1W': -0.8, '1M': 3, 'YTD': 17.1, '6M': 14, '1Y': 38.1 },
  SGRT: { '1W': -5.3, '1M': 0.4, 'YTD': 37.9, '6M': 31.6, '1Y': 72.5 },
  SPMO: { '1W': -3.6, '1M': 5.9, 'YTD': 28.1, '6M': 26.3, '1Y': 36.4 },
  XMMO: { '1W': -1.7, '1M': 0, 'YTD': 18.9, '6M': 15.1, '1Y': 26.8 },
  // Electrification
  POW:  { '1W': -4, '1M': 0.5, 'YTD': 48.1, '6M': 41.3, '1Y': 43.7 },
  VOLT: { '1W': -2.5, '1M': 3.5, 'YTD': 37.4, '6M': 32.3, '1Y': 55.1 },
  PBD:  { '1W': 1.5, '1M': -6, 'YTD': 21.3, '6M': 16.3, '1Y': 50.7 },
  PBW:  { '1W': -1.5, '1M': -8, 'YTD': 22.8, '6M': 11.6, '1Y': 76.2 },
  IVEP: { '1W': -1.5, '1M': -0.3, 'YTD': 4.1, '6M': 4.1, '1Y': 4.1 },
  // Industrials
  AIRR: { '1W': -3.6, '1M': -0.9, 'YTD': 29, '6M': 20, '1Y': 51.7 },
  PRN:  { '1W': -6.3, '1M': 1.4, 'YTD': 37.1, '6M': 29, '1Y': 51.7 },
  RSHO: { '1W': 1.2, '1M': 4.4, 'YTD': 39.4, '6M': 36.1, '1Y': 54.8 },
  IDEF: { '1W': 7.2, '1M': 5, 'YTD': 8.9, '6M': 0.2, '1Y': 19.5 },
  BILT: { '1W': -0.2, '1M': -2.9, 'YTD': 9.5, '6M': 9, '1Y': 12.8 },
  // Meme
  BUZZ: { '1W': 0.7, '1M': -0.1, 'YTD': 13.4, '6M': 6.5, '1Y': 21.3 },
  MEME: { '1W': -8.7, '1M': -13, 'YTD': 38.1, '6M': 15.7, '1Y': -12.8 },
  RKNG: { '1W': -5.4, '1M': -0.4, 'YTD': 3.3, '6M': 3.3, '1Y': 3.3 },
};
// @@END_GENERATED:ETF_RETURNS@@

// @@GENERATED:ETF_DAY_CHANGE@@
// Today's % move per ETF ticker (1D, vs prior close). Refreshed by the 3×/day
// price jobs. Powers the 1D ranking in the theme-ETF side panel.
export const ETF_DAY_CHANGE: Record<string, number> = {
  AIS:  3.91,
  ARTY: 1.8,
  BAI:  2.6,
  IGPT: 2.57,
  IVES: 2.48,
  ALAI: 2.74,
  CHAT: 2.31,
  AIFD: 2.57,
  SPRX: 1.86,
  SOXX: 2.93,
  PSI:  1.72,
  XSD:  3.53,
  DRAM: 6.48,
  PTF:  2.63,
  WCLD: 2.18,
  IGV:  1.37,
  FDTX: 2.02,
  GTEK: 0.99,
  ARKK: 2.68,
  MARS: -1.58,
  FRWD: 2.52,
  BCTK: 3.19,
  FWD:  1.68,
  CBSE: 1.17,
  FCUS: 2.69,
  WGMI: 6.49,
  CNEQ: 1.41,
  SGRT: 2.53,
  SPMO: 1.35,
  XMMO: 0.91,
  POW:  0.71,
  VOLT: 1.48,
  PBD:  2.42,
  PBW:  2.54,
  IVEP: 1.7,
  AIRR: 0.76,
  PRN:  1.76,
  IDEF: 1.67,
  BILT: -0.63,
  BUZZ: 1.4,
  MEME: 2.03,
  RKNG: 5.71,
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
  'AI & ML': { etfs: ['AIS', 'IVES', 'SPRX'], series: { '1W': [100, 103.08, 98.51, 93.56, 96.12], '1M': [100, 97.63, 94.68, 100.72, 101.51, 106.39, 106.39, 102.67, 103.45, 107.99, 109.23, 102.62, 101.42, 103.4, 100.7, 104.7, 104.7, 107.97, 103.06, 97.77, 100.48], 'YTD': [100, 103.29, 107, 107.92, 106.62, 105.08, 104.9, 104.22, 106.52, 104.11, 105.72, 103.8, 92.21, 108.21, 116, 124.4, 122.1, 135.51, 143.6, 141.42, 157.86, 162.54, 153.45, 165.78, 154.46, 153.11], '6M': [100, 101.54, 101.42, 106.06, 95.46, 101.03, 99.66, 102.47, 99.21, 99.58, 99.07, 98.92, 94.44, 102.1, 111, 115.72, 117.84, 124.13, 137.25, 133.45, 148.9, 153.31, 144.71, 156.26, 145.6, 144.41], '1Y': [100, 100.33, 104.67, 107.08, 107.31, 109.42, 109.73, 107.95, 109.79, 113.59, 121.67, 127.81, 125.15, 132.78, 133.77, 132.48, 135.8, 140.27, 132.53, 126.5, 118.02, 127.89, 132.97, 123.64, 130.39, 129.24, 135.28, 137.33, 137.46, 143.77, 129.5, 137.33, 135.45, 137.88, 132.48, 131.26, 134.76, 134.71, 128.53, 139.33, 151.39, 158.15, 161.33, 169.88, 188.26, 188.46, 204.44, 210.58, 198.92, 215.37, 200.56, 198.37] }, returns: { '1W': -3.9, '1M': 0.5, 'YTD': 53.1, '6M': 44.4, '1Y': 98.4 } },
  'Semiconductors': { etfs: ['DRAM', 'PSI', 'XSD'], series: { '1W': [100, 104.47, 96.7, 88.95, 92.39], '1M': [100, 98.45, 95.25, 104.89, 106.35, 112.85, 112.85, 107.27, 108.29, 116.76, 121, 109.12, 108.37, 114.5, 108.31, 111.64, 111.64, 116.58, 107.7, 99, 102.85], 'YTD': [100, 110.95, 114.2, 117.01, 117.99, 123.49, 124.76, 124.78, 128.03, 132.08, 138.09, 140.55, 130.5, 144.02, 152.35, 173.28, 184.34, 195.15, 195.41, 199.64, 217.68, 227.16, 213.95, 227.6, 219.04, 205.11], '6M': [100, 106.1, 109.31, 112.17, 109.95, 118.61, 115.92, 120.01, 117.32, 126.37, 130.7, 135.86, 129.6, 137.62, 145.74, 165.98, 178.54, 182.74, 184.14, 188.08, 205.11, 214.33, 201.48, 214.11, 206.57, 192.93], '1Y': [100, 102.59, 104.72, 107.72, 106.7, 108.21, 112.55, 113.52, 114.33, 115.75, 118.5, 124.89, 123.66, 130.47, 128.39, 133.85, 134.89, 139.44, 139.92, 139.3, 140.27, 149.26, 151.22, 151.17, 148.74, 145.43, 153.69, 156.44, 162.65, 172.48, 167.68, 179.32, 182.21, 185.11, 178.74, 171.46, 162.04, 171.28, 165.27, 185.25, 194.3, 210.03, 220.69, 238.64, 254.17, 241.48, 261.09, 258.52, 253.37, 259.47, 239.33, 240.41] }, returns: { '1W': -7.6, '1M': 2.8, 'YTD': 105.1, '6M': 92.9, '1Y': 140.4 } },
  'Broad Tech': { etfs: ['WGMI', 'PTF', 'SGRT'], series: { '1W': [100, 101.84, 95.51, 87.35, 90.75], '1M': [100, 97.26, 93.98, 100.29, 102.56, 107.08, 107.08, 105.13, 105.28, 108.9, 110.17, 105.27, 102.31, 103.97, 101.38, 102.25, 102.25, 104.21, 97.75, 89.41, 92.83], 'YTD': [100, 107.37, 113.44, 114.56, 110.78, 110.24, 111.62, 112.5, 115.89, 107.44, 110.92, 110.02, 97.79, 118.42, 126.67, 134.16, 127.7, 152.7, 152.99, 146.88, 165.77, 168.59, 158.45, 172.38, 160.16, 146.14], '6M': [100, 103.81, 103.99, 108.21, 97.08, 103, 102.73, 107.73, 103.75, 100.58, 101.11, 102.87, 96.99, 109.73, 116.64, 122.75, 122.18, 133.14, 141.8, 133.84, 150.67, 153.31, 144.19, 156.66, 145.67, 133.21], '1Y': [100, 101.55, 104.13, 105.24, 104.91, 104.93, 107.54, 110.69, 115.89, 114.57, 128.59, 139.7, 139.36, 150.26, 160.79, 157.07, 158.02, 157.66, 154.81, 130.91, 126.76, 143.24, 144.53, 130.99, 139.69, 133.51, 145.54, 150.27, 152.09, 158.41, 142.97, 146.89, 144.58, 147, 142.74, 137.31, 142.55, 149.78, 142.72, 156.27, 167.72, 175.71, 177.5, 194.39, 199.91, 203.2, 219.66, 215.76, 210.64, 227.82, 210.51, 190.51] }, returns: { '1W': -9.3, '1M': -7.2, 'YTD': 46.1, '6M': 33.2, '1Y': 90.5 } },
  'Electrification': { etfs: ['PBW', 'VOLT', 'POW'], series: { '1W': [100, 102.44, 99.22, 95.81, 97.33], '1M': [100, 98.75, 95.48, 99.9, 100.73, 103.46, 103.46, 102.3, 102.41, 104.83, 105.96, 101.15, 100.38, 101.18, 98.21, 100.64, 100.64, 103.1, 99.83, 96.42, 97.91], 'YTD': [100, 104.13, 109.93, 112.37, 112.23, 115.87, 118.59, 119.33, 120.87, 114.8, 116.56, 116.34, 110.84, 122.19, 127.41, 134.02, 135.5, 147.78, 147.19, 138.43, 148.98, 148.05, 138.91, 145.74, 136.54, 136.1], '6M': [100, 102.01, 104.93, 108.18, 107.02, 112.86, 111.86, 115.75, 110.28, 109.96, 109.54, 112.8, 109.78, 116.88, 120.61, 127.99, 133.8, 135.94, 138.67, 130.5, 140.26, 139.39, 130.96, 137.4, 128.85, 128.39], '1Y': [100, 102.13, 105.44, 107.09, 104.24, 104.43, 106.42, 107.88, 107.95, 108.29, 110.45, 114.92, 115.08, 122.12, 125.24, 126.25, 126.47, 127.86, 125.67, 123.67, 119.92, 126.22, 129.16, 126.44, 130.99, 128.84, 130.95, 133.96, 135.26, 139.37, 136.48, 139.35, 138.67, 142.66, 138.78, 140.83, 141.9, 146.93, 146.71, 154.41, 159.43, 160.14, 161.77, 167.29, 170.22, 166.66, 171.48, 174.72, 164.23, 168.32, 161.13, 158.33] }, returns: { '1W': -2.7, '1M': -2.1, 'YTD': 36.1, '6M': 28.4, '1Y': 58.3 } },
  'Industrials': { etfs: ['RSHO', 'PRN', 'BILT'], series: { '1W': [100, 100.45, 99.89, 97.38, 98.25], '1M': [100, 100.21, 99.15, 100.32, 101.32, 100.74, 99.31, 100.76, 100.83, 102.1, 103.27, 102.85, 102.85, 103.04, 102.34, 104.16, 103.16, 103.68, 103.04, 100.32, 101.26], 'YTD': [100, 102.86, 107.52, 107.45, 108.27, 114.39, 118.7, 119.06, 119.49, 113.34, 111.96, 111.58, 107.84, 116.62, 120.71, 121, 120.71, 127.83, 127.82, 122.66, 128.76, 129.56, 126.16, 129.98, 131.56, 128.67], '6M': [100, 102.13, 104.98, 105.46, 106.18, 112.77, 115.25, 116.82, 113.73, 110.21, 108.27, 110.16, 109.5, 113.92, 117.09, 118.72, 120.15, 121.51, 124.44, 118.89, 124.75, 125.53, 122.25, 125.86, 127.46, 124.69], '1Y': [100, 101.47, 101.87, 104.27, 102.27, 102.42, 102.27, 103.66, 103.27, 104.2, 106, 106.53, 106.53, 108.57, 106.59, 107.81, 110.8, 110.03, 108.82, 105.87, 103.47, 105.93, 108.08, 108.75, 110.56, 109.12, 113.22, 115.92, 118.02, 118.75, 122.57, 127.83, 129.57, 129.41, 124.52, 121, 119.97, 124.26, 123.9, 129.71, 128.75, 132.45, 133.42, 137.99, 138.93, 134.9, 138.49, 140.55, 137.07, 141.41, 142.93, 139.74] }, returns: { '1W': -1.8, '1M': 1.3, 'YTD': 28.7, '6M': 24.7, '1Y': 39.7 } },
  'Meme': { etfs: ['BUZZ', 'RKNG', 'MEME'], series: { '1W': [100, 102.08, 98.23, 93.11, 95.52], '1M': [100, 96.44, 93.79, 99.87, 98.57, 104.08, 104.08, 99.99, 100.62, 104.2, 104.07, 99.23, 95.89, 95.4, 93.4, 97.45, 97.45, 99.47, 95.73, 90.74, 93.12], 'YTD': [100, 108.03, 105.55, 106.35, 99.62, 96.61, 92.49, 93.37, 95.86, 92.23, 92.76, 92.76, 86.26, 98.8, 111.62, 113.88, 112.29, 124.96, 125.75, 126.77, 144.28, 136.93, 130.77, 133.59, 120.19, 118.24], '6M': [100, 102.48, 96.84, 98.11, 88.02, 88.68, 86.42, 87.53, 87.83, 85.95, 84.23, 85.42, 83.17, 91.64, 103.95, 101.32, 106.01, 110.7, 114.98, 116.16, 131.48, 124.61, 119.58, 122.2, 110.3, 108.47], '1Y': [100, 103.69, 101.29, 95.47, 92.15, 91.36, 89.96, 86.76, 84.54, 81.55, 87.46, 91.38, 90.76, 88.32, 90.7, 90.96, 88.16, 94.1, 90.52, 89.87, 84.82, 85.27, 86.78, 84.21, 86.51, 87.7, 91.17, 91.73, 90.86, 92.88, 88.06, 89.19, 90.63, 91.02, 93.01, 94.73, 98.13, 95.24, 95.34, 100.63, 107.89, 110.71, 107.37, 110.75, 117.29, 119.02, 115.4, 115.73, 110.09, 109.62, 106.38, 103.91] }, returns: { '1W': -4.5, '1M': -6.9, 'YTD': 18.2, '6M': 8.5, '1Y': 3.9 } },
};
// @@END_GENERATED:THEME_REPRESENTATIVES@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVDA', easyScore: 9, avgWeight: 6.55, proScore: 5.89, coverage: 0.9,
      price: 195.8, weeklyPrices: [194.97, 200.09, 197.58, 194.83, 195.80], weeklyChange: 0.43, dayChange: 0.5, sortRank: 0, periodReturns: { '1M': -4.5, 'YTD': 5, '6M': 4.6, '1Y': 23.7 },
      priceHistory: { '1D': [194.83, 195.43, 195.97, 196.26, 196.6, 196.52, 196.23, 196.07, 196.02, 195.85, 195.96, 196.29, 196.2, 196.19, 196.74, 197.14, 197, 196.84, 196.42, 196.54, 196.51, 196.05, 195.9, 195.8], '1W': [194.97, 200.09, 197.58, 194.83, 195.8], '1M': [208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83, 195.8], 'YTD': [186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 223.47, 214.25, 218.66, 204.87, 210.69, 192.53, 195.8], '6M': [187.24, 185.81, 183.32, 191.52, 174.19, 190.05, 187.9, 195.56, 183.04, 186.03, 180.4, 178.68, 175.75, 183.91, 198.35, 199.64, 199.57, 211.5, 235.74, 223.47, 214.25, 218.66, 204.87, 210.69, 192.53, 195.8], '1Y': [158.24, 164.07, 171.38, 176.75, 180, 182.06, 180.45, 177.99, 174.18, 168.31, 177.75, 183.61, 181.85, 185.54, 188.32, 182.64, 186.26, 202.49, 188.15, 190.17, 178.88, 179.92, 185.55, 176.29, 183.69, 187.54, 187.24, 185.81, 183.32, 191.52, 174.19, 190.05, 187.9, 184.89, 183.34, 183.14, 180.4, 178.68, 175.75, 183.91, 198.35, 199.64, 199.57, 211.5, 235.74, 219.51, 214.25, 218.66, 204.87, 210.69, 192.53, 195.8] },
      velocityScore: { '1D': null, '1W': -3.1, '1M': 5.9, '6M': null }, isNew: false,
      marketCap: '$4.7T', pe: 30, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.51,
      etfPresence: { AIS: 2.36, ARTY: 4.52, BAI: 4.14, IGPT: 7.65, IVES: 4.69, ALAI: 12.35, CHAT: 6.98, AIFD: 6.28, SPRX: false, AOTG: 9.98 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 9, avgWeight: 5.73, proScore: 5.16, coverage: 0.9,
      price: 984.12, weeklyPrices: [1145.28, 1154.29, 1032.28, 975.56, 984.12], weeklyChange: -14.07, dayChange: 0.88, sortRank: 0, periodReturns: { '1M': 13.9, 'YTD': 244.8, '6M': 186.6, '1Y': 720.6 },
      priceHistory: { '1D': [975.56, 1000.9, 1000.6, 995.49, 1013, 1009.19, 1010.41, 1013.69, 1011.49, 998.81, 1001.29, 1003.76, 1007, 1007.79, 1012.44, 1008.1, 1003.08, 1002.2, 1002.58, 998.7, 999.5, 992.04, 986.78, 984.12], '1W': [1145.28, 1154.29, 1032.28, 975.56, 984.12], '1M': [949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.12], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 923.52, 996, 995.87, 1133.99, 1132.33, 984.12], '6M': [343.43, 338.13, 389.11, 435.28, 379.4, 410.34, 417.35, 429, 400.77, 418.69, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 517.16, 646.63, 776.01, 731.99, 923.52, 996, 995.87, 1133.99, 1132.33, 984.12], '1Y': [119.92, 118.61, 113.23, 111.25, 107.77, 123.72, 120.87, 117.68, 119.01, 131.46, 157.77, 164.62, 163.9, 190.96, 192.77, 206.77, 219.02, 223.77, 237.92, 246.83, 207.37, 240.46, 246.92, 237.5, 276.59, 292.63, 343.43, 338.13, 389.11, 435.28, 379.4, 410.34, 417.35, 415.56, 397.05, 405.35, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 517.16, 646.63, 776.01, 762.1, 923.52, 996, 995.87, 1133.99, 1132.33, 984.12] },
      velocityScore: { '1D': null, '1W': -14, '1M': -9.5, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 22.3, revenueGrowth: 346, eps: 44.19, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { AIS: 6.72, ARTY: 4.84, BAI: 6.18, IGPT: 7.88, IVES: 4.61, ALAI: 1.3, CHAT: 3.64, AIFD: 6.53, SPRX: false, AOTG: 9.89 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'AMD', easyScore: 9, avgWeight: 5.52, proScore: 4.97, coverage: 0.9,
      price: 553.24, weeklyPrices: [539.49, 580.91, 540.88, 517.82, 553.24], weeklyChange: 2.55, dayChange: 6.84, sortRank: 0, periodReturns: { '1M': 18.6, 'YTD': 158.3, '6M': 158.1, '1Y': 310.4 },
      priceHistory: { '1D': [517.82, 547.32, 560.48, 562.69, 568.4, 568.23, 567.65, 569.9, 566.95, 566.09, 563.99, 568.76, 567.05, 566.06, 563.38, 562.45, 562.84, 559.55, 557.9, 558.24, 557.75, 555.22, 554.08, 553.24], '1W': [539.49, 580.91, 540.88, 517.82, 553.24], '1M': [490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 553.24], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 518.09, 523.2, 488.45, 537.37, 521.58, 553.24], '6M': [214.35, 220.97, 249.8, 252.74, 200.19, 213.58, 203.37, 210.86, 202.07, 204.83, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 354.49, 408.46, 449.7, 447.58, 518.09, 523.2, 488.45, 537.37, 521.58, 553.24], '1Y': [134.8, 146.24, 157, 173.66, 176.78, 172.28, 177.51, 167.76, 162.63, 151.41, 161.16, 159.79, 161.36, 203.71, 216.42, 240.56, 252.92, 256.12, 233.54, 246.81, 203.78, 219.76, 221.11, 207.58, 214.95, 215.34, 214.35, 220.97, 249.8, 252.74, 200.19, 213.58, 203.37, 203.68, 199.45, 197.74, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 354.49, 408.46, 449.7, 449.59, 518.09, 523.2, 488.45, 537.37, 521.58, 553.24] },
      velocityScore: { '1D': null, '1W': -1, '1M': 4.6, '6M': null }, isNew: false,
      marketCap: '$902B', pe: 184.4, revenueGrowth: 38, eps: 3, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.89, ARTY: 4.96, BAI: 4.99, IGPT: 8.53, IVES: 4.65, ALAI: 1.25, CHAT: 3.86, AIFD: false, SPRX: 0.64, AOTG: 15.95 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 7, avgWeight: 3.94, proScore: 2.76, coverage: 0.7,
      price: 374.25, weeklyPrices: [372.45, 377.75, 369.34, 360.45, 374.25], weeklyChange: 0.48, dayChange: 3.83, sortRank: 0, periodReturns: { '1M': -3, 'YTD': 8.1, '6M': 8.9, '1Y': 36.5 },
      priceHistory: { '1D': [360.45, 383.01, 380.01, 380.4, 380.64, 379.67, 378.14, 377.71, 375.3, 374.96, 373.45, 373.6, 373.85, 374.55, 374.91, 375.31, 375.15, 375.1, 375.4, 376.01, 376.39, 376.74, 375.08, 374.25], '1W': [372.45, 377.75, 369.34, 360.45, 374.25], '1M': [396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45, 374.25], 'YTD': [346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 417.76, 426.58, 418.91, 385.57, 411.35, 365.02, 374.25], '6M': [343.77, 354.61, 328.8, 333.24, 308.05, 342.76, 333.99, 332.31, 317.53, 341.57, 315.93, 318.81, 313.49, 354.91, 398.47, 419.94, 417.43, 412.56, 439.79, 417.76, 426.58, 418.91, 385.57, 411.35, 365.02, 374.25], '1Y': [274.18, 275.6, 288.21, 294.3, 297.72, 303.9, 306.34, 294, 297.39, 345.65, 364.09, 338.79, 327.9, 335.49, 356.7, 349.24, 354.13, 369.63, 349.43, 342.46, 340.2, 386.08, 401.1, 339.81, 341.45, 349.85, 343.77, 354.61, 328.8, 333.24, 308.05, 342.76, 333.99, 321.7, 332.77, 335.97, 315.93, 318.81, 313.49, 354.91, 398.47, 419.94, 417.43, 412.56, 439.79, 414.57, 426.58, 418.91, 385.57, 411.35, 365.02, 374.25] },
      velocityScore: { '1D': null, '1W': -1.8, '1M': 6.2, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 62.2, revenueGrowth: 48, eps: 6.02, grossMargin: 76, dividendYield: 0.72,
      etfPresence: { AIS: false, ARTY: 4.31, BAI: 4.11, IGPT: false, IVES: 4.46, ALAI: 3.73, CHAT: 4.39, AIFD: 5.17, SPRX: false, AOTG: 1.4 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MRVL', easyScore: 7, avgWeight: 3.33, proScore: 2.33, coverage: 0.7,
      price: 249.57, weeklyPrices: [277.75, 297.89, 272.05, 245.29, 249.57], weeklyChange: -10.15, dayChange: 1.74, sortRank: 0, periodReturns: { '1M': -5.3, 'YTD': 193.7, '6M': 182.9, '1Y': 248.8 },
      priceHistory: { '1D': [245.29, 254.84, 255.9, 255.71, 259.8, 257.57, 258.82, 258.88, 256.52, 255.43, 255.1, 256.38, 255.91, 255.35, 256.54, 255.71, 255.57, 254.8, 253.52, 252.53, 252.81, 252.07, 250.3, 249.57], '1W': [277.75, 297.89, 272.05, 245.29, 249.57], '1M': [288.85, 266.88, 252.59, 280.71, 279.7, 308.88, 278.67, 289.54, 310.58, 307.86, 279.04, 276.7, 281.26, 266.77, 277.75, 297.89, 272.05, 245.29, 249.57], 'YTD': [84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 114.45, 134.6, 157.32, 156.57, 172.15, 177.95, 186.8, 204.83, 316.43, 280.71, 310.58, 266.77, 249.57], '6M': [88.23, 83.05, 82.55, 83.62, 73.73, 81.34, 79.61, 80.92, 78.09, 90.44, 87.62, 98.45, 106.71, 119.93, 133.37, 165.56, 165.15, 160.01, 182.58, 186.8, 204.83, 316.43, 280.71, 310.58, 266.77, 249.57], '1Y': [71.55, 72.51, 73.06, 75.91, 76.53, 77.28, 76.19, 73, 62.87, 66, 67.43, 75.53, 82.39, 88.92, 89.39, 85.84, 84.13, 93.74, 90.92, 86.45, 77.45, 91.1, 92, 84.26, 84.8, 86.76, 88.23, 83.05, 82.55, 83.62, 73.73, 81.34, 79.61, 79.29, 75.68, 87.67, 87.62, 98.45, 106.71, 119.93, 133.37, 165.56, 165.15, 160.01, 182.58, 190.69, 204.83, 316.43, 280.71, 310.58, 266.77, 249.57] },
      velocityScore: { '1D': null, '1W': -7.2, '1M': -12.1, '6M': null }, isNew: false,
      marketCap: '$218B', pe: 85.5, revenueGrowth: 28, eps: 2.92, grossMargin: 52, dividendYield: 0.1,
      etfPresence: { AIS: 3.94, ARTY: 3.97, BAI: 1.83, IGPT: 3.3, IVES: false, ALAI: false, CHAT: 1.51, AIFD: 5.51, SPRX: 3.26, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 5.16, proScore: 3.1, coverage: 0.6,
      price: 364.42, weeklyPrices: [353.65, 357.37, 361.21, 359.91, 364.42], weeklyChange: 3.05, dayChange: 1.25, sortRank: 0, periodReturns: { '1M': -1.1, 'YTD': 16.4, '6M': 15.9, '1Y': 106.1 },
      priceHistory: { '1D': [359.91, 360.89, 358.01, 358.05, 359.7, 359.93, 361.34, 361.74, 361.56, 362.46, 362.8, 363.12, 363.42, 363.42, 364.04, 364.73, 363.68, 363.96, 364.42, 364.42, 364.79, 364.22, 364.88, 364.42], '1W': [353.65, 357.37, 361.21, 359.91, 364.42], '1M': [363.31, 364.26, 356.38, 357.77, 359.68, 369.35, 373.25, 363.79, 368.03, 349.68, 346.13, 345.29, 343.71, 337.39, 353.65, 357.37, 361.21, 359.91, 364.42], 'YTD': [313, 325.44, 332.78, 327.93, 338, 322.86, 305.72, 311.49, 306.52, 306.36, 305.56, 302.06, 273.5, 317.32, 337.12, 339.32, 349.94, 398.04, 402.62, 388.91, 390.13, 372.19, 357.77, 368.03, 337.39, 364.42], '6M': [314.34, 335.97, 328.38, 336.01, 333.04, 310.96, 302.85, 312.9, 303.13, 308.7, 307.69, 290.93, 297.39, 318.49, 336.02, 338.89, 384.8, 397.99, 401.07, 388.91, 390.13, 372.19, 357.77, 368.03, 337.39, 364.42], '1Y': [176.79, 181.56, 190.1, 192.58, 195.04, 201, 203.9, 206.09, 212.91, 234.04, 251.61, 252.53, 244.05, 250.43, 244.15, 256.55, 259.92, 281.19, 278.83, 276.41, 299.66, 314.89, 313.72, 308.22, 309.78, 313.85, 314.34, 335.97, 328.38, 336.01, 333.04, 310.96, 302.85, 307.38, 300.88, 303.55, 307.69, 290.93, 297.39, 318.49, 336.02, 338.89, 384.8, 397.99, 401.07, 387.66, 390.13, 372.19, 357.77, 368.03, 337.39, 364.42] },
      velocityScore: { '1D': null, '1W': 8.4, '1M': 22.5, '6M': null }, isNew: false,
      marketCap: '$4.4T', pe: 27.8, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.29, IGPT: 8.09, IVES: 4.76, ALAI: false, CHAT: 5.65, AIFD: 5.15, SPRX: false, AOTG: 4.02 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'TSM', name: 'TSM', easyScore: 6, avgWeight: 4.84, proScore: 2.9, coverage: 0.6,
      price: 453.5, weeklyPrices: [455.10, 477.57, 444.23, 434.16, 453.50], weeklyChange: -0.35, dayChange: 4.45, sortRank: 0, periodReturns: { '1M': 9.2, 'YTD': 49.2, '6M': 38.5, '1Y': 97.9 },
      priceHistory: { '1D': [434.16, 455.56, 455.2, 454.35, 459.18, 458.81, 457.49, 456.69, 456.5, 455.6, 455.56, 458.29, 458.11, 457.11, 459.04, 458.08, 456.83, 456.28, 455.15, 455.82, 456.36, 455.49, 454.29, 453.5], '1W': [455.1, 477.57, 444.23, 434.16, 453.5], '1M': [426.8, 427.92, 408.75, 421.07, 423.93, 441.4, 425.83, 432.15, 462.12, 467.67, 436.39, 440.83, 434.99, 432.35, 455.1, 477.57, 444.23, 434.16, 453.5], 'YTD': [303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 370.04, 369.11, 348.7, 340.23, 338.45, 316.5, 365.9, 375.1, 387.44, 393.83, 419.5, 399.8, 401.62, 424.86, 444.92, 421.07, 462.12, 432.35, 453.5], '6M': [327.43, 331.21, 326.12, 342.3, 325.74, 374.09, 360.39, 387.73, 357.44, 354.56, 339.57, 347.75, 341.49, 365.49, 363.35, 382.66, 396.06, 414.15, 417.72, 401.62, 424.86, 444.92, 421.07, 462.12, 432.35, 453.5], '1Y': [229.17, 228.67, 238.85, 242.75, 239, 242.09, 238.88, 232.99, 230.87, 247.19, 261.38, 272.63, 273.23, 302.4, 302.89, 297.7, 294.96, 300.43, 286.5, 284.82, 275.06, 287.68, 301.87, 287.74, 293.28, 299.58, 327.43, 331.21, 326.12, 342.3, 325.74, 374.09, 360.39, 376.81, 353.86, 336.71, 339.57, 347.75, 341.49, 365.49, 363.35, 382.66, 396.06, 414.15, 417.72, 407.15, 424.86, 444.92, 421.07, 462.12, 432.35, 453.5] },
      velocityScore: { '1D': null, '1W': 13.3, '1M': 12.4, '6M': null }, isNew: false,
      marketCap: '$2.4T', pe: 39.4, revenueGrowth: 35, eps: 11.51, grossMargin: 62, dividendYield: 0.88,
      etfPresence: { AIS: 3.26, ARTY: false, BAI: 4.56, IGPT: false, IVES: 4.88, ALAI: 5.63, CHAT: false, AIFD: 3.42, SPRX: false, AOTG: 7.27 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 5, avgWeight: 4.08, proScore: 2.04, coverage: 0.5,
      price: 594, weeklyPrices: [562.60, 563.29, 612.91, 582.90, 594.00], weeklyChange: 5.58, dayChange: 1.9, sortRank: 0, periodReturns: { '1M': 0.2, 'YTD': -10, '6M': -10.1, '1Y': -17.3 },
      priceHistory: { '1D': [582.9, 585.87, 585.93, 585.72, 587.16, 587, 587.29, 588.36, 588.52, 589.07, 590.86, 591.53, 592.33, 592.14, 592.64, 595.47, 592.44, 592.22, 591.98, 592.75, 594.41, 594.76, 593.59, 594], '1W': [562.6, 563.29, 612.91, 582.9, 594], '1M': [585.39, 584.59, 570.98, 568.43, 566.98, 593.48, 600.21, 567.58, 577.22, 563.85, 562.2, 557.67, 542.87, 550.25, 562.6, 563.29, 612.91, 582.9, 594], 'YTD': [660.09, 646.06, 620.8, 658.76, 716.5, 661.46, 639.77, 637.25, 653.56, 647.39, 627.45, 604.06, 536.38, 612.42, 671.58, 674.72, 669.12, 612.88, 616.63, 605.06, 635.29, 627.57, 568.43, 577.22, 550.25, 594], '6M': [660.62, 631.09, 612.96, 668.73, 668.99, 668.69, 644.78, 653.69, 667.73, 654.86, 615.68, 594.89, 579.23, 628.39, 676.87, 659.15, 611.91, 616.81, 618.43, 605.06, 635.29, 627.57, 568.43, 577.22, 550.25, 594], '1Y': [718.35, 720.92, 712.97, 717.63, 776.37, 765.87, 785.23, 754.79, 738.7, 752.3, 764.7, 765.16, 743.4, 715.66, 715.7, 732.17, 738.36, 648.35, 621.71, 609.46, 594.25, 640.87, 666.8, 647.51, 661.5, 665.95, 660.62, 631.09, 612.96, 668.73, 668.99, 668.69, 644.78, 657.01, 660.57, 638.18, 615.68, 594.89, 579.23, 628.39, 676.87, 659.15, 611.91, 616.81, 618.43, 607.38, 635.29, 627.57, 568.43, 577.22, 550.25, 594] },
      velocityScore: { '1D': null, '1W': 6.3, '1M': 29.9, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 21.6, revenueGrowth: 33, eps: 27.51, grossMargin: 82, dividendYield: 0.36,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: 8.25, IVES: 4.79, ALAI: 4.08, CHAT: 2.16, AIFD: false, SPRX: false, AOTG: 1.13 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 5, avgWeight: 4.04, proScore: 2.02, coverage: 0.5,
      price: 245.35, weeklyPrices: [240.14, 238.34, 241.70, 242.67, 245.35], weeklyChange: 2.17, dayChange: 1.1, sortRank: 0, periodReturns: { '1M': -0.3, 'YTD': 6.3, '6M': 1.8, '1Y': 9.8 },
      priceHistory: { '1D': [242.67, 241.98, 241.58, 241.88, 242.7, 242.93, 243.26, 243.04, 242.68, 243.98, 244.49, 244.68, 245.47, 245.28, 245.6, 245.66, 244.82, 244.71, 244.65, 244.82, 245.22, 245.15, 245.59, 245.35], '1W': [240.14, 238.34, 241.7, 242.67, 245.35], '1M': [245.22, 244.19, 238, 241.51, 238.55, 246.02, 246, 237.5, 244.39, 232.79, 234.11, 234.27, 227.01, 232.69, 240.14, 238.34, 241.7, 242.67, 245.35], 'YTD': [230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 198.79, 205.27, 208.39, 213.49, 211.74, 210.14, 200.95, 221.25, 248.5, 255.36, 263.04, 274.99, 270.13, 265.01, 274, 253.79, 241.51, 244.39, 232.69, 245.35], '6M': [240.93, 242.6, 231.31, 243.01, 232.99, 204.08, 204.86, 210.64, 216.82, 212.65, 209.87, 211.71, 210.57, 233.65, 249.7, 255.08, 265.06, 271.17, 267.22, 265.01, 274, 253.79, 241.51, 244.39, 232.69, 245.35], '1Y': [223.47, 225.69, 229.3, 232.79, 211.65, 221.3, 231.03, 228.84, 229, 235.84, 231.43, 227.63, 222.17, 220.9, 220.07, 216.48, 224.21, 244.22, 244.41, 234.69, 220.69, 233.88, 226.89, 222.54, 228.43, 232.53, 240.93, 242.6, 231.31, 243.01, 232.99, 204.08, 204.86, 207.92, 218.94, 209.53, 209.87, 211.71, 210.57, 233.65, 249.7, 255.08, 265.06, 271.17, 267.22, 268.46, 274, 253.79, 241.51, 244.39, 232.69, 245.35] },
      velocityScore: { '1D': null, '1W': 1.5, '1M': 8, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 32, revenueGrowth: 17, eps: 7.67, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 4.86, ALAI: 5.15, CHAT: 2.58, AIFD: 3.55, SPRX: false, AOTG: 4.08 },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.74, proScore: 1.87, coverage: 0.5,
      price: 385.23, weeklyPrices: [368.57, 373.02, 384.28, 390.49, 385.23], weeklyChange: 4.52, dayChange: -1.35, sortRank: 0, periodReturns: { '1M': -7.5, 'YTD': -20.3, '6M': -19.5, '1Y': -22.6 },
      priceHistory: { '1D': [390.49, 382.22, 383.93, 383.58, 383.66, 383.79, 383.19, 384.7, 385.23, 385.43, 386.23, 386.6, 386.58, 386.44, 385.71, 384.05, 384.03, 384.51, 384.95, 385.9, 385.77, 385.47, 385.38, 385.23], '1W': [368.57, 373.02, 384.28, 390.49, 385.23], '1M': [411.74, 403.41, 397.36, 390.34, 390.74, 399.76, 393.83, 378.91, 379.4, 367.34, 373.94, 365.46, 352.83, 372.97, 368.57, 373.02, 384.28, 390.49, 385.23], 'YTD': [483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 384.47, 398.55, 409.41, 399.95, 383, 358.96, 374.33, 411.22, 432.92, 424.46, 413.96, 405.21, 421.06, 426.99, 428.05, 390.34, 379.4, 372.97, 385.23], '6M': [478.51, 470.67, 444.11, 481.63, 414.19, 404.37, 398.46, 400.6, 405.2, 404.88, 391.79, 371.04, 369.37, 373.07, 420.26, 415.75, 407.78, 420.77, 409.43, 421.06, 426.99, 428.05, 390.34, 379.4, 372.97, 385.23], '1Y': [497.72, 503.02, 510.06, 512.5, 535.64, 521.77, 520.17, 507.23, 506.69, 498.2, 515.36, 514.45, 514.6, 528.57, 514.05, 516.79, 523.61, 517.81, 496.82, 510.18, 472.12, 486.74, 491.02, 474.82, 484.92, 487.48, 478.51, 470.67, 444.11, 481.63, 414.19, 404.37, 398.46, 401.72, 410.68, 401.86, 391.79, 371.04, 369.37, 373.07, 420.26, 415.75, 407.78, 420.77, 409.43, 419.09, 426.99, 428.05, 390.34, 379.4, 372.97, 385.23] },
      velocityScore: { '1D': null, '1W': 5.6, '1M': 11.3, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 22.9, revenueGrowth: 18, eps: 16.79, grossMargin: 68, dividendYield: 0.93,
      etfPresence: { AIS: false, ARTY: 2.64, BAI: false, IGPT: false, IVES: 4.82, ALAI: 5.24, CHAT: 2.44, AIFD: false, SPRX: false, AOTG: 3.58 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'ALAB', name: 'ALAB', easyScore: 5, avgWeight: 3.73, proScore: 1.86, coverage: 0.5,
      price: 429.1, weeklyPrices: [455.96, 483.02, 430.86, 406.42, 429.10], weeklyChange: -5.89, dayChange: 5.58, sortRank: 0, periodReturns: { '1M': 35.3, 'YTD': 157.9, '6M': 166.5, '1Y': 378.8 },
      priceHistory: { '1D': [406.42, 438.29, 451.63, 449.14, 449.1, 448.55, 447.62, 449.65, 439.36, 440.15, 440.92, 441.51, 442.56, 442.42, 446.38, 446.54, 446.32, 444.43, 439.89, 438.9, 438.96, 436.34, 430.63, 429.1], '1W': [455.96, 483.02, 430.86, 406.42, 429.1], '1M': [346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86, 406.42, 429.1], 'YTD': [166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 125.46, 172.09, 194.06, 196.85, 213.91, 224.09, 287.48, 349.17, 358.05, 367.47, 417.07, 391.74, 429.1], '6M': [161.01, 180.56, 176.01, 167.9, 144.67, 143.71, 132.62, 128.15, 113.77, 124.71, 126.34, 120.33, 106.33, 129.46, 170.81, 197.54, 194.74, 195.65, 228.64, 287.48, 349.17, 358.05, 367.47, 417.07, 391.74, 429.1], '1Y': [89.62, 90.32, 121.89, 124.05, 137.93, 179.43, 185.85, 179.09, 182.2, 216.1, 231.29, 237.3, 198.8, 220.81, 199.53, 156.31, 164.97, 186.68, 165.49, 144.34, 141.8, 165.19, 175.74, 143.66, 172.62, 170.84, 161.01, 180.56, 176.01, 167.9, 144.67, 143.71, 132.62, 124.67, 120, 119.9, 126.34, 120.33, 106.33, 129.46, 170.81, 197.54, 194.74, 195.65, 228.64, 297.84, 349.17, 358.05, 367.47, 417.07, 391.74, 429.1] },
      velocityScore: { '1D': null, '1W': 8.8, '1M': 26.5, '6M': null }, isNew: false,
      marketCap: '$74B', pe: 293.9, revenueGrowth: 93, eps: 1.46, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 2.21, ARTY: 1.42, BAI: false, IGPT: false, IVES: false, ALAI: 0.99, CHAT: 2.45, AIFD: false, SPRX: 11.58, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'ANET', name: 'ARISTA NETWORKS INC', easyScore: 5, avgWeight: 2.57, proScore: 1.28, coverage: 0.5,
      price: 171.36, weeklyPrices: [164.10, 169.88, 166.62, 159.99, 171.36], weeklyChange: 4.42, dayChange: 7.11, sortRank: 0, periodReturns: { '1M': 11.1, 'YTD': 30.8, '6M': 29.3, '1Y': 68.9 },
      priceHistory: { '1D': [159.99, 166.14, 171.36, 170.59, 173.43, 173.81, 175.26, 176.11, 175.2, 174.32, 175.5, 174.73, 173.42, 173.63, 173.55, 173.3, 172.69, 172.92, 172.03, 172.34, 172.71, 172.38, 171.51, 171.36], '1W': [164.1, 169.88, 166.62, 159.99, 171.36], '1M': [156.4, 152.16, 151.76, 156.4, 163.24, 169.09, 168.01, 164.93, 169.67, 174.56, 162.2, 161.74, 165.45, 157.6, 164.1, 169.88, 166.62, 159.99, 171.36], 'YTD': [131.03, 123.72, 130.59, 136.34, 141.74, 137.49, 141.59, 127.43, 129.3, 137.17, 135.35, 135.88, 116.13, 145.07, 154.33, 177.73, 168.68, 147.06, 140.69, 140.49, 155.27, 166.01, 156.4, 169.67, 157.6, 171.36], '6M': [132.58, 129.93, 127.29, 150.15, 130.28, 140.66, 137.23, 132.89, 134.83, 138.23, 136.07, 135.01, 124.85, 146.05, 161.01, 172.55, 172.71, 141.75, 147.81, 140.49, 155.27, 166.01, 156.4, 169.67, 157.6, 171.36], '1Y': [101.47, 108.37, 111.61, 117.55, 120.35, 137.65, 137.3, 133.25, 136.55, 140.01, 145.43, 145.4, 143.37, 149.5, 147.45, 146.48, 153.82, 157.69, 134.65, 131.37, 117.43, 128.11, 129.11, 125.89, 130.73, 132.44, 132.58, 129.93, 127.29, 150.15, 130.28, 140.66, 137.23, 130.25, 139.4, 134.03, 136.07, 135.01, 124.85, 146.05, 161.01, 172.55, 172.71, 141.75, 147.81, 148.59, 155.27, 166.01, 156.4, 169.67, 157.6, 171.36] },
      velocityScore: { '1D': null, '1W': -8.6, '1M': -12.9, '6M': null }, isNew: false,
      marketCap: '$216B', pe: 58.9, revenueGrowth: 35, eps: 2.91, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: false, ARTY: 2.43, BAI: 1.34, IGPT: false, IVES: false, ALAI: false, CHAT: 2.12, AIFD: 4.95, SPRX: 2.01, AOTG: false },
      tonyNote: 'ARISTA NETWORKS INC appears in 5 of 10 AI & ML ETFs (50% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 5, avgWeight: 2.52, proScore: 1.26, coverage: 0.5,
      price: 731, weeklyPrices: [851.40, 858.06, 801.16, 728.32, 731.00], weeklyChange: -14.14, dayChange: 0.37, sortRank: 0, periodReturns: { '1M': -15.4, 'YTD': 98.3, '6M': 83.9, '1Y': 702.6 },
      priceHistory: { '1D': [728.32, 729.25, 738.02, 733.74, 739.08, 740.66, 742.91, 742.74, 736, 733.66, 735.83, 738.04, 737.9, 734.09, 735.92, 736.68, 732.52, 730.32, 724.11, 727.48, 739.34, 735.72, 732.9, 731], '1W': [851.4, 858.06, 801.16, 728.32, 731], '1M': [895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93, 827.92, 842.53, 861.97, 816.98, 851.4, 858.06, 801.16, 728.32, 731], 'YTD': [368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 896.02, 824.01, 873.6, 858.32, 944.28, 1030.37, 868.07, 860.62, 945.08, 889.59, 850, 816.98, 731], '6M': [397.42, 361.33, 362.44, 385, 465.54, 574.11, 635.64, 723.39, 680.8, 672, 700.81, 777.17, 764.65, 894.13, 891.22, 846.89, 902.32, 892.58, 1001.81, 868.07, 860.62, 945.08, 889.59, 850, 816.98, 731], '1Y': [91.08, 92.24, 103.84, 107.17, 111.13, 115.03, 115.86, 119.34, 132.81, 149.4, 168.77, 164.71, 162.58, 160.6, 160.56, 161, 179.3, 201.56, 240.11, 232.15, 255.59, 317.93, 342.56, 334.69, 389.88, 371.18, 397.42, 361.33, 362.44, 385, 465.54, 574.11, 635.64, 677, 650.82, 616.09, 700.81, 777.17, 764.65, 894.13, 891.22, 846.89, 902.32, 892.58, 1001.81, 964.5, 860.62, 945.08, 889.59, 850, 816.98, 731] },
      velocityScore: { '1D': null, '1W': -7.4, '1M': -0.8, '6M': null }, isNew: false,
      marketCap: '$57B', pe: 128.7, revenueGrowth: 90, eps: 5.68, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.35, IGPT: false, IVES: false, ALAI: 0.86, CHAT: 1.43, AIFD: 4.21, SPRX: 3.75, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 5 of 10 AI & ML ETFs (50% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 5, avgWeight: 2.25, proScore: 1.12, coverage: 0.5,
      price: 1720.96, weeklyPrices: [2050.39, 2273.73, 2032.22, 1745.00, 1720.96], weeklyChange: -16.07, dayChange: -1.38, sortRank: 0, periodReturns: { '1M': 10.4, 'YTD': 625, '6M': 392.2, '1Y': 3705.7 },
      priceHistory: { '1D': [1745, 1792.39, 1806.57, 1798.93, 1804.02, 1805.09, 1823.31, 1831.37, 1817.74, 1793.34, 1804.03, 1801.85, 1809.67, 1809.29, 1814.36, 1802.51, 1789.49, 1786.42, 1775.34, 1758, 1762, 1738, 1721.99, 1720.96], '1W': [2050.39, 2273.73, 2032.22, 1745, 1720.96], '1M': [1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 1745, 1720.96], 'YTD': [237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1447.23, 1392.56, 1641.64, 1759.68, 1881.51, 2184.75, 2090.71, 1720.96], '6M': [349.63, 389.81, 501.29, 527.63, 584.55, 599.34, 621.09, 632.38, 599.06, 655.43, 753.69, 677.86, 692.73, 851.57, 919.47, 932.43, 1096.51, 1339.96, 1382.72, 1392.56, 1641.64, 1759.68, 1881.51, 2184.75, 2090.71, 1720.96], '1Y': [45.22, 42.48, 41.61, 41.89, 42.51, 43.37, 44.54, 46.37, 52.47, 70.5, 90.09, 102.92, 113.5, 121.17, 134.61, 148.04, 186.16, 199.33, 239.48, 254.16, 200.27, 210.17, 225.47, 201.87, 241.05, 240.22, 349.63, 389.81, 501.29, 527.63, 584.55, 599.34, 621.09, 651.9, 565.59, 618.82, 753.69, 677.86, 692.73, 851.57, 919.47, 932.43, 1096.51, 1339.96, 1382.72, 1542.24, 1641.64, 1759.68, 1881.51, 2184.75, 2090.71, 1720.96] },
      velocityScore: { '1D': null, '1W': -13.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$255B', pe: 58.7, revenueGrowth: 251, eps: 29.32, grossMargin: 56, dividendYield: null,
      etfPresence: { AIS: 2.28, ARTY: false, BAI: 2.84, IGPT: 3.98, IVES: false, ALAI: 0.5, CHAT: false, AIFD: false, SPRX: false, AOTG: 1.64 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'ARM', name: 'ARM', easyScore: 4, avgWeight: 3.15, proScore: 1.26, coverage: 0.4,
      price: 321.97, weeklyPrices: [343.58, 354.57, 337.47, 315.28, 321.97], weeklyChange: -6.29, dayChange: 2.12, sortRank: 0, periodReturns: { '1M': -6.1, 'YTD': 194.5, '6M': 178.7, '1Y': 119.2 },
      priceHistory: { '1D': [315.28, 333.12, 335.03, 330.63, 332.66, 331.02, 332.18, 331.33, 331, 329, 328.6, 328.64, 326.57, 326.45, 326.54, 327.06, 327.18, 327.04, 325.06, 324.3, 326.49, 324.96, 323.34, 321.97], '1W': [343.58, 354.57, 337.47, 315.28, 321.97], '1M': [346.39, 324.86, 307.43, 342.23, 380.81, 412.55, 396.34, 418.88, 439.46, 407.72, 366.39, 359.08, 347.71, 334.27, 343.58, 354.57, 337.47, 315.28, 321.97], 'YTD': [109.31, 113.08, 105.11, 116.07, 105.36, 123.7, 125.28, 123.78, 124.37, 117.63, 121.7, 136.89, 136.96, 148.91, 159.34, 196.57, 201.69, 237.3, 221.21, 256.73, 335.27, 393.44, 342.23, 439.46, 334.27, 321.97], '6M': [115.53, 107.84, 113.92, 109.96, 104.9, 125.28, 126.93, 131.74, 124.11, 120.1, 128.36, 157.07, 155.07, 149.79, 162.33, 204.61, 210.32, 213.31, 228.5, 256.73, 335.27, 393.44, 342.23, 439.46, 334.27, 321.97], '1Y': [146.88, 144.54, 161.92, 164.37, 140.05, 141.05, 138.91, 137.92, 138.31, 139.14, 153.86, 144.48, 139.8, 156.22, 171.94, 171.5, 170.68, 169.82, 152.38, 139.77, 131.57, 135.01, 139.78, 124.37, 113.29, 110.86, 115.53, 107.84, 113.92, 109.96, 104.9, 125.28, 126.93, 129.26, 120.62, 115.12, 128.36, 157.07, 155.07, 149.79, 162.33, 204.61, 210.32, 213.31, 228.5, 298.23, 335.27, 393.44, 342.23, 439.46, 334.27, 321.97] },
      velocityScore: { '1D': null, '1W': 4.1, '1M': -10.6, '6M': null }, isNew: false,
      marketCap: '$344B', pe: 378.8, revenueGrowth: 20, eps: 0.85, grossMargin: 98, dividendYield: null,
      etfPresence: { AIS: 1.85, ARTY: false, BAI: false, IGPT: false, IVES: false, ALAI: 0.16, CHAT: 2.59, AIFD: false, SPRX: 8.02, AOTG: false },
      tonyNote: 'Arm Holdings is held across Broad Tech and AI ETFs as the CPU architecture licensor embedded in every mobile device and increasingly in AI inference chips and data center CPUs. Revenue grew and the royalty model is high-margin; the weight score reflects consistent institutional positioning as the AI chip design ecosystem expands on Arm cores.',
    },
    {
      ticker: 'INTC', name: 'INTC', easyScore: 4, avgWeight: 3.08, proScore: 1.23, coverage: 0.4,
      price: 122.57, weeklyPrices: [131.72, 139.63, 127.02, 120.35, 122.57], weeklyChange: -6.95, dayChange: 1.84, sortRank: 0, periodReturns: { '1M': 23.6, 'YTD': 232.2, '6M': 206.1, '1Y': 457.1 },
      priceHistory: { '1D': [120.35, 125.83, 126.43, 125.51, 126.72, 126.8, 126.24, 126.75, 126.2, 125.29, 124.59, 125.05, 124.71, 124.39, 124.16, 124.4, 124.84, 124.28, 124.01, 124.24, 124.27, 123.45, 123.04, 122.57], '1W': [131.72, 139.63, 127.02, 120.35, 122.57], '1M': [110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 127.02, 120.35, 122.57], 'YTD': [36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 43.63, 45.5, 45.58, 45.76, 44.01, 41.19, 58.95, 64.94, 65.27, 94.75, 113.01, 120.29, 118.96, 120.89, 111.78, 116.96, 133.99, 128.32, 122.57], '6M': [40.04, 47.29, 54.25, 48.78, 48.6, 48.29, 44.62, 46.88, 45.58, 47.98, 45.03, 47.18, 48.03, 61.72, 68.5, 66.78, 94.48, 109.62, 115.93, 118.96, 120.89, 111.78, 116.96, 133.99, 128.32, 122.57], '1Y': [22, 23.3, 23.26, 20.68, 19.5, 20.65, 24.56, 24.8, 24.35, 24.48, 24.77, 28.76, 34.48, 36.59, 37.22, 38.1, 38.28, 39.99, 38.13, 35.52, 34.5, 40.01, 40.3, 37.51, 36.37, 37.3, 40.04, 47.29, 54.25, 48.78, 48.6, 48.29, 44.62, 45.46, 45.95, 45.25, 45.03, 47.18, 48.03, 61.72, 68.5, 66.78, 94.48, 109.62, 115.93, 118.5, 120.89, 111.78, 116.96, 133.99, 128.32, 122.57] },
      velocityScore: { '1D': null, '1W': -3.9, '1M': 11.8, '6M': null }, isNew: false,
      marketCap: '$616B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.44, ARTY: false, BAI: 3.11, IGPT: 4.66, IVES: false, ALAI: false, CHAT: 1.13, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'VRT', name: 'VRT', easyScore: 4, avgWeight: 2.89, proScore: 1.16, coverage: 0.4,
      price: 321.98, weeklyPrices: [306.97, 334.82, 311.42, 300.53, 321.98], weeklyChange: 4.89, dayChange: 7.14, sortRank: 0, periodReturns: { '1M': 7.1, 'YTD': 98.7, '6M': 84, '1Y': 155 },
      priceHistory: { '1D': [300.53, 322.24, 325.51, 323.24, 326.53, 328.32, 326.58, 327.76, 326.34, 325.81, 326.24, 326.26, 324.82, 324.7, 324.13, 323.14, 323.53, 322.25, 320.79, 320.69, 321.01, 320.55, 321.76, 321.98], '1W': [306.97, 334.82, 311.42, 300.53, 321.98], '1M': [300.57, 289.52, 280.98, 297.88, 302.87, 311.93, 299.6, 317.58, 333.05, 357.96, 318.32, 316.43, 325.57, 303.95, 306.97, 334.82, 311.42, 300.53, 321.98], 'YTD': [162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 234.53, 245.42, 257.75, 264.35, 264.74, 256, 234.22, 281.03, 301.16, 305.14, 306.18, 358.92, 369.99, 315.67, 314.18, 323.92, 297.88, 333.05, 303.95, 321.98], '6M': [174.95, 172.72, 181.47, 193.76, 182.56, 248.51, 243.06, 262.19, 251.28, 268.26, 264.71, 276.16, 259.37, 287.64, 294.13, 321.75, 328.49, 340.01, 376.23, 315.67, 314.18, 323.92, 297.88, 333.05, 303.95, 321.98], '1Y': [126.26, 124.72, 126.21, 142.55, 140.2, 139.83, 133.07, 125.97, 127.55, 121.82, 138.26, 151.96, 143.31, 162.8, 179, 175.73, 186.06, 192.86, 179.8, 170.97, 159.83, 179.22, 185.61, 161.74, 166.25, 164.34, 174.95, 172.72, 181.47, 193.76, 182.56, 248.51, 243.06, 259.23, 249.75, 265.38, 264.71, 276.16, 259.37, 287.64, 294.13, 321.75, 328.49, 340.01, 376.23, 323.4, 314.18, 323.92, 297.88, 333.05, 303.95, 321.98] },
      velocityScore: { '1D': null, '1W': 0.9, '1M': -12.8, '6M': null }, isNew: false,
      marketCap: '$124B', pe: 81.1, revenueGrowth: 30, eps: 3.97, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 3.53, ARTY: false, BAI: 1.86, IGPT: false, IVES: false, ALAI: false, CHAT: 2.17, AIFD: 4.02, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 4, avgWeight: 2.52, proScore: 1.01, coverage: 0.4,
      price: 414.48, weeklyPrices: [411.84, 420.60, 425.30, 393.45, 414.48], weeklyChange: 0.64, dayChange: 5.35, sortRank: 0, periodReturns: { '1M': 6, 'YTD': -7.8, '6M': -4.3, '1Y': 41 },
      priceHistory: { '1D': [393.45, 392.66, 401.36, 402.25, 403.7, 405.31, 404.88, 403.8, 407.57, 409.88, 410.38, 412.57, 412.52, 413.22, 416.51, 417.92, 416.71, 417.58, 417.7, 418.97, 418.05, 417.72, 415.36, 414.48], '1W': [411.84, 420.6, 425.3, 393.45, 414.48], '1M': [408.95, 396.68, 381.59, 399.15, 406.43, 411.15, 404.66, 396.38, 400.49, 405.05, 381.61, 375.53, 375.12, 379.71, 411.84, 420.6, 425.3, 393.45, 414.48], 'YTD': [449.72, 435.8, 438.57, 449.06, 430.41, 411.11, 417.44, 399.83, 403.32, 398.68, 395.56, 380.85, 355.28, 343.25, 391.95, 387.51, 372.8, 398.73, 445.27, 417.26, 442.1, 418.45, 399.15, 400.49, 379.71, 414.48], '6M': [432.96, 447.2, 431.44, 431.46, 406.01, 428.27, 411.71, 417.4, 405.94, 407.82, 392.78, 385.95, 381.26, 345.62, 388.9, 373.72, 381.63, 411.79, 443.3, 417.26, 442.1, 418.45, 399.15, 400.49, 379.71, 414.48], '1Y': [293.94, 316.9, 328.49, 325.59, 309.26, 339.03, 330.56, 340.01, 333.87, 346.4, 410.04, 434.21, 443.21, 453.25, 435.9, 447.43, 433.72, 456.56, 429.52, 404.35, 391.09, 430.14, 439.58, 475.31, 488.73, 454.43, 432.96, 447.2, 431.44, 431.46, 406.01, 428.27, 411.71, 408.58, 405.55, 395.01, 392.78, 385.95, 381.26, 345.62, 388.9, 373.72, 381.63, 411.79, 443.3, 417.85, 442.1, 418.45, 399.15, 400.49, 379.71, 414.48] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$1.6T', pe: 376.8, revenueGrowth: 16, eps: 1.1, grossMargin: 19, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 0.94, IGPT: false, IVES: 4.5, ALAI: 2.69, CHAT: false, AIFD: 1.93, SPRX: false, AOTG: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 4, avgWeight: 2.51, proScore: 1, coverage: 0.4,
      price: 144.14, weeklyPrices: [147.76, 146.55, 142.50, 140.27, 144.14], weeklyChange: -2.45, dayChange: 2.76, sortRank: 0, periodReturns: { '1M': -32.5, 'YTD': -26, '6M': -25.6, '1Y': -37.9 },
      priceHistory: { '1D': [140.27, 142.53, 142.59, 141.58, 141.63, 142.27, 142.36, 142.51, 141.98, 142.03, 142.6, 142.67, 142.82, 142.75, 143.08, 142.93, 143.42, 143.77, 143.87, 144.32, 144.71, 144.28, 144.18, 144.14], '1W': [147.76, 146.55, 142.5, 140.27, 144.14], '1M': [211.82, 205.81, 201.26, 184.1, 184.13, 192.64, 188.33, 183.53, 184.29, 175.07, 165.16, 157.53, 152.46, 148.53, 147.76, 146.55, 142.5, 140.27, 144.14], 'YTD': [194.91, 189.65, 189.85, 177.16, 164.58, 142.82, 160.14, 141.31, 149.25, 151.56, 155.97, 154.34, 138.8, 143.66, 169.81, 187.5, 163.83, 194.03, 189.76, 188.16, 203.7, 236.34, 184.1, 184.29, 148.53, 144.14], '6M': [193.75, 202.29, 173.88, 172.8, 146.67, 157.16, 156.54, 147.89, 152.37, 163.12, 152.9, 146.02, 145.23, 137.86, 178.34, 176.28, 161.39, 194.59, 195.61, 188.16, 203.7, 236.34, 184.1, 184.29, 148.53, 144.14], '1Y': [232.26, 229.28, 243.54, 247.71, 252.53, 252.68, 248.28, 236.37, 226.13, 238.48, 302.14, 328.15, 282.76, 291.59, 308.01, 277.18, 283.33, 262.61, 239.26, 222.85, 198.76, 200.94, 220.54, 184.92, 198.38, 197.21, 193.75, 202.29, 173.88, 172.8, 146.67, 157.16, 156.54, 150.31, 154.79, 159.16, 152.9, 146.02, 145.23, 137.86, 178.34, 176.28, 161.39, 194.59, 195.61, 189.77, 203.7, 236.34, 184.1, 184.29, 148.53, 144.14] },
      velocityScore: { '1D': null, '1W': null, '1M': -20.6, '6M': null }, isNew: true,
      marketCap: '$415B', pe: 24.7, revenueGrowth: 21, eps: 5.84, grossMargin: 66, dividendYield: 1.43,
      etfPresence: { AIS: false, ARTY: 3.1, BAI: false, IGPT: false, IVES: 2.91, ALAI: false, CHAT: 1.94, AIFD: false, SPRX: false, AOTG: 2.1 },
      tonyNote: 'Oracle lands in 3 AI ETFs on the strength of its cloud database and AI infrastructure contracts. Revenue grew 22%, 67% gross margin, P/E of 40x. The 17.5% weekly return following a major earnings beat shows how quickly sentiment can reprice; the weight score at 2.04% is still modest, meaning ETF managers have started building positions but conviction is not yet deep.',
    },
    {
      ticker: 'CRWV', name: 'COREWEAVE INC CLASS A', easyScore: 4, avgWeight: 2.32, proScore: 0.93, coverage: 0.4,
      price: 86.17, weeklyPrices: [95.51, 99.54, 85.68, 81.75, 86.17], weeklyChange: -9.78, dayChange: 5.41, sortRank: 0, periodReturns: { '1M': -14.2, 'YTD': 20.3, '6M': 10.6, '1Y': -46 },
      priceHistory: { '1D': [81.75, 84.1, 86.25, 85.49, 86.07, 86.3, 85.93, 85.96, 85.88, 85.73, 85.88, 86.07, 86.09, 86.9, 86.87, 87.02, 87.03, 87.21, 86.82, 86.79, 87.04, 86.64, 86.75, 86.17], '1W': [95.51, 99.54, 85.68, 81.75, 86.17], '1M': [102.37, 98.45, 95.61, 95.74, 100.55, 106.71, 117.03, 115.21, 117.95, 111.29, 105.72, 100.88, 98.76, 96.58, 95.51, 99.54, 85.68, 81.75, 86.17], 'YTD': [71.61, 77.09, 95.01, 92.98, 93.19, 89.95, 96.04, 90.84, 78.05, 74.41, 85.86, 81.96, 69.15, 88.9, 118.69, 122.54, 114.19, 137.98, 111.31, 101.28, 106.86, 108.03, 95.74, 117.95, 96.58, 86.17], '6M': [77.94, 87.48, 94.05, 106.02, 82.46, 95.15, 97.14, 98.01, 79.5, 81.96, 82.82, 87.58, 78.44, 92, 119.56, 117.42, 111.6, 128.84, 114.21, 101.28, 106.86, 108.03, 95.74, 117.95, 96.58, 86.17], '1Y': [159.7, 132.38, 124.91, 110.28, 106.01, 139.78, 99.97, 93.99, 103.04, 93.55, 120.47, 133.23, 122.52, 133.85, 141.62, 127.06, 132.55, 133.71, 104.01, 77.36, 71.65, 77.06, 86.24, 72.35, 84.83, 73.9, 77.94, 87.48, 94.05, 106.02, 82.46, 95.15, 97.14, 97.63, 74.82, 79.86, 82.82, 87.58, 78.44, 92, 119.56, 117.42, 111.6, 128.84, 114.21, 107.58, 106.86, 108.03, 95.74, 117.95, 96.58, 86.17] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$47B', pe: null, revenueGrowth: 112, eps: -2.72, grossMargin: 69, dividendYield: null,
      etfPresence: { AIS: false, ARTY: 3.73, BAI: 1.09, IGPT: false, IVES: 1.78, ALAI: false, CHAT: 2.69, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'COREWEAVE INC CLASS A appears in 4 of 10 AI & ML ETFs (40% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 4.82, proScore: 4.82, coverage: 1,
      price: 984.12, weeklyPrices: [1145.28, 1154.29, 1032.28, 975.56, 984.12], weeklyChange: -14.07, dayChange: 0.88, sortRank: 0, periodReturns: { '1M': 13.9, 'YTD': 244.8, '6M': 186.6, '1Y': 720.6 },
      priceHistory: { '1D': [975.56, 1000.9, 1000.6, 995.49, 1013, 1009.19, 1010.41, 1013.69, 1011.49, 998.81, 1001.29, 1003.76, 1007, 1007.79, 1012.44, 1008.1, 1003.08, 1002.2, 1002.58, 998.7, 999.5, 992.04, 986.78, 984.12], '1W': [1145.28, 1154.29, 1032.28, 975.56, 984.12], '1M': [949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.12], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 923.52, 996, 995.87, 1133.99, 1132.33, 984.12], '6M': [343.43, 338.13, 389.11, 435.28, 379.4, 410.34, 417.35, 429, 400.77, 418.69, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 517.16, 646.63, 776.01, 731.99, 923.52, 996, 995.87, 1133.99, 1132.33, 984.12], '1Y': [119.92, 118.61, 113.23, 111.25, 107.77, 123.72, 120.87, 117.68, 119.01, 131.46, 157.77, 164.62, 163.9, 190.96, 192.77, 206.77, 219.02, 223.77, 237.92, 246.83, 207.37, 240.46, 246.92, 237.5, 276.59, 292.63, 343.43, 338.13, 389.11, 435.28, 379.4, 410.34, 417.35, 415.56, 397.05, 405.35, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 517.16, 646.63, 776.01, 762.1, 923.52, 996, 995.87, 1133.99, 1132.33, 984.12] },
      velocityScore: { '1D': null, '1W': -3.2, '1M': -20.6, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 22.3, revenueGrowth: 346, eps: 44.19, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { SOXX: 8.16, PSI: 5.58, XSD: 2.59, DRAM: 2.96 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 5.38, proScore: 4.03, coverage: 0.75,
      price: 553.24, weeklyPrices: [539.49, 580.91, 540.88, 517.82, 553.24], weeklyChange: 2.55, dayChange: 6.84, sortRank: 0, periodReturns: { '1M': 18.6, 'YTD': 158.3, '6M': 158.1, '1Y': 310.4 },
      priceHistory: { '1D': [517.82, 547.32, 560.48, 562.69, 568.4, 568.23, 567.65, 569.9, 566.95, 566.09, 563.99, 568.76, 567.05, 566.06, 563.38, 562.45, 562.84, 559.55, 557.9, 558.24, 557.75, 555.22, 554.08, 553.24], '1W': [539.49, 580.91, 540.88, 517.82, 553.24], '1M': [490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 553.24], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 518.09, 523.2, 488.45, 537.37, 521.58, 553.24], '6M': [214.35, 220.97, 249.8, 252.74, 200.19, 213.58, 203.37, 210.86, 202.07, 204.83, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 354.49, 408.46, 449.7, 447.58, 518.09, 523.2, 488.45, 537.37, 521.58, 553.24], '1Y': [134.8, 146.24, 157, 173.66, 176.78, 172.28, 177.51, 167.76, 162.63, 151.41, 161.16, 159.79, 161.36, 203.71, 216.42, 240.56, 252.92, 256.12, 233.54, 246.81, 203.78, 219.76, 221.11, 207.58, 214.95, 215.34, 214.35, 220.97, 249.8, 252.74, 200.19, 213.58, 203.37, 203.68, 199.45, 197.74, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 354.49, 408.46, 449.7, 449.59, 518.09, 523.2, 488.45, 537.37, 521.58, 553.24] },
      velocityScore: { '1D': null, '1W': 3.9, '1M': -10, '6M': null }, isNew: false,
      marketCap: '$902B', pe: 184.4, revenueGrowth: 38, eps: 3, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 8.15, PSI: 5.27, XSD: 2.71, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 4.81, proScore: 3.61, coverage: 0.75,
      price: 195.8, weeklyPrices: [194.97, 200.09, 197.58, 194.83, 195.80], weeklyChange: 0.43, dayChange: 0.5, sortRank: 0, periodReturns: { '1M': -4.5, 'YTD': 5, '6M': 4.6, '1Y': 23.7 },
      priceHistory: { '1D': [194.83, 195.43, 195.97, 196.26, 196.6, 196.52, 196.23, 196.07, 196.02, 195.85, 195.96, 196.29, 196.2, 196.19, 196.74, 197.14, 197, 196.84, 196.42, 196.54, 196.51, 196.05, 195.9, 195.8], '1W': [194.97, 200.09, 197.58, 194.83, 195.8], '1M': [208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83, 195.8], 'YTD': [186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 223.47, 214.25, 218.66, 204.87, 210.69, 192.53, 195.8], '6M': [187.24, 185.81, 183.32, 191.52, 174.19, 190.05, 187.9, 195.56, 183.04, 186.03, 180.4, 178.68, 175.75, 183.91, 198.35, 199.64, 199.57, 211.5, 235.74, 223.47, 214.25, 218.66, 204.87, 210.69, 192.53, 195.8], '1Y': [158.24, 164.07, 171.38, 176.75, 180, 182.06, 180.45, 177.99, 174.18, 168.31, 177.75, 183.61, 181.85, 185.54, 188.32, 182.64, 186.26, 202.49, 188.15, 190.17, 178.88, 179.92, 185.55, 176.29, 183.69, 187.54, 187.24, 185.81, 183.32, 191.52, 174.19, 190.05, 187.9, 184.89, 183.34, 183.14, 180.4, 178.68, 175.75, 183.91, 198.35, 199.64, 199.57, 211.5, 235.74, 219.51, 214.25, 218.66, 204.87, 210.69, 192.53, 195.8] },
      velocityScore: { '1D': null, '1W': 5.9, '1M': 15.3, '6M': null }, isNew: false,
      marketCap: '$4.7T', pe: 30, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.51,
      etfPresence: { SOXX: 7.5, PSI: 4.65, XSD: 2.29, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.61, proScore: 3.46, coverage: 0.75,
      price: 122.57, weeklyPrices: [131.72, 139.63, 127.02, 120.35, 122.57], weeklyChange: -6.95, dayChange: 1.84, sortRank: 0, periodReturns: { '1M': 23.6, 'YTD': 232.2, '6M': 206.1, '1Y': 457.1 },
      priceHistory: { '1D': [120.35, 125.83, 126.43, 125.51, 126.72, 126.8, 126.24, 126.75, 126.2, 125.29, 124.59, 125.05, 124.71, 124.39, 124.16, 124.4, 124.84, 124.28, 124.01, 124.24, 124.27, 123.45, 123.04, 122.57], '1W': [131.72, 139.63, 127.02, 120.35, 122.57], '1M': [110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 127.02, 120.35, 122.57], 'YTD': [36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 43.63, 45.5, 45.58, 45.76, 44.01, 41.19, 58.95, 64.94, 65.27, 94.75, 113.01, 120.29, 118.96, 120.89, 111.78, 116.96, 133.99, 128.32, 122.57], '6M': [40.04, 47.29, 54.25, 48.78, 48.6, 48.29, 44.62, 46.88, 45.58, 47.98, 45.03, 47.18, 48.03, 61.72, 68.5, 66.78, 94.48, 109.62, 115.93, 118.96, 120.89, 111.78, 116.96, 133.99, 128.32, 122.57], '1Y': [22, 23.3, 23.26, 20.68, 19.5, 20.65, 24.56, 24.8, 24.35, 24.48, 24.77, 28.76, 34.48, 36.59, 37.22, 38.1, 38.28, 39.99, 38.13, 35.52, 34.5, 40.01, 40.3, 37.51, 36.37, 37.3, 40.04, 47.29, 54.25, 48.78, 48.6, 48.29, 44.62, 45.46, 45.95, 45.25, 45.03, 47.18, 48.03, 61.72, 68.5, 66.78, 94.48, 109.62, 115.93, 118.5, 120.89, 111.78, 116.96, 133.99, 128.32, 122.57] },
      velocityScore: { '1D': null, '1W': -1.7, '1M': 2.1, '6M': null }, isNew: false,
      marketCap: '$616B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 6.17, PSI: 5, XSD: 2.66, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.52, proScore: 2.64, coverage: 0.75,
      price: 390.29, weeklyPrices: [391.78, 397.17, 388.98, 377.16, 390.29], weeklyChange: -0.38, dayChange: 3.48, sortRank: 0, periodReturns: { '1M': -2.8, 'YTD': 43.9, '6M': 33.2, '1Y': 61.4 },
      priceHistory: { '1D': [377.16, 389.35, 390.02, 390.04, 392.83, 394.42, 392.91, 394.36, 394.23, 394.13, 390.96, 391.76, 391.8, 391.34, 391.52, 391.13, 390.64, 390.95, 392.02, 391.61, 391.94, 391.21, 390.5, 390.29], '1W': [391.78, 397.17, 388.98, 377.16, 390.29], '1M': [403.89, 404.62, 392.67, 412.13, 417.79, 427.58, 416, 414.45, 434.46, 445.48, 407.26, 413.16, 417.93, 386.91, 391.78, 397.17, 388.98, 377.16, 390.29], 'YTD': [271.2, 299.16, 302.1, 305.6, 310.88, 320.45, 337.1, 355.15, 352.41, 319.71, 310.92, 312.19, 303.1, 346.21, 347.94, 381.42, 389.31, 415.63, 432.39, 398.05, 419.01, 428.76, 412.13, 434.46, 386.91, 390.29], '6M': [292.94, 296.21, 304.97, 317.63, 320.44, 337, 345.3, 360.8, 341.51, 319.22, 308.59, 322.03, 320.58, 351.36, 353.8, 403.88, 402.26, 408.52, 426.79, 398.05, 419.01, 428.76, 412.13, 434.46, 386.91, 390.29], '1Y': [241.81, 243.46, 240.48, 230.77, 222.4, 224.07, 231.63, 252.2, 251.31, 248.98, 244.91, 247.34, 244.79, 242.5, 234.67, 246.22, 238.01, 234.13, 228.48, 234.89, 232.32, 266.51, 279.13, 280.44, 275.82, 274.82, 292.94, 296.21, 304.97, 317.63, 320.44, 337, 345.3, 354.35, 329.72, 307.27, 308.59, 322.03, 320.58, 351.36, 353.8, 403.88, 402.26, 408.52, 426.79, 384.21, 419.01, 428.76, 412.13, 434.46, 386.91, 390.29] },
      velocityScore: { '1D': null, '1W': 2.3, '1M': 7.3, '6M': null }, isNew: false,
      marketCap: '$190B', pe: 58.2, revenueGrowth: 37, eps: 6.71, grossMargin: 64, dividendYield: 1.17,
      etfPresence: { SOXX: 3.7, PSI: 4.61, XSD: 2.26, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 6.12, proScore: 3.06, coverage: 0.5,
      price: 592.69, weeklyPrices: [694.64, 723.00, 650.91, 603.04, 592.69], weeklyChange: -14.68, dayChange: -1.72, sortRank: 0, periodReturns: { '1M': 30.8, 'YTD': 130.6, '6M': 100.2, '1Y': 210.7 },
      priceHistory: { '1D': [603.04, 618.7, 617.09, 613.94, 616.6, 613.54, 607.98, 608.44, 604.86, 603.83, 597.79, 599.1, 601.36, 599.9, 601.53, 599.86, 597.73, 598.29, 598.35, 595.05, 596, 595.52, 592.63, 592.69], '1W': [694.64, 723, 650.91, 603.04, 592.69], '1M': [492.17, 499.21, 497.01, 552.64, 567.25, 585.78, 568.23, 592.92, 617.11, 640.18, 585.88, 588.97, 668, 626.84, 694.64, 723, 650.91, 603.04, 592.69], 'YTD': [256.99, 281.64, 319.08, 322.38, 322.32, 322.51, 354.91, 373.55, 372.18, 338.94, 346.18, 361.79, 323.12, 385.72, 394.26, 403.48, 382.59, 428.62, 436.61, 426.85, 449.68, 501.7, 552.64, 617.11, 626.84, 592.69], '6M': [296.01, 304.87, 325.24, 336.75, 297.6, 339.88, 369.83, 394.95, 357.76, 351.07, 349.47, 369.34, 353.8, 397.81, 389.9, 403.91, 394.49, 410.64, 440.56, 426.85, 449.68, 501.7, 552.64, 617.11, 626.84, 592.69], '1Y': [190.78, 197.1, 192.61, 190.27, 182.82, 184.38, 161.76, 162.49, 160.76, 162.05, 170.93, 200.52, 204.95, 223.91, 219.48, 228.13, 228.75, 233.1, 230.07, 226.01, 224.01, 254.75, 268.16, 261.27, 259.01, 259.97, 296.01, 304.87, 325.24, 336.75, 297.6, 339.88, 369.83, 375.72, 346.53, 337.27, 349.47, 369.34, 353.8, 397.81, 389.9, 403.91, 394.49, 410.64, 440.56, 427.36, 449.68, 501.7, 552.64, 617.11, 626.84, 592.69] },
      velocityScore: { '1D': null, '1W': 1.3, '1M': 19.5, '6M': null }, isNew: false,
      marketCap: '$471B', pe: 55.9, revenueGrowth: 11, eps: 10.61, grossMargin: 49, dividendYield: 0.35,
      etfPresence: { SOXX: 5.44, PSI: 6.8, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 5.49, proScore: 2.75, coverage: 0.5,
      price: 231.53, weeklyPrices: [278.39, 301.71, 266.19, 235.55, 231.53], weeklyChange: -16.83, dayChange: -1.7, sortRank: 0, periodReturns: { '1M': 20, 'YTD': 90.6, '6M': 66, '1Y': 153.7 },
      priceHistory: { '1D': [235.55, 244.91, 244.07, 242.78, 242.92, 240.85, 240.88, 240.5, 239.26, 238.76, 236.57, 238.09, 237.89, 236.79, 237.06, 236.15, 235.77, 235.12, 234.24, 233.83, 234.51, 233.88, 232.28, 231.53], '1W': [278.39, 301.71, 266.19, 235.55, 231.53], '1M': [210.81, 213.94, 213.56, 241.16, 254.54, 256.42, 237.33, 238.73, 259.56, 269.16, 244.49, 240.48, 258.8, 248.64, 278.39, 301.71, 266.19, 235.55, 231.53], 'YTD': [121.51, 132.46, 154.5, 151.28, 142.79, 144.29, 146.41, 148.77, 153.49, 142.91, 143.82, 151.14, 138.26, 167.23, 174.81, 181.21, 181.62, 181.63, 184.97, 182.95, 192.76, 213.11, 241.16, 259.56, 248.64, 231.53], '6M': [139.5, 144.18, 152, 162.72, 130.72, 147.95, 146.99, 154.67, 147.59, 146.5, 148.24, 154.38, 151.98, 172.73, 173.49, 181.54, 175.04, 176.32, 189.29, 182.95, 192.76, 213.11, 241.16, 259.56, 248.64, 231.53], '1Y': [91.26, 92.18, 93.78, 92.32, 91.56, 91.02, 87.49, 87.03, 87.2, 90.9, 98.89, 107.13, 106.41, 113.97, 102.5, 115.29, 118.28, 120.87, 119.34, 113.43, 109.71, 115.72, 122.46, 122.51, 126.57, 124.36, 139.5, 144.18, 152, 162.72, 130.72, 147.95, 146.99, 152.43, 142.94, 140.96, 148.24, 154.38, 151.98, 172.73, 173.49, 181.54, 175.04, 176.32, 189.29, 184.22, 192.76, 213.11, 241.16, 259.56, 248.64, 231.53] },
      velocityScore: { '1D': null, '1W': 0, '1M': 27.9, '6M': null }, isNew: false,
      marketCap: '$302B', pe: 65.6, revenueGrowth: 12, eps: 3.53, grossMargin: 61, dividendYield: 0.39,
      etfPresence: { SOXX: 4.98, PSI: 6, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 5.04, proScore: 2.52, coverage: 0.5,
      price: 350.92, weeklyPrices: [410.91, 433.33, 391.26, 351.41, 350.92], weeklyChange: -14.6, dayChange: -0.14, sortRank: 0, periodReturns: { '1M': 15.7, 'YTD': 105, '6M': 69.6, '1Y': 257.6 },
      priceHistory: { '1D': [351.41, 363.02, 363.26, 360.86, 363.07, 363.05, 363.64, 363.59, 361.1, 359.26, 356.48, 359.99, 359.72, 358.18, 359.03, 357.12, 356.32, 355.69, 353.89, 352.36, 353.19, 352.95, 351.37, 350.92], '1W': [410.91, 433.33, 391.26, 351.41, 350.92], '1M': [324.45, 327.16, 321.8, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04, 409.54, 371.33, 374.8, 401.82, 379.09, 410.91, 433.33, 391.26, 351.41, 350.92], 'YTD': [171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 242.27, 231, 211.15, 219.4, 233.31, 199.93, 246.49, 265.16, 265.55, 248.75, 297.17, 295.44, 292.09, 318, 336.41, 362.52, 389.04, 379.09, 350.92], '6M': [206.96, 214.38, 228.39, 239.58, 209.78, 235.12, 237.39, 249.48, 222.99, 218.87, 224.71, 233.45, 222.01, 258.76, 260.96, 258.56, 257.86, 286.52, 299.15, 292.09, 318, 336.41, 362.52, 389.04, 379.09, 350.92], '1Y': [98.14, 99.62, 101.74, 98.62, 98.41, 102, 99.51, 100.08, 100.15, 105.07, 119.21, 132.2, 131.09, 149.15, 137.81, 144.05, 151.68, 157.46, 159.35, 148.26, 142.65, 154.79, 162.74, 164.3, 175.26, 173.78, 206.96, 214.38, 228.39, 239.58, 209.78, 235.12, 237.39, 239.07, 214.68, 209.49, 224.71, 233.45, 222.01, 258.76, 260.96, 258.56, 257.86, 286.52, 299.15, 302.24, 318, 336.41, 362.52, 389.04, 379.09, 350.92] },
      velocityScore: { '1D': null, '1W': -2.3, '1M': 17.2, '6M': null }, isNew: false,
      marketCap: '$439B', pe: 66.1, revenueGrowth: 24, eps: 5.31, grossMargin: 50, dividendYield: 0.3,
      etfPresence: { SOXX: 4.49, PSI: 5.59, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 4.42, proScore: 2.21, coverage: 0.5,
      price: 374.25, weeklyPrices: [372.45, 377.75, 369.34, 360.45, 374.25], weeklyChange: 0.48, dayChange: 3.83, sortRank: 0, periodReturns: { '1M': -3, 'YTD': 8.1, '6M': 8.9, '1Y': 36.5 },
      priceHistory: { '1D': [360.45, 383.01, 380.01, 380.4, 380.64, 379.67, 378.14, 377.71, 375.3, 374.96, 373.45, 373.6, 373.85, 374.55, 374.91, 375.31, 375.15, 375.1, 375.4, 376.01, 376.39, 376.74, 375.08, 374.25], '1W': [372.45, 377.75, 369.34, 360.45, 374.25], '1M': [396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45, 374.25], 'YTD': [346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 417.76, 426.58, 418.91, 385.57, 411.35, 365.02, 374.25], '6M': [343.77, 354.61, 328.8, 333.24, 308.05, 342.76, 333.99, 332.31, 317.53, 341.57, 315.93, 318.81, 313.49, 354.91, 398.47, 419.94, 417.43, 412.56, 439.79, 417.76, 426.58, 418.91, 385.57, 411.35, 365.02, 374.25], '1Y': [274.18, 275.6, 288.21, 294.3, 297.72, 303.9, 306.34, 294, 297.39, 345.65, 364.09, 338.79, 327.9, 335.49, 356.7, 349.24, 354.13, 369.63, 349.43, 342.46, 340.2, 386.08, 401.1, 339.81, 341.45, 349.85, 343.77, 354.61, 328.8, 333.24, 308.05, 342.76, 333.99, 321.7, 332.77, 335.97, 315.93, 318.81, 313.49, 354.91, 398.47, 419.94, 417.43, 412.56, 439.79, 414.57, 426.58, 418.91, 385.57, 411.35, 365.02, 374.25] },
      velocityScore: { '1D': null, '1W': 2.8, '1M': 12.8, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 62.2, revenueGrowth: 48, eps: 6.02, grossMargin: 76, dividendYield: 0.72,
      etfPresence: { SOXX: 6.56, PSI: false, XSD: 2.28, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 3.58, proScore: 1.79, coverage: 0.5,
      price: 249.57, weeklyPrices: [277.75, 297.89, 272.05, 245.29, 249.57], weeklyChange: -10.15, dayChange: 1.74, sortRank: 0, periodReturns: { '1M': -5.3, 'YTD': 193.7, '6M': 182.9, '1Y': 248.8 },
      priceHistory: { '1D': [245.29, 254.84, 255.9, 255.71, 259.8, 257.57, 258.82, 258.88, 256.52, 255.43, 255.1, 256.38, 255.91, 255.35, 256.54, 255.71, 255.57, 254.8, 253.52, 252.53, 252.81, 252.07, 250.3, 249.57], '1W': [277.75, 297.89, 272.05, 245.29, 249.57], '1M': [288.85, 266.88, 252.59, 280.71, 279.7, 308.88, 278.67, 289.54, 310.58, 307.86, 279.04, 276.7, 281.26, 266.77, 277.75, 297.89, 272.05, 245.29, 249.57], 'YTD': [84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 114.45, 134.6, 157.32, 156.57, 172.15, 177.95, 186.8, 204.83, 316.43, 280.71, 310.58, 266.77, 249.57], '6M': [88.23, 83.05, 82.55, 83.62, 73.73, 81.34, 79.61, 80.92, 78.09, 90.44, 87.62, 98.45, 106.71, 119.93, 133.37, 165.56, 165.15, 160.01, 182.58, 186.8, 204.83, 316.43, 280.71, 310.58, 266.77, 249.57], '1Y': [71.55, 72.51, 73.06, 75.91, 76.53, 77.28, 76.19, 73, 62.87, 66, 67.43, 75.53, 82.39, 88.92, 89.39, 85.84, 84.13, 93.74, 90.92, 86.45, 77.45, 91.1, 92, 84.26, 84.8, 86.76, 88.23, 83.05, 82.55, 83.62, 73.73, 81.34, 79.61, 79.29, 75.68, 87.67, 87.62, 98.45, 106.71, 119.93, 133.37, 165.56, 165.15, 160.01, 182.58, 190.69, 204.83, 316.43, 280.71, 310.58, 266.77, 249.57] },
      velocityScore: { '1D': null, '1W': -4.3, '1M': -48.7, '6M': null }, isNew: false,
      marketCap: '$218B', pe: 85.5, revenueGrowth: 28, eps: 2.92, grossMargin: 52, dividendYield: 0.1,
      etfPresence: { SOXX: 4.86, PSI: false, XSD: 2.3, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 3.17, proScore: 1.59, coverage: 0.5,
      price: 302.64, weeklyPrices: [285.48, 298.07, 298.41, 293.08, 302.64], weeklyChange: 6.01, dayChange: 3.26, sortRank: 0, periodReturns: { '1M': 6.2, 'YTD': 74.4, '6M': 57.5, '1Y': 41.8 },
      priceHistory: { '1D': [293.08, 303.45, 304.54, 303.3, 304.86, 305.58, 304.92, 304.8, 304.4, 304.35, 302.23, 303.67, 303.77, 302.79, 303.92, 303.67, 303.8, 303.83, 303.51, 303.95, 304.07, 303.45, 302.78, 302.64], '1W': [285.48, 298.07, 298.41, 293.08, 302.64], '1M': [290.9, 288.63, 282.01, 297.1, 301.12, 313.34, 305.71, 301.88, 322.86, 332.28, 304.36, 303.11, 311.81, 285.43, 285.48, 298.07, 298.41, 293.08, 302.64], 'YTD': [173.49, 188.45, 189.12, 193.31, 215.55, 221.44, 226.16, 219.86, 209.82, 196.2, 194.13, 188.63, 186.42, 208.9, 216.29, 236.31, 269.22, 289.44, 306.34, 304.88, 315.95, 305.37, 297.1, 322.86, 285.43, 302.64], '6M': [192.1, 188.53, 194.41, 216.17, 222.92, 226.56, 218.05, 213.9, 202.39, 198.67, 190.78, 196.77, 196.3, 214.98, 223.1, 282.23, 281.08, 285.24, 308.17, 304.88, 315.95, 305.37, 297.1, 322.86, 285.43, 302.64], '1Y': [213.41, 220.05, 214.57, 189.25, 182.73, 183.71, 194.57, 206.06, 202.48, 185.82, 178.2, 179.62, 183.23, 181.81, 175.11, 179.59, 169.13, 161.46, 160.55, 159.33, 159.4, 168.16, 180.94, 177.97, 178.82, 175.42, 192.1, 188.53, 194.41, 216.17, 222.92, 226.56, 218.05, 212.63, 197.98, 190.05, 190.78, 196.77, 196.3, 214.98, 223.1, 282.23, 281.08, 285.24, 308.17, 298.39, 315.95, 305.37, 297.1, 322.86, 285.43, 302.64] },
      velocityScore: { '1D': null, '1W': 6.7, '1M': 15.2, '6M': null }, isNew: false,
      marketCap: '$275B', pe: 51.6, revenueGrowth: 19, eps: 5.86, grossMargin: 57, dividendYield: 1.94,
      etfPresence: { SOXX: 3.9, PSI: false, XSD: 2.45, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 2.89, proScore: 1.45, coverage: 0.5,
      price: 429.1, weeklyPrices: [455.96, 483.02, 430.86, 406.42, 429.10], weeklyChange: -5.89, dayChange: 5.58, sortRank: 0, periodReturns: { '1M': 35.3, 'YTD': 157.9, '6M': 166.5, '1Y': 378.8 },
      priceHistory: { '1D': [406.42, 438.29, 451.63, 449.14, 449.1, 448.55, 447.62, 449.65, 439.36, 440.15, 440.92, 441.51, 442.56, 442.42, 446.38, 446.54, 446.32, 444.43, 439.89, 438.9, 438.96, 436.34, 430.63, 429.1], '1W': [455.96, 483.02, 430.86, 406.42, 429.1], '1M': [346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86, 406.42, 429.1], 'YTD': [166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 125.46, 172.09, 194.06, 196.85, 213.91, 224.09, 287.48, 349.17, 358.05, 367.47, 417.07, 391.74, 429.1], '6M': [161.01, 180.56, 176.01, 167.9, 144.67, 143.71, 132.62, 128.15, 113.77, 124.71, 126.34, 120.33, 106.33, 129.46, 170.81, 197.54, 194.74, 195.65, 228.64, 287.48, 349.17, 358.05, 367.47, 417.07, 391.74, 429.1], '1Y': [89.62, 90.32, 121.89, 124.05, 137.93, 179.43, 185.85, 179.09, 182.2, 216.1, 231.29, 237.3, 198.8, 220.81, 199.53, 156.31, 164.97, 186.68, 165.49, 144.34, 141.8, 165.19, 175.74, 143.66, 172.62, 170.84, 161.01, 180.56, 176.01, 167.9, 144.67, 143.71, 132.62, 124.67, 120, 119.9, 126.34, 120.33, 106.33, 129.46, 170.81, 197.54, 194.74, 195.65, 228.64, 297.84, 349.17, 358.05, 367.47, 417.07, 391.74, 429.1] },
      velocityScore: { '1D': null, '1W': 7.4, '1M': -9.4, '6M': null }, isNew: false,
      marketCap: '$74B', pe: 293.9, revenueGrowth: 93, eps: 1.46, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.88, PSI: false, XSD: 2.91, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.86, proScore: 1.43, coverage: 0.5,
      price: 281.65, weeklyPrices: [278.37, 281.03, 279.18, 273.36, 281.65], weeklyChange: 1.18, dayChange: 3.03, sortRank: 0, periodReturns: { '1M': -4.8, 'YTD': 29.8, '6M': 14.5, '1Y': 24.6 },
      priceHistory: { '1D': [273.36, 281.76, 285.58, 285.58, 286.33, 285.35, 285.22, 285.79, 285.18, 285.83, 283.98, 285.36, 285.02, 284.33, 285.33, 284.58, 284.7, 284.37, 283.99, 283.59, 284.29, 283.57, 282.55, 281.65], '1W': [278.37, 281.03, 279.18, 273.36, 281.65], '1M': [301.14, 297.41, 285.56, 302.55, 304.86, 315.88, 302.89, 298.2, 313.27, 323.24, 299.94, 294.06, 298.64, 277.02, 278.37, 281.03, 279.18, 273.36, 281.65], 'YTD': [217.06, 237.89, 238.6, 232.48, 226.14, 224.32, 244.43, 231.16, 224.76, 205.25, 191.89, 193.39, 187.39, 204.27, 209.39, 225.75, 289.25, 303.55, 298.41, 310.15, 330.28, 322.22, 302.55, 313.27, 277.02, 281.65], '6M': [245.95, 239.09, 233.72, 240.03, 226.86, 249.75, 232.11, 235.07, 216.37, 199.87, 192.69, 197.61, 195.58, 205.67, 213.73, 241.16, 293.59, 290.22, 294.17, 310.15, 330.28, 322.22, 302.55, 313.27, 277.02, 281.65], '1Y': [226, 224.61, 228.27, 228.49, 211.99, 205.16, 228.78, 234.83, 234.85, 225.5, 219.27, 225.73, 226.11, 231.42, 216.7, 219.82, 219.16, 209.12, 204.56, 197.1, 191.35, 199.49, 229.01, 231.83, 228.94, 219.98, 245.95, 239.09, 233.72, 240.03, 226.86, 249.75, 232.11, 232.23, 210.58, 191.22, 192.69, 197.61, 195.58, 205.67, 213.73, 241.16, 293.59, 290.22, 294.17, 299.38, 330.28, 322.22, 302.55, 313.27, 277.02, 281.65] },
      velocityScore: { '1D': null, '1W': 2.1, '1M': 2.1, '6M': null }, isNew: false,
      marketCap: '$71B', pe: 26.9, revenueGrowth: 12, eps: 10.47, grossMargin: 56, dividendYield: 1.48,
      etfPresence: { SOXX: 3.46, PSI: false, XSD: 2.25, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.57, proScore: 1.28, coverage: 0.5,
      price: 1340.48, weeklyPrices: [1312.77, 1382.36, 1331.73, 1288.16, 1340.48], weeklyChange: 2.11, dayChange: 4.06, sortRank: 0, periodReturns: { '1M': -9.5, 'YTD': 47.9, '6M': 33.3, '1Y': 80.9 },
      priceHistory: { '1D': [1288.16, 1338.22, 1356, 1352.74, 1364.13, 1362.43, 1364.93, 1364.09, 1362.31, 1363.23, 1354.52, 1365.06, 1364.51, 1362.03, 1366.22, 1362.81, 1362.38, 1359.83, 1355.49, 1356.72, 1357.69, 1350.81, 1343.83, 1340.48], '1W': [1312.77, 1382.36, 1331.73, 1288.16, 1340.48], '1M': [1559.18, 1531.98, 1473.04, 1589.55, 1577.32, 1652.29, 1498.77, 1448.21, 1563.7, 1537.88, 1423.76, 1434.95, 1438.3, 1313.32, 1312.77, 1382.36, 1331.73, 1288.16, 1340.48], 'YTD': [906.36, 959.09, 1009.54, 1063.74, 1124.15, 1229.82, 1171.47, 1190.06, 1142.58, 1062, 1077.4, 1076.35, 1002.34, 1312.94, 1353, 1522.04, 1526.84, 1652.35, 1650.35, 1553.27, 1633.17, 1652.6, 1589.55, 1563.7, 1313.32, 1340.48], '6M': [1005.38, 983.28, 1074.93, 1161.78, 1136.83, 1196.73, 1175.22, 1231.95, 1099.02, 1071.09, 1075.29, 1118.66, 1119.51, 1334.21, 1402.81, 1592.17, 1614.41, 1575.96, 1613.97, 1553.27, 1633.17, 1652.6, 1589.55, 1563.7, 1313.32, 1340.48], '1Y': [741.17, 721.14, 724.77, 738.55, 830.63, 797.51, 826.47, 844, 835.76, 864.32, 849.71, 922.81, 886.59, 968.1, 981.67, 1031.59, 1074.91, 1005, 958.26, 920.19, 872.35, 928.35, 983.58, 949.4, 945.16, 923.91, 1005.38, 983.28, 1074.93, 1161.78, 1136.83, 1196.73, 1175.22, 1180.13, 1078.44, 1033.88, 1075.29, 1118.66, 1119.51, 1334.21, 1402.81, 1592.17, 1614.41, 1575.96, 1613.97, 1561.25, 1633.17, 1652.6, 1589.55, 1563.7, 1313.32, 1340.48] },
      velocityScore: { '1D': null, '1W': 0.8, '1M': -7.9, '6M': null }, isNew: false,
      marketCap: '$66B', pe: 96.4, revenueGrowth: 26, eps: 13.91, grossMargin: 55, dividendYield: 0.62,
      etfPresence: { SOXX: 3.08, PSI: false, XSD: 2.06, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 2.51, proScore: 1.26, coverage: 0.5,
      price: 185.72, weeklyPrices: [188.72, 184.79, 181.92, 176.25, 185.72], weeklyChange: -1.59, dayChange: 5.37, sortRank: 0, periodReturns: { '1M': -14, 'YTD': 8.6, '6M': 1.8, '1Y': 17.5 },
      priceHistory: { '1D': [176.25, 186.2, 187.26, 186.54, 186.7, 186.34, 186.29, 186.6, 186.73, 186.48, 185.21, 186.84, 187.8, 187.43, 188.23, 188.18, 187.7, 187.57, 187.34, 186.86, 187.67, 186.96, 185.95, 185.72], '1W': [188.72, 184.79, 181.92, 176.25, 185.72], '1M': [217.77, 205.42, 191.2, 202.96, 211.72, 220.81, 214.07, 212.97, 226.11, 221.9, 204.13, 197.41, 204.9, 189.39, 188.72, 184.79, 181.92, 176.25, 185.72], 'YTD': [171.05, 181.87, 161.39, 155.82, 151.59, 137.34, 140.7, 140.41, 141.03, 138.11, 129.39, 128.35, 127.07, 127.51, 133.05, 136.07, 156, 192.57, 213.17, 202.51, 243.29, 242.57, 202.96, 226.11, 189.39, 185.72], '6M': [182.45, 165.29, 156.37, 152.7, 148.89, 141.04, 141.27, 145.82, 139.51, 134.12, 130.47, 130.35, 127.28, 127.75, 134.47, 133.95, 179.58, 202.55, 200.08, 202.51, 243.29, 242.57, 202.96, 226.11, 189.39, 185.72], '1Y': [158.09, 154.29, 158.97, 161.05, 147.51, 147.97, 157.85, 158.01, 160.73, 160.24, 161.22, 169.72, 165.3, 168.62, 161.78, 167.04, 168.94, 180.9, 170.89, 173.98, 163.3, 168.04, 175.31, 179.26, 174.22, 173.65, 182.45, 165.29, 156.37, 152.7, 148.89, 141.04, 141.27, 145.59, 137, 131.15, 130.47, 130.35, 127.28, 127.75, 134.47, 133.95, 179.58, 202.55, 200.08, 213.41, 243.29, 242.57, 202.96, 226.11, 189.39, 185.72] },
      velocityScore: { '1D': null, '1W': -3.1, '1M': -22.7, '6M': null }, isNew: false,
      marketCap: '$196B', pe: 19.9, revenueGrowth: -4, eps: 9.31, grossMargin: 55, dividendYield: 2.09,
      etfPresence: { SOXX: 2.85, PSI: false, XSD: 2.18, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.27, proScore: 1.14, coverage: 0.5,
      price: 87.76, weeklyPrices: [89.06, 91.20, 88.69, 84.64, 87.76], weeklyChange: -1.46, dayChange: 3.69, sortRank: 0, periodReturns: { '1M': -0.7, 'YTD': 37.7, '6M': 17.2, '1Y': 22.8 },
      priceHistory: { '1D': [84.64, 87.49, 88.4, 88.5, 88.91, 89.07, 88.97, 89.18, 89.18, 89.32, 88.89, 89.19, 89.19, 89.03, 89.18, 88.91, 88.91, 88.78, 88.58, 88.53, 88.72, 88.54, 88.07, 87.76], '1W': [89.06, 91.2, 88.69, 84.64, 87.76], '1M': [91.37, 91.47, 87.91, 92.94, 95.24, 100.32, 95.63, 94.11, 99.77, 102.71, 93.26, 92.48, 94.12, 87.93, 89.06, 91.2, 88.69, 84.64, 87.76], 'YTD': [63.72, 73.53, 74.45, 74.71, 75.92, 76.01, 78.56, 76.6, 74.31, 65, 63.83, 64.34, 60.06, 70.73, 74.49, 82.48, 90.17, 102.92, 96.71, 94.02, 96.04, 96.3, 92.94, 99.77, 87.93, 87.76], '6M': [74.87, 74.07, 76.2, 80.28, 78.23, 80.75, 77.16, 75.47, 69.9, 65.79, 64.71, 65.16, 65.38, 71.22, 76.87, 90.64, 92.91, 101.58, 97.04, 94.02, 96.04, 96.3, 92.94, 99.77, 87.93, 87.76], '1Y': [71.48, 74.05, 73.85, 70.53, 66.59, 60.95, 65.71, 69.14, 65, 65.3, 63.17, 65.4, 64.07, 66.59, 64.39, 67.07, 63.17, 62.42, 56.28, 53.48, 50.9, 53.43, 67.35, 67.18, 66.24, 64.68, 74.87, 74.07, 76.2, 80.28, 78.23, 80.75, 77.16, 74.97, 67.81, 62.73, 64.71, 65.16, 65.38, 71.22, 76.87, 90.64, 92.91, 101.58, 97.04, 91.11, 96.04, 96.3, 92.94, 99.77, 87.93, 87.76] },
      velocityScore: { '1D': null, '1W': 0, '1M': 0.9, '6M': null }, isNew: false,
      marketCap: '$48B', pe: 398.9, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 2.15,
      etfPresence: { SOXX: 2.27, PSI: false, XSD: 2.28, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.21, proScore: 1.11, coverage: 0.5,
      price: 261.68, weeklyPrices: [245.68, 271.95, 259.09, 241.91, 261.68], weeklyChange: 6.51, dayChange: 8.17, sortRank: 0, periodReturns: { '1M': 26.5, 'YTD': 81.9, '6M': 96.8, '1Y': 182.2 },
      priceHistory: { '1D': [241.91, 260.28, 270.3, 268.66, 275.85, 277.61, 277.05, 279.97, 274.45, 273.84, 274.61, 273.57, 273.6, 272.09, 273.68, 274.33, 272.92, 270.62, 267.18, 267.22, 267.08, 265.43, 263.01, 261.68], '1W': [245.68, 271.95, 259.09, 241.91, 261.68], '1M': [222.27, 234.32, 237.68, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.09, 241.91, 261.68], 'YTD': [143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.05, 114.22, 115.98, 116.88, 105.1, 87.81, 110.21, 168.35, 189.49, 175.77, 198.29, 189.36, 182.98, 222.35, 217.5, 264.76, 271.83, 238, 261.68], '6M': [132.95, 161.38, 139.16, 129.66, 96.95, 128.4, 130.66, 123.46, 102.54, 115.91, 101.72, 103.91, 95.92, 107.93, 158.93, 185.54, 174.01, 188.29, 184.54, 182.98, 222.35, 217.5, 264.76, 271.83, 238, 261.68], '1Y': [92.73, 98.7, 95.74, 107.95, 114.7, 118.57, 116.74, 114.04, 123.06, 147.53, 163.98, 164.1, 146.01, 147.42, 149.9, 151.66, 155.55, 187.62, 163.61, 145.52, 133.49, 171.13, 178.94, 142.02, 149.94, 144.92, 132.95, 161.38, 139.16, 129.66, 96.95, 128.4, 130.66, 114.48, 114.74, 111.57, 101.72, 103.91, 95.92, 107.93, 158.93, 185.54, 174.01, 188.29, 184.54, 193.39, 222.35, 217.5, 264.76, 271.83, 238, 261.68] },
      velocityScore: { '1D': null, '1W': 5.7, '1M': 1.8, '6M': null }, isNew: false,
      marketCap: '$49B', pe: 103.8, revenueGrowth: 157, eps: 2.52, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 2.02, PSI: false, XSD: 2.41, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 1.88, proScore: 0.94, coverage: 0.5,
      price: 95.28, weeklyPrices: [88.57, 94.54, 94.63, 91.22, 95.28], weeklyChange: 7.58, dayChange: 4.45, sortRank: 0, periodReturns: { '1M': -18.7, 'YTD': 76, '6M': 54.3, '1Y': 74.5 },
      priceHistory: { '1D': [91.22, 95.5, 96.55, 96.64, 97.38, 97.88, 98.03, 98.43, 97.83, 97.69, 96.49, 96.7, 96.57, 96.65, 97.1, 96.9, 96.73, 96.56, 96.18, 95.94, 96.18, 95.83, 95.58, 95.28], '1W': [88.57, 94.54, 94.63, 91.22, 95.28], '1M': [120.9, 117, 110.17, 115.96, 116.79, 125.9, 118.25, 112.92, 121.62, 131.55, 117.06, 115.74, 118.74, 90.65, 88.57, 94.54, 94.63, 91.22, 95.28], 'YTD': [54.15, 60.89, 60.28, 61.98, 59.89, 65.2, 72.21, 69.47, 66.48, 59.23, 59.88, 59.89, 55.66, 68.38, 72.43, 88.99, 98.86, 105.77, 115.71, 110.21, 123.77, 131.82, 115.96, 121.62, 90.65, 95.28], '6M': [61.76, 59.41, 63.13, 64.93, 62.06, 71.18, 68.09, 69.68, 62.53, 59.24, 60.46, 63.1, 62.2, 68.49, 79.93, 97.78, 100.81, 100.61, 118.37, 110.21, 123.77, 131.82, 115.96, 121.62, 90.65, 95.28], '1Y': [54.61, 59.07, 60.55, 58.66, 47.97, 47.1, 51.09, 51.85, 49.59, 48.88, 48.11, 51.5, 49.76, 50.35, 50.11, 54.89, 50.71, 50.08, 47.83, 46.92, 46.7, 50.43, 56.38, 55.09, 56.37, 54.24, 61.76, 59.41, 63.13, 64.93, 62.06, 71.18, 68.09, 68.16, 60.85, 57.69, 60.46, 63.1, 62.2, 68.49, 79.93, 97.78, 100.81, 100.61, 118.37, 109.61, 123.77, 131.82, 115.96, 121.62, 90.65, 95.28] },
      velocityScore: { '1D': null, '1W': 4.4, '1M': -33.3, '6M': null }, isNew: false,
      marketCap: '$37B', pe: 70.1, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 1.8, PSI: false, XSD: 1.95, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 2, avgWeight: 1.63, proScore: 0.82, coverage: 0.5,
      price: 330.48, weeklyPrices: [372.59, 380.37, 350.63, 322.26, 330.48], weeklyChange: -11.3, dayChange: 2.55, sortRank: 0, periodReturns: { '1M': -4.3, 'YTD': 92.9, '6M': 92.4, '1Y': 139.4 },
      priceHistory: { '1D': [322.26, 336.64, 338.47, 338.98, 340.51, 340.48, 340.27, 342.21, 338.64, 337.6, 338.44, 337.93, 337.68, 336.42, 337.66, 336.61, 337.02, 334.98, 333.41, 332.61, 333.91, 332.75, 331.58, 330.48], '1W': [372.59, 380.37, 350.63, 322.26, 330.48], '1M': [361.86, 358.72, 354.4, 374.76, 379.87, 384.77, 368.32, 367.11, 391.41, 396.26, 372.15, 373.08, 390.19, 369.18, 372.59, 380.37, 350.63, 322.26, 330.48], 'YTD': [171.28, 167.66, 218.93, 219.26, 219.06, 235.87, 244.16, 245.53, 258.54, 218.73, 224.92, 229.26, 209.49, 247, 261.16, 277, 269.63, 309.81, 381.55, 375.71, 391.09, 382.74, 374.76, 391.41, 369.18, 330.48], '6M': [171.77, 213.52, 226.25, 226.25, 215.03, 236.94, 242.56, 253.37, 239, 222.55, 218.89, 245.04, 229.36, 247.71, 261.42, 284.4, 281.61, 344.47, 383.56, 375.71, 391.09, 382.74, 374.76, 391.41, 369.18, 330.48], '1Y': [138.04, 136.63, 140.58, 139.58, 140, 118.35, 123.09, 126.15, 128.15, 130.25, 131.42, 129.49, 123.29, 131.71, 130.53, 140.33, 140.85, 148.13, 170.03, 162.5, 158.27, 172.85, 185.54, 175.29, 175.19, 174.87, 171.77, 213.52, 226.25, 226.25, 215.03, 236.94, 242.56, 247.11, 228.98, 215.94, 218.89, 245.04, 229.36, 247.71, 261.42, 284.4, 281.61, 344.47, 383.56, 380.45, 391.09, 382.74, 374.76, 391.41, 369.18, 330.48] },
      velocityScore: { '1D': null, '1W': -9.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$25B', pe: 140.6, revenueGrowth: 23, eps: 2.35, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: 1.12, PSI: false, XSD: 2.14, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SWKS', name: 'SKYWORKS SOLUTIONS INC', easyScore: 2, avgWeight: 1.28, proScore: 0.64, coverage: 0.5,
      price: 62.81, weeklyPrices: [67.71, 67.80, 65.93, 62.56, 62.81], weeklyChange: -7.24, dayChange: 0.4, sortRank: 0, periodReturns: { '1M': -14.6, 'YTD': -0.9, '6M': -5.2, '1Y': -17.6 },
      priceHistory: { '1D': [62.56, 62.63, 63.72, 63.98, 63.95, 63.9, 63.76, 63.9, 64.11, 64.14, 63.56, 63.82, 63.89, 63.88, 64.15, 63.86, 63.84, 63.62, 63.56, 63.45, 63.56, 63.36, 62.95, 62.81], '1W': [67.71, 67.8, 65.93, 62.56, 62.81], '1M': [75.37, 73.56, 70.29, 72.73, 73.97, 76.26, 71.42, 69.38, 72.45, 76.18, 73.44, 71.4, 69.94, 68, 67.71, 67.8, 65.93, 62.56, 62.81], 'YTD': [63.41, 60.66, 58.46, 58.96, 55.76, 62.1, 62.1, 59.78, 58.93, 55.28, 54.54, 54.49, 52.5, 56.54, 57.93, 61.77, 62.66, 64.97, 68.14, 74.35, 81.41, 79.93, 72.73, 72.45, 68, 62.81], '6M': [66.27, 58.5, 58.55, 55.28, 59, 63.68, 59.22, 59.82, 56.28, 55.35, 53.58, 56.19, 53.22, 56.56, 58.7, 61.55, 70.17, 65.04, 67.06, 74.35, 81.41, 79.93, 72.73, 72.45, 68, 62.81], '1Y': [76.19, 74.43, 72.72, 71.32, 67.94, 70.53, 74.52, 77.29, 74.94, 75.63, 72.87, 82.97, 76.93, 76.91, 73.37, 76.14, 74.04, 77.72, 69.58, 66.6, 62.61, 65.83, 69.21, 66.37, 65.24, 64.46, 66.27, 58.5, 58.55, 55.28, 59, 63.68, 59.22, 59.61, 56.48, 55.2, 53.58, 56.19, 53.22, 56.56, 58.7, 61.55, 70.17, 65.04, 67.06, 73.54, 81.41, 79.93, 72.73, 72.45, 68, 62.81] },
      velocityScore: { '1D': null, '1W': -5.9, '1M': null, '6M': null }, isNew: true,
      marketCap: '$9B', pe: 26.2, revenueGrowth: -1, eps: 2.4, grossMargin: 41, dividendYield: 4.54,
      etfPresence: { SOXX: 0.47, PSI: false, XSD: 2.1, DRAM: false },
      tonyNote: 'SKYWORKS SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 8, avgWeight: 5.87, proScore: 2.76, coverage: 0.471,
      price: 984.12, weeklyPrices: [1145.28, 1154.29, 1032.28, 975.56, 984.12], weeklyChange: -14.07, dayChange: 0.88, sortRank: 0, periodReturns: { '1M': 13.9, 'YTD': 244.8, '6M': 186.6, '1Y': 720.6 },
      priceHistory: { '1D': [975.56, 1000.9, 1000.6, 995.49, 1013, 1009.19, 1010.41, 1013.69, 1011.49, 998.81, 1001.29, 1003.76, 1007, 1007.79, 1012.44, 1008.1, 1003.08, 1002.2, 1002.58, 998.7, 999.5, 992.04, 986.78, 984.12], '1W': [1145.28, 1154.29, 1032.28, 975.56, 984.12], '1M': [949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.12], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 923.52, 996, 995.87, 1133.99, 1132.33, 984.12], '6M': [343.43, 338.13, 389.11, 435.28, 379.4, 410.34, 417.35, 429, 400.77, 418.69, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 517.16, 646.63, 776.01, 731.99, 923.52, 996, 995.87, 1133.99, 1132.33, 984.12], '1Y': [119.92, 118.61, 113.23, 111.25, 107.77, 123.72, 120.87, 117.68, 119.01, 131.46, 157.77, 164.62, 163.9, 190.96, 192.77, 206.77, 219.02, 223.77, 237.92, 246.83, 207.37, 240.46, 246.92, 237.5, 276.59, 292.63, 343.43, 338.13, 389.11, 435.28, 379.4, 410.34, 417.35, 415.56, 397.05, 405.35, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 517.16, 646.63, 776.01, 762.1, 923.52, 996, 995.87, 1133.99, 1132.33, 984.12] },
      velocityScore: { '1D': null, '1W': -11.3, '1M': 10.4, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 22.3, revenueGrowth: 346, eps: 44.19, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { PTF: 4.92, WCLD: false, IGV: false, FDTX: 9.33, GTEK: false, ARKK: false, MARS: false, FRWD: 4.6, BCTK: 4.27, FWD: false, CBSE: false, FCUS: 4.49, WGMI: false, CNEQ: 1.65, SGRT: 6.95, SPMO: 10.74, XMMO: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 8, avgWeight: 5.62, proScore: 2.64, coverage: 0.471,
      price: 195.8, weeklyPrices: [194.97, 200.09, 197.58, 194.83, 195.80], weeklyChange: 0.43, dayChange: 0.5, sortRank: 0, periodReturns: { '1M': -4.5, 'YTD': 5, '6M': 4.6, '1Y': 23.7 },
      priceHistory: { '1D': [194.83, 195.43, 195.97, 196.26, 196.6, 196.52, 196.23, 196.07, 196.02, 195.85, 195.96, 196.29, 196.2, 196.19, 196.74, 197.14, 197, 196.84, 196.42, 196.54, 196.51, 196.05, 195.9, 195.8], '1W': [194.97, 200.09, 197.58, 194.83, 195.8], '1M': [208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83, 195.8], 'YTD': [186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 223.47, 214.25, 218.66, 204.87, 210.69, 192.53, 195.8], '6M': [187.24, 185.81, 183.32, 191.52, 174.19, 190.05, 187.9, 195.56, 183.04, 186.03, 180.4, 178.68, 175.75, 183.91, 198.35, 199.64, 199.57, 211.5, 235.74, 223.47, 214.25, 218.66, 204.87, 210.69, 192.53, 195.8], '1Y': [158.24, 164.07, 171.38, 176.75, 180, 182.06, 180.45, 177.99, 174.18, 168.31, 177.75, 183.61, 181.85, 185.54, 188.32, 182.64, 186.26, 202.49, 188.15, 190.17, 178.88, 179.92, 185.55, 176.29, 183.69, 187.54, 187.24, 185.81, 183.32, 191.52, 174.19, 190.05, 187.9, 184.89, 183.34, 183.14, 180.4, 178.68, 175.75, 183.91, 198.35, 199.64, 199.57, 211.5, 235.74, 219.51, 214.25, 218.66, 204.87, 210.69, 192.53, 195.8] },
      velocityScore: { '1D': null, '1W': -15.4, '1M': 15.8, '6M': null }, isNew: false,
      marketCap: '$4.7T', pe: 30, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.51,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.09, GTEK: false, ARKK: 1.52, MARS: false, FRWD: 8.39, BCTK: 5.8, FWD: 1.89, CBSE: false, FCUS: false, WGMI: 2.33, CNEQ: 13.15, SGRT: false, SPMO: 7.78, XMMO: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 7, avgWeight: 5.03, proScore: 2.07, coverage: 0.412,
      price: 570.64, weeklyPrices: [651.88, 638.72, 598.37, 539.00, 570.64], weeklyChange: -12.46, dayChange: 5.87, sortRank: 0, periodReturns: { '1M': 11.5, 'YTD': 231.2, '6M': 160.1, '1Y': 774.9 },
      priceHistory: { '1D': [539, 584.99, 590, 590.33, 593.74, 593.48, 596.45, 597.39, 589.91, 586.49, 580.71, 580.41, 579.97, 576.01, 579.64, 576.5, 576.17, 575.7, 573.23, 570.27, 573.44, 573.33, 571.56, 570.64], '1W': [651.88, 638.72, 598.37, 539, 570.64], '1M': [526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539, 570.64], 'YTD': [172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 459.62, 531.18, 575.5, 529.29, 746.23, 586.45, 570.64], '6M': [219.38, 214, 241.9, 279.7, 269.41, 273.74, 284.67, 290.95, 261.3, 268.81, 304.9, 296.14, 297.73, 337.88, 361.69, 403.12, 434.52, 463.91, 489.15, 459.62, 531.18, 575.5, 529.29, 746.23, 586.45, 570.64], '1Y': [65.22, 66.93, 68.74, 68.99, 77.29, 74.64, 75.06, 76.97, 80.34, 93.29, 102.39, 112.41, 116.74, 125.28, 118.86, 121.53, 129.43, 150.21, 162.96, 157.83, 139.19, 163.54, 169.78, 172.04, 176.76, 176.06, 219.38, 214, 241.9, 279.7, 269.41, 273.74, 284.67, 282.25, 259.03, 261.18, 304.9, 296.14, 297.73, 337.88, 361.69, 403.12, 434.52, 463.91, 489.15, 486.46, 531.18, 575.5, 529.29, 746.23, 586.45, 570.64] },
      velocityScore: { '1D': null, '1W': 0.5, '1M': 46.8, '6M': null }, isNew: false,
      marketCap: '$197B', pe: 34.1, revenueGrowth: 46, eps: 16.71, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { PTF: 4.16, WCLD: false, IGV: false, FDTX: 4.49, GTEK: false, ARKK: false, MARS: false, FRWD: 4.36, BCTK: false, FWD: false, CBSE: false, FCUS: 4.71, WGMI: false, CNEQ: 4.54, SGRT: 11.15, SPMO: 1.79, XMMO: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 7, avgWeight: 4.44, proScore: 1.83, coverage: 0.412,
      price: 453.5, weeklyPrices: [455.10, 477.57, 444.23, 434.16, 453.50], weeklyChange: -0.35, dayChange: 4.45, sortRank: 0, periodReturns: { '1M': 9.2, 'YTD': 49.2, '6M': 38.5, '1Y': 97.9 },
      priceHistory: { '1D': [434.16, 455.56, 455.2, 454.35, 459.18, 458.81, 457.49, 456.69, 456.5, 455.6, 455.56, 458.29, 458.11, 457.11, 459.04, 458.08, 456.83, 456.28, 455.15, 455.82, 456.36, 455.49, 454.29, 453.5], '1W': [455.1, 477.57, 444.23, 434.16, 453.5], '1M': [426.8, 427.92, 408.75, 421.07, 423.93, 441.4, 425.83, 432.15, 462.12, 467.67, 436.39, 440.83, 434.99, 432.35, 455.1, 477.57, 444.23, 434.16, 453.5], 'YTD': [303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 370.04, 369.11, 348.7, 340.23, 338.45, 316.5, 365.9, 375.1, 387.44, 393.83, 419.5, 399.8, 401.62, 424.86, 444.92, 421.07, 462.12, 432.35, 453.5], '6M': [327.43, 331.21, 326.12, 342.3, 325.74, 374.09, 360.39, 387.73, 357.44, 354.56, 339.57, 347.75, 341.49, 365.49, 363.35, 382.66, 396.06, 414.15, 417.72, 401.62, 424.86, 444.92, 421.07, 462.12, 432.35, 453.5], '1Y': [229.17, 228.67, 238.85, 242.75, 239, 242.09, 238.88, 232.99, 230.87, 247.19, 261.38, 272.63, 273.23, 302.4, 302.89, 297.7, 294.96, 300.43, 286.5, 284.82, 275.06, 287.68, 301.87, 287.74, 293.28, 299.58, 327.43, 331.21, 326.12, 342.3, 325.74, 374.09, 360.39, 376.81, 353.86, 336.71, 339.57, 347.75, 341.49, 365.49, 363.35, 382.66, 396.06, 414.15, 417.72, 407.15, 424.86, 444.92, 421.07, 462.12, 432.35, 453.5] },
      velocityScore: { '1D': null, '1W': 10.9, '1M': 8.9, '6M': null }, isNew: false,
      marketCap: '$2.4T', pe: 39.4, revenueGrowth: 35, eps: 11.51, grossMargin: 62, dividendYield: 0.88,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6.39, GTEK: false, ARKK: 0.91, MARS: false, FRWD: 6.1, BCTK: 8.62, FWD: false, CBSE: 2.58, FCUS: false, WGMI: 0.72, CNEQ: 5.75, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 7, avgWeight: 3.69, proScore: 1.52, coverage: 0.412,
      price: 553.24, weeklyPrices: [539.49, 580.91, 540.88, 517.82, 553.24], weeklyChange: 2.55, dayChange: 6.84, sortRank: 0, periodReturns: { '1M': 18.6, 'YTD': 158.3, '6M': 158.1, '1Y': 310.4 },
      priceHistory: { '1D': [517.82, 547.32, 560.48, 562.69, 568.4, 568.23, 567.65, 569.9, 566.95, 566.09, 563.99, 568.76, 567.05, 566.06, 563.38, 562.45, 562.84, 559.55, 557.9, 558.24, 557.75, 555.22, 554.08, 553.24], '1W': [539.49, 580.91, 540.88, 517.82, 553.24], '1M': [490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 553.24], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 518.09, 523.2, 488.45, 537.37, 521.58, 553.24], '6M': [214.35, 220.97, 249.8, 252.74, 200.19, 213.58, 203.37, 210.86, 202.07, 204.83, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 354.49, 408.46, 449.7, 447.58, 518.09, 523.2, 488.45, 537.37, 521.58, 553.24], '1Y': [134.8, 146.24, 157, 173.66, 176.78, 172.28, 177.51, 167.76, 162.63, 151.41, 161.16, 159.79, 161.36, 203.71, 216.42, 240.56, 252.92, 256.12, 233.54, 246.81, 203.78, 219.76, 221.11, 207.58, 214.95, 215.34, 214.35, 220.97, 249.8, 252.74, 200.19, 213.58, 203.37, 203.68, 199.45, 197.74, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 354.49, 408.46, 449.7, 449.59, 518.09, 523.2, 488.45, 537.37, 521.58, 553.24] },
      velocityScore: { '1D': null, '1W': -12.1, '1M': 5.6, '6M': null }, isNew: false,
      marketCap: '$902B', pe: 184.4, revenueGrowth: 38, eps: 3, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.4, MARS: false, FRWD: 7.4, BCTK: 3.29, FWD: 2.19, CBSE: false, FCUS: false, WGMI: false, CNEQ: 1.08, SGRT: 3.36, SPMO: 4.14, XMMO: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 7, avgWeight: 3.56, proScore: 1.46, coverage: 0.412,
      price: 374.25, weeklyPrices: [372.45, 377.75, 369.34, 360.45, 374.25], weeklyChange: 0.48, dayChange: 3.83, sortRank: 0, periodReturns: { '1M': -3, 'YTD': 8.1, '6M': 8.9, '1Y': 36.5 },
      priceHistory: { '1D': [360.45, 383.01, 380.01, 380.4, 380.64, 379.67, 378.14, 377.71, 375.3, 374.96, 373.45, 373.6, 373.85, 374.55, 374.91, 375.31, 375.15, 375.1, 375.4, 376.01, 376.39, 376.74, 375.08, 374.25], '1W': [372.45, 377.75, 369.34, 360.45, 374.25], '1M': [396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45, 374.25], 'YTD': [346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 417.76, 426.58, 418.91, 385.57, 411.35, 365.02, 374.25], '6M': [343.77, 354.61, 328.8, 333.24, 308.05, 342.76, 333.99, 332.31, 317.53, 341.57, 315.93, 318.81, 313.49, 354.91, 398.47, 419.94, 417.43, 412.56, 439.79, 417.76, 426.58, 418.91, 385.57, 411.35, 365.02, 374.25], '1Y': [274.18, 275.6, 288.21, 294.3, 297.72, 303.9, 306.34, 294, 297.39, 345.65, 364.09, 338.79, 327.9, 335.49, 356.7, 349.24, 354.13, 369.63, 349.43, 342.46, 340.2, 386.08, 401.1, 339.81, 341.45, 349.85, 343.77, 354.61, 328.8, 333.24, 308.05, 342.76, 333.99, 321.7, 332.77, 335.97, 315.93, 318.81, 313.49, 354.91, 398.47, 419.94, 417.43, 412.56, 439.79, 414.57, 426.58, 418.91, 385.57, 411.35, 365.02, 374.25] },
      velocityScore: { '1D': null, '1W': -2, '1M': 3.5, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 62.2, revenueGrowth: 48, eps: 6.02, grossMargin: 76, dividendYield: 0.72,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.62, GTEK: false, ARKK: 1.01, MARS: false, FRWD: 4.71, BCTK: 6.52, FWD: 1.84, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.11, SGRT: false, SPMO: 6.09, XMMO: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 6, avgWeight: 3.14, proScore: 1.11, coverage: 0.353,
      price: 245.35, weeklyPrices: [240.14, 238.34, 241.70, 242.67, 245.35], weeklyChange: 2.17, dayChange: 1.1, sortRank: 0, periodReturns: { '1M': -0.3, 'YTD': 6.3, '6M': 1.8, '1Y': 9.8 },
      priceHistory: { '1D': [242.67, 241.98, 241.58, 241.88, 242.7, 242.93, 243.26, 243.04, 242.68, 243.98, 244.49, 244.68, 245.47, 245.28, 245.6, 245.66, 244.82, 244.71, 244.65, 244.82, 245.22, 245.15, 245.59, 245.35], '1W': [240.14, 238.34, 241.7, 242.67, 245.35], '1M': [245.22, 244.19, 238, 241.51, 238.55, 246.02, 246, 237.5, 244.39, 232.79, 234.11, 234.27, 227.01, 232.69, 240.14, 238.34, 241.7, 242.67, 245.35], 'YTD': [230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 198.79, 205.27, 208.39, 213.49, 211.74, 210.14, 200.95, 221.25, 248.5, 255.36, 263.04, 274.99, 270.13, 265.01, 274, 253.79, 241.51, 244.39, 232.69, 245.35], '6M': [240.93, 242.6, 231.31, 243.01, 232.99, 204.08, 204.86, 210.64, 216.82, 212.65, 209.87, 211.71, 210.57, 233.65, 249.7, 255.08, 265.06, 271.17, 267.22, 265.01, 274, 253.79, 241.51, 244.39, 232.69, 245.35], '1Y': [223.47, 225.69, 229.3, 232.79, 211.65, 221.3, 231.03, 228.84, 229, 235.84, 231.43, 227.63, 222.17, 220.9, 220.07, 216.48, 224.21, 244.22, 244.41, 234.69, 220.69, 233.88, 226.89, 222.54, 228.43, 232.53, 240.93, 242.6, 231.31, 243.01, 232.99, 204.08, 204.86, 207.92, 218.94, 209.53, 209.87, 211.71, 210.57, 233.65, 249.7, 255.08, 265.06, 271.17, 267.22, 268.46, 274, 253.79, 241.51, 244.39, 232.69, 245.35] },
      velocityScore: { '1D': null, '1W': -3.5, '1M': -8.3, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 32, revenueGrowth: 17, eps: 7.67, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.29, GTEK: false, ARKK: 2.36, MARS: false, FRWD: 3.05, BCTK: 4.34, FWD: 1.55, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.27, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'SPCX', name: 'SPACE EXPLORATION TECHN-CL A', easyScore: 5, avgWeight: 8.22, proScore: 2.42, coverage: 0.294,
      price: 158.17, weeklyPrices: [164.19, 170.86, 157.54, 162.00, 158.17], weeklyChange: -3.67, dayChange: -2.36, sortRank: 0, periodReturns: { '1M': -1.7, 'YTD': -1.7, '6M': -1.7, '1Y': -1.7 },
      priceHistory: { '1D': [162, 164.32, 166, 164.96, 163.21, 164, 162.55, 161.42, 161.87, 161.71, 160.12, 160.77, 160.48, 160.36, 161.57, 161.55, 161.71, 162.29, 162.27, 161.05, 161.25, 160.68, 159.21, 158.17], '1W': [164.19, 170.86, 157.54, 162, 158.17], '1M': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 158.17], 'YTD': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 158.17], '6M': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 158.17], '1Y': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 158.17] },
      velocityScore: { '1D': null, '1W': -4.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.1T', pe: null, revenueGrowth: 15, eps: -0.68, grossMargin: 49, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.22, MARS: 22.2, FRWD: 2.51, BCTK: 8.68, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.5, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'SPACE EXPLORATION TECHN-CL A appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 8.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LRCX', name: 'Lam Research Corp', easyScore: 5, avgWeight: 4.45, proScore: 1.31, coverage: 0.294,
      price: 350.92, weeklyPrices: [410.91, 433.33, 391.26, 351.41, 350.92], weeklyChange: -14.6, dayChange: -0.14, sortRank: 0, periodReturns: { '1M': 15.7, 'YTD': 105, '6M': 69.6, '1Y': 257.6 },
      priceHistory: { '1D': [351.41, 363.02, 363.26, 360.86, 363.07, 363.05, 363.64, 363.59, 361.1, 359.26, 356.48, 359.99, 359.72, 358.18, 359.03, 357.12, 356.32, 355.69, 353.89, 352.36, 353.19, 352.95, 351.37, 350.92], '1W': [410.91, 433.33, 391.26, 351.41, 350.92], '1M': [324.45, 327.16, 321.8, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04, 409.54, 371.33, 374.8, 401.82, 379.09, 410.91, 433.33, 391.26, 351.41, 350.92], 'YTD': [171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 242.27, 231, 211.15, 219.4, 233.31, 199.93, 246.49, 265.16, 265.55, 248.75, 297.17, 295.44, 292.09, 318, 336.41, 362.52, 389.04, 379.09, 350.92], '6M': [206.96, 214.38, 228.39, 239.58, 209.78, 235.12, 237.39, 249.48, 222.99, 218.87, 224.71, 233.45, 222.01, 258.76, 260.96, 258.56, 257.86, 286.52, 299.15, 292.09, 318, 336.41, 362.52, 389.04, 379.09, 350.92], '1Y': [98.14, 99.62, 101.74, 98.62, 98.41, 102, 99.51, 100.08, 100.15, 105.07, 119.21, 132.2, 131.09, 149.15, 137.81, 144.05, 151.68, 157.46, 159.35, 148.26, 142.65, 154.79, 162.74, 164.3, 175.26, 173.78, 206.96, 214.38, 228.39, 239.58, 209.78, 235.12, 237.39, 239.07, 214.68, 209.49, 224.71, 233.45, 222.01, 258.76, 260.96, 258.56, 257.86, 286.52, 299.15, 302.24, 318, 336.41, 362.52, 389.04, 379.09, 350.92] },
      velocityScore: { '1D': null, '1W': -5.8, '1M': 2.3, '6M': null }, isNew: false,
      marketCap: '$439B', pe: 66.1, revenueGrowth: 24, eps: 5.31, grossMargin: 50, dividendYield: 0.3,
      etfPresence: { PTF: 3.11, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.72, BCTK: 7.6, FWD: 1.91, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 3.89, XMMO: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 5, avgWeight: 4.21, proScore: 1.24, coverage: 0.294,
      price: 361.75, weeklyPrices: [351.28, 353.33, 357.89, 356.18, 361.75], weeklyChange: 2.98, dayChange: 1.56, sortRank: 0, periodReturns: { '1M': -1.1, 'YTD': 15.3, '6M': 15, '1Y': 103.7 },
      priceHistory: { '1D': [356.18, 357.5, 354.77, 354.85, 356.46, 356.8, 358.21, 358.72, 358.65, 359.28, 359.79, 360.2, 360.54, 360.66, 361.4, 362.14, 361.05, 361.14, 361.55, 361.5, 361.9, 361.31, 362.24, 361.75], '1W': [351.28, 353.33, 357.89, 356.18, 361.75], '1M': [361.17, 362.29, 353.32, 356.56, 358.16, 367.11, 371.1, 362.1, 367.46, 348.78, 346.08, 345.04, 342.19, 334.69, 351.28, 353.33, 357.89, 356.18, 361.75], 'YTD': [313.8, 326.01, 333.16, 328.43, 338.53, 323.1, 306.02, 311.69, 306.36, 306.01, 304.42, 299.02, 273.14, 314.74, 334.47, 337.73, 347.31, 395.14, 399.04, 384.9, 386.12, 369.27, 356.56, 367.46, 334.69, 361.75], '6M': [314.55, 336.43, 328.38, 336.28, 333.34, 311.33, 303.56, 313.03, 303.45, 308.42, 306.3, 289.59, 294.9, 316.37, 332.77, 337.75, 381.94, 395.3, 397.17, 384.9, 386.12, 369.27, 356.56, 367.46, 334.69, 361.75], '1Y': [177.56, 182.81, 191.15, 193.42, 195.75, 201.63, 204.91, 206.72, 213.53, 234.16, 251.76, 252.88, 244.36, 251.51, 244.64, 257.02, 260.51, 281.82, 279.7, 276.98, 299.65, 315.12, 314.45, 309.32, 311.33, 314.55, 314.55, 336.43, 328.38, 336.28, 333.34, 311.33, 303.56, 307.15, 300.91, 303.21, 306.3, 289.59, 294.9, 316.37, 332.77, 337.75, 381.94, 395.3, 397.17, 383.47, 386.12, 369.27, 356.56, 367.46, 334.69, 361.75] },
      velocityScore: { '1D': null, '1W': 6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.4T', pe: 27.6, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.21, GTEK: false, ARKK: 1.86, MARS: false, FRWD: false, BCTK: 6.51, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 5.89, SGRT: false, SPMO: 3.6, XMMO: false },
      tonyNote: 'Alphabet Inc Class C appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 4.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 5, avgWeight: 4.19, proScore: 1.23, coverage: 0.294,
      price: 854.34, weeklyPrices: [968.53, 965.00, 915.19, 820.16, 854.34], weeklyChange: -11.79, dayChange: 4.17, sortRank: 0, periodReturns: { '1M': 0.8, 'YTD': 210.2, '6M': 158.6, '1Y': 475.7 },
      priceHistory: { '1D': [820.16, 868, 868.66, 871.7, 881.69, 880.52, 884.42, 880.25, 875.21, 868.78, 865.97, 866.16, 867.78, 864.32, 863.86, 859.05, 859.63, 858.85, 853, 848.95, 852.83, 856.46, 853.47, 854.34], '1W': [968.53, 965, 915.19, 820.16, 854.34], '1M': [876.77, 846.01, 815.99, 868.09, 931.04, 1018.8, 1031.34, 1066.07, 1070.23, 1094.04, 1038.59, 993.25, 1025.36, 899.9, 968.53, 965, 915.19, 820.16, 854.34], 'YTD': [275.39, 284.47, 320.32, 346.1, 407.69, 429.32, 425.99, 407.4, 379.52, 374.33, 398.78, 404.02, 362.43, 496.3, 519.6, 579.88, 643.3, 786.42, 817.35, 751.07, 880.72, 925.99, 868.09, 1070.23, 899.9, 854.34], '6M': [330.42, 318.44, 344.22, 442.93, 418.63, 407.25, 408.97, 421.85, 375.01, 385.97, 406.77, 413.22, 423.12, 500.77, 531.81, 587.62, 673.64, 766.44, 804.76, 751.07, 880.72, 925.99, 868.09, 1070.23, 899.9, 854.34], '1Y': [148.39, 149.08, 149.63, 150.46, 154.81, 151.69, 154.43, 159.21, 167.4, 189.24, 211.12, 229.33, 229.14, 242.83, 219.51, 214.4, 234.12, 255.88, 279.35, 258.21, 237.49, 270.1, 285.41, 285.58, 282.85, 280.08, 330.42, 318.44, 344.22, 442.93, 418.63, 407.25, 408.97, 409.67, 367.34, 373.98, 406.77, 413.22, 423.12, 500.77, 531.81, 587.62, 673.64, 766.44, 804.76, 810.46, 880.72, 925.99, 868.09, 1070.23, 899.9, 854.34] },
      velocityScore: { '1D': null, '1W': -9.6, '1M': -38.2, '6M': null }, isNew: false,
      marketCap: '$193B', pe: 80.8, revenueGrowth: 44, eps: 10.58, grossMargin: 42, dividendYield: 0.36,
      etfPresence: { PTF: 3.57, WCLD: false, IGV: false, FDTX: 4.14, GTEK: false, ARKK: false, MARS: false, FRWD: 6.98, BCTK: false, FWD: false, CBSE: false, FCUS: 4.5, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.75, XMMO: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'CRWD', name: 'CrowdStrike', easyScore: 5, avgWeight: 2.7, proScore: 0.79, coverage: 0.294,
      price: 199.81, weeklyPrices: [185.73, 190.79, 193.18, 193.98, 199.81], weeklyChange: 7.58, dayChange: 3, sortRank: 0, periodReturns: { '1M': 19.1, 'YTD': 70.5, '6M': 74.4, '1Y': 58.1 },
      priceHistory: { '1D': [193.98, 200.85, 205.8, 204.26, 206.75, 205.85, 207.91, 206.44, 205.77, 203.99, 205.62, 205.4, 204.18, 203.15, 202.68, 201.76, 202.54, 201.88, 200.81, 201.41, 201.52, 201.11, 200.14, 199.81], '1W': [185.73, 190.79, 193.18, 193.98, 199.81], '1M': [164.7, 161.23, 161.93, 172.88, 170.7, 173.23, 169.87, 170.74, 171.21, 168.86, 170.23, 168.26, 169.66, 175.27, 185.73, 190.79, 193.18, 193.98, 199.81], 'YTD': [117.19, 115.97, 113.75, 113.12, 110.35, 98.88, 107.41, 87.58, 96.21, 108.53, 105.96, 103.33, 95.01, 106.63, 102.79, 116.67, 113.1, 117.02, 140.64, 162.53, 167.75, 179.77, 172.88, 171.21, 175.27, 199.81], '6M': [114.58, 117, 111.47, 117.3, 103.84, 103.95, 105.54, 90.83, 101.92, 110.51, 108.95, 96.46, 98.33, 98.67, 104.55, 111.35, 111.44, 126.43, 144.99, 162.53, 167.75, 179.77, 172.88, 171.21, 175.27, 199.81], '1Y': [126.36, 119.04, 120.39, 118.04, 113.71, 106.61, 106.97, 105.14, 105.93, 107.01, 111.19, 123.29, 122.11, 123.99, 127.15, 125.9, 131.83, 135.75, 134.95, 134.39, 122.67, 126.03, 128.8, 121.87, 120.79, 118.91, 114.58, 117, 111.47, 117.3, 103.84, 103.95, 105.54, 95.28, 106.54, 110.39, 108.95, 96.46, 98.33, 98.67, 104.55, 111.35, 111.44, 126.43, 144.99, 162.06, 167.75, 179.77, 172.88, 171.21, 175.27, 199.81] },
      velocityScore: { '1D': null, '1W': 3.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$203B', pe: null, revenueGrowth: 26, eps: -0.04, grossMargin: 75, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.54, IGV: 7.18, FDTX: 1.21, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 1.32, FWD: 1.23, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'CrowdStrike appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 2.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, avgWeight: 5.13, proScore: 1.21, coverage: 0.235,
      price: 385.23, weeklyPrices: [368.57, 373.02, 384.28, 390.49, 385.23], weeklyChange: 4.52, dayChange: -1.35, sortRank: 0, periodReturns: { '1M': -7.5, 'YTD': -20.3, '6M': -19.5, '1Y': -22.6 },
      priceHistory: { '1D': [390.49, 382.22, 383.93, 383.58, 383.66, 383.79, 383.19, 384.7, 385.23, 385.43, 386.23, 386.6, 386.58, 386.44, 385.71, 384.05, 384.03, 384.51, 384.95, 385.9, 385.77, 385.47, 385.38, 385.23], '1W': [368.57, 373.02, 384.28, 390.49, 385.23], '1M': [411.74, 403.41, 397.36, 390.34, 390.74, 399.76, 393.83, 378.91, 379.4, 367.34, 373.94, 365.46, 352.83, 372.97, 368.57, 373.02, 384.28, 390.49, 385.23], 'YTD': [483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 384.47, 398.55, 409.41, 399.95, 383, 358.96, 374.33, 411.22, 432.92, 424.46, 413.96, 405.21, 421.06, 426.99, 428.05, 390.34, 379.4, 372.97, 385.23], '6M': [478.51, 470.67, 444.11, 481.63, 414.19, 404.37, 398.46, 400.6, 405.2, 404.88, 391.79, 371.04, 369.37, 373.07, 420.26, 415.75, 407.78, 420.77, 409.43, 421.06, 426.99, 428.05, 390.34, 379.4, 372.97, 385.23], '1Y': [497.72, 503.02, 510.06, 512.5, 535.64, 521.77, 520.17, 507.23, 506.69, 498.2, 515.36, 514.45, 514.6, 528.57, 514.05, 516.79, 523.61, 517.81, 496.82, 510.18, 472.12, 486.74, 491.02, 474.82, 484.92, 487.48, 478.51, 470.67, 444.11, 481.63, 414.19, 404.37, 398.46, 401.72, 410.68, 401.86, 391.79, 371.04, 369.37, 373.07, 420.26, 415.75, 407.78, 420.77, 409.43, 419.09, 426.99, 428.05, 390.34, 379.4, 372.97, 385.23] },
      velocityScore: { '1D': null, '1W': -2.4, '1M': 0.8, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 22.9, revenueGrowth: 18, eps: 16.79, grossMargin: 68, dividendYield: 0.93,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.19, FDTX: 2.93, GTEK: false, ARKK: false, MARS: false, FRWD: 3.13, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 6.28, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks', easyScore: 4, avgWeight: 4.68, proScore: 1.1, coverage: 0.235,
      price: 356.36, weeklyPrices: [332.00, 341.02, 352.04, 348.06, 356.36], weeklyChange: 7.34, dayChange: 2.38, sortRank: 0, periodReturns: { '1M': 31, 'YTD': 93.5, '6M': 91.7, '1Y': 76.9 },
      priceHistory: { '1D': [348.06, 354.88, 362.99, 360.35, 362.54, 362.84, 365.72, 363.96, 363.32, 361.44, 360.59, 359.64, 357.99, 357.35, 358.39, 356.67, 357.83, 357.82, 356.89, 356.98, 357.7, 358.05, 356.86, 356.36], '1W': [332, 341.02, 352.04, 348.06, 356.36], '1M': [266.33, 260.52, 263.22, 279.53, 279.62, 284.54, 279.9, 282.13, 287.78, 286.4, 290.92, 285.26, 293.09, 304.2, 332, 341.02, 352.04, 348.06, 356.36], 'YTD': [184.2, 190.8, 187.73, 180.18, 176.97, 159.32, 166.95, 144.14, 150.15, 165.1, 167.45, 164.05, 154.35, 173.78, 164.11, 181.2, 181.54, 183.68, 227.79, 246.66, 257.77, 279.25, 279.53, 287.78, 304.2, 356.36], '6M': [185.86, 190.85, 181.47, 183.74, 166.72, 165.3, 150.99, 144.84, 158.56, 164.93, 168.91, 153.22, 160.67, 166.99, 166.97, 173.21, 179.32, 196.53, 238.21, 246.66, 257.77, 279.25, 279.53, 287.78, 304.2, 356.36], '1Y': [201.42, 190.72, 199.88, 204.5, 171, 168.17, 177.09, 185.88, 190.52, 197.38, 201.28, 208.18, 203.96, 212.58, 213.28, 211.82, 217.11, 220.24, 212.29, 205.25, 182.9, 187.73, 195.35, 185.88, 189.49, 186.85, 185.86, 190.85, 181.47, 183.74, 166.72, 165.3, 150.99, 149.4, 163.16, 168.12, 168.91, 153.22, 160.67, 166.99, 166.97, 173.21, 179.32, 196.53, 238.21, 252.92, 257.77, 279.25, 279.53, 287.78, 304.2, 356.36] },
      velocityScore: { '1D': null, '1W': 8.9, '1M': 3.8, '6M': null }, isNew: false,
      marketCap: '$290B', pe: 309.9, revenueGrowth: 31, eps: 1.15, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.97, IGV: 10.26, FDTX: 4.15, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.33, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 4, avgWeight: 4.37, proScore: 1.03, coverage: 0.235,
      price: 414.48, weeklyPrices: [411.84, 420.60, 425.30, 393.45, 414.48], weeklyChange: 0.64, dayChange: 5.35, sortRank: 0, periodReturns: { '1M': 6, 'YTD': -7.8, '6M': -4.3, '1Y': 41 },
      priceHistory: { '1D': [393.45, 392.66, 401.36, 402.25, 403.7, 405.31, 404.88, 403.8, 407.57, 409.88, 410.38, 412.57, 412.52, 413.22, 416.51, 417.92, 416.71, 417.58, 417.7, 418.97, 418.05, 417.72, 415.36, 414.48], '1W': [411.84, 420.6, 425.3, 393.45, 414.48], '1M': [408.95, 396.68, 381.59, 399.15, 406.43, 411.15, 404.66, 396.38, 400.49, 405.05, 381.61, 375.53, 375.12, 379.71, 411.84, 420.6, 425.3, 393.45, 414.48], 'YTD': [449.72, 435.8, 438.57, 449.06, 430.41, 411.11, 417.44, 399.83, 403.32, 398.68, 395.56, 380.85, 355.28, 343.25, 391.95, 387.51, 372.8, 398.73, 445.27, 417.26, 442.1, 418.45, 399.15, 400.49, 379.71, 414.48], '6M': [432.96, 447.2, 431.44, 431.46, 406.01, 428.27, 411.71, 417.4, 405.94, 407.82, 392.78, 385.95, 381.26, 345.62, 388.9, 373.72, 381.63, 411.79, 443.3, 417.26, 442.1, 418.45, 399.15, 400.49, 379.71, 414.48], '1Y': [293.94, 316.9, 328.49, 325.59, 309.26, 339.03, 330.56, 340.01, 333.87, 346.4, 410.04, 434.21, 443.21, 453.25, 435.9, 447.43, 433.72, 456.56, 429.52, 404.35, 391.09, 430.14, 439.58, 475.31, 488.73, 454.43, 432.96, 447.2, 431.44, 431.46, 406.01, 428.27, 411.71, 408.58, 405.55, 395.01, 392.78, 385.95, 381.26, 345.62, 388.9, 373.72, 381.63, 411.79, 443.3, 417.85, 442.1, 418.45, 399.15, 400.49, 379.71, 414.48] },
      velocityScore: { '1D': null, '1W': 12, '1M': -8, '6M': null }, isNew: false,
      marketCap: '$1.6T', pe: 376.8, revenueGrowth: 16, eps: 1.1, grossMargin: 19, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 9.87, MARS: false, FRWD: false, BCTK: 3.22, FWD: 1.31, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.06, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 4, avgWeight: 3.57, proScore: 0.84, coverage: 0.235,
      price: 1720.96, weeklyPrices: [2050.39, 2273.73, 2032.22, 1745.00, 1720.96], weeklyChange: -16.07, dayChange: -1.38, sortRank: 0, periodReturns: { '1M': 10.4, 'YTD': 625, '6M': 392.2, '1Y': 3705.7 },
      priceHistory: { '1D': [1745, 1792.39, 1806.57, 1798.93, 1804.02, 1805.09, 1823.31, 1831.37, 1817.74, 1793.34, 1804.03, 1801.85, 1809.67, 1809.29, 1814.36, 1802.51, 1789.49, 1786.42, 1775.34, 1758, 1762, 1738, 1721.99, 1720.96], '1W': [2050.39, 2273.73, 2032.22, 1745, 1720.96], '1M': [1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 1745, 1720.96], 'YTD': [237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1447.23, 1392.56, 1641.64, 1759.68, 1881.51, 2184.75, 2090.71, 1720.96], '6M': [349.63, 389.81, 501.29, 527.63, 584.55, 599.34, 621.09, 632.38, 599.06, 655.43, 753.69, 677.86, 692.73, 851.57, 919.47, 932.43, 1096.51, 1339.96, 1382.72, 1392.56, 1641.64, 1759.68, 1881.51, 2184.75, 2090.71, 1720.96], '1Y': [45.22, 42.48, 41.61, 41.89, 42.51, 43.37, 44.54, 46.37, 52.47, 70.5, 90.09, 102.92, 113.5, 121.17, 134.61, 148.04, 186.16, 199.33, 239.48, 254.16, 200.27, 210.17, 225.47, 201.87, 241.05, 240.22, 349.63, 389.81, 501.29, 527.63, 584.55, 599.34, 621.09, 651.9, 565.59, 618.82, 753.69, 677.86, 692.73, 851.57, 919.47, 932.43, 1096.51, 1339.96, 1382.72, 1542.24, 1641.64, 1759.68, 1881.51, 2184.75, 2090.71, 1720.96] },
      velocityScore: { '1D': null, '1W': -27, '1M': -6.7, '6M': null }, isNew: false,
      marketCap: '$255B', pe: 58.7, revenueGrowth: 251, eps: 29.32, grossMargin: 56, dividendYield: null,
      etfPresence: { PTF: 5.17, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.35, CBSE: false, FCUS: 5.24, WGMI: false, CNEQ: false, SGRT: false, SPMO: 2.52, XMMO: false },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 4, avgWeight: 3.57, proScore: 0.84, coverage: 0.235,
      price: 132.09, weeklyPrices: [115.70, 116.67, 125.73, 129.30, 132.09], weeklyChange: 14.17, dayChange: 2.16, sortRank: 0, periodReturns: { '1M': -2.5, 'YTD': -25.7, '6M': -26.5, '1Y': -5.1 },
      priceHistory: { '1D': [129.3, 130.42, 132.16, 130.88, 131, 130.72, 130.95, 130.64, 130.18, 131.47, 133.14, 132.72, 133.38, 133.7, 133.87, 133.51, 133.48, 133.19, 132.83, 132.88, 133.13, 132.98, 132.89, 132.09], '1W': [115.7, 116.67, 125.73, 129.3, 132.09], '1M': [136.47, 132.07, 130.21, 131.08, 127.99, 134.71, 133.25, 130.63, 128.47, 119.5, 116.7, 113.5, 107.27, 112.93, 115.7, 116.67, 125.73, 129.3, 132.09], 'YTD': [177.75, 176.86, 177.07, 169.6, 146.59, 135.9, 131.41, 130.6, 145.17, 156.43, 152.72, 160.84, 137.55, 140.76, 142.15, 152.62, 137.97, 133.79, 130.05, 137.15, 143.34, 141.7, 131.08, 128.47, 112.93, 132.09], '6M': [179.71, 178.96, 165.33, 157.35, 139.54, 135.68, 134.89, 134.19, 153.19, 151.6, 152.77, 154.96, 146.49, 130.49, 142.76, 141.57, 139.11, 137.05, 133.73, 137.15, 143.34, 141.7, 131.08, 128.47, 112.93, 132.09], '1Y': [139.12, 149.15, 151.79, 157.88, 160.66, 182.68, 177.17, 158.74, 156.71, 156.1, 171.21, 179.33, 178.86, 179.53, 177.21, 181.59, 184.63, 200.47, 177.93, 174.01, 154.85, 167.49, 181.49, 183.25, 193.98, 180.84, 179.71, 178.96, 165.33, 157.35, 139.54, 135.68, 134.89, 135.94, 152.67, 153.5, 152.77, 154.96, 146.49, 130.49, 142.76, 141.57, 139.11, 137.05, 133.73, 137.41, 143.34, 141.7, 131.08, 128.47, 112.93, 132.09] },
      velocityScore: { '1D': null, '1W': 9.1, '1M': -14.3, '6M': null }, isNew: false,
      marketCap: '$317B', pe: 148.4, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.27, FDTX: 2, GTEK: false, ARKK: 2.86, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.14, XMMO: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'DDOG', name: 'DDOG', easyScore: 4, avgWeight: 3.03, proScore: 0.71, coverage: 0.235,
      price: 257.21, weeklyPrices: [248.57, 260.36, 264.48, 260.36, 257.21], weeklyChange: 3.48, dayChange: -1.21, sortRank: 0, periodReturns: { '1M': 9.9, 'YTD': 89.1, '6M': 87.6, '1Y': 68.8 },
      priceHistory: { '1D': [260.36, 256.42, 259.21, 256.87, 258.39, 259.37, 258.86, 257.83, 257.38, 257.72, 259.92, 260.23, 259.9, 259.83, 259.9, 258.66, 258.19, 258.8, 257.95, 258.17, 258.87, 258.29, 257.67, 257.21], '1W': [248.57, 260.36, 264.48, 260.36, 257.21], '1M': [231.68, 227.34, 227.63, 234.24, 229.9, 233.09, 231.11, 226.63, 223, 221.37, 220.57, 222.65, 220.94, 239.77, 248.57, 260.36, 264.48, 260.36, 257.21], 'YTD': [135.99, 130.68, 120.86, 130.13, 129.32, 111.69, 125.2, 102.61, 111.11, 128.56, 126.57, 129.23, 115.81, 116.5, 121.06, 132.14, 133.98, 143.71, 205.31, 212.24, 225.24, 243.6, 234.24, 223, 239.77, 257.21], '6M': [137.1, 125.5, 123.46, 140.56, 115.71, 127.33, 120.6, 110.33, 118.33, 127.49, 131.26, 123.29, 118.67, 108.98, 123.47, 127.86, 132.19, 188.73, 202.84, 212.24, 225.24, 243.6, 234.24, 223, 239.77, 257.21], '1Y': [152.41, 138.8, 145.27, 150.77, 139.13, 128.83, 127.25, 131.22, 136.68, 136.44, 138.65, 138.35, 145.26, 157.36, 164.2, 156.29, 156.47, 162.81, 191.24, 185.01, 157.55, 157.9, 154.28, 142.05, 141.84, 137.48, 137.1, 125.5, 123.46, 140.56, 115.71, 127.33, 120.6, 116.46, 122.36, 127.16, 131.26, 123.29, 118.67, 108.98, 123.47, 127.86, 132.19, 188.73, 202.84, 218.04, 225.24, 243.6, 234.24, 223, 239.77, 257.21] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$92B', pe: 659.5, revenueGrowth: 32, eps: 0.39, grossMargin: 80, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.86, IGV: 3.16, FDTX: 2.39, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: 3.71, SPMO: false, XMMO: false },
      tonyNote: 'DDOG appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SHOP', name: 'Shopify Inc Registered Shs -A- Subord Vtg', easyScore: 4, avgWeight: 2.98, proScore: 0.7, coverage: 0.235,
      price: 120.2, weeklyPrices: [114.21, 114.18, 121.63, 119.46, 120.20], weeklyChange: 5.24, dayChange: 0.62, sortRank: 0, periodReturns: { '1M': 9.7, 'YTD': -25.3, '6M': -28.6, '1Y': 3 },
      priceHistory: { '1D': [119.46, 116.75, 117.41, 116.68, 115.94, 115.77, 116.14, 116.1, 116.74, 117.68, 120.5, 119.69, 119.87, 119.85, 120.63, 120.65, 120.39, 120.68, 120.5, 120.33, 120.82, 120.58, 120.42, 120.2], '1W': [114.21, 114.18, 121.63, 119.46, 120.2], '1M': [110.78, 110.42, 108.2, 110.47, 108.24, 112.49, 113.23, 108.09, 108.85, 107.98, 107.68, 114.17, 111.62, 116.86, 114.21, 114.18, 121.63, 119.46, 120.2], 'YTD': [160.97, 168.28, 157.99, 137.89, 131.23, 112.05, 112.7, 117.28, 119.38, 133.5, 126.58, 121.1, 111.77, 120.1, 127.41, 131.96, 121.26, 105.44, 95.4, 105.01, 115.03, 116.04, 110.47, 108.85, 116.86, 120.2], '6M': [168.45, 167.44, 138.54, 138.92, 114.02, 118.71, 123.8, 120.31, 129.65, 129.52, 123.75, 118.42, 118.52, 112.38, 126.94, 124.23, 121.13, 111.74, 97.42, 105.01, 115.03, 116.04, 110.47, 108.85, 116.86, 120.2], '1Y': [116.66, 116.74, 128.43, 126.84, 125.21, 147.5, 141.47, 142.11, 141.28, 146.22, 147.89, 157.12, 149, 164.5, 153.66, 164.71, 172.95, 173.86, 152.41, 146.04, 147.8, 149.28, 158.41, 159.85, 169.67, 163.74, 168.45, 167.44, 138.54, 138.92, 114.02, 118.71, 123.8, 125.94, 134.79, 126.17, 123.75, 118.42, 118.52, 112.38, 126.94, 124.23, 121.13, 111.74, 97.42, 104.86, 115.03, 116.04, 110.47, 108.85, 116.86, 120.2] },
      velocityScore: { '1D': null, '1W': null, '1M': -23.9, '6M': null }, isNew: true,
      marketCap: '$156B', pe: 117.8, revenueGrowth: 34, eps: 1.02, grossMargin: 48, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.59, GTEK: false, ARKK: 4.34, MARS: false, FRWD: 2.16, BCTK: 2.82, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Shopify Inc Registered Shs -A- Subord Vtg appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASML', name: 'ASML Holding', easyScore: 4, avgWeight: 2.77, proScore: 0.65, coverage: 0.235,
      price: 1834.28, weeklyPrices: [1883.11, 1989.44, 1843.04, 1769.32, 1834.28], weeklyChange: -2.59, dayChange: 3.67, sortRank: 0, periodReturns: { '1M': 11.7, 'YTD': 71.5, '6M': 47.7, '1Y': 133.6 },
      priceHistory: { '1D': [1769.32, 1829.88, 1841.5, 1840.59, 1861.82, 1857.76, 1853.08, 1856.85, 1858.56, 1855.3, 1853.44, 1859.19, 1864.6, 1855.1, 1858.78, 1855.24, 1854.16, 1851.46, 1847.61, 1844.98, 1846.21, 1844.9, 1839.55, 1834.28], '1W': [1883.11, 1989.44, 1843.04, 1769.32, 1834.28], '1M': [1749.04, 1777.77, 1734.19, 1899.48, 1863.55, 1892.66, 1803.89, 1867.83, 1929.68, 1929.25, 1778.46, 1762.77, 1841.18, 1794.62, 1883.11, 1989.44, 1843.04, 1769.32, 1834.28], 'YTD': [1069.86, 1194.32, 1331.6, 1389.04, 1423, 1413.01, 1406.61, 1485.99, 1423.54, 1357.42, 1375.56, 1369.62, 1253.96, 1421.05, 1481.77, 1443.66, 1394.08, 1544.74, 1581.58, 1550.13, 1605.77, 1757.47, 1899.48, 1929.68, 1794.62, 1834.28], '6M': [1242.19, 1270.16, 1360.09, 1422.92, 1339.13, 1435.63, 1458.93, 1526.51, 1399.37, 1386.68, 1355.17, 1393.89, 1359.76, 1448.64, 1410.83, 1417.8, 1438.99, 1516.6, 1584.51, 1550.13, 1605.77, 1757.47, 1899.48, 1929.68, 1794.62, 1834.28], '1Y': [785.09, 806.73, 719.68, 729.99, 699.36, 721.31, 742.16, 754.89, 742.62, 796.25, 867.3, 957.8, 962.61, 1043.3, 984.66, 1042.15, 1033.1, 1059.23, 1016.96, 1006.98, 966.57, 1087.99, 1119.69, 1087.82, 1056.98, 1072.14, 1242.19, 1270.16, 1360.09, 1422.92, 1339.13, 1435.63, 1458.93, 1463.8, 1368.36, 1351.58, 1355.17, 1393.89, 1359.76, 1448.64, 1410.83, 1417.8, 1438.99, 1516.6, 1584.51, 1592, 1605.77, 1757.47, 1899.48, 1929.68, 1794.62, 1834.28] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$707B', pe: 62.5, revenueGrowth: 13, eps: 29.37, grossMargin: 53, dividendYield: 0.5,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 4.79, BCTK: 2.17, FWD: 1.56, CBSE: 2.56, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'ASML Holding appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 2.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'PWR', name: 'PWR', easyScore: 3, avgWeight: 4.79, proScore: 2.87, coverage: 0.6,
      price: 677.12, weeklyPrices: [714.45, 720.04, 691.40, 668.31, 677.12], weeklyChange: -5.23, dayChange: 1.32, sortRank: 0, periodReturns: { '1M': -2.6, 'YTD': 60.4, '6M': 54.5, '1Y': 75.5 },
      priceHistory: { '1D': [668.31, 687.44, 688.16, 685.9, 687.28, 688.86, 685.6, 687.03, 684.6, 685.68, 685.5, 684.69, 684.13, 684.26, 684.97, 682.49, 683.28, 682.99, 679, 680.79, 680.21, 680.46, 678.35, 677.12], '1W': [714.45, 720.04, 691.4, 668.31, 677.12], '1M': [693.81, 691.95, 650.92, 683.29, 707.74, 724.35, 719.29, 714.85, 702.25, 740.14, 702.29, 701.88, 718.59, 687.87, 714.45, 720.04, 691.4, 668.31, 677.12], 'YTD': [422.06, 413.17, 447.64, 468.76, 474.63, 508.11, 524.08, 549.11, 572.66, 568.04, 574.02, 567.45, 533.78, 576.24, 591.82, 613.78, 628.6, 785.24, 773.72, 709.93, 730.1, 719.17, 683.29, 702.25, 687.87, 677.12], '6M': [438.22, 444.2, 473.24, 481.28, 464.57, 523.96, 554, 562.77, 568.38, 567.71, 572, 573.5, 560.12, 582.06, 587.42, 633.44, 727.77, 750.73, 780.08, 709.93, 730.1, 719.17, 683.29, 702.25, 687.87, 677.12], '1Y': [385.8, 387, 398.66, 411.99, 393.62, 384.12, 380.81, 379.84, 377.96, 375.53, 385.68, 396.02, 409.11, 427.8, 430.98, 440.74, 440.93, 449.13, 445.01, 429.3, 430.15, 452.23, 463.09, 435.87, 433.03, 428.81, 438.22, 444.2, 473.24, 481.28, 464.57, 523.96, 554, 565.05, 549.22, 566.91, 572, 573.5, 560.12, 582.06, 587.42, 633.44, 727.77, 750.73, 780.08, 716.91, 730.1, 719.17, 683.29, 702.25, 687.87, 677.12] },
      velocityScore: { '1D': null, '1W': -0.3, '1M': 11.2, '6M': null }, isNew: false,
      marketCap: '$102B', pe: 93, revenueGrowth: 26, eps: 7.28, grossMargin: 15, dividendYield: 0.07,
      etfPresence: { POW: 4.88, VOLT: 5.22, PBD: false, PBW: false, IVEP: 4.26 },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'ETN', name: 'ETN', easyScore: 3, avgWeight: 4.47, proScore: 2.68, coverage: 0.6,
      price: 413.62, weeklyPrices: [408.26, 426.12, 412.31, 398.52, 413.62], weeklyChange: 1.31, dayChange: 3.79, sortRank: 0, periodReturns: { '1M': 4.5, 'YTD': 29.9, '6M': 24.2, '1Y': 15.4 },
      priceHistory: { '1D': [398.52, 413.89, 418.93, 418.4, 417.63, 416.82, 416.38, 415.4, 414.17, 414.27, 413.95, 413.79, 413.08, 414.03, 415.76, 414.39, 414.7, 413.72, 413.71, 413.36, 413.74, 413.85, 413.17, 413.62], '1W': [408.26, 426.12, 412.31, 398.52, 413.62], '1M': [403.14, 401.72, 375.46, 393.64, 391.39, 407.06, 407.71, 409.64, 421.77, 435.78, 405.28, 404.59, 419.87, 402.68, 408.26, 426.12, 412.31, 398.52, 413.62], 'YTD': [318.51, 320.58, 333.46, 331.22, 351.42, 373.82, 389.25, 362.05, 377.4, 353.87, 361.04, 359.74, 343.53, 385.58, 395.06, 413.87, 410.77, 421.39, 406.94, 379.69, 401.94, 418.61, 393.64, 421.77, 402.68, 413.62], '6M': [332.97, 332.38, 337.96, 347.32, 365, 396.09, 377.32, 373.53, 354.46, 355.79, 360.54, 375, 365.56, 400.44, 392.73, 424.5, 433.01, 399.15, 408.1, 379.69, 401.94, 418.61, 393.64, 421.77, 402.68, 413.62], '1Y': [358.49, 360.29, 373.66, 392.76, 384.76, 360.11, 351.03, 347.61, 349.14, 349.49, 375.54, 378.31, 367.15, 380.02, 375.37, 377.69, 376.29, 381.56, 373.77, 352.39, 331.71, 339.71, 343.39, 333.21, 320.39, 320.86, 332.97, 332.38, 337.96, 347.32, 365, 396.09, 377.32, 374.59, 354.79, 348.64, 360.54, 375, 365.56, 400.44, 392.73, 424.5, 433.01, 399.15, 408.1, 381.51, 401.94, 418.61, 393.64, 421.77, 402.68, 413.62] },
      velocityScore: { '1D': null, '1W': 1.5, '1M': 11.2, '6M': null }, isNew: false,
      marketCap: '$161B', pe: 40.6, revenueGrowth: 17, eps: 10.2, grossMargin: 37, dividendYield: 1.1,
      etfPresence: { POW: 4.04, VOLT: 5.33, PBD: false, PBW: false, IVEP: 4.03 },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'GEV', name: 'GEV', easyScore: 3, avgWeight: 4.23, proScore: 2.54, coverage: 0.6,
      price: 1149.5, weeklyPrices: [1102.51, 1174.86, 1134.35, 1113.11, 1149.50], weeklyChange: 4.26, dayChange: 3.27, sortRank: 0, periodReturns: { '1M': 23.1, 'YTD': 75.9, '6M': 67.5, '1Y': 116.8 },
      priceHistory: { '1D': [1113.11, 1165.63, 1191.28, 1184.57, 1185.97, 1184.04, 1178.89, 1175.56, 1173.32, 1171.64, 1166.64, 1164, 1160.31, 1155.58, 1152.22, 1150.99, 1150.31, 1151.48, 1147.59, 1151.67, 1152.46, 1150.38, 1148.71, 1149.5], '1W': [1102.51, 1174.86, 1134.35, 1113.11, 1149.5], '1M': [933.85, 920.15, 867.09, 906.79, 940.66, 979.07, 982.35, 1048.86, 1109.73, 1127.59, 1034.98, 1057.65, 1085.47, 1045.17, 1102.51, 1174.86, 1134.35, 1113.11, 1149.5], 'YTD': [653.57, 628.4, 642.23, 657.78, 726.37, 779.35, 802.13, 831.7, 881.18, 830.1, 827.37, 882.64, 817.35, 936.07, 985.92, 1127.56, 1063.11, 1118.96, 1062.57, 1024.52, 996, 963.33, 906.79, 1109.73, 1045.17, 1149.5], '6M': [686.33, 652.09, 667.89, 711.59, 746.22, 823.67, 834.61, 876.01, 841.27, 847.65, 858.47, 923.69, 894.78, 968.02, 978.32, 1149.53, 1083.46, 1045.63, 1090.53, 1024.52, 996, 963.33, 906.79, 1109.73, 1045.17, 1149.5], '1Y': [530.28, 555.04, 565.91, 647.66, 662.77, 650.76, 621.91, 607.07, 612.97, 600.23, 628.68, 644.37, 602.43, 603.22, 648.25, 594.07, 584.39, 585.14, 575.13, 578.31, 555.84, 576.9, 621.9, 681.35, 661.81, 659.64, 686.33, 652.09, 667.89, 711.59, 746.22, 823.67, 834.61, 876.46, 815.01, 832.11, 858.47, 923.69, 894.78, 968.02, 978.32, 1149.53, 1083.46, 1045.63, 1090.53, 1043.82, 996, 963.33, 906.79, 1109.73, 1045.17, 1149.5] },
      velocityScore: { '1D': null, '1W': 9, '1M': 41.1, '6M': null }, isNew: false,
      marketCap: '$309B', pe: 33.6, revenueGrowth: 16, eps: 34.17, grossMargin: 20, dividendYield: 0.18,
      etfPresence: { POW: 3.48, VOLT: 4.62, PBD: false, PBW: false, IVEP: 4.59 },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'NEE', name: 'NEE', easyScore: 3, avgWeight: 3.68, proScore: 2.21, coverage: 0.6,
      price: 87.56, weeklyPrices: [88.66, 87.77, 86.37, 88.34, 87.56], weeklyChange: -1.24, dayChange: -0.88, sortRank: 0, periodReturns: { '1M': 2, 'YTD': 9.1, '6M': 8, '1Y': 17.1 },
      priceHistory: { '1D': [88.34, 87.86, 87.7, 87.42, 87.56, 87.52, 87.29, 87.24, 87.5, 87.57, 87.49, 87.46, 87.44, 87.54, 87.29, 87.23, 87.33, 87.38, 87.54, 87.58, 87.62, 87.53, 87.63, 87.56], '1W': [88.66, 87.77, 86.37, 88.34, 87.56], '1M': [84.01, 84.83, 85.12, 84.84, 85.99, 86.12, 86.23, 85.73, 86.75, 86.08, 86.43, 87.62, 87.7, 88.56, 88.66, 87.77, 86.37, 88.34, 87.56], 'YTD': [80.28, 79.49, 82.19, 84.81, 87.9, 89.47, 93.8, 94.06, 92.71, 92.01, 92.82, 90.23, 92.05, 94.17, 91.24, 90, 94.17, 95.39, 94.85, 88.27, 87.25, 85.68, 84.84, 86.75, 88.56, 87.56], '6M': [81.05, 81.64, 83.85, 87.57, 89.97, 91.36, 91.64, 95.11, 92.6, 91.66, 90.96, 91.16, 92.85, 94.48, 91.83, 96.25, 97.88, 93.32, 95.68, 88.27, 87.25, 85.68, 84.84, 86.75, 88.56, 87.56], '1Y': [74.75, 75.04, 76.17, 71.34, 70.53, 72.45, 75.41, 76.32, 72.05, 69.77, 71.5, 72.35, 76.21, 82.11, 84.3, 84.77, 84.41, 81.4, 83.93, 83.88, 83.48, 84.65, 80.55, 81.65, 80.04, 80.53, 81.05, 81.64, 83.85, 87.57, 89.97, 91.36, 91.64, 91.99, 91.13, 91.73, 90.96, 91.16, 92.85, 94.48, 91.83, 96.25, 97.88, 93.32, 95.68, 89.69, 87.25, 85.68, 84.84, 86.75, 88.56, 87.56] },
      velocityScore: { '1D': null, '1W': 1.8, '1M': 51.4, '6M': null }, isNew: false,
      marketCap: '$183B', pe: 22.2, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.82,
      etfPresence: { POW: 2.01, VOLT: 5.19, PBD: false, PBW: false, IVEP: 3.83 },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 3, avgWeight: 3.57, proScore: 2.14, coverage: 0.6,
      price: 291.36, weeklyPrices: [275.01, 302.70, 289.50, 270.89, 291.36], weeklyChange: 5.95, dayChange: 7.56, sortRank: 0, periodReturns: { '1M': 10.5, 'YTD': 235.3, '6M': 182.7, '1Y': 1096.1 },
      priceHistory: { '1D': [270.89, 282.39, 300.27, 301.3, 302.89, 301.11, 300.98, 301.75, 298.2, 296.6, 296.7, 295.38, 296.48, 295.59, 295.72, 294.58, 298.05, 296.64, 292.63, 293.19, 295.63, 294.16, 291.94, 291.36], '1W': [275.01, 302.7, 289.5, 270.89, 291.36], '1M': [253.57, 259.61, 234.23, 248.88, 260.22, 274.5, 280.88, 284.99, 328.91, 345.85, 321.98, 326.19, 309.18, 252.02, 275.01, 302.7, 289.5, 270.89, 291.36], 'YTD': [86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 160.28, 166, 151.32, 153.68, 141.33, 119.51, 146.78, 213.84, 229.75, 287.97, 285.47, 289.76, 282.31, 290.01, 291.37, 248.88, 328.91, 252.02, 291.36], '6M': [103.05, 139.77, 150.56, 165.39, 147.35, 155.54, 159, 174.77, 164.78, 159.21, 156.58, 150.22, 132.45, 160.13, 210.06, 237.57, 283.36, 258.64, 303.41, 282.31, 290.01, 291.37, 248.88, 328.91, 252.02, 291.36], '1Y': [24.36, 25.96, 25.36, 34.78, 36.1, 37.65, 45.28, 48.54, 52.94, 53.44, 67.02, 86.27, 73.6, 86.97, 109.91, 109.06, 110.38, 132.16, 135.21, 111.89, 89.99, 98.93, 111.79, 89.58, 92.26, 87.26, 103.05, 139.77, 150.56, 165.39, 147.35, 155.54, 159, 168.57, 159.99, 157.17, 156.58, 150.22, 132.45, 160.13, 210.06, 237.57, 283.36, 258.64, 303.41, 307.88, 290.01, 291.37, 248.88, 328.91, 252.02, 291.36] },
      velocityScore: { '1D': null, '1W': -9.7, '1M': 29.7, '6M': null }, isNew: false,
      marketCap: '$83B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: 1.66, VOLT: 3.93, PBD: false, PBW: false, IVEP: 5.13 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'NVT', name: 'NVT', easyScore: 3, avgWeight: 3.19, proScore: 1.91, coverage: 0.6,
      price: 155.58, weeklyPrices: [163.35, 169.61, 159.99, 152.15, 155.58], weeklyChange: -4.76, dayChange: 2.25, sortRank: 0, periodReturns: { '1M': -4.5, 'YTD': 52.6, '6M': 41.3, '1Y': 108.8 },
      priceHistory: { '1D': [152.15, 155.84, 157.6, 157.95, 158.84, 159.51, 159.38, 158.96, 158.95, 159, 157.91, 158.2, 157.63, 157.26, 157.24, 156.98, 156.91, 156.61, 156.01, 156.1, 156.15, 155.91, 155.58, 155.58], '1W': [163.35, 169.61, 159.99, 152.15, 155.58], '1M': [163.81, 163.8, 156.79, 164.52, 165.84, 169, 167.34, 170.94, 177.02, 184.34, 168.37, 167.55, 171.91, 162.92, 163.35, 169.61, 159.99, 152.15, 155.58], 'YTD': [101.97, 102.72, 107.98, 110.29, 112.26, 112.64, 113.25, 114.93, 120.27, 108.13, 114.3, 121, 112.75, 127.11, 131.38, 140.13, 137.37, 172.49, 172.91, 161.86, 164.87, 173.88, 164.52, 177.02, 162.92, 155.58], '6M': [110.09, 106.64, 112.66, 114.15, 116.69, 112.75, 116.88, 121.8, 113.83, 111.09, 120.27, 127.01, 121.26, 128.63, 129.7, 142.76, 142.9, 166.73, 173.96, 161.86, 164.87, 173.88, 164.52, 177.02, 162.92, 155.58], '1Y': [74.51, 74.97, 74.96, 79.07, 90.49, 88.76, 88.01, 90.08, 90.39, 92.58, 96.35, 100.25, 96.7, 98, 99.5, 100.23, 102.2, 114.35, 111.03, 106.55, 100.55, 105.67, 107.11, 102.61, 102.79, 103.01, 110.09, 106.64, 112.66, 114.15, 116.69, 112.75, 116.88, 121.79, 110.55, 107.87, 120.27, 127.01, 121.26, 128.63, 129.7, 142.76, 142.9, 166.73, 173.96, 163.57, 164.87, 173.88, 164.52, 177.02, 162.92, 155.58] },
      velocityScore: { '1D': null, '1W': -4, '1M': 6.1, '6M': null }, isNew: false,
      marketCap: '$25B', pe: 52.9, revenueGrowth: 54, eps: 2.94, grossMargin: 37, dividendYield: 0.55,
      etfPresence: { POW: 3.63, VOLT: 2.88, PBD: false, PBW: false, IVEP: 3.05 },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'HUBB', name: 'HUBB', easyScore: 3, avgWeight: 2.89, proScore: 1.74, coverage: 0.6,
      price: 496.81, weeklyPrices: [514.71, 523.20, 490.12, 487.10, 496.81], weeklyChange: -3.48, dayChange: 1.99, sortRank: 0, periodReturns: { '1M': 4.2, 'YTD': 11.9, '6M': 4.1, '1Y': 20.3 },
      priceHistory: { '1D': [487.1, 494.53, 497.49, 495.65, 498.52, 496.66, 495.56, 495.78, 494.98, 495.37, 495.95, 495.82, 495.65, 495.27, 495.67, 495.15, 495.99, 495.17, 496.2, 495.38, 496.28, 495.93, 496.11, 496.81], '1W': [514.71, 523.2, 490.12, 487.1, 496.81], '1M': [485.03, 486.47, 467.59, 469.32, 476.89, 489.73, 502.65, 508.87, 523.69, 539.39, 509.96, 518.18, 536.04, 517.02, 514.71, 523.2, 490.12, 487.1, 496.81], 'YTD': [444.11, 460.87, 484.11, 485.53, 487.94, 503.8, 524.12, 516.99, 516.98, 487.76, 472.64, 489.07, 472.07, 527.21, 526.94, 549.75, 545.93, 502.34, 483.79, 463.32, 473.93, 485.27, 469.32, 523.69, 517.02, 496.81], '6M': [468.2, 476.06, 484.06, 497.97, 487.4, 516.03, 526.56, 524.19, 476.51, 468.41, 492.65, 481.67, 494.25, 534.67, 521.71, 557.85, 508.17, 493.04, 482.03, 460.98, 473.61, 485.27, 469.32, 523.69, 517.02, 496.81], '1Y': [412.97, 415.08, 422.27, 438.31, 429.06, 417.54, 427.65, 440.85, 430.99, 436.62, 438.11, 438.49, 426.44, 413.05, 418.72, 431.65, 434.39, 470, 462.43, 432.82, 421.84, 427.85, 441.51, 444.84, 451.03, 446.61, 477.46, 481.68, 482.5, 485.73, 487.16, 516.03, 526.56, 524.19, 476.51, 468.41, 477.47, 503.2, 500.38, 534.67, 521.71, 557.85, 508.17, 493.04, 482.03, 460.98, 473.93, 485.27, 469.32, 523.69, 517.02, 496.81] },
      velocityScore: { '1D': null, '1W': -14.3, '1M': 13.7, '6M': null }, isNew: false,
      marketCap: '$26B', pe: 29.4, revenueGrowth: 11, eps: 16.9, grossMargin: 36, dividendYield: 1.17,
      etfPresence: { POW: 2.76, VOLT: 3.36, PBD: false, PBW: false, IVEP: 2.56 },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'BELFB', name: 'BELFB', easyScore: 2, avgWeight: 5.52, proScore: 2.21, coverage: 0.4,
      price: 285.13, weeklyPrices: [315.65, 333.04, 318.06, 266.94, 285.13], weeklyChange: -9.67, dayChange: 6.81, sortRank: 0, periodReturns: { '1M': 8.6, 'YTD': 68.1, '6M': 55, '1Y': 187.2 },
      priceHistory: { '1D': [266.94, 273.87, 272.74, 276.68, 276.75, 280.64, 282.77, 283.4, 285.23, 286.36, 286.73, 285.9, 286.36, 284.39, 282.63, 284.23, 281.73, 281.25, 281.46, 283.07, 284.34, 285.67, 285.05, 285.13], '1W': [315.65, 333.04, 318.06, 266.94, 285.13], '1M': [279.13, 276.04, 276.95, 296.55, 293.87, 302.15, 293.22, 299.84, 296.39, 304.33, 288.64, 294.15, 310.32, 310.64, 315.65, 333.04, 318.06, 266.94, 285.13], 'YTD': [169.63, 180.24, 196.61, 196.5, 201.19, 220.78, 232.84, 231.83, 222.45, 191.81, 205.11, 214.98, 197.83, 228.29, 236.04, 262.68, 258.26, 286.89, 266.92, 254.75, 276.96, 276.54, 296.55, 296.39, 310.64, 285.13], '6M': [184, 193.82, 201.8, 207.78, 211.58, 238.4, 230.06, 234.67, 213.8, 200.88, 205.74, 220.77, 203.04, 235, 241.49, 268.31, 275.84, 290.46, 268.73, 254.75, 276.96, 276.54, 296.55, 296.39, 310.64, 285.13], '1Y': [99.27, 101.66, 103.72, 126.75, 131.51, 128.22, 131.03, 132.6, 134.56, 141.51, 145.86, 146.51, 140.37, 141.12, 145.02, 147.96, 157, 153.99, 161.53, 147.67, 140.95, 154.77, 172.21, 173.3, 174.02, 172.95, 184, 193.82, 201.8, 207.78, 211.58, 238.4, 230.06, 232.12, 202.58, 195.18, 205.74, 220.77, 203.04, 235, 241.49, 268.31, 275.84, 290.46, 268.73, 260.4, 276.96, 276.54, 296.55, 296.39, 310.64, 285.13] },
      velocityScore: { '1D': null, '1W': -7.5, '1M': -16, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 68.5, revenueGrowth: 17, eps: 4.16, grossMargin: 39, dividendYield: 0.11,
      etfPresence: { POW: 3.87, VOLT: 7.17, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'POWL', name: 'POWL', easyScore: 2, avgWeight: 5.41, proScore: 2.16, coverage: 0.4,
      price: 249.81, weeklyPrices: [281.09, 286.36, 264.86, 246.33, 249.81], weeklyChange: -11.13, dayChange: 1.41, sortRank: 0, periodReturns: { '1M': -12.3, 'YTD': 135.1, '6M': 108.2, '1Y': 247.1 },
      priceHistory: { '1D': [246.33, 254.48, 257.33, 256.73, 258.88, 259.55, 261.05, 260.75, 259.93, 258.54, 256.99, 256.52, 255.48, 255.87, 255.49, 253.5, 252.78, 252.34, 250.41, 250.04, 249.96, 249.93, 249.83, 249.81], '1W': [281.09, 286.36, 264.86, 246.33, 249.81], '1M': [293.6, 283.51, 262.34, 290.5, 294.75, 303.53, 292.7, 294.03, 297.2, 307.8, 291.5, 294.49, 309.2, 279.77, 281.09, 286.36, 264.86, 246.33, 249.81], 'YTD': [106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 181.38, 177.5, 173.36, 170.61, 180.86, 167.52, 218.07, 229.73, 242.77, 253.49, 320.3, 300.84, 271.05, 288.9, 300.06, 290.5, 297.2, 279.77, 249.81], '6M': [120, 133.04, 140.62, 147.81, 175.77, 197.45, 178.79, 183, 170.96, 171.73, 167.41, 194.85, 184.68, 230.81, 232.81, 252.18, 277.27, 305.93, 296.98, 271.05, 288.9, 300.06, 290.5, 297.2, 279.77, 249.81], '1Y': [71.96, 70.19, 73.64, 80.8, 76.72, 88.28, 84.88, 87.65, 88.72, 90.8, 100.68, 100.97, 101.01, 103.9, 105.33, 116.4, 121.66, 127.8, 121.79, 109.89, 94.02, 106.53, 114.29, 109.31, 112.18, 109.16, 120, 133.04, 140.62, 147.81, 175.77, 197.45, 178.79, 176.96, 167.67, 171.19, 167.41, 194.85, 184.68, 230.81, 232.81, 252.18, 277.27, 305.93, 296.98, 270.75, 288.9, 300.06, 290.5, 297.2, 279.77, 249.81] },
      velocityScore: { '1D': null, '1W': -21.2, '1M': -41.1, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 48.8, revenueGrowth: 7, eps: 5.12, grossMargin: 30, dividendYield: 0.15,
      etfPresence: { POW: 4.44, VOLT: 6.38, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'AEP', name: 'AEP', easyScore: 2, avgWeight: 3.62, proScore: 1.45, coverage: 0.4,
      price: 136.16, weeklyPrices: [137.97, 136.81, 135.05, 138.51, 136.16], weeklyChange: -1.31, dayChange: -1.7, sortRank: 0, periodReturns: { '1M': 5.4, 'YTD': 18.1, '6M': 18.4, '1Y': 30.7 },
      priceHistory: { '1D': [138.51, 138.01, 137.86, 137.66, 137.44, 137.34, 136.93, 136.76, 136.78, 136.62, 136.24, 136.07, 135.9, 135.86, 135.4, 135.36, 135.57, 135.56, 135.82, 136.2, 136.33, 136.18, 136.07, 136.16], '1W': [137.97, 136.81, 135.05, 138.51, 136.16], '1M': [126.77, 127.76, 128.53, 128.48, 129.23, 129.31, 129.75, 128.27, 127.69, 130.3, 133.74, 134.96, 137, 138.69, 137.97, 136.81, 135.05, 138.51, 136.16], 'YTD': [115.31, 115.93, 119.4, 116.63, 119.78, 120.8, 129.94, 132.03, 133.29, 131.86, 134.15, 127.92, 131.12, 134.71, 134.39, 131.62, 134.44, 132.56, 127.95, 128.87, 127.76, 127.79, 128.48, 127.69, 138.69, 136.16], '6M': [115.04, 116.62, 118.98, 119.12, 119.98, 122.25, 128.42, 132.46, 133.52, 131.26, 130.97, 128.3, 131.67, 137.15, 134.56, 135.08, 137.11, 131.76, 128.6, 128.87, 127.76, 127.79, 128.48, 127.69, 138.69, 136.16], '1Y': [104.17, 105.02, 108.54, 107.95, 115, 112, 111.99, 114.02, 111.02, 107.55, 109.1, 107.05, 109.78, 115.66, 116.8, 117.82, 115.98, 120.26, 121.43, 121.3, 120.84, 120.51, 115.73, 115.77, 114.62, 115.99, 115.04, 116.62, 118.98, 119.12, 119.98, 122.25, 128.42, 132.1, 132.04, 132.22, 130.97, 128.3, 131.67, 137.15, 134.56, 135.08, 137.11, 131.76, 128.6, 129.61, 127.76, 127.79, 128.48, 127.69, 138.69, 136.16] },
      velocityScore: { '1D': null, '1W': 0.7, '1M': 5.1, '6M': null }, isNew: false,
      marketCap: '$74B', pe: 20.1, revenueGrowth: 10, eps: 6.76, grossMargin: 47, dividendYield: 2.74,
      etfPresence: { POW: 2.65, VOLT: 4.58, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 2, avgWeight: 3.23, proScore: 1.29, coverage: 0.4,
      price: 321.98, weeklyPrices: [306.97, 334.82, 311.42, 300.53, 321.98], weeklyChange: 4.89, dayChange: 7.14, sortRank: 0, periodReturns: { '1M': 7.1, 'YTD': 98.7, '6M': 84, '1Y': 155 },
      priceHistory: { '1D': [300.53, 322.24, 325.51, 323.24, 326.53, 328.32, 326.58, 327.76, 326.34, 325.81, 326.24, 326.26, 324.82, 324.7, 324.13, 323.14, 323.53, 322.25, 320.79, 320.69, 321.01, 320.55, 321.76, 321.98], '1W': [306.97, 334.82, 311.42, 300.53, 321.98], '1M': [300.57, 289.52, 280.98, 297.88, 302.87, 311.93, 299.6, 317.58, 333.05, 357.96, 318.32, 316.43, 325.57, 303.95, 306.97, 334.82, 311.42, 300.53, 321.98], 'YTD': [162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 234.53, 245.42, 257.75, 264.35, 264.74, 256, 234.22, 281.03, 301.16, 305.14, 306.18, 358.92, 369.99, 315.67, 314.18, 323.92, 297.88, 333.05, 303.95, 321.98], '6M': [174.95, 172.72, 181.47, 193.76, 182.56, 248.51, 243.06, 262.19, 251.28, 268.26, 264.71, 276.16, 259.37, 287.64, 294.13, 321.75, 328.49, 340.01, 376.23, 315.67, 314.18, 323.92, 297.88, 333.05, 303.95, 321.98], '1Y': [126.26, 124.72, 126.21, 142.55, 140.2, 139.83, 133.07, 125.97, 127.55, 121.82, 138.26, 151.96, 143.31, 162.8, 179, 175.73, 186.06, 192.86, 179.8, 170.97, 159.83, 179.22, 185.61, 161.74, 166.25, 164.34, 174.95, 172.72, 181.47, 193.76, 182.56, 248.51, 243.06, 259.23, 249.75, 265.38, 264.71, 276.16, 259.37, 287.64, 294.13, 321.75, 328.49, 340.01, 376.23, 323.4, 314.18, 323.92, 297.88, 333.05, 303.95, 321.98] },
      velocityScore: { '1D': null, '1W': 1.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$124B', pe: 81.1, revenueGrowth: 30, eps: 3.97, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 2.41, PBD: false, PBW: false, IVEP: 4.05 },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 2.66, proScore: 1.06, coverage: 0.4,
      price: 72.67, weeklyPrices: [75.06, 74.34, 72.77, 73.14, 72.67], weeklyChange: -3.19, dayChange: -0.65, sortRank: 0, periodReturns: { '1M': 1, 'YTD': 20.9, '6M': 22.1, '1Y': 24.3 },
      priceHistory: { '1D': [73.14, 73.71, 73.87, 73.62, 73.32, 73.48, 73, 72.93, 72.98, 73.01, 72.96, 72.96, 72.75, 72.86, 72.72, 72.71, 72.85, 72.75, 72.65, 72.67, 72.68, 72.72, 72.65, 72.67], '1W': [75.06, 74.34, 72.77, 73.14, 72.67], '1M': [71.59, 71.59, 72.26, 71.62, 72.08, 71.49, 71.48, 71.25, 73.12, 74.95, 75.79, 75.87, 77.53, 77.92, 75.06, 74.34, 72.77, 73.14, 72.67], 'YTD': [60.11, 61.15, 60.29, 64.96, 67.26, 66.92, 72.28, 72.98, 76.26, 73.18, 73.89, 73.6, 72.47, 73.01, 70.76, 71.1, 73.32, 73.76, 75.71, 77.88, 73.13, 72.43, 71.62, 73.12, 77.92, 72.67], '6M': [59.5, 60.49, 63.18, 66.92, 66.46, 71.12, 72.17, 73.97, 75.77, 74.4, 72.8, 73.81, 71.83, 72.82, 70.86, 71.65, 76.31, 72.95, 77.69, 77.88, 73.13, 72.43, 71.62, 73.12, 77.92, 72.67], '1Y': [58.48, 59.04, 57.68, 57.51, 60.26, 58.06, 57.46, 57.07, 57.88, 56.85, 58.4, 60.16, 63.97, 63.58, 62.68, 63.06, 57.48, 57.87, 59.58, 60.99, 59.61, 61.44, 61.95, 59.48, 58.92, 60.16, 59.5, 60.49, 63.18, 66.92, 66.46, 71.12, 72.17, 74.77, 74.77, 73.52, 72.8, 73.81, 71.83, 72.82, 70.86, 71.65, 76.31, 72.95, 77.69, 77.52, 73.13, 72.43, 71.62, 73.12, 77.92, 72.67] },
      velocityScore: { '1D': null, '1W': -3.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$89B', pe: 31.9, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.87,
      etfPresence: { POW: false, VOLT: 1.54, PBD: false, PBW: false, IVEP: 3.77 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'JCI', name: 'JOHNSON CONTROLS INTERNATIONAL PLC', easyScore: 2, avgWeight: 2.55, proScore: 1.02, coverage: 0.4,
      price: 142.13, weeklyPrices: [140.47, 146.11, 144.80, 140.76, 142.13], weeklyChange: 1.18, dayChange: 0.97, sortRank: 0, periodReturns: { '1M': -1.1, 'YTD': 18.7, '6M': 24.7, '1Y': 34.1 },
      priceHistory: { '1D': [140.76, 144.3, 144.2, 143.81, 144.1, 143.66, 143.65, 143.71, 143.46, 143.36, 142.88, 142.77, 142.51, 142.37, 142.87, 142.72, 142.8, 142.69, 142.63, 142.41, 142.56, 142.58, 142.29, 142.13], '1W': [140.47, 146.11, 144.8, 140.76, 142.13], '1M': [144.05, 147.75, 139.36, 144.01, 144.96, 146.06, 145.17, 143.62, 144.82, 148.21, 141.28, 142.81, 145.49, 138.4, 140.47, 146.11, 144.8, 140.76, 142.13], 'YTD': [119.75, 111.29, 112.95, 113.59, 119.26, 137.65, 139.24, 142.83, 145.46, 133.09, 131.69, 133.27, 126.58, 139, 137.21, 139.81, 141.35, 143.14, 143.8, 137.75, 136.15, 147.4, 144.01, 144.82, 138.4, 142.13], '6M': [113.95, 112.09, 115.49, 116.74, 129.49, 140.96, 142.7, 144.49, 140, 134.99, 133.76, 137.48, 134.72, 141.85, 137.55, 141.73, 146.03, 139.25, 145.03, 137.75, 136.15, 147.4, 144.01, 144.82, 138.4, 142.13], '1Y': [105.98, 106.26, 108.27, 111.52, 106.48, 105.71, 103.52, 107.26, 106.89, 107.17, 107.81, 109.29, 108.16, 109.58, 106.38, 110.6, 112.94, 114.39, 122.25, 118.72, 113.55, 114.94, 114.98, 116.88, 119.96, 120.94, 113.95, 112.09, 115.49, 116.74, 129.49, 140.96, 142.7, 143.42, 137.18, 130.94, 133.76, 137.48, 134.72, 141.85, 137.55, 141.73, 146.03, 139.25, 145.03, 135.47, 136.15, 147.4, 144.01, 144.82, 138.4, 142.13] },
      velocityScore: { '1D': null, '1W': 5.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$87B', pe: 43.5, revenueGrowth: 8, eps: 3.27, grossMargin: 37, dividendYield: 1.14,
      etfPresence: { POW: false, VOLT: 1.43, PBD: false, PBW: false, IVEP: 3.67 },
      tonyNote: 'JOHNSON CONTROLS INTERNATIONAL PLC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX TECHNOLOGIES INC', easyScore: 2, avgWeight: 2.12, proScore: 0.85, coverage: 0.4,
      price: 196.03, weeklyPrices: [189.25, 194.65, 191.25, 191.06, 196.03], weeklyChange: 3.58, dayChange: 2.6, sortRank: 0, periodReturns: { '1M': 5.4, 'YTD': 13.4, '6M': 0.4, '1Y': 36.3 },
      priceHistory: { '1D': [191.06, 195.52, 197.25, 196.62, 197.01, 197.11, 196.62, 197.16, 197.18, 197.44, 196.81, 196.62, 196.51, 196.49, 196.65, 196.37, 196.06, 196.21, 195.83, 195.85, 196.53, 196.43, 196.16, 196.03], '1W': [189.25, 194.65, 191.25, 191.06, 196.03], '1M': [187.46, 188.96, 183, 194.68, 193.45, 193.94, 196.93, 203.07, 205.4, 210, 209.89, 205.65, 204.77, 197.91, 189.25, 194.65, 191.25, 191.06, 196.03], 'YTD': [172.84, 193.2, 213.25, 207.75, 205.43, 197.19, 200.4, 198.38, 216.47, 200.39, 204.67, 204.85, 191.59, 231.78, 238.42, 219.1, 208.08, 215.2, 206.83, 202.66, 199.27, 190.76, 194.68, 205.4, 197.91, 196.03], '6M': [195.3, 210.54, 209.52, 216.3, 190.1, 198.5, 209.07, 208.27, 205.57, 195.98, 208.98, 222.13, 212.81, 230.29, 230.8, 225.51, 216.39, 209.89, 210.94, 202.66, 199.27, 190.76, 194.68, 205.4, 197.91, 196.03], '1Y': [143.79, 138.65, 140.36, 149.83, 154.51, 177.89, 173.5, 163.09, 162.04, 163.75, 174.3, 178.19, 181.96, 191.38, 197.37, 207.72, 203.28, 213.61, 193.55, 178.31, 169.81, 174.93, 178.75, 174.37, 178.41, 174.36, 195.3, 210.54, 209.52, 216.3, 190.1, 198.5, 209.07, 207.24, 195.5, 197.82, 208.98, 222.13, 212.81, 230.29, 230.8, 225.51, 216.39, 209.89, 210.94, 202.52, 199.27, 190.76, 194.68, 205.4, 197.91, 196.03] },
      velocityScore: { '1D': null, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: 52.4, revenueGrowth: 26, eps: 3.74, grossMargin: 23, dividendYield: 0.54,
      etfPresence: { POW: false, VOLT: 2.05, PBD: false, PBW: false, IVEP: 2.18 },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'TLN', name: 'TLN', easyScore: 2, avgWeight: 2.1, proScore: 0.84, coverage: 0.4,
      price: 375.41, weeklyPrices: [399.34, 384.26, 360.79, 364.67, 375.41], weeklyChange: -5.99, dayChange: 2.95, sortRank: 0, periodReturns: { '1M': 2.9, 'YTD': 0.2, '6M': -4.5, '1Y': 31.7 },
      priceHistory: { '1D': [364.67, 374.28, 376.6, 373, 376.19, 377.17, 376.64, 377.16, 376.62, 376.45, 376, 374.1, 375, 375.47, 376.3, 375.62, 376.41, 375.2, 374.79, 374.76, 375.64, 376.58, 375.27, 375.41], '1W': [399.34, 384.26, 360.79, 364.67, 375.41], '1M': [364.78, 358.74, 336.59, 344.8, 360.54, 386.21, 406.51, 409.81, 436.29, 438.12, 411.92, 405.89, 416.8, 404.09, 399.34, 384.26, 360.79, 364.67, 375.41], 'YTD': [374.84, 356, 419.07, 366.43, 348.36, 345, 376.7, 367.84, 353.24, 335.11, 317.6, 311.02, 313.03, 328.65, 353.3, 339.32, 351.91, 409.99, 351.03, 344.46, 381.47, 378.08, 344.8, 436.29, 404.09, 375.41], '6M': [393.18, 376.86, 374.31, 365.17, 317.05, 354.62, 380.06, 391.43, 336.57, 316.22, 338.6, 328.29, 328.08, 312.76, 362.4, 345.25, 372.42, 390.55, 352.88, 344.46, 381.47, 378.08, 344.8, 436.29, 404.09, 375.41], '1Y': [285.1, 281.96, 310.14, 358.77, 390.68, 369.95, 377.82, 356.11, 378.92, 383.49, 405.45, 429.72, 420.7, 430.43, 435.83, 406.84, 407.81, 399.78, 386.57, 360.92, 365.96, 379.99, 353.38, 357.94, 378.85, 378.97, 393.18, 376.86, 374.31, 365.17, 317.05, 354.62, 380.06, 390.05, 334.86, 311.45, 338.6, 328.29, 328.08, 312.76, 362.4, 345.25, 372.42, 390.55, 352.88, 360.48, 381.47, 378.08, 344.8, 436.29, 404.09, 375.41] },
      velocityScore: { '1D': null, '1W': -8.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: null, revenueGrowth: 97, eps: -0.51, grossMargin: 40, dividendYield: null,
      etfPresence: { POW: 1.53, VOLT: false, PBD: false, PBW: false, IVEP: 2.67 },
      tonyNote: 'TLN appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'XEL', name: 'XEL', easyScore: 2, avgWeight: 2.03, proScore: 0.81, coverage: 0.4,
      price: 80.4, weeklyPrices: [81.98, 80.30, 79.70, 81.96, 80.40], weeklyChange: -1.93, dayChange: -1.9, sortRank: 0, periodReturns: { '1M': 1.7, 'YTD': 8.9, '6M': 8, '1Y': 18.4 },
      priceHistory: { '1D': [81.96, 81.96, 81.42, 81.21, 80.98, 80.86, 80.69, 80.53, 80.69, 80.56, 80.33, 80.39, 80.4, 80.49, 80.21, 80.15, 80.19, 80.12, 80.23, 80.37, 80.41, 80.41, 80.32, 80.4], '1W': [81.98, 80.3, 79.7, 81.96, 80.4], '1M': [77.62, 77.87, 78.1, 78.27, 79.22, 79.35, 78.98, 77.46, 77.41, 78.81, 80.33, 81.47, 81.75, 82.23, 81.98, 80.3, 79.7, 81.96, 80.4], 'YTD': [73.86, 73.38, 75.36, 75.01, 76.06, 75.9, 81.59, 83.35, 83.8, 82.1, 81.63, 76.95, 79.17, 81.46, 78.65, 78.11, 78.82, 80.55, 79.91, 79.86, 79.26, 77.77, 78.27, 77.41, 82.23, 80.4], '6M': [74.43, 74.94, 76.51, 76.01, 76.2, 77.92, 80.82, 83.55, 83.04, 81, 80.02, 77.7, 79.71, 82.77, 81.05, 79.48, 82.95, 80.43, 80.03, 79.86, 79.26, 77.77, 78.27, 77.41, 82.23, 80.4], '1Y': [67.88, 69.17, 71.57, 71.14, 74.24, 72.68, 71.93, 74.26, 72.39, 71.75, 73.05, 72.35, 80.05, 81, 80.16, 81.28, 80.39, 81.17, 80.91, 80.58, 79.67, 79.73, 75.73, 75.72, 73.85, 74.19, 74.43, 74.94, 76.51, 76.01, 76.2, 77.92, 80.82, 83.47, 82.38, 80.82, 80.02, 77.7, 79.71, 82.77, 81.05, 79.48, 82.95, 80.43, 80.03, 80.2, 79.26, 77.77, 78.27, 77.41, 82.23, 80.4] },
      velocityScore: { '1D': null, '1W': null, '1M': -14.7, '6M': null }, isNew: true,
      marketCap: '$50B', pe: 23.2, revenueGrowth: 3, eps: 3.47, grossMargin: 46, dividendYield: 2.89,
      etfPresence: { POW: 2.03, VOLT: 2.03, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'XEL appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NRG', name: 'NRG ENERGY INC', easyScore: 2, avgWeight: 1.72, proScore: 0.69, coverage: 0.4,
      price: 139.17, weeklyPrices: [149.11, 146.06, 140.80, 136.70, 139.17], weeklyChange: -6.67, dayChange: 1.81, sortRank: 0, periodReturns: { '1M': 7.7, 'YTD': -12.6, '6M': -12.8, '1Y': -12.3 },
      priceHistory: { '1D': [136.7, 139.48, 140.46, 138.87, 139.42, 140, 140, 139.24, 138.98, 139.19, 139.17, 138.98, 139.23, 139.57, 139.52, 139.05, 138.9, 138.74, 139.07, 138.92, 139.34, 139.61, 139.26, 139.17], '1W': [149.11, 146.06, 140.8, 136.7, 139.17], '1M': [127.71, 129.96, 120.65, 123.7, 125.47, 130.4, 132.1, 132.13, 135.06, 138.91, 137.66, 142.21, 147.11, 149.36, 149.11, 146.06, 140.8, 136.7, 139.17], 'YTD': [159.24, 143.53, 158.5, 149.3, 152.63, 153.32, 172.35, 176.52, 175.58, 155.42, 152.48, 151.77, 141.23, 160.3, 168.45, 149.6, 149.01, 150.64, 131.08, 133.98, 137.5, 133.39, 123.7, 135.06, 149.36, 139.17], '6M': [159.63, 150.59, 150.68, 155.11, 143.99, 160.63, 175.01, 183.59, 163.54, 148.63, 159.11, 151.04, 149.9, 161.78, 168.5, 154.53, 155.58, 141.86, 134.72, 133.98, 137.5, 133.39, 123.7, 135.06, 149.36, 139.17], '1Y': [158.69, 151.06, 152.31, 158.54, 173.91, 152.03, 148.62, 145.09, 145.56, 147.76, 166.08, 170.97, 165.34, 163.95, 168.77, 167.01, 170.36, 171.86, 172.5, 165.19, 159.2, 165.66, 164.11, 159.99, 156.96, 160.43, 159.63, 150.59, 150.68, 155.11, 143.99, 160.63, 175.01, 181.34, 160.46, 152.1, 159.11, 151.04, 149.9, 161.78, 168.5, 154.53, 155.58, 141.86, 134.72, 136.92, 137.5, 133.39, 123.7, 135.06, 149.36, 139.17] },
      velocityScore: { '1D': null, '1W': -17.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$29B', pe: 151.3, revenueGrowth: 20, eps: 0.92, grossMargin: 16, dividendYield: 1.39,
      etfPresence: { POW: false, VOLT: 1.01, PBD: false, PBW: false, IVEP: 2.44 },
      tonyNote: 'NRG ENERGY INC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 1.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RIVN', name: 'Rivian Automotive Inc', easyScore: 2, avgWeight: 1.61, proScore: 0.65, coverage: 0.4,
      price: 19.66, weeklyPrices: [16.81, 17.35, 17.18, 18.63, 19.66], weeklyChange: 16.98, dayChange: 5.56, sortRank: 0, periodReturns: { '1M': 20.3, 'YTD': -0.2, '6M': 0.7, '1Y': 54.2 },
      priceHistory: { '1D': [18.63, 18.98, 19.09, 19.38, 19.5, 19.61, 19.52, 19.59, 19.7, 19.86, 19.82, 19.82, 19.75, 19.74, 19.61, 19.7, 19.73, 19.82, 19.86, 19.82, 19.83, 19.73, 19.68, 19.66], '1W': [16.81, 17.35, 17.18, 18.63, 19.66], '1M': [16.84, 15.73, 14.76, 15.54, 16.76, 16.68, 15.93, 16.26, 16.52, 15.1, 14.89, 14.64, 14.86, 15.63, 16.81, 17.35, 17.18, 18.63, 19.66], 'YTD': [19.71, 19.89, 17.06, 15.95, 14.75, 14.8, 17.73, 14.96, 15.01, 15.87, 15.33, 15.77, 14.49, 15.14, 16.41, 17.74, 16.06, 14.48, 14.27, 13.73, 15.2, 18.12, 15.54, 16.52, 15.63, 19.66], '6M': [19.53, 18.85, 16.47, 15.2, 14.37, 14.76, 15.59, 15.25, 14.92, 16.65, 15.53, 15.62, 14.94, 15.24, 16.89, 16.95, 16.4, 14.18, 14.52, 13.73, 15.2, 18.12, 15.54, 16.52, 15.63, 19.66], '1Y': [12.75, 12.75, 13.7, 13.78, 12.41, 11.93, 12.24, 13.09, 13.57, 13.99, 13.6, 15.24, 15.25, 13.5, 13.06, 13.08, 12.98, 13.57, 15.23, 15.11, 14.86, 17.16, 17.61, 18.7, 21.75, 19.59, 19.53, 18.85, 16.47, 15.2, 14.37, 14.76, 15.59, 15.61, 15.19, 15.3, 15.53, 15.62, 14.94, 15.24, 16.89, 16.95, 16.4, 14.18, 14.52, 14.15, 15.2, 18.12, 15.54, 16.52, 15.63, 19.66] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$26B', pe: null, revenueGrowth: 11, eps: -2.92, grossMargin: 1, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: 1.32, PBW: 1.91, IVEP: false },
      tonyNote: 'Rivian Automotive Inc appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 1.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ITRI', name: 'ITRON INC', easyScore: 2, avgWeight: 1.35, proScore: 0.54, coverage: 0.4,
      price: 87.92, weeklyPrices: [83.72, 86.53, 84.49, 85.11, 87.92], weeklyChange: 5.02, dayChange: 3.3, sortRank: 0, periodReturns: { '1M': 9.8, 'YTD': -5.3, '6M': -10, '1Y': -34.6 },
      priceHistory: { '1D': [85.11, 85.32, 85.2, 85.5, 85.61, 85.52, 85.26, 85.76, 86.02, 86.24, 86.58, 86.95, 87.05, 87.43, 87.55, 87.52, 87.57, 87.76, 87.75, 87.95, 88.6, 88.26, 87.99, 87.92], '1W': [83.72, 86.53, 84.49, 85.11, 87.92], '1M': [81.8, 82.34, 79.68, 80.72, 80.56, 80.71, 81.1, 79.26, 80.81, 81.76, 81.1, 81.61, 82.95, 83.87, 83.72, 86.53, 84.49, 85.11, 87.92], 'YTD': [92.86, 98.44, 100.91, 97.67, 99.08, 104.05, 89.36, 95.21, 95.16, 96.18, 91.28, 93.4, 83.88, 92.99, 97.55, 89.68, 82.69, 82.97, 82.22, 81.35, 83.59, 81.05, 80.72, 80.81, 83.87, 87.92], '6M': [97.65, 99.28, 98.99, 99.21, 101.94, 99.81, 99.11, 97.15, 92.29, 91.96, 91.79, 93.54, 90.42, 95.1, 97, 88.56, 83.8, 81.14, 81.53, 81.35, 83.59, 81.05, 80.72, 80.81, 83.87, 87.92], '1Y': [134.45, 135.34, 136.63, 136.3, 125.75, 123.98, 126.28, 126.83, 122.94, 120.12, 120.17, 125.07, 124.16, 125.94, 128.28, 134.03, 135.94, 100.33, 105.29, 98.46, 95.69, 97.35, 96.74, 95.22, 95.58, 94.23, 97.65, 99.28, 98.99, 99.21, 101.94, 99.81, 99.11, 96.08, 91.22, 90.62, 91.79, 93.54, 90.42, 95.1, 97, 88.56, 83.8, 81.14, 81.53, 81.85, 83.59, 81.05, 80.72, 80.81, 83.87, 87.92] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$4B', pe: 14, revenueGrowth: -3, eps: 6.26, grossMargin: 39, dividendYield: null,
      etfPresence: { POW: false, VOLT: 1.08, PBD: false, PBW: 1.61, IVEP: false },
      tonyNote: 'ITRON INC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'APH', name: 'AMPHENOL CORP', easyScore: 1, avgWeight: 4.59, proScore: 0.92, coverage: 0.2,
      price: 166.14, weeklyPrices: [166.42, 176.32, 172.22, 164.59, 166.14], weeklyChange: -0.17, dayChange: 0.94, sortRank: 0, periodReturns: { '1M': 19.7, 'YTD': 22.9, '6M': 17.5, '1Y': 68.6 },
      priceHistory: { '1D': [164.59, 168.07, 167.04, 164.97, 167.34, 166.86, 166.79, 166.91, 167.17, 166.68, 166.7, 166.91, 167.18, 167.88, 167.73, 167.34, 167.22, 167.19, 166.65, 166.63, 166.92, 166.76, 166.23, 166.14], '1W': [166.42, 176.32, 172.22, 164.59, 166.14], '1M': [143.6, 154.07, 149.22, 152.46, 153.8, 158.59, 158.81, 161.11, 163.96, 165.96, 158.7, 162.78, 165.15, 163.72, 166.42, 176.32, 172.22, 164.59, 166.14], 'YTD': [135.14, 136.25, 154.22, 150.99, 144.08, 136.23, 146.72, 147.82, 135.16, 136.06, 136.8, 130.67, 119.15, 135.32, 146.98, 148.13, 148.38, 138.47, 124.64, 123.05, 147.68, 146.77, 152.46, 163.96, 163.72, 166.14], '6M': [141.38, 148.97, 154.6, 145.96, 130, 144.04, 151.2, 152.64, 132.75, 134.54, 127.81, 128.73, 127.7, 137.68, 148.96, 150.18, 147.27, 136.62, 129.19, 123.05, 147.68, 146.77, 152.46, 163.96, 163.72, 166.14], '1Y': [98.55, 100.21, 103.71, 106.7, 108.63, 109.81, 109.21, 109.36, 108.86, 110.54, 119.24, 123.69, 121.01, 123.4, 123.91, 127.67, 133.82, 139.34, 139.09, 133.74, 131.6, 139.22, 140.06, 129.9, 135.14, 136.2, 141.38, 148.97, 154.6, 145.96, 130, 144.04, 151.2, 148.47, 136.24, 131.47, 127.81, 128.73, 127.7, 137.68, 148.96, 150.18, 147.27, 136.62, 129.19, 124.86, 147.68, 146.77, 152.46, 163.96, 163.72, 166.14] },
      velocityScore: { '1D': null, '1W': -15.6, '1M': -25.8, '6M': null }, isNew: false,
      marketCap: '$204B', pe: 47.9, revenueGrowth: 58, eps: 3.47, grossMargin: 38, dividendYield: 0.61,
      etfPresence: { POW: false, VOLT: 4.59, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 5.09, proScore: 2.04, coverage: 0.4,
      price: 971.72, weeklyPrices: [1033.19, 1064.90, 991.41, 963.53, 971.72], weeklyChange: -5.95, dayChange: 0.85, sortRank: 0, periodReturns: { '1M': 7.5, 'YTD': 69.6, '6M': 56, '1Y': 148.2 },
      priceHistory: { '1D': [963.53, 985.99, 988.29, 983.8, 987.95, 985.7, 988.01, 986.25, 983.36, 984.34, 978.78, 978.9, 977.79, 977.85, 975.65, 972.66, 973.28, 973.44, 972.17, 972.45, 974.62, 973.48, 972.38, 971.72], '1W': [1033.19, 1064.9, 991.41, 963.53, 971.72], '1M': [915.64, 914.7, 856.16, 897.63, 910.57, 933.93, 945.46, 955.92, 985.82, 1022.28, 984.24, 994.45, 1057.01, 997.47, 1033.19, 1064.9, 991.41, 963.53, 971.72], 'YTD': [572.87, 608.13, 647.18, 626.62, 657.36, 726.2, 774.2, 756.47, 752.32, 704.82, 699.78, 701.7, 667.43, 771.58, 770.17, 808.87, 810.05, 926.93, 902.3, 872.56, 887.67, 940.48, 897.63, 985.82, 997.47, 971.72], '6M': [623.09, 636.53, 645.38, 643.28, 691.82, 775, 760.53, 766.61, 731.97, 707.59, 693.62, 719.04, 730.32, 787.07, 772.66, 835.24, 890.11, 895.69, 920.22, 872.56, 887.67, 940.48, 897.63, 985.82, 997.47, 971.72], '1Y': [391.51, 405.77, 410.07, 432.94, 433.7, 408.54, 407.79, 435.67, 419.04, 422.78, 435.94, 472.1, 471.61, 495.38, 504.76, 531.18, 522.73, 577.26, 563.1, 554.03, 550.43, 568.06, 596.5, 589.76, 582.41, 577.39, 623.09, 636.53, 645.38, 643.28, 691.82, 775, 760.53, 752.93, 706.08, 700.69, 693.62, 719.04, 730.32, 787.07, 772.66, 835.24, 890.11, 895.69, 920.22, 865.95, 887.67, 940.48, 897.63, 985.82, 997.47, 971.72] },
      velocityScore: { '1D': null, '1W': -2.4, '1M': 1.5, '6M': null }, isNew: false,
      marketCap: '$448B', pe: 48.5, revenueGrowth: 22, eps: 20.04, grossMargin: 29, dividendYield: 0.68,
      etfPresence: { AIRR: false, PRN: 3.3, RSHO: 6.89, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 4.79, proScore: 1.92, coverage: 0.4,
      price: 249.81, weeklyPrices: [281.09, 286.36, 264.86, 246.33, 249.81], weeklyChange: -11.13, dayChange: 1.41, sortRank: 0, periodReturns: { '1M': -12.3, 'YTD': 135.1, '6M': 108.2, '1Y': 247.1 },
      priceHistory: { '1D': [246.33, 254.48, 257.33, 256.73, 258.88, 259.55, 261.05, 260.75, 259.93, 258.54, 256.99, 256.52, 255.48, 255.87, 255.49, 253.5, 252.78, 252.34, 250.41, 250.04, 249.96, 249.93, 249.83, 249.81], '1W': [281.09, 286.36, 264.86, 246.33, 249.81], '1M': [293.6, 283.51, 262.34, 290.5, 294.75, 303.53, 292.7, 294.03, 297.2, 307.8, 291.5, 294.49, 309.2, 279.77, 281.09, 286.36, 264.86, 246.33, 249.81], 'YTD': [106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 181.38, 177.5, 173.36, 170.61, 180.86, 167.52, 218.07, 229.73, 242.77, 253.49, 320.3, 300.84, 271.05, 288.9, 300.06, 290.5, 297.2, 279.77, 249.81], '6M': [120, 133.04, 140.62, 147.81, 175.77, 197.45, 178.79, 183, 170.96, 171.73, 167.41, 194.85, 184.68, 230.81, 232.81, 252.18, 277.27, 305.93, 296.98, 271.05, 288.9, 300.06, 290.5, 297.2, 279.77, 249.81], '1Y': [71.96, 70.19, 73.64, 80.8, 76.72, 88.28, 84.88, 87.65, 88.72, 90.8, 100.68, 100.97, 101.01, 103.9, 105.33, 116.4, 121.66, 127.8, 121.79, 109.89, 94.02, 106.53, 114.29, 109.31, 112.18, 109.16, 120, 133.04, 140.62, 147.81, 175.77, 197.45, 178.79, 176.96, 167.67, 171.19, 167.41, 194.85, 184.68, 230.81, 232.81, 252.18, 277.27, 305.93, 296.98, 270.75, 288.9, 300.06, 290.5, 297.2, 279.77, 249.81] },
      velocityScore: { '1D': null, '1W': -2, '1M': -26.7, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 48.8, revenueGrowth: 7, eps: 5.12, grossMargin: 30, dividendYield: 0.15,
      etfPresence: { AIRR: 2.26, PRN: false, RSHO: 7.33, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 4.64, proScore: 1.86, coverage: 0.4,
      price: 710.96, weeklyPrices: [813.77, 839.36, 776.55, 700.75, 710.96], weeklyChange: -12.63, dayChange: 1.46, sortRank: 0, periodReturns: { '1M': -19.4, 'YTD': 132.2, '6M': 124, '1Y': 200 },
      priceHistory: { '1D': [700.75, 734.44, 741.99, 736.81, 739.74, 743.72, 740.76, 739.97, 737.3, 735.67, 731, 730.03, 728.16, 725.9, 725.82, 721.71, 721.21, 719.08, 710.94, 710.55, 713.28, 711.92, 709.39, 710.96], '1W': [813.77, 839.36, 776.55, 700.75, 710.96], '1M': [891.86, 842.01, 770.25, 838.55, 858.99, 866.67, 857.76, 838.21, 861.88, 932.75, 892.25, 867.23, 881.92, 804.76, 813.77, 839.36, 776.55, 700.75, 710.96], 'YTD': [306.23, 297.62, 336.31, 351.39, 357.91, 401.29, 437.77, 434.64, 432.87, 411.38, 417.76, 422.55, 382.55, 423.35, 456.08, 487.87, 469.75, 886.22, 854.28, 752, 842.96, 993.74, 838.55, 861.88, 804.76, 710.96], '6M': [317.41, 321.6, 362.53, 373.52, 360.16, 433.91, 415.13, 455.25, 420.22, 420.6, 421.23, 452.92, 421.29, 435.65, 441.1, 495.67, 515.62, 811.41, 889.03, 752, 842.96, 993.74, 838.55, 861.88, 804.76, 710.96], '1Y': [237, 241.31, 247.65, 263.59, 271.74, 289.86, 275.35, 279.58, 278.53, 286.71, 322.9, 367.39, 341.1, 352.78, 355.27, 369.01, 379.08, 377.9, 377.84, 338.66, 315.1, 320.51, 324.62, 319.12, 313.04, 307.68, 317.41, 321.6, 362.53, 373.52, 360.16, 433.91, 415.13, 433.34, 398.87, 404.59, 421.23, 452.92, 421.29, 435.65, 441.1, 495.67, 515.62, 811.41, 889.03, 733.77, 842.96, 993.74, 838.55, 861.88, 804.76, 710.96] },
      velocityScore: { '1D': null, '1W': -7, '1M': -24.1, '6M': null }, isNew: false,
      marketCap: '$22B', pe: 63.4, revenueGrowth: 92, eps: 11.21, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 5.29, PRN: 4, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.29, proScore: 1.72, coverage: 0.4,
      price: 1774.83, weeklyPrices: [1948.69, 1981.95, 1865.15, 1741.30, 1774.83], weeklyChange: -8.92, dayChange: 1.93, sortRank: 0, periodReturns: { '1M': -3.7, 'YTD': 90.2, '6M': 71.5, '1Y': 227.8 },
      priceHistory: { '1D': [1741.3, 1823.78, 1819.55, 1811.32, 1820.7, 1823, 1814.5, 1820.89, 1812.06, 1815.66, 1803.72, 1802.57, 1799.32, 1793.64, 1790.84, 1787.4, 1788.03, 1788.81, 1779.21, 1780, 1780.18, 1775.05, 1772.62, 1774.83], '1W': [1948.69, 1981.95, 1865.15, 1741.3, 1774.83], '1M': [1852.03, 1831.56, 1719.48, 1843.42, 1877.61, 1952.02, 1913.94, 1931.77, 1967.41, 2066.51, 1908.07, 1954.47, 2017.57, 1854.23, 1948.69, 1981.95, 1865.15, 1741.3, 1774.83], 'YTD': [933.29, 971.49, 1091.04, 1121.44, 1142.1, 1230.26, 1337.95, 1413.57, 1438.24, 1372.4, 1414.1, 1408.25, 1273.18, 1525.16, 1648.96, 1724.49, 1724.14, 2011.49, 2034.63, 1835.51, 1855.15, 1914.65, 1843.42, 1967.41, 1854.23, 1774.83], '6M': [1035.11, 1073.14, 1148, 1169.05, 1119.81, 1338.65, 1373.52, 1450.6, 1430.38, 1407.32, 1423, 1470.64, 1428.52, 1574.45, 1605.97, 1773.91, 1840.25, 1942.02, 2042.36, 1835.51, 1855.15, 1914.65, 1843.42, 1967.41, 1854.23, 1774.83], '1Y': [541.48, 542.95, 544.95, 692.97, 699.16, 693.31, 680.86, 689.48, 703.38, 715.87, 782.05, 821.62, 801.8, 825.42, 845.99, 836.75, 981.66, 965.58, 955.26, 909.6, 894.08, 961.2, 989.48, 968.48, 950.79, 946.93, 1035.11, 1073.14, 1148, 1169.05, 1119.81, 1338.65, 1373.52, 1438.23, 1348.22, 1373.76, 1423, 1470.64, 1428.52, 1574.45, 1605.97, 1773.91, 1840.25, 1942.02, 2042.36, 1835.33, 1855.15, 1914.65, 1843.42, 1967.41, 1854.23, 1774.83] },
      velocityScore: { '1D': null, '1W': -2.8, '1M': -5, '6M': null }, isNew: false,
      marketCap: '$62B', pe: 51.2, revenueGrowth: 1, eps: 34.65, grossMargin: 25, dividendYield: 0.15,
      etfPresence: { AIRR: 4.1, PRN: 4.49, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.95, proScore: 1.58, coverage: 0.4,
      price: 328.62, weeklyPrices: [334.16, 338.15, 332.08, 330.85, 328.62], weeklyChange: -1.66, dayChange: -0.67, sortRank: 0, periodReturns: { '1M': 4.2, 'YTD': 28, '6M': 23.8, '1Y': 34.6 },
      priceHistory: { '1D': [330.85, 328.88, 331.53, 330.25, 329.99, 330.59, 329.61, 329.73, 330.11, 329.92, 328.7, 328.82, 329.34, 328.92, 328.61, 328.61, 328.93, 329.47, 329.52, 329.19, 329.18, 328.81, 328.75, 328.62], '1W': [334.16, 338.15, 332.08, 330.85, 328.62], '1M': [314.42, 322.81, 314.08, 318.89, 320.11, 316.18, 324.38, 329.89, 337.96, 338.07, 330.9, 333.78, 343.54, 337.08, 334.16, 338.15, 332.08, 330.85, 328.62], 'YTD': [256.77, 264.62, 282.47, 280.14, 260.41, 291.74, 279.84, 278.74, 283.54, 267.57, 256.83, 262.23, 258.01, 280.74, 284.56, 289.82, 296.57, 315.39, 310.87, 306.25, 308.53, 313.67, 318.89, 337.96, 337.08, 328.62], '6M': [265.39, 278.77, 284, 256.26, 289.94, 290.31, 281.13, 280.76, 279.91, 270.13, 258.51, 266, 269.36, 286.41, 284.39, 294.4, 305.75, 310.37, 315.72, 306.25, 308.53, 313.67, 318.89, 337.96, 337.08, 328.62], '1Y': [244.15, 256.98, 260.2, 274.69, 267.16, 262.51, 255.01, 267.11, 263.58, 266.22, 262.83, 265.48, 258.44, 259.04, 246.74, 249.57, 260.29, 257.09, 258.92, 248.96, 248.92, 256.44, 257.25, 259.81, 263.48, 261.16, 265.39, 278.77, 284, 256.26, 289.94, 290.31, 281.13, 283.5, 274.97, 259.88, 258.51, 266, 269.36, 286.41, 284.39, 294.4, 305.75, 310.37, 315.72, 305.66, 308.53, 313.67, 318.89, 337.96, 337.08, 328.62] },
      velocityScore: { '1D': null, '1W': 0, '1M': 17.9, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 31, revenueGrowth: 7, eps: 10.59, grossMargin: 30, dividendYield: 0.62,
      etfPresence: { AIRR: 1.86, PRN: false, RSHO: 6.04, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 4.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'EME', name: 'EMCOR Group, Inc.', easyScore: 2, avgWeight: 3.5, proScore: 1.4, coverage: 0.4,
      price: 788.52, weeklyPrices: [814.41, 829.88, 804.33, 774.66, 788.52], weeklyChange: -3.18, dayChange: 1.79, sortRank: 0, periodReturns: { '1M': -3.5, 'YTD': 28.9, '6M': 20.2, '1Y': 43.1 },
      priceHistory: { '1D': [774.66, 794.08, 798.58, 795.88, 800.18, 800.81, 798.51, 802.77, 800.19, 802.02, 801.09, 800.92, 799.14, 798.49, 797.66, 797.31, 796.16, 793.6, 793.66, 791.68, 790.49, 789.5, 787.83, 788.52], '1W': [814.41, 829.88, 804.33, 774.66, 788.52], '1M': [823.79, 827.78, 776.72, 811.53, 823.05, 842.3, 834.77, 827.5, 836.59, 868.88, 838.61, 847.17, 862.66, 798.1, 814.41, 829.88, 804.33, 774.66, 788.52], 'YTD': [611.79, 628.27, 682.13, 694.21, 720.73, 764.35, 800.82, 806.66, 735.78, 719.18, 726.55, 744.66, 701.1, 789.19, 803.64, 860, 833.37, 943.75, 923.01, 853.15, 848.45, 845.43, 811.53, 836.59, 798.1, 788.52], '6M': [655.94, 670.55, 708.71, 727.35, 708.62, 808.51, 803.55, 801.8, 740.87, 720.18, 737.66, 764.76, 759.55, 800.4, 792.25, 873.11, 891.67, 924.06, 930.03, 853.15, 848.45, 845.43, 811.53, 836.59, 798.1, 788.52], '1Y': [551.14, 556.86, 560.44, 631.66, 629.22, 614.69, 605.62, 610.24, 620, 621.58, 628.75, 655.83, 640.63, 670, 677.02, 700.18, 748.24, 675.78, 649.34, 619.86, 581.58, 607.78, 629.22, 624.09, 621.84, 617.3, 655.94, 670.55, 708.71, 727.35, 708.62, 808.51, 803.55, 746.18, 719.01, 710.53, 737.66, 764.76, 759.55, 800.4, 792.25, 873.11, 891.67, 924.06, 930.03, 849.2, 848.45, 845.43, 811.53, 836.59, 798.1, 788.52] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$35B', pe: 26.5, revenueGrowth: 20, eps: 29.75, grossMargin: 19, dividendYield: 0.21,
      etfPresence: { AIRR: 3.7, PRN: 3.31, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'EMCOR Group is an electrical and mechanical construction services company. Revenue grew substantially, and EMCOR is a core Industrials ETF holding because it builds the electrical systems inside data centers, manufacturing plants, and commercial buildings. The $827 share price reflects years of consistent execution and market share gains in a fragmented contractor market.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 2, avgWeight: 3.09, proScore: 1.24, coverage: 0.4,
      price: 279.71, weeklyPrices: [268.57, 268.86, 267.41, 270.41, 279.71], weeklyChange: 4.15, dayChange: 3.44, sortRank: 0, periodReturns: { '1M': 11, 'YTD': 36.4, '6M': 30.3, '1Y': 55.2 },
      priceHistory: { '1D': [270.41, 275.84, 277.78, 276.48, 277.59, 278.25, 278, 278.56, 278.26, 279.11, 278.45, 278, 277.96, 277.77, 278.45, 278.74, 278.58, 278.78, 278.85, 279.17, 279.18, 279.1, 279.25, 279.71], '1W': [268.57, 268.86, 267.41, 270.41, 279.71], '1M': [246.55, 257.16, 249.49, 264.6, 264.67, 270.44, 277.42, 283.23, 277.66, 280.36, 275.13, 276.06, 273.14, 268.87, 268.57, 268.86, 267.41, 270.41, 279.71], 'YTD': [205.02, 210.02, 224.26, 214.89, 208.08, 223.16, 250.21, 257.04, 265.11, 254.14, 240.73, 236.04, 222.99, 250, 254.04, 240.88, 236.52, 256.43, 273.1, 261.21, 259.89, 249.33, 264.6, 277.66, 268.87, 279.71], '6M': [214.69, 219.64, 225, 210.84, 208.61, 230.85, 251.3, 259.64, 260.09, 251.65, 241.93, 241.62, 239.04, 254.06, 247.6, 246.16, 243.04, 272.54, 272.37, 261.21, 259.89, 249.33, 264.6, 277.66, 268.87, 279.71], '1Y': [180.25, 184.32, 187.83, 188.17, 181.16, 179.88, 171.25, 171, 174.1, 179.43, 189.25, 192.15, 191.92, 190.48, 189.99, 192.52, 198.51, 205.95, 206.66, 203.29, 197.28, 198.74, 193.64, 197.24, 208.17, 207.81, 214.69, 219.64, 225, 210.84, 208.61, 230.85, 251.3, 260.31, 252.39, 243.82, 241.93, 241.62, 239.04, 254.06, 247.6, 246.16, 243.04, 272.54, 272.37, 259.89, 259.89, 249.33, 264.6, 277.66, 268.87, 279.71] },
      velocityScore: { '1D': null, '1W': 11.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$112B', pe: 65, revenueGrowth: 19, eps: 4.3, grossMargin: 35, dividendYield: 0.18,
      etfPresence: { AIRR: false, PRN: 4.05, RSHO: false, IDEF: 2.13, BILT: false },
      tonyNote: 'Howmet Aerospace is an aerospace structures and engine components manufacturer. It appears in Industrials ETFs for its aerospace and defense exposure — commercial air travel recovery and defense spending growth are the two demand drivers. Revenue grew and margins are expanding as Howmet prices power over OEM customers.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 2.8, proScore: 1.12, coverage: 0.4,
      price: 230.98, weeklyPrices: [238.21, 245.17, 231.72, 227.74, 230.98], weeklyChange: -3.04, dayChange: 1.42, sortRank: 0, periodReturns: { '1M': 1.4, 'YTD': 15.5, '6M': 10.7, '1Y': 35.9 },
      priceHistory: { '1D': [227.74, 233.57, 230.63, 232.8, 231.35, 232.23, 232.16, 232.88, 233.01, 233.88, 233.48, 233.13, 232.93, 232.44, 232.12, 231.54, 232.32, 231.82, 232.12, 231.15, 231.5, 231.2, 231.12, 230.98], '1W': [238.21, 245.17, 231.72, 227.74, 230.98], '1M': [229.95, 228.01, 223.63, 233.49, 230.05, 237.06, 234.8, 235.29, 242.97, 246.41, 236.07, 237.22, 244.56, 231.87, 238.21, 245.17, 231.72, 227.74, 230.98], 'YTD': [200.06, 207.44, 213.61, 211.03, 208.41, 222.32, 239, 237.18, 225.02, 209.8, 203.42, 194.52, 190.71, 212.22, 219.99, 220.62, 211.36, 212.74, 203.79, 205.55, 213.82, 236.14, 233.49, 242.97, 231.87, 230.98], '6M': [208.63, 211.07, 220.86, 211.34, 212.76, 233.46, 241.01, 226.66, 222.07, 210.15, 202.46, 201.27, 203.16, 215.54, 215.27, 223.96, 218.91, 205.27, 203.5, 205.55, 213.82, 236.14, 233.49, 242.97, 231.87, 230.98], '1Y': [169.97, 174.38, 174.44, 180.42, 200.98, 200.51, 186.39, 190.47, 187.11, 189.1, 186.95, 189.75, 184.24, 190.89, 180.71, 184.97, 194.03, 223.89, 221.92, 211.43, 204.57, 208.53, 206.16, 218.13, 207.18, 203.51, 208.63, 211.07, 220.86, 211.34, 212.76, 233.46, 241.01, 231.59, 211.9, 202.65, 202.46, 201.27, 203.16, 215.54, 215.27, 223.96, 218.91, 205.27, 203.5, 205.39, 213.82, 236.14, 233.49, 242.97, 231.87, 230.98] },
      velocityScore: { '1D': null, '1W': 0, '1M': -22.8, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 44.1, revenueGrowth: 17, eps: 5.24, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.65, PRN: false, RSHO: 3.96, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 2, avgWeight: 2.35, proScore: 0.94, coverage: 0.4,
      price: 196.03, weeklyPrices: [189.25, 194.65, 191.25, 191.06, 196.03], weeklyChange: 3.58, dayChange: 2.6, sortRank: 0, periodReturns: { '1M': 5.4, 'YTD': 13.4, '6M': 0.4, '1Y': 36.3 },
      priceHistory: { '1D': [191.06, 195.52, 197.25, 196.62, 197.01, 197.11, 196.62, 197.16, 197.18, 197.44, 196.81, 196.62, 196.51, 196.49, 196.65, 196.37, 196.06, 196.21, 195.83, 195.85, 196.53, 196.43, 196.16, 196.03], '1W': [189.25, 194.65, 191.25, 191.06, 196.03], '1M': [187.46, 188.96, 183, 194.68, 193.45, 193.94, 196.93, 203.07, 205.4, 210, 209.89, 205.65, 204.77, 197.91, 189.25, 194.65, 191.25, 191.06, 196.03], 'YTD': [172.84, 193.2, 213.25, 207.75, 205.43, 197.19, 200.4, 198.38, 216.47, 200.39, 204.67, 204.85, 191.59, 231.78, 238.42, 219.1, 208.08, 215.2, 206.83, 202.66, 199.27, 190.76, 194.68, 205.4, 197.91, 196.03], '6M': [195.3, 210.54, 209.52, 216.3, 190.1, 198.5, 209.07, 208.27, 205.57, 195.98, 208.98, 222.13, 212.81, 230.29, 230.8, 225.51, 216.39, 209.89, 210.94, 202.66, 199.27, 190.76, 194.68, 205.4, 197.91, 196.03], '1Y': [143.79, 138.65, 140.36, 149.83, 154.51, 177.89, 173.5, 163.09, 162.04, 163.75, 174.3, 178.19, 181.96, 191.38, 197.37, 207.72, 203.28, 213.61, 193.55, 178.31, 169.81, 174.93, 178.75, 174.37, 178.41, 174.36, 195.3, 210.54, 209.52, 216.3, 190.1, 198.5, 209.07, 207.24, 195.5, 197.82, 208.98, 222.13, 212.81, 230.29, 230.8, 225.51, 216.39, 209.89, 210.94, 202.52, 199.27, 190.76, 194.68, 205.4, 197.91, 196.03] },
      velocityScore: { '1D': null, '1W': -3.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: 52.4, revenueGrowth: 26, eps: 3.74, grossMargin: 23, dividendYield: 0.54,
      etfPresence: { AIRR: 3.08, PRN: false, RSHO: false, IDEF: 1.61, BILT: false },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 2, avgWeight: 1.95, proScore: 0.78, coverage: 0.4,
      price: 53.98, weeklyPrices: [46.95, 49.86, 53.04, 55.35, 53.98], weeklyChange: 14.97, dayChange: -2.48, sortRank: 0, periodReturns: { '1M': -7.8, 'YTD': -28.9, '6M': -41.3, '1Y': 20.5 },
      priceHistory: { '1D': [55.35, 53.5, 54.58, 54.15, 54.28, 53.8, 53.61, 53.75, 53.9, 54.09, 54.14, 54.07, 54.52, 54.86, 54.93, 54.69, 54.82, 54.47, 54.06, 54.15, 54.6, 54.29, 53.98, 53.98], '1W': [46.95, 49.86, 53.04, 55.35, 53.98], '1M': [57.73, 56.19, 54.82, 58.78, 57.75, 57.02, 56.34, 56.16, 54.21, 51.09, 50.8, 47.95, 46.32, 47.21, 46.95, 49.86, 53.04, 55.35, 53.98], 'YTD': [75.91, 104.04, 124.56, 110.39, 103.01, 94.41, 89.06, 94.31, 90.72, 92.47, 89.53, 83.69, 65.28, 74.46, 74.66, 68.61, 59.56, 61.52, 52.49, 55.82, 65.19, 63.4, 58.78, 54.21, 47.21, 53.98], '6M': [91.93, 119.72, 120.59, 112.67, 91.33, 87.78, 105.67, 88.23, 89.13, 88.92, 93.04, 79.98, 67.7, 68.33, 74.41, 65.52, 63.05, 57, 54.85, 55.82, 65.19, 63.4, 58.78, 54.21, 47.21, 53.98], '1Y': [44.78, 51.99, 58.78, 59.36, 59.5, 65.41, 68.5, 66.71, 65.84, 64.14, 70.74, 80.72, 88.08, 100.25, 96.28, 86.65, 91.18, 90.6, 77.88, 72.45, 69.14, 73.21, 77.03, 74.26, 81.53, 75.98, 91.93, 119.72, 120.59, 112.67, 91.33, 87.78, 105.67, 92.14, 85.54, 89.46, 93.04, 79.98, 67.7, 68.33, 74.41, 65.52, 63.05, 57, 54.85, 54.67, 65.19, 63.4, 58.78, 54.21, 47.21, 53.98] },
      velocityScore: { '1D': null, '1W': 18.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 317.5, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.85, PRN: false, RSHO: false, IDEF: 1.04, BILT: false },
      tonyNote: 'Kratos Defense is a defense technology company focused on unmanned systems, satellite communications, and high-performance computing for government customers. It appears in Industrials ETFs as an AI-adjacent defense name — autonomous systems and AI-driven surveillance are direct end markets. Revenue grew and the government contract backlog is expanding.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 2, avgWeight: 1.86, proScore: 0.74, coverage: 0.4,
      price: 294.15, weeklyPrices: [277.39, 279.89, 278.97, 291.50, 294.15], weeklyChange: 6.04, dayChange: 0.91, sortRank: 0, periodReturns: { '1M': 0.4, 'YTD': -13.5, '6M': -20, '1Y': 16 },
      priceHistory: { '1D': [291.5, 290.27, 291.74, 292.08, 290.82, 289.52, 289.9, 290.64, 290.86, 292.34, 292.8, 292.14, 292.07, 292.72, 293.43, 293.42, 293.52, 293.95, 293.64, 293.68, 293.95, 293.8, 293.93, 294.15], '1W': [277.39, 279.89, 278.97, 291.5, 294.15], '1M': [292.26, 297.52, 289.13, 300.95, 297.68, 299.66, 298.51, 296.89, 285.43, 278.19, 283.48, 279.62, 279.09, 281.99, 277.39, 279.89, 278.97, 291.5, 294.15], 'YTD': [340.07, 378.47, 418.86, 418.58, 420.51, 397.77, 418.78, 438.01, 453.73, 429.58, 416.59, 396.57, 369.08, 411.35, 398.13, 366.88, 362.17, 319.54, 334.22, 321.92, 320.9, 294.53, 300.95, 285.43, 281.99, 294.15], '6M': [367.6, 411.66, 422.68, 425.39, 413.14, 392.7, 443.14, 435.58, 437.03, 413.7, 427.99, 402.56, 393.32, 403.37, 396.17, 370.14, 364.29, 314.72, 336.95, 321.92, 320.9, 294.53, 300.95, 285.43, 281.99, 294.15], '1Y': [253.53, 258.5, 252.93, 262.49, 265.67, 266.65, 266.25, 269.98, 270.79, 269.94, 273.02, 276.16, 279.53, 288.49, 287.9, 285.77, 299.91, 322.02, 309.56, 313.97, 305.49, 306.65, 315.88, 329.16, 353.52, 341.98, 367.6, 411.66, 422.68, 425.39, 413.14, 392.7, 443.14, 443, 421.17, 414.56, 427.99, 402.56, 393.32, 403.37, 396.17, 370.14, 364.29, 314.72, 336.95, 317.55, 320.9, 294.53, 300.95, 285.43, 281.99, 294.15] },
      velocityScore: { '1D': null, '1W': 2.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 19.1, revenueGrowth: 13, eps: 15.39, grossMargin: 12, dividendYield: 1.89,
      etfPresence: { AIRR: 2.69, PRN: false, RSHO: false, IDEF: 1.03, BILT: false },
      tonyNote: 'Huntington Ingalls Industries is the only builder of nuclear-powered aircraft carriers for the U.S. Navy. Revenue is government-contracted and predictable; the ETF allocation in Industrials reflects defense spending growth and the Navy\'s backlog of nuclear submarine and carrier construction. A steady-state quality compounder in a market structure with no competition.',
    },
    {
      ticker: 'CW', name: 'Curtiss-Wright Corp', easyScore: 2, avgWeight: 1.81, proScore: 0.73, coverage: 0.4,
      price: 784.3, weeklyPrices: [737.39, 757.76, 757.76, 760.23, 784.30], weeklyChange: 6.36, dayChange: 3.17, sortRank: 0, periodReturns: { '1M': 7, 'YTD': 42.3, '6M': 32.2, '1Y': 59.6 },
      priceHistory: { '1D': [760.23, 778.62, 783.17, 779.81, 786.99, 788.67, 787.84, 786.99, 787.57, 787.38, 787.69, 784.23, 784.96, 784.31, 785.53, 786.63, 784.36, 786.74, 785.14, 785.09, 786.55, 786.45, 784.16, 784.3], '1W': [737.39, 757.76, 757.76, 760.23, 784.3], '1M': [721.33, 733.57, 719.02, 757.23, 758, 762.59, 764.61, 777.29, 771.93, 783.82, 765.13, 762.92, 767.73, 747.27, 737.39, 757.76, 757.76, 760.23, 784.3], 'YTD': [551.27, 582.61, 660.66, 649.08, 656.69, 649.32, 684.22, 699.24, 726.48, 706.46, 683.84, 688.54, 632.06, 728.96, 731.94, 710.93, 696.23, 742.89, 751, 726.65, 747.73, 743.43, 757.23, 771.93, 747.27, 784.3], '6M': [593.18, 635.74, 662.25, 664.46, 624.93, 634.25, 702.55, 698.72, 712.59, 692.58, 690.94, 702.25, 696.99, 722.52, 719.99, 725.5, 720.2, 724.43, 750.84, 726.65, 747.73, 743.43, 757.23, 771.93, 747.27, 784.3], '1Y': [491.4, 487.14, 480.06, 490.63, 496.42, 489.47, 487.37, 480.93, 478.15, 484.23, 518.78, 518.13, 530.68, 554.06, 550.8, 561.23, 570.8, 595.73, 578.59, 551.56, 536, 546.05, 547.76, 547.36, 568.06, 558.58, 593.18, 635.74, 662.25, 664.46, 624.93, 634.25, 702.55, 701.99, 678.68, 680.29, 690.94, 702.25, 696.99, 722.52, 719.99, 725.5, 720.2, 724.43, 750.84, 726.88, 747.73, 743.43, 757.23, 771.93, 747.27, 784.3] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$29B', pe: 57.3, revenueGrowth: 13, eps: 13.68, grossMargin: 37, dividendYield: 0.14,
      etfPresence: { AIRR: false, PRN: 2.68, RSHO: false, IDEF: 0.95, BILT: false },
      tonyNote: 'Curtiss-Wright Corp appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 1.36, proScore: 0.55, coverage: 0.4,
      price: 72.67, weeklyPrices: [75.06, 74.34, 72.77, 73.14, 72.67], weeklyChange: -3.19, dayChange: -0.65, sortRank: 0, periodReturns: { '1M': 1, 'YTD': 20.9, '6M': 22.1, '1Y': 24.3 },
      priceHistory: { '1D': [73.14, 73.71, 73.87, 73.62, 73.32, 73.48, 73, 72.93, 72.98, 73.01, 72.96, 72.96, 72.75, 72.86, 72.72, 72.71, 72.85, 72.75, 72.65, 72.67, 72.68, 72.72, 72.65, 72.67], '1W': [75.06, 74.34, 72.77, 73.14, 72.67], '1M': [71.59, 71.59, 72.26, 71.62, 72.08, 71.49, 71.48, 71.25, 73.12, 74.95, 75.79, 75.87, 77.53, 77.92, 75.06, 74.34, 72.77, 73.14, 72.67], 'YTD': [60.11, 61.15, 60.29, 64.96, 67.26, 66.92, 72.28, 72.98, 76.26, 73.18, 73.89, 73.6, 72.47, 73.01, 70.76, 71.1, 73.32, 73.76, 75.71, 77.88, 73.13, 72.43, 71.62, 73.12, 77.92, 72.67], '6M': [59.5, 60.49, 63.18, 66.92, 66.46, 71.12, 72.17, 73.97, 75.77, 74.4, 72.8, 73.81, 71.83, 72.82, 70.86, 71.65, 76.31, 72.95, 77.69, 77.88, 73.13, 72.43, 71.62, 73.12, 77.92, 72.67], '1Y': [58.48, 59.04, 57.68, 57.51, 60.26, 58.06, 57.46, 57.07, 57.88, 56.85, 58.4, 60.16, 63.97, 63.58, 62.68, 63.06, 57.48, 57.87, 59.58, 60.99, 59.61, 61.44, 61.95, 59.48, 58.92, 60.16, 59.5, 60.49, 63.18, 66.92, 66.46, 71.12, 72.17, 74.77, 74.77, 73.52, 72.8, 73.81, 71.83, 72.82, 70.86, 71.65, 76.31, 72.95, 77.69, 77.52, 73.13, 72.43, 71.62, 73.12, 77.92, 72.67] },
      velocityScore: { '1D': null, '1W': -3.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$89B', pe: 31.9, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.87,
      etfPresence: { AIRR: false, PRN: false, RSHO: 0.92, IDEF: false, BILT: 1.81 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AIR', name: 'AIRBUS GROUP', easyScore: 2, avgWeight: 1.34, proScore: 0.54, coverage: 0.4,
      price: 143.64, weeklyPrices: [141.85, 142.93, 142.76, 140.11, 143.64], weeklyChange: 1.26, dayChange: 2.52, sortRank: 0, periodReturns: { '1M': 23.1, 'YTD': 73.5, '6M': 60.6, '1Y': 103.5 },
      priceHistory: { '1D': [140.11, 143.65, 142.98, 142.56, 143.06, 143.29, 143.31, 143.66, 143.72, 143.8, 143.41, 142.76, 142.8, 143.08, 143.14, 142.99, 143.44, 143.46, 143.82, 143.46, 143.93, 143.69, 143.47, 143.64], '1W': [141.85, 142.93, 142.76, 140.11, 143.64], '1M': [114.72, 120.13, 117.36, 127.23, 129.01, 131.18, 129.96, 132.14, 134.88, 134.28, 132.26, 132.94, 138.51, 143.14, 141.85, 142.93, 142.76, 140.11, 143.64], 'YTD': [82.79, 94.73, 105.74, 105.66, 105.91, 113.09, 112.98, 116.69, 119.77, 107.87, 105.64, 103.49, 103.16, 120.78, 122.75, 111.5, 105.69, 118.71, 107.47, 107.51, 114.97, 115.53, 127.23, 134.88, 143.14, 143.64], '6M': [89.46, 97.71, 107.06, 104.06, 107.13, 113.57, 115.55, 117.06, 118.61, 108.32, 108.85, 118.52, 111.37, 123.04, 118.51, 112.08, 110.37, 117.82, 108.64, 107.51, 114.97, 115.53, 127.23, 134.88, 143.14, 143.64], '1Y': [70.6, 74.72, 80.55, 76.8, 73.54, 75.4, 75.38, 75.82, 75.66, 74.77, 74.43, 76.9, 87.9, 83.35, 81.28, 84.02, 86.48, 84.21, 82.42, 81.81, 77.69, 81.6, 81.13, 82.71, 86.18, 83.52, 89.46, 97.71, 107.06, 104.06, 107.13, 113.57, 115.55, 118.17, 110.71, 103.78, 108.85, 118.52, 111.37, 123.04, 118.51, 112.08, 110.37, 117.82, 108.64, 108.44, 114.97, 115.53, 127.23, 134.88, 143.14, 143.64] },
      velocityScore: { '1D': null, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: 31.6, revenueGrowth: 25, eps: 4.55, grossMargin: 19, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 2.52, BILT: false },
      tonyNote: 'AIRBUS GROUP appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, avgWeight: 1.24, proScore: 0.49, coverage: 0.4,
      price: 54.79, weeklyPrices: [47.10, 49.92, 54.93, 56.37, 54.79], weeklyChange: 16.33, dayChange: -2.8, sortRank: 0, periodReturns: { '1M': 10.8, 'YTD': -25.1, '6M': -39.4, '1Y': 21.1 },
      priceHistory: { '1D': [56.37, 55.38, 56.76, 56.83, 56.87, 55.6, 54.83, 54.65, 54.56, 54.99, 55.08, 55.15, 55.23, 55.31, 55.26, 55, 55.11, 54.94, 54.79, 54.89, 55.1, 54.95, 54.78, 54.79], '1W': [47.1, 49.92, 54.93, 56.37, 54.79], '1M': [49.64, 48.37, 45.87, 49.58, 47.83, 48.27, 51.7, 52.03, 50.37, 47.7, 46.38, 44.84, 46.27, 46.42, 47.1, 49.92, 54.93, 56.37, 54.79], 'YTD': [73.17, 101.28, 109.49, 108.22, 103.8, 95.36, 75.79, 81.27, 93.04, 106.09, 104.08, 102.39, 74.82, 87.75, 92.73, 82.11, 65.98, 63.19, 67.28, 65.76, 65.86, 54.39, 49.58, 50.37, 46.42, 54.79], '6M': [90.41, 107.49, 104.79, 115.29, 97.94, 79.52, 88.46, 83.44, 98.88, 104.84, 101.43, 99.6, 82.69, 84.22, 87.91, 76.6, 67.98, 60.45, 66.02, 65.76, 65.86, 54.39, 49.58, 50.37, 46.42, 54.79], '1Y': [45.24, 49.41, 56.22, 50.29, 51.41, 46.7, 50.6, 52.24, 53.41, 62.36, 63.8, 67.23, 71.35, 74.22, 79.07, 78.25, 84.15, 84.24, 70.68, 60.25, 60.07, 63.71, 66.06, 68.06, 78.87, 74.62, 90.41, 107.49, 104.79, 115.29, 97.94, 79.52, 88.46, 88.31, 97.14, 98.98, 101.43, 99.6, 82.69, 84.22, 87.91, 76.6, 67.98, 60.45, 66.02, 65.3, 65.86, 54.39, 49.58, 50.37, 46.42, 54.79] },
      velocityScore: { '1D': null, '1W': 22.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: 238.2, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 2.25, PRN: false, RSHO: false, IDEF: 0.22, BILT: false },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRCY', name: 'Mercury Systems, Inc.', easyScore: 2, avgWeight: 1.24, proScore: 0.5, coverage: 0.4,
      price: 122.53, weeklyPrices: [110.22, 122.33, 123.05, 126.21, 122.53], weeklyChange: 11.17, dayChange: -2.92, sortRank: 0, periodReturns: { '1M': 10.1, 'YTD': 67.8, '6M': 45.4, '1Y': 138.2 },
      priceHistory: { '1D': [126.21, 124.4, 125.5, 126.25, 128.45, 127.36, 127.02, 125.94, 126.24, 126.69, 126.41, 125.55, 125.56, 125.48, 125.33, 125.24, 124.64, 124.47, 124.45, 123.66, 123.4, 122.82, 122.96, 122.53], '1W': [110.22, 122.33, 123.05, 126.21, 122.53], '1M': [110.94, 108.82, 106.81, 119.32, 120.3, 115.93, 112.44, 115.5, 113.91, 111.76, 110.87, 105, 105.57, 109.38, 110.22, 122.33, 123.05, 126.21, 122.53], 'YTD': [73.01, 88.74, 102.95, 99.05, 93.88, 82.2, 82.36, 85.9, 91.01, 89.36, 80.71, 78.29, 69.86, 80.81, 85.51, 82.61, 74.75, 91.66, 92.5, 94.81, 108.11, 117.82, 119.32, 113.91, 109.38, 122.53], '6M': [84.25, 99.14, 99.57, 100.02, 77.12, 80.33, 89.86, 89.3, 89.18, 86, 78.97, 78.71, 74.75, 79.23, 84.91, 78.91, 78.91, 88.06, 94.55, 94.81, 108.11, 117.82, 119.32, 113.91, 109.38, 122.53], '1Y': [51.45, 51.27, 52.37, 52.76, 53.56, 53.58, 66.7, 66.83, 67.55, 68.68, 72.81, 76.57, 75.28, 84, 76.69, 77.04, 79.42, 77.41, 74.07, 70.85, 66.68, 66.8, 71.94, 74.49, 73.51, 73.85, 84.25, 99.14, 99.57, 100.02, 77.12, 80.33, 89.86, 89.58, 84.96, 81.44, 78.97, 78.71, 74.75, 79.23, 84.91, 78.91, 78.91, 88.06, 94.55, 96.36, 108.11, 117.82, 119.32, 113.91, 109.38, 122.53] },
      velocityScore: { '1D': null, '1W': 16.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 12, eps: -0.23, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: 1.36, PRN: false, RSHO: false, IDEF: 1.12, BILT: false },
      tonyNote: 'Mercury Systems, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RBC', name: 'RBC Bearings Incorporated', easyScore: 2, avgWeight: 1.16, proScore: 0.46, coverage: 0.4,
      price: 606.77, weeklyPrices: [634.78, 644.06, 620.47, 604.56, 606.77], weeklyChange: -4.41, dayChange: 0.37, sortRank: 0, periodReturns: { '1M': 2.8, 'YTD': 35.3, '6M': 27.6, '1Y': 56.8 },
      priceHistory: { '1D': [604.56, 608.8, 610.4, 609.75, 611.97, 609.75, 611.64, 611.86, 611.59, 613.22, 611.18, 609.85, 610.34, 608.32, 609.37, 607.76, 606.2, 607.86, 606.48, 608.01, 607.27, 606.49, 606.81, 606.77], '1W': [634.78, 644.06, 620.47, 604.56, 606.77], '1M': [590.97, 592.41, 576.74, 607.46, 603.64, 616.95, 621.08, 625.73, 639.18, 645.73, 633.44, 638.94, 648.89, 630.36, 634.78, 644.06, 620.47, 604.56, 606.77], 'YTD': [448.43, 485, 497.06, 504.07, 499.67, 544.02, 552.44, 562.54, 584.89, 565.64, 546.91, 537.2, 524.38, 580.55, 586.98, 588.74, 584.49, 623.19, 618.91, 571.05, 577.83, 589.76, 607.46, 639.18, 630.36, 606.77], '6M': [475.7, 489.97, 504.71, 508.95, 516.78, 550.53, 551.42, 565.44, 570.08, 559.52, 547.81, 561.66, 551.99, 595.11, 571.61, 601.39, 599.09, 611.54, 611.93, 571.05, 577.83, 589.76, 607.46, 639.18, 630.36, 606.77], '1Y': [386.98, 376.71, 391.98, 385.62, 405.98, 396.84, 394.75, 401.56, 389.96, 381.97, 382.27, 383.5, 384.3, 374.45, 380.76, 387.73, 412.19, 428.53, 434.25, 432.04, 426.16, 441.76, 443.51, 462.59, 459.83, 452.89, 475.7, 489.97, 504.71, 508.95, 516.78, 550.53, 551.42, 576.5, 566.06, 547.31, 547.81, 561.66, 551.99, 595.11, 571.61, 601.39, 599.09, 611.54, 611.93, 566.96, 577.83, 589.76, 607.46, 639.18, 630.36, 606.77] },
      velocityScore: { '1D': null, '1W': -4.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 66.9, revenueGrowth: 18, eps: 9.07, grossMargin: 45, dividendYield: null,
      etfPresence: { AIRR: 1.84, PRN: false, RSHO: false, IDEF: 0.47, BILT: false },
      tonyNote: 'RBC Bearings Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DRS', name: 'Leonardo DRS, Inc.', easyScore: 2, avgWeight: 0.55, proScore: 0.22, coverage: 0.4,
      price: 44.96, weeklyPrices: [40.95, 42.67, 42.69, 43.72, 44.96], weeklyChange: 9.79, dayChange: 2.84, sortRank: 0, periodReturns: { '1M': -2.6, 'YTD': 31.9, '6M': 20, '1Y': -4.7 },
      priceHistory: { '1D': [43.72, 44.05, 44.26, 44.31, 44.52, 44.4, 44.21, 44.12, 44.46, 44.7, 44.35, 44.23, 44.4, 44.48, 44.6, 44.84, 44.75, 44.88, 44.81, 44.83, 44.94, 44.86, 44.87, 44.96], '1W': [40.95, 42.67, 42.69, 43.72, 44.96], '1M': [46.55, 47.35, 46.11, 49.69, 48.53, 46.68, 45.59, 46.58, 46.08, 44.99, 45.74, 44.69, 44.36, 42.48, 40.95, 42.67, 42.69, 43.72, 44.96], 'YTD': [34.09, 38.84, 42.26, 40.99, 41.06, 38.93, 38.13, 38.14, 45.49, 47.41, 45.3, 44.4, 43.25, 47.93, 46.29, 42.07, 39.47, 41.79, 42.5, 44.56, 48.41, 46.71, 49.69, 46.08, 42.48, 44.96], '6M': [37.46, 40.85, 41.46, 42.47, 38.31, 37.87, 41.07, 42.36, 46.95, 46.16, 46.44, 46.32, 45.86, 47.1, 44.94, 41.41, 40.63, 41.44, 42.86, 44.56, 48.41, 46.71, 49.69, 46.08, 42.48, 44.96], '1Y': [47.16, 47.97, 46.79, 48.08, 42.25, 41.58, 41.67, 41.19, 41.66, 41.05, 42.02, 42.88, 43.76, 45.29, 43.67, 39.91, 40.51, 36.56, 35.33, 34.84, 33.24, 33.24, 33.92, 33.68, 34.77, 34.09, 37.46, 40.85, 41.46, 42.47, 38.31, 37.87, 41.07, 43.34, 45.82, 45.91, 46.44, 46.32, 45.86, 47.1, 44.94, 41.41, 40.63, 41.44, 42.86, 44.55, 48.41, 46.71, 49.69, 46.08, 42.48, 44.96] },
      velocityScore: { '1D': null, '1W': 4.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 42, revenueGrowth: 6, eps: 1.07, grossMargin: 24, dividendYield: 0.82,
      etfPresence: { AIRR: 0.83, PRN: false, RSHO: false, IDEF: 0.28, BILT: false },
      tonyNote: 'Leonardo DRS, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TPC', name: 'Tutor Perini Corporation', easyScore: 2, avgWeight: 0.36, proScore: 0.14, coverage: 0.4,
      price: 79.5, weeklyPrices: [81.88, 82.97, 79.51, 76.75, 79.50], weeklyChange: -2.91, dayChange: 3.58, sortRank: 0, periodReturns: { '1M': 12.7, 'YTD': 18.6, '6M': 11.8, '1Y': 65.7 },
      priceHistory: { '1D': [76.75, 79.3, 80.31, 80.05, 80.36, 80.84, 80.43, 80.21, 80.39, 80.53, 80.54, 80.58, 80.61, 80.61, 80.47, 80.24, 80.13, 80.04, 79.91, 79.74, 79.78, 79.85, 79.56, 79.5], '1W': [81.88, 82.97, 79.51, 76.75, 79.5], '1M': [72.13, 71.48, 68.72, 73.61, 74.92, 76.55, 76.19, 77.89, 77.99, 81.5, 81, 82.36, 81.56, 79.53, 81.88, 82.97, 79.51, 76.75, 79.5], 'YTD': [67.02, 70.17, 75.17, 76.01, 78.89, 83.48, 82.74, 84.99, 73.57, 72.04, 71.31, 72.44, 72.83, 80.54, 86.25, 84.19, 86.04, 96.98, 80.64, 76.99, 73.27, 72.38, 73.61, 77.99, 79.53, 79.5], '6M': [71.14, 73.54, 75.27, 79.38, 78.83, 85.07, 84.9, 86.1, 73.71, 69.83, 71.21, 78.37, 78.71, 81.5, 84.39, 86.48, 92.92, 81.96, 83.01, 76.99, 73.27, 72.38, 73.61, 77.99, 79.53, 79.5], '1Y': [47.99, 49.51, 48.97, 47.63, 46.18, 56.6, 56.75, 58.43, 58.94, 61.83, 64.22, 66.81, 65.43, 62.84, 62.26, 67.11, 68.84, 67.36, 62.94, 59.08, 60.94, 66.43, 68.6, 67.81, 69.57, 67.92, 71.14, 73.54, 75.27, 79.38, 78.83, 85.07, 84.9, 89.38, 71.12, 69.2, 71.21, 78.37, 78.71, 81.5, 84.39, 86.48, 92.92, 81.96, 83.01, 74.88, 73.27, 72.38, 73.61, 77.99, 79.53, 79.5] },
      velocityScore: { '1D': null, '1W': -6.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 54.5, revenueGrowth: 12, eps: 1.46, grossMargin: 12, dividendYield: 0.31,
      etfPresence: { AIRR: 0.69, PRN: false, RSHO: false, IDEF: 0.03, BILT: false },
      tonyNote: 'Tutor Perini Corporation appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TKR', name: 'TIMKEN CO/THE', easyScore: 1, avgWeight: 8.69, proScore: 1.74, coverage: 0.2,
      price: 139.61, weeklyPrices: [143.50, 145.32, 141.75, 139.16, 139.61], weeklyChange: -2.71, dayChange: 0.32, sortRank: 0, periodReturns: { '1M': 5.9, 'YTD': 65.9, '6M': 53.5, '1Y': 84.9 },
      priceHistory: { '1D': [139.16, 140.62, 140.9, 140.35, 140.42, 140.03, 139.93, 140.13, 140.51, 140.63, 140.18, 140.13, 140.27, 140.04, 140.11, 139.97, 139.87, 139.97, 139.95, 139.35, 139.35, 139.38, 139.48, 139.61], '1W': [143.5, 145.32, 141.75, 139.16, 139.61], '1M': [134.67, 137.09, 132.39, 137.4, 137.06, 139.12, 140.28, 139.4, 142.36, 141.97, 137.64, 137.99, 144.01, 141.22, 143.5, 145.32, 141.75, 139.16, 139.61], 'YTD': [84.13, 90.6, 93.73, 93.94, 93.19, 106.04, 107.84, 107.83, 109.99, 100.58, 98.74, 98.99, 95.94, 105.88, 103.73, 106.79, 106.53, 119.7, 115.74, 117.2, 126.78, 133.66, 137.4, 142.36, 141.22, 139.61], '6M': [90.95, 91.68, 93.89, 93.4, 98.99, 108.82, 107.11, 107.69, 105.59, 103.33, 98.23, 101.9, 102.06, 106.92, 103.92, 108.7, 110.89, 116.34, 116.74, 117.2, 126.78, 133.66, 137.4, 142.36, 141.22, 139.61], '1Y': [75.52, 77.3, 78.63, 81.69, 73.94, 74.15, 76, 78.99, 77.23, 77.15, 77.38, 76.84, 75.23, 76.76, 72.55, 75.1, 78.12, 78.51, 78.99, 76.41, 77.48, 79.95, 83.44, 87.01, 86.34, 85.81, 90.95, 91.68, 93.89, 93.4, 98.99, 108.82, 107.11, 109.88, 103.05, 99.7, 98.23, 101.9, 102.06, 106.92, 103.92, 108.7, 110.89, 116.34, 116.74, 118.93, 126.78, 133.66, 137.4, 142.36, 141.22, 139.61] },
      velocityScore: { '1D': null, '1W': 0, '1M': -3.3, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 31.7, revenueGrowth: 8, eps: 4.4, grossMargin: 31, dividendYield: 1.03,
      etfPresence: { AIRR: false, PRN: false, RSHO: 8.69, IDEF: false, BILT: false },
      tonyNote: 'TIMKEN CO/THE appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 4.24, proScore: 4.24, coverage: 1,
      price: 212.78, weeklyPrices: [261.15, 276.17, 229.18, 215.62, 212.78], weeklyChange: -18.52, dayChange: -1.32, sortRank: 0, periodReturns: { '1M': -6.6, 'YTD': 154.2, '6M': 112.3, '1Y': 344.8 },
      priceHistory: { '1D': [215.62, 212.57, 217.13, 217, 218.87, 220.98, 222.42, 221.65, 222.53, 220.46, 219.06, 220.18, 222, 221.29, 220.83, 219.95, 221.77, 219.79, 218.62, 218.7, 216.56, 214.3, 211.99, 212.78], '1W': [261.15, 276.17, 229.18, 215.62, 212.78], '1M': [218, 220.12, 211.69, 222.24, 232.36, 260.07, 265.1, 280.91, 286.69, 283.61, 275.25, 259.66, 256.63, 240.3, 261.15, 276.17, 229.18, 215.62, 212.78], 'YTD': [83.71, 97.3, 103.89, 94.5, 85.19, 86.1, 98.01, 100.61, 91.01, 94.94, 129.85, 114.15, 92.26, 125, 166.77, 156.14, 141.19, 195.09, 207.27, 191.82, 226.34, 259.67, 222.24, 286.69, 240.3, 212.78], '6M': [100.24, 105.43, 98.87, 100.43, 82.39, 88.61, 107.61, 106.12, 97.78, 112, 118.56, 115.09, 101.95, 136.33, 165.34, 157.08, 138.23, 184.77, 221.15, 191.82, 226.34, 259.67, 222.24, 286.69, 240.3, 212.78], '1Y': [47.84, 51.95, 52.37, 52.75, 54.17, 70.24, 71.62, 68.98, 68.32, 64.06, 90.96, 106.6, 110.22, 124.94, 135.46, 109, 117.26, 130.82, 111.28, 83.54, 83.26, 100.15, 100.33, 81.14, 93.23, 85.17, 100.24, 105.43, 98.87, 100.43, 82.39, 88.61, 107.61, 104.88, 95.65, 108.04, 118.56, 115.09, 101.95, 136.33, 165.34, 157.08, 138.23, 184.77, 221.15, 219.93, 226.34, 259.67, 222.24, 286.69, 240.3, 212.78] },
      velocityScore: { '1D': null, '1W': -1.9, '1M': -11.9, '6M': null }, isNew: false,
      marketCap: '$54B', pe: 82.2, revenueGrowth: 684, eps: 2.59, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 2.96, MEME: 6.34, RKNG: 3.41 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 4.84, proScore: 3.23, coverage: 0.667,
      price: 1720.96, weeklyPrices: [2050.39, 2273.73, 2032.22, 1745.00, 1720.96], weeklyChange: -16.07, dayChange: -1.38, sortRank: 0, periodReturns: { '1M': 10.4, 'YTD': 625, '6M': 392.2, '1Y': 3705.7 },
      priceHistory: { '1D': [1745, 1792.39, 1806.57, 1798.93, 1804.02, 1805.09, 1823.31, 1831.37, 1817.74, 1793.34, 1804.03, 1801.85, 1809.67, 1809.29, 1814.36, 1802.51, 1789.49, 1786.42, 1775.34, 1758, 1762, 1738, 1721.99, 1720.96], '1W': [2050.39, 2273.73, 2032.22, 1745, 1720.96], '1M': [1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 1745, 1720.96], 'YTD': [237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1447.23, 1392.56, 1641.64, 1759.68, 1881.51, 2184.75, 2090.71, 1720.96], '6M': [349.63, 389.81, 501.29, 527.63, 584.55, 599.34, 621.09, 632.38, 599.06, 655.43, 753.69, 677.86, 692.73, 851.57, 919.47, 932.43, 1096.51, 1339.96, 1382.72, 1392.56, 1641.64, 1759.68, 1881.51, 2184.75, 2090.71, 1720.96], '1Y': [45.22, 42.48, 41.61, 41.89, 42.51, 43.37, 44.54, 46.37, 52.47, 70.5, 90.09, 102.92, 113.5, 121.17, 134.61, 148.04, 186.16, 199.33, 239.48, 254.16, 200.27, 210.17, 225.47, 201.87, 241.05, 240.22, 349.63, 389.81, 501.29, 527.63, 584.55, 599.34, 621.09, 651.9, 565.59, 618.82, 753.69, 677.86, 692.73, 851.57, 919.47, 932.43, 1096.51, 1339.96, 1382.72, 1542.24, 1641.64, 1759.68, 1881.51, 2184.75, 2090.71, 1720.96] },
      velocityScore: { '1D': null, '1W': 11, '1M': -19, '6M': null }, isNew: false,
      marketCap: '$255B', pe: 58.7, revenueGrowth: 251, eps: 29.32, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.1, RKNG: 3.59 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 2, avgWeight: 4.41, proScore: 2.94, coverage: 0.667,
      price: 570.64, weeklyPrices: [651.88, 638.72, 598.37, 539.00, 570.64], weeklyChange: -12.46, dayChange: 5.87, sortRank: 0, periodReturns: { '1M': 11.5, 'YTD': 231.2, '6M': 160.1, '1Y': 774.9 },
      priceHistory: { '1D': [539, 584.99, 590, 590.33, 593.74, 593.48, 596.45, 597.39, 589.91, 586.49, 580.71, 580.41, 579.97, 576.01, 579.64, 576.5, 576.17, 575.7, 573.23, 570.27, 573.44, 573.33, 571.56, 570.64], '1W': [651.88, 638.72, 598.37, 539, 570.64], '1M': [526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539, 570.64], 'YTD': [172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 459.62, 531.18, 575.5, 529.29, 746.23, 586.45, 570.64], '6M': [219.38, 214, 241.9, 279.7, 269.41, 273.74, 284.67, 290.95, 261.3, 268.81, 304.9, 296.14, 297.73, 337.88, 361.69, 403.12, 434.52, 463.91, 489.15, 459.62, 531.18, 575.5, 529.29, 746.23, 586.45, 570.64], '1Y': [65.22, 66.93, 68.74, 68.99, 77.29, 74.64, 75.06, 76.97, 80.34, 93.29, 102.39, 112.41, 116.74, 125.28, 118.86, 121.53, 129.43, 150.21, 162.96, 157.83, 139.19, 163.54, 169.78, 172.04, 176.76, 176.06, 219.38, 214, 241.9, 279.7, 269.41, 273.74, 284.67, 282.25, 259.03, 261.18, 304.9, 296.14, 297.73, 337.88, 361.69, 403.12, 434.52, 463.91, 489.15, 486.46, 531.18, 575.5, 529.29, 746.23, 586.45, 570.64] },
      velocityScore: { '1D': null, '1W': 0.7, '1M': 83.7, '6M': null }, isNew: false,
      marketCap: '$197B', pe: 34.1, revenueGrowth: 46, eps: 16.71, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { BUZZ: false, MEME: 5.12, RKNG: 3.7 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'WULF', name: 'WULF', easyScore: 2, avgWeight: 4.31, proScore: 2.87, coverage: 0.667,
      price: 22.64, weeklyPrices: [25.58, 24.70, 23.58, 21.18, 22.64], weeklyChange: -11.51, dayChange: 6.87, sortRank: 0, periodReturns: { '1M': -5.7, 'YTD': 97, '6M': 71.7, '1Y': 371.6 },
      priceHistory: { '1D': [21.18, 24.72, 24.23, 23.76, 23.99, 24.48, 24.32, 24.17, 24.14, 23.89, 23.68, 23.55, 23.79, 23.96, 23.78, 23.67, 23.6, 23.31, 23.32, 23.39, 23.02, 22.78, 22.56, 22.64], '1W': [25.58, 24.7, 23.58, 21.18, 22.64], '1M': [25.86, 25.3, 23.19, 25.35, 26.06, 28.17, 28.01, 27.86, 28.98, 28.31, 28.78, 26.97, 26.06, 25.83, 25.58, 24.7, 23.58, 21.18, 22.64], 'YTD': [11.49, 12.84, 13.83, 14.12, 13.37, 14.29, 16.26, 15.68, 16.02, 13.85, 16.41, 16.19, 13.7, 18.05, 19.67, 20.55, 20.02, 25.74, 23.12, 21.63, 26.4, 26.19, 25.35, 28.98, 25.83, 22.64], '6M': [13.18, 14.14, 13.12, 15.11, 13.88, 16.03, 15.47, 17.92, 15.37, 15.22, 15.3, 16.86, 14.48, 19.03, 19.31, 20.37, 21.73, 24.02, 24.17, 21.63, 26.4, 26.19, 25.35, 28.98, 25.83, 22.64], '1Y': [4.8, 5.11, 4.99, 5.1, 4.89, 5.4, 8.97, 9.16, 9.45, 9.2, 10.49, 11.49, 11.6, 11.97, 14, 13.85, 13.71, 15.5, 13.94, 10.99, 11.29, 15.3, 14.96, 12.49, 12.47, 11.15, 13.18, 14.14, 13.12, 15.11, 13.88, 16.03, 15.47, 17.88, 15.23, 14.67, 15.3, 16.86, 14.48, 19.03, 19.31, 20.37, 21.73, 24.02, 24.17, 22.92, 26.4, 26.19, 25.35, 28.98, 25.83, 22.64] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$11B', pe: null, revenueGrowth: -1, eps: -2.51, grossMargin: 64, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.49, RKNG: 3.13 },
      tonyNote: 'WULF appears in 2 of 3 Meme ETFs (67% coverage) with average weight 4.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LITE', name: 'LITE', easyScore: 2, avgWeight: 4.05, proScore: 2.7, coverage: 0.667,
      price: 731, weeklyPrices: [851.40, 858.06, 801.16, 728.32, 731.00], weeklyChange: -14.14, dayChange: 0.37, sortRank: 0, periodReturns: { '1M': -15.4, 'YTD': 98.3, '6M': 83.9, '1Y': 702.6 },
      priceHistory: { '1D': [728.32, 729.25, 738.02, 733.74, 739.08, 740.66, 742.91, 742.74, 736, 733.66, 735.83, 738.04, 737.9, 734.09, 735.92, 736.68, 732.52, 730.32, 724.11, 727.48, 739.34, 735.72, 732.9, 731], '1W': [851.4, 858.06, 801.16, 728.32, 731], '1M': [895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93, 827.92, 842.53, 861.97, 816.98, 851.4, 858.06, 801.16, 728.32, 731], 'YTD': [368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 896.02, 824.01, 873.6, 858.32, 944.28, 1030.37, 868.07, 860.62, 945.08, 889.59, 850, 816.98, 731], '6M': [397.42, 361.33, 362.44, 385, 465.54, 574.11, 635.64, 723.39, 680.8, 672, 700.81, 777.17, 764.65, 894.13, 891.22, 846.89, 902.32, 892.58, 1001.81, 868.07, 860.62, 945.08, 889.59, 850, 816.98, 731], '1Y': [91.08, 92.24, 103.84, 107.17, 111.13, 115.03, 115.86, 119.34, 132.81, 149.4, 168.77, 164.71, 162.58, 160.6, 160.56, 161, 179.3, 201.56, 240.11, 232.15, 255.59, 317.93, 342.56, 334.69, 389.88, 371.18, 397.42, 361.33, 362.44, 385, 465.54, 574.11, 635.64, 677, 650.82, 616.09, 700.81, 777.17, 764.65, 894.13, 891.22, 846.89, 902.32, 892.58, 1001.81, 964.5, 860.62, 945.08, 889.59, 850, 816.98, 731] },
      velocityScore: { '1D': null, '1W': 3.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$57B', pe: 128.7, revenueGrowth: 90, eps: 5.68, grossMargin: 41, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.15, RKNG: 2.95 },
      tonyNote: 'LITE appears in 2 of 3 Meme ETFs (67% coverage) with average weight 4.0% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 2, avgWeight: 4.01, proScore: 2.67, coverage: 0.667,
      price: 43.91, weeklyPrices: [45.91, 45.73, 43.32, 38.82, 43.91], weeklyChange: -4.36, dayChange: 13.11, sortRank: 0, periodReturns: { '1M': -19.2, 'YTD': 16.3, '6M': -4.4, '1Y': 159.1 },
      priceHistory: { '1D': [38.82, 43.54, 44.24, 43.95, 43.93, 44.65, 44.47, 44.11, 44.11, 43.68, 43.65, 44.04, 44.36, 44.44, 44.57, 44.69, 44.72, 44.58, 44.4, 44.7, 44.43, 44, 43.8, 43.91], '1W': [45.91, 45.73, 43.32, 38.82, 43.91], '1M': [59.19, 54.02, 51.52, 56.71, 59.77, 60.85, 59.18, 58.11, 59.96, 56.87, 54.72, 50.3, 47.74, 47.21, 45.91, 45.73, 43.32, 38.82, 43.91], 'YTD': [37.77, 45.68, 51.89, 56.68, 53.74, 41.83, 42.22, 42.36, 41.39, 38.84, 44.94, 42.16, 31.62, 36.83, 48.82, 48.39, 42.86, 60.98, 55.17, 52.71, 64.05, 61.86, 56.71, 59.96, 47.21, 43.91], '6M': [45.91, 52.99, 53.48, 62.94, 44.94, 42.67, 43.29, 44.03, 43.84, 41.98, 42.21, 41.43, 34.09, 37.06, 47.7, 52.02, 45.51, 56.85, 58.4, 52.71, 64.05, 61.86, 56.71, 59.96, 47.21, 43.91], '1Y': [16.95, 17.28, 18.15, 16.58, 16.48, 17.97, 19.69, 21.43, 26.48, 26.19, 37.14, 41.9, 45.93, 57.75, 64.14, 59.22, 62.9, 60.75, 62.38, 46.37, 42.26, 48.49, 46.34, 35.48, 42.04, 38.3, 45.91, 52.99, 53.48, 62.94, 44.94, 42.67, 43.29, 44.24, 40.13, 41.37, 42.21, 41.43, 34.09, 37.06, 47.7, 52.02, 45.51, 56.85, 58.4, 58.06, 64.05, 61.86, 56.71, 59.96, 47.21, 43.91] },
      velocityScore: { '1D': null, '1W': 2.7, '1M': -34.2, '6M': null }, isNew: false,
      marketCap: '$16B', pe: 57, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 2.09, MEME: 5.93, RKNG: false },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'MRVL', name: 'MRVL', easyScore: 2, avgWeight: 3.61, proScore: 2.41, coverage: 0.667,
      price: 249.57, weeklyPrices: [277.75, 297.89, 272.05, 245.29, 249.57], weeklyChange: -10.15, dayChange: 1.74, sortRank: 0, periodReturns: { '1M': -5.3, 'YTD': 193.7, '6M': 182.9, '1Y': 248.8 },
      priceHistory: { '1D': [245.29, 254.84, 255.9, 255.71, 259.8, 257.57, 258.82, 258.88, 256.52, 255.43, 255.1, 256.38, 255.91, 255.35, 256.54, 255.71, 255.57, 254.8, 253.52, 252.53, 252.81, 252.07, 250.3, 249.57], '1W': [277.75, 297.89, 272.05, 245.29, 249.57], '1M': [288.85, 266.88, 252.59, 280.71, 279.7, 308.88, 278.67, 289.54, 310.58, 307.86, 279.04, 276.7, 281.26, 266.77, 277.75, 297.89, 272.05, 245.29, 249.57], 'YTD': [84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 114.45, 134.6, 157.32, 156.57, 172.15, 177.95, 186.8, 204.83, 316.43, 280.71, 310.58, 266.77, 249.57], '6M': [88.23, 83.05, 82.55, 83.62, 73.73, 81.34, 79.61, 80.92, 78.09, 90.44, 87.62, 98.45, 106.71, 119.93, 133.37, 165.56, 165.15, 160.01, 182.58, 186.8, 204.83, 316.43, 280.71, 310.58, 266.77, 249.57], '1Y': [71.55, 72.51, 73.06, 75.91, 76.53, 77.28, 76.19, 73, 62.87, 66, 67.43, 75.53, 82.39, 88.92, 89.39, 85.84, 84.13, 93.74, 90.92, 86.45, 77.45, 91.1, 92, 84.26, 84.8, 86.76, 88.23, 83.05, 82.55, 83.62, 73.73, 81.34, 79.61, 79.29, 75.68, 87.67, 87.62, 98.45, 106.71, 119.93, 133.37, 165.56, 165.15, 160.01, 182.58, 190.69, 204.83, 316.43, 280.71, 310.58, 266.77, 249.57] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$218B', pe: 85.5, revenueGrowth: 28, eps: 2.92, grossMargin: 52, dividendYield: 0.1,
      etfPresence: { BUZZ: 2.67, MEME: 4.56, RKNG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'AMD', name: 'AMD', easyScore: 2, avgWeight: 3.45, proScore: 2.3, coverage: 0.667,
      price: 553.24, weeklyPrices: [539.49, 580.91, 540.88, 517.82, 553.24], weeklyChange: 2.55, dayChange: 6.84, sortRank: 0, periodReturns: { '1M': 18.6, 'YTD': 158.3, '6M': 158.1, '1Y': 310.4 },
      priceHistory: { '1D': [517.82, 547.32, 560.48, 562.69, 568.4, 568.23, 567.65, 569.9, 566.95, 566.09, 563.99, 568.76, 567.05, 566.06, 563.38, 562.45, 562.84, 559.55, 557.9, 558.24, 557.75, 555.22, 554.08, 553.24], '1W': [539.49, 580.91, 540.88, 517.82, 553.24], '1M': [490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 553.24], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 518.09, 523.2, 488.45, 537.37, 521.58, 553.24], '6M': [214.35, 220.97, 249.8, 252.74, 200.19, 213.58, 203.37, 210.86, 202.07, 204.83, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 354.49, 408.46, 449.7, 447.58, 518.09, 523.2, 488.45, 537.37, 521.58, 553.24], '1Y': [134.8, 146.24, 157, 173.66, 176.78, 172.28, 177.51, 167.76, 162.63, 151.41, 161.16, 159.79, 161.36, 203.71, 216.42, 240.56, 252.92, 256.12, 233.54, 246.81, 203.78, 219.76, 221.11, 207.58, 214.95, 215.34, 214.35, 220.97, 249.8, 252.74, 200.19, 213.58, 203.37, 203.68, 199.45, 197.74, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 354.49, 408.46, 449.7, 449.59, 518.09, 523.2, 488.45, 537.37, 521.58, 553.24] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$902B', pe: 184.4, revenueGrowth: 38, eps: 3, grossMargin: 53, dividendYield: null,
      etfPresence: { BUZZ: 3.23, MEME: false, RKNG: 3.66 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 2, avgWeight: 3.32, proScore: 2.21, coverage: 0.667,
      price: 984.12, weeklyPrices: [1145.28, 1154.29, 1032.28, 975.56, 984.12], weeklyChange: -14.07, dayChange: 0.88, sortRank: 0, periodReturns: { '1M': 13.9, 'YTD': 244.8, '6M': 186.6, '1Y': 720.6 },
      priceHistory: { '1D': [975.56, 1000.9, 1000.6, 995.49, 1013, 1009.19, 1010.41, 1013.69, 1011.49, 998.81, 1001.29, 1003.76, 1007, 1007.79, 1012.44, 1008.1, 1003.08, 1002.2, 1002.58, 998.7, 999.5, 992.04, 986.78, 984.12], '1W': [1145.28, 1154.29, 1032.28, 975.56, 984.12], '1M': [949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.12], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 923.52, 996, 995.87, 1133.99, 1132.33, 984.12], '6M': [343.43, 338.13, 389.11, 435.28, 379.4, 410.34, 417.35, 429, 400.77, 418.69, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 517.16, 646.63, 776.01, 731.99, 923.52, 996, 995.87, 1133.99, 1132.33, 984.12], '1Y': [119.92, 118.61, 113.23, 111.25, 107.77, 123.72, 120.87, 117.68, 119.01, 131.46, 157.77, 164.62, 163.9, 190.96, 192.77, 206.77, 219.02, 223.77, 237.92, 246.83, 207.37, 240.46, 246.92, 237.5, 276.59, 292.63, 343.43, 338.13, 389.11, 435.28, 379.4, 410.34, 417.35, 415.56, 397.05, 405.35, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 517.16, 646.63, 776.01, 762.1, 923.52, 996, 995.87, 1133.99, 1132.33, 984.12] },
      velocityScore: { '1D': null, '1W': -35.6, '1M': -29.2, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 22.3, revenueGrowth: 346, eps: 44.19, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { BUZZ: 2.99, MEME: false, RKNG: 3.65 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'INTC', name: 'INTC', easyScore: 2, avgWeight: 3.17, proScore: 2.12, coverage: 0.667,
      price: 122.57, weeklyPrices: [131.72, 139.63, 127.02, 120.35, 122.57], weeklyChange: -6.95, dayChange: 1.84, sortRank: 0, periodReturns: { '1M': 23.6, 'YTD': 232.2, '6M': 206.1, '1Y': 457.1 },
      priceHistory: { '1D': [120.35, 125.83, 126.43, 125.51, 126.72, 126.8, 126.24, 126.75, 126.2, 125.29, 124.59, 125.05, 124.71, 124.39, 124.16, 124.4, 124.84, 124.28, 124.01, 124.24, 124.27, 123.45, 123.04, 122.57], '1W': [131.72, 139.63, 127.02, 120.35, 122.57], '1M': [110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 127.02, 120.35, 122.57], 'YTD': [36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 43.63, 45.5, 45.58, 45.76, 44.01, 41.19, 58.95, 64.94, 65.27, 94.75, 113.01, 120.29, 118.96, 120.89, 111.78, 116.96, 133.99, 128.32, 122.57], '6M': [40.04, 47.29, 54.25, 48.78, 48.6, 48.29, 44.62, 46.88, 45.58, 47.98, 45.03, 47.18, 48.03, 61.72, 68.5, 66.78, 94.48, 109.62, 115.93, 118.96, 120.89, 111.78, 116.96, 133.99, 128.32, 122.57], '1Y': [22, 23.3, 23.26, 20.68, 19.5, 20.65, 24.56, 24.8, 24.35, 24.48, 24.77, 28.76, 34.48, 36.59, 37.22, 38.1, 38.28, 39.99, 38.13, 35.52, 34.5, 40.01, 40.3, 37.51, 36.37, 37.3, 40.04, 47.29, 54.25, 48.78, 48.6, 48.29, 44.62, 45.46, 45.95, 45.25, 45.03, 47.18, 48.03, 61.72, 68.5, 66.78, 94.48, 109.62, 115.93, 118.5, 120.89, 111.78, 116.96, 133.99, 128.32, 122.57] },
      velocityScore: { '1D': null, '1W': -4.5, '1M': null, '6M': null }, isNew: true,
      marketCap: '$616B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 2.81, MEME: false, RKNG: 3.54 },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab', easyScore: 2, avgWeight: 2.65, proScore: 1.76, coverage: 0.667,
      price: 93.32, weeklyPrices: [98.01, 101.65, 100.07, 100.46, 93.32], weeklyChange: -4.79, dayChange: -7.11, sortRank: 0, periodReturns: { '1M': -15.2, 'YTD': 33.8, '6M': 8.5, '1Y': 140 },
      priceHistory: { '1D': [100.46, 97.93, 98.63, 98.84, 98.43, 97.2, 96.1, 96.94, 96.56, 97.13, 96.51, 96.36, 96.35, 96.35, 96.1, 95.72, 95.91, 95.75, 94.89, 94.68, 94.68, 93.77, 93.21, 93.32], '1W': [98.01, 101.65, 100.07, 100.46, 93.32], '1M': [113.65, 108.23, 105.05, 114.78, 102.39, 109.25, 104.63, 107.98, 107.24, 100.29, 95.12, 85.41, 80.69, 84.54, 98.01, 101.65, 100.07, 100.46, 93.32], 'YTD': [69.76, 83.08, 90.76, 88.9, 80.07, 72.32, 67.44, 70.21, 70.97, 71.48, 71.31, 68, 57.38, 69.08, 73.6, 90.04, 77.02, 84.65, 124.15, 134.28, 148.03, 119.95, 114.78, 107.24, 84.54, 93.32], '6M': [86.03, 86.58, 87.82, 88.57, 73.11, 69.62, 76.58, 70.2, 71.91, 71.96, 69.48, 72.88, 65.52, 66.74, 82.93, 84.6, 82.51, 78.58, 132.55, 134.28, 148.03, 119.95, 114.78, 107.24, 84.54, 93.32], '1Y': [38.88, 43.21, 47.19, 45.11, 44.54, 45.02, 44.27, 44.38, 48.6, 47.73, 54.04, 49.81, 47.01, 58.5, 65.42, 67.35, 64.56, 62.98, 51.64, 45.54, 40.3, 40.37, 51.56, 55.41, 77.55, 70.45, 86.03, 86.58, 87.82, 88.57, 73.11, 69.62, 76.58, 72.65, 70, 68.37, 69.48, 72.88, 65.52, 66.74, 82.93, 84.6, 82.51, 78.58, 132.55, 125.45, 148.03, 119.95, 114.78, 107.24, 84.54, 93.32] },
      velocityScore: { '1D': null, '1W': -12.9, '1M': -47.6, '6M': null }, isNew: false,
      marketCap: '$58B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 1.9, MEME: false, RKNG: 3.39 },
      tonyNote: 'Rocket Lab is the small-launch and space systems name that Electrification and AI infrastructure ETFs hold for satellite connectivity exposure — relevant to both GPS-dependent grids and low-orbit broadband that supports remote AI compute. Small market cap, no earnings, but consistent revenue growth and a rapidly expanding backlog.',
    },
    {
      ticker: 'GOOGL', name: 'GOOGL', easyScore: 2, avgWeight: 2.52, proScore: 1.68, coverage: 0.667,
      price: 364.42, weeklyPrices: [353.65, 357.37, 361.21, 359.91, 364.42], weeklyChange: 3.05, dayChange: 1.25, sortRank: 0, periodReturns: { '1M': -1.1, 'YTD': 16.4, '6M': 15.9, '1Y': 106.1 },
      priceHistory: { '1D': [359.91, 360.89, 358.01, 358.05, 359.7, 359.93, 361.34, 361.74, 361.56, 362.46, 362.8, 363.12, 363.42, 363.42, 364.04, 364.73, 363.68, 363.96, 364.42, 364.42, 364.79, 364.22, 364.88, 364.42], '1W': [353.65, 357.37, 361.21, 359.91, 364.42], '1M': [363.31, 364.26, 356.38, 357.77, 359.68, 369.35, 373.25, 363.79, 368.03, 349.68, 346.13, 345.29, 343.71, 337.39, 353.65, 357.37, 361.21, 359.91, 364.42], 'YTD': [313, 325.44, 332.78, 327.93, 338, 322.86, 305.72, 311.49, 306.52, 306.36, 305.56, 302.06, 273.5, 317.32, 337.12, 339.32, 349.94, 398.04, 402.62, 388.91, 390.13, 372.19, 357.77, 368.03, 337.39, 364.42], '6M': [314.34, 335.97, 328.38, 336.01, 333.04, 310.96, 302.85, 312.9, 303.13, 308.7, 307.69, 290.93, 297.39, 318.49, 336.02, 338.89, 384.8, 397.99, 401.07, 388.91, 390.13, 372.19, 357.77, 368.03, 337.39, 364.42], '1Y': [176.79, 181.56, 190.1, 192.58, 195.04, 201, 203.9, 206.09, 212.91, 234.04, 251.61, 252.53, 244.05, 250.43, 244.15, 256.55, 259.92, 281.19, 278.83, 276.41, 299.66, 314.89, 313.72, 308.22, 309.78, 313.85, 314.34, 335.97, 328.38, 336.01, 333.04, 310.96, 302.85, 307.38, 300.88, 303.55, 307.69, 290.93, 297.39, 318.49, 336.02, 338.89, 384.8, 397.99, 401.07, 387.66, 390.13, 372.19, 357.77, 368.03, 337.39, 364.42] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$4.4T', pe: 27.8, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { BUZZ: 1.58, MEME: false, RKNG: 3.46 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 1, avgWeight: 7.24, proScore: 2.41, coverage: 0.333,
      price: 291.36, weeklyPrices: [275.01, 302.70, 289.50, 270.89, 291.36], weeklyChange: 5.95, dayChange: 7.56, sortRank: 0, periodReturns: { '1M': 10.5, 'YTD': 235.3, '6M': 182.7, '1Y': 1096.1 },
      priceHistory: { '1D': [270.89, 282.39, 300.27, 301.3, 302.89, 301.11, 300.98, 301.75, 298.2, 296.6, 296.7, 295.38, 296.48, 295.59, 295.72, 294.58, 298.05, 296.64, 292.63, 293.19, 295.63, 294.16, 291.94, 291.36], '1W': [275.01, 302.7, 289.5, 270.89, 291.36], '1M': [253.57, 259.61, 234.23, 248.88, 260.22, 274.5, 280.88, 284.99, 328.91, 345.85, 321.98, 326.19, 309.18, 252.02, 275.01, 302.7, 289.5, 270.89, 291.36], 'YTD': [86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 160.28, 166, 151.32, 153.68, 141.33, 119.51, 146.78, 213.84, 229.75, 287.97, 285.47, 289.76, 282.31, 290.01, 291.37, 248.88, 328.91, 252.02, 291.36], '6M': [103.05, 139.77, 150.56, 165.39, 147.35, 155.54, 159, 174.77, 164.78, 159.21, 156.58, 150.22, 132.45, 160.13, 210.06, 237.57, 283.36, 258.64, 303.41, 282.31, 290.01, 291.37, 248.88, 328.91, 252.02, 291.36], '1Y': [24.36, 25.96, 25.36, 34.78, 36.1, 37.65, 45.28, 48.54, 52.94, 53.44, 67.02, 86.27, 73.6, 86.97, 109.91, 109.06, 110.38, 132.16, 135.21, 111.89, 89.99, 98.93, 111.79, 89.58, 92.26, 87.26, 103.05, 139.77, 150.56, 165.39, 147.35, 155.54, 159, 168.57, 159.99, 157.17, 156.58, 150.22, 132.45, 160.13, 210.06, 237.57, 283.36, 258.64, 303.41, 307.88, 290.01, 291.37, 248.88, 328.91, 252.02, 291.36] },
      velocityScore: { '1D': null, '1W': -24.9, '1M': -28.7, '6M': null }, isNew: false,
      marketCap: '$83B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 7.24, RKNG: false },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 1, avgWeight: 7.01, proScore: 2.34, coverage: 0.333,
      price: 124.14, weeklyPrices: [150.10, 148.16, 139.00, 120.95, 124.14], weeklyChange: -17.3, dayChange: 2.63, sortRank: 0, periodReturns: { '1M': -29.9, 'YTD': 256.1, '6M': 221.5, '1Y': 369.5 },
      priceHistory: { '1D': [120.95, 121.98, 125.39, 126.02, 127.52, 128.42, 129.16, 129.15, 127.39, 126.72, 126.95, 128.56, 128.84, 128.11, 128.85, 128.03, 127.56, 127.03, 126.82, 127.68, 126.95, 125.09, 124.18, 124.14], '1W': [150.1, 148.16, 139, 120.95, 124.14], '1M': [196.64, 162.88, 175.13, 172.78, 169.05, 191.55, 170.81, 167.34, 161.85, 171.23, 147.44, 146.97, 138.54, 135.69, 150.1, 148.16, 139, 120.95, 124.14], 'YTD': [34.86, 33.01, 37, 35.72, 43.61, 44.3, 44.46, 53.96, 102.51, 110.62, 94.07, 95.76, 85.19, 132.7, 142.55, 149.42, 152.83, 178.54, 223.1, 165.26, 169.02, 202.89, 172.78, 161.85, 135.69, 124.14], '6M': [38.61, 34.18, 38.38, 45.23, 39.9, 48.4, 46.98, 58.12, 99.71, 127.01, 92.63, 114.41, 86.35, 133.3, 157.32, 137.73, 164.36, 157.55, 203.57, 165.26, 169.02, 202.89, 172.78, 161.85, 135.69, 124.14], '1Y': [26.44, 29.5, 28.23, 25.22, 22.19, 20.86, 22.36, 24.79, 24.2, 23.63, 29.56, 30.54, 25.94, 33.79, 29.1, 34.14, 34.01, 35.56, 28.57, 21.47, 20.58, 26.53, 27.84, 29.9, 39.1, 36.02, 38.61, 34.18, 38.38, 45.23, 39.9, 48.4, 46.98, 53.69, 101.14, 106.19, 92.63, 114.41, 86.35, 133.3, 157.32, 137.73, 164.36, 157.55, 203.57, 176.81, 169.02, 202.89, 172.78, 161.85, 135.69, 124.14] },
      velocityScore: { '1D': null, '1W': -43.2, '1M': -46.1, '6M': null }, isNew: false,
      marketCap: '$10B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 7.01, RKNG: false },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 1, avgWeight: 5.86, proScore: 1.95, coverage: 0.333,
      price: 80.71, weeklyPrices: [86.77, 88.86, 86.10, 85.13, 80.71], weeklyChange: -6.98, dayChange: -5.19, sortRank: 0, periodReturns: { '1M': -13.8, 'YTD': 11.1, '6M': -17.2, '1Y': 76.6 },
      priceHistory: { '1D': [85.13, 82.95, 84.1, 83.3, 83.57, 82.67, 81.22, 82.31, 82.11, 81.83, 81.47, 81.43, 81.66, 81.79, 82.19, 82.22, 82.36, 82.35, 81.89, 82.08, 82.13, 81.49, 80.58, 80.71], '1W': [86.77, 88.86, 86.1, 85.13, 80.71], '1M': [92.06, 88.71, 87.32, 97.56, 82.41, 87.57, 82.25, 85.43, 80.66, 73.19, 72.87, 68.01, 65.62, 71.45, 86.77, 88.86, 86.1, 85.13, 80.71], 'YTD': [72.63, 90.56, 101.25, 113.57, 111.21, 101.79, 82.51, 83.9, 86.92, 89.76, 89.11, 88.42, 73.82, 96.46, 86.91, 84.66, 69.85, 70.68, 74.81, 89.58, 133.09, 107.29, 97.56, 80.66, 71.45, 80.71], '6M': [97.49, 92.72, 103.5, 121.23, 103.5, 96.92, 86.4, 82.36, 104.89, 88.21, 90.74, 96.06, 83.99, 91.61, 90.94, 78.75, 73.9, 65.35, 83.01, 89.58, 133.09, 107.29, 97.56, 80.66, 71.45, 80.71], '1Y': [45.69, 47.86, 56.67, 54.22, 51.38, 45.92, 48.08, 47.07, 48.94, 40.77, 40.97, 48.85, 48.84, 72.9, 90.5, 82.81, 73.7, 80.25, 69.19, 61.4, 51.37, 52.61, 74, 67.81, 86.48, 74.68, 97.49, 92.72, 103.5, 121.23, 103.5, 96.92, 86.4, 85.76, 93.86, 87.09, 90.74, 96.06, 83.99, 91.61, 90.94, 78.75, 73.9, 65.35, 83.01, 96.23, 133.09, 107.29, 97.56, 80.66, 71.45, 80.71] },
      velocityScore: { '1D': null, '1W': -20.1, '1M': -51, '6M': null }, isNew: false,
      marketCap: '$31B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.86, RKNG: false },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 1, avgWeight: 5.42, proScore: 1.81, coverage: 0.333,
      price: 49.36, weeklyPrices: [53.88, 53.26, 51.40, 49.12, 49.36], weeklyChange: -8.39, dayChange: 0.49, sortRank: 0, periodReturns: { '1M': -13.1, 'YTD': 10, '6M': -2.8, '1Y': 9.2 },
      priceHistory: { '1D': [49.12, 50.18, 50.69, 50.5, 50.44, 50.73, 50.43, 50.75, 50.76, 50.94, 50.78, 50.92, 51.13, 51.18, 51.08, 51.04, 51.03, 50.72, 50.32, 50.06, 49.99, 49.62, 49.38, 49.36], '1W': [53.88, 53.26, 51.4, 49.12, 49.36], '1M': [62.8, 56.69, 56.63, 57.99, 57.85, 61.18, 56.06, 54.69, 56.55, 58.32, 57.85, 53.6, 50.56, 49.31, 53.88, 53.26, 51.4, 49.12, 49.36], 'YTD': [44.87, 50.45, 47.56, 47.25, 39.98, 34.99, 34.11, 30.78, 38.34, 35.87, 33.29, 33.11, 26.59, 28.99, 43.25, 47.36, 42.11, 52.57, 55.26, 52.47, 70.14, 65.66, 57.99, 56.55, 49.31, 49.36], '6M': [50.76, 48.94, 48.33, 45.8, 35.34, 33.61, 33.43, 33.59, 37.13, 34.27, 32.38, 31.96, 27.79, 28.08, 44.68, 43.63, 45.12, 47.68, 57.47, 52.47, 70.14, 65.66, 57.99, 56.55, 49.31, 49.36], '1Y': [45.2, 42.41, 44.43, 42.34, 39.86, 44.94, 40.23, 39.78, 42.74, 41.01, 59.11, 71.94, 64.26, 78.99, 82.09, 59.94, 60.3, 62.38, 59.27, 47.18, 41.71, 47.12, 54.36, 46.07, 53.86, 45.31, 50.76, 48.94, 48.33, 45.8, 35.34, 33.61, 33.43, 40.88, 36.02, 33.03, 32.38, 31.96, 27.79, 28.08, 44.68, 43.63, 45.12, 47.68, 57.47, 58.89, 70.14, 65.66, 57.99, 56.55, 49.31, 49.36] },
      velocityScore: { '1D': null, '1W': 16, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: 126.6, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.42, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 1, avgWeight: 5.33, proScore: 1.78, coverage: 0.333,
      price: 33.61, weeklyPrices: [37.77, 37.30, 35.52, 33.06, 33.61], weeklyChange: -11.01, dayChange: 1.66, sortRank: 0, periodReturns: { '1M': -15.2, 'YTD': 37.1, '6M': 11.1, '1Y': 247.9 },
      priceHistory: { '1D': [33.06, 35, 35.57, 34.97, 34.86, 35.08, 34.78, 34.74, 34.55, 34.28, 34.31, 34.25, 34.42, 34.3, 34.58, 34.54, 34.53, 34.41, 34.13, 34.22, 33.92, 33.87, 33.53, 33.61], '1W': [37.77, 37.3, 35.52, 33.06, 33.61], '1M': [40.94, 41.91, 38.92, 41.47, 42.7, 46.47, 46.27, 45.57, 46.59, 45.2, 45.27, 41.98, 40.95, 39.16, 37.77, 37.3, 35.52, 33.06, 33.61], 'YTD': [24.52, 31.94, 35.22, 37.69, 33.88, 34.95, 35.28, 30, 27.93, 27.03, 27.71, 27.26, 20.55, 27.79, 30.81, 32.43, 32.69, 44.24, 45.48, 39.52, 49.65, 44.15, 41.47, 46.59, 39.16, 33.61], '6M': [30.26, 36.71, 35.06, 40.22, 31.54, 36.6, 31.53, 29.08, 28.65, 28.52, 26.65, 28.37, 24.49, 25.57, 30.09, 36.35, 34.25, 41.53, 46.71, 39.52, 49.65, 44.15, 41.47, 46.59, 39.16, 33.61], '1Y': [9.66, 9.52, 11.09, 10.58, 13.95, 14.03, 14.09, 16.05, 15.98, 13.91, 19.35, 24.45, 22.15, 27.71, 34.24, 35.9, 33.43, 34.66, 30.98, 23.65, 21.09, 28.21, 32.11, 22.98, 27.78, 24.08, 30.26, 36.71, 35.06, 40.22, 31.54, 36.6, 31.53, 28.65, 28.09, 27.48, 26.65, 28.37, 24.49, 25.57, 30.09, 36.35, 34.25, 41.53, 46.71, 48.02, 49.65, 44.15, 41.47, 46.59, 39.16, 33.61] },
      velocityScore: { '1D': null, '1W': -47.5, '1M': -51.5, '6M': null }, isNew: false,
      marketCap: '$10B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.33, RKNG: false },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'CRDO', name: 'CRDO', easyScore: 1, avgWeight: 5.31, proScore: 1.77, coverage: 0.333,
      price: 261.68, weeklyPrices: [245.68, 271.95, 259.09, 241.91, 261.68], weeklyChange: 6.51, dayChange: 8.17, sortRank: 0, periodReturns: { '1M': 26.5, 'YTD': 81.9, '6M': 96.8, '1Y': 182.2 },
      priceHistory: { '1D': [241.91, 260.28, 270.3, 268.66, 275.85, 277.61, 277.05, 279.97, 274.45, 273.84, 274.61, 273.57, 273.6, 272.09, 273.68, 274.33, 272.92, 270.62, 267.18, 267.22, 267.08, 265.43, 263.01, 261.68], '1W': [245.68, 271.95, 259.09, 241.91, 261.68], '1M': [222.27, 234.32, 237.68, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.09, 241.91, 261.68], 'YTD': [143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.05, 114.22, 115.98, 116.88, 105.1, 87.81, 110.21, 168.35, 189.49, 175.77, 198.29, 189.36, 182.98, 222.35, 217.5, 264.76, 271.83, 238, 261.68], '6M': [132.95, 161.38, 139.16, 129.66, 96.95, 128.4, 130.66, 123.46, 102.54, 115.91, 101.72, 103.91, 95.92, 107.93, 158.93, 185.54, 174.01, 188.29, 184.54, 182.98, 222.35, 217.5, 264.76, 271.83, 238, 261.68], '1Y': [92.73, 98.7, 95.74, 107.95, 114.7, 118.57, 116.74, 114.04, 123.06, 147.53, 163.98, 164.1, 146.01, 147.42, 149.9, 151.66, 155.55, 187.62, 163.61, 145.52, 133.49, 171.13, 178.94, 142.02, 149.94, 144.92, 132.95, 161.38, 139.16, 129.66, 96.95, 128.4, 130.66, 114.48, 114.74, 111.57, 101.72, 103.91, 95.92, 107.93, 158.93, 185.54, 174.01, 188.29, 184.54, 193.39, 222.35, 217.5, 264.76, 271.83, 238, 261.68] },
      velocityScore: { '1D': null, '1W': null, '1M': 31.1, '6M': null }, isNew: true,
      marketCap: '$49B', pe: 103.8, revenueGrowth: 157, eps: 2.52, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.31, RKNG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'COHR', name: 'COHR', easyScore: 1, avgWeight: 5.3, proScore: 1.77, coverage: 0.333,
      price: 338.24, weeklyPrices: [391.22, 394.47, 368.65, 333.36, 338.24], weeklyChange: -13.54, dayChange: 1.46, sortRank: 0, periodReturns: { '1M': -10.3, 'YTD': 83.3, '6M': 74.3, '1Y': 284.1 },
      priceHistory: { '1D': [333.36, 343.98, 349.18, 347.19, 349.76, 350.3, 350.95, 350.75, 347.88, 344.65, 346.05, 347.49, 347.18, 345.04, 346.44, 345.49, 343.96, 341.8, 341.25, 341.99, 341.11, 338.62, 338.52, 338.24], '1W': [391.22, 394.47, 368.65, 333.36, 338.24], '1M': [401.93, 355.94, 354.77, 363.58, 385.03, 413.84, 382.81, 378.85, 389.57, 425.48, 381.22, 392.5, 407.25, 380.56, 391.22, 394.47, 368.65, 333.36, 338.24], 'YTD': [184.57, 173.15, 195.96, 196.94, 212.18, 227.68, 217.23, 248.89, 298.91, 252.32, 247.37, 255.05, 219.65, 281.79, 308.2, 350.47, 304.93, 344.67, 403.71, 358.5, 376.95, 421.9, 363.58, 389.57, 380.56, 338.24], '6M': [194.11, 190.03, 201.46, 221.14, 211, 223.69, 232.48, 267.9, 274.86, 251.41, 257.21, 272.04, 247.8, 284.17, 328, 337.68, 319.71, 319.19, 404.94, 358.5, 376.95, 421.9, 363.58, 389.57, 380.56, 338.24], '1Y': [88.05, 94.52, 99.88, 104.3, 106.74, 113.6, 93.4, 89.9, 90.47, 98.67, 106.34, 114.6, 107.97, 114.77, 115.13, 120.2, 129.34, 131.96, 154.51, 139.33, 139.51, 163.5, 185.86, 178.45, 190.98, 186.81, 194.11, 190.03, 201.46, 221.14, 211, 223.69, 232.48, 250.14, 253.87, 241.27, 257.21, 272.04, 247.8, 284.17, 328, 337.68, 319.71, 319.19, 404.94, 378, 376.95, 421.9, 363.58, 389.57, 380.56, 338.24] },
      velocityScore: { '1D': null, '1W': 4.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$66B', pe: 161.1, revenueGrowth: 21, eps: 2.1, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.3, RKNG: false },
      tonyNote: 'COHR appears in 1 of 3 Meme ETFs (33% coverage) with average weight 5.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TTMI', name: 'TTMI', easyScore: 1, avgWeight: 5.19, proScore: 1.73, coverage: 0.333,
      price: 152.33, weeklyPrices: [186.80, 187.02, 179.70, 155.98, 152.33], weeklyChange: -18.45, dayChange: -2.34, sortRank: 0, periodReturns: { '1M': -9.1, 'YTD': 120.8, '6M': 116.2, '1Y': 263.7 },
      priceHistory: { '1D': [155.98, 159.21, 158.38, 157.77, 158.6, 158.51, 159.27, 158.57, 155.64, 154.97, 155.41, 154.44, 154.76, 154.04, 153.54, 153.44, 153.09, 154.28, 153.99, 153.58, 153.94, 152.85, 152.44, 152.33], '1W': [186.8, 187.02, 179.7, 155.98, 152.33], '1M': [178.38, 173.86, 172.12, 187.21, 194.05, 206.66, 199.58, 202.7, 216.44, 221.47, 213.17, 209.74, 210.57, 191.49, 186.8, 187.02, 179.7, 155.98, 152.33], 'YTD': [69, 66.86, 100.9, 95.02, 98.2, 98.58, 91.8, 106.85, 113, 96.8, 96.51, 101.42, 88.29, 105.85, 116.6, 126.71, 137.5, 164.64, 168.82, 169.36, 187.79, 184.84, 187.21, 216.44, 191.49, 152.33], '6M': [70.45, 93.24, 99.87, 97.99, 96.22, 91.9, 100.39, 108.86, 105.14, 95.44, 95.31, 108, 97.08, 107.53, 116.93, 132.98, 158.22, 153.77, 171.87, 169.36, 187.79, 184.84, 187.21, 216.44, 191.49, 152.33], '1Y': [41.88, 44.3, 47.47, 45.95, 44.83, 44.61, 41.8, 44.43, 44.57, 47, 49.4, 54.24, 57.75, 59.88, 55.53, 57.95, 58.75, 67.2, 66.72, 67.99, 58.79, 67.9, 75.43, 72.05, 70.9, 70.42, 70.45, 93.24, 99.87, 97.99, 96.22, 91.9, 100.39, 107.56, 98.95, 90.54, 95.31, 108, 97.08, 107.53, 116.93, 132.98, 158.22, 153.77, 171.87, 174.55, 187.79, 184.84, 187.21, 216.44, 191.49, 152.33] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$16B', pe: 82.8, revenueGrowth: 30, eps: 1.84, grossMargin: 21, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.19, RKNG: false },
      tonyNote: 'TTM Technologies is a printed circuit board manufacturer held in Industrials ETFs. Revenue growth tracks data center and defense electronics demand. PCB manufacturing is essential hardware infrastructure; TTM\'s position in AI server and high-frequency trading hardware gives it exposure to two durable growth verticals.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
