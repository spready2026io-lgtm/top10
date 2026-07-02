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
export const SPY_RET: Record<Period, number> = { '1W': 2.8, '1M': -1.4, 'YTD': 9.8, '6M': 9.6, '1Y': 20.7 };
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
  'AI & ML':         { '1W': 1.6, '1M': -6.1, 'YTD': 47.6, '6M': 44.1, '1Y': 81.4 },
  'Semiconductors':  { '1W': -0.7, '1M': -2.3, 'YTD': 108.5, '6M': 102, '1Y': 146.8 },
  'Broad Tech':      { '1W': 2.2, '1M': -5, 'YTD': 29.3, '6M': 27.4, '1Y': 45.6 },
  'Electrification': { '1W': 1.4, '1M': -8, 'YTD': 28.2, '6M': 24.2, '1Y': 48.4 },
  'Industrials':     { '1W': 1.1, '1M': 1, 'YTD': 25.9, '6M': 22.9, '1Y': 40 },
  'Meme':            { '1W': 1.8, '1M': -13.1, 'YTD': 22.2, '6M': 17.5, '1Y': 7.3 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, IndexChartByPeriod> = {
  'AI & ML': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: -0.5, spyReturn: 0.45, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 102.79, 105.78, 102.11, 101.55], spy: [100, 101.65, 102.44, 102.3, 102.76], top10Return: 1.6, spyReturn: 2.8, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.08, 97.49, 89.73, 91.78, 90.24, 87.54, 91.73, 92.54, 97.06, 95.13, 98.86, 99.97, 94.43, 93.26, 94.85, 92.49, 95.05, 97.82, 94.41, 93.89], spy: [100, 99.3, 99.67, 97.1, 97.32, 97.04, 95.51, 97.13, 97.65, 99.38, 97.55, 98.31, 98, 96.58, 96.53, 96.67, 95.97, 97.56, 98.31, 98.18, 98.62], top10Return: -6.1, spyReturn: -1.4, xLabels: ["Jun 4", "Jun 11", "Jun 18", "Jun 25", "Jul 2"] },
    'YTD': { top10: [100, 102.26, 104.35, 105.09, 104.21, 102.1, 102.57, 101.98, 103.51, 102.02, 102.81, 101.55, 92.02, 101.2, 113.52, 117.79, 119.29, 128.76, 134.72, 131.28, 145.63, 155.97, 137.26, 149.81, 149.96, 147.54], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 100.07, 100.65, 99.46, 98.11, 96.11, 92.68, 96.67, 101.84, 103.25, 104.37, 106.14, 108.25, 107.6, 110.05, 110.61, 106.38, 108.66, 107.68, 109.85], top10Return: 47.6, spyReturn: 9.8, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 101.52, 102.77, 102.65, 102.83, 102.42, 100, 101.53, 97.65, 100.13, 101.1, 98.85, 94.58, 98.98, 111.24, 115.12, 116.5, 125.97, 131.55, 128.34, 142.29, 152.38, 134.14, 146.36, 146.48, 144.17], spy: [100, 101.6, 101.24, 101.4, 101.79, 101.58, 99.95, 100.61, 99.58, 99.12, 98.19, 95.61, 95.19, 96.49, 101.65, 103.06, 104.17, 105.94, 108.05, 107.4, 109.85, 110.4, 106.19, 108.46, 107.48, 109.65], top10Return: 44.1, spyReturn: 9.6, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 101.23, 103.78, 105.17, 107.3, 107.88, 109.15, 105.19, 108.53, 109.05, 116.02, 119.85, 118.5, 123.19, 127.24, 124.23, 124.76, 130.3, 125.67, 121.16, 118.56, 121.12, 124.38, 126.85, 118.77, 124.23, 125.63, 128.22, 125.58, 131.22, 127.24, 127.3, 125.21, 127.43, 122.13, 125.24, 126.64, 123.81, 118.41, 130.08, 139.96, 148.49, 147.74, 163.22, 169.78, 161.02, 179.03, 191.78, 168.62, 184.24, 184.59, 181.37], spy: [100, 100.87, 101.22, 102.25, 101.87, 101.9, 103.95, 102.85, 104.22, 104.62, 105.99, 106.74, 106.06, 107.86, 108.17, 106.48, 108.27, 109.57, 108.04, 108.31, 106.8, 109.55, 110.31, 111.08, 109.03, 111.26, 110.84, 112.04, 109.21, 112.09, 111.13, 111.55, 110.06, 110.78, 109.65, 109.14, 108.11, 105.28, 104.82, 108.95, 112.81, 114.63, 114.69, 118.27, 119.64, 118.26, 120.95, 121.56, 116.92, 119.42, 118.35, 120.73], top10Return: 81.4, spyReturn: 20.7, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Semiconductors': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: -1, spyReturn: 0.45, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 103.42, 108.02, 100.3, 99.31], spy: [100, 101.65, 102.44, 102.3, 102.76], top10Return: -0.7, spyReturn: 2.8, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 101.2, 98.67, 87.12, 92.25, 90.79, 87.76, 96.21, 97.63, 103.36, 99, 106.41, 109.92, 99.75, 99.13, 104.24, 98.56, 101.91, 106.43, 98.71, 97.7], spy: [100, 99.3, 99.67, 97.1, 97.32, 97.04, 95.51, 97.13, 97.65, 99.38, 97.55, 98.31, 98, 96.58, 96.53, 96.67, 95.97, 97.56, 98.31, 98.18, 98.62], top10Return: -2.3, spyReturn: -1.4, xLabels: ["Jun 4", "Jun 11", "Jun 18", "Jun 25", "Jul 2"] },
    'YTD': { top10: [100, 107.01, 113.64, 117.36, 117.24, 119.41, 123.01, 122.39, 125.24, 124.83, 131.62, 130.44, 123.59, 131.74, 147.3, 161.82, 171.93, 187.43, 187.55, 179.92, 209.89, 216.54, 197.75, 218.25, 221.08, 208.51], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 100.07, 100.65, 99.46, 98.11, 96.11, 92.68, 96.67, 101.84, 103.25, 104.37, 106.14, 108.25, 107.6, 110.05, 110.61, 106.38, 108.66, 107.68, 109.85], top10Return: 108.5, spyReturn: 9.8, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 105.46, 110.92, 113.1, 115.3, 116.56, 118.85, 120.21, 117.08, 121.81, 128.33, 128.52, 125, 127.97, 142.97, 157.18, 167.13, 182.03, 181.78, 174.37, 203.57, 209.91, 191.9, 211.79, 214.38, 202], spy: [100, 101.6, 101.24, 101.4, 101.79, 101.58, 99.95, 100.61, 99.58, 99.12, 98.19, 95.61, 95.19, 96.49, 101.65, 103.06, 104.17, 105.94, 108.05, 107.4, 109.85, 110.4, 106.19, 108.46, 107.48, 109.65], top10Return: 102, spyReturn: 9.6, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 102.66, 102.93, 104.13, 103.65, 105.1, 111.17, 107.5, 111.65, 109.92, 113.85, 120.92, 119.81, 125.04, 126.05, 127.64, 128.87, 134.69, 135.59, 133.89, 129.15, 140.69, 142.88, 148.86, 140.74, 142.01, 144.46, 150.14, 154.69, 156.06, 161.71, 167.68, 168.89, 174.87, 168.52, 164.29, 156.26, 162.58, 157.56, 167.66, 184.17, 201.41, 204.91, 225.23, 239.64, 223.28, 245.99, 261.81, 234.65, 253.54, 253.41, 246.87], spy: [100, 100.87, 101.22, 102.25, 101.87, 101.9, 103.95, 102.85, 104.22, 104.62, 105.99, 106.74, 106.06, 107.86, 108.17, 106.48, 108.27, 109.57, 108.04, 108.31, 106.8, 109.55, 110.31, 111.08, 109.03, 111.26, 110.84, 112.04, 109.21, 112.09, 111.13, 111.55, 110.06, 110.78, 109.65, 109.14, 108.11, 105.28, 104.82, 108.95, 112.81, 114.63, 114.69, 118.27, 119.64, 118.26, 120.95, 121.56, 116.92, 119.42, 118.35, 120.73], top10Return: 146.8, spyReturn: 20.7, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Broad Tech': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 0.3, spyReturn: 0.45, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 102.57, 104.66, 102.25, 102.22], spy: [100, 101.65, 102.44, 102.3, 102.76], top10Return: 2.2, spyReturn: 2.8, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.02, 98.62, 92.29, 93.42, 91.89, 89.72, 93.41, 94.03, 97.33, 95.47, 97.5, 97.48, 94.42, 93.2, 93.98, 93.12, 95.39, 97.32, 95.06, 95], spy: [100, 99.3, 99.67, 97.1, 97.32, 97.04, 95.51, 97.13, 97.65, 99.38, 97.55, 98.31, 98, 96.58, 96.53, 96.67, 95.97, 97.56, 98.31, 98.18, 98.62], top10Return: -5, spyReturn: -1.4, xLabels: ["Jun 4", "Jun 11", "Jun 18", "Jun 25", "Jul 2"] },
    'YTD': { top10: [100, 103.16, 105.13, 104.89, 102.07, 100.41, 102.1, 101.54, 104.65, 102.5, 102.21, 100.71, 94.12, 101.65, 110.41, 114.18, 113.96, 123, 125.75, 120.89, 129.4, 134.92, 123.07, 130.48, 129.67, 129.34], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 100.07, 100.65, 99.46, 98.11, 96.11, 92.68, 96.67, 101.84, 103.25, 104.37, 106.14, 108.25, 107.6, 110.05, 110.61, 106.38, 108.66, 107.68, 109.85], top10Return: 29.3, spyReturn: 9.8, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 102.65, 103.86, 103.06, 100.99, 100.84, 100.14, 101.55, 100.44, 100.98, 101.38, 98.82, 96.35, 100.14, 108.7, 112.3, 111.95, 121.12, 123.61, 118.91, 127.1, 132.56, 121.01, 128.17, 127.38, 127.21], spy: [100, 101.6, 101.24, 101.4, 101.79, 101.58, 99.95, 100.61, 99.58, 99.12, 98.19, 95.61, 95.19, 96.49, 101.65, 103.06, 104.17, 105.94, 108.05, 107.4, 109.85, 110.4, 106.19, 108.46, 107.48, 109.65], top10Return: 27.4, spyReturn: 9.6, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 100.91, 102.93, 103.69, 103.63, 103.84, 104.32, 102.5, 105.47, 105.24, 109.51, 113.76, 112.88, 116.31, 120.02, 118.44, 117.64, 120.1, 118.72, 112.94, 110.99, 114.41, 115.94, 117.4, 112.1, 115.14, 116.72, 119.51, 118.6, 122.06, 118.51, 119.34, 117.25, 119.5, 118.42, 119.25, 120.29, 118.69, 115.44, 121.83, 127.01, 131.08, 130.22, 140.6, 140.49, 136.61, 146.63, 150.77, 138.87, 147.6, 146.98, 145.62], spy: [100, 100.87, 101.22, 102.25, 101.87, 101.9, 103.95, 102.85, 104.22, 104.62, 105.99, 106.74, 106.06, 107.86, 108.17, 106.48, 108.27, 109.57, 108.04, 108.31, 106.8, 109.55, 110.31, 111.08, 109.03, 111.26, 110.84, 112.04, 109.21, 112.09, 111.13, 111.55, 110.06, 110.78, 109.65, 109.14, 108.11, 105.28, 104.82, 108.95, 112.81, 114.63, 114.69, 118.27, 119.64, 118.26, 120.95, 121.56, 116.92, 119.42, 118.35, 120.73], top10Return: 45.6, spyReturn: 20.7, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Electrification': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 0.1, spyReturn: 0.45, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 102.02, 104.2, 101.23, 101.41], spy: [100, 101.65, 102.44, 102.3, 102.76], top10Return: 1.4, spyReturn: 2.8, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.99, 98.89, 92.85, 92.95, 91.9, 88.94, 92.56, 93.44, 95.57, 94.59, 96.73, 97.81, 93.52, 92.91, 93.47, 90.85, 92.63, 94.61, 91.85, 91.98], spy: [100, 99.3, 99.67, 97.1, 97.32, 97.04, 95.51, 97.13, 97.65, 99.38, 97.55, 98.31, 98, 96.58, 96.53, 96.67, 95.97, 97.56, 98.31, 98.18, 98.62], top10Return: -8, spyReturn: -1.4, xLabels: ["Jun 4", "Jun 11", "Jun 18", "Jun 25", "Jul 2"] },
    'YTD': { top10: [100, 103.61, 108.25, 111.14, 110.01, 113.71, 114.8, 116.45, 117.59, 112.36, 114.18, 114.11, 109.11, 113.86, 123.2, 124.39, 127.87, 136.21, 135.27, 126.87, 138.46, 138.75, 125.52, 132.13, 129.74, 128.17], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 100.07, 100.65, 99.46, 98.11, 96.11, 92.68, 96.67, 101.84, 103.25, 104.37, 106.14, 108.25, 107.6, 110.05, 110.61, 106.38, 108.66, 107.68, 109.85], top10Return: 28.2, spyReturn: 9.8, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 101.34, 106.08, 107.37, 106.47, 111.73, 111.42, 115, 109.95, 109.68, 111.63, 111.42, 108.96, 110.48, 119.49, 120.6, 123.98, 131.99, 131.03, 122.94, 134.08, 134.37, 121.67, 128.04, 125.77, 124.21], spy: [100, 101.6, 101.24, 101.4, 101.79, 101.58, 99.95, 100.61, 99.58, 99.12, 98.19, 95.61, 95.19, 96.49, 101.65, 103.06, 104.17, 105.94, 108.05, 107.4, 109.85, 110.4, 106.19, 108.46, 107.48, 109.65], top10Return: 24.2, spyReturn: 9.6, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 102.51, 104.55, 106.86, 104.25, 104.61, 106.27, 106.48, 108.51, 108.09, 109.88, 112.67, 113.97, 116.95, 121.63, 123.73, 122.19, 124.16, 123.13, 121.42, 120.72, 123.02, 125.3, 125.93, 122.99, 125.12, 126.24, 128.54, 129.54, 133.68, 132.96, 132.97, 133.17, 136.12, 133.15, 133.5, 134.54, 136.03, 135.79, 141.58, 146.98, 150.29, 147.11, 156.93, 158.77, 150.07, 159.18, 160.09, 147.22, 152.24, 148.91, 148.45], spy: [100, 100.87, 101.22, 102.25, 101.87, 101.9, 103.95, 102.85, 104.22, 104.62, 105.99, 106.74, 106.06, 107.86, 108.17, 106.48, 108.27, 109.57, 108.04, 108.31, 106.8, 109.55, 110.31, 111.08, 109.03, 111.26, 110.84, 112.04, 109.21, 112.09, 111.13, 111.55, 110.06, 110.78, 109.65, 109.14, 108.11, 105.28, 104.82, 108.95, 112.81, 114.63, 114.69, 118.27, 119.64, 118.26, 120.95, 121.56, 116.92, 119.42, 118.35, 120.73], top10Return: 48.4, spyReturn: 20.7, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Industrials': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 0.9, spyReturn: 0.45, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 100.61, 101.71, 100.83, 101.04], spy: [100, 101.65, 102.44, 102.3, 102.76], top10Return: 1.1, spyReturn: 2.8, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.84, 100.45, 98.3, 98.48, 98.71, 97.14, 99.41, 99.89, 100.9, 99.19, 100.14, 100.9, 99.88, 99.78, 101.09, 100.05, 100.63, 101.72, 100.85, 101.02], spy: [100, 99.3, 99.67, 97.1, 97.32, 97.04, 95.51, 97.13, 97.65, 99.38, 97.55, 98.31, 98, 96.58, 96.53, 96.67, 95.97, 97.56, 98.31, 98.18, 98.62], top10Return: 1, spyReturn: -1.4, xLabels: ["Jun 4", "Jun 11", "Jun 18", "Jun 25", "Jul 2"] },
    'YTD': { top10: [100, 105.14, 110.48, 110.36, 110.07, 114.34, 117.61, 118.93, 119.73, 114.05, 112.43, 111.38, 107.51, 113.02, 120.2, 119.93, 119.63, 123.81, 124.02, 120.32, 124.3, 123.96, 120.7, 124.73, 126.31, 125.88], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 100.07, 100.65, 99.46, 98.11, 96.11, 92.68, 96.67, 101.84, 103.25, 104.37, 106.14, 108.25, 107.6, 110.05, 110.61, 106.38, 108.66, 107.68, 109.85], top10Return: 25.9, spyReturn: 9.8, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 103.9, 108.31, 107.43, 107.5, 112.4, 114.37, 116.48, 115.48, 112.38, 111.03, 109.15, 108.59, 110.32, 116.93, 116, 116.43, 119.92, 121.54, 117.23, 121.18, 120.99, 117.79, 121.68, 123.21, 122.8], spy: [100, 101.6, 101.24, 101.4, 101.79, 101.58, 99.95, 100.61, 99.58, 99.12, 98.19, 95.61, 95.19, 96.49, 101.65, 103.06, 104.17, 105.94, 108.05, 107.4, 109.85, 110.4, 106.19, 108.46, 107.48, 109.65], top10Return: 22.9, spyReturn: 9.6, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 101.59, 103.19, 103.78, 103.74, 103.81, 105.09, 103.26, 105.89, 105.28, 107.59, 108.48, 108.31, 111.32, 111.66, 110.41, 112, 113.44, 110.55, 108.49, 106.45, 109.28, 110.39, 113.51, 110, 113.19, 115.51, 120.01, 122.93, 124.49, 125.53, 129.71, 130.72, 132.54, 130.36, 125.77, 124.46, 124.45, 122.88, 129.23, 132.58, 133.98, 132.09, 139.33, 138.27, 134, 137.96, 137.92, 133.1, 138.36, 140.54, 140.01], spy: [100, 100.87, 101.22, 102.25, 101.87, 101.9, 103.95, 102.85, 104.22, 104.62, 105.99, 106.74, 106.06, 107.86, 108.17, 106.48, 108.27, 109.57, 108.04, 108.31, 106.8, 109.55, 110.31, 111.08, 109.03, 111.26, 110.84, 112.04, 109.21, 112.09, 111.13, 111.55, 110.06, 110.78, 109.65, 109.14, 108.11, 105.28, 104.82, 108.95, 112.81, 114.63, 114.69, 118.27, 119.64, 118.26, 120.95, 121.56, 116.92, 119.42, 118.35, 120.73], top10Return: 40, spyReturn: 20.7, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Meme': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 0.5, spyReturn: 0.45, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 102.15, 104.64, 103.28, 101.83], spy: [100, 101.65, 102.44, 102.3, 102.76], top10Return: 1.8, spyReturn: 2.8, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.48, 98.13, 91.68, 89.53, 88.18, 85.61, 88.17, 88.99, 92.21, 90.71, 92.76, 93.95, 91.45, 87.81, 86.01, 85.48, 87.02, 89.16, 88.29, 86.95], spy: [100, 99.3, 99.67, 97.1, 97.32, 97.04, 95.51, 97.13, 97.65, 99.38, 97.55, 98.31, 98, 96.58, 96.53, 96.67, 95.97, 97.56, 98.31, 98.18, 98.62], top10Return: -13.1, spyReturn: -1.4, xLabels: ["Jun 4", "Jun 11", "Jun 18", "Jun 25", "Jul 2"] },
    'YTD': { top10: [100, 108.03, 105.55, 106.35, 99.62, 96.61, 93.56, 93.37, 94.8, 92.23, 93.45, 92.11, 85.8, 95.13, 109.79, 112.61, 109.44, 122.46, 125.5, 122.14, 140.11, 139.02, 122.75, 128.86, 121.71, 122.22], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.28, 99.98, 100.07, 100.65, 99.46, 98.11, 96.11, 92.68, 96.67, 101.84, 103.25, 104.37, 106.14, 108.25, 107.6, 110.05, 110.61, 106.38, 108.66, 107.68, 109.85], top10Return: 22.2, spyReturn: 9.8, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 106.14, 103.76, 99.84, 95.3, 95.66, 89.66, 90.85, 88.5, 88.87, 90.4, 88.13, 86.36, 91.61, 105.46, 107.99, 105.28, 117.62, 120.37, 117.37, 134.24, 133.32, 117.88, 123.71, 116.93, 117.47], spy: [100, 101.6, 101.24, 101.4, 101.79, 101.58, 99.95, 100.61, 99.58, 99.12, 98.19, 95.61, 95.19, 96.49, 101.65, 103.06, 104.17, 105.94, 108.05, 107.4, 109.85, 110.4, 106.19, 108.46, 107.48, 109.65], top10Return: 17.5, spyReturn: 9.6, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 103.5, 101.98, 96, 92.77, 91.33, 90.07, 85.88, 84.41, 82.24, 86.62, 88.6, 90.19, 88.42, 88.39, 90.66, 87.56, 93.35, 91.63, 89.22, 88.49, 86.55, 86.6, 86.9, 86.27, 87.42, 90.3, 91.51, 92.07, 92.46, 91.74, 89.73, 90.09, 87.75, 88.99, 95.95, 99.64, 95.45, 93.33, 98.13, 107.93, 110.95, 109.08, 107.81, 114.62, 113.31, 114.8, 115.59, 109.6, 110.28, 105.16, 107.33], spy: [100, 100.87, 101.22, 102.25, 101.87, 101.9, 103.95, 102.85, 104.22, 104.62, 105.99, 106.74, 106.06, 107.86, 108.17, 106.48, 108.27, 109.57, 108.04, 108.31, 106.8, 109.55, 110.31, 111.08, 109.03, 111.26, 110.84, 112.04, 109.21, 112.09, 111.13, 111.55, 110.06, 110.78, 109.65, 109.14, 108.11, 105.28, 104.82, 108.95, 112.81, 114.63, 114.69, 118.27, 119.64, 118.26, 120.95, 121.56, 116.92, 119.42, 118.35, 120.73], top10Return: 7.3, spyReturn: 20.7, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
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
export const SCAN_TIMESTAMP    = '2026-07-02T13:37:11.286Z';
export const SCAN_TIMESTAMP_NY = 'July 2, 2026 at 9:37 AM ET';
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
  { ticker: 'MU', name: `Micron Technology Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 13.15, bestProScore: 5.49, avgProScore: 4.38, price: 1059.51, weeklyChange: -6.43 },
  { ticker: 'NVDA', name: `NVIDIA Corp`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 12.41, bestProScore: 6.07, avgProScore: 4.14, price: 198.25, weeklyChange: 2.97 },
  { ticker: 'AMD', name: `Advanced Micro Devices Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 10.72, bestProScore: 5.04, avgProScore: 3.57, price: 537.00, weeklyChange: 2.96 },
  { ticker: 'AVGO', name: `Broadcom Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 6.37, bestProScore: 2.77, avgProScore: 2.12, price: 370.62, weeklyChange: 1.53 },
  { ticker: 'INTC', name: `INTEL CORPORATION`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.64, bestProScore: 3.39, avgProScore: 2.32, price: 126.25, weeklyChange: -1.61 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.58, bestProScore: 2.90, avgProScore: 2.29, price: 452.44, weeklyChange: 4.65 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.40, bestProScore: 2.53, avgProScore: 2.20, price: 270.38, weeklyChange: 1.35 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 4.18, bestProScore: 2.22, avgProScore: 2.09, price: 262.00, weeklyChange: -6.35 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 4.03, bestProScore: 2.60, avgProScore: 2.02, price: 388.15, weeklyChange: 2.39 },
  { ticker: 'GOOGL', name: `ALPHABET INC CLASS A`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 3.52, bestProScore: 2.96, avgProScore: 1.76, price: 358.61, weeklyChange: 6.29 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': -1.7, '1M': -4.3, 'YTD': 107.7, '6M': 98.9, '1Y': 182.4 },
  ARTY: { '1W': 2.5, '1M': -8.2, 'YTD': 53.8, '6M': 49.4, '1Y': 82.1 },
  BAI:  { '1W': 1.2, '1M': -4.3, 'YTD': 49.3, '6M': 47, '1Y': 74.5 },
  IGPT: { '1W': 0.5, '1M': -2.8, 'YTD': 67, '6M': 62.8, '1Y': 103 },
  IVES: { '1W': 5, '1M': -8.2, 'YTD': 20.2, '6M': 18.7, '1Y': 41.4 },
  ALAI: { '1W': 2.6, '1M': -2.9, 'YTD': 25.1, '6M': 24.4, '1Y': 49.3 },
  CHAT: { '1W': -1.7, '1M': -11.1, 'YTD': 56, '6M': 52.3, '1Y': 90.7 },
  AIFD: { '1W': 2.6, '1M': -7.1, 'YTD': 41.7, '6M': 39.5, '1Y': 75.4 },
  SPRX: { '1W': 1.5, '1M': -8.5, 'YTD': 39.6, '6M': 33.2, '1Y': 84.7 },
  AOTG: { '1W': 3.1, '1M': -3.7, 'YTD': 15.1, '6M': 15.1, '1Y': 30.2 },
  // Semiconductors
  SOXX: { '1W': 1.4, '1M': -1.1, 'YTD': 98.6, '6M': 90.7, '1Y': 147 },
  PSI:  { '1W': 2, '1M': 6.2, 'YTD': 117.6, '6M': 107.1, '1Y': 180.6 },
  XSD:  { '1W': 3.6, '1M': -7.5, 'YTD': 84.2, '6M': 76.6, '1Y': 126.2 },
  DRAM: { '1W': -9.8, '1M': -6.8, 'YTD': 133.6, '6M': 133.6, '1Y': 133.6 },
  // Broad Tech
  PTF:  { '1W': -0.7, '1M': -7.6, 'YTD': 63.6, '6M': 58.4, '1Y': 86.7 },
  WCLD: { '1W': 9.1, '1M': -3.6, 'YTD': -4.3, '6M': -1, '1Y': -6.2 },
  IGV:  { '1W': 7.3, '1M': -9.7, 'YTD': -10.5, '6M': -7.8, '1Y': -13.1 },
  FDTX: { '1W': 2.9, '1M': -3.7, 'YTD': 37.9, '6M': 37.5, '1Y': 45.8 },
  GTEK: { '1W': 2.4, '1M': -0.8, 'YTD': 52.8, '6M': 50.7, '1Y': 70.9 },
  ARKK: { '1W': 6.4, '1M': 4, 'YTD': 8, '6M': 6.1, '1Y': 17.8 },
  MARS: { '1W': 12.6, '1M': -19.6, 'YTD': 27.9, '6M': 27.9, '1Y': 27.9 },
  FRWD: { '1W': 1.5, '1M': -3.8, 'YTD': 30.7, '6M': 30.7, '1Y': 30.7 },
  BCTK: { '1W': 3.2, '1M': -3.2, 'YTD': 24.3, '6M': 23.4, '1Y': 26.5 },
  FWD:  { '1W': 0.7, '1M': -3.3, 'YTD': 35.8, '6M': 32.8, '1Y': 60.2 },
  CBSE: { '1W': 0.8, '1M': 1.5, 'YTD': 30.4, '6M': 30.4, '1Y': 39.6 },
  FCUS: { '1W': -0.4, '1M': -8.3, 'YTD': 36.3, '6M': 30.4, '1Y': 67.7 },
  WGMI: { '1W': -9.8, '1M': -17.1, 'YTD': 54.9, '6M': 41, '1Y': 135.7 },
  CNEQ: { '1W': 2.3, '1M': -2.7, 'YTD': 17.6, '6M': 17, '1Y': 39 },
  SGRT: { '1W': -1.2, '1M': -6, 'YTD': 42.3, '6M': 40.2, '1Y': 77.9 },
  SPMO: { '1W': 0.9, '1M': 0.8, 'YTD': 30.4, '6M': 30, '1Y': 39.7 },
  XMMO: { '1W': -0.1, '1M': -1.8, 'YTD': 20.6, '6M': 18.9, '1Y': 28.8 },
  // Electrification
  POW:  { '1W': 1.1, '1M': -5, 'YTD': 51.1, '6M': 46.2, '1Y': 46.6 },
  VOLT: { '1W': 0, '1M': 1.8, 'YTD': 39.5, '6M': 35.7, '1Y': 58.7 },
  PBD:  { '1W': 3.5, '1M': -13.1, 'YTD': 21.4, '6M': 17.3, '1Y': 50.3 },
  PBW:  { '1W': 4, '1M': -18.4, 'YTD': 25.5, '6M': 18.4, '1Y': 83.2 },
  IVEP: { '1W': -1.5, '1M': -5.4, 'YTD': 3.4, '6M': 3.4, '1Y': 3.4 },
  // Industrials
  AIRR: { '1W': 0.5, '1M': 1.2, 'YTD': 32.5, '6M': 28.3, '1Y': 56 },
  PRN:  { '1W': -0.3, '1M': 1, 'YTD': 42.4, '6M': 37.8, '1Y': 60.3 },
  RSHO: { '1W': 0, '1M': 5.8, 'YTD': 39.4, '6M': 36.1, '1Y': 53.9 },
  IDEF: { '1W': 6.2, '1M': -0.7, 'YTD': 6.7, '6M': 3.9, '1Y': 18.2 },
  BILT: { '1W': -1.1, '1M': -2.1, 'YTD': 8.4, '6M': 8.4, '1Y': 11.6 },
  // Meme
  BUZZ: { '1W': 4.8, '1M': -8.2, 'YTD': 14.9, '6M': 12.1, '1Y': 23.7 },
  MEME: { '1W': 2.4, '1M': -23.2, 'YTD': 45.2, '6M': 33.7, '1Y': -8.3 },
  RKNG: { '1W': -1.7, '1M': -7.8, 'YTD': 6.6, '6M': 6.6, '1Y': 6.6 },
};
// @@END_GENERATED:ETF_RETURNS@@

// @@GENERATED:ETF_DAY_CHANGE@@
// Today's % move per ETF ticker (1D, vs prior close). Refreshed by the 3×/day
// price jobs. Powers the 1D ranking in the theme-ETF side panel.
export const ETF_DAY_CHANGE: Record<string, number> = {
  AIS:  -1.18,
  ARTY: 1.34,
  BAI:  0.43,
  IGPT: -0.68,
  IVES: 0.29,
  CHAT: -1.63,
  AIFD: -0.92,
  SPRX: -1.3,
  SOXX: -0.26,
  PSI:  -1.59,
  XSD:  -0.57,
  DRAM: -1.55,
  PTF:  -1.25,
  WCLD: 0.95,
  IGV:  1.3,
  FDTX: -0.07,
  ARKK: 1.55,
  FRWD: -0.21,
  FWD:  -0.7,
  WGMI: 0.88,
  SPMO: 0.14,
  XMMO: 0.63,
  VOLT: -0.1,
  PBW:  0.63,
  IVEP: -0.08,
  AIRR: 0.72,
  PRN:  -0.59,
  IDEF: 2.53,
  BUZZ: 1.43,
  MEME: -0.44,
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
  'AI & ML': { etfs: ['AIS', 'IVES', 'AOTG'], series: { '1W': [100, 102.08, 104.79, 103.05, 102.13], '1M': [100, 98.94, 97.26, 91.29, 90.92, 90.29, 88.12, 90.41, 91.54, 94.7, 94.01, 96.65, 98.44, 94.48, 92.66, 93.81, 92.72, 94.64, 97.17, 95.46, 94.58], 'YTD': [100, 102.8, 104.13, 105.37, 103.8, 100.34, 100.6, 99.54, 101.43, 101.11, 101.7, 99.54, 90.67, 98.84, 108.78, 114.69, 117.83, 126.42, 134.03, 130.54, 143.71, 154.7, 136.5, 147.49, 148.73, 147.66], '6M': [100, 101.88, 103.05, 103.3, 102.96, 100.89, 98.11, 99.09, 96.94, 99.22, 99.59, 97.03, 92.24, 96.87, 107.37, 112.15, 114.94, 124.02, 130.7, 127.78, 140.53, 151.25, 133.55, 144.17, 145.28, 144.38], '1Y': [100, 100.97, 103.43, 104.35, 105.39, 105.09, 106.62, 103.39, 106.34, 106.76, 113.49, 117.69, 117.03, 121.91, 125.38, 123.97, 124.76, 130.62, 126.35, 123.21, 118.72, 119.86, 122.93, 125.09, 118.99, 124.17, 125.44, 128.26, 126.74, 130.84, 127.76, 125.65, 123.43, 125.7, 121.5, 124.43, 125.44, 122.21, 116.21, 126.96, 136.5, 146.33, 148.04, 162.15, 170.73, 162.19, 179.63, 193.55, 170.29, 184.73, 186.88, 184.65] }, returns: { '1W': 2.1, '1M': -5.4, 'YTD': 47.7, '6M': 44.4, '1Y': 84.7 } },
  'Semiconductors': { etfs: ['PSI', 'DRAM', 'XSD'], series: { '1W': [100, 103.18, 107.83, 99.85, 98.61], '1M': [100, 101.02, 98.35, 86.42, 91.51, 90.09, 87.18, 95.94, 97.32, 103.19, 98.96, 106.65, 110.48, 99.76, 99.04, 104.54, 98.91, 102.04, 106.6, 98.57, 97.31], 'YTD': [100, 107.31, 114.2, 118.33, 117.99, 120.64, 124.76, 123.69, 128.03, 129.21, 138.09, 136.66, 130.5, 137.16, 151.98, 169.2, 180.68, 196.48, 192.95, 184.91, 217.42, 220.57, 203.74, 224.61, 225.57, 211.8], '6M': [100, 105.68, 111.5, 114.34, 116.26, 117.92, 120.84, 121.8, 120.53, 126.4, 134.96, 135.12, 131.74, 133.68, 147.99, 164.87, 176.23, 191.42, 187.55, 179.71, 211.5, 214.46, 198.32, 218.66, 219.4, 205.77], '1Y': [100, 102.93, 103.3, 105.58, 105.15, 106.98, 113.24, 109.78, 114.26, 112.95, 116.67, 124.39, 122.81, 127.94, 128.12, 130.41, 131.75, 137.54, 139.84, 138.68, 133.43, 147.47, 148.34, 155.18, 147.45, 147.21, 148.83, 154.72, 159.81, 159.75, 168.03, 175.19, 176.44, 183.32, 178.61, 172.41, 161.5, 169.82, 164.84, 172.56, 190.24, 209.1, 211.26, 230.53, 246.8, 229.33, 250.35, 264.32, 238.32, 255.49, 251.81, 246.81] }, returns: { '1W': -1.4, '1M': -2.7, 'YTD': 111.8, '6M': 105.8, '1Y': 146.8 } },
  'Broad Tech': { etfs: ['WGMI', 'GTEK', 'SGRT'], series: { '1W': [100, 100.13, 101.86, 97.36, 97.14], '1M': [100, 99.5, 98.28, 89.61, 92.84, 90.72, 87.36, 92.62, 94.29, 98.26, 96.79, 100.07, 101.26, 97.59, 95.43, 95.72, 94.61, 94.78, 96.44, 92.22, 92], 'YTD': [100, 107.13, 111.83, 113.61, 108.48, 105.77, 108.54, 107.69, 110.73, 103.85, 106.79, 105.86, 95.15, 105.37, 122.14, 124.57, 123.61, 138.31, 142.77, 135.98, 157.58, 163.23, 142.89, 158.78, 156.53, 149.99], '6M': [100, 104.08, 109.88, 106.89, 104.48, 105.85, 103, 107.22, 100.96, 100.69, 103.21, 101.66, 96.3, 101.41, 117.28, 119.68, 118.8, 132.72, 136.95, 130.44, 150.82, 156.27, 136.96, 152.01, 150.04, 143.97], '1Y': [100, 101.78, 103.56, 105.47, 104.03, 105.14, 107.26, 108.57, 114.33, 113.04, 123.93, 134.51, 135.34, 140.09, 153.16, 153.63, 147.53, 153.55, 154.82, 132.57, 131.21, 139.9, 142.18, 142.7, 130.11, 135.28, 144.45, 146.24, 147.25, 153.99, 146.76, 145.36, 136.8, 141.84, 135.22, 134.7, 137.11, 137.57, 136.52, 148.54, 161.2, 167.93, 163.73, 192.2, 185.49, 182.28, 208.91, 209.2, 190.9, 209.18, 202.12, 194.84] }, returns: { '1W': -2.9, '1M': -8, 'YTD': 50, '6M': 44, '1Y': 94.8 } },
  'Electrification': { etfs: ['PBW', 'VOLT', 'POW'], series: { '1W': [100, 102.53, 105.02, 101.74, 101.69], '1M': [100, 98.92, 98.79, 92.12, 92.82, 91.74, 88.72, 92.8, 93.57, 96.12, 95.19, 97.39, 98.51, 94.07, 93.42, 94.21, 91.41, 93.64, 95.93, 92.87, 92.79], 'YTD': [100, 104.13, 109.93, 112.37, 112.23, 115.87, 118.59, 119.33, 120.87, 114.8, 116.56, 116.34, 110.84, 116.59, 128.11, 130.43, 134.96, 146.19, 146.34, 134.86, 149.04, 148.29, 132.77, 142.43, 140.7, 138.68], '6M': [100, 101.21, 107.28, 107.52, 107.83, 113.48, 113.99, 117.58, 111.29, 111.56, 113.18, 113.39, 110.66, 112.21, 123.29, 125.49, 129.87, 140.66, 140.77, 129.73, 143.28, 142.55, 127.72, 137.02, 135.42, 133.43], '1Y': [100, 103.01, 105.77, 107.95, 104.88, 104.75, 106.56, 106.47, 109.78, 108.81, 110.1, 113.39, 116.3, 119.48, 124.69, 127.34, 125.38, 127.11, 126.14, 124.17, 123.53, 127.72, 130.72, 132.01, 129.01, 131.87, 132.2, 134.22, 135.37, 139.73, 139.7, 139.49, 140.02, 142.6, 140.84, 141.35, 143.08, 146.99, 147.03, 153.87, 160.04, 163.1, 157.23, 168.87, 171.43, 162, 172.41, 173.58, 159.88, 166.46, 164.39, 162.85] }, returns: { '1W': 1.7, '1M': -7.2, 'YTD': 38.7, '6M': 33.4, '1Y': 62.8 } },
  'Industrials': { etfs: ['PRN', 'RSHO', 'IDEF'], series: { '1W': [100, 100.36, 101.89, 101.83, 101.94], '1M': [100, 99.21, 99.64, 96.91, 97.01, 97.89, 96.32, 98.63, 98.9, 100.17, 99.04, 100.73, 101.36, 100.5, 99.94, 101.36, 100.21, 100.52, 102.03, 102, 102.02], 'YTD': [100, 106.05, 112.31, 111.75, 111.14, 114.65, 118.04, 120.06, 120.82, 114.41, 112.5, 111.9, 106.58, 112.52, 121.04, 120.69, 119.86, 124.28, 125.34, 121.75, 125.28, 125.4, 122.1, 127.7, 129.21, 129.49], '6M': [100, 104.58, 109.27, 107.9, 107.72, 112.13, 114.3, 117.16, 115.97, 113.29, 111.24, 108.93, 108.08, 109.34, 116.99, 116.18, 115.97, 119.29, 122.67, 118.08, 121.65, 122.02, 118.74, 124.17, 125.63, 125.92], '1Y': [100, 101.43, 103.86, 104.31, 104.08, 104.15, 105.49, 102.98, 105.95, 104.56, 107.44, 108.32, 108.21, 111.86, 113.1, 111.35, 112.96, 114.77, 110.89, 108.68, 105.81, 108.22, 110.38, 113.56, 109.42, 113.79, 115.66, 121.14, 124.32, 125.47, 125.06, 130.01, 131.46, 134.37, 132.32, 126.91, 125.54, 124.56, 122.01, 128.96, 133.98, 135.08, 132.42, 141.11, 140.13, 135.5, 139.49, 139.63, 134.26, 142.18, 143.86, 144.15] }, returns: { '1W': 1.9, '1M': 2, 'YTD': 29.5, '6M': 25.9, '1Y': 44.2 } },
  'Meme': { etfs: ['BUZZ', 'MEME', 'RKNG'], series: { '1W': [100, 102.15, 104.64, 103.28, 101.83], '1M': [100, 98.48, 98.13, 91.68, 89.53, 88.18, 85.61, 88.17, 88.99, 92.21, 90.71, 92.76, 93.95, 91.45, 87.81, 86.01, 85.48, 87.02, 89.16, 88.29, 86.95], 'YTD': [100, 108.03, 105.55, 106.35, 99.62, 96.61, 93.56, 93.37, 94.8, 92.23, 93.45, 92.11, 85.8, 95.13, 109.79, 112.61, 109.44, 122.46, 125.5, 122.14, 140.11, 139.02, 122.75, 128.86, 121.71, 122.22], '6M': [100, 106.14, 103.76, 99.84, 95.3, 95.66, 89.66, 90.85, 88.5, 88.87, 90.4, 88.13, 86.36, 91.61, 105.46, 107.99, 105.28, 117.62, 120.37, 117.37, 134.24, 133.32, 117.88, 123.71, 116.93, 117.47], '1Y': [100, 103.5, 101.98, 96, 92.77, 91.33, 90.07, 85.88, 84.41, 82.24, 86.62, 88.6, 90.19, 88.42, 88.39, 90.66, 87.56, 93.35, 91.63, 89.22, 88.49, 86.55, 86.6, 86.9, 86.27, 87.42, 90.3, 91.51, 92.07, 92.46, 91.74, 89.73, 90.09, 87.75, 88.99, 95.95, 99.64, 95.45, 93.33, 98.13, 107.93, 110.95, 109.08, 107.81, 114.62, 113.31, 114.8, 115.59, 109.6, 110.28, 105.16, 107.33] }, returns: { '1W': 1.8, '1M': -13, 'YTD': 22.2, '6M': 17.5, '1Y': 7.3 } },
};
// @@END_GENERATED:THEME_REPRESENTATIVES@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 10, avgWeight: 6.07, proScore: 6.07, coverage: 1,
      price: 198.25, weeklyPrices: [192.53, 194.97, 200.09, 197.58, 198.25], weeklyChange: 2.97, dayChange: 0.34, sortRank: 0, periodReturns: { '1M': -11, 'YTD': 6.3, '6M': 5, '1Y': 26.1 },
      priceHistory: { '1D': [197.58, 198.38, 198.25], '1W': [192.53, 194.97, 200.09, 197.58, 198.25], '1M': [222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 198.25], 'YTD': [186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 212.6, 214.75, 200.42, 204.65, 195.74, 198.25], '6M': [188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 184.77, 181.93, 175.2, 174.4, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 212.6, 214.75, 200.42, 204.65, 195.74, 198.25], '1Y': [157.25, 164.1, 173, 173.74, 177.87, 180.77, 182.02, 175.4, 181.6, 171.66, 177.17, 176.24, 177.69, 188.89, 192.57, 181.81, 182.16, 202.89, 188.08, 186.86, 186.52, 180.26, 183.38, 180.93, 174.14, 190.53, 188.12, 184.94, 178.07, 188.52, 180.34, 188.54, 184.97, 192.85, 180.05, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 220.61, 212.6, 214.75, 200.42, 204.65, 195.74, 198.25] },
      velocityScore: { '1D': 0.7, '1W': -2.4, '1M': 2.9, '6M': null }, isNew: false,
      marketCap: '$4.8T', pe: 30.4, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.51,
      etfPresence: { AIS: 2.36, ARTY: 4.45, BAI: 3.98, IGPT: 7.37, IVES: 4.68, ALAI: 12.26, CHAT: 6.45, AIFD: 6.05, SPRX: 3.2, AOTG: 9.94 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 6.11, proScore: 5.49, coverage: 0.9,
      price: 1059.51, weeklyPrices: [1132.33, 1145.28, 1154.29, 1032.28, 1059.51], weeklyChange: -6.43, dayChange: 2.64, sortRank: 0, periodReturns: { '1M': -0.4, 'YTD': 271.2, '6M': 235.9, '1Y': 770.3 },
      priceHistory: { '1D': [1032.28, 1055.41, 1059.51], '1W': [1132.33, 1145.28, 1154.29, 1032.28, 1059.51], '1M': [1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 1059.51], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1213.56, 1059.51], '6M': [315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1213.56, 1059.51], '1Y': [121.74, 123.11, 113.26, 111.73, 109.14, 111.87, 125.29, 117.21, 117.75, 124.21, 150.57, 168.89, 156.83, 183.75, 192.33, 202.53, 206.71, 224.01, 238.33, 236.95, 225.92, 230.26, 226.65, 258.46, 248.55, 284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1213.56, 1059.51] },
      velocityScore: { '1D': -5.2, '1W': -1.1, '1M': -16.3, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 23.9, revenueGrowth: 346, eps: 44.28, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { AIS: 6.72, ARTY: 4.97, BAI: 6.22, IGPT: 7.92, IVES: 4.81, ALAI: 1.35, CHAT: 4, AIFD: 7.38, SPRX: false, AOTG: 11.58 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 9, avgWeight: 5.6, proScore: 5.04, coverage: 0.9,
      price: 537, weeklyPrices: [521.58, 539.49, 580.91, 540.88, 537.00], weeklyChange: 2.96, dayChange: -0.72, sortRank: 0, periodReturns: { '1M': 3, 'YTD': 150.7, '6M': 140.3, '1Y': 287.7 },
      priceHistory: { '1D': [540.88, 534.8, 537], '1W': [521.58, 539.49, 580.91, 540.88, 537], '1M': [521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 537], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 542.52, 452.4, 512.48, 532.57, 537], '6M': [223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 542.52, 452.4, 512.48, 532.57, 537], '1Y': [138.52, 144.16, 160.41, 162.12, 176.31, 172.4, 180.95, 165.2, 167.13, 161.79, 155.67, 157.92, 161.27, 169.73, 232.89, 234.56, 234.99, 254.84, 237.7, 247.96, 223.55, 214.24, 215.98, 221.43, 201.06, 214.99, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 203.08, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 414.05, 495.54, 542.52, 452.4, 512.48, 532.57, 537] },
      velocityScore: { '1D': -1.9, '1W': 1.6, '1M': -6.3, '6M': null }, isNew: false,
      marketCap: '$876B', pe: 180.8, revenueGrowth: 38, eps: 2.97, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.89, ARTY: 5.03, BAI: 4.96, IGPT: 8.46, IVES: 4.79, ALAI: 1.28, CHAT: 4.24, AIFD: false, SPRX: 0.55, AOTG: 16.2 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 8, avgWeight: 3.47, proScore: 2.77, coverage: 0.8,
      price: 370.62, weeklyPrices: [365.02, 372.45, 377.75, 369.34, 370.62], weeklyChange: 1.53, dayChange: 0.35, sortRank: 0, periodReturns: { '1M': -23, 'YTD': 7.1, '6M': 6.6, '1Y': 37.3 },
      priceHistory: { '1D': [369.34, 369.27, 370.62], '1W': [365.02, 372.45, 377.75, 369.34, 370.62], '1M': [481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 370.62], 'YTD': [346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 421.86, 479.23, 372.1, 392.9, 378.91, 370.62], '6M': [347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 342.58, 321.31, 318.29, 309.51, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 421.86, 479.23, 372.1, 392.9, 378.91, 370.62], '1Y': [269.9, 275.4, 286.45, 288.71, 293.7, 303.76, 311.23, 291.17, 300.25, 306.1, 359.63, 345.35, 336.1, 338.18, 345.02, 354.15, 344.29, 376.47, 355.59, 339.98, 354.42, 397.57, 381.03, 406.37, 329.88, 352.13, 343.42, 352.21, 332.6, 332.79, 320.33, 340.44, 332.54, 325.49, 313.84, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 411.07, 421.86, 479.23, 372.1, 392.9, 378.91, 370.62] },
      velocityScore: { '1D': 0.4, '1W': -4.5, '1M': -15, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 61.6, revenueGrowth: 48, eps: 6.02, grossMargin: 76, dividendYield: 0.7,
      etfPresence: { AIS: 0.63, ARTY: 4.29, BAI: 4, IGPT: false, IVES: 4.5, ALAI: 3.75, CHAT: 3.99, AIFD: 5.14, SPRX: false, AOTG: 1.43 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 7, avgWeight: 3.61, proScore: 2.53, coverage: 0.7,
      price: 270.38, weeklyPrices: [266.77, 277.75, 297.89, 272.05, 270.38], weeklyChange: 1.35, dayChange: -0.61, sortRank: 0, periodReturns: { '1M': -7, 'YTD': 218.2, '6M': 202.5, '1Y': 264.1 },
      priceHistory: { '1D': [272.05, 268.52, 270.38], '1W': [266.77, 277.75, 297.89, 272.05, 270.38], '1M': [290.79, 301.65, 316.43, 263.47, 288.85, 266.88, 252.59, 280.71, 279.7, 308.88, 289.54, 310.58, 307.86, 279.04, 276.7, 281.26, 266.77, 277.75, 297.89, 272.05, 270.38], 'YTD': [84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 176.27, 198.7, 301.65, 252.59, 289.54, 281.26, 270.38], '6M': [89.39, 83.22, 80.46, 81.77, 78.66, 82.35, 79.01, 78.39, 77.51, 93.3, 90.79, 92.36, 99.05, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 176.27, 198.7, 301.65, 252.59, 289.54, 281.26, 270.38], '1Y': [74.25, 73.36, 72.01, 74.04, 80.37, 75.85, 79.04, 71.22, 74.79, 64.1, 66.59, 74.23, 83.81, 86.2, 90.68, 88.23, 82.77, 88.57, 93.33, 87.52, 81.32, 87.72, 98.19, 89.43, 84.47, 86.34, 90.23, 82.89, 79.8, 82.93, 75.54, 82.01, 79.01, 78.39, 77.51, 93.3, 90.79, 92.36, 99.05, 114.45, 134.6, 157.32, 156.57, 172.15, 177.95, 176.27, 198.7, 301.65, 252.59, 289.54, 281.26, 270.38] },
      velocityScore: { '1D': -1.6, '1W': -1.9, '1M': -0.8, '6M': null }, isNew: false,
      marketCap: '$237B', pe: 92.9, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.09,
      etfPresence: { AIS: 3.94, ARTY: 4.28, BAI: 1.93, IGPT: 3.48, IVES: false, ALAI: false, CHAT: 1.5, AIFD: 6, SPRX: 4.12, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 4.93, proScore: 2.96, coverage: 0.6,
      price: 358.61, weeklyPrices: [337.39, 353.65, 357.37, 361.21, 358.61], weeklyChange: 6.29, dayChange: -0.72, sortRank: 0, periodReturns: { '1M': -0.9, 'YTD': 14.6, '6M': 13.8, '1Y': 100.7 },
      priceHistory: { '1D': [361.21, 359.16, 358.61], '1W': [337.39, 353.65, 357.37, 361.21, 358.61], '1M': [361.85, 358.99, 372.19, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68, 369.35, 363.79, 368.03, 349.68, 346.13, 345.29, 343.71, 337.39, 353.65, 357.37, 361.21, 358.61], 'YTD': [313, 325.44, 332.78, 327.93, 338, 322.86, 305.72, 311.49, 306.52, 306.36, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 388.43, 387.35, 387.66, 388.83, 358.99, 356.38, 363.79, 343.71, 358.61], '6M': [315.15, 328.57, 330, 333.26, 343.69, 324.32, 302.02, 310.9, 303.58, 307.04, 310.92, 290.44, 287.56, 305.46, 332.91, 332.29, 349.78, 388.43, 387.35, 387.66, 388.83, 358.99, 356.38, 363.79, 343.71, 358.61], '1Y': [178.64, 177.62, 183.58, 192.17, 191.9, 196.52, 202.94, 199.32, 207.48, 232.3, 240.37, 252.03, 245.79, 245.69, 241.53, 251.46, 253.08, 281.48, 284.75, 278.57, 292.81, 319.95, 317.62, 312.43, 302.46, 313.51, 316.54, 331.86, 322, 334.55, 339.71, 318.58, 302.02, 310.9, 303.58, 307.04, 310.92, 290.44, 287.56, 317.32, 337.12, 339.32, 349.94, 398.04, 402.62, 387.66, 388.83, 358.99, 356.38, 363.79, 343.71, 358.61] },
      velocityScore: { '1D': 3.5, '1W': 2.1, '1M': -15.9, '6M': null }, isNew: false,
      marketCap: '$4.4T', pe: 27.4, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.14, IGPT: 7.71, IVES: 4.7, ALAI: false, CHAT: 5.36, AIFD: 4.87, SPRX: false, AOTG: 3.8 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 6, avgWeight: 4.83, proScore: 2.9, coverage: 0.6,
      price: 452.44, weeklyPrices: [432.35, 455.10, 477.57, 444.23, 452.44], weeklyChange: 4.65, dayChange: 1.82, sortRank: 0, periodReturns: { '1M': 1.3, 'YTD': 48.9, '6M': 41.6, '1Y': 93.7 },
      priceHistory: { '1D': [444.36, 451.18, 452.44], '1W': [432.35, 455.1, 477.57, 444.23, 452.44], '1M': [446.69, 436.69, 444.92, 415.17, 426.8, 427.92, 408.75, 421.07, 423.93, 441.4, 432.15, 462.12, 467.67, 436.39, 440.83, 434.99, 432.35, 455.1, 477.57, 444.23, 452.44], 'YTD': [303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 370.04, 369.11, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 392.61, 422.73, 436.69, 408.75, 432.15, 434.99, 452.44], '6M': [319.61, 323.63, 342.4, 332.71, 341.36, 355.41, 364.2, 385.75, 353.13, 347.09, 345.98, 343.25, 337.95, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 392.61, 422.73, 436.69, 408.75, 432.15, 434.99, 452.44], '1Y': [233.6, 229.76, 245.6, 241.6, 241.62, 242.62, 241, 228.6, 239.29, 235.21, 258.91, 268.64, 276.66, 288.11, 299.88, 299.84, 290.73, 303.22, 289.24, 282.2, 282.37, 289.96, 292.93, 304.85, 284.68, 302.84, 322.25, 331.77, 327.16, 338.34, 335.75, 361.91, 364.2, 385.75, 353.13, 347.09, 345.98, 343.25, 337.95, 365.9, 375.1, 387.44, 393.83, 419.5, 399.8, 392.61, 422.73, 436.69, 408.75, 432.15, 434.99, 452.44] },
      velocityScore: { '1D': 9.8, '1W': -1.4, '1M': -13.9, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 39.3, revenueGrowth: 35, eps: 11.51, grossMargin: 62, dividendYield: 0.86,
      etfPresence: { AIS: 3.26, ARTY: false, BAI: 4.43, IGPT: false, IVES: 4.92, ALAI: 5.64, CHAT: false, AIFD: 3.45, SPRX: false, AOTG: 7.3 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'ANET', name: 'Arista Networks Inc', easyScore: 6, avgWeight: 2.32, proScore: 1.39, coverage: 0.6,
      price: 165.54, weeklyPrices: [157.60, 164.10, 169.88, 166.62, 165.54], weeklyChange: 5.04, dayChange: -0.68, sortRank: 0, periodReturns: { '1M': -5.6, 'YTD': 26.3, '6M': 23.9, '1Y': 63.7 },
      priceHistory: { '1D': [166.68, 165.15, 165.54], '1W': [157.6, 164.1, 169.88, 166.62, 165.54], '1M': [175.33, 174.37, 166.01, 154.27, 156.4, 152.16, 151.76, 156.4, 163.24, 169.09, 164.93, 169.67, 174.56, 162.2, 161.74, 165.45, 157.6, 164.1, 169.88, 166.62, 165.54], 'YTD': [131.03, 123.72, 130.59, 136.34, 141.74, 137.49, 141.59, 127.43, 129.3, 137.17, 135.35, 135.88, 116.13, 133.64, 154.37, 172.86, 165.29, 170.22, 142.54, 141.58, 154.31, 174.37, 151.76, 164.93, 165.45, 165.54], '6M': [133.6, 122.89, 129.83, 143.72, 138.37, 141.74, 142.58, 128.77, 124.6, 139.62, 133.07, 130.8, 122.78, 133.64, 154.37, 172.86, 165.29, 170.22, 142.54, 141.58, 154.31, 174.37, 151.76, 164.93, 165.45, 165.54], '1Y': [101.13, 106.29, 111.98, 114.04, 123.22, 139.28, 136.48, 131.47, 133.27, 141.17, 153.04, 146.66, 143.06, 144.46, 158.23, 146.01, 152.76, 158.44, 134.02, 130.3, 124.81, 127.65, 128.55, 134.39, 124.62, 131.84, 137.19, 123.42, 127.52, 146.69, 139.39, 143.45, 142.58, 128.77, 124.6, 139.62, 133.07, 130.8, 122.78, 145.07, 154.33, 177.73, 168.68, 147.06, 140.69, 141.58, 154.31, 174.37, 151.76, 164.93, 165.45, 165.54] },
      velocityScore: { '1D': 1.5, '1W': -6.1, '1M': -24, '6M': null }, isNew: false,
      marketCap: '$208B', pe: 56.7, revenueGrowth: 35, eps: 2.92, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: 1.44, ARTY: 2.46, BAI: 1.33, IGPT: false, IVES: false, ALAI: false, CHAT: 2.24, AIFD: 4.89, SPRX: 1.58, AOTG: false },
      tonyNote: 'Arista Networks Inc appears in 6 of 10 AI & ML ETFs (60% coverage) with average weight 2.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 5, avgWeight: 4.15, proScore: 2.07, coverage: 0.5,
      price: 599.19, weeklyPrices: [550.25, 562.60, 563.29, 612.91, 599.19], weeklyChange: 8.89, dayChange: -2.24, sortRank: 0, periodReturns: { '1M': 0.3, 'YTD': -9.2, '6M': -7.9, '1Y': -16 },
      priceHistory: { '1D': [612.91, 600.66, 599.19], '1W': [550.25, 562.6, 563.29, 612.91, 599.19], '1M': [597.63, 622.98, 627.57, 593, 585.39, 584.59, 570.98, 568.43, 566.98, 593.48, 567.58, 577.22, 563.85, 562.2, 557.67, 542.87, 550.25, 562.6, 563.29, 612.91, 599.19], 'YTD': [660.09, 646.06, 620.8, 658.76, 716.5, 661.46, 639.77, 637.25, 653.56, 647.39, 627.45, 604.06, 536.38, 575.05, 662.49, 668.84, 671.34, 604.96, 603, 602.61, 635.26, 622.98, 570.98, 567.58, 542.87, 599.19], '6M': [650.41, 653.06, 620.25, 672.36, 706.41, 677.22, 639.29, 639.3, 655.08, 654.07, 622.66, 592.92, 572.13, 575.05, 662.49, 668.84, 671.34, 604.96, 603, 602.61, 635.26, 622.98, 570.98, 567.58, 542.87, 599.19], '1Y': [713.57, 727.24, 701.41, 714.8, 773.44, 761.83, 782.13, 747.72, 747.38, 748.65, 750.9, 780.25, 748.91, 727.05, 733.51, 712.07, 734, 666.47, 618.94, 609.89, 590.32, 633.61, 661.53, 652.71, 664.45, 663.29, 658.79, 641.97, 604.12, 672.97, 691.7, 670.72, 639.29, 639.3, 655.08, 654.07, 622.66, 592.92, 572.13, 612.42, 671.58, 674.72, 669.12, 612.88, 616.63, 602.61, 635.26, 622.98, 570.98, 567.58, 542.87, 599.19] },
      velocityScore: { '1D': 10.7, '1W': 7.3, '1M': 1.5, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 21.8, revenueGrowth: 33, eps: 27.52, grossMargin: 82, dividendYield: 0.34,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: 8.24, IVES: 4.96, ALAI: 4.2, CHAT: 2.26, AIFD: false, SPRX: false, AOTG: 1.08 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 5, avgWeight: 3.92, proScore: 1.96, coverage: 0.5,
      price: 241.32, weeklyPrices: [232.69, 240.14, 238.34, 241.70, 241.32], weeklyChange: 3.71, dayChange: -0.16, sortRank: 0, periodReturns: { '1M': -5.9, 'YTD': 4.5, '6M': 6.5, '1Y': 9.7 },
      priceHistory: { '1D': [241.7, 241.78, 241.32], '1W': [232.69, 240.14, 238.34, 241.7, 241.32], '1M': [256.52, 250.02, 253.79, 246.03, 245.22, 244.19, 238, 241.51, 238.55, 246.02, 237.5, 244.39, 232.79, 234.11, 234.27, 227.01, 232.69, 240.14, 238.34, 241.7, 241.32], 'YTD': [230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 198.79, 205.27, 208.39, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 259.34, 271.85, 250.02, 238, 237.5, 227.01, 241.32], '6M': [226.5, 247.38, 239.12, 238.42, 242.96, 208.72, 201.15, 208.56, 208.73, 214.33, 215.2, 207.24, 208.27, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 259.34, 271.85, 250.02, 238, 237.5, 227.01, 241.32], '1Y': [219.92, 222.26, 223.88, 232.23, 234.11, 223.13, 230.98, 223.81, 229.12, 235.68, 229.95, 231.23, 218.15, 222.41, 227.74, 214.47, 221.09, 222.86, 243.04, 237.58, 222.69, 229.16, 229.11, 230.28, 226.76, 232.52, 233.06, 246.47, 231, 244.68, 238.62, 206.96, 201.15, 208.56, 208.73, 214.33, 215.2, 207.24, 208.27, 221.25, 248.5, 255.36, 263.04, 274.99, 270.13, 259.34, 271.85, 250.02, 238, 237.5, 227.01, 241.32] },
      velocityScore: { '1D': 2.1, '1W': -1, '1M': -23.7, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 31.6, revenueGrowth: 17, eps: 7.64, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 4.77, ALAI: 5.08, CHAT: 2.42, AIFD: 3.39, SPRX: false, AOTG: 3.94 },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 5, avgWeight: 3.73, proScore: 1.86, coverage: 0.5,
      price: 426.01, weeklyPrices: [391.74, 455.96, 483.02, 430.86, 426.01], weeklyChange: 8.75, dayChange: -1.12, sortRank: 0, periodReturns: { '1M': 19.7, 'YTD': 156.1, '6M': 137.3, '1Y': 381 },
      priceHistory: { '1D': [430.86, 421.39, 426.01], '1W': [391.74, 455.96, 483.02, 430.86, 426.01], '1M': [355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86, 426.01], 'YTD': [166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 325.33, 363.54, 330.86, 374.68, 398, 426.01], '6M': [179.56, 162.61, 182, 163.25, 152.44, 187.67, 123.69, 128.4, 109.8, 116.48, 127.57, 121.76, 109.6, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 325.33, 363.54, 330.86, 374.68, 398, 426.01], '1Y': [88.57, 97.02, 97.95, 121.68, 136.73, 170.89, 190.69, 172.45, 179.2, 187.95, 232.9, 251.88, 200.64, 209.6, 225.43, 163.55, 163.64, 169.55, 162.83, 144.47, 142.01, 154.22, 152.51, 173.7, 145.88, 167.26, 167.11, 172.57, 183.75, 170.93, 158.52, 182.86, 123.69, 128.4, 109.8, 116.48, 127.57, 121.76, 109.6, 125.46, 172.09, 194.06, 196.85, 213.91, 224.09, 244.26, 325.33, 363.54, 330.86, 374.68, 398, 426.01] },
      velocityScore: { '1D': 1.6, '1W': 7.5, '1M': -12.7, '6M': null }, isNew: false,
      marketCap: '$73B', pe: 291.8, revenueGrowth: 93, eps: 1.46, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 2.21, ARTY: 1.46, BAI: false, IGPT: false, IVES: false, ALAI: 1.02, CHAT: 3.08, AIFD: false, SPRX: 10.86, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.57, proScore: 1.78, coverage: 0.5,
      price: 384.72, weeklyPrices: [372.97, 368.57, 373.02, 384.28, 384.72], weeklyChange: 3.15, dayChange: 0.11, sortRank: 0, periodReturns: { '1M': -12.8, 'YTD': -20.4, '6M': -18.7, '1Y': -21.7 },
      priceHistory: { '1D': [384.28, 385.14, 384.72], '1W': [372.97, 368.57, 373.02, 384.28, 384.72], '1M': [441.31, 427.34, 428.05, 416.67, 411.74, 403.41, 397.36, 390.34, 390.74, 399.76, 378.91, 379.4, 367.34, 373.94, 365.46, 352.83, 372.97, 368.57, 373.02, 384.28, 384.72], 'YTD': [483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 384.47, 398.55, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 417.42, 412.67, 427.34, 397.36, 378.91, 352.83, 384.72], '6M': [472.94, 479.28, 459.86, 470.28, 423.37, 413.6, 396.86, 389, 403.93, 405.76, 399.41, 372.74, 370.17, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 417.42, 412.67, 427.34, 397.36, 378.91, 352.83, 384.72], '1Y': [491.09, 501.48, 511.7, 510.88, 533.5, 520.84, 522.48, 505.72, 506.74, 507.97, 501.01, 508.45, 507.03, 515.74, 522.4, 511.61, 520.56, 525.76, 497.1, 503.29, 487.12, 485.5, 480.84, 483.47, 483.98, 487.71, 472.85, 477.18, 454.52, 480.58, 411.21, 413.27, 396.86, 389, 403.93, 405.76, 399.41, 372.74, 370.17, 374.33, 411.22, 432.92, 424.46, 413.96, 405.21, 417.42, 412.67, 427.34, 397.36, 378.91, 352.83, 384.72] },
      velocityScore: { '1D': 3.5, '1W': 3.5, '1M': -29.1, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 22.9, revenueGrowth: 18, eps: 16.79, grossMargin: 68, dividendYield: 0.95,
      etfPresence: { AIS: false, ARTY: 2.53, BAI: false, IGPT: false, IVES: 4.67, ALAI: 5, CHAT: 2.19, AIFD: false, SPRX: false, AOTG: 3.44 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 5, avgWeight: 2.54, proScore: 1.27, coverage: 0.5,
      price: 787.84, weeklyPrices: [816.98, 851.40, 858.06, 801.16, 787.84], weeklyChange: -3.57, dayChange: -1.66, sortRank: 0, periodReturns: { '1M': -23.4, 'YTD': 113.7, '6M': 104, '1Y': 763.5 },
      priceHistory: { '1D': [801.16, 789, 787.84], '1W': [816.98, 851.4, 858.06, 801.16, 787.84], '1M': [1029.15, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 869.98, 850, 893.93, 827.92, 842.53, 861.97, 816.98, 851.4, 858.06, 801.16, 787.84], 'YTD': [368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 890.09, 902.31, 938, 853.26, 869.98, 861.97, 787.84], '6M': [386.11, 351.42, 324.25, 332.45, 423.42, 577.15, 600.42, 688.27, 694.43, 672, 649.56, 801.99, 702.76, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 890.09, 902.31, 938, 853.26, 869.98, 861.97, 787.84], '1Y': [91.24, 92.62, 102.64, 102.85, 110.08, 111.13, 114.62, 115.89, 125.84, 141.91, 164.88, 171.5, 159.11, 169.75, 159.76, 163.23, 168.5, 200.13, 239.68, 226.86, 268.92, 308.28, 327.85, 372.09, 337.13, 390.77, 357.05, 339.87, 356.83, 370.66, 435.1, 561.13, 600.42, 688.27, 694.43, 672, 649.56, 801.99, 702.76, 896.02, 824.01, 873.6, 858.32, 944.28, 1030.37, 890.09, 902.31, 938, 853.26, 869.98, 861.97, 787.84] },
      velocityScore: { '1D': -7.3, '1W': -6.6, '1M': -35.2, '6M': null }, isNew: false,
      marketCap: '$61B', pe: 138.5, revenueGrowth: 90, eps: 5.69, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.45, IGPT: false, IVES: false, ALAI: 0.83, CHAT: 1.34, AIFD: 4.73, SPRX: 3.35, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 5 of 10 AI & ML ETFs (50% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 5, avgWeight: 2.48, proScore: 1.24, coverage: 0.5,
      price: 2051.12, weeklyPrices: [2090.71, 2050.39, 2273.73, 2032.22, 2051.12], weeklyChange: -1.89, dayChange: 0.93, sortRank: 0, periodReturns: { '1M': 19.5, 'YTD': 764.1, '6M': 645.2, '1Y': 4338.7 },
      priceHistory: { '1D': [2032.22, 2046.13, 2051.12], '1W': [2090.71, 2050.39, 2273.73, 2032.22, 2051.12], '1M': [1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 2051.12], 'YTD': [237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.94, 1831.5, 1643.23, 1958.8, 2335, 2051.12], '6M': [275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 565.41, 618.89, 720.17, 702.48, 635.34, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.94, 1831.5, 1643.23, 1958.8, 2335, 2051.12], '1Y': [46.21, 46.95, 41.52, 42.06, 42.92, 40.69, 46.68, 44.4, 48.44, 62.5, 84.3, 98.87, 94.29, 124.14, 129.68, 144.27, 167.05, 195.82, 207.69, 243.57, 245.96, 215.04, 213.31, 241.61, 219.46, 250.05, 274.08, 389.27, 453.12, 481.43, 695.51, 541.64, 590.59, 638.52, 565.41, 618.89, 720.17, 702.48, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1447.23, 1383.29, 1589.94, 1831.5, 1643.23, 1958.8, 2335, 2051.12] },
      velocityScore: { '1D': -5.3, '1W': 5.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$304B', pe: 70.1, revenueGrowth: 251, eps: 29.26, grossMargin: 56, dividendYield: null,
      etfPresence: { AIS: 2.28, ARTY: false, BAI: 3.15, IGPT: 4.4, IVES: false, ALAI: 0.57, CHAT: false, AIFD: false, SPRX: false, AOTG: 1.98 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 5, avgWeight: 2.43, proScore: 1.22, coverage: 0.5,
      price: 607.89, weeklyPrices: [586.45, 651.88, 638.72, 598.37, 607.89], weeklyChange: 3.66, dayChange: 1.59, sortRank: 0, periodReturns: { '1M': 8, 'YTD': 252.9, '6M': 223.9, '1Y': 824.1 },
      priceHistory: { '1D': [598.37, 605.99, 607.89], '1W': [586.45, 651.88, 638.72, 598.37, 607.89], '1M': [563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 607.89], 'YTD': [172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 530.6, 594.11, 490.09, 712.13, 675.39, 607.89], '6M': [187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 266.22, 313.81, 301.05, 270.49, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 530.6, 594.11, 490.09, 712.13, 675.39, 607.89], '1Y': [65.78, 65.06, 67.02, 69.02, 78.69, 74.44, 76.24, 75.64, 80.67, 90.49, 96.15, 105.15, 107.21, 131.26, 119.7, 125.92, 125.72, 138.13, 163.6, 157.16, 153.97, 157.74, 161, 187.2, 175.01, 181.54, 187.88, 212.14, 222.97, 252.66, 290.24, 262.56, 284.11, 270.57, 250.61, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 455.8, 530.6, 594.11, 490.09, 712.13, 675.39, 607.89] },
      velocityScore: { '1D': -22.8, '1W': -6.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$210B', pe: 36.4, revenueGrowth: 46, eps: 16.69, grossMargin: 45, dividendYield: 0.1,
      etfPresence: { AIS: 1.34, ARTY: 2.83, BAI: 3.15, IGPT: false, IVES: false, ALAI: 4.13, CHAT: false, AIFD: false, SPRX: false, AOTG: 0.71 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'CRDO', name: 'Credo Technology Group Holding Ltd', easyScore: 5, avgWeight: 1.92, proScore: 0.96, coverage: 0.5,
      price: 255.82, weeklyPrices: [238.00, 245.68, 271.95, 259.09, 255.82], weeklyChange: 7.49, dayChange: -1.26, sortRank: 0, periodReturns: { '1M': 11.7, 'YTD': 77.8, '6M': 78.6, '1Y': 186.2 },
      priceHistory: { '1D': [259.09, 253.53, 255.82], '1W': [238, 245.68, 271.95, 259.09, 255.82], '1M': [229, 214.6, 217.5, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81, 259.41, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.09, 255.82], 'YTD': [143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.05, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.23, 214.6, 237.68, 249.33, 268.03, 255.82], '6M': [143.22, 150.42, 150.97, 128.02, 119.96, 123.41, 124.8, 120.83, 97.3, 112.33, 104.06, 100.3, 93.87, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.23, 214.6, 237.68, 249.33, 268.03, 255.82], '1Y': [89.37, 97.29, 98.45, 101.17, 111.55, 119.78, 117.33, 105.99, 122.73, 134, 159.32, 172.31, 144.94, 149.63, 151.15, 136.53, 150.97, 166.62, 162.74, 142.95, 141.88, 164.01, 180.92, 154.47, 138.57, 144.83, 140.24, 156.07, 153.22, 129.57, 111.31, 134.72, 124.8, 120.83, 97.3, 112.33, 104.06, 100.3, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 189.36, 168.99, 221.23, 214.6, 237.68, 249.33, 268.03, 255.82] },
      velocityScore: { '1D': -1, '1W': -6.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$48B', pe: 101.9, revenueGrowth: 157, eps: 2.51, grossMargin: 68, dividendYield: null,
      etfPresence: { AIS: 1.08, ARTY: 1.27, BAI: 2.12, IGPT: false, IVES: false, ALAI: false, CHAT: 2.28, AIFD: false, SPRX: 2.87, AOTG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 4, avgWeight: 3.14, proScore: 1.25, coverage: 0.4,
      price: 126.25, weeklyPrices: [128.32, 131.72, 139.63, 127.02, 126.25], weeklyChange: -1.61, dayChange: -0.61, sortRank: 0, periodReturns: { '1M': 17, 'YTD': 242.1, '6M': 220.6, '1Y': 477 },
      priceHistory: { '1D': [127.02, 125.92, 126.25], '1W': [128.32, 131.72, 139.63, 127.02, 126.25], '1M': [107.93, 112.71, 111.78, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 127.02, 126.25], 'YTD': [36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 43.63, 45.5, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 110.8, 121.77, 112.71, 107.04, 121.1, 132.87, 126.25], '6M': [39.38, 45.55, 46.96, 42.49, 48.81, 50.24, 46.18, 46.12, 43.1, 46.78, 44.06, 44.06, 44.13, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 110.8, 121.77, 112.71, 107.04, 121.1, 132.87, 126.25], '1Y': [21.88, 23.82, 22.8, 22.63, 19.8, 19.77, 23.86, 23.54, 24.85, 24.61, 24.61, 30.57, 33.99, 37.3, 37.8, 36.84, 38.16, 40.16, 37.24, 35.91, 35.11, 36.81, 40.5, 39.51, 36.28, 36.2, 39.37, 44.06, 48.56, 43.93, 49.25, 47.13, 46.18, 46.12, 43.1, 46.78, 44.06, 44.06, 44.13, 58.95, 64.94, 65.27, 94.75, 113.01, 120.29, 110.8, 121.77, 112.71, 107.04, 121.1, 132.87, 126.25] },
      velocityScore: { '1D': -5.3, '1W': -3.8, '1M': -39.6, '6M': null }, isNew: false,
      marketCap: '$635B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.44, ARTY: false, BAI: 3.13, IGPT: 4.67, IVES: false, ALAI: false, CHAT: 1.3, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'ARM', name: 'ARM Holdings PLC', easyScore: 4, avgWeight: 2.98, proScore: 1.19, coverage: 0.4,
      price: 341.76, weeklyPrices: [334.27, 343.58, 354.57, 337.47, 341.76], weeklyChange: 2.24, dayChange: 1.27, sortRank: 0, periodReturns: { '1M': -15.1, 'YTD': 212.7, '6M': 197.9, '1Y': 121 },
      priceHistory: { '1D': [337.47, 339.66, 341.76], '1W': [334.27, 343.58, 354.57, 337.47, 341.76], '1M': [402.71, 411.83, 393.44, 342.93, 346.39, 324.86, 307.43, 342.23, 380.81, 412.55, 418.88, 439.46, 407.72, 366.39, 359.08, 347.71, 334.27, 343.58, 354.57, 337.47, 341.76], 'YTD': [109.31, 113.08, 105.11, 116.07, 105.36, 123.7, 125.28, 123.78, 124.37, 117.63, 121.7, 136.89, 136.96, 143.86, 161.22, 175.49, 198.65, 208.84, 207.92, 223.15, 302.71, 411.83, 307.43, 418.88, 347.71, 341.76], '6M': [114.73, 111.79, 105.78, 114.73, 106.93, 124.61, 126.89, 128.14, 121.72, 120.55, 127.31, 134.96, 151.28, 143.86, 161.22, 175.49, 198.65, 208.84, 207.92, 223.15, 302.71, 411.83, 307.43, 418.88, 347.71, 341.76], '1Y': [154.63, 148.55, 157.18, 159.99, 141.38, 135.57, 140.55, 131.16, 140.66, 135.48, 154.7, 146.54, 140.65, 152.15, 170.66, 171.19, 166.6, 165.45, 158.25, 140.31, 136.99, 132.61, 140.49, 136.14, 113.51, 110.27, 116.11, 111.14, 107.17, 114.88, 104.55, 125.95, 126.89, 128.14, 121.72, 120.55, 127.31, 134.96, 151.28, 148.91, 159.34, 196.57, 201.69, 237.3, 221.21, 223.15, 302.71, 411.83, 307.43, 418.88, 347.71, 341.76] },
      velocityScore: { '1D': -1.7, '1W': -8.5, '1M': -46.9, '6M': null }, isNew: false,
      marketCap: '$365B', pe: 406.9, revenueGrowth: 20, eps: 0.84, grossMargin: 98, dividendYield: null,
      etfPresence: { AIS: 1.85, ARTY: false, BAI: false, IGPT: false, IVES: false, ALAI: 0.17, CHAT: 2.58, AIFD: false, SPRX: 7.31, AOTG: false },
      tonyNote: 'Arm Holdings is held across Broad Tech and AI ETFs as the CPU architecture licensor embedded in every mobile device and increasingly in AI inference chips and data center CPUs. Revenue grew and the royalty model is high-margin; the weight score reflects consistent institutional positioning as the AI chip design ecosystem expands on Arm cores.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 4, avgWeight: 2.88, proScore: 1.15, coverage: 0.4,
      price: 306.83, weeklyPrices: [303.95, 306.97, 334.82, 311.42, 306.83], weeklyChange: 0.95, dayChange: -1.52, sortRank: 0, periodReturns: { '1M': -8.3, 'YTD': 89.4, '6M': 74.7, '1Y': 146.8 },
      priceHistory: { '1D': [311.58, 305.6, 306.83], '1W': [303.95, 306.97, 334.82, 311.42, 306.83], '1M': [334.49, 331.44, 323.92, 300.51, 300.57, 289.52, 280.98, 297.88, 302.87, 311.93, 317.58, 333.05, 357.96, 318.32, 316.43, 325.57, 303.95, 306.97, 334.82, 311.42, 306.83], 'YTD': [162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 234.53, 245.42, 257.75, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.13, 322.63, 319.78, 331.44, 280.98, 317.58, 325.57, 306.83], '6M': [175.61, 163.58, 176.93, 181.23, 190.01, 202, 243.53, 253.15, 244.44, 270.06, 268.41, 270.89, 250.58, 262.3, 310.51, 312.44, 305.03, 341.02, 367.13, 322.63, 319.78, 331.44, 280.98, 317.58, 325.57, 306.83], '1Y': [124.33, 120.72, 131.12, 130.87, 145.6, 139.39, 132.52, 127.54, 129.31, 125.7, 135.71, 141.96, 139.77, 161.64, 168.88, 177.82, 183.2, 193.76, 183.02, 163.64, 170.65, 172.02, 182.54, 178.66, 154.39, 167.58, 173.95, 170.03, 175.18, 189.21, 190.15, 199.62, 243.53, 253.15, 244.44, 270.06, 268.41, 270.89, 250.58, 281.03, 301.16, 305.14, 306.18, 358.92, 369.99, 322.63, 319.78, 331.44, 280.98, 317.58, 325.57, 306.83] },
      velocityScore: { '1D': -1.7, '1W': -8.7, '1M': -42.8, '6M': null }, isNew: false,
      marketCap: '$118B', pe: 76.9, revenueGrowth: 30, eps: 3.99, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 3.53, ARTY: false, BAI: 1.83, IGPT: false, IVES: false, ALAI: false, CHAT: 2.22, AIFD: 3.95, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'NBIS', name: 'NEBIUS GROUP NV', easyScore: 4, avgWeight: 2.71, proScore: 1.08, coverage: 0.4,
      price: 232, weeklyPrices: [240.30, 261.15, 276.17, 229.18, 232.00], weeklyChange: -3.45, dayChange: 1.23, sortRank: 0, periodReturns: { '1M': -11, 'YTD': 177.2, '6M': 157.9, '1Y': 364.3 },
      priceHistory: { '1D': [229.18, 229.94, 232], '1W': [240.3, 261.15, 276.17, 229.18, 232], '1M': [260.58, 251.68, 259.67, 227.81, 218, 220.12, 211.69, 222.24, 232.36, 260.07, 280.91, 286.69, 283.61, 275.25, 259.66, 256.63, 240.3, 261.15, 276.17, 229.18, 232], 'YTD': [83.71, 97.3, 103.89, 94.5, 85.19, 86.1, 98.01, 100.61, 91.01, 94.94, 129.85, 114.15, 92.26, 117.4, 161.94, 156.55, 135.51, 175.92, 179.11, 197.73, 208.37, 251.68, 211.69, 280.91, 256.63, 232], '6M': [89.95, 97.93, 108.73, 91.46, 88.16, 92.88, 97.52, 102.58, 86.8, 96.43, 116.33, 114.91, 103.76, 117.4, 161.94, 156.55, 135.51, 175.92, 179.11, 197.73, 208.37, 251.68, 211.69, 280.91, 256.63, 232], '1Y': [49.97, 46.43, 53.69, 52.16, 54.43, 65.31, 68.46, 67.47, 70.1, 64.91, 89.19, 94.12, 107.94, 125.87, 132.64, 123.04, 106.16, 124.18, 109.44, 88.63, 95.07, 94.69, 102.8, 94.28, 78.09, 87.59, 92.83, 107.33, 99.29, 97.87, 89.95, 91.79, 97.52, 102.58, 86.8, 96.43, 116.33, 114.91, 103.76, 125, 166.77, 156.14, 141.19, 195.09, 207.27, 197.73, 208.37, 251.68, 211.69, 280.91, 256.63, 232] },
      velocityScore: { '1D': -12.9, '1W': -14.3, '1M': -43.2, '6M': null }, isNew: false,
      marketCap: '$59B', pe: 89.6, revenueGrowth: 684, eps: 2.59, grossMargin: 72, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 2.31, ALAI: 3.34, CHAT: 3.3, AIFD: 1.89, SPRX: false, AOTG: false },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 4.56, proScore: 4.56, coverage: 1,
      price: 1059.51, weeklyPrices: [1132.33, 1145.28, 1154.29, 1032.28, 1059.51], weeklyChange: -6.43, dayChange: 2.64, sortRank: 0, periodReturns: { '1M': -0.4, 'YTD': 271.2, '6M': 235.9, '1Y': 770.3 },
      priceHistory: { '1D': [1032.28, 1055.41, 1059.51], '1W': [1132.33, 1145.28, 1154.29, 1032.28, 1059.51], '1M': [1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 1059.51], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1213.56, 1059.51], '6M': [315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1213.56, 1059.51], '1Y': [121.74, 123.11, 113.26, 111.73, 109.14, 111.87, 125.29, 117.21, 117.75, 124.21, 150.57, 168.89, 156.83, 183.75, 192.33, 202.53, 206.71, 224.01, 238.33, 236.95, 225.92, 230.26, 226.65, 258.46, 248.55, 284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1213.56, 1059.51] },
      velocityScore: { '1D': -3.2, '1W': 6, '1M': -36.8, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 23.9, revenueGrowth: 346, eps: 44.28, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { SOXX: 8.17, PSI: 5.37, XSD: 2.56, DRAM: 2.14 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 5.23, proScore: 3.92, coverage: 0.75,
      price: 537, weeklyPrices: [521.58, 539.49, 580.91, 540.88, 537.00], weeklyChange: 2.96, dayChange: -0.72, sortRank: 0, periodReturns: { '1M': 3, 'YTD': 150.7, '6M': 140.3, '1Y': 287.7 },
      priceHistory: { '1D': [540.88, 534.8, 537], '1W': [521.58, 539.49, 580.91, 540.88, 537], '1M': [521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 537], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 542.52, 452.4, 512.48, 532.57, 537], '6M': [223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 542.52, 452.4, 512.48, 532.57, 537], '1Y': [138.52, 144.16, 160.41, 162.12, 176.31, 172.4, 180.95, 165.2, 167.13, 161.79, 155.67, 157.92, 161.27, 169.73, 232.89, 234.56, 234.99, 254.84, 237.7, 247.96, 223.55, 214.24, 215.98, 221.43, 201.06, 214.99, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 203.08, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 414.05, 495.54, 542.52, 452.4, 512.48, 532.57, 537] },
      velocityScore: { '1D': -0.5, '1W': 3.2, '1M': -35.1, '6M': null }, isNew: false,
      marketCap: '$876B', pe: 180.8, revenueGrowth: 38, eps: 2.97, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 8.06, PSI: 5, XSD: 2.64, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 4.55, proScore: 3.41, coverage: 0.75,
      price: 198.25, weeklyPrices: [192.53, 194.97, 200.09, 197.58, 198.25], weeklyChange: 2.97, dayChange: 0.34, sortRank: 0, periodReturns: { '1M': -11, 'YTD': 6.3, '6M': 5, '1Y': 26.1 },
      priceHistory: { '1D': [197.58, 198.38, 198.25], '1W': [192.53, 194.97, 200.09, 197.58, 198.25], '1M': [222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 198.25], 'YTD': [186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 212.6, 214.75, 200.42, 204.65, 195.74, 198.25], '6M': [188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 184.77, 181.93, 175.2, 174.4, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 212.6, 214.75, 200.42, 204.65, 195.74, 198.25], '1Y': [157.25, 164.1, 173, 173.74, 177.87, 180.77, 182.02, 175.4, 181.6, 171.66, 177.17, 176.24, 177.69, 188.89, 192.57, 181.81, 182.16, 202.89, 188.08, 186.86, 186.52, 180.26, 183.38, 180.93, 174.14, 190.53, 188.12, 184.94, 178.07, 188.52, 180.34, 188.54, 184.97, 192.85, 180.05, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 220.61, 212.6, 214.75, 200.42, 204.65, 195.74, 198.25] },
      velocityScore: { '1D': 5.6, '1W': -1.7, '1M': -0.6, '6M': null }, isNew: false,
      marketCap: '$4.8T', pe: 30.4, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.51,
      etfPresence: { SOXX: 7.19, PSI: 4.28, XSD: 2.17, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.52, proScore: 3.39, coverage: 0.75,
      price: 126.25, weeklyPrices: [128.32, 131.72, 139.63, 127.02, 126.25], weeklyChange: -1.61, dayChange: -0.61, sortRank: 0, periodReturns: { '1M': 17, 'YTD': 242.1, '6M': 220.6, '1Y': 477 },
      priceHistory: { '1D': [127.02, 125.92, 126.25], '1W': [128.32, 131.72, 139.63, 127.02, 126.25], '1M': [107.93, 112.71, 111.78, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 127.02, 126.25], 'YTD': [36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 43.63, 45.5, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 110.8, 121.77, 112.71, 107.04, 121.1, 132.87, 126.25], '6M': [39.38, 45.55, 46.96, 42.49, 48.81, 50.24, 46.18, 46.12, 43.1, 46.78, 44.06, 44.06, 44.13, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 110.8, 121.77, 112.71, 107.04, 121.1, 132.87, 126.25], '1Y': [21.88, 23.82, 22.8, 22.63, 19.8, 19.77, 23.86, 23.54, 24.85, 24.61, 24.61, 30.57, 33.99, 37.3, 37.8, 36.84, 38.16, 40.16, 37.24, 35.91, 35.11, 36.81, 40.5, 39.51, 36.28, 36.2, 39.37, 44.06, 48.56, 43.93, 49.25, 47.13, 46.18, 46.12, 43.1, 46.78, 44.06, 44.06, 44.13, 58.95, 64.94, 65.27, 94.75, 113.01, 120.29, 110.8, 121.77, 112.71, 107.04, 121.1, 132.87, 126.25] },
      velocityScore: { '1D': -2.9, '1W': -4.5, '1M': 2.7, '6M': null }, isNew: false,
      marketCap: '$635B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 6.16, PSI: 4.79, XSD: 2.62, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.37, proScore: 2.52, coverage: 0.75,
      price: 395.18, weeklyPrices: [386.91, 391.78, 397.17, 388.98, 395.18], weeklyChange: 2.14, dayChange: 1.59, sortRank: 0, periodReturns: { '1M': -6.6, 'YTD': 45.7, '6M': 44.4, '1Y': 61.2 },
      priceHistory: { '1D': [388.98, 393.96, 395.18], '1W': [386.91, 391.78, 397.17, 388.98, 395.18], '1M': [423.2, 437.67, 428.76, 401.39, 403.89, 404.62, 392.67, 412.13, 417.79, 427.58, 414.45, 434.46, 445.48, 407.26, 413.16, 417.93, 386.91, 391.78, 397.17, 388.98, 395.18], 'YTD': [271.2, 299.16, 302.1, 305.6, 310.88, 320.45, 337.1, 355.15, 352.41, 319.71, 310.92, 312.19, 303.1, 327.41, 348.6, 375.27, 383.26, 404.77, 419.65, 414.31, 416.88, 437.67, 392.67, 414.45, 417.93, 395.18], '6M': [273.74, 300.93, 300.25, 304.01, 316.86, 322.97, 337.51, 356.09, 338.99, 318.81, 313.66, 321.83, 318.14, 327.41, 348.6, 375.27, 383.26, 404.77, 419.65, 414.31, 416.88, 437.67, 392.67, 414.45, 417.93, 395.18], '1Y': [245.15, 245.13, 240.97, 226.37, 224.63, 223.12, 236.21, 244.87, 255.5, 246.11, 248.24, 249.05, 247.53, 241.67, 237.88, 241.61, 243.29, 232.9, 232.88, 237.53, 232.2, 257.92, 277.26, 283.39, 274.92, 276.84, 277.29, 293.86, 295.67, 303.83, 311.29, 325.16, 337.51, 356.09, 338.99, 318.81, 313.66, 321.83, 318.14, 346.21, 347.94, 381.42, 389.31, 415.63, 432.39, 414.31, 416.88, 437.67, 392.67, 414.45, 417.93, 395.18] },
      velocityScore: { '1D': 4.1, '1W': -7.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$192B', pe: 58.7, revenueGrowth: 37, eps: 6.73, grossMargin: 64, dividendYield: 1.13,
      etfPresence: { SOXX: 3.61, PSI: 4.31, XSD: 2.18, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 6.12, proScore: 3.06, coverage: 0.5,
      price: 644.61, weeklyPrices: [626.84, 694.64, 723.00, 650.91, 644.61], weeklyChange: 2.83, dayChange: -0.97, sortRank: 0, periodReturns: { '1M': 31.5, 'YTD': 150.8, '6M': 139.7, '1Y': 239.3 },
      priceHistory: { '1D': [650.91, 644.35, 644.61], '1W': [626.84, 694.64, 723, 650.91, 644.61], '1M': [490.05, 500.77, 501.7, 453.01, 492.17, 499.21, 497.01, 552.64, 567.25, 585.78, 592.92, 617.11, 640.18, 585.88, 588.97, 668, 626.84, 694.64, 723, 650.91, 644.61], 'YTD': [256.99, 281.64, 319.08, 322.38, 322.32, 322.51, 354.91, 373.55, 372.18, 338.94, 346.18, 361.79, 323.12, 354.31, 395.64, 394.33, 381.11, 410.82, 431.2, 406.91, 448.25, 500.77, 497.01, 592.92, 668, 644.61], '6M': [268.87, 301.18, 327.01, 319.46, 328.4, 330.57, 359.13, 377.93, 351.32, 345.88, 352.46, 373.99, 341.79, 354.31, 395.64, 394.33, 381.11, 410.82, 431.2, 406.91, 448.25, 500.77, 497.01, 592.92, 668, 644.61], '1Y': [190.01, 198.03, 192.52, 188.12, 180.06, 183.15, 188.24, 160.96, 164.39, 158.24, 170.15, 189.76, 199.6, 223.59, 220.3, 227.72, 228.47, 232.55, 233.53, 223.23, 235.13, 249.97, 269.44, 270.11, 253.5, 261.9, 284.32, 307.24, 318.23, 332.71, 318.67, 329.07, 359.13, 377.93, 351.32, 345.88, 352.46, 373.99, 341.79, 385.72, 394.26, 403.48, 382.59, 428.62, 436.61, 406.91, 448.25, 500.77, 497.01, 592.92, 668, 644.61] },
      velocityScore: { '1D': -3.2, '1W': 9.3, '1M': 1.7, '6M': null }, isNew: false,
      marketCap: '$512B', pe: 60.8, revenueGrowth: 11, eps: 10.61, grossMargin: 49, dividendYield: 0.33,
      etfPresence: { SOXX: 5.56, PSI: 6.67, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 5.74, proScore: 2.87, coverage: 0.5,
      price: 259.8, weeklyPrices: [248.64, 278.39, 301.71, 266.19, 259.80], weeklyChange: 4.49, dayChange: -2.4, sortRank: 0, periodReturns: { '1M': 27, 'YTD': 113.8, '6M': 103.8, '1Y': 182 },
      priceHistory: { '1D': [266.19, 258.6, 259.8], '1W': [248.64, 278.39, 301.71, 266.19, 259.8], '1M': [204.52, 212.51, 213.11, 192.92, 210.81, 213.94, 213.56, 241.16, 254.54, 256.42, 238.73, 259.56, 269.16, 244.49, 240.48, 258.8, 248.64, 278.39, 301.71, 266.19, 259.8], 'YTD': [121.51, 132.46, 154.5, 151.28, 142.79, 144.29, 146.41, 148.77, 153.49, 142.91, 143.82, 151.14, 138.26, 154.88, 179.59, 178.54, 180.9, 173.29, 181.13, 174.06, 195.72, 212.51, 213.56, 238.73, 258.8, 259.8], '6M': [127.45, 140, 156.78, 154.3, 141.04, 144.02, 147.02, 150.66, 144.13, 145.29, 148.13, 156.62, 147.24, 154.88, 179.59, 178.54, 180.9, 173.29, 181.13, 174.06, 195.72, 212.51, 213.56, 238.73, 258.8, 259.8], '1Y': [92.11, 92.86, 93.71, 90.42, 87.9, 91.21, 95.54, 87.84, 88.89, 87.33, 95.93, 104.67, 105.91, 113.93, 105.35, 109.88, 115.9, 121.44, 120.64, 116.17, 116.75, 115.91, 120.81, 124.62, 122.24, 127.96, 135.24, 142.82, 148.62, 161.63, 135.55, 143.08, 147.02, 150.66, 144.13, 145.29, 148.13, 156.62, 147.24, 167.23, 174.81, 181.21, 181.62, 181.63, 184.97, 174.06, 195.72, 212.51, 213.56, 238.73, 258.8, 259.8] },
      velocityScore: { '1D': -5.3, '1W': 9.1, '1M': 10, '6M': null }, isNew: false,
      marketCap: '$339B', pe: 73.4, revenueGrowth: 12, eps: 3.54, grossMargin: 61, dividendYield: 0.35,
      etfPresence: { SOXX: 5.32, PSI: 6.16, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 5.19, proScore: 2.6, coverage: 0.5,
      price: 388.15, weeklyPrices: [379.09, 410.91, 433.33, 391.26, 388.15], weeklyChange: 2.39, dayChange: -0.79, sortRank: 0, periodReturns: { '1M': 16.1, 'YTD': 126.7, '6M': 109.7, '1Y': 292.7 },
      priceHistory: { '1D': [391.26, 386.5, 388.15], '1W': [379.09, 410.91, 433.33, 391.26, 388.15], '1M': [334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81, 388.92, 374.18, 389.04, 409.54, 371.33, 374.8, 401.82, 379.09, 410.91, 433.33, 391.26, 388.15], 'YTD': [171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 242.27, 231, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 273.38, 318.93, 343.71, 321.8, 374.18, 401.82, 388.15], '6M': [185.06, 218.36, 222.96, 222.87, 237.5, 229.28, 235.58, 244.25, 217.27, 215.23, 226.47, 238.84, 213.66, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 273.38, 318.93, 343.71, 321.8, 374.18, 401.82, 388.15], '1Y': [98.83, 101.06, 100.79, 97.78, 94.84, 99.15, 107.38, 99.15, 103.67, 100.42, 115.58, 126.32, 128.13, 146.99, 141, 142.37, 147.54, 161.01, 162.19, 153.32, 148.8, 155.14, 157.09, 168.71, 164.7, 178.07, 194.76, 220.4, 222.41, 238.46, 230.1, 226.61, 235.58, 244.25, 217.27, 215.23, 226.47, 238.84, 213.66, 246.49, 265.16, 265.55, 248.75, 297.17, 295.44, 273.38, 318.93, 343.71, 321.8, 374.18, 401.82, 388.15] },
      velocityScore: { '1D': -2.6, '1W': 3.2, '1M': -3.3, '6M': null }, isNew: false,
      marketCap: '$485B', pe: 73.5, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.27,
      etfPresence: { SOXX: 4.73, PSI: 5.65, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 4.27, proScore: 2.13, coverage: 0.5,
      price: 370.62, weeklyPrices: [365.02, 372.45, 377.75, 369.34, 370.62], weeklyChange: 1.53, dayChange: 0.35, sortRank: 0, periodReturns: { '1M': -23, 'YTD': 7.1, '6M': 6.6, '1Y': 37.3 },
      priceHistory: { '1D': [369.34, 369.27, 370.62], '1W': [365.02, 372.45, 377.75, 369.34, 370.62], '1M': [481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 370.62], 'YTD': [346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 421.86, 479.23, 372.1, 392.9, 378.91, 370.62], '6M': [347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 342.58, 321.31, 318.29, 309.51, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 421.86, 479.23, 372.1, 392.9, 378.91, 370.62], '1Y': [269.9, 275.4, 286.45, 288.71, 293.7, 303.76, 311.23, 291.17, 300.25, 306.1, 359.63, 345.35, 336.1, 338.18, 345.02, 354.15, 344.29, 376.47, 355.59, 339.98, 354.42, 397.57, 381.03, 406.37, 329.88, 352.13, 343.42, 352.21, 332.6, 332.79, 320.33, 340.44, 332.54, 325.49, 313.84, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 411.07, 421.86, 479.23, 372.1, 392.9, 378.91, 370.62] },
      velocityScore: { '1D': 3.9, '1W': -3.2, '1M': -46.3, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 61.6, revenueGrowth: 48, eps: 6.02, grossMargin: 76, dividendYield: 0.7,
      etfPresence: { SOXX: 6.35, PSI: false, XSD: 2.18, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 3.74, proScore: 1.87, coverage: 0.5,
      price: 270.38, weeklyPrices: [266.77, 277.75, 297.89, 272.05, 270.38], weeklyChange: 1.35, dayChange: -0.61, sortRank: 0, periodReturns: { '1M': -7, 'YTD': 218.2, '6M': 202.5, '1Y': 264.1 },
      priceHistory: { '1D': [272.05, 268.52, 270.38], '1W': [266.77, 277.75, 297.89, 272.05, 270.38], '1M': [290.79, 301.65, 316.43, 263.47, 288.85, 266.88, 252.59, 280.71, 279.7, 308.88, 289.54, 310.58, 307.86, 279.04, 276.7, 281.26, 266.77, 277.75, 297.89, 272.05, 270.38], 'YTD': [84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 176.27, 198.7, 301.65, 252.59, 289.54, 281.26, 270.38], '6M': [89.39, 83.22, 80.46, 81.77, 78.66, 82.35, 79.01, 78.39, 77.51, 93.3, 90.79, 92.36, 99.05, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 176.27, 198.7, 301.65, 252.59, 289.54, 281.26, 270.38], '1Y': [74.25, 73.36, 72.01, 74.04, 80.37, 75.85, 79.04, 71.22, 74.79, 64.1, 66.59, 74.23, 83.81, 86.2, 90.68, 88.23, 82.77, 88.57, 93.33, 87.52, 81.32, 87.72, 98.19, 89.43, 84.47, 86.34, 90.23, 82.89, 79.8, 82.93, 75.54, 82.01, 79.01, 78.39, 77.51, 93.3, 90.79, 92.36, 99.05, 114.45, 134.6, 157.32, 156.57, 172.15, 177.95, 176.27, 198.7, 301.65, 252.59, 289.54, 281.26, 270.38] },
      velocityScore: { '1D': 1.6, '1W': -1.6, '1M': -48.5, '6M': null }, isNew: false,
      marketCap: '$237B', pe: 92.9, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.09,
      etfPresence: { SOXX: 5.1, PSI: false, XSD: 2.38, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 3.04, proScore: 1.52, coverage: 0.5,
      price: 301.99, weeklyPrices: [285.43, 285.48, 298.07, 298.41, 301.99], weeklyChange: 5.8, dayChange: 1.2, sortRank: 0, periodReturns: { '1M': -2, 'YTD': 74.1, '6M': 70.1, '1Y': 40.1 },
      priceHistory: { '1D': [298.41, 300.36, 301.99], '1W': [285.43, 285.48, 298.07, 298.41, 301.99], '1M': [308.12, 308.59, 305.37, 285.06, 290.9, 288.63, 282.01, 297.1, 301.12, 313.34, 301.88, 322.86, 332.28, 304.36, 303.11, 311.81, 285.43, 285.48, 298.07, 298.41, 301.99], 'YTD': [173.49, 188.45, 189.12, 193.31, 215.55, 221.44, 226.16, 219.86, 209.82, 196.2, 194.13, 188.63, 186.42, 199.74, 218.87, 233.15, 265, 281, 295.17, 302.31, 317.45, 308.59, 282.01, 301.88, 311.81, 301.99], '6M': [177.52, 190.31, 191.58, 196.59, 225.01, 218.77, 225.69, 213.35, 202.67, 197.46, 194.45, 194.63, 194.14, 199.74, 218.87, 233.15, 265, 281, 295.17, 302.31, 317.45, 308.59, 282.01, 301.88, 311.81, 301.99], '1Y': [215.59, 219.66, 216.59, 185.69, 181.06, 185.91, 193.71, 200.77, 205.47, 187.29, 184.35, 181.62, 182.04, 182.32, 178.96, 175.48, 172.19, 160.51, 161.38, 162.23, 157.09, 165.35, 180.12, 181.67, 176.19, 176.88, 177.17, 189.07, 189.59, 196.63, 225.21, 220.92, 225.69, 213.35, 202.67, 197.46, 194.45, 194.63, 194.14, 208.9, 216.29, 236.31, 269.22, 289.44, 306.34, 302.31, 317.45, 308.59, 282.01, 301.88, 311.81, 301.99] },
      velocityScore: { '1D': 6.3, '1W': -1.3, '1M': -48.1, '6M': null }, isNew: false,
      marketCap: '$275B', pe: 51.6, revenueGrowth: 19, eps: 5.85, grossMargin: 57, dividendYield: 1.9,
      etfPresence: { SOXX: 3.75, PSI: false, XSD: 2.33, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 2.88, proScore: 1.44, coverage: 0.5,
      price: 426.01, weeklyPrices: [391.74, 455.96, 483.02, 430.86, 426.01], weeklyChange: 8.75, dayChange: -1.12, sortRank: 0, periodReturns: { '1M': 19.7, 'YTD': 156.1, '6M': 137.3, '1Y': 381 },
      priceHistory: { '1D': [430.86, 421.39, 426.01], '1W': [391.74, 455.96, 483.02, 430.86, 426.01], '1M': [355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86, 426.01], 'YTD': [166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 325.33, 363.54, 330.86, 374.68, 398, 426.01], '6M': [179.56, 162.61, 182, 163.25, 152.44, 187.67, 123.69, 128.4, 109.8, 116.48, 127.57, 121.76, 109.6, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 325.33, 363.54, 330.86, 374.68, 398, 426.01], '1Y': [88.57, 97.02, 97.95, 121.68, 136.73, 170.89, 190.69, 172.45, 179.2, 187.95, 232.9, 251.88, 200.64, 209.6, 225.43, 163.55, 163.64, 169.55, 162.83, 144.47, 142.01, 154.22, 152.51, 173.7, 145.88, 167.26, 167.11, 172.57, 183.75, 170.93, 158.52, 182.86, 123.69, 128.4, 109.8, 116.48, 127.57, 121.76, 109.6, 125.46, 172.09, 194.06, 196.85, 213.91, 224.09, 244.26, 325.33, 363.54, 330.86, 374.68, 398, 426.01] },
      velocityScore: { '1D': -5.3, '1W': 7.5, '1M': -33.3, '6M': null }, isNew: false,
      marketCap: '$73B', pe: 291.8, revenueGrowth: 93, eps: 1.46, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.88, PSI: false, XSD: 2.88, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.74, proScore: 1.37, coverage: 0.5,
      price: 284.97, weeklyPrices: [277.02, 278.37, 281.03, 279.18, 284.97], weeklyChange: 2.87, dayChange: 2.07, sortRank: 0, periodReturns: { '1M': -11.9, 'YTD': 31.3, '6M': 28.8, '1Y': 23.3 },
      priceHistory: { '1D': [279.18, 283.76, 284.97], '1W': [277.02, 278.37, 281.03, 279.18, 284.97], '1M': [323.62, 321.88, 322.22, 295.96, 301.14, 297.41, 285.56, 302.55, 304.86, 315.88, 298.2, 313.27, 323.24, 299.94, 294.06, 298.64, 277.02, 278.37, 281.03, 279.18, 284.97], 'YTD': [217.06, 237.89, 238.6, 232.48, 226.14, 224.32, 244.43, 231.16, 224.76, 205.25, 191.89, 193.39, 187.39, 195.12, 209.89, 224.5, 230.39, 292.35, 294.23, 294.28, 329.24, 321.88, 285.56, 298.2, 298.64, 284.97], '6M': [221.28, 241.15, 237.11, 231.05, 231.08, 228.91, 245.09, 234.63, 215.25, 203.03, 194.02, 196.4, 196.86, 195.12, 209.89, 224.5, 230.39, 292.35, 294.23, 294.28, 329.24, 321.88, 285.56, 298.2, 298.64, 284.97], '1Y': [231.15, 233.19, 224.5, 224.43, 213.77, 205.91, 231.54, 228.77, 237.67, 225.39, 223.21, 226.51, 226.81, 227.71, 221.42, 217.41, 220.73, 206.38, 206.45, 201.22, 190.06, 193.76, 226.16, 231.83, 222.08, 222.87, 223.88, 238.33, 230.7, 229.42, 220.66, 236.62, 245.09, 234.63, 215.25, 203.03, 194.02, 196.4, 196.86, 204.27, 209.39, 225.75, 289.25, 303.55, 298.41, 294.28, 329.24, 321.88, 285.56, 298.2, 298.64, 284.97] },
      velocityScore: { '1D': 5.4, '1W': -5.5, '1M': -32.2, '6M': null }, isNew: false,
      marketCap: '$72B', pe: 27.2, revenueGrowth: 12, eps: 10.47, grossMargin: 56, dividendYield: 1.45,
      etfPresence: { SOXX: 3.34, PSI: false, XSD: 2.15, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.5, proScore: 1.25, coverage: 0.5,
      price: 1361.97, weeklyPrices: [1313.32, 1312.77, 1382.36, 1331.73, 1361.97], weeklyChange: 3.7, dayChange: 2.27, sortRank: 0, periodReturns: { '1M': -16.2, 'YTD': 50.3, '6M': 45.5, '1Y': 78.2 },
      priceHistory: { '1D': [1331.73, 1359.26, 1361.97], '1W': [1313.32, 1312.77, 1382.36, 1331.73, 1361.97], '1M': [1624.99, 1689.89, 1652.6, 1481.05, 1559.18, 1531.98, 1473.04, 1589.55, 1577.32, 1652.29, 1448.21, 1563.7, 1537.88, 1423.76, 1434.95, 1438.3, 1313.32, 1312.77, 1382.36, 1331.73, 1361.97], 'YTD': [906.36, 959.09, 1009.54, 1063.74, 1124.15, 1229.82, 1171.47, 1190.06, 1142.58, 1062, 1077.4, 1076.35, 1002.34, 1191.22, 1363.42, 1527.95, 1504.08, 1588.12, 1599.52, 1468.11, 1620.17, 1689.89, 1473.04, 1448.21, 1438.3, 1361.97], '6M': [936.31, 958.97, 1033.17, 1068.14, 1173.22, 1206.18, 1173.18, 1213.67, 1074.37, 1055.82, 1066.66, 1101.59, 1093.35, 1191.22, 1363.42, 1527.95, 1504.08, 1588.12, 1599.52, 1468.11, 1620.17, 1689.89, 1473.04, 1448.21, 1438.3, 1361.97], '1Y': [764.4, 740.45, 713.57, 713, 711.24, 797.94, 848.81, 826.27, 866.32, 848.11, 840.38, 917.78, 891.39, 930.51, 979.25, 1026.83, 1070.8, 1087.56, 958.07, 924.29, 884.65, 924.95, 952.74, 981.48, 929.48, 946.32, 955.03, 967.16, 1034.49, 1095.49, 1164.83, 1142.02, 1173.18, 1213.67, 1074.37, 1055.82, 1066.66, 1101.59, 1093.35, 1312.94, 1353, 1522.04, 1526.84, 1652.35, 1650.35, 1468.11, 1620.17, 1689.89, 1473.04, 1448.21, 1438.3, 1361.97] },
      velocityScore: { '1D': 1.6, '1W': -7.4, '1M': -35.6, '6M': null }, isNew: false,
      marketCap: '$67B', pe: 97.4, revenueGrowth: 26, eps: 13.98, grossMargin: 55, dividendYield: 0.6,
      etfPresence: { SOXX: 3.02, PSI: false, XSD: 1.99, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 2.45, proScore: 1.22, coverage: 0.5,
      price: 184.66, weeklyPrices: [189.39, 188.72, 184.79, 181.92, 184.66], weeklyChange: -2.5, dayChange: 1.51, sortRank: 0, periodReturns: { '1M': -23.3, 'YTD': 8, '6M': 6.8, '1Y': 13.8 },
      priceHistory: { '1D': [181.92, 184.54, 184.66], '1W': [189.39, 188.72, 184.79, 181.92, 184.66], '1M': [240.84, 250.01, 242.57, 215.94, 217.77, 205.42, 191.2, 202.96, 211.72, 220.81, 212.97, 226.11, 221.9, 204.13, 197.41, 204.9, 189.39, 188.72, 184.79, 181.92, 184.66], 'YTD': [171.05, 181.87, 161.39, 155.82, 151.59, 137.34, 140.7, 140.41, 141.03, 138.11, 129.39, 128.35, 127.07, 124.07, 132.84, 135.56, 150, 186.55, 210.31, 195.61, 233.4, 250.01, 191.2, 212.97, 204.9, 184.66], '6M': [172.98, 177.78, 159.42, 154.52, 152.62, 138.93, 142.63, 144.78, 138.13, 135.2, 131.59, 128.67, 128.78, 124.07, 132.84, 135.56, 150, 186.55, 210.31, 195.61, 233.4, 250.01, 191.2, 212.97, 204.9, 184.66], '1Y': [162.32, 159.09, 152.61, 158.84, 146.76, 145.9, 158.09, 155.44, 159.77, 159.71, 161.51, 168.13, 169.68, 168.85, 165.66, 164.08, 170.03, 177.26, 173.2, 174.5, 166.11, 165.14, 174.35, 181.27, 174.19, 174.81, 176.31, 169.27, 154.07, 153.04, 147.18, 140.09, 142.63, 144.78, 138.13, 135.2, 131.59, 128.67, 128.78, 127.51, 133.05, 136.07, 156, 192.57, 213.17, 195.61, 233.4, 250.01, 191.2, 212.97, 204.9, 184.66] },
      velocityScore: { '1D': 4.3, '1W': -8.3, '1M': -47.2, '6M': null }, isNew: false,
      marketCap: '$195B', pe: 19.9, revenueGrowth: -4, eps: 9.3, grossMargin: 55, dividendYield: 2.02,
      etfPresence: { SOXX: 2.79, PSI: false, XSD: 2.1, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.24, proScore: 1.12, coverage: 0.5,
      price: 89.61, weeklyPrices: [87.93, 89.06, 91.20, 88.69, 89.61], weeklyChange: 1.92, dayChange: 1.04, sortRank: 0, periodReturns: { '1M': -7.6, 'YTD': 40.6, '6M': 37.8, '1Y': 22.5 },
      priceHistory: { '1D': [88.69, 88.96, 89.61], '1W': [87.93, 89.06, 91.2, 88.69, 89.61], '1M': [96.96, 96.55, 96.3, 88.34, 91.37, 91.47, 87.91, 92.94, 95.24, 100.32, 94.11, 99.77, 102.71, 93.26, 92.48, 94.12, 87.93, 89.06, 91.2, 88.69, 89.61], 'YTD': [63.72, 73.53, 74.45, 74.71, 75.92, 76.01, 78.56, 76.6, 74.31, 65, 63.83, 64.34, 60.06, 67.51, 74.5, 80.93, 84.26, 98.48, 97.7, 91.81, 96.85, 96.55, 87.91, 94.11, 94.12, 89.61], '6M': [65.03, 75.22, 74.7, 74.79, 78.08, 74.41, 78.94, 75.93, 71.39, 65.33, 64.59, 65.63, 64.61, 67.51, 74.5, 80.93, 84.26, 98.48, 97.7, 91.81, 96.85, 96.55, 87.91, 94.11, 94.12, 89.61], '1Y': [73.16, 75.08, 74.3, 67.81, 67.59, 66.22, 65.99, 66.76, 66.65, 64.43, 65.02, 66.26, 64.84, 66.13, 65.86, 65.35, 65.09, 62.07, 59.35, 54.81, 50.8, 52.57, 64.72, 69.09, 64.06, 64.94, 67.06, 73.39, 73.17, 75.16, 76.66, 76.86, 78.94, 75.93, 71.39, 65.33, 64.59, 65.63, 64.61, 70.73, 74.49, 82.48, 90.17, 102.92, 96.71, 91.81, 96.85, 96.55, 87.91, 94.11, 94.12, 89.61] },
      velocityScore: { '1D': 2.8, '1W': -4.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$49B', pe: 407.3, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 2.05,
      etfPresence: { SOXX: 2.25, PSI: false, XSD: 2.23, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.23, proScore: 1.11, coverage: 0.5,
      price: 255.82, weeklyPrices: [238.00, 245.68, 271.95, 259.09, 255.82], weeklyChange: 7.49, dayChange: -1.26, sortRank: 0, periodReturns: { '1M': 11.7, 'YTD': 77.8, '6M': 78.6, '1Y': 186.2 },
      priceHistory: { '1D': [259.09, 253.53, 255.82], '1W': [238, 245.68, 271.95, 259.09, 255.82], '1M': [229, 214.6, 217.5, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81, 259.41, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.09, 255.82], 'YTD': [143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.05, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.23, 214.6, 237.68, 249.33, 268.03, 255.82], '6M': [143.22, 150.42, 150.97, 128.02, 119.96, 123.41, 124.8, 120.83, 97.3, 112.33, 104.06, 100.3, 93.87, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.23, 214.6, 237.68, 249.33, 268.03, 255.82], '1Y': [89.37, 97.29, 98.45, 101.17, 111.55, 119.78, 117.33, 105.99, 122.73, 134, 159.32, 172.31, 144.94, 149.63, 151.15, 136.53, 150.97, 166.62, 162.74, 142.95, 141.88, 164.01, 180.92, 154.47, 138.57, 144.83, 140.24, 156.07, 153.22, 129.57, 111.31, 134.72, 124.8, 120.83, 97.3, 112.33, 104.06, 100.3, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 189.36, 168.99, 221.23, 214.6, 237.68, 249.33, 268.03, 255.82] },
      velocityScore: { '1D': 0, '1W': -4.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$48B', pe: 101.9, revenueGrowth: 157, eps: 2.51, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 2.05, PSI: false, XSD: 2.41, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 1.82, proScore: 0.91, coverage: 0.5,
      price: 96.77, weeklyPrices: [90.65, 88.57, 94.54, 94.63, 96.77], weeklyChange: 6.75, dayChange: 2.26, sortRank: 0, periodReturns: { '1M': -24.8, 'YTD': 78.7, '6M': 70.7, '1Y': 73 },
      priceHistory: { '1D': [94.63, 96.1, 96.77], '1W': [90.65, 88.57, 94.54, 94.63, 96.77], '1M': [128.64, 133.93, 131.82, 117.26, 120.9, 117, 110.17, 115.96, 116.79, 125.9, 112.92, 121.62, 131.55, 117.06, 115.74, 118.74, 90.65, 88.57, 94.54, 94.63, 96.77], 'YTD': [54.15, 60.89, 60.28, 61.98, 59.89, 65.2, 72.21, 69.47, 66.48, 59.23, 59.88, 59.89, 55.66, 63.79, 72.05, 86.91, 93.3, 102.67, 104.11, 106.02, 124.89, 133.93, 110.17, 112.92, 118.74, 96.77], '6M': [56.7, 62.16, 60.33, 61.13, 61.53, 65.1, 71.96, 70.03, 63.42, 59.59, 60.98, 62.34, 61.92, 63.79, 72.05, 86.91, 93.3, 102.67, 104.11, 106.02, 124.89, 133.93, 110.17, 112.92, 118.74, 96.77], '1Y': [55.95, 59.52, 59.41, 55.44, 56.36, 47.59, 51.62, 49.47, 51.25, 48.06, 49.02, 51.83, 49.77, 48.74, 49.97, 52.97, 51.78, 50.85, 48.8, 48.13, 46.12, 49.64, 54.79, 55.97, 54.34, 54.93, 58.69, 58.75, 60.06, 62.63, 59.43, 67.38, 71.96, 70.03, 63.42, 59.59, 60.98, 62.34, 61.92, 68.38, 72.43, 88.99, 98.86, 105.77, 115.71, 106.02, 124.89, 133.93, 110.17, 112.92, 118.74, 96.77] },
      velocityScore: { '1D': 5.8, '1W': -18.8, '1M': -53.1, '6M': null }, isNew: false,
      marketCap: '$38B', pe: 71.2, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 1.76, PSI: false, XSD: 1.89, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 2, avgWeight: 1.67, proScore: 0.83, coverage: 0.5,
      price: 348.01, weeklyPrices: [369.18, 372.59, 380.37, 350.63, 348.01], weeklyChange: -5.73, dayChange: -0.75, sortRank: 0, periodReturns: { '1M': -9, 'YTD': 103.2, '6M': 98.9, '1Y': 148.9 },
      priceHistory: { '1D': [350.63, 348.54, 348.01], '1W': [369.18, 372.59, 380.37, 350.63, 348.01], '1M': [382.35, 390.34, 382.74, 345.4, 361.86, 358.72, 354.4, 374.76, 379.87, 384.77, 367.11, 391.41, 396.26, 372.15, 373.08, 390.19, 369.18, 372.59, 380.37, 350.63, 348.01], 'YTD': [171.28, 167.66, 218.93, 219.26, 219.06, 235.87, 244.16, 245.53, 258.54, 218.73, 224.92, 229.26, 209.49, 236.99, 263.92, 285.71, 265.61, 303.57, 362.76, 358.98, 400.66, 390.34, 354.4, 367.11, 390.19, 348.01], '6M': [174.96, 174.87, 220.68, 218.89, 228.56, 235.7, 245.59, 248.29, 241.01, 220.59, 221.29, 237.23, 222.07, 236.99, 263.92, 285.71, 265.61, 303.57, 362.76, 358.98, 400.66, 390.34, 354.4, 367.11, 390.19, 348.01], '1Y': [139.81, 137.19, 141.76, 137.29, 137.14, 127.75, 125.4, 121.15, 129.63, 131.89, 131.07, 129.73, 123.88, 128.09, 132.98, 137.94, 139.31, 150.61, 166.92, 162.24, 161.57, 168.06, 187.06, 189.86, 171.47, 175.01, 170.76, 197.55, 221.7, 219.2, 226.71, 230.54, 245.59, 248.29, 241.01, 220.59, 221.29, 237.23, 222.07, 247, 261.16, 277, 269.63, 309.81, 381.55, 358.98, 400.66, 390.34, 354.4, 367.11, 390.19, 348.01] },
      velocityScore: { '1D': -3.5, '1W': -6.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 148.1, revenueGrowth: 23, eps: 2.35, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: 1.16, PSI: false, XSD: 2.18, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RMBS', name: 'RAMBUS INC', easyScore: 2, avgWeight: 1.31, proScore: 0.65, coverage: 0.5,
      price: 124.52, weeklyPrices: [114.73, 123.90, 132.74, 123.83, 124.52], weeklyChange: 8.53, dayChange: 0.56, sortRank: 0, periodReturns: { '1M': -25.3, 'YTD': 35.5, '6M': 25.4, '1Y': 91.6 },
      priceHistory: { '1D': [123.83, 124, 124.52], '1W': [114.73, 123.9, 132.74, 123.83, 124.52], '1M': [166.78, 170.66, 169.35, 145.31, 152.03, 146.84, 138.12, 144.47, 146.56, 143.29, 130.1, 141.17, 140.35, 128.21, 124.52, 123.69, 114.73, 123.9, 132.74, 123.83, 124.52], 'YTD': [91.89, 91.34, 103.07, 115.31, 113.83, 107.1, 101.95, 95.27, 98.88, 88.52, 92.78, 93.35, 79.73, 91.87, 121.73, 130.45, 111.27, 118, 130.28, 122.03, 148.66, 170.66, 138.12, 130.1, 123.69, 124.52], '6M': [99.28, 93.38, 107.99, 114.19, 113.71, 110.92, 101.95, 98.57, 87.59, 89.61, 93.5, 92.69, 86.03, 91.87, 121.73, 130.45, 111.27, 118, 130.28, 122.03, 148.66, 170.66, 138.12, 130.1, 123.69, 124.52], '1Y': [65, 64.6, 68.17, 64.21, 73.93, 71.95, 76, 69.68, 75.05, 75.4, 88.58, 107.38, 100.76, 103.71, 98.72, 98.15, 101.61, 107.75, 106.49, 92.37, 90.22, 94.87, 98.81, 106.01, 91.49, 94.11, 97.5, 92.9, 110.1, 115.71, 98.45, 106.99, 101.95, 98.57, 87.59, 89.61, 93.5, 92.69, 86.03, 101.43, 120.02, 131.55, 112.16, 130.04, 134.85, 122.03, 148.66, 170.66, 138.12, 130.1, 123.69, 124.52] },
      velocityScore: { '1D': -1.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 59.3, revenueGrowth: 8, eps: 2.1, grossMargin: 80, dividendYield: null,
      etfPresence: { SOXX: 0.64, PSI: false, XSD: 1.97, DRAM: false },
      tonyNote: 'RAMBUS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 5.85, proScore: 3.1, coverage: 0.529,
      price: 1059.51, weeklyPrices: [1132.33, 1145.28, 1154.29, 1032.28, 1059.51], weeklyChange: -6.43, dayChange: 2.64, sortRank: 0, periodReturns: { '1M': -0.4, 'YTD': 271.2, '6M': 235.9, '1Y': 770.3 },
      priceHistory: { '1D': [1032.28, 1055.41, 1059.51], '1W': [1132.33, 1145.28, 1154.29, 1032.28, 1059.51], '1M': [1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 1059.51], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1213.56, 1059.51], '6M': [315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1213.56, 1059.51], '1Y': [121.74, 123.11, 113.26, 111.73, 109.14, 111.87, 125.29, 117.21, 117.75, 124.21, 150.57, 168.89, 156.83, 183.75, 192.33, 202.53, 206.71, 224.01, 238.33, 236.95, 225.92, 230.26, 226.65, 258.46, 248.55, 284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1213.56, 1059.51] },
      velocityScore: { '1D': -2.2, '1W': 4, '1M': -14.8, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 23.9, revenueGrowth: 346, eps: 44.28, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { PTF: 4.63, WCLD: false, IGV: false, FDTX: 9.33, GTEK: false, ARKK: false, MARS: false, FRWD: 5.22, BCTK: 5.01, FWD: 1.33, CBSE: false, FCUS: 4.93, WGMI: false, CNEQ: 1.72, SGRT: 8.45, SPMO: 12.01, XMMO: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 9, avgWeight: 5.53, proScore: 2.93, coverage: 0.529,
      price: 198.25, weeklyPrices: [192.53, 194.97, 200.09, 197.58, 198.25], weeklyChange: 2.97, dayChange: 0.34, sortRank: 0, periodReturns: { '1M': -11, 'YTD': 6.3, '6M': 5, '1Y': 26.1 },
      priceHistory: { '1D': [197.58, 198.38, 198.25], '1W': [192.53, 194.97, 200.09, 197.58, 198.25], '1M': [222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 198.25], 'YTD': [186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 212.6, 214.75, 200.42, 204.65, 195.74, 198.25], '6M': [188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 184.77, 181.93, 175.2, 174.4, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 212.6, 214.75, 200.42, 204.65, 195.74, 198.25], '1Y': [157.25, 164.1, 173, 173.74, 177.87, 180.77, 182.02, 175.4, 181.6, 171.66, 177.17, 176.24, 177.69, 188.89, 192.57, 181.81, 182.16, 202.89, 188.08, 186.86, 186.52, 180.26, 183.38, 180.93, 174.14, 190.53, 188.12, 184.94, 178.07, 188.52, 180.34, 188.54, 184.97, 192.85, 180.05, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 220.61, 212.6, 214.75, 200.42, 204.65, 195.74, 198.25] },
      velocityScore: { '1D': -5.2, '1W': -11.5, '1M': -33, '6M': null }, isNew: false,
      marketCap: '$4.8T', pe: 30.4, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.51,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.09, GTEK: false, ARKK: 1.53, MARS: false, FRWD: 8.06, BCTK: 5.79, FWD: 1.8, CBSE: false, FCUS: false, WGMI: 1.84, CNEQ: 13.13, SGRT: 6.16, SPMO: 7.41, XMMO: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 8, avgWeight: 3.74, proScore: 1.76, coverage: 0.471,
      price: 537, weeklyPrices: [521.58, 539.49, 580.91, 540.88, 537.00], weeklyChange: 2.96, dayChange: -0.72, sortRank: 0, periodReturns: { '1M': 3, 'YTD': 150.7, '6M': 140.3, '1Y': 287.7 },
      priceHistory: { '1D': [540.88, 534.8, 537], '1W': [521.58, 539.49, 580.91, 540.88, 537], '1M': [521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 537], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 542.52, 452.4, 512.48, 532.57, 537], '6M': [223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 542.52, 452.4, 512.48, 532.57, 537], '1Y': [138.52, 144.16, 160.41, 162.12, 176.31, 172.4, 180.95, 165.2, 167.13, 161.79, 155.67, 157.92, 161.27, 169.73, 232.89, 234.56, 234.99, 254.84, 237.7, 247.96, 223.55, 214.24, 215.98, 221.43, 201.06, 214.99, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 203.08, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 414.05, 495.54, 542.52, 452.4, 512.48, 532.57, 537] },
      velocityScore: { '1D': -0.6, '1W': 6, '1M': -35.1, '6M': null }, isNew: false,
      marketCap: '$876B', pe: 180.8, revenueGrowth: 38, eps: 2.97, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.58, MARS: false, FRWD: 7.41, BCTK: 3.35, FWD: 2.17, CBSE: false, FCUS: 3.47, WGMI: false, CNEQ: 1.11, SGRT: 3.7, SPMO: 4.11, XMMO: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 7, avgWeight: 4.84, proScore: 1.99, coverage: 0.412,
      price: 607.89, weeklyPrices: [586.45, 651.88, 638.72, 598.37, 607.89], weeklyChange: 3.66, dayChange: 1.59, sortRank: 0, periodReturns: { '1M': 8, 'YTD': 252.9, '6M': 223.9, '1Y': 824.1 },
      priceHistory: { '1D': [598.37, 605.99, 607.89], '1W': [586.45, 651.88, 638.72, 598.37, 607.89], '1M': [563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 607.89], 'YTD': [172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 530.6, 594.11, 490.09, 712.13, 675.39, 607.89], '6M': [187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 266.22, 313.81, 301.05, 270.49, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 530.6, 594.11, 490.09, 712.13, 675.39, 607.89], '1Y': [65.78, 65.06, 67.02, 69.02, 78.69, 74.44, 76.24, 75.64, 80.67, 90.49, 96.15, 105.15, 107.21, 131.26, 119.7, 125.92, 125.72, 138.13, 163.6, 157.16, 153.97, 157.74, 161, 187.2, 175.01, 181.54, 187.88, 212.14, 222.97, 252.66, 290.24, 262.56, 284.11, 270.57, 250.61, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 455.8, 530.6, 594.11, 490.09, 712.13, 675.39, 607.89] },
      velocityScore: { '1D': -3.4, '1W': -12.7, '1M': -22.9, '6M': null }, isNew: false,
      marketCap: '$210B', pe: 36.4, revenueGrowth: 46, eps: 16.69, grossMargin: 45, dividendYield: 0.1,
      etfPresence: { PTF: 4.11, WCLD: false, IGV: false, FDTX: 4.49, GTEK: false, ARKK: false, MARS: false, FRWD: 5.26, BCTK: false, FWD: false, CBSE: false, FCUS: 4.61, WGMI: false, CNEQ: 4.96, SGRT: 8.41, SPMO: 2.06, XMMO: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 7, avgWeight: 3.57, proScore: 1.47, coverage: 0.412,
      price: 370.62, weeklyPrices: [365.02, 372.45, 377.75, 369.34, 370.62], weeklyChange: 1.53, dayChange: 0.35, sortRank: 0, periodReturns: { '1M': -23, 'YTD': 7.1, '6M': 6.6, '1Y': 37.3 },
      priceHistory: { '1D': [369.34, 369.27, 370.62], '1W': [365.02, 372.45, 377.75, 369.34, 370.62], '1M': [481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 370.62], 'YTD': [346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 421.86, 479.23, 372.1, 392.9, 378.91, 370.62], '6M': [347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 342.58, 321.31, 318.29, 309.51, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 421.86, 479.23, 372.1, 392.9, 378.91, 370.62], '1Y': [269.9, 275.4, 286.45, 288.71, 293.7, 303.76, 311.23, 291.17, 300.25, 306.1, 359.63, 345.35, 336.1, 338.18, 345.02, 354.15, 344.29, 376.47, 355.59, 339.98, 354.42, 397.57, 381.03, 406.37, 329.88, 352.13, 343.42, 352.21, 332.6, 332.79, 320.33, 340.44, 332.54, 325.49, 313.84, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 411.07, 421.86, 479.23, 372.1, 392.9, 378.91, 370.62] },
      velocityScore: { '1D': -1.3, '1W': 1.4, '1M': -33.2, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 61.6, revenueGrowth: 48, eps: 6.02, grossMargin: 76, dividendYield: 0.7,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.62, GTEK: false, ARKK: 1.03, MARS: false, FRWD: 4.69, BCTK: 6.67, FWD: 1.81, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.15, SGRT: false, SPMO: 6, XMMO: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 6, avgWeight: 4.75, proScore: 1.68, coverage: 0.353,
      price: 452.44, weeklyPrices: [432.35, 455.10, 477.57, 444.23, 452.44], weeklyChange: 4.65, dayChange: 1.82, sortRank: 0, periodReturns: { '1M': 1.3, 'YTD': 48.9, '6M': 41.6, '1Y': 93.7 },
      priceHistory: { '1D': [444.36, 451.18, 452.44], '1W': [432.35, 455.1, 477.57, 444.23, 452.44], '1M': [446.69, 436.69, 444.92, 415.17, 426.8, 427.92, 408.75, 421.07, 423.93, 441.4, 432.15, 462.12, 467.67, 436.39, 440.83, 434.99, 432.35, 455.1, 477.57, 444.23, 452.44], 'YTD': [303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 370.04, 369.11, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 392.61, 422.73, 436.69, 408.75, 432.15, 434.99, 452.44], '6M': [319.61, 323.63, 342.4, 332.71, 341.36, 355.41, 364.2, 385.75, 353.13, 347.09, 345.98, 343.25, 337.95, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 392.61, 422.73, 436.69, 408.75, 432.15, 434.99, 452.44], '1Y': [233.6, 229.76, 245.6, 241.6, 241.62, 242.62, 241, 228.6, 239.29, 235.21, 258.91, 268.64, 276.66, 288.11, 299.88, 299.84, 290.73, 303.22, 289.24, 282.2, 282.37, 289.96, 292.93, 304.85, 284.68, 302.84, 322.25, 331.77, 327.16, 338.34, 335.75, 361.91, 364.2, 385.75, 353.13, 347.09, 345.98, 343.25, 337.95, 365.9, 375.1, 387.44, 393.83, 419.5, 399.8, 392.61, 422.73, 436.69, 408.75, 432.15, 434.99, 452.44] },
      velocityScore: { '1D': 0.6, '1W': -6.7, '1M': -42.3, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 39.3, revenueGrowth: 35, eps: 11.51, grossMargin: 62, dividendYield: 0.86,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6.39, GTEK: false, ARKK: 0.93, MARS: false, FRWD: 6.14, BCTK: 8.68, FWD: false, CBSE: false, FCUS: false, WGMI: 0.56, CNEQ: 5.79, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 6, avgWeight: 3.1, proScore: 1.09, coverage: 0.353,
      price: 241.32, weeklyPrices: [232.69, 240.14, 238.34, 241.70, 241.32], weeklyChange: 3.71, dayChange: -0.16, sortRank: 0, periodReturns: { '1M': -5.9, 'YTD': 4.5, '6M': 6.5, '1Y': 9.7 },
      priceHistory: { '1D': [241.7, 241.78, 241.32], '1W': [232.69, 240.14, 238.34, 241.7, 241.32], '1M': [256.52, 250.02, 253.79, 246.03, 245.22, 244.19, 238, 241.51, 238.55, 246.02, 237.5, 244.39, 232.79, 234.11, 234.27, 227.01, 232.69, 240.14, 238.34, 241.7, 241.32], 'YTD': [230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 198.79, 205.27, 208.39, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 259.34, 271.85, 250.02, 238, 237.5, 227.01, 241.32], '6M': [226.5, 247.38, 239.12, 238.42, 242.96, 208.72, 201.15, 208.56, 208.73, 214.33, 215.2, 207.24, 208.27, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 259.34, 271.85, 250.02, 238, 237.5, 227.01, 241.32], '1Y': [219.92, 222.26, 223.88, 232.23, 234.11, 223.13, 230.98, 223.81, 229.12, 235.68, 229.95, 231.23, 218.15, 222.41, 227.74, 214.47, 221.09, 222.86, 243.04, 237.58, 222.69, 229.16, 229.11, 230.28, 226.76, 232.52, 233.06, 246.47, 231, 244.68, 238.62, 206.96, 201.15, 208.56, 208.73, 214.33, 215.2, 207.24, 208.27, 221.25, 248.5, 255.36, 263.04, 274.99, 270.13, 259.34, 271.85, 250.02, 238, 237.5, 227.01, 241.32] },
      velocityScore: { '1D': -3.5, '1W': -10.7, '1M': -68.9, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 31.6, revenueGrowth: 17, eps: 7.64, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.29, GTEK: false, ARKK: 2.34, MARS: false, FRWD: 2.9, BCTK: 4.2, FWD: 1.46, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.39, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'SPCX', name: 'SPACE EXPLORATION TECHN-CL A', easyScore: 5, avgWeight: 7.83, proScore: 2.3, coverage: 0.294,
      price: 158.25, weeklyPrices: [153.23, 164.19, 170.86, 157.54, 158.25], weeklyChange: 3.28, dayChange: 0.45, sortRank: 0, periodReturns: { '1M': -1.7, 'YTD': -1.7, '6M': -1.7, '1Y': -1.7 },
      priceHistory: { '1D': [157.54, 158.44, 158.25], '1W': [153.23, 164.19, 170.86, 157.54, 158.25], '1M': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 158.25], 'YTD': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 158.25], '6M': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 158.25], '1Y': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 158.25] },
      velocityScore: { '1D': -9.4, '1W': -10.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.1T', pe: null, revenueGrowth: 15, eps: -0.68, grossMargin: 49, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.08, MARS: 21.63, FRWD: false, BCTK: 8.29, FWD: 1.78, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.35, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'SPACE EXPLORATION TECHN-CL A appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 7.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LRCX', name: 'Lam Research Corp', easyScore: 5, avgWeight: 4.86, proScore: 1.43, coverage: 0.294,
      price: 388.15, weeklyPrices: [379.09, 410.91, 433.33, 391.26, 388.15], weeklyChange: 2.39, dayChange: -0.79, sortRank: 0, periodReturns: { '1M': 16.1, 'YTD': 126.7, '6M': 109.7, '1Y': 292.7 },
      priceHistory: { '1D': [391.26, 386.5, 388.15], '1W': [379.09, 410.91, 433.33, 391.26, 388.15], '1M': [334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81, 388.92, 374.18, 389.04, 409.54, 371.33, 374.8, 401.82, 379.09, 410.91, 433.33, 391.26, 388.15], 'YTD': [171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 242.27, 231, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 273.38, 318.93, 343.71, 321.8, 374.18, 401.82, 388.15], '6M': [185.06, 218.36, 222.96, 222.87, 237.5, 229.28, 235.58, 244.25, 217.27, 215.23, 226.47, 238.84, 213.66, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 273.38, 318.93, 343.71, 321.8, 374.18, 401.82, 388.15], '1Y': [98.83, 101.06, 100.79, 97.78, 94.84, 99.15, 107.38, 99.15, 103.67, 100.42, 115.58, 126.32, 128.13, 146.99, 141, 142.37, 147.54, 161.01, 162.19, 153.32, 148.8, 155.14, 157.09, 168.71, 164.7, 178.07, 194.76, 220.4, 222.41, 238.46, 230.1, 226.61, 235.58, 244.25, 217.27, 215.23, 226.47, 238.84, 213.66, 246.49, 265.16, 265.55, 248.75, 297.17, 295.44, 273.38, 318.93, 343.71, 321.8, 374.18, 401.82, 388.15] },
      velocityScore: { '1D': 1.4, '1W': 5.9, '1M': -37, '6M': null }, isNew: false,
      marketCap: '$485B', pe: 73.5, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.27,
      etfPresence: { PTF: 3.11, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 6.44, BCTK: 8.28, FWD: 2.12, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 4.33, XMMO: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 5, avgWeight: 3.96, proScore: 1.17, coverage: 0.294,
      price: 355.54, weeklyPrices: [334.69, 351.28, 353.33, 357.89, 355.54], weeklyChange: 6.23, dayChange: -0.66, sortRank: 0, periodReturns: { '1M': -0.8, 'YTD': 13.3, '6M': 12.8, '1Y': 97.8 },
      priceHistory: { '1D': [357.89, 355.85, 355.54], '1W': [334.69, 351.28, 353.33, 357.89, 355.54], '1M': [358.39, 355.68, 369.27, 365.76, 361.17, 362.29, 353.32, 356.56, 358.16, 367.11, 362.1, 367.46, 348.78, 346.08, 345.04, 342.19, 334.69, 351.28, 353.33, 357.89, 355.54], 'YTD': [313.8, 326.01, 333.16, 328.43, 338.53, 323.1, 306.02, 311.69, 306.36, 306.01, 304.42, 299.02, 273.14, 303.93, 330.58, 330.47, 347.5, 384.27, 383.82, 384.9, 384.83, 355.68, 353.32, 362.1, 342.19, 355.54], '6M': [315.32, 329.14, 330.34, 333.59, 344.9, 324.4, 302.82, 310.92, 303.56, 306.93, 309.41, 289.2, 286.86, 303.93, 330.58, 330.47, 347.5, 384.27, 383.82, 384.9, 384.83, 355.68, 353.32, 362.1, 342.19, 355.54], '1Y': [179.76, 178.7, 184.7, 193.2, 192.86, 197.28, 203.82, 200.19, 208.21, 232.66, 240.78, 252.33, 246.57, 246.43, 242.21, 251.88, 253.73, 281.9, 285.34, 279.12, 292.99, 320.28, 318.39, 313.7, 303.75, 314.96, 317.32, 332.73, 322.16, 335, 340.7, 318.63, 302.82, 310.92, 303.56, 306.93, 309.41, 289.2, 286.86, 314.74, 334.47, 337.73, 347.31, 395.14, 399.04, 384.9, 384.83, 355.68, 353.32, 362.1, 342.19, 355.54] },
      velocityScore: { '1D': -0.8, '1W': -2.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.3T', pe: 27.1, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.21, GTEK: false, ARKK: 1.86, MARS: false, FRWD: false, BCTK: 5.54, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 5.83, SGRT: false, SPMO: 3.38, XMMO: false },
      tonyNote: 'Alphabet Inc Class C appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 4.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRWD', name: 'CrowdStrike', easyScore: 5, avgWeight: 2.65, proScore: 0.78, coverage: 0.294,
      price: 193.06, weeklyPrices: [175.27, 185.73, 190.79, 193.18, 193.06], weeklyChange: 10.15, dayChange: -0.06, sortRank: 0, periodReturns: { '1M': 0.4, 'YTD': 64.7, '6M': 70.3, '1Y': 55.7 },
      priceHistory: { '1D': [193.19, 192.67, 193.06], '1W': [175.27, 185.73, 190.79, 193.18, 193.06], '1M': [192.24, 186.9, 179.77, 167.76, 164.7, 161.23, 161.93, 172.88, 170.7, 173.23, 170.74, 171.21, 168.86, 170.23, 168.26, 169.66, 175.27, 185.73, 190.79, 193.18, 193.06], 'YTD': [117.19, 115.97, 113.75, 113.12, 110.35, 98.88, 107.41, 87.58, 96.21, 108.53, 105.96, 103.33, 95.01, 105.81, 99.62, 112.4, 113.75, 119.13, 136.54, 154.22, 161.34, 186.9, 161.93, 170.74, 169.66, 193.06], '6M': [113.39, 117.65, 113.47, 117.08, 109.71, 102.01, 103.57, 87.56, 97.86, 109.08, 108.3, 98.25, 97.6, 105.81, 99.62, 112.4, 113.75, 119.13, 136.54, 154.22, 161.34, 186.9, 161.93, 170.74, 169.66, 193.06], '1Y': [124.03, 121.78, 117.46, 115.51, 113.64, 106.25, 106.21, 104.79, 105.65, 103.11, 108.35, 125.66, 118.27, 124.2, 127.28, 120.56, 130.49, 134.67, 133.13, 132.45, 130.15, 125.39, 128.28, 129.41, 119.32, 120.3, 114.14, 116.75, 110.68, 119.17, 105.43, 103.35, 103.57, 87.56, 97.86, 109.08, 108.3, 98.25, 97.6, 106.63, 102.79, 116.67, 113.1, 117.02, 140.64, 154.22, 161.34, 186.9, 161.93, 170.74, 169.66, 193.06] },
      velocityScore: { '1D': 1.3, '1W': 13, '1M': null, '6M': null }, isNew: false,
      marketCap: '$197B', pe: null, revenueGrowth: 26, eps: -0.04, grossMargin: 75, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.58, IGV: 7.16, FDTX: 1.21, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 1.2, FWD: 1.12, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'CrowdStrike appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 2.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, avgWeight: 4.98, proScore: 1.17, coverage: 0.235,
      price: 384.72, weeklyPrices: [372.97, 368.57, 373.02, 384.28, 384.72], weeklyChange: 3.15, dayChange: 0.11, sortRank: 0, periodReturns: { '1M': -12.8, 'YTD': -20.4, '6M': -18.7, '1Y': -21.7 },
      priceHistory: { '1D': [384.28, 385.14, 384.72], '1W': [372.97, 368.57, 373.02, 384.28, 384.72], '1M': [441.31, 427.34, 428.05, 416.67, 411.74, 403.41, 397.36, 390.34, 390.74, 399.76, 378.91, 379.4, 367.34, 373.94, 365.46, 352.83, 372.97, 368.57, 373.02, 384.28, 384.72], 'YTD': [483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 384.47, 398.55, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 417.42, 412.67, 427.34, 397.36, 378.91, 352.83, 384.72], '6M': [472.94, 479.28, 459.86, 470.28, 423.37, 413.6, 396.86, 389, 403.93, 405.76, 399.41, 372.74, 370.17, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 417.42, 412.67, 427.34, 397.36, 378.91, 352.83, 384.72], '1Y': [491.09, 501.48, 511.7, 510.88, 533.5, 520.84, 522.48, 505.72, 506.74, 507.97, 501.01, 508.45, 507.03, 515.74, 522.4, 511.61, 520.56, 525.76, 497.1, 503.29, 487.12, 485.5, 480.84, 483.47, 483.98, 487.71, 472.85, 477.18, 454.52, 480.58, 411.21, 413.27, 396.86, 389, 403.93, 405.76, 399.41, 372.74, 370.17, 374.33, 411.22, 432.92, 424.46, 413.96, 405.21, 417.42, 412.67, 427.34, 397.36, 378.91, 352.83, 384.72] },
      velocityScore: { '1D': -3.3, '1W': -5.6, '1M': -71.9, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 22.9, revenueGrowth: 18, eps: 16.79, grossMargin: 68, dividendYield: 0.95,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.07, FDTX: 2.93, GTEK: false, ARKK: false, MARS: false, FRWD: 2.84, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 6.09, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks', easyScore: 4, avgWeight: 4.69, proScore: 1.1, coverage: 0.235,
      price: 350.23, weeklyPrices: [304.20, 332.00, 341.02, 352.04, 350.23], weeklyChange: 15.13, dayChange: -0.51, sortRank: 0, periodReturns: { '1M': 17.9, 'YTD': 90.1, '6M': 95.3, '1Y': 77.8 },
      priceHistory: { '1D': [352.04, 349.07, 350.23], '1W': [304.2, 332, 341.02, 352.04, 350.23], '1M': [297.18, 280.43, 279.25, 272.05, 266.33, 260.52, 263.22, 279.53, 279.62, 284.54, 282.13, 287.78, 286.4, 290.92, 285.26, 293.09, 304.2, 332, 341.02, 352.04, 350.23], 'YTD': [184.2, 190.8, 187.73, 180.18, 176.97, 159.32, 166.95, 144.14, 150.15, 165.1, 167.45, 164.05, 154.35, 169.87, 161.59, 174.96, 180.99, 183.98, 215.6, 240.13, 248.47, 280.43, 263.22, 282.13, 293.09, 350.23], '6M': [179.37, 189.02, 187.66, 184.22, 175.42, 166, 163.5, 141.67, 156.09, 165.58, 169.19, 157.21, 160.32, 169.87, 161.59, 174.96, 180.99, 183.98, 215.6, 240.13, 248.47, 280.43, 263.22, 282.13, 293.09, 350.23], '1Y': [196.97, 192.07, 196.28, 201.16, 173.6, 168.1, 173.55, 184.43, 187.61, 192.35, 198.33, 205.68, 202.21, 209.3, 215.17, 205.51, 215.02, 218.27, 211.37, 204.77, 199.9, 185.35, 195.68, 190.36, 185.88, 188.45, 182.12, 188.88, 184.06, 183.5, 166.24, 165.51, 163.5, 141.67, 156.09, 165.58, 169.19, 157.21, 160.32, 173.78, 164.11, 181.2, 181.54, 183.68, 227.79, 240.13, 248.47, 280.43, 263.22, 282.13, 293.09, 350.23] },
      velocityScore: { '1D': 4.8, '1W': 12.2, '1M': -50, '6M': null }, isNew: false,
      marketCap: '$285B', pe: 301.9, revenueGrowth: 31, eps: 1.16, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 3, IGV: 10.39, FDTX: 4.15, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.21, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 4, avgWeight: 4.4, proScore: 1.04, coverage: 0.235,
      price: 915.12, weeklyPrices: [899.90, 968.53, 965.00, 915.19, 915.12], weeklyChange: 1.69, dayChange: -0.01, sortRank: 0, periodReturns: { '1M': -1.2, 'YTD': 232.3, '6M': 218.3, '1Y': 502.3 },
      priceHistory: { '1D': [915.19, 909.03, 915.12], '1W': [899.9, 968.53, 965, 915.19, 915.12], '1M': [926.61, 940.69, 925.99, 847.47, 876.77, 846.01, 815.99, 868.09, 931.04, 1018.8, 1066.07, 1070.23, 1094.04, 1038.59, 993.25, 1025.36, 899.9, 968.53, 965, 915.19, 915.12], 'YTD': [275.39, 284.47, 320.32, 346.1, 407.69, 429.32, 425.99, 407.4, 379.52, 374.33, 398.78, 404.02, 362.43, 468.72, 533.44, 559.9, 579.03, 771.01, 808.8, 733.35, 870.66, 940.69, 815.99, 1066.07, 1025.36, 915.12], '6M': [287.54, 304.01, 326.23, 358.29, 432.95, 425, 415.94, 396.02, 357.62, 384.29, 421.09, 424.96, 391.76, 468.72, 533.44, 559.9, 579.03, 771.01, 808.8, 733.35, 870.66, 940.69, 815.99, 1066.07, 1025.36, 915.12], '1Y': [151.94, 144.5, 146.72, 152.73, 157.01, 148.1, 155.73, 158.4, 167.24, 183.98, 196.81, 216.64, 219.85, 254.74, 221.7, 226.03, 226.41, 268.34, 278.47, 262.56, 259.14, 272.28, 265.63, 307.85, 292, 286.22, 289.83, 321.48, 325.99, 371.76, 444.45, 396.23, 415.94, 396.02, 357.62, 384.29, 421.09, 424.96, 391.76, 496.3, 519.6, 579.88, 643.3, 786.42, 817.35, 733.35, 870.66, 940.69, 815.99, 1066.07, 1025.36, 915.12] },
      velocityScore: { '1D': -3.7, '1W': -29.3, '1M': -64.5, '6M': null }, isNew: false,
      marketCap: '$207B', pe: 87, revenueGrowth: 44, eps: 10.52, grossMargin: 42, dividendYield: 0.32,
      etfPresence: { PTF: 3.55, WCLD: false, IGV: false, FDTX: 4.14, GTEK: false, ARKK: false, MARS: false, FRWD: 7.94, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.97, XMMO: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 4, avgWeight: 3.77, proScore: 0.89, coverage: 0.235,
      price: 2051.12, weeklyPrices: [2090.71, 2050.39, 2273.73, 2032.22, 2051.12], weeklyChange: -1.89, dayChange: 0.93, sortRank: 0, periodReturns: { '1M': 19.5, 'YTD': 764.1, '6M': 645.2, '1Y': 4338.7 },
      priceHistory: { '1D': [2032.22, 2046.13, 2051.12], '1W': [2090.71, 2050.39, 2273.73, 2032.22, 2051.12], '1M': [1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 2051.12], 'YTD': [237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.94, 1831.5, 1643.23, 1958.8, 2335, 2051.12], '6M': [275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 565.41, 618.89, 720.17, 702.48, 635.34, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.94, 1831.5, 1643.23, 1958.8, 2335, 2051.12], '1Y': [46.21, 46.95, 41.52, 42.06, 42.92, 40.69, 46.68, 44.4, 48.44, 62.5, 84.3, 98.87, 94.29, 124.14, 129.68, 144.27, 167.05, 195.82, 207.69, 243.57, 245.96, 215.04, 213.31, 241.61, 219.46, 250.05, 274.08, 389.27, 453.12, 481.43, 695.51, 541.64, 590.59, 638.52, 565.41, 618.89, 720.17, 702.48, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1447.23, 1383.29, 1589.94, 1831.5, 1643.23, 1958.8, 2335, 2051.12] },
      velocityScore: { '1D': -22.6, '1W': -16.8, '1M': -65.4, '6M': null }, isNew: false,
      marketCap: '$304B', pe: 70.1, revenueGrowth: 251, eps: 29.26, grossMargin: 56, dividendYield: null,
      etfPresence: { PTF: 5.38, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.51, CBSE: false, FCUS: 5.39, WGMI: false, CNEQ: false, SGRT: false, SPMO: 2.82, XMMO: false },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'KLAC', name: 'KLA Corp', easyScore: 4, avgWeight: 2.43, proScore: 0.57, coverage: 0.235,
      price: 259.8, weeklyPrices: [248.64, 278.39, 301.71, 266.19, 259.80], weeklyChange: 4.49, dayChange: -2.4, sortRank: 0, periodReturns: { '1M': 27, 'YTD': 113.8, '6M': 103.8, '1Y': 182 },
      priceHistory: { '1D': [266.19, 258.6, 259.8], '1W': [248.64, 278.39, 301.71, 266.19, 259.8], '1M': [204.52, 212.51, 213.11, 192.92, 210.81, 213.94, 213.56, 241.16, 254.54, 256.42, 238.73, 259.56, 269.16, 244.49, 240.48, 258.8, 248.64, 278.39, 301.71, 266.19, 259.8], 'YTD': [121.51, 132.46, 154.5, 151.28, 142.79, 144.29, 146.41, 148.77, 153.49, 142.91, 143.82, 151.14, 138.26, 154.88, 179.59, 178.54, 180.9, 173.29, 181.13, 174.06, 195.72, 212.51, 213.56, 238.73, 258.8, 259.8], '6M': [127.45, 140, 156.78, 154.3, 141.04, 144.02, 147.02, 150.66, 144.13, 145.29, 148.13, 156.62, 147.24, 154.88, 179.59, 178.54, 180.9, 173.29, 181.13, 174.06, 195.72, 212.51, 213.56, 238.73, 258.8, 259.8], '1Y': [92.11, 92.86, 93.71, 90.42, 87.9, 91.21, 95.54, 87.84, 88.89, 87.33, 95.93, 104.67, 105.91, 113.93, 105.35, 109.88, 115.9, 121.44, 120.64, 116.17, 116.75, 115.91, 120.81, 124.62, 122.24, 127.96, 135.24, 142.82, 148.62, 161.63, 135.55, 143.08, 147.02, 150.66, 144.13, 145.29, 148.13, 156.62, 147.24, 167.23, 174.81, 181.21, 181.62, 181.63, 184.97, 174.06, 195.72, 212.51, 213.56, 238.73, 258.8, 259.8] },
      velocityScore: { '1D': null, '1W': 21.3, '1M': null, '6M': null }, isNew: true,
      marketCap: '$339B', pe: 73.4, revenueGrowth: 12, eps: 3.54, grossMargin: 61, dividendYield: 0.35,
      etfPresence: { PTF: 4.28, WCLD: false, IGV: false, FDTX: false, GTEK: 1.91, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.63, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.91, XMMO: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC-CL A', easyScore: 4, avgWeight: 2.38, proScore: 0.56, coverage: 0.235,
      price: 358.61, weeklyPrices: [337.39, 353.65, 357.37, 361.21, 358.61], weeklyChange: 6.29, dayChange: -0.72, sortRank: 0, periodReturns: { '1M': -0.9, 'YTD': 14.6, '6M': 13.8, '1Y': 100.7 },
      priceHistory: { '1D': [361.21, 359.16, 358.61], '1W': [337.39, 353.65, 357.37, 361.21, 358.61], '1M': [361.85, 358.99, 372.19, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68, 369.35, 363.79, 368.03, 349.68, 346.13, 345.29, 343.71, 337.39, 353.65, 357.37, 361.21, 358.61], 'YTD': [313, 325.44, 332.78, 327.93, 338, 322.86, 305.72, 311.49, 306.52, 306.36, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 388.43, 387.35, 387.66, 388.83, 358.99, 356.38, 363.79, 343.71, 358.61], '6M': [315.15, 328.57, 330, 333.26, 343.69, 324.32, 302.02, 310.9, 303.58, 307.04, 310.92, 290.44, 287.56, 305.46, 332.91, 332.29, 349.78, 388.43, 387.35, 387.66, 388.83, 358.99, 356.38, 363.79, 343.71, 358.61], '1Y': [178.64, 177.62, 183.58, 192.17, 191.9, 196.52, 202.94, 199.32, 207.48, 232.3, 240.37, 252.03, 245.79, 245.69, 241.53, 251.46, 253.08, 281.48, 284.75, 278.57, 292.81, 319.95, 317.62, 312.43, 302.46, 313.51, 316.54, 331.86, 322, 334.55, 339.71, 318.58, 302.02, 310.9, 303.58, 307.04, 310.92, 290.44, 287.56, 317.32, 337.12, 339.32, 349.94, 398.04, 402.62, 387.66, 388.83, 358.99, 356.38, 363.79, 343.71, 358.61] },
      velocityScore: { '1D': 1.8, '1W': -3.4, '1M': -81.3, '6M': null }, isNew: false,
      marketCap: '$4.4T', pe: 27.4, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 0.49, MARS: false, FRWD: 3.24, BCTK: false, FWD: 1.55, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 4.24, XMMO: false },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 3, avgWeight: 5.53, proScore: 0.98, coverage: 0.176,
      price: 423.25, weeklyPrices: [379.71, 411.84, 420.60, 425.30, 423.25], weeklyChange: 11.47, dayChange: -0.48, sortRank: 0, periodReturns: { '1M': -0.1, 'YTD': -5.9, '6M': -3.4, '1Y': 34.1 },
      priceHistory: { '1D': [425.3, 425.32, 423.25], '1W': [379.71, 411.84, 420.6, 425.3, 423.25], '1M': [423.74, 423.7, 418.45, 391, 408.95, 396.68, 381.59, 399.15, 406.43, 411.15, 396.38, 400.49, 405.05, 381.61, 375.53, 375.12, 379.71, 411.84, 420.6, 425.3, 423.25], 'YTD': [449.72, 435.8, 438.57, 449.06, 430.41, 411.11, 417.44, 399.83, 403.32, 398.68, 395.56, 380.85, 355.28, 346.65, 364.2, 386.42, 376.02, 389.37, 433.45, 404.11, 440.36, 423.7, 381.59, 396.38, 375.12, 423.25], '6M': [438.07, 445.01, 437.5, 435.2, 421.81, 417.32, 410.63, 409.38, 392.43, 399.24, 399.27, 383.03, 371.75, 346.65, 364.2, 386.42, 376.02, 389.37, 433.45, 404.11, 440.36, 423.7, 381.59, 396.38, 375.12, 423.25], '1Y': [315.65, 309.87, 319.41, 305.3, 308.27, 322.27, 335.58, 323.9, 349.6, 338.53, 368.81, 416.85, 423.39, 436, 435.54, 428.75, 448.98, 440.1, 445.91, 401.99, 403.99, 426.58, 454.53, 446.89, 483.37, 475.19, 451.67, 448.96, 419.25, 430.9, 421.96, 425.21, 410.63, 409.38, 392.43, 399.24, 399.27, 383.03, 371.75, 343.25, 391.95, 387.51, 372.8, 398.73, 445.27, 404.11, 440.36, 423.7, 381.59, 396.38, 375.12, 423.25] },
      velocityScore: { '1D': 1, '1W': 6.5, '1M': -77.9, '6M': null }, isNew: false,
      marketCap: '$1.6T', pe: 381.3, revenueGrowth: 16, eps: 1.11, grossMargin: 19, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 10.18, MARS: false, FRWD: false, BCTK: 3.14, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.26, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
    {
      ticker: 'DELL', name: 'DELL', easyScore: 3, avgWeight: 4.39, proScore: 0.77, coverage: 0.176,
      price: 409.85, weeklyPrices: [399.49, 414.61, 431.46, 425.25, 409.85], weeklyChange: 2.59, dayChange: -3.72, sortRank: 0, periodReturns: { '1M': -5.8, 'YTD': 225.6, '6M': 220.7, '1Y': 231.9 },
      priceHistory: { '1D': [425.7, 407.73, 409.85], '1W': [399.49, 414.61, 431.46, 425.25, 409.85], '1M': [435.31, 421.08, 422.05, 394.39, 400.77, 381.78, 369.83, 391.45, 395.57, 409.07, 419.32, 409.5, 418.71, 427.78, 434.06, 409.45, 399.49, 414.61, 431.46, 425.25, 409.85], 'YTD': [125.88, 118.5, 119.66, 115.43, 114.44, 121.05, 117.49, 119.14, 153.55, 146.51, 156.54, 164.59, 164.66, 177.69, 184.51, 212.36, 205.93, 216.32, 238.94, 235.26, 305.32, 421.08, 369.83, 419.32, 409.45, 409.85], '6M': [127.8, 120.62, 120.53, 115.93, 119.16, 120.91, 116.09, 119.78, 145.18, 143.8, 153.01, 176.91, 164.13, 177.69, 184.51, 212.36, 205.93, 216.32, 238.94, 235.26, 305.32, 421.08, 369.83, 419.32, 409.45, 409.85], '1Y': [123.48, 127.91, 123.88, 128.35, 132.69, 133.93, 138.86, 128.48, 132.5, 126.67, 125.37, 132.11, 130.96, 147.37, 155.95, 151.31, 154.23, 161.01, 149.18, 133.94, 119.38, 133.26, 138.99, 138.6, 122.94, 129.24, 124.01, 120.47, 111.07, 114.66, 117.15, 126.01, 116.09, 119.78, 145.18, 143.8, 153.01, 176.91, 164.13, 185.47, 177.28, 214.65, 205.66, 238.8, 243.87, 235.26, 305.32, 421.08, 369.83, 419.32, 409.45, 409.85] },
      velocityScore: { '1D': -4.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$265B', pe: 32.7, revenueGrowth: 88, eps: 12.54, grossMargin: 19, dividendYield: 0.59,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: 2.1, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: 4.48, WGMI: false, CNEQ: false, SGRT: 6.58, SPMO: false, XMMO: false },
      tonyNote: 'DELL appears in 3 of 17 Broad Tech ETFs (18% coverage) with average weight 4.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 3, avgWeight: 4.27, proScore: 0.75, coverage: 0.176,
      price: 131.08, weeklyPrices: [112.93, 115.70, 116.67, 125.73, 131.08], weeklyChange: 16.07, dayChange: 4.26, sortRank: 0, periodReturns: { '1M': -13.9, 'YTD': -26.3, '6M': -21.9, '1Y': -0.8 },
      priceHistory: { '1D': [125.73, 131.35, 131.08], '1W': [112.93, 115.7, 116.67, 125.73, 131.08], '1M': [152.17, 142.2, 141.7, 135.53, 136.47, 132.07, 130.21, 131.08, 127.99, 134.71, 130.63, 128.47, 119.5, 116.7, 113.5, 107.27, 112.93, 115.7, 116.67, 125.73, 131.08], 'YTD': [177.75, 176.86, 177.07, 169.6, 146.59, 135.9, 131.41, 130.6, 145.17, 156.43, 152.72, 160.84, 137.55, 150.07, 135.7, 145.97, 141.18, 135.91, 136, 135.26, 132.51, 142.2, 130.21, 130.63, 107.27, 131.08], '6M': [167.86, 177.49, 170.96, 167.47, 147.76, 142.91, 133.02, 128.84, 147.22, 151.14, 155.08, 154.78, 146.28, 150.07, 135.7, 145.97, 141.18, 135.91, 136, 135.26, 132.51, 142.2, 130.21, 130.63, 107.27, 131.08], '1Y': [132.12, 142.5, 153.99, 154.86, 158.35, 182.2, 181.02, 156.01, 156.72, 156.14, 164.36, 176.97, 179.12, 187.05, 185.47, 178.12, 180.48, 194.55, 175.05, 172.14, 165.42, 165.77, 177.92, 187.54, 185.69, 188.71, 174.04, 179.41, 168.53, 165.7, 157.88, 139.51, 133.02, 128.84, 147.22, 151.14, 155.08, 154.78, 146.28, 140.76, 142.15, 152.62, 137.97, 133.79, 130.05, 135.26, 132.51, 142.2, 130.21, 130.63, 107.27, 131.08] },
      velocityScore: { '1D': -2.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$314B', pe: 147.3, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.05, FDTX: 2, GTEK: false, ARKK: 2.77, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 3, avgWeight: 4.82, proScore: 2.89, coverage: 0.6,
      price: 691.76, weeklyPrices: [687.87, 714.45, 720.04, 691.40, 691.76], weeklyChange: 0.57, dayChange: 0.01, sortRank: 0, periodReturns: { '1M': -2, 'YTD': 63.9, '6M': 57.3, '1Y': 85.3 },
      priceHistory: { '1D': [691.66, 688.41, 691.76], '1W': [687.87, 714.45, 720.04, 691.4, 691.76], '1M': [706.06, 715.67, 719.17, 695.11, 693.81, 691.95, 650.92, 683.29, 707.74, 724.35, 714.85, 702.25, 740.14, 702.29, 701.88, 718.59, 687.87, 714.45, 720.04, 691.4, 691.76], 'YTD': [422.06, 413.17, 447.64, 468.76, 474.63, 508.11, 524.08, 549.11, 572.66, 568.04, 574.02, 567.45, 533.78, 555.57, 594.4, 605.89, 630.94, 771.61, 765.81, 714.13, 733.62, 715.67, 650.92, 714.85, 718.59, 691.76], '6M': [439.68, 422.57, 466.75, 470.77, 477.77, 514.56, 525.13, 568.21, 566, 564.05, 571.64, 578.44, 549.02, 555.57, 594.4, 605.89, 630.94, 771.61, 765.81, 714.13, 733.62, 715.67, 650.92, 714.85, 718.59, 691.76], '1Y': [373.41, 380.09, 397.9, 407.22, 406.13, 387.35, 377.51, 375.87, 381.56, 376.09, 389.64, 390.65, 400.41, 420.86, 429.92, 437.52, 427.36, 453.83, 442.9, 426.93, 445.47, 460.43, 464.84, 466.91, 421.31, 432.67, 435.82, 432.66, 463.49, 479.27, 488.6, 510.64, 525.13, 568.21, 566, 564.05, 571.64, 578.44, 549.02, 576.24, 591.82, 613.78, 628.6, 785.24, 773.72, 714.13, 733.62, 715.67, 650.92, 714.85, 718.59, 691.76] },
      velocityScore: { '1D': -1, '1W': 1, '1M': -18.4, '6M': null }, isNew: false,
      marketCap: '$104B', pe: 95.3, revenueGrowth: 26, eps: 7.26, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.88, VOLT: 5.23, PBD: false, PBW: false, IVEP: 4.34 },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 3, avgWeight: 4.58, proScore: 2.75, coverage: 0.6,
      price: 314.39, weeklyPrices: [310.64, 315.65, 333.04, 318.06, 314.39], weeklyChange: 1.21, dayChange: -1.16, sortRank: 0, periodReturns: { '1M': 16.8, 'YTD': 85.3, '6M': 82, '1Y': 218.1 },
      priceHistory: { '1D': [318.06, 313.81, 314.39], '1W': [310.64, 315.65, 333.04, 318.06, 314.39], '1M': [269.22, 280.09, 276.54, 262.56, 279.13, 276.04, 276.95, 296.55, 293.87, 302.15, 299.84, 296.39, 304.33, 288.64, 294.15, 310.32, 310.64, 315.65, 333.04, 318.06, 314.39], 'YTD': [169.63, 180.24, 196.61, 196.5, 201.19, 220.78, 232.84, 231.83, 222.45, 191.81, 205.11, 214.98, 197.83, 210.32, 237.34, 257.41, 249.82, 297.17, 298.22, 249.71, 280.13, 280.09, 276.95, 299.84, 310.32, 314.39], '6M': [172.78, 187.43, 200.11, 205.17, 215.59, 229.32, 235.3, 234.4, 213.65, 198.5, 209.52, 222.04, 197.98, 210.32, 237.34, 257.41, 249.82, 297.17, 298.22, 249.71, 280.13, 280.09, 276.95, 299.84, 310.32, 314.39], '1Y': [98.83, 102.3, 101.32, 102.98, 130.04, 132.61, 132.13, 128.41, 140.42, 143.06, 148.32, 150.97, 142.72, 142.44, 142.94, 148.88, 154.9, 150.62, 160.16, 146.49, 144.89, 152.69, 163.19, 175.36, 166.55, 176.45, 175.77, 188, 201.17, 210.66, 217.25, 237.19, 235.3, 234.4, 213.65, 198.5, 209.52, 222.04, 197.98, 228.29, 236.04, 262.68, 258.26, 286.89, 266.92, 249.71, 280.13, 280.09, 276.95, 299.84, 310.32, 314.39] },
      velocityScore: { '1D': -1.4, '1W': 24.4, '1M': -25.7, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 76.1, revenueGrowth: 17, eps: 4.13, grossMargin: 39, dividendYield: 0.09,
      etfPresence: { POW: 3.87, VOLT: 8.28, PBD: false, PBW: 1.6, IVEP: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 3, avgWeight: 4.5, proScore: 2.7, coverage: 0.6,
      price: 410.13, weeklyPrices: [402.68, 408.26, 426.12, 412.31, 410.13], weeklyChange: 1.85, dayChange: -0.55, sortRank: 0, periodReturns: { '1M': -1.8, 'YTD': 28.8, '6M': 25.3, '1Y': 14.5 },
      priceHistory: { '1D': [412.39, 409.36, 410.13], '1W': [402.68, 408.26, 426.12, 412.31, 410.13], '1M': [417.62, 421.21, 418.61, 395.94, 403.14, 401.72, 375.46, 393.64, 391.39, 407.06, 409.64, 421.77, 435.78, 405.28, 404.59, 419.87, 402.68, 408.26, 426.12, 412.31, 410.13], 'YTD': [318.51, 320.58, 333.46, 331.22, 351.42, 373.82, 389.25, 362.05, 377.4, 353.87, 361.04, 359.74, 343.53, 368.85, 401.9, 409.7, 413.07, 410.86, 401.53, 371.88, 406.37, 421.21, 375.46, 409.64, 419.87, 410.13], '6M': [327.31, 324.51, 343.75, 332.28, 359.44, 377.06, 391.49, 374.56, 355.56, 361.06, 363.95, 374.1, 357.67, 368.85, 401.9, 409.7, 413.07, 410.86, 401.53, 371.88, 406.37, 421.21, 375.46, 409.64, 419.87, 410.13], '1Y': [358.19, 357.64, 380.72, 384.9, 384.72, 360.16, 355.1, 346.22, 351.4, 348.22, 360.08, 371.27, 364.74, 376.76, 377.19, 375.59, 372.4, 383.09, 377.4, 354.07, 345.65, 341.69, 338.93, 350.36, 315.95, 322.17, 322.26, 329.1, 337.59, 341.19, 362.53, 377.47, 391.49, 374.56, 355.56, 361.06, 363.95, 374.1, 357.67, 385.58, 395.06, 413.87, 410.77, 421.39, 406.94, 371.88, 406.37, 421.21, 375.46, 409.64, 419.87, 410.13] },
      velocityScore: { '1D': 0, '1W': 4.2, '1M': -18.4, '6M': null }, isNew: false,
      marketCap: '$159B', pe: 40.1, revenueGrowth: 17, eps: 10.23, grossMargin: 37, dividendYield: 1.07,
      etfPresence: { POW: 4.04, VOLT: 5.35, PBD: false, PBW: false, IVEP: 4.11 },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 3, avgWeight: 4.22, proScore: 2.53, coverage: 0.6,
      price: 1111.5, weeklyPrices: [1045.17, 1102.51, 1174.86, 1134.35, 1111.50], weeklyChange: 6.35, dayChange: -2.05, sortRank: 0, periodReturns: { '1M': 14.6, 'YTD': 70.1, '6M': 63.6, '1Y': 120.1 },
      priceHistory: { '1D': [1134.73, 1106.69, 1111.5], '1W': [1045.17, 1102.51, 1174.86, 1134.35, 1111.5], '1M': [969.67, 959.36, 963.33, 933.61, 933.85, 920.15, 867.09, 906.79, 940.66, 979.07, 1048.86, 1109.73, 1127.59, 1034.98, 1057.65, 1085.47, 1045.17, 1102.51, 1174.86, 1134.35, 1111.5], 'YTD': [653.57, 628.4, 642.23, 657.78, 726.37, 779.35, 802.13, 831.7, 881.18, 830.1, 827.37, 882.64, 817.35, 910.75, 987.5, 991.3, 1088.93, 1095.21, 1071.98, 1011.8, 1031.89, 959.36, 867.09, 1048.86, 1085.47, 1111.5], '6M': [679.55, 622.5, 681.55, 665.99, 754.97, 801.54, 819.15, 879.73, 842, 839.2, 844.05, 909.41, 872.9, 910.75, 987.5, 991.3, 1088.93, 1095.21, 1071.98, 1011.8, 1031.89, 959.36, 867.09, 1048.86, 1085.47, 1111.5], '1Y': [505.07, 539.36, 570.17, 623.97, 660.29, 645.86, 625.27, 604.59, 622.39, 598.81, 634.15, 611, 607.52, 606.23, 634.27, 602, 595.15, 574.07, 550.17, 558.17, 595.37, 589.72, 629.11, 704.2, 639.43, 663.46, 680.86, 639.77, 684.86, 692.7, 780.25, 790.79, 819.15, 879.73, 842, 839.2, 844.05, 909.41, 872.9, 936.07, 985.92, 1127.56, 1063.11, 1118.96, 1062.57, 1011.8, 1031.89, 959.36, 867.09, 1048.86, 1085.47, 1111.5] },
      velocityScore: { '1D': -0.4, '1W': 9.5, '1M': -0.8, '6M': null }, isNew: false,
      marketCap: '$299B', pe: 32.4, revenueGrowth: 16, eps: 34.26, grossMargin: 20, dividendYield: 0.18,
      etfPresence: { POW: 3.48, VOLT: 4.57, PBD: false, PBW: false, IVEP: 4.61 },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy Corp', easyScore: 3, avgWeight: 3.71, proScore: 2.23, coverage: 0.6,
      price: 292.74, weeklyPrices: [252.02, 275.01, 302.70, 289.50, 292.74], weeklyChange: 16.16, dayChange: 1.11, sortRank: 0, periodReturns: { '1M': -3.3, 'YTD': 236.9, '6M': 196.6, '1Y': 1197.6 },
      priceHistory: { '1D': [289.52, 287.28, 292.74], '1W': [252.02, 275.01, 302.7, 289.5, 292.74], '1M': [302.85, 287.32, 291.37, 263.61, 253.57, 259.61, 234.23, 248.88, 260.22, 274.5, 284.99, 328.91, 345.85, 321.98, 326.19, 309.18, 252.02, 275.01, 302.7, 289.5, 292.74], 'YTD': [86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 160.28, 166, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 261.34, 293.8, 287.32, 234.23, 284.99, 309.18, 292.74], '6M': [98.69, 134.07, 149.5, 139.62, 156.13, 155.17, 145.32, 166.2, 153.02, 154, 160.05, 145.88, 135.49, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 261.34, 293.8, 287.32, 234.23, 284.99, 309.18, 292.74], '1Y': [22.56, 25.85, 24.31, 33.06, 37.39, 36.8, 45.11, 44.51, 50.85, 54.91, 67.29, 80.97, 68.69, 88, 86.65, 115.09, 101.42, 127.85, 136.86, 103.55, 108.93, 101.14, 118.09, 108.99, 80.21, 90.18, 103.87, 136.87, 151.75, 152.31, 168.89, 148.7, 145.32, 166.2, 153.02, 154, 160.05, 145.88, 135.49, 146.78, 213.84, 229.75, 287.97, 285.47, 289.76, 261.34, 293.8, 287.32, 234.23, 284.99, 309.18, 292.74] },
      velocityScore: { '1D': -0.9, '1W': -25.4, '1M': -0.9, '6M': null }, isNew: false,
      marketCap: '$83B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: 1.66, VOLT: 4.07, PBD: false, PBW: false, IVEP: 5.4 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 3, avgWeight: 3.54, proScore: 2.12, coverage: 0.6,
      price: 86.69, weeklyPrices: [88.56, 88.66, 87.77, 86.37, 86.69], weeklyChange: -2.11, dayChange: 0.35, sortRank: 0, periodReturns: { '1M': 1.2, 'YTD': 8, '6M': 7.1, '1Y': 18.7 },
      priceHistory: { '1D': [86.39, 86.56, 86.69], '1W': [88.56, 88.66, 87.77, 86.37, 86.69], '1M': [85.68, 84.58, 85.68, 85.84, 84.01, 84.83, 85.12, 84.84, 85.99, 86.12, 85.73, 86.75, 86.08, 86.43, 87.62, 87.7, 88.56, 88.66, 87.77, 86.37, 86.69], 'YTD': [80.28, 79.49, 82.19, 84.81, 87.9, 89.47, 93.8, 94.06, 92.71, 92.01, 92.82, 90.23, 92.05, 93.67, 91.31, 90.6, 96.51, 96.28, 94.59, 90.06, 87.65, 84.58, 85.12, 85.73, 87.7, 86.69], '6M': [80.93, 79.89, 83.63, 85.47, 86.33, 89.48, 92.71, 95.68, 92.59, 91.54, 92.53, 91.62, 92.88, 93.67, 91.31, 90.6, 96.51, 96.28, 94.59, 90.06, 87.65, 84.58, 85.12, 85.73, 87.7, 86.69], '1Y': [73.02, 74.64, 75.18, 71.97, 71.06, 72.58, 72.24, 76.18, 73.89, 70.87, 71.32, 70.79, 74.65, 78.18, 83.71, 85.05, 83.25, 81.64, 82, 83.99, 84.27, 85.54, 83.39, 81.21, 80.85, 80.41, 81.32, 81.12, 83.51, 87.15, 88.82, 90.83, 92.71, 95.68, 92.59, 91.54, 92.53, 91.62, 92.88, 94.17, 91.24, 90, 94.17, 95.39, 94.85, 90.06, 87.65, 84.58, 85.12, 85.73, 87.7, 86.69] },
      velocityScore: { '1D': 1.4, '1W': 1, '1M': 1.9, '6M': null }, isNew: false,
      marketCap: '$181B', pe: 22, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.89,
      etfPresence: { POW: 2.01, VOLT: 4.92, PBD: false, PBW: false, IVEP: 3.69 },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 3, avgWeight: 3.24, proScore: 1.94, coverage: 0.6,
      price: 158.55, weeklyPrices: [162.92, 163.35, 169.61, 159.99, 158.55], weeklyChange: -2.68, dayChange: -0.93, sortRank: 0, periodReturns: { '1M': -8.6, 'YTD': 55.5, '6M': 48.4, '1Y': 115.9 },
      priceHistory: { '1D': [160.04, 157.13, 158.55], '1W': [162.92, 163.35, 169.61, 159.99, 158.55], '1M': [173.39, 176.39, 173.88, 162.86, 163.81, 163.8, 156.79, 164.52, 165.84, 169, 170.94, 177.02, 184.34, 168.37, 167.55, 171.91, 162.92, 163.35, 169.61, 159.99, 158.55], 'YTD': [101.97, 102.72, 107.98, 110.29, 112.26, 112.64, 113.25, 114.93, 120.27, 108.13, 114.3, 121, 112.75, 118.92, 134.48, 137, 138.3, 169.41, 170.74, 158.23, 167.8, 176.39, 156.79, 170.94, 171.91, 158.55], '6M': [106.82, 105.38, 112.5, 110.58, 115.79, 114.62, 115.22, 118.22, 111.65, 109.13, 114.71, 125.61, 118.28, 118.92, 134.48, 137, 138.3, 169.41, 170.74, 158.23, 167.8, 176.39, 156.79, 170.94, 171.91, 158.55], '1Y': [73.44, 74.67, 77.23, 77.09, 78.42, 89.1, 89.8, 88.04, 91.11, 91.93, 95.71, 98.65, 96.6, 99.43, 97.73, 100.54, 100.62, 104.35, 109.97, 105.92, 105.74, 106.53, 108.27, 109.15, 98.28, 104.18, 106.61, 106.39, 109.9, 113.16, 119.43, 112.15, 115.22, 118.22, 111.65, 109.13, 114.71, 125.61, 118.28, 127.11, 131.38, 140.13, 137.37, 172.49, 172.91, 158.23, 167.8, 176.39, 156.79, 170.94, 171.91, 158.55] },
      velocityScore: { '1D': -3, '1W': -2, '1M': -23.6, '6M': null }, isNew: false,
      marketCap: '$26B', pe: 53.9, revenueGrowth: 54, eps: 2.94, grossMargin: 37, dividendYield: 0.53,
      etfPresence: { POW: 3.63, VOLT: 2.93, PBD: false, PBW: false, IVEP: 3.16 },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 3, avgWeight: 2.86, proScore: 1.72, coverage: 0.6,
      price: 482.08, weeklyPrices: [517.02, 514.71, 523.20, 490.12, 482.08], weeklyChange: -6.76, dayChange: -1.64, sortRank: 0, periodReturns: { '1M': 0.3, 'YTD': 8.5, '6M': 4.1, '1Y': 16.1 },
      priceHistory: { '1D': [490.12, 482.51, 482.08], '1W': [517.02, 514.71, 523.2, 490.12, 482.08], '1M': [480.46, 484.91, 485.27, 476.82, 485.03, 486.47, 467.59, 469.32, 476.89, 489.73, 508.87, 523.69, 539.39, 509.96, 518.18, 536.04, 517.02, 514.71, 523.2, 490.12, 482.08], 'YTD': [444.11, 460.87, 484.11, 485.53, 487.94, 503.8, 524.12, 516.99, 516.98, 487.76, 472.64, 489.07, 472.07, 499.31, 545.62, 549.11, 544.71, 507.81, 485.98, 461.5, 484.25, 484.91, 467.59, 508.87, 536.04, 482.08], '6M': [463.03, 470.53, 489.31, 486.82, 495.59, 506.14, 524.25, 526.75, 488.49, 478.06, 471.22, 505.62, 490.74, 499.31, 545.62, 549.11, 544.71, 507.81, 485.98, 461.5, 484.25, 484.91, 467.59, 508.87, 536.04, 482.08], '1Y': [415.12, 422.26, 437.23, 437.5, 437.48, 417.84, 437.67, 429.96, 446.06, 437.16, 450.93, 440.1, 420.44, 423.42, 418.89, 428.82, 433.27, 469.96, 461.47, 437.65, 419.09, 428.47, 437.71, 462.82, 434.85, 454.94, 465.48, 472.88, 472.54, 484.14, 503.86, 503.1, 524.25, 526.75, 488.49, 478.06, 471.22, 505.62, 490.74, 527.21, 526.94, 549.75, 545.93, 502.34, 483.79, 461.5, 484.25, 484.91, 467.59, 508.87, 536.04, 482.08] },
      velocityScore: { '1D': -2.8, '1W': -2.8, '1M': -18.1, '6M': null }, isNew: false,
      marketCap: '$25B', pe: 28.5, revenueGrowth: 11, eps: 16.91, grossMargin: 36, dividendYield: 1.16,
      etfPresence: { POW: 2.76, VOLT: 3.28, PBD: false, PBW: false, IVEP: 2.54 },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'NRG', name: 'NRG Energy Inc', easyScore: 3, avgWeight: 1.33, proScore: 0.8, coverage: 0.6,
      price: 140.21, weeklyPrices: [149.36, 149.11, 146.06, 140.80, 140.21], weeklyChange: -6.13, dayChange: -0.44, sortRank: 0, periodReturns: { '1M': 5, 'YTD': -12, '6M': -15.6, '1Y': -9.9 },
      priceHistory: { '1D': [140.82, 139.9, 140.21], '1W': [149.36, 149.11, 146.06, 140.8, 140.21], '1M': [133.51, 133.76, 133.39, 129.2, 127.71, 129.96, 120.65, 123.7, 125.47, 130.4, 132.13, 135.06, 138.91, 137.66, 142.21, 147.11, 149.36, 149.11, 146.06, 140.8, 140.21], 'YTD': [159.24, 143.53, 158.5, 149.3, 152.63, 153.32, 172.35, 176.52, 175.58, 155.42, 152.48, 151.77, 141.23, 153.06, 170.96, 149.86, 154.81, 157.43, 137.34, 123.71, 138, 133.76, 120.65, 132.13, 147.11, 140.21], '6M': [166.16, 149.27, 152.05, 149.93, 149.11, 155.72, 173.45, 184.03, 162.06, 155.15, 154.75, 151.13, 146.14, 153.06, 170.96, 149.86, 154.81, 157.43, 137.34, 123.71, 138, 133.76, 120.65, 132.13, 147.11, 140.21], '1Y': [155.54, 151.36, 147.38, 157.97, 167.2, 153.22, 153.78, 148.19, 148.12, 147.95, 157.92, 164.19, 162.96, 167.3, 168.25, 169.93, 163.81, 173.14, 170.1, 166.15, 168.8, 168.54, 169.36, 170.64, 154.64, 160.88, 161.59, 148.89, 148.91, 156.04, 152.18, 156.43, 173.45, 184.03, 162.06, 155.15, 154.75, 151.13, 146.14, 160.3, 168.45, 149.6, 149.01, 150.64, 131.08, 123.71, 138, 133.76, 120.65, 132.13, 147.11, 140.21] },
      velocityScore: { '1D': 0, '1W': 2.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$30B', pe: 152.4, revenueGrowth: 20, eps: 0.92, grossMargin: 16, dividendYield: 1.35,
      etfPresence: { POW: 0.51, VOLT: 1.01, PBD: false, PBW: false, IVEP: 2.47 },
      tonyNote: 'NRG Energy Inc appears in 3 of 5 Electrification ETFs (60% coverage) with average weight 1.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 2, avgWeight: 5.54, proScore: 2.22, coverage: 0.4,
      price: 262, weeklyPrices: [279.77, 281.09, 286.36, 264.86, 262.00], weeklyChange: -6.35, dayChange: -1.08, sortRank: 0, periodReturns: { '1M': -12.4, 'YTD': 146.6, '6M': 123, '1Y': 259.7 },
      priceHistory: { '1D': [264.86, 262, 262.14, 262], '1W': [279.77, 281.09, 286.36, 264.86, 262], '1M': [299.07, 299.73, 300.06, 284.87, 293.6, 283.51, 262.34, 290.5, 294.75, 303.53, 294.03, 297.2, 307.8, 291.5, 294.49, 309.2, 279.77, 281.09, 286.36, 264.86, 262], 'YTD': [106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 181.38, 177.5, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 261.58, 295.94, 299.73, 262.34, 294.03, 309.2, 262], '6M': [117.51, 121.83, 139.99, 141.15, 146.79, 187.3, 187.21, 186.39, 170.37, 176.51, 174.04, 186.82, 180.36, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 261.58, 295.94, 299.73, 262.34, 294.03, 309.2, 262], '1Y': [72.84, 70.96, 78.84, 80.05, 79.03, 77.8, 85.17, 82.17, 91.46, 90.24, 97.47, 101.43, 94.58, 102.51, 103.18, 112.77, 113.88, 125.9, 125, 109.4, 95.1, 107.26, 112.31, 120.91, 109.59, 113.62, 120.46, 128.85, 142.76, 147.43, 151.08, 190.09, 187.21, 186.39, 170.37, 176.51, 174.04, 186.82, 180.36, 218.07, 229.73, 242.77, 253.49, 320.3, 300.84, 261.58, 295.94, 299.73, 262.34, 294.03, 309.2, 262] },
      velocityScore: { '1D': -4.3, '1W': -21, '1M': -56, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 51.3, revenueGrowth: 7, eps: 5.11, grossMargin: 30, dividendYield: 0.14,
      etfPresence: { POW: 4.44, VOLT: 6.64, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, avgWeight: 3.49, proScore: 1.4, coverage: 0.4,
      price: 136.19, weeklyPrices: [138.69, 137.97, 136.81, 135.05, 136.19], weeklyChange: -1.8, dayChange: 0.84, sortRank: 0, periodReturns: { '1M': 7.1, 'YTD': 18.1, '6M': 17.6, '1Y': 31.9 },
      priceHistory: { '1D': [135.05, 136.14, 136.19], '1W': [138.69, 137.97, 136.81, 135.05, 136.19], '1M': [127.11, 126.31, 127.79, 129.14, 126.77, 127.76, 128.53, 128.48, 129.23, 129.31, 128.27, 127.69, 130.3, 133.74, 134.96, 137, 138.69, 137.97, 136.81, 135.05, 136.19], 'YTD': [115.31, 115.93, 119.4, 116.63, 119.78, 120.8, 129.94, 132.03, 133.29, 131.86, 134.15, 127.92, 131.12, 132.92, 135.46, 131.89, 135.59, 137.04, 131.94, 128.92, 129.57, 126.31, 128.53, 128.27, 137, 136.19], '6M': [115.81, 116.91, 119.96, 118.02, 118.33, 121.1, 130.24, 132.39, 131.92, 132.31, 133.62, 128.8, 131.08, 132.92, 135.46, 131.89, 135.59, 137.04, 131.94, 128.92, 129.57, 126.31, 128.53, 128.27, 137, 136.19], '1Y': [103.26, 106.04, 105.93, 108.97, 113.14, 113.73, 112.86, 113.55, 112.89, 108.64, 108.74, 106.44, 107.86, 113.46, 116.91, 117.53, 116.18, 121.89, 119.53, 121.48, 121.71, 122.72, 118.04, 114.26, 115.58, 115.67, 114.07, 116.57, 119.22, 119.43, 120.67, 121.23, 130.24, 132.39, 131.92, 132.31, 133.62, 128.8, 131.08, 134.71, 134.39, 131.62, 134.44, 132.56, 127.95, 128.92, 129.57, 126.31, 128.53, 128.27, 137, 136.19] },
      velocityScore: { '1D': 2.2, '1W': 2.2, '1M': -27.5, '6M': null }, isNew: false,
      marketCap: '$74B', pe: 20.1, revenueGrowth: 10, eps: 6.77, grossMargin: 47, dividendYield: 2.81,
      etfPresence: { POW: 2.65, VOLT: 4.33, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 2, avgWeight: 3.28, proScore: 1.31, coverage: 0.4,
      price: 306.83, weeklyPrices: [303.95, 306.97, 334.82, 311.42, 306.83], weeklyChange: 0.95, dayChange: -1.52, sortRank: 0, periodReturns: { '1M': -8.3, 'YTD': 89.4, '6M': 74.7, '1Y': 146.8 },
      priceHistory: { '1D': [311.58, 305.6, 306.83], '1W': [303.95, 306.97, 334.82, 311.42, 306.83], '1M': [334.49, 331.44, 323.92, 300.51, 300.57, 289.52, 280.98, 297.88, 302.87, 311.93, 317.58, 333.05, 357.96, 318.32, 316.43, 325.57, 303.95, 306.97, 334.82, 311.42, 306.83], 'YTD': [162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 234.53, 245.42, 257.75, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.13, 322.63, 319.78, 331.44, 280.98, 317.58, 325.57, 306.83], '6M': [175.61, 163.58, 176.93, 181.23, 190.01, 202, 243.53, 253.15, 244.44, 270.06, 268.41, 270.89, 250.58, 262.3, 310.51, 312.44, 305.03, 341.02, 367.13, 322.63, 319.78, 331.44, 280.98, 317.58, 325.57, 306.83], '1Y': [124.33, 120.72, 131.12, 130.87, 145.6, 139.39, 132.52, 127.54, 129.31, 125.7, 135.71, 141.96, 139.77, 161.64, 168.88, 177.82, 183.2, 193.76, 183.02, 163.64, 170.65, 172.02, 182.54, 178.66, 154.39, 167.58, 173.95, 170.03, 175.18, 189.21, 190.15, 199.62, 243.53, 253.15, 244.44, 270.06, 268.41, 270.89, 250.58, 281.03, 301.16, 305.14, 306.18, 358.92, 369.99, 322.63, 319.78, 331.44, 280.98, 317.58, 325.57, 306.83] },
      velocityScore: { '1D': -3.7, '1W': 1.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$118B', pe: 76.9, revenueGrowth: 30, eps: 3.99, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 2.42, PBD: false, PBW: false, IVEP: 4.14 },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'APH', name: 'Amphenol Corp', easyScore: 2, avgWeight: 2.86, proScore: 1.14, coverage: 0.4,
      price: 170.59, weeklyPrices: [163.72, 166.42, 176.32, 172.22, 170.59], weeklyChange: 4.2, dayChange: -0.97, sortRank: 0, periodReturns: { '1M': 15, 'YTD': 26.2, '6M': 22.1, '1Y': 73.2 },
      priceHistory: { '1D': [172.27, 169.76, 170.59], '1W': [163.72, 166.42, 176.32, 172.22, 170.59], '1M': [148.4, 147.62, 146.77, 138.81, 143.6, 154.07, 149.22, 152.46, 153.8, 158.59, 161.11, 163.96, 165.96, 158.7, 162.78, 165.15, 163.72, 166.42, 176.32, 172.22, 170.59], 'YTD': [135.14, 136.25, 154.22, 150.99, 144.08, 136.23, 146.72, 147.82, 135.16, 136.06, 136.8, 130.67, 119.15, 128.38, 148.72, 151.93, 143.72, 136.69, 127.87, 119.2, 140.24, 147.62, 149.22, 161.11, 165.15, 170.59], '6M': [139.71, 140.16, 154.39, 155.56, 144.93, 144.2, 148.57, 151.5, 129.58, 136.74, 135.12, 127.96, 126.35, 128.38, 148.72, 151.93, 143.72, 136.69, 127.87, 119.2, 140.24, 147.62, 149.22, 161.11, 165.15, 170.59], '1Y': [98.52, 98.31, 101.96, 104.46, 106.51, 108.55, 110.74, 108.65, 110.13, 112.75, 119.47, 122.07, 122.33, 123.58, 126.25, 127.36, 135.31, 139.11, 138.11, 135.25, 136.66, 138.72, 139.46, 139.09, 129.61, 137.43, 139.88, 145.11, 152.33, 166.25, 147.06, 144.14, 148.57, 151.5, 129.58, 136.74, 135.12, 127.96, 126.35, 135.32, 146.98, 148.13, 148.38, 138.47, 124.64, 119.2, 140.24, 147.62, 149.22, 161.11, 165.15, 170.59] },
      velocityScore: { '1D': 0.9, '1W': 6.5, '1M': -36.3, '6M': null }, isNew: false,
      marketCap: '$210B', pe: 49, revenueGrowth: 58, eps: 3.48, grossMargin: 38, dividendYield: 0.58,
      etfPresence: { POW: 1.06, VOLT: 4.65, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, avgWeight: 2.75, proScore: 1.1, coverage: 0.4,
      price: 353.01, weeklyPrices: [348.11, 348.15, 372.87, 356.35, 353.01], weeklyChange: 1.41, dayChange: -0.94, sortRank: 0, periodReturns: { '1M': 13, 'YTD': 68.6, '6M': 59, '1Y': 156.6 },
      priceHistory: { '1D': [356.35, 352.21, 353.01], '1W': [348.11, 348.15, 372.87, 356.35, 353.01], '1M': [312.28, 322.5, 320.92, 294.81, 306.11, 311.64, 308.17, 340.4, 354.37, 370.66, 353.32, 372.59, 388.23, 364.96, 359.61, 375.15, 348.11, 348.15, 372.87, 356.35, 353.01], 'YTD': [209.37, 210.99, 257.29, 262.19, 255.36, 273.26, 314.27, 329.24, 340.42, 305.02, 308.31, 329.78, 298.29, 339.32, 385.73, 385, 369.08, 345.63, 339.42, 302.84, 328.34, 322.5, 308.17, 353.32, 375.15, 353.01], '6M': [221.99, 219.59, 253.86, 263.03, 261.82, 279.17, 314.12, 335.74, 322.47, 311.39, 315.91, 356.38, 322.71, 339.32, 385.73, 385, 369.08, 345.63, 339.42, 302.84, 328.34, 322.5, 308.17, 353.32, 375.15, 353.01], '1Y': [137.55, 143.62, 142.73, 140.91, 138.92, 146.5, 161.89, 147.74, 153.73, 150.14, 159.52, 169.75, 167.35, 178.08, 179.98, 192.22, 198.42, 205.61, 219.2, 202.82, 198.89, 209.9, 214.65, 224.11, 208.77, 217.86, 227.65, 227.59, 250.95, 259.55, 263.03, 279.04, 314.12, 335.74, 322.47, 311.39, 315.91, 356.38, 322.71, 366.95, 374.32, 377.19, 361.39, 360.81, 339.19, 302.84, 328.34, 322.5, 308.17, 353.32, 375.15, 353.01] },
      velocityScore: { '1D': -0.9, '1W': 0, '1M': -34.1, '6M': null }, isNew: false,
      marketCap: '$14B', pe: 73.4, revenueGrowth: 26, eps: 4.81, grossMargin: 39, dividendYield: 0.11,
      etfPresence: { POW: 1.08, VOLT: 4.42, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 2.59, proScore: 1.04, coverage: 0.4,
      price: 73.14, weeklyPrices: [77.92, 75.06, 74.34, 72.77, 73.14], weeklyChange: -6.14, dayChange: 0.5, sortRank: 0, periodReturns: { '1M': 2.6, 'YTD': 21.7, '6M': 20.2, '1Y': 23.7 },
      priceHistory: { '1D': [72.77, 73.36, 73.24, 73.14], '1W': [77.92, 75.06, 74.34, 72.77, 73.14], '1M': [71.31, 71.66, 72.43, 71.96, 71.59, 71.59, 72.26, 71.62, 72.08, 71.49, 71.25, 73.12, 74.95, 75.79, 75.87, 77.53, 77.92, 75.06, 74.34, 72.77, 73.14], 'YTD': [60.11, 61.15, 60.29, 64.96, 67.26, 66.92, 72.28, 72.98, 76.26, 73.18, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 76.12, 74.73, 79.4, 74.37, 71.66, 72.26, 71.25, 77.53, 73.14], '6M': [60.85, 60.32, 61.55, 64.29, 66.34, 67.85, 71.96, 73.5, 75.88, 73.84, 73.69, 74.46, 72.78, 74.04, 71.44, 70.43, 73.04, 76.12, 74.73, 79.4, 74.37, 71.66, 72.26, 71.25, 77.53, 73.14], '1Y': [59.14, 57.78, 58.09, 58.75, 59.95, 57.89, 57.34, 57.22, 57.49, 57.58, 59.33, 60.38, 63.31, 64.06, 63.1, 62.53, 58.93, 57.62, 57.94, 59.59, 58.89, 60.22, 63.66, 60.92, 58.66, 59.52, 61.16, 59.56, 61.51, 65.48, 68.5, 68.84, 71.96, 73.5, 75.88, 73.84, 73.69, 74.46, 72.78, 73.01, 70.76, 71.1, 73.32, 73.76, 75.71, 79.4, 74.37, 71.66, 72.26, 71.25, 77.53, 73.14] },
      velocityScore: { '1D': 2, '1W': -1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$89B', pe: 32.1, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.89,
      etfPresence: { POW: false, VOLT: 1.48, PBD: false, PBW: false, IVEP: 3.7 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'JCI', name: 'JOHNSON CONTROLS INTERNATIONAL PLC', easyScore: 2, avgWeight: 2.58, proScore: 1.03, coverage: 0.4,
      price: 144.04, weeklyPrices: [138.40, 140.47, 146.11, 144.80, 144.04], weeklyChange: 4.08, dayChange: -0.51, sortRank: 0, periodReturns: { '1M': 1.4, 'YTD': 20.3, '6M': 17.8, '1Y': 37.1 },
      priceHistory: { '1D': [144.78, 143.86, 144.18, 144.04], '1W': [138.4, 140.47, 146.11, 144.8, 144.04], '1M': [141.99, 146.96, 147.4, 143.65, 144.05, 147.75, 139.36, 144.01, 144.96, 146.06, 143.62, 144.82, 148.21, 141.28, 142.81, 145.49, 138.4, 140.47, 146.11, 144.8, 144.04], 'YTD': [119.75, 111.29, 112.95, 113.59, 119.26, 137.65, 139.24, 142.83, 145.46, 133.09, 131.69, 133.27, 126.58, 133.15, 142.05, 139.72, 141.59, 144.82, 141.04, 135.42, 138.2, 146.96, 139.36, 143.62, 145.49, 144.04], '6M': [122.31, 110.85, 114.61, 115.07, 122.98, 139, 142.21, 144.71, 139.58, 133.94, 132.56, 136.43, 130.95, 133.15, 142.05, 139.72, 141.59, 144.82, 141.04, 135.42, 138.2, 146.96, 139.36, 143.62, 145.49, 144.04], '1Y': [105.07, 106.33, 108.95, 110.02, 105, 104.31, 105.02, 106, 109.27, 107.09, 107.82, 108.48, 105.77, 108.66, 107.76, 109.37, 110.55, 114.21, 122.25, 120.2, 114.42, 116.29, 114.2, 118.06, 117.74, 122.06, 121.53, 111.39, 114.56, 116.96, 124.01, 138.75, 142.21, 144.71, 139.58, 133.94, 132.56, 136.43, 130.95, 139, 137.21, 139.81, 141.35, 143.14, 143.8, 135.42, 138.2, 146.96, 139.36, 143.62, 145.49, 144.04] },
      velocityScore: { '1D': 3, '1W': 5.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$88B', pe: 44, revenueGrowth: 8, eps: 3.27, grossMargin: 37, dividendYield: 1.1,
      etfPresence: { POW: false, VOLT: 1.43, PBD: false, PBW: false, IVEP: 3.72 },
      tonyNote: 'JOHNSON CONTROLS INTERNATIONAL PLC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VST', name: 'Vistra Corp', easyScore: 2, avgWeight: 2.28, proScore: 0.91, coverage: 0.4,
      price: 154.39, weeklyPrices: [163.49, 162.38, 158.63, 153.16, 154.39], weeklyChange: -5.57, dayChange: 0.82, sortRank: 0, periodReturns: { '1M': -2.3, 'YTD': -4.3, '6M': -6.6, '1Y': -17.4 },
      priceHistory: { '1D': [153.14, 153.88, 154.39], '1W': [163.49, 162.38, 158.63, 153.16, 154.39], '1M': [157.97, 153.8, 153.7, 148.76, 146.9, 146.22, 138.54, 146.38, 148.02, 153.52, 158.83, 163.75, 167.26, 162.39, 162.87, 167.77, 163.49, 162.38, 158.63, 153.16, 154.39], 'YTD': [161.33, 150.6, 180.18, 160.12, 158.35, 149.65, 171.49, 167.8, 165.99, 163.62, 161.99, 151.29, 147.54, 153.68, 163.97, 154.91, 161.12, 160.38, 146.87, 134.71, 160.15, 153.8, 138.54, 158.83, 167.77, 154.39], '6M': [165.23, 166.37, 166.6, 158.81, 154.26, 152.97, 173.68, 171.62, 161.7, 164.4, 164.33, 152.72, 150.33, 153.68, 163.97, 154.91, 161.12, 160.38, 146.87, 134.71, 160.15, 153.8, 138.54, 158.83, 167.77, 154.39], '1Y': [187.02, 195.78, 182, 196.24, 208.54, 205.59, 202.35, 192.91, 194.6, 189.73, 204.05, 210.16, 201.62, 202.65, 210, 210.4, 191.37, 189.71, 184.62, 171.56, 179.14, 176.8, 176.07, 174.6, 166.17, 161.67, 162.93, 172.58, 156.81, 164.26, 153, 159.6, 173.68, 171.62, 161.7, 164.4, 164.33, 152.72, 150.33, 155.89, 162.94, 155.79, 153.79, 158.29, 142.61, 134.71, 160.15, 153.8, 138.54, 158.83, 167.77, 154.39] },
      velocityScore: { '1D': 0, '1W': -2.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$52B', pe: 25.9, revenueGrowth: 43, eps: 5.97, grossMargin: 39, dividendYield: 0.6,
      etfPresence: { POW: 1.36, VOLT: false, PBD: false, PBW: false, IVEP: 3.2 },
      tonyNote: 'Vistra Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CEG', name: 'Constellation Energy Corp', easyScore: 2, avgWeight: 2.12, proScore: 0.85, coverage: 0.4,
      price: 240.42, weeklyPrices: [264.02, 259.32, 248.37, 236.50, 240.42], weeklyChange: -8.94, dayChange: 1.66, sortRank: 0, periodReturns: { '1M': -11.8, 'YTD': -31.9, '6M': -34.4, '1Y': -21.6 },
      priceHistory: { '1D': [236.5, 240.09, 240.28, 240.42], '1W': [264.02, 259.32, 248.37, 236.5, 240.42], '1M': [272.65, 267.24, 264.59, 254.83, 250.67, 251.65, 242.3, 246.71, 253.76, 262.35, 267.17, 274.06, 275.53, 270.26, 267.97, 268.69, 264.02, 259.32, 248.37, 236.5, 240.42], 'YTD': [353.27, 322.54, 341.2, 289.06, 280.68, 261.42, 288.43, 293.8, 327.16, 322.99, 305.58, 289.76, 298.61, 272.58, 296.61, 277.7, 305.71, 320.42, 293.6, 260.67, 288.68, 267.24, 242.3, 267.17, 268.69, 240.42], '6M': [366.25, 342.52, 307.71, 285.27, 270.88, 272.15, 303.01, 312.64, 324.87, 317.09, 307.69, 294.85, 279.25, 272.58, 296.61, 277.7, 305.71, 320.42, 293.6, 260.67, 288.68, 267.24, 242.3, 267.17, 268.69, 240.42], '1Y': [306.63, 313.62, 308.08, 321.67, 347.84, 336.41, 326.21, 314.21, 315.94, 309.06, 318, 322.71, 326.33, 357.46, 383.23, 396.53, 365.8, 382.48, 351.3, 335.74, 357.48, 359.09, 368.62, 378.6, 361.05, 360.46, 354.94, 335.86, 295.4, 288.76, 268.45, 271.14, 303.01, 312.64, 324.87, 317.09, 307.69, 294.85, 279.25, 284.27, 294.73, 287.16, 297, 322.78, 274.89, 260.67, 288.68, 267.24, 242.3, 267.17, 268.69, 240.42] },
      velocityScore: { '1D': -1.2, '1W': -8.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$86B', pe: 20.9, revenueGrowth: 64, eps: 11.52, grossMargin: 23, dividendYield: 0.72,
      etfPresence: { POW: 1.13, VOLT: false, PBD: false, PBW: false, IVEP: 3.11 },
      tonyNote: 'Constellation Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TLN', name: 'Talen Energy Corp', easyScore: 2, avgWeight: 2.07, proScore: 0.83, coverage: 0.4,
      price: 364.25, weeklyPrices: [404.09, 399.34, 384.26, 360.79, 364.25], weeklyChange: -9.86, dayChange: 0.96, sortRank: 0, periodReturns: { '1M': -5.5, 'YTD': -2.8, '6M': -8.2, '1Y': 31.8 },
      priceHistory: { '1D': [360.79, 364.91, 364.25, 364.25], '1W': [404.09, 399.34, 384.26, 360.79, 364.25], '1M': [385.51, 379.59, 378.08, 364.74, 364.78, 358.74, 336.59, 344.8, 360.54, 386.21, 409.81, 436.29, 438.12, 411.92, 405.89, 416.8, 404.09, 399.34, 384.26, 360.79, 364.25], 'YTD': [374.84, 356, 419.07, 366.43, 348.36, 345, 376.7, 367.84, 353.24, 335.11, 317.6, 311.02, 313.03, 330.07, 345.76, 329.74, 361.17, 384.9, 374.61, 314.57, 379.78, 379.59, 336.59, 409.81, 416.8, 364.25], '6M': [396.73, 370.83, 371.66, 350.41, 340.8, 353.66, 388.28, 375.24, 341.39, 331.58, 327.14, 315.77, 319.23, 330.07, 345.76, 329.74, 361.17, 384.9, 374.61, 314.57, 379.78, 379.59, 336.59, 409.81, 416.8, 364.25], '1Y': [276.27, 267.62, 264, 339.16, 377.57, 375.58, 380.6, 360.1, 381.5, 380.44, 400.92, 415.25, 410.72, 434.07, 444.5, 418.03, 383.82, 391.82, 385.93, 355.04, 390.51, 392.42, 367.93, 368.82, 371.72, 384.52, 395.2, 369.03, 356.66, 359.51, 341.42, 357.93, 388.28, 375.24, 341.39, 331.58, 327.14, 315.77, 319.23, 328.65, 353.3, 339.32, 351.91, 409.99, 351.03, 314.57, 379.78, 379.59, 336.59, 409.81, 416.8, 364.25] },
      velocityScore: { '1D': -3.5, '1W': -7.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$17B', pe: null, revenueGrowth: 97, eps: -0.51, grossMargin: 40, dividendYield: null,
      etfPresence: { POW: 1.53, VOLT: false, PBD: false, PBW: false, IVEP: 2.61 },
      tonyNote: 'Talen Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX TECHNOLOGIES INC', easyScore: 2, avgWeight: 2.07, proScore: 0.83, coverage: 0.4,
      price: 192.88, weeklyPrices: [197.91, 189.25, 194.65, 191.25, 192.88], weeklyChange: -2.54, dayChange: 0.83, sortRank: 0, periodReturns: { '1M': 3, 'YTD': 11.6, '6M': 6.1, '1Y': 37 },
      priceHistory: { '1D': [191.29, 192.88, 192.88], '1W': [197.91, 189.25, 194.65, 191.25, 192.88], '1M': [187.26, 184.72, 190.76, 185.95, 187.46, 188.96, 183, 194.68, 193.45, 193.94, 203.07, 205.4, 210, 209.89, 205.65, 204.77, 197.91, 189.25, 194.65, 191.25, 192.88], 'YTD': [172.84, 193.2, 213.25, 207.75, 205.43, 197.19, 200.4, 198.38, 216.47, 200.39, 204.67, 204.85, 191.59, 214.44, 238.27, 216.66, 216.18, 206.15, 206.83, 197.33, 198.95, 184.72, 183, 203.07, 204.77, 192.88], '6M': [181.85, 201.46, 217.89, 206.04, 206.04, 203, 201.09, 204.23, 205.83, 195.91, 207.48, 204.76, 204.49, 214.44, 238.27, 216.66, 216.18, 206.15, 206.83, 197.33, 198.95, 184.72, 183, 203.07, 204.77, 192.88], '1Y': [140.77, 136.45, 142.34, 143.84, 151.93, 179.53, 174.7, 163.56, 165.6, 163.79, 170.1, 174.03, 176.21, 185.7, 195.6, 209.01, 199.92, 213.8, 193.93, 177.88, 179.81, 178.18, 178.33, 183.38, 170.75, 175.88, 189.02, 206.62, 206.07, 212.4, 210.88, 199.83, 201.09, 204.23, 205.83, 195.91, 207.48, 204.76, 204.49, 231.78, 238.42, 219.1, 208.08, 215.2, 206.83, 197.33, 198.95, 184.72, 183, 203.07, 204.77, 192.88] },
      velocityScore: { '1D': 1.2, '1W': -4.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: 51.4, revenueGrowth: 26, eps: 3.75, grossMargin: 23, dividendYield: 0.54,
      etfPresence: { POW: false, VOLT: 1.99, PBD: false, PBW: false, IVEP: 2.15 },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 5.04, proScore: 2.02, coverage: 0.4,
      price: 779.07, weeklyPrices: [804.76, 813.77, 839.36, 776.55, 779.07], weeklyChange: -3.19, dayChange: 0.32, sortRank: 0, periodReturns: { '1M': -11, 'YTD': 154.4, '6M': 144.1, '1Y': 240.6 },
      priceHistory: { '1D': [776.55, 770.73, 779.07], '1W': [804.76, 813.77, 839.36, 776.55, 779.07], '1M': [875.52, 957.03, 993.74, 882.43, 891.86, 842.01, 770.25, 838.55, 858.99, 866.67, 838.21, 861.88, 932.75, 892.25, 867.23, 881.92, 804.76, 813.77, 839.36, 776.55, 779.07], 'YTD': [306.23, 297.62, 336.31, 351.39, 357.91, 401.29, 437.77, 434.64, 432.87, 411.38, 417.76, 422.55, 382.55, 382.22, 464.54, 472.84, 471.85, 806, 851.35, 728.29, 782.12, 957.03, 770.25, 838.21, 881.92, 779.07], '6M': [319.16, 308.13, 350.96, 361.21, 367.95, 418.61, 421.2, 459.72, 415.51, 411.53, 425.51, 446.16, 407.27, 382.22, 464.54, 472.84, 471.85, 806, 851.35, 728.29, 782.12, 957.03, 770.25, 838.21, 881.92, 779.07], '1Y': [228.72, 236.29, 250.69, 252.68, 267.59, 299.64, 282.14, 274.89, 289.36, 288.68, 316.16, 348.58, 338.44, 351.66, 355.53, 361.02, 353.8, 379.03, 388.68, 326.6, 334.17, 339.75, 332.29, 340.51, 302.3, 316.55, 327.11, 307.58, 349.59, 372.25, 386.78, 415.19, 421.2, 459.72, 415.51, 411.53, 425.51, 446.16, 407.27, 423.35, 456.08, 487.87, 469.75, 886.22, 854.28, 728.29, 782.12, 957.03, 770.25, 838.21, 881.92, 779.07] },
      velocityScore: { '1D': 0, '1W': -5.6, '1M': -40.9, '6M': null }, isNew: false,
      marketCap: '$24B', pe: 69.7, revenueGrowth: 92, eps: 11.18, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 6, PRN: 4.09, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 5.02, proScore: 2.01, coverage: 0.4,
      price: 991.6, weeklyPrices: [997.47, 1033.19, 1064.90, 991.41, 991.60], weeklyChange: -0.59, dayChange: -0.02, sortRank: 0, periodReturns: { '1M': 9, 'YTD': 73.1, '6M': 65.7, '1Y': 148.9 },
      priceHistory: { '1D': [991.8, 985.87, 989.56, 991.6], '1W': [997.47, 1033.19, 1064.9, 991.41, 991.6], '1M': [909.81, 926.18, 940.48, 904.28, 915.64, 914.7, 856.16, 897.63, 910.57, 933.93, 955.92, 985.82, 1022.28, 984.24, 994.45, 1057.01, 997.47, 1033.19, 1064.9, 991.41, 991.6], 'YTD': [572.87, 608.13, 647.18, 626.62, 657.36, 726.2, 774.2, 756.47, 752.32, 704.82, 699.78, 701.7, 667.43, 724.44, 794.25, 800.45, 817.87, 904.59, 912.14, 860.15, 909.93, 926.18, 856.16, 955.92, 1057.01, 991.6], '6M': [598.41, 617.62, 646.89, 635.92, 690.91, 742.12, 764.76, 768.23, 722.18, 716.68, 702, 716.63, 708.46, 724.44, 794.25, 800.45, 817.87, 904.59, 912.14, 860.15, 909.93, 926.18, 856.16, 955.92, 1057.01, 991.6], '1Y': [398.43, 408.33, 418.07, 429.52, 438.02, 417.12, 417.5, 420.59, 432.67, 420.22, 431.38, 466.96, 463.72, 490.57, 500.36, 540.96, 520.5, 583.15, 569.78, 553.55, 553.11, 573.73, 599.15, 625.61, 565.83, 583, 616.1, 629.77, 629, 638.91, 702.89, 742.37, 764.76, 768.23, 722.18, 716.68, 702, 716.63, 708.46, 771.58, 770.17, 808.87, 810.05, 926.93, 902.3, 860.15, 909.93, 926.18, 856.16, 955.92, 1057.01, 991.6] },
      velocityScore: { '1D': -4.3, '1W': -2.9, '1M': -35.4, '6M': null }, isNew: false,
      marketCap: '$457B', pe: 49.3, revenueGrowth: 22, eps: 20.13, grossMargin: 29, dividendYield: 0.66,
      etfPresence: { AIRR: false, PRN: 3.15, RSHO: 6.89, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 4.91, proScore: 1.96, coverage: 0.4,
      price: 262, weeklyPrices: [279.77, 281.09, 286.36, 264.86, 262.00], weeklyChange: -6.35, dayChange: -1.08, sortRank: 0, periodReturns: { '1M': -12.4, 'YTD': 146.6, '6M': 123, '1Y': 259.7 },
      priceHistory: { '1D': [264.86, 262, 262.14, 262], '1W': [279.77, 281.09, 286.36, 264.86, 262], '1M': [299.07, 299.73, 300.06, 284.87, 293.6, 283.51, 262.34, 290.5, 294.75, 303.53, 294.03, 297.2, 307.8, 291.5, 294.49, 309.2, 279.77, 281.09, 286.36, 264.86, 262], 'YTD': [106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 181.38, 177.5, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 261.58, 295.94, 299.73, 262.34, 294.03, 309.2, 262], '6M': [117.51, 121.83, 139.99, 141.15, 146.79, 187.3, 187.21, 186.39, 170.37, 176.51, 174.04, 186.82, 180.36, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 261.58, 295.94, 299.73, 262.34, 294.03, 309.2, 262], '1Y': [72.84, 70.96, 78.84, 80.05, 79.03, 77.8, 85.17, 82.17, 91.46, 90.24, 97.47, 101.43, 94.58, 102.51, 103.18, 112.77, 113.88, 125.9, 125, 109.4, 95.1, 107.26, 112.31, 120.91, 109.59, 113.62, 120.46, 128.85, 142.76, 147.43, 151.08, 190.09, 187.21, 186.39, 170.37, 176.51, 174.04, 186.82, 180.36, 218.07, 229.73, 242.77, 253.49, 320.3, 300.84, 261.58, 295.94, 299.73, 262.34, 294.03, 309.2, 262] },
      velocityScore: { '1D': 0, '1W': -1.5, '1M': -41.1, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 51.3, revenueGrowth: 7, eps: 5.11, grossMargin: 30, dividendYield: 0.14,
      etfPresence: { AIRR: 2.48, PRN: false, RSHO: 7.33, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.43, proScore: 1.77, coverage: 0.4,
      price: 1843.39, weeklyPrices: [1854.23, 1948.69, 1981.95, 1865.15, 1843.39], weeklyChange: -0.58, dayChange: -1.17, sortRank: 0, periodReturns: { '1M': -2.1, 'YTD': 97.5, '6M': 83.7, '1Y': 247.9 },
      priceHistory: { '1D': [1865.13, 1838.32, 1852.8, 1843.39], '1W': [1854.23, 1948.69, 1981.95, 1865.15, 1843.39], '1M': [1883.26, 1850.04, 1914.65, 1843.94, 1852.03, 1831.56, 1719.48, 1843.42, 1877.61, 1952.02, 1931.77, 1967.41, 2066.51, 1908.07, 1954.47, 2017.57, 1854.23, 1948.69, 1981.95, 1865.15, 1843.39], 'YTD': [933.29, 971.49, 1091.04, 1121.44, 1142.1, 1230.26, 1337.95, 1413.57, 1438.24, 1372.4, 1414.1, 1408.25, 1273.18, 1424.91, 1650.48, 1674.16, 1719.21, 1967.24, 2016.31, 1825.5, 1867.09, 1850.04, 1719.48, 1931.77, 2017.57, 1843.39], '6M': [1003.64, 1010.41, 1119.98, 1127.55, 1176.26, 1283.65, 1337.75, 1468.58, 1391.16, 1383.62, 1424.46, 1461.52, 1378.99, 1424.91, 1650.48, 1674.16, 1719.21, 1967.24, 2016.31, 1825.5, 1867.09, 1850.04, 1719.48, 1931.77, 2017.57, 1843.39], '1Y': [529.9, 533.77, 550.5, 562.83, 703.3, 694.43, 689.86, 681.08, 709.83, 723.95, 764.91, 799.38, 781.88, 832.98, 834.7, 838.78, 825, 963.3, 957.78, 897.52, 930.5, 970.95, 1004.65, 1024.92, 918.54, 963.83, 1032.31, 1038.18, 1134.75, 1160.38, 1209.97, 1269.63, 1337.75, 1468.58, 1391.16, 1383.62, 1424.46, 1461.52, 1378.99, 1525.16, 1648.96, 1724.49, 1724.14, 2011.49, 2034.63, 1825.5, 1867.09, 1850.04, 1719.48, 1931.77, 2017.57, 1843.39] },
      velocityScore: { '1D': -2.7, '1W': -4.3, '1M': -36.1, '6M': null }, isNew: false,
      marketCap: '$65B', pe: 53.1, revenueGrowth: 1, eps: 34.69, grossMargin: 25, dividendYield: 0.14,
      etfPresence: { AIRR: 4.41, PRN: 4.45, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.92, proScore: 1.57, coverage: 0.4,
      price: 334.36, weeklyPrices: [337.08, 334.16, 338.15, 332.08, 334.36], weeklyChange: -0.81, dayChange: 0.66, sortRank: 0, periodReturns: { '1M': 8.4, 'YTD': 30.2, '6M': 28.8, '1Y': 36.4 },
      priceHistory: { '1W': [337.08, 334.16, 338.15, 332.08, 334.36], '1M': [308.31, 313.39, 313.67, 315.29, 314.42, 322.81, 314.08, 318.89, 320.11, 316.18, 329.89, 337.96, 338.07, 330.9, 333.78, 343.54, 337.08, 334.16, 338.15, 332.08, 334.36], 'YTD': [256.77, 264.62, 282.47, 280.14, 260.41, 291.74, 279.84, 278.74, 283.54, 267.57, 256.83, 262.23, 258.01, 272.54, 292.01, 293.59, 301.24, 305.48, 313.7, 302.64, 312.65, 313.39, 314.08, 329.89, 343.54, 334.36], '6M': [259.63, 272.25, 281.21, 281.54, 270.02, 282.45, 278.31, 282.27, 277.7, 264.31, 261.37, 264.14, 265.32, 272.54, 292.01, 293.59, 301.24, 305.48, 313.7, 302.64, 312.65, 313.39, 314.08, 329.89, 343.54, 334.36], '1Y': [245.19, 255.95, 261.93, 268.07, 271.5, 263.43, 273.04, 262.46, 268.4, 267.96, 269.68, 262.77, 259.1, 259.16, 251.03, 244.84, 260, 255.91, 259.66, 250.89, 243.79, 257.32, 258.83, 262.84, 259.48, 264.78, 263.15, 273.7, 277.44, 262.34, 273.22, 283.73, 278.31, 282.27, 277.7, 264.31, 261.37, 264.14, 265.32, 280.74, 284.56, 289.82, 296.57, 315.39, 310.87, 302.64, 312.65, 313.39, 314.08, 329.89, 343.54, 334.36] },
      velocityScore: { '1D': 0, '1W': 0, '1M': -26.6, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 31.6, revenueGrowth: 7, eps: 10.59, grossMargin: 30, dividendYield: 0.61,
      etfPresence: { AIRR: 1.8, PRN: false, RSHO: 6.04, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'EME', name: 'EMCOR Group, Inc.', easyScore: 2, avgWeight: 3.46, proScore: 1.39, coverage: 0.4,
      price: 804.51, weeklyPrices: [798.10, 814.41, 829.88, 804.33, 804.51], weeklyChange: 0.8, dayChange: -0.06, sortRank: 0, periodReturns: { '1M': -2.8, 'YTD': 31.5, '6M': 26, '1Y': 48.5 },
      priceHistory: { '1D': [805.01, 798.63, 804.51], '1W': [798.1, 814.41, 829.88, 804.33, 804.51], '1M': [827.28, 839.54, 845.43, 817.44, 823.79, 827.78, 776.72, 811.53, 823.05, 842.3, 827.5, 836.59, 868.88, 838.61, 847.17, 862.66, 798.1, 814.41, 829.88, 804.33, 804.51], 'YTD': [611.79, 628.27, 682.13, 694.21, 720.73, 764.35, 800.82, 806.66, 735.78, 719.18, 726.55, 744.66, 701.1, 750.42, 814.18, 838.01, 863.78, 933.27, 924.9, 854.36, 855.26, 839.54, 776.72, 827.5, 862.66, 804.51], '6M': [638.65, 646.27, 698.69, 706.87, 731.67, 776.24, 797.5, 806.8, 736.3, 723.38, 728.55, 761.27, 738.31, 750.42, 814.18, 838.01, 863.78, 933.27, 924.9, 854.36, 855.26, 839.54, 776.72, 827.5, 862.66, 804.51], '1Y': [541.8, 547.59, 559.25, 578.8, 627.49, 617.51, 609.75, 605.13, 624, 640.57, 640, 628.92, 625, 660.28, 680.83, 687.22, 696.28, 648, 653.75, 618.96, 605.84, 610.72, 635.36, 639.58, 612.86, 627.09, 653.57, 660.65, 687.76, 716.28, 744.53, 779.09, 797.5, 806.8, 736.3, 723.38, 728.55, 761.27, 738.31, 789.19, 803.64, 860, 833.37, 943.75, 923.01, 854.36, 855.26, 839.54, 776.72, 827.5, 862.66, 804.51] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$36B', pe: 27, revenueGrowth: 20, eps: 29.76, grossMargin: 19, dividendYield: 0.16,
      etfPresence: { AIRR: 3.75, PRN: 3.18, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'EMCOR Group is an electrical and mechanical construction services company. Revenue grew substantially, and EMCOR is a core Industrials ETF holding because it builds the electrical systems inside data centers, manufacturing plants, and commercial buildings. The $827 share price reflects years of consistent execution and market share gains in a fragmented contractor market.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 2, avgWeight: 2.94, proScore: 1.17, coverage: 0.4,
      price: 271.3, weeklyPrices: [268.87, 268.57, 268.86, 267.41, 271.30], weeklyChange: 0.9, dayChange: 1.43, sortRank: 0, periodReturns: { '1M': 8.2, 'YTD': 32.3, '6M': 28.1, '1Y': 54.2 },
      priceHistory: { '1D': [267.48, 271.58, 271.24, 271.3], '1W': [268.87, 268.57, 268.86, 267.41, 271.3], '1M': [250.72, 248.63, 249.33, 251.9, 246.55, 257.16, 249.49, 264.6, 264.67, 270.44, 283.23, 277.66, 280.36, 275.13, 276.06, 273.14, 268.87, 268.57, 268.86, 267.41, 271.3], 'YTD': [205.02, 210.02, 224.26, 214.89, 208.08, 223.16, 250.21, 257.04, 265.11, 254.14, 240.73, 236.04, 222.99, 236.02, 258.03, 247.72, 240.43, 242.69, 269.76, 253.12, 258.02, 248.63, 249.49, 283.23, 273.14, 271.3], '6M': [211.71, 218.27, 224.89, 215.39, 207.21, 225.15, 252.55, 260.95, 258.84, 253.91, 240.24, 239.51, 230.46, 236.02, 258.03, 247.72, 240.43, 242.69, 269.76, 253.12, 258.02, 248.63, 249.49, 283.23, 273.14, 271.3], '1Y': [175.95, 178.53, 188.83, 186.8, 179.77, 181.58, 175.99, 171.94, 175.65, 179.53, 184.21, 191.84, 189.85, 191.08, 188.83, 191.68, 200.1, 201.77, 205.72, 201.3, 202.06, 204.63, 196.27, 195.89, 198, 211.22, 212.92, 220.15, 220.36, 215.53, 213.49, 224.47, 252.55, 260.95, 258.84, 253.91, 240.24, 239.51, 230.46, 250, 254.04, 240.88, 236.52, 256.43, 273.1, 253.12, 258.02, 248.63, 249.49, 283.23, 273.14, 271.3] },
      velocityScore: { '1D': null, '1W': 3.5, '1M': null, '6M': null }, isNew: true,
      marketCap: '$109B', pe: 62.9, revenueGrowth: 19, eps: 4.31, grossMargin: 35, dividendYield: 0.18,
      etfPresence: { AIRR: false, PRN: 3.7, RSHO: false, IDEF: 2.17, BILT: false },
      tonyNote: 'Howmet Aerospace is an aerospace structures and engine components manufacturer. It appears in Industrials ETFs for its aerospace and defense exposure — commercial air travel recovery and defense spending growth are the two demand drivers. Revenue grew and margins are expanding as Howmet prices power over OEM customers.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 2.82, proScore: 1.13, coverage: 0.4,
      price: 232.63, weeklyPrices: [232.63], weeklyChange: 0.28, dayChange: 0.28, sortRank: 0, periodReturns: { '1M': 0, 'YTD': 0, '6M': 0, '1Y': 0 },
      priceHistory: undefined,
      velocityScore: { '1D': 0, '1W': 0.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 44.4, revenueGrowth: 17, eps: 5.24, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.68, PRN: false, RSHO: 3.96, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 2, avgWeight: 2.31, proScore: 0.93, coverage: 0.4,
      price: 192.88, weeklyPrices: [197.91, 189.25, 194.65, 191.25, 192.88], weeklyChange: -2.54, dayChange: 0.83, sortRank: 0, periodReturns: { '1M': 3, 'YTD': 11.6, '6M': 6.1, '1Y': 37 },
      priceHistory: { '1D': [191.29, 192.88, 192.88], '1W': [197.91, 189.25, 194.65, 191.25, 192.88], '1M': [187.26, 184.72, 190.76, 185.95, 187.46, 188.96, 183, 194.68, 193.45, 193.94, 203.07, 205.4, 210, 209.89, 205.65, 204.77, 197.91, 189.25, 194.65, 191.25, 192.88], 'YTD': [172.84, 193.2, 213.25, 207.75, 205.43, 197.19, 200.4, 198.38, 216.47, 200.39, 204.67, 204.85, 191.59, 214.44, 238.27, 216.66, 216.18, 206.15, 206.83, 197.33, 198.95, 184.72, 183, 203.07, 204.77, 192.88], '6M': [181.85, 201.46, 217.89, 206.04, 206.04, 203, 201.09, 204.23, 205.83, 195.91, 207.48, 204.76, 204.49, 214.44, 238.27, 216.66, 216.18, 206.15, 206.83, 197.33, 198.95, 184.72, 183, 203.07, 204.77, 192.88], '1Y': [140.77, 136.45, 142.34, 143.84, 151.93, 179.53, 174.7, 163.56, 165.6, 163.79, 170.1, 174.03, 176.21, 185.7, 195.6, 209.01, 199.92, 213.8, 193.93, 177.88, 179.81, 178.18, 178.33, 183.38, 170.75, 175.88, 189.02, 206.62, 206.07, 212.4, 210.88, 199.83, 201.09, 204.23, 205.83, 195.91, 207.48, 204.76, 204.49, 231.78, 238.42, 219.1, 208.08, 215.2, 206.83, 197.33, 198.95, 184.72, 183, 203.07, 204.77, 192.88] },
      velocityScore: { '1D': 0, '1W': -7.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: 51.4, revenueGrowth: 26, eps: 3.75, grossMargin: 23, dividendYield: 0.54,
      etfPresence: { AIRR: 2.97, PRN: false, RSHO: false, IDEF: 1.66, BILT: false },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 2, avgWeight: 1.73, proScore: 0.69, coverage: 0.4,
      price: 286.7, weeklyPrices: [281.99, 277.39, 279.89, 278.97, 286.70], weeklyChange: 1.67, dayChange: 2.78, sortRank: 0, periodReturns: { '1M': -2.4, 'YTD': -15.7, '6M': -18, '1Y': 14.6 },
      priceHistory: { '1D': [278.94, 286.8, 286.7, 286.7], '1W': [281.99, 277.39, 279.89, 278.97, 286.7], '1M': [293.66, 287.54, 294.53, 293.04, 292.26, 297.52, 289.13, 300.95, 297.68, 299.66, 296.89, 285.43, 278.19, 283.48, 279.62, 279.09, 281.99, 277.39, 279.89, 278.97, 286.7], 'YTD': [340.07, 378.47, 418.86, 418.58, 420.51, 397.77, 418.78, 438.01, 453.73, 429.58, 416.59, 396.57, 369.08, 402.28, 398.07, 378.21, 361.4, 326.13, 333.56, 324.6, 317.56, 287.54, 289.13, 296.89, 279.09, 286.7], '6M': [349.75, 386.99, 425.9, 413.56, 420.3, 405.82, 417.83, 447.73, 440.33, 417.51, 422.94, 402.08, 379.9, 402.28, 398.07, 378.21, 361.4, 326.13, 333.56, 324.6, 317.56, 287.54, 289.13, 296.89, 279.09, 286.7], '1Y': [250.15, 258.11, 255.35, 263.33, 278.86, 266.45, 267.46, 267.09, 276.39, 269.98, 276.07, 274.69, 271.25, 282.22, 286.14, 282.66, 290.09, 319.07, 305.43, 312.67, 309.74, 314.31, 315.88, 326.72, 322.63, 351.13, 363.48, 398.25, 415.58, 422.79, 429.64, 399.37, 417.83, 447.73, 440.33, 417.51, 422.94, 402.08, 379.9, 411.35, 398.13, 366.88, 362.17, 319.54, 334.22, 324.6, 317.56, 287.54, 289.13, 296.89, 279.09, 286.7] },
      velocityScore: { '1D': 0, '1W': -2.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 18.6, revenueGrowth: 13, eps: 15.4, grossMargin: 12, dividendYield: 1.98,
      etfPresence: { AIRR: 2.44, PRN: false, RSHO: false, IDEF: 1.01, BILT: false },
      tonyNote: 'Huntington Ingalls Industries is the only builder of nuclear-powered aircraft carriers for the U.S. Navy. Revenue is government-contracted and predictable; the ETF allocation in Industrials reflects defense spending growth and the Navy\'s backlog of nuclear submarine and carrier construction. A steady-state quality compounder in a market structure with no competition.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 2, avgWeight: 1.73, proScore: 0.69, coverage: 0.4,
      price: 58.25, weeklyPrices: [47.21, 46.95, 49.86, 53.04, 58.25], weeklyChange: 23.38, dayChange: 9.82, sortRank: 0, periodReturns: { '1M': -7.9, 'YTD': -23.3, '6M': -26.5, '1Y': 34.6 },
      priceHistory: { '1D': [53.04, 57.61, 57.98, 58.25], '1W': [47.21, 46.95, 49.86, 53.04, 58.25], '1M': [63.27, 58.43, 63.4, 58.52, 57.73, 56.19, 54.82, 58.78, 57.75, 57.02, 56.16, 54.21, 51.09, 50.8, 47.95, 46.32, 47.21, 46.95, 49.86, 53.04, 58.25], 'YTD': [75.91, 104.04, 124.56, 110.39, 103.01, 94.41, 89.06, 94.31, 90.72, 92.47, 89.53, 83.69, 65.28, 71.96, 73.66, 68.55, 61.66, 59.31, 57.33, 53.47, 57.3, 58.43, 54.82, 56.16, 46.32, 58.25], '6M': [79.29, 113.7, 130.72, 111.32, 96.16, 98.81, 91.97, 90.68, 88.95, 88.96, 95.31, 77.49, 70.51, 71.96, 73.66, 68.55, 61.66, 59.31, 57.33, 53.47, 57.3, 58.43, 54.82, 56.16, 46.32, 58.25], '1Y': [43.28, 46.27, 58.91, 58.66, 58.7, 59.08, 69.12, 64.27, 67.92, 63.59, 67.67, 80.65, 84.2, 95.03, 98.55, 88.62, 89.32, 88.3, 72.41, 71.69, 70.67, 75.77, 77.68, 78.78, 71.4, 77.7, 89.93, 117.86, 128.68, 118.06, 103.37, 93.48, 91.97, 90.68, 88.95, 88.96, 95.31, 77.49, 70.51, 74.46, 74.66, 68.61, 59.56, 61.52, 52.49, 53.47, 57.3, 58.43, 54.82, 56.16, 46.32, 58.25] },
      velocityScore: { '1D': 3, '1W': 3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 342.6, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.43, PRN: false, RSHO: false, IDEF: 1.02, BILT: false },
      tonyNote: 'Kratos Defense is a defense technology company focused on unmanned systems, satellite communications, and high-performance computing for government customers. It appears in Industrials ETFs as an AI-adjacent defense name — autonomous systems and AI-driven surveillance are direct end markets. Revenue grew and the government contract backlog is expanding.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 1.38, proScore: 0.55, coverage: 0.4,
      price: 73.14, weeklyPrices: [77.92, 75.06, 74.34, 72.77, 73.14], weeklyChange: -6.14, dayChange: 0.5, sortRank: 0, periodReturns: { '1M': 2.6, 'YTD': 21.7, '6M': 20.2, '1Y': 23.7 },
      priceHistory: { '1D': [72.77, 73.36, 73.24, 73.14], '1W': [77.92, 75.06, 74.34, 72.77, 73.14], '1M': [71.31, 71.66, 72.43, 71.96, 71.59, 71.59, 72.26, 71.62, 72.08, 71.49, 71.25, 73.12, 74.95, 75.79, 75.87, 77.53, 77.92, 75.06, 74.34, 72.77, 73.14], 'YTD': [60.11, 61.15, 60.29, 64.96, 67.26, 66.92, 72.28, 72.98, 76.26, 73.18, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 76.12, 74.73, 79.4, 74.37, 71.66, 72.26, 71.25, 77.53, 73.14], '6M': [60.85, 60.32, 61.55, 64.29, 66.34, 67.85, 71.96, 73.5, 75.88, 73.84, 73.69, 74.46, 72.78, 74.04, 71.44, 70.43, 73.04, 76.12, 74.73, 79.4, 74.37, 71.66, 72.26, 71.25, 77.53, 73.14], '1Y': [59.14, 57.78, 58.09, 58.75, 59.95, 57.89, 57.34, 57.22, 57.49, 57.58, 59.33, 60.38, 63.31, 64.06, 63.1, 62.53, 58.93, 57.62, 57.94, 59.59, 58.89, 60.22, 63.66, 60.92, 58.66, 59.52, 61.16, 59.56, 61.51, 65.48, 68.5, 68.84, 71.96, 73.5, 75.88, 73.84, 73.69, 74.46, 72.78, 73.01, 70.76, 71.1, 73.32, 73.76, 75.71, 79.4, 74.37, 71.66, 72.26, 71.25, 77.53, 73.14] },
      velocityScore: { '1D': -1.8, '1W': -3.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$89B', pe: 32.1, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.89,
      etfPresence: { AIRR: false, PRN: false, RSHO: 0.92, IDEF: false, BILT: 1.83 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AIR', name: 'AIRBUS GROUP', easyScore: 2, avgWeight: 1.34, proScore: 0.54, coverage: 0.4,
      price: 144.04, weeklyPrices: [143.14, 141.85, 142.93, 142.76, 144.04], weeklyChange: 0.63, dayChange: 0.82, sortRank: 0, periodReturns: { '1M': 30.2, 'YTD': 74, '6M': 70.6, '1Y': 102.6 },
      priceHistory: { '1D': [142.87, 144.6, 144.04], '1W': [143.14, 141.85, 142.93, 142.76, 144.04], '1M': [110.61, 111.36, 115.53, 116.65, 114.72, 120.13, 117.36, 127.23, 129.01, 131.18, 132.14, 134.88, 134.28, 132.26, 132.94, 138.51, 143.14, 141.85, 142.93, 142.76, 144.04], 'YTD': [82.79, 94.73, 105.74, 105.66, 105.91, 113.09, 112.98, 116.69, 119.77, 107.87, 105.64, 103.49, 103.16, 113.86, 125.99, 116.54, 108.86, 111.9, 111.51, 100.89, 112.82, 111.36, 117.36, 132.14, 138.51, 144.04], '6M': [84.45, 97.03, 105.08, 104.26, 108, 114.34, 113.54, 118.26, 116.84, 108.3, 108.76, 107.81, 109.46, 113.86, 125.99, 116.54, 108.86, 111.9, 111.51, 100.89, 112.82, 111.36, 117.36, 132.14, 138.51, 144.04], '1Y': [71.08, 74.55, 85.1, 77.5, 74.71, 72.06, 77.15, 71.77, 75.82, 77.11, 75.32, 75.93, 82.66, 83.95, 81.27, 82.86, 85.69, 84.22, 82.25, 80.08, 78.56, 82.98, 83.79, 84.34, 81.88, 85.07, 88.02, 98.23, 103.67, 105.47, 109.89, 113.11, 113.54, 118.26, 116.84, 108.3, 108.76, 107.81, 109.46, 120.78, 122.75, 111.5, 105.69, 118.71, 107.47, 100.89, 112.82, 111.36, 117.36, 132.14, 138.51, 144.04] },
      velocityScore: { '1D': 0, '1W': 58.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: 31.7, revenueGrowth: 25, eps: 4.55, grossMargin: 19, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 2.51, BILT: false },
      tonyNote: 'AIRBUS GROUP appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RBC', name: 'RBC Bearings Incorporated', easyScore: 2, avgWeight: 1.18, proScore: 0.47, coverage: 0.4,
      price: 619.64, weeklyPrices: [630.36, 634.78, 644.06, 620.47, 619.64], weeklyChange: -1.7, dayChange: -0.15, sortRank: 0, periodReturns: { '1M': 7.1, 'YTD': 38.2, '6M': 35.1, '1Y': 61.7 },
      priceHistory: { '1D': [620.55, 620.18, 619.64], '1W': [630.36, 634.78, 644.06, 620.47, 619.64], '1M': [578.34, 584.18, 589.76, 590.09, 590.97, 592.41, 576.74, 607.46, 603.64, 616.95, 625.73, 639.18, 645.73, 633.44, 638.94, 648.89, 630.36, 634.78, 644.06, 620.47, 619.64], 'YTD': [448.43, 485, 497.06, 504.07, 499.67, 544.02, 552.44, 562.54, 584.89, 565.64, 546.91, 537.2, 524.38, 553.31, 598.23, 591.32, 594.39, 607.5, 613.1, 565.22, 577.42, 584.18, 576.74, 625.73, 648.89, 619.64], '6M': [458.79, 487.16, 498.82, 504.5, 507.13, 548.2, 552.93, 571.57, 568.58, 560.28, 544.55, 552.23, 543.12, 553.31, 598.23, 591.32, 594.39, 607.5, 613.1, 565.22, 577.42, 584.18, 576.74, 625.73, 648.89, 619.64], '1Y': [383.13, 378.91, 397.03, 385.02, 387.34, 404.66, 401.92, 392.76, 399.53, 391.1, 385.08, 384.72, 379.44, 374.99, 384.43, 369.71, 407.3, 406.45, 431.93, 431.55, 430.24, 443.29, 443.22, 458.15, 449.77, 456.33, 461.21, 488.31, 495.29, 504.54, 516.1, 547.51, 552.93, 571.57, 568.58, 560.28, 544.55, 552.23, 543.12, 580.55, 586.98, 588.74, 584.49, 623.19, 618.91, 565.22, 577.42, 584.18, 576.74, 625.73, 648.89, 619.64] },
      velocityScore: { '1D': 0, '1W': -2.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$20B', pe: 67.9, revenueGrowth: 18, eps: 9.12, grossMargin: 45, dividendYield: null,
      etfPresence: { AIRR: 1.85, PRN: false, RSHO: false, IDEF: 0.5, BILT: false },
      tonyNote: 'RBC Bearings Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRCY', name: 'Mercury Systems, Inc.', easyScore: 2, avgWeight: 1.18, proScore: 0.47, coverage: 0.4,
      price: 124.39, weeklyPrices: [109.38, 110.22, 122.33, 123.05, 124.39], weeklyChange: 13.72, dayChange: 1.09, sortRank: 0, periodReturns: { '1M': 10.2, 'YTD': 70.4, '6M': 63.6, '1Y': 146.3 },
      priceHistory: { '1D': [123.05, 124.5, 124.03, 124.39], '1W': [109.38, 110.22, 122.33, 123.05, 124.39], '1M': [112.87, 111.59, 117.82, 111.27, 110.94, 108.82, 106.81, 119.32, 120.3, 115.93, 115.5, 113.91, 111.76, 110.87, 105, 105.57, 109.38, 110.22, 122.33, 123.05, 124.39], 'YTD': [73.01, 88.74, 102.95, 99.05, 93.88, 82.2, 82.36, 85.9, 91.01, 89.36, 80.71, 78.29, 69.86, 77.53, 84.09, 83.36, 76.53, 82.96, 92.32, 92.8, 97.11, 111.59, 106.81, 115.5, 105.57, 124.39], '6M': [76.03, 93.48, 103.02, 98.89, 93.89, 85.37, 83.32, 88.76, 89.43, 86.87, 81.35, 74.49, 72.91, 77.53, 84.09, 83.36, 76.53, 82.96, 92.32, 92.8, 97.11, 111.59, 106.81, 115.5, 105.57, 124.39], '1Y': [50.5, 50.62, 52.2, 52.46, 52.59, 52.62, 66.83, 64.54, 68.13, 67.89, 73.08, 77.1, 73.13, 82.56, 80.96, 77.1, 77.6, 76.8, 75.36, 71.26, 67.55, 69.62, 71.35, 76.61, 68.88, 74.22, 81.29, 97.02, 97.1, 101.04, 99.28, 84.36, 83.32, 88.76, 89.43, 86.87, 81.35, 74.49, 72.91, 80.81, 85.51, 82.61, 74.75, 91.66, 92.5, 92.8, 97.11, 111.59, 106.81, 115.5, 105.57, 124.39] },
      velocityScore: { '1D': 4.4, '1W': 11.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 12, eps: -0.23, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: 1.24, PRN: false, RSHO: false, IDEF: 1.12, BILT: false },
      tonyNote: 'Mercury Systems, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, avgWeight: 1.05, proScore: 0.42, coverage: 0.4,
      price: 58.37, weeklyPrices: [46.42, 47.10, 49.92, 54.93, 58.37], weeklyChange: 25.73, dayChange: 6.2, sortRank: 0, periodReturns: { '1M': 6.8, 'YTD': -20.2, '6M': -24.1, '1Y': 29 },
      priceHistory: { '1D': [54.96, 58.15, 58.65, 58.37], '1W': [46.42, 47.1, 49.92, 54.93, 58.37], '1M': [54.65, 51.84, 54.39, 49.44, 49.64, 48.37, 45.87, 49.58, 47.83, 48.27, 52.03, 50.37, 47.7, 46.38, 44.84, 46.27, 46.42, 47.1, 49.92, 54.93, 58.37], 'YTD': [73.17, 101.28, 109.49, 108.22, 103.8, 95.36, 75.79, 81.27, 93.04, 106.09, 104.08, 102.39, 74.82, 82, 90.18, 82.06, 70.3, 62.89, 62.48, 64.2, 63.52, 51.84, 45.87, 52.03, 46.27, 58.37], '6M': [76.85, 106.22, 108.5, 108.71, 102.87, 97.47, 75.11, 83.6, 91.11, 102.79, 104.06, 101.84, 80.05, 82, 90.18, 82.06, 70.3, 62.89, 62.48, 64.2, 63.52, 51.84, 45.87, 52.03, 46.27, 58.37], '1Y': [45.24, 47.44, 56.3, 49.41, 51.7, 48.21, 50.91, 50.76, 54.65, 53.38, 63.8, 65.45, 67.4, 73.41, 74.51, 76.85, 81.99, 85.6, 74.98, 59.99, 60.93, 67.43, 66.48, 69.37, 68.11, 77.55, 83.99, 107.5, 106.28, 113.34, 111.72, 91.25, 75.11, 83.6, 91.11, 102.79, 104.06, 101.84, 80.05, 87.75, 92.73, 82.11, 65.98, 63.19, 67.28, 64.2, 63.52, 51.84, 45.87, 52.03, 46.27, 58.37] },
      velocityScore: { '1D': 2.4, '1W': 10.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$8B', pe: 253.8, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.88, PRN: false, RSHO: false, IDEF: 0.22, BILT: false },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DRS', name: 'Leonardo DRS, Inc.', easyScore: 2, avgWeight: 0.53, proScore: 0.21, coverage: 0.4,
      price: 43.67, weeklyPrices: [42.48, 40.95, 42.67, 42.69, 43.67], weeklyChange: 2.8, dayChange: 2.31, sortRank: 0, periodReturns: { '1M': -7.8, 'YTD': 28.1, '6M': 25.6, '1Y': -3.6 },
      priceHistory: { '1D': [42.69, 43.87, 43.67], '1W': [42.48, 40.95, 42.67, 42.69, 43.67], '1M': [47.39, 45.61, 46.71, 46.15, 46.55, 47.35, 46.11, 49.69, 48.53, 46.68, 46.58, 46.08, 44.99, 45.74, 44.69, 44.36, 42.48, 40.95, 42.67, 42.69, 43.67], 'YTD': [34.09, 38.84, 42.26, 40.99, 41.06, 38.93, 38.13, 38.14, 45.49, 47.41, 45.3, 44.4, 43.25, 46.19, 47.54, 43.2, 40.18, 39.7, 42.87, 42.81, 45.35, 45.61, 46.11, 46.58, 44.36, 43.67], '6M': [34.78, 40.99, 42.57, 40.63, 40.45, 40.22, 39.13, 43.82, 45.51, 46.35, 45.6, 44.06, 44.52, 46.19, 47.54, 43.2, 40.18, 39.7, 42.87, 42.81, 45.35, 45.61, 46.11, 46.58, 44.36, 43.67], '1Y': [45.31, 46.24, 48.33, 47.45, 41.6, 41.25, 41.74, 41.06, 42.03, 40.91, 41.61, 42.58, 42.35, 44.63, 44.21, 39.6, 40.53, 36.05, 35.31, 34.53, 33.43, 33.69, 34.31, 34.78, 33.17, 34.28, 37.01, 41.27, 42.07, 42.16, 41.51, 39.48, 39.13, 43.82, 45.51, 46.35, 45.6, 44.06, 44.52, 47.93, 46.29, 42.07, 39.47, 41.79, 42.5, 42.81, 45.35, 45.61, 46.11, 46.58, 44.36, 43.67] },
      velocityScore: { '1D': 0, '1W': -8.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 40.8, revenueGrowth: 6, eps: 1.07, grossMargin: 24, dividendYield: 0.84,
      etfPresence: { AIRR: 0.77, PRN: false, RSHO: false, IDEF: 0.28, BILT: false },
      tonyNote: 'Leonardo DRS, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TPC', name: 'Tutor Perini Corporation', easyScore: 2, avgWeight: 0.38, proScore: 0.15, coverage: 0.4,
      price: 79.03, weeklyPrices: [79.53, 81.88, 82.97, 79.51, 79.03], weeklyChange: -0.63, dayChange: -0.68, sortRank: 0, periodReturns: { '1M': 6.4, 'YTD': 17.9, '6M': 14, '1Y': 66.5 },
      priceHistory: { '1D': [79.58, 79.06, 79.03], '1W': [79.53, 81.88, 82.97, 79.51, 79.03], '1M': [74.29, 72.26, 72.38, 70.53, 72.13, 71.48, 68.72, 73.61, 74.92, 76.55, 77.89, 77.99, 81.5, 81, 82.36, 81.56, 79.53, 81.88, 82.97, 79.51, 79.03], 'YTD': [67.02, 70.17, 75.17, 76.01, 78.89, 83.48, 82.74, 84.99, 73.57, 72.04, 71.31, 72.44, 72.83, 77.31, 86.16, 85.11, 86.87, 97.31, 82.69, 74.91, 74.47, 72.26, 68.72, 77.89, 81.56, 79.03], '6M': [69.35, 70.53, 75.09, 77.34, 80.11, 84.07, 82.24, 85.87, 69.95, 71.29, 71.44, 75.25, 77.19, 77.31, 86.16, 85.11, 86.87, 97.31, 82.69, 74.91, 74.47, 72.26, 68.72, 77.89, 81.56, 79.03], '1Y': [47.46, 48.06, 50.89, 48.29, 48.15, 55.07, 57.25, 55.99, 58.79, 61, 62.89, 66.22, 64.33, 62.04, 61.75, 64.19, 67.67, 67.69, 67.4, 59.64, 60.11, 67.56, 68.64, 70.46, 67.56, 69.06, 71.79, 74.25, 74.13, 78.53, 82.33, 86, 82.24, 85.87, 69.95, 71.29, 71.44, 75.25, 77.19, 80.54, 86.25, 84.19, 86.04, 96.98, 80.64, 74.91, 74.47, 72.26, 68.72, 77.89, 81.56, 79.03] },
      velocityScore: { '1D': 0, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 54.1, revenueGrowth: 12, eps: 1.46, grossMargin: 12, dividendYield: 0.3,
      etfPresence: { AIRR: 0.71, PRN: false, RSHO: false, IDEF: 0.04, BILT: false },
      tonyNote: 'Tutor Perini Corporation appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TKR', name: 'TIMKEN CO/THE', easyScore: 1, avgWeight: 8.69, proScore: 1.74, coverage: 0.2,
      price: 142.47, weeklyPrices: [141.22, 143.50, 145.32, 141.75, 142.47], weeklyChange: 0.89, dayChange: 0.49, sortRank: 0, periodReturns: { '1M': 8, 'YTD': 69.3, '6M': 65.1, '1Y': 85.7 },
      priceHistory: { '1D': [141.77, 143.1, 142.47, 142.47], '1W': [141.22, 143.5, 145.32, 141.75, 142.47], '1M': [131.9, 131.82, 133.66, 131.83, 134.67, 137.09, 132.39, 137.4, 137.06, 139.12, 139.4, 142.36, 141.97, 137.64, 137.99, 144.01, 141.22, 143.5, 145.32, 141.75, 142.47], 'YTD': [84.13, 90.6, 93.73, 93.94, 93.19, 106.04, 107.84, 107.83, 109.99, 100.58, 98.74, 98.99, 95.94, 99.17, 106.81, 108.75, 106.88, 109.63, 117.12, 109.36, 127.16, 131.82, 132.39, 139.4, 144.01, 142.47], '6M': [86.29, 91.17, 93.55, 94.02, 94.99, 108.93, 105.54, 109.52, 106.58, 102.18, 98.59, 101.03, 100.57, 99.17, 106.81, 108.75, 106.88, 109.63, 117.12, 109.36, 127.16, 131.82, 132.39, 139.4, 144.01, 142.47], '1Y': [76.72, 78.57, 79.13, 80.76, 76.09, 73.91, 77.08, 75.86, 79.01, 77.42, 79.16, 79.09, 74.2, 75.99, 74.32, 74.04, 77.71, 78.68, 77.95, 77.85, 74.82, 81.36, 82.76, 88.71, 84.92, 86.52, 88.34, 90.83, 90.65, 93.89, 96.14, 109.41, 105.54, 109.52, 106.58, 102.18, 98.59, 101.03, 100.57, 105.88, 103.73, 106.79, 106.53, 119.7, 115.74, 109.36, 127.16, 131.82, 132.39, 139.4, 144.01, 142.47] },
      velocityScore: { '1D': 0, '1W': 0, '1M': -55.6, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 32.5, revenueGrowth: 8, eps: 4.39, grossMargin: 31, dividendYield: 1.02,
      etfPresence: { AIRR: false, PRN: false, RSHO: 8.69, IDEF: false, BILT: false },
      tonyNote: 'TIMKEN CO/THE appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RTX', name: 'RTX CORP', easyScore: 1, avgWeight: 8.38, proScore: 1.68, coverage: 0.2,
      price: 195.89, weeklyPrices: [187.99, 187.33, 189.73, 191.78, 195.89], weeklyChange: 4.2, dayChange: 2.15, sortRank: 0, periodReturns: { '1M': 12.4, 'YTD': 6.8, '6M': 4.6, '1Y': 35.5 },
      priceHistory: { '1D': [191.77, 195.93, 195.57, 195.89], '1W': [187.99, 187.33, 189.73, 191.78, 195.89], '1M': [174.26, 172.55, 179.41, 180.99, 178.66, 181.56, 177.41, 184.21, 183.53, 183.64, 192.58, 185.6, 181.83, 186.39, 185.06, 186.59, 187.99, 187.33, 189.73, 191.78, 195.89], 'YTD': [183.4, 187.17, 199.83, 195.93, 200.93, 198.66, 200.06, 201.92, 212.16, 208.23, 206.06, 194.82, 187.15, 197.92, 202.81, 187.17, 175.68, 172.87, 178.89, 174.49, 176.59, 172.55, 177.41, 192.58, 186.59, 195.89], '6M': [187.25, 188.5, 201.92, 194.13, 201.09, 196.19, 203.5, 198.46, 206.52, 207, 203.33, 194, 192.9, 197.92, 202.81, 187.17, 175.68, 172.87, 178.89, 174.49, 176.59, 172.55, 177.41, 192.58, 186.59, 195.89], '1Y': [144.52, 146.4, 151.5, 155.22, 157.57, 155.76, 155.08, 156.59, 159.84, 158.68, 157.65, 158.19, 160.51, 166.63, 162.18, 157.05, 179.44, 177.42, 175.1, 173.96, 173.77, 173.19, 171.31, 177.42, 178.29, 185.17, 188.26, 193.85, 196.36, 201.28, 203.5, 195.19, 203.5, 198.46, 206.52, 207, 203.33, 194, 192.9, 203.48, 198.39, 180.91, 172.79, 176.74, 178.11, 174.49, 176.59, 172.55, 177.41, 192.58, 186.59, 195.89] },
      velocityScore: { '1D': 0, '1W': 0.6, '1M': -46.3, '6M': null }, isNew: false,
      marketCap: '$264B', pe: 36.8, revenueGrowth: 9, eps: 5.33, grossMargin: 20, dividendYield: 1.52,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 8.38, BILT: false },
      tonyNote: 'RTX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 4.35, proScore: 4.35, coverage: 1,
      price: 232, weeklyPrices: [240.30, 261.15, 276.17, 229.18, 232.00], weeklyChange: -3.45, dayChange: 1.23, sortRank: 0, periodReturns: { '1M': -11, 'YTD': 177.2, '6M': 157.9, '1Y': 364.3 },
      priceHistory: { '1D': [229.18, 229.94, 232], '1W': [240.3, 261.15, 276.17, 229.18, 232], '1M': [260.58, 251.68, 259.67, 227.81, 218, 220.12, 211.69, 222.24, 232.36, 260.07, 280.91, 286.69, 283.61, 275.25, 259.66, 256.63, 240.3, 261.15, 276.17, 229.18, 232], 'YTD': [83.71, 97.3, 103.89, 94.5, 85.19, 86.1, 98.01, 100.61, 91.01, 94.94, 129.85, 114.15, 92.26, 117.4, 161.94, 156.55, 135.51, 175.92, 179.11, 197.73, 208.37, 251.68, 211.69, 280.91, 256.63, 232], '6M': [89.95, 97.93, 108.73, 91.46, 88.16, 92.88, 97.52, 102.58, 86.8, 96.43, 116.33, 114.91, 103.76, 117.4, 161.94, 156.55, 135.51, 175.92, 179.11, 197.73, 208.37, 251.68, 211.69, 280.91, 256.63, 232], '1Y': [49.97, 46.43, 53.69, 52.16, 54.43, 65.31, 68.46, 67.47, 70.1, 64.91, 89.19, 94.12, 107.94, 125.87, 132.64, 123.04, 106.16, 124.18, 109.44, 88.63, 95.07, 94.69, 102.8, 94.28, 78.09, 87.59, 92.83, 107.33, 99.29, 97.87, 89.95, 91.79, 97.52, 102.58, 86.8, 96.43, 116.33, 114.91, 103.76, 125, 166.77, 156.14, 141.19, 195.09, 207.27, 197.73, 208.37, 251.68, 211.69, 280.91, 256.63, 232] },
      velocityScore: { '1D': 1.4, '1W': -19.4, '1M': 2.1, '6M': null }, isNew: false,
      marketCap: '$59B', pe: 89.6, revenueGrowth: 684, eps: 2.59, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 3.36, MEME: 6.07, RKNG: 3.61 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 3, avgWeight: 3.48, proScore: 3.48, coverage: 1,
      price: 1059.51, weeklyPrices: [1132.33, 1145.28, 1154.29, 1032.28, 1059.51], weeklyChange: -6.43, dayChange: 2.64, sortRank: 0, periodReturns: { '1M': -0.4, 'YTD': 271.2, '6M': 235.9, '1Y': 770.3 },
      priceHistory: { '1D': [1032.28, 1055.41, 1059.51], '1W': [1132.33, 1145.28, 1154.29, 1032.28, 1059.51], '1M': [1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 1059.51], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1213.56, 1059.51], '6M': [315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1213.56, 1059.51], '1Y': [121.74, 123.11, 113.26, 111.73, 109.14, 111.87, 125.29, 117.21, 117.75, 124.21, 150.57, 168.89, 156.83, 183.75, 192.33, 202.53, 206.71, 224.01, 238.33, 236.95, 225.92, 230.26, 226.65, 258.46, 248.55, 284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1213.56, 1059.51] },
      velocityScore: { '1D': -0.6, '1W': 5.5, '1M': 3.6, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 23.9, revenueGrowth: 346, eps: 44.28, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { BUZZ: 3.54, MEME: 2.87, RKNG: 4.04 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 3, avgWeight: 3.12, proScore: 3.12, coverage: 1,
      price: 35.59, weeklyPrices: [39.16, 37.77, 37.30, 35.52, 35.59], weeklyChange: -9.12, dayChange: 0.2, sortRank: 0, periodReturns: { '1M': -25.6, 'YTD': 45.1, '6M': 26.6, '1Y': 237 },
      priceHistory: { '1D': [35.52, 35.33, 35.71, 35.59], '1W': [39.16, 37.77, 37.3, 35.52, 35.59], '1M': [47.86, 44.71, 44.15, 39.62, 40.94, 41.91, 38.92, 41.47, 42.7, 46.47, 45.57, 46.59, 45.2, 45.27, 41.98, 40.95, 39.16, 37.77, 37.3, 35.52, 35.59], 'YTD': [24.52, 31.94, 35.22, 37.69, 33.88, 34.95, 35.28, 30, 27.93, 27.03, 27.71, 27.26, 20.55, 25.18, 31.47, 31.32, 32.11, 39.88, 43.93, 36.62, 48.98, 44.71, 38.92, 45.57, 40.95, 35.59], '6M': [28.11, 37.68, 37.4, 36.18, 34.8, 38.26, 33.56, 30.66, 26.15, 27.4, 27.51, 26.79, 23.74, 25.18, 31.47, 31.32, 32.11, 39.88, 43.93, 36.62, 48.98, 44.71, 38.92, 45.57, 40.95, 35.59], '1Y': [10.56, 9.33, 10.91, 11.2, 13.14, 14.24, 14.55, 15.72, 16.7, 14.33, 17.18, 19.91, 22.59, 26.47, 29.29, 36.64, 33.38, 33.95, 31.08, 23.06, 23.09, 24.94, 31.14, 30.76, 23.9, 24.05, 30.2, 38.21, 35.46, 41.35, 36.7, 37.47, 33.56, 30.66, 26.15, 27.4, 27.51, 26.79, 23.74, 27.79, 30.81, 32.43, 32.69, 44.24, 45.48, 36.62, 48.98, 44.71, 38.92, 45.57, 40.95, 35.59] },
      velocityScore: { '1D': -1.9, '1W': -18.7, '1M': -21, '6M': null }, isNew: false,
      marketCap: '$10B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 1.87, MEME: 4.3, RKNG: 3.2 },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 4.63, proScore: 3.08, coverage: 0.667,
      price: 292.74, weeklyPrices: [252.02, 275.01, 302.70, 289.50, 292.74], weeklyChange: 16.16, dayChange: 1.11, sortRank: 0, periodReturns: { '1M': -3.3, 'YTD': 236.9, '6M': 196.6, '1Y': 1197.6 },
      priceHistory: { '1D': [289.52, 287.28, 292.74], '1W': [252.02, 275.01, 302.7, 289.5, 292.74], '1M': [302.85, 287.32, 291.37, 263.61, 253.57, 259.61, 234.23, 248.88, 260.22, 274.5, 284.99, 328.91, 345.85, 321.98, 326.19, 309.18, 252.02, 275.01, 302.7, 289.5, 292.74], 'YTD': [86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 160.28, 166, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 261.34, 293.8, 287.32, 234.23, 284.99, 309.18, 292.74], '6M': [98.69, 134.07, 149.5, 139.62, 156.13, 155.17, 145.32, 166.2, 153.02, 154, 160.05, 145.88, 135.49, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 261.34, 293.8, 287.32, 234.23, 284.99, 309.18, 292.74], '1Y': [22.56, 25.85, 24.31, 33.06, 37.39, 36.8, 45.11, 44.51, 50.85, 54.91, 67.29, 80.97, 68.69, 88, 86.65, 115.09, 101.42, 127.85, 136.86, 103.55, 108.93, 101.14, 118.09, 108.99, 80.21, 90.18, 103.87, 136.87, 151.75, 152.31, 168.89, 148.7, 145.32, 166.2, 153.02, 154, 160.05, 145.88, 135.49, 146.78, 213.84, 229.75, 287.97, 285.47, 289.76, 261.34, 293.8, 287.32, 234.23, 284.99, 309.18, 292.74] },
      velocityScore: { '1D': 4.4, '1W': -24.5, '1M': -24.3, '6M': null }, isNew: false,
      marketCap: '$83B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.88, RKNG: 3.37 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 4.54, proScore: 3.02, coverage: 0.667,
      price: 2051.12, weeklyPrices: [2090.71, 2050.39, 2273.73, 2032.22, 2051.12], weeklyChange: -1.89, dayChange: 0.93, sortRank: 0, periodReturns: { '1M': 19.5, 'YTD': 764.1, '6M': 645.2, '1Y': 4338.7 },
      priceHistory: { '1D': [2032.22, 2046.13, 2051.12], '1W': [2090.71, 2050.39, 2273.73, 2032.22, 2051.12], '1M': [1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 2051.12], 'YTD': [237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.94, 1831.5, 1643.23, 1958.8, 2335, 2051.12], '6M': [275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 565.41, 618.89, 720.17, 702.48, 635.34, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.94, 1831.5, 1643.23, 1958.8, 2335, 2051.12], '1Y': [46.21, 46.95, 41.52, 42.06, 42.92, 40.69, 46.68, 44.4, 48.44, 62.5, 84.3, 98.87, 94.29, 124.14, 129.68, 144.27, 167.05, 195.82, 207.69, 243.57, 245.96, 215.04, 213.31, 241.61, 219.46, 250.05, 274.08, 389.27, 453.12, 481.43, 695.51, 541.64, 590.59, 638.52, 565.41, 618.89, 720.17, 702.48, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1447.23, 1383.29, 1589.94, 1831.5, 1643.23, 1958.8, 2335, 2051.12] },
      velocityScore: { '1D': 4.5, '1W': -34.8, '1M': -33, '6M': null }, isNew: false,
      marketCap: '$304B', pe: 70.1, revenueGrowth: 251, eps: 29.26, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.34, RKNG: 3.73 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 2, avgWeight: 4.22, proScore: 2.82, coverage: 0.667,
      price: 607.89, weeklyPrices: [586.45, 651.88, 638.72, 598.37, 607.89], weeklyChange: 3.66, dayChange: 1.59, sortRank: 0, periodReturns: { '1M': 8, 'YTD': 252.9, '6M': 223.9, '1Y': 824.1 },
      priceHistory: { '1D': [598.37, 605.99, 607.89], '1W': [586.45, 651.88, 638.72, 598.37, 607.89], '1M': [563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 607.89], 'YTD': [172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 530.6, 594.11, 490.09, 712.13, 675.39, 607.89], '6M': [187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 266.22, 313.81, 301.05, 270.49, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 530.6, 594.11, 490.09, 712.13, 675.39, 607.89], '1Y': [65.78, 65.06, 67.02, 69.02, 78.69, 74.44, 76.24, 75.64, 80.67, 90.49, 96.15, 105.15, 107.21, 131.26, 119.7, 125.92, 125.72, 138.13, 163.6, 157.16, 153.97, 157.74, 161, 187.2, 175.01, 181.54, 187.88, 212.14, 222.97, 252.66, 290.24, 262.56, 284.11, 270.57, 250.61, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 455.8, 530.6, 594.11, 490.09, 712.13, 675.39, 607.89] },
      velocityScore: { '1D': -2.4, '1W': -24.8, '1M': 13.3, '6M': null }, isNew: false,
      marketCap: '$210B', pe: 36.4, revenueGrowth: 46, eps: 16.69, grossMargin: 45, dividendYield: 0.1,
      etfPresence: { BUZZ: false, MEME: 4.79, RKNG: 3.66 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 2, avgWeight: 4, proScore: 2.67, coverage: 0.667,
      price: 88.23, weeklyPrices: [71.45, 86.77, 88.86, 86.10, 88.23], weeklyChange: 23.49, dayChange: 2.48, sortRank: 0, periodReturns: { '1M': -25.3, 'YTD': 21.5, '6M': 5.7, '1Y': 93 },
      priceHistory: { '1D': [86.1, 88.69, 87.98, 88.23], '1W': [71.45, 86.77, 88.86, 86.1, 88.23], '1M': [118.17, 107.73, 107.29, 93.6, 92.06, 88.71, 87.32, 97.56, 82.41, 87.57, 85.43, 80.66, 73.19, 72.87, 68.01, 65.62, 71.45, 86.77, 88.86, 86.1, 88.23], 'YTD': [72.63, 90.56, 101.25, 113.57, 111.21, 101.79, 82.51, 83.9, 86.92, 89.76, 89.11, 88.42, 73.82, 92.57, 88.57, 80.01, 71.88, 63.87, 72.96, 88.1, 129.6, 107.73, 87.32, 85.43, 65.62, 88.23], '6M': [83.47, 97.67, 115.77, 104.78, 104.55, 102.12, 83.03, 85.82, 92.68, 87.53, 95.7, 86.98, 82.87, 92.57, 88.57, 80.01, 71.88, 63.87, 72.96, 88.1, 129.6, 107.73, 87.32, 85.43, 65.62, 88.23], '1Y': [45.71, 43.97, 57.45, 60.06, 53.17, 47.71, 48.5, 45.08, 48.25, 41.86, 38.37, 41.44, 49.39, 66.16, 86.79, 89.5, 71.72, 76.68, 65.28, 61.44, 58.01, 55.52, 72.65, 84.75, 65.93, 71.95, 90.92, 98.39, 112.44, 111.34, 115.76, 96.27, 83.03, 85.82, 92.68, 87.53, 95.7, 86.98, 82.87, 96.46, 86.91, 84.66, 69.85, 70.68, 74.81, 88.1, 129.6, 107.73, 87.32, 85.43, 65.62, 88.23] },
      velocityScore: { '1D': 0, '1W': -20.3, '1M': -42.2, '6M': null }, isNew: false,
      marketCap: '$34B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.28, MEME: 5.72, RKNG: false },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'LITE', name: 'LITE', easyScore: 2, avgWeight: 3.81, proScore: 2.54, coverage: 0.667,
      price: 787.84, weeklyPrices: [816.98, 851.40, 858.06, 801.16, 787.84], weeklyChange: -3.57, dayChange: -1.66, sortRank: 0, periodReturns: { '1M': -23.4, 'YTD': 113.7, '6M': 104, '1Y': 763.5 },
      priceHistory: { '1D': [801.16, 789, 787.84], '1W': [816.98, 851.4, 858.06, 801.16, 787.84], '1M': [1029.15, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 869.98, 850, 893.93, 827.92, 842.53, 861.97, 816.98, 851.4, 858.06, 801.16, 787.84], 'YTD': [368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 890.09, 902.31, 938, 853.26, 869.98, 861.97, 787.84], '6M': [386.11, 351.42, 324.25, 332.45, 423.42, 577.15, 600.42, 688.27, 694.43, 672, 649.56, 801.99, 702.76, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 890.09, 902.31, 938, 853.26, 869.98, 861.97, 787.84], '1Y': [91.24, 92.62, 102.64, 102.85, 110.08, 111.13, 114.62, 115.89, 125.84, 141.91, 164.88, 171.5, 159.11, 169.75, 159.76, 163.23, 168.5, 200.13, 239.68, 226.86, 268.92, 308.28, 327.85, 372.09, 337.13, 390.77, 357.05, 339.87, 356.83, 370.66, 435.1, 561.13, 600.42, 688.27, 694.43, 672, 649.56, 801.99, 702.76, 896.02, 824.01, 873.6, 858.32, 944.28, 1030.37, 890.09, 902.31, 938, 853.26, 869.98, 861.97, 787.84] },
      velocityScore: { '1D': -1.2, '1W': -18.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$61B', pe: 138.5, revenueGrowth: 90, eps: 5.69, grossMargin: 41, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.59, RKNG: 3.04 },
      tonyNote: 'LITE appears in 2 of 3 Meme ETFs (67% coverage) with average weight 3.8% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 2, avgWeight: 3.6, proScore: 2.4, coverage: 0.667,
      price: 43.12, weeklyPrices: [47.21, 45.91, 45.73, 43.32, 43.12], weeklyChange: -8.66, dayChange: -0.46, sortRank: 0, periodReturns: { '1M': -35.3, 'YTD': 14.2, '6M': 1, '1Y': 175.4 },
      priceHistory: { '1D': [43.32, 42.96, 43.25, 43.12], '1W': [47.21, 45.91, 45.73, 43.32, 43.12], '1M': [66.6, 65.48, 61.86, 54.35, 59.19, 54.02, 51.52, 56.71, 59.77, 60.85, 58.11, 59.96, 56.87, 54.72, 50.3, 47.74, 47.21, 45.91, 45.73, 43.32, 43.12], 'YTD': [37.77, 45.68, 51.89, 56.68, 53.74, 41.83, 42.22, 42.36, 41.39, 38.84, 44.94, 42.16, 31.62, 35.74, 47.37, 45.17, 44.44, 54.74, 56.56, 47.74, 67.84, 65.48, 51.52, 58.11, 47.74, 43.12], '6M': [42.7, 46.03, 57.82, 52.36, 53.08, 46.15, 40.97, 45.45, 38.85, 38.12, 42.96, 41.12, 34.28, 35.74, 47.37, 45.17, 44.44, 54.74, 56.56, 47.74, 67.84, 65.48, 51.52, 58.11, 47.74, 43.12], '1Y': [15.66, 17.03, 18.05, 18.14, 16.11, 18.57, 19.08, 19.76, 22.35, 26.13, 32.85, 36.32, 46.29, 47.02, 63.85, 61.83, 55.86, 58.22, 66.96, 48.65, 45.83, 48.45, 46.45, 43.94, 35.8, 40.3, 48.24, 50.33, 54.26, 59.99, 54.39, 42.93, 40.97, 45.45, 38.85, 38.12, 42.96, 41.12, 34.28, 36.83, 48.82, 48.39, 42.86, 60.98, 55.17, 47.74, 67.84, 65.48, 51.52, 58.11, 47.74, 43.12] },
      velocityScore: { '1D': -2, '1W': -39.1, '1M': -40.9, '6M': null }, isNew: false,
      marketCap: '$15B', pe: 56, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 2.59, MEME: 4.61, RKNG: false },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'AMD', name: 'AMD', easyScore: 2, avgWeight: 3.44, proScore: 2.3, coverage: 0.667,
      price: 537, weeklyPrices: [521.58, 539.49, 580.91, 540.88, 537.00], weeklyChange: 2.96, dayChange: -0.72, sortRank: 0, periodReturns: { '1M': 3, 'YTD': 150.7, '6M': 140.3, '1Y': 287.7 },
      priceHistory: { '1D': [540.88, 534.8, 537], '1W': [521.58, 539.49, 580.91, 540.88, 537], '1M': [521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 537], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 542.52, 452.4, 512.48, 532.57, 537], '6M': [223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 542.52, 452.4, 512.48, 532.57, 537], '1Y': [138.52, 144.16, 160.41, 162.12, 176.31, 172.4, 180.95, 165.2, 167.13, 161.79, 155.67, 157.92, 161.27, 169.73, 232.89, 234.56, 234.99, 254.84, 237.7, 247.96, 223.55, 214.24, 215.98, 221.43, 201.06, 214.99, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 203.08, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 414.05, 495.54, 542.52, 452.4, 512.48, 532.57, 537] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$876B', pe: 180.8, revenueGrowth: 38, eps: 2.97, grossMargin: 53, dividendYield: null,
      etfPresence: { BUZZ: 3.32, MEME: false, RKNG: 3.57 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab', easyScore: 2, avgWeight: 3.25, proScore: 2.17, coverage: 0.667,
      price: 103.78, weeklyPrices: [84.54, 98.01, 101.65, 100.07, 103.78], weeklyChange: 22.75, dayChange: 3.7, sortRank: 0, periodReturns: { '1M': -15.8, 'YTD': 48.8, '6M': 36.6, '1Y': 190.8 },
      priceHistory: { '1D': [100.07, 104.13, 103.5, 103.78], '1W': [84.54, 98.01, 101.65, 100.07, 103.78], '1M': [123.32, 114.7, 119.95, 110.08, 113.65, 108.23, 105.05, 114.78, 102.39, 109.25, 107.98, 107.24, 100.29, 95.12, 85.41, 80.69, 84.54, 98.01, 101.65, 100.07, 103.78], 'YTD': [69.76, 83.08, 90.76, 88.9, 80.07, 72.32, 67.44, 70.21, 70.97, 71.48, 71.31, 68, 57.38, 66.32, 72.22, 86.64, 78.59, 78.76, 117.56, 127.31, 150.23, 114.7, 105.05, 107.98, 80.69, 103.78], '6M': [75.99, 84.85, 96.3, 80.48, 74.15, 75.84, 69.89, 69.97, 70.13, 68.93, 78.59, 66.07, 64.22, 66.32, 72.22, 86.64, 78.59, 78.76, 117.56, 127.31, 150.23, 114.7, 105.05, 107.98, 80.69, 103.78], '1Y': [35.68, 39.1, 51.33, 48.13, 45.92, 44.21, 42.81, 40.69, 46.25, 42.99, 48.43, 47.18, 46.63, 52.47, 66.42, 67, 63.57, 60.92, 49.61, 45.25, 43.62, 41.93, 49.37, 63.53, 59.92, 70.65, 78.14, 87.9, 89.16, 87, 81.27, 72.03, 69.89, 69.97, 70.13, 68.93, 78.59, 66.07, 64.22, 69.08, 73.6, 90.04, 77.02, 84.65, 124.15, 127.31, 150.23, 114.7, 105.05, 107.98, 80.69, 103.78] },
      velocityScore: { '1D': 0.9, '1W': 28.4, '1M': -47.6, '6M': null }, isNew: false,
      marketCap: '$65B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 1.63, MEME: 4.88, RKNG: false },
      tonyNote: 'Rocket Lab is the small-launch and space systems name that Electrification and AI infrastructure ETFs hold for satellite connectivity exposure — relevant to both GPS-dependent grids and low-orbit broadband that supports remote AI compute. Small market cap, no earnings, but consistent revenue growth and a rapidly expanding backlog.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 1, avgWeight: 9.35, proScore: 3.12, coverage: 0.333,
      price: 135.49, weeklyPrices: [135.69, 150.10, 148.16, 139.00, 135.49], weeklyChange: -0.15, dayChange: -2.53, sortRank: 0, periodReturns: { '1M': -33.1, 'YTD': 288.7, '6M': 242.1, '1Y': 407.6 },
      priceHistory: { '1D': [139, 136.43, 136.64, 135.49], '1W': [135.69, 150.1, 148.16, 139, 135.49], '1M': [202.37, 184.07, 202.89, 177, 196.64, 162.88, 175.13, 172.78, 169.05, 191.55, 167.34, 161.85, 171.23, 147.44, 146.97, 138.54, 135.69, 150.1, 148.16, 139, 135.49], 'YTD': [34.86, 33.01, 37, 35.72, 43.61, 44.3, 44.46, 53.96, 102.51, 110.62, 94.07, 95.76, 85.19, 117.64, 146.39, 150.57, 137.26, 180.57, 188.28, 171.33, 179.83, 184.07, 175.13, 167.34, 138.54, 135.49], '6M': [39.6, 34.04, 37.04, 34.89, 44.16, 47.91, 43.91, 56.27, 95.34, 120.49, 86.33, 113.9, 84.59, 117.64, 146.39, 150.57, 137.26, 180.57, 188.28, 171.33, 179.83, 184.07, 175.13, 167.34, 138.54, 135.49], '1Y': [26.69, 28.25, 29.42, 25.84, 22.87, 22.33, 21.01, 21.93, 24.05, 23.32, 26.85, 29.04, 26.34, 27.98, 32.37, 31.14, 31.4, 35.07, 29.1, 20.91, 20.87, 25.57, 26.24, 36.32, 29.25, 37.17, 34.99, 33.72, 39.26, 37.39, 46.12, 48.49, 43.91, 56.27, 95.34, 120.49, 86.33, 113.9, 84.59, 132.7, 142.55, 149.42, 152.83, 178.54, 223.1, 171.33, 179.83, 184.07, 175.13, 167.34, 138.54, 135.49] },
      velocityScore: { '1D': -3.7, '1W': -19.6, '1M': -28.4, '6M': null }, isNew: false,
      marketCap: '$11B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 9.35, RKNG: false },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'QBTS', name: 'D-Wave Quantum', easyScore: 1, avgWeight: 5.11, proScore: 1.7, coverage: 0.333,
      price: 23.82, weeklyPrices: [22.76, 23.83, 23.99, 23.50, 23.82], weeklyChange: 4.66, dayChange: 1.32, sortRank: 0, periodReturns: { '1M': -20.4, 'YTD': -8.9, '6M': -15.3, '1Y': 49.1 },
      priceHistory: { '1D': [23.51, 23.76, 23.77, 23.82], '1W': [22.76, 23.83, 23.99, 23.5, 23.82], '1M': [29.91, 27.55, 27.64, 23.85, 25.83, 23.52, 23.25, 23.82, 23.37, 26.26, 22.92, 24.69, 24.47, 25.03, 22.98, 21.91, 22.76, 23.83, 23.99, 23.5, 23.82], 'YTD': [26.15, 29.28, 28.72, 25.63, 21.22, 20.72, 19.67, 18.05, 18.94, 19.04, 17.46, 16.31, 12.98, 13.74, 16.97, 20.36, 18.11, 21.54, 22.35, 18.19, 27.48, 27.55, 23.25, 22.92, 21.91, 23.82], '6M': [28.13, 28.11, 28.83, 23.75, 20.97, 21.21, 18.44, 18.66, 18.24, 18.76, 17.47, 15.93, 14.43, 13.74, 16.97, 20.36, 18.11, 21.54, 22.35, 18.19, 27.48, 27.55, 23.25, 22.92, 21.91, 23.82], '1Y': [15.98, 16.01, 19.24, 19.76, 17.19, 17.17, 18.18, 15.06, 15.23, 15.29, 16.52, 24.02, 26.34, 29.21, 35.07, 40.46, 31.06, 36.11, 28.39, 23.39, 23.44, 22.41, 28.73, 27.98, 24.89, 25.29, 30.64, 28.8, 27.04, 24.69, 21.4, 20.44, 18.44, 18.66, 18.24, 18.76, 17.47, 15.93, 14.43, 14.57, 20.81, 21.24, 18.27, 23.83, 21.44, 18.19, 27.48, 27.55, 23.25, 22.92, 21.91, 23.82] },
      velocityScore: { '1D': -2.3, '1W': -13.3, '1M': -48.3, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: -81, eps: -1.14, grossMargin: 66, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.11, RKNG: false },
      tonyNote: 'D-Wave Quantum is a quantum computing company — the only publicly traded business built around quantum annealing hardware. Revenue is minimal and profitability is many years away, but it holds a position in Meme ETFs as the purest-play quantum computing stock available to retail investors. The ETF weight is small and the position is purely thematic.',
    },
    {
      ticker: 'COHR', name: 'COHR', easyScore: 1, avgWeight: 4.82, proScore: 1.61, coverage: 0.333,
      price: 359.99, weeklyPrices: [380.56, 391.22, 394.47, 368.65, 359.99], weeklyChange: -5.41, dayChange: -2.36, sortRank: 0, periodReturns: { '1M': -15.7, 'YTD': 95, '6M': 85.2, '1Y': 307.4 },
      priceHistory: { '1D': [368.67, 359.33, 362, 359.99], '1W': [380.56, 391.22, 394.47, 368.65, 359.99], '1M': [426.89, 417.43, 421.9, 376.99, 401.93, 355.94, 354.77, 363.58, 385.03, 413.84, 378.85, 389.57, 425.48, 381.22, 392.5, 407.25, 380.56, 391.22, 394.47, 368.65, 359.99], 'YTD': [184.57, 173.15, 195.96, 196.94, 212.18, 227.68, 217.23, 248.89, 298.91, 252.32, 247.37, 255.05, 219.65, 255.1, 313.42, 343.79, 303.97, 335.73, 374.01, 353.63, 380.18, 417.43, 354.77, 378.85, 407.25, 359.99], '6M': [194.33, 178.06, 191.04, 197.76, 222.44, 242.46, 219.96, 254.86, 280.81, 260.64, 245.8, 272.33, 238.21, 255.1, 313.42, 343.79, 303.97, 335.73, 374.01, 353.63, 380.18, 417.43, 354.77, 378.85, 407.25, 359.99], '1Y': [88.36, 93.72, 100.28, 98.72, 107.6, 113.82, 91.65, 86.55, 90.71, 95.62, 103.51, 108.05, 106.57, 112.79, 122.35, 115.96, 121.52, 132.71, 159.3, 139.97, 142.94, 154, 177.35, 198.5, 175.71, 191.72, 186.36, 185.18, 193.46, 214, 229.18, 228.37, 219.96, 254.86, 280.81, 260.64, 245.8, 272.33, 238.21, 281.79, 308.2, 350.47, 304.93, 344.67, 403.71, 353.63, 380.18, 417.43, 354.77, 378.85, 407.25, 359.99] },
      velocityScore: { '1D': -1.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$70B', pe: 171.4, revenueGrowth: 21, eps: 2.1, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.82, RKNG: false },
      tonyNote: 'COHR appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 1, avgWeight: 4.63, proScore: 1.54, coverage: 0.333,
      price: 52.24, weeklyPrices: [49.31, 53.88, 53.26, 51.40, 52.24], weeklyChange: 5.95, dayChange: 1.6, sortRank: 0, periodReturns: { '1M': -26.8, 'YTD': 16.4, '6M': 11.7, '1Y': 16.7 },
      priceHistory: { '1D': [51.42, 52.17, 52.28, 52.24], '1W': [49.31, 53.88, 53.26, 51.4, 52.24], '1M': [71.4, 68.23, 65.66, 56.78, 62.8, 56.69, 56.63, 57.99, 57.85, 61.18, 54.69, 56.55, 58.32, 57.85, 53.6, 50.56, 49.31, 53.88, 53.26, 51.4, 52.24], 'YTD': [44.87, 50.45, 47.56, 47.25, 39.98, 34.99, 34.11, 30.78, 38.34, 35.87, 33.29, 33.11, 26.59, 28.49, 35.76, 46.28, 43.08, 48, 55.87, 48.44, 65.4, 68.23, 56.63, 54.69, 50.56, 52.24], '6M': [46.77, 49.45, 50.8, 43.37, 38.56, 35.48, 33.18, 31.62, 37.05, 35.12, 33.31, 32.7, 28.83, 28.49, 35.76, 46.28, 43.08, 48, 55.87, 48.44, 65.4, 68.23, 56.63, 54.69, 50.56, 52.24], '1Y': [44.75, 45.93, 44.84, 43.9, 39.87, 40.49, 41.03, 36.79, 41.42, 42.11, 47.05, 66.81, 69.43, 69.6, 77.5, 65.59, 59.37, 60.17, 57.43, 45.4, 47.88, 46.9, 54.76, 52.55, 46.44, 46, 48.71, 50.95, 50.66, 45.49, 38.47, 35.19, 33.18, 31.62, 37.05, 35.12, 33.31, 32.7, 28.83, 28.99, 43.25, 47.36, 42.11, 52.57, 55.26, 48.44, 65.4, 68.23, 56.63, 54.69, 50.56, 52.24] },
      velocityScore: { '1D': -3.7, '1W': -25.2, '1M': -51, '6M': null }, isNew: false,
      marketCap: '$20B', pe: 134, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.63, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'AXTI', name: 'AXT Inc', easyScore: 1, avgWeight: 4.54, proScore: 1.51, coverage: 0.333,
      price: 64.84, weeklyPrices: [70.15, 71.46, 72.08, 65.03, 64.84], weeklyChange: -7.57, dayChange: -0.29, sortRank: 0, periodReturns: { '1M': -41.5, 'YTD': 296.6, '6M': 286.9, '1Y': 3017.3 },
      priceHistory: { '1D': [65.03, 66.25, 65.17, 64.84], '1W': [70.15, 71.46, 72.08, 65.03, 64.84], '1M': [110.85, 106.7, 105.99, 89.04, 90.78, 78.36, 85.29, 88.34, 97.18, 110.74, 92.11, 84.57, 92.44, 77.91, 70.14, 69.06, 70.15, 71.46, 72.08, 65.03, 64.84], 'YTD': [16.35, 25.83, 25.72, 17.4, 18.54, 24.06, 24.24, 28.43, 46.32, 38.56, 48.39, 64.44, 52.73, 45.46, 67.3, 74.97, 68.71, 107.55, 122.9, 112.88, 122.77, 106.7, 85.29, 92.11, 69.06, 64.84], '6M': [16.76, 22.99, 22.09, 17.8, 20.94, 27.77, 23.21, 35.08, 41.76, 44.3, 44.36, 68.44, 56.98, 45.46, 67.3, 74.97, 68.71, 107.55, 122.9, 112.88, 122.77, 106.7, 85.29, 92.11, 69.06, 64.84], '1Y': [2.08, 2.26, 2.5, 2.37, 2.08, 2.06, 2.16, 2.51, 2.87, 2.96, 3.39, 3.96, 4.75, 4.7, 5.23, 4.93, 5.18, 7.32, 8.87, 10.44, 10.11, 10.45, 12.1, 16.38, 14.01, 15.37, 16.67, 22.24, 21.41, 17.2, 19.74, 24.35, 23.21, 35.08, 41.76, 44.3, 44.36, 68.44, 56.98, 53.18, 62.93, 86.94, 71.07, 104.83, 121.94, 112.88, 122.77, 106.7, 85.29, 92.11, 69.06, 64.84] },
      velocityScore: { '1D': -1.9, '1W': 11, '1M': -39.4, '6M': null }, isNew: false,
      marketCap: '$4B', pe: null, revenueGrowth: 39, eps: -0.32, grossMargin: 21, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.54, RKNG: false },
      tonyNote: 'AXT Inc is a compound semiconductor substrate manufacturer — gallium arsenide, indium phosphide, and germanium wafers used in data center optical transceivers, 5G RF chips, and solar cells. Revenue is growing with optical networking demand. Small market cap but positioned at a genuine supply-chain chokepoint for III-V semiconductor materials.',
    },
    {
      ticker: 'CRWV', name: 'CRWV', easyScore: 1, avgWeight: 4.17, proScore: 1.39, coverage: 0.333,
      price: 86.1, weeklyPrices: [96.58, 95.51, 99.54, 85.68, 86.10], weeklyChange: -10.85, dayChange: 0.48, sortRank: 0, periodReturns: { '1M': -27.8, 'YTD': 20.2, '6M': 8.5, '1Y': -43.3 },
      priceHistory: { '1D': [85.69, 85.37, 86.56, 86.1], '1W': [96.58, 95.51, 99.54, 85.68, 86.1], '1M': [119.27, 110.93, 108.03, 100.39, 102.37, 98.45, 95.61, 95.74, 100.55, 106.71, 115.21, 117.95, 111.29, 105.72, 100.88, 98.76, 96.58, 95.51, 99.54, 85.68, 86.1], 'YTD': [71.61, 77.09, 95.01, 92.98, 93.19, 89.95, 96.04, 90.84, 78.05, 74.41, 85.86, 81.96, 69.15, 85.24, 117.2, 115.16, 105.53, 127.89, 107.75, 99.81, 104.27, 110.93, 95.61, 115.21, 98.76, 86.1], '6M': [79.32, 80.14, 101.23, 98.31, 88.94, 96.79, 91, 99.3, 73.78, 74.92, 82.12, 83.02, 77.47, 85.24, 117.2, 115.16, 105.53, 127.89, 107.75, 99.81, 104.27, 110.93, 95.61, 115.21, 98.76, 86.1], '1Y': [151.77, 138.29, 132.21, 120, 114.13, 121.08, 99.5, 91.52, 96.93, 87.48, 112.69, 121.39, 126.66, 138, 143.08, 141.74, 123.34, 131.06, 106.93, 78.34, 74.92, 74.29, 85.75, 87.38, 67.68, 76.42, 76.86, 89.93, 95.22, 108.86, 90.06, 95.11, 91, 99.3, 73.78, 74.92, 82.12, 83.02, 77.47, 88.9, 118.69, 122.54, 114.19, 137.98, 111.31, 99.81, 104.27, 110.93, 95.61, 115.21, 98.76, 86.1] },
      velocityScore: { '1D': 1.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$47B', pe: null, revenueGrowth: 112, eps: -2.72, grossMargin: 69, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.17, RKNG: false },
      tonyNote: 'CRWV appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ALAB', name: 'ALAB', easyScore: 1, avgWeight: 4.01, proScore: 1.34, coverage: 0.333,
      price: 426.01, weeklyPrices: [391.74, 455.96, 483.02, 430.86, 426.01], weeklyChange: 8.75, dayChange: -1.12, sortRank: 0, periodReturns: { '1M': 19.7, 'YTD': 156.1, '6M': 137.3, '1Y': 381 },
      priceHistory: { '1D': [430.86, 421.39, 426.01], '1W': [391.74, 455.96, 483.02, 430.86, 426.01], '1M': [355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86, 426.01], 'YTD': [166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 325.33, 363.54, 330.86, 374.68, 398, 426.01], '6M': [179.56, 162.61, 182, 163.25, 152.44, 187.67, 123.69, 128.4, 109.8, 116.48, 127.57, 121.76, 109.6, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 325.33, 363.54, 330.86, 374.68, 398, 426.01], '1Y': [88.57, 97.02, 97.95, 121.68, 136.73, 170.89, 190.69, 172.45, 179.2, 187.95, 232.9, 251.88, 200.64, 209.6, 225.43, 163.55, 163.64, 169.55, 162.83, 144.47, 142.01, 154.22, 152.51, 173.7, 145.88, 167.26, 167.11, 172.57, 183.75, 170.93, 158.52, 182.86, 123.69, 128.4, 109.8, 116.48, 127.57, 121.76, 109.6, 125.46, 172.09, 194.06, 196.85, 213.91, 224.09, 244.26, 325.33, 363.54, 330.86, 374.68, 398, 426.01] },
      velocityScore: { '1D': 3.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$73B', pe: 291.8, revenueGrowth: 93, eps: 1.46, grossMargin: 76, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.01, RKNG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'WEN', name: 'WEN', easyScore: 1, avgWeight: 3.77, proScore: 1.26, coverage: 0.333,
      price: 9.13, weeklyPrices: [7.80, 8.26, 8.29, 8.94, 9.13], weeklyChange: 17.05, dayChange: 2.13, sortRank: 0, periodReturns: { '1M': 26.6, 'YTD': 9.6, '6M': 11.8, '1Y': -21.7 },
      priceHistory: { '1D': [8.94, 9.16, 9.07, 9.13], '1W': [7.8, 8.26, 8.29, 8.94, 9.13], '1M': [7.21, 6.85, 6.75, 6.71, 6.74, 6.71, 6.63, 6.79, 6.79, 6.91, 6.95, 6.8, 6.17, 6.26, 7.86, 7.33, 7.8, 8.26, 8.29, 8.94, 9.13], 'YTD': [8.33, 8.38, 8.54, 8.42, 7.79, 8.02, 7.48, 7.77, 7.44, 7.27, 7.04, 7.16, 6.78, 6.89, 6.78, 7.11, 6.81, 6.61, 7.9, 8.12, 7.49, 6.85, 6.63, 6.95, 7.33, 9.13], '6M': [8.17, 8.65, 8.32, 8.08, 7.69, 7.81, 7, 7.73, 7.51, 6.98, 7.01, 7.1, 6.95, 6.89, 6.78, 7.11, 6.81, 6.61, 7.9, 8.12, 7.49, 6.85, 6.63, 6.95, 7.33, 9.13], '1Y': [11.66, 11.29, 10.57, 10.67, 9.85, 9.96, 10.55, 10.27, 10.46, 10.17, 9.89, 9.52, 9.16, 9.41, 8.83, 8.88, 9.02, 8.51, 8.83, 8.71, 8.12, 8.53, 8.54, 8.49, 8.44, 8.35, 8.11, 8.5, 8.17, 7.98, 7.78, 7.82, 7, 7.73, 7.51, 6.98, 7.01, 7.1, 6.95, 7.06, 6.9, 7.1, 6.76, 6.65, 8.19, 8.12, 7.49, 6.85, 6.63, 6.95, 7.33, 9.13] },
      velocityScore: { '1D': -1.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2B', pe: 11.9, revenueGrowth: 3, eps: 0.77, grossMargin: 34, dividendYield: 6.26,
      etfPresence: { BUZZ: false, MEME: 3.77, RKNG: false },
      tonyNote: 'WEN appears in 1 of 3 Meme ETFs (33% coverage) with average weight 3.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IBRX', name: 'IBRX', easyScore: 1, avgWeight: 3.76, proScore: 1.25, coverage: 0.333,
      price: 9.15, weeklyPrices: [8.71, 8.77, 8.76, 9.20, 9.15], weeklyChange: 5.05, dayChange: -0.54, sortRank: 0, periodReturns: { '1M': 26.6, 'YTD': 362.1, '6M': 353, '1Y': 246.6 },
      priceHistory: { '1D': [9.2, 9.16, 9.17, 9.15], '1W': [8.71, 8.77, 8.76, 9.2, 9.15], '1M': [7.23, 7.18, 7.29, 6.92, 7.17, 7.25, 6.98, 7.2, 7.1, 7.13, 6.99, 7.36, 7.22, 7.32, 7.8, 7.79, 8.71, 8.77, 8.76, 9.2, 9.15], 'YTD': [1.98, 2.24, 3.95, 6.45, 6.25, 6.05, 5.95, 9.83, 10.44, 8.45, 8.21, 9.4, 6.66, 6.86, 7.6, 8.1, 6.96, 7.58, 8.12, 7.76, 7.89, 7.18, 6.98, 6.99, 7.79, 9.15], '6M': [2.02, 2.33, 5.52, 6.21, 6.13, 6.93, 6.02, 11.55, 10, 8.01, 8.21, 7.41, 7.67, 6.86, 7.6, 8.1, 6.96, 7.58, 8.12, 7.76, 7.89, 7.18, 6.98, 6.99, 7.79, 9.15], '1Y': [2.64, 2.87, 2.83, 3.01, 2.46, 2.4, 2.71, 2.26, 2.34, 2.39, 2.59, 2.85, 2.46, 2.5, 2.44, 2.53, 2.39, 2.36, 2.12, 2, 2.14, 2.13, 2.3, 2.19, 2.09, 2.14, 2.08, 2.59, 6.48, 5.95, 6.33, 6.56, 6.02, 11.55, 10, 8.01, 8.21, 7.41, 7.67, 6.98, 7.78, 8.07, 6.96, 8.38, 8.15, 7.76, 7.89, 7.18, 6.98, 6.99, 7.79, 9.15] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: null, revenueGrowth: 168, eps: -0.85, grossMargin: 99, dividendYield: null,
      etfPresence: { BUZZ: 3.76, MEME: false, RKNG: false },
      tonyNote: 'IBRX appears in 1 of 3 Meme ETFs (33% coverage) with average weight 3.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
