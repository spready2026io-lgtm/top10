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
export const SPY_RET: Record<Period, number> = { '1W': 0.5, '1M': -2.6, 'YTD': 8.1, '6M': 7.2, '1Y': 19.3 };
// @@END_GENERATED:SPY_RET@@

// Top holdings per ETF (ticker + portfolio weight %), shown on ETF row hover.
export type EtfHolding = { t: string; w: number };

// @@GENERATED:ETF_TOP_HOLDINGS@@
export const ETF_TOP_HOLDINGS: Record<string, EtfHolding[]> = {
  AIS: [{ t: 'MU', w: 7.4 }, { t: 'AMD', w: 4.8 }, { t: 'MRVL', w: 3.9 }, { t: 'SIMO', w: 3.6 }, { t: 'INTC', w: 3.5 }],
  ARTY: [{ t: 'MU', w: 5.6 }, { t: 'AMD', w: 4.9 }, { t: 'NVDA', w: 4.4 }, { t: 'CRWV', w: 4.4 }, { t: 'AVGO', w: 4.3 }],
  BAI: [{ t: 'MU', w: 6.9 }, { t: 'AMD', w: 4.9 }, { t: 'LRCX', w: 4.8 }, { t: 'TSM', w: 4.4 }, { t: 'AVGO', w: 4.1 }],
  IGPT: [{ t: 'MU', w: 8.8 }, { t: 'AMD', w: 8.3 }, { t: 'META', w: 7.5 }, { t: 'GOOGL', w: 7.3 }, { t: 'NVDA', w: 7.3 }],
  IVES: [{ t: 'MU', w: 5.5 }, { t: 'TSM', w: 5.0 }, { t: 'AAPL', w: 4.9 }, { t: 'AMD', w: 4.8 }, { t: 'AMZN', w: 4.8 }],
  ALAI: [{ t: 'NVDA', w: 12.3 }, { t: 'TSM', w: 5.7 }, { t: 'AMZN', w: 5.5 }, { t: 'MSFT', w: 5.0 }, { t: 'GOOG', w: 4.7 }],
  CHAT: [{ t: 'NVDA', w: 6.3 }, { t: 'GOOGL', w: 5.0 }, { t: 'MU', w: 4.4 }, { t: 'AMD', w: 4.1 }, { t: 'AVGO', w: 4.0 }],
  AIFD: [{ t: 'MU', w: 7.4 }, { t: 'NVDA', w: 6.0 }, { t: 'MRVL', w: 5.8 }, { t: 'LITE', w: 5.6 }, { t: 'PANW', w: 5.3 }],
  SPRX: [{ t: 'ALAB', w: 9.7 }, { t: 'COHR', w: 9.2 }, { t: 'KLAC', w: 8.0 }, { t: 'ARM', w: 7.6 }, { t: 'MKSI', w: 6.6 }],
  AOTG: [{ t: 'AMD', w: 16.5 }, { t: 'MU', w: 12.4 }, { t: 'NVDA', w: 10.1 }, { t: 'TSM', w: 7.3 }, { t: 'TOST', w: 4.8 }],
  SOXX: [{ t: 'MU', w: 9.1 }, { t: 'AMD', w: 7.9 }, { t: 'NVDA', w: 7.1 }, { t: 'AVGO', w: 6.4 }, { t: 'INTC', w: 6.3 }],
  PSI: [{ t: 'AMAT', w: 6.6 }, { t: 'MU', w: 6.1 }, { t: 'KLAC', w: 6.0 }, { t: 'LRCX', w: 5.7 }, { t: 'INTC', w: 5.0 }],
  XSD: [{ t: 'MXL', w: 3.1 }, { t: 'ALGM', w: 3.0 }, { t: 'MU', w: 2.9 }, { t: 'INTC', w: 2.8 }, { t: 'ALAB', w: 2.7 }],
  DRAM: [{ t: 'SNDK', w: 4.8 }, { t: 'WDC', w: 4.0 }, { t: 'STX', w: 3.9 }, { t: 'MU', w: 1.8 }],
  PTF: [{ t: 'SNDK', w: 9.3 }, { t: 'MU', w: 5.5 }, { t: 'WDC', w: 5.1 }, { t: 'STX', w: 4.8 }, { t: 'AAPL', w: 4.2 }],
  WCLD: [{ t: 'FROG', w: 3.2 }, { t: 'DOCN', w: 3.0 }, { t: 'DDOG', w: 2.9 }, { t: 'PANW', w: 2.8 }, { t: 'CRWD', w: 2.5 }],
  IGV: [{ t: 'PANW', w: 9.5 }, { t: 'MSFT', w: 8.3 }, { t: 'PLTR', w: 7.7 }, { t: 'CRWD', w: 6.9 }, { t: 'ORCL', w: 6.5 }],
  FDTX: [{ t: 'MU', w: 9.4 }, { t: 'MRVL', w: 8.1 }, { t: 'TSM', w: 6.0 }, { t: 'NVDA', w: 4.6 }, { t: 'STX', w: 4.0 }],
  GTEK: [{ t: 'MRVL', w: 4.3 }, { t: 'DELL', w: 2.9 }, { t: 'APH', w: 2.4 }, { t: 'NET', w: 2.1 }, { t: 'EBAY', w: 1.9 }],
  ARKK: [{ t: 'TSLA', w: 9.5 }, { t: 'TEM', w: 5.6 }, { t: 'CRSP', w: 5.1 }, { t: 'AMD', w: 4.6 }, { t: 'HOOD', w: 4.6 }],
  MARS: [{ t: 'SPCX', w: 23.3 }, { t: 'RKLB', w: 9.7 }, { t: 'ASTS', w: 7.3 }, { t: 'GSAT', w: 4.9 }, { t: 'PL', w: 4.8 }],
  FRWD: [{ t: 'NVDA', w: 8.2 }, { t: 'STX', w: 7.6 }, { t: 'AMD', w: 7.4 }, { t: 'LRCX', w: 6.1 }, { t: 'TSM', w: 6.0 }],
  BCTK: [{ t: 'TSM', w: 8.7 }, { t: 'SPCX', w: 8.3 }, { t: 'LRCX', w: 8.3 }, { t: 'AVGO', w: 6.7 }, { t: 'NVDA', w: 5.8 }],
  FWD: [{ t: 'AMD', w: 2.2 }, { t: 'AMAT', w: 2.2 }, { t: 'LRCX', w: 2.0 }, { t: 'AVGO', w: 1.8 }, { t: 'SPCX', w: 1.7 }],
  CBSE: [{ t: 'IBRX', w: 3.2 }, { t: 'TXG', w: 3.2 }, { t: 'KRYS', w: 3.1 }, { t: 'SBUX', w: 3.0 }, { t: 'SCI', w: 3.0 }],
  FCUS: [{ t: 'SNDK', w: 5.8 }, { t: 'INTC', w: 5.2 }, { t: 'WDC', w: 5.1 }, { t: 'MU', w: 5.0 }, { t: 'STX', w: 4.8 }],
  WGMI: [{ t: 'CIFR', w: 18.0 }, { t: 'HUT', w: 11.0 }, { t: 'KEEL', w: 11.0 }, { t: 'IREN', w: 9.7 }, { t: 'RIOT', w: 5.1 }],
  CNEQ: [{ t: 'NVDA', w: 13.2 }, { t: 'MSFT', w: 6.1 }, { t: 'TSM', w: 5.8 }, { t: 'GOOG', w: 5.6 }, { t: 'NBIS', w: 5.0 }],
  SGRT: [{ t: 'WDC', w: 9.1 }, { t: 'LITE', w: 8.0 }, { t: 'MU', w: 7.7 }, { t: 'DELL', w: 7.0 }, { t: 'NVDA', w: 6.3 }],
  SPMO: [{ t: 'MU', w: 12.2 }, { t: 'NVDA', w: 7.5 }, { t: 'AVGO', w: 6.0 }, { t: 'JNJ', w: 4.2 }, { t: 'GOOGL', w: 4.2 }],
  XMMO: [{ t: 'CW', w: 4.0 }, { t: 'STRL', w: 3.4 }, { t: 'ATI', w: 3.3 }, { t: 'TTMI', w: 3.1 }, { t: 'WWD', w: 3.1 }],
  POW: [{ t: 'PWR', w: 5.0 }, { t: 'POWL', w: 4.8 }, { t: 'PRY', w: 4.3 }, { t: 'ETN', w: 4.0 }, { t: 'BELFB', w: 3.9 }],
  VOLT: [{ t: 'BELFB', w: 8.1 }, { t: 'POWL', w: 7.0 }, { t: 'ETN', w: 5.2 }, { t: 'PWR', w: 5.2 }, { t: 'NEE', w: 5.0 }],
  PBD: [{ t: 'ENRG', w: 1.2 }, { t: 'NFI', w: 1.1 }, { t: 'BLBD', w: 1.1 }, { t: 'RIVN', w: 1.1 }, { t: 'HUBB', w: 1.1 }],
  PBW: [{ t: 'FCEL', w: 4.6 }, { t: 'HYLN', w: 3.0 }, { t: 'NVTS', w: 2.4 }, { t: 'MYRG', w: 2.2 }, { t: 'BE', w: 2.2 }],
  IVEP: [{ t: 'BE', w: 4.6 }, { t: 'PWR', w: 4.3 }, { t: 'GEV', w: 4.2 }, { t: 'SBGSY', w: 4.0 }, { t: 'COHR', w: 4.0 }],
  AIRR: [{ t: 'STRL', w: 5.9 }, { t: 'AGX', w: 4.7 }, { t: 'FIX', w: 4.2 }, { t: 'MTZ', w: 4.1 }, { t: 'CHRW', w: 4.0 }],
  PRN: [{ t: 'TTMI', w: 6.0 }, { t: 'AGX', w: 4.9 }, { t: 'FIX', w: 4.6 }, { t: 'VICR', w: 4.3 }, { t: 'STRL', w: 4.1 }],
  RSHO: [{ t: 'TKR', w: 8.7 }, { t: 'POWL', w: 7.3 }, { t: 'CGNX', w: 7.2 }, { t: 'CAT', w: 6.9 }, { t: 'AIT', w: 6.0 }],
  IDEF: [{ t: 'RTX', w: 8.5 }, { t: 'LMT', w: 7.0 }, { t: 'BA', w: 5.1 }, { t: 'GD', w: 4.5 }, { t: 'FTNT', w: 3.4 }],
  BILT: [{ t: 'UNP', w: 5.7 }, { t: 'AEP', w: 4.6 }, { t: 'AENA', w: 4.5 }, { t: 'XEL', w: 4.2 }, { t: 'TRP', w: 3.7 }],
  BUZZ: [{ t: 'IBRX', w: 3.8 }, { t: 'MU', w: 3.5 }, { t: 'NBIS', w: 3.4 }, { t: 'SOFI', w: 3.3 }, { t: 'AMD', w: 3.3 }],
  MEME: [{ t: 'AAOI', w: 9.4 }, { t: 'NBIS', w: 5.8 }, { t: 'SNDK', w: 5.4 }, { t: 'BE', w: 5.4 }, { t: 'QBTS', w: 5.3 }],
  RKNG: [{ t: 'BE', w: 4.3 }, { t: 'WDC', w: 3.9 }, { t: 'NBIS', w: 3.8 }, { t: 'DELL', w: 3.7 }, { t: 'MU', w: 3.7 }],
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
  'AI & ML':         { '1W': -1.8, '1M': -1.5, 'YTD': 46.8, '6M': 45.1, '1Y': 78.5 },
  'Semiconductors':  { '1W': -1.1, '1M': 4.8, 'YTD': 111.2, '6M': 109.1, '1Y': 152.7 },
  'Broad Tech':      { '1W': -0.8, '1M': -3.6, 'YTD': 28.6, '6M': 26.6, '1Y': 46.2 },
  'Electrification': { '1W': -1.4, '1M': -6.2, 'YTD': 28.3, '6M': 26.7, '1Y': 51 },
  'Industrials':     { '1W': 0.3, '1M': -0.5, 'YTD': 25.6, '6M': 23.5, '1Y': 40.4 },
  'Meme':            { '1W': -3.8, '1M': -12.3, 'YTD': 21.5, '6M': 20.3, '1Y': 6.4 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, IndexChartByPeriod> = {
  'AI & ML': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 1.1, spyReturn: 0.97, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 98.37, 99.77, 97.6, 98.24], spy: [100, 99.95, 100.1, 99.37, 100.47], top10Return: -1.8, spyReturn: 0.5, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 102.25, 104.2, 103.91, 103.16, 95.67, 98.18, 95.22, 93.01, 96.98, 97.07, 102.04, 99.67, 101.05, 104.21, 105.63, 100.3, 98.64, 100.06, 97.87, 98.48], spy: [100, 100.27, 100.41, 99.7, 100.08, 97.5, 97.72, 97.43, 95.9, 97.53, 98.05, 99.78, 99.19, 97.95, 98.71, 98.4, 96.97, 96.93, 97.07, 96.37, 97.43], top10Return: -1.5, spyReturn: -2.6, xLabels: ["Jun 1", "Jun 8", "Jun 15", "Jun 22", "Jun 29"] },
    'YTD': { top10: [100, 102.26, 104.35, 105.09, 104.63, 97.14, 101.92, 104.13, 103.13, 98.84, 100.09, 99.91, 95.41, 99.79, 107.99, 117.64, 122.3, 124.41, 134.86, 135.42, 140.1, 149.56, 141.44, 145.56, 158.12, 146.78], spy: [100, 101.11, 101.51, 101.07, 101.47, 99.37, 99.9, 101.1, 100.6, 98.6, 97.12, 95.11, 92.99, 96.17, 99.64, 104.14, 104.7, 105.68, 108.17, 108.4, 109.34, 110.93, 108.16, 108.77, 109.16, 108.08], top10Return: 46.8, spyReturn: 8.1, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 102.93, 103.69, 102.46, 107.28, 98.34, 102.85, 102.04, 103.53, 99.92, 99.52, 102.13, 96.56, 97.89, 105.3, 114.19, 118.48, 121.15, 129.31, 137.5, 136.81, 147.34, 139.77, 143.86, 156.3, 145.07], spy: [100, 100.58, 100.86, 99.64, 101.1, 99.76, 100.6, 99.51, 100.21, 99.05, 96.83, 95.92, 93.78, 95.26, 98.85, 102.01, 102.99, 104.48, 106.36, 108.77, 107.98, 109.98, 107.23, 107.84, 108.22, 107.15], top10Return: 45.1, spyReturn: 7.2, xLabels: ["Dec", "Jan", "Mar", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 99.66, 101.08, 101.93, 105.22, 104.89, 106.84, 107.87, 105.83, 106.02, 111.52, 116.36, 119.04, 118.59, 122.36, 121.27, 123.6, 129.01, 130.6, 127.13, 118.15, 117.48, 121.58, 124.81, 118.25, 122.57, 121.91, 125.68, 125.32, 127.19, 129.98, 117.83, 123.89, 125.93, 125.06, 120.09, 121.38, 125.23, 117.4, 120.67, 130.81, 142.18, 148.29, 150.85, 163.6, 164.33, 168.56, 181.07, 171.72, 176.99, 192.45, 178.47], spy: [100, 100.4, 100.69, 101.78, 102.82, 101.64, 102.92, 104.12, 103.98, 103.63, 105.26, 106.82, 107.34, 107.82, 108.3, 107.18, 108.65, 110.91, 110.6, 110.29, 107.74, 108.24, 110.31, 110.55, 109.88, 111.35, 111.19, 111.61, 111.74, 111.51, 112.33, 109.67, 110.26, 111.59, 111.03, 108.83, 107.8, 106.79, 104.41, 106.15, 109.97, 114.94, 115.55, 116.64, 119.38, 119.64, 120.21, 122.44, 119.37, 120.05, 120.48, 119.29], top10Return: 78.5, spyReturn: 19.3, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Semiconductors': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 0.2, spyReturn: 0.97, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 99.37, 104.43, 98.75, 98.84], spy: [100, 99.95, 100.1, 99.37, 100.47], top10Return: -1.1, spyReturn: 0.5, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 101.26, 106.21, 107.48, 104.73, 92.43, 97.91, 96.37, 93.14, 102.14, 103.63, 109.75, 104.05, 105.16, 113.06, 116.82, 105.94, 105.3, 110.78, 104.74, 104.78], spy: [100, 100.27, 100.41, 99.7, 100.08, 97.5, 97.72, 97.43, 95.9, 97.53, 98.05, 99.78, 99.19, 97.95, 98.71, 98.4, 96.97, 96.93, 97.07, 96.37, 97.43], top10Return: 4.8, spyReturn: -2.6, xLabels: ["Jun 1", "Jun 8", "Jun 15", "Jun 22", "Jun 29"] },
    'YTD': { top10: [100, 107.01, 113.64, 117.36, 116.74, 114.98, 121.49, 123.18, 123.34, 118.4, 124.07, 132.29, 130.33, 129.69, 142.32, 152.37, 174.66, 181.49, 197.17, 186.46, 191.96, 208.16, 198.22, 222.51, 232.49, 211.25], spy: [100, 101.11, 101.51, 101.07, 101.47, 99.37, 99.9, 101.1, 100.6, 98.6, 97.12, 95.11, 92.99, 96.17, 99.64, 104.14, 104.7, 105.68, 108.17, 108.4, 109.34, 110.93, 108.16, 108.77, 109.16, 108.08], top10Return: 111.2, spyReturn: 8.1, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 107.81, 111.27, 117.98, 118.85, 113.38, 122.51, 120.93, 123.39, 120.88, 122.51, 133.17, 130.76, 127.87, 139.27, 148.03, 166.64, 178.13, 187.89, 188.91, 185.83, 206.05, 196.25, 220.31, 230.09, 209.06], spy: [100, 100.58, 100.86, 99.64, 101.1, 99.76, 100.6, 99.51, 100.21, 99.05, 96.83, 95.92, 93.78, 95.26, 98.85, 102.01, 102.99, 104.48, 106.36, 108.77, 107.98, 109.98, 107.23, 107.84, 108.22, 107.15], top10Return: 109.1, spyReturn: 7.2, xLabels: ["Dec", "Jan", "Mar", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 103.09, 103.55, 106.25, 106.83, 105.98, 108.74, 110.42, 111.24, 110.83, 113.4, 118.97, 122.09, 122.32, 126.34, 125.65, 131.56, 135.03, 137.27, 138.85, 133.09, 132.24, 143.49, 146.56, 144.26, 146.25, 143.1, 148.52, 151.12, 160.56, 160.89, 161.22, 168.13, 170.84, 169.31, 163.69, 167.32, 167.62, 156.19, 163.54, 176.59, 185.67, 209.81, 217.7, 233.13, 231.66, 243.07, 256.82, 235.7, 260.73, 273.42, 252.67], spy: [100, 100.4, 100.69, 101.78, 102.82, 101.64, 102.92, 104.12, 103.98, 103.63, 105.26, 106.82, 107.34, 107.82, 108.3, 107.18, 108.65, 110.91, 110.6, 110.29, 107.74, 108.24, 110.31, 110.55, 109.88, 111.35, 111.19, 111.61, 111.74, 111.51, 112.33, 109.67, 110.26, 111.59, 111.03, 108.83, 107.8, 106.79, 104.41, 106.15, 109.97, 114.94, 115.55, 116.64, 119.38, 119.64, 120.21, 122.44, 119.37, 120.05, 120.48, 119.29], top10Return: 152.7, spyReturn: 19.3, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Broad Tech': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 1.6, spyReturn: 0.97, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 98.41, 98.82, 98.51, 99.24], spy: [100, 99.95, 100.1, 99.37, 100.47], top10Return: -0.8, spyReturn: 0.5, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 101.11, 102.01, 100.73, 100.73, 95.58, 96.84, 94.04, 92.44, 95.53, 95.58, 99.31, 98.27, 98.3, 99.57, 99.83, 97.33, 95.78, 96.28, 95.86, 96.44], spy: [100, 100.27, 100.41, 99.7, 100.08, 97.5, 97.72, 97.43, 95.9, 97.53, 98.05, 99.78, 99.19, 97.95, 98.71, 98.4, 96.97, 96.93, 97.07, 96.37, 97.43], top10Return: -3.6, spyReturn: -2.6, xLabels: ["Jun 1", "Jun 8", "Jun 15", "Jun 22", "Jun 29"] },
    'YTD': { top10: [100, 103.16, 104.96, 104.77, 102.68, 96.13, 100.38, 102.97, 103.38, 99.9, 100.17, 99.61, 96.06, 100.2, 105.35, 113.68, 116.08, 118.36, 125.45, 124.29, 126.54, 131.57, 127.42, 129.07, 133.34, 128.6], spy: [100, 101.11, 101.51, 101.07, 101.47, 99.37, 99.9, 101.1, 100.6, 98.6, 97.12, 95.11, 92.99, 96.17, 99.64, 104.14, 104.7, 105.68, 108.17, 108.4, 109.34, 110.93, 108.16, 108.77, 109.16, 108.08], top10Return: 28.6, spyReturn: 8.1, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 102.48, 103.95, 102.16, 104.58, 97.44, 100.52, 101.23, 103.08, 101.24, 99.37, 100.02, 96.8, 97.79, 103.35, 109.89, 113.36, 114.62, 122.62, 124.61, 123.47, 129.56, 125.4, 127.04, 131.22, 126.57], spy: [100, 100.58, 100.86, 99.64, 101.1, 99.76, 100.6, 99.51, 100.21, 99.05, 96.83, 95.92, 93.78, 95.26, 98.85, 102.01, 102.99, 104.48, 106.36, 108.77, 107.98, 109.98, 107.23, 107.84, 108.22, 107.15], top10Return: 26.6, spyReturn: 7.2, xLabels: ["Dec", "Jan", "Mar", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 100.71, 100.99, 103.16, 103.56, 103.53, 102.91, 104.81, 104.83, 105.44, 108.18, 111.71, 114.98, 114.96, 118.95, 120.87, 120.1, 122.81, 123.41, 120.31, 111.64, 112.83, 114.44, 117.15, 112.82, 115.78, 114.32, 117.54, 119.97, 120.55, 121.93, 113.24, 117.39, 118.83, 120.16, 116.62, 117.66, 120.37, 116.94, 117.63, 122.24, 129.13, 132.18, 133.93, 141.27, 140.4, 142.26, 149.89, 144.37, 145.69, 150.66, 146.21], spy: [100, 100.4, 100.69, 101.78, 102.82, 101.64, 102.92, 104.12, 103.98, 103.63, 105.26, 106.82, 107.34, 107.82, 108.3, 107.18, 108.65, 110.91, 110.6, 110.29, 107.74, 108.24, 110.31, 110.55, 109.88, 111.35, 111.19, 111.61, 111.74, 111.51, 112.33, 109.67, 110.26, 111.59, 111.03, 108.83, 107.8, 106.79, 104.41, 106.15, 109.97, 114.94, 115.55, 116.64, 119.38, 119.64, 120.21, 122.44, 119.37, 120.05, 120.48, 119.29], top10Return: 46.2, spyReturn: 19.3, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Electrification': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 1.3, spyReturn: 0.97, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 99.26, 99.77, 97.04, 98.53], spy: [100, 99.95, 100.1, 99.37, 100.47], top10Return: -1.4, spyReturn: 0.5, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.66, 101.73, 100.69, 100.6, 94.43, 94.54, 93.46, 90.45, 94.13, 95.03, 97.18, 96.2, 96.18, 98.37, 99.46, 95.09, 94.47, 95.03, 92.38, 93.77], spy: [100, 100.27, 100.41, 99.7, 100.08, 97.5, 97.72, 97.43, 95.9, 97.53, 98.05, 99.78, 99.19, 97.95, 98.71, 98.4, 96.97, 96.93, 97.07, 96.37, 97.43], top10Return: -6.2, spyReturn: -2.6, xLabels: ["Jun 1", "Jun 8", "Jun 15", "Jun 22", "Jun 29"] },
    'YTD': { top10: [100, 103.61, 108.42, 111.14, 110.01, 109.91, 114.31, 116.39, 116.87, 110.79, 112.12, 111.52, 111.46, 112.87, 120.04, 124.81, 129.44, 133.61, 136.8, 132.79, 134.5, 137.47, 129.95, 130.88, 135.52, 128.35], spy: [100, 101.11, 101.51, 101.07, 101.47, 99.37, 99.9, 101.1, 100.6, 98.6, 97.12, 95.11, 92.99, 96.17, 99.64, 104.14, 104.7, 105.68, 108.17, 108.4, 109.34, 110.93, 108.16, 108.77, 109.16, 108.08], top10Return: 28.3, spyReturn: 8.1, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 103.65, 105.94, 108.49, 111.03, 110.6, 114.66, 114.31, 116.76, 111.07, 110.87, 113.16, 110.59, 111.56, 117.66, 121.28, 126.01, 131.24, 133.1, 134.12, 130.99, 135.62, 128.23, 129.15, 133.72, 126.67], spy: [100, 100.58, 100.86, 99.64, 101.1, 99.76, 100.6, 99.51, 100.21, 99.05, 96.83, 95.92, 93.78, 95.26, 98.85, 102.01, 102.99, 104.48, 106.36, 108.77, 107.98, 109.98, 107.23, 107.84, 108.22, 107.15], top10Return: 26.7, spyReturn: 7.2, xLabels: ["Dec", "Jan", "Mar", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.75, 104.48, 108.57, 106.98, 106.23, 107.33, 109.76, 110.27, 109.2, 110.13, 112.63, 115.66, 116.3, 122.22, 126.03, 126.61, 127.34, 127.85, 128.81, 122.22, 121.43, 125.88, 127.57, 125.81, 128.02, 124.68, 127.26, 132.09, 135.49, 135.89, 132.42, 133.68, 136.17, 137.09, 133.59, 136.44, 137.12, 136.59, 139.6, 145.3, 151.23, 151.85, 155.09, 160.3, 158.65, 159.15, 161.99, 155.13, 155.84, 157.73, 151.03], spy: [100, 100.4, 100.69, 101.78, 102.82, 101.64, 102.92, 104.12, 103.98, 103.63, 105.26, 106.82, 107.34, 107.82, 108.3, 107.18, 108.65, 110.91, 110.6, 110.29, 107.74, 108.24, 110.31, 110.55, 109.88, 111.35, 111.19, 111.61, 111.74, 111.51, 112.33, 109.67, 110.26, 111.59, 111.03, 108.83, 107.8, 106.79, 104.41, 106.15, 109.97, 114.94, 115.55, 116.64, 119.38, 119.64, 120.21, 122.44, 119.37, 120.05, 120.48, 119.29], top10Return: 51, spyReturn: 19.3, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Industrials': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 1, spyReturn: 0.97, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 99.42, 100.42, 100.04, 100.3], spy: [100, 99.95, 100.1, 99.37, 100.47], top10Return: 0.3, spyReturn: 0.5, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.73, 98.9, 98.52, 99.02, 97.64, 97.85, 97.12, 95.43, 98.58, 97.79, 99.66, 99.89, 99.4, 99.78, 100.56, 99.18, 98.59, 99.62, 99.24, 99.47], spy: [100, 100.27, 100.41, 99.7, 100.08, 97.5, 97.72, 97.43, 95.9, 97.53, 98.05, 99.78, 99.19, 97.95, 98.71, 98.4, 96.97, 96.93, 97.07, 96.37, 97.43], top10Return: -0.5, spyReturn: -2.6, xLabels: ["Jun 1", "Jun 8", "Jun 15", "Jun 22", "Jun 29"] },
    'YTD': { top10: [100, 105.14, 110.48, 110.36, 110.1, 111.22, 116.08, 120, 118.69, 112.71, 110.82, 110.24, 109.48, 112.82, 119.01, 120.87, 120.59, 122.65, 123.94, 122.95, 121.72, 125.04, 123.08, 124.53, 127.13, 125.56], spy: [100, 101.11, 101.51, 101.07, 101.47, 99.37, 99.9, 101.1, 100.6, 98.6, 97.12, 95.11, 92.99, 96.17, 99.64, 104.14, 104.7, 105.68, 108.17, 108.4, 109.34, 110.93, 108.16, 108.77, 109.16, 108.08], top10Return: 25.6, spyReturn: 8.1, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 103.8, 106.93, 109.09, 109.52, 109.36, 114.74, 117.08, 117.76, 113.81, 110.57, 110.49, 109.35, 110.78, 116.83, 116.84, 118.52, 119.19, 122.17, 122.89, 118.97, 123.23, 121.15, 122.58, 125.08, 123.56], spy: [100, 100.58, 100.86, 99.64, 101.1, 99.76, 100.6, 99.51, 100.21, 99.05, 96.83, 95.92, 93.78, 95.26, 98.85, 102.01, 102.99, 104.48, 106.36, 108.77, 107.98, 109.98, 107.23, 107.84, 108.22, 107.15], top10Return: 23.5, spyReturn: 7.2, xLabels: ["Dec", "Jan", "Mar", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 101.13, 101.77, 102.56, 104.53, 104.42, 103.82, 105.27, 105.4, 105.4, 105.8, 108.31, 110.44, 110.99, 112.37, 111.49, 112.22, 114.38, 113.5, 112.55, 107.02, 107.57, 108.96, 110.77, 111.62, 114.17, 112.64, 117.18, 122.22, 124.95, 125.31, 125.12, 130.06, 133.9, 131.86, 126.45, 123.55, 124.74, 123.23, 126.13, 132.41, 133.59, 134.4, 136.71, 138.5, 137.16, 135.27, 139.29, 137.35, 139.26, 142.3, 140.38], spy: [100, 100.4, 100.69, 101.78, 102.82, 101.64, 102.92, 104.12, 103.98, 103.63, 105.26, 106.82, 107.34, 107.82, 108.3, 107.18, 108.65, 110.91, 110.6, 110.29, 107.74, 108.24, 110.31, 110.55, 109.88, 111.35, 111.19, 111.61, 111.74, 111.51, 112.33, 109.67, 110.26, 111.59, 111.03, 108.83, 107.8, 106.79, 104.41, 106.15, 109.97, 114.94, 115.55, 116.64, 119.38, 119.64, 120.21, 122.44, 119.37, 120.05, 120.48, 119.29], top10Return: 40.4, spyReturn: 19.3, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Meme': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 1.9, spyReturn: 0.97, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 96.64, 96.11, 94.11, 96.17], spy: [100, 99.95, 100.1, 99.37, 100.47], top10Return: -3.8, spyReturn: 0.5, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 100.21, 102.66, 99.09, 99.62, 89.47, 91.76, 88.52, 86.08, 91.63, 90.49, 95.53, 91.81, 92.38, 95.65, 95.53, 91.11, 88.06, 87.62, 85.82, 87.68], spy: [100, 100.27, 100.41, 99.7, 100.08, 97.5, 97.72, 97.43, 95.9, 97.53, 98.05, 99.78, 99.19, 97.95, 98.71, 98.4, 96.97, 96.93, 97.07, 96.37, 97.43], top10Return: -12.3, spyReturn: -2.6, xLabels: ["Jun 1", "Jun 8", "Jun 15", "Jun 22", "Jun 29"] },
    'YTD': { top10: [100, 108.03, 105.55, 106.35, 99.1, 90.9, 92.33, 92.18, 92.59, 90.59, 93.4, 90.91, 89.09, 94.5, 102.68, 115.35, 112.39, 115.39, 125.35, 124.23, 135.41, 141.61, 125.13, 128.47, 131.39, 121.52], spy: [100, 101.11, 101.51, 101.07, 101.47, 99.37, 99.9, 101.1, 100.6, 98.6, 97.12, 95.11, 92.99, 96.17, 99.64, 104.14, 104.7, 105.68, 108.17, 108.4, 109.34, 110.93, 108.16, 108.77, 109.16, 108.08], top10Return: 21.5, spyReturn: 8.1, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 107.38, 105.2, 105.31, 104.61, 94.95, 94.64, 93.02, 94.09, 92.88, 92.1, 92.93, 90.12, 91.41, 99.84, 113.05, 111.72, 111.96, 120.85, 126.34, 131.62, 140.15, 123.85, 127.19, 130.06, 120.31], spy: [100, 100.58, 100.86, 99.64, 101.1, 99.76, 100.6, 99.51, 100.21, 99.05, 96.83, 95.92, 93.78, 95.26, 98.85, 102.01, 102.99, 104.48, 106.36, 108.77, 107.98, 109.98, 107.23, 107.84, 108.22, 107.15], top10Return: 20.3, spyReturn: 7.2, xLabels: ["Dec", "Jan", "Mar", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.85, 100.55, 95.58, 95.13, 91.22, 88.92, 87.26, 83.69, 82.09, 84.62, 87.99, 89.95, 88.33, 86.05, 90.94, 88.84, 93.44, 93.68, 91.49, 88.28, 85.1, 84.62, 86.52, 85.33, 86.71, 87.24, 91.18, 91.34, 90, 91.67, 86.76, 88.48, 88.4, 90.59, 92.01, 95.6, 100.25, 94.35, 94.23, 100.63, 107.08, 109.89, 108.11, 111.11, 114.72, 116.85, 115.78, 114.06, 111.34, 110.51, 106.38], spy: [100, 100.4, 100.69, 101.78, 102.82, 101.64, 102.92, 104.12, 103.98, 103.63, 105.26, 106.82, 107.34, 107.82, 108.3, 107.18, 108.65, 110.91, 110.6, 110.29, 107.74, 108.24, 110.31, 110.55, 109.88, 111.35, 111.19, 111.61, 111.74, 111.51, 112.33, 109.67, 110.26, 111.59, 111.03, 108.83, 107.8, 106.79, 104.41, 106.15, 109.97, 114.94, 115.55, 116.64, 119.38, 119.64, 120.21, 122.44, 119.37, 120.05, 120.48, 119.29], top10Return: 6.4, spyReturn: 19.3, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
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
export const SCAN_TIMESTAMP    = '2026-06-29T13:37:20.820Z';
export const SCAN_TIMESTAMP_NY = 'June 29, 2026 at 9:37 AM ET';
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
export const HOLDINGS_COUNT = 1296;
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
  { ticker: 'MU', name: `Micron Technology Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 14.09, bestProScore: 6.00, avgProScore: 4.70, price: 1114.98, weeklyChange: 6.01 },
  { ticker: 'NVDA', name: `NVIDIA Corp`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 12.61, bestProScore: 6.08, avgProScore: 4.20, price: 194.56, weeklyChange: -2.74 },
  { ticker: 'AMD', name: `Advanced Micro Devices Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 10.63, bestProScore: 5.02, avgProScore: 3.54, price: 531.78, weeklyChange: 2.30 },
  { ticker: 'AVGO', name: `Broadcom Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 6.45, bestProScore: 2.81, avgProScore: 2.15, price: 374.33, weeklyChange: -1.53 },
  { ticker: 'INTC', name: `INTEL CORPORATION`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.80, bestProScore: 3.52, avgProScore: 2.40, price: 125.73, weeklyChange: -4.95 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 4.70, bestProScore: 2.74, avgProScore: 2.35, price: 284.68, weeklyChange: -2.34 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.38, bestProScore: 2.51, avgProScore: 2.19, price: 271.51, weeklyChange: -2.70 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.21, bestProScore: 2.56, avgProScore: 2.10, price: 442.47, weeklyChange: 1.39 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 3.97, bestProScore: 2.58, avgProScore: 1.98, price: 389.58, weeklyChange: 4.91 },
  { ticker: 'WDC', name: `Western Digital Corp`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 3.58, bestProScore: 2.06, avgProScore: 1.79, price: 599.01, weeklyChange: -10.69 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': -1.4, '1M': 3.7, 'YTD': 110.4, '6M': 108.5, '1Y': 182.6 },
  ARTY: { '1W': -1.8, '1M': -2.1, 'YTD': 51.7, '6M': 50.4, '1Y': 78.3 },
  BAI:  { '1W': -1.1, '1M': -0.9, 'YTD': 48.3, '6M': 46.3, '1Y': 71.2 },
  IGPT: { '1W': -1.1, '1M': -0.3, 'YTD': 67.2, '6M': 65.7, '1Y': 102.3 },
  IVES: { '1W': 0.6, '1M': -8.1, 'YTD': 16.6, '6M': 15.1, '1Y': 36 },
  ALAI: { '1W': 0.3, '1M': -1.8, 'YTD': 24.2, '6M': 22.3, '1Y': 45.4 },
  CHAT: { '1W': -2.5, '1M': -4.3, 'YTD': 59.4, '6M': 58.7, '1Y': 92.7 },
  AIFD: { '1W': -6.3, '1M': -0.9, 'YTD': 37.6, '6M': 35.4, '1Y': 68.1 },
  SPRX: { '1W': -1.7, '1M': -1.7, 'YTD': 40.1, '6M': 38.2, '1Y': 82.2 },
  AOTG: { '1W': -2.8, '1M': 1.2, 'YTD': 12.2, '6M': 10.2, '1Y': 26 },
  // Semiconductors
  SOXX: { '1W': -1.1, '1M': 4.8, 'YTD': 98.1, '6M': 95.4, '1Y': 149.9 },
  PSI:  { '1W': 0, '1M': 9.7, 'YTD': 116.1, '6M': 112.4, '1Y': 184.3 },
  XSD:  { '1W': -4, '1M': -5.5, 'YTD': 80.1, '6M': 77.8, '1Y': 125.8 },
  DRAM: { '1W': 0.5, '1M': 10.1, 'YTD': 150.7, '6M': 150.7, '1Y': 150.7 },
  // Broad Tech
  PTF:  { '1W': -1.8, '1M': -1.4, 'YTD': 66.4, '6M': 64.9, '1Y': 86.4 },
  WCLD: { '1W': 6.9, '1M': -5, 'YTD': -10.6, '6M': -11.9, '1Y': -13.4 },
  IGV:  { '1W': 3, '1M': -11.5, 'YTD': -14.9, '6M': -16.2, '1Y': -17.9 },
  FDTX: { '1W': -0.5, '1M': 2, 'YTD': 35.2, '6M': 34, '1Y': 41.2 },
  GTEK: { '1W': -4.7, '1M': 1.3, 'YTD': 49.2, '6M': 48.5, '1Y': 65.3 },
  ARKK: { '1W': 3.5, '1M': -3.2, 'YTD': 3.1, '6M': 0.9, '1Y': 12.9 },
  MARS: { '1W': -0.6, '1M': -30.3, 'YTD': 20.9, '6M': 20.9, '1Y': 20.9 },
  FRWD: { '1W': -0.5, '1M': -0.7, 'YTD': 29.9, '6M': 29.9, '1Y': 29.9 },
  BCTK: { '1W': 1.3, '1M': -0.7, 'YTD': 22.3, '6M': 21, '1Y': 24.5 },
  FWD:  { '1W': 0, '1M': -0.5, 'YTD': 35.6, '6M': 33.6, '1Y': 57.8 },
  CBSE: { '1W': -1.8, '1M': 0.8, 'YTD': 29.5, '6M': 27.1, '1Y': 39 },
  FCUS: { '1W': -8, '1M': -5.3, 'YTD': 36.9, '6M': 28.4, '1Y': 66.7 },
  WGMI: { '1W': -6.2, '1M': -2.2, 'YTD': 74, '6M': 69.1, '1Y': 192.8 },
  CNEQ: { '1W': -0.5, '1M': -3.3, 'YTD': 15.9, '6M': 14.4, '1Y': 34.1 },
  SGRT: { '1W': -2.2, '1M': -2.7, 'YTD': 41.8, '6M': 39.5, '1Y': 77.4 },
  SPMO: { '1W': 0.4, '1M': 2.9, 'YTD': 29.9, '6M': 28.5, '1Y': 37.8 },
  XMMO: { '1W': -1.3, '1M': -0.8, 'YTD': 20.9, '6M': 19.1, '1Y': 30.2 },
  // Electrification
  POW:  { '1W': -1.2, '1M': -4.1, 'YTD': 52.4, '6M': 50.6, '1Y': 47.9 },
  VOLT: { '1W': 0.2, '1M': 4, 'YTD': 40.5, '6M': 38.5, '1Y': 59.6 },
  PBD:  { '1W': -1.9, '1M': -13.6, 'YTD': 19.2, '6M': 17.8, '1Y': 52.2 },
  PBW:  { '1W': -3.1, '1M': -16.8, 'YTD': 23.5, '6M': 20.3, '1Y': 89.3 },
  IVEP: { '1W': -1.2, '1M': -0.7, 'YTD': 6.1, '6M': 6.1, '1Y': 6.1 },
  // Industrials
  AIRR: { '1W': 1, '1M': 1.3, 'YTD': 33.1, '6M': 30.1, '1Y': 60.8 },
  PRN:  { '1W': -1, '1M': 2.1, 'YTD': 43.6, '6M': 40.6, '1Y': 59.6 },
  RSHO: { '1W': 0, '1M': 5.8, 'YTD': 39.4, '6M': 36.1, '1Y': 57.4 },
  IDEF: { '1W': -0.7, '1M': -8.4, 'YTD': 1.6, '6M': 0.8, '1Y': 10.8 },
  BILT: { '1W': 2.2, '1M': -3.4, 'YTD': 10.1, '6M': 10.1, '1Y': 13.4 },
  // Meme
  BUZZ: { '1W': -0.5, '1M': -10.4, 'YTD': 11.8, '6M': 10.3, '1Y': 20 },
  MEME: { '1W': -7.5, '1M': -20.9, 'YTD': 45.5, '6M': 43.4, '1Y': -8.1 },
  RKNG: { '1W': -3.5, '1M': -5.7, 'YTD': 7.2, '6M': 7.2, '1Y': 7.2 },
};
// @@END_GENERATED:ETF_RETURNS@@

// @@GENERATED:ETF_DAY_CHANGE@@
// Today's % move per ETF ticker (1D, vs prior close). Refreshed by the 3×/day
// price jobs. Powers the 1D ranking in the theme-ETF side panel.
export const ETF_DAY_CHANGE: Record<string, number> = {
  AIS:  -0.19,
  ARTY: 0.95,
  BAI:  0.57,
  IGPT: 0.77,
  IVES: 1.96,
  ALAI: 2.65,
  CHAT: 0.53,
  SPRX: 1.8,
  SOXX: 1.12,
  PSI:  1.42,
  XSD:  1.45,
  DRAM: -3.13,
  PTF:  0.83,
  WCLD: 1.95,
  IGV:  2.17,
  FDTX: 1.05,
  ARKK: 1.7,
  MARS: 6.95,
  BCTK: 1.62,
  FWD:  0.46,
  WGMI: 1.29,
  CNEQ: 1.85,
  SGRT: -0.63,
  SPMO: 0.61,
  XMMO: 0.36,
  VOLT: 0.76,
  PBD:  1.67,
  PBW:  2.31,
  IVEP: 0.28,
  AIRR: 0.91,
  PRN:  0.78,
  IDEF: 1.28,
  BUZZ: 1.88,
  MEME: 2.5,
  RKNG: 1.44,
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
  'AI & ML': { etfs: ['AIS', 'SPRX', 'AIFD'], series: { '1W': [100, 97.61, 99.35, 97.05, 96.87], '1M': [100, 100.85, 104.65, 104.99, 105.23, 98.07, 100.69, 96.61, 95.05, 99.52, 99.68, 104.58, 101.57, 103.9, 106.7, 109.29, 103.63, 101.13, 102.94, 100.58, 100.36], 'YTD': [100, 102.79, 106.24, 107.11, 107.12, 100.45, 106.95, 108.91, 108.99, 103.04, 105.51, 106.41, 101.36, 106.02, 116.35, 125.43, 130.71, 132.39, 142.94, 147.51, 153.99, 162.23, 156.74, 162.83, 177.67, 162.68], '6M': [100, 103.73, 105.09, 104.93, 110.04, 101.54, 107.7, 106.96, 109.46, 104.62, 104.73, 108.35, 103.03, 102.59, 112.88, 121.13, 127.76, 129.09, 136.66, 149.89, 148.79, 159.36, 154.79, 160.82, 175.51, 160.69], '1Y': [100, 99.92, 100.83, 101.82, 106.15, 106.57, 109.36, 109.68, 107.75, 107.8, 113.98, 120.38, 124.45, 123.28, 128.62, 128, 129.8, 136.31, 138.68, 135.7, 123.74, 123.43, 128.68, 132.89, 124.14, 130.76, 130.18, 135.71, 136.13, 139.54, 142.66, 129.85, 138.54, 140.33, 140.82, 133.95, 135.84, 141.9, 132.61, 136.37, 150.04, 161.18, 168.96, 171.2, 185.03, 190.78, 196.43, 209.07, 202.6, 210.95, 230.54, 210.96] }, returns: { '1W': -3.1, '1M': 0.4, 'YTD': 62.7, '6M': 60.7, '1Y': 111 } },
  'Semiconductors': { etfs: ['DRAM', 'PSI', 'XSD'], series: { '1W': [100, 99.26, 104.7, 99.08, 98.83], '1M': [100, 101.51, 106.17, 107.24, 104.34, 91.63, 97.07, 95.57, 92.47, 101.81, 103.25, 109.53, 104.1, 105.08, 113.3, 117.39, 105.9, 105.17, 111.09, 105.09, 104.77], 'YTD': [100, 107.31, 114.2, 118.33, 117.33, 116.69, 123.08, 124.46, 125.46, 122.06, 128.75, 139.58, 137.97, 135.34, 146.97, 157.14, 181.78, 190.43, 205.3, 192.33, 196.47, 214.55, 204.55, 230.68, 237.48, 215.64], '6M': [100, 107.9, 111.98, 119.3, 119.12, 115.1, 124.03, 122.39, 125.57, 124.3, 127.3, 140.42, 138.44, 133.53, 144.36, 153.05, 174.04, 187.12, 196.77, 194.02, 190.49, 212.6, 202.73, 228.64, 235.27, 213.62], '1Y': [100, 103.47, 103.67, 107.65, 108.05, 107.96, 111.14, 112.45, 113.62, 113.86, 116.42, 122.52, 125.16, 125.23, 129.09, 128.56, 134.5, 137.58, 139.96, 142.96, 137.86, 136.85, 149.03, 151.82, 150.98, 152.42, 148.22, 152.66, 155.15, 165.39, 164.09, 168.77, 175.09, 177.6, 176.54, 173.07, 176.99, 175.99, 162.33, 170.63, 181.47, 189.51, 215.28, 225.23, 238.19, 237.86, 250.82, 262.96, 238.89, 264.38, 273.09, 253.58] }, returns: { '1W': -1.2, '1M': 4.8, 'YTD': 115.6, '6M': 113.6, '1Y': 153.6 } },
  'Broad Tech': { etfs: ['WGMI', 'PTF', 'SGRT'], series: { '1W': [100, 97.22, 98.86, 96.35, 96.59], '1M': [100, 101.96, 104.63, 104.34, 102.71, 93.01, 96.32, 93.68, 90.52, 96.6, 98.79, 103.14, 101.27, 101.41, 104.9, 106.12, 101.4, 98.54, 100.14, 97.65, 97.91], 'YTD': [100, 107.37, 113.44, 114.56, 110.78, 101.6, 110.12, 112.37, 113.64, 103.39, 107.2, 106.9, 103.3, 108, 120.94, 131.34, 135.39, 135.28, 149.88, 148.72, 154.31, 164.13, 152.49, 162.08, 174.21, 160.74], '6M': [100, 107.89, 112.16, 112.28, 116.96, 104.5, 110.82, 110.46, 114.04, 107.79, 105.15, 109.79, 103.42, 104.04, 117.84, 125.47, 132.14, 131.4, 143.54, 152.89, 150.3, 161.16, 149.75, 159.16, 171.06, 157.84], '1Y': [100, 104.11, 104.02, 109.81, 107.76, 108.67, 107.77, 114.34, 116.41, 119.72, 124.71, 136.5, 143.51, 142.73, 158.34, 171.1, 164.67, 169.34, 172.04, 158.94, 135.89, 142.91, 143.08, 152.2, 136.64, 144.13, 139.12, 147.19, 157.53, 156.03, 162.37, 141.01, 149.13, 148.41, 149.83, 139.11, 142.05, 148.78, 147.48, 149.1, 163.31, 175.27, 182.2, 184.65, 202.52, 200.19, 210.65, 225.95, 206.76, 221.01, 233.54, 218.86] }, returns: { '1W': -3.4, '1M': -2.1, 'YTD': 60.7, '6M': 57.8, '1Y': 118.9 } },
  'Electrification': { etfs: ['PBW', 'POW', 'VOLT'], series: { '1W': [100, 99.17, 99.9, 97.01, 98.61], '1M': [100, 99.59, 101.73, 100.61, 100.49, 93.67, 94.37, 93.25, 90.18, 94.33, 95.12, 97.69, 96.63, 96.74, 99, 100.12, 95.6, 94.93, 95.72, 92.88, 94.38], 'YTD': [100, 104.13, 109.93, 112.37, 112.23, 110.83, 117.42, 119.25, 120.01, 111.47, 114.68, 113.09, 113.84, 116.18, 124.88, 130.69, 137.83, 142.71, 146.47, 142.92, 144.82, 147.45, 137.89, 140.02, 147.35, 138.79], '6M': [100, 104.4, 106.52, 109.55, 112.94, 111.64, 117.69, 116.62, 119.8, 112.29, 112.76, 115.38, 112.46, 114.39, 121.75, 125.72, 133.4, 139.44, 141.7, 144.61, 140.3, 144.92, 135.54, 137.66, 144.88, 136.48], '1Y': [100, 103.07, 105.24, 109.87, 107.4, 106.89, 107.56, 110.15, 111.52, 109.89, 110.1, 112.63, 117.22, 118.75, 126.1, 130.39, 130.78, 131.52, 131.36, 133.08, 124.86, 124.65, 131.03, 133.28, 130.18, 134.63, 130.21, 132.39, 138.25, 141.92, 141.71, 138, 139.38, 142.67, 144.73, 140.51, 144.61, 146.5, 146.25, 150.63, 158.96, 165.24, 164.28, 167.26, 173.71, 172.56, 171.47, 175.46, 167.78, 169.62, 173.8, 165.62] }, returns: { '1W': -1.4, '1M': -5.6, 'YTD': 38.8, '6M': 36.5, '1Y': 65.6 } },
  'Industrials': { etfs: ['PRN', 'RSHO', 'BILT'], series: { '1W': [100, 99.2, 100.39, 100.59, 100.37], '1M': [100, 99.13, 99.32, 99.33, 99.03, 98.57, 98.86, 97.84, 96.8, 99.18, 98.09, 100.65, 100.87, 100.29, 101.01, 102.31, 101.16, 100.31, 101.53, 101.74, 101.49], 'YTD': [100, 102.86, 107.52, 107.45, 108.72, 110.83, 116.72, 119.74, 118.94, 111.8, 110.43, 110.67, 110.45, 113.1, 120.63, 121.85, 123.05, 125.18, 126.66, 127.15, 124.96, 127.62, 127.2, 128.72, 132.4, 131.03], '6M': [100, 102.03, 104.02, 105.66, 107.07, 108.04, 114.25, 116.74, 118.13, 114.09, 110.43, 109.88, 110.56, 110.96, 117.63, 117.52, 119.87, 120.65, 125.45, 126.07, 122.09, 125.85, 125.21, 126.71, 130.27, 128.94], '1Y': [100, 101.16, 101.86, 102.72, 104.59, 103.32, 102.86, 103.95, 104.13, 104.12, 104.85, 106.14, 108.08, 107.89, 109.04, 108.22, 109.69, 111.35, 110.22, 110.36, 105.08, 106.09, 107.12, 108.77, 109.48, 111.45, 110.32, 113.13, 117.04, 119.67, 121.26, 122.75, 128.41, 130.81, 129.06, 123.44, 119.83, 121.26, 121.67, 124.02, 131.15, 130.96, 134.1, 136.4, 138.55, 138.73, 136.09, 138.92, 138.85, 140.99, 145.21, 143.46] }, returns: { '1W': 0.4, '1M': 1.5, 'YTD': 31, '6M': 28.9, '1Y': 43.5 } },
  'Meme': { etfs: ['MEME', 'BUZZ', 'RKNG'], series: { '1W': [100, 96.64, 96.11, 94.11, 96.17], '1M': [100, 100.21, 102.66, 99.09, 99.62, 89.47, 91.76, 88.52, 86.08, 91.63, 90.49, 95.53, 91.81, 92.38, 95.65, 95.53, 91.11, 88.06, 87.62, 85.82, 87.68], 'YTD': [100, 108.03, 105.55, 106.35, 99.1, 90.9, 92.33, 92.18, 92.59, 90.59, 93.4, 90.91, 89.09, 94.5, 102.68, 115.35, 112.39, 115.39, 125.35, 124.23, 135.41, 141.61, 125.13, 128.47, 131.39, 121.52], '6M': [100, 107.38, 105.2, 105.31, 104.61, 94.95, 94.64, 93.02, 94.09, 92.88, 92.1, 92.93, 90.12, 91.41, 99.84, 113.05, 111.72, 111.96, 120.85, 126.34, 131.62, 140.15, 123.85, 127.19, 130.06, 120.31], '1Y': [100, 102.85, 100.55, 95.58, 95.13, 91.22, 88.92, 87.26, 83.69, 82.09, 84.62, 87.99, 89.95, 88.33, 86.05, 90.94, 88.84, 93.44, 93.68, 91.49, 88.28, 85.1, 84.62, 86.52, 85.33, 86.71, 87.24, 91.18, 91.34, 90, 91.67, 86.76, 88.48, 88.4, 90.59, 92.01, 95.6, 100.25, 94.35, 94.23, 100.63, 107.08, 109.89, 108.11, 111.11, 114.72, 116.85, 115.78, 114.06, 111.34, 110.51, 106.38] }, returns: { '1W': -3.8, '1M': -12.3, 'YTD': 21.5, '6M': 20.3, '1Y': 6.4 } },
};
// @@END_GENERATED:THEME_REPRESENTATIVES@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 10, avgWeight: 6.08, proScore: 6.08, coverage: 1,
      price: 194.56, weeklyPrices: [200.04, 199.00, 195.74, 192.53, 194.56], weeklyChange: -2.74, dayChange: 1.05, sortRank: 0, periodReturns: { '1M': -7.9, 'YTD': 4.3, '6M': 3.4, '1Y': 23.1 },
      priceHistory: { '1D': [192.53, 194.52, 194.56], '1W': [200.04, 199, 195.74, 192.53, 194.56], '1M': [211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.56], 'YTD': [186.5, 185.04, 187.05, 187.67, 191.13, 171.88, 186.94, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 225.32, 215.33, 211.14, 205.1, 205.19, 208.65, 194.56], '6M': [188.22, 187.24, 185.81, 183.32, 191.52, 174.19, 190.05, 187.9, 184.89, 183.34, 183.14, 178.56, 171.24, 175.75, 183.91, 198.35, 199.64, 199.57, 211.5, 235.74, 219.51, 211.14, 205.1, 205.19, 208.65, 194.56], '1Y': [157.99, 160, 170.7, 167.03, 175.51, 178.26, 182.06, 182.01, 179.81, 170.78, 170.76, 174.88, 178.43, 186.58, 185.04, 180.03, 182.64, 191.49, 206.88, 199.05, 186.6, 182.55, 181.46, 184.97, 177.72, 189.21, 187.54, 189.11, 183.14, 184.84, 192.51, 171.88, 186.94, 189.82, 177.19, 177.82, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 225.32, 219.51, 211.14, 205.1, 205.19, 208.65, 194.56] },
      velocityScore: { '1D': -1, '1W': 1.2, '1M': 5, '6M': null }, isNew: false,
      marketCap: '$4.7T', pe: 29.8, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.52,
      etfPresence: { AIS: 2.31, ARTY: 4.42, BAI: 3.96, IGPT: 7.27, IVES: 4.77, ALAI: 12.34, CHAT: 6.34, AIFD: 6.05, SPRX: 3.28, AOTG: 10.11 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 6.66, proScore: 6, coverage: 0.9,
      price: 1114.98, weeklyPrices: [1051.77, 1048.51, 1213.56, 1132.33, 1114.98], weeklyChange: 6.01, dayChange: -1.53, sortRank: 0, periodReturns: { '1M': 14.8, 'YTD': 290.7, '6M': 278.8, '1Y': 804.6 },
      priceHistory: { '1D': [1132.33, 1116.98, 1114.98], '1W': [1051.77, 1048.51, 1213.56, 1132.33, 1114.98], '1M': [971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1114.98], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 382.89, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 971, 864.01, 981.61, 1211.38, 1114.98], '6M': [294.37, 343.43, 338.13, 389.11, 435.28, 379.4, 410.34, 417.35, 415.56, 397.05, 405.35, 444.27, 355.46, 367.85, 421.51, 457.23, 481.72, 517.16, 646.63, 776.01, 762.1, 971, 864.01, 981.61, 1211.38, 1114.98], '1Y': [123.25, 124.42, 120.11, 109.22, 111.96, 109.06, 123.72, 123.55, 116.42, 118.48, 135.24, 158.82, 166.41, 167.32, 185.69, 187.06, 206.77, 220.1, 234.7, 253.3, 241.95, 223.93, 239.49, 252.42, 232.51, 276.27, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 370.3, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 762.1, 971, 864.01, 981.61, 1211.38, 1114.98] },
      velocityScore: { '1D': 2.7, '1W': -1.2, '1M': 3.4, '6M': null }, isNew: false,
      marketCap: '$1.3T', pe: 25.2, revenueGrowth: 346, eps: 44.27, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { AIS: 7.42, ARTY: 5.56, BAI: 6.93, IGPT: 8.79, IVES: 5.51, ALAI: 1.53, CHAT: 4.42, AIFD: 7.39, SPRX: false, AOTG: 12.41 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 9, avgWeight: 5.58, proScore: 5.02, coverage: 0.9,
      price: 531.78, weeklyPrices: [519.85, 519.74, 532.57, 521.58, 531.78], weeklyChange: 2.3, dayChange: 1.96, sortRank: 0, periodReturns: { '1M': 3, 'YTD': 148.3, '6M': 146.6, '1Y': 274.8 },
      priceHistory: { '1D': [521.58, 531.26, 531.78], '1W': [519.85, 519.74, 532.57, 521.58, 531.78], '1M': [516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 531.78], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 192.5, 205.94, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 467.51, 516.1, 466.38, 511.57, 551.63, 531.78], '6M': [215.61, 214.35, 220.97, 249.8, 252.74, 200.19, 213.58, 203.37, 203.68, 199.45, 197.74, 205.27, 203.77, 210.21, 236.64, 278.26, 305.33, 354.49, 408.46, 449.7, 449.59, 516.1, 466.38, 511.57, 551.63, 531.78], '1Y': [141.9, 137.82, 155.61, 154.72, 177.44, 174.31, 172.28, 176.14, 163.36, 162.32, 155.82, 160.46, 160.9, 161.79, 211.51, 218.09, 240.56, 259.67, 259.65, 243.98, 240.52, 215.05, 215.24, 221.62, 209.17, 214.9, 215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 200.21, 192.43, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 449.59, 516.1, 466.38, 511.57, 551.63, 531.78] },
      velocityScore: { '1D': 1.4, '1W': 4.8, '1M': -6.9, '6M': null }, isNew: false,
      marketCap: '$867B', pe: 175.5, revenueGrowth: 38, eps: 3.03, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.75, ARTY: 4.94, BAI: 4.93, IGPT: 8.26, IVES: 4.82, ALAI: 1.27, CHAT: 4.12, AIFD: false, SPRX: 0.56, AOTG: 16.54 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 8, avgWeight: 3.51, proScore: 2.81, coverage: 0.8,
      price: 374.33, weeklyPrices: [380.15, 382.07, 378.91, 365.02, 374.33], weeklyChange: -1.53, dayChange: 2.55, sortRank: 0, periodReturns: { '1M': -16.2, 'YTD': 8.2, '6M': 7.1, '1Y': 35.8 },
      priceHistory: { '1D': [365.02, 373.95, 374.33], '1W': [380.15, 382.07, 378.91, 365.02, 374.33], '1M': [446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 374.33], 'YTD': [346.1, 332.48, 343.02, 320.05, 331.3, 310.51, 331.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 425.19, 414.14, 446.77, 385.73, 382.07, 392.13, 374.33], '6M': [349.39, 343.77, 354.61, 328.8, 333.24, 308.05, 342.76, 333.99, 321.7, 332.77, 335.97, 319.84, 309.42, 313.49, 354.91, 398.47, 419.94, 417.43, 412.56, 439.79, 414.57, 446.77, 385.73, 382.07, 392.13, 374.33], '1Y': [275.65, 271.8, 280.94, 278.59, 297.42, 292.93, 303.9, 305.76, 294.23, 298.24, 336.67, 360, 338.94, 329.91, 336.41, 344.13, 349.24, 362.05, 362.55, 358.39, 342.65, 377.96, 381.57, 406.29, 341.3, 349.32, 349.85, 343.5, 339.89, 325.49, 330.73, 310.51, 331.17, 332.65, 319.55, 330.48, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 425.19, 414.57, 446.77, 385.73, 382.07, 392.13, 374.33] },
      velocityScore: { '1D': -1.7, '1W': -2.8, '1M': -22.6, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 62.2, revenueGrowth: 48, eps: 6.02, grossMargin: 76, dividendYield: 0.71,
      etfPresence: { AIS: 0.63, ARTY: 4.32, BAI: 4.07, IGPT: false, IVES: 4.65, ALAI: 3.83, CHAT: 3.98, AIFD: 5.1, SPRX: false, AOTG: 1.48 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 7, avgWeight: 3.58, proScore: 2.51, coverage: 0.7,
      price: 271.51, weeklyPrices: [279.04, 276.70, 281.26, 266.77, 271.51], weeklyChange: -2.7, dayChange: 1.78, sortRank: 0, periodReturns: { '1M': 32.4, 'YTD': 219.5, '6M': 216.6, '1Y': 250.8 },
      priceHistory: { '1D': [266.77, 271.61, 271.51], '1W': [279.04, 276.7, 281.26, 266.77, 271.51], '1M': [205, 219.43, 290.79, 301.65, 316.43, 263.47, 288.85, 266.88, 252.59, 280.71, 279.7, 308.88, 278.67, 289.54, 310.58, 307.86, 279.04, 276.7, 281.26, 266.77, 271.51], 'YTD': [84.98, 83.45, 80.38, 80.23, 78.92, 74.21, 78.23, 79.48, 81.69, 89.57, 87.86, 87.91, 94.88, 107.11, 128.49, 139.69, 164.31, 164.95, 170.13, 176.89, 196.33, 205, 263.47, 279.7, 307.86, 271.51], '6M': [85.76, 88.23, 83.05, 82.55, 83.62, 73.73, 81.34, 79.61, 79.29, 75.68, 87.67, 89.53, 97.68, 106.71, 119.93, 133.37, 165.56, 165.15, 160.01, 182.58, 190.69, 205, 263.47, 279.7, 307.86, 271.51], '1Y': [77.4, 71.95, 72.41, 71.99, 76.34, 76.63, 77.28, 76.74, 72.95, 64.6, 66.84, 68.86, 74.62, 84.07, 86.97, 86.22, 85.84, 88.71, 90.37, 93.23, 83.45, 83.79, 92.89, 88.9, 84.07, 87.68, 86.76, 84.64, 81.21, 83.1, 81.34, 74.21, 78.23, 79.48, 81.69, 89.57, 87.67, 89.53, 97.68, 107.11, 128.49, 139.69, 164.31, 164.95, 170.13, 176.89, 190.69, 205, 263.47, 279.7, 307.86, 271.51] },
      velocityScore: { '1D': -2, '1W': 7.3, '1M': 17.3, '6M': null }, isNew: false,
      marketCap: '$238B', pe: 93.3, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.09,
      etfPresence: { AIS: 3.89, ARTY: 4.27, BAI: 1.89, IGPT: 3.45, IVES: false, ALAI: false, CHAT: 1.49, AIFD: 5.83, SPRX: 4.26, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'ANET', name: 'Arista Networks Inc', easyScore: 7, avgWeight: 2, proScore: 1.4, coverage: 0.7,
      price: 157.98, weeklyPrices: [162.20, 161.74, 165.45, 157.60, 157.98], weeklyChange: -2.6, dayChange: 0.27, sortRank: 0, periodReturns: { '1M': -0.9, 'YTD': 20.6, '6M': 17.8, '1Y': 54.4 },
      priceHistory: { '1D': [157.55, 157.92, 157.98], '1W': [162.2, 161.74, 165.45, 157.6, 157.98], '1M': [159.47, 170.68, 175.33, 174.37, 166.01, 154.27, 156.4, 152.16, 151.76, 156.4, 163.24, 169.09, 168.01, 164.93, 169.67, 174.56, 162.2, 161.74, 165.45, 157.6, 157.98], 'YTD': [131.03, 123.72, 130.59, 136.34, 141.74, 128.67, 135.12, 132.79, 133.5, 132.89, 133.57, 131.22, 120.77, 126.68, 147.35, 164.23, 176.91, 172.7, 141.77, 141.97, 154.03, 159.47, 154.27, 163.24, 174.56, 157.98], '6M': [134.15, 132.58, 129.93, 127.29, 150.15, 130.28, 140.66, 137.23, 130.25, 139.4, 134.03, 136.26, 122.55, 124.85, 146.05, 161.01, 172.55, 172.71, 141.75, 147.81, 148.59, 159.47, 154.27, 163.24, 174.56, 157.98], '1Y': [102.31, 103.39, 107.37, 109.78, 118.62, 118.12, 137.65, 138.04, 133.04, 135.87, 141.91, 142.16, 144.09, 145.71, 145.29, 138.79, 146.48, 156.81, 157.59, 137.26, 127.26, 122.17, 127.22, 130.04, 126.13, 131.32, 132.44, 130.08, 125.09, 138.41, 148.15, 128.67, 135.12, 132.79, 133.5, 132.89, 134.03, 136.26, 122.55, 126.68, 147.35, 164.23, 176.91, 172.7, 141.77, 141.97, 148.59, 159.47, 154.27, 163.24, 174.56, 157.98] },
      velocityScore: { '1D': -5.4, '1W': 2.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$199B', pe: 54.1, revenueGrowth: 35, eps: 2.92, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: 1.37, ARTY: 2.37, BAI: 1.35, IGPT: false, IVES: false, ALAI: 0.4, CHAT: 2.14, AIFD: 4.75, SPRX: 1.63, AOTG: false },
      tonyNote: 'Arista Networks Inc appears in 7 of 10 AI & ML ETFs (70% coverage) with average weight 2.0% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 4.77, proScore: 2.86, coverage: 0.6,
      price: 348.13, weeklyPrices: [346.13, 345.29, 343.71, 337.39, 348.13], weeklyChange: 0.58, dayChange: 3.18, sortRank: 0, periodReturns: { '1M': -8.5, 'YTD': 11.2, '6M': 11, '1Y': 97.5 },
      priceHistory: { '1D': [337.39, 348.39, 348.13], '1W': [346.13, 345.29, 343.71, 337.39, 348.13], '1M': [380.34, 376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68, 369.35, 373.25, 363.79, 368.03, 349.68, 346.13, 345.29, 343.71, 337.39, 348.13], 'YTD': [313, 325.44, 332.78, 327.93, 338, 331.25, 309, 314.98, 311.76, 298.52, 302.28, 301, 274.34, 295.77, 317.24, 341.68, 344.4, 385.69, 400.8, 396.78, 382.97, 380.34, 368.53, 359.68, 349.68, 348.13], '6M': [313.56, 314.34, 335.97, 328.38, 336.01, 333.04, 310.96, 302.85, 307.38, 300.88, 303.55, 307.13, 280.92, 297.39, 318.49, 336.02, 338.89, 384.8, 397.99, 401.07, 387.66, 380.34, 368.53, 359.68, 349.68, 348.13], '1Y': [176.23, 174.36, 182, 191.34, 195.75, 194.67, 201, 203.5, 208.49, 211.35, 239.63, 251.16, 251.66, 243.1, 245.76, 245.45, 256.55, 269.27, 283.72, 290.1, 285.02, 318.58, 315.81, 317.08, 306.57, 314.35, 313.85, 321.98, 335.84, 330.54, 338.25, 331.25, 309, 314.98, 311.76, 298.52, 303.55, 307.13, 280.92, 295.77, 317.24, 341.68, 344.4, 385.69, 400.8, 396.78, 387.66, 380.34, 368.53, 359.68, 349.68, 348.13] },
      velocityScore: { '1D': -1, '1W': 4.8, '1M': -26.5, '6M': null }, isNew: false,
      marketCap: '$4.2T', pe: 26.5, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.26,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.13, IGPT: 7.29, IVES: 4.59, ALAI: false, CHAT: 5.05, AIFD: 4.71, SPRX: false, AOTG: 3.87 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 6, avgWeight: 2.53, proScore: 1.52, coverage: 0.6,
      price: 599.01, weeklyPrices: [670.75, 643.83, 675.39, 586.45, 599.01], weeklyChange: -10.69, dayChange: 2.14, sortRank: 0, periodReturns: { '1M': 12.8, 'YTD': 247.7, '6M': 233.4, '1Y': 836.1 },
      priceHistory: { '1D': [586.45, 599.9, 599.01], '1W': [670.75, 643.83, 675.39, 586.45, 599.01], '1M': [531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 599.01], 'YTD': [172.27, 187.68, 222.1, 236.39, 250.23, 260.19, 284.1, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 294.97, 343.43, 372.52, 404, 431.52, 480, 482.02, 484.28, 531.21, 511.72, 562.93, 732.62, 599.01], '6M': [179.68, 219.38, 214, 241.9, 279.7, 269.41, 273.74, 284.67, 282.25, 259.03, 261.18, 316.93, 273.35, 297.73, 337.88, 361.69, 403.12, 434.52, 463.91, 489.15, 486.46, 531.21, 511.72, 562.93, 732.62, 599.01], '1Y': [63.99, 64.02, 67.53, 67.06, 70.61, 75.84, 74.64, 76.29, 79.22, 81.91, 94.54, 103.09, 110.25, 120.06, 119.93, 113.13, 121.53, 126.67, 158.02, 174.22, 162.45, 150.93, 159.99, 169.54, 174.58, 178.25, 176.06, 199.88, 215, 243.29, 278.41, 260.19, 284.1, 285.52, 279.7, 245.25, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 431.52, 480, 482.02, 486.46, 531.21, 511.72, 562.93, 732.62, 599.01] },
      velocityScore: { '1D': 12.6, '1W': -17.4, '1M': -26.9, '6M': null }, isNew: false,
      marketCap: '$206B', pe: 35.8, revenueGrowth: 46, eps: 16.71, grossMargin: 45, dividendYield: 0.1,
      etfPresence: { AIS: 1.32, ARTY: 2.82, BAI: 3.14, IGPT: 2.99, IVES: false, ALAI: 4.1, CHAT: false, AIFD: false, SPRX: false, AOTG: 0.81 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 5, avgWeight: 5.12, proScore: 2.56, coverage: 0.5,
      price: 442.47, weeklyPrices: [436.39, 440.83, 434.99, 432.35, 442.47], weeklyChange: 1.39, dayChange: 2.36, sortRank: 0, periodReturns: { '1M': 5.7, 'YTD': 45.6, '6M': 47, '1Y': 95.4 },
      priceHistory: { '1D': [432.26, 442.63, 442.47], '1W': [436.39, 440.83, 434.99, 432.35, 442.47], '1M': [418.45, 435.63, 446.69, 436.69, 444.92, 415.17, 426.8, 427.92, 408.75, 421.07, 423.93, 441.4, 425.83, 432.15, 462.12, 467.67, 436.39, 440.83, 434.99, 432.35, 442.47], 'YTD': [303.89, 318.01, 341.64, 334.87, 330.56, 330.73, 368.1, 370.54, 374.58, 338.89, 338.31, 329.24, 326.74, 339.04, 370.6, 370.5, 402.46, 397.67, 411.68, 404.35, 404.52, 418.45, 415.17, 423.93, 467.67, 442.47], '6M': [300.92, 327.43, 331.21, 326.12, 342.3, 325.74, 374.09, 360.39, 376.81, 353.86, 336.71, 338.79, 326.11, 341.49, 365.49, 363.35, 382.66, 396.06, 414.15, 417.72, 407.15, 418.45, 415.17, 423.93, 467.67, 442.47], '1Y': [226.49, 227.86, 236.95, 234.6, 241.33, 232.47, 242.09, 241.41, 235.59, 228.39, 250.92, 262.06, 282.71, 279.29, 294.03, 295.94, 297.7, 298.25, 304.86, 295.27, 282.01, 284.64, 292.09, 303.41, 286.87, 296.95, 299.58, 318.68, 327.11, 327.37, 339.55, 330.73, 368.1, 370.54, 374.58, 338.89, 336.71, 338.79, 326.11, 339.04, 370.6, 370.5, 402.46, 397.67, 411.68, 404.35, 407.15, 418.45, 415.17, 423.93, 467.67, 442.47] },
      velocityScore: { '1D': -11.1, '1W': -12.6, '1M': -17.4, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 38.3, revenueGrowth: 35, eps: 11.54, grossMargin: 62, dividendYield: 0.88,
      etfPresence: { AIS: 3.2, ARTY: false, BAI: 4.38, IGPT: false, IVES: 5, ALAI: 5.66, CHAT: false, AIFD: false, SPRX: false, AOTG: 7.34 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 5, avgWeight: 3.97, proScore: 1.99, coverage: 0.5,
      price: 237.31, weeklyPrices: [234.11, 234.27, 227.01, 232.69, 237.31], weeklyChange: 1.37, dayChange: 1.99, sortRank: 0, periodReturns: { '1M': -12.3, 'YTD': 2.8, '6M': 2.3, '1Y': 8.2 },
      priceHistory: { '1D': [232.69, 237.61, 237.31], '1W': [234.11, 234.27, 227.01, 232.69, 237.31], '1M': [270.64, 261.26, 256.52, 250.02, 253.79, 246.03, 245.22, 244.19, 238, 241.51, 238.55, 246.02, 246, 237.5, 244.39, 232.79, 234.11, 234.27, 227.01, 232.69, 237.31], 'YTD': [230.82, 246.29, 238.18, 239.16, 239.3, 222.69, 199.6, 210.11, 210, 213.21, 207.67, 205.37, 199.34, 209.77, 238.38, 250.56, 263.99, 268.26, 272.68, 264.14, 266.32, 270.64, 246.03, 238.55, 232.79, 237.31], '6M': [232.07, 240.93, 242.6, 231.31, 243.01, 232.99, 204.08, 204.86, 207.92, 218.94, 209.53, 208.76, 207.54, 210.57, 233.65, 249.7, 255.08, 265.06, 271.17, 267.22, 268.46, 270.64, 246.03, 238.55, 232.79, 237.31], '1Y': [219.39, 219.36, 226.35, 227.47, 231.01, 213.75, 221.3, 231.49, 227.94, 225.34, 238.24, 234.05, 220.71, 219.57, 221.78, 216.39, 216.48, 226.97, 254, 248.4, 232.87, 226.28, 234.42, 227.92, 222.56, 232.14, 232.53, 241.56, 236.65, 234.34, 241.73, 222.69, 199.6, 210.11, 210, 213.21, 209.53, 208.76, 207.54, 209.77, 238.38, 250.56, 263.99, 268.26, 272.68, 264.14, 268.46, 270.64, 246.03, 238.55, 232.79, 237.31] },
      velocityScore: { '1D': 1, '1W': 29.2, '1M': -37.4, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 32.3, revenueGrowth: 17, eps: 7.35, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 4.8, ALAI: 5.54, CHAT: 2.36, AIFD: 3.32, SPRX: false, AOTG: 3.84 },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 5, avgWeight: 3.84, proScore: 1.92, coverage: 0.5,
      price: 565.02, weeklyPrices: [562.20, 557.67, 542.87, 550.25, 565.02], weeklyChange: 0.5, dayChange: 2.68, sortRank: 0, periodReturns: { '1M': -10.7, 'YTD': -14.4, '6M': -14.2, '1Y': -23.4 },
      priceHistory: { '1D': [550.25, 565.02, 565.02], '1W': [562.2, 557.67, 542.87, 550.25, 565.02], '1M': [632.51, 600.47, 597.63, 622.98, 627.57, 593, 585.39, 584.59, 570.98, 568.43, 566.98, 593.48, 600.21, 567.58, 577.22, 563.85, 562.2, 557.67, 542.87, 550.25, 565.02], 'YTD': [660.09, 646.06, 620.8, 658.76, 716.5, 670.21, 649.81, 655.66, 648.18, 644.86, 613.71, 593.66, 525.72, 574.46, 629.86, 688.55, 675.03, 608.75, 609.63, 614.23, 610.26, 632.51, 593, 566.98, 563.85, 565.02], '6M': [658.69, 660.62, 631.09, 612.96, 668.73, 668.99, 668.69, 644.78, 657.01, 660.57, 638.18, 606.7, 547.54, 579.23, 628.39, 676.87, 659.15, 611.91, 616.81, 618.43, 607.38, 632.51, 593, 566.98, 563.85, 565.02], '1Y': [738.09, 720.67, 710.39, 704.81, 700, 763.46, 765.87, 767.37, 753.3, 735.11, 765.7, 779, 755.4, 734.38, 713.08, 708.65, 732.17, 750.82, 637.71, 631.76, 602.01, 613.05, 647.1, 656.96, 657.15, 664.94, 665.95, 648.69, 615.52, 647.63, 738.31, 670.21, 649.81, 655.66, 648.18, 644.86, 638.18, 606.7, 547.54, 574.46, 629.86, 688.55, 675.03, 608.75, 609.63, 614.23, 607.38, 632.51, 593, 566.98, 563.85, 565.02] },
      velocityScore: { '1D': 0.5, '1W': 23.9, '1M': -33.6, '6M': null }, isNew: false,
      marketCap: '$1.4T', pe: 20.5, revenueGrowth: 33, eps: 27.51, grossMargin: 82, dividendYield: 0.38,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: 7.48, IVES: 4.66, ALAI: 3.94, CHAT: 2.04, AIFD: false, SPRX: false, AOTG: 1.06 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.53, proScore: 1.77, coverage: 0.5,
      price: 377.27, weeklyPrices: [373.94, 365.46, 352.83, 372.97, 377.27], weeklyChange: 0.89, dayChange: 1.15, sortRank: 0, periodReturns: { '1M': -16.2, 'YTD': -22, '6M': -22.5, '1Y': -24.2 },
      priceHistory: { '1D': [372.97, 378.28, 377.27], '1W': [373.94, 365.46, 352.83, 372.97, 377.27], '1M': [450.24, 460.52, 441.31, 427.34, 428.05, 416.67, 411.74, 403.41, 397.36, 390.34, 390.74, 399.76, 393.83, 378.91, 379.4, 367.34, 373.94, 365.46, 352.83, 372.97, 377.27], 'YTD': [483.62, 478.11, 456.66, 465.95, 430.29, 393.67, 401.84, 397.23, 392.74, 408.96, 395.55, 381.87, 356.77, 373.46, 370.87, 422.79, 424.62, 414.44, 415.12, 421.92, 418.57, 450.24, 416.67, 390.74, 367.34, 377.27], '6M': [487.1, 478.51, 470.67, 444.11, 481.63, 414.19, 404.37, 398.46, 401.72, 410.68, 401.86, 389.02, 365.97, 369.37, 373.07, 420.26, 415.75, 407.78, 420.77, 409.43, 419.09, 450.24, 416.67, 390.74, 367.34, 377.27], '1Y': [497.41, 496.62, 505.82, 505.27, 512.57, 527.75, 521.77, 517.1, 504.26, 505.12, 498.41, 509.04, 509.23, 517.95, 523.98, 513.57, 516.79, 531.52, 517.03, 506, 507.49, 474, 490, 492.02, 476.39, 486.85, 487.48, 483.47, 459.38, 451.14, 433.5, 393.67, 401.84, 397.23, 392.74, 408.96, 401.86, 389.02, 365.97, 373.46, 370.87, 422.79, 424.62, 414.44, 415.12, 421.92, 419.09, 450.24, 416.67, 390.74, 367.34, 377.27] },
      velocityScore: { '1D': 4.7, '1W': 4.7, '1M': -34.2, '6M': null }, isNew: false,
      marketCap: '$2.8T', pe: 22.5, revenueGrowth: 18, eps: 16.78, grossMargin: 68, dividendYield: 0.98,
      etfPresence: { AIS: false, ARTY: 2.5, BAI: false, IGPT: false, IVES: 4.74, ALAI: 5.01, CHAT: 2.15, AIFD: false, SPRX: false, AOTG: 3.26 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 5, avgWeight: 3.41, proScore: 1.71, coverage: 0.5,
      price: 409.02, weeklyPrices: [397.02, 399.92, 398.00, 391.74, 409.02], weeklyChange: 3.02, dayChange: 4.41, sortRank: 0, periodReturns: { '1M': 19.3, 'YTD': 145.9, '6M': 140.5, '1Y': 352.4 },
      priceHistory: { '1D': [391.74, 407.49, 409.02], '1W': [397.02, 399.92, 398, 391.74, 409.02], '1M': [342.85, 320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 409.02], 'YTD': [166.36, 156.73, 174.45, 169.66, 150.62, 142.82, 126.58, 129.68, 118.83, 119.2, 120.31, 116.04, 112.47, 117.14, 149.05, 174.05, 212.84, 202.68, 199.79, 232.68, 306.88, 342.85, 317.06, 367.15, 439.66, 409.02], '6M': [170.1, 161.01, 180.56, 176.01, 167.9, 144.67, 143.71, 132.62, 124.67, 120, 119.9, 126.16, 113.61, 106.33, 129.46, 170.81, 197.54, 194.74, 195.65, 228.64, 297.84, 342.85, 317.06, 367.15, 439.66, 409.02], '1Y': [90.42, 92.3, 92.36, 116.91, 118.41, 135.54, 179.43, 186.43, 174.15, 174.24, 214.49, 238.79, 230.11, 195.8, 212.1, 161.55, 156.31, 170.28, 191.56, 173.74, 141.39, 147.75, 142.94, 167.08, 144.94, 168.83, 170.84, 165.77, 172.14, 176.35, 160.46, 142.82, 126.58, 129.68, 118.83, 119.2, 119.9, 126.16, 113.61, 117.14, 149.05, 174.05, 212.84, 202.68, 199.79, 232.68, 297.84, 342.85, 317.06, 367.15, 439.66, 409.02] },
      velocityScore: { '1D': 1.2, '1W': 6.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$70B', pe: 274.5, revenueGrowth: 93, eps: 1.49, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 2.02, ARTY: 1.35, BAI: false, IGPT: false, IVES: false, ALAI: 1.17, CHAT: 2.83, AIFD: false, SPRX: 9.69, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 5, avgWeight: 2.73, proScore: 1.36, coverage: 0.5,
      price: 803.25, weeklyPrices: [827.92, 842.53, 861.97, 816.98, 803.25], weeklyChange: -2.98, dayChange: -1.68, sortRank: 0, periodReturns: { '1M': -6, 'YTD': 117.9, '6M': 115.6, '1Y': 745 },
      priceHistory: { '1D': [816.98, 801.59, 803.25], '1W': [827.92, 842.53, 861.97, 816.98, 803.25], '1M': [854.96, 905, 1029.15, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93, 827.92, 842.53, 861.97, 816.98, 803.25], 'YTD': [368.59, 348.26, 343.27, 339.19, 391.84, 504.42, 583.46, 667.77, 700.91, 558.44, 622.5, 706.35, 702.73, 826.88, 897.3, 894.07, 881.64, 949.93, 903.8, 970.7, 946.9, 854.96, 863.66, 921.56, 893.93, 803.25], '6M': [372.61, 397.42, 361.33, 362.44, 385, 465.54, 574.11, 635.64, 677, 650.82, 616.09, 772.13, 688.8, 764.65, 894.13, 891.22, 846.89, 902.32, 892.58, 1001.81, 964.5, 854.96, 863.66, 921.56, 893.93, 803.25], '1Y': [95.06, 91.31, 98.14, 99.63, 109.48, 108.15, 115.03, 118.98, 123.42, 132.55, 151.73, 170.9, 163.99, 162.71, 157.15, 156.78, 161, 193.8, 199.58, 259.89, 242.07, 299.36, 302.81, 360.33, 316.15, 387.41, 371.18, 392.88, 331.62, 354.49, 381.44, 504.42, 583.46, 667.77, 700.91, 558.44, 616.09, 772.13, 688.8, 826.88, 897.3, 894.07, 881.64, 949.93, 903.8, 970.7, 964.5, 854.96, 863.66, 921.56, 893.93, 803.25] },
      velocityScore: { '1D': -1.4, '1W': 7.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$62B', pe: 140.4, revenueGrowth: 90, eps: 5.72, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.54, IGPT: false, IVES: false, ALAI: 0.65, CHAT: 1.38, AIFD: 5.61, SPRX: 3.47, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 5 of 10 AI & ML ETFs (50% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 5, avgWeight: 2.6, proScore: 1.3, coverage: 0.5,
      price: 2033, weeklyPrices: [1963.60, 1914.46, 2335.00, 2090.71, 2033.00], weeklyChange: 3.53, dayChange: -2.76, sortRank: 0, periodReturns: { '1M': 19.9, 'YTD': 756.4, '6M': 732.3, '1Y': 4382.9 },
      priceHistory: { '1D': [2090.71, 2040.26, 2033], '1W': [1963.6, 1914.46, 2335, 2090.71, 2033], '1M': [1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2033], 'YTD': [237.38, 334.54, 409.24, 473.83, 576.25, 576.2, 630.29, 649.97, 635.36, 527.33, 661.62, 709.71, 615.83, 701.59, 851.77, 920.99, 989.9, 1187, 1562.34, 1407.61, 1478.69, 1694.98, 1559.32, 1980.1, 2273.73, 2033], '6M': [244.25, 349.63, 389.81, 501.29, 527.63, 584.55, 599.34, 621.09, 651.9, 565.59, 618.82, 772.09, 603.17, 692.73, 851.57, 919.47, 932.43, 1096.51, 1339.96, 1382.72, 1542.24, 1694.98, 1559.32, 1980.1, 2273.73, 2033], '1Y': [45.35, 46.17, 42.72, 41.36, 42.93, 41.93, 43.37, 45.52, 46.78, 51.07, 70.51, 91.55, 106.4, 112.2, 120.95, 127.29, 148.04, 176.49, 207.01, 267.95, 265.88, 226.96, 205.35, 219.46, 209.31, 244.9, 240.22, 353.56, 387.81, 503.44, 539.3, 576.2, 630.29, 649.97, 635.36, 527.33, 618.82, 772.09, 603.17, 701.59, 851.77, 920.99, 989.9, 1187, 1562.34, 1407.61, 1542.24, 1694.98, 1559.32, 1980.1, 2273.73, 2033] },
      velocityScore: { '1D': 3.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$301B', pe: 69.5, revenueGrowth: 251, eps: 29.27, grossMargin: 56, dividendYield: null,
      etfPresence: { AIS: 2.36, ARTY: false, BAI: 3.24, IGPT: 4.58, IVES: false, ALAI: 0.61, CHAT: false, AIFD: false, SPRX: false, AOTG: 2.21 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'CRDO', name: 'Credo Technology Group Holding Ltd', easyScore: 5, avgWeight: 1.9, proScore: 0.95, coverage: 0.5,
      price: 243, weeklyPrices: [272.01, 268.99, 268.03, 238.00, 243.00], weeklyChange: -10.66, dayChange: 2.1, sortRank: 0, periodReturns: { '1M': 3, 'YTD': 68.9, '6M': 67.9, '1Y': 162.4 },
      priceHistory: { '1D': [238, 242.42, 243], '1W': [272.01, 268.99, 268.03, 238, 243], '1M': [236.03, 226.1, 229, 214.6, 217.5, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 243], 'YTD': [143.89, 141.59, 149.12, 133.16, 125.28, 98.06, 121.78, 124.06, 112.27, 109.83, 117.69, 103.4, 95.24, 101.45, 119.59, 160.69, 195.04, 184.38, 188.51, 172.17, 218.41, 236.03, 206.89, 250.81, 302.52, 243], '6M': [144.7, 132.95, 161.38, 139.16, 129.66, 96.95, 128.4, 130.66, 114.48, 114.74, 111.57, 107.09, 96.44, 95.92, 107.93, 158.93, 185.54, 174.01, 188.29, 184.54, 193.39, 236.03, 206.89, 250.81, 302.52, 243], '1Y': [92.59, 93.36, 102.59, 92.93, 109.38, 110.29, 118.57, 118.74, 115.41, 124.27, 149.03, 164.42, 162.26, 145.61, 137.2, 129.75, 151.66, 154.96, 180.64, 170.16, 145.58, 150.85, 188.44, 170.29, 140.34, 147.81, 144.92, 141, 156.84, 135.1, 129.47, 98.06, 121.78, 124.06, 112.27, 109.83, 111.57, 107.09, 96.44, 101.45, 119.59, 160.69, 195.04, 184.38, 188.51, 172.17, 193.39, 236.03, 206.89, 250.81, 302.52, 243] },
      velocityScore: { '1D': -5, '1W': -2.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$45B', pe: 97.2, revenueGrowth: 157, eps: 2.5, grossMargin: 68, dividendYield: null,
      etfPresence: { AIS: 0.99, ARTY: 1.19, BAI: 1.98, IGPT: false, IVES: false, ALAI: false, CHAT: 2.12, AIFD: false, SPRX: 3.2, AOTG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 4, avgWeight: 3.2, proScore: 1.28, coverage: 0.4,
      price: 125.73, weeklyPrices: [132.28, 131.65, 132.87, 128.32, 125.73], weeklyChange: -4.95, dayChange: -2.02, sortRank: 0, periodReturns: { '1M': 9.6, 'YTD': 240.7, '6M': 242.8, '1Y': 461.3 },
      priceHistory: { '1D': [128.32, 125.87, 125.73], '1W': [132.28, 131.65, 132.87, 128.32, 125.73], '1M': [114.68, 109.33, 107.93, 112.71, 111.78, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 125.73], 'YTD': [36.9, 41.11, 48.32, 45.07, 46.47, 48.24, 46.48, 44.11, 45.61, 43.42, 45.77, 43.87, 43.13, 50.38, 62.38, 68.5, 82.54, 99.62, 124.92, 108.77, 119.84, 114.68, 99.17, 124.57, 140.94, 125.73], '6M': [36.68, 40.04, 47.29, 54.25, 48.78, 48.6, 48.29, 44.62, 45.46, 45.95, 45.25, 46.18, 44.1, 48.03, 61.72, 68.5, 66.78, 94.48, 109.62, 115.93, 118.5, 114.68, 99.17, 124.57, 140.94, 125.73], '1Y': [22.4, 23.59, 22.92, 23.24, 20.41, 20.19, 20.65, 23.66, 24.55, 24.21, 24.44, 25.27, 29.34, 33.55, 37.17, 35.63, 38.1, 39.54, 39.5, 38.45, 34.71, 35.79, 43.47, 40.5, 37.31, 36.35, 37.3, 42.63, 48.72, 54.32, 48.66, 48.24, 46.48, 44.11, 45.61, 43.42, 45.25, 46.18, 44.1, 50.38, 62.38, 68.5, 82.54, 99.62, 124.92, 108.77, 118.5, 114.68, 99.17, 124.57, 140.94, 125.73] },
      velocityScore: { '1D': 0, '1W': -15.8, '1M': -52.4, '6M': null }, isNew: false,
      marketCap: '$632B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.5, ARTY: false, BAI: 3.21, IGPT: 4.77, IVES: false, ALAI: false, CHAT: 1.32, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'ARM', name: 'ARM Holdings PLC', easyScore: 4, avgWeight: 3.04, proScore: 1.21, coverage: 0.4,
      price: 330.01, weeklyPrices: [366.39, 359.08, 347.71, 334.27, 330.01], weeklyChange: -9.93, dayChange: -1.27, sortRank: 0, periodReturns: { '1M': -6.6, 'YTD': 201.9, '6M': 198.6, '1Y': 104 },
      priceHistory: { '1D': [334.27, 331.01, 330.01], '1W': [366.39, 359.08, 347.71, 334.27, 330.01], '1M': [353.29, 408.85, 402.71, 411.83, 393.44, 342.93, 346.39, 324.86, 307.43, 342.23, 380.81, 412.55, 396.34, 418.88, 439.46, 407.72, 366.39, 359.08, 347.71, 334.27, 330.01], 'YTD': [109.31, 113.08, 105.11, 116.07, 105.36, 110.88, 122.19, 125.58, 127.45, 114.38, 115.75, 132.35, 144.13, 149.11, 148.93, 166.73, 234.81, 211.18, 213.27, 209.16, 306.51, 353.29, 342.93, 380.81, 407.72, 330.01], '6M': [110.51, 115.53, 107.84, 113.92, 109.96, 104.9, 125.28, 126.93, 129.26, 120.62, 115.12, 129.82, 154.8, 155.07, 149.79, 162.33, 204.61, 210.32, 213.31, 228.5, 298.23, 353.29, 342.93, 380.81, 407.72, 330.01], '1Y': [161.74, 147.79, 147.11, 156.5, 163.47, 137.23, 141.05, 141.06, 137.78, 132.34, 140.8, 153.85, 140.99, 141.49, 159.35, 168.16, 171.5, 178.62, 168.68, 154.84, 140.26, 134.71, 136.48, 141.93, 121.1, 112.02, 110.86, 115.68, 104.99, 119.2, 108.43, 110.88, 122.19, 125.58, 127.45, 114.38, 115.12, 129.82, 154.8, 149.11, 148.93, 166.73, 234.81, 211.18, 213.27, 209.16, 298.23, 353.29, 342.93, 380.81, 407.72, 330.01] },
      velocityScore: { '1D': -3.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$352B', pe: 392.9, revenueGrowth: 20, eps: 0.84, grossMargin: 98, dividendYield: null,
      etfPresence: { AIS: 1.84, ARTY: false, BAI: false, IGPT: false, IVES: false, ALAI: 0.17, CHAT: 2.58, AIFD: false, SPRX: 7.56, AOTG: false },
      tonyNote: 'Arm Holdings is held across Broad Tech and AI ETFs as the CPU architecture licensor embedded in every mobile device and increasingly in AI inference chips and data center CPUs. Revenue grew and the royalty model is high-margin; the weight score reflects consistent institutional positioning as the AI chip design ecosystem expands on Arm cores.',
    },
    {
      ticker: 'NBIS', name: 'NEBIUS GROUP NV', easyScore: 4, avgWeight: 2.92, proScore: 1.17, coverage: 0.4,
      price: 260.23, weeklyPrices: [275.25, 259.66, 256.63, 240.30, 260.23], weeklyChange: -5.46, dayChange: 8.29, sortRank: 0, periodReturns: { '1M': 12.6, 'YTD': 210.9, '6M': 202.4, '1Y': 370.3 },
      priceHistory: { '1D': [240.3, 260.55, 260.23], '1W': [275.25, 259.66, 256.63, 240.3, 260.23], '1M': [231.09, 264.51, 260.58, 251.68, 259.67, 227.81, 218, 220.12, 211.69, 222.24, 232.36, 260.07, 265.1, 280.91, 286.69, 283.61, 275.25, 259.66, 256.63, 240.3, 260.23], 'YTD': [83.71, 97.3, 103.89, 94.5, 85.19, 73.87, 89.73, 97.92, 91.19, 89.33, 112.95, 117.62, 100.82, 108.82, 144.97, 157.14, 147.16, 154.49, 177.05, 219.94, 214.77, 231.09, 227.81, 232.36, 283.61, 260.23], '6M': [86.04, 100.24, 105.43, 98.87, 100.43, 82.39, 88.61, 107.61, 104.88, 95.65, 108.04, 121.52, 105.97, 101.95, 136.33, 165.34, 157.08, 138.23, 184.77, 221.15, 219.93, 231.09, 227.81, 232.36, 283.61, 260.23], '1Y': [55.33, 47.1, 53.53, 51.01, 50.4, 55.17, 70.24, 72.54, 70.02, 65.72, 95.72, 89.43, 107.8, 112.27, 117.7, 128.15, 109, 125.43, 120.47, 109.95, 85.98, 91.9, 96.45, 96.41, 80.95, 90.03, 85.17, 96.21, 101.98, 96.85, 94.91, 73.87, 89.73, 97.92, 91.19, 89.33, 108.04, 121.52, 105.97, 108.82, 144.97, 157.14, 147.16, 154.49, 177.05, 219.94, 219.93, 231.09, 227.81, 232.36, 283.61, 260.23] },
      velocityScore: { '1D': -5.6, '1W': null, '1M': -46.6, '6M': null }, isNew: false,
      marketCap: '$66B', pe: 100.1, revenueGrowth: 684, eps: 2.6, grossMargin: 72, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 2.53, ALAI: 3.92, CHAT: 3.49, AIFD: 1.76, SPRX: false, AOTG: false },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 4, avgWeight: 2.87, proScore: 1.15, coverage: 0.4,
      price: 308.32, weeklyPrices: [318.32, 316.43, 325.57, 303.95, 308.32], weeklyChange: -3.14, dayChange: 1.6, sortRank: 0, periodReturns: { '1M': -2.3, 'YTD': 90.3, '6M': 86.2, '1Y': 140.1 },
      priceHistory: { '1D': [303.47, 307.34, 308.32], '1W': [318.32, 316.43, 325.57, 303.95, 308.32], '1M': [315.71, 323.39, 334.49, 331.44, 323.92, 300.51, 300.57, 289.52, 280.98, 297.88, 302.87, 311.93, 299.6, 317.58, 333.05, 357.96, 318.32, 316.43, 325.57, 303.95, 308.32], 'YTD': [162.01, 160.78, 172.54, 182.49, 186.18, 177.75, 236.51, 243.75, 254.89, 241.78, 258.88, 255.88, 251.07, 261.29, 295.11, 307.34, 323.46, 328.31, 339.97, 370.94, 327.46, 315.71, 300.51, 302.87, 357.96, 308.32], '6M': [165.62, 174.95, 172.72, 181.47, 193.76, 182.56, 248.51, 243.06, 259.23, 249.75, 265.38, 269.17, 252.4, 259.37, 287.64, 294.13, 321.75, 328.49, 340.01, 376.23, 323.4, 315.71, 300.51, 302.87, 357.96, 308.32], '1Y': [128.41, 125.89, 127.37, 125.29, 142.7, 138.76, 139.83, 135.69, 125.02, 124.01, 125.58, 136.65, 142.61, 150.86, 158.87, 175.15, 175.73, 192.9, 191.4, 187.84, 166.65, 168.91, 180.91, 178.38, 160.66, 166.26, 164.34, 171.54, 170.86, 181.12, 195.1, 177.75, 236.51, 243.75, 254.89, 241.78, 265.38, 269.17, 252.4, 261.29, 295.11, 307.34, 323.46, 328.31, 339.97, 370.94, 323.4, 315.71, 300.51, 302.87, 357.96, 308.32] },
      velocityScore: { '1D': -3.4, '1W': -3.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$118B', pe: 77.5, revenueGrowth: 30, eps: 3.98, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 3.47, ARTY: false, BAI: 1.87, IGPT: false, IVES: false, ALAI: false, CHAT: 2.19, AIFD: 3.96, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 4.98, proScore: 4.98, coverage: 1,
      price: 1114.98, weeklyPrices: [1051.77, 1048.51, 1213.56, 1132.33, 1114.98], weeklyChange: 6.01, dayChange: -1.53, sortRank: 0, periodReturns: { '1M': 14.8, 'YTD': 290.7, '6M': 278.8, '1Y': 804.6 },
      priceHistory: { '1D': [1132.33, 1116.98, 1114.98], '1W': [1051.77, 1048.51, 1213.56, 1132.33, 1114.98], '1M': [971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1114.98], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 382.89, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 971, 864.01, 981.61, 1211.38, 1114.98], '6M': [294.37, 343.43, 338.13, 389.11, 435.28, 379.4, 410.34, 417.35, 415.56, 397.05, 405.35, 444.27, 355.46, 367.85, 421.51, 457.23, 481.72, 517.16, 646.63, 776.01, 762.1, 971, 864.01, 981.61, 1211.38, 1114.98], '1Y': [123.25, 124.42, 120.11, 109.22, 111.96, 109.06, 123.72, 123.55, 116.42, 118.48, 135.24, 158.82, 166.41, 167.32, 185.69, 187.06, 206.77, 220.1, 234.7, 253.3, 241.95, 223.93, 239.49, 252.42, 232.51, 276.27, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 370.3, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 762.1, 971, 864.01, 981.61, 1211.38, 1114.98] },
      velocityScore: { '1D': 7.6, '1W': -2.5, '1M': -23.5, '6M': null }, isNew: false,
      marketCap: '$1.3T', pe: 25.2, revenueGrowth: 346, eps: 44.27, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { SOXX: 9.09, PSI: 6.09, XSD: 2.92, DRAM: 1.81 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 5.17, proScore: 3.88, coverage: 0.75,
      price: 531.78, weeklyPrices: [519.85, 519.74, 532.57, 521.58, 531.78], weeklyChange: 2.3, dayChange: 1.96, sortRank: 0, periodReturns: { '1M': 3, 'YTD': 148.3, '6M': 146.6, '1Y': 274.8 },
      priceHistory: { '1D': [521.58, 531.26, 531.78], '1W': [519.85, 519.74, 532.57, 521.58, 531.78], '1M': [516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 531.78], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 192.5, 205.94, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 467.51, 516.1, 466.38, 511.57, 551.63, 531.78], '6M': [215.61, 214.35, 220.97, 249.8, 252.74, 200.19, 213.58, 203.37, 203.68, 199.45, 197.74, 205.27, 203.77, 210.21, 236.64, 278.26, 305.33, 354.49, 408.46, 449.7, 449.59, 516.1, 466.38, 511.57, 551.63, 531.78], '1Y': [141.9, 137.82, 155.61, 154.72, 177.44, 174.31, 172.28, 176.14, 163.36, 162.32, 155.82, 160.46, 160.9, 161.79, 211.51, 218.09, 240.56, 259.67, 259.65, 243.98, 240.52, 215.05, 215.24, 221.62, 209.17, 214.9, 215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 200.21, 192.43, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 449.59, 516.1, 466.38, 511.57, 551.63, 531.78] },
      velocityScore: { '1D': 2.4, '1W': 5.1, '1M': -35.7, '6M': null }, isNew: false,
      marketCap: '$867B', pe: 175.5, revenueGrowth: 38, eps: 3.03, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 7.88, PSI: 4.99, XSD: 2.65, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.69, proScore: 3.52, coverage: 0.75,
      price: 125.73, weeklyPrices: [132.28, 131.65, 132.87, 128.32, 125.73], weeklyChange: -4.95, dayChange: -2.02, sortRank: 0, periodReturns: { '1M': 9.6, 'YTD': 240.7, '6M': 242.8, '1Y': 461.3 },
      priceHistory: { '1D': [128.32, 125.87, 125.73], '1W': [132.28, 131.65, 132.87, 128.32, 125.73], '1M': [114.68, 109.33, 107.93, 112.71, 111.78, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 125.73], 'YTD': [36.9, 41.11, 48.32, 45.07, 46.47, 48.24, 46.48, 44.11, 45.61, 43.42, 45.77, 43.87, 43.13, 50.38, 62.38, 68.5, 82.54, 99.62, 124.92, 108.77, 119.84, 114.68, 99.17, 124.57, 140.94, 125.73], '6M': [36.68, 40.04, 47.29, 54.25, 48.78, 48.6, 48.29, 44.62, 45.46, 45.95, 45.25, 46.18, 44.1, 48.03, 61.72, 68.5, 66.78, 94.48, 109.62, 115.93, 118.5, 114.68, 99.17, 124.57, 140.94, 125.73], '1Y': [22.4, 23.59, 22.92, 23.24, 20.41, 20.19, 20.65, 23.66, 24.55, 24.21, 24.44, 25.27, 29.34, 33.55, 37.17, 35.63, 38.1, 39.54, 39.5, 38.45, 34.71, 35.79, 43.47, 40.5, 37.31, 36.35, 37.3, 42.63, 48.72, 54.32, 48.66, 48.24, 46.48, 44.11, 45.61, 43.42, 45.25, 46.18, 44.1, 50.38, 62.38, 68.5, 82.54, 99.62, 124.92, 108.77, 118.5, 114.68, 99.17, 124.57, 140.94, 125.73] },
      velocityScore: { '1D': 0.6, '1W': 3.5, '1M': -2.2, '6M': null }, isNew: false,
      marketCap: '$632B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 6.31, PSI: 5, XSD: 2.76, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 4.54, proScore: 3.41, coverage: 0.75,
      price: 194.56, weeklyPrices: [200.04, 199.00, 195.74, 192.53, 194.56], weeklyChange: -2.74, dayChange: 1.05, sortRank: 0, periodReturns: { '1M': -7.9, 'YTD': 4.3, '6M': 3.4, '1Y': 23.1 },
      priceHistory: { '1D': [192.53, 194.52, 194.56], '1W': [200.04, 199, 195.74, 192.53, 194.56], '1M': [211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.56], 'YTD': [186.5, 185.04, 187.05, 187.67, 191.13, 171.88, 186.94, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 225.32, 215.33, 211.14, 205.1, 205.19, 208.65, 194.56], '6M': [188.22, 187.24, 185.81, 183.32, 191.52, 174.19, 190.05, 187.9, 184.89, 183.34, 183.14, 178.56, 171.24, 175.75, 183.91, 198.35, 199.64, 199.57, 211.5, 235.74, 219.51, 211.14, 205.1, 205.19, 208.65, 194.56], '1Y': [157.99, 160, 170.7, 167.03, 175.51, 178.26, 182.06, 182.01, 179.81, 170.78, 170.76, 174.88, 178.43, 186.58, 185.04, 180.03, 182.64, 191.49, 206.88, 199.05, 186.6, 182.55, 181.46, 184.97, 177.72, 189.21, 187.54, 189.11, 183.14, 184.84, 192.51, 171.88, 186.94, 189.82, 177.19, 177.82, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 225.32, 219.51, 211.14, 205.1, 205.19, 208.65, 194.56] },
      velocityScore: { '1D': 1.5, '1W': -1.2, '1M': 5.9, '6M': null }, isNew: false,
      marketCap: '$4.7T', pe: 29.8, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.52,
      etfPresence: { SOXX: 7.11, PSI: 4.32, XSD: 2.2, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.45, proScore: 2.58, coverage: 0.75,
      price: 392.32, weeklyPrices: [407.26, 413.16, 417.93, 386.91, 392.32], weeklyChange: -3.67, dayChange: 1.4, sortRank: 0, periodReturns: { '1M': -5.2, 'YTD': 44.7, '6M': 42.3, '1Y': 64.8 },
      priceHistory: { '1D': [386.91, 392.18, 392.32], '1W': [407.26, 413.16, 417.93, 386.91, 392.32], '1M': [413.85, 402.69, 423.2, 437.67, 428.76, 401.39, 403.89, 404.62, 392.67, 412.13, 417.79, 427.58, 416, 414.45, 434.46, 445.48, 407.26, 413.16, 417.93, 386.91, 392.32], 'YTD': [271.2, 299.16, 302.1, 305.6, 310.88, 322.12, 331.36, 355.03, 355.79, 315.81, 306.07, 309.43, 307.44, 318.34, 350.14, 371.45, 399.57, 397.69, 416.52, 417.49, 397.07, 413.85, 401.39, 417.79, 445.48, 392.32], '6M': [275.63, 292.94, 296.21, 304.97, 317.63, 320.44, 337, 345.3, 354.35, 329.72, 307.27, 310.44, 313.42, 320.58, 351.36, 353.8, 403.88, 402.26, 408.52, 426.79, 384.21, 413.85, 401.39, 417.79, 445.48, 392.32], '1Y': [238.02, 245.15, 240.42, 235.5, 230.75, 220.68, 224.07, 231.55, 254.49, 248.32, 248.18, 244.1, 246.78, 245.7, 233.75, 235.4, 246.22, 243.01, 233.61, 232, 229.94, 239.4, 272.97, 276.24, 278.4, 276.73, 274.82, 292.89, 297.99, 308.52, 318.7, 322.12, 331.36, 355.03, 355.79, 315.81, 307.27, 310.44, 313.42, 318.34, 350.14, 371.45, 399.57, 397.69, 416.52, 417.49, 384.21, 413.85, 401.39, 417.79, 445.48, 392.32] },
      velocityScore: { '1D': -4.1, '1W': -4.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$191B', pe: 58.3, revenueGrowth: 37, eps: 6.73, grossMargin: 64, dividendYield: 1.14,
      etfPresence: { SOXX: 3.64, PSI: 4.44, XSD: 2.26, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 6.04, proScore: 3.02, coverage: 0.5,
      price: 650.25, weeklyPrices: [585.88, 588.97, 668.00, 626.84, 650.25], weeklyChange: 10.99, dayChange: 3.73, sortRank: 0, periodReturns: { '1M': 44.5, 'YTD': 153, '6M': 147.2, '1Y': 255.2 },
      priceHistory: { '1D': [626.84, 650.96, 650.25], '1W': [585.88, 588.97, 668, 626.84, 650.25], '1M': [450.06, 458.17, 490.05, 500.77, 501.7, 453.01, 492.17, 499.21, 497.01, 552.64, 567.25, 585.78, 568.23, 592.92, 617.11, 640.18, 585.88, 588.97, 668, 626.84, 650.25], 'YTD': [256.99, 281.64, 319.08, 322.38, 322.32, 303.99, 328.39, 375.38, 372.3, 324.74, 341.53, 357.06, 337.17, 348.47, 399.49, 396.94, 417.04, 389.08, 435.44, 436.62, 432.16, 450.06, 453.01, 567.25, 640.18, 650.25], '6M': [263.05, 296.01, 304.87, 325.24, 336.75, 297.6, 339.88, 369.83, 375.72, 346.53, 337.27, 357.21, 338.55, 353.8, 397.81, 389.9, 403.91, 394.49, 410.64, 440.56, 427.36, 450.06, 453.01, 567.25, 640.18, 650.25], '1Y': [183.07, 194.99, 199.29, 187.14, 188.41, 179.15, 184.38, 163.53, 161.99, 157.57, 163.5, 173.54, 200.87, 204.74, 211.56, 218.19, 228.13, 231.33, 237.71, 235.08, 228.71, 230.91, 265.33, 267.14, 258.84, 260.23, 259.97, 292.2, 301.89, 318.79, 341.34, 303.99, 328.39, 375.38, 372.3, 324.74, 337.27, 357.21, 338.55, 348.47, 399.49, 396.94, 417.04, 389.08, 435.44, 436.62, 427.36, 450.06, 453.01, 567.25, 640.18, 650.25] },
      velocityScore: { '1D': 3.4, '1W': 9, '1M': 3.8, '6M': null }, isNew: false,
      marketCap: '$516B', pe: 61, revenueGrowth: 11, eps: 10.66, grossMargin: 49, dividendYield: 0.34,
      etfPresence: { SOXX: 5.43, PSI: 6.64, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 5.5, proScore: 2.75, coverage: 0.5,
      price: 255.29, weeklyPrices: [244.49, 240.48, 258.80, 248.64, 255.29], weeklyChange: 4.42, dayChange: 2.67, sortRank: 0, periodReturns: { '1M': 32.8, 'YTD': 110.1, '6M': 102.5, '1Y': 185 },
      priceHistory: { '1D': [248.64, 255, 255.29], '1W': [244.49, 240.48, 258.8, 248.64, 255.29], '1M': [192.17, 194, 204.52, 212.51, 213.11, 192.92, 210.81, 213.94, 213.56, 241.16, 254.54, 256.42, 237.33, 238.73, 259.56, 269.16, 244.49, 240.48, 258.8, 248.64, 255.29], 'YTD': [121.51, 132.46, 154.5, 151.28, 142.79, 133.1, 145.09, 149.6, 152.46, 134.46, 141.86, 149.87, 144.32, 151.68, 173.73, 179.14, 193.5, 172.63, 186.92, 180.43, 188.84, 192.17, 192.92, 254.54, 269.16, 255.29], '6M': [126.04, 139.5, 144.18, 152, 162.72, 130.72, 147.95, 146.99, 152.43, 142.94, 140.96, 151.15, 145.11, 151.98, 172.73, 173.49, 181.54, 175.04, 176.32, 189.29, 184.22, 192.17, 192.92, 254.54, 269.16, 255.29], '1Y': [89.57, 91.92, 93.65, 89.22, 91.61, 88.34, 91.02, 88.34, 87.96, 84.64, 91.77, 99.06, 107.12, 107.86, 108.47, 102.57, 115.29, 121.51, 121.91, 121.79, 113.37, 113.67, 118.99, 122.56, 122.34, 126.88, 124.36, 135.97, 143.45, 150, 168.47, 133.1, 145.09, 149.6, 152.46, 134.46, 140.96, 151.15, 145.11, 151.68, 173.73, 179.14, 193.5, 172.63, 186.92, 180.43, 184.22, 192.17, 192.92, 254.54, 269.16, 255.29] },
      velocityScore: { '1D': 3, '1W': 2.6, '1M': 7.8, '6M': null }, isNew: false,
      marketCap: '$333B', pe: 72.3, revenueGrowth: 12, eps: 3.53, grossMargin: 61, dividendYield: 0.37,
      etfPresence: { SOXX: 5.04, PSI: 5.95, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 5.15, proScore: 2.58, coverage: 0.5,
      price: 389.58, weeklyPrices: [371.33, 374.80, 401.82, 379.09, 389.58], weeklyChange: 4.91, dayChange: 2.77, sortRank: 0, periodReturns: { '1M': 22.4, 'YTD': 127.6, '6M': 121.5, '1Y': 300.2 },
      priceHistory: { '1D': [379.09, 389.57, 389.58], '1W': [371.33, 374.8, 401.82, 379.09, 389.58], '1M': [318.18, 317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04, 409.54, 371.33, 374.8, 401.82, 379.09, 389.58], 'YTD': [171.18, 200.96, 217.47, 217.94, 233.46, 213.31, 231.29, 244.92, 233.89, 199.33, 212.2, 228.36, 211.41, 218.44, 263.66, 267.6, 267.78, 256.72, 294.05, 284.72, 305.35, 318.18, 303.28, 366.81, 409.54, 389.58], '6M': [175.87, 206.96, 214.38, 228.39, 239.58, 209.78, 235.12, 237.39, 239.07, 214.68, 209.49, 233.99, 211.62, 222.01, 258.76, 260.96, 258.56, 257.86, 286.52, 299.15, 302.24, 318.18, 303.28, 366.81, 409.54, 389.58], '1Y': [97.34, 99.83, 101.07, 97.69, 98.94, 96.68, 102, 98.88, 101.28, 97.03, 105.57, 120.47, 131.93, 133.9, 140.35, 138.31, 144.05, 156.9, 161.24, 166.37, 147.46, 150.38, 158.19, 165.81, 163.26, 175.16, 173.78, 203.08, 208.79, 220.7, 248.17, 213.31, 231.29, 244.92, 233.89, 199.33, 209.49, 233.99, 211.62, 218.44, 263.66, 267.6, 267.78, 256.72, 294.05, 284.72, 302.24, 318.18, 303.28, 366.81, 409.54, 389.58] },
      velocityScore: { '1D': 0.8, '1W': 4.5, '1M': -2.6, '6M': null }, isNew: false,
      marketCap: '$487B', pe: 73.4, revenueGrowth: 24, eps: 5.31, grossMargin: 50, dividendYield: 0.27,
      etfPresence: { SOXX: 4.64, PSI: 5.66, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 4.31, proScore: 2.15, coverage: 0.5,
      price: 374.33, weeklyPrices: [380.15, 382.07, 378.91, 365.02, 374.33], weeklyChange: -1.53, dayChange: 2.55, sortRank: 0, periodReturns: { '1M': -16.2, 'YTD': 8.2, '6M': 7.1, '1Y': 35.8 },
      priceHistory: { '1D': [365.02, 373.95, 374.33], '1W': [380.15, 382.07, 378.91, 365.02, 374.33], '1M': [446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 374.33], 'YTD': [346.1, 332.48, 343.02, 320.05, 331.3, 310.51, 331.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 425.19, 414.14, 446.77, 385.73, 382.07, 392.13, 374.33], '6M': [349.39, 343.77, 354.61, 328.8, 333.24, 308.05, 342.76, 333.99, 321.7, 332.77, 335.97, 319.84, 309.42, 313.49, 354.91, 398.47, 419.94, 417.43, 412.56, 439.79, 414.57, 446.77, 385.73, 382.07, 392.13, 374.33], '1Y': [275.65, 271.8, 280.94, 278.59, 297.42, 292.93, 303.9, 305.76, 294.23, 298.24, 336.67, 360, 338.94, 329.91, 336.41, 344.13, 349.24, 362.05, 362.55, 358.39, 342.65, 377.96, 381.57, 406.29, 341.3, 349.32, 349.85, 343.5, 339.89, 325.49, 330.73, 310.51, 331.17, 332.65, 319.55, 330.48, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 425.19, 414.57, 446.77, 385.73, 382.07, 392.13, 374.33] },
      velocityScore: { '1D': 1.4, '1W': -3.2, '1M': -40.8, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 62.2, revenueGrowth: 48, eps: 6.02, grossMargin: 76, dividendYield: 0.71,
      etfPresence: { SOXX: 6.37, PSI: false, XSD: 2.25, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 3.75, proScore: 1.87, coverage: 0.5,
      price: 271.51, weeklyPrices: [279.04, 276.70, 281.26, 266.77, 271.51], weeklyChange: -2.7, dayChange: 1.78, sortRank: 0, periodReturns: { '1M': 32.4, 'YTD': 219.5, '6M': 216.6, '1Y': 250.8 },
      priceHistory: { '1D': [266.77, 271.61, 271.51], '1W': [279.04, 276.7, 281.26, 266.77, 271.51], '1M': [205, 219.43, 290.79, 301.65, 316.43, 263.47, 288.85, 266.88, 252.59, 280.71, 279.7, 308.88, 278.67, 289.54, 310.58, 307.86, 279.04, 276.7, 281.26, 266.77, 271.51], 'YTD': [84.98, 83.45, 80.38, 80.23, 78.92, 74.21, 78.23, 79.48, 81.69, 89.57, 87.86, 87.91, 94.88, 107.11, 128.49, 139.69, 164.31, 164.95, 170.13, 176.89, 196.33, 205, 263.47, 279.7, 307.86, 271.51], '6M': [85.76, 88.23, 83.05, 82.55, 83.62, 73.73, 81.34, 79.61, 79.29, 75.68, 87.67, 89.53, 97.68, 106.71, 119.93, 133.37, 165.56, 165.15, 160.01, 182.58, 190.69, 205, 263.47, 279.7, 307.86, 271.51], '1Y': [77.4, 71.95, 72.41, 71.99, 76.34, 76.63, 77.28, 76.74, 72.95, 64.6, 66.84, 68.86, 74.62, 84.07, 86.97, 86.22, 85.84, 88.71, 90.37, 93.23, 83.45, 83.79, 92.89, 88.9, 84.07, 87.68, 86.76, 84.64, 81.21, 83.1, 81.34, 74.21, 78.23, 79.48, 81.69, 89.57, 87.67, 89.53, 97.68, 107.11, 128.49, 139.69, 164.31, 164.95, 170.13, 176.89, 190.69, 205, 263.47, 279.7, 307.86, 271.51] },
      velocityScore: { '1D': 0, '1W': -6, '1M': -44, '6M': null }, isNew: false,
      marketCap: '$238B', pe: 93.3, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.09,
      etfPresence: { SOXX: 5.07, PSI: false, XSD: 2.43, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 2.98, proScore: 1.49, coverage: 0.5,
      price: 286.4, weeklyPrices: [304.36, 303.11, 311.81, 285.43, 286.40], weeklyChange: -5.9, dayChange: 0.34, sortRank: 0, periodReturns: { '1M': -6.3, 'YTD': 65.1, '6M': 63, '1Y': 37.9 },
      priceHistory: { '1D': [285.43, 285.43, 286.4], '1W': [304.36, 303.11, 311.81, 285.43, 286.4], '1M': [305.68, 293.2, 308.12, 308.59, 305.37, 285.06, 290.9, 288.63, 282.01, 297.1, 301.12, 313.34, 305.71, 301.88, 322.86, 332.28, 304.36, 303.11, 311.81, 285.43, 286.4], 'YTD': [173.49, 188.45, 189.12, 193.31, 215.55, 223.98, 223, 219.73, 212.11, 193.23, 190.78, 187.19, 190.33, 194.87, 214.73, 229.82, 277.14, 281.02, 287.8, 302.73, 309.21, 305.68, 285.06, 301.12, 332.28, 286.4], '6M': [175.69, 192.1, 188.53, 194.41, 216.17, 222.92, 226.56, 218.05, 212.63, 197.98, 190.05, 188.29, 193.41, 196.3, 214.98, 223.1, 282.23, 281.08, 285.24, 308.17, 298.39, 305.68, 285.06, 301.12, 332.28, 286.4], '1Y': [207.62, 216.63, 218.36, 214.92, 191.38, 185.4, 183.71, 194.33, 205.97, 199.81, 185.03, 177.63, 182.04, 183.73, 177.05, 173.94, 179.59, 169.41, 161.46, 160.58, 154.99, 161.26, 175.26, 179.52, 177.56, 177.08, 175.42, 185.71, 193.45, 194.99, 218.97, 223.98, 223, 219.73, 212.11, 193.23, 190.05, 188.29, 193.41, 194.87, 214.73, 229.82, 277.14, 281.02, 287.8, 302.73, 298.39, 305.68, 285.06, 301.12, 332.28, 286.4] },
      velocityScore: { '1D': -3.2, '1W': -3.2, '1M': -51.8, '6M': null }, isNew: false,
      marketCap: '$261B', pe: 49, revenueGrowth: 19, eps: 5.85, grossMargin: 57, dividendYield: 1.99,
      etfPresence: { SOXX: 3.64, PSI: false, XSD: 2.32, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.79, proScore: 1.4, coverage: 0.5,
      price: 279.63, weeklyPrices: [299.94, 294.06, 298.64, 277.02, 279.63], weeklyChange: -6.77, dayChange: 0.94, sortRank: 0, periodReturns: { '1M': -13, 'YTD': 28.8, '6M': 26.8, '1Y': 28 },
      priceHistory: { '1D': [277.02, 279.6, 279.63], '1W': [299.94, 294.06, 298.64, 277.02, 279.63], '1M': [321.35, 311.38, 323.62, 321.88, 322.22, 295.96, 301.14, 297.41, 285.56, 302.55, 304.86, 315.88, 302.89, 298.2, 313.27, 323.24, 299.94, 294.06, 298.64, 277.02, 279.63], 'YTD': [217.06, 237.89, 238.6, 232.48, 226.14, 222.13, 242.19, 232.27, 227.01, 201.74, 190.86, 191.37, 191.66, 194.55, 204.37, 216.03, 244.04, 295.24, 294.75, 291.5, 316.47, 321.35, 295.96, 304.86, 323.24, 279.63], '6M': [220.46, 245.95, 239.09, 233.72, 240.03, 226.86, 249.75, 232.11, 232.23, 210.58, 191.22, 192.35, 196.92, 195.58, 205.67, 213.73, 241.16, 293.59, 290.22, 294.17, 299.38, 321.35, 295.96, 304.86, 323.24, 279.63], '1Y': [218.49, 232.34, 221.06, 228, 226.74, 208.47, 205.16, 232.01, 236.67, 232.66, 223.69, 220.99, 225.62, 227.73, 219.58, 216.11, 219.82, 221.56, 210.39, 205.13, 190.51, 191.56, 215.35, 228.05, 229.75, 225.98, 219.98, 239.34, 240.81, 236.75, 233.5, 222.13, 242.19, 232.27, 227.01, 201.74, 191.22, 192.35, 196.92, 194.55, 204.37, 216.03, 244.04, 295.24, 294.75, 291.5, 299.38, 321.35, 295.96, 304.86, 323.24, 279.63] },
      velocityScore: { '1D': -2.1, '1W': -2.8, '1M': -33.6, '6M': null }, isNew: false,
      marketCap: '$71B', pe: 26.7, revenueGrowth: 12, eps: 10.47, grossMargin: 56, dividendYield: 1.46,
      etfPresence: { SOXX: 3.36, PSI: false, XSD: 2.22, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 2.69, proScore: 1.35, coverage: 0.5,
      price: 409.02, weeklyPrices: [397.02, 399.92, 398.00, 391.74, 409.02], weeklyChange: 3.02, dayChange: 4.41, sortRank: 0, periodReturns: { '1M': 19.3, 'YTD': 145.9, '6M': 140.5, '1Y': 352.4 },
      priceHistory: { '1D': [391.74, 407.49, 409.02], '1W': [397.02, 399.92, 398, 391.74, 409.02], '1M': [342.85, 320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 409.02], 'YTD': [166.36, 156.73, 174.45, 169.66, 150.62, 142.82, 126.58, 129.68, 118.83, 119.2, 120.31, 116.04, 112.47, 117.14, 149.05, 174.05, 212.84, 202.68, 199.79, 232.68, 306.88, 342.85, 317.06, 367.15, 439.66, 409.02], '6M': [170.1, 161.01, 180.56, 176.01, 167.9, 144.67, 143.71, 132.62, 124.67, 120, 119.9, 126.16, 113.61, 106.33, 129.46, 170.81, 197.54, 194.74, 195.65, 228.64, 297.84, 342.85, 317.06, 367.15, 439.66, 409.02], '1Y': [90.42, 92.3, 92.36, 116.91, 118.41, 135.54, 179.43, 186.43, 174.15, 174.24, 214.49, 238.79, 230.11, 195.8, 212.1, 161.55, 156.31, 170.28, 191.56, 173.74, 141.39, 147.75, 142.94, 167.08, 144.94, 168.83, 170.84, 165.77, 172.14, 176.35, 160.46, 142.82, 126.58, 129.68, 118.83, 119.2, 119.9, 126.16, 113.61, 117.14, 149.05, 174.05, 212.84, 202.68, 199.79, 232.68, 297.84, 342.85, 317.06, 367.15, 439.66, 409.02] },
      velocityScore: { '1D': 3.8, '1W': 3.8, '1M': -41, '6M': null }, isNew: false,
      marketCap: '$70B', pe: 274.5, revenueGrowth: 93, eps: 1.49, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.66, PSI: false, XSD: 2.72, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 2.61, proScore: 1.3, coverage: 0.5,
      price: 191.34, weeklyPrices: [204.13, 197.41, 204.90, 189.39, 191.34], weeklyChange: -6.26, dayChange: 1.03, sortRank: 0, periodReturns: { '1M': -23.8, 'YTD': 11.9, '6M': 10.3, '1Y': 20.1 },
      priceHistory: { '1D': [189.39, 191.99, 191.34], '1W': [204.13, 197.41, 204.9, 189.39, 191.34], '1M': [251.02, 228.99, 240.84, 250.01, 242.57, 215.94, 217.77, 205.42, 191.2, 202.96, 211.72, 220.81, 214.07, 212.97, 226.11, 221.9, 204.13, 197.41, 204.9, 189.39, 191.34], 'YTD': [171.05, 181.87, 161.39, 155.82, 151.59, 136.3, 138.47, 142.88, 142.36, 135.69, 129.82, 129.9, 127.11, 126.8, 128.06, 136.2, 148.85, 177.01, 219.09, 201.49, 238.16, 251.02, 215.94, 211.72, 221.9, 191.34], '6M': [173.43, 182.45, 165.29, 156.37, 152.7, 148.89, 141.04, 141.27, 145.59, 137, 131.15, 131.28, 130.54, 127.28, 127.75, 134.47, 133.95, 179.58, 202.55, 200.08, 213.41, 251.02, 215.94, 211.72, 221.9, 191.34], '1Y': [159.26, 159.45, 154.3, 157.99, 162.08, 146.71, 147.97, 158.9, 156.42, 158.78, 158.66, 164.14, 169.53, 166.36, 165.46, 161.74, 167.04, 187.68, 180.72, 171.57, 166.75, 165.06, 170.7, 176, 176.12, 174.75, 173.65, 180.19, 164.54, 157.8, 152.22, 136.3, 138.47, 142.88, 142.36, 135.69, 131.15, 131.28, 130.54, 126.8, 128.06, 136.2, 148.85, 177.01, 219.09, 201.49, 213.41, 251.02, 215.94, 211.72, 221.9, 191.34] },
      velocityScore: { '1D': -3, '1W': -8.5, '1M': -46.1, '6M': null }, isNew: false,
      marketCap: '$202B', pe: 20.6, revenueGrowth: -4, eps: 9.3, grossMargin: 55, dividendYield: 1.94,
      etfPresence: { SOXX: 2.94, PSI: false, XSD: 2.28, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.53, proScore: 1.27, coverage: 0.5,
      price: 1335.72, weeklyPrices: [1423.76, 1434.95, 1438.30, 1313.32, 1335.72], weeklyChange: -6.18, dayChange: 1.71, sortRank: 0, periodReturns: { '1M': -14.7, 'YTD': 47.4, '6M': 43.6, '1Y': 82.6 },
      priceHistory: { '1D': [1313.32, 1337.13, 1335.72], '1W': [1423.76, 1434.95, 1438.3, 1313.32, 1335.72], '1M': [1566.21, 1542.39, 1624.99, 1689.89, 1652.6, 1481.05, 1559.18, 1531.98, 1473.04, 1589.55, 1577.32, 1652.29, 1498.77, 1448.21, 1563.7, 1537.88, 1423.76, 1434.95, 1438.3, 1313.32, 1335.72], 'YTD': [906.36, 959.09, 1009.54, 1063.74, 1124.15, 1155.99, 1155.93, 1204.1, 1142.74, 1023.16, 1052.59, 1068.85, 1053.01, 1118.49, 1353.85, 1468.35, 1632.06, 1583.48, 1600.84, 1550.02, 1589.81, 1566.21, 1481.05, 1577.32, 1537.88, 1335.72], '6M': [930.04, 1005.38, 983.28, 1074.93, 1161.78, 1136.83, 1196.73, 1175.22, 1180.13, 1078.44, 1033.88, 1092.69, 1058.28, 1119.51, 1334.21, 1402.81, 1592.17, 1614.41, 1575.96, 1613.97, 1561.25, 1566.21, 1481.05, 1577.32, 1537.88, 1335.72], '1Y': [731.38, 761.31, 717.62, 719.98, 724.37, 802.78, 797.51, 850.31, 837.86, 823.65, 857.87, 857.02, 914.27, 920.64, 945.49, 968.25, 1031.59, 1105.05, 1003.93, 976.31, 897.01, 892.97, 952.18, 962.95, 951.36, 943.55, 923.91, 959.08, 983.6, 1076.67, 1183.15, 1155.99, 1155.93, 1204.1, 1142.74, 1023.16, 1033.88, 1092.69, 1058.28, 1118.49, 1353.85, 1468.35, 1632.06, 1583.48, 1600.84, 1550.02, 1561.25, 1566.21, 1481.05, 1577.32, 1537.88, 1335.72] },
      velocityScore: { '1D': -3.1, '1W': -7.3, '1M': -37.1, '6M': null }, isNew: false,
      marketCap: '$66B', pe: 96, revenueGrowth: 26, eps: 13.92, grossMargin: 55, dividendYield: 0.61,
      etfPresence: { SOXX: 3.02, PSI: false, XSD: 2.04, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.28, proScore: 1.14, coverage: 0.5,
      price: 88.45, weeklyPrices: [93.26, 92.48, 94.12, 87.93, 88.45], weeklyChange: -5.15, dayChange: 0.6, sortRank: 0, periodReturns: { '1M': -6.5, 'YTD': 38.8, '6M': 36.8, '1Y': 25.7 },
      priceHistory: { '1D': [87.93, 88.36, 88.45], '1W': [93.26, 92.48, 94.12, 87.93, 88.45], '1M': [94.65, 91.52, 96.96, 96.55, 96.3, 88.34, 91.37, 91.47, 87.91, 92.94, 95.24, 100.32, 95.63, 94.11, 99.77, 102.71, 93.26, 92.48, 94.12, 87.93, 88.45], 'YTD': [63.72, 73.53, 74.45, 74.71, 75.92, 78.04, 78.92, 77.73, 74.64, 64.77, 61.94, 62.97, 62, 65.6, 71.56, 78.76, 89.44, 93.95, 99.09, 93.85, 93.43, 94.65, 88.34, 95.24, 102.71, 88.45], '6M': [64.65, 74.87, 74.07, 76.2, 80.28, 78.23, 80.75, 77.16, 74.97, 67.81, 62.73, 63.29, 64.2, 65.38, 71.22, 76.87, 90.64, 92.91, 101.58, 97.04, 91.11, 94.65, 88.34, 95.24, 102.71, 88.45], '1Y': [70.37, 74.56, 73.11, 75.26, 70.68, 67.13, 60.95, 65.56, 68.55, 63.6, 64.76, 64.45, 64.71, 64.22, 64.96, 64.6, 67.07, 64.55, 62.41, 55.41, 51.7, 51.25, 56.71, 66.85, 65.9, 65.35, 64.68, 73.94, 74.68, 75.47, 79.36, 78.04, 78.92, 77.73, 74.64, 64.77, 62.73, 63.29, 64.2, 65.6, 71.56, 78.76, 89.44, 93.95, 99.09, 93.85, 91.11, 94.65, 88.34, 95.24, 102.71, 88.45] },
      velocityScore: { '1D': -1.7, '1W': -3.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$48B', pe: 402.1, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 2.07,
      etfPresence: { SOXX: 2.27, PSI: false, XSD: 2.3, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.11, proScore: 1.05, coverage: 0.5,
      price: 243, weeklyPrices: [272.01, 268.99, 268.03, 238.00, 243.00], weeklyChange: -10.66, dayChange: 2.1, sortRank: 0, periodReturns: { '1M': 3, 'YTD': 68.9, '6M': 67.9, '1Y': 162.4 },
      priceHistory: { '1D': [238, 242.42, 243], '1W': [272.01, 268.99, 268.03, 238, 243], '1M': [236.03, 226.1, 229, 214.6, 217.5, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 243], 'YTD': [143.89, 141.59, 149.12, 133.16, 125.28, 98.06, 121.78, 124.06, 112.27, 109.83, 117.69, 103.4, 95.24, 101.45, 119.59, 160.69, 195.04, 184.38, 188.51, 172.17, 218.41, 236.03, 206.89, 250.81, 302.52, 243], '6M': [144.7, 132.95, 161.38, 139.16, 129.66, 96.95, 128.4, 130.66, 114.48, 114.74, 111.57, 107.09, 96.44, 95.92, 107.93, 158.93, 185.54, 174.01, 188.29, 184.54, 193.39, 236.03, 206.89, 250.81, 302.52, 243], '1Y': [92.59, 93.36, 102.59, 92.93, 109.38, 110.29, 118.57, 118.74, 115.41, 124.27, 149.03, 164.42, 162.26, 145.61, 137.2, 129.75, 151.66, 154.96, 180.64, 170.16, 145.58, 150.85, 188.44, 170.29, 140.34, 147.81, 144.92, 141, 156.84, 135.1, 129.47, 98.06, 121.78, 124.06, 112.27, 109.83, 111.57, 107.09, 96.44, 101.45, 119.59, 160.69, 195.04, 184.38, 188.51, 172.17, 193.39, 236.03, 206.89, 250.81, 302.52, 243] },
      velocityScore: { '1D': -7.1, '1W': -3.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$45B', pe: 97.2, revenueGrowth: 157, eps: 2.5, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 1.91, PSI: false, XSD: 2.3, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 2, avgWeight: 1.81, proScore: 0.91, coverage: 0.5,
      price: 366.49, weeklyPrices: [372.15, 373.08, 390.19, 369.18, 366.49], weeklyChange: -1.52, dayChange: -0.73, sortRank: 0, periodReturns: { '1M': 0.5, 'YTD': 114, '6M': 111, '1Y': 155.8 },
      priceHistory: { '1D': [369.18, 367.95, 366.49], '1W': [372.15, 373.08, 390.19, 369.18, 366.49], '1M': [364.64, 353.79, 382.35, 390.34, 382.74, 345.4, 361.86, 358.72, 354.4, 374.76, 379.87, 384.77, 368.32, 367.11, 391.41, 396.26, 372.15, 373.08, 390.19, 369.18, 366.49], 'YTD': [171.28, 167.66, 218.93, 219.26, 219.06, 227.8, 238.99, 243.59, 248.12, 207.51, 217.8, 218.96, 225.44, 238.3, 258.11, 276.97, 287.64, 284.18, 359.88, 375.6, 385.98, 364.64, 345.4, 379.87, 396.26, 366.49], '6M': [173.71, 171.77, 213.52, 226.25, 226.25, 215.03, 236.94, 242.56, 247.11, 228.98, 215.94, 224.54, 228.5, 229.36, 247.71, 261.42, 284.4, 281.61, 344.47, 383.56, 380.45, 364.64, 345.4, 379.87, 396.26, 366.49], '1Y': [143.29, 137.37, 137.3, 136.76, 140.02, 137.28, 118.35, 124.55, 126.69, 131.05, 129.79, 131.18, 128.8, 124.49, 127.97, 131.54, 140.33, 146.39, 150.19, 178.42, 159.83, 165.97, 177.91, 188.08, 175.69, 176.28, 174.87, 170.62, 215.01, 224.29, 227.73, 227.8, 238.99, 243.59, 248.12, 207.51, 215.94, 224.54, 228.5, 238.3, 258.11, 276.97, 287.64, 284.18, 359.88, 375.6, 380.45, 364.64, 345.4, 379.87, 396.26, 366.49] },
      velocityScore: { '1D': 0, '1W': 4.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$28B', pe: 155.3, revenueGrowth: 23, eps: 2.36, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: 1.24, PSI: false, XSD: 2.39, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 1.8, proScore: 0.9, coverage: 0.5,
      price: 90.57, weeklyPrices: [117.06, 115.74, 118.74, 90.65, 90.57], weeklyChange: -22.63, dayChange: -0.09, sortRank: 0, periodReturns: { '1M': -24.9, 'YTD': 67.3, '6M': 67.7, '1Y': 72.8 },
      priceHistory: { '1D': [90.65, 90.03, 90.57], '1W': [117.06, 115.74, 118.74, 90.65, 90.57], '1M': [120.62, 120.92, 128.64, 133.93, 131.82, 117.26, 120.9, 117, 110.17, 115.96, 116.79, 125.9, 118.25, 112.92, 121.62, 131.55, 117.06, 115.74, 118.74, 90.65, 90.57], 'YTD': [54.15, 60.89, 60.28, 61.98, 59.89, 63.1, 70.63, 69.11, 66.48, 56.87, 58.55, 59.26, 58.35, 62.19, 68.65, 83.01, 98.4, 103.03, 103.2, 113.11, 116.2, 120.62, 117.26, 116.79, 131.55, 90.57], '6M': [54.02, 61.76, 59.41, 63.13, 64.93, 62.06, 71.18, 68.09, 68.16, 60.85, 57.69, 59.29, 60.87, 62.2, 68.49, 79.93, 97.78, 100.81, 100.61, 118.37, 109.61, 120.62, 117.26, 116.79, 131.55, 90.57], '1Y': [52.41, 57.62, 58.93, 62.45, 58.38, 47.24, 47.1, 50.53, 50.95, 48.94, 48.62, 49.56, 50.42, 49.31, 48.17, 49.54, 54.89, 52.68, 50.46, 48.54, 46.02, 47.39, 51.48, 55.23, 54.56, 55.69, 54.24, 61.89, 60.58, 63.07, 62.2, 63.1, 70.63, 69.11, 66.48, 56.87, 57.69, 59.29, 60.87, 62.19, 68.65, 83.01, 98.4, 103.03, 103.2, 113.11, 109.61, 120.62, 117.26, 116.79, 131.55, 90.57] },
      velocityScore: { '1D': -19.6, '1W': -18.2, '1M': -53.6, '6M': null }, isNew: false,
      marketCap: '$35B', pe: 66.6, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 1.71, PSI: false, XSD: 1.88, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'SWKS', name: 'SKYWORKS SOLUTIONS INC', easyScore: 2, avgWeight: 1.35, proScore: 0.68, coverage: 0.5,
      price: 67.97, weeklyPrices: [73.44, 71.40, 69.94, 68.00, 67.97], weeklyChange: -7.44, dayChange: -0.04, sortRank: 0, periodReturns: { '1M': -12.7, 'YTD': 7.2, '6M': 6.2, '1Y': -8.8 },
      priceHistory: { '1D': [68, 68.18, 67.97], '1W': [73.44, 71.4, 69.94, 68, 67.97], '1M': [77.85, 75.49, 79.12, 80.66, 79.93, 73.57, 75.37, 73.56, 70.29, 72.73, 73.97, 76.26, 71.42, 69.38, 72.45, 76.18, 73.44, 71.4, 69.94, 68, 67.97], 'YTD': [63.41, 60.66, 58.46, 58.96, 55.76, 60.92, 60.73, 60.05, 59.58, 54.81, 54.74, 54.44, 53.65, 55.19, 56.36, 58.99, 63.65, 69.4, 66.78, 68.53, 82.42, 77.85, 73.57, 73.97, 76.18, 67.97], '6M': [64.02, 66.27, 58.5, 58.55, 55.28, 59, 63.68, 59.22, 59.61, 56.48, 55.2, 54.12, 56.66, 53.22, 56.56, 58.7, 61.55, 70.17, 65.04, 67.06, 73.54, 77.85, 73.57, 73.97, 76.18, 67.97], '1Y': [74.52, 77.94, 72.97, 73.38, 71.94, 67.63, 70.53, 74.26, 76.76, 73.07, 75.06, 74.22, 81.26, 76.98, 74.34, 72.77, 76.14, 75.84, 76.54, 69.1, 63.16, 63.05, 68.24, 68.54, 66.02, 64.48, 64.46, 59.82, 59.86, 59.67, 55.79, 60.92, 60.73, 60.05, 59.58, 54.81, 55.2, 54.12, 56.66, 55.19, 56.36, 58.99, 63.65, 69.4, 66.78, 68.53, 73.54, 77.85, 73.57, 73.97, 76.18, 67.97] },
      velocityScore: { '1D': 3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 28.3, revenueGrowth: -1, eps: 2.4, grossMargin: 41, dividendYield: 4.18,
      etfPresence: { SOXX: 0.49, PSI: false, XSD: 2.21, DRAM: false },
      tonyNote: 'SKYWORKS SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 9, avgWeight: 5.9, proScore: 3.12, coverage: 0.529,
      price: 194.56, weeklyPrices: [200.04, 199.00, 195.74, 192.53, 194.56], weeklyChange: -2.74, dayChange: 1.05, sortRank: 0, periodReturns: { '1M': -7.9, 'YTD': 4.3, '6M': 3.4, '1Y': 23.1 },
      priceHistory: { '1D': [192.53, 194.52, 194.56], '1W': [200.04, 199, 195.74, 192.53, 194.56], '1M': [211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.56], 'YTD': [186.5, 185.04, 187.05, 187.67, 191.13, 171.88, 186.94, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 225.32, 215.33, 211.14, 205.1, 205.19, 208.65, 194.56], '6M': [188.22, 187.24, 185.81, 183.32, 191.52, 174.19, 190.05, 187.9, 184.89, 183.34, 183.14, 178.56, 171.24, 175.75, 183.91, 198.35, 199.64, 199.57, 211.5, 235.74, 219.51, 211.14, 205.1, 205.19, 208.65, 194.56], '1Y': [157.99, 160, 170.7, 167.03, 175.51, 178.26, 182.06, 182.01, 179.81, 170.78, 170.76, 174.88, 178.43, 186.58, 185.04, 180.03, 182.64, 191.49, 206.88, 199.05, 186.6, 182.55, 181.46, 184.97, 177.72, 189.21, 187.54, 189.11, 183.14, 184.84, 192.51, 171.88, 186.94, 189.82, 177.19, 177.82, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 225.32, 219.51, 211.14, 205.1, 205.19, 208.65, 194.56] },
      velocityScore: { '1D': -4.6, '1W': -5.5, '1M': -34.3, '6M': null }, isNew: false,
      marketCap: '$4.7T', pe: 29.8, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.52,
      etfPresence: { PTF: 4.11, WCLD: false, IGV: false, FDTX: 4.62, GTEK: false, ARKK: 1.57, MARS: false, FRWD: 8.17, BCTK: 5.79, FWD: false, CBSE: false, FCUS: false, WGMI: 1.84, CNEQ: 13.18, SGRT: 6.28, SPMO: 7.51, XMMO: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 5.88, proScore: 3.11, coverage: 0.529,
      price: 1114.98, weeklyPrices: [1051.77, 1048.51, 1213.56, 1132.33, 1114.98], weeklyChange: 6.01, dayChange: -1.53, sortRank: 0, periodReturns: { '1M': 14.8, 'YTD': 290.7, '6M': 278.8, '1Y': 804.6 },
      priceHistory: { '1D': [1132.33, 1116.98, 1114.98], '1W': [1051.77, 1048.51, 1213.56, 1132.33, 1114.98], '1M': [971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1114.98], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 382.89, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 971, 864.01, 981.61, 1211.38, 1114.98], '6M': [294.37, 343.43, 338.13, 389.11, 435.28, 379.4, 410.34, 417.35, 415.56, 397.05, 405.35, 444.27, 355.46, 367.85, 421.51, 457.23, 481.72, 517.16, 646.63, 776.01, 762.1, 971, 864.01, 981.61, 1211.38, 1114.98], '1Y': [123.25, 124.42, 120.11, 109.22, 111.96, 109.06, 123.72, 123.55, 116.42, 118.48, 135.24, 158.82, 166.41, 167.32, 185.69, 187.06, 206.77, 220.1, 234.7, 253.3, 241.95, 223.93, 239.49, 252.42, 232.51, 276.27, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 370.3, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 762.1, 971, 864.01, 981.61, 1211.38, 1114.98] },
      velocityScore: { '1D': 2.6, '1W': 4.4, '1M': 14.8, '6M': null }, isNew: false,
      marketCap: '$1.3T', pe: 25.2, revenueGrowth: 346, eps: 44.27, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { PTF: 5.53, WCLD: false, IGV: false, FDTX: 9.36, GTEK: false, ARKK: false, MARS: false, FRWD: 5.36, BCTK: 5.01, FWD: 1.35, CBSE: false, FCUS: 5.04, WGMI: false, CNEQ: 1.39, SGRT: 7.71, SPMO: 12.19, XMMO: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 8, avgWeight: 3.68, proScore: 1.73, coverage: 0.471,
      price: 531.78, weeklyPrices: [519.85, 519.74, 532.57, 521.58, 531.78], weeklyChange: 2.3, dayChange: 1.96, sortRank: 0, periodReturns: { '1M': 3, 'YTD': 148.3, '6M': 146.6, '1Y': 274.8 },
      priceHistory: { '1D': [521.58, 531.26, 531.78], '1W': [519.85, 519.74, 532.57, 521.58, 531.78], '1M': [516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 531.78], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 192.5, 205.94, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 467.51, 516.1, 466.38, 511.57, 551.63, 531.78], '6M': [215.61, 214.35, 220.97, 249.8, 252.74, 200.19, 213.58, 203.37, 203.68, 199.45, 197.74, 205.27, 203.77, 210.21, 236.64, 278.26, 305.33, 354.49, 408.46, 449.7, 449.59, 516.1, 466.38, 511.57, 551.63, 531.78], '1Y': [141.9, 137.82, 155.61, 154.72, 177.44, 174.31, 172.28, 176.14, 163.36, 162.32, 155.82, 160.46, 160.9, 161.79, 211.51, 218.09, 240.56, 259.67, 259.65, 243.98, 240.52, 215.05, 215.24, 221.62, 209.17, 214.9, 215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 200.21, 192.43, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 449.59, 516.1, 466.38, 511.57, 551.63, 531.78] },
      velocityScore: { '1D': 1.2, '1W': 4.8, '1M': -43.5, '6M': null }, isNew: false,
      marketCap: '$867B', pe: 175.5, revenueGrowth: 38, eps: 3.03, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.64, MARS: false, FRWD: 7.37, BCTK: 3.35, FWD: 2.17, CBSE: false, FCUS: 3.38, WGMI: false, CNEQ: 0.85, SGRT: 3.63, SPMO: 4.08, XMMO: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 7, avgWeight: 5, proScore: 2.06, coverage: 0.412,
      price: 599.01, weeklyPrices: [670.75, 643.83, 675.39, 586.45, 599.01], weeklyChange: -10.69, dayChange: 2.14, sortRank: 0, periodReturns: { '1M': 12.8, 'YTD': 247.7, '6M': 233.4, '1Y': 836.1 },
      priceHistory: { '1D': [586.45, 599.9, 599.01], '1W': [670.75, 643.83, 675.39, 586.45, 599.01], '1M': [531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 599.01], 'YTD': [172.27, 187.68, 222.1, 236.39, 250.23, 260.19, 284.1, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 294.97, 343.43, 372.52, 404, 431.52, 480, 482.02, 484.28, 531.21, 511.72, 562.93, 732.62, 599.01], '6M': [179.68, 219.38, 214, 241.9, 279.7, 269.41, 273.74, 284.67, 282.25, 259.03, 261.18, 316.93, 273.35, 297.73, 337.88, 361.69, 403.12, 434.52, 463.91, 489.15, 486.46, 531.21, 511.72, 562.93, 732.62, 599.01], '1Y': [63.99, 64.02, 67.53, 67.06, 70.61, 75.84, 74.64, 76.29, 79.22, 81.91, 94.54, 103.09, 110.25, 120.06, 119.93, 113.13, 121.53, 126.67, 158.02, 174.22, 162.45, 150.93, 159.99, 169.54, 174.58, 178.25, 176.06, 199.88, 215, 243.29, 278.41, 260.19, 284.1, 285.52, 279.7, 245.25, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 431.52, 480, 482.02, 486.46, 531.21, 511.72, 562.93, 732.62, 599.01] },
      velocityScore: { '1D': -8.8, '1W': -12, '1M': -6.8, '6M': null }, isNew: false,
      marketCap: '$206B', pe: 35.8, revenueGrowth: 46, eps: 16.71, grossMargin: 45, dividendYield: 0.1,
      etfPresence: { PTF: 5.07, WCLD: false, IGV: false, FDTX: 4, GTEK: false, ARKK: false, MARS: false, FRWD: 4.88, BCTK: false, FWD: false, CBSE: false, FCUS: 5.07, WGMI: false, CNEQ: 5.01, SGRT: 9.1, SPMO: 1.9, XMMO: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 7, avgWeight: 3.62, proScore: 1.49, coverage: 0.412,
      price: 374.33, weeklyPrices: [380.15, 382.07, 378.91, 365.02, 374.33], weeklyChange: -1.53, dayChange: 2.55, sortRank: 0, periodReturns: { '1M': -16.2, 'YTD': 8.2, '6M': 7.1, '1Y': 35.8 },
      priceHistory: { '1D': [365.02, 373.95, 374.33], '1W': [380.15, 382.07, 378.91, 365.02, 374.33], '1M': [446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 374.33], 'YTD': [346.1, 332.48, 343.02, 320.05, 331.3, 310.51, 331.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 425.19, 414.14, 446.77, 385.73, 382.07, 392.13, 374.33], '6M': [349.39, 343.77, 354.61, 328.8, 333.24, 308.05, 342.76, 333.99, 321.7, 332.77, 335.97, 319.84, 309.42, 313.49, 354.91, 398.47, 419.94, 417.43, 412.56, 439.79, 414.57, 446.77, 385.73, 382.07, 392.13, 374.33], '1Y': [275.65, 271.8, 280.94, 278.59, 297.42, 292.93, 303.9, 305.76, 294.23, 298.24, 336.67, 360, 338.94, 329.91, 336.41, 344.13, 349.24, 362.05, 362.55, 358.39, 342.65, 377.96, 381.57, 406.29, 341.3, 349.32, 349.85, 343.5, 339.89, 325.49, 330.73, 310.51, 331.17, 332.65, 319.55, 330.48, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 425.19, 414.57, 446.77, 385.73, 382.07, 392.13, 374.33] },
      velocityScore: { '1D': -4.5, '1W': -5.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 62.2, revenueGrowth: 48, eps: 6.02, grossMargin: 76, dividendYield: 0.71,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.79, GTEK: false, ARKK: 1.07, MARS: false, FRWD: 4.75, BCTK: 6.67, FWD: 1.83, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.23, SGRT: false, SPMO: 6.03, XMMO: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'SPCX', name: 'SPACE EXPLORATION TECHN-CL A', easyScore: 6, avgWeight: 7.2, proScore: 2.54, coverage: 0.353,
      price: 158.75, weeklyPrices: [156.11, 154.54, 153.00, 153.23, 158.75], weeklyChange: 1.69, dayChange: 3.6, sortRank: 0, periodReturns: { '1M': -1.4, 'YTD': -1.4, '6M': -1.4, '1Y': -1.4 },
      priceHistory: { '1D': [153.23, 158.33, 158.75], '1W': [156.11, 154.54, 153, 153.23, 158.75], '1M': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 158.75], 'YTD': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 158.75], '6M': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 158.75], '1Y': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 158.75] },
      velocityScore: { '1D': 2.8, '1W': -7.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.1T', pe: null, revenueGrowth: 15, eps: -0.67, grossMargin: 49, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.17, MARS: 23.33, FRWD: 2.34, BCTK: 8.29, FWD: 1.71, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.35, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'SPACE EXPLORATION TECHN-CL A appears in 6 of 17 Broad Tech ETFs (35% coverage) with average weight 7.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 6, avgWeight: 4.67, proScore: 1.65, coverage: 0.353,
      price: 442.47, weeklyPrices: [436.39, 440.83, 434.99, 432.35, 442.47], weeklyChange: 1.39, dayChange: 2.36, sortRank: 0, periodReturns: { '1M': 5.7, 'YTD': 45.6, '6M': 47, '1Y': 95.4 },
      priceHistory: { '1D': [432.26, 442.63, 442.47], '1W': [436.39, 440.83, 434.99, 432.35, 442.47], '1M': [418.45, 435.63, 446.69, 436.69, 444.92, 415.17, 426.8, 427.92, 408.75, 421.07, 423.93, 441.4, 425.83, 432.15, 462.12, 467.67, 436.39, 440.83, 434.99, 432.35, 442.47], 'YTD': [303.89, 318.01, 341.64, 334.87, 330.56, 330.73, 368.1, 370.54, 374.58, 338.89, 338.31, 329.24, 326.74, 339.04, 370.6, 370.5, 402.46, 397.67, 411.68, 404.35, 404.52, 418.45, 415.17, 423.93, 467.67, 442.47], '6M': [300.92, 327.43, 331.21, 326.12, 342.3, 325.74, 374.09, 360.39, 376.81, 353.86, 336.71, 338.79, 326.11, 341.49, 365.49, 363.35, 382.66, 396.06, 414.15, 417.72, 407.15, 418.45, 415.17, 423.93, 467.67, 442.47], '1Y': [226.49, 227.86, 236.95, 234.6, 241.33, 232.47, 242.09, 241.41, 235.59, 228.39, 250.92, 262.06, 282.71, 279.29, 294.03, 295.94, 297.7, 298.25, 304.86, 295.27, 282.01, 284.64, 292.09, 303.41, 286.87, 296.95, 299.58, 318.68, 327.11, 327.37, 339.55, 330.73, 368.1, 370.54, 374.58, 338.89, 336.71, 338.79, 326.11, 339.04, 370.6, 370.5, 402.46, 397.67, 411.68, 404.35, 407.15, 418.45, 415.17, 423.93, 467.67, 442.47] },
      velocityScore: { '1D': -8.3, '1W': -7.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 38.3, revenueGrowth: 35, eps: 11.54, grossMargin: 62, dividendYield: 0.88,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6, GTEK: false, ARKK: 0.95, MARS: false, FRWD: 6, BCTK: 8.68, FWD: false, CBSE: false, FCUS: false, WGMI: 0.56, CNEQ: 5.8, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 6, avgWeight: 3.27, proScore: 1.15, coverage: 0.353,
      price: 237.31, weeklyPrices: [234.11, 234.27, 227.01, 232.69, 237.31], weeklyChange: 1.37, dayChange: 1.99, sortRank: 0, periodReturns: { '1M': -12.3, 'YTD': 2.8, '6M': 2.3, '1Y': 8.2 },
      priceHistory: { '1D': [232.69, 237.61, 237.31], '1W': [234.11, 234.27, 227.01, 232.69, 237.31], '1M': [270.64, 261.26, 256.52, 250.02, 253.79, 246.03, 245.22, 244.19, 238, 241.51, 238.55, 246.02, 246, 237.5, 244.39, 232.79, 234.11, 234.27, 227.01, 232.69, 237.31], 'YTD': [230.82, 246.29, 238.18, 239.16, 239.3, 222.69, 199.6, 210.11, 210, 213.21, 207.67, 205.37, 199.34, 209.77, 238.38, 250.56, 263.99, 268.26, 272.68, 264.14, 266.32, 270.64, 246.03, 238.55, 232.79, 237.31], '6M': [232.07, 240.93, 242.6, 231.31, 243.01, 232.99, 204.08, 204.86, 207.92, 218.94, 209.53, 208.76, 207.54, 210.57, 233.65, 249.7, 255.08, 265.06, 271.17, 267.22, 268.46, 270.64, 246.03, 238.55, 232.79, 237.31], '1Y': [219.39, 219.36, 226.35, 227.47, 231.01, 213.75, 221.3, 231.49, 227.94, 225.34, 238.24, 234.05, 220.71, 219.57, 221.78, 216.39, 216.48, 226.97, 254, 248.4, 232.87, 226.28, 234.42, 227.92, 222.56, 232.14, 232.53, 241.56, 236.65, 234.34, 241.73, 222.69, 199.6, 210.11, 210, 213.21, 209.53, 208.76, 207.54, 209.77, 238.38, 250.56, 263.99, 268.26, 272.68, 264.14, 268.46, 270.64, 246.03, 238.55, 232.79, 237.31] },
      velocityScore: { '1D': -4.2, '1W': 32.2, '1M': -72.2, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 32.3, revenueGrowth: 17, eps: 7.35, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.01, GTEK: false, ARKK: 2.32, MARS: false, FRWD: 2.88, BCTK: 4.2, FWD: 1.46, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.73, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'LRCX', name: 'Lam Research Corp', easyScore: 5, avgWeight: 4.73, proScore: 1.39, coverage: 0.294,
      price: 389.58, weeklyPrices: [371.33, 374.80, 401.82, 379.09, 389.58], weeklyChange: 4.91, dayChange: 2.77, sortRank: 0, periodReturns: { '1M': 22.4, 'YTD': 127.6, '6M': 121.5, '1Y': 300.2 },
      priceHistory: { '1D': [379.09, 389.57, 389.58], '1W': [371.33, 374.8, 401.82, 379.09, 389.58], '1M': [318.18, 317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04, 409.54, 371.33, 374.8, 401.82, 379.09, 389.58], 'YTD': [171.18, 200.96, 217.47, 217.94, 233.46, 213.31, 231.29, 244.92, 233.89, 199.33, 212.2, 228.36, 211.41, 218.44, 263.66, 267.6, 267.78, 256.72, 294.05, 284.72, 305.35, 318.18, 303.28, 366.81, 409.54, 389.58], '6M': [175.87, 206.96, 214.38, 228.39, 239.58, 209.78, 235.12, 237.39, 239.07, 214.68, 209.49, 233.99, 211.62, 222.01, 258.76, 260.96, 258.56, 257.86, 286.52, 299.15, 302.24, 318.18, 303.28, 366.81, 409.54, 389.58], '1Y': [97.34, 99.83, 101.07, 97.69, 98.94, 96.68, 102, 98.88, 101.28, 97.03, 105.57, 120.47, 131.93, 133.9, 140.35, 138.31, 144.05, 156.9, 161.24, 166.37, 147.46, 150.38, 158.19, 165.81, 163.26, 175.16, 173.78, 203.08, 208.79, 220.7, 248.17, 213.31, 231.29, 244.92, 233.89, 199.33, 209.49, 233.99, 211.62, 218.44, 263.66, 267.6, 267.78, 256.72, 294.05, 284.72, 302.24, 318.18, 303.28, 366.81, 409.54, 389.58] },
      velocityScore: { '1D': 24.1, '1W': 3.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$487B', pe: 73.4, revenueGrowth: 24, eps: 5.31, grossMargin: 50, dividendYield: 0.27,
      etfPresence: { PTF: 3.11, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 6.13, BCTK: 8.28, FWD: 2.02, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 4.11, XMMO: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 5, avgWeight: 4.62, proScore: 1.36, coverage: 0.294,
      price: 912.01, weeklyPrices: [1038.59, 993.25, 1025.36, 899.90, 912.01], weeklyChange: -12.19, dayChange: 1.35, sortRank: 0, periodReturns: { '1M': 3.7, 'YTD': 231.2, '6M': 224.2, '1Y': 531.9 },
      priceHistory: { '1D': [899.9, 909.4, 912.01], '1W': [1038.59, 993.25, 1025.36, 899.9, 912.01], '1M': [879.8, 921.26, 926.61, 940.69, 925.99, 847.47, 876.77, 846.01, 815.99, 868.09, 931.04, 1018.8, 1031.34, 1066.07, 1070.23, 1094.04, 1038.59, 993.25, 1025.36, 899.9, 912.01], 'YTD': [275.39, 284.47, 320.32, 346.1, 407.69, 405.45, 431.17, 411.11, 407.84, 352.8, 383.71, 411.23, 380.07, 429.36, 503.13, 547.75, 586.25, 726.93, 782.64, 795.47, 812.73, 879.8, 847.47, 931.04, 1094.04, 912.01], '6M': [281.3, 330.42, 318.44, 344.22, 442.93, 418.63, 407.25, 408.97, 409.67, 367.34, 373.98, 434.6, 378.79, 423.12, 500.77, 531.81, 587.62, 673.64, 766.44, 804.76, 810.46, 879.8, 847.47, 931.04, 1094.04, 912.01], '1Y': [144.33, 144.47, 149.05, 146.59, 152.68, 151.74, 151.69, 158.7, 164, 170.5, 191.59, 211.13, 228.13, 236.06, 225.01, 211.63, 214.4, 230.32, 265.55, 293.99, 261.38, 253.38, 266.87, 282.86, 288.13, 282.8, 280.08, 308.26, 312.28, 346.53, 446.57, 405.45, 431.17, 411.11, 407.84, 352.8, 373.98, 434.6, 378.79, 429.36, 503.13, 547.75, 586.25, 726.93, 782.64, 795.47, 810.46, 879.8, 847.47, 931.04, 1094.04, 912.01] },
      velocityScore: { '1D': -6.8, '1W': -8.1, '1M': -42.1, '6M': null }, isNew: false,
      marketCap: '$206B', pe: 86.6, revenueGrowth: 44, eps: 10.53, grossMargin: 42, dividendYield: 0.33,
      etfPresence: { PTF: 4.75, WCLD: false, IGV: false, FDTX: 4.04, GTEK: false, ARKK: false, MARS: false, FRWD: 7.63, BCTK: false, FWD: false, CBSE: false, FCUS: 4.81, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.87, XMMO: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 5, avgWeight: 3.99, proScore: 1.17, coverage: 0.294,
      price: 345.21, weeklyPrices: [346.08, 345.04, 342.19, 334.69, 345.21], weeklyChange: -0.25, dayChange: 3.14, sortRank: 0, periodReturns: { '1M': -8.3, 'YTD': 10, '6M': 9.8, '1Y': 94.6 },
      priceHistory: { '1D': [334.69, 346.36, 345.21], '1W': [346.08, 345.04, 342.19, 334.69, 345.21], '1M': [376.43, 372.58, 358.39, 355.68, 369.27, 365.76, 361.17, 362.29, 353.32, 356.56, 358.16, 367.11, 371.1, 362.1, 367.46, 348.78, 346.08, 345.04, 342.19, 334.69, 345.21], 'YTD': [313.8, 326.01, 333.16, 328.43, 338.53, 331.33, 309.37, 314.9, 311.43, 298.3, 301.46, 298.79, 273.76, 294.46, 315.72, 339.4, 342.32, 383.22, 397.05, 393.32, 379.38, 376.43, 365.76, 358.16, 348.78, 345.21], '6M': [314.39, 314.55, 336.43, 328.38, 336.28, 333.34, 311.33, 303.56, 307.15, 300.91, 303.21, 305.73, 280.74, 294.9, 316.37, 332.77, 337.75, 381.94, 395.3, 397.17, 383.47, 376.43, 365.76, 358.16, 348.78, 345.21], '1Y': [177.39, 175.16, 183.1, 192.11, 196.43, 195.32, 201.63, 204.29, 209.16, 211.99, 239.94, 251.42, 252.34, 243.55, 247.13, 246.19, 257.02, 269.93, 284.12, 290.59, 285.6, 318.47, 316.02, 317.75, 307.73, 315.68, 314.55, 322.43, 336.31, 330.84, 338.66, 331.33, 309.37, 314.9, 311.43, 298.3, 303.21, 305.73, 280.74, 294.46, 315.72, 339.4, 342.32, 383.22, 397.05, 393.32, 383.47, 376.43, 365.76, 358.16, 348.78, 345.21] },
      velocityScore: { '1D': -2.5, '1W': -2.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.2T', pe: 26.3, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.26,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.66, GTEK: false, ARKK: 1.83, MARS: false, FRWD: false, BCTK: 5.54, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 5.61, SGRT: false, SPMO: 3.3, XMMO: false },
      tonyNote: 'Alphabet Inc Class C appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 4.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRWD', name: 'CrowdStrike', easyScore: 5, avgWeight: 2.58, proScore: 0.76, coverage: 0.294,
      price: 719.65, weeklyPrices: [680.92, 673.02, 678.65, 701.09, 719.65], weeklyChange: 5.69, dayChange: 2.65, sortRank: 0, periodReturns: { '1M': -1.6, 'YTD': 53.5, '6M': 51.2, '1Y': 41.3 },
      priceHistory: { '1D': [701.09, 721.12, 719.65], '1W': [680.92, 673.02, 678.65, 701.09, 719.65], '1M': [731, 782.17, 768.95, 747.61, 719.09, 671.02, 658.79, 644.93, 647.74, 691.53, 682.8, 692.91, 679.49, 682.96, 684.86, 675.44, 680.92, 673.02, 678.65, 701.09, 719.65], 'YTD': [468.76, 463.87, 455, 452.49, 441.4, 377.16, 411.54, 388.6, 371.98, 428.99, 441.78, 409, 369.58, 399.12, 379.02, 423.95, 448.13, 455.64, 527.77, 594.08, 663.46, 731, 671.02, 682.8, 675.44, 719.65], '6M': [475.91, 458.32, 468.02, 445.88, 469.19, 415.36, 415.81, 422.14, 381.1, 426.16, 441.54, 428.18, 392.62, 393.31, 394.68, 418.2, 445.39, 445.75, 505.72, 579.95, 648.23, 731, 671.02, 682.8, 675.44, 719.65], '1Y': [509.31, 507.71, 473.28, 471.23, 465.51, 441.75, 426.43, 426.34, 418.83, 413.5, 423.51, 444.98, 484.1, 490.38, 484.62, 488.94, 503.61, 529.7, 551.92, 557.53, 529.78, 506.82, 516.55, 517.98, 488.53, 478.84, 475.63, 478.91, 460.7, 453.77, 444.62, 377.16, 411.54, 388.6, 371.98, 428.99, 441.54, 428.18, 392.62, 399.12, 379.02, 423.95, 448.13, 455.64, 527.77, 594.08, 648.23, 731, 671.02, 682.8, 675.44, 719.65] },
      velocityScore: { '1D': 8.6, '1W': 13.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$183B', pe: null, revenueGrowth: 26, eps: -0.14, grossMargin: 75, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.5, IGV: 6.88, FDTX: 1.24, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 1.2, FWD: 1.09, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'CrowdStrike appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 2.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, avgWeight: 5.28, proScore: 1.24, coverage: 0.235,
      price: 377.27, weeklyPrices: [373.94, 365.46, 352.83, 372.97, 377.27], weeklyChange: 0.89, dayChange: 1.15, sortRank: 0, periodReturns: { '1M': -16.2, 'YTD': -22, '6M': -22.5, '1Y': -24.2 },
      priceHistory: { '1D': [372.97, 378.28, 377.27], '1W': [373.94, 365.46, 352.83, 372.97, 377.27], '1M': [450.24, 460.52, 441.31, 427.34, 428.05, 416.67, 411.74, 403.41, 397.36, 390.34, 390.74, 399.76, 393.83, 378.91, 379.4, 367.34, 373.94, 365.46, 352.83, 372.97, 377.27], 'YTD': [483.62, 478.11, 456.66, 465.95, 430.29, 393.67, 401.84, 397.23, 392.74, 408.96, 395.55, 381.87, 356.77, 373.46, 370.87, 422.79, 424.62, 414.44, 415.12, 421.92, 418.57, 450.24, 416.67, 390.74, 367.34, 377.27], '6M': [487.1, 478.51, 470.67, 444.11, 481.63, 414.19, 404.37, 398.46, 401.72, 410.68, 401.86, 389.02, 365.97, 369.37, 373.07, 420.26, 415.75, 407.78, 420.77, 409.43, 419.09, 450.24, 416.67, 390.74, 367.34, 377.27], '1Y': [497.41, 496.62, 505.82, 505.27, 512.57, 527.75, 521.77, 517.1, 504.26, 505.12, 498.41, 509.04, 509.23, 517.95, 523.98, 513.57, 516.79, 531.52, 517.03, 506, 507.49, 474, 490, 492.02, 476.39, 486.85, 487.48, 483.47, 459.38, 451.14, 433.5, 393.67, 401.84, 397.23, 392.74, 408.96, 401.86, 389.02, 365.97, 373.46, 370.87, 422.79, 424.62, 414.44, 415.12, 421.92, 419.09, 450.24, 416.67, 390.74, 367.34, 377.27] },
      velocityScore: { '1D': 1.6, '1W': 0, '1M': -75, '6M': null }, isNew: false,
      marketCap: '$2.8T', pe: 22.5, revenueGrowth: 18, eps: 16.78, grossMargin: 68, dividendYield: 0.98,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.3, FDTX: 3.79, GTEK: false, ARKK: false, MARS: false, FRWD: 2.95, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 6.08, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 4, avgWeight: 4.91, proScore: 1.15, coverage: 0.235,
      price: 2033, weeklyPrices: [1963.60, 1914.46, 2335.00, 2090.71, 2033.00], weeklyChange: 3.53, dayChange: -2.76, sortRank: 0, periodReturns: { '1M': 19.9, 'YTD': 756.4, '6M': 732.3, '1Y': 4382.9 },
      priceHistory: { '1D': [2090.71, 2040.26, 2033], '1W': [1963.6, 1914.46, 2335, 2090.71, 2033], '1M': [1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2033], 'YTD': [237.38, 334.54, 409.24, 473.83, 576.25, 576.2, 630.29, 649.97, 635.36, 527.33, 661.62, 709.71, 615.83, 701.59, 851.77, 920.99, 989.9, 1187, 1562.34, 1407.61, 1478.69, 1694.98, 1559.32, 1980.1, 2273.73, 2033], '6M': [244.25, 349.63, 389.81, 501.29, 527.63, 584.55, 599.34, 621.09, 651.9, 565.59, 618.82, 772.09, 603.17, 692.73, 851.57, 919.47, 932.43, 1096.51, 1339.96, 1382.72, 1542.24, 1694.98, 1559.32, 1980.1, 2273.73, 2033], '1Y': [45.35, 46.17, 42.72, 41.36, 42.93, 41.93, 43.37, 45.52, 46.78, 51.07, 70.51, 91.55, 106.4, 112.2, 120.95, 127.29, 148.04, 176.49, 207.01, 267.95, 265.88, 226.96, 205.35, 219.46, 209.31, 244.9, 240.22, 353.56, 387.81, 503.44, 539.3, 576.2, 630.29, 649.97, 635.36, 527.33, 618.82, 772.09, 603.17, 701.59, 851.77, 920.99, 989.9, 1187, 1562.34, 1407.61, 1542.24, 1694.98, 1559.32, 1980.1, 2273.73, 2033] },
      velocityScore: { '1D': 7.5, '1W': 15, '1M': null, '6M': null }, isNew: false,
      marketCap: '$301B', pe: 69.5, revenueGrowth: 251, eps: 29.27, grossMargin: 56, dividendYield: null,
      etfPresence: { PTF: 9.34, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.58, CBSE: false, FCUS: 5.75, WGMI: false, CNEQ: false, SGRT: false, SPMO: 2.96, XMMO: false },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks', easyScore: 4, avgWeight: 4.29, proScore: 1.01, coverage: 0.235,
      price: 311.54, weeklyPrices: [290.92, 285.26, 293.09, 304.20, 311.54], weeklyChange: 7.09, dayChange: 2.41, sortRank: 0, periodReturns: { '1M': 10.6, 'YTD': 69.1, '6M': 66.7, '1Y': 52.2 },
      priceHistory: { '1D': [304.2, 310.98, 311.54], '1W': [290.92, 285.26, 293.09, 304.2, 311.54], '1M': [281.69, 300.48, 297.18, 280.43, 279.25, 272.05, 266.33, 260.52, 263.22, 279.53, 279.62, 284.54, 279.9, 282.13, 287.78, 286.4, 290.92, 285.26, 293.09, 304.2, 311.54], 'YTD': [184.2, 190.8, 187.73, 180.18, 176.97, 154.77, 162.81, 148.7, 148.92, 165.05, 167.02, 162.95, 147.02, 163.21, 155.73, 167.85, 178.54, 181.08, 207.88, 242.83, 260.58, 281.69, 272.05, 279.62, 286.4, 311.54], '6M': [186.85, 185.86, 190.85, 181.47, 183.74, 166.72, 165.3, 150.99, 149.4, 163.16, 168.12, 169.74, 156.36, 160.67, 166.99, 166.97, 173.21, 179.32, 196.53, 238.21, 252.92, 281.69, 272.05, 279.62, 286.4, 311.54], '1Y': [204.64, 203.99, 192.25, 196.73, 193.84, 169.09, 168.17, 176.17, 184.55, 190.52, 197.55, 201.34, 203.25, 203.62, 211.04, 207.56, 211.82, 220.29, 219.23, 216.54, 202.9, 183.89, 189.88, 195, 187.09, 188.12, 186.85, 193.9, 190.93, 182.27, 176.2, 154.77, 162.81, 148.7, 148.92, 165.05, 168.12, 169.74, 156.36, 163.21, 155.73, 167.85, 178.54, 181.08, 207.88, 242.83, 252.92, 281.69, 272.05, 279.62, 286.4, 311.54] },
      velocityScore: { '1D': 7.4, '1W': 12.2, '1M': -55.9, '6M': null }, isNew: false,
      marketCap: '$254B', pe: 268.6, revenueGrowth: 31, eps: 1.16, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.83, IGV: 9.51, FDTX: 3.67, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.14, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC-CL A', easyScore: 4, avgWeight: 2.33, proScore: 0.55, coverage: 0.235,
      price: 348.13, weeklyPrices: [346.13, 345.29, 343.71, 337.39, 348.13], weeklyChange: 0.58, dayChange: 3.18, sortRank: 0, periodReturns: { '1M': -8.5, 'YTD': 11.2, '6M': 11, '1Y': 97.5 },
      priceHistory: { '1D': [337.39, 348.39, 348.13], '1W': [346.13, 345.29, 343.71, 337.39, 348.13], '1M': [380.34, 376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68, 369.35, 373.25, 363.79, 368.03, 349.68, 346.13, 345.29, 343.71, 337.39, 348.13], 'YTD': [313, 325.44, 332.78, 327.93, 338, 331.25, 309, 314.98, 311.76, 298.52, 302.28, 301, 274.34, 295.77, 317.24, 341.68, 344.4, 385.69, 400.8, 396.78, 382.97, 380.34, 368.53, 359.68, 349.68, 348.13], '6M': [313.56, 314.34, 335.97, 328.38, 336.01, 333.04, 310.96, 302.85, 307.38, 300.88, 303.55, 307.13, 280.92, 297.39, 318.49, 336.02, 338.89, 384.8, 397.99, 401.07, 387.66, 380.34, 368.53, 359.68, 349.68, 348.13], '1Y': [176.23, 174.36, 182, 191.34, 195.75, 194.67, 201, 203.5, 208.49, 211.35, 239.63, 251.16, 251.66, 243.1, 245.76, 245.45, 256.55, 269.27, 283.72, 290.1, 285.02, 318.58, 315.81, 317.08, 306.57, 314.35, 313.85, 321.98, 335.84, 330.54, 338.25, 331.25, 309, 314.98, 311.76, 298.52, 303.55, 307.13, 280.92, 295.77, 317.24, 341.68, 344.4, 385.69, 400.8, 396.78, 387.66, 380.34, 368.53, 359.68, 349.68, 348.13] },
      velocityScore: { '1D': -3.5, '1W': -6.8, '1M': -86.8, '6M': null }, isNew: false,
      marketCap: '$4.2T', pe: 26.5, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.26,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 0.48, MARS: false, FRWD: 3.17, BCTK: false, FWD: 1.53, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 4.16, XMMO: false },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 3, avgWeight: 5.23, proScore: 0.92, coverage: 0.176,
      price: 384.25, weeklyPrices: [381.61, 375.53, 375.12, 379.71, 384.25], weeklyChange: 0.69, dayChange: 1.2, sortRank: 0, periodReturns: { '1M': -11.8, 'YTD': -14.6, '6M': -16.4, '1Y': 21 },
      priceHistory: { '1D': [379.71, 385.36, 384.25], '1W': [381.61, 375.53, 375.12, 379.71, 384.25], '1M': [435.79, 415.88, 423.74, 423.7, 418.45, 391, 408.95, 396.68, 381.59, 399.15, 406.43, 411.15, 404.66, 396.38, 400.49, 405.05, 381.61, 375.53, 375.12, 379.71, 384.25], 'YTD': [449.72, 435.8, 438.57, 449.06, 430.41, 397.21, 417.07, 411.82, 402.51, 396.73, 391.2, 367.96, 361.83, 360.59, 348.95, 400.62, 376.3, 390.82, 428.35, 422.24, 426.01, 435.79, 391, 406.43, 405.05, 384.25], '6M': [459.64, 432.96, 447.2, 431.44, 431.46, 406.01, 428.27, 411.71, 408.58, 405.55, 395.01, 380.3, 372.11, 381.26, 345.62, 388.9, 373.72, 381.63, 411.79, 443.3, 417.85, 435.79, 391, 406.43, 405.05, 384.25], '1Y': [317.66, 297.81, 310.78, 332.11, 321.2, 308.72, 339.03, 335.16, 346.6, 329.36, 346.97, 421.62, 425.85, 444.72, 433.09, 429.24, 447.43, 452.42, 468.37, 445.23, 408.92, 417.78, 429.24, 445.17, 489.88, 485.56, 454.43, 431.41, 439.2, 449.36, 416.56, 397.21, 417.07, 411.82, 402.51, 396.73, 395.01, 380.3, 372.11, 360.59, 348.95, 400.62, 376.3, 390.82, 428.35, 422.24, 417.85, 435.79, 391, 406.43, 405.05, 384.25] },
      velocityScore: { '1D': 0, '1W': null, '1M': -82.2, '6M': null }, isNew: false,
      marketCap: '$1.4T', pe: 349.3, revenueGrowth: 16, eps: 1.1, grossMargin: 19, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 9.54, MARS: false, FRWD: false, BCTK: 3.14, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
    {
      ticker: 'DELL', name: 'DELL', easyScore: 3, avgWeight: 4.78, proScore: 0.84, coverage: 0.176,
      price: 392.26, weeklyPrices: [427.78, 434.06, 409.45, 399.49, 392.26], weeklyChange: -8.3, dayChange: -0.47, sortRank: 0, periodReturns: { '1M': -6.8, 'YTD': 211.6, '6M': 207.8, '1Y': 220 },
      priceHistory: { '1D': [394.1, 388.45, 392.26], '1W': [427.78, 434.06, 409.45, 399.49, 392.26], '1M': [420.91, 465.96, 435.31, 421.08, 422.05, 394.39, 400.77, 381.78, 369.83, 391.45, 395.57, 409.07, 404.08, 419.32, 409.5, 418.71, 427.78, 434.06, 409.45, 399.49, 392.26], 'YTD': [125.88, 118.5, 119.66, 115.43, 114.44, 115.39, 112.82, 122.27, 148.08, 146.48, 151.62, 157.67, 171.81, 174.37, 177.8, 196.55, 216.09, 210.17, 260.46, 241.99, 295.19, 420.91, 394.39, 395.57, 418.71, 392.26], '6M': [127.46, 123.93, 119.66, 113.26, 117.32, 122.04, 124.16, 119.06, 121.45, 146.52, 149.91, 156.76, 175.82, 169.38, 181.46, 193.09, 212.14, 208.95, 230.27, 247.89, 252.8, 420.91, 394.39, 395.57, 418.71, 392.26], '1Y': [122.6, 124.39, 125.69, 124.33, 133.51, 130.48, 138.32, 138.13, 131.01, 120.96, 121.29, 127.68, 134.34, 141.77, 150.87, 148.77, 147.87, 162.19, 160.11, 142.69, 122.48, 127.22, 135.95, 138.22, 133.75, 127.62, 127.92, 120.07, 118.69, 117.17, 118.49, 115.39, 112.82, 122.27, 148.08, 146.48, 149.91, 156.76, 175.82, 174.37, 177.8, 196.55, 216.09, 210.17, 260.46, 241.99, 252.8, 420.91, 394.39, 395.57, 418.71, 392.26] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$253B', pe: 31.3, revenueGrowth: 88, eps: 12.54, grossMargin: 19, dividendYield: 0.63,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: 2.91, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: 4.38, WGMI: false, CNEQ: false, SGRT: 7.04, SPMO: false, XMMO: false },
      tonyNote: 'DELL appears in 3 of 17 Broad Tech ETFs (18% coverage) with average weight 4.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 3, avgWeight: 4.37, proScore: 0.77, coverage: 0.176,
      price: 116.22, weeklyPrices: [116.70, 113.50, 107.27, 112.93, 116.22], weeklyChange: -0.41, dayChange: 2.92, sortRank: 0, periodReturns: { '1M': -25.8, 'YTD': -34.6, '6M': -36.9, '1Y': -14.7 },
      priceHistory: { '1D': [112.93, 116.83, 116.22], '1W': [116.7, 113.5, 107.27, 112.93, 116.22], '1M': [156.54, 160.65, 152.17, 142.2, 141.7, 135.53, 136.47, 132.07, 130.21, 131.08, 127.99, 134.71, 133.25, 130.63, 128.47, 119.5, 116.7, 113.5, 107.27, 112.93, 116.22], 'YTD': [177.75, 176.86, 177.07, 169.6, 146.59, 130.01, 129.13, 135.24, 137.19, 157.16, 150.95, 150.68, 143.06, 148.46, 128.06, 146.39, 143.09, 144.07, 137.8, 133.99, 136.88, 156.54, 135.53, 127.99, 119.5, 116.22], '6M': [184.18, 179.71, 178.96, 165.33, 157.35, 139.54, 135.68, 134.89, 135.94, 152.67, 153.5, 155.68, 147.56, 146.49, 130.49, 142.76, 141.57, 139.11, 137.05, 133.73, 137.41, 156.54, 135.53, 127.99, 119.5, 116.22], '1Y': [136.32, 139.71, 148.58, 149.07, 156.24, 173.27, 182.68, 174.03, 157.17, 157.09, 162.36, 170.26, 182.55, 182.42, 182.17, 179.74, 181.59, 189.18, 207.18, 193.61, 171.25, 162.25, 170.69, 181.84, 187.75, 194.13, 180.84, 181.68, 178.4, 165.9, 151.86, 130.01, 129.13, 135.24, 137.19, 157.16, 153.5, 155.68, 147.56, 148.46, 128.06, 146.39, 143.09, 144.07, 137.8, 133.99, 137.41, 156.54, 135.53, 127.99, 119.5, 116.22] },
      velocityScore: { '1D': null, '1W': -13.5, '1M': -66.8, '6M': null }, isNew: true,
      marketCap: '$279B', pe: 130.6, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 7.67, FDTX: 2.87, GTEK: false, ARKK: 2.56, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'LITE', name: 'Lumentum Holdings Inc', easyScore: 3, avgWeight: 4.32, proScore: 0.76, coverage: 0.176,
      price: 803.25, weeklyPrices: [827.92, 842.53, 861.97, 816.98, 803.25], weeklyChange: -2.98, dayChange: -1.68, sortRank: 0, periodReturns: { '1M': -6, 'YTD': 117.9, '6M': 115.6, '1Y': 745 },
      priceHistory: { '1D': [816.98, 801.59, 803.25], '1W': [827.92, 842.53, 861.97, 816.98, 803.25], '1M': [854.96, 905, 1029.15, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93, 827.92, 842.53, 861.97, 816.98, 803.25], 'YTD': [368.59, 348.26, 343.27, 339.19, 391.84, 504.42, 583.46, 667.77, 700.91, 558.44, 622.5, 706.35, 702.73, 826.88, 897.3, 894.07, 881.64, 949.93, 903.8, 970.7, 946.9, 854.96, 863.66, 921.56, 893.93, 803.25], '6M': [372.61, 397.42, 361.33, 362.44, 385, 465.54, 574.11, 635.64, 677, 650.82, 616.09, 772.13, 688.8, 764.65, 894.13, 891.22, 846.89, 902.32, 892.58, 1001.81, 964.5, 854.96, 863.66, 921.56, 893.93, 803.25], '1Y': [95.06, 91.31, 98.14, 99.63, 109.48, 108.15, 115.03, 118.98, 123.42, 132.55, 151.73, 170.9, 163.99, 162.71, 157.15, 156.78, 161, 193.8, 199.58, 259.89, 242.07, 299.36, 302.81, 360.33, 316.15, 387.41, 371.18, 392.88, 331.62, 354.49, 381.44, 504.42, 583.46, 667.77, 700.91, 558.44, 616.09, 772.13, 688.8, 826.88, 897.3, 894.07, 881.64, 949.93, 903.8, 970.7, 964.5, 854.96, 863.66, 921.56, 893.93, 803.25] },
      velocityScore: { '1D': -16.5, '1W': -15.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$62B', pe: 140.4, revenueGrowth: 90, eps: 5.72, grossMargin: 41, dividendYield: null,
      etfPresence: { PTF: 3.61, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 1.4, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: 7.95, SPMO: false, XMMO: false },
      tonyNote: 'Lumentum Holdings Inc appears in 3 of 17 Broad Tech ETFs (18% coverage) with average weight 4.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'BE', name: 'Bloom Energy Corp', easyScore: 4, avgWeight: 2.96, proScore: 2.37, coverage: 0.8,
      price: 273.83, weeklyPrices: [321.98, 326.19, 309.18, 252.02, 273.83], weeklyChange: -14.96, dayChange: 8.17, sortRank: 0, periodReturns: { '1M': -3.9, 'YTD': 215.1, '6M': 209.7, '1Y': 1044.8 },
      priceHistory: { '1D': [253.14, 273.95, 273.83], '1W': [321.98, 326.19, 309.18, 252.02, 273.83], '1M': [285, 273.51, 302.85, 287.32, 291.37, 263.61, 253.57, 259.61, 234.23, 248.88, 260.22, 274.5, 280.88, 284.99, 328.91, 345.85, 321.98, 326.19, 309.18, 252.02, 273.83], 'YTD': [86.89, 121.84, 139.17, 144.89, 151.37, 136.6, 139.03, 147.55, 155.67, 135.19, 154.51, 150.12, 133.24, 135.63, 166.7, 207.86, 231.17, 290.52, 261.03, 275.95, 302.49, 285, 263.61, 260.22, 345.85, 273.83], '6M': [88.41, 103.05, 139.77, 150.56, 165.39, 147.35, 155.54, 159, 168.57, 159.99, 157.17, 166.69, 133.52, 132.45, 160.13, 210.06, 237.57, 283.36, 258.64, 303.41, 307.88, 285, 263.61, 260.22, 345.85, 273.83], '1Y': [23.92, 24.3, 25.31, 25.93, 34.75, 37.61, 37.65, 46.5, 49.35, 51.35, 55, 73.29, 77.38, 84.57, 86.06, 114.06, 109.06, 108.53, 142.37, 139.23, 107.11, 95.56, 105, 109.44, 87.61, 91.43, 87.26, 108, 133.46, 145.63, 156.51, 136.6, 139.03, 147.55, 155.67, 135.19, 157.17, 166.69, 133.52, 135.63, 166.7, 207.86, 231.17, 290.52, 261.03, 275.95, 307.88, 285, 263.61, 260.22, 345.85, 273.83] },
      velocityScore: { '1D': -16.8, '1W': -19.4, '1M': -12.5, '6M': null }, isNew: false,
      marketCap: '$78B', pe: null, revenueGrowth: 130, eps: -0.05, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: 1.47, VOLT: 3.54, PBD: false, PBW: 2.22, IVEP: 4.63 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 4, avgWeight: 2.54, proScore: 2.03, coverage: 0.8,
      price: 519.29, weeklyPrices: [509.96, 518.18, 536.04, 517.02, 519.29], weeklyChange: 1.83, dayChange: 0.56, sortRank: 0, periodReturns: { '1M': 9.6, 'YTD': 16.9, '6M': 15, '1Y': 27.2 },
      priceHistory: { '1D': [516.42, 516.29, 519.29], '1W': [509.96, 518.18, 536.04, 517.02, 519.29], '1M': [473.61, 462.93, 480.46, 484.91, 485.27, 476.82, 485.03, 486.47, 467.59, 469.32, 476.89, 489.73, 502.65, 508.87, 523.69, 539.39, 509.96, 518.18, 536.04, 517.02, 519.29], 'YTD': [444.11, 460.87, 484.11, 485.53, 487.94, 487.4, 516.02, 526.73, 511.63, 471.54, 467.38, 475.74, 480.97, 494.25, 536.01, 535.57, 553.07, 508.43, 492.58, 479.97, 475.01, 473.61, 476.82, 476.89, 539.39, 519.29], '6M': [451.39, 477.46, 481.68, 482.5, 485.73, 487.16, 516.03, 526.56, 524.19, 476.51, 468.41, 492.65, 481.67, 500.38, 534.67, 521.71, 557.85, 508.17, 493.04, 482.03, 460.98, 473.61, 476.82, 476.89, 539.39, 519.29], '1Y': [408.41, 412.5, 414.86, 428.55, 427.33, 427.67, 417.54, 432.22, 437.56, 430.15, 437.24, 435.44, 435.23, 430.31, 412.93, 427.43, 431.65, 433.98, 467.61, 462.28, 420.57, 424.08, 427.48, 438.7, 438.42, 455.92, 446.61, 468.2, 476.06, 484.06, 497.97, 487.4, 516.02, 526.73, 511.63, 471.54, 468.41, 492.65, 481.67, 494.25, 536.01, 535.57, 553.07, 508.43, 492.58, 479.97, 460.98, 473.61, 476.82, 476.89, 539.39, 519.29] },
      velocityScore: { '1D': 11.5, '1W': 15.3, '1M': 8.6, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 30.7, revenueGrowth: 11, eps: 16.91, grossMargin: 36, dividendYield: 1.1,
      etfPresence: { POW: 2.97, VOLT: 3.45, PBD: 1.12, PBW: false, IVEP: 2.63 },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 3, avgWeight: 4.8, proScore: 2.88, coverage: 0.6,
      price: 700.74, weeklyPrices: [702.29, 701.88, 718.59, 687.87, 700.74], weeklyChange: -0.22, dayChange: 1.94, sortRank: 0, periodReturns: { '1M': -1.5, 'YTD': 66, '6M': 62.6, '1Y': 85.3 },
      priceHistory: { '1D': [687.38, 701.78, 700.74], '1W': [702.29, 701.88, 718.59, 687.87, 700.74], '1M': [711.73, 687.48, 706.06, 715.67, 719.17, 695.11, 693.81, 691.95, 650.92, 683.29, 707.74, 724.35, 719.29, 714.85, 702.25, 740.14, 702.29, 701.88, 718.59, 687.87, 700.74], 'YTD': [422.06, 413.17, 447.64, 468.76, 474.63, 477.72, 515.88, 552.66, 563.08, 540.19, 559.02, 555.39, 549.98, 560.63, 585.36, 601.88, 624.84, 742.21, 745, 769.99, 723.44, 711.73, 695.11, 707.74, 740.14, 700.74], '6M': [431.03, 438.22, 444.2, 473.24, 481.28, 464.57, 523.96, 554, 565.05, 549.22, 566.91, 577.95, 545.64, 560.12, 582.06, 587.42, 633.44, 727.77, 750.73, 780.08, 716.91, 711.73, 695.11, 707.74, 740.14, 700.74], '1Y': [378.08, 377.56, 386.54, 394.93, 410.99, 389.12, 384.12, 383.32, 378.31, 374.68, 373.47, 378.24, 389.53, 414.42, 421.51, 431.6, 440.74, 441.82, 450.82, 450.38, 426.87, 442.64, 454.72, 457.96, 438.49, 435.2, 428.81, 436.89, 437.07, 468.78, 483.43, 477.72, 515.88, 552.66, 563.08, 540.19, 566.91, 577.95, 545.64, 560.63, 585.36, 601.88, 624.84, 742.21, 745, 769.99, 716.91, 711.73, 695.11, 707.74, 740.14, 700.74] },
      velocityScore: { '1D': -1, '1W': 2.5, '1M': -12.2, '6M': null }, isNew: false,
      marketCap: '$105B', pe: 96.1, revenueGrowth: 26, eps: 7.29, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.96, VOLT: 5.2, PBD: false, PBW: false, IVEP: 4.25 },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 3, avgWeight: 4.57, proScore: 2.74, coverage: 0.6,
      price: 284.68, weeklyPrices: [291.50, 294.49, 309.20, 279.77, 284.68], weeklyChange: -2.34, dayChange: 1.76, sortRank: 0, periodReturns: { '1M': 0.1, 'YTD': 167.9, '6M': 154.3, '1Y': 305.8 },
      priceHistory: { '1D': [279.77, 284.94, 284.68], '1W': [291.5, 294.49, 309.2, 279.77, 284.68], '1M': [284.42, 288.12, 299.07, 299.73, 300.06, 284.87, 293.6, 283.51, 262.34, 290.5, 294.75, 303.53, 292.7, 294.03, 297.2, 307.8, 291.5, 294.49, 309.2, 279.77, 284.68], 'YTD': [106.26, 119.94, 135.18, 139.32, 147.86, 179.6, 197.63, 182.27, 174.53, 161.22, 167.57, 172, 179.35, 182.6, 230.94, 241.01, 252.76, 275.33, 309.39, 292.65, 279.22, 284.42, 284.87, 294.75, 307.8, 284.68], '6M': [111.96, 120, 133.04, 140.62, 147.81, 175.77, 197.45, 178.79, 176.96, 167.67, 171.19, 175.13, 174.8, 184.68, 230.81, 232.81, 252.18, 277.27, 305.93, 296.98, 270.75, 284.42, 284.87, 294.75, 307.8, 284.68], '1Y': [70.15, 72.14, 70.37, 73.67, 77.77, 78.75, 88.28, 86.57, 86.12, 87.92, 92.3, 99.41, 97.41, 101.6, 104.42, 105.73, 116.4, 124.71, 130.23, 124.62, 105.94, 100.03, 107.5, 115.02, 110.88, 112.88, 109.16, 118.62, 133.76, 142.29, 152.31, 179.6, 197.63, 182.27, 174.53, 161.22, 171.19, 175.13, 174.8, 182.6, 230.94, 241.01, 252.76, 275.33, 309.39, 292.65, 270.75, 284.42, 284.87, 294.75, 307.8, 284.68] },
      velocityScore: { '1D': -6.2, '1W': -1.1, '1M': -41.5, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 55.5, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { POW: 4.79, VOLT: 7.01, PBD: false, PBW: 1.92, IVEP: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 3, avgWeight: 4.4, proScore: 2.64, coverage: 0.6,
      price: 406.24, weeklyPrices: [405.28, 404.59, 419.87, 402.68, 406.24], weeklyChange: 0.24, dayChange: 0.93, sortRank: 0, periodReturns: { '1M': 1.4, 'YTD': 27.5, '6M': 26.4, '1Y': 13.8 },
      priceHistory: { '1D': [402.48, 405.4, 406.24], '1W': [405.28, 404.59, 419.87, 402.68, 406.24], '1M': [400.6, 400.08, 417.62, 421.21, 418.61, 395.94, 403.14, 401.72, 375.46, 393.64, 391.39, 407.06, 407.71, 409.64, 421.77, 435.78, 405.28, 404.59, 419.87, 402.68, 406.24], 'YTD': [318.51, 320.58, 333.46, 331.22, 351.42, 354.67, 390.33, 373.38, 375.92, 347.75, 355.4, 356.8, 357.36, 361.1, 403, 406.21, 423.92, 425.55, 401.51, 399.44, 391.35, 400.6, 395.94, 391.39, 435.78, 406.24], '6M': [321.45, 332.97, 332.38, 337.96, 347.32, 365, 396.09, 377.32, 374.59, 354.79, 348.64, 360.23, 357.1, 365.56, 400.44, 392.73, 424.5, 433.01, 399.15, 408.1, 381.51, 400.6, 395.94, 391.39, 435.78, 406.24], '1Y': [356.99, 356.98, 362.11, 372.65, 390.01, 356.45, 360.11, 353.5, 345.76, 343.75, 348.23, 371.19, 368.52, 374.25, 370.94, 374.35, 377.69, 379.74, 386.57, 379.57, 342.75, 330.43, 333.11, 341.76, 329.93, 322.81, 320.86, 322.67, 331.14, 334.04, 354.37, 354.67, 390.33, 373.38, 375.92, 347.75, 348.64, 360.23, 357.1, 361.1, 403, 406.21, 423.92, 425.55, 401.51, 399.44, 381.51, 400.6, 395.94, 391.39, 435.78, 406.24] },
      velocityScore: { '1D': -0.8, '1W': -0.4, '1M': -14.6, '6M': null }, isNew: false,
      marketCap: '$158B', pe: 39.7, revenueGrowth: 17, eps: 10.23, grossMargin: 37, dividendYield: 1.09,
      etfPresence: { POW: 4.03, VOLT: 5.22, PBD: false, PBW: false, IVEP: 3.95 },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 3, avgWeight: 3.88, proScore: 2.33, coverage: 0.6,
      price: 1081.34, weeklyPrices: [1034.98, 1057.65, 1085.47, 1045.17, 1081.34], weeklyChange: 4.48, dayChange: 3.72, sortRank: 0, periodReturns: { '1M': 11.7, 'YTD': 65.5, '6M': 63, '1Y': 104.4 },
      priceHistory: { '1D': [1042.51, 1080, 1081.34], '1W': [1034.98, 1057.65, 1085.47, 1045.17, 1081.34], '1M': [968.32, 950.54, 969.67, 959.36, 963.33, 933.61, 933.85, 920.15, 867.09, 906.79, 940.66, 979.07, 982.35, 1048.86, 1109.73, 1127.59, 1034.98, 1057.65, 1085.47, 1045.17, 1081.34], 'YTD': [653.57, 628.4, 642.23, 657.78, 726.37, 737.53, 816.56, 830.34, 873.6, 789.23, 805.02, 851.07, 853.16, 898.57, 991.32, 1002.75, 1149.19, 1062.95, 1040.15, 1049.23, 1038.74, 968.32, 933.61, 940.66, 1127.59, 1081.34], '6M': [663.46, 686.33, 652.09, 667.89, 711.59, 746.22, 823.67, 834.61, 876.46, 815.01, 832.11, 877.39, 873.12, 894.78, 968.02, 978.32, 1149.53, 1083.46, 1045.63, 1090.53, 1043.82, 968.32, 933.61, 940.66, 1127.59, 1081.34], '1Y': [529.15, 530, 559.61, 548.99, 632.67, 649.72, 650.76, 625.02, 602.31, 579.68, 605.7, 617.91, 633.41, 614.9, 606.12, 644.41, 594.07, 584.39, 581.26, 579.8, 577.02, 580.49, 601.58, 625.3, 686.22, 661.45, 659.64, 662.32, 644.18, 661.67, 717.39, 737.53, 816.56, 830.34, 873.6, 789.23, 832.11, 877.39, 873.12, 898.57, 991.32, 1002.75, 1149.19, 1062.95, 1040.15, 1049.23, 1043.82, 968.32, 933.61, 940.66, 1127.59, 1081.34] },
      velocityScore: { '1D': -0.4, '1W': -2.1, '1M': -2.1, '6M': null }, isNew: false,
      marketCap: '$291B', pe: 31.6, revenueGrowth: 16, eps: 34.18, grossMargin: 20, dividendYield: 0.19,
      etfPresence: { POW: 3.27, VOLT: 4.2, PBD: false, PBW: false, IVEP: 4.18 },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 3, avgWeight: 3.62, proScore: 2.17, coverage: 0.6,
      price: 88.73, weeklyPrices: [86.43, 87.62, 87.70, 88.56, 88.73], weeklyChange: 2.67, dayChange: 0.55, sortRank: 0, periodReturns: { '1M': 2, 'YTD': 10.5, '6M': 10.5, '1Y': 27.8 },
      priceHistory: { '1D': [88.25, 88.73, 88.73], '1W': [86.43, 87.62, 87.7, 88.56, 88.73], '1M': [87.01, 83.66, 85.68, 84.58, 85.68, 85.84, 84.01, 84.83, 85.12, 84.84, 85.99, 86.12, 86.23, 85.73, 86.75, 86.08, 86.43, 87.62, 87.7, 88.56, 88.73], 'YTD': [80.28, 79.49, 82.19, 84.81, 87.9, 89.21, 91.93, 92.18, 93.77, 91.02, 92.78, 89.5, 91.4, 93.15, 94.08, 91.98, 95.28, 96.95, 93.1, 93.36, 88.55, 87.01, 85.84, 85.99, 86.08, 88.73], '6M': [80.27, 81.05, 81.64, 83.85, 87.57, 89.97, 91.36, 91.64, 91.99, 91.13, 91.73, 92.41, 91.16, 92.85, 94.48, 91.83, 96.25, 97.88, 93.32, 95.68, 89.69, 87.01, 85.84, 85.99, 86.08, 88.73], '1Y': [69.42, 72.46, 74.7, 77.54, 71.95, 71.18, 72.45, 75.72, 75.32, 72.65, 70.07, 69.83, 72.32, 75.49, 83.21, 84.64, 84.77, 86.03, 81.78, 84.77, 85.75, 84.23, 84.58, 79.64, 81.32, 79.79, 80.53, 78.37, 81.98, 85.07, 88.18, 89.21, 91.93, 92.18, 93.77, 91.02, 91.73, 92.41, 91.16, 93.15, 94.08, 91.98, 95.28, 96.95, 93.1, 93.36, 89.69, 87.01, 85.84, 85.99, 86.08, 88.73] },
      velocityScore: { '1D': 4.3, '1W': 5.9, '1M': -7.3, '6M': null }, isNew: false,
      marketCap: '$185B', pe: 22.5, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.81,
      etfPresence: { POW: 2.1, VOLT: 5.04, PBD: false, PBW: false, IVEP: 3.72 },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 3, avgWeight: 3.31, proScore: 1.99, coverage: 0.6,
      price: 165.35, weeklyPrices: [168.37, 167.55, 171.91, 162.92, 165.35], weeklyChange: -1.79, dayChange: 1.58, sortRank: 0, periodReturns: { '1M': -1, 'YTD': 62.2, '6M': 60.1, '1Y': 125.7 },
      priceHistory: { '1D': [162.78, 164.35, 165.35], '1W': [168.37, 167.55, 171.91, 162.92, 165.35], '1M': [166.99, 171.55, 173.39, 176.39, 173.88, 162.86, 163.81, 163.8, 156.79, 164.52, 165.84, 169, 167.34, 170.94, 177.02, 184.34, 168.37, 167.55, 171.91, 162.92, 165.35], 'YTD': [101.97, 102.72, 107.98, 110.29, 112.26, 113.87, 111.9, 116.87, 118.36, 106.02, 109.93, 116.3, 116.98, 117.96, 130.56, 134.69, 142.17, 158.92, 169.95, 169.01, 164.66, 166.99, 162.86, 165.84, 184.34, 165.35], '6M': [103.26, 110.09, 106.64, 112.66, 114.15, 116.69, 112.75, 116.88, 121.79, 110.55, 107.87, 122.58, 118.44, 121.26, 128.63, 129.7, 142.76, 142.9, 166.73, 173.96, 163.57, 166.99, 162.86, 165.84, 184.34, 165.35], '1Y': [73.25, 74.2, 74.55, 74.63, 79.72, 89.73, 88.76, 89.41, 89.4, 89.48, 91.44, 96.2, 97.7, 98.64, 96, 99.51, 100.23, 103.91, 112.36, 112.33, 104.09, 104.1, 105.36, 107.42, 102.41, 103.97, 103.01, 106.48, 104.54, 111.57, 115.62, 113.87, 111.9, 116.87, 118.36, 106.02, 107.87, 122.58, 118.44, 117.96, 130.56, 134.69, 142.17, 158.92, 169.95, 169.01, 163.57, 166.99, 162.86, 165.84, 184.34, 165.35] },
      velocityScore: { '1D': -2, '1W': -2.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 56.4, revenueGrowth: 54, eps: 2.93, grossMargin: 37, dividendYield: 0.52,
      etfPresence: { POW: 3.78, VOLT: 2.98, PBD: false, PBW: false, IVEP: 3.17 },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'NRG', name: 'NRG Energy Inc', easyScore: 3, avgWeight: 1.4, proScore: 0.84, coverage: 0.6,
      price: 148.01, weeklyPrices: [137.66, 142.21, 147.11, 149.36, 148.01], weeklyChange: 7.52, dayChange: -0.84, sortRank: 0, periodReturns: { '1M': 10.4, 'YTD': -7, '6M': -8, '1Y': -7.8 },
      priceHistory: { '1D': [149.26, 148.2, 148.01], '1W': [137.66, 142.21, 147.11, 149.36, 148.01], '1M': [134.08, 129.47, 133.51, 133.76, 133.39, 129.2, 127.71, 129.96, 120.65, 123.7, 125.47, 130.4, 132.1, 132.13, 135.06, 138.91, 137.66, 142.21, 147.11, 149.36, 148.01], 'YTD': [159.24, 143.53, 158.5, 149.3, 152.63, 144.44, 161.8, 179.18, 178.96, 154.32, 152.87, 145.8, 147.74, 152.69, 164.07, 167.73, 159.81, 153.37, 138.11, 127.81, 137.65, 134.08, 129.2, 125.47, 138.91, 148.01], '6M': [160.96, 159.63, 150.59, 150.68, 155.11, 143.99, 160.63, 175.01, 181.34, 160.46, 152.1, 161.4, 146.14, 149.9, 161.78, 168.5, 154.53, 155.58, 141.86, 134.72, 136.92, 134.08, 129.2, 125.47, 138.91, 148.01], '1Y': [160.58, 151.27, 146.88, 153.96, 159.87, 171.96, 152.03, 150.44, 144.77, 145.11, 152.26, 164.22, 167.43, 161.95, 162.61, 165.61, 167.01, 172.59, 174.48, 166.72, 163.21, 166.85, 164.08, 166.75, 160.15, 158.11, 160.43, 148.91, 149.83, 151.09, 153.72, 144.44, 161.8, 179.18, 178.96, 154.32, 152.1, 161.4, 146.14, 152.69, 164.07, 167.73, 159.81, 153.37, 138.11, 127.81, 136.92, 134.08, 129.2, 125.47, 138.91, 148.01] },
      velocityScore: { '1D': 5, '1W': 15.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$31B', pe: 162.7, revenueGrowth: 20, eps: 0.91, grossMargin: 16, dividendYield: 1.27,
      etfPresence: { POW: 0.55, VOLT: 1.07, PBD: false, PBW: false, IVEP: 2.58 },
      tonyNote: 'NRG Energy Inc appears in 3 of 5 Electrification ETFs (60% coverage) with average weight 1.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, avgWeight: 5.97, proScore: 2.39, coverage: 0.4,
      price: 309.15, weeklyPrices: [288.64, 294.15, 310.32, 310.64, 309.15], weeklyChange: 7.11, dayChange: -0.48, sortRank: 0, periodReturns: { '1M': 12.6, 'YTD': 82.2, '6M': 77.3, '1Y': 216.5 },
      priceHistory: { '1D': [310.64, 308, 309.15], '1W': [288.64, 294.15, 310.32, 310.64, 309.15], '1M': [274.52, 269.86, 269.22, 280.09, 276.54, 262.56, 279.13, 276.04, 276.95, 296.55, 293.87, 302.15, 293.22, 299.84, 296.39, 304.33, 288.64, 294.15, 310.32, 310.64, 309.15], 'YTD': [169.63, 180.24, 196.61, 196.5, 201.19, 208, 231.48, 235.04, 229.71, 191.87, 197.65, 204.09, 203.53, 204.65, 235.73, 254.25, 276.65, 283.6, 297.98, 256.72, 270.01, 274.52, 262.56, 293.87, 304.33, 309.15], '6M': [174.34, 184, 193.82, 201.8, 207.78, 211.58, 238.4, 230.06, 232.12, 202.58, 195.18, 214.95, 204.11, 203.04, 235, 241.49, 268.31, 275.84, 290.46, 268.73, 260.4, 274.52, 262.56, 293.87, 304.33, 309.15], '1Y': [97.69, 101.2, 98.24, 106, 130.49, 131.71, 128.22, 131.57, 137.03, 135.97, 143.15, 148.78, 146.79, 141.02, 141.25, 147.14, 147.96, 155.89, 158.57, 166.99, 141.86, 145.88, 161.55, 167.43, 171.76, 177.23, 172.95, 181.03, 192.96, 200.29, 210.44, 208, 231.48, 235.04, 229.71, 191.87, 195.18, 214.95, 204.11, 204.65, 235.73, 254.25, 276.65, 283.6, 297.98, 256.72, 260.4, 274.52, 262.56, 293.87, 304.33, 309.15] },
      velocityScore: { '1D': 3.5, '1W': 8.6, '1M': -44, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 74.3, revenueGrowth: 17, eps: 4.16, grossMargin: 39, dividendYield: 0.09,
      etfPresence: { POW: 3.86, VOLT: 8.08, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, avgWeight: 3.61, proScore: 1.44, coverage: 0.4,
      price: 138.82, weeklyPrices: [133.74, 134.96, 137.00, 138.69, 138.82], weeklyChange: 3.8, dayChange: 0.1, sortRank: 0, periodReturns: { '1M': 9.6, 'YTD': 20.4, '6M': 19.9, '1Y': 33.8 },
      priceHistory: { '1D': [138.69, 138.62, 138.82], '1W': [133.74, 134.96, 137, 138.69, 138.82], '1M': [126.67, 123.79, 127.11, 126.31, 127.79, 129.14, 126.77, 127.76, 128.53, 128.48, 129.23, 129.31, 129.75, 128.27, 127.69, 130.3, 133.74, 134.96, 137, 138.69, 138.82], 'YTD': [115.31, 115.93, 119.4, 116.63, 119.78, 120.61, 126.43, 129.37, 133.82, 131.87, 133.61, 125.66, 130.1, 132.68, 136.3, 133.66, 134.73, 136.91, 130.16, 125.15, 131.59, 126.67, 129.14, 129.23, 130.3, 138.82], '6M': [115.77, 115.04, 116.62, 118.98, 119.12, 119.98, 122.25, 128.42, 132.1, 132.04, 132.22, 128.72, 128.85, 131.67, 137.15, 134.56, 135.08, 137.11, 131.76, 128.6, 129.61, 126.67, 129.14, 129.23, 130.3, 138.82], '1Y': [103.76, 103.96, 104.4, 110.16, 109.22, 113.24, 112, 110.7, 113.01, 110.09, 108.36, 106.84, 108.14, 112.5, 118.16, 118.38, 117.82, 116.39, 119.92, 122.56, 123.72, 122.04, 119.23, 116.07, 114.57, 115.15, 115.99, 113.7, 118.11, 117.18, 119.21, 120.61, 126.43, 129.37, 133.82, 131.87, 132.22, 128.72, 128.85, 132.68, 136.3, 133.66, 134.73, 136.91, 130.16, 125.15, 129.61, 126.67, 129.14, 129.23, 130.3, 138.82] },
      velocityScore: { '1D': 4.3, '1W': 12.5, '1M': -40.5, '6M': null }, isNew: false,
      marketCap: '$76B', pe: 20.6, revenueGrowth: 10, eps: 6.75, grossMargin: 47, dividendYield: 2.74,
      etfPresence: { POW: 2.77, VOLT: 4.44, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 2, avgWeight: 3.17, proScore: 1.27, coverage: 0.4,
      price: 308.32, weeklyPrices: [318.32, 316.43, 325.57, 303.95, 308.32], weeklyChange: -3.14, dayChange: 1.6, sortRank: 0, periodReturns: { '1M': -2.3, 'YTD': 90.3, '6M': 86.2, '1Y': 140.1 },
      priceHistory: { '1D': [303.47, 307.34, 308.32], '1W': [318.32, 316.43, 325.57, 303.95, 308.32], '1M': [315.71, 323.39, 334.49, 331.44, 323.92, 300.51, 300.57, 289.52, 280.98, 297.88, 302.87, 311.93, 299.6, 317.58, 333.05, 357.96, 318.32, 316.43, 325.57, 303.95, 308.32], 'YTD': [162.01, 160.78, 172.54, 182.49, 186.18, 177.75, 236.51, 243.75, 254.89, 241.78, 258.88, 255.88, 251.07, 261.29, 295.11, 307.34, 323.46, 328.31, 339.97, 370.94, 327.46, 315.71, 300.51, 302.87, 357.96, 308.32], '6M': [165.62, 174.95, 172.72, 181.47, 193.76, 182.56, 248.51, 243.06, 259.23, 249.75, 265.38, 269.17, 252.4, 259.37, 287.64, 294.13, 321.75, 328.49, 340.01, 376.23, 323.4, 315.71, 300.51, 302.87, 357.96, 308.32], '1Y': [128.41, 125.89, 127.37, 125.29, 142.7, 138.76, 139.83, 135.69, 125.02, 124.01, 125.58, 136.65, 142.61, 150.86, 158.87, 175.15, 175.73, 192.9, 191.4, 187.84, 166.65, 168.91, 180.91, 178.38, 160.66, 166.26, 164.34, 171.54, 170.86, 181.12, 195.1, 177.75, 236.51, 243.75, 254.89, 241.78, 265.38, 269.17, 252.4, 261.29, 295.11, 307.34, 323.46, 328.31, 339.97, 370.94, 323.4, 315.71, 300.51, 302.87, 357.96, 308.32] },
      velocityScore: { '1D': -3.8, '1W': -5.2, '1M': -33.2, '6M': null }, isNew: false,
      marketCap: '$118B', pe: 77.5, revenueGrowth: 30, eps: 3.98, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 2.36, PBD: false, PBW: false, IVEP: 3.98 },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 2.74, proScore: 1.1, coverage: 0.4,
      price: 76.22, weeklyPrices: [75.79, 75.87, 77.53, 77.92, 76.22], weeklyChange: 0.57, dayChange: -2.18, sortRank: 0, periodReturns: { '1M': 6.8, 'YTD': 26.8, '6M': 27.5, '1Y': 21.4 },
      priceHistory: { '1D': [77.92, 76.79, 76.22], '1W': [75.79, 75.87, 77.53, 77.92, 76.22], '1M': [71.39, 70.04, 71.31, 71.66, 72.43, 71.96, 71.59, 71.59, 72.26, 71.62, 72.08, 71.49, 71.48, 71.25, 73.12, 74.95, 75.79, 75.87, 77.53, 77.92, 76.22], 'YTD': [60.11, 61.15, 60.29, 64.96, 67.26, 67.42, 71.13, 72.98, 74.72, 74.24, 73.34, 72.41, 73.58, 72, 72.74, 71.15, 72.18, 75.54, 71.96, 77.72, 78.47, 71.39, 71.96, 72.08, 74.95, 76.22], '6M': [59.8, 59.5, 60.49, 63.18, 66.92, 66.46, 71.12, 72.17, 74.77, 74.77, 73.52, 74.06, 74.06, 71.83, 72.82, 70.86, 71.65, 76.31, 72.95, 77.69, 77.52, 71.39, 71.96, 72.08, 74.95, 76.22], '1Y': [62.81, 57.69, 58.37, 57.36, 58.89, 59, 58.06, 56.52, 56.83, 57.38, 57.57, 57.95, 61.39, 63.35, 63.97, 62.36, 63.06, 57.67, 59.03, 60.6, 59.91, 59.43, 60.21, 61.55, 58.41, 59.75, 60.16, 60.39, 60.71, 63.72, 67.24, 67.42, 71.13, 72.98, 74.72, 74.24, 73.52, 74.06, 74.06, 72, 72.74, 71.15, 72.18, 75.54, 71.96, 77.72, 77.52, 71.39, 71.96, 72.08, 74.95, 76.22] },
      velocityScore: { '1D': 3.8, '1W': 11.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$93B', pe: 33.4, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.7,
      etfPresence: { POW: false, VOLT: 1.59, PBD: false, PBW: false, IVEP: 3.9 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'APH', name: 'Amphenol Corp', easyScore: 2, avgWeight: 2.73, proScore: 1.09, coverage: 0.4,
      price: 162.95, weeklyPrices: [158.70, 162.78, 165.15, 163.72, 162.95], weeklyChange: 2.68, dayChange: -0.31, sortRank: 0, periodReturns: { '1M': 9.5, 'YTD': 20.6, '6M': 19, '1Y': 65 },
      priceHistory: { '1D': [163.46, 163.76, 162.95], '1W': [158.7, 162.78, 165.15, 163.72, 162.95], '1M': [148.76, 146.34, 148.4, 147.62, 146.77, 138.81, 143.6, 154.07, 149.22, 152.46, 153.8, 158.59, 158.81, 161.11, 163.96, 165.96, 158.7, 162.78, 165.15, 163.72, 162.95], 'YTD': [135.14, 136.25, 154.22, 150.99, 144.08, 127.63, 143.73, 151.04, 146.06, 131.87, 133.92, 126.74, 123.62, 128, 140.75, 151.06, 149.71, 142.3, 128.03, 125, 132.06, 148.76, 138.81, 153.8, 165.96, 162.95], '6M': [136.9, 141.38, 148.97, 154.6, 145.96, 130, 144.04, 151.2, 148.47, 136.24, 131.47, 130.65, 123.13, 127.7, 137.68, 148.96, 150.18, 147.27, 136.62, 129.19, 124.86, 148.76, 138.81, 153.8, 165.96, 162.95], '1Y': [98.75, 97.41, 99.44, 101.78, 105.31, 107.93, 109.81, 111.06, 109.73, 109.25, 116.79, 119.04, 125.4, 123.75, 124.53, 122.64, 127.67, 135.91, 141.55, 143.85, 132.33, 137.88, 141.49, 138.58, 129.13, 137.12, 136.2, 138.91, 146.75, 152.5, 149.58, 127.63, 143.73, 151.04, 146.06, 131.87, 131.47, 130.65, 123.13, 128, 140.75, 151.06, 149.71, 142.3, 128.03, 125, 124.86, 148.76, 138.81, 153.8, 165.96, 162.95] },
      velocityScore: { '1D': 2.8, '1W': 1.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$200B', pe: 46.7, revenueGrowth: 58, eps: 3.49, grossMargin: 38, dividendYield: 0.61,
      etfPresence: { POW: 1.03, VOLT: 4.42, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, avgWeight: 2.69, proScore: 1.08, coverage: 0.4,
      price: 356.62, weeklyPrices: [364.96, 359.61, 375.15, 348.11, 356.62], weeklyChange: -2.29, dayChange: 2.44, sortRank: 0, periodReturns: { '1M': 18, 'YTD': 70.3, '6M': 64.1, '1Y': 169.1 },
      priceHistory: { '1D': [348.11, 354.29, 356.62], '1W': [364.96, 359.61, 375.15, 348.11, 356.62], '1M': [302.18, 294.65, 312.28, 322.5, 320.92, 294.81, 306.11, 311.64, 308.17, 340.4, 354.37, 370.66, 350.45, 353.32, 372.59, 388.23, 364.96, 359.61, 375.15, 348.11, 356.62], 'YTD': [209.37, 210.99, 257.29, 262.19, 255.36, 257.64, 312.95, 331.23, 335.57, 290.78, 302.02, 317.21, 310.76, 332.31, 379.64, 375.6, 387.24, 389.05, 357.24, 323.46, 324.86, 302.18, 294.81, 354.37, 388.23, 356.62], '6M': [217.26, 229.7, 233.92, 269, 263.76, 254.54, 308.77, 320.64, 337.35, 311.42, 305.82, 327.8, 313.11, 332.82, 374.98, 372.23, 382.47, 383.91, 351.94, 344.6, 323.79, 302.18, 294.81, 354.37, 388.23, 356.62], '1Y': [132.5, 138.07, 139.1, 140.68, 142.21, 139.58, 151.61, 153.23, 153.01, 145.49, 154.76, 158.03, 176.59, 170.14, 173.09, 182.75, 197.44, 205.12, 205.61, 219.3, 198.54, 206.04, 210.94, 221.27, 215.16, 217.51, 213.41, 224.4, 237.9, 275.57, 269.12, 257.64, 312.95, 331.23, 335.57, 290.78, 305.82, 327.8, 313.11, 332.31, 379.64, 375.6, 387.24, 389.05, 357.24, 323.46, 323.79, 302.18, 294.81, 354.37, 388.23, 356.62] },
      velocityScore: { '1D': -3.6, '1W': -4.4, '1M': -53.6, '6M': null }, isNew: false,
      marketCap: '$14B', pe: 74.3, revenueGrowth: 26, eps: 4.8, grossMargin: 39, dividendYield: 0.11,
      etfPresence: { POW: 1.08, VOLT: 4.31, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'JCI', name: 'JOHNSON CONTROLS INTERNATIONAL PLC', easyScore: 2, avgWeight: 2.43, proScore: 0.97, coverage: 0.4,
      price: 139.96, weeklyPrices: [141.28, 142.81, 145.49, 138.40, 139.96], weeklyChange: -0.93, dayChange: 1.27, sortRank: 0, periodReturns: { '1M': 4.4, 'YTD': 16.9, '6M': 15, '1Y': 32.5 },
      priceHistory: { '1D': [138.2, 139.57, 139.96], '1W': [141.28, 142.81, 145.49, 138.4, 139.96], '1M': [134.06, 133.91, 141.99, 146.96, 147.4, 143.65, 144.05, 147.75, 139.36, 144.01, 144.96, 146.06, 145.17, 143.62, 144.82, 148.21, 141.28, 142.81, 145.49, 138.4, 139.96], 'YTD': [119.75, 111.29, 112.95, 113.59, 119.26, 132.52, 138.57, 143.79, 144.3, 132.4, 130.16, 129.7, 131.29, 132.97, 142.53, 140.87, 141.92, 145.08, 139.52, 143.08, 138.36, 134.06, 143.65, 144.96, 148.21, 139.96], '6M': [121.71, 113.95, 112.09, 115.49, 116.74, 129.49, 140.96, 142.7, 143.42, 137.18, 130.94, 133.25, 131.57, 134.72, 141.85, 137.55, 141.73, 146.03, 139.25, 145.03, 135.47, 134.06, 143.65, 144.96, 148.21, 139.96], '1Y': [105.62, 105.5, 106.02, 108.3, 103.24, 104.84, 105.71, 105.71, 106.4, 105.96, 106.29, 106.96, 108.29, 109.95, 108.31, 107.85, 110.6, 113.05, 113.18, 122.58, 116.38, 114.19, 115.28, 115.77, 118.85, 121.13, 120.94, 112.41, 112.13, 114.51, 120.28, 132.52, 138.57, 143.79, 144.3, 132.4, 130.94, 133.25, 131.57, 132.97, 142.53, 140.87, 141.92, 145.08, 139.52, 143.08, 135.47, 134.06, 143.65, 144.96, 148.21, 139.96] },
      velocityScore: { '1D': -2, '1W': -1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$85B', pe: 42.8, revenueGrowth: 8, eps: 3.27, grossMargin: 37, dividendYield: 1.16,
      etfPresence: { POW: false, VOLT: 1.36, PBD: false, PBW: false, IVEP: 3.5 },
      tonyNote: 'JOHNSON CONTROLS INTERNATIONAL PLC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VST', name: 'Vistra Corp', easyScore: 2, avgWeight: 2.42, proScore: 0.97, coverage: 0.4,
      price: 164.87, weeklyPrices: [162.39, 162.87, 167.77, 163.49, 164.87], weeklyChange: 1.52, dayChange: 0.89, sortRank: 0, periodReturns: { '1M': 2.9, 'YTD': 2.2, '6M': 1.9, '1Y': -14.9 },
      priceHistory: { '1D': [163.41, 164.4, 165.21, 164.87], '1W': [162.39, 162.87, 167.77, 163.49, 164.87], '1M': [160.23, 154.76, 157.97, 153.8, 153.7, 148.76, 146.9, 146.22, 138.54, 146.38, 148.02, 153.52, 158.61, 158.83, 163.75, 167.26, 162.39, 162.87, 167.77, 163.49, 164.87], 'YTD': [161.33, 150.6, 180.18, 160.12, 158.35, 143.07, 163.1, 171.4, 173.89, 158.65, 158.95, 146.02, 155.48, 151.18, 154.73, 163.46, 164.35, 155.28, 147.72, 139.68, 156.27, 160.23, 148.76, 148.02, 167.26, 164.87], '6M': [161.84, 169.53, 171.42, 160.02, 165.64, 142.52, 160.15, 172.5, 176.82, 167.4, 159.58, 167.37, 152.3, 153.96, 152.75, 165.53, 156.85, 157.84, 153.95, 141.9, 149.08, 160.23, 148.76, 148.02, 167.26, 164.87], '1Y': [193.81, 190.18, 191.37, 189.09, 198, 209.6, 200.08, 198.96, 190.08, 185.81, 193.78, 209.43, 204.24, 195.92, 199.62, 205.51, 194.24, 199.3, 193.04, 188.28, 175, 175.14, 172.55, 164.81, 173.45, 161.67, 162.62, 154.6, 168.97, 160.36, 162.58, 143.07, 163.1, 171.4, 173.89, 158.65, 159.58, 167.37, 152.3, 151.18, 154.73, 163.46, 164.35, 155.28, 147.72, 139.68, 149.08, 160.23, 148.76, 148.02, 167.26, 164.87] },
      velocityScore: { '1D': 1, '1W': 5.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$56B', pe: 27.6, revenueGrowth: 43, eps: 5.98, grossMargin: 39, dividendYield: 0.56,
      etfPresence: { POW: 1.48, VOLT: false, PBD: false, PBW: false, IVEP: 3.36 },
      tonyNote: 'Vistra Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CEG', name: 'Constellation Energy Corp', easyScore: 2, avgWeight: 2.35, proScore: 0.94, coverage: 0.4,
      price: 265.2, weeklyPrices: [270.26, 267.97, 268.69, 264.02, 265.20], weeklyChange: -1.87, dayChange: 0.45, sortRank: 0, periodReturns: { '1M': -7.8, 'YTD': -24.9, '6M': -26, '1Y': -17.8 },
      priceHistory: { '1D': [264.02, 265.8, 265.37, 265.2], '1W': [270.26, 267.97, 268.69, 264.02, 265.2], '1M': [287.75, 265.7, 272.65, 267.24, 264.59, 254.83, 250.67, 251.65, 242.3, 246.71, 253.76, 262.35, 268, 267.17, 274.06, 275.53, 270.26, 267.97, 268.69, 264.02, 265.2], 'YTD': [353.27, 322.54, 341.2, 289.06, 280.68, 247.06, 276.12, 294.84, 329.88, 319.06, 301.77, 281.99, 301.49, 272.82, 286.5, 296.21, 313.53, 307.81, 303.63, 267.2, 294.07, 287.75, 254.83, 253.76, 275.53, 265.2], '6M': [358.33, 354.58, 333.53, 294.37, 287.95, 250.46, 276.85, 291.66, 323.56, 332.07, 301.55, 316.47, 295.19, 279.46, 280.25, 299.14, 292.77, 313, 311.28, 275.26, 285.83, 287.75, 254.83, 253.76, 275.53, 265.2], '1Y': [322.76, 312.84, 317.99, 317.79, 330.52, 343.57, 331.49, 322.77, 310.68, 307.19, 300.82, 322.91, 336.65, 329.07, 358.16, 389.56, 370, 391.15, 377.71, 360.93, 338.67, 354.11, 363.67, 359.15, 365.63, 361.33, 357.12, 338.63, 330.38, 287.35, 287.45, 247.06, 276.12, 294.84, 329.88, 319.06, 301.55, 316.47, 295.19, 272.82, 286.5, 296.21, 313.53, 307.81, 303.63, 267.2, 285.83, 287.75, 254.83, 253.76, 275.53, 265.2] },
      velocityScore: { '1D': 2.2, '1W': 1.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$95B', pe: 23, revenueGrowth: 64, eps: 11.51, grossMargin: 23, dividendYield: 0.65,
      etfPresence: { POW: 1.29, VOLT: false, PBD: false, PBW: false, IVEP: 3.41 },
      tonyNote: 'Constellation Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TLN', name: 'Talen Energy Corp', easyScore: 2, avgWeight: 2.31, proScore: 0.92, coverage: 0.4,
      price: 405.5, weeklyPrices: [411.92, 405.89, 416.80, 404.09, 405.50], weeklyChange: -1.56, dayChange: 0.35, sortRank: 0, periodReturns: { '1M': 4.8, 'YTD': 8.2, '6M': 6.6, '1Y': 39.5 },
      priceHistory: { '1D': [404.09, 405.54, 405.5], '1W': [411.92, 405.89, 416.8, 404.09, 405.5], '1M': [386.8, 377.2, 385.51, 379.59, 378.08, 364.74, 364.78, 358.74, 336.59, 344.8, 360.54, 386.21, 406.51, 409.81, 436.29, 438.12, 411.92, 405.89, 416.8, 404.09, 405.5], 'YTD': [374.84, 356, 419.07, 366.43, 348.36, 324.63, 367.81, 382.25, 370.97, 320.56, 316.14, 302.97, 324.54, 327.58, 321.33, 365.35, 364.32, 372.16, 386.37, 334.24, 372.45, 386.8, 364.74, 360.54, 438.12, 405.5], '6M': [380.27, 393.18, 376.86, 374.31, 365.17, 317.05, 354.62, 380.06, 390.05, 334.86, 311.45, 340.07, 323.13, 328.08, 312.76, 362.4, 345.25, 372.42, 390.55, 352.88, 360.48, 386.8, 364.74, 360.54, 438.12, 405.5], '1Y': [290.77, 277.46, 268.15, 313.58, 361.21, 384.27, 369.95, 376.89, 355.53, 375.15, 389.43, 409.6, 423.13, 425.38, 431.04, 417.75, 406.84, 407.12, 413.54, 393.63, 368.65, 380.49, 367.96, 348.38, 376.77, 380.75, 378.97, 374.71, 374.83, 379.86, 362.2, 324.63, 367.81, 382.25, 370.97, 320.56, 311.45, 340.07, 323.13, 327.58, 321.33, 365.35, 364.32, 372.16, 386.37, 334.24, 360.48, 386.8, 364.74, 360.54, 438.12, 405.5] },
      velocityScore: { '1D': 0, '1W': -2.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: null, revenueGrowth: 97, eps: -0.53, grossMargin: 40, dividendYield: null,
      etfPresence: { POW: 1.75, VOLT: false, PBD: false, PBW: false, IVEP: 2.87 },
      tonyNote: 'Talen Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX TECHNOLOGIES INC', easyScore: 2, avgWeight: 2.13, proScore: 0.85, coverage: 0.4,
      price: 198.84, weeklyPrices: [209.89, 205.65, 204.77, 197.91, 198.84], weeklyChange: -5.26, dayChange: 0.49, sortRank: 0, periodReturns: { '1M': 1.5, 'YTD': 15, '6M': 13.3, '1Y': 38 },
      priceHistory: { '1D': [197.88, 197.78, 198.84], '1W': [209.89, 205.65, 204.77, 197.91, 198.84], '1M': [195.88, 188.39, 187.26, 184.72, 190.76, 185.95, 187.46, 188.96, 183, 194.68, 193.45, 193.94, 196.93, 203.07, 205.4, 210, 209.89, 205.65, 204.77, 197.91, 198.84], 'YTD': [172.84, 193.2, 213.25, 207.75, 205.43, 187.42, 196.9, 206.44, 205.98, 195.23, 194.13, 199.75, 202.59, 214.98, 229.57, 235.78, 223.15, 216.31, 205.33, 204.72, 202.91, 195.88, 185.95, 193.45, 210, 198.84], '6M': [175.49, 195.3, 210.54, 209.52, 216.3, 190.1, 198.5, 209.07, 207.24, 195.5, 197.82, 210.12, 205.09, 212.81, 230.29, 230.8, 225.51, 216.39, 209.89, 210.94, 202.52, 195.88, 185.95, 193.45, 210, 198.84], '1Y': [144.06, 137.37, 137.45, 140.04, 150.28, 182, 177.89, 170.94, 162.84, 160.03, 162.23, 176.65, 178.02, 184.37, 191.39, 202.46, 207.72, 204.03, 215.86, 198.79, 176.18, 174.62, 176.2, 177.16, 173.2, 177.62, 174.36, 192.24, 204.08, 206.33, 210.18, 187.42, 196.9, 206.44, 205.98, 195.23, 197.82, 210.12, 205.09, 214.98, 229.57, 235.78, 223.15, 216.31, 205.33, 204.72, 202.52, 195.88, 185.95, 193.45, 210, 198.84] },
      velocityScore: { '1D': 0, '1W': -1.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: 53.2, revenueGrowth: 26, eps: 3.74, grossMargin: 23, dividendYield: 0.53,
      etfPresence: { POW: false, VOLT: 2.06, PBD: false, PBW: false, IVEP: 2.19 },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 5.21, proScore: 2.09, coverage: 0.4,
      price: 1002.59, weeklyPrices: [984.24, 994.45, 1057.01, 997.47, 1002.59], weeklyChange: 1.86, dayChange: 0.46, sortRank: 0, periodReturns: { '1M': 14.5, 'YTD': 75, '6M': 73.3, '1Y': 158.3 },
      priceHistory: { '1D': [998.02, 1001.68, 1000.2, 1002.59], '1W': [984.24, 994.45, 1057.01, 997.47, 1002.59], '1M': [875.87, 865.36, 909.81, 926.18, 940.48, 904.28, 915.64, 914.7, 856.16, 897.63, 910.57, 933.93, 945.46, 955.92, 985.82, 1022.28, 984.24, 994.45, 1057.01, 997.47, 1002.59], 'YTD': [572.87, 608.13, 647.18, 626.62, 657.36, 678.31, 758.29, 759.74, 742.83, 680.9, 693.99, 680.88, 695.4, 717.22, 790.66, 794.65, 830.79, 889.67, 897.45, 888.31, 879.89, 875.87, 904.28, 910.57, 1022.28, 1002.59], '6M': [578.61, 623.09, 636.53, 645.38, 643.28, 691.82, 775, 760.53, 752.93, 706.08, 700.69, 688.65, 703.19, 730.32, 787.07, 772.66, 835.24, 890.11, 895.69, 920.22, 865.95, 875.87, 904.28, 910.57, 1022.28, 1002.59], '1Y': [388.21, 394.29, 404.64, 417.19, 430.05, 434.23, 408.54, 412.64, 432.3, 416.05, 418.09, 440.67, 471.26, 477.15, 486.71, 527.47, 531.18, 527.07, 570.59, 570.85, 552.05, 559.6, 582.47, 594.36, 588.93, 582.42, 577.39, 596.52, 638.75, 648.41, 665.24, 678.31, 758.29, 759.74, 742.83, 680.9, 700.69, 688.65, 703.19, 717.22, 790.66, 794.65, 830.79, 889.67, 897.45, 888.31, 865.95, 875.87, 904.28, 910.57, 1022.28, 1002.59] },
      velocityScore: { '1D': 1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$462B', pe: 50, revenueGrowth: 22, eps: 20.05, grossMargin: 29, dividendYield: 0.65,
      etfPresence: { AIRR: false, PRN: 3.54, RSHO: 6.89, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 5.01, proScore: 2, coverage: 0.4,
      price: 821.31, weeklyPrices: [892.25, 867.23, 881.92, 804.76, 821.31], weeklyChange: -7.95, dayChange: 2.06, sortRank: 0, periodReturns: { '1M': -4.6, 'YTD': 168.2, '6M': 164.3, '1Y': 256 },
      priceHistory: { '1D': [804.76, 833.37, 821.31], '1W': [892.25, 867.23, 881.92, 804.76, 821.31], '1M': [860.84, 845.39, 875.52, 957.03, 993.74, 882.43, 891.86, 842.01, 770.25, 838.55, 858.99, 866.67, 857.76, 838.21, 861.88, 932.75, 892.25, 867.23, 881.92, 804.76, 821.31], 'YTD': [306.23, 297.62, 336.31, 351.39, 357.91, 365.07, 431.43, 435.5, 428.13, 395.11, 398.12, 401.61, 420.24, 416.34, 446.36, 463.65, 497.18, 532.67, 844.8, 848.84, 732.94, 860.84, 882.43, 858.99, 932.75, 821.31], '6M': [310.79, 317.41, 321.6, 362.53, 373.52, 360.16, 433.91, 415.13, 433.34, 398.87, 404.59, 431.78, 415.93, 421.29, 435.65, 441.1, 495.67, 515.62, 811.41, 889.03, 733.77, 860.84, 882.43, 858.99, 932.75, 821.31], '1Y': [230.73, 227.02, 238.4, 242.01, 264.08, 296.58, 289.86, 283.2, 286.49, 276.91, 286.69, 319.38, 371.84, 339.68, 348.57, 361.44, 369.01, 376.74, 392.77, 384.45, 332.82, 342.44, 327.78, 324.1, 319.13, 315.87, 307.68, 312.24, 319.27, 364.25, 379.23, 365.07, 431.43, 435.5, 428.13, 395.11, 404.59, 431.78, 415.93, 416.34, 446.36, 463.65, 497.18, 532.67, 844.8, 848.84, 733.77, 860.84, 882.43, 858.99, 932.75, 821.31] },
      velocityScore: { '1D': -6.5, '1W': -24.2, '1M': -61.7, '6M': null }, isNew: false,
      marketCap: '$25B', pe: 73.4, revenueGrowth: 92, eps: 11.19, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 5.89, PRN: 4.13, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 4.91, proScore: 1.96, coverage: 0.4,
      price: 284.68, weeklyPrices: [291.50, 294.49, 309.20, 279.77, 284.68], weeklyChange: -2.34, dayChange: 1.76, sortRank: 0, periodReturns: { '1M': 0.1, 'YTD': 167.9, '6M': 154.3, '1Y': 305.8 },
      priceHistory: { '1D': [279.77, 284.94, 284.68], '1W': [291.5, 294.49, 309.2, 279.77, 284.68], '1M': [284.42, 288.12, 299.07, 299.73, 300.06, 284.87, 293.6, 283.51, 262.34, 290.5, 294.75, 303.53, 292.7, 294.03, 297.2, 307.8, 291.5, 294.49, 309.2, 279.77, 284.68], 'YTD': [106.26, 119.94, 135.18, 139.32, 147.86, 179.6, 197.63, 182.27, 174.53, 161.22, 167.57, 172, 179.35, 182.6, 230.94, 241.01, 252.76, 275.33, 309.39, 292.65, 279.22, 284.42, 284.87, 294.75, 307.8, 284.68], '6M': [111.96, 120, 133.04, 140.62, 147.81, 175.77, 197.45, 178.79, 176.96, 167.67, 171.19, 175.13, 174.8, 184.68, 230.81, 232.81, 252.18, 277.27, 305.93, 296.98, 270.75, 284.42, 284.87, 294.75, 307.8, 284.68], '1Y': [70.15, 72.14, 70.37, 73.67, 77.77, 78.75, 88.28, 86.57, 86.12, 87.92, 92.3, 99.41, 97.41, 101.6, 104.42, 105.73, 116.4, 124.71, 130.23, 124.62, 105.94, 100.03, 107.5, 115.02, 110.88, 112.88, 109.16, 118.62, 133.76, 142.29, 152.31, 179.6, 197.63, 182.27, 174.53, 161.22, 171.19, 175.13, 174.8, 182.6, 230.94, 241.01, 252.76, 275.33, 309.39, 292.65, 270.75, 284.42, 284.87, 294.75, 307.8, 284.68] },
      velocityScore: { '1D': -2, '1W': null, '1M': 8.3, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 55.5, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { AIRR: 2.49, PRN: false, RSHO: 7.33, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, avgWeight: 4.78, proScore: 1.91, coverage: 0.4,
      price: 767.13, weeklyPrices: [736.77, 732.24, 753.07, 765.46, 767.13], weeklyChange: 4.12, dayChange: 0.22, sortRank: 0, periodReturns: { '1M': 15, 'YTD': 144.8, '6M': 139.2, '1Y': 247.9 },
      priceHistory: { '1D': [765.47, 765.91, 767.13, 767.13], '1W': [736.77, 732.24, 753.07, 765.46, 767.13], '1M': [667.02, 646.89, 663.14, 686.37, 689.43, 694.72, 619.98, 613.93, 588.9, 623.66, 641.68, 688.87, 690.39, 719.52, 738.85, 790, 736.77, 732.24, 753.07, 765.46, 767.13], 'YTD': [313.32, 313.98, 329.66, 363.88, 347.11, 345.97, 413.65, 437.61, 451.25, 414.2, 458.31, 473.85, 566.62, 575.16, 603.84, 597.88, 652.99, 702.27, 680.26, 722.31, 656.35, 667.02, 694.72, 641.68, 790, 767.13], '6M': [320.73, 330.42, 314.09, 397.42, 358.87, 354.14, 422.5, 432.18, 452.53, 430.25, 459.3, 479.9, 410.85, 571.38, 609.29, 601.83, 656.79, 669.98, 690, 740.91, 644.64, 667.02, 694.72, 641.68, 790, 767.13], '1Y': [220.48, 202.53, 222.2, 205.66, 238.15, 233.13, 228.08, 225.32, 226.88, 224.09, 217.41, 238.22, 266.64, 270.05, 268.53, 300.72, 290.27, 294.99, 310.41, 335.96, 346.35, 371.95, 357.48, 332.87, 320.1, 333.23, 315.44, 337.03, 317.76, 380.36, 355.51, 345.97, 413.65, 437.61, 451.25, 414.2, 459.3, 479.9, 410.85, 575.16, 603.84, 597.88, 652.99, 702.27, 680.26, 722.31, 644.64, 667.02, 694.72, 641.68, 790, 767.13] },
      velocityScore: { '1D': 4.9, '1W': -15.9, '1M': -54.6, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 67.2, revenueGrowth: 50, eps: 11.41, grossMargin: 21, dividendYield: 0.26,
      etfPresence: { AIRR: 4.65, PRN: 4.91, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Argan Inc is an engineering and construction company for power generation facilities — natural gas and renewable power plants. It appears in Industrials ETFs because power plant construction is one of the fastest-growing categories in U.S. infrastructure spending, driven by data center load additions that the grid cannot currently support.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.42, proScore: 1.77, coverage: 0.4,
      price: 1913.19, weeklyPrices: [1908.07, 1954.47, 2017.57, 1854.23, 1913.19], weeklyChange: 0.27, dayChange: 3.21, sortRank: 0, periodReturns: { '1M': 4.6, 'YTD': 105, '6M': 101.2, '1Y': 256.8 },
      priceHistory: { '1D': [1853.68, 1909.18, 1906.44, 1913.19], '1W': [1908.07, 1954.47, 2017.57, 1854.23, 1913.19], '1M': [1828.21, 1787.88, 1883.26, 1850.04, 1914.65, 1843.94, 1852.03, 1831.56, 1719.48, 1843.42, 1877.61, 1952.02, 1913.94, 1931.77, 1967.41, 2066.51, 1908.07, 1954.47, 2017.57, 1854.23, 1913.19], 'YTD': [933.29, 971.49, 1091.04, 1121.44, 1142.1, 1147.97, 1300.02, 1462.23, 1429.37, 1279.06, 1365.34, 1356.75, 1366.77, 1417.19, 1592.84, 1650.47, 1726.12, 1867.02, 1952.37, 1992.74, 1828.25, 1828.21, 1843.94, 1877.61, 2066.51, 1913.19], '6M': [950.67, 1035.11, 1073.14, 1148, 1169.05, 1119.81, 1338.65, 1373.52, 1438.23, 1348.22, 1373.76, 1444.6, 1358.66, 1428.52, 1574.45, 1605.97, 1773.91, 1840.25, 1942.02, 2042.36, 1835.33, 1828.21, 1843.94, 1877.61, 2066.51, 1913.19], '1Y': [536.21, 527.42, 539.02, 532.14, 687.67, 691.45, 693.31, 695.76, 691.18, 698.61, 709.53, 777.18, 804.24, 825.18, 816.53, 831.89, 836.75, 976.45, 977.67, 974.14, 919.82, 945.07, 935.78, 983.61, 968.5, 965.37, 946.93, 1035.12, 1053.1, 1131.7, 1171.46, 1147.97, 1300.02, 1462.23, 1429.37, 1279.06, 1373.76, 1444.6, 1358.66, 1417.19, 1592.84, 1650.47, 1726.12, 1867.02, 1952.37, 1992.74, 1835.33, 1828.21, 1843.94, 1877.61, 2066.51, 1913.19] },
      velocityScore: { '1D': -4.8, '1W': -23, '1M': -59.7, '6M': null }, isNew: false,
      marketCap: '$67B', pe: 55.2, revenueGrowth: 1, eps: 34.67, grossMargin: 25, dividendYield: 0.14,
      etfPresence: { AIRR: 4.23, PRN: 4.6, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.94, proScore: 1.58, coverage: 0.4,
      price: 336.74, weeklyPrices: [330.90, 333.78, 343.54, 337.08, 336.74], weeklyChange: 1.76, dayChange: -0.17, sortRank: 0, periodReturns: { '1M': 10.8, 'YTD': 31.1, '6M': 27.8, '1Y': 44.9 },
      priceHistory: { '1D': [337.31, 336.81, 336.74], '1W': [330.9, 333.78, 343.54, 337.08, 336.74], '1M': [303.81, 300.98, 308.31, 313.39, 313.67, 315.29, 314.42, 322.81, 314.08, 318.89, 320.11, 316.18, 324.38, 329.89, 337.96, 338.07, 330.9, 333.78, 343.54, 337.08, 336.74], 'YTD': [256.77, 264.62, 282.47, 280.14, 260.41, 287.03, 279.03, 281.97, 282.58, 267.78, 255.65, 253.77, 260.67, 267.12, 289.01, 291.03, 293.35, 302.99, 308.87, 307.17, 307.1, 303.81, 315.29, 320.11, 338.07, 336.74], '6M': [263.4, 265.39, 278.77, 284, 256.26, 289.94, 290.31, 281.13, 283.5, 274.97, 259.88, 256.58, 260.51, 269.36, 286.41, 284.39, 294.4, 305.75, 310.37, 315.72, 305.66, 303.81, 315.29, 320.11, 338.07, 336.74], '1Y': [232.45, 247.66, 254.41, 264.89, 272.4, 269.28, 262.51, 262.36, 264.21, 263.15, 261.61, 262.58, 264.9, 261.05, 252.74, 252.95, 249.57, 260, 253.33, 259.74, 240.63, 249.05, 257.32, 257.3, 258.47, 263.58, 261.16, 260.8, 277.62, 282.33, 259.51, 287.03, 279.03, 281.97, 282.58, 267.78, 259.88, 256.58, 260.51, 267.12, 289.01, 291.03, 293.35, 302.99, 308.87, 307.17, 305.66, 303.81, 315.29, 320.11, 338.07, 336.74] },
      velocityScore: { '1D': 0.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 31.8, revenueGrowth: 7, eps: 10.58, grossMargin: 30, dividendYield: 0.61,
      etfPresence: { AIRR: 1.84, PRN: false, RSHO: 6.04, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 2.79, proScore: 1.12, coverage: 0.4,
      price: 235, weeklyPrices: [236.07, 237.22, 244.56, 231.87, 235.00], weeklyChange: -0.45, dayChange: 1.5, sortRank: 0, periodReturns: { '1M': 8.5, 'YTD': 17.5, '6M': 14.3, '1Y': 40.1 },
      priceHistory: { '1D': [231.52, 234.1, 235], '1W': [236.07, 237.22, 244.56, 231.87, 235], '1M': [216.66, 220.92, 230.08, 234.08, 236.14, 227.8, 229.95, 228.01, 223.63, 233.49, 230.05, 237.06, 234.8, 235.29, 242.97, 246.41, 236.07, 237.22, 244.56, 231.87, 235], 'YTD': [200.06, 207.44, 213.61, 211.03, 208.41, 218.02, 230.92, 242.29, 226.94, 204.62, 199.45, 186.77, 200, 197.29, 215.97, 223.52, 222.82, 208.13, 202.84, 200.99, 207.8, 216.66, 227.8, 230.05, 246.41, 235], '6M': [205.66, 208.63, 211.07, 220.86, 211.34, 212.76, 233.46, 241.01, 231.59, 211.9, 202.65, 202.36, 200.45, 203.16, 215.54, 215.27, 223.96, 218.91, 205.27, 203.5, 205.39, 216.66, 227.8, 230.05, 246.41, 235], '1Y': [167.68, 170.53, 170.82, 173.83, 180.24, 203.71, 200.51, 187.85, 188.95, 184.11, 186.04, 185.77, 187.6, 186.78, 188.32, 185.28, 184.97, 195.85, 215.13, 224.93, 207.28, 211.97, 209.18, 209.32, 216.89, 205.46, 203.51, 208, 209.78, 217.13, 211.84, 218.02, 230.92, 242.29, 226.94, 204.62, 202.65, 202.36, 200.45, 197.29, 215.97, 223.52, 222.82, 208.13, 202.84, 200.99, 205.39, 216.66, 227.8, 230.05, 246.41, 235] },
      velocityScore: { '1D': -0.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 44.8, revenueGrowth: 17, eps: 5.24, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.63, PRN: false, RSHO: 3.96, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 2, avgWeight: 2.79, proScore: 1.11, coverage: 0.4,
      price: 271.2, weeklyPrices: [275.13, 276.06, 273.14, 268.87, 271.20], weeklyChange: -1.43, dayChange: 1, sortRank: 0, periodReturns: { '1M': 5, 'YTD': 32.3, '6M': 29.5, '1Y': 45.7 },
      priceHistory: { '1D': [268.52, 270.99, 270.81, 271.2], '1W': [275.13, 276.06, 273.14, 268.87, 271.2], '1M': [258.25, 255.52, 250.72, 248.63, 249.33, 251.9, 246.55, 257.16, 249.49, 264.6, 264.67, 270.44, 277.42, 283.23, 277.66, 280.36, 275.13, 276.06, 273.14, 268.87, 271.2], 'YTD': [205.02, 210.02, 224.26, 214.89, 208.08, 209.63, 244.79, 258.1, 262.53, 250.13, 236.75, 231.21, 227.9, 232.68, 252.67, 255.69, 242.44, 239.51, 270.56, 260.35, 256.55, 258.25, 251.9, 264.67, 280.36, 271.2], '6M': [209.49, 214.69, 219.64, 225, 210.84, 208.61, 230.85, 251.3, 260.31, 252.39, 243.82, 232.94, 230.51, 239.04, 254.06, 247.6, 246.16, 243.04, 272.54, 272.37, 259.89, 258.25, 251.9, 264.67, 280.36, 271.2], '1Y': [186.13, 179.46, 184.68, 183.34, 189.17, 179.32, 179.88, 173.05, 171.24, 173.22, 178.98, 187.46, 193.58, 196.23, 191.46, 193.03, 192.52, 201.84, 206.74, 209.74, 200.28, 200.12, 196.26, 191.36, 195.18, 209.57, 207.81, 210.9, 220.25, 217.7, 208.93, 209.63, 244.79, 258.1, 262.53, 250.13, 243.82, 232.94, 230.51, 232.68, 252.67, 255.69, 242.44, 239.51, 270.56, 260.35, 259.89, 258.25, 251.9, 264.67, 280.36, 271.2] },
      velocityScore: { '1D': -1.8, '1W': -20.1, '1M': -50.4, '6M': null }, isNew: false,
      marketCap: '$109B', pe: 63.1, revenueGrowth: 19, eps: 4.3, grossMargin: 35, dividendYield: 0.18,
      etfPresence: { AIRR: false, PRN: 3.31, RSHO: false, IDEF: 2.26, BILT: false },
      tonyNote: 'Howmet Aerospace is an aerospace structures and engine components manufacturer. It appears in Industrials ETFs for its aerospace and defense exposure — commercial air travel recovery and defense spending growth are the two demand drivers. Revenue grew and margins are expanding as Howmet prices power over OEM customers.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 2, avgWeight: 2.44, proScore: 0.97, coverage: 0.4,
      price: 198.84, weeklyPrices: [209.89, 205.65, 204.77, 197.91, 198.84], weeklyChange: -5.26, dayChange: 0.49, sortRank: 0, periodReturns: { '1M': 1.5, 'YTD': 15, '6M': 13.3, '1Y': 38 },
      priceHistory: { '1D': [197.88, 197.78, 198.84], '1W': [209.89, 205.65, 204.77, 197.91, 198.84], '1M': [195.88, 188.39, 187.26, 184.72, 190.76, 185.95, 187.46, 188.96, 183, 194.68, 193.45, 193.94, 196.93, 203.07, 205.4, 210, 209.89, 205.65, 204.77, 197.91, 198.84], 'YTD': [172.84, 193.2, 213.25, 207.75, 205.43, 187.42, 196.9, 206.44, 205.98, 195.23, 194.13, 199.75, 202.59, 214.98, 229.57, 235.78, 223.15, 216.31, 205.33, 204.72, 202.91, 195.88, 185.95, 193.45, 210, 198.84], '6M': [175.49, 195.3, 210.54, 209.52, 216.3, 190.1, 198.5, 209.07, 207.24, 195.5, 197.82, 210.12, 205.09, 212.81, 230.29, 230.8, 225.51, 216.39, 209.89, 210.94, 202.52, 195.88, 185.95, 193.45, 210, 198.84], '1Y': [144.06, 137.37, 137.45, 140.04, 150.28, 182, 177.89, 170.94, 162.84, 160.03, 162.23, 176.65, 178.02, 184.37, 191.39, 202.46, 207.72, 204.03, 215.86, 198.79, 176.18, 174.62, 176.2, 177.16, 173.2, 177.62, 174.36, 192.24, 204.08, 206.33, 210.18, 187.42, 196.9, 206.44, 205.98, 195.23, 197.82, 210.12, 205.09, 214.98, 229.57, 235.78, 223.15, 216.31, 205.33, 204.72, 202.52, 195.88, 185.95, 193.45, 210, 198.84] },
      velocityScore: { '1D': -2, '1W': -21.8, '1M': -55.7, '6M': null }, isNew: false,
      marketCap: '$18B', pe: 53.2, revenueGrowth: 26, eps: 3.74, grossMargin: 23, dividendYield: 0.53,
      etfPresence: { AIRR: 3.09, PRN: false, RSHO: false, IDEF: 1.78, BILT: false },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 2, avgWeight: 1.79, proScore: 0.72, coverage: 0.4,
      price: 280.14, weeklyPrices: [283.48, 279.62, 279.09, 281.99, 280.14], weeklyChange: -1.18, dayChange: -0.59, sortRank: 0, periodReturns: { '1M': -9.1, 'YTD': -17.6, '6M': -19, '1Y': 16 },
      priceHistory: { '1D': [281.82, 280.42, 279.83, 280.14], '1W': [283.48, 279.62, 279.09, 281.99, 280.14], '1M': [308.17, 296.41, 293.66, 287.54, 294.53, 293.04, 292.26, 297.52, 289.13, 300.95, 297.68, 299.66, 298.51, 296.89, 285.43, 278.19, 283.48, 279.62, 279.09, 281.99, 280.14], 'YTD': [340.07, 378.47, 418.86, 418.58, 420.51, 369.38, 406.76, 437.57, 444.52, 429.11, 415.71, 407.98, 381.79, 396.62, 394.41, 394.81, 359.29, 360.6, 316.28, 326.17, 320.63, 308.17, 293.04, 297.68, 278.19, 280.14], '6M': [345.73, 367.6, 411.66, 422.68, 425.39, 413.14, 392.7, 443.14, 443, 421.17, 414.56, 418.42, 384.79, 393.32, 403.37, 396.17, 370.14, 364.29, 314.72, 336.95, 317.55, 308.17, 293.04, 297.68, 278.19, 280.14], '1Y': [241.46, 247.95, 253.68, 253.96, 260.84, 270.92, 266.65, 267.6, 270.72, 269.71, 267.07, 273.19, 276.01, 287.91, 285.38, 291.94, 285.77, 301.69, 317.54, 318.66, 309.74, 309.92, 307.2, 314.95, 326.8, 354.52, 341.98, 356.45, 415.39, 424.14, 427.83, 369.38, 406.76, 437.57, 444.52, 429.11, 414.56, 418.42, 384.79, 396.62, 394.41, 394.81, 359.29, 360.6, 316.28, 326.17, 317.55, 308.17, 293.04, 297.68, 278.19, 280.14] },
      velocityScore: { '1D': 2.9, '1W': -19.1, '1M': -64.4, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 18.2, revenueGrowth: 13, eps: 15.4, grossMargin: 12, dividendYield: 1.96,
      etfPresence: { AIRR: 2.52, PRN: false, RSHO: false, IDEF: 1.06, BILT: false },
      tonyNote: 'Huntington Ingalls Industries is the only builder of nuclear-powered aircraft carriers for the U.S. Navy. Revenue is government-contracted and predictable; the ETF allocation in Industrials reflects defense spending growth and the Navy\'s backlog of nuclear submarine and carrier construction. A steady-state quality compounder in a market structure with no competition.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 2, avgWeight: 1.65, proScore: 0.66, coverage: 0.4,
      price: 48.41, weeklyPrices: [50.80, 47.95, 46.32, 47.21, 48.41], weeklyChange: -4.7, dayChange: 2.54, sortRank: 0, periodReturns: { '1M': -24.5, 'YTD': -36.2, '6M': -37.5, '1Y': 4.2 },
      priceHistory: { '1D': [47.21, 48.54, 48.4, 48.41], '1W': [50.8, 47.95, 46.32, 47.21, 48.41], '1M': [64.13, 63.49, 63.27, 58.43, 63.4, 58.52, 57.73, 56.19, 54.82, 58.78, 57.75, 57.02, 56.34, 56.16, 54.21, 51.09, 50.8, 47.95, 46.32, 47.21, 48.41], 'YTD': [75.91, 104.04, 124.56, 110.39, 103.01, 85.25, 87.05, 96.08, 86.18, 87, 87.53, 84.62, 71.94, 67.31, 70.34, 70.99, 61.26, 62.05, 57.89, 52.09, 56.18, 64.13, 58.52, 57.75, 51.09, 48.41], '6M': [77.47, 91.93, 119.72, 120.59, 112.67, 91.33, 87.78, 105.67, 92.14, 85.54, 89.46, 92.78, 75.86, 67.7, 68.33, 74.41, 65.52, 63.05, 57, 54.85, 54.67, 64.13, 58.52, 57.75, 51.09, 48.41], '1Y': [46.45, 44.34, 51.12, 55.42, 57.09, 59.4, 65.41, 68.74, 66.9, 66.09, 64.56, 76.35, 83.9, 91.37, 103.69, 95.3, 86.65, 90.68, 91.1, 79.18, 70.24, 74.11, 70.96, 77.03, 73.13, 82.3, 75.98, 91.44, 121.5, 113.85, 108.16, 85.25, 87.05, 96.08, 86.18, 87, 89.46, 92.78, 75.86, 67.31, 70.34, 70.99, 61.26, 62.05, 57.89, 52.09, 54.67, 64.13, 58.52, 57.75, 51.09, 48.41] },
      velocityScore: { '1D': 3.1, '1W': -29, '1M': -71.2, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 284.8, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.36, PRN: false, RSHO: false, IDEF: 0.94, BILT: false },
      tonyNote: 'Kratos Defense is a defense technology company focused on unmanned systems, satellite communications, and high-performance computing for government customers. It appears in Industrials ETFs as an AI-adjacent defense name — autonomous systems and AI-driven surveillance are direct end markets. Revenue grew and the government contract backlog is expanding.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 1.43, proScore: 0.57, coverage: 0.4,
      price: 76.22, weeklyPrices: [75.79, 75.87, 77.53, 77.92, 76.22], weeklyChange: 0.57, dayChange: -2.18, sortRank: 0, periodReturns: { '1M': 6.8, 'YTD': 26.8, '6M': 27.5, '1Y': 21.4 },
      priceHistory: { '1D': [77.92, 76.79, 76.22], '1W': [75.79, 75.87, 77.53, 77.92, 76.22], '1M': [71.39, 70.04, 71.31, 71.66, 72.43, 71.96, 71.59, 71.59, 72.26, 71.62, 72.08, 71.49, 71.48, 71.25, 73.12, 74.95, 75.79, 75.87, 77.53, 77.92, 76.22], 'YTD': [60.11, 61.15, 60.29, 64.96, 67.26, 67.42, 71.13, 72.98, 74.72, 74.24, 73.34, 72.41, 73.58, 72, 72.74, 71.15, 72.18, 75.54, 71.96, 77.72, 78.47, 71.39, 71.96, 72.08, 74.95, 76.22], '6M': [59.8, 59.5, 60.49, 63.18, 66.92, 66.46, 71.12, 72.17, 74.77, 74.77, 73.52, 74.06, 74.06, 71.83, 72.82, 70.86, 71.65, 76.31, 72.95, 77.69, 77.52, 71.39, 71.96, 72.08, 74.95, 76.22], '1Y': [62.81, 57.69, 58.37, 57.36, 58.89, 59, 58.06, 56.52, 56.83, 57.38, 57.57, 57.95, 61.39, 63.35, 63.97, 62.36, 63.06, 57.67, 59.03, 60.6, 59.91, 59.43, 60.21, 61.55, 58.41, 59.75, 60.16, 60.39, 60.71, 63.72, 67.24, 67.42, 71.13, 72.98, 74.72, 74.24, 73.52, 74.06, 74.06, 72, 72.74, 71.15, 72.18, 75.54, 71.96, 77.72, 77.52, 71.39, 71.96, 72.08, 74.95, 76.22] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$93B', pe: 33.4, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.7,
      etfPresence: { AIRR: false, PRN: false, RSHO: 0.92, IDEF: false, BILT: 1.93 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AIR', name: 'AIRBUS GROUP', easyScore: 2, avgWeight: 1.35, proScore: 0.54, coverage: 0.4,
      price: 141.34, weeklyPrices: [132.26, 132.94, 138.51, 143.14, 141.34], weeklyChange: 6.87, dayChange: -1.19, sortRank: 0, periodReturns: { '1M': 25.5, 'YTD': 70.7, '6M': 67.2, '1Y': 105.5 },
      priceHistory: { '1D': [143.05, 141.55, 141.34], '1W': [132.26, 132.94, 138.51, 143.14, 141.34], '1M': [112.62, 109.99, 110.61, 111.36, 115.53, 116.65, 114.72, 120.13, 117.36, 127.23, 129.01, 131.18, 129.96, 132.14, 134.88, 134.28, 132.26, 132.94, 138.51, 143.14, 141.34], 'YTD': [82.79, 94.73, 105.74, 105.66, 105.91, 106.87, 113.22, 116.97, 117.17, 108.52, 101.91, 101.33, 107.25, 109.78, 120.83, 123.04, 110.54, 110.35, 117.78, 104.55, 108.41, 112.62, 116.65, 129.01, 134.28, 141.34], '6M': [84.51, 89.46, 97.71, 107.06, 104.06, 107.13, 113.57, 115.55, 118.17, 110.71, 103.78, 109.21, 110.82, 111.37, 123.04, 118.51, 112.08, 110.37, 117.82, 108.64, 108.44, 112.62, 116.65, 129.01, 134.28, 141.34], '1Y': [68.79, 71.65, 73.39, 79.01, 76.1, 72.4, 75.4, 75.75, 75.09, 76.37, 73.92, 75.75, 78.35, 89.67, 83.06, 82.93, 84.02, 84.59, 85.73, 83.31, 78.95, 79.67, 82.88, 79.47, 81.49, 85.44, 83.52, 91.34, 101.08, 107.74, 106.67, 106.87, 113.22, 116.97, 117.17, 108.52, 103.78, 109.21, 110.82, 109.78, 120.83, 123.04, 110.54, 110.35, 117.78, 104.55, 108.44, 112.62, 116.65, 129.01, 134.28, 141.34] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: 31.1, revenueGrowth: 25, eps: 4.55, grossMargin: 19, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 2.52, BILT: false },
      tonyNote: 'AIRBUS GROUP appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RBC', name: 'RBC Bearings Incorporated', easyScore: 2, avgWeight: 1.2, proScore: 0.48, coverage: 0.4,
      price: 630.2, weeklyPrices: [633.44, 638.94, 648.89, 630.36, 630.20], weeklyChange: -0.51, dayChange: -0.01, sortRank: 0, periodReturns: { '1M': 10.2, 'YTD': 40.5, '6M': 37.9, '1Y': 63.8 },
      priceHistory: { '1D': [630.24, 629.3, 630.2, 630.2], '1W': [633.44, 638.94, 648.89, 630.36, 630.2], '1M': [571.96, 566.14, 578.34, 584.18, 589.76, 590.09, 590.97, 592.41, 576.74, 607.46, 603.64, 616.95, 621.08, 625.73, 639.18, 645.73, 633.44, 638.94, 648.89, 630.36, 630.2], 'YTD': [448.43, 485, 497.06, 504.07, 499.67, 520.16, 550.4, 559.18, 575.92, 552.91, 536.37, 531.11, 532.25, 548.11, 598.3, 589.77, 589.51, 595.76, 605.99, 569.06, 559.95, 571.96, 590.09, 603.64, 645.73, 630.2], '6M': [456.9, 475.7, 489.97, 504.71, 508.95, 516.78, 550.53, 551.42, 576.5, 566.06, 547.31, 540.83, 548.95, 551.99, 595.11, 571.61, 601.39, 599.09, 611.54, 611.93, 566.96, 571.96, 590.09, 603.64, 645.73, 630.2], '1Y': [384.8, 381.6, 375.51, 392.38, 385.08, 403.78, 396.84, 398.93, 399.58, 387.71, 374.88, 378.73, 383.7, 390.29, 373.47, 383.98, 387.73, 411.08, 428.4, 441.04, 429.28, 430, 440.04, 436.5, 451.17, 457.07, 452.89, 467.37, 489.33, 504.99, 511.98, 520.16, 550.4, 559.18, 575.92, 552.91, 547.31, 540.83, 548.95, 548.11, 598.3, 589.77, 589.51, 595.76, 605.99, 569.06, 566.96, 571.96, 590.09, 603.64, 645.73, 630.2] },
      velocityScore: { '1D': 0, '1W': -18.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$20B', pe: 69.4, revenueGrowth: 18, eps: 9.08, grossMargin: 45, dividendYield: null,
      etfPresence: { AIRR: 1.86, PRN: false, RSHO: false, IDEF: 0.53, BILT: false },
      tonyNote: 'RBC Bearings Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRCY', name: 'Mercury Systems, Inc.', easyScore: 2, avgWeight: 1.08, proScore: 0.43, coverage: 0.4,
      price: 110.64, weeklyPrices: [110.87, 105.00, 105.57, 109.38, 110.64], weeklyChange: -0.21, dayChange: 1.15, sortRank: 0, periodReturns: { '1M': -0.9, 'YTD': 51.5, '6M': 47.7, '1Y': 105.4 },
      priceHistory: { '1D': [109.38, 110.39, 110.64], '1W': [110.87, 105, 105.57, 109.38, 110.64], '1M': [111.7, 111.28, 112.87, 111.59, 117.82, 111.27, 110.94, 108.82, 106.81, 119.32, 120.3, 115.93, 112.44, 115.5, 113.91, 111.76, 110.87, 105, 105.57, 109.38, 110.64], 'YTD': [73.01, 88.74, 102.95, 99.05, 93.88, 79.07, 80.25, 87.63, 89.03, 86.42, 78.16, 77.26, 71.4, 74.22, 79.6, 84.05, 77.99, 78.55, 90.34, 92.03, 98.55, 111.7, 111.27, 120.3, 111.76, 110.64], '6M': [74.93, 84.25, 99.14, 99.57, 100.02, 77.12, 80.33, 89.86, 89.58, 84.96, 81.44, 77.81, 76.16, 74.75, 79.23, 84.91, 78.91, 78.91, 88.06, 94.55, 96.36, 111.7, 111.27, 120.3, 111.76, 110.64], '1Y': [53.86, 52, 50.09, 51.51, 51.88, 54.24, 53.58, 66.8, 67.98, 67.66, 68.69, 74.59, 75.34, 77.4, 83.47, 77.76, 77.04, 78.55, 77.78, 74.65, 68.35, 66.67, 67.69, 71.86, 71.8, 75.07, 73.85, 84.8, 98.62, 99.48, 98.29, 79.07, 80.25, 87.63, 89.03, 86.42, 81.44, 77.81, 76.16, 74.22, 79.6, 84.05, 77.99, 78.55, 90.34, 92.03, 96.36, 111.7, 111.27, 120.3, 111.76, 110.64] },
      velocityScore: { '1D': 2.4, '1W': -21.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 12, eps: -0.23, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: 1.14, PRN: false, RSHO: false, IDEF: 1.03, BILT: false },
      tonyNote: 'Mercury Systems, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, avgWeight: 0.99, proScore: 0.4, coverage: 0.4,
      price: 47.78, weeklyPrices: [46.38, 44.84, 46.27, 46.42, 47.78], weeklyChange: 3.03, dayChange: 3.07, sortRank: 0, periodReturns: { '1M': -16.9, 'YTD': -34.7, '6M': -38.4, '1Y': -5.1 },
      priceHistory: { '1D': [46.36, 47.53, 47.78], '1W': [46.38, 44.84, 46.27, 46.42, 47.78], '1M': [57.5, 53.65, 54.65, 51.84, 54.39, 49.44, 49.64, 48.37, 45.87, 49.58, 47.83, 48.27, 51.7, 52.03, 50.37, 47.7, 46.38, 44.84, 46.27, 46.42, 47.78], 'YTD': [73.17, 101.28, 109.49, 108.22, 103.8, 89.78, 78.71, 81.62, 88.11, 100.54, 99.98, 99.38, 84.07, 85.83, 82.52, 83.58, 70.22, 65.73, 60.84, 62.77, 64.1, 57.5, 49.44, 47.83, 47.7, 47.78], '6M': [77.57, 90.41, 107.49, 104.79, 115.29, 97.94, 79.52, 88.46, 88.31, 97.14, 98.98, 105.95, 86.01, 82.69, 84.22, 87.91, 76.6, 67.98, 60.45, 66.02, 65.3, 57.5, 49.44, 47.83, 47.7, 47.78], '1Y': [50.37, 45.03, 48.31, 51.96, 51.41, 50.39, 46.7, 51.78, 53.04, 53.89, 62.51, 64.86, 68.71, 72.2, 75.2, 77, 78.25, 83.87, 87.04, 72.31, 58.28, 63.9, 63.83, 63.75, 67.19, 79.98, 74.62, 91.72, 108.01, 111.61, 110.93, 89.78, 78.71, 81.62, 88.11, 100.54, 98.98, 105.95, 86.01, 85.83, 82.52, 83.58, 70.22, 65.73, 60.84, 62.77, 65.3, 57.5, 49.44, 47.83, 47.7, 47.78] },
      velocityScore: { '1D': 2.6, '1W': -24.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: 207.8, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.8, PRN: false, RSHO: false, IDEF: 0.19, BILT: false },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DRS', name: 'Leonardo DRS, Inc.', easyScore: 2, avgWeight: 0.54, proScore: 0.21, coverage: 0.4,
      price: 42.73, weeklyPrices: [45.74, 44.69, 44.36, 42.48, 42.73], weeklyChange: -6.57, dayChange: 0.6, sortRank: 0, periodReturns: { '1M': -12.4, 'YTD': 25.4, '6M': 25.2, '1Y': -8.1 },
      priceHistory: { '1D': [42.48, 42.71, 42.73], '1W': [45.74, 44.69, 44.36, 42.48, 42.73], '1M': [48.76, 47.96, 47.39, 45.61, 46.71, 46.15, 46.55, 47.35, 46.11, 49.69, 48.53, 46.68, 45.59, 46.58, 46.08, 44.99, 45.74, 44.69, 44.36, 42.48, 42.73], 'YTD': [34.09, 38.84, 42.26, 40.99, 41.06, 37.27, 37.77, 40.03, 43.39, 46.58, 45.3, 43.82, 44.84, 46.3, 46.06, 44.57, 39.98, 40.03, 41.36, 41.5, 44.92, 48.76, 46.15, 48.53, 44.99, 42.73], '6M': [34.13, 37.46, 40.85, 41.46, 42.47, 38.31, 37.87, 41.07, 43.34, 45.82, 45.91, 45.48, 46.53, 45.86, 47.1, 44.94, 41.41, 40.63, 41.44, 42.86, 44.55, 48.76, 46.15, 48.53, 44.99, 42.73], '1Y': [46.48, 46.44, 47.59, 46.14, 48.2, 41.48, 41.58, 42.73, 41.03, 42.01, 40.33, 41.78, 43.1, 45.4, 44.72, 43.85, 39.91, 41.31, 36.62, 35.61, 34.28, 33.63, 33.18, 33.96, 33.12, 34.62, 34.09, 37.2, 41.42, 41.28, 41.3, 37.27, 37.77, 40.03, 43.39, 46.58, 45.91, 45.48, 46.53, 46.3, 46.06, 44.57, 39.98, 40.03, 41.36, 41.5, 44.55, 48.76, 46.15, 48.53, 44.99, 42.73] },
      velocityScore: { '1D': -4.5, '1W': -25, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 39.9, revenueGrowth: 6, eps: 1.07, grossMargin: 24, dividendYield: 0.85,
      etfPresence: { AIRR: 0.78, PRN: false, RSHO: false, IDEF: 0.29, BILT: false },
      tonyNote: 'Leonardo DRS, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TPC', name: 'Tutor Perini Corporation', easyScore: 2, avgWeight: 0.37, proScore: 0.15, coverage: 0.4,
      price: 79.52, weeklyPrices: [81.00, 82.36, 81.56, 79.53, 79.52], weeklyChange: -1.83, dayChange: 0.15, sortRank: 0, periodReturns: { '1M': 11.2, 'YTD': 18.7, '6M': 15.8, '1Y': 70 },
      priceHistory: { '1D': [79.4, 79.52, 79.52], '1W': [81, 82.36, 81.56, 79.53, 79.52], '1M': [71.49, 74.26, 74.29, 72.26, 72.38, 70.53, 72.13, 71.48, 68.72, 73.61, 74.92, 76.55, 76.19, 77.89, 77.99, 81.5, 81, 82.36, 81.56, 79.53, 79.52], 'YTD': [67.02, 70.17, 75.17, 76.01, 78.89, 79.95, 81.73, 86.9, 75.37, 72.82, 67.76, 69.34, 76.15, 77.3, 83.35, 84.22, 86.76, 93.68, 82.85, 79.49, 72.76, 71.49, 70.53, 74.92, 81.5, 79.52], '6M': [68.66, 71.14, 73.54, 75.27, 79.38, 78.83, 85.07, 84.9, 89.38, 71.12, 69.2, 72.31, 76.24, 78.71, 81.5, 84.39, 86.48, 92.92, 81.96, 83.01, 74.88, 71.49, 70.53, 74.92, 81.5, 79.52], '1Y': [46.78, 47.15, 48.83, 48.51, 46.91, 47.66, 56.6, 57.44, 58.52, 59.13, 60.47, 63.88, 66.54, 65.59, 61.61, 63.27, 67.11, 68.72, 68.21, 63.97, 58.76, 64.01, 66.47, 68.59, 69.46, 68.65, 67.92, 71.09, 73.89, 76.79, 79.86, 79.95, 81.73, 86.9, 75.37, 72.82, 69.2, 72.31, 76.24, 77.3, 83.35, 84.22, 86.76, 93.68, 82.85, 79.49, 74.88, 71.49, 70.53, 74.92, 81.5, 79.52] },
      velocityScore: { '1D': 0, '1W': -16.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 54.5, revenueGrowth: 12, eps: 1.46, grossMargin: 12, dividendYield: 0.3,
      etfPresence: { AIRR: 0.7, PRN: false, RSHO: false, IDEF: 0.04, BILT: false },
      tonyNote: 'Tutor Perini Corporation appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TKR', name: 'TIMKEN CO/THE', easyScore: 1, avgWeight: 8.69, proScore: 1.74, coverage: 0.2,
      price: 140.63, weeklyPrices: [137.64, 137.99, 144.01, 141.22, 140.63], weeklyChange: 2.17, dayChange: -0.41, sortRank: 0, periodReturns: { '1M': 9.9, 'YTD': 67.2, '6M': 62.9, '1Y': 93.8 },
      priceHistory: { '1D': [141.21, 139.61, 140.63], '1W': [137.64, 137.99, 144.01, 141.22, 140.63], '1M': [127.98, 126.54, 131.9, 131.82, 133.66, 131.83, 134.67, 137.09, 132.39, 137.4, 137.06, 139.12, 140.28, 139.4, 142.36, 141.97, 137.64, 137.99, 144.01, 141.22, 140.63], 'YTD': [84.13, 90.6, 93.73, 93.94, 93.19, 102.15, 107.35, 108.16, 108.38, 99.68, 97.54, 95.25, 97.56, 98.92, 106.75, 107.66, 107.2, 109, 117.97, 114.49, 119.95, 127.98, 131.83, 137.06, 141.97, 140.63], '6M': [86.33, 90.95, 91.68, 93.89, 93.4, 98.99, 108.82, 107.11, 109.88, 103.05, 99.7, 97.44, 99.06, 102.06, 106.92, 103.92, 108.7, 110.89, 116.34, 116.74, 118.93, 127.98, 131.83, 137.06, 141.97, 140.63], '1Y': [72.55, 76.94, 76.33, 80.02, 80.98, 74.65, 74.15, 76.69, 79.25, 76.49, 76.14, 77.91, 76.75, 75.18, 75.83, 74.28, 75.1, 77.3, 77.95, 78.9, 74.42, 79.9, 79.82, 83.16, 85.77, 86.09, 85.81, 88.05, 91.91, 94.6, 94.15, 102.15, 107.35, 108.16, 108.38, 99.68, 99.7, 97.44, 99.06, 98.92, 106.75, 107.66, 107.2, 109, 117.97, 114.49, 118.93, 127.98, 131.83, 137.06, 141.97, 140.63] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 31.9, revenueGrowth: 8, eps: 4.41, grossMargin: 31, dividendYield: 1.02,
      etfPresence: { AIRR: false, PRN: false, RSHO: 8.69, IDEF: false, BILT: false },
      tonyNote: 'TIMKEN CO/THE appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RTX', name: 'RTX CORP', easyScore: 1, avgWeight: 8.5, proScore: 1.7, coverage: 0.2,
      price: 189, weeklyPrices: [186.39, 185.06, 186.59, 187.99, 189.00], weeklyChange: 1.4, dayChange: 0.66, sortRank: 0, periodReturns: { '1M': 5.2, 'YTD': 3.1, '6M': 2.5, '1Y': 29.4 },
      priceHistory: { '1D': [187.76, 188.49, 188.82, 189], '1W': [186.39, 185.06, 186.59, 187.99, 189], '1M': [179.66, 174.41, 174.26, 172.55, 179.41, 180.99, 178.66, 181.56, 177.41, 184.21, 183.53, 183.64, 186.77, 192.58, 185.6, 181.83, 186.39, 185.06, 186.59, 187.99, 189], 'YTD': [183.4, 187.17, 199.83, 195.93, 200.93, 195.97, 201.14, 204.92, 202.62, 209.76, 204.52, 198.16, 189.71, 196.21, 201.56, 196.42, 174.26, 173.99, 176.09, 171.18, 177.01, 179.66, 180.99, 183.53, 181.83, 189], '6M': [184.42, 190.4, 194.08, 197.5, 199.46, 196.74, 196.51, 205.41, 197.63, 203.86, 203.04, 200.73, 192.85, 194.72, 203.19, 195.85, 179.3, 176.07, 176.78, 175.68, 175.98, 179.66, 180.99, 183.53, 181.83, 189], '1Y': [146.02, 144.91, 148.68, 149.17, 157.12, 156.33, 154.8, 155.5, 156.27, 158.01, 151.75, 158.58, 160.54, 167.33, 169.27, 159.4, 160.71, 179.24, 177.04, 179.03, 175.63, 173.21, 168.8, 171.93, 179.93, 185.76, 184.01, 185.73, 198.84, 196.34, 199.88, 195.97, 201.14, 204.92, 202.62, 209.76, 203.04, 200.73, 192.85, 196.21, 201.56, 196.42, 174.26, 173.99, 176.09, 171.18, 175.98, 179.66, 180.99, 183.53, 181.83, 189] },
      velocityScore: { '1D': 0.6, '1W': -15.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$255B', pe: 35.4, revenueGrowth: 9, eps: 5.34, grossMargin: 20, dividendYield: 1.47,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 8.5, BILT: false },
      tonyNote: 'RTX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 4.32, proScore: 4.32, coverage: 1,
      price: 260.23, weeklyPrices: [275.25, 259.66, 256.63, 240.30, 260.23], weeklyChange: -5.46, dayChange: 8.29, sortRank: 0, periodReturns: { '1M': 12.6, 'YTD': 210.9, '6M': 202.4, '1Y': 370.3 },
      priceHistory: { '1D': [240.3, 260.55, 260.23], '1W': [275.25, 259.66, 256.63, 240.3, 260.23], '1M': [231.09, 264.51, 260.58, 251.68, 259.67, 227.81, 218, 220.12, 211.69, 222.24, 232.36, 260.07, 265.1, 280.91, 286.69, 283.61, 275.25, 259.66, 256.63, 240.3, 260.23], 'YTD': [83.71, 97.3, 103.89, 94.5, 85.19, 73.87, 89.73, 97.92, 91.19, 89.33, 112.95, 117.62, 100.82, 108.82, 144.97, 157.14, 147.16, 154.49, 177.05, 219.94, 214.77, 231.09, 227.81, 232.36, 283.61, 260.23], '6M': [86.04, 100.24, 105.43, 98.87, 100.43, 82.39, 88.61, 107.61, 104.88, 95.65, 108.04, 121.52, 105.97, 101.95, 136.33, 165.34, 157.08, 138.23, 184.77, 221.15, 219.93, 231.09, 227.81, 232.36, 283.61, 260.23], '1Y': [55.33, 47.1, 53.53, 51.01, 50.4, 55.17, 70.24, 72.54, 70.02, 65.72, 95.72, 89.43, 107.8, 112.27, 117.7, 128.15, 109, 125.43, 120.47, 109.95, 85.98, 91.9, 96.45, 96.41, 80.95, 90.03, 85.17, 96.21, 101.98, 96.85, 94.91, 73.87, 89.73, 97.92, 91.19, 89.33, 108.04, 121.52, 105.97, 108.82, 144.97, 157.14, 147.16, 154.49, 177.05, 219.94, 219.93, 231.09, 227.81, 232.36, 283.61, 260.23] },
      velocityScore: { '1D': -10.9, '1W': -21, '1M': null, '6M': null }, isNew: false,
      marketCap: '$66B', pe: 100.1, revenueGrowth: 684, eps: 2.6, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 3.36, MEME: 5.79, RKNG: 3.81 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 3, avgWeight: 3.43, proScore: 3.43, coverage: 1,
      price: 1114.98, weeklyPrices: [1051.77, 1048.51, 1213.56, 1132.33, 1114.98], weeklyChange: 6.01, dayChange: -1.53, sortRank: 0, periodReturns: { '1M': 14.8, 'YTD': 290.7, '6M': 278.8, '1Y': 804.6 },
      priceHistory: { '1D': [1132.33, 1116.98, 1114.98], '1W': [1051.77, 1048.51, 1213.56, 1132.33, 1114.98], '1M': [971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1114.98], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 382.89, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 971, 864.01, 981.61, 1211.38, 1114.98], '6M': [294.37, 343.43, 338.13, 389.11, 435.28, 379.4, 410.34, 417.35, 415.56, 397.05, 405.35, 444.27, 355.46, 367.85, 421.51, 457.23, 481.72, 517.16, 646.63, 776.01, 762.1, 971, 864.01, 981.61, 1211.38, 1114.98], '1Y': [123.25, 124.42, 120.11, 109.22, 111.96, 109.06, 123.72, 123.55, 116.42, 118.48, 135.24, 158.82, 166.41, 167.32, 185.69, 187.06, 206.77, 220.1, 234.7, 253.3, 241.95, 223.93, 239.49, 252.42, 232.51, 276.27, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 370.3, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 762.1, 971, 864.01, 981.61, 1211.38, 1114.98] },
      velocityScore: { '1D': 51.8, '1W': 2.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.3T', pe: 25.2, revenueGrowth: 346, eps: 44.27, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { BUZZ: 3.54, MEME: 3.09, RKNG: 3.66 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 3, avgWeight: 3.39, proScore: 3.39, coverage: 1,
      price: 39.77, weeklyPrices: [45.27, 41.98, 40.95, 39.16, 39.77], weeklyChange: -12.15, dayChange: 1.56, sortRank: 0, periodReturns: { '1M': -15.9, 'YTD': 62.2, '6M': 60.3, '1Y': 294.9 },
      priceHistory: { '1D': [39.16, 40.09, 39.99, 39.77], '1W': [45.27, 41.98, 40.95, 39.16, 39.77], '1M': [47.28, 47.94, 47.86, 44.71, 44.15, 39.62, 40.94, 41.91, 38.92, 41.47, 42.7, 46.47, 46.27, 45.57, 46.59, 45.2, 45.27, 41.98, 40.95, 39.16, 39.77], 'YTD': [24.52, 31.94, 35.22, 37.69, 33.88, 27.84, 36.17, 29.04, 27.27, 25.14, 27.05, 25.93, 23.76, 24.56, 26.26, 31.53, 34.98, 33.55, 41.25, 42.56, 45.87, 47.28, 39.62, 42.7, 45.2, 39.77], '6M': [24.81, 30.26, 36.71, 35.06, 40.22, 31.54, 36.6, 31.53, 28.65, 28.09, 27.48, 26.7, 25.72, 24.49, 25.57, 30.09, 36.35, 34.25, 41.53, 46.71, 48.02, 47.28, 39.62, 42.7, 45.2, 39.77], '1Y': [10.07, 9.22, 9.97, 10.95, 10.12, 14.89, 14.03, 16.34, 15.95, 15.26, 15.2, 19.46, 24.67, 22.94, 27.3, 35.04, 35.9, 34.35, 32.87, 31.44, 22.93, 23.79, 28.05, 32.77, 24.24, 26.08, 24.08, 29.56, 36.1, 34.74, 38.07, 27.84, 36.17, 29.04, 27.27, 25.14, 27.48, 26.7, 25.72, 24.56, 26.26, 31.53, 34.98, 33.55, 41.25, 42.56, 48.02, 47.28, 39.62, 42.7, 45.2, 39.77] },
      velocityScore: { '1D': -10.6, '1W': -16.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 1.87, MEME: 4.95, RKNG: 3.36 },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 2, avgWeight: 6.19, proScore: 4.12, coverage: 0.667,
      price: 140.33, weeklyPrices: [147.44, 146.97, 138.54, 135.69, 140.33], weeklyChange: -4.82, dayChange: 3.42, sortRank: 0, periodReturns: { '1M': -11.4, 'YTD': 302.6, '6M': 281.9, '1Y': 446.2 },
      priceHistory: { '1D': [135.69, 139.16, 141, 140.33], '1W': [147.44, 146.97, 138.54, 135.69, 140.33], '1M': [158.41, 185.67, 202.37, 184.07, 202.89, 177, 196.64, 162.88, 175.13, 172.78, 169.05, 191.55, 170.81, 167.34, 161.85, 171.23, 147.44, 146.97, 138.54, 135.69, 140.33], 'YTD': [34.86, 33.01, 37, 35.72, 43.61, 38.13, 43.99, 51.68, 84.23, 95.58, 96.81, 87.54, 98.21, 103.91, 150.6, 159.42, 162.17, 183.51, 148.94, 190.36, 181.49, 158.41, 177, 169.05, 171.23, 140.33], '6M': [36.75, 38.61, 34.18, 38.38, 45.23, 39.9, 48.4, 46.98, 53.69, 101.14, 106.19, 101.92, 97.42, 86.35, 133.3, 157.32, 137.73, 164.36, 157.55, 203.57, 176.81, 158.41, 177, 169.05, 171.23, 140.33], '1Y': [25.69, 26.88, 29.24, 26.35, 24.11, 21.42, 20.86, 26.13, 24.34, 23.35, 23.72, 28.93, 28.06, 25.93, 31.33, 28.48, 34.14, 37.22, 33.04, 25.42, 21.63, 22.47, 26.02, 30.38, 28.96, 40.64, 36.02, 38.06, 34.47, 38.15, 39.57, 38.13, 43.99, 51.68, 84.23, 95.58, 106.19, 101.92, 97.42, 103.91, 150.6, 159.42, 162.17, 183.51, 148.94, 190.36, 176.81, 158.41, 177, 169.05, 171.23, 140.33] },
      velocityScore: { '1D': 65.5, '1W': 5.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 9.38, RKNG: 2.99 },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 4.81, proScore: 3.21, coverage: 0.667,
      price: 273.83, weeklyPrices: [321.98, 326.19, 309.18, 252.02, 273.83], weeklyChange: -14.96, dayChange: 8.17, sortRank: 0, periodReturns: { '1M': -3.9, 'YTD': 215.1, '6M': 209.7, '1Y': 1044.8 },
      priceHistory: { '1D': [253.14, 273.95, 273.83], '1W': [321.98, 326.19, 309.18, 252.02, 273.83], '1M': [285, 273.51, 302.85, 287.32, 291.37, 263.61, 253.57, 259.61, 234.23, 248.88, 260.22, 274.5, 280.88, 284.99, 328.91, 345.85, 321.98, 326.19, 309.18, 252.02, 273.83], 'YTD': [86.89, 121.84, 139.17, 144.89, 151.37, 136.6, 139.03, 147.55, 155.67, 135.19, 154.51, 150.12, 133.24, 135.63, 166.7, 207.86, 231.17, 290.52, 261.03, 275.95, 302.49, 285, 263.61, 260.22, 345.85, 273.83], '6M': [88.41, 103.05, 139.77, 150.56, 165.39, 147.35, 155.54, 159, 168.57, 159.99, 157.17, 166.69, 133.52, 132.45, 160.13, 210.06, 237.57, 283.36, 258.64, 303.41, 307.88, 285, 263.61, 260.22, 345.85, 273.83], '1Y': [23.92, 24.3, 25.31, 25.93, 34.75, 37.61, 37.65, 46.5, 49.35, 51.35, 55, 73.29, 77.38, 84.57, 86.06, 114.06, 109.06, 108.53, 142.37, 139.23, 107.11, 95.56, 105, 109.44, 87.61, 91.43, 87.26, 108, 133.46, 145.63, 156.51, 136.6, 139.03, 147.55, 155.67, 135.19, 157.17, 166.69, 133.52, 135.63, 166.7, 207.86, 231.17, 290.52, 261.03, 275.95, 307.88, 285, 263.61, 260.22, 345.85, 273.83] },
      velocityScore: { '1D': -13.5, '1W': -11.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$78B', pe: null, revenueGrowth: 130, eps: -0.05, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.36, RKNG: 4.27 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 2, avgWeight: 4.38, proScore: 2.92, coverage: 0.667,
      price: 599.01, weeklyPrices: [670.75, 643.83, 675.39, 586.45, 599.01], weeklyChange: -10.69, dayChange: 2.14, sortRank: 0, periodReturns: { '1M': 12.8, 'YTD': 247.7, '6M': 233.4, '1Y': 836.1 },
      priceHistory: { '1D': [586.45, 599.9, 599.01], '1W': [670.75, 643.83, 675.39, 586.45, 599.01], '1M': [531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 599.01], 'YTD': [172.27, 187.68, 222.1, 236.39, 250.23, 260.19, 284.1, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 294.97, 343.43, 372.52, 404, 431.52, 480, 482.02, 484.28, 531.21, 511.72, 562.93, 732.62, 599.01], '6M': [179.68, 219.38, 214, 241.9, 279.7, 269.41, 273.74, 284.67, 282.25, 259.03, 261.18, 316.93, 273.35, 297.73, 337.88, 361.69, 403.12, 434.52, 463.91, 489.15, 486.46, 531.21, 511.72, 562.93, 732.62, 599.01], '1Y': [63.99, 64.02, 67.53, 67.06, 70.61, 75.84, 74.64, 76.29, 79.22, 81.91, 94.54, 103.09, 110.25, 120.06, 119.93, 113.13, 121.53, 126.67, 158.02, 174.22, 162.45, 150.93, 159.99, 169.54, 174.58, 178.25, 176.06, 199.88, 215, 243.29, 278.41, 260.19, 284.1, 285.52, 279.7, 245.25, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 431.52, 480, 482.02, 486.46, 531.21, 511.72, 562.93, 732.62, 599.01] },
      velocityScore: { '1D': -9.9, '1W': -24.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$206B', pe: 35.8, revenueGrowth: 46, eps: 16.71, grossMargin: 45, dividendYield: 0.1,
      etfPresence: { BUZZ: false, MEME: 4.82, RKNG: 3.93 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 4.36, proScore: 2.91, coverage: 0.667,
      price: 2033, weeklyPrices: [1963.60, 1914.46, 2335.00, 2090.71, 2033.00], weeklyChange: 3.53, dayChange: -2.76, sortRank: 0, periodReturns: { '1M': 19.9, 'YTD': 756.4, '6M': 732.3, '1Y': 4382.9 },
      priceHistory: { '1D': [2090.71, 2040.26, 2033], '1W': [1963.6, 1914.46, 2335, 2090.71, 2033], '1M': [1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2033], 'YTD': [237.38, 334.54, 409.24, 473.83, 576.25, 576.2, 630.29, 649.97, 635.36, 527.33, 661.62, 709.71, 615.83, 701.59, 851.77, 920.99, 989.9, 1187, 1562.34, 1407.61, 1478.69, 1694.98, 1559.32, 1980.1, 2273.73, 2033], '6M': [244.25, 349.63, 389.81, 501.29, 527.63, 584.55, 599.34, 621.09, 651.9, 565.59, 618.82, 772.09, 603.17, 692.73, 851.57, 919.47, 932.43, 1096.51, 1339.96, 1382.72, 1542.24, 1694.98, 1559.32, 1980.1, 2273.73, 2033], '1Y': [45.35, 46.17, 42.72, 41.36, 42.93, 41.93, 43.37, 45.52, 46.78, 51.07, 70.51, 91.55, 106.4, 112.2, 120.95, 127.29, 148.04, 176.49, 207.01, 267.95, 265.88, 226.96, 205.35, 219.46, 209.31, 244.9, 240.22, 353.56, 387.81, 503.44, 539.3, 576.2, 630.29, 649.97, 635.36, 527.33, 618.82, 772.09, 603.17, 701.59, 851.77, 920.99, 989.9, 1187, 1562.34, 1407.61, 1542.24, 1694.98, 1559.32, 1980.1, 2273.73, 2033] },
      velocityScore: { '1D': -21.8, '1W': -34.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$301B', pe: 69.5, revenueGrowth: 251, eps: 29.27, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.38, RKNG: 3.34 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'LITE', name: 'LITE', easyScore: 2, avgWeight: 3.92, proScore: 2.62, coverage: 0.667,
      price: 803.25, weeklyPrices: [827.92, 842.53, 861.97, 816.98, 803.25], weeklyChange: -2.98, dayChange: -1.68, sortRank: 0, periodReturns: { '1M': -6, 'YTD': 117.9, '6M': 115.6, '1Y': 745 },
      priceHistory: { '1D': [816.98, 801.59, 803.25], '1W': [827.92, 842.53, 861.97, 816.98, 803.25], '1M': [854.96, 905, 1029.15, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93, 827.92, 842.53, 861.97, 816.98, 803.25], 'YTD': [368.59, 348.26, 343.27, 339.19, 391.84, 504.42, 583.46, 667.77, 700.91, 558.44, 622.5, 706.35, 702.73, 826.88, 897.3, 894.07, 881.64, 949.93, 903.8, 970.7, 946.9, 854.96, 863.66, 921.56, 893.93, 803.25], '6M': [372.61, 397.42, 361.33, 362.44, 385, 465.54, 574.11, 635.64, 677, 650.82, 616.09, 772.13, 688.8, 764.65, 894.13, 891.22, 846.89, 902.32, 892.58, 1001.81, 964.5, 854.96, 863.66, 921.56, 893.93, 803.25], '1Y': [95.06, 91.31, 98.14, 99.63, 109.48, 108.15, 115.03, 118.98, 123.42, 132.55, 151.73, 170.9, 163.99, 162.71, 157.15, 156.78, 161, 193.8, 199.58, 259.89, 242.07, 299.36, 302.81, 360.33, 316.15, 387.41, 371.18, 392.88, 331.62, 354.49, 381.44, 504.42, 583.46, 667.77, 700.91, 558.44, 616.09, 772.13, 688.8, 826.88, 897.3, 894.07, 881.64, 949.93, 903.8, 970.7, 964.5, 854.96, 863.66, 921.56, 893.93, 803.25] },
      velocityScore: { '1D': 20.7, '1W': -11.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$62B', pe: 140.4, revenueGrowth: 90, eps: 5.72, grossMargin: 41, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.79, RKNG: 3.06 },
      tonyNote: 'LITE appears in 2 of 3 Meme ETFs (67% coverage) with average weight 3.9% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 2, avgWeight: 3.9, proScore: 2.6, coverage: 0.667,
      price: 48.53, weeklyPrices: [54.72, 50.30, 47.74, 47.21, 48.53], weeklyChange: -11.31, dayChange: 2.8, sortRank: 0, periodReturns: { '1M': -23.6, 'YTD': 28.5, '6M': 23.1, '1Y': 233.1 },
      priceHistory: { '1D': [47.21, 48.73, 48.71, 48.53], '1W': [54.72, 50.3, 47.74, 47.21, 48.53], '1M': [63.54, 65.33, 66.6, 65.48, 61.86, 54.35, 59.19, 54.02, 51.52, 56.71, 59.77, 60.85, 59.18, 58.11, 59.96, 56.87, 54.72, 50.3, 47.74, 47.21, 48.53], 'YTD': [37.77, 45.68, 51.89, 56.68, 53.74, 39.79, 40.03, 39.98, 40.95, 36.7, 41.58, 41.29, 35.09, 34.77, 39.32, 48.12, 50.64, 45.66, 61.2, 52.94, 56.83, 63.54, 54.35, 59.77, 56.87, 48.53], '6M': [39.41, 45.91, 52.99, 53.48, 62.94, 44.94, 42.67, 43.29, 44.24, 40.13, 41.37, 41.66, 37.45, 34.09, 37.06, 47.7, 52.02, 45.51, 56.85, 58.4, 58.06, 63.54, 54.35, 59.77, 56.87, 48.53], '1Y': [14.57, 16.89, 16.88, 18.59, 15.79, 16.45, 17.97, 20.7, 23.12, 29.11, 30.19, 36.45, 41.77, 46.93, 61.68, 69.56, 59.22, 64.99, 67.75, 60.17, 47.41, 48.49, 41.12, 46.84, 36.59, 42.07, 38.3, 43.63, 52.88, 52.26, 59.84, 39.79, 40.03, 39.98, 40.95, 36.7, 41.37, 41.66, 37.45, 34.77, 39.32, 48.12, 50.64, 45.66, 61.2, 52.94, 58.06, 63.54, 54.35, 59.77, 56.87, 48.53] },
      velocityScore: { '1D': -9.1, '1W': -37.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$17B', pe: 63, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 2.59, MEME: 5.21, RKNG: false },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 2, avgWeight: 3.66, proScore: 2.44, coverage: 0.667,
      price: 78.35, weeklyPrices: [72.87, 68.01, 65.62, 71.45, 78.35], weeklyChange: 7.52, dayChange: 9.66, sortRank: 0, periodReturns: { '1M': -30.9, 'YTD': 7.9, '6M': 9.6, '1Y': 67.7 },
      priceHistory: { '1D': [71.45, 78.1, 78.7, 78.35], '1W': [72.87, 68.01, 65.62, 71.45, 78.35], '1M': [113.41, 105.65, 118.17, 107.73, 107.29, 93.6, 92.06, 88.71, 87.32, 97.56, 82.41, 87.57, 82.25, 85.43, 80.66, 73.19, 72.87, 68.01, 65.62, 71.45, 78.35], 'YTD': [72.63, 90.56, 101.25, 113.57, 111.21, 93.27, 82.22, 80.2, 79.19, 89.47, 86.34, 89.93, 78.67, 92.62, 94.9, 85.53, 76.4, 70.89, 75.05, 83.67, 105.86, 113.41, 93.6, 82.41, 73.19, 78.35], '6M': [71.47, 97.49, 92.72, 103.5, 121.23, 103.5, 96.92, 86.4, 85.76, 93.86, 87.09, 94.09, 87.86, 83.99, 91.61, 90.94, 78.75, 73.9, 65.35, 83.01, 96.23, 113.41, 93.6, 82.41, 73.19, 78.35], '1Y': [46.73, 45.46, 51.12, 57.09, 53.09, 52.57, 45.92, 48.16, 50.01, 48.76, 36.91, 40.43, 54.8, 49.08, 74.75, 94.5, 82.81, 79.45, 71.14, 68.7, 56.6, 55, 56.89, 72.84, 68.37, 85.67, 74.68, 85.73, 95.22, 116.37, 122.09, 93.27, 82.22, 80.2, 79.19, 89.47, 87.09, 94.09, 87.86, 92.62, 94.9, 85.53, 76.4, 70.89, 75.05, 83.67, 96.23, 113.41, 93.6, 82.41, 73.19, 78.35] },
      velocityScore: { '1D': -10, '1W': -36.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$30B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.28, MEME: 5.04, RKNG: false },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'INTC', name: 'INTC', easyScore: 2, avgWeight: 3.33, proScore: 2.22, coverage: 0.667,
      price: 125.73, weeklyPrices: [132.28, 131.65, 132.87, 128.32, 125.73], weeklyChange: -4.95, dayChange: -2.02, sortRank: 0, periodReturns: { '1M': 9.6, 'YTD': 240.7, '6M': 242.8, '1Y': 461.3 },
      priceHistory: { '1D': [128.32, 125.87, 125.73], '1W': [132.28, 131.65, 132.87, 128.32, 125.73], '1M': [114.68, 109.33, 107.93, 112.71, 111.78, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 125.73], 'YTD': [36.9, 41.11, 48.32, 45.07, 46.47, 48.24, 46.48, 44.11, 45.61, 43.42, 45.77, 43.87, 43.13, 50.38, 62.38, 68.5, 82.54, 99.62, 124.92, 108.77, 119.84, 114.68, 99.17, 124.57, 140.94, 125.73], '6M': [36.68, 40.04, 47.29, 54.25, 48.78, 48.6, 48.29, 44.62, 45.46, 45.95, 45.25, 46.18, 44.1, 48.03, 61.72, 68.5, 66.78, 94.48, 109.62, 115.93, 118.5, 114.68, 99.17, 124.57, 140.94, 125.73], '1Y': [22.4, 23.59, 22.92, 23.24, 20.41, 20.19, 20.65, 23.66, 24.55, 24.21, 24.44, 25.27, 29.34, 33.55, 37.17, 35.63, 38.1, 39.54, 39.5, 38.45, 34.71, 35.79, 43.47, 40.5, 37.31, 36.35, 37.3, 42.63, 48.72, 54.32, 48.66, 48.24, 46.48, 44.11, 45.61, 43.42, 45.25, 46.18, 44.1, 50.38, 62.38, 68.5, 82.54, 99.62, 124.92, 108.77, 118.5, 114.68, 99.17, 124.57, 140.94, 125.73] },
      velocityScore: { '1D': 1.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$632B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 3.05, MEME: false, RKNG: 3.62 },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab', easyScore: 2, avgWeight: 3.04, proScore: 2.02, coverage: 0.667,
      price: 94.37, weeklyPrices: [95.12, 85.41, 80.69, 84.54, 94.37], weeklyChange: -0.79, dayChange: 11.63, sortRank: 0, periodReturns: { '1M': -34.2, 'YTD': 35.3, '6M': 34.6, '1Y': 163.8 },
      priceHistory: { '1D': [84.54, 93.91, 94.46, 94.37], '1W': [95.12, 85.41, 80.69, 84.54, 94.37], '1M': [143.48, 122.39, 123.32, 114.7, 119.95, 110.08, 113.65, 108.23, 105.05, 114.78, 102.39, 109.25, 104.63, 107.98, 107.24, 100.29, 95.12, 85.41, 80.69, 84.54, 94.37], 'YTD': [69.76, 83.08, 90.76, 88.9, 80.07, 66.32, 66.01, 70.86, 69.1, 70.11, 68.41, 67.23, 60.93, 67.73, 68.05, 84.8, 79.68, 78.81, 105.47, 124.77, 135.76, 143.48, 110.08, 102.39, 100.29, 94.37], '6M': [70.12, 86.03, 86.58, 87.82, 88.57, 73.11, 69.62, 76.58, 72.65, 70, 68.37, 71.93, 65.94, 65.52, 66.74, 82.93, 84.6, 82.51, 78.58, 132.55, 125.45, 143.48, 110.08, 102.39, 100.29, 94.37], '1Y': [35.77, 38.74, 44.6, 46.88, 43.79, 44.75, 45.02, 44.97, 47.22, 49.31, 47.03, 47.24, 52.91, 47.91, 61.51, 68.03, 67.35, 65.62, 61.34, 51.9, 43.31, 42.45, 41.9, 53.43, 55.49, 77.18, 70.45, 84.08, 91.8, 87.98, 85.68, 66.32, 66.01, 70.86, 69.1, 70.11, 68.37, 71.93, 65.94, 67.73, 68.05, 84.8, 79.68, 78.81, 105.47, 124.77, 125.45, 143.48, 110.08, 102.39, 100.29, 94.37] },
      velocityScore: { '1D': 25.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$59B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 1.63, MEME: 4.44, RKNG: false },
      tonyNote: 'Rocket Lab is the small-launch and space systems name that Electrification and AI infrastructure ETFs hold for satellite connectivity exposure — relevant to both GPS-dependent grids and low-orbit broadband that supports remote AI compute. Small market cap, no earnings, but consistent revenue growth and a rapidly expanding backlog.',
    },
    {
      ticker: 'QBTS', name: 'D-Wave Quantum', easyScore: 1, avgWeight: 5.31, proScore: 1.77, coverage: 0.333,
      price: 23.74, weeklyPrices: [25.03, 22.98, 21.91, 22.76, 23.74], weeklyChange: -5.15, dayChange: 4.31, sortRank: 0, periodReturns: { '1M': -21.2, 'YTD': -9.2, '6M': -9.2, '1Y': 62.2 },
      priceHistory: { '1D': [22.76, 23.77, 23.79, 23.74], '1W': [25.03, 22.98, 21.91, 22.76, 23.74], '1M': [30.14, 29.18, 29.91, 27.55, 27.64, 23.85, 25.83, 23.52, 23.25, 23.82, 23.37, 26.26, 23.94, 22.92, 24.69, 24.47, 25.03, 22.98, 21.91, 22.76, 23.74], 'YTD': [26.15, 29.28, 28.72, 25.63, 21.22, 17.21, 18.82, 18.06, 18.78, 18.59, 17.55, 15.73, 13.9, 14.32, 14.25, 21.69, 18.49, 20.49, 22.57, 20.35, 29.4, 30.14, 23.85, 23.37, 24.47, 23.74], '6M': [26.15, 31.27, 28.82, 26.04, 24.97, 20.11, 19.64, 19.38, 20.14, 18.83, 17.83, 16.1, 14.65, 13.7, 13.87, 21.52, 19.31, 20.28, 21.99, 22.13, 25.74, 30.14, 23.85, 23.37, 24.47, 23.74], '1Y': [14.64, 15.99, 16.15, 17.59, 17.67, 18.3, 17.37, 16.56, 15.02, 15.85, 16.15, 18.98, 27.52, 24.71, 35.72, 43.06, 34.4, 35.04, 33.09, 29.37, 22.83, 23.11, 22.5, 28.33, 25.52, 29.12, 26.25, 30.2, 30.15, 27.43, 23.22, 17.21, 18.82, 18.06, 18.78, 18.59, 17.83, 16.1, 14.65, 14.32, 14.25, 21.69, 18.49, 20.49, 22.57, 20.35, 25.74, 30.14, 23.85, 23.37, 24.47, 23.74] },
      velocityScore: { '1D': -7.3, '1W': -6.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: -81, eps: -1.14, grossMargin: 66, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.31, RKNG: false },
      tonyNote: 'D-Wave Quantum is a quantum computing company — the only publicly traded business built around quantum annealing hardware. Revenue is minimal and profitability is many years away, but it holds a position in Meme ETFs as the purest-play quantum computing stock available to retail investors. The ETF weight is small and the position is purely thematic.',
    },
    {
      ticker: 'COHR', name: 'COHR', easyScore: 1, avgWeight: 5.1, proScore: 1.7, coverage: 0.333,
      price: 369.85, weeklyPrices: [381.22, 392.50, 407.25, 380.56, 369.85], weeklyChange: -2.98, dayChange: -2.64, sortRank: 0, periodReturns: { '1M': 2.3, 'YTD': 100.4, '6M': 95.7, '1Y': 314.6 },
      priceHistory: { '1D': [379.89, 373.17, 374.05, 369.85], '1W': [381.22, 392.5, 407.25, 380.56, 369.85], '1M': [361.47, 362.9, 426.89, 417.43, 421.9, 376.99, 401.93, 355.94, 354.77, 363.58, 385.03, 413.84, 382.81, 378.85, 389.57, 425.48, 381.22, 392.5, 407.25, 380.56, 369.85], 'YTD': [184.57, 173.15, 195.96, 196.94, 212.18, 209.24, 216.1, 248.18, 258.93, 235.72, 242.76, 253.63, 243.48, 258.16, 307.5, 345.02, 336.09, 329.5, 335.26, 382.45, 377.57, 361.47, 376.99, 385.03, 425.48, 369.85], '6M': [189.02, 194.11, 190.03, 201.46, 221.14, 211, 223.69, 232.48, 250.14, 253.87, 241.27, 275.57, 243.29, 247.8, 284.17, 328, 337.68, 319.71, 319.19, 404.94, 378, 361.47, 376.99, 385.03, 425.48, 369.85], '1Y': [89.21, 90.4, 96.07, 97.02, 106.98, 105.6, 113.6, 90.49, 90.5, 87.8, 99.22, 104.47, 109.29, 107.72, 113.56, 109.37, 120.2, 134.99, 132, 166.72, 139.07, 151.81, 164.89, 192.73, 175.2, 191.87, 186.81, 191.62, 184.11, 202.72, 215.86, 209.24, 216.1, 248.18, 258.93, 235.72, 241.27, 275.57, 243.29, 258.16, 307.5, 345.02, 336.09, 329.5, 335.26, 382.45, 378, 361.47, 376.99, 385.03, 425.48, 369.85] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$72B', pe: 177, revenueGrowth: 21, eps: 2.09, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.1, RKNG: false },
      tonyNote: 'COHR appears in 1 of 3 Meme ETFs (33% coverage) with average weight 5.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AXTI', name: 'AXT Inc', easyScore: 1, avgWeight: 4.84, proScore: 1.61, coverage: 0.333,
      price: 69.66, weeklyPrices: [77.91, 70.14, 69.06, 70.15, 69.66], weeklyChange: -10.59, dayChange: -0.7, sortRank: 0, periodReturns: { '1M': -32.5, 'YTD': 326.1, '6M': 377.5, '1Y': 3233 },
      priceHistory: { '1D': [70.15, 71.25, 70.79, 69.66], '1W': [77.91, 70.14, 69.06, 70.15, 69.66], '1M': [103.16, 109.55, 110.85, 106.7, 105.99, 89.04, 90.78, 78.36, 85.29, 88.34, 97.18, 110.74, 93.04, 92.11, 84.57, 92.44, 77.91, 70.14, 69.06, 70.15, 69.66], 'YTD': [16.35, 25.83, 25.72, 17.4, 18.54, 20.43, 24.79, 29.68, 37.9, 32.37, 48.86, 54.24, 60.63, 52.84, 64.18, 82.56, 76.16, 96, 116.36, 123.78, 140.83, 103.16, 89.04, 97.18, 92.44, 69.66], '6M': [14.59, 20.17, 21.51, 19.78, 16.83, 18.75, 26.8, 23.81, 37.12, 38.8, 46.73, 58.09, 58.51, 47.14, 63.12, 81.78, 75.27, 79.22, 108.42, 114.98, 121.02, 103.16, 89.04, 97.18, 92.44, 69.66], '1Y': [2.09, 2.37, 2.36, 2.35, 2.29, 2.05, 2.18, 2.07, 2.84, 3.28, 3.04, 4.01, 4.8, 4.49, 5.31, 4.57, 4.91, 6.19, 8.46, 10.44, 10.25, 9.34, 11.76, 14.96, 13, 14.64, 15.8, 24.11, 22.1, 17.92, 16.38, 20.43, 24.79, 29.68, 37.9, 32.37, 46.73, 58.09, 58.51, 52.84, 64.18, 82.56, 76.16, 96, 116.36, 123.78, 121.02, 103.16, 89.04, 97.18, 92.44, 69.66] },
      velocityScore: { '1D': 17.5, '1W': 8.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5B', pe: null, revenueGrowth: 39, eps: -0.32, grossMargin: 21, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.84, RKNG: false },
      tonyNote: 'AXT Inc is a compound semiconductor substrate manufacturer — gallium arsenide, indium phosphide, and germanium wafers used in data center optical transceivers, 5G RF chips, and solar cells. Revenue is growing with optical networking demand. Small market cap but positioned at a genuine supply-chain chokepoint for III-V semiconductor materials.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 1, avgWeight: 4.69, proScore: 1.56, coverage: 0.333,
      price: 52.13, weeklyPrices: [57.85, 53.60, 50.56, 49.31, 52.13], weeklyChange: -9.89, dayChange: 6, sortRank: 0, periodReturns: { '1M': -27.7, 'YTD': 16.2, '6M': 15.2, '1Y': 21.3 },
      priceHistory: { '1D': [49.18, 52.25, 52.11, 52.13], '1W': [57.85, 53.6, 50.56, 49.31, 52.13], '1M': [72.07, 69.28, 71.4, 68.23, 65.66, 56.78, 62.8, 56.69, 56.63, 57.99, 57.85, 61.18, 56.06, 54.69, 56.55, 58.32, 57.85, 53.6, 50.56, 49.31, 52.13], 'YTD': [44.87, 50.45, 47.56, 47.25, 39.98, 30.43, 31.3, 31.9, 38.37, 35.73, 32.98, 31.2, 27.51, 29.3, 28.79, 46.09, 42.69, 46.2, 49.24, 51.95, 63.64, 72.07, 56.78, 57.85, 58.32, 52.13], '6M': [45.25, 50.76, 48.94, 48.33, 45.8, 35.34, 33.61, 33.43, 40.88, 36.02, 33.03, 31.9, 29.84, 27.79, 28.08, 44.68, 43.63, 45.12, 47.68, 57.47, 58.89, 72.07, 56.78, 57.85, 58.32, 52.13], '1Y': [42.97, 44.97, 41.47, 41.94, 40.53, 42.02, 44.94, 40.23, 38.68, 42.99, 44, 62.26, 75.14, 61.5, 79.23, 77.55, 59.94, 62.8, 58.4, 55.37, 47.79, 46.76, 46.93, 54.44, 49.67, 51.39, 45.31, 49.78, 50.88, 49.33, 43.24, 30.43, 31.3, 31.9, 38.37, 35.73, 33.03, 31.9, 29.84, 29.3, 28.79, 46.09, 42.69, 46.2, 49.24, 51.95, 58.89, 72.07, 56.78, 57.85, 58.32, 52.13] },
      velocityScore: { '1D': -21.2, '1W': -38.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 133.7, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.69, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'CRWV', name: 'CRWV', easyScore: 1, avgWeight: 4.43, proScore: 1.48, coverage: 0.333,
      price: 95.92, weeklyPrices: [105.72, 100.88, 98.76, 96.58, 95.92], weeklyChange: -9.27, dayChange: -0.68, sortRank: 0, periodReturns: { '1M': -12.4, 'YTD': 33.9, '6M': 28, '1Y': -41.2 },
      priceHistory: { '1D': [96.58, 96.58, 96.44, 95.92], '1W': [105.72, 100.88, 98.76, 96.58, 95.92], '1M': [109.53, 124.82, 119.27, 110.93, 108.03, 100.39, 102.37, 98.45, 95.61, 95.74, 100.55, 106.71, 117.03, 115.21, 117.95, 111.29, 105.72, 100.88, 98.76, 96.58, 95.92], 'YTD': [71.61, 77.09, 95.01, 92.98, 93.19, 74.65, 95.7, 89.25, 79.56, 72.99, 81.11, 81.47, 74.81, 82.24, 102, 116.85, 110.14, 119.01, 114.15, 107.3, 105.49, 109.53, 100.39, 100.55, 111.29, 95.92], '6M': [74.92, 77.94, 87.48, 94.05, 106.02, 82.46, 95.15, 97.14, 97.63, 74.82, 79.86, 80.66, 80.45, 78.44, 92, 119.56, 117.42, 111.6, 128.84, 114.21, 107.58, 109.53, 100.39, 100.55, 111.29, 95.92], '1Y': [163.06, 151.45, 140.59, 129.77, 108.74, 111.84, 139.78, 96.8, 92.38, 93.34, 100.22, 118.75, 130.89, 136.85, 128.83, 134.06, 127.06, 136.06, 126.32, 105.61, 75.33, 73.6, 76.03, 90.66, 69.5, 80.26, 73.9, 77.18, 89.8, 91.79, 99.53, 74.65, 95.7, 89.25, 79.56, 72.99, 79.86, 80.66, 80.45, 82.24, 102, 116.85, 110.14, 119.01, 114.15, 107.3, 107.58, 109.53, 100.39, 100.55, 111.29, 95.92] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$52B', pe: null, revenueGrowth: 112, eps: -2.72, grossMargin: 69, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.43, RKNG: false },
      tonyNote: 'CRWV appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WEN', name: 'WEN', easyScore: 1, avgWeight: 3.88, proScore: 1.29, coverage: 0.333,
      price: 7.53, weeklyPrices: [6.26, 7.86, 7.33, 7.80, 7.53], weeklyChange: 20.29, dayChange: -3.46, sortRank: 0, periodReturns: { '1M': -2.2, 'YTD': -9.6, '6M': -9.5, '1Y': -34.1 },
      priceHistory: { '1D': [7.8, 7.55, 7.51, 7.53], '1W': [6.26, 7.86, 7.33, 7.8, 7.53], '1M': [7.7, 7.85, 7.21, 6.85, 6.75, 6.71, 6.74, 6.71, 6.63, 6.79, 6.79, 6.91, 6.77, 6.95, 6.8, 6.17, 6.26, 7.86, 7.33, 7.8, 7.53], 'YTD': [8.33, 8.38, 8.54, 8.42, 7.79, 8.04, 7.27, 8.09, 7.66, 7.42, 7.17, 7.09, 6.8, 6.88, 6.89, 6.95, 7.14, 6.7, 7.3, 8.02, 7.81, 7.7, 6.71, 6.79, 6.17, 7.53], '6M': [8.32, 8.44, 8.34, 8.36, 7.94, 8.06, 7.88, 8.32, 7.74, 7.25, 7.21, 7.06, 6.99, 6.9, 7.1, 6.85, 6.93, 6.96, 6.95, 8.11, 7.62, 7.7, 6.71, 6.79, 6.17, 7.53], '1Y': [11.42, 11.29, 10.51, 10.84, 10.18, 9.95, 10.3, 10.68, 10.52, 10.27, 9.92, 9.56, 9.09, 9.16, 9.11, 8.92, 8.93, 8.93, 8.43, 8.54, 8.4, 7.9, 8.49, 8.16, 8.35, 8.22, 8.28, 8.22, 8.48, 8.43, 7.72, 8.04, 7.27, 8.09, 7.66, 7.42, 7.21, 7.06, 6.99, 6.88, 6.89, 6.95, 7.14, 6.7, 7.3, 8.02, 7.62, 7.7, 6.71, 6.79, 6.17, 7.53] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$1B', pe: 9.8, revenueGrowth: 3, eps: 0.77, grossMargin: 34, dividendYield: 7.17,
      etfPresence: { BUZZ: false, MEME: 3.88, RKNG: false },
      tonyNote: 'WEN appears in 1 of 3 Meme ETFs (33% coverage) with average weight 3.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IBRX', name: 'IBRX', easyScore: 1, avgWeight: 3.76, proScore: 1.25, coverage: 0.333,
      price: 9, weeklyPrices: [7.32, 7.80, 7.79, 8.71, 9.00], weeklyChange: 22.95, dayChange: 3.33, sortRank: 0, periodReturns: { '1M': 19.7, 'YTD': 354.5, '6M': 341.2, '1Y': 240.9 },
      priceHistory: { '1D': [8.71, 8.9, 8.93, 9], '1W': [7.32, 7.8, 7.79, 8.71, 9], '1M': [7.52, 7.24, 7.23, 7.18, 7.29, 6.92, 7.17, 7.25, 6.98, 7.2, 7.1, 7.13, 6.72, 6.99, 7.36, 7.22, 7.32, 7.8, 7.79, 8.71, 9], 'YTD': [1.98, 2.24, 3.95, 6.45, 6.25, 5.64, 6.62, 8.7, 9.78, 8.67, 8.39, 8.47, 7.38, 7.3, 7.28, 7.7, 7.44, 7.11, 8.51, 7.97, 7.22, 7.52, 6.92, 7.1, 7.22, 9], '6M': [2.04, 2.14, 2.82, 6.92, 6.15, 5.88, 6.54, 8.61, 9.55, 8.96, 7.82, 8.82, 7.38, 7.14, 7.48, 7.25, 8.19, 7.1, 7.76, 8.15, 7.74, 7.52, 6.92, 7.1, 7.22, 9], '1Y': [2.64, 2.71, 2.74, 2.71, 2.54, 2.41, 2.47, 2.43, 2.25, 2.38, 2.57, 2.81, 2.59, 2.46, 2.5, 2.51, 2.45, 2.66, 2.26, 2.16, 2.03, 2.15, 2.09, 2.22, 2.16, 2.1, 1.98, 2.2, 3.02, 7.34, 5.91, 5.64, 6.62, 8.7, 9.78, 8.67, 7.82, 8.82, 7.38, 7.3, 7.28, 7.7, 7.44, 7.11, 8.51, 7.97, 7.74, 7.52, 6.92, 7.1, 7.22, 9] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$9B', pe: null, revenueGrowth: 168, eps: -0.85, grossMargin: 99, dividendYield: null,
      etfPresence: { BUZZ: 3.76, MEME: false, RKNG: false },
      tonyNote: 'IBRX appears in 1 of 3 Meme ETFs (33% coverage) with average weight 3.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DELL', name: 'DELL', easyScore: 1, avgWeight: 3.72, proScore: 1.24, coverage: 0.333,
      price: 392.26, weeklyPrices: [427.78, 434.06, 409.45, 399.49, 392.26], weeklyChange: -8.3, dayChange: -0.47, sortRank: 0, periodReturns: { '1M': -6.8, 'YTD': 211.6, '6M': 207.8, '1Y': 220 },
      priceHistory: { '1D': [394.1, 388.45, 392.26], '1W': [427.78, 434.06, 409.45, 399.49, 392.26], '1M': [420.91, 465.96, 435.31, 421.08, 422.05, 394.39, 400.77, 381.78, 369.83, 391.45, 395.57, 409.07, 404.08, 419.32, 409.5, 418.71, 427.78, 434.06, 409.45, 399.49, 392.26], 'YTD': [125.88, 118.5, 119.66, 115.43, 114.44, 115.39, 112.82, 122.27, 148.08, 146.48, 151.62, 157.67, 171.81, 174.37, 177.8, 196.55, 216.09, 210.17, 260.46, 241.99, 295.19, 420.91, 394.39, 395.57, 418.71, 392.26], '6M': [127.46, 123.93, 119.66, 113.26, 117.32, 122.04, 124.16, 119.06, 121.45, 146.52, 149.91, 156.76, 175.82, 169.38, 181.46, 193.09, 212.14, 208.95, 230.27, 247.89, 252.8, 420.91, 394.39, 395.57, 418.71, 392.26], '1Y': [122.6, 124.39, 125.69, 124.33, 133.51, 130.48, 138.32, 138.13, 131.01, 120.96, 121.29, 127.68, 134.34, 141.77, 150.87, 148.77, 147.87, 162.19, 160.11, 142.69, 122.48, 127.22, 135.95, 138.22, 133.75, 127.62, 127.92, 120.07, 118.69, 117.17, 118.49, 115.39, 112.82, 122.27, 148.08, 146.48, 149.91, 156.76, 175.82, 174.37, 177.8, 196.55, 216.09, 210.17, 260.46, 241.99, 252.8, 420.91, 394.39, 395.57, 418.71, 392.26] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$253B', pe: 31.3, revenueGrowth: 88, eps: 12.54, grossMargin: 19, dividendYield: 0.63,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 3.72 },
      tonyNote: 'DELL appears in 1 of 3 Meme ETFs (33% coverage) with average weight 3.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
