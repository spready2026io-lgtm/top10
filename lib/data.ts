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
export const SPY_RET: Record<Period, number> = { '1W': 2.2, '1M': -1.9, 'YTD': 9.2, '6M': 9, '1Y': 19.1 };
// @@END_GENERATED:SPY_RET@@

// Top holdings per ETF (ticker + portfolio weight %), shown on ETF row hover.
export type EtfHolding = { t: string; w: number };

// @@GENERATED:ETF_TOP_HOLDINGS@@
export const ETF_TOP_HOLDINGS: Record<string, EtfHolding[]> = {
  AIS: [{ t: 'MU', w: 6.7 }, { t: 'AMD', w: 4.9 }, { t: 'MRVL', w: 3.9 }, { t: 'SIMO', w: 3.7 }, { t: 'VRT', w: 3.5 }],
  ARTY: [{ t: 'AMD', w: 5.0 }, { t: 'MU', w: 5.0 }, { t: 'NVDA', w: 4.5 }, { t: 'AVGO', w: 4.3 }, { t: 'MRVL', w: 4.3 }],
  BAI: [{ t: 'MU', w: 6.2 }, { t: 'AMD', w: 5.0 }, { t: 'LRCX', w: 4.9 }, { t: 'TSM', w: 4.4 }, { t: 'AVGO', w: 4.0 }],
  IGPT: [{ t: 'AMD', w: 8.5 }, { t: 'META', w: 8.2 }, { t: 'MU', w: 7.9 }, { t: 'GOOGL', w: 7.7 }, { t: 'NVDA', w: 7.4 }],
  IVES: [{ t: 'META', w: 5.0 }, { t: 'TSM', w: 4.9 }, { t: 'AAPL', w: 4.9 }, { t: 'MU', w: 4.8 }, { t: 'TSLA', w: 4.8 }],
  ALAI: [{ t: 'NVDA', w: 12.3 }, { t: 'TSM', w: 5.6 }, { t: 'AMZN', w: 5.1 }, { t: 'MSFT', w: 5.0 }, { t: 'GOOG', w: 4.9 }],
  CHAT: [{ t: 'NVDA', w: 6.5 }, { t: 'GOOGL', w: 5.4 }, { t: 'AMD', w: 4.2 }, { t: 'MU', w: 4.0 }, { t: 'AVGO', w: 4.0 }],
  AIFD: [{ t: 'MU', w: 7.4 }, { t: 'NVDA', w: 6.0 }, { t: 'MRVL', w: 6.0 }, { t: 'PANW', w: 5.7 }, { t: 'AVGO', w: 5.1 }],
  SPRX: [{ t: 'ALAB', w: 10.9 }, { t: 'COHR', w: 8.7 }, { t: 'KLAC', w: 8.4 }, { t: 'ARM', w: 7.3 }, { t: 'NET', w: 6.9 }],
  AOTG: [{ t: 'AMD', w: 16.2 }, { t: 'MU', w: 11.6 }, { t: 'NVDA', w: 9.9 }, { t: 'TSM', w: 7.3 }, { t: 'TOST', w: 5.0 }],
  SOXX: [{ t: 'MU', w: 8.2 }, { t: 'AMD', w: 8.1 }, { t: 'NVDA', w: 7.2 }, { t: 'AVGO', w: 6.3 }, { t: 'INTC', w: 6.2 }],
  PSI: [{ t: 'AMAT', w: 6.7 }, { t: 'KLAC', w: 6.2 }, { t: 'LRCX', w: 5.7 }, { t: 'MU', w: 5.4 }, { t: 'AMD', w: 5.0 }],
  XSD: [{ t: 'MXL', w: 3.4 }, { t: 'ALGM', w: 3.1 }, { t: 'AMBA', w: 3.1 }, { t: 'ALAB', w: 2.9 }, { t: 'AMD', w: 2.6 }],
  DRAM: [{ t: 'SNDK', w: 5.0 }, { t: 'WDC', w: 4.3 }, { t: 'STX', w: 4.3 }, { t: 'MU', w: 2.1 }, { t: 'JPY', w: 0.7 }],
  PTF: [{ t: 'SNDK', w: 5.4 }, { t: 'MU', w: 4.6 }, { t: 'KLAC', w: 4.3 }, { t: 'WDC', w: 4.1 }, { t: 'AXTI', w: 3.8 }],
  WCLD: [{ t: 'FROG', w: 3.2 }, { t: 'DOCN', w: 3.2 }, { t: 'PANW', w: 3.0 }, { t: 'DDOG', w: 2.9 }, { t: 'CRWD', w: 2.6 }],
  IGV: [{ t: 'PANW', w: 10.4 }, { t: 'MSFT', w: 8.1 }, { t: 'PLTR', w: 8.1 }, { t: 'CRWD', w: 7.2 }, { t: 'ORCL', w: 5.9 }],
  FDTX: [{ t: 'MRVL', w: 9.7 }, { t: 'MU', w: 9.3 }, { t: 'TSM', w: 6.4 }, { t: 'WDC', w: 4.5 }, { t: 'PANW', w: 4.2 }],
  GTEK: [{ t: 'MRVL', w: 4.4 }, { t: 'APH', w: 2.4 }, { t: 'CDNS', w: 2.4 }, { t: 'TER', w: 2.2 }, { t: 'DELL', w: 2.1 }],
  ARKK: [{ t: 'TSLA', w: 10.2 }, { t: 'TEM', w: 5.9 }, { t: 'CRSP', w: 4.9 }, { t: 'HOOD', w: 4.8 }, { t: 'AMD', w: 4.6 }],
  MARS: [{ t: 'SPCX', w: 21.6 }, { t: 'RKLB', w: 10.4 }, { t: 'ASTS', w: 8.0 }, { t: 'VSAT', w: 5.2 }, { t: 'PL', w: 5.0 }],
  FRWD: [{ t: 'NVDA', w: 8.1 }, { t: 'STX', w: 7.9 }, { t: 'AMD', w: 7.4 }, { t: 'LRCX', w: 6.4 }, { t: 'TSM', w: 6.1 }],
  BCTK: [{ t: 'TSM', w: 8.7 }, { t: 'SPCX', w: 8.3 }, { t: 'LRCX', w: 8.3 }, { t: 'AVGO', w: 6.7 }, { t: 'NVDA', w: 5.8 }],
  FWD: [{ t: 'AMAT', w: 2.3 }, { t: 'AMD', w: 2.2 }, { t: 'LRCX', w: 2.1 }, { t: 'AVGO', w: 1.8 }, { t: 'NVDA', w: 1.8 }],
  CBSE: [{ t: 'TXG', w: 3.2 }, { t: 'IBRX', w: 3.2 }, { t: 'KRYS', w: 3.1 }, { t: 'TENB', w: 3.1 }, { t: 'SCI', w: 3.0 }],
  FCUS: [{ t: 'SNDK', w: 5.4 }, { t: 'INTC', w: 5.3 }, { t: 'MU', w: 4.9 }, { t: 'WDC', w: 4.6 }, { t: 'DELL', w: 4.5 }],
  WGMI: [{ t: 'CIFR', w: 18.0 }, { t: 'HUT', w: 11.0 }, { t: 'KEEL', w: 11.0 }, { t: 'IREN', w: 9.7 }, { t: 'RIOT', w: 5.1 }],
  CNEQ: [{ t: 'NVDA', w: 13.1 }, { t: 'MSFT', w: 6.1 }, { t: 'GOOG', w: 5.8 }, { t: 'TSM', w: 5.8 }, { t: 'WDC', w: 5.0 }],
  SGRT: [{ t: 'MU', w: 8.4 }, { t: 'WDC', w: 8.4 }, { t: 'LITE', w: 7.8 }, { t: 'DELL', w: 6.6 }, { t: 'NVDA', w: 6.2 }],
  SPMO: [{ t: 'MU', w: 12.0 }, { t: 'NVDA', w: 7.4 }, { t: 'AVGO', w: 6.0 }, { t: 'LRCX', w: 4.3 }, { t: 'GOOGL', w: 4.2 }],
  XMMO: [{ t: 'CW', w: 4.0 }, { t: 'STRL', w: 3.4 }, { t: 'ATI', w: 3.3 }, { t: 'TTMI', w: 3.1 }, { t: 'WWD', w: 3.1 }],
  POW: [{ t: 'PWR', w: 4.9 }, { t: 'POWL', w: 4.4 }, { t: 'PRY', w: 4.2 }, { t: 'ETN', w: 4.0 }, { t: 'BELFB', w: 3.9 }],
  VOLT: [{ t: 'BELFB', w: 8.3 }, { t: 'POWL', w: 6.6 }, { t: 'ETN', w: 5.3 }, { t: 'PWR', w: 5.2 }, { t: 'NEE', w: 4.9 }],
  PBD: [{ t: 'RIVN', w: 1.2 }, { t: 'SEDG', w: 1.1 }, { t: 'ENRG', w: 1.1 }],
  PBW: [{ t: 'FCEL', w: 2.0 }, { t: 'OPAL', w: 1.9 }, { t: 'IONR', w: 1.7 }, { t: 'RIVN', w: 1.7 }, { t: 'BETA', w: 1.7 }],
  IVEP: [{ t: 'BE', w: 5.4 }, { t: 'GEV', w: 4.6 }, { t: 'PWR', w: 4.3 }, { t: 'VRT', w: 4.1 }, { t: 'SBGSY', w: 4.1 }],
  AIRR: [{ t: 'STRL', w: 6.0 }, { t: 'AGX', w: 4.7 }, { t: 'FIX', w: 4.4 }, { t: 'MTZ', w: 4.2 }, { t: 'CHRW', w: 4.1 }],
  PRN: [{ t: 'FIX', w: 4.5 }, { t: 'STRL', w: 4.1 }, { t: 'PWR', w: 4.0 }, { t: 'HWM', w: 3.7 }, { t: 'JBL', w: 3.7 }],
  RSHO: [{ t: 'TKR', w: 8.7 }, { t: 'POWL', w: 7.3 }, { t: 'CGNX', w: 7.2 }, { t: 'CAT', w: 6.9 }, { t: 'AIT', w: 6.0 }],
  IDEF: [{ t: 'RTX', w: 8.4 }, { t: 'LMT', w: 7.0 }, { t: 'BA', w: 5.0 }, { t: 'GD', w: 4.5 }, { t: 'FTNT', w: 3.4 }],
  BILT: [{ t: 'UNP', w: 6.0 }, { t: 'AENA', w: 4.5 }, { t: 'AEP', w: 4.4 }, { t: 'TRP', w: 3.6 }, { t: 'XEL', w: 3.6 }],
  BUZZ: [{ t: 'IBRX', w: 3.8 }, { t: 'MU', w: 3.5 }, { t: 'NBIS', w: 3.4 }, { t: 'SOFI', w: 3.3 }, { t: 'AMD', w: 3.3 }],
  MEME: [{ t: 'AAOI', w: 9.3 }, { t: 'NBIS', w: 6.1 }, { t: 'BE', w: 5.9 }, { t: 'ASTS', w: 5.7 }, { t: 'SNDK', w: 5.3 }],
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
  'AI & ML':         { '1W': -2.3, '1M': -9.7, 'YTD': 41.6, '6M': 38.4, '1Y': 71.5 },
  'Semiconductors':  { '1W': -7.1, '1M': -8.7, 'YTD': 94.9, '6M': 88.8, '1Y': 129.2 },
  'Broad Tech':      { '1W': -1.3, '1M': -8.5, 'YTD': 24.3, '6M': 22.4, '1Y': 37.9 },
  'Electrification': { '1W': -1.4, '1M': -10.5, 'YTD': 24.6, '6M': 20.7, '1Y': 42.1 },
  'Industrials':     { '1W': -0.4, '1M': -0.6, 'YTD': 23.9, '6M': 20.9, '1Y': 36.5 },
  'Meme':            { '1W': -2.9, '1M': -18.7, 'YTD': 15.3, '6M': 10.9, '1Y': 1.2 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, IndexChartByPeriod> = {
  'AI & ML': {
    '1D': { top10: [100, 99.56, 100.67, 99.46, 97.94, 97.08, 96.73, 96.57, 96.83, 96.23, 95.98, 95.38, 95.39, 95.13, 95.04, 94.69, 94.77, 94.89, 95.25, 95.35, 94.94, 95.06, 95.21, 95.55], spy: [100, 100.54, 100.67, 100.66, 100.36, 100.1, 100.04, 99.89, 99.94, 99.81, 99.77, 99.59, 99.62, 99.46, 99.43, 99.31, 99.35, 99.45, 99.65, 99.61, 99.5, 99.54, 99.67, 99.87], top10Return: -4.3, spyReturn: -0.13, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 102.99, 106.03, 101.94, 97.64], spy: [100, 101.65, 102.44, 102.3, 102.17], top10Return: -2.3, spyReturn: 2.2, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.04, 97.53, 89.23, 92.02, 90.21, 87.38, 92.08, 92.71, 97.57, 95.16, 99.27, 100.05, 94.14, 93.31, 95.05, 92.58, 95.35, 98.16, 94.35, 90.36], spy: [100, 99.3, 99.67, 97.1, 97.32, 97.04, 95.51, 97.13, 97.65, 99.38, 97.55, 98.31, 98, 96.58, 96.53, 96.67, 95.97, 97.56, 98.31, 98.18, 98.05], top10Return: -9.7, spyReturn: -1.9, xLabels: ["Jun 4", "Jun 11", "Jun 18", "Jun 25", "Jul 2"] },
    'YTD': { top10: [100, 102.26, 104.35, 105.09, 104.21, 102.1, 102.57, 101.98, 103.51, 102.02, 102.81, 101.55, 92.02, 101.19, 113.76, 117.72, 119.14, 128.85, 134.58, 131.19, 145.74, 155.81, 136.95, 149.74, 150.09, 141.64], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 100.07, 100.65, 99.46, 98.11, 96.11, 92.68, 96.67, 101.84, 103.25, 104.37, 106.14, 108.25, 107.6, 110.05, 110.61, 106.38, 108.66, 107.68, 109.22], top10Return: 41.6, spyReturn: 9.2, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 101.52, 102.77, 102.65, 102.83, 102.42, 100, 101.73, 97.55, 100.05, 101.17, 98.67, 94.94, 98.98, 111.24, 115.12, 116.5, 125.97, 131.55, 128.24, 142.4, 152.22, 133.84, 146.29, 146.61, 138.42], spy: [100, 101.6, 101.24, 101.4, 101.79, 101.58, 99.95, 100.61, 99.58, 99.12, 98.19, 95.61, 95.19, 96.49, 101.65, 103.06, 104.17, 105.94, 108.05, 107.4, 109.85, 110.4, 106.19, 108.46, 107.48, 109.02], top10Return: 38.4, spyReturn: 9, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 99.16, 102.54, 104.15, 102.68, 106.65, 107.41, 103.28, 109, 108.2, 114.17, 118.78, 116.55, 120.72, 119.42, 121.67, 123.02, 128.11, 123.34, 118.89, 112.26, 120.86, 123.43, 119.65, 120.3, 121.59, 123.91, 126.32, 123.38, 129.27, 124.92, 125.38, 124.5, 127.82, 123.2, 124.53, 124.8, 121.72, 117.01, 128.33, 138.12, 146.55, 145.49, 161.22, 167.26, 163.87, 176.49, 188.75, 165.77, 181.44, 182.02, 171.45], spy: [100, 99.72, 100.36, 101.88, 99.42, 101.89, 103.14, 101.63, 103.77, 103.5, 105.13, 106.13, 105.83, 107.02, 104.43, 106.24, 107.42, 108.71, 107.19, 107.47, 104.35, 109.28, 109.65, 109.02, 108.84, 110, 109.98, 111.17, 108.35, 111.22, 110.26, 110.68, 109.75, 110.84, 109.56, 108.15, 107.27, 104.45, 104, 108.1, 111.93, 113.73, 113.79, 117.35, 118.71, 118.54, 120.01, 120.61, 116.01, 118.49, 117.42, 119.1], top10Return: 71.5, spyReturn: 19.1, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Semiconductors': {
    '1D': { top10: [100, 99.07, 100.25, 98.73, 96.25, 94.94, 94.26, 94.31, 94.48, 93.56, 93.23, 92.25, 92.32, 91.89, 91.78, 90.99, 90.94, 91.21, 91.74, 92, 91.41, 91.45, 91.63, 92.59], spy: [100, 100.54, 100.67, 100.66, 100.36, 100.1, 100.04, 99.89, 99.94, 99.81, 99.77, 99.59, 99.62, 99.46, 99.43, 99.31, 99.35, 99.45, 99.65, 99.61, 99.5, 99.54, 99.67, 99.87], top10Return: -7.4, spyReturn: -0.13, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 103.42, 108.02, 100.3, 92.88], spy: [100, 101.65, 102.44, 102.3, 102.17], top10Return: -7.1, spyReturn: 2.2, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 101.2, 98.67, 87.12, 92.25, 90.79, 87.76, 96.21, 97.63, 103.36, 99, 106.41, 109.92, 99.75, 99.13, 104.24, 98.56, 101.91, 106.43, 98.71, 91.34], spy: [100, 99.3, 99.67, 97.1, 97.32, 97.04, 95.51, 97.13, 97.65, 99.38, 97.55, 98.31, 98, 96.58, 96.53, 96.67, 95.97, 97.56, 98.31, 98.18, 98.05], top10Return: -8.7, spyReturn: -1.9, xLabels: ["Jun 4", "Jun 11", "Jun 18", "Jun 25", "Jul 2"] },
    'YTD': { top10: [100, 107.01, 113.64, 117.36, 117.24, 119.41, 123.01, 122.39, 125.24, 124.83, 131.62, 130.44, 123.59, 131.74, 147.3, 161.82, 171.93, 187.43, 187.55, 179.92, 209.89, 216.54, 197.75, 218.25, 221.08, 194.92], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 100.07, 100.65, 99.46, 98.11, 96.11, 92.68, 96.67, 101.84, 103.25, 104.37, 106.14, 108.25, 107.6, 110.05, 110.61, 106.38, 108.66, 107.68, 109.22], top10Return: 94.9, spyReturn: 9.2, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 105.46, 110.92, 113.1, 115.3, 116.56, 118.85, 120.21, 117.08, 121.81, 128.33, 128.52, 125, 127.97, 142.97, 157.18, 167.13, 182.03, 181.78, 174.37, 203.57, 209.91, 191.9, 211.79, 214.38, 188.84], spy: [100, 101.6, 101.24, 101.4, 101.79, 101.58, 99.95, 100.61, 99.58, 99.12, 98.19, 95.61, 95.19, 96.49, 101.65, 103.06, 104.17, 105.94, 108.05, 107.4, 109.85, 110.4, 106.19, 108.46, 107.48, 109.02], top10Return: 88.8, spyReturn: 9, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 101.49, 102.47, 103.37, 102.04, 105.11, 110.45, 106.8, 111.8, 110.13, 113.09, 119.47, 119.15, 123.83, 119.04, 126.04, 128.02, 133.81, 134.75, 133.09, 124.45, 141.57, 142.99, 143.12, 142.35, 140.6, 143.57, 149.22, 153.74, 155.09, 160.76, 166.69, 168.06, 175.72, 168.91, 164.56, 155.31, 161.62, 156.64, 166.63, 183.06, 200.18, 203.63, 223.78, 238.12, 229.31, 244.34, 260.09, 233.13, 251.88, 251.69, 229.18], spy: [100, 99.72, 100.36, 101.88, 99.42, 101.89, 103.14, 101.63, 103.77, 103.5, 105.13, 106.13, 105.83, 107.02, 104.43, 106.24, 107.42, 108.71, 107.19, 107.47, 104.35, 109.28, 109.65, 109.02, 108.84, 110, 109.98, 111.17, 108.35, 111.22, 110.26, 110.68, 109.75, 110.84, 109.56, 108.15, 107.27, 104.45, 104, 108.1, 111.93, 113.73, 113.79, 117.35, 118.71, 118.54, 120.01, 120.61, 116.01, 118.49, 117.42, 119.1], top10Return: 129.2, spyReturn: 19.1, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Broad Tech': {
    '1D': { top10: [100, 100.2, 100.58, 100.21, 99.17, 98.27, 97.69, 97.5, 97.35, 96.99, 96.89, 96.43, 96.17, 95.97, 95.85, 95.62, 95.7, 95.71, 95.91, 96.02, 95.86, 95.8, 95.85, 96.4], spy: [100, 100.54, 100.67, 100.66, 100.36, 100.1, 100.04, 99.89, 99.94, 99.81, 99.77, 99.59, 99.62, 99.46, 99.43, 99.31, 99.35, 99.45, 99.65, 99.61, 99.5, 99.54, 99.67, 99.87], top10Return: -3.4, spyReturn: -0.13, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 102.62, 104.75, 102.09, 98.69], spy: [100, 101.65, 102.44, 102.3, 102.17], top10Return: -1.3, spyReturn: 2.2, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.74, 98.39, 91.61, 93.3, 91.64, 89.43, 93.41, 93.86, 97.22, 95.28, 97.51, 97.28, 94, 93, 93.84, 92.9, 95.23, 97.18, 94.68, 91.48], spy: [100, 99.3, 99.67, 97.1, 97.32, 97.04, 95.51, 97.13, 97.65, 99.38, 97.55, 98.31, 98, 96.58, 96.53, 96.67, 95.97, 97.56, 98.31, 98.18, 98.05], top10Return: -8.5, spyReturn: -1.9, xLabels: ["Jun 4", "Jun 11", "Jun 18", "Jun 25", "Jul 2"] },
    'YTD': { top10: [100, 103.16, 105.13, 104.89, 102.07, 100.41, 102.1, 101.54, 104.65, 102.5, 102.21, 100.71, 94.12, 101.69, 110.51, 114.12, 113.75, 123.13, 125.72, 120.8, 129.27, 134.84, 122.97, 130.51, 129.77, 124.35], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 100.07, 100.65, 99.46, 98.11, 96.11, 92.68, 96.67, 101.84, 103.25, 104.37, 106.14, 108.25, 107.6, 110.05, 110.61, 106.38, 108.66, 107.68, 109.22], top10Return: 24.3, spyReturn: 9.2, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 102.65, 103.86, 103.06, 100.99, 100.84, 100.14, 101.72, 100.3, 100.96, 101.49, 98.83, 96.5, 100.14, 108.7, 112.3, 111.95, 121.12, 123.61, 118.82, 126.98, 132.49, 120.91, 128.19, 127.49, 122.38], spy: [100, 101.6, 101.24, 101.4, 101.79, 101.58, 99.95, 100.61, 99.58, 99.12, 98.19, 95.61, 95.19, 96.49, 101.65, 103.06, 104.17, 105.94, 108.05, 107.4, 109.85, 110.4, 106.19, 108.46, 107.48, 109.02], top10Return: 22.4, spyReturn: 9, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 98.84, 102.01, 102.72, 100.12, 102.58, 103.08, 101.05, 105.26, 104.67, 108.32, 113.24, 111.55, 115.03, 114.72, 116.13, 116.17, 118.46, 117.07, 111.33, 106.66, 114.4, 114.41, 112.73, 113.15, 112.83, 115.34, 118.02, 116.98, 120.57, 117.12, 117.87, 116.79, 119.55, 119.03, 118.39, 119.03, 117.34, 114.3, 120.68, 125.5, 129.66, 128.74, 139, 138.82, 137.55, 144.62, 148.73, 137.01, 145.73, 145.24, 137.87], spy: [100, 99.72, 100.36, 101.88, 99.42, 101.89, 103.14, 101.63, 103.77, 103.5, 105.13, 106.13, 105.83, 107.02, 104.43, 106.24, 107.42, 108.71, 107.19, 107.47, 104.35, 109.28, 109.65, 109.02, 108.84, 110, 109.98, 111.17, 108.35, 111.22, 110.26, 110.68, 109.75, 110.84, 109.56, 108.15, 107.27, 104.45, 104, 108.1, 111.93, 113.73, 113.79, 117.35, 118.71, 118.54, 120.01, 120.61, 116.01, 118.49, 117.42, 119.1], top10Return: 37.9, spyReturn: 19.1, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Electrification': {
    '1D': { top10: [100, 100.25, 101.04, 100.48, 99.45, 99.07, 98.9, 98.53, 98.45, 98.16, 97.78, 97.31, 97.18, 97.16, 96.84, 96.64, 96.62, 96.74, 96.88, 96.94, 96.89, 96.79, 96.95, 97.43], spy: [100, 100.54, 100.67, 100.66, 100.36, 100.1, 100.04, 99.89, 99.94, 99.81, 99.77, 99.59, 99.62, 99.46, 99.43, 99.31, 99.35, 99.45, 99.65, 99.61, 99.5, 99.54, 99.67, 99.87], top10Return: -2.6, spyReturn: -0.13, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 102.02, 104.2, 101.23, 98.62], spy: [100, 101.65, 102.44, 102.3, 102.17], top10Return: -1.4, spyReturn: 2.2, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.99, 98.89, 92.85, 92.95, 91.9, 88.94, 92.56, 93.44, 95.57, 94.59, 96.73, 97.81, 93.52, 92.91, 93.47, 90.85, 92.63, 94.61, 91.85, 89.51], spy: [100, 99.3, 99.67, 97.1, 97.32, 97.04, 95.51, 97.13, 97.65, 99.38, 97.55, 98.31, 98, 96.58, 96.53, 96.67, 95.97, 97.56, 98.31, 98.18, 98.05], top10Return: -10.5, spyReturn: -1.9, xLabels: ["Jun 4", "Jun 11", "Jun 18", "Jun 25", "Jul 2"] },
    'YTD': { top10: [100, 103.61, 108.25, 111.14, 110.01, 113.71, 114.8, 116.45, 117.59, 112.36, 114.18, 114.11, 109.11, 113.86, 123.2, 124.39, 127.87, 136.21, 135.27, 126.87, 138.46, 138.75, 125.52, 132.13, 129.74, 124.59], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 100.07, 100.65, 99.46, 98.11, 96.11, 92.68, 96.67, 101.84, 103.25, 104.37, 106.14, 108.25, 107.6, 110.05, 110.61, 106.38, 108.66, 107.68, 109.22], top10Return: 24.6, spyReturn: 9.2, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 101.34, 106.08, 107.37, 106.47, 111.73, 111.42, 115, 109.95, 109.68, 111.63, 111.42, 108.96, 110.48, 119.49, 120.6, 123.98, 131.99, 131.03, 122.94, 134.08, 134.37, 121.67, 128.04, 125.77, 120.75], spy: [100, 101.6, 101.24, 101.4, 101.79, 101.58, 99.95, 100.61, 99.58, 99.12, 98.19, 95.61, 95.19, 96.49, 101.65, 103.06, 104.17, 105.94, 108.05, 107.4, 109.85, 110.4, 106.19, 108.46, 107.48, 109.02], top10Return: 20.7, spyReturn: 9, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 100.64, 103.96, 106.01, 102.03, 103.35, 104.86, 104.79, 107.49, 107.68, 108.39, 111.4, 112.14, 116.74, 117.86, 120.4, 120.43, 122.39, 121.38, 119.73, 116.4, 122.64, 123.41, 121.73, 122.59, 122.48, 124.44, 126.68, 127.67, 131.74, 131.05, 131.05, 131.28, 134.51, 132.49, 132.52, 132.67, 134.19, 133.97, 139.68, 144.98, 148.18, 145.02, 154.66, 156.46, 150.32, 156.76, 157.66, 145.13, 150.03, 146.79, 142.06], spy: [100, 99.72, 100.36, 101.88, 99.42, 101.89, 103.14, 101.63, 103.77, 103.5, 105.13, 106.13, 105.83, 107.02, 104.43, 106.24, 107.42, 108.71, 107.19, 107.47, 104.35, 109.28, 109.65, 109.02, 108.84, 110, 109.98, 111.17, 108.35, 111.22, 110.26, 110.68, 109.75, 110.84, 109.56, 108.15, 107.27, 104.45, 104, 108.1, 111.93, 113.73, 113.79, 117.35, 118.71, 118.54, 120.01, 120.61, 116.01, 118.49, 117.42, 119.1], top10Return: 42.1, spyReturn: 19.1, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Industrials': {
    '1D': { top10: [100, 101.08, 101.36, 101.21, 100.94, 100.4, 99.95, 99.81, 99.81, 99.46, 99.34, 99.24, 99.17, 98.9, 98.64, 98.44, 98.49, 98.49, 98.39, 98.45, 98.4, 98.41, 98.72, 98.98], spy: [100, 100.54, 100.67, 100.66, 100.36, 100.1, 100.04, 99.89, 99.94, 99.81, 99.77, 99.59, 99.62, 99.46, 99.43, 99.31, 99.35, 99.45, 99.65, 99.61, 99.5, 99.54, 99.67, 99.87], top10Return: -1, spyReturn: -0.13, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 100.43, 101.36, 100.74, 99.6], spy: [100, 101.65, 102.44, 102.3, 102.17], top10Return: -0.4, spyReturn: 2.2, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.64, 100.33, 98.18, 98.05, 98.64, 96.95, 99.35, 99.79, 99.77, 98.68, 99.96, 100.78, 99.77, 99.67, 101.04, 99.95, 100.35, 101.28, 100.66, 99.44], spy: [100, 99.3, 99.67, 97.1, 97.32, 97.04, 95.51, 97.13, 97.65, 99.38, 97.55, 98.31, 98, 96.58, 96.53, 96.67, 95.97, 97.56, 98.31, 98.18, 98.05], top10Return: -0.6, spyReturn: -1.9, xLabels: ["Jun 4", "Jun 11", "Jun 18", "Jun 25", "Jul 2"] },
    'YTD': { top10: [100, 105.14, 110.48, 110.36, 110.07, 114.34, 117.61, 118.93, 119.73, 114.05, 112.43, 111.38, 107.51, 113.07, 120.26, 119.6, 119.66, 123.86, 124.07, 120.46, 124.27, 123.96, 120.71, 124.38, 126.48, 123.89], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 100.07, 100.65, 99.46, 98.11, 96.11, 92.68, 96.67, 101.84, 103.25, 104.37, 106.14, 108.25, 107.6, 110.05, 110.61, 106.38, 108.66, 107.68, 109.22], top10Return: 23.9, spyReturn: 9.2, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 103.9, 108.31, 107.43, 107.5, 112.4, 114.37, 116.61, 115.23, 112.29, 110.93, 109.19, 108.75, 110.32, 116.93, 116, 116.43, 119.92, 121.54, 117.37, 121.16, 120.99, 117.8, 121.33, 123.38, 120.88], spy: [100, 101.6, 101.24, 101.4, 101.79, 101.58, 99.95, 100.61, 99.58, 99.12, 98.19, 95.61, 95.19, 96.49, 101.65, 103.06, 104.17, 105.94, 108.05, 107.4, 109.85, 110.4, 106.19, 108.46, 107.48, 109.02], top10Return: 20.9, spyReturn: 9, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 100.62, 102.28, 104.07, 101.92, 103.04, 104.02, 102.58, 105.33, 104.75, 106.78, 108.03, 108.08, 110.55, 108.59, 108.87, 110.61, 111.98, 109.7, 107.61, 103.76, 109.03, 109.32, 111.16, 110.61, 111.72, 114.93, 119.42, 121.79, 123.45, 124.85, 128.63, 130.87, 130.86, 129.97, 124.54, 123.52, 122.92, 121.92, 127.94, 131.12, 132.88, 130.79, 137.87, 136.67, 134.68, 136.68, 136.82, 132.14, 137.16, 139.48, 136.51], spy: [100, 99.72, 100.36, 101.88, 99.42, 101.89, 103.14, 101.63, 103.77, 103.5, 105.13, 106.13, 105.83, 107.02, 104.43, 106.24, 107.42, 108.71, 107.19, 107.47, 104.35, 109.28, 109.65, 109.02, 108.84, 110, 109.98, 111.17, 108.35, 111.22, 110.26, 110.68, 109.75, 110.84, 109.56, 108.15, 107.27, 104.45, 104, 108.1, 111.93, 113.73, 113.79, 117.35, 118.71, 118.54, 120.01, 120.61, 116.01, 118.49, 117.42, 119.1], top10Return: 36.5, spyReturn: 19.1, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Meme': {
    '1D': { top10: [100, 100.65, 101.72, 100.69, 99.06, 97.71, 96.57, 96.11, 96.78, 96.27, 95.97, 95.37, 95.07, 94.72, 94.27, 94.44, 93.88, 94.04, 94.65, 94.83, 94.49, 94.56, 94.94, 95.59], spy: [100, 100.54, 100.67, 100.66, 100.36, 100.1, 100.04, 99.89, 99.94, 99.81, 99.77, 99.59, 99.62, 99.46, 99.43, 99.31, 99.35, 99.45, 99.65, 99.61, 99.5, 99.54, 99.67, 99.87], top10Return: -5.6, spyReturn: -0.13, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 104.4, 106.58, 102.53, 97.15], spy: [100, 101.65, 102.44, 102.3, 102.17], top10Return: -2.9, spyReturn: 2.2, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 96.53, 97.03, 87.18, 89.41, 86.26, 83.87, 89.26, 88.14, 93.04, 89.96, 93.15, 93.01, 88.72, 85.77, 85.32, 83.59, 87.17, 88.97, 85.68, 81.28], spy: [100, 99.3, 99.67, 97.1, 97.32, 97.04, 95.51, 97.13, 97.65, 99.38, 97.55, 98.31, 98, 96.58, 96.53, 96.67, 95.97, 97.56, 98.31, 98.18, 98.05], top10Return: -18.7, spyReturn: -1.9, xLabels: ["Jun 4", "Jun 11", "Jun 18", "Jun 25", "Jul 2"] },
    'YTD': { top10: [100, 108.03, 105.55, 106.35, 99.62, 96.61, 92.49, 93.37, 95.86, 92.23, 93.45, 92.76, 85.8, 95.73, 109.79, 113.13, 110.76, 122.46, 123.8, 122.14, 140.71, 134.92, 122.9, 130.54, 120.63, 115.35], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 100.07, 100.65, 99.46, 98.11, 96.11, 92.68, 96.67, 101.84, 103.25, 104.37, 106.14, 108.25, 107.6, 110.05, 110.61, 106.38, 108.66, 107.68, 109.22], top10Return: 15.3, spyReturn: 9.2, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 106.14, 103.76, 99.84, 95.3, 95.66, 88.59, 90.85, 89.56, 88.87, 90.4, 88.78, 86.36, 92.21, 105.46, 108.51, 106.61, 117.62, 118.67, 117.37, 134.83, 129.21, 118.03, 125.38, 115.85, 110.88], spy: [100, 101.6, 101.24, 101.4, 101.79, 101.58, 99.95, 100.61, 99.58, 99.12, 98.19, 95.61, 95.19, 96.49, 101.65, 103.06, 104.17, 105.94, 108.05, 107.4, 109.85, 110.4, 106.19, 108.46, 107.48, 109.02], top10Return: 10.9, spyReturn: 9, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 103.12, 101.62, 95.3, 91.32, 91.21, 89.76, 85.5, 84.45, 81.14, 86.84, 88.82, 90.13, 87.86, 86.04, 90.34, 87.21, 93, 91.3, 88.91, 84.5, 85.13, 86.42, 85.41, 87.29, 86.8, 90.37, 91.75, 91.18, 92.13, 91.43, 89.43, 90.39, 89.43, 90.93, 94.84, 99.34, 94.73, 95.17, 99.21, 107.97, 111.22, 108.77, 108.45, 113.31, 114.22, 113.17, 116.89, 109.26, 108.85, 105.78, 101.24], spy: [100, 99.72, 100.36, 101.88, 99.42, 101.89, 103.14, 101.63, 103.77, 103.5, 105.13, 106.13, 105.83, 107.02, 104.43, 106.24, 107.42, 108.71, 107.19, 107.47, 104.35, 109.28, 109.65, 109.02, 108.84, 110, 109.98, 111.17, 108.35, 111.22, 110.26, 110.68, 109.75, 110.84, 109.56, 108.15, 107.27, 104.45, 104, 108.1, 111.93, 113.73, 113.79, 117.35, 118.71, 118.54, 120.01, 120.61, 116.01, 118.49, 117.42, 119.1], top10Return: 1.2, spyReturn: 19.1, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
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
export const SCAN_TIMESTAMP    = '2026-07-02T21:24:02.328Z';
export const SCAN_TIMESTAMP_NY = 'July 2, 2026 at 5:24 PM ET';
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
export const HOLDINGS_COUNT = 1288;
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
  { ticker: 'MU', name: `Micron Technology Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 13.15, bestProScore: 5.49, avgProScore: 4.38, price: 975.56, weeklyChange: -13.84 },
  { ticker: 'NVDA', name: `NVIDIA Corp`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 12.41, bestProScore: 6.07, avgProScore: 4.14, price: 194.83, weeklyChange: 1.19 },
  { ticker: 'AMD', name: `Advanced Micro Devices Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 10.72, bestProScore: 5.04, avgProScore: 3.57, price: 517.82, weeklyChange: -0.72 },
  { ticker: 'AVGO', name: `Broadcom Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 6.37, bestProScore: 2.77, avgProScore: 2.12, price: 360.45, weeklyChange: -1.25 },
  { ticker: 'INTC', name: `INTEL CORPORATION`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.64, bestProScore: 3.39, avgProScore: 2.32, price: 120.35, weeklyChange: -6.21 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.58, bestProScore: 2.90, avgProScore: 2.29, price: 434.16, weeklyChange: 0.42 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.40, bestProScore: 2.53, avgProScore: 2.20, price: 245.29, weeklyChange: -8.05 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 4.18, bestProScore: 2.22, avgProScore: 2.09, price: 246.33, weeklyChange: -11.95 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 4.03, bestProScore: 2.60, avgProScore: 2.02, price: 351.41, weeklyChange: -7.30 },
  { ticker: 'GOOGL', name: `ALPHABET INC CLASS A`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 3.52, bestProScore: 2.96, avgProScore: 1.76, price: 359.91, weeklyChange: 6.67 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': -7, '1M': -9.5, 'YTD': 96.5, '6M': 88.2, '1Y': 164.3 },
  ARTY: { '1W': -1.6, '1M': -12, 'YTD': 47.6, '6M': 43.3, '1Y': 72.1 },
  BAI:  { '1W': -4.3, '1M': -9.5, 'YTD': 41.1, '6M': 39, '1Y': 62.3 },
  IGPT: { '1W': -3.6, '1M': -6.8, 'YTD': 60.2, '6M': 56.2, '1Y': 93.7 },
  IVES: { '1W': 3, '1M': -10, 'YTD': 17.9, '6M': 16.5, '1Y': 35 },
  ALAI: { '1W': -1, '1M': -6.3, 'YTD': 20.7, '6M': 20, '1Y': 42 },
  CHAT: { '1W': -5.1, '1M': -14.2, 'YTD': 50.6, '6M': 47, '1Y': 82.1 },
  AIFD: { '1W': -0.5, '1M': -9.9, 'YTD': 37.3, '6M': 35.2, '1Y': 66.3 },
  SPRX: { '1W': -4.2, '1M': -13.7, 'YTD': 31.8, '6M': 25.8, '1Y': 70.5 },
  AOTG: { '1W': 0.9, '1M': -4.8, 'YTD': 12.7, '6M': 13.1, '1Y': 26.2 },
  // Semiconductors
  SOXX: { '1W': -4, '1M': -6.4, 'YTD': 88.1, '6M': 80.5, '1Y': 132.7 },
  PSI:  { '1W': -6, '1M': -2.2, 'YTD': 100.4, '6M': 90.7, '1Y': 155.9 },
  XSD:  { '1W': -2.8, '1M': -13.2, 'YTD': 72.8, '6M': 65.8, '1Y': 109.7 },
  DRAM: { '1W': -15.7, '1M': -12.9, 'YTD': 118.4, '6M': 118.4, '1Y': 118.4 },
  // Broad Tech
  PTF:  { '1W': -10, '1M': -16.3, 'YTD': 48.3, '6M': 43.5, '1Y': 66.1 },
  WCLD: { '1W': 9.2, '1M': -3.6, 'YTD': -4.3, '6M': -1, '1Y': -8.6 },
  IGV:  { '1W': 6.1, '1M': -10.7, 'YTD': -11.5, '6M': -8.8, '1Y': -15.9 },
  FDTX: { '1W': -1.4, '1M': -7.6, 'YTD': 32.2, '6M': 31.8, '1Y': 37.2 },
  GTEK: { '1W': -0.1, '1M': -3.2, 'YTD': 49.1, '6M': 47.1, '1Y': 63.7 },
  ARKK: { '1W': 4, '1M': 1.7, 'YTD': 5.6, '6M': 3.8, '1Y': 14.3 },
  MARS: { '1W': 11.4, '1M': -20.4, 'YTD': 26.6, '6M': 26.6, '1Y': 26.6 },
  FRWD: { '1W': -1.2, '1M': -6.5, 'YTD': 27.1, '6M': 27.1, '1Y': 27.1 },
  BCTK: { '1W': 1, '1M': -5.3, 'YTD': 21.6, '6M': 20.8, '1Y': 23.8 },
  FWD:  { '1W': -2.3, '1M': -6.2, 'YTD': 31.7, '6M': 28.8, '1Y': 53.8 },
  CBSE: { '1W': -1.4, '1M': -4.3, 'YTD': 27.7, '6M': 23.8, '1Y': 35.5 },
  FCUS: { '1W': -7.7, '1M': -15, 'YTD': 26.4, '6M': 20.9, '1Y': 53.3 },
  WGMI: { '1W': -19.1, '1M': -25.6, 'YTD': 39, '6M': 26.5, '1Y': 104.3 },
  CNEQ: { '1W': 0.4, '1M': -4.5, 'YTD': 15.4, '6M': 14.8, '1Y': 35.3 },
  SGRT: { '1W': -6.5, '1M': -11.1, 'YTD': 34.5, '6M': 32.6, '1Y': 68.3 },
  SPMO: { '1W': -2.2, '1M': -2.3, 'YTD': 26.4, '6M': 26, '1Y': 34.1 },
  XMMO: { '1W': -2.4, '1M': -4, 'YTD': 17.8, '6M': 16.2, '1Y': 24.9 },
  // Electrification
  POW:  { '1W': -1.7, '1M': -7.5, 'YTD': 47, '6M': 42.2, '1Y': 42.7 },
  VOLT: { '1W': -2.9, '1M': -1.2, 'YTD': 35.4, '6M': 31.8, '1Y': 52.4 },
  PBD:  { '1W': 1, '1M': -15.2, 'YTD': 18.4, '6M': 14.4, '1Y': 43.7 },
  PBW:  { '1W': -0.7, '1M': -22.2, 'YTD': 19.8, '6M': 13, '1Y': 69.2 },
  IVEP: { '1W': -2.6, '1M': -6.4, 'YTD': 2.3, '6M': 2.3, '1Y': 2.3 },
  // Industrials
  AIRR: { '1W': -2.9, '1M': -2.2, 'YTD': 28.1, '6M': 24, '1Y': 49.3 },
  PRN:  { '1W': -5.7, '1M': -4.5, 'YTD': 34.7, '6M': 30.3, '1Y': 49.1 },
  RSHO: { '1W': 0, '1M': 5.8, 'YTD': 39.4, '6M': 36.1, '1Y': 53 },
  IDEF: { '1W': 6.5, '1M': -0.4, 'YTD': 7.1, '6M': 4.2, '1Y': 17.7 },
  BILT: { '1W': 0.1, '1M': -1.5, 'YTD': 10.2, '6M': 9.7, '1Y': 13.5 },
  // Meme
  BUZZ: { '1W': 2, '1M': -10.7, 'YTD': 11.8, '6M': 9.1, '1Y': 19.3 },
  MEME: { '1W': -4.6, '1M': -28.4, 'YTD': 35.3, '6M': 24.7, '1Y': -14.5 },
  RKNG: { '1W': -6, '1M': -17.1, 'YTD': -1.1, '6M': -1.1, '1Y': -1.1 },
};
// @@END_GENERATED:ETF_RETURNS@@

// @@GENERATED:ETF_DAY_CHANGE@@
// Today's % move per ETF ticker (1D, vs prior close). Refreshed by the 3×/day
// price jobs. Powers the 1D ranking in the theme-ETF side panel.
export const ETF_DAY_CHANGE: Record<string, number> = {
  AIS:  -6.62,
  ARTY: -2.8,
  BAI:  -5.03,
  IGPT: -4.86,
  IVES: -1.66,
  ALAI: -3.24,
  CHAT: -5.06,
  AIFD: -3.96,
  SPRX: -6.83,
  AOTG: -2.85,
  SOXX: -5.57,
  PSI:  -9.4,
  XSD:  -6.74,
  DRAM: -7.94,
  PTF:  -10.49,
  WCLD: 0.99,
  IGV:  0.25,
  FDTX: -4.21,
  GTEK: -3.48,
  ARKK: -0.73,
  MARS: 0.22,
  FRWD: -2.96,
  BCTK: -2.86,
  FWD:  -3.75,
  CBSE: -1.19,
  FCUS: -7.98,
  WGMI: -9.49,
  CNEQ: -2.05,
  SGRT: -5.69,
  SPMO: -2.89,
  XMMO: -1.72,
  POW:  -3.28,
  VOLT: -3,
  PBD:  -1.4,
  PBW:  -4.04,
  IVEP: -1.11,
  AIRR: -2.67,
  PRN:  -5.94,
  IDEF: 2.87,
  BILT: 1.68,
  BUZZ: -1.33,
  MEME: -7.5,
  RKNG: -7.83,
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
  'AI & ML': { etfs: ['AIS', 'IVES', 'SPRX'], series: { '1W': [100, 104, 107.22, 102.45, 97.28], '1M': [100, 98.74, 97.27, 88.07, 91.02, 88.86, 86.17, 91.67, 92.39, 96.83, 94.14, 98.27, 99.39, 93.39, 92.28, 94.08, 91.63, 95.28, 98.25, 93.78, 88.98], 'YTD': [100, 103.29, 107, 107.92, 106.62, 105.08, 104.9, 104.22, 106.52, 104.11, 105.72, 103.8, 92.21, 102.61, 115.63, 120.03, 120.4, 130.61, 138.6, 135.94, 154.67, 165.34, 143.64, 158.11, 159.34, 148.76], '6M': [100, 101.64, 104.8, 103.43, 103.97, 104.83, 100.83, 102.72, 98.6, 100.41, 102.53, 99.63, 94.38, 99.06, 111.59, 115.84, 116.2, 126.02, 133.72, 131.17, 149.14, 159.42, 138.54, 152.42, 153.56, 143.47], '1Y': [100, 98.75, 102.64, 104.44, 103.24, 108.12, 108.89, 104.01, 110.81, 110.01, 118.02, 124.66, 122.16, 127.72, 127, 129.1, 130.94, 136.47, 131.4, 124.67, 116.67, 126.6, 129.5, 125.04, 126.33, 127.62, 131.55, 135.14, 134.04, 139.56, 135.77, 135.77, 133.19, 137.63, 133.07, 133.51, 134.62, 130.91, 123.86, 137.48, 147.34, 158.18, 155.44, 172.74, 183.25, 180.28, 197.56, 211.31, 183.33, 202.28, 204.29, 189.93] }, returns: { '1W': -2.7, '1M': -11, 'YTD': 48.8, '6M': 43.5, '1Y': 89.9 } },
  'Semiconductors': { etfs: ['PSI', 'DRAM', 'XSD'], series: { '1W': [100, 103.18, 107.83, 99.85, 91.83], '1M': [100, 101.02, 98.35, 86.42, 91.51, 90.09, 87.18, 95.94, 97.32, 103.19, 98.96, 106.65, 110.48, 99.76, 99.04, 104.54, 98.91, 102.04, 106.6, 98.57, 90.59], 'YTD': [100, 107.31, 114.2, 118.33, 117.99, 120.64, 124.76, 123.69, 128.03, 129.21, 138.09, 136.66, 130.5, 137.16, 151.98, 169.2, 180.68, 196.48, 192.95, 184.91, 217.42, 220.57, 203.74, 224.61, 225.57, 197.21], '6M': [100, 105.68, 111.5, 114.34, 116.26, 117.92, 120.84, 121.8, 120.53, 126.4, 134.96, 135.12, 131.74, 133.68, 147.99, 164.87, 176.23, 191.42, 187.55, 179.71, 211.5, 214.46, 198.32, 218.66, 219.4, 191.61], '1Y': [100, 101.6, 102.82, 104.74, 103.56, 106.88, 112.46, 109.2, 114.48, 113, 115.77, 122.88, 122.04, 126.76, 121.47, 128.58, 130.82, 136.58, 138.92, 137.81, 129.21, 148.11, 148.27, 149.8, 148.73, 145.64, 147.86, 153.71, 158.78, 158.7, 167, 174.11, 175.04, 183.88, 178.42, 172.55, 160.48, 168.77, 163.83, 171.44, 189.03, 207.76, 209.86, 228.94, 245.12, 234.48, 248.53, 262.45, 236.66, 253.68, 249.95, 228] }, returns: { '1W': -8.2, '1M': -9.4, 'YTD': 97.2, '6M': 91.6, '1Y': 128 } },
  'Broad Tech': { etfs: ['WGMI', 'GTEK', 'SGRT'], series: { '1W': [100, 100.13, 101.86, 97.36, 91.44], '1M': [100, 99.5, 98.28, 89.61, 92.84, 90.72, 87.36, 92.62, 94.29, 98.26, 96.79, 100.07, 101.26, 97.59, 95.43, 95.72, 94.61, 94.78, 96.44, 92.22, 86.67], 'YTD': [100, 107.13, 111.83, 113.61, 108.48, 105.77, 108.54, 107.69, 110.73, 103.85, 106.79, 105.86, 95.15, 105.37, 122.14, 124.57, 123.61, 138.31, 142.77, 135.98, 157.58, 163.23, 142.89, 158.78, 156.53, 140.89], '6M': [100, 104.08, 109.88, 106.89, 104.48, 105.85, 103, 107.22, 100.96, 100.69, 103.21, 101.66, 96.3, 101.41, 117.28, 119.68, 118.8, 132.72, 136.95, 130.44, 150.82, 156.27, 136.96, 152.01, 150.04, 135.4], '1Y': [100, 98.83, 101.76, 103.15, 99.23, 102.81, 105.44, 106.21, 113.73, 112.16, 123.56, 132.38, 130.75, 139.51, 145.44, 148.92, 144.43, 150.31, 151.59, 130.02, 125.63, 140.91, 137.64, 134.25, 132.8, 132.44, 141.68, 143.38, 144.39, 150.96, 144.02, 142.72, 134.65, 139.99, 137.85, 134.51, 134.59, 135.1, 134.26, 145.95, 158.27, 164.81, 160.83, 188.53, 181.9, 183.43, 204.83, 204.98, 187.28, 205.07, 198.18, 178.77] }, returns: { '1W': -8.6, '1M': -13.3, 'YTD': 40.9, '6M': 35.4, '1Y': 78.8 } },
  'Electrification': { etfs: ['POW', 'VOLT', 'PBW'], series: { '1W': [100, 102.53, 105.02, 101.74, 98.23], '1M': [100, 98.92, 98.79, 92.12, 92.82, 91.74, 88.72, 92.8, 93.57, 96.12, 95.19, 97.39, 98.51, 94.07, 93.42, 94.21, 91.41, 93.64, 95.93, 92.87, 89.72], 'YTD': [100, 104.13, 109.93, 112.37, 112.23, 115.87, 118.59, 119.33, 120.87, 114.8, 116.56, 116.34, 110.84, 116.59, 128.11, 130.43, 134.96, 146.19, 146.34, 134.86, 149.04, 148.29, 132.77, 142.43, 140.7, 134.07], '6M': [100, 101.21, 107.28, 107.52, 107.83, 113.48, 113.99, 117.58, 111.29, 111.56, 113.18, 113.39, 110.66, 112.21, 123.29, 125.49, 129.87, 140.66, 140.77, 129.73, 143.28, 142.55, 127.72, 137.02, 135.42, 129], '1Y': [100, 100.81, 105.14, 107.21, 102.11, 103.28, 104.91, 104.61, 108.32, 108, 108.18, 112.09, 114.25, 119.18, 120.92, 122.96, 123.27, 124.99, 124.06, 122.18, 118.42, 127.1, 128.36, 126.45, 128.58, 128.57, 130.05, 131.99, 133.12, 137.4, 137.42, 137.2, 137.48, 140.39, 140.05, 139.89, 140.88, 144.81, 144.89, 151.65, 157.68, 160.6, 154.77, 166.19, 168.67, 162.61, 169.5, 170.65, 157.38, 163.8, 161.83, 154.75] }, returns: { '1W': -1.8, '1M': -10.3, 'YTD': 34.1, '6M': 29, '1Y': 54.8 } },
  'Industrials': { etfs: ['RSHO', 'PRN', 'BILT'], series: { '1W': [100, 99.88, 100.49, 100.13, 98.13], '1M': [100, 100.06, 100.06, 98.36, 98.08, 99.25, 98.24, 99.31, 100.3, 99.7, 97.93, 100.18, 101.57, 101.03, 101.01, 102.81, 101.84, 101.69, 102.33, 102.01, 99.94], 'YTD': [100, 102.86, 107.52, 107.45, 108.67, 113.02, 118.03, 119.37, 119.23, 112.64, 111.71, 111.28, 109.29, 113.3, 120.98, 121.03, 122.09, 126.18, 127.26, 124.73, 127.07, 127.78, 125.63, 127.92, 132.21, 128.1], '6M': [100, 101.33, 105.32, 105.14, 106.11, 110.84, 115.01, 117.35, 115.47, 112.66, 110.85, 109.75, 110.41, 110.91, 117.76, 117.32, 118.97, 121.96, 125.37, 121.79, 124.22, 125.15, 123, 125.16, 129.35, 125.38], '1Y': [100, 100.64, 102.36, 103.89, 102.11, 102.05, 102.68, 101.77, 103.9, 103.53, 105.45, 105.9, 105.43, 107.58, 106.41, 106.87, 107.74, 109.23, 107.95, 106.26, 102.44, 107.4, 107.7, 109.24, 108.13, 109.54, 111.22, 114.19, 116.76, 118.38, 120.72, 125.86, 129, 128.74, 126.64, 121.06, 119.55, 120.57, 120.51, 124.63, 129.16, 131.83, 131.36, 137.28, 137.49, 136.42, 136.89, 138.48, 134.41, 138.44, 143.09, 138.53] }, returns: { '1W': -1.9, '1M': -0.1, 'YTD': 28.1, '6M': 25.4, '1Y': 38.5 } },
  'Meme': { etfs: ['BUZZ', 'MEME', 'RKNG'], series: { '1W': [100, 104.4, 106.58, 102.53, 97.15], '1M': [100, 96.53, 97.03, 87.18, 89.41, 86.26, 83.87, 89.26, 88.14, 93.04, 89.96, 93.15, 93.01, 88.72, 85.77, 85.32, 83.59, 87.17, 88.97, 85.68, 81.28], 'YTD': [100, 108.03, 105.55, 106.35, 99.62, 96.61, 92.49, 93.37, 95.86, 92.23, 93.45, 92.76, 85.8, 95.73, 109.79, 113.13, 110.76, 122.46, 123.8, 122.14, 140.71, 134.92, 122.9, 130.54, 120.63, 115.35], '6M': [100, 106.14, 103.76, 99.84, 95.3, 95.66, 88.59, 90.85, 89.56, 88.87, 90.4, 88.78, 86.36, 92.21, 105.46, 108.51, 106.61, 117.62, 118.67, 117.37, 134.83, 129.21, 118.03, 125.38, 115.85, 110.88], '1Y': [100, 103.12, 101.62, 95.3, 91.32, 91.21, 89.76, 85.5, 84.45, 81.14, 86.84, 88.82, 90.13, 87.86, 86.04, 90.34, 87.21, 93, 91.3, 88.91, 84.5, 85.13, 86.42, 85.41, 87.29, 86.8, 90.37, 91.75, 91.18, 92.13, 91.43, 89.43, 90.39, 89.43, 90.93, 94.84, 99.34, 94.73, 95.17, 99.21, 107.97, 111.22, 108.77, 108.45, 113.31, 114.22, 113.17, 116.89, 109.26, 108.85, 105.78, 101.24] }, returns: { '1W': -2.8, '1M': -18.7, 'YTD': 15.3, '6M': 10.9, '1Y': 1.2 } },
};
// @@END_GENERATED:THEME_REPRESENTATIVES@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 10, avgWeight: 6.07, proScore: 6.07, coverage: 1,
      price: 194.83, weeklyPrices: [192.53, 194.97, 200.09, 197.58, 194.83], weeklyChange: 1.19, dayChange: -1.39, sortRank: 0, periodReturns: { '1M': -12.6, 'YTD': 4.5, '6M': 3.2, '1Y': 22.3 },
      priceHistory: { '1D': [197.58, 198.1, 199.54, 199.21, 197.1, 195.5, 195.26, 194.78, 195.07, 194.36, 194.07, 193.43, 193.87, 193.07, 193.05, 192.84, 192.85, 192.93, 193.46, 193.46, 192.88, 193.1, 193.63, 194.83], '1W': [192.53, 194.97, 200.09, 197.58, 194.83], '1M': [222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83], 'YTD': [186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 212.6, 214.75, 200.42, 204.65, 195.74, 194.83], '6M': [188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 184.77, 181.93, 175.2, 174.4, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 212.6, 214.75, 200.42, 204.65, 195.74, 194.83], '1Y': [159.34, 164.92, 172.41, 173.5, 173.72, 182.7, 182.02, 174.98, 180.17, 167.02, 177.82, 176.67, 178.19, 187.62, 183.16, 183.22, 182.16, 202.89, 188.08, 186.86, 180.64, 177, 182.41, 175.02, 180.99, 188.22, 188.12, 184.94, 178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 186.03, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 223.47, 212.6, 214.75, 200.42, 204.65, 195.74, 194.83] },
      velocityScore: { '1D': 0.7, '1W': -2.4, '1M': 2.9, '6M': null }, isNew: false,
      marketCap: '$4.7T', pe: 29.9, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.51,
      etfPresence: { AIS: 2.36, ARTY: 4.45, BAI: 3.98, IGPT: 7.37, IVES: 4.68, ALAI: 12.26, CHAT: 6.45, AIFD: 6.05, SPRX: 3.2, AOTG: 9.94 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 6.11, proScore: 5.49, coverage: 0.9,
      price: 975.56, weeklyPrices: [1132.33, 1145.28, 1154.29, 1032.28, 975.56], weeklyChange: -13.84, dayChange: -5.49, sortRank: 0, periodReturns: { '1M': -8.3, 'YTD': 241.8, '6M': 209.3, '1Y': 697.7 },
      priceHistory: { '1D': [1032.28, 1040.13, 1057.56, 1035.56, 1013.82, 990.53, 988.41, 998.15, 1001.12, 986.6, 981.3, 971.63, 973.07, 970.17, 972.33, 956.7, 960.03, 961.75, 971.88, 977.3, 964.08, 957.34, 962.15, 975.56], '1W': [1132.33, 1145.28, 1154.29, 1032.28, 975.56], '1M': [1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1213.56, 975.56], '6M': [315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1213.56, 975.56], '1Y': [122.29, 124.53, 114.39, 111.26, 104.88, 118.89, 125.29, 115.79, 122, 131.37, 157.23, 162.73, 157.27, 187.83, 181.6, 202.38, 206.71, 224.01, 238.33, 236.95, 201.37, 236.48, 237.22, 241.14, 265.92, 294.37, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 418.69, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 928.41, 1079.57, 891.88, 1043.19, 1213.56, 975.56] },
      velocityScore: { '1D': -5.2, '1W': -1.1, '1M': -16.3, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 22, revenueGrowth: 346, eps: 44.28, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { AIS: 6.72, ARTY: 4.97, BAI: 6.22, IGPT: 7.92, IVES: 4.81, ALAI: 1.35, CHAT: 4, AIFD: 7.38, SPRX: false, AOTG: 11.58 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 9, avgWeight: 5.6, proScore: 5.04, coverage: 0.9,
      price: 517.82, weeklyPrices: [521.58, 539.49, 580.91, 540.88, 517.82], weeklyChange: -0.72, dayChange: -4.26, sortRank: 0, periodReturns: { '1M': -0.7, 'YTD': 141.8, '6M': 131.7, '1Y': 275.5 },
      priceHistory: { '1D': [540.88, 533.49, 544.83, 539.84, 524.78, 517.8, 518.21, 518.26, 521.58, 517.25, 519.22, 512.65, 513.35, 512.07, 512.77, 509.43, 510.22, 511.94, 514.1, 514.98, 509.58, 509.84, 511.7, 517.82], '1W': [521.58, 539.49, 580.91, 540.88, 517.82], '1M': [521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 542.52, 452.4, 512.48, 532.57, 517.82], '6M': [223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 542.52, 452.4, 512.48, 532.57, 517.82], '1Y': [137.91, 146.42, 156.99, 166.47, 171.7, 172.76, 180.95, 163.71, 168.58, 151.14, 158.57, 157.39, 159.46, 164.67, 214.9, 233.08, 234.99, 254.84, 237.7, 247.96, 206.02, 217.53, 217.97, 210.78, 213.43, 215.61, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 204.83, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 495.54, 542.52, 452.4, 512.48, 532.57, 517.82] },
      velocityScore: { '1D': -1.9, '1W': 1.6, '1M': -6.3, '6M': null }, isNew: false,
      marketCap: '$844B', pe: 174.4, revenueGrowth: 38, eps: 2.97, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.89, ARTY: 5.03, BAI: 4.96, IGPT: 8.46, IVES: 4.79, ALAI: 1.28, CHAT: 4.24, AIFD: false, SPRX: 0.55, AOTG: 16.2 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 8, avgWeight: 3.47, proScore: 2.77, coverage: 0.8,
      price: 360.45, weeklyPrices: [365.02, 372.45, 377.75, 369.34, 360.45], weeklyChange: -1.25, dayChange: -2.41, sortRank: 0, periodReturns: { '1M': -25.2, 'YTD': 4.1, '6M': 3.7, '1Y': 31 },
      priceHistory: { '1D': [369.34, 369.68, 373.28, 371.95, 368.94, 367, 365.3, 364.8, 364.72, 363.17, 362.2, 358.88, 359.64, 358.52, 359.11, 358.88, 358.95, 359.98, 359.59, 359.09, 357.97, 358.7, 359.45, 360.45], '1W': [365.02, 372.45, 377.75, 369.34, 360.45], '1M': [481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45], 'YTD': [346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 421.86, 479.23, 372.1, 392.9, 378.91, 360.45], '6M': [347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 342.58, 321.31, 318.29, 309.51, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 421.86, 479.23, 372.1, 392.9, 378.91, 360.45], '1Y': [275.18, 274.38, 283.34, 290.18, 288.64, 304.97, 311.23, 289.6, 308.65, 334.89, 359.87, 344.94, 334.53, 338.37, 324.63, 349.33, 344.29, 376.47, 355.59, 339.98, 346.82, 402.96, 390.24, 359.93, 340.36, 349.39, 343.42, 352.21, 332.6, 332.79, 320.33, 340.44, 333.51, 332.31, 317.53, 341.57, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 417.76, 421.86, 479.23, 372.1, 392.9, 378.91, 360.45] },
      velocityScore: { '1D': 0.4, '1W': -4.5, '1M': -15, '6M': null }, isNew: false,
      marketCap: '$1.7T', pe: 59.9, revenueGrowth: 48, eps: 6.02, grossMargin: 76, dividendYield: 0.7,
      etfPresence: { AIS: 0.63, ARTY: 4.29, BAI: 4, IGPT: false, IVES: 4.5, ALAI: 3.75, CHAT: 3.99, AIFD: 5.14, SPRX: false, AOTG: 1.43 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 7, avgWeight: 3.61, proScore: 2.53, coverage: 0.7,
      price: 245.29, weeklyPrices: [266.77, 277.75, 297.89, 272.05, 245.29], weeklyChange: -8.05, dayChange: -9.84, sortRank: 0, periodReturns: { '1M': -15.6, 'YTD': 188.6, '6M': 174.4, '1Y': 226.3 },
      priceHistory: { '1D': [272.05, 269.07, 271.17, 267.56, 259.5, 255.88, 252.61, 253.23, 253.17, 249.51, 248.3, 245.07, 244.98, 243.11, 242.79, 240.84, 239.42, 241.1, 242.18, 243.02, 240.43, 240.25, 240.5, 245.29], '1W': [266.77, 277.75, 297.89, 272.05, 245.29], '1M': [290.79, 301.65, 316.43, 263.47, 288.85, 266.88, 252.59, 280.71, 279.7, 308.88, 289.54, 310.58, 307.86, 279.04, 276.7, 281.26, 266.77, 277.75, 297.89, 272.05, 245.29], 'YTD': [84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 176.27, 198.7, 301.65, 252.59, 289.54, 281.26, 245.29], '6M': [89.39, 83.22, 80.46, 81.77, 78.66, 82.35, 79.01, 78.39, 77.51, 93.3, 90.79, 92.36, 99.05, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 176.27, 198.7, 301.65, 252.59, 289.54, 281.26, 245.29], '1Y': [75.18, 72.71, 74.65, 74.21, 74.45, 77.34, 79.04, 71.21, 77.23, 63.33, 67.35, 74.26, 83.17, 86.22, 85.61, 87.95, 82.77, 88.57, 93.33, 87.52, 76.68, 89.4, 98.91, 84.43, 84.09, 85.76, 90.23, 82.89, 79.8, 82.93, 75.54, 82.01, 79.09, 80.92, 78.09, 90.44, 90.79, 92.36, 99.05, 114.45, 134.6, 157.32, 156.57, 172.15, 177.95, 186.8, 198.7, 301.65, 252.59, 289.54, 281.26, 245.29] },
      velocityScore: { '1D': -1.6, '1W': -1.9, '1M': -0.8, '6M': null }, isNew: false,
      marketCap: '$215B', pe: 84.3, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: null,
      etfPresence: { AIS: 3.94, ARTY: 4.28, BAI: 1.93, IGPT: 3.48, IVES: false, ALAI: false, CHAT: 1.5, AIFD: 6, SPRX: 4.12, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 4.93, proScore: 2.96, coverage: 0.6,
      price: 359.91, weeklyPrices: [337.39, 353.65, 357.37, 361.21, 359.91], weeklyChange: 6.67, dayChange: -0.36, sortRank: 0, periodReturns: { '1M': -0.5, 'YTD': 15, '6M': 14.2, '1Y': 100.5 },
      priceHistory: { '1D': [361.21, 361.64, 362.04, 362.42, 363.37, 360.86, 358.7, 357.19, 355.77, 355.24, 355.97, 355.23, 353.87, 354.67, 355.05, 356.97, 357, 358.29, 358.35, 357.8, 358.97, 358.9, 359.34, 359.91], '1W': [337.39, 353.65, 357.37, 361.21, 359.91], '1M': [361.85, 358.99, 372.19, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68, 369.35, 363.79, 368.03, 349.68, 346.13, 345.29, 343.71, 337.39, 353.65, 357.37, 361.21, 359.91], 'YTD': [313, 325.44, 332.78, 327.93, 338, 322.86, 305.72, 311.49, 306.52, 306.36, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 388.43, 387.35, 387.66, 388.83, 358.99, 356.38, 363.79, 343.71, 359.91], '6M': [315.15, 328.57, 330, 333.26, 343.69, 324.32, 302.02, 310.9, 303.58, 307.04, 310.92, 290.44, 287.56, 305.46, 332.91, 332.29, 349.78, 388.43, 387.35, 387.66, 388.83, 358.99, 356.38, 363.79, 343.71, 359.91], '1Y': [179.53, 180.19, 185.06, 193.18, 189.13, 201.42, 202.94, 199.75, 211.64, 235, 240.8, 254.72, 246.54, 245.35, 236.57, 253.3, 253.08, 281.48, 284.75, 278.57, 289.45, 320.18, 321.27, 309.29, 307.16, 313.56, 316.54, 331.86, 322, 334.55, 339.71, 318.58, 303.33, 312.9, 303.13, 308.7, 310.92, 290.44, 287.56, 317.32, 337.12, 339.32, 349.94, 398.04, 402.62, 388.91, 388.83, 358.99, 356.38, 363.79, 343.71, 359.91] },
      velocityScore: { '1D': 3.5, '1W': 2.1, '1M': -15.9, '6M': null }, isNew: false,
      marketCap: '$4.4T', pe: 27.5, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.14, IGPT: 7.71, IVES: 4.7, ALAI: false, CHAT: 5.36, AIFD: 4.87, SPRX: false, AOTG: 3.8 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 6, avgWeight: 4.83, proScore: 2.9, coverage: 0.6,
      price: 434.16, weeklyPrices: [432.35, 455.10, 477.57, 444.23, 434.16], weeklyChange: 0.42, dayChange: -2.27, sortRank: 0, periodReturns: { '1M': -2.8, 'YTD': 42.9, '6M': 35.8, '1Y': 84.9 },
      priceHistory: { '1D': [444.23, 452.57, 460.55, 456.36, 449.18, 447.64, 444.11, 442.98, 443.51, 440.88, 440.08, 435.51, 434.95, 431.86, 431.77, 430.36, 431.86, 432.96, 434.18, 434.18, 431.87, 433.4, 434.5, 434.16], '1W': [432.35, 455.1, 477.57, 444.23, 434.16], '1M': [446.69, 436.69, 444.92, 415.17, 426.8, 427.92, 408.75, 421.07, 423.93, 441.4, 432.15, 462.12, 467.67, 436.39, 440.83, 434.99, 432.35, 455.1, 477.57, 444.23, 434.16], 'YTD': [303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 370.04, 369.11, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 392.61, 422.73, 436.69, 408.75, 432.15, 434.99, 434.16], '6M': [319.61, 323.63, 342.4, 332.71, 341.36, 355.41, 364.2, 385.75, 353.13, 347.09, 345.98, 343.25, 337.95, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 392.61, 422.73, 436.69, 408.75, 432.15, 434.99, 434.16], '1Y': [234.8, 230.4, 240.4, 245.6, 235.21, 241.83, 241, 227.33, 238.27, 243.41, 259.33, 264.87, 273.36, 292.19, 280.66, 295.08, 290.73, 303.22, 289.24, 282.2, 277.5, 291.51, 294.72, 292.04, 288.95, 300.92, 322.25, 331.77, 327.16, 338.34, 335.75, 361.91, 362.26, 387.73, 357.44, 354.56, 345.98, 343.25, 337.95, 365.9, 375.1, 387.44, 393.83, 419.5, 399.8, 401.62, 422.73, 436.69, 408.75, 432.15, 434.99, 434.16] },
      velocityScore: { '1D': 9.8, '1W': -1.4, '1M': -13.9, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 37.7, revenueGrowth: 35, eps: 11.51, grossMargin: 62, dividendYield: 0.86,
      etfPresence: { AIS: 3.26, ARTY: false, BAI: 4.43, IGPT: false, IVES: 4.92, ALAI: 5.64, CHAT: false, AIFD: 3.45, SPRX: false, AOTG: 7.3 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'ANET', name: 'Arista Networks Inc', easyScore: 6, avgWeight: 2.32, proScore: 1.39, coverage: 0.6,
      price: 159.99, weeklyPrices: [157.60, 164.10, 169.88, 166.62, 159.99], weeklyChange: 1.52, dayChange: -3.98, sortRank: 0, periodReturns: { '1M': -8.7, 'YTD': 22.1, '6M': 19.8, '1Y': 56.1 },
      priceHistory: { '1D': [166.62, 165.85, 166.99, 167.03, 164.27, 161.54, 161.12, 160.68, 160.86, 159.99, 160.21, 158.8, 158.77, 158.65, 158.7, 159.26, 159.15, 159.55, 158.99, 159.42, 157.67, 158.61, 159.51, 159.99], '1W': [157.6, 164.1, 169.88, 166.62, 159.99], '1M': [175.33, 174.37, 166.01, 154.27, 156.4, 152.16, 151.76, 156.4, 163.24, 169.09, 164.93, 169.67, 174.56, 162.2, 161.74, 165.45, 157.6, 164.1, 169.88, 166.62, 159.99], 'YTD': [131.03, 123.72, 130.59, 136.34, 141.74, 137.49, 141.59, 127.43, 129.3, 137.17, 135.35, 135.88, 116.13, 133.64, 154.37, 172.86, 165.29, 170.22, 142.54, 141.58, 154.31, 174.37, 151.76, 164.93, 165.45, 159.99], '6M': [133.6, 122.89, 129.83, 143.72, 138.37, 141.74, 142.58, 128.77, 124.6, 139.62, 133.07, 130.8, 122.78, 133.64, 154.37, 172.86, 165.29, 170.22, 142.54, 141.58, 154.31, 174.37, 151.76, 164.93, 165.45, 159.99], '1Y': [102.52, 108.57, 111.78, 114.28, 117.57, 139.18, 136.48, 132.03, 136.23, 142.85, 139.39, 149.61, 142.5, 145.5, 154.1, 143.1, 152.76, 158.44, 134.02, 130.3, 119.59, 130.68, 128.59, 124.76, 131.12, 134.15, 137.19, 123.42, 127.52, 146.69, 139.39, 143.45, 139.54, 132.89, 134.83, 138.23, 133.07, 130.8, 122.78, 145.07, 154.33, 177.73, 168.68, 147.06, 140.69, 140.49, 154.31, 174.37, 151.76, 164.93, 165.45, 159.99] },
      velocityScore: { '1D': 1.5, '1W': -6.1, '1M': -24, '6M': null }, isNew: false,
      marketCap: '$201B', pe: 54.8, revenueGrowth: 35, eps: 2.92, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: 1.44, ARTY: 2.46, BAI: 1.33, IGPT: false, IVES: false, ALAI: false, CHAT: 2.24, AIFD: 4.89, SPRX: 1.58, AOTG: false },
      tonyNote: 'Arista Networks Inc appears in 6 of 10 AI & ML ETFs (60% coverage) with average weight 2.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 5, avgWeight: 4.15, proScore: 2.07, coverage: 0.5,
      price: 582.9, weeklyPrices: [550.25, 562.60, 563.29, 612.91, 582.90], weeklyChange: 5.93, dayChange: -4.9, sortRank: 0, periodReturns: { '1M': -2.5, 'YTD': -11.7, '6M': -10.4, '1Y': -18.9 },
      priceHistory: { '1D': [612.91, 595.5, 591.91, 590.79, 591.37, 590.62, 588.67, 587.86, 587.76, 587.2, 586.36, 586.59, 585.86, 585.61, 584.99, 584.59, 584.28, 585.66, 586.35, 583.99, 586.46, 586.26, 582.84, 582.9], '1W': [550.25, 562.6, 563.29, 612.91, 582.9], '1M': [597.63, 622.98, 627.57, 593, 585.39, 584.59, 570.98, 568.43, 566.98, 593.48, 567.58, 577.22, 563.85, 562.2, 557.67, 542.87, 550.25, 562.6, 563.29, 612.91, 582.9], 'YTD': [660.09, 646.06, 620.8, 658.76, 716.5, 661.46, 639.77, 637.25, 653.56, 647.39, 627.45, 604.06, 536.38, 575.05, 662.49, 668.84, 671.34, 604.96, 603, 602.61, 635.26, 622.98, 570.98, 567.58, 542.87, 582.9], '6M': [650.41, 653.06, 620.25, 672.36, 706.41, 677.22, 639.29, 639.3, 655.08, 654.07, 622.66, 592.92, 572.13, 575.05, 662.49, 668.84, 671.34, 604.96, 603, 602.61, 635.26, 622.98, 570.98, 567.58, 542.87, 582.9], '1Y': [719.01, 717.51, 704.28, 712.68, 750.01, 769.3, 782.13, 739.1, 751.11, 752.45, 755.59, 778.38, 743.75, 710.56, 705.3, 716.92, 734, 666.47, 618.94, 609.89, 589.15, 647.95, 673.42, 644.23, 658.77, 658.69, 658.79, 641.97, 604.12, 672.97, 691.7, 670.72, 643.22, 653.69, 667.73, 654.86, 622.66, 592.92, 572.13, 612.42, 671.58, 674.72, 669.12, 612.88, 616.63, 605.06, 635.26, 622.98, 570.98, 567.58, 542.87, 582.9] },
      velocityScore: { '1D': 10.7, '1W': 7.3, '1M': 1.5, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 21.2, revenueGrowth: 33, eps: 27.52, grossMargin: 82, dividendYield: 0.34,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: 8.24, IVES: 4.96, ALAI: 4.2, CHAT: 2.26, AIFD: false, SPRX: false, AOTG: 1.08 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 5, avgWeight: 3.92, proScore: 1.96, coverage: 0.5,
      price: 242.67, weeklyPrices: [232.69, 240.14, 238.34, 241.70, 242.67], weeklyChange: 4.29, dayChange: 0.4, sortRank: 0, periodReturns: { '1M': -5.4, 'YTD': 5.1, '6M': 7.1, '1Y': 8.6 },
      priceHistory: { '1D': [241.7, 242.2, 242.93, 244.3, 244.98, 244.46, 245.18, 244.76, 245.41, 245.63, 246.23, 245.6, 245.35, 244.63, 244.88, 244.01, 243.93, 244.35, 243.97, 243.51, 243.61, 243.98, 243.23, 242.67], '1W': [232.69, 240.14, 238.34, 241.7, 242.67], '1M': [256.52, 250.02, 253.79, 246.03, 245.22, 244.19, 238, 241.51, 238.55, 246.02, 237.5, 244.39, 232.79, 234.11, 234.27, 227.01, 232.69, 240.14, 238.34, 241.7, 242.67], 'YTD': [230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 198.79, 205.27, 208.39, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 259.34, 271.85, 250.02, 238, 237.5, 227.01, 242.67], '6M': [226.5, 247.38, 239.12, 238.42, 242.96, 208.72, 201.15, 208.56, 208.73, 214.33, 215.2, 207.24, 208.27, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 259.34, 271.85, 250.02, 238, 237.5, 227.01, 242.67], '1Y': [223.41, 225.02, 226.13, 231.44, 214.75, 222.69, 230.98, 221.95, 231.6, 232.33, 228.15, 231.48, 219.78, 219.51, 216.37, 213.04, 221.09, 222.86, 243.04, 237.58, 217.14, 233.22, 229.53, 226.19, 227.35, 232.07, 233.06, 246.47, 231, 244.68, 238.62, 206.96, 204.79, 210.64, 216.82, 212.65, 215.2, 207.24, 208.27, 221.25, 248.5, 255.36, 263.04, 274.99, 270.13, 265.01, 271.85, 250.02, 238, 237.5, 227.01, 242.67] },
      velocityScore: { '1D': 2.1, '1W': -1, '1M': -23.7, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 31.8, revenueGrowth: 17, eps: 7.64, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 4.77, ALAI: 5.08, CHAT: 2.42, AIFD: 3.39, SPRX: false, AOTG: 3.94 },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 5, avgWeight: 3.73, proScore: 1.86, coverage: 0.5,
      price: 406.42, weeklyPrices: [391.74, 455.96, 483.02, 430.86, 406.42], weeklyChange: 3.75, dayChange: -5.67, sortRank: 0, periodReturns: { '1M': 14.2, 'YTD': 144.3, '6M': 126.3, '1Y': 347.6 },
      priceHistory: { '1D': [430.86, 431.7, 463.4, 447.71, 426.38, 419.5, 413.27, 409.14, 408.52, 409.91, 408.09, 401.58, 403.98, 405.09, 405.2, 400.98, 400.65, 400.48, 399.89, 402.12, 396.21, 397.11, 396.98, 406.42], '1W': [391.74, 455.96, 483.02, 430.86, 406.42], '1M': [355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86, 406.42], 'YTD': [166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 325.33, 363.54, 330.86, 374.68, 398, 406.42], '6M': [179.56, 162.61, 182, 163.25, 152.44, 187.67, 123.69, 128.4, 109.8, 116.48, 127.57, 121.76, 109.6, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 325.33, 363.54, 330.86, 374.68, 398, 406.42], '1Y': [90.8, 95.9, 102.13, 122.23, 131.1, 179.28, 190.69, 177.53, 189.15, 191.2, 229.5, 245.2, 197.78, 200.74, 206.21, 159.8, 163.64, 169.55, 162.83, 144.47, 139.29, 157.57, 161.23, 148.85, 164.4, 170.1, 167.11, 172.57, 183.75, 170.93, 158.52, 182.86, 129.58, 128.15, 113.77, 124.71, 127.57, 121.76, 109.6, 125.46, 172.09, 194.06, 196.85, 213.91, 224.09, 287.48, 325.33, 363.54, 330.86, 374.68, 398, 406.42] },
      velocityScore: { '1D': 1.6, '1W': 7.5, '1M': -12.7, '6M': null }, isNew: false,
      marketCap: '$70B', pe: 278.4, revenueGrowth: 93, eps: 1.46, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 2.21, ARTY: 1.46, BAI: false, IGPT: false, IVES: false, ALAI: 1.02, CHAT: 3.08, AIFD: false, SPRX: 10.86, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.57, proScore: 1.78, coverage: 0.5,
      price: 390.49, weeklyPrices: [372.97, 368.57, 373.02, 384.28, 390.49], weeklyChange: 4.7, dayChange: 1.62, sortRank: 0, periodReturns: { '1M': -11.5, 'YTD': -19.3, '6M': -17.4, '1Y': -21.7 },
      priceHistory: { '1D': [384.28, 385.92, 386.73, 389.02, 389.44, 389.43, 389.16, 387.76, 388.35, 389.63, 390.17, 390.18, 390.01, 390.82, 391.74, 390.45, 391.01, 390.55, 391.46, 390.92, 391.2, 391.2, 390.27, 390.49], '1W': [372.97, 368.57, 373.02, 384.28, 390.49], '1M': [441.31, 427.34, 428.05, 416.67, 411.74, 403.41, 397.36, 390.34, 390.74, 399.76, 378.91, 379.4, 367.34, 373.94, 365.46, 352.83, 372.97, 368.57, 373.02, 384.28, 390.49], 'YTD': [483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 384.47, 398.55, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 417.42, 412.67, 427.34, 397.36, 378.91, 352.83, 390.49], '6M': [472.94, 479.28, 459.86, 470.28, 423.37, 413.6, 396.86, 389, 403.93, 405.76, 399.41, 372.74, 370.17, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 417.42, 412.67, 427.34, 397.36, 378.91, 352.83, 390.49], '1Y': [498.84, 503.32, 510.05, 513.71, 524.11, 522.04, 522.48, 504.24, 509.64, 495, 509.9, 517.93, 511.46, 517.35, 510.96, 513.58, 520.56, 525.76, 497.1, 503.29, 478.43, 492.01, 483.16, 478.53, 485.92, 487.1, 472.85, 477.18, 454.52, 480.58, 411.21, 413.27, 399.6, 400.6, 405.2, 404.88, 399.41, 372.74, 370.17, 374.33, 411.22, 432.92, 424.46, 413.96, 405.21, 421.06, 412.67, 427.34, 397.36, 378.91, 352.83, 390.49] },
      velocityScore: { '1D': 3.5, '1W': 3.5, '1M': -29.1, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 23.3, revenueGrowth: 18, eps: 16.79, grossMargin: 68, dividendYield: null,
      etfPresence: { AIS: false, ARTY: 2.53, BAI: false, IGPT: false, IVES: 4.67, ALAI: 5, CHAT: 2.19, AIFD: false, SPRX: false, AOTG: 3.44 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 5, avgWeight: 2.54, proScore: 1.27, coverage: 0.5,
      price: 728.32, weeklyPrices: [816.98, 851.40, 858.06, 801.16, 728.32], weeklyChange: -10.85, dayChange: -9.09, sortRank: 0, periodReturns: { '1M': -29.2, 'YTD': 97.6, '6M': 88.6, '1Y': 685.3 },
      priceHistory: { '1D': [801.16, 785.28, 794.48, 781.19, 771.01, 755.79, 750.76, 745.54, 744.42, 736.42, 732.2, 725.32, 728.4, 724.26, 720.22, 714.6, 714.3, 713.49, 718.03, 722.11, 715.44, 721.68, 722.41, 728.32], '1W': [816.98, 851.4, 858.06, 801.16, 728.32], '1M': [1029.15, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 869.98, 850, 893.93, 827.92, 842.53, 861.97, 816.98, 851.4, 858.06, 801.16, 728.32], 'YTD': [368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 890.09, 902.31, 938, 853.26, 869.98, 861.97, 728.32], '6M': [386.11, 351.42, 324.25, 332.45, 423.42, 577.15, 600.42, 688.27, 694.43, 672, 649.56, 801.99, 702.76, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 890.09, 902.31, 938, 853.26, 869.98, 861.97, 728.32], '1Y': [92.75, 92.99, 102.22, 104.52, 106.68, 116.27, 114.62, 117.43, 135.55, 149.46, 163.02, 168.73, 160.75, 163.81, 149.61, 164.77, 168.5, 200.13, 239.68, 226.86, 233.24, 325.16, 331.41, 324.35, 371.43, 372.61, 357.05, 339.87, 356.83, 370.66, 435.1, 561.13, 594.26, 723.39, 680.8, 672, 649.56, 801.99, 702.76, 896.02, 824.01, 873.6, 858.32, 944.28, 1030.37, 868.07, 902.31, 938, 853.26, 869.98, 861.97, 728.32] },
      velocityScore: { '1D': -7.3, '1W': -6.6, '1M': -35.2, '6M': null }, isNew: false,
      marketCap: '$57B', pe: 128, revenueGrowth: 90, eps: 5.69, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.45, IGPT: false, IVES: false, ALAI: 0.83, CHAT: 1.34, AIFD: 4.73, SPRX: 3.35, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 5 of 10 AI & ML ETFs (50% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 5, avgWeight: 2.48, proScore: 1.24, coverage: 0.5,
      price: 1745, weeklyPrices: [2090.71, 2050.39, 2273.73, 2032.22, 1745.00], weeklyChange: -16.54, dayChange: -14.13, sortRank: 0, periodReturns: { '1M': 1.7, 'YTD': 635.1, '6M': 534, '1Y': 3660 },
      priceHistory: { '1D': [2032.22, 1980, 2008.37, 1940.23, 1885.15, 1833, 1796.4, 1807.78, 1825.02, 1804.86, 1801.49, 1763.98, 1762, 1765.28, 1757.56, 1721.18, 1715.34, 1723.69, 1733.05, 1746.59, 1723.48, 1723.39, 1721.69, 1745], '1W': [2090.71, 2050.39, 2273.73, 2032.22, 1745], '1M': [1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 1745], 'YTD': [237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.94, 1831.5, 1643.23, 1958.8, 2335, 1745], '6M': [275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 565.41, 618.89, 720.17, 702.48, 635.34, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.94, 1831.5, 1643.23, 1958.8, 2335, 1745], '1Y': [46.41, 46.09, 42.19, 42.48, 41.33, 44.34, 46.68, 45.5, 50.87, 68.55, 86.13, 102.21, 97.12, 128.41, 116.91, 140.16, 167.05, 195.82, 207.69, 243.57, 195.96, 223.28, 228.47, 206.18, 237.61, 244.25, 274.08, 389.27, 453.12, 481.43, 695.51, 541.64, 600.4, 632.38, 599.06, 655.43, 720.17, 702.48, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1447.23, 1392.56, 1589.94, 1831.5, 1643.23, 1958.8, 2335, 1745] },
      velocityScore: { '1D': -5.3, '1W': 5.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$258B', pe: 59.6, revenueGrowth: 251, eps: 29.26, grossMargin: 56, dividendYield: null,
      etfPresence: { AIS: 2.28, ARTY: false, BAI: 3.15, IGPT: 4.4, IVES: false, ALAI: 0.57, CHAT: false, AIFD: false, SPRX: false, AOTG: 1.98 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 5, avgWeight: 2.43, proScore: 1.22, coverage: 0.5,
      price: 539, weeklyPrices: [586.45, 651.88, 638.72, 598.37, 539.00], weeklyChange: -8.09, dayChange: -9.92, sortRank: 0, periodReturns: { '1M': -4.3, 'YTD': 212.9, '6M': 187.2, '1Y': 715.7 },
      priceHistory: { '1D': [598.37, 595.47, 599.97, 586.33, 573.06, 560.79, 555.76, 556.66, 559.92, 553.15, 547.08, 540.95, 540.72, 536.66, 533.32, 528.01, 529, 529.64, 535.01, 538.8, 536.91, 536.33, 537.54, 539], '1W': [586.45, 651.88, 638.72, 598.37, 539], '1M': [563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539], 'YTD': [172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 530.6, 594.11, 490.09, 712.13, 675.39, 539], '6M': [187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 266.22, 313.81, 301.05, 270.49, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 530.6, 594.11, 490.09, 712.13, 675.39, 539], '1Y': [66.08, 66.14, 68, 68.82, 76.55, 74.97, 76.24, 74.66, 82.04, 92.04, 97.66, 106.63, 106.88, 131.31, 115.42, 126.2, 125.72, 138.13, 163.6, 157.16, 140.23, 163.33, 168.89, 176.34, 181.08, 179.68, 187.88, 212.14, 222.97, 252.66, 290.24, 262.56, 296.56, 290.95, 261.3, 268.81, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 459.62, 530.6, 594.11, 490.09, 712.13, 675.39, 539] },
      velocityScore: { '1D': -22.8, '1W': -6.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$186B', pe: 32.3, revenueGrowth: 46, eps: 16.69, grossMargin: 45, dividendYield: 0.1,
      etfPresence: { AIS: 1.34, ARTY: 2.83, BAI: 3.15, IGPT: false, IVES: false, ALAI: 4.13, CHAT: false, AIFD: false, SPRX: false, AOTG: 0.71 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'CRDO', name: 'Credo Technology Group Holding Ltd', easyScore: 5, avgWeight: 1.92, proScore: 0.96, coverage: 0.5,
      price: 241.91, weeklyPrices: [238.00, 245.68, 271.95, 259.09, 241.91], weeklyChange: 1.64, dayChange: -6.63, sortRank: 0, periodReturns: { '1M': 5.6, 'YTD': 68.1, '6M': 68.9, '1Y': 158.4 },
      priceHistory: { '1D': [259.09, 254.56, 275.89, 265.2, 252.56, 250.24, 245.27, 245.45, 245, 243.74, 241.45, 238.43, 240.31, 239.67, 238.35, 236.53, 237.66, 237.48, 238.44, 239.84, 236.96, 237.39, 236.48, 241.91], '1W': [238, 245.68, 271.95, 259.09, 241.91], '1M': [229, 214.6, 217.5, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81, 259.41, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.09, 241.91], 'YTD': [143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.05, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.23, 214.6, 237.68, 249.33, 268.03, 241.91], '6M': [143.22, 150.42, 150.97, 128.02, 119.96, 123.41, 124.8, 120.83, 97.3, 112.33, 104.06, 100.3, 93.87, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.23, 214.6, 237.68, 249.33, 268.03, 241.91], '1Y': [93.61, 98.52, 93.47, 101.22, 107.56, 120.41, 117.33, 110.86, 131.82, 140.82, 161.99, 169.56, 142.93, 143.87, 138.83, 143.61, 150.97, 166.62, 162.74, 142.95, 134.73, 177.6, 176.04, 143.91, 150.13, 144.7, 140.24, 156.07, 153.22, 129.57, 111.31, 134.72, 127.91, 123.46, 102.54, 115.91, 104.06, 100.3, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 189.36, 182.98, 221.23, 214.6, 237.68, 249.33, 268.03, 241.91] },
      velocityScore: { '1D': -1, '1W': -6.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$45B', pe: 96.4, revenueGrowth: 157, eps: 2.51, grossMargin: 68, dividendYield: null,
      etfPresence: { AIS: 1.08, ARTY: 1.27, BAI: 2.12, IGPT: false, IVES: false, ALAI: false, CHAT: 2.28, AIFD: false, SPRX: 2.87, AOTG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 4, avgWeight: 3.14, proScore: 1.25, coverage: 0.4,
      price: 120.35, weeklyPrices: [128.32, 131.72, 139.63, 127.02, 120.35], weeklyChange: -6.21, dayChange: -5.25, sortRank: 0, periodReturns: { '1M': 11.5, 'YTD': 226.2, '6M': 205.6, '1Y': 435.1 },
      priceHistory: { '1D': [127.02, 126.73, 129.64, 128.44, 124.81, 123.5, 123.28, 122.82, 123.96, 122.74, 120.97, 120.21, 120.19, 120.06, 119.83, 118.82, 119.5, 119.6, 120.05, 120.24, 118.54, 118.71, 119.1, 120.35], '1W': [128.32, 131.72, 139.63, 127.02, 120.35], '1M': [107.93, 112.71, 111.78, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 127.02, 120.35], 'YTD': [36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 43.63, 45.5, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 110.8, 121.77, 112.71, 107.04, 121.1, 132.87, 120.35], '6M': [39.38, 45.55, 46.96, 42.49, 48.81, 50.24, 46.18, 46.12, 43.1, 46.78, 44.06, 44.06, 44.13, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 110.8, 121.77, 112.71, 107.04, 121.1, 132.87, 120.35], '1Y': [22.49, 23.43, 23.1, 20.7, 19.31, 19.95, 23.86, 23.5, 24.93, 24.49, 24.08, 29.58, 35.5, 36.83, 36.37, 37.01, 38.16, 40.16, 37.24, 35.91, 33.62, 40.56, 41.41, 37.81, 36.82, 36.68, 39.37, 44.06, 48.56, 43.93, 49.25, 47.13, 45.46, 46.88, 45.58, 47.98, 44.06, 44.06, 44.13, 58.95, 64.94, 65.27, 94.75, 113.01, 120.29, 118.96, 121.77, 112.71, 107.04, 121.1, 132.87, 120.35] },
      velocityScore: { '1D': -5.3, '1W': -3.8, '1M': -39.6, '6M': null }, isNew: false,
      marketCap: '$605B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.44, ARTY: false, BAI: 3.13, IGPT: 4.67, IVES: false, ALAI: false, CHAT: 1.3, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'ARM', name: 'ARM Holdings PLC', easyScore: 4, avgWeight: 2.98, proScore: 1.19, coverage: 0.4,
      price: 315.28, weeklyPrices: [334.27, 343.58, 354.57, 337.47, 315.28], weeklyChange: -5.68, dayChange: -6.58, sortRank: 0, periodReturns: { '1M': -21.7, 'YTD': 188.4, '6M': 174.8, '1Y': 103.3 },
      priceHistory: { '1D': [337.47, 342, 352.44, 346.05, 336.74, 327.24, 325.24, 325.43, 325.08, 320, 318.09, 315.28, 316.4, 314.15, 313.35, 310.88, 311.52, 312.5, 313.16, 313.32, 311.82, 313.48, 313.5, 315.28], '1W': [334.27, 343.58, 354.57, 337.47, 315.28], '1M': [402.71, 411.83, 393.44, 342.93, 346.39, 324.86, 307.43, 342.23, 380.81, 412.55, 418.88, 439.46, 407.72, 366.39, 359.08, 347.71, 334.27, 343.58, 354.57, 337.47, 315.28], 'YTD': [109.31, 113.08, 105.11, 116.07, 105.36, 123.7, 125.28, 123.78, 124.37, 117.63, 121.7, 136.89, 136.96, 143.86, 161.22, 175.49, 198.65, 208.84, 207.92, 223.15, 302.71, 411.83, 307.43, 418.88, 347.71, 315.28], '6M': [114.73, 111.79, 105.78, 114.73, 106.93, 124.61, 126.89, 128.14, 121.72, 120.55, 127.31, 134.96, 151.28, 143.86, 161.22, 175.49, 198.65, 208.84, 207.92, 223.15, 302.71, 411.83, 307.43, 418.88, 347.71, 315.28], '1Y': [155.09, 145.94, 156.74, 163.17, 137.58, 138.5, 140.55, 133.28, 142.55, 138.17, 150.64, 142.91, 139.62, 152.64, 154.81, 165.61, 166.6, 165.45, 158.25, 140.31, 132.53, 135.56, 141.31, 130.89, 114.03, 110.51, 116.11, 111.14, 107.17, 114.88, 104.55, 125.95, 127.24, 131.74, 124.11, 120.1, 127.31, 134.96, 151.28, 148.91, 159.34, 196.57, 201.69, 237.3, 221.21, 256.73, 302.71, 411.83, 307.43, 418.88, 347.71, 315.28] },
      velocityScore: { '1D': -1.7, '1W': -8.5, '1M': -46.9, '6M': null }, isNew: false,
      marketCap: '$337B', pe: 375.3, revenueGrowth: 20, eps: 0.84, grossMargin: 98, dividendYield: null,
      etfPresence: { AIS: 1.85, ARTY: false, BAI: false, IGPT: false, IVES: false, ALAI: 0.17, CHAT: 2.58, AIFD: false, SPRX: 7.31, AOTG: false },
      tonyNote: 'Arm Holdings is held across Broad Tech and AI ETFs as the CPU architecture licensor embedded in every mobile device and increasingly in AI inference chips and data center CPUs. Revenue grew and the royalty model is high-margin; the weight score reflects consistent institutional positioning as the AI chip design ecosystem expands on Arm cores.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 4, avgWeight: 2.88, proScore: 1.15, coverage: 0.4,
      price: 300.53, weeklyPrices: [303.95, 306.97, 334.82, 311.42, 300.53], weeklyChange: -1.13, dayChange: -3.5, sortRank: 0, periodReturns: { '1M': -10.2, 'YTD': 85.5, '6M': 71.1, '1Y': 135.1 },
      priceHistory: { '1D': [311.42, 308.93, 311.83, 312.96, 306.73, 303.78, 303.84, 303.13, 303.4, 300.32, 300.7, 299.01, 300.75, 299.39, 298.93, 297.07, 299.58, 300.48, 301.99, 303.67, 301.08, 299.93, 301.25, 300.53], '1W': [303.95, 306.97, 334.82, 311.42, 300.53], '1M': [334.49, 331.44, 323.92, 300.51, 300.57, 289.52, 280.98, 297.88, 302.87, 311.93, 317.58, 333.05, 357.96, 318.32, 316.43, 325.57, 303.95, 306.97, 334.82, 311.42, 300.53], 'YTD': [162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 234.53, 245.42, 257.75, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.13, 322.63, 319.78, 331.44, 280.98, 317.58, 325.57, 300.53], '6M': [175.61, 163.58, 176.93, 181.23, 190.01, 202, 243.53, 253.15, 244.44, 270.06, 268.41, 270.89, 250.58, 262.3, 310.51, 312.44, 305.03, 341.02, 367.13, 322.63, 319.78, 331.44, 280.98, 317.58, 325.57, 300.53], '1Y': [127.84, 123.3, 129.06, 137.47, 141.59, 139.93, 132.52, 126.58, 134.23, 124, 134.84, 143.6, 138.62, 160.2, 169.01, 174, 183.2, 193.76, 183.02, 163.64, 159.61, 179.73, 189.02, 161.27, 159.82, 165.62, 173.95, 170.03, 175.18, 189.21, 190.15, 199.62, 243.21, 262.19, 251.28, 268.26, 268.41, 270.89, 250.58, 281.03, 301.16, 305.14, 306.18, 358.92, 369.99, 315.67, 319.78, 331.44, 280.98, 317.58, 325.57, 300.53] },
      velocityScore: { '1D': -1.7, '1W': -8.7, '1M': -42.8, '6M': null }, isNew: false,
      marketCap: '$115B', pe: 75.3, revenueGrowth: 30, eps: 3.99, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.53, ARTY: false, BAI: 1.83, IGPT: false, IVES: false, ALAI: false, CHAT: 2.22, AIFD: 3.95, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'NBIS', name: 'NEBIUS GROUP NV', easyScore: 4, avgWeight: 2.71, proScore: 1.08, coverage: 0.4,
      price: 215.62, weeklyPrices: [240.30, 261.15, 276.17, 229.18, 215.62], weeklyChange: -10.27, dayChange: -5.92, sortRank: 0, periodReturns: { '1M': -17.3, 'YTD': 157.6, '6M': 139.7, '1Y': 329.1 },
      priceHistory: { '1D': [229.18, 229.81, 236.6, 229.3, 219.69, 214.54, 211.2, 213, 213.97, 211.04, 210.3, 208.59, 209, 210.15, 208.46, 207.97, 209.56, 211.21, 211.95, 213.79, 212.47, 211.03, 213.53, 215.62], '1W': [240.3, 261.15, 276.17, 229.18, 215.62], '1M': [260.58, 251.68, 259.67, 227.81, 218, 220.12, 211.69, 222.24, 232.36, 260.07, 280.91, 286.69, 283.61, 275.25, 259.66, 256.63, 240.3, 261.15, 276.17, 229.18, 215.62], 'YTD': [83.71, 97.3, 103.89, 94.5, 85.19, 86.1, 98.01, 100.61, 91.01, 94.94, 129.85, 114.15, 92.26, 117.4, 161.94, 156.55, 135.51, 175.92, 179.11, 197.73, 208.37, 251.68, 211.69, 280.91, 256.63, 215.62], '6M': [89.95, 97.93, 108.73, 91.46, 88.16, 92.88, 97.52, 102.58, 86.8, 96.43, 116.33, 114.91, 103.76, 117.4, 161.94, 156.55, 135.51, 175.92, 179.11, 197.73, 208.37, 251.68, 211.69, 280.91, 256.63, 215.62], '1Y': [50.25, 44.3, 52.79, 51.37, 52, 68.78, 68.46, 66.18, 72.04, 65.47, 90.41, 99.31, 107.7, 127.98, 129.58, 113.44, 106.16, 124.18, 109.44, 88.63, 84.64, 94.87, 98.04, 87.69, 89.46, 86.04, 92.83, 107.33, 99.29, 97.87, 89.95, 91.79, 101.8, 106.12, 97.78, 112, 116.33, 114.91, 103.76, 125, 166.77, 156.14, 141.19, 195.09, 207.27, 191.82, 208.37, 251.68, 211.69, 280.91, 256.63, 215.62] },
      velocityScore: { '1D': -12.9, '1W': -14.3, '1M': -43.2, '6M': null }, isNew: false,
      marketCap: '$55B', pe: 83.3, revenueGrowth: 684, eps: 2.59, grossMargin: 72, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 2.31, ALAI: 3.34, CHAT: 3.3, AIFD: 1.89, SPRX: false, AOTG: false },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 4.56, proScore: 4.56, coverage: 1,
      price: 975.56, weeklyPrices: [1132.33, 1145.28, 1154.29, 1032.28, 975.56], weeklyChange: -13.84, dayChange: -5.49, sortRank: 0, periodReturns: { '1M': -8.3, 'YTD': 241.8, '6M': 209.3, '1Y': 697.7 },
      priceHistory: { '1D': [1032.28, 1040.13, 1057.56, 1035.56, 1013.82, 990.53, 988.41, 998.15, 1001.12, 986.6, 981.3, 971.63, 973.07, 970.17, 972.33, 956.7, 960.03, 961.75, 971.88, 977.3, 964.08, 957.34, 962.15, 975.56], '1W': [1132.33, 1145.28, 1154.29, 1032.28, 975.56], '1M': [1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1213.56, 975.56], '6M': [315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1213.56, 975.56], '1Y': [122.29, 124.53, 114.39, 111.26, 104.88, 118.89, 125.29, 115.79, 122, 131.37, 157.23, 162.73, 157.27, 187.83, 181.6, 202.38, 206.71, 224.01, 238.33, 236.95, 201.37, 236.48, 237.22, 241.14, 265.92, 294.37, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 418.69, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 928.41, 1079.57, 891.88, 1043.19, 1213.56, 975.56] },
      velocityScore: { '1D': -3.2, '1W': 6, '1M': -36.8, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 22, revenueGrowth: 346, eps: 44.28, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { SOXX: 8.17, PSI: 5.37, XSD: 2.56, DRAM: 2.14 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 5.23, proScore: 3.92, coverage: 0.75,
      price: 517.82, weeklyPrices: [521.58, 539.49, 580.91, 540.88, 517.82], weeklyChange: -0.72, dayChange: -4.26, sortRank: 0, periodReturns: { '1M': -0.7, 'YTD': 141.8, '6M': 131.7, '1Y': 275.5 },
      priceHistory: { '1D': [540.88, 533.49, 544.83, 539.84, 524.78, 517.8, 518.21, 518.26, 521.58, 517.25, 519.22, 512.65, 513.35, 512.07, 512.77, 509.43, 510.22, 511.94, 514.1, 514.98, 509.58, 509.84, 511.7, 517.82], '1W': [521.58, 539.49, 580.91, 540.88, 517.82], '1M': [521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 542.52, 452.4, 512.48, 532.57, 517.82], '6M': [223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 542.52, 452.4, 512.48, 532.57, 517.82], '1Y': [137.91, 146.42, 156.99, 166.47, 171.7, 172.76, 180.95, 163.71, 168.58, 151.14, 158.57, 157.39, 159.46, 164.67, 214.9, 233.08, 234.99, 254.84, 237.7, 247.96, 206.02, 217.53, 217.97, 210.78, 213.43, 215.61, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 204.83, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 495.54, 542.52, 452.4, 512.48, 532.57, 517.82] },
      velocityScore: { '1D': -0.5, '1W': 3.2, '1M': -35.1, '6M': null }, isNew: false,
      marketCap: '$844B', pe: 174.4, revenueGrowth: 38, eps: 2.97, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 8.06, PSI: 5, XSD: 2.64, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 4.55, proScore: 3.41, coverage: 0.75,
      price: 194.83, weeklyPrices: [192.53, 194.97, 200.09, 197.58, 194.83], weeklyChange: 1.19, dayChange: -1.39, sortRank: 0, periodReturns: { '1M': -12.6, 'YTD': 4.5, '6M': 3.2, '1Y': 22.3 },
      priceHistory: { '1D': [197.58, 198.1, 199.54, 199.21, 197.1, 195.5, 195.26, 194.78, 195.07, 194.36, 194.07, 193.43, 193.87, 193.07, 193.05, 192.84, 192.85, 192.93, 193.46, 193.46, 192.88, 193.1, 193.63, 194.83], '1W': [192.53, 194.97, 200.09, 197.58, 194.83], '1M': [222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83], 'YTD': [186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 212.6, 214.75, 200.42, 204.65, 195.74, 194.83], '6M': [188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 184.77, 181.93, 175.2, 174.4, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 212.6, 214.75, 200.42, 204.65, 195.74, 194.83], '1Y': [159.34, 164.92, 172.41, 173.5, 173.72, 182.7, 182.02, 174.98, 180.17, 167.02, 177.82, 176.67, 178.19, 187.62, 183.16, 183.22, 182.16, 202.89, 188.08, 186.86, 180.64, 177, 182.41, 175.02, 180.99, 188.22, 188.12, 184.94, 178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 186.03, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 223.47, 212.6, 214.75, 200.42, 204.65, 195.74, 194.83] },
      velocityScore: { '1D': 5.6, '1W': -1.7, '1M': -0.6, '6M': null }, isNew: false,
      marketCap: '$4.7T', pe: 29.9, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.51,
      etfPresence: { SOXX: 7.19, PSI: 4.28, XSD: 2.17, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.52, proScore: 3.39, coverage: 0.75,
      price: 120.35, weeklyPrices: [128.32, 131.72, 139.63, 127.02, 120.35], weeklyChange: -6.21, dayChange: -5.25, sortRank: 0, periodReturns: { '1M': 11.5, 'YTD': 226.2, '6M': 205.6, '1Y': 435.1 },
      priceHistory: { '1D': [127.02, 126.73, 129.64, 128.44, 124.81, 123.5, 123.28, 122.82, 123.96, 122.74, 120.97, 120.21, 120.19, 120.06, 119.83, 118.82, 119.5, 119.6, 120.05, 120.24, 118.54, 118.71, 119.1, 120.35], '1W': [128.32, 131.72, 139.63, 127.02, 120.35], '1M': [107.93, 112.71, 111.78, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 127.02, 120.35], 'YTD': [36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 43.63, 45.5, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 110.8, 121.77, 112.71, 107.04, 121.1, 132.87, 120.35], '6M': [39.38, 45.55, 46.96, 42.49, 48.81, 50.24, 46.18, 46.12, 43.1, 46.78, 44.06, 44.06, 44.13, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 110.8, 121.77, 112.71, 107.04, 121.1, 132.87, 120.35], '1Y': [22.49, 23.43, 23.1, 20.7, 19.31, 19.95, 23.86, 23.5, 24.93, 24.49, 24.08, 29.58, 35.5, 36.83, 36.37, 37.01, 38.16, 40.16, 37.24, 35.91, 33.62, 40.56, 41.41, 37.81, 36.82, 36.68, 39.37, 44.06, 48.56, 43.93, 49.25, 47.13, 45.46, 46.88, 45.58, 47.98, 44.06, 44.06, 44.13, 58.95, 64.94, 65.27, 94.75, 113.01, 120.29, 118.96, 121.77, 112.71, 107.04, 121.1, 132.87, 120.35] },
      velocityScore: { '1D': -2.9, '1W': -4.5, '1M': 2.7, '6M': null }, isNew: false,
      marketCap: '$605B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 6.16, PSI: 4.79, XSD: 2.62, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.37, proScore: 2.52, coverage: 0.75,
      price: 377.16, weeklyPrices: [386.91, 391.78, 397.17, 388.98, 377.16], weeklyChange: -2.52, dayChange: -3.04, sortRank: 0, periodReturns: { '1M': -10.9, 'YTD': 39.1, '6M': 37.8, '1Y': 53.5 },
      priceHistory: { '1D': [388.98, 394.47, 392.72, 391.29, 386.69, 385.14, 381.81, 382.16, 382.04, 380.52, 379.4, 377.49, 377.62, 375.77, 374.91, 373.53, 373.89, 374.81, 376.35, 376.38, 374.58, 374.83, 375.22, 377.16], '1W': [386.91, 391.78, 397.17, 388.98, 377.16], '1M': [423.2, 437.67, 428.76, 401.39, 403.89, 404.62, 392.67, 412.13, 417.79, 427.58, 414.45, 434.46, 445.48, 407.26, 413.16, 417.93, 386.91, 391.78, 397.17, 388.98, 377.16], 'YTD': [271.2, 299.16, 302.1, 305.6, 310.88, 320.45, 337.1, 355.15, 352.41, 319.71, 310.92, 312.19, 303.1, 327.41, 348.6, 375.27, 383.26, 404.77, 419.65, 414.31, 416.88, 437.67, 392.67, 414.45, 417.93, 377.16], '6M': [273.74, 300.93, 300.25, 304.01, 316.86, 322.97, 337.51, 356.09, 338.99, 318.81, 313.66, 321.83, 318.14, 327.41, 348.6, 375.27, 383.26, 404.77, 419.65, 414.31, 416.88, 437.67, 392.67, 414.45, 417.93, 377.16], '1Y': [245.68, 244.68, 241.85, 227.82, 221.71, 223.95, 236.21, 246.95, 254.25, 247.07, 245.21, 245.33, 247.56, 241.99, 225.32, 242.87, 243.29, 232.9, 232.88, 237.53, 225.2, 265.34, 281.29, 279.32, 274.44, 275.63, 277.29, 293.86, 295.67, 303.83, 311.29, 325.16, 346.37, 360.8, 341.51, 319.22, 313.66, 321.83, 318.14, 346.21, 347.94, 381.42, 389.31, 415.63, 432.39, 398.05, 416.88, 437.67, 392.67, 414.45, 417.93, 377.16] },
      velocityScore: { '1D': 4.1, '1W': -7.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$184B', pe: 56, revenueGrowth: 37, eps: 6.73, grossMargin: 64, dividendYield: 1.13,
      etfPresence: { SOXX: 3.61, PSI: 4.31, XSD: 2.18, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 6.12, proScore: 3.06, coverage: 0.5,
      price: 603.04, weeklyPrices: [626.84, 694.64, 723.00, 650.91, 603.04], weeklyChange: -3.8, dayChange: -7.35, sortRank: 0, periodReturns: { '1M': 23.1, 'YTD': 134.7, '6M': 124.3, '1Y': 215.6 },
      priceHistory: { '1D': [650.91, 637.72, 640.46, 625.34, 612.64, 605.29, 601.41, 599.6, 601.29, 602.26, 596.16, 588.15, 588.21, 585.85, 587.1, 583.08, 585.49, 592.36, 594.03, 595.23, 590.9, 592.41, 595.54, 603.04], '1W': [626.84, 694.64, 723, 650.91, 603.04], '1M': [490.05, 500.77, 501.7, 453.01, 492.17, 499.21, 497.01, 552.64, 567.25, 585.78, 592.92, 617.11, 640.18, 585.88, 588.97, 668, 626.84, 694.64, 723, 650.91, 603.04], 'YTD': [256.99, 281.64, 319.08, 322.38, 322.32, 322.51, 354.91, 373.55, 372.18, 338.94, 346.18, 361.79, 323.12, 354.31, 395.64, 394.33, 381.11, 410.82, 431.2, 406.91, 448.25, 500.77, 497.01, 592.92, 668, 603.04], '6M': [268.87, 301.18, 327.01, 319.46, 328.4, 330.57, 359.13, 377.93, 351.32, 345.88, 352.46, 373.99, 341.79, 354.31, 395.64, 394.33, 381.11, 410.82, 431.2, 406.91, 448.25, 500.77, 497.01, 592.92, 668, 603.04], '1Y': [191.05, 197.93, 190.44, 185.69, 179.99, 184.87, 188.24, 159.84, 165.27, 162.75, 167.8, 190.1, 203.92, 217.53, 209.95, 224.99, 228.47, 232.55, 233.53, 223.23, 220.23, 252.25, 268, 259.21, 256.41, 263.05, 284.32, 307.24, 318.23, 332.71, 318.67, 329.07, 369.3, 394.95, 357.76, 351.07, 352.46, 373.99, 341.79, 385.72, 394.26, 403.48, 382.59, 428.62, 436.61, 426.85, 448.25, 500.77, 497.01, 592.92, 668, 603.04] },
      velocityScore: { '1D': -3.2, '1W': 9.3, '1M': 1.7, '6M': null }, isNew: false,
      marketCap: '$479B', pe: 56.8, revenueGrowth: 11, eps: 10.61, grossMargin: 49, dividendYield: 0.33,
      etfPresence: { SOXX: 5.56, PSI: 6.67, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 5.74, proScore: 2.87, coverage: 0.5,
      price: 235.55, weeklyPrices: [248.64, 278.39, 301.71, 266.19, 235.55], weeklyChange: -5.26, dayChange: -11.51, sortRank: 0, periodReturns: { '1M': 15.2, 'YTD': 93.9, '6M': 84.8, '1Y': 154.8 },
      priceHistory: { '1D': [266.19, 258.42, 257.76, 252.18, 245.76, 244.75, 242.39, 241.73, 241.51, 239.63, 237.83, 234.45, 233.71, 232.21, 230.75, 229.71, 229.3, 229.95, 229.57, 230.79, 229.33, 231.13, 232.07, 235.55], '1W': [248.64, 278.39, 301.71, 266.19, 235.55], '1M': [204.52, 212.51, 213.11, 192.92, 210.81, 213.94, 213.56, 241.16, 254.54, 256.42, 238.73, 259.56, 269.16, 244.49, 240.48, 258.8, 248.64, 278.39, 301.71, 266.19, 235.55], 'YTD': [121.51, 132.46, 154.5, 151.28, 142.79, 144.29, 146.41, 148.77, 153.49, 142.91, 143.82, 151.14, 138.26, 154.88, 179.59, 178.54, 180.9, 173.29, 181.13, 174.06, 195.72, 212.51, 213.56, 238.73, 258.8, 235.55], '6M': [127.45, 140, 156.78, 154.3, 141.04, 144.02, 147.02, 150.66, 144.13, 145.29, 148.13, 156.62, 147.24, 154.88, 179.59, 178.54, 180.9, 173.29, 181.13, 174.06, 195.72, 212.51, 213.56, 238.73, 258.8, 235.55], '1Y': [92.46, 92.46, 93.11, 90.21, 88.66, 91.48, 95.54, 87.24, 89.4, 90.51, 96.4, 104.48, 106.43, 110.15, 98.28, 110.67, 115.9, 121.44, 120.64, 116.17, 110.25, 117.55, 121.45, 119.39, 124.57, 126.04, 135.24, 142.82, 148.62, 161.63, 135.55, 143.08, 148.03, 154.67, 147.59, 146.5, 148.13, 156.62, 147.24, 167.23, 174.81, 181.21, 181.62, 181.63, 184.97, 182.95, 195.72, 212.51, 213.56, 238.73, 258.8, 235.55] },
      velocityScore: { '1D': -5.3, '1W': 9.1, '1M': 10, '6M': null }, isNew: false,
      marketCap: '$308B', pe: 66.5, revenueGrowth: 12, eps: 3.54, grossMargin: 61, dividendYield: 0.35,
      etfPresence: { SOXX: 5.32, PSI: 6.16, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 5.19, proScore: 2.6, coverage: 0.5,
      price: 351.41, weeklyPrices: [379.09, 410.91, 433.33, 391.26, 351.41], weeklyChange: -7.3, dayChange: -10.19, sortRank: 0, periodReturns: { '1M': 5.1, 'YTD': 105.3, '6M': 89.9, '1Y': 255.6 },
      priceHistory: { '1D': [391.26, 385.08, 382.95, 375.2, 366.27, 363.02, 361.5, 361.22, 362.01, 360.25, 356.63, 353.85, 354.34, 350.32, 348.92, 345.45, 346.29, 348.88, 347.42, 347.17, 344.2, 346.36, 347.97, 351.41], '1W': [379.09, 410.91, 433.33, 391.26, 351.41], '1M': [334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81, 388.92, 374.18, 389.04, 409.54, 371.33, 374.8, 401.82, 379.09, 410.91, 433.33, 391.26, 351.41], 'YTD': [171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 242.27, 231, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 273.38, 318.93, 343.71, 321.8, 374.18, 401.82, 351.41], '6M': [185.06, 218.36, 222.96, 222.87, 237.5, 229.28, 235.58, 244.25, 217.27, 215.23, 226.47, 238.84, 213.66, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 273.38, 318.93, 343.71, 321.8, 374.18, 401.82, 351.41], '1Y': [98.81, 101.73, 100.66, 96.96, 96.37, 101.75, 107.38, 98.41, 104.09, 102.95, 116.96, 126.92, 128.33, 145.81, 131.37, 141.51, 147.54, 161.01, 162.19, 153.32, 139.59, 156, 158.7, 160.52, 172.27, 175.87, 194.76, 220.4, 222.41, 238.46, 230.1, 226.61, 240.09, 249.48, 222.99, 218.87, 226.47, 238.84, 213.66, 246.49, 265.16, 265.55, 248.75, 297.17, 295.44, 292.09, 318.93, 343.71, 321.8, 374.18, 401.82, 351.41] },
      velocityScore: { '1D': -2.6, '1W': 3.2, '1M': -3.3, '6M': null }, isNew: false,
      marketCap: '$439B', pe: 66.6, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: null,
      etfPresence: { SOXX: 4.73, PSI: 5.65, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 4.27, proScore: 2.13, coverage: 0.5,
      price: 360.45, weeklyPrices: [365.02, 372.45, 377.75, 369.34, 360.45], weeklyChange: -1.25, dayChange: -2.41, sortRank: 0, periodReturns: { '1M': -25.2, 'YTD': 4.1, '6M': 3.7, '1Y': 31 },
      priceHistory: { '1D': [369.34, 369.68, 373.28, 371.95, 368.94, 367, 365.3, 364.8, 364.72, 363.17, 362.2, 358.88, 359.64, 358.52, 359.11, 358.88, 358.95, 359.98, 359.59, 359.09, 357.97, 358.7, 359.45, 360.45], '1W': [365.02, 372.45, 377.75, 369.34, 360.45], '1M': [481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45], 'YTD': [346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 421.86, 479.23, 372.1, 392.9, 378.91, 360.45], '6M': [347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 342.58, 321.31, 318.29, 309.51, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 421.86, 479.23, 372.1, 392.9, 378.91, 360.45], '1Y': [275.18, 274.38, 283.34, 290.18, 288.64, 304.97, 311.23, 289.6, 308.65, 334.89, 359.87, 344.94, 334.53, 338.37, 324.63, 349.33, 344.29, 376.47, 355.59, 339.98, 346.82, 402.96, 390.24, 359.93, 340.36, 349.39, 343.42, 352.21, 332.6, 332.79, 320.33, 340.44, 333.51, 332.31, 317.53, 341.57, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 417.76, 421.86, 479.23, 372.1, 392.9, 378.91, 360.45] },
      velocityScore: { '1D': 3.9, '1W': -3.2, '1M': -46.3, '6M': null }, isNew: false,
      marketCap: '$1.7T', pe: 59.9, revenueGrowth: 48, eps: 6.02, grossMargin: 76, dividendYield: 0.7,
      etfPresence: { SOXX: 6.35, PSI: false, XSD: 2.18, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 3.74, proScore: 1.87, coverage: 0.5,
      price: 245.29, weeklyPrices: [266.77, 277.75, 297.89, 272.05, 245.29], weeklyChange: -8.05, dayChange: -9.84, sortRank: 0, periodReturns: { '1M': -15.6, 'YTD': 188.6, '6M': 174.4, '1Y': 226.3 },
      priceHistory: { '1D': [272.05, 269.07, 271.17, 267.56, 259.5, 255.88, 252.61, 253.23, 253.17, 249.51, 248.3, 245.07, 244.98, 243.11, 242.79, 240.84, 239.42, 241.1, 242.18, 243.02, 240.43, 240.25, 240.5, 245.29], '1W': [266.77, 277.75, 297.89, 272.05, 245.29], '1M': [290.79, 301.65, 316.43, 263.47, 288.85, 266.88, 252.59, 280.71, 279.7, 308.88, 289.54, 310.58, 307.86, 279.04, 276.7, 281.26, 266.77, 277.75, 297.89, 272.05, 245.29], 'YTD': [84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 176.27, 198.7, 301.65, 252.59, 289.54, 281.26, 245.29], '6M': [89.39, 83.22, 80.46, 81.77, 78.66, 82.35, 79.01, 78.39, 77.51, 93.3, 90.79, 92.36, 99.05, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 176.27, 198.7, 301.65, 252.59, 289.54, 281.26, 245.29], '1Y': [75.18, 72.71, 74.65, 74.21, 74.45, 77.34, 79.04, 71.21, 77.23, 63.33, 67.35, 74.26, 83.17, 86.22, 85.61, 87.95, 82.77, 88.57, 93.33, 87.52, 76.68, 89.4, 98.91, 84.43, 84.09, 85.76, 90.23, 82.89, 79.8, 82.93, 75.54, 82.01, 79.09, 80.92, 78.09, 90.44, 90.79, 92.36, 99.05, 114.45, 134.6, 157.32, 156.57, 172.15, 177.95, 186.8, 198.7, 301.65, 252.59, 289.54, 281.26, 245.29] },
      velocityScore: { '1D': 1.6, '1W': -1.6, '1M': -48.5, '6M': null }, isNew: false,
      marketCap: '$215B', pe: 84.3, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: null,
      etfPresence: { SOXX: 5.1, PSI: false, XSD: 2.38, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 3.04, proScore: 1.52, coverage: 0.5,
      price: 293.08, weeklyPrices: [285.43, 285.48, 298.07, 298.41, 293.08], weeklyChange: 2.68, dayChange: -1.79, sortRank: 0, periodReturns: { '1M': -4.9, 'YTD': 68.9, '6M': 65.1, '1Y': 35.7 },
      priceHistory: { '1D': [298.41, 302.95, 303.64, 303.33, 298.81, 298.17, 294.9, 294.57, 294.8, 293.9, 293.11, 291.95, 292.46, 291.08, 290.68, 289.38, 289.3, 290.52, 291.51, 291.2, 290.17, 290.33, 291.11, 293.08], '1W': [285.43, 285.48, 298.07, 298.41, 293.08], '1M': [308.12, 308.59, 305.37, 285.06, 290.9, 288.63, 282.01, 297.1, 301.12, 313.34, 301.88, 322.86, 332.28, 304.36, 303.11, 311.81, 285.43, 285.48, 298.07, 298.41, 293.08], 'YTD': [173.49, 188.45, 189.12, 193.31, 215.55, 221.44, 226.16, 219.86, 209.82, 196.2, 194.13, 188.63, 186.42, 199.74, 218.87, 233.15, 265, 281, 295.17, 302.31, 317.45, 308.59, 282.01, 301.88, 311.81, 293.08], '6M': [177.52, 190.31, 191.58, 196.59, 225.01, 218.77, 225.69, 213.35, 202.67, 197.46, 194.45, 194.63, 194.14, 199.74, 218.87, 233.15, 265, 281, 295.17, 302.31, 317.45, 308.59, 282.01, 301.88, 311.81, 293.08], '1Y': [216.02, 221.25, 216.62, 184.99, 180.86, 187.22, 193.71, 200.71, 204.09, 187.93, 182.6, 179.37, 184.55, 180.32, 171.7, 176.58, 172.19, 160.51, 161.38, 162.23, 153.33, 168.27, 182.54, 179.42, 176.29, 175.69, 177.17, 189.07, 189.59, 196.63, 225.21, 220.92, 223.32, 213.9, 202.39, 198.67, 194.45, 194.63, 194.14, 208.9, 216.29, 236.31, 269.22, 289.44, 306.34, 304.88, 317.45, 308.59, 282.01, 301.88, 311.81, 293.08] },
      velocityScore: { '1D': 6.3, '1W': -1.3, '1M': -48.1, '6M': null }, isNew: false,
      marketCap: '$267B', pe: 50.1, revenueGrowth: 19, eps: 5.85, grossMargin: 57, dividendYield: 1.9,
      etfPresence: { SOXX: 3.75, PSI: false, XSD: 2.33, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 2.88, proScore: 1.44, coverage: 0.5,
      price: 406.42, weeklyPrices: [391.74, 455.96, 483.02, 430.86, 406.42], weeklyChange: 3.75, dayChange: -5.67, sortRank: 0, periodReturns: { '1M': 14.2, 'YTD': 144.3, '6M': 126.3, '1Y': 347.6 },
      priceHistory: { '1D': [430.86, 431.7, 463.4, 447.71, 426.38, 419.5, 413.27, 409.14, 408.52, 409.91, 408.09, 401.58, 403.98, 405.09, 405.2, 400.98, 400.65, 400.48, 399.89, 402.12, 396.21, 397.11, 396.98, 406.42], '1W': [391.74, 455.96, 483.02, 430.86, 406.42], '1M': [355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86, 406.42], 'YTD': [166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 325.33, 363.54, 330.86, 374.68, 398, 406.42], '6M': [179.56, 162.61, 182, 163.25, 152.44, 187.67, 123.69, 128.4, 109.8, 116.48, 127.57, 121.76, 109.6, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 325.33, 363.54, 330.86, 374.68, 398, 406.42], '1Y': [90.8, 95.9, 102.13, 122.23, 131.1, 179.28, 190.69, 177.53, 189.15, 191.2, 229.5, 245.2, 197.78, 200.74, 206.21, 159.8, 163.64, 169.55, 162.83, 144.47, 139.29, 157.57, 161.23, 148.85, 164.4, 170.1, 167.11, 172.57, 183.75, 170.93, 158.52, 182.86, 129.58, 128.15, 113.77, 124.71, 127.57, 121.76, 109.6, 125.46, 172.09, 194.06, 196.85, 213.91, 224.09, 287.48, 325.33, 363.54, 330.86, 374.68, 398, 406.42] },
      velocityScore: { '1D': -5.3, '1W': 7.5, '1M': -33.3, '6M': null }, isNew: false,
      marketCap: '$70B', pe: 278.4, revenueGrowth: 93, eps: 1.46, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.88, PSI: false, XSD: 2.88, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.74, proScore: 1.37, coverage: 0.5,
      price: 273.36, weeklyPrices: [277.02, 278.37, 281.03, 279.18, 273.36], weeklyChange: -1.32, dayChange: -2.08, sortRank: 0, periodReturns: { '1M': -15.5, 'YTD': 25.9, '6M': 23.5, '1Y': 17.8 },
      priceHistory: { '1D': [279.18, 283.64, 284.83, 282.78, 278.21, 275.9, 273.02, 273.44, 273.48, 271.98, 271.99, 270.95, 270.92, 270.02, 269.75, 267.87, 268.52, 269.69, 271.96, 271.07, 270.42, 270.8, 271.05, 273.36], '1W': [277.02, 278.37, 281.03, 279.18, 273.36], '1M': [323.62, 321.88, 322.22, 295.96, 301.14, 297.41, 285.56, 302.55, 304.86, 315.88, 298.2, 313.27, 323.24, 299.94, 294.06, 298.64, 277.02, 278.37, 281.03, 279.18, 273.36], 'YTD': [217.06, 237.89, 238.6, 232.48, 226.14, 224.32, 244.43, 231.16, 224.76, 205.25, 191.89, 193.39, 187.39, 195.12, 209.89, 224.5, 230.39, 292.35, 294.23, 294.28, 329.24, 321.88, 285.56, 298.2, 298.64, 273.36], '6M': [221.28, 241.15, 237.11, 231.05, 231.08, 228.91, 245.09, 234.63, 215.25, 203.03, 194.02, 196.4, 196.86, 195.12, 209.89, 224.5, 230.39, 292.35, 294.23, 294.28, 329.24, 321.88, 285.56, 298.2, 298.64, 273.36], '1Y': [232.1, 228.92, 225.9, 223.29, 209.92, 207.16, 231.54, 223.93, 239.07, 226.74, 218.82, 224.05, 226.04, 228.89, 205.37, 214.35, 220.73, 206.38, 206.45, 201.22, 184.19, 194.94, 227.95, 228.16, 226.27, 220.46, 223.88, 238.33, 230.7, 229.42, 220.66, 236.62, 237.33, 235.07, 216.37, 199.87, 194.02, 196.4, 196.86, 204.27, 209.39, 225.75, 289.25, 303.55, 298.41, 310.15, 329.24, 321.88, 285.56, 298.2, 298.64, 273.36] },
      velocityScore: { '1D': 5.4, '1W': -5.5, '1M': -32.2, '6M': null }, isNew: false,
      marketCap: '$69B', pe: 26.1, revenueGrowth: 12, eps: 10.47, grossMargin: 56, dividendYield: 1.45,
      etfPresence: { SOXX: 3.34, PSI: false, XSD: 2.15, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.5, proScore: 1.25, coverage: 0.5,
      price: 1288.16, weeklyPrices: [1313.32, 1312.77, 1382.36, 1331.73, 1288.16], weeklyChange: -1.92, dayChange: -3.27, sortRank: 0, periodReturns: { '1M': -20.7, 'YTD': 42.1, '6M': 37.6, '1Y': 69.8 },
      priceHistory: { '1D': [1331.73, 1362.81, 1374.35, 1353.54, 1325.7, 1312.95, 1297.76, 1293.33, 1296.42, 1289.71, 1288.74, 1276.1, 1277.65, 1272.49, 1272.99, 1265.64, 1265.97, 1271.73, 1280.33, 1280.24, 1271.19, 1269.28, 1274.43, 1288.16], '1W': [1313.32, 1312.77, 1382.36, 1331.73, 1288.16], '1M': [1624.99, 1689.89, 1652.6, 1481.05, 1559.18, 1531.98, 1473.04, 1589.55, 1577.32, 1652.29, 1448.21, 1563.7, 1537.88, 1423.76, 1434.95, 1438.3, 1313.32, 1312.77, 1382.36, 1331.73, 1288.16], 'YTD': [906.36, 959.09, 1009.54, 1063.74, 1124.15, 1229.82, 1171.47, 1190.06, 1142.58, 1062, 1077.4, 1076.35, 1002.34, 1191.22, 1363.42, 1527.95, 1504.08, 1588.12, 1599.52, 1468.11, 1620.17, 1689.89, 1473.04, 1448.21, 1438.3, 1288.16], '6M': [936.31, 958.97, 1033.17, 1068.14, 1173.22, 1206.18, 1173.18, 1213.67, 1074.37, 1055.82, 1066.66, 1101.59, 1093.35, 1191.22, 1363.42, 1527.95, 1504.08, 1588.12, 1599.52, 1468.11, 1620.17, 1689.89, 1473.04, 1448.21, 1438.3, 1288.16], '1Y': [758.64, 736.06, 725.24, 714.68, 785.62, 804.29, 848.81, 820.74, 858.46, 865.86, 834.14, 916.36, 887.55, 918.83, 904.44, 1004.65, 1070.8, 1087.56, 958.07, 924.29, 857.19, 928.17, 963.28, 946.51, 937.11, 930.04, 955.03, 967.16, 1034.49, 1095.49, 1164.83, 1142.02, 1188.32, 1231.95, 1099.02, 1071.09, 1066.66, 1101.59, 1093.35, 1312.94, 1353, 1522.04, 1526.84, 1652.35, 1650.35, 1553.27, 1620.17, 1689.89, 1473.04, 1448.21, 1438.3, 1288.16] },
      velocityScore: { '1D': 1.6, '1W': -7.4, '1M': -35.6, '6M': null }, isNew: false,
      marketCap: '$63B', pe: 92.1, revenueGrowth: 26, eps: 13.98, grossMargin: 55, dividendYield: 0.6,
      etfPresence: { SOXX: 3.02, PSI: false, XSD: 1.99, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 2.45, proScore: 1.22, coverage: 0.5,
      price: 176.25, weeklyPrices: [189.39, 188.72, 184.79, 181.92, 176.25], weeklyChange: -6.94, dayChange: -3.12, sortRank: 0, periodReturns: { '1M': -26.8, 'YTD': 3, '6M': 1.9, '1Y': 8.7 },
      priceHistory: { '1D': [181.92, 182.53, 183.53, 181.58, 178.22, 176.85, 175.59, 175.33, 175.59, 174.7, 174.29, 172.93, 173.09, 172.98, 173.77, 172.82, 172.97, 173.48, 175.19, 175.06, 174.26, 174.7, 174.62, 176.25], '1W': [189.39, 188.72, 184.79, 181.92, 176.25], '1M': [240.84, 250.01, 242.57, 215.94, 217.77, 205.42, 191.2, 202.96, 211.72, 220.81, 212.97, 226.11, 221.9, 204.13, 197.41, 204.9, 189.39, 188.72, 184.79, 181.92, 176.25], 'YTD': [171.05, 181.87, 161.39, 155.82, 151.59, 137.34, 140.7, 140.41, 141.03, 138.11, 129.39, 128.35, 127.07, 124.07, 132.84, 135.56, 150, 186.55, 210.31, 195.61, 233.4, 250.01, 191.2, 212.97, 204.9, 176.25], '6M': [172.98, 177.78, 159.42, 154.52, 152.62, 138.93, 142.63, 144.78, 138.13, 135.2, 131.59, 128.67, 128.78, 124.07, 132.84, 135.56, 150, 186.55, 210.31, 195.61, 233.4, 250.01, 191.2, 212.97, 204.9, 176.25], '1Y': [162.21, 157.46, 154.8, 158.4, 148.19, 147.56, 158.09, 154.13, 160.8, 159.84, 161.83, 166.85, 169.2, 169.18, 153.59, 163.45, 170.03, 177.26, 173.2, 174.5, 159.59, 168.09, 174.81, 178.29, 175.25, 173.43, 176.31, 169.27, 154.07, 153.04, 147.18, 140.09, 143.24, 145.82, 139.51, 134.12, 131.59, 128.67, 128.78, 127.51, 133.05, 136.07, 156, 192.57, 213.17, 202.51, 233.4, 250.01, 191.2, 212.97, 204.9, 176.25] },
      velocityScore: { '1D': 4.3, '1W': -8.3, '1M': -47.2, '6M': null }, isNew: false,
      marketCap: '$186B', pe: 19, revenueGrowth: -4, eps: 9.3, grossMargin: 55, dividendYield: 2.02,
      etfPresence: { SOXX: 2.79, PSI: false, XSD: 2.1, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.24, proScore: 1.12, coverage: 0.5,
      price: 84.64, weeklyPrices: [87.93, 89.06, 91.20, 88.69, 84.64], weeklyChange: -3.74, dayChange: -4.57, sortRank: 0, periodReturns: { '1M': -12.7, 'YTD': 32.8, '6M': 30.2, '1Y': 15.8 },
      priceHistory: { '1D': [88.69, 89.53, 89.06, 88.92, 87.26, 86.9, 85.64, 85.49, 85.59, 85.03, 84.75, 84.09, 84.03, 83.7, 83.43, 83.02, 83.12, 83.5, 83.89, 83.84, 83.52, 83.79, 83.91, 84.64], '1W': [87.93, 89.06, 91.2, 88.69, 84.64], '1M': [96.96, 96.55, 96.3, 88.34, 91.37, 91.47, 87.91, 92.94, 95.24, 100.32, 94.11, 99.77, 102.71, 93.26, 92.48, 94.12, 87.93, 89.06, 91.2, 88.69, 84.64], 'YTD': [63.72, 73.53, 74.45, 74.71, 75.92, 76.01, 78.56, 76.6, 74.31, 65, 63.83, 64.34, 60.06, 67.51, 74.5, 80.93, 84.26, 98.48, 97.7, 91.81, 96.85, 96.55, 87.91, 94.11, 94.12, 84.64], '6M': [65.03, 75.22, 74.7, 74.79, 78.08, 74.41, 78.94, 75.93, 71.39, 65.33, 64.59, 65.63, 64.61, 67.51, 74.5, 80.93, 84.26, 98.48, 97.7, 91.81, 96.85, 96.55, 87.91, 94.11, 94.12, 84.64], '1Y': [73.06, 74.56, 74.78, 69.21, 66.36, 61.87, 65.99, 66.1, 65.25, 65.92, 64.7, 65.15, 64.42, 66.54, 60.41, 65.14, 65.09, 62.07, 59.35, 54.81, 49.02, 53.58, 65.81, 67.18, 64.91, 64.65, 67.06, 73.39, 73.17, 75.16, 76.66, 76.86, 79.11, 75.47, 69.9, 65.79, 64.59, 65.63, 64.61, 70.73, 74.49, 82.48, 90.17, 102.92, 96.71, 94.02, 96.85, 96.55, 87.91, 94.11, 94.12, 84.64] },
      velocityScore: { '1D': 2.8, '1W': -4.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$46B', pe: 384.7, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: null,
      etfPresence: { SOXX: 2.25, PSI: false, XSD: 2.23, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.23, proScore: 1.11, coverage: 0.5,
      price: 241.91, weeklyPrices: [238.00, 245.68, 271.95, 259.09, 241.91], weeklyChange: 1.64, dayChange: -6.63, sortRank: 0, periodReturns: { '1M': 5.6, 'YTD': 68.1, '6M': 68.9, '1Y': 158.4 },
      priceHistory: { '1D': [259.09, 254.56, 275.89, 265.2, 252.56, 250.24, 245.27, 245.45, 245, 243.74, 241.45, 238.43, 240.31, 239.67, 238.35, 236.53, 237.66, 237.48, 238.44, 239.84, 236.96, 237.39, 236.48, 241.91], '1W': [238, 245.68, 271.95, 259.09, 241.91], '1M': [229, 214.6, 217.5, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81, 259.41, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.09, 241.91], 'YTD': [143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.05, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.23, 214.6, 237.68, 249.33, 268.03, 241.91], '6M': [143.22, 150.42, 150.97, 128.02, 119.96, 123.41, 124.8, 120.83, 97.3, 112.33, 104.06, 100.3, 93.87, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.23, 214.6, 237.68, 249.33, 268.03, 241.91], '1Y': [93.61, 98.52, 93.47, 101.22, 107.56, 120.41, 117.33, 110.86, 131.82, 140.82, 161.99, 169.56, 142.93, 143.87, 138.83, 143.61, 150.97, 166.62, 162.74, 142.95, 134.73, 177.6, 176.04, 143.91, 150.13, 144.7, 140.24, 156.07, 153.22, 129.57, 111.31, 134.72, 127.91, 123.46, 102.54, 115.91, 104.06, 100.3, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 189.36, 182.98, 221.23, 214.6, 237.68, 249.33, 268.03, 241.91] },
      velocityScore: { '1D': 0, '1W': -4.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$45B', pe: 96.4, revenueGrowth: 157, eps: 2.51, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 2.05, PSI: false, XSD: 2.41, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 1.82, proScore: 0.91, coverage: 0.5,
      price: 91.22, weeklyPrices: [90.65, 88.57, 94.54, 94.63, 91.22], weeklyChange: 0.63, dayChange: -3.6, sortRank: 0, periodReturns: { '1M': -29.1, 'YTD': 68.5, '6M': 60.9, '1Y': 61.2 },
      priceHistory: { '1D': [94.63, 97.18, 97.52, 97.74, 95.12, 94.11, 92.86, 92.81, 92.45, 91.73, 91.46, 90.82, 91.01, 90.56, 90.39, 89.44, 89.37, 89.89, 90.67, 90.73, 89.81, 89.92, 90.26, 91.22], '1W': [90.65, 88.57, 94.54, 94.63, 91.22], '1M': [128.64, 133.93, 131.82, 117.26, 120.9, 117, 110.17, 115.96, 116.79, 125.9, 112.92, 121.62, 131.55, 117.06, 115.74, 118.74, 90.65, 88.57, 94.54, 94.63, 91.22], 'YTD': [54.15, 60.89, 60.28, 61.98, 59.89, 65.2, 72.21, 69.47, 66.48, 59.23, 59.88, 59.89, 55.66, 63.79, 72.05, 86.91, 93.3, 102.67, 104.11, 106.02, 124.89, 133.93, 110.17, 112.92, 118.74, 91.22], '6M': [56.7, 62.16, 60.33, 61.13, 61.53, 65.1, 71.96, 70.03, 63.42, 59.59, 60.98, 62.34, 61.92, 63.79, 72.05, 86.91, 93.3, 102.67, 104.11, 106.02, 124.89, 133.93, 110.17, 112.92, 118.74, 91.22], '1Y': [56.6, 59.73, 60.72, 56.92, 56.82, 47.66, 51.62, 48.81, 50.78, 49.11, 48.26, 51.07, 50.16, 49.27, 45.74, 52.53, 51.78, 50.85, 48.8, 48.13, 44.9, 50.24, 54.74, 54.96, 55.21, 54.02, 58.69, 58.75, 60.06, 62.63, 59.43, 67.38, 70.66, 69.68, 62.53, 59.24, 60.98, 62.34, 61.92, 68.38, 72.43, 88.99, 98.86, 105.77, 115.71, 110.21, 124.89, 133.93, 110.17, 112.92, 118.74, 91.22] },
      velocityScore: { '1D': 5.8, '1W': -18.8, '1M': -53.1, '6M': null }, isNew: false,
      marketCap: '$36B', pe: 67.1, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 1.76, PSI: false, XSD: 1.89, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 2, avgWeight: 1.67, proScore: 0.83, coverage: 0.5,
      price: 322.26, weeklyPrices: [369.18, 372.59, 380.37, 350.63, 322.26], weeklyChange: -12.71, dayChange: -8.09, sortRank: 0, periodReturns: { '1M': -15.7, 'YTD': 88.1, '6M': 84.2, '1Y': 129.1 },
      priceHistory: { '1D': [350.63, 344.96, 346.17, 343.83, 335.1, 337.16, 332.01, 332, 330.56, 325.89, 322.82, 319.76, 320.45, 316.4, 317.05, 315.37, 315.8, 316.65, 318.27, 318.07, 315.08, 315.56, 315.05, 322.26], '1W': [369.18, 372.59, 380.37, 350.63, 322.26], '1M': [382.35, 390.34, 382.74, 345.4, 361.86, 358.72, 354.4, 374.76, 379.87, 384.77, 367.11, 391.41, 396.26, 372.15, 373.08, 390.19, 369.18, 372.59, 380.37, 350.63, 322.26], 'YTD': [171.28, 167.66, 218.93, 219.26, 219.06, 235.87, 244.16, 245.53, 258.54, 218.73, 224.92, 229.26, 209.49, 236.99, 263.92, 285.71, 265.61, 303.57, 362.76, 358.98, 400.66, 390.34, 354.4, 367.11, 390.19, 322.26], '6M': [174.96, 174.87, 220.68, 218.89, 228.56, 235.7, 245.59, 248.29, 241.01, 220.59, 221.29, 237.23, 222.07, 236.99, 263.92, 285.71, 265.61, 303.57, 362.76, 358.98, 400.66, 390.34, 354.4, 367.11, 390.19, 322.26], '1Y': [140.68, 136.2, 142.11, 137.67, 136.31, 120.94, 125.4, 123.58, 133.89, 129.86, 131.87, 127.12, 129.39, 127.41, 122.18, 136.82, 139.31, 150.61, 166.92, 162.24, 155.39, 174.99, 184.1, 177.35, 174.42, 173.71, 170.76, 197.55, 221.7, 219.2, 226.71, 230.54, 246.76, 253.37, 239, 222.55, 221.29, 237.23, 222.07, 247, 261.16, 277, 269.63, 309.81, 381.55, 375.71, 400.66, 390.34, 354.4, 367.11, 390.19, 322.26] },
      velocityScore: { '1D': -3.5, '1W': -6.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$25B', pe: 137.1, revenueGrowth: 23, eps: 2.35, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: 1.16, PSI: false, XSD: 2.18, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RMBS', name: 'RAMBUS INC', easyScore: 2, avgWeight: 1.31, proScore: 0.65, coverage: 0.5,
      price: 112.92, weeklyPrices: [114.73, 123.90, 132.74, 123.83, 112.92], weeklyChange: -1.58, dayChange: -8.81, sortRank: 0, periodReturns: { '1M': -32.3, 'YTD': 22.9, '6M': 13.7, '1Y': 71.4 },
      priceHistory: { '1D': [123.83, 125.42, 125.9, 123.66, 119.8, 118.21, 115.5, 115.77, 115.11, 113.6, 112.92, 111.28, 111.02, 110.6, 110.28, 109.14, 109.29, 109.51, 110.06, 111.13, 109.77, 109.86, 109.27, 112.92], '1W': [114.73, 123.9, 132.74, 123.83, 112.92], '1M': [166.78, 170.66, 169.35, 145.31, 152.03, 146.84, 138.12, 144.47, 146.56, 143.29, 130.1, 141.17, 140.35, 128.21, 124.52, 123.69, 114.73, 123.9, 132.74, 123.83, 112.92], 'YTD': [91.89, 91.34, 103.07, 115.31, 113.83, 107.1, 101.95, 95.27, 98.88, 88.52, 92.78, 93.35, 79.73, 91.87, 121.73, 130.45, 111.27, 118, 130.28, 122.03, 148.66, 170.66, 138.12, 130.1, 123.69, 112.92], '6M': [99.28, 93.38, 107.99, 114.19, 113.71, 110.92, 101.95, 98.57, 87.59, 89.61, 93.5, 92.69, 86.03, 91.87, 121.73, 130.45, 111.27, 118, 130.28, 122.03, 148.66, 170.66, 138.12, 130.1, 123.69, 112.92], '1Y': [65.89, 64.06, 68.21, 62.85, 72.41, 72.86, 76, 70.44, 81.09, 74.81, 86.03, 102.35, 102.62, 99.99, 89.57, 96.26, 101.61, 107.75, 106.49, 92.37, 87.28, 95.57, 101.6, 94.23, 96.4, 93.57, 97.5, 92.9, 110.1, 115.71, 98.45, 106.99, 104.34, 101.09, 92.04, 92.53, 93.5, 92.69, 86.03, 101.43, 120.02, 131.55, 112.16, 130.04, 134.85, 133.56, 148.66, 170.66, 138.12, 130.1, 123.69, 112.92] },
      velocityScore: { '1D': -1.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 53.8, revenueGrowth: 8, eps: 2.1, grossMargin: 80, dividendYield: null,
      etfPresence: { SOXX: 0.64, PSI: false, XSD: 1.97, DRAM: false },
      tonyNote: 'RAMBUS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 5.85, proScore: 3.1, coverage: 0.529,
      price: 975.56, weeklyPrices: [1132.33, 1145.28, 1154.29, 1032.28, 975.56], weeklyChange: -13.84, dayChange: -5.49, sortRank: 0, periodReturns: { '1M': -8.3, 'YTD': 241.8, '6M': 209.3, '1Y': 697.7 },
      priceHistory: { '1D': [1032.28, 1040.13, 1057.56, 1035.56, 1013.82, 990.53, 988.41, 998.15, 1001.12, 986.6, 981.3, 971.63, 973.07, 970.17, 972.33, 956.7, 960.03, 961.75, 971.88, 977.3, 964.08, 957.34, 962.15, 975.56], '1W': [1132.33, 1145.28, 1154.29, 1032.28, 975.56], '1M': [1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1213.56, 975.56], '6M': [315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1213.56, 975.56], '1Y': [122.29, 124.53, 114.39, 111.26, 104.88, 118.89, 125.29, 115.79, 122, 131.37, 157.23, 162.73, 157.27, 187.83, 181.6, 202.38, 206.71, 224.01, 238.33, 236.95, 201.37, 236.48, 237.22, 241.14, 265.92, 294.37, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 418.69, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 928.41, 1079.57, 891.88, 1043.19, 1213.56, 975.56] },
      velocityScore: { '1D': -2.2, '1W': 4, '1M': -14.8, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 22, revenueGrowth: 346, eps: 44.28, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { PTF: 4.63, WCLD: false, IGV: false, FDTX: 9.33, GTEK: false, ARKK: false, MARS: false, FRWD: 5.22, BCTK: 5.01, FWD: 1.33, CBSE: false, FCUS: 4.93, WGMI: false, CNEQ: 1.72, SGRT: 8.45, SPMO: 12.01, XMMO: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 9, avgWeight: 5.53, proScore: 2.93, coverage: 0.529,
      price: 194.83, weeklyPrices: [192.53, 194.97, 200.09, 197.58, 194.83], weeklyChange: 1.19, dayChange: -1.39, sortRank: 0, periodReturns: { '1M': -12.6, 'YTD': 4.5, '6M': 3.2, '1Y': 22.3 },
      priceHistory: { '1D': [197.58, 198.1, 199.54, 199.21, 197.1, 195.5, 195.26, 194.78, 195.07, 194.36, 194.07, 193.43, 193.87, 193.07, 193.05, 192.84, 192.85, 192.93, 193.46, 193.46, 192.88, 193.1, 193.63, 194.83], '1W': [192.53, 194.97, 200.09, 197.58, 194.83], '1M': [222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83], 'YTD': [186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 212.6, 214.75, 200.42, 204.65, 195.74, 194.83], '6M': [188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 184.77, 181.93, 175.2, 174.4, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 212.6, 214.75, 200.42, 204.65, 195.74, 194.83], '1Y': [159.34, 164.92, 172.41, 173.5, 173.72, 182.7, 182.02, 174.98, 180.17, 167.02, 177.82, 176.67, 178.19, 187.62, 183.16, 183.22, 182.16, 202.89, 188.08, 186.86, 180.64, 177, 182.41, 175.02, 180.99, 188.22, 188.12, 184.94, 178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 186.03, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 223.47, 212.6, 214.75, 200.42, 204.65, 195.74, 194.83] },
      velocityScore: { '1D': -5.2, '1W': -11.5, '1M': -33, '6M': null }, isNew: false,
      marketCap: '$4.7T', pe: 29.9, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.51,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.09, GTEK: false, ARKK: 1.53, MARS: false, FRWD: 8.06, BCTK: 5.79, FWD: 1.8, CBSE: false, FCUS: false, WGMI: 1.84, CNEQ: 13.13, SGRT: 6.16, SPMO: 7.41, XMMO: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 8, avgWeight: 3.74, proScore: 1.76, coverage: 0.471,
      price: 517.82, weeklyPrices: [521.58, 539.49, 580.91, 540.88, 517.82], weeklyChange: -0.72, dayChange: -4.26, sortRank: 0, periodReturns: { '1M': -0.7, 'YTD': 141.8, '6M': 131.7, '1Y': 275.5 },
      priceHistory: { '1D': [540.88, 533.49, 544.83, 539.84, 524.78, 517.8, 518.21, 518.26, 521.58, 517.25, 519.22, 512.65, 513.35, 512.07, 512.77, 509.43, 510.22, 511.94, 514.1, 514.98, 509.58, 509.84, 511.7, 517.82], '1W': [521.58, 539.49, 580.91, 540.88, 517.82], '1M': [521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 542.52, 452.4, 512.48, 532.57, 517.82], '6M': [223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 542.52, 452.4, 512.48, 532.57, 517.82], '1Y': [137.91, 146.42, 156.99, 166.47, 171.7, 172.76, 180.95, 163.71, 168.58, 151.14, 158.57, 157.39, 159.46, 164.67, 214.9, 233.08, 234.99, 254.84, 237.7, 247.96, 206.02, 217.53, 217.97, 210.78, 213.43, 215.61, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 204.83, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 495.54, 542.52, 452.4, 512.48, 532.57, 517.82] },
      velocityScore: { '1D': -0.6, '1W': 6, '1M': -35.1, '6M': null }, isNew: false,
      marketCap: '$844B', pe: 174.4, revenueGrowth: 38, eps: 2.97, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.58, MARS: false, FRWD: 7.41, BCTK: 3.35, FWD: 2.17, CBSE: false, FCUS: 3.47, WGMI: false, CNEQ: 1.11, SGRT: 3.7, SPMO: 4.11, XMMO: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 7, avgWeight: 4.84, proScore: 1.99, coverage: 0.412,
      price: 539, weeklyPrices: [586.45, 651.88, 638.72, 598.37, 539.00], weeklyChange: -8.09, dayChange: -9.92, sortRank: 0, periodReturns: { '1M': -4.3, 'YTD': 212.9, '6M': 187.2, '1Y': 715.7 },
      priceHistory: { '1D': [598.37, 595.47, 599.97, 586.33, 573.06, 560.79, 555.76, 556.66, 559.92, 553.15, 547.08, 540.95, 540.72, 536.66, 533.32, 528.01, 529, 529.64, 535.01, 538.8, 536.91, 536.33, 537.54, 539], '1W': [586.45, 651.88, 638.72, 598.37, 539], '1M': [563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539], 'YTD': [172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 530.6, 594.11, 490.09, 712.13, 675.39, 539], '6M': [187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 266.22, 313.81, 301.05, 270.49, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 530.6, 594.11, 490.09, 712.13, 675.39, 539], '1Y': [66.08, 66.14, 68, 68.82, 76.55, 74.97, 76.24, 74.66, 82.04, 92.04, 97.66, 106.63, 106.88, 131.31, 115.42, 126.2, 125.72, 138.13, 163.6, 157.16, 140.23, 163.33, 168.89, 176.34, 181.08, 179.68, 187.88, 212.14, 222.97, 252.66, 290.24, 262.56, 296.56, 290.95, 261.3, 268.81, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 459.62, 530.6, 594.11, 490.09, 712.13, 675.39, 539] },
      velocityScore: { '1D': -3.4, '1W': -12.7, '1M': -22.9, '6M': null }, isNew: false,
      marketCap: '$186B', pe: 32.3, revenueGrowth: 46, eps: 16.69, grossMargin: 45, dividendYield: 0.1,
      etfPresence: { PTF: 4.11, WCLD: false, IGV: false, FDTX: 4.49, GTEK: false, ARKK: false, MARS: false, FRWD: 5.26, BCTK: false, FWD: false, CBSE: false, FCUS: 4.61, WGMI: false, CNEQ: 4.96, SGRT: 8.41, SPMO: 2.06, XMMO: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 7, avgWeight: 3.57, proScore: 1.47, coverage: 0.412,
      price: 360.45, weeklyPrices: [365.02, 372.45, 377.75, 369.34, 360.45], weeklyChange: -1.25, dayChange: -2.41, sortRank: 0, periodReturns: { '1M': -25.2, 'YTD': 4.1, '6M': 3.7, '1Y': 31 },
      priceHistory: { '1D': [369.34, 369.68, 373.28, 371.95, 368.94, 367, 365.3, 364.8, 364.72, 363.17, 362.2, 358.88, 359.64, 358.52, 359.11, 358.88, 358.95, 359.98, 359.59, 359.09, 357.97, 358.7, 359.45, 360.45], '1W': [365.02, 372.45, 377.75, 369.34, 360.45], '1M': [481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45], 'YTD': [346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 421.86, 479.23, 372.1, 392.9, 378.91, 360.45], '6M': [347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 342.58, 321.31, 318.29, 309.51, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 421.86, 479.23, 372.1, 392.9, 378.91, 360.45], '1Y': [275.18, 274.38, 283.34, 290.18, 288.64, 304.97, 311.23, 289.6, 308.65, 334.89, 359.87, 344.94, 334.53, 338.37, 324.63, 349.33, 344.29, 376.47, 355.59, 339.98, 346.82, 402.96, 390.24, 359.93, 340.36, 349.39, 343.42, 352.21, 332.6, 332.79, 320.33, 340.44, 333.51, 332.31, 317.53, 341.57, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 417.76, 421.86, 479.23, 372.1, 392.9, 378.91, 360.45] },
      velocityScore: { '1D': -1.3, '1W': 1.4, '1M': -33.2, '6M': null }, isNew: false,
      marketCap: '$1.7T', pe: 59.9, revenueGrowth: 48, eps: 6.02, grossMargin: 76, dividendYield: 0.7,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.62, GTEK: false, ARKK: 1.03, MARS: false, FRWD: 4.69, BCTK: 6.67, FWD: 1.81, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.15, SGRT: false, SPMO: 6, XMMO: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 6, avgWeight: 4.75, proScore: 1.68, coverage: 0.353,
      price: 434.16, weeklyPrices: [432.35, 455.10, 477.57, 444.23, 434.16], weeklyChange: 0.42, dayChange: -2.27, sortRank: 0, periodReturns: { '1M': -2.8, 'YTD': 42.9, '6M': 35.8, '1Y': 84.9 },
      priceHistory: { '1D': [444.23, 452.57, 460.55, 456.36, 449.18, 447.64, 444.11, 442.98, 443.51, 440.88, 440.08, 435.51, 434.95, 431.86, 431.77, 430.36, 431.86, 432.96, 434.18, 434.18, 431.87, 433.4, 434.5, 434.16], '1W': [432.35, 455.1, 477.57, 444.23, 434.16], '1M': [446.69, 436.69, 444.92, 415.17, 426.8, 427.92, 408.75, 421.07, 423.93, 441.4, 432.15, 462.12, 467.67, 436.39, 440.83, 434.99, 432.35, 455.1, 477.57, 444.23, 434.16], 'YTD': [303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 370.04, 369.11, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 392.61, 422.73, 436.69, 408.75, 432.15, 434.99, 434.16], '6M': [319.61, 323.63, 342.4, 332.71, 341.36, 355.41, 364.2, 385.75, 353.13, 347.09, 345.98, 343.25, 337.95, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 392.61, 422.73, 436.69, 408.75, 432.15, 434.99, 434.16], '1Y': [234.8, 230.4, 240.4, 245.6, 235.21, 241.83, 241, 227.33, 238.27, 243.41, 259.33, 264.87, 273.36, 292.19, 280.66, 295.08, 290.73, 303.22, 289.24, 282.2, 277.5, 291.51, 294.72, 292.04, 288.95, 300.92, 322.25, 331.77, 327.16, 338.34, 335.75, 361.91, 362.26, 387.73, 357.44, 354.56, 345.98, 343.25, 337.95, 365.9, 375.1, 387.44, 393.83, 419.5, 399.8, 401.62, 422.73, 436.69, 408.75, 432.15, 434.99, 434.16] },
      velocityScore: { '1D': 0.6, '1W': -6.7, '1M': -42.3, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 37.7, revenueGrowth: 35, eps: 11.51, grossMargin: 62, dividendYield: 0.86,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6.39, GTEK: false, ARKK: 0.93, MARS: false, FRWD: 6.14, BCTK: 8.68, FWD: false, CBSE: false, FCUS: false, WGMI: 0.56, CNEQ: 5.79, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 6, avgWeight: 3.1, proScore: 1.09, coverage: 0.353,
      price: 242.67, weeklyPrices: [232.69, 240.14, 238.34, 241.70, 242.67], weeklyChange: 4.29, dayChange: 0.4, sortRank: 0, periodReturns: { '1M': -5.4, 'YTD': 5.1, '6M': 7.1, '1Y': 8.6 },
      priceHistory: { '1D': [241.7, 242.2, 242.93, 244.3, 244.98, 244.46, 245.18, 244.76, 245.41, 245.63, 246.23, 245.6, 245.35, 244.63, 244.88, 244.01, 243.93, 244.35, 243.97, 243.51, 243.61, 243.98, 243.23, 242.67], '1W': [232.69, 240.14, 238.34, 241.7, 242.67], '1M': [256.52, 250.02, 253.79, 246.03, 245.22, 244.19, 238, 241.51, 238.55, 246.02, 237.5, 244.39, 232.79, 234.11, 234.27, 227.01, 232.69, 240.14, 238.34, 241.7, 242.67], 'YTD': [230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 198.79, 205.27, 208.39, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 259.34, 271.85, 250.02, 238, 237.5, 227.01, 242.67], '6M': [226.5, 247.38, 239.12, 238.42, 242.96, 208.72, 201.15, 208.56, 208.73, 214.33, 215.2, 207.24, 208.27, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 259.34, 271.85, 250.02, 238, 237.5, 227.01, 242.67], '1Y': [223.41, 225.02, 226.13, 231.44, 214.75, 222.69, 230.98, 221.95, 231.6, 232.33, 228.15, 231.48, 219.78, 219.51, 216.37, 213.04, 221.09, 222.86, 243.04, 237.58, 217.14, 233.22, 229.53, 226.19, 227.35, 232.07, 233.06, 246.47, 231, 244.68, 238.62, 206.96, 204.79, 210.64, 216.82, 212.65, 215.2, 207.24, 208.27, 221.25, 248.5, 255.36, 263.04, 274.99, 270.13, 265.01, 271.85, 250.02, 238, 237.5, 227.01, 242.67] },
      velocityScore: { '1D': -3.5, '1W': -10.7, '1M': -68.9, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 31.8, revenueGrowth: 17, eps: 7.64, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.29, GTEK: false, ARKK: 2.34, MARS: false, FRWD: 2.9, BCTK: 4.2, FWD: 1.46, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.39, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'SPCX', name: 'SPACE EXPLORATION TECHN-CL A', easyScore: 5, avgWeight: 7.83, proScore: 2.3, coverage: 0.294,
      price: 162, weeklyPrices: [153.23, 164.19, 170.86, 157.54, 162.00], weeklyChange: 5.72, dayChange: 2.83, sortRank: 0, periodReturns: { '1M': 0.7, 'YTD': 0.7, '6M': 0.7, '1Y': 0.7 },
      priceHistory: { '1D': [157.54, 158, 160.28, 159.46, 158.85, 159.08, 158.59, 158.05, 158.4, 158.01, 157.72, 156.46, 157.32, 156.95, 156.77, 157.1, 158.09, 158.12, 159.02, 158.46, 158.88, 159.72, 161.23, 162], '1W': [153.23, 164.19, 170.86, 157.54, 162], '1M': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162], 'YTD': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162], '6M': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162], '1Y': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162] },
      velocityScore: { '1D': -9.4, '1W': -10.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.1T', pe: null, revenueGrowth: 15, eps: -0.68, grossMargin: 49, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.08, MARS: 21.63, FRWD: false, BCTK: 8.29, FWD: 1.78, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.35, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'SPACE EXPLORATION TECHN-CL A appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 7.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LRCX', name: 'Lam Research Corp', easyScore: 5, avgWeight: 4.86, proScore: 1.43, coverage: 0.294,
      price: 351.41, weeklyPrices: [379.09, 410.91, 433.33, 391.26, 351.41], weeklyChange: -7.3, dayChange: -10.19, sortRank: 0, periodReturns: { '1M': 5.1, 'YTD': 105.3, '6M': 89.9, '1Y': 255.6 },
      priceHistory: { '1D': [391.26, 385.08, 382.95, 375.2, 366.27, 363.02, 361.5, 361.22, 362.01, 360.25, 356.63, 353.85, 354.34, 350.32, 348.92, 345.45, 346.29, 348.88, 347.42, 347.17, 344.2, 346.36, 347.97, 351.41], '1W': [379.09, 410.91, 433.33, 391.26, 351.41], '1M': [334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81, 388.92, 374.18, 389.04, 409.54, 371.33, 374.8, 401.82, 379.09, 410.91, 433.33, 391.26, 351.41], 'YTD': [171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 242.27, 231, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 273.38, 318.93, 343.71, 321.8, 374.18, 401.82, 351.41], '6M': [185.06, 218.36, 222.96, 222.87, 237.5, 229.28, 235.58, 244.25, 217.27, 215.23, 226.47, 238.84, 213.66, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 273.38, 318.93, 343.71, 321.8, 374.18, 401.82, 351.41], '1Y': [98.81, 101.73, 100.66, 96.96, 96.37, 101.75, 107.38, 98.41, 104.09, 102.95, 116.96, 126.92, 128.33, 145.81, 131.37, 141.51, 147.54, 161.01, 162.19, 153.32, 139.59, 156, 158.7, 160.52, 172.27, 175.87, 194.76, 220.4, 222.41, 238.46, 230.1, 226.61, 240.09, 249.48, 222.99, 218.87, 226.47, 238.84, 213.66, 246.49, 265.16, 265.55, 248.75, 297.17, 295.44, 292.09, 318.93, 343.71, 321.8, 374.18, 401.82, 351.41] },
      velocityScore: { '1D': 1.4, '1W': 5.9, '1M': -37, '6M': null }, isNew: false,
      marketCap: '$439B', pe: 66.6, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: null,
      etfPresence: { PTF: 3.11, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 6.44, BCTK: 8.28, FWD: 2.12, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 4.33, XMMO: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 5, avgWeight: 3.96, proScore: 1.17, coverage: 0.294,
      price: 356.18, weeklyPrices: [334.69, 351.28, 353.33, 357.89, 356.18], weeklyChange: 6.42, dayChange: -0.48, sortRank: 0, periodReturns: { '1M': -0.6, 'YTD': 13.5, '6M': 13, '1Y': 97.3 },
      priceHistory: { '1D': [357.89, 358.35, 358.82, 359.2, 360.17, 357.46, 355.39, 353.86, 352.48, 351.92, 352.68, 351.98, 350.75, 351.57, 351.93, 353.73, 353.76, 354.99, 354.98, 354.48, 355.54, 355.59, 355.82, 356.18], '1W': [334.69, 351.28, 353.33, 357.89, 356.18], '1M': [358.39, 355.68, 369.27, 365.76, 361.17, 362.29, 353.32, 356.56, 358.16, 367.11, 362.1, 367.46, 348.78, 346.08, 345.04, 342.19, 334.69, 351.28, 353.33, 357.89, 356.18], 'YTD': [313.8, 326.01, 333.16, 328.43, 338.53, 323.1, 306.02, 311.69, 306.36, 306.01, 304.42, 299.02, 273.14, 303.93, 330.58, 330.47, 347.5, 384.27, 383.82, 384.9, 384.83, 355.68, 353.32, 362.1, 342.19, 356.18], '6M': [315.32, 329.14, 330.34, 333.59, 344.9, 324.4, 302.82, 310.92, 303.56, 306.93, 309.41, 289.2, 286.86, 303.93, 330.58, 330.47, 347.5, 384.27, 383.82, 384.9, 384.83, 355.68, 353.32, 362.1, 342.19, 356.18], '1Y': [180.55, 181.31, 185.94, 194.08, 189.95, 202.09, 203.82, 200.62, 212.37, 235.17, 241.38, 255.24, 247.18, 246.45, 237.49, 253.79, 253.73, 281.9, 285.34, 279.12, 289.98, 320.12, 322.09, 310.52, 308.61, 314.39, 317.32, 332.73, 322.16, 335, 340.7, 318.63, 303.94, 313.03, 303.45, 308.42, 309.41, 289.2, 286.86, 314.74, 334.47, 337.73, 347.31, 395.14, 399.04, 384.9, 384.83, 355.68, 353.32, 362.1, 342.19, 356.18] },
      velocityScore: { '1D': -0.8, '1W': -2.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.3T', pe: 27.2, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.21, GTEK: false, ARKK: 1.86, MARS: false, FRWD: false, BCTK: 5.54, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 5.83, SGRT: false, SPMO: 3.38, XMMO: false },
      tonyNote: 'Alphabet Inc Class C appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 4.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRWD', name: 'CrowdStrike', easyScore: 5, avgWeight: 2.65, proScore: 0.78, coverage: 0.294,
      price: 193.98, weeklyPrices: [175.27, 185.73, 190.79, 193.18, 193.98], weeklyChange: 10.67, dayChange: 0.41, sortRank: 0, periodReturns: { '1M': 0.9, 'YTD': 65.5, '6M': 71.1, '1Y': 50.9 },
      priceHistory: { '1D': [193.19, 194.23, 198.34, 198.24, 197.28, 196.09, 197.51, 196.66, 197.51, 194.4, 195, 194.96, 195.79, 195.35, 195.07, 193.5, 194.74, 195.58, 196.56, 196.6, 195.99, 195.34, 194.87, 193.98], '1W': [175.27, 185.73, 190.79, 193.18, 193.98], '1M': [192.24, 186.9, 179.77, 167.76, 164.7, 161.23, 161.93, 172.88, 170.7, 173.23, 170.74, 171.21, 168.86, 170.23, 168.26, 169.66, 175.27, 185.73, 190.79, 193.18, 193.98], 'YTD': [117.19, 115.97, 113.75, 113.12, 110.35, 98.88, 107.41, 87.58, 96.21, 108.53, 105.96, 103.33, 95.01, 105.81, 99.62, 112.4, 113.75, 119.13, 136.54, 154.22, 161.34, 186.9, 161.93, 170.74, 169.66, 193.98], '6M': [113.39, 117.65, 113.47, 117.08, 109.71, 102.01, 103.57, 87.56, 97.86, 109.08, 108.3, 98.25, 97.6, 105.81, 99.62, 112.4, 113.75, 119.13, 136.54, 154.22, 161.34, 186.9, 161.93, 170.74, 169.66, 193.98], '1Y': [128.52, 119.61, 118.99, 116.98, 111.67, 106.12, 106.21, 103.51, 110.5, 104.41, 109.03, 125.64, 120.36, 122.47, 123.42, 121.16, 130.49, 134.67, 133.13, 132.45, 125.33, 127.29, 128.01, 126.19, 120.32, 118.98, 114.14, 116.75, 110.68, 119.17, 105.43, 103.35, 103.94, 90.83, 101.92, 110.51, 108.3, 98.25, 97.6, 106.63, 102.79, 116.67, 113.1, 117.02, 140.64, 162.53, 161.34, 186.9, 161.93, 170.74, 169.66, 193.98] },
      velocityScore: { '1D': 1.3, '1W': 13, '1M': null, '6M': null }, isNew: false,
      marketCap: '$198B', pe: null, revenueGrowth: 26, eps: -0.04, grossMargin: 75, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.58, IGV: 7.16, FDTX: 1.21, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 1.2, FWD: 1.12, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'CrowdStrike appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 2.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, avgWeight: 4.98, proScore: 1.17, coverage: 0.235,
      price: 390.49, weeklyPrices: [372.97, 368.57, 373.02, 384.28, 390.49], weeklyChange: 4.7, dayChange: 1.62, sortRank: 0, periodReturns: { '1M': -11.5, 'YTD': -19.3, '6M': -17.4, '1Y': -21.7 },
      priceHistory: { '1D': [384.28, 385.92, 386.73, 389.02, 389.44, 389.43, 389.16, 387.76, 388.35, 389.63, 390.17, 390.18, 390.01, 390.82, 391.74, 390.45, 391.01, 390.55, 391.46, 390.92, 391.2, 391.2, 390.27, 390.49], '1W': [372.97, 368.57, 373.02, 384.28, 390.49], '1M': [441.31, 427.34, 428.05, 416.67, 411.74, 403.41, 397.36, 390.34, 390.74, 399.76, 378.91, 379.4, 367.34, 373.94, 365.46, 352.83, 372.97, 368.57, 373.02, 384.28, 390.49], 'YTD': [483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 384.47, 398.55, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 417.42, 412.67, 427.34, 397.36, 378.91, 352.83, 390.49], '6M': [472.94, 479.28, 459.86, 470.28, 423.37, 413.6, 396.86, 389, 403.93, 405.76, 399.41, 372.74, 370.17, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 417.42, 412.67, 427.34, 397.36, 378.91, 352.83, 390.49], '1Y': [498.84, 503.32, 510.05, 513.71, 524.11, 522.04, 522.48, 504.24, 509.64, 495, 509.9, 517.93, 511.46, 517.35, 510.96, 513.58, 520.56, 525.76, 497.1, 503.29, 478.43, 492.01, 483.16, 478.53, 485.92, 487.1, 472.85, 477.18, 454.52, 480.58, 411.21, 413.27, 399.6, 400.6, 405.2, 404.88, 399.41, 372.74, 370.17, 374.33, 411.22, 432.92, 424.46, 413.96, 405.21, 421.06, 412.67, 427.34, 397.36, 378.91, 352.83, 390.49] },
      velocityScore: { '1D': -3.3, '1W': -5.6, '1M': -71.9, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 23.3, revenueGrowth: 18, eps: 16.79, grossMargin: 68, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.07, FDTX: 2.93, GTEK: false, ARKK: false, MARS: false, FRWD: 2.84, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 6.09, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks', easyScore: 4, avgWeight: 4.69, proScore: 1.1, coverage: 0.235,
      price: 348.06, weeklyPrices: [304.20, 332.00, 341.02, 352.04, 348.06], weeklyChange: 14.42, dayChange: -1.13, sortRank: 0, periodReturns: { '1M': 17.1, 'YTD': 89, '6M': 94, '1Y': 72.5 },
      priceHistory: { '1D': [352.04, 350.15, 356.05, 355.4, 354.21, 352.52, 350.46, 349.01, 350.6, 347.93, 349.53, 348.35, 351.28, 350.33, 350.13, 349.03, 350.84, 352.42, 352.64, 352.4, 350.85, 350.21, 348.55, 348.06], '1W': [304.2, 332, 341.02, 352.04, 348.06], '1M': [297.18, 280.43, 279.25, 272.05, 266.33, 260.52, 263.22, 279.53, 279.62, 284.54, 282.13, 287.78, 286.4, 290.92, 285.26, 293.09, 304.2, 332, 341.02, 352.04, 348.06], 'YTD': [184.2, 190.8, 187.73, 180.18, 176.97, 159.32, 166.95, 144.14, 150.15, 165.1, 167.45, 164.05, 154.35, 169.87, 161.59, 174.96, 180.99, 183.98, 215.6, 240.13, 248.47, 280.43, 263.22, 282.13, 293.09, 348.06], '6M': [179.37, 189.02, 187.66, 184.22, 175.42, 166, 163.5, 141.67, 156.09, 165.58, 169.19, 157.21, 160.32, 169.87, 161.59, 174.96, 180.99, 183.98, 215.6, 240.13, 248.47, 280.43, 263.22, 282.13, 293.09, 348.06], '1Y': [201.82, 187.39, 195.78, 203.27, 172.88, 167.06, 173.55, 183.32, 191.02, 194.46, 196.29, 208.19, 202.37, 207.19, 208.55, 207.89, 215.02, 218.27, 211.37, 204.77, 185.07, 190.13, 198.84, 191.69, 186.88, 186.85, 182.12, 188.88, 184.06, 183.5, 166.24, 165.51, 152.35, 144.84, 158.56, 164.93, 169.19, 157.21, 160.32, 173.78, 164.11, 181.2, 181.54, 183.68, 227.79, 246.66, 248.47, 280.43, 263.22, 282.13, 293.09, 348.06] },
      velocityScore: { '1D': 4.8, '1W': 12.2, '1M': -50, '6M': null }, isNew: false,
      marketCap: '$284B', pe: 300.1, revenueGrowth: 31, eps: 1.16, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 3, IGV: 10.39, FDTX: 4.15, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.21, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 4, avgWeight: 4.4, proScore: 1.04, coverage: 0.235,
      price: 820.16, weeklyPrices: [899.90, 968.53, 965.00, 915.19, 820.16], weeklyChange: -8.86, dayChange: -10.38, sortRank: 0, periodReturns: { '1M': -11.5, 'YTD': 197.8, '6M': 185.2, '1Y': 448.8 },
      priceHistory: { '1D': [915.19, 909.45, 916.1, 893.2, 872.63, 855.79, 850.53, 850.92, 854.62, 845.19, 836.25, 827.6, 824.59, 820.61, 816.69, 803.4, 799.74, 796.72, 807.09, 815.72, 812.23, 807.8, 815, 820.16], '1W': [899.9, 968.53, 965, 915.19, 820.16], '1M': [926.61, 940.69, 925.99, 847.47, 876.77, 846.01, 815.99, 868.09, 931.04, 1018.8, 1066.07, 1070.23, 1094.04, 1038.59, 993.25, 1025.36, 899.9, 968.53, 965, 915.19, 820.16], 'YTD': [275.39, 284.47, 320.32, 346.1, 407.69, 429.32, 425.99, 407.4, 379.52, 374.33, 398.78, 404.02, 362.43, 468.72, 533.44, 559.9, 579.03, 771.01, 808.8, 733.35, 870.66, 940.69, 815.99, 1066.07, 1025.36, 820.16], '6M': [287.54, 304.01, 326.23, 358.29, 432.95, 425, 415.94, 396.02, 357.62, 384.29, 421.09, 424.96, 391.76, 468.72, 533.44, 559.9, 579.03, 771.01, 808.8, 733.35, 870.66, 940.69, 815.99, 1066.07, 1025.36, 820.16], '1Y': [149.44, 147.18, 149.07, 150.89, 154.81, 150.45, 155.73, 154.6, 172.38, 188.16, 195.99, 221.23, 217.51, 252.79, 214.38, 225.4, 226.41, 268.34, 278.47, 262.56, 240.5, 276.69, 278.79, 287.64, 296.36, 281.3, 289.83, 321.48, 325.99, 371.76, 444.45, 396.23, 424.14, 421.85, 375.01, 385.97, 421.09, 424.96, 391.76, 496.3, 519.6, 579.88, 643.3, 786.42, 817.35, 751.07, 870.66, 940.69, 815.99, 1066.07, 1025.36, 820.16] },
      velocityScore: { '1D': -3.7, '1W': -29.3, '1M': -64.5, '6M': null }, isNew: false,
      marketCap: '$184B', pe: 78, revenueGrowth: 44, eps: 10.52, grossMargin: 42, dividendYield: null,
      etfPresence: { PTF: 3.55, WCLD: false, IGV: false, FDTX: 4.14, GTEK: false, ARKK: false, MARS: false, FRWD: 7.94, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.97, XMMO: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 4, avgWeight: 3.77, proScore: 0.89, coverage: 0.235,
      price: 1745, weeklyPrices: [2090.71, 2050.39, 2273.73, 2032.22, 1745.00], weeklyChange: -16.54, dayChange: -14.13, sortRank: 0, periodReturns: { '1M': 1.7, 'YTD': 635.1, '6M': 534, '1Y': 3660 },
      priceHistory: { '1D': [2032.22, 1980, 2008.37, 1940.23, 1885.15, 1833, 1796.4, 1807.78, 1825.02, 1804.86, 1801.49, 1763.98, 1762, 1765.28, 1757.56, 1721.18, 1715.34, 1723.69, 1733.05, 1746.59, 1723.48, 1723.39, 1721.69, 1745], '1W': [2090.71, 2050.39, 2273.73, 2032.22, 1745], '1M': [1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 1745], 'YTD': [237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.94, 1831.5, 1643.23, 1958.8, 2335, 1745], '6M': [275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 565.41, 618.89, 720.17, 702.48, 635.34, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.94, 1831.5, 1643.23, 1958.8, 2335, 1745], '1Y': [46.41, 46.09, 42.19, 42.48, 41.33, 44.34, 46.68, 45.5, 50.87, 68.55, 86.13, 102.21, 97.12, 128.41, 116.91, 140.16, 167.05, 195.82, 207.69, 243.57, 195.96, 223.28, 228.47, 206.18, 237.61, 244.25, 274.08, 389.27, 453.12, 481.43, 695.51, 541.64, 600.4, 632.38, 599.06, 655.43, 720.17, 702.48, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1447.23, 1392.56, 1589.94, 1831.5, 1643.23, 1958.8, 2335, 1745] },
      velocityScore: { '1D': -22.6, '1W': -16.8, '1M': -65.4, '6M': null }, isNew: false,
      marketCap: '$258B', pe: 59.6, revenueGrowth: 251, eps: 29.26, grossMargin: 56, dividendYield: null,
      etfPresence: { PTF: 5.38, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.51, CBSE: false, FCUS: 5.39, WGMI: false, CNEQ: false, SGRT: false, SPMO: 2.82, XMMO: false },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'KLAC', name: 'KLA Corp', easyScore: 4, avgWeight: 2.43, proScore: 0.57, coverage: 0.235,
      price: 235.55, weeklyPrices: [248.64, 278.39, 301.71, 266.19, 235.55], weeklyChange: -5.26, dayChange: -11.51, sortRank: 0, periodReturns: { '1M': 15.2, 'YTD': 93.9, '6M': 84.8, '1Y': 154.8 },
      priceHistory: { '1D': [266.19, 258.42, 257.76, 252.18, 245.76, 244.75, 242.39, 241.73, 241.51, 239.63, 237.83, 234.45, 233.71, 232.21, 230.75, 229.71, 229.3, 229.95, 229.57, 230.79, 229.33, 231.13, 232.07, 235.55], '1W': [248.64, 278.39, 301.71, 266.19, 235.55], '1M': [204.52, 212.51, 213.11, 192.92, 210.81, 213.94, 213.56, 241.16, 254.54, 256.42, 238.73, 259.56, 269.16, 244.49, 240.48, 258.8, 248.64, 278.39, 301.71, 266.19, 235.55], 'YTD': [121.51, 132.46, 154.5, 151.28, 142.79, 144.29, 146.41, 148.77, 153.49, 142.91, 143.82, 151.14, 138.26, 154.88, 179.59, 178.54, 180.9, 173.29, 181.13, 174.06, 195.72, 212.51, 213.56, 238.73, 258.8, 235.55], '6M': [127.45, 140, 156.78, 154.3, 141.04, 144.02, 147.02, 150.66, 144.13, 145.29, 148.13, 156.62, 147.24, 154.88, 179.59, 178.54, 180.9, 173.29, 181.13, 174.06, 195.72, 212.51, 213.56, 238.73, 258.8, 235.55], '1Y': [92.46, 92.46, 93.11, 90.21, 88.66, 91.48, 95.54, 87.24, 89.4, 90.51, 96.4, 104.48, 106.43, 110.15, 98.28, 110.67, 115.9, 121.44, 120.64, 116.17, 110.25, 117.55, 121.45, 119.39, 124.57, 126.04, 135.24, 142.82, 148.62, 161.63, 135.55, 143.08, 148.03, 154.67, 147.59, 146.5, 148.13, 156.62, 147.24, 167.23, 174.81, 181.21, 181.62, 181.63, 184.97, 182.95, 195.72, 212.51, 213.56, 238.73, 258.8, 235.55] },
      velocityScore: { '1D': null, '1W': 21.3, '1M': null, '6M': null }, isNew: true,
      marketCap: '$308B', pe: 66.5, revenueGrowth: 12, eps: 3.54, grossMargin: 61, dividendYield: 0.35,
      etfPresence: { PTF: 4.28, WCLD: false, IGV: false, FDTX: false, GTEK: 1.91, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.63, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.91, XMMO: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC-CL A', easyScore: 4, avgWeight: 2.38, proScore: 0.56, coverage: 0.235,
      price: 359.91, weeklyPrices: [337.39, 353.65, 357.37, 361.21, 359.91], weeklyChange: 6.67, dayChange: -0.36, sortRank: 0, periodReturns: { '1M': -0.5, 'YTD': 15, '6M': 14.2, '1Y': 100.5 },
      priceHistory: { '1D': [361.21, 361.64, 362.04, 362.42, 363.37, 360.86, 358.7, 357.19, 355.77, 355.24, 355.97, 355.23, 353.87, 354.67, 355.05, 356.97, 357, 358.29, 358.35, 357.8, 358.97, 358.9, 359.34, 359.91], '1W': [337.39, 353.65, 357.37, 361.21, 359.91], '1M': [361.85, 358.99, 372.19, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68, 369.35, 363.79, 368.03, 349.68, 346.13, 345.29, 343.71, 337.39, 353.65, 357.37, 361.21, 359.91], 'YTD': [313, 325.44, 332.78, 327.93, 338, 322.86, 305.72, 311.49, 306.52, 306.36, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 388.43, 387.35, 387.66, 388.83, 358.99, 356.38, 363.79, 343.71, 359.91], '6M': [315.15, 328.57, 330, 333.26, 343.69, 324.32, 302.02, 310.9, 303.58, 307.04, 310.92, 290.44, 287.56, 305.46, 332.91, 332.29, 349.78, 388.43, 387.35, 387.66, 388.83, 358.99, 356.38, 363.79, 343.71, 359.91], '1Y': [179.53, 180.19, 185.06, 193.18, 189.13, 201.42, 202.94, 199.75, 211.64, 235, 240.8, 254.72, 246.54, 245.35, 236.57, 253.3, 253.08, 281.48, 284.75, 278.57, 289.45, 320.18, 321.27, 309.29, 307.16, 313.56, 316.54, 331.86, 322, 334.55, 339.71, 318.58, 303.33, 312.9, 303.13, 308.7, 310.92, 290.44, 287.56, 317.32, 337.12, 339.32, 349.94, 398.04, 402.62, 388.91, 388.83, 358.99, 356.38, 363.79, 343.71, 359.91] },
      velocityScore: { '1D': 1.8, '1W': -3.4, '1M': -81.3, '6M': null }, isNew: false,
      marketCap: '$4.4T', pe: 27.5, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 0.49, MARS: false, FRWD: 3.24, BCTK: false, FWD: 1.55, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 4.24, XMMO: false },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 3, avgWeight: 5.53, proScore: 0.98, coverage: 0.176,
      price: 393.45, weeklyPrices: [379.71, 411.84, 420.60, 425.30, 393.45], weeklyChange: 3.62, dayChange: -7.49, sortRank: 0, periodReturns: { '1M': -7.1, 'YTD': -12.5, '6M': -10.2, '1Y': 24.8 },
      priceHistory: { '1D': [425.3, 414, 410.96, 407.6, 398.73, 396.3, 396.36, 396.93, 399.7, 397.32, 394.27, 391.33, 392.21, 390.9, 391.03, 390.69, 392.55, 393.69, 393, 391.45, 391.14, 391.21, 391.1, 393.45], '1W': [379.71, 411.84, 420.6, 425.3, 393.45], '1M': [423.74, 423.7, 418.45, 391, 408.95, 396.68, 381.59, 399.15, 406.43, 411.15, 396.38, 400.49, 405.05, 381.61, 375.53, 375.12, 379.71, 411.84, 420.6, 425.3, 393.45], 'YTD': [449.72, 435.8, 438.57, 449.06, 430.41, 411.11, 417.44, 399.83, 403.32, 398.68, 395.56, 380.85, 355.28, 346.65, 364.2, 386.42, 376.02, 389.37, 433.45, 404.11, 440.36, 423.7, 381.59, 396.38, 375.12, 393.45], '6M': [438.07, 445.01, 437.5, 435.2, 421.81, 417.32, 410.63, 409.38, 392.43, 399.24, 399.27, 383.03, 371.75, 346.65, 364.2, 386.42, 376.02, 389.37, 433.45, 404.11, 440.36, 423.7, 381.59, 396.38, 375.12, 393.45], '1Y': [315.35, 313.51, 329.65, 316.06, 302.63, 329.65, 335.58, 320.11, 345.98, 350.84, 395.94, 426.07, 440.4, 429.83, 413.49, 439.31, 448.98, 440.1, 445.91, 401.99, 395.23, 430.17, 455, 458.96, 481.2, 459.64, 451.67, 448.96, 419.25, 430.9, 421.96, 425.21, 411.32, 417.4, 405.94, 407.82, 399.27, 383.03, 371.75, 343.25, 391.95, 387.51, 372.8, 398.73, 445.27, 417.26, 440.36, 423.7, 381.59, 396.38, 375.12, 393.45] },
      velocityScore: { '1D': 1, '1W': 6.5, '1M': -77.9, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 354.5, revenueGrowth: 16, eps: 1.11, grossMargin: 19, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 10.18, MARS: false, FRWD: false, BCTK: 3.14, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.26, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
    {
      ticker: 'DELL', name: 'DELL', easyScore: 3, avgWeight: 4.39, proScore: 0.77, coverage: 0.176,
      price: 394.32, weeklyPrices: [399.49, 414.61, 431.46, 425.25, 394.32], weeklyChange: -1.29, dayChange: -7.27, sortRank: 0, periodReturns: { '1M': -9.4, 'YTD': 213.3, '6M': 208.5, '1Y': 214.9 },
      priceHistory: { '1D': [425.25, 407, 421.55, 415.03, 405.83, 401.25, 397.25, 395.53, 397.2, 394.04, 393.77, 392.3, 393.35, 390.1, 389.87, 388.89, 388.85, 389.7, 390.5, 391.02, 388.8, 389.28, 389.17, 394.32], '1W': [399.49, 414.61, 431.46, 425.25, 394.32], '1M': [435.31, 421.08, 422.05, 394.39, 400.77, 381.78, 369.83, 391.45, 395.57, 409.07, 419.32, 409.5, 418.71, 427.78, 434.06, 409.45, 399.49, 414.61, 431.46, 425.25, 394.32], 'YTD': [125.88, 118.5, 119.66, 115.43, 114.44, 121.05, 117.49, 119.14, 153.55, 146.51, 156.54, 164.59, 164.66, 177.69, 184.51, 212.36, 205.93, 216.32, 238.94, 235.26, 305.32, 421.08, 369.83, 419.32, 409.45, 394.32], '6M': [127.8, 120.62, 120.53, 115.93, 119.16, 120.91, 116.09, 119.78, 145.18, 143.8, 153.01, 176.91, 164.13, 177.69, 184.51, 212.36, 205.93, 216.32, 238.94, 235.26, 305.32, 421.08, 369.83, 419.32, 409.45, 394.32], '1Y': [125.22, 126.83, 131.24, 131.22, 127.32, 137.61, 138.86, 127.83, 134.05, 124.83, 125.04, 131.94, 130.76, 140.74, 150.57, 149.59, 154.23, 161.01, 149.18, 133.94, 117.4, 133.35, 138.91, 129.98, 126.42, 127.46, 124.01, 120.47, 111.07, 114.66, 117.15, 126.01, 116.78, 123.48, 147.1, 147.37, 153.01, 176.91, 164.13, 185.47, 177.28, 214.65, 205.66, 238.8, 243.87, 242.93, 305.32, 421.08, 369.83, 419.32, 409.45, 394.32] },
      velocityScore: { '1D': -4.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$255B', pe: 31.4, revenueGrowth: 88, eps: 12.54, grossMargin: 19, dividendYield: 0.59,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: 2.1, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: 4.48, WGMI: false, CNEQ: false, SGRT: 6.58, SPMO: false, XMMO: false },
      tonyNote: 'DELL appears in 3 of 17 Broad Tech ETFs (18% coverage) with average weight 4.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 3, avgWeight: 4.27, proScore: 0.75, coverage: 0.176,
      price: 129.3, weeklyPrices: [112.93, 115.70, 116.67, 125.73, 129.30], weeklyChange: 14.5, dayChange: 2.84, sortRank: 0, periodReturns: { '1M': -15, 'YTD': -27.3, '6M': -23, '1Y': -3.8 },
      priceHistory: { '1D': [125.73, 132.75, 132.11, 131.27, 131.08, 129.61, 129.42, 128.85, 129.45, 128.54, 129.73, 129.9, 130.32, 131.28, 131.55, 130.99, 131.31, 130.98, 130.89, 130.37, 130.15, 129.54, 129.6, 129.3], '1W': [112.93, 115.7, 116.67, 125.73, 129.3], '1M': [152.17, 142.2, 141.7, 135.53, 136.47, 132.07, 130.21, 131.08, 127.99, 134.71, 130.63, 128.47, 119.5, 116.7, 113.5, 107.27, 112.93, 115.7, 116.67, 125.73, 129.3], 'YTD': [177.75, 176.86, 177.07, 169.6, 146.59, 135.9, 131.41, 130.6, 145.17, 156.43, 152.72, 160.84, 137.55, 150.07, 135.7, 145.97, 141.18, 135.91, 136, 135.26, 132.51, 142.2, 130.21, 130.63, 107.27, 129.3], '6M': [167.86, 177.49, 170.96, 167.47, 147.76, 142.91, 133.02, 128.84, 147.22, 151.14, 155.08, 154.78, 146.28, 150.07, 135.7, 145.97, 141.18, 135.91, 136, 135.26, 132.51, 142.2, 130.21, 130.63, 107.27, 129.3], '1Y': [134.36, 142.1, 153.52, 158.8, 154.27, 186.96, 181.02, 156.18, 158.12, 153.11, 171.43, 182.39, 177.57, 173.07, 175.44, 178.15, 180.48, 194.55, 175.05, 172.14, 155.74, 168.45, 181.76, 183.57, 193.38, 184.18, 174.04, 179.41, 168.53, 165.7, 157.88, 139.51, 135.38, 134.19, 153.19, 151.6, 155.08, 154.78, 146.28, 140.76, 142.15, 152.62, 137.97, 133.79, 130.05, 137.15, 132.51, 142.2, 130.21, 130.63, 107.27, 129.3] },
      velocityScore: { '1D': -2.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$310B', pe: 145.3, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.05, FDTX: 2, GTEK: false, ARKK: 2.77, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 3, avgWeight: 4.82, proScore: 2.89, coverage: 0.6,
      price: 668.31, weeklyPrices: [687.87, 714.45, 720.04, 691.40, 668.31], weeklyChange: -2.84, dayChange: -3.34, sortRank: 0, periodReturns: { '1M': -5.3, 'YTD': 58.3, '6M': 52, '1Y': 72.9 },
      priceHistory: { '1D': [691.4, 690.41, 694.88, 692.69, 685.96, 682.16, 677.82, 674.99, 677.4, 668.7, 663.86, 657.46, 660.66, 657.55, 655.98, 651.23, 656.81, 659.54, 662.02, 663.36, 660.23, 659.67, 664.13, 668.31], '1W': [687.87, 714.45, 720.04, 691.4, 668.31], '1M': [706.06, 715.67, 719.17, 695.11, 693.81, 691.95, 650.92, 683.29, 707.74, 724.35, 714.85, 702.25, 740.14, 702.29, 701.88, 718.59, 687.87, 714.45, 720.04, 691.4, 668.31], 'YTD': [422.06, 413.17, 447.64, 468.76, 474.63, 508.11, 524.08, 549.11, 572.66, 568.04, 574.02, 567.45, 533.78, 555.57, 594.4, 605.89, 630.94, 771.61, 765.81, 714.13, 733.62, 715.67, 650.92, 714.85, 718.59, 668.31], '6M': [439.68, 422.57, 466.75, 470.77, 477.77, 514.56, 525.13, 568.21, 566, 564.05, 571.64, 578.44, 549.02, 555.57, 594.4, 605.89, 630.94, 771.61, 765.81, 714.13, 733.62, 715.67, 650.92, 714.85, 718.59, 668.31], '1Y': [386.51, 383.78, 403.31, 421.68, 395.17, 386.15, 377.51, 378.21, 385.96, 372.5, 382.53, 388.58, 405.44, 421.17, 417.61, 433.85, 427.36, 453.83, 442.9, 426.93, 429.78, 464.88, 460.64, 438.11, 426.66, 431.03, 435.82, 432.66, 463.49, 479.27, 488.6, 510.64, 519.31, 562.77, 568.38, 567.71, 571.64, 578.44, 549.02, 576.24, 591.82, 613.78, 628.6, 785.24, 773.72, 709.93, 733.62, 715.67, 650.92, 714.85, 718.59, 668.31] },
      velocityScore: { '1D': -1, '1W': 1, '1M': -18.4, '6M': null }, isNew: false,
      marketCap: '$100B', pe: 92.1, revenueGrowth: 26, eps: 7.26, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.88, VOLT: 5.23, PBD: false, PBW: false, IVEP: 4.34 },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 3, avgWeight: 4.58, proScore: 2.75, coverage: 0.6,
      price: 266.94, weeklyPrices: [310.64, 315.65, 333.04, 318.06, 266.94], weeklyChange: -14.07, dayChange: -16.07, sortRank: 0, periodReturns: { '1M': -0.8, 'YTD': 57.4, '6M': 54.5, '1Y': 166.7 },
      priceHistory: { '1D': [318.06, 309.99, 303.16, 296.83, 295.59, 292.23, 287.72, 282.79, 283.62, 281.01, 280.26, 279.09, 275.44, 273.3, 271, 270, 267.98, 269.64, 270.33, 269.66, 268.67, 267.18, 266.64, 266.94], '1W': [310.64, 315.65, 333.04, 318.06, 266.94], '1M': [269.22, 280.09, 276.54, 262.56, 279.13, 276.04, 276.95, 296.55, 293.87, 302.15, 299.84, 296.39, 304.33, 288.64, 294.15, 310.32, 310.64, 315.65, 333.04, 318.06, 266.94], 'YTD': [169.63, 180.24, 196.61, 196.5, 201.19, 220.78, 232.84, 231.83, 222.45, 191.81, 205.11, 214.98, 197.83, 210.32, 237.34, 257.41, 249.82, 297.17, 298.22, 249.71, 280.13, 280.09, 276.95, 299.84, 310.32, 266.94], '6M': [172.78, 187.43, 200.11, 205.17, 215.59, 229.32, 235.3, 234.4, 213.65, 198.5, 209.52, 222.04, 197.98, 210.32, 237.34, 257.41, 249.82, 297.17, 298.22, 249.71, 280.13, 280.09, 276.95, 299.84, 310.32, 266.94], '1Y': [100.1, 101.14, 101.69, 119.84, 127.5, 132.58, 132.13, 128.91, 136.29, 143.88, 141.73, 142.08, 142.84, 138.97, 137.73, 146.11, 154.9, 150.62, 160.16, 146.49, 134.36, 154.03, 166, 173.12, 175.69, 174.34, 175.77, 188, 201.17, 210.66, 217.25, 237.19, 221.19, 234.67, 213.8, 200.88, 209.52, 222.04, 197.98, 228.29, 236.04, 262.68, 258.26, 286.89, 266.92, 254.75, 280.13, 280.09, 276.95, 299.84, 310.32, 266.94] },
      velocityScore: { '1D': -1.4, '1W': 24.4, '1M': -25.7, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 64.6, revenueGrowth: 17, eps: 4.13, grossMargin: 39, dividendYield: null,
      etfPresence: { POW: 3.87, VOLT: 8.28, PBD: false, PBW: 1.6, IVEP: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 3, avgWeight: 4.5, proScore: 2.7, coverage: 0.6,
      price: 398.52, weeklyPrices: [402.68, 408.26, 426.12, 412.31, 398.52], weeklyChange: -1.03, dayChange: -3.34, sortRank: 0, periodReturns: { '1M': -4.6, 'YTD': 25.1, '6M': 21.8, '1Y': 10 },
      priceHistory: { '1D': [412.31, 409.82, 409.77, 412.8, 406.1, 402.74, 399.25, 397.42, 399.34, 396.4, 395.38, 394.72, 395.42, 394.01, 393.81, 393.14, 394.95, 395.5, 396.67, 397.33, 395.84, 395.13, 397.33, 398.52], '1W': [402.68, 408.26, 426.12, 412.31, 398.52], '1M': [417.62, 421.21, 418.61, 395.94, 403.14, 401.72, 375.46, 393.64, 391.39, 407.06, 409.64, 421.77, 435.78, 405.28, 404.59, 419.87, 402.68, 408.26, 426.12, 412.31, 398.52], 'YTD': [318.51, 320.58, 333.46, 331.22, 351.42, 373.82, 389.25, 362.05, 377.4, 353.87, 361.04, 359.74, 343.53, 368.85, 401.9, 409.7, 413.07, 410.86, 401.53, 371.88, 406.37, 421.21, 375.46, 409.64, 419.87, 398.52], '6M': [327.31, 324.51, 343.75, 332.28, 359.44, 377.06, 391.49, 374.56, 355.56, 361.06, 363.95, 374.1, 357.67, 368.85, 401.9, 409.7, 413.07, 410.86, 401.53, 371.88, 406.37, 421.21, 375.46, 409.64, 419.87, 398.52], '1Y': [362.22, 360.62, 378.62, 392.17, 381.29, 362.84, 355.1, 345.38, 355.34, 349.03, 365.9, 374.5, 365.58, 373.46, 369.08, 373.3, 372.4, 383.09, 377.4, 354.07, 328.19, 345.89, 337.66, 331.98, 317.8, 321.45, 322.26, 329.1, 337.59, 341.19, 362.53, 377.47, 380.38, 373.53, 354.46, 355.79, 363.95, 374.1, 357.67, 385.58, 395.06, 413.87, 410.77, 421.39, 406.94, 379.69, 406.37, 421.21, 375.46, 409.64, 419.87, 398.52] },
      velocityScore: { '1D': 0, '1W': 4.2, '1M': -18.4, '6M': null }, isNew: false,
      marketCap: '$155B', pe: 39, revenueGrowth: 17, eps: 10.23, grossMargin: 37, dividendYield: 1.07,
      etfPresence: { POW: 4.04, VOLT: 5.35, PBD: false, PBW: false, IVEP: 4.11 },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 3, avgWeight: 4.22, proScore: 2.53, coverage: 0.6,
      price: 1113.11, weeklyPrices: [1045.17, 1102.51, 1174.86, 1134.35, 1113.11], weeklyChange: 6.5, dayChange: -1.87, sortRank: 0, periodReturns: { '1M': 14.8, 'YTD': 70.3, '6M': 63.8, '1Y': 115.3 },
      priceHistory: { '1D': [1134.35, 1117.89, 1130.42, 1134.87, 1131.27, 1121.9, 1113.72, 1106.74, 1115.13, 1107.52, 1103, 1093.01, 1095.87, 1098.99, 1102.41, 1093.57, 1096.15, 1100.19, 1104.98, 1107.52, 1106.1, 1100.65, 1108.16, 1113.11], '1W': [1045.17, 1102.51, 1174.86, 1134.35, 1113.11], '1M': [969.67, 959.36, 963.33, 933.61, 933.85, 920.15, 867.09, 906.79, 940.66, 979.07, 1048.86, 1109.73, 1127.59, 1034.98, 1057.65, 1085.47, 1045.17, 1102.51, 1174.86, 1134.35, 1113.11], 'YTD': [653.57, 628.4, 642.23, 657.78, 726.37, 779.35, 802.13, 831.7, 881.18, 830.1, 827.37, 882.64, 817.35, 910.75, 987.5, 991.3, 1088.93, 1095.21, 1071.98, 1011.8, 1031.89, 959.36, 867.09, 1048.86, 1085.47, 1113.11], '6M': [679.55, 622.5, 681.55, 665.99, 754.97, 801.54, 819.15, 879.73, 842, 839.2, 844.05, 909.41, 872.9, 910.75, 987.5, 991.3, 1088.93, 1095.21, 1071.98, 1011.8, 1031.89, 959.36, 867.09, 1048.86, 1085.47, 1113.11], '1Y': [517.04, 539.16, 574.6, 644.59, 656.5, 649.09, 625.27, 606, 633.69, 582.08, 625.55, 624.17, 605.17, 594.99, 604.56, 600, 595.15, 574.07, 550.17, 558.17, 558.03, 599.77, 631.32, 671.71, 658.28, 663.46, 680.86, 639.77, 684.86, 692.7, 780.25, 790.79, 817.55, 876.01, 841.27, 847.65, 844.05, 909.41, 872.9, 936.07, 985.92, 1127.56, 1063.11, 1118.96, 1062.57, 1024.52, 1031.89, 959.36, 867.09, 1048.86, 1085.47, 1113.11] },
      velocityScore: { '1D': -0.4, '1W': 9.5, '1M': -0.8, '6M': null }, isNew: false,
      marketCap: '$299B', pe: 32.5, revenueGrowth: 16, eps: 34.26, grossMargin: 20, dividendYield: 0.18,
      etfPresence: { POW: 3.48, VOLT: 4.57, PBD: false, PBW: false, IVEP: 4.61 },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy Corp', easyScore: 3, avgWeight: 3.71, proScore: 2.23, coverage: 0.6,
      price: 270.89, weeklyPrices: [252.02, 275.01, 302.70, 289.50, 270.89], weeklyChange: 7.49, dayChange: -6.43, sortRank: 0, periodReturns: { '1M': -10.6, 'YTD': 211.8, '6M': 174.5, '1Y': 1017.5 },
      priceHistory: { '1D': [289.5, 293.7, 299.09, 299.48, 288.93, 281.38, 273.3, 271, 271.06, 268.02, 266.67, 263.28, 263.67, 261.78, 260.79, 258.51, 259.53, 260.95, 264.51, 266.49, 263.61, 264.02, 266.35, 270.89], '1W': [252.02, 275.01, 302.7, 289.5, 270.89], '1M': [302.85, 287.32, 291.37, 263.61, 253.57, 259.61, 234.23, 248.88, 260.22, 274.5, 284.99, 328.91, 345.85, 321.98, 326.19, 309.18, 252.02, 275.01, 302.7, 289.5, 270.89], 'YTD': [86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 160.28, 166, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 261.34, 293.8, 287.32, 234.23, 284.99, 309.18, 270.89], '6M': [98.69, 134.07, 149.5, 139.62, 156.13, 155.17, 145.32, 166.2, 153.02, 154, 160.05, 145.88, 135.49, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 261.34, 293.8, 287.32, 234.23, 284.99, 309.18, 270.89], '1Y': [24.24, 25.4, 24.99, 34.34, 36.72, 36.8, 45.11, 44.83, 54.8, 57.07, 67.26, 84.93, 70.32, 90.29, 86.87, 111.5, 101.42, 127.85, 136.86, 103.55, 93.38, 109.24, 119.18, 94.98, 88.82, 88.41, 103.87, 136.87, 151.75, 152.31, 168.89, 148.7, 157.27, 174.77, 164.78, 159.21, 160.05, 145.88, 135.49, 146.78, 213.84, 229.75, 287.97, 285.47, 289.76, 282.31, 293.8, 287.32, 234.23, 284.99, 309.18, 270.89] },
      velocityScore: { '1D': -0.9, '1W': -25.4, '1M': -0.9, '6M': null }, isNew: false,
      marketCap: '$77B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: 1.66, VOLT: 4.07, PBD: false, PBW: false, IVEP: 5.4 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 3, avgWeight: 3.54, proScore: 2.12, coverage: 0.6,
      price: 88.34, weeklyPrices: [88.56, 88.66, 87.77, 86.37, 88.34], weeklyChange: -0.25, dayChange: 2.28, sortRank: 0, periodReturns: { '1M': 3.1, 'YTD': 10, '6M': 9.2, '1Y': 19.6 },
      priceHistory: { '1D': [86.37, 86.7, 87.4, 87.15, 87.38, 87.18, 87.46, 87.4, 87.2, 87.15, 87.29, 87.32, 87.17, 87.13, 87.04, 87.3, 87.49, 87.35, 87.47, 87.45, 87.38, 87.88, 88.28, 88.34], '1W': [88.56, 88.66, 87.77, 86.37, 88.34], '1M': [85.68, 84.58, 85.68, 85.84, 84.01, 84.83, 85.12, 84.84, 85.99, 86.12, 85.73, 86.75, 86.08, 86.43, 87.62, 87.7, 88.56, 88.66, 87.77, 86.37, 88.34], 'YTD': [80.28, 79.49, 82.19, 84.81, 87.9, 89.47, 93.8, 94.06, 92.71, 92.01, 92.82, 90.23, 92.05, 93.67, 91.31, 90.6, 96.51, 96.28, 94.59, 90.06, 87.65, 84.58, 85.12, 85.73, 87.7, 88.34], '6M': [80.93, 79.89, 83.63, 85.47, 86.33, 89.48, 92.71, 95.68, 92.59, 91.54, 92.53, 91.62, 92.88, 93.67, 91.31, 90.6, 96.51, 96.28, 94.59, 90.06, 87.65, 84.58, 85.12, 85.73, 87.7, 88.34], '1Y': [73.88, 74.4, 75.95, 71.85, 70.4, 72.41, 72.24, 76.08, 72.09, 70.9, 71.64, 71.08, 75.85, 80.06, 83.35, 84.53, 83.25, 81.64, 82, 83.99, 84.3, 86.29, 83.13, 81.65, 79.54, 80.27, 81.32, 81.12, 83.51, 87.15, 88.82, 90.83, 91.22, 95.11, 92.6, 91.66, 92.53, 91.62, 92.88, 94.17, 91.24, 90, 94.17, 95.39, 94.85, 88.27, 87.65, 84.58, 85.12, 85.73, 87.7, 88.34] },
      velocityScore: { '1D': 1.4, '1W': 1, '1M': 1.9, '6M': null }, isNew: false,
      marketCap: '$184B', pe: 22.4, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: null,
      etfPresence: { POW: 2.01, VOLT: 4.92, PBD: false, PBW: false, IVEP: 3.69 },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 3, avgWeight: 3.24, proScore: 1.94, coverage: 0.6,
      price: 152.15, weeklyPrices: [162.92, 163.35, 169.61, 159.99, 152.15], weeklyChange: -6.61, dayChange: -4.9, sortRank: 0, periodReturns: { '1M': -12.2, 'YTD': 49.2, '6M': 42.4, '1Y': 103.1 },
      priceHistory: { '1D': [159.99, 160.4, 158.85, 159.82, 156.71, 155.66, 154.18, 153.55, 153.88, 153.72, 152.96, 151.72, 151.85, 151.16, 150.8, 150.26, 151.2, 151.59, 152.24, 152.63, 151.57, 150.75, 151.88, 152.15], '1W': [162.92, 163.35, 169.61, 159.99, 152.15], '1M': [173.39, 176.39, 173.88, 162.86, 163.81, 163.8, 156.79, 164.52, 165.84, 169, 170.94, 177.02, 184.34, 168.37, 167.55, 171.91, 162.92, 163.35, 169.61, 159.99, 152.15], 'YTD': [101.97, 102.72, 107.98, 110.29, 112.26, 112.64, 113.25, 114.93, 120.27, 108.13, 114.3, 121, 112.75, 118.92, 134.48, 137, 138.3, 169.41, 170.74, 158.23, 167.8, 176.39, 156.79, 170.94, 171.91, 152.15], '6M': [106.82, 105.38, 112.5, 110.58, 115.79, 114.62, 115.22, 118.22, 111.65, 109.13, 114.71, 125.61, 118.28, 118.92, 134.48, 137, 138.3, 169.41, 170.74, 158.23, 167.8, 176.39, 156.79, 170.94, 171.91, 152.15], '1Y': [74.91, 74.87, 75.91, 78.53, 89.88, 88.68, 89.8, 88.02, 92.58, 92.8, 94.78, 98.99, 97, 97.8, 95.98, 99.33, 100.62, 104.35, 109.97, 105.92, 101.52, 107.27, 107.72, 101.71, 101.54, 103.26, 106.61, 106.39, 109.9, 113.16, 119.43, 112.15, 115.65, 121.8, 113.83, 111.09, 114.71, 125.61, 118.28, 127.11, 131.38, 140.13, 137.37, 172.49, 172.91, 161.86, 167.8, 176.39, 156.79, 170.94, 171.91, 152.15] },
      velocityScore: { '1D': -3, '1W': -2, '1M': -23.6, '6M': null }, isNew: false,
      marketCap: '$25B', pe: 51.8, revenueGrowth: 54, eps: 2.94, grossMargin: 37, dividendYield: 0.53,
      etfPresence: { POW: 3.63, VOLT: 2.93, PBD: false, PBW: false, IVEP: 3.16 },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 3, avgWeight: 2.86, proScore: 1.72, coverage: 0.6,
      price: 487.1, weeklyPrices: [517.02, 514.71, 523.20, 490.12, 487.10], weeklyChange: -5.79, dayChange: -0.62, sortRank: 0, periodReturns: { '1M': 1.4, 'YTD': 9.7, '6M': 5.2, '1Y': 17.4 },
      priceHistory: { '1D': [490.12, 484.36, 480.42, 483.91, 480.37, 481.18, 479.41, 477, 479.5, 478.21, 477.23, 476.64, 477.28, 474.56, 477.14, 476.21, 477.85, 480.68, 482.45, 483.26, 482.13, 483.99, 483.4, 487.1], '1W': [517.02, 514.71, 523.2, 490.12, 487.1], '1M': [480.46, 484.91, 485.27, 476.82, 485.03, 486.47, 467.59, 469.32, 476.89, 489.73, 508.87, 523.69, 539.39, 509.96, 518.18, 536.04, 517.02, 514.71, 523.2, 490.12, 487.1], 'YTD': [444.11, 460.87, 484.11, 485.53, 487.94, 503.8, 524.12, 516.99, 516.98, 487.76, 472.64, 489.07, 472.07, 499.31, 545.62, 549.11, 544.71, 507.81, 485.98, 461.5, 484.25, 484.91, 467.59, 508.87, 536.04, 487.1], '6M': [463.03, 470.53, 489.31, 486.82, 495.59, 506.14, 524.25, 526.75, 488.49, 478.06, 471.22, 505.62, 490.74, 499.31, 545.62, 549.11, 544.71, 507.81, 485.98, 461.5, 484.25, 484.91, 467.59, 508.87, 536.04, 487.1], '1Y': [414.84, 419.24, 430.28, 442.54, 426.74, 418.65, 437.67, 427.57, 445.8, 436.04, 437.43, 441.44, 425.22, 413, 408.46, 425.71, 433.27, 469.96, 461.47, 437.65, 407.36, 431.43, 440.53, 448, 442.51, 451.39, 465.48, 472.88, 472.54, 484.14, 503.86, 503.1, 522.3, 527.9, 490.78, 477.97, 471.22, 505.62, 490.74, 527.21, 526.94, 549.75, 545.93, 502.34, 483.79, 463.32, 484.25, 484.91, 467.59, 508.87, 536.04, 487.1] },
      velocityScore: { '1D': -2.8, '1W': -2.8, '1M': -18.1, '6M': null }, isNew: false,
      marketCap: '$26B', pe: 28.8, revenueGrowth: 11, eps: 16.91, grossMargin: 36, dividendYield: 1.16,
      etfPresence: { POW: 2.76, VOLT: 3.28, PBD: false, PBW: false, IVEP: 2.54 },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'NRG', name: 'NRG Energy Inc', easyScore: 3, avgWeight: 1.33, proScore: 0.8, coverage: 0.6,
      price: 136.7, weeklyPrices: [149.36, 149.11, 146.06, 140.80, 136.70], weeklyChange: -8.48, dayChange: -2.91, sortRank: 0, periodReturns: { '1M': 2.4, 'YTD': -14.2, '6M': -17.7, '1Y': -13.7 },
      priceHistory: { '1D': [140.8, 141.74, 140.62, 140.62, 140.27, 139.16, 139.76, 139.87, 140, 137.77, 137.77, 137.26, 136.7, 136.63, 136.61, 135.62, 136, 135.25, 137.12, 137.06, 136.1, 135.98, 136.66, 136.7], '1W': [149.36, 149.11, 146.06, 140.8, 136.7], '1M': [133.51, 133.76, 133.39, 129.2, 127.71, 129.96, 120.65, 123.7, 125.47, 130.4, 132.13, 135.06, 138.91, 137.66, 142.21, 147.11, 149.36, 149.11, 146.06, 140.8, 136.7], 'YTD': [159.24, 143.53, 158.5, 149.3, 152.63, 153.32, 172.35, 176.52, 175.58, 155.42, 152.48, 151.77, 141.23, 153.06, 170.96, 149.86, 154.81, 157.43, 137.34, 123.71, 138, 133.76, 120.65, 132.13, 147.11, 136.7], '6M': [166.16, 149.27, 152.05, 149.93, 149.11, 155.72, 173.45, 184.03, 162.06, 155.15, 154.75, 151.13, 146.14, 153.06, 170.96, 149.86, 154.81, 157.43, 137.34, 123.71, 138, 133.76, 120.65, 132.13, 147.11, 136.7], '1Y': [158.39, 150.68, 151.75, 156.59, 167.63, 152.54, 153.78, 145.89, 148.66, 147.66, 164.84, 164.36, 168.57, 166.28, 160.43, 168.74, 163.81, 173.14, 170.1, 166.15, 160.46, 169.49, 163, 161.44, 156.2, 160.96, 161.59, 148.89, 148.91, 156.04, 152.18, 156.43, 171.06, 183.59, 163.54, 148.63, 154.75, 151.13, 146.14, 160.3, 168.45, 149.6, 149.01, 150.64, 131.08, 133.98, 138, 133.76, 120.65, 132.13, 147.11, 136.7] },
      velocityScore: { '1D': 0, '1W': 2.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$29B', pe: 148.6, revenueGrowth: 20, eps: 0.92, grossMargin: 16, dividendYield: 1.35,
      etfPresence: { POW: 0.51, VOLT: 1.01, PBD: false, PBW: false, IVEP: 2.47 },
      tonyNote: 'NRG Energy Inc appears in 3 of 5 Electrification ETFs (60% coverage) with average weight 1.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 2, avgWeight: 5.54, proScore: 2.22, coverage: 0.4,
      price: 246.33, weeklyPrices: [279.77, 281.09, 286.36, 264.86, 246.33], weeklyChange: -11.95, dayChange: -7, sortRank: 0, periodReturns: { '1M': -17.6, 'YTD': 131.8, '6M': 109.6, '1Y': 239.5 },
      priceHistory: { '1D': [264.86, 264.15, 262.74, 260.89, 256.86, 257.48, 254.88, 252.42, 254.21, 252.93, 251.64, 248.6, 249.5, 247.92, 247.37, 244.32, 246.88, 245.93, 248.94, 248.41, 245.27, 245.24, 245.94, 246.33], '1W': [279.77, 281.09, 286.36, 264.86, 246.33], '1M': [299.07, 299.73, 300.06, 284.87, 293.6, 283.51, 262.34, 290.5, 294.75, 303.53, 294.03, 297.2, 307.8, 291.5, 294.49, 309.2, 279.77, 281.09, 286.36, 264.86, 246.33], 'YTD': [106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 181.38, 177.5, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 261.58, 295.94, 299.73, 262.34, 294.03, 309.2, 246.33], '6M': [117.51, 121.83, 139.99, 141.15, 146.79, 187.3, 187.21, 186.39, 170.37, 176.51, 174.04, 186.82, 180.36, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 261.58, 295.94, 299.73, 262.34, 294.03, 309.2, 246.33], '1Y': [72.55, 70.87, 76.08, 82.79, 75.89, 81.28, 85.17, 83.64, 90.42, 89.41, 95.89, 99.1, 96.99, 101.35, 100.35, 110.24, 113.88, 125.9, 125, 109.4, 98.12, 107.74, 114.04, 112.36, 110.97, 111.96, 120.46, 128.85, 142.76, 147.43, 151.08, 190.09, 180.99, 183, 170.96, 171.73, 174.04, 186.82, 180.36, 218.07, 229.73, 242.77, 253.49, 320.3, 300.84, 271.05, 295.94, 299.73, 262.34, 294.03, 309.2, 246.33] },
      velocityScore: { '1D': -4.3, '1W': -21, '1M': -56, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 48.2, revenueGrowth: 7, eps: 5.11, grossMargin: 30, dividendYield: 0.14,
      etfPresence: { POW: 4.44, VOLT: 6.64, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, avgWeight: 3.49, proScore: 1.4, coverage: 0.4,
      price: 138.51, weeklyPrices: [138.69, 137.97, 136.81, 135.05, 138.51], weeklyChange: -0.13, dayChange: 2.56, sortRank: 0, periodReturns: { '1M': 9, 'YTD': 20.1, '6M': 19.6, '1Y': 33.4 },
      priceHistory: { '1D': [135.05, 135.86, 136.47, 136.28, 136.35, 136.84, 137.33, 137.41, 137.01, 137.22, 137.2, 137.53, 137.37, 137.49, 137.47, 137.73, 137.66, 137.72, 138.06, 137.77, 137.48, 137.88, 138.42, 138.51], '1W': [138.69, 137.97, 136.81, 135.05, 138.51], '1M': [127.11, 126.31, 127.79, 129.14, 126.77, 127.76, 128.53, 128.48, 129.23, 129.31, 128.27, 127.69, 130.3, 133.74, 134.96, 137, 138.69, 137.97, 136.81, 135.05, 138.51], 'YTD': [115.31, 115.93, 119.4, 116.63, 119.78, 120.8, 129.94, 132.03, 133.29, 131.86, 134.15, 127.92, 131.12, 132.92, 135.46, 131.89, 135.59, 137.04, 131.94, 128.92, 129.57, 126.31, 128.53, 128.27, 137, 138.51], '6M': [115.81, 116.91, 119.96, 118.02, 118.33, 121.1, 130.24, 132.39, 131.92, 132.31, 133.62, 128.8, 131.08, 132.92, 135.46, 131.89, 135.59, 137.04, 131.94, 128.92, 129.57, 126.31, 128.53, 128.27, 137, 138.51], '1Y': [103.86, 105.34, 107.4, 109.79, 113.58, 112.5, 112.86, 113.14, 111.78, 108.11, 109.46, 107.06, 109.14, 114.06, 117.04, 117.53, 116.18, 121.89, 119.53, 121.48, 120.9, 123.77, 117.54, 114.13, 114.49, 115.77, 114.07, 116.57, 119.22, 119.43, 120.67, 121.23, 127.27, 132.46, 133.52, 131.26, 133.62, 128.8, 131.08, 134.71, 134.39, 131.62, 134.44, 132.56, 127.95, 128.87, 129.57, 126.31, 128.53, 128.27, 137, 138.51] },
      velocityScore: { '1D': 2.2, '1W': 2.2, '1M': -27.5, '6M': null }, isNew: false,
      marketCap: '$75B', pe: 20.5, revenueGrowth: 10, eps: 6.77, grossMargin: 47, dividendYield: null,
      etfPresence: { POW: 2.65, VOLT: 4.33, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 2, avgWeight: 3.28, proScore: 1.31, coverage: 0.4,
      price: 300.53, weeklyPrices: [303.95, 306.97, 334.82, 311.42, 300.53], weeklyChange: -1.13, dayChange: -3.5, sortRank: 0, periodReturns: { '1M': -10.2, 'YTD': 85.5, '6M': 71.1, '1Y': 135.1 },
      priceHistory: { '1D': [311.42, 308.93, 311.83, 312.96, 306.73, 303.78, 303.84, 303.13, 303.4, 300.32, 300.7, 299.01, 300.75, 299.39, 298.93, 297.07, 299.58, 300.48, 301.99, 303.67, 301.08, 299.93, 301.25, 300.53], '1W': [303.95, 306.97, 334.82, 311.42, 300.53], '1M': [334.49, 331.44, 323.92, 300.51, 300.57, 289.52, 280.98, 297.88, 302.87, 311.93, 317.58, 333.05, 357.96, 318.32, 316.43, 325.57, 303.95, 306.97, 334.82, 311.42, 300.53], 'YTD': [162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 234.53, 245.42, 257.75, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.13, 322.63, 319.78, 331.44, 280.98, 317.58, 325.57, 300.53], '6M': [175.61, 163.58, 176.93, 181.23, 190.01, 202, 243.53, 253.15, 244.44, 270.06, 268.41, 270.89, 250.58, 262.3, 310.51, 312.44, 305.03, 341.02, 367.13, 322.63, 319.78, 331.44, 280.98, 317.58, 325.57, 300.53], '1Y': [127.84, 123.3, 129.06, 137.47, 141.59, 139.93, 132.52, 126.58, 134.23, 124, 134.84, 143.6, 138.62, 160.2, 169.01, 174, 183.2, 193.76, 183.02, 163.64, 159.61, 179.73, 189.02, 161.27, 159.82, 165.62, 173.95, 170.03, 175.18, 189.21, 190.15, 199.62, 243.21, 262.19, 251.28, 268.26, 268.41, 270.89, 250.58, 281.03, 301.16, 305.14, 306.18, 358.92, 369.99, 315.67, 319.78, 331.44, 280.98, 317.58, 325.57, 300.53] },
      velocityScore: { '1D': -3.7, '1W': 1.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$115B', pe: 75.3, revenueGrowth: 30, eps: 3.99, grossMargin: 37, dividendYield: null,
      etfPresence: { POW: false, VOLT: 2.42, PBD: false, PBW: false, IVEP: 4.14 },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'APH', name: 'Amphenol Corp', easyScore: 2, avgWeight: 2.86, proScore: 1.14, coverage: 0.4,
      price: 164.59, weeklyPrices: [163.72, 166.42, 176.32, 172.22, 164.59], weeklyChange: 0.53, dayChange: -4.43, sortRank: 0, periodReturns: { '1M': 10.9, 'YTD': 21.8, '6M': 17.8, '1Y': 65.5 },
      priceHistory: { '1D': [172.22, 171.99, 172.2, 171.4, 167.92, 166.87, 166.22, 166.26, 166.13, 165.01, 164.23, 162.82, 163.2, 162.29, 162.49, 162.08, 162.48, 162.88, 162.04, 162.38, 161.95, 162.44, 163.64, 164.59], '1W': [163.72, 166.42, 176.32, 172.22, 164.59], '1M': [148.4, 147.62, 146.77, 138.81, 143.6, 154.07, 149.22, 152.46, 153.8, 158.59, 161.11, 163.96, 165.96, 158.7, 162.78, 165.15, 163.72, 166.42, 176.32, 172.22, 164.59], 'YTD': [135.14, 136.25, 154.22, 150.99, 144.08, 136.23, 146.72, 147.82, 135.16, 136.06, 136.8, 130.67, 119.15, 128.38, 148.72, 151.93, 143.72, 136.69, 127.87, 119.2, 140.24, 147.62, 149.22, 161.11, 165.15, 164.59], '6M': [139.71, 140.16, 154.39, 155.56, 144.93, 144.2, 148.57, 151.5, 129.58, 136.74, 135.12, 127.96, 126.35, 128.38, 148.72, 151.93, 143.72, 136.69, 127.87, 119.2, 140.24, 147.62, 149.22, 161.11, 165.15, 164.59], '1Y': [99.46, 98.76, 103.34, 105.02, 104.31, 109.98, 110.74, 108.81, 111.94, 110.45, 118.68, 123.94, 122.6, 122.22, 121.7, 125.65, 135.31, 139.11, 138.11, 135.25, 130.36, 140.9, 139.36, 129.24, 135.29, 136.9, 139.88, 145.11, 152.33, 166.25, 147.06, 144.14, 147.73, 152.64, 132.75, 134.54, 135.12, 127.96, 126.35, 135.32, 146.98, 148.13, 148.38, 138.47, 124.64, 123.05, 140.24, 147.62, 149.22, 161.11, 165.15, 164.59] },
      velocityScore: { '1D': 0.9, '1W': 6.5, '1M': -36.3, '6M': null }, isNew: false,
      marketCap: '$202B', pe: 47.3, revenueGrowth: 58, eps: 3.48, grossMargin: 38, dividendYield: 0.58,
      etfPresence: { POW: 1.06, VOLT: 4.65, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, avgWeight: 2.75, proScore: 1.1, coverage: 0.4,
      price: 311.27, weeklyPrices: [348.11, 348.15, 372.87, 356.35, 311.27], weeklyChange: -10.58, dayChange: -12.65, sortRank: 0, periodReturns: { '1M': -0.3, 'YTD': 48.7, '6M': 40.2, '1Y': 125.3 },
      priceHistory: { '1D': [356.35, 347.95, 352.39, 348, 335.49, 331.86, 330.06, 328.47, 327.99, 323.78, 323.1, 320.25, 319.93, 316.89, 315.53, 313.11, 313.05, 311.65, 311.75, 312.15, 307.7, 306.69, 305, 311.27], '1W': [348.11, 348.15, 372.87, 356.35, 311.27], '1M': [312.28, 322.5, 320.92, 294.81, 306.11, 311.64, 308.17, 340.4, 354.37, 370.66, 353.32, 372.59, 388.23, 364.96, 359.61, 375.15, 348.11, 348.15, 372.87, 356.35, 311.27], 'YTD': [209.37, 210.99, 257.29, 262.19, 255.36, 273.26, 314.27, 329.24, 340.42, 305.02, 308.31, 329.78, 298.29, 339.32, 385.73, 385, 369.08, 345.63, 339.42, 302.84, 328.34, 322.5, 308.17, 353.32, 375.15, 311.27], '6M': [221.99, 219.59, 253.86, 263.03, 261.82, 279.17, 314.12, 335.74, 322.47, 311.39, 315.91, 356.38, 322.71, 339.32, 385.73, 385, 369.08, 345.63, 339.42, 302.84, 328.34, 322.5, 308.17, 353.32, 375.15, 311.27], '1Y': [138.14, 140.73, 143.25, 140.54, 135.25, 150.82, 161.89, 148.07, 155.55, 153.74, 157.44, 174.35, 166.46, 173.86, 169.62, 191.98, 198.42, 205.61, 219.2, 202.82, 188.88, 211.19, 219.38, 215.07, 216.09, 217.26, 227.65, 227.59, 250.95, 259.55, 263.03, 279.04, 321.34, 338.51, 330.54, 314.84, 315.91, 356.38, 322.71, 366.95, 374.32, 377.19, 361.39, 360.81, 339.19, 313.05, 328.34, 322.5, 308.17, 353.32, 375.15, 311.27] },
      velocityScore: { '1D': -0.9, '1W': 0, '1M': -34.1, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 64.7, revenueGrowth: 26, eps: 4.81, grossMargin: 39, dividendYield: null,
      etfPresence: { POW: 1.08, VOLT: 4.42, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 2.59, proScore: 1.04, coverage: 0.4,
      price: 73.14, weeklyPrices: [77.92, 75.06, 74.34, 72.77, 73.14], weeklyChange: -6.13, dayChange: 0.51, sortRank: 0, periodReturns: { '1M': 2.6, 'YTD': 21.7, '6M': 20.2, '1Y': 24.7 },
      priceHistory: { '1D': [72.77, 73.09, 72.91, 72.8, 72.68, 72.58, 72.73, 72.49, 72.49, 72.36, 72.26, 72.29, 72.26, 72.36, 72.33, 72.23, 72.29, 72.53, 72.64, 72.63, 72.24, 72.41, 72.76, 73.14], '1W': [77.92, 75.06, 74.34, 72.77, 73.14], '1M': [71.31, 71.66, 72.43, 71.96, 71.59, 71.59, 72.26, 71.62, 72.08, 71.49, 71.25, 73.12, 74.95, 75.79, 75.87, 77.53, 77.92, 75.06, 74.34, 72.77, 73.14], 'YTD': [60.11, 61.15, 60.29, 64.96, 67.26, 66.92, 72.28, 72.98, 76.26, 73.18, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 76.12, 74.73, 79.4, 74.37, 71.66, 72.26, 71.25, 77.53, 73.14], '6M': [60.85, 60.32, 61.55, 64.29, 66.34, 67.85, 71.96, 73.5, 75.88, 73.84, 73.69, 74.46, 72.78, 74.04, 71.44, 70.43, 73.04, 76.12, 74.73, 79.4, 74.37, 71.66, 72.26, 71.25, 77.53, 73.14], '1Y': [58.64, 58.22, 59.35, 57.82, 60.27, 57.89, 57.34, 57.8, 58, 57.2, 58.81, 60.11, 64.01, 64.48, 62.61, 62.46, 58.93, 57.62, 57.94, 59.59, 58.91, 60.93, 62.81, 59.74, 58.26, 59.8, 61.16, 59.56, 61.51, 65.48, 68.5, 68.84, 72.14, 73.97, 75.77, 74.4, 73.69, 74.46, 72.78, 73.01, 70.76, 71.1, 73.32, 73.76, 75.71, 77.88, 74.37, 71.66, 72.26, 71.25, 77.53, 73.14] },
      velocityScore: { '1D': 2, '1W': -1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$89B', pe: 32.1, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.89,
      etfPresence: { POW: false, VOLT: 1.48, PBD: false, PBW: false, IVEP: 3.7 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'JCI', name: 'JOHNSON CONTROLS INTERNATIONAL PLC', easyScore: 2, avgWeight: 2.58, proScore: 1.03, coverage: 0.4,
      price: 140.76, weeklyPrices: [138.40, 140.47, 146.11, 144.80, 140.76], weeklyChange: 1.71, dayChange: -2.79, sortRank: 0, periodReturns: { '1M': -0.9, 'YTD': 17.5, '6M': 15.1, '1Y': 31.9 },
      priceHistory: { '1D': [144.8, 144.85, 145.13, 146.1, 144.14, 143.7, 142.84, 142.38, 142.49, 142.13, 141.81, 141.1, 140.82, 139.52, 140.15, 140.04, 140.27, 140.18, 140.43, 140.48, 139.96, 139.39, 140.16, 140.76], '1W': [138.4, 140.47, 146.11, 144.8, 140.76], '1M': [141.99, 146.96, 147.4, 143.65, 144.05, 147.75, 139.36, 144.01, 144.96, 146.06, 143.62, 144.82, 148.21, 141.28, 142.81, 145.49, 138.4, 140.47, 146.11, 144.8, 140.76], 'YTD': [119.75, 111.29, 112.95, 113.59, 119.26, 137.65, 139.24, 142.83, 145.46, 133.09, 131.69, 133.27, 126.58, 133.15, 142.05, 139.72, 141.59, 144.82, 141.04, 135.42, 138.2, 146.96, 139.36, 143.62, 145.49, 140.76], '6M': [122.31, 110.85, 114.61, 115.07, 122.98, 139, 142.21, 144.71, 139.58, 133.94, 132.56, 136.43, 130.95, 133.15, 142.05, 139.72, 141.59, 144.82, 141.04, 135.42, 138.2, 146.96, 139.36, 143.62, 145.49, 140.76], '1Y': [106.71, 105.85, 108.96, 111.73, 106.48, 105.55, 105.02, 104.75, 108.65, 106.23, 107.53, 108.69, 107.01, 108.79, 105.55, 108.83, 110.55, 114.21, 122.25, 120.2, 112.99, 116.31, 114.23, 114.76, 119.53, 121.71, 121.53, 111.39, 114.56, 116.96, 124.01, 138.75, 139.48, 144.49, 140, 134.99, 132.56, 136.43, 130.95, 139, 137.21, 139.81, 141.35, 143.14, 143.8, 137.75, 138.2, 146.96, 139.36, 143.62, 145.49, 140.76] },
      velocityScore: { '1D': 3, '1W': 5.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$86B', pe: 43, revenueGrowth: 8, eps: 3.27, grossMargin: 37, dividendYield: 1.1,
      etfPresence: { POW: false, VOLT: 1.43, PBD: false, PBW: false, IVEP: 3.72 },
      tonyNote: 'JOHNSON CONTROLS INTERNATIONAL PLC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VST', name: 'Vistra Corp', easyScore: 2, avgWeight: 2.28, proScore: 0.91, coverage: 0.4,
      price: 151.05, weeklyPrices: [163.49, 162.38, 158.63, 153.16, 151.05], weeklyChange: -7.61, dayChange: -1.38, sortRank: 0, periodReturns: { '1M': -4.4, 'YTD': -6.4, '6M': -8.6, '1Y': -21.4 },
      priceHistory: { '1D': [153.16, 155.44, 155.58, 155.51, 153.88, 151.79, 151.8, 151.5, 152.14, 150.45, 149.77, 149.49, 149.38, 149.58, 149.57, 148.88, 150.07, 150.63, 151.71, 151.41, 150.65, 150.62, 150.97, 151.05], '1W': [163.49, 162.38, 158.63, 153.16, 151.05], '1M': [157.97, 153.8, 153.7, 148.76, 146.9, 146.22, 138.54, 146.38, 148.02, 153.52, 158.83, 163.75, 167.26, 162.39, 162.87, 167.77, 163.49, 162.38, 158.63, 153.16, 151.05], 'YTD': [161.33, 150.6, 180.18, 160.12, 158.35, 149.65, 171.49, 167.8, 165.99, 163.62, 161.99, 151.29, 147.54, 153.68, 163.97, 154.91, 161.12, 160.38, 146.87, 134.71, 160.15, 153.8, 138.54, 158.83, 167.77, 151.05], '6M': [165.23, 166.37, 166.6, 158.81, 154.26, 152.97, 173.68, 171.62, 161.7, 164.4, 164.33, 152.72, 150.33, 153.68, 163.97, 154.91, 161.12, 160.38, 146.87, 134.71, 160.15, 153.8, 138.54, 158.83, 167.77, 151.05], '1Y': [192.2, 196.58, 193.01, 192.2, 208.05, 202.12, 202.35, 190.28, 196.7, 188, 209.7, 211.28, 207.22, 201.99, 196.86, 201.35, 191.37, 189.71, 184.62, 171.56, 173.79, 178.86, 167.17, 170.1, 163.03, 161.84, 162.93, 172.58, 156.81, 164.26, 153, 159.6, 170.57, 175.36, 163.36, 159.16, 164.33, 152.72, 150.33, 155.89, 162.94, 155.79, 153.79, 158.29, 142.61, 144, 160.15, 153.8, 138.54, 158.83, 167.77, 151.05] },
      velocityScore: { '1D': 0, '1W': -2.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$51B', pe: 25.3, revenueGrowth: 43, eps: 5.97, grossMargin: 39, dividendYield: 0.6,
      etfPresence: { POW: 1.36, VOLT: false, PBD: false, PBW: false, IVEP: 3.2 },
      tonyNote: 'Vistra Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CEG', name: 'Constellation Energy Corp', easyScore: 2, avgWeight: 2.12, proScore: 0.85, coverage: 0.4,
      price: 239.25, weeklyPrices: [264.02, 259.32, 248.37, 236.50, 239.25], weeklyChange: -9.38, dayChange: 1.16, sortRank: 0, periodReturns: { '1M': -12.3, 'YTD': -32.3, '6M': -34.7, '1Y': -23.3 },
      priceHistory: { '1D': [236.5, 242.96, 242.83, 243.9, 243.14, 239.89, 239.8, 239.24, 239.81, 236.93, 237.59, 238.76, 238.35, 238.26, 238.49, 237.39, 238.3, 238.51, 240.35, 240.18, 239.36, 239.16, 240.17, 239.25], '1W': [264.02, 259.32, 248.37, 236.5, 239.25], '1M': [272.65, 267.24, 264.59, 254.83, 250.67, 251.65, 242.3, 246.71, 253.76, 262.35, 267.17, 274.06, 275.53, 270.26, 267.97, 268.69, 264.02, 259.32, 248.37, 236.5, 239.25], 'YTD': [353.27, 322.54, 341.2, 289.06, 280.68, 261.42, 288.43, 293.8, 327.16, 322.99, 305.58, 289.76, 298.61, 272.58, 296.61, 277.7, 305.71, 320.42, 293.6, 260.67, 288.68, 267.24, 242.3, 267.17, 268.69, 239.25], '6M': [366.25, 342.52, 307.71, 285.27, 270.88, 272.15, 303.01, 312.64, 324.87, 317.09, 307.69, 294.85, 279.25, 272.58, 296.61, 277.7, 305.71, 320.42, 293.6, 260.67, 288.68, 267.24, 242.3, 267.17, 268.69, 239.25], '1Y': [311.88, 321.54, 321.42, 327.35, 340.77, 335.77, 326.21, 312.52, 319.55, 301.58, 323.48, 330.9, 331.26, 360, 368.49, 386.5, 365.8, 382.48, 351.3, 335.74, 345.78, 364.36, 359.82, 351.98, 355.4, 358.33, 354.94, 335.86, 295.4, 288.76, 268.45, 271.14, 294.05, 325.84, 322.85, 300.69, 307.69, 294.85, 279.25, 284.27, 294.73, 287.16, 297, 322.78, 274.89, 281.26, 288.68, 267.24, 242.3, 267.17, 268.69, 239.25] },
      velocityScore: { '1D': -1.2, '1W': -8.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$85B', pe: 20.8, revenueGrowth: 64, eps: 11.52, grossMargin: 23, dividendYield: null,
      etfPresence: { POW: 1.13, VOLT: false, PBD: false, PBW: false, IVEP: 3.11 },
      tonyNote: 'Constellation Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TLN', name: 'Talen Energy Corp', easyScore: 2, avgWeight: 2.07, proScore: 0.83, coverage: 0.4,
      price: 364.67, weeklyPrices: [404.09, 399.34, 384.26, 360.79, 364.67], weeklyChange: -9.76, dayChange: 1.08, sortRank: 0, periodReturns: { '1M': -5.4, 'YTD': -2.7, '6M': -8.1, '1Y': 27.4 },
      priceHistory: { '1D': [360.79, 374.48, 373.73, 375.77, 372.49, 368.98, 368.45, 368.53, 371.66, 366.59, 367.46, 364.58, 364.48, 361.49, 360.6, 358.64, 361.73, 362.55, 366.14, 365.93, 363.58, 362.04, 364.71, 364.67], '1W': [404.09, 399.34, 384.26, 360.79, 364.67], '1M': [385.51, 379.59, 378.08, 364.74, 364.78, 358.74, 336.59, 344.8, 360.54, 386.21, 409.81, 436.29, 438.12, 411.92, 405.89, 416.8, 404.09, 399.34, 384.26, 360.79, 364.67], 'YTD': [374.84, 356, 419.07, 366.43, 348.36, 345, 376.7, 367.84, 353.24, 335.11, 317.6, 311.02, 313.03, 330.07, 345.76, 329.74, 361.17, 384.9, 374.61, 314.57, 379.78, 379.59, 336.59, 409.81, 416.8, 364.67], '6M': [396.73, 370.83, 371.66, 350.41, 340.8, 353.66, 388.28, 375.24, 341.39, 331.58, 327.14, 315.77, 319.23, 330.07, 345.76, 329.74, 361.17, 384.9, 374.61, 314.57, 379.78, 379.59, 336.59, 409.81, 416.8, 364.67], '1Y': [286.31, 276.17, 328.63, 346.62, 378.01, 374.68, 380.6, 357.86, 388.22, 389.19, 402.53, 423.56, 411.23, 438.5, 412.83, 406.45, 383.82, 391.82, 385.93, 355.04, 369.1, 394.27, 354.24, 356.36, 372.25, 380.27, 395.2, 369.03, 356.66, 359.51, 341.42, 357.93, 380.29, 391.43, 336.57, 316.22, 327.14, 315.77, 319.23, 328.65, 353.3, 339.32, 351.91, 409.99, 351.03, 344.46, 379.78, 379.59, 336.59, 409.81, 416.8, 364.67] },
      velocityScore: { '1D': -3.5, '1W': -7.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$17B', pe: null, revenueGrowth: 97, eps: -0.51, grossMargin: 40, dividendYield: null,
      etfPresence: { POW: 1.53, VOLT: false, PBD: false, PBW: false, IVEP: 2.61 },
      tonyNote: 'Talen Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX TECHNOLOGIES INC', easyScore: 2, avgWeight: 2.07, proScore: 0.83, coverage: 0.4,
      price: 191.06, weeklyPrices: [197.91, 189.25, 194.65, 191.25, 191.06], weeklyChange: -3.46, dayChange: -0.1, sortRank: 0, periodReturns: { '1M': 2, 'YTD': 10.5, '6M': 5.1, '1Y': 33.7 },
      priceHistory: { '1D': [191.25, 195.08, 196.54, 195.49, 195.13, 191.3, 190.01, 190, 191.13, 190.12, 189.91, 188.98, 189.2, 187.69, 188, 187.52, 187.6, 187.84, 187.96, 187.7, 187.11, 188.43, 189.86, 191.06], '1W': [197.91, 189.25, 194.65, 191.25, 191.06], '1M': [187.26, 184.72, 190.76, 185.95, 187.46, 188.96, 183, 194.68, 193.45, 193.94, 203.07, 205.4, 210, 209.89, 205.65, 204.77, 197.91, 189.25, 194.65, 191.25, 191.06], 'YTD': [172.84, 193.2, 213.25, 207.75, 205.43, 197.19, 200.4, 198.38, 216.47, 200.39, 204.67, 204.85, 191.59, 214.44, 238.27, 216.66, 216.18, 206.15, 206.83, 197.33, 198.95, 184.72, 183, 203.07, 204.77, 191.06], '6M': [181.85, 201.46, 217.89, 206.04, 206.04, 203, 201.09, 204.23, 205.83, 195.91, 207.48, 204.76, 204.49, 214.44, 238.27, 216.66, 216.18, 206.15, 206.83, 197.33, 198.95, 184.72, 183, 203.07, 204.77, 191.06], '1Y': [142.91, 137.06, 142.95, 147.96, 149.5, 179.19, 174.7, 165.34, 165.83, 163.64, 168.33, 174.5, 180.62, 186.64, 190.08, 203.12, 199.92, 213.8, 193.93, 177.88, 175.28, 178.88, 177.87, 175.03, 176.43, 175.49, 189.02, 206.62, 206.07, 212.4, 210.88, 199.83, 202.25, 208.27, 205.57, 195.98, 207.48, 204.76, 204.49, 231.78, 238.42, 219.1, 208.08, 215.2, 206.83, 202.66, 198.95, 184.72, 183, 203.07, 204.77, 191.06] },
      velocityScore: { '1D': 1.2, '1W': -4.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: 50.9, revenueGrowth: 26, eps: 3.75, grossMargin: 23, dividendYield: 0.54,
      etfPresence: { POW: false, VOLT: 1.99, PBD: false, PBW: false, IVEP: 2.15 },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 5.04, proScore: 2.02, coverage: 0.4,
      price: 700.75, weeklyPrices: [804.76, 813.77, 839.36, 776.55, 700.75], weeklyChange: -12.92, dayChange: -9.76, sortRank: 0, periodReturns: { '1M': -20, 'YTD': 128.8, '6M': 119.6, '1Y': 196.1 },
      priceHistory: { '1D': [776.55, 781, 779.29, 762.85, 749.89, 736.96, 729.5, 722.2, 725.73, 716.46, 710.92, 697.4, 697, 703.02, 704.23, 697.55, 697.32, 700.49, 703.68, 704.01, 700.89, 692.32, 695.43, 700.75], '1W': [804.76, 813.77, 839.36, 776.55, 700.75], '1M': [875.52, 957.03, 993.74, 882.43, 891.86, 842.01, 770.25, 838.55, 858.99, 866.67, 838.21, 861.88, 932.75, 892.25, 867.23, 881.92, 804.76, 813.77, 839.36, 776.55, 700.75], 'YTD': [306.23, 297.62, 336.31, 351.39, 357.91, 401.29, 437.77, 434.64, 432.87, 411.38, 417.76, 422.55, 382.55, 382.22, 464.54, 472.84, 471.85, 806, 851.35, 728.29, 782.12, 957.03, 770.25, 838.21, 881.92, 700.75], '6M': [319.16, 308.13, 350.96, 361.21, 367.95, 418.61, 421.2, 459.72, 415.51, 411.53, 425.51, 446.16, 407.27, 382.22, 464.54, 472.84, 471.85, 806, 851.35, 728.29, 782.12, 957.03, 770.25, 838.21, 881.92, 700.75], '1Y': [236.67, 241.76, 250.95, 268.14, 263.05, 302.69, 282.14, 278.03, 290.95, 285.98, 313.56, 360.25, 342.11, 349.3, 336.63, 355.58, 353.8, 379.03, 388.68, 326.6, 314.56, 344.31, 325.1, 315.15, 308.58, 310.79, 327.11, 307.58, 349.59, 372.25, 386.78, 415.19, 410.63, 455.25, 420.22, 420.6, 425.51, 446.16, 407.27, 423.35, 456.08, 487.87, 469.75, 886.22, 854.28, 752, 782.12, 957.03, 770.25, 838.21, 881.92, 700.75] },
      velocityScore: { '1D': 0, '1W': -5.6, '1M': -40.9, '6M': null }, isNew: false,
      marketCap: '$22B', pe: 62.7, revenueGrowth: 92, eps: 11.18, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 6, PRN: 4.09, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 5.02, proScore: 2.01, coverage: 0.4,
      price: 963.53, weeklyPrices: [997.47, 1033.19, 1064.90, 991.41, 963.53], weeklyChange: -3.4, dayChange: -2.81, sortRank: 0, periodReturns: { '1M': 5.9, 'YTD': 68.2, '6M': 61, '1Y': 142.2 },
      priceHistory: { '1D': [991.41, 986.48, 987.91, 995.54, 985.61, 982.84, 976.51, 971.91, 974.51, 969.82, 966.52, 962.06, 966.3, 959.78, 957.91, 950.91, 952.22, 951.9, 956.67, 958.24, 954.54, 954.75, 959.4, 963.53], '1W': [997.47, 1033.19, 1064.9, 991.41, 963.53], '1M': [909.81, 926.18, 940.48, 904.28, 915.64, 914.7, 856.16, 897.63, 910.57, 933.93, 955.92, 985.82, 1022.28, 984.24, 994.45, 1057.01, 997.47, 1033.19, 1064.9, 991.41, 963.53], 'YTD': [572.87, 608.13, 647.18, 626.62, 657.36, 726.2, 774.2, 756.47, 752.32, 704.82, 699.78, 701.7, 667.43, 724.44, 794.25, 800.45, 817.87, 904.59, 912.14, 860.15, 909.93, 926.18, 856.16, 955.92, 1057.01, 963.53], '6M': [598.41, 617.62, 646.89, 635.92, 690.91, 742.12, 764.76, 768.23, 722.18, 716.68, 702, 716.63, 708.46, 724.44, 794.25, 800.45, 817.87, 904.59, 912.14, 860.15, 909.93, 926.18, 856.16, 955.92, 1057.01, 963.53], '1Y': [397.86, 405.92, 413.71, 433.75, 428.69, 416.52, 417.5, 417.89, 434.91, 423.08, 431.52, 466.54, 465.76, 497.85, 491.3, 527.08, 520.5, 583.15, 569.78, 553.55, 546.13, 575.76, 603.17, 597.89, 576.22, 578.61, 616.1, 629.77, 629, 638.91, 702.89, 742.37, 751.97, 766.61, 731.97, 707.59, 702, 716.63, 708.46, 771.58, 770.17, 808.87, 810.05, 926.93, 902.3, 872.56, 909.93, 926.18, 856.16, 955.92, 1057.01, 963.53] },
      velocityScore: { '1D': -4.3, '1W': -2.9, '1M': -35.4, '6M': null }, isNew: false,
      marketCap: '$444B', pe: 47.9, revenueGrowth: 22, eps: 20.13, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 3.15, RSHO: 6.89, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 4.91, proScore: 1.96, coverage: 0.4,
      price: 246.33, weeklyPrices: [279.77, 281.09, 286.36, 264.86, 246.33], weeklyChange: -11.95, dayChange: -7, sortRank: 0, periodReturns: { '1M': -17.6, 'YTD': 131.8, '6M': 109.6, '1Y': 239.5 },
      priceHistory: { '1D': [264.86, 264.15, 262.74, 260.89, 256.86, 257.48, 254.88, 252.42, 254.21, 252.93, 251.64, 248.6, 249.5, 247.92, 247.37, 244.32, 246.88, 245.93, 248.94, 248.41, 245.27, 245.24, 245.94, 246.33], '1W': [279.77, 281.09, 286.36, 264.86, 246.33], '1M': [299.07, 299.73, 300.06, 284.87, 293.6, 283.51, 262.34, 290.5, 294.75, 303.53, 294.03, 297.2, 307.8, 291.5, 294.49, 309.2, 279.77, 281.09, 286.36, 264.86, 246.33], 'YTD': [106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 181.38, 177.5, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 261.58, 295.94, 299.73, 262.34, 294.03, 309.2, 246.33], '6M': [117.51, 121.83, 139.99, 141.15, 146.79, 187.3, 187.21, 186.39, 170.37, 176.51, 174.04, 186.82, 180.36, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 261.58, 295.94, 299.73, 262.34, 294.03, 309.2, 246.33], '1Y': [72.55, 70.87, 76.08, 82.79, 75.89, 81.28, 85.17, 83.64, 90.42, 89.41, 95.89, 99.1, 96.99, 101.35, 100.35, 110.24, 113.88, 125.9, 125, 109.4, 98.12, 107.74, 114.04, 112.36, 110.97, 111.96, 120.46, 128.85, 142.76, 147.43, 151.08, 190.09, 180.99, 183, 170.96, 171.73, 174.04, 186.82, 180.36, 218.07, 229.73, 242.77, 253.49, 320.3, 300.84, 271.05, 295.94, 299.73, 262.34, 294.03, 309.2, 246.33] },
      velocityScore: { '1D': 0, '1W': -1.5, '1M': -41.1, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 48.2, revenueGrowth: 7, eps: 5.11, grossMargin: 30, dividendYield: 0.14,
      etfPresence: { AIRR: 2.48, PRN: false, RSHO: 7.33, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.43, proScore: 1.77, coverage: 0.4,
      price: 1741.3, weeklyPrices: [1854.23, 1948.69, 1981.95, 1865.15, 1741.30], weeklyChange: -6.09, dayChange: -6.64, sortRank: 0, periodReturns: { '1M': -7.5, 'YTD': 86.6, '6M': 73.5, '1Y': 221.9 },
      priceHistory: { '1D': [1865.15, 1857.03, 1854.89, 1866.91, 1837.09, 1813.86, 1799.54, 1788.46, 1793.48, 1772.2, 1761.5, 1734.86, 1743.19, 1735.72, 1729.53, 1715.44, 1721.1, 1732.35, 1737.18, 1738.68, 1730.29, 1726.7, 1742.27, 1741.3], '1W': [1854.23, 1948.69, 1981.95, 1865.15, 1741.3], '1M': [1883.26, 1850.04, 1914.65, 1843.94, 1852.03, 1831.56, 1719.48, 1843.42, 1877.61, 1952.02, 1931.77, 1967.41, 2066.51, 1908.07, 1954.47, 2017.57, 1854.23, 1948.69, 1981.95, 1865.15, 1741.3], 'YTD': [933.29, 971.49, 1091.04, 1121.44, 1142.1, 1230.26, 1337.95, 1413.57, 1438.24, 1372.4, 1414.1, 1408.25, 1273.18, 1424.91, 1650.48, 1674.16, 1719.21, 1967.24, 2016.31, 1825.5, 1867.09, 1850.04, 1719.48, 1931.77, 2017.57, 1741.3], '6M': [1003.64, 1010.41, 1119.98, 1127.55, 1176.26, 1283.65, 1337.75, 1468.58, 1391.16, 1383.62, 1424.46, 1461.52, 1378.99, 1424.91, 1650.48, 1674.16, 1719.21, 1967.24, 2016.31, 1825.5, 1867.09, 1850.04, 1719.48, 1931.77, 2017.57, 1741.3], '1Y': [540.98, 539.5, 554.18, 688.74, 695.3, 691.76, 689.86, 694, 730.01, 706.31, 753.69, 797.71, 804.36, 818.01, 816.07, 827.92, 825, 963.3, 957.78, 897.52, 876.19, 976.94, 1001.48, 967.95, 940.74, 950.67, 1032.31, 1038.18, 1134.75, 1160.38, 1209.97, 1269.63, 1319.47, 1450.6, 1430.38, 1407.32, 1424.46, 1461.52, 1378.99, 1525.16, 1648.96, 1724.49, 1724.14, 2011.49, 2034.63, 1835.51, 1867.09, 1850.04, 1719.48, 1931.77, 2017.57, 1741.3] },
      velocityScore: { '1D': -2.7, '1W': -4.3, '1M': -36.1, '6M': null }, isNew: false,
      marketCap: '$61B', pe: 50.2, revenueGrowth: 1, eps: 34.69, grossMargin: 25, dividendYield: 0.14,
      etfPresence: { AIRR: 4.41, PRN: 4.45, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.92, proScore: 1.57, coverage: 0.4,
      price: 330.85, weeklyPrices: [337.08, 334.16, 338.15, 332.08, 330.85], weeklyChange: -1.85, dayChange: -0.37, sortRank: 0, periodReturns: { '1M': 7.3, 'YTD': 28.9, '6M': 27.4, '1Y': 34.6 },
      priceHistory: { '1D': [332.08, 333.71, 327.93, 330.72, 330.21, 330.49, 330.9, 332.74, 332.36, 332.64, 331.67, 331.3, 330.42, 330.1, 330, 329.27, 329.15, 328.92, 329.27, 328.83, 329.08, 328.8, 330.54, 330.85], '1W': [337.08, 334.16, 338.15, 332.08, 330.85], '1M': [308.31, 313.39, 313.67, 315.29, 314.42, 322.81, 314.08, 318.89, 320.11, 316.18, 329.89, 337.96, 338.07, 330.9, 333.78, 343.54, 337.08, 334.16, 338.15, 332.08, 330.85], 'YTD': [256.77, 264.62, 282.47, 280.14, 260.41, 291.74, 279.84, 278.74, 283.54, 267.57, 256.83, 262.23, 258.01, 272.54, 292.01, 293.59, 301.24, 305.48, 313.7, 302.64, 312.65, 313.39, 314.08, 329.89, 343.54, 330.85], '6M': [259.63, 272.25, 281.21, 281.54, 270.02, 282.45, 278.31, 282.27, 277.7, 264.31, 261.37, 264.14, 265.32, 272.54, 292.01, 293.59, 301.24, 305.48, 313.7, 302.64, 312.65, 313.39, 314.08, 329.89, 343.54, 330.85], '1Y': [245.74, 253.91, 260.7, 272.13, 264.18, 263.13, 273.04, 258.76, 266.47, 265.44, 263.19, 260.45, 261.43, 258.41, 246.04, 247.92, 260, 255.91, 259.66, 250.89, 242.52, 258.82, 257.91, 261.74, 262.41, 263.4, 263.15, 273.7, 277.44, 262.34, 273.22, 283.73, 279.27, 280.76, 279.91, 270.13, 261.37, 264.14, 265.32, 280.74, 284.56, 289.82, 296.57, 315.39, 310.87, 306.25, 312.65, 313.39, 314.08, 329.89, 343.54, 330.85] },
      velocityScore: { '1D': 0, '1W': 0, '1M': -26.6, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 31.2, revenueGrowth: 7, eps: 10.59, grossMargin: 30, dividendYield: 0.61,
      etfPresence: { AIRR: 1.8, PRN: false, RSHO: 6.04, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'EME', name: 'EMCOR Group, Inc.', easyScore: 2, avgWeight: 3.46, proScore: 1.39, coverage: 0.4,
      price: 774.66, weeklyPrices: [798.10, 814.41, 829.88, 804.33, 774.66], weeklyChange: -2.94, dayChange: -3.69, sortRank: 0, periodReturns: { '1M': -6.4, 'YTD': 26.6, '6M': 21.3, '1Y': 41.6 },
      priceHistory: { '1D': [804.33, 807.1, 800.96, 802.64, 794.18, 789.52, 787.84, 786.33, 788.81, 781.64, 777.96, 769.16, 773.95, 770.2, 768.74, 764.38, 767.62, 770.91, 772.17, 770.09, 765.96, 765.88, 769.42, 774.66], '1W': [798.1, 814.41, 829.88, 804.33, 774.66], '1M': [827.28, 839.54, 845.43, 817.44, 823.79, 827.78, 776.72, 811.53, 823.05, 842.3, 827.5, 836.59, 868.88, 838.61, 847.17, 862.66, 798.1, 814.41, 829.88, 804.33, 774.66], 'YTD': [611.79, 628.27, 682.13, 694.21, 720.73, 764.35, 800.82, 806.66, 735.78, 719.18, 726.55, 744.66, 701.1, 750.42, 814.18, 838.01, 863.78, 933.27, 924.9, 854.36, 855.26, 839.54, 776.72, 827.5, 862.66, 774.66], '6M': [638.65, 646.27, 698.69, 706.87, 731.67, 776.24, 797.5, 806.8, 736.3, 723.38, 728.55, 761.27, 738.31, 750.42, 814.18, 838.01, 863.78, 933.27, 924.9, 854.36, 855.26, 839.54, 776.72, 827.5, 862.66, 774.66], '1Y': [547.22, 554.22, 565.56, 635.06, 624.67, 618.22, 609.75, 610.85, 633.25, 625.4, 629.08, 632.02, 640.57, 654.41, 663.74, 689.01, 696.28, 648, 653.75, 618.96, 583.08, 615.07, 623.62, 623.65, 611.41, 623.26, 653.57, 660.65, 687.76, 716.28, 744.53, 779.09, 783.06, 801.8, 740.87, 720.18, 728.55, 761.27, 738.31, 789.19, 803.64, 860, 833.37, 943.75, 923.01, 853.15, 855.26, 839.54, 776.72, 827.5, 862.66, 774.66] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$34B', pe: 26, revenueGrowth: 20, eps: 29.76, grossMargin: 19, dividendYield: 0.16,
      etfPresence: { AIRR: 3.75, PRN: 3.18, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'EMCOR Group is an electrical and mechanical construction services company. Revenue grew substantially, and EMCOR is a core Industrials ETF holding because it builds the electrical systems inside data centers, manufacturing plants, and commercial buildings. The $827 share price reflects years of consistent execution and market share gains in a fragmented contractor market.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 2, avgWeight: 2.94, proScore: 1.17, coverage: 0.4,
      price: 270.41, weeklyPrices: [268.87, 268.57, 268.86, 267.41, 270.41], weeklyChange: 0.57, dayChange: 1.12, sortRank: 0, periodReturns: { '1M': 7.9, 'YTD': 31.9, '6M': 27.7, '1Y': 49.3 },
      priceHistory: { '1D': [267.41, 273.95, 274.34, 276.76, 276.7, 274.48, 272.06, 272.1, 273.89, 271.58, 271.59, 269.81, 270.17, 267.51, 268.29, 267.59, 268.44, 267.93, 269.1, 269.26, 268.64, 268.72, 270.49, 270.41], '1W': [268.87, 268.57, 268.86, 267.41, 270.41], '1M': [250.72, 248.63, 249.33, 251.9, 246.55, 257.16, 249.49, 264.6, 264.67, 270.44, 283.23, 277.66, 280.36, 275.13, 276.06, 273.14, 268.87, 268.57, 268.86, 267.41, 270.41], 'YTD': [205.02, 210.02, 224.26, 214.89, 208.08, 223.16, 250.21, 257.04, 265.11, 254.14, 240.73, 236.04, 222.99, 236.02, 258.03, 247.72, 240.43, 242.69, 269.76, 253.12, 258.02, 248.63, 249.49, 283.23, 273.14, 270.41], '6M': [211.71, 218.27, 224.89, 215.39, 207.21, 225.15, 252.55, 260.95, 258.84, 253.91, 240.24, 239.51, 230.46, 236.02, 258.03, 247.72, 240.43, 242.69, 269.76, 253.12, 258.02, 248.63, 249.49, 283.23, 273.14, 270.41], '1Y': [181.06, 179.68, 190.49, 189.52, 184.26, 180.75, 175.99, 173.25, 176.16, 178.2, 185.77, 190.23, 193.15, 189.25, 184.09, 189.68, 200.1, 201.77, 205.72, 201.3, 197.92, 204.59, 190.98, 198.31, 203.49, 209.49, 212.92, 220.15, 220.36, 215.53, 213.49, 224.47, 249.35, 259.64, 260.09, 251.65, 240.24, 239.51, 230.46, 250, 254.04, 240.88, 236.52, 256.43, 273.1, 261.21, 258.02, 248.63, 249.49, 283.23, 273.14, 270.41] },
      velocityScore: { '1D': null, '1W': 3.5, '1M': null, '6M': null }, isNew: true,
      marketCap: '$108B', pe: 62.7, revenueGrowth: 19, eps: 4.31, grossMargin: 35, dividendYield: 0.18,
      etfPresence: { AIRR: false, PRN: 3.7, RSHO: false, IDEF: 2.17, BILT: false },
      tonyNote: 'Howmet Aerospace is an aerospace structures and engine components manufacturer. It appears in Industrials ETFs for its aerospace and defense exposure — commercial air travel recovery and defense spending growth are the two demand drivers. Revenue grew and margins are expanding as Howmet prices power over OEM customers.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 2.82, proScore: 1.13, coverage: 0.4,
      price: 227.74, weeklyPrices: [231.87, 238.21, 245.17, 231.72, 227.74], weeklyChange: -1.78, dayChange: -1.72, sortRank: 0, periodReturns: { '1M': -1, 'YTD': 13.8, '6M': 12, '1Y': 31.6 },
      priceHistory: { '1D': [231.72, 235.43, 233.51, 233.94, 230.47, 230.44, 227.75, 228.37, 227.19, 226.29, 225.32, 224.87, 224.23, 222.83, 223.36, 222.19, 223.66, 222.59, 223.1, 223.57, 224.04, 223.71, 224.99, 227.74], '1W': [231.87, 238.21, 245.17, 231.72, 227.74], '1M': [230.08, 234.08, 236.14, 227.8, 229.95, 228.01, 223.63, 233.49, 230.05, 237.06, 235.29, 242.97, 246.41, 236.07, 237.22, 244.56, 231.87, 238.21, 245.17, 231.72, 227.74], 'YTD': [200.06, 207.44, 213.61, 211.03, 208.41, 222.32, 239, 237.18, 225.02, 209.8, 203.42, 194.52, 190.71, 195.43, 224.82, 216.49, 216.36, 207.81, 198.99, 195.79, 215.34, 234.08, 223.63, 235.29, 244.56, 227.74], '6M': [203.26, 207.51, 217.65, 215.21, 212.73, 223.86, 241.6, 243.04, 219.58, 210.96, 204.62, 200.67, 199.94, 195.43, 224.82, 216.49, 216.36, 207.81, 198.99, 195.79, 215.34, 234.08, 223.63, 235.29, 244.56, 227.74], '1Y': [173.03, 172.12, 177.85, 180.82, 196.36, 201.57, 186.56, 186.28, 191.13, 187.81, 186.32, 188.04, 182.95, 189.83, 184.77, 184.04, 190.4, 198.85, 217.63, 212.04, 199.31, 215.04, 208.67, 219.94, 203.17, 205.66, 205.44, 208.56, 217.9, 215.68, 215.43, 231.2, 241.58, 226.66, 222.07, 210.15, 204.62, 200.67, 199.94, 212.22, 219.99, 220.62, 211.36, 212.74, 203.79, 205.55, 215.34, 234.08, 223.63, 235.29, 244.56, 227.74] },
      velocityScore: { '1D': 0, '1W': 0.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 43.5, revenueGrowth: 17, eps: 5.24, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.68, PRN: false, RSHO: 3.96, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 2, avgWeight: 2.31, proScore: 0.93, coverage: 0.4,
      price: 191.06, weeklyPrices: [197.91, 189.25, 194.65, 191.25, 191.06], weeklyChange: -3.46, dayChange: -0.1, sortRank: 0, periodReturns: { '1M': 2, 'YTD': 10.5, '6M': 5.1, '1Y': 33.7 },
      priceHistory: { '1D': [191.25, 195.08, 196.54, 195.49, 195.13, 191.3, 190.01, 190, 191.13, 190.12, 189.91, 188.98, 189.2, 187.69, 188, 187.52, 187.6, 187.84, 187.96, 187.7, 187.11, 188.43, 189.86, 191.06], '1W': [197.91, 189.25, 194.65, 191.25, 191.06], '1M': [187.26, 184.72, 190.76, 185.95, 187.46, 188.96, 183, 194.68, 193.45, 193.94, 203.07, 205.4, 210, 209.89, 205.65, 204.77, 197.91, 189.25, 194.65, 191.25, 191.06], 'YTD': [172.84, 193.2, 213.25, 207.75, 205.43, 197.19, 200.4, 198.38, 216.47, 200.39, 204.67, 204.85, 191.59, 214.44, 238.27, 216.66, 216.18, 206.15, 206.83, 197.33, 198.95, 184.72, 183, 203.07, 204.77, 191.06], '6M': [181.85, 201.46, 217.89, 206.04, 206.04, 203, 201.09, 204.23, 205.83, 195.91, 207.48, 204.76, 204.49, 214.44, 238.27, 216.66, 216.18, 206.15, 206.83, 197.33, 198.95, 184.72, 183, 203.07, 204.77, 191.06], '1Y': [142.91, 137.06, 142.95, 147.96, 149.5, 179.19, 174.7, 165.34, 165.83, 163.64, 168.33, 174.5, 180.62, 186.64, 190.08, 203.12, 199.92, 213.8, 193.93, 177.88, 175.28, 178.88, 177.87, 175.03, 176.43, 175.49, 189.02, 206.62, 206.07, 212.4, 210.88, 199.83, 202.25, 208.27, 205.57, 195.98, 207.48, 204.76, 204.49, 231.78, 238.42, 219.1, 208.08, 215.2, 206.83, 202.66, 198.95, 184.72, 183, 203.07, 204.77, 191.06] },
      velocityScore: { '1D': 0, '1W': -7.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: 50.9, revenueGrowth: 26, eps: 3.75, grossMargin: 23, dividendYield: 0.54,
      etfPresence: { AIRR: 2.97, PRN: false, RSHO: false, IDEF: 1.66, BILT: false },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 2, avgWeight: 1.73, proScore: 0.69, coverage: 0.4,
      price: 291.5, weeklyPrices: [281.99, 277.39, 279.89, 278.97, 291.50], weeklyChange: 3.37, dayChange: 4.49, sortRank: 0, periodReturns: { '1M': -0.7, 'YTD': -14.3, '6M': -16.7, '1Y': 15.6 },
      priceHistory: { '1D': [278.97, 288.53, 287.63, 288.37, 287.88, 285.73, 285.7, 286.99, 287.73, 287.18, 287.68, 287.28, 287.89, 288.02, 288.17, 288.05, 289.17, 289.07, 290.69, 290.41, 290.65, 291.04, 291.48, 291.5], '1W': [281.99, 277.39, 279.89, 278.97, 291.5], '1M': [293.66, 287.54, 294.53, 293.04, 292.26, 297.52, 289.13, 300.95, 297.68, 299.66, 296.89, 285.43, 278.19, 283.48, 279.62, 279.09, 281.99, 277.39, 279.89, 278.97, 291.5], 'YTD': [340.07, 378.47, 418.86, 418.58, 420.51, 397.77, 418.78, 438.01, 453.73, 429.58, 416.59, 396.57, 369.08, 402.28, 398.07, 378.21, 361.4, 326.13, 333.56, 324.6, 317.56, 287.54, 289.13, 296.89, 279.09, 291.5], '6M': [349.75, 386.99, 425.9, 413.56, 420.3, 405.82, 417.83, 447.73, 440.33, 417.51, 422.94, 402.08, 379.9, 402.28, 398.07, 378.21, 361.4, 326.13, 333.56, 324.6, 317.56, 287.54, 289.13, 296.89, 279.09, 291.5], '1Y': [252.08, 258.18, 254.49, 264.82, 269.83, 264.69, 267.46, 266.48, 275.27, 271.13, 274.71, 275.13, 278.77, 284.24, 282.99, 280.02, 290.09, 319.07, 305.43, 312.67, 301.83, 313.62, 304.58, 326.92, 336.64, 345.73, 363.48, 398.25, 415.58, 422.79, 429.64, 399.37, 424.89, 435.58, 437.03, 413.7, 422.94, 402.08, 379.9, 411.35, 398.13, 366.88, 362.17, 319.54, 334.22, 321.92, 317.56, 287.54, 289.13, 296.89, 279.09, 291.5] },
      velocityScore: { '1D': 0, '1W': -2.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 18.9, revenueGrowth: 13, eps: 15.4, grossMargin: 12, dividendYield: 1.98,
      etfPresence: { AIRR: 2.44, PRN: false, RSHO: false, IDEF: 1.01, BILT: false },
      tonyNote: 'Huntington Ingalls Industries is the only builder of nuclear-powered aircraft carriers for the U.S. Navy. Revenue is government-contracted and predictable; the ETF allocation in Industrials reflects defense spending growth and the Navy\'s backlog of nuclear submarine and carrier construction. A steady-state quality compounder in a market structure with no competition.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 2, avgWeight: 1.73, proScore: 0.69, coverage: 0.4,
      price: 55.35, weeklyPrices: [47.21, 46.95, 49.86, 53.04, 55.35], weeklyChange: 17.24, dayChange: 4.36, sortRank: 0, periodReturns: { '1M': -12.5, 'YTD': -27.1, '6M': -30.2, '1Y': 23.9 },
      priceHistory: { '1D': [53.04, 58.14, 58.65, 57.73, 56.76, 55.38, 55.08, 54.9, 55.25, 55.11, 55.01, 54.71, 55.12, 54.68, 54.56, 54.24, 54.42, 54.37, 54.6, 54.62, 54.58, 54.7, 54.92, 55.35], '1W': [47.21, 46.95, 49.86, 53.04, 55.35], '1M': [63.27, 58.43, 63.4, 58.52, 57.73, 56.19, 54.82, 58.78, 57.75, 57.02, 56.16, 54.21, 51.09, 50.8, 47.95, 46.32, 47.21, 46.95, 49.86, 53.04, 55.35], 'YTD': [75.91, 104.04, 124.56, 110.39, 103.01, 94.41, 89.06, 94.31, 90.72, 92.47, 89.53, 83.69, 65.28, 71.96, 73.66, 68.55, 61.66, 59.31, 57.33, 53.47, 57.3, 58.43, 54.82, 56.16, 46.32, 55.35], '6M': [79.29, 113.7, 130.72, 111.32, 96.16, 98.81, 91.97, 90.68, 88.95, 88.96, 95.31, 77.49, 70.51, 71.96, 73.66, 68.55, 61.66, 59.31, 57.33, 53.47, 57.3, 58.43, 54.82, 56.16, 46.32, 55.35], '1Y': [44.66, 51.71, 59.12, 59.77, 56.71, 63.88, 69.12, 64.78, 68.51, 64.81, 69.2, 80.77, 86.28, 96.19, 94.63, 83.12, 89.32, 88.3, 72.41, 71.69, 67.31, 76.1, 76.5, 75.96, 75.39, 77.47, 89.93, 117.86, 128.68, 118.06, 103.37, 93.48, 97.21, 88.23, 89.13, 88.92, 95.31, 77.49, 70.51, 74.46, 74.66, 68.61, 59.56, 61.52, 52.49, 55.82, 57.3, 58.43, 54.82, 56.16, 46.32, 55.35] },
      velocityScore: { '1D': 3, '1W': 3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 325.6, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.43, PRN: false, RSHO: false, IDEF: 1.02, BILT: false },
      tonyNote: 'Kratos Defense is a defense technology company focused on unmanned systems, satellite communications, and high-performance computing for government customers. It appears in Industrials ETFs as an AI-adjacent defense name — autonomous systems and AI-driven surveillance are direct end markets. Revenue grew and the government contract backlog is expanding.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 1.38, proScore: 0.55, coverage: 0.4,
      price: 73.14, weeklyPrices: [77.92, 75.06, 74.34, 72.77, 73.14], weeklyChange: -6.13, dayChange: 0.51, sortRank: 0, periodReturns: { '1M': 2.6, 'YTD': 21.7, '6M': 20.2, '1Y': 24.7 },
      priceHistory: { '1D': [72.77, 73.09, 72.91, 72.8, 72.68, 72.58, 72.73, 72.49, 72.49, 72.36, 72.26, 72.29, 72.26, 72.36, 72.33, 72.23, 72.29, 72.53, 72.64, 72.63, 72.24, 72.41, 72.76, 73.14], '1W': [77.92, 75.06, 74.34, 72.77, 73.14], '1M': [71.31, 71.66, 72.43, 71.96, 71.59, 71.59, 72.26, 71.62, 72.08, 71.49, 71.25, 73.12, 74.95, 75.79, 75.87, 77.53, 77.92, 75.06, 74.34, 72.77, 73.14], 'YTD': [60.11, 61.15, 60.29, 64.96, 67.26, 66.92, 72.28, 72.98, 76.26, 73.18, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 76.12, 74.73, 79.4, 74.37, 71.66, 72.26, 71.25, 77.53, 73.14], '6M': [60.85, 60.32, 61.55, 64.29, 66.34, 67.85, 71.96, 73.5, 75.88, 73.84, 73.69, 74.46, 72.78, 74.04, 71.44, 70.43, 73.04, 76.12, 74.73, 79.4, 74.37, 71.66, 72.26, 71.25, 77.53, 73.14], '1Y': [58.64, 58.22, 59.35, 57.82, 60.27, 57.89, 57.34, 57.8, 58, 57.2, 58.81, 60.11, 64.01, 64.48, 62.61, 62.46, 58.93, 57.62, 57.94, 59.59, 58.91, 60.93, 62.81, 59.74, 58.26, 59.8, 61.16, 59.56, 61.51, 65.48, 68.5, 68.84, 72.14, 73.97, 75.77, 74.4, 73.69, 74.46, 72.78, 73.01, 70.76, 71.1, 73.32, 73.76, 75.71, 77.88, 74.37, 71.66, 72.26, 71.25, 77.53, 73.14] },
      velocityScore: { '1D': -1.8, '1W': -3.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$89B', pe: 32.1, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.89,
      etfPresence: { AIRR: false, PRN: false, RSHO: 0.92, IDEF: false, BILT: 1.83 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AIR', name: 'AIRBUS GROUP', easyScore: 2, avgWeight: 1.34, proScore: 0.54, coverage: 0.4,
      price: 140.11, weeklyPrices: [143.14, 141.85, 142.93, 142.76, 140.11], weeklyChange: -2.12, dayChange: -1.86, sortRank: 0, periodReturns: { '1M': 26.7, 'YTD': 69.2, '6M': 65.9, '1Y': 96.1 },
      priceHistory: { '1D': [142.76, 143.41, 143.8, 143.77, 143.35, 142.15, 141.63, 141.27, 141.96, 141.66, 141.57, 139.98, 140.16, 139.2, 139.8, 138.94, 138.71, 138, 138.12, 138.56, 138.26, 137.86, 139.41, 140.11], '1W': [143.14, 141.85, 142.93, 142.76, 140.11], '1M': [110.61, 111.36, 115.53, 116.65, 114.72, 120.13, 117.36, 127.23, 129.01, 131.18, 132.14, 134.88, 134.28, 132.26, 132.94, 138.51, 143.14, 141.85, 142.93, 142.76, 140.11], 'YTD': [82.79, 94.73, 105.74, 105.66, 105.91, 113.09, 112.98, 116.69, 119.77, 107.87, 105.64, 103.49, 103.16, 113.86, 125.99, 116.54, 108.86, 111.9, 111.51, 100.89, 112.82, 111.36, 117.36, 132.14, 138.51, 140.11], '6M': [84.45, 97.03, 105.08, 104.26, 108, 114.34, 113.54, 118.26, 116.84, 108.3, 108.76, 107.81, 109.46, 113.86, 125.99, 116.54, 108.86, 111.9, 111.51, 100.89, 112.82, 111.36, 117.36, 132.14, 138.51, 140.11], '1Y': [71.46, 74.84, 83.64, 76.48, 72.99, 74.79, 77.15, 71.73, 75.81, 75.3, 74.19, 75.3, 86.34, 81.8, 78.32, 83.01, 85.69, 84.22, 82.25, 80.08, 77.35, 83.21, 82.7, 83.68, 82.71, 84.51, 88.02, 98.23, 103.67, 105.47, 109.89, 113.11, 114.63, 117.06, 118.61, 108.32, 108.76, 107.81, 109.46, 120.78, 122.75, 111.5, 105.69, 118.71, 107.47, 107.51, 112.82, 111.36, 117.36, 132.14, 138.51, 140.11] },
      velocityScore: { '1D': 0, '1W': 58.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: 30.8, revenueGrowth: 25, eps: 4.55, grossMargin: 19, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 2.51, BILT: false },
      tonyNote: 'AIRBUS GROUP appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RBC', name: 'RBC Bearings Incorporated', easyScore: 2, avgWeight: 1.18, proScore: 0.47, coverage: 0.4,
      price: 604.56, weeklyPrices: [630.36, 634.78, 644.06, 620.47, 604.56], weeklyChange: -4.09, dayChange: -2.56, sortRank: 0, periodReturns: { '1M': 4.5, 'YTD': 34.8, '6M': 31.8, '1Y': 55.6 },
      priceHistory: { '1D': [620.47, 620.75, 615.15, 612.33, 611.72, 610.2, 605.85, 604.3, 605.04, 603.07, 602.98, 601.34, 601.01, 596.03, 595.78, 592.32, 592.92, 593.05, 593.28, 592.48, 590.8, 593.17, 602.69, 604.56], '1W': [630.36, 634.78, 644.06, 620.47, 604.56], '1M': [578.34, 584.18, 589.76, 590.09, 590.97, 592.41, 576.74, 607.46, 603.64, 616.95, 625.73, 639.18, 645.73, 633.44, 638.94, 648.89, 630.36, 634.78, 644.06, 620.47, 604.56], 'YTD': [448.43, 485, 497.06, 504.07, 499.67, 544.02, 552.44, 562.54, 584.89, 565.64, 546.91, 537.2, 524.38, 553.31, 598.23, 591.32, 594.39, 607.5, 613.1, 565.22, 577.42, 584.18, 576.74, 625.73, 648.89, 604.56], '6M': [458.79, 487.16, 498.82, 504.5, 507.13, 548.2, 552.93, 571.57, 568.58, 560.28, 544.55, 552.23, 543.12, 553.31, 598.23, 591.32, 594.39, 607.5, 613.1, 565.22, 577.42, 584.18, 576.74, 625.73, 648.89, 604.56], '1Y': [388.59, 378.24, 397.33, 388.37, 399.8, 398.07, 401.92, 390.52, 398.71, 387.48, 375.1, 379.98, 384.82, 373.99, 372.64, 372.85, 407.3, 406.45, 431.93, 431.55, 427.81, 444.97, 443.44, 460.17, 451.06, 456.9, 461.21, 488.31, 495.29, 504.54, 516.1, 547.51, 551.65, 565.44, 570.08, 559.52, 544.55, 552.23, 543.12, 580.55, 586.98, 588.74, 584.49, 623.19, 618.91, 571.05, 577.42, 584.18, 576.74, 625.73, 648.89, 604.56] },
      velocityScore: { '1D': 0, '1W': -2.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 66.3, revenueGrowth: 18, eps: 9.12, grossMargin: 45, dividendYield: null,
      etfPresence: { AIRR: 1.85, PRN: false, RSHO: false, IDEF: 0.5, BILT: false },
      tonyNote: 'RBC Bearings Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRCY', name: 'Mercury Systems, Inc.', easyScore: 2, avgWeight: 1.18, proScore: 0.47, coverage: 0.4,
      price: 126.21, weeklyPrices: [109.38, 110.22, 122.33, 123.05, 126.21], weeklyChange: 15.39, dayChange: 2.57, sortRank: 0, periodReturns: { '1M': 11.8, 'YTD': 72.9, '6M': 66, '1Y': 145.4 },
      priceHistory: { '1D': [123.05, 126.14, 127.35, 127.03, 125.33, 124.42, 123.55, 123.96, 125.11, 123.83, 124.31, 123.09, 123.99, 123.82, 123.91, 123.03, 123.7, 123.83, 124.09, 123.97, 124.07, 124.4, 124.85, 126.21], '1W': [109.38, 110.22, 122.33, 123.05, 126.21], '1M': [112.87, 111.59, 117.82, 111.27, 110.94, 108.82, 106.81, 119.32, 120.3, 115.93, 115.5, 113.91, 111.76, 110.87, 105, 105.57, 109.38, 110.22, 122.33, 123.05, 126.21], 'YTD': [73.01, 88.74, 102.95, 99.05, 93.88, 82.2, 82.36, 85.9, 91.01, 89.36, 80.71, 78.29, 69.86, 77.53, 84.09, 83.36, 76.53, 82.96, 92.32, 92.8, 97.11, 111.59, 106.81, 115.5, 105.57, 126.21], '6M': [76.03, 93.48, 103.02, 98.89, 93.89, 85.37, 83.32, 88.76, 89.43, 86.87, 81.35, 74.49, 72.91, 77.53, 84.09, 83.36, 76.53, 82.96, 92.32, 92.8, 97.11, 111.59, 106.81, 115.5, 105.57, 126.21], '1Y': [51.43, 50.96, 51.69, 52.98, 52.17, 52.83, 66.83, 65.64, 68.5, 68.93, 72.24, 75.77, 76.82, 83.5, 73.58, 75.54, 77.6, 76.8, 75.36, 71.26, 66.12, 69.89, 70.58, 74.49, 69.65, 74.93, 81.29, 97.02, 97.1, 101.04, 99.28, 84.36, 86.66, 89.3, 89.18, 86, 81.35, 74.49, 72.91, 80.81, 85.51, 82.61, 74.75, 91.66, 92.5, 94.81, 97.11, 111.59, 106.81, 115.5, 105.57, 126.21] },
      velocityScore: { '1D': 4.4, '1W': 11.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$8B', pe: null, revenueGrowth: 12, eps: -0.23, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: 1.24, PRN: false, RSHO: false, IDEF: 1.12, BILT: false },
      tonyNote: 'Mercury Systems, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, avgWeight: 1.05, proScore: 0.42, coverage: 0.4,
      price: 56.37, weeklyPrices: [46.42, 47.10, 49.92, 54.93, 56.37], weeklyChange: 21.43, dayChange: 2.62, sortRank: 0, periodReturns: { '1M': 3.1, 'YTD': -23, '6M': -26.6, '1Y': 25.2 },
      priceHistory: { '1D': [54.93, 58.76, 58.59, 58.33, 57.5, 56.35, 55.34, 55.63, 55.78, 56.1, 56.23, 55.66, 55.8, 55.63, 55.41, 55.24, 55.47, 55.31, 55.44, 55.39, 55.06, 55.1, 55.78, 56.37], '1W': [46.42, 47.1, 49.92, 54.93, 56.37], '1M': [54.65, 51.84, 54.39, 49.44, 49.64, 48.37, 45.87, 49.58, 47.83, 48.27, 52.03, 50.37, 47.7, 46.38, 44.84, 46.27, 46.42, 47.1, 49.92, 54.93, 56.37], 'YTD': [73.17, 101.28, 109.49, 108.22, 103.8, 95.36, 75.79, 81.27, 93.04, 106.09, 104.08, 102.39, 74.82, 82, 90.18, 82.06, 70.3, 62.89, 62.48, 64.2, 63.52, 51.84, 45.87, 52.03, 46.27, 56.37], '6M': [76.85, 106.22, 108.5, 108.71, 102.87, 97.47, 75.11, 83.6, 91.11, 102.79, 104.06, 101.84, 80.05, 82, 90.18, 82.06, 70.3, 62.89, 62.48, 64.2, 63.52, 51.84, 45.87, 52.03, 46.27, 56.37], '1Y': [45.02, 48.76, 55.74, 50.45, 50.22, 45.78, 50.91, 52.23, 55.45, 62.52, 64.33, 66.12, 68.42, 72.6, 74.71, 75.03, 81.99, 85.6, 74.98, 59.99, 58.96, 67.03, 65.45, 68.44, 71.65, 77.57, 83.99, 107.5, 106.28, 113.34, 111.72, 91.25, 81, 83.44, 98.88, 104.84, 104.06, 101.84, 80.05, 87.75, 92.73, 82.11, 65.98, 63.19, 67.28, 65.76, 63.52, 51.84, 45.87, 52.03, 46.27, 56.37] },
      velocityScore: { '1D': 2.4, '1W': 10.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: 245.1, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.88, PRN: false, RSHO: false, IDEF: 0.22, BILT: false },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DRS', name: 'Leonardo DRS, Inc.', easyScore: 2, avgWeight: 0.53, proScore: 0.21, coverage: 0.4,
      price: 43.72, weeklyPrices: [42.48, 40.95, 42.67, 42.69, 43.72], weeklyChange: 2.92, dayChange: 2.42, sortRank: 0, periodReturns: { '1M': -7.7, 'YTD': 28.2, '6M': 25.7, '1Y': -5.8 },
      priceHistory: { '1D': [42.69, 44.51, 44.07, 44.4, 44.03, 43.47, 43.29, 43.34, 43.3, 43.33, 43.59, 43.04, 43.27, 43.11, 43.12, 43.08, 43.18, 43.03, 43.08, 43.17, 43.17, 43.21, 43.2, 43.72], '1W': [42.48, 40.95, 42.67, 42.69, 43.72], '1M': [47.39, 45.61, 46.71, 46.15, 46.55, 47.35, 46.11, 49.69, 48.53, 46.68, 46.58, 46.08, 44.99, 45.74, 44.69, 44.36, 42.48, 40.95, 42.67, 42.69, 43.72], 'YTD': [34.09, 38.84, 42.26, 40.99, 41.06, 38.93, 38.13, 38.14, 45.49, 47.41, 45.3, 44.4, 43.25, 46.19, 47.54, 43.2, 40.18, 39.7, 42.87, 42.81, 45.35, 45.61, 46.11, 46.58, 44.36, 43.72], '6M': [34.78, 40.99, 42.57, 40.63, 40.45, 40.22, 39.13, 43.82, 45.51, 46.35, 45.6, 44.06, 44.52, 46.19, 47.54, 43.2, 40.18, 39.7, 42.87, 42.81, 45.35, 45.61, 46.11, 46.58, 44.36, 43.72], '1Y': [46.41, 47.57, 48.13, 48.44, 41.67, 41.49, 41.74, 41.04, 42.47, 41.2, 42.07, 41.44, 43.94, 44.39, 43.23, 39.34, 40.53, 36.05, 35.31, 34.53, 33.08, 34.17, 33.9, 34.46, 33.64, 34.13, 37.01, 41.27, 42.07, 42.16, 41.51, 39.48, 39.9, 42.36, 46.95, 46.16, 45.6, 44.06, 44.52, 47.93, 46.29, 42.07, 39.47, 41.79, 42.5, 44.56, 45.35, 45.61, 46.11, 46.58, 44.36, 43.72] },
      velocityScore: { '1D': 0, '1W': -8.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 40.9, revenueGrowth: 6, eps: 1.07, grossMargin: 24, dividendYield: 0.84,
      etfPresence: { AIRR: 0.77, PRN: false, RSHO: false, IDEF: 0.28, BILT: false },
      tonyNote: 'Leonardo DRS, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TPC', name: 'Tutor Perini Corporation', easyScore: 2, avgWeight: 0.38, proScore: 0.15, coverage: 0.4,
      price: 76.75, weeklyPrices: [79.53, 81.88, 82.97, 79.51, 76.75], weeklyChange: -3.5, dayChange: -3.47, sortRank: 0, periodReturns: { '1M': 3.3, 'YTD': 14.5, '6M': 10.7, '1Y': 59.3 },
      priceHistory: { '1D': [79.51, 80.3, 79.99, 80.34, 79.73, 78.87, 78.15, 77.74, 78.3, 77.82, 77.01, 76.48, 76.59, 76.08, 76.14, 76.06, 75.86, 76.21, 76.39, 76.47, 76.1, 76.12, 76.21, 76.75], '1W': [79.53, 81.88, 82.97, 79.51, 76.75], '1M': [74.29, 72.26, 72.38, 70.53, 72.13, 71.48, 68.72, 73.61, 74.92, 76.55, 77.89, 77.99, 81.5, 81, 82.36, 81.56, 79.53, 81.88, 82.97, 79.51, 76.75], 'YTD': [67.02, 70.17, 75.17, 76.01, 78.89, 83.48, 82.74, 84.99, 73.57, 72.04, 71.31, 72.44, 72.83, 77.31, 86.16, 85.11, 86.87, 97.31, 82.69, 74.91, 74.47, 72.26, 68.72, 77.89, 81.56, 76.75], '6M': [69.35, 70.53, 75.09, 77.34, 80.11, 84.07, 82.24, 85.87, 69.95, 71.29, 71.44, 75.25, 77.19, 77.31, 86.16, 85.11, 86.87, 97.31, 82.69, 74.91, 74.47, 72.26, 68.72, 77.89, 81.56, 76.75], '1Y': [48.18, 48.98, 50.08, 47.91, 45.65, 56.41, 57.25, 57.02, 59.93, 62.63, 63.96, 65.48, 64.67, 62.41, 60.61, 64.22, 67.67, 67.69, 67.4, 59.64, 59.75, 68.55, 67.82, 67.34, 69.99, 68.66, 71.79, 74.25, 74.13, 78.53, 82.33, 86, 81.1, 86.1, 73.71, 69.83, 71.44, 75.25, 77.19, 80.54, 86.25, 84.19, 86.04, 96.98, 80.64, 76.99, 74.47, 72.26, 68.72, 77.89, 81.56, 76.75] },
      velocityScore: { '1D': 0, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 52.6, revenueGrowth: 12, eps: 1.46, grossMargin: 12, dividendYield: 0.3,
      etfPresence: { AIRR: 0.71, PRN: false, RSHO: false, IDEF: 0.04, BILT: false },
      tonyNote: 'Tutor Perini Corporation appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TKR', name: 'TIMKEN CO/THE', easyScore: 1, avgWeight: 8.69, proScore: 1.74, coverage: 0.2,
      price: 139.16, weeklyPrices: [141.22, 143.50, 145.32, 141.75, 139.16], weeklyChange: -1.46, dayChange: -1.83, sortRank: 0, periodReturns: { '1M': 5.5, 'YTD': 65.4, '6M': 61.3, '1Y': 81.5 },
      priceHistory: { '1D': [141.75, 142.85, 141.41, 141.59, 140.81, 140.46, 139.47, 139.7, 140.21, 140.16, 139.65, 139, 138.56, 137.34, 137.56, 136.98, 136.75, 136.88, 137.84, 137.6, 137.26, 137.46, 138.13, 139.16], '1W': [141.22, 143.5, 145.32, 141.75, 139.16], '1M': [131.9, 131.82, 133.66, 131.83, 134.67, 137.09, 132.39, 137.4, 137.06, 139.12, 139.4, 142.36, 141.97, 137.64, 137.99, 144.01, 141.22, 143.5, 145.32, 141.75, 139.16], 'YTD': [84.13, 90.6, 93.73, 93.94, 93.19, 106.04, 107.84, 107.83, 109.99, 100.58, 98.74, 98.99, 95.94, 99.17, 106.81, 108.75, 106.88, 109.63, 117.12, 109.36, 127.16, 131.82, 132.39, 139.4, 144.01, 139.16], '6M': [86.29, 91.17, 93.55, 94.02, 94.99, 108.93, 105.54, 109.52, 106.58, 102.18, 98.59, 101.03, 100.57, 99.17, 106.81, 108.75, 106.88, 109.63, 117.12, 109.36, 127.16, 131.82, 132.39, 139.4, 144.01, 139.16], '1Y': [76.67, 78.07, 79.16, 81.66, 73.5, 74.39, 77.08, 75.32, 78.21, 77.78, 77.51, 77.5, 75.55, 76.54, 70.79, 73.17, 77.71, 78.68, 77.95, 77.85, 74.55, 81.39, 83.21, 87.38, 85.26, 86.33, 88.34, 90.83, 90.65, 93.89, 96.14, 109.41, 107.23, 107.69, 105.59, 103.33, 98.59, 101.03, 100.57, 105.88, 103.73, 106.79, 106.53, 119.7, 115.74, 117.2, 127.16, 131.82, 132.39, 139.4, 144.01, 139.16] },
      velocityScore: { '1D': 0, '1W': 0, '1M': -55.6, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 31.7, revenueGrowth: 8, eps: 4.39, grossMargin: 31, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: 8.69, IDEF: false, BILT: false },
      tonyNote: 'TIMKEN CO/THE appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RTX', name: 'RTX CORP', easyScore: 1, avgWeight: 8.38, proScore: 1.68, coverage: 0.2,
      price: 199.25, weeklyPrices: [187.99, 187.33, 189.73, 191.78, 199.25], weeklyChange: 5.99, dayChange: 3.9, sortRank: 0, periodReturns: { '1M': 14.3, 'YTD': 8.6, '6M': 6.4, '1Y': 36.7 },
      priceHistory: { '1D': [191.78, 197.41, 197.07, 197.31, 197.49, 196.19, 196.43, 196.66, 197.42, 197.13, 197.33, 197.23, 197.62, 196.91, 196.59, 196.68, 197.35, 197.48, 197.86, 198.09, 198.52, 198.76, 199.31, 199.25], '1W': [187.99, 187.33, 189.73, 191.78, 199.25], '1M': [174.26, 172.55, 179.41, 180.99, 178.66, 181.56, 177.41, 184.21, 183.53, 183.64, 192.58, 185.6, 181.83, 186.39, 185.06, 186.59, 187.99, 187.33, 189.73, 191.78, 199.25], 'YTD': [183.4, 187.17, 199.83, 195.93, 200.93, 198.66, 200.06, 201.92, 212.16, 208.23, 206.06, 194.82, 187.15, 197.92, 202.81, 187.17, 175.68, 172.87, 178.89, 174.49, 176.59, 172.55, 177.41, 192.58, 186.59, 199.25], '6M': [187.25, 188.5, 201.92, 194.13, 201.09, 196.19, 203.5, 198.46, 206.52, 207, 203.33, 194, 192.9, 197.92, 202.81, 187.17, 175.68, 172.87, 178.89, 174.49, 176.59, 172.55, 177.41, 192.58, 186.59, 199.25], '1Y': [145.75, 146.87, 151.5, 156.88, 156.81, 154.86, 155.08, 156.32, 160.66, 157.52, 155.85, 158.24, 163.35, 166.58, 157.7, 157.95, 179.44, 177.42, 175.1, 173.96, 172.73, 174.91, 171.1, 178.66, 182.01, 184.42, 188.26, 193.85, 196.36, 201.28, 203.5, 195.19, 204.81, 195.98, 208.82, 207.26, 203.33, 194, 192.9, 203.48, 198.39, 180.91, 172.79, 176.74, 178.11, 174.85, 176.59, 172.55, 177.41, 192.58, 186.59, 199.25] },
      velocityScore: { '1D': 0, '1W': 0.6, '1M': -46.3, '6M': null }, isNew: false,
      marketCap: '$268B', pe: 37.4, revenueGrowth: 9, eps: 5.33, grossMargin: 20, dividendYield: 1.52,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 8.38, BILT: false },
      tonyNote: 'RTX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 4.35, proScore: 4.35, coverage: 1,
      price: 215.62, weeklyPrices: [240.30, 261.15, 276.17, 229.18, 215.62], weeklyChange: -10.27, dayChange: -5.92, sortRank: 0, periodReturns: { '1M': -17.3, 'YTD': 157.6, '6M': 139.7, '1Y': 329.1 },
      priceHistory: { '1D': [229.18, 229.81, 236.6, 229.3, 219.69, 214.54, 211.2, 213, 213.97, 211.04, 210.3, 208.59, 209, 210.15, 208.46, 207.97, 209.56, 211.21, 211.95, 213.79, 212.47, 211.03, 213.53, 215.62], '1W': [240.3, 261.15, 276.17, 229.18, 215.62], '1M': [260.58, 251.68, 259.67, 227.81, 218, 220.12, 211.69, 222.24, 232.36, 260.07, 280.91, 286.69, 283.61, 275.25, 259.66, 256.63, 240.3, 261.15, 276.17, 229.18, 215.62], 'YTD': [83.71, 97.3, 103.89, 94.5, 85.19, 86.1, 98.01, 100.61, 91.01, 94.94, 129.85, 114.15, 92.26, 117.4, 161.94, 156.55, 135.51, 175.92, 179.11, 197.73, 208.37, 251.68, 211.69, 280.91, 256.63, 215.62], '6M': [89.95, 97.93, 108.73, 91.46, 88.16, 92.88, 97.52, 102.58, 86.8, 96.43, 116.33, 114.91, 103.76, 117.4, 161.94, 156.55, 135.51, 175.92, 179.11, 197.73, 208.37, 251.68, 211.69, 280.91, 256.63, 215.62], '1Y': [50.25, 44.3, 52.79, 51.37, 52, 68.78, 68.46, 66.18, 72.04, 65.47, 90.41, 99.31, 107.7, 127.98, 129.58, 113.44, 106.16, 124.18, 109.44, 88.63, 84.64, 94.87, 98.04, 87.69, 89.46, 86.04, 92.83, 107.33, 99.29, 97.87, 89.95, 91.79, 101.8, 106.12, 97.78, 112, 116.33, 114.91, 103.76, 125, 166.77, 156.14, 141.19, 195.09, 207.27, 191.82, 208.37, 251.68, 211.69, 280.91, 256.63, 215.62] },
      velocityScore: { '1D': 1.4, '1W': -19.4, '1M': 2.1, '6M': null }, isNew: false,
      marketCap: '$55B', pe: 83.3, revenueGrowth: 684, eps: 2.59, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 3.36, MEME: 6.07, RKNG: 3.61 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 3, avgWeight: 3.48, proScore: 3.48, coverage: 1,
      price: 975.56, weeklyPrices: [1132.33, 1145.28, 1154.29, 1032.28, 975.56], weeklyChange: -13.84, dayChange: -5.49, sortRank: 0, periodReturns: { '1M': -8.3, 'YTD': 241.8, '6M': 209.3, '1Y': 697.7 },
      priceHistory: { '1D': [1032.28, 1040.13, 1057.56, 1035.56, 1013.82, 990.53, 988.41, 998.15, 1001.12, 986.6, 981.3, 971.63, 973.07, 970.17, 972.33, 956.7, 960.03, 961.75, 971.88, 977.3, 964.08, 957.34, 962.15, 975.56], '1W': [1132.33, 1145.28, 1154.29, 1032.28, 975.56], '1M': [1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1213.56, 975.56], '6M': [315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1213.56, 975.56], '1Y': [122.29, 124.53, 114.39, 111.26, 104.88, 118.89, 125.29, 115.79, 122, 131.37, 157.23, 162.73, 157.27, 187.83, 181.6, 202.38, 206.71, 224.01, 238.33, 236.95, 201.37, 236.48, 237.22, 241.14, 265.92, 294.37, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 418.69, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 928.41, 1079.57, 891.88, 1043.19, 1213.56, 975.56] },
      velocityScore: { '1D': -0.6, '1W': 5.5, '1M': 3.6, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 22, revenueGrowth: 346, eps: 44.28, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { BUZZ: 3.54, MEME: 2.87, RKNG: 4.04 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 3, avgWeight: 3.12, proScore: 3.12, coverage: 1,
      price: 33.06, weeklyPrices: [39.16, 37.77, 37.30, 35.52, 33.06], weeklyChange: -15.58, dayChange: -6.93, sortRank: 0, periodReturns: { '1M': -30.9, 'YTD': 34.8, '6M': 17.6, '1Y': 216.4 },
      priceHistory: { '1D': [35.52, 35.49, 35.4, 34.69, 33.84, 32.88, 32.72, 32.59, 32.78, 32.19, 31.98, 31.9, 32.1, 32.25, 32.13, 32.13, 32.2, 32.22, 32.53, 32.47, 32.31, 32.27, 32.63, 33.06], '1W': [39.16, 37.77, 37.3, 35.52, 33.06], '1M': [47.86, 44.71, 44.15, 39.62, 40.94, 41.91, 38.92, 41.47, 42.7, 46.47, 45.57, 46.59, 45.2, 45.27, 41.98, 40.95, 39.16, 37.77, 37.3, 35.52, 33.06], 'YTD': [24.52, 31.94, 35.22, 37.69, 33.88, 34.95, 35.28, 30, 27.93, 27.03, 27.71, 27.26, 20.55, 25.18, 31.47, 31.32, 32.11, 39.88, 43.93, 36.62, 48.98, 44.71, 38.92, 45.57, 40.95, 33.06], '6M': [28.11, 37.68, 37.4, 36.18, 34.8, 38.26, 33.56, 30.66, 26.15, 27.4, 27.51, 26.79, 23.74, 25.18, 31.47, 31.32, 32.11, 39.88, 43.93, 36.62, 48.98, 44.71, 38.92, 45.57, 40.95, 33.06], '1Y': [10.45, 9.18, 11.93, 10.75, 12.52, 14.2, 14.55, 15.77, 16.6, 13.89, 18.68, 20.48, 21.71, 26.53, 33.99, 34.24, 33.38, 33.95, 31.08, 23.06, 21.37, 27.1, 31.22, 27.86, 27.85, 24.81, 30.2, 38.21, 35.46, 41.35, 36.7, 37.47, 31.91, 29.08, 28.65, 28.52, 27.51, 26.79, 23.74, 27.79, 30.81, 32.43, 32.69, 44.24, 45.48, 39.52, 48.98, 44.71, 38.92, 45.57, 40.95, 33.06] },
      velocityScore: { '1D': -1.9, '1W': -18.7, '1M': -21, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 1.87, MEME: 4.3, RKNG: 3.2 },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 4.63, proScore: 3.08, coverage: 0.667,
      price: 270.89, weeklyPrices: [252.02, 275.01, 302.70, 289.50, 270.89], weeklyChange: 7.49, dayChange: -6.43, sortRank: 0, periodReturns: { '1M': -10.6, 'YTD': 211.8, '6M': 174.5, '1Y': 1017.5 },
      priceHistory: { '1D': [289.5, 293.7, 299.09, 299.48, 288.93, 281.38, 273.3, 271, 271.06, 268.02, 266.67, 263.28, 263.67, 261.78, 260.79, 258.51, 259.53, 260.95, 264.51, 266.49, 263.61, 264.02, 266.35, 270.89], '1W': [252.02, 275.01, 302.7, 289.5, 270.89], '1M': [302.85, 287.32, 291.37, 263.61, 253.57, 259.61, 234.23, 248.88, 260.22, 274.5, 284.99, 328.91, 345.85, 321.98, 326.19, 309.18, 252.02, 275.01, 302.7, 289.5, 270.89], 'YTD': [86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 160.28, 166, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 261.34, 293.8, 287.32, 234.23, 284.99, 309.18, 270.89], '6M': [98.69, 134.07, 149.5, 139.62, 156.13, 155.17, 145.32, 166.2, 153.02, 154, 160.05, 145.88, 135.49, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 261.34, 293.8, 287.32, 234.23, 284.99, 309.18, 270.89], '1Y': [24.24, 25.4, 24.99, 34.34, 36.72, 36.8, 45.11, 44.83, 54.8, 57.07, 67.26, 84.93, 70.32, 90.29, 86.87, 111.5, 101.42, 127.85, 136.86, 103.55, 93.38, 109.24, 119.18, 94.98, 88.82, 88.41, 103.87, 136.87, 151.75, 152.31, 168.89, 148.7, 157.27, 174.77, 164.78, 159.21, 160.05, 145.88, 135.49, 146.78, 213.84, 229.75, 287.97, 285.47, 289.76, 282.31, 293.8, 287.32, 234.23, 284.99, 309.18, 270.89] },
      velocityScore: { '1D': 4.4, '1W': -24.5, '1M': -24.3, '6M': null }, isNew: false,
      marketCap: '$77B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.88, RKNG: 3.37 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 4.54, proScore: 3.02, coverage: 0.667,
      price: 1745, weeklyPrices: [2090.71, 2050.39, 2273.73, 2032.22, 1745.00], weeklyChange: -16.54, dayChange: -14.13, sortRank: 0, periodReturns: { '1M': 1.7, 'YTD': 635.1, '6M': 534, '1Y': 3660 },
      priceHistory: { '1D': [2032.22, 1980, 2008.37, 1940.23, 1885.15, 1833, 1796.4, 1807.78, 1825.02, 1804.86, 1801.49, 1763.98, 1762, 1765.28, 1757.56, 1721.18, 1715.34, 1723.69, 1733.05, 1746.59, 1723.48, 1723.39, 1721.69, 1745], '1W': [2090.71, 2050.39, 2273.73, 2032.22, 1745], '1M': [1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 1745], 'YTD': [237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.94, 1831.5, 1643.23, 1958.8, 2335, 1745], '6M': [275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 565.41, 618.89, 720.17, 702.48, 635.34, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.94, 1831.5, 1643.23, 1958.8, 2335, 1745], '1Y': [46.41, 46.09, 42.19, 42.48, 41.33, 44.34, 46.68, 45.5, 50.87, 68.55, 86.13, 102.21, 97.12, 128.41, 116.91, 140.16, 167.05, 195.82, 207.69, 243.57, 195.96, 223.28, 228.47, 206.18, 237.61, 244.25, 274.08, 389.27, 453.12, 481.43, 695.51, 541.64, 600.4, 632.38, 599.06, 655.43, 720.17, 702.48, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1447.23, 1392.56, 1589.94, 1831.5, 1643.23, 1958.8, 2335, 1745] },
      velocityScore: { '1D': 4.5, '1W': -34.8, '1M': -33, '6M': null }, isNew: false,
      marketCap: '$258B', pe: 59.6, revenueGrowth: 251, eps: 29.26, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.34, RKNG: 3.73 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 2, avgWeight: 4.22, proScore: 2.82, coverage: 0.667,
      price: 539, weeklyPrices: [586.45, 651.88, 638.72, 598.37, 539.00], weeklyChange: -8.09, dayChange: -9.92, sortRank: 0, periodReturns: { '1M': -4.3, 'YTD': 212.9, '6M': 187.2, '1Y': 715.7 },
      priceHistory: { '1D': [598.37, 595.47, 599.97, 586.33, 573.06, 560.79, 555.76, 556.66, 559.92, 553.15, 547.08, 540.95, 540.72, 536.66, 533.32, 528.01, 529, 529.64, 535.01, 538.8, 536.91, 536.33, 537.54, 539], '1W': [586.45, 651.88, 638.72, 598.37, 539], '1M': [563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539], 'YTD': [172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 530.6, 594.11, 490.09, 712.13, 675.39, 539], '6M': [187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 266.22, 313.81, 301.05, 270.49, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 530.6, 594.11, 490.09, 712.13, 675.39, 539], '1Y': [66.08, 66.14, 68, 68.82, 76.55, 74.97, 76.24, 74.66, 82.04, 92.04, 97.66, 106.63, 106.88, 131.31, 115.42, 126.2, 125.72, 138.13, 163.6, 157.16, 140.23, 163.33, 168.89, 176.34, 181.08, 179.68, 187.88, 212.14, 222.97, 252.66, 290.24, 262.56, 296.56, 290.95, 261.3, 268.81, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 459.62, 530.6, 594.11, 490.09, 712.13, 675.39, 539] },
      velocityScore: { '1D': -2.4, '1W': -24.8, '1M': 13.3, '6M': null }, isNew: false,
      marketCap: '$186B', pe: 32.3, revenueGrowth: 46, eps: 16.69, grossMargin: 45, dividendYield: 0.1,
      etfPresence: { BUZZ: false, MEME: 4.79, RKNG: 3.66 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 2, avgWeight: 4, proScore: 2.67, coverage: 0.667,
      price: 85.13, weeklyPrices: [71.45, 86.77, 88.86, 86.10, 85.13], weeklyChange: 19.15, dayChange: -1.13, sortRank: 0, periodReturns: { '1M': -28, 'YTD': 17.2, '6M': 2, '1Y': 86.7 },
      priceHistory: { '1D': [86.1, 88.61, 89.32, 87.86, 86.4, 84.53, 84.56, 84.86, 86.03, 84.68, 85.08, 84.56, 84.26, 83.38, 83.41, 82.74, 83.2, 83.07, 83.62, 83.03, 82.7, 82.92, 84, 85.13], '1W': [71.45, 86.77, 88.86, 86.1, 85.13], '1M': [118.17, 107.73, 107.29, 93.6, 92.06, 88.71, 87.32, 97.56, 82.41, 87.57, 85.43, 80.66, 73.19, 72.87, 68.01, 65.62, 71.45, 86.77, 88.86, 86.1, 85.13], 'YTD': [72.63, 90.56, 101.25, 113.57, 111.21, 101.79, 82.51, 83.9, 86.92, 89.76, 89.11, 88.42, 73.82, 92.57, 88.57, 80.01, 71.88, 63.87, 72.96, 88.1, 129.6, 107.73, 87.32, 85.43, 65.62, 85.13], '6M': [83.47, 97.67, 115.77, 104.78, 104.55, 102.12, 83.03, 85.82, 92.68, 87.53, 95.7, 86.98, 82.87, 92.57, 88.57, 80.01, 71.88, 63.87, 72.96, 88.1, 129.6, 107.73, 87.32, 85.43, 65.62, 85.13], '1Y': [45.6, 45.58, 57.98, 54.33, 52.46, 46.63, 48.5, 44.98, 48.95, 42.41, 38.72, 45.1, 49.09, 67.76, 82.03, 83.49, 71.72, 76.68, 65.28, 61.44, 50.7, 56.2, 73.92, 76.7, 75.84, 71.47, 90.92, 98.39, 112.44, 111.34, 115.76, 96.27, 84.43, 82.36, 104.89, 88.21, 95.7, 86.98, 82.87, 96.46, 86.91, 84.66, 69.85, 70.68, 74.81, 89.58, 129.6, 107.73, 87.32, 85.43, 65.62, 85.13] },
      velocityScore: { '1D': 0, '1W': -20.3, '1M': -42.2, '6M': null }, isNew: false,
      marketCap: '$33B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.28, MEME: 5.72, RKNG: false },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'LITE', name: 'LITE', easyScore: 2, avgWeight: 3.81, proScore: 2.54, coverage: 0.667,
      price: 728.32, weeklyPrices: [816.98, 851.40, 858.06, 801.16, 728.32], weeklyChange: -10.85, dayChange: -9.09, sortRank: 0, periodReturns: { '1M': -29.2, 'YTD': 97.6, '6M': 88.6, '1Y': 685.3 },
      priceHistory: { '1D': [801.16, 785.28, 794.48, 781.19, 771.01, 755.79, 750.76, 745.54, 744.42, 736.42, 732.2, 725.32, 728.4, 724.26, 720.22, 714.6, 714.3, 713.49, 718.03, 722.11, 715.44, 721.68, 722.41, 728.32], '1W': [816.98, 851.4, 858.06, 801.16, 728.32], '1M': [1029.15, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 869.98, 850, 893.93, 827.92, 842.53, 861.97, 816.98, 851.4, 858.06, 801.16, 728.32], 'YTD': [368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 890.09, 902.31, 938, 853.26, 869.98, 861.97, 728.32], '6M': [386.11, 351.42, 324.25, 332.45, 423.42, 577.15, 600.42, 688.27, 694.43, 672, 649.56, 801.99, 702.76, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 890.09, 902.31, 938, 853.26, 869.98, 861.97, 728.32], '1Y': [92.75, 92.99, 102.22, 104.52, 106.68, 116.27, 114.62, 117.43, 135.55, 149.46, 163.02, 168.73, 160.75, 163.81, 149.61, 164.77, 168.5, 200.13, 239.68, 226.86, 233.24, 325.16, 331.41, 324.35, 371.43, 372.61, 357.05, 339.87, 356.83, 370.66, 435.1, 561.13, 594.26, 723.39, 680.8, 672, 649.56, 801.99, 702.76, 896.02, 824.01, 873.6, 858.32, 944.28, 1030.37, 868.07, 902.31, 938, 853.26, 869.98, 861.97, 728.32] },
      velocityScore: { '1D': -1.2, '1W': -18.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$57B', pe: 128, revenueGrowth: 90, eps: 5.69, grossMargin: 41, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.59, RKNG: 3.04 },
      tonyNote: 'LITE appears in 2 of 3 Meme ETFs (67% coverage) with average weight 3.8% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 2, avgWeight: 3.6, proScore: 2.4, coverage: 0.667,
      price: 38.82, weeklyPrices: [47.21, 45.91, 45.73, 43.32, 38.82], weeklyChange: -17.77, dayChange: -10.39, sortRank: 0, periodReturns: { '1M': -41.7, 'YTD': 2.8, '6M': -9.1, '1Y': 130.8 },
      priceHistory: { '1D': [43.32, 42.44, 42.92, 42.15, 41.11, 39.91, 39.51, 39.21, 39.07, 38.64, 38.27, 38.01, 37.97, 38.12, 38.78, 38.5, 38.71, 38.96, 39.43, 39.11, 38.81, 38.92, 38.81, 38.82], '1W': [47.21, 45.91, 45.73, 43.32, 38.82], '1M': [66.6, 65.48, 61.86, 54.35, 59.19, 54.02, 51.52, 56.71, 59.77, 60.85, 58.11, 59.96, 56.87, 54.72, 50.3, 47.74, 47.21, 45.91, 45.73, 43.32, 38.82], 'YTD': [37.77, 45.68, 51.89, 56.68, 53.74, 41.83, 42.22, 42.36, 41.39, 38.84, 44.94, 42.16, 31.62, 35.74, 47.37, 45.17, 44.44, 54.74, 56.56, 47.74, 67.84, 65.48, 51.52, 58.11, 47.74, 38.82], '6M': [42.7, 46.03, 57.82, 52.36, 53.08, 46.15, 40.97, 45.45, 38.85, 38.12, 42.96, 41.12, 34.28, 35.74, 47.37, 45.17, 44.44, 54.74, 56.56, 47.74, 67.84, 65.48, 51.52, 58.11, 47.74, 38.82], '1Y': [16.82, 16.23, 17.94, 17.72, 15.4, 18.45, 19.08, 19.59, 23.04, 26.15, 33.96, 38.64, 41.86, 50.46, 59.77, 60.72, 55.86, 58.22, 66.96, 48.65, 43.47, 47.81, 44.71, 40.13, 39.92, 39.41, 48.24, 50.33, 54.26, 59.99, 54.39, 42.93, 42.08, 44.03, 43.84, 41.98, 42.96, 41.12, 34.28, 36.83, 48.82, 48.39, 42.86, 60.98, 55.17, 52.71, 67.84, 65.48, 51.52, 58.11, 47.74, 38.82] },
      velocityScore: { '1D': -2, '1W': -39.1, '1M': -40.9, '6M': null }, isNew: false,
      marketCap: '$14B', pe: 50.4, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 2.59, MEME: 4.61, RKNG: false },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'AMD', name: 'AMD', easyScore: 2, avgWeight: 3.44, proScore: 2.3, coverage: 0.667,
      price: 517.82, weeklyPrices: [521.58, 539.49, 580.91, 540.88, 517.82], weeklyChange: -0.72, dayChange: -4.26, sortRank: 0, periodReturns: { '1M': -0.7, 'YTD': 141.8, '6M': 131.7, '1Y': 275.5 },
      priceHistory: { '1D': [540.88, 533.49, 544.83, 539.84, 524.78, 517.8, 518.21, 518.26, 521.58, 517.25, 519.22, 512.65, 513.35, 512.07, 512.77, 509.43, 510.22, 511.94, 514.1, 514.98, 509.58, 509.84, 511.7, 517.82], '1W': [521.58, 539.49, 580.91, 540.88, 517.82], '1M': [521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 542.52, 452.4, 512.48, 532.57, 517.82], '6M': [223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 542.52, 452.4, 512.48, 532.57, 517.82], '1Y': [137.91, 146.42, 156.99, 166.47, 171.7, 172.76, 180.95, 163.71, 168.58, 151.14, 158.57, 157.39, 159.46, 164.67, 214.9, 233.08, 234.99, 254.84, 237.7, 247.96, 206.02, 217.53, 217.97, 210.78, 213.43, 215.61, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 204.83, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 495.54, 542.52, 452.4, 512.48, 532.57, 517.82] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$844B', pe: 174.4, revenueGrowth: 38, eps: 2.97, grossMargin: 53, dividendYield: null,
      etfPresence: { BUZZ: 3.32, MEME: false, RKNG: 3.57 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab', easyScore: 2, avgWeight: 3.25, proScore: 2.17, coverage: 0.667,
      price: 100.46, weeklyPrices: [84.54, 98.01, 101.65, 100.07, 100.46], weeklyChange: 18.83, dayChange: 0.39, sortRank: 0, periodReturns: { '1M': -18.5, 'YTD': 44, '6M': 32.2, '1Y': 181.7 },
      priceHistory: { '1D': [100.07, 105.75, 106.8, 105.58, 102.57, 100.08, 99.79, 100.07, 101.02, 100.02, 100.18, 100.11, 100.02, 99.22, 98.94, 98.14, 99, 99.15, 99.54, 99.43, 99.06, 99.18, 100.08, 100.46], '1W': [84.54, 98.01, 101.65, 100.07, 100.46], '1M': [123.32, 114.7, 119.95, 110.08, 113.65, 108.23, 105.05, 114.78, 102.39, 109.25, 107.98, 107.24, 100.29, 95.12, 85.41, 80.69, 84.54, 98.01, 101.65, 100.07, 100.46], 'YTD': [69.76, 83.08, 90.76, 88.9, 80.07, 72.32, 67.44, 70.21, 70.97, 71.48, 71.31, 68, 57.38, 66.32, 72.22, 86.64, 78.59, 78.76, 117.56, 127.31, 150.23, 114.7, 105.05, 107.98, 80.69, 100.46], '6M': [75.99, 84.85, 96.3, 80.48, 74.15, 75.84, 69.89, 69.97, 70.13, 68.93, 78.59, 66.07, 64.22, 66.32, 72.22, 86.64, 78.59, 78.76, 117.56, 127.31, 150.23, 114.7, 105.05, 107.98, 80.69, 100.46], '1Y': [35.66, 39.03, 51.39, 47.43, 44.81, 44.69, 42.81, 41.53, 47.91, 45.84, 53.34, 47.79, 46.26, 56.16, 64.26, 66.27, 63.57, 60.92, 49.61, 45.25, 39.48, 42.14, 49.06, 61.49, 70.52, 70.12, 78.14, 87.9, 89.16, 87, 81.27, 72.03, 74.42, 70.2, 71.91, 71.96, 78.59, 66.07, 64.22, 69.08, 73.6, 90.04, 77.02, 84.65, 124.15, 134.28, 150.23, 114.7, 105.05, 107.98, 80.69, 100.46] },
      velocityScore: { '1D': 0.9, '1W': 28.4, '1M': -47.6, '6M': null }, isNew: false,
      marketCap: '$63B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 1.63, MEME: 4.88, RKNG: false },
      tonyNote: 'Rocket Lab is the small-launch and space systems name that Electrification and AI infrastructure ETFs hold for satellite connectivity exposure — relevant to both GPS-dependent grids and low-orbit broadband that supports remote AI compute. Small market cap, no earnings, but consistent revenue growth and a rapidly expanding backlog.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 1, avgWeight: 9.35, proScore: 3.12, coverage: 0.333,
      price: 120.95, weeklyPrices: [135.69, 150.10, 148.16, 139.00, 120.95], weeklyChange: -10.86, dayChange: -12.99, sortRank: 0, periodReturns: { '1M': -40.2, 'YTD': 247, '6M': 205.4, '1Y': 322 },
      priceHistory: { '1D': [139, 134.94, 138.04, 134.16, 130.19, 125.23, 123.75, 122.93, 121.14, 117.8, 117.54, 116.02, 116.4, 115.08, 114.36, 115.15, 115, 114.31, 115.05, 116.04, 115.33, 117.41, 119.38, 120.95], '1W': [135.69, 150.1, 148.16, 139, 120.95], '1M': [202.37, 184.07, 202.89, 177, 196.64, 162.88, 175.13, 172.78, 169.05, 191.55, 167.34, 161.85, 171.23, 147.44, 146.97, 138.54, 135.69, 150.1, 148.16, 139, 120.95], 'YTD': [34.86, 33.01, 37, 35.72, 43.61, 44.3, 44.46, 53.96, 102.51, 110.62, 94.07, 95.76, 85.19, 117.64, 146.39, 150.57, 137.26, 180.57, 188.28, 171.33, 179.83, 184.07, 175.13, 167.34, 138.54, 120.95], '6M': [39.6, 34.04, 37.04, 34.89, 44.16, 47.91, 43.91, 56.27, 95.34, 120.49, 86.33, 113.9, 84.59, 117.64, 146.39, 150.57, 137.26, 180.57, 188.28, 171.33, 179.83, 184.07, 175.13, 167.34, 138.54, 120.95], '1Y': [28.66, 28.4, 28.63, 27.13, 21.53, 21.59, 21.01, 23.7, 25.49, 23.99, 27.07, 28.99, 25.77, 27.93, 27.15, 31.92, 31.4, 35.07, 29.1, 20.91, 19.49, 26.78, 26.59, 32.06, 31.32, 36.75, 34.99, 33.72, 39.26, 37.39, 46.12, 48.49, 43.44, 58.12, 99.71, 127.01, 86.33, 113.9, 84.59, 132.7, 142.55, 149.42, 152.83, 178.54, 223.1, 165.26, 179.83, 184.07, 175.13, 167.34, 138.54, 120.95] },
      velocityScore: { '1D': -3.7, '1W': -19.6, '1M': -28.4, '6M': null }, isNew: false,
      marketCap: '$10B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 9.35, RKNG: false },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'QBTS', name: 'D-Wave Quantum', easyScore: 1, avgWeight: 5.11, proScore: 1.7, coverage: 0.333,
      price: 22.53, weeklyPrices: [22.76, 23.83, 23.99, 23.50, 22.53], weeklyChange: -1.01, dayChange: -4.13, sortRank: 0, periodReturns: { '1M': -24.7, 'YTD': -13.8, '6M': -19.9, '1Y': 34.2 },
      priceHistory: { '1D': [23.5, 23.98, 24.64, 24.33, 23.69, 23.18, 22.87, 22.89, 23.02, 22.69, 22.72, 22.55, 22.71, 22.68, 22.6, 22.35, 22.43, 22.52, 22.71, 22.67, 22.61, 22.51, 22.56, 22.53], '1W': [22.76, 23.83, 23.99, 23.5, 22.53], '1M': [29.91, 27.55, 27.64, 23.85, 25.83, 23.52, 23.25, 23.82, 23.37, 26.26, 22.92, 24.69, 24.47, 25.03, 22.98, 21.91, 22.76, 23.83, 23.99, 23.5, 22.53], 'YTD': [26.15, 29.28, 28.72, 25.63, 21.22, 20.72, 19.67, 18.05, 18.94, 19.04, 17.46, 16.31, 12.98, 13.74, 16.97, 20.36, 18.11, 21.54, 22.35, 18.19, 27.48, 27.55, 23.25, 22.92, 21.91, 22.53], '6M': [28.13, 28.11, 28.83, 23.75, 20.97, 21.21, 18.44, 18.66, 18.24, 18.76, 17.47, 15.93, 14.43, 13.74, 16.97, 20.36, 18.11, 21.54, 22.35, 18.19, 27.48, 27.55, 23.25, 22.92, 21.91, 22.53], '1Y': [16.79, 14.81, 18.89, 18.87, 16.38, 16.9, 18.18, 14.81, 15.92, 15.37, 17.76, 26.88, 26.76, 32.7, 33.02, 38.33, 31.06, 36.11, 28.39, 23.39, 20.51, 22.67, 27, 26.1, 26.82, 26.15, 30.64, 28.8, 27.04, 24.69, 21.4, 20.44, 19.07, 19.65, 18.91, 18.91, 17.47, 15.93, 14.43, 14.57, 20.81, 21.24, 18.27, 23.83, 21.44, 19.3, 27.48, 27.55, 23.25, 22.92, 21.91, 22.53] },
      velocityScore: { '1D': -2.3, '1W': -13.3, '1M': -48.3, '6M': null }, isNew: false,
      marketCap: '$8B', pe: null, revenueGrowth: -81, eps: -1.14, grossMargin: 66, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.11, RKNG: false },
      tonyNote: 'D-Wave Quantum is a quantum computing company — the only publicly traded business built around quantum annealing hardware. Revenue is minimal and profitability is many years away, but it holds a position in Meme ETFs as the purest-play quantum computing stock available to retail investors. The ETF weight is small and the position is purely thematic.',
    },
    {
      ticker: 'COHR', name: 'COHR', easyScore: 1, avgWeight: 4.82, proScore: 1.61, coverage: 0.333,
      price: 333.36, weeklyPrices: [380.56, 391.22, 394.47, 368.65, 333.36], weeklyChange: -12.4, dayChange: -9.57, sortRank: 0, periodReturns: { '1M': -21.9, 'YTD': 80.6, '6M': 71.5, '1Y': 266.7 },
      priceHistory: { '1D': [368.65, 360.54, 368.76, 359.2, 352.11, 342.84, 341.63, 340.5, 340.54, 337.86, 337.62, 330.87, 334.2, 330.97, 332.23, 327.95, 328.09, 327.41, 329.23, 331.6, 329.33, 328.75, 331.1, 333.36], '1W': [380.56, 391.22, 394.47, 368.65, 333.36], '1M': [426.89, 417.43, 421.9, 376.99, 401.93, 355.94, 354.77, 363.58, 385.03, 413.84, 378.85, 389.57, 425.48, 381.22, 392.5, 407.25, 380.56, 391.22, 394.47, 368.65, 333.36], 'YTD': [184.57, 173.15, 195.96, 196.94, 212.18, 227.68, 217.23, 248.89, 298.91, 252.32, 247.37, 255.05, 219.65, 255.1, 313.42, 343.79, 303.97, 335.73, 374.01, 353.63, 380.18, 417.43, 354.77, 378.85, 407.25, 333.36], '6M': [194.33, 178.06, 191.04, 197.76, 222.44, 242.46, 219.96, 254.86, 280.81, 260.64, 245.8, 272.33, 238.21, 255.1, 313.42, 343.79, 303.97, 335.73, 374.01, 353.63, 380.18, 417.43, 354.77, 378.85, 407.25, 333.36], '1Y': [90.9, 93.3, 99.6, 100.14, 102.79, 115.44, 91.65, 86.6, 95.2, 97.84, 102.99, 109.11, 106.99, 113.58, 111.1, 116.35, 121.52, 132.71, 159.3, 139.97, 135.61, 164.26, 181.79, 178.34, 185.83, 189.02, 186.36, 185.18, 193.46, 214, 229.18, 228.37, 223.89, 267.9, 274.86, 251.41, 245.8, 272.33, 238.21, 281.79, 308.2, 350.47, 304.93, 344.67, 403.71, 358.5, 380.18, 417.43, 354.77, 378.85, 407.25, 333.36] },
      velocityScore: { '1D': -1.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$65B', pe: 158.7, revenueGrowth: 21, eps: 2.1, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.82, RKNG: false },
      tonyNote: 'COHR appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 1, avgWeight: 4.63, proScore: 1.54, coverage: 0.333,
      price: 49.12, weeklyPrices: [49.31, 53.88, 53.26, 51.40, 49.12], weeklyChange: -0.39, dayChange: -4.44, sortRank: 0, periodReturns: { '1M': -31.2, 'YTD': 9.5, '6M': 5, '1Y': 10.7 },
      priceHistory: { '1D': [51.4, 52.85, 54.19, 53.59, 52.04, 50.94, 50.33, 50.36, 50.45, 49.83, 49.7, 49.14, 49.37, 49.35, 49.17, 48.68, 48.79, 48.81, 49.15, 48.91, 48.68, 48.56, 48.71, 49.12], '1W': [49.31, 53.88, 53.26, 51.4, 49.12], '1M': [71.4, 68.23, 65.66, 56.78, 62.8, 56.69, 56.63, 57.99, 57.85, 61.18, 54.69, 56.55, 58.32, 57.85, 53.6, 50.56, 49.31, 53.88, 53.26, 51.4, 49.12], 'YTD': [44.87, 50.45, 47.56, 47.25, 39.98, 34.99, 34.11, 30.78, 38.34, 35.87, 33.29, 33.11, 26.59, 28.49, 35.76, 46.28, 43.08, 48, 55.87, 48.44, 65.4, 68.23, 56.63, 54.69, 50.56, 49.12], '6M': [46.77, 49.45, 50.8, 43.37, 38.56, 35.48, 33.18, 31.62, 37.05, 35.12, 33.31, 32.7, 28.83, 28.49, 35.76, 46.28, 43.08, 48, 55.87, 48.44, 65.4, 68.23, 56.63, 54.69, 50.56, 49.12], '1Y': [44.39, 41.81, 46.51, 43.17, 38.12, 41.85, 41.03, 37.17, 43.3, 41.8, 55.61, 70.41, 67.28, 73.28, 70.65, 62.94, 59.37, 60.17, 57.43, 45.4, 41, 49.3, 52.69, 50.35, 48.48, 45.25, 48.71, 50.95, 50.66, 45.49, 38.47, 35.19, 33.34, 33.59, 37.13, 34.27, 33.31, 32.7, 28.83, 28.99, 43.25, 47.36, 42.11, 52.57, 55.26, 52.47, 65.4, 68.23, 56.63, 54.69, 50.56, 49.12] },
      velocityScore: { '1D': -3.7, '1W': -25.2, '1M': -51, '6M': null }, isNew: false,
      marketCap: '$18B', pe: 125.9, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.63, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'AXTI', name: 'AXT Inc', easyScore: 1, avgWeight: 4.54, proScore: 1.51, coverage: 0.333,
      price: 56.62, weeklyPrices: [70.15, 71.46, 72.08, 65.03, 56.62], weeklyChange: -19.29, dayChange: -12.93, sortRank: 0, periodReturns: { '1M': -48.9, 'YTD': 246.3, '6M': 237.8, '1Y': 2545.8 },
      priceHistory: { '1D': [65.03, 65.14, 65.65, 63.89, 61.61, 60.12, 59.04, 59.16, 58.42, 57.13, 56.52, 55.13, 55.64, 54.75, 54.46, 53.56, 53.83, 53.87, 54.51, 55.05, 55.44, 56.26, 56.37, 56.62], '1W': [70.15, 71.46, 72.08, 65.03, 56.62], '1M': [110.85, 106.7, 105.99, 89.04, 90.78, 78.36, 85.29, 88.34, 97.18, 110.74, 92.11, 84.57, 92.44, 77.91, 70.14, 69.06, 70.15, 71.46, 72.08, 65.03, 56.62], 'YTD': [16.35, 25.83, 25.72, 17.4, 18.54, 24.06, 24.24, 28.43, 46.32, 38.56, 48.39, 64.44, 52.73, 45.46, 67.3, 74.97, 68.71, 107.55, 122.9, 112.88, 122.77, 106.7, 85.29, 92.11, 69.06, 56.62], '6M': [16.76, 22.99, 22.09, 17.8, 20.94, 27.77, 23.21, 35.08, 41.76, 44.3, 44.36, 68.44, 56.98, 45.46, 67.3, 74.97, 68.71, 107.55, 122.9, 112.88, 122.77, 106.7, 85.29, 92.11, 69.06, 56.62], '1Y': [2.14, 2.2, 2.44, 2.35, 1.92, 2.14, 2.16, 2.48, 2.92, 3.11, 3.66, 4.34, 4.66, 5.13, 4.03, 4.51, 5.18, 7.32, 8.87, 10.44, 9.45, 10.7, 11.58, 14.81, 14.65, 14.59, 16.67, 22.24, 21.41, 17.2, 19.74, 24.35, 23.54, 40.97, 39.13, 47.36, 44.36, 68.44, 56.98, 53.18, 62.93, 86.94, 71.07, 104.83, 121.94, 104.61, 122.77, 106.7, 85.29, 92.11, 69.06, 56.62] },
      velocityScore: { '1D': -1.9, '1W': 11, '1M': -39.4, '6M': null }, isNew: false,
      marketCap: '$4B', pe: null, revenueGrowth: 39, eps: -0.32, grossMargin: 21, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.54, RKNG: false },
      tonyNote: 'AXT Inc is a compound semiconductor substrate manufacturer — gallium arsenide, indium phosphide, and germanium wafers used in data center optical transceivers, 5G RF chips, and solar cells. Revenue is growing with optical networking demand. Small market cap but positioned at a genuine supply-chain chokepoint for III-V semiconductor materials.',
    },
    {
      ticker: 'CRWV', name: 'CRWV', easyScore: 1, avgWeight: 4.17, proScore: 1.39, coverage: 0.333,
      price: 81.75, weeklyPrices: [96.58, 95.51, 99.54, 85.68, 81.75], weeklyChange: -15.36, dayChange: -4.6, sortRank: 0, periodReturns: { '1M': -31.5, 'YTD': 14.2, '6M': 3.1, '1Y': -50.5 },
      priceHistory: { '1D': [85.69, 86.29, 87.51, 86.17, 84.75, 83.18, 82.58, 82.25, 82.65, 82.42, 81.39, 80.95, 81.23, 81.09, 80.96, 80.75, 80.99, 81.44, 81.79, 81.88, 81.99, 82, 81.63, 81.75], '1W': [96.58, 95.51, 99.54, 85.68, 81.75], '1M': [119.27, 110.93, 108.03, 100.39, 102.37, 98.45, 95.61, 95.74, 100.55, 106.71, 115.21, 117.95, 111.29, 105.72, 100.88, 98.76, 96.58, 95.51, 99.54, 85.68, 81.75], 'YTD': [71.61, 77.09, 95.01, 92.98, 93.19, 89.95, 96.04, 90.84, 78.05, 74.41, 85.86, 81.96, 69.15, 85.24, 117.2, 115.16, 105.53, 127.89, 107.75, 99.81, 104.27, 110.93, 95.61, 115.21, 98.76, 81.75], '6M': [79.32, 80.14, 101.23, 98.31, 88.94, 96.79, 91, 99.3, 73.78, 74.92, 82.12, 83.02, 77.47, 85.24, 117.2, 115.16, 105.53, 127.89, 107.75, 99.81, 104.27, 110.93, 95.61, 115.21, 98.76, 81.75], '1Y': [165.2, 125.84, 123.02, 115.62, 104.14, 129.55, 99.5, 90.79, 102.79, 89.09, 111.96, 124.86, 120.34, 134.79, 138.43, 136.87, 123.34, 131.06, 106.93, 78.34, 69.21, 73.12, 88.3, 78.59, 83, 74.92, 76.86, 89.93, 95.22, 108.86, 90.06, 95.11, 95.45, 98.01, 79.5, 81.96, 82.12, 83.02, 77.47, 88.9, 118.69, 122.54, 114.19, 137.98, 111.31, 101.28, 104.27, 110.93, 95.61, 115.21, 98.76, 81.75] },
      velocityScore: { '1D': 1.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$45B', pe: null, revenueGrowth: 112, eps: -2.72, grossMargin: 69, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.17, RKNG: false },
      tonyNote: 'CRWV appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ALAB', name: 'ALAB', easyScore: 1, avgWeight: 4.01, proScore: 1.34, coverage: 0.333,
      price: 406.42, weeklyPrices: [391.74, 455.96, 483.02, 430.86, 406.42], weeklyChange: 3.75, dayChange: -5.67, sortRank: 0, periodReturns: { '1M': 14.2, 'YTD': 144.3, '6M': 126.3, '1Y': 347.6 },
      priceHistory: { '1D': [430.86, 431.7, 463.4, 447.71, 426.38, 419.5, 413.27, 409.14, 408.52, 409.91, 408.09, 401.58, 403.98, 405.09, 405.2, 400.98, 400.65, 400.48, 399.89, 402.12, 396.21, 397.11, 396.98, 406.42], '1W': [391.74, 455.96, 483.02, 430.86, 406.42], '1M': [355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86, 406.42], 'YTD': [166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 325.33, 363.54, 330.86, 374.68, 398, 406.42], '6M': [179.56, 162.61, 182, 163.25, 152.44, 187.67, 123.69, 128.4, 109.8, 116.48, 127.57, 121.76, 109.6, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 325.33, 363.54, 330.86, 374.68, 398, 406.42], '1Y': [90.8, 95.9, 102.13, 122.23, 131.1, 179.28, 190.69, 177.53, 189.15, 191.2, 229.5, 245.2, 197.78, 200.74, 206.21, 159.8, 163.64, 169.55, 162.83, 144.47, 139.29, 157.57, 161.23, 148.85, 164.4, 170.1, 167.11, 172.57, 183.75, 170.93, 158.52, 182.86, 129.58, 128.15, 113.77, 124.71, 127.57, 121.76, 109.6, 125.46, 172.09, 194.06, 196.85, 213.91, 224.09, 287.48, 325.33, 363.54, 330.86, 374.68, 398, 406.42] },
      velocityScore: { '1D': 3.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$70B', pe: 278.4, revenueGrowth: 93, eps: 1.46, grossMargin: 76, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.01, RKNG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'WEN', name: 'WEN', easyScore: 1, avgWeight: 3.77, proScore: 1.26, coverage: 0.333,
      price: 8.6, weeklyPrices: [7.80, 8.26, 8.29, 8.94, 8.60], weeklyChange: 10.26, dayChange: -3.8, sortRank: 0, periodReturns: { '1M': 19.3, 'YTD': 3.2, '6M': 5.3, '1Y': -26.4 },
      priceHistory: { '1D': [8.94, 9.27, 8.82, 8.85, 8.77, 8.65, 8.68, 8.6, 8.63, 8.69, 8.65, 8.55, 8.52, 8.45, 8.44, 8.33, 8.39, 8.4, 8.43, 8.44, 8.42, 8.53, 8.49, 8.6], '1W': [7.8, 8.26, 8.29, 8.94, 8.6], '1M': [7.21, 6.85, 6.75, 6.71, 6.74, 6.71, 6.63, 6.79, 6.79, 6.91, 6.95, 6.8, 6.17, 6.26, 7.86, 7.33, 7.8, 8.26, 8.29, 8.94, 8.6], 'YTD': [8.33, 8.38, 8.54, 8.42, 7.79, 8.02, 7.48, 7.77, 7.44, 7.27, 7.04, 7.16, 6.78, 6.89, 6.78, 7.11, 6.81, 6.61, 7.9, 8.12, 7.49, 6.85, 6.63, 6.95, 7.33, 8.6], '6M': [8.17, 8.65, 8.32, 8.08, 7.69, 7.81, 7, 7.73, 7.51, 6.98, 7.01, 7.1, 6.95, 6.89, 6.78, 7.11, 6.81, 6.61, 7.9, 8.12, 7.49, 6.85, 6.63, 6.95, 7.33, 8.6], '1Y': [11.68, 11.02, 10.47, 10.76, 9.96, 10.09, 10.55, 10.35, 10.5, 10.33, 9.66, 9.33, 9.21, 9.55, 8.71, 8.88, 9.02, 8.51, 8.83, 8.71, 7.87, 8.45, 8.44, 8.61, 8.38, 8.32, 8.11, 8.5, 8.17, 7.98, 7.78, 7.82, 8.18, 7.49, 7.15, 7.07, 7.01, 7.1, 6.95, 7.06, 6.9, 7.1, 6.76, 6.65, 8.19, 7.75, 7.49, 6.85, 6.63, 6.95, 7.33, 8.6] },
      velocityScore: { '1D': -1.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2B', pe: 11.2, revenueGrowth: 3, eps: 0.77, grossMargin: 34, dividendYield: 6.26,
      etfPresence: { BUZZ: false, MEME: 3.77, RKNG: false },
      tonyNote: 'WEN appears in 1 of 3 Meme ETFs (33% coverage) with average weight 3.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IBRX', name: 'IBRX', easyScore: 1, avgWeight: 3.76, proScore: 1.25, coverage: 0.333,
      price: 9.44, weeklyPrices: [8.71, 8.77, 8.76, 9.20, 9.44], weeklyChange: 8.38, dayChange: 2.61, sortRank: 0, periodReturns: { '1M': 30.6, 'YTD': 376.8, '6M': 367.3, '1Y': 247.1 },
      priceHistory: { '1D': [9.2, 9.3, 9.51, 9.54, 9.49, 9.43, 9.52, 9.41, 9.41, 9.37, 9.38, 9.23, 9.27, 9.19, 9.18, 9.06, 9.08, 9.24, 9.23, 9.36, 9.4, 9.41, 9.4, 9.44], '1W': [8.71, 8.77, 8.76, 9.2, 9.44], '1M': [7.23, 7.18, 7.29, 6.92, 7.17, 7.25, 6.98, 7.2, 7.1, 7.13, 6.99, 7.36, 7.22, 7.32, 7.8, 7.79, 8.71, 8.77, 8.76, 9.2, 9.44], 'YTD': [1.98, 2.24, 3.95, 6.45, 6.25, 6.05, 5.95, 9.83, 10.44, 8.45, 8.21, 9.4, 6.66, 6.86, 7.6, 8.1, 6.96, 7.58, 8.12, 7.76, 7.89, 7.18, 6.98, 6.99, 7.79, 9.44], '6M': [2.02, 2.33, 5.52, 6.21, 6.13, 6.93, 6.02, 11.55, 10, 8.01, 8.21, 7.41, 7.67, 6.86, 7.6, 8.1, 6.96, 7.58, 8.12, 7.76, 7.89, 7.18, 6.98, 6.99, 7.79, 9.44], '1Y': [2.72, 2.81, 2.75, 2.86, 2.37, 2.44, 2.71, 2.24, 2.33, 2.4, 2.6, 2.73, 2.54, 2.54, 2.36, 2.4, 2.39, 2.36, 2.12, 2, 2.02, 2.36, 2.29, 2.36, 2.08, 2.04, 2.08, 2.59, 6.48, 5.95, 6.33, 6.56, 8.54, 9.54, 9, 8.27, 8.21, 7.41, 7.67, 6.98, 7.78, 8.07, 6.96, 8.38, 8.15, 8.05, 7.89, 7.18, 6.98, 6.99, 7.79, 9.44] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: null, revenueGrowth: 168, eps: -0.85, grossMargin: 99, dividendYield: null,
      etfPresence: { BUZZ: 3.76, MEME: false, RKNG: false },
      tonyNote: 'IBRX appears in 1 of 3 Meme ETFs (33% coverage) with average weight 3.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
