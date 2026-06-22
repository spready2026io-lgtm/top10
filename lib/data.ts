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
export const SPY_RET: Record<Period, number> = { '1W': 0.7, '1M': 1.1, 'YTD': 9.5, '6M': 10.4, '1Y': 25.7 };
// @@END_GENERATED:SPY_RET@@

// Top holdings per ETF (ticker + portfolio weight %), shown on ETF row hover.
export type EtfHolding = { t: string; w: number };

// @@GENERATED:ETF_TOP_HOLDINGS@@
export const ETF_TOP_HOLDINGS: Record<string, EtfHolding[]> = {
  AIS: [{ t: 'MU', w: 7.0 }, { t: 'AMD', w: 4.6 }, { t: 'MRVL', w: 4.3 }, { t: 'VRT', w: 3.6 }, { t: 'SIMO', w: 3.5 }],
  ARTY: [{ t: 'MU', w: 5.1 }, { t: 'CRWV', w: 4.9 }, { t: 'AMD', w: 4.7 }, { t: 'MRVL', w: 4.5 }, { t: 'AVGO', w: 4.4 }],
  BAI: [{ t: 'MU', w: 6.4 }, { t: 'AMD', w: 4.7 }, { t: 'LRCX', w: 4.6 }, { t: 'TSM', w: 4.3 }, { t: 'AVGO', w: 4.3 }],
  IGPT: [{ t: 'MU', w: 13.0 }, { t: 'INTC', w: 7.4 }, { t: 'AMD', w: 7.1 }, { t: 'GOOGL', w: 5.6 }, { t: 'NVDA', w: 5.3 }],
  IVES: [{ t: 'MU', w: 6.8 }, { t: 'TSM', w: 5.3 }, { t: 'AMD', w: 5.2 }, { t: 'NVDA', w: 4.7 }, { t: 'AAPL', w: 4.7 }],
  ALAI: [{ t: 'NVDA', w: 12.7 }, { t: 'TSM', w: 5.7 }, { t: 'AMZN', w: 5.5 }, { t: 'GOOG', w: 4.8 }, { t: 'MSFT', w: 4.8 }],
  CHAT: [{ t: 'NVDA', w: 6.4 }, { t: 'GOOGL', w: 5.1 }, { t: 'AVGO', w: 4.1 }, { t: 'MU', w: 4.1 }, { t: 'AMD', w: 3.9 }],
  AIFD: [{ t: 'MU', w: 7.1 }, { t: 'MRVL', w: 6.5 }, { t: 'NVDA', w: 6.4 }, { t: 'DOCN', w: 5.7 }, { t: 'LITE', w: 5.6 }],
  SPRX: [{ t: 'ARM', w: 9.0 }, { t: 'ALAB', w: 8.5 }, { t: 'COHR', w: 8.3 }, { t: 'KLAC', w: 7.6 }, { t: 'MKSI', w: 6.2 }],
  AOTG: [{ t: 'AMD', w: 16.2 }, { t: 'MU', w: 11.2 }, { t: 'NVDA', w: 10.5 }, { t: 'TSM', w: 7.5 }, { t: 'TOST', w: 4.4 }],
  SOXX: [{ t: 'MU', w: 8.4 }, { t: 'AMD', w: 7.5 }, { t: 'NVDA', w: 7.2 }, { t: 'AVGO', w: 6.6 }, { t: 'INTC', w: 6.1 }],
  PSI: [{ t: 'AMAT', w: 6.2 }, { t: 'KLAC', w: 5.9 }, { t: 'MU', w: 5.8 }, { t: 'LRCX', w: 5.5 }, { t: 'INTC', w: 4.9 }],
  XSD: [{ t: 'MXL', w: 5.7 }, { t: 'MRVL', w: 4.9 }, { t: 'ALAB', w: 4.6 }, { t: 'INTC', w: 3.9 }, { t: 'AMD', w: 3.8 }],
  DRAM: [{ t: 'SNDK', w: 5.5 }, { t: 'WDC', w: 4.4 }, { t: 'STX', w: 4.3 }, { t: 'MU', w: 3.7 }],
  PTF: [{ t: 'SNDK', w: 9.2 }, { t: 'WDC', w: 6.1 }, { t: 'STX', w: 5.3 }, { t: 'MU', w: 5.2 }, { t: 'NVDA', w: 4.2 }],
  WCLD: [{ t: 'DOCN', w: 3.9 }, { t: 'FROG', w: 3.2 }, { t: 'PANW', w: 2.8 }, { t: 'CRWD', w: 2.5 }, { t: 'TWLO', w: 2.4 }],
  IGV: [{ t: 'PANW', w: 8.9 }, { t: 'PLTR', w: 8.6 }, { t: 'MSFT', w: 8.3 }, { t: 'ORCL', w: 8.0 }, { t: 'CRWD', w: 6.6 }],
  FDTX: [{ t: 'MU', w: 9.4 }, { t: 'MRVL', w: 8.1 }, { t: 'TSM', w: 6.0 }, { t: 'NVDA', w: 4.6 }, { t: 'STX', w: 4.0 }],
  GTEK: [{ t: 'MRVL', w: 4.8 }, { t: 'DELL', w: 2.9 }, { t: 'CDNS', w: 2.4 }, { t: 'APH', w: 2.3 }, { t: 'TER', w: 2.0 }],
  ARKK: [{ t: 'TSLA', w: 9.5 }, { t: 'HOOD', w: 4.9 }, { t: 'CRSP', w: 4.9 }, { t: 'TEM', w: 4.8 }, { t: 'SPCX', w: 4.7 }],
  MARS: [{ t: 'SPCX', w: 24.1 }, { t: 'RKLB', w: 10.5 }, { t: 'ASTS', w: 7.1 }, { t: 'PL', w: 4.2 }, { t: 'GSAT', w: 4.2 }],
  FRWD: [{ t: 'STX', w: 8.6 }, { t: 'NVDA', w: 8.2 }, { t: 'AMD', w: 7.1 }, { t: 'TSM', w: 5.9 }, { t: 'WDC', w: 5.9 }],
  BCTK: [{ t: 'SPCX', w: 9.7 }, { t: 'TSM', w: 8.4 }, { t: 'LRCX', w: 7.7 }, { t: 'AVGO', w: 6.8 }, { t: 'NVDA', w: 5.8 }],
  FWD: [{ t: 'SPCX', w: 2.1 }, { t: 'AMD', w: 2.1 }, { t: 'AMAT', w: 2.0 }, { t: 'GOOGL', w: 2.0 }, { t: 'LRCX', w: 1.9 }],
  CBSE: [{ t: 'BFLY', w: 3.9 }, { t: 'LRCX', w: 3.0 }, { t: 'TXG', w: 3.0 }, { t: 'KLAC', w: 2.9 }, { t: 'KRYS', w: 2.9 }],
  FCUS: [{ t: 'WDC', w: 5.4 }, { t: 'STX', w: 5.0 }, { t: 'SNDK', w: 4.9 }, { t: 'INTC', w: 4.8 }, { t: 'DELL', w: 4.5 }],
  WGMI: [{ t: 'CIFR', w: 18.0 }, { t: 'IREN', w: 12.0 }, { t: 'WULF', w: 9.7 }, { t: 'CORZ', w: 7.3 }, { t: 'KEEL', w: 7.3 }],
  CNEQ: [{ t: 'NVDA', w: 13.5 }, { t: 'MSFT', w: 6.2 }, { t: 'WDC', w: 6.2 }, { t: 'TSM', w: 5.8 }, { t: 'AMZN', w: 5.8 }],
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
  RSHO: [{ t: 'TKR', w: 8.8 }, { t: 'POWL', w: 7.5 }, { t: 'CGNX', w: 7.2 }, { t: 'CAT', w: 6.9 }, { t: 'GTES', w: 5.6 }],
  IDEF: [{ t: 'RTX', w: 8.1 }, { t: 'LMT', w: 6.8 }, { t: 'GD', w: 5.8 }, { t: 'BA', w: 5.0 }, { t: 'NOC', w: 4.8 }],
  BILT: [{ t: 'UNP', w: 5.6 }, { t: 'AENA', w: 4.6 }, { t: 'AEP', w: 4.3 }, { t: 'XEL', w: 3.9 }, { t: 'LNG', w: 3.5 }],
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
  'AI & ML':         { '1W': 7.1, '1M': 17.6, 'YTD': 56.5, '6M': 61.2, '1Y': 102.7 },
  'Semiconductors':  { '1W': 9.1, '1M': 32.1, 'YTD': 128.1, '6M': 131.2, '1Y': 184.5 },
  'Broad Tech':      { '1W': 3.8, '1M': 10, 'YTD': 34.3, '6M': 35.8, '1Y': 61.9 },
  'Electrification': { '1W': 3.5, '1M': 3.9, 'YTD': 34.8, '6M': 35.1, '1Y': 63.5 },
  'Industrials':     { '1W': 0.8, '1M': 4.8, 'YTD': 26.2, '6M': 27.2, '1Y': 46.5 },
  'Meme':            { '1W': 5.7, '1M': 11.8, 'YTD': 33.5, '6M': 36, '1Y': 18.2 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, IndexChartByPeriod> = {
  'AI & ML': {
    '1D': { top10: [100, 103.03, 103.15, 103.44, 103.8, 103.87, 104.16, 103.96, 103.68, 103.91, 103.93, 104.12, 103.98, 104.09, 104.14, 104.27, 104.24, 104.22, 104.07, 104.02, 104, 104.25, 104.62, 104.38], spy: [100, 100.67, 100.79, 100.96, 101.01, 101.03, 100.96, 100.86, 100.78, 100.93, 100.96, 101.1, 101, 101.15, 101.15, 101.11, 101.03, 101.02, 100.97, 101.03, 100.87, 100.94, 101.07, 101.04], top10Return: 4.3, spyReturn: 1.04, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 105.24, 102.14, 102.65, 107.06], spy: [100, 101.76, 101.16, 99.89, 100.67], top10Return: 7.1, spyReturn: 0.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.27, 102.45, 104.91, 105.89, 109.95, 111.95, 112.93, 116.25, 118.45, 117.34, 115.52, 105.59, 108.96, 106.78, 109.04, 109.8, 115.56, 112.11, 112.71, 117.61], spy: [100, 99.33, 100.35, 100.55, 100.95, 101.6, 102.16, 102.41, 102.69, 102.83, 102.11, 102.5, 99.85, 100.08, 99.78, 99.88, 100.42, 102.19, 101.58, 100.31, 101.1], top10Return: 17.6, spyReturn: 1.1, xLabels: ["May 24", "May 31", "Jun 7", "Jun 14", "Jun 21"] },
    'YTD': { top10: [100, 102.26, 103.69, 105.17, 107.24, 98.89, 104.07, 103.25, 105.93, 102.14, 102.27, 103.44, 100.88, 92.02, 101.19, 113.76, 117.96, 122.69, 125.68, 135.27, 134.83, 138.81, 149.56, 139.71, 144.72, 156.53], spy: [100, 101.11, 101.24, 101.04, 101.78, 100.63, 101.47, 100.64, 101.65, 100.47, 99.3, 98.37, 95.79, 92.68, 96.67, 101.84, 103.93, 104.88, 105.29, 108.17, 108.4, 108.92, 110.93, 108.16, 108.19, 109.51], top10Return: 56.5, spyReturn: 9.5, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 104.56, 105.86, 107.9, 105.33, 110.35, 106.57, 106.95, 106.18, 108.95, 105.05, 106.18, 105.63, 103.76, 99.79, 109.35, 117.72, 124.83, 123.92, 137.25, 142.28, 139.42, 152.76, 157.74, 148.98, 161.16], spy: [100, 102.05, 101.66, 102.76, 100.16, 102.81, 101.93, 102.31, 101.45, 102.47, 101.28, 99.98, 97.78, 96.56, 96.14, 99.93, 103.47, 105.14, 105.19, 108.48, 109.73, 109.58, 111.55, 111.92, 109.06, 110.39], top10Return: 61.2, spyReturn: 10.4, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 105.61, 105.66, 106.42, 109.93, 112.24, 109.73, 113.97, 114.66, 112.85, 114.19, 117.39, 123.73, 128.1, 125.88, 131.63, 127.62, 130.02, 134.28, 138.46, 131.28, 127.34, 120.06, 128.75, 132.8, 125.95, 128.56, 129.93, 134.31, 134.98, 133.78, 139.92, 127.34, 134.1, 133.12, 134.69, 131.65, 133.06, 132.39, 131.66, 128.08, 137.55, 149.33, 154.21, 158.72, 168.58, 178.7, 175.08, 192.02, 198.3, 187.31, 202.73], spy: [100, 103.47, 104.44, 105.14, 105.8, 107.18, 104.62, 107.22, 108.27, 108.59, 108.54, 109.18, 111.21, 112.21, 111.68, 113.01, 109.88, 111.8, 113.96, 114.77, 112.9, 113.07, 110.9, 114.47, 115.03, 114.55, 114.52, 115.75, 116.41, 116.74, 115.33, 117.02, 115.47, 116.44, 115.18, 115.99, 115.29, 113.81, 111.3, 110.52, 110.26, 114.41, 118.07, 119.21, 120.93, 123.1, 124.91, 124.73, 126.98, 127.4, 124.14, 125.65], top10Return: 102.7, spyReturn: 25.7, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Semiconductors': {
    '1D': { top10: [100, 105.41, 106.05, 106.53, 106.86, 107.13, 107.32, 107, 106.64, 107.09, 107.12, 107.3, 107.17, 107.47, 107.42, 107.5, 107.35, 107.44, 107.39, 107.47, 107.4, 107.61, 108.12, 107.49], spy: [100, 100.67, 100.79, 100.96, 101.01, 101.03, 100.96, 100.86, 100.78, 100.93, 100.96, 101.1, 101, 101.15, 101.15, 101.11, 101.03, 101.02, 100.97, 101.03, 100.87, 100.94, 101.07, 101.04], top10Return: 7.5, spyReturn: 1.04, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 105.92, 100.41, 101.47, 109.11], spy: [100, 101.76, 101.16, 99.89, 100.67], top10Return: 9.1, spyReturn: 0.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 100.43, 104.85, 107.4, 109.08, 116.36, 117.72, 116.64, 118.36, 124.05, 125.49, 122.15, 107.67, 114.13, 112.33, 119.13, 120.78, 128.06, 121.44, 122.81, 132.13], spy: [100, 99.33, 100.35, 100.55, 100.95, 101.6, 102.16, 102.41, 102.69, 102.83, 102.11, 102.5, 99.85, 100.08, 99.78, 99.88, 100.42, 102.19, 101.58, 100.31, 101.1], top10Return: 32.1, spyReturn: 1.1, xLabels: ["May 24", "May 31", "Jun 7", "Jun 14", "Jun 21"] },
    'YTD': { top10: [100, 107.01, 112.38, 117.59, 119.73, 114.72, 124.7, 122.84, 125.62, 120.82, 122, 128.28, 133.6, 126.69, 132.94, 144.55, 155.12, 169.86, 176.14, 195.63, 194.74, 190.66, 195.81, 193.77, 208.2, 228.13], spy: [100, 101.11, 101.24, 101.04, 101.78, 100.63, 101.47, 100.64, 101.65, 100.47, 99.3, 98.37, 95.79, 92.68, 96.67, 101.84, 103.93, 104.88, 105.29, 108.17, 108.4, 108.92, 110.93, 108.16, 108.19, 109.51], top10Return: 128.1, spyReturn: 9.5, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 104.51, 110.12, 114.5, 116.94, 119.71, 120.67, 123.89, 124.66, 129.18, 125.28, 130.18, 133.06, 136.81, 130.15, 138.97, 150.91, 166.03, 172.89, 192.96, 201.25, 191.3, 200.94, 212.73, 210.99, 231.17], spy: [100, 102.05, 101.66, 102.76, 100.16, 102.81, 101.93, 102.31, 101.45, 102.47, 101.28, 99.98, 97.78, 96.56, 96.14, 99.93, 103.47, 105.14, 105.19, 108.48, 109.73, 109.58, 111.55, 111.92, 109.06, 110.39], top10Return: 131.2, spyReturn: 10.4, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 105.68, 106.36, 110.38, 112.07, 111.56, 109.48, 113.54, 114.47, 116.35, 116.55, 118.11, 121.32, 127.68, 126.54, 134.06, 126.59, 134.13, 137.35, 141.17, 138.41, 138.42, 135.41, 141.4, 153.99, 151.25, 148.42, 152.07, 160.07, 158.74, 162.5, 164.75, 158.92, 172.35, 167.6, 175.44, 170.39, 171.1, 170.6, 180.61, 177.56, 186.96, 188.4, 206.15, 214.58, 223.65, 242.7, 240.36, 262.3, 266.09, 261.86, 284.52], spy: [100, 103.47, 104.44, 105.14, 105.8, 107.18, 104.62, 107.22, 108.27, 108.59, 108.54, 109.18, 111.21, 112.21, 111.68, 113.01, 109.88, 111.8, 113.96, 114.77, 112.9, 113.07, 110.9, 114.47, 115.03, 114.55, 114.52, 115.75, 116.41, 116.74, 115.33, 117.02, 115.47, 116.44, 115.18, 115.99, 115.29, 113.81, 111.3, 110.52, 110.26, 114.41, 118.07, 119.21, 120.93, 123.1, 124.91, 124.73, 126.98, 127.4, 124.14, 125.65], top10Return: 184.5, spyReturn: 25.7, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Broad Tech': {
    '1D': { top10: [100, 101.04, 101.11, 101.26, 101.44, 101.67, 101.76, 101.48, 101.34, 101.6, 101.51, 101.58, 101.5, 101.72, 101.67, 101.74, 101.71, 101.64, 101.56, 101.6, 101.46, 101.65, 101.98, 102.04], spy: [100, 100.67, 100.79, 100.96, 101.01, 101.03, 100.96, 100.86, 100.78, 100.93, 100.96, 101.1, 101, 101.15, 101.15, 101.11, 101.03, 101.02, 100.97, 101.03, 100.87, 100.94, 101.07, 101.04], top10Return: 2.3, spyReturn: 1.04, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 103.56, 101.87, 101.47, 103.81], spy: [100, 101.76, 101.16, 99.89, 100.67], top10Return: 3.8, spyReturn: 0.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.25, 101.65, 103.25, 104.48, 107.7, 109.19, 109.67, 111.4, 112.76, 111.35, 110.92, 103.23, 105.18, 103.29, 105.25, 105.81, 109.62, 107.81, 107.43, 109.99], spy: [100, 99.33, 100.35, 100.55, 100.95, 101.6, 102.16, 102.41, 102.69, 102.83, 102.11, 102.5, 99.85, 100.08, 99.78, 99.88, 100.42, 102.19, 101.58, 100.31, 101.1], top10Return: 10, spyReturn: 1.1, xLabels: ["May 24", "May 31", "Jun 7", "Jun 14", "Jun 21"] },
    'YTD': { top10: [100, 103.06, 104.75, 105, 104.81, 98.7, 102.2, 102.71, 105.14, 103.63, 102.61, 102.87, 100.34, 93.73, 101.28, 109.32, 114.07, 115.84, 119.59, 125.07, 125.24, 126.23, 131.81, 124.97, 127.88, 134.32], spy: [100, 101.11, 101.24, 101.04, 101.78, 100.63, 101.47, 100.64, 101.65, 100.47, 99.3, 98.37, 95.79, 92.68, 96.67, 101.84, 103.93, 104.88, 105.29, 108.17, 108.4, 108.92, 110.93, 108.16, 108.19, 109.51], top10Return: 34.3, spyReturn: 9.5, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 103.07, 104.31, 106.55, 104.31, 107.15, 102.79, 103.95, 103.85, 106.39, 105.22, 103.62, 102.17, 101.45, 99.25, 106.24, 112.29, 117.04, 115.55, 126.56, 128.45, 125.49, 132.56, 134.73, 129.25, 135.8], spy: [100, 102.05, 101.66, 102.76, 100.16, 102.81, 101.93, 102.31, 101.45, 102.47, 101.28, 99.98, 97.78, 96.56, 96.14, 99.93, 103.47, 105.14, 105.19, 108.48, 109.73, 109.58, 111.55, 111.92, 109.06, 110.39], top10Return: 35.8, spyReturn: 10.4, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 103.63, 105.64, 106.4, 108.31, 109.59, 106.34, 108.13, 109.18, 109.7, 111.14, 111.72, 117.26, 122.03, 121.18, 125.8, 123.09, 125.55, 128.8, 129.28, 125.61, 118.92, 114.4, 121.77, 123.59, 118.38, 120.64, 120.51, 124.52, 126.74, 125.84, 129.1, 121.22, 124.51, 125.01, 126.82, 125.47, 124.12, 124.33, 126.8, 124, 129.15, 135.38, 138.15, 140.29, 147.05, 149.61, 147.7, 157.03, 159.89, 154.02, 161.92], spy: [100, 103.47, 104.44, 105.14, 105.8, 107.18, 104.62, 107.22, 108.27, 108.59, 108.54, 109.18, 111.21, 112.21, 111.68, 113.01, 109.88, 111.8, 113.96, 114.77, 112.9, 113.07, 110.9, 114.47, 115.03, 114.55, 114.52, 115.75, 116.41, 116.74, 115.33, 117.02, 115.47, 116.44, 115.18, 115.99, 115.29, 113.81, 111.3, 110.52, 110.26, 114.41, 118.07, 119.21, 120.93, 123.1, 124.91, 124.73, 126.98, 127.4, 124.14, 125.65], top10Return: 61.9, spyReturn: 25.7, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Electrification': {
    '1D': { top10: [100, 101.23, 101.1, 101.13, 101.41, 101.88, 102.04, 102, 101.85, 101.83, 101.99, 101.84, 101.96, 102.09, 102.06, 102.12, 101.9, 101.88, 101.79, 101.84, 101.82, 101.9, 102.28, 102.6], spy: [100, 100.67, 100.79, 100.96, 101.01, 101.03, 100.96, 100.86, 100.78, 100.93, 100.96, 101.1, 101, 101.15, 101.15, 101.11, 101.03, 101.02, 100.97, 101.03, 100.87, 100.94, 101.07, 101.04], top10Return: 2.3, spyReturn: 1.04, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 102.25, 101.19, 101.15, 103.47], spy: [100, 101.76, 101.16, 99.89, 100.67], top10Return: 3.5, spyReturn: 0.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 97.94, 100.31, 103.13, 104.56, 106.89, 107.01, 105.87, 105.53, 107.74, 106.58, 106.49, 99.83, 99.95, 98.73, 99.45, 100.4, 102.66, 101.6, 101.57, 103.91], spy: [100, 99.33, 100.35, 100.55, 100.95, 101.6, 102.16, 102.41, 102.69, 102.83, 102.11, 102.5, 99.85, 100.08, 99.78, 99.88, 100.42, 102.19, 101.58, 100.31, 101.1], top10Return: 3.9, spyReturn: 1.1, xLabels: ["May 24", "May 31", "Jun 7", "Jun 14", "Jun 21"] },
    'YTD': { top10: [100, 103.61, 107.58, 111.38, 112.77, 111.72, 116.36, 114.6, 119.01, 114.25, 113.79, 114.69, 114.62, 110.23, 113.23, 122.41, 125.13, 129.32, 132.83, 136.96, 133.86, 132.94, 136.04, 129.46, 129.88, 134.79], spy: [100, 101.11, 101.24, 101.04, 101.78, 100.63, 101.47, 100.64, 101.65, 100.47, 99.3, 98.37, 95.79, 92.68, 96.67, 101.84, 103.93, 104.88, 105.29, 108.17, 108.4, 108.92, 110.93, 108.16, 108.19, 109.51], top10Return: 34.8, spyReturn: 9.5, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 102.56, 105.09, 106.92, 109.01, 112.94, 113.34, 114.48, 115.75, 119.39, 114.94, 113.98, 114.03, 115.14, 112.63, 118.08, 122.78, 127.55, 128.39, 137.99, 137.45, 129.95, 137.6, 137.69, 130.22, 135.14], spy: [100, 102.05, 101.66, 102.76, 100.16, 102.81, 101.93, 102.31, 101.45, 102.47, 101.28, 99.98, 97.78, 96.56, 96.14, 99.93, 103.47, 105.14, 105.19, 108.48, 109.73, 109.58, 111.55, 111.92, 109.06, 110.39], top10Return: 35.1, spyReturn: 10.4, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.75, 106.1, 108.17, 111.25, 112.48, 107.86, 111.32, 113.76, 115.98, 115.44, 114.13, 117.22, 122.64, 121.97, 131.38, 128.58, 132.72, 135.81, 136.52, 135.42, 132.16, 127.19, 133.71, 136.01, 134.09, 136.25, 134.52, 137.94, 142.05, 144.47, 148.56, 145.42, 147.78, 147.67, 151.53, 148.28, 148.34, 147.75, 153.97, 151.07, 159.88, 165.87, 170.11, 171.37, 175.05, 180.45, 172.57, 182.23, 181.53, 172, 176.78], spy: [100, 103.47, 104.44, 105.14, 105.8, 107.18, 104.62, 107.22, 108.27, 108.59, 108.54, 109.18, 111.21, 112.21, 111.68, 113.01, 109.88, 111.8, 113.96, 114.77, 112.9, 113.07, 110.9, 114.47, 115.03, 114.55, 114.52, 115.75, 116.41, 116.74, 115.33, 117.02, 115.47, 116.44, 115.18, 115.99, 115.29, 113.81, 111.3, 110.52, 110.26, 114.41, 118.07, 119.21, 120.93, 123.1, 124.91, 124.73, 126.98, 127.4, 124.14, 125.65], top10Return: 63.5, spyReturn: 25.7, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Industrials': {
    '1D': { top10: [100, 101.36, 100.63, 100.5, 100.68, 100.79, 100.6, 100.41, 100.23, 100.51, 100.6, 100.56, 100.64, 100.86, 100.75, 100.67, 100.69, 100.58, 100.55, 100.57, 100.42, 100.47, 100.64, 100.84], spy: [100, 100.67, 100.79, 100.96, 101.01, 101.03, 100.96, 100.86, 100.78, 100.93, 100.96, 101.1, 101, 101.15, 101.15, 101.11, 101.03, 101.02, 100.97, 101.03, 100.87, 100.94, 101.07, 101.04], top10Return: 0.7, spyReturn: 1.04, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 100.23, 100.26, 100.03, 100.8], spy: [100, 101.76, 101.16, 99.89, 100.67], top10Return: 0.8, spyReturn: 0.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.83, 100.73, 100.93, 101.85, 104.38, 104.87, 104.19, 102.66, 104.01, 103.75, 104.74, 101.82, 101.98, 102.09, 103.55, 103.9, 104.17, 104.19, 103.96, 104.8], spy: [100, 99.33, 100.35, 100.55, 100.95, 101.6, 102.16, 102.41, 102.69, 102.83, 102.11, 102.5, 99.85, 100.08, 99.78, 99.88, 100.42, 102.19, 101.58, 100.31, 101.1], top10Return: 4.8, spyReturn: 1.1, xLabels: ["May 24", "May 31", "Jun 7", "Jun 14", "Jun 21"] },
    'YTD': { top10: [100, 105.14, 108.87, 111.3, 111.44, 111.87, 117.09, 117.88, 119.24, 118.02, 114.15, 113.19, 112.37, 106.64, 113.43, 120.62, 120.95, 121.02, 121.03, 123.9, 121.85, 121.07, 125.05, 122.29, 124.37, 126.21], spy: [100, 101.11, 101.24, 101.04, 101.78, 100.63, 101.47, 100.64, 101.65, 100.47, 99.3, 98.37, 95.79, 92.68, 96.67, 101.84, 103.93, 104.88, 105.29, 108.17, 108.4, 108.92, 110.93, 108.16, 108.19, 109.51], top10Return: 26.2, spyReturn: 9.5, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 102.81, 105.37, 108.98, 110.62, 112.54, 113.75, 117.23, 118.81, 120.19, 118.97, 114.73, 112.84, 113.26, 111.56, 119.15, 119.9, 120.96, 118.83, 127.58, 125.25, 121.8, 126.86, 126.91, 125.33, 127.18], spy: [100, 102.05, 101.66, 102.76, 100.16, 102.81, 101.93, 102.31, 101.45, 102.47, 101.28, 99.98, 97.78, 96.56, 96.14, 99.93, 103.47, 105.14, 105.19, 108.48, 109.73, 109.58, 111.55, 111.92, 109.06, 110.39], top10Return: 27.2, spyReturn: 10.4, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 103.72, 104.98, 106.29, 106.33, 108.34, 106.18, 108.4, 108.25, 109.7, 109.85, 110.74, 112.74, 114.47, 114.09, 116.83, 113.21, 114.54, 118.23, 118.58, 115.32, 112.25, 109.51, 112.45, 115.3, 116.14, 116.62, 117.49, 122.86, 126.7, 130.02, 129.87, 130.59, 136.37, 138.14, 137.84, 136.01, 131.03, 129.17, 132.09, 131.15, 137.55, 137.42, 140.17, 141.74, 143.11, 144.05, 140.26, 145.46, 146.17, 144.29, 146.53], spy: [100, 103.47, 104.44, 105.14, 105.8, 107.18, 104.62, 107.22, 108.27, 108.59, 108.54, 109.18, 111.21, 112.21, 111.68, 113.01, 109.88, 111.8, 113.96, 114.77, 112.9, 113.07, 110.9, 114.47, 115.03, 114.55, 114.52, 115.75, 116.41, 116.74, 115.33, 117.02, 115.47, 116.44, 115.18, 115.99, 115.29, 113.81, 111.3, 110.52, 110.26, 114.41, 118.07, 119.21, 120.93, 123.1, 124.91, 124.73, 126.98, 127.4, 124.14, 125.65], top10Return: 46.5, spyReturn: 25.7, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Meme': {
    '1D': { top10: [100, 100.44, 99.88, 100.83, 101.55, 102, 102.55, 102.47, 101.83, 101.86, 101.95, 101.78, 101.59, 101.52, 101.62, 101.85, 101.63, 101.44, 101.42, 101.33, 101.19, 101.74, 102.47, 103.06], spy: [100, 100.67, 100.79, 100.96, 101.01, 101.03, 100.96, 100.86, 100.78, 100.93, 100.96, 101.1, 101, 101.15, 101.15, 101.11, 101.03, 101.02, 100.97, 101.03, 100.87, 100.94, 101.07, 101.04], top10Return: 3.5, spyReturn: 1.04, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 105.59, 101.42, 102.07, 105.68], spy: [100, 101.76, 101.16, 99.89, 100.67], top10Return: 5.7, spyReturn: 0.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.45, 102.26, 108.47, 111.06, 116.5, 118.62, 116.99, 117.19, 120.13, 115.91, 116.55, 104.59, 107.27, 103.43, 107.16, 105.76, 111.69, 107.28, 107.98, 111.83], spy: [100, 99.33, 100.35, 100.55, 100.95, 101.6, 102.16, 102.41, 102.69, 102.83, 102.11, 102.5, 99.85, 100.08, 99.78, 99.88, 100.42, 102.19, 101.58, 100.31, 101.1], top10Return: 11.8, spyReturn: 1.1, xLabels: ["May 24", "May 31", "Jun 7", "Jun 14", "Jun 21"] },
    'YTD': { top10: [100, 108.03, 108.62, 108.21, 102.73, 95.14, 96.6, 94.29, 96.34, 96.03, 93.13, 93.47, 92.45, 85.8, 95.13, 108.37, 116.48, 112.46, 116.64, 125.35, 124.23, 132.96, 142.64, 126.27, 128.62, 133.45], spy: [100, 101.11, 101.24, 101.04, 101.78, 100.63, 101.47, 100.64, 101.65, 100.47, 99.3, 98.37, 95.79, 92.68, 96.67, 101.84, 103.93, 104.88, 105.29, 108.17, 108.4, 108.92, 110.93, 108.16, 108.19, 109.51], top10Return: 33.5, spyReturn: 9.5, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 103.04, 105.79, 109.89, 107.4, 106.67, 103.06, 97.97, 96.7, 98.45, 96.59, 93.82, 95.24, 96.07, 93.99, 100.98, 114.16, 118.13, 111.88, 128.49, 129.6, 129.48, 147.13, 139.67, 131.1, 135.97], spy: [100, 102.05, 101.66, 102.76, 100.16, 102.81, 101.93, 102.31, 101.45, 102.47, 101.28, 99.98, 97.78, 96.56, 96.14, 99.93, 103.47, 105.14, 105.19, 108.48, 109.73, 109.58, 111.55, 111.92, 109.06, 110.39], top10Return: 36, spyReturn: 10.4, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 103.29, 101.27, 96.72, 97.46, 93, 93.14, 90.26, 86.99, 84.67, 85.51, 86.84, 91.22, 92.31, 89.25, 92.05, 91.04, 90.4, 95.86, 97.38, 92.7, 91.39, 86.52, 84.59, 85.97, 86.94, 88.72, 88.53, 93.17, 93.24, 92.21, 95.21, 91.86, 89.83, 89.83, 90.54, 95.05, 96.52, 100.72, 101.07, 94.25, 96.83, 107.39, 112.55, 112.3, 114.25, 120.39, 116.96, 118.44, 114.66, 115.28, 118.26], spy: [100, 103.47, 104.44, 105.14, 105.8, 107.18, 104.62, 107.22, 108.27, 108.59, 108.54, 109.18, 111.21, 112.21, 111.68, 113.01, 109.88, 111.8, 113.96, 114.77, 112.9, 113.07, 110.9, 114.47, 115.03, 114.55, 114.52, 115.75, 116.41, 116.74, 115.33, 117.02, 115.47, 116.44, 115.18, 115.99, 115.29, 113.81, 111.3, 110.52, 110.26, 114.41, 118.07, 119.21, 120.93, 123.1, 124.91, 124.73, 126.98, 127.4, 124.14, 125.65], top10Return: 18.2, spyReturn: 25.7, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
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
  weeklyChange: number;
};

// ── Theme configuration ───────────────────────────────────────────────────────

export const THEMES: Theme[] = ['AI & ML', 'Semiconductors', 'Broad Tech', 'Electrification', 'Industrials', 'Meme'];

// Last scan timestamp — patched by build-data-ts.js after each run
// @@GENERATED:SCAN_TIMESTAMP@@
export const SCAN_TIMESTAMP    = '2026-06-21T13:36:50.114Z';
export const SCAN_TIMESTAMP_NY = 'June 21, 2026 at 9:36 AM ET';
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
export const HOLDINGS_COUNT = 1278;
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
  { ticker: 'MU', name: `Micron Technology Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 14.57, bestProScore: 6.18, avgProScore: 4.86, price: 1133.99, weeklyChange: 15.52 },
  { ticker: 'NVDA', name: `NVIDIA Corp`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 12.65, bestProScore: 6.02, avgProScore: 4.22, price: 210.69, weeklyChange: 2.68 },
  { ticker: 'AMD', name: `Advanced Micro Devices Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 10.48, bestProScore: 4.80, avgProScore: 3.49, price: 537.37, weeklyChange: 5.04 },
  { ticker: 'AVGO', name: `Broadcom Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 6.60, bestProScore: 2.93, avgProScore: 2.20, price: 411.35, weeklyChange: 7.66 },
  { ticker: 'INTC', name: `INTEL CORPORATION`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 5.24, bestProScore: 3.72, avgProScore: 2.62, price: 133.99, weeklyChange: 7.56 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.93, bestProScore: 2.59, avgProScore: 2.46, price: 310.58, weeklyChange: 11.04 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 4.79, bestProScore: 2.77, avgProScore: 2.40, price: 297.20, weeklyChange: 0.83 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.74, bestProScore: 2.95, avgProScore: 2.37, price: 462.12, weeklyChange: 9.01 },
  { ticker: 'WDC', name: `Western Digital Corp`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.16, bestProScore: 2.34, avgProScore: 2.08, price: 746.23, weeklyChange: 32.56 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 3.81, bestProScore: 2.47, avgProScore: 1.91, price: 389.04, weeklyChange: 6.06 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': 11.4, '1M': 30.2, 'YTD': 126.6, '6M': 137.7, '1Y': 224.9 },
  ARTY: { '1W': 7.7, '1M': 22.4, 'YTD': 63.8, '6M': 68.6, '1Y': 105.3 },
  BAI:  { '1W': 8.7, '1M': 16.9, 'YTD': 59.8, '6M': 64.6, '1Y': 97.3 },
  IGPT: { '1W': 9.4, '1M': 22.7, 'YTD': 78.9, '6M': 84.9, '1Y': 129.6 },
  IVES: { '1W': 2.8, '1M': 5.3, 'YTD': 20.3, '6M': 21.9, '1Y': 47.1 },
  ALAI: { '1W': 7.8, '1M': 11.6, 'YTD': 29.5, '6M': 30.8, '1Y': 61.4 },
  CHAT: { '1W': 9.9, '1M': 21.6, 'YTD': 73.6, '6M': 76.1, '1Y': 122.3 },
  AIFD: { '1W': 3.5, '1M': 12.1, 'YTD': 46.9, '6M': 51.7, '1Y': 91 },
  SPRX: { '1W': 4.7, '1M': 23.7, 'YTD': 50.5, '6M': 57.8, '1Y': 109.3 },
  AOTG: { '1W': 4.7, '1M': 9.7, 'YTD': 15.6, '6M': 17.6, '1Y': 39.2 },
  // Semiconductors
  SOXX: { '1W': 7.2, '1M': 29, 'YTD': 112.3, '6M': 119, '1Y': 184.1 },
  PSI:  { '1W': 6.2, '1M': 24.7, 'YTD': 126, '6M': 130, '1Y': 217.1 },
  XSD:  { '1W': 5, '1M': 19.4, 'YTD': 97.9, '6M': 99.4, '1Y': 160.6 },
  DRAM: { '1W': 18, '1M': 55.5, 'YTD': 176.3, '6M': 176.3, '1Y': 176.3 },
  // Broad Tech
  PTF:  { '1W': 5.7, '1M': 19.6, 'YTD': 79.3, '6M': 83.7, '1Y': 110.6 },
  WCLD: { '1W': -3.5, '1M': 0.2, 'YTD': -15.6, '6M': -16.3, '1Y': -14.7 },
  IGV:  { '1W': -1.8, '1M': -4.1, 'YTD': -15.7, '6M': -16.1, '1Y': -15.2 },
  FDTX: { '1W': 5.9, '1M': 19.4, 'YTD': 42.2, '6M': 44.9, '1Y': 57.4 },
  GTEK: { '1W': 5.6, '1M': 16.9, 'YTD': 55.2, '6M': 59, '1Y': 81.7 },
  ARKK: { '1W': 6, '1M': 7.6, 'YTD': 4.3, '6M': 1.9, '1Y': 18.4 },
  MARS: { '1W': -1.9, '1M': -12.7, 'YTD': 32.5, '6M': 32.5, '1Y': 32.5 },
  FRWD: { '1W': 7.2, '1M': 16.3, 'YTD': 38.4, '6M': 38.4, '1Y': 38.4 },
  BCTK: { '1W': 4.6, '1M': 11.1, 'YTD': 27.3, '6M': 30.2, '1Y': 29.6 },
  FWD:  { '1W': 4.9, '1M': 11.9, 'YTD': 41, '6M': 43.2, '1Y': 74.5 },
  CBSE: { '1W': 3.7, '1M': 6.8, 'YTD': 31.3, '6M': 32.1, '1Y': 45.3 },
  FCUS: { '1W': 1.8, '1M': 8.3, 'YTD': 45.8, '6M': 44.4, '1Y': 81.9 },
  WGMI: { '1W': 9.3, '1M': 29.8, 'YTD': 88.4, '6M': 92.3, '1Y': 288.1 },
  CNEQ: { '1W': 7.3, '1M': 8.8, 'YTD': 21.7, '6M': 23.9, '1Y': 49.9 },
  SGRT: { '1W': 3.6, '1M': 10, 'YTD': 49.4, '6M': 54, '1Y': 86.9 },
  SPMO: { '1W': 4.9, '1M': 13.1, 'YTD': 34, '6M': 35.9, '1Y': 49.6 },
  XMMO: { '1W': 1.3, '1M': 6.8, 'YTD': 24.1, '6M': 24.5, '1Y': 38 },
  // Electrification
  POW:  { '1W': 4.4, '1M': 4.8, 'YTD': 59, '6M': 60.4, '1Y': 54.3 },
  VOLT: { '1W': 4.3, '1M': 6.9, 'YTD': 42.2, '6M': 43.2, '1Y': 68.2 },
  PBD:  { '1W': -0.5, '1M': -3.3, 'YTD': 26.2, '6M': 27.3, '1Y': 68 },
  PBW:  { '1W': 3.5, '1M': 6, 'YTD': 36, '6M': 34.3, '1Y': 116.6 },
  IVEP: { '1W': 5.6, '1M': 5.1, 'YTD': 10.5, '6M': 10.5, '1Y': 10.5 },
  // Industrials
  AIRR: { '1W': 1.1, '1M': 4.7, 'YTD': 33.1, '6M': 32.4, '1Y': 68.1 },
  PRN:  { '1W': 4.4, '1M': 10.1, 'YTD': 46.3, '6M': 49.1, '1Y': 69.6 },
  RSHO: { '1W': 4.1, '1M': 12.6, 'YTD': 39.4, '6M': 39.3, '1Y': 64.3 },
  IDEF: { '1W': 0.1, '1M': 0.4, 'YTD': 4.9, '6M': 7, '1Y': 20 },
  BILT: { '1W': -5.7, '1M': -3.9, 'YTD': 7.4, '6M': 8.1, '1Y': 10.5 },
  // Meme
  BUZZ: { '1W': 3.3, '1M': 5.3, 'YTD': 17, '6M': 17.5, '1Y': 32.8 },
  MEME: { '1W': 5.7, '1M': 10.9, 'YTD': 66.8, '6M': 73.8, '1Y': 5.3 },
  RKNG: { '1W': 8, '1M': 19.3, 'YTD': 16.6, '6M': 16.6, '1Y': 16.6 },
};
// @@END_GENERATED:ETF_RETURNS@@

// @@GENERATED:ETF_DAY_CHANGE@@
// Today's % move per ETF ticker (1D, vs prior close). Refreshed by the 3×/day
// price jobs. Powers the 1D ranking in the theme-ETF side panel.
export const ETF_DAY_CHANGE: Record<string, number> = {
  AIS:  7.08,
  ARTY: 4.25,
  BAI:  5.62,
  IGPT: 5.56,
  IVES: 1.77,
  ALAI: 2.93,
  CHAT: 5.65,
  AIFD: 2.47,
  SPRX: 4.1,
  AOTG: 3.24,
  SOXX: 6.62,
  PSI:  6.42,
  XSD:  7.26,
  DRAM: 9.66,
  PTF:  3.85,
  WCLD: -0.24,
  IGV:  -0.08,
  FDTX: 3.2,
  GTEK: 3.68,
  ARKK: 2.17,
  MARS: -2.32,
  FRWD: 3.13,
  BCTK: 2.53,
  FWD:  3.31,
  CBSE: 4,
  FCUS: 2.58,
  WGMI: 4.89,
  CNEQ: 2.35,
  SGRT: 1.6,
  SPMO: 2.84,
  XMMO: 1.25,
  POW:  1.23,
  VOLT: 2.06,
  PBD:  1.06,
  PBW:  3.9,
  IVEP: 3.21,
  AIRR: 1.28,
  PRN:  1.46,
  RSHO: 2.25,
  IDEF: -1.64,
  BILT: 0.05,
  BUZZ: 2.29,
  MEME: 3.82,
  RKNG: 4.31,
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
  'AI & ML': { etfs: ['AIS', 'SPRX', 'AOTG'], series: { '1W': [100, 105.09, 101.15, 102.01, 106.94], '1M': [100, 99.53, 103.45, 106.27, 107.79, 113.22, 115.27, 114.76, 117.04, 120.84, 119.99, 118.31, 107.05, 110.93, 108.56, 112.08, 113.27, 119.06, 114.53, 115.56, 121.21], 'YTD': [100, 102.87, 105.21, 107.25, 108.86, 98.95, 104.69, 102.79, 106.46, 103.34, 102.16, 103.87, 101.13, 90.77, 100.91, 113.85, 118.06, 123.25, 125.27, 135.57, 137, 142.38, 153.97, 143.41, 150.96, 164.22], '6M': [100, 105.3, 107.8, 110, 108.56, 113, 109.19, 109.4, 106.86, 110.69, 107.42, 107.25, 106.54, 105.15, 99.97, 110.8, 118.73, 126.96, 125.52, 139.3, 146.62, 144.11, 161.24, 165.8, 157.18, 171.02], '1Y': [100, 106.05, 106.21, 106.82, 111.5, 114.01, 111.55, 116.75, 116.76, 115.33, 116.64, 119.73, 126.62, 132.29, 130.02, 137.05, 133.17, 135.16, 140.65, 145.59, 137.58, 131.86, 123.19, 133.42, 138.36, 129.34, 134, 135.86, 141.45, 142.72, 142.71, 148.92, 133.62, 141.62, 139.53, 142.14, 139.78, 139.57, 138.72, 139.38, 133.05, 144.67, 156.86, 163.53, 168.02, 176.36, 191.96, 188.54, 211.25, 217.32, 206.05, 224.47] }, returns: { '1W': 6.9, '1M': 21.2, 'YTD': 64.2, '6M': 71, '1Y': 124.5 } },
  'Semiconductors': { etfs: ['DRAM', 'PSI', 'XSD'], series: { '1W': [100, 106.09, 100.82, 101.77, 109.73], '1M': [100, 100.51, 104.83, 107.92, 109.32, 117.23, 118.67, 117.27, 119.37, 124.73, 125.94, 122.35, 107.27, 113.76, 111.99, 119.39, 120.96, 128.5, 122.18, 123.42, 133.19], 'YTD': [100, 107.31, 113.11, 118.19, 119.67, 116.39, 126.4, 124.18, 126.75, 123.28, 125.16, 133.38, 140.39, 134.63, 138.76, 148.32, 160.61, 176.07, 183.71, 203.25, 203.36, 196.14, 198.1, 198.62, 212.63, 233.4], '6M': [100, 104.41, 110.52, 114.97, 117.42, 119.54, 121.44, 125.07, 125.37, 130.24, 128.05, 134.52, 138.8, 143.5, 136.02, 143.01, 155.35, 172.09, 179.16, 199.42, 208.04, 195.68, 202.92, 214.84, 214.33, 235.24], '1Y': [100, 105.53, 106.46, 111.07, 112.86, 112.35, 110.85, 115.43, 115.86, 118.25, 119.08, 120.63, 123.58, 130.28, 128.9, 136.05, 128.51, 136.17, 139.32, 142.83, 140.96, 141.83, 140.45, 144.57, 159, 157.54, 153.5, 157.55, 164.81, 162.29, 165.12, 166.3, 162.98, 176.47, 170.78, 181.09, 176.62, 177.48, 177.37, 189.68, 186.62, 193.21, 191.09, 209.56, 217.78, 225.29, 245.37, 243.43, 265.4, 265.54, 262.24, 284.67] }, returns: { '1W': 9.7, '1M': 33.2, 'YTD': 133.4, '6M': 135.2, '1Y': 184.7 } },
  'Broad Tech': { etfs: ['WGMI', 'PTF', 'SGRT'], series: { '1W': [100, 104.4, 102.53, 102.66, 106.2], '1M': [100, 99.12, 102.19, 106.44, 107.31, 114.83, 115.24, 114.11, 116.44, 119.42, 119.06, 117.19, 106.03, 109.93, 106.87, 110.14, 112.67, 117.65, 115.59, 115.71, 119.78], 'YTD': [100, 107.37, 113.37, 113.75, 116.83, 106.4, 112.8, 111.64, 117.87, 113.55, 108.67, 111.72, 111.1, 97.79, 110.72, 127.39, 132.2, 134.41, 137.73, 149.88, 148.72, 153.05, 164.13, 152.49, 158.45, 172.38], '6M': [100, 105.49, 111.29, 115.12, 116.43, 121.12, 116.03, 114.9, 114.48, 120.88, 116.44, 112.8, 113.4, 113.93, 106.16, 121.45, 129.88, 137.56, 130.94, 156.55, 156.87, 150.58, 169.92, 172.82, 162.43, 176.7], '1Y': [100, 108.12, 113.74, 115.57, 120.31, 120.61, 115.28, 118.83, 123.12, 125.79, 130.8, 130.37, 151.06, 160.14, 159.92, 174.59, 174.5, 183.91, 188.68, 187.49, 179.49, 153.39, 145.81, 166.42, 168.35, 150.62, 158.89, 155.26, 167.09, 176.71, 175.29, 185.19, 163.38, 166.76, 165.72, 169.7, 166, 159.69, 162.76, 170.71, 159.74, 177.26, 191.2, 200.94, 200.08, 223.12, 225.18, 224.34, 254, 251.48, 240.24, 261.85] }, returns: { '1W': 6.2, '1M': 19.8, 'YTD': 72.4, '6M': 76.7, '1Y': 161.9 } },
  'Electrification': { etfs: ['PBW', 'POW', 'VOLT'], series: { '1W': [100, 102.7, 101.55, 101.64, 104.06], '1M': [100, 97.95, 100.57, 103.7, 105.34, 108.42, 108.43, 107.32, 106.91, 109.25, 107.95, 107.84, 100.34, 101.09, 99.78, 100.94, 101.78, 104.51, 103.33, 103.44, 105.91], 'YTD': [100, 104.13, 108.52, 113.55, 115.16, 113.57, 119.72, 117.77, 122.72, 116.91, 115.96, 117.64, 117.83, 110.84, 116.59, 128.11, 131.1, 137.06, 142.29, 146.47, 142.92, 142.71, 147.45, 137.89, 138.91, 145.74], '6M': [100, 102.67, 105.49, 107.7, 110.4, 114.69, 115.26, 117.72, 117.97, 122.94, 117.12, 116.8, 116.33, 118.06, 115.21, 122.44, 127.65, 134.25, 135.78, 148.07, 147.44, 138.66, 149.15, 148.22, 139.14, 145.97], '1Y': [100, 102.29, 105.76, 107.8, 110.56, 111.7, 107.22, 110.88, 112.93, 115.01, 114.54, 112.46, 116.17, 122.05, 121.48, 130.81, 128.79, 132.04, 135.41, 136.05, 134.4, 131.07, 127.21, 134.29, 136.62, 134.05, 137.02, 134.44, 137.64, 141.99, 144.12, 147.59, 144.33, 146.57, 146.64, 150.72, 148.72, 148.64, 147.94, 155.45, 151.64, 161.6, 166.99, 171.57, 170.74, 174.16, 180.56, 172.94, 181.06, 180.79, 173.46, 179.69] }, returns: { '1W': 4.1, '1M': 5.9, 'YTD': 45.7, '6M': 46, '1Y': 79.7 } },
  'Industrials': { etfs: ['PRN', 'RSHO', 'IDEF'], series: { '1W': [100, 101.66, 101.61, 102, 102.84], '1M': [100, 98.49, 100.81, 101.12, 102.42, 105.48, 106.27, 105.61, 104.06, 105.62, 105.01, 105.9, 101.91, 102.49, 102.58, 104.57, 104.67, 106.42, 106.36, 106.77, 107.71], 'YTD': [100, 106.05, 110.6, 112.54, 112.55, 112.53, 117.64, 118.95, 120.5, 118.71, 115.03, 113.63, 112.87, 105.13, 113.12, 121.64, 122.11, 121.46, 121.48, 125.21, 122.9, 121.72, 127.09, 122.84, 126.03, 130.18], '6M': [100, 103.62, 106.66, 111.25, 112.59, 114.41, 115.31, 118.59, 120.45, 122.03, 120.22, 116.01, 113.8, 114.31, 111.36, 120.22, 121.25, 122.64, 119.48, 130.02, 127.5, 122.87, 129.51, 129.35, 127.59, 131.78], '1Y': [100, 104.03, 105.07, 106.78, 107.23, 109.25, 107.11, 108.72, 108.62, 109.75, 109.68, 110.42, 113.2, 114.73, 114.44, 118.38, 113.88, 115.18, 119.83, 119.74, 115.84, 112.53, 108.68, 111.61, 115.3, 116.14, 117.16, 117.88, 124.08, 128.23, 130.94, 130.03, 130.68, 136.64, 139.45, 140.17, 137.83, 132.97, 130.43, 133.05, 130.95, 138.96, 138.76, 141.52, 142.94, 144.58, 146.32, 140.99, 148.57, 148.48, 146.46, 151.33] }, returns: { '1W': 2.8, '1M': 7.7, 'YTD': 30.2, '6M': 31.8, '1Y': 51.3 } },
  'Meme': { etfs: ['MEME', 'BUZZ', 'RKNG'], series: { '1W': [100, 105.59, 101.42, 102.07, 105.68], '1M': [100, 98.45, 102.26, 108.47, 111.06, 116.5, 118.62, 116.99, 117.19, 120.13, 115.91, 116.55, 104.59, 107.27, 103.43, 107.16, 105.76, 111.69, 107.28, 107.98, 111.83], 'YTD': [100, 108.03, 108.62, 108.21, 102.73, 95.14, 96.6, 94.29, 96.34, 96.03, 93.13, 93.47, 92.45, 85.8, 95.13, 108.37, 116.48, 112.46, 116.64, 125.35, 124.23, 132.96, 142.64, 126.27, 128.62, 133.45], '6M': [100, 103.04, 105.79, 109.89, 107.4, 106.67, 103.06, 97.97, 96.7, 98.45, 96.59, 93.82, 95.24, 96.07, 93.99, 100.98, 114.16, 118.13, 111.88, 128.49, 129.6, 129.48, 147.13, 139.67, 131.1, 135.97], '1Y': [100, 103.29, 101.27, 96.72, 97.46, 93, 93.14, 90.26, 86.99, 84.67, 85.51, 86.84, 91.22, 92.31, 89.25, 92.05, 91.04, 90.4, 95.86, 97.38, 92.7, 91.39, 86.52, 84.59, 85.97, 86.94, 88.72, 88.53, 93.17, 93.24, 92.21, 95.21, 91.86, 89.83, 89.83, 90.54, 95.05, 96.52, 100.72, 101.07, 94.25, 96.83, 107.39, 112.55, 112.3, 114.25, 120.39, 116.96, 118.44, 114.66, 115.28, 118.26] }, returns: { '1W': 5.7, '1M': 11.8, 'YTD': 33.4, '6M': 36, '1Y': 18.3 } },
};
// @@END_GENERATED:THEME_REPRESENTATIVES@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 10, avgWeight: 6.02, proScore: 6.02, coverage: 1,
      price: 210.69, weeklyPrices: [205.19, 212.45, 207.41, 204.65, 210.69], weeklyChange: 2.68, dayChange: 2.95, sortRank: 0, periodReturns: { '1M': -5.2, 'YTD': 13, '6M': 21, '1Y': 46.5 },
      priceHistory: { '1D': [204.65, 207.14, 207.72, 208.93, 209.35, 209.32, 209.27, 208.88, 208.19, 209.27, 209.53, 210.97, 210.13, 209.96, 210.06, 210.04, 209.66, 209.85, 210.1, 209.78, 210.06, 209.85, 210.15, 210.69], '1W': [205.19, 212.45, 207.41, 204.65, 210.69], '1M': [222.32, 220.61, 223.47, 219.51, 215.33, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69], 'YTD': [186.5, 185.04, 183.14, 184.84, 192.51, 174.19, 190.05, 187.98, 195.56, 183.04, 184.77, 181.93, 175.2, 165.17, 178.1, 196.51, 202.06, 216.61, 198.48, 215.2, 225.32, 219.51, 211.14, 205.1, 204.87, 210.69], '6M': [174.14, 190.53, 188.12, 184.94, 178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 186.03, 180.4, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 223.47, 214.25, 218.66, 204.87, 210.69], '1Y': [143.85, 157.75, 158.24, 164.07, 171.38, 176.75, 173.72, 182.7, 180.45, 177.99, 174.18, 168.31, 177.75, 183.61, 181.85, 185.54, 183.16, 183.22, 186.26, 202.49, 188.15, 190.17, 178.88, 179.92, 185.55, 176.29, 180.99, 188.22, 187.24, 185.81, 183.32, 191.52, 174.19, 190.05, 187.9, 184.89, 183.04, 186.03, 180.4, 178.68, 175.75, 183.91, 198.35, 199.64, 199.57, 211.5, 225.83, 223.47, 214.25, 218.66, 204.87, 210.69] },
      velocityScore: { '1D': 0.3, '1W': -2.7, '1M': 3.8, '6M': null }, isNew: false,
      marketCap: '$5.1T', pe: 32.3, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.47,
      etfPresence: { AIS: 2.38, ARTY: 4.41, BAI: 4.02, IGPT: 5.34, IVES: 4.75, ALAI: 12.65, CHAT: 6.39, AIFD: 6.37, SPRX: 3.34, AOTG: 10.53 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 6.86, proScore: 6.18, coverage: 0.9,
      price: 1133.99, weeklyPrices: [981.61, 1087.99, 1020.76, 1043.19, 1133.99], weeklyChange: 15.52, dayChange: 8.7, sortRank: 0, periodReturns: { '1M': 66.4, 'YTD': 297.3, '6M': 356.2, '1Y': 817.5 },
      priceHistory: { '1D': [1043.19, 1099, 1106.11, 1118.26, 1121.66, 1124.56, 1128.4, 1126.12, 1122.69, 1126.87, 1127.72, 1125.45, 1127.32, 1129.46, 1134.23, 1134.65, 1138.57, 1141.99, 1142.73, 1144.29, 1139.82, 1142.21, 1147.02, 1133.99], '1W': [981.61, 1087.99, 1020.76, 1043.19, 1133.99], '1M': [681.54, 698.74, 731.99, 762.1, 751, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99], 'YTD': [285.41, 327.02, 333.35, 397.58, 435.79, 379.4, 410.34, 420.95, 429, 400.77, 403.11, 461.69, 395.53, 321.8, 377.58, 465.66, 448.42, 524.56, 576.45, 746.81, 724.66, 762.1, 971, 864.01, 995.87, 1133.99], '6M': [248.55, 284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 418.69, 461.73, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 923.52, 996, 995.87, 1133.99], '1Y': [123.6, 124.76, 119.92, 118.61, 113.23, 111.25, 104.88, 118.89, 120.87, 117.68, 119.01, 131.46, 157.77, 164.62, 163.9, 190.96, 181.6, 202.38, 219.02, 223.77, 237.92, 246.83, 207.37, 240.46, 246.92, 237.5, 265.92, 294.37, 343.43, 338.13, 389.11, 435.28, 379.4, 410.34, 417.35, 415.56, 400.77, 418.69, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 517.16, 646.63, 803.63, 731.99, 923.52, 996, 995.87, 1133.99] },
      velocityScore: { '1D': 0, '1W': 0.3, '1M': 16.6, '6M': null }, isNew: false,
      marketCap: '$1.3T', pe: 53.5, revenueGrowth: 196, eps: 21.21, grossMargin: 58, dividendYield: 0.05,
      etfPresence: { AIS: 6.97, ARTY: 5.07, BAI: 6.44, IGPT: 12.98, IVES: 6.81, ALAI: 1.08, CHAT: 4.08, AIFD: 7.12, SPRX: false, AOTG: 11.23 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 9, avgWeight: 5.33, proScore: 4.8, coverage: 0.9,
      price: 537.37, weeklyPrices: [511.57, 547.26, 507.29, 512.48, 537.37], weeklyChange: 5.04, dayChange: 4.86, sortRank: 0, periodReturns: { '1M': 27.6, 'YTD': 150.9, '6M': 167.3, '1Y': 319 },
      priceHistory: { '1D': [512.48, 530.56, 531.21, 533.45, 530.77, 531.82, 537.11, 531.59, 528.43, 534.62, 533.55, 533.53, 533.4, 534.02, 533.83, 534.64, 532.61, 532.99, 530.67, 531.39, 531.3, 531.07, 534.21, 537.37], '1W': [511.57, 547.26, 507.29, 512.48, 537.37], '1M': [420.99, 414.05, 447.58, 449.59, 467.51, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37], 'YTD': [214.16, 204.68, 223.6, 253.73, 252.18, 200.19, 213.58, 200.12, 210.86, 202.07, 203.23, 196.31, 205.37, 196.04, 221.53, 255.07, 274.95, 334.63, 341.54, 455.19, 424.1, 449.59, 516.1, 466.38, 488.45, 537.37], '6M': [201.06, 214.99, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 204.83, 199.46, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 518.09, 523.2, 488.45, 537.37], '1Y': [128.24, 143.81, 134.8, 146.24, 157, 173.66, 171.7, 172.76, 177.51, 167.76, 162.63, 151.41, 161.16, 159.79, 161.36, 203.71, 214.9, 233.08, 252.92, 256.12, 233.54, 246.81, 203.78, 219.76, 221.11, 207.58, 213.43, 215.61, 214.35, 220.97, 249.8, 252.74, 200.19, 213.58, 203.37, 203.68, 202.07, 204.83, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 354.49, 408.46, 445.5, 447.58, 518.09, 523.2, 488.45, 537.37] },
      velocityScore: { '1D': -3.6, '1W': -5.5, '1M': -4.2, '6M': null }, isNew: false,
      marketCap: '$876B', pe: 178.5, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.59, ARTY: 4.65, BAI: 4.72, IGPT: 7.09, IVES: 5.17, ALAI: 1.17, CHAT: 3.91, AIFD: false, SPRX: 0.53, AOTG: 16.16 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 8, avgWeight: 3.66, proScore: 2.93, coverage: 0.8,
      price: 411.35, weeklyPrices: [382.07, 393.94, 376.71, 392.90, 411.35], weeklyChange: 7.66, dayChange: 4.7, sortRank: 0, periodReturns: { '1M': -2.2, 'YTD': 18.9, '6M': 24.7, '1Y': 64.5 },
      priceHistory: { '1D': [392.9, 406.62, 406.12, 409.5, 408.61, 409.05, 410.11, 408.8, 406.88, 408.85, 409.38, 408.3, 408.43, 407.4, 407.29, 408.02, 407.77, 407.36, 407.45, 408.21, 408.06, 409.2, 410.79, 411.35], '1W': [382.07, 393.94, 376.71, 392.9, 411.35], '1M': [420.71, 411.07, 417.76, 414.57, 414.14, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35], 'YTD': [346.1, 332.48, 339.89, 325.49, 330.73, 308.05, 342.76, 333.51, 332.31, 317.53, 342.58, 321.31, 318.29, 293.41, 333.97, 380.78, 399.63, 418.2, 416.5, 430, 425.19, 414.57, 446.77, 385.73, 385.57, 411.35], '6M': [329.88, 352.13, 343.42, 352.21, 332.6, 332.79, 320.33, 340.44, 333.51, 332.31, 317.53, 341.57, 315.93, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 417.76, 426.58, 418.91, 385.57, 411.35], '1Y': [249.99, 269.35, 274.18, 275.6, 288.21, 294.3, 288.64, 304.97, 306.34, 294, 297.39, 345.65, 364.09, 338.79, 327.9, 335.49, 324.63, 349.33, 354.13, 369.63, 349.43, 342.46, 340.2, 386.08, 401.1, 339.81, 340.36, 349.39, 343.77, 354.61, 328.8, 333.24, 308.05, 342.76, 333.99, 321.7, 317.53, 341.57, 315.93, 318.81, 313.49, 354.91, 398.47, 419.94, 417.43, 412.56, 416.79, 417.76, 426.58, 418.91, 385.57, 411.35] },
      velocityScore: { '1D': 6.9, '1W': 6.2, '1M': -10.4, '6M': null }, isNew: false,
      marketCap: '$2.0T', pe: 68.4, revenueGrowth: 48, eps: 6.01, grossMargin: 76, dividendYield: 0.63,
      etfPresence: { AIS: 0.66, ARTY: 4.44, BAI: 4.25, IGPT: false, IVES: 4.62, ALAI: 4.13, CHAT: 4.12, AIFD: 5.53, SPRX: false, AOTG: 1.55 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'ANET', name: 'Arista Networks Inc', easyScore: 7, avgWeight: 2.09, proScore: 1.47, coverage: 0.7,
      price: 169.67, weeklyPrices: [163.24, 169.09, 168.01, 164.93, 169.67], weeklyChange: 3.94, dayChange: 2.87, sortRank: 0, periodReturns: { '1M': 19.7, 'YTD': 29.5, '6M': 36.1, '1Y': 96.7 },
      priceHistory: { '1D': [164.93, 169.81, 168.83, 169.75, 169.75, 169.04, 168.73, 168.87, 168.36, 169.27, 169.16, 169.25, 168.09, 168.35, 168.76, 168.92, 168.84, 168.85, 168.37, 168.73, 168.68, 168.79, 169.63, 169.67], '1W': [163.24, 169.09, 168.01, 164.93, 169.67], '1M': [141.71, 141.58, 140.49, 148.59, 154.03, 154.31, 155.27, 159.47, 170.68, 175.33, 174.37, 166.01, 154.27, 156.4, 152.16, 156.4, 163.24, 169.09, 168.01, 164.93, 169.67], 'YTD': [131.03, 123.72, 125.09, 138.41, 148.15, 130.28, 140.66, 139.54, 132.89, 134.83, 139.62, 133.07, 130.8, 116.13, 133.64, 154.37, 166.85, 172.47, 172.62, 141.77, 141.97, 148.59, 159.47, 154.27, 156.4, 169.67], '6M': [124.62, 131.84, 137.19, 123.42, 127.52, 146.69, 139.39, 143.45, 139.54, 132.89, 134.83, 138.23, 136.07, 130.8, 122.78, 145.07, 154.33, 177.73, 168.68, 147.06, 140.69, 140.49, 155.27, 166.01, 156.4, 169.67], '1Y': [86.25, 99.39, 101.47, 108.37, 111.61, 117.55, 117.57, 139.18, 137.3, 133.25, 136.55, 140.01, 145.43, 145.4, 143.37, 149.5, 154.1, 143.1, 153.82, 157.69, 134.65, 131.37, 117.43, 128.11, 129.11, 125.89, 131.12, 134.15, 132.58, 129.93, 127.29, 150.15, 130.28, 140.66, 137.23, 130.25, 134.83, 138.23, 136.07, 135.01, 124.85, 146.05, 161.01, 172.55, 172.71, 141.75, 140.69, 140.49, 155.27, 166.01, 156.4, 169.67] },
      velocityScore: { '1D': 9.7, '1W': -9.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$214B', pe: 58.1, revenueGrowth: 35, eps: 2.92, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: 1.38, ARTY: 2.33, BAI: 1.35, IGPT: false, IVES: false, ALAI: 0.96, CHAT: 2.12, AIFD: 4.93, SPRX: 1.58, AOTG: false },
      tonyNote: 'Arista Networks Inc appears in 7 of 10 AI & ML ETFs (70% coverage) with average weight 2.1% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 6, avgWeight: 4.92, proScore: 2.95, coverage: 0.6,
      price: 462.12, weeklyPrices: [423.93, 441.40, 425.83, 432.15, 462.12], weeklyChange: 9.01, dayChange: 6.94, sortRank: 0, periodReturns: { '1M': 16.7, 'YTD': 52.1, '6M': 62.3, '1Y': 120.6 },
      priceHistory: { '1D': [432.15, 446.99, 449.93, 449.07, 450.65, 453.1, 452.18, 451.31, 451.53, 453.84, 454.19, 455.15, 454.76, 457.22, 457.76, 459.14, 459.3, 460.47, 460.26, 460.73, 460.8, 460.2, 462.84, 462.12], '1W': [423.93, 441.4, 425.83, 432.15, 462.12], '1M': [395.95, 392.61, 401.62, 407.15, 404.52, 422.73, 424.86, 418.45, 435.63, 446.69, 436.69, 444.92, 415.17, 426.8, 427.92, 421.07, 423.93, 441.4, 425.83, 432.15, 462.12], 'YTD': [303.89, 318.01, 327.11, 327.37, 339.55, 325.74, 374.09, 362.26, 387.73, 357.44, 347.09, 345.98, 343.25, 316.5, 345.32, 379.89, 366.24, 404.98, 401.61, 411.68, 404.35, 407.15, 418.45, 415.17, 421.07, 462.12], '6M': [284.68, 302.84, 322.25, 331.77, 327.16, 338.34, 335.75, 361.91, 362.26, 387.73, 357.44, 354.56, 339.57, 343.25, 337.95, 365.9, 375.1, 387.44, 393.83, 419.5, 399.8, 401.62, 424.86, 444.92, 421.07, 462.12], '1Y': [209.51, 228.57, 229.17, 228.67, 238.85, 242.75, 235.21, 241.83, 238.88, 232.99, 230.87, 247.19, 261.38, 272.63, 273.23, 302.4, 280.66, 295.08, 294.96, 300.43, 286.5, 284.82, 275.06, 287.68, 301.87, 287.74, 288.95, 300.92, 327.43, 331.21, 326.12, 342.3, 325.74, 374.09, 360.39, 376.81, 357.44, 354.56, 339.57, 347.75, 341.49, 365.49, 363.35, 382.66, 396.06, 414.15, 399.8, 401.62, 424.86, 444.92, 421.07, 462.12] },
      velocityScore: { '1D': 3.9, '1W': 3.1, '1M': -4.2, '6M': null }, isNew: false,
      marketCap: '$2.4T', pe: 39.7, revenueGrowth: 35, eps: 11.65, grossMargin: 62, dividendYield: 0.82,
      etfPresence: { AIS: 3.21, ARTY: false, BAI: 4.34, IGPT: false, IVES: 5.34, ALAI: 5.66, CHAT: false, AIFD: 3.41, SPRX: false, AOTG: 7.55 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 4.55, proScore: 2.73, coverage: 0.6,
      price: 368.03, weeklyPrices: [359.68, 369.35, 373.25, 363.79, 368.03], weeklyChange: 2.32, dayChange: 1.17, sortRank: 0, periodReturns: { '1M': -7.3, 'YTD': 17.6, '6M': 21.7, '1Y': 120.9 },
      priceHistory: { '1D': [363.79, 359.41, 362.07, 362.68, 363.13, 364.04, 363.53, 364, 365.22, 365.5, 365.45, 366.45, 366.71, 366.47, 367.85, 367.64, 368.33, 367.84, 367.51, 368.47, 367.22, 367.62, 369.28, 368.03], '1W': [359.68, 369.35, 373.25, 363.79, 368.03], '1M': [396.94, 387.66, 388.91, 387.66, 382.97, 388.83, 390.13, 380.34, 376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 364.26, 357.77, 359.68, 369.35, 373.25, 363.79, 368.03], 'YTD': [313, 325.44, 335.84, 330.54, 338.25, 333.04, 310.96, 303.33, 312.9, 303.13, 307.04, 310.92, 290.44, 273.5, 305.46, 332.91, 337.42, 350.34, 383.25, 400.8, 396.78, 387.66, 380.34, 368.53, 357.77, 368.03], '6M': [302.46, 313.51, 316.54, 331.86, 322, 334.55, 339.71, 318.58, 303.33, 312.9, 303.13, 308.7, 307.69, 290.44, 287.56, 317.32, 337.12, 339.32, 349.94, 398.04, 402.62, 388.91, 390.13, 372.19, 357.77, 368.03], '1Y': [166.64, 178.53, 176.79, 181.56, 190.1, 192.58, 189.13, 201.42, 203.9, 206.09, 212.91, 234.04, 251.61, 252.53, 244.05, 250.43, 236.57, 253.3, 259.92, 281.19, 278.83, 276.41, 299.66, 314.89, 313.72, 308.22, 307.16, 313.56, 314.34, 335.97, 328.38, 336.01, 333.04, 310.96, 302.85, 307.38, 303.13, 308.7, 307.69, 290.93, 297.39, 318.49, 336.02, 338.89, 384.8, 397.99, 402.62, 388.91, 390.13, 372.19, 357.77, 368.03] },
      velocityScore: { '1D': -3.2, '1W': -3.9, '1M': -28.3, '6M': null }, isNew: false,
      marketCap: '$4.5T', pe: 28.1, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.17, IGPT: 5.62, IVES: 4.5, ALAI: false, CHAT: 5.07, AIFD: 4.94, SPRX: false, AOTG: 4.01 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 6, avgWeight: 3.9, proScore: 2.34, coverage: 0.6,
      price: 310.58, weeklyPrices: [279.70, 308.88, 278.67, 289.54, 310.58], weeklyChange: 11.04, dayChange: 7.27, sortRank: 0, periodReturns: { '1M': 83.9, 'YTD': 265.5, '6M': 267.7, '1Y': 322.5 },
      priceHistory: { '1D': [289.54, 307.2, 314.01, 317.6, 320.13, 325.04, 323.82, 324.48, 321.65, 324.55, 327.35, 324.45, 323.8, 324.2, 325.78, 329.32, 325.58, 324.98, 323.57, 322.92, 326.39, 328.78, 327.86, 310.58], '1W': [279.7, 308.88, 278.67, 289.54, 310.58], '1M': [168.93, 176.27, 186.8, 190.69, 196.33, 198.7, 204.83, 205, 219.43, 290.79, 301.65, 316.43, 263.47, 288.85, 266.88, 280.71, 279.7, 308.88, 278.67, 289.54, 310.58], 'YTD': [84.98, 83.45, 81.21, 83.1, 81.34, 73.73, 81.34, 79.09, 80.92, 78.09, 93.3, 90.79, 92.36, 87.81, 109.38, 133.83, 147.84, 158.21, 163.66, 170.13, 176.89, 190.69, 205, 263.47, 280.71, 310.58], '6M': [84.47, 86.34, 90.23, 82.89, 79.8, 82.93, 75.54, 82.01, 79.09, 80.92, 78.09, 90.44, 87.62, 92.36, 99.05, 114.45, 134.6, 157.32, 156.57, 172.15, 177.95, 186.8, 204.83, 316.43, 280.71, 310.58], '1Y': [73.51, 77.16, 71.55, 72.51, 73.06, 75.91, 74.45, 77.34, 76.19, 73, 62.87, 66, 67.43, 75.53, 82.39, 88.92, 85.61, 87.95, 84.13, 93.74, 90.92, 86.45, 77.45, 91.1, 92, 84.26, 84.09, 85.76, 88.23, 83.05, 82.55, 83.62, 73.73, 81.34, 79.61, 79.29, 78.09, 90.44, 87.62, 98.45, 106.71, 119.93, 133.37, 165.56, 165.15, 160.01, 177.95, 186.8, 204.83, 316.43, 280.71, 310.58] },
      velocityScore: { '1D': -14.3, '1W': -14.9, '1M': 1.3, '6M': null }, isNew: false,
      marketCap: '$272B', pe: 106.4, revenueGrowth: 28, eps: 2.92, grossMargin: 52, dividendYield: 0.08,
      etfPresence: { AIS: 4.25, ARTY: 4.54, BAI: 2.05, IGPT: false, IVES: false, ALAI: false, CHAT: 1.6, AIFD: 6.54, SPRX: 4.45, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 6, avgWeight: 3.03, proScore: 1.82, coverage: 0.6,
      price: 746.23, weeklyPrices: [562.93, 653.53, 681.08, 712.13, 746.23], weeklyChange: 32.56, dayChange: 4.79, sortRank: 0, periodReturns: { '1M': 62.7, 'YTD': 333.2, '6M': 326.4, '1Y': 1158.6 },
      priceHistory: { '1D': [712.13, 790.36, 786.06, 783.76, 773.56, 770.57, 772.01, 774.04, 769.58, 762.15, 758.33, 753.26, 743.76, 751.17, 746.33, 744.85, 743.34, 741.61, 746.88, 745.57, 745.06, 751.68, 757, 746.23], '1W': [562.93, 653.53, 681.08, 712.13, 746.23], '1M': [458.68, 455.8, 459.62, 486.46, 484.28, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23], 'YTD': [172.27, 187.68, 215, 243.29, 278.41, 269.41, 273.74, 296.56, 290.95, 261.3, 266.22, 313.81, 301.05, 251.67, 311.96, 366.22, 374.11, 400.73, 442.36, 480, 482.02, 486.46, 531.21, 511.72, 529.29, 746.23], '6M': [175.01, 181.54, 187.88, 212.14, 222.97, 252.66, 290.24, 262.56, 296.56, 290.95, 261.3, 268.81, 304.9, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 459.62, 531.18, 575.5, 529.29, 746.23], '1Y': [59.29, 63.29, 65.22, 66.93, 68.74, 68.99, 76.55, 74.97, 75.06, 76.97, 80.34, 93.29, 102.39, 112.41, 116.74, 125.28, 115.42, 126.2, 129.43, 150.21, 162.96, 157.83, 139.19, 163.54, 169.78, 172.04, 181.08, 179.68, 219.38, 214, 241.9, 279.7, 269.41, 273.74, 284.67, 282.25, 261.3, 268.81, 304.9, 296.14, 297.73, 337.88, 361.69, 403.12, 434.52, 463.91, 494.09, 459.62, 531.18, 575.5, 529.29, 746.23] },
      velocityScore: { '1D': -1.6, '1W': 50.4, '1M': -5.2, '6M': null }, isNew: false,
      marketCap: '$257B', pe: 44.6, revenueGrowth: 46, eps: 16.72, grossMargin: 45, dividendYield: 0.08,
      etfPresence: { AIS: 1.58, ARTY: 3.28, BAI: 3.7, IGPT: 4, IVES: false, ALAI: 4.73, CHAT: false, AIFD: false, SPRX: false, AOTG: 0.87 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.36, proScore: 1.68, coverage: 0.5,
      price: 379.4, weeklyPrices: [390.74, 399.76, 393.83, 378.91, 379.40], weeklyChange: -2.9, dayChange: 0.13, sortRank: 0, periodReturns: { '1M': -10.4, 'YTD': -21.5, '6M': -21.6, '1Y': -20.5 },
      priceHistory: { '1D': [378.91, 373.67, 376.46, 379.29, 378.4, 377.14, 375.96, 375.17, 375.35, 377.01, 377.59, 379.21, 378.96, 380.74, 379.7, 379.89, 379.51, 378.54, 377.74, 378.21, 377.58, 378.03, 378.15, 379.4], '1W': [390.74, 399.76, 393.83, 378.91, 379.4], '1M': [423.54, 417.42, 421.06, 419.09, 418.57, 412.67, 426.99, 450.24, 460.52, 441.31, 427.34, 428.05, 416.67, 411.74, 403.41, 390.34, 390.74, 399.76, 393.83, 378.91, 379.4], 'YTD': [483.62, 478.11, 459.38, 451.14, 433.5, 414.19, 404.37, 399.6, 400.6, 405.2, 405.76, 399.41, 372.74, 358.96, 372.29, 393.11, 418.07, 424.82, 413.62, 415.12, 421.92, 419.09, 450.24, 416.67, 390.34, 379.4], '6M': [483.98, 487.71, 472.85, 477.18, 454.52, 480.58, 411.21, 413.27, 399.6, 400.6, 405.2, 404.88, 391.79, 372.74, 370.17, 374.33, 411.22, 432.92, 424.46, 413.96, 405.21, 421.06, 426.99, 428.05, 390.34, 379.4], '1Y': [477.4, 495.94, 497.72, 503.02, 510.06, 512.5, 524.11, 522.04, 520.17, 507.23, 506.69, 498.2, 515.36, 514.45, 514.6, 528.57, 510.96, 513.58, 523.61, 517.81, 496.82, 510.18, 472.12, 486.74, 491.02, 474.82, 485.92, 487.1, 478.51, 470.67, 444.11, 481.63, 414.19, 404.37, 398.46, 401.72, 405.2, 404.88, 391.79, 371.04, 369.37, 373.07, 420.26, 415.75, 407.78, 420.77, 405.21, 421.06, 426.99, 428.05, 390.34, 379.4] },
      velocityScore: { '1D': -0.6, '1W': -3.4, '1M': -35.1, '6M': null }, isNew: false,
      marketCap: '$2.8T', pe: 22.6, revenueGrowth: 18, eps: 16.81, grossMargin: 68, dividendYield: 0.96,
      etfPresence: { AIS: false, ARTY: 2.32, BAI: false, IGPT: false, IVES: 4.3, ALAI: 4.76, CHAT: 2.01, AIFD: false, SPRX: false, AOTG: 3.39 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 5, avgWeight: 3.2, proScore: 1.6, coverage: 0.5,
      price: 417.07, weeklyPrices: [367.15, 389.20, 361.71, 374.68, 417.07], weeklyChange: 13.6, dayChange: 11.31, sortRank: 0, periodReturns: { '1M': 93.5, 'YTD': 150.7, '6M': 185.9, '1Y': 348.1 },
      priceHistory: { '1D': [374.68, 387.38, 394.14, 401.3, 407.37, 409.39, 412.1, 413.04, 412.54, 419, 419.23, 419.8, 418.48, 415.4, 420.55, 419.89, 414.01, 413.34, 412.95, 412.81, 412.54, 411.86, 414.39, 417.07], '1W': [367.15, 389.2, 361.71, 374.68, 417.07], '1M': [215.58, 244.26, 287.48, 297.84, 306.88, 325.33, 349.17, 342.85, 320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 367.47, 367.15, 389.2, 361.71, 374.68, 417.07], 'YTD': [166.36, 156.73, 172.14, 176.35, 160.46, 144.67, 143.71, 129.58, 128.15, 113.77, 116.48, 127.57, 121.76, 100.27, 118.99, 170.6, 175.8, 196.64, 201.25, 199.79, 232.68, 297.84, 342.85, 317.06, 367.47, 417.07], '6M': [145.88, 167.26, 167.11, 172.57, 183.75, 170.93, 158.52, 182.86, 129.58, 128.15, 113.77, 124.71, 126.34, 121.76, 109.6, 125.46, 172.09, 194.06, 196.85, 213.91, 224.09, 287.48, 349.17, 358.05, 367.47, 417.07], '1Y': [93.07, 91.02, 89.62, 90.32, 121.89, 124.05, 131.1, 179.28, 185.85, 179.09, 182.2, 216.1, 231.29, 237.3, 198.8, 220.81, 206.21, 159.8, 164.97, 186.68, 165.49, 144.34, 141.8, 165.19, 175.74, 143.66, 164.4, 170.1, 161.01, 180.56, 176.01, 167.9, 144.67, 143.71, 132.62, 124.67, 113.77, 124.71, 126.34, 120.33, 106.33, 129.46, 170.81, 197.54, 194.74, 195.65, 224.09, 287.48, 349.17, 358.05, 367.47, 417.07] },
      velocityScore: { '1D': 1.9, '1W': 2.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$71B', pe: 285.7, revenueGrowth: 93, eps: 1.46, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 2.02, ARTY: 1.31, BAI: false, IGPT: false, IVES: false, ALAI: 1.41, CHAT: 2.77, AIFD: false, SPRX: 8.51, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 5, avgWeight: 3.09, proScore: 1.55, coverage: 0.5,
      price: 577.22, weeklyPrices: [566.98, 593.48, 600.21, 567.58, 577.22], weeklyChange: 1.81, dayChange: 1.7, sortRank: 0, periodReturns: { '1M': -5.6, 'YTD': -12.6, '6M': -13.1, '1Y': -15.4 },
      priceHistory: { '1D': [567.58, 563.53, 571.05, 572.19, 570.55, 571.2, 571.52, 572.99, 573.88, 575.48, 576.24, 577.52, 577.21, 577.42, 577.9, 577.2, 575.78, 573.94, 574.49, 576.25, 573.9, 574.68, 575.45, 577.22], '1W': [566.98, 593.48, 600.21, 567.58, 577.22], '1M': [611.21, 602.61, 605.06, 607.38, 610.26, 635.26, 635.29, 632.51, 600.47, 597.63, 622.98, 627.57, 593, 585.39, 584.59, 568.43, 566.98, 593.48, 600.21, 567.58, 577.22], 'YTD': [660.09, 646.06, 615.52, 647.63, 738.31, 668.99, 668.69, 643.22, 653.69, 667.73, 654.07, 622.66, 592.92, 536.38, 575.05, 662.49, 670.91, 678.62, 610.41, 609.63, 614.23, 607.38, 632.51, 593, 568.43, 577.22], '6M': [664.45, 663.29, 658.79, 641.97, 604.12, 672.97, 691.7, 670.72, 643.22, 653.69, 667.73, 654.86, 615.68, 592.92, 572.13, 612.42, 671.58, 674.72, 669.12, 612.88, 616.63, 605.06, 635.29, 627.57, 568.43, 577.22], '1Y': [682.35, 733.63, 718.35, 720.92, 712.97, 717.63, 750.01, 769.3, 785.23, 754.79, 738.7, 752.3, 764.7, 765.16, 743.4, 715.66, 705.3, 716.92, 738.36, 648.35, 621.71, 609.46, 594.25, 640.87, 666.8, 647.51, 658.77, 658.69, 660.62, 631.09, 612.96, 668.73, 668.99, 668.69, 644.78, 657.01, 667.73, 654.86, 615.68, 594.89, 579.23, 628.39, 676.87, 659.15, 611.91, 616.81, 616.63, 605.06, 635.29, 627.57, 568.43, 577.22] },
      velocityScore: { '1D': -3.1, '1W': -4.3, '1M': -43.6, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 21, revenueGrowth: 33, eps: 27.48, grossMargin: 82, dividendYield: 0.36,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: 4.2, IVES: 4.34, ALAI: 3.87, CHAT: 1.97, AIFD: false, SPRX: false, AOTG: 1.09 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 5, avgWeight: 2.6, proScore: 1.3, coverage: 0.5,
      price: 850, weeklyPrices: [921.56, 957.24, 875.36, 869.98, 850.00], weeklyChange: -7.77, dayChange: -2.3, sortRank: 0, periodReturns: { '1M': -4, 'YTD': 130.6, '6M': 152.1, '1Y': 848 },
      priceHistory: { '1D': [869.98, 871, 851.95, 858.55, 873.26, 873.96, 868.95, 857.01, 859.25, 857.78, 859.32, 846.43, 844, 847.6, 843.25, 839.42, 837.37, 837.95, 834.59, 835.86, 836.34, 837.85, 848.54, 850], '1W': [921.56, 957.24, 875.36, 869.98, 850], '1M': [884.98, 890.09, 868.07, 964.5, 946.9, 902.31, 860.62, 854.96, 905, 1029.15, 938, 945.08, 863.66, 895.4, 821.76, 889.59, 921.56, 957.24, 875.36, 869.98, 850], 'YTD': [368.59, 348.26, 331.62, 354.49, 381.44, 465.54, 574.11, 594.26, 723.39, 680.8, 672, 649.56, 801.99, 654.79, 815.75, 852.79, 895.11, 859.68, 976.18, 903.8, 970.7, 964.5, 854.96, 863.66, 889.59, 850], '6M': [337.13, 390.77, 357.05, 339.87, 356.83, 370.66, 435.1, 561.13, 594.26, 723.39, 680.8, 672, 700.81, 801.99, 702.76, 896.02, 824.01, 873.6, 858.32, 944.28, 1030.37, 868.07, 860.62, 945.08, 889.59, 850], '1Y': [89.66, 94.75, 91.08, 92.24, 103.84, 107.17, 106.68, 116.27, 115.86, 119.34, 132.81, 149.4, 168.77, 164.71, 162.58, 160.6, 149.61, 164.77, 179.3, 201.56, 240.11, 232.15, 255.59, 317.93, 342.56, 334.69, 371.43, 372.61, 397.42, 361.33, 362.44, 385, 465.54, 574.11, 635.64, 677, 680.8, 672, 700.81, 777.17, 764.65, 894.13, 891.22, 846.89, 902.32, 892.58, 1030.37, 868.07, 860.62, 945.08, 889.59, 850] },
      velocityScore: { '1D': -4.4, '1W': -13.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$66B', pe: 149.1, revenueGrowth: 90, eps: 5.7, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.45, IGPT: false, IVES: false, ALAI: 0.38, CHAT: 1.32, AIFD: 5.62, SPRX: 3.24, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 5 of 10 AI & ML ETFs (50% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'Credo Technology Group Holding Ltd', easyScore: 5, avgWeight: 1.94, proScore: 0.97, coverage: 0.5,
      price: 271.83, weeklyPrices: [250.81, 259.41, 239.18, 249.33, 271.83], weeklyChange: 8.38, dayChange: 9.02, sortRank: 0, periodReturns: { '1M': 73.9, 'YTD': 88.9, '6M': 96.2, '1Y': 217.9 },
      priceHistory: { '1D': [249.33, 258.77, 253.95, 264.16, 266.46, 265.07, 267.13, 264.23, 262.47, 265.87, 263.93, 262.25, 262.1, 261.14, 262.04, 262.99, 262.64, 262.11, 262.66, 263.55, 264.64, 265.61, 270.1, 271.83], '1W': [250.81, 259.41, 239.18, 249.33, 271.83], '1M': [156.27, 168.99, 182.98, 193.39, 218.41, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 217.5, 206.89, 222.27, 234.32, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83], 'YTD': [143.89, 141.59, 156.84, 135.1, 129.47, 96.95, 128.4, 127.91, 123.46, 102.54, 112.33, 104.06, 100.3, 87.81, 106.79, 159.52, 174.53, 180.5, 180.06, 188.51, 172.17, 193.39, 236.03, 206.89, 264.76, 271.83], '6M': [138.57, 144.83, 140.24, 156.07, 153.22, 129.57, 111.31, 134.72, 127.91, 123.46, 102.54, 115.91, 101.72, 100.3, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 189.36, 182.98, 222.35, 217.5, 264.76, 271.83], '1Y': [85.51, 93.49, 92.73, 98.7, 95.74, 107.95, 107.56, 120.41, 116.74, 114.04, 123.06, 147.53, 163.98, 164.1, 146.01, 147.42, 138.83, 143.61, 155.55, 187.62, 163.61, 145.52, 133.49, 171.13, 178.94, 142.02, 150.13, 144.7, 132.95, 161.38, 139.16, 129.66, 96.95, 128.4, 130.66, 114.48, 102.54, 115.91, 101.72, 103.91, 95.92, 107.93, 158.93, 185.54, 174.01, 188.29, 189.36, 182.98, 222.35, 217.5, 264.76, 271.83] },
      velocityScore: { '1D': 6.6, '1W': 1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$51B', pe: 108.7, revenueGrowth: 157, eps: 2.5, grossMargin: 68, dividendYield: null,
      etfPresence: { AIS: 1.07, ARTY: 1.24, BAI: 2.09, IGPT: false, IVES: false, ALAI: false, CHAT: 2.23, AIFD: false, SPRX: 3.07, AOTG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 4, avgWeight: 3.85, proScore: 1.54, coverage: 0.4,
      price: 244.39, weeklyPrices: [238.55, 246.02, 246.00, 237.50, 244.39], weeklyChange: 2.45, dayChange: 2.9, sortRank: 0, periodReturns: { '1M': -7.7, 'YTD': 5.9, '6M': 7.8, '1Y': 16.5 },
      priceHistory: { '1D': [237.5, 236.45, 238.85, 240.18, 240.06, 239.82, 241.42, 242.35, 242.47, 243.12, 242.57, 244.03, 243.53, 244.56, 245.29, 244.55, 243.72, 242.91, 242.91, 243.15, 242.78, 243.07, 242.78, 244.39], '1W': [238.55, 246.02, 246, 237.5, 244.39], '1M': [264.86, 259.34, 265.01, 268.46, 266.32, 271.85, 274, 270.64, 261.26, 256.52, 250.02, 253.79, 246.03, 245.22, 244.19, 241.51, 238.55, 246.02, 246, 237.5, 244.39], 'YTD': [230.82, 246.29, 236.65, 234.34, 241.73, 232.99, 204.08, 204.79, 210.64, 216.82, 214.33, 215.2, 207.24, 200.95, 213.77, 249.02, 248.28, 261.12, 272.05, 272.68, 264.14, 268.46, 270.64, 246.03, 241.51, 244.39], '6M': [226.76, 232.52, 233.06, 246.47, 231, 244.68, 238.62, 206.96, 204.79, 210.64, 216.82, 212.65, 209.87, 207.24, 208.27, 221.25, 248.5, 255.36, 263.04, 274.99, 270.13, 265.01, 274, 253.79, 241.51, 244.39], '1Y': [209.69, 223.3, 223.47, 225.69, 229.3, 232.79, 214.75, 222.69, 231.03, 228.84, 229, 235.84, 231.43, 227.63, 222.17, 220.9, 216.37, 213.04, 224.21, 244.22, 244.41, 234.69, 220.69, 233.88, 226.89, 222.54, 227.35, 232.07, 240.93, 242.6, 231.31, 243.01, 232.99, 204.08, 204.86, 207.92, 216.82, 212.65, 209.87, 211.71, 210.57, 233.65, 249.7, 255.08, 265.06, 271.17, 270.13, 265.01, 274, 253.79, 241.51, 244.39] },
      velocityScore: { '1D': -22.6, '1W': -23, '1M': -49.2, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 31.7, revenueGrowth: 17, eps: 7.72, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 4.32, ALAI: 5.45, CHAT: 2.28, AIFD: 3.36, SPRX: false, AOTG: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 4, avgWeight: 3.79, proScore: 1.52, coverage: 0.4,
      price: 133.99, weeklyPrices: [124.57, 127.86, 117.05, 121.10, 133.99], weeklyChange: 7.56, dayChange: 10.64, sortRank: 0, periodReturns: { '1M': 23.9, 'YTD': 263.1, '6M': 269.3, '1Y': 535.6 },
      priceHistory: { '1D': [121.1, 133.09, 130.84, 129.89, 129.78, 130.23, 132.49, 132.1, 131.11, 132.65, 132.25, 133.63, 133.6, 133.93, 134.26, 133.86, 133.32, 134.62, 133.85, 134.09, 133.97, 134.27, 134.41, 133.99], '1W': [124.57, 127.86, 117.05, 121.1, 133.99], '1M': [108.17, 110.8, 118.96, 118.5, 119.84, 121.77, 120.89, 114.68, 109.33, 107.93, 112.71, 111.78, 99.17, 110.27, 107.92, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99], 'YTD': [36.9, 41.11, 48.72, 54.32, 48.66, 48.6, 48.29, 45.46, 46.88, 45.58, 46.78, 44.06, 44.06, 41.19, 52.91, 63.81, 65.7, 84.99, 95.78, 124.92, 108.77, 118.5, 114.68, 99.17, 116.96, 133.99], '6M': [36.28, 36.2, 39.37, 44.06, 48.56, 43.93, 49.25, 47.13, 45.46, 46.88, 45.58, 47.98, 45.03, 44.06, 44.13, 58.95, 64.94, 65.27, 94.75, 113.01, 120.29, 118.96, 120.89, 111.78, 116.96, 133.99], '1Y': [21.08, 22.69, 22, 23.3, 23.26, 20.68, 19.31, 19.95, 24.56, 24.8, 24.35, 24.48, 24.77, 28.76, 34.48, 36.59, 36.37, 37.01, 38.28, 39.99, 38.13, 35.52, 34.5, 40.01, 40.3, 37.51, 36.82, 36.68, 40.04, 47.29, 54.25, 48.78, 48.6, 48.29, 44.62, 45.46, 45.58, 47.98, 45.03, 47.18, 48.03, 61.72, 68.5, 66.78, 94.48, 109.62, 120.29, 118.96, 120.89, 111.78, 116.96, 133.99] },
      velocityScore: { '1D': 6.3, '1W': -0.7, '1M': -47.6, '6M': null }, isNew: false,
      marketCap: '$673B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.43, ARTY: false, BAI: 3.11, IGPT: 7.36, IVES: false, ALAI: false, CHAT: 1.27, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'ARM', name: 'ARM Holdings PLC', easyScore: 4, avgWeight: 3.75, proScore: 1.5, coverage: 0.4,
      price: 439.46, weeklyPrices: [380.81, 412.55, 396.34, 418.88, 439.46], weeklyChange: 15.4, dayChange: 4.91, sortRank: 0, periodReturns: { '1M': 104.3, 'YTD': 302, '6M': 287.2, '1Y': 203 },
      priceHistory: { '1D': [418.88, 445.32, 439.17, 439.66, 442.11, 444.48, 446.36, 443.5, 441.5, 443, 444.46, 430.76, 429.08, 431.7, 430.21, 430.51, 425.09, 427.27, 432.2, 431.95, 431.85, 436.8, 437.69, 439.46], '1W': [380.81, 412.55, 396.34, 418.88, 439.46], '1M': [215.12, 223.15, 256.73, 298.23, 306.51, 302.71, 335.27, 353.29, 408.85, 402.71, 411.83, 393.44, 342.93, 346.39, 324.86, 342.23, 380.81, 412.55, 396.34, 418.88, 439.46], 'YTD': [109.31, 113.08, 104.99, 119.2, 108.43, 104.9, 125.28, 127.24, 131.74, 124.11, 120.55, 127.31, 134.96, 136.96, 143.86, 161.22, 175.1, 215.88, 203.26, 213.27, 209.16, 298.23, 353.29, 342.93, 342.23, 439.46], '6M': [113.51, 110.27, 116.11, 111.14, 107.17, 114.88, 104.55, 125.95, 127.24, 131.74, 124.11, 120.1, 128.36, 134.96, 151.28, 148.91, 159.34, 196.57, 201.69, 237.3, 221.21, 256.73, 335.27, 393.44, 342.23, 439.46], '1Y': [145.04, 165.46, 146.88, 144.54, 161.92, 164.37, 137.58, 138.5, 138.91, 137.92, 138.31, 139.14, 153.86, 144.48, 139.8, 156.22, 154.81, 165.61, 170.68, 169.82, 152.38, 139.77, 131.57, 135.01, 139.78, 124.37, 114.03, 110.51, 115.53, 107.84, 113.92, 109.96, 104.9, 125.28, 126.93, 129.26, 124.11, 120.1, 128.36, 157.07, 155.07, 149.79, 162.33, 204.61, 210.32, 213.31, 221.21, 256.73, 335.27, 393.44, 342.23, 439.46] },
      velocityScore: { '1D': null, '1W': 15.4, '1M': null, '6M': null }, isNew: true,
      marketCap: '$469B', pe: 529.5, revenueGrowth: 20, eps: 0.83, grossMargin: 98, dividendYield: null,
      etfPresence: { AIS: 2.27, ARTY: false, BAI: false, IGPT: false, IVES: false, ALAI: 0.55, CHAT: 3.12, AIFD: false, SPRX: 9.04, AOTG: false },
      tonyNote: 'Arm Holdings is held across Broad Tech and AI ETFs as the CPU architecture licensor embedded in every mobile device and increasingly in AI inference chips and data center CPUs. Revenue grew and the royalty model is high-margin; the weight score reflects consistent institutional positioning as the AI chip design ecosystem expands on Arm cores.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 4, avgWeight: 2.96, proScore: 1.19, coverage: 0.4,
      price: 333.05, weeklyPrices: [302.87, 311.93, 299.60, 317.58, 333.05], weeklyChange: 9.96, dayChange: 4.87, sortRank: 0, periodReturns: { '1M': -2, 'YTD': 105.6, '6M': 115.7, '1Y': 181 },
      priceHistory: { '1D': [317.58, 332.86, 331.25, 331.93, 334.54, 335.04, 336.23, 334.36, 332.9, 333.42, 333.69, 333.58, 333.39, 334.06, 332.99, 333.31, 332.27, 331.77, 331.82, 331.13, 330.96, 331.84, 334.29, 333.05], '1W': [302.87, 311.93, 299.6, 317.58, 333.05], '1M': [339.73, 322.63, 315.67, 323.4, 327.46, 319.78, 314.18, 315.71, 323.39, 334.49, 331.44, 323.92, 300.51, 300.57, 289.52, 297.88, 302.87, 311.93, 299.6, 317.58, 333.05], 'YTD': [162.01, 160.78, 170.86, 181.12, 195.1, 182.56, 248.51, 243.21, 262.19, 251.28, 270.06, 268.41, 270.89, 234.22, 262.3, 310.51, 314.41, 322.43, 330.97, 339.97, 370.94, 323.4, 315.71, 300.51, 297.88, 333.05], '6M': [154.39, 167.58, 173.95, 170.03, 175.18, 189.21, 190.15, 199.62, 243.21, 262.19, 251.28, 268.26, 264.71, 270.89, 250.58, 281.03, 301.16, 305.14, 306.18, 358.92, 369.99, 315.67, 314.18, 323.92, 297.88, 333.05], '1Y': [118.54, 127.16, 126.26, 124.72, 126.21, 142.55, 141.59, 139.93, 133.07, 125.97, 127.55, 121.82, 138.26, 151.96, 143.31, 162.8, 169.01, 174, 186.06, 192.86, 179.8, 170.97, 159.83, 179.22, 185.61, 161.74, 159.82, 165.62, 174.95, 172.72, 181.47, 193.76, 182.56, 248.51, 243.06, 259.23, 251.28, 268.26, 264.71, 276.16, 259.37, 287.64, 294.13, 321.75, 328.49, 340.01, 369.99, 315.67, 314.18, 323.92, 297.88, 333.05] },
      velocityScore: { '1D': 3.5, '1W': null, '1M': -40.5, '6M': null }, isNew: false,
      marketCap: '$128B', pe: 83.3, revenueGrowth: 30, eps: 4, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 3.57, ARTY: false, BAI: 1.9, IGPT: false, IVES: false, ALAI: false, CHAT: 2.21, AIFD: 4.18, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'CRWV', name: 'COREWEAVE INC CLASS A', easyScore: 4, avgWeight: 2.89, proScore: 1.15, coverage: 0.4,
      price: 117.95, weeklyPrices: [100.55, 106.71, 117.03, 115.21, 117.95], weeklyChange: 17.3, dayChange: 2.38, sortRank: 0, periodReturns: { '1M': 13.7, 'YTD': 64.7, '6M': 74.3, '1Y': -35.8 },
      priceHistory: { '1D': [115.21, 117.53, 117.82, 118.43, 118.42, 118.36, 119.29, 118.25, 117.32, 117.85, 117.53, 117.5, 116.64, 116.35, 116.13, 116.21, 115.81, 115.77, 115.25, 115.03, 114.87, 115.89, 116.72, 117.95], '1W': [100.55, 106.71, 117.03, 115.21, 117.95], '1M': [103.77, 99.81, 101.28, 107.58, 105.49, 104.27, 106.86, 109.53, 124.82, 119.27, 110.93, 108.03, 100.39, 102.37, 98.45, 95.74, 100.55, 106.71, 117.03, 115.21, 117.95], 'YTD': [71.61, 77.09, 89.8, 91.79, 99.53, 82.46, 95.15, 95.45, 98.01, 79.5, 74.92, 82.12, 83.02, 69.15, 85.24, 117.2, 117.43, 112.06, 125.43, 114.15, 107.3, 107.58, 109.53, 100.39, 95.74, 117.95], '6M': [67.68, 76.42, 76.86, 89.93, 95.22, 108.86, 90.06, 95.11, 95.45, 98.01, 79.5, 81.96, 82.82, 83.02, 77.47, 88.9, 118.69, 122.54, 114.19, 137.98, 111.31, 101.28, 106.86, 108.03, 95.74, 117.95], '1Y': [183.58, 159.99, 159.7, 132.38, 124.91, 110.28, 104.14, 129.55, 99.97, 93.99, 103.04, 93.55, 120.47, 133.23, 122.52, 133.85, 138.43, 136.87, 132.55, 133.71, 104.01, 77.36, 71.65, 77.06, 86.24, 72.35, 83, 74.92, 77.94, 87.48, 94.05, 106.02, 82.46, 95.15, 97.14, 97.63, 79.5, 81.96, 82.82, 87.58, 78.44, 92, 119.56, 117.42, 111.6, 128.84, 111.31, 101.28, 106.86, 108.03, 95.74, 117.95] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$64B', pe: null, revenueGrowth: 112, eps: -2.72, grossMargin: 69, dividendYield: null,
      etfPresence: { AIS: false, ARTY: 4.86, BAI: 1.39, IGPT: false, IVES: 2.41, ALAI: false, CHAT: 2.88, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'COREWEAVE INC CLASS A appears in 4 of 10 AI & ML ETFs (40% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 4, avgWeight: 2.88, proScore: 1.15, coverage: 0.4,
      price: 184.29, weeklyPrices: [184.13, 192.64, 188.33, 183.53, 184.29], weeklyChange: 0.09, dayChange: 0.41, sortRank: 0, periodReturns: { '1M': -1.2, 'YTD': -5.4, '6M': 2.4, '1Y': -10.2 },
      priceHistory: { '1D': [183.53, 179.71, 181.41, 182.34, 183.7, 184.76, 184.68, 184.31, 183.46, 184.97, 185.12, 185.12, 185.07, 186.45, 186.71, 187.65, 186.59, 185.89, 184.93, 185, 184.36, 184.59, 185.04, 184.29], '1W': [184.13, 192.64, 188.33, 183.53, 184.29], '1M': [186.61, 181.46, 188.16, 189.77, 192.08, 190.96, 203.7, 225.78, 248.15, 244.58, 230.33, 236.34, 213.68, 211.82, 205.81, 184.1, 184.13, 192.64, 188.33, 183.53, 184.29], 'YTD': [194.91, 189.65, 193.61, 178.18, 169.01, 146.67, 157.16, 156.17, 147.89, 152.37, 149.4, 154.69, 147.09, 138.8, 143.17, 163, 177.58, 172.96, 180.29, 195.95, 192.95, 189.77, 225.78, 213.68, 184.1, 184.29], '6M': [180.03, 197.99, 192.59, 204.68, 179.92, 174.9, 154.67, 159.89, 156.17, 147.89, 152.37, 163.12, 152.9, 147.09, 147.11, 143.66, 169.81, 187.5, 163.83, 194.03, 189.76, 188.16, 203.7, 236.34, 184.1, 184.29], '1Y': [205.17, 210.24, 232.26, 229.28, 243.54, 247.71, 244.42, 250.05, 248.28, 236.37, 226.13, 238.48, 302.14, 328.15, 282.76, 291.59, 292.96, 291.31, 283.33, 262.61, 239.26, 222.85, 198.76, 200.94, 220.54, 184.92, 191.97, 195.38, 193.75, 202.29, 173.88, 172.8, 146.67, 157.16, 156.54, 150.31, 152.37, 163.12, 152.9, 146.02, 145.23, 137.86, 178.34, 176.28, 161.39, 194.59, 189.76, 188.16, 203.7, 236.34, 184.1, 184.29] },
      velocityScore: { '1D': -0.9, '1W': -3.4, '1M': -38.8, '6M': null }, isNew: false,
      marketCap: '$530B', pe: 31.7, revenueGrowth: 21, eps: 5.82, grossMargin: 66, dividendYield: 1.09,
      etfPresence: { AIS: false, ARTY: 3.68, BAI: false, IGPT: false, IVES: 3.62, ALAI: false, CHAT: 1.51, AIFD: false, SPRX: false, AOTG: 2.7 },
      tonyNote: 'Oracle lands in 3 AI ETFs on the strength of its cloud database and AI infrastructure contracts. Revenue grew 22%, 67% gross margin, P/E of 40x. The 17.5% weekly return following a major earnings beat shows how quickly sentiment can reprice; the weight score at 2.04% is still modest, meaning ETF managers have started building positions but conviction is not yet deep.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 5.41, proScore: 5.41, coverage: 1,
      price: 1133.99, weeklyPrices: [981.61, 1087.99, 1020.76, 1043.19, 1133.99], weeklyChange: 15.52, dayChange: 8.7, sortRank: 0, periodReturns: { '1M': 66.4, 'YTD': 297.3, '6M': 356.2, '1Y': 817.5 },
      priceHistory: { '1D': [1043.19, 1099, 1106.11, 1118.26, 1121.66, 1124.56, 1128.4, 1126.12, 1122.69, 1126.87, 1127.72, 1125.45, 1127.32, 1129.46, 1134.23, 1134.65, 1138.57, 1141.99, 1142.73, 1144.29, 1139.82, 1142.21, 1147.02, 1133.99], '1W': [981.61, 1087.99, 1020.76, 1043.19, 1133.99], '1M': [681.54, 698.74, 731.99, 762.1, 751, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99], 'YTD': [285.41, 327.02, 333.35, 397.58, 435.79, 379.4, 410.34, 420.95, 429, 400.77, 403.11, 461.69, 395.53, 321.8, 377.58, 465.66, 448.42, 524.56, 576.45, 746.81, 724.66, 762.1, 971, 864.01, 995.87, 1133.99], '6M': [248.55, 284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 418.69, 461.73, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 923.52, 996, 995.87, 1133.99], '1Y': [123.6, 124.76, 119.92, 118.61, 113.23, 111.25, 104.88, 118.89, 120.87, 117.68, 119.01, 131.46, 157.77, 164.62, 163.9, 190.96, 181.6, 202.38, 219.02, 223.77, 237.92, 246.83, 207.37, 240.46, 246.92, 237.5, 265.92, 294.37, 343.43, 338.13, 389.11, 435.28, 379.4, 410.34, 417.35, 415.56, 400.77, 418.69, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 517.16, 646.63, 803.63, 731.99, 923.52, 996, 995.87, 1133.99] },
      velocityScore: { '1D': -13.3, '1W': -10, '1M': -8, '6M': null }, isNew: false,
      marketCap: '$1.3T', pe: 53.5, revenueGrowth: 196, eps: 21.21, grossMargin: 58, dividendYield: 0.05,
      etfPresence: { SOXX: 8.39, PSI: 5.76, XSD: 3.82, DRAM: 3.68 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 5.39, proScore: 4.04, coverage: 0.75,
      price: 537.37, weeklyPrices: [511.57, 547.26, 507.29, 512.48, 537.37], weeklyChange: 5.04, dayChange: 4.86, sortRank: 0, periodReturns: { '1M': 27.6, 'YTD': 150.9, '6M': 167.3, '1Y': 319 },
      priceHistory: { '1D': [512.48, 530.56, 531.21, 533.45, 530.77, 531.82, 537.11, 531.59, 528.43, 534.62, 533.55, 533.53, 533.4, 534.02, 533.83, 534.64, 532.61, 532.99, 530.67, 531.39, 531.3, 531.07, 534.21, 537.37], '1W': [511.57, 547.26, 507.29, 512.48, 537.37], '1M': [420.99, 414.05, 447.58, 449.59, 467.51, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37], 'YTD': [214.16, 204.68, 223.6, 253.73, 252.18, 200.19, 213.58, 200.12, 210.86, 202.07, 203.23, 196.31, 205.37, 196.04, 221.53, 255.07, 274.95, 334.63, 341.54, 455.19, 424.1, 449.59, 516.1, 466.38, 488.45, 537.37], '6M': [201.06, 214.99, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 204.83, 199.46, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 518.09, 523.2, 488.45, 537.37], '1Y': [128.24, 143.81, 134.8, 146.24, 157, 173.66, 171.7, 172.76, 177.51, 167.76, 162.63, 151.41, 161.16, 159.79, 161.36, 203.71, 214.9, 233.08, 252.92, 256.12, 233.54, 246.81, 203.78, 219.76, 221.11, 207.58, 213.43, 215.61, 214.35, 220.97, 249.8, 252.74, 200.19, 213.58, 203.37, 203.68, 202.07, 204.83, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 354.49, 408.46, 445.5, 447.58, 518.09, 523.2, 488.45, 537.37] },
      velocityScore: { '1D': -8.8, '1W': -8.4, '1M': -28.6, '6M': null }, isNew: false,
      marketCap: '$876B', pe: 178.5, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 7.48, PSI: 4.85, XSD: 3.83, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.96, proScore: 3.72, coverage: 0.75,
      price: 133.99, weeklyPrices: [124.57, 127.86, 117.05, 121.10, 133.99], weeklyChange: 7.56, dayChange: 10.64, sortRank: 0, periodReturns: { '1M': 23.9, 'YTD': 263.1, '6M': 269.3, '1Y': 535.6 },
      priceHistory: { '1D': [121.1, 133.09, 130.84, 129.89, 129.78, 130.23, 132.49, 132.1, 131.11, 132.65, 132.25, 133.63, 133.6, 133.93, 134.26, 133.86, 133.32, 134.62, 133.85, 134.09, 133.97, 134.27, 134.41, 133.99], '1W': [124.57, 127.86, 117.05, 121.1, 133.99], '1M': [108.17, 110.8, 118.96, 118.5, 119.84, 121.77, 120.89, 114.68, 109.33, 107.93, 112.71, 111.78, 99.17, 110.27, 107.92, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99], 'YTD': [36.9, 41.11, 48.72, 54.32, 48.66, 48.6, 48.29, 45.46, 46.88, 45.58, 46.78, 44.06, 44.06, 41.19, 52.91, 63.81, 65.7, 84.99, 95.78, 124.92, 108.77, 118.5, 114.68, 99.17, 116.96, 133.99], '6M': [36.28, 36.2, 39.37, 44.06, 48.56, 43.93, 49.25, 47.13, 45.46, 46.88, 45.58, 47.98, 45.03, 44.06, 44.13, 58.95, 64.94, 65.27, 94.75, 113.01, 120.29, 118.96, 120.89, 111.78, 116.96, 133.99], '1Y': [21.08, 22.69, 22, 23.3, 23.26, 20.68, 19.31, 19.95, 24.56, 24.8, 24.35, 24.48, 24.77, 28.76, 34.48, 36.59, 36.37, 37.01, 38.28, 39.99, 38.13, 35.52, 34.5, 40.01, 40.3, 37.51, 36.82, 36.68, 40.04, 47.29, 54.25, 48.78, 48.6, 48.29, 44.62, 45.46, 45.58, 47.98, 45.03, 47.18, 48.03, 61.72, 68.5, 66.78, 94.48, 109.62, 120.29, 118.96, 120.89, 111.78, 116.96, 133.99] },
      velocityScore: { '1D': 0.3, '1W': -2.1, '1M': -3.1, '6M': null }, isNew: false,
      marketCap: '$673B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 6.07, PSI: 4.94, XSD: 3.87, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 4.44, proScore: 3.33, coverage: 0.75,
      price: 210.69, weeklyPrices: [205.19, 212.45, 207.41, 204.65, 210.69], weeklyChange: 2.68, dayChange: 2.95, sortRank: 0, periodReturns: { '1M': -5.2, 'YTD': 13, '6M': 21, '1Y': 46.5 },
      priceHistory: { '1D': [204.65, 207.14, 207.72, 208.93, 209.35, 209.32, 209.27, 208.88, 208.19, 209.27, 209.53, 210.97, 210.13, 209.96, 210.06, 210.04, 209.66, 209.85, 210.1, 209.78, 210.06, 209.85, 210.15, 210.69], '1W': [205.19, 212.45, 207.41, 204.65, 210.69], '1M': [222.32, 220.61, 223.47, 219.51, 215.33, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69], 'YTD': [186.5, 185.04, 183.14, 184.84, 192.51, 174.19, 190.05, 187.98, 195.56, 183.04, 184.77, 181.93, 175.2, 165.17, 178.1, 196.51, 202.06, 216.61, 198.48, 215.2, 225.32, 219.51, 211.14, 205.1, 204.87, 210.69], '6M': [174.14, 190.53, 188.12, 184.94, 178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 186.03, 180.4, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 223.47, 214.25, 218.66, 204.87, 210.69], '1Y': [143.85, 157.75, 158.24, 164.07, 171.38, 176.75, 173.72, 182.7, 180.45, 177.99, 174.18, 168.31, 177.75, 183.61, 181.85, 185.54, 183.16, 183.22, 186.26, 202.49, 188.15, 190.17, 178.88, 179.92, 185.55, 176.29, 180.99, 188.22, 187.24, 185.81, 183.32, 191.52, 174.19, 190.05, 187.9, 184.89, 183.04, 186.03, 180.4, 178.68, 175.75, 183.91, 198.35, 199.64, 199.57, 211.5, 225.83, 223.47, 214.25, 218.66, 204.87, 210.69] },
      velocityScore: { '1D': 13.7, '1W': 13.3, '1M': -5.1, '6M': null }, isNew: false,
      marketCap: '$5.1T', pe: 32.3, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.47,
      etfPresence: { SOXX: 7.17, PSI: 4.47, XSD: 1.69, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.49, proScore: 2.62, coverage: 0.75,
      price: 434.46, weeklyPrices: [417.79, 427.58, 416.00, 414.45, 434.46], weeklyChange: 3.99, dayChange: 4.83, sortRank: 0, periodReturns: { '1M': 3.8, 'YTD': 60.2, '6M': 58, '1Y': 90.3 },
      priceHistory: { '1D': [414.45, 430.03, 431.96, 433.9, 435.83, 433.91, 434.69, 432.91, 432.54, 432.34, 433.69, 434.94, 434.09, 434.02, 432.04, 429.84, 430.56, 430.23, 429.16, 429.48, 429.86, 429.18, 434.51, 434.46], '1W': [417.79, 427.58, 416, 414.45, 434.46], '1M': [418.58, 414.31, 398.05, 384.21, 397.07, 416.88, 419.01, 413.85, 402.69, 423.2, 437.67, 428.76, 401.39, 403.89, 404.62, 412.13, 417.79, 427.58, 416, 414.45, 434.46], 'YTD': [271.2, 299.16, 297.99, 308.52, 318.7, 320.44, 337, 346.37, 360.8, 341.51, 318.81, 313.66, 321.83, 303.1, 327.41, 348.6, 381.05, 392.59, 397.02, 416.52, 417.49, 384.21, 413.85, 401.39, 412.13, 434.46], '6M': [274.92, 276.84, 277.29, 293.86, 295.67, 303.83, 311.29, 325.16, 346.37, 360.8, 341.51, 319.22, 308.59, 321.83, 318.14, 346.21, 347.94, 381.42, 389.31, 415.63, 432.39, 398.05, 419.01, 428.76, 412.13, 434.46], '1Y': [228.35, 236.96, 241.81, 243.46, 240.48, 230.77, 221.71, 223.95, 231.63, 252.2, 251.31, 248.98, 244.91, 247.34, 244.79, 242.5, 225.32, 242.87, 238.01, 234.13, 228.48, 234.89, 232.32, 266.51, 279.13, 280.44, 274.44, 275.63, 292.94, 296.21, 304.97, 317.63, 320.44, 337, 345.3, 354.35, 341.51, 319.22, 308.59, 322.03, 320.58, 351.36, 353.8, 403.88, 402.26, 408.52, 432.39, 398.05, 419.01, 428.76, 412.13, 434.46] },
      velocityScore: { '1D': 10.1, '1W': 9.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$212B', pe: 64.6, revenueGrowth: 37, eps: 6.73, grossMargin: 64, dividendYield: 1.01,
      etfPresence: { SOXX: 3.77, PSI: 4.71, XSD: 1.99, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 5.54, proScore: 2.77, coverage: 0.5,
      price: 617.11, weeklyPrices: [567.25, 585.78, 568.23, 592.92, 617.11], weeklyChange: 8.79, dayChange: 4.08, sortRank: 0, periodReturns: { '1M': 49.2, 'YTD': 140.1, '6M': 143.4, '1Y': 264.2 },
      priceHistory: { '1D': [592.92, 627.6, 634.4, 634.85, 631.49, 630, 632.3, 631.58, 628.51, 628.76, 627.5, 625.54, 621.53, 619.03, 617.32, 618.35, 615.67, 612.83, 614.23, 616.39, 615.78, 615.11, 623.59, 617.11], '1W': [567.25, 585.78, 568.23, 592.92, 617.11], '1M': [413.57, 406.91, 426.85, 427.36, 432.16, 448.25, 449.68, 450.06, 458.17, 490.05, 500.77, 501.7, 453.01, 492.17, 499.21, 552.64, 567.25, 585.78, 568.23, 592.92, 617.11], 'YTD': [256.99, 281.64, 301.89, 318.79, 341.34, 297.6, 339.88, 369.3, 394.95, 357.76, 345.88, 352.46, 373.99, 323.12, 354.31, 395.64, 391.62, 404.86, 391.38, 435.44, 436.62, 427.36, 450.06, 453.01, 552.64, 617.11], '6M': [253.5, 261.9, 284.32, 307.24, 318.23, 332.71, 318.67, 329.07, 369.3, 394.95, 357.76, 351.07, 349.47, 373.99, 341.79, 385.72, 394.26, 403.48, 382.59, 428.62, 436.61, 426.85, 449.68, 501.7, 552.64, 617.11], '1Y': [169.46, 183.21, 190.78, 197.1, 192.61, 190.27, 179.99, 184.87, 161.76, 162.49, 160.76, 162.05, 170.93, 200.52, 204.95, 223.91, 209.95, 224.99, 228.75, 233.1, 230.07, 226.01, 224.01, 254.75, 268.16, 261.27, 256.41, 263.05, 296.01, 304.87, 325.24, 336.75, 297.6, 339.88, 369.83, 375.72, 357.76, 351.07, 349.47, 369.34, 353.8, 397.81, 389.9, 403.91, 394.49, 410.64, 436.61, 426.85, 449.68, 501.7, 552.64, 617.11] },
      velocityScore: { '1D': -6.7, '1W': -2.5, '1M': -6.1, '6M': null }, isNew: false,
      marketCap: '$490B', pe: 58.2, revenueGrowth: 11, eps: 10.61, grossMargin: 49, dividendYield: 0.34,
      etfPresence: { SOXX: 4.92, PSI: 6.17, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 5.36, proScore: 2.68, coverage: 0.5,
      price: 259.56, weeklyPrices: [254.54, 256.42, 237.33, 238.73, 259.56], weeklyChange: 1.97, dayChange: 8.73, sortRank: 0, periodReturns: { '1M': 47.8, 'YTD': 113.6, '6M': 112.3, '1Y': 205.4 },
      priceHistory: { '1D': [238.73, 252.43, 256.59, 256.59, 254.06, 254.2, 254.29, 255.73, 257.27, 259.21, 259.14, 259.71, 259.3, 259.65, 258.59, 259.84, 259.47, 258.18, 258.67, 260.71, 261.4, 261.31, 263.46, 259.56], '1W': [254.54, 256.42, 237.33, 238.73, 259.56], '1M': [175.65, 174.06, 182.95, 184.22, 188.84, 195.72, 192.76, 192.17, 194, 204.52, 212.51, 213.11, 192.92, 210.81, 213.94, 241.16, 254.54, 256.42, 237.33, 238.73, 259.56], 'YTD': [121.51, 132.46, 143.45, 150, 168.47, 130.72, 147.95, 148.03, 154.67, 147.59, 145.29, 148.13, 156.62, 138.26, 154.88, 179.59, 180.53, 190, 171.33, 186.92, 180.43, 184.22, 192.17, 192.92, 241.16, 259.56], '6M': [122.24, 127.96, 135.24, 142.82, 148.62, 161.63, 135.55, 143.08, 148.03, 154.67, 147.59, 146.5, 148.24, 156.62, 147.24, 167.23, 174.81, 181.21, 181.62, 181.63, 184.97, 182.95, 192.76, 213.11, 241.16, 259.56], '1Y': [85, 88.99, 91.26, 92.18, 93.78, 92.32, 88.66, 91.48, 87.49, 87.03, 87.2, 90.9, 98.89, 107.13, 106.41, 113.97, 98.28, 110.67, 118.28, 120.87, 119.34, 113.43, 109.71, 115.72, 122.46, 122.51, 124.57, 126.04, 139.5, 144.18, 152, 162.72, 130.72, 147.95, 146.99, 152.43, 147.59, 146.5, 148.24, 154.38, 151.98, 172.73, 173.49, 181.54, 175.04, 176.32, 184.97, 182.95, 192.76, 213.11, 241.16, 259.56] },
      velocityScore: { '1D': 14, '1W': 6.8, '1M': 2.7, '6M': null }, isNew: false,
      marketCap: '$339B', pe: 73.5, revenueGrowth: 12, eps: 3.53, grossMargin: 61, dividendYield: 0.35,
      etfPresence: { SOXX: 4.85, PSI: 5.87, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 5.18, proScore: 2.59, coverage: 0.5,
      price: 310.58, weeklyPrices: [279.70, 308.88, 278.67, 289.54, 310.58], weeklyChange: 11.04, dayChange: 7.27, sortRank: 0, periodReturns: { '1M': 83.9, 'YTD': 265.5, '6M': 267.7, '1Y': 322.5 },
      priceHistory: { '1D': [289.54, 307.2, 314.01, 317.6, 320.13, 325.04, 323.82, 324.48, 321.65, 324.55, 327.35, 324.45, 323.8, 324.2, 325.78, 329.32, 325.58, 324.98, 323.57, 322.92, 326.39, 328.78, 327.86, 310.58], '1W': [279.7, 308.88, 278.67, 289.54, 310.58], '1M': [168.93, 176.27, 186.8, 190.69, 196.33, 198.7, 204.83, 205, 219.43, 290.79, 301.65, 316.43, 263.47, 288.85, 266.88, 280.71, 279.7, 308.88, 278.67, 289.54, 310.58], 'YTD': [84.98, 83.45, 81.21, 83.1, 81.34, 73.73, 81.34, 79.09, 80.92, 78.09, 93.3, 90.79, 92.36, 87.81, 109.38, 133.83, 147.84, 158.21, 163.66, 170.13, 176.89, 190.69, 205, 263.47, 280.71, 310.58], '6M': [84.47, 86.34, 90.23, 82.89, 79.8, 82.93, 75.54, 82.01, 79.09, 80.92, 78.09, 90.44, 87.62, 92.36, 99.05, 114.45, 134.6, 157.32, 156.57, 172.15, 177.95, 186.8, 204.83, 316.43, 280.71, 310.58], '1Y': [73.51, 77.16, 71.55, 72.51, 73.06, 75.91, 74.45, 77.34, 76.19, 73, 62.87, 66, 67.43, 75.53, 82.39, 88.92, 85.61, 87.95, 84.13, 93.74, 90.92, 86.45, 77.45, 91.1, 92, 84.26, 84.09, 85.76, 88.23, 83.05, 82.55, 83.62, 73.73, 81.34, 79.61, 79.29, 78.09, 90.44, 87.62, 98.45, 106.71, 119.93, 133.37, 165.56, 165.15, 160.01, 177.95, 186.8, 204.83, 316.43, 280.71, 310.58] },
      velocityScore: { '1D': -21.5, '1W': -18.6, '1M': -23.6, '6M': null }, isNew: false,
      marketCap: '$272B', pe: 106.4, revenueGrowth: 28, eps: 2.92, grossMargin: 52, dividendYield: 0.08,
      etfPresence: { SOXX: 5.44, PSI: false, XSD: 4.91, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 4.94, proScore: 2.47, coverage: 0.5,
      price: 389.04, weeklyPrices: [366.81, 388.92, 369.34, 374.18, 389.04], weeklyChange: 6.06, dayChange: 3.97, sortRank: 0, periodReturns: { '1M': 40, 'YTD': 127.3, '6M': 136.2, '1Y': 329.9 },
      priceHistory: { '1D': [374.18, 396.01, 399.3, 397.05, 394.71, 397.02, 394.55, 395.86, 396.04, 396.71, 397.52, 397.18, 394.83, 396.38, 395.2, 395.99, 395.21, 392.71, 393.02, 394.14, 393.75, 392.77, 396.11, 389.04], '1W': [366.81, 388.92, 369.34, 374.18, 389.04], '1M': [277.96, 273.38, 292.09, 302.24, 305.35, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04], 'YTD': [171.18, 200.96, 208.79, 220.7, 248.17, 209.78, 235.12, 240.09, 249.48, 222.99, 215.23, 226.47, 238.84, 199.93, 224.35, 272.41, 263.16, 259.47, 258.57, 294.05, 284.72, 302.24, 318.18, 303.28, 362.52, 389.04], '6M': [164.7, 178.07, 194.76, 220.4, 222.41, 238.46, 230.1, 226.61, 240.09, 249.48, 222.99, 218.87, 224.71, 238.84, 213.66, 246.49, 265.16, 265.55, 248.75, 297.17, 295.44, 292.09, 318, 336.41, 362.52, 389.04], '1Y': [90.49, 97.2, 98.14, 99.62, 101.74, 98.62, 96.37, 101.75, 99.51, 100.08, 100.15, 105.07, 119.21, 132.2, 131.09, 149.15, 131.37, 141.51, 151.68, 157.46, 159.35, 148.26, 142.65, 154.79, 162.74, 164.3, 172.27, 175.87, 206.96, 214.38, 228.39, 239.58, 209.78, 235.12, 237.39, 239.07, 222.99, 218.87, 224.71, 233.45, 222.01, 258.76, 260.96, 258.56, 257.86, 286.52, 295.44, 292.09, 318, 336.41, 362.52, 389.04] },
      velocityScore: { '1D': 5.6, '1W': 7.4, '1M': -7.5, '6M': null }, isNew: false,
      marketCap: '$487B', pe: 73.5, revenueGrowth: 24, eps: 5.29, grossMargin: 50, dividendYield: 0.27,
      etfPresence: { SOXX: 4.39, PSI: 5.49, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 4.19, proScore: 2.09, coverage: 0.5,
      price: 411.35, weeklyPrices: [382.07, 393.94, 376.71, 392.90, 411.35], weeklyChange: 7.66, dayChange: 4.7, sortRank: 0, periodReturns: { '1M': -2.2, 'YTD': 18.9, '6M': 24.7, '1Y': 64.5 },
      priceHistory: { '1D': [392.9, 406.62, 406.12, 409.5, 408.61, 409.05, 410.11, 408.8, 406.88, 408.85, 409.38, 408.3, 408.43, 407.4, 407.29, 408.02, 407.77, 407.36, 407.45, 408.21, 408.06, 409.2, 410.79, 411.35], '1W': [382.07, 393.94, 376.71, 392.9, 411.35], '1M': [420.71, 411.07, 417.76, 414.57, 414.14, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35], 'YTD': [346.1, 332.48, 339.89, 325.49, 330.73, 308.05, 342.76, 333.51, 332.31, 317.53, 342.58, 321.31, 318.29, 293.41, 333.97, 380.78, 399.63, 418.2, 416.5, 430, 425.19, 414.57, 446.77, 385.73, 385.57, 411.35], '6M': [329.88, 352.13, 343.42, 352.21, 332.6, 332.79, 320.33, 340.44, 333.51, 332.31, 317.53, 341.57, 315.93, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 417.76, 426.58, 418.91, 385.57, 411.35], '1Y': [249.99, 269.35, 274.18, 275.6, 288.21, 294.3, 288.64, 304.97, 306.34, 294, 297.39, 345.65, 364.09, 338.79, 327.9, 335.49, 324.63, 349.33, 354.13, 369.63, 349.43, 342.46, 340.2, 386.08, 401.1, 339.81, 340.36, 349.39, 343.77, 354.61, 328.8, 333.24, 308.05, 342.76, 333.99, 321.7, 317.53, 341.57, 315.93, 318.81, 313.49, 354.91, 398.47, 419.94, 417.43, 412.56, 416.79, 417.76, 426.58, 418.91, 385.57, 411.35] },
      velocityScore: { '1D': 11.2, '1W': 14.2, '1M': -44.4, '6M': null }, isNew: false,
      marketCap: '$2.0T', pe: 68.4, revenueGrowth: 48, eps: 6.01, grossMargin: 76, dividendYield: 0.63,
      etfPresence: { SOXX: 6.61, PSI: false, XSD: 1.77, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 3.61, proScore: 1.81, coverage: 0.5,
      price: 417.07, weeklyPrices: [367.15, 389.20, 361.71, 374.68, 417.07], weeklyChange: 13.6, dayChange: 11.31, sortRank: 0, periodReturns: { '1M': 93.5, 'YTD': 150.7, '6M': 185.9, '1Y': 348.1 },
      priceHistory: { '1D': [374.68, 387.38, 394.14, 401.3, 407.37, 409.39, 412.1, 413.04, 412.54, 419, 419.23, 419.8, 418.48, 415.4, 420.55, 419.89, 414.01, 413.34, 412.95, 412.81, 412.54, 411.86, 414.39, 417.07], '1W': [367.15, 389.2, 361.71, 374.68, 417.07], '1M': [215.58, 244.26, 287.48, 297.84, 306.88, 325.33, 349.17, 342.85, 320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 367.47, 367.15, 389.2, 361.71, 374.68, 417.07], 'YTD': [166.36, 156.73, 172.14, 176.35, 160.46, 144.67, 143.71, 129.58, 128.15, 113.77, 116.48, 127.57, 121.76, 100.27, 118.99, 170.6, 175.8, 196.64, 201.25, 199.79, 232.68, 297.84, 342.85, 317.06, 367.47, 417.07], '6M': [145.88, 167.26, 167.11, 172.57, 183.75, 170.93, 158.52, 182.86, 129.58, 128.15, 113.77, 124.71, 126.34, 121.76, 109.6, 125.46, 172.09, 194.06, 196.85, 213.91, 224.09, 287.48, 349.17, 358.05, 367.47, 417.07], '1Y': [93.07, 91.02, 89.62, 90.32, 121.89, 124.05, 131.1, 179.28, 185.85, 179.09, 182.2, 216.1, 231.29, 237.3, 198.8, 220.81, 206.21, 159.8, 164.97, 186.68, 165.49, 144.34, 141.8, 165.19, 175.74, 143.66, 164.4, 170.1, 161.01, 180.56, 176.01, 167.9, 144.67, 143.71, 132.62, 124.67, 113.77, 124.71, 126.34, 120.33, 106.33, 129.46, 170.81, 197.54, 194.74, 195.65, 224.09, 287.48, 349.17, 358.05, 367.47, 417.07] },
      velocityScore: { '1D': 2.3, '1W': 5.2, '1M': -15, '6M': null }, isNew: false,
      marketCap: '$71B', pe: 285.7, revenueGrowth: 93, eps: 1.46, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.61, PSI: false, XSD: 4.61, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 3.06, proScore: 1.53, coverage: 0.5,
      price: 322.86, weeklyPrices: [301.12, 313.34, 305.71, 301.88, 322.86], weeklyChange: 7.22, dayChange: 6.95, sortRank: 0, periodReturns: { '1M': 7.4, 'YTD': 86.1, '6M': 83.2, '1Y': 62.9 },
      priceHistory: { '1D': [301.88, 312.86, 316.25, 317.05, 317.42, 317.32, 317.06, 316.17, 315.83, 316.61, 316.68, 319.3, 319.02, 321, 320.66, 320.58, 320.83, 321.17, 320.43, 321.5, 320.57, 320.81, 322.79, 322.86], '1W': [301.12, 313.34, 305.71, 301.88, 322.86], '1M': [300.6, 302.31, 304.88, 298.39, 309.21, 317.45, 315.95, 305.68, 293.2, 308.12, 308.59, 305.37, 285.06, 290.9, 288.63, 297.1, 301.12, 313.34, 305.71, 301.88, 322.86], 'YTD': [173.49, 188.45, 193.45, 194.99, 218.97, 222.92, 226.56, 223.32, 213.9, 202.39, 197.46, 194.45, 194.63, 186.42, 199.74, 218.87, 233.7, 269.5, 280.89, 287.8, 302.73, 298.39, 305.68, 285.06, 297.1, 322.86], '6M': [176.19, 176.88, 177.17, 189.07, 189.59, 196.63, 225.21, 220.92, 223.32, 213.9, 202.39, 198.67, 190.78, 194.63, 194.14, 208.9, 216.29, 236.31, 269.22, 289.44, 306.34, 304.88, 315.95, 305.37, 297.1, 322.86], '1Y': [198.2, 207.08, 213.41, 220.05, 214.57, 189.25, 180.86, 187.22, 194.57, 206.06, 202.48, 185.82, 178.2, 179.62, 183.23, 181.81, 171.7, 176.58, 169.13, 161.46, 160.55, 159.33, 159.4, 168.16, 180.94, 177.97, 176.29, 175.69, 192.1, 188.53, 194.41, 216.17, 222.92, 226.56, 218.05, 212.63, 202.39, 198.67, 190.78, 196.77, 196.3, 214.98, 223.1, 282.23, 281.08, 285.24, 306.34, 304.88, 315.95, 305.37, 297.1, 322.86] },
      velocityScore: { '1D': 7.7, '1W': 8.5, '1M': -51.4, '6M': null }, isNew: false,
      marketCap: '$294B', pe: 55.3, revenueGrowth: 19, eps: 5.84, grossMargin: 57, dividendYield: 1.76,
      etfPresence: { SOXX: 3.79, PSI: false, XSD: 2.33, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.89, proScore: 1.45, coverage: 0.5,
      price: 313.27, weeklyPrices: [304.86, 315.88, 302.89, 298.20, 313.27], weeklyChange: 2.76, dayChange: 5.05, sortRank: 0, periodReturns: { '1M': 7.4, 'YTD': 44.3, '6M': 41.1, '1Y': 49.9 },
      priceHistory: { '1D': [298.2, 311.46, 312.67, 313.93, 315.76, 315.8, 317.23, 315.88, 314.24, 314.24, 314.16, 315.05, 314.83, 315.73, 315.53, 316.11, 315.33, 315.18, 314.37, 314.35, 314.04, 314.64, 316.39, 313.27], '1W': [304.86, 315.88, 302.89, 298.2, 313.27], '1M': [291.68, 294.28, 310.15, 299.38, 316.47, 329.24, 330.28, 321.35, 311.38, 323.62, 321.88, 322.22, 295.96, 301.14, 297.41, 302.55, 304.86, 315.88, 302.89, 298.2, 313.27], 'YTD': [217.06, 237.89, 240.81, 236.75, 233.5, 226.86, 249.75, 237.33, 235.07, 216.37, 203.03, 194.02, 196.4, 187.39, 195.12, 209.89, 221.34, 236.87, 290.76, 294.75, 291.5, 299.38, 321.35, 295.96, 302.55, 313.27], '6M': [222.08, 222.87, 223.88, 238.33, 230.7, 229.42, 220.66, 236.62, 237.33, 235.07, 216.37, 199.87, 192.69, 196.4, 196.86, 204.27, 209.39, 225.75, 289.25, 303.55, 298.41, 310.15, 330.28, 322.22, 302.55, 313.27], '1Y': [209, 217.04, 226, 224.61, 228.27, 228.49, 209.92, 207.16, 228.78, 234.83, 234.85, 225.5, 219.27, 225.73, 226.11, 231.42, 205.37, 214.35, 219.16, 209.12, 204.56, 197.1, 191.35, 199.49, 229.01, 231.83, 226.27, 220.46, 245.95, 239.09, 233.72, 240.03, 226.86, 249.75, 232.11, 232.23, 216.37, 199.87, 192.69, 197.61, 195.58, 205.67, 213.73, 241.16, 293.59, 290.22, 298.41, 310.15, 330.28, 322.22, 302.55, 313.27] },
      velocityScore: { '1D': 8.2, '1W': 6.6, '1M': -30.3, '6M': null }, isNew: false,
      marketCap: '$79B', pe: 29.9, revenueGrowth: 12, eps: 10.46, grossMargin: 56, dividendYield: 1.29,
      etfPresence: { SOXX: 3.5, PSI: false, XSD: 2.29, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 2.83, proScore: 1.42, coverage: 0.5,
      price: 226.11, weeklyPrices: [211.72, 220.81, 214.07, 212.97, 226.11], weeklyChange: 6.8, dayChange: 6.17, sortRank: 0, periodReturns: { '1M': 11, 'YTD': 32.2, '6M': 29.8, '1Y': 49.4 },
      priceHistory: { '1D': [212.97, 217.21, 228.03, 223.23, 225, 224.41, 222.67, 222.04, 220.55, 219.61, 220.28, 221.96, 222.68, 224.84, 225.63, 227.32, 228.18, 228.63, 228.1, 228.41, 226.8, 226.57, 226, 226.11], '1W': [211.72, 220.81, 214.07, 212.97, 226.11], '1M': [203.64, 195.61, 202.51, 213.41, 238.16, 233.4, 243.29, 251.02, 228.99, 240.84, 250.01, 242.57, 215.94, 217.77, 205.42, 202.96, 211.72, 220.81, 214.07, 212.97, 226.11], 'YTD': [171.05, 181.87, 164.54, 157.8, 152.22, 148.89, 141.04, 143.24, 145.82, 139.51, 135.2, 131.59, 128.67, 127.07, 124.07, 132.84, 137.52, 150.26, 168.38, 219.09, 201.49, 213.41, 251.02, 215.94, 202.96, 226.11], '6M': [174.19, 174.81, 176.31, 169.27, 154.07, 153.04, 147.18, 140.09, 143.24, 145.82, 139.51, 134.12, 130.47, 128.67, 128.78, 127.51, 133.05, 136.07, 156, 192.57, 213.17, 202.51, 243.29, 242.57, 202.96, 226.11], '1Y': [151.32, 158.54, 158.09, 154.29, 158.97, 161.05, 148.19, 147.56, 157.85, 158.01, 160.73, 160.24, 161.22, 169.72, 165.3, 168.62, 153.59, 163.45, 168.94, 180.9, 170.89, 173.98, 163.3, 168.04, 175.31, 179.26, 175.25, 173.43, 182.45, 165.29, 156.37, 152.7, 148.89, 141.04, 141.27, 145.59, 139.51, 134.12, 130.47, 130.35, 127.28, 127.75, 134.47, 133.95, 179.58, 202.55, 213.17, 202.51, 243.29, 242.57, 202.96, 226.11] },
      velocityScore: { '1D': -4.1, '1W': -3.4, '1M': -38.5, '6M': null }, isNew: false,
      marketCap: '$238B', pe: 24.3, revenueGrowth: -4, eps: 9.29, grossMargin: 55, dividendYield: 1.63,
      etfPresence: { SOXX: 3.23, PSI: false, XSD: 2.43, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.69, proScore: 1.35, coverage: 0.5,
      price: 1563.7, weeklyPrices: [1577.32, 1652.29, 1498.77, 1448.21, 1563.70], weeklyChange: -0.86, dayChange: 7.97, sortRank: 0, periodReturns: { '1M': 5.2, 'YTD': 72.5, '6M': 68.2, '1Y': 128 },
      priceHistory: { '1D': [1448.21, 1533.16, 1543.9, 1545.59, 1565.9, 1555.3, 1542.56, 1540, 1537.02, 1541.4, 1546.5, 1553.1, 1551.48, 1562.75, 1557.9, 1556.74, 1556.31, 1560.94, 1554.81, 1556.23, 1556.39, 1558.17, 1567.29, 1563.7], '1W': [1577.32, 1652.29, 1498.77, 1448.21, 1563.7], '1M': [1486.33, 1468.11, 1553.27, 1561.25, 1589.81, 1620.17, 1633.17, 1566.21, 1542.39, 1624.99, 1689.89, 1652.6, 1481.05, 1559.18, 1531.98, 1589.55, 1577.32, 1652.29, 1498.77, 1448.21, 1563.7], 'YTD': [906.36, 959.09, 983.6, 1076.67, 1183.15, 1136.83, 1196.73, 1188.32, 1231.95, 1099.02, 1055.82, 1066.66, 1101.59, 1002.34, 1191.22, 1363.42, 1490.86, 1587.57, 1573.3, 1600.84, 1550.02, 1561.25, 1566.21, 1481.05, 1589.55, 1563.7], '6M': [929.48, 946.32, 955.03, 967.16, 1034.49, 1095.49, 1164.83, 1142.02, 1188.32, 1231.95, 1099.02, 1071.09, 1075.29, 1101.59, 1093.35, 1312.94, 1353, 1522.04, 1526.84, 1652.35, 1650.35, 1553.27, 1633.17, 1652.6, 1589.55, 1563.7], '1Y': [685.9, 736.03, 741.17, 721.14, 724.77, 738.55, 785.62, 804.29, 826.47, 844, 835.76, 864.32, 849.71, 922.81, 886.59, 968.1, 904.44, 1004.65, 1074.91, 1005, 958.26, 920.19, 872.35, 928.35, 983.58, 949.4, 937.11, 930.04, 1005.38, 983.28, 1074.93, 1161.78, 1136.83, 1196.73, 1175.22, 1180.13, 1099.02, 1071.09, 1075.29, 1118.66, 1119.51, 1334.21, 1402.81, 1592.17, 1614.41, 1575.96, 1650.35, 1553.27, 1633.17, 1652.6, 1589.55, 1563.7] },
      velocityScore: { '1D': 7.1, '1W': -1.5, '1M': -35.7, '6M': null }, isNew: false,
      marketCap: '$77B', pe: 112.3, revenueGrowth: 26, eps: 13.92, grossMargin: 55, dividendYield: 0.51,
      etfPresence: { SOXX: 3.31, PSI: false, XSD: 2.07, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.66, proScore: 1.33, coverage: 0.5,
      price: 271.83, weeklyPrices: [250.81, 259.41, 239.18, 249.33, 271.83], weeklyChange: 8.38, dayChange: 9.02, sortRank: 0, periodReturns: { '1M': 73.9, 'YTD': 88.9, '6M': 96.2, '1Y': 217.9 },
      priceHistory: { '1D': [249.33, 258.77, 253.95, 264.16, 266.46, 265.07, 267.13, 264.23, 262.47, 265.87, 263.93, 262.25, 262.1, 261.14, 262.04, 262.99, 262.64, 262.11, 262.66, 263.55, 264.64, 265.61, 270.1, 271.83], '1W': [250.81, 259.41, 239.18, 249.33, 271.83], '1M': [156.27, 168.99, 182.98, 193.39, 218.41, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 217.5, 206.89, 222.27, 234.32, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83], 'YTD': [143.89, 141.59, 156.84, 135.1, 129.47, 96.95, 128.4, 127.91, 123.46, 102.54, 112.33, 104.06, 100.3, 87.81, 106.79, 159.52, 174.53, 180.5, 180.06, 188.51, 172.17, 193.39, 236.03, 206.89, 264.76, 271.83], '6M': [138.57, 144.83, 140.24, 156.07, 153.22, 129.57, 111.31, 134.72, 127.91, 123.46, 102.54, 115.91, 101.72, 100.3, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 189.36, 182.98, 222.35, 217.5, 264.76, 271.83], '1Y': [85.51, 93.49, 92.73, 98.7, 95.74, 107.95, 107.56, 120.41, 116.74, 114.04, 123.06, 147.53, 163.98, 164.1, 146.01, 147.42, 138.83, 143.61, 155.55, 187.62, 163.61, 145.52, 133.49, 171.13, 178.94, 142.02, 150.13, 144.7, 132.95, 161.38, 139.16, 129.66, 96.95, 128.4, 130.66, 114.48, 102.54, 115.91, 101.72, 103.91, 95.92, 107.93, 158.93, 185.54, 174.01, 188.29, 189.36, 182.98, 222.35, 217.5, 264.76, 271.83] },
      velocityScore: { '1D': 1.5, '1W': 1.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$51B', pe: 108.7, revenueGrowth: 157, eps: 2.5, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 2.01, PSI: false, XSD: 3.3, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 2.52, proScore: 1.26, coverage: 0.5,
      price: 121.62, weeklyPrices: [116.79, 125.90, 118.25, 112.92, 121.62], weeklyChange: 4.14, dayChange: 7.7, sortRank: 0, periodReturns: { '1M': 11.1, 'YTD': 124.6, '6M': 123.8, '1Y': 130.3 },
      priceHistory: { '1D': [112.92, 119.44, 119.28, 120.26, 120.71, 120.32, 120.28, 120.16, 119.61, 119.71, 119.77, 120.29, 120.17, 120.74, 120.53, 120.69, 120.5, 120.67, 120.05, 120.03, 119.71, 120.13, 121.43, 121.62], '1W': [116.79, 125.9, 118.25, 112.92, 121.62], '1M': [109.43, 106.02, 110.21, 109.61, 116.2, 124.89, 123.77, 120.62, 120.92, 128.64, 133.93, 131.82, 117.26, 120.9, 117, 115.96, 116.79, 125.9, 118.25, 112.92, 121.62], 'YTD': [54.15, 60.89, 60.58, 63.07, 62.2, 62.06, 71.18, 70.66, 69.68, 62.53, 59.59, 60.98, 62.34, 55.66, 63.79, 72.05, 85.56, 98.04, 102.04, 103.2, 113.11, 109.61, 120.62, 117.26, 115.96, 121.62], '6M': [54.34, 54.93, 58.69, 58.75, 60.06, 62.63, 59.43, 67.38, 70.66, 69.68, 62.53, 59.24, 60.46, 62.34, 61.92, 68.38, 72.43, 88.99, 98.86, 105.77, 115.71, 110.21, 123.77, 131.82, 115.96, 121.62], '1Y': [52.82, 52.93, 54.61, 59.07, 60.55, 58.66, 56.82, 47.66, 51.09, 51.85, 49.59, 48.88, 48.11, 51.5, 49.76, 50.35, 45.74, 52.53, 50.71, 50.08, 47.83, 46.92, 46.7, 50.43, 56.38, 55.09, 55.21, 54.02, 61.76, 59.41, 63.13, 64.93, 62.06, 71.18, 68.09, 68.16, 62.53, 59.24, 60.46, 63.1, 62.2, 68.49, 79.93, 97.78, 100.81, 100.61, 115.71, 110.21, 123.77, 131.82, 115.96, 121.62] },
      velocityScore: { '1D': 0, '1W': -3.1, '1M': -32.6, '6M': null }, isNew: false,
      marketCap: '$47B', pe: 89.4, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 2.12, PSI: false, XSD: 2.92, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.28, proScore: 1.14, coverage: 0.5,
      price: 99.77, weeklyPrices: [95.24, 100.32, 95.63, 94.11, 99.77], weeklyChange: 4.76, dayChange: 6.01, sortRank: 0, periodReturns: { '1M': 7.6, 'YTD': 56.6, '6M': 55.7, '1Y': 44.7 },
      priceHistory: { '1D': [94.11, 98.2, 98.45, 99.63, 99.93, 99.5, 99.48, 99.1, 98.89, 98.95, 99.08, 99.81, 99.52, 99.85, 99.86, 99.81, 99.78, 99.69, 99.41, 99.57, 99.39, 99.15, 99.92, 99.77], '1W': [95.24, 100.32, 95.63, 94.11, 99.77], '1M': [92.76, 91.81, 94.02, 91.11, 93.43, 96.85, 96.04, 94.65, 91.52, 96.96, 96.55, 96.3, 88.34, 91.37, 91.47, 92.94, 95.24, 100.32, 95.63, 94.11, 99.77], 'YTD': [63.72, 73.53, 74.68, 75.47, 79.36, 78.23, 80.75, 79.11, 75.47, 69.9, 65.33, 64.59, 65.63, 60.06, 67.51, 74.5, 80.39, 86.84, 95.3, 99.09, 93.85, 91.11, 94.65, 88.34, 92.94, 99.77], '6M': [64.06, 64.94, 67.06, 73.39, 73.17, 75.16, 76.66, 76.86, 79.11, 75.47, 69.9, 65.79, 64.71, 65.63, 64.61, 70.73, 74.49, 82.48, 90.17, 102.92, 96.71, 94.02, 96.04, 96.3, 92.94, 99.77], '1Y': [68.97, 70.49, 71.48, 74.05, 73.85, 70.53, 66.36, 61.87, 65.71, 69.14, 65, 65.3, 63.17, 65.4, 64.07, 66.59, 60.41, 65.14, 63.17, 62.42, 56.28, 53.48, 50.9, 53.43, 67.35, 67.18, 64.91, 64.65, 74.87, 74.07, 76.2, 80.28, 78.23, 80.75, 77.16, 74.97, 69.9, 65.79, 64.71, 65.16, 65.38, 71.22, 76.87, 90.64, 92.91, 101.58, 96.71, 94.02, 96.04, 96.3, 92.94, 99.77] },
      velocityScore: { '1D': -0.9, '1W': -1.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$54B', pe: 453.5, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 1.82,
      etfPresence: { SOXX: 2.37, PSI: false, XSD: 2.2, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 2, avgWeight: 1.87, proScore: 0.93, coverage: 0.5,
      price: 391.41, weeklyPrices: [379.87, 384.77, 368.32, 367.11, 391.41], weeklyChange: 3.04, dayChange: 6.62, sortRank: 0, periodReturns: { '1M': 9.9, 'YTD': 128.5, '6M': 128.3, '1Y': 185.7 },
      priceHistory: { '1D': [367.11, 378.4, 377.91, 380.41, 382.48, 381.33, 381.35, 380.06, 379.53, 381.62, 381.82, 384.88, 384.9, 386.21, 384, 384.43, 383.93, 384.82, 382.89, 384.12, 384.72, 385.61, 388.36, 391.41], '1W': [379.87, 384.77, 368.32, 367.11, 391.41], '1M': [356.25, 358.98, 375.71, 380.45, 385.98, 400.66, 391.09, 364.64, 353.79, 382.35, 390.34, 382.74, 345.4, 361.86, 358.72, 374.76, 379.87, 384.77, 368.32, 367.11, 391.41], 'YTD': [171.28, 167.66, 215.01, 224.29, 227.73, 215.03, 236.94, 246.76, 253.37, 239, 220.59, 221.29, 237.23, 209.49, 236.99, 263.92, 281.08, 279.44, 291.72, 359.88, 375.6, 380.45, 364.64, 345.4, 374.76, 391.41], '6M': [171.47, 175.01, 170.76, 197.55, 221.7, 219.2, 226.71, 230.54, 246.76, 253.37, 239, 222.55, 218.89, 237.23, 222.07, 247, 261.16, 277, 269.63, 309.81, 381.55, 375.71, 391.09, 382.74, 374.76, 391.41], '1Y': [136.99, 142.05, 138.04, 136.63, 140.58, 139.58, 136.31, 120.94, 123.09, 126.15, 128.15, 130.25, 131.42, 129.49, 123.29, 131.71, 122.18, 136.82, 140.85, 148.13, 170.03, 162.5, 158.27, 172.85, 185.54, 175.29, 174.42, 173.71, 171.77, 213.52, 226.25, 226.25, 215.03, 236.94, 242.56, 247.11, 239, 222.55, 218.89, 245.04, 229.36, 247.71, 261.42, 284.4, 281.61, 344.47, 381.55, 375.71, 391.09, 382.74, 374.76, 391.41] },
      velocityScore: { '1D': 0, '1W': -2.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$30B', pe: 166.6, revenueGrowth: 23, eps: 2.35, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: 1.21, PSI: false, XSD: 2.53, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RMBS', name: 'RAMBUS INC', easyScore: 2, avgWeight: 1.42, proScore: 0.71, coverage: 0.5,
      price: 141.17, weeklyPrices: [146.56, 143.29, 132.48, 130.10, 141.17], weeklyChange: -3.68, dayChange: 8.51, sortRank: 0, periodReturns: { '1M': 14.1, 'YTD': 53.6, '6M': 54.3, '1Y': 137.7 },
      priceHistory: { '1D': [130.1, 138.4, 137.03, 137.46, 137.43, 136.58, 137.52, 138.02, 137.78, 139.74, 137.63, 137.1, 136.62, 137.42, 137.01, 137.51, 137.01, 137.33, 136.93, 137.73, 138.24, 138.65, 141.8, 141.17], '1W': [146.56, 143.29, 132.48, 130.1, 141.17], '1M': [123.76, 122.03, 133.56, 141.82, 142.98, 148.66, 148.02, 145.46, 147.48, 166.78, 170.66, 169.35, 145.31, 152.03, 146.84, 144.47, 146.56, 143.29, 132.48, 130.1, 141.17], 'YTD': [91.89, 91.34, 100.62, 124.77, 121.6, 100.85, 99.38, 104.34, 101.09, 92.04, 89.61, 93.5, 92.69, 79.73, 91.87, 121.73, 126.87, 141.31, 111.5, 129.25, 127.05, 141.82, 145.46, 145.31, 144.47, 141.17], '6M': [91.49, 94.11, 97.5, 92.9, 110.1, 115.71, 98.45, 106.99, 104.34, 101.09, 92.04, 92.53, 93.32, 92.69, 86.03, 101.43, 120.02, 131.55, 112.16, 130.04, 134.85, 133.56, 148.02, 169.35, 144.47, 141.17], '1Y': [59.38, 64, 63.79, 63.28, 68.91, 64.24, 72.41, 72.86, 74.22, 73.77, 73.77, 73.28, 94.88, 106.94, 103.99, 101, 89.57, 96.26, 105.42, 102.84, 107.67, 95.25, 88.15, 94.19, 104.07, 95.45, 96.4, 93.57, 97, 95.48, 125.93, 124.44, 100.85, 99.38, 104.13, 102.17, 92.04, 92.53, 93.32, 95.93, 89.95, 105.58, 120.03, 138.5, 115.11, 126.6, 134.85, 133.56, 148.02, 169.35, 144.47, 141.17] },
      velocityScore: { '1D': 0, '1W': -9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$15B', pe: 67.2, revenueGrowth: 8, eps: 2.1, grossMargin: 80, dividendYield: null,
      etfPresence: { SOXX: 0.68, PSI: false, XSD: 2.15, DRAM: false },
      tonyNote: 'RAMBUS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 10, avgWeight: 5.61, proScore: 3.3, coverage: 0.588,
      price: 210.69, weeklyPrices: [205.19, 212.45, 207.41, 204.65, 210.69], weeklyChange: 2.68, dayChange: 2.95, sortRank: 0, periodReturns: { '1M': -5.2, 'YTD': 13, '6M': 21, '1Y': 46.5 },
      priceHistory: { '1D': [204.65, 207.14, 207.72, 208.93, 209.35, 209.32, 209.27, 208.88, 208.19, 209.27, 209.53, 210.97, 210.13, 209.96, 210.06, 210.04, 209.66, 209.85, 210.1, 209.78, 210.06, 209.85, 210.15, 210.69], '1W': [205.19, 212.45, 207.41, 204.65, 210.69], '1M': [222.32, 220.61, 223.47, 219.51, 215.33, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69], 'YTD': [186.5, 185.04, 183.14, 184.84, 192.51, 174.19, 190.05, 187.98, 195.56, 183.04, 184.77, 181.93, 175.2, 165.17, 178.1, 196.51, 202.06, 216.61, 198.48, 215.2, 225.32, 219.51, 211.14, 205.1, 204.87, 210.69], '6M': [174.14, 190.53, 188.12, 184.94, 178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 186.03, 180.4, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 223.47, 214.25, 218.66, 204.87, 210.69], '1Y': [143.85, 157.75, 158.24, 164.07, 171.38, 176.75, 173.72, 182.7, 180.45, 177.99, 174.18, 168.31, 177.75, 183.61, 181.85, 185.54, 183.16, 183.22, 186.26, 202.49, 188.15, 190.17, 178.88, 179.92, 185.55, 176.29, 180.99, 188.22, 187.24, 185.81, 183.32, 191.52, 174.19, 190.05, 187.9, 184.89, 183.04, 186.03, 180.4, 178.68, 175.75, 183.91, 198.35, 199.64, 199.57, 211.5, 225.83, 223.47, 214.25, 218.66, 204.87, 210.69] },
      velocityScore: { '1D': 50.7, '1W': 44.1, '1M': -31.7, '6M': null }, isNew: false,
      marketCap: '$5.1T', pe: 32.3, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.47,
      etfPresence: { PTF: 4.15, WCLD: false, IGV: false, FDTX: 4.62, GTEK: false, ARKK: 1.65, MARS: false, FRWD: 8.23, BCTK: 5.77, FWD: 1.9, CBSE: false, FCUS: false, WGMI: 1.94, CNEQ: 13.54, SGRT: 6.36, SPMO: 7.94, XMMO: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 8, avgWeight: 6.33, proScore: 2.98, coverage: 0.471,
      price: 1133.99, weeklyPrices: [981.61, 1087.99, 1020.76, 1043.19, 1133.99], weeklyChange: 15.52, dayChange: 8.7, sortRank: 0, periodReturns: { '1M': 66.4, 'YTD': 297.3, '6M': 356.2, '1Y': 817.5 },
      priceHistory: { '1D': [1043.19, 1099, 1106.11, 1118.26, 1121.66, 1124.56, 1128.4, 1126.12, 1122.69, 1126.87, 1127.72, 1125.45, 1127.32, 1129.46, 1134.23, 1134.65, 1138.57, 1141.99, 1142.73, 1144.29, 1139.82, 1142.21, 1147.02, 1133.99], '1W': [981.61, 1087.99, 1020.76, 1043.19, 1133.99], '1M': [681.54, 698.74, 731.99, 762.1, 751, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99], 'YTD': [285.41, 327.02, 333.35, 397.58, 435.79, 379.4, 410.34, 420.95, 429, 400.77, 403.11, 461.69, 395.53, 321.8, 377.58, 465.66, 448.42, 524.56, 576.45, 746.81, 724.66, 762.1, 971, 864.01, 995.87, 1133.99], '6M': [248.55, 284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 418.69, 461.73, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 923.52, 996, 995.87, 1133.99], '1Y': [123.6, 124.76, 119.92, 118.61, 113.23, 111.25, 104.88, 118.89, 120.87, 117.68, 119.01, 131.46, 157.77, 164.62, 163.9, 190.96, 181.6, 202.38, 219.02, 223.77, 237.92, 246.83, 207.37, 240.46, 246.92, 237.5, 265.92, 294.37, 343.43, 338.13, 389.11, 435.28, 379.4, 410.34, 417.35, 415.56, 400.77, 418.69, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 517.16, 646.63, 803.63, 731.99, 923.52, 996, 995.87, 1133.99] },
      velocityScore: { '1D': 27.9, '1W': 33, '1M': 14.6, '6M': null }, isNew: false,
      marketCap: '$1.3T', pe: 53.5, revenueGrowth: 196, eps: 21.21, grossMargin: 58, dividendYield: 0.05,
      etfPresence: { PTF: 5.24, WCLD: false, IGV: false, FDTX: 9.36, GTEK: false, ARKK: false, MARS: false, FRWD: 5.05, BCTK: 4.85, FWD: false, CBSE: 2.45, FCUS: 4.37, WGMI: false, CNEQ: false, SGRT: 7.55, SPMO: 11.78, XMMO: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 7, avgWeight: 5.69, proScore: 2.34, coverage: 0.412,
      price: 746.23, weeklyPrices: [562.93, 653.53, 681.08, 712.13, 746.23], weeklyChange: 32.56, dayChange: 4.79, sortRank: 0, periodReturns: { '1M': 62.7, 'YTD': 333.2, '6M': 326.4, '1Y': 1158.6 },
      priceHistory: { '1D': [712.13, 790.36, 786.06, 783.76, 773.56, 770.57, 772.01, 774.04, 769.58, 762.15, 758.33, 753.26, 743.76, 751.17, 746.33, 744.85, 743.34, 741.61, 746.88, 745.57, 745.06, 751.68, 757, 746.23], '1W': [562.93, 653.53, 681.08, 712.13, 746.23], '1M': [458.68, 455.8, 459.62, 486.46, 484.28, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23], 'YTD': [172.27, 187.68, 215, 243.29, 278.41, 269.41, 273.74, 296.56, 290.95, 261.3, 266.22, 313.81, 301.05, 251.67, 311.96, 366.22, 374.11, 400.73, 442.36, 480, 482.02, 486.46, 531.21, 511.72, 529.29, 746.23], '6M': [175.01, 181.54, 187.88, 212.14, 222.97, 252.66, 290.24, 262.56, 296.56, 290.95, 261.3, 268.81, 304.9, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 459.62, 531.18, 575.5, 529.29, 746.23], '1Y': [59.29, 63.29, 65.22, 66.93, 68.74, 68.99, 76.55, 74.97, 75.06, 76.97, 80.34, 93.29, 102.39, 112.41, 116.74, 125.28, 115.42, 126.2, 129.43, 150.21, 162.96, 157.83, 139.19, 163.54, 169.78, 172.04, 181.08, 179.68, 219.38, 214, 241.9, 279.7, 269.41, 273.74, 284.67, 282.25, 261.3, 268.81, 304.9, 296.14, 297.73, 337.88, 361.69, 403.12, 434.52, 463.91, 494.09, 459.62, 531.18, 575.5, 529.29, 746.23] },
      velocityScore: { '1D': 55, '1W': 74.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$257B', pe: 44.6, revenueGrowth: 46, eps: 16.72, grossMargin: 45, dividendYield: 0.08,
      etfPresence: { PTF: 6.1, WCLD: false, IGV: false, FDTX: 4, GTEK: false, ARKK: false, MARS: false, FRWD: 5.92, BCTK: false, FWD: false, CBSE: false, FCUS: 5.39, WGMI: false, CNEQ: 6.18, SGRT: 9.91, SPMO: 2.33, XMMO: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 7, avgWeight: 4.34, proScore: 1.79, coverage: 0.412,
      price: 462.12, weeklyPrices: [423.93, 441.40, 425.83, 432.15, 462.12], weeklyChange: 9.01, dayChange: 6.94, sortRank: 0, periodReturns: { '1M': 16.7, 'YTD': 52.1, '6M': 62.3, '1Y': 120.6 },
      priceHistory: { '1D': [432.15, 446.99, 449.93, 449.07, 450.65, 453.1, 452.18, 451.31, 451.53, 453.84, 454.19, 455.15, 454.76, 457.22, 457.76, 459.14, 459.3, 460.47, 460.26, 460.73, 460.8, 460.2, 462.84, 462.12], '1W': [423.93, 441.4, 425.83, 432.15, 462.12], '1M': [395.95, 392.61, 401.62, 407.15, 404.52, 422.73, 424.86, 418.45, 435.63, 446.69, 436.69, 444.92, 415.17, 426.8, 427.92, 421.07, 423.93, 441.4, 425.83, 432.15, 462.12], 'YTD': [303.89, 318.01, 327.11, 327.37, 339.55, 325.74, 374.09, 362.26, 387.73, 357.44, 347.09, 345.98, 343.25, 316.5, 345.32, 379.89, 366.24, 404.98, 401.61, 411.68, 404.35, 407.15, 418.45, 415.17, 421.07, 462.12], '6M': [284.68, 302.84, 322.25, 331.77, 327.16, 338.34, 335.75, 361.91, 362.26, 387.73, 357.44, 354.56, 339.57, 343.25, 337.95, 365.9, 375.1, 387.44, 393.83, 419.5, 399.8, 401.62, 424.86, 444.92, 421.07, 462.12], '1Y': [209.51, 228.57, 229.17, 228.67, 238.85, 242.75, 235.21, 241.83, 238.88, 232.99, 230.87, 247.19, 261.38, 272.63, 273.23, 302.4, 280.66, 295.08, 294.96, 300.43, 286.5, 284.82, 275.06, 287.68, 301.87, 287.74, 288.95, 300.92, 327.43, 331.21, 326.12, 342.3, 325.74, 374.09, 360.39, 376.81, 357.44, 354.56, 339.57, 347.75, 341.49, 365.49, 363.35, 382.66, 396.06, 414.15, 399.8, 401.62, 424.86, 444.92, 421.07, 462.12] },
      velocityScore: { '1D': -1.6, '1W': -5.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.4T', pe: 39.7, revenueGrowth: 35, eps: 11.65, grossMargin: 62, dividendYield: 0.82,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6, GTEK: false, ARKK: 0.94, MARS: false, FRWD: 5.94, BCTK: 8.44, FWD: false, CBSE: 2.64, FCUS: false, WGMI: 0.6, CNEQ: 5.82, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 7, avgWeight: 3.98, proScore: 1.64, coverage: 0.412,
      price: 537.37, weeklyPrices: [511.57, 547.26, 507.29, 512.48, 537.37], weeklyChange: 5.04, dayChange: 4.86, sortRank: 0, periodReturns: { '1M': 27.6, 'YTD': 150.9, '6M': 167.3, '1Y': 319 },
      priceHistory: { '1D': [512.48, 530.56, 531.21, 533.45, 530.77, 531.82, 537.11, 531.59, 528.43, 534.62, 533.55, 533.53, 533.4, 534.02, 533.83, 534.64, 532.61, 532.99, 530.67, 531.39, 531.3, 531.07, 534.21, 537.37], '1W': [511.57, 547.26, 507.29, 512.48, 537.37], '1M': [420.99, 414.05, 447.58, 449.59, 467.51, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37], 'YTD': [214.16, 204.68, 223.6, 253.73, 252.18, 200.19, 213.58, 200.12, 210.86, 202.07, 203.23, 196.31, 205.37, 196.04, 221.53, 255.07, 274.95, 334.63, 341.54, 455.19, 424.1, 449.59, 516.1, 466.38, 488.45, 537.37], '6M': [201.06, 214.99, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 204.83, 199.46, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 518.09, 523.2, 488.45, 537.37], '1Y': [128.24, 143.81, 134.8, 146.24, 157, 173.66, 171.7, 172.76, 177.51, 167.76, 162.63, 151.41, 161.16, 159.79, 161.36, 203.71, 214.9, 233.08, 252.92, 256.12, 233.54, 246.81, 203.78, 219.76, 221.11, 207.58, 213.43, 215.61, 214.35, 220.97, 249.8, 252.74, 200.19, 213.58, 203.37, 203.68, 202.07, 204.83, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 354.49, 408.46, 445.5, 447.58, 518.09, 523.2, 488.45, 537.37] },
      velocityScore: { '1D': 4.5, '1W': 2.5, '1M': -49.8, '6M': null }, isNew: false,
      marketCap: '$876B', pe: 178.5, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.51, MARS: false, FRWD: 7.08, BCTK: 3.33, FWD: 2.07, CBSE: false, FCUS: 3.28, WGMI: false, CNEQ: false, SGRT: 3.52, SPMO: 4.05, XMMO: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 7, avgWeight: 3.83, proScore: 1.58, coverage: 0.412,
      price: 411.35, weeklyPrices: [382.07, 393.94, 376.71, 392.90, 411.35], weeklyChange: 7.66, dayChange: 4.7, sortRank: 0, periodReturns: { '1M': -2.2, 'YTD': 18.9, '6M': 24.7, '1Y': 64.5 },
      priceHistory: { '1D': [392.9, 406.62, 406.12, 409.5, 408.61, 409.05, 410.11, 408.8, 406.88, 408.85, 409.38, 408.3, 408.43, 407.4, 407.29, 408.02, 407.77, 407.36, 407.45, 408.21, 408.06, 409.2, 410.79, 411.35], '1W': [382.07, 393.94, 376.71, 392.9, 411.35], '1M': [420.71, 411.07, 417.76, 414.57, 414.14, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35], 'YTD': [346.1, 332.48, 339.89, 325.49, 330.73, 308.05, 342.76, 333.51, 332.31, 317.53, 342.58, 321.31, 318.29, 293.41, 333.97, 380.78, 399.63, 418.2, 416.5, 430, 425.19, 414.57, 446.77, 385.73, 385.57, 411.35], '6M': [329.88, 352.13, 343.42, 352.21, 332.6, 332.79, 320.33, 340.44, 333.51, 332.31, 317.53, 341.57, 315.93, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 417.76, 426.58, 418.91, 385.57, 411.35], '1Y': [249.99, 269.35, 274.18, 275.6, 288.21, 294.3, 288.64, 304.97, 306.34, 294, 297.39, 345.65, 364.09, 338.79, 327.9, 335.49, 324.63, 349.33, 354.13, 369.63, 349.43, 342.46, 340.2, 386.08, 401.1, 339.81, 340.36, 349.39, 343.77, 354.61, 328.8, 333.24, 308.05, 342.76, 333.99, 321.7, 317.53, 341.57, 315.93, 318.81, 313.49, 354.91, 398.47, 419.94, 417.43, 412.56, 416.79, 417.76, 426.58, 418.91, 385.57, 411.35] },
      velocityScore: { '1D': 33.9, '1W': 20.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.0T', pe: 68.4, revenueGrowth: 48, eps: 6.01, grossMargin: 76, dividendYield: 0.63,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.79, GTEK: false, ARKK: 1.14, MARS: false, FRWD: 5.09, BCTK: 6.84, FWD: 1.92, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.46, SGRT: false, SPMO: 6.56, XMMO: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'SPCX', name: 'SPACE EXPLORATION TECHN-CL A', easyScore: 6, avgWeight: 7.83, proScore: 2.76, coverage: 0.353,
      price: 185, weeklyPrices: [185.00], weeklyChange: -3.56, dayChange: -3.56, sortRank: 0, periodReturns: { '1M': 0, 'YTD': 0, '6M': 0, '1Y': 0 },
      priceHistory: undefined,
      velocityScore: { '1D': -9.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.4T', pe: null, revenueGrowth: 15, eps: -0.67, grossMargin: 49, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.71, MARS: 24.06, FRWD: 2.66, BCTK: 9.67, FWD: 2.09, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.8, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'SPACE EXPLORATION TECHN-CL A appears in 6 of 17 Broad Tech ETFs (35% coverage) with average weight 7.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 6, avgWeight: 3.42, proScore: 1.21, coverage: 0.353,
      price: 244.39, weeklyPrices: [238.55, 246.02, 246.00, 237.50, 244.39], weeklyChange: 2.45, dayChange: 2.9, sortRank: 0, periodReturns: { '1M': -7.7, 'YTD': 5.9, '6M': 7.8, '1Y': 16.5 },
      priceHistory: { '1D': [237.5, 236.45, 238.85, 240.18, 240.06, 239.82, 241.42, 242.35, 242.47, 243.12, 242.57, 244.03, 243.53, 244.56, 245.29, 244.55, 243.72, 242.91, 242.91, 243.15, 242.78, 243.07, 242.78, 244.39], '1W': [238.55, 246.02, 246, 237.5, 244.39], '1M': [264.86, 259.34, 265.01, 268.46, 266.32, 271.85, 274, 270.64, 261.26, 256.52, 250.02, 253.79, 246.03, 245.22, 244.19, 241.51, 238.55, 246.02, 246, 237.5, 244.39], 'YTD': [230.82, 246.29, 236.65, 234.34, 241.73, 232.99, 204.08, 204.79, 210.64, 216.82, 214.33, 215.2, 207.24, 200.95, 213.77, 249.02, 248.28, 261.12, 272.05, 272.68, 264.14, 268.46, 270.64, 246.03, 241.51, 244.39], '6M': [226.76, 232.52, 233.06, 246.47, 231, 244.68, 238.62, 206.96, 204.79, 210.64, 216.82, 212.65, 209.87, 207.24, 208.27, 221.25, 248.5, 255.36, 263.04, 274.99, 270.13, 265.01, 274, 253.79, 241.51, 244.39], '1Y': [209.69, 223.3, 223.47, 225.69, 229.3, 232.79, 214.75, 222.69, 231.03, 228.84, 229, 235.84, 231.43, 227.63, 222.17, 220.9, 216.37, 213.04, 224.21, 244.22, 244.41, 234.69, 220.69, 233.88, 226.89, 222.54, 227.35, 232.07, 240.93, 242.6, 231.31, 243.01, 232.99, 204.08, 204.86, 207.92, 216.82, 212.65, 209.87, 211.71, 210.57, 233.65, 249.7, 255.08, 265.06, 271.17, 270.13, 265.01, 274, 253.79, 241.51, 244.39] },
      velocityScore: { '1D': 5.2, '1W': 12, '1M': -74.3, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 31.7, revenueGrowth: 17, eps: 7.72, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.01, GTEK: false, ARKK: 2.24, MARS: false, FRWD: 2.8, BCTK: 4.26, FWD: 1.45, CBSE: false, FCUS: false, WGMI: false, CNEQ: 5.78, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 5, avgWeight: 5.03, proScore: 1.48, coverage: 0.294,
      price: 1070.23, weeklyPrices: [931.04, 1018.80, 1031.34, 1066.07, 1070.23], weeklyChange: 14.95, dayChange: 0.39, sortRank: 0, periodReturns: { '1M': 44.5, 'YTD': 288.6, '6M': 266.5, '1Y': 717.2 },
      priceHistory: { '1D': [1066.07, 1133.72, 1113.3, 1108.07, 1092.4, 1090.55, 1086, 1089.76, 1085.74, 1074.55, 1077.33, 1073.46, 1069.25, 1071.36, 1067.71, 1069, 1065.64, 1064.16, 1064.15, 1059, 1058.7, 1067.59, 1077.55, 1070.23], '1W': [931.04, 1018.8, 1031.34, 1066.07, 1070.23], '1M': [740.84, 733.35, 751.07, 810.46, 812.73, 870.66, 880.72, 879.8, 921.26, 926.61, 940.69, 925.99, 847.47, 876.77, 846.01, 868.09, 931.04, 1018.8, 1031.34, 1066.07, 1070.23], 'YTD': [275.39, 284.47, 312.28, 346.53, 446.57, 418.63, 407.25, 424.14, 421.85, 375.01, 384.29, 421.09, 424.96, 362.43, 468.72, 533.44, 539.75, 595.86, 738.54, 782.64, 795.47, 810.46, 879.8, 847.47, 868.09, 1070.23], '6M': [292, 286.22, 289.83, 321.48, 325.99, 371.76, 444.45, 396.23, 424.14, 421.85, 375.01, 385.97, 406.77, 424.96, 391.76, 496.3, 519.6, 579.88, 643.3, 786.42, 817.35, 751.07, 880.72, 925.99, 868.09, 1070.23], '1Y': [130.96, 141.44, 148.39, 149.08, 149.63, 150.46, 154.81, 150.45, 154.43, 159.21, 167.4, 189.24, 211.12, 229.33, 229.14, 242.83, 214.38, 225.4, 234.12, 255.88, 279.35, 258.21, 237.49, 270.1, 285.41, 285.58, 296.36, 281.3, 330.42, 318.44, 344.22, 442.93, 418.63, 407.25, 408.97, 409.67, 375.01, 385.97, 406.77, 413.22, 423.12, 500.77, 531.81, 587.62, 673.64, 766.44, 817.35, 751.07, 880.72, 925.99, 868.09, 1070.23] },
      velocityScore: { '1D': -13.5, '1W': -6.9, '1M': -45.8, '6M': null }, isNew: false,
      marketCap: '$240B', pe: 102, revenueGrowth: 44, eps: 10.49, grossMargin: 42, dividendYield: 0.28,
      etfPresence: { PTF: 5.33, WCLD: false, IGV: false, FDTX: 4.04, GTEK: false, ARKK: false, MARS: false, FRWD: 8.6, BCTK: false, FWD: false, CBSE: false, FCUS: 5.04, WGMI: false, CNEQ: false, SGRT: false, SPMO: 2.15, XMMO: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'LRCX', name: 'LRCX', easyScore: 5, avgWeight: 4.54, proScore: 1.34, coverage: 0.294,
      price: 389.04, weeklyPrices: [366.81, 388.92, 369.34, 374.18, 389.04], weeklyChange: 6.06, dayChange: 3.97, sortRank: 0, periodReturns: { '1M': 40, 'YTD': 127.3, '6M': 136.2, '1Y': 329.9 },
      priceHistory: { '1D': [374.18, 396.01, 399.3, 397.05, 394.71, 397.02, 394.55, 395.86, 396.04, 396.71, 397.52, 397.18, 394.83, 396.38, 395.2, 395.99, 395.21, 392.71, 393.02, 394.14, 393.75, 392.77, 396.11, 389.04], '1W': [366.81, 388.92, 369.34, 374.18, 389.04], '1M': [277.96, 273.38, 292.09, 302.24, 305.35, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04], 'YTD': [171.18, 200.96, 208.79, 220.7, 248.17, 209.78, 235.12, 240.09, 249.48, 222.99, 215.23, 226.47, 238.84, 199.93, 224.35, 272.41, 263.16, 259.47, 258.57, 294.05, 284.72, 302.24, 318.18, 303.28, 362.52, 389.04], '6M': [164.7, 178.07, 194.76, 220.4, 222.41, 238.46, 230.1, 226.61, 240.09, 249.48, 222.99, 218.87, 224.71, 238.84, 213.66, 246.49, 265.16, 265.55, 248.75, 297.17, 295.44, 292.09, 318, 336.41, 362.52, 389.04], '1Y': [90.49, 97.2, 98.14, 99.62, 101.74, 98.62, 96.37, 101.75, 99.51, 100.08, 100.15, 105.07, 119.21, 132.2, 131.09, 149.15, 131.37, 141.51, 151.68, 157.46, 159.35, 148.26, 142.65, 154.79, 162.74, 164.3, 172.27, 175.87, 206.96, 214.38, 228.39, 239.58, 209.78, 235.12, 237.39, 239.07, 222.99, 218.87, 224.71, 233.45, 222.01, 258.76, 260.96, 258.56, 257.86, 286.52, 295.44, 292.09, 318, 336.41, 362.52, 389.04] },
      velocityScore: { '1D': 4.7, '1W': -6.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$487B', pe: 73.5, revenueGrowth: 24, eps: 5.29, grossMargin: 50, dividendYield: 0.27,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.9, BCTK: 7.74, FWD: 1.94, CBSE: 3.05, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 4.07, XMMO: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 5, avgWeight: 4.07, proScore: 1.2, coverage: 0.294,
      price: 367.46, weeklyPrices: [358.16, 367.11, 371.10, 362.10, 367.46], weeklyChange: 2.6, dayChange: 1.48, sortRank: 0, periodReturns: { '1M': -6.5, 'YTD': 17.1, '6M': 21, '1Y': 119.1 },
      priceHistory: { '1D': [362.1, 357.51, 359.95, 360.64, 361.04, 362.08, 361.76, 362.18, 363.51, 363.83, 363.83, 364.77, 365.12, 365.01, 366.28, 365.99, 366.7, 366.24, 365.99, 366.83, 365.52, 365.98, 367.85, 367.46], '1W': [358.16, 367.11, 371.1, 362.1, 367.46], '1M': [393.11, 384.9, 384.9, 383.47, 379.38, 384.83, 386.12, 376.43, 372.58, 358.39, 355.68, 369.27, 365.76, 361.17, 362.29, 356.56, 358.16, 367.11, 371.1, 362.1, 367.46], 'YTD': [313.8, 326.01, 336.31, 330.84, 338.66, 333.34, 311.33, 303.94, 313.03, 303.45, 306.93, 309.41, 289.2, 273.14, 303.93, 330.58, 335.4, 348.52, 379.64, 397.05, 393.32, 383.47, 376.43, 365.76, 356.56, 367.46], '6M': [303.75, 314.96, 317.32, 332.73, 322.16, 335, 340.7, 318.63, 303.94, 313.03, 303.45, 308.42, 306.3, 289.2, 286.86, 314.74, 334.47, 337.73, 347.31, 395.14, 399.04, 384.9, 386.12, 369.27, 356.56, 367.46], '1Y': [167.73, 178.27, 177.56, 182.81, 191.15, 193.42, 189.95, 202.09, 204.91, 206.72, 213.53, 234.16, 251.76, 252.88, 244.36, 251.51, 237.49, 253.79, 260.51, 281.82, 279.7, 276.98, 299.65, 315.12, 314.45, 309.32, 308.61, 314.39, 314.55, 336.43, 328.38, 336.28, 333.34, 311.33, 303.56, 307.15, 303.45, 308.42, 306.3, 289.59, 294.9, 316.37, 332.77, 337.75, 381.94, 395.3, 399.04, 384.9, 386.12, 369.27, 356.56, 367.46] },
      velocityScore: { '1D': 39.5, '1W': 37.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.5T', pe: 28, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.66, GTEK: false, ARKK: 1.86, MARS: false, FRWD: false, BCTK: 5.53, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 5.78, SGRT: false, SPMO: 3.5, XMMO: false },
      tonyNote: 'Alphabet Inc Class C appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 4.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, avgWeight: 5.28, proScore: 1.24, coverage: 0.235,
      price: 379.4, weeklyPrices: [390.74, 399.76, 393.83, 378.91, 379.40], weeklyChange: -2.9, dayChange: 0.13, sortRank: 0, periodReturns: { '1M': -10.4, 'YTD': -21.5, '6M': -21.6, '1Y': -20.5 },
      priceHistory: { '1D': [378.91, 373.67, 376.46, 379.29, 378.4, 377.14, 375.96, 375.17, 375.35, 377.01, 377.59, 379.21, 378.96, 380.74, 379.7, 379.89, 379.51, 378.54, 377.74, 378.21, 377.58, 378.03, 378.15, 379.4], '1W': [390.74, 399.76, 393.83, 378.91, 379.4], '1M': [423.54, 417.42, 421.06, 419.09, 418.57, 412.67, 426.99, 450.24, 460.52, 441.31, 427.34, 428.05, 416.67, 411.74, 403.41, 390.34, 390.74, 399.76, 393.83, 378.91, 379.4], 'YTD': [483.62, 478.11, 459.38, 451.14, 433.5, 414.19, 404.37, 399.6, 400.6, 405.2, 405.76, 399.41, 372.74, 358.96, 372.29, 393.11, 418.07, 424.82, 413.62, 415.12, 421.92, 419.09, 450.24, 416.67, 390.34, 379.4], '6M': [483.98, 487.71, 472.85, 477.18, 454.52, 480.58, 411.21, 413.27, 399.6, 400.6, 405.2, 404.88, 391.79, 372.74, 370.17, 374.33, 411.22, 432.92, 424.46, 413.96, 405.21, 421.06, 426.99, 428.05, 390.34, 379.4], '1Y': [477.4, 495.94, 497.72, 503.02, 510.06, 512.5, 524.11, 522.04, 520.17, 507.23, 506.69, 498.2, 515.36, 514.45, 514.6, 528.57, 510.96, 513.58, 523.61, 517.81, 496.82, 510.18, 472.12, 486.74, 491.02, 474.82, 485.92, 487.1, 478.51, 470.67, 444.11, 481.63, 414.19, 404.37, 398.46, 401.72, 405.2, 404.88, 391.79, 371.04, 369.37, 373.07, 420.26, 415.75, 407.78, 420.77, 405.21, 421.06, 426.99, 428.05, 390.34, 379.4] },
      velocityScore: { '1D': 11.7, '1W': 9.7, '1M': -78.6, '6M': null }, isNew: false,
      marketCap: '$2.8T', pe: 22.6, revenueGrowth: 18, eps: 16.81, grossMargin: 68, dividendYield: 0.96,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.33, FDTX: 3.79, GTEK: false, ARKK: false, MARS: false, FRWD: 2.78, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 6.2, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'LITE', name: 'Lumentum Holdings Inc', easyScore: 4, avgWeight: 3.84, proScore: 0.9, coverage: 0.235,
      price: 850, weeklyPrices: [921.56, 957.24, 875.36, 869.98, 850.00], weeklyChange: -7.77, dayChange: -2.3, sortRank: 0, periodReturns: { '1M': -4, 'YTD': 130.6, '6M': 152.1, '1Y': 848 },
      priceHistory: { '1D': [869.98, 871, 851.95, 858.55, 873.26, 873.96, 868.95, 857.01, 859.25, 857.78, 859.32, 846.43, 844, 847.6, 843.25, 839.42, 837.37, 837.95, 834.59, 835.86, 836.34, 837.85, 848.54, 850], '1W': [921.56, 957.24, 875.36, 869.98, 850], '1M': [884.98, 890.09, 868.07, 964.5, 946.9, 902.31, 860.62, 854.96, 905, 1029.15, 938, 945.08, 863.66, 895.4, 821.76, 889.59, 921.56, 957.24, 875.36, 869.98, 850], 'YTD': [368.59, 348.26, 331.62, 354.49, 381.44, 465.54, 574.11, 594.26, 723.39, 680.8, 672, 649.56, 801.99, 654.79, 815.75, 852.79, 895.11, 859.68, 976.18, 903.8, 970.7, 964.5, 854.96, 863.66, 889.59, 850], '6M': [337.13, 390.77, 357.05, 339.87, 356.83, 370.66, 435.1, 561.13, 594.26, 723.39, 680.8, 672, 700.81, 801.99, 702.76, 896.02, 824.01, 873.6, 858.32, 944.28, 1030.37, 868.07, 860.62, 945.08, 889.59, 850], '1Y': [89.66, 94.75, 91.08, 92.24, 103.84, 107.17, 106.68, 116.27, 115.86, 119.34, 132.81, 149.4, 168.77, 164.71, 162.58, 160.6, 149.61, 164.77, 179.3, 201.56, 240.11, 232.15, 255.59, 317.93, 342.56, 334.69, 371.43, 372.61, 397.42, 361.33, 362.44, 385, 465.54, 574.11, 635.64, 677, 680.8, 672, 700.81, 777.17, 764.65, 894.13, 891.22, 846.89, 902.32, 892.58, 1030.37, 868.07, 860.62, 945.08, 889.59, 850] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$66B', pe: 149.1, revenueGrowth: 90, eps: 5.7, grossMargin: 41, dividendYield: null,
      etfPresence: { PTF: 3.46, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 1.4, FWD: false, CBSE: false, FCUS: 2.42, WGMI: false, CNEQ: false, SGRT: 8.09, SPMO: false, XMMO: false },
      tonyNote: 'Lumentum Holdings Inc appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 4, avgWeight: 3.81, proScore: 0.9, coverage: 0.235,
      price: 128.47, weeklyPrices: [127.99, 134.71, 133.25, 130.63, 128.47], weeklyChange: 0.38, dayChange: -1.65, sortRank: 0, periodReturns: { '1M': -4.9, 'YTD': -27.7, '6M': -30.8, '1Y': -6.4 },
      priceHistory: { '1D': [130.63, 127.9, 125.94, 127.49, 127.63, 127.36, 127.21, 126.46, 126.14, 127.43, 127.93, 128.24, 128.01, 128.75, 128.69, 128.69, 128.54, 128.04, 127.89, 128.13, 127.94, 128.43, 128.5, 128.47], '1W': [127.99, 134.71, 133.25, 130.63, 128.47], '1M': [135.14, 135.26, 137.15, 137.41, 136.88, 132.51, 143.34, 156.54, 160.65, 152.17, 142.2, 141.7, 135.53, 136.47, 132.07, 131.08, 127.99, 134.71, 133.25, 130.63, 128.47], 'YTD': [177.75, 176.86, 178.4, 165.9, 151.86, 139.54, 135.68, 135.38, 134.19, 153.19, 151.14, 155.08, 154.78, 137.55, 150.07, 135.7, 145.89, 143.1, 146.03, 137.8, 133.99, 137.41, 156.54, 135.53, 131.08, 128.47], '6M': [185.69, 188.71, 174.04, 179.41, 168.53, 165.7, 157.88, 139.51, 135.38, 134.19, 153.19, 151.6, 152.77, 154.78, 146.28, 140.76, 142.15, 152.62, 137.97, 133.79, 130.05, 137.15, 143.34, 141.7, 131.08, 128.47], '1Y': [137.3, 130.74, 139.12, 149.15, 151.79, 157.88, 154.27, 186.96, 177.17, 158.74, 156.71, 156.1, 171.21, 179.33, 178.86, 179.53, 175.44, 178.15, 184.63, 200.47, 177.93, 174.01, 154.85, 167.49, 181.49, 183.25, 193.38, 184.18, 179.71, 178.96, 165.33, 157.35, 139.54, 135.68, 134.89, 135.94, 153.19, 151.6, 152.77, 154.96, 146.49, 130.49, 142.76, 141.57, 139.11, 137.05, 130.05, 137.15, 143.34, 141.7, 131.08, 128.47] },
      velocityScore: { '1D': -7.2, '1W': -7.2, '1M': -68.9, '6M': null }, isNew: false,
      marketCap: '$308B', pe: 144.3, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.6, FDTX: 2.87, GTEK: false, ARKK: 2.71, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.07, XMMO: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'CRWD', name: 'CrowdStrike', easyScore: 4, avgWeight: 2.86, proScore: 0.67, coverage: 0.235,
      price: 684.86, weeklyPrices: [682.80, 692.91, 679.49, 682.96, 684.86], weeklyChange: 0.3, dayChange: 0.28, sortRank: 0, periodReturns: { '1M': 10.7, 'YTD': 46.1, '6M': 43.5, '1Y': 43.8 },
      priceHistory: { '1D': [682.96, 672.72, 674.12, 674.3, 680.05, 683.01, 679.46, 675.62, 671.18, 672.98, 673.73, 674.83, 674.47, 679.1, 678.02, 683.08, 683.65, 679.59, 678.52, 679.37, 678.04, 680.18, 678.94, 684.86], '1W': [682.8, 692.91, 679.49, 682.96, 684.86], '1M': [618.83, 616.88, 650.11, 648.23, 663.46, 645.36, 671, 731, 782.17, 768.95, 747.61, 719.09, 671.02, 658.79, 644.93, 691.53, 682.8, 692.91, 679.49, 682.96, 684.86], 'YTD': [468.76, 463.87, 460.7, 453.77, 444.62, 415.36, 415.81, 415.76, 363.31, 407.68, 436.33, 433.2, 392.99, 380.06, 423.23, 398.49, 433.15, 454.61, 469.24, 527.77, 594.08, 648.23, 731, 671.02, 691.53, 684.86], '6M': [477.26, 481.19, 456.55, 466.99, 442.73, 476.66, 421.73, 413.39, 415.76, 363.31, 407.68, 442.03, 435.81, 392.99, 390.41, 426.51, 411.16, 466.68, 452.38, 468.07, 562.57, 650.11, 671, 719.09, 691.53, 684.86], '1Y': [476.3, 499.33, 505.46, 476.18, 481.58, 472.18, 446.66, 424.49, 427.9, 420.55, 423.7, 428.06, 444.77, 493.14, 488.45, 495.95, 493.66, 484.65, 527.32, 543.01, 539.81, 537.55, 490.67, 504.13, 515.19, 487.47, 481.28, 475.91, 458.32, 468.02, 445.88, 469.19, 415.36, 415.81, 422.14, 381.1, 407.68, 442.03, 435.81, 385.86, 393.31, 394.68, 418.2, 445.39, 445.75, 505.72, 562.57, 650.11, 671, 719.09, 691.53, 684.86] },
      velocityScore: { '1D': -13, '1W': -15.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$174B', pe: null, revenueGrowth: 26, eps: -0.14, grossMargin: 75, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.54, IGV: 6.63, FDTX: 1.24, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.04, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'CrowdStrike appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SHOP', name: 'Shopify Inc Registered Shs -A- Subord Vtg', easyScore: 4, avgWeight: 2.81, proScore: 0.66, coverage: 0.235,
      price: 108.85, weeklyPrices: [108.24, 112.49, 113.23, 108.09, 108.85], weeklyChange: 0.56, dayChange: 0.7, sortRank: 0, periodReturns: { '1M': 6.3, 'YTD': -32.4, '6M': -34.7, '1Y': 2.3 },
      priceHistory: { '1D': [108.09, 106.82, 107.15, 108.1, 109.11, 108.39, 108.59, 107.83, 107.56, 108.25, 109.34, 108.93, 108.81, 109.29, 108.88, 109.34, 109.06, 108.78, 108.68, 109.11, 109.15, 108.68, 108.49, 108.85], '1W': [108.24, 112.49, 113.23, 108.09, 108.85], '1M': [102.39, 101.01, 105.01, 104.86, 103, 106.6, 115.03, 118.71, 124.12, 117.01, 112.94, 116.04, 109.54, 110.78, 110.42, 110.47, 108.24, 112.49, 113.23, 108.09, 108.85], 'YTD': [160.97, 168.28, 157.51, 137.64, 143.64, 114.02, 118.71, 121.64, 120.31, 129.65, 129.36, 127.8, 116.15, 111.77, 117.06, 117.64, 135.14, 124.23, 127.55, 110.41, 100.28, 104.86, 118.71, 109.54, 110.47, 108.85], '6M': [166.8, 170.83, 166.21, 167.93, 144.5, 137.5, 119.29, 127.24, 121.64, 120.31, 129.65, 129.52, 123.75, 116.15, 118.62, 120.1, 127.41, 131.96, 121.26, 105.44, 95.4, 105.01, 115.03, 116.04, 110.47, 108.85], '1Y': [106.4, 113.65, 116.66, 116.74, 128.43, 126.84, 118.6, 149.61, 141.47, 142.11, 141.28, 146.22, 147.89, 157.12, 149, 164.5, 151.02, 157.76, 172.95, 173.86, 152.41, 146.04, 147.8, 149.28, 158.41, 159.85, 169.57, 167.88, 168.45, 167.44, 138.54, 138.92, 114.02, 118.71, 123.8, 125.94, 129.65, 129.52, 123.75, 118.42, 118.52, 112.38, 126.94, 124.23, 121.13, 111.74, 95.4, 105.01, 115.03, 116.04, 110.47, 108.85] },
      velocityScore: { '1D': -25, '1W': -28.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$141B', pe: 106.7, revenueGrowth: 34, eps: 1.02, grossMargin: 48, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.89, GTEK: false, ARKK: 4.07, MARS: false, FRWD: 1.79, BCTK: 2.51, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Shopify Inc Registered Shs -A- Subord Vtg appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 2.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC-CL A', easyScore: 4, avgWeight: 2.51, proScore: 0.59, coverage: 0.235,
      price: 368.03, weeklyPrices: [359.68, 369.35, 373.25, 363.79, 368.03], weeklyChange: 2.32, dayChange: 1.17, sortRank: 0, periodReturns: { '1M': -7.3, 'YTD': 17.6, '6M': 21.7, '1Y': 120.9 },
      priceHistory: { '1D': [363.79, 359.41, 362.07, 362.68, 363.13, 364.04, 363.53, 364, 365.22, 365.5, 365.45, 366.45, 366.71, 366.47, 367.85, 367.64, 368.33, 367.84, 367.51, 368.47, 367.22, 367.62, 369.28, 368.03], '1W': [359.68, 369.35, 373.25, 363.79, 368.03], '1M': [396.94, 387.66, 388.91, 387.66, 382.97, 388.83, 390.13, 380.34, 376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 364.26, 357.77, 359.68, 369.35, 373.25, 363.79, 368.03], 'YTD': [313, 325.44, 335.84, 330.54, 338.25, 333.04, 310.96, 303.33, 312.9, 303.13, 307.04, 310.92, 290.44, 273.5, 305.46, 332.91, 337.42, 350.34, 383.25, 400.8, 396.78, 387.66, 380.34, 368.53, 357.77, 368.03], '6M': [302.46, 313.51, 316.54, 331.86, 322, 334.55, 339.71, 318.58, 303.33, 312.9, 303.13, 308.7, 307.69, 290.44, 287.56, 317.32, 337.12, 339.32, 349.94, 398.04, 402.62, 388.91, 390.13, 372.19, 357.77, 368.03], '1Y': [166.64, 178.53, 176.79, 181.56, 190.1, 192.58, 189.13, 201.42, 203.9, 206.09, 212.91, 234.04, 251.61, 252.53, 244.05, 250.43, 236.57, 253.3, 259.92, 281.19, 278.83, 276.41, 299.66, 314.89, 313.72, 308.22, 307.16, 313.56, 314.34, 335.97, 328.38, 336.01, 333.04, 310.96, 302.85, 307.38, 303.13, 308.7, 307.69, 290.93, 297.39, 318.49, 336.02, 338.89, 384.8, 397.99, 402.62, 388.91, 390.13, 372.19, 357.77, 368.03] },
      velocityScore: { '1D': null, '1W': null, '1M': -88.2, '6M': null }, isNew: true,
      marketCap: '$4.5T', pe: 28.1, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 0.51, MARS: false, FRWD: 3.19, BCTK: false, FWD: 1.96, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 4.38, XMMO: false },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'KLAC', name: 'KLAC', easyScore: 4, avgWeight: 2.03, proScore: 0.48, coverage: 0.235,
      price: 259.56, weeklyPrices: [254.54, 256.42, 237.33, 238.73, 259.56], weeklyChange: 1.97, dayChange: 8.73, sortRank: 0, periodReturns: { '1M': 47.8, 'YTD': 113.6, '6M': 112.3, '1Y': 205.4 },
      priceHistory: { '1D': [238.73, 252.43, 256.59, 256.59, 254.06, 254.2, 254.29, 255.73, 257.27, 259.21, 259.14, 259.71, 259.3, 259.65, 258.59, 259.84, 259.47, 258.18, 258.67, 260.71, 261.4, 261.31, 263.46, 259.56], '1W': [254.54, 256.42, 237.33, 238.73, 259.56], '1M': [175.65, 174.06, 182.95, 184.22, 188.84, 195.72, 192.76, 192.17, 194, 204.52, 212.51, 213.11, 192.92, 210.81, 213.94, 241.16, 254.54, 256.42, 237.33, 238.73, 259.56], 'YTD': [121.51, 132.46, 143.45, 150, 168.47, 130.72, 147.95, 148.03, 154.67, 147.59, 145.29, 148.13, 156.62, 138.26, 154.88, 179.59, 180.53, 190, 171.33, 186.92, 180.43, 184.22, 192.17, 192.92, 241.16, 259.56], '6M': [122.24, 127.96, 135.24, 142.82, 148.62, 161.63, 135.55, 143.08, 148.03, 154.67, 147.59, 146.5, 148.24, 156.62, 147.24, 167.23, 174.81, 181.21, 181.62, 181.63, 184.97, 182.95, 192.76, 213.11, 241.16, 259.56], '1Y': [85, 88.99, 91.26, 92.18, 93.78, 92.32, 88.66, 91.48, 87.49, 87.03, 87.2, 90.9, 98.89, 107.13, 106.41, 113.97, 98.28, 110.67, 118.28, 120.87, 119.34, 113.43, 109.71, 115.72, 122.46, 122.51, 124.57, 126.04, 139.5, 144.18, 152, 162.72, 130.72, 147.95, 146.99, 152.43, 147.59, 146.5, 148.24, 154.38, 151.98, 172.73, 173.49, 181.54, 175.04, 176.32, 184.97, 182.95, 192.76, 213.11, 241.16, 259.56] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$339B', pe: 73.5, revenueGrowth: 12, eps: 3.53, grossMargin: 61, dividendYield: 0.35,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: 1.75, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.68, CBSE: 2.94, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.76, XMMO: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 3, avgWeight: 5.69, proScore: 1, coverage: 0.176,
      price: 2184.75, weeklyPrices: [1980.10, 2107.86, 1991.55, 1958.80, 2184.75], weeklyChange: 10.34, dayChange: 11.54, sortRank: 0, periodReturns: { '1M': 63.9, 'YTD': 820.4, '6M': 895.5, '1Y': 4590.3 },
      priceHistory: { '1D': [1958.8, 2110.45, 2140.15, 2173.94, 2153.46, 2163.79, 2166.11, 2165.8, 2171.57, 2172.5, 2174.54, 2164.96, 2164.73, 2175.95, 2177, 2172.97, 2174.24, 2184.4, 2178.87, 2165.7, 2166.74, 2186, 2183.09, 2184.75], '1W': [1980.1, 2107.86, 1991.55, 1958.8, 2184.75], '1M': [1333.01, 1383.29, 1392.56, 1542.24, 1478.69, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75], 'YTD': [237.38, 334.54, 387.81, 503.44, 539.3, 584.55, 599.34, 600.4, 632.38, 599.06, 618.89, 720.17, 702.48, 572.5, 710.8, 944.46, 913.02, 1070.2, 1255.86, 1562.34, 1407.61, 1542.24, 1694.98, 1559.32, 1881.51, 2184.75], '6M': [219.46, 250.05, 274.08, 389.27, 453.12, 481.43, 695.51, 541.64, 600.4, 632.38, 599.06, 655.43, 753.69, 702.48, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1447.23, 1392.56, 1641.64, 1759.68, 1881.51, 2184.75], '1Y': [46.58, 47.15, 45.22, 42.48, 41.61, 41.89, 41.33, 44.34, 44.54, 46.37, 52.47, 70.5, 90.09, 102.92, 113.5, 121.17, 116.91, 140.16, 186.16, 199.33, 239.48, 254.16, 200.27, 210.17, 225.47, 201.87, 237.61, 244.25, 349.63, 389.81, 501.29, 527.63, 584.55, 599.34, 621.09, 651.9, 599.06, 655.43, 753.69, 677.86, 692.73, 851.57, 919.47, 932.43, 1096.51, 1339.96, 1447.23, 1392.56, 1641.64, 1759.68, 1881.51, 2184.75] },
      velocityScore: { '1D': -13, '1W': null, '1M': -61.8, '6M': null }, isNew: false,
      marketCap: '$324B', pe: 74.6, revenueGrowth: 251, eps: 29.28, grossMargin: 56, dividendYield: null,
      etfPresence: { PTF: 9.23, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: 4.87, WGMI: false, CNEQ: false, SGRT: false, SPMO: 2.98, XMMO: false },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 3, avgWeight: 5.22, proScore: 0.92, coverage: 0.176,
      price: 400.49, weeklyPrices: [406.43, 411.15, 404.66, 396.38, 400.49], weeklyChange: -1.46, dayChange: 1.04, sortRank: 0, periodReturns: { '1M': -2.3, 'YTD': -10.9, '6M': -17.1, '1Y': 24.3 },
      priceHistory: { '1D': [396.38, 388.15, 390.04, 391.02, 388.07, 388.27, 389.26, 389.55, 388.38, 391.73, 392.72, 393.2, 393.55, 394.08, 395.19, 396.31, 395.88, 394.61, 394.6, 394.89, 394.38, 395.87, 399.64, 400.49], '1W': [406.43, 411.15, 404.66, 396.38, 400.49], '1M': [409.99, 404.11, 417.26, 417.85, 426.01, 440.36, 442.1, 435.79, 415.88, 423.74, 423.7, 418.45, 391, 408.95, 396.68, 399.15, 406.43, 411.15, 404.66, 396.38, 400.49], 'YTD': [449.72, 435.8, 439.2, 449.36, 416.56, 406.01, 428.27, 411.32, 417.4, 405.94, 399.24, 399.27, 383.03, 355.28, 346.65, 364.2, 392.5, 378.67, 392.51, 428.35, 422.24, 417.85, 435.79, 391, 399.15, 400.49], '6M': [483.37, 475.19, 451.67, 448.96, 419.25, 430.9, 421.96, 425.21, 411.32, 417.4, 405.94, 407.82, 392.78, 383.03, 371.75, 343.25, 391.95, 387.51, 372.8, 398.73, 445.27, 417.26, 442.1, 418.45, 399.15, 400.49], '1Y': [322.16, 323.63, 293.94, 316.9, 328.49, 325.59, 302.63, 329.65, 330.56, 340.01, 333.87, 346.4, 410.04, 434.21, 443.21, 453.25, 413.49, 439.31, 433.72, 456.56, 429.52, 404.35, 391.09, 430.14, 439.58, 475.31, 481.2, 459.64, 432.96, 447.2, 431.44, 431.46, 406.01, 428.27, 411.71, 408.58, 405.94, 407.82, 392.78, 385.95, 381.26, 345.62, 388.9, 373.72, 381.63, 411.79, 445.27, 417.26, 442.1, 418.45, 399.15, 400.49] },
      velocityScore: { '1D': -14, '1W': null, '1M': -86.1, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 370.8, revenueGrowth: 16, eps: 1.08, grossMargin: 19, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 9.5, MARS: false, FRWD: false, BCTK: 3.2, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 2.96, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'BE', name: 'Bloom Energy Corp', easyScore: 4, avgWeight: 3.67, proScore: 2.94, coverage: 0.8,
      price: 328.91, weeklyPrices: [260.22, 274.50, 280.88, 284.99, 328.91], weeklyChange: 26.4, dayChange: 15.41, sortRank: 0, periodReturns: { '1M': 27.1, 'YTD': 278.5, '6M': 310.1, '1Y': 1412.2 },
      priceHistory: { '1D': [284.99, 303.53, 303.66, 309.75, 310.73, 311.19, 312.5, 312.36, 310.6, 311.97, 310.6, 310.16, 310.11, 311.46, 311.58, 311.8, 309.27, 309.86, 309.92, 317.68, 321.56, 321.36, 326.42, 328.91], '1W': [260.22, 274.5, 280.88, 284.99, 328.91], '1M': [258.71, 261.34, 282.31, 307.88, 302.49, 293.8, 290.01, 285, 273.51, 302.85, 287.32, 291.37, 263.61, 253.57, 259.61, 248.88, 260.22, 274.5, 280.88, 284.99, 328.91], 'YTD': [86.89, 121.84, 133.46, 145.63, 156.51, 147.35, 155.54, 157.27, 174.77, 164.78, 154, 160.05, 145.88, 119.51, 135.91, 219.03, 218.27, 234.68, 288.64, 261.03, 275.95, 307.88, 285, 263.61, 248.88, 328.91], '6M': [80.21, 90.18, 103.87, 136.87, 151.75, 152.31, 168.89, 148.7, 157.27, 174.77, 164.78, 159.21, 156.58, 145.88, 135.49, 146.78, 213.84, 229.75, 287.97, 285.47, 289.76, 282.31, 290.01, 291.37, 248.88, 328.91], '1Y': [21.75, 22.18, 24.36, 25.96, 25.36, 34.78, 36.72, 36.8, 45.28, 48.54, 52.94, 53.44, 67.02, 86.27, 73.6, 86.97, 86.87, 111.5, 110.38, 132.16, 135.21, 111.89, 89.99, 98.93, 111.79, 89.58, 88.82, 88.41, 103.05, 139.77, 150.56, 165.39, 147.35, 155.54, 159, 168.57, 164.78, 159.21, 156.58, 150.22, 132.45, 160.13, 210.06, 237.57, 283.36, 258.64, 289.76, 282.31, 290.01, 291.37, 248.88, 328.91] },
      velocityScore: { '1D': 27.3, '1W': 37.4, '1M': 17.6, '6M': null }, isNew: false,
      marketCap: '$94B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: 1.76, VOLT: 4.55, PBD: false, PBW: 2.59, IVEP: 5.78 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 3, avgWeight: 4.68, proScore: 2.81, coverage: 0.6,
      price: 702.25, weeklyPrices: [707.74, 724.35, 719.29, 714.85, 702.25], weeklyChange: -0.78, dayChange: -1.76, sortRank: 0, periodReturns: { '1M': -2.9, 'YTD': 66.4, '6M': 66.7, '1Y': 94.6 },
      priceHistory: { '1D': [714.85, 723.76, 704.74, 705.59, 705.12, 707.05, 710.47, 704.92, 706.57, 710.3, 707.24, 711.32, 709.63, 713.85, 712.2, 710.4, 708.26, 710.59, 709.97, 709.84, 708.42, 706.84, 706.25, 702.25], '1W': [707.74, 724.35, 719.29, 714.85, 702.25], '1M': [723.03, 714.13, 709.93, 716.91, 723.44, 733.62, 730.1, 711.73, 687.48, 706.06, 715.67, 719.17, 695.11, 693.81, 691.95, 683.29, 707.74, 724.35, 719.29, 714.85, 702.25], 'YTD': [422.06, 413.17, 437.07, 468.78, 483.43, 464.57, 523.96, 519.31, 562.77, 568.38, 564.05, 571.64, 578.44, 533.78, 555.57, 594.4, 604.97, 637.28, 757.34, 745, 769.99, 716.91, 711.73, 695.11, 683.29, 702.25], '6M': [421.31, 432.67, 435.82, 432.66, 463.49, 479.27, 488.6, 510.64, 519.31, 562.77, 568.38, 567.71, 572, 578.44, 549.02, 576.24, 591.82, 613.78, 628.6, 785.24, 773.72, 709.93, 730.1, 719.17, 683.29, 702.25], '1Y': [360.78, 381.26, 385.8, 387, 398.66, 411.99, 395.17, 386.15, 380.81, 379.84, 377.96, 375.53, 385.68, 396.02, 409.11, 427.8, 417.61, 433.85, 440.93, 449.13, 445.01, 429.3, 430.15, 452.23, 463.09, 435.87, 426.66, 431.03, 438.22, 444.2, 473.24, 481.28, 464.57, 523.96, 554, 565.05, 568.38, 567.71, 572, 573.5, 560.12, 582.06, 587.42, 633.44, 727.77, 750.73, 773.72, 709.93, 730.1, 719.17, 683.29, 702.25] },
      velocityScore: { '1D': -3.1, '1W': -4.7, '1M': -23.4, '6M': null }, isNew: false,
      marketCap: '$105B', pe: 96.2, revenueGrowth: 26, eps: 7.3, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.66, VOLT: 5.23, PBD: false, PBW: false, IVEP: 4.15 },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 3, avgWeight: 4.61, proScore: 2.77, coverage: 0.6,
      price: 297.2, weeklyPrices: [294.75, 303.53, 292.70, 294.03, 297.20], weeklyChange: 0.83, dayChange: 1.08, sortRank: 0, periodReturns: { '1M': 11.4, 'YTD': 179.7, '6M': 171.2, '1Y': 408.3 },
      priceHistory: { '1D': [294.03, 293.83, 290.32, 287.45, 293.87, 294.27, 291.91, 290.17, 291.7, 295.59, 296.89, 297.15, 299.19, 299.76, 298.43, 298.66, 298.18, 297.33, 295.08, 294.96, 295.11, 296.39, 296.13, 297.2], '1W': [294.75, 303.53, 292.7, 294.03, 297.2], '1M': [266.8, 261.58, 271.05, 270.75, 279.22, 295.94, 288.9, 284.42, 288.12, 299.07, 299.73, 300.06, 284.87, 293.6, 283.51, 290.5, 294.75, 303.53, 292.7, 294.03, 297.2], 'YTD': [106.26, 119.94, 133.76, 142.29, 152.31, 175.77, 197.45, 180.99, 183, 170.96, 176.51, 174.04, 186.82, 167.52, 201.7, 234.42, 241.65, 260.52, 269.95, 309.39, 292.65, 270.75, 284.42, 284.87, 290.5, 297.2], '6M': [109.59, 113.62, 120.46, 128.85, 142.76, 147.43, 151.08, 190.09, 180.99, 183, 170.96, 171.73, 167.41, 186.82, 180.36, 218.07, 229.73, 242.77, 253.49, 320.3, 300.84, 271.05, 288.9, 300.06, 290.5, 297.2], '1Y': [58.47, 70.97, 71.96, 70.19, 73.64, 80.8, 75.89, 81.28, 84.88, 87.65, 88.72, 90.8, 100.68, 100.97, 101.01, 103.9, 100.35, 110.24, 121.66, 127.8, 121.79, 109.89, 94.02, 106.53, 114.29, 109.31, 110.97, 111.96, 120, 133.04, 140.62, 147.81, 175.77, 197.45, 178.79, 176.96, 170.96, 171.73, 167.41, 194.85, 184.68, 230.81, 232.81, 252.18, 277.27, 305.93, 300.84, 271.05, 288.9, 300.06, 290.5, 297.2] },
      velocityScore: { '1D': -12.1, '1W': -14.5, '1M': -45, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 58.2, revenueGrowth: 7, eps: 5.11, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { POW: 4.67, VOLT: 7.33, PBD: false, PBW: 1.83, IVEP: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 3, avgWeight: 4.42, proScore: 2.65, coverage: 0.6,
      price: 421.77, weeklyPrices: [391.39, 407.06, 407.71, 409.64, 421.77], weeklyChange: 7.76, dayChange: 2.96, sortRank: 0, periodReturns: { '1M': 10.4, 'YTD': 32.4, '6M': 33.5, '1Y': 27.3 },
      priceHistory: { '1D': [409.64, 422.18, 421.47, 419.92, 421.76, 423.08, 423.28, 422.65, 421.35, 422.1, 422.49, 422.7, 423.09, 425.14, 424.29, 425.08, 423.8, 423.48, 422.79, 422.49, 421.59, 421.14, 422.94, 421.77], '1W': [391.39, 407.06, 407.71, 409.64, 421.77], '1M': [381.87, 371.88, 379.69, 381.51, 391.35, 406.37, 401.94, 400.6, 400.08, 417.62, 421.21, 418.61, 395.94, 403.14, 401.72, 393.64, 391.39, 407.06, 407.71, 409.64, 421.77], 'YTD': [318.51, 320.58, 331.14, 334.04, 354.37, 365, 396.09, 380.38, 373.53, 354.46, 361.06, 363.95, 374.1, 343.53, 368.85, 401.9, 407.57, 416.77, 422.44, 401.51, 399.44, 381.51, 400.6, 395.94, 393.64, 421.77], '6M': [315.95, 322.17, 322.26, 329.1, 337.59, 341.19, 362.53, 377.47, 380.38, 373.53, 354.46, 355.79, 360.54, 374.1, 357.67, 385.58, 395.06, 413.87, 410.77, 421.39, 406.94, 379.69, 401.94, 418.61, 393.64, 421.77], '1Y': [331.23, 353.23, 358.49, 360.29, 373.66, 392.76, 381.29, 362.84, 351.03, 347.61, 349.14, 349.49, 375.54, 378.31, 367.15, 380.02, 369.08, 373.3, 376.29, 381.56, 373.77, 352.39, 331.71, 339.71, 343.39, 333.21, 317.8, 321.45, 332.97, 332.38, 337.96, 347.32, 365, 396.09, 377.32, 374.59, 354.46, 355.79, 360.54, 375, 365.56, 400.44, 392.73, 424.5, 433.01, 399.15, 406.94, 379.69, 401.94, 418.61, 393.64, 421.77] },
      velocityScore: { '1D': -0.4, '1W': 1.1, '1M': -17.2, '6M': null }, isNew: false,
      marketCap: '$164B', pe: 41.3, revenueGrowth: 17, eps: 10.21, grossMargin: 37, dividendYield: 1.04,
      etfPresence: { POW: 3.92, VOLT: 5.38, PBD: false, PBW: false, IVEP: 3.96 },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 3, avgWeight: 3.96, proScore: 2.38, coverage: 0.6,
      price: 1109.73, weeklyPrices: [940.66, 979.07, 982.35, 1048.86, 1109.73], weeklyChange: 17.97, dayChange: 5.8, sortRank: 0, periodReturns: { '1M': 9.6, 'YTD': 69.8, '6M': 73.5, '1Y': 127.9 },
      priceHistory: { '1D': [1048.86, 1092.98, 1106.66, 1103, 1115.61, 1114.24, 1112.08, 1107.51, 1102.18, 1102.82, 1099.86, 1100.01, 1102.37, 1103.25, 1099.52, 1097.73, 1098.53, 1099.95, 1098.8, 1097.14, 1097.94, 1103.12, 1110.33, 1109.73], '1W': [940.66, 979.07, 982.35, 1048.86, 1109.73], '1M': [1012.25, 1011.8, 1024.52, 1043.82, 1038.74, 1031.89, 996, 968.32, 950.54, 969.67, 959.36, 963.33, 933.61, 933.85, 920.15, 906.79, 940.66, 979.07, 982.35, 1048.86, 1109.73], 'YTD': [653.57, 628.4, 644.18, 661.67, 717.39, 746.22, 823.67, 817.55, 876.01, 841.27, 839.2, 844.05, 909.41, 817.35, 910.75, 987.5, 990.18, 1120.23, 1073.95, 1040.15, 1049.23, 1043.82, 968.32, 933.61, 906.79, 1109.73], '6M': [639.43, 663.46, 680.86, 639.77, 684.86, 692.7, 780.25, 790.79, 817.55, 876.01, 841.27, 847.65, 858.47, 909.41, 872.9, 936.07, 985.92, 1127.56, 1063.11, 1118.96, 1062.57, 1024.52, 996, 963.33, 906.79, 1109.73], '1Y': [486.96, 519.66, 530.28, 555.04, 565.91, 647.66, 656.5, 649.09, 621.91, 607.07, 612.97, 600.23, 628.68, 644.37, 602.43, 603.22, 604.56, 600, 584.39, 585.14, 575.13, 578.31, 555.84, 576.9, 621.9, 681.35, 658.28, 663.46, 686.33, 652.09, 667.89, 711.59, 746.22, 823.67, 834.61, 876.46, 841.27, 847.65, 858.47, 923.69, 894.78, 968.02, 978.32, 1149.53, 1083.46, 1045.63, 1062.57, 1024.52, 996, 963.33, 906.79, 1109.73] },
      velocityScore: { '1D': 0, '1W': 8.7, '1M': -13.5, '6M': null }, isNew: false,
      marketCap: '$298B', pe: 32.5, revenueGrowth: 16, eps: 34.18, grossMargin: 20, dividendYield: 0.18,
      etfPresence: { POW: 3.25, VOLT: 4.39, PBD: false, PBW: false, IVEP: 4.25 },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 3, avgWeight: 3.42, proScore: 2.05, coverage: 0.6,
      price: 177.02, weeklyPrices: [165.84, 169.00, 167.34, 170.94, 177.02], weeklyChange: 6.74, dayChange: 3.56, sortRank: 0, periodReturns: { '1M': 10.2, 'YTD': 73.6, '6M': 80.1, '1Y': 151.9 },
      priceHistory: { '1D': [170.94, 176.66, 175.95, 174.89, 175.35, 175.85, 176.32, 175.55, 175.07, 175.71, 175.53, 175.74, 176.25, 178.22, 177.64, 177.55, 177.82, 177.94, 177.6, 177.75, 176.98, 176.82, 176.72, 177.02], '1W': [165.84, 169, 167.34, 170.94, 177.02], '1M': [160.69, 158.23, 161.86, 163.57, 164.66, 167.8, 164.87, 166.99, 171.55, 173.39, 176.39, 173.88, 162.86, 163.81, 163.8, 164.52, 165.84, 169, 167.34, 170.94, 177.02], 'YTD': [101.97, 102.72, 104.54, 111.57, 115.62, 116.69, 112.75, 115.65, 121.8, 113.83, 109.13, 114.71, 125.61, 112.75, 118.92, 134.48, 135.8, 141.71, 162.69, 169.95, 169.01, 163.57, 166.99, 162.86, 164.52, 177.02], '6M': [98.28, 104.18, 106.61, 106.39, 109.9, 113.16, 119.43, 112.15, 115.65, 121.8, 113.83, 111.09, 120.27, 125.61, 118.28, 127.11, 131.38, 140.13, 137.37, 172.49, 172.91, 161.86, 164.87, 173.88, 164.52, 177.02], '1Y': [70.26, 73.35, 74.51, 74.97, 74.96, 79.07, 89.88, 88.68, 88.01, 90.08, 90.39, 92.58, 96.35, 100.25, 96.7, 98, 95.98, 99.33, 102.2, 114.35, 111.03, 106.55, 100.55, 105.67, 107.11, 102.61, 101.54, 103.26, 110.09, 106.64, 112.66, 114.15, 116.69, 112.75, 116.88, 121.79, 113.83, 111.09, 120.27, 127.01, 121.26, 128.63, 129.7, 142.76, 142.9, 166.73, 172.91, 161.86, 164.87, 173.88, 164.52, 177.02] },
      velocityScore: { '1D': -0.5, '1W': -0.5, '1M': -14.9, '6M': null }, isNew: false,
      marketCap: '$29B', pe: 60.2, revenueGrowth: 54, eps: 2.94, grossMargin: 37, dividendYield: 0.47,
      etfPresence: { POW: 3.79, VOLT: 3.19, PBD: false, PBW: false, IVEP: 3.29 },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 3, avgWeight: 3.42, proScore: 2.05, coverage: 0.6,
      price: 86.75, weeklyPrices: [85.99, 86.12, 86.23, 85.73, 86.75], weeklyChange: 0.88, dayChange: 1.19, sortRank: 0, periodReturns: { '1M': -2.6, 'YTD': 8.1, '6M': 7.3, '1Y': 21.3 },
      priceHistory: { '1D': [85.73, 86.17, 86.22, 86.55, 87, 87.16, 87.11, 87.15, 87.31, 87.33, 87.24, 87.07, 87.2, 87.22, 87.11, 86.47, 86.63, 86.68, 86.73, 86.53, 86.29, 86.49, 86.51, 86.75], '1W': [85.99, 86.12, 86.23, 85.73, 86.75], '1M': [89.04, 90.06, 88.27, 89.69, 88.55, 87.65, 87.25, 87.01, 83.66, 85.68, 84.58, 85.68, 85.84, 84.01, 84.83, 84.84, 85.99, 86.12, 86.23, 85.73, 86.75], 'YTD': [80.28, 79.49, 81.98, 85.07, 88.18, 89.97, 91.36, 91.22, 95.11, 92.6, 91.54, 92.53, 91.62, 92.05, 93.67, 91.31, 92.01, 94.83, 95.51, 93.1, 93.36, 89.69, 87.01, 85.84, 84.84, 86.75], '6M': [80.85, 80.41, 81.32, 81.12, 83.51, 87.15, 88.82, 90.83, 91.22, 95.11, 92.6, 91.66, 90.96, 91.62, 92.88, 94.17, 91.24, 90, 94.17, 95.39, 94.85, 88.27, 87.25, 85.68, 84.84, 86.75], '1Y': [71.53, 70.89, 74.75, 75.04, 76.17, 71.34, 70.4, 72.41, 75.41, 76.32, 72.05, 69.77, 71.5, 72.35, 76.21, 82.11, 83.35, 84.53, 84.41, 81.4, 83.93, 83.88, 83.48, 84.65, 80.55, 81.65, 79.54, 80.27, 81.05, 81.64, 83.85, 87.57, 89.97, 91.36, 91.64, 91.99, 92.6, 91.66, 90.96, 91.16, 92.85, 94.48, 91.83, 96.25, 97.88, 93.32, 94.85, 88.27, 87.25, 85.68, 84.84, 86.75] },
      velocityScore: { '1D': -1.4, '1W': -4.2, '1M': -18, '6M': null }, isNew: false,
      marketCap: '$181B', pe: 22, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.87,
      etfPresence: { POW: 1.9, VOLT: 4.86, PBD: false, PBW: false, IVEP: 3.49 },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 3, avgWeight: 2.93, proScore: 1.76, coverage: 0.6,
      price: 523.69, weeklyPrices: [476.89, 489.73, 502.65, 508.87, 523.69], weeklyChange: 9.81, dayChange: 2.91, sortRank: 0, periodReturns: { '1M': 11.2, 'YTD': 17.9, '6M': 20.4, '1Y': 32.3 },
      priceHistory: { '1D': [508.87, 523.3, 525.98, 524.22, 526.48, 527.77, 527.29, 526.36, 524.34, 524.2, 524.24, 524.05, 523.99, 526.4, 524.61, 526.07, 524.12, 524.31, 524.88, 525.15, 523.16, 521.45, 522.34, 523.69], '1W': [476.89, 489.73, 502.65, 508.87, 523.69], '1M': [470.87, 461.5, 463.32, 460.98, 475.01, 484.25, 473.93, 473.61, 462.93, 480.46, 484.91, 485.27, 476.82, 485.03, 486.47, 469.32, 476.89, 489.73, 502.65, 508.87, 523.69], 'YTD': [444.11, 460.87, 476.06, 484.06, 497.97, 487.16, 516.03, 522.3, 527.9, 490.78, 478.06, 471.22, 505.62, 472.07, 499.31, 545.62, 546.23, 555.34, 516, 492.58, 479.97, 460.98, 473.61, 476.82, 469.32, 523.69], '6M': [434.85, 454.94, 465.48, 472.88, 472.54, 484.14, 503.86, 503.1, 522.3, 527.9, 490.78, 477.97, 477.47, 505.62, 490.74, 527.21, 526.94, 549.75, 545.93, 502.34, 483.79, 463.32, 473.93, 485.27, 469.32, 523.69], '1Y': [395.79, 406.62, 412.97, 415.08, 422.27, 438.31, 426.74, 418.65, 427.65, 440.85, 430.99, 436.62, 438.11, 438.49, 426.44, 413.05, 408.46, 425.71, 434.39, 470, 462.43, 432.82, 421.84, 427.85, 441.51, 444.84, 442.51, 451.39, 477.46, 481.68, 482.5, 485.73, 487.16, 516.03, 526.56, 524.19, 490.78, 477.97, 477.47, 503.2, 500.38, 534.67, 521.71, 557.85, 508.17, 493.04, 483.79, 463.32, 473.93, 485.27, 469.32, 523.69] },
      velocityScore: { '1D': -1.7, '1W': 2.3, '1M': -17, '6M': null }, isNew: false,
      marketCap: '$28B', pe: 31, revenueGrowth: 11, eps: 16.92, grossMargin: 36, dividendYield: 1.08,
      etfPresence: { POW: 2.79, VOLT: 3.44, PBD: false, PBW: false, IVEP: 2.55 },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'NRG', name: 'NRG Energy Inc', easyScore: 3, avgWeight: 1.22, proScore: 0.73, coverage: 0.6,
      price: 135.06, weeklyPrices: [125.47, 130.40, 132.10, 132.13, 135.06], weeklyChange: 7.64, dayChange: 2.22, sortRank: 0, periodReturns: { '1M': 7.6, 'YTD': -15.2, '6M': -12.7, '1Y': -11.1 },
      priceHistory: { '1D': [132.13, 134.06, 134.79, 135.11, 137.01, 138.14, 137.81, 137.51, 137.47, 140.1, 139.51, 138.66, 137.9, 137.79, 137.77, 137.3, 137.11, 137.12, 137.05, 135.7, 135.01, 135.55, 134.98, 135.06], '1W': [125.47, 130.4, 132.1, 132.13, 135.06], '1M': [125.5, 123.71, 133.98, 136.92, 137.65, 138, 137.5, 134.08, 129.47, 133.51, 133.76, 133.39, 129.2, 127.71, 129.96, 123.7, 125.47, 130.4, 132.1, 132.13, 135.06], 'YTD': [159.24, 143.53, 149.83, 151.09, 153.72, 143.99, 160.63, 171.06, 183.59, 163.54, 155.15, 154.75, 151.13, 141.23, 153.06, 170.96, 157.18, 160.15, 154.82, 138.11, 127.81, 136.92, 134.08, 129.2, 123.7, 135.06], '6M': [154.64, 160.88, 161.59, 148.89, 148.91, 156.04, 152.18, 156.43, 171.06, 183.59, 163.54, 148.63, 159.11, 151.13, 146.14, 160.3, 168.45, 149.6, 149.01, 150.64, 131.08, 133.98, 137.5, 133.39, 123.7, 135.06], '1Y': [151.92, 162.67, 158.69, 151.06, 152.31, 158.54, 167.63, 152.54, 148.62, 145.09, 145.56, 147.76, 166.08, 170.97, 165.34, 163.95, 160.43, 168.74, 170.36, 171.86, 172.5, 165.19, 159.2, 165.66, 164.11, 159.99, 156.2, 160.96, 159.63, 150.59, 150.68, 155.11, 143.99, 160.63, 175.01, 181.34, 163.54, 148.63, 159.11, 151.04, 149.9, 161.78, 168.5, 154.53, 155.58, 141.86, 131.08, 133.98, 137.5, 133.39, 123.7, 135.06] },
      velocityScore: { '1D': -1.4, '1W': 1.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$28B', pe: 150.1, revenueGrowth: 20, eps: 0.9, grossMargin: 16, dividendYield: 1.41,
      etfPresence: { POW: 0.47, VOLT: 0.95, PBD: false, PBW: false, IVEP: 2.24 },
      tonyNote: 'NRG Energy Inc appears in 3 of 5 Electrification ETFs (60% coverage) with average weight 1.2% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, avgWeight: 5.49, proScore: 2.2, coverage: 0.4,
      price: 296.39, weeklyPrices: [293.87, 302.15, 293.22, 299.84, 296.39], weeklyChange: 0.86, dayChange: -1.15, sortRank: 0, periodReturns: { '1M': 14.8, 'YTD': 74.7, '6M': 78, '1Y': 227.5 },
      priceHistory: { '1D': [299.84, 307.55, 306.44, 301.04, 300.8, 299.88, 299.37, 300.26, 297.98, 296.98, 298.29, 298.88, 298.35, 299.06, 295.16, 295.17, 294.48, 295.99, 296.58, 295.51, 293.78, 296.04, 298.03, 296.39], '1W': [293.87, 302.15, 293.22, 299.84, 296.39], '1M': [258.28, 249.71, 254.75, 260.4, 270.01, 280.13, 276.96, 274.52, 269.86, 269.22, 280.09, 276.54, 262.56, 279.13, 276.04, 296.55, 293.87, 302.15, 293.22, 299.84, 296.39], 'YTD': [169.63, 180.24, 192.96, 200.29, 210.44, 211.58, 238.4, 221.19, 234.67, 213.8, 198.5, 209.52, 222.04, 197.83, 210.32, 237.34, 254.38, 250.96, 286.69, 297.98, 256.72, 260.4, 274.52, 262.56, 296.55, 296.39], '6M': [166.55, 176.45, 175.77, 188, 201.17, 210.66, 217.25, 237.19, 221.19, 234.67, 213.8, 200.88, 205.74, 222.04, 197.98, 228.29, 236.04, 262.68, 258.26, 286.89, 266.92, 254.75, 276.96, 276.54, 296.55, 296.39], '1Y': [90.51, 96.08, 99.27, 101.66, 103.72, 126.75, 127.5, 132.58, 131.03, 132.6, 134.56, 141.51, 145.86, 146.51, 140.37, 141.12, 137.73, 146.11, 157, 153.99, 161.53, 147.67, 140.95, 154.77, 172.21, 173.3, 175.69, 174.34, 184, 193.82, 201.8, 207.78, 211.58, 238.4, 230.06, 232.12, 213.8, 200.88, 205.74, 220.77, 203.04, 235, 241.49, 268.31, 275.84, 290.46, 266.92, 254.75, 276.96, 276.54, 296.55, 296.39] },
      velocityScore: { '1D': -2.7, '1W': -3.1, '1M': -39.6, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 71.4, revenueGrowth: 17, eps: 4.15, grossMargin: 39, dividendYield: 0.09,
      etfPresence: { POW: 3.39, VOLT: 7.59, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 2, avgWeight: 3.35, proScore: 1.34, coverage: 0.4,
      price: 333.05, weeklyPrices: [302.87, 311.93, 299.60, 317.58, 333.05], weeklyChange: 9.96, dayChange: 4.87, sortRank: 0, periodReturns: { '1M': -2, 'YTD': 105.6, '6M': 115.7, '1Y': 181 },
      priceHistory: { '1D': [317.58, 332.86, 331.25, 331.93, 334.54, 335.04, 336.23, 334.36, 332.9, 333.42, 333.69, 333.58, 333.39, 334.06, 332.99, 333.31, 332.27, 331.77, 331.82, 331.13, 330.96, 331.84, 334.29, 333.05], '1W': [302.87, 311.93, 299.6, 317.58, 333.05], '1M': [339.73, 322.63, 315.67, 323.4, 327.46, 319.78, 314.18, 315.71, 323.39, 334.49, 331.44, 323.92, 300.51, 300.57, 289.52, 297.88, 302.87, 311.93, 299.6, 317.58, 333.05], 'YTD': [162.01, 160.78, 170.86, 181.12, 195.1, 182.56, 248.51, 243.21, 262.19, 251.28, 270.06, 268.41, 270.89, 234.22, 262.3, 310.51, 314.41, 322.43, 330.97, 339.97, 370.94, 323.4, 315.71, 300.51, 297.88, 333.05], '6M': [154.39, 167.58, 173.95, 170.03, 175.18, 189.21, 190.15, 199.62, 243.21, 262.19, 251.28, 268.26, 264.71, 270.89, 250.58, 281.03, 301.16, 305.14, 306.18, 358.92, 369.99, 315.67, 314.18, 323.92, 297.88, 333.05], '1Y': [118.54, 127.16, 126.26, 124.72, 126.21, 142.55, 141.59, 139.93, 133.07, 125.97, 127.55, 121.82, 138.26, 151.96, 143.31, 162.8, 169.01, 174, 186.06, 192.86, 179.8, 170.97, 159.83, 179.22, 185.61, 161.74, 159.82, 165.62, 174.95, 172.72, 181.47, 193.76, 182.56, 248.51, 243.06, 259.23, 251.28, 268.26, 264.71, 276.16, 259.37, 287.64, 294.13, 321.75, 328.49, 340.01, 369.99, 315.67, 314.18, 323.92, 297.88, 333.05] },
      velocityScore: { '1D': 2.3, '1W': 4.7, '1M': -21.6, '6M': null }, isNew: false,
      marketCap: '$128B', pe: 83.3, revenueGrowth: 30, eps: 4, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 2.54, PBD: false, PBW: false, IVEP: 4.17 },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, avgWeight: 3.19, proScore: 1.28, coverage: 0.4,
      price: 127.69, weeklyPrices: [129.23, 129.31, 129.75, 128.27, 127.69], weeklyChange: -1.19, dayChange: -0.45, sortRank: 0, periodReturns: { '1M': 0, 'YTD': 10.7, '6M': 10.5, '1Y': 25.5 },
      priceHistory: { '1D': [128.27, 128.85, 128.38, 128.48, 128.53, 128.85, 129.12, 129.13, 129.29, 129.31, 129.24, 128.95, 129.07, 128.77, 128.66, 127.68, 127.79, 128.03, 127.98, 127.61, 127.15, 127.3, 127.42, 127.69], '1W': [129.23, 129.31, 129.75, 128.27, 127.69], '1M': [127.68, 128.92, 128.87, 129.61, 131.59, 129.57, 127.76, 126.67, 123.79, 127.11, 126.31, 127.79, 129.14, 126.77, 127.76, 128.48, 129.23, 129.31, 129.75, 128.27, 127.69], 'YTD': [115.31, 115.93, 118.11, 117.18, 119.21, 119.98, 122.25, 127.27, 132.46, 133.52, 132.31, 133.62, 128.8, 131.12, 132.92, 135.46, 133.28, 135.07, 134.66, 130.16, 125.15, 129.61, 126.67, 129.14, 128.48, 127.69], '6M': [115.58, 115.67, 114.07, 116.57, 119.22, 119.43, 120.67, 121.23, 127.27, 132.46, 133.52, 131.26, 130.97, 128.8, 131.08, 134.71, 134.39, 131.62, 134.44, 132.56, 127.95, 128.87, 127.76, 127.79, 128.48, 127.69], '1Y': [101.75, 102.46, 104.17, 105.02, 108.54, 107.95, 113.58, 112.5, 111.99, 114.02, 111.02, 107.55, 109.1, 107.05, 109.78, 115.66, 117.04, 117.53, 115.98, 120.26, 121.43, 121.3, 120.84, 120.51, 115.73, 115.77, 114.49, 115.77, 115.04, 116.62, 118.98, 119.12, 119.98, 122.25, 128.42, 132.1, 133.52, 131.26, 130.97, 128.3, 131.67, 137.15, 134.56, 135.08, 137.11, 131.76, 127.95, 128.87, 127.76, 127.79, 128.48, 127.69] },
      velocityScore: { '1D': 17.4, '1W': 13.3, '1M': -36.3, '6M': null }, isNew: false,
      marketCap: '$69B', pe: 18.9, revenueGrowth: 10, eps: 6.75, grossMargin: 47, dividendYield: 2.98,
      etfPresence: { POW: 2.36, VOLT: 4.02, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, avgWeight: 2.81, proScore: 1.13, coverage: 0.4,
      price: 372.59, weeklyPrices: [354.37, 370.66, 350.45, 353.32, 372.59], weeklyChange: 5.14, dayChange: 5.45, sortRank: 0, periodReturns: { '1M': 20.6, 'YTD': 78, '6M': 78.5, '1Y': 189.7 },
      priceHistory: { '1D': [353.32, 365.86, 364.46, 364.87, 367.42, 365.27, 365.45, 364.95, 368.01, 368.9, 367.32, 365.05, 363.84, 364.53, 369.11, 368.8, 368.05, 369.14, 368.73, 369.85, 369.13, 368.75, 371.64, 372.59], '1W': [354.37, 370.66, 350.45, 353.32, 372.59], '1M': [309.06, 302.84, 313.05, 323.79, 324.86, 328.34, 317.08, 302.18, 294.65, 312.28, 322.5, 320.92, 294.81, 306.11, 311.64, 340.4, 354.37, 370.66, 350.45, 353.32, 372.59], 'YTD': [209.37, 210.99, 237.9, 275.57, 269.12, 254.54, 308.77, 321.34, 338.51, 330.54, 311.39, 315.91, 356.38, 298.29, 339.32, 385.73, 380.22, 385.68, 387.03, 357.24, 323.46, 323.79, 302.18, 294.81, 340.4, 372.59], '6M': [208.77, 217.86, 227.65, 227.59, 250.95, 259.55, 263.03, 279.04, 321.34, 338.51, 330.54, 314.84, 319.63, 356.38, 322.71, 366.95, 374.32, 377.19, 361.39, 360.81, 339.19, 313.05, 317.08, 320.92, 340.4, 372.59], '1Y': [128.63, 132.31, 136.61, 141.48, 142.66, 141.94, 135.25, 150.82, 151.4, 154.51, 149.68, 154.43, 156.74, 174.77, 166.76, 176.02, 169.62, 191.98, 202.61, 202.73, 216.73, 202.48, 196, 207.78, 221.85, 216.87, 216.09, 217.26, 229.7, 233.92, 269, 263.76, 254.54, 308.77, 320.64, 337.35, 330.54, 314.84, 319.63, 342.87, 332.82, 374.98, 372.23, 382.47, 383.91, 351.94, 339.19, 313.05, 317.08, 320.92, 340.4, 372.59] },
      velocityScore: { '1D': 3.7, '1W': 0.9, '1M': -37.2, '6M': null }, isNew: false,
      marketCap: '$15B', pe: 77.5, revenueGrowth: 26, eps: 4.81, grossMargin: 39, dividendYield: 0.11,
      etfPresence: { POW: 1.09, VOLT: 4.54, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'APH', name: 'Amphenol Corp', easyScore: 2, avgWeight: 2.67, proScore: 1.07, coverage: 0.4,
      price: 163.96, weeklyPrices: [153.80, 158.59, 158.81, 161.11, 163.96], weeklyChange: 6.61, dayChange: 1.77, sortRank: 0, periodReturns: { '1M': 34.7, 'YTD': 21.3, '6M': 26.5, '1Y': 74.8 },
      priceHistory: { '1D': [161.11, 162.89, 163.87, 163.97, 163.98, 163.98, 164.18, 163.87, 164.29, 165.12, 165.52, 164.98, 165.27, 165.63, 165.32, 165.31, 165.14, 165.24, 165.49, 165.9, 165.08, 162.79, 165.04, 163.96], '1W': [153.8, 158.59, 158.81, 161.11, 163.96], '1M': [121.72, 119.2, 123.05, 124.86, 132.06, 140.24, 147.68, 148.76, 146.34, 148.4, 147.62, 146.77, 138.81, 143.6, 154.07, 152.46, 153.8, 158.59, 158.81, 161.11, 163.96], 'YTD': [135.14, 136.25, 146.75, 152.5, 149.58, 130, 144.04, 147.73, 152.64, 132.75, 136.74, 135.12, 127.96, 119.15, 128.38, 148.72, 152.81, 148.64, 141.03, 128.03, 125, 124.86, 148.76, 138.81, 152.46, 163.96], '6M': [129.61, 137.43, 139.88, 145.11, 152.33, 166.25, 147.06, 144.14, 147.73, 152.64, 132.75, 134.54, 127.81, 127.96, 126.35, 135.32, 146.98, 148.13, 148.38, 138.47, 124.64, 123.05, 147.68, 146.77, 152.46, 163.96], '1Y': [93.82, 97.67, 98.55, 100.21, 103.71, 106.7, 104.31, 109.98, 109.21, 109.36, 108.86, 110.54, 119.24, 123.69, 121.01, 123.4, 121.7, 125.65, 133.82, 139.34, 139.09, 133.74, 131.6, 139.22, 140.06, 129.9, 135.29, 136.9, 141.38, 148.97, 154.6, 145.96, 130, 144.04, 151.2, 148.47, 132.75, 134.54, 127.81, 128.73, 127.7, 137.68, 148.96, 150.18, 147.27, 136.62, 124.64, 123.05, 147.68, 146.77, 152.46, 163.96] },
      velocityScore: { '1D': -0.9, '1W': 1.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$202B', pe: 47.1, revenueGrowth: 58, eps: 3.48, grossMargin: 38, dividendYield: 0.61,
      etfPresence: { POW: 0.97, VOLT: 4.36, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 2.48, proScore: 0.99, coverage: 0.4,
      price: 73.12, weeklyPrices: [72.08, 71.49, 71.48, 71.25, 73.12], weeklyChange: 1.44, dayChange: 2.62, sortRank: 0, periodReturns: { '1M': -5.9, 'YTD': 21.6, '6M': 24.7, '1Y': 20.9 },
      priceHistory: { '1D': [71.25, 71.15, 71.98, 71.55, 72.1, 72.38, 72.29, 72.26, 72.52, 72.88, 73.03, 72.91, 72.93, 72.91, 72.92, 72.66, 72.77, 72.96, 73.02, 72.97, 72.83, 72.96, 73.04, 73.12], '1W': [72.08, 71.49, 71.48, 71.25, 73.12], '1M': [77.69, 79.4, 77.88, 77.52, 78.47, 74.37, 73.13, 71.39, 70.04, 71.31, 71.66, 72.43, 71.96, 71.59, 71.59, 71.62, 72.08, 71.49, 71.48, 71.25, 73.12], 'YTD': [60.11, 61.15, 60.71, 63.72, 67.24, 66.46, 71.12, 72.14, 73.97, 75.77, 73.84, 73.69, 74.46, 72.47, 74.04, 71.44, 70.91, 71.61, 75.41, 71.96, 77.72, 77.52, 71.39, 71.96, 71.62, 73.12], '6M': [58.66, 59.52, 61.16, 59.56, 61.51, 65.48, 68.5, 68.84, 72.14, 73.97, 75.77, 74.4, 72.8, 74.46, 72.78, 73.01, 70.76, 71.1, 73.32, 73.76, 75.71, 77.88, 73.13, 72.43, 71.62, 73.12], '1Y': [60.49, 62.67, 58.48, 59.04, 57.68, 57.51, 60.27, 57.89, 57.46, 57.07, 57.88, 56.85, 58.4, 60.16, 63.97, 63.58, 62.61, 62.46, 57.48, 57.87, 59.58, 60.99, 59.61, 61.44, 61.95, 59.48, 58.26, 59.8, 59.5, 60.49, 63.18, 66.92, 66.46, 71.12, 72.17, 74.77, 75.77, 74.4, 72.8, 73.81, 71.83, 72.82, 70.86, 71.65, 76.31, 72.95, 75.71, 77.88, 73.13, 72.43, 71.62, 73.12] },
      velocityScore: { '1D': 0, '1W': -3.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$89B', pe: 32.1, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.87,
      etfPresence: { POW: false, VOLT: 1.47, PBD: false, PBW: false, IVEP: 3.5 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'JCI', name: 'JOHNSON CONTROLS INTERNATIONAL PLC', easyScore: 2, avgWeight: 2.45, proScore: 0.98, coverage: 0.4,
      price: 144.82, weeklyPrices: [144.96, 146.06, 145.17, 143.62, 144.82], weeklyChange: -0.1, dayChange: 0.84, sortRank: 0, periodReturns: { '1M': 5.5, 'YTD': 20.9, '6M': 23, '1Y': 41.6 },
      priceHistory: { '1D': [143.62, 147.91, 147.31, 146.65, 145.61, 146.52, 146.39, 146.66, 146.52, 146.07, 146.32, 146.41, 145.82, 146.56, 146.16, 145.74, 145.35, 145.52, 145.34, 145.3, 144.98, 144.9, 144.94, 144.82], '1W': [144.96, 146.06, 145.17, 143.62, 144.82], '1M': [137.31, 135.42, 137.75, 135.47, 138.36, 138.2, 136.15, 134.06, 133.91, 141.99, 146.96, 147.4, 143.65, 144.05, 147.75, 144.01, 144.96, 146.06, 145.17, 143.62, 144.82], 'YTD': [119.75, 111.29, 112.13, 114.51, 120.28, 129.49, 140.96, 139.48, 144.49, 140, 133.94, 132.56, 136.43, 126.58, 133.15, 142.05, 140.98, 143.38, 144.4, 139.52, 143.08, 135.47, 134.06, 143.65, 144.01, 144.82], '6M': [117.74, 122.06, 121.53, 111.39, 114.56, 116.96, 124.01, 138.75, 139.48, 144.49, 140, 134.99, 133.76, 136.43, 130.95, 139, 137.21, 139.81, 141.35, 143.14, 143.8, 137.75, 136.15, 147.4, 144.01, 144.82], '1Y': [102.25, 105.07, 105.98, 106.26, 108.27, 111.52, 106.48, 105.55, 103.52, 107.26, 106.89, 107.17, 107.81, 109.29, 108.16, 109.58, 105.55, 108.83, 112.94, 114.39, 122.25, 118.72, 113.55, 114.94, 114.98, 116.88, 119.53, 121.71, 113.95, 112.09, 115.49, 116.74, 129.49, 140.96, 142.7, 143.42, 140, 134.99, 133.76, 137.48, 134.72, 141.85, 137.55, 141.73, 146.03, 139.25, 143.8, 137.75, 136.15, 147.4, 144.01, 144.82] },
      velocityScore: { '1D': -2, '1W': -4.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$88B', pe: 44.3, revenueGrowth: 8, eps: 3.27, grossMargin: 37, dividendYield: 1.1,
      etfPresence: { POW: false, VOLT: 1.4, PBD: false, PBW: false, IVEP: 3.51 },
      tonyNote: 'JOHNSON CONTROLS INTERNATIONAL PLC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TLN', name: 'Talen Energy Corp', easyScore: 2, avgWeight: 2.35, proScore: 0.94, coverage: 0.4,
      price: 436.29, weeklyPrices: [360.54, 386.21, 406.51, 409.81, 436.29], weeklyChange: 21.01, dayChange: 6.46, sortRank: 0, periodReturns: { '1M': 34.6, 'YTD': 16.4, '6M': 17.4, '1Y': 51.1 },
      priceHistory: { '1D': [409.81, 423.96, 430.73, 434.24, 441.13, 444.4, 446.39, 445.29, 443.28, 447.36, 446.64, 443.39, 436.64, 436.5, 433.77, 432.39, 432.88, 433.15, 433.17, 430.82, 429.82, 431.96, 433.42, 436.29], '1W': [360.54, 386.21, 406.51, 409.81, 436.29], '1M': [324.21, 314.57, 344.46, 360.48, 372.45, 379.78, 381.47, 386.8, 377.2, 385.51, 379.59, 378.08, 364.74, 364.78, 358.74, 344.8, 360.54, 386.21, 406.51, 409.81, 436.29], 'YTD': [374.84, 356, 374.83, 379.86, 362.2, 317.05, 354.62, 380.29, 391.43, 336.57, 331.58, 327.14, 315.77, 313.03, 330.07, 345.76, 346.26, 369.67, 384.64, 386.37, 334.24, 360.48, 386.8, 364.74, 344.8, 436.29], '6M': [371.72, 384.52, 395.2, 369.03, 356.66, 359.51, 341.42, 357.93, 380.29, 391.43, 336.57, 316.22, 338.6, 315.77, 319.23, 328.65, 353.3, 339.32, 351.91, 409.99, 351.03, 344.46, 381.47, 378.08, 344.8, 436.29], '1Y': [288.66, 297.88, 285.1, 281.96, 310.14, 358.77, 378.01, 374.68, 377.82, 356.11, 378.92, 383.49, 405.45, 429.72, 420.7, 430.43, 412.83, 406.45, 407.81, 399.78, 386.57, 360.92, 365.96, 379.99, 353.38, 357.94, 372.25, 380.27, 393.18, 376.86, 374.31, 365.17, 317.05, 354.62, 380.06, 390.05, 336.57, 316.22, 338.6, 328.29, 328.08, 312.76, 362.4, 345.25, 372.42, 390.55, 351.03, 344.46, 381.47, 378.08, 344.8, 436.29] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$21B', pe: null, revenueGrowth: 97, eps: -0.52, grossMargin: 40, dividendYield: null,
      etfPresence: { POW: 1.73, VOLT: false, PBD: false, PBW: false, IVEP: 2.97 },
      tonyNote: 'Talen Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CEG', name: 'Constellation Energy Corp', easyScore: 2, avgWeight: 2.32, proScore: 0.93, coverage: 0.4,
      price: 274.06, weeklyPrices: [253.76, 262.35, 268.00, 267.17, 274.06], weeklyChange: 8, dayChange: 2.58, sortRank: 0, periodReturns: { '1M': 4.6, 'YTD': -22.4, '6M': -24.1, '1Y': -10.1 },
      priceHistory: { '1D': [267.17, 269.59, 271.29, 273.16, 277.49, 278.18, 277.85, 276.37, 276.57, 281.1, 281.46, 279.63, 276.9, 277.22, 277.6, 276.61, 276.57, 275.84, 276.47, 274.87, 274.07, 274.63, 274.79, 274.06], '1W': [253.76, 262.35, 268, 267.17, 274.06], '1M': [262, 260.67, 281.26, 285.83, 294.07, 288.68, 286.31, 287.75, 265.7, 272.65, 267.24, 264.59, 254.83, 250.67, 251.65, 246.71, 253.76, 262.35, 268, 267.17, 274.06], 'YTD': [353.27, 322.54, 330.38, 287.35, 287.45, 250.46, 276.85, 294.05, 325.84, 322.85, 317.09, 307.69, 294.85, 298.61, 272.58, 296.61, 287.56, 315.17, 321.05, 303.63, 267.2, 285.83, 287.75, 254.83, 246.71, 274.06], '6M': [361.05, 360.46, 354.94, 335.86, 295.4, 288.76, 268.45, 271.14, 294.05, 325.84, 322.85, 300.69, 317.22, 294.85, 279.25, 284.27, 294.73, 287.16, 297, 322.78, 274.89, 281.26, 286.31, 264.59, 246.71, 274.06], '1Y': [304.92, 320.17, 318.25, 325.99, 317.88, 328.66, 340.77, 335.77, 322.23, 310.16, 307.98, 298.82, 330.42, 347.12, 334.27, 364.1, 368.49, 386.5, 389.19, 377, 358.39, 338.52, 338.11, 359.05, 357.67, 357.14, 355.4, 358.33, 354.58, 333.53, 294.37, 287.95, 250.46, 276.85, 291.66, 323.56, 322.85, 300.69, 317.22, 303.32, 279.46, 280.25, 299.14, 292.77, 313, 311.28, 274.89, 281.26, 286.31, 264.59, 246.71, 274.06] },
      velocityScore: { '1D': -2.1, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$98B', pe: 23.8, revenueGrowth: 64, eps: 11.51, grossMargin: 23, dividendYield: 0.62,
      etfPresence: { POW: 1.26, VOLT: false, PBD: false, PBW: false, IVEP: 3.39 },
      tonyNote: 'Constellation Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VST', name: 'Vistra Corp', easyScore: 2, avgWeight: 2.29, proScore: 0.92, coverage: 0.4,
      price: 163.75, weeklyPrices: [148.02, 153.52, 158.61, 158.83, 163.75], weeklyChange: 10.63, dayChange: 3.1, sortRank: 0, periodReturns: { '1M': 19.7, 'YTD': 1.5, '6M': -1.5, '1Y': -11.5 },
      priceHistory: { '1D': [158.83, 160.9, 161.83, 162.25, 164.79, 166.59, 166.66, 166.59, 166.41, 169.52, 168.93, 167.3, 165.67, 165.72, 165.36, 164.71, 164.34, 163.83, 164.18, 163.18, 162.88, 163.53, 163.33, 163.75], '1W': [148.02, 153.52, 158.61, 158.83, 163.75], '1M': [136.75, 134.71, 144, 149.08, 156.27, 160.15, 160.28, 160.23, 154.76, 157.97, 153.8, 153.7, 148.76, 146.9, 146.22, 146.38, 148.02, 153.52, 158.61, 158.83, 163.75], 'YTD': [161.33, 150.6, 168.97, 160.36, 162.58, 142.52, 160.15, 170.57, 175.36, 163.36, 164.4, 164.33, 152.72, 147.54, 153.68, 163.97, 159.6, 166.58, 160.85, 147.72, 139.68, 149.08, 160.23, 148.76, 146.38, 163.75], '6M': [166.17, 161.67, 162.93, 172.58, 156.81, 164.26, 153, 159.6, 170.57, 175.36, 163.36, 159.16, 170.12, 152.72, 150.33, 155.89, 162.94, 155.79, 153.79, 158.29, 142.61, 144, 160.28, 153.7, 146.38, 163.75], '1Y': [185.1, 195.04, 193.7, 194.81, 188.23, 195.88, 208.05, 202.12, 197.33, 190.46, 189.11, 188.01, 213.52, 217.92, 197.94, 200.41, 196.86, 201.35, 201.47, 188.3, 191, 174.69, 168.59, 173.64, 166.12, 168.25, 163.03, 161.84, 169.53, 171.42, 160.02, 165.64, 142.52, 160.15, 172.5, 176.82, 163.36, 159.16, 170.12, 151.51, 153.96, 152.75, 165.53, 156.85, 157.84, 153.95, 142.61, 144, 160.28, 153.7, 146.38, 163.75] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$55B', pe: 27.4, revenueGrowth: 43, eps: 5.98, grossMargin: 39, dividendYield: 0.56,
      etfPresence: { POW: 1.36, VOLT: false, PBD: false, PBW: false, IVEP: 3.22 },
      tonyNote: 'Vistra Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX TECHNOLOGIES INC', easyScore: 2, avgWeight: 2.14, proScore: 0.86, coverage: 0.4,
      price: 205.4, weeklyPrices: [193.45, 193.94, 196.93, 203.07, 205.40], weeklyChange: 6.18, dayChange: 1.15, sortRank: 0, periodReturns: { '1M': 1.7, 'YTD': 18.8, '6M': 20.3, '1Y': 44.3 },
      priceHistory: { '1D': [203.07, 207.5, 204.46, 204.21, 205.28, 205.5, 205.88, 205.01, 204.71, 205.22, 204.74, 204.89, 205.58, 205.56, 205.09, 204.28, 203.72, 204.08, 203.9, 204.27, 203.83, 203.9, 204.32, 205.4], '1W': [193.45, 193.94, 196.93, 203.07, 205.4], '1M': [201.94, 197.33, 202.66, 202.52, 202.91, 198.95, 199.27, 195.88, 188.39, 187.26, 184.72, 190.76, 185.95, 187.46, 188.96, 194.68, 193.45, 193.94, 196.93, 203.07, 205.4], 'YTD': [172.84, 193.2, 204.08, 206.33, 210.18, 190.1, 198.5, 202.25, 208.27, 205.57, 195.91, 207.48, 204.76, 191.59, 214.44, 238.27, 228.24, 222.07, 216.68, 205.33, 204.72, 202.52, 195.88, 185.95, 194.68, 205.4], '6M': [170.75, 175.88, 189.02, 206.62, 206.07, 212.4, 210.88, 199.83, 202.25, 208.27, 205.57, 195.98, 208.98, 204.76, 204.49, 231.78, 238.42, 219.1, 208.08, 215.2, 206.83, 202.66, 199.27, 190.76, 194.68, 205.4], '1Y': [142.32, 143.19, 143.79, 138.65, 140.36, 149.83, 149.5, 179.19, 173.5, 163.09, 162.04, 163.75, 174.3, 178.19, 181.96, 191.38, 190.08, 203.12, 203.28, 213.61, 193.55, 178.31, 169.81, 174.93, 178.75, 174.37, 176.43, 175.49, 195.3, 210.54, 209.52, 216.3, 190.1, 198.5, 209.07, 207.24, 205.57, 195.98, 208.98, 222.13, 212.81, 230.29, 230.8, 225.51, 216.39, 209.89, 206.83, 202.66, 199.27, 190.76, 194.68, 205.4] },
      velocityScore: { '1D': -1.1, '1W': 1.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 54.6, revenueGrowth: 26, eps: 3.76, grossMargin: 23, dividendYield: 0.51,
      etfPresence: { POW: false, VOLT: 2.1, PBD: false, PBW: false, IVEP: 2.18 },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 5.29, proScore: 2.12, coverage: 0.4,
      price: 861.88, weeklyPrices: [858.99, 866.67, 857.76, 838.21, 861.88], weeklyChange: 0.34, dayChange: 2.82, sortRank: 0, periodReturns: { '1M': 11.8, 'YTD': 181.4, '6M': 185.1, '1Y': 295.4 },
      priceHistory: { '1D': [838.21, 865, 836.38, 835.7, 852.5, 852, 854.11, 853, 858.97, 860.35, 861.94, 867.82, 866, 877.84, 871.5, 868.59, 864.66, 866.16, 861.69, 860.88, 858.41, 863.51, 869.11, 861.88], '1W': [858.99, 866.67, 857.76, 838.21, 861.88], '1M': [770.76, 728.29, 752, 733.77, 732.94, 782.12, 842.96, 860.84, 845.39, 875.52, 957.03, 993.74, 882.43, 891.86, 842.01, 838.55, 858.99, 866.67, 857.76, 838.21, 861.88], 'YTD': [306.23, 297.62, 319.27, 364.25, 379.23, 360.16, 433.91, 410.63, 455.25, 420.22, 411.53, 425.51, 446.16, 382.55, 382.22, 464.54, 472.9, 505.45, 529.49, 844.8, 848.84, 733.77, 860.84, 882.43, 838.55, 861.88], '6M': [302.3, 316.55, 327.11, 307.58, 349.59, 372.25, 386.78, 415.19, 410.63, 455.25, 420.22, 420.6, 421.23, 446.16, 407.27, 423.35, 456.08, 487.87, 469.75, 886.22, 854.28, 752, 842.96, 993.74, 838.55, 861.88], '1Y': [217.97, 231.51, 237, 241.31, 247.65, 263.59, 263.05, 302.69, 275.35, 279.58, 278.53, 286.71, 322.9, 367.39, 341.1, 352.78, 336.63, 355.58, 379.08, 377.9, 377.84, 338.66, 315.1, 320.51, 324.62, 319.12, 308.58, 310.79, 317.41, 321.6, 362.53, 373.52, 360.16, 433.91, 415.13, 433.34, 420.22, 420.6, 421.23, 452.92, 421.29, 435.65, 441.1, 495.67, 515.62, 811.41, 854.28, 752, 842.96, 993.74, 838.55, 861.88] },
      velocityScore: { '1D': 1.4, '1W': -1.9, '1M': -55.3, '6M': null }, isNew: false,
      marketCap: '$26B', pe: 77, revenueGrowth: 92, eps: 11.2, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 6.27, PRN: 4.31, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 5.14, proScore: 2.06, coverage: 0.4,
      price: 985.82, weeklyPrices: [910.57, 933.93, 945.46, 955.92, 985.82], weeklyChange: 8.26, dayChange: 3.13, sortRank: 0, periodReturns: { '1M': 14.1, 'YTD': 72.1, '6M': 74.2, '1Y': 173.4 },
      priceHistory: { '1D': [955.92, 989.99, 983.98, 982.06, 985.11, 990.08, 990.07, 988.33, 986.89, 987.31, 988.15, 987.04, 987.29, 988.29, 988.88, 989.03, 986.48, 988.29, 988.19, 986.14, 986.48, 985.94, 990.2, 985.82], '1W': [910.57, 933.93, 945.46, 955.92, 985.82], '1M': [863.95, 860.15, 872.56, 865.95, 879.89, 909.93, 887.67, 875.87, 865.36, 909.81, 926.18, 940.48, 904.28, 915.64, 914.7, 897.63, 910.57, 933.93, 945.46, 955.92, 985.82], 'YTD': [572.87, 608.13, 638.75, 648.41, 665.24, 691.82, 775, 751.97, 766.61, 731.97, 716.68, 702, 716.63, 667.43, 724.44, 794.25, 798.4, 828.79, 874.78, 897.45, 888.31, 865.95, 875.87, 904.28, 897.63, 985.82], '6M': [565.83, 583, 616.1, 629.77, 629, 638.91, 702.89, 742.37, 751.97, 766.61, 731.97, 707.59, 693.62, 716.63, 708.46, 771.58, 770.17, 808.87, 810.05, 926.93, 902.3, 872.56, 887.67, 940.48, 897.63, 985.82], '1Y': [360.52, 384.71, 391.51, 405.77, 410.07, 432.94, 428.69, 416.52, 407.79, 435.67, 419.04, 422.78, 435.94, 472.1, 471.61, 495.38, 491.3, 527.08, 522.73, 577.26, 563.1, 554.03, 550.43, 568.06, 596.5, 589.76, 576.22, 578.61, 623.09, 636.53, 645.38, 643.28, 691.82, 775, 760.53, 752.93, 731.97, 707.59, 693.62, 719.04, 730.32, 787.07, 772.66, 835.24, 890.11, 895.69, 902.3, 872.56, 887.67, 940.48, 897.63, 985.82] },
      velocityScore: { '1D': 3, '1W': 4, '1M': -10, '6M': null }, isNew: false,
      marketCap: '$454B', pe: 49, revenueGrowth: 22, eps: 20.11, grossMargin: 29, dividendYield: 0.66,
      etfPresence: { AIRR: false, PRN: 3.41, RSHO: 6.88, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 5.04, proScore: 2.02, coverage: 0.4,
      price: 297.2, weeklyPrices: [294.75, 303.53, 292.70, 294.03, 297.20], weeklyChange: 0.83, dayChange: 1.08, sortRank: 0, periodReturns: { '1M': 11.4, 'YTD': 179.7, '6M': 171.2, '1Y': 408.3 },
      priceHistory: { '1D': [294.03, 293.83, 290.32, 287.45, 293.87, 294.27, 291.91, 290.17, 291.7, 295.59, 296.89, 297.15, 299.19, 299.76, 298.43, 298.66, 298.18, 297.33, 295.08, 294.96, 295.11, 296.39, 296.13, 297.2], '1W': [294.75, 303.53, 292.7, 294.03, 297.2], '1M': [266.8, 261.58, 271.05, 270.75, 279.22, 295.94, 288.9, 284.42, 288.12, 299.07, 299.73, 300.06, 284.87, 293.6, 283.51, 290.5, 294.75, 303.53, 292.7, 294.03, 297.2], 'YTD': [106.26, 119.94, 133.76, 142.29, 152.31, 175.77, 197.45, 180.99, 183, 170.96, 176.51, 174.04, 186.82, 167.52, 201.7, 234.42, 241.65, 260.52, 269.95, 309.39, 292.65, 270.75, 284.42, 284.87, 290.5, 297.2], '6M': [109.59, 113.62, 120.46, 128.85, 142.76, 147.43, 151.08, 190.09, 180.99, 183, 170.96, 171.73, 167.41, 186.82, 180.36, 218.07, 229.73, 242.77, 253.49, 320.3, 300.84, 271.05, 288.9, 300.06, 290.5, 297.2], '1Y': [58.47, 70.97, 71.96, 70.19, 73.64, 80.8, 75.89, 81.28, 84.88, 87.65, 88.72, 90.8, 100.68, 100.97, 101.01, 103.9, 100.35, 110.24, 121.66, 127.8, 121.79, 109.89, 94.02, 106.53, 114.29, 109.31, 110.97, 111.96, 120, 133.04, 140.62, 147.81, 175.77, 197.45, 178.79, 176.96, 170.96, 171.73, 167.41, 194.85, 184.68, 230.81, 232.81, 252.18, 277.27, 305.93, 300.84, 271.05, 288.9, 300.06, 290.5, 297.2] },
      velocityScore: { '1D': -3.8, '1W': -3.3, '1M': 11, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 58.2, revenueGrowth: 7, eps: 5.11, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { AIRR: 2.62, PRN: false, RSHO: 7.46, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.61, proScore: 1.84, coverage: 0.4,
      price: 1967.41, weeklyPrices: [1877.61, 1952.02, 1913.94, 1931.77, 1967.41], weeklyChange: 4.78, dayChange: 1.84, sortRank: 0, periodReturns: { '1M': 6.1, 'YTD': 110.8, '6M': 114.2, '1Y': 293.5 },
      priceHistory: { '1D': [1931.77, 1987, 1951.28, 1955.12, 1967.54, 1966.64, 1965.26, 1953.63, 1962.47, 1970.45, 1970.91, 1977.36, 1975.82, 1976.75, 1965.51, 1965.02, 1960.77, 1963.86, 1958.1, 1954.78, 1955.94, 1962.59, 1970.79, 1967.41], '1W': [1877.61, 1952.02, 1913.94, 1931.77, 1967.41], '1M': [1854.43, 1825.5, 1835.51, 1835.33, 1828.25, 1867.09, 1855.15, 1828.21, 1787.88, 1883.26, 1850.04, 1914.65, 1843.94, 1852.03, 1831.56, 1843.42, 1877.61, 1952.02, 1913.94, 1931.77, 1967.41], 'YTD': [933.29, 971.49, 1053.1, 1131.7, 1171.46, 1119.81, 1338.65, 1319.47, 1450.6, 1430.38, 1383.62, 1424.46, 1461.52, 1273.18, 1424.91, 1650.48, 1680.09, 1794.04, 1891.95, 1952.37, 1992.74, 1835.33, 1828.21, 1843.94, 1843.42, 1967.41], '6M': [918.54, 963.83, 1032.31, 1038.18, 1134.75, 1160.38, 1209.97, 1269.63, 1319.47, 1450.6, 1430.38, 1407.32, 1423, 1461.52, 1378.99, 1525.16, 1648.96, 1724.49, 1724.14, 2011.49, 2034.63, 1835.51, 1855.15, 1914.65, 1843.42, 1967.41], '1Y': [500.02, 535, 541.48, 542.95, 544.95, 692.97, 695.3, 691.76, 680.86, 689.48, 703.38, 715.87, 782.05, 821.62, 801.8, 825.42, 816.07, 827.92, 981.66, 965.58, 955.26, 909.6, 894.08, 961.2, 989.48, 968.48, 940.74, 950.67, 1035.11, 1073.14, 1148, 1169.05, 1119.81, 1338.65, 1373.52, 1438.23, 1430.38, 1407.32, 1423, 1470.64, 1428.52, 1574.45, 1605.97, 1773.91, 1840.25, 1942.02, 2034.63, 1835.51, 1855.15, 1914.65, 1843.42, 1967.41] },
      velocityScore: { '1D': 0, '1W': 1.7, '1M': -59.4, '6M': null }, isNew: false,
      marketCap: '$69B', pe: 56.8, revenueGrowth: 1, eps: 34.63, grossMargin: 25, dividendYield: 0.13,
      etfPresence: { AIRR: 4.46, PRN: 4.76, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, avgWeight: 4.54, proScore: 1.81, coverage: 0.4,
      price: 738.85, weeklyPrices: [641.68, 688.87, 690.39, 719.52, 738.85], weeklyChange: 15.14, dayChange: 2.69, sortRank: 0, periodReturns: { '1M': 11.1, 'YTD': 135.8, '6M': 135.4, '1Y': 263.3 },
      priceHistory: { '1D': [719.52, 742.34, 727.11, 713.19, 719.49, 721, 717.12, 717.77, 722.34, 724.56, 728.46, 726.61, 729.73, 731.58, 725.96, 727.15, 726.41, 726.74, 727.18, 727.33, 725.49, 726.34, 725.92, 738.85], '1W': [641.68, 688.87, 690.39, 719.52, 738.85], '1M': [664.76, 639.58, 630.5, 644.64, 656.35, 673.51, 677.45, 667.02, 646.89, 663.14, 686.37, 689.43, 694.72, 619.98, 613.93, 623.66, 641.68, 688.87, 690.39, 719.52, 738.85], 'YTD': [313.32, 313.98, 317.76, 380.36, 355.51, 354.14, 422.5, 414.12, 442.34, 463.36, 458.71, 473.63, 444.83, 513.98, 576.95, 603.91, 611.21, 660.85, 697.15, 680.26, 722.31, 644.64, 667.02, 694.72, 623.66, 738.85], '6M': [313.9, 325.14, 339.54, 309.26, 384.34, 362.58, 381.73, 371.47, 414.12, 442.34, 463.36, 472.86, 469.81, 444.83, 544.65, 588.28, 606.43, 651.68, 630.07, 727.54, 719.92, 630.5, 677.45, 689.43, 623.66, 738.85], '1Y': [203.36, 219.74, 209.5, 220.73, 207.07, 236.89, 225.27, 239.02, 223.99, 222.16, 228.22, 203.84, 238.75, 268.34, 271.07, 263.53, 256.15, 283.94, 296.55, 306.21, 311.58, 351.64, 335.33, 363.73, 319.31, 317.58, 325.59, 320.73, 330.42, 314.09, 397.42, 358.87, 354.14, 422.5, 432.18, 452.53, 463.36, 472.86, 469.81, 437.48, 571.38, 609.29, 601.83, 656.79, 669.98, 690, 719.92, 630.5, 677.45, 689.43, 623.66, 738.85] },
      velocityScore: { '1D': 0.6, '1W': 11.7, '1M': -57.4, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 64.9, revenueGrowth: 50, eps: 11.38, grossMargin: 21, dividendYield: 0.27,
      etfPresence: { AIRR: 4.45, PRN: 4.62, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Argan Inc is an engineering and construction company for power generation facilities — natural gas and renewable power plants. It appears in Industrials ETFs because power plant construction is one of the fastest-growing categories in U.S. infrastructure spending, driven by data center load additions that the grid cannot currently support.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.54, proScore: 1.41, coverage: 0.4,
      price: 337.96, weeklyPrices: [320.11, 316.18, 324.38, 329.89, 337.96], weeklyChange: 5.58, dayChange: 2.45, sortRank: 0, periodReturns: { '1M': 10.7, 'YTD': 31.6, '6M': 30.2, '1Y': 48.8 },
      priceHistory: { '1D': [329.89, 334.1, 335.19, 336.7, 337.03, 338.5, 339.98, 339.72, 339.41, 337.98, 338.21, 338.35, 338.06, 338.53, 338.15, 338.42, 338.33, 338.38, 338.2, 338.47, 336.69, 336.4, 336.45, 337.96], '1W': [320.11, 316.18, 324.38, 329.89, 337.96], '1M': [305.22, 302.64, 306.25, 305.66, 307.1, 312.65, 308.53, 303.81, 300.98, 308.31, 313.39, 313.67, 315.29, 314.42, 322.81, 318.89, 320.11, 316.18, 324.38, 329.89, 337.96], 'YTD': [256.77, 264.62, 277.62, 282.33, 259.51, 289.94, 290.31, 279.27, 280.76, 279.91, 264.31, 261.37, 264.14, 258.01, 272.54, 292.01, 293.92, 298.1, 303.99, 308.87, 307.17, 305.66, 303.81, 315.29, 318.89, 337.96], '6M': [259.48, 264.78, 263.15, 273.7, 277.44, 262.34, 273.22, 283.73, 279.27, 280.76, 279.91, 270.13, 258.51, 264.14, 265.32, 280.74, 284.56, 289.82, 296.57, 315.39, 310.87, 306.25, 308.53, 313.67, 318.89, 337.96], '1Y': [227.19, 231.69, 244.15, 256.98, 260.2, 274.69, 264.18, 263.13, 255.01, 267.11, 263.58, 266.22, 262.83, 265.48, 258.44, 259.04, 246.04, 247.92, 260.29, 257.09, 258.92, 248.96, 248.92, 256.44, 257.25, 259.81, 262.41, 263.4, 265.39, 278.77, 284, 256.26, 289.94, 290.31, 281.13, 283.5, 279.91, 270.13, 258.51, 266, 269.36, 286.41, 284.39, 294.4, 305.75, 310.37, 310.87, 306.25, 308.53, 313.67, 318.89, 337.96] },
      velocityScore: { '1D': 1.4, '1W': 2.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 31.9, revenueGrowth: 7, eps: 10.58, grossMargin: 30, dividendYield: 0.6,
      etfPresence: { AIRR: 1.83, PRN: false, RSHO: 5.24, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 2.83, proScore: 1.13, coverage: 0.4,
      price: 242.97, weeklyPrices: [230.05, 237.06, 234.80, 235.29, 242.97], weeklyChange: 5.62, dayChange: 3.26, sortRank: 0, periodReturns: { '1M': 21.2, 'YTD': 21.4, '6M': 15.5, '1Y': 57.3 },
      priceHistory: { '1D': [235.29, 239.82, 240, 242.12, 243.29, 243.9, 243.4, 243.93, 244.05, 243.76, 244, 244.31, 243.32, 243.33, 242.91, 242.73, 242.43, 242.29, 242.2, 242.3, 241.02, 242.07, 241.41, 242.97], '1W': [230.05, 237.06, 234.8, 235.29, 242.97], '1M': [200.47, 195.79, 205.55, 205.39, 207.8, 215.34, 213.82, 216.66, 220.92, 230.08, 234.08, 236.14, 227.8, 229.95, 228.01, 233.49, 230.05, 237.06, 234.8, 235.29, 242.97], 'YTD': [200.06, 207.44, 209.78, 217.13, 211.84, 212.76, 233.46, 241.58, 226.66, 222.07, 210.96, 204.62, 200.67, 190.71, 195.43, 224.82, 217.61, 222.45, 201.12, 202.84, 200.99, 205.39, 216.66, 227.8, 233.49, 242.97], '6M': [210.34, 208.48, 205.44, 208.56, 217.9, 215.68, 215.43, 231.2, 241.58, 226.66, 222.07, 210.15, 202.46, 200.67, 199.94, 212.22, 219.99, 220.62, 211.36, 212.74, 203.79, 205.55, 213.82, 236.14, 233.49, 242.97], '1Y': [154.42, 167.15, 169.97, 174.38, 174.44, 180.42, 196.36, 201.57, 186.39, 190.47, 187.11, 189.1, 186.95, 189.75, 184.24, 190.89, 184.77, 184.04, 194.03, 223.89, 221.92, 211.43, 204.57, 208.53, 206.16, 218.13, 203.17, 205.66, 208.63, 211.07, 220.86, 211.34, 212.76, 233.46, 241.01, 231.59, 222.07, 210.15, 202.46, 201.27, 203.16, 215.54, 215.27, 223.96, 218.91, 205.27, 203.79, 205.55, 213.82, 236.14, 233.49, 242.97] },
      velocityScore: { '1D': 0.9, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 46.5, revenueGrowth: 17, eps: 5.22, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.7, PRN: false, RSHO: 3.95, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 2, avgWeight: 2.79, proScore: 1.11, coverage: 0.4,
      price: 277.66, weeklyPrices: [264.67, 270.44, 277.42, 283.23, 277.66], weeklyChange: 4.91, dayChange: -1.97, sortRank: 0, periodReturns: { '1M': 8, 'YTD': 35.4, '6M': 40.2, '1Y': 60.2 },
      priceHistory: { '1D': [283.23, 283.98, 280.64, 278.17, 278.48, 278.82, 276.64, 277.42, 277.11, 278.14, 278.32, 278.76, 279.2, 279.09, 278.88, 279.39, 278.91, 278.59, 277.72, 278.11, 277.05, 277.29, 278.26, 277.66], '1W': [264.67, 270.44, 277.42, 283.23, 277.66], '1M': [256.99, 253.12, 261.21, 259.89, 256.55, 258.02, 259.89, 258.25, 255.52, 250.72, 248.63, 249.33, 251.9, 246.55, 257.16, 264.6, 264.67, 270.44, 277.42, 283.23, 277.66], 'YTD': [205.02, 210.02, 220.25, 217.7, 208.93, 208.61, 230.85, 249.35, 259.64, 260.09, 253.91, 240.24, 239.51, 222.99, 236.02, 258.03, 255.62, 241.7, 239.7, 270.56, 260.35, 259.89, 258.25, 251.9, 264.6, 277.66], '6M': [198, 211.22, 212.92, 220.15, 220.36, 215.53, 213.49, 224.47, 249.35, 259.64, 260.09, 251.65, 241.93, 239.51, 230.46, 250, 254.04, 240.88, 236.52, 256.43, 273.1, 261.21, 259.89, 249.33, 264.6, 277.66], '1Y': [173.34, 184.9, 180.25, 184.32, 187.83, 188.17, 184.26, 180.75, 171.25, 171, 174.1, 179.43, 189.25, 192.15, 191.92, 190.48, 184.09, 189.68, 198.51, 205.95, 206.66, 203.29, 197.28, 198.74, 193.64, 197.24, 203.49, 209.49, 214.69, 219.64, 225, 210.84, 208.61, 230.85, 251.3, 260.31, 260.09, 251.65, 241.93, 241.62, 239.04, 254.06, 247.6, 246.16, 243.04, 272.54, 273.1, 261.21, 259.89, 249.33, 264.6, 277.66] },
      velocityScore: { '1D': -2.6, '1W': 1.8, '1M': -52.2, '6M': null }, isNew: false,
      marketCap: '$111B', pe: 64.6, revenueGrowth: 19, eps: 4.3, grossMargin: 35, dividendYield: 0.17,
      etfPresence: { AIRR: false, PRN: 3.34, RSHO: false, IDEF: 2.23, BILT: false },
      tonyNote: 'Howmet Aerospace is an aerospace structures and engine components manufacturer. It appears in Industrials ETFs for its aerospace and defense exposure — commercial air travel recovery and defense spending growth are the two demand drivers. Revenue grew and margins are expanding as Howmet prices power over OEM customers.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 2, avgWeight: 2.48, proScore: 0.99, coverage: 0.4,
      price: 205.4, weeklyPrices: [193.45, 193.94, 196.93, 203.07, 205.40], weeklyChange: 6.18, dayChange: 1.15, sortRank: 0, periodReturns: { '1M': 1.7, 'YTD': 18.8, '6M': 20.3, '1Y': 44.3 },
      priceHistory: { '1D': [203.07, 207.5, 204.46, 204.21, 205.28, 205.5, 205.88, 205.01, 204.71, 205.22, 204.74, 204.89, 205.58, 205.56, 205.09, 204.28, 203.72, 204.08, 203.9, 204.27, 203.83, 203.9, 204.32, 205.4], '1W': [193.45, 193.94, 196.93, 203.07, 205.4], '1M': [201.94, 197.33, 202.66, 202.52, 202.91, 198.95, 199.27, 195.88, 188.39, 187.26, 184.72, 190.76, 185.95, 187.46, 188.96, 194.68, 193.45, 193.94, 196.93, 203.07, 205.4], 'YTD': [172.84, 193.2, 204.08, 206.33, 210.18, 190.1, 198.5, 202.25, 208.27, 205.57, 195.91, 207.48, 204.76, 191.59, 214.44, 238.27, 228.24, 222.07, 216.68, 205.33, 204.72, 202.52, 195.88, 185.95, 194.68, 205.4], '6M': [170.75, 175.88, 189.02, 206.62, 206.07, 212.4, 210.88, 199.83, 202.25, 208.27, 205.57, 195.98, 208.98, 204.76, 204.49, 231.78, 238.42, 219.1, 208.08, 215.2, 206.83, 202.66, 199.27, 190.76, 194.68, 205.4], '1Y': [142.32, 143.19, 143.79, 138.65, 140.36, 149.83, 149.5, 179.19, 173.5, 163.09, 162.04, 163.75, 174.3, 178.19, 181.96, 191.38, 190.08, 203.12, 203.28, 213.61, 193.55, 178.31, 169.81, 174.93, 178.75, 174.37, 176.43, 175.49, 195.3, 210.54, 209.52, 216.3, 190.1, 198.5, 209.07, 207.24, 205.57, 195.98, 208.98, 222.13, 212.81, 230.29, 230.8, 225.51, 216.39, 209.89, 206.83, 202.66, 199.27, 190.76, 194.68, 205.4] },
      velocityScore: { '1D': 1, '1W': 5.3, '1M': -57.5, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 54.6, revenueGrowth: 26, eps: 3.76, grossMargin: 23, dividendYield: 0.51,
      etfPresence: { AIRR: 3.19, PRN: false, RSHO: false, IDEF: 1.77, BILT: false },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 2, avgWeight: 1.86, proScore: 0.75, coverage: 0.4,
      price: 54.21, weeklyPrices: [57.75, 57.02, 56.34, 56.16, 54.21], weeklyChange: -6.13, dayChange: -3.47, sortRank: 0, periodReturns: { '1M': 0, 'YTD': -28.6, '6M': -24.1, '1Y': 25.7 },
      priceHistory: { '1D': [56.16, 54.38, 53.75, 53.49, 53.66, 53.67, 53.85, 53.93, 53.85, 53.62, 53.17, 53.36, 53.29, 53.42, 53.28, 53.4, 53.12, 52.94, 53.21, 53.39, 53.17, 53.2, 53.68, 54.21], '1W': [57.75, 57.02, 56.34, 56.16, 54.21], '1M': [54.22, 53.47, 55.82, 54.67, 56.18, 57.3, 65.19, 64.13, 63.49, 63.27, 58.43, 63.4, 58.52, 57.73, 56.19, 58.78, 57.75, 57.02, 56.34, 56.16, 54.21], 'YTD': [75.91, 104.04, 121.5, 113.85, 108.16, 91.33, 87.78, 97.21, 88.23, 89.13, 88.96, 95.31, 77.49, 65.28, 71.96, 73.66, 69.83, 63.16, 61.93, 57.89, 52.09, 54.67, 64.13, 58.52, 58.78, 54.21], '6M': [71.4, 77.7, 89.93, 117.86, 128.68, 118.06, 103.37, 93.48, 97.21, 88.23, 89.13, 88.92, 93.04, 77.49, 70.51, 74.46, 74.66, 68.61, 59.56, 61.52, 52.49, 55.82, 65.19, 63.4, 58.78, 54.21], '1Y': [43.11, 45.84, 44.78, 51.99, 58.78, 59.36, 56.71, 63.88, 68.5, 66.71, 65.84, 64.14, 70.74, 80.72, 88.08, 100.25, 94.63, 83.12, 91.18, 90.6, 77.88, 72.45, 69.14, 73.21, 77.03, 74.26, 75.39, 77.47, 91.93, 119.72, 120.59, 112.67, 91.33, 87.78, 105.67, 92.14, 89.13, 88.92, 93.04, 79.98, 67.7, 68.33, 74.41, 65.52, 63.05, 57, 52.49, 55.82, 65.19, 63.4, 58.78, 54.21] },
      velocityScore: { '1D': -2.6, '1W': -6.3, '1M': -63.6, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 318.9, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.69, PRN: false, RSHO: false, IDEF: 1.04, BILT: false },
      tonyNote: 'Kratos Defense is a defense technology company focused on unmanned systems, satellite communications, and high-performance computing for government customers. It appears in Industrials ETFs as an AI-adjacent defense name — autonomous systems and AI-driven surveillance are direct end markets. Revenue grew and the government contract backlog is expanding.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 2, avgWeight: 1.79, proScore: 0.71, coverage: 0.4,
      price: 285.43, weeklyPrices: [297.68, 299.66, 298.51, 296.89, 285.43], weeklyChange: -4.12, dayChange: -3.86, sortRank: 0, periodReturns: { '1M': -13.3, 'YTD': -16.1, '6M': -11.5, '1Y': 21.7 },
      priceHistory: { '1D': [296.89, 292.98, 287.28, 284.89, 285.09, 287.03, 287.12, 286.13, 285.98, 285.41, 284.04, 285.37, 285.32, 285.73, 285.61, 284.7, 284.25, 283.96, 284.22, 284.83, 283.26, 282.8, 283.29, 285.43], '1W': [297.68, 299.66, 298.51, 296.89, 285.43], '1M': [329.35, 324.6, 321.92, 317.55, 320.63, 317.56, 320.9, 308.17, 296.41, 293.66, 287.54, 294.53, 293.04, 292.26, 297.52, 300.95, 297.68, 299.66, 298.51, 296.89, 285.43], 'YTD': [340.07, 378.47, 415.39, 424.14, 427.83, 413.14, 392.7, 424.89, 435.58, 437.03, 417.51, 422.94, 402.08, 369.08, 402.28, 398.07, 392.19, 358.4, 363.37, 316.28, 326.17, 317.55, 308.17, 293.04, 300.95, 285.43], '6M': [322.63, 351.13, 363.48, 398.25, 415.58, 422.79, 429.64, 399.37, 424.89, 435.58, 437.03, 413.7, 427.99, 402.08, 379.9, 411.35, 398.13, 366.88, 362.17, 319.54, 334.22, 321.92, 320.9, 294.53, 300.95, 285.43], '1Y': [234.54, 238.65, 253.53, 258.5, 252.93, 262.49, 269.83, 264.69, 266.25, 269.98, 270.79, 269.94, 273.02, 276.16, 279.53, 288.49, 282.99, 280.02, 299.91, 322.02, 309.56, 313.97, 305.49, 306.65, 315.88, 329.16, 336.64, 345.73, 367.6, 411.66, 422.68, 425.39, 413.14, 392.7, 443.14, 443, 437.03, 413.7, 427.99, 402.56, 393.32, 403.37, 396.17, 370.14, 364.29, 314.72, 334.22, 321.92, 320.9, 294.53, 300.95, 285.43] },
      velocityScore: { '1D': -4.1, '1W': -5.3, '1M': -66.4, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 18.6, revenueGrowth: 13, eps: 15.38, grossMargin: 12, dividendYield: 1.93,
      etfPresence: { AIRR: 2.54, PRN: false, RSHO: false, IDEF: 1.03, BILT: false },
      tonyNote: 'Huntington Ingalls Industries is the only builder of nuclear-powered aircraft carriers for the U.S. Navy. Revenue is government-contracted and predictable; the ETF allocation in Industrials reflects defense spending growth and the Navy\'s backlog of nuclear submarine and carrier construction. A steady-state quality compounder in a market structure with no competition.',
    },
    {
      ticker: 'WMB', name: 'WMB', easyScore: 2, avgWeight: 1.39, proScore: 0.56, coverage: 0.4,
      price: 73.12, weeklyPrices: [72.08, 71.49, 71.48, 71.25, 73.12], weeklyChange: 1.44, dayChange: 2.62, sortRank: 0, periodReturns: { '1M': -5.9, 'YTD': 21.6, '6M': 24.7, '1Y': 20.9 },
      priceHistory: { '1D': [71.25, 71.15, 71.98, 71.55, 72.1, 72.38, 72.29, 72.26, 72.52, 72.88, 73.03, 72.91, 72.93, 72.91, 72.92, 72.66, 72.77, 72.96, 73.02, 72.97, 72.83, 72.96, 73.04, 73.12], '1W': [72.08, 71.49, 71.48, 71.25, 73.12], '1M': [77.69, 79.4, 77.88, 77.52, 78.47, 74.37, 73.13, 71.39, 70.04, 71.31, 71.66, 72.43, 71.96, 71.59, 71.59, 71.62, 72.08, 71.49, 71.48, 71.25, 73.12], 'YTD': [60.11, 61.15, 60.71, 63.72, 67.24, 66.46, 71.12, 72.14, 73.97, 75.77, 73.84, 73.69, 74.46, 72.47, 74.04, 71.44, 70.91, 71.61, 75.41, 71.96, 77.72, 77.52, 71.39, 71.96, 71.62, 73.12], '6M': [58.66, 59.52, 61.16, 59.56, 61.51, 65.48, 68.5, 68.84, 72.14, 73.97, 75.77, 74.4, 72.8, 74.46, 72.78, 73.01, 70.76, 71.1, 73.32, 73.76, 75.71, 77.88, 73.13, 72.43, 71.62, 73.12], '1Y': [60.49, 62.67, 58.48, 59.04, 57.68, 57.51, 60.27, 57.89, 57.46, 57.07, 57.88, 56.85, 58.4, 60.16, 63.97, 63.58, 62.61, 62.46, 57.48, 57.87, 59.58, 60.99, 59.61, 61.44, 61.95, 59.48, 58.26, 59.8, 59.5, 60.49, 63.18, 66.92, 66.46, 71.12, 72.17, 74.77, 75.77, 74.4, 72.8, 73.81, 71.83, 72.82, 70.86, 71.65, 76.31, 72.95, 75.71, 77.88, 73.13, 72.43, 71.62, 73.12] },
      velocityScore: { '1D': 1.8, '1W': 1.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$89B', pe: 32.1, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.87,
      etfPresence: { AIRR: false, PRN: false, RSHO: 0.92, IDEF: false, BILT: 1.86 },
      tonyNote: 'WMB appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RBC', name: 'RBC Bearings Incorporated', easyScore: 2, avgWeight: 1.19, proScore: 0.48, coverage: 0.4,
      price: 639.18, weeklyPrices: [603.64, 616.95, 621.08, 625.73, 639.18], weeklyChange: 5.89, dayChange: 2.15, sortRank: 0, periodReturns: { '1M': 16, 'YTD': 42.5, '6M': 42.1, '1Y': 71.6 },
      priceHistory: { '1D': [625.73, 635.63, 635, 633.61, 633.89, 634.13, 635.18, 634.78, 634.64, 633.02, 634.98, 634.65, 634.64, 635.53, 635.36, 636.56, 635.64, 635.74, 635.69, 636.35, 633.3, 632.73, 634.22, 639.18], '1W': [603.64, 616.95, 621.08, 625.73, 639.18], '1M': [551.12, 565.22, 571.05, 566.96, 559.95, 577.42, 577.83, 571.96, 566.14, 578.34, 584.18, 589.76, 590.09, 590.97, 592.41, 607.46, 603.64, 616.95, 621.08, 625.73, 639.18], 'YTD': [448.43, 485, 489.33, 504.99, 511.98, 516.78, 550.53, 551.65, 565.44, 570.08, 560.28, 544.55, 552.23, 524.38, 553.31, 598.23, 596.86, 591, 593.12, 605.99, 569.06, 566.96, 571.96, 590.09, 607.46, 639.18], '6M': [449.77, 456.33, 461.21, 488.31, 495.29, 504.54, 516.1, 547.51, 551.65, 565.44, 570.08, 559.52, 547.81, 552.23, 543.12, 580.55, 586.98, 588.74, 584.49, 623.19, 618.91, 571.05, 577.83, 589.76, 607.46, 639.18], '1Y': [372.5, 381.36, 386.98, 376.71, 391.98, 385.62, 399.8, 398.07, 394.75, 401.56, 389.96, 381.97, 382.27, 383.5, 384.3, 374.45, 372.64, 372.85, 412.19, 428.53, 434.25, 432.04, 426.16, 441.76, 443.51, 462.59, 451.06, 456.9, 475.7, 489.97, 504.71, 508.95, 516.78, 550.53, 551.42, 576.5, 570.08, 559.52, 547.81, 561.66, 551.99, 595.11, 571.61, 601.39, 599.09, 611.54, 618.91, 571.05, 577.83, 589.76, 607.46, 639.18] },
      velocityScore: { '1D': 2.1, '1W': 6.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$20B', pe: 70.4, revenueGrowth: 18, eps: 9.08, grossMargin: 45, dividendYield: null,
      etfPresence: { AIRR: 1.87, PRN: false, RSHO: false, IDEF: 0.51, BILT: false },
      tonyNote: 'RBC Bearings Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRCY', name: 'Mercury Systems, Inc.', easyScore: 2, avgWeight: 1.1, proScore: 0.44, coverage: 0.4,
      price: 113.91, weeklyPrices: [120.30, 115.93, 112.44, 115.50, 113.91], weeklyChange: -5.31, dayChange: -1.38, sortRank: 0, periodReturns: { '1M': 22, 'YTD': 56, '6M': 65.4, '1Y': 124.4 },
      priceHistory: { '1D': [115.5, 115.79, 114.08, 113.9, 113.96, 114.72, 114.41, 114.43, 113.67, 113.43, 112.76, 113.36, 113.92, 113.49, 113.81, 113.65, 114.72, 114.38, 113.23, 113.88, 113.53, 113.16, 113.44, 113.91], '1W': [120.3, 115.93, 112.44, 115.5, 113.91], '1M': [93.39, 92.8, 94.81, 96.36, 98.55, 97.11, 108.11, 111.7, 111.28, 112.87, 111.59, 117.82, 111.27, 110.94, 108.82, 119.32, 120.3, 115.93, 112.44, 115.5, 113.91], 'YTD': [73.01, 88.74, 98.62, 99.48, 98.29, 77.12, 80.33, 86.66, 89.3, 89.18, 86.87, 81.35, 74.49, 69.86, 77.53, 84.09, 84.12, 77.06, 78.53, 90.34, 92.03, 96.36, 111.7, 111.27, 119.32, 113.91], '6M': [68.88, 74.22, 81.29, 97.02, 97.1, 101.04, 99.28, 84.36, 86.66, 89.3, 89.18, 86, 78.97, 74.49, 72.91, 80.81, 85.51, 82.61, 74.75, 91.66, 92.5, 94.81, 108.11, 117.82, 119.32, 113.91], '1Y': [50.77, 53.41, 51.45, 51.27, 52.37, 52.76, 52.17, 52.83, 66.7, 66.83, 67.55, 68.68, 72.81, 76.57, 75.28, 84, 73.58, 75.54, 79.42, 77.41, 74.07, 70.85, 66.68, 66.8, 71.94, 74.49, 69.65, 74.93, 84.25, 99.14, 99.57, 100.02, 77.12, 80.33, 89.86, 89.58, 89.18, 86, 78.97, 78.71, 74.75, 79.23, 84.91, 78.91, 78.91, 88.06, 92.5, 94.81, 108.11, 117.82, 119.32, 113.91] },
      velocityScore: { '1D': -2.2, '1W': -6.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 12, eps: -0.23, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: 1.18, PRN: false, RSHO: false, IDEF: 1.03, BILT: false },
      tonyNote: 'Mercury Systems, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, avgWeight: 1.06, proScore: 0.43, coverage: 0.4,
      price: 50.37, weeklyPrices: [47.83, 48.27, 51.70, 52.03, 50.37], weeklyChange: 5.31, dayChange: -3.19, sortRank: 0, periodReturns: { '1M': -23.9, 'YTD': -31.2, '6M': -26, '1Y': 8.9 },
      priceHistory: { '1D': [52.03, 52.17, 50.68, 49.68, 50.29, 50.41, 50.78, 50.5, 50.23, 49.95, 49.49, 49.91, 49.32, 49.41, 49.36, 49.35, 49.06, 49.04, 49.12, 49.47, 49.86, 49.74, 49.58, 50.37], '1W': [47.83, 48.27, 51.7, 52.03, 50.37], '1M': [66.21, 64.2, 65.76, 65.3, 64.1, 63.52, 65.86, 57.5, 53.65, 54.65, 51.84, 54.39, 49.44, 49.64, 48.37, 49.58, 47.83, 48.27, 51.7, 52.03, 50.37], 'YTD': [73.17, 101.28, 108.01, 111.61, 110.93, 97.94, 79.52, 81, 83.44, 98.88, 102.79, 104.06, 101.84, 74.82, 82, 90.18, 82.69, 71.95, 65.32, 60.84, 62.77, 65.3, 57.5, 49.44, 49.58, 50.37], '6M': [68.11, 77.55, 83.99, 107.5, 106.28, 113.34, 111.72, 91.25, 81, 83.44, 98.88, 104.84, 101.43, 101.84, 80.05, 87.75, 92.73, 82.11, 65.98, 63.19, 67.28, 65.76, 65.86, 54.39, 49.58, 50.37], '1Y': [46.24, 50.47, 45.24, 49.41, 56.22, 50.29, 50.22, 45.78, 50.6, 52.24, 53.41, 62.36, 63.8, 67.23, 71.35, 74.22, 74.71, 75.03, 84.15, 84.24, 70.68, 60.25, 60.07, 63.71, 66.06, 68.06, 71.65, 77.57, 90.41, 107.49, 104.79, 115.29, 97.94, 79.52, 88.46, 88.31, 98.88, 104.84, 101.43, 99.6, 82.69, 84.22, 87.91, 76.6, 67.98, 60.45, 67.28, 65.76, 65.86, 54.39, 49.58, 50.37] },
      velocityScore: { '1D': -2.3, '1W': 4.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: 219, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.93, PRN: false, RSHO: false, IDEF: 0.2, BILT: false },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DRS', name: 'Leonardo DRS, Inc.', easyScore: 2, avgWeight: 0.57, proScore: 0.23, coverage: 0.4,
      price: 46.08, weeklyPrices: [48.53, 46.68, 45.59, 46.58, 46.08], weeklyChange: -5.05, dayChange: -1.07, sortRank: 0, periodReturns: { '1M': 7.6, 'YTD': 35.2, '6M': 38.9, '1Y': 4.7 },
      priceHistory: { '1D': [46.58, 46.37, 45.5, 45.15, 45.38, 45.47, 45.14, 45.19, 45.17, 45.19, 44.9, 45.06, 45.28, 45.78, 45.54, 45.71, 45.74, 45.9, 45.78, 45.87, 45.76, 45.59, 45.81, 46.08], '1W': [48.53, 46.68, 45.59, 46.58, 46.08], '1M': [42.84, 42.81, 44.56, 44.55, 44.92, 45.35, 48.41, 48.76, 47.96, 47.39, 45.61, 46.71, 46.15, 46.55, 47.35, 49.69, 48.53, 46.68, 45.59, 46.58, 46.08], 'YTD': [34.09, 38.84, 41.42, 41.28, 41.3, 38.31, 37.87, 39.9, 42.36, 46.95, 46.35, 45.6, 44.06, 43.25, 46.19, 47.54, 44.24, 40.72, 40, 41.36, 41.5, 44.55, 48.76, 46.15, 49.69, 46.08], '6M': [33.17, 34.28, 37.01, 41.27, 42.07, 42.16, 41.51, 39.48, 39.9, 42.36, 46.95, 46.16, 46.44, 44.06, 44.52, 47.93, 46.29, 42.07, 39.47, 41.79, 42.5, 44.56, 48.41, 46.71, 49.69, 46.08], '1Y': [44, 45.04, 47.16, 47.97, 46.79, 48.08, 41.67, 41.49, 41.67, 41.19, 41.66, 41.05, 42.02, 42.88, 43.76, 45.29, 43.23, 39.34, 40.51, 36.56, 35.33, 34.84, 33.24, 33.24, 33.92, 33.68, 33.64, 34.13, 37.46, 40.85, 41.46, 42.47, 38.31, 37.87, 41.07, 43.34, 46.95, 46.16, 46.44, 46.32, 45.86, 47.1, 44.94, 41.41, 40.63, 41.44, 42.5, 44.56, 48.41, 46.71, 49.69, 46.08] },
      velocityScore: { '1D': 0, '1W': -4.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 43.1, revenueGrowth: 6, eps: 1.07, grossMargin: 24, dividendYield: 0.78,
      etfPresence: { AIRR: 0.84, PRN: false, RSHO: false, IDEF: 0.3, BILT: false },
      tonyNote: 'Leonardo DRS, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TPC', name: 'Tutor Perini Corporation', easyScore: 2, avgWeight: 0.36, proScore: 0.14, coverage: 0.4,
      price: 77.99, weeklyPrices: [74.92, 76.55, 76.19, 77.89, 77.99], weeklyChange: 4.1, dayChange: 0.13, sortRank: 0, periodReturns: { '1M': 3.4, 'YTD': 16.4, '6M': 15.4, '1Y': 83.7 },
      priceHistory: { '1D': [77.89, 79.02, 78.46, 77.92, 77.65, 78.01, 77.95, 77.62, 77.63, 77.71, 77.68, 77.93, 77.95, 77.97, 77.55, 77.57, 77.59, 77.68, 77.64, 77.58, 77.48, 77.53, 77.86, 77.99], '1W': [74.92, 76.55, 76.19, 77.89, 77.99], '1M': [75.43, 74.91, 76.99, 74.88, 72.76, 74.47, 73.27, 71.49, 74.26, 74.29, 72.26, 72.38, 70.53, 72.13, 71.48, 73.61, 74.92, 76.55, 76.19, 77.89, 77.99], 'YTD': [67.02, 70.17, 73.89, 76.79, 79.86, 78.83, 85.07, 81.1, 86.1, 73.71, 71.29, 71.44, 75.25, 72.83, 77.31, 86.16, 84.38, 87.5, 92.76, 82.85, 79.49, 74.88, 71.49, 70.53, 73.61, 77.99], '6M': [67.56, 69.06, 71.79, 74.25, 74.13, 78.53, 82.33, 86, 81.1, 86.1, 73.71, 69.83, 71.21, 75.25, 77.19, 80.54, 86.25, 84.19, 86.04, 96.98, 80.64, 76.99, 73.27, 72.38, 73.61, 77.99], '1Y': [42.46, 46.85, 47.99, 49.51, 48.97, 47.63, 45.65, 56.41, 56.75, 58.43, 58.94, 61.83, 64.22, 66.81, 65.43, 62.84, 60.61, 64.22, 68.84, 67.36, 62.94, 59.08, 60.94, 66.43, 68.6, 67.81, 69.99, 68.66, 71.14, 73.54, 75.27, 79.38, 78.83, 85.07, 84.9, 89.38, 73.71, 69.83, 71.21, 78.37, 78.71, 81.5, 84.39, 86.48, 92.92, 81.96, 80.64, 76.99, 73.27, 72.38, 73.61, 77.99] },
      velocityScore: { '1D': 0, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 53.4, revenueGrowth: 12, eps: 1.46, grossMargin: 12, dividendYield: 0.31,
      etfPresence: { AIRR: 0.68, PRN: false, RSHO: false, IDEF: 0.04, BILT: false },
      tonyNote: 'Tutor Perini Corporation appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TKR', name: 'Timken Company', easyScore: 1, avgWeight: 8.75, proScore: 1.75, coverage: 0.2,
      price: 142.36, weeklyPrices: [137.06, 139.12, 140.28, 139.40, 142.36], weeklyChange: 3.87, dayChange: 2.12, sortRank: 0, periodReturns: { '1M': 26.3, 'YTD': 69.2, '6M': 67.6, '1Y': 101.8 },
      priceHistory: { '1D': [139.4, 141.54, 142.51, 141.73, 142, 142.21, 142.38, 141.9, 141.64, 141.23, 141.22, 141.45, 141.49, 141.42, 141.19, 141.35, 141.14, 141.41, 141.46, 141.32, 141.32, 141.44, 140.87, 142.36], '1W': [137.06, 139.12, 140.28, 139.4, 142.36], '1M': [112.73, 109.36, 117.2, 118.93, 119.95, 127.16, 126.78, 127.98, 126.54, 131.9, 131.82, 133.66, 131.83, 134.67, 137.09, 137.4, 137.06, 139.12, 140.28, 139.4, 142.36], 'YTD': [84.13, 90.6, 91.91, 94.6, 94.15, 98.99, 108.82, 107.23, 107.69, 105.59, 102.18, 98.59, 101.03, 95.94, 99.17, 106.81, 108.45, 108.7, 107.12, 117.97, 114.49, 118.93, 127.98, 131.83, 137.4, 142.36], '6M': [84.92, 86.52, 88.34, 90.83, 90.65, 93.89, 96.14, 109.41, 107.23, 107.69, 105.59, 103.33, 98.23, 101.03, 100.57, 105.88, 103.73, 106.79, 106.53, 119.7, 115.74, 117.2, 126.78, 133.66, 137.4, 142.36], '1Y': [70.56, 73.21, 75.52, 77.3, 78.63, 81.69, 73.5, 74.39, 76, 78.99, 77.23, 77.15, 77.38, 76.84, 75.23, 76.76, 70.79, 73.17, 78.12, 78.51, 78.99, 76.41, 77.48, 79.95, 83.44, 87.01, 85.26, 86.33, 90.95, 91.68, 93.89, 93.4, 98.99, 108.82, 107.11, 109.88, 105.59, 103.33, 98.23, 101.9, 102.06, 106.92, 103.92, 108.7, 110.89, 116.34, 115.74, 117.2, 126.78, 133.66, 137.4, 142.36] },
      velocityScore: { '1D': -4.9, '1W': -5.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 32.4, revenueGrowth: 8, eps: 4.4, grossMargin: 31, dividendYield: 1.01,
      etfPresence: { AIRR: false, PRN: false, RSHO: 8.75, IDEF: false, BILT: false },
      tonyNote: 'Timken Company appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RTX', name: 'RTX CORP', easyScore: 1, avgWeight: 8.05, proScore: 1.61, coverage: 0.2,
      price: 185.6, weeklyPrices: [183.53, 183.64, 186.77, 192.58, 185.60], weeklyChange: 1.13, dayChange: -3.62, sortRank: 0, periodReturns: { '1M': 5.5, 'YTD': 1.2, '6M': 4.1, '1Y': 26.6 },
      priceHistory: { '1D': [192.58, 191.96, 188.32, 186.99, 186.42, 187.28, 186.7, 186.25, 186.21, 185.74, 185.74, 185.74, 186.04, 185.71, 185.59, 185.14, 185.19, 184.79, 184.84, 185.56, 185.43, 185.68, 185.54, 185.6], '1W': [183.53, 183.64, 186.77, 192.58, 185.6], '1M': [175.95, 174.49, 174.85, 175.98, 177.01, 176.59, 178.96, 179.66, 174.41, 174.26, 172.55, 179.41, 180.99, 178.66, 181.56, 184.21, 183.53, 183.64, 186.77, 192.58, 185.6], 'YTD': [183.4, 187.17, 198.84, 196.34, 199.88, 196.74, 196.51, 204.81, 195.98, 208.82, 207, 203.33, 194, 187.15, 197.92, 202.81, 195.79, 173.38, 172.9, 176.09, 171.18, 175.98, 179.66, 180.99, 184.21, 185.6], '6M': [178.29, 185.17, 188.26, 193.85, 196.36, 201.28, 203.5, 195.19, 204.81, 195.98, 208.82, 207.26, 204.56, 194, 192.9, 203.48, 198.39, 180.91, 172.79, 176.74, 178.11, 174.85, 178.96, 179.41, 184.21, 185.6], '1Y': [146.64, 144.66, 145.92, 149.28, 151.56, 156.07, 156.81, 154.86, 154.09, 156.24, 158.6, 154.22, 158.37, 159.43, 163.63, 168.8, 157.7, 157.95, 178.65, 178.5, 176.97, 175.57, 169.68, 168.02, 171.52, 182.11, 182.01, 184.42, 190.4, 194.08, 197.5, 199.46, 196.74, 196.51, 205.41, 197.63, 208.82, 207.26, 204.56, 195, 194.72, 203.19, 195.85, 179.3, 176.07, 176.78, 178.11, 174.85, 178.96, 179.41, 184.21, 185.6] },
      velocityScore: { '1D': -1.8, '1W': 1.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$250B', pe: 34.8, revenueGrowth: 9, eps: 5.33, grossMargin: 20, dividendYield: 1.49,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 8.05, BILT: false },
      tonyNote: 'RTX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CGNX', name: 'Cognex Corporation', easyScore: 1, avgWeight: 7.21, proScore: 1.44, coverage: 0.2,
      price: 66.1, weeklyPrices: [63.61, 65.90, 65.41, 64.77, 66.10], weeklyChange: 3.91, dayChange: 2.05, sortRank: 0, periodReturns: { '1M': 6.8, 'YTD': 83.7, '6M': 82.7, '1Y': 123.2 },
      priceHistory: { '1D': [64.77, 66.09, 66.53, 66.11, 65.97, 66.32, 66.44, 66.41, 66.35, 66.32, 66.25, 66.5, 66.48, 66.66, 66.54, 66.67, 66.59, 66.65, 66.78, 66.92, 66.33, 66.35, 66.52, 66.1], '1W': [63.61, 65.9, 65.41, 64.77, 66.1], '1M': [61.91, 60.65, 63.37, 64.27, 66.09, 66.7, 66.01, 65.85, 64.64, 66.08, 66.06, 64.67, 60.82, 62.39, 61.32, 62.11, 63.61, 65.9, 65.41, 64.77, 66.1], 'YTD': [35.98, 37.74, 40.06, 41.71, 39.09, 40.73, 43.03, 56.72, 57.42, 53.17, 50.58, 50.12, 51.01, 45.94, 51.69, 55.58, 55.48, 55.09, 56.3, 65.66, 64.26, 64.27, 65.85, 60.82, 62.11, 66.1], '6M': [36.17, 36.55, 37.37, 39.43, 38.92, 39.46, 40.85, 43.58, 56.72, 57.42, 53.17, 50.99, 49.87, 51.01, 48.99, 53.78, 54.64, 54.03, 53.52, 62.26, 63.64, 63.37, 66.01, 64.67, 62.11, 66.1], '1Y': [29.61, 31.46, 31.85, 33.78, 33.73, 34.63, 40.47, 40.91, 42.7, 44.76, 43.94, 44.61, 44.16, 46.54, 45.55, 46.87, 40.78, 46.04, 48.35, 41.39, 39.27, 36.77, 36.89, 37.95, 38.42, 34.8, 36.8, 36.47, 38.6, 39.63, 40.41, 39.05, 40.73, 43.03, 55.94, 55.36, 53.17, 50.99, 49.87, 51.61, 49.34, 53.91, 54.97, 54.1, 55.51, 65.92, 63.64, 63.37, 66.01, 64.67, 62.11, 66.1] },
      velocityScore: { '1D': 0.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 77.8, revenueGrowth: 24, eps: 0.85, grossMargin: 68, dividendYield: 0.51,
      etfPresence: { AIRR: false, PRN: false, RSHO: 7.21, IDEF: false, BILT: false },
      tonyNote: 'Cognex Corporation appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 7.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 5.47, proScore: 5.47, coverage: 1,
      price: 286.69, weeklyPrices: [232.36, 260.07, 265.10, 280.91, 286.69], weeklyChange: 23.38, dayChange: 2.06, sortRank: 0, periodReturns: { '1M': 43.4, 'YTD': 242.5, '6M': 267.1, '1Y': 497.6 },
      priceHistory: { '1D': [280.91, 289.85, 286.96, 285.84, 279.34, 283.8, 289.09, 288.23, 287.88, 286.15, 286.19, 285.73, 284.22, 284.82, 284.78, 284.86, 284.47, 284.19, 284.38, 282.25, 280, 283.88, 285.31, 286.69], '1W': [232.36, 260.07, 265.1, 280.91, 286.69], '1M': [199.86, 197.73, 191.82, 219.93, 214.77, 208.37, 226.34, 231.09, 264.51, 260.58, 251.68, 259.67, 227.81, 218, 220.12, 222.24, 232.36, 260.07, 265.1, 280.91, 286.69], 'YTD': [83.71, 97.3, 101.98, 96.85, 94.91, 82.39, 88.61, 101.8, 106.12, 97.78, 96.43, 116.33, 114.91, 92.26, 117.4, 161.94, 159.16, 144.96, 176.42, 177.05, 219.94, 219.93, 231.09, 227.81, 222.24, 286.69], '6M': [78.09, 87.59, 92.83, 107.33, 99.29, 97.87, 89.95, 91.79, 101.8, 106.12, 97.78, 112, 118.56, 114.91, 103.76, 125, 166.77, 156.14, 141.19, 195.09, 207.27, 191.82, 226.34, 259.67, 222.24, 286.69], '1Y': [47.97, 51.84, 47.84, 51.95, 52.37, 52.75, 52, 68.78, 71.62, 68.98, 68.32, 64.06, 90.96, 106.6, 110.22, 124.94, 129.58, 113.44, 117.26, 130.82, 111.28, 83.54, 83.26, 100.15, 100.33, 81.14, 89.46, 86.04, 100.24, 105.43, 98.87, 100.43, 82.39, 88.61, 107.61, 104.88, 97.78, 112, 118.56, 115.09, 101.95, 136.33, 165.34, 157.08, 138.23, 184.77, 207.27, 191.82, 226.34, 259.67, 222.24, 286.69] },
      velocityScore: { '1D': 10.3, '1W': 22.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$73B', pe: 111.1, revenueGrowth: 684, eps: 2.58, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 3.83, MEME: 6.84, RKNG: 5.75 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 3, avgWeight: 4.17, proScore: 4.17, coverage: 1,
      price: 59.96, weeklyPrices: [59.77, 60.85, 59.18, 58.11, 59.96], weeklyChange: 0.32, dayChange: 3.18, sortRank: 0, periodReturns: { '1M': 18.8, 'YTD': 58.8, '6M': 67.5, '1Y': 472.7 },
      priceHistory: { '1D': [58.11, 59.25, 59.42, 59.74, 59.65, 60.49, 60.36, 59.94, 59.86, 60.44, 59.95, 60.58, 60.42, 60.44, 60.12, 60.15, 60.23, 59.85, 59.79, 59.15, 58.3, 58.38, 59.49, 59.96], '1W': [59.77, 60.85, 59.18, 58.11, 59.96], '1M': [50.46, 47.74, 52.71, 58.06, 56.83, 67.84, 64.05, 63.54, 65.33, 66.6, 65.48, 61.86, 54.35, 59.19, 54.02, 56.71, 59.77, 60.85, 59.18, 58.11, 59.96], 'YTD': [37.77, 45.68, 52.88, 52.26, 59.84, 44.94, 42.67, 42.08, 44.03, 43.84, 38.12, 42.96, 41.12, 31.62, 35.74, 47.37, 48.72, 48.36, 49.48, 61.2, 52.94, 58.06, 63.54, 54.35, 56.71, 59.96], '6M': [35.8, 40.3, 48.24, 50.33, 54.26, 59.99, 54.39, 42.93, 42.08, 44.03, 43.84, 41.98, 42.21, 41.12, 34.28, 36.83, 48.82, 48.39, 42.86, 60.98, 55.17, 52.71, 64.05, 61.86, 56.71, 59.96], '1Y': [10.47, 14, 16.95, 17.28, 18.15, 16.58, 15.4, 18.45, 19.69, 21.43, 26.48, 26.19, 37.14, 41.9, 45.93, 57.75, 59.77, 60.72, 62.9, 60.75, 62.38, 46.37, 42.26, 48.49, 46.34, 35.48, 39.92, 39.41, 45.91, 52.99, 53.48, 62.94, 44.94, 42.67, 43.29, 44.24, 43.84, 41.98, 42.21, 41.43, 34.09, 37.06, 47.7, 52.02, 45.51, 56.85, 55.17, 52.71, 64.05, 61.86, 56.71, 59.96] },
      velocityScore: { '1D': 5.8, '1W': 7.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$21B', pe: 77.9, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 3.03, MEME: 6.27, RKNG: 3.22 },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 3, avgWeight: 4.07, proScore: 4.07, coverage: 1,
      price: 46.59, weeklyPrices: [42.70, 46.47, 46.27, 45.57, 46.59], weeklyChange: 9.11, dayChange: 2.24, sortRank: 0, periodReturns: { '1M': 19, 'YTD': 90, '6M': 94.9, '1Y': 351 },
      priceHistory: { '1D': [45.57, 46.62, 46.23, 46.06, 46.19, 46.73, 46.75, 46.38, 46.4, 46.97, 46.86, 46.76, 46.33, 46.3, 45.93, 46.41, 46.3, 46.09, 45.96, 45.75, 45.54, 46, 46.33, 46.59], '1W': [42.7, 46.47, 46.27, 45.57, 46.59], '1M': [39.14, 36.62, 39.52, 48.02, 45.87, 48.98, 49.65, 47.28, 47.94, 47.86, 44.71, 44.15, 39.62, 40.94, 41.91, 41.47, 42.7, 46.47, 46.27, 45.57, 46.59], 'YTD': [24.52, 31.94, 36.1, 34.74, 38.07, 31.54, 36.6, 31.91, 29.08, 28.65, 27.4, 27.51, 26.79, 20.55, 25.18, 31.47, 32.19, 33.67, 35.63, 41.25, 42.56, 48.02, 47.28, 39.62, 41.47, 46.59], '6M': [23.9, 24.05, 30.2, 38.21, 35.46, 41.35, 36.7, 37.47, 31.91, 29.08, 28.65, 28.52, 26.65, 26.79, 23.74, 27.79, 30.81, 32.43, 32.69, 44.24, 45.48, 39.52, 49.65, 44.15, 41.47, 46.59], '1Y': [10.33, 10.38, 9.66, 9.52, 11.09, 10.58, 12.52, 14.2, 14.09, 16.05, 15.98, 13.91, 19.35, 24.45, 22.15, 27.71, 33.99, 34.24, 33.43, 34.66, 30.98, 23.65, 21.09, 28.21, 32.11, 22.98, 27.85, 24.81, 30.26, 36.71, 35.06, 40.22, 31.54, 36.6, 31.53, 28.65, 28.65, 28.52, 26.65, 28.37, 24.49, 25.57, 30.09, 36.35, 34.25, 41.53, 45.48, 39.52, 49.65, 44.15, 41.47, 46.59] },
      velocityScore: { '1D': 2.8, '1W': 10, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.53, MEME: 5.81, RKNG: 3.87 },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 3, avgWeight: 3.85, proScore: 3.85, coverage: 1,
      price: 80.66, weeklyPrices: [82.41, 87.57, 82.25, 85.43, 80.66], weeklyChange: -2.12, dayChange: -5.58, sortRank: 0, periodReturns: { '1M': -7.1, 'YTD': 11.1, '6M': 22.3, '1Y': 75.6 },
      priceHistory: { '1D': [85.43, 79.24, 77.93, 79.32, 79.16, 79.52, 79.17, 79.95, 78.91, 78.58, 78.43, 78.3, 78.42, 78.38, 78.42, 78.84, 78.25, 77.95, 78.14, 78.27, 78.18, 78.77, 79.58, 80.66], '1W': [82.41, 87.57, 82.25, 85.43, 80.66], '1M': [86.83, 88.1, 89.58, 96.23, 105.86, 129.6, 133.09, 113.41, 105.65, 118.17, 107.73, 107.29, 93.6, 92.06, 88.71, 97.56, 82.41, 87.57, 82.25, 85.43, 80.66], 'YTD': [72.63, 90.56, 95.22, 116.37, 122.09, 103.5, 96.92, 84.43, 82.36, 104.89, 87.53, 95.7, 86.98, 73.82, 92.57, 88.57, 81, 77.2, 68.43, 75.05, 83.67, 96.23, 113.41, 93.6, 97.56, 80.66], '6M': [65.93, 71.95, 90.92, 98.39, 112.44, 111.34, 115.76, 96.27, 84.43, 82.36, 104.89, 88.21, 90.74, 86.98, 82.87, 96.46, 86.91, 84.66, 69.85, 70.68, 74.81, 89.58, 133.09, 107.29, 97.56, 80.66], '1Y': [45.94, 49.36, 45.69, 47.86, 56.67, 54.22, 52.46, 46.63, 48.08, 47.07, 48.94, 40.77, 40.97, 48.85, 48.84, 72.9, 82.03, 83.49, 73.7, 80.25, 69.19, 61.4, 51.37, 52.61, 74, 67.81, 75.84, 71.47, 97.49, 92.72, 103.5, 121.23, 103.5, 96.92, 86.4, 85.76, 104.89, 88.21, 90.74, 96.06, 83.99, 91.61, 90.94, 78.75, 73.9, 65.35, 74.81, 89.58, 133.09, 107.29, 97.56, 80.66] },
      velocityScore: { '1D': 4.6, '1W': -2.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$31B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.88, MEME: 6.38, RKNG: 2.29 },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 6.68, proScore: 4.45, coverage: 0.667,
      price: 2184.75, weeklyPrices: [1980.10, 2107.86, 1991.55, 1958.80, 2184.75], weeklyChange: 10.34, dayChange: 11.54, sortRank: 0, periodReturns: { '1M': 63.9, 'YTD': 820.4, '6M': 895.5, '1Y': 4590.3 },
      priceHistory: { '1D': [1958.8, 2110.45, 2140.15, 2173.94, 2153.46, 2163.79, 2166.11, 2165.8, 2171.57, 2172.5, 2174.54, 2164.96, 2164.73, 2175.95, 2177, 2172.97, 2174.24, 2184.4, 2178.87, 2165.7, 2166.74, 2186, 2183.09, 2184.75], '1W': [1980.1, 2107.86, 1991.55, 1958.8, 2184.75], '1M': [1333.01, 1383.29, 1392.56, 1542.24, 1478.69, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75], 'YTD': [237.38, 334.54, 387.81, 503.44, 539.3, 584.55, 599.34, 600.4, 632.38, 599.06, 618.89, 720.17, 702.48, 572.5, 710.8, 944.46, 913.02, 1070.2, 1255.86, 1562.34, 1407.61, 1542.24, 1694.98, 1559.32, 1881.51, 2184.75], '6M': [219.46, 250.05, 274.08, 389.27, 453.12, 481.43, 695.51, 541.64, 600.4, 632.38, 599.06, 655.43, 753.69, 702.48, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1447.23, 1392.56, 1641.64, 1759.68, 1881.51, 2184.75], '1Y': [46.58, 47.15, 45.22, 42.48, 41.61, 41.89, 41.33, 44.34, 44.54, 46.37, 52.47, 70.5, 90.09, 102.92, 113.5, 121.17, 116.91, 140.16, 186.16, 199.33, 239.48, 254.16, 200.27, 210.17, 225.47, 201.87, 237.61, 244.25, 349.63, 389.81, 501.29, 527.63, 584.55, 599.34, 621.09, 651.9, 599.06, 655.43, 753.69, 677.86, 692.73, 851.57, 919.47, 932.43, 1096.51, 1339.96, 1447.23, 1392.56, 1641.64, 1759.68, 1881.51, 2184.75] },
      velocityScore: { '1D': 3.7, '1W': 10.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$324B', pe: 74.6, revenueGrowth: 251, eps: 29.28, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.48, RKNG: 6.87 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 2, avgWeight: 5.85, proScore: 3.9, coverage: 0.667,
      price: 161.85, weeklyPrices: [169.05, 191.55, 170.81, 167.34, 161.85], weeklyChange: -4.26, dayChange: -3.28, sortRank: 0, periodReturns: { '1M': -6.6, 'YTD': 364.3, '6M': 453.3, '1Y': 590.2 },
      priceHistory: { '1D': [167.34, 167.2, 161.41, 165.92, 170.32, 170.3, 168.87, 165.4, 164.78, 165.24, 164.38, 162.35, 161.19, 162.29, 161.87, 161.71, 161.01, 160.5, 159.01, 159, 159.4, 160.05, 161.77, 161.85], '1W': [169.05, 191.55, 170.81, 167.34, 161.85], '1M': [173.26, 171.33, 165.26, 176.81, 181.49, 179.83, 169.02, 158.41, 185.67, 202.37, 184.07, 202.89, 177, 196.64, 162.88, 172.78, 169.05, 191.55, 170.81, 167.34, 161.85], 'YTD': [34.86, 33.01, 34.47, 38.15, 39.57, 39.9, 48.4, 43.44, 58.12, 99.71, 120.49, 86.33, 113.9, 85.19, 117.64, 146.39, 163.47, 145.78, 172.98, 148.94, 190.36, 176.81, 158.41, 177, 172.78, 161.85], '6M': [29.25, 37.17, 34.99, 33.72, 39.26, 37.39, 46.12, 48.49, 43.44, 58.12, 99.71, 127.01, 92.63, 113.9, 84.59, 132.7, 142.55, 149.42, 152.83, 178.54, 223.1, 165.26, 169.02, 202.89, 172.78, 161.85], '1Y': [23.45, 26.22, 26.44, 29.5, 28.23, 25.22, 21.53, 21.59, 22.36, 24.79, 24.2, 23.63, 29.56, 30.54, 25.94, 33.79, 27.15, 31.92, 34.01, 35.56, 28.57, 21.47, 20.58, 26.53, 27.84, 29.9, 31.32, 36.75, 38.61, 34.18, 38.38, 45.23, 39.9, 48.4, 46.98, 53.69, 99.71, 127.01, 92.63, 114.41, 86.35, 133.3, 157.32, 137.73, 164.36, 157.55, 223.1, 165.26, 169.02, 202.89, 172.78, 161.85] },
      velocityScore: { '1D': 1, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 7.73, RKNG: 3.97 },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 2, avgWeight: 5.81, proScore: 3.87, coverage: 0.667,
      price: 746.23, weeklyPrices: [562.93, 653.53, 681.08, 712.13, 746.23], weeklyChange: 32.56, dayChange: 4.79, sortRank: 0, periodReturns: { '1M': 62.7, 'YTD': 333.2, '6M': 326.4, '1Y': 1158.6 },
      priceHistory: { '1D': [712.13, 790.36, 786.06, 783.76, 773.56, 770.57, 772.01, 774.04, 769.58, 762.15, 758.33, 753.26, 743.76, 751.17, 746.33, 744.85, 743.34, 741.61, 746.88, 745.57, 745.06, 751.68, 757, 746.23], '1W': [562.93, 653.53, 681.08, 712.13, 746.23], '1M': [458.68, 455.8, 459.62, 486.46, 484.28, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23], 'YTD': [172.27, 187.68, 215, 243.29, 278.41, 269.41, 273.74, 296.56, 290.95, 261.3, 266.22, 313.81, 301.05, 251.67, 311.96, 366.22, 374.11, 400.73, 442.36, 480, 482.02, 486.46, 531.21, 511.72, 529.29, 746.23], '6M': [175.01, 181.54, 187.88, 212.14, 222.97, 252.66, 290.24, 262.56, 296.56, 290.95, 261.3, 268.81, 304.9, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 459.62, 531.18, 575.5, 529.29, 746.23], '1Y': [59.29, 63.29, 65.22, 66.93, 68.74, 68.99, 76.55, 74.97, 75.06, 76.97, 80.34, 93.29, 102.39, 112.41, 116.74, 125.28, 115.42, 126.2, 129.43, 150.21, 162.96, 157.83, 139.19, 163.54, 169.78, 172.04, 181.08, 179.68, 219.38, 214, 241.9, 279.7, 269.41, 273.74, 284.67, 282.25, 261.3, 268.81, 304.9, 296.14, 297.73, 337.88, 361.69, 403.12, 434.52, 463.91, 494.09, 459.62, 531.18, 575.5, 529.29, 746.23] },
      velocityScore: { '1D': 117.4, '1W': 152.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$257B', pe: 44.6, revenueGrowth: 46, eps: 16.72, grossMargin: 45, dividendYield: 0.08,
      etfPresence: { BUZZ: false, MEME: 5.63, RKNG: 5.99 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 5.46, proScore: 3.64, coverage: 0.667,
      price: 328.91, weeklyPrices: [260.22, 274.50, 280.88, 284.99, 328.91], weeklyChange: 26.4, dayChange: 15.41, sortRank: 0, periodReturns: { '1M': 27.1, 'YTD': 278.5, '6M': 310.1, '1Y': 1412.2 },
      priceHistory: { '1D': [284.99, 303.53, 303.66, 309.75, 310.73, 311.19, 312.5, 312.36, 310.6, 311.97, 310.6, 310.16, 310.11, 311.46, 311.58, 311.8, 309.27, 309.86, 309.92, 317.68, 321.56, 321.36, 326.42, 328.91], '1W': [260.22, 274.5, 280.88, 284.99, 328.91], '1M': [258.71, 261.34, 282.31, 307.88, 302.49, 293.8, 290.01, 285, 273.51, 302.85, 287.32, 291.37, 263.61, 253.57, 259.61, 248.88, 260.22, 274.5, 280.88, 284.99, 328.91], 'YTD': [86.89, 121.84, 133.46, 145.63, 156.51, 147.35, 155.54, 157.27, 174.77, 164.78, 154, 160.05, 145.88, 119.51, 135.91, 219.03, 218.27, 234.68, 288.64, 261.03, 275.95, 307.88, 285, 263.61, 248.88, 328.91], '6M': [80.21, 90.18, 103.87, 136.87, 151.75, 152.31, 168.89, 148.7, 157.27, 174.77, 164.78, 159.21, 156.58, 145.88, 135.49, 146.78, 213.84, 229.75, 287.97, 285.47, 289.76, 282.31, 290.01, 291.37, 248.88, 328.91], '1Y': [21.75, 22.18, 24.36, 25.96, 25.36, 34.78, 36.72, 36.8, 45.28, 48.54, 52.94, 53.44, 67.02, 86.27, 73.6, 86.97, 86.87, 111.5, 110.38, 132.16, 135.21, 111.89, 89.99, 98.93, 111.79, 89.58, 88.82, 88.41, 103.05, 139.77, 150.56, 165.39, 147.35, 155.54, 159, 168.57, 164.78, 159.21, 156.58, 150.22, 132.45, 160.13, 210.06, 237.57, 283.36, 258.64, 289.76, 282.31, 290.01, 291.37, 248.88, 328.91] },
      velocityScore: { '1D': 8, '1W': 14.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$94B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.69, RKNG: 4.24 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 2, avgWeight: 5.02, proScore: 3.34, coverage: 0.667,
      price: 1133.99, weeklyPrices: [981.61, 1087.99, 1020.76, 1043.19, 1133.99], weeklyChange: 15.52, dayChange: 8.7, sortRank: 0, periodReturns: { '1M': 66.4, 'YTD': 297.3, '6M': 356.2, '1Y': 817.5 },
      priceHistory: { '1D': [1043.19, 1099, 1106.11, 1118.26, 1121.66, 1124.56, 1128.4, 1126.12, 1122.69, 1126.87, 1127.72, 1125.45, 1127.32, 1129.46, 1134.23, 1134.65, 1138.57, 1141.99, 1142.73, 1144.29, 1139.82, 1142.21, 1147.02, 1133.99], '1W': [981.61, 1087.99, 1020.76, 1043.19, 1133.99], '1M': [681.54, 698.74, 731.99, 762.1, 751, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99], 'YTD': [285.41, 327.02, 333.35, 397.58, 435.79, 379.4, 410.34, 420.95, 429, 400.77, 403.11, 461.69, 395.53, 321.8, 377.58, 465.66, 448.42, 524.56, 576.45, 746.81, 724.66, 762.1, 971, 864.01, 995.87, 1133.99], '6M': [248.55, 284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 418.69, 461.73, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 923.52, 996, 995.87, 1133.99], '1Y': [123.6, 124.76, 119.92, 118.61, 113.23, 111.25, 104.88, 118.89, 120.87, 117.68, 119.01, 131.46, 157.77, 164.62, 163.9, 190.96, 181.6, 202.38, 219.02, 223.77, 237.92, 246.83, 207.37, 240.46, 246.92, 237.5, 265.92, 294.37, 343.43, 338.13, 389.11, 435.28, 379.4, 410.34, 417.35, 415.56, 400.77, 418.69, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 517.16, 646.63, 803.63, 731.99, 923.52, 996, 995.87, 1133.99] },
      velocityScore: { '1D': 1.2, '1W': 7.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.3T', pe: 53.5, revenueGrowth: 196, eps: 21.21, grossMargin: 58, dividendYield: 0.05,
      etfPresence: { BUZZ: 4.32, MEME: false, RKNG: 5.71 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'LITE', name: 'LITE', easyScore: 2, avgWeight: 4.42, proScore: 2.95, coverage: 0.667,
      price: 850, weeklyPrices: [921.56, 957.24, 875.36, 869.98, 850.00], weeklyChange: -7.77, dayChange: -2.3, sortRank: 0, periodReturns: { '1M': -4, 'YTD': 130.6, '6M': 152.1, '1Y': 848 },
      priceHistory: { '1D': [869.98, 871, 851.95, 858.55, 873.26, 873.96, 868.95, 857.01, 859.25, 857.78, 859.32, 846.43, 844, 847.6, 843.25, 839.42, 837.37, 837.95, 834.59, 835.86, 836.34, 837.85, 848.54, 850], '1W': [921.56, 957.24, 875.36, 869.98, 850], '1M': [884.98, 890.09, 868.07, 964.5, 946.9, 902.31, 860.62, 854.96, 905, 1029.15, 938, 945.08, 863.66, 895.4, 821.76, 889.59, 921.56, 957.24, 875.36, 869.98, 850], 'YTD': [368.59, 348.26, 331.62, 354.49, 381.44, 465.54, 574.11, 594.26, 723.39, 680.8, 672, 649.56, 801.99, 654.79, 815.75, 852.79, 895.11, 859.68, 976.18, 903.8, 970.7, 964.5, 854.96, 863.66, 889.59, 850], '6M': [337.13, 390.77, 357.05, 339.87, 356.83, 370.66, 435.1, 561.13, 594.26, 723.39, 680.8, 672, 700.81, 801.99, 702.76, 896.02, 824.01, 873.6, 858.32, 944.28, 1030.37, 868.07, 860.62, 945.08, 889.59, 850], '1Y': [89.66, 94.75, 91.08, 92.24, 103.84, 107.17, 106.68, 116.27, 115.86, 119.34, 132.81, 149.4, 168.77, 164.71, 162.58, 160.6, 149.61, 164.77, 179.3, 201.56, 240.11, 232.15, 255.59, 317.93, 342.56, 334.69, 371.43, 372.61, 397.42, 361.33, 362.44, 385, 465.54, 574.11, 635.64, 677, 680.8, 672, 700.81, 777.17, 764.65, 894.13, 891.22, 846.89, 902.32, 892.58, 1030.37, 868.07, 860.62, 945.08, 889.59, 850] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$66B', pe: 149.1, revenueGrowth: 90, eps: 5.7, grossMargin: 41, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.68, RKNG: 3.17 },
      tonyNote: 'LITE appears in 2 of 3 Meme ETFs (67% coverage) with average weight 4.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 2, avgWeight: 3.83, proScore: 2.55, coverage: 0.667,
      price: 56.55, weeklyPrices: [57.85, 61.18, 56.06, 54.69, 56.55], weeklyChange: -2.25, dayChange: 3.4, sortRank: 0, periodReturns: { '1M': 14.7, 'YTD': 26, '6M': 21.8, '1Y': 40.1 },
      priceHistory: { '1D': [54.69, 54.19, 54.23, 54.49, 54.53, 55.29, 55.01, 54.75, 54.46, 54.63, 54.17, 54.25, 54.44, 54.66, 54.56, 54.88, 54.56, 54.61, 54.73, 55.08, 55.22, 55.76, 55.9, 56.55], '1W': [57.85, 61.18, 56.06, 54.69, 56.55], '1M': [49.31, 48.44, 52.47, 58.89, 63.64, 65.4, 70.14, 72.07, 69.28, 71.4, 68.23, 65.66, 56.78, 62.8, 56.69, 57.99, 57.85, 61.18, 56.06, 54.69, 56.55], 'YTD': [44.87, 50.45, 50.88, 49.33, 43.24, 35.34, 33.61, 33.34, 33.59, 37.13, 35.12, 33.31, 32.7, 26.59, 28.49, 35.76, 48.32, 43.84, 45.75, 49.24, 51.95, 58.89, 72.07, 56.78, 57.99, 56.55], '6M': [46.44, 46, 48.71, 50.95, 50.66, 45.49, 38.47, 35.19, 33.34, 33.59, 37.13, 34.27, 32.38, 32.7, 28.83, 28.99, 43.25, 47.36, 42.11, 52.57, 55.26, 52.47, 70.14, 65.66, 57.99, 56.55], '1Y': [40.36, 40.25, 45.2, 42.41, 44.43, 42.34, 38.12, 41.85, 40.23, 39.78, 42.74, 41.01, 59.11, 71.94, 64.26, 78.99, 70.65, 62.94, 60.3, 62.38, 59.27, 47.18, 41.71, 47.12, 54.36, 46.07, 48.48, 45.25, 50.76, 48.94, 48.33, 45.8, 35.34, 33.61, 33.43, 40.88, 37.13, 34.27, 32.38, 31.96, 27.79, 28.08, 44.68, 43.63, 45.12, 47.68, 55.26, 52.47, 70.14, 65.66, 57.99, 56.55] },
      velocityScore: { '1D': 12.3, '1W': 10.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$21B', pe: 145, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: 1.78, MEME: 5.88, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'RGTI', name: 'Rigetti Computing', easyScore: 2, avgWeight: 3.06, proScore: 2.04, coverage: 0.667,
      price: 21.36, weeklyPrices: [20.98, 22.70, 20.64, 20.25, 21.36], weeklyChange: 1.81, dayChange: 5.51, sortRank: 0, periodReturns: { '1M': 28.5, 'YTD': -3.6, '6M': -6.4, '1Y': 93.1 },
      priceHistory: { '1D': [20.25, 19.91, 20.19, 20.35, 20.35, 20.68, 20.67, 20.58, 20.47, 20.5, 20.33, 20.43, 20.49, 20.67, 20.56, 20.68, 20.54, 20.58, 20.68, 20.81, 20.83, 20.95, 20.99, 21.36], '1W': [20.98, 22.7, 20.64, 20.25, 21.36], '1M': [16.62, 15.96, 16.88, 22.04, 26.42, 24.62, 27.03, 25.54, 25.63, 26.88, 24.09, 24.16, 20.68, 21.76, 19.69, 20.63, 20.98, 22.7, 20.64, 20.25, 21.36], 'YTD': [22.15, 25.25, 25.72, 24.96, 19.85, 17.19, 16.43, 16.18, 17.63, 17.76, 16.99, 16.22, 15.6, 12.9, 13.84, 16.87, 19.64, 16.91, 17.7, 18.94, 17.85, 22.04, 25.54, 20.68, 20.63, 21.36], '6M': [22.82, 22.38, 25.01, 25.53, 24.99, 22.31, 18.21, 16.97, 16.18, 17.63, 17.76, 16.94, 15.67, 15.6, 14.04, 14.53, 19.11, 18.38, 16.08, 20.09, 18.42, 16.88, 27.03, 24.16, 20.63, 21.36], '1Y': [11.06, 11.07, 13.75, 12.77, 16.08, 15.57, 14.12, 15.44, 16.65, 14.82, 16.23, 15.15, 19.21, 28.37, 29.65, 41.71, 43.92, 46.38, 38.84, 44.27, 33.77, 25.48, 23.59, 23.45, 28.26, 23.53, 23.76, 22.27, 25.38, 24.47, 23.67, 22.01, 17.19, 16.43, 16.6, 18.64, 17.76, 16.94, 15.67, 15.14, 13.5, 14.31, 19.45, 16.86, 17.45, 18.34, 18.42, 16.88, 27.03, 24.16, 20.63, 21.36] },
      velocityScore: { '1D': -5.6, '1W': -5.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 199, eps: -0.89, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.25, RKNG: 2.88 },
      tonyNote: 'Rigetti Computing is a quantum hardware company using superconducting qubit technology. It holds a position in Meme ETFs alongside IonQ and D-Wave as part of the quantum computing basket. Revenue is minimal, the technology is earlier-stage than IonQ, and the ETF allocation is speculative. The weight score is low; this is a high-risk, long-duration positioning.',
    },
    {
      ticker: 'GOOGL', name: 'GOOGL', easyScore: 2, avgWeight: 2.15, proScore: 1.43, coverage: 0.667,
      price: 368.03, weeklyPrices: [359.68, 369.35, 373.25, 363.79, 368.03], weeklyChange: 2.32, dayChange: 1.17, sortRank: 0, periodReturns: { '1M': -7.3, 'YTD': 17.6, '6M': 21.7, '1Y': 120.9 },
      priceHistory: { '1D': [363.79, 359.41, 362.07, 362.68, 363.13, 364.04, 363.53, 364, 365.22, 365.5, 365.45, 366.45, 366.71, 366.47, 367.85, 367.64, 368.33, 367.84, 367.51, 368.47, 367.22, 367.62, 369.28, 368.03], '1W': [359.68, 369.35, 373.25, 363.79, 368.03], '1M': [396.94, 387.66, 388.91, 387.66, 382.97, 388.83, 390.13, 380.34, 376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 364.26, 357.77, 359.68, 369.35, 373.25, 363.79, 368.03], 'YTD': [313, 325.44, 335.84, 330.54, 338.25, 333.04, 310.96, 303.33, 312.9, 303.13, 307.04, 310.92, 290.44, 273.5, 305.46, 332.91, 337.42, 350.34, 383.25, 400.8, 396.78, 387.66, 380.34, 368.53, 357.77, 368.03], '6M': [302.46, 313.51, 316.54, 331.86, 322, 334.55, 339.71, 318.58, 303.33, 312.9, 303.13, 308.7, 307.69, 290.44, 287.56, 317.32, 337.12, 339.32, 349.94, 398.04, 402.62, 388.91, 390.13, 372.19, 357.77, 368.03], '1Y': [166.64, 178.53, 176.79, 181.56, 190.1, 192.58, 189.13, 201.42, 203.9, 206.09, 212.91, 234.04, 251.61, 252.53, 244.05, 250.43, 236.57, 253.3, 259.92, 281.19, 278.83, 276.41, 299.66, 314.89, 313.72, 308.22, 307.16, 313.56, 314.34, 335.97, 328.38, 336.01, 333.04, 310.96, 302.85, 307.38, 303.13, 308.7, 307.69, 290.93, 297.39, 318.49, 336.02, 338.89, 384.8, 397.99, 402.62, 388.91, 390.13, 372.19, 357.77, 368.03] },
      velocityScore: { '1D': 0.7, '1W': -5.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.5T', pe: 28.1, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { BUZZ: 1.54, MEME: false, RKNG: 2.76 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'RDW', name: 'Redwire', easyScore: 1, avgWeight: 6.82, proScore: 2.27, coverage: 0.333,
      price: 14.35, weeklyPrices: [15.12, 14.83, 13.50, 14.36, 14.35], weeklyChange: -5.09, dayChange: -0.07, sortRank: 0, periodReturns: { '1M': 2.8, 'YTD': 88.8, '6M': 104.4, '1Y': -9.5 },
      priceHistory: { '1D': [14.36, 13.41, 13.56, 13.6, 13.72, 13.88, 13.79, 13.85, 13.68, 13.69, 13.63, 13.68, 13.77, 13.74, 13.7, 13.86, 13.77, 13.73, 13.64, 13.69, 13.65, 13.88, 14.06, 14.35], '1W': [15.12, 14.83, 13.5, 14.36, 14.35], '1M': [13.96, 13.91, 14.77, 15.35, 17.49, 24, 25.9, 24.57, 20.68, 20.58, 18.62, 21.43, 18.45, 18.57, 15.75, 17.09, 15.12, 14.83, 13.5, 14.36, 14.35], 'YTD': [7.6, 10.28, 11.02, 11.98, 12.81, 10.03, 9.01, 8.4, 8.62, 9.28, 9.23, 10.13, 9.05, 7.71, 9.65, 9.81, 10.21, 9.33, 8.64, 11.07, 14.06, 15.35, 24.57, 18.45, 17.09, 14.35], '6M': [7.02, 7.15, 10.26, 10.66, 10.66, 14.2, 11.26, 9.38, 8.4, 8.62, 9.28, 9.46, 9.55, 9.05, 8.5, 9.61, 9.91, 11.93, 8.6, 9.64, 11.46, 14.77, 25.9, 21.43, 17.09, 14.35], '1Y': [15.86, 16.12, 15.48, 17.73, 17.37, 15.47, 13.87, 8.99, 8.94, 9.1, 8.91, 8.39, 9.06, 8.11, 8.93, 11.22, 8.74, 7.97, 8, 7.87, 6.56, 5.41, 5.3, 5.12, 6.82, 6.89, 8, 7, 10.64, 10.14, 10.2, 13.29, 10.03, 9.01, 8.6, 9.55, 9.28, 9.46, 9.55, 9.16, 9.08, 9.22, 11.22, 10.04, 9.19, 9.2, 11.46, 14.77, 25.9, 21.43, 17.09, 14.35] },
      velocityScore: { '1D': 22, '1W': 8.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3B', pe: null, revenueGrowth: 58, eps: -2.59, grossMargin: 13, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.82, RKNG: false },
      tonyNote: 'Redwire Corp is a space infrastructure company — solar arrays, structures, and manufacturing in orbit. It appears in Meme and speculative ETFs as a high-risk space economy play. Revenue is growing from a small base but the business is pre-profitability; the ETF weight is minimal and reflects thematic positioning rather than fundamental conviction.',
    },
    {
      ticker: 'QBTS', name: 'D-Wave Quantum', easyScore: 1, avgWeight: 5.7, proScore: 1.9, coverage: 0.333,
      price: 24.69, weeklyPrices: [23.37, 26.26, 23.94, 22.92, 24.69], weeklyChange: 5.65, dayChange: 7.72, sortRank: 0, periodReturns: { '1M': 29.5, 'YTD': -5.6, '6M': -0.8, '1Y': 57.8 },
      priceHistory: { '1D': [22.92, 23.11, 23.28, 23.47, 23.45, 23.93, 23.98, 23.87, 23.86, 23.8, 23.59, 23.77, 23.83, 23.89, 23.84, 24.01, 23.92, 23.94, 24, 24.13, 24.19, 24.31, 24.39, 24.69], '1W': [23.37, 26.26, 23.94, 22.92, 24.69], '1M': [19.06, 18.19, 19.3, 25.74, 29.4, 27.48, 29.49, 30.14, 29.18, 29.91, 27.55, 27.64, 23.85, 25.83, 23.52, 23.82, 23.37, 26.26, 23.94, 22.92, 24.69], 'YTD': [26.15, 29.28, 30.15, 27.43, 23.22, 20.11, 19.64, 19.07, 19.65, 18.91, 18.76, 17.47, 15.93, 12.98, 13.74, 16.97, 21.66, 18.8, 20.92, 22.57, 20.35, 25.74, 30.14, 23.85, 23.82, 24.69], '6M': [24.89, 25.29, 30.64, 28.8, 27.04, 24.69, 21.4, 20.44, 19.07, 19.65, 18.91, 18.91, 16.49, 15.93, 14.43, 14.57, 20.81, 21.24, 18.27, 23.83, 21.44, 19.3, 29.49, 27.64, 23.82, 24.69], '1Y': [15.65, 14.02, 16.76, 15.83, 18.39, 18.35, 16.38, 16.9, 17.01, 15.54, 15.62, 15.42, 18.32, 25.67, 25.31, 35.02, 33.02, 38.33, 32.65, 37.06, 29.5, 23.61, 20.41, 21.42, 28.44, 23.74, 26.82, 26.15, 31.27, 28.82, 26.04, 24.97, 20.11, 19.64, 19.38, 20.14, 18.91, 18.91, 16.49, 16.19, 13.7, 13.87, 21.52, 19.31, 20.28, 21.99, 21.44, 19.3, 29.49, 27.64, 23.82, 24.69] },
      velocityScore: { '1D': 8.6, '1W': 11.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: -81, eps: -1.14, grossMargin: 66, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.7, RKNG: false },
      tonyNote: 'D-Wave Quantum is a quantum computing company — the only publicly traded business built around quantum annealing hardware. Revenue is minimal and profitability is many years away, but it holds a position in Meme ETFs as the purest-play quantum computing stock available to retail investors. The ETF weight is small and the position is purely thematic.',
    },
    {
      ticker: 'NVTS', name: 'Navitas Semiconductor', easyScore: 1, avgWeight: 5.08, proScore: 1.69, coverage: 0.333,
      price: 24.02, weeklyPrices: [23.39, 23.73, 22.09, 22.34, 24.02], weeklyChange: 2.69, dayChange: 7.52, sortRank: 0, periodReturns: { '1M': 22.1, 'YTD': 236.4, '6M': 225.9, '1Y': 242.7 },
      priceHistory: { '1D': [22.34, 23.14, 23.9, 24.12, 23.99, 24.03, 23.5, 23.53, 23.25, 23.29, 23.34, 23.37, 23.26, 23.39, 23.32, 23.42, 23.3, 23.19, 23.23, 23.22, 23.17, 23.36, 23.81, 24.02], '1W': [23.39, 23.73, 22.09, 22.34, 24.02], '1M': [19.67, 19.43, 22.99, 24.38, 29.25, 28.88, 28.51, 26.6, 24.86, 25.86, 30.84, 30.67, 25.08, 24.48, 22.85, 22.21, 23.39, 23.73, 22.09, 22.34, 24.02], 'YTD': [7.14, 10.06, 10.04, 11.29, 9.46, 8.2, 8.76, 8.09, 9.88, 9.22, 8.68, 9.82, 9.28, 7.83, 8.57, 9.87, 13.2, 18.3, 15.92, 18.2, 21.32, 24.38, 26.6, 25.08, 22.21, 24.02], '6M': [7.37, 7.4, 9.05, 10.43, 9.86, 9.56, 9.05, 8.79, 8.09, 9.88, 9.22, 10.84, 9.06, 9.28, 8.77, 9.55, 10.26, 18.47, 15.48, 16.68, 21.17, 22.99, 28.51, 30.67, 22.21, 24.02], '1Y': [7.01, 6.67, 6.15, 5.87, 8.47, 8.56, 7.96, 6.66, 6.92, 6.43, 5.86, 5.61, 6.11, 7.16, 7.19, 8.13, 8.23, 14.66, 14.07, 13.46, 7.84, 8.11, 7.56, 8.3, 9.6, 7.96, 7.81, 7.21, 10.19, 9.45, 9.76, 10.19, 8.2, 8.76, 8.08, 9.51, 9.22, 10.84, 9.06, 9.48, 8.54, 9.42, 12.37, 18.51, 16.5, 15.79, 21.17, 22.99, 28.51, 30.67, 22.21, 24.02] },
      velocityScore: { '1D': -43.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 5.08 },
      tonyNote: 'Navitas Semiconductor is a small-cap wide-bandgap power semiconductor name — gallium nitride and silicon carbide for fast charging and EV applications. The $26.60 share price and small market cap position it as a speculative holding in ETFs willing to take higher-risk bets on next-generation power conversion.',
    },
    {
      ticker: 'CRDO', name: 'CRDO', easyScore: 1, avgWeight: 4.9, proScore: 1.63, coverage: 0.333,
      price: 271.83, weeklyPrices: [250.81, 259.41, 239.18, 249.33, 271.83], weeklyChange: 8.38, dayChange: 9.02, sortRank: 0, periodReturns: { '1M': 73.9, 'YTD': 88.9, '6M': 96.2, '1Y': 217.9 },
      priceHistory: { '1D': [249.33, 258.77, 253.95, 264.16, 266.46, 265.07, 267.13, 264.23, 262.47, 265.87, 263.93, 262.25, 262.1, 261.14, 262.04, 262.99, 262.64, 262.11, 262.66, 263.55, 264.64, 265.61, 270.1, 271.83], '1W': [250.81, 259.41, 239.18, 249.33, 271.83], '1M': [156.27, 168.99, 182.98, 193.39, 218.41, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 217.5, 206.89, 222.27, 234.32, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83], 'YTD': [143.89, 141.59, 156.84, 135.1, 129.47, 96.95, 128.4, 127.91, 123.46, 102.54, 112.33, 104.06, 100.3, 87.81, 106.79, 159.52, 174.53, 180.5, 180.06, 188.51, 172.17, 193.39, 236.03, 206.89, 264.76, 271.83], '6M': [138.57, 144.83, 140.24, 156.07, 153.22, 129.57, 111.31, 134.72, 127.91, 123.46, 102.54, 115.91, 101.72, 100.3, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 189.36, 182.98, 222.35, 217.5, 264.76, 271.83], '1Y': [85.51, 93.49, 92.73, 98.7, 95.74, 107.95, 107.56, 120.41, 116.74, 114.04, 123.06, 147.53, 163.98, 164.1, 146.01, 147.42, 138.83, 143.61, 155.55, 187.62, 163.61, 145.52, 133.49, 171.13, 178.94, 142.02, 150.13, 144.7, 132.95, 161.38, 139.16, 129.66, 96.95, 128.4, 130.66, 114.48, 102.54, 115.91, 101.72, 103.91, 95.92, 107.93, 158.93, 185.54, 174.01, 188.29, 189.36, 182.98, 222.35, 217.5, 264.76, 271.83] },
      velocityScore: { '1D': -41.6, '1W': -44.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$51B', pe: 108.7, revenueGrowth: 157, eps: 2.5, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.9 },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'AXTI', name: 'AXT Inc', easyScore: 1, avgWeight: 4.44, proScore: 1.48, coverage: 0.333,
      price: 84.57, weeklyPrices: [97.18, 110.74, 93.04, 92.11, 84.57], weeklyChange: -12.98, dayChange: -8.19, sortRank: 0, periodReturns: { '1M': -20.1, 'YTD': 417.2, '6M': 503.6, '1Y': 4496.2 },
      priceHistory: { '1D': [92.11, 87.55, 88.13, 88.64, 88.85, 88.04, 85.13, 84.14, 83.77, 84.24, 83.84, 82.24, 82.57, 83.31, 82.55, 82.27, 81.39, 81.69, 81.46, 82.65, 82.22, 82.7, 83.74, 84.57], '1W': [97.18, 110.74, 93.04, 92.11, 84.57], '1M': [105.88, 112.88, 104.61, 121.02, 140.83, 122.77, 115.7, 103.16, 109.55, 110.85, 106.7, 105.99, 89.04, 90.78, 78.36, 88.34, 97.18, 110.74, 93.04, 92.11, 84.57], 'YTD': [16.35, 25.83, 22.1, 17.92, 16.38, 18.75, 26.8, 23.54, 40.97, 39.13, 44.3, 44.36, 68.44, 52.73, 45.46, 67.3, 78.76, 70.15, 106, 116.36, 123.78, 121.02, 103.16, 89.04, 88.34, 84.57], '6M': [14.01, 15.37, 16.67, 22.24, 21.41, 17.2, 19.74, 24.35, 23.54, 40.97, 39.13, 47.36, 48.76, 68.44, 56.98, 53.18, 62.93, 86.94, 71.07, 104.83, 121.94, 104.61, 115.7, 105.99, 88.34, 84.57], '1Y': [1.84, 2.03, 2.28, 2.32, 2.32, 2.44, 1.92, 2.14, 2.05, 2.82, 2.9, 3.11, 3.98, 5.14, 4.89, 5.4, 4.03, 4.51, 6.06, 7.95, 9.46, 10.44, 8.93, 10.79, 12.71, 14.83, 14.65, 14.59, 20.17, 21.51, 19.78, 16.83, 18.75, 26.8, 23.81, 37.12, 39.13, 47.36, 48.76, 67.35, 47.14, 63.12, 81.78, 75.27, 79.22, 108.42, 121.94, 104.61, 115.7, 105.99, 88.34, 84.57] },
      velocityScore: { '1D': null, '1W': 2.1, '1M': null, '6M': null }, isNew: true,
      marketCap: '$6B', pe: null, revenueGrowth: 39, eps: -0.32, grossMargin: 21, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.44, RKNG: false },
      tonyNote: 'AXT Inc is a compound semiconductor substrate manufacturer — gallium arsenide, indium phosphide, and germanium wafers used in data center optical transceivers, 5G RF chips, and solar cells. Revenue is growing with optical networking demand. Small market cap but positioned at a genuine supply-chain chokepoint for III-V semiconductor materials.',
    },
    {
      ticker: 'WULF', name: 'WULF', easyScore: 1, avgWeight: 4.37, proScore: 1.46, coverage: 0.333,
      price: 28.98, weeklyPrices: [26.06, 28.17, 28.01, 27.86, 28.98], weeklyChange: 11.2, dayChange: 4.02, sortRank: 0, periodReturns: { '1M': 37.1, 'YTD': 152.2, '6M': 145.8, '1Y': 674.9 },
      priceHistory: { '1D': [27.86, 28.4, 28.45, 28.43, 28.42, 28.83, 28.94, 28.78, 29, 29.2, 29.19, 29.66, 29.44, 29.49, 29.25, 29.24, 29.17, 29.17, 29.15, 29.07, 28.8, 28.83, 29.09, 28.98], '1W': [26.06, 28.17, 28.01, 27.86, 28.98], '1M': [21.14, 21.34, 21.63, 22.92, 22.82, 26.74, 26.4, 25.56, 25.66, 26.49, 26.16, 26.19, 24, 25.86, 25.3, 25.35, 26.06, 28.17, 28.01, 27.86, 28.98], 'YTD': [11.49, 12.84, 14.21, 12.89, 14.54, 13.88, 16.03, 15.38, 17.92, 15.37, 14.35, 16.04, 16.22, 13.7, 16.57, 20.95, 20.5, 21.43, 22.29, 23.39, 22.32, 22.92, 25.56, 24, 25.35, 28.98], '6M': [11.79, 11.75, 13.62, 13.81, 13.33, 15.31, 14.8, 16.63, 15.38, 17.92, 15.37, 15.22, 15.3, 16.22, 14.43, 18.05, 19.67, 20.55, 20.02, 25.74, 23.12, 21.63, 26.4, 26.19, 25.35, 28.98], '1Y': [3.74, 4.22, 4.8, 5.11, 4.99, 5.1, 4.76, 5.03, 8.97, 9.16, 9.45, 9.2, 10.49, 11.49, 11.6, 11.97, 13.51, 13.93, 13.71, 15.5, 13.94, 10.99, 11.29, 15.3, 14.96, 12.49, 12.52, 11.42, 13.18, 14.14, 13.12, 15.11, 13.88, 16.03, 15.47, 17.88, 15.37, 15.22, 15.3, 16.86, 14.48, 19.03, 19.31, 20.37, 21.73, 24.02, 23.12, 21.63, 26.4, 26.19, 25.35, 28.98] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$14B', pe: null, revenueGrowth: -1, eps: -2.51, grossMargin: 64, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.37 },
      tonyNote: 'WULF appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LRCX', name: 'LRCX', easyScore: 1, avgWeight: 4.04, proScore: 1.35, coverage: 0.333,
      price: 389.04, weeklyPrices: [366.81, 388.92, 369.34, 374.18, 389.04], weeklyChange: 6.06, dayChange: 3.97, sortRank: 0, periodReturns: { '1M': 40, 'YTD': 127.3, '6M': 136.2, '1Y': 329.9 },
      priceHistory: { '1D': [374.18, 396.01, 399.3, 397.05, 394.71, 397.02, 394.55, 395.86, 396.04, 396.71, 397.52, 397.18, 394.83, 396.38, 395.2, 395.99, 395.21, 392.71, 393.02, 394.14, 393.75, 392.77, 396.11, 389.04], '1W': [366.81, 388.92, 369.34, 374.18, 389.04], '1M': [277.96, 273.38, 292.09, 302.24, 305.35, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04], 'YTD': [171.18, 200.96, 208.79, 220.7, 248.17, 209.78, 235.12, 240.09, 249.48, 222.99, 215.23, 226.47, 238.84, 199.93, 224.35, 272.41, 263.16, 259.47, 258.57, 294.05, 284.72, 302.24, 318.18, 303.28, 362.52, 389.04], '6M': [164.7, 178.07, 194.76, 220.4, 222.41, 238.46, 230.1, 226.61, 240.09, 249.48, 222.99, 218.87, 224.71, 238.84, 213.66, 246.49, 265.16, 265.55, 248.75, 297.17, 295.44, 292.09, 318, 336.41, 362.52, 389.04], '1Y': [90.49, 97.2, 98.14, 99.62, 101.74, 98.62, 96.37, 101.75, 99.51, 100.08, 100.15, 105.07, 119.21, 132.2, 131.09, 149.15, 131.37, 141.51, 151.68, 157.46, 159.35, 148.26, 142.65, 154.79, 162.74, 164.3, 172.27, 175.87, 206.96, 214.38, 228.39, 239.58, 209.78, 235.12, 237.39, 239.07, 222.99, 218.87, 224.71, 233.45, 222.01, 258.76, 260.96, 258.56, 257.86, 286.52, 295.44, 292.09, 318, 336.41, 362.52, 389.04] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$487B', pe: 73.5, revenueGrowth: 24, eps: 5.29, grossMargin: 50, dividendYield: 0.27,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.04 },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
