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
export const SPY_RET: Record<Period, number> = { '1W': 1.8, '1M': -1.3, 'YTD': 9.5, '6M': 8.7, '1Y': 20.9 };
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
  'AI & ML':         { '1W': 5.2, '1M': 2.9, 'YTD': 54.7, '6M': 53.1, '1Y': 92 },
  'Semiconductors':  { '1W': 7.3, '1M': 13, 'YTD': 127.7, '6M': 125.5, '1Y': 173.3 },
  'Broad Tech':      { '1W': 4.6, '1M': 0, 'YTD': 33.3, '6M': 32.3, '1Y': 52.4 },
  'Electrification': { '1W': 1.9, '1M': -3.8, 'YTD': 31.8, '6M': 30.5, '1Y': 54.8 },
  'Industrials':     { '1W': 1.5, '1M': 0.9, 'YTD': 27.2, '6M': 25.6, '1Y': 42.4 },
  'Meme':            { '1W': 3.7, '1M': -8.6, 'YTD': 27, '6M': 26, '1Y': 11.4 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, IndexChartByPeriod> = {
  'AI & ML': {
    '1D': { top10: [100, 100.84, 101.83, 102.15, 102.43, 101.93, 102.26, 102.14, 102.18, 102.4, 102.54, 102.45, 102.62, 102.62, 102.68, 102.74, 102.82, 102.83, 102.96, 103.03, 103.11, 103.03, 103.15, 103.02], spy: [100, 100.12, 100.48, 100.35, 100.48, 100.32, 100.52, 100.57, 100.54, 100.67, 100.73, 100.73, 100.8, 100.76, 100.74, 100.72, 100.76, 100.8, 100.77, 100.83, 100.91, 100.87, 100.8, 100.78], top10Return: 3.2, spyReturn: 0.78, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 101.83, 99.22, 102.19, 105.2], spy: [100, 100.14, 99.42, 101.06, 101.85], top10Return: 5.2, spyReturn: 1.8, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 101.86, 100.9, 99.35, 90.86, 93.72, 91.87, 88.98, 93.8, 94.45, 99.4, 96.45, 96.94, 101.13, 101.95, 95.9, 95.05, 96.84, 94.3, 97.13, 100.01], spy: [100, 100.14, 99.43, 99.81, 97.23, 97.45, 97.17, 95.64, 97.26, 97.79, 99.51, 98.92, 97.68, 98.44, 98.13, 96.71, 96.66, 96.8, 96.1, 97.69, 98.45], top10Return: 2.9, spyReturn: -1.3, xLabels: ["Jun 2", "Jun 9", "Jun 16", "Jun 23", "Jun 30"] },
    'YTD': { top10: [100, 102.26, 104.35, 105.09, 104.21, 102.1, 102.57, 104.13, 103.13, 98.84, 99.95, 99.4, 95, 100.45, 110.68, 117.96, 122.69, 125.68, 138.29, 134.83, 140.17, 153.97, 144.36, 153.46, 148.29, 154.66], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 101.1, 100.6, 98.6, 97.12, 95.11, 92.99, 96.63, 100.61, 103.93, 104.88, 105.29, 108.41, 108.4, 109.34, 111.24, 108.4, 110.69, 107.58, 109.51], top10Return: 54.7, spyReturn: 9.5, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 103.02, 102.68, 104.14, 106.2, 96.19, 100.93, 103.12, 102.12, 97.88, 98.98, 98.43, 94.08, 98.81, 106.94, 116.49, 121.69, 123.56, 133.95, 133.52, 138.8, 152.46, 142.95, 151.95, 146.83, 153.15], spy: [100, 100.37, 100.49, 100.29, 101.02, 98.63, 99.16, 100.35, 99.85, 97.87, 96.4, 94.4, 92.3, 95.46, 98.9, 103.37, 103.92, 104.9, 107.37, 107.59, 108.53, 110.41, 107.6, 109.87, 106.78, 108.7], top10Return: 53.1, spyReturn: 8.7, xLabels: ["Dec", "Jan", "Mar", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.6, 103.53, 105.68, 108.17, 108.54, 111.09, 107.08, 108.77, 108.69, 116.28, 118.67, 120.42, 122.69, 127.94, 125.45, 125.51, 132.05, 128.19, 127.29, 118.64, 120.28, 124.91, 128.69, 117.17, 125.53, 123.19, 126.03, 128.71, 129.64, 128.58, 126.1, 126.7, 126.02, 127.94, 125.99, 123.46, 122.8, 117.36, 124.1, 136.89, 145.84, 151.74, 155.44, 171.23, 163.57, 173.72, 190.72, 178.93, 190.36, 183.99, 191.98], spy: [100, 101.04, 101.06, 102.68, 102.72, 102.45, 104.05, 103.59, 104.45, 104.22, 105.6, 106.72, 107.03, 108.22, 108.98, 107.69, 108.68, 111.24, 109.32, 110.58, 106.87, 109.29, 110.72, 111.32, 108.7, 111.78, 110.41, 111.63, 112.08, 111.59, 112.03, 111.81, 110.38, 110.48, 111.13, 109.81, 107.23, 105.01, 102.66, 106.68, 111.08, 114.74, 115.79, 116.25, 119.7, 119.59, 120.72, 122.81, 119.68, 122.21, 118.77, 120.91], top10Return: 92, spyReturn: 20.9, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Semiconductors': {
    '1D': { top10: [100, 101.31, 102.65, 102.92, 103.13, 102.7, 103.22, 102.92, 103.05, 103.22, 103.5, 103.41, 103.51, 103.76, 103.87, 104.03, 104.05, 104.1, 104.28, 104.53, 104.77, 104.69, 104.76, 104.43], spy: [100, 100.12, 100.48, 100.35, 100.48, 100.32, 100.52, 100.57, 100.54, 100.67, 100.73, 100.73, 100.8, 100.76, 100.74, 100.72, 100.76, 100.8, 100.77, 100.83, 100.91, 100.87, 100.8, 100.78], top10Return: 4.4, spyReturn: 0.78, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 105.06, 99.37, 102.73, 107.29], spy: [100, 100.14, 99.42, 101.06, 101.85], top10Return: 7.3, spyReturn: 1.8, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 104.94, 106.22, 103.58, 91.48, 96.85, 95.32, 92.14, 100.97, 102.47, 108.46, 102.8, 103.86, 111.62, 115.28, 104.66, 104, 109.3, 103.36, 106.91, 111.66], spy: [100, 100.14, 99.43, 99.81, 97.23, 97.45, 97.17, 95.64, 97.26, 97.79, 99.51, 98.92, 97.68, 98.44, 98.13, 96.71, 96.66, 96.8, 96.1, 97.69, 98.45], top10Return: 13, spyReturn: -1.3, xLabels: ["Jun 2", "Jun 9", "Jun 16", "Jun 23", "Jun 30"] },
    'YTD': { top10: [100, 107.01, 113.64, 117.36, 117.24, 119.41, 122.25, 123.18, 123.34, 121.84, 124.07, 132.29, 129.66, 130.74, 146.91, 160.68, 171.71, 182.45, 197.64, 185.87, 198.94, 206.92, 211.24, 219.31, 215.78, 227.73], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 101.1, 100.6, 98.6, 97.12, 95.11, 92.99, 96.63, 100.61, 103.93, 104.88, 105.29, 108.41, 108.4, 109.34, 111.24, 108.4, 110.69, 107.58, 109.51], top10Return: 127.7, spyReturn: 9.5, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 106.91, 111.3, 118.22, 119.53, 113.85, 120.28, 121.96, 122.14, 120.75, 122.95, 131.16, 128.54, 128.53, 143.56, 157.86, 173.04, 181.25, 191.72, 184.06, 197.03, 204.98, 209.31, 217.17, 213.71, 225.51], spy: [100, 100.37, 100.49, 100.29, 101.02, 98.63, 99.16, 100.35, 99.85, 97.87, 96.4, 94.4, 92.3, 95.46, 98.9, 103.37, 103.92, 104.9, 107.37, 107.59, 108.53, 110.41, 107.6, 109.87, 106.78, 108.7], top10Return: 125.5, spyReturn: 8.7, xLabels: ["Dec", "Jan", "Mar", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 103.81, 103.85, 106.03, 107.5, 106.01, 111.95, 108.99, 112.65, 110.25, 114.74, 119.49, 121.49, 123.76, 129.44, 129.55, 130.9, 135.01, 132.96, 136.72, 129.72, 138.68, 148.58, 148.42, 141.38, 146.67, 140.45, 147.93, 154.57, 158.26, 156.73, 167.23, 171.09, 170.72, 175.16, 169.23, 168.09, 156.28, 158.65, 164.6, 177.31, 194.81, 206.45, 214.91, 240.5, 233.04, 252.44, 245.41, 245.07, 265.96, 258.44, 273.31], spy: [100, 101.04, 101.06, 102.68, 102.72, 102.45, 104.05, 103.59, 104.45, 104.22, 105.6, 106.72, 107.03, 108.22, 108.98, 107.69, 108.68, 111.24, 109.32, 110.58, 106.87, 109.29, 110.72, 111.32, 108.7, 111.78, 110.41, 111.63, 112.08, 111.59, 112.03, 111.81, 110.38, 110.48, 111.13, 109.81, 107.23, 105.01, 102.66, 106.68, 111.08, 114.74, 115.79, 116.25, 119.7, 119.59, 120.72, 122.81, 119.68, 122.21, 118.77, 120.91], top10Return: 173.3, spyReturn: 20.9, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Broad Tech': {
    '1D': { top10: [100, 100.43, 101.1, 101.25, 101.44, 101.09, 101.09, 101.25, 101.16, 101.24, 101.32, 101.4, 101.5, 101.52, 101.6, 101.58, 101.67, 101.7, 101.71, 101.77, 101.95, 101.95, 102.06, 102.05], spy: [100, 100.12, 100.48, 100.35, 100.48, 100.32, 100.52, 100.57, 100.54, 100.67, 100.73, 100.73, 100.8, 100.76, 100.74, 100.72, 100.76, 100.8, 100.77, 100.83, 100.91, 100.87, 100.8, 100.78], top10Return: 2, spyReturn: 0.78, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 100.8, 99.91, 102.52, 104.64], spy: [100, 100.14, 99.42, 101.06, 101.85], top10Return: 4.6, spyReturn: 1.8, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 101.26, 100.02, 99.65, 92.77, 94.48, 92.81, 90.57, 94.62, 95.1, 98.5, 96.87, 96.54, 98.82, 98.6, 95.25, 94.24, 95.12, 94.12, 96.48, 98.47], spy: [100, 100.14, 99.43, 99.81, 97.23, 97.45, 97.17, 95.64, 97.26, 97.79, 99.51, 98.92, 97.68, 98.44, 98.13, 96.71, 96.66, 96.8, 96.1, 97.69, 98.45], top10Return: 0, spyReturn: -1.3, xLabels: ["Jun 2", "Jun 9", "Jun 16", "Jun 23", "Jun 30"] },
    'YTD': { top10: [100, 103.16, 104.96, 104.89, 102.11, 100.41, 101.55, 102.97, 103.68, 100.34, 100.08, 98.78, 95.92, 100.68, 108.32, 114.28, 116.2, 119.62, 128.1, 123.7, 126.04, 133.78, 127.72, 132.74, 128.83, 133.28], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 101.1, 100.6, 98.6, 97.12, 95.11, 92.99, 96.63, 100.61, 103.93, 104.88, 105.29, 108.41, 108.4, 109.34, 111.24, 108.4, 110.69, 107.58, 109.51], top10Return: 33.3, spyReturn: 9.5, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 103.36, 103.96, 104.2, 103.96, 95.41, 99.67, 102.2, 102.9, 99.59, 99.33, 98.04, 95.2, 99.44, 105.36, 112.99, 115.57, 117.62, 125.25, 122.8, 125.12, 132.81, 126.79, 131.77, 127.89, 132.3], spy: [100, 100.37, 100.49, 100.29, 101.02, 98.63, 99.16, 100.35, 99.85, 97.87, 96.4, 94.4, 92.3, 95.46, 98.9, 103.37, 103.92, 104.9, 107.37, 107.59, 108.53, 110.41, 107.6, 109.87, 106.78, 108.7], top10Return: 32.3, spyReturn: 8.7, xLabels: ["Dec", "Jan", "Mar", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.28, 102.93, 104.91, 104.82, 105.44, 105.22, 103.71, 106.37, 106.26, 109.83, 113.09, 115.75, 116.64, 121.64, 122.89, 119.58, 123.48, 120.89, 119.59, 112.32, 114.71, 116.3, 118.36, 111.48, 117.3, 114.62, 117.94, 120.87, 121.76, 119.89, 119.03, 119.12, 118.83, 122.02, 119.69, 118.31, 118.91, 115.35, 119.64, 126.32, 131.18, 133.53, 136.98, 143.61, 138.62, 144.32, 152.75, 145.88, 150.82, 148.37, 152.39], spy: [100, 101.04, 101.06, 102.68, 102.72, 102.45, 104.05, 103.59, 104.45, 104.22, 105.6, 106.72, 107.03, 108.22, 108.98, 107.69, 108.68, 111.24, 109.32, 110.58, 106.87, 109.29, 110.72, 111.32, 108.7, 111.78, 110.41, 111.63, 112.08, 111.59, 112.03, 111.81, 110.38, 110.48, 111.13, 109.81, 107.23, 105.01, 102.66, 106.68, 111.08, 114.74, 115.79, 116.25, 119.7, 119.59, 120.72, 122.81, 119.68, 122.21, 118.77, 120.91], top10Return: 52.4, spyReturn: 20.9, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Electrification': {
    '1D': { top10: [100, 100.99, 101.48, 101.85, 102.16, 101.65, 101.68, 101.7, 101.76, 101.79, 101.78, 102.07, 102.03, 102.03, 102.25, 102.29, 102.32, 102.4, 102.36, 102.35, 102.51, 102.44, 102.32, 102.33], spy: [100, 100.12, 100.48, 100.35, 100.48, 100.32, 100.52, 100.57, 100.54, 100.67, 100.73, 100.73, 100.8, 100.76, 100.74, 100.72, 100.76, 100.8, 100.77, 100.83, 100.91, 100.87, 100.8, 100.78], top10Return: 2.1, spyReturn: 0.78, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 100.51, 97.77, 99.74, 101.87], spy: [100, 100.14, 99.42, 101.06, 101.85], top10Return: 1.9, spyReturn: 1.8, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 102.09, 101.05, 100.96, 94.78, 94.9, 93.81, 90.79, 94.48, 95.39, 97.55, 96.57, 96.56, 98.76, 99.85, 95.47, 94.86, 95.43, 92.76, 94.57, 96.59], spy: [100, 100.14, 99.43, 99.81, 97.23, 97.45, 97.17, 95.64, 97.26, 97.79, 99.51, 98.92, 97.68, 98.44, 98.13, 96.71, 96.66, 96.8, 96.1, 97.69, 98.45], top10Return: -3.8, spyReturn: -1.3, xLabels: ["Jun 2", "Jun 9", "Jun 16", "Jun 23", "Jun 30"] },
    'YTD': { top10: [100, 103.61, 108.25, 111.14, 110.01, 113.49, 114.8, 116.39, 116.87, 110.05, 112.73, 111.52, 111.46, 113.77, 121.27, 125.13, 128.96, 133.12, 138.48, 132.79, 134.82, 137.31, 130.96, 133.42, 129.71, 131.82], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 101.1, 100.6, 98.6, 97.12, 95.11, 92.99, 96.63, 100.61, 103.93, 104.88, 105.29, 108.41, 108.4, 109.34, 111.24, 108.4, 110.69, 107.58, 109.51], top10Return: 31.8, spyReturn: 9.5, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 102.99, 106.37, 110.63, 111.35, 108.87, 112.78, 115.29, 115.77, 109.02, 111.67, 110.48, 110.41, 112.32, 118.99, 123.61, 128.18, 132.11, 134.63, 131.47, 133.48, 135.94, 129.68, 132.11, 128.44, 130.54], spy: [100, 100.37, 100.49, 100.29, 101.02, 98.63, 99.16, 100.35, 99.85, 97.87, 96.4, 94.4, 92.3, 95.46, 98.9, 103.37, 103.92, 104.9, 107.37, 107.59, 108.53, 110.41, 107.6, 109.87, 106.78, 108.7], top10Return: 30.5, spyReturn: 8.7, xLabels: ["Dec", "Jan", "Mar", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 103.41, 104.36, 108.37, 106.17, 105.67, 108.09, 108.5, 110.66, 108.82, 110.3, 112.99, 115.94, 118.51, 123.53, 127.77, 124.63, 126.48, 124.54, 127.38, 121.53, 122.98, 125.66, 128, 122.92, 127.57, 123.34, 126.75, 131.55, 135.22, 132.21, 134.71, 135.03, 135.41, 138.44, 134.62, 135.48, 134.45, 135.74, 138.97, 145.64, 150.59, 151.09, 155.16, 162.11, 155.5, 159.32, 160.58, 156.02, 156.72, 152.83, 154.82], spy: [100, 101.04, 101.06, 102.68, 102.72, 102.45, 104.05, 103.59, 104.45, 104.22, 105.6, 106.72, 107.03, 108.22, 108.98, 107.69, 108.68, 111.24, 109.32, 110.58, 106.87, 109.29, 110.72, 111.32, 108.7, 111.78, 110.41, 111.63, 112.08, 111.59, 112.03, 111.81, 110.38, 110.48, 111.13, 109.81, 107.23, 105.01, 102.66, 106.68, 111.08, 114.74, 115.79, 116.25, 119.7, 119.59, 120.72, 122.81, 119.68, 122.21, 118.77, 120.91], top10Return: 54.8, spyReturn: 20.9, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Industrials': {
    '1D': { top10: [100, 100.25, 100.57, 100.55, 100.75, 100.64, 100.8, 100.86, 100.75, 100.7, 100.81, 100.78, 100.75, 100.68, 100.72, 100.79, 100.8, 100.87, 100.86, 100.98, 101.07, 101.02, 101, 100.93], spy: [100, 100.12, 100.48, 100.35, 100.48, 100.32, 100.52, 100.57, 100.54, 100.67, 100.73, 100.73, 100.8, 100.76, 100.74, 100.72, 100.76, 100.8, 100.77, 100.83, 100.91, 100.87, 100.8, 100.78], top10Return: 0.9, spyReturn: 0.78, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 100.39, 99.51, 101.05, 101.45], spy: [100, 100.14, 99.42, 101.06, 101.85], top10Return: 1.5, spyReturn: 1.8, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 100.65, 100.17, 101.04, 98.92, 99.36, 99.42, 96.97, 100.36, 100.65, 99.64, 100.63, 100.53, 101.22, 101.9, 100.98, 100.9, 101.3, 100.38, 101.97, 102.36], spy: [100, 100.14, 99.43, 99.81, 97.23, 97.45, 97.17, 95.64, 97.26, 97.79, 99.51, 98.92, 97.68, 98.44, 98.13, 96.71, 96.66, 96.8, 96.1, 97.69, 98.45], top10Return: 0.9, spyReturn: -1.3, xLabels: ["Jun 2", "Jun 9", "Jun 16", "Jun 23", "Jun 30"] },
    'YTD': { top10: [100, 105.14, 110.48, 110.36, 110.07, 114.34, 117.61, 120, 118.69, 112.71, 110.92, 109.8, 109.55, 113.21, 119.69, 120.93, 120.95, 121.72, 124.81, 122.55, 121.81, 123.22, 123.03, 124.65, 125.35, 127.16], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 101.1, 100.6, 98.6, 97.12, 95.11, 92.99, 96.63, 100.61, 103.93, 104.88, 105.29, 108.41, 108.4, 109.34, 111.24, 108.4, 110.69, 107.58, 109.51], top10Return: 27.2, spyReturn: 9.5, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 103.44, 107.51, 109.34, 109.8, 109.39, 114.29, 118.37, 117.42, 112.78, 110.28, 108.53, 109.1, 111.43, 117.14, 118.69, 118.73, 120.14, 122.79, 120.84, 120.22, 121.75, 121.5, 123.1, 123.77, 125.56], spy: [100, 100.37, 100.49, 100.29, 101.02, 98.63, 99.16, 100.35, 99.85, 97.87, 96.4, 94.4, 92.3, 95.46, 98.9, 103.37, 103.92, 104.9, 107.37, 107.59, 108.53, 110.41, 107.6, 109.87, 106.78, 108.7], top10Return: 25.6, spyReturn: 8.7, xLabels: ["Dec", "Jan", "Mar", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.01, 102.51, 104.21, 104.55, 104.47, 106.07, 104.48, 106.55, 105.06, 106.95, 108, 109.51, 111.62, 113.22, 111.81, 112.68, 114.37, 112.31, 111.84, 106.88, 109.2, 109.96, 112.25, 109.94, 114.3, 112.06, 117.88, 124.18, 124.5, 124.2, 128.74, 131.64, 133, 133.02, 127.26, 123.24, 122.94, 122.85, 126.54, 133.64, 135.25, 135.53, 135.96, 139.68, 136.1, 136.02, 138.1, 137.82, 139.64, 140.45, 142.44], spy: [100, 101.04, 101.06, 102.68, 102.72, 102.45, 104.05, 103.59, 104.45, 104.22, 105.6, 106.72, 107.03, 108.22, 108.98, 107.69, 108.68, 111.24, 109.32, 110.58, 106.87, 109.29, 110.72, 111.32, 108.7, 111.78, 110.41, 111.63, 112.08, 111.59, 112.03, 111.81, 110.38, 110.48, 111.13, 109.81, 107.23, 105.01, 102.66, 106.68, 111.08, 114.74, 115.79, 116.25, 119.7, 119.59, 120.72, 122.81, 119.68, 122.21, 118.77, 120.91], top10Return: 42.4, spyReturn: 20.9, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Meme': {
    '1D': { top10: [100, 100.18, 100.81, 101.41, 101.81, 101.09, 101.31, 101.11, 100.63, 101.04, 101.25, 101.32, 101.32, 101.62, 101.58, 101.84, 101.84, 101.73, 101.98, 101.82, 101.82, 101.81, 102.06, 101.81], spy: [100, 100.12, 100.48, 100.35, 100.48, 100.32, 100.52, 100.57, 100.54, 100.67, 100.73, 100.73, 100.8, 100.76, 100.74, 100.72, 100.76, 100.8, 100.77, 100.83, 100.91, 100.87, 100.8, 100.78], top10Return: 2.2, spyReturn: 0.78, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 99.45, 97.37, 101.62, 103.73], spy: [100, 100.14, 99.42, 101.06, 101.85], top10Return: 3.7, spyReturn: 1.8, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 102.46, 98.88, 99.41, 89.27, 91.56, 88.31, 85.88, 91.43, 90.27, 95.3, 91.57, 92.14, 95.42, 95.29, 90.87, 87.83, 87.38, 85.57, 89.26, 91.11], spy: [100, 100.14, 99.43, 99.81, 97.23, 97.45, 97.17, 95.64, 97.26, 97.79, 99.51, 98.92, 97.68, 98.44, 98.13, 96.71, 96.66, 96.8, 96.1, 97.69, 98.45], top10Return: -8.6, spyReturn: -1.3, xLabels: ["Jun 2", "Jun 9", "Jun 16", "Jun 23", "Jun 30"] },
    'YTD': { top10: [100, 108.03, 105.55, 106.35, 99.1, 96.61, 93.56, 93.19, 92.59, 90.59, 91.43, 90.91, 89.09, 94.45, 105.46, 116.48, 112.67, 117.57, 129.64, 126.34, 135.76, 140.86, 126.39, 132.26, 125.71, 127.01], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 101.1, 100.6, 98.6, 97.12, 95.11, 92.99, 96.63, 100.61, 103.93, 104.88, 105.29, 108.41, 108.4, 109.34, 111.24, 108.4, 110.69, 107.58, 109.51], top10Return: 27, spyReturn: 9.5, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 106.61, 105.1, 106.36, 101.86, 90.21, 91.62, 92.46, 91.87, 89.89, 90.71, 90.19, 88.42, 94.18, 101.35, 114.45, 111.73, 115.43, 124.38, 125.35, 134.7, 139.75, 125.38, 131.23, 124.73, 126.04], spy: [100, 100.37, 100.49, 100.29, 101.02, 98.63, 99.16, 100.35, 99.85, 97.87, 96.4, 94.4, 92.3, 95.46, 98.9, 103.37, 103.92, 104.9, 107.37, 107.59, 108.53, 110.41, 107.6, 109.87, 106.78, 108.7], top10Return: 26, spyReturn: 8.7, xLabels: ["Dec", "Jan", "Mar", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 103.75, 101.72, 96.73, 93.42, 91.57, 90.17, 86.67, 84.66, 82.49, 85.17, 88.17, 91.37, 89.79, 88.74, 92.36, 88.71, 93.74, 92.29, 92.3, 89.06, 86.39, 86.11, 84.69, 84.67, 87.37, 88.43, 92.26, 92.14, 93.25, 90.88, 88.84, 89.89, 89.14, 90.43, 95.01, 97.9, 98.02, 91.85, 95.1, 102.87, 108.61, 113.14, 108.61, 114.62, 112.58, 115.94, 115.05, 114.46, 113.8, 107.53, 111.42], spy: [100, 101.04, 101.06, 102.68, 102.72, 102.45, 104.05, 103.59, 104.45, 104.22, 105.6, 106.72, 107.03, 108.22, 108.98, 107.69, 108.68, 111.24, 109.32, 110.58, 106.87, 109.29, 110.72, 111.32, 108.7, 111.78, 110.41, 111.63, 112.08, 111.59, 112.03, 111.81, 110.38, 110.48, 111.13, 109.81, 107.23, 105.01, 102.66, 106.68, 111.08, 114.74, 115.79, 116.25, 119.7, 119.59, 120.72, 122.81, 119.68, 122.21, 118.77, 120.91], top10Return: 11.4, spyReturn: 20.9, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
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
export const SCAN_TIMESTAMP    = '2026-06-30T21:46:50.684Z';
export const SCAN_TIMESTAMP_NY = 'June 30, 2026 at 5:46 PM ET';
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
  { ticker: 'MU', name: `Micron Technology Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 13.95, bestProScore: 5.95, avgProScore: 4.65, price: 1154.29, weeklyChange: 10.09 },
  { ticker: 'NVDA', name: `NVIDIA Corp`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 12.44, bestProScore: 6.04, avgProScore: 4.15, price: 200.09, weeklyChange: 0.55 },
  { ticker: 'AMD', name: `Advanced Micro Devices Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 10.62, bestProScore: 5.05, avgProScore: 3.54, price: 580.91, weeklyChange: 11.77 },
  { ticker: 'AVGO', name: `Broadcom Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 6.40, bestProScore: 2.79, avgProScore: 2.13, price: 377.75, weeklyChange: -1.13 },
  { ticker: 'INTC', name: `INTEL CORPORATION`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.74, bestProScore: 3.46, avgProScore: 2.37, price: 139.63, weeklyChange: 6.06 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 4.67, bestProScore: 2.71, avgProScore: 2.33, price: 286.36, weeklyChange: -2.76 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.41, bestProScore: 2.53, avgProScore: 2.21, price: 297.89, weeklyChange: 7.66 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.25, bestProScore: 2.60, avgProScore: 2.13, price: 477.57, weeklyChange: 8.33 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 4.07, bestProScore: 2.66, avgProScore: 2.04, price: 433.33, weeklyChange: 15.62 },
  { ticker: 'WDC', name: `Western Digital Corp`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 3.70, bestProScore: 2.05, avgProScore: 1.85, price: 638.72, weeklyChange: -0.79 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': 6.3, '1M': 11.3, 'YTD': 125.9, '6M': 123.5, '1Y': 208.9 },
  ARTY: { '1W': 3, '1M': 2, 'YTD': 58.1, '6M': 56.5, '1Y': 88.4 },
  BAI:  { '1W': 6.1, '1M': 5.7, 'YTD': 58.3, '6M': 56.6, '1Y': 86.8 },
  IGPT: { '1W': 4.3, '1M': 4.4, 'YTD': 75, '6M': 72.9, '1Y': 115.1 },
  IVES: { '1W': 5.4, '1M': -5.1, 'YTD': 20.5, '6M': 19.3, '1Y': 43.1 },
  ALAI: { '1W': 3.4, '1M': -0.1, 'YTD': 26.4, '6M': 25.2, '1Y': 51.9 },
  CHAT: { '1W': 3, '1M': 0.5, 'YTD': 67.4, '6M': 66.4, '1Y': 105.6 },
  AIFD: { '1W': 6.8, '1M': 4.4, 'YTD': 47.5, '6M': 46.3, '1Y': 83.9 },
  SPRX: { '1W': 7.7, '1M': 5.7, 'YTD': 50.6, '6M': 48.9, '1Y': 102.7 },
  AOTG: { '1W': 6, '1M': 0.4, 'YTD': 17, '6M': 15.9, '1Y': 33.4 },
  // Semiconductors
  SOXX: { '1W': 6.5, '1M': 12.6, 'YTD': 112.8, '6M': 110.1, '1Y': 169.7 },
  PSI:  { '1W': 11.3, '1M': 20.9, 'YTD': 138.2, '6M': 134.1, '1Y': 214.1 },
  XSD:  { '1W': 5.7, '1M': 1.7, 'YTD': 93.9, '6M': 91.8, '1Y': 143.4 },
  DRAM: { '1W': 5.6, '1M': 16.9, 'YTD': 166, '6M': 166, '1Y': 166 },
  // Broad Tech
  PTF:  { '1W': 7.6, '1M': 5.6, 'YTD': 78.2, '6M': 77.2, '1Y': 106.1 },
  WCLD: { '1W': 8.7, '1M': -2.7, 'YTD': -8.4, '6M': -9.4, '1Y': -10.3 },
  IGV:  { '1W': 5.1, '1M': -10.9, 'YTD': -14.3, '6M': -15.3, '1Y': -16.3 },
  FDTX: { '1W': 5.2, '1M': 7.2, 'YTD': 42.1, '6M': 41.1, '1Y': 49.9 },
  GTEK: { '1W': 5.1, '1M': 6, 'YTD': 57.4, '6M': 55.9, '1Y': 75.7 },
  ARKK: { '1W': 5.3, '1M': -1.4, 'YTD': 5.1, '6M': 3.8, '1Y': 17.2 },
  MARS: { '1W': 12.5, '1M': -24.8, 'YTD': 30.4, '6M': 30.4, '1Y': 30.4 },
  FRWD: { '1W': 4.1, '1M': 3.6, 'YTD': 35.5, '6M': 35.5, '1Y': 35.5 },
  BCTK: { '1W': 7.1, '1M': 5, 'YTD': 29.3, '6M': 28.7, '1Y': 31.6 },
  FWD:  { '1W': 4.9, '1M': 4.1, 'YTD': 41.9, '6M': 40.3, '1Y': 68.6 },
  CBSE: { '1W': 4.1, '1M': 4.2, 'YTD': 32.8, '6M': 31.9, '1Y': 43.7 },
  FCUS: { '1W': 2, '1M': 0.4, 'YTD': 42.9, '6M': 41.6, '1Y': 77.1 },
  WGMI: { '1W': -5.5, '1M': -7.4, 'YTD': 64.8, '6M': 64.8, '1Y': 173.1 },
  CNEQ: { '1W': 3.5, '1M': 0.2, 'YTD': 20, '6M': 18.7, '1Y': 42.6 },
  SGRT: { '1W': 3.4, '1M': 2.9, 'YTD': 49.9, '6M': 48.2, '1Y': 87.5 },
  SPMO: { '1W': 5, '1M': 7.3, 'YTD': 35.4, '6M': 34.2, '1Y': 45.9 },
  XMMO: { '1W': 0.7, '1M': 0.8, 'YTD': 22.9, '6M': 21.7, '1Y': 32.2 },
  // Electrification
  POW:  { '1W': 2.4, '1M': -0.8, 'YTD': 57.5, '6M': 56, '1Y': 52.9 },
  VOLT: { '1W': 2.5, '1M': 7.2, 'YTD': 44.8, '6M': 43.4, '1Y': 65.6 },
  PBD:  { '1W': 1.7, '1M': -11.7, 'YTD': 21.9, '6M': 20.6, '1Y': 54.3 },
  PBW:  { '1W': 3.3, '1M': -13.9, 'YTD': 27.7, '6M': 25.6, '1Y': 94.2 },
  IVEP: { '1W': -0.5, '1M': 0.2, 'YTD': 7.1, '6M': 7.1, '1Y': 7.1 },
  // Industrials
  AIRR: { '1W': 2.1, '1M': 3.2, 'YTD': 35.5, '6M': 33.8, '1Y': 62.1 },
  PRN:  { '1W': 3.4, '1M': 6.2, 'YTD': 49.3, '6M': 47.6, '1Y': 68.6 },
  RSHO: { '1W': 0, '1M': 5.8, 'YTD': 39.4, '6M': 36.1, '1Y': 55.6 },
  IDEF: { '1W': 2.1, '1M': -7, 'YTD': 3.2, '6M': 2.3, '1Y': 14.3 },
  BILT: { '1W': -0.3, '1M': -3.7, 'YTD': 8.4, '6M': 8, '1Y': 11.6 },
  // Meme
  BUZZ: { '1W': 3.2, '1M': -8.9, 'YTD': 13.7, '6M': 12.5, '1Y': 24.1 },
  MEME: { '1W': 3.7, '1M': -15.5, 'YTD': 55.3, '6M': 53.6, '1Y': -1.9 },
  RKNG: { '1W': 4.3, '1M': -1.5, 'YTD': 12, '6M': 12, '1Y': 12 },
};
// @@END_GENERATED:ETF_RETURNS@@

// @@GENERATED:ETF_DAY_CHANGE@@
// Today's % move per ETF ticker (1D, vs prior close). Refreshed by the 3×/day
// price jobs. Powers the 1D ranking in the theme-ETF side panel.
export const ETF_DAY_CHANGE: Record<string, number> = {
  AIS:  3.75,
  ARTY: 2.77,
  BAI:  3.72,
  IGPT: 2.75,
  IVES: 2.06,
  ALAI: 1.65,
  CHAT: 3.41,
  AIFD: 3.58,
  SPRX: 3.48,
  AOTG: 4.76,
  SOXX: 4.3,
  PSI:  5.53,
  XSD:  5.24,
  DRAM: 2.65,
  PTF:  3.45,
  WCLD: 1.6,
  IGV:  0.79,
  FDTX: 2.06,
  GTEK: 3.09,
  ARKK: 0.24,
  MARS: 4.16,
  FRWD: 2.34,
  BCTK: 3.11,
  FWD:  2.66,
  CBSE: 1.55,
  FCUS: 2.31,
  WGMI: -0.99,
  CNEQ: 1.75,
  SGRT: 2.94,
  SPMO: 1.9,
  XMMO: 1.62,
  POW:  2.18,
  VOLT: 2.75,
  PBD:  1.98,
  PBW:  2.39,
  IVEP: 1.4,
  AIRR: 1.27,
  PRN:  2.14,
  IDEF: 1.53,
  BILT: -1.21,
  BUZZ: 0.96,
  MEME: 2.67,
  RKNG: 2.88,
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
  'AI & ML': { etfs: ['AIS', 'AOTG', 'SPRX'], series: { '1W': [100, 102.48, 99.68, 103.31, 106.66], '1M': [100, 103.19, 102.44, 101.03, 91.47, 94.75, 92.74, 89.79, 95.71, 96.72, 101.66, 97.81, 98.66, 103.46, 104.98, 98.15, 97.26, 99.73, 96.92, 100.46, 103.74], 'YTD': [100, 102.87, 105.65, 106.63, 104.88, 103.06, 102.41, 103.63, 103.54, 98.88, 99.81, 99.4, 94.71, 100.34, 111.38, 118.06, 123.25, 125.27, 140.22, 137, 144.57, 157.1, 148.89, 160.48, 155.56, 164.47], '6M': [100, 103.64, 104.11, 106.13, 107.72, 95.76, 100.54, 102.55, 102.45, 97.85, 98.77, 98.36, 93.72, 98.39, 107.29, 116.45, 122.19, 123.67, 134.15, 135.56, 143.05, 155.45, 147.33, 158.79, 153.92, 162.74], '1Y': [100, 103.04, 104.05, 106.75, 110.03, 111.3, 113.49, 108.69, 111.06, 110.21, 118.03, 121.6, 123.74, 126.19, 133.59, 130.66, 130.42, 137.59, 133.95, 132.73, 122.08, 123.52, 129.59, 133.82, 120.24, 130.99, 128.48, 132.32, 136.19, 137.5, 135.37, 133.37, 132.62, 132.43, 135.7, 132.48, 129.2, 128.71, 122.65, 129.95, 144.65, 153.26, 160.08, 162.78, 182.67, 173.96, 188.62, 204.78, 194.24, 209.66, 203.34, 215.01] }, returns: { '1W': 6.7, '1M': 3.7, 'YTD': 64.5, '6M': 62.7, '1Y': 115 } },
  'Semiconductors': { etfs: ['PSI', 'DRAM', 'XSD'], series: { '1W': [100, 105.44, 99.8, 102.93, 107.54], '1M': [100, 104.66, 105.74, 102.98, 90.51, 95.83, 94.33, 91.29, 100.42, 101.88, 107.99, 102.61, 103.52, 111.56, 115.53, 104.38, 103.61, 109.3, 103.44, 106.74, 111.53], 'YTD': [100, 107.31, 114.2, 118.33, 117.99, 120.64, 123.75, 124.46, 125.46, 126.65, 128.75, 139.58, 137.07, 136.23, 152.34, 168.02, 178.54, 192.12, 204.55, 191.53, 205.78, 212.59, 218.39, 222.86, 220.92, 232.71], '6M': [100, 107.03, 112.11, 119.5, 119.9, 115.63, 121.95, 123.32, 124.34, 125.63, 127.71, 138.53, 136.03, 134.24, 149.15, 165.03, 180.26, 190.76, 198.75, 189.83, 203.97, 210.78, 216.61, 220.86, 218.99, 230.63], '1Y': [100, 104.16, 104.01, 107.42, 108.55, 108.11, 114.18, 110.93, 115, 113.1, 117.44, 123.06, 124.23, 126.25, 131.69, 132.39, 133.66, 137.31, 135.72, 140.89, 134.11, 145.12, 154.71, 153.52, 148.49, 152.61, 145.03, 152.41, 158.78, 162.66, 160.39, 174.09, 178.37, 177.58, 184.16, 178.45, 177.64, 161.73, 166.16, 171.2, 181.24, 201.18, 211.38, 221.72, 245.93, 241.16, 261.22, 246.98, 246.59, 266.45, 259.94, 274.53] }, returns: { '1W': 7.5, '1M': 11.5, 'YTD': 132.7, '6M': 130.6, '1Y': 174.5 } },
  'Broad Tech': { etfs: ['WGMI', 'PTF', 'SGRT'], series: { '1W': [100, 101.61, 99.1, 99.95, 101.85], '1M': [100, 102.62, 102.36, 100.76, 91.26, 94.48, 91.9, 88.83, 94.78, 96.93, 101.19, 99.33, 99.48, 102.89, 104.09, 99.44, 96.67, 98.28, 95.8, 96.66, 98.53], 'YTD': [100, 107.37, 113.44, 114.56, 110.78, 110.24, 111.62, 112.37, 113.64, 103.39, 107.2, 106.9, 103.3, 109.13, 124.36, 132.2, 134.41, 137.73, 153.94, 148.72, 154.31, 167.5, 158.13, 169.26, 166.66, 164.32], '6M': [100, 107.3, 112.76, 113.11, 116.19, 100.99, 109.47, 111.69, 112.96, 102.77, 106.56, 106.26, 102.67, 107.34, 120.22, 130.57, 134.6, 134.48, 149.03, 147.87, 153.45, 166.59, 157.28, 168.34, 165.77, 163.39], '1Y': [100, 105.32, 106.4, 110.4, 108.29, 110.33, 109.7, 111.46, 118.2, 118.65, 128.74, 138.6, 146.23, 144.6, 162.06, 174.39, 158.29, 167.25, 165.66, 152.91, 137.48, 144.06, 147.09, 150.29, 132.82, 145.01, 138.92, 148.67, 157.62, 158.78, 155.77, 151.59, 150.38, 149.7, 152.76, 144.25, 141.79, 145.18, 145.46, 151.39, 169.07, 177.15, 183.54, 190.7, 206.31, 196.29, 212.36, 229.98, 213.47, 229.49, 228.21, 222.26] }, returns: { '1W': 1.8, '1M': -1.5, 'YTD': 64.3, '6M': 63.4, '1Y': 122.3 } },
  'Electrification': { etfs: ['PBW', 'VOLT', 'POW'], series: { '1W': [100, 100.72, 97.81, 100.28, 102.72], '1M': [100, 102.15, 101.03, 100.91, 94.08, 94.79, 93.66, 90.58, 94.75, 95.54, 98.12, 97.06, 97.17, 99.44, 100.56, 96.04, 95.37, 96.17, 93.32, 95.59, 97.93], 'YTD': [100, 104.13, 109.93, 112.37, 112.23, 115.87, 118.59, 119.25, 120.01, 111.47, 114.68, 113.09, 113.84, 116.55, 126.22, 131.1, 137.06, 142.29, 150.16, 142.92, 144.82, 146.92, 138.96, 143.9, 140.65, 143.36], '6M': [100, 103.34, 107.18, 112.15, 113.74, 109.48, 116.01, 117.81, 118.57, 110.12, 113.29, 111.73, 112.48, 114.79, 123.39, 129.12, 136.17, 140.99, 144.71, 141.18, 143.06, 145.12, 137.26, 142.16, 138.96, 141.64], '1Y': [100, 103.84, 105.32, 109.72, 106.78, 106.07, 108.71, 108.71, 112.34, 109.46, 110.68, 113.33, 118.09, 121.59, 126.96, 132.54, 128.46, 130.13, 127.46, 131.52, 124.7, 126.94, 130.75, 133.44, 127.76, 134.56, 128.76, 132.05, 137.71, 141.55, 137.94, 141.17, 141.89, 142.36, 145.88, 142.23, 143.75, 143.55, 145.68, 150.72, 158.16, 163.92, 162.66, 167.97, 176.44, 167.22, 171.2, 173.07, 170.11, 172.21, 168.17, 170.89] }, returns: { '1W': 2.7, '1M': -2.1, 'YTD': 43.4, '6M': 41.6, '1Y': 70.9 } },
  'Industrials': { etfs: ['PRN', 'RSHO', 'BILT'], series: { '1W': [100, 100.18, 99.55, 101.27, 101], '1M': [100, 100.99, 100.86, 101.14, 99.49, 100.17, 100.45, 98.19, 100.9, 101.63, 99.38, 100.86, 100.93, 102.19, 103.31, 102.96, 102.95, 103.13, 102.45, 104.27, 104.01], 'YTD': [100, 102.86, 107.52, 107.45, 108.67, 113.02, 118.03, 119.74, 118.94, 111.8, 110.59, 109.93, 110.58, 113.09, 120.6, 121.84, 123.18, 124.54, 127.76, 126.49, 125.1, 126.05, 127.03, 128.25, 130.91, 132.37], '6M': [100, 101.58, 104.48, 105.96, 107.56, 108.55, 114.53, 117.86, 117.64, 112.7, 110.29, 108.57, 110.57, 111.54, 118.31, 119.04, 120.76, 121.84, 125.58, 124.46, 123.28, 124.43, 125.31, 126.51, 129.11, 130.55], '1Y': [100, 101.86, 102.54, 104, 104.45, 103.19, 104.4, 103.65, 105.1, 103.73, 105.4, 105.99, 107.17, 108.6, 109.05, 109.13, 109.99, 111.35, 109.45, 109.58, 104.88, 107.41, 107.86, 109.63, 108.09, 111.56, 109.98, 113.14, 118.76, 119.43, 120.86, 125.13, 129.45, 130.78, 129.16, 122.93, 119.87, 120.73, 121.7, 123.77, 131.72, 133.42, 135.28, 136.08, 139.99, 137.59, 136.65, 138.49, 139.45, 140.78, 143.81, 145.28] }, returns: { '1W': 1, '1M': 4, 'YTD': 32.4, '6M': 30.6, '1Y': 45.3 } },
  'Meme': { etfs: ['MEME', 'BUZZ', 'RKNG'], series: { '1W': [100, 99.45, 97.37, 101.62, 103.73], '1M': [100, 102.46, 98.88, 99.41, 89.27, 91.56, 88.31, 85.88, 91.43, 90.27, 95.3, 91.57, 92.14, 95.42, 95.29, 90.87, 87.83, 87.38, 85.57, 89.26, 91.11], 'YTD': [100, 108.03, 105.55, 106.35, 99.1, 96.61, 93.56, 93.19, 92.59, 90.59, 91.43, 90.91, 89.09, 94.45, 105.46, 116.48, 112.67, 117.57, 129.64, 126.34, 135.76, 140.86, 126.39, 132.26, 125.71, 127.01], '6M': [100, 106.61, 105.1, 106.36, 101.86, 90.21, 91.62, 92.46, 91.87, 89.89, 90.71, 90.19, 88.42, 94.18, 101.35, 114.45, 111.73, 115.43, 124.38, 125.35, 134.7, 139.75, 125.38, 131.23, 124.73, 126.04], '1Y': [100, 103.75, 101.72, 96.73, 93.42, 91.57, 90.17, 86.67, 84.66, 82.49, 85.17, 88.17, 91.37, 89.79, 88.74, 92.36, 88.71, 93.74, 92.29, 92.3, 89.06, 86.39, 86.11, 84.69, 84.67, 87.37, 88.43, 92.26, 92.14, 93.25, 90.88, 88.84, 89.89, 89.14, 90.43, 95.01, 97.9, 98.02, 91.85, 95.1, 102.87, 108.61, 113.14, 108.61, 114.62, 112.58, 115.94, 115.05, 114.46, 113.8, 107.53, 111.42] }, returns: { '1W': 3.7, '1M': -8.9, 'YTD': 27, '6M': 26, '1Y': 11.4 } },
};
// @@END_GENERATED:THEME_REPRESENTATIVES@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 10, avgWeight: 6.04, proScore: 6.04, coverage: 1,
      price: 200.09, weeklyPrices: [199.00, 195.74, 192.53, 194.97, 200.09], weeklyChange: 0.55, dayChange: 2.63, sortRank: 0, periodReturns: { '1M': -5.2, 'YTD': 7.3, '6M': 6.7, '1Y': 30.5 },
      priceHistory: { '1D': [194.97, 197.02, 198.54, 197.98, 197.76, 196.56, 198.29, 198.24, 198.05, 198.21, 198.34, 197.85, 198.23, 198.21, 198.21, 198.27, 198.48, 199.28, 198.23, 198.82, 198.89, 199.28, 199.03, 200.09], '1W': [199, 195.74, 192.53, 194.97, 200.09], '1M': [224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09], 'YTD': [186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 225.32, 215.33, 224.36, 208.64, 212.45, 200.04, 200.09], '6M': [187.54, 189.11, 183.14, 184.84, 192.51, 171.88, 186.94, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 225.32, 215.33, 224.36, 208.64, 212.45, 200.04, 200.09], '1Y': [153.3, 162.88, 171.37, 170.78, 179.27, 179.42, 183.16, 175.64, 181.77, 170.62, 177.33, 170.29, 176.97, 187.24, 189.11, 179.83, 181.16, 201.03, 198.69, 193.16, 181.36, 177.82, 179.59, 183.78, 170.94, 188.61, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 182.65, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 222.32, 215.33, 224.36, 208.64, 212.45, 200.04, 200.09] },
      velocityScore: { '1D': -0.7, '1W': -3, '1M': 16.2, '6M': null }, isNew: false,
      marketCap: '$4.8T', pe: 30.6, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: null,
      etfPresence: { AIS: 2.28, ARTY: 4.4, BAI: 3.89, IGPT: 7.2, IVES: 4.69, ALAI: 12.14, CHAT: 6.33, AIFD: 6.05, SPRX: 3.33, AOTG: 10.11 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 6.61, proScore: 5.95, coverage: 0.9,
      price: 1154.29, weeklyPrices: [1048.51, 1213.56, 1132.33, 1145.28, 1154.29], weeklyChange: 10.09, dayChange: 0.79, sortRank: 0, periodReturns: { '1M': 18.9, 'YTD': 304.4, '6M': 294.5, '1Y': 854.8 },
      priceHistory: { '1D': [1145.28, 1137.42, 1149.3, 1146.01, 1149.25, 1139.53, 1146.65, 1140.91, 1142.63, 1151.48, 1164.49, 1152.45, 1151.84, 1158.84, 1156.51, 1155.3, 1151.51, 1148.42, 1151.06, 1156.78, 1168.13, 1161.09, 1165.2, 1154.29], '1W': [1048.51, 1213.56, 1132.33, 1145.28, 1154.29], '1M': [1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 724.66, 751, 1035.5, 949.28, 1087.99, 1051.77, 1154.29], '6M': [292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 1035.5, 949.28, 1087.99, 1051.77, 1154.29], '1Y': [120.89, 122.24, 116.43, 109.83, 114.74, 108.78, 127.75, 122.05, 116.5, 118.72, 140, 159.99, 161.71, 182.15, 196.54, 191.94, 202.29, 221.91, 218.03, 241.11, 228.5, 224.53, 234.16, 263.71, 225.52, 286.68, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 751, 1035.5, 949.28, 1087.99, 1051.77, 1154.29] },
      velocityScore: { '1D': -0.8, '1W': -2.1, '1M': -5.9, '6M': null }, isNew: false,
      marketCap: '$1.3T', pe: 26.1, revenueGrowth: 346, eps: 44.21, grossMargin: 73, dividendYield: null,
      etfPresence: { AIS: 7.3, ARTY: 5.52, BAI: 6.8, IGPT: 8.71, IVES: 5.41, ALAI: 1.5, CHAT: 4.41, AIFD: 7.39, SPRX: false, AOTG: 12.41 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 9, avgWeight: 5.61, proScore: 5.05, coverage: 0.9,
      price: 580.91, weeklyPrices: [519.74, 532.57, 521.58, 539.49, 580.91], weeklyChange: 11.77, dayChange: 7.68, sortRank: 0, periodReturns: { '1M': 12.6, 'YTD': 171.3, '6M': 169.8, '1Y': 326.8 },
      priceHistory: { '1D': [539.49, 552.14, 558.59, 558.03, 557.98, 557.03, 565.34, 565, 571.8, 575.15, 577.24, 576.66, 580.85, 580.12, 579.51, 578.81, 580.74, 579.23, 582.4, 582.44, 583.14, 583, 583.43, 580.91], '1W': [519.74, 532.57, 521.58, 539.49, 580.91], '1M': [510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 424.1, 467.51, 510.13, 490.33, 547.26, 519.85, 580.91], '6M': [215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 467.51, 510.13, 490.33, 547.26, 519.85, 580.91], '1Y': [136.11, 138.41, 160.08, 158.65, 179.51, 163.12, 174.95, 166.55, 166.62, 162.13, 159.54, 159.16, 160.88, 164.01, 235.56, 238.6, 238.03, 258.01, 250.05, 237.52, 230.29, 206.13, 217.6, 221.42, 198.11, 215.04, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 420.99, 467.51, 510.13, 490.33, 547.26, 519.85, 580.91] },
      velocityScore: { '1D': 0.6, '1W': 1.4, '1M': -2.5, '6M': null }, isNew: false,
      marketCap: '$947B', pe: 192.4, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.78, ARTY: 5.03, BAI: 4.89, IGPT: 8.36, IVES: 4.84, ALAI: 1.28, CHAT: 4.2, AIFD: false, SPRX: 0.56, AOTG: 16.54 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 8, avgWeight: 3.49, proScore: 2.79, coverage: 0.8,
      price: 377.75, weeklyPrices: [382.07, 378.91, 365.02, 372.45, 377.75], weeklyChange: -1.13, dayChange: 1.42, sortRank: 0, periodReturns: { '1M': -15.4, 'YTD': 9.1, '6M': 8, '1Y': 42.7 },
      priceHistory: { '1D': [372.45, 377.55, 377.92, 376.39, 376.77, 374.95, 375.26, 374.74, 375.22, 376.35, 376.24, 374.69, 375.89, 374.86, 374.56, 375.4, 375.5, 377.11, 377.39, 378.46, 379.05, 378.49, 378.45, 377.75], '1W': [382.07, 378.91, 365.02, 372.45, 377.75], '1M': [459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75], 'YTD': [346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 425.19, 414.14, 459.97, 396.6, 393.94, 380.15, 377.75], '6M': [349.85, 343.5, 339.89, 325.49, 330.73, 310.51, 331.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 425.19, 414.14, 459.97, 396.6, 393.94, 380.15, 377.75], '1Y': [264.74, 277.9, 280.81, 283.69, 302.62, 301.67, 312.83, 294.91, 298.01, 302.39, 369.57, 346.17, 339.31, 333.39, 345.5, 351.33, 342.66, 372.97, 351.94, 351.96, 340.5, 385.03, 380.61, 412.97, 326.02, 350.22, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 345.75, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 420.71, 414.14, 459.97, 396.6, 393.94, 380.15, 377.75] },
      velocityScore: { '1D': -0.7, '1W': 1.1, '1M': -15.5, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 63, revenueGrowth: 48, eps: 6, grossMargin: 76, dividendYield: 0.7,
      etfPresence: { AIS: 0.62, ARTY: 4.33, BAI: 4, IGPT: false, IVES: 4.6, ALAI: 3.79, CHAT: 4, AIFD: 5.1, SPRX: false, AOTG: 1.48 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 7, avgWeight: 3.62, proScore: 2.53, coverage: 0.7,
      price: 297.89, weeklyPrices: [276.70, 281.26, 266.77, 277.75, 297.89], weeklyChange: 7.66, dayChange: 7.25, sortRank: 0, periodReturns: { '1M': 45.3, 'YTD': 250.5, '6M': 243.3, '1Y': 290.7 },
      priceHistory: { '1D': [277.75, 283.96, 291.78, 296.13, 295.7, 294.83, 298.55, 297.05, 296.31, 297.16, 296.67, 291.67, 293.63, 294.04, 294.11, 292.89, 292.87, 292.74, 297.28, 295.9, 296.31, 295.39, 297.17, 297.89], '1W': [276.7, 281.26, 266.77, 277.75, 297.89], '1M': [219.43, 290.79, 301.65, 316.43, 263.47, 288.85, 266.88, 252.59, 280.71, 279.7, 308.88, 278.67, 289.54, 310.58, 307.86, 279.04, 276.7, 281.26, 266.77, 277.75, 297.89], 'YTD': [84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 79.48, 81.69, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 163.66, 170.84, 176.89, 196.33, 219.43, 288.85, 308.88, 279.04, 297.89], '6M': [86.76, 84.64, 81.21, 83.1, 81.34, 74.21, 78.23, 79.48, 81.69, 89.57, 87.86, 87.91, 94.88, 107.11, 128.49, 139.69, 164.31, 164.95, 170.13, 176.89, 196.33, 219.43, 288.85, 308.88, 279.04, 297.89], '1Y': [76.24, 72.26, 70.85, 73.27, 81.74, 75.32, 77.81, 72.07, 74.26, 62.31, 67.1, 70.98, 80.09, 83.89, 92.5, 88.89, 84.26, 88.46, 87.59, 89.33, 78.68, 83.43, 100.2, 92.47, 81.7, 86.49, 84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 77.79, 80.86, 92.65, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 163.66, 170.84, 168.93, 196.33, 219.43, 288.85, 308.88, 279.04, 297.89] },
      velocityScore: { '1D': 0.8, '1W': -7.7, '1M': 12.4, '6M': null }, isNew: false,
      marketCap: '$261B', pe: 102, revenueGrowth: 28, eps: 2.92, grossMargin: 52, dividendYield: 0.09,
      etfPresence: { AIS: 3.94, ARTY: 4.37, BAI: 1.97, IGPT: 3.52, IVES: false, ALAI: false, CHAT: 1.53, AIFD: 5.83, SPRX: 4.18, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'ANET', name: 'Arista Networks Inc', easyScore: 7, avgWeight: 2.01, proScore: 1.41, coverage: 0.7,
      price: 169.88, weeklyPrices: [161.74, 165.45, 157.60, 164.10, 169.88], weeklyChange: 5.03, dayChange: 3.52, sortRank: 0, periodReturns: { '1M': 6.5, 'YTD': 29.6, '6M': 28.3, '1Y': 71.8 },
      priceHistory: { '1D': [164.1, 164.22, 169.65, 169.18, 169.15, 168.8, 168.92, 169.3, 169.45, 170.04, 169.45, 170.17, 170.3, 170.52, 171.13, 171.07, 171.37, 171.61, 171.51, 172.23, 172.11, 171.66, 170.93, 169.88], '1W': [161.74, 165.45, 157.6, 164.1, 169.88], '1M': [170.68, 175.33, 174.37, 166.01, 154.27, 156.4, 152.16, 151.76, 156.4, 163.24, 169.09, 168.01, 164.93, 169.67, 174.56, 162.2, 161.74, 165.45, 157.6, 164.1, 169.88], 'YTD': [131.03, 123.72, 130.59, 136.34, 141.74, 137.49, 141.59, 132.79, 133.5, 132.89, 133.57, 131.22, 120.77, 126.25, 152.02, 166.85, 172.47, 172.62, 136.43, 141.97, 154.03, 170.68, 156.4, 169.09, 162.2, 169.88], '6M': [132.44, 130.08, 125.09, 138.41, 148.15, 128.67, 135.12, 132.79, 133.5, 132.89, 133.57, 131.22, 120.77, 126.68, 147.35, 164.23, 176.91, 172.7, 141.77, 141.97, 154.03, 170.68, 156.4, 169.09, 162.2, 169.88], '1Y': [98.91, 106.28, 108.3, 113.04, 122.09, 138.78, 141.25, 132.78, 134.27, 137.38, 150.72, 142.84, 142.64, 149.27, 157.36, 143.38, 145.94, 156.77, 153.55, 134.93, 123.45, 125.04, 127.8, 132.36, 122.36, 130.77, 131.03, 123.72, 130.59, 136.34, 141.74, 137.49, 141.59, 127.43, 129.3, 137.17, 133.57, 131.22, 120.77, 126.25, 152.02, 166.85, 172.47, 172.62, 136.43, 141.71, 154.03, 170.68, 156.4, 169.09, 162.2, 169.88] },
      velocityScore: { '1D': 0.7, '1W': 5.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$214B', pe: 58.6, revenueGrowth: 35, eps: 2.9, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: 1.38, ARTY: 2.42, BAI: 1.31, IGPT: false, IVES: false, ALAI: 0.4, CHAT: 2.2, AIFD: 4.75, SPRX: 1.6, AOTG: false },
      tonyNote: 'Arista Networks Inc appears in 7 of 10 AI & ML ETFs (70% coverage) with average weight 2.0% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 4.83, proScore: 2.9, coverage: 0.6,
      price: 357.37, weeklyPrices: [345.29, 343.71, 337.39, 353.65, 357.37], weeklyChange: 3.5, dayChange: 1.05, sortRank: 0, periodReturns: { '1M': -6, 'YTD': 14.2, '6M': 13.9, '1Y': 103.2 },
      priceHistory: { '1D': [353.65, 351.32, 352.3, 352.71, 354.45, 354.25, 354.73, 356.6, 356.38, 357.13, 357.52, 358.08, 357.51, 357.46, 356.08, 356.03, 356.2, 357.02, 356.9, 356.67, 356.98, 357.12, 357.58, 357.37], '1W': [345.29, 343.71, 337.39, 353.65, 357.37], '1M': [376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68, 369.35, 373.25, 363.79, 368.03, 349.68, 346.13, 345.29, 343.71, 337.39, 353.65, 357.37], 'YTD': [313, 325.44, 332.78, 327.93, 338, 322.86, 305.72, 314.98, 311.76, 298.52, 302.28, 301, 274.34, 299.99, 321.31, 337.42, 350.34, 383.25, 388.64, 396.78, 382.97, 376.37, 363.31, 369.35, 346.13, 357.37], '6M': [313.85, 321.98, 335.84, 330.54, 338.25, 331.25, 309, 314.98, 311.76, 298.52, 302.28, 301, 274.34, 295.77, 317.24, 341.68, 344.4, 385.69, 400.8, 396.78, 382.97, 376.37, 363.31, 369.35, 346.13, 357.37], '1Y': [175.84, 176.62, 182.97, 190.23, 196.53, 196.09, 203.34, 201.57, 207.14, 230.66, 239.17, 249.53, 247.14, 244.9, 244.62, 251.03, 250.46, 267.47, 277.54, 291.31, 284.28, 323.44, 319.63, 320.21, 296.72, 314.09, 313, 325.44, 332.78, 327.93, 338, 322.86, 305.72, 311.49, 306.52, 306.36, 302.28, 301, 274.34, 299.99, 321.31, 337.42, 350.34, 383.25, 388.64, 396.94, 382.97, 376.37, 363.31, 369.35, 346.13, 357.37] },
      velocityScore: { '1D': 1.4, '1W': 2.1, '1M': -17.1, '6M': null }, isNew: false,
      marketCap: '$4.4T', pe: 27.2, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.05, IGPT: 7.48, IVES: 4.67, ALAI: false, CHAT: 5.22, AIFD: 4.71, SPRX: false, AOTG: 3.87 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 6, avgWeight: 2.74, proScore: 1.65, coverage: 0.6,
      price: 638.72, weeklyPrices: [643.83, 675.39, 586.45, 651.88, 638.72], weeklyChange: -0.79, dayChange: -2.02, sortRank: 0, periodReturns: { '1M': 20.2, 'YTD': 270.8, '6M': 262.8, '1Y': 900.5 },
      priceHistory: { '1D': [651.88, 651.36, 659.09, 657.38, 661.01, 650.7, 647.63, 640.13, 641, 638.05, 642.48, 641.4, 639.4, 640.1, 635.56, 639.26, 640.74, 642.1, 641.15, 644.4, 639.59, 640.6, 638.99, 638.72], '1W': [643.83, 675.39, 586.45, 651.88, 638.72], '1M': [546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72], 'YTD': [172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 482.02, 484.28, 546.2, 526.93, 653.53, 670.75, 638.72], '6M': [176.06, 199.88, 215, 243.29, 278.41, 260.19, 284.1, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 294.97, 343.43, 372.52, 404, 431.52, 480, 482.02, 484.28, 546.2, 526.93, 653.53, 670.75, 638.72], '1Y': [63.84, 64.64, 66.53, 69.32, 71.43, 73.78, 75.91, 75.86, 79.71, 86, 95.02, 100.94, 109.69, 130.59, 121.18, 120.44, 121.41, 124.92, 152.18, 169.99, 152.86, 155.41, 155.59, 181.95, 166.26, 179.56, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 262.06, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 458.68, 484.28, 546.2, 526.93, 653.53, 670.75, 638.72] },
      velocityScore: { '1D': 8.6, '1W': -8.3, '1M': -15.4, '6M': null }, isNew: false,
      marketCap: '$220B', pe: 38.3, revenueGrowth: 46, eps: 16.69, grossMargin: 45, dividendYield: null,
      etfPresence: { AIS: 1.43, ARTY: 3.08, BAI: 3.39, IGPT: 3.25, IVES: false, ALAI: 4.51, CHAT: false, AIFD: false, SPRX: false, AOTG: 0.81 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 5, avgWeight: 5.2, proScore: 2.6, coverage: 0.5,
      price: 477.57, weeklyPrices: [440.83, 434.99, 432.35, 455.10, 477.57], weeklyChange: 8.33, dayChange: 4.94, sortRank: 0, periodReturns: { '1M': 14.1, 'YTD': 57.2, '6M': 59.4, '1Y': 112.6 },
      priceHistory: { '1D': [455.1, 460.21, 465.5, 468.53, 467.1, 465.8, 467.55, 468.61, 468.62, 468.91, 469.7, 468.33, 469.31, 469.97, 469.65, 470.93, 471.7, 471.54, 474.55, 474.67, 475.17, 475.1, 475.28, 477.57], '1W': [440.83, 434.99, 432.35, 455.1, 477.57], '1M': [435.63, 446.69, 436.69, 444.92, 415.17, 426.8, 427.92, 408.75, 421.07, 423.93, 441.4, 425.83, 432.15, 462.12, 467.67, 436.39, 440.83, 434.99, 432.35, 455.1, 477.57], 'YTD': [303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 370.54, 374.58, 338.89, 338.31, 329.24, 326.74, 341.76, 369.57, 366.24, 404.98, 401.61, 404.54, 404.35, 404.52, 435.63, 426.8, 441.4, 436.39, 477.57], '6M': [299.58, 318.68, 327.11, 327.37, 339.55, 330.73, 368.1, 370.54, 374.58, 338.89, 338.31, 329.24, 326.74, 339.04, 370.6, 370.5, 402.46, 397.67, 411.68, 404.35, 404.52, 435.63, 426.8, 441.4, 436.39, 477.57], '1Y': [224.68, 231.84, 237.56, 240.33, 242.91, 231.37, 244.29, 232.7, 238.72, 231.39, 260.44, 262.79, 280.71, 288.47, 304.52, 304.71, 294.51, 301.53, 294.05, 291.17, 277.91, 284.68, 295.45, 310.14, 276.96, 298.8, 303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 370.04, 369.11, 348.7, 338.31, 329.24, 326.74, 341.76, 369.57, 366.24, 404.98, 401.61, 404.54, 395.95, 404.52, 435.63, 426.8, 441.4, 436.39, 477.57] },
      velocityScore: { '1D': 1.6, '1W': -12.2, '1M': -13, '6M': null }, isNew: false,
      marketCap: '$2.5T', pe: 41.5, revenueGrowth: 35, eps: 11.51, grossMargin: 62, dividendYield: null,
      etfPresence: { AIS: 3.27, ARTY: false, BAI: 4.48, IGPT: false, IVES: 5.11, ALAI: 5.79, CHAT: false, AIFD: false, SPRX: false, AOTG: 7.34 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 5, avgWeight: 3.97, proScore: 1.99, coverage: 0.5,
      price: 238.34, weeklyPrices: [234.27, 227.01, 232.69, 240.14, 238.34], weeklyChange: 1.74, dayChange: -0.75, sortRank: 0, periodReturns: { '1M': -11.9, 'YTD': 3.3, '6M': 2.5, '1Y': 8.1 },
      priceHistory: { '1D': [240.14, 239.69, 238.84, 238.87, 240.15, 238.46, 238.38, 238.65, 238.89, 239.83, 239.24, 240.27, 240.92, 239.66, 239.07, 238.69, 238.82, 239.07, 237.97, 237.65, 238.37, 239.2, 237.61, 238.34], '1W': [234.27, 227.01, 232.69, 240.14, 238.34], '1M': [261.26, 256.52, 250.02, 253.79, 246.03, 245.22, 244.19, 238, 241.51, 238.55, 246.02, 246, 237.5, 244.39, 232.79, 234.11, 234.27, 227.01, 232.69, 240.14, 238.34], 'YTD': [230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 198.79, 210.11, 210, 213.21, 207.67, 205.37, 199.34, 212.79, 239.89, 248.28, 261.12, 272.05, 268.99, 264.14, 266.32, 261.26, 245.22, 246.02, 234.11, 238.34], '6M': [232.53, 241.56, 236.65, 234.34, 241.73, 222.69, 199.6, 210.11, 210, 213.21, 207.67, 205.37, 199.34, 209.77, 238.38, 250.56, 263.99, 268.26, 272.68, 264.14, 266.32, 261.26, 245.22, 246.02, 234.11, 238.34], '1Y': [220.46, 222.54, 223.19, 228.29, 230.19, 222.31, 221.47, 228.01, 228.71, 225.99, 230.33, 231.62, 220.21, 220.63, 225.22, 215.57, 222.03, 229.25, 249.32, 249.1, 222.55, 229.67, 232.38, 231.78, 221.27, 232.38, 230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 198.79, 205.27, 208.39, 213.49, 207.67, 205.37, 199.34, 212.79, 239.89, 248.28, 261.12, 272.05, 268.99, 264.86, 266.32, 261.26, 245.22, 246.02, 234.11, 238.34] },
      velocityScore: { '1D': 0, '1W': 33.6, '1M': -30.9, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 31.4, revenueGrowth: 17, eps: 7.59, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 4.81, ALAI: 5.5, CHAT: 2.39, AIFD: 3.32, SPRX: false, AOTG: 3.84 },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 5, avgWeight: 3.83, proScore: 1.92, coverage: 0.5,
      price: 563.29, weeklyPrices: [557.67, 542.87, 550.25, 562.60, 563.29], weeklyChange: 1.01, dayChange: 0.12, sortRank: 0, periodReturns: { '1M': -10.9, 'YTD': -14.7, '6M': -15.4, '1Y': -21.7 },
      priceHistory: { '1D': [562.6, 557.2, 556.5, 556.08, 555.3, 551.72, 554.82, 556.01, 556.26, 557.18, 556.16, 556.81, 558.49, 558.28, 559, 559.74, 560.38, 561.41, 560.04, 560.73, 560.73, 561.49, 561.02, 563.29], '1W': [557.67, 542.87, 550.25, 562.6, 563.29], '1M': [600.47, 597.63, 622.98, 627.57, 593, 585.39, 584.59, 570.98, 568.43, 566.98, 593.48, 600.21, 567.58, 577.22, 563.85, 562.2, 557.67, 542.87, 550.25, 562.6, 563.29], 'YTD': [660.09, 646.06, 620.8, 658.76, 716.5, 661.46, 639.77, 655.66, 648.18, 644.86, 613.71, 593.66, 525.72, 573.02, 634.53, 670.91, 678.62, 610.41, 598.86, 614.23, 610.26, 600.47, 585.39, 593.48, 562.2, 563.29], '6M': [665.95, 648.69, 615.52, 647.63, 738.31, 670.21, 649.81, 655.66, 648.18, 644.86, 613.71, 593.66, 525.72, 574.46, 629.86, 688.55, 675.03, 608.75, 609.63, 614.23, 610.26, 600.47, 585.39, 593.48, 562.2, 563.29], '1Y': [719.22, 732.78, 702.91, 713.58, 695.21, 771.99, 790, 751.48, 754.1, 737.05, 751.98, 775.72, 760.66, 717.34, 717.84, 717.55, 733.27, 751.44, 627.32, 627.08, 597.69, 636.22, 639.6, 650.13, 649.5, 667.55, 660.09, 646.06, 620.8, 658.76, 716.5, 661.46, 639.77, 637.25, 653.56, 647.39, 613.71, 593.66, 525.72, 573.02, 634.53, 670.91, 678.62, 610.41, 598.86, 611.21, 610.26, 600.47, 585.39, 593.48, 562.2, 563.29] },
      velocityScore: { '1D': 0, '1W': 2.7, '1M': -27.8, '6M': null }, isNew: false,
      marketCap: '$1.4T', pe: 20.5, revenueGrowth: 33, eps: 27.51, grossMargin: 82, dividendYield: 0.37,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: 7.49, IVES: 4.62, ALAI: 3.92, CHAT: 2.06, AIFD: false, SPRX: false, AOTG: 1.06 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 5, avgWeight: 3.65, proScore: 1.83, coverage: 0.5,
      price: 483.02, weeklyPrices: [399.92, 398.00, 391.74, 455.96, 483.02], weeklyChange: 20.78, dayChange: 5.93, sortRank: 0, periodReturns: { '1M': 40.9, 'YTD': 190.3, '6M': 182.7, '1Y': 444.8 },
      priceHistory: { '1D': [455.96, 478.08, 493, 492.71, 491.4, 492.19, 497.35, 494.51, 493.37, 496.16, 492.6, 490.93, 489.02, 486.16, 488.25, 484.51, 486.3, 485.94, 484.45, 487.34, 487.48, 482.74, 484.73, 483.02], '1W': [399.92, 398, 391.74, 455.96, 483.02], '1M': [320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02], 'YTD': [166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 129.68, 118.83, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 232.68, 306.88, 320.09, 346.33, 389.2, 397.02, 483.02], '6M': [170.84, 165.77, 172.14, 176.35, 160.46, 142.82, 126.58, 129.68, 118.83, 119.2, 120.31, 116.04, 112.47, 117.14, 149.05, 174.05, 212.84, 202.68, 199.79, 232.68, 306.88, 320.09, 346.33, 389.2, 397.02, 483.02], '1Y': [88.66, 99.86, 91.94, 119.48, 128.87, 174.39, 192, 171.06, 178.56, 176.61, 230.37, 249.38, 205.27, 194.5, 219.36, 161.46, 157.51, 168.25, 179.31, 167.55, 139.52, 144.78, 152.5, 164.32, 140.24, 169.97, 166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 122.31, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 215.58, 306.88, 320.09, 346.33, 389.2, 397.02, 483.02] },
      velocityScore: { '1D': 7, '1W': 14.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$83B', pe: 330.8, revenueGrowth: 93, eps: 1.46, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 2.29, ARTY: 1.55, BAI: false, IGPT: false, IVES: false, ALAI: 1.33, CHAT: 3.25, AIFD: false, SPRX: 9.85, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.43, proScore: 1.71, coverage: 0.5,
      price: 373.02, weeklyPrices: [365.46, 352.83, 372.97, 368.57, 373.02], weeklyChange: 2.07, dayChange: 1.21, sortRank: 0, periodReturns: { '1M': -17.2, 'YTD': -22.9, '6M': -23.5, '1Y': -24.2 },
      priceHistory: { '1D': [368.57, 370.02, 371.86, 372.08, 371.67, 370.37, 369.6, 370.59, 370.13, 371.32, 370.57, 370.76, 373.15, 370.83, 371.37, 370.75, 371.02, 370.86, 370.55, 370.56, 371.3, 371.2, 371.46, 373.02], '1W': [365.46, 352.83, 372.97, 368.57, 373.02], '1M': [460.52, 441.31, 427.34, 428.05, 416.67, 411.74, 403.41, 397.36, 390.34, 390.74, 399.76, 393.83, 378.91, 379.4, 367.34, 373.94, 365.46, 352.83, 372.97, 368.57, 373.02], 'YTD': [483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 397.23, 392.74, 408.96, 395.55, 381.87, 356.77, 372.88, 384.37, 418.07, 424.82, 413.62, 412.66, 421.92, 418.57, 460.52, 411.74, 399.76, 373.94, 373.02], '6M': [487.48, 483.47, 459.38, 451.14, 433.5, 393.67, 401.84, 397.23, 392.74, 408.96, 395.55, 381.87, 356.77, 373.46, 370.87, 422.79, 424.62, 414.44, 415.12, 421.92, 418.57, 460.52, 411.74, 399.76, 373.94, 373.02], '1Y': [492.05, 503.51, 505.62, 505.87, 513.24, 524.94, 529.24, 509.77, 502.04, 505.35, 500.37, 510.02, 510.15, 519.71, 524.85, 513.43, 517.66, 542.07, 514.33, 508.68, 493.79, 476.99, 477.73, 478.56, 476.12, 488.02, 483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 384.47, 398.55, 409.41, 395.55, 381.87, 356.77, 372.88, 384.37, 418.07, 424.82, 413.62, 412.66, 423.54, 418.57, 460.52, 411.74, 399.76, 373.94, 373.02] },
      velocityScore: { '1D': -3.4, '1W': 3.6, '1M': -34.2, '6M': null }, isNew: false,
      marketCap: '$2.8T', pe: 22.2, revenueGrowth: 18, eps: 16.81, grossMargin: 68, dividendYield: 0.99,
      etfPresence: { AIS: false, ARTY: 2.43, BAI: false, IGPT: false, IVES: 4.54, ALAI: 4.81, CHAT: 2.09, AIFD: false, SPRX: false, AOTG: 3.26 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 5, avgWeight: 2.75, proScore: 1.38, coverage: 0.5,
      price: 858.06, weeklyPrices: [842.53, 861.97, 816.98, 851.40, 858.06], weeklyChange: 1.84, dayChange: 0.78, sortRank: 0, periodReturns: { '1M': 0.4, 'YTD': 132.8, '6M': 131.2, '1Y': 837.9 },
      priceHistory: { '1D': [851.4, 845.55, 855.73, 856.96, 854.67, 847.22, 851.89, 847.45, 855.73, 856.73, 855.32, 855.25, 850.6, 851, 854.4, 860.36, 865.31, 866.02, 871.88, 869.77, 865.74, 862.09, 862.44, 858.06], '1W': [842.53, 861.97, 816.98, 851.4, 858.06], '1M': [905, 1029.15, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93, 827.92, 842.53, 861.97, 816.98, 851.4, 858.06], 'YTD': [368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 667.77, 700.91, 558.44, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 1053.09, 970.7, 946.9, 905, 895.4, 957.24, 827.92, 858.06], '6M': [371.18, 392.88, 331.62, 354.49, 381.44, 504.42, 583.46, 667.77, 700.91, 558.44, 622.5, 706.35, 702.73, 826.88, 897.3, 894.07, 881.64, 949.93, 903.8, 970.7, 946.9, 905, 895.4, 957.24, 827.92, 858.06], '1Y': [91.49, 90.44, 99.63, 102.13, 109.85, 110.01, 119.66, 117.96, 124.62, 134.12, 164.88, 163.34, 152.75, 171.4, 163.09, 156.57, 162.95, 198.39, 188.36, 252.47, 247.43, 291.27, 302.98, 366, 320.25, 395.92, 368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 674.73, 783.25, 640.69, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 1053.09, 884.98, 946.9, 905, 895.4, 957.24, 827.92, 858.06] },
      velocityScore: { '1D': 1.5, '1W': 4.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$67B', pe: 150.5, revenueGrowth: 90, eps: 5.7, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.57, IGPT: false, IVES: false, ALAI: 0.76, CHAT: 1.42, AIFD: 5.61, SPRX: 3.4, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 5 of 10 AI & ML ETFs (50% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 5, avgWeight: 2.51, proScore: 1.26, coverage: 0.5,
      price: 2273.73, weeklyPrices: [1914.46, 2335.00, 2090.71, 2050.39, 2273.73], weeklyChange: 18.77, dayChange: 10.89, sortRank: 0, periodReturns: { '1M': 34.1, 'YTD': 857.8, '6M': 846.5, '1Y': 4957.2 },
      priceHistory: { '1D': [2050.39, 2130.98, 2157.79, 2154, 2204.2, 2175, 2195.4, 2193, 2184.3, 2198.88, 2206, 2201.78, 2203.98, 2202.5, 2206.75, 2237.02, 2235.29, 2245.56, 2249, 2256.5, 2258.56, 2256.79, 2263.51, 2273.73], '1W': [1914.46, 2335, 2090.71, 2050.39, 2273.73], '1M': [1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73], 'YTD': [237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 649.97, 635.36, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1407.61, 1478.69, 1761.43, 1642, 2107.86, 1963.6, 2273.73], '6M': [240.22, 353.56, 387.81, 503.44, 539.3, 576.2, 630.29, 649.97, 635.36, 527.33, 661.62, 709.71, 615.83, 701.59, 851.77, 920.99, 989.9, 1187, 1562.34, 1407.61, 1478.69, 1761.43, 1642, 2107.86, 1963.6, 2273.73], '1Y': [44.96, 46.2, 41.36, 43, 43.39, 42.1, 46.83, 44.58, 47.35, 53.01, 73.92, 93.97, 99.83, 121.12, 131.88, 144.3, 149.29, 175.53, 194.57, 271.58, 244.93, 220.5, 194.38, 232.86, 206.83, 250.08, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 588.73, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1333.01, 1478.69, 1761.43, 1642, 2107.86, 1963.6, 2273.73] },
      velocityScore: { '1D': -3.1, '1W': -0.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$337B', pe: 77.5, revenueGrowth: 251, eps: 29.32, grossMargin: 56, dividendYield: null,
      etfPresence: { AIS: 2.25, ARTY: false, BAI: 3.12, IGPT: 4.4, IVES: false, ALAI: 0.58, CHAT: false, AIFD: false, SPRX: false, AOTG: 2.21 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'CRDO', name: 'Credo Technology Group Holding Ltd', easyScore: 5, avgWeight: 1.86, proScore: 0.93, coverage: 0.5,
      price: 271.95, weeklyPrices: [268.99, 268.03, 238.00, 245.68, 271.95], weeklyChange: 1.1, dayChange: 10.69, sortRank: 0, periodReturns: { '1M': 15.2, 'YTD': 89, '6M': 87.7, '1Y': 210.5 },
      priceHistory: { '1D': [245.68, 256.64, 265.32, 268.52, 269.55, 268.25, 271.85, 271.41, 270.89, 273.58, 273.98, 272.96, 271.12, 268.67, 270, 269.4, 269.05, 271.04, 271.42, 271.76, 273.33, 273.92, 273.78, 271.95], '1W': [268.99, 268.03, 238, 245.68, 271.95], '1M': [226.1, 229, 214.6, 217.5, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95], 'YTD': [143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.06, 112.27, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 210.22, 172.17, 218.41, 226.1, 222.27, 259.41, 272.01, 271.95], '6M': [144.92, 141, 156.84, 135.1, 129.47, 98.06, 121.78, 124.06, 112.27, 109.83, 117.69, 103.4, 95.24, 101.45, 119.59, 160.69, 195.04, 184.38, 188.51, 172.17, 218.41, 226.1, 222.27, 259.41, 272.01, 271.95], '1Y': [87.59, 97.59, 101.19, 98.41, 116.01, 117.34, 125.38, 106.3, 120.1, 124.77, 163.96, 164.44, 149.38, 144.91, 148.87, 131.41, 144.17, 162.18, 164.23, 158.5, 139.56, 154.18, 189.19, 157.98, 134.13, 150.19, 143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.05, 114.22, 115.98, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 210.22, 156.27, 218.41, 226.1, 222.27, 259.41, 272.01, 271.95] },
      velocityScore: { '1D': -2.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$51B', pe: 108.3, revenueGrowth: 157, eps: 2.51, grossMargin: 68, dividendYield: null,
      etfPresence: { AIS: 1, ARTY: 1.21, BAI: 1.98, IGPT: false, IVES: false, ALAI: false, CHAT: 2.15, AIFD: false, SPRX: 2.94, AOTG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 4, avgWeight: 3.21, proScore: 1.28, coverage: 0.4,
      price: 139.63, weeklyPrices: [131.65, 132.87, 128.32, 131.72, 139.63], weeklyChange: 6.06, dayChange: 6.01, sortRank: 0, periodReturns: { '1M': 21.8, 'YTD': 278.4, '6M': 274.3, '1Y': 511.1 },
      priceHistory: { '1D': [131.72, 134.55, 138.13, 137.1, 137.07, 137.4, 140.26, 139.98, 139.67, 140.13, 140.31, 140.66, 141.74, 141.32, 141.94, 141.96, 141.28, 140.76, 140.34, 140.35, 140.32, 140.16, 140.38, 139.63], '1W': [131.65, 132.87, 128.32, 131.72, 139.63], '1M': [109.33, 107.93, 112.71, 111.78, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63], 'YTD': [36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 44.11, 45.61, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 129.44, 108.77, 119.84, 109.33, 110.27, 127.86, 132.28, 139.63], '6M': [37.3, 42.63, 48.72, 54.32, 48.66, 48.24, 46.48, 44.11, 45.61, 43.42, 45.77, 43.87, 43.13, 50.38, 62.38, 68.5, 82.54, 99.62, 124.92, 108.77, 119.84, 109.33, 110.27, 127.86, 132.28, 139.63], '1Y': [22.85, 23.44, 22.69, 23.49, 20.34, 20.41, 21.81, 25.31, 24.35, 24, 24.77, 24.9, 31.22, 35.94, 37.43, 37.15, 38.12, 41.53, 37.03, 37.88, 34.33, 35.83, 43.76, 40.78, 36.05, 36.16, 36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 43.63, 45.5, 45.58, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 129.44, 108.17, 119.84, 109.33, 110.27, 127.86, 132.28, 139.63] },
      velocityScore: { '1D': 0, '1W': -0.8, '1M': -50.6, '6M': null }, isNew: false,
      marketCap: '$702B', pe: null, revenueGrowth: 7, eps: -0.61, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.49, ARTY: false, BAI: 3.2, IGPT: 4.8, IVES: false, ALAI: false, CHAT: 1.34, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'ARM', name: 'ARM Holdings PLC', easyScore: 4, avgWeight: 3.03, proScore: 1.21, coverage: 0.4,
      price: 354.57, weeklyPrices: [359.08, 347.71, 334.27, 343.58, 354.57], weeklyChange: -1.26, dayChange: 3.2, sortRank: 0, periodReturns: { '1M': 0.4, 'YTD': 224.4, '6M': 219.8, '1Y': 126.8 },
      priceHistory: { '1D': [343.58, 347.86, 358.8, 359.79, 357.86, 350.28, 352.88, 353.17, 354.85, 357.5, 358.82, 356.58, 360.52, 358.05, 360.52, 359.46, 358.89, 357.93, 358.17, 357.45, 356.91, 356.65, 354.9, 354.57], '1W': [359.08, 347.71, 334.27, 343.58, 354.57], '1M': [408.85, 402.71, 411.83, 393.44, 342.93, 346.39, 324.86, 307.43, 342.23, 380.81, 412.55, 396.34, 418.88, 439.46, 407.72, 366.39, 359.08, 347.71, 334.27, 343.58, 354.57], 'YTD': [109.31, 113.08, 105.11, 116.07, 105.36, 123.7, 125.28, 125.58, 127.45, 114.38, 115.75, 132.35, 144.13, 148.77, 157.58, 175.1, 215.88, 203.26, 212.65, 209.16, 306.51, 408.85, 346.39, 412.55, 366.39, 354.57], '6M': [110.86, 115.68, 104.99, 119.2, 108.43, 110.88, 122.19, 125.58, 127.45, 114.38, 115.75, 132.35, 144.13, 149.11, 148.93, 166.73, 234.81, 211.18, 213.27, 209.16, 306.51, 408.85, 346.39, 412.55, 366.39, 354.57], '1Y': [156.33, 148.02, 153.9, 159.28, 163.32, 136.12, 142.39, 134.01, 140.26, 131.42, 154.14, 153.37, 144.3, 150.38, 166.77, 170.67, 169.38, 173.09, 160.73, 149.74, 136.04, 131.44, 139.19, 141.52, 114.58, 111.55, 109.31, 113.08, 105.11, 116.07, 105.36, 123.7, 125.28, 123.78, 124.37, 117.63, 115.75, 132.35, 144.13, 148.77, 157.58, 175.1, 215.88, 203.26, 212.65, 215.12, 306.51, 408.85, 346.39, 412.55, 366.39, 354.57] },
      velocityScore: { '1D': 0, '1W': -18.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$379B', pe: 412.3, revenueGrowth: 20, eps: 0.86, grossMargin: 98, dividendYield: null,
      etfPresence: { AIS: 1.84, ARTY: false, BAI: false, IGPT: false, IVES: false, ALAI: 0.17, CHAT: 2.61, AIFD: false, SPRX: 7.51, AOTG: false },
      tonyNote: 'Arm Holdings is held across Broad Tech and AI ETFs as the CPU architecture licensor embedded in every mobile device and increasingly in AI inference chips and data center CPUs. Revenue grew and the royalty model is high-margin; the weight score reflects consistent institutional positioning as the AI chip design ecosystem expands on Arm cores.',
    },
    {
      ticker: 'NBIS', name: 'NEBIUS GROUP NV', easyScore: 4, avgWeight: 3.03, proScore: 1.21, coverage: 0.4,
      price: 276.17, weeklyPrices: [259.66, 256.63, 240.30, 261.15, 276.17], weeklyChange: 6.36, dayChange: 5.75, sortRank: 0, periodReturns: { '1M': 19.5, 'YTD': 229.9, '6M': 224.3, '1Y': 448.9 },
      priceHistory: { '1D': [261.15, 272.23, 279.25, 282.71, 287.89, 285.14, 288.2, 288.05, 282.2, 284.2, 282.34, 280.23, 281.01, 279.91, 280.35, 282.73, 281.44, 279.7, 278.39, 280.72, 278.96, 279.67, 278.43, 276.17], '1W': [259.66, 256.63, 240.3, 261.15, 276.17], '1M': [264.51, 260.58, 251.68, 259.67, 227.81, 218, 220.12, 211.69, 222.24, 232.36, 260.07, 265.1, 280.91, 286.69, 283.61, 275.25, 259.66, 256.63, 240.3, 261.15, 276.17], 'YTD': [83.71, 97.3, 103.89, 94.5, 85.19, 86.1, 98.01, 97.92, 91.19, 89.33, 112.95, 117.62, 100.82, 112.54, 154.56, 159.16, 144.96, 176.42, 186.1, 219.94, 214.77, 264.51, 218, 260.07, 275.25, 276.17], '6M': [85.17, 96.21, 101.98, 96.85, 94.91, 73.87, 89.73, 97.92, 91.19, 89.33, 112.95, 117.62, 100.82, 108.82, 144.97, 157.14, 147.16, 154.49, 177.05, 219.94, 214.77, 264.51, 218, 260.07, 275.25, 276.17], '1Y': [50.31, 46.05, 53.31, 51.88, 51.29, 55.09, 75.33, 67.19, 70.48, 65.65, 93.39, 94.08, 113.23, 115.61, 122, 125.83, 104.28, 121.83, 110.54, 102.22, 90.54, 88.88, 98.92, 93.59, 75.45, 91.13, 83.71, 97.3, 103.89, 94.5, 85.19, 86.1, 98.01, 100.61, 91.01, 94.94, 112.95, 117.62, 100.82, 112.54, 154.56, 159.16, 144.96, 176.42, 186.1, 199.86, 214.77, 264.51, 218, 260.07, 275.25, 276.17] },
      velocityScore: { '1D': 3.4, '1W': null, '1M': -40.4, '6M': null }, isNew: false,
      marketCap: '$70B', pe: 106.6, revenueGrowth: 684, eps: 2.59, grossMargin: 72, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 2.67, ALAI: 3.96, CHAT: 3.73, AIFD: 1.76, SPRX: false, AOTG: false },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 4, avgWeight: 2.83, proScore: 1.13, coverage: 0.4,
      price: 334.82, weeklyPrices: [316.43, 325.57, 303.95, 306.97, 334.82], weeklyChange: 5.81, dayChange: 9.07, sortRank: 0, periodReturns: { '1M': 6.1, 'YTD': 106.7, '6M': 103.7, '1Y': 173.2 },
      priceHistory: { '1D': [306.97, 315.4, 320.33, 319.21, 324.26, 324.67, 329.25, 330.11, 330.69, 328.26, 327.5, 328.99, 328.61, 328.27, 328.9, 330.47, 331.78, 331.59, 334.15, 333.92, 333.88, 332.94, 333.97, 334.82], '1W': [316.43, 325.57, 303.95, 306.97, 334.82], '1M': [323.39, 334.49, 331.44, 323.92, 300.51, 300.57, 289.52, 280.98, 297.88, 302.87, 311.93, 299.6, 317.58, 333.05, 357.96, 318.32, 316.43, 325.57, 303.95, 306.97, 334.82], 'YTD': [162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 234.53, 243.75, 254.89, 241.78, 258.88, 255.88, 251.07, 258.73, 299.96, 314.41, 322.43, 330.97, 367.92, 370.94, 327.46, 323.39, 300.57, 311.93, 318.32, 334.82], '6M': [164.34, 171.54, 170.86, 181.12, 195.1, 177.75, 236.51, 243.75, 254.89, 241.78, 258.88, 255.88, 251.07, 261.29, 295.11, 307.34, 323.46, 328.31, 339.97, 370.94, 327.46, 323.39, 300.57, 311.93, 318.32, 334.82], '1Y': [122.54, 128.37, 125.4, 130.19, 144.17, 139.75, 143.72, 129.05, 127.93, 125.59, 136.74, 136.83, 141.62, 161.59, 167.38, 180.51, 174.8, 190.57, 180.82, 179.05, 164.86, 169.57, 178.88, 181.82, 149.83, 166.87, 162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 234.53, 245.42, 257.75, 264.35, 258.88, 255.88, 251.07, 258.73, 299.96, 314.41, 322.43, 330.97, 367.92, 339.73, 327.46, 323.39, 300.57, 311.93, 318.32, 334.82] },
      velocityScore: { '1D': -1.7, '1W': -6.6, '1M': -39.6, '6M': null }, isNew: false,
      marketCap: '$129B', pe: 83.9, revenueGrowth: 30, eps: 3.99, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 3.41, ARTY: false, BAI: 1.78, IGPT: false, IVES: false, ALAI: false, CHAT: 2.18, AIFD: 3.96, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 4.89, proScore: 4.89, coverage: 1,
      price: 1154.29, weeklyPrices: [1048.51, 1213.56, 1132.33, 1145.28, 1154.29], weeklyChange: 10.09, dayChange: 0.79, sortRank: 0, periodReturns: { '1M': 18.9, 'YTD': 304.4, '6M': 294.5, '1Y': 854.8 },
      priceHistory: { '1D': [1145.28, 1137.42, 1149.3, 1146.01, 1149.25, 1139.53, 1146.65, 1140.91, 1142.63, 1151.48, 1164.49, 1152.45, 1151.84, 1158.84, 1156.51, 1155.3, 1151.51, 1148.42, 1151.06, 1156.78, 1168.13, 1161.09, 1165.2, 1154.29], '1W': [1048.51, 1213.56, 1132.33, 1145.28, 1154.29], '1M': [1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 724.66, 751, 1035.5, 949.28, 1087.99, 1051.77, 1154.29], '6M': [292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 1035.5, 949.28, 1087.99, 1051.77, 1154.29], '1Y': [120.89, 122.24, 116.43, 109.83, 114.74, 108.78, 127.75, 122.05, 116.5, 118.72, 140, 159.99, 161.71, 182.15, 196.54, 191.94, 202.29, 221.91, 218.03, 241.11, 228.5, 224.53, 234.16, 263.71, 225.52, 286.68, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 751, 1035.5, 949.28, 1087.99, 1051.77, 1154.29] },
      velocityScore: { '1D': -1.8, '1W': -13.5, '1M': -28.5, '6M': null }, isNew: false,
      marketCap: '$1.3T', pe: 26.1, revenueGrowth: 346, eps: 44.21, grossMargin: 73, dividendYield: null,
      etfPresence: { SOXX: 8.84, PSI: 5.83, XSD: 2.85, DRAM: 2.04 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 5.12, proScore: 3.84, coverage: 0.75,
      price: 580.91, weeklyPrices: [519.74, 532.57, 521.58, 539.49, 580.91], weeklyChange: 11.77, dayChange: 7.68, sortRank: 0, periodReturns: { '1M': 12.6, 'YTD': 171.3, '6M': 169.8, '1Y': 326.8 },
      priceHistory: { '1D': [539.49, 552.14, 558.59, 558.03, 557.98, 557.03, 565.34, 565, 571.8, 575.15, 577.24, 576.66, 580.85, 580.12, 579.51, 578.81, 580.74, 579.23, 582.4, 582.44, 583.14, 583, 583.43, 580.91], '1W': [519.74, 532.57, 521.58, 539.49, 580.91], '1M': [510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 424.1, 467.51, 510.13, 490.33, 547.26, 519.85, 580.91], '6M': [215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 467.51, 510.13, 490.33, 547.26, 519.85, 580.91], '1Y': [136.11, 138.41, 160.08, 158.65, 179.51, 163.12, 174.95, 166.55, 166.62, 162.13, 159.54, 159.16, 160.88, 164.01, 235.56, 238.6, 238.03, 258.01, 250.05, 237.52, 230.29, 206.13, 217.6, 221.42, 198.11, 215.04, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 420.99, 467.51, 510.13, 490.33, 547.26, 519.85, 580.91] },
      velocityScore: { '1D': -1, '1W': 3.8, '1M': -36.9, '6M': null }, isNew: false,
      marketCap: '$947B', pe: 192.4, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 7.84, PSI: 4.88, XSD: 2.65, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.61, proScore: 3.46, coverage: 0.75,
      price: 139.63, weeklyPrices: [131.65, 132.87, 128.32, 131.72, 139.63], weeklyChange: 6.06, dayChange: 6.01, sortRank: 0, periodReturns: { '1M': 21.8, 'YTD': 278.4, '6M': 274.3, '1Y': 511.1 },
      priceHistory: { '1D': [131.72, 134.55, 138.13, 137.1, 137.07, 137.4, 140.26, 139.98, 139.67, 140.13, 140.31, 140.66, 141.74, 141.32, 141.94, 141.96, 141.28, 140.76, 140.34, 140.35, 140.32, 140.16, 140.38, 139.63], '1W': [131.65, 132.87, 128.32, 131.72, 139.63], '1M': [109.33, 107.93, 112.71, 111.78, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63], 'YTD': [36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 44.11, 45.61, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 129.44, 108.77, 119.84, 109.33, 110.27, 127.86, 132.28, 139.63], '6M': [37.3, 42.63, 48.72, 54.32, 48.66, 48.24, 46.48, 44.11, 45.61, 43.42, 45.77, 43.87, 43.13, 50.38, 62.38, 68.5, 82.54, 99.62, 124.92, 108.77, 119.84, 109.33, 110.27, 127.86, 132.28, 139.63], '1Y': [22.85, 23.44, 22.69, 23.49, 20.34, 20.41, 21.81, 25.31, 24.35, 24, 24.77, 24.9, 31.22, 35.94, 37.43, 37.15, 38.12, 41.53, 37.03, 37.88, 34.33, 35.83, 43.76, 40.78, 36.05, 36.16, 36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 43.63, 45.5, 45.58, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 129.44, 108.17, 119.84, 109.33, 110.27, 127.86, 132.28, 139.63] },
      velocityScore: { '1D': -1.7, '1W': -0.6, '1M': 0.3, '6M': null }, isNew: false,
      marketCap: '$702B', pe: null, revenueGrowth: 7, eps: -0.61, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 6.23, PSI: 4.86, XSD: 2.73, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 4.4, proScore: 3.3, coverage: 0.75,
      price: 200.09, weeklyPrices: [199.00, 195.74, 192.53, 194.97, 200.09], weeklyChange: 0.55, dayChange: 2.63, sortRank: 0, periodReturns: { '1M': -5.2, 'YTD': 7.3, '6M': 6.7, '1Y': 30.5 },
      priceHistory: { '1D': [194.97, 197.02, 198.54, 197.98, 197.76, 196.56, 198.29, 198.24, 198.05, 198.21, 198.34, 197.85, 198.23, 198.21, 198.21, 198.27, 198.48, 199.28, 198.23, 198.82, 198.89, 199.28, 199.03, 200.09], '1W': [199, 195.74, 192.53, 194.97, 200.09], '1M': [224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09], 'YTD': [186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 225.32, 215.33, 224.36, 208.64, 212.45, 200.04, 200.09], '6M': [187.54, 189.11, 183.14, 184.84, 192.51, 171.88, 186.94, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 225.32, 215.33, 224.36, 208.64, 212.45, 200.04, 200.09], '1Y': [153.3, 162.88, 171.37, 170.78, 179.27, 179.42, 183.16, 175.64, 181.77, 170.62, 177.33, 170.29, 176.97, 187.24, 189.11, 179.83, 181.16, 201.03, 198.69, 193.16, 181.36, 177.82, 179.59, 183.78, 170.94, 188.61, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 182.65, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 222.32, 215.33, 224.36, 208.64, 212.45, 200.04, 200.09] },
      velocityScore: { '1D': -3.2, '1W': -0.9, '1M': 2.8, '6M': null }, isNew: false,
      marketCap: '$4.8T', pe: 30.6, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: null,
      etfPresence: { SOXX: 6.92, PSI: 4.14, XSD: 2.15, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.34, proScore: 2.5, coverage: 0.75,
      price: 397.17, weeklyPrices: [413.16, 417.93, 386.91, 391.78, 397.17], weeklyChange: -3.87, dayChange: 1.38, sortRank: 0, periodReturns: { '1M': -4, 'YTD': 46.4, '6M': 44.5, '1Y': 65 },
      priceHistory: { '1D': [391.78, 396.35, 398.76, 398.99, 399.68, 397.53, 395.93, 394.54, 394.66, 393.8, 394.02, 396.27, 396.21, 395.85, 397.33, 397.89, 397.89, 398.48, 398.64, 398.03, 398.02, 397.47, 398.32, 397.17], '1W': [413.16, 417.93, 386.91, 391.78, 397.17], '1M': [402.69, 423.2, 437.67, 428.76, 401.39, 403.89, 404.62, 392.67, 412.13, 417.79, 427.58, 416, 414.45, 434.46, 445.48, 407.26, 413.16, 417.93, 386.91, 391.78, 397.17], 'YTD': [271.2, 299.16, 302.1, 305.6, 310.88, 320.45, 337.1, 355.03, 355.79, 315.81, 306.07, 309.43, 307.44, 327.36, 350.01, 381.05, 392.59, 397.02, 422.73, 417.49, 397.07, 402.69, 403.89, 427.58, 407.26, 397.17], '6M': [274.82, 292.89, 297.99, 308.52, 318.7, 322.12, 331.36, 355.03, 355.79, 315.81, 306.07, 309.43, 307.44, 318.34, 350.14, 371.45, 399.57, 397.69, 416.52, 417.49, 397.07, 402.69, 403.89, 427.58, 407.26, 397.17], '1Y': [240.64, 242.72, 240.61, 228.08, 231.11, 220.69, 232.04, 230.44, 255.63, 244.55, 247.21, 246.32, 248.61, 239.28, 237.93, 238.15, 246.37, 239.35, 229.38, 233.41, 230.13, 252.02, 278.24, 281.57, 271.04, 277.56, 271.2, 299.16, 302.1, 305.6, 310.88, 320.45, 337.1, 355.15, 352.41, 319.71, 306.07, 309.43, 307.44, 327.36, 350.01, 381.05, 392.59, 397.02, 422.73, 418.58, 397.07, 402.69, 403.89, 427.58, 407.26, 397.17] },
      velocityScore: { '1D': -3.1, '1W': -6.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$193B', pe: 58.9, revenueGrowth: 37, eps: 6.74, grossMargin: 64, dividendYield: null,
      etfPresence: { SOXX: 3.55, PSI: 4.25, XSD: 2.21, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 6.37, proScore: 3.19, coverage: 0.5,
      price: 723, weeklyPrices: [588.97, 668.00, 626.84, 694.64, 723.00], weeklyChange: 22.76, dayChange: 4.08, sortRank: 0, periodReturns: { '1M': 60.6, 'YTD': 181.3, '6M': 178.1, '1Y': 293.4 },
      priceHistory: { '1D': [694.64, 713.5, 726.52, 720.56, 726.84, 729.53, 737.1, 733.18, 732.78, 732.3, 729.6, 731.51, 729.62, 734.57, 732.86, 735.15, 732.62, 733.25, 736.77, 735.92, 737.64, 738.91, 737.53, 723], '1W': [588.97, 668, 626.84, 694.64, 723], '1M': [458.17, 490.05, 500.77, 501.7, 453.01, 492.17, 499.21, 497.01, 552.64, 567.25, 585.78, 568.23, 592.92, 617.11, 640.18, 585.88, 588.97, 668, 626.84, 694.64, 723], 'YTD': [256.99, 281.64, 319.08, 322.38, 322.32, 322.51, 354.91, 375.38, 372.3, 324.74, 341.53, 357.06, 337.17, 352.62, 395.73, 391.62, 404.86, 391.38, 443.62, 436.62, 432.16, 458.17, 492.17, 585.78, 585.88, 723], '6M': [259.97, 292.2, 301.89, 318.79, 341.34, 303.99, 328.39, 375.38, 372.3, 324.74, 341.53, 357.06, 337.17, 348.47, 399.49, 396.94, 417.04, 389.08, 435.44, 436.62, 432.16, 458.17, 492.17, 585.78, 585.88, 723], '1Y': [183.76, 195.39, 194.81, 187.01, 189.39, 178.14, 188.45, 162.22, 164.51, 156.25, 163.42, 178.13, 201.44, 217.74, 217.51, 227.58, 226, 227.64, 230.19, 228.67, 225.12, 242.46, 268.63, 275.15, 248.27, 260.78, 256.99, 281.64, 319.08, 322.38, 322.32, 322.51, 354.91, 373.55, 372.18, 338.94, 341.53, 357.06, 337.17, 352.62, 395.73, 391.62, 404.86, 391.38, 443.62, 413.57, 432.16, 458.17, 492.17, 585.78, 585.88, 723] },
      velocityScore: { '1D': 5.6, '1W': 13.9, '1M': 8.1, '6M': null }, isNew: false,
      marketCap: '$574B', pe: 68, revenueGrowth: 11, eps: 10.63, grossMargin: 49, dividendYield: null,
      etfPresence: { SOXX: 5.78, PSI: 6.96, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 5.87, proScore: 2.93, coverage: 0.5,
      price: 301.71, weeklyPrices: [240.48, 258.80, 248.64, 278.39, 301.71], weeklyChange: 25.46, dayChange: 8.38, sortRank: 0, periodReturns: { '1M': 57, 'YTD': 148.3, '6M': 142.6, '1Y': 235.7 },
      priceHistory: { '1D': [278.39, 289.56, 295.43, 294.61, 296.63, 296, 297.81, 293.7, 293.92, 295.33, 296.18, 298.3, 298.58, 302.96, 302.63, 303.15, 302.33, 301.38, 303.39, 304.15, 305.11, 305.02, 305.19, 301.71], '1W': [240.48, 258.8, 248.64, 278.39, 301.71], '1M': [194, 204.52, 212.51, 213.11, 192.92, 210.81, 213.94, 213.56, 241.16, 254.54, 256.42, 237.33, 238.73, 259.56, 269.16, 244.49, 240.48, 258.8, 248.64, 278.39, 301.71], 'YTD': [121.51, 132.46, 154.5, 151.28, 142.79, 144.29, 146.41, 149.6, 152.46, 134.46, 141.86, 149.87, 144.32, 154.01, 176.88, 180.53, 190, 171.33, 184.52, 180.43, 188.84, 194, 210.81, 256.42, 244.49, 301.71], '6M': [124.36, 135.97, 143.45, 150, 168.47, 133.1, 145.09, 149.6, 152.46, 134.46, 141.86, 149.87, 144.32, 151.68, 173.73, 179.14, 193.5, 172.63, 186.92, 180.43, 188.84, 194, 210.81, 256.42, 244.49, 301.71], '1Y': [89.89, 92.32, 93.35, 89.71, 92.5, 88.83, 93.55, 87.61, 88.81, 84.39, 93.26, 98.99, 106.87, 112.89, 106.26, 108.7, 114.74, 120.6, 119.35, 119.09, 112.31, 114.59, 121.18, 123.89, 117.2, 127.7, 121.51, 132.46, 154.5, 151.28, 142.79, 144.29, 146.41, 148.77, 153.49, 142.91, 141.86, 149.87, 144.32, 154.01, 176.88, 180.53, 190, 171.33, 184.52, 175.65, 188.84, 194, 210.81, 256.42, 244.49, 301.71] },
      velocityScore: { '1D': 6.5, '1W': 8.5, '1M': 14, '6M': null }, isNew: false,
      marketCap: '$394B', pe: 85.2, revenueGrowth: 12, eps: 3.54, grossMargin: 61, dividendYield: 0.33,
      etfPresence: { SOXX: 5.43, PSI: 6.31, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 5.32, proScore: 2.66, coverage: 0.5,
      price: 433.33, weeklyPrices: [374.80, 401.82, 379.09, 410.91, 433.33], weeklyChange: 15.62, dayChange: 5.46, sortRank: 0, periodReturns: { '1M': 36.2, 'YTD': 153.1, '6M': 149.4, '1Y': 347.6 },
      priceHistory: { '1D': [410.91, 426.97, 432.6, 428.92, 432.38, 432, 432.61, 425.76, 426.49, 428.13, 427.66, 429.07, 430.16, 432.85, 433.67, 434.61, 433.85, 432.26, 433.34, 434.9, 434.72, 434.89, 436.32, 433.33], '1W': [374.8, 401.82, 379.09, 410.91, 433.33], '1M': [317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04, 409.54, 371.33, 374.8, 401.82, 379.09, 410.91, 433.33], 'YTD': [171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 244.92, 233.89, 199.33, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 258.57, 296.05, 284.72, 305.35, 317.12, 324.45, 388.92, 371.33, 433.33], '6M': [173.78, 203.08, 208.79, 220.7, 248.17, 213.31, 231.29, 244.92, 233.89, 199.33, 212.2, 228.36, 211.41, 218.44, 263.66, 267.6, 267.78, 256.72, 294.05, 284.72, 305.35, 317.12, 324.45, 388.92, 371.33, 433.33], '1Y': [96.81, 99.81, 100.37, 97.1, 99.09, 95.94, 105.28, 100.33, 103.63, 97.74, 107.36, 121.9, 128.32, 142.79, 142.54, 144.78, 145.04, 155.62, 155.78, 159.18, 143.24, 151.93, 159.75, 168.26, 154.98, 177.33, 171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 242.27, 231, 211.15, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 258.57, 296.05, 277.96, 305.35, 317.12, 324.45, 388.92, 371.33, 433.33] },
      velocityScore: { '1D': 3.1, '1W': 5.6, '1M': -1.1, '6M': null }, isNew: false,
      marketCap: '$542B', pe: 81.8, revenueGrowth: 24, eps: 5.3, grossMargin: 50, dividendYield: 0.25,
      etfPresence: { SOXX: 4.84, PSI: 5.81, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 4.23, proScore: 2.12, coverage: 0.5,
      price: 377.75, weeklyPrices: [382.07, 378.91, 365.02, 372.45, 377.75], weeklyChange: -1.13, dayChange: 1.42, sortRank: 0, periodReturns: { '1M': -15.4, 'YTD': 9.1, '6M': 8, '1Y': 42.7 },
      priceHistory: { '1D': [372.45, 377.55, 377.92, 376.39, 376.77, 374.95, 375.26, 374.74, 375.22, 376.35, 376.24, 374.69, 375.89, 374.86, 374.56, 375.4, 375.5, 377.11, 377.39, 378.46, 379.05, 378.49, 378.45, 377.75], '1W': [382.07, 378.91, 365.02, 372.45, 377.75], '1M': [459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75], 'YTD': [346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 425.19, 414.14, 459.97, 396.6, 393.94, 380.15, 377.75], '6M': [349.85, 343.5, 339.89, 325.49, 330.73, 310.51, 331.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 425.19, 414.14, 459.97, 396.6, 393.94, 380.15, 377.75], '1Y': [264.74, 277.9, 280.81, 283.69, 302.62, 301.67, 312.83, 294.91, 298.01, 302.39, 369.57, 346.17, 339.31, 333.39, 345.5, 351.33, 342.66, 372.97, 351.94, 351.96, 340.5, 385.03, 380.61, 412.97, 326.02, 350.22, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 345.75, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 420.71, 414.14, 459.97, 396.6, 393.94, 380.15, 377.75] },
      velocityScore: { '1D': -1.4, '1W': 2.4, '1M': -44.8, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 63, revenueGrowth: 48, eps: 6, grossMargin: 76, dividendYield: 0.7,
      etfPresence: { SOXX: 6.25, PSI: false, XSD: 2.21, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 3.76, proScore: 1.88, coverage: 0.5,
      price: 297.89, weeklyPrices: [276.70, 281.26, 266.77, 277.75, 297.89], weeklyChange: 7.66, dayChange: 7.25, sortRank: 0, periodReturns: { '1M': 45.3, 'YTD': 250.5, '6M': 243.3, '1Y': 290.7 },
      priceHistory: { '1D': [277.75, 283.96, 291.78, 296.13, 295.7, 294.83, 298.55, 297.05, 296.31, 297.16, 296.67, 291.67, 293.63, 294.04, 294.11, 292.89, 292.87, 292.74, 297.28, 295.9, 296.31, 295.39, 297.17, 297.89], '1W': [276.7, 281.26, 266.77, 277.75, 297.89], '1M': [219.43, 290.79, 301.65, 316.43, 263.47, 288.85, 266.88, 252.59, 280.71, 279.7, 308.88, 278.67, 289.54, 310.58, 307.86, 279.04, 276.7, 281.26, 266.77, 277.75, 297.89], 'YTD': [84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 79.48, 81.69, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 163.66, 170.84, 176.89, 196.33, 219.43, 288.85, 308.88, 279.04, 297.89], '6M': [86.76, 84.64, 81.21, 83.1, 81.34, 74.21, 78.23, 79.48, 81.69, 89.57, 87.86, 87.91, 94.88, 107.11, 128.49, 139.69, 164.31, 164.95, 170.13, 176.89, 196.33, 219.43, 288.85, 308.88, 279.04, 297.89], '1Y': [76.24, 72.26, 70.85, 73.27, 81.74, 75.32, 77.81, 72.07, 74.26, 62.31, 67.1, 70.98, 80.09, 83.89, 92.5, 88.89, 84.26, 88.46, 87.59, 89.33, 78.68, 83.43, 100.2, 92.47, 81.7, 86.49, 84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 77.79, 80.86, 92.65, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 163.66, 170.84, 168.93, 196.33, 219.43, 288.85, 308.88, 279.04, 297.89] },
      velocityScore: { '1D': 0.5, '1W': -3.1, '1M': -44.4, '6M': null }, isNew: false,
      marketCap: '$261B', pe: 102, revenueGrowth: 28, eps: 2.92, grossMargin: 52, dividendYield: 0.09,
      etfPresence: { SOXX: 5.08, PSI: false, XSD: 2.44, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 3.02, proScore: 1.51, coverage: 0.5,
      price: 483.02, weeklyPrices: [399.92, 398.00, 391.74, 455.96, 483.02], weeklyChange: 20.78, dayChange: 5.93, sortRank: 0, periodReturns: { '1M': 40.9, 'YTD': 190.3, '6M': 182.7, '1Y': 444.8 },
      priceHistory: { '1D': [455.96, 478.08, 493, 492.71, 491.4, 492.19, 497.35, 494.51, 493.37, 496.16, 492.6, 490.93, 489.02, 486.16, 488.25, 484.51, 486.3, 485.94, 484.45, 487.34, 487.48, 482.74, 484.73, 483.02], '1W': [399.92, 398, 391.74, 455.96, 483.02], '1M': [320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02], 'YTD': [166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 129.68, 118.83, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 232.68, 306.88, 320.09, 346.33, 389.2, 397.02, 483.02], '6M': [170.84, 165.77, 172.14, 176.35, 160.46, 142.82, 126.58, 129.68, 118.83, 119.2, 120.31, 116.04, 112.47, 117.14, 149.05, 174.05, 212.84, 202.68, 199.79, 232.68, 306.88, 320.09, 346.33, 389.2, 397.02, 483.02], '1Y': [88.66, 99.86, 91.94, 119.48, 128.87, 174.39, 192, 171.06, 178.56, 176.61, 230.37, 249.38, 205.27, 194.5, 219.36, 161.46, 157.51, 168.25, 179.31, 167.55, 139.52, 144.78, 152.5, 164.32, 140.24, 169.97, 166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 122.31, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 215.58, 306.88, 320.09, 346.33, 389.2, 397.02, 483.02] },
      velocityScore: { '1D': 11.9, '1W': 11.9, '1M': -34.1, '6M': null }, isNew: false,
      marketCap: '$83B', pe: 330.8, revenueGrowth: 93, eps: 1.46, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.98, PSI: false, XSD: 3.06, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 2.87, proScore: 1.43, coverage: 0.5,
      price: 298.07, weeklyPrices: [303.11, 311.81, 285.43, 285.48, 298.07], weeklyChange: -1.66, dayChange: 4.41, sortRank: 0, periodReturns: { '1M': -2.5, 'YTD': 71.8, '6M': 69.9, '1Y': 41.6 },
      priceHistory: { '1D': [285.48, 292.49, 293.55, 294.46, 297.07, 295.25, 295.83, 295.07, 295.29, 294.84, 295.71, 295.84, 296.15, 296.32, 296.73, 297.24, 297.11, 297.92, 297.88, 298.48, 299.24, 298.89, 298.93, 298.07], '1W': [303.11, 311.81, 285.43, 285.48, 298.07], '1M': [293.2, 308.12, 308.59, 305.37, 285.06, 290.9, 288.63, 282.01, 297.1, 301.12, 313.34, 305.71, 301.88, 322.86, 332.28, 304.36, 303.11, 311.81, 285.43, 285.48, 298.07], 'YTD': [173.49, 188.45, 189.12, 193.31, 215.55, 221.44, 226.16, 219.73, 212.11, 193.23, 190.78, 187.19, 190.33, 199.42, 216.71, 233.7, 269.5, 280.89, 297.76, 302.73, 309.21, 293.2, 290.9, 313.34, 304.36, 298.07], '6M': [175.42, 185.71, 193.45, 194.99, 218.97, 223.98, 223, 219.73, 212.11, 193.23, 190.78, 187.19, 190.33, 194.87, 214.73, 229.82, 277.14, 281.02, 287.8, 302.73, 309.21, 293.2, 290.9, 313.34, 304.36, 298.07], '1Y': [210.45, 216.39, 216.64, 186.25, 189.52, 185.91, 192.97, 195.94, 205.98, 195.74, 184.01, 180.3, 184.44, 180.39, 181.6, 175.27, 180.84, 166.91, 159.36, 159.73, 157.32, 161.77, 182.6, 181.67, 174.49, 177.13, 173.49, 188.45, 189.12, 193.31, 215.55, 221.44, 226.16, 219.86, 209.82, 196.2, 190.78, 187.19, 190.33, 199.42, 216.71, 233.7, 269.5, 280.89, 297.76, 300.6, 309.21, 293.2, 290.9, 313.34, 304.36, 298.07] },
      velocityScore: { '1D': -4, '1W': -7.7, '1M': -52.8, '6M': null }, isNew: false,
      marketCap: '$271B', pe: 51, revenueGrowth: 19, eps: 5.85, grossMargin: 57, dividendYield: null,
      etfPresence: { SOXX: 3.5, PSI: false, XSD: 2.24, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.7, proScore: 1.35, coverage: 0.5,
      price: 281.03, weeklyPrices: [294.06, 298.64, 277.02, 278.37, 281.03], weeklyChange: -4.43, dayChange: 0.96, sortRank: 0, periodReturns: { '1M': -12.5, 'YTD': 29.5, '6M': 27.8, '1Y': 27 },
      priceHistory: { '1D': [278.37, 279.19, 280.06, 282.46, 281.79, 279.98, 281.26, 280.48, 280.23, 280.4, 281.31, 281.03, 281.32, 280.63, 281.31, 281.25, 280.85, 280.76, 280.53, 281.83, 281.61, 280.86, 281.25, 281.03], '1W': [294.06, 298.64, 277.02, 278.37, 281.03], '1M': [311.38, 323.62, 321.88, 322.22, 295.96, 301.14, 297.41, 285.56, 302.55, 304.86, 315.88, 302.89, 298.2, 313.27, 323.24, 299.94, 294.06, 298.64, 277.02, 278.37, 281.03], 'YTD': [217.06, 237.89, 238.6, 232.48, 226.14, 224.32, 244.43, 232.27, 227.01, 201.74, 190.86, 191.37, 191.66, 197.08, 208, 221.34, 236.87, 290.76, 305.99, 291.5, 316.47, 311.38, 301.14, 315.88, 299.94, 281.03], '6M': [219.98, 239.34, 240.81, 236.75, 233.5, 222.13, 242.19, 232.27, 227.01, 201.74, 190.86, 191.37, 191.66, 194.55, 204.37, 216.03, 244.04, 295.24, 294.75, 291.5, 316.47, 311.38, 301.14, 315.88, 299.94, 281.03], '1Y': [221.21, 230.42, 220.58, 224.71, 220.94, 205.92, 220.05, 229.27, 237.82, 228.2, 219.28, 221.89, 227.66, 224.91, 225.64, 217.23, 222.34, 212.96, 204.42, 202.86, 188.59, 191.02, 227.56, 230.78, 223.23, 225.26, 217.06, 237.89, 238.6, 232.48, 226.14, 224.32, 244.43, 231.16, 224.76, 205.25, 190.86, 191.37, 191.66, 197.08, 208, 221.34, 236.87, 290.76, 305.99, 291.68, 316.47, 311.38, 301.14, 315.88, 299.94, 281.03] },
      velocityScore: { '1D': -3.6, '1W': -6.9, '1M': -35.1, '6M': null }, isNew: false,
      marketCap: '$71B', pe: 26.8, revenueGrowth: 12, eps: 10.47, grossMargin: 56, dividendYield: 1.46,
      etfPresence: { SOXX: 3.25, PSI: false, XSD: 2.16, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 2.51, proScore: 1.25, coverage: 0.5,
      price: 184.79, weeklyPrices: [197.41, 204.90, 189.39, 188.72, 184.79], weeklyChange: -6.39, dayChange: -2.08, sortRank: 0, periodReturns: { '1M': -26.4, 'YTD': 8, '6M': 6.4, '1Y': 15.9 },
      priceHistory: { '1D': [188.72, 189.38, 190.07, 192.4, 189.76, 188.24, 186.37, 185.95, 186.71, 187.56, 186.49, 186.16, 185.93, 184.76, 185.29, 185.98, 186.26, 186.24, 185.76, 185.85, 185.73, 185.5, 184.7, 184.79], '1W': [197.41, 204.9, 189.39, 188.72, 184.79], '1M': [228.99, 240.84, 250.01, 242.57, 215.94, 217.77, 205.42, 191.2, 202.96, 211.72, 220.81, 214.07, 212.97, 226.11, 221.9, 204.13, 197.41, 204.9, 189.39, 188.72, 184.79], 'YTD': [171.05, 181.87, 161.39, 155.82, 151.59, 137.34, 140.7, 142.88, 142.36, 135.69, 129.82, 129.9, 127.11, 125.73, 131.24, 137.52, 150.26, 168.38, 237.53, 201.49, 238.16, 228.99, 217.77, 220.81, 204.13, 184.79], '6M': [173.65, 180.19, 164.54, 157.8, 152.22, 136.3, 138.47, 142.88, 142.36, 135.69, 129.82, 129.9, 127.11, 126.8, 128.06, 136.2, 148.85, 177.01, 219.09, 201.49, 238.16, 228.99, 217.77, 220.81, 204.13, 184.79], '1Y': [159.4, 159.35, 154.07, 159.88, 159.06, 145.84, 153.73, 156.25, 159.17, 157.28, 158.95, 165.26, 173.55, 166.49, 167.77, 162.97, 168.83, 181.03, 172.84, 173.98, 165.06, 163.3, 175.07, 182.21, 172.34, 174.77, 171.05, 181.87, 161.39, 155.82, 151.59, 137.34, 140.7, 140.41, 141.03, 138.11, 129.82, 129.9, 127.11, 125.73, 131.24, 137.52, 150.26, 168.38, 237.53, 203.64, 238.16, 228.99, 217.77, 220.81, 204.13, 184.79] },
      velocityScore: { '1D': -3.8, '1W': -8.8, '1M': -50.4, '6M': null }, isNew: false,
      marketCap: '$195B', pe: 19.9, revenueGrowth: -4, eps: 9.3, grossMargin: 55, dividendYield: 1.95,
      etfPresence: { SOXX: 2.82, PSI: false, XSD: 2.19, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.43, proScore: 1.22, coverage: 0.5,
      price: 1382.36, weeklyPrices: [1434.95, 1438.30, 1313.32, 1312.77, 1382.36], weeklyChange: -3.66, dayChange: 5.3, sortRank: 0, periodReturns: { '1M': -11.7, 'YTD': 52.5, '6M': 49.6, '1Y': 85.1 },
      priceHistory: { '1D': [1312.77, 1366.4, 1357.89, 1361.41, 1373.28, 1365.43, 1360.14, 1359.28, 1352.92, 1347.58, 1348.99, 1345.21, 1348.16, 1345.22, 1346.8, 1358.8, 1363.9, 1369.69, 1379.17, 1383.74, 1383.71, 1380.03, 1384.35, 1382.36], '1W': [1434.95, 1438.3, 1313.32, 1312.77, 1382.36], '1M': [1542.39, 1624.99, 1689.89, 1652.6, 1481.05, 1559.18, 1531.98, 1473.04, 1589.55, 1577.32, 1652.29, 1498.77, 1448.21, 1563.7, 1537.88, 1423.76, 1434.95, 1438.3, 1313.32, 1312.77, 1382.36], 'YTD': [906.36, 959.09, 1009.54, 1063.74, 1124.15, 1229.82, 1171.47, 1204.1, 1142.74, 1023.16, 1052.59, 1068.85, 1053.01, 1180.03, 1372.23, 1490.86, 1587.57, 1573.3, 1661.1, 1550.02, 1589.81, 1542.39, 1559.18, 1652.29, 1423.76, 1382.36], '6M': [923.91, 959.08, 983.6, 1076.67, 1183.15, 1155.99, 1155.93, 1204.1, 1142.74, 1023.16, 1052.59, 1068.85, 1053.01, 1118.49, 1353.85, 1468.35, 1632.06, 1583.48, 1600.84, 1550.02, 1589.81, 1542.39, 1559.18, 1652.29, 1423.76, 1382.36], '1Y': [746.97, 751.14, 714.03, 720.01, 730.54, 805.85, 840.56, 844.8, 850.64, 827.56, 855.18, 877.66, 908.45, 915.87, 980.9, 1007.93, 1028.67, 1086.36, 957.87, 954.71, 856.96, 908.61, 958.02, 979.02, 912.25, 953.25, 906.36, 959.09, 1009.54, 1063.74, 1124.15, 1229.82, 1171.47, 1190.06, 1142.58, 1062, 1052.59, 1068.85, 1053.01, 1180.03, 1372.23, 1490.86, 1587.57, 1573.3, 1661.1, 1486.33, 1589.81, 1542.39, 1559.18, 1652.29, 1423.76, 1382.36] },
      velocityScore: { '1D': -3.9, '1W': -7.6, '1M': -37.8, '6M': null }, isNew: false,
      marketCap: '$68B', pe: 99.3, revenueGrowth: 26, eps: 13.92, grossMargin: 55, dividendYield: 0.61,
      etfPresence: { SOXX: 2.9, PSI: false, XSD: 1.97, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.23, proScore: 1.11, coverage: 0.5,
      price: 91.2, weeklyPrices: [92.48, 94.12, 87.93, 89.06, 91.20], weeklyChange: -1.38, dayChange: 2.4, sortRank: 0, periodReturns: { '1M': -3.6, 'YTD': 43.1, '6M': 41, '1Y': 27.2 },
      priceHistory: { '1D': [89.06, 89.25, 89.45, 90.74, 90.81, 90.43, 90.76, 90.75, 90.63, 90.54, 90.76, 90.95, 90.94, 90.82, 91.15, 91.36, 91.17, 91.32, 91.22, 91.35, 91.47, 91.18, 91.58, 91.2], '1W': [92.48, 94.12, 87.93, 89.06, 91.2], '1M': [91.52, 96.96, 96.55, 96.3, 88.34, 91.37, 91.47, 87.91, 92.94, 95.24, 100.32, 95.63, 94.11, 99.77, 102.71, 93.26, 92.48, 94.12, 87.93, 89.06, 91.2], 'YTD': [63.72, 73.53, 74.45, 74.71, 75.92, 76.01, 78.56, 77.73, 74.64, 64.77, 61.94, 62.97, 62, 67.22, 73.55, 80.39, 86.84, 95.3, 99.03, 93.85, 93.43, 91.52, 91.37, 100.32, 93.26, 91.2], '6M': [64.68, 73.94, 74.68, 75.47, 79.36, 78.04, 78.92, 77.73, 74.64, 64.77, 61.94, 62.97, 62, 65.6, 71.56, 78.76, 89.44, 93.95, 99.09, 93.85, 93.43, 91.52, 91.37, 100.32, 93.26, 91.2], '1Y': [71.68, 74.68, 74.43, 70.25, 70.29, 66.17, 64.5, 64.71, 67.62, 63.28, 64.74, 65.78, 65.85, 64.11, 66.92, 65.21, 67.52, 63.64, 59.5, 54.71, 50.87, 51.83, 63.61, 67.9, 63.99, 65.36, 63.72, 73.53, 74.45, 74.71, 75.92, 76.01, 78.56, 76.6, 74.31, 65, 61.94, 62.97, 62, 67.22, 73.55, 80.39, 86.84, 95.3, 99.03, 92.76, 93.43, 91.52, 91.37, 100.32, 93.26, 91.2] },
      velocityScore: { '1D': -2.6, '1W': -6.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$49B', pe: 414.5, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 2.04,
      etfPresence: { SOXX: 2.21, PSI: false, XSD: 2.25, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.1, proScore: 1.05, coverage: 0.5,
      price: 271.95, weeklyPrices: [268.99, 268.03, 238.00, 245.68, 271.95], weeklyChange: 1.1, dayChange: 10.69, sortRank: 0, periodReturns: { '1M': 15.2, 'YTD': 89, '6M': 87.7, '1Y': 210.5 },
      priceHistory: { '1D': [245.68, 256.64, 265.32, 268.52, 269.55, 268.25, 271.85, 271.41, 270.89, 273.58, 273.98, 272.96, 271.12, 268.67, 270, 269.4, 269.05, 271.04, 271.42, 271.76, 273.33, 273.92, 273.78, 271.95], '1W': [268.99, 268.03, 238, 245.68, 271.95], '1M': [226.1, 229, 214.6, 217.5, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95], 'YTD': [143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.06, 112.27, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 210.22, 172.17, 218.41, 226.1, 222.27, 259.41, 272.01, 271.95], '6M': [144.92, 141, 156.84, 135.1, 129.47, 98.06, 121.78, 124.06, 112.27, 109.83, 117.69, 103.4, 95.24, 101.45, 119.59, 160.69, 195.04, 184.38, 188.51, 172.17, 218.41, 226.1, 222.27, 259.41, 272.01, 271.95], '1Y': [87.59, 97.59, 101.19, 98.41, 116.01, 117.34, 125.38, 106.3, 120.1, 124.77, 163.96, 164.44, 149.38, 144.91, 148.87, 131.41, 144.17, 162.18, 164.23, 158.5, 139.56, 154.18, 189.19, 157.98, 134.13, 150.19, 143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.05, 114.22, 115.98, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 210.22, 156.27, 218.41, 226.1, 222.27, 259.41, 272.01, 271.95] },
      velocityScore: { '1D': 0, '1W': -11.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$51B', pe: 108.3, revenueGrowth: 157, eps: 2.51, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 1.9, PSI: false, XSD: 2.3, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 2, avgWeight: 1.76, proScore: 0.88, coverage: 0.5,
      price: 380.37, weeklyPrices: [373.08, 390.19, 369.18, 372.59, 380.37], weeklyChange: 1.95, dayChange: 2.09, sortRank: 0, periodReturns: { '1M': 4.3, 'YTD': 122.1, '6M': 117.5, '1Y': 176.9 },
      priceHistory: { '1D': [372.59, 375.26, 374.27, 378, 376.02, 371.27, 372.99, 369.44, 371.84, 370.69, 368.87, 371.08, 370.04, 370.85, 374.01, 374.76, 376.45, 378.35, 382.98, 385, 385.65, 385.69, 386.88, 380.37], '1W': [373.08, 390.19, 369.18, 372.59, 380.37], '1M': [353.79, 382.35, 390.34, 382.74, 345.4, 361.86, 358.72, 354.4, 374.76, 379.87, 384.77, 368.32, 367.11, 391.41, 396.26, 372.15, 373.08, 390.19, 369.18, 372.59, 380.37], 'YTD': [171.28, 167.66, 218.93, 219.26, 219.06, 235.87, 244.16, 243.59, 248.12, 207.51, 217.8, 218.96, 225.44, 233.04, 263.63, 281.08, 279.44, 291.72, 365.88, 375.6, 385.98, 353.79, 361.86, 384.77, 372.15, 380.37], '6M': [174.87, 170.62, 215.01, 224.29, 227.73, 227.8, 238.99, 243.59, 248.12, 207.51, 217.8, 218.96, 225.44, 238.3, 258.11, 276.97, 287.64, 284.18, 359.88, 375.6, 385.98, 353.79, 361.86, 384.77, 372.15, 380.37], '1Y': [137.38, 139.85, 137.76, 137.19, 140.02, 139.03, 125.45, 121, 128.33, 130.17, 131.7, 131.87, 126.66, 126.56, 133.19, 136.83, 139.41, 147.88, 144.13, 169.98, 158.22, 165.88, 183.46, 186.23, 168.31, 175.81, 171.28, 167.66, 218.93, 219.26, 219.06, 235.87, 244.16, 245.53, 258.54, 218.73, 217.8, 218.96, 225.44, 233.04, 263.63, 281.08, 279.44, 291.72, 365.88, 356.25, 385.98, 353.79, 361.86, 384.77, 372.15, 380.37] },
      velocityScore: { '1D': -3.3, '1W': 2.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$29B', pe: 161.9, revenueGrowth: 23, eps: 2.35, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: 1.2, PSI: false, XSD: 2.33, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 1.69, proScore: 0.85, coverage: 0.5,
      price: 94.54, weeklyPrices: [115.74, 118.74, 90.65, 88.57, 94.54], weeklyChange: -18.32, dayChange: 6.74, sortRank: 0, periodReturns: { '1M': -21.6, 'YTD': 74.6, '6M': 74.3, '1Y': 76.4 },
      priceHistory: { '1D': [88.57, 92.14, 93.57, 93.25, 93.77, 93.26, 92.9, 93.05, 93.46, 93.14, 93.35, 93.19, 93.43, 93.24, 93.72, 94.07, 94.26, 94.14, 94.7, 94.94, 95.06, 95, 94.74, 94.54], '1W': [115.74, 118.74, 90.65, 88.57, 94.54], '1M': [120.92, 128.64, 133.93, 131.82, 117.26, 120.9, 117, 110.17, 115.96, 116.79, 125.9, 118.25, 112.92, 121.62, 131.55, 117.06, 115.74, 118.74, 90.65, 88.57, 94.54], 'YTD': [54.15, 60.89, 60.28, 61.98, 59.89, 65.2, 72.21, 69.11, 66.48, 56.87, 58.55, 59.26, 58.35, 63.49, 71.02, 85.56, 98.04, 102.04, 107.24, 113.11, 116.2, 120.92, 120.9, 125.9, 117.06, 94.54], '6M': [54.24, 61.89, 60.58, 63.07, 62.2, 63.1, 70.63, 69.11, 66.48, 56.87, 58.55, 59.26, 58.35, 62.19, 68.65, 83.01, 98.4, 103.03, 103.2, 113.11, 116.2, 120.92, 120.9, 125.9, 117.06, 94.54], '1Y': [53.6, 57.77, 59.52, 59.61, 58.05, 46.98, 50.01, 49.77, 50.99, 47.79, 48.13, 49.8, 50.94, 48.35, 50.88, 50.36, 55.08, 51.8, 48.28, 48.43, 45.56, 48.31, 57.15, 55.1, 53.33, 55.08, 54.15, 60.89, 60.28, 61.98, 59.89, 65.2, 72.21, 69.47, 66.48, 59.23, 58.55, 59.26, 58.35, 63.49, 71.02, 85.56, 98.04, 102.04, 107.24, 109.43, 116.2, 120.92, 120.9, 125.9, 117.06, 94.54] },
      velocityScore: { '1D': -5.6, '1W': -26.7, '1M': -55.7, '6M': null }, isNew: false,
      marketCap: '$37B', pe: 69.5, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 1.61, PSI: false, XSD: 1.78, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'RMBS', name: 'RAMBUS INC', easyScore: 2, avgWeight: 1.3, proScore: 0.65, coverage: 0.5,
      price: 132.74, weeklyPrices: [124.52, 123.69, 114.73, 123.90, 132.74], weeklyChange: 6.6, dayChange: 7.13, sortRank: 0, periodReturns: { '1M': -8.7, 'YTD': 44.5, '6M': 40.2, '1Y': 107 },
      priceHistory: { '1D': [123.9, 124.01, 126.58, 126.44, 126.51, 125.79, 126.86, 126.29, 126.62, 125.76, 125.98, 126.15, 126.39, 126.01, 127.55, 128.57, 129.17, 129.37, 130.21, 131.36, 131.56, 132.93, 132.86, 132.74], '1W': [124.52, 123.69, 114.73, 123.9, 132.74], '1M': [147.48, 166.78, 170.66, 169.35, 145.31, 152.03, 146.84, 138.12, 144.47, 146.56, 143.29, 132.48, 130.1, 141.17, 140.35, 128.21, 124.52, 123.69, 114.73, 123.9, 132.74], 'YTD': [91.89, 91.34, 103.07, 115.31, 113.83, 107.1, 101.95, 102.64, 99.66, 88.12, 94.01, 91.7, 89.73, 92.22, 113.16, 126.87, 141.31, 111.5, 134.51, 127.05, 142.98, 147.48, 152.03, 143.29, 128.21, 132.74], '6M': [94.69, 91.65, 100.62, 124.77, 121.6, 98.1, 95.8, 102.64, 99.66, 88.12, 94.01, 91.7, 89.73, 93.03, 110.44, 126.93, 158.4, 111.93, 129.25, 127.05, 142.98, 147.48, 152.03, 143.29, 128.21, 132.74], '1Y': [64.14, 64.79, 66.79, 65.95, 75.09, 71.56, 76.44, 69.78, 75.03, 73.67, 77.11, 97.52, 100.73, 103.14, 99.43, 97.22, 97.51, 103.72, 100.32, 104.93, 87.7, 92.45, 98.03, 106.84, 90.61, 94.48, 91.89, 91.34, 103.07, 115.31, 113.83, 107.1, 101.95, 95.27, 98.88, 88.52, 94.01, 91.7, 89.73, 92.22, 113.16, 126.87, 141.31, 111.5, 134.51, 123.76, 142.98, 147.48, 152.03, 143.29, 128.21, 132.74] },
      velocityScore: { '1D': null, '1W': -4.4, '1M': null, '6M': null }, isNew: true,
      marketCap: '$14B', pe: 63.2, revenueGrowth: 8, eps: 2.1, grossMargin: 80, dividendYield: null,
      etfPresence: { SOXX: 0.62, PSI: false, XSD: 1.98, DRAM: false },
      tonyNote: 'RAMBUS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 5.87, proScore: 3.11, coverage: 0.529,
      price: 1154.29, weeklyPrices: [1048.51, 1213.56, 1132.33, 1145.28, 1154.29], weeklyChange: 10.09, dayChange: 0.79, sortRank: 0, periodReturns: { '1M': 18.9, 'YTD': 304.4, '6M': 294.5, '1Y': 854.8 },
      priceHistory: { '1D': [1145.28, 1137.42, 1149.3, 1146.01, 1149.25, 1139.53, 1146.65, 1140.91, 1142.63, 1151.48, 1164.49, 1152.45, 1151.84, 1158.84, 1156.51, 1155.3, 1151.51, 1148.42, 1151.06, 1156.78, 1168.13, 1161.09, 1165.2, 1154.29], '1W': [1048.51, 1213.56, 1132.33, 1145.28, 1154.29], '1M': [1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 724.66, 751, 1035.5, 949.28, 1087.99, 1051.77, 1154.29], '6M': [292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 1035.5, 949.28, 1087.99, 1051.77, 1154.29], '1Y': [120.89, 122.24, 116.43, 109.83, 114.74, 108.78, 127.75, 122.05, 116.5, 118.72, 140, 159.99, 161.71, 182.15, 196.54, 191.94, 202.29, 221.91, 218.03, 241.11, 228.5, 224.53, 234.16, 263.71, 225.52, 286.68, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 751, 1035.5, 949.28, 1087.99, 1051.77, 1154.29] },
      velocityScore: { '1D': 0, '1W': -0.6, '1M': 16.5, '6M': null }, isNew: false,
      marketCap: '$1.3T', pe: 26.1, revenueGrowth: 346, eps: 44.21, grossMargin: 73, dividendYield: null,
      etfPresence: { PTF: 4.31, WCLD: false, IGV: false, FDTX: 9.36, GTEK: false, ARKK: false, MARS: false, FRWD: 5.36, BCTK: 5.01, FWD: 1.35, CBSE: false, FCUS: 5.04, WGMI: false, CNEQ: 1.59, SGRT: 8.65, SPMO: 12.19, XMMO: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 9, avgWeight: 5.85, proScore: 3.1, coverage: 0.529,
      price: 200.09, weeklyPrices: [199.00, 195.74, 192.53, 194.97, 200.09], weeklyChange: 0.55, dayChange: 2.63, sortRank: 0, periodReturns: { '1M': -5.2, 'YTD': 7.3, '6M': 6.7, '1Y': 30.5 },
      priceHistory: { '1D': [194.97, 197.02, 198.54, 197.98, 197.76, 196.56, 198.29, 198.24, 198.05, 198.21, 198.34, 197.85, 198.23, 198.21, 198.21, 198.27, 198.48, 199.28, 198.23, 198.82, 198.89, 199.28, 199.03, 200.09], '1W': [199, 195.74, 192.53, 194.97, 200.09], '1M': [224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09], 'YTD': [186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 225.32, 215.33, 224.36, 208.64, 212.45, 200.04, 200.09], '6M': [187.54, 189.11, 183.14, 184.84, 192.51, 171.88, 186.94, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 225.32, 215.33, 224.36, 208.64, 212.45, 200.04, 200.09], '1Y': [153.3, 162.88, 171.37, 170.78, 179.27, 179.42, 183.16, 175.64, 181.77, 170.62, 177.33, 170.29, 176.97, 187.24, 189.11, 179.83, 181.16, 201.03, 198.69, 193.16, 181.36, 177.82, 179.59, 183.78, 170.94, 188.61, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 182.65, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 222.32, 215.33, 224.36, 208.64, 212.45, 200.04, 200.09] },
      velocityScore: { '1D': -0.6, '1W': -6.3, '1M': -30.2, '6M': null }, isNew: false,
      marketCap: '$4.8T', pe: 30.6, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: null,
      etfPresence: { PTF: 4.24, WCLD: false, IGV: false, FDTX: 4.62, GTEK: false, ARKK: 1.57, MARS: false, FRWD: 8.17, BCTK: 5.79, FWD: false, CBSE: false, FCUS: false, WGMI: 1.84, CNEQ: 12.93, SGRT: 5.98, SPMO: 7.51, XMMO: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 8, avgWeight: 3.68, proScore: 1.73, coverage: 0.471,
      price: 580.91, weeklyPrices: [519.74, 532.57, 521.58, 539.49, 580.91], weeklyChange: 11.77, dayChange: 7.68, sortRank: 0, periodReturns: { '1M': 12.6, 'YTD': 171.3, '6M': 169.8, '1Y': 326.8 },
      priceHistory: { '1D': [539.49, 552.14, 558.59, 558.03, 557.98, 557.03, 565.34, 565, 571.8, 575.15, 577.24, 576.66, 580.85, 580.12, 579.51, 578.81, 580.74, 579.23, 582.4, 582.44, 583.14, 583, 583.43, 580.91], '1W': [519.74, 532.57, 521.58, 539.49, 580.91], '1M': [510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 424.1, 467.51, 510.13, 490.33, 547.26, 519.85, 580.91], '6M': [215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 467.51, 510.13, 490.33, 547.26, 519.85, 580.91], '1Y': [136.11, 138.41, 160.08, 158.65, 179.51, 163.12, 174.95, 166.55, 166.62, 162.13, 159.54, 159.16, 160.88, 164.01, 235.56, 238.6, 238.03, 258.01, 250.05, 237.52, 230.29, 206.13, 217.6, 221.42, 198.11, 215.04, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 420.99, 467.51, 510.13, 490.33, 547.26, 519.85, 580.91] },
      velocityScore: { '1D': 0, '1W': 3.6, '1M': -11.3, '6M': null }, isNew: false,
      marketCap: '$947B', pe: 192.4, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.64, MARS: false, FRWD: 7.37, BCTK: 3.35, FWD: 2.17, CBSE: false, FCUS: 3.38, WGMI: false, CNEQ: 0.85, SGRT: 3.6, SPMO: 4.08, XMMO: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 7, avgWeight: 4.98, proScore: 2.05, coverage: 0.412,
      price: 638.72, weeklyPrices: [643.83, 675.39, 586.45, 651.88, 638.72], weeklyChange: -0.79, dayChange: -2.02, sortRank: 0, periodReturns: { '1M': 20.2, 'YTD': 270.8, '6M': 262.8, '1Y': 900.5 },
      priceHistory: { '1D': [651.88, 651.36, 659.09, 657.38, 661.01, 650.7, 647.63, 640.13, 641, 638.05, 642.48, 641.4, 639.4, 640.1, 635.56, 639.26, 640.74, 642.1, 641.15, 644.4, 639.59, 640.6, 638.99, 638.72], '1W': [643.83, 675.39, 586.45, 651.88, 638.72], '1M': [546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72], 'YTD': [172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 482.02, 484.28, 546.2, 526.93, 653.53, 670.75, 638.72], '6M': [176.06, 199.88, 215, 243.29, 278.41, 260.19, 284.1, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 294.97, 343.43, 372.52, 404, 431.52, 480, 482.02, 484.28, 546.2, 526.93, 653.53, 670.75, 638.72], '1Y': [63.84, 64.64, 66.53, 69.32, 71.43, 73.78, 75.91, 75.86, 79.71, 86, 95.02, 100.94, 109.69, 130.59, 121.18, 120.44, 121.41, 124.92, 152.18, 169.99, 152.86, 155.41, 155.59, 181.95, 166.26, 179.56, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 262.06, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 458.68, 484.28, 546.2, 526.93, 653.53, 670.75, 638.72] },
      velocityScore: { '1D': -0.5, '1W': -12.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$220B', pe: 38.3, revenueGrowth: 46, eps: 16.69, grossMargin: 45, dividendYield: null,
      etfPresence: { PTF: 4.34, WCLD: false, IGV: false, FDTX: 4, GTEK: false, ARKK: false, MARS: false, FRWD: 4.88, BCTK: false, FWD: false, CBSE: false, FCUS: 5.07, WGMI: false, CNEQ: 5.4, SGRT: 9.25, SPMO: 1.9, XMMO: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 7, avgWeight: 3.62, proScore: 1.49, coverage: 0.412,
      price: 377.75, weeklyPrices: [382.07, 378.91, 365.02, 372.45, 377.75], weeklyChange: -1.13, dayChange: 1.42, sortRank: 0, periodReturns: { '1M': -15.4, 'YTD': 9.1, '6M': 8, '1Y': 42.7 },
      priceHistory: { '1D': [372.45, 377.55, 377.92, 376.39, 376.77, 374.95, 375.26, 374.74, 375.22, 376.35, 376.24, 374.69, 375.89, 374.86, 374.56, 375.4, 375.5, 377.11, 377.39, 378.46, 379.05, 378.49, 378.45, 377.75], '1W': [382.07, 378.91, 365.02, 372.45, 377.75], '1M': [459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75], 'YTD': [346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 425.19, 414.14, 459.97, 396.6, 393.94, 380.15, 377.75], '6M': [349.85, 343.5, 339.89, 325.49, 330.73, 310.51, 331.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 425.19, 414.14, 459.97, 396.6, 393.94, 380.15, 377.75], '1Y': [264.74, 277.9, 280.81, 283.69, 302.62, 301.67, 312.83, 294.91, 298.01, 302.39, 369.57, 346.17, 339.31, 333.39, 345.5, 351.33, 342.66, 372.97, 351.94, 351.96, 340.5, 385.03, 380.61, 412.97, 326.02, 350.22, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 345.75, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 420.71, 414.14, 459.97, 396.6, 393.94, 380.15, 377.75] },
      velocityScore: { '1D': 0, '1W': 2.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 63, revenueGrowth: 48, eps: 6, grossMargin: 76, dividendYield: 0.7,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.79, GTEK: false, ARKK: 1.07, MARS: false, FRWD: 4.75, BCTK: 6.67, FWD: 1.83, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.18, SGRT: false, SPMO: 6.03, XMMO: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'SPCX', name: 'SPACE EXPLORATION TECHN-CL A', easyScore: 6, avgWeight: 7.13, proScore: 2.52, coverage: 0.353,
      price: 170.86, weeklyPrices: [154.54, 153.00, 153.23, 164.19, 170.86], weeklyChange: 10.56, dayChange: 4.06, sortRank: 0, periodReturns: { '1M': 6.2, 'YTD': 6.2, '6M': 6.2, '1Y': 6.2 },
      priceHistory: { '1D': [164.19, 162.24, 164.98, 164.96, 166.91, 167.61, 170.77, 171.26, 169.51, 171.01, 169.85, 170.55, 170.68, 169, 169.93, 169.99, 170.46, 169.73, 169.95, 169.91, 170.79, 171.24, 171.69, 170.86], '1W': [154.54, 153, 153.23, 164.19, 170.86], '1M': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86], 'YTD': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86], '6M': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86], '1Y': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86] },
      velocityScore: { '1D': -0.8, '1W': -0.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: null, revenueGrowth: 15, eps: -0.67, grossMargin: 49, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.17, MARS: 22.77, FRWD: 2.34, BCTK: 8.29, FWD: 1.71, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.48, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'SPACE EXPLORATION TECHN-CL A appears in 6 of 17 Broad Tech ETFs (35% coverage) with average weight 7.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 6, avgWeight: 4.68, proScore: 1.65, coverage: 0.353,
      price: 477.57, weeklyPrices: [440.83, 434.99, 432.35, 455.10, 477.57], weeklyChange: 8.33, dayChange: 4.94, sortRank: 0, periodReturns: { '1M': 14.1, 'YTD': 57.2, '6M': 59.4, '1Y': 112.6 },
      priceHistory: { '1D': [455.1, 460.21, 465.5, 468.53, 467.1, 465.8, 467.55, 468.61, 468.62, 468.91, 469.7, 468.33, 469.31, 469.97, 469.65, 470.93, 471.7, 471.54, 474.55, 474.67, 475.17, 475.1, 475.28, 477.57], '1W': [440.83, 434.99, 432.35, 455.1, 477.57], '1M': [435.63, 446.69, 436.69, 444.92, 415.17, 426.8, 427.92, 408.75, 421.07, 423.93, 441.4, 425.83, 432.15, 462.12, 467.67, 436.39, 440.83, 434.99, 432.35, 455.1, 477.57], 'YTD': [303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 370.54, 374.58, 338.89, 338.31, 329.24, 326.74, 341.76, 369.57, 366.24, 404.98, 401.61, 404.54, 404.35, 404.52, 435.63, 426.8, 441.4, 436.39, 477.57], '6M': [299.58, 318.68, 327.11, 327.37, 339.55, 330.73, 368.1, 370.54, 374.58, 338.89, 338.31, 329.24, 326.74, 339.04, 370.6, 370.5, 402.46, 397.67, 411.68, 404.35, 404.52, 435.63, 426.8, 441.4, 436.39, 477.57], '1Y': [224.68, 231.84, 237.56, 240.33, 242.91, 231.37, 244.29, 232.7, 238.72, 231.39, 260.44, 262.79, 280.71, 288.47, 304.52, 304.71, 294.51, 301.53, 294.05, 291.17, 277.91, 284.68, 295.45, 310.14, 276.96, 298.8, 303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 370.04, 369.11, 348.7, 338.31, 329.24, 326.74, 341.76, 369.57, 366.24, 404.98, 401.61, 404.54, 395.95, 404.52, 435.63, 426.8, 441.4, 436.39, 477.57] },
      velocityScore: { '1D': 0, '1W': -8.3, '1M': -13.6, '6M': null }, isNew: false,
      marketCap: '$2.5T', pe: 41.5, revenueGrowth: 35, eps: 11.51, grossMargin: 62, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6, GTEK: false, ARKK: 0.95, MARS: false, FRWD: 6, BCTK: 8.68, FWD: false, CBSE: false, FCUS: false, WGMI: 0.56, CNEQ: 5.92, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 6, avgWeight: 3.27, proScore: 1.15, coverage: 0.353,
      price: 238.34, weeklyPrices: [234.27, 227.01, 232.69, 240.14, 238.34], weeklyChange: 1.74, dayChange: -0.75, sortRank: 0, periodReturns: { '1M': -11.9, 'YTD': 3.3, '6M': 2.5, '1Y': 8.1 },
      priceHistory: { '1D': [240.14, 239.69, 238.84, 238.87, 240.15, 238.46, 238.38, 238.65, 238.89, 239.83, 239.24, 240.27, 240.92, 239.66, 239.07, 238.69, 238.82, 239.07, 237.97, 237.65, 238.37, 239.2, 237.61, 238.34], '1W': [234.27, 227.01, 232.69, 240.14, 238.34], '1M': [261.26, 256.52, 250.02, 253.79, 246.03, 245.22, 244.19, 238, 241.51, 238.55, 246.02, 246, 237.5, 244.39, 232.79, 234.11, 234.27, 227.01, 232.69, 240.14, 238.34], 'YTD': [230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 198.79, 210.11, 210, 213.21, 207.67, 205.37, 199.34, 212.79, 239.89, 248.28, 261.12, 272.05, 268.99, 264.14, 266.32, 261.26, 245.22, 246.02, 234.11, 238.34], '6M': [232.53, 241.56, 236.65, 234.34, 241.73, 222.69, 199.6, 210.11, 210, 213.21, 207.67, 205.37, 199.34, 209.77, 238.38, 250.56, 263.99, 268.26, 272.68, 264.14, 266.32, 261.26, 245.22, 246.02, 234.11, 238.34], '1Y': [220.46, 222.54, 223.19, 228.29, 230.19, 222.31, 221.47, 228.01, 228.71, 225.99, 230.33, 231.62, 220.21, 220.63, 225.22, 215.57, 222.03, 229.25, 249.32, 249.1, 222.55, 229.67, 232.38, 231.78, 221.27, 232.38, 230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 198.79, 205.27, 208.39, 213.49, 207.67, 205.37, 199.34, 212.79, 239.89, 248.28, 261.12, 272.05, 268.99, 264.86, 266.32, 261.26, 245.22, 246.02, 234.11, 238.34] },
      velocityScore: { '1D': 0, '1W': -4.2, '1M': -73.9, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 31.4, revenueGrowth: 17, eps: 7.59, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.01, GTEK: false, ARKK: 2.32, MARS: false, FRWD: 2.88, BCTK: 4.2, FWD: 1.46, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.73, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'LRCX', name: 'Lam Research Corp', easyScore: 5, avgWeight: 4.8, proScore: 1.41, coverage: 0.294,
      price: 433.33, weeklyPrices: [374.80, 401.82, 379.09, 410.91, 433.33], weeklyChange: 15.62, dayChange: 5.46, sortRank: 0, periodReturns: { '1M': 36.2, 'YTD': 153.1, '6M': 149.4, '1Y': 347.6 },
      priceHistory: { '1D': [410.91, 426.97, 432.6, 428.92, 432.38, 432, 432.61, 425.76, 426.49, 428.13, 427.66, 429.07, 430.16, 432.85, 433.67, 434.61, 433.85, 432.26, 433.34, 434.9, 434.72, 434.89, 436.32, 433.33], '1W': [374.8, 401.82, 379.09, 410.91, 433.33], '1M': [317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04, 409.54, 371.33, 374.8, 401.82, 379.09, 410.91, 433.33], 'YTD': [171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 244.92, 233.89, 199.33, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 258.57, 296.05, 284.72, 305.35, 317.12, 324.45, 388.92, 371.33, 433.33], '6M': [173.78, 203.08, 208.79, 220.7, 248.17, 213.31, 231.29, 244.92, 233.89, 199.33, 212.2, 228.36, 211.41, 218.44, 263.66, 267.6, 267.78, 256.72, 294.05, 284.72, 305.35, 317.12, 324.45, 388.92, 371.33, 433.33], '1Y': [96.81, 99.81, 100.37, 97.1, 99.09, 95.94, 105.28, 100.33, 103.63, 97.74, 107.36, 121.9, 128.32, 142.79, 142.54, 144.78, 145.04, 155.62, 155.78, 159.18, 143.24, 151.93, 159.75, 168.26, 154.98, 177.33, 171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 242.27, 231, 211.15, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 258.57, 296.05, 277.96, 305.35, 317.12, 324.45, 388.92, 371.33, 433.33] },
      velocityScore: { '1D': 1.4, '1W': 5.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$542B', pe: 81.8, revenueGrowth: 24, eps: 5.3, grossMargin: 50, dividendYield: 0.25,
      etfPresence: { PTF: 3.44, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 6.13, BCTK: 8.28, FWD: 2.02, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 4.11, XMMO: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 5, avgWeight: 4.46, proScore: 1.31, coverage: 0.294,
      price: 965, weeklyPrices: [993.25, 1025.36, 899.90, 968.53, 965.00], weeklyChange: -2.84, dayChange: -0.36, sortRank: 0, periodReturns: { '1M': 9.7, 'YTD': 250.4, '6M': 244.5, '1Y': 565.3 },
      priceHistory: { '1D': [968.53, 979.2, 990.08, 985.5, 993.84, 974.24, 965.55, 955.7, 954.22, 953.58, 952.71, 949.19, 943.35, 947.73, 944.7, 949.2, 951.99, 951, 949.24, 953.14, 951.13, 958.53, 963.74, 965], '1W': [993.25, 1025.36, 899.9, 968.53, 965], '1M': [921.26, 926.61, 940.69, 925.99, 847.47, 876.77, 846.01, 815.99, 868.09, 931.04, 1018.8, 1031.34, 1066.07, 1070.23, 1094.04, 1038.59, 993.25, 1025.36, 899.9, 968.53, 965], 'YTD': [275.39, 284.47, 320.32, 346.1, 407.69, 429.32, 425.99, 411.11, 407.84, 352.8, 383.71, 411.23, 380.07, 453.3, 513.28, 539.75, 595.86, 738.54, 834.01, 795.47, 812.73, 921.26, 876.77, 1018.8, 1038.59, 965], '6M': [280.08, 308.26, 312.28, 346.53, 446.57, 405.45, 431.17, 411.11, 407.84, 352.8, 383.71, 411.23, 380.07, 429.36, 503.13, 547.75, 586.25, 726.93, 782.64, 795.47, 812.73, 921.26, 876.77, 1018.8, 1038.59, 965], '1Y': [145.04, 142.01, 147.12, 152.76, 147.42, 147.27, 155.59, 157.93, 165.24, 176.32, 193.04, 213.36, 223.7, 256.84, 224.35, 219.38, 214.57, 223, 250.38, 288, 253.86, 261.89, 258.67, 298.92, 277.65, 285.27, 275.39, 284.47, 320.32, 346.1, 407.69, 429.32, 425.99, 407.4, 379.52, 374.33, 383.71, 411.23, 380.07, 453.3, 513.28, 539.75, 595.86, 738.54, 834.01, 740.84, 812.73, 921.26, 876.77, 1018.8, 1038.59, 965] },
      velocityScore: { '1D': -3.7, '1W': -11.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$218B', pe: 91.4, revenueGrowth: 44, eps: 10.56, grossMargin: 42, dividendYield: 0.31,
      etfPresence: { PTF: 3.94, WCLD: false, IGV: false, FDTX: 4.04, GTEK: false, ARKK: false, MARS: false, FRWD: 7.63, BCTK: false, FWD: false, CBSE: false, FCUS: 4.81, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.87, XMMO: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 5, avgWeight: 4.01, proScore: 1.18, coverage: 0.294,
      price: 353.33, weeklyPrices: [345.04, 342.19, 334.69, 351.28, 353.33], weeklyChange: 2.4, dayChange: 0.58, sortRank: 0, periodReturns: { '1M': -6.1, 'YTD': 12.6, '6M': 12.3, '1Y': 99.7 },
      priceHistory: { '1D': [351.28, 349.06, 349.99, 350.44, 351.96, 351.85, 352.07, 353.83, 353.44, 354.04, 354.56, 354.91, 354.25, 354.21, 352.76, 353.03, 352.86, 353.54, 353.65, 353.4, 353.86, 353.99, 354.38, 353.33], '1W': [345.04, 342.19, 334.69, 351.28, 353.33], '1M': [372.58, 358.39, 355.68, 369.27, 365.76, 361.17, 362.29, 353.32, 356.56, 358.16, 367.11, 371.1, 362.1, 367.46, 348.78, 346.08, 345.04, 342.19, 334.69, 351.28, 353.33], 'YTD': [313.8, 326.01, 333.16, 328.43, 338.53, 323.1, 306.02, 314.9, 311.43, 298.3, 301.46, 298.79, 273.76, 297.66, 319.21, 335.4, 348.52, 379.64, 386.77, 393.32, 379.38, 372.58, 361.17, 367.11, 346.08, 353.33], '6M': [314.55, 322.43, 336.31, 330.84, 338.66, 331.33, 309.37, 314.9, 311.43, 298.3, 301.46, 298.79, 273.76, 294.46, 315.72, 339.4, 342.32, 383.22, 397.05, 393.32, 379.38, 372.58, 361.17, 367.11, 346.08, 353.33], '1Y': [176.91, 177.66, 183.77, 191.51, 197.44, 196.92, 204.16, 202.49, 207.95, 231.1, 239.56, 249.85, 247.83, 245.54, 245.46, 251.71, 251.34, 268.43, 278.06, 291.74, 284.96, 323.64, 320.62, 321, 298.06, 315.67, 313.8, 326.01, 333.16, 328.43, 338.53, 323.1, 306.02, 311.69, 306.36, 306.01, 301.46, 298.79, 273.76, 297.66, 319.21, 335.4, 348.52, 379.64, 386.77, 393.11, 379.38, 372.58, 361.17, 367.11, 346.08, 353.33] },
      velocityScore: { '1D': 0.9, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.3T', pe: 27, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.66, GTEK: false, ARKK: 1.83, MARS: false, FRWD: false, BCTK: 5.54, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 5.71, SGRT: false, SPMO: 3.3, XMMO: false },
      tonyNote: 'Alphabet Inc Class C appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 4.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRWD', name: 'CrowdStrike', easyScore: 5, avgWeight: 2.63, proScore: 0.77, coverage: 0.294,
      price: 763.14, weeklyPrices: [673.02, 678.65, 701.09, 742.91, 763.14], weeklyChange: 13.39, dayChange: 2.72, sortRank: 0, periodReturns: { '1M': 4.4, 'YTD': 62.8, '6M': 60.4, '1Y': 55.1 },
      priceHistory: { '1D': [742.91, 753.8, 759.2, 754.2, 757.2, 755.08, 758.65, 764.74, 760.9, 762.23, 759.44, 762.21, 764.76, 762.34, 764.91, 758.7, 758.74, 759.73, 761.07, 763.56, 764.71, 761.31, 762.67, 763.14], '1W': [673.02, 678.65, 701.09, 742.91, 763.14], '1M': [782.17, 768.95, 747.61, 719.09, 671.02, 658.79, 644.93, 647.74, 691.53, 682.8, 692.91, 679.49, 682.96, 684.86, 675.44, 680.92, 673.02, 678.65, 701.09, 742.91, 763.14], 'YTD': [468.76, 463.87, 455, 452.49, 441.4, 395.5, 429.64, 388.6, 371.98, 428.99, 441.78, 409, 369.58, 398.61, 402.24, 433.15, 454.61, 469.24, 542.26, 594.08, 663.46, 782.17, 658.79, 692.91, 680.92, 763.14], '6M': [475.63, 478.91, 460.7, 453.77, 444.62, 377.16, 411.54, 388.6, 371.98, 428.99, 441.78, 409, 369.58, 399.12, 379.02, 423.95, 448.13, 455.64, 527.77, 594.08, 663.46, 782.17, 658.79, 692.91, 680.92, 763.14], '1Y': [492.07, 513.51, 470.45, 461.52, 463.15, 451.69, 435.8, 418.6, 417.6, 413.2, 424.87, 445.5, 476.33, 499.96, 509.95, 489.02, 503.95, 546.94, 533.92, 556.73, 513.67, 512.34, 524.17, 519.54, 470.02, 477.11, 468.76, 463.87, 455, 452.49, 441.4, 395.5, 429.64, 350.33, 384.86, 434.13, 441.78, 409, 369.58, 398.61, 402.24, 433.15, 454.61, 469.24, 542.26, 618.83, 663.46, 782.17, 658.79, 692.91, 680.92, 763.14] },
      velocityScore: { '1D': 1.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$194B', pe: null, revenueGrowth: 26, eps: -0.15, grossMargin: 75, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.5, IGV: 7.14, FDTX: 1.24, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 1.2, FWD: 1.09, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'CrowdStrike appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 2.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, avgWeight: 5.15, proScore: 1.21, coverage: 0.235,
      price: 373.02, weeklyPrices: [365.46, 352.83, 372.97, 368.57, 373.02], weeklyChange: 2.07, dayChange: 1.21, sortRank: 0, periodReturns: { '1M': -17.2, 'YTD': -22.9, '6M': -23.5, '1Y': -24.2 },
      priceHistory: { '1D': [368.57, 370.02, 371.86, 372.08, 371.67, 370.37, 369.6, 370.59, 370.13, 371.32, 370.57, 370.76, 373.15, 370.83, 371.37, 370.75, 371.02, 370.86, 370.55, 370.56, 371.3, 371.2, 371.46, 373.02], '1W': [365.46, 352.83, 372.97, 368.57, 373.02], '1M': [460.52, 441.31, 427.34, 428.05, 416.67, 411.74, 403.41, 397.36, 390.34, 390.74, 399.76, 393.83, 378.91, 379.4, 367.34, 373.94, 365.46, 352.83, 372.97, 368.57, 373.02], 'YTD': [483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 397.23, 392.74, 408.96, 395.55, 381.87, 356.77, 372.88, 384.37, 418.07, 424.82, 413.62, 412.66, 421.92, 418.57, 460.52, 411.74, 399.76, 373.94, 373.02], '6M': [487.48, 483.47, 459.38, 451.14, 433.5, 393.67, 401.84, 397.23, 392.74, 408.96, 395.55, 381.87, 356.77, 373.46, 370.87, 422.79, 424.62, 414.44, 415.12, 421.92, 418.57, 460.52, 411.74, 399.76, 373.94, 373.02], '1Y': [492.05, 503.51, 505.62, 505.87, 513.24, 524.94, 529.24, 509.77, 502.04, 505.35, 500.37, 510.02, 510.15, 519.71, 524.85, 513.43, 517.66, 542.07, 514.33, 508.68, 493.79, 476.99, 477.73, 478.56, 476.12, 488.02, 483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 384.47, 398.55, 409.41, 395.55, 381.87, 356.77, 372.88, 384.37, 418.07, 424.82, 413.62, 412.66, 423.54, 418.57, 460.52, 411.74, 399.76, 373.94, 373.02] },
      velocityScore: { '1D': -2.4, '1W': -1.6, '1M': -77.5, '6M': null }, isNew: false,
      marketCap: '$2.8T', pe: 22.2, revenueGrowth: 18, eps: 16.81, grossMargin: 68, dividendYield: 0.99,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.03, FDTX: 3.79, GTEK: false, ARKK: false, MARS: false, FRWD: 2.95, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 5.83, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks', easyScore: 4, avgWeight: 4.45, proScore: 1.05, coverage: 0.235,
      price: 341.02, weeklyPrices: [285.26, 293.09, 304.20, 332.00, 341.02], weeklyChange: 19.55, dayChange: 2.72, sortRank: 0, periodReturns: { '1M': 21.1, 'YTD': 85.1, '6M': 82.5, '1Y': 72.6 },
      priceHistory: { '1D': [332, 337.61, 339.48, 337.71, 338.8, 336.4, 337.64, 338.51, 338.05, 339, 337.64, 339.43, 339.95, 338.96, 341.84, 339.36, 340.5, 339.61, 340.26, 340.52, 341.61, 340.67, 341.3, 341.02], '1W': [285.26, 293.09, 304.2, 332, 341.02], '1M': [300.48, 297.18, 280.43, 279.25, 272.05, 266.33, 260.52, 263.22, 279.53, 279.62, 284.54, 279.9, 282.13, 287.78, 286.4, 290.92, 285.26, 293.09, 304.2, 332, 341.02], 'YTD': [184.2, 190.8, 187.73, 180.18, 176.97, 159.32, 166.95, 148.7, 148.92, 165.05, 167.02, 162.95, 147.02, 161.95, 162.51, 169.56, 182.9, 184.56, 213.66, 242.83, 260.58, 300.48, 266.33, 284.54, 290.92, 341.02], '6M': [186.85, 193.9, 190.93, 182.27, 176.2, 154.77, 162.81, 148.7, 148.92, 165.05, 167.02, 162.95, 147.02, 163.21, 155.73, 167.85, 178.54, 181.08, 207.88, 242.83, 260.58, 300.48, 266.33, 284.54, 290.92, 341.02], '1Y': [197.58, 206.06, 192.59, 199.22, 183.03, 172.89, 175.4, 181.56, 184.23, 191.53, 197.33, 203.12, 200.7, 206.8, 217.79, 206.7, 214.4, 221.38, 214.52, 218.27, 201, 186.27, 193.63, 192.96, 183.44, 187.22, 184.2, 190.8, 187.73, 180.18, 176.97, 159.32, 166.95, 144.14, 150.15, 165.1, 167.02, 162.95, 147.02, 161.95, 162.51, 169.56, 182.9, 184.56, 213.66, 247.55, 260.58, 300.48, 266.33, 284.54, 290.92, 341.02] },
      velocityScore: { '1D': 4, '1W': 8.2, '1M': -59.6, '6M': null }, isNew: false,
      marketCap: '$278B', pe: 294, revenueGrowth: 31, eps: 1.16, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.83, IGV: 10.17, FDTX: 3.67, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.14, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 4, avgWeight: 4.34, proScore: 1.02, coverage: 0.235,
      price: 2273.73, weeklyPrices: [1914.46, 2335.00, 2090.71, 2050.39, 2273.73], weeklyChange: 18.77, dayChange: 10.89, sortRank: 0, periodReturns: { '1M': 34.1, 'YTD': 857.8, '6M': 846.5, '1Y': 4957.2 },
      priceHistory: { '1D': [2050.39, 2130.98, 2157.79, 2154, 2204.2, 2175, 2195.4, 2193, 2184.3, 2198.88, 2206, 2201.78, 2203.98, 2202.5, 2206.75, 2237.02, 2235.29, 2245.56, 2249, 2256.5, 2258.56, 2256.79, 2263.51, 2273.73], '1W': [1914.46, 2335, 2090.71, 2050.39, 2273.73], '1M': [1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73], 'YTD': [237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 649.97, 635.36, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1407.61, 1478.69, 1761.43, 1642, 2107.86, 1963.6, 2273.73], '6M': [240.22, 353.56, 387.81, 503.44, 539.3, 576.2, 630.29, 649.97, 635.36, 527.33, 661.62, 709.71, 615.83, 701.59, 851.77, 920.99, 989.9, 1187, 1562.34, 1407.61, 1478.69, 1761.43, 1642, 2107.86, 1963.6, 2273.73], '1Y': [44.96, 46.2, 41.36, 43, 43.39, 42.1, 46.83, 44.58, 47.35, 53.01, 73.92, 93.97, 99.83, 121.12, 131.88, 144.3, 149.29, 175.53, 194.57, 271.58, 244.93, 220.5, 194.38, 232.86, 206.83, 250.08, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 588.73, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1333.01, 1478.69, 1761.43, 1642, 2107.86, 1963.6, 2273.73] },
      velocityScore: { '1D': -11.3, '1W': -10.5, '1M': -62.1, '6M': null }, isNew: false,
      marketCap: '$337B', pe: 77.5, revenueGrowth: 251, eps: 29.32, grossMargin: 56, dividendYield: null,
      etfPresence: { PTF: 7.06, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.58, CBSE: false, FCUS: 5.75, WGMI: false, CNEQ: false, SGRT: false, SPMO: 2.96, XMMO: false },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC-CL A', easyScore: 4, avgWeight: 2.33, proScore: 0.55, coverage: 0.235,
      price: 357.37, weeklyPrices: [345.29, 343.71, 337.39, 353.65, 357.37], weeklyChange: 3.5, dayChange: 1.05, sortRank: 0, periodReturns: { '1M': -6, 'YTD': 14.2, '6M': 13.9, '1Y': 103.2 },
      priceHistory: { '1D': [353.65, 351.32, 352.3, 352.71, 354.45, 354.25, 354.73, 356.6, 356.38, 357.13, 357.52, 358.08, 357.51, 357.46, 356.08, 356.03, 356.2, 357.02, 356.9, 356.67, 356.98, 357.12, 357.58, 357.37], '1W': [345.29, 343.71, 337.39, 353.65, 357.37], '1M': [376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68, 369.35, 373.25, 363.79, 368.03, 349.68, 346.13, 345.29, 343.71, 337.39, 353.65, 357.37], 'YTD': [313, 325.44, 332.78, 327.93, 338, 322.86, 305.72, 314.98, 311.76, 298.52, 302.28, 301, 274.34, 299.99, 321.31, 337.42, 350.34, 383.25, 388.64, 396.78, 382.97, 376.37, 363.31, 369.35, 346.13, 357.37], '6M': [313.85, 321.98, 335.84, 330.54, 338.25, 331.25, 309, 314.98, 311.76, 298.52, 302.28, 301, 274.34, 295.77, 317.24, 341.68, 344.4, 385.69, 400.8, 396.78, 382.97, 376.37, 363.31, 369.35, 346.13, 357.37], '1Y': [175.84, 176.62, 182.97, 190.23, 196.53, 196.09, 203.34, 201.57, 207.14, 230.66, 239.17, 249.53, 247.14, 244.9, 244.62, 251.03, 250.46, 267.47, 277.54, 291.31, 284.28, 323.44, 319.63, 320.21, 296.72, 314.09, 313, 325.44, 332.78, 327.93, 338, 322.86, 305.72, 311.49, 306.52, 306.36, 302.28, 301, 274.34, 299.99, 321.31, 337.42, 350.34, 383.25, 388.64, 396.94, 382.97, 376.37, 363.31, 369.35, 346.13, 357.37] },
      velocityScore: { '1D': 0, '1W': -6.8, '1M': -89.1, '6M': null }, isNew: false,
      marketCap: '$4.4T', pe: 27.2, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 0.48, MARS: false, FRWD: 3.17, BCTK: false, FWD: 1.53, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 4.16, XMMO: false },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 3, avgWeight: 5.28, proScore: 0.93, coverage: 0.176,
      price: 420.6, weeklyPrices: [375.53, 375.12, 379.71, 411.84, 420.60], weeklyChange: 12, dayChange: 2.13, sortRank: 0, periodReturns: { '1M': -3.5, 'YTD': -6.5, '6M': -7.4, '1Y': 39.9 },
      priceHistory: { '1D': [411.84, 409.23, 413.03, 415.54, 415.32, 413.63, 413.32, 415.46, 416.29, 416.48, 416.41, 417.71, 417.84, 418.67, 418.26, 416.36, 418.09, 419.38, 419.28, 420.21, 424, 423.46, 421.78, 420.6], '1W': [375.53, 375.12, 379.71, 411.84, 420.6], '1M': [415.88, 423.74, 423.7, 418.45, 391, 408.95, 396.68, 381.59, 399.15, 406.43, 411.15, 404.66, 396.38, 400.49, 405.05, 381.61, 375.53, 375.12, 379.71, 411.84, 420.6], 'YTD': [449.72, 435.8, 438.57, 449.06, 430.41, 411.11, 417.44, 411.82, 402.51, 396.73, 391.2, 367.96, 361.83, 352.82, 352.42, 392.5, 378.67, 392.51, 445, 422.24, 426.01, 415.88, 408.95, 411.15, 381.61, 420.6], '6M': [454.43, 431.41, 439.2, 449.36, 416.56, 397.21, 417.07, 411.82, 402.51, 396.73, 391.2, 367.96, 361.83, 360.59, 348.95, 400.62, 376.3, 390.82, 428.35, 422.24, 426.01, 415.88, 408.95, 411.15, 381.61, 420.6], '1Y': [300.71, 295.88, 321.67, 332.56, 319.04, 319.91, 340.84, 329.31, 351.67, 334.09, 347.79, 425.86, 442.79, 459.46, 438.69, 435.15, 442.6, 460.55, 444.26, 439.62, 401.25, 419.4, 446.74, 451.45, 467.26, 485.4, 449.72, 435.8, 438.57, 449.06, 430.41, 411.11, 417.44, 399.83, 403.32, 398.68, 391.2, 367.96, 361.83, 352.82, 352.42, 392.5, 378.67, 392.51, 445, 409.99, 426.01, 415.88, 408.95, 411.15, 381.61, 420.6] },
      velocityScore: { '1D': 1.1, '1W': -2.1, '1M': -84.9, '6M': null }, isNew: false,
      marketCap: '$1.6T', pe: 393.1, revenueGrowth: 16, eps: 1.07, grossMargin: 19, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 9.54, MARS: false, FRWD: false, BCTK: 3.14, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.15, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
    {
      ticker: 'DELL', name: 'DELL', easyScore: 3, avgWeight: 4.58, proScore: 0.81, coverage: 0.176,
      price: 431.46, weeklyPrices: [434.06, 409.45, 399.49, 414.61, 431.46], weeklyChange: -0.6, dayChange: 4.06, sortRank: 0, periodReturns: { '1M': 2.5, 'YTD': 242.8, '6M': 237.3, '1Y': 254.4 },
      priceHistory: { '1D': [414.61, 420.59, 425.93, 430.93, 431.67, 430.98, 429.99, 424.26, 422.65, 421.48, 422.69, 422.4, 424.98, 424.34, 426.06, 427.93, 426.73, 428.14, 430.19, 429.23, 427.21, 427.95, 428.49, 431.46], '1W': [434.06, 409.45, 399.49, 414.61, 431.46], '1M': [465.96, 435.31, 421.08, 422.05, 394.39, 400.77, 381.78, 369.83, 391.45, 395.57, 409.07, 404.08, 419.32, 409.5, 418.71, 427.78, 434.06, 409.45, 399.49, 414.61, 431.46], 'YTD': [125.88, 118.5, 119.66, 115.43, 114.44, 121.05, 117.49, 122.27, 148.08, 146.48, 151.62, 157.67, 171.81, 173.18, 189.79, 204.24, 215.97, 211.64, 247.04, 241.99, 295.19, 465.96, 400.77, 409.07, 427.78, 431.46], '6M': [127.92, 120.07, 118.69, 117.17, 118.49, 115.39, 112.82, 122.27, 148.08, 146.48, 151.62, 157.67, 171.81, 174.37, 177.8, 196.55, 216.09, 210.17, 260.46, 241.99, 295.19, 465.96, 400.77, 409.07, 427.78, 431.46], '1Y': [121.73, 126.63, 123.57, 127.22, 133.54, 128.14, 141.64, 135.2, 130.99, 124.02, 124.45, 130.34, 132.09, 149.68, 164.53, 153.7, 149.43, 164.88, 154.64, 138.76, 122.69, 125.92, 133.63, 140.63, 127.89, 128.38, 125.88, 118.5, 119.66, 115.43, 114.44, 121.05, 117.49, 119.14, 153.55, 146.51, 151.62, 157.67, 171.81, 173.18, 189.79, 204.24, 215.97, 211.64, 247.04, 238.03, 295.19, 465.96, 400.77, 409.07, 427.78, 431.46] },
      velocityScore: { '1D': -3.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$279B', pe: 34.4, revenueGrowth: 88, eps: 12.56, grossMargin: 19, dividendYield: 0.61,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: 2.91, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: 4.38, WGMI: false, CNEQ: false, SGRT: 6.44, SPMO: false, XMMO: false },
      tonyNote: 'DELL appears in 3 of 17 Broad Tech ETFs (18% coverage) with average weight 4.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LITE', name: 'Lumentum Holdings Inc', easyScore: 3, avgWeight: 4.37, proScore: 0.77, coverage: 0.176,
      price: 858.06, weeklyPrices: [842.53, 861.97, 816.98, 851.40, 858.06], weeklyChange: 1.84, dayChange: 0.78, sortRank: 0, periodReturns: { '1M': 0.4, 'YTD': 132.8, '6M': 131.2, '1Y': 837.9 },
      priceHistory: { '1D': [851.4, 845.55, 855.73, 856.96, 854.67, 847.22, 851.89, 847.45, 855.73, 856.73, 855.32, 855.25, 850.6, 851, 854.4, 860.36, 865.31, 866.02, 871.88, 869.77, 865.74, 862.09, 862.44, 858.06], '1W': [842.53, 861.97, 816.98, 851.4, 858.06], '1M': [905, 1029.15, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93, 827.92, 842.53, 861.97, 816.98, 851.4, 858.06], 'YTD': [368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 667.77, 700.91, 558.44, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 1053.09, 970.7, 946.9, 905, 895.4, 957.24, 827.92, 858.06], '6M': [371.18, 392.88, 331.62, 354.49, 381.44, 504.42, 583.46, 667.77, 700.91, 558.44, 622.5, 706.35, 702.73, 826.88, 897.3, 894.07, 881.64, 949.93, 903.8, 970.7, 946.9, 905, 895.4, 957.24, 827.92, 858.06], '1Y': [91.49, 90.44, 99.63, 102.13, 109.85, 110.01, 119.66, 117.96, 124.62, 134.12, 164.88, 163.34, 152.75, 171.4, 163.09, 156.57, 162.95, 198.39, 188.36, 252.47, 247.43, 291.27, 302.98, 366, 320.25, 395.92, 368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 674.73, 783.25, 640.69, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 1053.09, 884.98, 946.9, 905, 895.4, 957.24, 827.92, 858.06] },
      velocityScore: { '1D': 1.3, '1W': -13.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$67B', pe: 150.5, revenueGrowth: 90, eps: 5.7, grossMargin: 41, dividendYield: null,
      etfPresence: { PTF: 3.84, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 1.4, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: 7.88, SPMO: false, XMMO: false },
      tonyNote: 'Lumentum Holdings Inc appears in 3 of 17 Broad Tech ETFs (18% coverage) with average weight 4.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 3, avgWeight: 4.37, proScore: 0.77, coverage: 0.176,
      price: 116.67, weeklyPrices: [113.50, 107.27, 112.93, 115.70, 116.67], weeklyChange: 2.79, dayChange: 0.84, sortRank: 0, periodReturns: { '1M': -25.5, 'YTD': -34.4, '6M': -35.5, '1Y': -10.7 },
      priceHistory: { '1D': [115.7, 115.81, 115.94, 115.62, 115.76, 115.07, 115.77, 117.64, 117.02, 116.99, 117.67, 117.71, 118.52, 118.27, 118.22, 117.75, 117.53, 117.67, 117.42, 117.3, 117.17, 116.89, 116.67, 116.67], '1W': [113.5, 107.27, 112.93, 115.7, 116.67], '1M': [160.65, 152.17, 142.2, 141.7, 135.53, 136.47, 132.07, 130.21, 131.08, 127.99, 134.71, 133.25, 130.63, 128.47, 119.5, 116.7, 113.5, 107.27, 112.93, 115.7, 116.67], 'YTD': [177.75, 176.86, 177.07, 169.6, 146.59, 135.9, 131.41, 135.24, 137.19, 157.16, 150.95, 150.68, 143.06, 147.93, 132.37, 145.89, 143.1, 146.03, 136.89, 133.99, 136.88, 160.65, 136.47, 134.71, 116.7, 116.67], '6M': [180.84, 181.68, 178.4, 165.9, 151.86, 130.01, 129.13, 135.24, 137.19, 157.16, 150.95, 150.68, 143.06, 148.46, 128.06, 146.39, 143.09, 144.07, 137.8, 133.99, 136.88, 160.65, 136.47, 134.71, 116.7, 116.67], '1Y': [130.68, 143.13, 150.91, 154.63, 158.61, 179.54, 186.97, 157.75, 160.87, 154.9, 166.74, 168.33, 179.56, 184.95, 183.56, 179.62, 181.51, 189.6, 190.74, 190.96, 167.33, 163.55, 176.08, 187.91, 177.29, 194.17, 177.75, 176.86, 177.07, 169.6, 146.59, 135.9, 131.41, 130.6, 145.17, 156.43, 150.95, 150.68, 143.06, 147.93, 132.37, 145.89, 143.1, 146.03, 136.89, 135.14, 136.88, 160.65, 136.47, 134.71, 116.7, 116.67] },
      velocityScore: { '1D': 0, '1W': -10.5, '1M': -72.5, '6M': null }, isNew: false,
      marketCap: '$280B', pe: 131.1, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 7.69, FDTX: 2.87, GTEK: false, ARKK: 2.56, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'BE', name: 'Bloom Energy Corp', easyScore: 4, avgWeight: 3.19, proScore: 2.55, coverage: 0.8,
      price: 302.7, weeklyPrices: [326.19, 309.18, 252.02, 275.01, 302.70], weeklyChange: -7.2, dayChange: 10.07, sortRank: 0, periodReturns: { '1M': 6.2, 'YTD': 248.4, '6M': 246.9, '1Y': 1267.8 },
      priceHistory: { '1D': [275.01, 289.14, 297.22, 293.76, 294.84, 292.3, 291.5, 291.94, 292.41, 294.24, 294.67, 300.92, 305.78, 303.12, 304, 304.99, 307.26, 306.11, 305.74, 305.24, 305.06, 304.14, 302.59, 302.7], '1W': [326.19, 309.18, 252.02, 275.01, 302.7], '1M': [273.51, 302.85, 287.32, 291.37, 263.61, 253.57, 259.61, 234.23, 248.88, 260.22, 274.5, 280.88, 284.99, 328.91, 345.85, 321.98, 326.19, 309.18, 252.02, 275.01, 302.7], 'YTD': [86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 147.55, 155.67, 135.19, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 288.64, 283.92, 275.95, 302.49, 273.51, 253.57, 274.5, 321.98, 302.7], '6M': [87.26, 108, 133.46, 145.63, 156.51, 136.6, 139.03, 147.55, 155.67, 135.19, 154.51, 150.12, 133.24, 135.63, 166.7, 207.86, 231.17, 290.52, 261.03, 275.95, 302.49, 273.51, 253.57, 274.5, 321.98, 302.7], '1Y': [22.13, 28.71, 24.69, 26.89, 37.62, 38.86, 41.25, 43.1, 49.94, 52.45, 62.96, 79.67, 69.18, 90.19, 87.58, 116.58, 104.38, 113.28, 129.05, 127.07, 104.97, 94.29, 102.5, 101.29, 76.97, 91.88, 86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 160.28, 166, 151.32, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 288.64, 283.92, 258.71, 302.49, 273.51, 253.57, 274.5, 321.98, 302.7] },
      velocityScore: { '1D': 7.6, '1W': -4.5, '1M': 9.4, '6M': null }, isNew: false,
      marketCap: '$86B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: 1.57, VOLT: 3.83, PBD: false, PBW: 2.35, IVEP: 5.02 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 3, avgWeight: 4.92, proScore: 2.95, coverage: 0.6,
      price: 720.04, weeklyPrices: [701.88, 718.59, 687.87, 714.45, 720.04], weeklyChange: 2.59, dayChange: 0.78, sortRank: 0, periodReturns: { '1M': 1.2, 'YTD': 70.6, '6M': 67.9, '1Y': 93.4 },
      priceHistory: { '1D': [714.45, 711.21, 717.01, 709.11, 711.76, 714.34, 712.12, 714.21, 712.83, 710.39, 708.74, 711.32, 709.36, 709.75, 708.61, 709.85, 710.83, 712.09, 713.72, 712.48, 714.51, 714.48, 718.06, 720.04], '1W': [701.88, 718.59, 687.87, 714.45, 720.04], '1M': [687.48, 706.06, 715.67, 719.17, 695.11, 693.81, 691.95, 650.92, 683.29, 707.74, 724.35, 719.29, 714.85, 702.25, 740.14, 702.29, 701.88, 718.59, 687.87, 714.45, 720.04], 'YTD': [422.06, 413.17, 447.64, 468.76, 474.63, 508.11, 524.08, 552.66, 563.08, 540.19, 559.02, 555.39, 549.98, 554.38, 595.84, 604.97, 637.28, 757.34, 781.38, 769.99, 723.44, 687.48, 693.81, 724.35, 702.29, 720.04], '6M': [428.81, 436.89, 437.07, 468.78, 483.43, 477.72, 515.88, 552.66, 563.08, 540.19, 559.02, 555.39, 549.98, 560.63, 585.36, 601.88, 624.84, 742.21, 745, 769.99, 723.44, 687.48, 693.81, 724.35, 702.29, 720.04], '1Y': [372.29, 382.12, 389.12, 405.11, 411.11, 387.5, 391.57, 379.27, 383.92, 374.41, 390.17, 376.01, 402.87, 420.65, 443.45, 436.93, 437.43, 439.57, 438.66, 448.91, 439.29, 450.14, 456.02, 462.21, 414.25, 433.58, 422.06, 413.17, 447.64, 468.76, 474.63, 508.11, 524.08, 549.11, 572.66, 568.04, 559.02, 555.39, 549.98, 554.38, 595.84, 604.97, 637.28, 757.34, 781.38, 723.03, 723.44, 687.48, 693.81, 724.35, 702.29, 720.04] },
      velocityScore: { '1D': 2.4, '1W': 3.1, '1M': -18.7, '6M': null }, isNew: false,
      marketCap: '$108B', pe: 98.8, revenueGrowth: 26, eps: 7.29, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 5.02, VOLT: 5.36, PBD: false, PBW: false, IVEP: 4.39 },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 3, avgWeight: 4.51, proScore: 2.71, coverage: 0.6,
      price: 286.36, weeklyPrices: [294.49, 309.20, 279.77, 281.09, 286.36], weeklyChange: -2.76, dayChange: 1.87, sortRank: 0, periodReturns: { '1M': 0.7, 'YTD': 169.5, '6M': 162.3, '1Y': 309 },
      priceHistory: { '1D': [281.09, 285.2, 287.14, 284.16, 284.33, 284.11, 285.64, 283.98, 281.73, 279.48, 279.42, 280.81, 282.19, 282.5, 283.08, 284.34, 285.28, 284.88, 286.7, 285.83, 287.65, 287.94, 286.53, 286.36], '1W': [294.49, 309.2, 279.77, 281.09, 286.36], '1M': [288.12, 299.07, 299.73, 300.06, 284.87, 293.6, 283.51, 262.34, 290.5, 294.75, 303.53, 292.7, 294.03, 297.2, 307.8, 291.5, 294.49, 309.2, 279.77, 281.09, 286.36], 'YTD': [106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 182.27, 174.53, 161.22, 167.57, 172, 179.35, 186.72, 228.99, 241.65, 260.52, 269.95, 322.05, 292.65, 279.22, 288.12, 293.6, 303.53, 291.5, 286.36], '6M': [109.16, 118.62, 133.76, 142.29, 152.31, 179.6, 197.63, 182.27, 174.53, 161.22, 167.57, 172, 179.35, 182.6, 230.94, 241.01, 252.76, 275.33, 309.39, 292.65, 279.22, 288.12, 293.6, 303.53, 291.5, 286.36], '1Y': [70.01, 70.64, 72.53, 78.32, 76.88, 75.95, 90.06, 84.7, 91.08, 85.72, 92.33, 97.11, 97.88, 105.74, 105.13, 109.92, 116.11, 128.09, 126.71, 121.07, 107.22, 104.18, 107.83, 119.95, 105.77, 112.06, 106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 181.38, 177.5, 173.36, 167.57, 172, 179.35, 186.72, 228.99, 241.65, 260.52, 269.95, 322.05, 266.8, 279.22, 288.12, 293.6, 303.53, 291.5, 286.36] },
      velocityScore: { '1D': -1.1, '1W': -14.2, '1M': -45.3, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 55.9, revenueGrowth: 7, eps: 5.12, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { POW: 4.69, VOLT: 6.98, PBD: false, PBW: 1.87, IVEP: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 3, avgWeight: 4.4, proScore: 2.64, coverage: 0.6,
      price: 426.12, weeklyPrices: [404.59, 419.87, 402.68, 408.26, 426.12], weeklyChange: 5.32, dayChange: 4.37, sortRank: 0, periodReturns: { '1M': 6.4, 'YTD': 33.8, '6M': 32.8, '1Y': 20 },
      priceHistory: { '1D': [408.26, 415.16, 419.54, 418.22, 420.32, 420.21, 423.45, 423.38, 422.57, 421.79, 422.44, 422.74, 424.15, 424.67, 425.11, 425.14, 425.25, 425.45, 427.35, 427.25, 427.11, 425.37, 425.47, 426.12], '1W': [404.59, 419.87, 402.68, 408.26, 426.12], '1M': [400.08, 417.62, 421.21, 418.61, 395.94, 403.14, 401.72, 375.46, 393.64, 391.39, 407.06, 407.71, 409.64, 421.77, 435.78, 405.28, 404.59, 419.87, 402.68, 408.26, 426.12], 'YTD': [318.51, 320.58, 333.46, 331.22, 351.42, 373.82, 389.25, 373.38, 375.92, 347.75, 355.4, 356.8, 357.36, 363.89, 403.36, 407.57, 416.77, 422.44, 419, 399.44, 391.35, 400.08, 403.14, 407.06, 405.28, 426.12], '6M': [320.86, 322.67, 331.14, 334.04, 354.37, 354.67, 390.33, 373.38, 375.92, 347.75, 355.4, 356.8, 357.36, 361.1, 403, 406.21, 423.92, 425.55, 401.51, 399.44, 391.35, 400.08, 403.14, 407.06, 405.28, 426.12], '1Y': [355.04, 359.78, 362.89, 380.24, 390.09, 358.16, 363.3, 349, 352.02, 342.99, 362.25, 363.35, 372.21, 373.84, 376.7, 381.72, 373.46, 376.01, 377.72, 367.91, 338.29, 336.65, 335.57, 353.45, 315.82, 323.67, 318.51, 320.58, 333.46, 331.22, 351.42, 373.82, 389.25, 362.05, 377.4, 353.87, 355.4, 356.8, 357.36, 363.89, 403.36, 407.57, 416.77, 422.44, 419, 381.87, 391.35, 400.08, 403.14, 407.06, 405.28, 426.12] },
      velocityScore: { '1D': 0, '1W': -2.6, '1M': -19.8, '6M': null }, isNew: false,
      marketCap: '$165B', pe: 41.7, revenueGrowth: 17, eps: 10.21, grossMargin: 37, dividendYield: 1.08,
      etfPresence: { POW: 3.99, VOLT: 5.24, PBD: false, PBW: false, IVEP: 3.98 },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 3, avgWeight: 4.05, proScore: 2.43, coverage: 0.6,
      price: 1174.86, weeklyPrices: [1057.65, 1085.47, 1045.17, 1102.51, 1174.86], weeklyChange: 11.08, dayChange: 6.56, sortRank: 0, periodReturns: { '1M': 21.3, 'YTD': 79.8, '6M': 78.1, '1Y': 132.2 },
      priceHistory: { '1D': [1102.51, 1112, 1135.57, 1131.85, 1144.17, 1131.56, 1140.5, 1138.81, 1137.33, 1136.68, 1143.29, 1144.68, 1148, 1157, 1157.61, 1161.07, 1160.44, 1154.34, 1160.29, 1159.42, 1162.47, 1160.64, 1168.58, 1174.86], '1W': [1057.65, 1085.47, 1045.17, 1102.51, 1174.86], '1M': [950.54, 969.67, 959.36, 963.33, 933.61, 933.85, 920.15, 867.09, 906.79, 940.66, 979.07, 982.35, 1048.86, 1109.73, 1127.59, 1034.98, 1057.65, 1085.47, 1045.17, 1102.51, 1174.86], 'YTD': [653.57, 628.4, 642.23, 657.78, 726.37, 779.35, 802.13, 830.34, 873.6, 789.23, 805.02, 851.07, 853.16, 897.36, 991.12, 990.18, 1120.23, 1073.95, 1073.08, 1049.23, 1038.74, 950.54, 933.85, 979.07, 1034.98, 1174.86], '6M': [659.64, 662.32, 644.18, 661.67, 717.39, 737.53, 816.56, 830.34, 873.6, 789.23, 805.02, 851.07, 853.16, 898.57, 991.32, 1002.75, 1149.19, 1062.95, 1040.15, 1049.23, 1038.74, 950.54, 933.85, 979.07, 1034.98, 1174.86], '1Y': [506, 535.77, 561.17, 629.03, 655, 664.55, 657.44, 603.13, 625.91, 577.04, 643.56, 614.79, 628.97, 606.15, 625.45, 615.95, 585.33, 570.98, 547.96, 576.08, 554.93, 572.56, 601.97, 723, 614.19, 667.32, 653.57, 628.4, 642.23, 657.78, 726.37, 779.35, 802.13, 831.7, 881.18, 830.1, 805.02, 851.07, 853.16, 897.36, 991.12, 990.18, 1120.23, 1073.95, 1073.08, 1012.25, 1038.74, 950.54, 933.85, 979.07, 1034.98, 1174.86] },
      velocityScore: { '1D': 4.3, '1W': -1.2, '1M': -5.8, '6M': null }, isNew: false,
      marketCap: '$316B', pe: 34.4, revenueGrowth: 16, eps: 34.18, grossMargin: 20, dividendYield: 0.18,
      etfPresence: { POW: 3.37, VOLT: 4.4, PBD: false, PBW: false, IVEP: 4.39 },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 3, avgWeight: 3.58, proScore: 2.15, coverage: 0.6,
      price: 87.77, weeklyPrices: [87.62, 87.70, 88.56, 88.66, 87.77], weeklyChange: 0.17, dayChange: -1, sortRank: 0, periodReturns: { '1M': 0.9, 'YTD': 9.3, '6M': 9, '1Y': 20.1 },
      priceHistory: { '1D': [88.66, 87.73, 87.52, 87.61, 87.66, 87.76, 87.9, 87.97, 88.2, 88.11, 88.45, 88.65, 88.6, 88.65, 88.72, 88.28, 88.27, 88.5, 88.54, 88.33, 88.35, 88.3, 88.04, 87.77], '1W': [87.62, 87.7, 88.56, 88.66, 87.77], '1M': [83.66, 85.68, 84.58, 85.68, 85.84, 84.01, 84.83, 85.12, 84.84, 85.99, 86.12, 86.23, 85.73, 86.75, 86.08, 86.43, 87.62, 87.7, 88.56, 88.66, 87.77], 'YTD': [80.28, 79.49, 82.19, 84.81, 87.9, 89.47, 93.8, 92.18, 93.77, 91.02, 92.78, 89.5, 91.4, 92.73, 92.3, 92.01, 94.83, 95.51, 94.84, 93.36, 88.55, 83.66, 84.01, 86.12, 86.43, 87.77], '6M': [80.53, 78.37, 81.98, 85.07, 88.18, 89.21, 91.93, 92.18, 93.77, 91.02, 92.78, 89.5, 91.4, 93.15, 94.08, 91.98, 95.28, 96.95, 93.1, 93.36, 88.55, 83.66, 84.01, 86.12, 86.43, 87.77], '1Y': [73.06, 73.65, 74.77, 72.82, 70.99, 70.54, 71.86, 76.51, 74.84, 71.63, 71.04, 70.31, 73.83, 78.67, 84.04, 85.79, 83.99, 83.57, 81.69, 85.76, 84.64, 84.83, 84.95, 81.27, 80.29, 80.45, 80.28, 79.49, 82.19, 84.81, 87.9, 89.47, 93.8, 94.06, 92.71, 92.01, 92.78, 89.5, 91.4, 92.73, 92.3, 92.01, 94.83, 95.51, 94.84, 89.04, 88.55, 83.66, 84.01, 86.12, 86.43, 87.77] },
      velocityScore: { '1D': -0.9, '1W': 7, '1M': 0.5, '6M': null }, isNew: false,
      marketCap: '$183B', pe: 22.3, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.81,
      etfPresence: { POW: 2.05, VOLT: 5, PBD: false, PBW: false, IVEP: 3.7 },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 3, avgWeight: 3.27, proScore: 1.96, coverage: 0.6,
      price: 169.61, weeklyPrices: [167.55, 171.91, 162.92, 163.35, 169.61], weeklyChange: 1.23, dayChange: 3.83, sortRank: 0, periodReturns: { '1M': 1.6, 'YTD': 66.3, '6M': 64.7, '1Y': 135 },
      priceHistory: { '1D': [163.35, 165.62, 166.75, 166.96, 167.4, 167.27, 168.78, 168.74, 168.43, 167.27, 167.18, 166.78, 166.9, 167.56, 168.37, 168.11, 167.75, 168.03, 169.01, 168.59, 169.46, 169.32, 169.49, 169.61], '1W': [167.55, 171.91, 162.92, 163.35, 169.61], '1M': [171.55, 173.39, 176.39, 173.88, 162.86, 163.81, 163.8, 156.79, 164.52, 165.84, 169, 167.34, 170.94, 177.02, 184.34, 168.37, 167.55, 171.91, 162.92, 163.35, 169.61], 'YTD': [101.97, 102.72, 107.98, 110.29, 112.26, 112.64, 113.25, 116.87, 118.36, 106.02, 109.93, 116.3, 116.98, 117.41, 133.16, 135.8, 141.71, 162.69, 173.39, 169.01, 164.66, 171.55, 163.81, 169, 168.37, 169.61], '6M': [103.01, 106.48, 104.54, 111.57, 115.62, 113.87, 111.9, 116.87, 118.36, 106.02, 109.93, 116.3, 116.98, 117.96, 130.56, 134.69, 142.17, 158.92, 169.95, 169.01, 164.66, 171.55, 163.81, 169, 168.37, 169.61], '1Y': [72.16, 75.2, 74.48, 76.63, 78.72, 90.24, 91.84, 88.15, 90.84, 89.49, 94.98, 96.46, 97.27, 100.12, 98.72, 101.1, 99.65, 104.22, 109.62, 109.59, 104.31, 104.93, 104.97, 108.87, 94.99, 103.97, 101.97, 102.72, 107.98, 110.29, 112.26, 112.64, 113.25, 114.93, 120.27, 108.13, 109.93, 116.3, 116.98, 117.41, 133.16, 135.8, 141.71, 162.69, 173.39, 160.69, 164.66, 171.55, 163.81, 169, 168.37, 169.61] },
      velocityScore: { '1D': -1.5, '1W': -7.5, '1M': -20.3, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 57.7, revenueGrowth: 54, eps: 2.94, grossMargin: 37, dividendYield: 0.51,
      etfPresence: { POW: 3.69, VOLT: 2.97, PBD: false, PBW: false, IVEP: 3.16 },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 3, avgWeight: 2.97, proScore: 1.78, coverage: 0.6,
      price: 523.2, weeklyPrices: [518.18, 536.04, 517.02, 514.71, 523.20], weeklyChange: 0.97, dayChange: 1.65, sortRank: 0, periodReturns: { '1M': 10.5, 'YTD': 17.8, '6M': 17.1, '1Y': 27.5 },
      priceHistory: { '1D': [514.71, 519.15, 519.51, 517.81, 519.95, 520.79, 521.9, 523.24, 521.18, 519.29, 519.17, 521.1, 520.55, 520.83, 521.52, 520.45, 520.97, 521.83, 522.67, 523.08, 523.68, 523.34, 521.93, 523.2], '1W': [518.18, 536.04, 517.02, 514.71, 523.2], '1M': [462.93, 480.46, 484.91, 485.27, 476.82, 485.03, 486.47, 467.59, 469.32, 476.89, 489.73, 502.65, 508.87, 523.69, 539.39, 509.96, 518.18, 536.04, 517.02, 514.71, 523.2], 'YTD': [444.11, 460.87, 484.11, 485.53, 487.94, 503.8, 524.12, 526.73, 511.63, 471.54, 467.38, 475.74, 480.97, 499.2, 539.79, 546.23, 555.34, 516, 490.16, 479.97, 475.01, 462.93, 485.03, 489.73, 509.96, 523.2], '6M': [446.61, 468.2, 476.06, 484.06, 497.97, 487.4, 516.02, 526.73, 511.63, 471.54, 467.38, 475.74, 480.97, 494.25, 536.01, 535.57, 553.07, 508.43, 492.58, 479.97, 475.01, 462.93, 485.03, 489.73, 509.96, 523.2], '1Y': [410.51, 417.71, 418.42, 434.95, 437.44, 423.57, 432.14, 432.81, 442.52, 428.8, 442.33, 433.26, 431.16, 430.47, 419.67, 434.05, 435.29, 455.34, 459.44, 450.12, 417.28, 429.82, 429.34, 448.18, 429.68, 456.28, 444.11, 460.87, 484.11, 485.53, 487.94, 503.8, 524.12, 516.99, 516.98, 487.76, 467.38, 475.74, 480.97, 499.2, 539.79, 546.23, 555.34, 516, 490.16, 470.87, 475.01, 462.93, 485.03, 489.73, 509.96, 523.2] },
      velocityScore: { '1D': -12.3, '1W': -2.2, '1M': -16.4, '6M': null }, isNew: false,
      marketCap: '$28B', pe: 30.9, revenueGrowth: 11, eps: 16.93, grossMargin: 36, dividendYield: null,
      etfPresence: { POW: 2.88, VOLT: 3.41, PBD: false, PBW: false, IVEP: 2.61 },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'NRG', name: 'NRG Energy Inc', easyScore: 3, avgWeight: 1.38, proScore: 0.83, coverage: 0.6,
      price: 146.06, weeklyPrices: [142.21, 147.11, 149.36, 149.11, 146.06], weeklyChange: 2.71, dayChange: -2.05, sortRank: 0, periodReturns: { '1M': 8.9, 'YTD': -8.3, '6M': -9, '1Y': -6.3 },
      priceHistory: { '1D': [149.11, 148.7, 148.98, 149.26, 149.69, 149.3, 150.04, 149.99, 150.01, 147.74, 148.96, 149.62, 149.1, 148.92, 148.18, 147.21, 146.75, 147.08, 146.79, 146.42, 146.21, 145.62, 145.63, 146.06], '1W': [142.21, 147.11, 149.36, 149.11, 146.06], '1M': [129.47, 133.51, 133.76, 133.39, 129.2, 127.71, 129.96, 120.65, 123.7, 125.47, 130.4, 132.1, 132.13, 135.06, 138.91, 137.66, 142.21, 147.11, 149.36, 149.11, 146.06], 'YTD': [159.24, 143.53, 158.5, 149.3, 152.63, 153.32, 172.35, 179.18, 178.96, 154.32, 152.87, 145.8, 147.74, 149.8, 170.24, 157.18, 160.15, 154.82, 137.3, 127.81, 137.65, 129.47, 127.71, 130.4, 137.66, 146.06], '6M': [160.43, 148.91, 149.83, 151.09, 153.72, 144.44, 161.8, 179.18, 178.96, 154.32, 152.87, 145.8, 147.74, 152.69, 164.07, 167.73, 159.81, 153.37, 138.11, 127.81, 137.65, 129.47, 127.71, 130.4, 137.66, 146.06], '1Y': [155.96, 150.27, 144.96, 160.55, 166.59, 148.56, 156.69, 148.38, 146.23, 146.91, 161.21, 164.58, 165.58, 161.91, 167.52, 171.33, 163.59, 172.76, 167.99, 162.84, 166.45, 163.81, 166.77, 168.16, 149.48, 160.56, 159.24, 143.53, 158.5, 149.3, 152.63, 153.32, 172.35, 176.52, 175.58, 155.42, 152.87, 145.8, 147.74, 149.8, 170.24, 157.18, 160.15, 154.82, 137.3, 125.5, 137.65, 129.47, 127.71, 130.4, 137.66, 146.06] },
      velocityScore: { '1D': -1.2, '1W': 29.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$31B', pe: 160.5, revenueGrowth: 20, eps: 0.91, grossMargin: 16, dividendYield: 1.27,
      etfPresence: { POW: 0.54, VOLT: 1.05, PBD: false, PBW: false, IVEP: 2.56 },
      tonyNote: 'NRG Energy Inc appears in 3 of 5 Electrification ETFs (60% coverage) with average weight 1.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, avgWeight: 5.99, proScore: 2.39, coverage: 0.4,
      price: 333.04, weeklyPrices: [294.15, 310.32, 310.64, 315.65, 333.04], weeklyChange: 13.22, dayChange: 5.51, sortRank: 0, periodReturns: { '1M': 21.3, 'YTD': 96.3, '6M': 92.6, '1Y': 248.7 },
      priceHistory: { '1D': [315.65, 314.14, 321.2, 321.9, 324.09, 325.64, 323.55, 322.58, 321.71, 317.35, 318.92, 319.07, 319.13, 321.27, 323.56, 326.54, 327.42, 330.81, 330.51, 332.48, 334.63, 333.68, 333.6, 333.04], '1W': [294.15, 310.32, 310.64, 315.65, 333.04], '1M': [269.86, 269.22, 280.09, 276.54, 262.56, 279.13, 276.04, 276.95, 296.55, 293.87, 302.15, 293.22, 299.84, 296.39, 304.33, 288.64, 294.15, 310.32, 310.64, 315.65, 333.04], 'YTD': [169.63, 180.24, 196.61, 196.5, 201.19, 220.78, 232.84, 235.04, 229.71, 191.87, 197.65, 204.09, 203.53, 206.9, 237.93, 254.38, 250.96, 286.69, 302.73, 256.72, 270.01, 269.86, 279.13, 302.15, 288.64, 333.04], '6M': [172.95, 181.03, 192.96, 200.29, 210.44, 208, 231.48, 235.04, 229.71, 191.87, 197.65, 204.09, 203.53, 204.65, 235.73, 254.25, 276.65, 283.6, 297.98, 256.72, 270.01, 269.86, 279.13, 302.15, 288.64, 333.04], '1Y': [95.52, 102.24, 98.77, 107.07, 125.91, 131.1, 134.66, 127.8, 139.31, 138.07, 145.68, 144.6, 142.27, 142.5, 146.89, 150.77, 148, 154.78, 154.25, 152.12, 144.07, 150.84, 159.74, 172.82, 164.18, 176.17, 169.63, 180.24, 196.61, 196.5, 201.19, 220.78, 232.84, 231.83, 222.45, 191.81, 197.65, 204.09, 203.53, 206.9, 237.93, 254.38, 250.96, 286.69, 302.73, 258.28, 270.01, 269.86, 279.13, 302.15, 288.64, 333.04] },
      velocityScore: { '1D': 0, '1W': 8.6, '1M': -35.9, '6M': null }, isNew: false,
      marketCap: '$5B', pe: 80.4, revenueGrowth: 17, eps: 4.14, grossMargin: 39, dividendYield: 0.09,
      etfPresence: { POW: 3.83, VOLT: 8.14, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, avgWeight: 3.54, proScore: 1.41, coverage: 0.4,
      price: 136.81, weeklyPrices: [134.96, 137.00, 138.69, 137.97, 136.81], weeklyChange: 1.37, dayChange: -0.84, sortRank: 0, periodReturns: { '1M': 8, 'YTD': 18.6, '6M': 17.9, '1Y': 31.1 },
      priceHistory: { '1D': [137.97, 136.82, 136.55, 136.37, 136.7, 136.84, 137.2, 136.98, 137.53, 137.45, 137.6, 137.68, 137.71, 137.83, 137.9, 137.66, 137.59, 137.88, 137.97, 137.7, 137.59, 137.6, 137.12, 136.81], '1W': [134.96, 137, 138.69, 137.97, 136.81], '1M': [123.79, 127.11, 126.31, 127.79, 129.14, 126.77, 127.76, 128.53, 128.48, 129.23, 129.31, 129.75, 128.27, 127.69, 130.3, 133.74, 134.96, 137, 138.69, 137.97, 136.81], 'YTD': [115.31, 115.93, 119.4, 116.63, 119.78, 120.8, 129.94, 129.37, 133.82, 131.87, 133.61, 125.66, 130.1, 132.36, 134.46, 133.28, 135.07, 134.66, 130.7, 125.15, 131.59, 123.79, 126.77, 129.31, 133.74, 136.81], '6M': [115.99, 113.7, 118.11, 117.18, 119.21, 120.61, 126.43, 129.37, 133.82, 131.87, 133.61, 125.66, 130.1, 132.68, 136.3, 133.66, 134.73, 136.91, 130.16, 125.15, 131.59, 123.79, 126.77, 129.31, 133.74, 136.81], '1Y': [104.39, 104.74, 105.49, 108.89, 113.25, 113.49, 111.99, 112.66, 112.63, 110.03, 108.34, 107.52, 108.88, 112.75, 118.19, 118.53, 117.43, 115.11, 120.3, 122.73, 123.51, 121.58, 118.06, 114.16, 114.71, 115.31, 115.31, 115.93, 119.4, 116.63, 119.78, 120.8, 129.94, 132.03, 133.29, 131.86, 133.61, 125.66, 130.1, 132.36, 134.46, 133.28, 135.07, 134.66, 130.7, 127.68, 131.59, 123.79, 126.77, 129.31, 133.74, 136.81] },
      velocityScore: { '1D': -2.1, '1W': 31.8, '1M': -27.7, '6M': null }, isNew: false,
      marketCap: '$74B', pe: 20.2, revenueGrowth: 10, eps: 6.76, grossMargin: 47, dividendYield: 2.75,
      etfPresence: { POW: 2.69, VOLT: 4.38, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 2, avgWeight: 3.18, proScore: 1.27, coverage: 0.4,
      price: 334.82, weeklyPrices: [316.43, 325.57, 303.95, 306.97, 334.82], weeklyChange: 5.81, dayChange: 9.07, sortRank: 0, periodReturns: { '1M': 6.1, 'YTD': 106.7, '6M': 103.7, '1Y': 173.2 },
      priceHistory: { '1D': [306.97, 315.4, 320.33, 319.21, 324.26, 324.67, 329.25, 330.11, 330.69, 328.26, 327.5, 328.99, 328.61, 328.27, 328.9, 330.47, 331.78, 331.59, 334.15, 333.92, 333.88, 332.94, 333.97, 334.82], '1W': [316.43, 325.57, 303.95, 306.97, 334.82], '1M': [323.39, 334.49, 331.44, 323.92, 300.51, 300.57, 289.52, 280.98, 297.88, 302.87, 311.93, 299.6, 317.58, 333.05, 357.96, 318.32, 316.43, 325.57, 303.95, 306.97, 334.82], 'YTD': [162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 234.53, 243.75, 254.89, 241.78, 258.88, 255.88, 251.07, 258.73, 299.96, 314.41, 322.43, 330.97, 367.92, 370.94, 327.46, 323.39, 300.57, 311.93, 318.32, 334.82], '6M': [164.34, 171.54, 170.86, 181.12, 195.1, 177.75, 236.51, 243.75, 254.89, 241.78, 258.88, 255.88, 251.07, 261.29, 295.11, 307.34, 323.46, 328.31, 339.97, 370.94, 327.46, 323.39, 300.57, 311.93, 318.32, 334.82], '1Y': [122.54, 128.37, 125.4, 130.19, 144.17, 139.75, 143.72, 129.05, 127.93, 125.59, 136.74, 136.83, 141.62, 161.59, 167.38, 180.51, 174.8, 190.57, 180.82, 179.05, 164.86, 169.57, 178.88, 181.82, 149.83, 166.87, 162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 234.53, 245.42, 257.75, 264.35, 258.88, 255.88, 251.07, 258.73, 299.96, 314.41, 322.43, 330.97, 367.92, 339.73, 327.46, 323.39, 300.57, 311.93, 318.32, 334.82] },
      velocityScore: { '1D': 0, '1W': -9.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$129B', pe: 83.9, revenueGrowth: 30, eps: 3.99, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 2.36, PBD: false, PBW: false, IVEP: 3.99 },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'APH', name: 'Amphenol Corp', easyScore: 2, avgWeight: 2.74, proScore: 1.1, coverage: 0.4,
      price: 176.32, weeklyPrices: [162.78, 165.15, 163.72, 166.42, 176.32], weeklyChange: 8.32, dayChange: 5.95, sortRank: 0, periodReturns: { '1M': 18.5, 'YTD': 30.5, '6M': 29.5, '1Y': 81 },
      priceHistory: { '1D': [166.42, 170.4, 173.38, 173.01, 173.95, 173.29, 174.61, 174.8, 174.77, 175.23, 175.65, 175.63, 175.8, 175.7, 175.6, 176.15, 176.79, 176.98, 177.45, 177.34, 178.26, 178.18, 176.71, 176.32], '1W': [162.78, 165.15, 163.72, 166.42, 176.32], '1M': [146.34, 148.4, 147.62, 146.77, 138.81, 143.6, 154.07, 149.22, 152.46, 153.8, 158.59, 158.81, 161.11, 163.96, 165.96, 158.7, 162.78, 165.15, 163.72, 166.42, 176.32], 'YTD': [135.14, 136.25, 154.22, 150.99, 144.08, 136.23, 146.72, 151.04, 146.06, 131.87, 133.92, 126.74, 123.62, 126.49, 145.27, 152.81, 148.64, 141.03, 122.47, 125, 132.06, 146.34, 143.6, 158.59, 158.7, 176.32], '6M': [136.2, 138.91, 146.75, 152.5, 149.58, 127.63, 143.73, 151.04, 146.06, 131.87, 133.92, 126.74, 123.62, 128, 140.75, 151.06, 149.71, 142.3, 128.03, 125, 132.06, 146.34, 143.6, 158.59, 158.7, 176.32], '1Y': [97.39, 98.21, 100.55, 100.71, 105.49, 109.5, 111.85, 109.98, 109.9, 110.69, 119.09, 118.41, 123.13, 124.66, 125.79, 125.6, 124.44, 137.29, 136.7, 143.47, 132.44, 137.81, 138.65, 138.68, 126.51, 137.94, 135.14, 136.25, 154.22, 150.99, 144.08, 136.23, 146.72, 147.82, 135.16, 136.06, 133.92, 126.74, 123.62, 126.49, 145.27, 152.81, 148.64, 141.03, 122.47, 121.72, 132.06, 146.34, 143.6, 158.59, 158.7, 176.32] },
      velocityScore: { '1D': 0.9, '1W': null, '1M': -38.9, '6M': null }, isNew: false,
      marketCap: '$217B', pe: 50.7, revenueGrowth: 58, eps: 3.48, grossMargin: 38, dividendYield: 0.6,
      etfPresence: { POW: 1.02, VOLT: 4.46, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, avgWeight: 2.66, proScore: 1.06, coverage: 0.4,
      price: 372.87, weeklyPrices: [359.61, 375.15, 348.11, 348.15, 372.87], weeklyChange: 3.69, dayChange: 7.1, sortRank: 0, periodReturns: { '1M': 23.4, 'YTD': 78.1, '6M': 74.7, '1Y': 179.1 },
      priceHistory: { '1D': [348.15, 365.76, 371.25, 371.18, 372.42, 373.02, 375.38, 373.99, 373.56, 372.71, 373.99, 369.23, 367.83, 367.2, 368.8, 369.59, 373, 372.59, 372.91, 374.34, 374.94, 374.37, 373.28, 372.87], '1W': [359.61, 375.15, 348.11, 348.15, 372.87], '1M': [294.65, 312.28, 322.5, 320.92, 294.81, 306.11, 311.64, 308.17, 340.4, 354.37, 370.66, 350.45, 353.32, 372.59, 388.23, 364.96, 359.61, 375.15, 348.11, 348.15, 372.87], 'YTD': [209.37, 210.99, 257.29, 262.19, 255.36, 273.26, 314.27, 331.23, 335.57, 290.78, 302.02, 317.21, 310.76, 331.9, 378.94, 380.22, 385.68, 387.03, 354.97, 323.46, 324.86, 294.65, 306.11, 370.66, 364.96, 372.87], '6M': [213.41, 224.4, 237.9, 275.57, 269.12, 257.64, 312.95, 331.23, 335.57, 290.78, 302.02, 317.21, 310.76, 332.31, 379.64, 375.6, 387.24, 389.05, 357.24, 323.46, 324.86, 294.65, 306.11, 370.66, 364.96, 372.87], '1Y': [133.59, 141.13, 139.42, 142.84, 144.07, 139.81, 158.81, 150.41, 154.44, 145.25, 157.25, 157.79, 170.77, 176.2, 174.92, 189.96, 196.58, 204.62, 195.05, 215.98, 199.22, 205.92, 213.44, 221.47, 204.49, 217.23, 209.37, 210.99, 257.29, 262.19, 255.36, 273.26, 314.27, 329.24, 340.42, 305.02, 302.02, 317.21, 310.76, 331.9, 378.94, 380.22, 385.68, 387.03, 354.97, 309.06, 324.86, 294.65, 306.11, 370.66, 364.96, 372.87] },
      velocityScore: { '1D': -1.9, '1W': 15.2, '1M': -37.3, '6M': null }, isNew: false,
      marketCap: '$15B', pe: 77.5, revenueGrowth: 26, eps: 4.81, grossMargin: 39, dividendYield: 0.11,
      etfPresence: { POW: 1.05, VOLT: 4.27, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 2.63, proScore: 1.05, coverage: 0.4,
      price: 74.34, weeklyPrices: [75.87, 77.53, 77.92, 75.06, 74.34], weeklyChange: -2.02, dayChange: -0.96, sortRank: 0, periodReturns: { '1M': 4.1, 'YTD': 23.7, '6M': 23.6, '1Y': 26.6 },
      priceHistory: { '1D': [75.06, 74.6, 74.77, 74.59, 74.69, 75.27, 75.5, 75.49, 75.5, 75.48, 75.49, 75.29, 75.04, 74.98, 74.78, 74.92, 74.89, 74.89, 74.83, 74.79, 74.71, 74.72, 74.66, 74.34], '1W': [75.87, 77.53, 77.92, 75.06, 74.34], '1M': [70.04, 71.31, 71.66, 72.43, 71.96, 71.59, 71.59, 72.26, 71.62, 72.08, 71.49, 71.48, 71.25, 73.12, 74.95, 75.79, 75.87, 77.53, 77.92, 75.06, 74.34], 'YTD': [60.11, 61.15, 60.29, 64.96, 67.26, 66.92, 72.28, 72.98, 74.72, 74.24, 73.34, 72.41, 73.58, 72.59, 71.54, 70.91, 71.61, 75.41, 74.18, 77.72, 78.47, 70.04, 71.59, 71.49, 75.79, 74.34], '6M': [60.16, 60.39, 60.71, 63.72, 67.24, 67.42, 71.13, 72.98, 74.72, 74.24, 73.34, 72.41, 73.58, 72, 72.74, 71.15, 72.18, 75.54, 71.96, 77.72, 78.47, 70.04, 71.59, 71.49, 75.79, 74.34], '1Y': [58.72, 57.85, 58.48, 57.71, 59.24, 58.64, 57.76, 56.57, 57.13, 57.73, 58.76, 59.02, 62.86, 63.69, 63.5, 63.78, 62.34, 57.59, 56.51, 60.6, 59.17, 59.37, 61.55, 60.5, 58.84, 59.46, 60.11, 61.15, 60.29, 64.96, 67.26, 66.92, 72.28, 72.98, 76.26, 73.18, 73.34, 72.41, 73.58, 72.59, 71.54, 70.91, 71.61, 75.41, 74.18, 77.69, 78.47, 70.04, 71.59, 71.49, 75.79, 74.34] },
      velocityScore: { '1D': -4.5, '1W': 5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$91B', pe: 32.6, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.8,
      etfPresence: { POW: false, VOLT: 1.52, PBD: false, PBW: false, IVEP: 3.73 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'JCI', name: 'JOHNSON CONTROLS INTERNATIONAL PLC', easyScore: 2, avgWeight: 2.45, proScore: 0.98, coverage: 0.4,
      price: 146.11, weeklyPrices: [142.81, 145.49, 138.40, 140.47, 146.11], weeklyChange: 2.31, dayChange: 4.02, sortRank: 0, periodReturns: { '1M': 9, 'YTD': 22, '6M': 20.8, '1Y': 39.6 },
      priceHistory: { '1D': [140.47, 143.65, 144.07, 144.3, 144.83, 145.89, 146.43, 145.74, 145.84, 146.76, 146.48, 147.02, 147.26, 147.06, 147.63, 147.69, 147.72, 147.45, 148.09, 148.09, 147.15, 146.74, 145.85, 146.11], '1W': [142.81, 145.49, 138.4, 140.47, 146.11], '1M': [133.91, 141.99, 146.96, 147.4, 143.65, 144.05, 147.75, 139.36, 144.01, 144.96, 146.06, 145.17, 143.62, 144.82, 148.21, 141.28, 142.81, 145.49, 138.4, 140.47, 146.11], 'YTD': [119.75, 111.29, 112.95, 113.59, 119.26, 137.65, 139.24, 143.79, 144.3, 132.4, 130.16, 129.7, 131.29, 133.75, 142.82, 140.98, 143.38, 144.4, 141.78, 143.08, 138.36, 133.91, 144.05, 146.06, 141.28, 146.11], '6M': [120.94, 112.41, 112.13, 114.51, 120.28, 132.52, 138.57, 143.79, 144.3, 132.4, 130.16, 129.7, 131.29, 132.97, 142.53, 140.87, 141.92, 145.08, 139.52, 143.08, 138.36, 133.91, 144.05, 146.06, 141.28, 146.11], '1Y': [104.67, 106.5, 107.28, 110.13, 104.02, 104.67, 106.64, 104.52, 108.46, 105.34, 107.8, 107.41, 106.54, 108.89, 108.43, 110.82, 111.18, 112.21, 111.04, 121.94, 114.44, 114.65, 114.22, 115.81, 116.38, 121.39, 119.75, 111.29, 112.95, 113.59, 119.26, 137.65, 139.24, 142.83, 145.46, 133.09, 130.16, 129.7, 131.29, 133.75, 142.82, 140.98, 143.38, 144.4, 141.78, 137.31, 138.36, 133.91, 144.05, 146.06, 141.28, 146.11] },
      velocityScore: { '1D': 1, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$89B', pe: 44.7, revenueGrowth: 8, eps: 3.27, grossMargin: 37, dividendYield: 1.14,
      etfPresence: { POW: false, VOLT: 1.37, PBD: false, PBW: false, IVEP: 3.53 },
      tonyNote: 'JOHNSON CONTROLS INTERNATIONAL PLC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VST', name: 'Vistra Corp', easyScore: 2, avgWeight: 2.37, proScore: 0.95, coverage: 0.4,
      price: 158.63, weeklyPrices: [162.87, 167.77, 163.49, 162.38, 158.63], weeklyChange: -2.6, dayChange: -2.31, sortRank: 0, periodReturns: { '1M': -1, 'YTD': -1.7, '6M': -2.5, '1Y': -14.3 },
      priceHistory: { '1D': [162.38, 162.12, 163, 163.93, 164.84, 163.85, 163.79, 163.54, 163.88, 162.04, 162.74, 162.46, 162.13, 162.08, 161.74, 160.51, 159.76, 160.74, 159.54, 158.45, 157.59, 157.03, 157.62, 158.63], '1W': [162.87, 167.77, 163.49, 162.38, 158.63], '1M': [154.76, 157.97, 153.8, 153.7, 148.76, 146.9, 146.22, 138.54, 146.38, 148.02, 153.52, 158.61, 158.83, 163.75, 167.26, 162.39, 162.87, 167.77, 163.49, 162.38, 158.63], 'YTD': [161.33, 150.6, 180.18, 160.12, 158.35, 149.65, 171.49, 171.4, 173.89, 158.65, 158.95, 146.02, 155.48, 151.59, 158.2, 159.6, 166.58, 160.85, 152.05, 139.68, 156.27, 154.76, 146.9, 153.52, 162.39, 158.63], '6M': [162.62, 154.6, 168.97, 160.36, 162.58, 143.07, 163.1, 171.4, 173.89, 158.65, 158.95, 146.02, 155.48, 151.18, 154.73, 163.46, 164.35, 155.28, 147.72, 139.68, 156.27, 154.76, 146.9, 153.52, 162.39, 158.63], '1Y': [185.1, 197.01, 184.13, 200.12, 207.05, 200.85, 209.56, 193.52, 195.12, 188.12, 209.21, 208.31, 202.06, 201.51, 206.55, 210.85, 186.52, 190.59, 185.74, 179.16, 174.42, 170.84, 171.65, 165.17, 159.97, 161.96, 161.33, 150.6, 180.18, 160.12, 158.35, 149.65, 171.49, 167.8, 165.99, 163.62, 158.95, 146.02, 155.48, 151.59, 158.2, 159.6, 166.58, 160.85, 152.05, 136.75, 156.27, 154.76, 146.9, 153.52, 162.39, 158.63] },
      velocityScore: { '1D': -2.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$53B', pe: 26.5, revenueGrowth: 43, eps: 5.98, grossMargin: 39, dividendYield: null,
      etfPresence: { POW: 1.43, VOLT: false, PBD: false, PBW: false, IVEP: 3.32 },
      tonyNote: 'Vistra Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CEG', name: 'Constellation Energy Corp', easyScore: 2, avgWeight: 2.28, proScore: 0.91, coverage: 0.4,
      price: 248.37, weeklyPrices: [267.97, 268.69, 264.02, 259.32, 248.37], weeklyChange: -7.31, dayChange: -4.22, sortRank: 0, periodReturns: { '1M': -13.7, 'YTD': -29.7, '6M': -30.5, '1Y': -19.3 },
      priceHistory: { '1D': [259.32, 254.84, 252.9, 254.26, 255.83, 254.65, 253.68, 254.29, 254.5, 252.38, 254.16, 254.18, 253.59, 253.1, 253.04, 251.8, 250.63, 251.22, 250.29, 248.92, 248.14, 247.01, 247.13, 248.37], '1W': [267.97, 268.69, 264.02, 259.32, 248.37], '1M': [265.7, 272.65, 267.24, 264.59, 254.83, 250.67, 251.65, 242.3, 246.71, 253.76, 262.35, 268, 267.17, 274.06, 275.53, 270.26, 267.97, 268.69, 264.02, 259.32, 248.37], 'YTD': [353.27, 322.54, 341.2, 289.06, 280.68, 261.42, 288.43, 294.84, 329.88, 319.06, 301.77, 281.99, 301.49, 275.16, 291.72, 287.56, 315.17, 321.05, 299.69, 267.2, 294.07, 265.7, 250.67, 262.35, 270.26, 248.37], '6M': [357.12, 338.63, 330.38, 287.35, 287.45, 247.06, 276.12, 294.84, 329.88, 319.06, 301.77, 281.99, 301.49, 272.82, 286.5, 296.21, 313.53, 307.81, 303.63, 267.2, 294.07, 265.7, 250.67, 262.35, 270.26, 248.37], '1Y': [307.92, 317.11, 308.2, 323.7, 345.27, 338.46, 338.57, 317.23, 316.58, 308.48, 320, 321.27, 339.13, 350.9, 371, 403.95, 358.79, 384.95, 362.82, 351.67, 339.35, 351.6, 361.26, 362.07, 340.97, 363.95, 353.27, 322.54, 341.2, 289.06, 280.68, 261.42, 288.43, 293.8, 327.16, 322.99, 301.77, 281.99, 301.49, 275.16, 291.72, 287.56, 315.17, 321.05, 299.69, 262, 294.07, 265.7, 250.67, 262.35, 270.26, 248.37] },
      velocityScore: { '1D': -3.2, '1W': -3.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$89B', pe: 21.6, revenueGrowth: 64, eps: 11.51, grossMargin: 23, dividendYield: 0.66,
      etfPresence: { POW: 1.23, VOLT: false, PBD: false, PBW: false, IVEP: 3.33 },
      tonyNote: 'Constellation Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TLN', name: 'Talen Energy Corp', easyScore: 2, avgWeight: 2.26, proScore: 0.9, coverage: 0.4,
      price: 384.26, weeklyPrices: [405.89, 416.80, 404.09, 399.34, 384.26], weeklyChange: -5.33, dayChange: -3.78, sortRank: 0, periodReturns: { '1M': -0.7, 'YTD': 2.5, '6M': 1.4, '1Y': 37.2 },
      priceHistory: { '1D': [399.34, 403.27, 402.89, 404.8, 408.39, 408.94, 408.52, 406.6, 407.98, 404.51, 407.19, 405.67, 403.17, 400.03, 398.67, 391.74, 385.82, 388.74, 382.27, 381.23, 382.34, 378.46, 377.86, 384.26], '1W': [405.89, 416.8, 404.09, 399.34, 384.26], '1M': [377.2, 385.51, 379.59, 378.08, 364.74, 364.78, 358.74, 336.59, 344.8, 360.54, 386.21, 406.51, 409.81, 436.29, 438.12, 411.92, 405.89, 416.8, 404.09, 399.34, 384.26], 'YTD': [374.84, 356, 419.07, 366.43, 348.36, 345, 376.7, 382.25, 370.97, 320.56, 316.14, 302.97, 324.54, 324.09, 326.08, 346.26, 369.67, 384.64, 383.44, 334.24, 372.45, 377.2, 364.78, 386.21, 411.92, 384.26], '6M': [378.97, 374.71, 374.83, 379.86, 362.2, 324.63, 367.81, 382.25, 370.97, 320.56, 316.14, 302.97, 324.54, 327.58, 321.33, 365.35, 364.32, 372.16, 386.37, 334.24, 372.45, 377.2, 364.78, 386.21, 411.92, 384.26], '1Y': [279.99, 272.15, 264.78, 339.24, 373.36, 378.67, 380.61, 368.16, 378.79, 377.76, 402.65, 408.09, 416.94, 426.99, 445.84, 415.81, 382.09, 394, 395.25, 374.55, 374.8, 378.99, 365.46, 358.5, 351.96, 383.58, 374.84, 356, 419.07, 366.43, 348.36, 345, 376.7, 367.84, 353.24, 335.11, 316.14, 302.97, 324.54, 324.09, 326.08, 346.26, 369.67, 384.64, 383.44, 324.21, 372.45, 377.2, 364.78, 386.21, 411.92, 384.26] },
      velocityScore: { '1D': -2.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: null, revenueGrowth: 97, eps: -0.52, grossMargin: 40, dividendYield: null,
      etfPresence: { POW: 1.69, VOLT: false, PBD: false, PBW: false, IVEP: 2.82 },
      tonyNote: 'Talen Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SO', name: 'Southern Co/The', easyScore: 2, avgWeight: 2.04, proScore: 0.82, coverage: 0.4,
      price: 95.71, weeklyPrices: [95.78, 95.91, 97.16, 96.75, 95.71], weeklyChange: -0.07, dayChange: -1.07, sortRank: 0, periodReturns: { '1M': 4, 'YTD': 9.8, '6M': 9.3, '1Y': 3.7 },
      priceHistory: { '1D': [96.75, 95.74, 95.87, 95.79, 95.97, 96.17, 96.32, 96.21, 96.43, 96.39, 96.51, 96.54, 96.49, 96.55, 96.62, 96.47, 96.39, 96.5, 96.61, 96.44, 96.34, 96.29, 96.21, 95.71], '1W': [95.78, 95.91, 97.16, 96.75, 95.71], '1M': [89.03, 90.51, 90.49, 91.62, 92.6, 91.28, 92.95, 94.02, 93.27, 94, 93.82, 94.31, 92.53, 93.09, 93.43, 94.93, 95.78, 95.91, 97.16, 96.75, 95.71], 'YTD': [87.2, 87.22, 88.78, 87.54, 89.31, 90.08, 94.95, 94.3, 97.38, 97.48, 98.01, 93.39, 95.55, 96.94, 95.93, 93.51, 93.77, 95.99, 93.1, 92.55, 94.55, 89.03, 91.28, 93.82, 94.93, 95.71], '6M': [87.57, 86.27, 88.42, 87.51, 89.14, 91.08, 92.56, 94.3, 97.38, 97.48, 98.01, 93.39, 95.55, 97.45, 97.15, 94.51, 93.49, 96.71, 91.8, 92.55, 94.55, 89.03, 91.28, 93.82, 94.93, 95.71], '1Y': [92.3, 91.96, 93.3, 95.13, 94.9, 94.68, 93.96, 94.18, 93.09, 91.66, 91.56, 91.63, 94.41, 94.8, 96.18, 99.72, 97, 93.91, 92.73, 91.14, 90.69, 89.29, 87.98, 84.08, 87.03, 87.17, 87.2, 87.22, 88.78, 87.54, 89.31, 90.08, 94.95, 95.18, 97.23, 97.25, 98.01, 93.39, 95.55, 96.94, 95.93, 93.51, 93.77, 95.99, 93.1, 93.71, 94.55, 89.03, 91.28, 93.82, 94.93, 95.71] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$108B', pe: 24.5, revenueGrowth: 8, eps: 3.91, grossMargin: 48, dividendYield: 3.14,
      etfPresence: { POW: 0.31, VOLT: false, PBD: false, PBW: false, IVEP: 3.78 },
      tonyNote: 'Southern Co/The appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 5.23, proScore: 2.09, coverage: 0.4,
      price: 1064.9, weeklyPrices: [994.45, 1057.01, 997.47, 1033.19, 1064.90], weeklyChange: 7.08, dayChange: 3.07, sortRank: 0, periodReturns: { '1M': 21.6, 'YTD': 85.9, '6M': 84.4, '1Y': 172.4 },
      priceHistory: { '1D': [1033.19, 1046.05, 1058.66, 1057, 1064.16, 1064.73, 1071.77, 1066.44, 1063.6, 1063.82, 1064.63, 1065, 1064.99, 1069.28, 1072.26, 1068.23, 1067.95, 1065.69, 1068.65, 1069.59, 1070.97, 1069.19, 1064.9, 1064.9], '1W': [994.45, 1057.01, 997.47, 1033.19, 1064.9], '1M': [865.36, 909.81, 926.18, 940.48, 904.28, 915.64, 914.7, 856.16, 897.63, 910.57, 933.93, 945.46, 955.92, 985.82, 1022.28, 984.24, 994.45, 1057.01, 997.47, 1033.19, 1064.9], 'YTD': [572.87, 608.13, 647.18, 626.62, 657.36, 726.2, 774.2, 759.74, 742.83, 680.9, 693.99, 680.88, 695.4, 721.24, 791.73, 798.4, 828.79, 874.78, 926.79, 888.31, 879.89, 865.36, 915.64, 933.93, 984.24, 1064.9], '6M': [577.39, 596.52, 638.75, 648.41, 665.24, 678.31, 758.29, 759.74, 742.83, 680.9, 693.99, 680.88, 695.4, 717.22, 790.66, 794.65, 830.79, 889.67, 897.45, 888.31, 879.89, 865.36, 915.64, 933.93, 984.24, 1064.9], '1Y': [390.92, 402.18, 412.88, 427.59, 434.12, 427.72, 412.71, 416.09, 431.26, 415.12, 422.91, 450.66, 469.79, 480.82, 502.12, 534.05, 524.65, 524.47, 547.58, 567.93, 546.88, 566.61, 591.49, 615.35, 561.89, 583.76, 572.87, 608.13, 647.18, 626.62, 657.36, 726.2, 774.2, 756.47, 752.32, 704.82, 693.99, 680.88, 695.4, 721.24, 791.73, 798.4, 828.79, 874.78, 926.79, 863.95, 879.89, 865.36, 915.64, 933.93, 984.24, 1064.9] },
      velocityScore: { '1D': 0, '1W': 1, '1M': -32.4, '6M': null }, isNew: false,
      marketCap: '$490B', pe: 53.1, revenueGrowth: 22, eps: 20.04, grossMargin: 29, dividendYield: 0.63,
      etfPresence: { AIRR: false, PRN: 3.57, RSHO: 6.89, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 4.98, proScore: 1.99, coverage: 0.4,
      price: 839.36, weeklyPrices: [867.23, 881.92, 804.76, 813.77, 839.36], weeklyChange: -3.21, dayChange: 3.14, sortRank: 0, periodReturns: { '1M': -2.5, 'YTD': 174.1, '6M': 172.8, '1Y': 277.2 },
      priceHistory: { '1D': [813.77, 815.01, 831.21, 822.99, 826.68, 834.9, 836.89, 839.07, 837.91, 834.01, 832.76, 836.91, 833.68, 831.56, 827.61, 827.71, 833.3, 839.03, 836.77, 836.22, 840.91, 843.96, 842.41, 839.36], '1W': [867.23, 881.92, 804.76, 813.77, 839.36], '1M': [845.39, 875.52, 957.03, 993.74, 882.43, 891.86, 842.01, 770.25, 838.55, 858.99, 866.67, 857.76, 838.21, 861.88, 932.75, 892.25, 867.23, 881.92, 804.76, 813.77, 839.36], 'YTD': [306.23, 297.62, 336.31, 351.39, 357.91, 401.29, 437.77, 435.5, 428.13, 395.11, 398.12, 401.61, 420.24, 393.71, 459.02, 472.9, 505.45, 529.49, 868.18, 848.84, 732.94, 845.39, 891.86, 866.67, 892.25, 839.36], '6M': [307.68, 312.24, 319.27, 364.25, 379.23, 365.07, 431.43, 435.5, 428.13, 395.11, 398.12, 401.61, 420.24, 416.34, 446.36, 463.65, 497.18, 532.67, 844.8, 848.84, 732.94, 845.39, 891.86, 866.67, 892.25, 839.36], '1Y': [222.54, 233.39, 243.23, 253.14, 263.35, 299.42, 308.4, 276.02, 292.95, 273.82, 301.13, 320.94, 344.05, 337.93, 366.99, 365.39, 364.32, 379.89, 382.57, 381.22, 333.88, 332.96, 323.46, 331.61, 283.57, 314, 306.23, 297.62, 336.31, 351.39, 357.91, 401.29, 437.77, 434.64, 432.87, 411.38, 398.12, 401.61, 420.24, 393.71, 459.02, 472.9, 505.45, 529.49, 868.18, 770.76, 732.94, 845.39, 891.86, 866.67, 892.25, 839.36] },
      velocityScore: { '1D': -0.5, '1W': -11.2, '1M': -41.6, '6M': null }, isNew: false,
      marketCap: '$26B', pe: 74.7, revenueGrowth: 92, eps: 11.23, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 5.88, PRN: 4.08, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 4.9, proScore: 1.96, coverage: 0.4,
      price: 286.36, weeklyPrices: [294.49, 309.20, 279.77, 281.09, 286.36], weeklyChange: -2.76, dayChange: 1.87, sortRank: 0, periodReturns: { '1M': 0.7, 'YTD': 169.5, '6M': 162.3, '1Y': 309 },
      priceHistory: { '1D': [281.09, 285.2, 287.14, 284.16, 284.33, 284.11, 285.64, 283.98, 281.73, 279.48, 279.42, 280.81, 282.19, 282.5, 283.08, 284.34, 285.28, 284.88, 286.7, 285.83, 287.65, 287.94, 286.53, 286.36], '1W': [294.49, 309.2, 279.77, 281.09, 286.36], '1M': [288.12, 299.07, 299.73, 300.06, 284.87, 293.6, 283.51, 262.34, 290.5, 294.75, 303.53, 292.7, 294.03, 297.2, 307.8, 291.5, 294.49, 309.2, 279.77, 281.09, 286.36], 'YTD': [106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 182.27, 174.53, 161.22, 167.57, 172, 179.35, 186.72, 228.99, 241.65, 260.52, 269.95, 322.05, 292.65, 279.22, 288.12, 293.6, 303.53, 291.5, 286.36], '6M': [109.16, 118.62, 133.76, 142.29, 152.31, 179.6, 197.63, 182.27, 174.53, 161.22, 167.57, 172, 179.35, 182.6, 230.94, 241.01, 252.76, 275.33, 309.39, 292.65, 279.22, 288.12, 293.6, 303.53, 291.5, 286.36], '1Y': [70.01, 70.64, 72.53, 78.32, 76.88, 75.95, 90.06, 84.7, 91.08, 85.72, 92.33, 97.11, 97.88, 105.74, 105.13, 109.92, 116.11, 128.09, 126.71, 121.07, 107.22, 104.18, 107.83, 119.95, 105.77, 112.06, 106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 181.38, 177.5, 173.36, 167.57, 172, 179.35, 186.72, 228.99, 241.65, 260.52, 269.95, 322.05, 266.8, 279.22, 288.12, 293.6, 303.53, 291.5, 286.36] },
      velocityScore: { '1D': 0, '1W': -2, '1M': -40.8, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 55.9, revenueGrowth: 7, eps: 5.12, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { AIRR: 2.47, PRN: false, RSHO: 7.33, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, avgWeight: 4.85, proScore: 1.94, coverage: 0.4,
      price: 798.55, weeklyPrices: [732.24, 753.07, 765.46, 791.56, 798.55], weeklyChange: 9.06, dayChange: 0.88, sortRank: 0, periodReturns: { '1M': 19.7, 'YTD': 154.9, '6M': 153.2, '1Y': 291.9 },
      priceHistory: { '1D': [791.56, 794, 804.3, 796.19, 798.37, 795.39, 798.77, 800.34, 797, 799.64, 798.33, 797.72, 794.55, 795.69, 796, 797.63, 791.72, 791.98, 790.03, 790, 786.55, 789.7, 792.23, 798.55], '1W': [732.24, 753.07, 765.46, 791.56, 798.55], '1M': [646.89, 663.14, 686.37, 689.43, 694.72, 619.98, 613.93, 588.9, 623.66, 641.68, 688.87, 690.39, 719.52, 738.85, 790, 736.77, 732.24, 753.07, 765.46, 791.56, 798.55], 'YTD': [313.32, 313.98, 329.66, 363.88, 347.11, 352.09, 409.95, 437.61, 451.25, 414.2, 458.31, 473.85, 566.62, 572.31, 598.44, 611.21, 660.85, 697.15, 683.52, 722.31, 656.35, 646.89, 619.98, 688.87, 736.77, 798.55], '6M': [315.44, 337.03, 317.76, 380.36, 355.51, 345.97, 413.65, 437.61, 451.25, 414.2, 458.31, 473.85, 566.62, 575.16, 603.84, 597.88, 652.99, 702.27, 680.26, 722.31, 656.35, 646.89, 619.98, 688.87, 736.77, 798.55], '1Y': [203.78, 206.63, 213.25, 216.2, 240.5, 229.9, 239.05, 213.76, 230.02, 227.03, 225.82, 239.42, 260.56, 279.62, 281.67, 312.5, 281, 292.46, 303.2, 347.88, 344.36, 373.29, 351.09, 325.77, 296.56, 328.26, 313.32, 313.98, 329.66, 363.88, 347.11, 352.09, 409.95, 441.71, 445.36, 466.38, 458.31, 473.85, 566.62, 572.31, 598.44, 611.21, 660.85, 697.15, 683.52, 664.76, 656.35, 646.89, 619.98, 688.87, 736.77, 798.55] },
      velocityScore: { '1D': 1.6, '1W': 2.1, '1M': -26.5, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 70, revenueGrowth: 50, eps: 11.4, grossMargin: 21, dividendYield: 0.25,
      etfPresence: { AIRR: 4.74, PRN: 4.96, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Argan Inc is an engineering and construction company for power generation facilities — natural gas and renewable power plants. It appears in Industrials ETFs because power plant construction is one of the fastest-growing categories in U.S. infrastructure spending, driven by data center load additions that the grid cannot currently support.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.56, proScore: 1.82, coverage: 0.4,
      price: 1981.95, weeklyPrices: [1954.47, 2017.57, 1854.23, 1948.69, 1981.95], weeklyChange: 1.41, dayChange: 1.71, sortRank: 0, periodReturns: { '1M': 8.4, 'YTD': 112.4, '6M': 109.3, '1Y': 279.9 },
      priceHistory: { '1D': [1948.69, 1961.5, 1970.03, 1956.4, 1962.11, 1980.96, 1994.6, 1994.22, 1991.82, 1982.92, 1983.36, 1978.24, 1969.06, 1967.54, 1970.89, 1965.86, 1964.74, 1964.62, 1969.18, 1968.06, 1974.1, 1972.78, 1979.97, 1981.95], '1W': [1954.47, 2017.57, 1854.23, 1948.69, 1981.95], '1M': [1787.88, 1883.26, 1850.04, 1914.65, 1843.94, 1852.03, 1831.56, 1719.48, 1843.42, 1877.61, 1952.02, 1913.94, 1931.77, 1967.41, 2066.51, 1908.07, 1954.47, 2017.57, 1854.23, 1948.69, 1981.95], 'YTD': [933.29, 971.49, 1091.04, 1121.44, 1142.1, 1230.26, 1337.95, 1462.23, 1429.37, 1279.06, 1365.34, 1356.75, 1366.77, 1434.09, 1627.81, 1680.09, 1794.04, 1891.95, 2032.98, 1992.74, 1828.25, 1787.88, 1852.03, 1952.02, 1908.07, 1981.95], '6M': [946.93, 1035.12, 1053.1, 1131.7, 1171.46, 1147.97, 1300.02, 1462.23, 1429.37, 1279.06, 1365.34, 1356.75, 1366.77, 1417.19, 1592.84, 1650.47, 1726.12, 1867.02, 1952.37, 1992.74, 1828.25, 1787.88, 1852.03, 1952.02, 1908.07, 1981.95], '1Y': [521.66, 535.02, 546.63, 547.91, 702.97, 690.45, 718.61, 683.93, 707.39, 700.69, 752.1, 762.91, 791.46, 834.33, 844.62, 837.11, 829.36, 980.97, 955.96, 954.53, 920.99, 957.04, 949.3, 1021.36, 883.79, 958.07, 933.29, 971.49, 1091.04, 1121.44, 1142.1, 1230.26, 1337.95, 1413.57, 1438.24, 1372.4, 1365.34, 1356.75, 1366.77, 1434.09, 1627.81, 1680.09, 1794.04, 1891.95, 2032.98, 1854.43, 1828.25, 1787.88, 1852.03, 1952.02, 1908.07, 1981.95] },
      velocityScore: { '1D': 2.8, '1W': -3.7, '1M': -34.1, '6M': null }, isNew: false,
      marketCap: '$70B', pe: 57.1, revenueGrowth: 1, eps: 34.69, grossMargin: 25, dividendYield: 0.13,
      etfPresence: { AIRR: 4.39, PRN: 4.73, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.92, proScore: 1.57, coverage: 0.4,
      price: 338.15, weeklyPrices: [333.78, 343.54, 337.08, 334.16, 338.15], weeklyChange: 1.31, dayChange: 1.19, sortRank: 0, periodReturns: { '1M': 11.3, 'YTD': 31.7, '6M': 29.5, '1Y': 39.7 },
      priceHistory: { '1D': [334.16, 336.6, 335.39, 336.29, 337.21, 338.05, 339.21, 338.45, 337.73, 337.01, 337.37, 338.03, 337.7, 337.7, 338.83, 339.31, 338.94, 339.11, 339.3, 339.13, 339.8, 340.05, 338.72, 338.15], '1W': [333.78, 343.54, 337.08, 334.16, 338.15], '1M': [300.98, 308.31, 313.39, 313.67, 315.29, 314.42, 322.81, 314.08, 318.89, 320.11, 316.18, 324.38, 329.89, 337.96, 338.07, 330.9, 333.78, 343.54, 337.08, 334.16, 338.15], 'YTD': [256.77, 264.62, 282.47, 280.14, 260.41, 291.74, 279.84, 281.97, 282.58, 267.78, 255.65, 253.77, 260.67, 269.55, 293.26, 293.92, 298.1, 303.99, 310.55, 307.17, 307.1, 300.98, 314.42, 316.18, 330.9, 338.15], '6M': [261.16, 260.8, 277.62, 282.33, 259.51, 287.03, 279.03, 281.97, 282.58, 267.78, 255.65, 253.77, 260.67, 267.12, 289.01, 291.03, 293.35, 302.99, 308.87, 307.17, 307.1, 300.98, 314.42, 316.18, 330.9, 338.15], '1Y': [242.14, 251.4, 255.52, 267.01, 273.62, 264.97, 270.68, 262.92, 266.99, 261.53, 263.45, 259.5, 259.37, 257.98, 255.19, 247.97, 258.78, 258.03, 256.47, 255.53, 242.61, 255.78, 260.88, 264.32, 256.73, 264.33, 256.77, 264.62, 282.47, 280.14, 260.41, 291.74, 279.84, 278.74, 283.54, 267.57, 255.65, 253.77, 260.67, 269.55, 293.26, 293.92, 298.1, 303.99, 310.55, 305.22, 307.1, 300.98, 314.42, 316.18, 330.9, 338.15] },
      velocityScore: { '1D': -0.6, '1W': 0, '1M': -26.6, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 31.9, revenueGrowth: 7, eps: 10.59, grossMargin: 30, dividendYield: 0.61,
      etfPresence: { AIRR: 1.8, PRN: false, RSHO: 6.04, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MTZ', name: 'MasTec, Inc.', easyScore: 2, avgWeight: 3.85, proScore: 1.54, coverage: 0.4,
      price: 416.06, weeklyPrices: [393.14, 403.57, 396.25, 429.09, 416.06], weeklyChange: 5.83, dayChange: -3.04, sortRank: 0, periodReturns: { '1M': 10, 'YTD': 91.4, '6M': 88.8, '1Y': 147.3 },
      priceHistory: { '1D': [429.09, 424.82, 426.61, 424.55, 423.93, 425.37, 423.33, 422.61, 421.29, 417.33, 416.6, 417.59, 414.75, 414.47, 415.13, 414.52, 413.61, 414.04, 414.7, 413.92, 415.68, 416.83, 416.48, 416.06], '1W': [393.14, 403.57, 396.25, 429.09, 416.06], '1M': [362.09, 366.3, 369.66, 374.73, 363.89, 361.7, 353.08, 335.58, 358.5, 362.97, 371.85, 369.35, 374.91, 379.66, 406.32, 390.44, 393.14, 403.57, 396.25, 429.09, 416.06], 'YTD': [217.37, 219.03, 235.89, 241.8, 240.48, 259.16, 269.53, 283.86, 298.02, 285.61, 290, 300.58, 316.01, 337.27, 365.55, 371.59, 385.89, 425.39, 421.37, 414.9, 382.11, 362.09, 361.7, 371.85, 390.44, 416.06], '6M': [220.33, 235.75, 226, 244.57, 245.08, 244.86, 265.29, 283.86, 298.02, 285.61, 290, 300.58, 316.01, 336.25, 361.22, 370.89, 376.12, 417.41, 414.29, 414.9, 382.11, 362.09, 361.7, 371.85, 390.44, 416.06], '1Y': [168.23, 169.32, 174.36, 182.39, 189.87, 183.11, 184.39, 175.26, 182.55, 179.5, 190.12, 193.35, 205.94, 215, 218.92, 204.56, 207.18, 212.04, 195.51, 197.6, 194.92, 205.87, 218.29, 228.8, 209.27, 223.5, 217.37, 219.03, 235.89, 241.8, 240.48, 259.16, 269.53, 278.49, 304.53, 297.81, 290, 300.58, 316.01, 337.27, 365.55, 371.59, 385.89, 425.39, 421.37, 385.58, 382.11, 362.09, 361.7, 371.85, 390.44, 416.06] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$33B', pe: 72.9, revenueGrowth: 35, eps: 5.71, grossMargin: 13, dividendYield: null,
      etfPresence: { AIRR: 4.36, PRN: 3.33, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'MasTec is an infrastructure construction company — fiber networks, power transmission, renewable energy installations. Revenue grew strongly as utility and telecom capex accelerated. The ETF weight in Industrials reflects MasTec\'s breadth across the electrification, connectivity, and clean energy build-outs that are reshaping U.S. infrastructure spending.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 2.81, proScore: 1.12, coverage: 0.4,
      price: 245.17, weeklyPrices: [237.22, 244.56, 231.87, 238.21, 245.17], weeklyChange: 3.35, dayChange: 2.92, sortRank: 0, periodReturns: { '1M': 13.2, 'YTD': 22.5, '6M': 20.5, '1Y': 45.1 },
      priceHistory: { '1D': [238.21, 237.35, 242.38, 241.99, 242.66, 242.4, 244.68, 244.95, 242.93, 243.68, 243.54, 244.2, 243.81, 244.14, 245.22, 245.17, 245.27, 244.79, 245.38, 245.2, 244.52, 244.86, 244.87, 245.17], '1W': [237.22, 244.56, 231.87, 238.21, 245.17], '1M': [220.92, 230.08, 234.08, 236.14, 227.8, 229.95, 228.01, 223.63, 233.49, 230.05, 237.06, 234.8, 235.29, 242.97, 246.41, 236.07, 237.22, 244.56, 231.87, 238.21, 245.17], 'YTD': [200.06, 207.44, 213.61, 211.03, 208.41, 222.32, 239, 242.29, 226.94, 204.62, 199.45, 186.77, 200, 196.9, 221.27, 217.61, 222.45, 201.12, 203.24, 200.99, 207.8, 220.92, 229.95, 237.06, 236.07, 245.17], '6M': [203.51, 208, 209.78, 217.13, 211.84, 218.02, 230.92, 242.29, 226.94, 204.62, 199.45, 186.77, 200, 197.29, 215.97, 223.52, 222.82, 208.13, 202.84, 200.99, 207.8, 220.92, 229.95, 237.06, 236.07, 245.17], '1Y': [168.95, 172.78, 175.13, 175.58, 181.26, 203.53, 191.17, 188, 192.05, 182.65, 188, 184.91, 182.39, 185.92, 188.45, 185.21, 191.84, 197.07, 213.49, 221.42, 204.36, 215.7, 209.57, 217.69, 207.33, 208.48, 200.06, 207.44, 213.61, 211.03, 208.41, 222.32, 239, 237.18, 225.02, 209.8, 199.45, 186.77, 200, 196.9, 221.27, 217.61, 222.45, 201.12, 203.24, 200.47, 207.8, 220.92, 229.95, 237.06, 236.07, 245.17] },
      velocityScore: { '1D': 0, '1W': -0.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 46.8, revenueGrowth: 17, eps: 5.24, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.66, PRN: false, RSHO: 3.96, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 2, avgWeight: 2.3, proScore: 0.92, coverage: 0.4,
      price: 194.65, weeklyPrices: [205.65, 204.77, 197.91, 189.25, 194.65], weeklyChange: -5.35, dayChange: 2.85, sortRank: 0, periodReturns: { '1M': -0.6, 'YTD': 12.6, '6M': 11.6, '1Y': 38.7 },
      priceHistory: { '1D': [189.25, 192.51, 192.52, 193.63, 192.99, 190.95, 191.15, 191.78, 191.21, 190.55, 190.21, 190, 190.19, 190.8, 191.25, 190.54, 190.9, 191.75, 192.82, 193.41, 193.4, 193.54, 194.05, 194.65], '1W': [205.65, 204.77, 197.91, 189.25, 194.65], '1M': [188.39, 187.26, 184.72, 190.76, 185.95, 187.46, 188.96, 183, 194.68, 193.45, 193.94, 196.93, 203.07, 205.4, 210, 209.89, 205.65, 204.77, 197.91, 189.25, 194.65], 'YTD': [172.84, 193.2, 213.25, 207.75, 205.43, 197.19, 200.4, 206.44, 205.98, 195.23, 194.13, 199.75, 202.59, 215.98, 232.83, 228.24, 222.07, 216.68, 210.8, 204.72, 202.91, 188.39, 187.46, 193.94, 209.89, 194.65], '6M': [174.36, 192.24, 204.08, 206.33, 210.18, 187.42, 196.9, 206.44, 205.98, 195.23, 194.13, 199.75, 202.59, 214.98, 229.57, 235.78, 223.15, 216.31, 205.33, 204.72, 202.91, 188.39, 187.46, 193.94, 209.89, 194.65], '1Y': [140.37, 137.56, 139.85, 143.37, 152.38, 179.74, 179.51, 165.76, 166.52, 160.95, 166.13, 168.38, 175.02, 187.18, 197.01, 203.82, 205.24, 207.62, 200.39, 195.65, 175.91, 175.26, 174.71, 179.65, 168.12, 177.18, 172.84, 193.2, 213.25, 207.75, 205.43, 197.19, 200.4, 198.38, 216.47, 200.39, 194.13, 199.75, 202.59, 215.98, 232.83, 228.24, 222.07, 216.68, 210.8, 201.94, 202.91, 188.39, 187.46, 193.94, 209.89, 194.65] },
      velocityScore: { '1D': -5.2, '1W': -8.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: 51.9, revenueGrowth: 26, eps: 3.75, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.92, PRN: false, RSHO: false, IDEF: 1.69, BILT: false },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 2, avgWeight: 1.74, proScore: 0.7, coverage: 0.4,
      price: 279.89, weeklyPrices: [279.62, 279.09, 281.99, 277.39, 279.89], weeklyChange: 0.1, dayChange: 0.9, sortRank: 0, periodReturns: { '1M': -9.2, 'YTD': -17.7, '6M': -18.2, '1Y': 13.6 },
      priceHistory: { '1D': [277.39, 278.78, 279.52, 279.71, 279.6, 278.2, 278.41, 279.12, 278.87, 278.7, 279.11, 278.76, 280.01, 280, 280.88, 280.42, 280.51, 281.59, 281.99, 282.42, 282.56, 281.89, 280.65, 279.89], '1W': [279.62, 279.09, 281.99, 277.39, 279.89], '1M': [296.41, 293.66, 287.54, 294.53, 293.04, 292.26, 297.52, 289.13, 300.95, 297.68, 299.66, 298.51, 296.89, 285.43, 278.19, 283.48, 279.62, 279.09, 281.99, 277.39, 279.89], 'YTD': [340.07, 378.47, 418.86, 418.58, 420.51, 397.77, 418.78, 437.57, 444.52, 429.11, 415.71, 407.98, 381.79, 407.66, 394.46, 392.19, 358.4, 363.37, 317.75, 326.17, 320.63, 296.41, 292.26, 299.66, 283.48, 279.89], '6M': [341.98, 356.45, 415.39, 424.14, 427.83, 369.38, 406.76, 437.57, 444.52, 429.11, 415.71, 407.98, 381.79, 396.62, 394.41, 394.81, 359.29, 360.6, 316.28, 326.17, 320.63, 296.41, 292.26, 299.66, 283.48, 279.89], '1Y': [246.31, 248.92, 253.82, 265.56, 258.52, 267.49, 268, 265.4, 271.74, 269.33, 271.93, 272.46, 277.51, 286.01, 290.83, 284.96, 287.53, 299.14, 315.9, 324.19, 309.16, 314.73, 309.23, 323.14, 321.29, 355.45, 340.07, 378.47, 418.86, 418.58, 420.51, 397.77, 418.78, 438.01, 453.73, 429.58, 415.71, 407.98, 381.79, 407.66, 394.46, 392.19, 358.4, 363.37, 317.75, 329.35, 320.63, 296.41, 292.26, 299.66, 283.48, 279.89] },
      velocityScore: { '1D': -2.8, '1W': 1.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 18.2, revenueGrowth: 13, eps: 15.4, grossMargin: 12, dividendYield: null,
      etfPresence: { AIRR: 2.45, PRN: false, RSHO: false, IDEF: 1.03, BILT: false },
      tonyNote: 'Huntington Ingalls Industries is the only builder of nuclear-powered aircraft carriers for the U.S. Navy. Revenue is government-contracted and predictable; the ETF allocation in Industrials reflects defense spending growth and the Navy\'s backlog of nuclear submarine and carrier construction. A steady-state quality compounder in a market structure with no competition.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 1.64, proScore: 0.66, coverage: 0.4,
      price: 74.34, weeklyPrices: [75.87, 77.53, 77.92, 75.06, 74.34], weeklyChange: -2.02, dayChange: -0.96, sortRank: 0, periodReturns: { '1M': 4.1, 'YTD': 23.7, '6M': 23.6, '1Y': 26.6 },
      priceHistory: { '1D': [75.06, 74.6, 74.77, 74.59, 74.69, 75.27, 75.5, 75.49, 75.5, 75.48, 75.49, 75.29, 75.04, 74.98, 74.78, 74.92, 74.89, 74.89, 74.83, 74.79, 74.71, 74.72, 74.66, 74.34], '1W': [75.87, 77.53, 77.92, 75.06, 74.34], '1M': [70.04, 71.31, 71.66, 72.43, 71.96, 71.59, 71.59, 72.26, 71.62, 72.08, 71.49, 71.48, 71.25, 73.12, 74.95, 75.79, 75.87, 77.53, 77.92, 75.06, 74.34], 'YTD': [60.11, 61.15, 60.29, 64.96, 67.26, 66.92, 72.28, 72.98, 74.72, 74.24, 73.34, 72.41, 73.58, 72.59, 71.54, 70.91, 71.61, 75.41, 74.18, 77.72, 78.47, 70.04, 71.59, 71.49, 75.79, 74.34], '6M': [60.16, 60.39, 60.71, 63.72, 67.24, 67.42, 71.13, 72.98, 74.72, 74.24, 73.34, 72.41, 73.58, 72, 72.74, 71.15, 72.18, 75.54, 71.96, 77.72, 78.47, 70.04, 71.59, 71.49, 75.79, 74.34], '1Y': [58.72, 57.85, 58.48, 57.71, 59.24, 58.64, 57.76, 56.57, 57.13, 57.73, 58.76, 59.02, 62.86, 63.69, 63.5, 63.78, 62.34, 57.59, 56.51, 60.6, 59.17, 59.37, 61.55, 60.5, 58.84, 59.46, 60.11, 61.15, 60.29, 64.96, 67.26, 66.92, 72.28, 72.98, 76.26, 73.18, 73.34, 72.41, 73.58, 72.59, 71.54, 70.91, 71.61, 75.41, 74.18, 77.69, 78.47, 70.04, 71.59, 71.49, 75.79, 74.34] },
      velocityScore: { '1D': 15.8, '1W': 17.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$91B', pe: 32.6, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.8,
      etfPresence: { AIRR: false, PRN: false, RSHO: 0.92, IDEF: false, BILT: 2.36 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 2, avgWeight: 1.62, proScore: 0.65, coverage: 0.4,
      price: 49.86, weeklyPrices: [47.95, 46.32, 47.21, 46.95, 49.86], weeklyChange: 3.98, dayChange: 6.2, sortRank: 0, periodReturns: { '1M': -22.3, 'YTD': -34.3, '6M': -34.4, '1Y': 15.8 },
      priceHistory: { '1D': [46.95, 50.39, 50.69, 50.96, 50.39, 49.13, 49.06, 49.54, 49.21, 49.33, 49.46, 49.4, 49.63, 49.31, 49.61, 49.26, 49.39, 49.77, 49.58, 49.53, 49.69, 49.78, 49.81, 49.86], '1W': [47.95, 46.32, 47.21, 46.95, 49.86], '1M': [63.49, 63.27, 58.43, 63.4, 58.52, 57.73, 56.19, 54.82, 58.78, 57.75, 57.02, 56.34, 56.16, 54.21, 51.09, 50.8, 47.95, 46.32, 47.21, 46.95, 49.86], 'YTD': [75.91, 104.04, 124.56, 110.39, 103.01, 94.41, 89.06, 96.08, 86.18, 87, 87.53, 84.62, 71.94, 74.09, 73.55, 69.83, 63.16, 61.93, 56.99, 52.09, 56.18, 63.49, 57.73, 57.02, 50.8, 49.86], '6M': [75.98, 91.44, 121.5, 113.85, 108.16, 85.25, 87.05, 96.08, 86.18, 87, 87.53, 84.62, 71.94, 67.31, 70.34, 70.99, 61.26, 62.05, 57.89, 52.09, 56.18, 63.49, 57.73, 57.02, 50.8, 49.86], '1Y': [43.07, 46.02, 54.28, 58.78, 58.01, 58.93, 69.14, 64.02, 68.05, 64.5, 65.66, 75.74, 81.18, 92.96, 105.67, 90.58, 90.62, 89.78, 90.22, 76.59, 70.36, 75.05, 72.78, 76.91, 69.77, 79.97, 75.91, 104.04, 124.56, 110.39, 103.01, 94.41, 89.06, 94.31, 90.72, 92.47, 87.53, 84.62, 71.94, 74.09, 73.55, 69.83, 63.16, 61.93, 56.99, 54.22, 56.18, 63.49, 57.73, 57.02, 50.8, 49.86] },
      velocityScore: { '1D': -1.5, '1W': -7.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 293.3, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.31, PRN: false, RSHO: false, IDEF: 0.93, BILT: false },
      tonyNote: 'Kratos Defense is a defense technology company focused on unmanned systems, satellite communications, and high-performance computing for government customers. It appears in Industrials ETFs as an AI-adjacent defense name — autonomous systems and AI-driven surveillance are direct end markets. Revenue grew and the government contract backlog is expanding.',
    },
    {
      ticker: 'AIR', name: 'AIRBUS GROUP', easyScore: 2, avgWeight: 1.34, proScore: 0.54, coverage: 0.4,
      price: 142.93, weeklyPrices: [132.94, 138.51, 143.14, 141.85, 142.93], weeklyChange: 7.51, dayChange: 0.76, sortRank: 0, periodReturns: { '1M': 26.9, 'YTD': 72.6, '6M': 71.1, '1Y': 105.7 },
      priceHistory: { '1D': [141.85, 141.84, 141.48, 140.77, 140.25, 140.36, 140.56, 140.92, 140.22, 140.09, 140.26, 141.26, 140.85, 140.81, 141.01, 140.65, 140.71, 141.19, 140.92, 141.01, 141.87, 142.56, 142.27, 142.93], '1W': [132.94, 138.51, 143.14, 141.85, 142.93], '1M': [109.99, 110.61, 111.36, 115.53, 116.65, 114.72, 120.13, 117.36, 127.23, 129.01, 131.18, 129.96, 132.14, 134.88, 134.28, 132.26, 132.94, 138.51, 143.14, 141.85, 142.93], 'YTD': [82.79, 94.73, 105.74, 105.66, 105.91, 113.09, 112.98, 116.97, 117.17, 108.52, 101.91, 101.33, 107.25, 114, 123.77, 121.97, 110.2, 109.56, 117.57, 104.55, 108.41, 109.99, 114.72, 131.18, 132.26, 142.93], '6M': [83.52, 91.34, 101.08, 107.74, 106.67, 106.87, 113.22, 116.97, 117.17, 108.52, 101.91, 101.33, 107.25, 109.78, 120.83, 123.04, 110.54, 110.35, 117.78, 104.55, 108.41, 109.99, 114.72, 131.18, 132.26, 142.93], '1Y': [69.47, 73.26, 74.88, 79.45, 75.82, 72.08, 78.01, 73.85, 76.79, 75.68, 74.05, 74.76, 81.62, 84.34, 84.01, 82.79, 84.73, 84.56, 83.96, 83.84, 77.76, 82.51, 82.64, 82.25, 81.21, 86.03, 82.79, 94.73, 105.74, 105.66, 105.91, 113.09, 112.98, 116.69, 119.77, 107.87, 101.91, 101.33, 107.25, 114, 123.77, 121.97, 110.2, 109.56, 117.57, 103.79, 108.41, 109.99, 114.72, 131.18, 132.26, 142.93] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: 31.4, revenueGrowth: 25, eps: 4.55, grossMargin: 19, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 2.5, BILT: false },
      tonyNote: 'AIRBUS GROUP appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RBC', name: 'RBC Bearings Incorporated', easyScore: 2, avgWeight: 1.19, proScore: 0.47, coverage: 0.4,
      price: 644.06, weeklyPrices: [638.94, 648.89, 630.36, 634.78, 644.06], weeklyChange: 0.8, dayChange: 1.46, sortRank: 0, periodReturns: { '1M': 12.6, 'YTD': 43.6, '6M': 42.2, '1Y': 68.9 },
      priceHistory: { '1D': [634.78, 640, 642.19, 639.57, 642.13, 645.17, 647, 645.96, 643.73, 642.53, 642.68, 639.66, 640.07, 639.3, 641.07, 640.29, 639.86, 641.32, 640.16, 640.99, 641.68, 640.5, 643.45, 644.06], '1W': [638.94, 648.89, 630.36, 634.78, 644.06], '1M': [566.14, 578.34, 584.18, 589.76, 590.09, 590.97, 592.41, 576.74, 607.46, 603.64, 616.95, 621.08, 625.73, 639.18, 645.73, 633.44, 638.94, 648.89, 630.36, 634.78, 644.06], 'YTD': [448.43, 485, 497.06, 504.07, 499.67, 544.02, 552.44, 559.18, 575.92, 552.91, 536.37, 531.11, 532.25, 552.4, 595.74, 596.86, 591, 593.12, 613.59, 569.06, 559.95, 566.14, 590.97, 616.95, 633.44, 644.06], '6M': [452.89, 467.37, 489.33, 504.99, 511.98, 520.16, 550.4, 559.18, 575.92, 552.91, 536.37, 531.11, 532.25, 548.11, 598.3, 589.77, 589.51, 595.76, 605.99, 569.06, 559.95, 566.14, 590.97, 616.95, 633.44, 644.06], '1Y': [381.43, 379.82, 389.57, 389.3, 384.87, 404.38, 404.99, 397.81, 399, 383.6, 378.08, 379.79, 378.54, 384.8, 382.19, 372.71, 392.33, 408.15, 427.24, 442.47, 423.39, 442.95, 438.15, 447.58, 444.99, 458.38, 448.43, 485, 497.06, 504.07, 499.67, 544.02, 552.44, 562.54, 584.89, 565.64, 536.37, 531.11, 532.25, 552.4, 595.74, 596.86, 591, 593.12, 613.59, 551.12, 559.95, 566.14, 590.97, 616.95, 633.44, 644.06] },
      velocityScore: { '1D': -2.1, '1W': -2.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$20B', pe: 70.9, revenueGrowth: 18, eps: 9.08, grossMargin: 45, dividendYield: null,
      etfPresence: { AIRR: 1.85, PRN: false, RSHO: false, IDEF: 0.52, BILT: false },
      tonyNote: 'RBC Bearings Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRCY', name: 'Mercury Systems, Inc.', easyScore: 2, avgWeight: 1.08, proScore: 0.43, coverage: 0.4,
      price: 122.33, weeklyPrices: [105.00, 105.57, 109.38, 110.22, 122.33], weeklyChange: 16.5, dayChange: 10.99, sortRank: 0, periodReturns: { '1M': 9.5, 'YTD': 67.6, '6M': 65.6, '1Y': 141.6 },
      priceHistory: { '1D': [110.22, 112.98, 115.92, 117.68, 116.14, 115.56, 115.89, 116.26, 116.01, 115.91, 116.08, 115.94, 115.74, 115.89, 116.37, 117.15, 117.39, 117.55, 117.39, 119.98, 121.16, 120.73, 122.29, 122.33], '1W': [105, 105.57, 109.38, 110.22, 122.33], '1M': [111.28, 112.87, 111.59, 117.82, 111.27, 110.94, 108.82, 106.81, 119.32, 120.3, 115.93, 112.44, 115.5, 113.91, 111.76, 110.87, 105, 105.57, 109.38, 110.22, 122.33], 'YTD': [73.01, 88.74, 102.95, 99.05, 93.88, 82.2, 82.36, 87.63, 89.03, 86.42, 78.16, 77.26, 71.4, 75.76, 82.52, 84.12, 77.06, 78.53, 91.95, 92.03, 98.55, 111.28, 110.94, 115.93, 110.87, 122.33], '6M': [73.85, 84.8, 98.62, 99.48, 98.29, 79.07, 80.25, 87.63, 89.03, 86.42, 78.16, 77.26, 71.4, 74.22, 79.6, 84.05, 77.99, 78.55, 90.34, 92.03, 98.55, 111.28, 110.94, 115.93, 110.87, 122.33], '1Y': [50.63, 52.4, 51.68, 52.91, 53, 53.93, 68.02, 64.22, 67.64, 67.47, 71.7, 73.82, 74.27, 81.18, 83.92, 78.15, 78.81, 77.6, 75.71, 72.74, 67.94, 69.05, 70.23, 75.19, 69.63, 74.7, 73.01, 88.74, 102.95, 99.05, 93.88, 82.2, 82.36, 85.9, 91.01, 89.36, 78.16, 77.26, 71.4, 75.76, 82.52, 84.12, 77.06, 78.53, 91.95, 93.39, 98.55, 111.28, 110.94, 115.93, 110.87, 122.33] },
      velocityScore: { '1D': 0, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 12, eps: -0.23, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: 1.13, PRN: false, RSHO: false, IDEF: 1.03, BILT: false },
      tonyNote: 'Mercury Systems, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, avgWeight: 0.99, proScore: 0.4, coverage: 0.4,
      price: 49.92, weeklyPrices: [44.84, 46.27, 46.42, 47.10, 49.92], weeklyChange: 11.33, dayChange: 5.99, sortRank: 0, periodReturns: { '1M': -13.2, 'YTD': -31.8, '6M': -33.1, '1Y': 11.2 },
      priceHistory: { '1D': [47.1, 49.31, 50.1, 50.78, 50.42, 49.89, 49.85, 50.21, 50.05, 49.99, 50.1, 49.83, 49.82, 49.89, 49.99, 50.13, 50.03, 50.22, 50.24, 50.18, 49.9, 49.67, 49.71, 49.92], '1W': [44.84, 46.27, 46.42, 47.1, 49.92], '1M': [53.65, 54.65, 51.84, 54.39, 49.44, 49.64, 48.37, 45.87, 49.58, 47.83, 48.27, 51.7, 52.03, 50.37, 47.7, 46.38, 44.84, 46.27, 46.42, 47.1, 49.92], 'YTD': [73.17, 101.28, 109.49, 108.22, 103.8, 95.36, 75.79, 81.62, 88.11, 100.54, 99.98, 99.38, 84.07, 86.1, 87.79, 82.69, 71.95, 65.32, 58.82, 62.77, 64.1, 53.65, 49.64, 48.27, 46.38, 49.92], '6M': [74.62, 91.72, 108.01, 111.61, 110.93, 89.78, 78.71, 81.62, 88.11, 100.54, 99.98, 99.38, 84.07, 85.83, 82.52, 83.58, 70.22, 65.73, 60.84, 62.77, 64.1, 53.65, 49.64, 48.27, 46.38, 49.92], '1Y': [44.91, 47.57, 53.74, 49.1, 50.39, 48.6, 49.03, 49.87, 54.69, 53.26, 62.22, 64.11, 66.91, 73.47, 76.6, 75.96, 78.99, 85.34, 84.7, 69.38, 58.95, 64.96, 66.08, 67.27, 64.94, 80.81, 73.17, 101.28, 109.49, 108.22, 103.8, 95.36, 75.79, 81.27, 93.04, 106.09, 99.98, 99.38, 84.07, 86.1, 87.79, 82.69, 71.95, 65.32, 58.82, 66.21, 64.1, 53.65, 49.64, 48.27, 46.38, 49.92] },
      velocityScore: { '1D': 0, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: 217, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.8, PRN: false, RSHO: false, IDEF: 0.19, BILT: false },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DRS', name: 'Leonardo DRS, Inc.', easyScore: 2, avgWeight: 0.52, proScore: 0.21, coverage: 0.4,
      price: 42.67, weeklyPrices: [44.69, 44.36, 42.48, 40.95, 42.67], weeklyChange: -4.52, dayChange: 4.2, sortRank: 0, periodReturns: { '1M': -12.5, 'YTD': 25.2, '6M': 25.2, '1Y': -5.4 },
      priceHistory: { '1D': [40.95, 42.17, 42.22, 42.38, 41.99, 41.78, 41.95, 41.92, 41.75, 41.59, 41.58, 41.54, 41.65, 42.06, 42.21, 42.12, 42.09, 42.33, 42.25, 42.42, 42.38, 42.24, 42.37, 42.67], '1W': [44.69, 44.36, 42.48, 40.95, 42.67], '1M': [47.96, 47.39, 45.61, 46.71, 46.15, 46.55, 47.35, 46.11, 49.69, 48.53, 46.68, 45.59, 46.58, 46.08, 44.99, 45.74, 44.69, 44.36, 42.48, 40.95, 42.67], 'YTD': [34.09, 38.84, 42.26, 40.99, 41.06, 38.93, 38.13, 40.03, 43.39, 46.58, 45.3, 43.82, 44.84, 46.73, 47.43, 44.24, 40.72, 40, 41.49, 41.5, 44.92, 47.96, 46.55, 46.68, 45.74, 42.67], '6M': [34.09, 37.2, 41.42, 41.28, 41.3, 37.27, 37.77, 40.03, 43.39, 46.58, 45.3, 43.82, 44.84, 46.3, 46.06, 44.57, 39.98, 40.03, 41.36, 41.5, 44.92, 47.96, 46.55, 46.68, 45.74, 42.67], '1Y': [45.09, 47.01, 48.01, 47.53, 43.24, 41.31, 41.87, 41.17, 41.93, 41.79, 41.14, 41.54, 42.55, 44.58, 45.43, 40.19, 40.35, 40.18, 36.15, 35.59, 34, 33.78, 33.79, 34.02, 32.55, 34.52, 34.09, 38.84, 42.26, 40.99, 41.06, 38.93, 38.13, 38.14, 45.49, 47.41, 45.3, 43.82, 44.84, 46.73, 47.43, 44.24, 40.72, 40, 41.49, 42.84, 44.92, 47.96, 46.55, 46.68, 45.74, 42.67] },
      velocityScore: { '1D': 0, '1W': -4.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 39.9, revenueGrowth: 6, eps: 1.07, grossMargin: 24, dividendYield: 0.88,
      etfPresence: { AIRR: 0.75, PRN: false, RSHO: false, IDEF: 0.28, BILT: false },
      tonyNote: 'Leonardo DRS, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TPC', name: 'Tutor Perini Corporation', easyScore: 2, avgWeight: 0.38, proScore: 0.15, coverage: 0.4,
      price: 82.97, weeklyPrices: [82.36, 81.56, 79.53, 81.88, 82.97], weeklyChange: 0.74, dayChange: 1.33, sortRank: 0, periodReturns: { '1M': 16.1, 'YTD': 23.8, '6M': 22.2, '1Y': 79 },
      priceHistory: { '1D': [81.88, 82.81, 81.94, 82.11, 82.61, 83.05, 83.24, 82.97, 82.72, 82.42, 82.32, 83.18, 83.2, 83.46, 83.9, 83.63, 83.38, 83.42, 83.38, 83.53, 83.7, 83.41, 83.26, 82.97], '1W': [82.36, 81.56, 79.53, 81.88, 82.97], '1M': [74.26, 74.29, 72.26, 72.38, 70.53, 72.13, 71.48, 68.72, 73.61, 74.92, 76.55, 76.19, 77.89, 77.99, 81.5, 81, 82.36, 81.56, 79.53, 81.88, 82.97], 'YTD': [67.02, 70.17, 75.17, 76.01, 78.89, 83.48, 82.74, 86.9, 75.37, 72.82, 67.76, 69.34, 76.15, 77.66, 83.8, 84.38, 87.5, 92.76, 82.79, 79.49, 72.76, 74.26, 72.13, 76.55, 81, 82.97], '6M': [67.92, 71.09, 73.89, 76.79, 79.86, 79.95, 81.73, 86.9, 75.37, 72.82, 67.76, 69.34, 76.15, 77.3, 83.35, 84.22, 86.76, 93.68, 82.85, 79.49, 72.76, 74.26, 72.13, 76.55, 81, 82.97], '1Y': [46.36, 47.45, 50.77, 49.17, 47.65, 47.28, 58.77, 56.02, 58.99, 59.03, 62.46, 63.62, 64.78, 63.75, 63.58, 63.3, 66.87, 68.4, 65.72, 62.63, 60.48, 65.16, 67.63, 67.56, 66.02, 68.93, 67.02, 70.17, 75.17, 76.01, 78.89, 83.48, 82.74, 84.99, 73.57, 72.04, 67.76, 69.34, 76.15, 77.66, 83.8, 84.38, 87.5, 92.76, 82.79, 75.43, 72.76, 74.26, 72.13, 76.55, 81, 82.97] },
      velocityScore: { '1D': 0, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 56.8, revenueGrowth: 12, eps: 1.46, grossMargin: 12, dividendYield: null,
      etfPresence: { AIRR: 0.71, PRN: false, RSHO: false, IDEF: 0.04, BILT: false },
      tonyNote: 'Tutor Perini Corporation appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TKR', name: 'TIMKEN CO/THE', easyScore: 1, avgWeight: 8.69, proScore: 1.74, coverage: 0.2,
      price: 145.32, weeklyPrices: [137.99, 144.01, 141.22, 143.50, 145.32], weeklyChange: 5.31, dayChange: 1.27, sortRank: 0, periodReturns: { '1M': 13.5, 'YTD': 72.7, '6M': 69.4, '1Y': 92.6 },
      priceHistory: { '1D': [143.5, 144.52, 144.72, 144.55, 145.5, 145.51, 146.26, 145.83, 145.42, 145.02, 145.56, 145.84, 145.53, 145.69, 145.87, 145.91, 145.71, 145.73, 145.71, 145.89, 145.84, 145.82, 145.43, 145.32], '1W': [137.99, 144.01, 141.22, 143.5, 145.32], '1M': [126.54, 131.9, 131.82, 133.66, 131.83, 134.67, 137.09, 132.39, 137.4, 137.06, 139.12, 140.28, 139.4, 142.36, 141.97, 137.64, 137.99, 144.01, 141.22, 143.5, 145.32], 'YTD': [84.13, 90.6, 93.73, 93.94, 93.19, 106.04, 107.84, 108.16, 108.38, 99.68, 97.54, 95.25, 97.56, 98.94, 106.9, 108.45, 108.7, 107.12, 117.39, 114.49, 119.95, 126.54, 134.67, 139.12, 137.64, 145.32], '6M': [85.81, 88.05, 91.91, 94.6, 94.15, 102.15, 107.35, 108.16, 108.38, 99.68, 97.54, 95.25, 97.56, 98.92, 106.75, 107.66, 107.2, 109, 117.97, 114.49, 119.95, 126.54, 134.67, 139.12, 137.64, 145.32], '1Y': [75.44, 77.68, 76.68, 80.99, 74.77, 73.57, 76.91, 76.88, 78.96, 75.12, 76.4, 77.11, 75.67, 75.11, 75.86, 74.7, 77.3, 77.22, 76.29, 78.2, 74.33, 81.22, 82.52, 87.53, 84.14, 86.02, 84.13, 90.6, 93.73, 93.94, 93.19, 106.04, 107.84, 107.83, 109.99, 100.58, 97.54, 95.25, 97.56, 98.94, 106.9, 108.45, 108.7, 107.12, 117.39, 112.73, 119.95, 126.54, 134.67, 139.12, 137.64, 145.32] },
      velocityScore: { '1D': 0, '1W': 0, '1M': -55.6, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 33, revenueGrowth: 8, eps: 4.41, grossMargin: 31, dividendYield: 1,
      etfPresence: { AIRR: false, PRN: false, RSHO: 8.69, IDEF: false, BILT: false },
      tonyNote: 'TIMKEN CO/THE appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RTX', name: 'RTX CORP', easyScore: 1, avgWeight: 8.4, proScore: 1.68, coverage: 0.2,
      price: 189.73, weeklyPrices: [185.06, 186.59, 187.99, 187.33, 189.73], weeklyChange: 2.52, dayChange: 1.28, sortRank: 0, periodReturns: { '1M': 5.6, 'YTD': 3.5, '6M': 3.1, '1Y': 31.6 },
      priceHistory: { '1D': [187.33, 188.2, 188.66, 188.49, 189.18, 189.04, 189.01, 189.48, 188.86, 188.5, 188.49, 188.35, 188.52, 188.6, 188.62, 187.9, 188.26, 188.51, 189.28, 189.59, 189.58, 189.06, 189.13, 189.73], '1W': [185.06, 186.59, 187.99, 187.33, 189.73], '1M': [174.41, 174.26, 172.55, 179.41, 180.99, 178.66, 181.56, 177.41, 184.21, 183.53, 183.64, 186.77, 192.58, 185.6, 181.83, 186.39, 185.06, 186.59, 187.99, 187.33, 189.73], 'YTD': [183.4, 187.17, 199.83, 195.93, 200.93, 198.66, 200.06, 204.92, 202.62, 209.76, 204.52, 198.16, 189.71, 198.41, 201.41, 195.79, 173.38, 172.9, 178.61, 171.18, 177.01, 174.41, 178.66, 183.64, 186.39, 189.73], '6M': [184.01, 185.73, 198.84, 196.34, 199.88, 195.97, 201.14, 204.92, 202.62, 209.76, 204.52, 198.16, 189.71, 196.21, 201.56, 196.42, 174.26, 173.99, 176.09, 171.18, 177.01, 174.41, 178.66, 183.64, 186.39, 189.73], '1Y': [144.19, 146.18, 150.17, 156.49, 158.4, 155.75, 155.49, 153.66, 159.57, 158.11, 155, 158.31, 161.38, 167.2, 168.57, 157, 173.04, 178.67, 175.61, 179.22, 174.72, 172.15, 168.45, 174.72, 177.2, 186.38, 183.4, 187.17, 199.83, 195.93, 200.93, 198.66, 200.06, 201.92, 212.16, 208.23, 204.52, 198.16, 189.71, 198.41, 201.41, 195.79, 173.38, 172.9, 178.61, 175.95, 177.01, 174.41, 178.66, 183.64, 186.39, 189.73] },
      velocityScore: { '1D': -1.2, '1W': 4.3, '1M': -46.3, '6M': null }, isNew: false,
      marketCap: '$256B', pe: 35.5, revenueGrowth: 9, eps: 5.34, grossMargin: 20, dividendYield: 1.56,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 8.4, BILT: false },
      tonyNote: 'RTX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 4.33, proScore: 4.33, coverage: 1,
      price: 276.17, weeklyPrices: [259.66, 256.63, 240.30, 261.15, 276.17], weeklyChange: 6.36, dayChange: 5.75, sortRank: 0, periodReturns: { '1M': 19.5, 'YTD': 229.9, '6M': 224.3, '1Y': 448.9 },
      priceHistory: { '1D': [261.15, 272.23, 279.25, 282.71, 287.89, 285.14, 288.2, 288.05, 282.2, 284.2, 282.34, 280.23, 281.01, 279.91, 280.35, 282.73, 281.44, 279.7, 278.39, 280.72, 278.96, 279.67, 278.43, 276.17], '1W': [259.66, 256.63, 240.3, 261.15, 276.17], '1M': [264.51, 260.58, 251.68, 259.67, 227.81, 218, 220.12, 211.69, 222.24, 232.36, 260.07, 265.1, 280.91, 286.69, 283.61, 275.25, 259.66, 256.63, 240.3, 261.15, 276.17], 'YTD': [83.71, 97.3, 103.89, 94.5, 85.19, 86.1, 98.01, 97.92, 91.19, 89.33, 112.95, 117.62, 100.82, 112.54, 154.56, 159.16, 144.96, 176.42, 186.1, 219.94, 214.77, 264.51, 218, 260.07, 275.25, 276.17], '6M': [85.17, 96.21, 101.98, 96.85, 94.91, 73.87, 89.73, 97.92, 91.19, 89.33, 112.95, 117.62, 100.82, 108.82, 144.97, 157.14, 147.16, 154.49, 177.05, 219.94, 214.77, 264.51, 218, 260.07, 275.25, 276.17], '1Y': [50.31, 46.05, 53.31, 51.88, 51.29, 55.09, 75.33, 67.19, 70.48, 65.65, 93.39, 94.08, 113.23, 115.61, 122, 125.83, 104.28, 121.83, 110.54, 102.22, 90.54, 88.88, 98.92, 93.59, 75.45, 91.13, 83.71, 97.3, 103.89, 94.5, 85.19, 86.1, 98.01, 100.61, 91.01, 94.94, 112.95, 117.62, 100.82, 112.54, 154.56, 159.16, 144.96, 176.42, 186.1, 199.86, 214.77, 264.51, 218, 260.07, 275.25, 276.17] },
      velocityScore: { '1D': 0.2, '1W': -20.8, '1M': 1.6, '6M': null }, isNew: false,
      marketCap: '$70B', pe: 106.6, revenueGrowth: 684, eps: 2.59, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 3.36, MEME: 5.89, RKNG: 3.74 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 3, avgWeight: 3.56, proScore: 3.56, coverage: 1,
      price: 1154.29, weeklyPrices: [1048.51, 1213.56, 1132.33, 1145.28, 1154.29], weeklyChange: 10.09, dayChange: 0.79, sortRank: 0, periodReturns: { '1M': 18.9, 'YTD': 304.4, '6M': 294.5, '1Y': 854.8 },
      priceHistory: { '1D': [1145.28, 1137.42, 1149.3, 1146.01, 1149.25, 1139.53, 1146.65, 1140.91, 1142.63, 1151.48, 1164.49, 1152.45, 1151.84, 1158.84, 1156.51, 1155.3, 1151.51, 1148.42, 1151.06, 1156.78, 1168.13, 1161.09, 1165.2, 1154.29], '1W': [1048.51, 1213.56, 1132.33, 1145.28, 1154.29], '1M': [1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 724.66, 751, 1035.5, 949.28, 1087.99, 1051.77, 1154.29], '6M': [292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 1035.5, 949.28, 1087.99, 1051.77, 1154.29], '1Y': [120.89, 122.24, 116.43, 109.83, 114.74, 108.78, 127.75, 122.05, 116.5, 118.72, 140, 159.99, 161.71, 182.15, 196.54, 191.94, 202.29, 221.91, 218.03, 241.11, 228.5, 224.53, 234.16, 263.71, 225.52, 286.68, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 751, 1035.5, 949.28, 1087.99, 1051.77, 1154.29] },
      velocityScore: { '1D': 3.8, '1W': 6.6, '1M': 6, '6M': null }, isNew: false,
      marketCap: '$1.3T', pe: 26.1, revenueGrowth: 346, eps: 44.21, grossMargin: 73, dividendYield: null,
      etfPresence: { BUZZ: 3.54, MEME: 2.93, RKNG: 4.2 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 3, avgWeight: 3.2, proScore: 3.2, coverage: 1,
      price: 37.3, weeklyPrices: [41.98, 40.95, 39.16, 37.77, 37.30], weeklyChange: -11.15, dayChange: -1.24, sortRank: 0, periodReturns: { '1M': -21.1, 'YTD': 52.1, '6M': 54.9, '1Y': 282.2 },
      priceHistory: { '1D': [37.77, 38.79, 38.7, 38.74, 39.33, 38.55, 38.45, 38.39, 37.99, 37.87, 37.55, 37.48, 37.84, 37.54, 37.54, 37.86, 37.95, 37.86, 37.51, 37.67, 37.8, 37.92, 37.87, 37.3], '1W': [41.98, 40.95, 39.16, 37.77, 37.3], '1M': [47.94, 47.86, 44.71, 44.15, 39.62, 40.94, 41.91, 38.92, 41.47, 42.7, 46.47, 46.27, 45.57, 46.59, 45.2, 45.27, 41.98, 40.95, 39.16, 37.77, 37.3], 'YTD': [24.52, 31.94, 35.22, 37.69, 33.88, 34.95, 35.28, 29.04, 27.27, 25.14, 27.05, 25.93, 23.76, 25.19, 27.6, 32.19, 33.67, 35.63, 44.59, 42.56, 45.87, 47.94, 40.94, 46.47, 45.27, 37.3], '6M': [24.08, 29.56, 36.1, 34.74, 38.07, 27.84, 36.17, 29.04, 27.27, 25.14, 27.05, 25.93, 23.76, 24.56, 26.26, 31.53, 34.98, 33.55, 41.25, 42.56, 45.87, 47.94, 40.94, 46.47, 45.27, 37.3], '1Y': [9.76, 9.51, 10.06, 10.93, 10.03, 14.79, 14.97, 15.34, 16.47, 14.38, 16.98, 19.83, 23.45, 25, 27.94, 37.76, 32.54, 34.33, 31.06, 28.57, 22.84, 23.74, 29.36, 30.99, 22, 25.72, 24.52, 31.94, 35.22, 37.69, 33.88, 34.95, 35.28, 30, 27.93, 27.03, 27.05, 25.93, 23.76, 25.19, 27.6, 32.19, 33.67, 35.63, 44.59, 39.14, 45.87, 47.94, 40.94, 46.47, 45.27, 37.3] },
      velocityScore: { '1D': -5.6, '1W': -21.4, '1M': -19, '6M': null }, isNew: false,
      marketCap: '$11B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 1.87, MEME: 4.47, RKNG: 3.25 },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 4.75, proScore: 3.16, coverage: 0.667,
      price: 302.7, weeklyPrices: [326.19, 309.18, 252.02, 275.01, 302.70], weeklyChange: -7.2, dayChange: 10.07, sortRank: 0, periodReturns: { '1M': 6.2, 'YTD': 248.4, '6M': 246.9, '1Y': 1267.8 },
      priceHistory: { '1D': [275.01, 289.14, 297.22, 293.76, 294.84, 292.3, 291.5, 291.94, 292.41, 294.24, 294.67, 300.92, 305.78, 303.12, 304, 304.99, 307.26, 306.11, 305.74, 305.24, 305.06, 304.14, 302.59, 302.7], '1W': [326.19, 309.18, 252.02, 275.01, 302.7], '1M': [273.51, 302.85, 287.32, 291.37, 263.61, 253.57, 259.61, 234.23, 248.88, 260.22, 274.5, 280.88, 284.99, 328.91, 345.85, 321.98, 326.19, 309.18, 252.02, 275.01, 302.7], 'YTD': [86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 147.55, 155.67, 135.19, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 288.64, 283.92, 275.95, 302.49, 273.51, 253.57, 274.5, 321.98, 302.7], '6M': [87.26, 108, 133.46, 145.63, 156.51, 136.6, 139.03, 147.55, 155.67, 135.19, 154.51, 150.12, 133.24, 135.63, 166.7, 207.86, 231.17, 290.52, 261.03, 275.95, 302.49, 273.51, 253.57, 274.5, 321.98, 302.7], '1Y': [22.13, 28.71, 24.69, 26.89, 37.62, 38.86, 41.25, 43.1, 49.94, 52.45, 62.96, 79.67, 69.18, 90.19, 87.58, 116.58, 104.38, 113.28, 129.05, 127.07, 104.97, 94.29, 102.5, 101.29, 76.97, 91.88, 86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 160.28, 166, 151.32, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 288.64, 283.92, 258.71, 302.49, 273.51, 253.57, 274.5, 321.98, 302.7] },
      velocityScore: { '1D': -1.6, '1W': -13.2, '1M': -22.4, '6M': null }, isNew: false,
      marketCap: '$86B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.48, RKNG: 4.01 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 2, avgWeight: 4.55, proScore: 3.04, coverage: 0.667,
      price: 638.72, weeklyPrices: [643.83, 675.39, 586.45, 651.88, 638.72], weeklyChange: -0.79, dayChange: -2.02, sortRank: 0, periodReturns: { '1M': 20.2, 'YTD': 270.8, '6M': 262.8, '1Y': 900.5 },
      priceHistory: { '1D': [651.88, 651.36, 659.09, 657.38, 661.01, 650.7, 647.63, 640.13, 641, 638.05, 642.48, 641.4, 639.4, 640.1, 635.56, 639.26, 640.74, 642.1, 641.15, 644.4, 639.59, 640.6, 638.99, 638.72], '1W': [643.83, 675.39, 586.45, 651.88, 638.72], '1M': [546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72], 'YTD': [172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 482.02, 484.28, 546.2, 526.93, 653.53, 670.75, 638.72], '6M': [176.06, 199.88, 215, 243.29, 278.41, 260.19, 284.1, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 294.97, 343.43, 372.52, 404, 431.52, 480, 482.02, 484.28, 546.2, 526.93, 653.53, 670.75, 638.72], '1Y': [63.84, 64.64, 66.53, 69.32, 71.43, 73.78, 75.91, 75.86, 79.71, 86, 95.02, 100.94, 109.69, 130.59, 121.18, 120.44, 121.41, 124.92, 152.18, 169.99, 152.86, 155.41, 155.59, 181.95, 166.26, 179.56, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 262.06, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 458.68, 484.28, 546.2, 526.93, 653.53, 670.75, 638.72] },
      velocityScore: { '1D': 4.1, '1W': -21.4, '1M': 22.1, '6M': null }, isNew: false,
      marketCap: '$220B', pe: 38.3, revenueGrowth: 46, eps: 16.69, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.02, RKNG: 4.09 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 4.49, proScore: 2.99, coverage: 0.667,
      price: 2273.73, weeklyPrices: [1914.46, 2335.00, 2090.71, 2050.39, 2273.73], weeklyChange: 18.77, dayChange: 10.89, sortRank: 0, periodReturns: { '1M': 34.1, 'YTD': 857.8, '6M': 846.5, '1Y': 4957.2 },
      priceHistory: { '1D': [2050.39, 2130.98, 2157.79, 2154, 2204.2, 2175, 2195.4, 2193, 2184.3, 2198.88, 2206, 2201.78, 2203.98, 2202.5, 2206.75, 2237.02, 2235.29, 2245.56, 2249, 2256.5, 2258.56, 2256.79, 2263.51, 2273.73], '1W': [1914.46, 2335, 2090.71, 2050.39, 2273.73], '1M': [1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73], 'YTD': [237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 649.97, 635.36, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1407.61, 1478.69, 1761.43, 1642, 2107.86, 1963.6, 2273.73], '6M': [240.22, 353.56, 387.81, 503.44, 539.3, 576.2, 630.29, 649.97, 635.36, 527.33, 661.62, 709.71, 615.83, 701.59, 851.77, 920.99, 989.9, 1187, 1562.34, 1407.61, 1478.69, 1761.43, 1642, 2107.86, 1963.6, 2273.73], '1Y': [44.96, 46.2, 41.36, 43, 43.39, 42.1, 46.83, 44.58, 47.35, 53.01, 73.92, 93.97, 99.83, 121.12, 131.88, 144.3, 149.29, 175.53, 194.57, 271.58, 244.93, 220.5, 194.38, 232.86, 206.83, 250.08, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 588.73, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1333.01, 1478.69, 1761.43, 1642, 2107.86, 1963.6, 2273.73] },
      velocityScore: { '1D': 2.7, '1W': -32.8, '1M': -33.7, '6M': null }, isNew: false,
      marketCap: '$337B', pe: 77.5, revenueGrowth: 251, eps: 29.32, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.94, RKNG: 4.04 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 2, avgWeight: 4.01, proScore: 2.67, coverage: 0.667,
      price: 88.86, weeklyPrices: [68.01, 65.62, 71.45, 86.77, 88.86], weeklyChange: 30.66, dayChange: 2.41, sortRank: 0, periodReturns: { '1M': -21.6, 'YTD': 22.3, '6M': 19, '1Y': 97 },
      priceHistory: { '1D': [86.77, 85.49, 86.31, 87.13, 85.68, 84.27, 84.88, 85.58, 85.07, 86.18, 87.22, 88.36, 88.98, 88.93, 89.43, 88.21, 88.37, 88.06, 87.6, 87.98, 87.98, 87.87, 88.72, 88.86], '1W': [68.01, 65.62, 71.45, 86.77, 88.86], '1M': [105.65, 118.17, 107.73, 107.29, 93.6, 92.06, 88.71, 87.32, 97.56, 82.41, 87.57, 82.25, 85.43, 80.66, 73.19, 72.87, 68.01, 65.62, 71.45, 86.77, 88.86], 'YTD': [72.63, 90.56, 101.25, 113.57, 111.21, 101.79, 82.51, 80.2, 79.19, 89.47, 86.34, 89.93, 78.67, 94.81, 98.97, 81, 77.2, 68.43, 82.55, 83.67, 105.86, 105.65, 92.06, 87.57, 72.87, 88.86], '6M': [74.68, 85.73, 95.22, 116.37, 122.09, 93.27, 82.22, 80.2, 79.19, 89.47, 86.34, 89.93, 78.67, 92.62, 94.9, 85.53, 76.4, 70.89, 75.05, 83.67, 105.86, 105.65, 92.06, 87.57, 72.87, 88.86], '1Y': [45.11, 42.5, 52.63, 58.92, 54.29, 51.79, 49.76, 44.95, 50.43, 45.22, 37.58, 41.19, 54.5, 56.94, 81.2, 95.69, 78.61, 77.77, 70.05, 67.89, 58.22, 55.51, 61.44, 79.05, 61.86, 78.05, 72.63, 90.56, 101.25, 113.57, 111.21, 101.79, 82.51, 83.9, 86.92, 89.76, 86.34, 89.93, 78.67, 94.81, 98.97, 81, 77.2, 68.43, 82.55, 86.83, 105.86, 105.65, 92.06, 87.57, 72.87, 88.86] },
      velocityScore: { '1D': 9.4, '1W': -30.6, '1M': -42.2, '6M': null }, isNew: false,
      marketCap: '$34B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.28, MEME: 5.74, RKNG: false },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'LITE', name: 'LITE', easyScore: 2, avgWeight: 3.89, proScore: 2.59, coverage: 0.667,
      price: 858.06, weeklyPrices: [842.53, 861.97, 816.98, 851.40, 858.06], weeklyChange: 1.84, dayChange: 0.78, sortRank: 0, periodReturns: { '1M': 0.4, 'YTD': 132.8, '6M': 131.2, '1Y': 837.9 },
      priceHistory: { '1D': [851.4, 845.55, 855.73, 856.96, 854.67, 847.22, 851.89, 847.45, 855.73, 856.73, 855.32, 855.25, 850.6, 851, 854.4, 860.36, 865.31, 866.02, 871.88, 869.77, 865.74, 862.09, 862.44, 858.06], '1W': [842.53, 861.97, 816.98, 851.4, 858.06], '1M': [905, 1029.15, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93, 827.92, 842.53, 861.97, 816.98, 851.4, 858.06], 'YTD': [368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 667.77, 700.91, 558.44, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 1053.09, 970.7, 946.9, 905, 895.4, 957.24, 827.92, 858.06], '6M': [371.18, 392.88, 331.62, 354.49, 381.44, 504.42, 583.46, 667.77, 700.91, 558.44, 622.5, 706.35, 702.73, 826.88, 897.3, 894.07, 881.64, 949.93, 903.8, 970.7, 946.9, 905, 895.4, 957.24, 827.92, 858.06], '1Y': [91.49, 90.44, 99.63, 102.13, 109.85, 110.01, 119.66, 117.96, 124.62, 134.12, 164.88, 163.34, 152.75, 171.4, 163.09, 156.57, 162.95, 198.39, 188.36, 252.47, 247.43, 291.27, 302.98, 366, 320.25, 395.92, 368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 674.73, 783.25, 640.69, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 1053.09, 884.98, 946.9, 905, 895.4, 957.24, 827.92, 858.06] },
      velocityScore: { '1D': -1.1, '1W': -12.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$67B', pe: 150.5, revenueGrowth: 90, eps: 5.7, grossMargin: 41, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.67, RKNG: 3.11 },
      tonyNote: 'LITE appears in 2 of 3 Meme ETFs (67% coverage) with average weight 3.9% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 2, avgWeight: 3.67, proScore: 2.45, coverage: 0.667,
      price: 45.73, weeklyPrices: [50.30, 47.74, 47.21, 45.91, 45.73], weeklyChange: -9.09, dayChange: -0.39, sortRank: 0, periodReturns: { '1M': -28, 'YTD': 21.1, '6M': 19.4, '1Y': 200.3 },
      priceHistory: { '1D': [45.91, 45.06, 45.3, 46.02, 46.1, 45.3, 45.57, 45.28, 45.06, 45.33, 45.32, 45.48, 46.1, 45.83, 45.99, 46.22, 46.3, 46.04, 45.33, 45.41, 45.63, 45.74, 45.69, 45.73], '1W': [50.3, 47.74, 47.21, 45.91, 45.73], '1M': [65.33, 66.6, 65.48, 61.86, 54.35, 59.19, 54.02, 51.52, 56.71, 59.77, 60.85, 59.18, 58.11, 59.96, 56.87, 54.72, 50.3, 47.74, 47.21, 45.91, 45.73], 'YTD': [37.77, 45.68, 51.89, 56.68, 53.74, 41.83, 42.22, 39.98, 40.95, 36.7, 41.58, 41.29, 35.09, 35.13, 43.07, 48.72, 48.36, 49.48, 55.15, 52.94, 56.83, 65.33, 59.19, 60.85, 54.72, 45.73], '6M': [38.3, 43.63, 52.88, 52.26, 59.84, 39.79, 40.03, 39.98, 40.95, 36.7, 41.58, 41.29, 35.09, 34.77, 39.32, 48.12, 50.64, 45.66, 61.2, 52.94, 56.83, 65.33, 59.19, 60.85, 54.72, 45.73], '1Y': [15.23, 16.96, 17.31, 18.99, 16.14, 18.32, 17.83, 18.73, 22.99, 28.21, 33.63, 37.9, 47.14, 47.08, 60.09, 67.98, 55.19, 62.42, 66.63, 57.38, 48.85, 47.47, 43.96, 43.92, 33.78, 41.98, 37.77, 45.68, 51.89, 56.68, 53.74, 41.83, 42.22, 42.36, 41.39, 38.84, 41.58, 41.29, 35.09, 35.13, 43.07, 48.72, 48.36, 49.48, 55.15, 50.46, 56.83, 65.33, 59.19, 60.85, 54.72, 45.73] },
      velocityScore: { '1D': -5.8, '1W': -41.2, '1M': -39.7, '6M': null }, isNew: false,
      marketCap: '$16B', pe: 59.4, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 2.59, MEME: 4.75, RKNG: false },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'AMD', name: 'AMD', easyScore: 2, avgWeight: 3.42, proScore: 2.28, coverage: 0.667,
      price: 580.91, weeklyPrices: [519.74, 532.57, 521.58, 539.49, 580.91], weeklyChange: 11.77, dayChange: 7.68, sortRank: 0, periodReturns: { '1M': 12.6, 'YTD': 171.3, '6M': 169.8, '1Y': 326.8 },
      priceHistory: { '1D': [539.49, 552.14, 558.59, 558.03, 557.98, 557.03, 565.34, 565, 571.8, 575.15, 577.24, 576.66, 580.85, 580.12, 579.51, 578.81, 580.74, 579.23, 582.4, 582.44, 583.14, 583, 583.43, 580.91], '1W': [519.74, 532.57, 521.58, 539.49, 580.91], '1M': [510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 424.1, 467.51, 510.13, 490.33, 547.26, 519.85, 580.91], '6M': [215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 467.51, 510.13, 490.33, 547.26, 519.85, 580.91], '1Y': [136.11, 138.41, 160.08, 158.65, 179.51, 163.12, 174.95, 166.55, 166.62, 162.13, 159.54, 159.16, 160.88, 164.01, 235.56, 238.6, 238.03, 258.01, 250.05, 237.52, 230.29, 206.13, 217.6, 221.42, 198.11, 215.04, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 420.99, 467.51, 510.13, 490.33, 547.26, 519.85, 580.91] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$947B', pe: 192.4, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { BUZZ: 3.32, MEME: false, RKNG: 3.53 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'INTC', name: 'INTC', easyScore: 2, avgWeight: 3.33, proScore: 2.22, coverage: 0.667,
      price: 139.63, weeklyPrices: [131.65, 132.87, 128.32, 131.72, 139.63], weeklyChange: 6.06, dayChange: 6.01, sortRank: 0, periodReturns: { '1M': 21.8, 'YTD': 278.4, '6M': 274.3, '1Y': 511.1 },
      priceHistory: { '1D': [131.72, 134.55, 138.13, 137.1, 137.07, 137.4, 140.26, 139.98, 139.67, 140.13, 140.31, 140.66, 141.74, 141.32, 141.94, 141.96, 141.28, 140.76, 140.34, 140.35, 140.32, 140.16, 140.38, 139.63], '1W': [131.65, 132.87, 128.32, 131.72, 139.63], '1M': [109.33, 107.93, 112.71, 111.78, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63], 'YTD': [36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 44.11, 45.61, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 129.44, 108.77, 119.84, 109.33, 110.27, 127.86, 132.28, 139.63], '6M': [37.3, 42.63, 48.72, 54.32, 48.66, 48.24, 46.48, 44.11, 45.61, 43.42, 45.77, 43.87, 43.13, 50.38, 62.38, 68.5, 82.54, 99.62, 124.92, 108.77, 119.84, 109.33, 110.27, 127.86, 132.28, 139.63], '1Y': [22.85, 23.44, 22.69, 23.49, 20.34, 20.41, 21.81, 25.31, 24.35, 24, 24.77, 24.9, 31.22, 35.94, 37.43, 37.15, 38.12, 41.53, 37.03, 37.88, 34.33, 35.83, 43.76, 40.78, 36.05, 36.16, 36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 43.63, 45.5, 45.58, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 129.44, 108.17, 119.84, 109.33, 110.27, 127.86, 132.28, 139.63] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$702B', pe: null, revenueGrowth: 7, eps: -0.61, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 3.05, MEME: false, RKNG: 3.62 },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab', easyScore: 2, avgWeight: 3.23, proScore: 2.15, coverage: 0.667,
      price: 101.65, weeklyPrices: [85.41, 80.69, 84.54, 98.01, 101.65], weeklyChange: 19.01, dayChange: 3.78, sortRank: 0, periodReturns: { '1M': -29.2, 'YTD': 45.7, '6M': 44.3, '1Y': 196.1 },
      priceHistory: { '1D': [97.95, 100.3, 98.8, 99.21, 98.19, 96.82, 97.14, 98.86, 98.55, 99.99, 101.6, 102.49, 102.94, 103.19, 103.93, 102.32, 102.44, 101.92, 100.62, 100.92, 101.74, 101.38, 102.28, 101.65], '1W': [85.41, 80.69, 84.54, 98.01, 101.65], '1M': [122.39, 123.32, 114.7, 119.95, 110.08, 113.65, 108.23, 105.05, 114.78, 102.39, 109.25, 104.63, 107.98, 107.24, 100.29, 95.12, 85.41, 80.69, 84.54, 98.01, 101.65], 'YTD': [69.76, 83.08, 90.76, 88.9, 80.07, 72.32, 67.44, 70.86, 69.1, 70.11, 68.41, 67.23, 60.93, 67.67, 70.62, 89.46, 82.29, 80.31, 117.35, 124.77, 135.76, 122.39, 113.65, 109.25, 95.12, 101.65], '6M': [70.45, 84.08, 91.8, 87.98, 85.68, 66.32, 66.01, 70.86, 69.1, 70.11, 68.41, 67.23, 60.93, 67.73, 68.05, 84.8, 79.68, 78.81, 105.47, 124.77, 135.76, 122.39, 113.65, 109.25, 95.12, 101.65], '1Y': [34.33, 39.14, 47.69, 49.15, 46.44, 44.1, 43.43, 40.92, 48.13, 43.53, 46.17, 48.08, 48.69, 47.97, 65.31, 69.27, 65.4, 63.75, 56.57, 51.24, 42.78, 42.6, 44.72, 57.52, 53.96, 77.18, 69.76, 83.08, 90.76, 88.9, 80.07, 72.32, 67.44, 70.21, 70.97, 71.48, 68.41, 67.23, 60.93, 67.67, 70.62, 89.46, 82.29, 80.31, 117.35, 131.16, 135.76, 122.39, 113.65, 109.25, 95.12, 101.65] },
      velocityScore: { '1D': 6.4, '1W': null, '1M': -48.1, '6M': null }, isNew: false,
      marketCap: '$64B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 1.63, MEME: 4.83, RKNG: false },
      tonyNote: 'Rocket Lab is the small-launch and space systems name that Electrification and AI infrastructure ETFs hold for satellite connectivity exposure — relevant to both GPS-dependent grids and low-orbit broadband that supports remote AI compute. Small market cap, no earnings, but consistent revenue growth and a rapidly expanding backlog.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 1, avgWeight: 9.72, proScore: 3.24, coverage: 0.333,
      price: 148.16, weeklyPrices: [146.97, 138.54, 135.69, 150.10, 148.16], weeklyChange: 0.81, dayChange: -1.29, sortRank: 0, periodReturns: { '1M': -6.5, 'YTD': 325, '6M': 311.3, '1Y': 484.5 },
      priceHistory: { '1D': [150.1, 148.17, 149.26, 149.53, 149.57, 148.01, 148.28, 147.15, 147.02, 147.69, 147.49, 146.69, 146.19, 145.27, 147.78, 147.62, 148.96, 149.65, 149.82, 149.51, 149.01, 149.46, 149.61, 148.16], '1W': [146.97, 138.54, 135.69, 150.1, 148.16], '1M': [185.67, 202.37, 184.07, 202.89, 177, 196.64, 162.88, 175.13, 172.78, 169.05, 191.55, 170.81, 167.34, 161.85, 171.23, 147.44, 146.97, 138.54, 135.69, 150.1, 148.16], 'YTD': [34.86, 33.01, 37, 35.72, 43.61, 44.3, 44.46, 51.68, 84.23, 95.58, 96.81, 87.54, 98.21, 107.45, 153.19, 163.47, 145.78, 172.98, 184.9, 190.36, 181.49, 185.67, 196.64, 191.55, 147.44, 148.16], '6M': [36.02, 38.06, 34.47, 38.15, 39.57, 38.13, 43.99, 51.68, 84.23, 95.58, 96.81, 87.54, 98.21, 103.91, 150.6, 159.42, 162.17, 183.51, 148.94, 190.36, 181.49, 185.67, 196.64, 191.55, 147.44, 148.16], '1Y': [25.35, 27.92, 28.99, 26.31, 23.06, 23.23, 22.79, 22.77, 25.07, 23.02, 27.72, 29.47, 26.69, 28.42, 32.22, 32.95, 33.4, 36.87, 29.5, 23.75, 20.89, 22.73, 25.65, 34.98, 27.14, 41, 34.86, 33.01, 37, 35.72, 43.61, 44.3, 44.46, 53.96, 102.51, 110.62, 96.81, 87.54, 98.21, 107.45, 153.19, 163.47, 145.78, 172.98, 184.9, 173.26, 181.49, 185.67, 196.64, 191.55, 147.44, 148.16] },
      velocityScore: { '1D': -21.4, '1W': -16.9, '1M': -25.7, '6M': null }, isNew: false,
      marketCap: '$12B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 9.72, RKNG: false },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'QBTS', name: 'D-Wave Quantum', easyScore: 1, avgWeight: 5.21, proScore: 1.74, coverage: 0.333,
      price: 23.99, weeklyPrices: [22.98, 21.91, 22.76, 23.83, 23.99], weeklyChange: 4.4, dayChange: 0.67, sortRank: 0, periodReturns: { '1M': -20.4, 'YTD': -8.3, '6M': -8.6, '1Y': 61.9 },
      priceHistory: { '1D': [23.83, 23.98, 24.26, 24.56, 24.2, 23.66, 23.77, 23.83, 23.68, 23.84, 23.86, 23.94, 24.09, 23.94, 23.98, 23.82, 23.81, 23.83, 23.7, 23.77, 23.95, 24.07, 24.16, 23.99], '1W': [22.98, 21.91, 22.76, 23.83, 23.99], '1M': [29.18, 29.91, 27.55, 27.64, 23.85, 25.83, 23.52, 23.25, 23.82, 23.37, 26.26, 23.94, 22.92, 24.69, 24.47, 25.03, 22.98, 21.91, 22.76, 23.83, 23.99], 'YTD': [26.15, 29.28, 28.72, 25.63, 21.22, 20.72, 19.67, 18.06, 18.78, 18.59, 17.55, 15.73, 13.9, 14.14, 14.65, 21.66, 18.8, 20.92, 24.03, 20.35, 29.4, 29.18, 25.83, 26.26, 25.03, 23.99], '6M': [26.25, 30.2, 30.15, 27.43, 23.22, 17.21, 18.82, 18.06, 18.78, 18.59, 17.55, 15.73, 13.9, 14.32, 14.25, 21.69, 18.49, 20.49, 22.57, 20.35, 29.4, 29.18, 25.83, 26.26, 25.03, 23.99], '1Y': [14.82, 16.39, 16.91, 20.3, 17.06, 17.58, 18.51, 15.32, 15.45, 15.3, 16.04, 22.54, 27.72, 25.63, 34.25, 44.78, 32.19, 32, 29.74, 28.99, 22.93, 22.59, 25.08, 26.8, 23.8, 27.52, 26.15, 29.28, 28.72, 25.63, 21.22, 20.72, 19.67, 18.05, 18.94, 19.04, 17.55, 15.73, 13.9, 14.14, 14.65, 21.66, 18.8, 20.92, 24.03, 19.06, 29.4, 29.18, 25.83, 26.26, 25.03, 23.99] },
      velocityScore: { '1D': -1.7, '1W': -8.4, '1M': -47.1, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: -81, eps: -1.14, grossMargin: 66, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.21, RKNG: false },
      tonyNote: 'D-Wave Quantum is a quantum computing company — the only publicly traded business built around quantum annealing hardware. Revenue is minimal and profitability is many years away, but it holds a position in Meme ETFs as the purest-play quantum computing stock available to retail investors. The ETF weight is small and the position is purely thematic.',
    },
    {
      ticker: 'COHR', name: 'COHR', easyScore: 1, avgWeight: 4.91, proScore: 1.64, coverage: 0.333,
      price: 394.47, weeklyPrices: [392.50, 407.25, 380.56, 391.22, 394.47], weeklyChange: 0.5, dayChange: 0.83, sortRank: 0, periodReturns: { '1M': 9.1, 'YTD': 113.7, '6M': 111.2, '1Y': 355.3 },
      priceHistory: { '1D': [391.22, 392.38, 396.17, 395.74, 395.56, 392.46, 390.3, 386.4, 386.82, 386.9, 387.5, 386.35, 383.76, 383.19, 383.83, 384.79, 388.31, 389.85, 392.04, 392.55, 393.34, 392.75, 394.61, 394.47], '1W': [392.5, 407.25, 380.56, 391.22, 394.47], '1M': [362.9, 426.89, 417.43, 421.9, 376.99, 401.93, 355.94, 354.77, 363.58, 385.03, 413.84, 382.81, 378.85, 389.57, 425.48, 381.22, 392.5, 407.25, 380.56, 391.22, 394.47], 'YTD': [184.57, 173.15, 195.96, 196.94, 212.18, 227.68, 217.23, 248.18, 258.93, 235.72, 242.76, 253.63, 243.48, 253.22, 307.93, 347.51, 321.53, 329.89, 379.69, 382.45, 377.57, 362.9, 401.93, 413.84, 381.22, 394.47], '6M': [186.81, 191.62, 184.11, 202.72, 215.86, 209.24, 216.1, 248.18, 258.93, 235.72, 242.76, 253.63, 243.48, 258.16, 307.5, 345.02, 336.09, 329.5, 335.26, 382.45, 377.57, 362.9, 401.93, 413.84, 381.22, 394.47], '1Y': [86.64, 91.25, 97.82, 98.43, 107.23, 107.15, 116.56, 87.76, 91.58, 88.47, 103.49, 103.41, 106.52, 114.65, 116.67, 110.41, 120.79, 134.24, 128.7, 158.01, 138.15, 148.85, 170.96, 197.45, 170.44, 191.37, 184.57, 173.15, 195.96, 196.94, 212.18, 227.68, 217.23, 248.89, 298.91, 252.32, 242.76, 253.63, 243.48, 253.22, 307.93, 347.51, 321.53, 329.89, 379.69, 362.83, 377.57, 362.9, 401.93, 413.84, 381.22, 394.47] },
      velocityScore: { '1D': -3.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$77B', pe: 187, revenueGrowth: 21, eps: 2.11, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.91, RKNG: false },
      tonyNote: 'COHR appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 1, avgWeight: 4.8, proScore: 1.6, coverage: 0.333,
      price: 53.26, weeklyPrices: [53.60, 50.56, 49.31, 53.88, 53.26], weeklyChange: -0.63, dayChange: -1.15, sortRank: 0, periodReturns: { '1M': -26.1, 'YTD': 18.7, '6M': 17.5, '1Y': 32.8 },
      priceHistory: { '1D': [53.88, 53.41, 54.09, 54.49, 53.85, 52.93, 53.09, 53.38, 53.31, 53.48, 53.55, 53.56, 53.88, 53.25, 53.38, 53.2, 53.28, 53.13, 52.79, 52.91, 53.07, 53.57, 53.72, 53.26], '1W': [53.6, 50.56, 49.31, 53.88, 53.26], '1M': [69.28, 71.4, 68.23, 65.66, 56.78, 62.8, 56.69, 56.63, 57.99, 57.85, 61.18, 56.06, 54.69, 56.55, 58.32, 57.85, 53.6, 50.56, 49.31, 53.88, 53.26], 'YTD': [44.87, 50.45, 47.56, 47.25, 39.98, 34.99, 34.11, 31.9, 38.37, 35.73, 32.98, 31.2, 27.51, 29.24, 29.76, 48.32, 43.84, 45.75, 56.89, 51.95, 63.64, 69.28, 62.8, 61.18, 57.85, 53.26], '6M': [45.31, 49.78, 50.88, 49.33, 43.24, 30.43, 31.3, 31.9, 38.37, 35.73, 32.98, 31.2, 27.51, 29.3, 28.79, 46.09, 42.69, 46.2, 49.24, 51.95, 63.64, 69.28, 62.8, 61.18, 57.85, 53.26], '1Y': [40.1, 45.56, 43.54, 43.28, 39.88, 41.23, 43, 36.8, 40.75, 40.97, 43.86, 65.44, 73.86, 63.09, 74.3, 72.41, 59.5, 57.15, 53.38, 54.42, 49.12, 47.06, 48.65, 51.67, 45.85, 49.82, 44.87, 50.45, 47.56, 47.25, 39.98, 34.99, 34.11, 30.78, 38.34, 35.87, 32.98, 31.2, 27.51, 29.24, 29.76, 48.32, 43.84, 45.75, 56.89, 49.31, 63.64, 69.28, 62.8, 61.18, 57.85, 53.26] },
      velocityScore: { '1D': 2.6, '1W': -37.3, '1M': -49, '6M': null }, isNew: false,
      marketCap: '$20B', pe: 136.6, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.8, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'AXTI', name: 'AXT Inc', easyScore: 1, avgWeight: 4.62, proScore: 1.54, coverage: 0.333,
      price: 72.08, weeklyPrices: [70.14, 69.06, 70.15, 71.46, 72.08], weeklyChange: 2.77, dayChange: 0.87, sortRank: 0, periodReturns: { '1M': -30.1, 'YTD': 340.9, '6M': 356.2, '1Y': 3486.1 },
      priceHistory: { '1D': [71.46, 71.49, 70.16, 71.32, 70.18, 69.5, 69.88, 69.96, 70.24, 69.88, 70.14, 70.43, 70.45, 70.06, 70.67, 71.14, 71.41, 71.62, 71.73, 71.96, 72.02, 72.41, 72.61, 72.08], '1W': [70.14, 69.06, 70.15, 71.46, 72.08], '1M': [109.55, 110.85, 106.7, 105.99, 89.04, 90.78, 78.36, 85.29, 88.34, 97.18, 110.74, 93.04, 92.11, 84.57, 92.44, 77.91, 70.14, 69.06, 70.15, 71.46, 72.08], 'YTD': [16.35, 25.83, 25.72, 17.4, 18.54, 24.06, 24.24, 29.68, 37.9, 32.37, 48.86, 54.24, 60.63, 41.99, 66.45, 78.76, 70.15, 106, 125.81, 123.78, 140.83, 109.55, 90.78, 110.74, 77.91, 72.08], '6M': [15.8, 24.11, 22.1, 17.92, 16.38, 20.43, 24.79, 29.68, 37.9, 32.37, 48.86, 54.24, 60.63, 52.84, 64.18, 82.56, 76.16, 96, 116.36, 123.78, 140.83, 109.55, 90.78, 110.74, 77.91, 72.08], '1Y': [2.01, 2.54, 2.39, 2.52, 2.12, 2.07, 2.23, 2.14, 2.77, 3.08, 3.36, 3.94, 4.83, 4.91, 5.31, 4.59, 5.17, 6.6, 8.54, 10.56, 9.9, 9.23, 11.48, 15.51, 12.36, 15.01, 16.35, 25.83, 25.72, 17.4, 18.54, 24.06, 24.24, 28.43, 46.32, 38.56, 48.86, 54.24, 60.63, 41.99, 66.45, 78.76, 70.15, 106, 125.81, 105.88, 140.83, 109.55, 90.78, 110.74, 77.91, 72.08] },
      velocityScore: { '1D': -4.3, '1W': 4.1, '1M': -38.2, '6M': null }, isNew: false,
      marketCap: '$5B', pe: null, revenueGrowth: 39, eps: -0.32, grossMargin: 21, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.62, RKNG: false },
      tonyNote: 'AXT Inc is a compound semiconductor substrate manufacturer — gallium arsenide, indium phosphide, and germanium wafers used in data center optical transceivers, 5G RF chips, and solar cells. Revenue is growing with optical networking demand. Small market cap but positioned at a genuine supply-chain chokepoint for III-V semiconductor materials.',
    },
    {
      ticker: 'CRWV', name: 'CRWV', easyScore: 1, avgWeight: 4.1, proScore: 1.37, coverage: 0.333,
      price: 99.54, weeklyPrices: [100.88, 98.76, 96.58, 95.51, 99.54], weeklyChange: -1.33, dayChange: 4.22, sortRank: 0, periodReturns: { '1M': -9.1, 'YTD': 39, '6M': 34.7, '1Y': -36.2 },
      priceHistory: { '1D': [95.51, 96.5, 97.48, 99.04, 98.82, 97.23, 97.65, 97.72, 96.62, 98.35, 97.87, 97.56, 98.35, 97.74, 97.79, 98.21, 98.39, 98.23, 97.48, 97.78, 98.11, 98.25, 99.35, 99.54], '1W': [100.88, 98.76, 96.58, 95.51, 99.54], '1M': [124.82, 119.27, 110.93, 108.03, 100.39, 102.37, 98.45, 95.61, 95.74, 100.55, 106.71, 117.03, 115.21, 117.95, 111.29, 105.72, 100.88, 98.76, 96.58, 95.51, 99.54], 'YTD': [71.61, 77.09, 95.01, 92.98, 93.19, 89.95, 96.04, 89.25, 79.56, 72.99, 81.11, 81.47, 74.81, 80.94, 110.27, 117.43, 112.06, 125.43, 114.7, 107.3, 105.49, 124.82, 102.37, 106.71, 105.72, 99.54], '6M': [73.9, 77.18, 89.8, 91.79, 99.53, 74.65, 95.7, 89.25, 79.56, 72.99, 81.11, 81.47, 74.81, 82.24, 102, 116.85, 110.14, 119.01, 114.15, 107.3, 105.49, 124.82, 102.37, 106.71, 105.72, 99.54], '1Y': [155.94, 153.05, 143.04, 126.05, 102.89, 110.24, 148.75, 92.89, 91.39, 89.88, 117.14, 120.86, 133.4, 137.05, 139.98, 139.24, 125.06, 134.8, 115.75, 88.39, 74.9, 71.29, 79.36, 88.16, 64.55, 78.87, 71.61, 77.09, 95.01, 92.98, 93.19, 89.95, 96.04, 90.84, 78.05, 74.41, 81.11, 81.47, 74.81, 80.94, 110.27, 117.43, 112.06, 125.43, 114.7, 103.77, 105.49, 124.82, 102.37, 106.71, 105.72, 99.54] },
      velocityScore: { '1D': -7.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$54B', pe: null, revenueGrowth: 112, eps: -2.72, grossMargin: 69, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.1, RKNG: false },
      tonyNote: 'CRWV appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ALAB', name: 'ALAB', easyScore: 1, avgWeight: 3.88, proScore: 1.29, coverage: 0.333,
      price: 483.02, weeklyPrices: [399.92, 398.00, 391.74, 455.96, 483.02], weeklyChange: 20.78, dayChange: 5.93, sortRank: 0, periodReturns: { '1M': 40.9, 'YTD': 190.3, '6M': 182.7, '1Y': 444.8 },
      priceHistory: { '1D': [455.96, 478.08, 493, 492.71, 491.4, 492.19, 497.35, 494.51, 493.37, 496.16, 492.6, 490.93, 489.02, 486.16, 488.25, 484.51, 486.3, 485.94, 484.45, 487.34, 487.48, 482.74, 484.73, 483.02], '1W': [399.92, 398, 391.74, 455.96, 483.02], '1M': [320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02], 'YTD': [166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 129.68, 118.83, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 232.68, 306.88, 320.09, 346.33, 389.2, 397.02, 483.02], '6M': [170.84, 165.77, 172.14, 176.35, 160.46, 142.82, 126.58, 129.68, 118.83, 119.2, 120.31, 116.04, 112.47, 117.14, 149.05, 174.05, 212.84, 202.68, 199.79, 232.68, 306.88, 320.09, 346.33, 389.2, 397.02, 483.02], '1Y': [88.66, 99.86, 91.94, 119.48, 128.87, 174.39, 192, 171.06, 178.56, 176.61, 230.37, 249.38, 205.27, 194.5, 219.36, 161.46, 157.51, 168.25, 179.31, 167.55, 139.52, 144.78, 152.5, 164.32, 140.24, 169.97, 166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 122.31, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 215.58, 306.88, 320.09, 346.33, 389.2, 397.02, 483.02] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$83B', pe: 330.8, revenueGrowth: 93, eps: 1.46, grossMargin: 76, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.88, RKNG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'WEN', name: 'WEN', easyScore: 1, avgWeight: 3.85, proScore: 1.28, coverage: 0.333,
      price: 8.29, weeklyPrices: [7.86, 7.33, 7.80, 8.26, 8.29], weeklyChange: 5.47, dayChange: 0.42, sortRank: 0, periodReturns: { '1M': 7.7, 'YTD': -0.5, '6M': 0.1, '1Y': -30.2 },
      priceHistory: { '1D': [8.26, 8.04, 8.19, 8.05, 8.05, 7.89, 7.91, 7.9, 7.9, 8.02, 8.1, 8.08, 7.99, 7.99, 7.99, 8.06, 8.03, 8.05, 8.05, 8.05, 7.97, 8.03, 8.14, 8.29], '1W': [7.86, 7.33, 7.8, 8.26, 8.29], '1M': [7.85, 7.21, 6.85, 6.75, 6.71, 6.74, 6.71, 6.63, 6.79, 6.79, 6.91, 6.77, 6.95, 6.8, 6.17, 6.26, 7.86, 7.33, 7.8, 8.26, 8.29], 'YTD': [8.33, 8.38, 8.54, 8.42, 7.79, 8.02, 7.48, 8.09, 7.66, 7.42, 7.17, 7.09, 6.8, 7.09, 6.7, 7.13, 6.9, 6.54, 6.76, 8.02, 7.81, 7.85, 6.74, 6.91, 6.26, 8.29], '6M': [8.28, 8.22, 8.48, 8.43, 7.72, 8.04, 7.27, 8.09, 7.66, 7.42, 7.17, 7.09, 6.8, 6.88, 6.89, 6.95, 7.14, 6.7, 7.3, 8.02, 7.81, 7.85, 6.74, 6.91, 6.26, 8.29], '1Y': [11.88, 11.23, 10.45, 11.32, 10.1, 10.04, 10.11, 10.58, 10.27, 10.02, 9.83, 9.47, 9.29, 9.46, 8.98, 8.87, 9.33, 8.73, 8.89, 8.85, 8.23, 8.43, 8.56, 8.18, 8.49, 8.29, 8.33, 8.38, 8.54, 8.42, 7.79, 8.02, 7.48, 7.77, 7.44, 7.27, 7.17, 7.09, 6.8, 7.09, 6.7, 7.13, 6.9, 6.54, 6.76, 7.84, 7.81, 7.85, 6.74, 6.91, 6.26, 8.29] },
      velocityScore: { '1D': -0.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2B', pe: 10.8, revenueGrowth: 3, eps: 0.77, grossMargin: 34, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.85, RKNG: false },
      tonyNote: 'WEN appears in 1 of 3 Meme ETFs (33% coverage) with average weight 3.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
