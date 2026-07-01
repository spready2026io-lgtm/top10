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
export const SPY_RET: Record<Period, number> = { '1W': 1.7, '1M': -1.6, 'YTD': 9.5, '6M': 9.5, '1Y': 20.9 };
// @@END_GENERATED:SPY_RET@@

// Top holdings per ETF (ticker + portfolio weight %), shown on ETF row hover.
export type EtfHolding = { t: string; w: number };

// @@GENERATED:ETF_TOP_HOLDINGS@@
export const ETF_TOP_HOLDINGS: Record<string, EtfHolding[]> = {
  AIS: [{ t: 'MU', w: 7.1 }, { t: 'AMD', w: 5.0 }, { t: 'MRVL', w: 4.1 }, { t: 'SIMO', w: 3.7 }, { t: 'VRT', w: 3.6 }],
  ARTY: [{ t: 'MU', w: 5.5 }, { t: 'AMD', w: 5.0 }, { t: 'NVDA', w: 4.4 }, { t: 'MRVL', w: 4.4 }, { t: 'AVGO', w: 4.3 }],
  BAI: [{ t: 'MU', w: 6.6 }, { t: 'LRCX', w: 5.2 }, { t: 'AMD', w: 5.1 }, { t: 'TSM', w: 4.5 }, { t: 'AVGO', w: 3.9 }],
  IGPT: [{ t: 'AMD', w: 8.8 }, { t: 'MU', w: 8.6 }, { t: 'GOOGL', w: 7.4 }, { t: 'META', w: 7.3 }, { t: 'NVDA', w: 7.2 }],
  IVES: [{ t: 'MU', w: 5.3 }, { t: 'TSM', w: 5.3 }, { t: 'AMD', w: 5.1 }, { t: 'AAPL', w: 4.8 }, { t: 'TSLA', w: 4.7 }],
  ALAI: [{ t: 'NVDA', w: 12.2 }, { t: 'TSM', w: 6.0 }, { t: 'AMZN', w: 4.9 }, { t: 'MSFT', w: 4.8 }, { t: 'GOOG', w: 4.7 }],
  CHAT: [{ t: 'NVDA', w: 6.3 }, { t: 'GOOGL', w: 5.1 }, { t: 'AMD', w: 4.4 }, { t: 'MU', w: 4.3 }, { t: 'AVGO', w: 3.9 }],
  AIFD: [{ t: 'MU', w: 7.4 }, { t: 'NVDA', w: 6.0 }, { t: 'MRVL', w: 5.8 }, { t: 'LITE', w: 5.6 }, { t: 'PANW', w: 5.3 }],
  SPRX: [{ t: 'ALAB', w: 9.8 }, { t: 'COHR', w: 8.9 }, { t: 'KLAC', w: 7.9 }, { t: 'ARM', w: 7.5 }, { t: 'NET', w: 7.1 }],
  AOTG: [{ t: 'AMD', w: 16.2 }, { t: 'MU', w: 11.6 }, { t: 'NVDA', w: 9.9 }, { t: 'TSM', w: 7.3 }, { t: 'TOST', w: 5.0 }],
  SOXX: [{ t: 'MU', w: 8.5 }, { t: 'AMD', w: 8.1 }, { t: 'NVDA', w: 6.8 }, { t: 'INTC', w: 6.3 }, { t: 'AVGO', w: 6.1 }],
  PSI: [{ t: 'AMAT', w: 6.9 }, { t: 'KLAC', w: 6.5 }, { t: 'LRCX', w: 5.8 }, { t: 'MU', w: 5.6 }, { t: 'AMD', w: 5.0 }],
  XSD: [{ t: 'MXL', w: 3.8 }, { t: 'ALGM', w: 3.3 }, { t: 'ALAB', w: 3.1 }, { t: 'AMBA', w: 2.9 }, { t: 'INTC', w: 2.8 }],
  DRAM: [{ t: 'SNDK', w: 5.2 }, { t: 'WDC', w: 4.3 }, { t: 'STX', w: 4.2 }, { t: 'MU', w: 2.0 }, { t: 'JPY', w: 0.7 }],
  PTF: [{ t: 'SNDK', w: 9.7 }, { t: 'MU', w: 5.4 }, { t: 'WDC', w: 5.3 }, { t: 'STX', w: 4.8 }, { t: 'NVDA', w: 4.1 }],
  WCLD: [{ t: 'FROG', w: 3.2 }, { t: 'DOCN', w: 3.0 }, { t: 'DDOG', w: 2.9 }, { t: 'PANW', w: 2.8 }, { t: 'CRWD', w: 2.5 }],
  IGV: [{ t: 'PANW', w: 10.2 }, { t: 'MSFT', w: 8.0 }, { t: 'PLTR', w: 7.7 }, { t: 'CRWD', w: 7.1 }, { t: 'ORCL', w: 6.4 }],
  FDTX: [{ t: 'MU', w: 9.4 }, { t: 'MRVL', w: 8.1 }, { t: 'TSM', w: 6.0 }, { t: 'NVDA', w: 4.6 }, { t: 'STX', w: 4.0 }],
  GTEK: [{ t: 'MRVL', w: 4.3 }, { t: 'DELL', w: 2.9 }, { t: 'APH', w: 2.4 }, { t: 'NET', w: 2.1 }, { t: 'EBAY', w: 1.9 }],
  ARKK: [{ t: 'TSLA', w: 10.2 }, { t: 'TEM', w: 5.6 }, { t: 'AMD', w: 5.0 }, { t: 'CRSP', w: 4.9 }, { t: 'HOOD', w: 4.5 }],
  MARS: [{ t: 'SPCX', w: 22.7 }, { t: 'RKLB', w: 10.2 }, { t: 'ASTS', w: 8.0 }, { t: 'VSAT', w: 5.5 }, { t: 'PL', w: 5.1 }],
  FRWD: [{ t: 'NVDA', w: 8.2 }, { t: 'STX', w: 7.6 }, { t: 'AMD', w: 7.4 }, { t: 'LRCX', w: 6.1 }, { t: 'TSM', w: 6.0 }],
  BCTK: [{ t: 'TSM', w: 8.7 }, { t: 'SPCX', w: 8.3 }, { t: 'LRCX', w: 8.3 }, { t: 'AVGO', w: 6.7 }, { t: 'NVDA', w: 5.8 }],
  FWD: [{ t: 'AMD', w: 2.2 }, { t: 'AMAT', w: 2.2 }, { t: 'LRCX', w: 2.0 }, { t: 'AVGO', w: 1.8 }, { t: 'SPCX', w: 1.7 }],
  CBSE: [{ t: 'TXG', w: 3.2 }, { t: 'IBRX', w: 3.2 }, { t: 'KRYS', w: 3.1 }, { t: 'TENB', w: 3.1 }, { t: 'SCI', w: 3.0 }],
  FCUS: [{ t: 'SNDK', w: 5.4 }, { t: 'INTC', w: 5.3 }, { t: 'MU', w: 4.9 }, { t: 'WDC', w: 4.6 }, { t: 'DELL', w: 4.5 }],
  WGMI: [{ t: 'CIFR', w: 18.0 }, { t: 'HUT', w: 11.0 }, { t: 'KEEL', w: 11.0 }, { t: 'IREN', w: 9.7 }, { t: 'RIOT', w: 5.1 }],
  CNEQ: [{ t: 'NVDA', w: 13.1 }, { t: 'TSM', w: 6.1 }, { t: 'MSFT', w: 5.8 }, { t: 'GOOG', w: 5.7 }, { t: 'NBIS', w: 5.2 }],
  SGRT: [{ t: 'WDC', w: 9.3 }, { t: 'MU', w: 8.7 }, { t: 'LITE', w: 7.9 }, { t: 'DELL', w: 6.4 }, { t: 'NVDA', w: 6.0 }],
  SPMO: [{ t: 'MU', w: 12.2 }, { t: 'NVDA', w: 7.5 }, { t: 'AVGO', w: 6.0 }, { t: 'JNJ', w: 4.2 }, { t: 'GOOGL', w: 4.2 }],
  XMMO: [{ t: 'CW', w: 4.0 }, { t: 'STRL', w: 3.4 }, { t: 'ATI', w: 3.3 }, { t: 'TTMI', w: 3.1 }, { t: 'WWD', w: 3.1 }],
  POW: [{ t: 'PWR', w: 5.0 }, { t: 'POWL', w: 4.7 }, { t: 'PRY', w: 4.2 }, { t: 'ETN', w: 4.1 }, { t: 'BELFB', w: 4.0 }],
  VOLT: [{ t: 'BELFB', w: 8.4 }, { t: 'POWL', w: 6.9 }, { t: 'ETN', w: 5.3 }, { t: 'PWR', w: 5.3 }, { t: 'NEE', w: 4.8 }],
  PBD: [{ t: 'RIVN', w: 1.2 }, { t: 'SEDG', w: 1.2 }, { t: 'ALFEN', w: 1.1 }],
  PBW: [{ t: 'FCEL', w: 2.2 }, { t: 'OPAL', w: 1.8 }, { t: 'IONR', w: 1.7 }, { t: 'RIVN', w: 1.7 }, { t: 'BELFB', w: 1.6 }],
  IVEP: [{ t: 'BE', w: 5.5 }, { t: 'GEV', w: 4.6 }, { t: 'PWR', w: 4.4 }, { t: 'VRT', w: 4.3 }, { t: 'SBGSY', w: 4.1 }],
  AIRR: [{ t: 'STRL', w: 6.0 }, { t: 'AGX', w: 4.7 }, { t: 'FIX', w: 4.4 }, { t: 'MTZ', w: 4.2 }, { t: 'CHRW', w: 4.1 }],
  PRN: [{ t: 'TTMI', w: 5.6 }, { t: 'AGX', w: 4.9 }, { t: 'VICR', w: 4.8 }, { t: 'FIX', w: 4.7 }, { t: 'STRL', w: 4.1 }],
  RSHO: [{ t: 'TKR', w: 8.7 }, { t: 'POWL', w: 7.3 }, { t: 'CGNX', w: 7.2 }, { t: 'CAT', w: 6.9 }, { t: 'AIT', w: 6.0 }],
  IDEF: [{ t: 'RTX', w: 8.4 }, { t: 'LMT', w: 6.9 }, { t: 'BA', w: 5.0 }, { t: 'GD', w: 4.4 }, { t: 'FTNT', w: 3.5 }],
  BILT: [{ t: 'UNP', w: 5.9 }, { t: 'AENA', w: 4.5 }, { t: 'AEP', w: 4.3 }, { t: 'TRP', w: 3.6 }, { t: 'XEL', w: 3.6 }],
  BUZZ: [{ t: 'IBRX', w: 3.8 }, { t: 'MU', w: 3.5 }, { t: 'NBIS', w: 3.4 }, { t: 'SOFI', w: 3.3 }, { t: 'AMD', w: 3.3 }],
  MEME: [{ t: 'AAOI', w: 9.7 }, { t: 'NBIS', w: 5.9 }, { t: 'ASTS', w: 5.7 }, { t: 'BE', w: 5.5 }, { t: 'QBTS', w: 5.2 }],
  RKNG: [{ t: 'MU', w: 4.0 }, { t: 'SNDK', w: 3.7 }, { t: 'CIFR', w: 3.7 }, { t: 'WDC', w: 3.7 }, { t: 'NBIS', w: 3.6 }],
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
  'AI & ML':         { '1W': -0.4, '1M': -3.7, 'YTD': 48.5, '6M': 48.5, '1Y': 84.2 },
  'Semiconductors':  { '1W': -5.2, '1M': 3.5, 'YTD': 110.5, '6M': 110.5, '1Y': 153.2 },
  'Broad Tech':      { '1W': 1.6, '1M': -3.9, 'YTD': 29.6, '6M': 29.6, '1Y': 47.9 },
  'Electrification': { '1W': -1.3, '1M': -6.1, 'YTD': 28.2, '6M': 28.2, '1Y': 50.7 },
  'Industrials':     { '1W': -0.6, '1M': 1.1, 'YTD': 25.4, '6M': 24.7, '1Y': 40.4 },
  'Meme':            { '1W': 1.3, '1M': -11.5, 'YTD': 23, '6M': 23, '1Y': 8.4 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, IndexChartByPeriod> = {
  'AI & ML': {
    '1D': { top10: [100, 96.71, 97.35, 97.46, 97.38, 96.88, 96.49, 96.43, 96.74, 97.01, 96.77, 96.77, 96.67, 96.88, 96.71, 96.5, 96.63, 96.61, 96.47, 96.44, 96.36, 96.34, 96.19, 95.94], spy: [100, 99.52, 99.81, 99.98, 100.01, 100.02, 100.01, 100.12, 100.28, 100.25, 100.23, 100.28, 100.31, 100.3, 100.21, 100.1, 100.17, 100.14, 100.09, 100.12, 100.04, 100.05, 100.05, 99.98], top10Return: -3.6, spyReturn: -0.02, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 97.47, 100.38, 103.33, 99.61], spy: [100, 99.28, 100.91, 101.7, 101.68], top10Return: -0.4, spyReturn: 1.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 101.86, 100.9, 99.35, 90.86, 93.72, 91.87, 88.98, 93.8, 94.45, 96.45, 96.94, 101.13, 101.95, 95.9, 95.05, 96.84, 94.3, 97.13, 100.01, 96.31], spy: [100, 100.14, 99.43, 99.81, 97.23, 97.45, 97.17, 95.64, 97.26, 97.79, 98.92, 97.68, 98.44, 98.13, 96.71, 96.66, 96.8, 96.1, 97.69, 98.45, 98.43], top10Return: -3.7, spyReturn: -1.6, xLabels: ["Jun 3", "Jun 10", "Jun 17", "Jun 24", "Jul 1"] },
    'YTD': { top10: [100, 102.26, 104.35, 105.09, 104.21, 102.1, 102.57, 101.98, 103.51, 102.02, 102.81, 101.55, 92.02, 100.45, 110.68, 117.96, 122.69, 125.68, 138.29, 132.15, 146.11, 157.1, 141.48, 148.76, 147.04, 148.52], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 100.07, 100.65, 99.46, 98.11, 96.11, 92.68, 96.63, 100.61, 103.93, 104.88, 105.29, 108.41, 108.32, 110.07, 111.39, 108.08, 110.03, 107.53, 109.49], top10Return: 48.5, spyReturn: 9.5, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 101.52, 102.77, 102.65, 102.83, 102.42, 100, 99.75, 101.24, 99.8, 100.56, 99.33, 90.03, 98.98, 111.24, 115.12, 116.5, 125.97, 131.55, 129.19, 142.76, 153.49, 138.26, 145.35, 143.64, 145.12], spy: [100, 101.6, 101.24, 101.4, 101.79, 101.58, 99.95, 99.89, 100.47, 99.28, 97.93, 95.93, 92.51, 96.49, 101.65, 103.06, 104.17, 105.94, 108.05, 108.12, 109.87, 111.18, 107.89, 109.83, 107.33, 109.29], top10Return: 48.5, spyReturn: 9.5, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 102.6, 103.53, 105.68, 108.17, 108.54, 111.21, 107.08, 108.77, 108.69, 116.28, 118.67, 120.42, 122.69, 127.94, 125.45, 123.58, 134.09, 129.7, 126.79, 118.64, 120.28, 124.91, 128.69, 117.17, 125.53, 125.96, 127.87, 129.56, 129.38, 129.7, 129.36, 126.7, 126.02, 127.94, 125.99, 127.05, 125.47, 113.6, 125.03, 140.66, 145.57, 147.28, 159.43, 166.6, 163.57, 181.18, 194.8, 175.35, 184.45, 182.43, 184.19], spy: [100, 101.04, 101.06, 102.68, 102.72, 102.45, 104.41, 103.59, 104.45, 104.22, 105.6, 106.72, 107.03, 108.22, 108.98, 107.69, 108.12, 111.29, 109.7, 110.64, 106.87, 109.29, 110.72, 111.32, 108.7, 111.78, 110.61, 112.37, 111.98, 112.16, 112.59, 112.35, 110.38, 110.48, 111.13, 109.81, 108.32, 106.11, 102.32, 106.73, 112.44, 113.99, 115.23, 117.18, 119.51, 119.59, 121.52, 122.98, 119.33, 121.48, 118.71, 120.88], top10Return: 84.2, spyReturn: 20.9, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Semiconductors': {
    '1D': { top10: [100, 94.83, 95.69, 95.75, 95.43, 94.62, 93.94, 93.66, 94.3, 94.5, 93.94, 94.01, 94.3, 94.34, 94.12, 93.84, 93.79, 93.83, 93.53, 93.42, 93.38, 93.32, 93.06, 92.73], spy: [100, 99.52, 99.81, 99.98, 100.01, 100.02, 100.01, 100.12, 100.28, 100.25, 100.23, 100.28, 100.31, 100.3, 100.21, 100.1, 100.17, 100.14, 100.09, 100.12, 100.04, 100.05, 100.05, 99.98], top10Return: -7.3, spyReturn: -0.02, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 94.59, 97.84, 102.21, 94.84], spy: [100, 99.28, 100.91, 101.7, 101.68], top10Return: -5.2, spyReturn: 1.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 104.94, 106.22, 103.58, 91.48, 96.85, 95.32, 92.14, 100.97, 102.47, 102.8, 103.86, 111.62, 115.28, 104.66, 104, 109.3, 103.36, 106.91, 111.66, 103.5], spy: [100, 100.14, 99.43, 99.81, 97.23, 97.45, 97.17, 95.64, 97.26, 97.79, 98.92, 97.68, 98.44, 98.13, 96.71, 96.66, 96.8, 96.1, 97.69, 98.45, 98.43], top10Return: 3.5, spyReturn: -1.6, xLabels: ["Jun 3", "Jun 10", "Jun 17", "Jun 24", "Jul 1"] },
    'YTD': { top10: [100, 107.01, 113.64, 117.36, 117.24, 119.41, 123.01, 122.39, 125.24, 124.83, 125.99, 130.44, 126.01, 131.15, 146.91, 160.88, 172.28, 182.45, 188.71, 181.83, 206.26, 212.56, 212.41, 211.24, 214.08, 210.55], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 100.07, 100.65, 99.46, 98.11, 96.11, 92.68, 96.63, 100.61, 103.93, 104.88, 105.29, 108.41, 108.32, 110.07, 111.39, 108.08, 110.03, 107.53, 109.49], top10Return: 110.5, spyReturn: 9.5, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 105.46, 110.92, 113.1, 115.3, 116.56, 118.85, 118.54, 121.4, 121.23, 122.34, 126.78, 122.65, 127.97, 144.34, 157.18, 162.81, 181.91, 177.52, 176.29, 199.87, 206.03, 206.37, 204.82, 207.61, 204], spy: [100, 101.6, 101.24, 101.4, 101.79, 101.58, 99.95, 99.89, 100.47, 99.28, 97.93, 95.93, 92.51, 96.49, 101.65, 103.06, 104.17, 105.94, 108.05, 108.12, 109.87, 111.18, 107.89, 109.83, 107.33, 109.29], top10Return: 110.5, spyReturn: 9.5, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 103.81, 103.85, 106.03, 107.5, 106.01, 113.02, 108.99, 113.14, 110.25, 114.74, 119.49, 121.49, 124.99, 128.32, 129.55, 128, 136.32, 139.48, 139.75, 129.72, 138.68, 148.58, 151.34, 140.71, 144.25, 144.79, 150.52, 155.8, 156.12, 165.99, 168.71, 171.09, 170.72, 176.57, 169.36, 166.94, 158.27, 153.97, 163.13, 186.53, 195.92, 205.92, 221.12, 239.62, 236.65, 251.59, 256.66, 248.26, 254.86, 257.92, 253.22], spy: [100, 101.04, 101.06, 102.68, 102.72, 102.45, 104.41, 103.59, 104.45, 104.22, 105.6, 106.72, 107.03, 108.22, 108.98, 107.69, 108.12, 111.29, 109.7, 110.64, 106.87, 109.29, 110.72, 111.32, 108.7, 111.78, 110.61, 112.37, 111.98, 112.16, 112.59, 112.35, 110.38, 110.48, 111.13, 109.81, 108.32, 106.11, 102.32, 106.73, 112.44, 113.99, 115.23, 117.18, 119.51, 119.59, 121.52, 122.98, 119.33, 121.48, 118.71, 120.88], top10Return: 153.2, spyReturn: 20.9, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Broad Tech': {
    '1D': { top10: [100, 98.02, 98.63, 98.86, 98.83, 98.37, 97.9, 98.05, 98.46, 98.7, 98.58, 98.58, 98.62, 98.75, 98.71, 98.59, 98.57, 98.53, 98.44, 98.35, 98.2, 98.19, 98.02, 97.8], spy: [100, 99.52, 99.81, 99.98, 100.01, 100.02, 100.01, 100.12, 100.28, 100.25, 100.23, 100.28, 100.31, 100.3, 100.21, 100.1, 100.17, 100.14, 100.09, 100.12, 100.04, 100.05, 100.05, 99.98], top10Return: -2.3, spyReturn: -0.02, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 99.17, 101.76, 103.86, 101.55], spy: [100, 99.28, 100.91, 101.7, 101.68], top10Return: 1.6, spyReturn: 1.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 101.26, 100.02, 99.65, 92.77, 94.48, 92.81, 90.57, 94.62, 95.1, 96.87, 96.54, 98.82, 98.6, 95.25, 94.24, 95.12, 94.12, 96.48, 98.47, 96.11], spy: [100, 100.14, 99.43, 99.81, 97.23, 97.45, 97.17, 95.64, 97.26, 97.79, 98.92, 97.68, 98.44, 98.13, 96.71, 96.66, 96.8, 96.1, 97.69, 98.45, 98.43], top10Return: -3.9, spyReturn: -1.6, xLabels: ["Jun 3", "Jun 10", "Jun 17", "Jun 24", "Jul 1"] },
    'YTD': { top10: [100, 103.16, 104.96, 104.89, 102.07, 100.41, 101.55, 101.67, 104.65, 102.54, 101.96, 100.71, 94.12, 100.68, 108.4, 114.9, 116.2, 120.07, 128.19, 121.51, 129.63, 136.53, 125.55, 130.56, 127.62, 129.62], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 100.07, 100.65, 99.46, 98.11, 96.11, 92.68, 96.63, 100.61, 103.93, 104.88, 105.29, 108.41, 108.32, 110.07, 111.39, 108.08, 110.03, 107.53, 109.49], top10Return: 29.6, spyReturn: 9.5, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 102.65, 103.69, 103.06, 100.99, 100.84, 99.59, 100.05, 103, 101.03, 100.39, 99.16, 92.74, 99.65, 108.29, 112.3, 111.85, 120.28, 124.23, 119.51, 127.39, 134.17, 123.4, 128.25, 125.35, 127.48], spy: [100, 101.6, 101.24, 101.4, 101.79, 101.58, 99.95, 99.89, 100.47, 99.28, 97.93, 95.93, 92.51, 96.49, 101.65, 103.06, 104.17, 105.94, 108.05, 108.12, 109.87, 111.18, 107.89, 109.83, 107.33, 109.29], top10Return: 29.6, spyReturn: 9.5, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 102.28, 102.93, 104.91, 104.82, 105.44, 105.58, 103.69, 106.37, 106.26, 109.83, 113.21, 115.75, 116.55, 121.64, 122.78, 116.78, 123.9, 123.5, 118.64, 112.51, 114.79, 116.3, 118.33, 111.6, 117.34, 116.28, 119.37, 121.41, 121.91, 120.46, 121.51, 119.15, 118.71, 122, 120.63, 120.44, 120.57, 112.85, 119.95, 127.56, 130.95, 131.31, 140.38, 141.79, 139.05, 148.37, 153.87, 144.22, 149.22, 147.71, 147.91], spy: [100, 101.04, 101.06, 102.68, 102.72, 102.45, 104.41, 103.59, 104.45, 104.22, 105.6, 106.72, 107.03, 108.22, 108.98, 107.69, 108.12, 111.29, 109.7, 110.64, 106.87, 109.29, 110.72, 111.32, 108.7, 111.78, 110.61, 112.37, 111.98, 112.16, 112.59, 112.35, 110.38, 110.48, 111.13, 109.81, 108.32, 106.11, 102.32, 106.73, 112.44, 113.99, 115.23, 117.18, 119.51, 119.59, 121.52, 122.98, 119.33, 121.48, 118.71, 120.88], top10Return: 47.9, spyReturn: 20.9, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Electrification': {
    '1D': { top10: [100, 98.42, 99, 99.05, 98.77, 98.56, 98.17, 98.27, 98.5, 98.62, 98.58, 98.82, 98.88, 99, 98.78, 98.69, 98.31, 98.33, 98.36, 98.18, 97.89, 97.83, 97.56, 97.36], spy: [100, 99.52, 99.81, 99.98, 100.01, 100.02, 100.01, 100.12, 100.28, 100.25, 100.23, 100.28, 100.31, 100.3, 100.21, 100.1, 100.17, 100.14, 100.09, 100.12, 100.04, 100.05, 100.05, 99.98], top10Return: -2.7, spyReturn: -0.02, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 97.28, 99.25, 101.37, 98.65], spy: [100, 99.28, 100.91, 101.7, 101.68], top10Return: -1.3, spyReturn: 1.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 102.09, 101.05, 100.96, 94.78, 94.9, 93.81, 90.79, 94.48, 95.39, 96.57, 96.56, 98.76, 99.85, 95.47, 94.86, 95.43, 92.76, 94.57, 96.59, 93.93], spy: [100, 100.14, 99.43, 99.81, 97.23, 97.45, 97.17, 95.64, 97.26, 97.79, 98.92, 97.68, 98.44, 98.13, 96.71, 96.66, 96.8, 96.1, 97.69, 98.45, 98.43], top10Return: -6.1, spyReturn: -1.6, xLabels: ["Jun 3", "Jun 10", "Jun 17", "Jun 24", "Jul 1"] },
    'YTD': { top10: [100, 103.61, 108.25, 111.14, 110.01, 113.71, 114.8, 116.38, 117.59, 112.36, 114.42, 114.11, 109.11, 113.77, 121.27, 125.02, 128.7, 133.12, 138.4, 128.69, 138.78, 139.32, 129.91, 132.09, 128.88, 128.19], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 100.07, 100.65, 99.46, 98.11, 96.11, 92.68, 96.63, 100.61, 103.93, 104.88, 105.29, 108.41, 108.32, 110.07, 111.39, 108.08, 110.03, 107.53, 109.49], top10Return: 28.2, spyReturn: 9.5, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 101.34, 106.08, 107.37, 106.47, 111.73, 111.42, 112.9, 114.08, 109.02, 111.02, 110.73, 105.87, 110.11, 119.16, 120.6, 123.23, 131.96, 131.03, 124.66, 134.37, 134.87, 125.92, 128, 124.91, 124.23], spy: [100, 101.6, 101.24, 101.4, 101.79, 101.58, 99.95, 99.89, 100.47, 99.28, 97.93, 95.93, 92.51, 96.49, 101.65, 103.06, 104.17, 105.94, 108.05, 108.12, 109.87, 111.18, 107.89, 109.83, 107.33, 109.29], top10Return: 28.2, spyReturn: 9.5, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 103.41, 104.36, 108.37, 106, 105.67, 108.55, 108.5, 110.66, 109.17, 110.3, 112.79, 115.52, 118.51, 123.53, 127.77, 122.68, 127.54, 127.69, 126.52, 122.82, 122.73, 125.66, 127.76, 122.92, 127.57, 127.34, 128.69, 132.66, 134.5, 133.06, 135.88, 135.03, 136.37, 138.58, 134.65, 136.1, 137.71, 133.7, 138.2, 148.2, 150.47, 149.16, 157.72, 160.25, 155.77, 162.12, 164.53, 152.99, 155.92, 150.73, 150.7], spy: [100, 101.04, 101.06, 102.68, 102.72, 102.45, 104.41, 103.59, 104.45, 104.22, 105.6, 106.72, 107.03, 108.22, 108.98, 107.69, 108.12, 111.29, 109.7, 110.64, 106.87, 109.29, 110.72, 111.32, 108.7, 111.78, 110.61, 112.37, 111.98, 112.16, 112.59, 112.35, 110.38, 110.48, 111.13, 109.81, 108.32, 106.11, 102.32, 106.73, 112.44, 113.99, 115.23, 117.18, 119.51, 119.59, 121.52, 122.98, 119.33, 121.48, 118.71, 120.88], top10Return: 50.7, spyReturn: 20.9, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Industrials': {
    '1D': { top10: [100, 99.1, 99.08, 99.3, 99.38, 99.29, 99.19, 99.2, 99.34, 99.36, 99.18, 99.18, 99.08, 99.2, 99.08, 99.01, 99.12, 98.97, 99.01, 99.04, 98.89, 98.84, 98.75, 98.59], spy: [100, 99.52, 99.81, 99.98, 100.01, 100.02, 100.01, 100.12, 100.28, 100.25, 100.23, 100.28, 100.31, 100.3, 100.21, 100.1, 100.17, 100.14, 100.09, 100.12, 100.04, 100.05, 100.05, 99.98], top10Return: -1.4, spyReturn: -0.02, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 98.47, 99.55, 100.91, 99.42], spy: [100, 99.28, 100.91, 101.7, 101.68], top10Return: -0.6, spyReturn: 1.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 100.65, 100.17, 101.04, 98.92, 99.36, 99.42, 96.97, 100.36, 100.65, 99.67, 100.37, 100.87, 101.91, 100.5, 100.9, 101.81, 100.19, 101.3, 102.72, 101.11], spy: [100, 100.14, 99.43, 99.81, 97.23, 97.45, 97.17, 95.64, 97.26, 97.79, 98.92, 97.68, 98.44, 98.13, 96.71, 96.66, 96.8, 96.1, 97.69, 98.45, 98.43], top10Return: 1.1, spyReturn: -1.6, xLabels: ["Jun 3", "Jun 10", "Jun 17", "Jun 24", "Jul 1"] },
    'YTD': { top10: [100, 105.14, 110.48, 110.36, 110.07, 114.34, 117.61, 118.93, 119.73, 114.05, 112.43, 111.38, 107.51, 113.21, 119.69, 120.93, 120.95, 121.72, 124.81, 121.5, 124.12, 124.2, 123, 124.64, 125.27, 125.42], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 100.07, 100.65, 99.46, 98.11, 96.11, 92.68, 96.63, 100.61, 103.93, 104.88, 105.29, 108.41, 108.32, 110.07, 111.39, 108.08, 110.03, 107.53, 109.49], top10Return: 25.4, spyReturn: 9.5, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 103.9, 108.31, 107.43, 107.5, 112.4, 114.37, 115.91, 117.03, 112.75, 110.45, 108.78, 105.84, 110.32, 116.93, 116, 116.43, 119.92, 121.54, 118.37, 121.01, 121.23, 120.03, 121.59, 122.2, 122.36], spy: [100, 101.6, 101.24, 101.4, 101.79, 101.58, 99.95, 99.89, 100.47, 99.28, 97.93, 95.93, 92.51, 96.49, 101.65, 103.06, 104.17, 105.94, 108.05, 108.12, 109.87, 111.18, 107.89, 109.83, 107.33, 109.29], top10Return: 24.7, spyReturn: 9.5, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 101.99, 102.51, 104.34, 104.55, 104.46, 106.13, 104.27, 106.55, 105.17, 106.95, 107.96, 109.51, 111.56, 113.22, 111.84, 110.88, 115.04, 112.52, 111.73, 106.88, 109.32, 109.96, 112.3, 109.94, 114.32, 114.2, 119.57, 125, 124.53, 124.86, 130.22, 131.64, 132.7, 133.02, 126.98, 124.79, 124.76, 120.41, 126.39, 134.23, 134.16, 134.02, 138.28, 138.78, 136.23, 138.63, 139.06, 137.63, 139.18, 140.27, 140.42], spy: [100, 101.04, 101.06, 102.68, 102.72, 102.45, 104.41, 103.59, 104.45, 104.22, 105.6, 106.72, 107.03, 108.22, 108.98, 107.69, 108.12, 111.29, 109.7, 110.64, 106.87, 109.29, 110.72, 111.32, 108.7, 111.78, 110.61, 112.37, 111.98, 112.16, 112.59, 112.35, 110.38, 110.48, 111.13, 109.81, 108.32, 106.11, 102.32, 106.73, 112.44, 113.99, 115.23, 117.18, 119.51, 119.59, 121.52, 122.98, 119.33, 121.48, 118.71, 120.88], top10Return: 40.4, spyReturn: 20.9, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Meme': {
    '1D': { top10: [100, 96.8, 98.54, 98.61, 98.46, 98.26, 98.32, 97.46, 97.24, 97.76, 98.29, 98.5, 98.27, 98.65, 98.67, 98.66, 98.36, 98.59, 98.78, 98.41, 98.34, 98.06, 97.68, 97.17], spy: [100, 99.52, 99.81, 99.98, 100.01, 100.02, 100.01, 100.12, 100.28, 100.25, 100.23, 100.28, 100.31, 100.3, 100.21, 100.1, 100.17, 100.14, 100.09, 100.12, 100.04, 100.05, 100.05, 99.98], top10Return: -2.9, spyReturn: -0.02, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 97.91, 102.19, 104.3, 101.3], spy: [100, 99.28, 100.91, 101.7, 101.68], top10Return: 1.3, spyReturn: 1.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 102.46, 98.88, 99.41, 89.27, 91.56, 88.31, 85.88, 91.43, 90.27, 91.57, 92.14, 95.42, 95.29, 90.87, 87.83, 87.38, 85.57, 89.26, 91.11, 88.52], spy: [100, 100.14, 99.43, 99.81, 97.23, 97.45, 97.17, 95.64, 97.26, 97.79, 98.92, 97.68, 98.44, 98.13, 96.71, 96.66, 96.8, 96.1, 97.69, 98.45, 98.43], top10Return: -11.5, spyReturn: -1.6, xLabels: ["Jun 3", "Jun 10", "Jun 17", "Jun 24", "Jul 1"] },
    'YTD': { top10: [100, 108.03, 105.55, 106.35, 99.62, 96.61, 93.56, 93.37, 94.8, 92.23, 93.45, 92.11, 85.8, 94.45, 106.88, 114.64, 112.67, 119.38, 127.99, 123.62, 138.32, 143.41, 125.07, 128.2, 122.8, 122.96], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 100.07, 100.65, 99.46, 98.11, 96.11, 92.68, 96.63, 100.61, 103.93, 104.88, 105.29, 108.41, 108.32, 110.07, 111.39, 108.08, 110.03, 107.53, 109.49], top10Return: 23, spyReturn: 9.5, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 106.14, 103.76, 99.84, 95.3, 95.66, 89.66, 89.73, 91.08, 88.7, 89.75, 88.45, 82.68, 91.61, 105.46, 107.99, 105.28, 117.62, 120.37, 118.76, 132.56, 137.43, 120.09, 123.12, 117.97, 118.18], spy: [100, 101.6, 101.24, 101.4, 101.79, 101.58, 99.95, 99.89, 100.47, 99.28, 97.93, 95.93, 92.51, 96.49, 101.65, 103.06, 104.17, 105.94, 108.05, 108.12, 109.87, 111.18, 107.89, 109.83, 107.33, 109.29], top10Return: 23, spyReturn: 9.5, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 103.75, 101.72, 96.73, 93.42, 91.57, 90.24, 86.67, 85.13, 82.49, 86.69, 88.17, 91.37, 89.79, 88.74, 92.19, 86.99, 95.08, 93.47, 91.99, 89.06, 86.39, 85.91, 84.91, 85.98, 87.82, 89.79, 92.84, 93.77, 92.03, 91.5, 90.75, 90.56, 87.51, 90.43, 95.72, 99.12, 97.49, 92.04, 96.23, 105.93, 107.92, 111.28, 105.16, 114.13, 114.37, 119.67, 114.57, 113.74, 113.34, 107.67, 108.45], spy: [100, 101.04, 101.06, 102.68, 102.72, 102.45, 104.41, 103.59, 104.45, 104.22, 105.6, 106.72, 107.03, 108.22, 108.98, 107.69, 108.12, 111.29, 109.7, 110.64, 106.87, 109.29, 110.72, 111.32, 108.7, 111.78, 110.61, 112.37, 111.98, 112.16, 112.59, 112.35, 110.38, 110.48, 111.13, 109.81, 108.32, 106.11, 102.32, 106.73, 112.44, 113.99, 115.23, 117.18, 119.51, 119.59, 121.52, 122.98, 119.33, 121.48, 118.71, 120.88], top10Return: 8.4, spyReturn: 20.9, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
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
export const SCAN_TIMESTAMP    = '2026-07-01T18:55:09.135Z';
export const SCAN_TIMESTAMP_NY = 'July 1, 2026 at 2:55 PM ET';
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
export const HOLDINGS_COUNT = 1286;
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
  { ticker: 'MU', name: `Micron Technology Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 13.67, bestProScore: 5.79, avgProScore: 4.56, price: 1039.50, weeklyChange: -14.34 },
  { ticker: 'NVDA', name: `NVIDIA Corp`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 12.35, bestProScore: 6.03, avgProScore: 4.12, price: 198.00, weeklyChange: 1.15 },
  { ticker: 'AMD', name: `Advanced Micro Devices Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 10.85, bestProScore: 5.14, avgProScore: 3.62, price: 544.32, weeklyChange: 2.21 },
  { ticker: 'AVGO', name: `Broadcom Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 6.30, bestProScore: 2.76, avgProScore: 2.10, price: 369.25, weeklyChange: -2.55 },
  { ticker: 'INTC', name: `INTEL CORPORATION`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.81, bestProScore: 3.49, avgProScore: 2.41, price: 126.93, weeklyChange: -4.47 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.41, bestProScore: 2.57, avgProScore: 2.21, price: 273.51, weeklyChange: -2.76 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.31, bestProScore: 2.64, avgProScore: 2.16, price: 443.92, weeklyChange: 2.05 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 4.28, bestProScore: 2.32, avgProScore: 2.14, price: 263.65, weeklyChange: -14.73 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 4.08, bestProScore: 2.67, avgProScore: 2.04, price: 382.00, weeklyChange: -4.93 },
  { ticker: 'WDC', name: `Western Digital Corp`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 3.64, bestProScore: 2.06, avgProScore: 1.82, price: 592.88, weeklyChange: -12.22 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': -5.3, '1M': 1.2, 'YTD': 110.6, '6M': 110.6, '1Y': 188 },
  ARTY: { '1W': -2.1, '1M': -6.2, 'YTD': 52, '6M': 52, '1Y': 81.1 },
  BAI:  { '1W': -3.9, '1M': -3, 'YTD': 48.4, '6M': 48.4, '1Y': 75 },
  IGPT: { '1W': -2.7, '1M': -1.7, 'YTD': 68.4, '6M': 68.4, '1Y': 106.9 },
  IVES: { '1W': 5.9, '1M': -8.9, 'YTD': 20.2, '6M': 20.2, '1Y': 42.8 },
  ALAI: { '1W': 2.3, '1M': -3.2, 'YTD': 25.2, '6M': 25.2, '1Y': 50.4 },
  CHAT: { '1W': -4, '1M': -8, 'YTD': 59.1, '6M': 59.1, '1Y': 95.5 },
  AIFD: { '1W': 2.1, '1M': -2.9, 'YTD': 43.3, '6M': 43.3, '1Y': 78.6 },
  SPRX: { '1W': -0.1, '1M': -1.1, 'YTD': 42, '6M': 42, '1Y': 91.2 },
  AOTG: { '1W': 3.9, '1M': -3, 'YTD': 16, '6M': 16, '1Y': 32.3 },
  // Semiconductors
  SOXX: { '1W': -4.2, '1M': 4.7, 'YTD': 98.8, '6M': 98.8, '1Y': 152 },
  PSI:  { '1W': -2.3, '1M': 12.8, 'YTD': 119.7, '6M': 119.7, '1Y': 189.7 },
  XSD:  { '1W': 0.1, '1M': -0.5, 'YTD': 85.9, '6M': 85.9, '1Y': 133.4 },
  DRAM: { '1W': -14.2, '1M': -2.9, 'YTD': 137.8, '6M': 137.8, '1Y': 137.8 },
  // Broad Tech
  PTF:  { '1W': -4.6, '1M': -3.3, 'YTD': 65, '6M': 65, '1Y': 90.8 },
  WCLD: { '1W': 14.9, '1M': -7.4, 'YTD': -4.9, '6M': -4.9, '1Y': -6.9 },
  IGV:  { '1W': 10.7, '1M': -12.9, 'YTD': -11.2, '6M': -11.2, '1Y': -13.3 },
  FDTX: { '1W': 0.3, '1M': 0.3, 'YTD': 38.2, '6M': 38.2, '1Y': 45.8 },
  GTEK: { '1W': 3.3, '1M': 2.1, 'YTD': 55.3, '6M': 55.3, '1Y': 73.4 },
  ARKK: { '1W': 6.8, '1M': 0.6, 'YTD': 6.3, '6M': 6.3, '1Y': 18.6 },
  MARS: { '1W': 13.9, '1M': -19.3, 'YTD': 27.6, '6M': 27.6, '1Y': 27.6 },
  FRWD: { '1W': -0.7, '1M': -2.6, 'YTD': 31.1, '6M': 31.1, '1Y': 31.1 },
  BCTK: { '1W': 2.8, '1M': -0.7, 'YTD': 25.2, '6M': 25.2, '1Y': 27.5 },
  FWD:  { '1W': -1.4, '1M': -0.6, 'YTD': 36.8, '6M': 36.8, '1Y': 62.5 },
  CBSE: { '1W': 0.6, '1M': 1.4, 'YTD': 30.3, '6M': 30.3, '1Y': 41 },
  FCUS: { '1W': -4.2, '1M': -4.5, 'YTD': 37.6, '6M': 37.6, '1Y': 70.5 },
  WGMI: { '1W': -8.3, '1M': -15.9, 'YTD': 55.5, '6M': 55.5, '1Y': 157.8 },
  CNEQ: { '1W': 2.5, '1M': -2.3, 'YTD': 17.9, '6M': 17.9, '1Y': 40.1 },
  SGRT: { '1W': -4.4, '1M': -2.8, 'YTD': 42.9, '6M': 42.9, '1Y': 78.8 },
  SPMO: { '1W': -2.9, '1M': 1.8, 'YTD': 29.9, '6M': 29.9, '1Y': 40 },
  XMMO: { '1W': -2.9, '1M': -0.1, 'YTD': 20, '6M': 20, '1Y': 29.1 },
  // Electrification
  POW:  { '1W': -1.8, '1M': -4.5, 'YTD': 52.1, '6M': 52.1, '1Y': 47.6 },
  VOLT: { '1W': -3.3, '1M': 4.9, 'YTD': 39.7, '6M': 39.7, '1Y': 59.7 },
  PBD:  { '1W': 0.7, '1M': -13.5, 'YTD': 20.3, '6M': 20.3, '1Y': 52.3 },
  PBW:  { '1W': 1.8, '1M': -15.9, 'YTD': 24.9, '6M': 24.9, '1Y': 89.9 },
  IVEP: { '1W': -4.1, '1M': -1.5, 'YTD': 4, '6M': 4, '1Y': 4 },
  // Industrials
  AIRR: { '1W': -2.6, '1M': 1.6, 'YTD': 31.7, '6M': 31.7, '1Y': 57.5 },
  PRN:  { '1W': -2.9, '1M': 4.2, 'YTD': 43.4, '6M': 43.4, '1Y': 62 },
  RSHO: { '1W': 0, '1M': 5.8, 'YTD': 39.4, '6M': 36.1, '1Y': 55.6 },
  IDEF: { '1W': 3.6, '1M': -3.8, 'YTD': 4.1, '6M': 4.1, '1Y': 15.4 },
  BILT: { '1W': -1, '1M': -2.1, 'YTD': 8.4, '6M': 8.4, '1Y': 11.7 },
  // Meme
  BUZZ: { '1W': 4.9, '1M': -9.4, 'YTD': 13.8, '6M': 13.8, '1Y': 24.2 },
  MEME: { '1W': -1.2, '1M': -19.1, 'YTD': 46.5, '6M': 46.5, '1Y': -7.5 },
  RKNG: { '1W': 0.2, '1M': -6, 'YTD': 8.6, '6M': 8.6, '1Y': 8.6 },
};
// @@END_GENERATED:ETF_RETURNS@@

// @@GENERATED:ETF_DAY_CHANGE@@
// Today's % move per ETF ticker (1D, vs prior close). Refreshed by the 3×/day
// price jobs. Powers the 1D ranking in the theme-ETF side panel.
export const ETF_DAY_CHANGE: Record<string, number> = {
  AIS:  -6.77,
  ARTY: -3.86,
  BAI:  -6.27,
  IGPT: -3.79,
  IVES: -0.24,
  ALAI: -0.96,
  CHAT: -4.93,
  AIFD: -2.76,
  SPRX: -5.69,
  AOTG: -0.66,
  SOXX: -6.55,
  PSI:  -7.77,
  XSD:  -4.14,
  DRAM: -10.62,
  PTF:  -7.36,
  WCLD: 3.89,
  IGV:  3.58,
  FDTX: -2.56,
  GTEK: -1.3,
  ARKK: 1.13,
  MARS: -2.14,
  FRWD: -3.13,
  BCTK: -3.11,
  FWD:  -3.59,
  CBSE: -1.9,
  FCUS: -3.69,
  WGMI: -5.63,
  CNEQ: -1.77,
  SGRT: -4.67,
  SPMO: -4.03,
  XMMO: -2.37,
  POW:  -3.45,
  VOLT: -3.56,
  PBD:  -1.32,
  PBW:  -2.22,
  IVEP: -2.92,
  AIRR: -2.81,
  PRN:  -3.83,
  IDEF: 0.94,
  BILT: 0.07,
  BUZZ: 0.05,
  MEME: -5.71,
  RKNG: -2.94,
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
  'AI & ML': { etfs: ['AIS', 'AOTG', 'AIFD'], series: { '1W': [100, 97.84, 100.6, 103.83, 100.24], '1M': [100, 102.2, 101.44, 100.09, 91.81, 94.2, 92.68, 90.15, 94.79, 95.43, 96.78, 97.44, 101.71, 102.85, 96.6, 95.99, 98.43, 96.17, 98.91, 102.1, 98.43], 'YTD': [100, 102.31, 103.37, 104.56, 103.87, 102.39, 103.32, 103.16, 105.28, 104.19, 104.9, 103.53, 94.47, 102.85, 113.13, 120.59, 126.74, 130.28, 143.94, 136.82, 150.94, 162.62, 146.93, 154.06, 153.64, 156.61], '6M': [100, 101.31, 101.87, 102.7, 103.07, 102.66, 101.05, 101.08, 103.16, 102.13, 102.78, 101.46, 92.6, 101.79, 113.22, 118.03, 120.29, 131.35, 136.98, 133.83, 147.51, 158.93, 143.64, 150.56, 150.08, 153.06], '1Y': [100, 101.99, 102.85, 104.66, 107.11, 106.5, 108.5, 105.74, 107.41, 107.14, 112.95, 115.52, 117.09, 120.18, 124.87, 122.86, 122.51, 132.43, 129.06, 126.94, 118.88, 120.46, 124.37, 128.78, 118.36, 126.64, 127.67, 129.4, 130.38, 131.45, 132.23, 132.02, 130.38, 130.28, 132.95, 131.35, 132.48, 130.65, 119.1, 131.17, 146.32, 152.62, 155.62, 170.53, 178.07, 173.84, 192.43, 207.29, 187.07, 196.4, 196.2, 199.63] }, returns: { '1W': 0.2, '1M': -1.6, 'YTD': 56.6, '6M': 53.1, '1Y': 99.6 } },
  'Semiconductors': { etfs: ['PSI', 'DRAM', 'XSD'], series: { '1W': [100, 94.67, 97.7, 102.11, 94.53], '1M': [100, 104.66, 105.74, 102.98, 90.51, 95.83, 94.33, 91.29, 100.42, 101.88, 102.61, 103.52, 111.56, 115.53, 104.38, 103.61, 109.3, 103.44, 106.74, 111.53, 103.1], 'YTD': [100, 107.31, 114.2, 118.33, 117.99, 120.64, 124.76, 123.69, 128.03, 129.21, 130.59, 136.66, 133.73, 136.77, 152.34, 168.29, 179.3, 192.12, 192.65, 187.55, 211.91, 216.45, 221, 216.21, 218.86, 214.46], '6M': [100, 105.68, 111.5, 114.34, 116.26, 117.92, 120.84, 120.14, 124.45, 125.9, 127.23, 133.28, 130.62, 133.68, 149.82, 164.87, 170.46, 191.25, 181.87, 182.36, 205.92, 210.42, 215.43, 210.27, 212.9, 208.37], '1Y': [100, 104.16, 104.01, 107.42, 108.55, 108.11, 115.08, 110.93, 115.67, 113.1, 117.44, 123.06, 124.23, 127.89, 130.2, 132.39, 130.81, 138.34, 143.12, 144.3, 134.11, 145.12, 154.71, 157.41, 147.59, 149.38, 149.05, 154.57, 159.69, 160.03, 171.85, 175.46, 178.37, 177.58, 186.05, 178.62, 175.2, 163.81, 161.84, 168.72, 192.42, 202.2, 213.02, 227.11, 247.11, 245.98, 255.48, 257.34, 252.15, 256.87, 259.51, 253.63] }, returns: { '1W': -5.5, '1M': 3.1, 'YTD': 114.5, '6M': 108.4, '1Y': 153.6 } },
  'Broad Tech': { etfs: ['WGMI', 'PTF', 'SGRT'], series: { '1W': [100, 97.6, 98.35, 100.16, 94.23], '1M': [100, 102.62, 102.36, 100.76, 91.26, 94.48, 91.9, 88.83, 94.78, 96.93, 99.33, 99.48, 102.89, 104.09, 99.44, 96.67, 98.28, 95.8, 96.66, 98.53, 92.69], 'YTD': [100, 107.37, 113.44, 114.56, 110.78, 110.24, 111.62, 112.5, 115.89, 107.44, 110.92, 110.02, 97.79, 109.13, 124.36, 132.2, 134.41, 137.73, 153.94, 143.67, 161.94, 171.79, 153.71, 166.3, 161.65, 154.49], '6M': [100, 104.18, 110.69, 106.96, 106.98, 109.44, 105.63, 107.56, 110.83, 102.76, 105.97, 105.15, 93.63, 105.94, 121.64, 124.3, 122.53, 138.26, 143.46, 137.06, 154.34, 163.57, 146.41, 158.34, 153.96, 147.38], '1Y': [100, 105.32, 106.4, 110.4, 108.29, 110.33, 110.04, 111.46, 118.2, 118.65, 128.74, 139.3, 146.23, 144.6, 162.06, 174.61, 150.33, 166.91, 172.62, 149.32, 139.2, 144.06, 147.09, 150.29, 133.4, 145.39, 145.65, 150.42, 161.06, 155.22, 155.99, 157.53, 148.67, 148.51, 152.5, 144.25, 146.25, 149.51, 139.49, 153.97, 173.39, 177, 179.6, 198.47, 200.95, 199.03, 220.45, 228.76, 211.43, 228.46, 222.56, 209.13] }, returns: { '1W': -5.8, '1M': -7.3, 'YTD': 54.5, '6M': 47.4, '1Y': 109.1 } },
  'Electrification': { etfs: ['PBW', 'POW', 'VOLT'], series: { '1W': [100, 97.12, 99.58, 102.01, 98.88], '1M': [100, 102.15, 101.03, 100.91, 94.08, 94.79, 93.66, 90.58, 94.75, 95.54, 97.06, 97.17, 99.44, 100.56, 96.04, 95.37, 96.17, 93.32, 95.59, 97.93, 94.87], 'YTD': [100, 104.13, 109.93, 112.37, 112.23, 115.87, 118.59, 119.33, 120.87, 114.8, 116.56, 116.34, 110.84, 116.55, 126.22, 131.1, 137.06, 142.29, 150.16, 137.67, 149.98, 149.96, 137.29, 142.31, 139.61, 138.89], '6M': [100, 101.21, 107.28, 107.52, 107.83, 113.48, 113.99, 114.8, 116.3, 110.45, 112.15, 111.95, 106.66, 112.21, 123.29, 125.49, 129.87, 140.66, 140.77, 132.42, 144.2, 144.11, 132.05, 136.89, 134.34, 133.64], '1Y': [100, 103.84, 105.32, 109.72, 106.78, 106.07, 109.29, 108.71, 112.34, 110.04, 110.68, 113.33, 118.13, 121.59, 126.96, 132.54, 125.94, 131.62, 131.11, 130.55, 125.84, 126.94, 130.75, 133.03, 127.76, 134.56, 133.09, 134.28, 139.11, 140.01, 139.72, 142.69, 141.89, 142.71, 146.43, 142.23, 144.99, 148.09, 142.91, 150.09, 161.45, 163.4, 160.19, 170.65, 173.95, 167.15, 175.55, 179.4, 166.95, 171.5, 164.9, 165.73] }, returns: { '1W': -1.1, '1M': -5.1, 'YTD': 38.9, '6M': 33.6, '1Y': 65.7 } },
  'Industrials': { etfs: ['PRN', 'RSHO', 'BILT'], series: { '1W': [100, 98.28, 99.24, 100.57, 98.7], '1M': [100, 100.99, 100.86, 101.14, 99.49, 100.17, 100.45, 98.19, 100.9, 101.63, 99.27, 100.66, 101.59, 103.34, 102.15, 102.95, 103.97, 102.13, 103.16, 104.6, 102.61], 'YTD': [100, 102.86, 107.52, 107.45, 108.67, 113.02, 118.03, 119.37, 119.23, 112.64, 111.71, 111.28, 109.29, 113.09, 120.6, 121.84, 123.18, 124.54, 127.76, 125.3, 126.95, 127.51, 127.21, 128.06, 130.88, 130.43], '6M': [100, 101.33, 105.32, 105.14, 106.11, 110.84, 115.01, 116.63, 117.07, 112.73, 110.6, 109.09, 108.54, 110.91, 117.76, 117.32, 118.97, 121.96, 125.37, 122.34, 124.1, 124.88, 124.53, 125.31, 128.05, 127.62], '1Y': [100, 101.83, 102.54, 104.22, 104.45, 103.18, 104.21, 103.32, 105.1, 103.92, 105.4, 105.92, 107.17, 108.5, 109.05, 109.2, 108.57, 112.24, 110.02, 109.45, 104.88, 107.62, 107.86, 109.72, 108.09, 111.58, 111.24, 114.12, 119.16, 119.88, 121.4, 126.18, 129.45, 130.27, 129.16, 122.47, 120.85, 122.26, 120.08, 124.02, 132.04, 133.19, 133.99, 137.67, 139.34, 137.81, 138.69, 139.87, 139.38, 139.82, 143.58, 143.09] }, returns: { '1W': -1.3, '1M': 2.6, 'YTD': 30.4, '6M': 27.6, '1Y': 43.1 } },
  'Meme': { etfs: ['MEME', 'BUZZ', 'RKNG'], series: { '1W': [100, 97.91, 102.19, 104.3, 101.3], '1M': [100, 102.46, 98.88, 99.41, 89.27, 91.56, 88.31, 85.88, 91.43, 90.27, 91.57, 92.14, 95.42, 95.29, 90.87, 87.83, 87.38, 85.57, 89.26, 91.11, 88.52], 'YTD': [100, 108.03, 105.55, 106.35, 99.62, 96.61, 93.56, 93.37, 94.8, 92.23, 93.45, 92.11, 85.8, 94.45, 106.88, 114.64, 112.67, 119.38, 127.99, 123.62, 138.32, 143.41, 125.07, 128.2, 122.8, 122.96], '6M': [100, 106.14, 103.76, 99.84, 95.3, 95.66, 89.66, 89.73, 91.08, 88.7, 89.75, 88.45, 82.68, 91.61, 105.46, 107.99, 105.28, 117.62, 120.37, 118.76, 132.56, 137.43, 120.09, 123.12, 117.97, 118.18], '1Y': [100, 103.75, 101.72, 96.73, 93.42, 91.57, 90.24, 86.67, 85.13, 82.49, 86.69, 88.17, 91.37, 89.79, 88.74, 92.19, 86.99, 95.08, 93.47, 91.99, 89.06, 86.39, 85.91, 84.91, 85.98, 87.82, 89.79, 92.84, 93.77, 92.03, 91.5, 90.75, 90.56, 87.51, 90.43, 95.72, 99.12, 97.49, 92.04, 96.23, 105.93, 107.92, 111.28, 105.16, 114.13, 114.37, 119.67, 114.57, 113.74, 113.34, 107.67, 108.45] }, returns: { '1W': 1.3, '1M': -11.5, 'YTD': 23, '6M': 18.2, '1Y': 8.5 } },
};
// @@END_GENERATED:THEME_REPRESENTATIVES@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 10, avgWeight: 6.03, proScore: 6.03, coverage: 1,
      price: 198, weeklyPrices: [195.74, 192.53, 194.97, 200.09, 198.00], weeklyChange: 1.15, dayChange: -1.05, sortRank: 0, periodReturns: { '1M': -11.8, 'YTD': 6.2, '6M': 6.2, '1Y': 29.2 },
      priceHistory: { '1D': [200.09, 194.45, 195.46, 196.21, 196.09, 195.7, 195.85, 195.91, 196.62, 196.77, 196.67, 196.84, 196.89, 197.4, 197.44, 197.21, 197.97, 198.25, 198.6, 198.79, 197.91, 198.1, 198.35, 198], '1W': [195.74, 192.53, 194.97, 200.09, 198], '1M': [224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 198], 'YTD': [186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 222.32, 214.86, 222.82, 208.19, 207.41, 199, 198], '6M': [188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 222.32, 214.86, 222.82, 208.19, 207.41, 199, 198], '1Y': [153.3, 162.88, 171.37, 170.78, 179.27, 179.42, 181.59, 175.64, 181.77, 170.62, 177.33, 170.29, 176.97, 187.24, 189.11, 179.83, 180.28, 207.04, 195.21, 193.8, 181.36, 177.82, 179.59, 183.78, 170.94, 188.61, 188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 222.32, 214.86, 222.82, 208.19, 207.41, 199, 198] },
      velocityScore: { '1D': -0.2, '1W': -2.9, '1M': 16, '6M': null }, isNew: false,
      marketCap: '$4.8T', pe: 30.4, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.5,
      etfPresence: { AIS: 2.26, ARTY: 4.4, BAI: 3.84, IGPT: 7.2, IVES: 4.71, ALAI: 12.24, CHAT: 6.3, AIFD: 6.05, SPRX: 3.33, AOTG: 9.94 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 6.43, proScore: 5.79, coverage: 0.9,
      price: 1039.5, weeklyPrices: [1213.56, 1132.33, 1145.28, 1154.29, 1039.50], weeklyChange: -14.34, dayChange: -9.94, sortRank: 0, periodReturns: { '1M': 0.4, 'YTD': 264.2, '6M': 264.2, '1Y': 759.9 },
      priceHistory: { '1D': [1154.29, 1081.66, 1081.17, 1082.54, 1077.65, 1066.35, 1057.3, 1054.44, 1056.89, 1059.39, 1050.4, 1048.2, 1055.02, 1053.52, 1053.23, 1048.76, 1053.26, 1050.31, 1043.49, 1041.9, 1043.35, 1043.77, 1044.26, 1039.5], '1W': [1213.56, 1132.33, 1145.28, 1154.29, 1039.5], '1M': [1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1039.5], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1039.5], '6M': [315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1039.5], '1Y': [120.89, 122.24, 116.43, 109.83, 114.74, 108.78, 124.27, 122.05, 116.5, 118.72, 140, 159.99, 161.71, 182.15, 196.54, 191.94, 198.47, 226.63, 237.5, 244.9, 228.5, 224.53, 234.16, 263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1039.5] },
      velocityScore: { '1D': -2.7, '1W': 1.9, '1M': -8.4, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 23.5, revenueGrowth: 346, eps: 44.21, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { AIS: 7.1, ARTY: 5.52, BAI: 6.62, IGPT: 8.55, IVES: 5.35, ALAI: 1.48, CHAT: 4.31, AIFD: 7.39, SPRX: false, AOTG: 11.58 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 9, avgWeight: 5.72, proScore: 5.14, coverage: 0.9,
      price: 544.32, weeklyPrices: [532.57, 521.58, 539.49, 580.91, 544.32], weeklyChange: 2.21, dayChange: -6.3, sortRank: 0, periodReturns: { '1M': 6.7, 'YTD': 154.2, '6M': 154.2, '1Y': 299.9 },
      priceHistory: { '1D': [580.91, 553.76, 559.64, 555.94, 555.12, 553.03, 553.36, 550.83, 552.57, 554.73, 549.8, 550.2, 551.21, 553.43, 552.27, 551.27, 552.67, 552.59, 550.35, 549.64, 549.02, 548.1, 546.28, 544.32], '1W': [532.57, 521.58, 539.49, 580.91, 544.32], '1M': [510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 544.32], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 420.99, 503.89, 521.54, 475.51, 507.29, 519.74, 544.32], '6M': [223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 420.99, 503.89, 521.54, 475.51, 507.29, 519.74, 544.32], '1Y': [136.11, 138.41, 160.08, 158.65, 179.51, 163.12, 184.42, 166.55, 166.62, 162.13, 159.54, 159.16, 160.88, 164.01, 235.56, 238.6, 230.23, 264.33, 256.33, 258.89, 230.29, 206.13, 217.6, 221.42, 198.11, 215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 420.99, 503.89, 521.54, 475.51, 507.29, 519.74, 544.32] },
      velocityScore: { '1D': 1.8, '1W': 5.5, '1M': -0.8, '6M': null }, isNew: false,
      marketCap: '$888B', pe: 180.2, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.96, ARTY: 5.03, BAI: 5.07, IGPT: 8.77, IVES: 5.11, ALAI: 1.35, CHAT: 4.39, AIFD: false, SPRX: 0.56, AOTG: 16.2 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 8, avgWeight: 3.46, proScore: 2.76, coverage: 0.8,
      price: 369.25, weeklyPrices: [378.91, 365.02, 372.45, 377.75, 369.25], weeklyChange: -2.55, dayChange: -2.25, sortRank: 0, periodReturns: { '1M': -19.7, 'YTD': 6.7, '6M': 6.7, '1Y': 39.5 },
      priceHistory: { '1D': [377.75, 369.68, 371.79, 372.72, 371.61, 371.16, 370.1, 370.52, 371.58, 372.39, 370.37, 369.54, 369.54, 368.95, 368.84, 368.5, 370.08, 369.7, 369.81, 370.38, 369.52, 370.3, 369.98, 369.25], '1W': [378.91, 365.02, 372.45, 377.75, 369.25], '1M': [459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.25], 'YTD': [346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 420.71, 422.01, 481.57, 392.16, 376.71, 382.07, 369.25], '6M': [347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 420.71, 422.01, 481.57, 392.16, 376.71, 382.07, 369.25], '1Y': [264.74, 277.9, 280.81, 283.69, 302.62, 301.67, 309.09, 294.91, 298.01, 302.39, 369.57, 346.17, 339.31, 333.39, 345.5, 351.33, 340.3, 385.98, 358.98, 355.22, 340.5, 385.03, 380.61, 412.97, 326.02, 350.22, 347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 420.71, 422.01, 481.57, 392.16, 376.71, 382.07, 369.25] },
      velocityScore: { '1D': -1.1, '1W': -1.4, '1M': -16.4, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 61.4, revenueGrowth: 48, eps: 6.01, grossMargin: 76, dividendYield: 0.69,
      etfPresence: { AIS: 0.61, ARTY: 4.33, BAI: 3.9, IGPT: false, IVES: 4.58, ALAI: 3.77, CHAT: 3.93, AIFD: 5.1, SPRX: false, AOTG: 1.43 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 7, avgWeight: 3.68, proScore: 2.57, coverage: 0.7,
      price: 273.51, weeklyPrices: [281.26, 266.77, 277.75, 297.89, 273.51], weeklyChange: -2.76, dayChange: -8.18, sortRank: 0, periodReturns: { '1M': 24.6, 'YTD': 221.9, '6M': 221.9, '1Y': 258.7 },
      priceHistory: { '1D': [297.89, 284.07, 288.37, 287.84, 283.62, 282.8, 280.77, 278.73, 277.97, 277.33, 275.07, 277.1, 279.13, 279.55, 278.43, 275.46, 275.67, 275.83, 275.05, 274.8, 275.38, 274.9, 274.02, 273.51], '1W': [281.26, 266.77, 277.75, 297.89, 273.51], '1M': [219.43, 290.79, 301.65, 316.43, 263.47, 288.85, 266.88, 252.59, 280.71, 279.7, 278.67, 289.54, 310.58, 307.86, 279.04, 276.7, 281.26, 266.77, 277.75, 297.89, 273.51], 'YTD': [84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 109.51, 131.3, 147.84, 158.21, 163.66, 170.84, 168.93, 208.26, 290.79, 266.88, 278.67, 276.7, 273.51], '6M': [89.39, 83.22, 80.46, 81.77, 78.66, 82.35, 79.01, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 168.93, 208.26, 290.79, 266.88, 278.67, 276.7, 273.51], '1Y': [76.24, 72.26, 70.85, 73.27, 81.74, 75.32, 79.32, 72.07, 74.26, 62.31, 67.1, 70.98, 80.09, 83.89, 92.5, 88.89, 81.05, 90.15, 92.9, 89.33, 78.68, 83.43, 100.2, 92.47, 81.7, 86.49, 89.39, 83.22, 80.46, 81.77, 78.66, 82.35, 78.61, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 168.93, 208.26, 290.79, 266.88, 278.67, 276.7, 273.51] },
      velocityScore: { '1D': 1.6, '1W': -3.7, '1M': 14.2, '6M': null }, isNew: false,
      marketCap: '$239B', pe: 93.7, revenueGrowth: 28, eps: 2.92, grossMargin: 52, dividendYield: 0.08,
      etfPresence: { AIS: 4.07, ARTY: 4.37, BAI: 2.02, IGPT: 3.68, IVES: false, ALAI: false, CHAT: 1.59, AIFD: 5.83, SPRX: 4.18, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 4.76, proScore: 2.86, coverage: 0.6,
      price: 360.2, weeklyPrices: [343.71, 337.39, 353.65, 357.37, 360.20], weeklyChange: 4.8, dayChange: 0.79, sortRank: 0, periodReturns: { '1M': -4.3, 'YTD': 15.1, '6M': 15.1, '1Y': 104.8 },
      priceHistory: { '1D': [357.37, 359.08, 358.5, 358.78, 359.27, 361.26, 361.7, 361.85, 361.75, 360.06, 359.27, 359.16, 359.23, 358.1, 358.22, 359.29, 358.8, 358.54, 359.39, 360.39, 360, 359.33, 359.82, 360.2], '1W': [343.71, 337.39, 353.65, 357.37, 360.2], '1M': [376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68, 373.25, 363.79, 368.03, 349.68, 346.13, 345.29, 343.71, 337.39, 353.65, 357.37, 360.2], 'YTD': [313, 325.44, 332.78, 327.93, 338, 322.86, 305.72, 311.49, 306.52, 306.36, 305.56, 302.06, 273.5, 299.99, 321.31, 337.42, 350.34, 383.25, 388.64, 396.94, 388.88, 361.85, 364.26, 373.25, 345.29, 360.2], '6M': [315.15, 328.57, 330, 333.26, 343.69, 324.32, 302.02, 311.49, 306.52, 306.36, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 388.43, 387.35, 396.94, 388.88, 361.85, 364.26, 373.25, 345.29, 360.2], '1Y': [175.84, 176.62, 182.97, 190.23, 196.53, 196.09, 201.96, 201.57, 207.14, 230.66, 239.17, 249.53, 247.14, 244.9, 244.62, 251.03, 251.69, 274.57, 284.31, 286.71, 284.28, 323.44, 319.63, 320.21, 296.72, 314.09, 315.15, 328.57, 330, 333.26, 343.69, 324.32, 305.72, 311.49, 306.52, 306.36, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 388.43, 387.35, 396.94, 388.88, 361.85, 364.26, 373.25, 345.29, 360.2] },
      velocityScore: { '1D': -1.4, '1W': -1, '1M': -18.3, '6M': null }, isNew: false,
      marketCap: '$4.4T', pe: 27.5, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.96, IGPT: 7.37, IVES: 4.62, ALAI: false, CHAT: 5.11, AIFD: 4.71, SPRX: false, AOTG: 3.8 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 6, avgWeight: 2.63, proScore: 1.58, coverage: 0.6,
      price: 592.88, weeklyPrices: [675.39, 586.45, 651.88, 638.72, 592.88], weeklyChange: -12.22, dayChange: -7.18, sortRank: 0, periodReturns: { '1M': 8.5, 'YTD': 244.2, '6M': 244.2, '1Y': 828.7 },
      priceHistory: { '1D': [638.72, 607, 609.53, 603.11, 602.69, 594.07, 592.44, 590.07, 595.06, 601.85, 601.28, 604.08, 602.5, 600.43, 597.76, 597.41, 597.58, 596.91, 595.39, 596.21, 596.63, 597.43, 592.94, 592.88], '1W': [675.39, 586.45, 651.88, 638.72, 592.88], '1M': [546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 592.88], 'YTD': [172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 458.68, 524.65, 563.1, 517.72, 681.08, 643.83, 592.88], '6M': [187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 458.68, 524.65, 563.1, 517.72, 681.08, 643.83, 592.88], '1Y': [63.84, 64.64, 66.53, 69.32, 71.43, 73.78, 76.07, 75.86, 79.71, 86, 95.02, 100.94, 109.69, 130.59, 121.18, 120.44, 120.47, 141.38, 160.1, 166.11, 152.86, 155.41, 155.59, 181.95, 166.26, 179.56, 187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 458.68, 524.65, 563.1, 517.72, 681.08, 643.83, 592.88] },
      velocityScore: { '1D': -4.2, '1W': 12.9, '1M': -19, '6M': null }, isNew: false,
      marketCap: '$204B', pe: 35.4, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.09,
      etfPresence: { AIS: 1.35, ARTY: 3.08, BAI: 3.2, IGPT: 3.11, IVES: false, ALAI: 4.34, CHAT: false, AIFD: false, SPRX: false, AOTG: 0.71 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'ANET', name: 'Arista Networks Inc', easyScore: 6, avgWeight: 2.28, proScore: 1.37, coverage: 0.6,
      price: 167.78, weeklyPrices: [165.45, 157.60, 164.10, 169.88, 167.78], weeklyChange: 1.41, dayChange: -1.24, sortRank: 0, periodReturns: { '1M': -1.7, 'YTD': 28, '6M': 28, '1Y': 69.6 },
      priceHistory: { '1D': [169.88, 164.09, 166.64, 167.34, 167.89, 168.2, 167.79, 167.68, 168.32, 169.53, 169.38, 170.15, 169.12, 168.95, 168.23, 167.42, 168.04, 167.62, 166.46, 166.41, 166.71, 167.47, 168.02, 167.78], '1W': [165.45, 157.6, 164.1, 169.88, 167.78], '1M': [170.68, 175.33, 174.37, 166.01, 154.27, 156.4, 152.16, 151.76, 156.4, 163.24, 168.01, 164.93, 169.67, 174.56, 162.2, 161.74, 165.45, 157.6, 164.1, 169.88, 167.78], 'YTD': [131.03, 123.72, 130.59, 136.34, 141.74, 137.49, 141.59, 127.43, 129.3, 137.17, 135.35, 135.88, 116.13, 126.25, 152.02, 166.85, 172.47, 172.62, 136.43, 141.71, 158.01, 175.33, 152.16, 168.01, 161.74, 167.78], '6M': [133.6, 122.89, 129.83, 143.72, 138.37, 141.74, 142.58, 127.43, 129.3, 137.17, 135.35, 135.88, 116.13, 133.64, 154.37, 172.86, 165.29, 170.22, 142.54, 141.71, 158.01, 175.33, 152.16, 168.01, 161.74, 167.78], '1Y': [98.91, 106.28, 108.3, 113.04, 122.09, 138.78, 138.01, 132.78, 134.27, 137.38, 150.72, 142.84, 142.64, 149.27, 157.36, 143.38, 146.59, 162.03, 140.42, 134.98, 123.45, 125.04, 127.8, 132.36, 122.36, 130.77, 133.6, 122.89, 129.83, 143.72, 138.37, 141.74, 141.59, 127.43, 129.3, 137.17, 135.35, 135.88, 116.13, 133.64, 154.37, 172.86, 165.29, 170.22, 142.54, 141.71, 158.01, 175.33, 152.16, 168.01, 161.74, 167.78] },
      velocityScore: { '1D': -2.8, '1W': 2.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$211B', pe: 57.9, revenueGrowth: 35, eps: 2.9, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: 1.38, ARTY: 2.42, BAI: 1.31, IGPT: false, IVES: false, ALAI: false, CHAT: 2.21, AIFD: 4.75, SPRX: 1.6, AOTG: false },
      tonyNote: 'Arista Networks Inc appears in 6 of 10 AI & ML ETFs (60% coverage) with average weight 2.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 5, avgWeight: 5.28, proScore: 2.64, coverage: 0.5,
      price: 443.92, weeklyPrices: [434.99, 432.35, 455.10, 477.57, 443.92], weeklyChange: 2.05, dayChange: -7.05, sortRank: 0, periodReturns: { '1M': 1.9, 'YTD': 46.1, '6M': 46.1, '1Y': 97.6 },
      priceHistory: { '1D': [477.57, 458.65, 462.66, 459.3, 458.2, 455.01, 450.88, 448.69, 450.61, 449.86, 446.98, 446.96, 447.95, 448.62, 447.2, 445.58, 445.23, 445.2, 445.29, 445.81, 445.68, 445.55, 445.18, 443.92], '1W': [434.99, 432.35, 455.1, 477.57, 443.92], '1M': [435.63, 446.69, 436.69, 444.92, 415.17, 426.8, 427.92, 408.75, 421.07, 423.93, 425.83, 432.15, 462.12, 467.67, 436.39, 440.83, 434.99, 432.35, 455.1, 477.57, 443.92], 'YTD': [303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 370.04, 369.11, 348.7, 340.23, 338.45, 316.5, 341.76, 369.57, 366.24, 404.98, 401.61, 404.54, 395.95, 412.32, 446.69, 427.92, 425.83, 440.83, 443.92], '6M': [319.61, 323.63, 342.4, 332.71, 341.36, 355.41, 364.2, 370.04, 369.11, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 395.95, 412.32, 446.69, 427.92, 425.83, 440.83, 443.92], '1Y': [224.68, 231.84, 237.56, 240.33, 242.91, 231.37, 241.44, 232.7, 238.72, 231.39, 260.44, 262.79, 280.71, 288.47, 304.52, 304.71, 288.88, 305.09, 293.64, 290.62, 277.91, 284.68, 295.45, 310.14, 276.96, 298.8, 319.61, 323.63, 342.4, 332.71, 341.36, 355.41, 366.36, 370.04, 369.11, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 395.95, 412.32, 446.69, 427.92, 425.83, 440.83, 443.92] },
      velocityScore: { '1D': 1.5, '1W': -9, '1M': -11.7, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 38.6, revenueGrowth: 35, eps: 11.51, grossMargin: 62, dividendYield: 0.8,
      etfPresence: { AIS: 3.31, ARTY: false, BAI: 4.54, IGPT: false, IVES: 5.26, ALAI: 5.97, CHAT: false, AIFD: false, SPRX: false, AOTG: 7.3 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 5, avgWeight: 3.84, proScore: 1.92, coverage: 0.5,
      price: 243.95, weeklyPrices: [227.01, 232.69, 240.14, 238.34, 243.95], weeklyChange: 7.46, dayChange: 2.35, sortRank: 0, periodReturns: { '1M': -6.6, 'YTD': 5.7, '6M': 5.7, '1Y': 10.7 },
      priceHistory: { '1D': [238.34, 236.25, 237.84, 239.39, 239.75, 241.48, 241.89, 242.38, 242.88, 242.34, 241.57, 241.96, 242.19, 242.45, 242.46, 243.07, 244.28, 243.98, 244.01, 244.37, 244.1, 244.12, 244.1, 243.95], '1W': [227.01, 232.69, 240.14, 238.34, 243.95], '1M': [261.26, 256.52, 250.02, 253.79, 246.03, 245.22, 244.19, 238, 241.51, 238.55, 246, 237.5, 244.39, 232.79, 234.11, 234.27, 227.01, 232.69, 240.14, 238.34, 243.95], 'YTD': [230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 198.79, 205.27, 208.39, 213.49, 211.74, 210.14, 200.95, 212.79, 239.89, 248.28, 261.12, 272.05, 268.99, 264.86, 265.29, 256.52, 244.19, 246, 234.27, 243.95], '6M': [226.5, 247.38, 239.12, 238.42, 242.96, 208.72, 201.15, 205.27, 208.39, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 264.86, 265.29, 256.52, 244.19, 246, 234.27, 243.95], '1Y': [220.46, 222.54, 223.19, 228.29, 230.19, 222.31, 224.56, 228.01, 228.71, 225.99, 230.33, 231.62, 220.21, 220.63, 225.22, 215.57, 217.95, 230.3, 250.2, 244.2, 222.55, 229.67, 232.38, 231.78, 221.27, 232.38, 226.5, 247.38, 239.12, 238.42, 242.96, 208.72, 198.79, 205.27, 208.39, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 264.86, 265.29, 256.52, 244.19, 246, 234.27, 243.95] },
      velocityScore: { '1D': -3.5, '1W': 22.3, '1M': -33.3, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 32.4, revenueGrowth: 17, eps: 7.53, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 4.67, ALAI: 4.94, CHAT: 2.31, AIFD: 3.32, SPRX: false, AOTG: 3.94 },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 5, avgWeight: 3.74, proScore: 1.87, coverage: 0.5,
      price: 618.74, weeklyPrices: [542.87, 550.25, 562.60, 563.29, 618.74], weeklyChange: 13.98, dayChange: 9.84, sortRank: 0, periodReturns: { '1M': 3, 'YTD': -6.3, '6M': -6.3, '1Y': -14 },
      priceHistory: { '1D': [563.29, 601.9, 606.45, 610.83, 613.02, 620.1, 624.01, 626.6, 624.07, 620.5, 617.69, 619.63, 618.01, 618.62, 617.93, 618.91, 618.45, 617.6, 621.55, 621.21, 618.16, 621.34, 618.41, 618.74], '1W': [542.87, 550.25, 562.6, 563.29, 618.74], '1M': [600.47, 597.63, 622.98, 627.57, 593, 585.39, 584.59, 570.98, 568.43, 566.98, 600.21, 567.58, 577.22, 563.85, 562.2, 557.67, 542.87, 550.25, 562.6, 563.29, 618.74], 'YTD': [660.09, 646.06, 620.8, 658.76, 716.5, 661.46, 639.77, 637.25, 653.56, 647.39, 627.45, 604.06, 536.38, 573.02, 634.53, 670.91, 678.62, 610.41, 598.86, 611.21, 612.34, 597.63, 584.59, 600.21, 557.67, 618.74], '6M': [650.41, 653.06, 620.25, 672.36, 706.41, 677.22, 639.29, 637.25, 653.56, 647.39, 627.45, 604.06, 536.38, 575.05, 662.49, 668.84, 671.34, 604.96, 603, 611.21, 612.34, 597.63, 584.59, 600.21, 557.67, 618.74], '1Y': [719.22, 732.78, 702.91, 713.58, 695.21, 771.99, 780.08, 751.48, 754.1, 737.05, 751.98, 775.72, 760.66, 717.34, 717.84, 717.55, 733.41, 751.67, 635.95, 609.01, 597.69, 636.22, 639.6, 650.13, 649.5, 667.55, 650.41, 653.06, 620.25, 672.36, 706.41, 677.22, 639.77, 637.25, 653.56, 647.39, 627.45, 604.06, 536.38, 575.05, 662.49, 668.84, 671.34, 604.96, 603, 611.21, 612.34, 597.63, 584.59, 600.21, 557.67, 618.74] },
      velocityScore: { '1D': -2.6, '1W': -3.1, '1M': -29.7, '6M': null }, isNew: false,
      marketCap: '$1.6T', pe: 22.5, revenueGrowth: 33, eps: 27.49, grossMargin: 82, dividendYield: 0.37,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: 7.31, IVES: 4.54, ALAI: 3.76, CHAT: 2, AIFD: false, SPRX: false, AOTG: 1.08 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 5, avgWeight: 3.66, proScore: 1.83, coverage: 0.5,
      price: 436.52, weeklyPrices: [398.00, 391.74, 455.96, 483.02, 436.52], weeklyChange: 9.68, dayChange: -9.63, sortRank: 0, periodReturns: { '1M': 36.4, 'YTD': 162.4, '6M': 162.4, '1Y': 392.4 },
      priceHistory: { '1D': [483.02, 454.62, 463.01, 461.21, 458.02, 455.17, 450.01, 448.93, 456.29, 456.64, 443.98, 446.6, 449.51, 449.32, 446.8, 445.32, 445.53, 443.67, 441.83, 440.96, 441.45, 440.08, 438.48, 436.52], '1W': [398, 391.74, 455.96, 483.02, 436.52], '1M': [320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 436.52], 'YTD': [166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 215.58, 318.72, 355.76, 341.7, 361.71, 399.92, 436.52], '6M': [179.56, 162.61, 182, 163.25, 152.44, 187.67, 123.69, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 215.58, 318.72, 355.76, 341.7, 361.71, 399.92, 436.52], '1Y': [88.66, 99.86, 91.94, 119.48, 128.87, 174.39, 193.64, 171.06, 178.56, 176.61, 230.37, 249.38, 205.27, 194.5, 219.36, 161.46, 154.85, 173.62, 181.94, 157.79, 139.52, 144.78, 152.5, 164.32, 140.24, 169.97, 179.56, 162.61, 182, 163.25, 152.44, 187.67, 129.32, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 215.58, 318.72, 355.76, 341.7, 361.71, 399.92, 436.52] },
      velocityScore: { '1D': 0, '1W': 16.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$75B', pe: 291, revenueGrowth: 93, eps: 1.5, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 2.34, ARTY: 1.55, BAI: false, IGPT: false, IVES: false, ALAI: 1.22, CHAT: 3.33, AIFD: false, SPRX: 9.85, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.44, proScore: 1.72, coverage: 0.5,
      price: 387.21, weeklyPrices: [352.83, 372.97, 368.57, 373.02, 387.21], weeklyChange: 9.75, dayChange: 3.81, sortRank: 0, periodReturns: { '1M': -15.9, 'YTD': -19.9, '6M': -19.9, '1Y': -21.3 },
      priceHistory: { '1D': [373.02, 377.14, 377.51, 379.96, 382.42, 383.74, 384.57, 385.88, 386.61, 384.88, 384.8, 385.76, 385.59, 385.75, 385.8, 386.27, 387.9, 387.42, 387.21, 388.19, 387.95, 388.13, 387.69, 387.21], '1W': [352.83, 372.97, 368.57, 373.02, 387.21], '1M': [460.52, 441.31, 427.34, 428.05, 416.67, 411.74, 403.41, 397.36, 390.34, 390.74, 393.83, 378.91, 379.4, 367.34, 373.94, 365.46, 352.83, 372.97, 368.57, 373.02, 387.21], 'YTD': [483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 384.47, 398.55, 409.41, 399.95, 383, 358.96, 372.88, 384.37, 418.07, 424.82, 413.62, 412.66, 423.54, 416.03, 441.31, 403.41, 393.83, 365.46, 387.21], '6M': [472.94, 479.28, 459.86, 470.28, 423.37, 413.6, 396.86, 384.47, 398.55, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 423.54, 416.03, 441.31, 403.41, 393.83, 365.46, 387.21], '1Y': [492.05, 503.51, 505.62, 505.87, 513.24, 524.94, 520.58, 509.77, 502.04, 505.35, 500.37, 510.02, 510.15, 519.71, 524.85, 513.43, 520.54, 541.55, 507.16, 511.14, 493.79, 476.99, 477.73, 478.56, 476.12, 488.02, 472.94, 479.28, 459.86, 470.28, 423.37, 413.6, 401.32, 384.47, 398.55, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 423.54, 416.03, 441.31, 403.41, 393.83, 365.46, 387.21] },
      velocityScore: { '1D': 0.6, '1W': -1.7, '1M': -33.8, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 23.1, revenueGrowth: 18, eps: 16.79, grossMargin: 68, dividendYield: 0.98,
      etfPresence: { AIS: false, ARTY: 2.43, BAI: false, IGPT: false, IVES: 4.51, ALAI: 4.78, CHAT: 2.05, AIFD: false, SPRX: false, AOTG: 3.44 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 5, avgWeight: 2.74, proScore: 1.37, coverage: 0.5,
      price: 795.14, weeklyPrices: [861.97, 816.98, 851.40, 858.06, 795.14], weeklyChange: -7.75, dayChange: -7.33, sortRank: 0, periodReturns: { '1M': -12.1, 'YTD': 115.7, '6M': 115.7, '1Y': 769.1 },
      priceHistory: { '1D': [858.06, 830.7, 825.32, 820.5, 825.87, 815.56, 794.96, 797.86, 801.19, 803.81, 802.76, 805.26, 808.03, 806.66, 802.66, 802.6, 807.58, 805.99, 802.38, 803.09, 803.89, 803.61, 797.11, 795.14], '1W': [861.97, 816.98, 851.4, 858.06, 795.14], '1M': [905, 1029.15, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 875.36, 869.98, 850, 893.93, 827.92, 842.53, 861.97, 816.98, 851.4, 858.06, 795.14], 'YTD': [368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 772.28, 871.18, 895.11, 859.68, 976.18, 1053.09, 884.98, 910.81, 1029.15, 821.76, 875.36, 842.53, 795.14], '6M': [386.11, 351.42, 324.25, 332.45, 423.42, 577.15, 600.42, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 884.98, 910.81, 1029.15, 821.76, 875.36, 842.53, 795.14], '1Y': [91.49, 90.44, 99.63, 102.13, 109.85, 110.01, 120.23, 117.96, 124.62, 134.12, 164.88, 163.34, 152.75, 171.4, 163.09, 156.57, 158.06, 214.28, 232.75, 253.81, 247.43, 291.27, 302.98, 366, 320.25, 395.92, 386.11, 351.42, 324.25, 332.45, 423.42, 577.15, 562.74, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 884.98, 910.81, 1029.15, 821.76, 875.36, 842.53, 795.14] },
      velocityScore: { '1D': -0.7, '1W': 2.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$62B', pe: 140.5, revenueGrowth: 90, eps: 5.66, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.5, IGPT: false, IVES: false, ALAI: 0.78, CHAT: 1.39, AIFD: 5.61, SPRX: 3.4, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 5 of 10 AI & ML ETFs (50% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 5, avgWeight: 2.62, proScore: 1.31, coverage: 0.5,
      price: 2007, weeklyPrices: [2335.00, 2090.71, 2050.39, 2273.73, 2007.00], weeklyChange: -14.05, dayChange: -11.73, sortRank: 0, periodReturns: { '1M': 13.9, 'YTD': 745.5, '6M': 745.5, '1Y': 4364 },
      priceHistory: { '1D': [2273.73, 2080, 2103.03, 2098.5, 2092, 2057.94, 2040.46, 2032.3, 2050.67, 2067.29, 2052.21, 2064.41, 2066.08, 2051.94, 2064.76, 2040.97, 2044.69, 2041.78, 2028.09, 2035.88, 2029.72, 2022.49, 2012.19, 2007], '1W': [2335, 2090.71, 2050.39, 2273.73, 2007], '1M': [1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2007], 'YTD': [237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1333.01, 1589.55, 1716.36, 1646.54, 1991.55, 1914.46, 2007], '6M': [275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1333.01, 1589.55, 1716.36, 1646.54, 1991.55, 1914.46, 2007], '1Y': [44.96, 46.2, 41.36, 43, 43.39, 42.1, 47.01, 44.58, 47.35, 53.01, 73.92, 93.97, 99.83, 121.12, 131.88, 144.3, 146.95, 204.36, 216.5, 283.1, 244.93, 220.5, 194.38, 232.86, 206.83, 250.08, 275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1333.01, 1589.55, 1716.36, 1646.54, 1991.55, 1914.46, 2007] },
      velocityScore: { '1D': 4, '1W': 10.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$297B', pe: 68.4, revenueGrowth: 251, eps: 29.33, grossMargin: 56, dividendYield: null,
      etfPresence: { AIS: 2.41, ARTY: false, BAI: 3.34, IGPT: 4.75, IVES: false, ALAI: 0.64, CHAT: false, AIFD: false, SPRX: false, AOTG: 1.98 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'CRDO', name: 'Credo Technology Group Holding Ltd', easyScore: 5, avgWeight: 1.93, proScore: 0.97, coverage: 0.5,
      price: 259.31, weeklyPrices: [268.03, 238.00, 245.68, 271.95, 259.31], weeklyChange: -3.26, dayChange: -4.65, sortRank: 0, periodReturns: { '1M': 14.7, 'YTD': 80.2, '6M': 80.2, '1Y': 196 },
      priceHistory: { '1D': [271.95, 258.55, 265.59, 267.82, 267.7, 266.76, 264.36, 262.52, 265.39, 265.15, 259.74, 261.47, 261.17, 261.8, 261.67, 262.58, 263.2, 262.83, 263.08, 261.91, 262.09, 262.18, 260.77, 259.31], '1W': [268.03, 238, 245.68, 271.95, 259.31], '1M': [226.1, 229, 214.6, 217.5, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81, 239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.31], 'YTD': [143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.05, 114.22, 115.98, 116.88, 105.1, 87.81, 102.46, 134.36, 174.53, 180.5, 180.06, 210.22, 156.27, 221.64, 229, 234.32, 239.18, 268.99, 259.31], '6M': [143.22, 150.42, 150.97, 128.02, 119.96, 123.41, 124.8, 124.05, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 156.27, 221.64, 229, 234.32, 239.18, 268.99, 259.31], '1Y': [87.59, 97.59, 101.19, 98.41, 116.01, 117.34, 121.13, 106.3, 120.1, 124.77, 163.96, 164.44, 149.38, 144.91, 148.87, 131.41, 137.2, 171.52, 173.16, 160.34, 139.56, 154.18, 189.19, 157.98, 134.13, 150.19, 143.22, 150.42, 150.97, 128.02, 119.96, 123.41, 121.44, 124.05, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 156.27, 221.64, 229, 234.32, 239.18, 268.99, 259.31] },
      velocityScore: { '1D': 4.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$48B', pe: 103.7, revenueGrowth: 157, eps: 2.5, grossMargin: 68, dividendYield: null,
      etfPresence: { AIS: 1.07, ARTY: 1.21, BAI: 2.12, IGPT: false, IVES: false, ALAI: false, CHAT: 2.31, AIFD: false, SPRX: 2.94, AOTG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 4, avgWeight: 3.29, proScore: 1.32, coverage: 0.4,
      price: 126.93, weeklyPrices: [132.87, 128.32, 131.72, 139.63, 126.93], weeklyChange: -4.47, dayChange: -9.1, sortRank: 0, periodReturns: { '1M': 16.1, 'YTD': 244, '6M': 244, '1Y': 455.5 },
      priceHistory: { '1D': [139.63, 133.97, 133.71, 131.95, 132.32, 130.62, 129.44, 128.79, 129.33, 129.82, 128.85, 129.08, 129.27, 129.71, 129.38, 128.44, 128.89, 128.37, 127.92, 127.95, 128.24, 127.86, 127.57, 126.93], '1W': [132.87, 128.32, 131.72, 139.63, 126.93], '1M': [109.33, 107.93, 112.71, 111.78, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 126.93], 'YTD': [36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 43.63, 45.5, 45.58, 45.76, 44.01, 41.19, 50.78, 65.18, 65.7, 84.99, 95.78, 129.44, 108.17, 123.52, 107.93, 107.92, 117.05, 131.65, 126.93], '6M': [39.38, 45.55, 46.96, 42.49, 48.81, 50.24, 46.18, 43.63, 45.5, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 108.17, 123.52, 107.93, 107.92, 117.05, 131.65, 126.93], '1Y': [22.85, 23.44, 22.69, 23.49, 20.34, 20.41, 22.22, 25.31, 24.35, 24, 24.77, 24.9, 31.22, 35.94, 37.43, 37.15, 36.92, 41.34, 38.38, 37.89, 34.33, 35.83, 43.76, 40.78, 36.05, 36.16, 39.38, 45.55, 46.96, 42.49, 48.81, 50.24, 46.79, 43.63, 45.5, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 108.17, 123.52, 107.93, 107.92, 117.05, 131.65, 126.93] },
      velocityScore: { '1D': 3.1, '1W': 3.9, '1M': -49, '6M': null }, isNew: false,
      marketCap: '$638B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.57, ARTY: false, BAI: 3.27, IGPT: 4.95, IVES: false, ALAI: false, CHAT: 1.38, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'NBIS', name: 'NEBIUS GROUP NV', easyScore: 4, avgWeight: 3.09, proScore: 1.24, coverage: 0.4,
      price: 232.86, weeklyPrices: [256.63, 240.30, 261.15, 276.17, 232.86], weeklyChange: -9.26, dayChange: -15.68, sortRank: 0, periodReturns: { '1M': -12, 'YTD': 178.2, '6M': 178.2, '1Y': 362.9 },
      priceHistory: { '1D': [276.17, 239.36, 242.26, 243.19, 240.4, 235.73, 232.66, 233.37, 239.54, 240.9, 237.6, 238.01, 238.66, 238.28, 237.01, 235.14, 236.54, 238.04, 237.7, 237.31, 236.12, 236.27, 235.03, 232.86], '1W': [256.63, 240.3, 261.15, 276.17, 232.86], '1M': [264.51, 260.58, 251.68, 259.67, 227.81, 218, 220.12, 211.69, 222.24, 232.36, 265.1, 280.91, 286.69, 283.61, 275.25, 259.66, 256.63, 240.3, 261.15, 276.17, 232.86], 'YTD': [83.71, 97.3, 103.89, 94.5, 85.19, 86.1, 98.01, 100.61, 91.01, 94.94, 129.85, 114.15, 92.26, 112.54, 154.56, 159.16, 144.96, 176.42, 186.1, 199.86, 208.06, 260.58, 220.12, 265.1, 259.66, 232.86], '6M': [89.95, 97.93, 108.73, 91.46, 88.16, 92.88, 97.52, 100.61, 91.01, 94.94, 129.85, 114.15, 92.26, 117.4, 161.94, 156.55, 135.51, 175.92, 179.11, 199.86, 208.06, 260.58, 220.12, 265.1, 259.66, 232.86], '1Y': [50.31, 46.05, 53.31, 51.88, 51.29, 55.09, 70.63, 67.19, 70.48, 65.65, 93.39, 94.08, 113.23, 115.61, 122, 125.83, 98.62, 125.1, 117, 94.36, 90.54, 88.88, 98.92, 93.59, 75.45, 91.13, 89.95, 97.93, 108.73, 91.46, 88.16, 92.88, 98.01, 100.61, 91.01, 94.94, 129.85, 114.15, 92.26, 117.4, 161.94, 156.55, 135.51, 175.92, 179.11, 199.86, 208.06, 260.58, 220.12, 265.1, 259.66, 232.86] },
      velocityScore: { '1D': 2.5, '1W': null, '1M': -38.9, '6M': null }, isNew: false,
      marketCap: '$59B', pe: 89.6, revenueGrowth: 684, eps: 2.6, grossMargin: 72, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 2.77, ALAI: 4.02, CHAT: 3.83, AIFD: 1.76, SPRX: false, AOTG: false },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'ARM', name: 'ARM Holdings PLC', easyScore: 4, avgWeight: 3.03, proScore: 1.21, coverage: 0.4,
      price: 339.05, weeklyPrices: [347.71, 334.27, 343.58, 354.57, 339.05], weeklyChange: -2.49, dayChange: -4.38, sortRank: 0, periodReturns: { '1M': -17.1, 'YTD': 210.2, '6M': 210.2, '1Y': 116.9 },
      priceHistory: { '1D': [354.57, 338.64, 338, 339.46, 340.94, 337.37, 335.9, 336.78, 339.07, 341.36, 341.69, 342.51, 343.5, 343.9, 342.64, 340.68, 340.24, 340.8, 340.73, 340.61, 340.58, 340.98, 339.67, 339.05], '1W': [347.71, 334.27, 343.58, 354.57, 339.05], '1M': [408.85, 402.71, 411.83, 393.44, 342.93, 346.39, 324.86, 307.43, 342.23, 380.81, 396.34, 418.88, 439.46, 407.72, 366.39, 359.08, 347.71, 334.27, 343.58, 354.57, 339.05], 'YTD': [109.31, 113.08, 105.11, 116.07, 105.36, 123.7, 125.28, 123.78, 124.37, 117.63, 121.7, 136.89, 136.96, 148.77, 157.58, 175.1, 215.88, 203.26, 212.65, 215.12, 321.22, 402.71, 324.86, 396.34, 359.08, 339.05], '6M': [114.73, 111.79, 105.78, 114.73, 106.93, 124.61, 126.89, 123.78, 124.37, 117.63, 121.7, 136.89, 136.96, 143.86, 161.22, 175.49, 198.65, 208.84, 207.92, 215.12, 321.22, 402.71, 324.86, 396.34, 359.08, 339.05], '1Y': [156.33, 148.02, 153.9, 159.28, 163.32, 136.12, 141.6, 134.01, 140.26, 131.42, 154.14, 153.37, 144.3, 150.38, 166.77, 170.67, 165.71, 170.39, 160.19, 148.75, 136.04, 131.44, 139.19, 141.52, 114.58, 111.55, 114.73, 111.79, 105.78, 114.73, 106.93, 124.61, 125.28, 123.78, 124.37, 117.63, 121.7, 136.89, 136.96, 143.86, 161.22, 175.49, 198.65, 208.84, 207.92, 215.12, 321.22, 402.71, 324.86, 396.34, 359.08, 339.05] },
      velocityScore: { '1D': 0, '1W': -16, '1M': null, '6M': null }, isNew: false,
      marketCap: '$362B', pe: 398.9, revenueGrowth: 20, eps: 0.85, grossMargin: 98, dividendYield: null,
      etfPresence: { AIS: 1.83, ARTY: false, BAI: false, IGPT: false, IVES: false, ALAI: 0.17, CHAT: 2.61, AIFD: false, SPRX: 7.51, AOTG: false },
      tonyNote: 'Arm Holdings is held across Broad Tech and AI ETFs as the CPU architecture licensor embedded in every mobile device and increasingly in AI inference chips and data center CPUs. Revenue grew and the royalty model is high-margin; the weight score reflects consistent institutional positioning as the AI chip design ecosystem expands on Arm cores.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 4, avgWeight: 2.93, proScore: 1.17, coverage: 0.4,
      price: 310.25, weeklyPrices: [325.57, 303.95, 306.97, 334.82, 310.25], weeklyChange: -4.71, dayChange: -7.34, sortRank: 0, periodReturns: { '1M': -4.1, 'YTD': 91.5, '6M': 91.5, '1Y': 153.2 },
      priceHistory: { '1D': [334.82, 316.6, 321.78, 319.23, 318.99, 315.33, 312.83, 313.78, 316.39, 319.35, 318.14, 318.5, 319, 318.9, 317.25, 315.55, 315, 314.07, 313.99, 314.02, 313.4, 312.44, 311.32, 310.25], '1W': [325.57, 303.95, 306.97, 334.82, 310.25], '1M': [323.39, 334.49, 331.44, 323.92, 300.51, 300.57, 289.52, 280.98, 297.88, 302.87, 299.6, 317.58, 333.05, 357.96, 318.32, 316.43, 325.57, 303.95, 306.97, 334.82, 310.25], 'YTD': [162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 234.53, 245.42, 257.75, 264.35, 264.74, 256, 234.22, 258.73, 299.96, 314.41, 322.43, 330.97, 367.92, 339.73, 323.91, 334.49, 289.52, 299.6, 316.43, 310.25], '6M': [175.61, 163.58, 176.93, 181.23, 190.01, 202, 243.53, 245.42, 257.75, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.13, 339.73, 323.91, 334.49, 289.52, 299.6, 316.43, 310.25], '1Y': [122.54, 128.37, 125.4, 130.19, 144.17, 139.75, 137.4, 129.05, 127.93, 125.59, 136.74, 136.83, 141.62, 161.59, 167.38, 180.51, 171.59, 199.27, 190.71, 173.37, 164.86, 169.57, 178.88, 181.82, 149.83, 166.87, 175.61, 163.58, 176.93, 181.23, 190.01, 202, 234.53, 245.42, 257.75, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.13, 339.73, 323.91, 334.49, 289.52, 299.6, 316.43, 310.25] },
      velocityScore: { '1D': 3.5, '1W': -4.1, '1M': -37.4, '6M': null }, isNew: false,
      marketCap: '$119B', pe: 78, revenueGrowth: 30, eps: 3.98, grossMargin: 37, dividendYield: 0.07,
      etfPresence: { AIS: 3.59, ARTY: false, BAI: 1.88, IGPT: false, IVES: false, ALAI: false, CHAT: 2.31, AIFD: 3.96, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 4.71, proScore: 4.71, coverage: 1,
      price: 1039.5, weeklyPrices: [1213.56, 1132.33, 1145.28, 1154.29, 1039.50], weeklyChange: -14.34, dayChange: -9.94, sortRank: 0, periodReturns: { '1M': 0.4, 'YTD': 264.2, '6M': 264.2, '1Y': 759.9 },
      priceHistory: { '1D': [1154.29, 1081.66, 1081.17, 1082.54, 1077.65, 1066.35, 1057.3, 1054.44, 1056.89, 1059.39, 1050.4, 1048.2, 1055.02, 1053.52, 1053.23, 1048.76, 1053.26, 1050.31, 1043.49, 1041.9, 1043.35, 1043.77, 1044.26, 1039.5], '1W': [1213.56, 1132.33, 1145.28, 1154.29, 1039.5], '1M': [1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1039.5], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1039.5], '6M': [315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1039.5], '1Y': [120.89, 122.24, 116.43, 109.83, 114.74, 108.78, 124.27, 122.05, 116.5, 118.72, 140, 159.99, 161.71, 182.15, 196.54, 191.94, 198.47, 226.63, 237.5, 244.9, 228.5, 224.53, 234.16, 263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1039.5] },
      velocityScore: { '1D': -3.7, '1W': -11.6, '1M': -31.1, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 23.5, revenueGrowth: 346, eps: 44.21, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { SOXX: 8.54, PSI: 5.57, XSD: 2.73, DRAM: 2.01 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 5.26, proScore: 3.94, coverage: 0.75,
      price: 544.32, weeklyPrices: [532.57, 521.58, 539.49, 580.91, 544.32], weeklyChange: 2.21, dayChange: -6.3, sortRank: 0, periodReturns: { '1M': 6.7, 'YTD': 154.2, '6M': 154.2, '1Y': 299.9 },
      priceHistory: { '1D': [580.91, 553.76, 559.64, 555.94, 555.12, 553.03, 553.36, 550.83, 552.57, 554.73, 549.8, 550.2, 551.21, 553.43, 552.27, 551.27, 552.67, 552.59, 550.35, 549.64, 549.02, 548.1, 546.28, 544.32], '1W': [532.57, 521.58, 539.49, 580.91, 544.32], '1M': [510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 544.32], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 420.99, 503.89, 521.54, 475.51, 507.29, 519.74, 544.32], '6M': [223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 420.99, 503.89, 521.54, 475.51, 507.29, 519.74, 544.32], '1Y': [136.11, 138.41, 160.08, 158.65, 179.51, 163.12, 184.42, 166.55, 166.62, 162.13, 159.54, 159.16, 160.88, 164.01, 235.56, 238.6, 230.23, 264.33, 256.33, 258.89, 230.29, 206.13, 217.6, 221.42, 198.11, 215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 420.99, 503.89, 521.54, 475.51, 507.29, 519.74, 544.32] },
      velocityScore: { '1D': 2.6, '1W': 4.2, '1M': -35.3, '6M': null }, isNew: false,
      marketCap: '$888B', pe: 180.2, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 8.09, PSI: 4.98, XSD: 2.71, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.66, proScore: 3.49, coverage: 0.75,
      price: 126.93, weeklyPrices: [132.87, 128.32, 131.72, 139.63, 126.93], weeklyChange: -4.47, dayChange: -9.1, sortRank: 0, periodReturns: { '1M': 16.1, 'YTD': 244, '6M': 244, '1Y': 455.5 },
      priceHistory: { '1D': [139.63, 133.97, 133.71, 131.95, 132.32, 130.62, 129.44, 128.79, 129.33, 129.82, 128.85, 129.08, 129.27, 129.71, 129.38, 128.44, 128.89, 128.37, 127.92, 127.95, 128.24, 127.86, 127.57, 126.93], '1W': [132.87, 128.32, 131.72, 139.63, 126.93], '1M': [109.33, 107.93, 112.71, 111.78, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 126.93], 'YTD': [36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 43.63, 45.5, 45.58, 45.76, 44.01, 41.19, 50.78, 65.18, 65.7, 84.99, 95.78, 129.44, 108.17, 123.52, 107.93, 107.92, 117.05, 131.65, 126.93], '6M': [39.38, 45.55, 46.96, 42.49, 48.81, 50.24, 46.18, 43.63, 45.5, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 108.17, 123.52, 107.93, 107.92, 117.05, 131.65, 126.93], '1Y': [22.85, 23.44, 22.69, 23.49, 20.34, 20.41, 22.22, 25.31, 24.35, 24, 24.77, 24.9, 31.22, 35.94, 37.43, 37.15, 36.92, 41.34, 38.38, 37.89, 34.33, 35.83, 43.76, 40.78, 36.05, 36.16, 39.38, 45.55, 46.96, 42.49, 48.81, 50.24, 46.79, 43.63, 45.5, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 108.17, 123.52, 107.93, 107.92, 117.05, 131.65, 126.93] },
      velocityScore: { '1D': 0.9, '1W': -1.4, '1M': 1.2, '6M': null }, isNew: false,
      marketCap: '$638B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 6.33, PSI: 4.89, XSD: 2.75, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 4.31, proScore: 3.23, coverage: 0.75,
      price: 198, weeklyPrices: [195.74, 192.53, 194.97, 200.09, 198.00], weeklyChange: 1.15, dayChange: -1.05, sortRank: 0, periodReturns: { '1M': -11.8, 'YTD': 6.2, '6M': 6.2, '1Y': 29.2 },
      priceHistory: { '1D': [200.09, 194.45, 195.46, 196.21, 196.09, 195.7, 195.85, 195.91, 196.62, 196.77, 196.67, 196.84, 196.89, 197.4, 197.44, 197.21, 197.97, 198.25, 198.6, 198.79, 197.91, 198.1, 198.35, 198], '1W': [195.74, 192.53, 194.97, 200.09, 198], '1M': [224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 198], 'YTD': [186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 222.32, 214.86, 222.82, 208.19, 207.41, 199, 198], '6M': [188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 222.32, 214.86, 222.82, 208.19, 207.41, 199, 198], '1Y': [153.3, 162.88, 171.37, 170.78, 179.27, 179.42, 181.59, 175.64, 181.77, 170.62, 177.33, 170.29, 176.97, 187.24, 189.11, 179.83, 180.28, 207.04, 195.21, 193.8, 181.36, 177.82, 179.59, 183.78, 170.94, 188.61, 188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 222.32, 214.86, 222.82, 208.19, 207.41, 199, 198] },
      velocityScore: { '1D': -2.1, '1W': -6.6, '1M': 0.6, '6M': null }, isNew: false,
      marketCap: '$4.8T', pe: 30.4, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.5,
      etfPresence: { SOXX: 6.81, PSI: 4.02, XSD: 2.1, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.22, proScore: 2.42, coverage: 0.75,
      price: 390.67, weeklyPrices: [417.93, 386.91, 391.78, 397.17, 390.67], weeklyChange: -6.52, dayChange: -1.64, sortRank: 0, periodReturns: { '1M': -3, 'YTD': 44.1, '6M': 44.1, '1Y': 62.3 },
      priceHistory: { '1D': [397.17, 396.38, 396.01, 396.5, 395.13, 393.73, 393.07, 392.59, 393.61, 394.34, 394.17, 394.39, 395.76, 396.08, 394.78, 393.15, 392.79, 393.08, 392.57, 392.15, 391.63, 393.11, 392.17, 390.67], '1W': [417.93, 386.91, 391.78, 397.17, 390.67], '1M': [402.69, 423.2, 437.67, 428.76, 401.39, 403.89, 404.62, 392.67, 412.13, 417.79, 416, 414.45, 434.46, 445.48, 407.26, 413.16, 417.93, 386.91, 391.78, 397.17, 390.67], 'YTD': [271.2, 299.16, 302.1, 305.6, 310.88, 320.45, 337.1, 355.15, 352.41, 319.71, 310.92, 312.19, 303.1, 327.36, 350.01, 381.05, 392.59, 397.02, 422.73, 418.58, 419.94, 423.2, 404.62, 416, 413.16, 390.67], '6M': [273.74, 300.93, 300.25, 304.01, 316.86, 322.97, 337.51, 355.15, 352.41, 319.71, 310.92, 312.19, 303.1, 327.41, 348.6, 375.27, 383.26, 404.77, 419.65, 418.58, 419.94, 423.2, 404.62, 416, 413.16, 390.67], '1Y': [240.64, 242.72, 240.61, 228.08, 231.11, 220.69, 237.63, 230.44, 255.63, 244.55, 247.21, 246.32, 248.61, 239.28, 237.93, 238.15, 240.36, 235.04, 236, 241.44, 230.13, 252.02, 278.24, 281.57, 271.04, 277.56, 273.74, 300.93, 300.25, 304.01, 316.86, 322.97, 337.1, 355.15, 352.41, 319.71, 310.92, 312.19, 303.1, 327.41, 348.6, 375.27, 383.26, 404.77, 419.65, 418.58, 419.94, 423.2, 404.62, 416, 413.16, 390.67] },
      velocityScore: { '1D': -3.2, '1W': -9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$190B', pe: 58.2, revenueGrowth: 37, eps: 6.71, grossMargin: 64, dividendYield: 1.11,
      etfPresence: { SOXX: 3.45, PSI: 4.09, XSD: 2.12, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.2% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 6.32, proScore: 3.16, coverage: 0.5,
      price: 640.52, weeklyPrices: [668.00, 626.84, 694.64, 723.00, 640.52], weeklyChange: -4.11, dayChange: -11.41, sortRank: 0, periodReturns: { '1M': 39.8, 'YTD': 149.2, '6M': 149.2, '1Y': 248.6 },
      priceHistory: { '1D': [723, 673.26, 687.86, 681.3, 678.53, 678.17, 667.46, 661.33, 664.09, 666.91, 662.71, 659.08, 660.88, 659.6, 655.04, 649.78, 648.81, 645, 642.52, 643.02, 641.21, 640.4, 641.26, 640.52], '1W': [668, 626.84, 694.64, 723, 640.52], '1M': [458.17, 490.05, 500.77, 501.7, 453.01, 492.17, 499.21, 497.01, 552.64, 567.25, 568.23, 592.92, 617.11, 640.18, 585.88, 588.97, 668, 626.84, 694.64, 723, 640.52], 'YTD': [256.99, 281.64, 319.08, 322.38, 322.32, 322.51, 354.91, 373.55, 372.18, 338.94, 346.18, 361.79, 323.12, 352.62, 395.73, 391.62, 404.86, 391.38, 443.62, 413.57, 454.89, 490.05, 499.21, 568.23, 588.97, 640.52], '6M': [268.87, 301.18, 327.01, 319.46, 328.4, 330.57, 359.13, 373.55, 372.18, 338.94, 346.18, 361.79, 323.12, 354.31, 395.64, 394.33, 381.11, 410.82, 431.2, 413.57, 454.89, 490.05, 499.21, 568.23, 588.97, 640.52], '1Y': [183.76, 195.39, 194.81, 187.01, 189.39, 178.14, 190.03, 162.22, 164.51, 156.25, 163.42, 178.13, 201.44, 217.74, 217.51, 227.58, 220.56, 235.75, 240.89, 230.73, 225.12, 242.46, 268.63, 275.15, 248.27, 260.78, 268.87, 301.18, 327.01, 319.46, 328.4, 330.57, 354.91, 373.55, 372.18, 338.94, 346.18, 361.79, 323.12, 354.31, 395.64, 394.33, 381.11, 410.82, 431.2, 413.57, 454.89, 490.05, 499.21, 568.23, 588.97, 640.52] },
      velocityScore: { '1D': -0.9, '1W': 14.1, '1M': 7.1, '6M': null }, isNew: false,
      marketCap: '$509B', pe: 60.3, revenueGrowth: 11, eps: 10.63, grossMargin: 49, dividendYield: 0.29,
      etfPresence: { SOXX: 5.77, PSI: 6.87, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 6.06, proScore: 3.03, coverage: 0.5,
      price: 260.43, weeklyPrices: [258.80, 248.64, 278.39, 301.71, 260.43], weeklyChange: 0.63, dayChange: -13.68, sortRank: 0, periodReturns: { '1M': 34.2, 'YTD': 114.3, '6M': 114.3, '1Y': 189.7 },
      priceHistory: { '1D': [301.71, 278.9, 285.31, 279.98, 278.37, 276.67, 273.72, 272.89, 272.99, 274.11, 270.81, 271.06, 271.39, 270.95, 270.09, 269.42, 269.47, 269.48, 266.4, 264.97, 264.16, 263.04, 261.39, 260.43], '1W': [258.8, 248.64, 278.39, 301.71, 260.43], '1M': [194, 204.52, 212.51, 213.11, 192.92, 210.81, 213.94, 213.56, 241.16, 254.54, 237.33, 238.73, 259.56, 269.16, 244.49, 240.48, 258.8, 248.64, 278.39, 301.71, 260.43], 'YTD': [121.51, 132.46, 154.5, 151.28, 142.79, 144.29, 146.41, 148.77, 153.49, 142.91, 143.82, 151.14, 138.26, 154.01, 176.88, 180.53, 190, 171.33, 184.52, 175.65, 201.14, 204.52, 213.94, 237.33, 240.48, 260.43], '6M': [127.45, 140, 156.78, 154.3, 141.04, 144.02, 147.02, 148.77, 153.49, 142.91, 143.82, 151.14, 138.26, 154.88, 179.59, 178.54, 180.9, 173.29, 181.13, 175.65, 201.14, 204.52, 213.94, 237.33, 240.48, 260.43], '1Y': [89.89, 92.32, 93.35, 89.71, 92.5, 88.83, 94.95, 87.61, 88.81, 84.39, 93.26, 98.99, 106.87, 112.89, 106.26, 108.7, 111.43, 123.53, 122.71, 119.9, 112.31, 114.59, 121.18, 123.89, 117.2, 127.7, 127.45, 140, 156.78, 154.3, 141.04, 144.02, 146.41, 148.77, 153.49, 142.91, 143.82, 151.14, 138.26, 154.88, 179.59, 178.54, 180.9, 173.29, 181.13, 175.65, 201.14, 204.52, 213.94, 237.33, 240.48, 260.43] },
      velocityScore: { '1D': 3.4, '1W': 13.9, '1M': 17.9, '6M': null }, isNew: false,
      marketCap: '$340B', pe: 73.8, revenueGrowth: 12, eps: 3.53, grossMargin: 61, dividendYield: 0.3,
      etfPresence: { SOXX: 5.64, PSI: 6.48, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 5.35, proScore: 2.67, coverage: 0.5,
      price: 382, weeklyPrices: [401.82, 379.09, 410.91, 433.33, 382.00], weeklyChange: -4.93, dayChange: -11.85, sortRank: 0, periodReturns: { '1M': 20.5, 'YTD': 123.2, '6M': 123.2, '1Y': 294.6 },
      priceHistory: { '1D': [433.33, 401.62, 408, 405.61, 404.5, 400.68, 396.01, 392.97, 397.2, 399.36, 395.88, 393.73, 394.57, 394.3, 390.92, 387.87, 386.3, 386.89, 384.8, 384.32, 382.98, 383.18, 382.47, 382], '1W': [401.82, 379.09, 410.91, 433.33, 382], '1M': [317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81, 369.34, 374.18, 389.04, 409.54, 371.33, 374.8, 401.82, 379.09, 410.91, 433.33, 382], 'YTD': [171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 242.27, 231, 211.15, 219.4, 233.31, 199.93, 220.65, 267.32, 263.16, 259.47, 258.57, 296.05, 277.96, 322.68, 334.41, 327.16, 369.34, 374.8, 382], '6M': [185.06, 218.36, 222.96, 222.87, 237.5, 229.28, 235.58, 242.27, 231, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 277.96, 322.68, 334.41, 327.16, 369.34, 374.8, 382], '1Y': [96.81, 99.81, 100.37, 97.1, 99.09, 95.94, 106.74, 100.33, 103.63, 97.74, 107.36, 121.9, 128.32, 142.79, 142.54, 144.78, 141.25, 160.67, 165.05, 161.42, 143.24, 151.93, 159.75, 168.26, 154.98, 177.33, 185.06, 218.36, 222.96, 222.87, 237.5, 229.28, 235.53, 242.27, 231, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 277.96, 322.68, 334.41, 327.16, 369.34, 374.8, 382] },
      velocityScore: { '1D': 0.4, '1W': 7.7, '1M': -0.7, '6M': null }, isNew: false,
      marketCap: '$478B', pe: 72.2, revenueGrowth: 24, eps: 5.29, grossMargin: 50, dividendYield: 0.24,
      etfPresence: { SOXX: 4.89, PSI: 5.81, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 4.11, proScore: 2.05, coverage: 0.5,
      price: 369.25, weeklyPrices: [378.91, 365.02, 372.45, 377.75, 369.25], weeklyChange: -2.55, dayChange: -2.25, sortRank: 0, periodReturns: { '1M': -19.7, 'YTD': 6.7, '6M': 6.7, '1Y': 39.5 },
      priceHistory: { '1D': [377.75, 369.68, 371.79, 372.72, 371.61, 371.16, 370.1, 370.52, 371.58, 372.39, 370.37, 369.54, 369.54, 368.95, 368.84, 368.5, 370.08, 369.7, 369.81, 370.38, 369.52, 370.3, 369.98, 369.25], '1W': [378.91, 365.02, 372.45, 377.75, 369.25], '1M': [459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.25], 'YTD': [346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 420.71, 422.01, 481.57, 392.16, 376.71, 382.07, 369.25], '6M': [347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 420.71, 422.01, 481.57, 392.16, 376.71, 382.07, 369.25], '1Y': [264.74, 277.9, 280.81, 283.69, 302.62, 301.67, 309.09, 294.91, 298.01, 302.39, 369.57, 346.17, 339.31, 333.39, 345.5, 351.33, 340.3, 385.98, 358.98, 355.22, 340.5, 385.03, 380.61, 412.97, 326.02, 350.22, 347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 420.71, 422.01, 481.57, 392.16, 376.71, 382.07, 369.25] },
      velocityScore: { '1D': -3.3, '1W': -6, '1M': -46.6, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 61.4, revenueGrowth: 48, eps: 6.01, grossMargin: 76, dividendYield: 0.69,
      etfPresence: { SOXX: 6.08, PSI: false, XSD: 2.13, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 3.68, proScore: 1.84, coverage: 0.5,
      price: 273.51, weeklyPrices: [281.26, 266.77, 277.75, 297.89, 273.51], weeklyChange: -2.76, dayChange: -8.18, sortRank: 0, periodReturns: { '1M': 24.6, 'YTD': 221.9, '6M': 221.9, '1Y': 258.7 },
      priceHistory: { '1D': [297.89, 284.07, 288.37, 287.84, 283.62, 282.8, 280.77, 278.73, 277.97, 277.33, 275.07, 277.1, 279.13, 279.55, 278.43, 275.46, 275.67, 275.83, 275.05, 274.8, 275.38, 274.9, 274.02, 273.51], '1W': [281.26, 266.77, 277.75, 297.89, 273.51], '1M': [219.43, 290.79, 301.65, 316.43, 263.47, 288.85, 266.88, 252.59, 280.71, 279.7, 278.67, 289.54, 310.58, 307.86, 279.04, 276.7, 281.26, 266.77, 277.75, 297.89, 273.51], 'YTD': [84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 109.51, 131.3, 147.84, 158.21, 163.66, 170.84, 168.93, 208.26, 290.79, 266.88, 278.67, 276.7, 273.51], '6M': [89.39, 83.22, 80.46, 81.77, 78.66, 82.35, 79.01, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 168.93, 208.26, 290.79, 266.88, 278.67, 276.7, 273.51], '1Y': [76.24, 72.26, 70.85, 73.27, 81.74, 75.32, 79.32, 72.07, 74.26, 62.31, 67.1, 70.98, 80.09, 83.89, 92.5, 88.89, 81.05, 90.15, 92.9, 89.33, 78.68, 83.43, 100.2, 92.47, 81.7, 86.49, 89.39, 83.22, 80.46, 81.77, 78.66, 82.35, 78.61, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 168.93, 208.26, 290.79, 266.88, 278.67, 276.7, 273.51] },
      velocityScore: { '1D': -2.1, '1W': -3.2, '1M': -45.6, '6M': null }, isNew: false,
      marketCap: '$239B', pe: 93.7, revenueGrowth: 28, eps: 2.92, grossMargin: 52, dividendYield: 0.08,
      etfPresence: { SOXX: 4.88, PSI: false, XSD: 2.49, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 3.05, proScore: 1.52, coverage: 0.5,
      price: 436.52, weeklyPrices: [398.00, 391.74, 455.96, 483.02, 436.52], weeklyChange: 9.68, dayChange: -9.63, sortRank: 0, periodReturns: { '1M': 36.4, 'YTD': 162.4, '6M': 162.4, '1Y': 392.4 },
      priceHistory: { '1D': [483.02, 454.62, 463.01, 461.21, 458.02, 455.17, 450.01, 448.93, 456.29, 456.64, 443.98, 446.6, 449.51, 449.32, 446.8, 445.32, 445.53, 443.67, 441.83, 440.96, 441.45, 440.08, 438.48, 436.52], '1W': [398, 391.74, 455.96, 483.02, 436.52], '1M': [320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 436.52], 'YTD': [166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 215.58, 318.72, 355.76, 341.7, 361.71, 399.92, 436.52], '6M': [179.56, 162.61, 182, 163.25, 152.44, 187.67, 123.69, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 215.58, 318.72, 355.76, 341.7, 361.71, 399.92, 436.52], '1Y': [88.66, 99.86, 91.94, 119.48, 128.87, 174.39, 193.64, 171.06, 178.56, 176.61, 230.37, 249.38, 205.27, 194.5, 219.36, 161.46, 154.85, 173.62, 181.94, 157.79, 139.52, 144.78, 152.5, 164.32, 140.24, 169.97, 179.56, 162.61, 182, 163.25, 152.44, 187.67, 129.32, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 215.58, 318.72, 355.76, 341.7, 361.71, 399.92, 436.52] },
      velocityScore: { '1D': 0.7, '1W': 16, '1M': -33.6, '6M': null }, isNew: false,
      marketCap: '$75B', pe: 291, revenueGrowth: 93, eps: 1.5, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 3.02, PSI: false, XSD: 3.08, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 2.86, proScore: 1.43, coverage: 0.5,
      price: 298.54, weeklyPrices: [311.81, 285.43, 285.48, 298.07, 298.54], weeklyChange: -4.26, dayChange: 0.16, sortRank: 0, periodReturns: { '1M': 1.8, 'YTD': 72.1, '6M': 72.1, '1Y': 41.9 },
      priceHistory: { '1D': [298.07, 296.64, 299.88, 299.83, 298.38, 298.79, 298.11, 298.21, 298.36, 299.09, 298.65, 298.78, 299.7, 300.23, 298.47, 298.59, 299.02, 299.31, 299.48, 299.5, 299.36, 299.32, 299.27, 298.54], '1W': [311.81, 285.43, 285.48, 298.07, 298.54], '1M': [293.2, 308.12, 308.59, 305.37, 285.06, 290.9, 288.63, 282.01, 297.1, 301.12, 305.71, 301.88, 322.86, 332.28, 304.36, 303.11, 311.81, 285.43, 285.48, 298.07, 298.54], 'YTD': [173.49, 188.45, 189.12, 193.31, 215.55, 221.44, 226.16, 219.86, 209.82, 196.2, 194.13, 188.63, 186.42, 199.42, 216.71, 233.7, 269.5, 280.89, 297.76, 300.6, 324.89, 308.12, 288.63, 305.71, 303.11, 298.54], '6M': [177.52, 190.31, 191.58, 196.59, 225.01, 218.77, 225.69, 219.86, 209.82, 196.2, 194.13, 188.63, 186.42, 199.74, 218.87, 233.15, 265, 281, 295.17, 300.6, 324.89, 308.12, 288.63, 305.71, 303.11, 298.54], '1Y': [210.45, 216.39, 216.64, 186.25, 189.52, 185.91, 193.29, 195.94, 205.98, 195.74, 184.01, 180.3, 184.44, 180.39, 181.6, 175.27, 170.71, 160.26, 163.57, 163.09, 157.32, 161.77, 182.6, 181.67, 174.49, 177.13, 177.52, 190.31, 191.58, 196.59, 225.01, 218.77, 226.16, 219.86, 209.82, 196.2, 194.13, 188.63, 186.42, 199.74, 218.87, 233.15, 265, 281, 295.17, 300.6, 324.89, 308.12, 288.63, 305.71, 303.11, 298.54] },
      velocityScore: { '1D': 0, '1W': -7.1, '1M': -52.8, '6M': null }, isNew: false,
      marketCap: '$272B', pe: 51.1, revenueGrowth: 19, eps: 5.84, grossMargin: 57, dividendYield: 1.91,
      etfPresence: { SOXX: 3.5, PSI: false, XSD: 2.22, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.6, proScore: 1.3, coverage: 0.5,
      price: 279.4, weeklyPrices: [298.64, 277.02, 278.37, 281.03, 279.40], weeklyChange: -6.44, dayChange: -0.58, sortRank: 0, periodReturns: { '1M': -10.3, 'YTD': 28.7, '6M': 28.7, '1Y': 26.3 },
      priceHistory: { '1D': [281.03, 281.26, 280.17, 281.89, 281, 280.23, 280.53, 280.74, 281.48, 282.39, 281.11, 282.08, 282.93, 282.82, 281.84, 280.73, 280.53, 280.72, 280.26, 279.89, 279.85, 280.39, 280.49, 279.4], '1W': [298.64, 277.02, 278.37, 281.03, 279.4], '1M': [311.38, 323.62, 321.88, 322.22, 295.96, 301.14, 297.41, 285.56, 302.55, 304.86, 302.89, 298.2, 313.27, 323.24, 299.94, 294.06, 298.64, 277.02, 278.37, 281.03, 279.4], 'YTD': [217.06, 237.89, 238.6, 232.48, 226.14, 224.32, 244.43, 231.16, 224.76, 205.25, 191.89, 193.39, 187.39, 197.08, 208, 221.34, 236.87, 290.76, 305.99, 291.68, 332.67, 323.62, 297.41, 302.89, 294.06, 279.4], '6M': [221.28, 241.15, 237.11, 231.05, 231.08, 228.91, 245.09, 231.16, 224.76, 205.25, 191.89, 193.39, 187.39, 195.12, 209.89, 224.5, 230.39, 292.35, 294.23, 291.68, 332.67, 323.62, 297.41, 302.89, 294.06, 279.4], '1Y': [221.21, 230.42, 220.58, 224.71, 220.94, 205.92, 230.52, 229.27, 237.82, 228.2, 219.28, 221.89, 227.66, 224.91, 225.64, 217.23, 217.16, 204.71, 210.44, 204.08, 188.59, 191.02, 227.56, 230.78, 223.23, 225.26, 221.28, 241.15, 237.11, 231.05, 231.08, 228.91, 244.43, 231.16, 224.76, 205.25, 191.89, 193.39, 187.39, 195.12, 209.89, 224.5, 230.39, 292.35, 294.23, 291.68, 332.67, 323.62, 297.41, 302.89, 294.06, 279.4] },
      velocityScore: { '1D': -3.7, '1W': -11, '1M': -37.5, '6M': null }, isNew: false,
      marketCap: '$71B', pe: 26.7, revenueGrowth: 12, eps: 10.47, grossMargin: 56, dividendYield: 1.45,
      etfPresence: { SOXX: 3.14, PSI: false, XSD: 2.07, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.45, proScore: 1.23, coverage: 0.5,
      price: 1337.91, weeklyPrices: [1438.30, 1313.32, 1312.77, 1382.36, 1337.91], weeklyChange: -6.98, dayChange: -3.22, sortRank: 0, periodReturns: { '1M': -13.3, 'YTD': 47.6, '6M': 47.6, '1Y': 79.1 },
      priceHistory: { '1D': [1382.36, 1369.56, 1379.74, 1377.24, 1375.69, 1355.97, 1353.54, 1342.31, 1343.97, 1347.43, 1343.32, 1343.63, 1356.2, 1362.02, 1353.57, 1351.4, 1350.32, 1347.18, 1345.26, 1340.77, 1341.76, 1342.68, 1342.22, 1337.91], '1W': [1438.3, 1313.32, 1312.77, 1382.36, 1337.91], '1M': [1542.39, 1624.99, 1689.89, 1652.6, 1481.05, 1559.18, 1531.98, 1473.04, 1589.55, 1577.32, 1498.77, 1448.21, 1563.7, 1537.88, 1423.76, 1434.95, 1438.3, 1313.32, 1312.77, 1382.36, 1337.91], 'YTD': [906.36, 959.09, 1009.54, 1063.74, 1124.15, 1229.82, 1171.47, 1190.06, 1142.58, 1062, 1077.4, 1076.35, 1002.34, 1180.03, 1372.23, 1490.86, 1587.57, 1573.3, 1661.1, 1486.33, 1662.98, 1624.99, 1531.98, 1498.77, 1434.95, 1337.91], '6M': [936.31, 958.97, 1033.17, 1068.14, 1173.22, 1206.18, 1173.18, 1190.06, 1142.58, 1062, 1077.4, 1076.35, 1002.34, 1191.22, 1363.42, 1527.95, 1504.08, 1588.12, 1599.52, 1486.33, 1662.98, 1624.99, 1531.98, 1498.77, 1434.95, 1337.91], '1Y': [746.97, 751.14, 714.03, 720.01, 730.54, 805.85, 861.8, 844.8, 850.64, 827.56, 855.18, 877.66, 908.45, 915.87, 980.9, 1007.93, 1001.4, 1094.08, 1000.15, 958.35, 856.96, 908.61, 958.02, 979.02, 912.25, 953.25, 936.31, 958.97, 1033.17, 1068.14, 1173.22, 1206.18, 1171.47, 1190.06, 1142.58, 1062, 1077.4, 1076.35, 1002.34, 1191.22, 1363.42, 1527.95, 1504.08, 1588.12, 1599.52, 1486.33, 1662.98, 1624.99, 1531.98, 1498.77, 1434.95, 1337.91] },
      velocityScore: { '1D': 0.8, '1W': -6.8, '1M': -37.2, '6M': null }, isNew: false,
      marketCap: '$66B', pe: 95.8, revenueGrowth: 26, eps: 13.96, grossMargin: 55, dividendYield: 0.58,
      etfPresence: { SOXX: 2.93, PSI: false, XSD: 1.97, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 2.34, proScore: 1.17, coverage: 0.5,
      price: 182.18, weeklyPrices: [204.90, 189.39, 188.72, 184.79, 182.18], weeklyChange: -11.09, dayChange: -1.41, sortRank: 0, periodReturns: { '1M': -20.4, 'YTD': 6.5, '6M': 6.5, '1Y': 14.3 },
      priceHistory: { '1D': [184.79, 185.23, 185.11, 186.32, 185.98, 184.85, 184.93, 186.75, 185.35, 185.84, 185.11, 185.25, 186.01, 186.22, 185.13, 184.25, 183.23, 183.9, 183.82, 186.23, 186.03, 185.78, 183.35, 182.18], '1W': [204.9, 189.39, 188.72, 184.79, 182.18], '1M': [228.99, 240.84, 250.01, 242.57, 215.94, 217.77, 205.42, 191.2, 202.96, 211.72, 214.07, 212.97, 226.11, 221.9, 204.13, 197.41, 204.9, 189.39, 188.72, 184.79, 182.18], 'YTD': [171.05, 181.87, 161.39, 155.82, 151.59, 137.34, 140.7, 140.41, 141.03, 138.11, 129.39, 128.35, 127.07, 125.73, 131.24, 137.52, 150.26, 168.38, 237.53, 203.64, 248.82, 240.84, 205.42, 214.07, 197.41, 182.18], '6M': [172.98, 177.78, 159.42, 154.52, 152.62, 138.93, 142.63, 140.41, 141.03, 138.11, 129.39, 128.35, 127.07, 124.07, 132.84, 135.56, 150, 186.55, 210.31, 203.64, 248.82, 240.84, 205.42, 214.07, 197.41, 182.18], '1Y': [159.4, 159.35, 154.07, 159.88, 159.06, 145.84, 156.59, 156.25, 159.17, 157.28, 158.95, 165.26, 173.55, 166.49, 167.77, 162.97, 169.27, 178.67, 179.72, 176.67, 165.06, 163.3, 175.07, 182.21, 172.34, 174.77, 172.98, 177.78, 159.42, 154.52, 152.62, 138.93, 140.7, 140.41, 141.03, 138.11, 129.39, 128.35, 127.07, 124.07, 132.84, 135.56, 150, 186.55, 210.31, 203.64, 248.82, 240.84, 205.42, 214.07, 197.41, 182.18] },
      velocityScore: { '1D': -6.4, '1W': -14, '1M': -53.6, '6M': null }, isNew: false,
      marketCap: '$192B', pe: 19.6, revenueGrowth: -4, eps: 9.29, grossMargin: 55, dividendYield: 1.99,
      etfPresence: { SOXX: 2.65, PSI: false, XSD: 2.04, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.21, proScore: 1.11, coverage: 0.5,
      price: 259.31, weeklyPrices: [268.03, 238.00, 245.68, 271.95, 259.31], weeklyChange: -3.26, dayChange: -4.65, sortRank: 0, periodReturns: { '1M': 14.7, 'YTD': 80.2, '6M': 80.2, '1Y': 196 },
      priceHistory: { '1D': [271.95, 258.55, 265.59, 267.82, 267.7, 266.76, 264.36, 262.52, 265.39, 265.15, 259.74, 261.47, 261.17, 261.8, 261.67, 262.58, 263.2, 262.83, 263.08, 261.91, 262.09, 262.18, 260.77, 259.31], '1W': [268.03, 238, 245.68, 271.95, 259.31], '1M': [226.1, 229, 214.6, 217.5, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81, 239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.31], 'YTD': [143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.05, 114.22, 115.98, 116.88, 105.1, 87.81, 102.46, 134.36, 174.53, 180.5, 180.06, 210.22, 156.27, 221.64, 229, 234.32, 239.18, 268.99, 259.31], '6M': [143.22, 150.42, 150.97, 128.02, 119.96, 123.41, 124.8, 124.05, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 156.27, 221.64, 229, 234.32, 239.18, 268.99, 259.31], '1Y': [87.59, 97.59, 101.19, 98.41, 116.01, 117.34, 121.13, 106.3, 120.1, 124.77, 163.96, 164.44, 149.38, 144.91, 148.87, 131.41, 137.2, 171.52, 173.16, 160.34, 139.56, 154.18, 189.19, 157.98, 134.13, 150.19, 143.22, 150.42, 150.97, 128.02, 119.96, 123.41, 121.44, 124.05, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 156.27, 221.64, 229, 234.32, 239.18, 268.99, 259.31] },
      velocityScore: { '1D': 5.7, '1W': -4.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$48B', pe: 103.7, revenueGrowth: 157, eps: 2.5, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 2.01, PSI: false, XSD: 2.41, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.18, proScore: 1.09, coverage: 0.5,
      price: 89.08, weeklyPrices: [94.12, 87.93, 89.06, 91.20, 89.08], weeklyChange: -5.35, dayChange: -2.32, sortRank: 0, periodReturns: { '1M': -2.7, 'YTD': 39.8, '6M': 39.8, '1Y': 24.3 },
      priceHistory: { '1D': [91.2, 90.27, 90.29, 90.68, 90.45, 90.17, 89.96, 90.1, 90.34, 90.58, 90.42, 90.59, 91.07, 90.8, 90.4, 90.24, 89.9, 89.68, 89.62, 89.4, 89.59, 89.56, 89.52, 89.08], '1W': [94.12, 87.93, 89.06, 91.2, 89.08], '1M': [91.52, 96.96, 96.55, 96.3, 88.34, 91.37, 91.47, 87.91, 92.94, 95.24, 95.63, 94.11, 99.77, 102.71, 93.26, 92.48, 94.12, 87.93, 89.06, 91.2, 89.08], 'YTD': [63.72, 73.53, 74.45, 74.71, 75.92, 76.01, 78.56, 76.6, 74.31, 65, 63.83, 64.34, 60.06, 67.22, 73.55, 80.39, 86.84, 95.3, 99.03, 92.76, 98.05, 96.96, 91.47, 95.63, 92.48, 89.08], '6M': [65.03, 75.22, 74.7, 74.79, 78.08, 74.41, 78.94, 76.6, 74.31, 65, 63.83, 64.34, 60.06, 67.51, 74.5, 80.93, 84.26, 98.48, 97.7, 92.76, 98.05, 96.96, 91.47, 95.63, 92.48, 89.08], '1Y': [71.68, 74.68, 74.43, 70.25, 70.29, 66.17, 65.75, 64.71, 67.62, 63.28, 64.74, 65.78, 65.85, 64.11, 66.92, 65.21, 64.5, 62.54, 60.8, 55.63, 50.87, 51.83, 63.61, 67.9, 63.99, 65.36, 65.03, 75.22, 74.7, 74.79, 78.08, 74.41, 78.56, 76.6, 74.31, 65, 63.83, 64.34, 60.06, 67.51, 74.5, 80.93, 84.26, 98.48, 97.7, 92.76, 98.05, 96.96, 91.47, 95.63, 92.48, 89.08] },
      velocityScore: { '1D': -1.8, '1W': -6.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$48B', pe: 404.9, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 2,
      etfPresence: { SOXX: 2.17, PSI: false, XSD: 2.19, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 1.73, proScore: 0.86, coverage: 0.5,
      price: 95.18, weeklyPrices: [118.74, 90.65, 88.57, 94.54, 95.18], weeklyChange: -19.84, dayChange: 0.68, sortRank: 0, periodReturns: { '1M': -21.3, 'YTD': 75.8, '6M': 75.8, '1Y': 77.6 },
      priceHistory: { '1D': [94.54, 94.5, 94.56, 95.52, 95.29, 95.5, 94.94, 95.18, 95.6, 95.95, 95.43, 95.86, 96.14, 96.57, 95.89, 95.63, 95.51, 95.4, 95.67, 95.66, 95.87, 95.92, 95.99, 95.18], '1W': [118.74, 90.65, 88.57, 94.54, 95.18], '1M': [120.92, 128.64, 133.93, 131.82, 117.26, 120.9, 117, 110.17, 115.96, 116.79, 118.25, 112.92, 121.62, 131.55, 117.06, 115.74, 118.74, 90.65, 88.57, 94.54, 95.18], 'YTD': [54.15, 60.89, 60.28, 61.98, 59.89, 65.2, 72.21, 69.47, 66.48, 59.23, 59.88, 59.89, 55.66, 63.49, 71.02, 85.56, 98.04, 102.04, 107.24, 109.43, 127, 128.64, 117, 118.25, 115.74, 95.18], '6M': [56.7, 62.16, 60.33, 61.13, 61.53, 65.1, 71.96, 69.47, 66.48, 59.23, 59.88, 59.89, 55.66, 63.79, 72.05, 86.91, 93.3, 102.67, 104.11, 109.43, 127, 128.64, 117, 118.25, 115.74, 95.18], '1Y': [53.6, 57.77, 59.52, 59.61, 58.05, 46.98, 51.89, 49.77, 50.99, 47.79, 48.13, 49.8, 50.94, 48.35, 50.88, 50.36, 51.93, 51.4, 50.08, 49.27, 45.56, 48.31, 57.15, 55.1, 53.33, 55.08, 56.7, 62.16, 60.33, 61.13, 61.53, 65.1, 72.21, 69.47, 66.48, 59.23, 59.88, 59.89, 55.66, 63.79, 72.05, 86.91, 93.3, 102.67, 104.11, 109.43, 127, 128.64, 117, 118.25, 115.74, 95.18] },
      velocityScore: { '1D': 1.2, '1W': -23.2, '1M': -55.2, '6M': null }, isNew: false,
      marketCap: '$37B', pe: 70, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 1.65, PSI: false, XSD: 1.8, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 2, avgWeight: 1.71, proScore: 0.86, coverage: 0.5,
      price: 349.12, weeklyPrices: [390.19, 369.18, 372.59, 380.37, 349.12], weeklyChange: -10.52, dayChange: -8.21, sortRank: 0, periodReturns: { '1M': -1.3, 'YTD': 103.8, '6M': 103.8, '1Y': 154.1 },
      priceHistory: { '1D': [380.37, 362.83, 363.7, 360.78, 357.02, 355.32, 353.03, 352.58, 354.02, 355.38, 351.15, 352.55, 353.18, 353.54, 351.73, 351.34, 351.21, 351.83, 350.95, 348.81, 349.16, 349.48, 349.8, 349.12], '1W': [390.19, 369.18, 372.59, 380.37, 349.12], '1M': [353.79, 382.35, 390.34, 382.74, 345.4, 361.86, 358.72, 354.4, 374.76, 379.87, 368.32, 367.11, 391.41, 396.26, 372.15, 373.08, 390.19, 369.18, 372.59, 380.37, 349.12], 'YTD': [171.28, 167.66, 218.93, 219.26, 219.06, 235.87, 244.16, 245.53, 258.54, 218.73, 224.92, 229.26, 209.49, 233.04, 263.63, 281.08, 279.44, 291.72, 365.88, 356.25, 409.68, 382.35, 358.72, 368.32, 373.08, 349.12], '6M': [174.96, 174.87, 220.68, 218.89, 228.56, 235.7, 245.59, 245.53, 258.54, 218.73, 224.92, 229.26, 209.49, 236.99, 263.92, 285.71, 265.61, 303.57, 362.76, 356.25, 409.68, 382.35, 358.72, 368.32, 373.08, 349.12], '1Y': [137.38, 139.85, 137.76, 137.19, 140.02, 139.03, 125.99, 121, 128.33, 130.17, 131.7, 131.87, 126.66, 126.56, 133.19, 136.83, 135.91, 152.66, 149.68, 170.89, 158.22, 165.88, 183.46, 186.23, 168.31, 175.81, 174.96, 174.87, 220.68, 218.89, 228.56, 235.7, 244.16, 245.53, 258.54, 218.73, 224.92, 229.26, 209.49, 236.99, 263.92, 285.71, 265.61, 303.57, 362.76, 356.25, 409.68, 382.35, 358.72, 368.32, 373.08, 349.12] },
      velocityScore: { '1D': -2.3, '1W': -1.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 147.9, revenueGrowth: 23, eps: 2.36, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: 1.17, PSI: false, XSD: 2.25, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RMBS', name: 'RAMBUS INC', easyScore: 2, avgWeight: 1.33, proScore: 0.66, coverage: 0.5,
      price: 124.85, weeklyPrices: [123.69, 114.73, 123.90, 132.74, 124.85], weeklyChange: 0.94, dayChange: -5.94, sortRank: 0, periodReturns: { '1M': -15.3, 'YTD': 35.9, '6M': 35.9, '1Y': 94.7 },
      priceHistory: { '1D': [132.74, 126.16, 129.71, 131.55, 131.65, 129.89, 129.39, 128.82, 129.31, 128.7, 127.82, 128.09, 128.88, 129.01, 128.68, 128.43, 127.11, 126.25, 125.51, 125.23, 125.07, 125.83, 125.07, 124.85], '1W': [123.69, 114.73, 123.9, 132.74, 124.85], '1M': [147.48, 166.78, 170.66, 169.35, 145.31, 152.03, 146.84, 138.12, 144.47, 146.56, 132.48, 130.1, 141.17, 140.35, 128.21, 124.52, 123.69, 114.73, 123.9, 132.74, 124.85], 'YTD': [91.89, 91.34, 103.07, 115.31, 113.83, 107.1, 101.95, 95.27, 98.88, 88.52, 92.78, 93.35, 79.73, 92.22, 113.16, 126.87, 141.31, 111.5, 134.51, 123.76, 157.23, 166.78, 146.84, 132.48, 124.52, 124.85], '6M': [99.28, 93.38, 107.99, 114.19, 113.71, 110.92, 101.95, 95.27, 98.88, 88.52, 92.78, 93.35, 79.73, 91.87, 121.73, 130.45, 111.27, 118, 130.28, 123.76, 157.23, 166.78, 146.84, 132.48, 124.52, 124.85], '1Y': [64.14, 64.79, 66.79, 65.95, 75.09, 71.56, 76.79, 69.78, 75.03, 73.67, 77.11, 97.52, 100.73, 103.14, 99.43, 97.22, 94.45, 111.36, 108.61, 102.21, 87.7, 92.45, 98.03, 106.84, 90.61, 94.48, 99.28, 93.38, 107.99, 114.19, 113.71, 110.92, 101.95, 95.27, 98.88, 88.52, 92.78, 93.35, 79.73, 91.87, 121.73, 130.45, 111.27, 118, 130.28, 123.76, 157.23, 166.78, 146.84, 132.48, 124.52, 124.85] },
      velocityScore: { '1D': 1.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$14B', pe: 59.5, revenueGrowth: 8, eps: 2.1, grossMargin: 80, dividendYield: null,
      etfPresence: { SOXX: 0.64, PSI: false, XSD: 2.02, DRAM: false },
      tonyNote: 'RAMBUS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 5.99, proScore: 3.17, coverage: 0.529,
      price: 1039.5, weeklyPrices: [1213.56, 1132.33, 1145.28, 1154.29, 1039.50], weeklyChange: -14.34, dayChange: -9.94, sortRank: 0, periodReturns: { '1M': 0.4, 'YTD': 264.2, '6M': 264.2, '1Y': 759.9 },
      priceHistory: { '1D': [1154.29, 1081.66, 1081.17, 1082.54, 1077.65, 1066.35, 1057.3, 1054.44, 1056.89, 1059.39, 1050.4, 1048.2, 1055.02, 1053.52, 1053.23, 1048.76, 1053.26, 1050.31, 1043.49, 1041.9, 1043.35, 1043.77, 1044.26, 1039.5], '1W': [1213.56, 1132.33, 1145.28, 1154.29, 1039.5], '1M': [1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1039.5], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1039.5], '6M': [315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1039.5], '1Y': [120.89, 122.24, 116.43, 109.83, 114.74, 108.78, 124.27, 122.05, 116.5, 118.72, 140, 159.99, 161.71, 182.15, 196.54, 191.94, 198.47, 226.63, 237.5, 244.9, 228.5, 224.53, 234.16, 263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1039.5] },
      velocityScore: { '1D': 1.9, '1W': 0, '1M': 18.7, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 23.5, revenueGrowth: 346, eps: 44.21, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { PTF: 5.37, WCLD: false, IGV: false, FDTX: 9.36, GTEK: false, ARKK: false, MARS: false, FRWD: 5.36, BCTK: 5.01, FWD: 1.35, CBSE: false, FCUS: 4.93, WGMI: false, CNEQ: 1.69, SGRT: 8.65, SPMO: 12.19, XMMO: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 9, avgWeight: 5.84, proScore: 3.09, coverage: 0.529,
      price: 198, weeklyPrices: [195.74, 192.53, 194.97, 200.09, 198.00], weeklyChange: 1.15, dayChange: -1.05, sortRank: 0, periodReturns: { '1M': -11.8, 'YTD': 6.2, '6M': 6.2, '1Y': 29.2 },
      priceHistory: { '1D': [200.09, 194.45, 195.46, 196.21, 196.09, 195.7, 195.85, 195.91, 196.62, 196.77, 196.67, 196.84, 196.89, 197.4, 197.44, 197.21, 197.97, 198.25, 198.6, 198.79, 197.91, 198.1, 198.35, 198], '1W': [195.74, 192.53, 194.97, 200.09, 198], '1M': [224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 198], 'YTD': [186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 222.32, 214.86, 222.82, 208.19, 207.41, 199, 198], '6M': [188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 222.32, 214.86, 222.82, 208.19, 207.41, 199, 198], '1Y': [153.3, 162.88, 171.37, 170.78, 179.27, 179.42, 181.59, 175.64, 181.77, 170.62, 177.33, 170.29, 176.97, 187.24, 189.11, 179.83, 180.28, 207.04, 195.21, 193.8, 181.36, 177.82, 179.59, 183.78, 170.94, 188.61, 188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 222.32, 214.86, 222.82, 208.19, 207.41, 199, 198] },
      velocityScore: { '1D': -0.3, '1W': -6.6, '1M': -30.4, '6M': null }, isNew: false,
      marketCap: '$4.8T', pe: 30.4, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.5,
      etfPresence: { PTF: 4.07, WCLD: false, IGV: false, FDTX: 4.62, GTEK: false, ARKK: 1.57, MARS: false, FRWD: 8.17, BCTK: 5.79, FWD: false, CBSE: false, FCUS: false, WGMI: 1.84, CNEQ: 13.05, SGRT: 5.98, SPMO: 7.51, XMMO: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 8, avgWeight: 3.76, proScore: 1.77, coverage: 0.471,
      price: 544.32, weeklyPrices: [532.57, 521.58, 539.49, 580.91, 544.32], weeklyChange: 2.21, dayChange: -6.3, sortRank: 0, periodReturns: { '1M': 6.7, 'YTD': 154.2, '6M': 154.2, '1Y': 299.9 },
      priceHistory: { '1D': [580.91, 553.76, 559.64, 555.94, 555.12, 553.03, 553.36, 550.83, 552.57, 554.73, 549.8, 550.2, 551.21, 553.43, 552.27, 551.27, 552.67, 552.59, 550.35, 549.64, 549.02, 548.1, 546.28, 544.32], '1W': [532.57, 521.58, 539.49, 580.91, 544.32], '1M': [510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 544.32], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 420.99, 503.89, 521.54, 475.51, 507.29, 519.74, 544.32], '6M': [223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 420.99, 503.89, 521.54, 475.51, 507.29, 519.74, 544.32], '1Y': [136.11, 138.41, 160.08, 158.65, 179.51, 163.12, 184.42, 166.55, 166.62, 162.13, 159.54, 159.16, 160.88, 164.01, 235.56, 238.6, 230.23, 264.33, 256.33, 258.89, 230.29, 206.13, 217.6, 221.42, 198.11, 215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 420.99, 503.89, 521.54, 475.51, 507.29, 519.74, 544.32] },
      velocityScore: { '1D': 2.3, '1W': 6, '1M': -9.2, '6M': null }, isNew: false,
      marketCap: '$888B', pe: 180.2, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.99, MARS: false, FRWD: 7.37, BCTK: 3.35, FWD: 2.17, CBSE: false, FCUS: 3.47, WGMI: false, CNEQ: 1.07, SGRT: 3.6, SPMO: 4.08, XMMO: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 7, avgWeight: 5.01, proScore: 2.06, coverage: 0.412,
      price: 592.88, weeklyPrices: [675.39, 586.45, 651.88, 638.72, 592.88], weeklyChange: -12.22, dayChange: -7.18, sortRank: 0, periodReturns: { '1M': 8.5, 'YTD': 244.2, '6M': 244.2, '1Y': 828.7 },
      priceHistory: { '1D': [638.72, 607, 609.53, 603.11, 602.69, 594.07, 592.44, 590.07, 595.06, 601.85, 601.28, 604.08, 602.5, 600.43, 597.76, 597.41, 597.58, 596.91, 595.39, 596.21, 596.63, 597.43, 592.94, 592.88], '1W': [675.39, 586.45, 651.88, 638.72, 592.88], '1M': [546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 592.88], 'YTD': [172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 458.68, 524.65, 563.1, 517.72, 681.08, 643.83, 592.88], '6M': [187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 458.68, 524.65, 563.1, 517.72, 681.08, 643.83, 592.88], '1Y': [63.84, 64.64, 66.53, 69.32, 71.43, 73.78, 76.07, 75.86, 79.71, 86, 95.02, 100.94, 109.69, 130.59, 121.18, 120.44, 120.47, 141.38, 160.1, 166.11, 152.86, 155.41, 155.59, 181.95, 166.26, 179.56, 187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 458.68, 524.65, 563.1, 517.72, 681.08, 643.83, 592.88] },
      velocityScore: { '1D': 0.5, '1W': -11.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$204B', pe: 35.4, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.09,
      etfPresence: { PTF: 5.25, WCLD: false, IGV: false, FDTX: 4, GTEK: false, ARKK: false, MARS: false, FRWD: 4.88, BCTK: false, FWD: false, CBSE: false, FCUS: 4.61, WGMI: false, CNEQ: 5.2, SGRT: 9.25, SPMO: 1.9, XMMO: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 7, avgWeight: 3.61, proScore: 1.49, coverage: 0.412,
      price: 369.25, weeklyPrices: [378.91, 365.02, 372.45, 377.75, 369.25], weeklyChange: -2.55, dayChange: -2.25, sortRank: 0, periodReturns: { '1M': -19.7, 'YTD': 6.7, '6M': 6.7, '1Y': 39.5 },
      priceHistory: { '1D': [377.75, 369.68, 371.79, 372.72, 371.61, 371.16, 370.1, 370.52, 371.58, 372.39, 370.37, 369.54, 369.54, 368.95, 368.84, 368.5, 370.08, 369.7, 369.81, 370.38, 369.52, 370.3, 369.98, 369.25], '1W': [378.91, 365.02, 372.45, 377.75, 369.25], '1M': [459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.25], 'YTD': [346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 420.71, 422.01, 481.57, 392.16, 376.71, 382.07, 369.25], '6M': [347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 420.71, 422.01, 481.57, 392.16, 376.71, 382.07, 369.25], '1Y': [264.74, 277.9, 280.81, 283.69, 302.62, 301.67, 309.09, 294.91, 298.01, 302.39, 369.57, 346.17, 339.31, 333.39, 345.5, 351.33, 340.3, 385.98, 358.98, 355.22, 340.5, 385.03, 380.61, 412.97, 326.02, 350.22, 347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 420.71, 422.01, 481.57, 392.16, 376.71, 382.07, 369.25] },
      velocityScore: { '1D': 0, '1W': 2.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 61.4, revenueGrowth: 48, eps: 6.01, grossMargin: 76, dividendYield: 0.69,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.79, GTEK: false, ARKK: 1.07, MARS: false, FRWD: 4.75, BCTK: 6.67, FWD: 1.83, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.16, SGRT: false, SPMO: 6.03, XMMO: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'SPCX', name: 'SPACE EXPLORATION TECHN-CL A', easyScore: 6, avgWeight: 7.19, proScore: 2.54, coverage: 0.353,
      price: 156.76, weeklyPrices: [153.00, 153.23, 164.19, 170.86, 156.76], weeklyChange: 2.46, dayChange: -8.25, sortRank: 0, periodReturns: { '1M': -2.6, 'YTD': -2.6, '6M': -2.6, '1Y': -2.6 },
      priceHistory: { '1D': [170.86, 163.9, 162.71, 161.23, 163.22, 160.58, 160.52, 159.44, 161.33, 159.82, 158.54, 158.78, 159.24, 160.12, 160.16, 159.98, 161.34, 162.17, 161.26, 162.8, 160.57, 158.79, 158.21, 156.76], '1W': [153, 153.23, 164.19, 170.86, 156.76], '1M': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 156.76], 'YTD': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 156.76], '6M': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 156.76], '1Y': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 156.76] },
      velocityScore: { '1D': 0.8, '1W': 1.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.1T', pe: null, revenueGrowth: 15, eps: -0.67, grossMargin: 49, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.49, MARS: 22.74, FRWD: 2.34, BCTK: 8.29, FWD: 1.71, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.56, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'SPACE EXPLORATION TECHN-CL A appears in 6 of 17 Broad Tech ETFs (35% coverage) with average weight 7.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 6, avgWeight: 4.73, proScore: 1.67, coverage: 0.353,
      price: 443.92, weeklyPrices: [434.99, 432.35, 455.10, 477.57, 443.92], weeklyChange: 2.05, dayChange: -7.05, sortRank: 0, periodReturns: { '1M': 1.9, 'YTD': 46.1, '6M': 46.1, '1Y': 97.6 },
      priceHistory: { '1D': [477.57, 458.65, 462.66, 459.3, 458.2, 455.01, 450.88, 448.69, 450.61, 449.86, 446.98, 446.96, 447.95, 448.62, 447.2, 445.58, 445.23, 445.2, 445.29, 445.81, 445.68, 445.55, 445.18, 443.92], '1W': [434.99, 432.35, 455.1, 477.57, 443.92], '1M': [435.63, 446.69, 436.69, 444.92, 415.17, 426.8, 427.92, 408.75, 421.07, 423.93, 425.83, 432.15, 462.12, 467.67, 436.39, 440.83, 434.99, 432.35, 455.1, 477.57, 443.92], 'YTD': [303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 370.04, 369.11, 348.7, 340.23, 338.45, 316.5, 341.76, 369.57, 366.24, 404.98, 401.61, 404.54, 395.95, 412.32, 446.69, 427.92, 425.83, 440.83, 443.92], '6M': [319.61, 323.63, 342.4, 332.71, 341.36, 355.41, 364.2, 370.04, 369.11, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 395.95, 412.32, 446.69, 427.92, 425.83, 440.83, 443.92], '1Y': [224.68, 231.84, 237.56, 240.33, 242.91, 231.37, 241.44, 232.7, 238.72, 231.39, 260.44, 262.79, 280.71, 288.47, 304.52, 304.71, 288.88, 305.09, 293.64, 290.62, 277.91, 284.68, 295.45, 310.14, 276.96, 298.8, 319.61, 323.63, 342.4, 332.71, 341.36, 355.41, 366.36, 370.04, 369.11, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 395.95, 412.32, 446.69, 427.92, 425.83, 440.83, 443.92] },
      velocityScore: { '1D': 1.2, '1W': -7.7, '1M': -12.6, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 38.6, revenueGrowth: 35, eps: 11.51, grossMargin: 62, dividendYield: 0.8,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6, GTEK: false, ARKK: 1.01, MARS: false, FRWD: 6, BCTK: 8.68, FWD: false, CBSE: false, FCUS: false, WGMI: 0.56, CNEQ: 6.11, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 6, avgWeight: 3.19, proScore: 1.13, coverage: 0.353,
      price: 243.95, weeklyPrices: [227.01, 232.69, 240.14, 238.34, 243.95], weeklyChange: 7.46, dayChange: 2.35, sortRank: 0, periodReturns: { '1M': -6.6, 'YTD': 5.7, '6M': 5.7, '1Y': 10.7 },
      priceHistory: { '1D': [238.34, 236.25, 237.84, 239.39, 239.75, 241.48, 241.89, 242.38, 242.88, 242.34, 241.57, 241.96, 242.19, 242.45, 242.46, 243.07, 244.28, 243.98, 244.01, 244.37, 244.1, 244.12, 244.1, 243.95], '1W': [227.01, 232.69, 240.14, 238.34, 243.95], '1M': [261.26, 256.52, 250.02, 253.79, 246.03, 245.22, 244.19, 238, 241.51, 238.55, 246, 237.5, 244.39, 232.79, 234.11, 234.27, 227.01, 232.69, 240.14, 238.34, 243.95], 'YTD': [230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 198.79, 205.27, 208.39, 213.49, 211.74, 210.14, 200.95, 212.79, 239.89, 248.28, 261.12, 272.05, 268.99, 264.86, 265.29, 256.52, 244.19, 246, 234.27, 243.95], '6M': [226.5, 247.38, 239.12, 238.42, 242.96, 208.72, 201.15, 205.27, 208.39, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 264.86, 265.29, 256.52, 244.19, 246, 234.27, 243.95], '1Y': [220.46, 222.54, 223.19, 228.29, 230.19, 222.31, 224.56, 228.01, 228.71, 225.99, 230.33, 231.62, 220.21, 220.63, 225.22, 215.57, 217.95, 230.3, 250.2, 244.2, 222.55, 229.67, 232.38, 231.78, 221.27, 232.38, 226.5, 247.38, 239.12, 238.42, 242.96, 208.72, 198.79, 205.27, 208.39, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 264.86, 265.29, 256.52, 244.19, 246, 234.27, 243.95] },
      velocityScore: { '1D': -1.7, '1W': 16.5, '1M': -74.3, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 32.4, revenueGrowth: 17, eps: 7.53, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.01, GTEK: false, ARKK: 2.34, MARS: false, FRWD: 2.88, BCTK: 4.2, FWD: 1.46, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.24, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'LRCX', name: 'Lam Research Corp', easyScore: 5, avgWeight: 4.79, proScore: 1.41, coverage: 0.294,
      price: 382, weeklyPrices: [401.82, 379.09, 410.91, 433.33, 382.00], weeklyChange: -4.93, dayChange: -11.85, sortRank: 0, periodReturns: { '1M': 20.5, 'YTD': 123.2, '6M': 123.2, '1Y': 294.6 },
      priceHistory: { '1D': [433.33, 401.62, 408, 405.61, 404.5, 400.68, 396.01, 392.97, 397.2, 399.36, 395.88, 393.73, 394.57, 394.3, 390.92, 387.87, 386.3, 386.89, 384.8, 384.32, 382.98, 383.18, 382.47, 382], '1W': [401.82, 379.09, 410.91, 433.33, 382], '1M': [317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81, 369.34, 374.18, 389.04, 409.54, 371.33, 374.8, 401.82, 379.09, 410.91, 433.33, 382], 'YTD': [171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 242.27, 231, 211.15, 219.4, 233.31, 199.93, 220.65, 267.32, 263.16, 259.47, 258.57, 296.05, 277.96, 322.68, 334.41, 327.16, 369.34, 374.8, 382], '6M': [185.06, 218.36, 222.96, 222.87, 237.5, 229.28, 235.58, 242.27, 231, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 277.96, 322.68, 334.41, 327.16, 369.34, 374.8, 382], '1Y': [96.81, 99.81, 100.37, 97.1, 99.09, 95.94, 106.74, 100.33, 103.63, 97.74, 107.36, 121.9, 128.32, 142.79, 142.54, 144.78, 141.25, 160.67, 165.05, 161.42, 143.24, 151.93, 159.75, 168.26, 154.98, 177.33, 185.06, 218.36, 222.96, 222.87, 237.5, 229.28, 235.53, 242.27, 231, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 277.96, 322.68, 334.41, 327.16, 369.34, 374.8, 382] },
      velocityScore: { '1D': 0, '1W': 2.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$478B', pe: 72.2, revenueGrowth: 24, eps: 5.29, grossMargin: 50, dividendYield: 0.24,
      etfPresence: { PTF: 3.39, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 6.13, BCTK: 8.28, FWD: 2.02, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 4.11, XMMO: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 5, avgWeight: 4, proScore: 1.18, coverage: 0.294,
      price: 357.28, weeklyPrices: [342.19, 334.69, 351.28, 353.33, 357.28], weeklyChange: 4.41, dayChange: 1.12, sortRank: 0, periodReturns: { '1M': -4.1, 'YTD': 13.9, '6M': 13.9, '1Y': 102 },
      priceHistory: { '1D': [353.33, 355.71, 355.2, 355.52, 355.99, 357.95, 358.36, 358.59, 358.48, 356.83, 356.1, 355.86, 355.67, 354.6, 354.75, 355.98, 355.68, 355.45, 356.38, 357.39, 357.02, 356.29, 356.79, 357.28], '1W': [342.19, 334.69, 351.28, 353.33, 357.28], '1M': [372.58, 358.39, 355.68, 369.27, 365.76, 361.17, 362.29, 353.32, 356.56, 358.16, 371.1, 362.1, 367.46, 348.78, 346.08, 345.04, 342.19, 334.69, 351.28, 353.33, 357.28], 'YTD': [313.8, 326.01, 333.16, 328.43, 338.53, 323.1, 306.02, 311.69, 306.36, 306.01, 304.42, 299.02, 273.14, 297.66, 319.21, 335.4, 348.52, 379.64, 386.77, 393.11, 384.84, 358.39, 362.29, 371.1, 345.04, 357.28], '6M': [315.32, 329.14, 330.34, 333.59, 344.9, 324.4, 302.82, 311.69, 306.36, 306.01, 304.42, 299.02, 273.14, 303.93, 330.58, 330.47, 347.5, 384.27, 383.82, 393.11, 384.84, 358.39, 362.29, 371.1, 345.04, 357.28], '1Y': [176.91, 177.66, 183.77, 191.51, 197.44, 196.92, 203.03, 202.49, 207.95, 231.1, 239.56, 249.85, 247.83, 245.54, 245.46, 251.71, 252.53, 275.17, 284.75, 287.43, 284.96, 323.64, 320.62, 321, 298.06, 315.67, 315.32, 329.14, 330.34, 333.59, 344.9, 324.4, 306.02, 311.69, 306.36, 306.01, 304.42, 299.02, 273.14, 303.93, 330.58, 330.47, 347.5, 384.27, 383.82, 393.11, 384.84, 358.39, 362.29, 371.1, 345.04, 357.28] },
      velocityScore: { '1D': 0, '1W': -0.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.4T', pe: 27.3, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.66, GTEK: false, ARKK: 1.86, MARS: false, FRWD: false, BCTK: 5.54, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 5.65, SGRT: false, SPMO: 3.3, XMMO: false },
      tonyNote: 'Alphabet Inc Class C appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 4.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRWD', name: 'CrowdStrike', easyScore: 5, avgWeight: 2.63, proScore: 0.77, coverage: 0.294,
      price: 768.33, weeklyPrices: [680.92, 673.02, 678.65, 701.09, 768.33], weeklyChange: 12.84, dayChange: 0.68, sortRank: 0, periodReturns: { '1M': -1.8, 'YTD': 63.9, '6M': 63.9, '1Y': 56.1 },
      priceHistory: { '1D': [763.14, 775.1, 781.5, 779.76, 781.72, 775.9, 773.2, 771.23, 779.07, 780.61, 783.26, 777.91, 772.81, 777.88, 775.94, 775.97, 775.92, 775.46, 775.98, 773.4, 770.39, 770.84, 769.24, 768.33], '1W': [680.92, 673.02, 678.65, 701.09, 768.33], '1M': [782.17, 768.95, 747.61, 719.09, 671.02, 658.79, 644.93, 647.74, 691.53, 682.8, 692.91, 679.49, 682.96, 684.86, 675.44, 680.92, 673.02, 678.65, 701.09, 768.33], 'YTD': [468.76, 463.87, 455, 452.49, 441.4, 377.16, 411.54, 388.6, 371.98, 428.99, 441.78, 409, 369.58, 399.12, 379.02, 423.95, 448.13, 455.64, 527.77, 594.08, 663.46, 731, 671.02, 682.8, 675.44, 768.33], '6M': [453.58, 470.61, 453.88, 468.33, 441.4, 395.5, 429.64, 350.33, 384.86, 434.13, 441.78, 409, 369.58, 398.61, 402.24, 433.15, 448.13, 455.64, 527.77, 594.08, 663.46, 782.17, 671.02, 682.8, 675.44, 768.33], '1Y': [492.07, 513.51, 470.45, 461.52, 463.15, 441.75, 435.8, 418.6, 417.6, 413.2, 424.87, 445.5, 476.33, 490.38, 484.62, 488.94, 503.95, 546.94, 533.92, 556.73, 513.67, 512.34, 516.55, 517.98, 488.53, 478.84, 468.76, 463.87, 455, 452.49, 444.62, 377.16, 411.54, 388.6, 371.98, 428.99, 441.78, 409, 369.58, 399.12, 379.02, 423.95, 448.13, 455.64, 527.77, 594.08, 663.46, 731, 671.02, 682.8, 675.44, 768.33] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$196B', pe: null, revenueGrowth: 26, eps: -0.15, grossMargin: 75, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.5, IGV: 7.14, FDTX: 1.24, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 1.2, FWD: 1.09, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'CrowdStrike appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 2.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, avgWeight: 5.14, proScore: 1.21, coverage: 0.235,
      price: 387.21, weeklyPrices: [352.83, 372.97, 368.57, 373.02, 387.21], weeklyChange: 9.75, dayChange: 3.81, sortRank: 0, periodReturns: { '1M': -15.9, 'YTD': -19.9, '6M': -19.9, '1Y': -21.3 },
      priceHistory: { '1D': [373.02, 377.14, 377.51, 379.96, 382.42, 383.74, 384.57, 385.88, 386.61, 384.88, 384.8, 385.76, 385.59, 385.75, 385.8, 386.27, 387.9, 387.42, 387.21, 388.19, 387.95, 388.13, 387.69, 387.21], '1W': [352.83, 372.97, 368.57, 373.02, 387.21], '1M': [460.52, 441.31, 427.34, 428.05, 416.67, 411.74, 403.41, 397.36, 390.34, 390.74, 393.83, 378.91, 379.4, 367.34, 373.94, 365.46, 352.83, 372.97, 368.57, 373.02, 387.21], 'YTD': [483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 384.47, 398.55, 409.41, 399.95, 383, 358.96, 372.88, 384.37, 418.07, 424.82, 413.62, 412.66, 423.54, 416.03, 441.31, 403.41, 393.83, 365.46, 387.21], '6M': [472.94, 479.28, 459.86, 470.28, 423.37, 413.6, 396.86, 384.47, 398.55, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 423.54, 416.03, 441.31, 403.41, 393.83, 365.46, 387.21], '1Y': [492.05, 503.51, 505.62, 505.87, 513.24, 524.94, 520.58, 509.77, 502.04, 505.35, 500.37, 510.02, 510.15, 519.71, 524.85, 513.43, 520.54, 541.55, 507.16, 511.14, 493.79, 476.99, 477.73, 478.56, 476.12, 488.02, 472.94, 479.28, 459.86, 470.28, 423.37, 413.6, 401.32, 384.47, 398.55, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 423.54, 416.03, 441.31, 403.41, 393.83, 365.46, 387.21] },
      velocityScore: { '1D': 0, '1W': -3.2, '1M': -77.5, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 23.1, revenueGrowth: 18, eps: 16.79, grossMargin: 68, dividendYield: 0.98,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.03, FDTX: 3.79, GTEK: false, ARKK: false, MARS: false, FRWD: 2.95, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 5.8, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 4, avgWeight: 4.9, proScore: 1.15, coverage: 0.235,
      price: 2007, weeklyPrices: [2335.00, 2090.71, 2050.39, 2273.73, 2007.00], weeklyChange: -14.05, dayChange: -11.73, sortRank: 0, periodReturns: { '1M': 13.9, 'YTD': 745.5, '6M': 745.5, '1Y': 4364 },
      priceHistory: { '1D': [2273.73, 2080, 2103.03, 2098.5, 2092, 2057.94, 2040.46, 2032.3, 2050.67, 2067.29, 2052.21, 2064.41, 2066.08, 2051.94, 2064.76, 2040.97, 2044.69, 2041.78, 2028.09, 2035.88, 2029.72, 2022.49, 2012.19, 2007], '1W': [2335, 2090.71, 2050.39, 2273.73, 2007], '1M': [1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2007], 'YTD': [237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1333.01, 1589.55, 1716.36, 1646.54, 1991.55, 1914.46, 2007], '6M': [275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1333.01, 1589.55, 1716.36, 1646.54, 1991.55, 1914.46, 2007], '1Y': [44.96, 46.2, 41.36, 43, 43.39, 42.1, 47.01, 44.58, 47.35, 53.01, 73.92, 93.97, 99.83, 121.12, 131.88, 144.3, 146.95, 204.36, 216.5, 283.1, 244.93, 220.5, 194.38, 232.86, 206.83, 250.08, 275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1333.01, 1589.55, 1716.36, 1646.54, 1991.55, 1914.46, 2007] },
      velocityScore: { '1D': 12.7, '1W': 5.5, '1M': -57.2, '6M': null }, isNew: false,
      marketCap: '$297B', pe: 68.4, revenueGrowth: 251, eps: 29.33, grossMargin: 56, dividendYield: null,
      etfPresence: { PTF: 9.65, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.58, CBSE: false, FCUS: 5.39, WGMI: false, CNEQ: false, SGRT: false, SPMO: 2.96, XMMO: false },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 4, avgWeight: 4.6, proScore: 1.08, coverage: 0.235,
      price: 917.96, weeklyPrices: [1025.36, 899.90, 968.53, 965.00, 917.96], weeklyChange: -10.47, dayChange: -4.87, sortRank: 0, periodReturns: { '1M': -0.4, 'YTD': 233.3, '6M': 233.3, '1Y': 532.9 },
      priceHistory: { '1D': [965, 906.66, 929.62, 917.64, 913.75, 907.92, 903.39, 898.01, 907.65, 919.31, 916.98, 924, 921.99, 919.95, 914.56, 912.09, 915.88, 915.55, 915.84, 913.61, 918.4, 917.9, 915.56, 917.96], '1W': [1025.36, 899.9, 968.53, 965, 917.96], '1M': [921.26, 926.61, 940.69, 925.99, 847.47, 876.77, 846.01, 815.99, 868.09, 931.04, 1031.34, 1066.07, 1070.23, 1094.04, 1038.59, 993.25, 1025.36, 899.9, 968.53, 965, 917.96], 'YTD': [275.39, 284.47, 320.32, 346.1, 407.69, 429.32, 425.99, 407.4, 379.52, 374.33, 398.78, 404.02, 362.43, 453.3, 513.28, 539.75, 595.86, 738.54, 834.01, 740.84, 845.76, 926.61, 846.01, 1031.34, 993.25, 917.96], '6M': [287.54, 304.01, 326.23, 358.29, 432.95, 425, 415.94, 407.4, 379.52, 374.33, 398.78, 404.02, 362.43, 468.72, 533.44, 559.9, 579.03, 771.01, 808.8, 740.84, 845.76, 926.61, 846.01, 1031.34, 993.25, 917.96], '1Y': [145.04, 142.01, 147.12, 152.76, 147.42, 147.27, 156.92, 157.93, 165.24, 176.32, 193.04, 213.36, 223.7, 256.84, 224.35, 219.38, 215.05, 265.62, 275.77, 283.26, 253.86, 261.89, 258.67, 298.92, 277.65, 285.27, 287.54, 304.01, 326.23, 358.29, 432.95, 425, 425.99, 407.4, 379.52, 374.33, 398.78, 404.02, 362.43, 468.72, 533.44, 559.9, 579.03, 771.01, 808.8, 740.84, 845.76, 926.61, 846.01, 1031.34, 993.25, 917.96] },
      velocityScore: { '1D': -17.6, '1W': -27, '1M': null, '6M': null }, isNew: false,
      marketCap: '$208B', pe: 87.3, revenueGrowth: 44, eps: 10.52, grossMargin: 42, dividendYield: 0.31,
      etfPresence: { PTF: 4.85, WCLD: false, IGV: false, FDTX: 4.04, GTEK: false, ARKK: false, MARS: false, FRWD: 7.63, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.87, XMMO: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks', easyScore: 4, avgWeight: 4.45, proScore: 1.05, coverage: 0.235,
      price: 351.53, weeklyPrices: [293.09, 304.20, 332.00, 341.02, 351.53], weeklyChange: 19.94, dayChange: 3.08, sortRank: 0, periodReturns: { '1M': 17, 'YTD': 90.8, '6M': 90.8, '1Y': 77.9 },
      priceHistory: { '1D': [341.02, 345.55, 349.7, 351.32, 353.67, 353.77, 355.28, 353.99, 355.67, 357.17, 356.98, 355.53, 353.93, 356.73, 356.07, 355.6, 356.61, 355.08, 355.27, 354.6, 352.86, 352.64, 351.68, 351.53], '1W': [293.09, 304.2, 332, 341.02, 351.53], '1M': [300.48, 297.18, 280.43, 279.25, 272.05, 266.33, 260.52, 263.22, 279.53, 279.62, 279.9, 282.13, 287.78, 286.4, 290.92, 285.26, 293.09, 304.2, 332, 341.02, 351.53], 'YTD': [184.2, 190.8, 187.73, 180.18, 176.97, 159.32, 166.95, 144.14, 150.15, 165.1, 167.45, 164.05, 154.35, 161.95, 162.51, 169.56, 182.9, 184.56, 213.66, 247.55, 256.75, 297.18, 260.52, 279.9, 285.26, 351.53], '6M': [179.37, 189.02, 187.66, 184.22, 175.42, 166, 163.5, 144.14, 150.15, 165.1, 167.45, 164.05, 154.35, 169.87, 161.59, 174.96, 180.99, 183.98, 215.6, 247.55, 256.75, 297.18, 260.52, 279.9, 285.26, 351.53], '1Y': [197.58, 206.06, 192.59, 199.22, 183.03, 172.89, 176.86, 181.56, 184.23, 191.53, 197.33, 203.12, 200.7, 206.8, 217.79, 206.7, 212.42, 217.16, 213.18, 210.04, 201, 186.27, 193.63, 192.96, 183.44, 187.22, 179.37, 189.02, 187.66, 184.22, 175.42, 166, 166.95, 144.14, 150.15, 165.1, 167.45, 164.05, 154.35, 169.87, 161.59, 174.96, 180.99, 183.98, 215.6, 247.55, 256.75, 297.18, 260.52, 279.9, 285.26, 351.53] },
      velocityScore: { '1D': 0, '1W': 7.1, '1M': -59.6, '6M': null }, isNew: false,
      marketCap: '$286B', pe: 303, revenueGrowth: 31, eps: 1.16, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.83, IGV: 10.17, FDTX: 3.67, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.14, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'LITE', name: 'Lumentum Holdings Inc', easyScore: 4, avgWeight: 3.81, proScore: 0.9, coverage: 0.235,
      price: 795.14, weeklyPrices: [861.97, 816.98, 851.40, 858.06, 795.14], weeklyChange: -7.75, dayChange: -7.33, sortRank: 0, periodReturns: { '1M': -12.1, 'YTD': 115.7, '6M': 115.7, '1Y': 769.1 },
      priceHistory: { '1D': [858.06, 830.7, 825.32, 820.5, 825.87, 815.56, 794.96, 797.86, 801.19, 803.81, 802.76, 805.26, 808.03, 806.66, 802.66, 802.6, 807.58, 805.99, 802.38, 803.09, 803.89, 803.61, 797.11, 795.14], '1W': [861.97, 816.98, 851.4, 858.06, 795.14], '1M': [905, 1029.15, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 875.36, 869.98, 850, 893.93, 827.92, 842.53, 861.97, 816.98, 851.4, 858.06, 795.14], 'YTD': [368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 772.28, 871.18, 895.11, 859.68, 976.18, 1053.09, 884.98, 910.81, 1029.15, 821.76, 875.36, 842.53, 795.14], '6M': [386.11, 351.42, 324.25, 332.45, 423.42, 577.15, 600.42, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 884.98, 910.81, 1029.15, 821.76, 875.36, 842.53, 795.14], '1Y': [91.49, 90.44, 99.63, 102.13, 109.85, 110.01, 120.23, 117.96, 124.62, 134.12, 164.88, 163.34, 152.75, 171.4, 163.09, 156.57, 158.06, 214.28, 232.75, 253.81, 247.43, 291.27, 302.98, 366, 320.25, 395.92, 386.11, 351.42, 324.25, 332.45, 423.42, 577.15, 562.74, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 884.98, 910.81, 1029.15, 821.76, 875.36, 842.53, 795.14] },
      velocityScore: { '1D': 16.9, '1W': 1.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$62B', pe: 140.5, revenueGrowth: 90, eps: 5.66, grossMargin: 41, dividendYield: null,
      etfPresence: { PTF: 3.62, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 1.4, FWD: false, CBSE: false, FCUS: 2.36, WGMI: false, CNEQ: false, SGRT: 7.88, SPMO: false, XMMO: false },
      tonyNote: 'Lumentum Holdings Inc appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC-CL A', easyScore: 4, avgWeight: 2.34, proScore: 0.55, coverage: 0.235,
      price: 360.2, weeklyPrices: [343.71, 337.39, 353.65, 357.37, 360.20], weeklyChange: 4.8, dayChange: 0.79, sortRank: 0, periodReturns: { '1M': -4.3, 'YTD': 15.1, '6M': 15.1, '1Y': 104.8 },
      priceHistory: { '1D': [357.37, 359.08, 358.5, 358.78, 359.27, 361.26, 361.7, 361.85, 361.75, 360.06, 359.27, 359.16, 359.23, 358.1, 358.22, 359.29, 358.8, 358.54, 359.39, 360.39, 360, 359.33, 359.82, 360.2], '1W': [343.71, 337.39, 353.65, 357.37, 360.2], '1M': [376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68, 373.25, 363.79, 368.03, 349.68, 346.13, 345.29, 343.71, 337.39, 353.65, 357.37, 360.2], 'YTD': [313, 325.44, 332.78, 327.93, 338, 322.86, 305.72, 311.49, 306.52, 306.36, 305.56, 302.06, 273.5, 299.99, 321.31, 337.42, 350.34, 383.25, 388.64, 396.94, 388.88, 361.85, 364.26, 373.25, 345.29, 360.2], '6M': [315.15, 328.57, 330, 333.26, 343.69, 324.32, 302.02, 311.49, 306.52, 306.36, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 388.43, 387.35, 396.94, 388.88, 361.85, 364.26, 373.25, 345.29, 360.2], '1Y': [175.84, 176.62, 182.97, 190.23, 196.53, 196.09, 201.96, 201.57, 207.14, 230.66, 239.17, 249.53, 247.14, 244.9, 244.62, 251.03, 251.69, 274.57, 284.31, 286.71, 284.28, 323.44, 319.63, 320.21, 296.72, 314.09, 315.15, 328.57, 330, 333.26, 343.69, 324.32, 305.72, 311.49, 306.52, 306.36, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 388.43, 387.35, 396.94, 388.88, 361.85, 364.26, 373.25, 345.29, 360.2] },
      velocityScore: { '1D': 0, '1W': -6.8, '1M': -89.1, '6M': null }, isNew: false,
      marketCap: '$4.4T', pe: 27.5, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 0.49, MARS: false, FRWD: 3.17, BCTK: false, FWD: 1.53, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 4.16, XMMO: false },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 3, avgWeight: 5.5, proScore: 0.97, coverage: 0.176,
      price: 425.07, weeklyPrices: [375.12, 379.71, 411.84, 420.60, 425.07], weeklyChange: 13.32, dayChange: 1.06, sortRank: 0, periodReturns: { '1M': 2.2, 'YTD': -5.5, '6M': -5.5, '1Y': 41.4 },
      priceHistory: { '1D': [420.6, 420.38, 422.68, 426.3, 426.3, 427.48, 427.34, 429.39, 432, 430.23, 428.82, 427.8, 427.93, 427.55, 426.92, 426.09, 426.68, 425.25, 425.35, 425.14, 424.67, 424.6, 424.46, 425.07], '1W': [375.12, 379.71, 411.84, 420.6, 425.07], '1M': [415.88, 423.74, 423.7, 418.45, 391, 408.95, 396.68, 381.59, 399.15, 406.43, 404.66, 396.38, 400.49, 405.05, 381.61, 375.53, 375.12, 379.71, 411.84, 420.6, 425.07], 'YTD': [449.72, 435.8, 438.57, 449.06, 430.41, 411.11, 417.44, 399.83, 403.32, 398.68, 395.56, 380.85, 355.28, 352.82, 352.42, 392.5, 378.67, 392.51, 445, 409.99, 433.59, 423.74, 396.68, 404.66, 375.53, 425.07], '6M': [438.07, 445.01, 437.5, 435.2, 421.81, 417.32, 410.63, 399.83, 403.32, 398.68, 395.56, 380.85, 355.28, 346.65, 364.2, 386.42, 376.02, 389.37, 433.45, 409.99, 433.59, 423.74, 396.68, 404.66, 375.53, 425.07], '1Y': [300.71, 295.88, 321.67, 332.56, 319.04, 319.91, 339.38, 329.31, 351.67, 334.09, 347.79, 425.86, 442.79, 459.46, 438.69, 435.15, 438.97, 461.51, 462.07, 430.6, 401.25, 419.4, 446.74, 451.45, 467.26, 485.4, 438.07, 445.01, 437.5, 435.2, 421.81, 417.32, 417.44, 399.83, 403.32, 398.68, 395.56, 380.85, 355.28, 346.65, 364.2, 386.42, 376.02, 389.37, 433.45, 409.99, 433.59, 423.74, 396.68, 404.66, 375.53, 425.07] },
      velocityScore: { '1D': 4.3, '1W': 4.3, '1M': -84.2, '6M': null }, isNew: false,
      marketCap: '$1.6T', pe: 390, revenueGrowth: 16, eps: 1.09, grossMargin: 19, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 10.21, MARS: false, FRWD: false, BCTK: 3.14, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.16, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
    {
      ticker: 'DELL', name: 'DELL', easyScore: 3, avgWeight: 4.61, proScore: 0.81, coverage: 0.176,
      price: 423.27, weeklyPrices: [409.45, 399.49, 414.61, 431.46, 423.27], weeklyChange: 3.38, dayChange: -1.9, sortRank: 0, periodReturns: { '1M': -9.2, 'YTD': 236.2, '6M': 236.2, '1Y': 247.7 },
      priceHistory: { '1D': [431.46, 418.39, 426.35, 428.33, 426.77, 424.68, 422.3, 426.87, 431.18, 431.36, 430.8, 436.87, 434.55, 435.9, 435.89, 435.5, 436.66, 435.78, 430.2, 432.08, 431.07, 431.42, 429.71, 423.27], '1W': [409.45, 399.49, 414.61, 431.46, 423.27], '1M': [465.96, 435.31, 421.08, 422.05, 394.39, 400.77, 381.78, 369.83, 391.45, 395.57, 404.08, 419.32, 409.5, 418.71, 427.78, 434.06, 409.45, 399.49, 414.61, 431.46, 423.27], 'YTD': [125.88, 118.5, 119.66, 115.43, 114.44, 121.05, 117.49, 119.14, 153.55, 146.51, 156.54, 164.59, 164.66, 173.18, 189.79, 204.24, 215.97, 211.64, 247.04, 238.03, 305.08, 435.31, 381.78, 404.08, 434.06, 423.27], '6M': [127.8, 120.62, 120.53, 115.93, 119.16, 120.91, 116.09, 119.14, 153.55, 146.51, 156.54, 164.59, 164.66, 177.69, 184.51, 212.36, 205.93, 216.32, 238.94, 238.03, 305.08, 435.31, 381.78, 404.08, 434.06, 423.27], '1Y': [121.73, 126.63, 123.57, 127.22, 133.54, 128.14, 139.14, 135.2, 130.99, 124.02, 124.45, 130.34, 132.09, 149.68, 164.53, 153.7, 150.13, 163.6, 152.41, 140.71, 122.69, 125.92, 133.63, 140.63, 127.89, 128.38, 127.8, 120.62, 120.53, 115.93, 119.16, 120.91, 117.49, 119.14, 153.55, 146.51, 156.54, 164.59, 164.66, 177.69, 184.51, 212.36, 205.93, 216.32, 238.94, 238.03, 305.08, 435.31, 381.78, 404.08, 434.06, 423.27] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$273B', pe: 33.7, revenueGrowth: 88, eps: 12.56, grossMargin: 19, dividendYield: 0.58,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: 2.91, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: 4.48, WGMI: false, CNEQ: false, SGRT: 6.44, SPMO: false, XMMO: false },
      tonyNote: 'DELL appears in 3 of 17 Broad Tech ETFs (18% coverage) with average weight 4.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 3, avgWeight: 4.39, proScore: 0.77, coverage: 0.176,
      price: 127.22, weeklyPrices: [107.27, 112.93, 115.70, 116.67, 127.22], weeklyChange: 18.59, dayChange: 9.04, sortRank: 0, periodReturns: { '1M': -20.8, 'YTD': -28.4, '6M': -28.4, '1Y': -2.7 },
      priceHistory: { '1D': [116.67, 123.34, 124.63, 125.11, 125.39, 125.61, 127.23, 127.4, 127.36, 127.13, 127.4, 126.93, 126.57, 126.57, 126.77, 126.49, 126.98, 126.92, 127.28, 127.81, 127.58, 127.88, 127.73, 127.22], '1W': [107.27, 112.93, 115.7, 116.67, 127.22], '1M': [160.65, 152.17, 142.2, 141.7, 135.53, 136.47, 132.07, 130.21, 131.08, 127.99, 133.25, 130.63, 128.47, 119.5, 116.7, 113.5, 107.27, 112.93, 115.7, 116.67, 127.22], 'YTD': [177.75, 176.86, 177.07, 169.6, 146.59, 135.9, 131.41, 130.6, 145.17, 156.43, 152.72, 160.84, 137.55, 147.93, 132.37, 145.89, 143.1, 146.03, 136.89, 135.14, 136.6, 152.17, 132.07, 133.25, 113.5, 127.22], '6M': [167.86, 177.49, 170.96, 167.47, 147.76, 142.91, 133.02, 130.6, 145.17, 156.43, 152.72, 160.84, 137.55, 150.07, 135.7, 145.97, 141.18, 135.91, 136, 135.14, 136.6, 152.17, 132.07, 133.25, 113.5, 127.22], '1Y': [130.68, 143.13, 150.91, 154.63, 158.61, 179.54, 184.37, 157.75, 160.87, 154.9, 166.74, 168.33, 179.56, 184.95, 183.56, 179.62, 175.49, 198.81, 187.9, 184.17, 167.33, 163.55, 176.08, 187.91, 177.29, 194.17, 167.86, 177.49, 170.96, 167.47, 147.76, 142.91, 131.41, 130.6, 145.17, 156.43, 152.72, 160.84, 137.55, 150.07, 135.7, 145.97, 141.18, 135.91, 136, 135.14, 136.6, 152.17, 132.07, 133.25, 113.5, 127.22] },
      velocityScore: { '1D': 0, '1W': -9.4, '1M': -72.5, '6M': null }, isNew: false,
      marketCap: '$305B', pe: 142.9, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 7.69, FDTX: 2.87, GTEK: false, ARKK: 2.61, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 3, avgWeight: 4.86, proScore: 2.92, coverage: 0.6,
      price: 690.27, weeklyPrices: [718.59, 687.87, 714.45, 720.04, 690.27], weeklyChange: -3.94, dayChange: -4.12, sortRank: 0, periodReturns: { '1M': 0.4, 'YTD': 63.5, '6M': 63.5, '1Y': 85.4 },
      priceHistory: { '1D': [719.93, 697.59, 695.05, 694.05, 698.34, 691.29, 690.17, 690.05, 690.56, 698.37, 696.59, 698.47, 697.34, 696.41, 693.93, 693.97, 692.88, 691.11, 691.71, 692.47, 690.21, 690.4, 689.98, 690.27], '1W': [718.59, 687.87, 714.45, 720.04, 690.27], '1M': [687.48, 706.06, 715.67, 719.17, 695.11, 693.81, 691.95, 650.92, 683.29, 707.74, 719.29, 714.85, 702.25, 740.14, 702.29, 701.88, 718.59, 687.87, 714.45, 720.04, 690.27], 'YTD': [422.06, 413.17, 447.64, 468.76, 474.63, 508.11, 524.08, 549.11, 572.66, 568.04, 574.02, 567.45, 533.78, 554.38, 595.84, 604.97, 637.28, 757.34, 781.38, 723.03, 742.18, 706.06, 691.95, 719.29, 701.88, 690.27], '6M': [439.68, 422.57, 466.75, 470.77, 477.77, 514.56, 525.13, 549.11, 572.66, 568.04, 574.02, 567.45, 533.78, 555.57, 594.4, 605.89, 630.94, 771.61, 765.81, 723.03, 742.18, 706.06, 691.95, 719.29, 701.88, 690.27], '1Y': [372.29, 382.12, 389.12, 405.11, 411.11, 387.5, 379.96, 379.27, 383.92, 374.41, 390.17, 376.01, 402.87, 420.65, 443.45, 436.93, 412.21, 448.69, 453.45, 449.42, 439.29, 450.14, 456.02, 462.21, 414.25, 433.58, 439.68, 422.57, 466.75, 470.77, 477.77, 514.56, 524.08, 549.11, 572.66, 568.04, 574.02, 567.45, 533.78, 555.57, 594.4, 605.89, 630.94, 771.61, 765.81, 723.03, 742.18, 706.06, 691.95, 719.29, 701.88, 690.27] },
      velocityScore: { '1D': -1, '1W': 3.2, '1M': -19.6, '6M': null }, isNew: false,
      marketCap: '$104B', pe: 94.9, revenueGrowth: 26, eps: 7.27, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.95, VOLT: 5.26, PBD: false, PBW: false, IVEP: 4.37 },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 3, avgWeight: 4.65, proScore: 2.79, coverage: 0.6,
      price: 314.48, weeklyPrices: [310.32, 310.64, 315.65, 333.04, 314.48], weeklyChange: 1.34, dayChange: -5.57, sortRank: 0, periodReturns: { '1M': 16.5, 'YTD': 85.4, '6M': 85.4, '1Y': 229.2 },
      priceHistory: { '1D': [333.04, 320, 326.37, 323.04, 321, 316.41, 316.57, 314.29, 317.01, 317.37, 318.17, 316.36, 317.54, 319.01, 319.17, 319.72, 319.31, 319.72, 319.72, 315.6, 316.51, 315.5, 315.64, 314.48], '1W': [310.32, 310.64, 315.65, 333.04, 314.48], '1M': [269.86, 269.22, 280.09, 276.54, 262.56, 279.13, 276.04, 276.95, 296.55, 293.87, 293.22, 299.84, 296.39, 304.33, 288.64, 294.15, 310.32, 310.64, 315.65, 333.04, 314.48], 'YTD': [169.63, 180.24, 196.61, 196.5, 201.19, 220.78, 232.84, 231.83, 222.45, 191.81, 205.11, 214.98, 197.83, 206.9, 237.93, 254.38, 250.96, 286.69, 302.73, 258.28, 276.25, 269.22, 276.04, 293.22, 294.15, 314.48], '6M': [172.78, 187.43, 200.11, 205.17, 215.59, 229.32, 235.3, 231.83, 222.45, 191.81, 205.11, 214.98, 197.83, 210.32, 237.34, 257.41, 249.82, 297.17, 298.22, 258.28, 276.25, 269.22, 276.04, 293.22, 294.15, 314.48], '1Y': [95.52, 102.24, 98.77, 107.07, 125.91, 131.1, 134.58, 127.8, 139.31, 138.07, 145.68, 144.6, 142.27, 142.5, 146.89, 150.77, 148.25, 152.46, 154.86, 153.75, 144.07, 150.84, 159.74, 172.82, 164.18, 176.17, 172.78, 187.43, 200.11, 205.17, 215.59, 229.32, 232.84, 231.83, 222.45, 191.81, 205.11, 214.98, 197.83, 210.32, 237.34, 257.41, 249.82, 297.17, 298.22, 258.28, 276.25, 269.22, 276.04, 293.22, 294.15, 314.48] },
      velocityScore: { '1D': 16.7, '1W': 28, '1M': -25.2, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 75.6, revenueGrowth: 17, eps: 4.16, grossMargin: 39, dividendYield: 0.08,
      etfPresence: { POW: 3.95, VOLT: 8.37, PBD: false, PBW: 1.63, IVEP: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 3, avgWeight: 4.51, proScore: 2.7, coverage: 0.6,
      price: 413.64, weeklyPrices: [419.87, 402.68, 408.26, 426.12, 413.64], weeklyChange: -1.48, dayChange: -2.93, sortRank: 0, periodReturns: { '1M': 3.4, 'YTD': 29.9, '6M': 29.9, '1Y': 16.5 },
      priceHistory: { '1D': [426.12, 410.36, 417.64, 417.26, 417.18, 414.79, 412.79, 415.42, 419.38, 421.57, 421.92, 422.37, 422.89, 422.17, 420.14, 418.66, 418.54, 416.31, 415.82, 416.9, 415.46, 414.2, 413.74, 413.64], '1W': [419.87, 402.68, 408.26, 426.12, 413.64], '1M': [400.08, 417.62, 421.21, 418.61, 395.94, 403.14, 401.72, 375.46, 393.64, 391.39, 407.71, 409.64, 421.77, 435.78, 405.28, 404.59, 419.87, 402.68, 408.26, 426.12, 413.64], 'YTD': [318.51, 320.58, 333.46, 331.22, 351.42, 373.82, 389.25, 362.05, 377.4, 353.87, 361.04, 359.74, 343.53, 363.89, 403.36, 407.57, 416.77, 422.44, 419, 381.87, 403.13, 417.62, 401.72, 407.71, 404.59, 413.64], '6M': [327.31, 324.51, 343.75, 332.28, 359.44, 377.06, 391.49, 362.05, 377.4, 353.87, 361.04, 359.74, 343.53, 368.85, 401.9, 409.7, 413.07, 410.86, 401.53, 381.87, 403.13, 417.62, 401.72, 407.71, 404.59, 413.64], '1Y': [355.04, 359.78, 362.89, 380.24, 390.09, 358.16, 357.49, 349, 352.02, 342.99, 362.25, 363.35, 372.21, 373.84, 376.7, 381.72, 360.6, 387.75, 385.44, 369.4, 338.29, 336.65, 335.57, 353.45, 315.82, 323.67, 327.31, 324.51, 343.75, 332.28, 359.44, 377.06, 389.25, 362.05, 377.4, 353.87, 361.04, 359.74, 343.53, 368.85, 401.9, 409.7, 413.07, 410.86, 401.53, 381.87, 403.13, 417.62, 401.72, 407.71, 404.59, 413.64] },
      velocityScore: { '1D': 2.3, '1W': 1.9, '1M': -17.9, '6M': null }, isNew: false,
      marketCap: '$161B', pe: 40.4, revenueGrowth: 17, eps: 10.23, grossMargin: 37, dividendYield: 1.03,
      etfPresence: { POW: 4.07, VOLT: 5.34, PBD: false, PBW: false, IVEP: 4.11 },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 3, avgWeight: 4.23, proScore: 2.54, coverage: 0.6,
      price: 1129.99, weeklyPrices: [1085.47, 1045.17, 1102.51, 1174.86, 1129.99], weeklyChange: 4.1, dayChange: -3.82, sortRank: 0, periodReturns: { '1M': 18.9, 'YTD': 72.9, '6M': 72.9, '1Y': 123.3 },
      priceHistory: { '1D': [1174.86, 1138.89, 1155.77, 1155.32, 1155.07, 1145.68, 1141.56, 1136.52, 1146.13, 1157.9, 1149.82, 1155.82, 1157.52, 1159.6, 1154.39, 1154.09, 1150.49, 1143.2, 1139.68, 1139.83, 1135.39, 1130.18, 1128.45, 1129.99], '1W': [1085.47, 1045.17, 1102.51, 1174.86, 1129.99], '1M': [950.54, 969.67, 959.36, 963.33, 933.61, 933.85, 920.15, 867.09, 906.79, 940.66, 982.35, 1048.86, 1109.73, 1127.59, 1034.98, 1057.65, 1085.47, 1045.17, 1102.51, 1174.86, 1129.99], 'YTD': [653.57, 628.4, 642.23, 657.78, 726.37, 779.35, 802.13, 831.7, 881.18, 830.1, 827.37, 882.64, 817.35, 897.36, 991.12, 990.18, 1120.23, 1073.95, 1073.08, 1012.25, 1070.47, 969.67, 920.15, 982.35, 1057.65, 1129.99], '6M': [679.55, 622.5, 681.55, 665.99, 754.97, 801.54, 819.15, 831.7, 881.18, 830.1, 827.37, 882.64, 817.35, 910.75, 987.5, 991.3, 1088.93, 1095.21, 1071.98, 1012.25, 1070.47, 969.67, 920.15, 982.35, 1057.65, 1129.99], '1Y': [506, 535.77, 561.17, 629.03, 655, 664.55, 634.31, 603.13, 625.91, 577.04, 643.56, 614.79, 628.97, 606.15, 625.45, 615.95, 576, 577.97, 559.7, 575.4, 554.93, 572.56, 601.97, 723, 614.19, 667.32, 679.55, 622.5, 681.55, 665.99, 754.97, 801.54, 802.13, 831.7, 881.18, 830.1, 827.37, 882.64, 817.35, 910.75, 987.5, 991.3, 1088.93, 1095.21, 1071.98, 1012.25, 1070.47, 969.67, 920.15, 982.35, 1057.65, 1129.99] },
      velocityScore: { '1D': 4.5, '1W': 6.7, '1M': -1.6, '6M': null }, isNew: false,
      marketCap: '$304B', pe: 33.1, revenueGrowth: 16, eps: 34.19, grossMargin: 20, dividendYield: 0.17,
      etfPresence: { POW: 3.51, VOLT: 4.57, PBD: false, PBW: false, IVEP: 4.62 },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy Corp', easyScore: 3, avgWeight: 3.75, proScore: 2.25, coverage: 0.6,
      price: 290.4, weeklyPrices: [309.18, 252.02, 275.01, 302.70, 290.40], weeklyChange: -6.07, dayChange: -4.06, sortRank: 0, periodReturns: { '1M': 6.2, 'YTD': 234.2, '6M': 234.2, '1Y': 1212.2 },
      priceHistory: { '1D': [302.7, 313.23, 310.45, 311.97, 311.35, 304.01, 299.39, 300.65, 304.79, 310.24, 307.5, 307.56, 308.74, 311.04, 308.23, 304.68, 303.8, 300.99, 299.28, 296.3, 290.87, 294, 289.08, 290.4], '1W': [309.18, 252.02, 275.01, 302.7, 290.4], '1M': [273.51, 302.85, 287.32, 291.37, 263.61, 253.57, 259.61, 234.23, 248.88, 260.22, 280.88, 284.99, 328.91, 345.85, 321.98, 326.19, 309.18, 252.02, 275.01, 302.7, 290.4], 'YTD': [86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 160.28, 166, 151.32, 153.68, 141.33, 119.51, 135, 176.67, 218.27, 234.68, 288.64, 283.92, 258.71, 302.4, 302.85, 259.61, 280.88, 326.19, 290.4], '6M': [98.69, 134.07, 149.5, 139.62, 156.13, 155.17, 145.32, 160.28, 166, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 258.71, 302.4, 302.85, 259.61, 280.88, 326.19, 290.4], '1Y': [22.13, 28.71, 24.69, 26.89, 37.62, 38.86, 44.08, 43.1, 49.94, 52.45, 62.96, 79.67, 69.18, 90.19, 87.58, 116.58, 94.37, 133.71, 141.41, 126.72, 104.97, 94.29, 102.5, 101.29, 76.97, 91.88, 98.69, 134.07, 149.5, 139.62, 156.13, 155.17, 139.74, 160.28, 166, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 258.71, 302.4, 302.85, 259.61, 280.88, 326.19, 290.4] },
      velocityScore: { '1D': -11.8, '1W': -13.1, '1M': -3.4, '6M': null }, isNew: false,
      marketCap: '$83B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: 1.69, VOLT: 4.11, PBD: false, PBW: false, IVEP: 5.46 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 3, avgWeight: 3.48, proScore: 2.09, coverage: 0.6,
      price: 86.86, weeklyPrices: [87.70, 88.56, 88.66, 87.77, 86.86], weeklyChange: -0.96, dayChange: -1.04, sortRank: 0, periodReturns: { '1M': 3.8, 'YTD': 8.2, '6M': 8.2, '1Y': 18.9 },
      priceHistory: { '1D': [87.77, 87.34, 87.31, 87.57, 87.5, 87.38, 86.81, 86.57, 86.69, 86.73, 86.98, 86.86, 87.03, 87.06, 87.04, 86.9, 86.7, 86.78, 86.79, 86.86, 86.8, 86.75, 86.75, 86.86], '1W': [87.7, 88.56, 88.66, 87.77, 86.86], '1M': [83.66, 85.68, 84.58, 85.68, 85.84, 84.01, 84.83, 85.12, 84.84, 85.99, 86.23, 85.73, 86.75, 86.08, 86.43, 87.62, 87.7, 88.56, 88.66, 87.77, 86.86], 'YTD': [80.28, 79.49, 82.19, 84.81, 87.9, 89.47, 93.8, 94.06, 92.71, 92.01, 92.82, 90.23, 92.05, 92.73, 92.3, 92.01, 94.83, 95.51, 94.84, 89.04, 87.65, 85.68, 84.83, 86.23, 87.62, 86.86], '6M': [80.93, 79.89, 83.63, 85.47, 86.33, 89.48, 92.71, 94.06, 92.71, 92.01, 92.82, 90.23, 92.05, 93.67, 91.31, 90.6, 96.51, 96.28, 94.59, 89.04, 87.65, 85.68, 84.83, 86.23, 87.62, 86.86], '1Y': [73.06, 73.65, 74.77, 72.82, 70.99, 70.54, 72.3, 76.51, 74.84, 71.63, 71.04, 70.31, 73.83, 78.67, 84.04, 85.79, 82.84, 81.76, 82.14, 85.89, 84.64, 84.83, 84.95, 81.27, 80.29, 80.45, 80.93, 79.89, 83.63, 85.47, 86.33, 89.48, 93.8, 94.06, 92.71, 92.01, 92.82, 90.23, 92.05, 93.67, 91.31, 90.6, 96.51, 96.28, 94.59, 89.04, 87.65, 85.68, 84.83, 86.23, 87.62, 86.86] },
      velocityScore: { '1D': -2.8, '1W': 0.5, '1M': -2.3, '6M': null }, isNew: false,
      marketCap: '$181B', pe: 22, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.84,
      etfPresence: { POW: 1.99, VOLT: 4.83, PBD: false, PBW: false, IVEP: 3.63 },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 3, avgWeight: 3.33, proScore: 2, coverage: 0.6,
      price: 159.52, weeklyPrices: [171.91, 162.92, 163.35, 169.61, 159.52], weeklyChange: -7.21, dayChange: -5.95, sortRank: 0, periodReturns: { '1M': -7, 'YTD': 56.4, '6M': 56.4, '1Y': 121.1 },
      priceHistory: { '1D': [169.61, 162.76, 164.17, 164.78, 164.06, 162.61, 161.64, 161.09, 161.34, 162.94, 162.51, 163.01, 162.96, 162.9, 162, 161.55, 161.38, 160.97, 161.16, 160.77, 160.5, 160.02, 159.71, 159.52], '1W': [171.91, 162.92, 163.35, 169.61, 159.52], '1M': [171.55, 173.39, 176.39, 173.88, 162.86, 163.81, 163.8, 156.79, 164.52, 165.84, 167.34, 170.94, 177.02, 184.34, 168.37, 167.55, 171.91, 162.92, 163.35, 169.61, 159.52], 'YTD': [101.97, 102.72, 107.98, 110.29, 112.26, 112.64, 113.25, 114.93, 120.27, 108.13, 114.3, 121, 112.75, 117.41, 133.16, 135.8, 141.71, 162.69, 173.39, 160.69, 169.29, 173.39, 163.8, 167.34, 167.55, 159.52], '6M': [106.82, 105.38, 112.5, 110.58, 115.79, 114.62, 115.22, 114.93, 120.27, 108.13, 114.3, 121, 112.75, 118.92, 134.48, 137, 138.3, 169.41, 170.74, 160.69, 169.29, 173.39, 163.8, 167.34, 167.55, 159.52], '1Y': [72.16, 75.2, 74.48, 76.63, 78.72, 90.24, 90.61, 88.15, 90.84, 89.49, 94.98, 96.46, 97.27, 100.12, 98.72, 101.1, 96.93, 106.28, 112.5, 111.46, 104.31, 104.93, 104.97, 108.87, 94.99, 103.97, 106.82, 105.38, 112.5, 110.58, 115.79, 114.62, 113.25, 114.93, 120.27, 108.13, 114.3, 121, 112.75, 118.92, 134.48, 137, 138.3, 169.41, 170.74, 160.69, 169.29, 173.39, 163.8, 167.34, 167.55, 159.52] },
      velocityScore: { '1D': 2, '1W': -2.9, '1M': -18.7, '6M': null }, isNew: false,
      marketCap: '$26B', pe: 54.4, revenueGrowth: 54, eps: 2.93, grossMargin: 37, dividendYield: 0.5,
      etfPresence: { POW: 3.75, VOLT: 3, PBD: false, PBW: false, IVEP: 3.24 },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 3, avgWeight: 2.96, proScore: 1.77, coverage: 0.6,
      price: 494.69, weeklyPrices: [536.04, 517.02, 514.71, 523.20, 494.69], weeklyChange: -7.71, dayChange: -5.45, sortRank: 0, periodReturns: { '1M': 6.9, 'YTD': 11.4, '6M': 11.4, '1Y': 20.5 },
      priceHistory: { '1D': [523.2, 507.99, 510.87, 511, 511.29, 507.19, 504.28, 502.65, 501.98, 506.04, 499.64, 500.05, 503.08, 503.6, 499.73, 496.88, 495.95, 494.76, 496.02, 496.58, 494.98, 494.25, 494.71, 494.69], '1W': [536.04, 517.02, 514.71, 523.2, 494.69], '1M': [462.93, 480.46, 484.91, 485.27, 476.82, 485.03, 486.47, 467.59, 469.32, 476.89, 502.65, 508.87, 523.69, 539.39, 509.96, 518.18, 536.04, 517.02, 514.71, 523.2, 494.69], 'YTD': [444.11, 460.87, 484.11, 485.53, 487.94, 503.8, 524.12, 516.99, 516.98, 487.76, 472.64, 489.07, 472.07, 499.2, 539.79, 546.23, 555.34, 516, 490.16, 470.87, 478.05, 480.46, 486.47, 502.65, 518.18, 494.69], '6M': [463.03, 470.53, 489.31, 486.82, 495.59, 506.14, 524.25, 516.99, 516.98, 487.76, 472.64, 489.07, 472.07, 499.31, 545.62, 549.11, 544.71, 507.81, 485.98, 470.87, 478.05, 480.46, 486.47, 502.65, 518.18, 494.69], '1Y': [410.51, 417.71, 418.42, 434.95, 437.44, 423.57, 443.95, 432.81, 442.52, 428.8, 442.33, 433.26, 431.16, 430.47, 419.67, 434.05, 422.63, 472.57, 468.06, 453, 417.28, 429.82, 429.34, 448.18, 429.68, 456.28, 463.03, 470.53, 489.31, 486.82, 495.59, 506.14, 524.12, 516.99, 516.98, 487.76, 472.64, 489.07, 472.07, 499.31, 545.62, 549.11, 544.71, 507.81, 485.98, 470.87, 478.05, 480.46, 486.47, 502.65, 518.18, 494.69] },
      velocityScore: { '1D': -0.6, '1W': -1.1, '1M': -16.9, '6M': null }, isNew: false,
      marketCap: '$26B', pe: 29.3, revenueGrowth: 11, eps: 16.9, grossMargin: 36, dividendYield: 1.09,
      etfPresence: { POW: 2.87, VOLT: 3.38, PBD: false, PBW: false, IVEP: 2.62 },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'NRG', name: 'NRG Energy Inc', easyScore: 3, avgWeight: 1.34, proScore: 0.8, coverage: 0.6,
      price: 139.13, weeklyPrices: [147.11, 149.36, 149.11, 146.06, 139.13], weeklyChange: -5.42, dayChange: -4.74, sortRank: 0, periodReturns: { '1M': 7.5, 'YTD': -12.6, '6M': -12.6, '1Y': -10.8 },
      priceHistory: { '1D': [146.06, 143.45, 142.6, 141.7, 141.24, 140.1, 138.71, 139.14, 138.35, 138.68, 138.79, 138.73, 138.64, 138.31, 138.76, 138.74, 137.67, 138.32, 138.54, 139.09, 138.67, 138.8, 139.19, 139.13], '1W': [147.11, 149.36, 149.11, 146.06, 139.13], '1M': [129.47, 133.51, 133.76, 133.39, 129.2, 127.71, 129.96, 120.65, 123.7, 125.47, 132.1, 132.13, 135.06, 138.91, 137.66, 142.21, 147.11, 149.36, 149.11, 146.06, 139.13], 'YTD': [159.24, 143.53, 158.5, 149.3, 152.63, 153.32, 172.35, 176.52, 175.58, 155.42, 152.48, 151.77, 141.23, 149.8, 170.24, 157.18, 160.15, 154.82, 137.3, 125.5, 140.43, 133.51, 129.96, 132.1, 142.21, 139.13], '6M': [166.16, 149.27, 152.05, 149.93, 149.11, 155.72, 173.45, 176.52, 175.58, 155.42, 152.48, 151.77, 141.23, 153.06, 170.96, 149.86, 154.81, 157.43, 137.34, 125.5, 140.43, 133.51, 129.96, 132.1, 142.21, 139.13], '1Y': [155.96, 150.27, 144.96, 160.55, 166.59, 148.56, 155, 148.38, 146.23, 146.91, 161.21, 164.58, 165.58, 161.91, 167.52, 171.33, 160.42, 178.5, 173.19, 168.84, 166.45, 163.81, 166.77, 168.16, 149.48, 160.56, 166.16, 149.27, 152.05, 149.93, 149.11, 155.72, 172.35, 176.52, 175.58, 155.42, 152.48, 151.77, 141.23, 153.06, 170.96, 149.86, 154.81, 157.43, 137.34, 125.5, 140.43, 133.51, 129.96, 132.1, 142.21, 139.13] },
      velocityScore: { '1D': -3.6, '1W': 21.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$29B', pe: 152.9, revenueGrowth: 20, eps: 0.91, grossMargin: 16, dividendYield: 1.3,
      etfPresence: { POW: 0.52, VOLT: 1.01, PBD: false, PBW: false, IVEP: 2.48 },
      tonyNote: 'NRG Energy Inc appears in 3 of 5 Electrification ETFs (60% coverage) with average weight 1.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 2, avgWeight: 5.81, proScore: 2.32, coverage: 0.4,
      price: 263.65, weeklyPrices: [309.20, 279.77, 281.09, 286.36, 263.65], weeklyChange: -14.73, dayChange: -7.93, sortRank: 0, periodReturns: { '1M': -8.5, 'YTD': 148.1, '6M': 148.1, '1Y': 276.6 },
      priceHistory: { '1D': [286.36, 266.74, 271.42, 269.4, 269.32, 266.71, 267.85, 269.21, 271.85, 275.82, 272.9, 272.75, 273.4, 273.04, 270.84, 268.91, 267.48, 266.46, 266.47, 264.51, 264.77, 264.49, 263.56, 263.65], '1W': [309.2, 279.77, 281.09, 286.36, 263.65], '1M': [288.12, 299.07, 299.73, 300.06, 284.87, 293.6, 283.51, 262.34, 290.5, 294.75, 292.7, 294.03, 297.2, 307.8, 291.5, 294.49, 309.2, 279.77, 281.09, 286.36, 263.65], 'YTD': [106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 181.38, 177.5, 173.36, 170.61, 180.86, 167.52, 186.72, 228.99, 241.65, 260.52, 269.95, 322.05, 266.8, 291.97, 299.07, 283.51, 292.7, 294.49, 263.65], '6M': [117.51, 121.83, 139.99, 141.15, 146.79, 187.3, 187.21, 181.38, 177.5, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 266.8, 291.97, 299.07, 283.51, 292.7, 294.49, 263.65], '1Y': [70.01, 70.64, 72.53, 78.32, 76.88, 75.95, 86.57, 84.7, 91.08, 85.72, 92.33, 97.11, 97.88, 105.74, 105.13, 109.92, 110.96, 136.12, 131.92, 118.74, 107.22, 104.18, 107.83, 119.95, 105.77, 112.06, 117.51, 121.83, 139.99, 141.15, 146.79, 187.3, 195.02, 181.38, 177.5, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 266.8, 291.97, 299.07, 283.51, 292.7, 294.49, 263.65] },
      velocityScore: { '1D': -14.4, '1W': -26.1, '1M': -53.1, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 51.4, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { POW: 4.68, VOLT: 6.94, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, avgWeight: 3.42, proScore: 1.37, coverage: 0.4,
      price: 135.43, weeklyPrices: [137.00, 138.69, 137.97, 136.81, 135.43], weeklyChange: -1.15, dayChange: -1.01, sortRank: 0, periodReturns: { '1M': 9.4, 'YTD': 17.4, '6M': 17.4, '1Y': 29.7 },
      priceHistory: { '1D': [136.81, 136.65, 136.5, 136.77, 136.92, 136.69, 136.22, 135.66, 135.84, 135.91, 136.16, 135.97, 136.2, 136.09, 136.03, 135.84, 135.77, 135.64, 134.9, 135.1, 135.13, 135.05, 135.05, 135.43], '1W': [137, 138.69, 137.97, 136.81, 135.43], '1M': [123.79, 127.11, 126.31, 127.79, 129.14, 126.77, 127.76, 128.53, 128.48, 129.23, 129.75, 128.27, 127.69, 130.3, 133.74, 134.96, 137, 138.69, 137.97, 136.81, 135.43], 'YTD': [115.31, 115.93, 119.4, 116.63, 119.78, 120.8, 129.94, 132.03, 133.29, 131.86, 134.15, 127.92, 131.12, 132.36, 134.46, 133.28, 135.07, 134.66, 130.7, 127.68, 130.9, 127.11, 127.76, 129.75, 134.96, 135.43], '6M': [115.81, 116.91, 119.96, 118.02, 118.33, 121.1, 130.24, 132.03, 133.29, 131.86, 134.15, 127.92, 131.12, 132.92, 135.46, 131.89, 135.59, 137.04, 131.94, 127.68, 130.9, 127.11, 127.76, 129.75, 134.96, 135.43], '1Y': [104.39, 104.74, 105.49, 108.89, 113.25, 113.49, 113.11, 112.66, 112.63, 110.03, 108.34, 107.52, 108.88, 112.75, 118.19, 118.53, 117.27, 122.11, 119.76, 122.68, 123.51, 121.58, 118.06, 114.16, 114.71, 115.31, 115.81, 116.91, 119.96, 118.02, 118.33, 121.1, 129.94, 132.03, 133.29, 131.86, 134.15, 127.92, 131.12, 132.92, 135.46, 131.89, 135.59, 137.04, 131.94, 127.68, 130.9, 127.11, 127.76, 129.75, 134.96, 135.43] },
      velocityScore: { '1D': -2.8, '1W': 22.3, '1M': -29.7, '6M': null }, isNew: false,
      marketCap: '$74B', pe: 20, revenueGrowth: 10, eps: 6.76, grossMargin: 47, dividendYield: 2.78,
      etfPresence: { POW: 2.61, VOLT: 4.23, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 2, avgWeight: 3.41, proScore: 1.36, coverage: 0.4,
      price: 310.25, weeklyPrices: [325.57, 303.95, 306.97, 334.82, 310.25], weeklyChange: -4.71, dayChange: -7.34, sortRank: 0, periodReturns: { '1M': -4.1, 'YTD': 91.5, '6M': 91.5, '1Y': 153.2 },
      priceHistory: { '1D': [334.82, 316.6, 321.78, 319.23, 318.99, 315.33, 312.83, 313.78, 316.39, 319.35, 318.14, 318.5, 319, 318.9, 317.25, 315.55, 315, 314.07, 313.99, 314.02, 313.4, 312.44, 311.32, 310.25], '1W': [325.57, 303.95, 306.97, 334.82, 310.25], '1M': [323.39, 334.49, 331.44, 323.92, 300.51, 300.57, 289.52, 280.98, 297.88, 302.87, 299.6, 317.58, 333.05, 357.96, 318.32, 316.43, 325.57, 303.95, 306.97, 334.82, 310.25], 'YTD': [162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 234.53, 245.42, 257.75, 264.35, 264.74, 256, 234.22, 258.73, 299.96, 314.41, 322.43, 330.97, 367.92, 339.73, 323.91, 334.49, 289.52, 299.6, 316.43, 310.25], '6M': [175.61, 163.58, 176.93, 181.23, 190.01, 202, 243.53, 245.42, 257.75, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.13, 339.73, 323.91, 334.49, 289.52, 299.6, 316.43, 310.25], '1Y': [122.54, 128.37, 125.4, 130.19, 144.17, 139.75, 137.4, 129.05, 127.93, 125.59, 136.74, 136.83, 141.62, 161.59, 167.38, 180.51, 171.59, 199.27, 190.71, 173.37, 164.86, 169.57, 178.88, 181.82, 149.83, 166.87, 175.61, 163.58, 176.93, 181.23, 190.01, 202, 234.53, 245.42, 257.75, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.13, 339.73, 323.91, 334.49, 289.52, 299.6, 316.43, 310.25] },
      velocityScore: { '1D': 7.1, '1W': 4.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$119B', pe: 78, revenueGrowth: 30, eps: 3.98, grossMargin: 37, dividendYield: 0.07,
      etfPresence: { POW: false, VOLT: 2.51, PBD: false, PBW: false, IVEP: 4.31 },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'APH', name: 'Amphenol Corp', easyScore: 2, avgWeight: 2.83, proScore: 1.13, coverage: 0.4,
      price: 172.19, weeklyPrices: [165.15, 163.72, 166.42, 176.32, 172.19], weeklyChange: 4.26, dayChange: -2.35, sortRank: 0, periodReturns: { '1M': 17.7, 'YTD': 27.4, '6M': 27.4, '1Y': 76.8 },
      priceHistory: { '1D': [176.32, 168.68, 171.62, 172.51, 172.49, 172.21, 171.99, 172.05, 172.13, 173.18, 172.99, 173.45, 173.23, 173.15, 172.9, 172.54, 172.45, 172.5, 172.17, 172.07, 171.66, 172.18, 172.41, 172.19], '1W': [165.15, 163.72, 166.42, 176.32, 172.19], '1M': [146.34, 148.4, 147.62, 146.77, 138.81, 143.6, 154.07, 149.22, 152.46, 153.8, 158.81, 161.11, 163.96, 165.96, 158.7, 162.78, 165.15, 163.72, 166.42, 176.32, 172.19], 'YTD': [135.14, 136.25, 154.22, 150.99, 144.08, 136.23, 146.72, 147.82, 135.16, 136.06, 136.8, 130.67, 119.15, 126.49, 145.27, 152.81, 148.64, 141.03, 122.47, 121.72, 139.56, 148.4, 154.07, 158.81, 162.78, 172.19], '6M': [139.71, 140.16, 154.39, 155.56, 144.93, 144.2, 148.57, 147.82, 135.16, 136.06, 136.8, 130.67, 119.15, 128.38, 148.72, 151.93, 143.72, 136.69, 127.87, 121.72, 139.56, 148.4, 154.07, 158.81, 162.78, 172.19], '1Y': [97.39, 98.21, 100.55, 100.71, 105.49, 109.5, 109.83, 109.98, 109.9, 110.69, 119.09, 118.41, 123.13, 124.66, 125.79, 125.6, 128.93, 139.75, 138.87, 141.92, 132.44, 137.81, 138.65, 138.68, 126.51, 137.94, 139.71, 140.16, 154.39, 155.56, 144.93, 144.2, 146.72, 147.82, 135.16, 136.06, 136.8, 130.67, 119.15, 128.38, 148.72, 151.93, 143.72, 136.69, 127.87, 121.72, 139.56, 148.4, 154.07, 158.81, 162.78, 172.19] },
      velocityScore: { '1D': 2.7, '1W': null, '1M': -37.2, '6M': null }, isNew: false,
      marketCap: '$212B', pe: 49.6, revenueGrowth: 58, eps: 3.47, grossMargin: 38, dividendYield: 0.57,
      etfPresence: { POW: 1.06, VOLT: 4.6, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, avgWeight: 2.78, proScore: 1.11, coverage: 0.4,
      price: 353.29, weeklyPrices: [375.15, 348.11, 348.15, 372.87, 353.29], weeklyChange: -5.83, dayChange: -5.25, sortRank: 0, periodReturns: { '1M': 19.9, 'YTD': 68.7, '6M': 68.7, '1Y': 164.5 },
      priceHistory: { '1D': [372.87, 356.57, 361.46, 362.07, 361.65, 356.45, 354.8, 353.39, 357.81, 359.16, 358.3, 358.81, 359.54, 358.91, 357.6, 356.99, 357.08, 357.66, 355.78, 355.26, 354.4, 355.43, 353.81, 353.29], '1W': [375.15, 348.11, 348.15, 372.87, 353.29], '1M': [294.65, 312.28, 322.5, 320.92, 294.81, 306.11, 311.64, 308.17, 340.4, 354.37, 350.45, 353.32, 372.59, 388.23, 364.96, 359.61, 375.15, 348.11, 348.15, 372.87, 353.29], 'YTD': [209.37, 210.99, 257.29, 262.19, 255.36, 273.26, 314.27, 329.24, 340.42, 305.02, 308.31, 329.78, 298.29, 331.9, 378.94, 380.22, 385.68, 387.03, 354.97, 309.06, 339.65, 312.28, 311.64, 350.45, 359.61, 353.29], '6M': [221.99, 219.59, 253.86, 263.03, 261.82, 279.17, 314.12, 329.24, 340.42, 305.02, 308.31, 329.78, 298.29, 339.32, 385.73, 385, 369.08, 345.63, 339.42, 309.06, 339.65, 312.28, 311.64, 350.45, 359.61, 353.29], '1Y': [133.59, 141.13, 139.42, 142.84, 144.07, 139.81, 162.52, 150.41, 154.44, 145.25, 157.25, 157.79, 170.77, 176.2, 174.92, 189.96, 190.46, 208.05, 225.8, 212.79, 199.22, 205.92, 213.44, 221.47, 204.49, 217.23, 221.99, 219.59, 253.86, 263.03, 261.82, 279.17, 314.27, 329.24, 340.42, 305.02, 308.31, 329.78, 298.29, 339.32, 385.73, 385, 369.08, 345.63, 339.42, 309.06, 339.65, 312.28, 311.64, 350.45, 359.61, 353.29] },
      velocityScore: { '1D': 4.7, '1W': 23.3, '1M': -34.3, '6M': null }, isNew: false,
      marketCap: '$14B', pe: 73.4, revenueGrowth: 26, eps: 4.81, grossMargin: 39, dividendYield: 0.11,
      etfPresence: { POW: 1.1, VOLT: 4.46, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 2.56, proScore: 1.02, coverage: 0.4,
      price: 72.9, weeklyPrices: [77.53, 77.92, 75.06, 74.34, 72.90], weeklyChange: -5.97, dayChange: -1.94, sortRank: 0, periodReturns: { '1M': 4.1, 'YTD': 21.3, '6M': 21.3, '1Y': 24.1 },
      priceHistory: { '1D': [74.34, 74.07, 73.83, 73.23, 72.75, 72.5, 72.63, 72.68, 72.6, 72.74, 72.83, 72.86, 72.8, 72.94, 72.79, 72.83, 72.82, 72.97, 72.88, 73.08, 72.98, 72.82, 72.8, 72.9], '1W': [77.53, 77.92, 75.06, 74.34, 72.9], '1M': [70.04, 71.31, 71.66, 72.43, 71.96, 71.59, 71.59, 72.26, 71.62, 72.08, 71.48, 71.25, 73.12, 74.95, 75.79, 75.87, 77.53, 77.92, 75.06, 74.34, 72.9], 'YTD': [60.11, 61.15, 60.29, 64.96, 67.26, 66.92, 72.28, 72.98, 76.26, 73.18, 73.89, 73.6, 72.47, 72.59, 71.54, 70.91, 71.61, 75.41, 74.18, 77.69, 76.34, 71.31, 71.59, 71.48, 75.87, 72.9], '6M': [60.85, 60.32, 61.55, 64.29, 66.34, 67.85, 71.96, 72.98, 76.26, 73.18, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 76.12, 74.73, 77.69, 76.34, 71.31, 71.59, 71.48, 75.87, 72.9], '1Y': [58.72, 57.85, 58.48, 57.71, 59.24, 58.64, 57.86, 56.57, 57.13, 57.73, 58.76, 59.02, 62.86, 63.69, 63.5, 63.78, 62.16, 56.98, 57.54, 60.43, 59.17, 59.37, 61.55, 60.5, 58.84, 59.46, 60.85, 60.32, 61.55, 64.29, 66.34, 67.85, 72.28, 72.98, 76.26, 73.18, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 76.12, 74.73, 77.69, 76.34, 71.31, 71.59, 71.48, 75.87, 72.9] },
      velocityScore: { '1D': -2.9, '1W': -2.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$89B', pe: 32, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.82,
      etfPresence: { POW: false, VOLT: 1.46, PBD: false, PBW: false, IVEP: 3.66 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'JCI', name: 'JOHNSON CONTROLS INTERNATIONAL PLC', easyScore: 2, avgWeight: 2.51, proScore: 1, coverage: 0.4,
      price: 146.19, weeklyPrices: [145.49, 138.40, 140.47, 146.11, 146.19], weeklyChange: 0.48, dayChange: 0.05, sortRank: 0, periodReturns: { '1M': 9.2, 'YTD': 22.1, '6M': 22.1, '1Y': 39.7 },
      priceHistory: { '1D': [146.11, 144.39, 146.3, 146.6, 146.31, 146.28, 146.83, 147.52, 148.08, 148.74, 148.68, 149.82, 150.46, 150.09, 148.79, 148.8, 148.1, 147.93, 148.07, 147.69, 147.82, 146.21, 145.99, 146.19], '1W': [145.49, 138.4, 140.47, 146.11, 146.19], '1M': [133.91, 141.99, 146.96, 147.4, 143.65, 144.05, 147.75, 139.36, 144.01, 144.96, 145.17, 143.62, 144.82, 148.21, 141.28, 142.81, 145.49, 138.4, 140.47, 146.11, 146.19], 'YTD': [119.75, 111.29, 112.95, 113.59, 119.26, 137.65, 139.24, 142.83, 145.46, 133.09, 131.69, 133.27, 126.58, 133.75, 142.82, 140.98, 143.38, 144.4, 141.78, 137.31, 140.22, 141.99, 147.75, 145.17, 142.81, 146.19], '6M': [122.31, 110.85, 114.61, 115.07, 122.98, 139, 142.21, 142.83, 145.46, 133.09, 131.69, 133.27, 126.58, 133.15, 142.05, 139.72, 141.59, 144.82, 141.04, 137.31, 140.22, 141.99, 147.75, 145.17, 142.81, 146.19], '1Y': [104.67, 106.5, 107.28, 110.13, 104.02, 104.67, 105.77, 104.52, 108.46, 105.34, 107.8, 107.41, 106.54, 108.89, 108.43, 110.82, 108.54, 113.34, 120.86, 122.66, 114.44, 114.65, 114.22, 115.81, 116.38, 121.39, 122.31, 110.85, 114.61, 115.07, 122.98, 139, 139.24, 142.83, 145.46, 133.09, 131.69, 133.27, 126.58, 133.15, 142.05, 139.72, 141.59, 144.82, 141.04, 137.31, 140.22, 141.99, 147.75, 145.17, 142.81, 146.19] },
      velocityScore: { '1D': 2, '1W': 3.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$89B', pe: 44.7, revenueGrowth: 8, eps: 3.27, grossMargin: 37, dividendYield: 1.1,
      etfPresence: { POW: false, VOLT: 1.39, PBD: false, PBW: false, IVEP: 3.63 },
      tonyNote: 'JOHNSON CONTROLS INTERNATIONAL PLC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VST', name: 'Vistra Corp', easyScore: 2, avgWeight: 2.29, proScore: 0.91, coverage: 0.4,
      price: 152.6, weeklyPrices: [167.77, 163.49, 162.38, 158.63, 152.60], weeklyChange: -9.04, dayChange: -3.8, sortRank: 0, periodReturns: { '1M': -1.4, 'YTD': -5.4, '6M': -5.4, '1Y': -17.6 },
      priceHistory: { '1D': [158.63, 155.38, 155.73, 155.37, 155.9, 155.5, 153.4, 152.84, 152.09, 152.63, 152.87, 152.77, 152.25, 151.58, 152.18, 153.04, 152.84, 152.75, 152.97, 153.46, 153.19, 152.83, 152.79, 152.6], '1W': [167.77, 163.49, 162.38, 158.63, 152.6], '1M': [154.76, 157.97, 153.8, 153.7, 148.76, 146.9, 146.22, 138.54, 146.38, 148.02, 158.61, 158.83, 163.75, 167.26, 162.39, 162.87, 167.77, 163.49, 162.38, 158.63, 152.6], 'YTD': [161.33, 150.6, 180.18, 160.12, 158.35, 149.65, 171.49, 167.8, 165.99, 163.62, 161.99, 151.29, 147.54, 151.59, 158.2, 159.6, 166.58, 160.85, 152.05, 136.75, 164.56, 157.97, 146.22, 158.61, 162.87, 152.6], '6M': [165.23, 166.37, 166.6, 158.81, 154.26, 152.97, 173.68, 167.8, 165.99, 163.62, 161.99, 151.29, 147.54, 153.68, 163.97, 154.91, 161.12, 160.38, 146.87, 136.75, 164.56, 157.97, 146.22, 158.61, 162.87, 152.6], '1Y': [185.1, 197.01, 184.13, 200.12, 207.05, 200.85, 205.28, 193.52, 195.12, 188.12, 209.21, 208.31, 202.06, 201.51, 206.55, 210.85, 185.83, 199.37, 189.39, 178.27, 174.42, 170.84, 171.65, 165.17, 159.97, 161.96, 165.23, 166.37, 166.6, 158.81, 154.26, 152.97, 171.49, 167.8, 165.99, 163.62, 161.99, 151.29, 147.54, 153.68, 163.97, 154.91, 161.12, 160.38, 146.87, 136.75, 164.56, 157.97, 146.22, 158.61, 162.87, 152.6] },
      velocityScore: { '1D': -4.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$51B', pe: 25.5, revenueGrowth: 43, eps: 5.98, grossMargin: 39, dividendYield: 0.58,
      etfPresence: { POW: 1.37, VOLT: false, PBD: false, PBW: false, IVEP: 3.2 },
      tonyNote: 'Vistra Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CEG', name: 'Constellation Energy Corp', easyScore: 2, avgWeight: 2.16, proScore: 0.86, coverage: 0.4,
      price: 232.99, weeklyPrices: [268.69, 264.02, 259.32, 248.37, 232.99], weeklyChange: -13.29, dayChange: -6.19, sortRank: 0, periodReturns: { '1M': -12.3, 'YTD': -34, '6M': -34, '1Y': -24.3 },
      priceHistory: { '1D': [248.37, 242.52, 240.99, 236.63, 237.18, 234.32, 230.1, 232.79, 233.13, 233.35, 234.25, 234.9, 234.45, 233.34, 233.36, 233.38, 233.08, 233.13, 233.99, 234.26, 232.95, 232.73, 232.99, 232.99], '1W': [268.69, 264.02, 259.32, 248.37, 232.99], '1M': [265.7, 272.65, 267.24, 264.59, 254.83, 250.67, 251.65, 242.3, 246.71, 253.76, 268, 267.17, 274.06, 275.53, 270.26, 267.97, 268.69, 264.02, 259.32, 248.37, 232.99], 'YTD': [353.27, 322.54, 341.2, 289.06, 280.68, 261.42, 288.43, 293.8, 327.16, 322.99, 305.58, 289.76, 298.61, 275.16, 291.72, 287.56, 315.17, 321.05, 299.69, 262, 301.57, 272.65, 251.65, 268, 267.97, 232.99], '6M': [366.25, 342.52, 307.71, 285.27, 270.88, 272.15, 303.01, 293.8, 327.16, 322.99, 305.58, 289.76, 298.61, 272.58, 296.61, 277.7, 305.71, 320.42, 293.6, 262, 301.57, 272.65, 251.65, 268, 267.97, 232.99], '1Y': [307.92, 317.11, 308.2, 323.7, 345.27, 338.46, 327.63, 317.23, 316.58, 308.48, 320, 321.27, 339.13, 350.9, 371, 403.95, 350.06, 401.43, 363.25, 354.02, 339.35, 351.6, 361.26, 362.07, 340.97, 363.95, 366.25, 342.52, 307.71, 285.27, 270.88, 272.15, 288.43, 293.8, 327.16, 322.99, 305.58, 289.76, 298.61, 272.58, 296.61, 277.7, 305.71, 320.42, 293.6, 262, 301.57, 272.65, 251.65, 268, 267.97, 232.99] },
      velocityScore: { '1D': -5.5, '1W': -10.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$83B', pe: 20.3, revenueGrowth: 64, eps: 11.5, grossMargin: 23, dividendYield: 0.69,
      etfPresence: { POW: 1.16, VOLT: false, PBD: false, PBW: false, IVEP: 3.16 },
      tonyNote: 'Constellation Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TLN', name: 'Talen Energy Corp', easyScore: 2, avgWeight: 2.14, proScore: 0.86, coverage: 0.4,
      price: 359.31, weeklyPrices: [416.80, 404.09, 399.34, 384.26, 359.31], weeklyChange: -13.79, dayChange: -6.49, sortRank: 0, periodReturns: { '1M': -4.7, 'YTD': -4.1, '6M': -4.1, '1Y': 28.3 },
      priceHistory: { '1D': [384.26, 379.07, 374.91, 374.55, 372.11, 369.8, 362.28, 360.62, 359.73, 361.43, 361.98, 363.01, 363.41, 360.73, 360.23, 360.65, 362.83, 361.21, 362, 363.86, 362.46, 362.1, 360.8, 359.31], '1W': [416.8, 404.09, 399.34, 384.26, 359.31], '1M': [377.2, 385.51, 379.59, 378.08, 364.74, 364.78, 358.74, 336.59, 344.8, 360.54, 406.51, 409.81, 436.29, 438.12, 411.92, 405.89, 416.8, 404.09, 399.34, 384.26, 359.31], 'YTD': [374.84, 356, 419.07, 366.43, 348.36, 345, 376.7, 367.84, 353.24, 335.11, 317.6, 311.02, 313.03, 324.09, 326.08, 346.26, 369.67, 384.64, 383.44, 324.21, 389, 385.51, 358.74, 406.51, 405.89, 359.31], '6M': [396.73, 370.83, 371.66, 350.41, 340.8, 353.66, 388.28, 367.84, 353.24, 335.11, 317.6, 311.02, 313.03, 330.07, 345.76, 329.74, 361.17, 384.9, 374.61, 324.21, 389, 385.51, 358.74, 406.51, 405.89, 359.31], '1Y': [279.99, 272.15, 264.78, 339.24, 373.36, 378.67, 380.25, 368.16, 378.79, 377.76, 402.65, 408.09, 416.94, 426.99, 445.84, 415.81, 380.69, 398.55, 403.49, 367.54, 374.8, 378.99, 365.46, 358.5, 351.96, 383.58, 396.73, 370.83, 371.66, 350.41, 340.8, 353.66, 376.7, 367.84, 353.24, 335.11, 317.6, 311.02, 313.03, 330.07, 345.76, 329.74, 361.17, 384.9, 374.61, 324.21, 389, 385.51, 358.74, 406.51, 405.89, 359.31] },
      velocityScore: { '1D': -4.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$17B', pe: null, revenueGrowth: 97, eps: -0.54, grossMargin: 40, dividendYield: null,
      etfPresence: { POW: 1.59, VOLT: false, PBD: false, PBW: false, IVEP: 2.69 },
      tonyNote: 'Talen Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX TECHNOLOGIES INC', easyScore: 2, avgWeight: 2.04, proScore: 0.82, coverage: 0.4,
      price: 192.49, weeklyPrices: [204.77, 197.91, 189.25, 194.65, 192.49], weeklyChange: -6, dayChange: -1.11, sortRank: 0, periodReturns: { '1M': 2.2, 'YTD': 11.4, '6M': 11.4, '1Y': 37.1 },
      priceHistory: { '1D': [194.65, 192.49, 193.07, 193.6, 194.74, 192.59, 192.39, 192.46, 193.52, 194.03, 193.84, 194.22, 193.89, 193.76, 192.69, 192.52, 193.27, 193.07, 192.57, 193.45, 192.57, 192.57, 192.02, 192.49], '1W': [204.77, 197.91, 189.25, 194.65, 192.49], '1M': [188.39, 187.26, 184.72, 190.76, 185.95, 187.46, 188.96, 183, 194.68, 193.45, 196.93, 203.07, 205.4, 210, 209.89, 205.65, 204.77, 197.91, 189.25, 194.65, 192.49], 'YTD': [172.84, 193.2, 213.25, 207.75, 205.43, 197.19, 200.4, 198.38, 216.47, 200.39, 204.67, 204.85, 191.59, 215.98, 232.83, 228.24, 222.07, 216.68, 210.8, 201.94, 204.38, 187.26, 188.96, 196.93, 205.65, 192.49], '6M': [181.85, 201.46, 217.89, 206.04, 206.04, 203, 201.09, 198.38, 216.47, 200.39, 204.67, 204.85, 191.59, 214.44, 238.27, 216.66, 216.18, 206.15, 206.83, 201.94, 204.38, 187.26, 188.96, 196.93, 205.65, 192.49], '1Y': [140.37, 137.56, 139.85, 143.37, 152.38, 179.74, 176.76, 165.76, 166.52, 160.95, 166.13, 168.38, 175.02, 187.18, 197.01, 203.82, 191.17, 213.69, 198.12, 196.77, 175.91, 175.26, 174.71, 179.65, 168.12, 177.18, 181.85, 201.46, 217.89, 206.04, 206.04, 203, 200.4, 198.38, 216.47, 200.39, 204.67, 204.85, 191.59, 214.44, 238.27, 216.66, 216.18, 206.15, 206.83, 201.94, 204.38, 187.26, 188.96, 196.93, 205.65, 192.49] },
      velocityScore: { '1D': null, '1W': -7.9, '1M': null, '6M': null }, isNew: true,
      marketCap: '$18B', pe: 51.2, revenueGrowth: 26, eps: 3.76, grossMargin: 23, dividendYield: 0.53,
      etfPresence: { POW: false, VOLT: 1.96, PBD: false, PBW: false, IVEP: 2.12 },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 5.25, proScore: 2.1, coverage: 0.4,
      price: 987.26, weeklyPrices: [1057.01, 997.47, 1033.19, 1064.90, 987.26], weeklyChange: -6.6, dayChange: -7.29, sortRank: 0, periodReturns: { '1M': 14.1, 'YTD': 72.3, '6M': 72.3, '1Y': 152.5 },
      priceHistory: { '1D': [1064.9, 1022.24, 1036.89, 1029.33, 1017.95, 1012.98, 1010.33, 1004.68, 1008.98, 1019.26, 1018.59, 1017.92, 1017.65, 1013.8, 1007.21, 1002.85, 1000.49, 996.73, 996.68, 995.43, 991.36, 988.22, 986.8, 987.26], '1W': [1057.01, 997.47, 1033.19, 1064.9, 987.26], '1M': [865.36, 909.81, 926.18, 940.48, 904.28, 915.64, 914.7, 856.16, 897.63, 910.57, 945.46, 955.92, 985.82, 1022.28, 984.24, 994.45, 1057.01, 997.47, 1033.19, 1064.9, 987.26], 'YTD': [572.87, 608.13, 647.18, 626.62, 657.36, 726.2, 774.2, 756.47, 752.32, 704.82, 699.78, 701.7, 667.43, 721.24, 791.73, 798.4, 828.79, 874.78, 926.79, 863.95, 908.55, 909.81, 914.7, 945.46, 994.45, 987.26], '6M': [598.41, 617.62, 646.89, 635.92, 690.91, 742.12, 764.76, 756.47, 752.32, 704.82, 699.78, 701.7, 667.43, 724.44, 794.25, 800.45, 817.87, 904.59, 912.14, 863.95, 908.55, 909.81, 914.7, 945.46, 994.45, 987.26], '1Y': [390.92, 402.18, 412.88, 427.59, 434.12, 427.72, 413.7, 416.09, 431.26, 415.12, 422.91, 450.66, 469.79, 480.82, 502.12, 534.05, 513.91, 585.49, 569.15, 573.02, 546.88, 566.61, 591.49, 615.35, 561.89, 583.76, 598.41, 617.62, 646.89, 635.92, 690.91, 742.12, 774.2, 756.47, 752.32, 704.82, 699.78, 701.7, 667.43, 724.44, 794.25, 800.45, 817.87, 904.59, 912.14, 863.95, 908.55, 909.81, 914.7, 945.46, 994.45, 987.26] },
      velocityScore: { '1D': 0.5, '1W': 1.9, '1M': -32, '6M': null }, isNew: false,
      marketCap: '$455B', pe: 49, revenueGrowth: 22, eps: 20.13, grossMargin: 29, dividendYield: 0.61,
      etfPresence: { AIRR: false, PRN: 3.61, RSHO: 6.89, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 5.06, proScore: 2.02, coverage: 0.4,
      price: 773, weeklyPrices: [881.92, 804.76, 813.77, 839.36, 773.00], weeklyChange: -12.35, dayChange: -7.91, sortRank: 0, periodReturns: { '1M': -8.6, 'YTD': 152.4, '6M': 152.4, '1Y': 247.4 },
      priceHistory: { '1D': [839.36, 784.48, 793.16, 791.04, 793.86, 787.03, 786.8, 786.14, 792.65, 801.72, 799.42, 796.9, 795.78, 796.2, 790.16, 788.14, 784.65, 781.49, 782.11, 781.83, 780.56, 776.58, 776.81, 773], '1W': [881.92, 804.76, 813.77, 839.36, 773], '1M': [845.39, 875.52, 957.03, 993.74, 882.43, 891.86, 842.01, 770.25, 838.55, 858.99, 857.76, 838.21, 861.88, 932.75, 892.25, 867.23, 881.92, 804.76, 813.77, 839.36, 773], 'YTD': [306.23, 297.62, 336.31, 351.39, 357.91, 401.29, 437.77, 434.64, 432.87, 411.38, 417.76, 422.55, 382.55, 393.71, 459.02, 472.9, 505.45, 529.49, 868.18, 770.76, 783.53, 875.52, 842.01, 857.76, 867.23, 773], '6M': [319.16, 308.13, 350.96, 361.21, 367.95, 418.61, 421.2, 434.64, 432.87, 411.38, 417.76, 422.55, 382.55, 382.22, 464.54, 472.84, 471.85, 806, 851.35, 770.76, 783.53, 875.52, 842.01, 857.76, 867.23, 773], '1Y': [222.54, 233.39, 243.23, 253.14, 263.35, 299.42, 292.47, 276.02, 292.95, 273.82, 301.13, 320.94, 344.05, 337.93, 366.99, 365.39, 332.75, 403.35, 411.07, 380.7, 333.88, 332.96, 323.46, 331.61, 283.57, 314, 319.16, 308.13, 350.96, 361.21, 367.95, 418.61, 437.77, 434.64, 432.87, 411.38, 417.76, 422.55, 382.55, 382.22, 464.54, 472.84, 471.85, 806, 851.35, 770.76, 783.53, 875.52, 842.01, 857.76, 867.23, 773] },
      velocityScore: { '1D': 1.5, '1W': -8.6, '1M': -40.8, '6M': null }, isNew: false,
      marketCap: '$24B', pe: 69.3, revenueGrowth: 92, eps: 11.16, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 6, PRN: 4.12, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 4.91, proScore: 1.96, coverage: 0.4,
      price: 263.65, weeklyPrices: [309.20, 279.77, 281.09, 286.36, 263.65], weeklyChange: -14.73, dayChange: -7.93, sortRank: 0, periodReturns: { '1M': -8.5, 'YTD': 148.1, '6M': 148.1, '1Y': 276.6 },
      priceHistory: { '1D': [286.36, 266.74, 271.42, 269.4, 269.32, 266.71, 267.85, 269.21, 271.85, 275.82, 272.9, 272.75, 273.4, 273.04, 270.84, 268.91, 267.48, 266.46, 266.47, 264.51, 264.77, 264.49, 263.56, 263.65], '1W': [309.2, 279.77, 281.09, 286.36, 263.65], '1M': [288.12, 299.07, 299.73, 300.06, 284.87, 293.6, 283.51, 262.34, 290.5, 294.75, 292.7, 294.03, 297.2, 307.8, 291.5, 294.49, 309.2, 279.77, 281.09, 286.36, 263.65], 'YTD': [106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 181.38, 177.5, 173.36, 170.61, 180.86, 167.52, 186.72, 228.99, 241.65, 260.52, 269.95, 322.05, 266.8, 291.97, 299.07, 283.51, 292.7, 294.49, 263.65], '6M': [117.51, 121.83, 139.99, 141.15, 146.79, 187.3, 187.21, 181.38, 177.5, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 266.8, 291.97, 299.07, 283.51, 292.7, 294.49, 263.65], '1Y': [70.01, 70.64, 72.53, 78.32, 76.88, 75.95, 86.57, 84.7, 91.08, 85.72, 92.33, 97.11, 97.88, 105.74, 105.13, 109.92, 110.96, 136.12, 131.92, 118.74, 107.22, 104.18, 107.83, 119.95, 105.77, 112.06, 117.51, 121.83, 139.99, 141.15, 146.79, 187.3, 195.02, 181.38, 177.5, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 266.8, 291.97, 299.07, 283.51, 292.7, 294.49, 263.65] },
      velocityScore: { '1D': 0, '1W': -1.5, '1M': -40.8, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 51.4, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { AIRR: 2.48, PRN: false, RSHO: 7.33, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, avgWeight: 4.82, proScore: 1.93, coverage: 0.4,
      price: 757.41, weeklyPrices: [753.07, 765.46, 791.56, 798.55, 757.41], weeklyChange: 0.58, dayChange: -5.15, sortRank: 0, periodReturns: { '1M': 17.1, 'YTD': 141.7, '6M': 141.7, '1Y': 271.7 },
      priceHistory: { '1D': [798.55, 756.24, 773.11, 768.68, 767.43, 757.67, 758.73, 762.22, 769.23, 777.05, 776.92, 770.32, 767.49, 769.42, 762.54, 766.2, 766.03, 771.41, 766.45, 767.18, 758.49, 760.11, 759.22, 757.41], '1W': [753.07, 765.46, 791.56, 798.55, 757.41], '1M': [646.89, 663.14, 686.37, 689.43, 694.72, 619.98, 613.93, 588.9, 623.66, 641.68, 690.39, 719.52, 738.85, 790, 736.77, 732.24, 753.07, 765.46, 791.56, 798.55, 757.41], 'YTD': [313.32, 313.98, 329.66, 363.88, 347.11, 352.09, 409.95, 441.71, 445.36, 466.38, 466.52, 463.15, 513.98, 572.31, 598.44, 611.21, 660.85, 697.15, 683.52, 664.76, 670.66, 663.14, 613.93, 690.39, 732.24, 757.41], '6M': [325.96, 311.87, 383.66, 353.5, 355.77, 370, 406.88, 441.71, 445.36, 466.38, 466.52, 463.15, 513.98, 576.95, 603.91, 615.42, 630.7, 720, 681.01, 664.76, 670.66, 663.14, 613.93, 690.39, 732.24, 757.41], '1Y': [203.78, 206.63, 213.25, 216.2, 240.5, 229.9, 229.52, 213.76, 230.02, 227.03, 225.82, 239.42, 260.56, 279.62, 281.67, 312.5, 267.62, 292.22, 324.93, 364.78, 344.36, 373.29, 351.09, 325.77, 296.56, 328.26, 325.96, 311.87, 383.66, 353.5, 355.77, 370, 409.95, 441.71, 445.36, 466.38, 466.52, 463.15, 513.98, 576.95, 603.91, 615.42, 630.7, 720, 681.01, 664.76, 670.66, 663.14, 613.93, 690.39, 732.24, 757.41] },
      velocityScore: { '1D': -0.5, '1W': 5.5, '1M': -26.9, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 66.3, revenueGrowth: 50, eps: 11.42, grossMargin: 21, dividendYield: 0.25,
      etfPresence: { AIRR: 4.73, PRN: 4.9, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Argan Inc is an engineering and construction company for power generation facilities — natural gas and renewable power plants. It appears in Industrials ETFs because power plant construction is one of the fastest-growing categories in U.S. infrastructure spending, driven by data center load additions that the grid cannot currently support.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.55, proScore: 1.82, coverage: 0.4,
      price: 1854.98, weeklyPrices: [2017.57, 1854.23, 1948.69, 1981.95, 1854.98], weeklyChange: -8.06, dayChange: -6.41, sortRank: 0, periodReturns: { '1M': 3.8, 'YTD': 98.8, '6M': 98.8, '1Y': 255.6 },
      priceHistory: { '1D': [1981.95, 1895, 1903.03, 1897.34, 1894.97, 1875.71, 1874.73, 1863.59, 1869.61, 1894.42, 1890.21, 1894.99, 1888.5, 1890.19, 1878.16, 1874.17, 1870.49, 1863.66, 1865.85, 1864.51, 1863, 1860.27, 1858.57, 1854.98], '1W': [2017.57, 1854.23, 1948.69, 1981.95, 1854.98], '1M': [1787.88, 1883.26, 1850.04, 1914.65, 1843.94, 1852.03, 1831.56, 1719.48, 1843.42, 1877.61, 1913.94, 1931.77, 1967.41, 2066.51, 1908.07, 1954.47, 2017.57, 1854.23, 1948.69, 1981.95, 1854.98], 'YTD': [933.29, 971.49, 1091.04, 1121.44, 1142.1, 1230.26, 1337.95, 1413.57, 1438.24, 1372.4, 1414.1, 1408.25, 1273.18, 1434.09, 1627.81, 1680.09, 1794.04, 1891.95, 2032.98, 1854.43, 1883.56, 1883.26, 1831.56, 1913.94, 1954.47, 1854.98], '6M': [1003.64, 1010.41, 1119.98, 1127.55, 1176.26, 1283.65, 1337.75, 1413.57, 1438.24, 1372.4, 1414.1, 1408.25, 1273.18, 1424.91, 1650.48, 1674.16, 1719.21, 1967.24, 2016.31, 1854.43, 1883.56, 1883.26, 1831.56, 1913.94, 1954.47, 1854.98], '1Y': [521.66, 535.02, 546.63, 547.91, 702.97, 690.45, 702.1, 683.93, 707.39, 700.69, 752.1, 762.91, 791.46, 834.33, 844.62, 837.11, 790.72, 1010.64, 987.78, 973.18, 920.99, 957.04, 949.3, 1021.36, 883.79, 958.07, 1003.64, 1010.41, 1119.98, 1127.55, 1176.26, 1283.65, 1337.95, 1413.57, 1438.24, 1372.4, 1414.1, 1408.25, 1273.18, 1424.91, 1650.48, 1674.16, 1719.21, 1967.24, 2016.31, 1854.43, 1883.56, 1883.26, 1831.56, 1913.94, 1954.47, 1854.98] },
      velocityScore: { '1D': 0, '1W': 0.6, '1M': -34.1, '6M': null }, isNew: false,
      marketCap: '$65B', pe: 53.5, revenueGrowth: 1, eps: 34.68, grossMargin: 25, dividendYield: 0.13,
      etfPresence: { AIRR: 4.41, PRN: 4.7, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.92, proScore: 1.57, coverage: 0.4,
      price: 333.33, weeklyPrices: [343.54, 337.08, 334.16, 338.15, 333.33], weeklyChange: -2.97, dayChange: -1.42, sortRank: 0, periodReturns: { '1M': 10.7, 'YTD': 29.8, '6M': 29.8, '1Y': 37.7 },
      priceHistory: { '1D': [338.15, 334.61, 337.78, 338.48, 335.85, 335.23, 336.06, 335.71, 335.23, 335.68, 336.74, 336.85, 336.4, 336.24, 335.31, 335.93, 335.04, 334.49, 334.4, 333.98, 333.61, 333.4, 333.67, 333.33], '1W': [343.54, 337.08, 334.16, 338.15, 333.33], '1M': [300.98, 308.31, 313.39, 313.67, 315.29, 314.42, 322.81, 314.08, 318.89, 320.11, 324.38, 329.89, 337.96, 338.07, 330.9, 333.78, 343.54, 337.08, 334.16, 338.15, 333.33], 'YTD': [256.77, 264.62, 282.47, 280.14, 260.41, 291.74, 279.84, 278.74, 283.54, 267.57, 256.83, 262.23, 258.01, 269.55, 293.26, 293.92, 298.1, 303.99, 310.55, 305.22, 311.33, 308.31, 322.81, 324.38, 333.78, 333.33], '6M': [259.63, 272.25, 281.21, 281.54, 270.02, 282.45, 278.31, 278.74, 283.54, 267.57, 256.83, 262.23, 258.01, 272.54, 292.01, 293.59, 301.24, 305.48, 313.7, 305.22, 311.33, 308.31, 322.81, 324.38, 333.78, 333.33], '1Y': [242.14, 251.4, 255.52, 267.01, 273.62, 264.97, 275.72, 262.92, 266.99, 261.53, 263.45, 259.5, 259.37, 257.98, 255.19, 247.97, 253.5, 254.1, 257.9, 256.26, 242.61, 255.78, 260.88, 264.32, 256.73, 264.33, 259.63, 272.25, 281.21, 281.54, 270.02, 282.45, 279.84, 278.74, 283.54, 267.57, 256.83, 262.23, 258.01, 272.54, 292.01, 293.59, 301.24, 305.48, 313.7, 305.22, 311.33, 308.31, 322.81, 324.38, 333.78, 333.33] },
      velocityScore: { '1D': 0, '1W': 0, '1M': -26.6, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 31.5, revenueGrowth: 7, eps: 10.58, grossMargin: 30, dividendYield: 0.6,
      etfPresence: { AIRR: 1.8, PRN: false, RSHO: 6.04, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 2.82, proScore: 1.13, coverage: 0.4,
      price: 232.95, weeklyPrices: [244.56, 231.87, 238.21, 245.17, 232.95], weeklyChange: -4.75, dayChange: -4.98, sortRank: 0, periodReturns: { '1M': 5.4, 'YTD': 16.4, '6M': 16.4, '1Y': 37.9 },
      priceHistory: { '1D': [245.17, 236.88, 239.85, 242.02, 239.7, 240.67, 239.43, 239.9, 238.04, 239.55, 239.29, 239.2, 238.84, 238.45, 237.2, 236.76, 234.7, 234.59, 234.49, 234.4, 233.86, 233.01, 233.42, 232.95], '1W': [244.56, 231.87, 238.21, 245.17, 232.95], '1M': [220.92, 230.08, 234.08, 236.14, 227.8, 229.95, 228.01, 223.63, 233.49, 230.05, 234.8, 235.29, 242.97, 246.41, 236.07, 237.22, 244.56, 231.87, 238.21, 245.17, 232.95], 'YTD': [200.06, 207.44, 213.61, 211.03, 208.41, 222.32, 239, 237.18, 225.02, 209.8, 203.42, 194.52, 190.71, 196.9, 221.27, 217.61, 222.45, 201.12, 203.24, 200.47, 219.08, 230.08, 228.01, 234.8, 237.22, 232.95], '6M': [203.26, 207.51, 217.65, 215.21, 212.73, 223.86, 241.6, 237.18, 225.02, 209.8, 203.42, 194.52, 190.71, 195.43, 224.82, 216.49, 216.36, 207.81, 198.99, 200.47, 219.08, 230.08, 228.01, 234.8, 237.22, 232.95], '1Y': [168.95, 172.78, 175.13, 175.58, 181.26, 203.53, 191.88, 188, 192.05, 182.65, 188, 184.91, 182.39, 185.92, 188.45, 185.21, 187.4, 200, 223.06, 219.09, 204.36, 215.7, 209.57, 217.69, 207.33, 208.48, 203.26, 207.51, 217.65, 215.21, 212.73, 223.86, 239, 237.18, 225.02, 209.8, 203.42, 194.52, 190.71, 195.43, 224.82, 216.49, 216.36, 207.81, 198.99, 200.47, 219.08, 230.08, 228.01, 234.8, 237.22, 232.95] },
      velocityScore: { '1D': 0.9, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 44.6, revenueGrowth: 17, eps: 5.22, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.68, PRN: false, RSHO: 3.96, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 2, avgWeight: 2.33, proScore: 0.93, coverage: 0.4,
      price: 192.49, weeklyPrices: [204.77, 197.91, 189.25, 194.65, 192.49], weeklyChange: -6, dayChange: -1.11, sortRank: 0, periodReturns: { '1M': 2.2, 'YTD': 11.4, '6M': 11.4, '1Y': 37.1 },
      priceHistory: { '1D': [194.65, 192.49, 193.07, 193.6, 194.74, 192.59, 192.39, 192.46, 193.52, 194.03, 193.84, 194.22, 193.89, 193.76, 192.69, 192.52, 193.27, 193.07, 192.57, 193.45, 192.57, 192.57, 192.02, 192.49], '1W': [204.77, 197.91, 189.25, 194.65, 192.49], '1M': [188.39, 187.26, 184.72, 190.76, 185.95, 187.46, 188.96, 183, 194.68, 193.45, 196.93, 203.07, 205.4, 210, 209.89, 205.65, 204.77, 197.91, 189.25, 194.65, 192.49], 'YTD': [172.84, 193.2, 213.25, 207.75, 205.43, 197.19, 200.4, 198.38, 216.47, 200.39, 204.67, 204.85, 191.59, 215.98, 232.83, 228.24, 222.07, 216.68, 210.8, 201.94, 204.38, 187.26, 188.96, 196.93, 205.65, 192.49], '6M': [181.85, 201.46, 217.89, 206.04, 206.04, 203, 201.09, 198.38, 216.47, 200.39, 204.67, 204.85, 191.59, 214.44, 238.27, 216.66, 216.18, 206.15, 206.83, 201.94, 204.38, 187.26, 188.96, 196.93, 205.65, 192.49], '1Y': [140.37, 137.56, 139.85, 143.37, 152.38, 179.74, 176.76, 165.76, 166.52, 160.95, 166.13, 168.38, 175.02, 187.18, 197.01, 203.82, 191.17, 213.69, 198.12, 196.77, 175.91, 175.26, 174.71, 179.65, 168.12, 177.18, 181.85, 201.46, 217.89, 206.04, 206.04, 203, 200.4, 198.38, 216.47, 200.39, 204.67, 204.85, 191.59, 214.44, 238.27, 216.66, 216.18, 206.15, 206.83, 201.94, 204.38, 187.26, 188.96, 196.93, 205.65, 192.49] },
      velocityScore: { '1D': 1.1, '1W': -9.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: 51.2, revenueGrowth: 26, eps: 3.76, grossMargin: 23, dividendYield: 0.53,
      etfPresence: { AIRR: 2.97, PRN: false, RSHO: false, IDEF: 1.69, BILT: false },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'PL', name: 'Planet Labs PBC', easyScore: 2, avgWeight: 1.77, proScore: 0.71, coverage: 0.4,
      price: 32.68, weeklyPrices: [26.51, 27.07, 31.28, 33.13, 32.68], weeklyChange: 23.27, dayChange: -1.36, sortRank: 0, periodReturns: { '1M': -29.7, 'YTD': 65.7, '6M': 65.7, '1Y': 430.5 },
      priceHistory: { '1D': [33.13, 33.24, 33.45, 33.57, 33.79, 33.05, 32.72, 33.13, 33.82, 33.89, 33.75, 34.02, 34.12, 34.06, 33.84, 33.85, 33.7, 33.41, 33.31, 33.13, 33.04, 32.93, 32.81, 32.68], '1W': [26.51, 27.07, 31.28, 33.13, 32.68], '1M': [46.46, 48.09, 43.13, 43.53, 32.22, 32.74, 31.17, 30.72, 34.17, 31.15, 28.21, 28.22, 28.23, 28.77, 28.53, 26.3, 26.51, 27.07, 31.28, 33.13, 32.68], 'YTD': [19.72, 22.44, 28.28, 26.94, 24.97, 22.26, 22.42, 23.78, 26.36, 25.82, 24.6, 33.82, 27.89, 35.02, 34.32, 37.5, 35.45, 38.54, 41.84, 41.61, 48.32, 48.09, 31.17, 28.21, 26.3, 32.68], '6M': [20.41, 22.71, 28.78, 25.87, 22.85, 24.02, 22.21, 23.78, 26.36, 25.82, 24.6, 33.82, 27.89, 35.17, 33.93, 38.03, 35.03, 37.13, 40.68, 41.61, 48.32, 48.09, 31.17, 28.21, 26.3, 32.68], '1Y': [6.16, 6.85, 6.45, 6.86, 6.28, 6.32, 6.74, 6.38, 6.98, 6.44, 8.97, 10.23, 11.93, 13.77, 15.6, 15.09, 12.5, 12.9, 13.25, 12.44, 11.45, 11.73, 12.01, 12.94, 16.47, 20.32, 20.41, 22.71, 28.78, 25.87, 22.85, 24.02, 22.42, 23.78, 26.36, 25.82, 24.6, 33.82, 27.89, 35.17, 33.93, 38.03, 35.03, 37.13, 40.68, 41.61, 48.32, 48.09, 31.17, 28.21, 26.3, 32.68] },
      velocityScore: { '1D': null, '1W': null, '1M': -70, '6M': null }, isNew: true,
      marketCap: '$12B', pe: null, revenueGrowth: 42, eps: -1.16, grossMargin: 56, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 3.38, RSHO: false, IDEF: 0.17, BILT: false },
      tonyNote: 'Planet Labs is a satellite earth observation company. It holds a speculative position in Industrials ETFs as a data infrastructure name — providing satellite imagery and analytics that support agricultural, energy, and government decision-making. Revenue is growing from a small base; the ETF weight is minimal and the position is thematic.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 2, avgWeight: 1.73, proScore: 0.69, coverage: 0.4,
      price: 279.61, weeklyPrices: [279.09, 281.99, 277.39, 279.89, 279.61], weeklyChange: 0.19, dayChange: -0.1, sortRank: 0, periodReturns: { '1M': -5.7, 'YTD': -17.8, '6M': -17.8, '1Y': 13.5 },
      priceHistory: { '1D': [279.89, 283.77, 283.58, 284.38, 284.77, 283.44, 282.03, 281.4, 282.22, 281.75, 281.93, 281.68, 281.8, 281.62, 281.52, 280.63, 280.77, 280.2, 279.19, 279.7, 279.57, 279.82, 279.52, 279.61], '1W': [279.09, 281.99, 277.39, 279.89, 279.61], '1M': [296.41, 293.66, 287.54, 294.53, 293.04, 292.26, 297.52, 289.13, 300.95, 297.68, 298.51, 296.89, 285.43, 278.19, 283.48, 279.62, 279.09, 281.99, 277.39, 279.89, 279.61], 'YTD': [340.07, 378.47, 418.86, 418.58, 420.51, 397.77, 418.78, 438.01, 453.73, 429.58, 416.59, 396.57, 369.08, 407.66, 394.46, 392.19, 358.4, 363.37, 317.75, 329.35, 320.95, 293.66, 297.52, 298.51, 279.62, 279.61], '6M': [349.75, 386.99, 425.9, 413.56, 420.3, 405.82, 417.83, 438.01, 453.73, 429.58, 416.59, 396.57, 369.08, 402.28, 398.07, 378.21, 361.4, 326.13, 333.56, 329.35, 320.95, 293.66, 297.52, 298.51, 279.62, 279.61], '1Y': [246.31, 248.92, 253.82, 265.56, 258.52, 267.49, 269.43, 265.4, 271.74, 269.33, 271.93, 272.46, 277.51, 286.01, 290.83, 284.96, 283.64, 298.42, 306.68, 317.89, 309.16, 314.73, 309.23, 323.14, 321.29, 355.45, 349.75, 386.99, 425.9, 413.56, 420.3, 405.82, 418.78, 438.01, 453.73, 429.58, 416.59, 396.57, 369.08, 402.28, 398.07, 378.21, 361.4, 326.13, 333.56, 329.35, 320.95, 293.66, 297.52, 298.51, 279.62, 279.61] },
      velocityScore: { '1D': -1.4, '1W': -4.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 18.2, revenueGrowth: 13, eps: 15.39, grossMargin: 12, dividendYield: 1.97,
      etfPresence: { AIRR: 2.44, PRN: false, RSHO: false, IDEF: 1.03, BILT: false },
      tonyNote: 'Huntington Ingalls Industries is the only builder of nuclear-powered aircraft carriers for the U.S. Navy. Revenue is government-contracted and predictable; the ETF allocation in Industrials reflects defense spending growth and the Navy\'s backlog of nuclear submarine and carrier construction. A steady-state quality compounder in a market structure with no competition.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 2, avgWeight: 1.68, proScore: 0.67, coverage: 0.4,
      price: 52.55, weeklyPrices: [46.32, 47.21, 46.95, 49.86, 52.55], weeklyChange: 13.44, dayChange: 5.39, sortRank: 0, periodReturns: { '1M': -17.2, 'YTD': -30.8, '6M': -30.8, '1Y': 22 },
      priceHistory: { '1D': [49.86, 50.9, 52.79, 53.44, 53.67, 52.42, 52.19, 53.2, 53.39, 53.72, 53.76, 53.64, 53.78, 53.57, 53.58, 53.13, 53.03, 52.78, 52.6, 52.53, 52.33, 52.62, 52.67, 52.55], '1W': [46.32, 47.21, 46.95, 49.86, 52.55], '1M': [63.49, 63.27, 58.43, 63.4, 58.52, 57.73, 56.19, 54.82, 58.78, 57.75, 56.34, 56.16, 54.21, 51.09, 50.8, 47.95, 46.32, 47.21, 46.95, 49.86, 52.55], 'YTD': [75.91, 104.04, 124.56, 110.39, 103.01, 94.41, 89.06, 94.31, 90.72, 92.47, 89.53, 83.69, 65.28, 74.09, 73.55, 69.83, 63.16, 61.93, 56.99, 54.22, 56.8, 63.27, 56.19, 56.34, 47.95, 52.55], '6M': [79.29, 113.7, 130.72, 111.32, 96.16, 98.81, 91.97, 94.31, 90.72, 92.47, 89.53, 83.69, 65.28, 71.96, 73.66, 68.55, 61.66, 59.31, 57.33, 54.22, 56.8, 63.27, 56.19, 56.34, 47.95, 52.55], '1Y': [43.07, 46.02, 54.28, 58.78, 58.01, 58.93, 68.75, 64.02, 68.05, 64.5, 65.66, 75.74, 81.18, 92.96, 105.67, 90.58, 84.3, 91.21, 77.41, 76.7, 70.36, 75.05, 72.78, 76.91, 69.77, 79.97, 79.29, 113.7, 130.72, 111.32, 96.16, 98.81, 89.06, 94.31, 90.72, 92.47, 89.53, 83.69, 65.28, 71.96, 73.66, 68.55, 61.66, 59.31, 57.33, 54.22, 56.8, 63.27, 56.19, 56.34, 47.95, 52.55] },
      velocityScore: { '1D': 3.1, '1W': -5.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 309.1, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.43, PRN: false, RSHO: false, IDEF: 0.93, BILT: false },
      tonyNote: 'Kratos Defense is a defense technology company focused on unmanned systems, satellite communications, and high-performance computing for government customers. It appears in Industrials ETFs as an AI-adjacent defense name — autonomous systems and AI-driven surveillance are direct end markets. Revenue grew and the government contract backlog is expanding.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 1.4, proScore: 0.56, coverage: 0.4,
      price: 72.9, weeklyPrices: [77.53, 77.92, 75.06, 74.34, 72.90], weeklyChange: -5.97, dayChange: -1.94, sortRank: 0, periodReturns: { '1M': 4.1, 'YTD': 21.3, '6M': 21.3, '1Y': 24.1 },
      priceHistory: { '1D': [74.34, 74.07, 73.83, 73.23, 72.75, 72.5, 72.63, 72.68, 72.6, 72.74, 72.83, 72.86, 72.8, 72.94, 72.79, 72.83, 72.82, 72.97, 72.88, 73.08, 72.98, 72.82, 72.8, 72.9], '1W': [77.53, 77.92, 75.06, 74.34, 72.9], '1M': [70.04, 71.31, 71.66, 72.43, 71.96, 71.59, 71.59, 72.26, 71.62, 72.08, 71.48, 71.25, 73.12, 74.95, 75.79, 75.87, 77.53, 77.92, 75.06, 74.34, 72.9], 'YTD': [60.11, 61.15, 60.29, 64.96, 67.26, 66.92, 72.28, 72.98, 76.26, 73.18, 73.89, 73.6, 72.47, 72.59, 71.54, 70.91, 71.61, 75.41, 74.18, 77.69, 76.34, 71.31, 71.59, 71.48, 75.87, 72.9], '6M': [60.85, 60.32, 61.55, 64.29, 66.34, 67.85, 71.96, 72.98, 76.26, 73.18, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 76.12, 74.73, 77.69, 76.34, 71.31, 71.59, 71.48, 75.87, 72.9], '1Y': [58.72, 57.85, 58.48, 57.71, 59.24, 58.64, 57.86, 56.57, 57.13, 57.73, 58.76, 59.02, 62.86, 63.69, 63.5, 63.78, 62.16, 56.98, 57.54, 60.43, 59.17, 59.37, 61.55, 60.5, 58.84, 59.46, 60.85, 60.32, 61.55, 64.29, 66.34, 67.85, 72.28, 72.98, 76.26, 73.18, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 76.12, 74.73, 77.69, 76.34, 71.31, 71.59, 71.48, 75.87, 72.9] },
      velocityScore: { '1D': -15.2, '1W': -1.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$89B', pe: 32, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.82,
      etfPresence: { AIRR: false, PRN: false, RSHO: 0.92, IDEF: false, BILT: 1.87 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AIR', name: 'AIRBUS GROUP', easyScore: 2, avgWeight: 1.34, proScore: 0.54, coverage: 0.4,
      price: 144.36, weeklyPrices: [138.51, 143.14, 141.85, 142.93, 144.36], weeklyChange: 4.22, dayChange: 1, sortRank: 0, periodReturns: { '1M': 31.2, 'YTD': 74.4, '6M': 74.4, '1Y': 107.8 },
      priceHistory: { '1D': [142.93, 142.32, 144.29, 144.83, 146, 145.54, 144.99, 145.38, 145.44, 145.84, 145.71, 145.55, 145.45, 145.9, 144.85, 144.61, 144.74, 145.27, 144.15, 144.28, 144.22, 144.13, 144.06, 144.36], '1W': [138.51, 143.14, 141.85, 142.93, 144.36], '1M': [109.99, 110.61, 111.36, 115.53, 116.65, 114.72, 120.13, 117.36, 127.23, 129.01, 129.96, 132.14, 134.88, 134.28, 132.26, 132.94, 138.51, 143.14, 141.85, 142.93, 144.36], 'YTD': [82.79, 94.73, 105.74, 105.66, 105.91, 113.09, 112.98, 116.69, 119.77, 107.87, 105.64, 103.49, 103.16, 114, 123.77, 121.97, 110.2, 109.56, 117.57, 103.79, 112.74, 110.61, 120.13, 129.96, 132.94, 144.36], '6M': [84.45, 97.03, 105.08, 104.26, 108, 114.34, 113.54, 116.69, 119.77, 107.87, 105.64, 103.49, 103.16, 113.86, 125.99, 116.54, 108.86, 111.9, 111.51, 103.79, 112.74, 110.61, 120.13, 129.96, 132.94, 144.36], '1Y': [69.47, 73.26, 74.88, 79.45, 75.82, 72.08, 78.68, 73.85, 76.79, 75.68, 74.05, 74.76, 81.62, 84.34, 84.01, 82.79, 81.33, 84.84, 83.6, 83.65, 77.76, 82.51, 82.64, 82.25, 81.21, 86.03, 84.45, 97.03, 105.08, 104.26, 108, 114.34, 112.98, 116.69, 119.77, 107.87, 105.64, 103.49, 103.16, 113.86, 125.99, 116.54, 108.86, 111.9, 111.51, 103.79, 112.74, 110.61, 120.13, 129.96, 132.94, 144.36] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: 31.7, revenueGrowth: 25, eps: 4.55, grossMargin: 19, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 2.5, BILT: false },
      tonyNote: 'AIRBUS GROUP appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RBC', name: 'RBC Bearings Incorporated', easyScore: 2, avgWeight: 1.19, proScore: 0.47, coverage: 0.4,
      price: 623.77, weeklyPrices: [648.89, 630.36, 634.78, 644.06, 623.77], weeklyChange: -3.87, dayChange: -3.15, sortRank: 0, periodReturns: { '1M': 10.2, 'YTD': 39.1, '6M': 39.1, '1Y': 63.5 },
      priceHistory: { '1D': [644.06, 634.67, 634.57, 634.11, 631.53, 631.68, 629.83, 631.68, 633.3, 635.64, 636.92, 635.93, 630.55, 628.36, 627.29, 625.72, 625.23, 625.34, 624.06, 623.35, 622.72, 623.17, 624.66, 623.77], '1W': [648.89, 630.36, 634.78, 644.06, 623.77], '1M': [566.14, 578.34, 584.18, 589.76, 590.09, 590.97, 592.41, 576.74, 607.46, 603.64, 621.08, 625.73, 639.18, 645.73, 633.44, 638.94, 648.89, 630.36, 634.78, 644.06, 623.77], 'YTD': [448.43, 485, 497.06, 504.07, 499.67, 544.02, 552.44, 562.54, 584.89, 565.64, 546.91, 537.2, 524.38, 552.4, 595.74, 596.86, 591, 593.12, 613.59, 551.12, 584.4, 578.34, 592.41, 621.08, 638.94, 623.77], '6M': [458.79, 487.16, 498.82, 504.5, 507.13, 548.2, 552.93, 562.54, 584.89, 565.64, 546.91, 537.2, 524.38, 553.31, 598.23, 591.32, 594.39, 607.5, 613.1, 551.12, 584.4, 578.34, 592.41, 621.08, 638.94, 623.77], '1Y': [381.43, 379.82, 389.57, 389.3, 384.87, 404.38, 410.61, 397.81, 399, 383.6, 378.08, 379.79, 378.54, 384.8, 382.19, 372.71, 393.88, 408.94, 431.36, 445.34, 423.39, 442.95, 438.15, 447.58, 444.99, 458.38, 458.79, 487.16, 498.82, 504.5, 507.13, 548.2, 552.44, 562.54, 584.89, 565.64, 546.91, 537.2, 524.38, 553.31, 598.23, 591.32, 594.39, 607.5, 613.1, 551.12, 584.4, 578.34, 592.41, 621.08, 638.94, 623.77] },
      velocityScore: { '1D': 0, '1W': -2.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$20B', pe: 68.7, revenueGrowth: 18, eps: 9.08, grossMargin: 45, dividendYield: null,
      etfPresence: { AIRR: 1.85, PRN: false, RSHO: false, IDEF: 0.52, BILT: false },
      tonyNote: 'RBC Bearings Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRCY', name: 'Mercury Systems, Inc.', easyScore: 2, avgWeight: 1.14, proScore: 0.45, coverage: 0.4,
      price: 123.01, weeklyPrices: [105.57, 109.38, 110.22, 122.33, 123.01], weeklyChange: 16.52, dayChange: 0.56, sortRank: 0, periodReturns: { '1M': 10.5, 'YTD': 68.5, '6M': 68.5, '1Y': 143 },
      priceHistory: { '1D': [122.33, 124.27, 124.8, 127.04, 126.63, 123.12, 123.49, 124.38, 125.58, 125.83, 125.79, 125.91, 126.01, 125.78, 125.07, 124.76, 124.36, 124.07, 123.68, 123.7, 123.55, 123.28, 122.88, 123.01], '1W': [105.57, 109.38, 110.22, 122.33, 123.01], '1M': [111.28, 112.87, 111.59, 117.82, 111.27, 110.94, 108.82, 106.81, 119.32, 120.3, 112.44, 115.5, 113.91, 111.76, 110.87, 105, 105.57, 109.38, 110.22, 122.33, 123.01], 'YTD': [73.01, 88.74, 102.95, 99.05, 93.88, 82.2, 82.36, 85.9, 91.01, 89.36, 80.71, 78.29, 69.86, 75.76, 82.52, 84.12, 77.06, 78.53, 91.95, 93.39, 99.32, 112.87, 108.82, 112.44, 105, 123.01], '6M': [76.03, 93.48, 103.02, 98.89, 93.89, 85.37, 83.32, 85.9, 91.01, 89.36, 80.71, 78.29, 69.86, 77.53, 84.09, 83.36, 76.53, 82.96, 92.32, 93.39, 99.32, 112.87, 108.82, 112.44, 105, 123.01], '1Y': [50.63, 52.4, 51.68, 52.91, 53, 53.93, 68.39, 64.22, 67.64, 67.47, 71.7, 73.82, 74.27, 81.18, 83.92, 78.15, 75.54, 77.44, 78.19, 73.1, 67.94, 69.05, 70.23, 75.19, 69.63, 74.7, 76.03, 93.48, 103.02, 98.89, 93.89, 85.37, 82.36, 85.9, 91.01, 89.36, 80.71, 78.29, 69.86, 77.53, 84.09, 83.36, 76.53, 82.96, 92.32, 93.39, 99.32, 112.87, 108.82, 112.44, 105, 123.01] },
      velocityScore: { '1D': 4.7, '1W': 2.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 12, eps: -0.23, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: 1.24, PRN: false, RSHO: false, IDEF: 1.03, BILT: false },
      tonyNote: 'Mercury Systems, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, avgWeight: 1.03, proScore: 0.41, coverage: 0.4,
      price: 54.57, weeklyPrices: [46.27, 46.42, 47.10, 49.92, 54.57], weeklyChange: 17.94, dayChange: 9.31, sortRank: 0, periodReturns: { '1M': 1.7, 'YTD': -25.4, '6M': -25.4, '1Y': 21.5 },
      priceHistory: { '1D': [49.92, 50.94, 52.22, 53.79, 54.71, 53.78, 53.51, 53.6, 54.16, 54.76, 54.45, 54.53, 54.83, 54.2, 54.12, 54.13, 54.06, 54.13, 54.15, 54.23, 54.74, 54.92, 54.73, 54.57], '1W': [46.27, 46.42, 47.1, 49.92, 54.57], '1M': [53.65, 54.65, 51.84, 54.39, 49.44, 49.64, 48.37, 45.87, 49.58, 47.83, 51.7, 52.03, 50.37, 47.7, 46.38, 44.84, 46.27, 46.42, 47.1, 49.92, 54.57], 'YTD': [73.17, 101.28, 109.49, 108.22, 103.8, 95.36, 75.79, 81.27, 93.04, 106.09, 104.08, 102.39, 74.82, 86.1, 87.79, 82.69, 71.95, 65.32, 58.82, 66.21, 60.66, 54.65, 48.37, 51.7, 44.84, 54.57], '6M': [76.85, 106.22, 108.5, 108.71, 102.87, 97.47, 75.11, 81.27, 93.04, 106.09, 104.08, 102.39, 74.82, 82, 90.18, 82.06, 70.3, 62.89, 62.48, 66.21, 60.66, 54.65, 48.37, 51.7, 44.84, 54.57], '1Y': [44.91, 47.57, 53.74, 49.1, 50.39, 48.6, 51.83, 49.87, 54.69, 53.26, 62.22, 64.11, 66.91, 73.47, 76.6, 75.96, 77.21, 85.79, 79.73, 67.74, 58.95, 64.96, 66.08, 67.27, 64.94, 80.81, 76.85, 106.22, 108.5, 108.71, 102.87, 97.47, 75.79, 81.27, 93.04, 106.09, 104.08, 102.39, 74.82, 82, 90.18, 82.06, 70.3, 62.89, 62.48, 66.21, 60.66, 54.65, 48.37, 51.7, 44.84, 54.57] },
      velocityScore: { '1D': 2.5, '1W': 2.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: 237.3, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.88, PRN: false, RSHO: false, IDEF: 0.19, BILT: false },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DRS', name: 'Leonardo DRS, Inc.', easyScore: 2, avgWeight: 0.53, proScore: 0.21, coverage: 0.4,
      price: 42.72, weeklyPrices: [44.36, 42.48, 40.95, 42.67, 42.72], weeklyChange: -3.71, dayChange: 0.11, sortRank: 0, periodReturns: { '1M': -10.9, 'YTD': 25.3, '6M': 25.3, '1Y': -5.3 },
      priceHistory: { '1D': [42.67, 43.42, 43.17, 43.55, 43.65, 43.26, 43.69, 44.15, 44.19, 44.33, 44.12, 44.01, 43.88, 43.63, 43.59, 43.53, 43.45, 43.2, 43.05, 43.06, 42.92, 42.7, 42.81, 42.72], '1W': [44.36, 42.48, 40.95, 42.67, 42.72], '1M': [47.96, 47.39, 45.61, 46.71, 46.15, 46.55, 47.35, 46.11, 49.69, 48.53, 45.59, 46.58, 46.08, 44.99, 45.74, 44.69, 44.36, 42.48, 40.95, 42.67, 42.72], 'YTD': [34.09, 38.84, 42.26, 40.99, 41.06, 38.93, 38.13, 38.14, 45.49, 47.41, 45.3, 44.4, 43.25, 46.73, 47.43, 44.24, 40.72, 40, 41.49, 42.84, 45.8, 47.39, 47.35, 45.59, 44.69, 42.72], '6M': [34.78, 40.99, 42.57, 40.63, 40.45, 40.22, 39.13, 38.14, 45.49, 47.41, 45.3, 44.4, 43.25, 46.19, 47.54, 43.2, 40.18, 39.7, 42.87, 42.84, 45.8, 47.39, 47.35, 45.59, 44.69, 42.72], '1Y': [45.09, 47.01, 48.01, 47.53, 43.24, 41.31, 41.9, 41.17, 41.93, 41.79, 41.14, 41.54, 42.55, 44.58, 45.43, 40.19, 39.94, 38.43, 35.76, 35.46, 34, 33.78, 33.79, 34.02, 32.55, 34.52, 34.78, 40.99, 42.57, 40.63, 40.45, 40.22, 38.13, 38.14, 45.49, 47.41, 45.3, 44.4, 43.25, 46.19, 47.54, 43.2, 40.18, 39.7, 42.87, 42.84, 45.8, 47.39, 47.35, 45.59, 44.69, 42.72] },
      velocityScore: { '1D': 0, '1W': -8.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 39.9, revenueGrowth: 6, eps: 1.07, grossMargin: 24, dividendYield: 0.84,
      etfPresence: { AIRR: 0.77, PRN: false, RSHO: false, IDEF: 0.28, BILT: false },
      tonyNote: 'Leonardo DRS, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TPC', name: 'Tutor Perini Corporation', easyScore: 2, avgWeight: 0.38, proScore: 0.15, coverage: 0.4,
      price: 78.7, weeklyPrices: [81.56, 79.53, 81.88, 82.97, 78.70], weeklyChange: -3.51, dayChange: -5.15, sortRank: 0, periodReturns: { '1M': 6, 'YTD': 17.4, '6M': 17.4, '1Y': 69.8 },
      priceHistory: { '1D': [82.97, 79.95, 79.84, 80.1, 80.09, 80.22, 79.71, 79.41, 79.23, 79.74, 79.48, 79.75, 79.78, 79.52, 79.25, 79.12, 79.15, 78.71, 78.4, 78.21, 77.93, 78.04, 78.83, 78.7], '1W': [81.56, 79.53, 81.88, 82.97, 78.7], '1M': [74.26, 74.29, 72.26, 72.38, 70.53, 72.13, 71.48, 68.72, 73.61, 74.92, 76.19, 77.89, 77.99, 81.5, 81, 82.36, 81.56, 79.53, 81.88, 82.97, 78.7], 'YTD': [67.02, 70.17, 75.17, 76.01, 78.89, 83.48, 82.74, 84.99, 73.57, 72.04, 71.31, 72.44, 72.83, 77.66, 83.8, 84.38, 87.5, 92.76, 82.79, 75.43, 74.67, 74.29, 71.48, 76.19, 82.36, 78.7], '6M': [69.35, 70.53, 75.09, 77.34, 80.11, 84.07, 82.24, 84.99, 73.57, 72.04, 71.31, 72.44, 72.83, 77.31, 86.16, 85.11, 86.87, 97.31, 82.69, 75.43, 74.67, 74.29, 71.48, 76.19, 82.36, 78.7], '1Y': [46.36, 47.45, 50.77, 49.17, 47.65, 47.28, 57.75, 56.02, 58.99, 59.03, 62.46, 63.62, 64.78, 63.75, 63.58, 63.3, 64.22, 69.34, 67.92, 62.28, 60.48, 65.16, 67.63, 67.56, 66.02, 68.93, 69.35, 70.53, 75.09, 77.34, 80.11, 84.07, 82.74, 84.99, 73.57, 72.04, 71.31, 72.44, 72.83, 77.31, 86.16, 85.11, 86.87, 97.31, 82.69, 75.43, 74.67, 74.29, 71.48, 76.19, 82.36, 78.7] },
      velocityScore: { '1D': 0, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 53.9, revenueGrowth: 12, eps: 1.46, grossMargin: 12, dividendYield: 0.29,
      etfPresence: { AIRR: 0.71, PRN: false, RSHO: false, IDEF: 0.04, BILT: false },
      tonyNote: 'Tutor Perini Corporation appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TKR', name: 'TIMKEN CO/THE', easyScore: 1, avgWeight: 8.69, proScore: 1.74, coverage: 0.2,
      price: 142.79, weeklyPrices: [144.01, 141.22, 143.50, 145.32, 142.79], weeklyChange: -0.85, dayChange: -1.74, sortRank: 0, periodReturns: { '1M': 12.8, 'YTD': 69.7, '6M': 69.7, '1Y': 89.3 },
      priceHistory: { '1D': [145.32, 143.08, 143.82, 144.51, 144.27, 144.4, 144.28, 144.1, 144.5, 144.69, 144.85, 144.99, 144.85, 145.51, 144.68, 144.24, 144.23, 144.15, 143.82, 143.43, 143.23, 143.01, 142.93, 142.79], '1W': [144.01, 141.22, 143.5, 145.32, 142.79], '1M': [126.54, 131.9, 131.82, 133.66, 131.83, 134.67, 137.09, 132.39, 137.4, 137.06, 140.28, 139.4, 142.36, 141.97, 137.64, 137.99, 144.01, 141.22, 143.5, 145.32, 142.79], 'YTD': [84.13, 90.6, 93.73, 93.94, 93.19, 106.04, 107.84, 107.83, 109.99, 100.58, 98.74, 98.99, 95.94, 98.94, 106.9, 108.45, 108.7, 107.12, 117.39, 112.73, 127.42, 131.9, 137.09, 140.28, 137.99, 142.79], '6M': [86.29, 91.17, 93.55, 94.02, 94.99, 108.93, 105.54, 107.83, 109.99, 100.58, 98.74, 98.99, 95.94, 99.17, 106.81, 108.75, 106.88, 109.63, 117.12, 112.73, 127.42, 131.9, 137.09, 140.28, 137.99, 142.79], '1Y': [75.44, 77.68, 76.68, 80.99, 74.77, 73.57, 80.39, 76.88, 78.96, 75.12, 76.4, 77.11, 75.67, 75.11, 75.86, 74.7, 75.85, 79.25, 78.46, 78.66, 74.33, 81.22, 82.52, 87.53, 84.14, 86.02, 86.29, 91.17, 93.55, 94.02, 94.99, 108.93, 107.84, 107.83, 109.99, 100.58, 98.74, 98.99, 95.94, 99.17, 106.81, 108.75, 106.88, 109.63, 117.12, 112.73, 127.42, 131.9, 137.09, 140.28, 137.99, 142.79] },
      velocityScore: { '1D': 0, '1W': 0, '1M': -55.6, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 32.5, revenueGrowth: 8, eps: 4.4, grossMargin: 31, dividendYield: 0.99,
      etfPresence: { AIRR: false, PRN: false, RSHO: 8.69, IDEF: false, BILT: false },
      tonyNote: 'TIMKEN CO/THE appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RTX', name: 'RTX CORP', easyScore: 1, avgWeight: 8.4, proScore: 1.68, coverage: 0.2,
      price: 191.09, weeklyPrices: [186.59, 187.99, 187.33, 189.73, 191.09], weeklyChange: 2.41, dayChange: 0.72, sortRank: 0, periodReturns: { '1M': 9.6, 'YTD': 4.2, '6M': 4.2, '1Y': 32.5 },
      priceHistory: { '1D': [189.73, 189.77, 190.02, 190.41, 190.69, 190.54, 190.01, 190.2, 190.6, 190.84, 191.35, 191.42, 191.3, 191.28, 191.01, 190.47, 190.56, 190.4, 190.09, 190.49, 190.85, 191.07, 191.18, 191.09], '1W': [186.59, 187.99, 187.33, 189.73, 191.09], '1M': [174.41, 174.26, 172.55, 179.41, 180.99, 178.66, 181.56, 177.41, 184.21, 183.53, 186.77, 192.58, 185.6, 181.83, 186.39, 185.06, 186.59, 187.99, 187.33, 189.73, 191.09], 'YTD': [183.4, 187.17, 199.83, 195.93, 200.93, 198.66, 200.06, 201.92, 212.16, 208.23, 206.06, 194.82, 187.15, 198.41, 201.41, 195.79, 173.38, 172.9, 178.61, 175.95, 178.97, 174.26, 181.56, 186.77, 185.06, 191.09], '6M': [187.25, 188.5, 201.92, 194.13, 201.09, 196.19, 203.5, 201.92, 212.16, 208.23, 206.06, 194.82, 187.15, 197.92, 202.81, 187.17, 175.68, 172.87, 178.89, 175.95, 178.97, 174.26, 181.56, 186.77, 185.06, 191.09], '1Y': [144.19, 146.18, 150.17, 156.49, 158.4, 155.75, 155.71, 153.66, 159.57, 158.11, 155, 158.31, 161.38, 167.2, 168.57, 157, 177.98, 176.36, 174, 177.69, 174.72, 172.15, 168.45, 174.72, 177.2, 186.38, 187.25, 188.5, 201.92, 194.13, 201.09, 196.19, 200.06, 201.92, 212.16, 208.23, 206.06, 194.82, 187.15, 197.92, 202.81, 187.17, 175.68, 172.87, 178.89, 175.95, 178.97, 174.26, 181.56, 186.77, 185.06, 191.09] },
      velocityScore: { '1D': 0, '1W': 1.2, '1M': -46.3, '6M': null }, isNew: false,
      marketCap: '$257B', pe: 35.9, revenueGrowth: 9, eps: 5.33, grossMargin: 20, dividendYield: 1.54,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 8.4, BILT: false },
      tonyNote: 'RTX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 4.29, proScore: 4.29, coverage: 1,
      price: 232.86, weeklyPrices: [256.63, 240.30, 261.15, 276.17, 232.86], weeklyChange: -9.26, dayChange: -15.68, sortRank: 0, periodReturns: { '1M': -12, 'YTD': 178.2, '6M': 178.2, '1Y': 362.9 },
      priceHistory: { '1D': [276.17, 239.36, 242.26, 243.19, 240.4, 235.73, 232.66, 233.37, 239.54, 240.9, 237.6, 238.01, 238.66, 238.28, 237.01, 235.14, 236.54, 238.04, 237.7, 237.31, 236.12, 236.27, 235.03, 232.86], '1W': [256.63, 240.3, 261.15, 276.17, 232.86], '1M': [264.51, 260.58, 251.68, 259.67, 227.81, 218, 220.12, 211.69, 222.24, 232.36, 265.1, 280.91, 286.69, 283.61, 275.25, 259.66, 256.63, 240.3, 261.15, 276.17, 232.86], 'YTD': [83.71, 97.3, 103.89, 94.5, 85.19, 86.1, 98.01, 100.61, 91.01, 94.94, 129.85, 114.15, 92.26, 112.54, 154.56, 159.16, 144.96, 176.42, 186.1, 199.86, 208.06, 260.58, 220.12, 265.1, 259.66, 232.86], '6M': [89.95, 97.93, 108.73, 91.46, 88.16, 92.88, 97.52, 100.61, 91.01, 94.94, 129.85, 114.15, 92.26, 117.4, 161.94, 156.55, 135.51, 175.92, 179.11, 199.86, 208.06, 260.58, 220.12, 265.1, 259.66, 232.86], '1Y': [50.31, 46.05, 53.31, 51.88, 51.29, 55.09, 70.63, 67.19, 70.48, 65.65, 93.39, 94.08, 113.23, 115.61, 122, 125.83, 98.62, 125.1, 117, 94.36, 90.54, 88.88, 98.92, 93.59, 75.45, 91.13, 89.95, 97.93, 108.73, 91.46, 88.16, 92.88, 98.01, 100.61, 91.01, 94.94, 129.85, 114.15, 92.26, 117.4, 161.94, 156.55, 135.51, 175.92, 179.11, 199.86, 208.06, 260.58, 220.12, 265.1, 259.66, 232.86] },
      velocityScore: { '1D': -0.9, '1W': -21.6, '1M': 0.7, '6M': null }, isNew: false,
      marketCap: '$59B', pe: 89.6, revenueGrowth: 684, eps: 2.6, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 3.36, MEME: 5.89, RKNG: 3.61 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 3, avgWeight: 3.5, proScore: 3.5, coverage: 1,
      price: 1039.5, weeklyPrices: [1213.56, 1132.33, 1145.28, 1154.29, 1039.50], weeklyChange: -14.34, dayChange: -9.94, sortRank: 0, periodReturns: { '1M': 0.4, 'YTD': 264.2, '6M': 264.2, '1Y': 759.9 },
      priceHistory: { '1D': [1154.29, 1081.66, 1081.17, 1082.54, 1077.65, 1066.35, 1057.3, 1054.44, 1056.89, 1059.39, 1050.4, 1048.2, 1055.02, 1053.52, 1053.23, 1048.76, 1053.26, 1050.31, 1043.49, 1041.9, 1043.35, 1043.77, 1044.26, 1039.5], '1W': [1213.56, 1132.33, 1145.28, 1154.29, 1039.5], '1M': [1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1039.5], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1039.5], '6M': [315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1039.5], '1Y': [120.89, 122.24, 116.43, 109.83, 114.74, 108.78, 124.27, 122.05, 116.5, 118.72, 140, 159.99, 161.71, 182.15, 196.54, 191.94, 198.47, 226.63, 237.5, 244.9, 228.5, 224.53, 234.16, 263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1039.5] },
      velocityScore: { '1D': -1.7, '1W': 2.3, '1M': 4.2, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 23.5, revenueGrowth: 346, eps: 44.21, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { BUZZ: 3.54, MEME: 2.93, RKNG: 4.04 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 3, avgWeight: 3.18, proScore: 3.18, coverage: 1,
      price: 36.41, weeklyPrices: [40.95, 39.16, 37.77, 37.30, 36.41], weeklyChange: -11.09, dayChange: -2.39, sortRank: 0, periodReturns: { '1M': -24.1, 'YTD': 48.5, '6M': 48.5, '1Y': 273.1 },
      priceHistory: { '1D': [37.3, 36.27, 36.27, 36.45, 36.69, 35.91, 35.53, 35.68, 36.3, 36.29, 36.07, 36.43, 36.59, 36.86, 37.1, 36.94, 37.13, 37.26, 37.14, 36.93, 36.6, 36.76, 36.51, 36.41], '1W': [40.95, 39.16, 37.77, 37.3, 36.41], '1M': [47.94, 47.86, 44.71, 44.15, 39.62, 40.94, 41.91, 38.92, 41.47, 42.7, 46.27, 45.57, 46.59, 45.2, 45.27, 41.98, 40.95, 39.16, 37.77, 37.3, 36.41], 'YTD': [24.52, 31.94, 35.22, 37.69, 33.88, 34.95, 35.28, 30, 27.93, 27.03, 27.71, 27.26, 20.55, 25.19, 27.6, 32.19, 33.67, 35.63, 44.59, 39.14, 45.14, 47.86, 41.91, 46.27, 41.98, 36.41], '6M': [28.11, 37.68, 37.4, 36.18, 34.8, 38.26, 33.56, 30, 27.93, 27.03, 27.71, 27.26, 20.55, 25.18, 31.47, 31.32, 32.11, 39.88, 43.93, 39.14, 45.14, 47.86, 41.91, 46.27, 41.98, 36.41], '1Y': [9.76, 9.51, 10.06, 10.93, 10.03, 14.79, 14.8, 15.34, 16.47, 14.38, 16.98, 19.83, 23.45, 25, 27.94, 37.76, 30.62, 34.42, 33.09, 26.41, 22.84, 23.74, 29.36, 30.99, 22, 25.72, 28.11, 37.68, 37.4, 36.18, 34.8, 38.26, 35.28, 30, 27.93, 27.03, 27.71, 27.26, 20.55, 25.18, 31.47, 31.32, 32.11, 39.88, 43.93, 39.14, 45.14, 47.86, 41.91, 46.27, 41.98, 36.41] },
      velocityScore: { '1D': -0.6, '1W': -22.4, '1M': -19.5, '6M': null }, isNew: false,
      marketCap: '$10B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 1.87, MEME: 4.47, RKNG: 3.2 },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 4.43, proScore: 2.95, coverage: 0.667,
      price: 290.4, weeklyPrices: [309.18, 252.02, 275.01, 302.70, 290.40], weeklyChange: -6.07, dayChange: -4.06, sortRank: 0, periodReturns: { '1M': 6.2, 'YTD': 234.2, '6M': 234.2, '1Y': 1212.2 },
      priceHistory: { '1D': [302.7, 313.23, 310.45, 311.97, 311.35, 304.01, 299.39, 300.65, 304.79, 310.24, 307.5, 307.56, 308.74, 311.04, 308.23, 304.68, 303.8, 300.99, 299.28, 296.3, 290.87, 294, 289.08, 290.4], '1W': [309.18, 252.02, 275.01, 302.7, 290.4], '1M': [273.51, 302.85, 287.32, 291.37, 263.61, 253.57, 259.61, 234.23, 248.88, 260.22, 280.88, 284.99, 328.91, 345.85, 321.98, 326.19, 309.18, 252.02, 275.01, 302.7, 290.4], 'YTD': [86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 160.28, 166, 151.32, 153.68, 141.33, 119.51, 135, 176.67, 218.27, 234.68, 288.64, 283.92, 258.71, 302.4, 302.85, 259.61, 280.88, 326.19, 290.4], '6M': [98.69, 134.07, 149.5, 139.62, 156.13, 155.17, 145.32, 160.28, 166, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 258.71, 302.4, 302.85, 259.61, 280.88, 326.19, 290.4], '1Y': [22.13, 28.71, 24.69, 26.89, 37.62, 38.86, 44.08, 43.1, 49.94, 52.45, 62.96, 79.67, 69.18, 90.19, 87.58, 116.58, 94.37, 133.71, 141.41, 126.72, 104.97, 94.29, 102.5, 101.29, 76.97, 91.88, 98.69, 134.07, 149.5, 139.62, 156.13, 155.17, 139.74, 160.28, 166, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 258.71, 302.4, 302.85, 259.61, 280.88, 326.19, 290.4] },
      velocityScore: { '1D': -6.6, '1W': -23.8, '1M': -27.5, '6M': null }, isNew: false,
      marketCap: '$83B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.48, RKNG: 3.37 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 2, avgWeight: 4.34, proScore: 2.89, coverage: 0.667,
      price: 592.88, weeklyPrices: [675.39, 586.45, 651.88, 638.72, 592.88], weeklyChange: -12.22, dayChange: -7.18, sortRank: 0, periodReturns: { '1M': 8.5, 'YTD': 244.2, '6M': 244.2, '1Y': 828.7 },
      priceHistory: { '1D': [638.72, 607, 609.53, 603.11, 602.69, 594.07, 592.44, 590.07, 595.06, 601.85, 601.28, 604.08, 602.5, 600.43, 597.76, 597.41, 597.58, 596.91, 595.39, 596.21, 596.63, 597.43, 592.94, 592.88], '1W': [675.39, 586.45, 651.88, 638.72, 592.88], '1M': [546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 592.88], 'YTD': [172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 458.68, 524.65, 563.1, 517.72, 681.08, 643.83, 592.88], '6M': [187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 458.68, 524.65, 563.1, 517.72, 681.08, 643.83, 592.88], '1Y': [63.84, 64.64, 66.53, 69.32, 71.43, 73.78, 76.07, 75.86, 79.71, 86, 95.02, 100.94, 109.69, 130.59, 121.18, 120.44, 120.47, 141.38, 160.1, 166.11, 152.86, 155.41, 155.59, 181.95, 166.26, 179.56, 187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 458.68, 524.65, 563.1, 517.72, 681.08, 643.83, 592.88] },
      velocityScore: { '1D': -4.9, '1W': -23.7, '1M': 16.1, '6M': null }, isNew: false,
      marketCap: '$204B', pe: 35.4, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.09,
      etfPresence: { BUZZ: false, MEME: 5.02, RKNG: 3.66 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 4.33, proScore: 2.89, coverage: 0.667,
      price: 2007, weeklyPrices: [2335.00, 2090.71, 2050.39, 2273.73, 2007.00], weeklyChange: -14.05, dayChange: -11.73, sortRank: 0, periodReturns: { '1M': 13.9, 'YTD': 745.5, '6M': 745.5, '1Y': 4364 },
      priceHistory: { '1D': [2273.73, 2080, 2103.03, 2098.5, 2092, 2057.94, 2040.46, 2032.3, 2050.67, 2067.29, 2052.21, 2064.41, 2066.08, 2051.94, 2064.76, 2040.97, 2044.69, 2041.78, 2028.09, 2035.88, 2029.72, 2022.49, 2012.19, 2007], '1W': [2335, 2090.71, 2050.39, 2273.73, 2007], '1M': [1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2007], 'YTD': [237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1333.01, 1589.55, 1716.36, 1646.54, 1991.55, 1914.46, 2007], '6M': [275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1333.01, 1589.55, 1716.36, 1646.54, 1991.55, 1914.46, 2007], '1Y': [44.96, 46.2, 41.36, 43, 43.39, 42.1, 47.01, 44.58, 47.35, 53.01, 73.92, 93.97, 99.83, 121.12, 131.88, 144.3, 146.95, 204.36, 216.5, 283.1, 244.93, 220.5, 194.38, 232.86, 206.83, 250.08, 275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1333.01, 1589.55, 1716.36, 1646.54, 1991.55, 1914.46, 2007] },
      velocityScore: { '1D': -3.3, '1W': -35.8, '1M': -35.9, '6M': null }, isNew: false,
      marketCap: '$297B', pe: 68.4, revenueGrowth: 251, eps: 29.33, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.94, RKNG: 3.73 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 2, avgWeight: 4.01, proScore: 2.67, coverage: 0.667,
      price: 87.8, weeklyPrices: [65.62, 71.45, 86.77, 88.86, 87.80], weeklyChange: 33.8, dayChange: -1.19, sortRank: 0, periodReturns: { '1M': -16.9, 'YTD': 20.9, '6M': 20.9, '1Y': 94.6 },
      priceHistory: { '1D': [88.86, 88.23, 87.6, 87.56, 87.8, 85.7, 84.59, 86.58, 88.67, 89.25, 89.14, 90.35, 91.09, 91.06, 91.35, 90.82, 91.42, 90.33, 89.67, 89.21, 88.88, 88.62, 88.14, 87.8], '1W': [65.62, 71.45, 86.77, 88.86, 87.8], '1M': [105.65, 118.17, 107.73, 107.29, 93.6, 92.06, 88.71, 87.32, 97.56, 82.41, 82.25, 85.43, 80.66, 73.19, 72.87, 68.01, 65.62, 71.45, 86.77, 88.86, 87.8], 'YTD': [72.63, 90.56, 101.25, 113.57, 111.21, 101.79, 82.51, 83.9, 86.92, 89.76, 89.11, 88.42, 73.82, 94.81, 98.97, 81, 77.2, 68.43, 82.55, 86.83, 119.7, 118.17, 88.71, 82.25, 68.01, 87.8], '6M': [83.47, 97.67, 115.77, 104.78, 104.55, 102.12, 83.03, 83.9, 86.92, 89.76, 89.11, 88.42, 73.82, 92.57, 88.57, 80.01, 71.88, 63.87, 72.96, 86.83, 119.7, 118.17, 88.71, 82.25, 68.01, 87.8], '1Y': [45.11, 42.5, 52.63, 58.92, 54.29, 51.79, 50.05, 44.95, 50.43, 45.22, 37.58, 41.19, 54.5, 56.94, 81.2, 95.69, 71.35, 80.06, 70.38, 64.49, 58.22, 55.51, 61.44, 79.05, 61.86, 78.05, 83.47, 97.67, 115.77, 104.78, 104.55, 102.12, 82.51, 83.9, 86.92, 89.76, 89.11, 88.42, 73.82, 92.57, 88.57, 80.01, 71.88, 63.87, 72.96, 86.83, 119.7, 118.17, 88.71, 82.25, 68.01, 87.8] },
      velocityScore: { '1D': 0, '1W': -27.6, '1M': -42.2, '6M': null }, isNew: false,
      marketCap: '$34B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.28, MEME: 5.74, RKNG: false },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'LITE', name: 'LITE', easyScore: 2, avgWeight: 3.85, proScore: 2.57, coverage: 0.667,
      price: 795.14, weeklyPrices: [861.97, 816.98, 851.40, 858.06, 795.14], weeklyChange: -7.75, dayChange: -7.33, sortRank: 0, periodReturns: { '1M': -12.1, 'YTD': 115.7, '6M': 115.7, '1Y': 769.1 },
      priceHistory: { '1D': [858.06, 830.7, 825.32, 820.5, 825.87, 815.56, 794.96, 797.86, 801.19, 803.81, 802.76, 805.26, 808.03, 806.66, 802.66, 802.6, 807.58, 805.99, 802.38, 803.09, 803.89, 803.61, 797.11, 795.14], '1W': [861.97, 816.98, 851.4, 858.06, 795.14], '1M': [905, 1029.15, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 875.36, 869.98, 850, 893.93, 827.92, 842.53, 861.97, 816.98, 851.4, 858.06, 795.14], 'YTD': [368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 772.28, 871.18, 895.11, 859.68, 976.18, 1053.09, 884.98, 910.81, 1029.15, 821.76, 875.36, 842.53, 795.14], '6M': [386.11, 351.42, 324.25, 332.45, 423.42, 577.15, 600.42, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 884.98, 910.81, 1029.15, 821.76, 875.36, 842.53, 795.14], '1Y': [91.49, 90.44, 99.63, 102.13, 109.85, 110.01, 120.23, 117.96, 124.62, 134.12, 164.88, 163.34, 152.75, 171.4, 163.09, 156.57, 158.06, 214.28, 232.75, 253.81, 247.43, 291.27, 302.98, 366, 320.25, 395.92, 386.11, 351.42, 324.25, 332.45, 423.42, 577.15, 562.74, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 884.98, 910.81, 1029.15, 821.76, 875.36, 842.53, 795.14] },
      velocityScore: { '1D': -0.8, '1W': -12.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$62B', pe: 140.5, revenueGrowth: 90, eps: 5.66, grossMargin: 41, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.67, RKNG: 3.04 },
      tonyNote: 'LITE appears in 2 of 3 Meme ETFs (67% coverage) with average weight 3.9% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 2, avgWeight: 3.67, proScore: 2.45, coverage: 0.667,
      price: 43.7, weeklyPrices: [47.74, 47.21, 45.91, 45.73, 43.70], weeklyChange: -8.46, dayChange: -4.44, sortRank: 0, periodReturns: { '1M': -33.1, 'YTD': 15.7, '6M': 15.7, '1Y': 186.9 },
      priceHistory: { '1D': [45.73, 43.25, 43.7, 44.01, 43.99, 43.05, 42.12, 42.75, 43.65, 43.64, 43.19, 43.58, 43.67, 43.89, 44.25, 43.99, 44.16, 44.62, 44.37, 44.09, 43.64, 44.03, 43.9, 43.7], '1W': [47.74, 47.21, 45.91, 45.73, 43.7], '1M': [65.33, 66.6, 65.48, 61.86, 54.35, 59.19, 54.02, 51.52, 56.71, 59.77, 59.18, 58.11, 59.96, 56.87, 54.72, 50.3, 47.74, 47.21, 45.91, 45.73, 43.7], 'YTD': [37.77, 45.68, 51.89, 56.68, 53.74, 41.83, 42.22, 42.36, 41.39, 38.84, 44.94, 42.16, 31.62, 35.13, 43.07, 48.72, 48.36, 49.48, 55.15, 50.46, 59.78, 66.6, 54.02, 59.18, 50.3, 43.7], '6M': [42.7, 46.03, 57.82, 52.36, 53.08, 46.15, 40.97, 42.36, 41.39, 38.84, 44.94, 42.16, 31.62, 35.74, 47.37, 45.17, 44.44, 54.74, 56.56, 50.46, 59.78, 66.6, 54.02, 59.18, 50.3, 43.7], '1Y': [15.23, 16.96, 17.31, 18.99, 16.14, 18.32, 17.73, 18.73, 22.99, 28.21, 33.63, 37.9, 47.14, 47.08, 60.09, 67.98, 51.83, 60.42, 76.41, 55.7, 48.85, 47.47, 43.96, 43.92, 33.78, 41.98, 42.7, 46.03, 57.82, 52.36, 53.08, 46.15, 42.22, 42.36, 41.39, 38.84, 44.94, 42.16, 31.62, 35.74, 47.37, 45.17, 44.44, 54.74, 56.56, 50.46, 59.78, 66.6, 54.02, 59.18, 50.3, 43.7] },
      velocityScore: { '1D': 0, '1W': -40.1, '1M': -39.7, '6M': null }, isNew: false,
      marketCap: '$16B', pe: 56.8, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 2.59, MEME: 4.75, RKNG: false },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'AMD', name: 'AMD', easyScore: 2, avgWeight: 3.44, proScore: 2.3, coverage: 0.667,
      price: 544.32, weeklyPrices: [532.57, 521.58, 539.49, 580.91, 544.32], weeklyChange: 2.21, dayChange: -6.3, sortRank: 0, periodReturns: { '1M': 6.7, 'YTD': 154.2, '6M': 154.2, '1Y': 299.9 },
      priceHistory: { '1D': [580.91, 553.76, 559.64, 555.94, 555.12, 553.03, 553.36, 550.83, 552.57, 554.73, 549.8, 550.2, 551.21, 553.43, 552.27, 551.27, 552.67, 552.59, 550.35, 549.64, 549.02, 548.1, 546.28, 544.32], '1W': [532.57, 521.58, 539.49, 580.91, 544.32], '1M': [510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 544.32], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 420.99, 503.89, 521.54, 475.51, 507.29, 519.74, 544.32], '6M': [223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 420.99, 503.89, 521.54, 475.51, 507.29, 519.74, 544.32], '1Y': [136.11, 138.41, 160.08, 158.65, 179.51, 163.12, 184.42, 166.55, 166.62, 162.13, 159.54, 159.16, 160.88, 164.01, 235.56, 238.6, 230.23, 264.33, 256.33, 258.89, 230.29, 206.13, 217.6, 221.42, 198.11, 215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 420.99, 503.89, 521.54, 475.51, 507.29, 519.74, 544.32] },
      velocityScore: { '1D': 0.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$888B', pe: 180.2, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { BUZZ: 3.32, MEME: false, RKNG: 3.57 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab', easyScore: 2, avgWeight: 3.23, proScore: 2.15, coverage: 0.667,
      price: 102.56, weeklyPrices: [80.69, 84.54, 98.01, 101.65, 102.56], weeklyChange: 27.1, dayChange: 0.9, sortRank: 0, periodReturns: { '1M': -16.2, 'YTD': 47, '6M': 47, '1Y': 198.7 },
      priceHistory: { '1D': [101.65, 101.51, 101.73, 102.46, 102.59, 100.19, 98.78, 101.4, 104.63, 105.47, 104.83, 106.47, 107.25, 106.64, 106.69, 106.61, 106.51, 104.92, 104.28, 104.42, 104.02, 103.48, 102.75, 102.56], '1W': [80.69, 84.54, 98.01, 101.65, 102.56], '1M': [122.39, 123.32, 114.7, 119.95, 110.08, 113.65, 108.23, 105.05, 114.78, 102.39, 104.63, 107.98, 107.24, 100.29, 95.12, 85.41, 80.69, 84.54, 98.01, 101.65, 102.56], 'YTD': [69.76, 83.08, 90.76, 88.9, 80.07, 72.32, 67.44, 70.21, 70.97, 71.48, 71.31, 68, 57.38, 67.67, 70.62, 89.46, 82.29, 80.31, 117.35, 131.16, 143.2, 123.32, 108.23, 104.63, 85.41, 102.56], '6M': [75.99, 84.85, 96.3, 80.48, 74.15, 75.84, 69.89, 70.21, 70.97, 71.48, 71.31, 68, 57.38, 66.32, 72.22, 86.64, 78.59, 78.76, 117.56, 131.16, 143.2, 123.32, 108.23, 104.63, 85.41, 102.56], '1Y': [34.33, 39.14, 47.69, 49.15, 46.44, 44.1, 43, 40.92, 48.13, 43.53, 46.17, 48.08, 48.69, 47.97, 65.31, 69.27, 60.56, 66.16, 56.42, 49.97, 42.78, 42.6, 44.72, 57.52, 53.96, 77.18, 75.99, 84.85, 96.3, 80.48, 74.15, 75.84, 67.44, 70.21, 70.97, 71.48, 71.31, 68, 57.38, 66.32, 72.22, 86.64, 78.59, 78.76, 117.56, 131.16, 143.2, 123.32, 108.23, 104.63, 85.41, 102.56] },
      velocityScore: { '1D': 0, '1W': null, '1M': -48.1, '6M': null }, isNew: false,
      marketCap: '$64B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 1.63, MEME: 4.83, RKNG: false },
      tonyNote: 'Rocket Lab is the small-launch and space systems name that Electrification and AI infrastructure ETFs hold for satellite connectivity exposure — relevant to both GPS-dependent grids and low-orbit broadband that supports remote AI compute. Small market cap, no earnings, but consistent revenue growth and a rapidly expanding backlog.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 1, avgWeight: 9.72, proScore: 3.24, coverage: 0.333,
      price: 136.75, weeklyPrices: [138.54, 135.69, 150.10, 148.16, 136.75], weeklyChange: -1.29, dayChange: -7.7, sortRank: 0, periodReturns: { '1M': -26.3, 'YTD': 292.3, '6M': 292.3, '1Y': 439.4 },
      priceHistory: { '1D': [148.16, 143.87, 146.47, 145.07, 144.95, 142.93, 140.85, 141.22, 142.99, 141.01, 139.54, 141.15, 141.76, 141.82, 141.23, 140.7, 141.05, 140.58, 139.86, 139.71, 139.46, 139.7, 137.8, 136.75], '1W': [138.54, 135.69, 150.1, 148.16, 136.75], '1M': [185.67, 202.37, 184.07, 202.89, 177, 196.64, 162.88, 175.13, 172.78, 169.05, 170.81, 167.34, 161.85, 171.23, 147.44, 146.97, 138.54, 135.69, 150.1, 148.16, 136.75], 'YTD': [34.86, 33.01, 37, 35.72, 43.61, 44.3, 44.46, 53.96, 102.51, 110.62, 94.07, 95.76, 85.19, 107.45, 153.19, 163.47, 145.78, 172.98, 184.9, 173.26, 177.62, 202.37, 162.88, 170.81, 146.97, 136.75], '6M': [39.6, 34.04, 37.04, 34.89, 44.16, 47.91, 43.91, 53.96, 102.51, 110.62, 94.07, 95.76, 85.19, 117.64, 146.39, 150.57, 137.26, 180.57, 188.28, 173.26, 177.62, 202.37, 162.88, 170.81, 146.97, 136.75], '1Y': [25.35, 27.92, 28.99, 26.31, 23.06, 23.23, 23.02, 22.77, 25.07, 23.02, 27.72, 29.47, 26.69, 28.42, 32.22, 32.95, 29.98, 35.48, 31.51, 23.94, 20.89, 22.73, 25.65, 34.98, 27.14, 41, 39.6, 34.04, 37.04, 34.89, 44.16, 47.91, 44.46, 53.96, 102.51, 110.62, 94.07, 95.76, 85.19, 117.64, 146.39, 150.57, 137.26, 180.57, 188.28, 173.26, 177.62, 202.37, 162.88, 170.81, 146.97, 136.75] },
      velocityScore: { '1D': 0, '1W': -12.7, '1M': -25.7, '6M': null }, isNew: false,
      marketCap: '$11B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 9.72, RKNG: false },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'QBTS', name: 'D-Wave Quantum', easyScore: 1, avgWeight: 5.21, proScore: 1.74, coverage: 0.333,
      price: 23.63, weeklyPrices: [21.91, 22.76, 23.83, 23.99, 23.63], weeklyChange: 7.83, dayChange: -1.52, sortRank: 0, periodReturns: { '1M': -19, 'YTD': -9.7, '6M': -9.7, '1Y': 59.4 },
      priceHistory: { '1D': [23.99, 23.71, 23.84, 24.19, 24.02, 23.68, 23.68, 23.97, 24.16, 24.11, 24.03, 24.19, 24.19, 24.39, 24.43, 24.33, 24.32, 24.3, 24.25, 24.09, 24.01, 23.88, 23.8, 23.63], '1W': [21.91, 22.76, 23.83, 23.99, 23.63], '1M': [29.18, 29.91, 27.55, 27.64, 23.85, 25.83, 23.52, 23.25, 23.82, 23.37, 23.94, 22.92, 24.69, 24.47, 25.03, 22.98, 21.91, 22.76, 23.83, 23.99, 23.63], 'YTD': [26.15, 29.28, 28.72, 25.63, 21.22, 20.72, 19.67, 18.05, 18.94, 19.04, 17.46, 16.31, 12.98, 14.14, 14.65, 21.66, 18.8, 20.92, 24.03, 19.06, 27.82, 29.91, 23.52, 23.94, 22.98, 23.63], '6M': [28.13, 28.11, 28.83, 23.75, 20.97, 21.21, 18.44, 18.05, 18.94, 19.04, 17.46, 16.31, 12.98, 13.74, 16.97, 20.36, 18.11, 21.54, 22.35, 19.06, 27.82, 29.91, 23.52, 23.94, 22.98, 23.63], '1Y': [14.82, 16.39, 16.91, 20.3, 17.06, 17.58, 18.65, 15.32, 15.45, 15.3, 16.04, 22.54, 27.72, 25.63, 34.25, 44.78, 27.29, 34.26, 31.02, 26.4, 22.93, 22.59, 25.08, 26.8, 23.8, 27.52, 28.13, 28.11, 28.83, 23.75, 20.97, 21.21, 19.67, 18.05, 18.94, 19.04, 17.46, 16.31, 12.98, 13.74, 16.97, 20.36, 18.11, 21.54, 22.35, 19.06, 27.82, 29.91, 23.52, 23.94, 22.98, 23.63] },
      velocityScore: { '1D': 0, '1W': -14.7, '1M': -47.1, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: -81, eps: -1.14, grossMargin: 66, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.21, RKNG: false },
      tonyNote: 'D-Wave Quantum is a quantum computing company — the only publicly traded business built around quantum annealing hardware. Revenue is minimal and profitability is many years away, but it holds a position in Meme ETFs as the purest-play quantum computing stock available to retail investors. The ETF weight is small and the position is purely thematic.',
    },
    {
      ticker: 'COHR', name: 'COHR', easyScore: 1, avgWeight: 4.91, proScore: 1.64, coverage: 0.333,
      price: 369.3, weeklyPrices: [407.25, 380.56, 391.22, 394.47, 369.30], weeklyChange: -9.32, dayChange: -6.38, sortRank: 0, periodReturns: { '1M': 1.8, 'YTD': 100.1, '6M': 100.1, '1Y': 326.2 },
      priceHistory: { '1D': [394.47, 375.5, 382.91, 379.34, 379.45, 371.11, 362.91, 363.43, 367.12, 367.38, 363.99, 365.79, 366.29, 367.86, 366.12, 364.89, 368.77, 367.66, 367, 369.14, 368.79, 370.03, 368.46, 369.3], '1W': [407.25, 380.56, 391.22, 394.47, 369.3], '1M': [362.9, 426.89, 417.43, 421.9, 376.99, 401.93, 355.94, 354.77, 363.58, 385.03, 382.81, 378.85, 389.57, 425.48, 381.22, 392.5, 407.25, 380.56, 391.22, 394.47, 369.3], 'YTD': [184.57, 173.15, 195.96, 196.94, 212.18, 227.68, 217.23, 248.89, 298.91, 252.32, 247.37, 255.05, 219.65, 253.22, 307.93, 347.51, 321.53, 329.89, 379.69, 362.83, 381.35, 426.89, 355.94, 382.81, 392.5, 369.3], '6M': [194.33, 178.06, 191.04, 197.76, 222.44, 242.46, 219.96, 248.89, 298.91, 252.32, 247.37, 255.05, 219.65, 255.1, 313.42, 343.79, 303.97, 335.73, 374.01, 362.83, 381.35, 426.89, 355.94, 382.81, 392.5, 369.3], '1Y': [86.64, 91.25, 97.82, 98.43, 107.23, 107.15, 114.01, 87.76, 91.58, 88.47, 103.49, 103.41, 106.52, 114.65, 116.67, 110.41, 115.37, 138.06, 134.63, 156.67, 138.15, 148.85, 170.96, 197.45, 170.44, 191.37, 194.33, 178.06, 191.04, 197.76, 222.44, 242.46, 217.23, 248.89, 298.91, 252.32, 247.37, 255.05, 219.65, 255.1, 313.42, 343.79, 303.97, 335.73, 374.01, 362.83, 381.35, 426.89, 355.94, 382.81, 392.5, 369.3] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$72B', pe: 176.7, revenueGrowth: 21, eps: 2.09, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.91, RKNG: false },
      tonyNote: 'COHR appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 1, avgWeight: 4.8, proScore: 1.6, coverage: 0.333,
      price: 52.04, weeklyPrices: [50.56, 49.31, 53.88, 53.26, 52.04], weeklyChange: 2.93, dayChange: -2.29, sortRank: 0, periodReturns: { '1M': -24.9, 'YTD': 16, '6M': 16, '1Y': 29.8 },
      priceHistory: { '1D': [53.26, 52.94, 53.76, 54.5, 54.21, 53.36, 53.1, 53.66, 53.98, 53.81, 53.67, 53.83, 53.78, 53.94, 53.85, 53.6, 53.55, 53.5, 53.41, 53.11, 52.87, 52.66, 52.36, 52.04], '1W': [50.56, 49.31, 53.88, 53.26, 52.04], '1M': [69.28, 71.4, 68.23, 65.66, 56.78, 62.8, 56.69, 56.63, 57.99, 57.85, 56.06, 54.69, 56.55, 58.32, 57.85, 53.6, 50.56, 49.31, 53.88, 53.26, 52.04], 'YTD': [44.87, 50.45, 47.56, 47.25, 39.98, 34.99, 34.11, 30.78, 38.34, 35.87, 33.29, 33.11, 26.59, 29.24, 29.76, 48.32, 43.84, 45.75, 56.89, 49.31, 63.62, 71.4, 56.69, 56.06, 53.6, 52.04], '6M': [46.77, 49.45, 50.8, 43.37, 38.56, 35.48, 33.18, 30.78, 38.34, 35.87, 33.29, 33.11, 26.59, 28.49, 35.76, 46.28, 43.08, 48, 55.87, 49.31, 63.62, 71.4, 56.69, 56.06, 53.6, 52.04], '1Y': [40.1, 45.56, 43.54, 43.28, 39.88, 41.23, 41.21, 36.8, 40.75, 40.97, 43.86, 65.44, 73.86, 63.09, 74.3, 72.41, 55.45, 61.11, 55.41, 50.71, 49.12, 47.06, 48.65, 51.67, 45.85, 49.82, 46.77, 49.45, 50.8, 43.37, 38.56, 35.48, 34.11, 30.78, 38.34, 35.87, 33.29, 33.11, 26.59, 28.49, 35.76, 46.28, 43.08, 48, 55.87, 49.31, 63.62, 71.4, 56.69, 56.06, 53.6, 52.04] },
      velocityScore: { '1D': 0, '1W': -41.2, '1M': -49, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 133.4, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.8, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'AXTI', name: 'AXT Inc', easyScore: 1, avgWeight: 4.62, proScore: 1.54, coverage: 0.333,
      price: 64.44, weeklyPrices: [69.06, 70.15, 71.46, 72.08, 64.44], weeklyChange: -6.69, dayChange: -10.6, sortRank: 0, periodReturns: { '1M': -41.2, 'YTD': 294.1, '6M': 294.1, '1Y': 3106 },
      priceHistory: { '1D': [72.08, 68.19, 67.76, 66.9, 66.99, 64.35, 64.52, 65.33, 65.87, 66.14, 65.67, 65.97, 66, 65.74, 65.61, 65.25, 65.63, 65.45, 64.88, 65.03, 65.19, 64.96, 64.34, 64.44], '1W': [69.06, 70.15, 71.46, 72.08, 64.44], '1M': [109.55, 110.85, 106.7, 105.99, 89.04, 90.78, 78.36, 85.29, 88.34, 97.18, 93.04, 92.11, 84.57, 92.44, 77.91, 70.14, 69.06, 70.15, 71.46, 72.08, 64.44], 'YTD': [16.35, 25.83, 25.72, 17.4, 18.54, 24.06, 24.24, 28.43, 46.32, 38.56, 48.39, 64.44, 52.73, 41.99, 66.45, 78.76, 70.15, 106, 125.81, 105.88, 132.6, 110.85, 78.36, 93.04, 70.14, 64.44], '6M': [16.76, 22.99, 22.09, 17.8, 20.94, 27.77, 23.21, 28.43, 46.32, 38.56, 48.39, 64.44, 52.73, 45.46, 67.3, 74.97, 68.71, 107.55, 122.9, 105.88, 132.6, 110.85, 78.36, 93.04, 70.14, 64.44], '1Y': [2.01, 2.54, 2.39, 2.52, 2.12, 2.07, 2.18, 2.14, 2.77, 3.08, 3.36, 3.94, 4.83, 4.91, 5.31, 4.59, 4.94, 7.07, 9.1, 10.98, 9.9, 9.23, 11.48, 15.51, 12.36, 15.01, 16.76, 22.99, 22.09, 17.8, 20.94, 27.77, 24.24, 28.43, 46.32, 38.56, 48.39, 64.44, 52.73, 45.46, 67.3, 74.97, 68.71, 107.55, 122.9, 105.88, 132.6, 110.85, 78.36, 93.04, 70.14, 64.44] },
      velocityScore: { '1D': 0, '1W': 6.9, '1M': -38.2, '6M': null }, isNew: false,
      marketCap: '$4B', pe: null, revenueGrowth: 39, eps: -0.32, grossMargin: 21, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.62, RKNG: false },
      tonyNote: 'AXT Inc is a compound semiconductor substrate manufacturer — gallium arsenide, indium phosphide, and germanium wafers used in data center optical transceivers, 5G RF chips, and solar cells. Revenue is growing with optical networking demand. Small market cap but positioned at a genuine supply-chain chokepoint for III-V semiconductor materials.',
    },
    {
      ticker: 'CRWV', name: 'CRWV', easyScore: 1, avgWeight: 4.1, proScore: 1.37, coverage: 0.333,
      price: 86.56, weeklyPrices: [98.76, 96.58, 95.51, 99.54, 86.56], weeklyChange: -12.35, dayChange: -13.03, sortRank: 0, periodReturns: { '1M': -30.6, 'YTD': 20.9, '6M': 20.9, '1Y': -44.5 },
      priceHistory: { '1D': [99.54, 88.88, 88.73, 88.85, 87.93, 86.41, 85.38, 85.97, 86.65, 87.13, 86.5, 86.89, 87.14, 86.66, 86.58, 86.3, 86.92, 87.53, 87.09, 87.71, 87.32, 88.28, 87.39, 86.56], '1W': [98.76, 96.58, 95.51, 99.54, 86.56], '1M': [124.82, 119.27, 110.93, 108.03, 100.39, 102.37, 98.45, 95.61, 95.74, 100.55, 117.03, 115.21, 117.95, 111.29, 105.72, 100.88, 98.76, 96.58, 95.51, 99.54, 86.56], 'YTD': [71.61, 77.09, 95.01, 92.98, 93.19, 89.95, 96.04, 90.84, 78.05, 74.41, 85.86, 81.96, 69.15, 80.94, 110.27, 117.43, 112.06, 125.43, 114.7, 103.77, 105.89, 119.27, 98.45, 117.03, 100.88, 86.56], '6M': [79.32, 80.14, 101.23, 98.31, 88.94, 96.79, 91, 90.84, 78.05, 74.41, 85.86, 81.96, 69.15, 85.24, 117.2, 115.16, 105.53, 127.89, 107.75, 103.77, 105.89, 119.27, 98.45, 117.03, 100.88, 86.56], '1Y': [155.94, 153.05, 143.04, 126.05, 102.89, 110.24, 117.76, 92.89, 91.39, 89.88, 117.14, 120.86, 133.4, 137.05, 139.98, 139.24, 121.53, 139.93, 114.42, 85.43, 74.9, 71.29, 79.36, 88.16, 64.55, 78.87, 79.32, 80.14, 101.23, 98.31, 88.94, 96.79, 96.04, 90.84, 78.05, 74.41, 85.86, 81.96, 69.15, 85.24, 117.2, 115.16, 105.53, 127.89, 107.75, 103.77, 105.89, 119.27, 98.45, 117.03, 100.88, 86.56] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$47B', pe: null, revenueGrowth: 112, eps: -2.72, grossMargin: 69, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.1, RKNG: false },
      tonyNote: 'CRWV appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ALAB', name: 'ALAB', easyScore: 1, avgWeight: 3.88, proScore: 1.29, coverage: 0.333,
      price: 436.52, weeklyPrices: [398.00, 391.74, 455.96, 483.02, 436.52], weeklyChange: 9.68, dayChange: -9.63, sortRank: 0, periodReturns: { '1M': 36.4, 'YTD': 162.4, '6M': 162.4, '1Y': 392.4 },
      priceHistory: { '1D': [483.02, 454.62, 463.01, 461.21, 458.02, 455.17, 450.01, 448.93, 456.29, 456.64, 443.98, 446.6, 449.51, 449.32, 446.8, 445.32, 445.53, 443.67, 441.83, 440.96, 441.45, 440.08, 438.48, 436.52], '1W': [398, 391.74, 455.96, 483.02, 436.52], '1M': [320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 436.52], 'YTD': [166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 215.58, 318.72, 355.76, 341.7, 361.71, 399.92, 436.52], '6M': [179.56, 162.61, 182, 163.25, 152.44, 187.67, 123.69, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 215.58, 318.72, 355.76, 341.7, 361.71, 399.92, 436.52], '1Y': [88.66, 99.86, 91.94, 119.48, 128.87, 174.39, 193.64, 171.06, 178.56, 176.61, 230.37, 249.38, 205.27, 194.5, 219.36, 161.46, 154.85, 173.62, 181.94, 157.79, 139.52, 144.78, 152.5, 164.32, 140.24, 169.97, 179.56, 162.61, 182, 163.25, 152.44, 187.67, 129.32, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 215.58, 318.72, 355.76, 341.7, 361.71, 399.92, 436.52] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$75B', pe: 291, revenueGrowth: 93, eps: 1.5, grossMargin: 76, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.88, RKNG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'WEN', name: 'WEN', easyScore: 1, avgWeight: 3.85, proScore: 1.28, coverage: 0.333,
      price: 8.7, weeklyPrices: [7.33, 7.80, 8.26, 8.29, 8.70], weeklyChange: 18.62, dayChange: 4.89, sortRank: 0, periodReturns: { '1M': 10.8, 'YTD': 4.4, '6M': 4.4, '1Y': -26.8 },
      priceHistory: { '1D': [8.29, 8.52, 8.61, 8.66, 8.69, 8.56, 8.52, 8.53, 8.56, 8.53, 8.59, 8.73, 8.73, 8.69, 8.8, 8.73, 8.69, 8.73, 8.7, 8.7, 8.69, 8.7, 8.77, 8.7], '1W': [7.33, 7.8, 8.26, 8.29, 8.7], '1M': [7.85, 7.21, 6.85, 6.75, 6.71, 6.74, 6.71, 6.63, 6.79, 6.79, 6.77, 6.95, 6.8, 6.17, 6.26, 7.86, 7.33, 7.8, 8.26, 8.29, 8.7], 'YTD': [8.33, 8.38, 8.54, 8.42, 7.79, 8.02, 7.48, 7.77, 7.44, 7.27, 7.04, 7.16, 6.78, 7.09, 6.7, 7.13, 6.9, 6.54, 6.76, 7.84, 7.36, 7.21, 6.71, 6.77, 7.86, 8.7], '6M': [8.17, 8.65, 8.32, 8.08, 7.69, 7.81, 7, 7.77, 7.44, 7.27, 7.04, 7.16, 6.78, 6.89, 6.78, 7.11, 6.81, 6.61, 7.9, 7.84, 7.36, 7.21, 6.71, 6.77, 7.86, 8.7], '1Y': [11.88, 11.23, 10.45, 11.32, 10.1, 10.04, 10.41, 10.58, 10.27, 10.02, 9.83, 9.47, 9.29, 9.46, 8.98, 8.87, 9.22, 8.63, 9.08, 8.73, 8.23, 8.43, 8.56, 8.18, 8.49, 8.29, 8.17, 8.65, 8.32, 8.08, 7.69, 7.81, 7.48, 7.77, 7.44, 7.27, 7.04, 7.16, 6.78, 6.89, 6.78, 7.11, 6.81, 6.61, 7.9, 7.84, 7.36, 7.21, 6.71, 6.77, 7.86, 8.7] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2B', pe: 11.3, revenueGrowth: 3, eps: 0.77, grossMargin: 34, dividendYield: 6.76,
      etfPresence: { BUZZ: false, MEME: 3.85, RKNG: false },
      tonyNote: 'WEN appears in 1 of 3 Meme ETFs (33% coverage) with average weight 3.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IBRX', name: 'IBRX', easyScore: 1, avgWeight: 3.76, proScore: 1.25, coverage: 0.333,
      price: 8.97, weeklyPrices: [7.79, 8.71, 8.77, 8.76, 8.97], weeklyChange: 15.21, dayChange: 2.51, sortRank: 0, periodReturns: { '1M': 24, 'YTD': 353.3, '6M': 353.3, '1Y': 249.2 },
      priceHistory: { '1D': [8.76, 8.76, 8.86, 8.95, 9.01, 8.98, 8.85, 8.93, 8.94, 8.94, 8.91, 9.09, 9.07, 9.27, 9.1, 9.22, 9.26, 9.18, 9.11, 9.19, 9.13, 9.02, 8.98, 8.97], '1W': [7.79, 8.71, 8.77, 8.76, 8.97], '1M': [7.24, 7.23, 7.18, 7.29, 6.92, 7.17, 7.25, 6.98, 7.2, 7.1, 6.72, 6.99, 7.36, 7.22, 7.32, 7.8, 7.79, 8.71, 8.77, 8.76, 8.97], 'YTD': [1.98, 2.24, 3.95, 6.45, 6.25, 6.05, 5.95, 9.83, 10.44, 8.45, 8.21, 9.4, 6.66, 7.08, 7.3, 8.2, 7.29, 7.43, 8.11, 8, 7.92, 7.23, 7.25, 6.72, 7.8, 8.97], '6M': [2.02, 2.33, 5.52, 6.21, 6.13, 6.93, 6.02, 9.83, 10.44, 8.45, 8.21, 9.4, 6.66, 6.86, 7.6, 8.1, 6.96, 7.58, 8.12, 8, 7.92, 7.23, 7.25, 6.72, 7.8, 8.97], '1Y': [2.57, 2.79, 2.75, 2.99, 2.56, 2.38, 2.82, 2.28, 2.38, 2.37, 2.57, 2.76, 2.5, 2.48, 2.53, 2.58, 2.36, 2.42, 2.15, 2.06, 2.1, 2.08, 2.2, 2.3, 2.11, 2.14, 2.02, 2.33, 5.52, 6.21, 6.13, 6.93, 5.95, 9.83, 10.44, 8.45, 8.21, 9.4, 6.66, 6.86, 7.6, 8.1, 6.96, 7.58, 8.12, 8, 7.92, 7.23, 7.25, 6.72, 7.8, 8.97] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$9B', pe: null, revenueGrowth: 168, eps: -0.85, grossMargin: 99, dividendYield: null,
      etfPresence: { BUZZ: 3.76, MEME: false, RKNG: false },
      tonyNote: 'IBRX appears in 1 of 3 Meme ETFs (33% coverage) with average weight 3.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
