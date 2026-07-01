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
export const SPY_RET: Record<Period, number> = { '1W': 1.6, '1M': -1.7, 'YTD': 9.4, '6M': 9.4, '1Y': 20.2 };
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
  'AI & ML':         { '1W': -0.6, '1M': -3.9, 'YTD': 48.2, '6M': 48.2, '1Y': 82.3 },
  'Semiconductors':  { '1W': -5.1, '1M': 3.6, 'YTD': 110.7, '6M': 110.7, '1Y': 149.4 },
  'Broad Tech':      { '1W': 1.3, '1M': -4.1, 'YTD': 29.3, '6M': 29.3, '1Y': 45.6 },
  'Electrification': { '1W': -1.5, '1M': -6.2, 'YTD': 28, '6M': 28, '1Y': 48.2 },
  'Industrials':     { '1W': -0.7, '1M': 1.1, 'YTD': 25.3, '6M': 24.7, '1Y': 39.4 },
  'Meme':            { '1W': 0.4, '1M': -12.3, 'YTD': 22, '6M': 22, '1Y': 6.9 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, IndexChartByPeriod> = {
  'AI & ML': {
    '1D': { top10: [100, 96.75, 97.47, 97.55, 96.88, 96.52, 96.4, 96.92, 96.97, 96.77, 96.77, 96.73, 96.63, 96.5, 96.64, 96.47, 96.4, 96.35, 96.21, 96.04, 96.44, 96.55, 96.08, 95.79], spy: [100, 99.52, 99.82, 100, 100.02, 100.01, 100.17, 100.34, 100.27, 100.27, 100.31, 100.24, 100.17, 100.14, 100.16, 100.09, 100.12, 100.06, 100.07, 99.96, 100.08, 100.02, 99.97, 99.86], top10Return: -3.8, spyReturn: -0.14, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 97.47, 100.38, 103.33, 99.38], spy: [100, 99.28, 100.91, 101.7, 101.56], top10Return: -0.6, spyReturn: 1.6, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 101.86, 100.9, 99.35, 90.86, 93.72, 91.87, 88.98, 93.8, 94.45, 96.45, 96.94, 101.13, 101.95, 95.9, 95.05, 96.84, 94.3, 97.13, 100.01, 96.09], spy: [100, 100.14, 99.43, 99.81, 97.23, 97.45, 97.17, 95.64, 97.26, 97.79, 98.92, 97.68, 98.44, 98.13, 96.71, 96.66, 96.8, 96.1, 97.69, 98.45, 98.32], top10Return: -3.9, spyReturn: -1.7, xLabels: ["Jun 3", "Jun 10", "Jun 17", "Jun 24", "Jul 1"] },
    'YTD': { top10: [100, 102.26, 104.35, 105.09, 104.21, 102.1, 102.57, 101.98, 103.51, 102.02, 102.81, 101.55, 92.02, 100.45, 110.68, 117.96, 122.69, 125.68, 138.29, 132.15, 146.11, 157.1, 141.48, 148.76, 147.04, 148.23], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 100.07, 100.65, 99.46, 98.11, 96.11, 92.68, 96.63, 100.61, 103.93, 104.88, 105.29, 108.41, 108.32, 110.07, 111.39, 108.08, 110.03, 107.53, 109.36], top10Return: 48.2, spyReturn: 9.4, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 101.52, 102.77, 102.65, 102.83, 102.42, 100, 99.75, 101.24, 99.8, 100.56, 99.33, 90.03, 98.98, 111.24, 115.12, 116.5, 125.97, 131.55, 129.19, 142.76, 153.49, 138.26, 145.35, 143.64, 144.83], spy: [100, 101.6, 101.24, 101.4, 101.79, 101.58, 99.95, 99.89, 100.47, 99.28, 97.93, 95.93, 92.51, 96.49, 101.65, 103.06, 104.17, 105.94, 108.05, 108.12, 109.87, 111.18, 107.89, 109.83, 107.33, 109.16], top10Return: 48.2, spyReturn: 9.4, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 101.23, 103.78, 105.17, 107.3, 107.88, 110.25, 105.19, 108.53, 109.05, 116.02, 119.85, 118.5, 123.19, 127.24, 124.23, 122.51, 132.93, 128.58, 125.7, 118.56, 121.12, 124.38, 126.85, 118.77, 124.23, 124.87, 126.76, 128.44, 128.26, 128.58, 128.24, 125.21, 127.43, 122.13, 125.24, 125.96, 124.39, 112.64, 123.96, 139.46, 144.33, 146.03, 158.08, 165.19, 161.02, 179.64, 193.14, 173.86, 182.88, 180.89, 182.27], spy: [100, 100.87, 101.22, 102.25, 101.87, 101.9, 103.94, 102.85, 104.22, 104.62, 105.99, 106.74, 106.06, 107.86, 108.17, 106.48, 107.63, 110.79, 109.21, 110.14, 106.8, 109.55, 110.31, 111.08, 109.03, 111.26, 110.11, 111.87, 111.48, 111.65, 112.08, 111.85, 110.06, 110.78, 109.65, 109.14, 107.83, 105.63, 101.86, 106.25, 111.93, 113.48, 114.71, 116.65, 118.97, 118.26, 120.98, 122.42, 118.79, 120.93, 118.18, 120.2], top10Return: 82.3, spyReturn: 20.2, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Semiconductors': {
    '1D': { top10: [100, 94.83, 95.57, 95.58, 94.62, 93.94, 94.04, 94.55, 94.38, 94, 94.3, 94.15, 93.98, 93.7, 93.95, 93.53, 93.42, 93.36, 93.07, 92.78, 93.63, 93.87, 93.28, 92.8], spy: [100, 99.52, 99.82, 100, 100.02, 100.01, 100.17, 100.34, 100.27, 100.27, 100.31, 100.24, 100.17, 100.14, 100.16, 100.09, 100.12, 100.06, 100.07, 99.96, 100.08, 100.02, 99.97, 99.86], top10Return: -7.2, spyReturn: -0.14, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 94.59, 97.84, 102.21, 94.91], spy: [100, 99.28, 100.91, 101.7, 101.56], top10Return: -5.1, spyReturn: 1.6, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 104.94, 106.22, 103.58, 91.48, 96.85, 95.32, 92.14, 100.97, 102.47, 102.8, 103.86, 111.62, 115.28, 104.66, 104, 109.3, 103.36, 106.91, 111.66, 103.6], spy: [100, 100.14, 99.43, 99.81, 97.23, 97.45, 97.17, 95.64, 97.26, 97.79, 98.92, 97.68, 98.44, 98.13, 96.71, 96.66, 96.8, 96.1, 97.69, 98.45, 98.32], top10Return: 3.6, spyReturn: -1.7, xLabels: ["Jun 3", "Jun 10", "Jun 17", "Jun 24", "Jul 1"] },
    'YTD': { top10: [100, 107.01, 113.64, 117.36, 117.24, 119.41, 123.01, 122.39, 125.24, 124.83, 125.99, 130.44, 126.01, 131.15, 146.91, 160.88, 172.28, 182.45, 188.71, 181.83, 206.26, 212.56, 212.41, 211.24, 214.08, 210.72], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 100.07, 100.65, 99.46, 98.11, 96.11, 92.68, 96.63, 100.61, 103.93, 104.88, 105.29, 108.41, 108.32, 110.07, 111.39, 108.08, 110.03, 107.53, 109.36], top10Return: 110.7, spyReturn: 9.4, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 105.46, 110.92, 113.1, 115.3, 116.56, 118.85, 118.54, 121.4, 121.23, 122.34, 126.78, 122.65, 127.97, 144.34, 157.18, 162.81, 181.91, 177.52, 176.29, 199.87, 206.03, 206.37, 204.82, 207.61, 204.16], spy: [100, 101.6, 101.24, 101.4, 101.79, 101.58, 99.95, 99.89, 100.47, 99.28, 97.93, 95.93, 92.51, 96.49, 101.65, 103.06, 104.17, 105.94, 108.05, 108.12, 109.87, 111.18, 107.89, 109.83, 107.33, 109.16], top10Return: 110.7, spyReturn: 9.4, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 102.66, 102.93, 104.13, 103.65, 105.1, 111.33, 106.99, 111.65, 109.92, 113.85, 120.92, 119.05, 125.04, 126.05, 127.64, 126.07, 134.24, 137.44, 137.75, 129.15, 138.63, 146.28, 148.86, 140.74, 142.01, 142.7, 148.31, 153.51, 153.86, 163.67, 166.33, 168.32, 170.55, 168.52, 167.9, 164.69, 156.02, 151.9, 160.81, 183.86, 193.05, 202.96, 217.78, 236.06, 233.64, 247.63, 252.63, 244.53, 250.89, 253.93, 249.44], spy: [100, 100.87, 101.22, 102.25, 101.87, 101.9, 103.94, 102.85, 104.22, 104.62, 105.99, 106.74, 106.06, 107.86, 108.17, 106.48, 107.63, 110.79, 109.21, 110.14, 106.8, 109.55, 110.31, 111.08, 109.03, 111.26, 110.11, 111.87, 111.48, 111.65, 112.08, 111.85, 110.06, 110.78, 109.65, 109.14, 107.83, 105.63, 101.86, 106.25, 111.93, 113.48, 114.71, 116.65, 118.97, 118.26, 120.98, 122.42, 118.79, 120.93, 118.18, 120.2], top10Return: 149.4, spyReturn: 20.2, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Broad Tech': {
    '1D': { top10: [100, 98.01, 98.7, 98.72, 98.27, 97.8, 98.08, 98.68, 98.57, 98.56, 98.56, 98.56, 98.49, 98.38, 98.46, 98.32, 98.22, 98.05, 97.92, 97.84, 98.07, 98.04, 97.71, 97.54], spy: [100, 99.52, 99.82, 100, 100.02, 100.01, 100.17, 100.34, 100.27, 100.27, 100.31, 100.24, 100.17, 100.14, 100.16, 100.09, 100.12, 100.06, 100.07, 99.96, 100.08, 100.02, 99.97, 99.86], top10Return: -2.5, spyReturn: -0.14, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 99.17, 101.76, 103.86, 101.29], spy: [100, 99.28, 100.91, 101.7, 101.56], top10Return: 1.3, spyReturn: 1.6, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 101.26, 100.02, 99.65, 92.77, 94.48, 92.81, 90.57, 94.62, 95.1, 96.87, 96.54, 98.82, 98.6, 95.25, 94.24, 95.12, 94.12, 96.48, 98.47, 95.89], spy: [100, 100.14, 99.43, 99.81, 97.23, 97.45, 97.17, 95.64, 97.26, 97.79, 98.92, 97.68, 98.44, 98.13, 96.71, 96.66, 96.8, 96.1, 97.69, 98.45, 98.32], top10Return: -4.1, spyReturn: -1.7, xLabels: ["Jun 3", "Jun 10", "Jun 17", "Jun 24", "Jul 1"] },
    'YTD': { top10: [100, 103.16, 104.96, 104.89, 102.07, 100.41, 101.55, 101.67, 104.65, 102.54, 101.96, 100.71, 94.12, 100.68, 108.4, 114.9, 116.2, 120.07, 128.19, 121.51, 129.63, 136.53, 125.55, 130.56, 127.62, 129.3], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 100.07, 100.65, 99.46, 98.11, 96.11, 92.68, 96.63, 100.61, 103.93, 104.88, 105.29, 108.41, 108.32, 110.07, 111.39, 108.08, 110.03, 107.53, 109.36], top10Return: 29.3, spyReturn: 9.4, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 102.65, 103.69, 103.06, 100.99, 100.84, 99.59, 100.05, 103, 101.03, 100.39, 99.16, 92.74, 99.65, 108.29, 112.3, 111.85, 120.28, 124.23, 119.51, 127.39, 134.17, 123.4, 128.25, 125.35, 127.17], spy: [100, 101.6, 101.24, 101.4, 101.79, 101.58, 99.95, 99.89, 100.47, 99.28, 97.93, 95.93, 92.51, 96.49, 101.65, 103.06, 104.17, 105.94, 108.05, 108.12, 109.87, 111.18, 107.89, 109.83, 107.33, 109.16], top10Return: 29.3, spyReturn: 9.4, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 100.91, 102.92, 103.69, 103.63, 103.84, 104.52, 102.5, 105.47, 105.34, 109.65, 113.36, 112.83, 116.4, 120.18, 118.44, 115.15, 122.08, 121.62, 117.08, 111.17, 114.72, 116.1, 117, 111.71, 115.17, 114.85, 117.86, 119.76, 120.37, 118.97, 120.02, 117.25, 119.34, 117.69, 119.22, 119.03, 119.19, 111.67, 118.61, 125.97, 129.34, 129.73, 138.58, 139.92, 136.46, 146.33, 151.67, 142.24, 147.09, 145.65, 145.59], spy: [100, 100.87, 101.22, 102.25, 101.87, 101.9, 103.94, 102.85, 104.22, 104.62, 105.99, 106.74, 106.06, 107.86, 108.17, 106.48, 107.63, 110.79, 109.21, 110.14, 106.8, 109.55, 110.31, 111.08, 109.03, 111.26, 110.11, 111.87, 111.48, 111.65, 112.08, 111.85, 110.06, 110.78, 109.65, 109.14, 107.83, 105.63, 101.86, 106.25, 111.93, 113.48, 114.71, 116.65, 118.97, 118.26, 120.98, 122.42, 118.79, 120.93, 118.18, 120.2], top10Return: 45.6, spyReturn: 20.2, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Electrification': {
    '1D': { top10: [100, 98.6, 98.86, 98.48, 98.38, 98.28, 98.09, 98.48, 98.64, 98.61, 98.75, 98.71, 98.44, 98.31, 98.18, 98, 97.92, 97.7, 97.63, 97.39, 97.57, 97.64, 97.49, 97.14], spy: [100, 99.52, 99.82, 100, 100.02, 100.01, 100.17, 100.34, 100.27, 100.27, 100.31, 100.24, 100.17, 100.14, 100.16, 100.09, 100.12, 100.06, 100.07, 99.96, 100.08, 100.02, 99.97, 99.86], top10Return: -2.9, spyReturn: -0.14, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 97.28, 99.25, 101.37, 98.48], spy: [100, 99.28, 100.91, 101.7, 101.56], top10Return: -1.5, spyReturn: 1.6, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 102.09, 101.05, 100.96, 94.78, 94.9, 93.81, 90.79, 94.48, 95.39, 96.57, 96.56, 98.76, 99.85, 95.47, 94.86, 95.43, 92.76, 94.57, 96.59, 93.77], spy: [100, 100.14, 99.43, 99.81, 97.23, 97.45, 97.17, 95.64, 97.26, 97.79, 98.92, 97.68, 98.44, 98.13, 96.71, 96.66, 96.8, 96.1, 97.69, 98.45, 98.32], top10Return: -6.2, spyReturn: -1.7, xLabels: ["Jun 3", "Jun 10", "Jun 17", "Jun 24", "Jul 1"] },
    'YTD': { top10: [100, 103.61, 108.25, 111.14, 110.01, 113.71, 114.8, 116.38, 117.59, 112.36, 114.42, 114.11, 109.11, 113.77, 121.27, 125.02, 128.7, 133.12, 138.4, 128.69, 138.78, 139.32, 129.91, 132.09, 128.88, 128], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 100.07, 100.65, 99.46, 98.11, 96.11, 92.68, 96.63, 100.61, 103.93, 104.88, 105.29, 108.41, 108.32, 110.07, 111.39, 108.08, 110.03, 107.53, 109.36], top10Return: 28, spyReturn: 9.4, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 101.34, 106.08, 107.37, 106.47, 111.73, 111.42, 112.9, 114.08, 109.02, 111.02, 110.73, 105.87, 110.11, 119.16, 120.6, 123.23, 131.96, 131.03, 124.66, 134.37, 134.87, 125.92, 128, 124.91, 124.04], spy: [100, 101.6, 101.24, 101.4, 101.79, 101.58, 99.95, 99.89, 100.47, 99.28, 97.93, 95.93, 92.51, 96.49, 101.65, 103.06, 104.17, 105.94, 108.05, 108.12, 109.87, 111.18, 107.89, 109.83, 107.33, 109.16], top10Return: 28, spyReturn: 9.4, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 102.51, 104.55, 106.86, 104.25, 104.99, 106.98, 106.48, 108.54, 108.09, 109.66, 112.67, 113.97, 116.95, 121.63, 123.44, 120.76, 125.52, 125.68, 124.55, 120.72, 122.43, 125.41, 126.68, 122.7, 125.46, 125.37, 126.67, 130.54, 132.36, 130.99, 133.74, 133.05, 136.12, 132.75, 133.55, 134.06, 135.7, 131.77, 136.21, 146.01, 148.21, 146.88, 155.24, 157.72, 150.96, 159.42, 161.74, 150.58, 153.48, 148.41, 148.15], spy: [100, 100.87, 101.22, 102.25, 101.87, 101.9, 103.94, 102.85, 104.22, 104.62, 105.99, 106.74, 106.06, 107.86, 108.17, 106.48, 107.63, 110.79, 109.21, 110.14, 106.8, 109.55, 110.31, 111.08, 109.03, 111.26, 110.11, 111.87, 111.48, 111.65, 112.08, 111.85, 110.06, 110.78, 109.65, 109.14, 107.83, 105.63, 101.86, 106.25, 111.93, 113.48, 114.71, 116.65, 118.97, 118.26, 120.98, 122.42, 118.79, 120.93, 118.18, 120.2], top10Return: 48.2, spyReturn: 20.2, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Industrials': {
    '1D': { top10: [100, 99.1, 99.27, 99.4, 99.28, 99.16, 99.21, 99.28, 99.23, 99.13, 99.18, 99.23, 99.18, 99.19, 99.11, 98.94, 98.9, 98.76, 98.7, 98.63, 98.76, 98.75, 98.55, 98.52], spy: [100, 99.52, 99.82, 100, 100.02, 100.01, 100.17, 100.34, 100.27, 100.27, 100.31, 100.24, 100.17, 100.14, 100.16, 100.09, 100.12, 100.06, 100.07, 99.96, 100.08, 100.02, 99.97, 99.86], top10Return: -1.5, spyReturn: -0.14, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 98.47, 99.55, 100.91, 99.36], spy: [100, 99.28, 100.91, 101.7, 101.56], top10Return: -0.7, spyReturn: 1.6, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 100.65, 100.17, 101.04, 98.92, 99.36, 99.42, 96.97, 100.36, 100.65, 99.67, 100.37, 100.87, 101.91, 100.5, 100.9, 101.81, 100.19, 101.3, 102.72, 101.05], spy: [100, 100.14, 99.43, 99.81, 97.23, 97.45, 97.17, 95.64, 97.26, 97.79, 98.92, 97.68, 98.44, 98.13, 96.71, 96.66, 96.8, 96.1, 97.69, 98.45, 98.32], top10Return: 1.1, spyReturn: -1.7, xLabels: ["Jun 3", "Jun 10", "Jun 17", "Jun 24", "Jul 1"] },
    'YTD': { top10: [100, 105.14, 110.48, 110.36, 110.07, 114.34, 117.61, 118.93, 119.73, 114.05, 112.43, 111.38, 107.51, 113.21, 119.69, 120.93, 120.95, 121.72, 124.81, 121.5, 124.12, 124.2, 123, 124.64, 125.27, 125.34], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 100.07, 100.65, 99.46, 98.11, 96.11, 92.68, 96.63, 100.61, 103.93, 104.88, 105.29, 108.41, 108.32, 110.07, 111.39, 108.08, 110.03, 107.53, 109.36], top10Return: 25.3, spyReturn: 9.4, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 103.9, 108.31, 107.43, 107.5, 112.4, 114.37, 115.91, 117.03, 112.75, 110.45, 108.78, 105.84, 110.32, 116.93, 116, 116.43, 119.92, 121.54, 118.37, 121.01, 121.23, 120.03, 121.59, 122.2, 122.27], spy: [100, 101.6, 101.24, 101.4, 101.79, 101.58, 99.95, 99.89, 100.47, 99.28, 97.93, 95.93, 92.51, 96.49, 101.65, 103.06, 104.17, 105.94, 108.05, 108.12, 109.87, 111.18, 107.89, 109.83, 107.33, 109.16], top10Return: 24.7, spyReturn: 9.4, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 101.59, 103.19, 103.78, 103.74, 103.81, 105.8, 103.26, 105.89, 105.28, 107.59, 108.48, 108.31, 111.32, 111.66, 110.41, 110.37, 114.57, 112.11, 111.13, 106.45, 109.28, 110.39, 113.51, 110, 113.19, 113.5, 118.84, 124.22, 123.4, 123.83, 130.3, 130.72, 132.54, 130.36, 125.77, 123.78, 123.99, 119.66, 125.61, 133.38, 133.3, 133.14, 137.38, 137.88, 134, 137.74, 138.17, 135.75, 138.27, 139.34, 139.41], spy: [100, 100.87, 101.22, 102.25, 101.87, 101.9, 103.94, 102.85, 104.22, 104.62, 105.99, 106.74, 106.06, 107.86, 108.17, 106.48, 107.63, 110.79, 109.21, 110.14, 106.8, 109.55, 110.31, 111.08, 109.03, 111.26, 110.11, 111.87, 111.48, 111.65, 112.08, 111.85, 110.06, 110.78, 109.65, 109.14, 107.83, 105.63, 101.86, 106.25, 111.93, 113.48, 114.71, 116.65, 118.97, 118.26, 120.98, 122.42, 118.79, 120.93, 118.18, 120.2], top10Return: 39.4, spyReturn: 20.2, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Meme': {
    '1D': { top10: [100, 96.97, 98.27, 98.25, 98.26, 97.5, 97.61, 97.71, 98.29, 98.61, 98.19, 98.67, 98.65, 98.36, 98.59, 98.38, 98.34, 98.06, 97.45, 97.23, 97.87, 97.58, 97.11, 96.92], spy: [100, 99.52, 99.82, 100, 100.02, 100.01, 100.17, 100.34, 100.27, 100.27, 100.31, 100.24, 100.17, 100.14, 100.16, 100.09, 100.12, 100.06, 100.07, 99.96, 100.08, 100.02, 99.97, 99.86], top10Return: -3.7, spyReturn: -0.14, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 97.91, 102.19, 104.3, 100.4], spy: [100, 99.28, 100.91, 101.7, 101.56], top10Return: 0.4, spyReturn: 1.6, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 102.46, 98.88, 99.41, 89.27, 91.56, 88.31, 85.88, 91.43, 90.27, 91.57, 92.14, 95.42, 95.29, 90.87, 87.83, 87.38, 85.57, 89.26, 91.11, 87.7], spy: [100, 100.14, 99.43, 99.81, 97.23, 97.45, 97.17, 95.64, 97.26, 97.79, 98.92, 97.68, 98.44, 98.13, 96.71, 96.66, 96.8, 96.1, 97.69, 98.45, 98.32], top10Return: -12.3, spyReturn: -1.7, xLabels: ["Jun 3", "Jun 10", "Jun 17", "Jun 24", "Jul 1"] },
    'YTD': { top10: [100, 108.03, 105.55, 106.35, 99.62, 96.61, 93.56, 93.37, 94.8, 92.23, 93.45, 92.11, 85.8, 94.45, 106.88, 114.64, 112.67, 119.38, 127.99, 123.62, 138.32, 143.41, 125.07, 128.2, 122.8, 121.97], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 100.07, 100.65, 99.46, 98.11, 96.11, 92.68, 96.63, 100.61, 103.93, 104.88, 105.29, 108.41, 108.32, 110.07, 111.39, 108.08, 110.03, 107.53, 109.36], top10Return: 22, spyReturn: 9.4, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 106.14, 103.76, 99.84, 95.3, 95.66, 89.66, 89.73, 91.08, 88.7, 89.75, 88.45, 82.68, 91.61, 105.46, 107.99, 105.28, 117.62, 120.37, 118.76, 132.56, 137.43, 120.09, 123.12, 117.97, 117.2], spy: [100, 101.6, 101.24, 101.4, 101.79, 101.58, 99.95, 99.89, 100.47, 99.28, 97.93, 95.93, 92.51, 96.49, 101.65, 103.06, 104.17, 105.94, 108.05, 108.12, 109.87, 111.18, 107.89, 109.83, 107.33, 109.16], top10Return: 22, spyReturn: 9.4, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 103.5, 101.98, 96, 92.77, 91.33, 89.74, 85.88, 84.41, 82.24, 86.62, 88.6, 90.19, 90.18, 88.39, 90.66, 86.44, 94.49, 92.9, 91.44, 88.32, 86.55, 86.6, 84.42, 86.27, 86.7, 89.27, 92.3, 93.23, 91.51, 91, 90.26, 89.75, 87.75, 89.45, 94.93, 98.64, 97.02, 91.62, 95.77, 105.43, 107.4, 110.76, 104.62, 113.56, 113.31, 119.07, 113.94, 113.17, 112.76, 107.12, 106.9], spy: [100, 100.87, 101.22, 102.25, 101.87, 101.9, 103.94, 102.85, 104.22, 104.62, 105.99, 106.74, 106.06, 107.86, 108.17, 106.48, 107.63, 110.79, 109.21, 110.14, 106.8, 109.55, 110.31, 111.08, 109.03, 111.26, 110.11, 111.87, 111.48, 111.65, 112.08, 111.85, 110.06, 110.78, 109.65, 109.14, 107.83, 105.63, 101.86, 106.25, 111.93, 113.48, 114.71, 116.65, 118.97, 118.26, 120.98, 122.42, 118.79, 120.93, 118.18, 120.2], top10Return: 6.9, spyReturn: 20.2, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
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
export const SCAN_TIMESTAMP    = '2026-07-01T21:46:58.892Z';
export const SCAN_TIMESTAMP_NY = 'July 1, 2026 at 5:46 PM ET';
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
  { ticker: 'MU', name: `Micron Technology Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 13.67, bestProScore: 5.79, avgProScore: 4.56, price: 1032.28, weeklyChange: -14.94 },
  { ticker: 'NVDA', name: `NVIDIA Corp`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 12.35, bestProScore: 6.03, avgProScore: 4.12, price: 197.58, weeklyChange: 0.94 },
  { ticker: 'AMD', name: `Advanced Micro Devices Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 10.85, bestProScore: 5.14, avgProScore: 3.62, price: 540.88, weeklyChange: 1.56 },
  { ticker: 'AVGO', name: `Broadcom Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 6.30, bestProScore: 2.76, avgProScore: 2.10, price: 369.34, weeklyChange: -2.53 },
  { ticker: 'INTC', name: `INTEL CORPORATION`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.81, bestProScore: 3.49, avgProScore: 2.41, price: 127.02, weeklyChange: -4.40 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.41, bestProScore: 2.57, avgProScore: 2.21, price: 272.05, weeklyChange: -3.27 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.31, bestProScore: 2.64, avgProScore: 2.16, price: 444.23, weeklyChange: 2.12 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 4.28, bestProScore: 2.32, avgProScore: 2.14, price: 264.86, weeklyChange: -14.34 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 4.08, bestProScore: 2.67, avgProScore: 2.04, price: 391.26, weeklyChange: -2.63 },
  { ticker: 'WDC', name: `Western Digital Corp`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 3.64, bestProScore: 2.06, avgProScore: 1.82, price: 598.37, weeklyChange: -11.40 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': -5.4, '1M': 1.1, 'YTD': 110.5, '6M': 110.5, '1Y': 186.1 },
  ARTY: { '1W': -2.2, '1M': -6.3, 'YTD': 51.8, '6M': 51.8, '1Y': 79.7 },
  BAI:  { '1W': -3.8, '1M': -2.9, 'YTD': 48.6, '6M': 48.6, '1Y': 73.8 },
  IGPT: { '1W': -2.7, '1M': -1.7, 'YTD': 68.4, '6M': 68.4, '1Y': 104.7 },
  IVES: { '1W': 5.7, '1M': -9.2, 'YTD': 19.9, '6M': 19.9, '1Y': 41.1 },
  ALAI: { '1W': 1.9, '1M': -3.6, 'YTD': 24.7, '6M': 24.7, '1Y': 48.9 },
  CHAT: { '1W': -4.4, '1M': -8.3, 'YTD': 58.6, '6M': 58.6, '1Y': 93.8 },
  AIFD: { '1W': 1.9, '1M': -3.1, 'YTD': 43, '6M': 43, '1Y': 77 },
  SPRX: { '1W': -0.3, '1M': -1.4, 'YTD': 41.7, '6M': 41.7, '1Y': 87.5 },
  AOTG: { '1W': 3.1, '1M': -3.7, 'YTD': 15.1, '6M': 15.1, '1Y': 30.2 },
  // Semiconductors
  SOXX: { '1W': -4.1, '1M': 4.9, 'YTD': 99.1, '6M': 99.1, '1Y': 147.7 },
  PSI:  { '1W': -1.6, '1M': 13.5, 'YTD': 121.2, '6M': 121.2, '1Y': 185.2 },
  XSD:  { '1W': -0.3, '1M': -0.9, 'YTD': 85.3, '6M': 85.3, '1Y': 127.7 },
  DRAM: { '1W': -14.3, '1M': -3.1, 'YTD': 137.2, '6M': 137.2, '1Y': 137.2 },
  // Broad Tech
  PTF:  { '1W': -4.1, '1M': -2.8, 'YTD': 65.7, '6M': 65.7, '1Y': 89.2 },
  WCLD: { '1W': 14.5, '1M': -7.7, 'YTD': -5.2, '6M': -5.2, '1Y': -7.1 },
  IGV:  { '1W': 10.1, '1M': -13.3, 'YTD': -11.7, '6M': -11.7, '1Y': -14.2 },
  FDTX: { '1W': 0.2, '1M': 0.2, 'YTD': 38, '6M': 38, '1Y': 45.9 },
  GTEK: { '1W': 2.7, '1M': 1.6, 'YTD': 54.5, '6M': 54.5, '1Y': 72.8 },
  ARKK: { '1W': 6.9, '1M': 0.7, 'YTD': 6.4, '6M': 6.4, '1Y': 16 },
  MARS: { '1W': 12.7, '1M': -20.1, 'YTD': 26.3, '6M': 26.3, '1Y': 26.3 },
  FRWD: { '1W': -0.7, '1M': -2.6, 'YTD': 31.2, '6M': 31.2, '1Y': 31.2 },
  BCTK: { '1W': 2.7, '1M': -0.8, 'YTD': 25.2, '6M': 25.2, '1Y': 27.5 },
  FWD:  { '1W': -1.3, '1M': -0.5, 'YTD': 36.9, '6M': 36.9, '1Y': 61.4 },
  CBSE: { '1W': -0.1, '1M': 0.6, 'YTD': 29.3, '6M': 29.3, '1Y': 38.3 },
  FCUS: { '1W': -4.4, '1M': -4.7, 'YTD': 37.3, '6M': 37.3, '1Y': 68.9 },
  WGMI: { '1W': -9.5, '1M': -16.9, 'YTD': 53.6, '6M': 53.6, '1Y': 133.7 },
  CNEQ: { '1W': 2.4, '1M': -2.4, 'YTD': 17.9, '6M': 17.9, '1Y': 39.3 },
  SGRT: { '1W': -4.6, '1M': -3, 'YTD': 42.7, '6M': 42.7, '1Y': 78.4 },
  SPMO: { '1W': -2.7, '1M': 2, 'YTD': 30.2, '6M': 30.2, '1Y': 39.5 },
  XMMO: { '1W': -3, '1M': -0.2, 'YTD': 19.9, '6M': 19.9, '1Y': 28.1 },
  // Electrification
  POW:  { '1W': -1.9, '1M': -4.5, 'YTD': 52, '6M': 52, '1Y': 47.5 },
  VOLT: { '1W': -3.4, '1M': 4.9, 'YTD': 39.6, '6M': 39.6, '1Y': 58.9 },
  PBD:  { '1W': 0.5, '1M': -13.6, 'YTD': 20.1, '6M': 20.1, '1Y': 48.7 },
  PBW:  { '1W': 1.7, '1M': -15.9, 'YTD': 24.8, '6M': 24.8, '1Y': 82.2 },
  IVEP: { '1W': -4.6, '1M': -2, 'YTD': 3.5, '6M': 3.5, '1Y': 3.5 },
  // Industrials
  AIRR: { '1W': -2.7, '1M': 1.5, 'YTD': 31.6, '6M': 31.6, '1Y': 54.9 },
  PRN:  { '1W': -3, '1M': 4, 'YTD': 43.2, '6M': 43.2, '1Y': 61.3 },
  RSHO: { '1W': 0, '1M': 5.8, 'YTD': 39.4, '6M': 36.1, '1Y': 53.9 },
  IDEF: { '1W': 3.5, '1M': -3.9, 'YTD': 4.1, '6M': 4.1, '1Y': 15.3 },
  BILT: { '1W': -1.1, '1M': -2.1, 'YTD': 8.4, '6M': 8.4, '1Y': 11.6 },
  // Meme
  BUZZ: { '1W': 4.5, '1M': -9.8, 'YTD': 13.3, '6M': 13.3, '1Y': 22 },
  MEME: { '1W': -1.3, '1M': -19.2, 'YTD': 46.3, '6M': 46.3, '1Y': -7.6 },
  RKNG: { '1W': -2, '1M': -8, 'YTD': 6.3, '6M': 6.3, '1Y': 6.3 },
};
// @@END_GENERATED:ETF_RETURNS@@

// @@GENERATED:ETF_DAY_CHANGE@@
// Today's % move per ETF ticker (1D, vs prior close). Refreshed by the 3×/day
// price jobs. Powers the 1D ranking in the theme-ETF side panel.
export const ETF_DAY_CHANGE: Record<string, number> = {
  AIS:  -6.82,
  ARTY: -3.97,
  BAI:  -6.13,
  IGPT: -3.8,
  IVES: -0.5,
  ALAI: -1.34,
  CHAT: -5.23,
  AIFD: -2.96,
  SPRX: -5.92,
  AOTG: -1.43,
  SOXX: -6.41,
  PSI:  -7.14,
  XSD:  -4.43,
  DRAM: -10.82,
  PTF:  -6.94,
  WCLD: 3.57,
  IGV:  3.02,
  FDTX: -2.7,
  GTEK: -1.8,
  ARKK: 1.27,
  MARS: -3.16,
  FRWD: -3.11,
  BCTK: -3.14,
  FWD:  -3.52,
  CBSE: -2.66,
  FCUS: -3.87,
  WGMI: -6.82,
  CNEQ: -1.82,
  SGRT: -4.85,
  SPMO: -3.85,
  XMMO: -2.43,
  POW:  -3.52,
  VOLT: -3.6,
  PBD:  -1.48,
  PBW:  -2.28,
  IVEP: -3.4,
  AIRR: -2.92,
  PRN:  -3.96,
  IDEF: 0.91,
  BILT: 0.04,
  BUZZ: -0.35,
  MEME: -5.82,
  RKNG: -5.03,
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
  'AI & ML': { etfs: ['AIS', 'AOTG', 'SPRX'], series: { '1W': [100, 97.29, 100.83, 104.1, 99.13], '1M': [100, 103.19, 102.44, 101.03, 91.47, 94.75, 92.74, 89.79, 95.71, 96.72, 97.81, 98.66, 103.46, 104.98, 98.15, 97.26, 99.73, 96.92, 100.46, 103.74, 98.68], 'YTD': [100, 102.87, 105.65, 106.63, 104.88, 103.06, 102.41, 102.18, 104.71, 102.43, 103.27, 101.68, 90.77, 100.34, 111.38, 118.06, 123.25, 125.27, 140.22, 133.67, 152.21, 162.68, 145.78, 154.26, 154.23, 155.74], '6M': [100, 101.5, 103.47, 102.76, 102.71, 103.23, 98.95, 99.09, 101.53, 99.38, 100.15, 98.62, 88.09, 97.87, 110.35, 114.36, 115.44, 124.96, 132.11, 129.5, 147.31, 157.44, 141.14, 149.3, 149.24, 150.76], '1Y': [100, 101.5, 104.44, 106.16, 108.66, 110.18, 112.3, 106.94, 110.36, 110.74, 118.2, 123.44, 121.74, 127.03, 132.89, 128.84, 126.75, 138.13, 134.64, 130.91, 121.69, 124.45, 128.74, 132.04, 122.35, 128.93, 131.1, 133.08, 136.01, 134.97, 135.2, 136.34, 130.75, 133.96, 128.64, 130.82, 132.42, 130.34, 116.16, 129.4, 146.32, 151.65, 152.96, 166.07, 175.77, 171.47, 196.76, 210.31, 188.23, 199.4, 199.59, 201.25] }, returns: { '1W': -0.9, '1M': -1.3, 'YTD': 55.7, '6M': 50.8, '1Y': 101.3 } },
  'Semiconductors': { etfs: ['PSI', 'DRAM', 'XSD'], series: { '1W': [100, 94.67, 97.7, 102.11, 94.58], '1M': [100, 104.66, 105.74, 102.98, 90.51, 95.83, 94.33, 91.29, 100.42, 101.88, 102.61, 103.52, 111.56, 115.53, 104.38, 103.61, 109.3, 103.44, 106.74, 111.53, 103.18], 'YTD': [100, 107.31, 114.2, 118.33, 117.99, 120.64, 124.76, 123.69, 128.03, 129.21, 130.59, 136.66, 133.73, 136.77, 152.34, 168.29, 179.3, 192.12, 192.65, 187.55, 211.91, 216.45, 221, 216.21, 218.86, 214.58], '6M': [100, 105.68, 111.5, 114.34, 116.26, 117.92, 120.84, 120.14, 124.45, 125.9, 127.23, 133.28, 130.62, 133.68, 149.82, 164.87, 170.46, 191.25, 181.87, 182.36, 205.92, 210.42, 215.43, 210.27, 212.9, 208.48], '1Y': [100, 102.93, 103.3, 105.58, 105.15, 106.98, 113.49, 109.1, 114.26, 112.95, 116.67, 124.39, 121.8, 127.94, 128.12, 130.41, 128.98, 136.37, 141.2, 142.42, 133.43, 144.73, 152.87, 155.18, 147.45, 147.21, 147.09, 152.49, 157.54, 157.92, 169.67, 173.21, 175.69, 177.56, 178.61, 177.23, 173.09, 161.69, 159.88, 166.53, 189.91, 199.48, 210.22, 223.92, 243.71, 243.14, 251.7, 253.55, 248.65, 253.13, 255.77, 250.03] }, returns: { '1W': -5.4, '1M': 3.2, 'YTD': 114.6, '6M': 108.5, '1Y': 150 } },
  'Broad Tech': { etfs: ['WGMI', 'PTF', 'SGRT'], series: { '1W': [100, 97.6, 98.35, 100.16, 93.92], '1M': [100, 102.62, 102.36, 100.76, 91.26, 94.48, 91.9, 88.83, 94.78, 96.93, 99.33, 99.48, 102.89, 104.09, 99.44, 96.67, 98.28, 95.8, 96.66, 98.53, 92.42], 'YTD': [100, 107.37, 113.44, 114.56, 110.78, 110.24, 111.62, 112.5, 115.89, 107.44, 110.92, 110.02, 97.79, 109.13, 124.36, 132.2, 134.41, 137.73, 153.94, 143.67, 161.94, 171.79, 153.71, 166.3, 161.65, 153.99], '6M': [100, 104.18, 110.69, 106.96, 106.98, 109.44, 105.63, 107.56, 110.83, 102.76, 105.97, 105.15, 93.63, 105.94, 121.64, 124.3, 122.53, 138.26, 143.46, 137.06, 154.34, 163.57, 146.41, 158.34, 153.96, 146.93], '1Y': [100, 101.6, 104.41, 106.5, 105.65, 105.61, 106.56, 108.79, 114.3, 112.67, 124.87, 135.15, 136.35, 141.86, 158.01, 156.26, 143.77, 159.43, 164.74, 143.16, 132, 142.46, 144.98, 145.31, 130.89, 136.68, 140.16, 144.56, 154.47, 149.17, 150.17, 151.75, 141.51, 147.88, 141.37, 139.97, 140.88, 144.26, 135.13, 148.92, 167.1, 170.68, 173.39, 191.18, 193.33, 190.66, 211.93, 219.42, 203.17, 219.41, 213.83, 200.43] }, returns: { '1W': -6.1, '1M': -7.6, 'YTD': 54, '6M': 46.9, '1Y': 100.4 } },
  'Electrification': { etfs: ['PBW', 'POW', 'VOLT'], series: { '1W': [100, 97.12, 99.58, 102.01, 98.82], '1M': [100, 102.15, 101.03, 100.91, 94.08, 94.79, 93.66, 90.58, 94.75, 95.54, 97.06, 97.17, 99.44, 100.56, 96.04, 95.37, 96.17, 93.32, 95.59, 97.93, 94.81], 'YTD': [100, 104.13, 109.93, 112.37, 112.23, 115.87, 118.59, 119.33, 120.87, 114.8, 116.56, 116.34, 110.84, 116.55, 126.22, 131.1, 137.06, 142.29, 150.16, 137.67, 149.98, 149.96, 137.29, 142.31, 139.61, 138.8], '6M': [100, 101.21, 107.28, 107.52, 107.83, 113.48, 113.99, 114.8, 116.3, 110.45, 112.15, 111.95, 106.66, 112.21, 123.29, 125.49, 129.87, 140.66, 140.77, 132.42, 144.2, 144.11, 132.05, 136.89, 134.34, 133.55], '1Y': [100, 103.01, 105.77, 107.95, 104.88, 105.38, 107.49, 106.47, 109.82, 108.81, 110.1, 113.39, 116.3, 119.48, 124.69, 126.86, 123.67, 129.25, 128.75, 128.26, 123.53, 126.73, 130.91, 132.01, 127.89, 132.01, 130.78, 131.9, 136.59, 137.51, 137.29, 140.18, 139.36, 142.6, 140.17, 141.44, 142.63, 145.8, 140.72, 147.82, 158.95, 160.79, 157.56, 167.78, 171, 161.95, 172.36, 176.06, 164.13, 168.61, 162.16, 162.87] }, returns: { '1W': -1.2, '1M': -5.2, 'YTD': 38.8, '6M': 33.6, '1Y': 62.9 } },
  'Industrials': { etfs: ['PRN', 'RSHO', 'BILT'], series: { '1W': [100, 98.28, 99.24, 100.57, 98.65], '1M': [100, 100.99, 100.86, 101.14, 99.49, 100.17, 100.45, 98.19, 100.9, 101.63, 99.27, 100.66, 101.59, 103.34, 102.15, 102.95, 103.97, 102.13, 103.16, 104.6, 102.55], 'YTD': [100, 102.86, 107.52, 107.45, 108.67, 113.02, 118.03, 119.37, 119.23, 112.64, 111.71, 111.28, 109.29, 113.09, 120.6, 121.84, 123.18, 124.54, 127.76, 125.3, 126.95, 127.51, 127.21, 128.06, 130.88, 130.35], '6M': [100, 101.33, 105.32, 105.14, 106.11, 110.84, 115.01, 116.63, 117.07, 112.73, 110.6, 109.09, 108.54, 110.91, 117.76, 117.32, 118.97, 121.96, 125.37, 122.34, 124.1, 124.88, 124.53, 125.31, 128.05, 127.54], '1Y': [100, 101.54, 103.19, 103.9, 103.55, 102.61, 104.26, 102.63, 104.52, 103.87, 105.79, 106.06, 106.09, 108.36, 108.49, 108.12, 108.33, 112.1, 109.97, 109.09, 104.75, 107.48, 108.41, 111.45, 107.68, 110.75, 110.73, 113.59, 118.6, 118.72, 120.4, 127.1, 128.84, 130.24, 127.16, 122.01, 119.88, 121.69, 119.52, 123.45, 131.41, 132.55, 133.32, 137.01, 138.67, 136.23, 138.03, 139.2, 137.07, 139.13, 142.87, 142.29] }, returns: { '1W': -1.3, '1M': 2.5, 'YTD': 30.3, '6M': 27.5, '1Y': 42.3 } },
  'Meme': { etfs: ['MEME', 'BUZZ', 'RKNG'], series: { '1W': [100, 97.91, 102.19, 104.3, 100.4], '1M': [100, 102.46, 98.88, 99.41, 89.27, 91.56, 88.31, 85.88, 91.43, 90.27, 91.57, 92.14, 95.42, 95.29, 90.87, 87.83, 87.38, 85.57, 89.26, 91.11, 87.7], 'YTD': [100, 108.03, 105.55, 106.35, 99.62, 96.61, 93.56, 93.37, 94.8, 92.23, 93.45, 92.11, 85.8, 94.45, 106.88, 114.64, 112.67, 119.38, 127.99, 123.62, 138.32, 143.41, 125.07, 128.2, 122.8, 121.97], '6M': [100, 106.14, 103.76, 99.84, 95.3, 95.66, 89.66, 89.73, 91.08, 88.7, 89.75, 88.45, 82.68, 91.61, 105.46, 107.99, 105.28, 117.62, 120.37, 118.76, 132.56, 137.43, 120.09, 123.12, 117.97, 117.2], '1Y': [100, 103.5, 101.98, 96, 92.77, 91.33, 89.74, 85.88, 84.41, 82.24, 86.62, 88.6, 90.19, 90.18, 88.39, 90.66, 86.44, 94.49, 92.9, 91.44, 88.32, 86.55, 86.6, 84.42, 86.27, 86.7, 89.27, 92.3, 93.23, 91.51, 91, 90.26, 89.75, 87.75, 89.45, 94.93, 98.64, 97.02, 91.62, 95.77, 105.43, 107.4, 110.76, 104.62, 113.56, 113.31, 119.07, 113.94, 113.17, 112.76, 107.12, 106.9] }, returns: { '1W': 0.4, '1M': -12.3, 'YTD': 22, '6M': 17.2, '1Y': 6.9 } },
};
// @@END_GENERATED:THEME_REPRESENTATIVES@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 10, avgWeight: 6.03, proScore: 6.03, coverage: 1,
      price: 197.58, weeklyPrices: [195.74, 192.53, 194.97, 200.09, 197.58], weeklyChange: 0.94, dayChange: -1.25, sortRank: 0, periodReturns: { '1M': -11.9, 'YTD': 5.9, '6M': 5.9, '1Y': 25.6 },
      priceHistory: { '1D': [200.09, 194.45, 195.3, 196.02, 195.7, 195.85, 196.15, 196.93, 197.02, 196.89, 196.89, 197.05, 197.23, 197.71, 198.21, 198.6, 198.79, 198.05, 198.46, 198.06, 199.23, 199.3, 198.43, 197.58], '1W': [195.74, 192.53, 194.97, 200.09, 197.58], '1M': [224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58], 'YTD': [186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 222.32, 214.86, 222.82, 208.19, 207.41, 199, 197.58], '6M': [188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 222.32, 214.86, 222.82, 208.19, 207.41, 199, 197.58], '1Y': [157.25, 164.1, 173, 173.74, 177.87, 180.77, 181.59, 175.4, 181.6, 171.66, 177.17, 176.24, 177.69, 188.89, 192.57, 181.81, 180.28, 207.04, 195.21, 193.8, 186.52, 180.26, 183.38, 180.93, 174.14, 190.53, 188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 184.77, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 214.86, 222.82, 208.19, 207.41, 199, 197.58] },
      velocityScore: { '1D': -0.2, '1W': -2.9, '1M': 16, '6M': null }, isNew: false,
      marketCap: '$4.8T', pe: 30.3, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.5,
      etfPresence: { AIS: 2.26, ARTY: 4.4, BAI: 3.84, IGPT: 7.2, IVES: 4.71, ALAI: 12.24, CHAT: 6.3, AIFD: 6.05, SPRX: 3.33, AOTG: 9.94 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 6.43, proScore: 5.79, coverage: 0.9,
      price: 1032.28, weeklyPrices: [1213.56, 1132.33, 1145.28, 1154.29, 1032.28], weeklyChange: -14.94, dayChange: -10.57, sortRank: 0, periodReturns: { '1M': -0.3, 'YTD': 261.7, '6M': 261.7, '1Y': 747.9 },
      priceHistory: { '1D': [1154.29, 1081.66, 1078.14, 1083.5, 1066.35, 1057.3, 1058.36, 1061.94, 1056.07, 1049.34, 1055.02, 1050.51, 1052.01, 1047.05, 1052.66, 1043.49, 1041.9, 1043.47, 1041.47, 1039.61, 1055.62, 1061.17, 1047.14, 1032.28], '1W': [1213.56, 1132.33, 1145.28, 1154.29, 1032.28], '1M': [1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1032.28], '6M': [315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1032.28], '1Y': [121.74, 123.11, 113.26, 111.73, 109.14, 111.87, 124.27, 117.21, 117.75, 124.21, 150.57, 168.89, 156.83, 183.75, 192.33, 202.53, 198.47, 226.63, 237.5, 244.9, 225.92, 230.26, 226.65, 258.46, 248.55, 284.79, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1032.28] },
      velocityScore: { '1D': -2.7, '1W': 1.9, '1M': -8.4, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 23.3, revenueGrowth: 346, eps: 44.21, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { AIS: 7.1, ARTY: 5.52, BAI: 6.62, IGPT: 8.55, IVES: 5.35, ALAI: 1.48, CHAT: 4.31, AIFD: 7.39, SPRX: false, AOTG: 11.58 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 9, avgWeight: 5.72, proScore: 5.14, coverage: 0.9,
      price: 540.88, weeklyPrices: [532.57, 521.58, 539.49, 580.91, 540.88], weeklyChange: 1.56, dayChange: -6.89, sortRank: 0, periodReturns: { '1M': 6, 'YTD': 152.6, '6M': 152.6, '1Y': 290.5 },
      priceHistory: { '1D': [580.91, 553.76, 557.29, 556.99, 553.03, 553.36, 553.33, 554.48, 554.52, 550.4, 551.21, 551.03, 550.75, 550.95, 553.71, 550.35, 549.64, 548.67, 547.71, 543.9, 549.81, 550.18, 543.6, 540.88], '1W': [532.57, 521.58, 539.49, 580.91, 540.88], '1M': [510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 420.99, 503.89, 521.54, 475.51, 507.29, 519.74, 540.88], '6M': [223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 420.99, 503.89, 521.54, 475.51, 507.29, 519.74, 540.88], '1Y': [138.52, 144.16, 160.41, 162.12, 176.31, 172.4, 184.42, 165.2, 167.13, 161.79, 155.67, 157.92, 161.27, 169.73, 232.89, 234.56, 230.23, 264.33, 256.33, 258.89, 223.55, 214.24, 215.98, 221.43, 201.06, 214.99, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 503.89, 521.54, 475.51, 507.29, 519.74, 540.88] },
      velocityScore: { '1D': 1.8, '1W': 5.5, '1M': -0.8, '6M': null }, isNew: false,
      marketCap: '$882B', pe: 179.1, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.96, ARTY: 5.03, BAI: 5.07, IGPT: 8.77, IVES: 5.11, ALAI: 1.35, CHAT: 4.39, AIFD: false, SPRX: 0.56, AOTG: 16.2 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 8, avgWeight: 3.46, proScore: 2.76, coverage: 0.8,
      price: 369.34, weeklyPrices: [378.91, 365.02, 372.45, 377.75, 369.34], weeklyChange: -2.53, dayChange: -2.23, sortRank: 0, periodReturns: { '1M': -19.7, 'YTD': 6.7, '6M': 6.7, '1Y': 36.8 },
      priceHistory: { '1D': [377.75, 369.68, 371.87, 373.25, 371.16, 370.1, 371.28, 372.14, 372.04, 370.15, 369.54, 368.26, 369.27, 369.75, 369.31, 369.81, 370.38, 369.55, 370.86, 369.18, 371.68, 371.47, 371.27, 369.34], '1W': [378.91, 365.02, 372.45, 377.75, 369.34], '1M': [459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34], 'YTD': [346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 420.71, 422.01, 481.57, 392.16, 376.71, 382.07, 369.34], '6M': [347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 420.71, 422.01, 481.57, 392.16, 376.71, 382.07, 369.34], '1Y': [269.9, 275.4, 286.45, 288.71, 293.7, 303.76, 309.09, 291.17, 300.25, 306.1, 359.63, 345.35, 336.1, 338.18, 345.02, 354.15, 340.3, 385.98, 358.98, 355.22, 354.42, 397.57, 381.03, 406.37, 329.88, 352.13, 347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 342.58, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 422.01, 481.57, 392.16, 376.71, 382.07, 369.34] },
      velocityScore: { '1D': -1.1, '1W': -1.4, '1M': -16.4, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 61.5, revenueGrowth: 48, eps: 6.01, grossMargin: 76, dividendYield: 0.69,
      etfPresence: { AIS: 0.61, ARTY: 4.33, BAI: 3.9, IGPT: false, IVES: 4.58, ALAI: 3.77, CHAT: 3.93, AIFD: 5.1, SPRX: false, AOTG: 1.43 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 7, avgWeight: 3.68, proScore: 2.57, coverage: 0.7,
      price: 272.05, weeklyPrices: [281.26, 266.77, 277.75, 297.89, 272.05], weeklyChange: -3.27, dayChange: -8.67, sortRank: 0, periodReturns: { '1M': 24, 'YTD': 220.1, '6M': 220.1, '1Y': 266.4 },
      priceHistory: { '1D': [297.89, 284.07, 289.17, 287.14, 282.8, 280.77, 279.04, 278.15, 277.29, 276.13, 279.13, 278.91, 277.2, 274.86, 275.3, 275.05, 274.8, 275.45, 274.25, 273.15, 276.98, 277.45, 274.78, 272.05], '1W': [281.26, 266.77, 277.75, 297.89, 272.05], '1M': [219.43, 290.79, 301.65, 316.43, 263.47, 288.85, 266.88, 252.59, 280.71, 279.7, 278.67, 289.54, 310.58, 307.86, 279.04, 276.7, 281.26, 266.77, 277.75, 297.89, 272.05], 'YTD': [84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 109.51, 131.3, 147.84, 158.21, 163.66, 170.84, 168.93, 208.26, 290.79, 266.88, 278.67, 276.7, 272.05], '6M': [89.39, 83.22, 80.46, 81.77, 78.66, 82.35, 79.01, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 168.93, 208.26, 290.79, 266.88, 278.67, 276.7, 272.05], '1Y': [74.25, 73.36, 72.01, 74.04, 80.37, 75.85, 79.32, 71.22, 74.79, 64.1, 66.59, 74.23, 83.81, 86.2, 90.68, 88.23, 81.05, 90.15, 92.9, 89.33, 81.32, 87.72, 98.19, 89.43, 84.47, 86.34, 89.39, 83.22, 80.46, 81.77, 78.66, 82.35, 79.01, 78.39, 77.51, 93.3, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 176.27, 208.26, 290.79, 266.88, 278.67, 276.7, 272.05] },
      velocityScore: { '1D': 1.6, '1W': -3.7, '1M': 14.2, '6M': null }, isNew: false,
      marketCap: '$238B', pe: 93.2, revenueGrowth: 28, eps: 2.92, grossMargin: 52, dividendYield: 0.08,
      etfPresence: { AIS: 4.07, ARTY: 4.37, BAI: 2.02, IGPT: 3.68, IVES: false, ALAI: false, CHAT: 1.59, AIFD: 5.83, SPRX: 4.18, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 4.76, proScore: 2.86, coverage: 0.6,
      price: 361.21, weeklyPrices: [343.71, 337.39, 353.65, 357.37, 361.21], weeklyChange: 5.09, dayChange: 1.07, sortRank: 0, periodReturns: { '1M': -4, 'YTD': 15.4, '6M': 15.4, '1Y': 102.2 },
      priceHistory: { '1D': [357.37, 359.08, 358.26, 358.6, 361.26, 361.7, 361.38, 361.94, 359.6, 359.17, 359.23, 358.31, 358.96, 359.22, 358.68, 359.39, 360.39, 360, 359.86, 360.05, 359.59, 360.12, 360.89, 361.21], '1W': [343.71, 337.39, 353.65, 357.37, 361.21], '1M': [376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68, 373.25, 363.79, 368.03, 349.68, 346.13, 345.29, 343.71, 337.39, 353.65, 357.37, 361.21], 'YTD': [313, 325.44, 332.78, 327.93, 338, 322.86, 305.72, 311.49, 306.52, 306.36, 305.56, 302.06, 273.5, 299.99, 321.31, 337.42, 350.34, 383.25, 388.64, 396.94, 388.88, 361.85, 364.26, 373.25, 345.29, 361.21], '6M': [315.15, 328.57, 330, 333.26, 343.69, 324.32, 302.02, 311.49, 306.52, 306.36, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 388.43, 387.35, 396.94, 388.88, 361.85, 364.26, 373.25, 345.29, 361.21], '1Y': [178.64, 177.62, 183.58, 192.17, 191.9, 196.52, 201.96, 199.32, 207.48, 232.3, 240.37, 252.03, 245.79, 245.69, 241.53, 251.46, 251.69, 274.57, 284.31, 286.71, 292.81, 319.95, 317.62, 312.43, 302.46, 313.51, 315.15, 328.57, 330, 333.26, 343.69, 324.32, 302.02, 310.9, 303.58, 307.04, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 388.43, 387.35, 387.66, 388.88, 361.85, 364.26, 373.25, 345.29, 361.21] },
      velocityScore: { '1D': -1.4, '1W': -1, '1M': -18.3, '6M': null }, isNew: false,
      marketCap: '$4.4T', pe: 27.5, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.96, IGPT: 7.37, IVES: 4.62, ALAI: false, CHAT: 5.11, AIFD: 4.71, SPRX: false, AOTG: 3.8 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 6, avgWeight: 2.63, proScore: 1.58, coverage: 0.6,
      price: 598.37, weeklyPrices: [675.39, 586.45, 651.88, 638.72, 598.37], weeklyChange: -11.4, dayChange: -6.32, sortRank: 0, periodReturns: { '1M': 9.6, 'YTD': 247.3, '6M': 247.3, '1Y': 809.7 },
      priceHistory: { '1D': [638.72, 607, 608.65, 603.46, 594.07, 592.44, 592.94, 600.88, 601.61, 603.73, 602.5, 599, 597.91, 597.88, 597.28, 595.39, 596.21, 595.4, 593.72, 592.82, 597.68, 601.96, 600.44, 598.37], '1W': [675.39, 586.45, 651.88, 638.72, 598.37], '1M': [546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37], 'YTD': [172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 458.68, 524.65, 563.1, 517.72, 681.08, 643.83, 598.37], '6M': [187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 458.68, 524.65, 563.1, 517.72, 681.08, 643.83, 598.37], '1Y': [65.78, 65.06, 67.02, 69.02, 78.69, 74.44, 76.07, 75.64, 80.67, 90.49, 96.15, 105.15, 107.21, 131.26, 119.7, 125.92, 120.47, 141.38, 160.1, 166.11, 153.97, 157.74, 161, 187.2, 175.01, 181.54, 187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 266.22, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 524.65, 563.1, 517.72, 681.08, 643.83, 598.37] },
      velocityScore: { '1D': -4.2, '1W': 12.9, '1M': -19, '6M': null }, isNew: false,
      marketCap: '$206B', pe: 35.8, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.09,
      etfPresence: { AIS: 1.35, ARTY: 3.08, BAI: 3.2, IGPT: 3.11, IVES: false, ALAI: 4.34, CHAT: false, AIFD: false, SPRX: false, AOTG: 0.71 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'ANET', name: 'Arista Networks Inc', easyScore: 6, avgWeight: 2.28, proScore: 1.37, coverage: 0.6,
      price: 166.62, weeklyPrices: [165.45, 157.60, 164.10, 169.88, 166.62], weeklyChange: 0.71, dayChange: -1.92, sortRank: 0, periodReturns: { '1M': -2.4, 'YTD': 27.2, '6M': 27.2, '1Y': 64.8 },
      priceHistory: { '1D': [169.88, 164.09, 166.63, 167.99, 168.2, 167.79, 168.53, 169.17, 169.95, 169.1, 169.12, 168.4, 168.07, 167.59, 167.59, 166.46, 166.41, 166.96, 168.07, 167.63, 167.27, 166.36, 165.88, 166.62], '1W': [165.45, 157.6, 164.1, 169.88, 166.62], '1M': [170.68, 175.33, 174.37, 166.01, 154.27, 156.4, 152.16, 151.76, 156.4, 163.24, 168.01, 164.93, 169.67, 174.56, 162.2, 161.74, 165.45, 157.6, 164.1, 169.88, 166.62], 'YTD': [131.03, 123.72, 130.59, 136.34, 141.74, 137.49, 141.59, 127.43, 129.3, 137.17, 135.35, 135.88, 116.13, 126.25, 152.02, 166.85, 172.47, 172.62, 136.43, 141.71, 158.01, 175.33, 152.16, 168.01, 161.74, 166.62], '6M': [133.6, 122.89, 129.83, 143.72, 138.37, 141.74, 142.58, 127.43, 129.3, 137.17, 135.35, 135.88, 116.13, 133.64, 154.37, 172.86, 165.29, 170.22, 142.54, 141.71, 158.01, 175.33, 152.16, 168.01, 161.74, 166.62], '1Y': [101.13, 106.29, 111.98, 114.04, 123.22, 139.28, 138.01, 131.47, 133.27, 141.17, 153.04, 146.66, 143.06, 144.46, 158.23, 146.01, 146.59, 162.03, 140.42, 134.98, 124.81, 127.65, 128.55, 134.39, 124.62, 131.84, 133.6, 122.89, 129.83, 143.72, 138.37, 141.74, 142.58, 128.77, 124.6, 139.62, 135.35, 135.88, 116.13, 133.64, 154.37, 172.86, 165.29, 170.22, 142.54, 141.58, 158.01, 175.33, 152.16, 168.01, 161.74, 166.62] },
      velocityScore: { '1D': -2.8, '1W': 2.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$210B', pe: 57.5, revenueGrowth: 35, eps: 2.9, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: 1.38, ARTY: 2.42, BAI: 1.31, IGPT: false, IVES: false, ALAI: false, CHAT: 2.21, AIFD: 4.75, SPRX: 1.6, AOTG: false },
      tonyNote: 'Arista Networks Inc appears in 6 of 10 AI & ML ETFs (60% coverage) with average weight 2.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 5, avgWeight: 5.28, proScore: 2.64, coverage: 0.5,
      price: 444.23, weeklyPrices: [434.99, 432.35, 455.10, 477.57, 444.23], weeklyChange: 2.12, dayChange: -6.98, sortRank: 0, periodReturns: { '1M': 2, 'YTD': 46.2, '6M': 46.2, '1Y': 90.2 },
      priceHistory: { '1D': [477.57, 458.65, 460.23, 458.42, 455.01, 450.88, 449.54, 451.22, 449.39, 446.7, 447.95, 447.81, 446.02, 445.13, 444.72, 445.29, 445.81, 445.92, 445.41, 443.77, 448.17, 448.33, 447.76, 444.23], '1W': [434.99, 432.35, 455.1, 477.57, 444.23], '1M': [435.63, 446.69, 436.69, 444.92, 415.17, 426.8, 427.92, 408.75, 421.07, 423.93, 425.83, 432.15, 462.12, 467.67, 436.39, 440.83, 434.99, 432.35, 455.1, 477.57, 444.23], 'YTD': [303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 370.04, 369.11, 348.7, 340.23, 338.45, 316.5, 341.76, 369.57, 366.24, 404.98, 401.61, 404.54, 395.95, 412.32, 446.69, 427.92, 425.83, 440.83, 444.23], '6M': [319.61, 323.63, 342.4, 332.71, 341.36, 355.41, 364.2, 370.04, 369.11, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 395.95, 412.32, 446.69, 427.92, 425.83, 440.83, 444.23], '1Y': [233.6, 229.76, 245.6, 241.6, 241.62, 242.62, 241.44, 228.6, 239.29, 235.21, 258.91, 268.64, 276.66, 288.11, 299.88, 299.84, 288.88, 305.09, 293.64, 290.62, 282.37, 289.96, 292.93, 304.85, 284.68, 302.84, 319.61, 323.63, 342.4, 332.71, 341.36, 355.41, 364.2, 385.75, 353.13, 347.09, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 392.61, 412.32, 446.69, 427.92, 425.83, 440.83, 444.23] },
      velocityScore: { '1D': 1.5, '1W': -9, '1M': -11.7, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 38.6, revenueGrowth: 35, eps: 11.51, grossMargin: 62, dividendYield: 0.8,
      etfPresence: { AIS: 3.31, ARTY: false, BAI: 4.54, IGPT: false, IVES: 5.26, ALAI: 5.97, CHAT: false, AIFD: false, SPRX: false, AOTG: 7.3 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 5, avgWeight: 3.84, proScore: 1.92, coverage: 0.5,
      price: 241.7, weeklyPrices: [227.01, 232.69, 240.14, 238.34, 241.70], weeklyChange: 6.47, dayChange: 1.41, sortRank: 0, periodReturns: { '1M': -7.5, 'YTD': 4.7, '6M': 4.7, '1Y': 9.9 },
      priceHistory: { '1D': [238.34, 236.25, 238.23, 239.13, 241.48, 241.89, 242.05, 243.29, 241.9, 242.12, 242.19, 242.46, 243.01, 243.87, 244.32, 244.01, 244.37, 243.97, 244.08, 243.68, 243.02, 242.04, 242.24, 241.7], '1W': [227.01, 232.69, 240.14, 238.34, 241.7], '1M': [261.26, 256.52, 250.02, 253.79, 246.03, 245.22, 244.19, 238, 241.51, 238.55, 246, 237.5, 244.39, 232.79, 234.11, 234.27, 227.01, 232.69, 240.14, 238.34, 241.7], 'YTD': [230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 198.79, 205.27, 208.39, 213.49, 211.74, 210.14, 200.95, 212.79, 239.89, 248.28, 261.12, 272.05, 268.99, 264.86, 265.29, 256.52, 244.19, 246, 234.27, 241.7], '6M': [226.5, 247.38, 239.12, 238.42, 242.96, 208.72, 201.15, 205.27, 208.39, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 264.86, 265.29, 256.52, 244.19, 246, 234.27, 241.7], '1Y': [219.92, 222.26, 223.88, 232.23, 234.11, 223.13, 224.56, 223.81, 229.12, 235.68, 229.95, 231.23, 218.15, 222.41, 227.74, 214.47, 217.95, 230.3, 250.2, 244.2, 222.69, 229.16, 229.11, 230.28, 226.76, 232.52, 226.5, 247.38, 239.12, 238.42, 242.96, 208.72, 201.15, 208.56, 208.73, 214.33, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 259.34, 265.29, 256.52, 244.19, 246, 234.27, 241.7] },
      velocityScore: { '1D': -3.5, '1W': 22.3, '1M': -33.3, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 32.1, revenueGrowth: 17, eps: 7.53, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 4.67, ALAI: 4.94, CHAT: 2.31, AIFD: 3.32, SPRX: false, AOTG: 3.94 },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 5, avgWeight: 3.74, proScore: 1.87, coverage: 0.5,
      price: 612.91, weeklyPrices: [542.87, 550.25, 562.60, 563.29, 612.91], weeklyChange: 12.9, dayChange: 8.81, sortRank: 0, periodReturns: { '1M': 2.1, 'YTD': -7.1, '6M': -7.1, '1Y': -14.1 },
      priceHistory: { '1D': [563.29, 601.9, 614.46, 611.24, 620.1, 624.01, 625.82, 627.5, 618.59, 618.71, 618.01, 618.66, 617.48, 618.24, 617.86, 621.55, 621.21, 618.23, 620.24, 618.61, 617.21, 615.02, 612.83, 612.91], '1W': [542.87, 550.25, 562.6, 563.29, 612.91], '1M': [600.47, 597.63, 622.98, 627.57, 593, 585.39, 584.59, 570.98, 568.43, 566.98, 600.21, 567.58, 577.22, 563.85, 562.2, 557.67, 542.87, 550.25, 562.6, 563.29, 612.91], 'YTD': [660.09, 646.06, 620.8, 658.76, 716.5, 661.46, 639.77, 637.25, 653.56, 647.39, 627.45, 604.06, 536.38, 573.02, 634.53, 670.91, 678.62, 610.41, 598.86, 611.21, 612.34, 597.63, 584.59, 600.21, 557.67, 612.91], '6M': [650.41, 653.06, 620.25, 672.36, 706.41, 677.22, 639.29, 637.25, 653.56, 647.39, 627.45, 604.06, 536.38, 575.05, 662.49, 668.84, 671.34, 604.96, 603, 611.21, 612.34, 597.63, 584.59, 600.21, 557.67, 612.91], '1Y': [713.57, 727.24, 701.41, 714.8, 773.44, 761.83, 780.08, 747.72, 747.38, 748.65, 750.9, 780.25, 748.91, 727.05, 733.51, 712.07, 733.41, 751.67, 635.95, 609.01, 590.32, 633.61, 661.53, 652.71, 664.45, 663.29, 650.41, 653.06, 620.25, 672.36, 706.41, 677.22, 639.29, 639.3, 655.08, 654.07, 627.45, 604.06, 536.38, 575.05, 662.49, 668.84, 671.34, 604.96, 603, 602.61, 612.34, 597.63, 584.59, 600.21, 557.67, 612.91] },
      velocityScore: { '1D': -2.6, '1W': -3.1, '1M': -29.7, '6M': null }, isNew: false,
      marketCap: '$1.6T', pe: 22.3, revenueGrowth: 33, eps: 27.49, grossMargin: 82, dividendYield: 0.37,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: 7.31, IVES: 4.54, ALAI: 3.76, CHAT: 2, AIFD: false, SPRX: false, AOTG: 1.08 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 5, avgWeight: 3.66, proScore: 1.83, coverage: 0.5,
      price: 430.86, weeklyPrices: [398.00, 391.74, 455.96, 483.02, 430.86], weeklyChange: 8.26, dayChange: -10.8, sortRank: 0, periodReturns: { '1M': 34.6, 'YTD': 159, '6M': 159, '1Y': 386.5 },
      priceHistory: { '1D': [483.02, 454.62, 464, 463.89, 455.17, 450.01, 452, 458.33, 454.63, 444.76, 449.51, 447.94, 445.05, 444.45, 444.57, 441.83, 440.96, 440.94, 439.08, 436.89, 441.4, 443.24, 433.44, 430.86], '1W': [398, 391.74, 455.96, 483.02, 430.86], '1M': [320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86], 'YTD': [166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 215.58, 318.72, 355.76, 341.7, 361.71, 399.92, 430.86], '6M': [179.56, 162.61, 182, 163.25, 152.44, 187.67, 123.69, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 215.58, 318.72, 355.76, 341.7, 361.71, 399.92, 430.86], '1Y': [88.57, 97.02, 97.95, 121.68, 136.73, 170.89, 193.64, 172.45, 179.2, 187.95, 232.9, 251.88, 200.64, 209.6, 225.43, 163.55, 154.85, 173.62, 181.94, 157.79, 142.01, 154.22, 152.51, 173.7, 145.88, 167.26, 179.56, 162.61, 182, 163.25, 152.44, 187.67, 123.69, 128.4, 109.8, 116.48, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 318.72, 355.76, 341.7, 361.71, 399.92, 430.86] },
      velocityScore: { '1D': 0, '1W': 16.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$74B', pe: 287.2, revenueGrowth: 93, eps: 1.5, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 2.34, ARTY: 1.55, BAI: false, IGPT: false, IVES: false, ALAI: 1.22, CHAT: 3.33, AIFD: false, SPRX: 9.85, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.44, proScore: 1.72, coverage: 0.5,
      price: 384.28, weeklyPrices: [352.83, 372.97, 368.57, 373.02, 384.28], weeklyChange: 8.91, dayChange: 3.02, sortRank: 0, periodReturns: { '1M': -16.6, 'YTD': -20.5, '6M': -20.5, '1Y': -21.7 },
      priceHistory: { '1D': [373.02, 377.14, 378.47, 380.77, 383.74, 384.57, 386.35, 386.72, 384.59, 385.91, 385.59, 385.82, 386.52, 386.77, 387.83, 387.21, 388.19, 387.63, 388.18, 387.12, 387.11, 385.18, 385.49, 384.28], '1W': [352.83, 372.97, 368.57, 373.02, 384.28], '1M': [460.52, 441.31, 427.34, 428.05, 416.67, 411.74, 403.41, 397.36, 390.34, 390.74, 393.83, 378.91, 379.4, 367.34, 373.94, 365.46, 352.83, 372.97, 368.57, 373.02, 384.28], 'YTD': [483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 384.47, 398.55, 409.41, 399.95, 383, 358.96, 372.88, 384.37, 418.07, 424.82, 413.62, 412.66, 423.54, 416.03, 441.31, 403.41, 393.83, 365.46, 384.28], '6M': [472.94, 479.28, 459.86, 470.28, 423.37, 413.6, 396.86, 384.47, 398.55, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 423.54, 416.03, 441.31, 403.41, 393.83, 365.46, 384.28], '1Y': [491.09, 501.48, 511.7, 510.88, 533.5, 520.84, 520.58, 505.72, 506.74, 507.97, 501.01, 508.45, 507.03, 515.74, 522.4, 511.61, 520.54, 541.55, 507.16, 511.14, 487.12, 485.5, 480.84, 483.47, 483.98, 487.71, 472.94, 479.28, 459.86, 470.28, 423.37, 413.6, 396.86, 389, 403.93, 405.76, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 417.42, 416.03, 441.31, 403.41, 393.83, 365.46, 384.28] },
      velocityScore: { '1D': 0.6, '1W': -1.7, '1M': -33.8, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 22.9, revenueGrowth: 18, eps: 16.79, grossMargin: 68, dividendYield: 0.98,
      etfPresence: { AIS: false, ARTY: 2.43, BAI: false, IGPT: false, IVES: 4.51, ALAI: 4.78, CHAT: 2.05, AIFD: false, SPRX: false, AOTG: 3.44 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 5, avgWeight: 2.74, proScore: 1.37, coverage: 0.5,
      price: 801.16, weeklyPrices: [861.97, 816.98, 851.40, 858.06, 801.16], weeklyChange: -7.05, dayChange: -6.63, sortRank: 0, periodReturns: { '1M': -11.5, 'YTD': 117.4, '6M': 117.4, '1Y': 778.1 },
      priceHistory: { '1D': [858.06, 830.7, 820.38, 823.99, 815.56, 794.96, 800.67, 801.84, 804.7, 803.65, 808.03, 804.3, 803.61, 805.82, 806.87, 802.38, 803.09, 801.57, 801.67, 795.47, 802.02, 803.74, 800.66, 801.16], '1W': [861.97, 816.98, 851.4, 858.06, 801.16], '1M': [905, 1029.15, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 875.36, 869.98, 850, 893.93, 827.92, 842.53, 861.97, 816.98, 851.4, 858.06, 801.16], 'YTD': [368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 772.28, 871.18, 895.11, 859.68, 976.18, 1053.09, 884.98, 910.81, 1029.15, 821.76, 875.36, 842.53, 801.16], '6M': [386.11, 351.42, 324.25, 332.45, 423.42, 577.15, 600.42, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 884.98, 910.81, 1029.15, 821.76, 875.36, 842.53, 801.16], '1Y': [91.24, 92.62, 102.64, 102.85, 110.08, 111.13, 120.23, 115.89, 125.84, 141.91, 164.88, 171.5, 159.11, 169.75, 159.76, 163.23, 158.06, 214.28, 232.75, 253.81, 268.92, 308.28, 327.85, 372.09, 337.13, 390.77, 386.11, 351.42, 324.25, 332.45, 423.42, 577.15, 600.42, 688.27, 694.43, 672, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 890.09, 910.81, 1029.15, 821.76, 875.36, 842.53, 801.16] },
      velocityScore: { '1D': -0.7, '1W': 2.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$62B', pe: 141.5, revenueGrowth: 90, eps: 5.66, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.5, IGPT: false, IVES: false, ALAI: 0.78, CHAT: 1.39, AIFD: 5.61, SPRX: 3.4, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 5 of 10 AI & ML ETFs (50% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 5, avgWeight: 2.62, proScore: 1.31, coverage: 0.5,
      price: 2032.22, weeklyPrices: [2335.00, 2090.71, 2050.39, 2273.73, 2032.22], weeklyChange: -12.97, dayChange: -10.62, sortRank: 0, periodReturns: { '1M': 15.4, 'YTD': 756.1, '6M': 756.1, '1Y': 4297.8 },
      priceHistory: { '1D': [2273.73, 2080, 2091.88, 2096.01, 2057.94, 2040.46, 2046.55, 2072.94, 2060, 2061.29, 2066.08, 2054.99, 2054.63, 2037.24, 2052.3, 2028.09, 2035.88, 2027.68, 2018.02, 2009.01, 2032.44, 2055.66, 2046.73, 2032.22], '1W': [2335, 2090.71, 2050.39, 2273.73, 2032.22], '1M': [1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22], 'YTD': [237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1333.01, 1589.55, 1716.36, 1646.54, 1991.55, 1914.46, 2032.22], '6M': [275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1333.01, 1589.55, 1716.36, 1646.54, 1991.55, 1914.46, 2032.22], '1Y': [46.21, 46.95, 41.52, 42.06, 42.92, 40.69, 47.01, 44.4, 48.44, 62.5, 84.3, 98.87, 94.29, 124.14, 129.68, 144.27, 146.95, 204.36, 216.5, 283.1, 245.96, 215.04, 213.31, 241.61, 219.46, 250.05, 275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 565.41, 618.89, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.55, 1716.36, 1646.54, 1991.55, 1914.46, 2032.22] },
      velocityScore: { '1D': 4, '1W': 10.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$301B', pe: 69.3, revenueGrowth: 251, eps: 29.33, grossMargin: 56, dividendYield: null,
      etfPresence: { AIS: 2.41, ARTY: false, BAI: 3.34, IGPT: 4.75, IVES: false, ALAI: 0.64, CHAT: false, AIFD: false, SPRX: false, AOTG: 1.98 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'CRDO', name: 'Credo Technology Group Holding Ltd', easyScore: 5, avgWeight: 1.93, proScore: 0.97, coverage: 0.5,
      price: 259.09, weeklyPrices: [268.03, 238.00, 245.68, 271.95, 259.09], weeklyChange: -3.34, dayChange: -4.73, sortRank: 0, periodReturns: { '1M': 14.6, 'YTD': 80.1, '6M': 80.1, '1Y': 189.9 },
      priceHistory: { '1D': [271.95, 258.55, 266.35, 268.78, 266.76, 264.36, 264.83, 266.12, 264.4, 260.84, 261.17, 261.49, 262.47, 262.45, 263.3, 263.08, 261.91, 262.1, 261.2, 259.12, 263.73, 265.9, 261.86, 259.09], '1W': [268.03, 238, 245.68, 271.95, 259.09], '1M': [226.1, 229, 214.6, 217.5, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81, 239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.09], 'YTD': [143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.05, 114.22, 115.98, 116.88, 105.1, 87.81, 102.46, 134.36, 174.53, 180.5, 180.06, 210.22, 156.27, 221.64, 229, 234.32, 239.18, 268.99, 259.09], '6M': [143.22, 150.42, 150.97, 128.02, 119.96, 123.41, 124.8, 124.05, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 156.27, 221.64, 229, 234.32, 239.18, 268.99, 259.09], '1Y': [89.37, 97.29, 98.45, 101.17, 111.55, 119.78, 121.13, 105.99, 122.73, 134, 159.32, 172.31, 144.94, 149.63, 151.15, 136.53, 137.2, 171.52, 173.16, 160.34, 141.88, 164.01, 180.92, 154.47, 138.57, 144.83, 143.22, 150.42, 150.97, 128.02, 119.96, 123.41, 124.8, 120.83, 97.3, 112.33, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.64, 229, 234.32, 239.18, 268.99, 259.09] },
      velocityScore: { '1D': 4.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$48B', pe: 103.6, revenueGrowth: 157, eps: 2.5, grossMargin: 68, dividendYield: null,
      etfPresence: { AIS: 1.07, ARTY: 1.21, BAI: 2.12, IGPT: false, IVES: false, ALAI: false, CHAT: 2.31, AIFD: false, SPRX: 2.94, AOTG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 4, avgWeight: 3.29, proScore: 1.32, coverage: 0.4,
      price: 127.02, weeklyPrices: [132.87, 128.32, 131.72, 139.63, 127.02], weeklyChange: -4.4, dayChange: -9.03, sortRank: 0, periodReturns: { '1M': 16.2, 'YTD': 244.2, '6M': 244.2, '1Y': 480.5 },
      priceHistory: { '1D': [139.63, 133.97, 133.16, 132.82, 130.62, 129.44, 128.86, 130.13, 129.76, 129.08, 129.27, 129.04, 129.1, 128.67, 128.61, 127.92, 127.95, 128.09, 127.64, 127, 128.13, 128.56, 126.85, 127.02], '1W': [132.87, 128.32, 131.72, 139.63, 127.02], '1M': [109.33, 107.93, 112.71, 111.78, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 127.02], 'YTD': [36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 43.63, 45.5, 45.58, 45.76, 44.01, 41.19, 50.78, 65.18, 65.7, 84.99, 95.78, 129.44, 108.17, 123.52, 107.93, 107.92, 117.05, 131.65, 127.02], '6M': [39.38, 45.55, 46.96, 42.49, 48.81, 50.24, 46.18, 43.63, 45.5, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 108.17, 123.52, 107.93, 107.92, 117.05, 131.65, 127.02], '1Y': [21.88, 23.82, 22.8, 22.63, 19.8, 19.77, 22.22, 23.54, 24.85, 24.61, 24.61, 30.57, 33.99, 37.3, 37.8, 36.84, 36.92, 41.34, 38.38, 37.89, 35.11, 36.81, 40.5, 39.51, 36.28, 36.2, 39.38, 45.55, 46.96, 42.49, 48.81, 50.24, 46.18, 46.12, 43.1, 46.78, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 110.8, 123.52, 107.93, 107.92, 117.05, 131.65, 127.02] },
      velocityScore: { '1D': 3.1, '1W': 3.9, '1M': -49, '6M': null }, isNew: false,
      marketCap: '$638B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.57, ARTY: false, BAI: 3.27, IGPT: 4.95, IVES: false, ALAI: false, CHAT: 1.38, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'NBIS', name: 'NEBIUS GROUP NV', easyScore: 4, avgWeight: 3.09, proScore: 1.24, coverage: 0.4,
      price: 229.18, weeklyPrices: [256.63, 240.30, 261.15, 276.17, 229.18], weeklyChange: -10.7, dayChange: -17.01, sortRank: 0, periodReturns: { '1M': -13.4, 'YTD': 173.8, '6M': 173.8, '1Y': 358.6 },
      priceHistory: { '1D': [276.17, 239.36, 238.54, 242.16, 235.73, 232.66, 237.13, 242.25, 238.8, 237.78, 238.66, 237.86, 235.29, 234.71, 236.84, 237.7, 237.31, 237.75, 235.9, 232.77, 233.82, 233.62, 232.2, 229.18], '1W': [256.63, 240.3, 261.15, 276.17, 229.18], '1M': [264.51, 260.58, 251.68, 259.67, 227.81, 218, 220.12, 211.69, 222.24, 232.36, 265.1, 280.91, 286.69, 283.61, 275.25, 259.66, 256.63, 240.3, 261.15, 276.17, 229.18], 'YTD': [83.71, 97.3, 103.89, 94.5, 85.19, 86.1, 98.01, 100.61, 91.01, 94.94, 129.85, 114.15, 92.26, 112.54, 154.56, 159.16, 144.96, 176.42, 186.1, 199.86, 208.06, 260.58, 220.12, 265.1, 259.66, 229.18], '6M': [89.95, 97.93, 108.73, 91.46, 88.16, 92.88, 97.52, 100.61, 91.01, 94.94, 129.85, 114.15, 92.26, 117.4, 161.94, 156.55, 135.51, 175.92, 179.11, 199.86, 208.06, 260.58, 220.12, 265.1, 259.66, 229.18], '1Y': [49.97, 46.43, 53.69, 52.16, 54.43, 65.31, 70.63, 67.47, 70.1, 64.91, 89.19, 94.12, 107.94, 125.87, 132.64, 123.04, 98.62, 125.1, 117, 94.36, 95.07, 94.69, 102.8, 94.28, 78.09, 87.59, 89.95, 97.93, 108.73, 91.46, 88.16, 92.88, 97.52, 102.58, 86.8, 96.43, 129.85, 114.15, 92.26, 117.4, 161.94, 156.55, 135.51, 175.92, 179.11, 197.73, 208.06, 260.58, 220.12, 265.1, 259.66, 229.18] },
      velocityScore: { '1D': 2.5, '1W': null, '1M': -38.9, '6M': null }, isNew: false,
      marketCap: '$58B', pe: 88.1, revenueGrowth: 684, eps: 2.6, grossMargin: 72, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 2.77, ALAI: 4.02, CHAT: 3.83, AIFD: 1.76, SPRX: false, AOTG: false },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'ARM', name: 'ARM Holdings PLC', easyScore: 4, avgWeight: 3.03, proScore: 1.21, coverage: 0.4,
      price: 337.47, weeklyPrices: [347.71, 334.27, 343.58, 354.57, 337.47], weeklyChange: -2.94, dayChange: -4.82, sortRank: 0, periodReturns: { '1M': -17.5, 'YTD': 208.7, '6M': 208.7, '1Y': 118.2 },
      priceHistory: { '1D': [354.57, 338.64, 336.18, 341.73, 337.37, 335.9, 337.9, 340.16, 342.8, 342.07, 343.5, 342.8, 342.09, 339.44, 340.48, 340.73, 340.61, 340.74, 340.02, 338.46, 341.85, 342.9, 338.7, 337.47], '1W': [347.71, 334.27, 343.58, 354.57, 337.47], '1M': [408.85, 402.71, 411.83, 393.44, 342.93, 346.39, 324.86, 307.43, 342.23, 380.81, 396.34, 418.88, 439.46, 407.72, 366.39, 359.08, 347.71, 334.27, 343.58, 354.57, 337.47], 'YTD': [109.31, 113.08, 105.11, 116.07, 105.36, 123.7, 125.28, 123.78, 124.37, 117.63, 121.7, 136.89, 136.96, 148.77, 157.58, 175.1, 215.88, 203.26, 212.65, 215.12, 321.22, 402.71, 324.86, 396.34, 359.08, 337.47], '6M': [114.73, 111.79, 105.78, 114.73, 106.93, 124.61, 126.89, 123.78, 124.37, 117.63, 121.7, 136.89, 136.96, 143.86, 161.22, 175.49, 198.65, 208.84, 207.92, 215.12, 321.22, 402.71, 324.86, 396.34, 359.08, 337.47], '1Y': [154.63, 148.55, 157.18, 159.99, 141.38, 135.57, 141.6, 131.16, 140.66, 135.48, 154.7, 146.54, 140.65, 152.15, 170.66, 171.19, 165.71, 170.39, 160.19, 148.75, 136.99, 132.61, 140.49, 136.14, 113.51, 110.27, 114.73, 111.79, 105.78, 114.73, 106.93, 124.61, 126.89, 128.14, 121.72, 120.55, 121.7, 136.89, 136.96, 143.86, 161.22, 175.49, 198.65, 208.84, 207.92, 223.15, 321.22, 402.71, 324.86, 396.34, 359.08, 337.47] },
      velocityScore: { '1D': 0, '1W': -16, '1M': null, '6M': null }, isNew: false,
      marketCap: '$360B', pe: 397, revenueGrowth: 20, eps: 0.85, grossMargin: 98, dividendYield: null,
      etfPresence: { AIS: 1.83, ARTY: false, BAI: false, IGPT: false, IVES: false, ALAI: 0.17, CHAT: 2.61, AIFD: false, SPRX: 7.51, AOTG: false },
      tonyNote: 'Arm Holdings is held across Broad Tech and AI ETFs as the CPU architecture licensor embedded in every mobile device and increasingly in AI inference chips and data center CPUs. Revenue grew and the royalty model is high-margin; the weight score reflects consistent institutional positioning as the AI chip design ecosystem expands on Arm cores.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 4, avgWeight: 2.93, proScore: 1.17, coverage: 0.4,
      price: 311.42, weeklyPrices: [325.57, 303.95, 306.97, 334.82, 311.42], weeklyChange: -4.35, dayChange: -6.99, sortRank: 0, periodReturns: { '1M': -3.7, 'YTD': 92.2, '6M': 92.2, '1Y': 150.5 },
      priceHistory: { '1D': [334.82, 316.6, 319.75, 320.03, 315.33, 312.83, 314.44, 317.89, 318.53, 318.84, 319, 318.11, 316.94, 315.05, 314.83, 313.99, 314.02, 313.57, 312.92, 309.78, 312.94, 313.48, 313.49, 311.42], '1W': [325.57, 303.95, 306.97, 334.82, 311.42], '1M': [323.39, 334.49, 331.44, 323.92, 300.51, 300.57, 289.52, 280.98, 297.88, 302.87, 299.6, 317.58, 333.05, 357.96, 318.32, 316.43, 325.57, 303.95, 306.97, 334.82, 311.42], 'YTD': [162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 234.53, 245.42, 257.75, 264.35, 264.74, 256, 234.22, 258.73, 299.96, 314.41, 322.43, 330.97, 367.92, 339.73, 323.91, 334.49, 289.52, 299.6, 316.43, 311.42], '6M': [175.61, 163.58, 176.93, 181.23, 190.01, 202, 243.53, 245.42, 257.75, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.13, 339.73, 323.91, 334.49, 289.52, 299.6, 316.43, 311.42], '1Y': [124.33, 120.72, 131.12, 130.87, 145.6, 139.39, 137.4, 127.54, 129.31, 125.7, 135.71, 141.96, 139.77, 161.64, 168.88, 177.82, 171.59, 199.27, 190.71, 173.37, 170.65, 172.02, 182.54, 178.66, 154.39, 167.58, 175.61, 163.58, 176.93, 181.23, 190.01, 202, 243.53, 253.15, 244.44, 270.06, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.13, 322.63, 323.91, 334.49, 289.52, 299.6, 316.43, 311.42] },
      velocityScore: { '1D': 3.5, '1W': -4.1, '1M': -37.4, '6M': null }, isNew: false,
      marketCap: '$120B', pe: 78.2, revenueGrowth: 30, eps: 3.98, grossMargin: 37, dividendYield: 0.07,
      etfPresence: { AIS: 3.59, ARTY: false, BAI: 1.88, IGPT: false, IVES: false, ALAI: false, CHAT: 2.31, AIFD: 3.96, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 4.71, proScore: 4.71, coverage: 1,
      price: 1032.28, weeklyPrices: [1213.56, 1132.33, 1145.28, 1154.29, 1032.28], weeklyChange: -14.94, dayChange: -10.57, sortRank: 0, periodReturns: { '1M': -0.3, 'YTD': 261.7, '6M': 261.7, '1Y': 747.9 },
      priceHistory: { '1D': [1154.29, 1081.66, 1078.14, 1083.5, 1066.35, 1057.3, 1058.36, 1061.94, 1056.07, 1049.34, 1055.02, 1050.51, 1052.01, 1047.05, 1052.66, 1043.49, 1041.9, 1043.47, 1041.47, 1039.61, 1055.62, 1061.17, 1047.14, 1032.28], '1W': [1213.56, 1132.33, 1145.28, 1154.29, 1032.28], '1M': [1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1032.28], '6M': [315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1032.28], '1Y': [121.74, 123.11, 113.26, 111.73, 109.14, 111.87, 124.27, 117.21, 117.75, 124.21, 150.57, 168.89, 156.83, 183.75, 192.33, 202.53, 198.47, 226.63, 237.5, 244.9, 225.92, 230.26, 226.65, 258.46, 248.55, 284.79, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1032.28] },
      velocityScore: { '1D': -3.7, '1W': -11.6, '1M': -31.1, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 23.3, revenueGrowth: 346, eps: 44.21, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { SOXX: 8.54, PSI: 5.57, XSD: 2.73, DRAM: 2.01 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 5.26, proScore: 3.94, coverage: 0.75,
      price: 540.88, weeklyPrices: [532.57, 521.58, 539.49, 580.91, 540.88], weeklyChange: 1.56, dayChange: -6.89, sortRank: 0, periodReturns: { '1M': 6, 'YTD': 152.6, '6M': 152.6, '1Y': 290.5 },
      priceHistory: { '1D': [580.91, 553.76, 557.29, 556.99, 553.03, 553.36, 553.33, 554.48, 554.52, 550.4, 551.21, 551.03, 550.75, 550.95, 553.71, 550.35, 549.64, 548.67, 547.71, 543.9, 549.81, 550.18, 543.6, 540.88], '1W': [532.57, 521.58, 539.49, 580.91, 540.88], '1M': [510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 420.99, 503.89, 521.54, 475.51, 507.29, 519.74, 540.88], '6M': [223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 420.99, 503.89, 521.54, 475.51, 507.29, 519.74, 540.88], '1Y': [138.52, 144.16, 160.41, 162.12, 176.31, 172.4, 184.42, 165.2, 167.13, 161.79, 155.67, 157.92, 161.27, 169.73, 232.89, 234.56, 230.23, 264.33, 256.33, 258.89, 223.55, 214.24, 215.98, 221.43, 201.06, 214.99, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 503.89, 521.54, 475.51, 507.29, 519.74, 540.88] },
      velocityScore: { '1D': 2.6, '1W': 4.2, '1M': -35.3, '6M': null }, isNew: false,
      marketCap: '$882B', pe: 179.1, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 8.09, PSI: 4.98, XSD: 2.71, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.66, proScore: 3.49, coverage: 0.75,
      price: 127.02, weeklyPrices: [132.87, 128.32, 131.72, 139.63, 127.02], weeklyChange: -4.4, dayChange: -9.03, sortRank: 0, periodReturns: { '1M': 16.2, 'YTD': 244.2, '6M': 244.2, '1Y': 480.5 },
      priceHistory: { '1D': [139.63, 133.97, 133.16, 132.82, 130.62, 129.44, 128.86, 130.13, 129.76, 129.08, 129.27, 129.04, 129.1, 128.67, 128.61, 127.92, 127.95, 128.09, 127.64, 127, 128.13, 128.56, 126.85, 127.02], '1W': [132.87, 128.32, 131.72, 139.63, 127.02], '1M': [109.33, 107.93, 112.71, 111.78, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 127.02], 'YTD': [36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 43.63, 45.5, 45.58, 45.76, 44.01, 41.19, 50.78, 65.18, 65.7, 84.99, 95.78, 129.44, 108.17, 123.52, 107.93, 107.92, 117.05, 131.65, 127.02], '6M': [39.38, 45.55, 46.96, 42.49, 48.81, 50.24, 46.18, 43.63, 45.5, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 108.17, 123.52, 107.93, 107.92, 117.05, 131.65, 127.02], '1Y': [21.88, 23.82, 22.8, 22.63, 19.8, 19.77, 22.22, 23.54, 24.85, 24.61, 24.61, 30.57, 33.99, 37.3, 37.8, 36.84, 36.92, 41.34, 38.38, 37.89, 35.11, 36.81, 40.5, 39.51, 36.28, 36.2, 39.38, 45.55, 46.96, 42.49, 48.81, 50.24, 46.18, 46.12, 43.1, 46.78, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 110.8, 123.52, 107.93, 107.92, 117.05, 131.65, 127.02] },
      velocityScore: { '1D': 0.9, '1W': -1.4, '1M': 1.2, '6M': null }, isNew: false,
      marketCap: '$638B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 6.33, PSI: 4.89, XSD: 2.75, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 4.31, proScore: 3.23, coverage: 0.75,
      price: 197.58, weeklyPrices: [195.74, 192.53, 194.97, 200.09, 197.58], weeklyChange: 0.94, dayChange: -1.25, sortRank: 0, periodReturns: { '1M': -11.9, 'YTD': 5.9, '6M': 5.9, '1Y': 25.6 },
      priceHistory: { '1D': [200.09, 194.45, 195.3, 196.02, 195.7, 195.85, 196.15, 196.93, 197.02, 196.89, 196.89, 197.05, 197.23, 197.71, 198.21, 198.6, 198.79, 198.05, 198.46, 198.06, 199.23, 199.3, 198.43, 197.58], '1W': [195.74, 192.53, 194.97, 200.09, 197.58], '1M': [224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58], 'YTD': [186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 222.32, 214.86, 222.82, 208.19, 207.41, 199, 197.58], '6M': [188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 222.32, 214.86, 222.82, 208.19, 207.41, 199, 197.58], '1Y': [157.25, 164.1, 173, 173.74, 177.87, 180.77, 181.59, 175.4, 181.6, 171.66, 177.17, 176.24, 177.69, 188.89, 192.57, 181.81, 180.28, 207.04, 195.21, 193.8, 186.52, 180.26, 183.38, 180.93, 174.14, 190.53, 188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 184.77, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 214.86, 222.82, 208.19, 207.41, 199, 197.58] },
      velocityScore: { '1D': -2.1, '1W': -6.6, '1M': 0.6, '6M': null }, isNew: false,
      marketCap: '$4.8T', pe: 30.3, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.5,
      etfPresence: { SOXX: 6.81, PSI: 4.02, XSD: 2.1, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.22, proScore: 2.42, coverage: 0.75,
      price: 388.98, weeklyPrices: [417.93, 386.91, 391.78, 397.17, 388.98], weeklyChange: -6.93, dayChange: -2.06, sortRank: 0, periodReturns: { '1M': -3.4, 'YTD': 43.4, '6M': 43.4, '1Y': 58.7 },
      priceHistory: { '1D': [397.17, 396.38, 396.02, 395.52, 393.73, 393.07, 393.33, 394.35, 394.81, 393.69, 395.76, 395, 394.55, 392.53, 392.92, 392.57, 392.15, 392.1, 392.55, 390.72, 392.89, 393.63, 392.95, 388.98], '1W': [417.93, 386.91, 391.78, 397.17, 388.98], '1M': [402.69, 423.2, 437.67, 428.76, 401.39, 403.89, 404.62, 392.67, 412.13, 417.79, 416, 414.45, 434.46, 445.48, 407.26, 413.16, 417.93, 386.91, 391.78, 397.17, 388.98], 'YTD': [271.2, 299.16, 302.1, 305.6, 310.88, 320.45, 337.1, 355.15, 352.41, 319.71, 310.92, 312.19, 303.1, 327.36, 350.01, 381.05, 392.59, 397.02, 422.73, 418.58, 419.94, 423.2, 404.62, 416, 413.16, 388.98], '6M': [273.74, 300.93, 300.25, 304.01, 316.86, 322.97, 337.51, 355.15, 352.41, 319.71, 310.92, 312.19, 303.1, 327.41, 348.6, 375.27, 383.26, 404.77, 419.65, 418.58, 419.94, 423.2, 404.62, 416, 413.16, 388.98], '1Y': [245.15, 245.13, 240.97, 226.37, 224.63, 223.12, 237.63, 244.87, 255.5, 246.11, 248.24, 249.05, 247.53, 241.67, 237.88, 241.61, 240.36, 235.04, 236, 241.44, 232.2, 257.92, 277.26, 283.39, 274.92, 276.84, 273.74, 300.93, 300.25, 304.01, 316.86, 322.97, 337.51, 356.09, 338.99, 318.81, 310.92, 312.19, 303.1, 327.41, 348.6, 375.27, 383.26, 404.77, 419.65, 414.31, 419.94, 423.2, 404.62, 416, 413.16, 388.98] },
      velocityScore: { '1D': -3.2, '1W': -9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$189B', pe: 58, revenueGrowth: 37, eps: 6.71, grossMargin: 64, dividendYield: 1.11,
      etfPresence: { SOXX: 3.45, PSI: 4.09, XSD: 2.12, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.2% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 6.32, proScore: 3.16, coverage: 0.5,
      price: 650.91, weeklyPrices: [668.00, 626.84, 694.64, 723.00, 650.91], weeklyChange: -2.56, dayChange: -9.97, sortRank: 0, periodReturns: { '1M': 42.1, 'YTD': 153.3, '6M': 153.3, '1Y': 242.6 },
      priceHistory: { '1D': [723, 673.26, 679.48, 679.76, 678.17, 667.46, 666.5, 665.56, 666.62, 661.09, 660.88, 655.95, 654.1, 648.44, 646.72, 642.52, 643.02, 642.58, 641.42, 640.73, 648.86, 653.7, 652.03, 650.91], '1W': [668, 626.84, 694.64, 723, 650.91], '1M': [458.17, 490.05, 500.77, 501.7, 453.01, 492.17, 499.21, 497.01, 552.64, 567.25, 568.23, 592.92, 617.11, 640.18, 585.88, 588.97, 668, 626.84, 694.64, 723, 650.91], 'YTD': [256.99, 281.64, 319.08, 322.38, 322.32, 322.51, 354.91, 373.55, 372.18, 338.94, 346.18, 361.79, 323.12, 352.62, 395.73, 391.62, 404.86, 391.38, 443.62, 413.57, 454.89, 490.05, 499.21, 568.23, 588.97, 650.91], '6M': [268.87, 301.18, 327.01, 319.46, 328.4, 330.57, 359.13, 373.55, 372.18, 338.94, 346.18, 361.79, 323.12, 354.31, 395.64, 394.33, 381.11, 410.82, 431.2, 413.57, 454.89, 490.05, 499.21, 568.23, 588.97, 650.91], '1Y': [190.01, 198.03, 192.52, 188.12, 180.06, 183.15, 190.03, 160.96, 164.39, 158.24, 170.15, 189.76, 199.6, 223.59, 220.3, 227.72, 220.56, 235.75, 240.89, 230.73, 235.13, 249.97, 269.44, 270.11, 253.5, 261.9, 268.87, 301.18, 327.01, 319.46, 328.4, 330.57, 359.13, 377.93, 351.32, 345.88, 346.18, 361.79, 323.12, 354.31, 395.64, 394.33, 381.11, 410.82, 431.2, 406.91, 454.89, 490.05, 499.21, 568.23, 588.97, 650.91] },
      velocityScore: { '1D': -0.9, '1W': 14.1, '1M': 7.1, '6M': null }, isNew: false,
      marketCap: '$517B', pe: 61.2, revenueGrowth: 11, eps: 10.63, grossMargin: 49, dividendYield: 0.29,
      etfPresence: { SOXX: 5.77, PSI: 6.87, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 6.06, proScore: 3.03, coverage: 0.5,
      price: 266.19, weeklyPrices: [258.80, 248.64, 278.39, 301.71, 266.19], weeklyChange: 2.86, dayChange: -11.77, sortRank: 0, periodReturns: { '1M': 37.2, 'YTD': 119.1, '6M': 119.1, '1Y': 189 },
      priceHistory: { '1D': [301.71, 278.9, 281.85, 279.2, 276.67, 273.72, 273.76, 273.11, 273.04, 271.48, 271.39, 269.86, 270.11, 269.97, 269.81, 266.4, 264.97, 264.46, 261.58, 260.52, 263.85, 265.62, 263.45, 266.19], '1W': [258.8, 248.64, 278.39, 301.71, 266.19], '1M': [194, 204.52, 212.51, 213.11, 192.92, 210.81, 213.94, 213.56, 241.16, 254.54, 237.33, 238.73, 259.56, 269.16, 244.49, 240.48, 258.8, 248.64, 278.39, 301.71, 266.19], 'YTD': [121.51, 132.46, 154.5, 151.28, 142.79, 144.29, 146.41, 148.77, 153.49, 142.91, 143.82, 151.14, 138.26, 154.01, 176.88, 180.53, 190, 171.33, 184.52, 175.65, 201.14, 204.52, 213.94, 237.33, 240.48, 266.19], '6M': [127.45, 140, 156.78, 154.3, 141.04, 144.02, 147.02, 148.77, 153.49, 142.91, 143.82, 151.14, 138.26, 154.88, 179.59, 178.54, 180.9, 173.29, 181.13, 175.65, 201.14, 204.52, 213.94, 237.33, 240.48, 266.19], '1Y': [92.11, 92.86, 93.71, 90.42, 87.9, 91.21, 94.95, 87.84, 88.89, 87.33, 95.93, 104.67, 105.91, 113.93, 105.35, 109.88, 111.43, 123.53, 122.71, 119.9, 116.75, 115.91, 120.81, 124.62, 122.24, 127.96, 127.45, 140, 156.78, 154.3, 141.04, 144.02, 147.02, 150.66, 144.13, 145.29, 143.82, 151.14, 138.26, 154.88, 179.59, 178.54, 180.9, 173.29, 181.13, 174.06, 201.14, 204.52, 213.94, 237.33, 240.48, 266.19] },
      velocityScore: { '1D': 3.4, '1W': 13.9, '1M': 17.9, '6M': null }, isNew: false,
      marketCap: '$348B', pe: 75.4, revenueGrowth: 12, eps: 3.53, grossMargin: 61, dividendYield: 0.3,
      etfPresence: { SOXX: 5.64, PSI: 6.48, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 5.35, proScore: 2.67, coverage: 0.5,
      price: 391.26, weeklyPrices: [401.82, 379.09, 410.91, 433.33, 391.26], weeklyChange: -2.63, dayChange: -9.71, sortRank: 0, periodReturns: { '1M': 23.4, 'YTD': 128.6, '6M': 128.6, '1Y': 295.9 },
      priceHistory: { '1D': [433.33, 401.62, 404.42, 405.78, 400.68, 396.01, 396.43, 398.42, 398.11, 394.25, 394.57, 392.47, 389.65, 387.66, 385.21, 384.8, 384.32, 383.77, 382.61, 381.98, 385.57, 388.1, 388.8, 391.26], '1W': [401.82, 379.09, 410.91, 433.33, 391.26], '1M': [317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81, 369.34, 374.18, 389.04, 409.54, 371.33, 374.8, 401.82, 379.09, 410.91, 433.33, 391.26], 'YTD': [171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 242.27, 231, 211.15, 219.4, 233.31, 199.93, 220.65, 267.32, 263.16, 259.47, 258.57, 296.05, 277.96, 322.68, 334.41, 327.16, 369.34, 374.8, 391.26], '6M': [185.06, 218.36, 222.96, 222.87, 237.5, 229.28, 235.58, 242.27, 231, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 277.96, 322.68, 334.41, 327.16, 369.34, 374.8, 391.26], '1Y': [98.83, 101.06, 100.79, 97.78, 94.84, 99.15, 106.74, 99.15, 103.67, 100.42, 115.58, 126.32, 128.13, 146.99, 141, 142.37, 141.25, 160.67, 165.05, 161.42, 148.8, 155.14, 157.09, 168.71, 164.7, 178.07, 185.06, 218.36, 222.96, 222.87, 237.5, 229.28, 235.58, 244.25, 217.27, 215.23, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 273.38, 322.68, 334.41, 327.16, 369.34, 374.8, 391.26] },
      velocityScore: { '1D': 0.4, '1W': 7.7, '1M': -0.7, '6M': null }, isNew: false,
      marketCap: '$489B', pe: 74, revenueGrowth: 24, eps: 5.29, grossMargin: 50, dividendYield: 0.24,
      etfPresence: { SOXX: 4.89, PSI: 5.81, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 4.11, proScore: 2.05, coverage: 0.5,
      price: 369.34, weeklyPrices: [378.91, 365.02, 372.45, 377.75, 369.34], weeklyChange: -2.53, dayChange: -2.23, sortRank: 0, periodReturns: { '1M': -19.7, 'YTD': 6.7, '6M': 6.7, '1Y': 36.8 },
      priceHistory: { '1D': [377.75, 369.68, 371.87, 373.25, 371.16, 370.1, 371.28, 372.14, 372.04, 370.15, 369.54, 368.26, 369.27, 369.75, 369.31, 369.81, 370.38, 369.55, 370.86, 369.18, 371.68, 371.47, 371.27, 369.34], '1W': [378.91, 365.02, 372.45, 377.75, 369.34], '1M': [459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34], 'YTD': [346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 420.71, 422.01, 481.57, 392.16, 376.71, 382.07, 369.34], '6M': [347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 420.71, 422.01, 481.57, 392.16, 376.71, 382.07, 369.34], '1Y': [269.9, 275.4, 286.45, 288.71, 293.7, 303.76, 309.09, 291.17, 300.25, 306.1, 359.63, 345.35, 336.1, 338.18, 345.02, 354.15, 340.3, 385.98, 358.98, 355.22, 354.42, 397.57, 381.03, 406.37, 329.88, 352.13, 347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 342.58, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 422.01, 481.57, 392.16, 376.71, 382.07, 369.34] },
      velocityScore: { '1D': -3.3, '1W': -6, '1M': -46.6, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 61.5, revenueGrowth: 48, eps: 6.01, grossMargin: 76, dividendYield: 0.69,
      etfPresence: { SOXX: 6.08, PSI: false, XSD: 2.13, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 3.68, proScore: 1.84, coverage: 0.5,
      price: 272.05, weeklyPrices: [281.26, 266.77, 277.75, 297.89, 272.05], weeklyChange: -3.27, dayChange: -8.67, sortRank: 0, periodReturns: { '1M': 24, 'YTD': 220.1, '6M': 220.1, '1Y': 266.4 },
      priceHistory: { '1D': [297.89, 284.07, 289.17, 287.14, 282.8, 280.77, 279.04, 278.15, 277.29, 276.13, 279.13, 278.91, 277.2, 274.86, 275.3, 275.05, 274.8, 275.45, 274.25, 273.15, 276.98, 277.45, 274.78, 272.05], '1W': [281.26, 266.77, 277.75, 297.89, 272.05], '1M': [219.43, 290.79, 301.65, 316.43, 263.47, 288.85, 266.88, 252.59, 280.71, 279.7, 278.67, 289.54, 310.58, 307.86, 279.04, 276.7, 281.26, 266.77, 277.75, 297.89, 272.05], 'YTD': [84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 109.51, 131.3, 147.84, 158.21, 163.66, 170.84, 168.93, 208.26, 290.79, 266.88, 278.67, 276.7, 272.05], '6M': [89.39, 83.22, 80.46, 81.77, 78.66, 82.35, 79.01, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 168.93, 208.26, 290.79, 266.88, 278.67, 276.7, 272.05], '1Y': [74.25, 73.36, 72.01, 74.04, 80.37, 75.85, 79.32, 71.22, 74.79, 64.1, 66.59, 74.23, 83.81, 86.2, 90.68, 88.23, 81.05, 90.15, 92.9, 89.33, 81.32, 87.72, 98.19, 89.43, 84.47, 86.34, 89.39, 83.22, 80.46, 81.77, 78.66, 82.35, 79.01, 78.39, 77.51, 93.3, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 176.27, 208.26, 290.79, 266.88, 278.67, 276.7, 272.05] },
      velocityScore: { '1D': -2.1, '1W': -3.2, '1M': -45.6, '6M': null }, isNew: false,
      marketCap: '$238B', pe: 93.2, revenueGrowth: 28, eps: 2.92, grossMargin: 52, dividendYield: 0.08,
      etfPresence: { SOXX: 4.88, PSI: false, XSD: 2.49, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 3.05, proScore: 1.52, coverage: 0.5,
      price: 430.86, weeklyPrices: [398.00, 391.74, 455.96, 483.02, 430.86], weeklyChange: 8.26, dayChange: -10.8, sortRank: 0, periodReturns: { '1M': 34.6, 'YTD': 159, '6M': 159, '1Y': 386.5 },
      priceHistory: { '1D': [483.02, 454.62, 464, 463.89, 455.17, 450.01, 452, 458.33, 454.63, 444.76, 449.51, 447.94, 445.05, 444.45, 444.57, 441.83, 440.96, 440.94, 439.08, 436.89, 441.4, 443.24, 433.44, 430.86], '1W': [398, 391.74, 455.96, 483.02, 430.86], '1M': [320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86], 'YTD': [166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 215.58, 318.72, 355.76, 341.7, 361.71, 399.92, 430.86], '6M': [179.56, 162.61, 182, 163.25, 152.44, 187.67, 123.69, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 215.58, 318.72, 355.76, 341.7, 361.71, 399.92, 430.86], '1Y': [88.57, 97.02, 97.95, 121.68, 136.73, 170.89, 193.64, 172.45, 179.2, 187.95, 232.9, 251.88, 200.64, 209.6, 225.43, 163.55, 154.85, 173.62, 181.94, 157.79, 142.01, 154.22, 152.51, 173.7, 145.88, 167.26, 179.56, 162.61, 182, 163.25, 152.44, 187.67, 123.69, 128.4, 109.8, 116.48, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 318.72, 355.76, 341.7, 361.71, 399.92, 430.86] },
      velocityScore: { '1D': 0.7, '1W': 16, '1M': -33.6, '6M': null }, isNew: false,
      marketCap: '$74B', pe: 287.2, revenueGrowth: 93, eps: 1.5, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 3.02, PSI: false, XSD: 3.08, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 2.86, proScore: 1.43, coverage: 0.5,
      price: 298.41, weeklyPrices: [311.81, 285.43, 285.48, 298.07, 298.41], weeklyChange: -4.3, dayChange: 0.11, sortRank: 0, periodReturns: { '1M': 1.8, 'YTD': 72, '6M': 72, '1Y': 38.4 },
      priceHistory: { '1D': [298.07, 296.64, 299.23, 298.87, 298.79, 298.11, 298.39, 298.47, 299.72, 298.83, 299.7, 299.01, 298.73, 298.38, 298.87, 299.48, 299.5, 299.82, 299.36, 298.67, 299.35, 299.65, 299.2, 298.41], '1W': [311.81, 285.43, 285.48, 298.07, 298.41], '1M': [293.2, 308.12, 308.59, 305.37, 285.06, 290.9, 288.63, 282.01, 297.1, 301.12, 305.71, 301.88, 322.86, 332.28, 304.36, 303.11, 311.81, 285.43, 285.48, 298.07, 298.41], 'YTD': [173.49, 188.45, 189.12, 193.31, 215.55, 221.44, 226.16, 219.86, 209.82, 196.2, 194.13, 188.63, 186.42, 199.42, 216.71, 233.7, 269.5, 280.89, 297.76, 300.6, 324.89, 308.12, 288.63, 305.71, 303.11, 298.41], '6M': [177.52, 190.31, 191.58, 196.59, 225.01, 218.77, 225.69, 219.86, 209.82, 196.2, 194.13, 188.63, 186.42, 199.74, 218.87, 233.15, 265, 281, 295.17, 300.6, 324.89, 308.12, 288.63, 305.71, 303.11, 298.41], '1Y': [215.59, 219.66, 216.59, 185.69, 181.06, 185.91, 193.29, 200.77, 205.47, 187.29, 184.35, 181.62, 182.04, 182.32, 178.96, 175.48, 170.71, 160.26, 163.57, 163.09, 157.09, 165.35, 180.12, 181.67, 176.19, 176.88, 177.52, 190.31, 191.58, 196.59, 225.01, 218.77, 225.69, 213.35, 202.67, 197.46, 194.13, 188.63, 186.42, 199.74, 218.87, 233.15, 265, 281, 295.17, 302.31, 324.89, 308.12, 288.63, 305.71, 303.11, 298.41] },
      velocityScore: { '1D': 0, '1W': -7.1, '1M': -52.8, '6M': null }, isNew: false,
      marketCap: '$272B', pe: 51.1, revenueGrowth: 19, eps: 5.84, grossMargin: 57, dividendYield: 1.91,
      etfPresence: { SOXX: 3.5, PSI: false, XSD: 2.22, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.6, proScore: 1.3, coverage: 0.5,
      price: 279.18, weeklyPrices: [298.64, 277.02, 278.37, 281.03, 279.18], weeklyChange: -6.52, dayChange: -0.66, sortRank: 0, periodReturns: { '1M': -10.3, 'YTD': 28.6, '6M': 28.6, '1Y': 20.8 },
      priceHistory: { '1D': [281.03, 281.26, 280.94, 281.67, 280.23, 280.53, 281.32, 281.87, 282.07, 282.05, 282.93, 281.33, 281.23, 280.27, 280.73, 280.26, 279.89, 280.2, 280.42, 279.33, 281.36, 281.86, 281.86, 279.18], '1W': [298.64, 277.02, 278.37, 281.03, 279.18], '1M': [311.38, 323.62, 321.88, 322.22, 295.96, 301.14, 297.41, 285.56, 302.55, 304.86, 302.89, 298.2, 313.27, 323.24, 299.94, 294.06, 298.64, 277.02, 278.37, 281.03, 279.18], 'YTD': [217.06, 237.89, 238.6, 232.48, 226.14, 224.32, 244.43, 231.16, 224.76, 205.25, 191.89, 193.39, 187.39, 197.08, 208, 221.34, 236.87, 290.76, 305.99, 291.68, 332.67, 323.62, 297.41, 302.89, 294.06, 279.18], '6M': [221.28, 241.15, 237.11, 231.05, 231.08, 228.91, 245.09, 231.16, 224.76, 205.25, 191.89, 193.39, 187.39, 195.12, 209.89, 224.5, 230.39, 292.35, 294.23, 291.68, 332.67, 323.62, 297.41, 302.89, 294.06, 279.18], '1Y': [231.15, 233.19, 224.5, 224.43, 213.77, 205.91, 230.52, 228.77, 237.67, 225.39, 223.21, 226.51, 226.81, 227.71, 221.42, 217.41, 217.16, 204.71, 210.44, 204.08, 190.06, 193.76, 226.16, 231.83, 222.08, 222.87, 221.28, 241.15, 237.11, 231.05, 231.08, 228.91, 245.09, 234.63, 215.25, 203.03, 191.89, 193.39, 187.39, 195.12, 209.89, 224.5, 230.39, 292.35, 294.23, 294.28, 332.67, 323.62, 297.41, 302.89, 294.06, 279.18] },
      velocityScore: { '1D': -3.7, '1W': -11, '1M': -37.5, '6M': null }, isNew: false,
      marketCap: '$70B', pe: 26.7, revenueGrowth: 12, eps: 10.47, grossMargin: 56, dividendYield: 1.45,
      etfPresence: { SOXX: 3.14, PSI: false, XSD: 2.07, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.45, proScore: 1.23, coverage: 0.5,
      price: 1331.73, weeklyPrices: [1438.30, 1313.32, 1312.77, 1382.36, 1331.73], weeklyChange: -7.41, dayChange: -3.66, sortRank: 0, periodReturns: { '1M': -13.7, 'YTD': 46.9, '6M': 46.9, '1Y': 74.2 },
      priceHistory: { '1D': [1382.36, 1369.56, 1375.94, 1377.22, 1355.97, 1353.54, 1348.52, 1348.65, 1350.39, 1344.16, 1356.2, 1352.94, 1352.78, 1349.79, 1345.98, 1345.26, 1340.77, 1344.13, 1339.98, 1337.65, 1348.63, 1354.02, 1344.95, 1331.73], '1W': [1438.3, 1313.32, 1312.77, 1382.36, 1331.73], '1M': [1542.39, 1624.99, 1689.89, 1652.6, 1481.05, 1559.18, 1531.98, 1473.04, 1589.55, 1577.32, 1498.77, 1448.21, 1563.7, 1537.88, 1423.76, 1434.95, 1438.3, 1313.32, 1312.77, 1382.36, 1331.73], 'YTD': [906.36, 959.09, 1009.54, 1063.74, 1124.15, 1229.82, 1171.47, 1190.06, 1142.58, 1062, 1077.4, 1076.35, 1002.34, 1180.03, 1372.23, 1490.86, 1587.57, 1573.3, 1661.1, 1486.33, 1662.98, 1624.99, 1531.98, 1498.77, 1434.95, 1331.73], '6M': [936.31, 958.97, 1033.17, 1068.14, 1173.22, 1206.18, 1173.18, 1190.06, 1142.58, 1062, 1077.4, 1076.35, 1002.34, 1191.22, 1363.42, 1527.95, 1504.08, 1588.12, 1599.52, 1486.33, 1662.98, 1624.99, 1531.98, 1498.77, 1434.95, 1331.73], '1Y': [764.4, 740.45, 713.57, 713, 711.24, 797.94, 861.8, 826.27, 866.32, 848.11, 840.38, 917.78, 891.39, 930.51, 979.25, 1026.83, 1001.4, 1094.08, 1000.15, 958.35, 884.65, 924.95, 952.74, 981.48, 929.48, 946.32, 936.31, 958.97, 1033.17, 1068.14, 1173.22, 1206.18, 1173.18, 1213.67, 1074.37, 1055.82, 1077.4, 1076.35, 1002.34, 1191.22, 1363.42, 1527.95, 1504.08, 1588.12, 1599.52, 1468.11, 1662.98, 1624.99, 1531.98, 1498.77, 1434.95, 1331.73] },
      velocityScore: { '1D': 0.8, '1W': -6.8, '1M': -37.2, '6M': null }, isNew: false,
      marketCap: '$65B', pe: 95.4, revenueGrowth: 26, eps: 13.96, grossMargin: 55, dividendYield: 0.58,
      etfPresence: { SOXX: 2.93, PSI: false, XSD: 1.97, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 2.34, proScore: 1.17, coverage: 0.5,
      price: 181.92, weeklyPrices: [204.90, 189.39, 188.72, 184.79, 181.92], weeklyChange: -11.22, dayChange: -1.55, sortRank: 0, periodReturns: { '1M': -20.6, 'YTD': 6.4, '6M': 6.4, '1Y': 12.1 },
      priceHistory: { '1D': [184.79, 185.23, 186.85, 186.53, 184.85, 184.93, 187.58, 185.53, 185.35, 185.04, 186.01, 185.51, 185.21, 183.1, 183.89, 183.82, 186.23, 186.01, 183.52, 182.12, 183.62, 183.87, 183.37, 181.92], '1W': [204.9, 189.39, 188.72, 184.79, 181.92], '1M': [228.99, 240.84, 250.01, 242.57, 215.94, 217.77, 205.42, 191.2, 202.96, 211.72, 214.07, 212.97, 226.11, 221.9, 204.13, 197.41, 204.9, 189.39, 188.72, 184.79, 181.92], 'YTD': [171.05, 181.87, 161.39, 155.82, 151.59, 137.34, 140.7, 140.41, 141.03, 138.11, 129.39, 128.35, 127.07, 125.73, 131.24, 137.52, 150.26, 168.38, 237.53, 203.64, 248.82, 240.84, 205.42, 214.07, 197.41, 181.92], '6M': [172.98, 177.78, 159.42, 154.52, 152.62, 138.93, 142.63, 140.41, 141.03, 138.11, 129.39, 128.35, 127.07, 124.07, 132.84, 135.56, 150, 186.55, 210.31, 203.64, 248.82, 240.84, 205.42, 214.07, 197.41, 181.92], '1Y': [162.32, 159.09, 152.61, 158.84, 146.76, 145.9, 156.59, 155.44, 159.77, 159.71, 161.51, 168.13, 169.68, 168.85, 165.66, 164.08, 169.27, 178.67, 179.72, 176.67, 166.11, 165.14, 174.35, 181.27, 174.19, 174.81, 172.98, 177.78, 159.42, 154.52, 152.62, 138.93, 142.63, 144.78, 138.13, 135.2, 129.39, 128.35, 127.07, 124.07, 132.84, 135.56, 150, 186.55, 210.31, 195.61, 248.82, 240.84, 205.42, 214.07, 197.41, 181.92] },
      velocityScore: { '1D': -6.4, '1W': -14, '1M': -53.6, '6M': null }, isNew: false,
      marketCap: '$192B', pe: 19.6, revenueGrowth: -4, eps: 9.29, grossMargin: 55, dividendYield: 1.99,
      etfPresence: { SOXX: 2.65, PSI: false, XSD: 2.04, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.21, proScore: 1.11, coverage: 0.5,
      price: 259.09, weeklyPrices: [268.03, 238.00, 245.68, 271.95, 259.09], weeklyChange: -3.34, dayChange: -4.73, sortRank: 0, periodReturns: { '1M': 14.6, 'YTD': 80.1, '6M': 80.1, '1Y': 189.9 },
      priceHistory: { '1D': [271.95, 258.55, 266.35, 268.78, 266.76, 264.36, 264.83, 266.12, 264.4, 260.84, 261.17, 261.49, 262.47, 262.45, 263.3, 263.08, 261.91, 262.1, 261.2, 259.12, 263.73, 265.9, 261.86, 259.09], '1W': [268.03, 238, 245.68, 271.95, 259.09], '1M': [226.1, 229, 214.6, 217.5, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81, 239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.09], 'YTD': [143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.05, 114.22, 115.98, 116.88, 105.1, 87.81, 102.46, 134.36, 174.53, 180.5, 180.06, 210.22, 156.27, 221.64, 229, 234.32, 239.18, 268.99, 259.09], '6M': [143.22, 150.42, 150.97, 128.02, 119.96, 123.41, 124.8, 124.05, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 156.27, 221.64, 229, 234.32, 239.18, 268.99, 259.09], '1Y': [89.37, 97.29, 98.45, 101.17, 111.55, 119.78, 121.13, 105.99, 122.73, 134, 159.32, 172.31, 144.94, 149.63, 151.15, 136.53, 137.2, 171.52, 173.16, 160.34, 141.88, 164.01, 180.92, 154.47, 138.57, 144.83, 143.22, 150.42, 150.97, 128.02, 119.96, 123.41, 124.8, 120.83, 97.3, 112.33, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.64, 229, 234.32, 239.18, 268.99, 259.09] },
      velocityScore: { '1D': 5.7, '1W': -4.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$48B', pe: 103.6, revenueGrowth: 157, eps: 2.5, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 2.01, PSI: false, XSD: 2.41, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.18, proScore: 1.09, coverage: 0.5,
      price: 88.69, weeklyPrices: [94.12, 87.93, 89.06, 91.20, 88.69], weeklyChange: -5.77, dayChange: -2.75, sortRank: 0, periodReturns: { '1M': -3.1, 'YTD': 39.2, '6M': 39.2, '1Y': 21.2 },
      priceHistory: { '1D': [91.2, 90.27, 90.69, 90.72, 90.17, 89.96, 90.33, 90.62, 90.72, 90.59, 91.07, 90.32, 90.32, 89.99, 89.77, 89.62, 89.4, 89.65, 89.51, 89.04, 89.86, 89.93, 89.82, 88.69], '1W': [94.12, 87.93, 89.06, 91.2, 88.69], '1M': [91.52, 96.96, 96.55, 96.3, 88.34, 91.37, 91.47, 87.91, 92.94, 95.24, 95.63, 94.11, 99.77, 102.71, 93.26, 92.48, 94.12, 87.93, 89.06, 91.2, 88.69], 'YTD': [63.72, 73.53, 74.45, 74.71, 75.92, 76.01, 78.56, 76.6, 74.31, 65, 63.83, 64.34, 60.06, 67.22, 73.55, 80.39, 86.84, 95.3, 99.03, 92.76, 98.05, 96.96, 91.47, 95.63, 92.48, 88.69], '6M': [65.03, 75.22, 74.7, 74.79, 78.08, 74.41, 78.94, 76.6, 74.31, 65, 63.83, 64.34, 60.06, 67.51, 74.5, 80.93, 84.26, 98.48, 97.7, 92.76, 98.05, 96.96, 91.47, 95.63, 92.48, 88.69], '1Y': [73.16, 75.08, 74.3, 67.81, 67.59, 66.22, 65.75, 66.76, 66.65, 64.43, 65.02, 66.26, 64.84, 66.13, 65.86, 65.35, 64.5, 62.54, 60.8, 55.63, 50.8, 52.57, 64.72, 69.09, 64.06, 64.94, 65.03, 75.22, 74.7, 74.79, 78.08, 74.41, 78.94, 75.93, 71.39, 65.33, 63.83, 64.34, 60.06, 67.51, 74.5, 80.93, 84.26, 98.48, 97.7, 91.81, 98.05, 96.96, 91.47, 95.63, 92.48, 88.69] },
      velocityScore: { '1D': -1.8, '1W': -6.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$48B', pe: 403.1, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 2,
      etfPresence: { SOXX: 2.17, PSI: false, XSD: 2.19, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 1.73, proScore: 0.86, coverage: 0.5,
      price: 94.63, weeklyPrices: [118.74, 90.65, 88.57, 94.54, 94.63], weeklyChange: -20.3, dayChange: 0.1, sortRank: 0, periodReturns: { '1M': -21.7, 'YTD': 74.8, '6M': 74.8, '1Y': 69.1 },
      priceHistory: { '1D': [94.54, 94.5, 94.65, 95.56, 95.5, 94.94, 95.48, 95.85, 96.14, 95.61, 96.14, 95.82, 95.76, 95.26, 95.4, 95.67, 95.66, 96.28, 95.93, 95.12, 95.83, 96.19, 96.19, 94.63], '1W': [118.74, 90.65, 88.57, 94.54, 94.63], '1M': [120.92, 128.64, 133.93, 131.82, 117.26, 120.9, 117, 110.17, 115.96, 116.79, 118.25, 112.92, 121.62, 131.55, 117.06, 115.74, 118.74, 90.65, 88.57, 94.54, 94.63], 'YTD': [54.15, 60.89, 60.28, 61.98, 59.89, 65.2, 72.21, 69.47, 66.48, 59.23, 59.88, 59.89, 55.66, 63.49, 71.02, 85.56, 98.04, 102.04, 107.24, 109.43, 127, 128.64, 117, 118.25, 115.74, 94.63], '6M': [56.7, 62.16, 60.33, 61.13, 61.53, 65.1, 71.96, 69.47, 66.48, 59.23, 59.88, 59.89, 55.66, 63.79, 72.05, 86.91, 93.3, 102.67, 104.11, 109.43, 127, 128.64, 117, 118.25, 115.74, 94.63], '1Y': [55.95, 59.52, 59.41, 55.44, 56.36, 47.59, 51.89, 49.47, 51.25, 48.06, 49.02, 51.83, 49.77, 48.74, 49.97, 52.97, 51.93, 51.4, 50.08, 49.27, 46.12, 49.64, 54.79, 55.97, 54.34, 54.93, 56.7, 62.16, 60.33, 61.13, 61.53, 65.1, 71.96, 70.03, 63.42, 59.59, 59.88, 59.89, 55.66, 63.79, 72.05, 86.91, 93.3, 102.67, 104.11, 106.02, 127, 128.64, 117, 118.25, 115.74, 94.63] },
      velocityScore: { '1D': 1.2, '1W': -23.2, '1M': -55.2, '6M': null }, isNew: false,
      marketCap: '$37B', pe: 69.6, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 1.65, PSI: false, XSD: 1.8, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 2, avgWeight: 1.71, proScore: 0.86, coverage: 0.5,
      price: 350.63, weeklyPrices: [390.19, 369.18, 372.59, 380.37, 350.63], weeklyChange: -10.14, dayChange: -7.82, sortRank: 0, periodReturns: { '1M': -0.9, 'YTD': 104.7, '6M': 104.7, '1Y': 150.8 },
      priceHistory: { '1D': [380.37, 362.83, 362.54, 358.92, 355.32, 353.03, 354.01, 353.86, 353.24, 352.28, 353.18, 350.32, 350.74, 351.22, 352.17, 350.95, 348.81, 349.34, 349.4, 349.15, 352.53, 353.92, 351.67, 350.63], '1W': [390.19, 369.18, 372.59, 380.37, 350.63], '1M': [353.79, 382.35, 390.34, 382.74, 345.4, 361.86, 358.72, 354.4, 374.76, 379.87, 368.32, 367.11, 391.41, 396.26, 372.15, 373.08, 390.19, 369.18, 372.59, 380.37, 350.63], 'YTD': [171.28, 167.66, 218.93, 219.26, 219.06, 235.87, 244.16, 245.53, 258.54, 218.73, 224.92, 229.26, 209.49, 233.04, 263.63, 281.08, 279.44, 291.72, 365.88, 356.25, 409.68, 382.35, 358.72, 368.32, 373.08, 350.63], '6M': [174.96, 174.87, 220.68, 218.89, 228.56, 235.7, 245.59, 245.53, 258.54, 218.73, 224.92, 229.26, 209.49, 236.99, 263.92, 285.71, 265.61, 303.57, 362.76, 356.25, 409.68, 382.35, 358.72, 368.32, 373.08, 350.63], '1Y': [139.81, 137.19, 141.76, 137.29, 137.14, 127.75, 125.99, 121.15, 129.63, 131.89, 131.07, 129.73, 123.88, 128.09, 132.98, 137.94, 135.91, 152.66, 149.68, 170.89, 161.57, 168.06, 187.06, 189.86, 171.47, 175.01, 174.96, 174.87, 220.68, 218.89, 228.56, 235.7, 245.59, 248.29, 241.01, 220.59, 224.92, 229.26, 209.49, 236.99, 263.92, 285.71, 265.61, 303.57, 362.76, 358.98, 409.68, 382.35, 358.72, 368.32, 373.08, 350.63] },
      velocityScore: { '1D': -2.3, '1W': -1.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 148.6, revenueGrowth: 23, eps: 2.36, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: 1.17, PSI: false, XSD: 2.25, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RMBS', name: 'RAMBUS INC', easyScore: 2, avgWeight: 1.33, proScore: 0.66, coverage: 0.5,
      price: 123.83, weeklyPrices: [123.69, 114.73, 123.90, 132.74, 123.83], weeklyChange: 0.11, dayChange: -6.71, sortRank: 0, periodReturns: { '1M': -16, 'YTD': 34.8, '6M': 34.8, '1Y': 90.5 },
      priceHistory: { '1D': [132.74, 126.16, 129.64, 131.29, 129.89, 129.39, 128.96, 129.63, 128.77, 128.18, 128.88, 128.3, 128.62, 128.04, 126.82, 125.51, 125.23, 125.75, 125.31, 124.68, 126.68, 126.65, 125.14, 123.83], '1W': [123.69, 114.73, 123.9, 132.74, 123.83], '1M': [147.48, 166.78, 170.66, 169.35, 145.31, 152.03, 146.84, 138.12, 144.47, 146.56, 132.48, 130.1, 141.17, 140.35, 128.21, 124.52, 123.69, 114.73, 123.9, 132.74, 123.83], 'YTD': [91.89, 91.34, 103.07, 115.31, 113.83, 107.1, 101.95, 95.27, 98.88, 88.52, 92.78, 93.35, 79.73, 92.22, 113.16, 126.87, 141.31, 111.5, 134.51, 123.76, 157.23, 166.78, 146.84, 132.48, 124.52, 123.83], '6M': [99.28, 93.38, 107.99, 114.19, 113.71, 110.92, 101.95, 95.27, 98.88, 88.52, 92.78, 93.35, 79.73, 91.87, 121.73, 130.45, 111.27, 118, 130.28, 123.76, 157.23, 166.78, 146.84, 132.48, 124.52, 123.83], '1Y': [65, 64.6, 68.17, 64.21, 73.93, 71.95, 76.79, 69.68, 75.05, 75.4, 88.58, 107.38, 100.76, 103.71, 98.72, 98.15, 94.45, 111.36, 108.61, 102.21, 90.22, 94.87, 98.81, 106.01, 91.49, 94.11, 99.28, 93.38, 107.99, 114.19, 113.71, 110.92, 101.95, 98.57, 87.59, 89.61, 92.78, 93.35, 79.73, 91.87, 121.73, 130.45, 111.27, 118, 130.28, 122.03, 157.23, 166.78, 146.84, 132.48, 124.52, 123.83] },
      velocityScore: { '1D': 1.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 59, revenueGrowth: 8, eps: 2.1, grossMargin: 80, dividendYield: null,
      etfPresence: { SOXX: 0.64, PSI: false, XSD: 2.02, DRAM: false },
      tonyNote: 'RAMBUS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 5.99, proScore: 3.17, coverage: 0.529,
      price: 1032.28, weeklyPrices: [1213.56, 1132.33, 1145.28, 1154.29, 1032.28], weeklyChange: -14.94, dayChange: -10.57, sortRank: 0, periodReturns: { '1M': -0.3, 'YTD': 261.7, '6M': 261.7, '1Y': 747.9 },
      priceHistory: { '1D': [1154.29, 1081.66, 1078.14, 1083.5, 1066.35, 1057.3, 1058.36, 1061.94, 1056.07, 1049.34, 1055.02, 1050.51, 1052.01, 1047.05, 1052.66, 1043.49, 1041.9, 1043.47, 1041.47, 1039.61, 1055.62, 1061.17, 1047.14, 1032.28], '1W': [1213.56, 1132.33, 1145.28, 1154.29, 1032.28], '1M': [1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1032.28], '6M': [315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1032.28], '1Y': [121.74, 123.11, 113.26, 111.73, 109.14, 111.87, 124.27, 117.21, 117.75, 124.21, 150.57, 168.89, 156.83, 183.75, 192.33, 202.53, 198.47, 226.63, 237.5, 244.9, 225.92, 230.26, 226.65, 258.46, 248.55, 284.79, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1032.28] },
      velocityScore: { '1D': 1.9, '1W': 0, '1M': 18.7, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 23.3, revenueGrowth: 346, eps: 44.21, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { PTF: 5.37, WCLD: false, IGV: false, FDTX: 9.36, GTEK: false, ARKK: false, MARS: false, FRWD: 5.36, BCTK: 5.01, FWD: 1.35, CBSE: false, FCUS: 4.93, WGMI: false, CNEQ: 1.69, SGRT: 8.65, SPMO: 12.19, XMMO: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 9, avgWeight: 5.84, proScore: 3.09, coverage: 0.529,
      price: 197.58, weeklyPrices: [195.74, 192.53, 194.97, 200.09, 197.58], weeklyChange: 0.94, dayChange: -1.25, sortRank: 0, periodReturns: { '1M': -11.9, 'YTD': 5.9, '6M': 5.9, '1Y': 25.6 },
      priceHistory: { '1D': [200.09, 194.45, 195.3, 196.02, 195.7, 195.85, 196.15, 196.93, 197.02, 196.89, 196.89, 197.05, 197.23, 197.71, 198.21, 198.6, 198.79, 198.05, 198.46, 198.06, 199.23, 199.3, 198.43, 197.58], '1W': [195.74, 192.53, 194.97, 200.09, 197.58], '1M': [224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58], 'YTD': [186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 222.32, 214.86, 222.82, 208.19, 207.41, 199, 197.58], '6M': [188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 222.32, 214.86, 222.82, 208.19, 207.41, 199, 197.58], '1Y': [157.25, 164.1, 173, 173.74, 177.87, 180.77, 181.59, 175.4, 181.6, 171.66, 177.17, 176.24, 177.69, 188.89, 192.57, 181.81, 180.28, 207.04, 195.21, 193.8, 186.52, 180.26, 183.38, 180.93, 174.14, 190.53, 188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 184.77, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 214.86, 222.82, 208.19, 207.41, 199, 197.58] },
      velocityScore: { '1D': -0.3, '1W': -6.6, '1M': -30.4, '6M': null }, isNew: false,
      marketCap: '$4.8T', pe: 30.3, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.5,
      etfPresence: { PTF: 4.07, WCLD: false, IGV: false, FDTX: 4.62, GTEK: false, ARKK: 1.57, MARS: false, FRWD: 8.17, BCTK: 5.79, FWD: false, CBSE: false, FCUS: false, WGMI: 1.84, CNEQ: 13.05, SGRT: 5.98, SPMO: 7.51, XMMO: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 8, avgWeight: 3.76, proScore: 1.77, coverage: 0.471,
      price: 540.88, weeklyPrices: [532.57, 521.58, 539.49, 580.91, 540.88], weeklyChange: 1.56, dayChange: -6.89, sortRank: 0, periodReturns: { '1M': 6, 'YTD': 152.6, '6M': 152.6, '1Y': 290.5 },
      priceHistory: { '1D': [580.91, 553.76, 557.29, 556.99, 553.03, 553.36, 553.33, 554.48, 554.52, 550.4, 551.21, 551.03, 550.75, 550.95, 553.71, 550.35, 549.64, 548.67, 547.71, 543.9, 549.81, 550.18, 543.6, 540.88], '1W': [532.57, 521.58, 539.49, 580.91, 540.88], '1M': [510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 420.99, 503.89, 521.54, 475.51, 507.29, 519.74, 540.88], '6M': [223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 420.99, 503.89, 521.54, 475.51, 507.29, 519.74, 540.88], '1Y': [138.52, 144.16, 160.41, 162.12, 176.31, 172.4, 184.42, 165.2, 167.13, 161.79, 155.67, 157.92, 161.27, 169.73, 232.89, 234.56, 230.23, 264.33, 256.33, 258.89, 223.55, 214.24, 215.98, 221.43, 201.06, 214.99, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 503.89, 521.54, 475.51, 507.29, 519.74, 540.88] },
      velocityScore: { '1D': 2.3, '1W': 6, '1M': -9.2, '6M': null }, isNew: false,
      marketCap: '$882B', pe: 179.1, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.99, MARS: false, FRWD: 7.37, BCTK: 3.35, FWD: 2.17, CBSE: false, FCUS: 3.47, WGMI: false, CNEQ: 1.07, SGRT: 3.6, SPMO: 4.08, XMMO: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 7, avgWeight: 5.01, proScore: 2.06, coverage: 0.412,
      price: 598.37, weeklyPrices: [675.39, 586.45, 651.88, 638.72, 598.37], weeklyChange: -11.4, dayChange: -6.32, sortRank: 0, periodReturns: { '1M': 9.6, 'YTD': 247.3, '6M': 247.3, '1Y': 809.7 },
      priceHistory: { '1D': [638.72, 607, 608.65, 603.46, 594.07, 592.44, 592.94, 600.88, 601.61, 603.73, 602.5, 599, 597.91, 597.88, 597.28, 595.39, 596.21, 595.4, 593.72, 592.82, 597.68, 601.96, 600.44, 598.37], '1W': [675.39, 586.45, 651.88, 638.72, 598.37], '1M': [546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37], 'YTD': [172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 458.68, 524.65, 563.1, 517.72, 681.08, 643.83, 598.37], '6M': [187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 458.68, 524.65, 563.1, 517.72, 681.08, 643.83, 598.37], '1Y': [65.78, 65.06, 67.02, 69.02, 78.69, 74.44, 76.07, 75.64, 80.67, 90.49, 96.15, 105.15, 107.21, 131.26, 119.7, 125.92, 120.47, 141.38, 160.1, 166.11, 153.97, 157.74, 161, 187.2, 175.01, 181.54, 187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 266.22, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 524.65, 563.1, 517.72, 681.08, 643.83, 598.37] },
      velocityScore: { '1D': 0.5, '1W': -11.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$206B', pe: 35.8, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.09,
      etfPresence: { PTF: 5.25, WCLD: false, IGV: false, FDTX: 4, GTEK: false, ARKK: false, MARS: false, FRWD: 4.88, BCTK: false, FWD: false, CBSE: false, FCUS: 4.61, WGMI: false, CNEQ: 5.2, SGRT: 9.25, SPMO: 1.9, XMMO: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 7, avgWeight: 3.61, proScore: 1.49, coverage: 0.412,
      price: 369.34, weeklyPrices: [378.91, 365.02, 372.45, 377.75, 369.34], weeklyChange: -2.53, dayChange: -2.23, sortRank: 0, periodReturns: { '1M': -19.7, 'YTD': 6.7, '6M': 6.7, '1Y': 36.8 },
      priceHistory: { '1D': [377.75, 369.68, 371.87, 373.25, 371.16, 370.1, 371.28, 372.14, 372.04, 370.15, 369.54, 368.26, 369.27, 369.75, 369.31, 369.81, 370.38, 369.55, 370.86, 369.18, 371.68, 371.47, 371.27, 369.34], '1W': [378.91, 365.02, 372.45, 377.75, 369.34], '1M': [459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34], 'YTD': [346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 420.71, 422.01, 481.57, 392.16, 376.71, 382.07, 369.34], '6M': [347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 420.71, 422.01, 481.57, 392.16, 376.71, 382.07, 369.34], '1Y': [269.9, 275.4, 286.45, 288.71, 293.7, 303.76, 309.09, 291.17, 300.25, 306.1, 359.63, 345.35, 336.1, 338.18, 345.02, 354.15, 340.3, 385.98, 358.98, 355.22, 354.42, 397.57, 381.03, 406.37, 329.88, 352.13, 347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 342.58, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 422.01, 481.57, 392.16, 376.71, 382.07, 369.34] },
      velocityScore: { '1D': 0, '1W': 2.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 61.5, revenueGrowth: 48, eps: 6.01, grossMargin: 76, dividendYield: 0.69,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.79, GTEK: false, ARKK: 1.07, MARS: false, FRWD: 4.75, BCTK: 6.67, FWD: 1.83, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.16, SGRT: false, SPMO: 6.03, XMMO: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'SPCX', name: 'SPACE EXPLORATION TECHN-CL A', easyScore: 6, avgWeight: 7.19, proScore: 2.54, coverage: 0.353,
      price: 157.54, weeklyPrices: [153.00, 153.23, 164.19, 170.86, 157.54], weeklyChange: 2.97, dayChange: -7.8, sortRank: 0, periodReturns: { '1M': -2.1, 'YTD': -2.1, '6M': -2.1, '1Y': -2.1 },
      priceHistory: { '1D': [170.86, 163.9, 162.29, 162.35, 160.58, 160.52, 160.96, 161, 160.04, 158.24, 159.24, 159.92, 160.7, 160.49, 162.19, 161.26, 162.8, 159.59, 158.54, 156.91, 158.35, 158.24, 156.8, 157.54], '1W': [153, 153.23, 164.19, 170.86, 157.54], '1M': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54], 'YTD': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54], '6M': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54], '1Y': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54] },
      velocityScore: { '1D': 0.8, '1W': 1.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.1T', pe: null, revenueGrowth: 15, eps: -0.67, grossMargin: 49, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.49, MARS: 22.74, FRWD: 2.34, BCTK: 8.29, FWD: 1.71, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.56, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'SPACE EXPLORATION TECHN-CL A appears in 6 of 17 Broad Tech ETFs (35% coverage) with average weight 7.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 6, avgWeight: 4.73, proScore: 1.67, coverage: 0.353,
      price: 444.23, weeklyPrices: [434.99, 432.35, 455.10, 477.57, 444.23], weeklyChange: 2.12, dayChange: -6.98, sortRank: 0, periodReturns: { '1M': 2, 'YTD': 46.2, '6M': 46.2, '1Y': 90.2 },
      priceHistory: { '1D': [477.57, 458.65, 460.23, 458.42, 455.01, 450.88, 449.54, 451.22, 449.39, 446.7, 447.95, 447.81, 446.02, 445.13, 444.72, 445.29, 445.81, 445.92, 445.41, 443.77, 448.17, 448.33, 447.76, 444.23], '1W': [434.99, 432.35, 455.1, 477.57, 444.23], '1M': [435.63, 446.69, 436.69, 444.92, 415.17, 426.8, 427.92, 408.75, 421.07, 423.93, 425.83, 432.15, 462.12, 467.67, 436.39, 440.83, 434.99, 432.35, 455.1, 477.57, 444.23], 'YTD': [303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 370.04, 369.11, 348.7, 340.23, 338.45, 316.5, 341.76, 369.57, 366.24, 404.98, 401.61, 404.54, 395.95, 412.32, 446.69, 427.92, 425.83, 440.83, 444.23], '6M': [319.61, 323.63, 342.4, 332.71, 341.36, 355.41, 364.2, 370.04, 369.11, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 395.95, 412.32, 446.69, 427.92, 425.83, 440.83, 444.23], '1Y': [233.6, 229.76, 245.6, 241.6, 241.62, 242.62, 241.44, 228.6, 239.29, 235.21, 258.91, 268.64, 276.66, 288.11, 299.88, 299.84, 288.88, 305.09, 293.64, 290.62, 282.37, 289.96, 292.93, 304.85, 284.68, 302.84, 319.61, 323.63, 342.4, 332.71, 341.36, 355.41, 364.2, 385.75, 353.13, 347.09, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 392.61, 412.32, 446.69, 427.92, 425.83, 440.83, 444.23] },
      velocityScore: { '1D': 1.2, '1W': -7.7, '1M': -12.6, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 38.6, revenueGrowth: 35, eps: 11.51, grossMargin: 62, dividendYield: 0.8,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6, GTEK: false, ARKK: 1.01, MARS: false, FRWD: 6, BCTK: 8.68, FWD: false, CBSE: false, FCUS: false, WGMI: 0.56, CNEQ: 6.11, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 6, avgWeight: 3.19, proScore: 1.13, coverage: 0.353,
      price: 241.7, weeklyPrices: [227.01, 232.69, 240.14, 238.34, 241.70], weeklyChange: 6.47, dayChange: 1.41, sortRank: 0, periodReturns: { '1M': -7.5, 'YTD': 4.7, '6M': 4.7, '1Y': 9.9 },
      priceHistory: { '1D': [238.34, 236.25, 238.23, 239.13, 241.48, 241.89, 242.05, 243.29, 241.9, 242.12, 242.19, 242.46, 243.01, 243.87, 244.32, 244.01, 244.37, 243.97, 244.08, 243.68, 243.02, 242.04, 242.24, 241.7], '1W': [227.01, 232.69, 240.14, 238.34, 241.7], '1M': [261.26, 256.52, 250.02, 253.79, 246.03, 245.22, 244.19, 238, 241.51, 238.55, 246, 237.5, 244.39, 232.79, 234.11, 234.27, 227.01, 232.69, 240.14, 238.34, 241.7], 'YTD': [230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 198.79, 205.27, 208.39, 213.49, 211.74, 210.14, 200.95, 212.79, 239.89, 248.28, 261.12, 272.05, 268.99, 264.86, 265.29, 256.52, 244.19, 246, 234.27, 241.7], '6M': [226.5, 247.38, 239.12, 238.42, 242.96, 208.72, 201.15, 205.27, 208.39, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 264.86, 265.29, 256.52, 244.19, 246, 234.27, 241.7], '1Y': [219.92, 222.26, 223.88, 232.23, 234.11, 223.13, 224.56, 223.81, 229.12, 235.68, 229.95, 231.23, 218.15, 222.41, 227.74, 214.47, 217.95, 230.3, 250.2, 244.2, 222.69, 229.16, 229.11, 230.28, 226.76, 232.52, 226.5, 247.38, 239.12, 238.42, 242.96, 208.72, 201.15, 208.56, 208.73, 214.33, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 259.34, 265.29, 256.52, 244.19, 246, 234.27, 241.7] },
      velocityScore: { '1D': -1.7, '1W': 16.5, '1M': -74.3, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 32.1, revenueGrowth: 17, eps: 7.53, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.01, GTEK: false, ARKK: 2.34, MARS: false, FRWD: 2.88, BCTK: 4.2, FWD: 1.46, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.24, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'LRCX', name: 'Lam Research Corp', easyScore: 5, avgWeight: 4.79, proScore: 1.41, coverage: 0.294,
      price: 391.26, weeklyPrices: [401.82, 379.09, 410.91, 433.33, 391.26], weeklyChange: -2.63, dayChange: -9.71, sortRank: 0, periodReturns: { '1M': 23.4, 'YTD': 128.6, '6M': 128.6, '1Y': 295.9 },
      priceHistory: { '1D': [433.33, 401.62, 404.42, 405.78, 400.68, 396.01, 396.43, 398.42, 398.11, 394.25, 394.57, 392.47, 389.65, 387.66, 385.21, 384.8, 384.32, 383.77, 382.61, 381.98, 385.57, 388.1, 388.8, 391.26], '1W': [401.82, 379.09, 410.91, 433.33, 391.26], '1M': [317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81, 369.34, 374.18, 389.04, 409.54, 371.33, 374.8, 401.82, 379.09, 410.91, 433.33, 391.26], 'YTD': [171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 242.27, 231, 211.15, 219.4, 233.31, 199.93, 220.65, 267.32, 263.16, 259.47, 258.57, 296.05, 277.96, 322.68, 334.41, 327.16, 369.34, 374.8, 391.26], '6M': [185.06, 218.36, 222.96, 222.87, 237.5, 229.28, 235.58, 242.27, 231, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 277.96, 322.68, 334.41, 327.16, 369.34, 374.8, 391.26], '1Y': [98.83, 101.06, 100.79, 97.78, 94.84, 99.15, 106.74, 99.15, 103.67, 100.42, 115.58, 126.32, 128.13, 146.99, 141, 142.37, 141.25, 160.67, 165.05, 161.42, 148.8, 155.14, 157.09, 168.71, 164.7, 178.07, 185.06, 218.36, 222.96, 222.87, 237.5, 229.28, 235.58, 244.25, 217.27, 215.23, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 273.38, 322.68, 334.41, 327.16, 369.34, 374.8, 391.26] },
      velocityScore: { '1D': 0, '1W': 2.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$489B', pe: 74, revenueGrowth: 24, eps: 5.29, grossMargin: 50, dividendYield: 0.24,
      etfPresence: { PTF: 3.39, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 6.13, BCTK: 8.28, FWD: 2.02, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 4.11, XMMO: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 5, avgWeight: 4, proScore: 1.18, coverage: 0.294,
      price: 357.89, weeklyPrices: [342.19, 334.69, 351.28, 353.33, 357.89], weeklyChange: 4.59, dayChange: 1.29, sortRank: 0, periodReturns: { '1M': -3.9, 'YTD': 14.1, '6M': 14.1, '1Y': 99.1 },
      priceHistory: { '1D': [353.33, 355.71, 355.1, 355.38, 357.95, 358.36, 358.13, 358.62, 356.5, 355.91, 355.67, 354.79, 355.53, 356.02, 355.57, 356.38, 357.39, 356.93, 356.83, 356.89, 356.51, 356.91, 357.61, 357.89], '1W': [342.19, 334.69, 351.28, 353.33, 357.89], '1M': [372.58, 358.39, 355.68, 369.27, 365.76, 361.17, 362.29, 353.32, 356.56, 358.16, 371.1, 362.1, 367.46, 348.78, 346.08, 345.04, 342.19, 334.69, 351.28, 353.33, 357.89], 'YTD': [313.8, 326.01, 333.16, 328.43, 338.53, 323.1, 306.02, 311.69, 306.36, 306.01, 304.42, 299.02, 273.14, 297.66, 319.21, 335.4, 348.52, 379.64, 386.77, 393.11, 384.84, 358.39, 362.29, 371.1, 345.04, 357.89], '6M': [315.32, 329.14, 330.34, 333.59, 344.9, 324.4, 302.82, 311.69, 306.36, 306.01, 304.42, 299.02, 273.14, 303.93, 330.58, 330.47, 347.5, 384.27, 383.82, 393.11, 384.84, 358.39, 362.29, 371.1, 345.04, 357.89], '1Y': [179.76, 178.7, 184.7, 193.2, 192.86, 197.28, 203.03, 200.19, 208.21, 232.66, 240.78, 252.33, 246.57, 246.43, 242.21, 251.88, 252.53, 275.17, 284.75, 287.43, 292.99, 320.28, 318.39, 313.7, 303.75, 314.96, 315.32, 329.14, 330.34, 333.59, 344.9, 324.4, 302.82, 310.92, 303.56, 306.93, 304.42, 299.02, 273.14, 303.93, 330.58, 330.47, 347.5, 384.27, 383.82, 384.9, 384.84, 358.39, 362.29, 371.1, 345.04, 357.89] },
      velocityScore: { '1D': 0, '1W': -0.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.4T', pe: 27.3, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.66, GTEK: false, ARKK: 1.86, MARS: false, FRWD: false, BCTK: 5.54, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 5.65, SGRT: false, SPMO: 3.3, XMMO: false },
      tonyNote: 'Alphabet Inc Class C appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 4.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRWD', name: 'CrowdStrike', easyScore: 5, avgWeight: 2.63, proScore: 0.77, coverage: 0.294,
      price: 772.74, weeklyPrices: [680.92, 673.02, 678.65, 701.09, 772.74], weeklyChange: 13.48, dayChange: 1.26, sortRank: 0, periodReturns: { '1M': -1.2, 'YTD': 64.8, '6M': 64.8, '1Y': 55.8 },
      priceHistory: { '1D': [763.14, 775.1, 784.69, 780.52, 775.9, 773.2, 771.09, 780.28, 781.33, 779.95, 772.81, 776.52, 776.77, 777.01, 776.3, 775.98, 773.4, 771.24, 770.1, 767.85, 769.82, 769.07, 771.61, 772.74], '1W': [680.92, 673.02, 678.65, 701.09, 772.74], '1M': [782.17, 768.95, 747.61, 719.09, 671.02, 658.79, 644.93, 647.74, 691.53, 682.8, 692.91, 679.49, 682.96, 684.86, 675.44, 680.92, 673.02, 678.65, 701.09, 772.74], 'YTD': [468.76, 463.87, 455, 452.49, 441.4, 377.16, 411.54, 388.6, 371.98, 428.99, 441.78, 409, 369.58, 399.12, 379.02, 423.95, 448.13, 455.64, 527.77, 594.08, 663.46, 731, 671.02, 682.8, 675.44, 772.74], '6M': [453.58, 470.61, 453.88, 468.33, 441.4, 395.5, 429.64, 350.33, 384.86, 434.13, 441.78, 409, 369.58, 398.61, 402.24, 433.15, 448.13, 455.64, 527.77, 594.08, 663.46, 782.17, 671.02, 682.8, 675.44, 772.74], '1Y': [496.1, 487.11, 469.83, 462.03, 463.15, 451.69, 432.12, 419.17, 422.61, 412.46, 433.38, 445.5, 476.33, 499.96, 509.95, 489.02, 500.11, 545.5, 534.14, 556.73, 513.67, 512.34, 524.17, 519.54, 470.02, 477.11, 468.76, 463.87, 455, 452.49, 441.4, 395.5, 429.64, 388.6, 371.98, 428.99, 441.78, 409, 369.58, 398.61, 402.24, 423.95, 448.13, 455.64, 527.77, 594.08, 663.46, 782.17, 671.02, 682.8, 675.44, 772.74] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$197B', pe: null, revenueGrowth: 26, eps: -0.15, grossMargin: 75, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.5, IGV: 7.14, FDTX: 1.24, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 1.2, FWD: 1.09, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'CrowdStrike appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 2.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, avgWeight: 5.14, proScore: 1.21, coverage: 0.235,
      price: 384.28, weeklyPrices: [352.83, 372.97, 368.57, 373.02, 384.28], weeklyChange: 8.91, dayChange: 3.02, sortRank: 0, periodReturns: { '1M': -16.6, 'YTD': -20.5, '6M': -20.5, '1Y': -21.7 },
      priceHistory: { '1D': [373.02, 377.14, 378.47, 380.77, 383.74, 384.57, 386.35, 386.72, 384.59, 385.91, 385.59, 385.82, 386.52, 386.77, 387.83, 387.21, 388.19, 387.63, 388.18, 387.12, 387.11, 385.18, 385.49, 384.28], '1W': [352.83, 372.97, 368.57, 373.02, 384.28], '1M': [460.52, 441.31, 427.34, 428.05, 416.67, 411.74, 403.41, 397.36, 390.34, 390.74, 393.83, 378.91, 379.4, 367.34, 373.94, 365.46, 352.83, 372.97, 368.57, 373.02, 384.28], 'YTD': [483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 384.47, 398.55, 409.41, 399.95, 383, 358.96, 372.88, 384.37, 418.07, 424.82, 413.62, 412.66, 423.54, 416.03, 441.31, 403.41, 393.83, 365.46, 384.28], '6M': [472.94, 479.28, 459.86, 470.28, 423.37, 413.6, 396.86, 384.47, 398.55, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 423.54, 416.03, 441.31, 403.41, 393.83, 365.46, 384.28], '1Y': [491.09, 501.48, 511.7, 510.88, 533.5, 520.84, 520.58, 505.72, 506.74, 507.97, 501.01, 508.45, 507.03, 515.74, 522.4, 511.61, 520.54, 541.55, 507.16, 511.14, 487.12, 485.5, 480.84, 483.47, 483.98, 487.71, 472.94, 479.28, 459.86, 470.28, 423.37, 413.6, 396.86, 389, 403.93, 405.76, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 417.42, 416.03, 441.31, 403.41, 393.83, 365.46, 384.28] },
      velocityScore: { '1D': 0, '1W': -3.2, '1M': -77.5, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 22.9, revenueGrowth: 18, eps: 16.79, grossMargin: 68, dividendYield: 0.98,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.03, FDTX: 3.79, GTEK: false, ARKK: false, MARS: false, FRWD: 2.95, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 5.8, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 4, avgWeight: 4.9, proScore: 1.15, coverage: 0.235,
      price: 2032.22, weeklyPrices: [2335.00, 2090.71, 2050.39, 2273.73, 2032.22], weeklyChange: -12.97, dayChange: -10.62, sortRank: 0, periodReturns: { '1M': 15.4, 'YTD': 756.1, '6M': 756.1, '1Y': 4297.8 },
      priceHistory: { '1D': [2273.73, 2080, 2091.88, 2096.01, 2057.94, 2040.46, 2046.55, 2072.94, 2060, 2061.29, 2066.08, 2054.99, 2054.63, 2037.24, 2052.3, 2028.09, 2035.88, 2027.68, 2018.02, 2009.01, 2032.44, 2055.66, 2046.73, 2032.22], '1W': [2335, 2090.71, 2050.39, 2273.73, 2032.22], '1M': [1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22], 'YTD': [237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1333.01, 1589.55, 1716.36, 1646.54, 1991.55, 1914.46, 2032.22], '6M': [275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1333.01, 1589.55, 1716.36, 1646.54, 1991.55, 1914.46, 2032.22], '1Y': [46.21, 46.95, 41.52, 42.06, 42.92, 40.69, 47.01, 44.4, 48.44, 62.5, 84.3, 98.87, 94.29, 124.14, 129.68, 144.27, 146.95, 204.36, 216.5, 283.1, 245.96, 215.04, 213.31, 241.61, 219.46, 250.05, 275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 565.41, 618.89, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.55, 1716.36, 1646.54, 1991.55, 1914.46, 2032.22] },
      velocityScore: { '1D': 12.7, '1W': 5.5, '1M': -57.2, '6M': null }, isNew: false,
      marketCap: '$301B', pe: 69.3, revenueGrowth: 251, eps: 29.33, grossMargin: 56, dividendYield: null,
      etfPresence: { PTF: 9.65, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.58, CBSE: false, FCUS: 5.39, WGMI: false, CNEQ: false, SGRT: false, SPMO: 2.96, XMMO: false },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 4, avgWeight: 4.6, proScore: 1.08, coverage: 0.235,
      price: 915.19, weeklyPrices: [1025.36, 899.90, 968.53, 965.00, 915.19], weeklyChange: -10.74, dayChange: -5.16, sortRank: 0, periodReturns: { '1M': -0.7, 'YTD': 232.3, '6M': 232.3, '1Y': 502.3 },
      priceHistory: { '1D': [965, 906.66, 927.48, 911.09, 907.92, 903.39, 904.21, 913.01, 917.21, 922.04, 921.99, 916.27, 913.95, 913.42, 915.27, 915.84, 913.61, 919.53, 916.54, 916.45, 923.23, 925.92, 919.48, 915.19], '1W': [1025.36, 899.9, 968.53, 965, 915.19], '1M': [921.26, 926.61, 940.69, 925.99, 847.47, 876.77, 846.01, 815.99, 868.09, 931.04, 1031.34, 1066.07, 1070.23, 1094.04, 1038.59, 993.25, 1025.36, 899.9, 968.53, 965, 915.19], 'YTD': [275.39, 284.47, 320.32, 346.1, 407.69, 429.32, 425.99, 407.4, 379.52, 374.33, 398.78, 404.02, 362.43, 453.3, 513.28, 539.75, 595.86, 738.54, 834.01, 740.84, 845.76, 926.61, 846.01, 1031.34, 993.25, 915.19], '6M': [287.54, 304.01, 326.23, 358.29, 432.95, 425, 415.94, 407.4, 379.52, 374.33, 398.78, 404.02, 362.43, 468.72, 533.44, 559.9, 579.03, 771.01, 808.8, 740.84, 845.76, 926.61, 846.01, 1031.34, 993.25, 915.19], '1Y': [151.94, 144.5, 146.72, 152.73, 157.01, 148.1, 156.92, 158.4, 167.24, 183.98, 196.81, 216.64, 219.85, 254.74, 221.7, 226.03, 215.05, 265.62, 275.77, 283.26, 259.14, 272.28, 265.63, 307.85, 292, 286.22, 287.54, 304.01, 326.23, 358.29, 432.95, 425, 415.94, 396.02, 357.62, 384.29, 398.78, 404.02, 362.43, 468.72, 533.44, 559.9, 579.03, 771.01, 808.8, 733.35, 845.76, 926.61, 846.01, 1031.34, 993.25, 915.19] },
      velocityScore: { '1D': -17.6, '1W': -27, '1M': null, '6M': null }, isNew: false,
      marketCap: '$205B', pe: 87, revenueGrowth: 44, eps: 10.52, grossMargin: 42, dividendYield: 0.31,
      etfPresence: { PTF: 4.85, WCLD: false, IGV: false, FDTX: 4.04, GTEK: false, ARKK: false, MARS: false, FRWD: 7.63, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.87, XMMO: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks', easyScore: 4, avgWeight: 4.45, proScore: 1.05, coverage: 0.235,
      price: 352.04, weeklyPrices: [293.09, 304.20, 332.00, 341.02, 352.04], weeklyChange: 20.11, dayChange: 3.23, sortRank: 0, periodReturns: { '1M': 17.2, 'YTD': 91.1, '6M': 91.1, '1Y': 78.7 },
      priceHistory: { '1D': [341.02, 345.55, 352.76, 353.14, 353.77, 355.28, 354.57, 356.3, 356.77, 355.06, 353.93, 356.12, 356.45, 356.48, 355.3, 355.27, 354.6, 353.02, 351.66, 352.05, 352.26, 352.12, 351.92, 352.04], '1W': [293.09, 304.2, 332, 341.02, 352.04], '1M': [300.48, 297.18, 280.43, 279.25, 272.05, 266.33, 260.52, 263.22, 279.53, 279.62, 279.9, 282.13, 287.78, 286.4, 290.92, 285.26, 293.09, 304.2, 332, 341.02, 352.04], 'YTD': [184.2, 190.8, 187.73, 180.18, 176.97, 159.32, 166.95, 144.14, 150.15, 165.1, 167.45, 164.05, 154.35, 161.95, 162.51, 169.56, 182.9, 184.56, 213.66, 247.55, 256.75, 297.18, 260.52, 279.9, 285.26, 352.04], '6M': [179.37, 189.02, 187.66, 184.22, 175.42, 166, 163.5, 144.14, 150.15, 165.1, 167.45, 164.05, 154.35, 169.87, 161.59, 174.96, 180.99, 183.98, 215.6, 247.55, 256.75, 297.18, 260.52, 279.9, 285.26, 352.04], '1Y': [196.97, 192.07, 196.28, 201.16, 173.6, 168.1, 176.86, 184.43, 187.61, 192.35, 198.33, 205.68, 202.21, 209.3, 215.17, 205.51, 212.42, 217.16, 213.18, 210.04, 199.9, 185.35, 195.68, 190.36, 185.88, 188.45, 179.37, 189.02, 187.66, 184.22, 175.42, 166, 163.5, 141.67, 156.09, 165.58, 167.45, 164.05, 154.35, 169.87, 161.59, 174.96, 180.99, 183.98, 215.6, 240.13, 256.75, 297.18, 260.52, 279.9, 285.26, 352.04] },
      velocityScore: { '1D': 0, '1W': 7.1, '1M': -59.6, '6M': null }, isNew: false,
      marketCap: '$287B', pe: 303.5, revenueGrowth: 31, eps: 1.16, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.83, IGV: 10.17, FDTX: 3.67, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.14, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'LITE', name: 'Lumentum Holdings Inc', easyScore: 4, avgWeight: 3.81, proScore: 0.9, coverage: 0.235,
      price: 801.16, weeklyPrices: [861.97, 816.98, 851.40, 858.06, 801.16], weeklyChange: -7.05, dayChange: -6.63, sortRank: 0, periodReturns: { '1M': -11.5, 'YTD': 117.4, '6M': 117.4, '1Y': 778.1 },
      priceHistory: { '1D': [858.06, 830.7, 820.38, 823.99, 815.56, 794.96, 800.67, 801.84, 804.7, 803.65, 808.03, 804.3, 803.61, 805.82, 806.87, 802.38, 803.09, 801.57, 801.67, 795.47, 802.02, 803.74, 800.66, 801.16], '1W': [861.97, 816.98, 851.4, 858.06, 801.16], '1M': [905, 1029.15, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 875.36, 869.98, 850, 893.93, 827.92, 842.53, 861.97, 816.98, 851.4, 858.06, 801.16], 'YTD': [368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 772.28, 871.18, 895.11, 859.68, 976.18, 1053.09, 884.98, 910.81, 1029.15, 821.76, 875.36, 842.53, 801.16], '6M': [386.11, 351.42, 324.25, 332.45, 423.42, 577.15, 600.42, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 884.98, 910.81, 1029.15, 821.76, 875.36, 842.53, 801.16], '1Y': [91.24, 92.62, 102.64, 102.85, 110.08, 111.13, 120.23, 115.89, 125.84, 141.91, 164.88, 171.5, 159.11, 169.75, 159.76, 163.23, 158.06, 214.28, 232.75, 253.81, 268.92, 308.28, 327.85, 372.09, 337.13, 390.77, 386.11, 351.42, 324.25, 332.45, 423.42, 577.15, 600.42, 688.27, 694.43, 672, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 890.09, 910.81, 1029.15, 821.76, 875.36, 842.53, 801.16] },
      velocityScore: { '1D': 16.9, '1W': 1.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$62B', pe: 141.5, revenueGrowth: 90, eps: 5.66, grossMargin: 41, dividendYield: null,
      etfPresence: { PTF: 3.62, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 1.4, FWD: false, CBSE: false, FCUS: 2.36, WGMI: false, CNEQ: false, SGRT: 7.88, SPMO: false, XMMO: false },
      tonyNote: 'Lumentum Holdings Inc appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC-CL A', easyScore: 4, avgWeight: 2.34, proScore: 0.55, coverage: 0.235,
      price: 361.21, weeklyPrices: [343.71, 337.39, 353.65, 357.37, 361.21], weeklyChange: 5.09, dayChange: 1.07, sortRank: 0, periodReturns: { '1M': -4, 'YTD': 15.4, '6M': 15.4, '1Y': 102.2 },
      priceHistory: { '1D': [357.37, 359.08, 358.26, 358.6, 361.26, 361.7, 361.38, 361.94, 359.6, 359.17, 359.23, 358.31, 358.96, 359.22, 358.68, 359.39, 360.39, 360, 359.86, 360.05, 359.59, 360.12, 360.89, 361.21], '1W': [343.71, 337.39, 353.65, 357.37, 361.21], '1M': [376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68, 373.25, 363.79, 368.03, 349.68, 346.13, 345.29, 343.71, 337.39, 353.65, 357.37, 361.21], 'YTD': [313, 325.44, 332.78, 327.93, 338, 322.86, 305.72, 311.49, 306.52, 306.36, 305.56, 302.06, 273.5, 299.99, 321.31, 337.42, 350.34, 383.25, 388.64, 396.94, 388.88, 361.85, 364.26, 373.25, 345.29, 361.21], '6M': [315.15, 328.57, 330, 333.26, 343.69, 324.32, 302.02, 311.49, 306.52, 306.36, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 388.43, 387.35, 396.94, 388.88, 361.85, 364.26, 373.25, 345.29, 361.21], '1Y': [178.64, 177.62, 183.58, 192.17, 191.9, 196.52, 201.96, 199.32, 207.48, 232.3, 240.37, 252.03, 245.79, 245.69, 241.53, 251.46, 251.69, 274.57, 284.31, 286.71, 292.81, 319.95, 317.62, 312.43, 302.46, 313.51, 315.15, 328.57, 330, 333.26, 343.69, 324.32, 302.02, 310.9, 303.58, 307.04, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 388.43, 387.35, 387.66, 388.88, 361.85, 364.26, 373.25, 345.29, 361.21] },
      velocityScore: { '1D': 0, '1W': -6.8, '1M': -89.1, '6M': null }, isNew: false,
      marketCap: '$4.4T', pe: 27.5, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 0.49, MARS: false, FRWD: 3.17, BCTK: false, FWD: 1.53, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 4.16, XMMO: false },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 3, avgWeight: 5.5, proScore: 0.97, coverage: 0.176,
      price: 425.3, weeklyPrices: [375.12, 379.71, 411.84, 420.60, 425.30], weeklyChange: 13.38, dayChange: 1.12, sortRank: 0, periodReturns: { '1M': 2.3, 'YTD': -5.4, '6M': -5.4, '1Y': 34.7 },
      priceHistory: { '1D': [420.6, 420.38, 423.76, 426.83, 427.48, 427.34, 430.29, 431.82, 430.53, 427.36, 427.93, 427.61, 426.16, 427.43, 426.48, 425.35, 425.14, 424.82, 423.97, 424.72, 426.39, 425.99, 426.69, 425.3], '1W': [375.12, 379.71, 411.84, 420.6, 425.3], '1M': [415.88, 423.74, 423.7, 418.45, 391, 408.95, 396.68, 381.59, 399.15, 406.43, 404.66, 396.38, 400.49, 405.05, 381.61, 375.53, 375.12, 379.71, 411.84, 420.6, 425.3], 'YTD': [449.72, 435.8, 438.57, 449.06, 430.41, 411.11, 417.44, 399.83, 403.32, 398.68, 395.56, 380.85, 355.28, 352.82, 352.42, 392.5, 378.67, 392.51, 445, 409.99, 433.59, 423.74, 396.68, 404.66, 375.53, 425.3], '6M': [438.07, 445.01, 437.5, 435.2, 421.81, 417.32, 410.63, 399.83, 403.32, 398.68, 395.56, 380.85, 355.28, 346.65, 364.2, 386.42, 376.02, 389.37, 433.45, 409.99, 433.59, 423.74, 396.68, 404.66, 375.53, 425.3], '1Y': [315.65, 309.87, 319.41, 305.3, 308.27, 322.27, 339.38, 323.9, 349.6, 338.53, 368.81, 416.85, 423.39, 436, 435.54, 428.75, 438.97, 461.51, 462.07, 430.6, 403.99, 426.58, 454.53, 446.89, 483.37, 475.19, 438.07, 445.01, 437.5, 435.2, 421.81, 417.32, 410.63, 409.38, 392.43, 399.24, 395.56, 380.85, 355.28, 346.65, 364.2, 386.42, 376.02, 389.37, 433.45, 404.11, 433.59, 423.74, 396.68, 404.66, 375.53, 425.3] },
      velocityScore: { '1D': 4.3, '1W': 4.3, '1M': -84.2, '6M': null }, isNew: false,
      marketCap: '$1.6T', pe: 390.2, revenueGrowth: 16, eps: 1.09, grossMargin: 19, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 10.21, MARS: false, FRWD: false, BCTK: 3.14, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.16, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
    {
      ticker: 'DELL', name: 'DELL', easyScore: 3, avgWeight: 4.61, proScore: 0.81, coverage: 0.176,
      price: 425.25, weeklyPrices: [409.45, 399.49, 414.61, 431.46, 425.25], weeklyChange: 3.86, dayChange: -1.44, sortRank: 0, periodReturns: { '1M': -8.7, 'YTD': 237.8, '6M': 237.8, '1Y': 244.4 },
      priceHistory: { '1D': [431.46, 418.39, 428.64, 427.18, 424.68, 422.3, 428.82, 432.68, 432.15, 434.68, 434.55, 434.92, 435.7, 435.98, 435.77, 430.2, 432.08, 431.27, 429.88, 421.4, 425.87, 427.08, 426.77, 425.25], '1W': [409.45, 399.49, 414.61, 431.46, 425.25], '1M': [465.96, 435.31, 421.08, 422.05, 394.39, 400.77, 381.78, 369.83, 391.45, 395.57, 404.08, 419.32, 409.5, 418.71, 427.78, 434.06, 409.45, 399.49, 414.61, 431.46, 425.25], 'YTD': [125.88, 118.5, 119.66, 115.43, 114.44, 121.05, 117.49, 119.14, 153.55, 146.51, 156.54, 164.59, 164.66, 173.18, 189.79, 204.24, 215.97, 211.64, 247.04, 238.03, 305.08, 435.31, 381.78, 404.08, 434.06, 425.25], '6M': [127.8, 120.62, 120.53, 115.93, 119.16, 120.91, 116.09, 119.14, 153.55, 146.51, 156.54, 164.59, 164.66, 177.69, 184.51, 212.36, 205.93, 216.32, 238.94, 238.03, 305.08, 435.31, 381.78, 404.08, 434.06, 425.25], '1Y': [123.48, 127.91, 123.88, 128.35, 132.69, 133.93, 139.14, 128.48, 132.5, 126.67, 125.37, 132.11, 130.96, 147.37, 155.95, 151.31, 150.13, 163.6, 152.41, 140.71, 119.38, 133.26, 138.99, 138.6, 122.94, 129.24, 127.8, 120.62, 120.53, 115.93, 119.16, 120.91, 116.09, 119.78, 145.18, 143.8, 156.54, 164.59, 164.66, 177.69, 184.51, 212.36, 205.93, 216.32, 238.94, 235.26, 305.08, 435.31, 381.78, 404.08, 434.06, 425.25] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$275B', pe: 33.9, revenueGrowth: 88, eps: 12.56, grossMargin: 19, dividendYield: 0.58,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: 2.91, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: 4.48, WGMI: false, CNEQ: false, SGRT: 6.44, SPMO: false, XMMO: false },
      tonyNote: 'DELL appears in 3 of 17 Broad Tech ETFs (18% coverage) with average weight 4.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 3, avgWeight: 4.39, proScore: 0.77, coverage: 0.176,
      price: 125.73, weeklyPrices: [107.27, 112.93, 115.70, 116.67, 125.73], weeklyChange: 17.21, dayChange: 7.77, sortRank: 0, periodReturns: { '1M': -21.7, 'YTD': -29.3, '6M': -29.3, '1Y': -4.8 },
      priceHistory: { '1D': [116.67, 123.34, 125, 125.61, 125.61, 127.23, 127.43, 127.51, 127.57, 127.46, 126.57, 126.9, 127.06, 126.89, 126.82, 127.28, 127.81, 127.73, 128.19, 127.34, 127.49, 126.74, 126.65, 125.73], '1W': [107.27, 112.93, 115.7, 116.67, 125.73], '1M': [160.65, 152.17, 142.2, 141.7, 135.53, 136.47, 132.07, 130.21, 131.08, 127.99, 133.25, 130.63, 128.47, 119.5, 116.7, 113.5, 107.27, 112.93, 115.7, 116.67, 125.73], 'YTD': [177.75, 176.86, 177.07, 169.6, 146.59, 135.9, 131.41, 130.6, 145.17, 156.43, 152.72, 160.84, 137.55, 147.93, 132.37, 145.89, 143.1, 146.03, 136.89, 135.14, 136.6, 152.17, 132.07, 133.25, 113.5, 125.73], '6M': [167.86, 177.49, 170.96, 167.47, 147.76, 142.91, 133.02, 130.6, 145.17, 156.43, 152.72, 160.84, 137.55, 150.07, 135.7, 145.97, 141.18, 135.91, 136, 135.14, 136.6, 152.17, 132.07, 133.25, 113.5, 125.73], '1Y': [132.12, 142.5, 153.99, 154.86, 158.35, 182.2, 184.37, 156.01, 156.72, 156.14, 164.36, 176.97, 179.12, 187.05, 185.47, 178.12, 175.49, 198.81, 187.9, 184.17, 165.42, 165.77, 177.92, 187.54, 185.69, 188.71, 167.86, 177.49, 170.96, 167.47, 147.76, 142.91, 133.02, 128.84, 147.22, 151.14, 152.72, 160.84, 137.55, 150.07, 135.7, 145.97, 141.18, 135.91, 136, 135.26, 136.6, 152.17, 132.07, 133.25, 113.5, 125.73] },
      velocityScore: { '1D': 0, '1W': -9.4, '1M': -72.5, '6M': null }, isNew: false,
      marketCap: '$301B', pe: 141.3, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 7.69, FDTX: 2.87, GTEK: false, ARKK: 2.61, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 3, avgWeight: 4.86, proScore: 2.92, coverage: 0.6,
      price: 691.4, weeklyPrices: [718.59, 687.87, 714.45, 720.04, 691.40], weeklyChange: -3.78, dayChange: -3.96, sortRank: 0, periodReturns: { '1M': 0.6, 'YTD': 63.8, '6M': 63.8, '1Y': 85.2 },
      priceHistory: { '1D': [719.93, 697.59, 690.69, 694.85, 691.29, 690.17, 691.93, 692.03, 698.48, 697.65, 697.34, 694.85, 694.5, 691.84, 692.51, 691.71, 692.47, 691.56, 690.34, 689.99, 694.29, 692.7, 692.42, 691.4], '1W': [718.59, 687.87, 714.45, 720.04, 691.4], '1M': [687.48, 706.06, 715.67, 719.17, 695.11, 693.81, 691.95, 650.92, 683.29, 707.74, 719.29, 714.85, 702.25, 740.14, 702.29, 701.88, 718.59, 687.87, 714.45, 720.04, 691.4], 'YTD': [422.06, 413.17, 447.64, 468.76, 474.63, 508.11, 524.08, 549.11, 572.66, 568.04, 574.02, 567.45, 533.78, 554.38, 595.84, 604.97, 637.28, 757.34, 781.38, 723.03, 742.18, 706.06, 691.95, 719.29, 701.88, 691.4], '6M': [439.68, 422.57, 466.75, 470.77, 477.77, 514.56, 525.13, 549.11, 572.66, 568.04, 574.02, 567.45, 533.78, 555.57, 594.4, 605.89, 630.94, 771.61, 765.81, 723.03, 742.18, 706.06, 691.95, 719.29, 701.88, 691.4], '1Y': [373.41, 380.09, 397.9, 407.22, 406.13, 387.35, 379.96, 375.87, 381.56, 376.09, 389.64, 390.65, 400.41, 420.86, 429.92, 437.52, 412.21, 448.69, 453.45, 449.42, 445.47, 460.43, 464.84, 466.91, 421.31, 432.67, 439.68, 422.57, 466.75, 470.77, 477.77, 514.56, 525.13, 568.21, 566, 564.05, 574.02, 567.45, 533.78, 555.57, 594.4, 605.89, 630.94, 771.61, 765.81, 714.13, 742.18, 706.06, 691.95, 719.29, 701.88, 691.4] },
      velocityScore: { '1D': -1, '1W': 3.2, '1M': -19.6, '6M': null }, isNew: false,
      marketCap: '$104B', pe: 95.1, revenueGrowth: 26, eps: 7.27, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.95, VOLT: 5.26, PBD: false, PBW: false, IVEP: 4.37 },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 3, avgWeight: 4.65, proScore: 2.79, coverage: 0.6,
      price: 318.06, weeklyPrices: [310.32, 310.64, 315.65, 333.04, 318.06], weeklyChange: 2.49, dayChange: -4.5, sortRank: 0, periodReturns: { '1M': 17.9, 'YTD': 87.5, '6M': 87.5, '1Y': 221.8 },
      priceHistory: { '1D': [333.04, 320, 323.01, 322.48, 315.92, 316.57, 316.55, 317.5, 318.17, 316.36, 318.83, 319.92, 318.53, 319.31, 319.72, 318.05, 316.49, 315.92, 315.82, 318.05, 318.14, 320.33, 318.27, 318.06], '1W': [310.32, 310.64, 315.65, 333.04, 318.06], '1M': [269.86, 269.22, 280.09, 276.54, 262.56, 279.13, 276.04, 276.95, 296.55, 293.87, 293.22, 299.84, 296.39, 304.33, 288.64, 294.15, 310.32, 310.64, 315.65, 333.04, 318.06], 'YTD': [169.63, 180.24, 196.61, 196.5, 201.19, 220.78, 232.84, 231.83, 222.45, 191.81, 205.11, 214.98, 197.83, 206.9, 237.93, 254.38, 250.96, 286.69, 302.73, 258.28, 276.25, 269.22, 276.04, 293.22, 294.15, 318.06], '6M': [172.78, 187.43, 200.11, 205.17, 215.59, 229.32, 235.3, 231.83, 222.45, 191.81, 205.11, 214.98, 197.83, 210.32, 237.34, 257.41, 249.82, 297.17, 298.22, 258.28, 276.25, 269.22, 276.04, 293.22, 294.15, 318.06], '1Y': [98.83, 102.3, 101.32, 102.98, 130.04, 132.61, 134.58, 128.41, 140.42, 143.06, 148.32, 150.97, 142.72, 142.44, 142.94, 148.88, 148.25, 152.46, 154.86, 153.75, 144.89, 152.69, 163.19, 175.36, 166.55, 176.45, 172.78, 187.43, 200.11, 205.17, 215.59, 229.32, 235.3, 234.4, 213.65, 198.5, 205.11, 214.98, 197.83, 210.32, 237.34, 257.41, 249.82, 297.17, 298.22, 249.71, 276.25, 269.22, 276.04, 293.22, 294.15, 318.06] },
      velocityScore: { '1D': 16.7, '1W': 28, '1M': -25.2, '6M': null }, isNew: false,
      marketCap: '$5B', pe: 76.5, revenueGrowth: 17, eps: 4.16, grossMargin: 39, dividendYield: 0.08,
      etfPresence: { POW: 3.95, VOLT: 8.37, PBD: false, PBW: 1.63, IVEP: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 3, avgWeight: 4.51, proScore: 2.7, coverage: 0.6,
      price: 412.31, weeklyPrices: [419.87, 402.68, 408.26, 426.12, 412.31], weeklyChange: -1.8, dayChange: -3.24, sortRank: 0, periodReturns: { '1M': 3.1, 'YTD': 29.4, '6M': 29.4, '1Y': 15.1 },
      priceHistory: { '1D': [426.12, 410.36, 415.93, 417.88, 414.79, 412.79, 416.09, 419.52, 421.57, 421.8, 422.89, 421.51, 419.64, 418.5, 416.9, 415.82, 416.9, 414.72, 414.56, 413.4, 415.33, 414.76, 413.64, 412.31], '1W': [419.87, 402.68, 408.26, 426.12, 412.31], '1M': [400.08, 417.62, 421.21, 418.61, 395.94, 403.14, 401.72, 375.46, 393.64, 391.39, 407.71, 409.64, 421.77, 435.78, 405.28, 404.59, 419.87, 402.68, 408.26, 426.12, 412.31], 'YTD': [318.51, 320.58, 333.46, 331.22, 351.42, 373.82, 389.25, 362.05, 377.4, 353.87, 361.04, 359.74, 343.53, 363.89, 403.36, 407.57, 416.77, 422.44, 419, 381.87, 403.13, 417.62, 401.72, 407.71, 404.59, 412.31], '6M': [327.31, 324.51, 343.75, 332.28, 359.44, 377.06, 391.49, 362.05, 377.4, 353.87, 361.04, 359.74, 343.53, 368.85, 401.9, 409.7, 413.07, 410.86, 401.53, 381.87, 403.13, 417.62, 401.72, 407.71, 404.59, 412.31], '1Y': [358.19, 357.64, 380.72, 384.9, 384.72, 360.16, 357.49, 346.22, 351.4, 348.22, 360.08, 371.27, 364.74, 376.76, 377.19, 375.59, 360.6, 387.75, 385.44, 369.4, 345.65, 341.69, 338.93, 350.36, 315.95, 322.17, 327.31, 324.51, 343.75, 332.28, 359.44, 377.06, 391.49, 374.56, 355.56, 361.06, 361.04, 359.74, 343.53, 368.85, 401.9, 409.7, 413.07, 410.86, 401.53, 371.88, 403.13, 417.62, 401.72, 407.71, 404.59, 412.31] },
      velocityScore: { '1D': 2.3, '1W': 1.9, '1M': -17.9, '6M': null }, isNew: false,
      marketCap: '$160B', pe: 40.3, revenueGrowth: 17, eps: 10.23, grossMargin: 37, dividendYield: 1.03,
      etfPresence: { POW: 4.07, VOLT: 5.34, PBD: false, PBW: false, IVEP: 4.11 },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 3, avgWeight: 4.23, proScore: 2.54, coverage: 0.6,
      price: 1134.35, weeklyPrices: [1085.47, 1045.17, 1102.51, 1174.86, 1134.35], weeklyChange: 4.5, dayChange: -3.45, sortRank: 0, periodReturns: { '1M': 19.3, 'YTD': 73.6, '6M': 73.6, '1Y': 124.6 },
      priceHistory: { '1D': [1174.86, 1138.89, 1155.98, 1154.26, 1145.68, 1141.56, 1145.98, 1150.18, 1157.52, 1154, 1157.52, 1157.97, 1153.72, 1150.83, 1146.69, 1139.68, 1139.83, 1134.35, 1130, 1129.4, 1139.9, 1136.66, 1133.32, 1134.35], '1W': [1085.47, 1045.17, 1102.51, 1174.86, 1134.35], '1M': [950.54, 969.67, 959.36, 963.33, 933.61, 933.85, 920.15, 867.09, 906.79, 940.66, 982.35, 1048.86, 1109.73, 1127.59, 1034.98, 1057.65, 1085.47, 1045.17, 1102.51, 1174.86, 1134.35], 'YTD': [653.57, 628.4, 642.23, 657.78, 726.37, 779.35, 802.13, 831.7, 881.18, 830.1, 827.37, 882.64, 817.35, 897.36, 991.12, 990.18, 1120.23, 1073.95, 1073.08, 1012.25, 1070.47, 969.67, 920.15, 982.35, 1057.65, 1134.35], '6M': [679.55, 622.5, 681.55, 665.99, 754.97, 801.54, 819.15, 831.7, 881.18, 830.1, 827.37, 882.64, 817.35, 910.75, 987.5, 991.3, 1088.93, 1095.21, 1071.98, 1012.25, 1070.47, 969.67, 920.15, 982.35, 1057.65, 1134.35], '1Y': [505.07, 539.36, 570.17, 623.97, 660.29, 645.86, 634.31, 604.59, 622.39, 598.81, 634.15, 611, 607.52, 606.23, 634.27, 602, 576, 577.97, 559.7, 575.4, 595.37, 589.72, 629.11, 704.2, 639.43, 663.46, 679.55, 622.5, 681.55, 665.99, 754.97, 801.54, 819.15, 879.73, 842, 839.2, 827.37, 882.64, 817.35, 910.75, 987.5, 991.3, 1088.93, 1095.21, 1071.98, 1011.8, 1070.47, 969.67, 920.15, 982.35, 1057.65, 1134.35] },
      velocityScore: { '1D': 4.5, '1W': 6.7, '1M': -1.6, '6M': null }, isNew: false,
      marketCap: '$305B', pe: 33.2, revenueGrowth: 16, eps: 34.19, grossMargin: 20, dividendYield: 0.17,
      etfPresence: { POW: 3.51, VOLT: 4.57, PBD: false, PBW: false, IVEP: 4.62 },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy Corp', easyScore: 3, avgWeight: 3.75, proScore: 2.25, coverage: 0.6,
      price: 289.5, weeklyPrices: [309.18, 252.02, 275.01, 302.70, 289.50], weeklyChange: -6.37, dayChange: -4.36, sortRank: 0, periodReturns: { '1M': 5.8, 'YTD': 233.2, '6M': 233.2, '1Y': 1183.2 },
      priceHistory: { '1D': [302.7, 313.23, 310.53, 312.31, 304.01, 299.39, 303.86, 308.17, 308.99, 308.75, 308.74, 310.25, 307.02, 303.78, 302.76, 299.28, 296.3, 292.68, 292.72, 290.06, 296.12, 297.27, 290.69, 289.5], '1W': [309.18, 252.02, 275.01, 302.7, 289.5], '1M': [273.51, 302.85, 287.32, 291.37, 263.61, 253.57, 259.61, 234.23, 248.88, 260.22, 280.88, 284.99, 328.91, 345.85, 321.98, 326.19, 309.18, 252.02, 275.01, 302.7, 289.5], 'YTD': [86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 160.28, 166, 151.32, 153.68, 141.33, 119.51, 135, 176.67, 218.27, 234.68, 288.64, 283.92, 258.71, 302.4, 302.85, 259.61, 280.88, 326.19, 289.5], '6M': [98.69, 134.07, 149.5, 139.62, 156.13, 155.17, 145.32, 160.28, 166, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 258.71, 302.4, 302.85, 259.61, 280.88, 326.19, 289.5], '1Y': [22.56, 25.85, 24.31, 33.06, 37.39, 36.8, 44.08, 44.51, 50.85, 54.91, 67.29, 80.97, 68.69, 88, 86.65, 115.09, 94.37, 133.71, 141.41, 126.72, 108.93, 101.14, 118.09, 108.99, 80.21, 90.18, 98.69, 134.07, 149.5, 139.62, 156.13, 155.17, 145.32, 166.2, 153.02, 154, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 261.34, 302.4, 302.85, 259.61, 280.88, 326.19, 289.5] },
      velocityScore: { '1D': -11.8, '1W': -13.1, '1M': -3.4, '6M': null }, isNew: false,
      marketCap: '$82B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: 1.69, VOLT: 4.11, PBD: false, PBW: false, IVEP: 5.46 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 3, avgWeight: 3.48, proScore: 2.09, coverage: 0.6,
      price: 86.37, weeklyPrices: [87.70, 88.56, 88.66, 87.77, 86.37], weeklyChange: -1.52, dayChange: -1.6, sortRank: 0, periodReturns: { '1M': 3.2, 'YTD': 7.6, '6M': 7.6, '1Y': 18.3 },
      priceHistory: { '1D': [87.77, 87.34, 87.32, 87.48, 87.38, 86.81, 86.86, 86.65, 86.71, 86.81, 87.03, 86.93, 86.94, 86.72, 86.67, 86.79, 86.86, 86.79, 86.75, 86.81, 86.68, 86.57, 86.63, 86.37], '1W': [87.7, 88.56, 88.66, 87.77, 86.37], '1M': [83.66, 85.68, 84.58, 85.68, 85.84, 84.01, 84.83, 85.12, 84.84, 85.99, 86.23, 85.73, 86.75, 86.08, 86.43, 87.62, 87.7, 88.56, 88.66, 87.77, 86.37], 'YTD': [80.28, 79.49, 82.19, 84.81, 87.9, 89.47, 93.8, 94.06, 92.71, 92.01, 92.82, 90.23, 92.05, 92.73, 92.3, 92.01, 94.83, 95.51, 94.84, 89.04, 87.65, 85.68, 84.83, 86.23, 87.62, 86.37], '6M': [80.93, 79.89, 83.63, 85.47, 86.33, 89.48, 92.71, 94.06, 92.71, 92.01, 92.82, 90.23, 92.05, 93.67, 91.31, 90.6, 96.51, 96.28, 94.59, 89.04, 87.65, 85.68, 84.83, 86.23, 87.62, 86.37], '1Y': [73.02, 74.64, 75.18, 71.97, 71.06, 72.58, 72.3, 76.18, 73.89, 70.87, 71.32, 70.79, 74.65, 78.18, 83.71, 85.05, 82.84, 81.76, 82.14, 85.89, 84.27, 85.54, 83.39, 81.21, 80.85, 80.41, 80.93, 79.89, 83.63, 85.47, 86.33, 89.48, 92.71, 95.68, 92.59, 91.54, 92.82, 90.23, 92.05, 93.67, 91.31, 90.6, 96.51, 96.28, 94.59, 90.06, 87.65, 85.68, 84.83, 86.23, 87.62, 86.37] },
      velocityScore: { '1D': -2.8, '1W': 0.5, '1M': -2.3, '6M': null }, isNew: false,
      marketCap: '$180B', pe: 21.9, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.84,
      etfPresence: { POW: 1.99, VOLT: 4.83, PBD: false, PBW: false, IVEP: 3.63 },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 3, avgWeight: 3.33, proScore: 2, coverage: 0.6,
      price: 159.99, weeklyPrices: [171.91, 162.92, 163.35, 169.61, 159.99], weeklyChange: -6.93, dayChange: -5.67, sortRank: 0, periodReturns: { '1M': -6.7, 'YTD': 56.9, '6M': 56.9, '1Y': 117.9 },
      priceHistory: { '1D': [169.61, 162.76, 164.41, 164.79, 162.61, 161.64, 161.32, 162.07, 162.71, 162.96, 162.96, 162.86, 161.93, 161.16, 161.56, 161.16, 160.77, 160.28, 159.88, 159.37, 160.07, 159.67, 159.1, 159.99], '1W': [171.91, 162.92, 163.35, 169.61, 159.99], '1M': [171.55, 173.39, 176.39, 173.88, 162.86, 163.81, 163.8, 156.79, 164.52, 165.84, 167.34, 170.94, 177.02, 184.34, 168.37, 167.55, 171.91, 162.92, 163.35, 169.61, 159.99], 'YTD': [101.97, 102.72, 107.98, 110.29, 112.26, 112.64, 113.25, 114.93, 120.27, 108.13, 114.3, 121, 112.75, 117.41, 133.16, 135.8, 141.71, 162.69, 173.39, 160.69, 169.29, 173.39, 163.8, 167.34, 167.55, 159.99], '6M': [106.82, 105.38, 112.5, 110.58, 115.79, 114.62, 115.22, 114.93, 120.27, 108.13, 114.3, 121, 112.75, 118.92, 134.48, 137, 138.3, 169.41, 170.74, 160.69, 169.29, 173.39, 163.8, 167.34, 167.55, 159.99], '1Y': [73.44, 74.67, 77.23, 77.09, 78.42, 89.1, 90.61, 88.04, 91.11, 91.93, 95.71, 98.65, 96.6, 99.43, 97.73, 100.54, 96.93, 106.28, 112.5, 111.46, 105.74, 106.53, 108.27, 109.15, 98.28, 104.18, 106.82, 105.38, 112.5, 110.58, 115.79, 114.62, 115.22, 118.22, 111.65, 109.13, 114.3, 121, 112.75, 118.92, 134.48, 137, 138.3, 169.41, 170.74, 158.23, 169.29, 173.39, 163.8, 167.34, 167.55, 159.99] },
      velocityScore: { '1D': 2, '1W': -2.9, '1M': -18.7, '6M': null }, isNew: false,
      marketCap: '$26B', pe: 54.6, revenueGrowth: 54, eps: 2.93, grossMargin: 37, dividendYield: 0.5,
      etfPresence: { POW: 3.75, VOLT: 3, PBD: false, PBW: false, IVEP: 3.24 },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 3, avgWeight: 2.96, proScore: 1.77, coverage: 0.6,
      price: 490.12, weeklyPrices: [536.04, 517.02, 514.71, 523.20, 490.12], weeklyChange: -8.57, dayChange: -6.32, sortRank: 0, periodReturns: { '1M': 5.9, 'YTD': 10.4, '6M': 10.4, '1Y': 18.1 },
      priceHistory: { '1D': [523.2, 507.99, 510.1, 512.09, 507.19, 504.28, 502.58, 503.76, 498.52, 500.13, 503.08, 502.1, 498.43, 496.96, 495.21, 496.02, 496.58, 495.08, 493.61, 493.98, 493.52, 490.94, 490.43, 490.12], '1W': [536.04, 517.02, 514.71, 523.2, 490.12], '1M': [462.93, 480.46, 484.91, 485.27, 476.82, 485.03, 486.47, 467.59, 469.32, 476.89, 502.65, 508.87, 523.69, 539.39, 509.96, 518.18, 536.04, 517.02, 514.71, 523.2, 490.12], 'YTD': [444.11, 460.87, 484.11, 485.53, 487.94, 503.8, 524.12, 516.99, 516.98, 487.76, 472.64, 489.07, 472.07, 499.2, 539.79, 546.23, 555.34, 516, 490.16, 470.87, 478.05, 480.46, 486.47, 502.65, 518.18, 490.12], '6M': [463.03, 470.53, 489.31, 486.82, 495.59, 506.14, 524.25, 516.99, 516.98, 487.76, 472.64, 489.07, 472.07, 499.31, 545.62, 549.11, 544.71, 507.81, 485.98, 470.87, 478.05, 480.46, 486.47, 502.65, 518.18, 490.12], '1Y': [415.12, 422.26, 437.23, 437.5, 437.48, 417.84, 443.95, 429.96, 446.06, 437.16, 450.93, 440.1, 420.44, 423.42, 418.89, 428.82, 422.63, 472.57, 468.06, 453, 419.09, 428.47, 437.71, 462.82, 434.85, 454.94, 463.03, 470.53, 489.31, 486.82, 495.59, 506.14, 524.25, 526.75, 488.49, 478.06, 472.64, 489.07, 472.07, 499.31, 545.62, 549.11, 544.71, 507.81, 485.98, 461.5, 478.05, 480.46, 486.47, 502.65, 518.18, 490.12] },
      velocityScore: { '1D': -0.6, '1W': -1.1, '1M': -16.9, '6M': null }, isNew: false,
      marketCap: '$26B', pe: 29, revenueGrowth: 11, eps: 16.9, grossMargin: 36, dividendYield: 1.09,
      etfPresence: { POW: 2.87, VOLT: 3.38, PBD: false, PBW: false, IVEP: 2.62 },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'NRG', name: 'NRG Energy Inc', easyScore: 3, avgWeight: 1.34, proScore: 0.8, coverage: 0.6,
      price: 140.8, weeklyPrices: [147.11, 149.36, 149.11, 146.06, 140.80], weeklyChange: -4.29, dayChange: -3.6, sortRank: 0, periodReturns: { '1M': 8.8, 'YTD': -11.6, '6M': -11.6, '1Y': -9.5 },
      priceHistory: { '1D': [146.06, 143.45, 141.84, 142.2, 140.1, 138.71, 139.2, 139.04, 138.66, 138.62, 138.64, 138.37, 139.09, 138.07, 137.69, 138.54, 139.09, 138.78, 139.39, 139.08, 138.65, 139.15, 140.13, 140.8], '1W': [147.11, 149.36, 149.11, 146.06, 140.8], '1M': [129.47, 133.51, 133.76, 133.39, 129.2, 127.71, 129.96, 120.65, 123.7, 125.47, 132.1, 132.13, 135.06, 138.91, 137.66, 142.21, 147.11, 149.36, 149.11, 146.06, 140.8], 'YTD': [159.24, 143.53, 158.5, 149.3, 152.63, 153.32, 172.35, 176.52, 175.58, 155.42, 152.48, 151.77, 141.23, 149.8, 170.24, 157.18, 160.15, 154.82, 137.3, 125.5, 140.43, 133.51, 129.96, 132.1, 142.21, 140.8], '6M': [166.16, 149.27, 152.05, 149.93, 149.11, 155.72, 173.45, 176.52, 175.58, 155.42, 152.48, 151.77, 141.23, 153.06, 170.96, 149.86, 154.81, 157.43, 137.34, 125.5, 140.43, 133.51, 129.96, 132.1, 142.21, 140.8], '1Y': [155.54, 151.36, 147.38, 157.97, 167.2, 153.22, 155, 148.19, 148.12, 147.95, 157.92, 164.19, 162.96, 167.3, 168.25, 169.93, 160.42, 178.5, 173.19, 168.84, 168.8, 168.54, 169.36, 170.64, 154.64, 160.88, 166.16, 149.27, 152.05, 149.93, 149.11, 155.72, 173.45, 184.03, 162.06, 155.15, 152.48, 151.77, 141.23, 153.06, 170.96, 149.86, 154.81, 157.43, 137.34, 123.71, 140.43, 133.51, 129.96, 132.1, 142.21, 140.8] },
      velocityScore: { '1D': -3.6, '1W': 21.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$30B', pe: 154.7, revenueGrowth: 20, eps: 0.91, grossMargin: 16, dividendYield: 1.3,
      etfPresence: { POW: 0.52, VOLT: 1.01, PBD: false, PBW: false, IVEP: 2.48 },
      tonyNote: 'NRG Energy Inc appears in 3 of 5 Electrification ETFs (60% coverage) with average weight 1.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 2, avgWeight: 5.81, proScore: 2.32, coverage: 0.4,
      price: 264.86, weeklyPrices: [309.20, 279.77, 281.09, 286.36, 264.86], weeklyChange: -14.34, dayChange: -7.51, sortRank: 0, periodReturns: { '1M': -8.1, 'YTD': 149.3, '6M': 149.3, '1Y': 263.6 },
      priceHistory: { '1D': [286.36, 266.74, 267.73, 269.42, 266.71, 267.85, 270.39, 272.42, 276.04, 272.57, 273.4, 272.42, 270.08, 268.1, 266.73, 266.47, 264.51, 265.25, 263.74, 263.98, 268.24, 266.95, 266.11, 264.86], '1W': [309.2, 279.77, 281.09, 286.36, 264.86], '1M': [288.12, 299.07, 299.73, 300.06, 284.87, 293.6, 283.51, 262.34, 290.5, 294.75, 292.7, 294.03, 297.2, 307.8, 291.5, 294.49, 309.2, 279.77, 281.09, 286.36, 264.86], 'YTD': [106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 181.38, 177.5, 173.36, 170.61, 180.86, 167.52, 186.72, 228.99, 241.65, 260.52, 269.95, 322.05, 266.8, 291.97, 299.07, 283.51, 292.7, 294.49, 264.86], '6M': [117.51, 121.83, 139.99, 141.15, 146.79, 187.3, 187.21, 181.38, 177.5, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 266.8, 291.97, 299.07, 283.51, 292.7, 294.49, 264.86], '1Y': [72.84, 70.96, 78.84, 80.05, 79.03, 77.8, 86.57, 82.17, 91.46, 90.24, 97.47, 101.43, 94.58, 102.51, 103.18, 112.77, 110.96, 136.12, 131.92, 118.74, 95.1, 107.26, 112.31, 120.91, 109.59, 113.62, 117.51, 121.83, 139.99, 141.15, 146.79, 187.3, 187.21, 186.39, 170.37, 176.51, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 261.58, 291.97, 299.07, 283.51, 292.7, 294.49, 264.86] },
      velocityScore: { '1D': -14.4, '1W': -26.1, '1M': -53.1, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 51.6, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { POW: 4.68, VOLT: 6.94, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, avgWeight: 3.42, proScore: 1.37, coverage: 0.4,
      price: 135.05, weeklyPrices: [137.00, 138.69, 137.97, 136.81, 135.05], weeklyChange: -1.42, dayChange: -1.29, sortRank: 0, periodReturns: { '1M': 9.1, 'YTD': 17.1, '6M': 17.1, '1Y': 30.8 },
      priceHistory: { '1D': [136.81, 136.65, 136.39, 136.92, 136.69, 136.22, 135.93, 135.6, 135.95, 135.91, 136.2, 136.02, 135.9, 135.78, 135.71, 134.9, 135.1, 135.14, 135.04, 135.38, 135.16, 134.83, 135.07, 135.05], '1W': [137, 138.69, 137.97, 136.81, 135.05], '1M': [123.79, 127.11, 126.31, 127.79, 129.14, 126.77, 127.76, 128.53, 128.48, 129.23, 129.75, 128.27, 127.69, 130.3, 133.74, 134.96, 137, 138.69, 137.97, 136.81, 135.05], 'YTD': [115.31, 115.93, 119.4, 116.63, 119.78, 120.8, 129.94, 132.03, 133.29, 131.86, 134.15, 127.92, 131.12, 132.36, 134.46, 133.28, 135.07, 134.66, 130.7, 127.68, 130.9, 127.11, 127.76, 129.75, 134.96, 135.05], '6M': [115.81, 116.91, 119.96, 118.02, 118.33, 121.1, 130.24, 132.03, 133.29, 131.86, 134.15, 127.92, 131.12, 132.92, 135.46, 131.89, 135.59, 137.04, 131.94, 127.68, 130.9, 127.11, 127.76, 129.75, 134.96, 135.05], '1Y': [103.26, 106.04, 105.93, 108.97, 113.14, 113.73, 113.11, 113.55, 112.89, 108.64, 108.74, 106.44, 107.86, 113.46, 116.91, 117.53, 117.27, 122.11, 119.76, 122.68, 121.71, 122.72, 118.04, 114.26, 115.58, 115.67, 115.81, 116.91, 119.96, 118.02, 118.33, 121.1, 130.24, 132.39, 131.92, 132.31, 134.15, 127.92, 131.12, 132.92, 135.46, 131.89, 135.59, 137.04, 131.94, 128.92, 130.9, 127.11, 127.76, 129.75, 134.96, 135.05] },
      velocityScore: { '1D': -2.8, '1W': 22.3, '1M': -29.7, '6M': null }, isNew: false,
      marketCap: '$73B', pe: 20, revenueGrowth: 10, eps: 6.76, grossMargin: 47, dividendYield: 2.78,
      etfPresence: { POW: 2.61, VOLT: 4.23, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 2, avgWeight: 3.41, proScore: 1.36, coverage: 0.4,
      price: 311.42, weeklyPrices: [325.57, 303.95, 306.97, 334.82, 311.42], weeklyChange: -4.35, dayChange: -6.99, sortRank: 0, periodReturns: { '1M': -3.7, 'YTD': 92.2, '6M': 92.2, '1Y': 150.5 },
      priceHistory: { '1D': [334.82, 316.6, 319.75, 320.03, 315.33, 312.83, 314.44, 317.89, 318.53, 318.84, 319, 318.11, 316.94, 315.05, 314.83, 313.99, 314.02, 313.57, 312.92, 309.78, 312.94, 313.48, 313.49, 311.42], '1W': [325.57, 303.95, 306.97, 334.82, 311.42], '1M': [323.39, 334.49, 331.44, 323.92, 300.51, 300.57, 289.52, 280.98, 297.88, 302.87, 299.6, 317.58, 333.05, 357.96, 318.32, 316.43, 325.57, 303.95, 306.97, 334.82, 311.42], 'YTD': [162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 234.53, 245.42, 257.75, 264.35, 264.74, 256, 234.22, 258.73, 299.96, 314.41, 322.43, 330.97, 367.92, 339.73, 323.91, 334.49, 289.52, 299.6, 316.43, 311.42], '6M': [175.61, 163.58, 176.93, 181.23, 190.01, 202, 243.53, 245.42, 257.75, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.13, 339.73, 323.91, 334.49, 289.52, 299.6, 316.43, 311.42], '1Y': [124.33, 120.72, 131.12, 130.87, 145.6, 139.39, 137.4, 127.54, 129.31, 125.7, 135.71, 141.96, 139.77, 161.64, 168.88, 177.82, 171.59, 199.27, 190.71, 173.37, 170.65, 172.02, 182.54, 178.66, 154.39, 167.58, 175.61, 163.58, 176.93, 181.23, 190.01, 202, 243.53, 253.15, 244.44, 270.06, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.13, 322.63, 323.91, 334.49, 289.52, 299.6, 316.43, 311.42] },
      velocityScore: { '1D': 7.1, '1W': 4.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$120B', pe: 78.2, revenueGrowth: 30, eps: 3.98, grossMargin: 37, dividendYield: 0.07,
      etfPresence: { POW: false, VOLT: 2.51, PBD: false, PBW: false, IVEP: 4.31 },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'APH', name: 'Amphenol Corp', easyScore: 2, avgWeight: 2.83, proScore: 1.13, coverage: 0.4,
      price: 172.22, weeklyPrices: [165.15, 163.72, 166.42, 176.32, 172.22], weeklyChange: 4.28, dayChange: -2.33, sortRank: 0, periodReturns: { '1M': 17.7, 'YTD': 27.4, '6M': 27.4, '1Y': 74.8 },
      priceHistory: { '1D': [176.32, 168.68, 171.94, 173.1, 172.21, 171.99, 172.06, 173.05, 173.26, 172.9, 173.23, 173, 172.85, 172.6, 172.62, 172.17, 172.07, 171.79, 172.46, 172.26, 172.88, 172.6, 173.08, 172.22], '1W': [165.15, 163.72, 166.42, 176.32, 172.22], '1M': [146.34, 148.4, 147.62, 146.77, 138.81, 143.6, 154.07, 149.22, 152.46, 153.8, 158.81, 161.11, 163.96, 165.96, 158.7, 162.78, 165.15, 163.72, 166.42, 176.32, 172.22], 'YTD': [135.14, 136.25, 154.22, 150.99, 144.08, 136.23, 146.72, 147.82, 135.16, 136.06, 136.8, 130.67, 119.15, 126.49, 145.27, 152.81, 148.64, 141.03, 122.47, 121.72, 139.56, 148.4, 154.07, 158.81, 162.78, 172.22], '6M': [139.71, 140.16, 154.39, 155.56, 144.93, 144.2, 148.57, 147.82, 135.16, 136.06, 136.8, 130.67, 119.15, 128.38, 148.72, 151.93, 143.72, 136.69, 127.87, 121.72, 139.56, 148.4, 154.07, 158.81, 162.78, 172.22], '1Y': [98.52, 98.31, 101.96, 104.46, 106.51, 108.55, 109.83, 108.65, 110.13, 112.75, 119.47, 122.07, 122.33, 123.58, 126.25, 127.36, 128.93, 139.75, 138.87, 141.92, 136.66, 138.72, 139.46, 139.09, 129.61, 137.43, 139.71, 140.16, 154.39, 155.56, 144.93, 144.2, 148.57, 151.5, 129.58, 136.74, 136.8, 130.67, 119.15, 128.38, 148.72, 151.93, 143.72, 136.69, 127.87, 119.2, 139.56, 148.4, 154.07, 158.81, 162.78, 172.22] },
      velocityScore: { '1D': 2.7, '1W': null, '1M': -37.2, '6M': null }, isNew: false,
      marketCap: '$212B', pe: 49.6, revenueGrowth: 58, eps: 3.47, grossMargin: 38, dividendYield: 0.57,
      etfPresence: { POW: 1.06, VOLT: 4.6, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, avgWeight: 2.78, proScore: 1.11, coverage: 0.4,
      price: 356.35, weeklyPrices: [375.15, 348.11, 348.15, 372.87, 356.35], weeklyChange: -5.01, dayChange: -4.43, sortRank: 0, periodReturns: { '1M': 20.9, 'YTD': 70.2, '6M': 70.2, '1Y': 159.1 },
      priceHistory: { '1D': [372.87, 356.57, 361.42, 362.65, 356.45, 354.8, 355.83, 358.63, 358.89, 358.75, 359.54, 358.24, 356.58, 356.85, 357.02, 355.78, 355.26, 354.44, 354.74, 353.33, 354.95, 355.32, 356.73, 356.35], '1W': [375.15, 348.11, 348.15, 372.87, 356.35], '1M': [294.65, 312.28, 322.5, 320.92, 294.81, 306.11, 311.64, 308.17, 340.4, 354.37, 350.45, 353.32, 372.59, 388.23, 364.96, 359.61, 375.15, 348.11, 348.15, 372.87, 356.35], 'YTD': [209.37, 210.99, 257.29, 262.19, 255.36, 273.26, 314.27, 329.24, 340.42, 305.02, 308.31, 329.78, 298.29, 331.9, 378.94, 380.22, 385.68, 387.03, 354.97, 309.06, 339.65, 312.28, 311.64, 350.45, 359.61, 356.35], '6M': [221.99, 219.59, 253.86, 263.03, 261.82, 279.17, 314.12, 329.24, 340.42, 305.02, 308.31, 329.78, 298.29, 339.32, 385.73, 385, 369.08, 345.63, 339.42, 309.06, 339.65, 312.28, 311.64, 350.45, 359.61, 356.35], '1Y': [137.55, 143.62, 142.73, 140.91, 138.92, 146.5, 162.52, 147.74, 153.73, 150.14, 159.52, 169.75, 167.35, 178.08, 179.98, 192.22, 190.46, 208.05, 225.8, 212.79, 198.89, 209.9, 214.65, 224.11, 208.77, 217.86, 221.99, 219.59, 253.86, 263.03, 261.82, 279.17, 314.12, 335.74, 322.47, 311.39, 308.31, 329.78, 298.29, 339.32, 385.73, 385, 369.08, 345.63, 339.42, 302.84, 339.65, 312.28, 311.64, 350.45, 359.61, 356.35] },
      velocityScore: { '1D': 4.7, '1W': 23.3, '1M': -34.3, '6M': null }, isNew: false,
      marketCap: '$14B', pe: 74.1, revenueGrowth: 26, eps: 4.81, grossMargin: 39, dividendYield: 0.11,
      etfPresence: { POW: 1.1, VOLT: 4.46, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 2.56, proScore: 1.02, coverage: 0.4,
      price: 72.77, weeklyPrices: [77.53, 77.92, 75.06, 74.34, 72.77], weeklyChange: -6.14, dayChange: -2.11, sortRank: 0, periodReturns: { '1M': 3.9, 'YTD': 21.1, '6M': 21.1, '1Y': 23 },
      priceHistory: { '1D': [74.34, 74.07, 73.61, 72.93, 72.5, 72.63, 72.81, 72.62, 72.71, 72.86, 72.8, 72.91, 72.84, 72.72, 72.85, 72.88, 73.08, 73.06, 72.82, 72.88, 72.87, 72.64, 72.44, 72.77], '1W': [77.53, 77.92, 75.06, 74.34, 72.77], '1M': [70.04, 71.31, 71.66, 72.43, 71.96, 71.59, 71.59, 72.26, 71.62, 72.08, 71.48, 71.25, 73.12, 74.95, 75.79, 75.87, 77.53, 77.92, 75.06, 74.34, 72.77], 'YTD': [60.11, 61.15, 60.29, 64.96, 67.26, 66.92, 72.28, 72.98, 76.26, 73.18, 73.89, 73.6, 72.47, 72.59, 71.54, 70.91, 71.61, 75.41, 74.18, 77.69, 76.34, 71.31, 71.59, 71.48, 75.87, 72.77], '6M': [60.85, 60.32, 61.55, 64.29, 66.34, 67.85, 71.96, 72.98, 76.26, 73.18, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 76.12, 74.73, 77.69, 76.34, 71.31, 71.59, 71.48, 75.87, 72.77], '1Y': [59.14, 57.78, 58.09, 58.75, 59.95, 57.89, 57.86, 57.22, 57.49, 57.58, 59.33, 60.38, 63.31, 64.06, 63.1, 62.53, 62.16, 56.98, 57.54, 60.43, 58.89, 60.22, 63.66, 60.92, 58.66, 59.52, 60.85, 60.32, 61.55, 64.29, 66.34, 67.85, 71.96, 73.5, 75.88, 73.84, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 76.12, 74.73, 79.4, 76.34, 71.31, 71.59, 71.48, 75.87, 72.77] },
      velocityScore: { '1D': -2.9, '1W': -2.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$89B', pe: 31.9, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.82,
      etfPresence: { POW: false, VOLT: 1.46, PBD: false, PBW: false, IVEP: 3.66 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'JCI', name: 'JOHNSON CONTROLS INTERNATIONAL PLC', easyScore: 2, avgWeight: 2.51, proScore: 1, coverage: 0.4,
      price: 144.8, weeklyPrices: [145.49, 138.40, 140.47, 146.11, 144.80], weeklyChange: -0.47, dayChange: -0.9, sortRank: 0, periodReturns: { '1M': 8.1, 'YTD': 20.9, '6M': 20.9, '1Y': 37.8 },
      priceHistory: { '1D': [146.11, 144.39, 146.72, 146.57, 146.28, 146.83, 147.52, 148.23, 148.44, 148.91, 150.46, 149.41, 148.54, 148.18, 147.53, 148.07, 147.69, 147.32, 145.6, 146.25, 146.15, 145.31, 145.21, 144.8], '1W': [145.49, 138.4, 140.47, 146.11, 144.8], '1M': [133.91, 141.99, 146.96, 147.4, 143.65, 144.05, 147.75, 139.36, 144.01, 144.96, 145.17, 143.62, 144.82, 148.21, 141.28, 142.81, 145.49, 138.4, 140.47, 146.11, 144.8], 'YTD': [119.75, 111.29, 112.95, 113.59, 119.26, 137.65, 139.24, 142.83, 145.46, 133.09, 131.69, 133.27, 126.58, 133.75, 142.82, 140.98, 143.38, 144.4, 141.78, 137.31, 140.22, 141.99, 147.75, 145.17, 142.81, 144.8], '6M': [122.31, 110.85, 114.61, 115.07, 122.98, 139, 142.21, 142.83, 145.46, 133.09, 131.69, 133.27, 126.58, 133.15, 142.05, 139.72, 141.59, 144.82, 141.04, 137.31, 140.22, 141.99, 147.75, 145.17, 142.81, 144.8], '1Y': [105.07, 106.33, 108.95, 110.02, 105, 104.31, 105.77, 106, 109.27, 107.09, 107.82, 108.48, 105.77, 108.66, 107.76, 109.37, 108.54, 113.34, 120.86, 122.66, 114.42, 116.29, 114.2, 118.06, 117.74, 122.06, 122.31, 110.85, 114.61, 115.07, 122.98, 139, 142.21, 144.71, 139.58, 133.94, 131.69, 133.27, 126.58, 133.15, 142.05, 139.72, 141.59, 144.82, 141.04, 135.42, 140.22, 141.99, 147.75, 145.17, 142.81, 144.8] },
      velocityScore: { '1D': 2, '1W': 3.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$88B', pe: 44.3, revenueGrowth: 8, eps: 3.27, grossMargin: 37, dividendYield: 1.1,
      etfPresence: { POW: false, VOLT: 1.39, PBD: false, PBW: false, IVEP: 3.63 },
      tonyNote: 'JOHNSON CONTROLS INTERNATIONAL PLC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VST', name: 'Vistra Corp', easyScore: 2, avgWeight: 2.29, proScore: 0.91, coverage: 0.4,
      price: 153.16, weeklyPrices: [167.77, 163.49, 162.38, 158.63, 153.16], weeklyChange: -8.71, dayChange: -3.45, sortRank: 0, periodReturns: { '1M': -1, 'YTD': -5.1, '6M': -5.1, '1Y': -18.1 },
      priceHistory: { '1D': [158.63, 155.38, 155.65, 156.33, 155.5, 153.4, 153.62, 152.88, 151.45, 152.83, 152.25, 151.62, 152.87, 152.54, 152.85, 152.97, 153.46, 153.04, 153.16, 152.56, 152.62, 153.34, 152.96, 153.16], '1W': [167.77, 163.49, 162.38, 158.63, 153.16], '1M': [154.76, 157.97, 153.8, 153.7, 148.76, 146.9, 146.22, 138.54, 146.38, 148.02, 158.61, 158.83, 163.75, 167.26, 162.39, 162.87, 167.77, 163.49, 162.38, 158.63, 153.16], 'YTD': [161.33, 150.6, 180.18, 160.12, 158.35, 149.65, 171.49, 167.8, 165.99, 163.62, 161.99, 151.29, 147.54, 151.59, 158.2, 159.6, 166.58, 160.85, 152.05, 136.75, 164.56, 157.97, 146.22, 158.61, 162.87, 153.16], '6M': [165.23, 166.37, 166.6, 158.81, 154.26, 152.97, 173.68, 167.8, 165.99, 163.62, 161.99, 151.29, 147.54, 153.68, 163.97, 154.91, 161.12, 160.38, 146.87, 136.75, 164.56, 157.97, 146.22, 158.61, 162.87, 153.16], '1Y': [187.02, 195.78, 182, 196.24, 208.54, 205.59, 205.28, 192.91, 194.6, 189.73, 204.05, 210.16, 201.62, 202.65, 210, 210.4, 185.83, 199.37, 189.39, 178.27, 179.14, 176.8, 176.07, 174.6, 166.17, 161.67, 165.23, 166.37, 166.6, 158.81, 154.26, 152.97, 173.68, 171.62, 161.7, 164.4, 161.99, 151.29, 147.54, 153.68, 163.97, 154.91, 161.12, 160.38, 146.87, 134.71, 164.56, 157.97, 146.22, 158.61, 162.87, 153.16] },
      velocityScore: { '1D': -4.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$52B', pe: 25.6, revenueGrowth: 43, eps: 5.98, grossMargin: 39, dividendYield: 0.58,
      etfPresence: { POW: 1.37, VOLT: false, PBD: false, PBW: false, IVEP: 3.2 },
      tonyNote: 'Vistra Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CEG', name: 'Constellation Energy Corp', easyScore: 2, avgWeight: 2.16, proScore: 0.86, coverage: 0.4,
      price: 236.5, weeklyPrices: [268.69, 264.02, 259.32, 248.37, 236.50], weeklyChange: -11.98, dayChange: -4.78, sortRank: 0, periodReturns: { '1M': -11, 'YTD': -33.1, '6M': -33.1, '1Y': -22.9 },
      priceHistory: { '1D': [248.37, 242.52, 239.63, 237.76, 234.32, 230.1, 233.36, 233.47, 233.71, 234.93, 234.45, 233.15, 233.49, 232.87, 232.42, 233.99, 234.26, 233.04, 233.34, 232.8, 232.43, 232.07, 234.29, 236.5], '1W': [268.69, 264.02, 259.32, 248.37, 236.5], '1M': [265.7, 272.65, 267.24, 264.59, 254.83, 250.67, 251.65, 242.3, 246.71, 253.76, 268, 267.17, 274.06, 275.53, 270.26, 267.97, 268.69, 264.02, 259.32, 248.37, 236.5], 'YTD': [353.27, 322.54, 341.2, 289.06, 280.68, 261.42, 288.43, 293.8, 327.16, 322.99, 305.58, 289.76, 298.61, 275.16, 291.72, 287.56, 315.17, 321.05, 299.69, 262, 301.57, 272.65, 251.65, 268, 267.97, 236.5], '6M': [366.25, 342.52, 307.71, 285.27, 270.88, 272.15, 303.01, 293.8, 327.16, 322.99, 305.58, 289.76, 298.61, 272.58, 296.61, 277.7, 305.71, 320.42, 293.6, 262, 301.57, 272.65, 251.65, 268, 267.97, 236.5], '1Y': [306.63, 313.62, 308.08, 321.67, 347.84, 336.41, 327.63, 314.21, 315.94, 309.06, 318, 322.71, 326.33, 357.46, 383.23, 396.53, 350.06, 401.43, 363.25, 354.02, 357.48, 359.09, 368.62, 378.6, 361.05, 360.46, 366.25, 342.52, 307.71, 285.27, 270.88, 272.15, 303.01, 312.64, 324.87, 317.09, 305.58, 289.76, 298.61, 272.58, 296.61, 277.7, 305.71, 320.42, 293.6, 260.67, 301.57, 272.65, 251.65, 268, 267.97, 236.5] },
      velocityScore: { '1D': -5.5, '1W': -10.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$84B', pe: 20.6, revenueGrowth: 64, eps: 11.5, grossMargin: 23, dividendYield: 0.69,
      etfPresence: { POW: 1.16, VOLT: false, PBD: false, PBW: false, IVEP: 3.16 },
      tonyNote: 'Constellation Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TLN', name: 'Talen Energy Corp', easyScore: 2, avgWeight: 2.14, proScore: 0.86, coverage: 0.4,
      price: 360.79, weeklyPrices: [416.80, 404.09, 399.34, 384.26, 360.79], weeklyChange: -13.44, dayChange: -6.11, sortRank: 0, periodReturns: { '1M': -4.4, 'YTD': -3.7, '6M': -3.7, '1Y': 30.6 },
      priceHistory: { '1D': [384.26, 379.07, 374.92, 372.86, 369.8, 362.28, 362.06, 362.32, 360.69, 362.87, 363.41, 360.18, 360.21, 361.81, 362.85, 362, 363.86, 363.21, 362.19, 359.31, 359.7, 359.7, 357.77, 360.79], '1W': [416.8, 404.09, 399.34, 384.26, 360.79], '1M': [377.2, 385.51, 379.59, 378.08, 364.74, 364.78, 358.74, 336.59, 344.8, 360.54, 406.51, 409.81, 436.29, 438.12, 411.92, 405.89, 416.8, 404.09, 399.34, 384.26, 360.79], 'YTD': [374.84, 356, 419.07, 366.43, 348.36, 345, 376.7, 367.84, 353.24, 335.11, 317.6, 311.02, 313.03, 324.09, 326.08, 346.26, 369.67, 384.64, 383.44, 324.21, 389, 385.51, 358.74, 406.51, 405.89, 360.79], '6M': [396.73, 370.83, 371.66, 350.41, 340.8, 353.66, 388.28, 367.84, 353.24, 335.11, 317.6, 311.02, 313.03, 330.07, 345.76, 329.74, 361.17, 384.9, 374.61, 324.21, 389, 385.51, 358.74, 406.51, 405.89, 360.79], '1Y': [276.27, 267.62, 264, 339.16, 377.57, 375.58, 380.25, 360.1, 381.5, 380.44, 400.92, 415.25, 410.72, 434.07, 444.5, 418.03, 380.69, 398.55, 403.49, 367.54, 390.51, 392.42, 367.93, 368.82, 371.72, 384.52, 396.73, 370.83, 371.66, 350.41, 340.8, 353.66, 388.28, 375.24, 341.39, 331.58, 317.6, 311.02, 313.03, 330.07, 345.76, 329.74, 361.17, 384.9, 374.61, 314.57, 389, 385.51, 358.74, 406.51, 405.89, 360.79] },
      velocityScore: { '1D': -4.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$17B', pe: null, revenueGrowth: 97, eps: -0.54, grossMargin: 40, dividendYield: null,
      etfPresence: { POW: 1.59, VOLT: false, PBD: false, PBW: false, IVEP: 2.69 },
      tonyNote: 'Talen Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX TECHNOLOGIES INC', easyScore: 2, avgWeight: 2.04, proScore: 0.82, coverage: 0.4,
      price: 191.25, weeklyPrices: [204.77, 197.91, 189.25, 194.65, 191.25], weeklyChange: -6.6, dayChange: -1.75, sortRank: 0, periodReturns: { '1M': 1.5, 'YTD': 10.7, '6M': 10.7, '1Y': 35.9 },
      priceHistory: { '1D': [194.65, 192.49, 193.34, 194.53, 192.59, 192.39, 192.96, 193.92, 194.29, 193.79, 193.89, 193.15, 192.14, 193.06, 193.42, 192.57, 193.45, 192.5, 192.53, 192.43, 192.35, 192.38, 192.27, 191.25], '1W': [204.77, 197.91, 189.25, 194.65, 191.25], '1M': [188.39, 187.26, 184.72, 190.76, 185.95, 187.46, 188.96, 183, 194.68, 193.45, 196.93, 203.07, 205.4, 210, 209.89, 205.65, 204.77, 197.91, 189.25, 194.65, 191.25], 'YTD': [172.84, 193.2, 213.25, 207.75, 205.43, 197.19, 200.4, 198.38, 216.47, 200.39, 204.67, 204.85, 191.59, 215.98, 232.83, 228.24, 222.07, 216.68, 210.8, 201.94, 204.38, 187.26, 188.96, 196.93, 205.65, 191.25], '6M': [181.85, 201.46, 217.89, 206.04, 206.04, 203, 201.09, 198.38, 216.47, 200.39, 204.67, 204.85, 191.59, 214.44, 238.27, 216.66, 216.18, 206.15, 206.83, 201.94, 204.38, 187.26, 188.96, 196.93, 205.65, 191.25], '1Y': [140.77, 136.45, 142.34, 143.84, 151.93, 179.53, 176.76, 163.56, 165.6, 163.79, 170.1, 174.03, 176.21, 185.7, 195.6, 209.01, 191.17, 213.69, 198.12, 196.77, 179.81, 178.18, 178.33, 183.38, 170.75, 175.88, 181.85, 201.46, 217.89, 206.04, 206.04, 203, 201.09, 204.23, 205.83, 195.91, 204.67, 204.85, 191.59, 214.44, 238.27, 216.66, 216.18, 206.15, 206.83, 197.33, 204.38, 187.26, 188.96, 196.93, 205.65, 191.25] },
      velocityScore: { '1D': null, '1W': -7.9, '1M': null, '6M': null }, isNew: true,
      marketCap: '$18B', pe: 50.9, revenueGrowth: 26, eps: 3.76, grossMargin: 23, dividendYield: 0.53,
      etfPresence: { POW: false, VOLT: 1.96, PBD: false, PBW: false, IVEP: 2.12 },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 5.25, proScore: 2.1, coverage: 0.4,
      price: 991.41, weeklyPrices: [1057.01, 997.47, 1033.19, 1064.90, 991.41], weeklyChange: -6.21, dayChange: -6.9, sortRank: 0, periodReturns: { '1M': 14.6, 'YTD': 73.1, '6M': 73.1, '1Y': 148.8 },
      priceHistory: { '1D': [1064.9, 1022.24, 1031.71, 1021.02, 1012.98, 1010.33, 1003, 1014.44, 1020.3, 1017.48, 1017.65, 1010.6, 1005.59, 1000.39, 1000.11, 996.68, 995.43, 990.47, 985.88, 987.52, 992.64, 994.31, 994.72, 991.41], '1W': [1057.01, 997.47, 1033.19, 1064.9, 991.41], '1M': [865.36, 909.81, 926.18, 940.48, 904.28, 915.64, 914.7, 856.16, 897.63, 910.57, 945.46, 955.92, 985.82, 1022.28, 984.24, 994.45, 1057.01, 997.47, 1033.19, 1064.9, 991.41], 'YTD': [572.87, 608.13, 647.18, 626.62, 657.36, 726.2, 774.2, 756.47, 752.32, 704.82, 699.78, 701.7, 667.43, 721.24, 791.73, 798.4, 828.79, 874.78, 926.79, 863.95, 908.55, 909.81, 914.7, 945.46, 994.45, 991.41], '6M': [598.41, 617.62, 646.89, 635.92, 690.91, 742.12, 764.76, 756.47, 752.32, 704.82, 699.78, 701.7, 667.43, 724.44, 794.25, 800.45, 817.87, 904.59, 912.14, 863.95, 908.55, 909.81, 914.7, 945.46, 994.45, 991.41], '1Y': [398.43, 408.33, 418.07, 429.52, 438.02, 417.12, 413.7, 420.59, 432.67, 420.22, 431.38, 466.96, 463.72, 490.57, 500.36, 540.96, 513.91, 585.49, 569.15, 573.02, 553.11, 573.73, 599.15, 625.61, 565.83, 583, 598.41, 617.62, 646.89, 635.92, 690.91, 742.12, 764.76, 768.23, 722.18, 716.68, 699.78, 701.7, 667.43, 724.44, 794.25, 800.45, 817.87, 904.59, 912.14, 860.15, 908.55, 909.81, 914.7, 945.46, 994.45, 991.41] },
      velocityScore: { '1D': 0.5, '1W': 1.9, '1M': -32, '6M': null }, isNew: false,
      marketCap: '$457B', pe: 49.3, revenueGrowth: 22, eps: 20.13, grossMargin: 29, dividendYield: 0.61,
      etfPresence: { AIRR: false, PRN: 3.61, RSHO: 6.89, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 5.06, proScore: 2.02, coverage: 0.4,
      price: 776.55, weeklyPrices: [881.92, 804.76, 813.77, 839.36, 776.55], weeklyChange: -11.95, dayChange: -7.48, sortRank: 0, periodReturns: { '1M': -8.1, 'YTD': 153.6, '6M': 153.6, '1Y': 239.5 },
      priceHistory: { '1D': [839.36, 784.48, 795.8, 795.72, 787.03, 786.8, 791.34, 796.24, 800, 796.55, 795.78, 794.13, 790.15, 783.62, 784.89, 782.11, 781.83, 781.29, 775.34, 773.08, 781.61, 776.98, 775.16, 776.55], '1W': [881.92, 804.76, 813.77, 839.36, 776.55], '1M': [845.39, 875.52, 957.03, 993.74, 882.43, 891.86, 842.01, 770.25, 838.55, 858.99, 857.76, 838.21, 861.88, 932.75, 892.25, 867.23, 881.92, 804.76, 813.77, 839.36, 776.55], 'YTD': [306.23, 297.62, 336.31, 351.39, 357.91, 401.29, 437.77, 434.64, 432.87, 411.38, 417.76, 422.55, 382.55, 393.71, 459.02, 472.9, 505.45, 529.49, 868.18, 770.76, 783.53, 875.52, 842.01, 857.76, 867.23, 776.55], '6M': [319.16, 308.13, 350.96, 361.21, 367.95, 418.61, 421.2, 434.64, 432.87, 411.38, 417.76, 422.55, 382.55, 382.22, 464.54, 472.84, 471.85, 806, 851.35, 770.76, 783.53, 875.52, 842.01, 857.76, 867.23, 776.55], '1Y': [228.72, 236.29, 250.69, 252.68, 267.59, 299.64, 292.47, 274.89, 289.36, 288.68, 316.16, 348.58, 338.44, 351.66, 355.53, 361.02, 332.75, 403.35, 411.07, 380.7, 334.17, 339.75, 332.29, 340.51, 302.3, 316.55, 319.16, 308.13, 350.96, 361.21, 367.95, 418.61, 421.2, 459.72, 415.51, 411.53, 417.76, 422.55, 382.55, 382.22, 464.54, 472.84, 471.85, 806, 851.35, 728.29, 783.53, 875.52, 842.01, 857.76, 867.23, 776.55] },
      velocityScore: { '1D': 1.5, '1W': -8.6, '1M': -40.8, '6M': null }, isNew: false,
      marketCap: '$24B', pe: 69.6, revenueGrowth: 92, eps: 11.16, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 6, PRN: 4.12, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 4.91, proScore: 1.96, coverage: 0.4,
      price: 264.86, weeklyPrices: [309.20, 279.77, 281.09, 286.36, 264.86], weeklyChange: -14.34, dayChange: -7.51, sortRank: 0, periodReturns: { '1M': -8.1, 'YTD': 149.3, '6M': 149.3, '1Y': 263.6 },
      priceHistory: { '1D': [286.36, 266.74, 267.73, 269.42, 266.71, 267.85, 270.39, 272.42, 276.04, 272.57, 273.4, 272.42, 270.08, 268.1, 266.73, 266.47, 264.51, 265.25, 263.74, 263.98, 268.24, 266.95, 266.11, 264.86], '1W': [309.2, 279.77, 281.09, 286.36, 264.86], '1M': [288.12, 299.07, 299.73, 300.06, 284.87, 293.6, 283.51, 262.34, 290.5, 294.75, 292.7, 294.03, 297.2, 307.8, 291.5, 294.49, 309.2, 279.77, 281.09, 286.36, 264.86], 'YTD': [106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 181.38, 177.5, 173.36, 170.61, 180.86, 167.52, 186.72, 228.99, 241.65, 260.52, 269.95, 322.05, 266.8, 291.97, 299.07, 283.51, 292.7, 294.49, 264.86], '6M': [117.51, 121.83, 139.99, 141.15, 146.79, 187.3, 187.21, 181.38, 177.5, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 266.8, 291.97, 299.07, 283.51, 292.7, 294.49, 264.86], '1Y': [72.84, 70.96, 78.84, 80.05, 79.03, 77.8, 86.57, 82.17, 91.46, 90.24, 97.47, 101.43, 94.58, 102.51, 103.18, 112.77, 110.96, 136.12, 131.92, 118.74, 95.1, 107.26, 112.31, 120.91, 109.59, 113.62, 117.51, 121.83, 139.99, 141.15, 146.79, 187.3, 187.21, 186.39, 170.37, 176.51, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 261.58, 291.97, 299.07, 283.51, 292.7, 294.49, 264.86] },
      velocityScore: { '1D': 0, '1W': -1.5, '1M': -40.8, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 51.6, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { AIRR: 2.48, PRN: false, RSHO: 7.33, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, avgWeight: 4.82, proScore: 1.93, coverage: 0.4,
      price: 764.56, weeklyPrices: [753.07, 765.46, 791.56, 798.55, 764.56], weeklyChange: 1.53, dayChange: -4.26, sortRank: 0, periodReturns: { '1M': 18.2, 'YTD': 144, '6M': 144, '1Y': 270.9 },
      priceHistory: { '1D': [798.55, 756.24, 771.88, 768.74, 757.67, 758.73, 766.42, 771.34, 779.99, 770.32, 767.49, 765.91, 762.99, 766.03, 771.41, 765.92, 761.28, 760.98, 759.22, 757.41, 766.02, 765.96, 772.05, 764.56], '1W': [753.07, 765.46, 791.56, 798.55, 764.56], '1M': [646.89, 663.14, 686.37, 689.43, 694.72, 619.98, 613.93, 588.9, 623.66, 641.68, 690.39, 719.52, 738.85, 790, 736.77, 732.24, 753.07, 765.46, 791.56, 798.55, 764.56], 'YTD': [313.32, 313.98, 329.66, 363.88, 347.11, 352.09, 409.95, 441.71, 445.36, 466.38, 466.52, 463.15, 513.98, 572.31, 598.44, 611.21, 660.85, 697.15, 683.52, 664.76, 670.66, 663.14, 613.93, 690.39, 732.24, 764.56], '6M': [325.96, 311.87, 383.66, 353.5, 355.77, 370, 406.88, 441.71, 445.36, 466.38, 466.52, 463.15, 513.98, 576.95, 603.91, 615.42, 630.7, 720, 681.01, 664.76, 670.66, 663.14, 613.93, 690.39, 732.24, 764.56], '1Y': [206.15, 208.46, 203.84, 224.37, 244.98, 235, 229.52, 215.89, 226.87, 237.83, 232.59, 259.58, 258.17, 271.34, 270.09, 296.39, 267.62, 292.22, 324.93, 364.78, 358.72, 380.62, 356.39, 330.6, 313.9, 325.14, 325.96, 311.87, 383.66, 353.5, 355.77, 370, 406.88, 447.6, 438.93, 458.71, 466.52, 463.15, 513.98, 576.95, 603.91, 615.42, 630.7, 720, 681.01, 639.58, 670.66, 663.14, 613.93, 690.39, 732.24, 764.56] },
      velocityScore: { '1D': -0.5, '1W': 5.5, '1M': -26.9, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 66.9, revenueGrowth: 50, eps: 11.42, grossMargin: 21, dividendYield: 0.25,
      etfPresence: { AIRR: 4.73, PRN: 4.9, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Argan Inc is an engineering and construction company for power generation facilities — natural gas and renewable power plants. It appears in Industrials ETFs because power plant construction is one of the fastest-growing categories in U.S. infrastructure spending, driven by data center load additions that the grid cannot currently support.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.55, proScore: 1.82, coverage: 0.4,
      price: 1865.15, weeklyPrices: [2017.57, 1854.23, 1948.69, 1981.95, 1865.15], weeklyChange: -7.55, dayChange: -5.89, sortRank: 0, periodReturns: { '1M': 4.3, 'YTD': 99.8, '6M': 99.8, '1Y': 252 },
      priceHistory: { '1D': [1981.95, 1895, 1893.52, 1901.38, 1875.71, 1874.73, 1876.09, 1882.45, 1898, 1884.27, 1888.5, 1884.33, 1875.64, 1874.86, 1869.12, 1865.85, 1864.51, 1863.64, 1861.49, 1857.43, 1874.24, 1874.24, 1869.99, 1865.15], '1W': [2017.57, 1854.23, 1948.69, 1981.95, 1865.15], '1M': [1787.88, 1883.26, 1850.04, 1914.65, 1843.94, 1852.03, 1831.56, 1719.48, 1843.42, 1877.61, 1913.94, 1931.77, 1967.41, 2066.51, 1908.07, 1954.47, 2017.57, 1854.23, 1948.69, 1981.95, 1865.15], 'YTD': [933.29, 971.49, 1091.04, 1121.44, 1142.1, 1230.26, 1337.95, 1413.57, 1438.24, 1372.4, 1414.1, 1408.25, 1273.18, 1434.09, 1627.81, 1680.09, 1794.04, 1891.95, 2032.98, 1854.43, 1883.56, 1883.26, 1831.56, 1913.94, 1954.47, 1865.15], '6M': [1003.64, 1010.41, 1119.98, 1127.55, 1176.26, 1283.65, 1337.75, 1413.57, 1438.24, 1372.4, 1414.1, 1408.25, 1273.18, 1424.91, 1650.48, 1674.16, 1719.21, 1967.24, 2016.31, 1854.43, 1883.56, 1883.26, 1831.56, 1913.94, 1954.47, 1865.15], '1Y': [529.9, 533.77, 550.5, 562.83, 703.3, 694.43, 702.1, 681.08, 709.83, 723.95, 764.91, 799.38, 781.88, 832.98, 834.7, 838.78, 790.72, 1010.64, 987.78, 973.18, 930.5, 970.95, 1004.65, 1024.92, 918.54, 963.83, 1003.64, 1010.41, 1119.98, 1127.55, 1176.26, 1283.65, 1337.75, 1468.58, 1391.16, 1383.62, 1414.1, 1408.25, 1273.18, 1424.91, 1650.48, 1674.16, 1719.21, 1967.24, 2016.31, 1825.5, 1883.56, 1883.26, 1831.56, 1913.94, 1954.47, 1865.15] },
      velocityScore: { '1D': 0, '1W': 0.6, '1M': -34.1, '6M': null }, isNew: false,
      marketCap: '$66B', pe: 53.8, revenueGrowth: 1, eps: 34.68, grossMargin: 25, dividendYield: 0.13,
      etfPresence: { AIRR: 4.41, PRN: 4.7, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.92, proScore: 1.57, coverage: 0.4,
      price: 332.08, weeklyPrices: [343.54, 337.08, 334.16, 338.15, 332.08], weeklyChange: -3.34, dayChange: -1.8, sortRank: 0, periodReturns: { '1M': 10.3, 'YTD': 29.3, '6M': 29.3, '1Y': 35.4 },
      priceHistory: { '1D': [338.15, 334.61, 337.92, 336.76, 335.23, 336.06, 335.71, 335.66, 336.2, 336.85, 336.4, 336.24, 335.85, 335.21, 335.01, 334.4, 333.98, 333.59, 333.5, 333.33, 333.3, 332.95, 333.37, 332.08], '1W': [343.54, 337.08, 334.16, 338.15, 332.08], '1M': [300.98, 308.31, 313.39, 313.67, 315.29, 314.42, 322.81, 314.08, 318.89, 320.11, 324.38, 329.89, 337.96, 338.07, 330.9, 333.78, 343.54, 337.08, 334.16, 338.15, 332.08], 'YTD': [256.77, 264.62, 282.47, 280.14, 260.41, 291.74, 279.84, 278.74, 283.54, 267.57, 256.83, 262.23, 258.01, 269.55, 293.26, 293.92, 298.1, 303.99, 310.55, 305.22, 311.33, 308.31, 322.81, 324.38, 333.78, 332.08], '6M': [259.63, 272.25, 281.21, 281.54, 270.02, 282.45, 278.31, 278.74, 283.54, 267.57, 256.83, 262.23, 258.01, 272.54, 292.01, 293.59, 301.24, 305.48, 313.7, 305.22, 311.33, 308.31, 322.81, 324.38, 333.78, 332.08], '1Y': [245.19, 255.95, 261.93, 268.07, 271.5, 263.43, 275.72, 262.46, 268.4, 267.96, 269.68, 262.77, 259.1, 259.16, 251.03, 244.84, 253.5, 254.1, 257.9, 256.26, 243.79, 257.32, 258.83, 262.84, 259.48, 264.78, 259.63, 272.25, 281.21, 281.54, 270.02, 282.45, 278.31, 282.27, 277.7, 264.31, 256.83, 262.23, 258.01, 272.54, 292.01, 293.59, 301.24, 305.48, 313.7, 302.64, 311.33, 308.31, 322.81, 324.38, 333.78, 332.08] },
      velocityScore: { '1D': 0, '1W': 0, '1M': -26.6, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 31.4, revenueGrowth: 7, eps: 10.58, grossMargin: 30, dividendYield: 0.6,
      etfPresence: { AIRR: 1.8, PRN: false, RSHO: 6.04, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 2.82, proScore: 1.13, coverage: 0.4,
      price: 231.72, weeklyPrices: [244.56, 231.87, 238.21, 245.17, 231.72], weeklyChange: -5.25, dayChange: -5.49, sortRank: 0, periodReturns: { '1M': 4.9, 'YTD': 15.8, '6M': 15.8, '1Y': 34.3 },
      priceHistory: { '1D': [245.17, 236.88, 241.37, 240.16, 240.67, 239.43, 239.17, 239.16, 239.76, 239.2, 238.84, 237.89, 237.16, 235.36, 235.02, 234.49, 234.4, 233.48, 233.04, 232.95, 233.11, 233.28, 232.26, 231.72], '1W': [244.56, 231.87, 238.21, 245.17, 231.72], '1M': [220.92, 230.08, 234.08, 236.14, 227.8, 229.95, 228.01, 223.63, 233.49, 230.05, 234.8, 235.29, 242.97, 246.41, 236.07, 237.22, 244.56, 231.87, 238.21, 245.17, 231.72], 'YTD': [200.06, 207.44, 213.61, 211.03, 208.41, 222.32, 239, 237.18, 225.02, 209.8, 203.42, 194.52, 190.71, 196.9, 221.27, 217.61, 222.45, 201.12, 203.24, 200.47, 219.08, 230.08, 228.01, 234.8, 237.22, 231.72], '6M': [203.26, 207.51, 217.65, 215.21, 212.73, 223.86, 241.6, 237.18, 225.02, 209.8, 203.42, 194.52, 190.71, 195.43, 224.82, 216.49, 216.36, 207.81, 198.99, 200.47, 219.08, 230.08, 228.01, 234.8, 237.22, 231.72], '1Y': [172.55, 173.08, 180.12, 175.41, 182.39, 204.31, 191.88, 186.26, 192.47, 186.63, 190.25, 190.48, 182.95, 187.73, 185.97, 182.92, 187.4, 200, 223.06, 219.09, 205.32, 215.87, 208.24, 224.76, 210.34, 208.48, 203.26, 207.51, 217.65, 215.21, 212.73, 223.86, 241.6, 243.04, 219.58, 210.96, 203.42, 194.52, 190.71, 195.43, 224.82, 216.49, 216.36, 207.81, 198.99, 195.79, 219.08, 230.08, 228.01, 234.8, 237.22, 231.72] },
      velocityScore: { '1D': 0.9, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 44.4, revenueGrowth: 17, eps: 5.22, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.68, PRN: false, RSHO: 3.96, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 2, avgWeight: 2.33, proScore: 0.93, coverage: 0.4,
      price: 191.25, weeklyPrices: [204.77, 197.91, 189.25, 194.65, 191.25], weeklyChange: -6.6, dayChange: -1.75, sortRank: 0, periodReturns: { '1M': 1.5, 'YTD': 10.7, '6M': 10.7, '1Y': 35.9 },
      priceHistory: { '1D': [194.65, 192.49, 193.34, 194.53, 192.59, 192.39, 192.96, 193.92, 194.29, 193.79, 193.89, 193.15, 192.14, 193.06, 193.42, 192.57, 193.45, 192.5, 192.53, 192.43, 192.35, 192.38, 192.27, 191.25], '1W': [204.77, 197.91, 189.25, 194.65, 191.25], '1M': [188.39, 187.26, 184.72, 190.76, 185.95, 187.46, 188.96, 183, 194.68, 193.45, 196.93, 203.07, 205.4, 210, 209.89, 205.65, 204.77, 197.91, 189.25, 194.65, 191.25], 'YTD': [172.84, 193.2, 213.25, 207.75, 205.43, 197.19, 200.4, 198.38, 216.47, 200.39, 204.67, 204.85, 191.59, 215.98, 232.83, 228.24, 222.07, 216.68, 210.8, 201.94, 204.38, 187.26, 188.96, 196.93, 205.65, 191.25], '6M': [181.85, 201.46, 217.89, 206.04, 206.04, 203, 201.09, 198.38, 216.47, 200.39, 204.67, 204.85, 191.59, 214.44, 238.27, 216.66, 216.18, 206.15, 206.83, 201.94, 204.38, 187.26, 188.96, 196.93, 205.65, 191.25], '1Y': [140.77, 136.45, 142.34, 143.84, 151.93, 179.53, 176.76, 163.56, 165.6, 163.79, 170.1, 174.03, 176.21, 185.7, 195.6, 209.01, 191.17, 213.69, 198.12, 196.77, 179.81, 178.18, 178.33, 183.38, 170.75, 175.88, 181.85, 201.46, 217.89, 206.04, 206.04, 203, 201.09, 204.23, 205.83, 195.91, 204.67, 204.85, 191.59, 214.44, 238.27, 216.66, 216.18, 206.15, 206.83, 197.33, 204.38, 187.26, 188.96, 196.93, 205.65, 191.25] },
      velocityScore: { '1D': 1.1, '1W': -9.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: 50.9, revenueGrowth: 26, eps: 3.76, grossMargin: 23, dividendYield: 0.53,
      etfPresence: { AIRR: 2.97, PRN: false, RSHO: false, IDEF: 1.69, BILT: false },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'PL', name: 'Planet Labs PBC', easyScore: 2, avgWeight: 1.77, proScore: 0.71, coverage: 0.4,
      price: 31.61, weeklyPrices: [26.51, 27.07, 31.28, 33.13, 31.61], weeklyChange: 19.24, dayChange: -4.59, sortRank: 0, periodReturns: { '1M': -32, 'YTD': 60.3, '6M': 60.3, '1Y': 414.8 },
      priceHistory: { '1D': [33.13, 33.24, 33.24, 33.78, 33.05, 32.72, 33.49, 34.01, 33.97, 33.92, 34.12, 34.02, 33.91, 33.64, 33.57, 33.31, 33.13, 33.13, 32.96, 32.65, 32.55, 32.43, 31.87, 31.61], '1W': [26.51, 27.07, 31.28, 33.13, 31.61], '1M': [46.46, 48.09, 43.13, 43.53, 32.22, 32.74, 31.17, 30.72, 34.17, 31.15, 28.21, 28.22, 28.23, 28.77, 28.53, 26.3, 26.51, 27.07, 31.28, 33.13, 31.61], 'YTD': [19.72, 22.44, 28.28, 26.94, 24.97, 22.26, 22.42, 23.78, 26.36, 25.82, 24.6, 33.82, 27.89, 35.02, 34.32, 37.5, 35.45, 38.54, 41.84, 41.61, 48.32, 48.09, 31.17, 28.21, 26.3, 31.61], '6M': [20.41, 22.71, 28.78, 25.87, 22.85, 24.02, 22.21, 23.78, 26.36, 25.82, 24.6, 33.82, 27.89, 35.17, 33.93, 38.03, 35.03, 37.13, 40.68, 41.61, 48.32, 48.09, 31.17, 28.21, 26.3, 31.61], '1Y': [6.14, 6.6, 6.63, 6.84, 6.25, 6.27, 6.74, 6.43, 7.08, 6.46, 9.67, 10.61, 11.96, 14.85, 15.66, 13.23, 12.5, 12.9, 13.25, 12.44, 11.79, 11.72, 12.94, 17.47, 17.49, 19.36, 20.41, 22.71, 28.78, 25.87, 22.85, 24.02, 22.21, 24.71, 25.3, 25.4, 24.6, 33.82, 27.89, 35.17, 33.93, 38.03, 35.03, 37.13, 40.68, 41.59, 48.32, 48.09, 31.17, 28.21, 26.3, 31.61] },
      velocityScore: { '1D': null, '1W': null, '1M': -70, '6M': null }, isNew: true,
      marketCap: '$11B', pe: null, revenueGrowth: 42, eps: -1.16, grossMargin: 56, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 3.38, RSHO: false, IDEF: 0.17, BILT: false },
      tonyNote: 'Planet Labs is a satellite earth observation company. It holds a speculative position in Industrials ETFs as a data infrastructure name — providing satellite imagery and analytics that support agricultural, energy, and government decision-making. Revenue is growing from a small base; the ETF weight is minimal and the position is thematic.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 2, avgWeight: 1.73, proScore: 0.69, coverage: 0.4,
      price: 278.97, weeklyPrices: [279.09, 281.99, 277.39, 279.89, 278.97], weeklyChange: -0.04, dayChange: -0.33, sortRank: 0, periodReturns: { '1M': -5.9, 'YTD': -18, '6M': -18, '1Y': 11.5 },
      priceHistory: { '1D': [279.89, 283.77, 283.47, 284.39, 283.44, 282.03, 281.52, 282.59, 281.64, 281.77, 281.8, 281.88, 281.08, 280.68, 280.26, 279.19, 279.7, 279.53, 279.98, 279.4, 279.04, 279.43, 278.86, 278.97], '1W': [279.09, 281.99, 277.39, 279.89, 278.97], '1M': [296.41, 293.66, 287.54, 294.53, 293.04, 292.26, 297.52, 289.13, 300.95, 297.68, 298.51, 296.89, 285.43, 278.19, 283.48, 279.62, 279.09, 281.99, 277.39, 279.89, 278.97], 'YTD': [340.07, 378.47, 418.86, 418.58, 420.51, 397.77, 418.78, 438.01, 453.73, 429.58, 416.59, 396.57, 369.08, 407.66, 394.46, 392.19, 358.4, 363.37, 317.75, 329.35, 320.95, 293.66, 297.52, 298.51, 279.62, 278.97], '6M': [349.75, 386.99, 425.9, 413.56, 420.3, 405.82, 417.83, 438.01, 453.73, 429.58, 416.59, 396.57, 369.08, 402.28, 398.07, 378.21, 361.4, 326.13, 333.56, 329.35, 320.95, 293.66, 297.52, 298.51, 279.62, 278.97], '1Y': [250.15, 258.11, 255.35, 263.33, 278.86, 266.45, 269.43, 267.09, 276.39, 269.98, 276.07, 274.69, 271.25, 282.22, 286.14, 282.66, 283.64, 298.42, 306.68, 317.89, 309.74, 314.31, 315.88, 326.72, 322.63, 351.13, 349.75, 386.99, 425.9, 413.56, 420.3, 405.82, 417.83, 447.73, 440.33, 417.51, 416.59, 396.57, 369.08, 402.28, 398.07, 378.21, 361.4, 326.13, 333.56, 324.6, 320.95, 293.66, 297.52, 298.51, 279.62, 278.97] },
      velocityScore: { '1D': -1.4, '1W': -4.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 18.1, revenueGrowth: 13, eps: 15.39, grossMargin: 12, dividendYield: 1.97,
      etfPresence: { AIRR: 2.44, PRN: false, RSHO: false, IDEF: 1.03, BILT: false },
      tonyNote: 'Huntington Ingalls Industries is the only builder of nuclear-powered aircraft carriers for the U.S. Navy. Revenue is government-contracted and predictable; the ETF allocation in Industrials reflects defense spending growth and the Navy\'s backlog of nuclear submarine and carrier construction. A steady-state quality compounder in a market structure with no competition.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 2, avgWeight: 1.68, proScore: 0.67, coverage: 0.4,
      price: 53.04, weeklyPrices: [46.32, 47.21, 46.95, 49.86, 53.04], weeklyChange: 14.51, dayChange: 6.38, sortRank: 0, periodReturns: { '1M': -16.5, 'YTD': -30.1, '6M': -30.1, '1Y': 22.6 },
      priceHistory: { '1D': [49.86, 50.9, 53.16, 54.05, 52.42, 52.19, 53.42, 53.7, 53.75, 53.59, 53.78, 53.62, 53.42, 53.01, 53.04, 52.6, 52.53, 52.37, 52.78, 52.63, 52.86, 53.57, 53.08, 53.04], '1W': [46.32, 47.21, 46.95, 49.86, 53.04], '1M': [63.49, 63.27, 58.43, 63.4, 58.52, 57.73, 56.19, 54.82, 58.78, 57.75, 56.34, 56.16, 54.21, 51.09, 50.8, 47.95, 46.32, 47.21, 46.95, 49.86, 53.04], 'YTD': [75.91, 104.04, 124.56, 110.39, 103.01, 94.41, 89.06, 94.31, 90.72, 92.47, 89.53, 83.69, 65.28, 74.09, 73.55, 69.83, 63.16, 61.93, 56.99, 54.22, 56.8, 63.27, 56.19, 56.34, 47.95, 53.04], '6M': [79.29, 113.7, 130.72, 111.32, 96.16, 98.81, 91.97, 94.31, 90.72, 92.47, 89.53, 83.69, 65.28, 71.96, 73.66, 68.55, 61.66, 59.31, 57.33, 54.22, 56.8, 63.27, 56.19, 56.34, 47.95, 53.04], '1Y': [43.28, 46.27, 58.91, 58.66, 58.7, 59.08, 68.75, 64.27, 67.92, 63.59, 67.67, 80.65, 84.2, 95.03, 98.55, 88.62, 84.3, 91.21, 77.41, 76.7, 70.67, 75.77, 77.68, 78.78, 71.4, 77.7, 79.29, 113.7, 130.72, 111.32, 96.16, 98.81, 91.97, 90.68, 88.95, 88.96, 89.53, 83.69, 65.28, 71.96, 73.66, 68.55, 61.66, 59.31, 57.33, 53.47, 56.8, 63.27, 56.19, 56.34, 47.95, 53.04] },
      velocityScore: { '1D': 3.1, '1W': -5.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 312, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.43, PRN: false, RSHO: false, IDEF: 0.93, BILT: false },
      tonyNote: 'Kratos Defense is a defense technology company focused on unmanned systems, satellite communications, and high-performance computing for government customers. It appears in Industrials ETFs as an AI-adjacent defense name — autonomous systems and AI-driven surveillance are direct end markets. Revenue grew and the government contract backlog is expanding.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 1.4, proScore: 0.56, coverage: 0.4,
      price: 72.77, weeklyPrices: [77.53, 77.92, 75.06, 74.34, 72.77], weeklyChange: -6.14, dayChange: -2.11, sortRank: 0, periodReturns: { '1M': 3.9, 'YTD': 21.1, '6M': 21.1, '1Y': 23 },
      priceHistory: { '1D': [74.34, 74.07, 73.61, 72.93, 72.5, 72.63, 72.81, 72.62, 72.71, 72.86, 72.8, 72.91, 72.84, 72.72, 72.85, 72.88, 73.08, 73.06, 72.82, 72.88, 72.87, 72.64, 72.44, 72.77], '1W': [77.53, 77.92, 75.06, 74.34, 72.77], '1M': [70.04, 71.31, 71.66, 72.43, 71.96, 71.59, 71.59, 72.26, 71.62, 72.08, 71.48, 71.25, 73.12, 74.95, 75.79, 75.87, 77.53, 77.92, 75.06, 74.34, 72.77], 'YTD': [60.11, 61.15, 60.29, 64.96, 67.26, 66.92, 72.28, 72.98, 76.26, 73.18, 73.89, 73.6, 72.47, 72.59, 71.54, 70.91, 71.61, 75.41, 74.18, 77.69, 76.34, 71.31, 71.59, 71.48, 75.87, 72.77], '6M': [60.85, 60.32, 61.55, 64.29, 66.34, 67.85, 71.96, 72.98, 76.26, 73.18, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 76.12, 74.73, 77.69, 76.34, 71.31, 71.59, 71.48, 75.87, 72.77], '1Y': [59.14, 57.78, 58.09, 58.75, 59.95, 57.89, 57.86, 57.22, 57.49, 57.58, 59.33, 60.38, 63.31, 64.06, 63.1, 62.53, 62.16, 56.98, 57.54, 60.43, 58.89, 60.22, 63.66, 60.92, 58.66, 59.52, 60.85, 60.32, 61.55, 64.29, 66.34, 67.85, 71.96, 73.5, 75.88, 73.84, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 76.12, 74.73, 79.4, 76.34, 71.31, 71.59, 71.48, 75.87, 72.77] },
      velocityScore: { '1D': -15.2, '1W': -1.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$89B', pe: 31.9, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.82,
      etfPresence: { AIRR: false, PRN: false, RSHO: 0.92, IDEF: false, BILT: 1.87 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AIR', name: 'AIRBUS GROUP', easyScore: 2, avgWeight: 1.34, proScore: 0.54, coverage: 0.4,
      price: 142.76, weeklyPrices: [138.51, 143.14, 141.85, 142.93, 142.76], weeklyChange: 3.07, dayChange: -0.12, sortRank: 0, periodReturns: { '1M': 29.8, 'YTD': 72.4, '6M': 72.4, '1Y': 100.8 },
      priceHistory: { '1D': [142.93, 142.32, 145.23, 145.24, 145.54, 144.99, 145.73, 146.11, 145.93, 145.55, 145.45, 145.6, 144.55, 144.74, 145.27, 144.2, 144.25, 144.09, 144.22, 144.39, 144.81, 144.79, 143.77, 142.76], '1W': [138.51, 143.14, 141.85, 142.93, 142.76], '1M': [109.99, 110.61, 111.36, 115.53, 116.65, 114.72, 120.13, 117.36, 127.23, 129.01, 129.96, 132.14, 134.88, 134.28, 132.26, 132.94, 138.51, 143.14, 141.85, 142.93, 142.76], 'YTD': [82.79, 94.73, 105.74, 105.66, 105.91, 113.09, 112.98, 116.69, 119.77, 107.87, 105.64, 103.49, 103.16, 114, 123.77, 121.97, 110.2, 109.56, 117.57, 103.79, 112.74, 110.61, 120.13, 129.96, 132.94, 142.76], '6M': [84.45, 97.03, 105.08, 104.26, 108, 114.34, 113.54, 116.69, 119.77, 107.87, 105.64, 103.49, 103.16, 113.86, 125.99, 116.54, 108.86, 111.9, 111.51, 103.79, 112.74, 110.61, 120.13, 129.96, 132.94, 142.76], '1Y': [71.08, 74.55, 85.1, 77.5, 74.71, 72.06, 78.68, 71.77, 75.82, 77.11, 75.32, 75.93, 82.66, 83.95, 81.27, 82.86, 81.33, 84.84, 83.6, 83.65, 78.56, 82.98, 83.79, 84.34, 81.88, 85.07, 84.45, 97.03, 105.08, 104.26, 108, 114.34, 113.54, 118.26, 116.84, 108.3, 105.64, 103.49, 103.16, 113.86, 125.99, 116.54, 108.86, 111.9, 111.51, 100.89, 112.74, 110.61, 120.13, 129.96, 132.94, 142.76] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: 31.4, revenueGrowth: 25, eps: 4.55, grossMargin: 19, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 2.5, BILT: false },
      tonyNote: 'AIRBUS GROUP appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RBC', name: 'RBC Bearings Incorporated', easyScore: 2, avgWeight: 1.19, proScore: 0.47, coverage: 0.4,
      price: 620.47, weeklyPrices: [648.89, 630.36, 634.78, 644.06, 620.47], weeklyChange: -4.38, dayChange: -3.66, sortRank: 0, periodReturns: { '1M': 9.6, 'YTD': 38.4, '6M': 38.4, '1Y': 61.9 },
      priceHistory: { '1D': [644.06, 634.67, 635.97, 633.06, 631.68, 629.83, 631.68, 635.31, 636.3, 635.93, 630.55, 628.36, 626.91, 625.3, 626.3, 624.06, 623.35, 622.75, 624.61, 623.84, 625.09, 623.84, 622.24, 620.47], '1W': [648.89, 630.36, 634.78, 644.06, 620.47], '1M': [566.14, 578.34, 584.18, 589.76, 590.09, 590.97, 592.41, 576.74, 607.46, 603.64, 621.08, 625.73, 639.18, 645.73, 633.44, 638.94, 648.89, 630.36, 634.78, 644.06, 620.47], 'YTD': [448.43, 485, 497.06, 504.07, 499.67, 544.02, 552.44, 562.54, 584.89, 565.64, 546.91, 537.2, 524.38, 552.4, 595.74, 596.86, 591, 593.12, 613.59, 551.12, 584.4, 578.34, 592.41, 621.08, 638.94, 620.47], '6M': [458.79, 487.16, 498.82, 504.5, 507.13, 548.2, 552.93, 562.54, 584.89, 565.64, 546.91, 537.2, 524.38, 553.31, 598.23, 591.32, 594.39, 607.5, 613.1, 551.12, 584.4, 578.34, 592.41, 621.08, 638.94, 620.47], '1Y': [383.13, 378.91, 397.03, 385.02, 387.34, 404.66, 410.61, 392.76, 399.53, 391.1, 385.08, 384.72, 379.44, 374.99, 384.43, 369.71, 393.88, 408.94, 431.36, 445.34, 430.24, 443.29, 443.22, 458.15, 449.77, 456.33, 458.79, 487.16, 498.82, 504.5, 507.13, 548.2, 552.93, 571.57, 568.58, 560.28, 546.91, 537.2, 524.38, 553.31, 598.23, 591.32, 594.39, 607.5, 613.1, 565.22, 584.4, 578.34, 592.41, 621.08, 638.94, 620.47] },
      velocityScore: { '1D': 0, '1W': -2.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$20B', pe: 68.3, revenueGrowth: 18, eps: 9.08, grossMargin: 45, dividendYield: null,
      etfPresence: { AIRR: 1.85, PRN: false, RSHO: false, IDEF: 0.52, BILT: false },
      tonyNote: 'RBC Bearings Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRCY', name: 'Mercury Systems, Inc.', easyScore: 2, avgWeight: 1.14, proScore: 0.45, coverage: 0.4,
      price: 123.05, weeklyPrices: [105.57, 109.38, 110.22, 122.33, 123.05], weeklyChange: 16.56, dayChange: 0.59, sortRank: 0, periodReturns: { '1M': 10.6, 'YTD': 68.5, '6M': 68.5, '1Y': 143.7 },
      priceHistory: { '1D': [122.33, 124.27, 126.14, 126.41, 123.12, 123.49, 124.39, 125.72, 125.83, 125.74, 126.01, 125.5, 124.75, 124.68, 124.59, 123.68, 123.7, 123.65, 122.97, 122.95, 123.79, 124.44, 123.28, 123.05], '1W': [105.57, 109.38, 110.22, 122.33, 123.05], '1M': [111.28, 112.87, 111.59, 117.82, 111.27, 110.94, 108.82, 106.81, 119.32, 120.3, 112.44, 115.5, 113.91, 111.76, 110.87, 105, 105.57, 109.38, 110.22, 122.33, 123.05], 'YTD': [73.01, 88.74, 102.95, 99.05, 93.88, 82.2, 82.36, 85.9, 91.01, 89.36, 80.71, 78.29, 69.86, 75.76, 82.52, 84.12, 77.06, 78.53, 91.95, 93.39, 99.32, 112.87, 108.82, 112.44, 105, 123.05], '6M': [76.03, 93.48, 103.02, 98.89, 93.89, 85.37, 83.32, 85.9, 91.01, 89.36, 80.71, 78.29, 69.86, 77.53, 84.09, 83.36, 76.53, 82.96, 92.32, 93.39, 99.32, 112.87, 108.82, 112.44, 105, 123.05], '1Y': [50.5, 50.62, 52.2, 52.46, 52.59, 52.62, 68.39, 64.54, 68.13, 67.89, 73.08, 77.1, 73.13, 82.56, 80.96, 77.1, 75.54, 77.44, 78.19, 73.1, 67.55, 69.62, 71.35, 76.61, 68.88, 74.22, 76.03, 93.48, 103.02, 98.89, 93.89, 85.37, 83.32, 88.76, 89.43, 86.87, 80.71, 78.29, 69.86, 77.53, 84.09, 83.36, 76.53, 82.96, 92.32, 92.8, 99.32, 112.87, 108.82, 112.44, 105, 123.05] },
      velocityScore: { '1D': 4.7, '1W': 2.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 12, eps: -0.23, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: 1.24, PRN: false, RSHO: false, IDEF: 1.03, BILT: false },
      tonyNote: 'Mercury Systems, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, avgWeight: 1.03, proScore: 0.41, coverage: 0.4,
      price: 54.93, weeklyPrices: [46.27, 46.42, 47.10, 49.92, 54.93], weeklyChange: 18.72, dayChange: 10.04, sortRank: 0, periodReturns: { '1M': 2.4, 'YTD': -24.9, '6M': -24.9, '1Y': 21.4 },
      priceHistory: { '1D': [49.92, 50.94, 53.5, 54.66, 53.78, 53.51, 53.85, 54.56, 54.81, 54.51, 54.83, 54.13, 54.06, 54.09, 54.18, 54.15, 54.23, 54.78, 54.84, 54.53, 54.58, 54.94, 54.56, 54.93], '1W': [46.27, 46.42, 47.1, 49.92, 54.93], '1M': [53.65, 54.65, 51.84, 54.39, 49.44, 49.64, 48.37, 45.87, 49.58, 47.83, 51.7, 52.03, 50.37, 47.7, 46.38, 44.84, 46.27, 46.42, 47.1, 49.92, 54.93], 'YTD': [73.17, 101.28, 109.49, 108.22, 103.8, 95.36, 75.79, 81.27, 93.04, 106.09, 104.08, 102.39, 74.82, 86.1, 87.79, 82.69, 71.95, 65.32, 58.82, 66.21, 60.66, 54.65, 48.37, 51.7, 44.84, 54.93], '6M': [76.85, 106.22, 108.5, 108.71, 102.87, 97.47, 75.11, 81.27, 93.04, 106.09, 104.08, 102.39, 74.82, 82, 90.18, 82.06, 70.3, 62.89, 62.48, 66.21, 60.66, 54.65, 48.37, 51.7, 44.84, 54.93], '1Y': [45.24, 47.44, 56.3, 49.41, 51.7, 48.21, 51.83, 50.76, 54.65, 53.38, 63.8, 65.45, 67.4, 73.41, 74.51, 76.85, 77.21, 85.79, 79.73, 67.74, 60.93, 67.43, 66.48, 69.37, 68.11, 77.55, 76.85, 106.22, 108.5, 108.71, 102.87, 97.47, 75.11, 83.6, 91.11, 102.79, 104.08, 102.39, 74.82, 82, 90.18, 82.06, 70.3, 62.89, 62.48, 64.2, 60.66, 54.65, 48.37, 51.7, 44.84, 54.93] },
      velocityScore: { '1D': 2.5, '1W': 2.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: 238.8, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.88, PRN: false, RSHO: false, IDEF: 0.19, BILT: false },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DRS', name: 'Leonardo DRS, Inc.', easyScore: 2, avgWeight: 0.53, proScore: 0.21, coverage: 0.4,
      price: 42.69, weeklyPrices: [44.36, 42.48, 40.95, 42.67, 42.69], weeklyChange: -3.78, dayChange: 0.04, sortRank: 0, periodReturns: { '1M': -11, 'YTD': 25.2, '6M': 25.2, '1Y': -5.8 },
      priceHistory: { '1D': [42.67, 43.42, 43.39, 43.6, 43.26, 43.69, 44.42, 44.24, 44.13, 44.02, 43.88, 43.63, 43.52, 43.51, 43.43, 43.05, 43.06, 42.74, 42.89, 42.75, 42.68, 42.84, 42.82, 42.69], '1W': [44.36, 42.48, 40.95, 42.67, 42.69], '1M': [47.96, 47.39, 45.61, 46.71, 46.15, 46.55, 47.35, 46.11, 49.69, 48.53, 45.59, 46.58, 46.08, 44.99, 45.74, 44.69, 44.36, 42.48, 40.95, 42.67, 42.69], 'YTD': [34.09, 38.84, 42.26, 40.99, 41.06, 38.93, 38.13, 38.14, 45.49, 47.41, 45.3, 44.4, 43.25, 46.73, 47.43, 44.24, 40.72, 40, 41.49, 42.84, 45.8, 47.39, 47.35, 45.59, 44.69, 42.69], '6M': [34.78, 40.99, 42.57, 40.63, 40.45, 40.22, 39.13, 38.14, 45.49, 47.41, 45.3, 44.4, 43.25, 46.19, 47.54, 43.2, 40.18, 39.7, 42.87, 42.84, 45.8, 47.39, 47.35, 45.59, 44.69, 42.69], '1Y': [45.31, 46.24, 48.33, 47.45, 41.6, 41.25, 41.9, 41.06, 42.03, 40.91, 41.61, 42.58, 42.35, 44.63, 44.21, 39.6, 39.94, 38.43, 35.76, 35.46, 33.43, 33.69, 34.31, 34.78, 33.17, 34.28, 34.78, 40.99, 42.57, 40.63, 40.45, 40.22, 39.13, 43.82, 45.51, 46.35, 45.3, 44.4, 43.25, 46.19, 47.54, 43.2, 40.18, 39.7, 42.87, 42.81, 45.8, 47.39, 47.35, 45.59, 44.69, 42.69] },
      velocityScore: { '1D': 0, '1W': -8.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 39.9, revenueGrowth: 6, eps: 1.07, grossMargin: 24, dividendYield: 0.84,
      etfPresence: { AIRR: 0.77, PRN: false, RSHO: false, IDEF: 0.28, BILT: false },
      tonyNote: 'Leonardo DRS, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TPC', name: 'Tutor Perini Corporation', easyScore: 2, avgWeight: 0.38, proScore: 0.15, coverage: 0.4,
      price: 79.51, weeklyPrices: [81.56, 79.53, 81.88, 82.97, 79.51], weeklyChange: -2.51, dayChange: -4.17, sortRank: 0, periodReturns: { '1M': 7.1, 'YTD': 18.6, '6M': 18.6, '1Y': 67.5 },
      priceHistory: { '1D': [82.97, 79.95, 80.1, 80.21, 80.22, 79.71, 79.41, 79.43, 79.43, 79.75, 79.78, 79.52, 79.41, 79.18, 78.9, 78.4, 78.21, 77.98, 78, 78.74, 79.42, 79.29, 79.36, 79.51], '1W': [81.56, 79.53, 81.88, 82.97, 79.51], '1M': [74.26, 74.29, 72.26, 72.38, 70.53, 72.13, 71.48, 68.72, 73.61, 74.92, 76.19, 77.89, 77.99, 81.5, 81, 82.36, 81.56, 79.53, 81.88, 82.97, 79.51], 'YTD': [67.02, 70.17, 75.17, 76.01, 78.89, 83.48, 82.74, 84.99, 73.57, 72.04, 71.31, 72.44, 72.83, 77.66, 83.8, 84.38, 87.5, 92.76, 82.79, 75.43, 74.67, 74.29, 71.48, 76.19, 82.36, 79.51], '6M': [69.35, 70.53, 75.09, 77.34, 80.11, 84.07, 82.24, 84.99, 73.57, 72.04, 71.31, 72.44, 72.83, 77.31, 86.16, 85.11, 86.87, 97.31, 82.69, 75.43, 74.67, 74.29, 71.48, 76.19, 82.36, 79.51], '1Y': [47.46, 48.06, 50.89, 48.29, 48.15, 55.07, 57.75, 55.99, 58.79, 61, 62.89, 66.22, 64.33, 62.04, 61.75, 64.19, 64.22, 69.34, 67.92, 62.28, 60.11, 67.56, 68.64, 70.46, 67.56, 69.06, 69.35, 70.53, 75.09, 77.34, 80.11, 84.07, 82.24, 85.87, 69.95, 71.29, 71.31, 72.44, 72.83, 77.31, 86.16, 85.11, 86.87, 97.31, 82.69, 74.91, 74.67, 74.29, 71.48, 76.19, 82.36, 79.51] },
      velocityScore: { '1D': 0, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 54.5, revenueGrowth: 12, eps: 1.46, grossMargin: 12, dividendYield: 0.29,
      etfPresence: { AIRR: 0.71, PRN: false, RSHO: false, IDEF: 0.04, BILT: false },
      tonyNote: 'Tutor Perini Corporation appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TKR', name: 'TIMKEN CO/THE', easyScore: 1, avgWeight: 8.69, proScore: 1.74, coverage: 0.2,
      price: 141.75, weeklyPrices: [144.01, 141.22, 143.50, 145.32, 141.75], weeklyChange: -1.57, dayChange: -2.46, sortRank: 0, periodReturns: { '1M': 12, 'YTD': 68.5, '6M': 68.5, '1Y': 84.8 },
      priceHistory: { '1D': [145.32, 143.08, 144.62, 144.5, 144.4, 144.28, 144.19, 144.6, 145.02, 144.93, 144.85, 145.21, 144.37, 144.09, 144.21, 143.82, 143.43, 143.09, 142.99, 142.79, 143.02, 142.66, 142.32, 141.75], '1W': [144.01, 141.22, 143.5, 145.32, 141.75], '1M': [126.54, 131.9, 131.82, 133.66, 131.83, 134.67, 137.09, 132.39, 137.4, 137.06, 140.28, 139.4, 142.36, 141.97, 137.64, 137.99, 144.01, 141.22, 143.5, 145.32, 141.75], 'YTD': [84.13, 90.6, 93.73, 93.94, 93.19, 106.04, 107.84, 107.83, 109.99, 100.58, 98.74, 98.99, 95.94, 98.94, 106.9, 108.45, 108.7, 107.12, 117.39, 112.73, 127.42, 131.9, 137.09, 140.28, 137.99, 141.75], '6M': [86.29, 91.17, 93.55, 94.02, 94.99, 108.93, 105.54, 107.83, 109.99, 100.58, 98.74, 98.99, 95.94, 99.17, 106.81, 108.75, 106.88, 109.63, 117.12, 112.73, 127.42, 131.9, 137.09, 140.28, 137.99, 141.75], '1Y': [76.72, 78.57, 79.13, 80.76, 76.09, 73.91, 80.39, 75.86, 79.01, 77.42, 79.16, 79.09, 74.2, 75.99, 74.32, 74.04, 75.85, 79.25, 78.46, 78.66, 74.82, 81.36, 82.76, 88.71, 84.92, 86.52, 86.29, 91.17, 93.55, 94.02, 94.99, 108.93, 105.54, 109.52, 106.58, 102.18, 98.74, 98.99, 95.94, 99.17, 106.81, 108.75, 106.88, 109.63, 117.12, 109.36, 127.42, 131.9, 137.09, 140.28, 137.99, 141.75] },
      velocityScore: { '1D': 0, '1W': 0, '1M': -55.6, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 32.2, revenueGrowth: 8, eps: 4.4, grossMargin: 31, dividendYield: 0.99,
      etfPresence: { AIRR: false, PRN: false, RSHO: 8.69, IDEF: false, BILT: false },
      tonyNote: 'TIMKEN CO/THE appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RTX', name: 'RTX CORP', easyScore: 1, avgWeight: 8.4, proScore: 1.68, coverage: 0.2,
      price: 191.78, weeklyPrices: [186.59, 187.99, 187.33, 189.73, 191.78], weeklyChange: 2.78, dayChange: 1.08, sortRank: 0, periodReturns: { '1M': 10, 'YTD': 4.6, '6M': 4.6, '1Y': 32.7 },
      priceHistory: { '1D': [189.73, 189.77, 190.07, 190.41, 190.54, 190.01, 190.24, 190.7, 190.99, 191.55, 191.3, 191.36, 190.89, 190.36, 190.56, 190.09, 190.49, 190.91, 191.33, 191.09, 191.07, 191.13, 191.09, 191.78], '1W': [186.59, 187.99, 187.33, 189.73, 191.78], '1M': [174.41, 174.26, 172.55, 179.41, 180.99, 178.66, 181.56, 177.41, 184.21, 183.53, 186.77, 192.58, 185.6, 181.83, 186.39, 185.06, 186.59, 187.99, 187.33, 189.73, 191.78], 'YTD': [183.4, 187.17, 199.83, 195.93, 200.93, 198.66, 200.06, 201.92, 212.16, 208.23, 206.06, 194.82, 187.15, 198.41, 201.41, 195.79, 173.38, 172.9, 178.61, 175.95, 178.97, 174.26, 181.56, 186.77, 185.06, 191.78], '6M': [187.25, 188.5, 201.92, 194.13, 201.09, 196.19, 203.5, 201.92, 212.16, 208.23, 206.06, 194.82, 187.15, 197.92, 202.81, 187.17, 175.68, 172.87, 178.89, 175.95, 178.97, 174.26, 181.56, 186.77, 185.06, 191.78], '1Y': [144.52, 146.4, 151.5, 155.22, 157.57, 155.76, 155.71, 156.59, 159.84, 158.68, 157.65, 158.19, 160.51, 166.63, 162.18, 157.05, 177.98, 176.36, 174, 177.69, 173.77, 173.19, 171.31, 177.42, 178.29, 185.17, 187.25, 188.5, 201.92, 194.13, 201.09, 196.19, 203.5, 198.46, 206.52, 207, 206.06, 194.82, 187.15, 197.92, 202.81, 187.17, 175.68, 172.87, 178.89, 174.49, 178.97, 174.26, 181.56, 186.77, 185.06, 191.78] },
      velocityScore: { '1D': 0, '1W': 1.2, '1M': -46.3, '6M': null }, isNew: false,
      marketCap: '$258B', pe: 36, revenueGrowth: 9, eps: 5.33, grossMargin: 20, dividendYield: 1.54,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 8.4, BILT: false },
      tonyNote: 'RTX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 4.29, proScore: 4.29, coverage: 1,
      price: 229.18, weeklyPrices: [256.63, 240.30, 261.15, 276.17, 229.18], weeklyChange: -10.7, dayChange: -17.01, sortRank: 0, periodReturns: { '1M': -13.4, 'YTD': 173.8, '6M': 173.8, '1Y': 358.6 },
      priceHistory: { '1D': [276.17, 239.36, 238.54, 242.16, 235.73, 232.66, 237.13, 242.25, 238.8, 237.78, 238.66, 237.86, 235.29, 234.71, 236.84, 237.7, 237.31, 237.75, 235.9, 232.77, 233.82, 233.62, 232.2, 229.18], '1W': [256.63, 240.3, 261.15, 276.17, 229.18], '1M': [264.51, 260.58, 251.68, 259.67, 227.81, 218, 220.12, 211.69, 222.24, 232.36, 265.1, 280.91, 286.69, 283.61, 275.25, 259.66, 256.63, 240.3, 261.15, 276.17, 229.18], 'YTD': [83.71, 97.3, 103.89, 94.5, 85.19, 86.1, 98.01, 100.61, 91.01, 94.94, 129.85, 114.15, 92.26, 112.54, 154.56, 159.16, 144.96, 176.42, 186.1, 199.86, 208.06, 260.58, 220.12, 265.1, 259.66, 229.18], '6M': [89.95, 97.93, 108.73, 91.46, 88.16, 92.88, 97.52, 100.61, 91.01, 94.94, 129.85, 114.15, 92.26, 117.4, 161.94, 156.55, 135.51, 175.92, 179.11, 199.86, 208.06, 260.58, 220.12, 265.1, 259.66, 229.18], '1Y': [49.97, 46.43, 53.69, 52.16, 54.43, 65.31, 70.63, 67.47, 70.1, 64.91, 89.19, 94.12, 107.94, 125.87, 132.64, 123.04, 98.62, 125.1, 117, 94.36, 95.07, 94.69, 102.8, 94.28, 78.09, 87.59, 89.95, 97.93, 108.73, 91.46, 88.16, 92.88, 97.52, 102.58, 86.8, 96.43, 129.85, 114.15, 92.26, 117.4, 161.94, 156.55, 135.51, 175.92, 179.11, 197.73, 208.06, 260.58, 220.12, 265.1, 259.66, 229.18] },
      velocityScore: { '1D': -0.9, '1W': -21.6, '1M': 0.7, '6M': null }, isNew: false,
      marketCap: '$58B', pe: 88.1, revenueGrowth: 684, eps: 2.6, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 3.36, MEME: 5.89, RKNG: 3.61 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 3, avgWeight: 3.5, proScore: 3.5, coverage: 1,
      price: 1032.28, weeklyPrices: [1213.56, 1132.33, 1145.28, 1154.29, 1032.28], weeklyChange: -14.94, dayChange: -10.57, sortRank: 0, periodReturns: { '1M': -0.3, 'YTD': 261.7, '6M': 261.7, '1Y': 747.9 },
      priceHistory: { '1D': [1154.29, 1081.66, 1078.14, 1083.5, 1066.35, 1057.3, 1058.36, 1061.94, 1056.07, 1049.34, 1055.02, 1050.51, 1052.01, 1047.05, 1052.66, 1043.49, 1041.9, 1043.47, 1041.47, 1039.61, 1055.62, 1061.17, 1047.14, 1032.28], '1W': [1213.56, 1132.33, 1145.28, 1154.29, 1032.28], '1M': [1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1032.28], '6M': [315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1032.28], '1Y': [121.74, 123.11, 113.26, 111.73, 109.14, 111.87, 124.27, 117.21, 117.75, 124.21, 150.57, 168.89, 156.83, 183.75, 192.33, 202.53, 198.47, 226.63, 237.5, 244.9, 225.92, 230.26, 226.65, 258.46, 248.55, 284.79, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1032.28] },
      velocityScore: { '1D': -1.7, '1W': 2.3, '1M': 4.2, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 23.3, revenueGrowth: 346, eps: 44.21, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { BUZZ: 3.54, MEME: 2.93, RKNG: 4.04 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 3, avgWeight: 3.18, proScore: 3.18, coverage: 1,
      price: 35.52, weeklyPrices: [40.95, 39.16, 37.77, 37.30, 35.52], weeklyChange: -13.26, dayChange: -4.77, sortRank: 0, periodReturns: { '1M': -25.9, 'YTD': 44.9, '6M': 44.9, '1Y': 236.4 },
      priceHistory: { '1D': [37.3, 36.27, 36.32, 36.63, 35.91, 35.53, 35.97, 36.54, 36.42, 36.31, 36.59, 36.92, 36.9, 36.9, 37.23, 37.14, 36.93, 36.76, 36.64, 36.37, 36.43, 36.45, 35.65, 35.52], '1W': [40.95, 39.16, 37.77, 37.3, 35.52], '1M': [47.94, 47.86, 44.71, 44.15, 39.62, 40.94, 41.91, 38.92, 41.47, 42.7, 46.27, 45.57, 46.59, 45.2, 45.27, 41.98, 40.95, 39.16, 37.77, 37.3, 35.52], 'YTD': [24.52, 31.94, 35.22, 37.69, 33.88, 34.95, 35.28, 30, 27.93, 27.03, 27.71, 27.26, 20.55, 25.19, 27.6, 32.19, 33.67, 35.63, 44.59, 39.14, 45.14, 47.86, 41.91, 46.27, 41.98, 35.52], '6M': [28.11, 37.68, 37.4, 36.18, 34.8, 38.26, 33.56, 30, 27.93, 27.03, 27.71, 27.26, 20.55, 25.18, 31.47, 31.32, 32.11, 39.88, 43.93, 39.14, 45.14, 47.86, 41.91, 46.27, 41.98, 35.52], '1Y': [10.56, 9.33, 10.91, 11.2, 13.14, 14.24, 14.8, 15.72, 16.7, 14.33, 17.18, 19.91, 22.59, 26.47, 29.29, 36.64, 30.62, 34.42, 33.09, 26.41, 23.09, 24.94, 31.14, 30.76, 23.9, 24.05, 28.11, 37.68, 37.4, 36.18, 34.8, 38.26, 33.56, 30.66, 26.15, 27.4, 27.71, 27.26, 20.55, 25.18, 31.47, 31.32, 32.11, 39.88, 43.93, 36.62, 45.14, 47.86, 41.91, 46.27, 41.98, 35.52] },
      velocityScore: { '1D': -0.6, '1W': -22.4, '1M': -19.5, '6M': null }, isNew: false,
      marketCap: '$10B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 1.87, MEME: 4.47, RKNG: 3.2 },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 4.43, proScore: 2.95, coverage: 0.667,
      price: 289.5, weeklyPrices: [309.18, 252.02, 275.01, 302.70, 289.50], weeklyChange: -6.37, dayChange: -4.36, sortRank: 0, periodReturns: { '1M': 5.8, 'YTD': 233.2, '6M': 233.2, '1Y': 1183.2 },
      priceHistory: { '1D': [302.7, 313.23, 310.53, 312.31, 304.01, 299.39, 303.86, 308.17, 308.99, 308.75, 308.74, 310.25, 307.02, 303.78, 302.76, 299.28, 296.3, 292.68, 292.72, 290.06, 296.12, 297.27, 290.69, 289.5], '1W': [309.18, 252.02, 275.01, 302.7, 289.5], '1M': [273.51, 302.85, 287.32, 291.37, 263.61, 253.57, 259.61, 234.23, 248.88, 260.22, 280.88, 284.99, 328.91, 345.85, 321.98, 326.19, 309.18, 252.02, 275.01, 302.7, 289.5], 'YTD': [86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 160.28, 166, 151.32, 153.68, 141.33, 119.51, 135, 176.67, 218.27, 234.68, 288.64, 283.92, 258.71, 302.4, 302.85, 259.61, 280.88, 326.19, 289.5], '6M': [98.69, 134.07, 149.5, 139.62, 156.13, 155.17, 145.32, 160.28, 166, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 258.71, 302.4, 302.85, 259.61, 280.88, 326.19, 289.5], '1Y': [22.56, 25.85, 24.31, 33.06, 37.39, 36.8, 44.08, 44.51, 50.85, 54.91, 67.29, 80.97, 68.69, 88, 86.65, 115.09, 94.37, 133.71, 141.41, 126.72, 108.93, 101.14, 118.09, 108.99, 80.21, 90.18, 98.69, 134.07, 149.5, 139.62, 156.13, 155.17, 145.32, 166.2, 153.02, 154, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 261.34, 302.4, 302.85, 259.61, 280.88, 326.19, 289.5] },
      velocityScore: { '1D': -6.6, '1W': -23.8, '1M': -27.5, '6M': null }, isNew: false,
      marketCap: '$82B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.48, RKNG: 3.37 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 2, avgWeight: 4.34, proScore: 2.89, coverage: 0.667,
      price: 598.37, weeklyPrices: [675.39, 586.45, 651.88, 638.72, 598.37], weeklyChange: -11.4, dayChange: -6.32, sortRank: 0, periodReturns: { '1M': 9.6, 'YTD': 247.3, '6M': 247.3, '1Y': 809.7 },
      priceHistory: { '1D': [638.72, 607, 608.65, 603.46, 594.07, 592.44, 592.94, 600.88, 601.61, 603.73, 602.5, 599, 597.91, 597.88, 597.28, 595.39, 596.21, 595.4, 593.72, 592.82, 597.68, 601.96, 600.44, 598.37], '1W': [675.39, 586.45, 651.88, 638.72, 598.37], '1M': [546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37], 'YTD': [172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 458.68, 524.65, 563.1, 517.72, 681.08, 643.83, 598.37], '6M': [187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 458.68, 524.65, 563.1, 517.72, 681.08, 643.83, 598.37], '1Y': [65.78, 65.06, 67.02, 69.02, 78.69, 74.44, 76.07, 75.64, 80.67, 90.49, 96.15, 105.15, 107.21, 131.26, 119.7, 125.92, 120.47, 141.38, 160.1, 166.11, 153.97, 157.74, 161, 187.2, 175.01, 181.54, 187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 266.22, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 524.65, 563.1, 517.72, 681.08, 643.83, 598.37] },
      velocityScore: { '1D': -4.9, '1W': -23.7, '1M': 16.1, '6M': null }, isNew: false,
      marketCap: '$206B', pe: 35.8, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.09,
      etfPresence: { BUZZ: false, MEME: 5.02, RKNG: 3.66 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 4.33, proScore: 2.89, coverage: 0.667,
      price: 2032.22, weeklyPrices: [2335.00, 2090.71, 2050.39, 2273.73, 2032.22], weeklyChange: -12.97, dayChange: -10.62, sortRank: 0, periodReturns: { '1M': 15.4, 'YTD': 756.1, '6M': 756.1, '1Y': 4297.8 },
      priceHistory: { '1D': [2273.73, 2080, 2091.88, 2096.01, 2057.94, 2040.46, 2046.55, 2072.94, 2060, 2061.29, 2066.08, 2054.99, 2054.63, 2037.24, 2052.3, 2028.09, 2035.88, 2027.68, 2018.02, 2009.01, 2032.44, 2055.66, 2046.73, 2032.22], '1W': [2335, 2090.71, 2050.39, 2273.73, 2032.22], '1M': [1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22], 'YTD': [237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1333.01, 1589.55, 1716.36, 1646.54, 1991.55, 1914.46, 2032.22], '6M': [275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1333.01, 1589.55, 1716.36, 1646.54, 1991.55, 1914.46, 2032.22], '1Y': [46.21, 46.95, 41.52, 42.06, 42.92, 40.69, 47.01, 44.4, 48.44, 62.5, 84.3, 98.87, 94.29, 124.14, 129.68, 144.27, 146.95, 204.36, 216.5, 283.1, 245.96, 215.04, 213.31, 241.61, 219.46, 250.05, 275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 565.41, 618.89, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.55, 1716.36, 1646.54, 1991.55, 1914.46, 2032.22] },
      velocityScore: { '1D': -3.3, '1W': -35.8, '1M': -35.9, '6M': null }, isNew: false,
      marketCap: '$301B', pe: 69.3, revenueGrowth: 251, eps: 29.33, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.94, RKNG: 3.73 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 2, avgWeight: 4.01, proScore: 2.67, coverage: 0.667,
      price: 86.1, weeklyPrices: [65.62, 71.45, 86.77, 88.86, 86.10], weeklyChange: 31.21, dayChange: -3.11, sortRank: 0, periodReturns: { '1M': -18.5, 'YTD': 18.5, '6M': 18.5, '1Y': 88.4 },
      priceHistory: { '1D': [88.86, 88.23, 86.93, 88.14, 85.7, 84.59, 86.98, 89.61, 88.9, 89.85, 91.09, 91.42, 91.1, 91.04, 90.98, 89.67, 89.21, 89.12, 88.66, 87.65, 87.67, 87.57, 85.93, 86.1], '1W': [65.62, 71.45, 86.77, 88.86, 86.1], '1M': [105.65, 118.17, 107.73, 107.29, 93.6, 92.06, 88.71, 87.32, 97.56, 82.41, 82.25, 85.43, 80.66, 73.19, 72.87, 68.01, 65.62, 71.45, 86.77, 88.86, 86.1], 'YTD': [72.63, 90.56, 101.25, 113.57, 111.21, 101.79, 82.51, 83.9, 86.92, 89.76, 89.11, 88.42, 73.82, 94.81, 98.97, 81, 77.2, 68.43, 82.55, 86.83, 119.7, 118.17, 88.71, 82.25, 68.01, 86.1], '6M': [83.47, 97.67, 115.77, 104.78, 104.55, 102.12, 83.03, 83.9, 86.92, 89.76, 89.11, 88.42, 73.82, 92.57, 88.57, 80.01, 71.88, 63.87, 72.96, 86.83, 119.7, 118.17, 88.71, 82.25, 68.01, 86.1], '1Y': [45.71, 43.97, 57.45, 60.06, 53.17, 47.71, 50.05, 45.08, 48.25, 41.86, 38.37, 41.44, 49.39, 66.16, 86.79, 89.5, 71.35, 80.06, 70.38, 64.49, 58.01, 55.52, 72.65, 84.75, 65.93, 71.95, 83.47, 97.67, 115.77, 104.78, 104.55, 102.12, 83.03, 85.82, 92.68, 87.53, 89.11, 88.42, 73.82, 92.57, 88.57, 80.01, 71.88, 63.87, 72.96, 88.1, 119.7, 118.17, 88.71, 82.25, 68.01, 86.1] },
      velocityScore: { '1D': 0, '1W': -27.6, '1M': -42.2, '6M': null }, isNew: false,
      marketCap: '$33B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.28, MEME: 5.74, RKNG: false },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'LITE', name: 'LITE', easyScore: 2, avgWeight: 3.85, proScore: 2.57, coverage: 0.667,
      price: 801.16, weeklyPrices: [861.97, 816.98, 851.40, 858.06, 801.16], weeklyChange: -7.05, dayChange: -6.63, sortRank: 0, periodReturns: { '1M': -11.5, 'YTD': 117.4, '6M': 117.4, '1Y': 778.1 },
      priceHistory: { '1D': [858.06, 830.7, 820.38, 823.99, 815.56, 794.96, 800.67, 801.84, 804.7, 803.65, 808.03, 804.3, 803.61, 805.82, 806.87, 802.38, 803.09, 801.57, 801.67, 795.47, 802.02, 803.74, 800.66, 801.16], '1W': [861.97, 816.98, 851.4, 858.06, 801.16], '1M': [905, 1029.15, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 875.36, 869.98, 850, 893.93, 827.92, 842.53, 861.97, 816.98, 851.4, 858.06, 801.16], 'YTD': [368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 772.28, 871.18, 895.11, 859.68, 976.18, 1053.09, 884.98, 910.81, 1029.15, 821.76, 875.36, 842.53, 801.16], '6M': [386.11, 351.42, 324.25, 332.45, 423.42, 577.15, 600.42, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 884.98, 910.81, 1029.15, 821.76, 875.36, 842.53, 801.16], '1Y': [91.24, 92.62, 102.64, 102.85, 110.08, 111.13, 120.23, 115.89, 125.84, 141.91, 164.88, 171.5, 159.11, 169.75, 159.76, 163.23, 158.06, 214.28, 232.75, 253.81, 268.92, 308.28, 327.85, 372.09, 337.13, 390.77, 386.11, 351.42, 324.25, 332.45, 423.42, 577.15, 600.42, 688.27, 694.43, 672, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 890.09, 910.81, 1029.15, 821.76, 875.36, 842.53, 801.16] },
      velocityScore: { '1D': -0.8, '1W': -12.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$62B', pe: 141.5, revenueGrowth: 90, eps: 5.66, grossMargin: 41, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.67, RKNG: 3.04 },
      tonyNote: 'LITE appears in 2 of 3 Meme ETFs (67% coverage) with average weight 3.9% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 2, avgWeight: 3.67, proScore: 2.45, coverage: 0.667,
      price: 43.32, weeklyPrices: [47.74, 47.21, 45.91, 45.73, 43.32], weeklyChange: -9.26, dayChange: -5.27, sortRank: 0, periodReturns: { '1M': -33.7, 'YTD': 14.7, '6M': 14.7, '1Y': 176.6 },
      priceHistory: { '1D': [45.73, 43.25, 43.49, 44.19, 43.05, 42.12, 42.96, 43.99, 43.69, 43.46, 43.67, 43.98, 43.97, 43.86, 44.38, 44.37, 44.09, 43.94, 44.01, 43.66, 44.15, 43.99, 43.44, 43.32], '1W': [47.74, 47.21, 45.91, 45.73, 43.32], '1M': [65.33, 66.6, 65.48, 61.86, 54.35, 59.19, 54.02, 51.52, 56.71, 59.77, 59.18, 58.11, 59.96, 56.87, 54.72, 50.3, 47.74, 47.21, 45.91, 45.73, 43.32], 'YTD': [37.77, 45.68, 51.89, 56.68, 53.74, 41.83, 42.22, 42.36, 41.39, 38.84, 44.94, 42.16, 31.62, 35.13, 43.07, 48.72, 48.36, 49.48, 55.15, 50.46, 59.78, 66.6, 54.02, 59.18, 50.3, 43.32], '6M': [42.7, 46.03, 57.82, 52.36, 53.08, 46.15, 40.97, 42.36, 41.39, 38.84, 44.94, 42.16, 31.62, 35.74, 47.37, 45.17, 44.44, 54.74, 56.56, 50.46, 59.78, 66.6, 54.02, 59.18, 50.3, 43.32], '1Y': [15.66, 17.03, 18.05, 18.14, 16.11, 18.57, 17.73, 19.76, 22.35, 26.13, 32.85, 36.32, 46.29, 47.02, 63.85, 61.83, 51.83, 60.42, 76.41, 55.7, 45.83, 48.45, 46.45, 43.94, 35.8, 40.3, 42.7, 46.03, 57.82, 52.36, 53.08, 46.15, 40.97, 45.45, 38.85, 38.12, 44.94, 42.16, 31.62, 35.74, 47.37, 45.17, 44.44, 54.74, 56.56, 47.74, 59.78, 66.6, 54.02, 59.18, 50.3, 43.32] },
      velocityScore: { '1D': 0, '1W': -40.1, '1M': -39.7, '6M': null }, isNew: false,
      marketCap: '$15B', pe: 56.3, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 2.59, MEME: 4.75, RKNG: false },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'AMD', name: 'AMD', easyScore: 2, avgWeight: 3.44, proScore: 2.3, coverage: 0.667,
      price: 540.88, weeklyPrices: [532.57, 521.58, 539.49, 580.91, 540.88], weeklyChange: 1.56, dayChange: -6.89, sortRank: 0, periodReturns: { '1M': 6, 'YTD': 152.6, '6M': 152.6, '1Y': 290.5 },
      priceHistory: { '1D': [580.91, 553.76, 557.29, 556.99, 553.03, 553.36, 553.33, 554.48, 554.52, 550.4, 551.21, 551.03, 550.75, 550.95, 553.71, 550.35, 549.64, 548.67, 547.71, 543.9, 549.81, 550.18, 543.6, 540.88], '1W': [532.57, 521.58, 539.49, 580.91, 540.88], '1M': [510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 420.99, 503.89, 521.54, 475.51, 507.29, 519.74, 540.88], '6M': [223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 420.99, 503.89, 521.54, 475.51, 507.29, 519.74, 540.88], '1Y': [138.52, 144.16, 160.41, 162.12, 176.31, 172.4, 184.42, 165.2, 167.13, 161.79, 155.67, 157.92, 161.27, 169.73, 232.89, 234.56, 230.23, 264.33, 256.33, 258.89, 223.55, 214.24, 215.98, 221.43, 201.06, 214.99, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 503.89, 521.54, 475.51, 507.29, 519.74, 540.88] },
      velocityScore: { '1D': 0.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$882B', pe: 179.1, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { BUZZ: 3.32, MEME: false, RKNG: 3.57 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab', easyScore: 2, avgWeight: 3.23, proScore: 2.15, coverage: 0.667,
      price: 100.07, weeklyPrices: [80.69, 84.54, 98.01, 101.65, 100.07], weeklyChange: 24.02, dayChange: -1.55, sortRank: 0, periodReturns: { '1M': -18.2, 'YTD': 43.4, '6M': 43.4, '1Y': 180.5 },
      priceHistory: { '1D': [101.65, 101.51, 101.8, 103.04, 100.19, 98.78, 102.64, 105.8, 105.79, 105.81, 107.25, 106.92, 106.76, 106.09, 105.94, 104.28, 104.42, 104.27, 103.38, 102.42, 102.3, 102.2, 101.03, 100.07], '1W': [80.69, 84.54, 98.01, 101.65, 100.07], '1M': [122.39, 123.32, 114.7, 119.95, 110.08, 113.65, 108.23, 105.05, 114.78, 102.39, 104.63, 107.98, 107.24, 100.29, 95.12, 85.41, 80.69, 84.54, 98.01, 101.65, 100.07], 'YTD': [69.76, 83.08, 90.76, 88.9, 80.07, 72.32, 67.44, 70.21, 70.97, 71.48, 71.31, 68, 57.38, 67.67, 70.62, 89.46, 82.29, 80.31, 117.35, 131.16, 143.2, 123.32, 108.23, 104.63, 85.41, 100.07], '6M': [75.99, 84.85, 96.3, 80.48, 74.15, 75.84, 69.89, 70.21, 70.97, 71.48, 71.31, 68, 57.38, 66.32, 72.22, 86.64, 78.59, 78.76, 117.56, 131.16, 143.2, 123.32, 108.23, 104.63, 85.41, 100.07], '1Y': [35.68, 39.1, 51.33, 48.13, 45.92, 44.21, 43, 40.69, 46.25, 42.99, 48.43, 47.18, 46.63, 52.47, 66.42, 67, 60.56, 66.16, 56.42, 49.97, 43.62, 41.93, 49.37, 63.53, 59.92, 70.65, 75.99, 84.85, 96.3, 80.48, 74.15, 75.84, 69.89, 69.97, 70.13, 68.93, 71.31, 68, 57.38, 66.32, 72.22, 86.64, 78.59, 78.76, 117.56, 127.31, 143.2, 123.32, 108.23, 104.63, 85.41, 100.07] },
      velocityScore: { '1D': 0, '1W': null, '1M': -48.1, '6M': null }, isNew: false,
      marketCap: '$63B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 1.63, MEME: 4.83, RKNG: false },
      tonyNote: 'Rocket Lab is the small-launch and space systems name that Electrification and AI infrastructure ETFs hold for satellite connectivity exposure — relevant to both GPS-dependent grids and low-orbit broadband that supports remote AI compute. Small market cap, no earnings, but consistent revenue growth and a rapidly expanding backlog.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 1, avgWeight: 9.72, proScore: 3.24, coverage: 0.333,
      price: 139, weeklyPrices: [138.54, 135.69, 150.10, 148.16, 139.00], weeklyChange: 0.33, dayChange: -6.18, sortRank: 0, periodReturns: { '1M': -25.1, 'YTD': 298.7, '6M': 298.7, '1Y': 420.8 },
      priceHistory: { '1D': [148.16, 143.87, 145.57, 145.21, 142.93, 140.85, 143.01, 143.65, 141, 140.86, 141.76, 140.82, 141.4, 140.62, 140.88, 139.86, 139.71, 139.84, 139.1, 137.04, 138.56, 139.26, 137.89, 139], '1W': [138.54, 135.69, 150.1, 148.16, 139], '1M': [185.67, 202.37, 184.07, 202.89, 177, 196.64, 162.88, 175.13, 172.78, 169.05, 170.81, 167.34, 161.85, 171.23, 147.44, 146.97, 138.54, 135.69, 150.1, 148.16, 139], 'YTD': [34.86, 33.01, 37, 35.72, 43.61, 44.3, 44.46, 53.96, 102.51, 110.62, 94.07, 95.76, 85.19, 107.45, 153.19, 163.47, 145.78, 172.98, 184.9, 173.26, 177.62, 202.37, 162.88, 170.81, 146.97, 139], '6M': [39.6, 34.04, 37.04, 34.89, 44.16, 47.91, 43.91, 53.96, 102.51, 110.62, 94.07, 95.76, 85.19, 117.64, 146.39, 150.57, 137.26, 180.57, 188.28, 173.26, 177.62, 202.37, 162.88, 170.81, 146.97, 139], '1Y': [26.69, 28.25, 29.42, 25.84, 22.87, 22.33, 23.02, 21.93, 24.05, 23.32, 26.85, 29.04, 26.34, 27.98, 32.37, 31.14, 29.98, 35.48, 31.51, 23.94, 20.87, 25.57, 26.24, 36.32, 29.25, 37.17, 39.6, 34.04, 37.04, 34.89, 44.16, 47.91, 43.91, 56.27, 95.34, 120.49, 94.07, 95.76, 85.19, 117.64, 146.39, 150.57, 137.26, 180.57, 188.28, 171.33, 177.62, 202.37, 162.88, 170.81, 146.97, 139] },
      velocityScore: { '1D': 0, '1W': -12.7, '1M': -25.7, '6M': null }, isNew: false,
      marketCap: '$11B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 9.72, RKNG: false },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'QBTS', name: 'D-Wave Quantum', easyScore: 1, avgWeight: 5.21, proScore: 1.74, coverage: 0.333,
      price: 23.5, weeklyPrices: [21.91, 22.76, 23.83, 23.99, 23.50], weeklyChange: 7.26, dayChange: -2.04, sortRank: 0, periodReturns: { '1M': -19.5, 'YTD': -10.1, '6M': -10.1, '1Y': 47.1 },
      priceHistory: { '1D': [23.99, 23.71, 23.92, 24.3, 23.68, 23.68, 24.13, 24.32, 24.2, 24.12, 24.19, 24.39, 24.4, 24.22, 24.31, 24.25, 24.09, 24.04, 23.87, 23.58, 23.77, 23.64, 23.39, 23.5], '1W': [21.91, 22.76, 23.83, 23.99, 23.5], '1M': [29.18, 29.91, 27.55, 27.64, 23.85, 25.83, 23.52, 23.25, 23.82, 23.37, 23.94, 22.92, 24.69, 24.47, 25.03, 22.98, 21.91, 22.76, 23.83, 23.99, 23.5], 'YTD': [26.15, 29.28, 28.72, 25.63, 21.22, 20.72, 19.67, 18.05, 18.94, 19.04, 17.46, 16.31, 12.98, 14.14, 14.65, 21.66, 18.8, 20.92, 24.03, 19.06, 27.82, 29.91, 23.52, 23.94, 22.98, 23.5], '6M': [28.13, 28.11, 28.83, 23.75, 20.97, 21.21, 18.44, 18.05, 18.94, 19.04, 17.46, 16.31, 12.98, 13.74, 16.97, 20.36, 18.11, 21.54, 22.35, 19.06, 27.82, 29.91, 23.52, 23.94, 22.98, 23.5], '1Y': [15.98, 16.01, 19.24, 19.76, 17.19, 17.17, 18.65, 15.06, 15.23, 15.29, 16.52, 24.02, 26.34, 29.21, 35.07, 40.46, 27.29, 34.26, 31.02, 26.4, 23.44, 22.41, 28.73, 27.98, 24.89, 25.29, 28.13, 28.11, 28.83, 23.75, 20.97, 21.21, 18.44, 18.66, 18.24, 18.76, 17.46, 16.31, 12.98, 13.74, 16.97, 20.36, 18.11, 21.54, 22.35, 18.19, 27.82, 29.91, 23.52, 23.94, 22.98, 23.5] },
      velocityScore: { '1D': 0, '1W': -14.7, '1M': -47.1, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: -81, eps: -1.14, grossMargin: 66, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.21, RKNG: false },
      tonyNote: 'D-Wave Quantum is a quantum computing company — the only publicly traded business built around quantum annealing hardware. Revenue is minimal and profitability is many years away, but it holds a position in Meme ETFs as the purest-play quantum computing stock available to retail investors. The ETF weight is small and the position is purely thematic.',
    },
    {
      ticker: 'COHR', name: 'COHR', easyScore: 1, avgWeight: 4.91, proScore: 1.64, coverage: 0.333,
      price: 368.65, weeklyPrices: [407.25, 380.56, 391.22, 394.47, 368.65], weeklyChange: -9.48, dayChange: -6.55, sortRank: 0, periodReturns: { '1M': 1.6, 'YTD': 99.7, '6M': 99.7, '1Y': 317.2 },
      priceHistory: { '1D': [394.47, 375.5, 379.78, 379.67, 371.11, 362.91, 366.77, 367.43, 367.36, 366.36, 366.29, 366.32, 365.62, 366.7, 368.13, 367, 369.14, 369.15, 370.08, 369.23, 372.08, 371.2, 370.64, 368.65], '1W': [407.25, 380.56, 391.22, 394.47, 368.65], '1M': [362.9, 426.89, 417.43, 421.9, 376.99, 401.93, 355.94, 354.77, 363.58, 385.03, 382.81, 378.85, 389.57, 425.48, 381.22, 392.5, 407.25, 380.56, 391.22, 394.47, 368.65], 'YTD': [184.57, 173.15, 195.96, 196.94, 212.18, 227.68, 217.23, 248.89, 298.91, 252.32, 247.37, 255.05, 219.65, 253.22, 307.93, 347.51, 321.53, 329.89, 379.69, 362.83, 381.35, 426.89, 355.94, 382.81, 392.5, 368.65], '6M': [194.33, 178.06, 191.04, 197.76, 222.44, 242.46, 219.96, 248.89, 298.91, 252.32, 247.37, 255.05, 219.65, 255.1, 313.42, 343.79, 303.97, 335.73, 374.01, 362.83, 381.35, 426.89, 355.94, 382.81, 392.5, 368.65], '1Y': [88.36, 93.72, 100.28, 98.72, 107.6, 113.82, 114.01, 86.55, 90.71, 95.62, 103.51, 108.05, 106.57, 112.79, 122.35, 115.96, 115.37, 138.06, 134.63, 156.67, 142.94, 154, 177.35, 198.5, 175.71, 191.72, 194.33, 178.06, 191.04, 197.76, 222.44, 242.46, 219.96, 254.86, 280.81, 260.64, 247.37, 255.05, 219.65, 255.1, 313.42, 343.79, 303.97, 335.73, 374.01, 353.63, 381.35, 426.89, 355.94, 382.81, 392.5, 368.65] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$72B', pe: 176.4, revenueGrowth: 21, eps: 2.09, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.91, RKNG: false },
      tonyNote: 'COHR appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 1, avgWeight: 4.8, proScore: 1.6, coverage: 0.333,
      price: 51.4, weeklyPrices: [50.56, 49.31, 53.88, 53.26, 51.40], weeklyChange: 1.66, dayChange: -3.49, sortRank: 0, periodReturns: { '1M': -25.8, 'YTD': 14.6, '6M': 14.6, '1Y': 14.9 },
      priceHistory: { '1D': [53.26, 52.94, 53.84, 54.65, 53.36, 53.1, 54.08, 54.09, 54.02, 53.61, 53.78, 53.91, 53.85, 53.4, 53.65, 53.41, 53.11, 53.04, 52.54, 52, 52.61, 52.37, 51.8, 51.4], '1W': [50.56, 49.31, 53.88, 53.26, 51.4], '1M': [69.28, 71.4, 68.23, 65.66, 56.78, 62.8, 56.69, 56.63, 57.99, 57.85, 56.06, 54.69, 56.55, 58.32, 57.85, 53.6, 50.56, 49.31, 53.88, 53.26, 51.4], 'YTD': [44.87, 50.45, 47.56, 47.25, 39.98, 34.99, 34.11, 30.78, 38.34, 35.87, 33.29, 33.11, 26.59, 29.24, 29.76, 48.32, 43.84, 45.75, 56.89, 49.31, 63.62, 71.4, 56.69, 56.06, 53.6, 51.4], '6M': [46.77, 49.45, 50.8, 43.37, 38.56, 35.48, 33.18, 30.78, 38.34, 35.87, 33.29, 33.11, 26.59, 28.49, 35.76, 46.28, 43.08, 48, 55.87, 49.31, 63.62, 71.4, 56.69, 56.06, 53.6, 51.4], '1Y': [44.75, 45.93, 44.84, 43.9, 39.87, 40.49, 41.21, 36.79, 41.42, 42.11, 47.05, 66.81, 69.43, 69.6, 77.5, 65.59, 55.45, 61.11, 55.41, 50.71, 47.88, 46.9, 54.76, 52.55, 46.44, 46, 46.77, 49.45, 50.8, 43.37, 38.56, 35.48, 33.18, 31.62, 37.05, 35.12, 33.29, 33.11, 26.59, 28.49, 35.76, 46.28, 43.08, 48, 55.87, 48.44, 63.62, 71.4, 56.69, 56.06, 53.6, 51.4] },
      velocityScore: { '1D': 0, '1W': -41.2, '1M': -49, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 131.8, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.8, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'AXTI', name: 'AXT Inc', easyScore: 1, avgWeight: 4.62, proScore: 1.54, coverage: 0.333,
      price: 65.03, weeklyPrices: [69.06, 70.15, 71.46, 72.08, 65.03], weeklyChange: -5.84, dayChange: -9.78, sortRank: 0, periodReturns: { '1M': -40.6, 'YTD': 297.7, '6M': 297.7, '1Y': 3026.4 },
      priceHistory: { '1D': [72.08, 68.19, 67.11, 67, 64.35, 64.52, 65.68, 66.41, 66.3, 65.97, 66, 65.3, 65.67, 65.4, 65.49, 64.88, 65.03, 65.16, 64.69, 64.39, 65.23, 65.81, 65.22, 65.03], '1W': [69.06, 70.15, 71.46, 72.08, 65.03], '1M': [109.55, 110.85, 106.7, 105.99, 89.04, 90.78, 78.36, 85.29, 88.34, 97.18, 93.04, 92.11, 84.57, 92.44, 77.91, 70.14, 69.06, 70.15, 71.46, 72.08, 65.03], 'YTD': [16.35, 25.83, 25.72, 17.4, 18.54, 24.06, 24.24, 28.43, 46.32, 38.56, 48.39, 64.44, 52.73, 41.99, 66.45, 78.76, 70.15, 106, 125.81, 105.88, 132.6, 110.85, 78.36, 93.04, 70.14, 65.03], '6M': [16.76, 22.99, 22.09, 17.8, 20.94, 27.77, 23.21, 28.43, 46.32, 38.56, 48.39, 64.44, 52.73, 45.46, 67.3, 74.97, 68.71, 107.55, 122.9, 105.88, 132.6, 110.85, 78.36, 93.04, 70.14, 65.03], '1Y': [2.08, 2.26, 2.5, 2.37, 2.08, 2.06, 2.18, 2.51, 2.87, 2.96, 3.39, 3.96, 4.75, 4.7, 5.23, 4.93, 4.94, 7.07, 9.1, 10.98, 10.11, 10.45, 12.1, 16.38, 14.01, 15.37, 16.76, 22.99, 22.09, 17.8, 20.94, 27.77, 23.21, 35.08, 41.76, 44.3, 48.39, 64.44, 52.73, 45.46, 67.3, 74.97, 68.71, 107.55, 122.9, 112.88, 132.6, 110.85, 78.36, 93.04, 70.14, 65.03] },
      velocityScore: { '1D': 0, '1W': 6.9, '1M': -38.2, '6M': null }, isNew: false,
      marketCap: '$4B', pe: null, revenueGrowth: 39, eps: -0.32, grossMargin: 21, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.62, RKNG: false },
      tonyNote: 'AXT Inc is a compound semiconductor substrate manufacturer — gallium arsenide, indium phosphide, and germanium wafers used in data center optical transceivers, 5G RF chips, and solar cells. Revenue is growing with optical networking demand. Small market cap but positioned at a genuine supply-chain chokepoint for III-V semiconductor materials.',
    },
    {
      ticker: 'CRWV', name: 'CRWV', easyScore: 1, avgWeight: 4.1, proScore: 1.37, coverage: 0.333,
      price: 85.69, weeklyPrices: [98.76, 96.58, 95.51, 99.54, 85.69], weeklyChange: -13.24, dayChange: -13.92, sortRank: 0, periodReturns: { '1M': -31.4, 'YTD': 19.7, '6M': 19.7, '1Y': -43.5 },
      priceHistory: { '1D': [99.54, 88.88, 88.5, 88.49, 86.41, 85.38, 85.75, 87.45, 87, 87.04, 87.14, 86.73, 86.22, 86.26, 87.21, 87.09, 87.71, 88.16, 87.92, 86.61, 86.66, 87.05, 85.26, 85.69], '1W': [98.76, 96.58, 95.51, 99.54, 85.69], '1M': [124.82, 119.27, 110.93, 108.03, 100.39, 102.37, 98.45, 95.61, 95.74, 100.55, 117.03, 115.21, 117.95, 111.29, 105.72, 100.88, 98.76, 96.58, 95.51, 99.54, 85.69], 'YTD': [71.61, 77.09, 95.01, 92.98, 93.19, 89.95, 96.04, 90.84, 78.05, 74.41, 85.86, 81.96, 69.15, 80.94, 110.27, 117.43, 112.06, 125.43, 114.7, 103.77, 105.89, 119.27, 98.45, 117.03, 100.88, 85.69], '6M': [79.32, 80.14, 101.23, 98.31, 88.94, 96.79, 91, 90.84, 78.05, 74.41, 85.86, 81.96, 69.15, 85.24, 117.2, 115.16, 105.53, 127.89, 107.75, 103.77, 105.89, 119.27, 98.45, 117.03, 100.88, 85.69], '1Y': [151.77, 138.29, 132.21, 120, 114.13, 121.08, 117.76, 91.52, 96.93, 87.48, 112.69, 121.39, 126.66, 138, 143.08, 141.74, 121.53, 139.93, 114.42, 85.43, 74.92, 74.29, 85.75, 87.38, 67.68, 76.42, 79.32, 80.14, 101.23, 98.31, 88.94, 96.79, 91, 99.3, 73.78, 74.92, 85.86, 81.96, 69.15, 85.24, 117.2, 115.16, 105.53, 127.89, 107.75, 99.81, 105.89, 119.27, 98.45, 117.03, 100.88, 85.69] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$47B', pe: null, revenueGrowth: 112, eps: -2.72, grossMargin: 69, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.1, RKNG: false },
      tonyNote: 'CRWV appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ALAB', name: 'ALAB', easyScore: 1, avgWeight: 3.88, proScore: 1.29, coverage: 0.333,
      price: 430.86, weeklyPrices: [398.00, 391.74, 455.96, 483.02, 430.86], weeklyChange: 8.26, dayChange: -10.8, sortRank: 0, periodReturns: { '1M': 34.6, 'YTD': 159, '6M': 159, '1Y': 386.5 },
      priceHistory: { '1D': [483.02, 454.62, 464, 463.89, 455.17, 450.01, 452, 458.33, 454.63, 444.76, 449.51, 447.94, 445.05, 444.45, 444.57, 441.83, 440.96, 440.94, 439.08, 436.89, 441.4, 443.24, 433.44, 430.86], '1W': [398, 391.74, 455.96, 483.02, 430.86], '1M': [320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86], 'YTD': [166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 215.58, 318.72, 355.76, 341.7, 361.71, 399.92, 430.86], '6M': [179.56, 162.61, 182, 163.25, 152.44, 187.67, 123.69, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 215.58, 318.72, 355.76, 341.7, 361.71, 399.92, 430.86], '1Y': [88.57, 97.02, 97.95, 121.68, 136.73, 170.89, 193.64, 172.45, 179.2, 187.95, 232.9, 251.88, 200.64, 209.6, 225.43, 163.55, 154.85, 173.62, 181.94, 157.79, 142.01, 154.22, 152.51, 173.7, 145.88, 167.26, 179.56, 162.61, 182, 163.25, 152.44, 187.67, 123.69, 128.4, 109.8, 116.48, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 318.72, 355.76, 341.7, 361.71, 399.92, 430.86] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$74B', pe: 287.2, revenueGrowth: 93, eps: 1.5, grossMargin: 76, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.88, RKNG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'WEN', name: 'WEN', easyScore: 1, avgWeight: 3.85, proScore: 1.28, coverage: 0.333,
      price: 8.94, weeklyPrices: [7.33, 7.80, 8.26, 8.29, 8.94], weeklyChange: 21.96, dayChange: 7.84, sortRank: 0, periodReturns: { '1M': 13.9, 'YTD': 7.3, '6M': 7.3, '1Y': -23.3 },
      priceHistory: { '1D': [8.29, 8.52, 8.7, 8.65, 8.56, 8.52, 8.56, 8.51, 8.52, 8.66, 8.73, 8.8, 8.76, 8.68, 8.71, 8.7, 8.7, 8.72, 8.78, 8.69, 8.7, 8.73, 8.91, 8.94], '1W': [7.33, 7.8, 8.26, 8.29, 8.94], '1M': [7.85, 7.21, 6.85, 6.75, 6.71, 6.74, 6.71, 6.63, 6.79, 6.79, 6.77, 6.95, 6.8, 6.17, 6.26, 7.86, 7.33, 7.8, 8.26, 8.29, 8.94], 'YTD': [8.33, 8.38, 8.54, 8.42, 7.79, 8.02, 7.48, 7.77, 7.44, 7.27, 7.04, 7.16, 6.78, 7.09, 6.7, 7.13, 6.9, 6.54, 6.76, 7.84, 7.36, 7.21, 6.71, 6.77, 7.86, 8.94], '6M': [8.17, 8.65, 8.32, 8.08, 7.69, 7.81, 7, 7.77, 7.44, 7.27, 7.04, 7.16, 6.78, 6.89, 6.78, 7.11, 6.81, 6.61, 7.9, 7.84, 7.36, 7.21, 6.71, 6.77, 7.86, 8.94], '1Y': [11.66, 11.29, 10.57, 10.67, 9.85, 9.96, 10.41, 10.27, 10.46, 10.17, 9.89, 9.52, 9.16, 9.41, 8.83, 8.88, 9.22, 8.63, 9.08, 8.73, 8.12, 8.53, 8.54, 8.49, 8.44, 8.35, 8.17, 8.65, 8.32, 8.08, 7.69, 7.81, 7, 7.73, 7.51, 6.98, 7.04, 7.16, 6.78, 6.89, 6.78, 7.11, 6.81, 6.61, 7.9, 8.12, 7.36, 7.21, 6.71, 6.77, 7.86, 8.94] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2B', pe: 11.6, revenueGrowth: 3, eps: 0.77, grossMargin: 34, dividendYield: 6.76,
      etfPresence: { BUZZ: false, MEME: 3.85, RKNG: false },
      tonyNote: 'WEN appears in 1 of 3 Meme ETFs (33% coverage) with average weight 3.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IBRX', name: 'IBRX', easyScore: 1, avgWeight: 3.76, proScore: 1.25, coverage: 0.333,
      price: 9.2, weeklyPrices: [7.79, 8.71, 8.77, 8.76, 9.20], weeklyChange: 18.1, dayChange: 5.08, sortRank: 0, periodReturns: { '1M': 27.1, 'YTD': 364.6, '6M': 364.6, '1Y': 248.5 },
      priceHistory: { '1D': [8.76, 8.76, 8.91, 9.02, 8.98, 8.85, 8.94, 8.95, 8.94, 8.97, 9.07, 9.22, 9.14, 9.27, 9.27, 9.11, 9.19, 9.11, 8.99, 8.97, 9.15, 9.2, 9.13, 9.2], '1W': [7.79, 8.71, 8.77, 8.76, 9.2], '1M': [7.24, 7.23, 7.18, 7.29, 6.92, 7.17, 7.25, 6.98, 7.2, 7.1, 6.72, 6.99, 7.36, 7.22, 7.32, 7.8, 7.79, 8.71, 8.77, 8.76, 9.2], 'YTD': [1.98, 2.24, 3.95, 6.45, 6.25, 6.05, 5.95, 9.83, 10.44, 8.45, 8.21, 9.4, 6.66, 7.08, 7.3, 8.2, 7.29, 7.43, 8.11, 8, 7.92, 7.23, 7.25, 6.72, 7.8, 9.2], '6M': [2.02, 2.33, 5.52, 6.21, 6.13, 6.93, 6.02, 9.83, 10.44, 8.45, 8.21, 9.4, 6.66, 6.86, 7.6, 8.1, 6.96, 7.58, 8.12, 8, 7.92, 7.23, 7.25, 6.72, 7.8, 9.2], '1Y': [2.64, 2.87, 2.83, 3.01, 2.46, 2.4, 2.82, 2.26, 2.34, 2.39, 2.59, 2.85, 2.46, 2.5, 2.44, 2.53, 2.36, 2.42, 2.15, 2.06, 2.14, 2.13, 2.3, 2.19, 2.09, 2.14, 2.02, 2.33, 5.52, 6.21, 6.13, 6.93, 6.02, 11.55, 10, 8.01, 8.21, 9.4, 6.66, 6.86, 7.6, 8.1, 6.96, 7.58, 8.12, 7.76, 7.92, 7.23, 7.25, 6.72, 7.8, 9.2] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$10B', pe: null, revenueGrowth: 168, eps: -0.85, grossMargin: 99, dividendYield: null,
      etfPresence: { BUZZ: 3.76, MEME: false, RKNG: false },
      tonyNote: 'IBRX appears in 1 of 3 Meme ETFs (33% coverage) with average weight 3.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
