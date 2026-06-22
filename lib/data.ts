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
export const SPY_RET: Record<Period, number> = { '1W': -1.4, '1M': -0.2, 'YTD': 9.1, '6M': 8.7, '1Y': 24 };
// @@END_GENERATED:SPY_RET@@

// Top holdings per ETF (ticker + portfolio weight %), shown on ETF row hover.
export type EtfHolding = { t: string; w: number };

// @@GENERATED:ETF_TOP_HOLDINGS@@
export const ETF_TOP_HOLDINGS: Record<string, EtfHolding[]> = {
  AIS: [{ t: 'MU', w: 7.0 }, { t: 'AMD', w: 4.6 }, { t: 'MRVL', w: 4.3 }, { t: 'VRT', w: 3.6 }, { t: 'SIMO', w: 3.5 }],
  ARTY: [{ t: 'MU', w: 5.1 }, { t: 'CRWV', w: 4.8 }, { t: 'AMD', w: 4.6 }, { t: 'MRVL', w: 4.5 }, { t: 'AVGO', w: 4.4 }],
  BAI: [{ t: 'MU', w: 6.4 }, { t: 'AMD', w: 4.7 }, { t: 'LRCX', w: 4.6 }, { t: 'TSM', w: 4.3 }, { t: 'AVGO', w: 4.2 }],
  IGPT: [{ t: 'MU', w: 13.0 }, { t: 'INTC', w: 7.4 }, { t: 'AMD', w: 7.1 }, { t: 'GOOGL', w: 5.6 }, { t: 'NVDA', w: 5.3 }],
  IVES: [{ t: 'MU', w: 6.8 }, { t: 'TSM', w: 5.3 }, { t: 'AMD', w: 5.2 }, { t: 'NVDA', w: 4.7 }, { t: 'AAPL', w: 4.7 }],
  ALAI: [{ t: 'NVDA', w: 12.6 }, { t: 'TSM', w: 5.5 }, { t: 'AMZN', w: 5.4 }, { t: 'WDC', w: 5.0 }, { t: 'NBIS', w: 4.9 }],
  CHAT: [{ t: 'NVDA', w: 6.4 }, { t: 'GOOGL', w: 5.1 }, { t: 'AVGO', w: 4.1 }, { t: 'MU', w: 4.1 }, { t: 'AMD', w: 3.9 }],
  AIFD: [{ t: 'MU', w: 7.1 }, { t: 'MRVL', w: 6.5 }, { t: 'NVDA', w: 6.4 }, { t: 'DOCN', w: 5.7 }, { t: 'LITE', w: 5.6 }],
  SPRX: [{ t: 'ARM', w: 9.0 }, { t: 'ALAB', w: 8.5 }, { t: 'COHR', w: 8.3 }, { t: 'KLAC', w: 7.6 }, { t: 'MKSI', w: 6.2 }],
  AOTG: [{ t: 'AMD', w: 16.2 }, { t: 'MU', w: 11.2 }, { t: 'NVDA', w: 10.5 }, { t: 'TSM', w: 7.5 }, { t: 'TOST', w: 4.4 }],
  SOXX: [{ t: 'MU', w: 8.4 }, { t: 'AMD', w: 7.5 }, { t: 'NVDA', w: 7.2 }, { t: 'AVGO', w: 6.6 }, { t: 'INTC', w: 6.1 }],
  PSI: [{ t: 'AMAT', w: 6.2 }, { t: 'KLAC', w: 5.9 }, { t: 'MU', w: 5.8 }, { t: 'LRCX', w: 5.5 }, { t: 'INTC', w: 4.9 }],
  XSD: [{ t: 'ALGM', w: 2.7 }, { t: 'WOLF', w: 2.7 }, { t: 'MU', w: 2.6 }, { t: 'ALAB', w: 2.6 }, { t: 'INTC', w: 2.6 }],
  DRAM: [{ t: 'SNDK', w: 5.5 }, { t: 'WDC', w: 4.4 }, { t: 'STX', w: 4.3 }, { t: 'MU', w: 3.7 }],
  PTF: [{ t: 'SNDK', w: 9.2 }, { t: 'WDC', w: 6.1 }, { t: 'STX', w: 5.3 }, { t: 'MU', w: 5.2 }, { t: 'NVDA', w: 4.2 }],
  WCLD: [{ t: 'DOCN', w: 3.9 }, { t: 'FROG', w: 3.2 }, { t: 'PANW', w: 2.8 }, { t: 'CRWD', w: 2.5 }, { t: 'TWLO', w: 2.4 }],
  IGV: [{ t: 'PANW', w: 8.9 }, { t: 'PLTR', w: 8.6 }, { t: 'MSFT', w: 8.3 }, { t: 'ORCL', w: 8.0 }, { t: 'CRWD', w: 6.6 }],
  FDTX: [{ t: 'MU', w: 9.4 }, { t: 'MRVL', w: 8.1 }, { t: 'TSM', w: 6.0 }, { t: 'NVDA', w: 4.6 }, { t: 'STX', w: 4.0 }],
  GTEK: [{ t: 'MRVL', w: 4.8 }, { t: 'DELL', w: 2.9 }, { t: 'CDNS', w: 2.4 }, { t: 'APH', w: 2.3 }, { t: 'TER', w: 2.0 }],
  ARKK: [{ t: 'TSLA', w: 9.7 }, { t: 'HOOD', w: 5.0 }, { t: 'TEM', w: 4.9 }, { t: 'CRSP', w: 4.9 }, { t: 'AMD', w: 4.6 }],
  MARS: [{ t: 'SPCX', w: 24.1 }, { t: 'RKLB', w: 10.5 }, { t: 'ASTS', w: 7.1 }, { t: 'PL', w: 4.2 }, { t: 'GSAT', w: 4.2 }],
  FRWD: [{ t: 'STX', w: 8.6 }, { t: 'NVDA', w: 8.2 }, { t: 'AMD', w: 7.1 }, { t: 'TSM', w: 5.9 }, { t: 'WDC', w: 5.9 }],
  BCTK: [{ t: 'SPCX', w: 9.7 }, { t: 'TSM', w: 8.4 }, { t: 'LRCX', w: 7.7 }, { t: 'AVGO', w: 6.8 }, { t: 'NVDA', w: 5.8 }],
  FWD: [{ t: 'SPCX', w: 2.1 }, { t: 'AMD', w: 2.1 }, { t: 'AMAT', w: 2.0 }, { t: 'GOOGL', w: 2.0 }, { t: 'LRCX', w: 1.9 }],
  CBSE: [{ t: 'BFLY', w: 3.9 }, { t: 'LRCX', w: 3.0 }, { t: 'TXG', w: 3.0 }, { t: 'KLAC', w: 2.9 }, { t: 'KRYS', w: 2.9 }],
  FCUS: [{ t: 'WDC', w: 5.4 }, { t: 'STX', w: 5.0 }, { t: 'SNDK', w: 4.9 }, { t: 'INTC', w: 4.8 }, { t: 'DELL', w: 4.5 }],
  WGMI: [{ t: 'CIFR', w: 18.0 }, { t: 'IREN', w: 12.0 }, { t: 'WULF', w: 9.7 }, { t: 'CORZ', w: 7.3 }, { t: 'KEEL', w: 7.3 }],
  CNEQ: [{ t: 'NVDA', w: 13.5 }, { t: 'MSFT', w: 6.2 }, { t: 'WDC', w: 6.2 }, { t: 'TSM', w: 5.9 }, { t: 'GOOG', w: 5.8 }],
  SGRT: [{ t: 'WDC', w: 9.9 }, { t: 'LITE', w: 8.1 }, { t: 'MU', w: 7.5 }, { t: 'DELL', w: 6.7 }, { t: 'NVDA', w: 6.4 }],
  SPMO: [{ t: 'MU', w: 11.8 }, { t: 'NVDA', w: 7.9 }, { t: 'AVGO', w: 6.6 }, { t: 'GOOGL', w: 4.4 }, { t: 'LRCX', w: 4.1 }],
  XMMO: [{ t: 'CW', w: 3.9 }, { t: 'FLEX', w: 3.9 }, { t: 'STRL', w: 3.4 }, { t: 'TTMI', w: 3.3 }, { t: 'ATI', w: 3.2 }],
  POW: [{ t: 'POWL', w: 4.7 }, { t: 'PWR', w: 4.7 }, { t: 'PRY', w: 4.3 }, { t: 'ETN', w: 3.9 }, { t: 'NVT', w: 3.8 }],
  VOLT: [{ t: 'BELFB', w: 7.6 }, { t: 'POWL', w: 7.3 }, { t: 'ETN', w: 5.4 }, { t: 'PWR', w: 5.2 }, { t: 'NEE', w: 4.9 }],
  PBD: [{ t: 'SEDG', w: 1.1 }, { t: 'RIVN', w: 1.1 }],
  PBW: [{ t: 'HYLN', w: 4.9 }, { t: 'FCEL', w: 4.1 }, { t: 'NVTS', w: 3.0 }, { t: 'BE', w: 2.6 }, { t: 'ASPN', w: 2.2 }],
  IVEP: [{ t: 'BE', w: 5.8 }, { t: 'GEV', w: 4.2 }, { t: 'VRT', w: 4.2 }, { t: 'PWR', w: 4.2 }, { t: 'SBGSY', w: 4.1 }],
  AIRR: [{ t: 'STRL', w: 6.3 }, { t: 'FIX', w: 4.5 }, { t: 'AGX', w: 4.5 }, { t: 'CHRW', w: 4.1 }, { t: 'MTZ', w: 3.9 }],
  PRN: [{ t: 'TTMI', w: 6.6 }, { t: 'FIX', w: 4.8 }, { t: 'AGX', w: 4.6 }, { t: 'STRL', w: 4.3 }, { t: 'VICR', w: 4.3 }],
  IDEF: [{ t: 'RTX', w: 8.1 }, { t: 'LMT', w: 6.8 }, { t: 'GD', w: 5.8 }, { t: 'BA', w: 5.0 }, { t: 'NOC', w: 4.8 }],
  BILT: [{ t: 'UNP', w: 5.6 }, { t: 'AENA', w: 4.5 }, { t: 'AEP', w: 4.3 }, { t: 'XEL', w: 3.9 }, { t: 'LNG', w: 3.5 }],
  BUZZ: [{ t: 'MU', w: 4.3 }, { t: 'NBIS', w: 3.8 }, { t: 'AMD', w: 3.5 }, { t: 'INTC', w: 3.4 }, { t: 'SOFI', w: 3.3 }],
  MEME: [{ t: 'AAOI', w: 7.7 }, { t: 'NBIS', w: 6.8 }, { t: 'RDW', w: 6.8 }, { t: 'BE', w: 6.7 }, { t: 'SNDK', w: 6.5 }],
  RKNG: [{ t: 'SNDK', w: 6.9 }, { t: 'WDC', w: 6.0 }, { t: 'NBIS', w: 5.8 }, { t: 'MU', w: 5.7 }, { t: 'NVTS', w: 5.1 }],
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
  RSHO: { name: "Tema US Manufacturing & Reshoring ETF", manager: "Tema Global Limited", aum: 274074464 },
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
  'AI & ML':         { '1W': 2.5, '1M': 11.9, 'YTD': 58.2, '6M': 56.3, '1Y': 103.7 },
  'Semiconductors':  { '1W': 6.3, '1M': 25.5, 'YTD': 135.9, '6M': 132.5, '1Y': 192.8 },
  'Broad Tech':      { '1W': -0.1, '1M': 5, 'YTD': 34.1, '6M': 30.5, '1Y': 61.5 },
  'Electrification': { '1W': 2.2, '1M': 0.5, 'YTD': 36.2, '6M': 33.7, '1Y': 65.2 },
  'Industrials':     { '1W': 1.6, '1M': 4.3, 'YTD': 27.2, '6M': 25, '1Y': 46 },
  'Meme':            { '1W': 0.1, '1M': 0.8, 'YTD': 33.6, '6M': 25.8, '1Y': 18.4 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, IndexChartByPeriod> = {
  'AI & ML': {
    '1D': { top10: [100, 100.92, 101.51, 101.24, 100.6, 100.25, 100.48, 100.22, 100.26, 99.83, 99.95, 99.91, 100.07, 100.03, 100.24, 100.36, 100.63, 100.79, 100.78, 100.68, 100.47, 100.4, 100.39, 100.9], spy: [100, 100.2, 100.39, 100.23, 99.83, 99.61, 99.7, 99.69, 99.89, 99.6, 99.76, 99.69, 99.78, 99.71, 99.73, 99.74, 99.7, 99.8, 99.76, 99.64, 99.62, 99.55, 99.6, 99.67], top10Return: 0.8, spyReturn: -0.33, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 97.06, 97.54, 101.72, 102.53], spy: [100, 99.4, 98.16, 98.93, 98.6], top10Return: 2.5, spyReturn: -1.4, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 104, 103.81, 105.7, 106.66, 109.81, 111.83, 110.77, 109.07, 99.74, 102.89, 102.89, 100.85, 97.67, 102.94, 103.65, 109.09, 105.86, 106.4, 111, 111.93], spy: [100, 100.66, 100.65, 101.2, 101.45, 101.73, 101.87, 101.15, 101.54, 98.92, 99.14, 99.14, 98.85, 97.29, 98.94, 99.48, 101.23, 100.63, 99.37, 100.15, 99.82], top10Return: 11.9, spyReturn: -0.2, xLabels: ["May 25", "Jun 1", "Jun 8", "Jun 15", "Jun 22"] },
    'YTD': { top10: [100, 102.26, 103.69, 105.17, 107.24, 98.89, 104.07, 103.31, 105.93, 102.14, 103.25, 103.44, 100.88, 97.05, 106.31, 113.76, 117.72, 119.14, 125.68, 138.29, 132.15, 140.17, 153.97, 144.36, 145.71, 158.17], spy: [100, 101.11, 101.24, 101.04, 101.78, 100.63, 101.47, 100.38, 101.65, 100.47, 99.18, 98.37, 95.79, 95.37, 99.13, 101.84, 103.25, 104.37, 105.29, 108.41, 108.32, 109.34, 111.24, 108.4, 108.77, 109.15], top10Return: 58.2, spyReturn: 9.1, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 99.64, 102.66, 102.31, 103.79, 105.83, 95.89, 102.73, 101.97, 103.15, 99.95, 98.99, 102.06, 95.72, 98.5, 106.61, 116.15, 121.35, 123.27, 129.07, 137.81, 137.11, 147.74, 138, 143.95, 156.3], spy: [100, 100.32, 100.69, 100.81, 100.61, 101.34, 98.95, 101.04, 99.95, 100.65, 99.49, 97.26, 96.35, 94.2, 95.77, 99.22, 103.7, 104.25, 105.23, 106.83, 109.25, 108.45, 110.46, 107.7, 108.31, 108.68], top10Return: 56.3, spyReturn: 8.7, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 105.7, 105.33, 106.83, 107.74, 111.22, 111.55, 112.94, 114.03, 111.87, 112.07, 117.88, 123, 125.83, 125.35, 129.17, 130.87, 130.66, 136.38, 138.06, 134.39, 124.89, 124.18, 128.49, 132.13, 125.03, 129.37, 128.88, 132.87, 132.49, 134.47, 137.13, 124.24, 130.46, 133.29, 132.07, 129.55, 128.34, 132.42, 124.14, 127.74, 138.4, 150.73, 157.55, 159.99, 173.53, 179.14, 178.28, 192.13, 179.46, 187.4, 203.67], spy: [100, 102.95, 103.36, 103.66, 104.78, 105.85, 105.17, 105.96, 107.19, 107.05, 106.68, 108.36, 109.97, 110.51, 111, 111.49, 110.48, 111.86, 114.18, 113.86, 113.54, 110.92, 111.43, 113.56, 113.81, 113.12, 114.11, 114.47, 114.9, 115.03, 114.8, 115.64, 112.91, 113.52, 114.88, 114.3, 113.52, 110.98, 109.94, 107.49, 109.28, 113.22, 118.33, 118.96, 120.08, 122.91, 124.66, 123.76, 126.05, 122.89, 123.59, 124.02], top10Return: 103.7, spyReturn: 24, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Semiconductors': {
    '1D': { top10: [100, 101.88, 102.97, 102.96, 102.4, 101.81, 102.5, 102.18, 102.37, 101.82, 102.27, 102.3, 102.49, 102.28, 102.65, 102.66, 102.92, 102.98, 102.77, 102.59, 102.46, 102.42, 102.57, 103.28], spy: [100, 100.2, 100.39, 100.23, 99.83, 99.61, 99.7, 99.69, 99.89, 99.6, 99.76, 99.69, 99.78, 99.71, 99.73, 99.74, 99.7, 99.8, 99.76, 99.64, 99.62, 99.55, 99.6, 99.67], top10Return: 3.3, spyReturn: -0.33, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 94.79, 95.77, 102.96, 106.37], spy: [100, 99.4, 98.16, 98.93, 98.6], top10Return: 6.3, spyReturn: -1.4, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 107.62, 106.74, 107.98, 107.03, 108.66, 113.85, 115.17, 112.07, 98.77, 104.72, 104.72, 103.09, 99.59, 109.37, 110.89, 117.6, 111.53, 112.8, 121.38, 125.52], spy: [100, 100.66, 100.65, 101.2, 101.45, 101.73, 101.87, 101.15, 101.54, 98.92, 99.14, 99.14, 98.85, 97.29, 98.94, 99.48, 101.23, 100.63, 99.37, 100.15, 99.82], top10Return: 25.5, spyReturn: -0.2, xLabels: ["May 25", "Jun 1", "Jun 8", "Jun 15", "Jun 22"] },
    'YTD': { top10: [100, 107.01, 112.38, 117.59, 120.25, 114.72, 124.7, 122.12, 125.62, 120.82, 126.4, 126.36, 135.66, 131.67, 138.4, 144.55, 154.7, 165.39, 176.71, 201.12, 187.09, 194.8, 201.56, 206.16, 212.81, 235.97], spy: [100, 101.11, 101.24, 101.04, 101.78, 100.63, 101.47, 100.38, 101.65, 100.47, 99.18, 98.37, 95.79, 95.37, 99.13, 101.84, 103.25, 104.37, 105.29, 108.41, 108.32, 109.34, 111.24, 108.4, 108.77, 109.15], top10Return: 135.9, spyReturn: 9.1, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 100.92, 108.93, 111.67, 117.07, 118.41, 115.34, 122.69, 120.37, 122.82, 123.78, 121.99, 132.64, 130.23, 129.5, 138.75, 150.16, 170.49, 174.6, 186.92, 192.67, 187.74, 199.72, 196.36, 209.64, 232.54], spy: [100, 100.32, 100.69, 100.81, 100.61, 101.34, 98.95, 101.04, 99.95, 100.65, 99.49, 97.26, 96.35, 94.2, 95.77, 99.22, 103.7, 104.25, 105.23, 106.83, 109.25, 108.45, 110.46, 107.7, 108.31, 108.68], top10Return: 132.5, spyReturn: 8.7, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 105.3, 107.48, 110.43, 110.31, 111, 110.71, 112.88, 114.69, 116.03, 114.6, 117.81, 123.57, 126.9, 127.1, 131.27, 131.59, 135.74, 139.37, 140.75, 140.65, 135.76, 139.03, 143.04, 153.32, 149.88, 152.25, 150.76, 155.74, 156.46, 162.48, 165.84, 161.44, 167.15, 175.19, 173.16, 169.35, 167.12, 175.57, 174.34, 177.73, 188.5, 191.5, 213.35, 213.67, 239.73, 242.33, 247.4, 255.42, 245.04, 270.93, 292.73], spy: [100, 102.95, 103.36, 103.66, 104.78, 105.85, 105.17, 105.96, 107.19, 107.05, 106.68, 108.36, 109.97, 110.51, 111, 111.49, 110.48, 111.86, 114.18, 113.86, 113.54, 110.92, 111.43, 113.56, 113.81, 113.12, 114.11, 114.47, 114.9, 115.03, 114.8, 115.64, 112.91, 113.52, 114.88, 114.3, 113.52, 110.98, 109.94, 107.49, 109.28, 113.22, 118.33, 118.96, 120.08, 122.91, 124.66, 123.76, 126.05, 122.89, 123.59, 124.02], top10Return: 192.8, spyReturn: 24, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Broad Tech': {
    '1D': { top10: [100, 100.61, 100.95, 100.36, 100.18, 99.75, 99.68, 99.79, 99.85, 99.65, 99.52, 99.37, 99.43, 99.41, 99.5, 99.5, 99.7, 99.92, 100.05, 99.81, 99.58, 99.58, 99.52, 99.68], spy: [100, 100.2, 100.39, 100.23, 99.83, 99.61, 99.7, 99.69, 99.89, 99.6, 99.76, 99.69, 99.78, 99.71, 99.73, 99.74, 99.7, 99.8, 99.76, 99.64, 99.62, 99.55, 99.6, 99.67], top10Return: -0.4, spyReturn: -0.33, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 98.37, 97.98, 100.22, 99.87], spy: [100, 99.4, 98.16, 98.93, 98.6], top10Return: -0.1, spyReturn: -1.4, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 103.07, 103.02, 104.45, 104.96, 106.64, 107.93, 106.59, 106.18, 98.86, 100.7, 100.7, 98.91, 96.51, 100.75, 101.31, 104.94, 103.21, 102.83, 105.27, 105], spy: [100, 100.66, 100.65, 101.2, 101.45, 101.73, 101.87, 101.15, 101.54, 98.92, 99.14, 99.14, 98.85, 97.29, 98.94, 99.48, 101.23, 100.63, 99.37, 100.15, 99.82], top10Return: 5, spyReturn: -0.2, xLabels: ["May 25", "Jun 1", "Jun 8", "Jun 15", "Jun 22"] },
    'YTD': { top10: [100, 103.06, 104.75, 105, 104.81, 98.7, 102.2, 102.86, 105.07, 103.61, 102.86, 103.03, 100.27, 97.62, 104.88, 109.32, 113.48, 113.39, 119.59, 127.75, 122.81, 126.58, 134.33, 128.33, 129.52, 134.06], spy: [100, 101.11, 101.24, 101.04, 101.78, 100.63, 101.47, 100.38, 101.65, 100.47, 99.18, 98.37, 95.79, 95.37, 99.13, 101.84, 103.25, 104.37, 105.29, 108.41, 108.32, 109.34, 111.24, 108.4, 108.77, 109.15], top10Return: 34.1, spyReturn: 9.1, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 98.23, 101.67, 102.04, 102.15, 101.97, 93.99, 100.3, 100.37, 102.26, 100.37, 98.13, 99, 95.25, 97.9, 102.8, 110.94, 113.24, 115.53, 120.77, 124.3, 122.37, 128.53, 122.84, 126.17, 130.55], spy: [100, 100.32, 100.69, 100.81, 100.61, 101.34, 98.95, 101.04, 99.95, 100.65, 99.49, 97.26, 96.35, 94.2, 95.77, 99.22, 103.7, 104.25, 105.23, 106.83, 109.25, 108.45, 110.46, 107.7, 108.31, 108.68], top10Return: 30.5, spyReturn: 8.7, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 104.18, 105.11, 105.71, 107.89, 108.3, 107.98, 107.28, 109.76, 108.88, 109.92, 113.03, 117.42, 120.42, 120.88, 124.75, 127.18, 127.4, 130.05, 130.83, 126.88, 117.65, 118.2, 120.75, 123.5, 118.24, 121.37, 119.76, 123.42, 125.72, 125.78, 127.37, 117.81, 122.24, 124.46, 125.08, 123.87, 121.32, 125.08, 122.7, 124.64, 129.81, 136.71, 139.12, 140.71, 148.88, 150.86, 150.43, 157.66, 150.55, 155.39, 161.51], spy: [100, 102.95, 103.36, 103.66, 104.78, 105.85, 105.17, 105.96, 107.19, 107.05, 106.68, 108.36, 109.97, 110.51, 111, 111.49, 110.48, 111.86, 114.18, 113.86, 113.54, 110.92, 111.43, 113.56, 113.81, 113.12, 114.11, 114.47, 114.9, 115.03, 114.8, 115.64, 112.91, 113.52, 114.88, 114.3, 113.52, 110.98, 109.94, 107.49, 109.28, 113.22, 118.33, 118.96, 120.08, 122.91, 124.66, 123.76, 126.05, 122.89, 123.59, 124.02], top10Return: 61.5, spyReturn: 24, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Electrification': {
    '1D': { top10: [100, 100.86, 100.93, 100.54, 100.7, 100.4, 100.7, 100.75, 100.81, 100.82, 100.74, 100.72, 100.95, 100.89, 100.9, 101.06, 101.21, 101.41, 101.46, 101.43, 101.25, 101.15, 101.09, 101.14], spy: [100, 100.2, 100.39, 100.23, 99.83, 99.61, 99.7, 99.69, 99.89, 99.6, 99.76, 99.69, 99.78, 99.71, 99.73, 99.74, 99.7, 99.8, 99.76, 99.64, 99.62, 99.55, 99.6, 99.67], top10Return: 1.1, spyReturn: -0.33, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 98.96, 98.92, 101.19, 102.23], spy: [100, 99.4, 98.16, 98.93, 98.6], top10Return: 2.2, spyReturn: -1.4, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 103.05, 102.2, 102.28, 101.2, 100.87, 102.97, 101.89, 101.8, 95.49, 95.6, 95.6, 94.47, 91.42, 95.16, 96.06, 98.23, 97.23, 97.2, 99.42, 100.46], spy: [100, 100.66, 100.65, 101.2, 101.45, 101.73, 101.87, 101.15, 101.54, 98.92, 99.14, 99.14, 98.85, 97.29, 98.94, 99.48, 101.23, 100.63, 99.37, 100.15, 99.82], top10Return: 0.5, spyReturn: -0.2, xLabels: ["May 25", "Jun 1", "Jun 8", "Jun 15", "Jun 22"] },
    'YTD': { top10: [100, 103.61, 107.58, 111.38, 112.77, 111.72, 116.36, 114.95, 119.01, 114.25, 114.53, 114.69, 114.62, 112.71, 117.23, 122.78, 124.83, 127.64, 132.57, 139.28, 129.6, 134.52, 136.57, 130.26, 130.8, 136.21], spy: [100, 101.11, 101.24, 101.04, 101.78, 100.63, 101.47, 100.38, 101.65, 100.47, 99.18, 98.37, 95.79, 95.37, 99.13, 101.84, 103.25, 104.37, 105.29, 108.41, 108.32, 109.34, 111.24, 108.4, 108.77, 109.15], top10Return: 36.2, spyReturn: 9.1, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 99.49, 102.53, 105.43, 109.52, 110.76, 108.15, 113.58, 113.7, 116.15, 110.5, 110.28, 112.53, 110.02, 110.87, 117.94, 122.9, 127.34, 130.42, 132.36, 133.6, 130.25, 133.97, 127.47, 128.34, 133.67], spy: [100, 100.32, 100.69, 100.81, 100.61, 101.34, 98.95, 101.04, 99.95, 100.65, 99.49, 97.26, 96.35, 94.2, 95.77, 99.22, 103.7, 104.25, 105.23, 106.83, 109.25, 108.45, 110.46, 107.7, 108.31, 108.68], top10Return: 33.7, spyReturn: 8.7, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.84, 105.82, 107.47, 111.4, 109.33, 108.46, 110.7, 112.91, 113.31, 111.93, 112.22, 116.03, 118.87, 119.32, 125.78, 128.88, 130.86, 130.88, 131.28, 133.41, 126.4, 124.84, 129.46, 130.81, 129.26, 132.57, 128.78, 130.6, 134.5, 139.35, 139.37, 136.11, 137.93, 140.41, 141.05, 138.24, 139.58, 141.87, 141.36, 144.32, 149.69, 155.59, 157.18, 157.41, 162.68, 165.46, 163.14, 166.65, 159.48, 160.78, 165.17], spy: [100, 102.95, 103.36, 103.66, 104.78, 105.85, 105.17, 105.96, 107.19, 107.05, 106.68, 108.36, 109.97, 110.51, 111, 111.49, 110.48, 111.86, 114.18, 113.86, 113.54, 110.92, 111.43, 113.56, 113.81, 113.12, 114.11, 114.47, 114.9, 115.03, 114.8, 115.64, 112.91, 113.52, 114.88, 114.3, 113.52, 110.98, 109.94, 107.49, 109.28, 113.22, 118.33, 118.96, 120.08, 122.91, 124.66, 123.76, 126.05, 122.89, 123.59, 124.02], top10Return: 65.2, spyReturn: 24, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Industrials': {
    '1D': { top10: [100, 100.1, 99.92, 99.92, 99.82, 99.8, 99.97, 100.11, 100.2, 100, 99.96, 100.15, 100.44, 100.38, 100.38, 100.51, 100.6, 100.68, 100.77, 100.73, 100.7, 100.73, 100.84, 100.92], spy: [100, 100.2, 100.39, 100.23, 99.83, 99.61, 99.7, 99.69, 99.89, 99.6, 99.76, 99.69, 99.78, 99.71, 99.73, 99.74, 99.7, 99.8, 99.76, 99.64, 99.62, 99.55, 99.6, 99.67], top10Return: 0.8, spyReturn: -0.33, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 100.4, 100.12, 100.44, 101.57], spy: [100, 99.4, 98.16, 98.93, 98.6], top10Return: 1.6, spyReturn: -1.4, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 101.5, 102.19, 102.96, 102.64, 101.69, 102.21, 101.89, 102.82, 101.25, 101.13, 101.2, 100.47, 98.97, 102.24, 102.51, 102.57, 102.99, 102.72, 103.08, 104.29], spy: [100, 100.66, 100.65, 101.2, 101.45, 101.73, 101.87, 101.15, 101.54, 98.92, 99.14, 99.14, 98.85, 97.29, 98.94, 99.48, 101.23, 100.63, 99.37, 100.15, 99.82], top10Return: 4.3, spyReturn: -0.2, xLabels: ["May 25", "Jun 1", "Jun 8", "Jun 15", "Jun 22"] },
    'YTD': { top10: [100, 105.14, 108.87, 111.3, 111.44, 111.87, 117.09, 118.9, 119.24, 118.02, 113.96, 113.19, 112.37, 109.63, 116.88, 120.62, 119.61, 119.73, 121.03, 124.88, 120.79, 121.81, 123.22, 122.14, 124.66, 127.24], spy: [100, 101.11, 101.24, 101.04, 101.78, 100.63, 101.47, 100.38, 101.65, 100.47, 99.18, 98.37, 95.79, 95.37, 99.13, 101.84, 103.25, 104.37, 105.29, 108.41, 108.32, 109.34, 111.24, 108.4, 108.77, 109.15], top10Return: 27.2, spyReturn: 9.1, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 99.54, 102.92, 106.96, 108.75, 109.24, 108.88, 114.76, 116.89, 117.63, 113.34, 110.33, 110.28, 108.79, 110.89, 116.56, 118.08, 118.12, 119.5, 121.76, 122.77, 118.88, 122.9, 121.05, 122.49, 124.95], spy: [100, 100.32, 100.69, 100.81, 100.61, 101.34, 98.95, 101.04, 99.95, 100.65, 99.49, 97.26, 96.35, 94.2, 95.77, 99.22, 103.7, 104.25, 105.23, 106.83, 109.25, 108.45, 110.46, 107.7, 108.31, 108.68], top10Return: 25, spyReturn: 8.7, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.84, 103.73, 104.32, 105.05, 106.86, 106.05, 106.71, 107.59, 108.14, 108.17, 108.52, 111.12, 113.16, 113.64, 114.98, 113.89, 115.09, 116.93, 117.02, 115.27, 109.48, 109.68, 111.68, 113.81, 114.42, 116.86, 115.51, 120.31, 125.12, 128.21, 128.44, 128.63, 133.34, 137.13, 135.08, 130.73, 126.86, 127.98, 127.4, 129.45, 135.83, 137.41, 138.36, 140.18, 141.85, 143.39, 138.54, 143.14, 140.84, 141.72, 145.97], spy: [100, 102.95, 103.36, 103.66, 104.78, 105.85, 105.17, 105.96, 107.19, 107.05, 106.68, 108.36, 109.97, 110.51, 111, 111.49, 110.48, 111.86, 114.18, 113.86, 113.54, 110.92, 111.43, 113.56, 113.81, 113.12, 114.11, 114.47, 114.9, 115.03, 114.8, 115.64, 112.91, 113.52, 114.88, 114.3, 113.52, 110.98, 109.94, 107.49, 109.28, 113.22, 118.33, 118.96, 120.08, 122.91, 124.66, 123.76, 126.05, 122.89, 123.59, 124.02], top10Return: 46, spyReturn: 24, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Meme': {
    '1D': { top10: [100, 100.31, 101.4, 100.86, 99.45, 99.47, 98.83, 99.29, 99.36, 99.22, 99, 98.87, 99.11, 99.38, 99.7, 99.84, 100.54, 100.9, 100.91, 100.12, 99.79, 99.6, 99.5, 99.63], spy: [100, 100.2, 100.39, 100.23, 99.83, 99.61, 99.7, 99.69, 99.89, 99.6, 99.76, 99.69, 99.78, 99.71, 99.73, 99.74, 99.7, 99.8, 99.76, 99.64, 99.62, 99.55, 99.6, 99.67], top10Return: 0.3, spyReturn: -0.33, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 96.07, 96.66, 100.08, 100.15], spy: [100, 99.4, 98.16, 98.93, 98.6], top10Return: 0.1, spyReturn: -1.4, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 103.32, 104.86, 106.77, 105.4, 105.62, 108.17, 104.42, 104.97, 94.31, 96.72, 96.72, 93.31, 90.73, 96.56, 95.36, 100.66, 96.75, 97.33, 100.78, 100.84], spy: [100, 100.66, 100.65, 101.2, 101.45, 101.73, 101.87, 101.15, 101.54, 98.92, 99.14, 99.14, 98.85, 97.29, 98.94, 99.48, 101.23, 100.63, 99.37, 100.15, 99.82], top10Return: 0.8, spyReturn: -0.2, xLabels: ["May 25", "Jun 1", "Jun 8", "Jun 15", "Jun 22"] },
    'YTD': { top10: [100, 108.03, 108.62, 108.21, 102.73, 94.98, 95.31, 95.05, 96.34, 96.03, 94.48, 93.47, 92.45, 90.16, 98.8, 109.79, 112.61, 109.44, 117.57, 129.64, 120.64, 135.76, 140.91, 127.35, 128.47, 133.62], spy: [100, 101.11, 101.24, 101.04, 101.78, 100.63, 101.47, 100.38, 101.65, 100.47, 99.18, 98.37, 95.79, 95.37, 99.13, 101.84, 103.25, 104.37, 105.29, 108.41, 108.32, 109.34, 111.24, 108.4, 108.77, 109.15], top10Return: 33.6, spyReturn: 9.1, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 95.32, 98.97, 101.18, 99.39, 96.26, 84.54, 89.64, 90.21, 90.92, 88.25, 85.09, 88.96, 86.28, 90.25, 97.69, 106.63, 106.13, 109.58, 115.01, 119.84, 125.39, 133, 117.61, 120.99, 125.74], spy: [100, 100.32, 100.69, 100.81, 100.61, 101.34, 98.95, 101.04, 99.95, 100.65, 99.49, 97.26, 96.35, 94.2, 95.77, 99.22, 103.7, 104.25, 105.23, 106.83, 109.25, 108.45, 110.46, 107.7, 108.31, 108.68], top10Return: 25.8, spyReturn: 8.7, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 103.86, 101.66, 96.92, 97.52, 92.63, 92.03, 90.51, 87.28, 84.63, 85.31, 87.81, 91.36, 93.01, 89.25, 91.97, 92.53, 91.15, 96.62, 96.92, 95.09, 90.67, 88.57, 84.75, 86.15, 87.12, 89.39, 89.95, 93.34, 94.63, 93.71, 94.1, 90.21, 89.13, 89.69, 91.43, 94.09, 99.01, 101.41, 98.03, 94.35, 100.49, 110.71, 112.31, 112.23, 114.68, 117.88, 116.3, 116.69, 113.1, 113.48, 118.41], spy: [100, 102.95, 103.36, 103.66, 104.78, 105.85, 105.17, 105.96, 107.19, 107.05, 106.68, 108.36, 109.97, 110.51, 111, 111.49, 110.48, 111.86, 114.18, 113.86, 113.54, 110.92, 111.43, 113.56, 113.81, 113.12, 114.11, 114.47, 114.9, 115.03, 114.8, 115.64, 112.91, 113.52, 114.88, 114.3, 113.52, 110.98, 109.94, 107.49, 109.28, 113.22, 118.33, 118.96, 120.08, 122.91, 124.66, 123.76, 126.05, 122.89, 123.59, 124.02], top10Return: 18.4, spyReturn: 24, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
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
export const SCAN_TIMESTAMP    = '2026-06-22T20:08:22.536Z';
export const SCAN_TIMESTAMP_NY = 'June 22, 2026 at 4:08 PM ET';
// @@END_GENERATED:SCAN_TIMESTAMP@@

// Number of ETFs per theme — denominator for Coverage Score display (x/n badge)
// @@GENERATED:THEME_ETF_COUNT@@
export const THEME_ETF_COUNT: Record<Theme, number> = {
  'AI & ML':         10,
  'Semiconductors':  4,
  'Broad Tech':      17,
  'Electrification': 5,
  'Industrials':     4,
  'Meme':            3,
};
// @@END_GENERATED:THEME_ETF_COUNT@@

// @@GENERATED:HOLDINGS_COUNT@@
// Total holdings rows across all theme ETFs (every position, counting a stock
// once per ETF that holds it). Powers the home carousel's "shares tracked" stat.
export const HOLDINGS_COUNT = 1204;
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
  { ticker: 'MU', name: `Micron Technology Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 14.16, bestProScore: 6.07, avgProScore: 4.72, price: 1211.38, weeklyChange: 11.34 },
  { ticker: 'NVDA', name: `NVIDIA Corp`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 12.76, bestProScore: 6.01, avgProScore: 4.25, price: 208.65, weeklyChange: -1.79 },
  { ticker: 'AMD', name: `Advanced Micro Devices Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 10.13, bestProScore: 4.79, avgProScore: 3.38, price: 551.63, weeklyChange: 0.80 },
  { ticker: 'AVGO', name: `Broadcom Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 6.69, bestProScore: 2.89, avgProScore: 2.23, price: 392.13, weeklyChange: -0.46 },
  { ticker: 'INTC', name: `INTEL CORPORATION`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.92, bestProScore: 3.40, avgProScore: 2.46, price: 140.94, weeklyChange: 10.23 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.72, bestProScore: 2.93, avgProScore: 2.36, price: 467.74, weeklyChange: 5.97 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.33, bestProScore: 2.34, avgProScore: 2.17, price: 307.86, weeklyChange: -0.33 },
  { ticker: 'WDC', name: `Western Digital Corp`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.18, bestProScore: 2.34, avgProScore: 2.09, price: 732.62, weeklyChange: 12.10 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 3.81, bestProScore: 2.47, avgProScore: 1.91, price: 409.54, weeklyChange: 5.30 },
  { ticker: 'GOOGL', name: `ALPHABET INC CLASS A`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 3.32, bestProScore: 2.73, avgProScore: 1.66, price: 349.56, weeklyChange: -5.36 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': 8.8, '1M': 23.8, 'YTD': 134.2, '6M': 136.2, '1Y': 234.7 },
  ARTY: { '1W': 2.6, '1M': 15.4, 'YTD': 64.8, '6M': 64.8, '1Y': 105.9 },
  BAI:  { '1W': 4.1, '1M': 13.4, 'YTD': 62.9, '6M': 60.9, '1Y': 98.6 },
  IGPT: { '1W': 5.3, '1M': 18.1, 'YTD': 82.3, '6M': 82.6, '1Y': 132.6 },
  IVES: { '1W': -1.9, '1M': 0.9, 'YTD': 18.9, '6M': 16.4, '1Y': 43.8 },
  ALAI: { '1W': 0.2, '1M': 5.9, 'YTD': 27.7, '6M': 25.7, '1Y': 57.7 },
  CHAT: { '1W': 5.6, '1M': 15.9, 'YTD': 76.6, '6M': 71.6, '1Y': 126.6 },
  AIFD: { '1W': 0, '1M': 7.9, 'YTD': 47.1, '6M': 46.1, '1Y': 89.3 },
  SPRX: { '1W': 0.9, '1M': 10.8, 'YTD': 52.2, '6M': 45.2, '1Y': 110.8 },
  AOTG: { '1W': -0.4, '1M': 7.2, 'YTD': 15, '6M': 13.5, '1Y': 36.8 },
  // Semiconductors
  SOXX: { '1W': 4.2, '1M': 21.9, 'YTD': 117.5, '6M': 115.6, '1Y': 189.2 },
  PSI:  { '1W': 5.1, '1M': 20.1, 'YTD': 134.1, '6M': 128.9, '1Y': 225.7 },
  XSD:  { '1W': 2.5, '1M': 7.3, 'YTD': 101.5, '6M': 94.9, '1Y': 165.4 },
  DRAM: { '1W': 13.5, '1M': 52.8, 'YTD': 190.7, '6M': 190.7, '1Y': 190.7 },
  // Broad Tech
  PTF:  { '1W': 1.8, '1M': 12.2, 'YTD': 81, '6M': 74.8, '1Y': 109.5 },
  WCLD: { '1W': -6.2, '1M': -4.2, 'YTD': -17.3, '6M': -19.6, '1Y': -17.8 },
  IGV:  { '1W': -5.7, '1M': -7.1, 'YTD': -17.3, '6M': -19.8, '1Y': -17.9 },
  FDTX: { '1W': 1, '1M': 14.3, 'YTD': 42.7, '6M': 42, '1Y': 56.7 },
  GTEK: { '1W': 2.5, '1M': 11.6, 'YTD': 57, '6M': 57.2, '1Y': 82 },
  ARKK: { '1W': -1.5, '1M': 2.7, 'YTD': 2, '6M': -3.7, '1Y': 14 },
  MARS: { '1W': -9.9, '1M': -25.3, 'YTD': 24.3, '6M': 24.3, '1Y': 24.3 },
  FRWD: { '1W': 0.3, '1M': 10.4, 'YTD': 37, '6M': 37, '1Y': 37 },
  BCTK: { '1W': -1.5, '1M': 6.2, 'YTD': 25.8, '6M': 23.8, '1Y': 28.1 },
  FWD:  { '1W': 2.6, '1M': 8.8, 'YTD': 42.6, '6M': 40.5, '1Y': 75.1 },
  CBSE: { '1W': 2, '1M': 4.7, 'YTD': 31.5, '6M': 28.6, '1Y': 46.3 },
  FCUS: { '1W': 2.1, '1M': 5.4, 'YTD': 48.3, '6M': 39.7, '1Y': 86.1 },
  WGMI: { '1W': 4.3, '1M': 16.2, 'YTD': 88.1, '6M': 70.6, '1Y': 297.9 },
  CNEQ: { '1W': -0.3, '1M': 2.3, 'YTD': 19.1, '6M': 17.6, '1Y': 45.5 },
  SGRT: { '1W': 2.5, '1M': 9.7, 'YTD': 53.4, '6M': 49.3, '1Y': 91.8 },
  SPMO: { '1W': 2.4, '1M': 11.5, 'YTD': 35.4, '6M': 34.4, '1Y': 49 },
  XMMO: { '1W': 1.5, '1M': 5.5, 'YTD': 25.5, '6M': 22.6, '1Y': 38.2 },
  // Electrification
  POW:  { '1W': 1.9, '1M': 3.2, 'YTD': 61.8, '6M': 60.6, '1Y': 57.1 },
  VOLT: { '1W': 4.5, '1M': 6.2, 'YTD': 45.4, '6M': 43.8, '1Y': 69.9 },
  PBD:  { '1W': -0.9, '1M': -6.1, 'YTD': 26.7, '6M': 25, '1Y': 69.8 },
  PBW:  { '1W': 0.9, '1M': -4.2, 'YTD': 35, '6M': 26.8, '1Y': 116.9 },
  IVEP: { '1W': 4.8, '1M': 3.2, 'YTD': 12.1, '6M': 12.1, '1Y': 12.1 },
  // Industrials
  AIRR: { '1W': 2.2, '1M': 6.5, 'YTD': 35.5, '6M': 31, '1Y': 68 },
  PRN:  { '1W': 5.1, '1M': 10.9, 'YTD': 50.5, '6M': 44.7, '1Y': 71.8 },
  RSHO: { '1W': 4.1, '1M': 12.6, 'YTD': 39.4, '6M': 39.3, '1Y': 62.5 },
  IDEF: { '1W': -2.8, '1M': -3.4, 'YTD': 2.9, '6M': 1, '1Y': 16.4 },
  BILT: { '1W': -0.7, '1M': -5.2, 'YTD': 7.9, '6M': 8.8, '1Y': 11.1 },
  // Meme
  BUZZ: { '1W': -2.1, '1M': -0.6, 'YTD': 15.4, '6M': 10.1, '1Y': 31.6 },
  MEME: { '1W': -0.3, '1M': -4.4, 'YTD': 67.8, '6M': 49.5, '1Y': 6 },
  RKNG: { '1W': 2.8, '1M': 7.5, 'YTD': 17.7, '6M': 17.7, '1Y': 17.7 },
};
// @@END_GENERATED:ETF_RETURNS@@

// @@GENERATED:ETF_DAY_CHANGE@@
// Today's % move per ETF ticker (1D, vs prior close). Refreshed by the 3×/day
// price jobs. Powers the 1D ranking in the theme-ETF side panel.
export const ETF_DAY_CHANGE: Record<string, number> = {
  AIS:  3.35,
  ARTY: 0.63,
  BAI:  1.95,
  IGPT: 1.89,
  IVES: -1.18,
  ALAI: -1.33,
  CHAT: 1.73,
  AIFD: -0.07,
  SPRX: 1.16,
  AOTG: 0,
  SOXX: 2.43,
  PSI:  3.59,
  XSD:  1.9,
  DRAM: 5.2,
  PTF:  1.01,
  WCLD: -2.05,
  IGV:  -1.94,
  FDTX: 0.37,
  GTEK: 1.21,
  ARKK: -2.16,
  MARS: -6.18,
  FRWD: -0.96,
  BCTK: -1.5,
  FWD:  1.15,
  CBSE: 0.13,
  FCUS: 1.8,
  WGMI: -0.17,
  CNEQ: -2.1,
  SGRT: 2.65,
  SPMO: 1.21,
  XMMO: 1.3,
  POW:  1.81,
  VOLT: 2.21,
  PBD:  0.39,
  PBW:  -0.19,
  IVEP: 1.46,
  AIRR: 1.8,
  PRN:  2.88,
  IDEF: -1.92,
  BILT: 0.5,
  BUZZ: -1.34,
  MEME: 0.61,
  RKNG: 1.59,
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
  'AI & ML': { etfs: ['AIS', 'SPRX', 'IVES'], series: { '1W': [100, 96.55, 97.24, 101.44, 102.61], '1M': [100, 104.46, 104.09, 106.27, 106.26, 108.89, 112.35, 110.96, 109.28, 98.92, 102.25, 102.25, 99.83, 96.81, 103, 103.81, 108.81, 105, 105.81, 110.48, 111.84], 'YTD': [100, 103.29, 106.44, 108.62, 110.57, 100.96, 106.89, 105.44, 108.46, 104.97, 105.36, 106.19, 103.2, 97.72, 108.21, 115.63, 120.03, 120.4, 126.98, 142.61, 136.62, 148.11, 161.27, 151.74, 154.69, 168.42], '6M': [100, 99.12, 103.22, 104.37, 106.56, 108.47, 96.8, 104.94, 103.52, 105.31, 101.3, 100.38, 103.9, 96.89, 99.26, 107.98, 117.51, 122.99, 124.4, 129.47, 143.19, 143.36, 154.96, 144.11, 152.25, 165.92], '1Y': [100, 105.55, 105.56, 106.42, 107.71, 111.96, 112.58, 114.82, 115.16, 112.96, 113.76, 120.29, 127.84, 133.03, 131.47, 137.09, 140.38, 138.97, 145.6, 147.74, 143.7, 131.03, 129.72, 134.66, 139.35, 130.13, 136.8, 135.58, 141.29, 142.95, 146.06, 148.71, 132.72, 140.38, 142.37, 142.18, 138.95, 137.67, 142.73, 133.02, 136.33, 148.64, 161.63, 169.31, 171.21, 186.76, 197.41, 197.66, 213.63, 198.68, 210.39, 229.74] }, returns: { '1W': 2.6, '1M': 11.8, 'YTD': 68.4, '6M': 65.9, '1Y': 129.7 } },
  'Semiconductors': { etfs: ['DRAM', 'PSI', 'XSD'], series: { '1W': [100, 95.02, 95.88, 103.37, 107.08], '1M': [100, 108.13, 107.34, 108.65, 107.4, 109.4, 114.27, 115.37, 112.04, 98.2, 104.18, 104.18, 102.59, 99.2, 109.42, 110.86, 117.81, 112.03, 113.2, 122.17, 126.73], 'YTD': [100, 107.31, 113.11, 118.19, 120.35, 116.39, 126.4, 123.44, 126.75, 123.28, 130.67, 130.83, 143.13, 139.19, 143.53, 148.32, 159.7, 171.95, 184.47, 209.19, 194.57, 200.26, 205.44, 211.62, 217.75, 242.12], '6M': [100, 101.11, 109.6, 112.48, 117.84, 118.26, 117.5, 124.06, 121.45, 124.62, 127.99, 126.43, 139.53, 137.56, 135.41, 142.59, 154.61, 176.68, 181.7, 195.21, 198.75, 192.76, 203.86, 202.59, 214.11, 238.19], '1Y': [100, 105.28, 107.49, 111, 111.25, 111.78, 112.23, 114.83, 116.27, 118.13, 117.07, 120.43, 126.71, 129.54, 129.57, 133.54, 133.54, 137.87, 141.08, 142.28, 143.09, 139.28, 143.77, 146.15, 158.49, 156.25, 158.29, 156.15, 159.85, 159.77, 165.33, 167.98, 166.56, 171.13, 180.69, 179.04, 176.1, 174.23, 184.03, 184.06, 186.99, 194.44, 194.16, 216.54, 216.36, 243.07, 245.11, 252.65, 256.81, 247.29, 273.49, 293.92] }, returns: { '1W': 7.1, '1M': 26.7, 'YTD': 142.1, '6M': 138.2, '1Y': 193.9 } },
  'Broad Tech': { etfs: ['WGMI', 'PTF', 'SGRT'], series: { '1W': [100, 98.21, 98.33, 101.72, 102.86], '1M': [100, 104.94, 106.93, 107.3, 106.27, 108.39, 111.19, 110.88, 109.13, 98.8, 102.37, 102.37, 99.54, 96.14, 102.61, 104.95, 109.58, 107.63, 107.76, 111.5, 112.73], 'YTD': [100, 107.37, 113.37, 113.75, 116.83, 106.4, 112.8, 112.43, 117.87, 113.55, 110, 111.72, 111.1, 103.51, 118.42, 127.39, 130.13, 128.26, 137.73, 153.94, 143.67, 154.31, 167.5, 158.13, 162.08, 174.16], '6M': [100, 95.46, 102.29, 107.27, 107.74, 110.62, 96.59, 107.1, 106.8, 110.26, 104.23, 101.7, 106.2, 100.03, 102.77, 114.97, 124.66, 128.56, 128.53, 138.57, 147.58, 145.03, 155.42, 144.49, 153.54, 164.93], '1Y': [100, 110.84, 114.37, 115.71, 122.4, 118.87, 119.37, 119.69, 126.94, 127.15, 133.34, 137.98, 154.28, 159.59, 161.61, 177.87, 189.66, 190.17, 194.33, 197.58, 180.12, 154.86, 159.72, 161.5, 172.23, 152.91, 162.23, 154.41, 164.46, 177.08, 175.1, 181.88, 155.61, 164.38, 164.41, 166.35, 163.28, 156.41, 165.12, 163.44, 164.06, 180.82, 195.48, 202.71, 204.66, 228.09, 233.73, 235.84, 253.7, 231.95, 249.39, 266.41] }, returns: { '1W': 2.9, '1M': 12.7, 'YTD': 74.2, '6M': 64.9, '1Y': 166.4 } },
  'Electrification': { etfs: ['PBW', 'POW', 'VOLT'], series: { '1W': [100, 98.87, 98.97, 101.34, 102.43], '1M': [100, 103.49, 102.88, 102.85, 101.8, 101.41, 103.59, 102.41, 102.29, 95.27, 95.98, 95.98, 94.8, 91.66, 95.9, 96.69, 99.31, 98.21, 98.32, 100.63, 101.76], 'YTD': [100, 104.13, 108.52, 113.55, 115.16, 113.57, 119.72, 118.62, 122.72, 116.91, 116.61, 117.64, 117.83, 115.01, 122.19, 128.11, 130.43, 134.96, 142.29, 150.16, 137.67, 144.82, 146.92, 138.96, 140.02, 147.39], '6M': [100, 98.57, 101.82, 105.57, 110.48, 112.11, 108.02, 116.69, 115.65, 118.83, 111.39, 111.82, 114.46, 111.57, 113.34, 121.89, 127.49, 134.49, 139.24, 140.58, 143.4, 139.08, 143.57, 134.34, 136.49, 143.74], '1Y': [100, 102.68, 106.17, 108.22, 112.13, 109.8, 108.79, 111.37, 113.51, 114.71, 112.61, 111.71, 116.36, 120.6, 121.79, 129.93, 133.19, 135.66, 135.38, 135.35, 137.24, 129.5, 129.32, 134.48, 136.62, 134.08, 138.77, 133.82, 136.18, 141.44, 146.73, 145.82, 141.82, 143.36, 146.71, 148.04, 146.65, 148.51, 150.41, 150.39, 154.33, 162.28, 169.59, 170.95, 170.73, 176.02, 180.48, 176.98, 180.53, 172.48, 174.46, 181.31] }, returns: { '1W': 2.4, '1M': 1.8, 'YTD': 47.4, '6M': 43.7, '1Y': 81.3 } },
  'Industrials': { etfs: ['PRN', 'RSHO', 'BILT'], series: { '1W': [100, 100.48, 100.23, 100.91, 102.81], '1M': [100, 100.78, 101.87, 101.86, 101.91, 101.62, 102.39, 102.53, 102.9, 102.2, 101.95, 102.06, 101.03, 100.37, 102.85, 103.53, 103.08, 103.59, 103.38, 104.09, 106.11], 'YTD': [100, 102.86, 105.97, 108.43, 109.5, 111.08, 116.97, 118.57, 119.89, 117.27, 113.54, 112.4, 112.89, 109.76, 116.62, 121.58, 121.06, 122.21, 123.38, 127.87, 124.13, 125.1, 126.05, 125.56, 128.93, 132.59], '6M': [100, 100.27, 101.83, 104.72, 106.18, 107.8, 108.87, 115.13, 117.29, 118.77, 114.14, 110.84, 110.34, 110.41, 111.82, 118.58, 119.28, 121, 122.04, 125.62, 126.73, 122.77, 126.17, 125.89, 127.41, 130.92], '1Y': [100, 102.6, 103.32, 103.93, 104.67, 106.25, 104.85, 105.42, 105.53, 106.43, 106.45, 107.1, 108.44, 110.18, 109.84, 110.88, 110.36, 112, 113.07, 113.57, 112.44, 106.83, 107.27, 109.29, 111.42, 111.72, 113.6, 112.64, 115.72, 119.11, 122.28, 123.68, 125.87, 131.09, 133.27, 131.54, 126.88, 122.6, 123.9, 125.97, 126.81, 134.02, 134.42, 137.86, 139.32, 141.24, 143.63, 138.74, 142.41, 141.84, 142.25, 148.47] }, returns: { '1W': 2.8, '1M': 6.1, 'YTD': 32.6, '6M': 30.9, '1Y': 48.5 } },
  'Meme': { etfs: ['MEME', 'BUZZ', 'RKNG'], series: { '1W': [100, 96.07, 96.66, 100.08, 100.15], '1M': [100, 103.32, 104.86, 106.77, 105.4, 105.62, 108.17, 104.42, 104.97, 94.31, 96.72, 96.72, 93.31, 90.73, 96.56, 95.36, 100.66, 96.75, 97.33, 100.78, 100.84], 'YTD': [100, 108.03, 108.62, 108.21, 102.73, 94.98, 95.31, 95.05, 96.34, 96.03, 94.48, 93.47, 92.45, 90.16, 98.8, 109.79, 112.61, 109.44, 117.57, 129.64, 120.64, 135.76, 140.91, 127.35, 128.47, 133.62], '6M': [100, 95.32, 98.97, 101.18, 99.39, 96.26, 84.54, 89.64, 90.21, 90.92, 88.25, 85.09, 88.96, 86.28, 90.25, 97.69, 106.63, 106.13, 109.58, 115.01, 119.84, 125.39, 133, 117.61, 120.99, 125.74], '1Y': [100, 103.86, 101.66, 96.92, 97.52, 92.63, 92.03, 90.51, 87.28, 84.63, 85.31, 87.81, 91.36, 93.01, 89.25, 91.97, 92.53, 91.15, 96.62, 96.92, 95.09, 90.67, 88.57, 84.75, 86.15, 87.12, 89.39, 89.95, 93.34, 94.63, 93.71, 94.1, 90.21, 89.13, 89.69, 91.43, 94.09, 99.01, 101.41, 98.03, 94.35, 100.49, 110.71, 112.31, 112.23, 114.68, 117.88, 116.3, 116.69, 113.1, 113.48, 118.41] }, returns: { '1W': 0.2, '1M': 0.8, 'YTD': 33.6, '6M': 25.7, '1Y': 18.4 } },
};
// @@END_GENERATED:THEME_REPRESENTATIVES@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 10, avgWeight: 6.01, proScore: 6.01, coverage: 1,
      price: 208.65, weeklyPrices: [212.45, 207.41, 204.65, 210.69, 208.65], weeklyChange: -1.79, dayChange: -0.97, sortRank: 0, periodReturns: { '1M': -3.1, 'YTD': 11.9, '6M': 13.6, '1Y': 44.7 },
      priceHistory: { '1D': [210.69, 212.35, 212.93, 212.7, 209.76, 208.95, 209.86, 209.83, 210.55, 209.26, 209.72, 209.42, 209.78, 209.04, 208.99, 208.84, 208.72, 209.05, 208.89, 208.77, 208.71, 208.01, 207.8, 208.65], '1W': [212.45, 207.41, 204.65, 210.69, 208.65], '1M': [215.33, 214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65], 'YTD': [186.5, 185.04, 183.14, 184.84, 192.51, 174.19, 190.05, 187.9, 195.56, 183.04, 186.03, 181.93, 175.2, 174.4, 182.08, 196.51, 199.88, 213.17, 198.48, 219.44, 222.32, 215.33, 224.36, 208.64, 205.19, 208.65], '6M': [183.69, 187.54, 189.11, 183.14, 184.84, 192.51, 171.88, 190.05, 187.9, 184.89, 183.34, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 198.45, 211.5, 235.74, 219.51, 211.14, 205.1, 205.19, 208.65], '1Y': [144.17, 157.99, 160, 170.7, 167.03, 175.51, 180, 182.06, 182.01, 179.81, 170.78, 170.76, 174.88, 178.43, 186.58, 185.04, 188.32, 182.64, 191.49, 206.88, 199.05, 186.6, 182.55, 181.46, 184.97, 177.72, 183.69, 187.54, 189.11, 183.14, 184.84, 192.51, 171.88, 186.94, 189.82, 177.19, 183.34, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 235.74, 219.51, 211.14, 205.1, 205.19, 208.65] },
      velocityScore: { '1D': null, '1W': -2.9, '1M': 3.6, '6M': null }, isNew: false,
      marketCap: '$5.1T', pe: 32, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.47,
      etfPresence: { AIS: 2.38, ARTY: 4.4, BAI: 4.01, IGPT: 5.34, IVES: 4.75, ALAI: 12.55, CHAT: 6.39, AIFD: 6.37, SPRX: 3.34, AOTG: 10.53 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 9, avgWeight: 5.33, proScore: 4.79, coverage: 0.9,
      price: 551.63, weeklyPrices: [547.26, 507.29, 512.48, 537.37, 551.63], weeklyChange: 0.8, dayChange: 2.65, sortRank: 0, periodReturns: { '1M': 18, 'YTD': 157.6, '6M': 156.6, '1Y': 325.7 },
      priceHistory: { '1D': [537.37, 541.58, 553.97, 546.97, 543.53, 542.64, 546.8, 545.23, 544.15, 537.45, 541.55, 541.85, 544.84, 543.04, 543.4, 544.28, 545.86, 545.97, 545.94, 546, 547.16, 544.11, 546.61, 551.63], '1W': [547.26, 507.29, 512.48, 537.37, 551.63], '1M': [467.51, 503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63], 'YTD': [214.16, 204.68, 223.6, 253.73, 252.18, 200.19, 213.58, 203.37, 210.86, 202.07, 204.83, 196.31, 205.37, 203.43, 231.82, 255.07, 284.49, 323.21, 341.54, 458.79, 420.99, 467.51, 510.13, 490.33, 511.57, 551.63], '6M': [214.95, 215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 213.58, 203.37, 203.68, 199.45, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 408.46, 449.7, 449.59, 516.1, 466.38, 511.57, 551.63], '1Y': [129.58, 141.9, 137.82, 155.61, 154.72, 177.44, 176.78, 172.28, 176.14, 163.36, 162.32, 155.82, 160.46, 160.9, 161.79, 211.51, 216.42, 240.56, 259.67, 259.65, 243.98, 240.52, 215.05, 215.24, 221.62, 209.17, 214.95, 215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 200.21, 199.45, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 449.7, 449.59, 516.1, 466.38, 511.57, 551.63] },
      velocityScore: { '1D': null, '1W': -5.7, '1M': -4.4, '6M': null }, isNew: false,
      marketCap: '$899B', pe: 183.3, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.59, ARTY: 4.64, BAI: 4.71, IGPT: 7.09, IVES: 5.17, ALAI: 1.14, CHAT: 3.91, AIFD: false, SPRX: 0.53, AOTG: 16.16 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 8, avgWeight: 7.59, proScore: 6.07, coverage: 0.8,
      price: 1211.38, weeklyPrices: [1087.99, 1020.76, 1043.19, 1133.99, 1211.38], weeklyChange: 11.34, dayChange: 6.82, sortRank: 0, periodReturns: { '1M': 61.3, 'YTD': 324.4, '6M': 338, '1Y': 892.3 },
      priceHistory: { '1D': [1133.99, 1174.3, 1188.9, 1194.12, 1185.39, 1180.89, 1188.43, 1180, 1180.41, 1183.04, 1193.68, 1191.61, 1191.95, 1192.87, 1194.31, 1197.91, 1199.98, 1197.08, 1191.48, 1188.6, 1192.2, 1189.38, 1193.95, 1211.38], '1W': [1087.99, 1020.76, 1043.19, 1133.99, 1211.38], '1M': [751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38], 'YTD': [285.41, 327.02, 333.35, 397.58, 435.79, 379.4, 410.34, 417.35, 429, 400.77, 418.69, 461.69, 395.53, 337.84, 406.73, 465.66, 449.38, 504.29, 576.45, 795.33, 681.54, 751, 1035.5, 949.28, 981.61, 1211.38], '6M': [276.59, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 410.34, 417.35, 415.56, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 646.63, 776.01, 762.1, 971, 864.01, 981.61, 1211.38], '1Y': [122.08, 123.25, 124.42, 120.11, 109.22, 111.96, 107.77, 123.72, 123.55, 116.42, 118.48, 135.24, 158.82, 166.41, 167.32, 185.69, 192.77, 206.77, 220.1, 234.7, 253.3, 241.95, 223.93, 239.49, 252.42, 232.51, 276.59, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 776.01, 762.1, 971, 864.01, 981.61, 1211.38] },
      velocityScore: { '1D': null, '1W': -1.5, '1M': 14.5, '6M': null }, isNew: false,
      marketCap: '$1.4T', pe: 57.1, revenueGrowth: 196, eps: 21.21, grossMargin: 58, dividendYield: 0.05,
      etfPresence: { AIS: 6.97, ARTY: 5.07, BAI: 6.42, IGPT: 12.98, IVES: 6.81, ALAI: false, CHAT: 4.08, AIFD: 7.12, SPRX: false, AOTG: 11.23 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 8, avgWeight: 3.61, proScore: 2.89, coverage: 0.8,
      price: 392.13, weeklyPrices: [393.94, 376.71, 392.90, 411.35, 392.13], weeklyChange: -0.46, dayChange: -4.67, sortRank: 0, periodReturns: { '1M': -5.3, 'YTD': 13.3, '6M': 14.8, '1Y': 54.5 },
      priceHistory: { '1D': [411.35, 401.18, 399.14, 400.04, 395.82, 393.98, 394.83, 394.82, 396.66, 395.19, 396.83, 396.23, 397.16, 396.37, 396.64, 396.23, 396.15, 397.02, 395.98, 395.42, 394.77, 394.63, 395.31, 392.13], '1W': [393.94, 376.71, 392.9, 411.35, 392.13], '1M': [414.14, 422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13], 'YTD': [346.1, 332.48, 339.89, 325.49, 330.73, 308.05, 342.76, 333.99, 332.31, 317.53, 341.57, 321.31, 318.29, 309.51, 350.63, 380.78, 402.17, 399.83, 416.5, 428.43, 420.71, 414.14, 459.97, 396.6, 382.07, 392.13], '6M': [341.45, 349.85, 343.5, 339.89, 325.49, 330.73, 310.51, 342.76, 333.99, 321.7, 332.77, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 421.28, 412.56, 439.79, 414.57, 446.77, 385.73, 382.07, 392.13], '1Y': [253.77, 275.65, 271.8, 280.94, 278.59, 297.42, 297.72, 303.9, 305.76, 294.23, 298.24, 336.67, 360, 338.94, 329.91, 336.41, 356.7, 349.24, 362.05, 362.55, 358.39, 342.65, 377.96, 381.57, 406.29, 341.3, 341.45, 349.85, 343.5, 339.89, 325.49, 330.73, 310.51, 331.17, 332.65, 319.55, 332.77, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 439.79, 414.57, 446.77, 385.73, 382.07, 392.13] },
      velocityScore: { '1D': null, '1W': 4.7, '1M': -11.6, '6M': null }, isNew: false,
      marketCap: '$1.9T', pe: 65.2, revenueGrowth: 48, eps: 6.01, grossMargin: 76, dividendYield: 0.63,
      etfPresence: { AIS: 0.66, ARTY: 4.43, BAI: 4.24, IGPT: false, IVES: 4.62, ALAI: 3.74, CHAT: 4.12, AIFD: 5.53, SPRX: false, AOTG: 1.55 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 6, avgWeight: 4.89, proScore: 2.93, coverage: 0.6,
      price: 467.74, weeklyPrices: [441.40, 425.83, 432.15, 462.12, 467.74], weeklyChange: 5.97, dayChange: 1.22, sortRank: 0, periodReturns: { '1M': 15.6, 'YTD': 53.9, '6M': 59.5, '1Y': 122.4 },
      priceHistory: { '1D': [462.12, 467.25, 468.33, 470.78, 468.23, 467, 469.01, 467.82, 470.88, 467.11, 468.61, 468.66, 468.45, 467.2, 467.15, 467.08, 466.89, 467.26, 467.33, 467.64, 466.64, 466.04, 465.6, 467.74], '1W': [441.4, 425.83, 432.15, 462.12, 467.74], '1M': [404.52, 412.32, 422.73, 424.86, 418.45, 435.63, 446.69, 436.69, 444.92, 415.17, 426.8, 427.92, 408.75, 421.07, 423.93, 441.4, 425.83, 432.15, 462.12, 467.74], 'YTD': [303.89, 318.01, 327.11, 327.37, 339.55, 325.74, 374.09, 360.39, 387.73, 357.44, 354.56, 345.98, 343.25, 337.95, 365.9, 379.89, 368.08, 392.34, 401.61, 404.54, 395.95, 404.52, 435.63, 426.8, 423.93, 467.74], '6M': [293.28, 299.58, 318.68, 327.11, 327.37, 339.55, 330.73, 374.09, 360.39, 376.81, 353.86, 336.71, 338.79, 326.11, 339.04, 370.6, 370.5, 402.46, 397.67, 414.15, 417.72, 407.15, 418.45, 415.17, 423.93, 467.74], '1Y': [210.32, 226.49, 227.86, 236.95, 234.6, 241.33, 239, 242.09, 241.41, 235.59, 228.39, 250.92, 262.06, 282.71, 279.29, 294.03, 302.89, 297.7, 298.25, 304.86, 295.27, 282.01, 284.64, 292.09, 303.41, 286.87, 293.28, 299.58, 318.68, 327.11, 327.37, 339.55, 330.73, 368.1, 370.54, 374.58, 353.86, 336.71, 338.79, 326.11, 339.04, 370.6, 370.5, 402.46, 397.67, 411.68, 417.72, 407.15, 418.45, 415.17, 423.93, 467.74] },
      velocityScore: { '1D': null, '1W': 2.4, '1M': -4.9, '6M': null }, isNew: false,
      marketCap: '$2.4T', pe: 40.1, revenueGrowth: 35, eps: 11.65, grossMargin: 62, dividendYield: 0.82,
      etfPresence: { AIS: 3.21, ARTY: false, BAI: 4.34, IGPT: false, IVES: 5.34, ALAI: 5.47, CHAT: false, AIFD: 3.41, SPRX: false, AOTG: 7.55 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 4.55, proScore: 2.73, coverage: 0.6,
      price: 349.56, weeklyPrices: [369.35, 373.25, 363.79, 368.03, 349.56], weeklyChange: -5.36, dayChange: -5.02, sortRank: 0, periodReturns: { '1M': -8.7, 'YTD': 11.7, '6M': 12.8, '1Y': 111.6 },
      priceHistory: { '1D': [368.03, 354.14, 352.48, 350.17, 349.17, 345.38, 343.04, 343.83, 347.22, 345.24, 346.06, 345.9, 345.77, 346.48, 347.11, 347.05, 347.47, 347.74, 348.35, 347.46, 347.69, 349.44, 349.24, 349.56], '1W': [369.35, 373.25, 363.79, 368.03, 349.56], '1M': [382.97, 388.88, 388.83, 390.13, 380.34, 376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68, 369.35, 373.25, 363.79, 368.03, 349.56], 'YTD': [313, 325.44, 335.84, 330.54, 338.25, 333.04, 310.96, 302.85, 312.9, 303.13, 308.7, 310.92, 290.44, 287.56, 317.32, 332.91, 332.29, 349.78, 383.25, 388.64, 396.94, 382.97, 376.37, 363.31, 359.68, 349.56], '6M': [309.78, 313.85, 321.98, 335.84, 330.54, 338.25, 331.25, 310.96, 302.85, 307.38, 300.88, 303.55, 307.13, 280.92, 295.77, 317.24, 341.68, 344.4, 385.69, 397.99, 401.07, 387.66, 380.34, 368.53, 359.68, 349.56], '1Y': [165.19, 176.23, 174.36, 182, 191.34, 195.75, 195.04, 201, 203.5, 208.49, 211.35, 239.63, 251.16, 251.66, 243.1, 245.76, 244.15, 256.55, 269.27, 283.72, 290.1, 285.02, 318.58, 315.81, 317.08, 306.57, 309.78, 313.85, 321.98, 335.84, 330.54, 338.25, 331.25, 309, 314.98, 311.76, 300.88, 303.55, 307.13, 280.92, 295.77, 317.24, 341.68, 344.4, 385.69, 400.8, 401.07, 387.66, 380.34, 368.53, 359.68, 349.56] },
      velocityScore: { '1D': null, '1W': -3.9, '1M': -28.3, '6M': null }, isNew: false,
      marketCap: '$4.3T', pe: 26.7, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.16, IGPT: 5.62, IVES: 4.5, ALAI: false, CHAT: 5.07, AIFD: 4.94, SPRX: false, AOTG: 4.01 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 6, avgWeight: 3.9, proScore: 2.34, coverage: 0.6,
      price: 307.86, weeklyPrices: [308.88, 278.67, 289.54, 310.58, 307.86], weeklyChange: -0.33, dayChange: -0.88, sortRank: 0, periodReturns: { '1M': 56.8, 'YTD': 262.3, '6M': 263, '1Y': 335 },
      priceHistory: { '1D': [310.58, 300.81, 307.99, 311.26, 305.63, 304.1, 301.68, 302, 302.73, 299.29, 301.08, 301.86, 304.15, 303.59, 306.43, 305.98, 306.79, 307.14, 306.05, 305.15, 305, 305, 305.82, 307.86], '1W': [308.88, 278.67, 289.54, 310.58, 307.86], '1M': [196.33, 208.26, 198.7, 204.83, 205, 219.43, 290.79, 301.65, 316.43, 263.47, 288.85, 266.88, 252.59, 280.71, 279.7, 308.88, 278.67, 289.54, 310.58, 307.86], 'YTD': [84.98, 83.45, 81.21, 83.1, 81.34, 73.73, 81.34, 79.61, 80.92, 78.09, 90.44, 90.79, 92.36, 99.05, 114.45, 133.83, 151.31, 153.23, 163.66, 170.84, 168.93, 196.33, 219.43, 288.85, 279.7, 307.86], '6M': [84.8, 86.76, 84.64, 81.21, 83.1, 81.34, 74.21, 81.34, 79.61, 79.29, 75.68, 87.67, 89.53, 97.68, 107.11, 128.49, 139.69, 164.31, 164.95, 160.01, 182.58, 190.69, 205, 263.47, 279.7, 307.86], '1Y': [70.78, 77.4, 71.95, 72.41, 71.99, 76.34, 76.53, 77.28, 76.74, 72.95, 64.6, 66.84, 68.86, 74.62, 84.07, 86.97, 89.39, 85.84, 88.71, 90.37, 93.23, 83.45, 83.79, 92.89, 88.9, 84.07, 84.8, 86.76, 84.64, 81.21, 83.1, 81.34, 74.21, 78.23, 79.48, 81.69, 75.68, 87.67, 89.53, 97.68, 107.11, 128.49, 139.69, 164.31, 164.95, 170.13, 182.58, 190.69, 205, 263.47, 279.7, 307.86] },
      velocityScore: { '1D': null, '1W': -14.9, '1M': 1.3, '6M': null }, isNew: false,
      marketCap: '$269B', pe: 105.4, revenueGrowth: 28, eps: 2.92, grossMargin: 52, dividendYield: 0.08,
      etfPresence: { AIS: 4.25, ARTY: 4.53, BAI: 2.04, IGPT: false, IVES: false, ALAI: false, CHAT: 1.6, AIFD: 6.54, SPRX: 4.45, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 6, avgWeight: 3.07, proScore: 1.84, coverage: 0.6,
      price: 732.62, weeklyPrices: [653.53, 681.08, 712.13, 746.23, 732.62], weeklyChange: 12.1, dayChange: -1.82, sortRank: 0, periodReturns: { '1M': 51.3, 'YTD': 325.3, '6M': 314.5, '1Y': 1113.3 },
      priceHistory: { '1D': [746.23, 745.54, 757.97, 762.41, 755.86, 748.66, 755.84, 750.11, 751.33, 748.61, 745.78, 737.38, 733.9, 729.62, 735.65, 734.53, 738.07, 737.44, 738.8, 736.34, 732.36, 731.11, 733.16, 732.62], '1W': [653.53, 681.08, 712.13, 746.23, 732.62], '1M': [484.28, 524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62], 'YTD': [172.27, 187.68, 215, 243.29, 278.41, 269.41, 273.74, 284.67, 290.95, 261.3, 268.81, 313.81, 301.05, 270.49, 338.78, 366.22, 383.81, 390.99, 442.36, 515.83, 458.68, 484.28, 546.2, 526.93, 562.93, 732.62], '6M': [176.76, 176.06, 199.88, 215, 243.29, 278.41, 260.19, 273.74, 284.67, 282.25, 259.03, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 431.52, 463.91, 489.15, 486.46, 531.21, 511.72, 562.93, 732.62], '1Y': [60.38, 63.99, 64.02, 67.53, 67.06, 70.61, 77.29, 74.64, 76.29, 79.22, 81.91, 94.54, 103.09, 110.25, 120.06, 119.93, 118.86, 121.53, 126.67, 158.02, 174.22, 162.45, 150.93, 159.99, 169.54, 174.58, 176.76, 176.06, 199.88, 215, 243.29, 278.41, 260.19, 284.1, 285.52, 279.7, 259.03, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 431.52, 480, 489.15, 486.46, 531.21, 511.72, 562.93, 732.62] },
      velocityScore: { '1D': null, '1W': 52.1, '1M': -4.2, '6M': null }, isNew: false,
      marketCap: '$253B', pe: 43.8, revenueGrowth: 46, eps: 16.72, grossMargin: 45, dividendYield: 0.08,
      etfPresence: { AIS: 1.58, ARTY: 3.27, BAI: 3.7, IGPT: 4, IVES: false, ALAI: 5, CHAT: false, AIFD: false, SPRX: false, AOTG: 0.87 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'ANET', name: 'Arista Networks Inc', easyScore: 6, avgWeight: 2.28, proScore: 1.37, coverage: 0.6,
      price: 174.64, weeklyPrices: [169.09, 168.01, 164.93, 169.67, 174.64], weeklyChange: 3.28, dayChange: 2.93, sortRank: 0, periodReturns: { '1M': 13.4, 'YTD': 33.3, '6M': 33.6, '1Y': 89.9 },
      priceHistory: { '1D': [169.67, 170.01, 170.34, 169.24, 169.13, 169.04, 169.72, 168.75, 168.94, 168.37, 169.26, 169.46, 170.27, 171.79, 171.26, 173.15, 173.86, 174.04, 174.05, 174.31, 174.31, 173.59, 174.57, 174.64], '1W': [169.09, 168.01, 164.93, 169.67, 174.64], '1M': [154.03, 158.01, 154.31, 155.27, 159.47, 170.68, 175.33, 174.37, 166.01, 154.27, 156.4, 152.16, 151.76, 156.4, 163.24, 169.09, 168.01, 164.93, 169.67, 174.64], 'YTD': [131.03, 123.72, 125.09, 138.41, 148.15, 130.28, 140.66, 137.23, 132.89, 134.83, 138.23, 133.07, 130.8, 122.78, 145.07, 154.37, 172.86, 165.29, 172.62, 136.43, 141.71, 154.03, 170.68, 156.4, 163.24, 174.64], '6M': [130.73, 132.44, 130.08, 125.09, 138.41, 148.15, 128.67, 140.66, 137.23, 130.25, 139.4, 134.03, 136.26, 122.55, 126.68, 147.35, 164.23, 176.91, 172.7, 141.75, 147.81, 148.59, 159.47, 154.27, 163.24, 174.64], '1Y': [91.95, 102.31, 103.39, 107.37, 109.78, 118.62, 120.35, 137.65, 138.04, 133.04, 135.87, 141.91, 142.16, 144.09, 145.71, 145.29, 147.45, 146.48, 156.81, 157.59, 137.26, 127.26, 122.17, 127.22, 130.04, 126.13, 130.73, 132.44, 130.08, 125.09, 138.41, 148.15, 128.67, 135.12, 132.79, 133.5, 139.4, 134.03, 136.26, 122.55, 126.68, 147.35, 164.23, 176.91, 172.7, 141.77, 147.81, 148.59, 159.47, 154.27, 163.24, 174.64] },
      velocityScore: { '1D': null, '1W': -16, '1M': null, '6M': null }, isNew: false,
      marketCap: '$220B', pe: 59.8, revenueGrowth: 35, eps: 2.92, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: 1.38, ARTY: 2.32, BAI: 1.35, IGPT: false, IVES: false, ALAI: false, CHAT: 2.12, AIFD: 4.93, SPRX: 1.58, AOTG: false },
      tonyNote: 'Arista Networks Inc appears in 6 of 10 AI & ML ETFs (60% coverage) with average weight 2.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.38, proScore: 1.69, coverage: 0.5,
      price: 367.34, weeklyPrices: [399.76, 393.83, 378.91, 379.40, 367.34], weeklyChange: -8.11, dayChange: -3.18, sortRank: 0, periodReturns: { '1M': -12.2, 'YTD': -24, '6M': -24.2, '1Y': -24.4 },
      priceHistory: { '1D': [379.4, 379.48, 378.31, 375.8, 373.88, 371.94, 371.3, 371.19, 371.64, 369.43, 369.15, 368.23, 368.48, 368.76, 368.99, 369.44, 369.83, 370.2, 370.22, 369.5, 370.14, 369.75, 369.35, 367.34], '1W': [399.76, 393.83, 378.91, 379.4, 367.34], '1M': [418.57, 416.03, 412.67, 426.99, 450.24, 460.52, 441.31, 427.34, 428.05, 416.67, 411.74, 403.41, 397.36, 390.34, 390.74, 399.76, 393.83, 378.91, 379.4, 367.34], 'YTD': [483.62, 478.11, 459.38, 451.14, 433.5, 414.19, 404.37, 398.46, 400.6, 405.2, 404.88, 399.41, 372.74, 370.17, 374.33, 393.11, 424.16, 429.25, 413.62, 412.66, 423.54, 418.57, 460.52, 411.74, 390.74, 367.34], '6M': [484.92, 487.48, 483.47, 459.38, 451.14, 433.5, 393.67, 404.37, 398.46, 401.72, 410.68, 401.86, 389.02, 365.97, 373.46, 370.87, 422.79, 424.62, 414.44, 420.77, 409.43, 419.09, 450.24, 416.67, 390.74, 367.34], '1Y': [486, 497.41, 496.62, 505.82, 505.27, 512.57, 535.64, 521.77, 517.1, 504.26, 505.12, 498.41, 509.04, 509.23, 517.95, 523.98, 514.05, 516.79, 531.52, 517.03, 506, 507.49, 474, 490, 492.02, 476.39, 484.92, 487.48, 483.47, 459.38, 451.14, 433.5, 393.67, 401.84, 397.23, 392.74, 410.68, 401.86, 389.02, 365.97, 373.46, 370.87, 422.79, 424.62, 414.44, 415.12, 409.43, 419.09, 450.24, 416.67, 390.74, 367.34] },
      velocityScore: { '1D': null, '1W': -2.9, '1M': -34.7, '6M': null }, isNew: false,
      marketCap: '$2.7T', pe: 21.9, revenueGrowth: 18, eps: 16.81, grossMargin: 68, dividendYield: 0.96,
      etfPresence: { AIS: false, ARTY: 2.31, BAI: false, IGPT: false, IVES: 4.3, ALAI: 4.87, CHAT: 2.01, AIFD: false, SPRX: false, AOTG: 3.39 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 5, avgWeight: 3.2, proScore: 1.6, coverage: 0.5,
      price: 439.66, weeklyPrices: [389.20, 361.71, 374.68, 417.07, 439.66], weeklyChange: 12.97, dayChange: 5.42, sortRank: 0, periodReturns: { '1M': 43.3, 'YTD': 164.3, '6M': 154.7, '1Y': 411.5 },
      priceHistory: { '1D': [417.07, 436.27, 427.74, 430.27, 426.98, 427.86, 427.55, 426.25, 420.12, 413.29, 419.71, 420.34, 425.47, 420.39, 422.54, 427.35, 428.17, 428.39, 429.17, 427.99, 430.22, 431.61, 435.98, 439.66], '1W': [389.2, 361.71, 374.68, 417.07, 439.66], '1M': [306.88, 318.72, 325.33, 349.17, 342.85, 320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 361.71, 374.68, 417.07, 439.66], 'YTD': [166.36, 156.73, 172.14, 176.35, 160.46, 144.67, 143.71, 132.62, 128.15, 113.77, 124.71, 127.57, 121.76, 109.6, 125.46, 170.6, 191.97, 183.31, 201.25, 207.35, 215.58, 306.88, 320.09, 346.33, 367.15, 439.66], '6M': [172.62, 170.84, 165.77, 172.14, 176.35, 160.46, 142.82, 143.71, 132.62, 124.67, 120, 119.9, 126.16, 113.61, 117.14, 149.05, 174.05, 212.84, 202.68, 195.65, 228.64, 297.84, 342.85, 317.06, 367.15, 439.66], '1Y': [85.95, 90.42, 92.3, 92.36, 116.91, 118.41, 137.93, 179.43, 186.43, 174.15, 174.24, 214.49, 238.79, 230.11, 195.8, 212.1, 199.53, 156.31, 170.28, 191.56, 173.74, 141.39, 147.75, 142.94, 167.08, 144.94, 172.62, 170.84, 165.77, 172.14, 176.35, 160.46, 142.82, 126.58, 129.68, 118.83, 120, 119.9, 126.16, 113.61, 117.14, 149.05, 174.05, 212.84, 202.68, 199.79, 228.64, 297.84, 342.85, 317.06, 367.15, 439.66] },
      velocityScore: { '1D': null, '1W': 2.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$75B', pe: 301.1, revenueGrowth: 93, eps: 1.46, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 2.02, ARTY: 1.31, BAI: false, IGPT: false, IVES: false, ALAI: 1.37, CHAT: 2.77, AIFD: false, SPRX: 8.51, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 5, avgWeight: 3.1, proScore: 1.55, coverage: 0.5,
      price: 563.85, weeklyPrices: [593.48, 600.21, 567.58, 577.22, 563.85], weeklyChange: -4.99, dayChange: -2.32, sortRank: 0, periodReturns: { '1M': -7.6, 'YTD': -14.6, '6M': -14.8, '1Y': -19.3 },
      priceHistory: { '1D': [577.22, 573.68, 572.04, 569.25, 567.88, 562.49, 561.04, 560.54, 563.69, 562.06, 562.13, 561, 561.8, 562.9, 562.55, 563.3, 564.39, 565.23, 565.45, 565.39, 565.59, 564.63, 565.28, 563.85], '1W': [593.48, 600.21, 567.58, 577.22, 563.85], '1M': [610.26, 612.34, 635.26, 635.29, 632.51, 600.47, 597.63, 622.98, 627.57, 593, 585.39, 584.59, 570.98, 568.43, 566.98, 593.48, 600.21, 567.58, 577.22, 563.85], 'YTD': [660.09, 646.06, 615.52, 647.63, 738.31, 668.99, 668.69, 644.78, 653.69, 667.73, 654.86, 622.66, 592.92, 572.13, 612.42, 662.49, 668.84, 671.34, 610.41, 598.86, 611.21, 610.26, 600.47, 585.39, 566.98, 563.85], '6M': [661.5, 665.95, 648.69, 615.52, 647.63, 738.31, 670.21, 668.69, 644.78, 657.01, 660.57, 638.18, 606.7, 547.54, 574.46, 629.86, 688.55, 675.03, 608.75, 616.81, 618.43, 607.38, 632.51, 593, 566.98, 563.85], '1Y': [698.53, 738.09, 720.67, 710.39, 704.81, 700, 776.37, 765.87, 767.37, 753.3, 735.11, 765.7, 779, 755.4, 734.38, 713.08, 715.7, 732.17, 750.82, 637.71, 631.76, 602.01, 613.05, 647.1, 656.96, 657.15, 661.5, 665.95, 648.69, 615.52, 647.63, 738.31, 670.21, 649.81, 655.66, 648.18, 660.57, 638.18, 606.7, 547.54, 574.46, 629.86, 688.55, 675.03, 608.75, 609.63, 618.43, 607.38, 632.51, 593, 566.98, 563.85] },
      velocityScore: { '1D': null, '1W': -4.3, '1M': -43.6, '6M': null }, isNew: false,
      marketCap: '$1.4T', pe: 20.5, revenueGrowth: 33, eps: 27.48, grossMargin: 82, dividendYield: 0.36,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: 4.2, IVES: 4.34, ALAI: 3.89, CHAT: 1.97, AIFD: false, SPRX: false, AOTG: 1.09 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'CRDO', name: 'Credo Technology Group Holding Ltd', easyScore: 5, avgWeight: 1.94, proScore: 0.97, coverage: 0.5,
      price: 302.52, weeklyPrices: [259.41, 239.18, 249.33, 271.83, 302.52], weeklyChange: 16.62, dayChange: 11.29, sortRank: 0, periodReturns: { '1M': 38.5, 'YTD': 110.2, '6M': 101.8, '1Y': 257.7 },
      priceHistory: { '1D': [271.83, 301.83, 302.17, 301.51, 302.23, 296.88, 301.59, 302.22, 296.36, 292, 293.73, 293.06, 295.23, 295.37, 296.49, 298.43, 303.35, 303.22, 303.18, 301.04, 300.74, 299.65, 301.23, 302.52], '1W': [259.41, 239.18, 249.33, 271.83, 302.52], '1M': [218.41, 221.64, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 217.5, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83, 302.52], 'YTD': [143.89, 141.59, 156.84, 135.1, 129.47, 96.95, 128.4, 130.66, 123.46, 102.54, 115.91, 104.06, 100.3, 93.87, 110.21, 159.52, 183.32, 165.92, 180.06, 210.22, 156.27, 218.41, 226.1, 222.27, 250.81, 302.52], '6M': [149.94, 144.92, 141, 156.84, 135.1, 129.47, 98.06, 128.4, 130.66, 114.48, 114.74, 111.57, 107.09, 96.44, 101.45, 119.59, 160.69, 195.04, 184.38, 188.29, 184.54, 193.39, 236.03, 206.89, 250.81, 302.52], '1Y': [84.57, 92.59, 93.36, 102.59, 92.93, 109.38, 114.7, 118.57, 118.74, 115.41, 124.27, 149.03, 164.42, 162.26, 145.61, 137.2, 149.9, 151.66, 154.96, 180.64, 170.16, 145.58, 150.85, 188.44, 170.29, 140.34, 149.94, 144.92, 141, 156.84, 135.1, 129.47, 98.06, 121.78, 124.06, 112.27, 114.74, 111.57, 107.09, 96.44, 101.45, 119.59, 160.69, 195.04, 184.38, 188.51, 184.54, 193.39, 236.03, 206.89, 250.81, 302.52] },
      velocityScore: { '1D': null, '1W': 1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$56B', pe: 121, revenueGrowth: 157, eps: 2.5, grossMargin: 68, dividendYield: null,
      etfPresence: { AIS: 1.07, ARTY: 1.24, BAI: 2.09, IGPT: false, IVES: false, ALAI: false, CHAT: 2.23, AIFD: false, SPRX: 3.07, AOTG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 4, avgWeight: 3.85, proScore: 1.54, coverage: 0.4,
      price: 232.79, weeklyPrices: [246.02, 246.00, 237.50, 244.39, 232.79], weeklyChange: -5.38, dayChange: -4.75, sortRank: 0, periodReturns: { '1M': -12.6, 'YTD': 0.9, '6M': 1.9, '1Y': 11.7 },
      priceHistory: { '1D': [244.39, 240.23, 238.63, 236.9, 236.27, 234.37, 233.6, 233.04, 234.5, 233.17, 232.88, 233.09, 233.44, 233.61, 233.6, 233.56, 233.76, 233.96, 234.46, 234.21, 234.73, 233.91, 233.23, 232.79], '1W': [246.02, 246, 237.5, 244.39, 232.79], '1M': [266.32, 265.29, 271.85, 274, 270.64, 261.26, 256.52, 250.02, 253.79, 246.03, 245.22, 244.19, 238, 241.51, 238.55, 246.02, 246, 237.5, 244.39, 232.79], 'YTD': [230.82, 246.29, 236.65, 234.34, 241.73, 232.99, 204.08, 204.86, 210.64, 216.82, 212.65, 215.2, 207.24, 208.27, 221.25, 249.02, 249.91, 259.7, 272.05, 268.99, 264.86, 266.32, 261.26, 245.22, 238.55, 232.79], '6M': [228.43, 232.53, 241.56, 236.65, 234.34, 241.73, 222.69, 204.08, 204.86, 207.92, 218.94, 209.53, 208.76, 207.54, 209.77, 238.38, 250.56, 263.99, 268.26, 271.17, 267.22, 268.46, 270.64, 246.03, 238.55, 232.79], '1Y': [208.47, 219.39, 219.36, 226.35, 227.47, 231.01, 211.65, 221.3, 231.49, 227.94, 225.34, 238.24, 234.05, 220.71, 219.57, 221.78, 220.07, 216.48, 226.97, 254, 248.4, 232.87, 226.28, 234.42, 227.92, 222.56, 228.43, 232.53, 241.56, 236.65, 234.34, 241.73, 222.69, 199.6, 210.11, 210, 218.94, 209.53, 208.76, 207.54, 209.77, 238.38, 250.56, 263.99, 268.26, 272.68, 267.22, 268.46, 270.64, 246.03, 238.55, 232.79] },
      velocityScore: { '1D': null, '1W': -23, '1M': -49.2, '6M': null }, isNew: false,
      marketCap: '$2.5T', pe: 30.2, revenueGrowth: 17, eps: 7.72, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 4.32, ALAI: 5.42, CHAT: 2.28, AIFD: 3.36, SPRX: false, AOTG: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 4, avgWeight: 3.79, proScore: 1.52, coverage: 0.4,
      price: 140.94, weeklyPrices: [127.86, 117.05, 121.10, 133.99, 140.94], weeklyChange: 10.23, dayChange: 5.19, sortRank: 0, periodReturns: { '1M': 17.6, 'YTD': 282, '6M': 287.5, '1Y': 565.1 },
      priceHistory: { '1D': [133.99, 136.92, 139.17, 139.63, 138.58, 138.72, 139.54, 138.47, 138.61, 137.62, 138.61, 139.46, 140, 139.91, 140.7, 140.65, 140.39, 140.23, 140.57, 140.48, 140.82, 140.67, 140.86, 140.94], '1W': [127.86, 117.05, 121.1, 133.99, 140.94], '1M': [119.84, 123.52, 121.77, 120.89, 114.68, 109.33, 107.93, 112.71, 111.78, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94], 'YTD': [36.9, 41.11, 48.72, 54.32, 48.66, 48.6, 48.29, 44.62, 46.88, 45.58, 47.98, 44.06, 44.06, 44.13, 58.95, 63.81, 66.26, 84.52, 95.78, 129.44, 108.17, 119.84, 109.33, 110.27, 124.57, 140.94], '6M': [36.37, 37.3, 42.63, 48.72, 54.32, 48.66, 48.24, 48.29, 44.62, 45.46, 45.95, 45.25, 46.18, 44.1, 50.38, 62.38, 68.5, 82.54, 99.62, 109.62, 115.93, 118.5, 114.68, 99.17, 124.57, 140.94], '1Y': [21.19, 22.4, 23.59, 22.92, 23.24, 20.41, 19.5, 20.65, 23.66, 24.55, 24.21, 24.44, 25.27, 29.34, 33.55, 37.17, 37.22, 38.1, 39.54, 39.5, 38.45, 34.71, 35.79, 43.47, 40.5, 37.31, 36.37, 37.3, 42.63, 48.72, 54.32, 48.66, 48.24, 46.48, 44.11, 45.61, 45.95, 45.25, 46.18, 44.1, 50.38, 62.38, 68.5, 82.54, 99.62, 124.92, 115.93, 118.5, 114.68, 99.17, 124.57, 140.94] },
      velocityScore: { '1D': null, '1W': -0.7, '1M': -47.6, '6M': null }, isNew: false,
      marketCap: '$708B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.43, ARTY: false, BAI: 3.1, IGPT: 7.36, IVES: false, ALAI: false, CHAT: 1.27, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 4, avgWeight: 3.16, proScore: 1.26, coverage: 0.4,
      price: 893.93, weeklyPrices: [957.24, 875.36, 869.98, 850.00, 893.93], weeklyChange: -6.61, dayChange: 5.17, sortRank: 0, periodReturns: { '1M': -5.6, 'YTD': 142.5, '6M': 129.3, '1Y': 902.6 },
      priceHistory: { '1D': [850, 830.54, 842.49, 841.62, 840.15, 834.55, 838, 842.56, 840.33, 833.14, 839.68, 843.6, 864.96, 876, 890.78, 888.4, 896.89, 901.01, 904.26, 900.35, 895.22, 885.9, 883.22, 893.93], '1W': [957.24, 875.36, 869.98, 850, 893.93], '1M': [946.9, 910.81, 902.31, 860.62, 854.96, 905, 1029.15, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93], 'YTD': [368.59, 348.26, 331.62, 354.49, 381.44, 465.54, 574.11, 635.64, 723.39, 680.8, 672, 649.56, 801.99, 702.76, 896.02, 852.79, 836.92, 791.37, 976.18, 1053.09, 884.98, 946.9, 905, 895.4, 921.56, 893.93], '6M': [389.88, 371.18, 392.88, 331.62, 354.49, 381.44, 504.42, 574.11, 635.64, 677, 650.82, 616.09, 772.13, 688.8, 826.88, 897.3, 894.07, 881.64, 949.93, 892.58, 1001.81, 964.5, 854.96, 863.66, 921.56, 893.93], '1Y': [89.16, 95.06, 91.31, 98.14, 99.63, 109.48, 111.13, 115.03, 118.98, 123.42, 132.55, 151.73, 170.9, 163.99, 162.71, 157.15, 160.56, 161, 193.8, 199.58, 259.89, 242.07, 299.36, 302.81, 360.33, 316.15, 389.88, 371.18, 392.88, 331.62, 354.49, 381.44, 504.42, 583.46, 667.77, 700.91, 650.82, 616.09, 772.13, 688.8, 826.88, 897.3, 894.07, 881.64, 949.93, 903.8, 1001.81, 964.5, 854.96, 863.66, 921.56, 893.93] },
      velocityScore: { '1D': null, '1W': -16, '1M': null, '6M': null }, isNew: false,
      marketCap: '$70B', pe: 156.8, revenueGrowth: 90, eps: 5.7, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.45, IGPT: false, IVES: false, ALAI: false, CHAT: 1.32, AIFD: 5.62, SPRX: 3.24, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 4 of 10 AI & ML ETFs (40% coverage) with average weight 3.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 4, avgWeight: 2.96, proScore: 1.19, coverage: 0.4,
      price: 358.18, weeklyPrices: [311.93, 299.60, 317.58, 333.05, 358.18], weeklyChange: 14.83, dayChange: 7.55, sortRank: 0, periodReturns: { '1M': 9.4, 'YTD': 121.1, '6M': 115.4, '1Y': 207.3 },
      priceHistory: { '1D': [333.05, 342.45, 345.4, 347.55, 344.32, 343.92, 347.45, 347.65, 346.33, 345.41, 348.03, 348.64, 349.7, 350.63, 351.97, 353.21, 353.2, 353.61, 353.57, 353.42, 353.57, 353.33, 355.1, 358.18], '1W': [311.93, 299.6, 317.58, 333.05, 358.18], '1M': [327.46, 323.91, 319.78, 314.18, 315.71, 323.39, 334.49, 331.44, 323.92, 300.51, 300.57, 289.52, 280.98, 297.88, 302.87, 311.93, 299.6, 317.58, 333.05, 358.18], 'YTD': [162.01, 160.78, 170.86, 181.12, 195.1, 182.56, 248.51, 243.06, 262.19, 251.28, 268.26, 268.41, 270.89, 250.58, 281.03, 310.51, 312.44, 305.03, 330.97, 367.92, 339.73, 327.46, 323.39, 300.57, 302.87, 358.18], '6M': [166.25, 164.34, 171.54, 170.86, 181.12, 195.1, 177.75, 248.51, 243.06, 259.23, 249.75, 265.38, 269.17, 252.4, 261.29, 295.11, 307.34, 323.46, 328.31, 340.01, 376.23, 323.4, 315.71, 300.51, 302.87, 358.18], '1Y': [116.54, 128.41, 125.89, 127.37, 125.29, 142.7, 140.2, 139.83, 135.69, 125.02, 124.01, 125.58, 136.65, 142.61, 150.86, 158.87, 179, 175.73, 192.9, 191.4, 187.84, 166.65, 168.91, 180.91, 178.38, 160.66, 166.25, 164.34, 171.54, 170.86, 181.12, 195.1, 177.75, 236.51, 243.75, 254.89, 249.75, 265.38, 269.17, 252.4, 261.29, 295.11, 307.34, 323.46, 328.31, 339.97, 376.23, 323.4, 315.71, 300.51, 302.87, 358.18] },
      velocityScore: { '1D': null, '1W': null, '1M': -40.5, '6M': null }, isNew: false,
      marketCap: '$138B', pe: 89.5, revenueGrowth: 30, eps: 4, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 3.57, ARTY: false, BAI: 1.9, IGPT: false, IVES: false, ALAI: false, CHAT: 2.21, AIFD: 4.18, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 4, avgWeight: 2.92, proScore: 1.17, coverage: 0.4,
      price: 1094.04, weeklyPrices: [1018.80, 1031.34, 1066.07, 1070.23, 1094.04], weeklyChange: 7.39, dayChange: 2.22, sortRank: 0, periodReturns: { '1M': 34.6, 'YTD': 297.3, '6M': 286.8, '1Y': 722.1 },
      priceHistory: { '1D': [1070.23, 1088.94, 1116.42, 1116.99, 1106.26, 1097.34, 1101.22, 1083.03, 1080.83, 1076.87, 1082.95, 1075.02, 1075.68, 1078.07, 1087.85, 1092, 1098.5, 1094.38, 1097.4, 1094.07, 1085.81, 1086.56, 1088.44, 1094.04], '1W': [1018.8, 1031.34, 1066.07, 1070.23, 1094.04], '1M': [812.73, 845.76, 870.66, 880.72, 879.8, 921.26, 926.61, 940.69, 925.99, 847.47, 876.77, 846.01, 815.99, 868.09, 931.04, 1018.8, 1031.34, 1066.07, 1070.23, 1094.04], 'YTD': [275.39, 284.47, 312.28, 346.53, 446.57, 418.63, 407.25, 408.97, 421.85, 375.01, 385.97, 421.09, 424.96, 391.76, 496.3, 533.44, 559.9, 579.03, 738.54, 834.01, 740.84, 812.73, 921.26, 876.77, 931.04, 1094.04], '6M': [282.85, 280.08, 308.26, 312.28, 346.53, 446.57, 405.45, 407.25, 408.97, 409.67, 367.34, 373.98, 434.6, 378.79, 429.36, 503.13, 547.75, 586.25, 726.93, 766.44, 804.76, 810.46, 879.8, 847.47, 931.04, 1094.04], '1Y': [133.08, 144.33, 144.47, 149.05, 146.59, 152.68, 154.81, 151.69, 158.7, 164, 170.5, 191.59, 211.13, 228.13, 236.06, 225.01, 219.51, 214.4, 230.32, 265.55, 293.99, 261.38, 253.38, 266.87, 282.86, 288.13, 282.85, 280.08, 308.26, 312.28, 346.53, 446.57, 405.45, 431.17, 411.11, 407.84, 367.34, 373.98, 434.6, 378.79, 429.36, 503.13, 547.75, 586.25, 726.93, 782.64, 804.76, 810.46, 879.8, 847.47, 931.04, 1094.04] },
      velocityScore: { '1D': null, '1W': -0.8, '1M': -38.7, '6M': null }, isNew: false,
      marketCap: '$248B', pe: 104.3, revenueGrowth: 44, eps: 10.49, grossMargin: 42, dividendYield: 0.28,
      etfPresence: { AIS: 2.54, ARTY: 2.97, BAI: false, IGPT: 3.69, IVES: false, ALAI: 2.48, CHAT: false, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'CRWV', name: 'COREWEAVE INC CLASS A', easyScore: 4, avgWeight: 2.88, proScore: 1.15, coverage: 0.4,
      price: 111.29, weeklyPrices: [106.71, 117.03, 115.21, 117.95, 111.29], weeklyChange: 4.29, dayChange: -5.65, sortRank: 0, periodReturns: { '1M': 5.5, 'YTD': 55.4, '6M': 31.2, '1Y': -35.9 },
      priceHistory: { '1D': [117.95, 115.1, 116.28, 112.73, 111.82, 110.73, 109.39, 110, 109.52, 108.36, 107.62, 106.94, 107.86, 109.25, 110.23, 111.14, 111.7, 112.08, 112.5, 111.68, 110.56, 110.38, 110.37, 111.29], '1W': [106.71, 117.03, 115.21, 117.95, 111.29], '1M': [105.49, 105.89, 104.27, 106.86, 109.53, 124.82, 119.27, 110.93, 108.03, 100.39, 102.37, 98.45, 95.61, 95.74, 100.55, 106.71, 117.03, 115.21, 117.95, 111.29], 'YTD': [71.61, 77.09, 89.8, 91.79, 99.53, 82.46, 95.15, 97.14, 98.01, 79.5, 81.96, 82.12, 83.02, 77.47, 88.9, 117.2, 115.16, 105.53, 125.43, 114.7, 103.77, 105.49, 124.82, 102.37, 100.55, 111.29], '6M': [84.83, 73.9, 77.18, 89.8, 91.79, 99.53, 74.65, 95.15, 97.14, 97.63, 74.82, 79.86, 80.66, 80.45, 82.24, 102, 116.85, 110.14, 119.01, 128.84, 114.21, 107.58, 109.53, 100.39, 100.55, 111.29], '1Y': [173.68, 163.06, 151.45, 140.59, 129.77, 108.74, 106.01, 139.78, 96.8, 92.38, 93.34, 100.22, 118.75, 130.89, 136.85, 128.83, 141.62, 127.06, 136.06, 126.32, 105.61, 75.33, 73.6, 76.03, 90.66, 69.5, 84.83, 73.9, 77.18, 89.8, 91.79, 99.53, 74.65, 95.7, 89.25, 79.56, 74.82, 79.86, 80.66, 80.45, 82.24, 102, 116.85, 110.14, 119.01, 114.15, 114.21, 107.58, 109.53, 100.39, 100.55, 111.29] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$61B', pe: null, revenueGrowth: 112, eps: -2.72, grossMargin: 69, dividendYield: null,
      etfPresence: { AIS: false, ARTY: 4.85, BAI: 1.39, IGPT: false, IVES: 2.41, ALAI: false, CHAT: 2.88, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'COREWEAVE INC CLASS A appears in 4 of 10 AI & ML ETFs (40% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 4, avgWeight: 2.88, proScore: 1.15, coverage: 0.4,
      price: 175.34, weeklyPrices: [192.64, 188.33, 183.53, 184.29, 175.34], weeklyChange: -8.98, dayChange: -4.86, sortRank: 0, periodReturns: { '1M': -8.7, 'YTD': -10, '6M': -11.6, '1Y': -15.3 },
      priceHistory: { '1D': [184.29, 182.56, 183.07, 180.85, 180.16, 179.53, 178.79, 178.4, 177.74, 176.14, 175.98, 174.74, 175.71, 174.68, 174.91, 175.19, 175.85, 176.6, 176.43, 175.96, 174.97, 175.33, 174.79, 175.34], '1W': [192.64, 188.33, 183.53, 184.29, 175.34], '1M': [192.08, 193.06, 190.96, 203.7, 225.78, 248.15, 244.58, 230.33, 236.34, 213.68, 211.82, 205.81, 201.26, 184.1, 184.13, 192.64, 188.33, 183.53, 184.29, 175.34], 'YTD': [194.91, 189.65, 193.61, 178.18, 169.01, 146.67, 157.16, 156.54, 147.89, 152.37, 163.12, 154.69, 147.09, 147.11, 143.66, 163, 181.17, 165.96, 180.29, 193.84, 186.61, 192.08, 248.15, 211.82, 184.13, 175.34], '6M': [198.38, 197.21, 192.84, 193.61, 178.18, 169.01, 136.48, 157.16, 156.54, 150.31, 154.79, 159.16, 155.52, 142.81, 146.38, 138.09, 175.06, 173.28, 171.83, 194.59, 195.61, 189.77, 225.78, 213.68, 184.13, 175.34], '1Y': [207.04, 218.63, 234.5, 234.96, 238.11, 249.98, 252.53, 252.68, 249.07, 235.41, 225.3, 241.51, 306.65, 313.83, 281.24, 284.24, 308.01, 277.18, 281.4, 257.85, 240.83, 219.86, 200.28, 201.1, 221.53, 188.65, 198.38, 197.21, 192.84, 193.61, 178.18, 169.01, 136.48, 156.48, 148.08, 145.4, 154.79, 159.16, 155.52, 142.81, 146.38, 138.09, 175.06, 173.28, 171.83, 195.95, 195.61, 189.77, 225.78, 213.68, 184.13, 175.34] },
      velocityScore: { '1D': null, '1W': -3.4, '1M': -38.8, '6M': null }, isNew: false,
      marketCap: '$504B', pe: 30.1, revenueGrowth: 21, eps: 5.82, grossMargin: 66, dividendYield: 1.09,
      etfPresence: { AIS: false, ARTY: 3.67, BAI: false, IGPT: false, IVES: 3.62, ALAI: false, CHAT: 1.51, AIFD: false, SPRX: false, AOTG: 2.7 },
      tonyNote: 'Oracle lands in 3 AI ETFs on the strength of its cloud database and AI infrastructure contracts. Revenue grew 22%, 67% gross margin, P/E of 40x. The 17.5% weekly return following a major earnings beat shows how quickly sentiment can reprice; the weight score at 2.04% is still modest, meaning ETF managers have started building positions but conviction is not yet deep.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 5.11, proScore: 5.11, coverage: 1,
      price: 1211.38, weeklyPrices: [1087.99, 1020.76, 1043.19, 1133.99, 1211.38], weeklyChange: 11.34, dayChange: 6.82, sortRank: 0, periodReturns: { '1M': 61.3, 'YTD': 324.4, '6M': 338, '1Y': 892.3 },
      priceHistory: { '1D': [1133.99, 1174.3, 1188.9, 1194.12, 1185.39, 1180.89, 1188.43, 1180, 1180.41, 1183.04, 1193.68, 1191.61, 1191.95, 1192.87, 1194.31, 1197.91, 1199.98, 1197.08, 1191.48, 1188.6, 1192.2, 1189.38, 1193.95, 1211.38], '1W': [1087.99, 1020.76, 1043.19, 1133.99, 1211.38], '1M': [751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38], 'YTD': [285.41, 327.02, 333.35, 397.58, 435.79, 379.4, 410.34, 417.35, 429, 400.77, 418.69, 461.69, 395.53, 337.84, 406.73, 465.66, 449.38, 504.29, 576.45, 795.33, 681.54, 751, 1035.5, 949.28, 981.61, 1211.38], '6M': [276.59, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 410.34, 417.35, 415.56, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 646.63, 776.01, 762.1, 971, 864.01, 981.61, 1211.38], '1Y': [122.08, 123.25, 124.42, 120.11, 109.22, 111.96, 107.77, 123.72, 123.55, 116.42, 118.48, 135.24, 158.82, 166.41, 167.32, 185.69, 192.77, 206.77, 220.1, 234.7, 253.3, 241.95, 223.93, 239.49, 252.42, 232.51, 276.59, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 776.01, 762.1, 971, 864.01, 981.61, 1211.38] },
      velocityScore: { '1D': null, '1W': -15, '1M': -13.1, '6M': null }, isNew: false,
      marketCap: '$1.4T', pe: 57.1, revenueGrowth: 196, eps: 21.21, grossMargin: 58, dividendYield: 0.05,
      etfPresence: { SOXX: 8.39, PSI: 5.76, XSD: 2.62, DRAM: 3.68 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 4.92, proScore: 3.69, coverage: 0.75,
      price: 551.63, weeklyPrices: [547.26, 507.29, 512.48, 537.37, 551.63], weeklyChange: 0.8, dayChange: 2.65, sortRank: 0, periodReturns: { '1M': 18, 'YTD': 157.6, '6M': 156.6, '1Y': 325.7 },
      priceHistory: { '1D': [537.37, 541.58, 553.97, 546.97, 543.53, 542.64, 546.8, 545.23, 544.15, 537.45, 541.55, 541.85, 544.84, 543.04, 543.4, 544.28, 545.86, 545.97, 545.94, 546, 547.16, 544.11, 546.61, 551.63], '1W': [547.26, 507.29, 512.48, 537.37, 551.63], '1M': [467.51, 503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63], 'YTD': [214.16, 204.68, 223.6, 253.73, 252.18, 200.19, 213.58, 203.37, 210.86, 202.07, 204.83, 196.31, 205.37, 203.43, 231.82, 255.07, 284.49, 323.21, 341.54, 458.79, 420.99, 467.51, 510.13, 490.33, 511.57, 551.63], '6M': [214.95, 215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 213.58, 203.37, 203.68, 199.45, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 408.46, 449.7, 449.59, 516.1, 466.38, 511.57, 551.63], '1Y': [129.58, 141.9, 137.82, 155.61, 154.72, 177.44, 176.78, 172.28, 176.14, 163.36, 162.32, 155.82, 160.46, 160.9, 161.79, 211.51, 216.42, 240.56, 259.67, 259.65, 243.98, 240.52, 215.05, 215.24, 221.62, 209.17, 214.95, 215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 200.21, 199.45, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 449.7, 449.59, 516.1, 466.38, 511.57, 551.63] },
      velocityScore: { '1D': null, '1W': -16.3, '1M': -34.8, '6M': null }, isNew: false,
      marketCap: '$899B', pe: 183.3, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 7.48, PSI: 4.85, XSD: 2.44, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 4.6, proScore: 3.45, coverage: 0.75,
      price: 208.65, weeklyPrices: [212.45, 207.41, 204.65, 210.69, 208.65], weeklyChange: -1.79, dayChange: -0.97, sortRank: 0, periodReturns: { '1M': -3.1, 'YTD': 11.9, '6M': 13.6, '1Y': 44.7 },
      priceHistory: { '1D': [210.69, 212.35, 212.93, 212.7, 209.76, 208.95, 209.86, 209.83, 210.55, 209.26, 209.72, 209.42, 209.78, 209.04, 208.99, 208.84, 208.72, 209.05, 208.89, 208.77, 208.71, 208.01, 207.8, 208.65], '1W': [212.45, 207.41, 204.65, 210.69, 208.65], '1M': [215.33, 214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65], 'YTD': [186.5, 185.04, 183.14, 184.84, 192.51, 174.19, 190.05, 187.9, 195.56, 183.04, 186.03, 181.93, 175.2, 174.4, 182.08, 196.51, 199.88, 213.17, 198.48, 219.44, 222.32, 215.33, 224.36, 208.64, 205.19, 208.65], '6M': [183.69, 187.54, 189.11, 183.14, 184.84, 192.51, 171.88, 190.05, 187.9, 184.89, 183.34, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 198.45, 211.5, 235.74, 219.51, 211.14, 205.1, 205.19, 208.65], '1Y': [144.17, 157.99, 160, 170.7, 167.03, 175.51, 180, 182.06, 182.01, 179.81, 170.78, 170.76, 174.88, 178.43, 186.58, 185.04, 188.32, 182.64, 191.49, 206.88, 199.05, 186.6, 182.55, 181.46, 184.97, 177.72, 183.69, 187.54, 189.11, 183.14, 184.84, 192.51, 171.88, 186.94, 189.82, 177.19, 183.34, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 235.74, 219.51, 211.14, 205.1, 205.19, 208.65] },
      velocityScore: { '1D': null, '1W': 17.3, '1M': -1.7, '6M': null }, isNew: false,
      marketCap: '$5.1T', pe: 32, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.47,
      etfPresence: { SOXX: 7.17, PSI: 4.47, XSD: 2.16, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.53, proScore: 3.4, coverage: 0.75,
      price: 140.94, weeklyPrices: [127.86, 117.05, 121.10, 133.99, 140.94], weeklyChange: 10.23, dayChange: 5.19, sortRank: 0, periodReturns: { '1M': 17.6, 'YTD': 282, '6M': 287.5, '1Y': 565.1 },
      priceHistory: { '1D': [133.99, 136.92, 139.17, 139.63, 138.58, 138.72, 139.54, 138.47, 138.61, 137.62, 138.61, 139.46, 140, 139.91, 140.7, 140.65, 140.39, 140.23, 140.57, 140.48, 140.82, 140.67, 140.86, 140.94], '1W': [127.86, 117.05, 121.1, 133.99, 140.94], '1M': [119.84, 123.52, 121.77, 120.89, 114.68, 109.33, 107.93, 112.71, 111.78, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94], 'YTD': [36.9, 41.11, 48.72, 54.32, 48.66, 48.6, 48.29, 44.62, 46.88, 45.58, 47.98, 44.06, 44.06, 44.13, 58.95, 63.81, 66.26, 84.52, 95.78, 129.44, 108.17, 119.84, 109.33, 110.27, 124.57, 140.94], '6M': [36.37, 37.3, 42.63, 48.72, 54.32, 48.66, 48.24, 48.29, 44.62, 45.46, 45.95, 45.25, 46.18, 44.1, 50.38, 62.38, 68.5, 82.54, 99.62, 109.62, 115.93, 118.5, 114.68, 99.17, 124.57, 140.94], '1Y': [21.19, 22.4, 23.59, 22.92, 23.24, 20.41, 19.5, 20.65, 23.66, 24.55, 24.21, 24.44, 25.27, 29.34, 33.55, 37.17, 37.22, 38.1, 39.54, 39.5, 38.45, 34.71, 35.79, 43.47, 40.5, 37.31, 36.37, 37.3, 42.63, 48.72, 54.32, 48.66, 48.24, 46.48, 44.11, 45.61, 45.95, 45.25, 46.18, 44.1, 50.38, 62.38, 68.5, 82.54, 99.62, 124.92, 115.93, 118.5, 114.68, 99.17, 124.57, 140.94] },
      velocityScore: { '1D': null, '1W': -10.5, '1M': -11.5, '6M': null }, isNew: false,
      marketCap: '$708B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 6.07, PSI: 4.94, XSD: 2.58, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.59, proScore: 2.69, coverage: 0.75,
      price: 445.48, weeklyPrices: [427.58, 416.00, 414.45, 434.46, 445.48], weeklyChange: 4.19, dayChange: 2.54, sortRank: 0, periodReturns: { '1M': 12.2, 'YTD': 64.3, '6M': 61.5, '1Y': 92.9 },
      priceHistory: { '1D': [434.46, 437, 439.2, 442, 438.17, 438.23, 439.34, 439.36, 442.86, 439.18, 441.09, 441.87, 442.1, 442, 442.61, 442.4, 442.19, 442.51, 442.35, 442.86, 442.36, 442.29, 442.8, 445.48], '1W': [427.58, 416, 414.45, 434.46, 445.48], '1M': [397.07, 419.94, 416.88, 419.01, 413.85, 402.69, 423.2, 437.67, 428.76, 401.39, 403.89, 404.62, 392.67, 412.13, 417.79, 427.58, 416, 414.45, 434.46, 445.48], 'YTD': [271.2, 299.16, 297.99, 308.52, 318.7, 320.44, 337, 345.3, 360.8, 341.51, 319.22, 313.66, 321.83, 318.14, 346.21, 348.6, 375.27, 383.26, 397.02, 422.73, 418.58, 397.07, 402.69, 403.89, 417.79, 445.48], '6M': [275.82, 274.82, 292.89, 297.99, 308.52, 318.7, 322.12, 337, 345.3, 354.35, 329.72, 307.27, 310.44, 313.42, 318.34, 350.14, 371.45, 399.57, 397.69, 408.52, 426.79, 384.21, 413.85, 401.39, 417.79, 445.48], '1Y': [230.98, 238.02, 245.15, 240.42, 235.5, 230.75, 222.4, 224.07, 231.55, 254.49, 248.32, 248.18, 244.1, 246.78, 245.7, 233.75, 234.67, 246.22, 243.01, 233.61, 232, 229.94, 239.4, 272.97, 276.24, 278.4, 275.82, 274.82, 292.89, 297.99, 308.52, 318.7, 322.12, 331.36, 355.03, 355.79, 329.72, 307.27, 310.44, 313.42, 318.34, 350.14, 371.45, 399.57, 397.69, 416.52, 426.79, 384.21, 413.85, 401.39, 417.79, 445.48] },
      velocityScore: { '1D': null, '1W': 12.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$217B', pe: 66.2, revenueGrowth: 37, eps: 6.73, grossMargin: 64, dividendYield: 1.01,
      etfPresence: { SOXX: 3.77, PSI: 4.71, XSD: 2.28, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.6% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 5.54, proScore: 2.77, coverage: 0.5,
      price: 640.18, weeklyPrices: [585.78, 568.23, 592.92, 617.11, 640.18], weeklyChange: 9.29, dayChange: 3.74, sortRank: 0, periodReturns: { '1M': 48.1, 'YTD': 149.1, '6M': 147.2, '1Y': 272.3 },
      priceHistory: { '1D': [617.11, 628.12, 630.52, 635.34, 626.84, 623.61, 627.5, 627.18, 628.02, 623.13, 625.34, 623.57, 627.19, 624.08, 624.64, 625.74, 625.09, 625.58, 623.5, 623.75, 622.37, 625.52, 630.71, 640.18], '1W': [585.78, 568.23, 592.92, 617.11, 640.18], '1M': [432.16, 454.89, 448.25, 449.68, 450.06, 458.17, 490.05, 500.77, 501.7, 453.01, 492.17, 499.21, 497.01, 552.64, 567.25, 585.78, 568.23, 592.92, 617.11, 640.18], 'YTD': [256.99, 281.64, 301.89, 318.79, 341.34, 297.6, 339.88, 369.83, 394.95, 357.76, 351.07, 352.46, 373.99, 341.79, 385.72, 395.64, 394.33, 381.11, 391.38, 443.62, 413.57, 432.16, 458.17, 492.17, 567.25, 640.18], '6M': [259.01, 259.97, 292.2, 301.89, 318.79, 341.34, 303.99, 339.88, 369.83, 375.72, 346.53, 337.27, 357.21, 338.55, 348.47, 399.49, 396.94, 417.04, 389.08, 410.64, 440.56, 427.36, 450.06, 453.01, 567.25, 640.18], '1Y': [171.96, 183.07, 194.99, 199.29, 187.14, 188.41, 182.82, 184.38, 163.53, 161.99, 157.57, 163.5, 173.54, 200.87, 204.74, 211.56, 219.48, 228.13, 231.33, 237.71, 235.08, 228.71, 230.91, 265.33, 267.14, 258.84, 259.01, 259.97, 292.2, 301.89, 318.79, 341.34, 303.99, 328.39, 375.38, 372.3, 346.53, 337.27, 357.21, 338.55, 348.47, 399.49, 396.94, 417.04, 389.08, 435.44, 440.56, 427.36, 450.06, 453.01, 567.25, 640.18] },
      velocityScore: { '1D': null, '1W': -2.5, '1M': -6.1, '6M': null }, isNew: false,
      marketCap: '$508B', pe: 60.3, revenueGrowth: 11, eps: 10.61, grossMargin: 49, dividendYield: 0.34,
      etfPresence: { SOXX: 4.92, PSI: 6.17, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 5.36, proScore: 2.68, coverage: 0.5,
      price: 269.16, weeklyPrices: [256.42, 237.33, 238.73, 259.56, 269.16], weeklyChange: 4.97, dayChange: 3.7, sortRank: 0, periodReturns: { '1M': 42.5, 'YTD': 121.5, '6M': 112.7, '1Y': 214.3 },
      priceHistory: { '1D': [259.56, 263.7, 266.58, 269.2, 266.42, 265.6, 267.37, 267.27, 267.28, 265.03, 266.24, 265.96, 267.54, 268.26, 267.83, 267.9, 267.23, 267.55, 266.41, 265.98, 265.35, 266.17, 267.07, 269.16], '1W': [256.42, 237.33, 238.73, 259.56, 269.16], '1M': [188.84, 201.14, 195.72, 192.76, 192.17, 194, 204.52, 212.51, 213.11, 192.92, 210.81, 213.94, 213.56, 241.16, 254.54, 256.42, 237.33, 238.73, 259.56, 269.16], 'YTD': [121.51, 132.46, 143.45, 150, 168.47, 130.72, 147.95, 146.99, 154.67, 147.59, 146.5, 148.13, 156.62, 147.24, 167.23, 179.59, 178.54, 180.9, 171.33, 184.52, 175.65, 188.84, 194, 210.81, 254.54, 269.16], '6M': [126.57, 124.36, 135.97, 143.45, 150, 168.47, 133.1, 147.95, 146.99, 152.43, 142.94, 140.96, 151.15, 145.11, 151.68, 173.73, 179.14, 193.5, 172.63, 176.32, 189.29, 184.22, 192.17, 192.92, 254.54, 269.16], '1Y': [85.63, 89.57, 91.92, 93.65, 89.22, 91.61, 91.56, 91.02, 88.34, 87.96, 84.64, 91.77, 99.06, 107.12, 107.86, 108.47, 102.5, 115.29, 121.51, 121.91, 121.79, 113.37, 113.67, 118.99, 122.56, 122.34, 126.57, 124.36, 135.97, 143.45, 150, 168.47, 133.1, 145.09, 149.6, 152.46, 142.94, 140.96, 151.15, 145.11, 151.68, 173.73, 179.14, 193.5, 172.63, 186.92, 189.29, 184.22, 192.17, 192.92, 254.54, 269.16] },
      velocityScore: { '1D': null, '1W': 6.8, '1M': 2.7, '6M': null }, isNew: false,
      marketCap: '$352B', pe: 76.2, revenueGrowth: 12, eps: 3.53, grossMargin: 61, dividendYield: 0.35,
      etfPresence: { SOXX: 4.85, PSI: 5.87, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 4.94, proScore: 2.47, coverage: 0.5,
      price: 409.54, weeklyPrices: [388.92, 369.34, 374.18, 389.04, 409.54], weeklyChange: 5.3, dayChange: 5.27, sortRank: 0, periodReturns: { '1M': 34.1, 'YTD': 139.2, '6M': 133.7, '1Y': 347 },
      priceHistory: { '1D': [389.04, 394.41, 398.34, 400.24, 394.23, 392.74, 394.58, 394.34, 396.25, 393.26, 397.06, 396.67, 398.11, 396.3, 397.77, 398.2, 396.63, 397.1, 395.63, 396.01, 395.73, 396.59, 400.54, 409.54], '1W': [388.92, 369.34, 374.18, 389.04, 409.54], '1M': [305.35, 322.68, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04, 409.54], 'YTD': [171.18, 200.96, 208.79, 220.7, 248.17, 209.78, 235.12, 237.39, 249.48, 222.99, 218.87, 226.47, 238.84, 213.66, 246.49, 272.41, 258.37, 251.23, 258.57, 296.05, 277.96, 305.35, 317.12, 324.45, 366.81, 409.54], '6M': [175.26, 173.78, 203.08, 208.79, 220.7, 248.17, 213.31, 235.12, 237.39, 239.07, 214.68, 209.49, 233.99, 211.62, 218.44, 263.66, 267.6, 267.78, 256.72, 286.52, 299.15, 302.24, 318.18, 303.28, 366.81, 409.54], '1Y': [91.61, 97.34, 99.83, 101.07, 97.69, 98.94, 98.41, 102, 98.88, 101.28, 97.03, 105.57, 120.47, 131.93, 133.9, 140.35, 137.81, 144.05, 156.9, 161.24, 166.37, 147.46, 150.38, 158.19, 165.81, 163.26, 175.26, 173.78, 203.08, 208.79, 220.7, 248.17, 213.31, 231.29, 244.92, 233.89, 214.68, 209.49, 233.99, 211.62, 218.44, 263.66, 267.6, 267.78, 256.72, 294.05, 299.15, 302.24, 318.18, 303.28, 366.81, 409.54] },
      velocityScore: { '1D': null, '1W': 7.4, '1M': -7.5, '6M': null }, isNew: false,
      marketCap: '$512B', pe: 77.4, revenueGrowth: 24, eps: 5.29, grossMargin: 50, dividendYield: 0.27,
      etfPresence: { SOXX: 4.39, PSI: 5.49, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 4.44, proScore: 2.22, coverage: 0.5,
      price: 392.13, weeklyPrices: [393.94, 376.71, 392.90, 411.35, 392.13], weeklyChange: -0.46, dayChange: -4.67, sortRank: 0, periodReturns: { '1M': -5.3, 'YTD': 13.3, '6M': 14.8, '1Y': 54.5 },
      priceHistory: { '1D': [411.35, 401.18, 399.14, 400.04, 395.82, 393.98, 394.83, 394.82, 396.66, 395.19, 396.83, 396.23, 397.16, 396.37, 396.64, 396.23, 396.15, 397.02, 395.98, 395.42, 394.77, 394.63, 395.31, 392.13], '1W': [393.94, 376.71, 392.9, 411.35, 392.13], '1M': [414.14, 422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13], 'YTD': [346.1, 332.48, 339.89, 325.49, 330.73, 308.05, 342.76, 333.99, 332.31, 317.53, 341.57, 321.31, 318.29, 309.51, 350.63, 380.78, 402.17, 399.83, 416.5, 428.43, 420.71, 414.14, 459.97, 396.6, 382.07, 392.13], '6M': [341.45, 349.85, 343.5, 339.89, 325.49, 330.73, 310.51, 342.76, 333.99, 321.7, 332.77, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 421.28, 412.56, 439.79, 414.57, 446.77, 385.73, 382.07, 392.13], '1Y': [253.77, 275.65, 271.8, 280.94, 278.59, 297.42, 297.72, 303.9, 305.76, 294.23, 298.24, 336.67, 360, 338.94, 329.91, 336.41, 356.7, 349.24, 362.05, 362.55, 358.39, 342.65, 377.96, 381.57, 406.29, 341.3, 341.45, 349.85, 343.5, 339.89, 325.49, 330.73, 310.51, 331.17, 332.65, 319.55, 332.77, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 439.79, 414.57, 446.77, 385.73, 382.07, 392.13] },
      velocityScore: { '1D': null, '1W': 21.3, '1M': -41, '6M': null }, isNew: false,
      marketCap: '$1.9T', pe: 65.2, revenueGrowth: 48, eps: 6.01, grossMargin: 76, dividendYield: 0.63,
      etfPresence: { SOXX: 6.61, PSI: false, XSD: 2.27, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 3.98, proScore: 1.99, coverage: 0.5,
      price: 307.86, weeklyPrices: [308.88, 278.67, 289.54, 310.58, 307.86], weeklyChange: -0.33, dayChange: -0.88, sortRank: 0, periodReturns: { '1M': 56.8, 'YTD': 262.3, '6M': 263, '1Y': 335 },
      priceHistory: { '1D': [310.58, 300.81, 307.99, 311.26, 305.63, 304.1, 301.68, 302, 302.73, 299.29, 301.08, 301.86, 304.15, 303.59, 306.43, 305.98, 306.79, 307.14, 306.05, 305.15, 305, 305, 305.82, 307.86], '1W': [308.88, 278.67, 289.54, 310.58, 307.86], '1M': [196.33, 208.26, 198.7, 204.83, 205, 219.43, 290.79, 301.65, 316.43, 263.47, 288.85, 266.88, 252.59, 280.71, 279.7, 308.88, 278.67, 289.54, 310.58, 307.86], 'YTD': [84.98, 83.45, 81.21, 83.1, 81.34, 73.73, 81.34, 79.61, 80.92, 78.09, 90.44, 90.79, 92.36, 99.05, 114.45, 133.83, 151.31, 153.23, 163.66, 170.84, 168.93, 196.33, 219.43, 288.85, 279.7, 307.86], '6M': [84.8, 86.76, 84.64, 81.21, 83.1, 81.34, 74.21, 81.34, 79.61, 79.29, 75.68, 87.67, 89.53, 97.68, 107.11, 128.49, 139.69, 164.31, 164.95, 160.01, 182.58, 190.69, 205, 263.47, 279.7, 307.86], '1Y': [70.78, 77.4, 71.95, 72.41, 71.99, 76.34, 76.53, 77.28, 76.74, 72.95, 64.6, 66.84, 68.86, 74.62, 84.07, 86.97, 89.39, 85.84, 88.71, 90.37, 93.23, 83.45, 83.79, 92.89, 88.9, 84.07, 84.8, 86.76, 84.64, 81.21, 83.1, 81.34, 74.21, 78.23, 79.48, 81.69, 75.68, 87.67, 89.53, 97.68, 107.11, 128.49, 139.69, 164.31, 164.95, 170.13, 182.58, 190.69, 205, 263.47, 279.7, 307.86] },
      velocityScore: { '1D': null, '1W': -37.4, '1M': -41.3, '6M': null }, isNew: false,
      marketCap: '$269B', pe: 105.4, revenueGrowth: 28, eps: 2.92, grossMargin: 52, dividendYield: 0.08,
      etfPresence: { SOXX: 5.44, PSI: false, XSD: 2.53, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 3.07, proScore: 1.54, coverage: 0.5,
      price: 332.28, weeklyPrices: [313.34, 305.71, 301.88, 322.86, 332.28], weeklyChange: 6.04, dayChange: 2.92, sortRank: 0, periodReturns: { '1M': 7.5, 'YTD': 91.5, '6M': 85.8, '1Y': 65 },
      priceHistory: { '1D': [322.86, 327.89, 330.67, 333.63, 330.7, 329.91, 331.04, 330.8, 331.78, 328.47, 329.41, 328.92, 330.19, 329.27, 329.81, 329.7, 329.58, 329.76, 328.83, 328.97, 329.51, 329.17, 329.93, 332.28], '1W': [313.34, 305.71, 301.88, 322.86, 332.28], '1M': [309.21, 324.89, 317.45, 315.95, 305.68, 293.2, 308.12, 308.59, 305.37, 285.06, 290.9, 288.63, 282.01, 297.1, 301.12, 313.34, 305.71, 301.88, 322.86, 332.28], 'YTD': [173.49, 188.45, 193.45, 194.99, 218.97, 222.92, 226.56, 218.05, 213.9, 202.39, 198.67, 194.45, 194.63, 194.14, 208.9, 218.87, 233.15, 265, 280.89, 297.76, 300.6, 309.21, 293.2, 290.9, 301.12, 332.28], '6M': [178.82, 175.42, 185.71, 193.45, 194.99, 218.97, 223.98, 226.56, 218.05, 212.63, 197.98, 190.05, 188.29, 193.41, 194.87, 214.73, 229.82, 277.14, 281.02, 285.24, 308.17, 298.39, 305.68, 285.06, 301.12, 332.28], '1Y': [201.39, 207.62, 216.63, 218.36, 214.92, 191.38, 182.73, 183.71, 194.33, 205.97, 199.81, 185.03, 177.63, 182.04, 183.73, 177.05, 175.11, 179.59, 169.41, 161.46, 160.58, 154.99, 161.26, 175.26, 179.52, 177.56, 178.82, 175.42, 185.71, 193.45, 194.99, 218.97, 223.98, 223, 219.73, 212.11, 197.98, 190.05, 188.29, 193.41, 194.87, 214.73, 229.82, 277.14, 281.02, 287.8, 308.17, 298.39, 305.68, 285.06, 301.12, 332.28] },
      velocityScore: { '1D': null, '1W': 9.2, '1M': -51.1, '6M': null }, isNew: false,
      marketCap: '$302B', pe: 56.9, revenueGrowth: 19, eps: 5.84, grossMargin: 57, dividendYield: 1.76,
      etfPresence: { SOXX: 3.79, PSI: false, XSD: 2.36, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.88, proScore: 1.44, coverage: 0.5,
      price: 323.24, weeklyPrices: [315.88, 302.89, 298.20, 313.27, 323.24], weeklyChange: 2.33, dayChange: 3.18, sortRank: 0, periodReturns: { '1M': 2.1, 'YTD': 48.9, '6M': 41.2, '1Y': 53.3 },
      priceHistory: { '1D': [313.27, 320.04, 324.23, 327.05, 323.77, 324.29, 324.64, 325.36, 326.37, 321.5, 322.55, 323.01, 322.48, 321.49, 322.2, 321.64, 321.85, 321.43, 320.57, 320.54, 319.68, 319.52, 321.44, 323.24], '1W': [315.88, 302.89, 298.2, 313.27, 323.24], '1M': [316.47, 332.67, 329.24, 330.28, 321.35, 311.38, 323.62, 321.88, 322.22, 295.96, 301.14, 297.41, 285.56, 302.55, 304.86, 315.88, 302.89, 298.2, 313.27, 323.24], 'YTD': [217.06, 237.89, 240.81, 236.75, 233.5, 226.86, 249.75, 232.11, 235.07, 216.37, 199.87, 194.02, 196.4, 196.86, 204.27, 209.89, 224.5, 230.39, 290.76, 305.99, 291.68, 316.47, 311.38, 301.14, 304.86, 323.24], '6M': [228.94, 219.98, 239.34, 240.81, 236.75, 233.5, 222.13, 249.75, 232.11, 232.23, 210.58, 191.22, 192.35, 196.92, 194.55, 204.37, 216.03, 244.04, 295.24, 290.22, 294.17, 299.38, 321.35, 295.96, 304.86, 323.24], '1Y': [210.86, 218.49, 232.34, 221.06, 228, 226.74, 211.99, 205.16, 232.01, 236.67, 232.66, 223.69, 220.99, 225.62, 227.73, 219.58, 216.7, 219.82, 221.56, 210.39, 205.13, 190.51, 191.56, 215.35, 228.05, 229.75, 228.94, 219.98, 239.34, 240.81, 236.75, 233.5, 222.13, 242.19, 232.27, 227.01, 210.58, 191.22, 192.35, 196.92, 194.55, 204.37, 216.03, 244.04, 295.24, 294.75, 294.17, 299.38, 321.35, 295.96, 304.86, 323.24] },
      velocityScore: { '1D': null, '1W': 5.9, '1M': -30.8, '6M': null }, isNew: false,
      marketCap: '$82B', pe: 30.9, revenueGrowth: 12, eps: 10.46, grossMargin: 56, dividendYield: 1.29,
      etfPresence: { SOXX: 3.5, PSI: false, XSD: 2.26, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 2.83, proScore: 1.42, coverage: 0.5,
      price: 221.9, weeklyPrices: [220.81, 214.07, 212.97, 226.11, 221.90], weeklyChange: 0.49, dayChange: -1.86, sortRank: 0, periodReturns: { '1M': -6.8, 'YTD': 29.7, '6M': 27.4, '1Y': 44.9 },
      priceHistory: { '1D': [226.11, 222.42, 228.71, 231.05, 226.2, 226.66, 228.66, 229.44, 230.65, 226.54, 227.7, 227.6, 229.04, 229.38, 229.39, 228.83, 227.86, 227.23, 225.18, 223.4, 221.89, 222.06, 222.92, 221.9], '1W': [220.81, 214.07, 212.97, 226.11, 221.9], '1M': [238.16, 248.82, 233.4, 243.29, 251.02, 228.99, 240.84, 250.01, 242.57, 215.94, 217.77, 205.42, 191.2, 202.96, 211.72, 220.81, 214.07, 212.97, 226.11, 221.9], 'YTD': [171.05, 181.87, 164.54, 157.8, 152.22, 148.89, 141.04, 141.27, 145.82, 139.51, 134.12, 131.59, 128.67, 128.78, 127.51, 132.84, 135.56, 150, 168.38, 237.53, 203.64, 238.16, 228.99, 217.77, 211.72, 221.9], '6M': [174.22, 173.65, 180.19, 164.54, 157.8, 152.22, 136.3, 141.04, 141.27, 145.59, 137, 131.15, 131.28, 130.54, 126.8, 128.06, 136.2, 148.85, 177.01, 202.55, 200.08, 213.41, 251.02, 215.94, 211.72, 221.9], '1Y': [153.14, 159.26, 159.45, 154.3, 157.99, 162.08, 147.51, 147.97, 158.9, 156.42, 158.78, 158.66, 164.14, 169.53, 166.36, 165.46, 161.78, 167.04, 187.68, 180.72, 171.57, 166.75, 165.06, 170.7, 176, 176.12, 174.22, 173.65, 180.19, 164.54, 157.8, 152.22, 136.3, 138.47, 142.88, 142.36, 137, 131.15, 131.28, 130.54, 126.8, 128.06, 136.2, 148.85, 177.01, 219.09, 200.08, 213.41, 251.02, 215.94, 211.72, 221.9] },
      velocityScore: { '1D': null, '1W': -3.4, '1M': -38.5, '6M': null }, isNew: false,
      marketCap: '$234B', pe: 23.9, revenueGrowth: -4, eps: 9.29, grossMargin: 55, dividendYield: 1.63,
      etfPresence: { SOXX: 3.23, PSI: false, XSD: 2.43, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.75, proScore: 1.37, coverage: 0.5,
      price: 1537.88, weeklyPrices: [1652.29, 1498.77, 1448.21, 1563.70, 1537.88], weeklyChange: -6.92, dayChange: -1.65, sortRank: 0, periodReturns: { '1M': -3.3, 'YTD': 69.7, '6M': 62.7, '1Y': 122 },
      priceHistory: { '1D': [1563.7, 1546, 1541.65, 1538.42, 1520.57, 1510.48, 1516.84, 1530.59, 1536.23, 1523.35, 1525.05, 1521.95, 1528.7, 1521.41, 1523.18, 1528.45, 1530.69, 1535.94, 1528.64, 1526, 1524.77, 1522.3, 1526.34, 1537.88], '1W': [1652.29, 1498.77, 1448.21, 1563.7, 1537.88], '1M': [1589.81, 1662.98, 1620.17, 1633.17, 1566.21, 1542.39, 1624.99, 1689.89, 1652.6, 1481.05, 1559.18, 1531.98, 1473.04, 1589.55, 1577.32, 1652.29, 1498.77, 1448.21, 1563.7, 1537.88], 'YTD': [906.36, 959.09, 983.6, 1076.67, 1183.15, 1136.83, 1196.73, 1175.22, 1231.95, 1099.02, 1071.09, 1066.66, 1101.59, 1093.35, 1312.94, 1363.42, 1527.95, 1504.08, 1573.3, 1661.1, 1486.33, 1589.81, 1542.39, 1559.18, 1577.32, 1537.88], '6M': [945.16, 923.91, 959.08, 983.6, 1076.67, 1183.15, 1155.99, 1196.73, 1175.22, 1180.13, 1078.44, 1033.88, 1092.69, 1058.28, 1118.49, 1353.85, 1468.35, 1632.06, 1583.48, 1575.96, 1613.97, 1561.25, 1566.21, 1481.05, 1577.32, 1537.88], '1Y': [692.62, 731.38, 761.31, 717.62, 719.98, 724.37, 830.63, 797.51, 850.31, 837.86, 823.65, 857.87, 857.02, 914.27, 920.64, 945.49, 981.67, 1031.59, 1105.05, 1003.93, 976.31, 897.01, 892.97, 952.18, 962.95, 951.36, 945.16, 923.91, 959.08, 983.6, 1076.67, 1183.15, 1155.99, 1155.93, 1204.1, 1142.74, 1078.44, 1033.88, 1092.69, 1058.28, 1118.49, 1353.85, 1468.35, 1632.06, 1583.48, 1600.84, 1613.97, 1561.25, 1566.21, 1481.05, 1577.32, 1537.88] },
      velocityScore: { '1D': null, '1W': 0, '1M': -34.8, '6M': null }, isNew: false,
      marketCap: '$76B', pe: 110.5, revenueGrowth: 26, eps: 13.92, grossMargin: 55, dividendYield: 0.51,
      etfPresence: { SOXX: 3.31, PSI: false, XSD: 2.18, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 2.6, proScore: 1.3, coverage: 0.5,
      price: 439.66, weeklyPrices: [389.20, 361.71, 374.68, 417.07, 439.66], weeklyChange: 12.97, dayChange: 5.42, sortRank: 0, periodReturns: { '1M': 43.3, 'YTD': 164.3, '6M': 154.7, '1Y': 411.5 },
      priceHistory: { '1D': [417.07, 436.27, 427.74, 430.27, 426.98, 427.86, 427.55, 426.25, 420.12, 413.29, 419.71, 420.34, 425.47, 420.39, 422.54, 427.35, 428.17, 428.39, 429.17, 427.99, 430.22, 431.61, 435.98, 439.66], '1W': [389.2, 361.71, 374.68, 417.07, 439.66], '1M': [306.88, 318.72, 325.33, 349.17, 342.85, 320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 361.71, 374.68, 417.07, 439.66], 'YTD': [166.36, 156.73, 172.14, 176.35, 160.46, 144.67, 143.71, 132.62, 128.15, 113.77, 124.71, 127.57, 121.76, 109.6, 125.46, 170.6, 191.97, 183.31, 201.25, 207.35, 215.58, 306.88, 320.09, 346.33, 367.15, 439.66], '6M': [172.62, 170.84, 165.77, 172.14, 176.35, 160.46, 142.82, 143.71, 132.62, 124.67, 120, 119.9, 126.16, 113.61, 117.14, 149.05, 174.05, 212.84, 202.68, 195.65, 228.64, 297.84, 342.85, 317.06, 367.15, 439.66], '1Y': [85.95, 90.42, 92.3, 92.36, 116.91, 118.41, 137.93, 179.43, 186.43, 174.15, 174.24, 214.49, 238.79, 230.11, 195.8, 212.1, 199.53, 156.31, 170.28, 191.56, 173.74, 141.39, 147.75, 142.94, 167.08, 144.94, 172.62, 170.84, 165.77, 172.14, 176.35, 160.46, 142.82, 126.58, 129.68, 118.83, 120, 119.9, 126.16, 113.61, 117.14, 149.05, 174.05, 212.84, 202.68, 199.79, 228.64, 297.84, 342.85, 317.06, 367.15, 439.66] },
      velocityScore: { '1D': null, '1W': -24.4, '1M': -39, '6M': null }, isNew: false,
      marketCap: '$75B', pe: 301.1, revenueGrowth: 93, eps: 1.46, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.61, PSI: false, XSD: 2.59, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.35, proScore: 1.18, coverage: 0.5,
      price: 102.71, weeklyPrices: [100.32, 95.63, 94.11, 99.77, 102.71], weeklyChange: 2.38, dayChange: 2.95, sortRank: 0, periodReturns: { '1M': 9.9, 'YTD': 61.2, '6M': 55.1, '1Y': 49.8 },
      priceHistory: { '1D': [99.77, 102.13, 102.81, 103.75, 102.75, 102.37, 102.64, 102.64, 102.89, 101.49, 102.13, 101.9, 102.04, 101.9, 101.92, 101.68, 102.27, 102.21, 101.89, 101.76, 101.65, 101.49, 101.86, 102.71], '1W': [100.32, 95.63, 94.11, 99.77, 102.71], '1M': [93.43, 98.05, 96.85, 96.04, 94.65, 91.52, 96.96, 96.55, 96.3, 88.34, 91.37, 91.47, 87.91, 92.94, 95.24, 100.32, 95.63, 94.11, 99.77, 102.71], 'YTD': [63.72, 73.53, 74.68, 75.47, 79.36, 78.23, 80.75, 77.16, 75.47, 69.9, 65.79, 64.59, 65.63, 64.61, 70.73, 74.5, 80.93, 84.26, 95.3, 99.03, 92.76, 93.43, 91.52, 91.37, 95.24, 102.71], '6M': [66.24, 64.68, 73.94, 74.68, 75.47, 79.36, 78.04, 80.75, 77.16, 74.97, 67.81, 62.73, 63.29, 64.2, 65.6, 71.56, 78.76, 89.44, 93.95, 101.58, 97.04, 91.11, 94.65, 88.34, 95.24, 102.71], '1Y': [68.58, 70.37, 74.56, 73.11, 75.26, 70.68, 66.59, 60.95, 65.56, 68.55, 63.6, 64.76, 64.45, 64.71, 64.22, 64.96, 64.39, 67.07, 64.55, 62.41, 55.41, 51.7, 51.25, 56.71, 66.85, 65.9, 66.24, 64.68, 73.94, 74.68, 75.47, 79.36, 78.04, 78.92, 77.73, 74.64, 67.81, 62.73, 63.29, 64.2, 65.6, 71.56, 78.76, 89.44, 93.95, 99.09, 97.04, 91.11, 94.65, 88.34, 95.24, 102.71] },
      velocityScore: { '1D': null, '1W': 1.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$56B', pe: 466.9, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 1.82,
      etfPresence: { SOXX: 2.37, PSI: false, XSD: 2.34, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 2.2, proScore: 1.1, coverage: 0.5,
      price: 131.55, weeklyPrices: [125.90, 118.25, 112.92, 121.62, 131.55], weeklyChange: 4.49, dayChange: 8.16, sortRank: 0, periodReturns: { '1M': 13.2, 'YTD': 142.9, '6M': 133.4, '1Y': 147.4 },
      priceHistory: { '1D': [121.62, 128.74, 131.32, 132.21, 130.76, 130.02, 129.32, 131.01, 131.62, 129.93, 131.23, 131.08, 131.55, 130.93, 130.74, 130.79, 130.72, 130.22, 129.94, 129.63, 129.74, 129.8, 130.42, 131.55], '1W': [125.9, 118.25, 112.92, 121.62, 131.55], '1M': [116.2, 127, 124.89, 123.77, 120.62, 120.92, 128.64, 133.93, 131.82, 117.26, 120.9, 117, 110.17, 115.96, 116.79, 125.9, 118.25, 112.92, 121.62, 131.55], 'YTD': [54.15, 60.89, 60.58, 63.07, 62.2, 62.06, 71.18, 68.09, 69.68, 62.53, 59.24, 60.98, 62.34, 61.92, 68.38, 72.05, 86.91, 93.3, 102.04, 107.24, 109.43, 116.2, 120.92, 120.9, 116.79, 131.55], '6M': [56.37, 54.24, 61.89, 60.58, 63.07, 62.2, 63.1, 71.18, 68.09, 68.16, 60.85, 57.69, 59.29, 60.87, 62.19, 68.65, 83.01, 98.4, 103.03, 100.61, 118.37, 109.61, 120.62, 117.26, 116.79, 131.55], '1Y': [53.17, 52.41, 57.62, 58.93, 62.45, 58.38, 47.97, 47.1, 50.53, 50.95, 48.94, 48.62, 49.56, 50.42, 49.31, 48.17, 50.11, 54.89, 52.68, 50.46, 48.54, 46.02, 47.39, 51.48, 55.23, 54.56, 56.37, 54.24, 61.89, 60.58, 63.07, 62.2, 63.1, 70.63, 69.11, 66.48, 60.85, 57.69, 59.29, 60.87, 62.19, 68.65, 83.01, 98.4, 103.03, 103.2, 118.37, 109.61, 120.62, 117.26, 116.79, 131.55] },
      velocityScore: { '1D': null, '1W': -15.4, '1M': -41.2, '6M': null }, isNew: false,
      marketCap: '$51B', pe: 96.7, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 2.12, PSI: false, XSD: 2.27, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.18, proScore: 1.09, coverage: 0.5,
      price: 302.52, weeklyPrices: [259.41, 239.18, 249.33, 271.83, 302.52], weeklyChange: 16.62, dayChange: 11.29, sortRank: 0, periodReturns: { '1M': 38.5, 'YTD': 110.2, '6M': 101.8, '1Y': 257.7 },
      priceHistory: { '1D': [271.83, 301.83, 302.17, 301.51, 302.23, 296.88, 301.59, 302.22, 296.36, 292, 293.73, 293.06, 295.23, 295.37, 296.49, 298.43, 303.35, 303.22, 303.18, 301.04, 300.74, 299.65, 301.23, 302.52], '1W': [259.41, 239.18, 249.33, 271.83, 302.52], '1M': [218.41, 221.64, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 217.5, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83, 302.52], 'YTD': [143.89, 141.59, 156.84, 135.1, 129.47, 96.95, 128.4, 130.66, 123.46, 102.54, 115.91, 104.06, 100.3, 93.87, 110.21, 159.52, 183.32, 165.92, 180.06, 210.22, 156.27, 218.41, 226.1, 222.27, 250.81, 302.52], '6M': [149.94, 144.92, 141, 156.84, 135.1, 129.47, 98.06, 128.4, 130.66, 114.48, 114.74, 111.57, 107.09, 96.44, 101.45, 119.59, 160.69, 195.04, 184.38, 188.29, 184.54, 193.39, 236.03, 206.89, 250.81, 302.52], '1Y': [84.57, 92.59, 93.36, 102.59, 92.93, 109.38, 114.7, 118.57, 118.74, 115.41, 124.27, 149.03, 164.42, 162.26, 145.61, 137.2, 149.9, 151.66, 154.96, 180.64, 170.16, 145.58, 150.85, 188.44, 170.29, 140.34, 149.94, 144.92, 141, 156.84, 135.1, 129.47, 98.06, 121.78, 124.06, 112.27, 114.74, 111.57, 107.09, 96.44, 101.45, 119.59, 160.69, 195.04, 184.38, 188.51, 184.54, 193.39, 236.03, 206.89, 250.81, 302.52] },
      velocityScore: { '1D': null, '1W': -16.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$56B', pe: 121, revenueGrowth: 157, eps: 2.5, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 2.01, PSI: false, XSD: 2.35, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 2, avgWeight: 1.74, proScore: 0.87, coverage: 0.5,
      price: 396.26, weeklyPrices: [384.77, 368.32, 367.11, 391.41, 396.26], weeklyChange: 2.99, dayChange: 1.24, sortRank: 0, periodReturns: { '1M': 2.7, 'YTD': 131.4, '6M': 126.2, '1Y': 185.8 },
      priceHistory: { '1D': [391.41, 393.13, 395.09, 394.59, 392.45, 392.04, 392.91, 394.25, 395.67, 389.05, 393.64, 391.76, 392.04, 392.61, 391.54, 390.55, 390.96, 392.83, 392.77, 392.27, 393.23, 391.75, 393.54, 396.26], '1W': [384.77, 368.32, 367.11, 391.41, 396.26], '1M': [385.98, 409.68, 400.66, 391.09, 364.64, 353.79, 382.35, 390.34, 382.74, 345.4, 361.86, 358.72, 354.4, 374.76, 379.87, 384.77, 368.32, 367.11, 391.41, 396.26], 'YTD': [171.28, 167.66, 215.01, 224.29, 227.73, 215.03, 236.94, 242.56, 253.37, 239, 222.55, 221.29, 237.23, 222.07, 247, 263.92, 285.71, 265.61, 291.72, 365.88, 356.25, 385.98, 353.79, 361.86, 379.87, 396.26], '6M': [175.19, 174.87, 170.62, 215.01, 224.29, 227.73, 227.8, 236.94, 242.56, 247.11, 228.98, 215.94, 224.54, 228.5, 238.3, 258.11, 276.97, 287.64, 284.18, 344.47, 383.56, 380.45, 364.64, 345.4, 379.87, 396.26], '1Y': [138.65, 143.29, 137.37, 137.3, 136.76, 140.02, 140, 118.35, 124.55, 126.69, 131.05, 129.79, 131.18, 128.8, 124.49, 127.97, 130.53, 140.33, 146.39, 150.19, 178.42, 159.83, 165.97, 177.91, 188.08, 175.69, 175.19, 174.87, 170.62, 215.01, 224.29, 227.73, 227.8, 238.99, 243.59, 248.12, 228.98, 215.94, 224.54, 228.5, 238.3, 258.11, 276.97, 287.64, 284.18, 359.88, 383.56, 380.45, 364.64, 345.4, 379.87, 396.26] },
      velocityScore: { '1D': null, '1W': -8.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$30B', pe: 168.6, revenueGrowth: 23, eps: 2.35, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: 1.21, PSI: false, XSD: 2.27, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RMBS', name: 'RAMBUS INC', easyScore: 2, avgWeight: 1.39, proScore: 0.7, coverage: 0.5,
      price: 140.35, weeklyPrices: [143.29, 132.48, 130.10, 141.17, 140.35], weeklyChange: -2.05, dayChange: -0.58, sortRank: 0, periodReturns: { '1M': -1.8, 'YTD': 52.7, '6M': 47.3, '1Y': 133.9 },
      priceHistory: { '1D': [141.17, 144.46, 142.95, 142.46, 140.52, 139.44, 140.26, 139.28, 139.24, 135.73, 136.34, 136.27, 138.21, 137.4, 137.51, 137.07, 137.91, 137.54, 137.68, 137.35, 136.76, 136.83, 138.01, 140.35], '1W': [143.29, 132.48, 130.1, 141.17, 140.35], '1M': [142.98, 157.23, 148.66, 148.02, 145.46, 147.48, 166.78, 170.66, 169.35, 145.31, 152.03, 146.84, 138.12, 144.47, 146.56, 143.29, 132.48, 130.1, 141.17, 140.35], 'YTD': [91.89, 91.34, 100.62, 124.77, 121.6, 100.85, 99.38, 104.13, 101.09, 92.04, 92.53, 93.5, 92.69, 86.03, 101.43, 121.73, 130.45, 111.27, 111.5, 134.51, 123.76, 142.98, 147.48, 152.03, 146.56, 140.35], '6M': [95.26, 94.69, 91.65, 100.62, 124.77, 121.6, 98.1, 99.38, 104.13, 102.17, 91.91, 89.78, 94.62, 91.44, 93.03, 110.44, 126.93, 158.4, 111.93, 126.6, 130.46, 141.82, 145.46, 145.31, 146.56, 140.35], '1Y': [60, 64.02, 65.18, 64.53, 66.61, 73.15, 75.73, 72.77, 75.77, 73.3, 73.49, 74.55, 97.05, 102.62, 104.2, 96.84, 97.01, 97.77, 113.61, 105.76, 110.6, 91.13, 92.75, 96.21, 104.71, 94.69, 95.26, 94.69, 91.65, 100.62, 124.77, 121.6, 98.1, 95.8, 102.64, 99.66, 91.91, 89.78, 94.62, 91.44, 93.03, 110.44, 126.93, 158.4, 111.93, 129.25, 130.46, 141.82, 145.46, 145.31, 146.56, 140.35] },
      velocityScore: { '1D': null, '1W': -10.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$15B', pe: 66.8, revenueGrowth: 8, eps: 2.1, grossMargin: 80, dividendYield: null,
      etfPresence: { SOXX: 0.68, PSI: false, XSD: 2.1, DRAM: false },
      tonyNote: 'RAMBUS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 10, avgWeight: 5.61, proScore: 3.3, coverage: 0.588,
      price: 208.65, weeklyPrices: [212.45, 207.41, 204.65, 210.69, 208.65], weeklyChange: -1.79, dayChange: -0.97, sortRank: 0, periodReturns: { '1M': -3.1, 'YTD': 11.9, '6M': 13.6, '1Y': 44.7 },
      priceHistory: { '1D': [210.69, 212.35, 212.93, 212.7, 209.76, 208.95, 209.86, 209.83, 210.55, 209.26, 209.72, 209.42, 209.78, 209.04, 208.99, 208.84, 208.72, 209.05, 208.89, 208.77, 208.71, 208.01, 207.8, 208.65], '1W': [212.45, 207.41, 204.65, 210.69, 208.65], '1M': [215.33, 214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65], 'YTD': [186.5, 185.04, 183.14, 184.84, 192.51, 174.19, 190.05, 187.9, 195.56, 183.04, 186.03, 181.93, 175.2, 174.4, 182.08, 196.51, 199.88, 213.17, 198.48, 219.44, 222.32, 215.33, 224.36, 208.64, 205.19, 208.65], '6M': [183.69, 187.54, 189.11, 183.14, 184.84, 192.51, 171.88, 190.05, 187.9, 184.89, 183.34, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 198.45, 211.5, 235.74, 219.51, 211.14, 205.1, 205.19, 208.65], '1Y': [144.17, 157.99, 160, 170.7, 167.03, 175.51, 180, 182.06, 182.01, 179.81, 170.78, 170.76, 174.88, 178.43, 186.58, 185.04, 188.32, 182.64, 191.49, 206.88, 199.05, 186.6, 182.55, 181.46, 184.97, 177.72, 183.69, 187.54, 189.11, 183.14, 184.84, 192.51, 171.88, 186.94, 189.82, 177.19, 183.34, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 235.74, 219.51, 211.14, 205.1, 205.19, 208.65] },
      velocityScore: { '1D': null, '1W': 44.1, '1M': -31.7, '6M': null }, isNew: false,
      marketCap: '$5.1T', pe: 32, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.47,
      etfPresence: { PTF: 4.15, WCLD: false, IGV: false, FDTX: 4.62, GTEK: false, ARKK: 1.67, MARS: false, FRWD: 8.23, BCTK: 5.77, FWD: 1.9, CBSE: false, FCUS: false, WGMI: 1.94, CNEQ: 13.53, SGRT: 6.36, SPMO: 7.94, XMMO: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 8, avgWeight: 6.33, proScore: 2.98, coverage: 0.471,
      price: 1211.38, weeklyPrices: [1087.99, 1020.76, 1043.19, 1133.99, 1211.38], weeklyChange: 11.34, dayChange: 6.82, sortRank: 0, periodReturns: { '1M': 61.3, 'YTD': 324.4, '6M': 338, '1Y': 892.3 },
      priceHistory: { '1D': [1133.99, 1174.3, 1188.9, 1194.12, 1185.39, 1180.89, 1188.43, 1180, 1180.41, 1183.04, 1193.68, 1191.61, 1191.95, 1192.87, 1194.31, 1197.91, 1199.98, 1197.08, 1191.48, 1188.6, 1192.2, 1189.38, 1193.95, 1211.38], '1W': [1087.99, 1020.76, 1043.19, 1133.99, 1211.38], '1M': [751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38], 'YTD': [285.41, 327.02, 333.35, 397.58, 435.79, 379.4, 410.34, 417.35, 429, 400.77, 418.69, 461.69, 395.53, 337.84, 406.73, 465.66, 449.38, 504.29, 576.45, 795.33, 681.54, 751, 1035.5, 949.28, 981.61, 1211.38], '6M': [276.59, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 410.34, 417.35, 415.56, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 646.63, 776.01, 762.1, 971, 864.01, 981.61, 1211.38], '1Y': [122.08, 123.25, 124.42, 120.11, 109.22, 111.96, 107.77, 123.72, 123.55, 116.42, 118.48, 135.24, 158.82, 166.41, 167.32, 185.69, 192.77, 206.77, 220.1, 234.7, 253.3, 241.95, 223.93, 239.49, 252.42, 232.51, 276.59, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 776.01, 762.1, 971, 864.01, 981.61, 1211.38] },
      velocityScore: { '1D': null, '1W': 33, '1M': 14.6, '6M': null }, isNew: false,
      marketCap: '$1.4T', pe: 57.1, revenueGrowth: 196, eps: 21.21, grossMargin: 58, dividendYield: 0.05,
      etfPresence: { PTF: 5.24, WCLD: false, IGV: false, FDTX: 9.36, GTEK: false, ARKK: false, MARS: false, FRWD: 5.05, BCTK: 4.85, FWD: false, CBSE: 2.45, FCUS: 4.37, WGMI: false, CNEQ: false, SGRT: 7.55, SPMO: 11.78, XMMO: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 7, avgWeight: 5.69, proScore: 2.34, coverage: 0.412,
      price: 732.62, weeklyPrices: [653.53, 681.08, 712.13, 746.23, 732.62], weeklyChange: 12.1, dayChange: -1.82, sortRank: 0, periodReturns: { '1M': 51.3, 'YTD': 325.3, '6M': 314.5, '1Y': 1113.3 },
      priceHistory: { '1D': [746.23, 745.54, 757.97, 762.41, 755.86, 748.66, 755.84, 750.11, 751.33, 748.61, 745.78, 737.38, 733.9, 729.62, 735.65, 734.53, 738.07, 737.44, 738.8, 736.34, 732.36, 731.11, 733.16, 732.62], '1W': [653.53, 681.08, 712.13, 746.23, 732.62], '1M': [484.28, 524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62], 'YTD': [172.27, 187.68, 215, 243.29, 278.41, 269.41, 273.74, 284.67, 290.95, 261.3, 268.81, 313.81, 301.05, 270.49, 338.78, 366.22, 383.81, 390.99, 442.36, 515.83, 458.68, 484.28, 546.2, 526.93, 562.93, 732.62], '6M': [176.76, 176.06, 199.88, 215, 243.29, 278.41, 260.19, 273.74, 284.67, 282.25, 259.03, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 431.52, 463.91, 489.15, 486.46, 531.21, 511.72, 562.93, 732.62], '1Y': [60.38, 63.99, 64.02, 67.53, 67.06, 70.61, 77.29, 74.64, 76.29, 79.22, 81.91, 94.54, 103.09, 110.25, 120.06, 119.93, 118.86, 121.53, 126.67, 158.02, 174.22, 162.45, 150.93, 159.99, 169.54, 174.58, 176.76, 176.06, 199.88, 215, 243.29, 278.41, 260.19, 284.1, 285.52, 279.7, 259.03, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 431.52, 480, 489.15, 486.46, 531.21, 511.72, 562.93, 732.62] },
      velocityScore: { '1D': null, '1W': 74.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$253B', pe: 43.8, revenueGrowth: 46, eps: 16.72, grossMargin: 45, dividendYield: 0.08,
      etfPresence: { PTF: 6.1, WCLD: false, IGV: false, FDTX: 4, GTEK: false, ARKK: false, MARS: false, FRWD: 5.92, BCTK: false, FWD: false, CBSE: false, FCUS: 5.39, WGMI: false, CNEQ: 6.18, SGRT: 9.91, SPMO: 2.33, XMMO: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 7, avgWeight: 4.36, proScore: 1.79, coverage: 0.412,
      price: 467.74, weeklyPrices: [441.40, 425.83, 432.15, 462.12, 467.74], weeklyChange: 5.97, dayChange: 1.22, sortRank: 0, periodReturns: { '1M': 15.6, 'YTD': 53.9, '6M': 59.5, '1Y': 122.4 },
      priceHistory: { '1D': [462.12, 467.25, 468.33, 470.78, 468.23, 467, 469.01, 467.82, 470.88, 467.11, 468.61, 468.66, 468.45, 467.2, 467.15, 467.08, 466.89, 467.26, 467.33, 467.64, 466.64, 466.04, 465.6, 467.74], '1W': [441.4, 425.83, 432.15, 462.12, 467.74], '1M': [404.52, 412.32, 422.73, 424.86, 418.45, 435.63, 446.69, 436.69, 444.92, 415.17, 426.8, 427.92, 408.75, 421.07, 423.93, 441.4, 425.83, 432.15, 462.12, 467.74], 'YTD': [303.89, 318.01, 327.11, 327.37, 339.55, 325.74, 374.09, 360.39, 387.73, 357.44, 354.56, 345.98, 343.25, 337.95, 365.9, 379.89, 368.08, 392.34, 401.61, 404.54, 395.95, 404.52, 435.63, 426.8, 423.93, 467.74], '6M': [293.28, 299.58, 318.68, 327.11, 327.37, 339.55, 330.73, 374.09, 360.39, 376.81, 353.86, 336.71, 338.79, 326.11, 339.04, 370.6, 370.5, 402.46, 397.67, 414.15, 417.72, 407.15, 418.45, 415.17, 423.93, 467.74], '1Y': [210.32, 226.49, 227.86, 236.95, 234.6, 241.33, 239, 242.09, 241.41, 235.59, 228.39, 250.92, 262.06, 282.71, 279.29, 294.03, 302.89, 297.7, 298.25, 304.86, 295.27, 282.01, 284.64, 292.09, 303.41, 286.87, 293.28, 299.58, 318.68, 327.11, 327.37, 339.55, 330.73, 368.1, 370.54, 374.58, 353.86, 336.71, 338.79, 326.11, 339.04, 370.6, 370.5, 402.46, 397.67, 411.68, 417.72, 407.15, 418.45, 415.17, 423.93, 467.74] },
      velocityScore: { '1D': null, '1W': -5.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.4T', pe: 40.1, revenueGrowth: 35, eps: 11.65, grossMargin: 62, dividendYield: 0.82,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6, GTEK: false, ARKK: 0.99, MARS: false, FRWD: 5.94, BCTK: 8.44, FWD: false, CBSE: 2.64, FCUS: false, WGMI: 0.6, CNEQ: 5.88, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 7, avgWeight: 4, proScore: 1.65, coverage: 0.412,
      price: 551.63, weeklyPrices: [547.26, 507.29, 512.48, 537.37, 551.63], weeklyChange: 0.8, dayChange: 2.65, sortRank: 0, periodReturns: { '1M': 18, 'YTD': 157.6, '6M': 156.6, '1Y': 325.7 },
      priceHistory: { '1D': [537.37, 541.58, 553.97, 546.97, 543.53, 542.64, 546.8, 545.23, 544.15, 537.45, 541.55, 541.85, 544.84, 543.04, 543.4, 544.28, 545.86, 545.97, 545.94, 546, 547.16, 544.11, 546.61, 551.63], '1W': [547.26, 507.29, 512.48, 537.37, 551.63], '1M': [467.51, 503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63], 'YTD': [214.16, 204.68, 223.6, 253.73, 252.18, 200.19, 213.58, 203.37, 210.86, 202.07, 204.83, 196.31, 205.37, 203.43, 231.82, 255.07, 284.49, 323.21, 341.54, 458.79, 420.99, 467.51, 510.13, 490.33, 511.57, 551.63], '6M': [214.95, 215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 213.58, 203.37, 203.68, 199.45, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 408.46, 449.7, 449.59, 516.1, 466.38, 511.57, 551.63], '1Y': [129.58, 141.9, 137.82, 155.61, 154.72, 177.44, 176.78, 172.28, 176.14, 163.36, 162.32, 155.82, 160.46, 160.9, 161.79, 211.51, 216.42, 240.56, 259.67, 259.65, 243.98, 240.52, 215.05, 215.24, 221.62, 209.17, 214.95, 215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 200.21, 199.45, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 449.7, 449.59, 516.1, 466.38, 511.57, 551.63] },
      velocityScore: { '1D': null, '1W': 3.1, '1M': -49.5, '6M': null }, isNew: false,
      marketCap: '$899B', pe: 183.3, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.64, MARS: false, FRWD: 7.08, BCTK: 3.33, FWD: 2.07, CBSE: false, FCUS: 3.28, WGMI: false, CNEQ: false, SGRT: 3.52, SPMO: 4.05, XMMO: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 7, avgWeight: 3.83, proScore: 1.58, coverage: 0.412,
      price: 392.13, weeklyPrices: [393.94, 376.71, 392.90, 411.35, 392.13], weeklyChange: -0.46, dayChange: -4.67, sortRank: 0, periodReturns: { '1M': -5.3, 'YTD': 13.3, '6M': 14.8, '1Y': 54.5 },
      priceHistory: { '1D': [411.35, 401.18, 399.14, 400.04, 395.82, 393.98, 394.83, 394.82, 396.66, 395.19, 396.83, 396.23, 397.16, 396.37, 396.64, 396.23, 396.15, 397.02, 395.98, 395.42, 394.77, 394.63, 395.31, 392.13], '1W': [393.94, 376.71, 392.9, 411.35, 392.13], '1M': [414.14, 422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13], 'YTD': [346.1, 332.48, 339.89, 325.49, 330.73, 308.05, 342.76, 333.99, 332.31, 317.53, 341.57, 321.31, 318.29, 309.51, 350.63, 380.78, 402.17, 399.83, 416.5, 428.43, 420.71, 414.14, 459.97, 396.6, 382.07, 392.13], '6M': [341.45, 349.85, 343.5, 339.89, 325.49, 330.73, 310.51, 342.76, 333.99, 321.7, 332.77, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 421.28, 412.56, 439.79, 414.57, 446.77, 385.73, 382.07, 392.13], '1Y': [253.77, 275.65, 271.8, 280.94, 278.59, 297.42, 297.72, 303.9, 305.76, 294.23, 298.24, 336.67, 360, 338.94, 329.91, 336.41, 356.7, 349.24, 362.05, 362.55, 358.39, 342.65, 377.96, 381.57, 406.29, 341.3, 341.45, 349.85, 343.5, 339.89, 325.49, 330.73, 310.51, 331.17, 332.65, 319.55, 332.77, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 439.79, 414.57, 446.77, 385.73, 382.07, 392.13] },
      velocityScore: { '1D': null, '1W': 20.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.9T', pe: 65.2, revenueGrowth: 48, eps: 6.01, grossMargin: 76, dividendYield: 0.63,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.79, GTEK: false, ARKK: 1.17, MARS: false, FRWD: 5.09, BCTK: 6.84, FWD: 1.92, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.47, SGRT: false, SPMO: 6.56, XMMO: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'SPCX', name: 'SPACE EXPLORATION TECHN-CL A', easyScore: 6, avgWeight: 7.79, proScore: 2.75, coverage: 0.353,
      price: 154.6, weeklyPrices: [154.60], weeklyChange: -16.43, dayChange: -16.43, sortRank: 0, periodReturns: { '1M': 0, 'YTD': 0, '6M': 0, '1Y': 0 },
      priceHistory: undefined,
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.0T', pe: null, revenueGrowth: 15, eps: -0.67, grossMargin: 49, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.46, MARS: 24.06, FRWD: 2.66, BCTK: 9.67, FWD: 2.09, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.8, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'SPACE EXPLORATION TECHN-CL A appears in 6 of 17 Broad Tech ETFs (35% coverage) with average weight 7.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 5, avgWeight: 5.03, proScore: 1.48, coverage: 0.294,
      price: 1094.04, weeklyPrices: [1018.80, 1031.34, 1066.07, 1070.23, 1094.04], weeklyChange: 7.39, dayChange: 2.22, sortRank: 0, periodReturns: { '1M': 34.6, 'YTD': 297.3, '6M': 286.8, '1Y': 722.1 },
      priceHistory: { '1D': [1070.23, 1088.94, 1116.42, 1116.99, 1106.26, 1097.34, 1101.22, 1083.03, 1080.83, 1076.87, 1082.95, 1075.02, 1075.68, 1078.07, 1087.85, 1092, 1098.5, 1094.38, 1097.4, 1094.07, 1085.81, 1086.56, 1088.44, 1094.04], '1W': [1018.8, 1031.34, 1066.07, 1070.23, 1094.04], '1M': [812.73, 845.76, 870.66, 880.72, 879.8, 921.26, 926.61, 940.69, 925.99, 847.47, 876.77, 846.01, 815.99, 868.09, 931.04, 1018.8, 1031.34, 1066.07, 1070.23, 1094.04], 'YTD': [275.39, 284.47, 312.28, 346.53, 446.57, 418.63, 407.25, 408.97, 421.85, 375.01, 385.97, 421.09, 424.96, 391.76, 496.3, 533.44, 559.9, 579.03, 738.54, 834.01, 740.84, 812.73, 921.26, 876.77, 931.04, 1094.04], '6M': [282.85, 280.08, 308.26, 312.28, 346.53, 446.57, 405.45, 407.25, 408.97, 409.67, 367.34, 373.98, 434.6, 378.79, 429.36, 503.13, 547.75, 586.25, 726.93, 766.44, 804.76, 810.46, 879.8, 847.47, 931.04, 1094.04], '1Y': [133.08, 144.33, 144.47, 149.05, 146.59, 152.68, 154.81, 151.69, 158.7, 164, 170.5, 191.59, 211.13, 228.13, 236.06, 225.01, 219.51, 214.4, 230.32, 265.55, 293.99, 261.38, 253.38, 266.87, 282.86, 288.13, 282.85, 280.08, 308.26, 312.28, 346.53, 446.57, 405.45, 431.17, 411.11, 407.84, 367.34, 373.98, 434.6, 378.79, 429.36, 503.13, 547.75, 586.25, 726.93, 782.64, 804.76, 810.46, 879.8, 847.47, 931.04, 1094.04] },
      velocityScore: { '1D': null, '1W': -6.9, '1M': -45.8, '6M': null }, isNew: false,
      marketCap: '$248B', pe: 104.3, revenueGrowth: 44, eps: 10.49, grossMargin: 42, dividendYield: 0.28,
      etfPresence: { PTF: 5.33, WCLD: false, IGV: false, FDTX: 4.04, GTEK: false, ARKK: false, MARS: false, FRWD: 8.6, BCTK: false, FWD: false, CBSE: false, FCUS: 5.04, WGMI: false, CNEQ: false, SGRT: false, SPMO: 2.15, XMMO: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'LRCX', name: 'LRCX', easyScore: 5, avgWeight: 4.54, proScore: 1.34, coverage: 0.294,
      price: 409.54, weeklyPrices: [388.92, 369.34, 374.18, 389.04, 409.54], weeklyChange: 5.3, dayChange: 5.27, sortRank: 0, periodReturns: { '1M': 34.1, 'YTD': 139.2, '6M': 133.7, '1Y': 347 },
      priceHistory: { '1D': [389.04, 394.41, 398.34, 400.24, 394.23, 392.74, 394.58, 394.34, 396.25, 393.26, 397.06, 396.67, 398.11, 396.3, 397.77, 398.2, 396.63, 397.1, 395.63, 396.01, 395.73, 396.59, 400.54, 409.54], '1W': [388.92, 369.34, 374.18, 389.04, 409.54], '1M': [305.35, 322.68, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04, 409.54], 'YTD': [171.18, 200.96, 208.79, 220.7, 248.17, 209.78, 235.12, 237.39, 249.48, 222.99, 218.87, 226.47, 238.84, 213.66, 246.49, 272.41, 258.37, 251.23, 258.57, 296.05, 277.96, 305.35, 317.12, 324.45, 366.81, 409.54], '6M': [175.26, 173.78, 203.08, 208.79, 220.7, 248.17, 213.31, 235.12, 237.39, 239.07, 214.68, 209.49, 233.99, 211.62, 218.44, 263.66, 267.6, 267.78, 256.72, 286.52, 299.15, 302.24, 318.18, 303.28, 366.81, 409.54], '1Y': [91.61, 97.34, 99.83, 101.07, 97.69, 98.94, 98.41, 102, 98.88, 101.28, 97.03, 105.57, 120.47, 131.93, 133.9, 140.35, 137.81, 144.05, 156.9, 161.24, 166.37, 147.46, 150.38, 158.19, 165.81, 163.26, 175.26, 173.78, 203.08, 208.79, 220.7, 248.17, 213.31, 231.29, 244.92, 233.89, 214.68, 209.49, 233.99, 211.62, 218.44, 263.66, 267.6, 267.78, 256.72, 294.05, 299.15, 302.24, 318.18, 303.28, 366.81, 409.54] },
      velocityScore: { '1D': null, '1W': -6.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$512B', pe: 77.4, revenueGrowth: 24, eps: 5.29, grossMargin: 50, dividendYield: 0.27,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.9, BCTK: 7.74, FWD: 1.94, CBSE: 3.05, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 4.07, XMMO: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 5, avgWeight: 4.06, proScore: 1.2, coverage: 0.294,
      price: 348.78, weeklyPrices: [367.11, 371.10, 362.10, 367.46, 348.78], weeklyChange: -4.99, dayChange: -5.08, sortRank: 0, periodReturns: { '1M': -8.1, 'YTD': 11.1, '6M': 12, '1Y': 110.1 },
      priceHistory: { '1D': [367.46, 353.5, 352.04, 349.29, 348.38, 344.85, 342.36, 342.7, 346.28, 344.62, 345.45, 345.28, 345.08, 345.66, 346.32, 346.4, 346.75, 346.93, 347.66, 346.86, 347.03, 348.65, 348.49, 348.78], '1W': [367.11, 371.1, 362.1, 367.46, 348.78], '1M': [379.38, 384.84, 384.83, 386.12, 376.43, 372.58, 358.39, 355.68, 369.27, 365.76, 361.17, 362.29, 353.32, 356.56, 358.16, 367.11, 371.1, 362.1, 367.46, 348.78], 'YTD': [313.8, 326.01, 336.31, 330.84, 338.66, 333.34, 311.33, 303.56, 313.03, 303.45, 308.42, 309.41, 289.2, 286.86, 314.74, 330.58, 330.47, 347.5, 379.64, 386.77, 393.11, 379.38, 372.58, 361.17, 358.16, 348.78], '6M': [311.33, 314.55, 322.43, 336.31, 330.84, 338.66, 331.33, 311.33, 303.56, 307.15, 300.91, 303.21, 305.73, 280.74, 294.46, 315.72, 339.4, 342.32, 383.22, 395.3, 397.17, 383.47, 376.43, 365.76, 358.16, 348.78], '1Y': [166.01, 177.39, 175.16, 183.1, 192.11, 196.43, 195.75, 201.63, 204.29, 209.16, 211.99, 239.94, 251.42, 252.34, 243.55, 247.13, 244.64, 257.02, 269.93, 284.12, 290.59, 285.6, 318.47, 316.02, 317.75, 307.73, 311.33, 314.55, 322.43, 336.31, 330.84, 338.66, 331.33, 309.37, 314.9, 311.43, 300.91, 303.21, 305.73, 280.74, 294.46, 315.72, 339.4, 342.32, 383.22, 397.05, 397.17, 383.47, 376.43, 365.76, 358.16, 348.78] },
      velocityScore: { '1D': null, '1W': 37.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.3T', pe: 26.6, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.66, GTEK: false, ARKK: 1.85, MARS: false, FRWD: false, BCTK: 5.53, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 5.78, SGRT: false, SPMO: 3.5, XMMO: false },
      tonyNote: 'Alphabet Inc Class C appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 4.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 5, avgWeight: 2.96, proScore: 0.87, coverage: 0.294,
      price: 232.79, weeklyPrices: [246.02, 246.00, 237.50, 244.39, 232.79], weeklyChange: -5.38, dayChange: -4.75, sortRank: 0, periodReturns: { '1M': -12.6, 'YTD': 0.9, '6M': 1.9, '1Y': 11.7 },
      priceHistory: { '1D': [244.39, 240.23, 238.63, 236.9, 236.27, 234.37, 233.6, 233.04, 234.5, 233.17, 232.88, 233.09, 233.44, 233.61, 233.6, 233.56, 233.76, 233.96, 234.46, 234.21, 234.73, 233.91, 233.23, 232.79], '1W': [246.02, 246, 237.5, 244.39, 232.79], '1M': [266.32, 265.29, 271.85, 274, 270.64, 261.26, 256.52, 250.02, 253.79, 246.03, 245.22, 244.19, 238, 241.51, 238.55, 246.02, 246, 237.5, 244.39, 232.79], 'YTD': [230.82, 246.29, 236.65, 234.34, 241.73, 232.99, 204.08, 204.86, 210.64, 216.82, 212.65, 215.2, 207.24, 208.27, 221.25, 249.02, 249.91, 259.7, 272.05, 268.99, 264.86, 266.32, 261.26, 245.22, 238.55, 232.79], '6M': [228.43, 232.53, 241.56, 236.65, 234.34, 241.73, 222.69, 204.08, 204.86, 207.92, 218.94, 209.53, 208.76, 207.54, 209.77, 238.38, 250.56, 263.99, 268.26, 271.17, 267.22, 268.46, 270.64, 246.03, 238.55, 232.79], '1Y': [208.47, 219.39, 219.36, 226.35, 227.47, 231.01, 211.65, 221.3, 231.49, 227.94, 225.34, 238.24, 234.05, 220.71, 219.57, 221.78, 220.07, 216.48, 226.97, 254, 248.4, 232.87, 226.28, 234.42, 227.92, 222.56, 228.43, 232.53, 241.56, 236.65, 234.34, 241.73, 222.69, 199.6, 210.11, 210, 218.94, 209.53, 208.76, 207.54, 209.77, 238.38, 250.56, 263.99, 268.26, 272.68, 267.22, 268.46, 270.64, 246.03, 238.55, 232.79] },
      velocityScore: { '1D': null, '1W': -19.4, '1M': -81.5, '6M': null }, isNew: false,
      marketCap: '$2.5T', pe: 30.2, revenueGrowth: 17, eps: 7.72, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.01, GTEK: false, ARKK: 2.26, MARS: false, FRWD: 2.8, BCTK: 4.26, FWD: 1.45, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, avgWeight: 5.27, proScore: 1.24, coverage: 0.235,
      price: 367.34, weeklyPrices: [399.76, 393.83, 378.91, 379.40, 367.34], weeklyChange: -8.11, dayChange: -3.18, sortRank: 0, periodReturns: { '1M': -12.2, 'YTD': -24, '6M': -24.2, '1Y': -24.4 },
      priceHistory: { '1D': [379.4, 379.48, 378.31, 375.8, 373.88, 371.94, 371.3, 371.19, 371.64, 369.43, 369.15, 368.23, 368.48, 368.76, 368.99, 369.44, 369.83, 370.2, 370.22, 369.5, 370.14, 369.75, 369.35, 367.34], '1W': [399.76, 393.83, 378.91, 379.4, 367.34], '1M': [418.57, 416.03, 412.67, 426.99, 450.24, 460.52, 441.31, 427.34, 428.05, 416.67, 411.74, 403.41, 397.36, 390.34, 390.74, 399.76, 393.83, 378.91, 379.4, 367.34], 'YTD': [483.62, 478.11, 459.38, 451.14, 433.5, 414.19, 404.37, 398.46, 400.6, 405.2, 404.88, 399.41, 372.74, 370.17, 374.33, 393.11, 424.16, 429.25, 413.62, 412.66, 423.54, 418.57, 460.52, 411.74, 390.74, 367.34], '6M': [484.92, 487.48, 483.47, 459.38, 451.14, 433.5, 393.67, 404.37, 398.46, 401.72, 410.68, 401.86, 389.02, 365.97, 373.46, 370.87, 422.79, 424.62, 414.44, 420.77, 409.43, 419.09, 450.24, 416.67, 390.74, 367.34], '1Y': [486, 497.41, 496.62, 505.82, 505.27, 512.57, 535.64, 521.77, 517.1, 504.26, 505.12, 498.41, 509.04, 509.23, 517.95, 523.98, 514.05, 516.79, 531.52, 517.03, 506, 507.49, 474, 490, 492.02, 476.39, 484.92, 487.48, 483.47, 459.38, 451.14, 433.5, 393.67, 401.84, 397.23, 392.74, 410.68, 401.86, 389.02, 365.97, 373.46, 370.87, 422.79, 424.62, 414.44, 415.12, 409.43, 419.09, 450.24, 416.67, 390.74, 367.34] },
      velocityScore: { '1D': null, '1W': 9.7, '1M': -78.6, '6M': null }, isNew: false,
      marketCap: '$2.7T', pe: 21.9, revenueGrowth: 18, eps: 16.81, grossMargin: 68, dividendYield: 0.96,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.32, FDTX: 3.79, GTEK: false, ARKK: false, MARS: false, FRWD: 2.78, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 6.2, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'LITE', name: 'Lumentum Holdings Inc', easyScore: 4, avgWeight: 3.84, proScore: 0.9, coverage: 0.235,
      price: 893.93, weeklyPrices: [957.24, 875.36, 869.98, 850.00, 893.93], weeklyChange: -6.61, dayChange: 5.17, sortRank: 0, periodReturns: { '1M': -5.6, 'YTD': 142.5, '6M': 129.3, '1Y': 902.6 },
      priceHistory: { '1D': [850, 830.54, 842.49, 841.62, 840.15, 834.55, 838, 842.56, 840.33, 833.14, 839.68, 843.6, 864.96, 876, 890.78, 888.4, 896.89, 901.01, 904.26, 900.35, 895.22, 885.9, 883.22, 893.93], '1W': [957.24, 875.36, 869.98, 850, 893.93], '1M': [946.9, 910.81, 902.31, 860.62, 854.96, 905, 1029.15, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93], 'YTD': [368.59, 348.26, 331.62, 354.49, 381.44, 465.54, 574.11, 635.64, 723.39, 680.8, 672, 649.56, 801.99, 702.76, 896.02, 852.79, 836.92, 791.37, 976.18, 1053.09, 884.98, 946.9, 905, 895.4, 921.56, 893.93], '6M': [389.88, 371.18, 392.88, 331.62, 354.49, 381.44, 504.42, 574.11, 635.64, 677, 650.82, 616.09, 772.13, 688.8, 826.88, 897.3, 894.07, 881.64, 949.93, 892.58, 1001.81, 964.5, 854.96, 863.66, 921.56, 893.93], '1Y': [89.16, 95.06, 91.31, 98.14, 99.63, 109.48, 111.13, 115.03, 118.98, 123.42, 132.55, 151.73, 170.9, 163.99, 162.71, 157.15, 160.56, 161, 193.8, 199.58, 259.89, 242.07, 299.36, 302.81, 360.33, 316.15, 389.88, 371.18, 392.88, 331.62, 354.49, 381.44, 504.42, 583.46, 667.77, 700.91, 650.82, 616.09, 772.13, 688.8, 826.88, 897.3, 894.07, 881.64, 949.93, 903.8, 1001.81, 964.5, 854.96, 863.66, 921.56, 893.93] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$70B', pe: 156.8, revenueGrowth: 90, eps: 5.7, grossMargin: 41, dividendYield: null,
      etfPresence: { PTF: 3.46, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 1.4, FWD: false, CBSE: false, FCUS: 2.42, WGMI: false, CNEQ: false, SGRT: 8.09, SPMO: false, XMMO: false },
      tonyNote: 'Lumentum Holdings Inc appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 4, avgWeight: 3.79, proScore: 0.89, coverage: 0.235,
      price: 119.5, weeklyPrices: [134.71, 133.25, 130.63, 128.47, 119.50], weeklyChange: -11.29, dayChange: -6.98, sortRank: 0, periodReturns: { '1M': -12.7, 'YTD': -32.8, '6M': -38.4, '1Y': -14.6 },
      priceHistory: { '1D': [128.47, 128.26, 127.07, 125.74, 124.07, 122.75, 122.44, 122.89, 122.73, 121.67, 120.75, 120.13, 120.76, 120.93, 120.79, 120.35, 120.79, 120.99, 120.42, 120.01, 119.49, 119.43, 119.44, 119.5], '1W': [134.71, 133.25, 130.63, 128.47, 119.5], '1M': [136.88, 136.6, 132.51, 143.34, 156.54, 160.65, 152.17, 142.2, 141.7, 135.53, 136.47, 132.07, 130.21, 131.08, 127.99, 134.71, 133.25, 130.63, 128.47, 119.5], 'YTD': [177.75, 176.86, 178.4, 165.9, 151.86, 139.54, 135.68, 134.89, 134.19, 153.19, 151.6, 155.08, 154.78, 146.28, 140.76, 135.7, 145.97, 141.18, 146.03, 136.89, 135.14, 136.88, 160.65, 136.47, 127.99, 119.5], '6M': [193.98, 180.84, 181.68, 178.4, 165.9, 151.86, 130.01, 135.68, 134.89, 135.94, 152.67, 153.5, 155.68, 147.56, 148.46, 128.06, 146.39, 143.09, 144.07, 137.05, 133.73, 137.41, 156.54, 135.53, 127.99, 119.5], '1Y': [139.92, 136.32, 139.71, 148.58, 149.07, 156.24, 160.66, 182.68, 174.03, 157.17, 157.09, 162.36, 170.26, 182.55, 182.42, 182.17, 177.21, 181.59, 189.18, 207.18, 193.61, 171.25, 162.25, 170.69, 181.84, 187.75, 193.98, 180.84, 181.68, 178.4, 165.9, 151.86, 130.01, 129.13, 135.24, 137.19, 152.67, 153.5, 155.68, 147.56, 148.46, 128.06, 146.39, 143.09, 144.07, 137.8, 133.73, 137.41, 156.54, 135.53, 127.99, 119.5] },
      velocityScore: { '1D': null, '1W': -8.2, '1M': -69.2, '6M': null }, isNew: false,
      marketCap: '$286B', pe: 134.3, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.6, FDTX: 2.87, GTEK: false, ARKK: 2.62, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.07, XMMO: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'CRWD', name: 'CrowdStrike', easyScore: 4, avgWeight: 2.86, proScore: 0.67, coverage: 0.235,
      price: 675.44, weeklyPrices: [692.91, 679.49, 682.96, 684.86, 675.44], weeklyChange: -2.52, dayChange: -1.38, sortRank: 0, periodReturns: { '1M': 1.8, 'YTD': 44.1, '6M': 39.8, '1Y': 37.3 },
      priceHistory: { '1D': [684.86, 698.85, 698.92, 692.1, 692.51, 692.89, 688.34, 691.03, 688.38, 685.44, 685.33, 682.84, 685.52, 677.91, 680.88, 680.37, 681.5, 683.38, 681.93, 680.9, 675.1, 676.62, 682.65, 675.44], '1W': [692.91, 679.49, 682.96, 684.86, 675.44], '1M': [663.46, 671.55, 645.36, 671, 731, 782.17, 768.95, 747.61, 719.09, 671.02, 658.79, 644.93, 647.74, 691.53, 682.8, 692.91, 679.49, 682.96, 684.86, 675.44], 'YTD': [468.76, 463.87, 460.7, 453.77, 444.62, 415.36, 415.81, 422.14, 363.31, 407.68, 442.03, 433.2, 392.99, 390.41, 426.51, 398.49, 449.61, 454.99, 469.24, 542.26, 618.83, 663.46, 782.17, 658.79, 682.8, 675.44], '6M': [483.14, 475.63, 478.91, 460.7, 453.77, 444.62, 377.16, 415.81, 422.14, 381.1, 426.16, 441.54, 428.18, 392.62, 399.12, 379.02, 423.95, 448.13, 455.64, 505.72, 579.95, 648.23, 731, 671.02, 682.8, 675.44], '1Y': [491.81, 509.31, 507.71, 473.28, 471.23, 465.51, 454.86, 426.43, 426.34, 418.83, 413.5, 423.51, 444.98, 484.1, 490.38, 484.62, 508.61, 503.61, 529.7, 551.92, 557.53, 529.78, 506.82, 516.55, 517.98, 488.53, 483.14, 475.63, 478.91, 460.7, 453.77, 444.62, 377.16, 411.54, 388.6, 371.98, 426.16, 441.54, 428.18, 392.62, 399.12, 379.02, 423.95, 448.13, 455.64, 527.77, 579.95, 648.23, 731, 671.02, 682.8, 675.44] },
      velocityScore: { '1D': null, '1W': -15.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$172B', pe: null, revenueGrowth: 26, eps: -0.14, grossMargin: 75, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.54, IGV: 6.63, FDTX: 1.24, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.04, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'CrowdStrike appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SHOP', name: 'Shopify Inc Registered Shs -A- Subord Vtg', easyScore: 4, avgWeight: 2.8, proScore: 0.66, coverage: 0.235,
      price: 107.98, weeklyPrices: [112.49, 113.23, 108.09, 108.85, 107.98], weeklyChange: -4.01, dayChange: -0.8, sortRank: 0, periodReturns: { '1M': 4.8, 'YTD': -32.9, '6M': -36.4, '1Y': -1.8 },
      priceHistory: { '1D': [108.85, 110.26, 110.43, 109.37, 108.52, 107.6, 107.58, 108.07, 108.12, 107.73, 106.89, 106.75, 106.99, 106.81, 107.21, 107.54, 107.83, 107.86, 107.75, 107.37, 107.66, 108.1, 108.22, 107.98], '1W': [112.49, 113.23, 108.09, 108.85, 107.98], '1M': [103, 104.9, 106.6, 115.03, 118.71, 124.12, 117.01, 112.94, 116.04, 109.54, 110.78, 110.42, 108.2, 110.47, 108.24, 112.49, 113.23, 108.09, 108.85, 107.98], 'YTD': [160.97, 168.28, 157.51, 137.64, 143.64, 114.02, 118.71, 123.8, 120.31, 129.65, 129.52, 127.8, 116.15, 118.62, 120.1, 117.64, 131.13, 122.05, 127.55, 102.54, 102.39, 103, 124.12, 110.78, 108.24, 107.98], '6M': [169.67, 163.74, 166.74, 157.51, 137.64, 143.64, 111.24, 118.71, 123.8, 125.94, 134.79, 126.17, 122.37, 115.43, 118.25, 110.79, 131.15, 125.83, 127.67, 111.74, 97.42, 104.86, 118.71, 109.54, 108.24, 107.98], '1Y': [109.98, 115.35, 112.48, 115.05, 123.71, 124.85, 125.21, 147.5, 143.11, 140.53, 139.04, 143.44, 147.21, 149.94, 148.61, 161.28, 153.66, 164.71, 175.06, 172.94, 158.88, 139.93, 155.31, 156.83, 159.89, 163.14, 169.67, 163.74, 166.74, 157.51, 137.64, 143.64, 111.24, 110.66, 126.2, 120.73, 134.79, 126.17, 122.37, 115.43, 118.25, 110.79, 131.15, 125.83, 127.67, 110.41, 97.42, 104.86, 118.71, 109.54, 108.24, 107.98] },
      velocityScore: { '1D': null, '1W': -28.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$140B', pe: 105.9, revenueGrowth: 34, eps: 1.02, grossMargin: 48, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.89, GTEK: false, ARKK: 4.02, MARS: false, FRWD: 1.79, BCTK: 2.51, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Shopify Inc Registered Shs -A- Subord Vtg appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 2.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC-CL A', easyScore: 4, avgWeight: 2.51, proScore: 0.59, coverage: 0.235,
      price: 349.56, weeklyPrices: [369.35, 373.25, 363.79, 368.03, 349.56], weeklyChange: -5.36, dayChange: -5.02, sortRank: 0, periodReturns: { '1M': -8.7, 'YTD': 11.7, '6M': 12.8, '1Y': 111.6 },
      priceHistory: { '1D': [368.03, 354.14, 352.48, 350.17, 349.17, 345.38, 343.04, 343.83, 347.22, 345.24, 346.06, 345.9, 345.77, 346.48, 347.11, 347.05, 347.47, 347.74, 348.35, 347.46, 347.69, 349.44, 349.24, 349.56], '1W': [369.35, 373.25, 363.79, 368.03, 349.56], '1M': [382.97, 388.88, 388.83, 390.13, 380.34, 376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68, 369.35, 373.25, 363.79, 368.03, 349.56], 'YTD': [313, 325.44, 335.84, 330.54, 338.25, 333.04, 310.96, 302.85, 312.9, 303.13, 308.7, 310.92, 290.44, 287.56, 317.32, 332.91, 332.29, 349.78, 383.25, 388.64, 396.94, 382.97, 376.37, 363.31, 359.68, 349.56], '6M': [309.78, 313.85, 321.98, 335.84, 330.54, 338.25, 331.25, 310.96, 302.85, 307.38, 300.88, 303.55, 307.13, 280.92, 295.77, 317.24, 341.68, 344.4, 385.69, 397.99, 401.07, 387.66, 380.34, 368.53, 359.68, 349.56], '1Y': [165.19, 176.23, 174.36, 182, 191.34, 195.75, 195.04, 201, 203.5, 208.49, 211.35, 239.63, 251.16, 251.66, 243.1, 245.76, 244.15, 256.55, 269.27, 283.72, 290.1, 285.02, 318.58, 315.81, 317.08, 306.57, 309.78, 313.85, 321.98, 335.84, 330.54, 338.25, 331.25, 309, 314.98, 311.76, 300.88, 303.55, 307.13, 280.92, 295.77, 317.24, 341.68, 344.4, 385.69, 400.8, 401.07, 387.66, 380.34, 368.53, 359.68, 349.56] },
      velocityScore: { '1D': null, '1W': null, '1M': -88.2, '6M': null }, isNew: true,
      marketCap: '$4.3T', pe: 26.7, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 0.5, MARS: false, FRWD: 3.19, BCTK: false, FWD: 1.96, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 4.38, XMMO: false },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'KLAC', name: 'KLAC', easyScore: 4, avgWeight: 2.03, proScore: 0.48, coverage: 0.235,
      price: 269.16, weeklyPrices: [256.42, 237.33, 238.73, 259.56, 269.16], weeklyChange: 4.97, dayChange: 3.7, sortRank: 0, periodReturns: { '1M': 42.5, 'YTD': 121.5, '6M': 112.7, '1Y': 214.3 },
      priceHistory: { '1D': [259.56, 263.7, 266.58, 269.2, 266.42, 265.6, 267.37, 267.27, 267.28, 265.03, 266.24, 265.96, 267.54, 268.26, 267.83, 267.9, 267.23, 267.55, 266.41, 265.98, 265.35, 266.17, 267.07, 269.16], '1W': [256.42, 237.33, 238.73, 259.56, 269.16], '1M': [188.84, 201.14, 195.72, 192.76, 192.17, 194, 204.52, 212.51, 213.11, 192.92, 210.81, 213.94, 213.56, 241.16, 254.54, 256.42, 237.33, 238.73, 259.56, 269.16], 'YTD': [121.51, 132.46, 143.45, 150, 168.47, 130.72, 147.95, 146.99, 154.67, 147.59, 146.5, 148.13, 156.62, 147.24, 167.23, 179.59, 178.54, 180.9, 171.33, 184.52, 175.65, 188.84, 194, 210.81, 254.54, 269.16], '6M': [126.57, 124.36, 135.97, 143.45, 150, 168.47, 133.1, 147.95, 146.99, 152.43, 142.94, 140.96, 151.15, 145.11, 151.68, 173.73, 179.14, 193.5, 172.63, 176.32, 189.29, 184.22, 192.17, 192.92, 254.54, 269.16], '1Y': [85.63, 89.57, 91.92, 93.65, 89.22, 91.61, 91.56, 91.02, 88.34, 87.96, 84.64, 91.77, 99.06, 107.12, 107.86, 108.47, 102.5, 115.29, 121.51, 121.91, 121.79, 113.37, 113.67, 118.99, 122.56, 122.34, 126.57, 124.36, 135.97, 143.45, 150, 168.47, 133.1, 145.09, 149.6, 152.46, 142.94, 140.96, 151.15, 145.11, 151.68, 173.73, 179.14, 193.5, 172.63, 186.92, 189.29, 184.22, 192.17, 192.92, 254.54, 269.16] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$352B', pe: 76.2, revenueGrowth: 12, eps: 3.53, grossMargin: 61, dividendYield: 0.35,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: 1.75, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.68, CBSE: 2.94, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.76, XMMO: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 3, avgWeight: 5.69, proScore: 1, coverage: 0.176,
      price: 2273.73, weeklyPrices: [2107.86, 1991.55, 1958.80, 2184.75, 2273.73], weeklyChange: 7.87, dayChange: 4.07, sortRank: 0, periodReturns: { '1M': 53.8, 'YTD': 857.8, '6M': 843.3, '1Y': 4742.9 },
      priceHistory: { '1D': [2184.75, 2254.48, 2292, 2313, 2326.05, 2307.23, 2345.99, 2313.21, 2303.7, 2300.22, 2317.66, 2308.3, 2306.66, 2305.72, 2318.85, 2325.29, 2329.94, 2317.59, 2319.02, 2312.5, 2323.31, 2292.92, 2291.82, 2273.73], '1W': [2107.86, 1991.55, 1958.8, 2184.75, 2273.73], '1M': [1478.69, 1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73], 'YTD': [237.38, 334.54, 387.81, 503.44, 539.3, 584.55, 599.34, 621.09, 632.38, 599.06, 655.43, 720.17, 702.48, 635.34, 780.9, 944.46, 903.49, 1002.35, 1255.86, 1547.56, 1333.01, 1478.69, 1761.43, 1642, 1980.1, 2273.73], '6M': [241.05, 240.22, 353.56, 387.81, 503.44, 539.3, 576.2, 599.34, 621.09, 651.9, 565.59, 618.82, 772.09, 603.17, 701.59, 851.77, 920.99, 989.9, 1187, 1339.96, 1382.72, 1542.24, 1694.98, 1559.32, 1980.1, 2273.73], '1Y': [46.95, 45.35, 46.17, 42.72, 41.36, 42.93, 42.51, 43.37, 45.52, 46.78, 51.07, 70.51, 91.55, 106.4, 112.2, 120.95, 134.61, 148.04, 176.49, 207.01, 267.95, 265.88, 226.96, 205.35, 219.46, 209.31, 241.05, 240.22, 353.56, 387.81, 503.44, 539.3, 576.2, 630.29, 649.97, 635.36, 565.59, 618.82, 772.09, 603.17, 701.59, 851.77, 920.99, 989.9, 1187, 1562.34, 1382.72, 1542.24, 1694.98, 1559.32, 1980.1, 2273.73] },
      velocityScore: { '1D': null, '1W': null, '1M': -61.8, '6M': null }, isNew: false,
      marketCap: '$337B', pe: 77.7, revenueGrowth: 251, eps: 29.28, grossMargin: 56, dividendYield: null,
      etfPresence: { PTF: 9.23, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: 4.87, WGMI: false, CNEQ: false, SGRT: false, SPMO: 2.98, XMMO: false },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks', easyScore: 3, avgWeight: 5.11, proScore: 0.9, coverage: 0.176,
      price: 286.4, weeklyPrices: [284.54, 279.90, 282.13, 287.78, 286.40], weeklyChange: 0.65, dayChange: -0.48, sortRank: 0, periodReturns: { '1M': 9.9, 'YTD': 55.5, '6M': 51.1, '1Y': 40.9 },
      priceHistory: { '1D': [287.78, 293.43, 292.2, 291.59, 291.61, 289.81, 288.57, 289.29, 288.54, 286.3, 286.37, 286.14, 286.34, 284.99, 285.55, 285.97, 286.45, 286.46, 286.42, 286.14, 285.36, 285.47, 287.51, 286.4], '1W': [284.54, 279.9, 282.13, 287.78, 286.4], '1M': [260.58, 256.75, 248.47, 257.77, 281.69, 300.48, 297.18, 280.43, 279.25, 272.05, 266.33, 260.52, 263.22, 279.53, 279.62, 284.54, 279.9, 282.13, 287.78, 286.4], 'YTD': [184.2, 190.8, 190.93, 182.27, 176.2, 166.72, 165.3, 150.99, 144.84, 158.56, 164.93, 169.19, 157.21, 160.32, 173.78, 161.59, 174.96, 180.99, 184.56, 213.66, 247.55, 260.58, 300.48, 266.33, 279.62, 286.4], '6M': [189.49, 186.85, 193.9, 190.93, 182.27, 176.2, 154.77, 165.3, 150.99, 149.4, 163.16, 168.12, 169.74, 156.36, 163.21, 155.73, 167.85, 178.54, 181.08, 196.53, 238.21, 252.92, 281.69, 272.05, 279.62, 286.4], '1Y': [203.32, 204.64, 203.99, 192.25, 196.73, 193.84, 171, 168.17, 176.17, 184.55, 190.52, 197.55, 201.34, 203.25, 203.62, 211.04, 213.28, 211.82, 220.29, 219.23, 216.54, 202.9, 183.89, 189.88, 195, 187.09, 189.49, 186.85, 193.9, 190.93, 182.27, 176.2, 154.77, 162.81, 148.7, 148.92, 163.16, 168.12, 169.74, 156.36, 163.21, 155.73, 167.85, 178.54, 181.08, 207.88, 238.21, 252.92, 281.69, 272.05, 279.62, 286.4] },
      velocityScore: { '1D': null, '1W': -20.4, '1M': -67.2, '6M': null }, isNew: false,
      marketCap: '$233B', pe: 249, revenueGrowth: 31, eps: 1.15, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.78, IGV: 8.87, FDTX: 3.67, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'BE', name: 'Bloom Energy Corp', easyScore: 4, avgWeight: 3.67, proScore: 2.94, coverage: 0.8,
      price: 345.76, weeklyPrices: [274.50, 280.88, 284.99, 328.91, 345.76], weeklyChange: 25.96, dayChange: 5.12, sortRank: 0, periodReturns: { '1M': 14.3, 'YTD': 297.9, '6M': 274.8, '1Y': 1432.6 },
      priceHistory: { '1D': [328.91, 345.48, 346.66, 342.87, 339.45, 334.39, 338.86, 341, 339.55, 337.83, 339.37, 339.02, 340.2, 338.17, 337.08, 338.77, 341.34, 341.8, 342.26, 342.05, 340.54, 340.89, 340.27, 345.76], '1W': [274.5, 280.88, 284.99, 328.91, 345.76], '1M': [302.49, 302.4, 293.8, 290.01, 285, 273.51, 302.85, 287.32, 291.37, 263.61, 253.57, 259.61, 234.23, 248.88, 260.22, 274.5, 280.88, 284.99, 328.91, 345.76], 'YTD': [86.89, 121.84, 133.46, 145.63, 156.51, 147.35, 155.54, 159, 174.77, 164.78, 159.21, 160.05, 145.88, 135.49, 146.78, 219.03, 220.91, 226.37, 288.64, 283.92, 258.71, 302.49, 273.51, 253.57, 260.22, 345.76], '6M': [92.26, 87.26, 108, 133.46, 145.63, 156.51, 136.6, 155.54, 159, 168.57, 159.99, 157.17, 166.69, 133.52, 135.63, 166.7, 207.86, 231.17, 290.52, 258.64, 303.41, 307.88, 285, 263.61, 260.22, 345.76], '1Y': [22.56, 23.92, 24.3, 25.31, 25.93, 34.75, 36.1, 37.65, 46.5, 49.35, 51.35, 55, 73.29, 77.38, 84.57, 86.06, 109.91, 109.06, 108.53, 142.37, 139.23, 107.11, 95.56, 105, 109.44, 87.61, 92.26, 87.26, 108, 133.46, 145.63, 156.51, 136.6, 139.03, 147.55, 155.67, 159.99, 157.17, 166.69, 133.52, 135.63, 166.7, 207.86, 231.17, 290.52, 261.03, 303.41, 307.88, 285, 263.61, 260.22, 345.76] },
      velocityScore: { '1D': null, '1W': 37.4, '1M': 17.6, '6M': null }, isNew: false,
      marketCap: '$98B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: 1.76, VOLT: 4.55, PBD: false, PBW: 2.59, IVEP: 5.78 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 3, avgWeight: 4.68, proScore: 2.81, coverage: 0.6,
      price: 740.47, weeklyPrices: [724.35, 719.29, 714.85, 702.25, 740.47], weeklyChange: 2.22, dayChange: 5.44, sortRank: 0, periodReturns: { '1M': 2.4, 'YTD': 75.4, '6M': 71, '1Y': 102.4 },
      priceHistory: { '1D': [702.25, 713.86, 714.24, 710.99, 714.34, 718, 718.32, 717.76, 719.61, 720.38, 725.25, 730.6, 732.46, 730.95, 731.48, 730.59, 733.45, 734.7, 736.09, 736.6, 737.85, 738, 737.48, 740.47], '1W': [724.35, 719.29, 714.85, 702.25, 740.47], '1M': [723.44, 742.18, 733.62, 730.1, 711.73, 687.48, 706.06, 715.67, 719.17, 695.11, 693.81, 691.95, 650.92, 683.29, 707.74, 724.35, 719.29, 714.85, 702.25, 740.47], 'YTD': [422.06, 413.17, 437.07, 468.78, 483.43, 464.57, 523.96, 554, 562.77, 568.38, 567.71, 571.64, 578.44, 549.02, 576.24, 594.4, 605.89, 630.94, 757.34, 781.38, 723.03, 723.44, 687.48, 693.81, 707.74, 740.47], '6M': [433.03, 428.81, 436.89, 437.07, 468.78, 483.43, 477.72, 523.96, 554, 565.05, 549.22, 566.91, 577.95, 545.64, 560.63, 585.36, 601.88, 624.84, 742.21, 750.73, 780.08, 716.91, 711.73, 695.11, 707.74, 740.47], '1Y': [365.76, 378.08, 377.56, 386.54, 394.93, 410.99, 393.62, 384.12, 383.32, 378.31, 374.68, 373.47, 378.24, 389.53, 414.42, 421.51, 430.98, 440.74, 441.82, 450.82, 450.38, 426.87, 442.64, 454.72, 457.96, 438.49, 433.03, 428.81, 436.89, 437.07, 468.78, 483.43, 477.72, 515.88, 552.66, 563.08, 549.22, 566.91, 577.95, 545.64, 560.63, 585.36, 601.88, 624.84, 742.21, 745, 780.08, 716.91, 711.73, 695.11, 707.74, 740.47] },
      velocityScore: { '1D': null, '1W': -4.7, '1M': -23.4, '6M': null }, isNew: false,
      marketCap: '$111B', pe: 101.4, revenueGrowth: 26, eps: 7.3, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.66, VOLT: 5.23, PBD: false, PBW: false, IVEP: 4.15 },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 3, avgWeight: 4.61, proScore: 2.77, coverage: 0.6,
      price: 307.8, weeklyPrices: [303.53, 292.70, 294.03, 297.20, 307.80], weeklyChange: 1.41, dayChange: 3.57, sortRank: 0, periodReturns: { '1M': 10.2, 'YTD': 189.7, '6M': 174.4, '1Y': 411.5 },
      priceHistory: { '1D': [297.2, 304.02, 302.83, 303.1, 301.4, 302.18, 305.93, 304.52, 307.02, 304.74, 300.6, 303.52, 304.48, 303.57, 304.46, 305.08, 304.38, 305.53, 306.08, 307.8, 307.96, 312.52, 310.44, 307.8], '1W': [303.53, 292.7, 294.03, 297.2, 307.8], '1M': [279.22, 291.97, 295.94, 288.9, 284.42, 288.12, 299.07, 299.73, 300.06, 284.87, 293.6, 283.51, 262.34, 290.5, 294.75, 303.53, 292.7, 294.03, 297.2, 307.8], 'YTD': [106.26, 119.94, 133.76, 142.29, 152.31, 175.77, 197.45, 178.79, 183, 170.96, 171.73, 174.04, 186.82, 180.36, 218.07, 234.42, 240.97, 255.56, 269.95, 322.05, 266.8, 279.22, 288.12, 293.6, 294.75, 307.8], '6M': [112.18, 109.16, 118.62, 133.76, 142.29, 152.31, 179.6, 197.45, 178.79, 176.96, 167.67, 171.19, 175.13, 174.8, 182.6, 230.94, 241.01, 252.76, 275.33, 305.93, 296.98, 270.75, 284.42, 284.87, 294.75, 307.8], '1Y': [60.17, 70.15, 72.14, 70.37, 73.67, 77.77, 76.72, 88.28, 86.57, 86.12, 87.92, 92.3, 99.41, 97.41, 101.6, 104.42, 105.33, 116.4, 124.71, 130.23, 124.62, 105.94, 100.03, 107.5, 115.02, 110.88, 112.18, 109.16, 118.62, 133.76, 142.29, 152.31, 179.6, 197.63, 182.27, 174.53, 167.67, 171.19, 175.13, 174.8, 182.6, 230.94, 241.01, 252.76, 275.33, 309.39, 296.98, 270.75, 284.42, 284.87, 294.75, 307.8] },
      velocityScore: { '1D': null, '1W': -14.5, '1M': -45, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 60.2, revenueGrowth: 7, eps: 5.11, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { POW: 4.67, VOLT: 7.33, PBD: false, PBW: 1.83, IVEP: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 3, avgWeight: 4.42, proScore: 2.65, coverage: 0.6,
      price: 435.66, weeklyPrices: [407.06, 407.71, 409.64, 421.77, 435.66], weeklyChange: 7.03, dayChange: 3.29, sortRank: 0, periodReturns: { '1M': 11.3, 'YTD': 36.8, '6M': 36, '1Y': 30.8 },
      priceHistory: { '1D': [421.77, 426.22, 425.62, 427.21, 427.85, 428.11, 430.01, 431.77, 431.44, 432.03, 432.89, 432.32, 434.04, 433.45, 433.77, 434.71, 435.02, 434.5, 434.9, 434.37, 433.89, 434.23, 434.35, 435.66], '1W': [407.06, 407.71, 409.64, 421.77, 435.66], '1M': [391.35, 403.13, 406.37, 401.94, 400.6, 400.08, 417.62, 421.21, 418.61, 395.94, 403.14, 401.72, 375.46, 393.64, 391.39, 407.06, 407.71, 409.64, 421.77, 435.66], 'YTD': [318.51, 320.58, 331.14, 334.04, 354.37, 365, 396.09, 377.32, 373.53, 354.46, 355.79, 363.95, 374.1, 357.67, 385.58, 401.9, 409.7, 413.07, 422.44, 419, 381.87, 391.35, 400.08, 403.14, 391.39, 435.66], '6M': [320.39, 320.86, 322.67, 331.14, 334.04, 354.37, 354.67, 396.09, 377.32, 374.59, 354.79, 348.64, 360.23, 357.1, 361.1, 403, 406.21, 423.92, 425.55, 399.15, 408.1, 381.51, 400.6, 395.94, 391.39, 435.66], '1Y': [332.95, 356.99, 356.98, 362.11, 372.65, 390.01, 384.76, 360.11, 353.5, 345.76, 343.75, 348.23, 371.19, 368.52, 374.25, 370.94, 375.37, 377.69, 379.74, 386.57, 379.57, 342.75, 330.43, 333.11, 341.76, 329.93, 320.39, 320.86, 322.67, 331.14, 334.04, 354.37, 354.67, 390.33, 373.38, 375.92, 354.79, 348.64, 360.23, 357.1, 361.1, 403, 406.21, 423.92, 425.55, 401.51, 408.1, 381.51, 400.6, 395.94, 391.39, 435.66] },
      velocityScore: { '1D': null, '1W': 1.1, '1M': -17.2, '6M': null }, isNew: false,
      marketCap: '$169B', pe: 42.7, revenueGrowth: 17, eps: 10.21, grossMargin: 37, dividendYield: 1.04,
      etfPresence: { POW: 3.92, VOLT: 5.38, PBD: false, PBW: false, IVEP: 3.96 },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 3, avgWeight: 3.96, proScore: 2.38, coverage: 0.6,
      price: 1127.09, weeklyPrices: [979.07, 982.35, 1048.86, 1109.73, 1127.09], weeklyChange: 15.12, dayChange: 1.56, sortRank: 0, periodReturns: { '1M': 8.5, 'YTD': 72.5, '6M': 70.3, '1Y': 125.5 },
      priceHistory: { '1D': [1109.73, 1125.07, 1122.65, 1136, 1119.59, 1114.03, 1115.45, 1116.32, 1120.93, 1121.72, 1128.5, 1130.03, 1126.22, 1126.5, 1122.03, 1127.8, 1127.27, 1122.26, 1119.24, 1123.53, 1126.44, 1131.99, 1125.13, 1127.09], '1W': [979.07, 982.35, 1048.86, 1109.73, 1127.09], '1M': [1038.74, 1070.47, 1031.89, 996, 968.32, 950.54, 969.67, 959.36, 963.33, 933.61, 933.85, 920.15, 867.09, 906.79, 940.66, 979.07, 982.35, 1048.86, 1109.73, 1127.09], 'YTD': [653.57, 628.4, 644.18, 661.67, 717.39, 746.22, 823.67, 834.61, 876.01, 841.27, 847.65, 844.05, 909.41, 872.9, 936.07, 987.5, 991.3, 1088.93, 1073.95, 1073.08, 1012.25, 1038.74, 950.54, 933.85, 940.66, 1127.09], '6M': [661.81, 659.64, 662.32, 644.18, 661.67, 717.39, 737.53, 823.67, 834.61, 876.46, 815.01, 832.11, 877.39, 873.12, 898.57, 991.32, 1002.75, 1149.19, 1062.95, 1045.63, 1090.53, 1043.82, 968.32, 933.61, 940.66, 1127.09], '1Y': [499.88, 529.15, 530, 559.61, 548.99, 632.67, 662.77, 650.76, 625.02, 602.31, 579.68, 605.7, 617.91, 633.41, 614.9, 606.12, 648.25, 594.07, 584.39, 581.26, 579.8, 577.02, 580.49, 601.58, 625.3, 686.22, 661.81, 659.64, 662.32, 644.18, 661.67, 717.39, 737.53, 816.56, 830.34, 873.6, 815.01, 832.11, 877.39, 873.12, 898.57, 991.32, 1002.75, 1149.19, 1062.95, 1040.15, 1090.53, 1043.82, 968.32, 933.61, 940.66, 1127.09] },
      velocityScore: { '1D': null, '1W': 8.7, '1M': -13.5, '6M': null }, isNew: false,
      marketCap: '$303B', pe: 33, revenueGrowth: 16, eps: 34.18, grossMargin: 20, dividendYield: 0.18,
      etfPresence: { POW: 3.25, VOLT: 4.39, PBD: false, PBW: false, IVEP: 4.25 },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 3, avgWeight: 3.42, proScore: 2.05, coverage: 0.6,
      price: 184.37, weeklyPrices: [169.00, 167.34, 170.94, 177.02, 184.37], weeklyChange: 9.09, dayChange: 4.15, sortRank: 0, periodReturns: { '1M': 12, 'YTD': 80.8, '6M': 79.4, '1Y': 160.6 },
      priceHistory: { '1D': [177.02, 178.88, 178.38, 178.18, 177.86, 177.85, 178.65, 179.02, 178.73, 179.56, 180, 180.78, 181.68, 180.97, 181.67, 182.09, 182.52, 182.43, 182.59, 182.53, 182.54, 183.22, 183.23, 184.37], '1W': [169, 167.34, 170.94, 177.02, 184.37], '1M': [164.66, 169.29, 167.8, 164.87, 166.99, 171.55, 173.39, 176.39, 173.88, 162.86, 163.81, 163.8, 156.79, 164.52, 165.84, 169, 167.34, 170.94, 177.02, 184.37], 'YTD': [101.97, 102.72, 104.54, 111.57, 115.62, 116.69, 112.75, 116.88, 121.8, 113.83, 111.09, 114.71, 125.61, 118.28, 127.11, 134.48, 137, 138.3, 162.69, 173.39, 160.69, 164.66, 171.55, 163.81, 165.84, 184.37], '6M': [102.79, 103.01, 106.48, 104.54, 111.57, 115.62, 113.87, 112.75, 116.88, 121.79, 110.55, 107.87, 122.58, 118.44, 117.96, 130.56, 134.69, 142.17, 158.92, 166.73, 173.96, 163.57, 166.99, 162.86, 165.84, 184.37], '1Y': [70.75, 73.25, 74.2, 74.55, 74.63, 79.72, 90.49, 88.76, 89.41, 89.4, 89.48, 91.44, 96.2, 97.7, 98.64, 96, 99.5, 100.23, 103.91, 112.36, 112.33, 104.09, 104.1, 105.36, 107.42, 102.41, 102.79, 103.01, 106.48, 104.54, 111.57, 115.62, 113.87, 111.9, 116.87, 118.36, 110.55, 107.87, 122.58, 118.44, 117.96, 130.56, 134.69, 142.17, 158.92, 169.95, 173.96, 163.57, 166.99, 162.86, 165.84, 184.37] },
      velocityScore: { '1D': null, '1W': -0.5, '1M': -14.9, '6M': null }, isNew: false,
      marketCap: '$30B', pe: 62.7, revenueGrowth: 54, eps: 2.94, grossMargin: 37, dividendYield: 0.47,
      etfPresence: { POW: 3.79, VOLT: 3.19, PBD: false, PBW: false, IVEP: 3.29 },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 3, avgWeight: 3.42, proScore: 2.05, coverage: 0.6,
      price: 86.09, weeklyPrices: [86.12, 86.23, 85.73, 86.75, 86.09], weeklyChange: -0.03, dayChange: -0.76, sortRank: 0, periodReturns: { '1M': -2.8, 'YTD': 7.2, '6M': 7.6, '1Y': 21.7 },
      priceHistory: { '1D': [86.75, 86.56, 87.04, 87.13, 86.94, 87.25, 87.15, 87.2, 87.13, 86.9, 86.99, 86.9, 86.86, 86.88, 86.84, 86.76, 86.72, 86.81, 86.83, 86.88, 86.51, 86.43, 86.15, 86.09], '1W': [86.12, 86.23, 85.73, 86.75, 86.09], '1M': [88.55, 87.65, 87.65, 87.25, 87.01, 83.66, 85.68, 84.58, 85.68, 85.84, 84.01, 84.83, 85.12, 84.84, 85.99, 86.12, 86.23, 85.73, 86.75, 86.09], 'YTD': [80.28, 79.49, 81.98, 85.07, 88.18, 89.97, 91.36, 91.64, 95.11, 92.6, 91.66, 92.53, 91.62, 92.88, 94.17, 91.31, 90.6, 96.51, 95.51, 94.84, 89.04, 88.55, 83.66, 84.01, 85.99, 86.09], '6M': [80.04, 80.53, 78.37, 81.98, 85.07, 88.18, 89.21, 91.36, 91.64, 91.99, 91.13, 91.73, 92.41, 91.16, 93.15, 94.08, 91.98, 95.28, 96.95, 93.32, 95.68, 89.69, 87.01, 85.84, 85.99, 86.09], '1Y': [70.73, 69.42, 72.46, 74.7, 77.54, 71.95, 70.53, 72.45, 75.72, 75.32, 72.65, 70.07, 69.83, 72.32, 75.49, 83.21, 84.3, 84.77, 86.03, 81.78, 84.77, 85.75, 84.23, 84.58, 79.64, 81.32, 80.04, 80.53, 78.37, 81.98, 85.07, 88.18, 89.21, 91.93, 92.18, 93.77, 91.13, 91.73, 92.41, 91.16, 93.15, 94.08, 91.98, 95.28, 96.95, 93.1, 95.68, 89.69, 87.01, 85.84, 85.99, 86.09] },
      velocityScore: { '1D': null, '1W': -4.2, '1M': -18, '6M': null }, isNew: false,
      marketCap: '$180B', pe: 21.9, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.87,
      etfPresence: { POW: 1.9, VOLT: 4.86, PBD: false, PBW: false, IVEP: 3.49 },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 3, avgWeight: 2.93, proScore: 1.76, coverage: 0.6,
      price: 539.32, weeklyPrices: [489.73, 502.65, 508.87, 523.69, 539.32], weeklyChange: 10.12, dayChange: 2.98, sortRank: 0, periodReturns: { '1M': 13.5, 'YTD': 21.4, '6M': 19.6, '1Y': 36.6 },
      priceHistory: { '1D': [523.69, 530.81, 527.91, 530.91, 529.67, 528.78, 530.6, 533.34, 534.54, 534.11, 534.86, 534.91, 535.04, 534.05, 535.89, 535.49, 534.67, 534.48, 534.61, 534.18, 535.23, 535.64, 534.89, 539.32], '1W': [489.73, 502.65, 508.87, 523.69, 539.32], '1M': [478.05, 484.25, 473.93, 473.61, 462.93, 480.46, 484.91, 485.27, 476.82, 485.03, 486.47, 467.59, 469.32, 476.89, 489.73, 502.65, 508.87, 523.69, 539.32], 'YTD': [444.11, 460.87, 476.06, 484.06, 497.97, 487.16, 516.03, 526.56, 527.9, 490.78, 477.97, 471.22, 505.62, 490.74, 527.21, 545.62, 549.11, 544.71, 516, 490.16, 470.87, 475.01, 462.93, 485.03, 476.89, 539.32], '6M': [455.92, 444.11, 460.87, 484.11, 485.53, 497.97, 487.4, 516.02, 526.73, 511.63, 471.54, 467.38, 475.74, 481.67, 494.25, 536.01, 535.57, 553.07, 508.43, 492.58, 479.97, 460.98, 473.61, 476.82, 476.89, 539.32], '1Y': [394.69, 408.41, 412.5, 414.86, 428.55, 427.33, 429.06, 417.54, 432.22, 437.56, 430.15, 437.24, 435.44, 435.23, 430.31, 412.93, 418.72, 431.65, 433.98, 467.61, 462.28, 420.57, 424.08, 427.48, 438.7, 438.42, 451.03, 446.61, 468.2, 476.06, 484.06, 497.97, 487.4, 516.02, 526.73, 511.63, 476.51, 468.41, 492.65, 481.67, 494.25, 536.01, 535.57, 553.07, 508.43, 492.58, 482.03, 460.98, 473.61, 476.82, 476.89, 539.32] },
      velocityScore: { '1D': null, '1W': 2.3, '1M': -17, '6M': null }, isNew: false,
      marketCap: '$28B', pe: 31.9, revenueGrowth: 11, eps: 16.92, grossMargin: 36, dividendYield: 1.08,
      etfPresence: { POW: 2.79, VOLT: 3.44, PBD: false, PBW: false, IVEP: 2.55 },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'NRG', name: 'NRG Energy Inc', easyScore: 3, avgWeight: 1.22, proScore: 0.73, coverage: 0.6,
      price: 138.87, weeklyPrices: [130.40, 132.10, 132.13, 135.06, 138.87], weeklyChange: 6.49, dayChange: 2.82, sortRank: 0, periodReturns: { '1M': 0.9, 'YTD': -12.8, '6M': -11.5, '1Y': -8.7 },
      priceHistory: { '1D': [135.06, 136, 136.4, 135.73, 136.04, 135.99, 136.12, 137.23, 136.42, 136.34, 136.72, 136.85, 136.71, 136.93, 136.94, 137.68, 138.54, 138.01, 137.94, 137.74, 137.87, 137.85, 137.93, 138.87], '1W': [130.4, 132.1, 132.13, 135.06, 138.87], '1M': [137.65, 140.43, 138, 137.5, 134.08, 129.47, 133.51, 133.76, 133.39, 129.2, 127.71, 129.96, 120.65, 123.7, 125.47, 130.4, 132.1, 132.13, 135.06, 138.87], 'YTD': [159.24, 143.53, 149.83, 151.09, 153.72, 143.99, 160.63, 175.01, 183.59, 163.54, 148.63, 154.75, 151.13, 146.14, 160.3, 170.96, 149.86, 154.81, 154.82, 137.3, 125.5, 137.65, 129.47, 127.71, 125.47, 138.87], '6M': [156.96, 160.43, 148.91, 149.83, 151.09, 153.72, 144.44, 160.63, 175.01, 181.34, 160.46, 152.1, 161.4, 146.14, 152.69, 164.07, 167.73, 159.81, 153.37, 141.86, 134.72, 136.92, 134.08, 129.2, 125.47, 138.87], '1Y': [152.05, 160.58, 151.27, 146.88, 153.96, 159.87, 173.91, 152.03, 150.44, 144.77, 145.11, 152.26, 164.22, 167.43, 161.95, 162.61, 168.77, 167.01, 172.59, 174.48, 166.72, 163.21, 166.85, 164.08, 166.75, 160.15, 156.96, 160.43, 148.91, 149.83, 151.09, 153.72, 144.44, 161.8, 179.18, 178.96, 160.46, 152.1, 161.4, 146.14, 152.69, 164.07, 167.73, 159.81, 153.37, 138.11, 134.72, 136.92, 134.08, 129.2, 125.47, 138.87] },
      velocityScore: { '1D': null, '1W': 1.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$29B', pe: 154.3, revenueGrowth: 20, eps: 0.9, grossMargin: 16, dividendYield: 1.41,
      etfPresence: { POW: 0.47, VOLT: 0.95, PBD: false, PBW: false, IVEP: 2.24 },
      tonyNote: 'NRG Energy Inc appears in 3 of 5 Electrification ETFs (60% coverage) with average weight 1.2% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, avgWeight: 5.49, proScore: 2.2, coverage: 0.4,
      price: 304.33, weeklyPrices: [302.15, 293.22, 299.84, 296.39, 304.33], weeklyChange: 0.72, dayChange: 2.68, sortRank: 0, periodReturns: { '1M': 12.7, 'YTD': 79.4, '6M': 74.9, '1Y': 226.1 },
      priceHistory: { '1D': [296.39, 296.39, 298.25, 301.98, 301.08, 300.51, 299.49, 299.14, 297.56, 298.76, 300.67, 299.73, 300.51, 301.5, 301.53, 302.61, 303.92, 303.06, 303.17, 302.95, 302.68, 303.07, 303.17, 304.33], '1W': [302.15, 293.22, 299.84, 296.39, 304.33], '1M': [270.01, 276.25, 280.13, 276.96, 274.52, 269.86, 269.22, 280.09, 276.54, 262.56, 279.13, 276.04, 276.95, 296.55, 293.87, 302.15, 293.22, 299.84, 296.39, 304.33], 'YTD': [169.63, 180.24, 192.96, 200.29, 210.44, 211.58, 238.4, 230.06, 234.67, 213.8, 200.88, 209.52, 222.04, 197.98, 228.29, 237.34, 257.41, 249.82, 286.69, 302.73, 258.28, 270.01, 269.86, 279.13, 293.87, 304.33], '6M': [174.02, 172.95, 181.03, 192.96, 200.29, 210.44, 208, 238.4, 230.06, 232.12, 202.58, 195.18, 214.95, 204.11, 204.65, 235.73, 254.25, 276.65, 283.6, 290.46, 268.73, 260.4, 274.52, 262.56, 293.87, 304.33], '1Y': [93.31, 97.69, 101.2, 98.24, 106, 130.49, 131.51, 128.22, 131.57, 137.03, 135.97, 143.15, 148.78, 146.79, 141.02, 141.25, 145.02, 147.96, 155.89, 158.57, 166.99, 141.86, 145.88, 161.55, 167.43, 171.76, 174.02, 172.95, 181.03, 192.96, 200.29, 210.44, 208, 231.48, 235.04, 229.71, 202.58, 195.18, 214.95, 204.11, 204.65, 235.73, 254.25, 276.65, 283.6, 297.98, 268.73, 260.4, 274.52, 262.56, 293.87, 304.33] },
      velocityScore: { '1D': null, '1W': -3.1, '1M': -39.6, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 73.3, revenueGrowth: 17, eps: 4.15, grossMargin: 39, dividendYield: 0.09,
      etfPresence: { POW: 3.39, VOLT: 7.59, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 2, avgWeight: 3.35, proScore: 1.34, coverage: 0.4,
      price: 358.18, weeklyPrices: [311.93, 299.60, 317.58, 333.05, 358.18], weeklyChange: 14.83, dayChange: 7.55, sortRank: 0, periodReturns: { '1M': 9.4, 'YTD': 121.1, '6M': 115.4, '1Y': 207.3 },
      priceHistory: { '1D': [333.05, 342.45, 345.4, 347.55, 344.32, 343.92, 347.45, 347.65, 346.33, 345.41, 348.03, 348.64, 349.7, 350.63, 351.97, 353.21, 353.2, 353.61, 353.57, 353.42, 353.57, 353.33, 355.1, 358.18], '1W': [311.93, 299.6, 317.58, 333.05, 358.18], '1M': [327.46, 323.91, 319.78, 314.18, 315.71, 323.39, 334.49, 331.44, 323.92, 300.51, 300.57, 289.52, 280.98, 297.88, 302.87, 311.93, 299.6, 317.58, 333.05, 358.18], 'YTD': [162.01, 160.78, 170.86, 181.12, 195.1, 182.56, 248.51, 243.06, 262.19, 251.28, 268.26, 268.41, 270.89, 250.58, 281.03, 310.51, 312.44, 305.03, 330.97, 367.92, 339.73, 327.46, 323.39, 300.57, 302.87, 358.18], '6M': [166.25, 164.34, 171.54, 170.86, 181.12, 195.1, 177.75, 248.51, 243.06, 259.23, 249.75, 265.38, 269.17, 252.4, 261.29, 295.11, 307.34, 323.46, 328.31, 340.01, 376.23, 323.4, 315.71, 300.51, 302.87, 358.18], '1Y': [116.54, 128.41, 125.89, 127.37, 125.29, 142.7, 140.2, 139.83, 135.69, 125.02, 124.01, 125.58, 136.65, 142.61, 150.86, 158.87, 179, 175.73, 192.9, 191.4, 187.84, 166.65, 168.91, 180.91, 178.38, 160.66, 166.25, 164.34, 171.54, 170.86, 181.12, 195.1, 177.75, 236.51, 243.75, 254.89, 249.75, 265.38, 269.17, 252.4, 261.29, 295.11, 307.34, 323.46, 328.31, 339.97, 376.23, 323.4, 315.71, 300.51, 302.87, 358.18] },
      velocityScore: { '1D': null, '1W': 4.7, '1M': -21.6, '6M': null }, isNew: false,
      marketCap: '$138B', pe: 89.5, revenueGrowth: 30, eps: 4, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 2.54, PBD: false, PBW: false, IVEP: 4.17 },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, avgWeight: 3.19, proScore: 1.28, coverage: 0.4,
      price: 130.3, weeklyPrices: [129.31, 129.75, 128.27, 127.69, 130.30], weeklyChange: 0.77, dayChange: 2.04, sortRank: 0, periodReturns: { '1M': -1, 'YTD': 13, '6M': 13.7, '1Y': 26.1 },
      priceHistory: { '1D': [127.69, 128.93, 129.23, 129.28, 129.4, 129.76, 129.53, 129.51, 129.33, 129.45, 129.55, 129.66, 129.59, 129.68, 129.61, 130.06, 129.82, 129.93, 130.12, 130.34, 129.98, 129.83, 130.07, 130.3], '1W': [129.31, 129.75, 128.27, 127.69, 130.3], '1M': [131.59, 130.9, 129.57, 127.76, 126.67, 123.79, 127.11, 126.31, 127.79, 129.14, 126.77, 127.76, 128.53, 128.48, 129.23, 129.31, 129.75, 128.27, 127.69, 130.3], 'YTD': [115.31, 115.93, 118.11, 117.18, 119.21, 119.98, 122.25, 128.42, 132.46, 133.52, 131.26, 133.62, 128.8, 131.08, 134.71, 135.46, 131.89, 135.59, 134.66, 130.7, 127.68, 131.59, 123.79, 126.77, 129.23, 130.3], '6M': [114.62, 115.99, 113.7, 118.11, 117.18, 119.21, 120.61, 122.25, 128.42, 132.1, 132.04, 132.22, 128.72, 128.85, 132.68, 136.3, 133.66, 134.73, 136.91, 131.76, 128.6, 129.61, 126.67, 129.14, 129.23, 130.3], '1Y': [103.31, 103.76, 103.96, 104.4, 110.16, 109.22, 115, 112, 110.7, 113.01, 110.09, 108.36, 106.84, 108.14, 112.5, 118.16, 116.8, 117.82, 116.39, 119.92, 122.56, 123.72, 122.04, 119.23, 116.07, 114.57, 114.62, 115.99, 113.7, 118.11, 117.18, 119.21, 120.61, 126.43, 129.37, 133.82, 132.04, 132.22, 128.72, 128.85, 132.68, 136.3, 133.66, 134.73, 136.91, 130.16, 128.6, 129.61, 126.67, 129.14, 129.23, 130.3] },
      velocityScore: { '1D': null, '1W': 13.3, '1M': -36.3, '6M': null }, isNew: false,
      marketCap: '$71B', pe: 19.3, revenueGrowth: 10, eps: 6.75, grossMargin: 47, dividendYield: 2.98,
      etfPresence: { POW: 2.36, VOLT: 4.02, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, avgWeight: 2.81, proScore: 1.13, coverage: 0.4,
      price: 388.23, weeklyPrices: [370.66, 350.45, 353.32, 372.59, 388.23], weeklyChange: 4.74, dayChange: 4.2, sortRank: 0, periodReturns: { '1M': 19.5, 'YTD': 85.4, '6M': 78.3, '1Y': 198.6 },
      priceHistory: { '1D': [372.59, 370.94, 373.26, 375, 372.41, 372.49, 375.97, 377.25, 379.08, 376.55, 378.83, 378.95, 382.24, 382.37, 383.32, 382.77, 382.77, 385.5, 387.1, 387.69, 388.34, 387.36, 388.28, 388.23], '1W': [370.66, 350.45, 353.32, 372.59, 388.23], '1M': [324.86, 339.65, 328.34, 317.08, 302.18, 294.65, 312.28, 322.5, 320.92, 294.81, 306.11, 311.64, 308.17, 340.4, 354.37, 370.66, 350.45, 353.32, 372.59, 388.23], 'YTD': [209.37, 210.99, 237.9, 275.57, 269.12, 254.54, 308.77, 320.64, 338.51, 330.54, 314.84, 315.91, 356.38, 322.71, 366.95, 385.73, 385, 369.08, 387.03, 354.97, 309.06, 324.86, 294.65, 306.11, 354.37, 388.23], '6M': [217.76, 213.41, 224.4, 237.9, 275.57, 269.12, 257.64, 308.77, 320.64, 337.35, 311.42, 305.82, 327.8, 313.11, 332.31, 379.64, 375.6, 387.24, 389.05, 351.94, 344.6, 323.79, 302.18, 294.81, 354.37, 388.23], '1Y': [130.03, 132.5, 138.07, 139.1, 140.68, 142.21, 140.56, 151.61, 153.23, 153.01, 145.49, 154.76, 158.03, 176.59, 170.14, 173.09, 182.15, 197.44, 205.12, 205.61, 219.3, 198.54, 206.04, 210.94, 221.27, 215.16, 217.76, 213.41, 224.4, 237.9, 275.57, 269.12, 257.64, 312.95, 331.23, 335.57, 311.42, 305.82, 327.8, 313.11, 332.31, 379.64, 375.6, 387.24, 389.05, 357.24, 344.6, 323.79, 302.18, 294.81, 354.37, 388.23] },
      velocityScore: { '1D': null, '1W': 0.9, '1M': -37.2, '6M': null }, isNew: false,
      marketCap: '$16B', pe: 80.7, revenueGrowth: 26, eps: 4.81, grossMargin: 39, dividendYield: 0.11,
      etfPresence: { POW: 1.09, VOLT: 4.54, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'APH', name: 'Amphenol Corp', easyScore: 2, avgWeight: 2.67, proScore: 1.07, coverage: 0.4,
      price: 166.1, weeklyPrices: [158.59, 158.81, 161.11, 163.96, 166.10], weeklyChange: 4.74, dayChange: 1.31, sortRank: 0, periodReturns: { '1M': 25.8, 'YTD': 22.9, '6M': 22.9, '1Y': 74.4 },
      priceHistory: { '1D': [163.96, 167.12, 167.2, 167.08, 165.64, 164.26, 165.07, 165.1, 165.14, 164.49, 165.04, 164.53, 165.31, 165.94, 166.09, 166.45, 165.93, 165.85, 166.18, 166.18, 165.7, 165.38, 165.75, 166.1], '1W': [158.59, 158.81, 161.11, 163.96, 166.1], '1M': [132.06, 139.56, 140.24, 147.68, 148.76, 146.34, 148.4, 147.62, 146.77, 138.81, 143.6, 154.07, 149.22, 152.46, 153.8, 158.59, 158.81, 161.11, 163.96, 166.1], 'YTD': [135.14, 136.25, 146.75, 152.5, 149.58, 130, 144.04, 151.2, 152.64, 132.75, 134.54, 135.12, 127.96, 126.35, 135.32, 148.72, 151.93, 143.72, 141.03, 122.47, 121.72, 132.06, 146.34, 143.6, 153.8, 166.1], '6M': [135.14, 136.2, 138.91, 146.75, 152.5, 149.58, 127.63, 144.04, 151.2, 148.47, 136.24, 131.47, 130.65, 123.13, 128, 140.75, 151.06, 149.71, 142.3, 136.62, 129.19, 124.86, 148.76, 138.81, 153.8, 166.1], '1Y': [95.25, 98.75, 97.41, 99.44, 101.78, 105.31, 108.63, 109.81, 111.06, 109.73, 109.25, 116.79, 119.04, 125.4, 123.75, 124.53, 123.91, 127.67, 135.91, 141.55, 143.85, 132.33, 137.88, 141.49, 138.58, 129.13, 135.14, 136.2, 138.91, 146.75, 152.5, 149.58, 127.63, 143.73, 151.04, 146.06, 136.24, 131.47, 130.65, 123.13, 128, 140.75, 151.06, 149.71, 142.3, 128.03, 129.19, 124.86, 148.76, 138.81, 153.8, 166.1] },
      velocityScore: { '1D': null, '1W': 1.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$204B', pe: 47.7, revenueGrowth: 58, eps: 3.48, grossMargin: 38, dividendYield: 0.61,
      etfPresence: { POW: 0.97, VOLT: 4.36, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 2.48, proScore: 0.99, coverage: 0.4,
      price: 74.95, weeklyPrices: [71.49, 71.48, 71.25, 73.12, 74.95], weeklyChange: 4.85, dayChange: 2.51, sortRank: 0, periodReturns: { '1M': -4.5, 'YTD': 24.7, '6M': 27.2, '1Y': 23.9 },
      priceHistory: { '1D': [73.12, 73.52, 73.71, 73.79, 73.61, 73.96, 73.99, 74.24, 74.22, 74.45, 74.69, 74.82, 74.98, 75.13, 74.96, 75.28, 75.44, 75.41, 75.44, 75.33, 75.51, 75.72, 75.64, 74.95], '1W': [71.49, 71.48, 71.25, 73.12, 74.95], '1M': [78.47, 76.34, 74.37, 73.13, 71.39, 70.04, 71.31, 71.66, 72.43, 71.96, 71.59, 71.59, 72.26, 71.62, 72.08, 71.49, 71.48, 71.25, 73.12, 74.95], 'YTD': [60.11, 61.15, 60.71, 63.72, 67.24, 66.46, 71.12, 72.17, 73.97, 75.77, 74.4, 73.69, 74.46, 72.78, 73.01, 71.44, 70.43, 73.04, 75.41, 74.18, 77.69, 78.47, 70.04, 71.59, 72.08, 74.95], '6M': [58.92, 60.16, 60.39, 60.71, 63.72, 67.24, 67.42, 71.12, 72.17, 74.77, 74.77, 73.52, 74.06, 74.06, 72, 72.74, 71.15, 72.18, 75.54, 72.95, 77.69, 77.52, 71.39, 71.96, 72.08, 74.95], '1Y': [60.48, 62.81, 57.69, 58.37, 57.36, 58.89, 60.26, 58.06, 56.52, 56.83, 57.38, 57.57, 57.95, 61.39, 63.35, 63.97, 62.68, 63.06, 57.67, 59.03, 60.6, 59.91, 59.43, 60.21, 61.55, 58.41, 58.92, 60.16, 60.39, 60.71, 63.72, 67.24, 67.42, 71.13, 72.98, 74.72, 74.77, 73.52, 74.06, 74.06, 72, 72.74, 71.15, 72.18, 75.54, 71.96, 77.69, 77.52, 71.39, 71.96, 72.08, 74.95] },
      velocityScore: { '1D': null, '1W': -3.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$92B', pe: 32.9, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.87,
      etfPresence: { POW: false, VOLT: 1.47, PBD: false, PBW: false, IVEP: 3.5 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'JCI', name: 'JOHNSON CONTROLS INTERNATIONAL PLC', easyScore: 2, avgWeight: 2.45, proScore: 0.98, coverage: 0.4,
      price: 148.23, weeklyPrices: [146.06, 145.17, 143.62, 144.82, 148.23], weeklyChange: 1.49, dayChange: 2.35, sortRank: 0, periodReturns: { '1M': 7.1, 'YTD': 23.8, '6M': 23.6, '1Y': 43.4 },
      priceHistory: { '1D': [144.82, 146.43, 146.58, 146.22, 145.68, 145.82, 145.82, 146.15, 146.18, 146.23, 146.76, 146.67, 147.05, 146.59, 146.96, 147.15, 147.17, 147.15, 147.12, 147.52, 147.78, 148.42, 148.44, 148.23], '1W': [146.06, 145.17, 143.62, 144.82, 148.23], '1M': [138.36, 140.22, 138.2, 136.15, 134.06, 133.91, 141.99, 146.96, 147.4, 143.65, 144.05, 147.75, 139.36, 144.01, 144.96, 146.06, 145.17, 143.62, 144.82, 148.23], 'YTD': [119.75, 111.29, 112.13, 114.51, 120.28, 129.49, 140.96, 142.7, 144.49, 140, 134.99, 132.56, 136.43, 130.95, 139, 142.05, 139.72, 141.59, 144.4, 141.78, 137.31, 138.36, 133.91, 144.05, 144.96, 148.23], '6M': [119.96, 120.94, 112.41, 112.13, 114.51, 120.28, 132.52, 140.96, 142.7, 143.42, 137.18, 130.94, 133.25, 131.57, 132.97, 142.53, 140.87, 141.92, 145.08, 139.25, 145.03, 135.47, 134.06, 143.65, 144.96, 148.23], '1Y': [103.35, 105.62, 105.5, 106.02, 108.3, 103.24, 106.48, 105.71, 105.71, 106.4, 105.96, 106.29, 106.96, 108.29, 109.95, 108.31, 106.38, 110.6, 113.05, 113.18, 122.58, 116.38, 114.19, 115.28, 115.77, 118.85, 119.96, 120.94, 112.41, 112.13, 114.51, 120.28, 132.52, 138.57, 143.79, 144.3, 137.18, 130.94, 133.25, 131.57, 132.97, 142.53, 140.87, 141.92, 145.08, 139.52, 145.03, 135.47, 134.06, 143.65, 144.96, 148.23] },
      velocityScore: { '1D': null, '1W': -4.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$90B', pe: 45.3, revenueGrowth: 8, eps: 3.27, grossMargin: 37, dividendYield: 1.1,
      etfPresence: { POW: false, VOLT: 1.4, PBD: false, PBW: false, IVEP: 3.51 },
      tonyNote: 'JOHNSON CONTROLS INTERNATIONAL PLC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TLN', name: 'Talen Energy Corp', easyScore: 2, avgWeight: 2.35, proScore: 0.94, coverage: 0.4,
      price: 438.12, weeklyPrices: [386.21, 406.51, 409.81, 436.29, 438.12], weeklyChange: 13.44, dayChange: 0.42, sortRank: 0, periodReturns: { '1M': 17.6, 'YTD': 16.9, '6M': 15.6, '1Y': 50.3 },
      priceHistory: { '1D': [436.29, 432.88, 435.61, 434.94, 434.2, 431.71, 435.61, 434.5, 433.39, 433.28, 433.74, 434.85, 435.51, 435.92, 436.73, 438.12, 438.81, 437.23, 436.98, 438.49, 440.67, 436.91, 435.84, 438.12], '1W': [386.21, 406.51, 409.81, 436.29, 438.12], '1M': [372.45, 389, 379.78, 381.47, 386.8, 377.2, 385.51, 379.59, 378.08, 364.74, 364.78, 358.74, 336.59, 344.8, 360.54, 386.21, 406.51, 409.81, 436.29, 438.12], 'YTD': [374.84, 356, 374.83, 379.86, 362.2, 317.05, 354.62, 380.06, 391.43, 336.57, 316.22, 327.14, 315.77, 319.23, 328.65, 345.76, 329.74, 361.17, 384.64, 383.44, 324.21, 372.45, 377.2, 364.78, 360.54, 438.12], '6M': [378.85, 378.97, 374.71, 374.83, 379.86, 362.2, 324.63, 354.62, 380.06, 390.05, 334.86, 311.45, 340.07, 323.13, 327.58, 321.33, 365.35, 364.32, 372.16, 390.55, 352.88, 360.48, 386.8, 364.74, 360.54, 438.12], '1Y': [291.59, 290.77, 277.46, 268.15, 313.58, 361.21, 390.68, 369.95, 376.89, 355.53, 375.15, 389.43, 409.6, 423.13, 425.38, 431.04, 435.83, 406.84, 407.12, 413.54, 393.63, 368.65, 380.49, 367.96, 348.38, 376.77, 378.85, 378.97, 374.71, 374.83, 379.86, 362.2, 324.63, 367.81, 382.25, 370.97, 334.86, 311.45, 340.07, 323.13, 327.58, 321.33, 365.35, 364.32, 372.16, 386.37, 352.88, 360.48, 386.8, 364.74, 360.54, 438.12] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$21B', pe: null, revenueGrowth: 97, eps: -0.52, grossMargin: 40, dividendYield: null,
      etfPresence: { POW: 1.73, VOLT: false, PBD: false, PBW: false, IVEP: 2.97 },
      tonyNote: 'Talen Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CEG', name: 'Constellation Energy Corp', easyScore: 2, avgWeight: 2.32, proScore: 0.93, coverage: 0.4,
      price: 275.53, weeklyPrices: [262.35, 268.00, 267.17, 274.06, 275.53], weeklyChange: 5.02, dayChange: 0.54, sortRank: 0, periodReturns: { '1M': -6.3, 'YTD': -22, '6M': -23, '1Y': -12.6 },
      priceHistory: { '1D': [274.06, 277.4, 276.33, 273.66, 273.52, 273.18, 274.16, 275.39, 273.61, 272.62, 273.5, 274.39, 273.97, 274.35, 275.79, 276.73, 276.46, 276.56, 276.36, 276.36, 276.09, 275.12, 274.79, 275.53], '1W': [262.35, 268, 267.17, 274.06, 275.53], '1M': [294.07, 301.57, 288.68, 286.31, 287.75, 265.7, 272.65, 267.24, 264.59, 254.83, 250.67, 251.65, 242.3, 246.71, 253.76, 262.35, 268, 267.17, 274.06, 275.53], 'YTD': [353.27, 322.54, 330.38, 287.35, 287.45, 250.46, 276.85, 291.66, 325.84, 322.85, 300.69, 307.69, 294.85, 279.25, 284.27, 296.61, 277.7, 305.71, 321.05, 299.69, 262, 294.07, 265.7, 250.67, 253.76, 275.53], '6M': [357.81, 357.12, 338.63, 330.38, 287.35, 287.45, 247.06, 276.85, 291.66, 323.56, 332.07, 301.55, 316.47, 295.19, 272.82, 286.5, 296.21, 313.53, 307.81, 311.28, 275.26, 285.83, 287.75, 254.83, 253.76, 275.53], '1Y': [315.21, 322.76, 312.84, 317.99, 317.79, 330.52, 354.89, 331.49, 322.77, 310.68, 307.19, 300.82, 322.91, 336.65, 329.07, 358.16, 380.91, 370, 391.15, 377.71, 360.93, 338.67, 354.11, 363.67, 359.15, 365.63, 357.81, 357.12, 338.63, 330.38, 287.35, 287.45, 247.06, 276.12, 294.84, 329.88, 332.07, 301.55, 316.47, 295.19, 272.82, 286.5, 296.21, 313.53, 307.81, 303.63, 275.26, 285.83, 287.75, 254.83, 253.76, 275.53] },
      velocityScore: { '1D': null, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$98B', pe: 23.9, revenueGrowth: 64, eps: 11.51, grossMargin: 23, dividendYield: 0.62,
      etfPresence: { POW: 1.26, VOLT: false, PBD: false, PBW: false, IVEP: 3.39 },
      tonyNote: 'Constellation Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VST', name: 'Vistra Corp', easyScore: 2, avgWeight: 2.29, proScore: 0.92, coverage: 0.4,
      price: 167.25, weeklyPrices: [153.52, 158.61, 158.83, 163.75, 167.25], weeklyChange: 8.94, dayChange: 2.28, sortRank: 0, periodReturns: { '1M': 7, 'YTD': 3.7, '6M': 3.5, '1Y': -10.3 },
      priceHistory: { '1D': [163.52, 164.74, 165.65, 165.26, 165.66, 165.19, 166.68, 167.48, 166.9, 166.57, 167.05, 166.87, 167.25, 167.5, 167.67, 168.73, 170.16, 169.63, 169.26, 168.38, 168.65, 168.58, 166.91, 167.25], '1W': [153.52, 158.61, 158.83, 163.75, 167.25], '1M': [156.27, 164.56, 160.15, 160.28, 160.23, 154.76, 157.97, 153.8, 153.7, 148.76, 146.9, 146.22, 138.54, 146.38, 148.02, 153.52, 158.61, 158.83, 163.75, 167.25], 'YTD': [161.33, 150.6, 168.97, 160.36, 162.58, 142.52, 160.15, 172.5, 175.36, 163.36, 159.16, 164.33, 152.72, 150.33, 155.89, 163.97, 154.91, 161.12, 160.85, 152.05, 136.75, 156.27, 154.76, 146.9, 148.02, 167.25], '6M': [161.57, 162.62, 154.6, 168.97, 160.36, 162.58, 143.07, 160.15, 172.5, 176.82, 167.4, 159.58, 167.37, 152.3, 151.18, 154.73, 163.46, 164.35, 155.28, 153.95, 141.9, 149.08, 160.23, 148.76, 148.02, 167.25], '1Y': [186.55, 193.81, 190.18, 191.37, 189.09, 198, 214.06, 200.08, 198.96, 190.08, 185.81, 193.78, 209.43, 204.24, 195.92, 199.62, 209.55, 194.24, 199.3, 193.04, 188.28, 175, 175.14, 172.55, 164.81, 173.45, 161.57, 162.62, 154.6, 168.97, 160.36, 162.58, 143.07, 163.1, 171.4, 173.89, 167.4, 159.58, 167.37, 152.3, 151.18, 154.73, 163.46, 164.35, 155.28, 147.72, 141.9, 149.08, 160.23, 148.76, 148.02, 167.25] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$56B', pe: 28, revenueGrowth: 43, eps: 5.98, grossMargin: 39, dividendYield: 0.56,
      etfPresence: { POW: 1.36, VOLT: false, PBD: false, PBW: false, IVEP: 3.22 },
      tonyNote: 'Vistra Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX TECHNOLOGIES INC', easyScore: 2, avgWeight: 2.14, proScore: 0.86, coverage: 0.4,
      price: 209.86, weeklyPrices: [193.94, 196.93, 203.07, 205.40, 209.86], weeklyChange: 8.21, dayChange: 2.17, sortRank: 0, periodReturns: { '1M': 3.4, 'YTD': 21.4, '6M': 17.6, '1Y': 47.7 },
      priceHistory: { '1D': [205.4, 208.95, 208.76, 208.63, 210.24, 210.29, 212.07, 213.67, 213.76, 212.65, 212.8, 212.16, 212.15, 211.55, 211.09, 211.61, 211.58, 211.54, 211.12, 210.45, 210.68, 210.43, 210.04, 209.86], '1W': [193.94, 196.93, 203.07, 205.4, 209.86], '1M': [202.91, 204.38, 198.95, 199.27, 195.88, 188.39, 187.26, 184.72, 190.76, 185.95, 187.46, 188.96, 183, 194.68, 193.45, 193.94, 196.93, 203.07, 205.4, 209.86], 'YTD': [172.84, 193.2, 204.08, 206.33, 210.18, 190.1, 198.5, 209.07, 208.27, 205.57, 195.98, 207.48, 204.76, 204.49, 231.78, 238.27, 216.66, 216.18, 216.68, 210.8, 201.94, 202.91, 188.39, 187.46, 193.45, 209.86], '6M': [178.41, 174.36, 192.24, 204.08, 206.33, 210.18, 187.42, 198.5, 209.07, 207.24, 195.5, 197.82, 210.12, 205.09, 214.98, 229.57, 235.78, 223.15, 216.31, 209.89, 210.94, 202.52, 195.88, 185.95, 193.45, 209.86], '1Y': [142.06, 144.06, 137.37, 137.45, 140.04, 150.28, 154.51, 177.89, 170.94, 162.84, 160.03, 162.23, 176.65, 178.02, 184.37, 191.39, 197.37, 207.72, 204.03, 215.86, 198.79, 176.18, 174.62, 176.2, 177.16, 173.2, 178.41, 174.36, 192.24, 204.08, 206.33, 210.18, 187.42, 196.9, 206.44, 205.98, 195.5, 197.82, 210.12, 205.09, 214.98, 229.57, 235.78, 223.15, 216.31, 205.33, 210.94, 202.52, 195.88, 185.95, 193.45, 209.86] },
      velocityScore: { '1D': null, '1W': 1.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 55.8, revenueGrowth: 26, eps: 3.76, grossMargin: 23, dividendYield: 0.51,
      etfPresence: { POW: false, VOLT: 2.1, PBD: false, PBW: false, IVEP: 2.18 },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 5.29, proScore: 2.64, coverage: 0.5,
      price: 932.75, weeklyPrices: [866.67, 857.76, 838.21, 861.88, 932.75], weeklyChange: 7.62, dayChange: 8.22, sortRank: 0, periodReturns: { '1M': 27.3, 'YTD': 204.6, '6M': 198, '1Y': 319.2 },
      priceHistory: { '1D': [861.88, 890.39, 896.9, 892.97, 883.13, 891.18, 905.41, 901.62, 907.17, 910.09, 910.95, 914.32, 926.84, 922.07, 922.67, 923.41, 924.12, 922.39, 922.81, 922.92, 925.95, 930.47, 928.96, 932.75], '1W': [866.67, 857.76, 838.21, 861.88, 932.75], '1M': [732.94, 783.53, 782.12, 842.96, 860.84, 845.39, 875.52, 957.03, 993.74, 882.43, 891.86, 842.01, 770.25, 838.55, 858.99, 866.67, 857.76, 838.21, 861.88, 932.75], 'YTD': [306.23, 297.62, 319.27, 364.25, 379.23, 360.16, 433.91, 415.13, 455.25, 420.22, 420.6, 425.51, 446.16, 407.27, 423.35, 464.54, 472.84, 471.85, 529.49, 868.18, 770.76, 732.94, 845.39, 891.86, 858.99, 932.75], '6M': [313.04, 307.68, 312.24, 319.27, 364.25, 379.23, 365.07, 433.91, 415.13, 433.34, 398.87, 404.59, 431.78, 415.93, 416.34, 446.36, 463.65, 497.18, 532.67, 811.41, 889.03, 733.77, 860.84, 882.43, 858.99, 932.75], '1Y': [222.5, 230.73, 227.02, 238.4, 242.01, 264.08, 271.74, 289.86, 283.2, 286.49, 276.91, 286.69, 319.38, 371.84, 339.68, 348.57, 355.27, 369.01, 376.74, 392.77, 384.45, 332.82, 342.44, 327.78, 324.1, 319.13, 313.04, 307.68, 312.24, 319.27, 364.25, 379.23, 365.07, 431.43, 435.5, 428.13, 398.87, 404.59, 431.78, 415.93, 416.34, 446.36, 463.65, 497.18, 532.67, 844.8, 889.03, 733.77, 860.84, 882.43, 858.99, 932.75] },
      velocityScore: { '1D': null, '1W': 22.2, '1M': -44.3, '6M': null }, isNew: false,
      marketCap: '$29B', pe: 83.3, revenueGrowth: 92, eps: 11.2, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 6.27, PRN: 4.31, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.61, proScore: 2.3, coverage: 0.5,
      price: 2066.41, weeklyPrices: [1952.02, 1913.94, 1931.77, 1967.41, 2066.41], weeklyChange: 5.86, dayChange: 5.03, sortRank: 0, periodReturns: { '1M': 13, 'YTD': 121.4, '6M': 117.3, '1Y': 310.8 },
      priceHistory: { '1D': [1967.41, 2015.82, 2014, 2016.79, 2001.39, 2004.96, 2015.24, 2010.79, 2011.14, 2007.26, 2020.32, 2030.53, 2044.18, 2042.88, 2042.6, 2048.02, 2050, 2054.85, 2057.94, 2053.3, 2053.61, 2055.01, 2050.57, 2066.41], '1W': [1952.02, 1913.94, 1931.77, 1967.41, 2066.41], '1M': [1828.25, 1883.56, 1867.09, 1855.15, 1828.21, 1787.88, 1883.26, 1850.04, 1914.65, 1843.94, 1852.03, 1831.56, 1719.48, 1843.42, 1877.61, 1952.02, 1913.94, 1931.77, 1967.41, 2066.41], 'YTD': [933.29, 971.49, 1053.1, 1131.7, 1171.46, 1119.81, 1338.65, 1373.52, 1450.6, 1430.38, 1407.32, 1424.46, 1461.52, 1378.99, 1525.16, 1650.48, 1674.16, 1719.21, 1891.95, 2032.98, 1854.43, 1828.25, 1787.88, 1852.03, 1877.61, 2066.41], '6M': [950.79, 946.93, 1035.12, 1053.1, 1131.7, 1171.46, 1147.97, 1338.65, 1373.52, 1438.23, 1348.22, 1373.76, 1444.6, 1358.66, 1417.19, 1592.84, 1650.47, 1726.12, 1867.02, 1942.02, 2042.36, 1835.33, 1828.21, 1843.94, 1877.61, 2066.41], '1Y': [502.98, 536.21, 527.42, 539.02, 532.14, 687.67, 699.16, 693.31, 695.76, 691.18, 698.61, 709.53, 777.18, 804.24, 825.18, 816.53, 845.99, 836.75, 976.45, 977.67, 974.14, 919.82, 945.07, 935.78, 983.61, 968.5, 950.79, 946.93, 1035.12, 1053.1, 1131.7, 1171.46, 1147.97, 1300.02, 1462.23, 1429.37, 1348.22, 1373.76, 1444.6, 1358.66, 1417.19, 1592.84, 1650.47, 1726.12, 1867.02, 1952.37, 2042.36, 1835.33, 1828.21, 1843.94, 1877.61, 2066.41] },
      velocityScore: { '1D': null, '1W': 27.1, '1M': -49.2, '6M': null }, isNew: false,
      marketCap: '$73B', pe: 59.7, revenueGrowth: 1, eps: 34.63, grossMargin: 25, dividendYield: 0.13,
      etfPresence: { AIRR: 4.46, PRN: 4.76, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, avgWeight: 4.54, proScore: 2.27, coverage: 0.5,
      price: 790.35, weeklyPrices: [688.87, 690.39, 719.52, 738.85, 790.35], weeklyChange: 14.73, dayChange: 6.97, sortRank: 0, periodReturns: { '1M': 20.4, 'YTD': 152.3, '6M': 133.9, '1Y': 279 },
      priceHistory: { '1D': [738.85, 765.76, 755.09, 754.06, 748.65, 749.79, 749.81, 752.6, 754.52, 760.51, 769, 768.66, 772.66, 766.37, 767.34, 773.57, 773.01, 778.01, 783.73, 783.43, 779.8, 784.01, 785.17, 790.35], '1W': [688.87, 690.39, 719.52, 738.85, 790.35], '1M': [656.35, 670.66, 673.51, 677.45, 667.02, 646.89, 663.14, 686.37, 689.43, 694.72, 619.98, 613.93, 588.9, 623.66, 641.68, 688.87, 690.39, 719.52, 738.85, 790.35], 'YTD': [313.32, 313.98, 317.76, 380.36, 355.51, 354.14, 422.5, 432.18, 442.34, 463.36, 472.86, 473.63, 444.83, 544.65, 588.28, 603.91, 615.42, 630.7, 697.15, 683.52, 664.76, 656.35, 646.89, 619.98, 641.68, 790.35], '6M': [337.9, 315.44, 337.03, 317.76, 380.36, 355.51, 345.97, 422.5, 432.18, 452.53, 430.25, 459.3, 479.9, 410.85, 575.16, 603.84, 597.88, 652.99, 702.27, 690, 740.91, 644.64, 667.02, 694.72, 641.68, 790.35], '1Y': [208.55, 220.48, 202.53, 222.2, 205.66, 238.15, 223.41, 228.08, 225.32, 226.88, 224.09, 217.41, 238.22, 266.64, 270.05, 268.53, 294.72, 290.27, 294.99, 310.41, 335.96, 346.35, 371.95, 357.48, 332.87, 320.1, 337.9, 315.44, 337.03, 317.76, 380.36, 355.51, 345.97, 413.65, 437.61, 451.25, 430.25, 459.3, 479.9, 410.85, 575.16, 603.84, 597.88, 652.99, 702.27, 680.26, 740.91, 644.64, 667.02, 694.72, 641.68, 790.35] },
      velocityScore: { '1D': null, '1W': 40.1, '1M': -46.6, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 69.5, revenueGrowth: 50, eps: 11.38, grossMargin: 21, dividendYield: 0.27,
      etfPresence: { AIRR: 4.45, PRN: 4.62, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Argan Inc is an engineering and construction company for power generation facilities — natural gas and renewable power plants. It appears in Industrials ETFs because power plant construction is one of the fastest-growing categories in U.S. infrastructure spending, driven by data center load additions that the grid cannot currently support.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 2, avgWeight: 2.79, proScore: 1.39, coverage: 0.5,
      price: 280.4, weeklyPrices: [270.44, 277.42, 283.23, 277.66, 280.40], weeklyChange: 3.68, dayChange: 0.99, sortRank: 0, periodReturns: { '1M': 9.3, 'YTD': 36.8, '6M': 34.7, '1Y': 59.7 },
      priceHistory: { '1D': [277.66, 276.81, 276.04, 278.66, 279, 278.22, 278.45, 279.13, 278.6, 278.79, 279.79, 279.43, 279.94, 279.01, 278.53, 279.53, 278.55, 277.93, 278.13, 278.65, 278.27, 278.74, 279.27, 280.4], '1W': [270.44, 277.42, 283.23, 277.66, 280.4], '1M': [256.55, 261.89, 258.02, 259.89, 258.25, 255.52, 250.72, 248.63, 249.33, 251.9, 246.55, 257.16, 249.49, 264.6, 264.67, 270.44, 277.42, 283.23, 277.66, 280.4], 'YTD': [205.02, 210.02, 220.25, 217.7, 208.93, 208.61, 230.85, 251.3, 259.64, 260.09, 251.65, 240.24, 239.51, 230.46, 250, 258.03, 247.72, 240.43, 239.7, 273.58, 256.99, 256.55, 255.52, 246.55, 264.67, 280.4], '6M': [208.17, 207.81, 210.9, 220.25, 217.7, 208.93, 209.63, 230.85, 251.3, 260.31, 252.39, 243.82, 232.94, 230.51, 232.68, 252.67, 255.69, 242.44, 239.51, 272.54, 272.37, 259.89, 258.25, 251.9, 264.67, 280.4], '1Y': [175.63, 186.13, 179.46, 184.68, 183.34, 189.17, 181.16, 179.88, 173.05, 171.24, 173.22, 178.98, 187.46, 193.58, 196.23, 191.46, 189.99, 192.52, 201.84, 206.74, 209.74, 200.28, 200.12, 196.26, 191.36, 195.18, 208.17, 207.81, 210.9, 220.25, 217.7, 208.93, 209.63, 244.79, 258.1, 262.53, 252.39, 243.82, 232.94, 230.51, 232.68, 252.67, 255.69, 242.44, 239.51, 270.56, 272.37, 259.89, 258.25, 251.9, 264.67, 280.4] },
      velocityScore: { '1D': null, '1W': 27.5, '1M': -40.1, '6M': null }, isNew: false,
      marketCap: '$112B', pe: 65.2, revenueGrowth: 19, eps: 4.3, grossMargin: 35, dividendYield: 0.17,
      etfPresence: { AIRR: false, PRN: 3.34, RSHO: false, IDEF: 2.23, BILT: false },
      tonyNote: 'Howmet Aerospace is an aerospace structures and engine components manufacturer. It appears in Industrials ETFs for its aerospace and defense exposure — commercial air travel recovery and defense spending growth are the two demand drivers. Revenue grew and margins are expanding as Howmet prices power over OEM customers.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 2, avgWeight: 2.48, proScore: 1.24, coverage: 0.5,
      price: 209.86, weeklyPrices: [193.94, 196.93, 203.07, 205.40, 209.86], weeklyChange: 8.21, dayChange: 2.17, sortRank: 0, periodReturns: { '1M': 3.4, 'YTD': 21.4, '6M': 17.6, '1Y': 47.7 },
      priceHistory: { '1D': [205.4, 208.95, 208.76, 208.63, 210.24, 210.29, 212.07, 213.67, 213.76, 212.65, 212.8, 212.16, 212.15, 211.55, 211.09, 211.61, 211.58, 211.54, 211.12, 210.45, 210.68, 210.43, 210.04, 209.86], '1W': [193.94, 196.93, 203.07, 205.4, 209.86], '1M': [202.91, 204.38, 198.95, 199.27, 195.88, 188.39, 187.26, 184.72, 190.76, 185.95, 187.46, 188.96, 183, 194.68, 193.45, 193.94, 196.93, 203.07, 205.4, 209.86], 'YTD': [172.84, 193.2, 204.08, 206.33, 210.18, 190.1, 198.5, 209.07, 208.27, 205.57, 195.98, 207.48, 204.76, 204.49, 231.78, 238.27, 216.66, 216.18, 216.68, 210.8, 201.94, 202.91, 188.39, 187.46, 193.45, 209.86], '6M': [178.41, 174.36, 192.24, 204.08, 206.33, 210.18, 187.42, 198.5, 209.07, 207.24, 195.5, 197.82, 210.12, 205.09, 214.98, 229.57, 235.78, 223.15, 216.31, 209.89, 210.94, 202.52, 195.88, 185.95, 193.45, 209.86], '1Y': [142.06, 144.06, 137.37, 137.45, 140.04, 150.28, 154.51, 177.89, 170.94, 162.84, 160.03, 162.23, 176.65, 178.02, 184.37, 191.39, 197.37, 207.72, 204.03, 215.86, 198.79, 176.18, 174.62, 176.2, 177.16, 173.2, 178.41, 174.36, 192.24, 204.08, 206.33, 210.18, 187.42, 196.9, 206.44, 205.98, 195.5, 197.82, 210.12, 205.09, 214.98, 229.57, 235.78, 223.15, 216.31, 205.33, 210.94, 202.52, 195.88, 185.95, 193.45, 209.86] },
      velocityScore: { '1D': null, '1W': 31.9, '1M': -46.8, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 55.8, revenueGrowth: 26, eps: 3.76, grossMargin: 23, dividendYield: 0.51,
      etfPresence: { AIRR: 3.19, PRN: false, RSHO: false, IDEF: 1.77, BILT: false },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 2, avgWeight: 1.86, proScore: 0.93, coverage: 0.5,
      price: 51.09, weeklyPrices: [57.02, 56.34, 56.16, 54.21, 51.09], weeklyChange: -10.4, dayChange: -5.76, sortRank: 0, periodReturns: { '1M': -9.1, 'YTD': -32.7, '6M': -37.3, '1Y': 17.1 },
      priceHistory: { '1D': [54.21, 53, 52.14, 50.88, 51.64, 51.43, 51.54, 51.63, 51.91, 51.42, 51.16, 51.26, 51.51, 51.42, 51.18, 51.14, 51.07, 51.47, 51.5, 51.28, 50.95, 50.9, 50.94, 51.09], '1W': [57.02, 56.34, 56.16, 54.21, 51.09], '1M': [56.18, 56.8, 57.3, 65.19, 64.13, 63.49, 63.27, 58.43, 63.4, 58.52, 57.73, 56.19, 54.82, 58.78, 57.75, 57.02, 56.34, 56.16, 54.21, 51.09], 'YTD': [75.91, 104.04, 121.5, 113.85, 108.16, 91.33, 87.78, 105.67, 88.23, 89.13, 88.92, 95.31, 77.49, 70.51, 74.46, 73.66, 68.55, 61.66, 61.93, 56.99, 54.22, 56.18, 63.49, 57.73, 57.75, 51.09], '6M': [81.53, 75.98, 91.44, 121.5, 113.85, 108.16, 85.25, 87.78, 105.67, 92.14, 85.54, 89.46, 92.78, 75.86, 67.31, 70.34, 70.99, 61.26, 62.05, 57, 54.85, 54.67, 64.13, 58.52, 57.75, 51.09], '1Y': [43.63, 46.45, 44.34, 51.12, 55.42, 57.09, 59.5, 65.41, 68.74, 66.9, 66.09, 64.56, 76.35, 83.9, 91.37, 103.69, 96.28, 86.65, 90.68, 91.1, 79.18, 70.24, 74.11, 70.96, 77.03, 73.13, 81.53, 75.98, 91.44, 121.5, 113.85, 108.16, 85.25, 87.05, 96.08, 86.18, 85.54, 89.46, 92.78, 75.86, 67.31, 70.34, 70.99, 61.26, 62.05, 57.89, 54.85, 54.67, 64.13, 58.52, 57.75, 51.09] },
      velocityScore: { '1D': null, '1W': 16.3, '1M': -54.9, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 300.5, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.69, PRN: false, RSHO: false, IDEF: 1.04, BILT: false },
      tonyNote: 'Kratos Defense is a defense technology company focused on unmanned systems, satellite communications, and high-performance computing for government customers. It appears in Industrials ETFs as an AI-adjacent defense name — autonomous systems and AI-driven surveillance are direct end markets. Revenue grew and the government contract backlog is expanding.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 2, avgWeight: 1.79, proScore: 0.89, coverage: 0.5,
      price: 278.08, weeklyPrices: [299.66, 298.51, 296.89, 285.43, 278.08], weeklyChange: -7.2, dayChange: -2.58, sortRank: 0, periodReturns: { '1M': -13.3, 'YTD': -18.2, '6M': -21.3, '1Y': 17.3 },
      priceHistory: { '1D': [285.43, 278.24, 276.33, 276.53, 278.24, 277.18, 277.11, 278.15, 278.83, 278.83, 278.79, 278.47, 278.81, 278.95, 278.64, 277.52, 275.77, 277.36, 278.85, 278.37, 277.69, 277.67, 278.14, 278.08], '1W': [299.66, 298.51, 296.89, 285.43, 278.08], '1M': [320.63, 320.95, 317.56, 320.9, 308.17, 296.41, 293.66, 287.54, 294.53, 293.04, 292.26, 297.52, 289.13, 300.95, 297.68, 299.66, 298.51, 296.89, 285.43, 278.08], 'YTD': [340.07, 378.47, 415.39, 424.14, 427.83, 413.14, 392.7, 443.14, 435.58, 437.03, 413.7, 422.94, 402.08, 379.9, 411.35, 398.07, 378.21, 361.4, 363.37, 317.75, 329.35, 320.63, 296.41, 292.26, 297.68, 278.08], '6M': [353.52, 341.98, 356.45, 415.39, 424.14, 427.83, 369.38, 392.7, 443.14, 443, 421.17, 414.56, 418.42, 384.79, 396.62, 394.41, 394.81, 359.29, 360.6, 314.72, 336.95, 317.55, 308.17, 293.04, 297.68, 278.08], '1Y': [237.1, 241.46, 247.95, 253.68, 253.96, 260.84, 265.67, 266.65, 267.6, 270.72, 269.71, 267.07, 273.19, 276.01, 287.91, 285.38, 287.9, 285.77, 301.69, 317.54, 318.66, 309.74, 309.92, 307.2, 314.95, 326.8, 353.52, 341.98, 356.45, 415.39, 424.14, 427.83, 369.38, 406.76, 437.57, 444.52, 421.17, 414.56, 418.42, 384.79, 396.62, 394.41, 394.81, 359.29, 360.6, 316.28, 336.95, 317.55, 308.17, 293.04, 297.68, 278.08] },
      velocityScore: { '1D': null, '1W': 18.7, '1M': -57.8, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 18.1, revenueGrowth: 13, eps: 15.38, grossMargin: 12, dividendYield: 1.93,
      etfPresence: { AIRR: 2.54, PRN: false, RSHO: false, IDEF: 1.03, BILT: false },
      tonyNote: 'Huntington Ingalls Industries is the only builder of nuclear-powered aircraft carriers for the U.S. Navy. Revenue is government-contracted and predictable; the ETF allocation in Industrials reflects defense spending growth and the Navy\'s backlog of nuclear submarine and carrier construction. A steady-state quality compounder in a market structure with no competition.',
    },
    {
      ticker: 'RBC', name: 'RBC Bearings Incorporated', easyScore: 2, avgWeight: 1.19, proScore: 0.59, coverage: 0.5,
      price: 645.4, weeklyPrices: [616.95, 621.08, 625.73, 639.18, 645.40], weeklyChange: 4.61, dayChange: 0.97, sortRank: 0, periodReturns: { '1M': 15.3, 'YTD': 43.9, '6M': 40.4, '1Y': 69.3 },
      priceHistory: { '1D': [639.18, 637, 639.45, 642.38, 642.02, 641.73, 643.45, 644.5, 642.63, 641.28, 641.88, 643.43, 644.93, 644.47, 644.76, 645.54, 644.52, 643.44, 643.35, 644.51, 642.68, 643.36, 642.84, 645.4], '1W': [616.95, 621.08, 625.73, 639.18, 645.4], '1M': [559.95, 584.4, 577.42, 577.83, 571.96, 566.14, 578.34, 584.18, 589.76, 590.09, 590.97, 592.41, 576.74, 607.46, 603.64, 616.95, 621.08, 625.73, 639.18, 645.4], 'YTD': [448.43, 485, 489.33, 504.99, 511.98, 516.78, 550.53, 551.42, 565.44, 570.08, 559.52, 544.55, 552.23, 543.12, 580.55, 598.23, 591.32, 594.39, 593.12, 613.59, 551.12, 559.95, 566.14, 590.97, 603.64, 645.4], '6M': [459.83, 452.89, 467.37, 489.33, 504.99, 511.98, 520.16, 550.53, 551.42, 576.5, 566.06, 547.31, 540.83, 548.95, 548.11, 598.3, 589.77, 589.51, 595.76, 611.54, 611.93, 566.96, 571.96, 590.09, 603.64, 645.4], '1Y': [381.25, 384.8, 381.6, 375.51, 392.38, 385.08, 405.98, 396.84, 398.93, 399.58, 387.71, 374.88, 378.73, 383.7, 390.29, 373.47, 380.76, 387.73, 411.08, 428.4, 441.04, 429.28, 430, 440.04, 436.5, 451.17, 459.83, 452.89, 467.37, 489.33, 504.99, 511.98, 520.16, 550.4, 559.18, 575.92, 566.06, 547.31, 540.83, 548.95, 548.11, 598.3, 589.77, 589.51, 595.76, 605.99, 611.93, 566.96, 571.96, 590.09, 603.64, 645.4] },
      velocityScore: { '1D': null, '1W': 31.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$20B', pe: 71.1, revenueGrowth: 18, eps: 9.08, grossMargin: 45, dividendYield: null,
      etfPresence: { AIRR: 1.87, PRN: false, RSHO: false, IDEF: 0.51, BILT: false },
      tonyNote: 'RBC Bearings Incorporated appears in 2 of 4 Industrials ETFs (50% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRCY', name: 'Mercury Systems, Inc.', easyScore: 2, avgWeight: 1.1, proScore: 0.55, coverage: 0.5,
      price: 111.76, weeklyPrices: [115.93, 112.44, 115.50, 113.91, 111.76], weeklyChange: -3.6, dayChange: -1.89, sortRank: 0, periodReturns: { '1M': 13.4, 'YTD': 53.1, '6M': 52, '1Y': 115.6 },
      priceHistory: { '1D': [113.91, 112.93, 111.79, 110.53, 111.72, 111.51, 111.47, 111.8, 112.12, 110.8, 110.17, 110.86, 111.53, 111.97, 111.64, 111.73, 111.31, 111.68, 111.78, 111.7, 111.5, 111.82, 112.07, 111.76], '1W': [115.93, 112.44, 115.5, 113.91, 111.76], '1M': [98.55, 99.32, 97.11, 108.11, 111.7, 111.28, 112.87, 111.59, 117.82, 111.27, 110.94, 108.82, 106.81, 119.32, 120.3, 115.93, 112.44, 115.5, 113.91, 111.76], 'YTD': [73.01, 88.74, 98.62, 99.48, 98.29, 77.12, 80.33, 89.86, 89.3, 89.18, 86, 81.35, 74.49, 72.91, 80.81, 84.09, 83.36, 76.53, 78.53, 91.95, 93.39, 98.55, 111.28, 110.94, 120.3, 111.76], '6M': [73.51, 73.85, 84.8, 98.62, 99.48, 98.29, 79.07, 80.33, 89.86, 89.58, 84.96, 81.44, 77.81, 76.16, 74.22, 79.6, 84.05, 77.99, 78.55, 88.06, 94.55, 96.36, 111.7, 111.27, 120.3, 111.76], '1Y': [51.83, 53.86, 52, 50.09, 51.51, 51.88, 53.56, 53.58, 66.8, 67.98, 67.66, 68.69, 74.59, 75.34, 77.4, 83.47, 76.69, 77.04, 78.55, 77.78, 74.65, 68.35, 66.67, 67.69, 71.86, 71.8, 73.51, 73.85, 84.8, 98.62, 99.48, 98.29, 79.07, 80.25, 87.63, 89.03, 84.96, 81.44, 77.81, 76.16, 74.22, 79.6, 84.05, 77.99, 78.55, 90.34, 94.55, 96.36, 111.7, 111.27, 120.3, 111.76] },
      velocityScore: { '1D': null, '1W': 17, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 12, eps: -0.23, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: 1.18, PRN: false, RSHO: false, IDEF: 1.03, BILT: false },
      tonyNote: 'Mercury Systems, Inc. appears in 2 of 4 Industrials ETFs (50% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, avgWeight: 1.06, proScore: 0.53, coverage: 0.5,
      price: 47.71, weeklyPrices: [48.27, 51.70, 52.03, 50.37, 47.71], weeklyChange: -1.16, dayChange: -5.28, sortRank: 0, periodReturns: { '1M': -25.6, 'YTD': -34.8, '6M': -39.5, '1Y': 1.2 },
      priceHistory: { '1D': [50.37, 48.7, 47.98, 46.12, 47.07, 46.65, 47, 47.52, 48.1, 47.88, 48.06, 47.9, 48.24, 48.17, 48.1, 47.97, 47.88, 48.69, 48.86, 48.57, 48.24, 48.21, 48.18, 47.71], '1W': [48.27, 51.7, 52.03, 50.37, 47.71], '1M': [64.1, 60.66, 63.52, 65.86, 57.5, 53.65, 54.65, 51.84, 54.39, 49.44, 49.64, 48.37, 45.87, 49.58, 47.83, 48.27, 51.7, 52.03, 50.37, 47.71], 'YTD': [73.17, 101.28, 108.01, 111.61, 110.93, 97.94, 79.52, 88.46, 83.44, 98.88, 104.84, 104.06, 101.84, 80.05, 87.75, 90.18, 82.06, 70.3, 65.32, 58.82, 66.21, 64.1, 53.65, 49.64, 47.83, 47.71], '6M': [78.87, 74.62, 91.72, 108.01, 111.61, 110.93, 89.78, 79.52, 88.46, 88.31, 97.14, 98.98, 105.95, 86.01, 85.83, 82.52, 83.58, 70.22, 65.73, 60.45, 66.02, 65.3, 57.5, 49.44, 47.83, 47.71], '1Y': [47.15, 50.37, 45.03, 48.31, 51.96, 51.41, 51.41, 46.7, 51.78, 53.04, 53.89, 62.51, 64.86, 68.71, 72.2, 75.2, 79.07, 78.25, 83.87, 87.04, 72.31, 58.28, 63.9, 63.83, 63.75, 67.19, 78.87, 74.62, 91.72, 108.01, 111.61, 110.93, 89.78, 78.71, 81.62, 88.11, 97.14, 98.98, 105.95, 86.01, 85.83, 82.52, 83.58, 70.22, 65.73, 60.84, 66.02, 65.3, 57.5, 49.44, 47.83, 47.71] },
      velocityScore: { '1D': null, '1W': 29.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: 207.4, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.93, PRN: false, RSHO: false, IDEF: 0.2, BILT: false },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 4 Industrials ETFs (50% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DRS', name: 'Leonardo DRS, Inc.', easyScore: 2, avgWeight: 0.57, proScore: 0.28, coverage: 0.5,
      price: 44.99, weeklyPrices: [46.68, 45.59, 46.58, 46.08, 44.99], weeklyChange: -3.62, dayChange: -2.37, sortRank: 0, periodReturns: { '1M': 0.2, 'YTD': 32, '6M': 29.4, '1Y': 0.6 },
      priceHistory: { '1D': [46.08, 44.98, 44.83, 44.35, 44.75, 44.65, 44.93, 44.99, 45.22, 45.05, 44.86, 44.81, 44.9, 44.87, 44.75, 44.71, 44.63, 44.82, 44.9, 44.84, 44.91, 44.92, 44.86, 44.99], '1W': [46.68, 45.59, 46.58, 46.08, 44.99], '1M': [44.92, 45.8, 45.35, 48.41, 48.76, 47.96, 47.39, 45.61, 46.71, 46.15, 46.55, 47.35, 46.11, 49.69, 48.53, 46.68, 45.59, 46.58, 46.08, 44.99], 'YTD': [34.09, 38.84, 41.42, 41.28, 41.3, 38.31, 37.87, 41.07, 42.36, 46.95, 46.16, 45.6, 44.06, 44.52, 47.93, 47.54, 43.2, 40.18, 40, 41.49, 42.84, 44.92, 47.96, 46.55, 48.53, 44.99], '6M': [34.77, 34.09, 37.2, 41.42, 41.28, 41.3, 37.27, 37.87, 41.07, 43.34, 45.82, 45.91, 45.48, 46.53, 46.3, 46.06, 44.57, 39.98, 40.03, 41.44, 42.86, 44.55, 48.76, 46.15, 48.53, 44.99], '1Y': [44.73, 46.48, 46.44, 47.59, 46.14, 48.2, 42.25, 41.58, 42.73, 41.03, 42.01, 40.33, 41.78, 43.1, 45.4, 44.72, 43.67, 39.91, 41.31, 36.62, 35.61, 34.28, 33.63, 33.18, 33.96, 33.12, 34.77, 34.09, 37.2, 41.42, 41.28, 41.3, 37.27, 37.77, 40.03, 43.39, 45.82, 45.91, 45.48, 46.53, 46.3, 46.06, 44.57, 39.98, 40.03, 41.36, 42.86, 44.55, 48.76, 46.15, 48.53, 44.99] },
      velocityScore: { '1D': null, '1W': 16.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 42, revenueGrowth: 6, eps: 1.07, grossMargin: 24, dividendYield: 0.78,
      etfPresence: { AIRR: 0.84, PRN: false, RSHO: false, IDEF: 0.3, BILT: false },
      tonyNote: 'Leonardo DRS, Inc. appears in 2 of 4 Industrials ETFs (50% coverage) with average weight 0.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TPC', name: 'Tutor Perini Corporation', easyScore: 2, avgWeight: 0.36, proScore: 0.18, coverage: 0.5,
      price: 81.47, weeklyPrices: [76.55, 76.19, 77.89, 77.99, 81.47], weeklyChange: 6.43, dayChange: 4.47, sortRank: 0, periodReturns: { '1M': 12, 'YTD': 21.6, '6M': 17.1, '1Y': 88.2 },
      priceHistory: { '1D': [77.99, 78.58, 78.96, 78.86, 78.9, 79.53, 79.99, 79.56, 79.86, 79.71, 80.08, 80.23, 80.79, 81.27, 81.02, 81.07, 81.38, 80.95, 80.91, 80.78, 80.9, 81.25, 81.36, 81.47], '1W': [76.55, 76.19, 77.89, 77.99, 81.47], '1M': [72.76, 74.67, 74.47, 73.27, 71.49, 74.26, 74.29, 72.26, 72.38, 70.53, 72.13, 71.48, 68.72, 73.61, 74.92, 76.55, 76.19, 77.89, 77.99, 81.47], 'YTD': [67.02, 70.17, 73.89, 76.79, 79.86, 78.83, 85.07, 84.9, 86.1, 73.71, 69.83, 71.44, 75.25, 77.19, 80.54, 86.16, 85.11, 86.87, 92.76, 82.79, 75.43, 72.76, 74.26, 72.13, 74.92, 81.47], '6M': [69.57, 67.92, 71.09, 73.89, 76.79, 79.86, 79.95, 85.07, 84.9, 89.38, 71.12, 69.2, 72.31, 76.24, 77.3, 83.35, 84.22, 86.76, 93.68, 81.96, 83.01, 74.88, 71.49, 70.53, 74.92, 81.47], '1Y': [43.3, 46.78, 47.15, 48.83, 48.51, 46.91, 46.18, 56.6, 57.44, 58.52, 59.13, 60.47, 63.88, 66.54, 65.59, 61.61, 62.26, 67.11, 68.72, 68.21, 63.97, 58.76, 64.01, 66.47, 68.59, 69.46, 69.57, 67.92, 71.09, 73.89, 76.79, 79.86, 79.95, 81.73, 86.9, 75.37, 71.12, 69.2, 72.31, 76.24, 77.3, 83.35, 84.22, 86.76, 93.68, 82.85, 83.01, 74.88, 71.49, 70.53, 74.92, 81.47] },
      velocityScore: { '1D': null, '1W': 28.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 55.8, revenueGrowth: 12, eps: 1.46, grossMargin: 12, dividendYield: 0.31,
      etfPresence: { AIRR: 0.68, PRN: false, RSHO: false, IDEF: 0.04, BILT: false },
      tonyNote: 'Tutor Perini Corporation appears in 2 of 4 Industrials ETFs (50% coverage) with average weight 0.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RTX', name: 'RTX CORP', easyScore: 1, avgWeight: 8.05, proScore: 2.01, coverage: 0.25,
      price: 181.87, weeklyPrices: [183.64, 186.77, 192.58, 185.60, 181.87], weeklyChange: -0.97, dayChange: -2.01, sortRank: 0, periodReturns: { '1M': 2.7, 'YTD': -0.8, '6M': -2.1, '1Y': 24.7 },
      priceHistory: { '1D': [185.6, 183.01, 183.2, 182.55, 182.99, 182.29, 181.9, 182.46, 182.52, 182.49, 182.46, 182.05, 182.55, 182.13, 182.32, 182.16, 181.44, 182.6, 182.61, 182.64, 182.31, 182.35, 182.23, 181.87], '1W': [183.64, 186.77, 192.58, 185.6, 181.87], '1M': [177.01, 178.97, 176.59, 178.96, 179.66, 174.41, 174.26, 172.55, 179.41, 180.99, 178.66, 181.56, 177.41, 184.21, 183.53, 183.64, 186.77, 192.58, 185.6, 181.87], 'YTD': [183.4, 187.17, 198.84, 196.34, 199.88, 196.74, 196.51, 205.41, 195.98, 208.82, 207.26, 203.33, 194, 192.9, 203.48, 202.81, 187.17, 175.68, 172.9, 178.61, 175.95, 177.01, 174.41, 178.66, 183.53, 181.87], '6M': [185.68, 184.01, 185.73, 198.84, 196.34, 199.88, 195.97, 196.51, 205.41, 197.63, 203.86, 203.04, 200.73, 192.85, 196.21, 201.56, 196.42, 174.26, 173.99, 176.78, 175.68, 175.98, 179.66, 180.99, 183.53, 181.87], '1Y': [145.81, 146.02, 144.91, 148.68, 149.17, 157.12, 157.38, 154.8, 155.5, 156.27, 158.01, 151.75, 158.58, 160.54, 167.33, 169.27, 158.85, 160.71, 179.24, 177.04, 179.03, 175.63, 173.21, 168.8, 171.93, 179.93, 185.68, 184.01, 185.73, 198.84, 196.34, 199.88, 195.97, 201.14, 204.92, 202.62, 203.86, 203.04, 200.73, 192.85, 196.21, 201.56, 196.42, 174.26, 173.99, 176.09, 175.68, 175.98, 179.66, 180.99, 183.53, 181.87] },
      velocityScore: { '1D': null, '1W': 26.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$245B', pe: 34.1, revenueGrowth: 9, eps: 5.33, grossMargin: 20, dividendYield: 1.49,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 8.05, BILT: false },
      tonyNote: 'RTX CORP appears in 1 of 4 Industrials ETFs (25% coverage) with average weight 8.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LMT', name: 'LOCKHEED MARTIN CORP', easyScore: 1, avgWeight: 6.76, proScore: 1.69, coverage: 0.25,
      price: 493.5, weeklyPrices: [530.36, 535.95, 532.32, 510.95, 493.50], weeklyChange: -6.95, dayChange: -3.42, sortRank: 0, periodReturns: { '1M': -7.5, 'YTD': 2, '6M': 2.1, '1Y': 4.5 },
      priceHistory: { '1D': [510.95, 499.48, 497.13, 494.27, 497.51, 496.43, 494.61, 495.26, 496.39, 495.03, 494.85, 493.44, 495.24, 494.71, 495.17, 494.01, 491.66, 493.29, 493.65, 493.58, 492.68, 492.73, 494.39, 493.5], '1W': [530.36, 535.95, 532.32, 510.95, 493.5], '1M': [533.24, 532.9, 531.14, 537.21, 530.45, 516.5, 513.43, 512.03, 519.05, 523.76, 520.07, 530.13, 525.02, 548.68, 540.33, 530.36, 535.95, 532.32, 510.95, 493.5], 'YTD': [483.67, 518.44, 572.7, 593.91, 622.51, 602.76, 628.7, 666.51, 647.5, 664.48, 649.47, 636.33, 610.17, 604.39, 628.5, 611.58, 571.95, 512.29, 518.15, 512.25, 528.31, 533.24, 516.5, 520.07, 540.33, 493.5], '6M': [483.57, 488, 496.87, 572.7, 593.91, 622.51, 609.18, 628.7, 666.51, 641.63, 655, 652.83, 637.51, 627.33, 622.79, 613.72, 592.19, 513.45, 512.77, 512.41, 520.41, 522.79, 530.45, 523.76, 540.33, 493.5], '1Y': [472.46, 463.14, 463.01, 470.12, 410.74, 420.13, 423.7, 426.26, 440.64, 447.72, 452.5, 457.06, 474.32, 486.67, 499.21, 511.07, 503.83, 505.9, 486.91, 487.94, 452.1, 470.78, 451.06, 441.82, 466.89, 477.06, 483.57, 488, 496.87, 572.7, 593.91, 622.51, 609.18, 637.43, 658.26, 658.08, 655, 652.83, 637.51, 627.33, 622.79, 613.72, 592.19, 513.45, 512.77, 506.51, 520.41, 522.79, 530.45, 523.76, 540.33, 493.5] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$114B', pe: 23.9, revenueGrowth: 0, eps: 20.64, grossMargin: 10, dividendYield: 2.7,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 6.76, BILT: false },
      tonyNote: 'LOCKHEED MARTIN CORP appears in 1 of 4 Industrials ETFs (25% coverage) with average weight 6.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TTMI', name: 'TTM Technologies Inc', easyScore: 1, avgWeight: 6.57, proScore: 1.64, coverage: 0.25,
      price: 221.47, weeklyPrices: [206.66, 199.58, 202.70, 216.44, 221.47], weeklyChange: 7.17, dayChange: 2.32, sortRank: 0, periodReturns: { '1M': 16.6, 'YTD': 221, '6M': 212.4, '1Y': 499.4 },
      priceHistory: { '1D': [216.44, 214.96, 212.84, 212.52, 211.9, 213.66, 216.4, 216.01, 216.3, 217.78, 220.45, 221.11, 222.28, 221.09, 221.96, 222.73, 222.4, 222.78, 223.22, 222.5, 222.31, 222.05, 222.99, 221.47], '1W': [206.66, 199.58, 202.7, 216.44, 221.47], '1M': [189.92, 196.95, 190.67, 187.79, 173.72, 172.44, 179.62, 189.6, 184.84, 167.62, 178.38, 173.86, 172.12, 187.21, 194.05, 206.66, 199.58, 202.7, 216.44, 221.47], 'YTD': [69, 66.86, 96.52, 97.53, 96.48, 96.22, 91.9, 100.39, 108.86, 105.14, 95.44, 97.54, 106.99, 97.42, 105.85, 120.74, 125.25, 137.59, 157.47, 162.99, 158.86, 189.92, 172.44, 178.38, 194.05, 221.47], '6M': [70.9, 70.42, 70.18, 96.52, 97.53, 96.48, 92.58, 91.9, 100.39, 107.56, 98.95, 90.54, 97.08, 95.93, 97.48, 121.49, 126.24, 149.01, 158.99, 153.77, 171.87, 174.55, 173.72, 167.62, 194.05, 221.47], '1Y': [36.95, 40.82, 42.63, 45.79, 45.04, 48.52, 44.83, 44.61, 41.82, 44.09, 44.96, 47.6, 50.27, 56.54, 57.6, 58.01, 55.53, 57.95, 58.9, 69.87, 69.89, 64.34, 64.94, 66.75, 76.74, 67.63, 70.9, 70.42, 70.18, 96.52, 97.53, 96.48, 92.58, 92.33, 107.93, 104.24, 98.95, 90.54, 97.08, 95.93, 97.48, 121.49, 126.24, 149.01, 158.99, 157.31, 171.87, 174.55, 173.72, 167.62, 194.05, 221.47] },
      velocityScore: { '1D': null, '1W': null, '1M': -62.2, '6M': null }, isNew: true,
      marketCap: '$23B', pe: 120.4, revenueGrowth: 30, eps: 1.84, grossMargin: 21, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 6.57, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'TTM Technologies is a printed circuit board manufacturer held in Industrials ETFs. Revenue growth tracks data center and defense electronics demand. PCB manufacturing is essential hardware infrastructure; TTM\'s position in AI server and high-frequency trading hardware gives it exposure to two durable growth verticals.',
    },
    {
      ticker: 'GD', name: 'GENERAL DYNAMICS CORP', easyScore: 1, avgWeight: 5.78, proScore: 1.45, coverage: 0.25,
      price: 343.4, weeklyPrices: [359.53, 364.11, 362.83, 350.01, 343.40], weeklyChange: -4.49, dayChange: -1.89, sortRank: 0, periodReturns: { '1M': 0.2, 'YTD': 2, '6M': -0.5, '1Y': 21.6 },
      priceHistory: { '1D': [350.01, 345.88, 345.41, 344.36, 347.39, 346.48, 344.79, 345.05, 345.07, 345.8, 346.01, 344.95, 345.72, 345.6, 344.85, 344.1, 342.25, 343.1, 343.64, 343.44, 343.08, 343.51, 344.36, 343.4], '1W': [359.53, 364.11, 362.83, 350.01, 343.4], '1M': [342.89, 344.64, 342.69, 348.96, 346.82, 339.2, 337.61, 337.04, 341.5, 346.44, 340.86, 345.68, 341.07, 358.86, 360.22, 359.53, 364.11, 362.83, 350.01, 343.4], 'YTD': [336.66, 351.44, 366, 365.83, 349.95, 353.37, 346.34, 354.34, 343.14, 366.12, 353.85, 356.29, 346.23, 343.22, 350.02, 339.88, 325.52, 313.68, 349.08, 344.03, 343.11, 342.89, 339.2, 340.86, 360.22, 343.4], '6M': [345.19, 339.47, 345.64, 366, 365.83, 349.95, 352.05, 346.34, 354.34, 350.72, 360.7, 355.23, 349.63, 355.28, 349.09, 335.15, 336.29, 313.21, 345.84, 347.76, 340.62, 338.71, 346.82, 346.44, 360.22, 343.4], '1Y': [282.32, 291.66, 296.65, 300.85, 297.6, 314.7, 312.78, 314.93, 313.58, 319.89, 324.39, 321.33, 326.4, 323.2, 341, 343.43, 334.39, 337.19, 353.77, 341.87, 349.49, 341.78, 338.13, 335.8, 334.27, 337.49, 345.19, 339.47, 345.64, 366, 365.83, 349.95, 352.05, 340.75, 351.42, 357.05, 360.7, 355.23, 349.63, 355.28, 349.09, 335.15, 336.29, 313.21, 345.84, 346.53, 340.62, 338.71, 346.82, 346.44, 360.22, 343.4] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$93B', pe: 21.6, revenueGrowth: 10, eps: 15.89, grossMargin: 15, dividendYield: 1.82,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 5.78, BILT: false },
      tonyNote: 'GENERAL DYNAMICS CORP appears in 1 of 4 Industrials ETFs (25% coverage) with average weight 5.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'UNP', name: 'UNION PACIFIC CORP', easyScore: 1, avgWeight: 5.57, proScore: 1.39, coverage: 0.25,
      price: 259.98, weeklyPrices: [267.32, 267.45, 258.05, 256.88, 259.98], weeklyChange: -2.75, dayChange: 1.21, sortRank: 0, periodReturns: { '1M': -2.2, 'YTD': 12.4, '6M': 10.8, '1Y': 15.1 },
      priceHistory: { '1D': [256.88, 259.71, 260.51, 260.67, 260.94, 261.68, 261.31, 261.36, 261.33, 261.57, 262.23, 262.18, 262.43, 262.34, 262.11, 262.22, 261.57, 261.07, 260.8, 260.51, 259.75, 259.48, 259.27, 259.98], '1W': [267.32, 267.45, 258.05, 256.88, 259.98], '1M': [265.88, 271.1, 279.39, 267, 262.64, 263.5, 264.68, 262.13, 263.9, 272.32, 268.67, 271.28, 267.03, 268.28, 272.7, 267.32, 267.45, 258.05, 256.88, 259.98], 'YTD': [231.32, 229.85, 227.14, 231.37, 233.58, 249.76, 262.81, 262.97, 264.25, 266.7, 251.11, 242.32, 239.67, 242.62, 249.11, 252.04, 251.25, 267.74, 263.41, 263.35, 275.13, 265.88, 263.5, 268.67, 272.7, 259.98], '6M': [234.61, 233.06, 224.48, 227.14, 231.37, 233.58, 251.45, 262.81, 262.97, 265.45, 260.2, 244.1, 234.18, 239.19, 244.71, 250.51, 251.14, 268.7, 266.32, 264.89, 269.34, 265.44, 262.64, 272.32, 272.7, 259.98], '1Y': [225.88, 230.08, 236.54, 231.14, 229.24, 223.77, 222.06, 219.65, 220.08, 223.32, 221.99, 216.05, 216, 227.98, 236.37, 231.86, 225.85, 227.3, 218.23, 218.82, 223.88, 221, 224.5, 232.24, 231.56, 235.88, 234.61, 233.06, 224.48, 227.14, 231.37, 233.58, 251.45, 261.77, 266.1, 264.98, 260.2, 244.1, 234.18, 239.19, 244.71, 250.51, 251.14, 268.7, 266.32, 264.65, 269.34, 265.44, 262.64, 272.32, 272.7, 259.98] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$154B', pe: 21.4, revenueGrowth: 3, eps: 12.15, grossMargin: 57, dividendYield: 2.15,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: false, BILT: 5.57 },
      tonyNote: 'UNION PACIFIC CORP appears in 1 of 4 Industrials ETFs (25% coverage) with average weight 5.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BA', name: 'BOEING', easyScore: 1, avgWeight: 5.04, proScore: 1.26, coverage: 0.25,
      price: 220.87, weeklyPrices: [228.95, 227.49, 225.63, 222.72, 220.87], weeklyChange: -3.53, dayChange: -0.83, sortRank: 0, periodReturns: { '1M': 0.8, 'YTD': 1.7, '6M': 1.9, '1Y': 9.7 },
      priceHistory: { '1D': [222.72, 221.78, 222.06, 222.1, 221.71, 220.88, 221.05, 221.19, 222.05, 221.95, 222.06, 221.77, 222.36, 221.65, 220.98, 221.01, 220.65, 221.01, 221.02, 220.66, 220.79, 221.34, 221.38, 220.87], '1W': [228.95, 227.49, 225.63, 222.72, 220.87], '1M': [219.02, 218.9, 224.3, 228.78, 231.15, 224.3, 217.7, 210.58, 217.42, 215.45, 215.92, 214.51, 209, 221.63, 219.05, 228.95, 227.49, 225.63, 222.72, 220.87], 'YTD': [217.12, 227.38, 242.61, 251.41, 234.04, 235.95, 236.26, 233.71, 230.36, 227.31, 214.1, 210.82, 196.42, 199.03, 217.8, 223.77, 219.16, 230.72, 221.3, 238.21, 220.61, 219.02, 224.3, 215.92, 219.05, 220.87], '6M': [216.84, 218.5, 228.12, 242.61, 251.41, 234.04, 236.95, 236.26, 233.71, 229.41, 222.06, 204.76, 201.18, 194.36, 208.22, 217.63, 223.38, 232.44, 227.38, 231.03, 229.21, 219.61, 231.15, 215.45, 219.05, 220.87], '1Y': [201.31, 209.53, 218.52, 230, 228.48, 226.08, 222.34, 225.96, 232.41, 226.87, 237.38, 229.52, 215.02, 216.34, 215.83, 221.82, 215.56, 216.82, 223, 204.55, 194.81, 191.81, 179.12, 205.38, 200.37, 206.71, 216.84, 218.5, 228.12, 242.61, 251.41, 234.04, 236.95, 239.35, 232.03, 227.53, 222.06, 204.76, 201.18, 194.36, 208.22, 217.63, 223.38, 232.44, 227.38, 237.36, 229.21, 219.61, 231.15, 215.45, 219.05, 220.87] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$174B', pe: 87, revenueGrowth: 14, eps: 2.54, grossMargin: 5, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 5.04, BILT: false },
      tonyNote: 'BOEING appears in 1 of 4 Industrials ETFs (25% coverage) with average weight 5.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NOC', name: 'NORTHROP GRUMMAN CORP', easyScore: 1, avgWeight: 4.81, proScore: 1.2, coverage: 0.25,
      price: 507.09, weeklyPrices: [544.73, 551.21, 550.15, 521.50, 507.09], weeklyChange: -6.91, dayChange: -2.76, sortRank: 0, periodReturns: { '1M': -8.7, 'YTD': -11.1, '6M': -13.3, '1Y': 1.5 },
      priceHistory: { '1D': [521.5, 509.01, 508.33, 505.1, 508.77, 507.62, 505.57, 507.19, 507.88, 507.7, 506.7, 505.96, 507.33, 508.61, 510.48, 508.3, 505.55, 507.44, 508.54, 508.17, 507.08, 506.66, 507.73, 507.09], '1W': [544.73, 551.21, 550.15, 521.5, 507.09], '1M': [555.58, 556.8, 551.34, 559.29, 563.68, 539.22, 536.59, 526.06, 545.17, 544.4, 540.81, 548.67, 542.14, 552.52, 550.33, 544.73, 551.21, 550.15, 521.5, 507.09], 'YTD': [570.21, 590.79, 653.14, 670.44, 695.35, 689.75, 678.83, 736.87, 703.65, 753.84, 733.18, 724.03, 682.16, 682.24, 687.47, 680.13, 611.13, 577.82, 567, 548.21, 550, 555.58, 539.22, 540.81, 550.33, 507.09], '6M': [584.66, 574.57, 577.01, 653.14, 670.44, 695.35, 696.5, 678.83, 736.87, 710.9, 740.01, 736.3, 714.15, 691.99, 702.5, 673.73, 665.26, 575.11, 568.14, 552.27, 548.65, 551.58, 563.68, 544.4, 550.33, 507.09], '1Y': [499.67, 499.98, 504.85, 516.82, 563.79, 573.22, 589.75, 580.24, 584.82, 586.74, 589.32, 571.63, 579.36, 577.08, 609.32, 621.63, 618.88, 602, 595.95, 575.41, 562.98, 563.03, 565.56, 546.97, 550.63, 568.72, 584.66, 574.57, 577.01, 653.14, 670.44, 695.35, 696.5, 695.06, 723.56, 724.38, 740.01, 736.3, 714.15, 691.99, 702.5, 673.73, 665.26, 575.11, 568.14, 549.52, 548.65, 551.58, 563.68, 544.4, 550.33, 507.09] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$72B', pe: 15.9, revenueGrowth: 4, eps: 31.92, grossMargin: 21, dividendYield: 1.8,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 4.81, BILT: false },
      tonyNote: 'NORTHROP GRUMMAN CORP appears in 1 of 4 Industrials ETFs (25% coverage) with average weight 4.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AENA', name: 'AENA SME SA', easyScore: 1, avgWeight: 4.54, proScore: 1.14, coverage: 0.25,
      price: 26.56, currency: 'EUR', weeklyPrices: [26.70, 26.76, 27.04, 26.70, 26.56], weeklyChange: -0.52, dayChange: -0.52, sortRank: 0, periodReturns: { '1M': 11.6, 'YTD': 11.5, '6M': 11.4, '1Y': 18 },
      priceHistory: { '1D': [26.7, 26.48, 26.56, 26.54, 26.5, 26.56, 26.56, 26.56, 26.56, 26.62, 26.6, 26.6, 26.62, 26.62, 26.6, 26.62, 26.7, 26.7, 26.6, 26.62, 26.66, 26.68, 26.7, 26.56], '1W': [26.7, 26.76, 27.04, 26.7, 26.56], '1M': [23.8, 24.36, 24.08, 24.54, 24.4, 24.9, 24.14, 24.06, 24.24, 24.4, 24.92, 25, 24.88, 25.18, 25.94, 26.5, 26.7, 26.76, 27.04, 26.7, 26.56], 'YTD': [23.82, 25.3, 25.13, 25.2, 25.42, 26.99, 27.52, 28.81, 27.45, 25.45, 25.47, 25.7, 24.97, 25.53, 26.98, 26.78, 26.18, 23.62, 24.1, 23.46, 22.86, 24.08, 24.06, 24.92, 26.5, 26.56], '6M': [23.84, 23.82, 25.3, 25.13, 25.6, 25.52, 27.19, 27.51, 27.06, 26.92, 25.48, 25.53, 25.24, 25.7, 26, 26.8, 26.64, 24.2, 22.78, 23.38, 22.92, 24.36, 24.14, 24.92, 26.5, 26.56], '1Y': [22.5, 22.66, 22.69, 23.5, 23.61, 23.64, 24.16, 24.71, 25.71, 25.36, 24.74, 24.48, 24.55, 23.3, 22.81, 22.69, 22.68, 23.51, 24.02, 23.68, 22.45, 22.86, 23.47, 23.45, 23.3, 23.82, 23.58, 23.83, 24.87, 24.62, 25.2, 25.42, 26.99, 27.52, 27.72, 26.93, 25.91, 25.7, 25.72, 25.7, 26, 26.8, 26.64, 24.2, 22.78, 23.38, 22.92, 24.36, 24.14, 24.92, 26.5, 26.56] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '€40B', pe: 18.4, revenueGrowth: 12, eps: 1.44, grossMargin: 80, dividendYield: 4.08,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: false, BILT: 4.54 },
      tonyNote: 'AENA SME SA appears in 1 of 4 Industrials ETFs (25% coverage) with average weight 4.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 5.47, proScore: 5.47, coverage: 1,
      price: 283.61, weeklyPrices: [260.07, 265.10, 280.91, 286.69, 283.61], weeklyChange: 9.05, dayChange: -1.07, sortRank: 0, periodReturns: { '1M': 32.1, 'YTD': 238.8, '6M': 204.2, '1Y': 497.3 },
      priceHistory: { '1D': [286.69, 284.73, 296, 288.11, 288.91, 285.08, 282.03, 280.42, 282.17, 281.45, 281.31, 279.78, 280.43, 279.47, 279.65, 280.73, 283.28, 287.2, 286.9, 283.73, 281.55, 280.6, 282.16, 283.61], '1W': [260.07, 265.1, 280.91, 286.69, 283.61], '1M': [214.77, 208.06, 208.37, 226.34, 231.09, 264.51, 260.58, 251.68, 259.67, 227.81, 218, 220.12, 211.69, 222.24, 232.36, 260.07, 265.1, 280.91, 286.69, 283.61], 'YTD': [83.71, 97.3, 101.98, 96.85, 94.91, 82.39, 88.61, 107.61, 106.12, 97.78, 112, 116.33, 114.91, 103.76, 125, 161.94, 156.55, 135.51, 176.42, 186.1, 199.86, 214.77, 264.51, 218, 232.36, 283.61], '6M': [93.23, 85.17, 96.21, 101.98, 96.85, 94.91, 73.87, 88.61, 107.61, 104.88, 95.65, 108.04, 121.52, 105.97, 108.82, 144.97, 157.14, 147.16, 154.49, 184.77, 221.15, 219.93, 231.09, 227.81, 232.36, 283.61], '1Y': [47.48, 55.33, 47.1, 53.53, 51.01, 50.4, 54.17, 70.24, 72.54, 70.02, 65.72, 95.72, 89.43, 107.8, 112.27, 117.7, 135.46, 109, 125.43, 120.47, 109.95, 85.98, 91.9, 96.45, 96.41, 80.95, 93.23, 85.17, 96.21, 101.98, 96.85, 94.91, 73.87, 89.73, 97.92, 91.19, 95.65, 108.04, 121.52, 105.97, 108.82, 144.97, 157.14, 147.16, 154.49, 177.05, 221.15, 219.93, 231.09, 227.81, 232.36, 283.61] },
      velocityScore: { '1D': null, '1W': 22.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$72B', pe: 109.9, revenueGrowth: 684, eps: 2.58, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 3.83, MEME: 6.84, RKNG: 5.75 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 3, avgWeight: 4.17, proScore: 4.17, coverage: 1,
      price: 56.87, weeklyPrices: [60.85, 59.18, 58.11, 59.96, 56.87], weeklyChange: -6.54, dayChange: -5.15, sortRank: 0, periodReturns: { '1M': 0.1, 'YTD': 50.6, '6M': 35.3, '1Y': 433.5 },
      priceHistory: { '1D': [59.96, 59.91, 60.64, 59.53, 59.3, 58.17, 58.27, 58.17, 58.25, 57.94, 57.46, 57.04, 57.13, 56.82, 56.92, 56.84, 57.12, 57.88, 58.1, 57.53, 56.95, 56.74, 56.62, 56.87], '1W': [60.85, 59.18, 58.11, 59.96, 56.87], '1M': [56.83, 59.78, 67.84, 64.05, 63.54, 65.33, 66.6, 65.48, 61.86, 54.35, 59.19, 54.02, 51.52, 56.71, 59.77, 60.85, 59.18, 58.11, 59.96, 56.87], 'YTD': [37.77, 45.68, 52.88, 52.26, 59.84, 44.94, 42.67, 43.29, 44.03, 43.84, 41.98, 42.96, 41.12, 34.28, 36.83, 47.37, 45.17, 44.44, 49.48, 55.15, 50.46, 56.83, 65.33, 59.19, 59.77, 56.87], '6M': [42.04, 38.3, 43.63, 52.88, 52.26, 59.84, 39.79, 42.67, 43.29, 44.24, 40.13, 41.37, 41.66, 37.45, 34.77, 39.32, 48.12, 50.64, 45.66, 56.85, 58.4, 58.06, 63.54, 54.35, 59.77, 56.87], '1Y': [10.66, 14.57, 16.89, 16.88, 18.59, 15.79, 16.48, 17.97, 20.7, 23.12, 29.11, 30.19, 36.45, 41.77, 46.93, 61.68, 64.14, 59.22, 64.99, 67.75, 60.17, 47.41, 48.49, 41.12, 46.84, 36.59, 42.04, 38.3, 43.63, 52.88, 52.26, 59.84, 39.79, 40.03, 39.98, 40.95, 40.13, 41.37, 41.66, 37.45, 34.77, 39.32, 48.12, 50.64, 45.66, 61.2, 58.4, 58.06, 63.54, 54.35, 59.77, 56.87] },
      velocityScore: { '1D': null, '1W': 7.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$20B', pe: 73.9, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 3.03, MEME: 6.27, RKNG: 3.22 },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 3, avgWeight: 4.07, proScore: 4.07, coverage: 1,
      price: 45.2, weeklyPrices: [46.47, 46.27, 45.57, 46.59, 45.20], weeklyChange: -2.73, dayChange: -2.98, sortRank: 0, periodReturns: { '1M': -1.5, 'YTD': 84.3, '6M': 62.7, '1Y': 358 },
      priceHistory: { '1D': [46.59, 46.04, 47.53, 46.03, 46.01, 45.29, 45.53, 46.26, 46.16, 46.08, 45.37, 45.04, 45.18, 44.97, 44.93, 45.01, 46.07, 46.59, 46.39, 46.14, 45.62, 45.63, 45.35, 45.2], '1W': [46.47, 46.27, 45.57, 46.59, 45.2], '1M': [45.87, 45.14, 48.98, 49.65, 47.28, 47.94, 47.86, 44.71, 44.15, 39.62, 40.94, 41.91, 38.92, 41.47, 42.7, 46.47, 46.27, 45.57, 46.59, 45.2], 'YTD': [24.52, 31.94, 36.1, 34.74, 38.07, 31.54, 36.6, 31.53, 29.08, 28.65, 28.52, 27.51, 26.79, 23.74, 27.79, 31.47, 31.32, 32.11, 35.63, 44.59, 39.14, 45.87, 47.94, 40.94, 42.7, 45.2], '6M': [27.78, 24.08, 29.56, 36.1, 34.74, 38.07, 27.84, 36.6, 31.53, 28.65, 28.09, 27.48, 26.7, 25.72, 24.56, 26.26, 31.53, 34.98, 33.55, 41.53, 46.71, 48.02, 47.28, 39.62, 42.7, 45.2], '1Y': [9.87, 10.07, 9.22, 9.97, 10.95, 10.12, 13.95, 14.03, 16.34, 15.95, 15.26, 15.2, 19.46, 24.67, 22.94, 27.3, 34.24, 35.9, 34.35, 32.87, 31.44, 22.93, 23.79, 28.05, 32.77, 24.24, 27.78, 24.08, 29.56, 36.1, 34.74, 38.07, 27.84, 36.17, 29.04, 27.27, 28.09, 27.48, 26.7, 25.72, 24.56, 26.26, 31.53, 34.98, 33.55, 41.25, 46.71, 48.02, 47.28, 39.62, 42.7, 45.2] },
      velocityScore: { '1D': null, '1W': 10, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.53, MEME: 5.81, RKNG: 3.87 },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 3, avgWeight: 3.85, proScore: 3.85, coverage: 1,
      price: 73.19, weeklyPrices: [87.57, 82.25, 85.43, 80.66, 73.19], weeklyChange: -16.42, dayChange: -9.26, sortRank: 0, periodReturns: { '1M': -30.9, 'YTD': 0.8, '6M': -15.4, '1Y': 45.8 },
      priceHistory: { '1D': [80.66, 76.97, 76.49, 74.02, 74.89, 74.72, 74.69, 75.74, 75.8, 74.86, 74.31, 74.18, 74.38, 73.69, 72.95, 73.61, 74, 74.28, 74.82, 74.31, 73.52, 73.83, 73.29, 73.19], '1W': [87.57, 82.25, 85.43, 80.66, 73.19], '1M': [105.86, 119.7, 129.6, 133.09, 113.41, 105.65, 118.17, 107.73, 107.29, 93.6, 92.06, 88.71, 87.32, 97.56, 82.41, 87.57, 82.25, 85.43, 80.66, 73.19], 'YTD': [72.63, 90.56, 95.22, 116.37, 122.09, 103.5, 96.92, 86.4, 82.36, 104.89, 88.21, 95.7, 86.98, 82.87, 96.46, 88.57, 80.01, 71.88, 68.43, 82.55, 86.83, 105.86, 105.65, 92.06, 82.41, 73.19], '6M': [86.48, 74.68, 85.73, 95.22, 116.37, 122.09, 93.27, 96.92, 86.4, 85.76, 93.86, 87.09, 94.09, 87.86, 92.62, 94.9, 85.53, 76.4, 70.89, 65.35, 83.01, 96.23, 113.41, 93.6, 82.41, 73.19], '1Y': [50.2, 46.73, 45.46, 51.12, 57.09, 53.09, 51.38, 45.92, 48.16, 50.01, 48.76, 36.91, 40.43, 54.8, 49.08, 74.75, 90.5, 82.81, 79.45, 71.14, 68.7, 56.6, 55, 56.89, 72.84, 68.37, 86.48, 74.68, 85.73, 95.22, 116.37, 122.09, 93.27, 82.22, 80.2, 79.19, 93.86, 87.09, 94.09, 87.86, 92.62, 94.9, 85.53, 76.4, 70.89, 75.05, 83.01, 96.23, 113.41, 93.6, 82.41, 73.19] },
      velocityScore: { '1D': null, '1W': -2.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$28B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.88, MEME: 6.38, RKNG: 2.29 },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 6.68, proScore: 4.45, coverage: 0.667,
      price: 2273.73, weeklyPrices: [2107.86, 1991.55, 1958.80, 2184.75, 2273.73], weeklyChange: 7.87, dayChange: 4.07, sortRank: 0, periodReturns: { '1M': 53.8, 'YTD': 857.8, '6M': 843.3, '1Y': 4742.9 },
      priceHistory: { '1D': [2184.75, 2254.48, 2292, 2313, 2326.05, 2307.23, 2345.99, 2313.21, 2303.7, 2300.22, 2317.66, 2308.3, 2306.66, 2305.72, 2318.85, 2325.29, 2329.94, 2317.59, 2319.02, 2312.5, 2323.31, 2292.92, 2291.82, 2273.73], '1W': [2107.86, 1991.55, 1958.8, 2184.75, 2273.73], '1M': [1478.69, 1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73], 'YTD': [237.38, 334.54, 387.81, 503.44, 539.3, 584.55, 599.34, 621.09, 632.38, 599.06, 655.43, 720.17, 702.48, 635.34, 780.9, 944.46, 903.49, 1002.35, 1255.86, 1547.56, 1333.01, 1478.69, 1761.43, 1642, 1980.1, 2273.73], '6M': [241.05, 240.22, 353.56, 387.81, 503.44, 539.3, 576.2, 599.34, 621.09, 651.9, 565.59, 618.82, 772.09, 603.17, 701.59, 851.77, 920.99, 989.9, 1187, 1339.96, 1382.72, 1542.24, 1694.98, 1559.32, 1980.1, 2273.73], '1Y': [46.95, 45.35, 46.17, 42.72, 41.36, 42.93, 42.51, 43.37, 45.52, 46.78, 51.07, 70.51, 91.55, 106.4, 112.2, 120.95, 134.61, 148.04, 176.49, 207.01, 267.95, 265.88, 226.96, 205.35, 219.46, 209.31, 241.05, 240.22, 353.56, 387.81, 503.44, 539.3, 576.2, 630.29, 649.97, 635.36, 565.59, 618.82, 772.09, 603.17, 701.59, 851.77, 920.99, 989.9, 1187, 1562.34, 1382.72, 1542.24, 1694.98, 1559.32, 1980.1, 2273.73] },
      velocityScore: { '1D': null, '1W': 10.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$337B', pe: 77.7, revenueGrowth: 251, eps: 29.28, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.48, RKNG: 6.87 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 2, avgWeight: 5.85, proScore: 3.9, coverage: 0.667,
      price: 171.23, weeklyPrices: [191.55, 170.81, 167.34, 161.85, 171.23], weeklyChange: -10.61, dayChange: 5.8, sortRank: 0, periodReturns: { '1M': -5.7, 'YTD': 391.2, '6M': 338, '1Y': 658.7 },
      priceHistory: { '1D': [161.85, 157.71, 161.18, 159.4, 158.96, 156.74, 158, 159.3, 159.17, 157.82, 158.42, 158.39, 162.54, 165.96, 169.06, 169.76, 173.73, 174.27, 176.53, 172.71, 171.49, 169.38, 170.99, 171.23], '1W': [191.55, 170.81, 167.34, 161.85, 171.23], '1M': [181.49, 177.62, 179.83, 169.02, 158.41, 185.67, 202.37, 184.07, 202.89, 177, 196.64, 162.88, 175.13, 172.78, 169.05, 191.55, 170.81, 167.34, 161.85, 171.23], 'YTD': [34.86, 33.01, 34.47, 38.15, 39.57, 39.9, 48.4, 46.98, 58.12, 99.71, 127.01, 86.33, 113.9, 84.59, 132.7, 146.39, 150.57, 137.26, 172.98, 184.9, 173.26, 181.49, 185.67, 196.64, 169.05, 171.23], '6M': [39.1, 36.02, 38.06, 34.47, 38.15, 39.57, 38.13, 48.4, 46.98, 53.69, 101.14, 106.19, 101.92, 97.42, 103.91, 150.6, 159.42, 162.17, 183.51, 157.55, 203.57, 176.81, 158.41, 177, 169.05, 171.23], '1Y': [22.57, 25.69, 26.88, 29.24, 26.35, 24.11, 22.19, 20.86, 26.13, 24.34, 23.35, 23.72, 28.93, 28.06, 25.93, 31.33, 29.1, 34.14, 37.22, 33.04, 25.42, 21.63, 22.47, 26.02, 30.38, 28.96, 39.1, 36.02, 38.06, 34.47, 38.15, 39.57, 38.13, 43.99, 51.68, 84.23, 101.14, 106.19, 101.92, 97.42, 103.91, 150.6, 159.42, 162.17, 183.51, 148.94, 203.57, 176.81, 158.41, 177, 169.05, 171.23] },
      velocityScore: { '1D': null, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$14B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 7.73, RKNG: 3.97 },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 2, avgWeight: 5.81, proScore: 3.87, coverage: 0.667,
      price: 732.62, weeklyPrices: [653.53, 681.08, 712.13, 746.23, 732.62], weeklyChange: 12.1, dayChange: -1.82, sortRank: 0, periodReturns: { '1M': 51.3, 'YTD': 325.3, '6M': 314.5, '1Y': 1113.3 },
      priceHistory: { '1D': [746.23, 745.54, 757.97, 762.41, 755.86, 748.66, 755.84, 750.11, 751.33, 748.61, 745.78, 737.38, 733.9, 729.62, 735.65, 734.53, 738.07, 737.44, 738.8, 736.34, 732.36, 731.11, 733.16, 732.62], '1W': [653.53, 681.08, 712.13, 746.23, 732.62], '1M': [484.28, 524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62], 'YTD': [172.27, 187.68, 215, 243.29, 278.41, 269.41, 273.74, 284.67, 290.95, 261.3, 268.81, 313.81, 301.05, 270.49, 338.78, 366.22, 383.81, 390.99, 442.36, 515.83, 458.68, 484.28, 546.2, 526.93, 562.93, 732.62], '6M': [176.76, 176.06, 199.88, 215, 243.29, 278.41, 260.19, 273.74, 284.67, 282.25, 259.03, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 431.52, 463.91, 489.15, 486.46, 531.21, 511.72, 562.93, 732.62], '1Y': [60.38, 63.99, 64.02, 67.53, 67.06, 70.61, 77.29, 74.64, 76.29, 79.22, 81.91, 94.54, 103.09, 110.25, 120.06, 119.93, 118.86, 121.53, 126.67, 158.02, 174.22, 162.45, 150.93, 159.99, 169.54, 174.58, 176.76, 176.06, 199.88, 215, 243.29, 278.41, 260.19, 284.1, 285.52, 279.7, 259.03, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 431.52, 480, 489.15, 486.46, 531.21, 511.72, 562.93, 732.62] },
      velocityScore: { '1D': null, '1W': 152.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$253B', pe: 43.8, revenueGrowth: 46, eps: 16.72, grossMargin: 45, dividendYield: 0.08,
      etfPresence: { BUZZ: false, MEME: 5.63, RKNG: 5.99 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 5.46, proScore: 3.64, coverage: 0.667,
      price: 345.76, weeklyPrices: [274.50, 280.88, 284.99, 328.91, 345.76], weeklyChange: 25.96, dayChange: 5.12, sortRank: 0, periodReturns: { '1M': 14.3, 'YTD': 297.9, '6M': 274.8, '1Y': 1432.6 },
      priceHistory: { '1D': [328.91, 345.48, 346.66, 342.87, 339.45, 334.39, 338.86, 341, 339.55, 337.83, 339.37, 339.02, 340.2, 338.17, 337.08, 338.77, 341.34, 341.8, 342.26, 342.05, 340.54, 340.89, 340.27, 345.76], '1W': [274.5, 280.88, 284.99, 328.91, 345.76], '1M': [302.49, 302.4, 293.8, 290.01, 285, 273.51, 302.85, 287.32, 291.37, 263.61, 253.57, 259.61, 234.23, 248.88, 260.22, 274.5, 280.88, 284.99, 328.91, 345.76], 'YTD': [86.89, 121.84, 133.46, 145.63, 156.51, 147.35, 155.54, 159, 174.77, 164.78, 159.21, 160.05, 145.88, 135.49, 146.78, 219.03, 220.91, 226.37, 288.64, 283.92, 258.71, 302.49, 273.51, 253.57, 260.22, 345.76], '6M': [92.26, 87.26, 108, 133.46, 145.63, 156.51, 136.6, 155.54, 159, 168.57, 159.99, 157.17, 166.69, 133.52, 135.63, 166.7, 207.86, 231.17, 290.52, 258.64, 303.41, 307.88, 285, 263.61, 260.22, 345.76], '1Y': [22.56, 23.92, 24.3, 25.31, 25.93, 34.75, 36.1, 37.65, 46.5, 49.35, 51.35, 55, 73.29, 77.38, 84.57, 86.06, 109.91, 109.06, 108.53, 142.37, 139.23, 107.11, 95.56, 105, 109.44, 87.61, 92.26, 87.26, 108, 133.46, 145.63, 156.51, 136.6, 139.03, 147.55, 155.67, 159.99, 157.17, 166.69, 133.52, 135.63, 166.7, 207.86, 231.17, 290.52, 261.03, 303.41, 307.88, 285, 263.61, 260.22, 345.76] },
      velocityScore: { '1D': null, '1W': 14.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$98B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.69, RKNG: 4.24 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 2, avgWeight: 5.02, proScore: 3.34, coverage: 0.667,
      price: 1211.38, weeklyPrices: [1087.99, 1020.76, 1043.19, 1133.99, 1211.38], weeklyChange: 11.34, dayChange: 6.82, sortRank: 0, periodReturns: { '1M': 61.3, 'YTD': 324.4, '6M': 338, '1Y': 892.3 },
      priceHistory: { '1D': [1133.99, 1174.3, 1188.9, 1194.12, 1185.39, 1180.89, 1188.43, 1180, 1180.41, 1183.04, 1193.68, 1191.61, 1191.95, 1192.87, 1194.31, 1197.91, 1199.98, 1197.08, 1191.48, 1188.6, 1192.2, 1189.38, 1193.95, 1211.38], '1W': [1087.99, 1020.76, 1043.19, 1133.99, 1211.38], '1M': [751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38], 'YTD': [285.41, 327.02, 333.35, 397.58, 435.79, 379.4, 410.34, 417.35, 429, 400.77, 418.69, 461.69, 395.53, 337.84, 406.73, 465.66, 449.38, 504.29, 576.45, 795.33, 681.54, 751, 1035.5, 949.28, 981.61, 1211.38], '6M': [276.59, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 410.34, 417.35, 415.56, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 646.63, 776.01, 762.1, 971, 864.01, 981.61, 1211.38], '1Y': [122.08, 123.25, 124.42, 120.11, 109.22, 111.96, 107.77, 123.72, 123.55, 116.42, 118.48, 135.24, 158.82, 166.41, 167.32, 185.69, 192.77, 206.77, 220.1, 234.7, 253.3, 241.95, 223.93, 239.49, 252.42, 232.51, 276.59, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 776.01, 762.1, 971, 864.01, 981.61, 1211.38] },
      velocityScore: { '1D': null, '1W': 7.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.4T', pe: 57.1, revenueGrowth: 196, eps: 21.21, grossMargin: 58, dividendYield: 0.05,
      etfPresence: { BUZZ: 4.32, MEME: false, RKNG: 5.71 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'LITE', name: 'LITE', easyScore: 2, avgWeight: 4.42, proScore: 2.95, coverage: 0.667,
      price: 893.93, weeklyPrices: [957.24, 875.36, 869.98, 850.00, 893.93], weeklyChange: -6.61, dayChange: 5.17, sortRank: 0, periodReturns: { '1M': -5.6, 'YTD': 142.5, '6M': 129.3, '1Y': 902.6 },
      priceHistory: { '1D': [850, 830.54, 842.49, 841.62, 840.15, 834.55, 838, 842.56, 840.33, 833.14, 839.68, 843.6, 864.96, 876, 890.78, 888.4, 896.89, 901.01, 904.26, 900.35, 895.22, 885.9, 883.22, 893.93], '1W': [957.24, 875.36, 869.98, 850, 893.93], '1M': [946.9, 910.81, 902.31, 860.62, 854.96, 905, 1029.15, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93], 'YTD': [368.59, 348.26, 331.62, 354.49, 381.44, 465.54, 574.11, 635.64, 723.39, 680.8, 672, 649.56, 801.99, 702.76, 896.02, 852.79, 836.92, 791.37, 976.18, 1053.09, 884.98, 946.9, 905, 895.4, 921.56, 893.93], '6M': [389.88, 371.18, 392.88, 331.62, 354.49, 381.44, 504.42, 574.11, 635.64, 677, 650.82, 616.09, 772.13, 688.8, 826.88, 897.3, 894.07, 881.64, 949.93, 892.58, 1001.81, 964.5, 854.96, 863.66, 921.56, 893.93], '1Y': [89.16, 95.06, 91.31, 98.14, 99.63, 109.48, 111.13, 115.03, 118.98, 123.42, 132.55, 151.73, 170.9, 163.99, 162.71, 157.15, 160.56, 161, 193.8, 199.58, 259.89, 242.07, 299.36, 302.81, 360.33, 316.15, 389.88, 371.18, 392.88, 331.62, 354.49, 381.44, 504.42, 583.46, 667.77, 700.91, 650.82, 616.09, 772.13, 688.8, 826.88, 897.3, 894.07, 881.64, 949.93, 903.8, 1001.81, 964.5, 854.96, 863.66, 921.56, 893.93] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$70B', pe: 156.8, revenueGrowth: 90, eps: 5.7, grossMargin: 41, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.68, RKNG: 3.17 },
      tonyNote: 'LITE appears in 2 of 3 Meme ETFs (67% coverage) with average weight 4.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 2, avgWeight: 3.83, proScore: 2.55, coverage: 0.667,
      price: 58.34, weeklyPrices: [61.18, 56.06, 54.69, 56.55, 58.34], weeklyChange: -4.64, dayChange: 3.17, sortRank: 0, periodReturns: { '1M': -8.3, 'YTD': 30, '6M': 8.3, '1Y': 41.8 },
      priceHistory: { '1D': [56.55, 58.19, 59.17, 57.39, 57.69, 56.96, 56.85, 57.92, 58.83, 58.45, 58.79, 59.31, 60.06, 59.75, 59.74, 60.08, 60.25, 61.18, 61.17, 60.47, 59.21, 59.04, 58.25, 58.34], '1W': [61.18, 56.06, 54.69, 56.55, 58.34], '1M': [63.64, 63.62, 65.4, 70.14, 72.07, 69.28, 71.4, 68.23, 65.66, 56.78, 62.8, 56.69, 56.63, 57.99, 57.85, 61.18, 56.06, 54.69, 56.55, 58.34], 'YTD': [44.87, 50.45, 50.88, 49.33, 43.24, 35.34, 33.61, 33.43, 33.59, 37.13, 34.27, 33.31, 32.7, 28.83, 28.99, 35.76, 46.28, 43.08, 45.75, 56.89, 49.31, 63.64, 69.28, 62.8, 57.85, 58.34], '6M': [53.86, 45.31, 49.78, 50.88, 49.33, 43.24, 30.43, 33.61, 33.43, 40.88, 36.02, 33.03, 31.9, 29.84, 29.3, 28.79, 46.09, 42.69, 46.2, 47.68, 57.47, 58.89, 72.07, 56.78, 57.85, 58.34], '1Y': [41.14, 42.97, 44.97, 41.47, 41.94, 40.53, 39.86, 44.94, 40.23, 38.68, 42.99, 44, 62.26, 75.14, 61.5, 79.23, 82.09, 59.94, 62.8, 58.4, 55.37, 47.79, 46.76, 46.93, 54.44, 49.67, 53.86, 45.31, 49.78, 50.88, 49.33, 43.24, 30.43, 31.3, 31.9, 38.37, 36.02, 33.03, 31.9, 29.84, 29.3, 28.79, 46.09, 42.69, 46.2, 49.24, 57.47, 58.89, 72.07, 56.78, 57.85, 58.34] },
      velocityScore: { '1D': null, '1W': 10.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$22B', pe: 149.6, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: 1.78, MEME: 5.88, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'RGTI', name: 'Rigetti Computing', easyScore: 2, avgWeight: 3.06, proScore: 2.04, coverage: 0.667,
      price: 21.38, weeklyPrices: [22.70, 20.64, 20.25, 21.36, 21.38], weeklyChange: -5.81, dayChange: 0.09, sortRank: 0, periodReturns: { '1M': -19.1, 'YTD': -3.5, '6M': -20.5, '1Y': 98.1 },
      priceHistory: { '1D': [21.36, 21.32, 21.68, 21.1, 21.35, 21.14, 21, 21.42, 21.69, 21.5, 21.65, 21.69, 21.97, 21.91, 21.89, 22, 22.03, 22.22, 22.2, 21.83, 21.5, 21.45, 21.16, 21.38], '1W': [22.7, 20.64, 20.25, 21.36, 21.38], '1M': [26.42, 25.07, 24.62, 27.03, 25.54, 25.63, 26.88, 24.09, 24.16, 20.68, 21.76, 19.69, 19.44, 20.63, 20.98, 22.7, 20.64, 20.25, 21.36, 21.38], 'YTD': [22.15, 25.25, 25.72, 24.96, 19.85, 17.19, 16.43, 16.6, 17.63, 17.76, 16.94, 16.22, 15.6, 14.04, 14.53, 16.87, 18.25, 16.39, 17.7, 20.51, 16.62, 26.42, 25.63, 21.76, 20.98, 21.38], '6M': [26.88, 22.41, 25.21, 25.72, 24.96, 19.85, 14.98, 16.43, 16.6, 18.64, 16.97, 16.07, 15.41, 14.41, 14.19, 14.68, 19.81, 16.61, 17.5, 18.34, 19.27, 22.04, 25.54, 20.68, 20.98, 21.38], '1Y': [10.79, 11.86, 13.38, 12.72, 15.43, 14.47, 15.76, 15.98, 16.63, 14.47, 15.52, 16.5, 20, 31.46, 29.79, 43.91, 54.91, 43.31, 40.24, 39.12, 33.08, 24.69, 26.57, 23.88, 28.22, 23.96, 26.88, 22.41, 25.21, 25.72, 24.96, 19.85, 14.98, 14.99, 15.92, 17.42, 16.97, 16.07, 15.41, 14.41, 14.19, 14.68, 19.81, 16.61, 17.5, 18.94, 19.27, 22.04, 25.54, 20.68, 20.98, 21.38] },
      velocityScore: { '1D': null, '1W': -5.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 199, eps: -0.89, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.25, RKNG: 2.88 },
      tonyNote: 'Rigetti Computing is a quantum hardware company using superconducting qubit technology. It holds a position in Meme ETFs alongside IonQ and D-Wave as part of the quantum computing basket. Revenue is minimal, the technology is earlier-stage than IonQ, and the ETF allocation is speculative. The weight score is low; this is a high-risk, long-duration positioning.',
    },
    {
      ticker: 'GOOGL', name: 'GOOGL', easyScore: 2, avgWeight: 2.15, proScore: 1.43, coverage: 0.667,
      price: 349.56, weeklyPrices: [369.35, 373.25, 363.79, 368.03, 349.56], weeklyChange: -5.36, dayChange: -5.02, sortRank: 0, periodReturns: { '1M': -8.7, 'YTD': 11.7, '6M': 12.8, '1Y': 111.6 },
      priceHistory: { '1D': [368.03, 354.14, 352.48, 350.17, 349.17, 345.38, 343.04, 343.83, 347.22, 345.24, 346.06, 345.9, 345.77, 346.48, 347.11, 347.05, 347.47, 347.74, 348.35, 347.46, 347.69, 349.44, 349.24, 349.56], '1W': [369.35, 373.25, 363.79, 368.03, 349.56], '1M': [382.97, 388.88, 388.83, 390.13, 380.34, 376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68, 369.35, 373.25, 363.79, 368.03, 349.56], 'YTD': [313, 325.44, 335.84, 330.54, 338.25, 333.04, 310.96, 302.85, 312.9, 303.13, 308.7, 310.92, 290.44, 287.56, 317.32, 332.91, 332.29, 349.78, 383.25, 388.64, 396.94, 382.97, 376.37, 363.31, 359.68, 349.56], '6M': [309.78, 313.85, 321.98, 335.84, 330.54, 338.25, 331.25, 310.96, 302.85, 307.38, 300.88, 303.55, 307.13, 280.92, 295.77, 317.24, 341.68, 344.4, 385.69, 397.99, 401.07, 387.66, 380.34, 368.53, 359.68, 349.56], '1Y': [165.19, 176.23, 174.36, 182, 191.34, 195.75, 195.04, 201, 203.5, 208.49, 211.35, 239.63, 251.16, 251.66, 243.1, 245.76, 244.15, 256.55, 269.27, 283.72, 290.1, 285.02, 318.58, 315.81, 317.08, 306.57, 309.78, 313.85, 321.98, 335.84, 330.54, 338.25, 331.25, 309, 314.98, 311.76, 300.88, 303.55, 307.13, 280.92, 295.77, 317.24, 341.68, 344.4, 385.69, 400.8, 401.07, 387.66, 380.34, 368.53, 359.68, 349.56] },
      velocityScore: { '1D': null, '1W': -5.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.3T', pe: 26.7, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { BUZZ: 1.54, MEME: false, RKNG: 2.76 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'RDW', name: 'Redwire', easyScore: 1, avgWeight: 6.82, proScore: 2.27, coverage: 0.333,
      price: 13.01, weeklyPrices: [14.83, 13.50, 14.36, 14.35, 13.01], weeklyChange: -12.27, dayChange: -9.34, sortRank: 0, periodReturns: { '1M': -25.6, 'YTD': 71.2, '6M': 52.7, '1Y': -15.3 },
      priceHistory: { '1D': [14.35, 13.36, 13.23, 12.63, 12.77, 12.76, 12.86, 13.14, 13.19, 13.06, 13.11, 13.06, 13.19, 13.09, 13.02, 13.03, 13.1, 13.27, 13.28, 13.26, 13.12, 13.14, 13.18, 13.01], '1W': [14.83, 13.5, 14.36, 14.35, 13.01], '1M': [17.49, 22.04, 24, 25.9, 24.57, 20.68, 20.58, 18.62, 21.43, 18.45, 18.57, 15.75, 14.87, 17.09, 15.12, 14.83, 13.5, 14.36, 14.35, 13.01], 'YTD': [7.6, 10.28, 11.02, 11.98, 12.81, 10.03, 9.01, 8.6, 8.62, 9.28, 9.46, 10.13, 9.05, 8.5, 9.61, 9.81, 10.31, 9.04, 8.64, 12.16, 13.96, 17.49, 20.68, 18.57, 15.12, 13.01], '6M': [8.52, 7.94, 9.83, 11.02, 11.98, 12.81, 8.8, 9.01, 8.6, 9.55, 9.07, 9.48, 9.63, 8.87, 9.73, 9.29, 10.34, 9.68, 9.34, 9.2, 13.99, 15.35, 24.57, 18.45, 15.12, 13.01], '1Y': [15.36, 16.3, 15.15, 16.98, 16.36, 14.46, 14.77, 8.82, 9.04, 8.94, 8.92, 8.16, 9, 9.22, 8.99, 10.97, 9.06, 8.25, 8.24, 7.37, 6.17, 5.47, 5.39, 5.22, 7.29, 6.59, 8.52, 7.94, 9.83, 11.02, 11.98, 12.81, 8.8, 7.89, 7.99, 9.07, 9.07, 9.48, 9.63, 8.87, 9.73, 9.29, 10.34, 9.68, 9.34, 11.07, 13.99, 15.35, 24.57, 18.45, 15.12, 13.01] },
      velocityScore: { '1D': null, '1W': 8.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3B', pe: null, revenueGrowth: 58, eps: -2.59, grossMargin: 13, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.82, RKNG: false },
      tonyNote: 'Redwire Corp is a space infrastructure company — solar arrays, structures, and manufacturing in orbit. It appears in Meme and speculative ETFs as a high-risk space economy play. Revenue is growing from a small base but the business is pre-profitability; the ETF weight is minimal and reflects thematic positioning rather than fundamental conviction.',
    },
    {
      ticker: 'QBTS', name: 'D-Wave Quantum', easyScore: 1, avgWeight: 5.7, proScore: 1.9, coverage: 0.333,
      price: 24.44, weeklyPrices: [26.26, 23.94, 22.92, 24.69, 24.44], weeklyChange: -6.93, dayChange: -1.01, sortRank: 0, periodReturns: { '1M': -16.9, 'YTD': -6.5, '6M': -24.1, '1Y': 63.6 },
      priceHistory: { '1D': [24.69, 24.6, 24.69, 23.87, 24.13, 23.74, 23.78, 24.11, 24.66, 24.69, 24.78, 24.67, 25.01, 24.75, 24.98, 24.97, 25.07, 25.42, 25.49, 25.05, 24.49, 24.44, 24.19, 24.44], '1W': [26.26, 23.94, 22.92, 24.69, 24.44], '1M': [29.4, 27.82, 27.48, 29.49, 30.14, 29.18, 29.91, 27.55, 27.64, 23.85, 25.83, 23.52, 23.25, 23.82, 23.37, 26.26, 23.94, 22.92, 24.69, 24.44], 'YTD': [26.15, 29.28, 30.15, 27.43, 23.22, 20.11, 19.64, 19.38, 19.65, 18.91, 18.91, 17.47, 15.93, 14.43, 14.57, 16.97, 20.36, 18.11, 20.92, 24.03, 19.06, 29.4, 29.18, 25.83, 23.37, 24.44], '6M': [32.19, 26.25, 30.2, 30.15, 27.43, 23.22, 17.21, 19.64, 19.38, 20.14, 18.83, 17.83, 16.1, 14.65, 14.32, 14.25, 21.69, 18.49, 20.49, 21.99, 22.13, 25.74, 30.14, 23.85, 23.37, 24.44], '1Y': [14.94, 14.64, 15.99, 16.15, 17.59, 17.67, 17.18, 17.37, 16.56, 15.02, 15.85, 16.15, 18.98, 27.52, 24.71, 35.72, 40.62, 34.4, 35.04, 33.09, 29.37, 22.83, 23.11, 22.5, 28.33, 25.52, 32.19, 26.25, 30.2, 30.15, 27.43, 23.22, 17.21, 18.82, 18.06, 18.78, 18.83, 17.83, 16.1, 14.65, 14.32, 14.25, 21.69, 18.49, 20.49, 22.57, 22.13, 25.74, 30.14, 23.85, 23.37, 24.44] },
      velocityScore: { '1D': null, '1W': 11.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: -81, eps: -1.14, grossMargin: 66, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.7, RKNG: false },
      tonyNote: 'D-Wave Quantum is a quantum computing company — the only publicly traded business built around quantum annealing hardware. Revenue is minimal and profitability is many years away, but it holds a position in Meme ETFs as the purest-play quantum computing stock available to retail investors. The ETF weight is small and the position is purely thematic.',
    },
    {
      ticker: 'NVTS', name: 'Navitas Semiconductor', easyScore: 1, avgWeight: 5.08, proScore: 1.69, coverage: 0.333,
      price: 23.7, weeklyPrices: [23.73, 22.09, 22.34, 24.02, 23.70], weeklyChange: -0.13, dayChange: -1.33, sortRank: 0, periodReturns: { '1M': -19, 'YTD': 231.9, '6M': 200, '1Y': 263.5 },
      priceHistory: { '1D': [24.02, 24.03, 24.25, 23.9, 23.46, 23.27, 23.35, 23.63, 23.86, 24.03, 23.77, 23.62, 23.57, 23.46, 23.56, 23.64, 23.79, 23.9, 23.85, 23.72, 23.54, 23.64, 23.58, 23.7], '1W': [23.73, 22.09, 22.34, 24.02, 23.7], '1M': [29.25, 31.79, 28.88, 28.51, 26.6, 24.86, 25.86, 30.84, 30.67, 25.08, 24.48, 22.85, 20.5, 22.21, 23.39, 23.73, 22.09, 22.34, 24.02, 23.7], 'YTD': [7.14, 10.06, 10.04, 11.29, 9.46, 8.2, 8.76, 8.08, 9.88, 9.22, 10.84, 9.82, 9.28, 8.77, 9.55, 9.87, 15.33, 15.12, 15.92, 22.65, 19.67, 29.25, 24.86, 24.48, 23.39, 23.7], '6M': [7.9, 7.24, 10.31, 10.04, 11.29, 9.46, 7.43, 8.76, 8.08, 9.51, 8.96, 9.98, 9.17, 9.02, 8.8, 9.54, 12.32, 17.28, 17.45, 15.79, 22.32, 24.38, 26.6, 25.08, 23.39, 23.7], '1Y': [6.52, 6.55, 6.58, 6.23, 8.62, 7.52, 8.05, 6.6, 6.77, 6.2, 5.76, 5.76, 5.89, 6.88, 7.22, 7.78, 9.97, 17.1, 13.91, 12.25, 9.6, 7.73, 8.29, 8.32, 9.17, 7.83, 7.9, 7.24, 10.31, 10.04, 11.29, 9.46, 7.43, 8.37, 7.88, 9, 8.96, 9.98, 9.17, 9.02, 8.8, 9.54, 12.32, 17.28, 17.45, 18.2, 22.32, 24.38, 26.6, 25.08, 23.39, 23.7] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 5.08 },
      tonyNote: 'Navitas Semiconductor is a small-cap wide-bandgap power semiconductor name — gallium nitride and silicon carbide for fast charging and EV applications. The $26.60 share price and small market cap position it as a speculative holding in ETFs willing to take higher-risk bets on next-generation power conversion.',
    },
    {
      ticker: 'CRDO', name: 'CRDO', easyScore: 1, avgWeight: 4.9, proScore: 1.63, coverage: 0.333,
      price: 302.52, weeklyPrices: [259.41, 239.18, 249.33, 271.83, 302.52], weeklyChange: 16.62, dayChange: 11.29, sortRank: 0, periodReturns: { '1M': 38.5, 'YTD': 110.2, '6M': 101.8, '1Y': 257.7 },
      priceHistory: { '1D': [271.83, 301.83, 302.17, 301.51, 302.23, 296.88, 301.59, 302.22, 296.36, 292, 293.73, 293.06, 295.23, 295.37, 296.49, 298.43, 303.35, 303.22, 303.18, 301.04, 300.74, 299.65, 301.23, 302.52], '1W': [259.41, 239.18, 249.33, 271.83, 302.52], '1M': [218.41, 221.64, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 217.5, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83, 302.52], 'YTD': [143.89, 141.59, 156.84, 135.1, 129.47, 96.95, 128.4, 130.66, 123.46, 102.54, 115.91, 104.06, 100.3, 93.87, 110.21, 159.52, 183.32, 165.92, 180.06, 210.22, 156.27, 218.41, 226.1, 222.27, 250.81, 302.52], '6M': [149.94, 144.92, 141, 156.84, 135.1, 129.47, 98.06, 128.4, 130.66, 114.48, 114.74, 111.57, 107.09, 96.44, 101.45, 119.59, 160.69, 195.04, 184.38, 188.29, 184.54, 193.39, 236.03, 206.89, 250.81, 302.52], '1Y': [84.57, 92.59, 93.36, 102.59, 92.93, 109.38, 114.7, 118.57, 118.74, 115.41, 124.27, 149.03, 164.42, 162.26, 145.61, 137.2, 149.9, 151.66, 154.96, 180.64, 170.16, 145.58, 150.85, 188.44, 170.29, 140.34, 149.94, 144.92, 141, 156.84, 135.1, 129.47, 98.06, 121.78, 124.06, 112.27, 114.74, 111.57, 107.09, 96.44, 101.45, 119.59, 160.69, 195.04, 184.38, 188.51, 184.54, 193.39, 236.03, 206.89, 250.81, 302.52] },
      velocityScore: { '1D': null, '1W': -44.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$56B', pe: 121, revenueGrowth: 157, eps: 2.5, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.9 },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'AXTI', name: 'AXT Inc', easyScore: 1, avgWeight: 4.44, proScore: 1.48, coverage: 0.333,
      price: 92.44, weeklyPrices: [110.74, 93.04, 92.11, 84.57, 92.44], weeklyChange: -16.53, dayChange: 9.31, sortRank: 0, periodReturns: { '1M': -34.4, 'YTD': 465.4, '6M': 507.4, '1Y': 4869.9 },
      priceHistory: { '1D': [84.57, 86.61, 88.71, 87.54, 86.19, 84.56, 85.87, 86.44, 87.4, 87.57, 88.48, 88.92, 90.61, 90.47, 91.28, 91.15, 92.99, 93.57, 95.46, 93.84, 92.15, 91.93, 92.5, 92.44], '1W': [110.74, 93.04, 92.11, 84.57, 92.44], '1M': [140.83, 132.6, 122.77, 115.7, 103.16, 109.55, 110.85, 106.7, 105.99, 89.04, 90.78, 78.36, 85.29, 88.34, 97.18, 110.74, 93.04, 92.11, 84.57, 92.44], 'YTD': [16.35, 25.83, 22.1, 17.92, 16.38, 18.75, 26.8, 23.81, 40.97, 39.13, 47.36, 44.36, 68.44, 56.98, 53.18, 67.3, 74.97, 68.71, 106, 125.81, 105.88, 140.83, 109.55, 90.78, 97.18, 92.44], '6M': [15.22, 15.8, 24.11, 22.1, 17.92, 16.38, 20.43, 26.8, 23.81, 37.12, 38.8, 46.73, 58.09, 58.51, 52.84, 64.18, 82.56, 76.16, 96, 108.42, 114.98, 121.02, 103.16, 89.04, 97.18, 92.44], '1Y': [1.86, 2.09, 2.37, 2.36, 2.35, 2.29, 2.11, 2.18, 2.07, 2.84, 3.28, 3.04, 4.01, 4.8, 4.49, 5.31, 4.6, 4.91, 6.19, 8.46, 10.44, 10.25, 9.34, 11.76, 14.96, 13, 15.22, 15.8, 24.11, 22.1, 17.92, 16.38, 20.43, 24.79, 29.68, 37.9, 38.8, 46.73, 58.09, 58.51, 52.84, 64.18, 82.56, 76.16, 96, 116.36, 114.98, 121.02, 103.16, 89.04, 97.18, 92.44] },
      velocityScore: { '1D': null, '1W': 2.1, '1M': null, '6M': null }, isNew: true,
      marketCap: '$6B', pe: null, revenueGrowth: 39, eps: -0.32, grossMargin: 21, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.44, RKNG: false },
      tonyNote: 'AXT Inc is a compound semiconductor substrate manufacturer — gallium arsenide, indium phosphide, and germanium wafers used in data center optical transceivers, 5G RF chips, and solar cells. Revenue is growing with optical networking demand. Small market cap but positioned at a genuine supply-chain chokepoint for III-V semiconductor materials.',
    },
    {
      ticker: 'WULF', name: 'WULF', easyScore: 1, avgWeight: 4.37, proScore: 1.46, coverage: 0.333,
      price: 28.31, weeklyPrices: [28.17, 28.01, 27.86, 28.98, 28.31], weeklyChange: 0.5, dayChange: -2.31, sortRank: 0, periodReturns: { '1M': 24.1, 'YTD': 146.4, '6M': 127, '1Y': 693 },
      priceHistory: { '1D': [28.98, 29.12, 29.21, 29.17, 28.94, 28.53, 28.35, 28.66, 28.56, 28.51, 28.33, 28.28, 28.33, 28.15, 28.25, 28.27, 28.44, 28.67, 28.75, 28.55, 28.53, 28.33, 28.19, 28.31], '1W': [28.17, 28.01, 27.86, 28.98, 28.31], '1M': [22.82, 25.18, 26.74, 26.4, 25.56, 25.66, 26.49, 26.16, 26.19, 24, 25.86, 25.3, 23.19, 25.35, 26.06, 28.17, 28.01, 27.86, 28.98, 28.31], 'YTD': [11.49, 12.84, 14.21, 12.89, 14.54, 13.88, 16.03, 15.47, 17.92, 15.37, 15.22, 16.04, 16.22, 14.43, 18.05, 20.95, 19.77, 20.8, 22.29, 23.37, 21.14, 22.82, 25.66, 25.86, 26.06, 28.31], '6M': [12.47, 11.15, 12.49, 14.21, 12.89, 14.54, 11.92, 16.03, 15.47, 17.88, 15.23, 14.67, 15.74, 15.35, 14.88, 18.87, 20.64, 20.01, 21.31, 24.02, 24.17, 22.92, 25.56, 24, 26.06, 28.31], '1Y': [3.57, 4.38, 4.82, 4.87, 5.26, 5.22, 4.89, 5.4, 9.38, 8.93, 9.63, 10.3, 10.94, 11.24, 11.42, 12.1, 14, 13.85, 13.64, 16.1, 14.3, 11.05, 12.63, 14.22, 15.59, 12.99, 12.47, 11.15, 12.49, 14.21, 12.89, 14.54, 11.92, 15.91, 15.01, 16.22, 15.23, 14.67, 15.74, 15.35, 14.88, 18.87, 20.64, 20.01, 21.31, 23.39, 24.17, 22.92, 25.56, 24, 26.06, 28.31] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$14B', pe: null, revenueGrowth: -1, eps: -2.51, grossMargin: 64, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.37 },
      tonyNote: 'WULF appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LRCX', name: 'LRCX', easyScore: 1, avgWeight: 4.04, proScore: 1.35, coverage: 0.333,
      price: 409.54, weeklyPrices: [388.92, 369.34, 374.18, 389.04, 409.54], weeklyChange: 5.3, dayChange: 5.27, sortRank: 0, periodReturns: { '1M': 34.1, 'YTD': 139.2, '6M': 133.7, '1Y': 347 },
      priceHistory: { '1D': [389.04, 394.41, 398.34, 400.24, 394.23, 392.74, 394.58, 394.34, 396.25, 393.26, 397.06, 396.67, 398.11, 396.3, 397.77, 398.2, 396.63, 397.1, 395.63, 396.01, 395.73, 396.59, 400.54, 409.54], '1W': [388.92, 369.34, 374.18, 389.04, 409.54], '1M': [305.35, 322.68, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04, 409.54], 'YTD': [171.18, 200.96, 208.79, 220.7, 248.17, 209.78, 235.12, 237.39, 249.48, 222.99, 218.87, 226.47, 238.84, 213.66, 246.49, 272.41, 258.37, 251.23, 258.57, 296.05, 277.96, 305.35, 317.12, 324.45, 366.81, 409.54], '6M': [175.26, 173.78, 203.08, 208.79, 220.7, 248.17, 213.31, 235.12, 237.39, 239.07, 214.68, 209.49, 233.99, 211.62, 218.44, 263.66, 267.6, 267.78, 256.72, 286.52, 299.15, 302.24, 318.18, 303.28, 366.81, 409.54], '1Y': [91.61, 97.34, 99.83, 101.07, 97.69, 98.94, 98.41, 102, 98.88, 101.28, 97.03, 105.57, 120.47, 131.93, 133.9, 140.35, 137.81, 144.05, 156.9, 161.24, 166.37, 147.46, 150.38, 158.19, 165.81, 163.26, 175.26, 173.78, 203.08, 208.79, 220.7, 248.17, 213.31, 231.29, 244.92, 233.89, 214.68, 209.49, 233.99, 211.62, 218.44, 263.66, 267.6, 267.78, 256.72, 294.05, 299.15, 302.24, 318.18, 303.28, 366.81, 409.54] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$512B', pe: 77.4, revenueGrowth: 24, eps: 5.29, grossMargin: 50, dividendYield: 0.27,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.04 },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
