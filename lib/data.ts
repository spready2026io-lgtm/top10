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
export const SPY_RET: Record<Period, number> = { '1W': -2.1, '1M': -1.5, 'YTD': 7.7, '6M': 6.8, '1Y': 22.4 };
// @@END_GENERATED:SPY_RET@@

// Top holdings per ETF (ticker + portfolio weight %), shown on ETF row hover.
export type EtfHolding = { t: string; w: number };

// @@GENERATED:ETF_TOP_HOLDINGS@@
export const ETF_TOP_HOLDINGS: Record<string, EtfHolding[]> = {
  AIS: [{ t: 'MU', w: 8.1 }, { t: 'AMD', w: 4.4 }, { t: 'MRVL', w: 4.4 }, { t: 'SIMO', w: 3.7 }, { t: 'VRT', w: 3.6 }],
  ARTY: [{ t: 'MU', w: 5.5 }, { t: 'AMD', w: 4.8 }, { t: 'CRWV', w: 4.6 }, { t: 'MRVL', w: 4.5 }, { t: 'NVDA', w: 4.4 }],
  BAI: [{ t: 'MU', w: 6.7 }, { t: 'LRCX', w: 4.8 }, { t: 'AMD', w: 4.7 }, { t: 'TSM', w: 4.3 }, { t: 'AVGO', w: 4.0 }],
  IGPT: [{ t: 'MU', w: 9.3 }, { t: 'AMD', w: 8.6 }, { t: 'NVDA', w: 7.8 }, { t: 'META', w: 7.6 }, { t: 'GOOGL', w: 7.5 }],
  IVES: [{ t: 'MU', w: 7.4 }, { t: 'TSM', w: 5.5 }, { t: 'AMD', w: 5.4 }, { t: 'NVDA', w: 4.8 }, { t: 'AAPL', w: 4.7 }],
  ALAI: [{ t: 'NVDA', w: 12.7 }, { t: 'TSM', w: 5.8 }, { t: 'AMZN', w: 5.3 }, { t: 'WDC', w: 4.7 }, { t: 'MSFT', w: 4.7 }],
  CHAT: [{ t: 'NVDA', w: 6.2 }, { t: 'GOOGL', w: 4.7 }, { t: 'MU', w: 4.3 }, { t: 'AMD', w: 3.9 }, { t: 'AVGO', w: 3.9 }],
  AIFD: [{ t: 'MU', w: 7.1 }, { t: 'MRVL', w: 6.5 }, { t: 'NVDA', w: 6.4 }, { t: 'DOCN', w: 5.7 }, { t: 'LITE', w: 5.6 }],
  SPRX: [{ t: 'ARM', w: 9.0 }, { t: 'ALAB', w: 8.5 }, { t: 'COHR', w: 8.3 }, { t: 'KLAC', w: 7.6 }, { t: 'MKSI', w: 6.2 }],
  AOTG: [{ t: 'AMD', w: 16.2 }, { t: 'MU', w: 11.2 }, { t: 'NVDA', w: 10.5 }, { t: 'TSM', w: 7.5 }, { t: 'TOST', w: 4.4 }],
  SOXX: [{ t: 'MU', w: 8.8 }, { t: 'AMD', w: 7.5 }, { t: 'NVDA', w: 6.9 }, { t: 'INTC', w: 6.3 }, { t: 'AVGO', w: 6.2 }],
  PSI: [{ t: 'AMAT', w: 6.2 }, { t: 'MU', w: 5.9 }, { t: 'KLAC', w: 5.9 }, { t: 'LRCX', w: 5.6 }, { t: 'INTC', w: 5.0 }],
  XSD: [{ t: 'ALGM', w: 2.8 }, { t: 'MU', w: 2.8 }, { t: 'TE', w: 2.7 }, { t: 'MXL', w: 2.7 }, { t: 'ALAB', w: 2.7 }],
  DRAM: [{ t: 'SNDK', w: 5.5 }, { t: 'MU', w: 5.2 }, { t: 'STX', w: 4.2 }, { t: 'WDC', w: 4.1 }],
  PTF: [{ t: 'SNDK', w: 9.5 }, { t: 'WDC', w: 5.9 }, { t: 'MU', w: 5.5 }, { t: 'STX', w: 5.4 }, { t: 'NVDA', w: 4.1 }],
  WCLD: [{ t: 'DOCN', w: 3.9 }, { t: 'FROG', w: 3.2 }, { t: 'PANW', w: 2.8 }, { t: 'CRWD', w: 2.5 }, { t: 'TWLO', w: 2.4 }],
  IGV: [{ t: 'PANW', w: 9.0 }, { t: 'MSFT', w: 8.2 }, { t: 'PLTR', w: 8.2 }, { t: 'ORCL', w: 7.7 }, { t: 'CRWD', w: 6.7 }],
  FDTX: [{ t: 'MU', w: 9.4 }, { t: 'MRVL', w: 8.1 }, { t: 'TSM', w: 6.0 }, { t: 'NVDA', w: 4.6 }, { t: 'STX', w: 4.0 }],
  GTEK: [{ t: 'MRVL', w: 4.8 }, { t: 'DELL', w: 2.9 }, { t: 'CDNS', w: 2.4 }, { t: 'APH', w: 2.3 }, { t: 'TER', w: 2.0 }],
  ARKK: [{ t: 'TSLA', w: 9.9 }, { t: 'CRSP', w: 5.0 }, { t: 'HOOD', w: 4.9 }, { t: 'AMD', w: 4.8 }, { t: 'TEM', w: 4.7 }],
  MARS: [{ t: 'SPCX', w: 21.5 }, { t: 'RKLB', w: 10.5 }, { t: 'ASTS', w: 6.8 }, { t: 'PL', w: 4.6 }, { t: 'GSAT', w: 4.4 }],
  FRWD: [{ t: 'STX', w: 8.6 }, { t: 'NVDA', w: 8.2 }, { t: 'AMD', w: 7.1 }, { t: 'TSM', w: 5.9 }, { t: 'WDC', w: 5.9 }],
  BCTK: [{ t: 'SPCX', w: 9.7 }, { t: 'TSM', w: 8.4 }, { t: 'LRCX', w: 7.7 }, { t: 'AVGO', w: 6.8 }, { t: 'NVDA', w: 5.8 }],
  FWD: [{ t: 'AMD', w: 2.1 }, { t: 'AMAT', w: 2.0 }, { t: 'LRCX', w: 2.0 }, { t: 'SPCX', w: 2.0 }, { t: 'GOOGL', w: 1.9 }],
  CBSE: [{ t: 'BFLY', w: 3.9 }, { t: 'LRCX', w: 3.0 }, { t: 'TXG', w: 3.0 }, { t: 'KLAC', w: 2.9 }, { t: 'KRYS', w: 2.9 }],
  FCUS: [{ t: 'WDC', w: 5.5 }, { t: 'SNDK', w: 5.3 }, { t: 'INTC', w: 5.2 }, { t: 'BE', w: 5.0 }, { t: 'STX', w: 4.9 }],
  WGMI: [{ t: 'CIFR', w: 18.0 }, { t: 'IREN', w: 12.0 }, { t: 'WULF', w: 9.7 }, { t: 'CORZ', w: 7.3 }, { t: 'KEEL', w: 7.3 }],
  CNEQ: [{ t: 'NVDA', w: 13.7 }, { t: 'MSFT', w: 6.1 }, { t: 'TSM', w: 6.0 }, { t: 'WDC', w: 6.0 }, { t: 'NBIS', w: 5.8 }],
  SGRT: [{ t: 'WDC', w: 10.2 }, { t: 'MU', w: 8.1 }, { t: 'LITE', w: 7.8 }, { t: 'NVDA', w: 6.4 }, { t: 'ARW', w: 4.8 }],
  SPMO: [{ t: 'MU', w: 11.8 }, { t: 'NVDA', w: 7.9 }, { t: 'AVGO', w: 6.6 }, { t: 'GOOGL', w: 4.4 }, { t: 'LRCX', w: 4.1 }],
  XMMO: [{ t: 'CW', w: 3.9 }, { t: 'FLEX', w: 3.9 }, { t: 'STRL', w: 3.4 }, { t: 'TTMI', w: 3.3 }, { t: 'ATI', w: 3.2 }],
  POW: [{ t: 'POWL', w: 6.5 }, { t: 'VICR', w: 5.7 }, { t: 'PWR', w: 4.6 }, { t: 'ETN', w: 4.1 }, { t: 'NVT', w: 4.0 }],
  VOLT: [{ t: 'BELFB', w: 7.6 }, { t: 'POWL', w: 7.4 }, { t: 'ETN', w: 5.4 }, { t: 'PWR', w: 5.4 }, { t: 'NEE', w: 4.7 }],
  PBD: [{ t: 'ALFEN', w: 1.1 }, { t: 'SHLS', w: 1.1 }],
  PBW: [{ t: 'HYLN', w: 4.4 }, { t: 'FCEL', w: 4.1 }, { t: 'NVTS', w: 2.9 }, { t: 'BE', w: 2.7 }, { t: 'ASPN', w: 2.2 }],
  IVEP: [{ t: 'BE', w: 6.0 }, { t: 'VRT', w: 4.4 }, { t: 'PWR', w: 4.3 }, { t: 'GEV', w: 4.2 }, { t: 'COHR', w: 4.2 }],
  AIRR: [{ t: 'STRL', w: 6.7 }, { t: 'AGX', w: 4.7 }, { t: 'FIX', w: 4.6 }, { t: 'MTZ', w: 4.1 }, { t: 'CHRW', w: 4.0 }],
  PRN: [{ t: 'TTMI', w: 6.5 }, { t: 'FIX', w: 4.9 }, { t: 'AGX', w: 4.8 }, { t: 'VICR', w: 4.6 }, { t: 'STRL', w: 4.5 }],
  RSHO: [{ t: 'TKR', w: 8.7 }, { t: 'POWL', w: 7.3 }, { t: 'CGNX', w: 7.2 }, { t: 'CAT', w: 6.9 }, { t: 'AIT', w: 6.0 }],
  IDEF: [{ t: 'RTX', w: 8.1 }, { t: 'LMT', w: 6.7 }, { t: 'GD', w: 5.8 }, { t: 'BA', w: 5.1 }, { t: 'NOC', w: 4.8 }],
  BILT: [{ t: 'UNP', w: 5.6 }, { t: 'AENA', w: 4.5 }, { t: 'AEP', w: 4.4 }, { t: 'XEL', w: 4.0 }, { t: 'LNG', w: 3.5 }],
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
  'AI & ML':         { '1W': -0.8, '1M': 5, 'YTD': 47.9, '6M': 45.8, '1Y': 90.3 },
  'Semiconductors':  { '1W': 1.7, '1M': 13.5, 'YTD': 113.3, '6M': 110.1, '1Y': 165.6 },
  'Broad Tech':      { '1W': -1.8, '1M': 1.5, 'YTD': 29.4, '6M': 26, '1Y': 55.9 },
  'Electrification': { '1W': -1, '1M': -3.7, 'YTD': 30.5, '6M': 28.3, '1Y': 58.2 },
  'Industrials':     { '1W': -0.2, '1M': 2.1, 'YTD': 25.4, '6M': 22.4, '1Y': 43.8 },
  'Meme':            { '1W': -0.8, '1M': -4, 'YTD': 26.9, '6M': 21.3, '1Y': 12.9 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, IndexChartByPeriod> = {
  'AI & ML': {
    '1D': { top10: [100, 94.03, 94.92, 95.3, 95.31, 94.81, 94.63, 94.44, 94.05, 94.08, 94.4, 94.9, 94.94, 94.89, 94.68, 94.51, 94.79, 94.72, 94.39, 94.12, 94.11, 93.89, 93.42, 93.52], spy: [100, 98.73, 99.03, 99.26, 99.26, 99.06, 99.01, 98.89, 98.68, 98.74, 98.87, 99.07, 99.05, 99.07, 99.05, 99, 99.12, 99.08, 98.88, 98.84, 98.83, 98.73, 98.57, 98.67], top10Return: -6.1, spyReturn: -1.33, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 100.5, 104.82, 105.64, 99.14], spy: [100, 98.75, 99.52, 99.21, 97.89], top10Return: -0.8, spyReturn: -2.1, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.83, 101.64, 102.58, 105.61, 107.54, 106.51, 104.88, 95.95, 98.95, 96.99, 96.99, 93.94, 98.99, 99.67, 104.88, 101.79, 102.3, 106.7, 107.53, 100.91], spy: [100, 99.98, 100.53, 100.78, 101.06, 101.2, 100.49, 100.87, 98.26, 98.49, 98.2, 98.2, 96.65, 98.29, 98.82, 100.56, 99.97, 98.72, 99.49, 99.17, 97.86], top10Return: 5, spyReturn: -1.5, xLabels: ["May 26", "Jun 2", "Jun 9", "Jun 16", "Jun 23"] },
    'YTD': { top10: [100, 102.26, 103.69, 105.17, 107.24, 97.14, 104.07, 103.31, 104.49, 102.14, 103.25, 102.71, 102.1, 97.05, 106.31, 114.45, 121.34, 119.14, 128.85, 134.58, 132.15, 146.11, 157.1, 141.48, 153.46, 147.87], spy: [100, 101.11, 101.24, 101.04, 101.78, 99.37, 101.47, 100.38, 101.08, 100.47, 99.18, 97, 96.32, 95.37, 99.13, 102.64, 104.3, 104.37, 106.14, 108.25, 108.32, 110.07, 111.39, 108.08, 110.69, 107.71], top10Return: 47.9, spyReturn: 7.7, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 98.43, 100.67, 102.72, 103.47, 102.6, 100.53, 100.37, 102.54, 101.57, 97.33, 98.42, 97.88, 93.55, 98.91, 109, 116.17, 120.87, 123.84, 133.32, 132.87, 138.11, 151.73, 142.27, 151.24, 145.76], spy: [100, 99.12, 100.23, 100.62, 100.18, 100.58, 100.39, 99.03, 100.21, 99.71, 97.74, 96.27, 94.27, 92.17, 95.78, 99.73, 103.02, 103.96, 104.37, 107.22, 107.44, 108.38, 110.26, 107.45, 109.72, 106.77], top10Return: 45.8, spyReturn: 6.8, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 105.7, 105.33, 106.83, 107.74, 111.22, 110.68, 112.94, 114.03, 111.87, 112.07, 117.88, 123, 125.83, 125.35, 129.17, 127.84, 130.01, 136.79, 132.8, 134.39, 124.89, 124.18, 128.49, 132.13, 125.03, 129.67, 127.62, 130.57, 133.34, 134.32, 133.22, 124.24, 130.46, 133.29, 132.07, 126.43, 127.94, 127.25, 121.62, 128.6, 141.87, 151.16, 157.29, 161.13, 173.53, 173.07, 180.1, 197.75, 185.52, 197.38, 190.25], spy: [100, 102.95, 103.36, 103.66, 104.78, 105.85, 104.64, 105.96, 107.19, 107.05, 106.68, 108.36, 109.97, 110.51, 111, 111.49, 110.34, 111.85, 114.48, 112.51, 113.54, 110.92, 111.43, 113.56, 113.81, 113.12, 114.63, 113.62, 114.89, 115.34, 114.84, 115.3, 112.91, 113.52, 114.88, 114.3, 112.04, 110.35, 108.07, 105.66, 109.79, 114.32, 118.09, 119.17, 119.64, 122.91, 123.16, 124.24, 126.39, 123.17, 125.77, 122.39], top10Return: 90.3, spyReturn: 22.4, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Semiconductors': {
    '1D': { top10: [100, 91.48, 92.63, 93.38, 92.88, 91.81, 92.03, 91.64, 91.26, 91.39, 91.69, 92.58, 92.15, 92.03, 91.82, 91.51, 91.94, 91.69, 91.14, 90.97, 91.12, 90.83, 90.24, 90.75], spy: [100, 98.73, 99.03, 99.26, 99.26, 99.06, 99.01, 98.89, 98.68, 98.74, 98.87, 99.07, 99.05, 99.07, 99.05, 99, 99.12, 99.08, 98.88, 98.84, 98.83, 98.73, 98.57, 98.67], top10Return: -9.2, spyReturn: -1.33, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 101.03, 108.61, 112.17, 101.7], spy: [100, 98.75, 99.52, 99.21, 97.89], top10Return: 1.7, spyReturn: -2.1, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.16, 100.27, 99.34, 100.71, 105.58, 106.83, 104.03, 91.76, 97.24, 95.72, 95.72, 92.49, 101.48, 102.93, 109.08, 103.42, 104.56, 112.46, 116.24, 105.22], spy: [100, 99.98, 100.53, 100.78, 101.06, 101.2, 100.49, 100.87, 98.26, 98.49, 98.2, 98.2, 96.65, 98.29, 98.82, 100.56, 99.97, 98.72, 99.49, 99.17, 97.86], top10Return: 13.5, spyReturn: -1.5, xLabels: ["May 26", "Jun 2", "Jun 9", "Jun 16", "Jun 23"] },
    'YTD': { top10: [100, 107.01, 112.38, 119.4, 120.25, 115.11, 124.7, 122.12, 123.71, 121.79, 126.4, 125.82, 136.63, 131, 136.79, 146.44, 157.02, 165.39, 185.89, 195.82, 178.16, 201.62, 209.86, 201.06, 226.06, 213.27], spy: [100, 101.11, 101.24, 101.04, 101.78, 99.37, 101.47, 100.38, 101.08, 100.47, 99.18, 97, 96.32, 95.37, 99.13, 102.64, 104.3, 104.37, 106.14, 108.25, 108.32, 110.07, 111.39, 108.08, 110.69, 107.71], top10Return: 113.3, spyReturn: 7.7, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 99.95, 107.98, 114.71, 115.12, 115, 119.71, 120.4, 122.13, 122.48, 120.18, 122.36, 130.57, 127.97, 128.94, 142.32, 151.54, 167.65, 178.52, 194.36, 179.43, 191.25, 198.59, 200.54, 222.8, 210.15], spy: [100, 99.12, 100.23, 100.62, 100.18, 100.58, 100.39, 99.03, 100.21, 99.71, 97.74, 96.27, 94.27, 92.17, 95.78, 99.73, 103.02, 103.96, 104.37, 107.22, 107.44, 108.38, 110.26, 107.45, 109.72, 106.77], top10Return: 110.1, spyReturn: 6.8, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 105.3, 107.48, 110.43, 110.31, 111, 110.06, 111.89, 115.2, 116.03, 114.6, 117.81, 123.57, 126.9, 127.1, 131.27, 130.59, 134.77, 139.06, 135.92, 144.09, 137.91, 137.12, 148.66, 155.38, 146.48, 152.2, 149.38, 154.39, 158.12, 159.72, 161.12, 160.07, 174.07, 175.38, 174.82, 164.9, 171.93, 174.11, 172.25, 175.52, 182.31, 197.63, 209.37, 213.07, 239.63, 241.79, 250.27, 255.4, 260.45, 284.19, 265.56], spy: [100, 102.95, 103.36, 103.66, 104.78, 105.85, 104.64, 105.96, 107.19, 107.05, 106.68, 108.36, 109.97, 110.51, 111, 111.49, 110.34, 111.85, 114.48, 112.51, 113.54, 110.92, 111.43, 113.56, 113.81, 113.12, 114.63, 113.62, 114.89, 115.34, 114.84, 115.3, 112.91, 113.52, 114.88, 114.3, 112.04, 110.35, 108.07, 105.66, 109.79, 114.32, 118.09, 119.17, 119.64, 122.91, 123.16, 124.24, 126.39, 123.17, 125.77, 122.39], top10Return: 165.6, spyReturn: 22.4, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Broad Tech': {
    '1D': { top10: [100, 96.85, 97.24, 97.75, 97.75, 97.61, 97.37, 97.24, 97.08, 97.04, 97.17, 97.61, 97.65, 97.76, 97.76, 97.73, 97.89, 97.84, 97.44, 97.28, 97.21, 96.99, 96.66, 96.76], spy: [100, 98.73, 99.03, 99.26, 99.26, 99.06, 99.01, 98.89, 98.68, 98.74, 98.87, 99.07, 99.05, 99.07, 99.05, 99, 99.12, 99.08, 98.88, 98.84, 98.83, 98.73, 98.57, 98.67], top10Return: -3.3, spyReturn: -1.33, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 99.62, 101.89, 101.6, 98.22], spy: [100, 98.75, 99.52, 99.21, 97.89], top10Return: -1.8, spyReturn: -2.1, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.93, 101.33, 101.87, 103.55, 104.77, 103.46, 103.06, 95.99, 97.76, 96.03, 96.03, 93.7, 97.78, 98.33, 101.85, 100.17, 99.79, 102.16, 101.93, 98.51], spy: [100, 99.98, 100.53, 100.78, 101.06, 101.2, 100.49, 100.87, 98.26, 98.49, 98.2, 98.2, 96.65, 98.29, 98.82, 100.56, 99.97, 98.72, 99.49, 99.17, 97.86], top10Return: 1.5, spyReturn: -1.5, xLabels: ["May 26", "Jun 2", "Jun 9", "Jun 16", "Jun 23"] },
    'YTD': { top10: [100, 103.06, 104.75, 105, 104.88, 96.41, 102.2, 102.86, 104.65, 103.48, 102.86, 102.24, 101.27, 98.01, 104.96, 110.8, 115.85, 113.75, 121.75, 126.13, 122.09, 130.28, 135.73, 125.66, 133.4, 129.36], spy: [100, 101.11, 101.24, 101.04, 101.78, 99.37, 101.47, 100.38, 101.08, 100.47, 99.18, 97, 96.32, 95.37, 99.13, 102.64, 104.3, 104.37, 106.14, 108.25, 108.32, 110.07, 111.39, 108.08, 110.69, 107.71], top10Return: 29.4, spyReturn: 7.7, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 97.57, 100.79, 102.37, 102.22, 99.54, 98.17, 98.48, 100.59, 101.01, 98.05, 97.88, 96.45, 94.12, 98.53, 105.72, 111.67, 113.47, 116.62, 122.97, 120.78, 123.72, 130.49, 124.33, 130.04, 126.06], spy: [100, 99.12, 100.23, 100.62, 100.18, 100.58, 100.39, 99.03, 100.21, 99.71, 97.74, 96.27, 94.27, 92.17, 95.78, 99.73, 103.02, 103.96, 104.37, 107.22, 107.44, 108.38, 110.26, 107.45, 109.72, 106.77], top10Return: 26, spyReturn: 6.8, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 104.18, 105.11, 105.71, 107.89, 108.4, 107.48, 107.28, 109.76, 108.88, 109.91, 113.03, 117.82, 120.58, 120.65, 124.61, 127.42, 125.73, 129.42, 127.04, 126.97, 117.67, 118.28, 120.41, 123.54, 118.28, 121.26, 118.93, 122.68, 126.13, 126.26, 124.75, 117.83, 122.37, 123.92, 125.18, 121.28, 121.31, 122.61, 121.01, 124.69, 131.43, 136.8, 139.59, 142.78, 148.3, 147.46, 150.82, 159.97, 153.4, 159.2, 155.94], spy: [100, 102.95, 103.36, 103.66, 104.78, 105.85, 104.64, 105.96, 107.19, 107.05, 106.68, 108.36, 109.97, 110.51, 111, 111.49, 110.34, 111.85, 114.48, 112.51, 113.54, 110.92, 111.43, 113.56, 113.81, 113.12, 114.63, 113.62, 114.89, 115.34, 114.84, 115.3, 112.91, 113.52, 114.88, 114.3, 112.04, 110.35, 108.07, 105.66, 109.79, 114.32, 118.09, 119.17, 119.64, 122.91, 123.16, 124.24, 126.39, 123.17, 125.77, 122.39], top10Return: 55.9, spyReturn: 22.4, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Electrification': {
    '1D': { top10: [100, 95.24, 96.5, 97.15, 97.12, 96.64, 96.74, 96.38, 96.15, 96.44, 96.66, 97.08, 96.75, 97.05, 97.02, 96.84, 97.02, 96.76, 96.52, 96.34, 96.61, 96.31, 95.96, 95.87], spy: [100, 98.73, 99.03, 99.26, 99.26, 99.06, 99.01, 98.89, 98.68, 98.74, 98.87, 99.07, 99.05, 99.07, 99.05, 99, 99.12, 99.08, 98.88, 98.84, 98.83, 98.73, 98.57, 98.67], top10Return: -4.2, spyReturn: -1.33, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 99.96, 102.25, 103.33, 99.02], spy: [100, 98.75, 99.52, 99.21, 97.89], top10Return: -1, spyReturn: -2.1, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.17, 99.25, 98.2, 97.87, 99.92, 98.87, 98.79, 92.68, 92.79, 91.7, 91.7, 88.74, 92.36, 93.24, 95.34, 94.37, 94.35, 96.51, 97.56, 93.52], spy: [100, 99.98, 100.53, 100.78, 101.06, 101.2, 100.49, 100.87, 98.26, 98.49, 98.2, 98.2, 96.65, 98.29, 98.82, 100.56, 99.97, 98.72, 99.49, 99.17, 97.86], top10Return: -3.7, spyReturn: -1.5, xLabels: ["May 26", "Jun 2", "Jun 9", "Jun 16", "Jun 23"] },
    'YTD': { top10: [100, 103.61, 107.58, 111.38, 112.77, 109.58, 116.36, 115.08, 118.29, 114.35, 113.79, 113.97, 116.18, 112.71, 117.23, 122.36, 127.54, 127.64, 135.62, 136.19, 129.51, 137.83, 138.83, 128.85, 134.03, 130.53], spy: [100, 101.11, 101.24, 101.04, 101.78, 99.37, 101.47, 100.38, 101.08, 100.47, 99.18, 97, 96.32, 95.37, 99.13, 102.64, 104.3, 104.37, 106.14, 108.25, 108.32, 110.07, 111.39, 108.08, 110.69, 107.71], top10Return: 30.5, spyReturn: 7.7, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 98.69, 102.3, 106.42, 109.12, 108.56, 111.76, 112.06, 114.5, 115.02, 108.22, 110.84, 109.68, 109.61, 111.35, 119.16, 123.32, 126.99, 130.28, 134.42, 130.58, 131.44, 134.38, 127.89, 131.67, 128.25], spy: [100, 99.12, 100.23, 100.62, 100.18, 100.58, 100.39, 99.03, 100.21, 99.71, 97.74, 96.27, 94.27, 92.17, 95.78, 99.73, 103.02, 103.96, 104.37, 107.22, 107.44, 108.38, 110.26, 107.45, 109.72, 106.77], top10Return: 28.3, spyReturn: 6.8, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.84, 105.82, 107.42, 111.4, 109.33, 108.82, 110.7, 112.91, 113.13, 111.93, 112.22, 116.03, 118.87, 119.32, 125.49, 130.33, 129.14, 130.49, 128.16, 133.13, 126.33, 125.43, 129.46, 130.81, 129.26, 131.38, 127.48, 130.99, 135.31, 139.39, 136.32, 135.26, 138.33, 140.41, 141.2, 136.47, 139.68, 139.2, 140.63, 143.95, 151.12, 156.23, 155.21, 158.3, 164.49, 163.23, 165.7, 166.54, 160.05, 162.69, 158.2], spy: [100, 102.95, 103.36, 103.66, 104.78, 105.85, 104.64, 105.96, 107.19, 107.05, 106.68, 108.36, 109.97, 110.51, 111, 111.49, 110.34, 111.85, 114.48, 112.51, 113.54, 110.92, 111.43, 113.56, 113.81, 113.12, 114.63, 113.62, 114.89, 115.34, 114.84, 115.3, 112.91, 113.52, 114.88, 114.3, 112.04, 110.35, 108.07, 105.66, 109.79, 114.32, 118.09, 119.17, 119.64, 122.91, 123.16, 124.24, 126.39, 123.17, 125.77, 122.39], top10Return: 58.2, spyReturn: 22.4, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Industrials': {
    '1D': { top10: [100, 96.86, 97.49, 98, 98.08, 97.93, 98.17, 98.15, 98, 97.95, 98.08, 98.38, 98.36, 98.4, 98.27, 98.39, 98.41, 98.46, 98.55, 98.31, 98.28, 98.08, 97.97, 97.74], spy: [100, 98.73, 99.03, 99.26, 99.26, 99.06, 99.01, 98.89, 98.68, 98.74, 98.87, 99.07, 99.05, 99.07, 99.05, 99, 99.12, 99.08, 98.88, 98.84, 98.83, 98.73, 98.57, 98.67], top10Return: -1.6, spyReturn: -1.33, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 99.72, 100.05, 101.15, 99.81], spy: [100, 98.75, 99.52, 99.21, 97.89], top10Return: -0.2, spyReturn: -2.1, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 100.73, 101.31, 100.49, 98.96, 99.69, 100.01, 100.92, 98.88, 98.05, 98.33, 98.33, 96.7, 98.86, 100.02, 100.05, 100.46, 100.19, 100.54, 101.69, 100.32], spy: [100, 99.98, 100.53, 100.78, 101.06, 101.2, 100.49, 100.87, 98.26, 98.49, 98.2, 98.2, 96.65, 98.29, 98.82, 100.56, 99.97, 98.72, 99.49, 99.17, 97.86], top10Return: 2.1, spyReturn: -1.5, xLabels: ["May 26", "Jun 2", "Jun 9", "Jun 16", "Jun 23"] },
    'YTD': { top10: [100, 105.14, 108.87, 111.3, 111.44, 111.39, 117.09, 118.94, 119.64, 118.02, 113.82, 112.13, 113.4, 110.69, 118.22, 119.72, 120, 119.35, 123.16, 124.58, 119.99, 124.5, 124.22, 122.49, 124.86, 125.37], spy: [100, 101.11, 101.24, 101.04, 101.78, 99.37, 101.47, 100.38, 101.08, 100.47, 99.18, 97, 96.32, 95.37, 99.13, 102.64, 104.3, 104.37, 106.14, 108.25, 108.32, 110.07, 111.39, 108.08, 110.69, 107.71], top10Return: 25.4, spyReturn: 7.7, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 97.92, 102.59, 107.59, 108.12, 107.55, 111.7, 113.4, 117.09, 116.11, 110.94, 108.41, 107.3, 107.06, 110.63, 116.92, 118.11, 118.11, 118.56, 120.91, 119.66, 118.95, 120.31, 119.27, 121.88, 122.37], spy: [100, 99.12, 100.23, 100.62, 100.18, 100.58, 100.39, 99.03, 100.21, 99.71, 97.74, 96.27, 94.27, 92.17, 95.78, 99.73, 103.02, 103.96, 104.37, 107.22, 107.44, 108.38, 110.26, 107.45, 109.72, 106.77], top10Return: 22.4, spyReturn: 6.8, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.84, 103.73, 104.32, 105.04, 106.86, 106.91, 106.71, 107.59, 108.31, 108.17, 108.52, 111.24, 113.16, 113.64, 114.98, 114.51, 115.17, 116.68, 115.18, 115.17, 109.38, 110.09, 111.81, 113.63, 114.22, 117.04, 114.66, 120.96, 126.91, 127.73, 127.44, 128.6, 133.54, 137.28, 134.86, 128.34, 125.95, 125.31, 125.7, 129.54, 136.79, 138.45, 138.71, 138.8, 142.05, 140.04, 139.4, 141.38, 140.07, 143.23, 143.76], spy: [100, 102.95, 103.36, 103.66, 104.78, 105.85, 104.64, 105.96, 107.19, 107.05, 106.68, 108.36, 109.97, 110.51, 111, 111.49, 110.34, 111.85, 114.48, 112.51, 113.54, 110.92, 111.43, 113.56, 113.81, 113.12, 114.63, 113.62, 114.89, 115.34, 114.84, 115.3, 112.91, 113.52, 114.88, 114.3, 112.04, 110.35, 108.07, 105.66, 109.79, 114.32, 118.09, 119.17, 119.64, 122.91, 123.16, 124.24, 126.39, 123.17, 125.77, 122.39], top10Return: 43.8, spyReturn: 22.4, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Meme': {
    '1D': { top10: [100, 96.42, 97.41, 98.48, 98.25, 98.08, 97.33, 97.05, 96.84, 96.61, 96.81, 96.46, 96.85, 97.47, 97.29, 97.08, 97.05, 97.06, 96.69, 96.62, 96.27, 96.06, 95.28, 95.63], spy: [100, 98.73, 99.03, 99.26, 99.26, 99.06, 99.01, 98.89, 98.68, 98.74, 98.87, 99.07, 99.05, 99.07, 99.05, 99, 99.12, 99.08, 98.88, 98.84, 98.83, 98.73, 98.57, 98.67], top10Return: -4.8, spyReturn: -1.33, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 100.64, 104.2, 104.07, 99.19], spy: [100, 98.75, 99.52, 99.21, 97.89], top10Return: -0.8, spyReturn: -2.1, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 101.49, 103.34, 102.02, 102.24, 104.7, 101.07, 101.6, 91.3, 93.63, 90.34, 90.34, 87.84, 93.47, 92.31, 97.44, 93.66, 94.22, 97.55, 97.4, 92.89], spy: [100, 99.98, 100.53, 100.78, 101.06, 101.2, 100.49, 100.87, 98.26, 98.49, 98.2, 98.2, 96.65, 98.29, 98.82, 100.56, 99.97, 98.72, 99.49, 99.17, 97.86], top10Return: -4, spyReturn: -1.5, xLabels: ["May 26", "Jun 2", "Jun 9", "Jun 16", "Jun 23"] },
    'YTD': { top10: [100, 108.03, 108.62, 108.21, 102.68, 89.95, 95.31, 95.05, 96.08, 96.03, 94.53, 90.43, 93.62, 90.16, 98.8, 112.13, 113.88, 110.76, 122.46, 125.5, 122.75, 138.98, 143.41, 122.67, 132.26, 126.87], spy: [100, 101.11, 101.24, 101.04, 101.78, 99.37, 101.47, 100.38, 101.08, 100.47, 99.18, 97, 96.32, 95.37, 99.13, 102.64, 104.3, 104.37, 106.14, 108.25, 108.32, 110.07, 111.39, 108.08, 110.69, 107.71], top10Return: 26.9, spyReturn: 7.7, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 95.91, 100.98, 102.34, 100.09, 94.39, 91.1, 87.92, 89.89, 89.96, 86.58, 84.99, 87.74, 85.7, 91.15, 102.25, 109.89, 109.11, 114.22, 118.16, 120.66, 129.62, 134.45, 120.58, 126.29, 121.26], spy: [100, 99.12, 100.23, 100.62, 100.18, 100.58, 100.39, 99.03, 100.21, 99.71, 97.74, 96.27, 94.27, 92.17, 95.78, 99.73, 103.02, 103.96, 104.37, 107.22, 107.44, 108.38, 110.26, 107.45, 109.72, 106.77], top10Return: 21.3, spyReturn: 6.8, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 103.86, 101.66, 96.92, 97.52, 92.63, 91.84, 90.51, 86.56, 84.63, 85.69, 87.81, 91.36, 91.95, 88.67, 94.07, 93.07, 92.02, 96.48, 94.79, 95.79, 90.94, 88.29, 86.71, 89.28, 87.22, 89.76, 89.56, 92.18, 94.3, 93.88, 92.9, 90.21, 89.33, 89.69, 92.62, 93.21, 100.05, 100.67, 93.68, 94.46, 102.6, 109.26, 111.68, 112.07, 117.79, 118.38, 117.38, 117.99, 115.61, 117.51, 112.87], spy: [100, 102.95, 103.36, 103.66, 104.78, 105.85, 104.64, 105.96, 107.19, 107.05, 106.68, 108.36, 109.97, 110.51, 111, 111.49, 110.34, 111.85, 114.48, 112.51, 113.54, 110.92, 111.43, 113.56, 113.81, 113.12, 114.63, 113.62, 114.89, 115.34, 114.84, 115.3, 112.91, 113.52, 114.88, 114.3, 112.04, 110.35, 108.07, 105.66, 109.79, 114.32, 118.09, 119.17, 119.64, 122.91, 123.16, 124.24, 126.39, 123.17, 125.77, 122.39], top10Return: 12.9, spyReturn: 22.4, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
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
export const SCAN_TIMESTAMP    = '2026-06-23T19:01:59.254Z';
export const SCAN_TIMESTAMP_NY = 'June 23, 2026 at 3:01 PM ET';
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
  { ticker: 'MU', name: `MICRON TECHNOLOGY INC`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 14.86, bestProScore: 6.08, avgProScore: 4.95, price: 1045.15, weeklyChange: 2.39 },
  { ticker: 'NVDA', name: `NVIDIA CORP`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 12.87, bestProScore: 6.23, avgProScore: 4.29, price: 200.55, weeklyChange: -3.31 },
  { ticker: 'AMD', name: `ADVANCED MICRO DEVICES INC`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 10.35, bestProScore: 4.98, avgProScore: 3.45, price: 515.16, weeklyChange: 1.55 },
  { ticker: 'AVGO', name: `BROADCOM INC`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 6.29, bestProScore: 2.76, avgProScore: 2.10, price: 379.98, weeklyChange: 0.87 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 5.16, bestProScore: 3.16, avgProScore: 2.58, price: 294.65, weeklyChange: 0.67 },
  { ticker: 'INTC', name: `INTEL CORPORATION`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.77, bestProScore: 3.48, avgProScore: 2.38, price: 132.47, weeklyChange: 13.17 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.76, bestProScore: 2.96, avgProScore: 2.38, price: 436.72, weeklyChange: 2.56 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.68, bestProScore: 2.74, avgProScore: 2.34, price: 277.81, weeklyChange: -0.31 },
  { ticker: 'WDC', name: `Western Digital Corp`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.15, bestProScore: 2.35, avgProScore: 2.08, price: 664.55, weeklyChange: -2.43 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 3.86, bestProScore: 2.52, avgProScore: 1.93, price: 368.94, weeklyChange: -0.11 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': 2.8, '1M': 12.4, 'YTD': 112.5, '6M': 113.6, '1Y': 203.7 },
  ARTY: { '1W': -1, '1M': 8.1, 'YTD': 54.3, '6M': 53.8, '1Y': 92.8 },
  BAI:  { '1W': -0.2, '1M': 4.4, 'YTD': 49.9, '6M': 47.2, '1Y': 82.8 },
  IGPT: { '1W': 0.2, '1M': 9.1, 'YTD': 68.4, '6M': 68.8, '1Y': 115 },
  IVES: { '1W': -2.9, '1M': -1.7, 'YTD': 15.9, '6M': 13.4, '1Y': 40.2 },
  ALAI: { '1W': -2.8, '1M': 1.7, 'YTD': 22.8, '6M': 20.1, '1Y': 51.5 },
  CHAT: { '1W': 0.6, '1M': 7.1, 'YTD': 63.2, '6M': 58, '1Y': 109.4 },
  AIFD: { '1W': -2.6, '1M': 2, 'YTD': 39.1, '6M': 37.4, '1Y': 78.9 },
  SPRX: { '1W': -1.2, '1M': 3.1, 'YTD': 41.7, '6M': 35.9, '1Y': 96.1 },
  AOTG: { '1W': -1.4, '1M': 3.6, 'YTD': 11.1, '6M': 9.4, '1Y': 32.2 },
  // Semiconductors
  SOXX: { '1W': 1.9, '1M': 12.1, 'YTD': 100, '6M': 97.5, '1Y': 165.9 },
  PSI:  { '1W': 1.6, '1M': 10.1, 'YTD': 114.7, '6M': 109.6, '1Y': 198.7 },
  XSD:  { '1W': 1, '1M': -0.3, 'YTD': 87.2, '6M': 82.3, '1Y': 146.4 },
  DRAM: { '1W': 2.4, '1M': 32, 'YTD': 151.2, '6M': 151.2, '1Y': 151.2 },
  // Broad Tech
  PTF:  { '1W': -1.8, '1M': 4.5, 'YTD': 68.6, '6M': 63.4, '1Y': 95.1 },
  WCLD: { '1W': -3.6, '1M': -3, 'YTD': -16.3, '6M': -17.4, '1Y': -16.8 },
  IGV:  { '1W': -4.4, '1M': -7.1, 'YTD': -17.3, '6M': -19.1, '1Y': -17.9 },
  FDTX: { '1W': -1.5, '1M': 8.6, 'YTD': 35.6, '6M': 34.2, '1Y': 48.8 },
  GTEK: { '1W': 1.4, '1M': 7.4, 'YTD': 51.3, '6M': 51, '1Y': 75.3 },
  ARKK: { '1W': -2.7, '1M': 0.7, 'YTD': 0.1, '6M': -4.4, '1Y': 11.8 },
  MARS: { '1W': -10.4, '1M': -26.5, 'YTD': 22.3, '6M': 22.3, '1Y': 22.3 },
  FRWD: { '1W': -3.1, '1M': 4.8, 'YTD': 30, '6M': 30, '1Y': 30 },
  BCTK: { '1W': -3.3, '1M': 2.1, 'YTD': 21, '6M': 18.7, '1Y': 23.2 },
  FWD:  { '1W': -1.1, '1M': 3.3, 'YTD': 35.4, '6M': 32.9, '1Y': 66.2 },
  CBSE: { '1W': 2, '1M': 2.2, 'YTD': 28.3, '6M': 24.5, '1Y': 42.8 },
  FCUS: { '1W': 0.5, '1M': 1, 'YTD': 42.1, '6M': 33.6, '1Y': 78.4 },
  WGMI: { '1W': 2.1, '1M': 14.2, 'YTD': 84.8, '6M': 70.4, '1Y': 291 },
  CNEQ: { '1W': -3.2, '1M': -0.1, 'YTD': 16.2, '6M': 14, '1Y': 42 },
  SGRT: { '1W': -0.7, '1M': 3.9, 'YTD': 45.2, '6M': 41.2, '1Y': 81.6 },
  SPMO: { '1W': -0.2, '1M': 6.5, 'YTD': 29.4, '6M': 27.6, '1Y': 42.4 },
  XMMO: { '1W': -0.3, '1M': 3, 'YTD': 22.6, '6M': 19.9, '1Y': 34.9 },
  // Electrification
  POW:  { '1W': -2, '1M': -1.6, 'YTD': 54.2, '6M': 52.7, '1Y': 49.7 },
  VOLT: { '1W': 1.5, '1M': 2.7, 'YTD': 40.5, '6M': 38.4, '1Y': 64.2 },
  PBD:  { '1W': -3.4, '1M': -9.9, 'YTD': 21.6, '6M': 20.1, '1Y': 63 },
  PBW:  { '1W': -2.2, '1M': -9, 'YTD': 28.2, '6M': 22, '1Y': 106 },
  IVEP: { '1W': 1.3, '1M': -0.5, 'YTD': 8.1, '6M': 8.1, '1Y': 8.1 },
  // Industrials
  AIRR: { '1W': -0.4, '1M': 3.7, 'YTD': 31.9, '6M': 27.6, '1Y': 63.6 },
  PRN:  { '1W': 2, '1M': 6.9, 'YTD': 45, '6M': 39.3, '1Y': 65.6 },
  RSHO: { '1W': 2.3, '1M': 9.1, 'YTD': 39.4, '6M': 36.7, '1Y': 62.5 },
  IDEF: { '1W': -3.9, '1M': -3.9, 'YTD': 2.4, '6M': 0, '1Y': 15.8 },
  BILT: { '1W': -0.9, '1M': -5.1, 'YTD': 8.1, '6M': 8.3, '1Y': 11.3 },
  // Meme
  BUZZ: { '1W': -2.1, '1M': -2.9, 'YTD': 12.7, '6M': 8.5, '1Y': 28.5 },
  MEME: { '1W': -0.6, '1M': -10.6, 'YTD': 56.9, '6M': 44.4, '1Y': -0.9 },
  RKNG: { '1W': 0.3, '1M': 1.4, 'YTD': 11, '6M': 11, '1Y': 11 },
};
// @@END_GENERATED:ETF_RETURNS@@

// @@GENERATED:ETF_DAY_CHANGE@@
// Today's % move per ETF ticker (1D, vs prior close). Refreshed by the 3×/day
// price jobs. Powers the 1D ranking in the theme-ETF side panel.
export const ETF_DAY_CHANGE: Record<string, number> = {
  AIS:  -9.23,
  ARTY: -6.42,
  BAI:  -7.97,
  IGPT: -7.34,
  IVES: -2.46,
  ALAI: -3.92,
  CHAT: -7.55,
  AIFD: -5.46,
  SPRX: -6.94,
  AOTG: -3.37,
  SOXX: -8.04,
  PSI:  -8.19,
  XSD:  -7.15,
  DRAM: -13.61,
  PTF:  -6.88,
  WCLD: 1.23,
  IGV:  0.08,
  FDTX: -5,
  GTEK: -3.43,
  ARKK: -1.86,
  MARS: -1.67,
  FRWD: -5.07,
  BCTK: -3.83,
  FWD:  -5.04,
  CBSE: -2.67,
  FCUS: -4.47,
  WGMI: -1.73,
  CNEQ: -2.55,
  SGRT: -5.52,
  SPMO: -4.52,
  XMMO: -2.36,
  POW:  -4.64,
  VOLT: -3.33,
  PBD:  -4.33,
  PBW:  -5.05,
  IVEP: -3.52,
  AIRR: -2.65,
  PRN:  -3.61,
  IDEF: -0.51,
  BILT: 0.18,
  BUZZ: -2.29,
  MEME: -6.44,
  RKNG: -5.7,
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
  'AI & ML': { etfs: ['AIS', 'SPRX', 'AOTG'], series: { '1W': [100, 100.85, 105.73, 107.25, 100.06], '1M': [100, 100.16, 101.99, 101.62, 103.66, 106.87, 106.09, 104.64, 94.8, 98.17, 96.1, 96.1, 93.05, 99.12, 100.16, 105.27, 101.31, 102.17, 107.11, 108.66, 101.37], 'YTD': [100, 102.87, 105.21, 107.25, 108.86, 96.78, 104.69, 103.13, 104.97, 103.34, 103.18, 102.48, 102.9, 96.18, 106.54, 114.17, 122.05, 119.07, 128.96, 136.37, 133.67, 152.21, 162.68, 145.78, 160.48, 155.07], '6M': [100, 98.3, 101.14, 103.86, 104.84, 103.15, 101.37, 100, 102, 101.91, 97.3, 98.24, 97.83, 93.22, 98.76, 109.65, 116.25, 121.44, 123.49, 133.71, 135.07, 142.48, 154.89, 146.77, 158.21, 152.95], '1Y': [100, 106.3, 106.04, 107.3, 108.73, 112.88, 112.71, 115.68, 116.19, 114.36, 114.22, 120.04, 125.9, 130.39, 129.33, 134.54, 133.27, 135.45, 142.89, 139.1, 141.48, 129.07, 127.9, 133.02, 137.55, 128.87, 135.79, 133.45, 137.44, 141.44, 142.81, 140.61, 129.95, 136.69, 139.4, 139.39, 132.73, 134.24, 133.72, 127.42, 135.01, 150.28, 159.23, 166.36, 169.19, 183.33, 185.45, 196.02, 212.84, 201.87, 217.9, 210.65] }, returns: { '1W': 0.1, '1M': 1.4, 'YTD': 55.1, '6M': 52.9, '1Y': 110.7 } },
  'Semiconductors': { etfs: ['PSI', 'DRAM', 'XSD'], series: { '1W': [100, 100.9, 108.76, 112.63, 101.64], '1M': [100, 99.23, 100.39, 99.18, 100.84, 105.4, 106.44, 103.47, 90.78, 96.24, 94.75, 94.75, 91.65, 101, 102.37, 108.69, 103.33, 104.35, 112.56, 116.68, 105.07], 'YTD': [100, 107.31, 113.11, 120.61, 120.35, 116.86, 126.4, 123.44, 125.45, 124.58, 130.67, 130.31, 143.95, 138.29, 141.39, 150.78, 161.57, 171.95, 194.42, 203.98, 182.67, 205.73, 212.85, 205.87, 231.85, 217.69], '6M': [100, 100.35, 109.05, 116.09, 115.81, 115.49, 121.52, 122.11, 123.56, 124.8, 124.88, 126.94, 137.75, 135.26, 134.32, 146.77, 156.41, 173.75, 187.52, 202.27, 183.66, 196.27, 202.27, 204.93, 228.37, 214.36], '1Y': [100, 105.28, 107.49, 111, 111.25, 111.78, 111.61, 113.51, 116.95, 118.13, 117.07, 120.43, 126.71, 129.54, 129.57, 133.54, 133.06, 136.82, 140.61, 137.63, 147.68, 142.15, 141.22, 153.65, 161.23, 151.71, 158.06, 154.85, 158.82, 161.2, 162.24, 163.86, 164.74, 180.37, 180.95, 181.25, 172.26, 180.48, 183.22, 182.07, 183.39, 185.2, 202.06, 212.14, 216.1, 242.94, 247.55, 254.62, 256.37, 263.18, 286.44, 265.44] }, returns: { '1W': 1.6, '1M': 5.1, 'YTD': 117.7, '6M': 114.4, '1Y': 165.4 } },
  'Broad Tech': { etfs: ['WGMI', 'PTF', 'GTEK'], series: { '1W': [100, 100.06, 104.19, 104.77, 100.57], '1M': [100, 101.69, 102.63, 101.67, 104.22, 106.35, 105.89, 104.79, 94.95, 98.57, 96.3, 96.3, 92.75, 98.83, 100.42, 105, 103.02, 103.06, 107.33, 107.91, 103.64], 'YTD': [100, 107.78, 113.11, 112.6, 116.32, 99.82, 111.37, 110.42, 114.08, 111.03, 108.01, 108.85, 111.23, 102.06, 115.84, 124.89, 134.14, 129.08, 144.59, 148.13, 142.62, 162.26, 172.69, 156.14, 170.45, 168.22], '6M': [100, 96.33, 103.64, 108.6, 109.62, 106.56, 104.06, 104.67, 106, 107.2, 98.64, 101.34, 101.7, 97.99, 103.46, 116.76, 126.69, 128.84, 132.91, 143.32, 140.72, 148.71, 162.55, 153.73, 163.87, 161.62], '1Y': [100, 111.21, 115.12, 114.85, 120.34, 116.08, 114.98, 114.03, 121.26, 121.23, 127.15, 133.17, 147.71, 155.44, 156.96, 176.48, 196.03, 180.6, 190.26, 186.07, 179.31, 149.37, 153.87, 157.42, 167.98, 146.53, 154.97, 147.72, 161.93, 170.9, 173.13, 165.9, 144.97, 159.25, 159.69, 162.02, 148.5, 153.69, 153.59, 146.98, 154.78, 177.6, 193.56, 195.76, 201.84, 220.87, 217.09, 230.72, 254.92, 240.04, 254.94, 253.8] }, returns: { '1W': 0.6, '1M': 3.6, 'YTD': 68.2, '6M': 61.6, '1Y': 153.8 } },
  'Electrification': { etfs: ['PBW', 'VOLT', 'POW'], series: { '1W': [100, 100.1, 102.5, 103.57, 99.08], '1M': [100, 99.41, 99.38, 98.37, 97.97, 100.1, 98.96, 98.85, 92.08, 92.77, 91.63, 91.63, 88.59, 92.69, 93.46, 95.98, 94.92, 95.03, 97.27, 98.34, 94.11], 'YTD': [100, 104.13, 108.52, 113.55, 115.16, 110.83, 119.72, 118.62, 121.85, 116.91, 116.61, 116.11, 119.56, 115.01, 122.19, 127.41, 134.02, 134.96, 146.19, 146.34, 137.67, 149.98, 149.96, 137.29, 143.9, 140.97], '6M': [100, 97.54, 101.52, 107.18, 109.55, 109.5, 113.07, 114.66, 116.44, 117.23, 108.85, 111.97, 110.47, 111.2, 113.84, 123.34, 128.03, 133.89, 139.01, 143.06, 139.52, 141.33, 143.32, 135.62, 140.51, 137.67], '1Y': [100, 102.68, 106.17, 108.15, 112.13, 109.8, 109.28, 111.37, 113.51, 114.42, 112.61, 111.71, 116.36, 120.6, 121.79, 129.45, 135.4, 133.46, 134.41, 131.48, 136.78, 129.4, 130.3, 134.48, 136.62, 134.08, 138.07, 132.77, 137.44, 141.94, 145.88, 142.09, 139.85, 144.59, 146.9, 148.69, 144.26, 147.81, 147.47, 149.63, 154.74, 164.05, 170.75, 168.79, 171.24, 178.5, 177.4, 180.27, 179.78, 173.01, 176.65, 173.31] }, returns: { '1W': -0.9, '1M': -5.9, 'YTD': 41, '6M': 37.7, '1Y': 73.3 } },
  'Industrials': { etfs: ['PRN', 'RSHO', 'BILT'], series: { '1W': [100, 99.76, 100.43, 102.3, 101.12], '1M': [100, 101.14, 100.86, 100.06, 98.78, 99.91, 101.08, 101.46, 99.93, 98.48, 99.13, 99.13, 98.22, 98.91, 101.07, 100.58, 101.08, 100.87, 101.55, 103.46, 102.27], 'YTD': [100, 102.86, 105.97, 108.43, 109.5, 111.1, 116.97, 118.63, 120.06, 117.27, 113.3, 111.52, 113.54, 111.53, 118.86, 120.71, 121, 121.58, 125.02, 128.11, 122.78, 127.58, 127.55, 126.36, 128.61, 130.84], '6M': [100, 98.41, 100.63, 104.85, 105.87, 106.55, 110.81, 114.41, 117.16, 116.85, 110.97, 108.49, 107.81, 108.46, 110.91, 118.21, 119.39, 120.67, 121.48, 123.89, 123.88, 122.56, 123.45, 122.99, 125.91, 128.08], '1Y': [100, 102.6, 103.32, 103.93, 104.65, 106.25, 105.19, 105.42, 105.54, 106.72, 106.45, 107.1, 108.65, 110.18, 109.84, 110.88, 110.77, 111.86, 112.87, 111.97, 112.28, 106.66, 107.97, 109.5, 111.13, 111.37, 113.73, 112.05, 115.83, 120.72, 122.23, 123.74, 125.82, 131.42, 133.53, 131.17, 123.81, 121.89, 122.22, 123.99, 126.2, 134.27, 136.01, 137.87, 138.1, 141.58, 140.72, 139.59, 141.2, 140.48, 143.98, 146.47] }, returns: { '1W': 1.1, '1M': 2.3, 'YTD': 30.8, '6M': 28.1, '1Y': 46.5 } },
  'Meme': { etfs: ['MEME', 'BUZZ', 'RKNG'], series: { '1W': [100, 100.64, 104.2, 104.07, 99.19], '1M': [100, 101.49, 103.34, 102.02, 102.24, 104.7, 101.07, 101.6, 91.3, 93.63, 90.34, 90.34, 87.84, 93.47, 92.31, 97.44, 93.66, 94.22, 97.55, 97.4, 92.89], 'YTD': [100, 108.03, 108.62, 108.21, 102.68, 89.95, 95.31, 95.05, 96.08, 96.03, 94.53, 90.43, 93.62, 90.16, 98.8, 112.13, 113.88, 110.76, 122.46, 125.5, 122.75, 138.98, 143.41, 122.67, 132.26, 126.87], '6M': [100, 95.91, 100.98, 102.34, 100.09, 94.39, 91.1, 87.92, 89.89, 89.96, 86.58, 84.99, 87.74, 85.7, 91.15, 102.25, 109.89, 109.11, 114.22, 118.16, 120.66, 129.62, 134.45, 120.58, 126.29, 121.26], '1Y': [100, 103.86, 101.66, 96.92, 97.52, 92.63, 91.84, 90.51, 86.56, 84.63, 85.69, 87.81, 91.36, 91.95, 88.67, 94.07, 93.07, 92.02, 96.48, 94.79, 95.79, 90.94, 88.29, 86.71, 89.28, 87.22, 89.76, 89.56, 92.18, 94.3, 93.88, 92.9, 90.21, 89.33, 89.69, 92.62, 93.21, 100.05, 100.67, 93.68, 94.46, 102.6, 109.26, 111.68, 112.07, 117.79, 118.38, 117.38, 117.99, 115.61, 117.51, 112.87] }, returns: { '1W': -0.8, '1M': -7.1, 'YTD': 26.9, '6M': 21.3, '1Y': 12.9 } },
};
// @@END_GENERATED:THEME_REPRESENTATIVES@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVDA', easyScore: 10, avgWeight: 6.23, proScore: 6.23, coverage: 1,
      price: 200.55, weeklyPrices: [207.41, 204.65, 210.69, 208.65, 200.55], weeklyChange: -3.31, dayChange: -3.88, sortRank: 0, periodReturns: { '1M': -6.9, 'YTD': 7.5, '6M': 6, '1Y': 39.1 },
      priceHistory: { '1D': [208.65, 201.71, 203.41, 203.2, 203.06, 202.8, 202.63, 200.81, 200.52, 201.04, 201.91, 202.46, 202.28, 202.21, 202.15, 201.99, 202.65, 202.27, 202.16, 201.74, 201.67, 201.4, 200.73, 200.55], '1W': [207.41, 204.65, 210.69, 208.65, 200.55], '1M': [214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.55], 'YTD': [186.5, 185.04, 183.14, 184.84, 192.51, 171.88, 190.05, 187.9, 184.89, 183.04, 186.03, 180.4, 178.68, 174.4, 182.08, 198.87, 202.5, 213.17, 196.5, 220.78, 222.32, 214.86, 222.82, 208.19, 212.45, 200.55], '6M': [189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 186.94, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 215.2, 225.32, 215.33, 224.36, 208.64, 212.45, 200.55], '1Y': [144.17, 157.99, 160, 170.7, 167.03, 175.51, 178.26, 182.06, 182.01, 179.81, 170.78, 170.76, 174.88, 178.43, 186.58, 185.04, 180.03, 181.16, 201.03, 198.69, 199.05, 186.6, 182.55, 181.46, 184.97, 177.72, 189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 171.88, 186.94, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 215.2, 225.32, 215.33, 224.36, 208.64, 212.45, 200.55] },
      velocityScore: { '1D': 3.7, '1W': 0.8, '1M': 7.4, '6M': null }, isNew: false,
      marketCap: '$4.9T', pe: 30.7, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.48,
      etfPresence: { AIS: 2.31, ARTY: 4.39, BAI: 3.9, IGPT: 7.8, IVES: 4.77, ALAI: 12.72, CHAT: 6.2, AIFD: 6.37, SPRX: 3.34, AOTG: 10.53 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 9, avgWeight: 6.75, proScore: 6.08, coverage: 0.9,
      price: 1045.15, weeklyPrices: [1020.76, 1043.19, 1133.99, 1211.38, 1045.15], weeklyChange: 2.39, dayChange: -13.72, sortRank: 0, periodReturns: { '1M': 39.2, 'YTD': 266.2, '6M': 278.3, '1Y': 756.1 },
      priceHistory: { '1D': [1211.38, 1069, 1090.88, 1107.81, 1104.35, 1084.65, 1083.86, 1083.25, 1076.89, 1077.75, 1083.28, 1090.88, 1089.51, 1083.66, 1078.91, 1073.89, 1079.23, 1073.56, 1069, 1058.69, 1056.24, 1055.92, 1044.85, 1045.15], '1W': [1020.76, 1043.19, 1133.99, 1211.38, 1045.15], '1M': [895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1045.15], 'YTD': [285.41, 327.02, 333.35, 397.58, 435.79, 382.89, 410.34, 417.35, 415.56, 400.77, 418.69, 461.73, 382.09, 337.84, 406.73, 456.23, 487.48, 504.29, 640.2, 766.58, 681.54, 895.88, 1064.1, 935.89, 1087.99, 1045.15], '6M': [276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 746.81, 724.66, 751, 1035.5, 949.28, 1087.99, 1045.15], '1Y': [122.08, 123.25, 124.42, 120.11, 109.22, 111.96, 109.06, 123.72, 123.55, 116.42, 118.48, 135.24, 158.82, 166.41, 167.32, 185.69, 187.06, 202.29, 221.91, 218.03, 253.3, 241.95, 223.93, 239.49, 252.42, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 382.89, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 746.81, 724.66, 751, 1035.5, 949.28, 1087.99, 1045.15] },
      velocityScore: { '1D': 0.2, '1W': -3.2, '1M': 14.7, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 49.3, revenueGrowth: 196, eps: 21.2, grossMargin: 58, dividendYield: 0.05,
      etfPresence: { AIS: 8.11, ARTY: 5.45, BAI: 6.73, IGPT: 9.31, IVES: 7.38, ALAI: 1.18, CHAT: 4.27, AIFD: 7.12, SPRX: false, AOTG: 11.23 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'AMD', easyScore: 9, avgWeight: 5.53, proScore: 4.98, coverage: 0.9,
      price: 515.16, weeklyPrices: [507.29, 512.48, 537.37, 551.63, 515.16], weeklyChange: 1.55, dayChange: -6.61, sortRank: 0, periodReturns: { '1M': 10.2, 'YTD': 140.5, '6M': 139.7, '1Y': 297.6 },
      priceHistory: { '1D': [551.63, 512.7, 523.87, 524.5, 523.05, 522.16, 520.34, 520.68, 517.78, 518.65, 520.79, 526.31, 526.54, 524.86, 521.1, 521.27, 524.5, 522.84, 521.27, 520.13, 519.47, 519.15, 515.64, 515.16], '1W': [507.29, 512.48, 537.37, 551.63, 515.16], '1M': [503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 515.16], 'YTD': [214.16, 204.68, 223.6, 253.73, 252.18, 192.5, 213.58, 203.37, 203.68, 202.07, 204.83, 199.46, 220.27, 203.43, 231.82, 258.12, 303.46, 323.21, 355.26, 448.29, 420.99, 503.89, 521.54, 475.51, 547.26, 515.16], '6M': [214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 205.94, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 455.19, 424.1, 467.51, 510.13, 490.33, 547.26, 515.16], '1Y': [129.58, 141.9, 137.82, 155.61, 154.72, 177.44, 174.31, 172.28, 176.14, 163.36, 162.32, 155.82, 160.46, 160.9, 161.79, 211.51, 218.09, 238.03, 258.01, 250.05, 243.98, 240.52, 215.05, 215.24, 221.62, 209.17, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 192.5, 205.94, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 455.19, 424.1, 467.51, 510.13, 490.33, 547.26, 515.16] },
      velocityScore: { '1D': 4, '1W': -2.5, '1M': -0.6, '6M': null }, isNew: false,
      marketCap: '$840B', pe: 172.9, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.41, ARTY: 4.8, BAI: 4.74, IGPT: 8.64, IVES: 5.37, ALAI: 1.22, CHAT: 3.93, AIFD: false, SPRX: 0.53, AOTG: 16.16 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 7, avgWeight: 3.95, proScore: 2.76, coverage: 0.7,
      price: 379.98, weeklyPrices: [376.71, 392.90, 411.35, 392.13, 379.98], weeklyChange: 0.87, dayChange: -3.1, sortRank: 0, periodReturns: { '1M': -8.2, 'YTD': 9.8, '6M': 8.8, '1Y': 49.7 },
      priceHistory: { '1D': [392.13, 383.3, 389.36, 389.32, 387, 384.4, 383.05, 380.5, 379.95, 380.41, 380.8, 381.76, 382.97, 383.23, 383.36, 383.84, 384.66, 383.86, 382.77, 382.02, 382.36, 382.07, 381.11, 379.98], '1W': [376.71, 392.9, 411.35, 392.13, 379.98], '1M': [422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 379.98], 'YTD': [346.1, 332.48, 339.89, 325.49, 330.73, 310.51, 342.76, 333.99, 321.7, 317.53, 341.57, 315.93, 318.81, 309.51, 350.63, 396.72, 422.65, 399.83, 427.36, 419.3, 420.71, 422.01, 481.57, 392.16, 393.94, 379.98], '6M': [349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 331.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 430, 425.19, 414.14, 459.97, 396.6, 393.94, 379.98], '1Y': [253.77, 275.65, 271.8, 280.94, 278.59, 297.42, 292.93, 303.9, 305.76, 294.23, 298.24, 336.67, 360, 338.94, 329.91, 336.41, 344.13, 342.66, 372.97, 351.94, 358.39, 342.65, 377.96, 381.57, 406.29, 341.3, 349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 310.51, 331.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 430, 425.19, 414.14, 459.97, 396.6, 393.94, 379.98] },
      velocityScore: { '1D': -4.5, '1W': 3, '1M': -15.6, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 63.3, revenueGrowth: 48, eps: 6, grossMargin: 76, dividendYield: 0.66,
      etfPresence: { AIS: false, ARTY: 4.26, BAI: 3.97, IGPT: false, IVES: 4.47, ALAI: 4.01, CHAT: 3.85, AIFD: 5.53, SPRX: false, AOTG: 1.55 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MRVL', easyScore: 7, avgWeight: 3.91, proScore: 2.74, coverage: 0.7,
      price: 277.81, weeklyPrices: [278.67, 289.54, 310.58, 307.86, 277.81], weeklyChange: -0.31, dayChange: -9.76, sortRank: 0, periodReturns: { '1M': 41.5, 'YTD': 226.9, '6M': 216.8, '1Y': 292.5 },
      priceHistory: { '1D': [307.86, 279.48, 286.33, 290.09, 285.27, 283.73, 281.48, 281.65, 280.26, 280.55, 280.87, 282.74, 283.1, 282.48, 280.78, 279.81, 282.27, 281.54, 280.61, 278.92, 279.03, 279.05, 277.57, 277.81], '1W': [278.67, 289.54, 310.58, 307.86, 277.81], '1M': [208.26, 198.7, 204.83, 205, 219.43, 290.79, 301.65, 316.43, 263.47, 288.85, 266.88, 252.59, 280.71, 279.7, 308.88, 278.67, 289.54, 310.58, 307.86, 277.81], 'YTD': [84.98, 83.45, 81.21, 83.1, 81.34, 74.21, 81.34, 79.61, 79.29, 78.09, 90.44, 87.62, 98.45, 99.05, 114.45, 134.6, 157.32, 153.23, 168.75, 164.5, 168.93, 208.26, 290.79, 266.88, 308.88, 277.81], '6M': [87.68, 84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.23, 79.48, 81.69, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 163.66, 170.13, 176.89, 196.33, 219.43, 288.85, 308.88, 277.81], '1Y': [70.78, 77.4, 71.95, 72.41, 71.99, 76.34, 76.63, 77.28, 76.74, 72.95, 64.6, 66.84, 68.86, 74.62, 84.07, 86.97, 86.22, 84.26, 88.46, 87.59, 93.23, 83.45, 83.79, 92.89, 88.9, 84.07, 87.68, 84.98, 83.45, 80.38, 80.23, 78.92, 74.21, 78.23, 79.48, 81.69, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 163.66, 170.13, 176.89, 196.33, 219.43, 288.85, 308.88, 277.81] },
      velocityScore: { '1D': 17.1, '1W': -2.8, '1M': 18.6, '6M': null }, isNew: false,
      marketCap: '$243B', pe: 95.1, revenueGrowth: 28, eps: 2.92, grossMargin: 52, dividendYield: 0.08,
      etfPresence: { AIS: 4.38, ARTY: 4.52, BAI: 1.99, IGPT: 3.94, IVES: false, ALAI: false, CHAT: 1.55, AIFD: 6.54, SPRX: 4.45, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'TSM', name: 'TSM', easyScore: 6, avgWeight: 4.94, proScore: 2.96, coverage: 0.6,
      price: 436.72, weeklyPrices: [425.83, 432.15, 462.12, 467.67, 436.72], weeklyChange: 2.56, dayChange: -6.62, sortRank: 0, periodReturns: { '1M': 8, 'YTD': 43.7, '6M': 47.1, '1Y': 107.6 },
      priceHistory: { '1D': [467.67, 441, 445.28, 446.1, 444.52, 442.4, 440.28, 440.05, 439.48, 439.14, 441.36, 443.15, 442.93, 441.47, 442.37, 441.69, 443.48, 442.67, 442.24, 440.67, 439.89, 439.1, 436.91, 436.72], '1W': [425.83, 432.15, 462.12, 467.67, 436.72], '1M': [412.32, 422.73, 424.86, 418.45, 435.63, 446.69, 436.69, 444.92, 415.17, 426.8, 427.92, 408.75, 421.07, 423.93, 441.4, 425.83, 432.15, 462.12, 467.67, 436.72], 'YTD': [303.89, 318.01, 327.11, 327.37, 339.55, 330.73, 374.09, 360.39, 376.81, 357.44, 354.56, 339.57, 347.75, 337.95, 365.9, 375.1, 387.44, 392.34, 394.41, 397.28, 395.95, 412.32, 446.69, 427.92, 441.4, 436.72], '6M': [296.95, 303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 368.1, 370.54, 374.58, 338.89, 338.31, 329.24, 326.74, 341.76, 369.57, 366.24, 404.98, 401.61, 411.68, 404.35, 404.52, 435.63, 426.8, 441.4, 436.72], '1Y': [210.32, 226.49, 227.86, 236.95, 234.6, 241.33, 232.47, 242.09, 241.41, 235.59, 228.39, 250.92, 262.06, 282.71, 279.29, 294.03, 295.94, 294.51, 301.53, 294.05, 295.27, 282.01, 284.64, 292.09, 303.41, 286.87, 296.95, 303.89, 318.01, 341.64, 334.87, 330.56, 330.73, 368.1, 370.54, 374.58, 338.89, 338.31, 329.24, 326.74, 341.76, 369.57, 366.24, 404.98, 401.61, 411.68, 404.35, 404.52, 435.63, 426.8, 441.4, 436.72] },
      velocityScore: { '1D': 1, '1W': 3.1, '1M': -3.9, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 37.6, revenueGrowth: 35, eps: 11.6, grossMargin: 62, dividendYield: 0.81,
      etfPresence: { AIS: 3.07, ARTY: false, BAI: 4.31, IGPT: false, IVES: 5.47, ALAI: 5.82, CHAT: false, AIFD: 3.41, SPRX: false, AOTG: 7.55 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 4.74, proScore: 2.84, coverage: 0.6,
      price: 346.74, weeklyPrices: [373.25, 363.79, 368.03, 349.68, 346.74], weeklyChange: -7.1, dayChange: -0.81, sortRank: 0, periodReturns: { '1M': -9.5, 'YTD': 10.8, '6M': 10.3, '1Y': 109.9 },
      priceHistory: { '1D': [349.56, 347.31, 348.16, 348.82, 348.21, 347.13, 348.17, 346.98, 345.97, 345.26, 346.38, 345.94, 347.29, 347.54, 347.87, 347.71, 347.65, 347.57, 347.7, 346.73, 346.47, 346.24, 346.45, 346.74], '1W': [373.25, 363.79, 368.03, 349.68, 346.74], '1M': [388.88, 388.83, 390.13, 380.34, 376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68, 369.35, 373.25, 363.79, 368.03, 349.68, 346.74], 'YTD': [313, 325.44, 335.84, 330.54, 338.25, 331.25, 310.96, 302.85, 307.38, 303.13, 308.7, 307.69, 290.93, 287.56, 317.32, 337.12, 339.32, 349.78, 388.43, 387.35, 396.94, 388.88, 361.85, 364.26, 369.35, 346.74], '6M': [314.35, 313, 325.44, 332.78, 327.93, 338, 322.86, 309, 314.98, 311.76, 298.52, 302.28, 301, 274.34, 299.99, 321.31, 337.42, 350.34, 383.25, 400.8, 396.78, 382.97, 376.37, 363.31, 369.35, 346.74], '1Y': [165.19, 176.23, 174.36, 182, 191.34, 195.75, 194.67, 201, 203.5, 208.49, 211.35, 239.63, 251.16, 251.66, 243.1, 245.76, 245.45, 250.46, 267.47, 277.54, 290.1, 285.02, 318.58, 315.81, 317.08, 306.57, 314.35, 313, 325.44, 332.78, 327.93, 338, 331.25, 309, 314.98, 311.76, 298.52, 302.28, 301, 274.34, 299.99, 321.31, 337.42, 350.34, 383.25, 400.8, 396.78, 382.97, 376.37, 363.31, 369.35, 346.74] },
      velocityScore: { '1D': 4, '1W': 1.4, '1M': -25.5, '6M': null }, isNew: false,
      marketCap: '$4.2T', pe: 26.4, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.95, IGPT: 7.48, IVES: 4.33, ALAI: false, CHAT: 4.72, AIFD: 4.94, SPRX: false, AOTG: 4.01 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 6, avgWeight: 3, proScore: 1.8, coverage: 0.6,
      price: 664.55, weeklyPrices: [681.08, 712.13, 746.23, 732.62, 664.55], weeklyChange: -2.43, dayChange: -9.29, sortRank: 0, periodReturns: { '1M': 37.2, 'YTD': 285.8, '6M': 272.8, '1Y': 1000.6 },
      priceHistory: { '1D': [732.62, 662.65, 658.42, 670.7, 670.19, 659.91, 660, 662, 660.61, 663.8, 670.67, 673.85, 678, 676.31, 673.05, 672.65, 673.27, 671.73, 671.03, 668.95, 668.75, 669.52, 665.74, 664.55], '1W': [681.08, 712.13, 746.23, 732.62, 664.55], '1M': [524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 664.55], 'YTD': [172.27, 187.68, 215, 243.29, 278.41, 260.19, 273.74, 284.67, 282.25, 261.3, 268.81, 304.9, 296.14, 270.49, 338.78, 365, 389.1, 390.99, 465.26, 488.74, 458.68, 524.65, 563.1, 517.72, 653.53, 664.55], '6M': [178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 284.1, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 480, 482.02, 484.28, 546.2, 526.93, 653.53, 664.55], '1Y': [60.38, 63.99, 64.02, 67.53, 67.06, 70.61, 75.84, 74.64, 76.29, 79.22, 81.91, 94.54, 103.09, 110.25, 120.06, 119.93, 113.13, 121.41, 124.92, 152.18, 174.22, 162.45, 150.93, 159.99, 169.54, 174.58, 178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 260.19, 284.1, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 480, 482.02, 484.28, 546.2, 526.93, 653.53, 664.55] },
      velocityScore: { '1D': -2.2, '1W': 12.5, '1M': -6.2, '6M': null }, isNew: false,
      marketCap: '$229B', pe: 39.8, revenueGrowth: 46, eps: 16.7, grossMargin: 45, dividendYield: 0.08,
      etfPresence: { AIS: 1.92, ARTY: 3.23, BAI: 3.56, IGPT: 3.7, IVES: false, ALAI: 4.72, CHAT: false, AIFD: false, SPRX: false, AOTG: 0.87 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'ANET', name: 'ARISTA NETWORKS INC', easyScore: 6, avgWeight: 2.24, proScore: 1.34, coverage: 0.6,
      price: 161.55, weeklyPrices: [168.01, 164.93, 169.67, 174.56, 161.55], weeklyChange: -3.85, dayChange: -7.45, sortRank: 0, periodReturns: { '1M': 4.9, 'YTD': 23.3, '6M': 23, '1Y': 75.7 },
      priceHistory: { '1D': [174.56, 161.49, 163.09, 164.14, 163.13, 161.32, 161.21, 161.63, 161.21, 160.93, 161.65, 162.66, 164.25, 164.23, 163.88, 163.71, 164.26, 164.57, 164.22, 163.46, 163.15, 162.82, 161.55, 161.55], '1W': [168.01, 164.93, 169.67, 174.56, 161.55], '1M': [158.01, 154.31, 155.27, 159.47, 170.68, 175.33, 174.37, 166.01, 154.27, 156.4, 152.16, 151.76, 156.4, 163.24, 169.09, 168.01, 164.93, 169.67, 174.56, 161.55], 'YTD': [131.03, 123.72, 125.09, 138.41, 148.15, 128.67, 140.66, 137.23, 130.25, 134.83, 138.23, 136.07, 135.01, 122.78, 145.07, 154.33, 177.73, 165.29, 170.22, 142.54, 141.71, 158.01, 175.33, 152.16, 169.09, 161.55], '6M': [131.32, 131.03, 123.72, 130.59, 136.34, 141.74, 137.49, 135.12, 132.79, 133.5, 132.89, 133.57, 131.22, 120.77, 126.25, 152.02, 166.85, 172.47, 172.62, 141.77, 141.97, 154.03, 170.68, 156.4, 169.09, 161.55], '1Y': [91.95, 102.31, 103.39, 107.37, 109.78, 118.62, 118.12, 137.65, 138.04, 133.04, 135.87, 141.91, 142.16, 144.09, 145.71, 145.29, 138.79, 145.94, 156.77, 153.55, 137.26, 127.26, 122.17, 127.22, 130.04, 126.13, 131.32, 131.03, 123.72, 130.59, 136.34, 141.74, 128.67, 135.12, 132.79, 133.5, 132.89, 133.57, 131.22, 120.77, 126.25, 152.02, 166.85, 172.47, 172.62, 141.77, 141.97, 154.03, 170.68, 156.4, 169.09, 161.55] },
      velocityScore: { '1D': -2.2, '1W': -11.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$203B', pe: 55.3, revenueGrowth: 35, eps: 2.92, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: false, ARTY: 2.41, BAI: 1.36, IGPT: false, IVES: false, ALAI: 1, CHAT: 2.14, AIFD: 4.93, SPRX: 1.58, AOTG: false },
      tonyNote: 'ARISTA NETWORKS INC appears in 6 of 10 AI & ML ETFs (60% coverage) with average weight 2.2% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 5, avgWeight: 3.74, proScore: 1.87, coverage: 0.5,
      price: 562.72, weeklyPrices: [600.21, 567.58, 577.22, 563.85, 562.72], weeklyChange: -6.25, dayChange: -0.2, sortRank: 0, periodReturns: { '1M': -7.8, 'YTD': -14.8, '6M': -15.4, '1Y': -19.4 },
      priceHistory: { '1D': [563.85, 568.66, 571.65, 570, 568.71, 568.25, 567.41, 564.95, 562.96, 562.93, 564, 563.7, 564.07, 563.94, 565.74, 564.7, 565.37, 567.14, 565.94, 564.07, 563.36, 563.19, 562.29, 562.72], '1W': [600.21, 567.58, 577.22, 563.85, 562.72], '1M': [612.34, 635.26, 635.29, 632.51, 600.47, 597.63, 622.98, 627.57, 593, 585.39, 584.59, 570.98, 568.43, 566.98, 593.48, 600.21, 567.58, 577.22, 563.85, 562.72], 'YTD': [660.09, 646.06, 615.52, 647.63, 738.31, 670.21, 668.69, 644.78, 657.01, 667.73, 654.86, 615.68, 594.89, 572.13, 612.42, 671.58, 674.72, 671.34, 604.96, 603, 611.21, 612.34, 597.63, 584.59, 593.48, 562.72], '6M': [664.94, 660.09, 646.06, 620.8, 658.76, 716.5, 661.46, 649.81, 655.66, 648.18, 644.86, 613.71, 593.66, 525.72, 573.02, 634.53, 670.91, 678.62, 610.41, 609.63, 614.23, 610.26, 600.47, 585.39, 593.48, 562.72], '1Y': [698.53, 738.09, 720.67, 710.39, 704.81, 700, 763.46, 765.87, 767.37, 753.3, 735.11, 765.7, 779, 755.4, 734.38, 713.08, 708.65, 733.27, 751.44, 627.32, 631.76, 602.01, 613.05, 647.1, 656.96, 657.15, 664.94, 660.09, 646.06, 620.8, 658.76, 716.5, 670.21, 649.81, 655.66, 648.18, 644.86, 613.71, 593.66, 525.72, 573.02, 634.53, 670.91, 678.62, 610.41, 609.63, 614.23, 610.26, 600.47, 585.39, 593.48, 562.72] },
      velocityScore: { '1D': 20.6, '1W': 14.7, '1M': -32, '6M': null }, isNew: false,
      marketCap: '$1.4T', pe: 20.4, revenueGrowth: 33, eps: 27.52, grossMargin: 82, dividendYield: 0.37,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: 7.59, IVES: 4.29, ALAI: 3.84, CHAT: 1.89, AIFD: false, SPRX: false, AOTG: 1.09 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.29, proScore: 1.65, coverage: 0.5,
      price: 372.9, weeklyPrices: [393.83, 378.91, 379.40, 367.34, 372.90], weeklyChange: -5.31, dayChange: 1.51, sortRank: 0, periodReturns: { '1M': -10.9, 'YTD': -22.9, '6M': -23.4, '1Y': -23.3 },
      priceHistory: { '1D': [367.34, 374.83, 374.84, 374.3, 376.28, 376.32, 375.44, 373.87, 373.14, 372.93, 373.4, 372.7, 372.8, 372.98, 372.87, 372.64, 372.64, 374.36, 374.14, 373.79, 373.81, 373.57, 372.5, 372.9], '1W': [393.83, 378.91, 379.4, 367.34, 372.9], '1M': [416.03, 412.67, 426.99, 450.24, 460.52, 441.31, 427.34, 428.05, 416.67, 411.74, 403.41, 397.36, 390.34, 390.74, 399.76, 393.83, 378.91, 379.4, 367.34, 372.9], 'YTD': [483.62, 478.11, 459.38, 451.14, 433.5, 393.67, 404.37, 398.46, 401.72, 405.2, 404.88, 391.79, 371.04, 370.17, 374.33, 411.22, 432.92, 429.25, 411.38, 407.77, 423.54, 416.03, 441.31, 403.41, 399.76, 372.9], '6M': [486.85, 483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.84, 397.23, 392.74, 408.96, 395.55, 381.87, 356.77, 372.88, 384.37, 418.07, 424.82, 413.62, 415.12, 421.92, 418.57, 460.52, 411.74, 399.76, 372.9], '1Y': [486, 497.41, 496.62, 505.82, 505.27, 512.57, 527.75, 521.77, 517.1, 504.26, 505.12, 498.41, 509.04, 509.23, 517.95, 523.98, 513.57, 517.66, 542.07, 514.33, 506, 507.49, 474, 490, 492.02, 476.39, 486.85, 483.62, 478.11, 456.66, 465.95, 430.29, 393.67, 401.84, 397.23, 392.74, 408.96, 395.55, 381.87, 356.77, 372.88, 384.37, 418.07, 424.82, 413.62, 415.12, 421.92, 418.57, 460.52, 411.74, 399.76, 372.9] },
      velocityScore: { '1D': -2.4, '1W': -4.6, '1M': -36.3, '6M': null }, isNew: false,
      marketCap: '$2.8T', pe: 22.2, revenueGrowth: 18, eps: 16.79, grossMargin: 68, dividendYield: 0.99,
      etfPresence: { AIS: false, ARTY: 2.26, BAI: false, IGPT: false, IVES: 4.22, ALAI: 4.69, CHAT: 1.91, AIFD: false, SPRX: false, AOTG: 3.39 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'ALAB', name: 'ALAB', easyScore: 5, avgWeight: 3.21, proScore: 1.6, coverage: 0.5,
      price: 394.48, weeklyPrices: [361.71, 374.68, 417.07, 439.66, 394.48], weeklyChange: 9.06, dayChange: -10.28, sortRank: 0, periodReturns: { '1M': 28.5, 'YTD': 137.1, '6M': 133.7, '1Y': 359 },
      priceHistory: { '1D': [439.66, 406.57, 415.79, 415.41, 409.61, 402.77, 404.69, 404.32, 399.26, 401.48, 403.05, 404.64, 405.61, 403.12, 400.88, 399.9, 403.37, 402.22, 401.74, 400.16, 397.3, 398.27, 395.2, 394.48], '1W': [361.71, 374.68, 417.07, 439.66, 394.48], '1M': [318.72, 325.33, 349.17, 342.85, 320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 361.71, 374.68, 417.07, 439.66, 394.48], 'YTD': [166.36, 156.73, 172.14, 176.35, 160.46, 142.82, 143.71, 132.62, 124.67, 113.77, 124.71, 126.34, 120.33, 109.6, 125.46, 172.09, 194.06, 183.31, 215.69, 204.42, 215.58, 318.72, 355.76, 341.7, 389.2, 394.48], '6M': [168.83, 166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 126.58, 129.68, 118.83, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 199.79, 232.68, 306.88, 320.09, 346.33, 389.2, 394.48], '1Y': [85.95, 90.42, 92.3, 92.36, 116.91, 118.41, 135.54, 179.43, 186.43, 174.15, 174.24, 214.49, 238.79, 230.11, 195.8, 212.1, 161.55, 157.51, 168.25, 179.31, 173.74, 141.39, 147.75, 142.94, 167.08, 144.94, 168.83, 166.36, 156.73, 174.45, 169.66, 150.62, 142.82, 126.58, 129.68, 118.83, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 199.79, 232.68, 306.88, 320.09, 346.33, 389.2, 394.48] },
      velocityScore: { '1D': 0, '1W': 1.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$68B', pe: 264.8, revenueGrowth: 93, eps: 1.49, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 1.87, ARTY: 1.39, BAI: false, IGPT: false, IVES: false, ALAI: 1.39, CHAT: 2.87, AIFD: false, SPRX: 8.51, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 5, avgWeight: 2.63, proScore: 1.32, coverage: 0.5,
      price: 816.5, weeklyPrices: [875.36, 869.98, 850.00, 893.93, 816.50], weeklyChange: -6.72, dayChange: -8.66, sortRank: 0, periodReturns: { '1M': -13.8, 'YTD': 121.5, '6M': 110.8, '1Y': 815.8 },
      priceHistory: { '1D': [893.93, 821.69, 845.71, 850.92, 847.23, 835.91, 831.9, 828.42, 825.4, 823.13, 826.67, 833.4, 837.16, 832.56, 830.21, 828.59, 832.25, 830.31, 828.4, 824, 821.41, 820.85, 816.13, 816.5], '1W': [875.36, 869.98, 850, 893.93, 816.5], '1M': [910.81, 902.31, 860.62, 854.96, 905, 1029.15, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93, 816.5], 'YTD': [368.59, 348.26, 331.62, 354.49, 381.44, 504.42, 574.11, 635.64, 677, 680.8, 672, 700.81, 777.17, 702.76, 896.02, 824.01, 873.6, 791.37, 994.56, 992.37, 884.98, 910.81, 1029.15, 821.76, 957.24, 816.5], '6M': [387.41, 368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 583.46, 667.77, 700.91, 558.44, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 903.8, 970.7, 946.9, 905, 895.4, 957.24, 816.5], '1Y': [89.16, 95.06, 91.31, 98.14, 99.63, 109.48, 108.15, 115.03, 118.98, 123.42, 132.55, 151.73, 170.9, 163.99, 162.71, 157.15, 156.78, 162.95, 198.39, 188.36, 259.89, 242.07, 299.36, 302.81, 360.33, 316.15, 387.41, 368.59, 348.26, 343.27, 339.19, 391.84, 504.42, 583.46, 667.77, 700.91, 558.44, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 903.8, 970.7, 946.9, 905, 895.4, 957.24, 816.5] },
      velocityScore: { '1D': 4.8, '1W': -8.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$64B', pe: 142.7, revenueGrowth: 90, eps: 5.72, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.53, IGPT: false, IVES: false, ALAI: 0.41, CHAT: 1.36, AIFD: 5.62, SPRX: 3.24, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 5 of 10 AI & ML ETFs (50% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 5, avgWeight: 2.54, proScore: 1.27, coverage: 0.5,
      price: 1964.34, weeklyPrices: [1991.55, 1958.80, 2184.75, 2273.73, 1964.34], weeklyChange: -1.37, dayChange: -13.61, sortRank: 0, periodReturns: { '1M': 32.8, 'YTD': 727.5, '6M': 702.1, '1Y': 4083.9 },
      priceHistory: { '1D': [2273.73, 1965, 2006.21, 2019.51, 2030.38, 1989.8, 1995.46, 1997.65, 1984.42, 1987.89, 1990.8, 2005.16, 2011.99, 1992, 1987.09, 1974.89, 1991.2, 1983.71, 1980.19, 1956.28, 1957.63, 1960.74, 1954.34, 1964.34], '1W': [1991.55, 1958.8, 2184.75, 2273.73, 1964.34], '1M': [1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1964.34], 'YTD': [237.38, 334.54, 387.81, 503.44, 539.3, 576.2, 599.34, 621.09, 651.9, 599.06, 655.43, 753.69, 677.86, 635.34, 780.9, 891.72, 979.07, 1002.35, 1406.32, 1452.02, 1333.01, 1589.55, 1716.36, 1646.54, 2107.86, 1964.34], '6M': [244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 630.29, 649.97, 635.36, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1562.34, 1407.61, 1478.69, 1761.43, 1642, 2107.86, 1964.34], '1Y': [46.95, 45.35, 46.17, 42.72, 41.36, 42.93, 41.93, 43.37, 45.52, 46.78, 51.07, 70.51, 91.55, 106.4, 112.2, 120.95, 127.29, 149.29, 175.53, 194.57, 267.95, 265.88, 226.96, 205.35, 219.46, 209.31, 244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 576.2, 630.29, 649.97, 635.36, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1562.34, 1407.61, 1478.69, 1761.43, 1642, 2107.86, 1964.34] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$291B', pe: 67, revenueGrowth: 251, eps: 29.33, grossMargin: 56, dividendYield: null,
      etfPresence: { AIS: 2.07, ARTY: false, BAI: 3.2, IGPT: 4.93, IVES: false, ALAI: 0.52, CHAT: false, AIFD: false, SPRX: false, AOTG: 2 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 4, avgWeight: 3.73, proScore: 1.49, coverage: 0.4,
      price: 234.3, weeklyPrices: [246.00, 237.50, 244.39, 232.79, 234.30], weeklyChange: -4.76, dayChange: 0.65, sortRank: 0, periodReturns: { '1M': -12, 'YTD': 1.5, '6M': 0.9, '1Y': 12.4 },
      priceHistory: { '1D': [232.79, 234.71, 234.26, 236.59, 236.71, 236.43, 235.97, 234.36, 234.05, 233.49, 234.35, 234.76, 234.63, 234.76, 234.74, 234.44, 234.25, 234.25, 234.73, 235.28, 235.7, 234.63, 234.6, 234.3], '1W': [246, 237.5, 244.39, 232.79, 234.3], '1M': [265.29, 271.85, 274, 270.64, 261.26, 256.52, 250.02, 253.79, 246.03, 245.22, 244.19, 238, 241.51, 238.55, 246.02, 246, 237.5, 244.39, 232.79, 234.3], 'YTD': [230.82, 246.29, 236.65, 234.34, 241.73, 222.69, 204.08, 204.86, 207.92, 216.82, 212.65, 209.87, 211.71, 208.27, 221.25, 248.5, 255.36, 259.7, 273.55, 265.82, 264.86, 265.29, 256.52, 244.19, 246.02, 234.3], '6M': [232.14, 230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 199.6, 210.11, 210, 213.21, 207.67, 205.37, 199.34, 212.79, 239.89, 248.28, 261.12, 272.05, 272.68, 264.14, 266.32, 261.26, 245.22, 246.02, 234.3], '1Y': [208.47, 219.39, 219.36, 226.35, 227.47, 231.01, 213.75, 221.3, 231.49, 227.94, 225.34, 238.24, 234.05, 220.71, 219.57, 221.78, 216.39, 222.03, 229.25, 249.32, 248.4, 232.87, 226.28, 234.42, 227.92, 222.56, 232.14, 230.82, 246.29, 238.18, 239.16, 239.3, 222.69, 199.6, 210.11, 210, 213.21, 207.67, 205.37, 199.34, 212.79, 239.89, 248.28, 261.12, 272.05, 272.68, 264.14, 266.32, 261.26, 245.22, 246.02, 234.3] },
      velocityScore: { '1D': -3.2, '1W': -25.9, '1M': -50.8, '6M': null }, isNew: false,
      marketCap: '$2.5T', pe: 31.8, revenueGrowth: 17, eps: 7.36, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 4.17, ALAI: 5.27, CHAT: 2.13, AIFD: 3.36, SPRX: false, AOTG: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'ARM', name: 'ARM', easyScore: 4, avgWeight: 3.7, proScore: 1.48, coverage: 0.4,
      price: 364.49, weeklyPrices: [396.34, 418.88, 439.46, 407.72, 364.49], weeklyChange: -8.04, dayChange: -10.6, sortRank: 0, periodReturns: { '1M': 18.9, 'YTD': 233.4, '6M': 225.4, '1Y': 144.1 },
      priceHistory: { '1D': [407.72, 378.41, 383.6, 382.43, 377.74, 372.09, 372.15, 373.81, 371.04, 369.87, 370.32, 370.04, 371.99, 370.75, 369.51, 369.25, 372.08, 371.22, 370.11, 368.28, 371.05, 367.64, 364.35, 364.49], '1W': [396.34, 418.88, 439.46, 407.72, 364.49], '1M': [321.22, 302.71, 335.27, 353.29, 408.85, 402.71, 411.83, 393.44, 342.93, 346.39, 324.86, 307.43, 342.23, 380.81, 412.55, 396.34, 418.88, 439.46, 407.72, 364.49], 'YTD': [109.31, 113.08, 104.99, 119.2, 108.43, 110.88, 125.28, 126.93, 129.26, 124.11, 120.1, 128.36, 157.07, 151.28, 148.91, 159.34, 196.57, 198.65, 208.84, 207.92, 215.12, 321.22, 402.71, 324.86, 412.55, 364.49], '6M': [112.02, 109.31, 113.08, 105.11, 116.07, 105.36, 123.7, 122.19, 125.58, 127.45, 114.38, 115.75, 132.35, 144.13, 148.77, 157.58, 175.1, 215.88, 203.26, 213.27, 209.16, 306.51, 408.85, 346.39, 412.55, 364.49], '1Y': [149.33, 161.74, 147.79, 147.11, 156.5, 163.47, 137.23, 141.05, 141.06, 137.78, 132.34, 140.8, 153.85, 140.99, 141.49, 159.35, 168.16, 169.38, 173.09, 160.73, 154.84, 140.26, 134.71, 136.48, 141.93, 121.1, 112.02, 109.31, 113.08, 105.11, 116.07, 105.36, 110.88, 122.19, 125.58, 127.45, 114.38, 115.75, 132.35, 144.13, 148.77, 157.58, 175.1, 215.88, 203.26, 213.27, 209.16, 306.51, 408.85, 346.39, 412.55, 364.49] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$389B', pe: 423.8, revenueGrowth: 20, eps: 0.86, grossMargin: 98, dividendYield: null,
      etfPresence: { AIS: 2.4, ARTY: false, BAI: false, IGPT: false, IVES: false, ALAI: 0.52, CHAT: 2.84, AIFD: false, SPRX: 9.04, AOTG: false },
      tonyNote: 'Arm Holdings is held across Broad Tech and AI ETFs as the CPU architecture licensor embedded in every mobile device and increasingly in AI inference chips and data center CPUs. Revenue grew and the royalty model is high-margin; the weight score reflects consistent institutional positioning as the AI chip design ecosystem expands on Arm cores.',
    },
    {
      ticker: 'INTC', name: 'INTC', easyScore: 4, avgWeight: 3.22, proScore: 1.29, coverage: 0.4,
      price: 132.47, weeklyPrices: [117.05, 121.10, 133.99, 140.94, 132.47], weeklyChange: 13.17, dayChange: -6.01, sortRank: 0, periodReturns: { '1M': 10.5, 'YTD': 259, '6M': 264.4, '1Y': 525.1 },
      priceHistory: { '1D': [140.94, 132.23, 136.32, 137.38, 136.9, 136.14, 135.59, 135.99, 135.21, 135.44, 135.66, 135.94, 135.62, 135.13, 134.72, 133.58, 134.15, 133.78, 133.42, 133.2, 132.69, 132.95, 131.91, 132.47], '1W': [117.05, 121.1, 133.99, 140.94, 132.47], '1M': [123.52, 121.77, 120.89, 114.68, 109.33, 107.93, 112.71, 111.78, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94, 132.47], 'YTD': [36.9, 41.11, 48.72, 54.32, 48.66, 48.24, 48.29, 44.62, 45.46, 45.58, 47.98, 45.03, 47.18, 44.13, 58.95, 64.94, 65.27, 84.52, 108.15, 120.61, 108.17, 123.52, 107.93, 107.92, 127.86, 132.47], '6M': [36.35, 36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.48, 44.11, 45.61, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 124.92, 108.77, 119.84, 109.33, 110.27, 127.86, 132.47], '1Y': [21.19, 22.4, 23.59, 22.92, 23.24, 20.41, 20.19, 20.65, 23.66, 24.55, 24.21, 24.44, 25.27, 29.34, 33.55, 37.17, 35.63, 38.12, 41.53, 37.03, 38.45, 34.71, 35.79, 43.47, 40.5, 37.31, 36.35, 36.9, 41.11, 48.32, 45.07, 46.47, 48.24, 46.48, 44.11, 45.61, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 124.92, 108.77, 119.84, 109.33, 110.27, 127.86, 132.47] },
      velocityScore: { '1D': -15.1, '1W': -13.4, '1M': -55.5, '6M': null }, isNew: false,
      marketCap: '$666B', pe: null, revenueGrowth: 7, eps: -0.61, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.17, ARTY: false, BAI: 3.2, IGPT: 5.19, IVES: false, ALAI: false, CHAT: 1.31, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'VRT', name: 'VRT', easyScore: 4, avgWeight: 3.02, proScore: 1.21, coverage: 0.4,
      price: 317.48, weeklyPrices: [299.60, 317.58, 333.05, 357.96, 317.48], weeklyChange: 5.97, dayChange: -11.31, sortRank: 0, periodReturns: { '1M': -3, 'YTD': 96, '6M': 91, '1Y': 172.4 },
      priceHistory: { '1D': [357.96, 318.67, 324.51, 327.89, 327.3, 321.76, 320.64, 321.81, 321.04, 321.14, 322.91, 325.96, 326.3, 326.22, 324.78, 322.88, 324.33, 323.45, 321.88, 320.24, 320.85, 319.79, 317.04, 317.48], '1W': [299.6, 317.58, 333.05, 357.96, 317.48], '1M': [323.91, 319.78, 314.18, 315.71, 323.39, 334.49, 331.44, 323.92, 300.51, 300.57, 289.52, 280.98, 297.88, 302.87, 311.93, 299.6, 317.58, 333.05, 357.96, 317.48], 'YTD': [162.01, 160.78, 170.86, 181.12, 195.1, 177.75, 248.51, 243.06, 259.23, 251.28, 268.26, 264.71, 276.16, 250.58, 281.03, 301.16, 305.14, 305.03, 341.02, 367.13, 339.73, 323.91, 334.49, 289.52, 311.93, 317.48], '6M': [166.26, 162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 236.51, 243.75, 254.89, 241.78, 258.88, 255.88, 251.07, 258.73, 299.96, 314.41, 322.43, 330.97, 339.97, 370.94, 327.46, 323.39, 300.57, 311.93, 317.48], '1Y': [116.54, 128.41, 125.89, 127.37, 125.29, 142.7, 138.76, 139.83, 135.69, 125.02, 124.01, 125.58, 136.65, 142.61, 150.86, 158.87, 175.15, 174.8, 190.57, 180.82, 187.84, 166.65, 168.91, 180.91, 178.38, 160.66, 166.26, 162.01, 160.78, 172.54, 182.49, 186.18, 177.75, 236.51, 243.75, 254.89, 241.78, 258.88, 255.88, 251.07, 258.73, 299.96, 314.41, 322.43, 330.97, 339.97, 370.94, 327.46, 323.39, 300.57, 311.93, 317.48] },
      velocityScore: { '1D': 1.7, '1W': 5.2, '1M': -39.5, '6M': null }, isNew: false,
      marketCap: '$122B', pe: 80, revenueGrowth: 30, eps: 3.97, grossMargin: 37, dividendYield: 0.07,
      etfPresence: { AIS: 3.58, ARTY: false, BAI: 2, IGPT: false, IVES: false, ALAI: false, CHAT: 2.33, AIFD: 4.18, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 4, avgWeight: 2.78, proScore: 1.11, coverage: 0.4,
      price: 165.68, weeklyPrices: [188.33, 183.53, 184.29, 175.07, 165.68], weeklyChange: -12.03, dayChange: -5.36, sortRank: 0, periodReturns: { '1M': -13.7, 'YTD': -15, '6M': -15.2, '1Y': -20 },
      priceHistory: { '1D': [175.07, 172.94, 173.35, 173.33, 172.63, 171.86, 171.3, 170.16, 169.8, 169.16, 169.26, 169.1, 168.67, 168.45, 168.2, 168.25, 167.91, 167.9, 167.24, 166.37, 165.91, 165.75, 165.3, 165.68], '1W': [188.33, 183.53, 184.29, 175.07, 165.68], '1M': [193.06, 190.96, 203.7, 225.78, 248.15, 244.58, 230.33, 236.34, 213.68, 211.82, 205.81, 201.26, 184.1, 184.13, 192.64, 188.33, 183.53, 184.29, 175.07, 165.68], 'YTD': [194.91, 189.65, 193.61, 178.18, 169.01, 136.48, 157.16, 156.54, 150.31, 152.37, 163.12, 152.9, 146.02, 147.11, 143.66, 169.81, 187.5, 165.96, 185.35, 186.83, 186.61, 193.06, 244.58, 205.81, 192.64, 165.68], '6M': [195.34, 194.91, 189.65, 189.85, 177.16, 164.58, 142.82, 156.48, 148.08, 145.4, 152.96, 155.11, 149.68, 139.66, 145.54, 155.62, 177.58, 172.96, 180.29, 195.95, 192.95, 192.08, 248.15, 211.82, 192.64, 165.68], '1Y': [207.04, 218.63, 234.5, 234.96, 238.11, 249.98, 255.67, 252.68, 249.07, 235.41, 225.3, 241.51, 306.65, 313.83, 281.24, 284.24, 299, 275.15, 280.83, 248.17, 240.83, 219.86, 200.28, 201.1, 221.53, 188.65, 195.34, 194.91, 189.65, 189.85, 177.16, 164.58, 136.48, 156.48, 148.08, 145.4, 152.96, 155.11, 149.68, 139.66, 145.54, 155.62, 177.58, 172.96, 180.29, 195.95, 192.95, 192.08, 248.15, 211.82, 192.64, 165.68] },
      velocityScore: { '1D': -3.5, '1W': -6.7, '1M': -41, '6M': null }, isNew: false,
      marketCap: '$477B', pe: 28.4, revenueGrowth: 21, eps: 5.83, grossMargin: 66, dividendYield: 1.14,
      etfPresence: { AIS: false, ARTY: 3.51, BAI: false, IGPT: false, IVES: 3.49, ALAI: false, CHAT: 1.41, AIFD: false, SPRX: false, AOTG: 2.7 },
      tonyNote: 'Oracle lands in 3 AI ETFs on the strength of its cloud database and AI infrastructure contracts. Revenue grew 22%, 67% gross margin, P/E of 40x. The 17.5% weekly return following a major earnings beat shows how quickly sentiment can reprice; the weight score at 2.04% is still modest, meaning ETF managers have started building positions but conviction is not yet deep.',
    },
    {
      ticker: 'CRWV', name: 'COREWEAVE INC CLASS A', easyScore: 4, avgWeight: 2.72, proScore: 1.09, coverage: 0.4,
      price: 105.02, weeklyPrices: [117.03, 115.21, 117.95, 111.29, 105.02], weeklyChange: -10.26, dayChange: -5.63, sortRank: 0, periodReturns: { '1M': -0.4, 'YTD': 46.7, '6M': 30.8, '1Y': -39.5 },
      priceHistory: { '1D': [111.29, 105.73, 108.39, 110.96, 110.84, 109.5, 108.13, 106.92, 105.72, 105.84, 106.17, 107.56, 107.67, 107.04, 107.02, 106.87, 107.64, 107.99, 107.59, 106.65, 106.52, 106.22, 104.82, 105.02], '1W': [117.03, 115.21, 117.95, 111.29, 105.02], '1M': [105.89, 104.27, 106.86, 109.53, 124.82, 119.27, 110.93, 108.03, 100.39, 102.37, 98.45, 95.61, 95.74, 100.55, 106.71, 117.03, 115.21, 117.95, 111.29, 105.02], 'YTD': [71.61, 77.09, 89.8, 91.79, 99.53, 74.65, 95.15, 97.14, 97.63, 79.5, 81.96, 82.82, 87.58, 77.47, 88.9, 118.69, 122.54, 105.53, 127.89, 107.75, 103.77, 105.89, 119.27, 98.45, 106.71, 105.02], '6M': [80.26, 71.61, 77.09, 95.01, 92.98, 93.19, 89.95, 95.7, 89.25, 79.56, 72.99, 81.11, 81.47, 74.81, 80.94, 110.27, 117.43, 112.06, 125.43, 114.15, 107.3, 105.49, 124.82, 102.37, 106.71, 105.02], '1Y': [173.68, 163.06, 151.45, 140.59, 129.77, 108.74, 111.84, 139.78, 96.8, 92.38, 93.34, 100.22, 118.75, 130.89, 136.85, 128.83, 134.06, 125.06, 134.8, 115.75, 105.61, 75.33, 73.6, 76.03, 90.66, 69.5, 80.26, 71.61, 77.09, 95.01, 92.98, 93.19, 74.65, 95.7, 89.25, 79.56, 72.99, 81.11, 81.47, 74.81, 80.94, 110.27, 117.43, 112.06, 125.43, 114.15, 107.3, 105.49, 124.82, 102.37, 106.71, 105.02] },
      velocityScore: { '1D': -5.2, '1W': 6.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$57B', pe: null, revenueGrowth: 112, eps: -2.72, grossMargin: 69, dividendYield: null,
      etfPresence: { AIS: false, ARTY: 4.61, BAI: 1.3, IGPT: false, IVES: 2.31, ALAI: false, CHAT: 2.67, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'COREWEAVE INC CLASS A appears in 4 of 10 AI & ML ETFs (40% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 5.65, proScore: 5.65, coverage: 1,
      price: 1045.15, weeklyPrices: [1020.76, 1043.19, 1133.99, 1211.38, 1045.15], weeklyChange: 2.39, dayChange: -13.72, sortRank: 0, periodReturns: { '1M': 39.2, 'YTD': 266.2, '6M': 278.3, '1Y': 756.1 },
      priceHistory: { '1D': [1211.38, 1069, 1090.88, 1107.81, 1104.35, 1084.65, 1083.86, 1083.25, 1076.89, 1077.75, 1083.28, 1090.88, 1089.51, 1083.66, 1078.91, 1073.89, 1079.23, 1073.56, 1069, 1058.69, 1056.24, 1055.92, 1044.85, 1045.15], '1W': [1020.76, 1043.19, 1133.99, 1211.38, 1045.15], '1M': [895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1045.15], 'YTD': [285.41, 327.02, 333.35, 397.58, 435.79, 382.89, 410.34, 417.35, 415.56, 400.77, 418.69, 461.73, 382.09, 337.84, 406.73, 456.23, 487.48, 504.29, 640.2, 766.58, 681.54, 895.88, 1064.1, 935.89, 1087.99, 1045.15], '6M': [276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 746.81, 724.66, 751, 1035.5, 949.28, 1087.99, 1045.15], '1Y': [122.08, 123.25, 124.42, 120.11, 109.22, 111.96, 109.06, 123.72, 123.55, 116.42, 118.48, 135.24, 158.82, 166.41, 167.32, 185.69, 187.06, 202.29, 221.91, 218.03, 253.3, 241.95, 223.93, 239.49, 252.42, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 382.89, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 746.81, 724.66, 751, 1035.5, 949.28, 1087.99, 1045.15] },
      velocityScore: { '1D': 10.6, '1W': -10.3, '1M': -3.9, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 49.3, revenueGrowth: 196, eps: 21.2, grossMargin: 58, dividendYield: 0.05,
      etfPresence: { SOXX: 8.77, PSI: 5.94, XSD: 2.75, DRAM: 5.15 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 4.93, proScore: 3.7, coverage: 0.75,
      price: 515.16, weeklyPrices: [507.29, 512.48, 537.37, 551.63, 515.16], weeklyChange: 1.55, dayChange: -6.61, sortRank: 0, periodReturns: { '1M': 10.2, 'YTD': 140.5, '6M': 139.7, '1Y': 297.6 },
      priceHistory: { '1D': [551.63, 512.7, 523.87, 524.5, 523.05, 522.16, 520.34, 520.68, 517.78, 518.65, 520.79, 526.31, 526.54, 524.86, 521.1, 521.27, 524.5, 522.84, 521.27, 520.13, 519.47, 519.15, 515.64, 515.16], '1W': [507.29, 512.48, 537.37, 551.63, 515.16], '1M': [503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 515.16], 'YTD': [214.16, 204.68, 223.6, 253.73, 252.18, 192.5, 213.58, 203.37, 203.68, 202.07, 204.83, 199.46, 220.27, 203.43, 231.82, 258.12, 303.46, 323.21, 355.26, 448.29, 420.99, 503.89, 521.54, 475.51, 547.26, 515.16], '6M': [214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 205.94, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 455.19, 424.1, 467.51, 510.13, 490.33, 547.26, 515.16], '1Y': [129.58, 141.9, 137.82, 155.61, 154.72, 177.44, 174.31, 172.28, 176.14, 163.36, 162.32, 155.82, 160.46, 160.9, 161.79, 211.51, 218.09, 238.03, 258.01, 250.05, 243.98, 240.52, 215.05, 215.24, 221.62, 209.17, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 192.5, 205.94, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 455.19, 424.1, 467.51, 510.13, 490.33, 547.26, 515.16] },
      velocityScore: { '1D': 0.3, '1W': -17.6, '1M': -34.6, '6M': null }, isNew: false,
      marketCap: '$840B', pe: 172.9, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 7.51, PSI: 4.81, XSD: 2.47, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.65, proScore: 3.48, coverage: 0.75,
      price: 132.47, weeklyPrices: [117.05, 121.10, 133.99, 140.94, 132.47], weeklyChange: 13.17, dayChange: -6.01, sortRank: 0, periodReturns: { '1M': 10.5, 'YTD': 259, '6M': 264.4, '1Y': 525.1 },
      priceHistory: { '1D': [140.94, 132.23, 136.32, 137.38, 136.9, 136.14, 135.59, 135.99, 135.21, 135.44, 135.66, 135.94, 135.62, 135.13, 134.72, 133.58, 134.15, 133.78, 133.42, 133.2, 132.69, 132.95, 131.91, 132.47], '1W': [117.05, 121.1, 133.99, 140.94, 132.47], '1M': [123.52, 121.77, 120.89, 114.68, 109.33, 107.93, 112.71, 111.78, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94, 132.47], 'YTD': [36.9, 41.11, 48.72, 54.32, 48.66, 48.24, 48.29, 44.62, 45.46, 45.58, 47.98, 45.03, 47.18, 44.13, 58.95, 64.94, 65.27, 84.52, 108.15, 120.61, 108.17, 123.52, 107.93, 107.92, 127.86, 132.47], '6M': [36.35, 36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.48, 44.11, 45.61, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 124.92, 108.77, 119.84, 109.33, 110.27, 127.86, 132.47], '1Y': [21.19, 22.4, 23.59, 22.92, 23.24, 20.41, 20.19, 20.65, 23.66, 24.55, 24.21, 24.44, 25.27, 29.34, 33.55, 37.17, 35.63, 38.12, 41.53, 37.03, 38.45, 34.71, 35.79, 43.47, 40.5, 37.31, 36.35, 36.9, 41.11, 48.32, 45.07, 46.47, 48.24, 46.48, 44.11, 45.61, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 124.92, 108.77, 119.84, 109.33, 110.27, 127.86, 132.47] },
      velocityScore: { '1D': 2.4, '1W': -6.7, '1M': -9.4, '6M': null }, isNew: false,
      marketCap: '$666B', pe: null, revenueGrowth: 7, eps: -0.61, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 6.25, PSI: 5.02, XSD: 2.67, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 4.44, proScore: 3.33, coverage: 0.75,
      price: 200.55, weeklyPrices: [207.41, 204.65, 210.69, 208.65, 200.55], weeklyChange: -3.31, dayChange: -3.88, sortRank: 0, periodReturns: { '1M': -6.9, 'YTD': 7.5, '6M': 6, '1Y': 39.1 },
      priceHistory: { '1D': [208.65, 201.71, 203.41, 203.2, 203.06, 202.8, 202.63, 200.81, 200.52, 201.04, 201.91, 202.46, 202.28, 202.21, 202.15, 201.99, 202.65, 202.27, 202.16, 201.74, 201.67, 201.4, 200.73, 200.55], '1W': [207.41, 204.65, 210.69, 208.65, 200.55], '1M': [214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.55], 'YTD': [186.5, 185.04, 183.14, 184.84, 192.51, 171.88, 190.05, 187.9, 184.89, 183.04, 186.03, 180.4, 178.68, 174.4, 182.08, 198.87, 202.5, 213.17, 196.5, 220.78, 222.32, 214.86, 222.82, 208.19, 212.45, 200.55], '6M': [189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 186.94, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 215.2, 225.32, 215.33, 224.36, 208.64, 212.45, 200.55], '1Y': [144.17, 157.99, 160, 170.7, 167.03, 175.51, 178.26, 182.06, 182.01, 179.81, 170.78, 170.76, 174.88, 178.43, 186.58, 185.04, 180.03, 181.16, 201.03, 198.69, 199.05, 186.6, 182.55, 181.46, 184.97, 177.72, 189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 171.88, 186.94, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 215.2, 225.32, 215.33, 224.36, 208.64, 212.45, 200.55] },
      velocityScore: { '1D': -3.5, '1W': 14.8, '1M': -5.1, '6M': null }, isNew: false,
      marketCap: '$4.9T', pe: 30.7, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.48,
      etfPresence: { SOXX: 6.94, PSI: 4.27, XSD: 2.1, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.58, proScore: 2.68, coverage: 0.75,
      price: 404.58, weeklyPrices: [416.00, 414.45, 434.46, 445.48, 404.58], weeklyChange: -2.75, dayChange: -9.18, sortRank: 0, periodReturns: { '1M': 1.9, 'YTD': 49.2, '6M': 46.2, '1Y': 75.2 },
      priceHistory: { '1D': [445.48, 416.6, 417.19, 420.14, 417.1, 413.87, 412.52, 412.01, 411.17, 409.27, 410.73, 411.57, 410.4, 409.35, 408.67, 407.81, 409, 407.16, 407.01, 406.43, 405.95, 405.73, 405.08, 404.58], '1W': [416, 414.45, 434.46, 445.48, 404.58], '1M': [419.94, 416.88, 419.01, 413.85, 402.69, 423.2, 437.67, 428.76, 401.39, 403.89, 404.62, 392.67, 412.13, 417.79, 427.58, 416, 414.45, 434.46, 445.48, 404.58], 'YTD': [271.2, 299.16, 297.99, 308.52, 318.7, 322.12, 337, 345.3, 354.35, 341.51, 319.22, 308.59, 322.03, 318.14, 346.21, 347.94, 381.42, 383.26, 404.77, 419.65, 418.58, 419.94, 423.2, 404.62, 427.58, 404.58], '6M': [276.73, 271.2, 299.16, 302.1, 305.6, 310.88, 320.45, 331.36, 355.03, 355.79, 315.81, 306.07, 309.43, 307.44, 327.36, 350.01, 381.05, 392.59, 397.02, 416.52, 417.49, 397.07, 402.69, 403.89, 427.58, 404.58], '1Y': [230.98, 238.02, 245.15, 240.42, 235.5, 230.75, 220.68, 224.07, 231.55, 254.49, 248.32, 248.18, 244.1, 246.78, 245.7, 233.75, 235.4, 246.37, 239.35, 229.38, 232, 229.94, 239.4, 272.97, 276.24, 278.4, 276.73, 271.2, 299.16, 302.1, 305.6, 310.88, 322.12, 331.36, 355.03, 355.79, 315.81, 306.07, 309.43, 307.44, 327.36, 350.01, 381.05, 392.59, 397.02, 416.52, 417.49, 397.07, 402.69, 403.89, 427.58, 404.58] },
      velocityScore: { '1D': -0.4, '1W': 14.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$197B', pe: 60.1, revenueGrowth: 37, eps: 6.73, grossMargin: 64, dividendYield: 0.99,
      etfPresence: { SOXX: 3.78, PSI: 4.66, XSD: 2.29, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.6% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 5.6, proScore: 2.8, coverage: 0.5,
      price: 580.95, weeklyPrices: [568.23, 592.92, 617.11, 640.18, 580.95], weeklyChange: 2.24, dayChange: -9.25, sortRank: 0, periodReturns: { '1M': 34.4, 'YTD': 126.1, '6M': 123.2, '1Y': 237.8 },
      priceHistory: { '1D': [640.18, 577.26, 584.41, 590.32, 589.77, 585.44, 581.08, 581.58, 581.48, 579.42, 583.24, 587.1, 587.44, 585.47, 587.76, 587.31, 589.63, 589.65, 587.3, 586.37, 584.85, 584.03, 578.39, 580.95], '1W': [568.23, 592.92, 617.11, 640.18, 580.95], '1M': [454.89, 448.25, 449.68, 450.06, 458.17, 490.05, 500.77, 501.7, 453.01, 492.17, 499.21, 497.01, 552.64, 567.25, 585.78, 568.23, 592.92, 617.11, 640.18, 580.95], 'YTD': [256.99, 281.64, 301.89, 318.79, 341.34, 303.99, 339.88, 369.83, 375.72, 357.76, 351.07, 349.47, 369.34, 341.79, 385.72, 394.26, 403.48, 381.11, 410.82, 431.2, 413.57, 454.89, 490.05, 499.21, 585.78, 580.95], '6M': [260.23, 256.99, 281.64, 319.08, 322.38, 322.32, 322.51, 328.39, 375.38, 372.3, 324.74, 341.53, 357.06, 337.17, 352.62, 395.73, 391.62, 404.86, 391.38, 435.44, 436.62, 432.16, 458.17, 492.17, 585.78, 580.95], '1Y': [171.96, 183.07, 194.99, 199.29, 187.14, 188.41, 179.15, 184.38, 163.53, 161.99, 157.57, 163.5, 173.54, 200.87, 204.74, 211.56, 218.19, 226, 227.64, 230.19, 235.08, 228.71, 230.91, 265.33, 267.14, 258.84, 260.23, 256.99, 281.64, 319.08, 322.38, 322.32, 303.99, 328.39, 375.38, 372.3, 324.74, 341.53, 357.06, 337.17, 352.62, 395.73, 391.62, 404.86, 391.38, 435.44, 436.62, 432.16, 458.17, 492.17, 585.78, 580.95] },
      velocityScore: { '1D': 1.1, '1W': 0, '1M': -5.1, '6M': null }, isNew: false,
      marketCap: '$461B', pe: 54.7, revenueGrowth: 11, eps: 10.63, grossMargin: 49, dividendYield: 0.33,
      etfPresence: { SOXX: 5, PSI: 6.19, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 5.4, proScore: 2.7, coverage: 0.5,
      price: 242.79, weeklyPrices: [237.33, 238.73, 259.56, 269.16, 242.79], weeklyChange: 2.3, dayChange: -9.8, sortRank: 0, periodReturns: { '1M': 28.6, 'YTD': 99.8, '6M': 91.4, '1Y': 183.5 },
      priceHistory: { '1D': [269.16, 245.1, 244.9, 247.48, 245.91, 243.92, 242.56, 242.51, 242.62, 241.64, 242.55, 244.38, 245.77, 245.46, 245.67, 244.98, 246.8, 245.01, 244.7, 244.93, 243.76, 243.48, 243.08, 242.79], '1W': [237.33, 238.73, 259.56, 269.16, 242.79], '1M': [201.14, 195.72, 192.76, 192.17, 194, 204.52, 212.51, 213.11, 192.92, 210.81, 213.94, 213.56, 241.16, 254.54, 256.42, 237.33, 238.73, 259.56, 269.16, 242.79], 'YTD': [121.51, 132.46, 143.45, 150, 168.47, 133.1, 147.95, 146.99, 152.43, 147.59, 146.5, 148.24, 154.38, 147.24, 167.23, 174.81, 181.21, 180.9, 173.29, 181.13, 175.65, 201.14, 204.52, 213.94, 256.42, 242.79], '6M': [126.88, 121.51, 132.46, 154.5, 151.28, 142.79, 144.29, 145.09, 149.6, 152.46, 134.46, 141.86, 149.87, 144.32, 154.01, 176.88, 180.53, 190, 171.33, 186.92, 180.43, 188.84, 194, 210.81, 256.42, 242.79], '1Y': [85.63, 89.57, 91.92, 93.65, 89.22, 91.61, 88.34, 91.02, 88.34, 87.96, 84.64, 91.77, 99.06, 107.12, 107.86, 108.47, 102.57, 114.74, 120.6, 119.35, 121.79, 113.37, 113.67, 118.99, 122.56, 122.34, 126.88, 121.51, 132.46, 154.5, 151.28, 142.79, 133.1, 145.09, 149.6, 152.46, 134.46, 141.86, 149.87, 144.32, 154.01, 176.88, 180.53, 190, 171.33, 186.92, 180.43, 188.84, 194, 210.81, 256.42, 242.79] },
      velocityScore: { '1D': 0.7, '1W': 11.6, '1M': 3.4, '6M': null }, isNew: false,
      marketCap: '$317B', pe: 68.8, revenueGrowth: 12, eps: 3.53, grossMargin: 61, dividendYield: 0.34,
      etfPresence: { SOXX: 4.92, PSI: 5.88, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 5.05, proScore: 2.52, coverage: 0.5,
      price: 368.94, weeklyPrices: [369.34, 374.18, 389.04, 409.54, 368.94], weeklyChange: -0.11, dayChange: -9.91, sortRank: 0, periodReturns: { '1M': 20.8, 'YTD': 115.5, '6M': 110.6, '1Y': 302.7 },
      priceHistory: { '1D': [409.54, 366.88, 372.11, 374.3, 372.19, 369.81, 368.83, 368.02, 368.39, 367.98, 369.59, 372.1, 373.35, 372.53, 372.86, 371.83, 374.17, 372.54, 372.32, 371.51, 371.36, 370.68, 368.33, 368.94], '1W': [369.34, 374.18, 389.04, 409.54, 368.94], '1M': [322.68, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04, 409.54, 368.94], 'YTD': [171.18, 200.96, 208.79, 220.7, 248.17, 213.31, 235.12, 237.39, 239.07, 222.99, 218.87, 224.71, 233.45, 213.66, 246.49, 265.16, 265.55, 251.23, 275.8, 289.24, 277.96, 322.68, 334.41, 327.16, 388.92, 368.94], '6M': [175.16, 171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 231.29, 244.92, 233.89, 199.33, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 258.57, 294.05, 284.72, 305.35, 317.12, 324.45, 388.92, 368.94], '1Y': [91.61, 97.34, 99.83, 101.07, 97.69, 98.94, 96.68, 102, 98.88, 101.28, 97.03, 105.57, 120.47, 131.93, 133.9, 140.35, 138.31, 145.04, 155.62, 155.78, 166.37, 147.46, 150.38, 158.19, 165.81, 163.26, 175.16, 171.18, 200.96, 217.47, 217.94, 233.46, 213.31, 231.29, 244.92, 233.89, 199.33, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 258.57, 294.05, 284.72, 305.35, 317.12, 324.45, 388.92, 368.94] },
      velocityScore: { '1D': 2, '1W': 8.2, '1M': -5.6, '6M': null }, isNew: false,
      marketCap: '$461B', pe: 69.9, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.25,
      etfPresence: { SOXX: 4.52, PSI: 5.58, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 4.15, proScore: 2.07, coverage: 0.5,
      price: 379.98, weeklyPrices: [376.71, 392.90, 411.35, 392.13, 379.98], weeklyChange: 0.87, dayChange: -3.1, sortRank: 0, periodReturns: { '1M': -8.2, 'YTD': 9.8, '6M': 8.8, '1Y': 49.7 },
      priceHistory: { '1D': [392.13, 383.3, 389.36, 389.32, 387, 384.4, 383.05, 380.5, 379.95, 380.41, 380.8, 381.76, 382.97, 383.23, 383.36, 383.84, 384.66, 383.86, 382.77, 382.02, 382.36, 382.07, 381.11, 379.98], '1W': [376.71, 392.9, 411.35, 392.13, 379.98], '1M': [422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 379.98], 'YTD': [346.1, 332.48, 339.89, 325.49, 330.73, 310.51, 342.76, 333.99, 321.7, 317.53, 341.57, 315.93, 318.81, 309.51, 350.63, 396.72, 422.65, 399.83, 427.36, 419.3, 420.71, 422.01, 481.57, 392.16, 393.94, 379.98], '6M': [349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 331.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 430, 425.19, 414.14, 459.97, 396.6, 393.94, 379.98], '1Y': [253.77, 275.65, 271.8, 280.94, 278.59, 297.42, 292.93, 303.9, 305.76, 294.23, 298.24, 336.67, 360, 338.94, 329.91, 336.41, 344.13, 342.66, 372.97, 351.94, 358.39, 342.65, 377.96, 381.57, 406.29, 341.3, 349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 310.51, 331.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 430, 425.19, 414.14, 459.97, 396.6, 393.94, 379.98] },
      velocityScore: { '1D': -6.8, '1W': 15.6, '1M': -44.9, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 63.3, revenueGrowth: 48, eps: 6, grossMargin: 76, dividendYield: 0.66,
      etfPresence: { SOXX: 6.17, PSI: false, XSD: 2.13, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 3.87, proScore: 1.94, coverage: 0.5,
      price: 277.81, weeklyPrices: [278.67, 289.54, 310.58, 307.86, 277.81], weeklyChange: -0.31, dayChange: -9.76, sortRank: 0, periodReturns: { '1M': 41.5, 'YTD': 226.9, '6M': 216.8, '1Y': 292.5 },
      priceHistory: { '1D': [307.86, 279.48, 286.33, 290.09, 285.27, 283.73, 281.48, 281.65, 280.26, 280.55, 280.87, 282.74, 283.1, 282.48, 280.78, 279.81, 282.27, 281.54, 280.61, 278.92, 279.03, 279.05, 277.57, 277.81], '1W': [278.67, 289.54, 310.58, 307.86, 277.81], '1M': [208.26, 198.7, 204.83, 205, 219.43, 290.79, 301.65, 316.43, 263.47, 288.85, 266.88, 252.59, 280.71, 279.7, 308.88, 278.67, 289.54, 310.58, 307.86, 277.81], 'YTD': [84.98, 83.45, 81.21, 83.1, 81.34, 74.21, 81.34, 79.61, 79.29, 78.09, 90.44, 87.62, 98.45, 99.05, 114.45, 134.6, 157.32, 153.23, 168.75, 164.5, 168.93, 208.26, 290.79, 266.88, 308.88, 277.81], '6M': [87.68, 84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.23, 79.48, 81.69, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 163.66, 170.13, 176.89, 196.33, 219.43, 288.85, 308.88, 277.81], '1Y': [70.78, 77.4, 71.95, 72.41, 71.99, 76.34, 76.63, 77.28, 76.74, 72.95, 64.6, 66.84, 68.86, 74.62, 84.07, 86.97, 86.22, 84.26, 88.46, 87.59, 93.23, 83.45, 83.79, 92.89, 88.9, 84.07, 87.68, 84.98, 83.45, 80.38, 80.23, 78.92, 74.21, 78.23, 79.48, 81.69, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 163.66, 170.13, 176.89, 196.33, 219.43, 288.85, 308.88, 277.81] },
      velocityScore: { '1D': -2.5, '1W': -41.9, '1M': -42.8, '6M': null }, isNew: false,
      marketCap: '$243B', pe: 95.1, revenueGrowth: 28, eps: 2.92, grossMargin: 52, dividendYield: 0.08,
      etfPresence: { SOXX: 5.28, PSI: false, XSD: 2.47, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 3.1, proScore: 1.55, coverage: 0.5,
      price: 302.06, weeklyPrices: [305.71, 301.88, 322.86, 332.28, 302.06], weeklyChange: -1.19, dayChange: -9.09, sortRank: 0, periodReturns: { '1M': -2.3, 'YTD': 74.1, '6M': 70.6, '1Y': 50 },
      priceHistory: { '1D': [332.28, 309.2, 309.91, 310.71, 308.1, 305.71, 305.65, 305.12, 304.17, 303.64, 304.75, 306.01, 304.97, 303.99, 303.99, 303.27, 304.45, 303.56, 302.93, 302.57, 301.92, 302.11, 301.94, 302.06], '1W': [305.71, 301.88, 322.86, 332.28, 302.06], '1M': [324.89, 317.45, 315.95, 305.68, 293.2, 308.12, 308.59, 305.37, 285.06, 290.9, 288.63, 282.01, 297.1, 301.12, 313.34, 305.71, 301.88, 322.86, 332.28, 302.06], 'YTD': [173.49, 188.45, 193.45, 194.99, 218.97, 223.98, 226.56, 218.05, 212.63, 202.39, 198.67, 190.78, 196.77, 194.14, 208.9, 216.29, 236.31, 265, 281, 295.17, 300.6, 324.89, 308.12, 288.63, 313.34, 302.06], '6M': [177.08, 173.49, 188.45, 189.12, 193.31, 215.55, 221.44, 223, 219.73, 212.11, 193.23, 190.78, 187.19, 190.33, 199.42, 216.71, 233.7, 269.5, 280.89, 287.8, 302.73, 309.21, 293.2, 290.9, 313.34, 302.06], '1Y': [201.39, 207.62, 216.63, 218.36, 214.92, 191.38, 185.4, 183.71, 194.33, 205.97, 199.81, 185.03, 177.63, 182.04, 183.73, 177.05, 173.94, 180.84, 166.91, 159.36, 160.58, 154.99, 161.26, 175.26, 179.52, 177.56, 177.08, 173.49, 188.45, 189.12, 193.31, 215.55, 223.98, 223, 219.73, 212.11, 193.23, 190.78, 187.19, 190.33, 199.42, 216.71, 233.7, 269.5, 280.89, 287.8, 302.73, 309.21, 293.2, 290.9, 313.34, 302.06] },
      velocityScore: { '1D': 0.6, '1W': 11.5, '1M': -50.8, '6M': null }, isNew: false,
      marketCap: '$275B', pe: 51.6, revenueGrowth: 19, eps: 5.85, grossMargin: 57, dividendYield: 1.71,
      etfPresence: { SOXX: 3.82, PSI: false, XSD: 2.38, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.91, proScore: 1.45, coverage: 0.5,
      price: 296.94, weeklyPrices: [302.89, 298.20, 313.27, 323.24, 296.94], weeklyChange: -1.96, dayChange: -8.13, sortRank: 0, periodReturns: { '1M': -6.2, 'YTD': 36.8, '6M': 31.4, '1Y': 40.8 },
      priceHistory: { '1D': [323.24, 304.53, 305.17, 305.86, 303.93, 300.99, 299.19, 299.87, 299.8, 299.89, 300.71, 301.04, 300.89, 300.15, 299.6, 299.24, 300.49, 298.93, 298.3, 298.84, 298.3, 298.12, 297.5, 296.94], '1W': [302.89, 298.2, 313.27, 323.24, 296.94], '1M': [332.67, 329.24, 330.28, 321.35, 311.38, 323.62, 321.88, 322.22, 295.96, 301.14, 297.41, 285.56, 302.55, 304.86, 315.88, 302.89, 298.2, 313.27, 323.24, 296.94], 'YTD': [217.06, 237.89, 240.81, 236.75, 233.5, 222.13, 249.75, 232.11, 232.23, 216.37, 199.87, 192.69, 197.61, 196.86, 204.27, 209.39, 225.75, 230.39, 292.35, 294.23, 291.68, 332.67, 323.62, 297.41, 315.88, 296.94], '6M': [225.98, 217.06, 237.89, 238.6, 232.48, 226.14, 224.32, 242.19, 232.27, 227.01, 201.74, 190.86, 191.37, 191.66, 197.08, 208, 221.34, 236.87, 290.76, 294.75, 291.5, 316.47, 311.38, 301.14, 315.88, 296.94], '1Y': [210.86, 218.49, 232.34, 221.06, 228, 226.74, 208.47, 205.16, 232.01, 236.67, 232.66, 223.69, 220.99, 225.62, 227.73, 219.58, 216.11, 222.34, 212.96, 204.42, 205.13, 190.51, 191.56, 215.35, 228.05, 229.75, 225.98, 217.06, 237.89, 238.6, 232.48, 226.14, 222.13, 242.19, 232.27, 227.01, 201.74, 190.86, 191.37, 191.66, 197.08, 208, 221.34, 236.87, 290.76, 294.75, 291.5, 316.47, 311.38, 301.14, 315.88, 296.94] },
      velocityScore: { '1D': 0.7, '1W': 7.4, '1M': -30.3, '6M': null }, isNew: false,
      marketCap: '$75B', pe: 28.4, revenueGrowth: 12, eps: 10.47, grossMargin: 56, dividendYield: 1.25,
      etfPresence: { SOXX: 3.53, PSI: false, XSD: 2.29, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 2.73, proScore: 1.37, coverage: 0.5,
      price: 202.32, weeklyPrices: [214.07, 212.97, 226.11, 221.90, 202.32], weeklyChange: -5.49, dayChange: -8.82, sortRank: 0, periodReturns: { '1M': -15, 'YTD': 18.3, '6M': 15.8, '1Y': 32.1 },
      priceHistory: { '1D': [221.9, 202.55, 207.71, 207.2, 205.57, 201.93, 199.61, 199.63, 199.05, 199.48, 202.46, 204.01, 203.35, 203.03, 201.6, 201.52, 202.99, 202.31, 201.97, 201.93, 202.26, 203.33, 202.23, 202.32], '1W': [214.07, 212.97, 226.11, 221.9, 202.32], '1M': [248.82, 233.4, 243.29, 251.02, 228.99, 240.84, 250.01, 242.57, 215.94, 217.77, 205.42, 191.2, 202.96, 211.72, 220.81, 214.07, 212.97, 226.11, 221.9, 202.32], 'YTD': [171.05, 181.87, 164.54, 157.8, 152.22, 136.3, 141.04, 141.27, 145.59, 139.51, 134.12, 130.47, 130.35, 128.78, 127.51, 133.05, 136.07, 150, 186.55, 210.31, 203.64, 248.82, 240.84, 205.42, 220.81, 202.32], '6M': [174.75, 171.05, 181.87, 161.39, 155.82, 151.59, 137.34, 138.47, 142.88, 142.36, 135.69, 129.82, 129.9, 127.11, 125.73, 131.24, 137.52, 150.26, 168.38, 219.09, 201.49, 238.16, 228.99, 217.77, 220.81, 202.32], '1Y': [153.14, 159.26, 159.45, 154.3, 157.99, 162.08, 146.71, 147.97, 158.9, 156.42, 158.78, 158.66, 164.14, 169.53, 166.36, 165.46, 161.74, 168.83, 181.03, 172.84, 171.57, 166.75, 165.06, 170.7, 176, 176.12, 174.75, 171.05, 181.87, 161.39, 155.82, 151.59, 136.3, 138.47, 142.88, 142.36, 135.69, 129.82, 129.9, 127.11, 125.73, 131.24, 137.52, 150.26, 168.38, 219.09, 201.49, 238.16, 228.99, 217.77, 220.81, 202.32] },
      velocityScore: { '1D': -3.5, '1W': -6.2, '1M': -40.7, '6M': null }, isNew: false,
      marketCap: '$213B', pe: 21.8, revenueGrowth: -4, eps: 9.3, grossMargin: 55, dividendYield: 1.66,
      etfPresence: { SOXX: 3.11, PSI: false, XSD: 2.35, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 2.69, proScore: 1.35, coverage: 0.5,
      price: 394.48, weeklyPrices: [361.71, 374.68, 417.07, 439.66, 394.48], weeklyChange: 9.06, dayChange: -10.28, sortRank: 0, periodReturns: { '1M': 28.5, 'YTD': 137.1, '6M': 133.7, '1Y': 359 },
      priceHistory: { '1D': [439.66, 406.57, 415.79, 415.41, 409.61, 402.77, 404.69, 404.32, 399.26, 401.48, 403.05, 404.64, 405.61, 403.12, 400.88, 399.9, 403.37, 402.22, 401.74, 400.16, 397.3, 398.27, 395.2, 394.48], '1W': [361.71, 374.68, 417.07, 439.66, 394.48], '1M': [318.72, 325.33, 349.17, 342.85, 320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 361.71, 374.68, 417.07, 439.66, 394.48], 'YTD': [166.36, 156.73, 172.14, 176.35, 160.46, 142.82, 143.71, 132.62, 124.67, 113.77, 124.71, 126.34, 120.33, 109.6, 125.46, 172.09, 194.06, 183.31, 215.69, 204.42, 215.58, 318.72, 355.76, 341.7, 389.2, 394.48], '6M': [168.83, 166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 126.58, 129.68, 118.83, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 199.79, 232.68, 306.88, 320.09, 346.33, 389.2, 394.48], '1Y': [85.95, 90.42, 92.3, 92.36, 116.91, 118.41, 135.54, 179.43, 186.43, 174.15, 174.24, 214.49, 238.79, 230.11, 195.8, 212.1, 161.55, 157.51, 168.25, 179.31, 173.74, 141.39, 147.75, 142.94, 167.08, 144.94, 168.83, 166.36, 156.73, 174.45, 169.66, 150.62, 142.82, 126.58, 129.68, 118.83, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 199.79, 232.68, 306.88, 320.09, 346.33, 389.2, 394.48] },
      velocityScore: { '1D': 3.8, '1W': -22.4, '1M': -36.6, '6M': null }, isNew: false,
      marketCap: '$68B', pe: 264.8, revenueGrowth: 93, eps: 1.49, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.69, PSI: false, XSD: 2.69, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.64, proScore: 1.32, coverage: 0.5,
      price: 1416.3, weeklyPrices: [1498.77, 1448.21, 1563.70, 1537.88, 1416.30], weeklyChange: -5.5, dayChange: -7.91, sortRank: 0, periodReturns: { '1M': -10.9, 'YTD': 56.3, '6M': 50.1, '1Y': 104.5 },
      priceHistory: { '1D': [1537.88, 1453, 1475.94, 1474.69, 1459.1, 1443, 1438.13, 1430.23, 1425.22, 1421.1, 1430.34, 1432.24, 1430.2, 1424.17, 1422.45, 1415.06, 1422.76, 1412.97, 1410.8, 1407.02, 1410.33, 1410, 1413.84, 1416.3], '1W': [1498.77, 1448.21, 1563.7, 1537.88, 1416.3], '1M': [1662.98, 1620.17, 1633.17, 1566.21, 1542.39, 1624.99, 1689.89, 1652.6, 1481.05, 1559.18, 1531.98, 1473.04, 1589.55, 1577.32, 1652.29, 1498.77, 1448.21, 1563.7, 1537.88, 1416.3], 'YTD': [906.36, 959.09, 983.6, 1076.67, 1183.15, 1155.99, 1196.73, 1175.22, 1180.13, 1099.02, 1071.09, 1075.29, 1118.66, 1093.35, 1312.94, 1353, 1522.04, 1504.08, 1588.12, 1599.52, 1486.33, 1662.98, 1624.99, 1531.98, 1652.29, 1416.3], '6M': [943.55, 906.36, 959.09, 1009.54, 1063.74, 1124.15, 1229.82, 1155.93, 1204.1, 1142.74, 1023.16, 1052.59, 1068.85, 1053.01, 1180.03, 1372.23, 1490.86, 1587.57, 1573.3, 1600.84, 1550.02, 1589.81, 1542.39, 1559.18, 1652.29, 1416.3], '1Y': [692.62, 731.38, 761.31, 717.62, 719.98, 724.37, 802.78, 797.51, 850.31, 837.86, 823.65, 857.87, 857.02, 914.27, 920.64, 945.49, 968.25, 1028.67, 1086.36, 957.87, 976.31, 897.01, 892.97, 952.18, 962.95, 951.36, 943.55, 906.36, 959.09, 1009.54, 1063.74, 1124.15, 1155.99, 1155.93, 1204.1, 1142.74, 1023.16, 1052.59, 1068.85, 1053.01, 1180.03, 1372.23, 1490.86, 1587.57, 1573.3, 1600.84, 1550.02, 1589.81, 1542.39, 1559.18, 1652.29, 1416.3] },
      velocityScore: { '1D': -3.6, '1W': -2.9, '1M': -37.1, '6M': null }, isNew: false,
      marketCap: '$70B', pe: 101.2, revenueGrowth: 26, eps: 13.99, grossMargin: 55, dividendYield: 0.52,
      etfPresence: { SOXX: 3.18, PSI: false, XSD: 2.11, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.39, proScore: 1.19, coverage: 0.5,
      price: 268.55, weeklyPrices: [239.18, 249.33, 271.83, 302.52, 268.55], weeklyChange: 12.28, dayChange: -11.24, sortRank: 0, periodReturns: { '1M': 23, 'YTD': 86.6, '6M': 81.7, '1Y': 217.5 },
      priceHistory: { '1D': [302.52, 269.4, 274.46, 274.21, 271.32, 267.7, 268.2, 268.7, 266.8, 269.18, 272.82, 274.73, 271.95, 271.46, 270.29, 269.01, 271.21, 270.59, 269.74, 268.7, 269.03, 270.28, 268.03, 268.55], '1W': [239.18, 249.33, 271.83, 302.52, 268.55], '1M': [221.64, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 217.5, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83, 302.52, 268.55], 'YTD': [143.89, 141.59, 156.84, 135.1, 129.47, 98.06, 128.4, 130.66, 114.48, 102.54, 115.91, 101.72, 103.91, 93.87, 110.21, 168.35, 189.49, 165.92, 193.57, 198.57, 156.27, 221.64, 229, 234.32, 259.41, 268.55], '6M': [147.81, 143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.78, 124.06, 112.27, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 188.51, 172.17, 218.41, 226.1, 222.27, 259.41, 268.55], '1Y': [84.57, 92.59, 93.36, 102.59, 92.93, 109.38, 110.29, 118.57, 118.74, 115.41, 124.27, 149.03, 164.42, 162.26, 145.61, 137.2, 129.75, 144.17, 162.18, 164.23, 170.16, 145.58, 150.85, 188.44, 170.29, 140.34, 147.81, 143.89, 141.59, 149.12, 133.16, 125.28, 98.06, 121.78, 124.06, 112.27, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 188.51, 172.17, 218.41, 226.1, 222.27, 259.41, 268.55] },
      velocityScore: { '1D': 9.2, '1W': -7.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$50B', pe: 107, revenueGrowth: 157, eps: 2.51, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 2.19, PSI: false, XSD: 2.58, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.38, proScore: 1.19, coverage: 0.5,
      price: 92.83, weeklyPrices: [95.63, 94.11, 99.77, 102.71, 92.83], weeklyChange: -2.93, dayChange: -9.62, sortRank: 0, periodReturns: { '1M': -0.6, 'YTD': 45.7, '6M': 42.1, '1Y': 35.4 },
      priceHistory: { '1D': [102.71, 95.86, 96.55, 96.83, 96.15, 95.2, 94.89, 94.89, 94.47, 94.37, 94.56, 94.79, 94.56, 94.12, 94, 93.69, 94.09, 93.64, 93.48, 93.31, 93.28, 93.3, 92.86, 92.83], '1W': [95.63, 94.11, 99.77, 102.71, 92.83], '1M': [98.05, 96.85, 96.04, 94.65, 91.52, 96.96, 96.55, 96.3, 88.34, 91.37, 91.47, 87.91, 92.94, 95.24, 100.32, 95.63, 94.11, 99.77, 102.71, 92.83], 'YTD': [63.72, 73.53, 74.68, 75.47, 79.36, 78.04, 80.75, 77.16, 74.97, 69.9, 65.79, 64.71, 65.16, 64.61, 70.73, 74.49, 82.48, 84.26, 98.48, 97.7, 92.76, 98.05, 96.96, 91.47, 100.32, 92.83], '6M': [65.35, 63.72, 73.53, 74.45, 74.71, 75.92, 76.01, 78.92, 77.73, 74.64, 64.77, 61.94, 62.97, 62, 67.22, 73.55, 80.39, 86.84, 95.3, 99.09, 93.85, 93.43, 91.52, 91.37, 100.32, 92.83], '1Y': [68.58, 70.37, 74.56, 73.11, 75.26, 70.68, 67.13, 60.95, 65.56, 68.55, 63.6, 64.76, 64.45, 64.71, 64.22, 64.96, 64.6, 67.52, 63.64, 59.5, 55.41, 51.7, 51.25, 56.71, 66.85, 65.9, 65.35, 63.72, 73.53, 74.45, 74.71, 75.92, 78.04, 78.92, 77.73, 74.64, 64.77, 61.94, 62.97, 62, 67.22, 73.55, 80.39, 86.84, 95.3, 99.09, 93.85, 93.43, 91.52, 91.37, 100.32, 92.83] },
      velocityScore: { '1D': 0.8, '1W': 2.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$50B', pe: 422, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 1.77,
      etfPresence: { SOXX: 2.39, PSI: false, XSD: 2.37, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 2.33, proScore: 1.16, coverage: 0.5,
      price: 116.75, weeklyPrices: [118.25, 112.92, 121.62, 131.55, 116.75], weeklyChange: -1.27, dayChange: -11.25, sortRank: 0, periodReturns: { '1M': 0.5, 'YTD': 115.6, '6M': 109.6, '1Y': 119.6 },
      priceHistory: { '1D': [131.55, 120.69, 121.02, 121.61, 119.61, 118.72, 118.48, 118.5, 118.09, 117.82, 118.34, 119.16, 119.12, 118.87, 118.73, 118.29, 118.83, 117.93, 117.53, 117.94, 117.61, 117.56, 116.89, 116.75], '1W': [118.25, 112.92, 121.62, 131.55, 116.75], '1M': [127, 124.89, 123.77, 120.62, 120.92, 128.64, 133.93, 131.82, 117.26, 120.9, 117, 110.17, 115.96, 116.79, 125.9, 118.25, 112.92, 121.62, 131.55, 116.75], 'YTD': [54.15, 60.89, 60.58, 63.07, 62.2, 63.1, 71.18, 68.09, 68.16, 62.53, 59.24, 60.46, 63.1, 61.92, 68.38, 72.43, 88.99, 93.3, 102.67, 104.11, 109.43, 127, 128.64, 117, 125.9, 116.75], '6M': [55.69, 54.15, 60.89, 60.28, 61.98, 59.89, 65.2, 70.63, 69.11, 66.48, 56.87, 58.55, 59.26, 58.35, 63.49, 71.02, 85.56, 98.04, 102.04, 103.2, 113.11, 116.2, 120.92, 120.9, 125.9, 116.75], '1Y': [53.17, 52.41, 57.62, 58.93, 62.45, 58.38, 47.24, 47.1, 50.53, 50.95, 48.94, 48.62, 49.56, 50.42, 49.31, 48.17, 49.54, 55.08, 51.8, 48.28, 48.54, 46.02, 47.39, 51.48, 55.23, 54.56, 55.69, 54.15, 60.89, 60.28, 61.98, 59.89, 63.1, 70.63, 69.11, 66.48, 56.87, 58.55, 59.26, 58.35, 63.49, 71.02, 85.56, 98.04, 102.04, 103.2, 113.11, 116.2, 120.92, 120.9, 125.9, 116.75] },
      velocityScore: { '1D': 5.5, '1W': -12.8, '1M': -38, '6M': null }, isNew: false,
      marketCap: '$45B', pe: 86.5, revenueGrowth: 5, eps: 1.35, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 2.24, PSI: false, XSD: 2.41, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 2, avgWeight: 1.73, proScore: 0.86, coverage: 0.5,
      price: 367.36, weeklyPrices: [368.32, 367.11, 391.41, 396.26, 367.36], weeklyChange: -0.26, dayChange: -7.29, sortRank: 0, periodReturns: { '1M': -4.8, 'YTD': 114.5, '6M': 108.4, '1Y': 165 },
      priceHistory: { '1D': [396.26, 372.73, 377.04, 379.48, 376.07, 371.35, 371.85, 373.43, 368.95, 369.2, 371.54, 372.13, 373.59, 372.89, 372.79, 370.49, 373.33, 370.92, 370, 371.07, 368.98, 368.74, 367.58, 367.36], '1W': [368.32, 367.11, 391.41, 396.26, 367.36], '1M': [409.68, 400.66, 391.09, 364.64, 353.79, 382.35, 390.34, 382.74, 345.4, 361.86, 358.72, 354.4, 374.76, 379.87, 384.77, 368.32, 367.11, 391.41, 396.26, 367.36], 'YTD': [171.28, 167.66, 215.01, 224.29, 227.73, 227.8, 236.94, 242.56, 247.11, 239, 222.55, 218.89, 245.04, 222.07, 247, 261.16, 277, 265.61, 303.57, 362.76, 356.25, 409.68, 382.35, 358.72, 384.77, 367.36], '6M': [176.28, 171.28, 167.66, 218.93, 219.26, 219.06, 235.87, 238.99, 243.59, 248.12, 207.51, 217.8, 218.96, 225.44, 233.04, 263.63, 281.08, 279.44, 291.72, 359.88, 375.6, 385.98, 353.79, 361.86, 384.77, 367.36], '1Y': [138.65, 143.29, 137.37, 137.3, 136.76, 140.02, 137.28, 118.35, 124.55, 126.69, 131.05, 129.79, 131.18, 128.8, 124.49, 127.97, 131.54, 139.41, 147.88, 144.13, 178.42, 159.83, 165.97, 177.91, 188.08, 175.69, 176.28, 171.28, 167.66, 218.93, 219.26, 219.06, 227.8, 238.99, 243.59, 248.12, 207.51, 217.8, 218.96, 225.44, 233.04, 263.63, 281.08, 279.44, 291.72, 359.88, 375.6, 385.98, 353.79, 361.86, 384.77, 367.36] },
      velocityScore: { '1D': -1.1, '1W': -6.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$28B', pe: 157, revenueGrowth: 23, eps: 2.34, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: 1.2, PSI: false, XSD: 2.26, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RMBS', name: 'RAMBUS INC', easyScore: 2, avgWeight: 1.36, proScore: 0.68, coverage: 0.5,
      price: 127.45, weeklyPrices: [132.48, 130.10, 141.17, 140.35, 127.45], weeklyChange: -3.8, dayChange: -9.19, sortRank: 0, periodReturns: { '1M': -10.9, 'YTD': 38.7, '6M': 35.3, '1Y': 112.4 },
      priceHistory: { '1D': [140.35, 130.21, 131.86, 132.31, 131.66, 129.9, 129.68, 130.25, 129.44, 129.62, 130.15, 130.63, 130.14, 129.24, 128.89, 128.75, 129.78, 129.2, 128.61, 128.72, 128.42, 128.09, 127.97, 127.45], '1W': [132.48, 130.1, 141.17, 140.35, 127.45], '1M': [157.23, 148.66, 148.02, 145.46, 147.48, 166.78, 170.66, 169.35, 145.31, 152.03, 146.84, 138.12, 144.47, 146.56, 143.29, 132.48, 130.1, 141.17, 140.35, 127.45], 'YTD': [91.89, 91.34, 100.62, 124.77, 121.6, 98.1, 99.38, 104.13, 102.17, 92.04, 92.53, 93.32, 95.93, 86.03, 101.43, 120.02, 131.55, 111.27, 118, 130.28, 123.76, 157.23, 166.78, 146.84, 143.29, 127.45], '6M': [94.19, 91.89, 91.34, 103.07, 115.31, 113.83, 107.1, 95.8, 102.64, 99.66, 88.12, 94.01, 91.7, 89.73, 92.22, 113.16, 126.87, 141.31, 111.5, 129.25, 127.05, 142.98, 147.48, 152.03, 143.29, 127.45], '1Y': [60, 64.02, 65.18, 64.53, 66.61, 73.15, 73.79, 72.77, 75.77, 73.3, 73.49, 74.55, 97.05, 102.62, 104.2, 96.84, 94.85, 97.51, 103.72, 100.32, 110.6, 91.13, 92.75, 96.21, 104.71, 94.69, 94.19, 91.89, 91.34, 103.07, 115.31, 113.83, 98.1, 95.8, 102.64, 99.66, 88.12, 94.01, 91.7, 89.73, 92.22, 113.16, 126.87, 141.31, 111.5, 129.25, 127.05, 142.98, 147.48, 152.03, 143.29, 127.45] },
      velocityScore: { '1D': -2.9, '1W': -6.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$14B', pe: 60.4, revenueGrowth: 8, eps: 2.11, grossMargin: 80, dividendYield: null,
      etfPresence: { SOXX: 0.66, PSI: false, XSD: 2.05, DRAM: false },
      tonyNote: 'RAMBUS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 10, avgWeight: 5.63, proScore: 3.31, coverage: 0.588,
      price: 200.55, weeklyPrices: [207.41, 204.65, 210.69, 208.65, 200.55], weeklyChange: -3.31, dayChange: -3.88, sortRank: 0, periodReturns: { '1M': -6.9, 'YTD': 7.5, '6M': 6, '1Y': 39.1 },
      priceHistory: { '1D': [208.65, 201.71, 203.41, 203.2, 203.06, 202.8, 202.63, 200.81, 200.52, 201.04, 201.91, 202.46, 202.28, 202.21, 202.15, 201.99, 202.65, 202.27, 202.16, 201.74, 201.67, 201.4, 200.73, 200.55], '1W': [207.41, 204.65, 210.69, 208.65, 200.55], '1M': [214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.55], 'YTD': [186.5, 185.04, 183.14, 184.84, 192.51, 171.88, 190.05, 187.9, 184.89, 183.04, 186.03, 180.4, 178.68, 174.4, 182.08, 198.87, 202.5, 213.17, 196.5, 220.78, 222.32, 214.86, 222.82, 208.19, 212.45, 200.55], '6M': [189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 186.94, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 215.2, 225.32, 215.33, 224.36, 208.64, 212.45, 200.55], '1Y': [144.17, 157.99, 160, 170.7, 167.03, 175.51, 178.26, 182.06, 182.01, 179.81, 170.78, 170.76, 174.88, 178.43, 186.58, 185.04, 180.03, 181.16, 201.03, 198.69, 199.05, 186.6, 182.55, 181.46, 184.97, 177.72, 189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 171.88, 186.94, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 215.2, 225.32, 215.33, 224.36, 208.64, 212.45, 200.55] },
      velocityScore: { '1D': 0.3, '1W': 45.8, '1M': -31.5, '6M': null }, isNew: false,
      marketCap: '$4.9T', pe: 30.7, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.48,
      etfPresence: { PTF: 4.07, WCLD: false, IGV: false, FDTX: 4.62, GTEK: false, ARKK: 1.68, MARS: false, FRWD: 8.23, BCTK: 5.77, FWD: 1.91, CBSE: false, FCUS: false, WGMI: 1.94, CNEQ: 13.68, SGRT: 6.44, SPMO: 7.94, XMMO: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 5.92, proScore: 3.13, coverage: 0.529,
      price: 1045.15, weeklyPrices: [1020.76, 1043.19, 1133.99, 1211.38, 1045.15], weeklyChange: 2.39, dayChange: -13.72, sortRank: 0, periodReturns: { '1M': 39.2, 'YTD': 266.2, '6M': 278.3, '1Y': 756.1 },
      priceHistory: { '1D': [1211.38, 1069, 1090.88, 1107.81, 1104.35, 1084.65, 1083.86, 1083.25, 1076.89, 1077.75, 1083.28, 1090.88, 1089.51, 1083.66, 1078.91, 1073.89, 1079.23, 1073.56, 1069, 1058.69, 1056.24, 1055.92, 1044.85, 1045.15], '1W': [1020.76, 1043.19, 1133.99, 1211.38, 1045.15], '1M': [895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1045.15], 'YTD': [285.41, 327.02, 333.35, 397.58, 435.79, 382.89, 410.34, 417.35, 415.56, 400.77, 418.69, 461.73, 382.09, 337.84, 406.73, 456.23, 487.48, 504.29, 640.2, 766.58, 681.54, 895.88, 1064.1, 935.89, 1087.99, 1045.15], '6M': [276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 746.81, 724.66, 751, 1035.5, 949.28, 1087.99, 1045.15], '1Y': [122.08, 123.25, 124.42, 120.11, 109.22, 111.96, 109.06, 123.72, 123.55, 116.42, 118.48, 135.24, 158.82, 166.41, 167.32, 185.69, 187.06, 202.29, 221.91, 218.03, 253.3, 241.95, 223.93, 239.49, 252.42, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 382.89, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 746.81, 724.66, 751, 1035.5, 949.28, 1087.99, 1045.15] },
      velocityScore: { '1D': 5, '1W': 37.3, '1M': 20.4, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 49.3, revenueGrowth: 196, eps: 21.2, grossMargin: 58, dividendYield: 0.05,
      etfPresence: { PTF: 5.54, WCLD: false, IGV: false, FDTX: 9.36, GTEK: false, ARKK: false, MARS: false, FRWD: 5.05, BCTK: 4.85, FWD: 1.54, CBSE: 2.45, FCUS: 4.64, WGMI: false, CNEQ: false, SGRT: 8.08, SPMO: 11.78, XMMO: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 7, avgWeight: 5.7, proScore: 2.35, coverage: 0.412,
      price: 664.55, weeklyPrices: [681.08, 712.13, 746.23, 732.62, 664.55], weeklyChange: -2.43, dayChange: -9.29, sortRank: 0, periodReturns: { '1M': 37.2, 'YTD': 285.8, '6M': 272.8, '1Y': 1000.6 },
      priceHistory: { '1D': [732.62, 662.65, 658.42, 670.7, 670.19, 659.91, 660, 662, 660.61, 663.8, 670.67, 673.85, 678, 676.31, 673.05, 672.65, 673.27, 671.73, 671.03, 668.95, 668.75, 669.52, 665.74, 664.55], '1W': [681.08, 712.13, 746.23, 732.62, 664.55], '1M': [524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 664.55], 'YTD': [172.27, 187.68, 215, 243.29, 278.41, 260.19, 273.74, 284.67, 282.25, 261.3, 268.81, 304.9, 296.14, 270.49, 338.78, 365, 389.1, 390.99, 465.26, 488.74, 458.68, 524.65, 563.1, 517.72, 653.53, 664.55], '6M': [178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 284.1, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 480, 482.02, 484.28, 546.2, 526.93, 653.53, 664.55], '1Y': [60.38, 63.99, 64.02, 67.53, 67.06, 70.61, 75.84, 74.64, 76.29, 79.22, 81.91, 94.54, 103.09, 110.25, 120.06, 119.93, 113.13, 121.41, 124.92, 152.18, 174.22, 162.45, 150.93, 159.99, 169.54, 174.58, 178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 260.19, 284.1, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 480, 482.02, 484.28, 546.2, 526.93, 653.53, 664.55] },
      velocityScore: { '1D': 0.4, '1W': 66.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$229B', pe: 39.8, revenueGrowth: 46, eps: 16.7, grossMargin: 45, dividendYield: 0.08,
      etfPresence: { PTF: 5.92, WCLD: false, IGV: false, FDTX: 4, GTEK: false, ARKK: false, MARS: false, FRWD: 5.92, BCTK: false, FWD: false, CBSE: false, FCUS: 5.52, WGMI: false, CNEQ: 5.99, SGRT: 10.21, SPMO: 2.33, XMMO: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 7, avgWeight: 4.38, proScore: 1.8, coverage: 0.412,
      price: 436.72, weeklyPrices: [425.83, 432.15, 462.12, 467.67, 436.72], weeklyChange: 2.56, dayChange: -6.62, sortRank: 0, periodReturns: { '1M': 8, 'YTD': 43.7, '6M': 47.1, '1Y': 107.6 },
      priceHistory: { '1D': [467.67, 441, 445.28, 446.1, 444.52, 442.4, 440.28, 440.05, 439.48, 439.14, 441.36, 443.15, 442.93, 441.47, 442.37, 441.69, 443.48, 442.67, 442.24, 440.67, 439.89, 439.1, 436.91, 436.72], '1W': [425.83, 432.15, 462.12, 467.67, 436.72], '1M': [412.32, 422.73, 424.86, 418.45, 435.63, 446.69, 436.69, 444.92, 415.17, 426.8, 427.92, 408.75, 421.07, 423.93, 441.4, 425.83, 432.15, 462.12, 467.67, 436.72], 'YTD': [303.89, 318.01, 327.11, 327.37, 339.55, 330.73, 374.09, 360.39, 376.81, 357.44, 354.56, 339.57, 347.75, 337.95, 365.9, 375.1, 387.44, 392.34, 394.41, 397.28, 395.95, 412.32, 446.69, 427.92, 441.4, 436.72], '6M': [296.95, 303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 368.1, 370.54, 374.58, 338.89, 338.31, 329.24, 326.74, 341.76, 369.57, 366.24, 404.98, 401.61, 411.68, 404.35, 404.52, 435.63, 426.8, 441.4, 436.72], '1Y': [210.32, 226.49, 227.86, 236.95, 234.6, 241.33, 232.47, 242.09, 241.41, 235.59, 228.39, 250.92, 262.06, 282.71, 279.29, 294.03, 295.94, 294.51, 301.53, 294.05, 295.27, 282.01, 284.64, 292.09, 303.41, 286.87, 296.95, 303.89, 318.01, 341.64, 334.87, 330.56, 330.73, 368.1, 370.54, 374.58, 338.89, 338.31, 329.24, 326.74, 341.76, 369.57, 366.24, 404.98, 401.61, 411.68, 404.35, 404.52, 435.63, 426.8, 441.4, 436.72] },
      velocityScore: { '1D': 0.6, '1W': -4.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 37.6, revenueGrowth: 35, eps: 11.6, grossMargin: 62, dividendYield: 0.81,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6, GTEK: false, ARKK: 1.02, MARS: false, FRWD: 5.94, BCTK: 8.44, FWD: false, CBSE: 2.64, FCUS: false, WGMI: 0.6, CNEQ: 6.01, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 7, avgWeight: 4.06, proScore: 1.67, coverage: 0.412,
      price: 515.16, weeklyPrices: [507.29, 512.48, 537.37, 551.63, 515.16], weeklyChange: 1.55, dayChange: -6.61, sortRank: 0, periodReturns: { '1M': 10.2, 'YTD': 140.5, '6M': 139.7, '1Y': 297.6 },
      priceHistory: { '1D': [551.63, 512.7, 523.87, 524.5, 523.05, 522.16, 520.34, 520.68, 517.78, 518.65, 520.79, 526.31, 526.54, 524.86, 521.1, 521.27, 524.5, 522.84, 521.27, 520.13, 519.47, 519.15, 515.64, 515.16], '1W': [507.29, 512.48, 537.37, 551.63, 515.16], '1M': [503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 515.16], 'YTD': [214.16, 204.68, 223.6, 253.73, 252.18, 192.5, 213.58, 203.37, 203.68, 202.07, 204.83, 199.46, 220.27, 203.43, 231.82, 258.12, 303.46, 323.21, 355.26, 448.29, 420.99, 503.89, 521.54, 475.51, 547.26, 515.16], '6M': [214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 205.94, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 455.19, 424.1, 467.51, 510.13, 490.33, 547.26, 515.16], '1Y': [129.58, 141.9, 137.82, 155.61, 154.72, 177.44, 174.31, 172.28, 176.14, 163.36, 162.32, 155.82, 160.46, 160.9, 161.79, 211.51, 218.09, 238.03, 258.01, 250.05, 243.98, 240.52, 215.05, 215.24, 221.62, 209.17, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 192.5, 205.94, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 455.19, 424.1, 467.51, 510.13, 490.33, 547.26, 515.16] },
      velocityScore: { '1D': 1.2, '1W': 4.4, '1M': -48.9, '6M': null }, isNew: false,
      marketCap: '$840B', pe: 172.9, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.84, MARS: false, FRWD: 7.08, BCTK: 3.33, FWD: 2.12, CBSE: false, FCUS: 3.36, WGMI: false, CNEQ: false, SGRT: 3.64, SPMO: 4.05, XMMO: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'SPCX', name: 'SPACE EXPLORATION TECHN-CL A', easyScore: 6, avgWeight: 7.18, proScore: 2.53, coverage: 0.353,
      price: 158.71, weeklyPrices: [158.71], weeklyChange: 2.66, dayChange: 2.66, sortRank: 0, periodReturns: { '1M': 0, 'YTD': 0, '6M': 0, '1Y': 0 },
      priceHistory: undefined,
      velocityScore: { '1D': -8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.1T', pe: null, revenueGrowth: 15, eps: -0.66, grossMargin: 49, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.09, MARS: 21.46, FRWD: 2.66, BCTK: 9.67, FWD: 1.96, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.24, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'SPACE EXPLORATION TECHN-CL A appears in 6 of 17 Broad Tech ETFs (35% coverage) with average weight 7.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 6, avgWeight: 4.13, proScore: 1.46, coverage: 0.353,
      price: 379.98, weeklyPrices: [376.71, 392.90, 411.35, 392.13, 379.98], weeklyChange: 0.87, dayChange: -3.1, sortRank: 0, periodReturns: { '1M': -8.2, 'YTD': 9.8, '6M': 8.8, '1Y': 49.7 },
      priceHistory: { '1D': [392.13, 383.3, 389.36, 389.32, 387, 384.4, 383.05, 380.5, 379.95, 380.41, 380.8, 381.76, 382.97, 383.23, 383.36, 383.84, 384.66, 383.86, 382.77, 382.02, 382.36, 382.07, 381.11, 379.98], '1W': [376.71, 392.9, 411.35, 392.13, 379.98], '1M': [422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 379.98], 'YTD': [346.1, 332.48, 339.89, 325.49, 330.73, 310.51, 342.76, 333.99, 321.7, 317.53, 341.57, 315.93, 318.81, 309.51, 350.63, 396.72, 422.65, 399.83, 427.36, 419.3, 420.71, 422.01, 481.57, 392.16, 393.94, 379.98], '6M': [349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 331.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 430, 425.19, 414.14, 459.97, 396.6, 393.94, 379.98], '1Y': [253.77, 275.65, 271.8, 280.94, 278.59, 297.42, 292.93, 303.9, 305.76, 294.23, 298.24, 336.67, 360, 338.94, 329.91, 336.41, 344.13, 342.66, 372.97, 351.94, 358.39, 342.65, 377.96, 381.57, 406.29, 341.3, 349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 310.51, 331.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 430, 425.19, 414.14, 459.97, 396.6, 393.94, 379.98] },
      velocityScore: { '1D': -7.6, '1W': 15.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 63.3, revenueGrowth: 48, eps: 6, grossMargin: 76, dividendYield: 0.66,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.79, GTEK: false, ARKK: 1.13, MARS: false, FRWD: 5.09, BCTK: 6.84, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.35, SGRT: false, SPMO: 6.56, XMMO: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 6, avgWeight: 3.39, proScore: 1.2, coverage: 0.353,
      price: 234.3, weeklyPrices: [246.00, 237.50, 244.39, 232.79, 234.30], weeklyChange: -4.76, dayChange: 0.65, sortRank: 0, periodReturns: { '1M': -12, 'YTD': 1.5, '6M': 0.9, '1Y': 12.4 },
      priceHistory: { '1D': [232.79, 234.71, 234.26, 236.59, 236.71, 236.43, 235.97, 234.36, 234.05, 233.49, 234.35, 234.76, 234.63, 234.76, 234.74, 234.44, 234.25, 234.25, 234.73, 235.28, 235.7, 234.63, 234.6, 234.3], '1W': [246, 237.5, 244.39, 232.79, 234.3], '1M': [265.29, 271.85, 274, 270.64, 261.26, 256.52, 250.02, 253.79, 246.03, 245.22, 244.19, 238, 241.51, 238.55, 246.02, 246, 237.5, 244.39, 232.79, 234.3], 'YTD': [230.82, 246.29, 236.65, 234.34, 241.73, 222.69, 204.08, 204.86, 207.92, 216.82, 212.65, 209.87, 211.71, 208.27, 221.25, 248.5, 255.36, 259.7, 273.55, 265.82, 264.86, 265.29, 256.52, 244.19, 246.02, 234.3], '6M': [232.14, 230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 199.6, 210.11, 210, 213.21, 207.67, 205.37, 199.34, 212.79, 239.89, 248.28, 261.12, 272.05, 272.68, 264.14, 266.32, 261.26, 245.22, 246.02, 234.3], '1Y': [208.47, 219.39, 219.36, 226.35, 227.47, 231.01, 213.75, 221.3, 231.49, 227.94, 225.34, 238.24, 234.05, 220.71, 219.57, 221.78, 216.39, 222.03, 229.25, 249.32, 248.4, 232.87, 226.28, 234.42, 227.92, 222.56, 232.14, 230.82, 246.29, 238.18, 239.16, 239.3, 222.69, 199.6, 210.11, 210, 213.21, 207.67, 205.37, 199.34, 212.79, 239.89, 248.28, 261.12, 272.05, 272.68, 264.14, 266.32, 261.26, 245.22, 246.02, 234.3] },
      velocityScore: { '1D': 37.9, '1W': 2.6, '1M': -74.5, '6M': null }, isNew: false,
      marketCap: '$2.5T', pe: 31.8, revenueGrowth: 17, eps: 7.36, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.01, GTEK: false, ARKK: 2.19, MARS: false, FRWD: 2.8, BCTK: 4.26, FWD: 1.46, CBSE: false, FCUS: false, WGMI: false, CNEQ: 5.61, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 5, avgWeight: 5.02, proScore: 1.48, coverage: 0.294,
      price: 1023.83, weeklyPrices: [1031.34, 1066.07, 1070.23, 1094.04, 1023.83], weeklyChange: -0.73, dayChange: -6.42, sortRank: 0, periodReturns: { '1M': 26, 'YTD': 271.8, '6M': 262, '1Y': 669.3 },
      priceHistory: { '1D': [1094.04, 998, 997.17, 1017.96, 1020.53, 1006.6, 1007.59, 1014.27, 1011.91, 1018.34, 1020.04, 1023.71, 1029.94, 1026.02, 1024.66, 1022.74, 1030.6, 1026.59, 1026.61, 1024, 1022.29, 1024.2, 1021.28, 1023.83], '1W': [1031.34, 1066.07, 1070.23, 1094.04, 1023.83], '1M': [845.76, 870.66, 880.72, 879.8, 921.26, 926.61, 940.69, 925.99, 847.47, 876.77, 846.01, 815.99, 868.09, 931.04, 1018.8, 1031.34, 1066.07, 1070.23, 1094.04, 1023.83], 'YTD': [275.39, 284.47, 312.28, 346.53, 446.57, 405.45, 407.25, 408.97, 409.67, 375.01, 385.97, 406.77, 413.22, 391.76, 496.3, 519.6, 579.88, 579.03, 771.01, 808.8, 740.84, 845.76, 926.61, 846.01, 1018.8, 1023.83], '6M': [282.8, 275.39, 284.47, 320.32, 346.1, 407.69, 429.32, 431.17, 411.11, 407.84, 352.8, 383.71, 411.23, 380.07, 453.3, 513.28, 539.75, 595.86, 738.54, 782.64, 795.47, 812.73, 921.26, 876.77, 1018.8, 1023.83], '1Y': [133.08, 144.33, 144.47, 149.05, 146.59, 152.68, 151.74, 151.69, 158.7, 164, 170.5, 191.59, 211.13, 228.13, 236.06, 225.01, 211.63, 214.57, 223, 250.38, 293.99, 261.38, 253.38, 266.87, 282.86, 288.13, 282.8, 275.39, 284.47, 320.32, 346.1, 407.69, 405.45, 431.17, 411.11, 407.84, 352.8, 383.71, 411.23, 380.07, 453.3, 513.28, 539.75, 595.86, 738.54, 782.64, 795.47, 812.73, 921.26, 876.77, 1018.8, 1023.83] },
      velocityScore: { '1D': 0, '1W': -10.3, '1M': -45.8, '6M': null }, isNew: false,
      marketCap: '$230B', pe: 97.5, revenueGrowth: 44, eps: 10.5, grossMargin: 42, dividendYield: 0.27,
      etfPresence: { PTF: 5.39, WCLD: false, IGV: false, FDTX: 4.04, GTEK: false, ARKK: false, MARS: false, FRWD: 8.6, BCTK: false, FWD: false, CBSE: false, FCUS: 4.94, WGMI: false, CNEQ: false, SGRT: false, SPMO: 2.15, XMMO: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'LRCX', name: 'LRCX', easyScore: 5, avgWeight: 4.55, proScore: 1.34, coverage: 0.294,
      price: 368.94, weeklyPrices: [369.34, 374.18, 389.04, 409.54, 368.94], weeklyChange: -0.11, dayChange: -9.91, sortRank: 0, periodReturns: { '1M': 20.8, 'YTD': 115.5, '6M': 110.6, '1Y': 302.7 },
      priceHistory: { '1D': [409.54, 366.88, 372.11, 374.3, 372.19, 369.81, 368.83, 368.02, 368.39, 367.98, 369.59, 372.1, 373.35, 372.53, 372.86, 371.83, 374.17, 372.54, 372.32, 371.51, 371.36, 370.68, 368.33, 368.94], '1W': [369.34, 374.18, 389.04, 409.54, 368.94], '1M': [322.68, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04, 409.54, 368.94], 'YTD': [171.18, 200.96, 208.79, 220.7, 248.17, 213.31, 235.12, 237.39, 239.07, 222.99, 218.87, 224.71, 233.45, 213.66, 246.49, 265.16, 265.55, 251.23, 275.8, 289.24, 277.96, 322.68, 334.41, 327.16, 388.92, 368.94], '6M': [175.16, 171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 231.29, 244.92, 233.89, 199.33, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 258.57, 294.05, 284.72, 305.35, 317.12, 324.45, 388.92, 368.94], '1Y': [91.61, 97.34, 99.83, 101.07, 97.69, 98.94, 96.68, 102, 98.88, 101.28, 97.03, 105.57, 120.47, 131.93, 133.9, 140.35, 138.31, 145.04, 155.62, 155.78, 166.37, 147.46, 150.38, 158.19, 165.81, 163.26, 175.16, 171.18, 200.96, 217.47, 217.94, 233.46, 213.31, 231.29, 244.92, 233.89, 199.33, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 258.57, 294.05, 284.72, 305.35, 317.12, 324.45, 388.92, 368.94] },
      velocityScore: { '1D': 0, '1W': 3.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$461B', pe: 69.9, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.25,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.9, BCTK: 7.74, FWD: 1.97, CBSE: 3.05, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 4.07, XMMO: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 5, avgWeight: 4.01, proScore: 1.18, coverage: 0.294,
      price: 346.04, weeklyPrices: [371.10, 362.10, 367.46, 348.78, 346.04], weeklyChange: -6.75, dayChange: -0.79, sortRank: 0, periodReturns: { '1M': -8.8, 'YTD': 10.3, '6M': 9.6, '1Y': 108.4 },
      priceHistory: { '1D': [348.78, 346.8, 347.79, 348.25, 347.62, 346.55, 347.56, 346.46, 345.44, 344.78, 345.9, 345.27, 346.58, 346.85, 347.2, 347.17, 347.09, 346.93, 347.14, 346.14, 345.85, 345.64, 345.87, 346.04], '1W': [371.1, 362.1, 367.46, 348.78, 346.04], '1M': [384.84, 384.83, 386.12, 376.43, 372.58, 358.39, 355.68, 369.27, 365.76, 361.17, 362.29, 353.32, 356.56, 358.16, 367.11, 371.1, 362.1, 367.46, 348.78, 346.04], 'YTD': [313.8, 326.01, 336.31, 330.84, 338.66, 331.33, 311.33, 303.56, 307.15, 303.45, 308.42, 306.3, 289.59, 286.86, 314.74, 334.47, 337.73, 347.5, 384.27, 383.82, 393.11, 384.84, 358.39, 362.29, 367.11, 346.04], '6M': [315.68, 313.8, 326.01, 333.16, 328.43, 338.53, 323.1, 309.37, 314.9, 311.43, 298.3, 301.46, 298.79, 273.76, 297.66, 319.21, 335.4, 348.52, 379.64, 397.05, 393.32, 379.38, 372.58, 361.17, 367.11, 346.04], '1Y': [166.01, 177.39, 175.16, 183.1, 192.11, 196.43, 195.32, 201.63, 204.29, 209.16, 211.99, 239.94, 251.42, 252.34, 243.55, 247.13, 246.19, 251.34, 268.43, 278.06, 290.59, 285.6, 318.47, 316.02, 317.75, 307.73, 315.68, 313.8, 326.01, 333.16, 328.43, 338.53, 331.33, 309.37, 314.9, 311.43, 298.3, 301.46, 298.79, 273.76, 297.66, 319.21, 335.4, 348.52, 379.64, 397.05, 393.32, 379.38, 372.58, 361.17, 367.11, 346.04] },
      velocityScore: { '1D': -1.7, '1W': 37.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.2T', pe: 26.4, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.66, GTEK: false, ARKK: 1.78, MARS: false, FRWD: false, BCTK: 5.53, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 5.6, SGRT: false, SPMO: 3.5, XMMO: false },
      tonyNote: 'Alphabet Inc Class C appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 4.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, avgWeight: 5.23, proScore: 1.23, coverage: 0.235,
      price: 372.9, weeklyPrices: [393.83, 378.91, 379.40, 367.34, 372.90], weeklyChange: -5.31, dayChange: 1.51, sortRank: 0, periodReturns: { '1M': -10.9, 'YTD': -22.9, '6M': -23.4, '1Y': -23.3 },
      priceHistory: { '1D': [367.34, 374.83, 374.84, 374.3, 376.28, 376.32, 375.44, 373.87, 373.14, 372.93, 373.4, 372.7, 372.8, 372.98, 372.87, 372.64, 372.64, 374.36, 374.14, 373.79, 373.81, 373.57, 372.5, 372.9], '1W': [393.83, 378.91, 379.4, 367.34, 372.9], '1M': [416.03, 412.67, 426.99, 450.24, 460.52, 441.31, 427.34, 428.05, 416.67, 411.74, 403.41, 397.36, 390.34, 390.74, 399.76, 393.83, 378.91, 379.4, 367.34, 372.9], 'YTD': [483.62, 478.11, 459.38, 451.14, 433.5, 393.67, 404.37, 398.46, 401.72, 405.2, 404.88, 391.79, 371.04, 370.17, 374.33, 411.22, 432.92, 429.25, 411.38, 407.77, 423.54, 416.03, 441.31, 403.41, 399.76, 372.9], '6M': [486.85, 483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.84, 397.23, 392.74, 408.96, 395.55, 381.87, 356.77, 372.88, 384.37, 418.07, 424.82, 413.62, 415.12, 421.92, 418.57, 460.52, 411.74, 399.76, 372.9], '1Y': [486, 497.41, 496.62, 505.82, 505.27, 512.57, 527.75, 521.77, 517.1, 504.26, 505.12, 498.41, 509.04, 509.23, 517.95, 523.98, 513.57, 517.66, 542.07, 514.33, 506, 507.49, 474, 490, 492.02, 476.39, 486.85, 483.62, 478.11, 456.66, 465.95, 430.29, 393.67, 401.84, 397.23, 392.74, 408.96, 395.55, 381.87, 356.77, 372.88, 384.37, 418.07, 424.82, 413.62, 415.12, 421.92, 418.57, 460.52, 411.74, 399.76, 372.9] },
      velocityScore: { '1D': -0.8, '1W': 8.8, '1M': -78.8, '6M': null }, isNew: false,
      marketCap: '$2.8T', pe: 22.2, revenueGrowth: 18, eps: 16.79, grossMargin: 68, dividendYield: 0.99,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.22, FDTX: 3.79, GTEK: false, ARKK: false, MARS: false, FRWD: 2.78, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 6.12, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 4, avgWeight: 4.84, proScore: 1.14, coverage: 0.235,
      price: 1964.34, weeklyPrices: [1991.55, 1958.80, 2184.75, 2273.73, 1964.34], weeklyChange: -1.37, dayChange: -13.61, sortRank: 0, periodReturns: { '1M': 32.8, 'YTD': 727.5, '6M': 702.1, '1Y': 4083.9 },
      priceHistory: { '1D': [2273.73, 1965, 2006.21, 2019.51, 2030.38, 1989.8, 1995.46, 1997.65, 1984.42, 1987.89, 1990.8, 2005.16, 2011.99, 1992, 1987.09, 1974.89, 1991.2, 1983.71, 1980.19, 1956.28, 1957.63, 1960.74, 1954.34, 1964.34], '1W': [1991.55, 1958.8, 2184.75, 2273.73, 1964.34], '1M': [1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1964.34], 'YTD': [237.38, 334.54, 387.81, 503.44, 539.3, 576.2, 599.34, 621.09, 651.9, 599.06, 655.43, 753.69, 677.86, 635.34, 780.9, 891.72, 979.07, 1002.35, 1406.32, 1452.02, 1333.01, 1589.55, 1716.36, 1646.54, 2107.86, 1964.34], '6M': [244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 630.29, 649.97, 635.36, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1562.34, 1407.61, 1478.69, 1761.43, 1642, 2107.86, 1964.34], '1Y': [46.95, 45.35, 46.17, 42.72, 41.36, 42.93, 41.93, 43.37, 45.52, 46.78, 51.07, 70.51, 91.55, 106.4, 112.2, 120.95, 127.29, 149.29, 175.53, 194.57, 267.95, 265.88, 226.96, 205.35, 219.46, 209.31, 244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 576.2, 630.29, 649.97, 635.36, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1562.34, 1407.61, 1478.69, 1761.43, 1642, 2107.86, 1964.34] },
      velocityScore: { '1D': 14, '1W': -2.6, '1M': -56.5, '6M': null }, isNew: false,
      marketCap: '$291B', pe: 67, revenueGrowth: 251, eps: 29.33, grossMargin: 56, dividendYield: null,
      etfPresence: { PTF: 9.5, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.57, CBSE: false, FCUS: 5.3, WGMI: false, CNEQ: false, SGRT: false, SPMO: 2.98, XMMO: false },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks', easyScore: 4, avgWeight: 4.12, proScore: 0.97, coverage: 0.235,
      price: 288.94, weeklyPrices: [279.90, 282.13, 287.78, 286.40, 288.94], weeklyChange: 3.23, dayChange: 0.89, sortRank: 0, periodReturns: { '1M': 10.9, 'YTD': 56.9, '6M': 53.6, '1Y': 42.1 },
      priceHistory: { '1D': [286.4, 289, 289.43, 288.79, 290.35, 290.16, 290.45, 290.52, 289.14, 289.3, 290.07, 291.09, 291.87, 291.55, 291.47, 291.02, 290.99, 290.4, 290.35, 289.6, 289.44, 289.22, 288.39, 288.94], '1W': [279.9, 282.13, 287.78, 286.4, 288.94], '1M': [256.75, 248.47, 257.77, 281.69, 300.48, 297.18, 280.43, 279.25, 272.05, 266.33, 260.52, 263.22, 279.53, 279.62, 284.54, 279.9, 282.13, 287.78, 286.4, 288.94], 'YTD': [184.2, 190.8, 190.93, 182.27, 176.2, 154.77, 165.3, 150.99, 149.4, 158.56, 164.93, 168.91, 153.22, 160.32, 173.78, 164.11, 181.2, 180.99, 183.98, 215.6, 247.55, 256.75, 297.18, 260.52, 284.54, 288.94], '6M': [188.12, 184.2, 190.8, 187.73, 180.18, 176.97, 159.32, 162.81, 148.7, 148.92, 165.05, 167.02, 162.95, 147.02, 161.95, 162.51, 169.56, 182.9, 184.56, 207.88, 242.83, 260.58, 300.48, 266.33, 284.54, 288.94], '1Y': [203.32, 204.64, 203.99, 192.25, 196.73, 193.84, 169.09, 168.17, 176.17, 184.55, 190.52, 197.55, 201.34, 203.25, 203.62, 211.04, 207.56, 214.4, 221.38, 214.52, 216.54, 202.9, 183.89, 189.88, 195, 187.09, 188.12, 184.2, 190.8, 187.73, 180.18, 176.97, 154.77, 162.81, 148.7, 148.92, 165.05, 167.02, 162.95, 147.02, 161.95, 162.51, 169.56, 182.9, 184.56, 207.88, 242.83, 260.58, 300.48, 266.33, 284.54, 288.94] },
      velocityScore: { '1D': 7.8, '1W': -19.8, '1M': -64.6, '6M': null }, isNew: false,
      marketCap: '$235B', pe: 251.3, revenueGrowth: 31, eps: 1.15, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.78, IGV: 9.01, FDTX: 3.67, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.03, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'LITE', name: 'Lumentum Holdings Inc', easyScore: 4, avgWeight: 3.77, proScore: 0.89, coverage: 0.235,
      price: 816.5, weeklyPrices: [875.36, 869.98, 850.00, 893.93, 816.50], weeklyChange: -6.72, dayChange: -8.66, sortRank: 0, periodReturns: { '1M': -13.8, 'YTD': 121.5, '6M': 110.8, '1Y': 815.8 },
      priceHistory: { '1D': [893.93, 821.69, 845.71, 850.92, 847.23, 835.91, 831.9, 828.42, 825.4, 823.13, 826.67, 833.4, 837.16, 832.56, 830.21, 828.59, 832.25, 830.31, 828.4, 824, 821.41, 820.85, 816.13, 816.5], '1W': [875.36, 869.98, 850, 893.93, 816.5], '1M': [910.81, 902.31, 860.62, 854.96, 905, 1029.15, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93, 816.5], 'YTD': [368.59, 348.26, 331.62, 354.49, 381.44, 504.42, 574.11, 635.64, 677, 680.8, 672, 700.81, 777.17, 702.76, 896.02, 824.01, 873.6, 791.37, 994.56, 992.37, 884.98, 910.81, 1029.15, 821.76, 957.24, 816.5], '6M': [387.41, 368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 583.46, 667.77, 700.91, 558.44, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 903.8, 970.7, 946.9, 905, 895.4, 957.24, 816.5], '1Y': [89.16, 95.06, 91.31, 98.14, 99.63, 109.48, 108.15, 115.03, 118.98, 123.42, 132.55, 151.73, 170.9, 163.99, 162.71, 157.15, 156.78, 162.95, 198.39, 188.36, 259.89, 242.07, 299.36, 302.81, 360.33, 316.15, 387.41, 368.59, 348.26, 343.27, 339.19, 391.84, 504.42, 583.46, 667.77, 700.91, 558.44, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 903.8, 970.7, 946.9, 905, 895.4, 957.24, 816.5] },
      velocityScore: { '1D': -1.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$64B', pe: 142.7, revenueGrowth: 90, eps: 5.72, grossMargin: 41, dividendYield: null,
      etfPresence: { PTF: 3.6, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 1.4, FWD: false, CBSE: false, FCUS: 2.31, WGMI: false, CNEQ: false, SGRT: 7.77, SPMO: false, XMMO: false },
      tonyNote: 'Lumentum Holdings Inc appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 4, avgWeight: 3.65, proScore: 0.86, coverage: 0.235,
      price: 116.7, weeklyPrices: [133.25, 130.63, 128.47, 119.50, 116.70], weeklyChange: -12.42, dayChange: -2.34, sortRank: 0, periodReturns: { '1M': -14.7, 'YTD': -34.3, '6M': -39.9, '1Y': -16.6 },
      priceHistory: { '1D': [119.5, 119.85, 120.75, 118.73, 118.75, 119.16, 119.15, 118.81, 118.22, 118.63, 118.63, 119.04, 119.02, 119.11, 118.93, 118.86, 118.88, 118.85, 118.42, 118.13, 118.04, 117.67, 116.54, 116.7], '1W': [133.25, 130.63, 128.47, 119.5, 116.7], '1M': [136.6, 132.51, 143.34, 156.54, 160.65, 152.17, 142.2, 141.7, 135.53, 136.47, 132.07, 130.21, 131.08, 127.99, 134.71, 133.25, 130.63, 128.47, 119.5, 116.7], 'YTD': [177.75, 176.86, 178.4, 165.9, 151.86, 130.01, 135.68, 134.89, 135.94, 153.19, 151.6, 152.77, 154.96, 146.28, 140.76, 142.15, 152.62, 141.18, 135.91, 136, 135.14, 136.6, 152.17, 132.07, 134.71, 116.7], '6M': [194.13, 177.75, 176.86, 177.07, 169.6, 146.59, 135.9, 129.13, 135.24, 137.19, 157.16, 150.95, 150.68, 143.06, 147.93, 132.37, 145.89, 143.1, 146.03, 137.8, 133.99, 136.88, 160.65, 136.47, 134.71, 116.7], '1Y': [139.92, 136.32, 139.71, 148.58, 149.07, 156.24, 173.27, 182.68, 174.03, 157.17, 157.09, 162.36, 170.26, 182.55, 182.42, 182.17, 179.74, 181.51, 189.6, 190.74, 193.61, 171.25, 162.25, 170.69, 181.84, 187.75, 194.13, 177.75, 176.86, 177.07, 169.6, 146.59, 130.01, 129.13, 135.24, 137.19, 157.16, 150.95, 150.68, 143.06, 147.93, 132.37, 145.89, 143.1, 146.03, 137.8, 133.99, 136.88, 160.65, 136.47, 134.71, 116.7] },
      velocityScore: { '1D': -3.4, '1W': -11.3, '1M': -70.2, '6M': null }, isNew: false,
      marketCap: '$280B', pe: 132.6, revenueGrowth: 85, eps: 0.88, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.16, FDTX: 2.87, GTEK: false, ARKK: 2.48, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.07, XMMO: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'SHOP', name: 'Shopify Inc Registered Shs -A- Subord Vtg', easyScore: 4, avgWeight: 2.81, proScore: 0.66, coverage: 0.235,
      price: 107.75, weeklyPrices: [113.23, 108.09, 108.85, 107.98, 107.75], weeklyChange: -4.84, dayChange: -0.22, sortRank: 0, periodReturns: { '1M': 4.6, 'YTD': -33.1, '6M': -36.4, '1Y': -2 },
      priceHistory: { '1D': [107.98, 108.6, 108.23, 107.61, 107.9, 107.86, 108.01, 108.26, 108.11, 108.8, 108.77, 109.02, 109.6, 109.49, 109.53, 109.56, 109.39, 109.4, 109.1, 108.42, 108.1, 108.12, 107.64, 107.75], '1W': [113.23, 108.09, 108.85, 107.98, 107.75], '1M': [104.9, 106.6, 115.03, 118.71, 124.12, 117.01, 112.94, 116.04, 109.54, 110.78, 110.42, 108.2, 110.47, 108.24, 112.49, 113.23, 108.09, 108.85, 107.98, 107.75], 'YTD': [160.97, 168.28, 157.51, 137.64, 143.64, 111.24, 118.71, 123.8, 125.94, 129.65, 129.52, 123.75, 118.42, 118.62, 120.1, 127.41, 131.96, 122.05, 107.63, 99.84, 102.39, 104.9, 117.01, 110.42, 112.49, 107.75], '6M': [169.53, 160.97, 168.28, 157.99, 137.89, 131.23, 112.05, 110.66, 126.2, 120.73, 130.2, 122.96, 116.78, 111.85, 118.8, 114.97, 135.14, 124.23, 127.55, 110.41, 100.28, 103, 124.12, 110.78, 112.49, 107.75], '1Y': [109.98, 115.35, 112.48, 115.05, 123.71, 124.85, 127, 147.5, 143.11, 140.53, 139.04, 143.44, 147.21, 149.94, 148.61, 161.28, 152.88, 162.64, 178.96, 160.94, 158.88, 139.93, 155.31, 156.83, 159.89, 163.14, 169.53, 160.97, 168.28, 157.99, 137.89, 131.23, 111.24, 110.66, 126.2, 120.73, 130.2, 122.96, 116.78, 111.85, 118.8, 114.97, 135.14, 124.23, 127.55, 110.41, 100.28, 103, 124.12, 110.78, 112.49, 107.75] },
      velocityScore: { '1D': 0, '1W': -25.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$140B', pe: 105.6, revenueGrowth: 34, eps: 1.02, grossMargin: 48, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.89, GTEK: false, ARKK: 4.05, MARS: false, FRWD: 1.79, BCTK: 2.51, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Shopify Inc Registered Shs -A- Subord Vtg appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 2.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC-CL A', easyScore: 4, avgWeight: 2.5, proScore: 0.59, coverage: 0.235,
      price: 346.74, weeklyPrices: [373.25, 363.79, 368.03, 349.68, 346.74], weeklyChange: -7.1, dayChange: -0.81, sortRank: 0, periodReturns: { '1M': -9.5, 'YTD': 10.8, '6M': 10.3, '1Y': 109.9 },
      priceHistory: { '1D': [349.56, 347.31, 348.16, 348.82, 348.21, 347.13, 348.17, 346.98, 345.97, 345.26, 346.38, 345.94, 347.29, 347.54, 347.87, 347.71, 347.65, 347.57, 347.7, 346.73, 346.47, 346.24, 346.45, 346.74], '1W': [373.25, 363.79, 368.03, 349.68, 346.74], '1M': [388.88, 388.83, 390.13, 380.34, 376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68, 369.35, 373.25, 363.79, 368.03, 349.68, 346.74], 'YTD': [313, 325.44, 335.84, 330.54, 338.25, 331.25, 310.96, 302.85, 307.38, 303.13, 308.7, 307.69, 290.93, 287.56, 317.32, 337.12, 339.32, 349.78, 388.43, 387.35, 396.94, 388.88, 361.85, 364.26, 369.35, 346.74], '6M': [314.35, 313, 325.44, 332.78, 327.93, 338, 322.86, 309, 314.98, 311.76, 298.52, 302.28, 301, 274.34, 299.99, 321.31, 337.42, 350.34, 383.25, 400.8, 396.78, 382.97, 376.37, 363.31, 369.35, 346.74], '1Y': [165.19, 176.23, 174.36, 182, 191.34, 195.75, 194.67, 201, 203.5, 208.49, 211.35, 239.63, 251.16, 251.66, 243.1, 245.76, 245.45, 250.46, 267.47, 277.54, 290.1, 285.02, 318.58, 315.81, 317.08, 306.57, 314.35, 313, 325.44, 332.78, 327.93, 338, 331.25, 309, 314.98, 311.76, 298.52, 302.28, 301, 274.34, 299.99, 321.31, 337.42, 350.34, 383.25, 400.8, 396.78, 382.97, 376.37, 363.31, 369.35, 346.74] },
      velocityScore: { '1D': 0, '1W': null, '1M': -88.2, '6M': null }, isNew: false,
      marketCap: '$4.2T', pe: 26.4, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 0.49, MARS: false, FRWD: 3.19, BCTK: false, FWD: 1.93, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 4.38, XMMO: false },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'KLAC', name: 'KLAC', easyScore: 4, avgWeight: 2.06, proScore: 0.48, coverage: 0.235,
      price: 242.79, weeklyPrices: [237.33, 238.73, 259.56, 269.16, 242.79], weeklyChange: 2.3, dayChange: -9.8, sortRank: 0, periodReturns: { '1M': 28.6, 'YTD': 99.8, '6M': 91.4, '1Y': 183.5 },
      priceHistory: { '1D': [269.16, 245.1, 244.9, 247.48, 245.91, 243.92, 242.56, 242.51, 242.62, 241.64, 242.55, 244.38, 245.77, 245.46, 245.67, 244.98, 246.8, 245.01, 244.7, 244.93, 243.76, 243.48, 243.08, 242.79], '1W': [237.33, 238.73, 259.56, 269.16, 242.79], '1M': [201.14, 195.72, 192.76, 192.17, 194, 204.52, 212.51, 213.11, 192.92, 210.81, 213.94, 213.56, 241.16, 254.54, 256.42, 237.33, 238.73, 259.56, 269.16, 242.79], 'YTD': [121.51, 132.46, 143.45, 150, 168.47, 133.1, 147.95, 146.99, 152.43, 147.59, 146.5, 148.24, 154.38, 147.24, 167.23, 174.81, 181.21, 180.9, 173.29, 181.13, 175.65, 201.14, 204.52, 213.94, 256.42, 242.79], '6M': [126.88, 121.51, 132.46, 154.5, 151.28, 142.79, 144.29, 145.09, 149.6, 152.46, 134.46, 141.86, 149.87, 144.32, 154.01, 176.88, 180.53, 190, 171.33, 186.92, 180.43, 188.84, 194, 210.81, 256.42, 242.79], '1Y': [85.63, 89.57, 91.92, 93.65, 89.22, 91.61, 88.34, 91.02, 88.34, 87.96, 84.64, 91.77, 99.06, 107.12, 107.86, 108.47, 102.57, 114.74, 120.6, 119.35, 121.79, 113.37, 113.67, 118.99, 122.56, 122.34, 126.88, 121.51, 132.46, 154.5, 151.28, 142.79, 133.1, 145.09, 149.6, 152.46, 134.46, 141.86, 149.87, 144.32, 154.01, 176.88, 180.53, 190, 171.33, 186.92, 180.43, 188.84, 194, 210.81, 256.42, 242.79] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$317B', pe: 68.8, revenueGrowth: 12, eps: 3.53, grossMargin: 61, dividendYield: 0.34,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: 1.75, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.78, CBSE: 2.94, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.76, XMMO: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 3, avgWeight: 5.4, proScore: 0.95, coverage: 0.176,
      price: 379.88, weeklyPrices: [404.66, 396.38, 400.49, 405.05, 379.88], weeklyChange: -6.12, dayChange: -6.21, sortRank: 0, periodReturns: { '1M': -10.8, 'YTD': -15.5, '6M': -21.8, '1Y': 8.9 },
      priceHistory: { '1D': [405.05, 388.04, 389.29, 388.89, 388.08, 387.63, 385.76, 385.19, 383.66, 382.5, 383.2, 384.92, 384.37, 383.83, 384.93, 384.65, 385.35, 385.06, 383.93, 381.71, 381.04, 381.29, 379.76, 379.88], '1W': [404.66, 396.38, 400.49, 405.05, 379.88], '1M': [433.59, 440.36, 442.1, 435.79, 415.88, 423.74, 423.7, 418.45, 391, 408.95, 396.68, 381.59, 399.15, 406.43, 411.15, 404.66, 396.38, 400.49, 405.05, 379.88], 'YTD': [449.72, 435.8, 439.2, 449.36, 416.56, 397.21, 428.27, 411.71, 408.58, 405.94, 407.82, 392.78, 385.95, 371.75, 343.25, 391.95, 387.51, 376.02, 389.37, 433.45, 409.99, 433.59, 423.74, 396.68, 411.15, 379.88], '6M': [485.56, 449.72, 435.8, 438.57, 449.06, 430.41, 411.11, 417.07, 411.82, 402.51, 396.73, 391.2, 367.96, 361.83, 352.82, 352.42, 392.5, 378.67, 392.51, 428.35, 422.24, 426.01, 415.88, 408.95, 411.15, 379.88], '1Y': [348.68, 317.66, 297.81, 310.78, 332.11, 321.2, 308.72, 339.03, 335.16, 346.6, 329.36, 346.97, 421.62, 425.85, 444.72, 433.09, 429.24, 442.6, 460.55, 444.26, 445.23, 408.92, 417.78, 429.24, 445.17, 489.88, 485.56, 449.72, 435.8, 438.57, 449.06, 430.41, 397.21, 417.07, 411.82, 402.51, 396.73, 391.2, 367.96, 361.83, 352.82, 352.42, 392.5, 378.67, 392.51, 428.35, 422.24, 426.01, 415.88, 408.95, 411.15, 379.88] },
      velocityScore: { '1D': null, '1W': null, '1M': -85.7, '6M': null }, isNew: true,
      marketCap: '$1.4T', pe: 348.5, revenueGrowth: 16, eps: 1.09, grossMargin: 19, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 9.95, MARS: false, FRWD: false, BCTK: 3.2, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.06, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'POWL', name: 'POWL', easyScore: 3, avgWeight: 5.27, proScore: 3.16, coverage: 0.6,
      price: 294.65, weeklyPrices: [292.70, 294.03, 297.20, 307.80, 294.65], weeklyChange: 0.67, dayChange: -4.27, sortRank: 0, periodReturns: { '1M': 5.5, 'YTD': 177.3, '6M': 161, '1Y': 389.7 },
      priceHistory: { '1D': [307.8, 285.85, 288.65, 295.3, 294.88, 294.05, 291.98, 294.29, 293.36, 295.4, 297.27, 301.83, 300.84, 301.51, 301.63, 300.68, 302.17, 300.96, 300.2, 297.76, 297.14, 296.85, 296.39, 294.65], '1W': [292.7, 294.03, 297.2, 307.8, 294.65], '1M': [291.97, 295.94, 288.9, 284.42, 288.12, 299.07, 299.73, 300.06, 284.87, 293.6, 283.51, 262.34, 290.5, 294.75, 303.53, 292.7, 294.03, 297.2, 307.8, 294.65], 'YTD': [106.26, 119.94, 133.76, 142.29, 152.31, 179.6, 197.45, 178.79, 176.96, 170.96, 171.73, 167.41, 194.85, 180.36, 218.07, 229.73, 242.77, 255.56, 294.69, 308.05, 266.8, 291.97, 299.07, 283.51, 303.53, 294.65], '6M': [112.88, 106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 197.63, 182.27, 174.53, 161.22, 167.57, 172, 179.35, 186.72, 228.99, 241.65, 260.52, 269.95, 309.39, 292.65, 279.22, 288.12, 293.6, 303.53, 294.65], '1Y': [60.17, 70.15, 72.14, 70.37, 73.67, 77.77, 78.75, 88.28, 86.57, 86.12, 87.92, 92.3, 99.41, 97.41, 101.6, 104.42, 105.73, 116.11, 128.09, 126.71, 124.62, 105.94, 100.03, 107.5, 115.02, 110.88, 112.88, 106.26, 119.94, 135.18, 139.32, 147.86, 179.6, 197.63, 182.27, 174.53, 161.22, 167.57, 172, 179.35, 186.72, 228.99, 241.65, 260.52, 269.95, 309.39, 292.65, 279.22, 288.12, 293.6, 303.53, 294.65] },
      velocityScore: { '1D': 14.1, '1W': -3.1, '1M': -37.3, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 57.7, revenueGrowth: 7, eps: 5.11, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { POW: 6.53, VOLT: 7.42, PBD: false, PBW: 1.87, IVEP: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'PWR', name: 'PWR', easyScore: 3, avgWeight: 4.77, proScore: 2.86, coverage: 0.6,
      price: 707.38, weeklyPrices: [719.29, 714.85, 702.25, 740.14, 707.38], weeklyChange: -1.66, dayChange: -4.43, sortRank: 0, periodReturns: { '1M': -2.2, 'YTD': 67.6, '6M': 62.5, '1Y': 93.4 },
      priceHistory: { '1D': [740.14, 701.5, 706.37, 712.1, 709.04, 702.74, 702.66, 705.17, 706.83, 707.54, 710.72, 715.36, 716.59, 716.83, 716.37, 716.04, 718.82, 719.47, 719.92, 714.21, 713.34, 710.5, 707.77, 707.38], '1W': [719.29, 714.85, 702.25, 740.14, 707.38], '1M': [742.18, 733.62, 730.1, 711.73, 687.48, 706.06, 715.67, 719.17, 695.11, 693.81, 691.95, 650.92, 683.29, 707.74, 724.35, 719.29, 714.85, 702.25, 740.14, 707.38], 'YTD': [422.06, 413.17, 437.07, 468.78, 483.43, 477.72, 523.96, 554, 565.05, 568.38, 567.71, 572, 573.5, 549.02, 576.24, 591.82, 613.78, 630.94, 771.61, 765.81, 723.03, 742.18, 706.06, 691.95, 724.35, 707.38], '6M': [435.2, 422.06, 413.17, 447.64, 468.76, 474.63, 508.11, 515.88, 552.66, 563.08, 540.19, 559.02, 555.39, 549.98, 554.38, 595.84, 604.97, 637.28, 757.34, 745, 769.99, 723.44, 687.48, 693.81, 724.35, 707.38], '1Y': [365.76, 378.08, 377.56, 386.54, 394.93, 410.99, 389.12, 384.12, 383.32, 378.31, 374.68, 373.47, 378.24, 389.53, 414.42, 421.51, 431.6, 437.43, 439.57, 438.66, 450.38, 426.87, 442.64, 454.72, 457.96, 438.49, 435.2, 422.06, 413.17, 447.64, 468.76, 474.63, 477.72, 515.88, 552.66, 563.08, 540.19, 559.02, 555.39, 549.98, 554.38, 595.84, 604.97, 637.28, 757.34, 745, 769.99, 723.44, 687.48, 693.81, 724.35, 707.38] },
      velocityScore: { '1D': 1.8, '1W': -2.4, '1M': -22.1, '6M': null }, isNew: false,
      marketCap: '$106B', pe: 97.6, revenueGrowth: 26, eps: 7.25, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.63, VOLT: 5.38, PBD: false, PBW: false, IVEP: 4.29 },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'ETN', name: 'ETN', easyScore: 3, avgWeight: 4.52, proScore: 2.71, coverage: 0.6,
      price: 407.14, weeklyPrices: [407.71, 409.64, 421.77, 435.78, 407.14], weeklyChange: -0.14, dayChange: -6.57, sortRank: 0, periodReturns: { '1M': 4, 'YTD': 27.8, '6M': 26.1, '1Y': 22.3 },
      priceHistory: { '1D': [435.78, 409.92, 411.98, 416.86, 414.3, 408.32, 408.29, 411.34, 410.47, 409.48, 410.03, 411.98, 411.92, 412.19, 412.26, 411.44, 412.6, 411.36, 410.57, 408.79, 408.01, 408.41, 407.33, 407.14], '1W': [407.71, 409.64, 421.77, 435.78, 407.14], '1M': [403.13, 406.37, 401.94, 400.6, 400.08, 417.62, 421.21, 418.61, 395.94, 403.14, 401.72, 375.46, 393.64, 391.39, 407.06, 407.71, 409.64, 421.77, 435.78, 407.14], 'YTD': [318.51, 320.58, 331.14, 334.04, 354.37, 354.67, 396.09, 377.32, 374.59, 354.46, 355.79, 360.54, 375, 357.67, 385.58, 395.06, 413.87, 413.07, 410.86, 401.53, 381.87, 403.13, 417.62, 401.72, 407.06, 407.14], '6M': [322.81, 318.51, 320.58, 333.46, 331.22, 351.42, 373.82, 390.33, 373.38, 375.92, 347.75, 355.4, 356.8, 357.36, 363.89, 403.36, 407.57, 416.77, 422.44, 401.51, 399.44, 391.35, 400.08, 403.14, 407.06, 407.14], '1Y': [332.95, 356.99, 356.98, 362.11, 372.65, 390.01, 356.45, 360.11, 353.5, 345.76, 343.75, 348.23, 371.19, 368.52, 374.25, 370.94, 374.35, 373.46, 376.01, 377.72, 379.57, 342.75, 330.43, 333.11, 341.76, 329.93, 322.81, 318.51, 320.58, 333.46, 331.22, 351.42, 354.67, 390.33, 373.38, 375.92, 347.75, 355.4, 356.8, 357.36, 363.89, 403.36, 407.57, 416.77, 422.44, 401.51, 399.44, 391.35, 400.08, 403.14, 407.06, 407.14] },
      velocityScore: { '1D': 2.3, '1W': 1.9, '1M': -15.3, '6M': null }, isNew: false,
      marketCap: '$158B', pe: 39.8, revenueGrowth: 17, eps: 10.24, grossMargin: 37, dividendYield: 1.01,
      etfPresence: { POW: 4.13, VOLT: 5.43, PBD: false, PBW: false, IVEP: 4.01 },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CORP', easyScore: 3, avgWeight: 4.45, proScore: 2.67, coverage: 0.6,
      price: 318.2, weeklyPrices: [280.88, 284.99, 328.91, 345.85, 318.20], weeklyChange: 13.29, dayChange: -7.99, sortRank: 0, periodReturns: { '1M': 5.2, 'YTD': 266.2, '6M': 248, '1Y': 1310.5 },
      priceHistory: { '1D': [345.85, 306, 316.58, 325.74, 322.4, 317.76, 316.61, 319.89, 318.09, 320.57, 322, 326.68, 328.4, 328.48, 327.73, 326.08, 328.08, 327.01, 326.51, 322.24, 321.05, 320.71, 317.83, 318.2], '1W': [280.88, 284.99, 328.91, 345.85, 318.2], '1M': [302.4, 293.8, 290.01, 285, 273.51, 302.85, 287.32, 291.37, 263.61, 253.57, 259.61, 234.23, 248.88, 260.22, 274.5, 280.88, 284.99, 328.91, 345.85, 318.2], 'YTD': [86.89, 121.84, 133.46, 145.63, 156.51, 136.6, 155.54, 159, 168.57, 164.78, 159.21, 156.58, 150.22, 135.49, 146.78, 213.84, 229.75, 226.37, 295.25, 280.69, 258.71, 302.4, 302.85, 259.61, 274.5, 318.2], '6M': [91.43, 86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.03, 147.55, 155.67, 135.19, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 288.64, 261.03, 275.95, 302.49, 273.51, 253.57, 274.5, 318.2], '1Y': [22.56, 23.92, 24.3, 25.31, 25.93, 34.75, 37.61, 37.65, 46.5, 49.35, 51.35, 55, 73.29, 77.38, 84.57, 86.06, 114.06, 104.38, 113.28, 129.05, 139.23, 107.11, 95.56, 105, 109.44, 87.61, 91.43, 86.89, 121.84, 139.17, 144.89, 151.37, 136.6, 139.03, 147.55, 155.67, 135.19, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 288.64, 261.03, 275.95, 302.49, 273.51, 253.57, 274.5, 318.2] },
      velocityScore: { '1D': -9.2, '1W': 20.8, '1M': 6.8, '6M': null }, isNew: false,
      marketCap: '$91B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: 4.67, PBD: false, PBW: 2.72, IVEP: 5.95 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'GEV', name: 'GEV', easyScore: 3, avgWeight: 4.11, proScore: 2.46, coverage: 0.6,
      price: 1039.97, weeklyPrices: [982.35, 1048.86, 1109.73, 1127.59, 1039.97], weeklyChange: 5.87, dayChange: -7.77, sortRank: 0, periodReturns: { '1M': 0.1, 'YTD': 59.1, '6M': 57.2, '1Y': 108 },
      priceHistory: { '1D': [1127.59, 1052.63, 1060.91, 1068.82, 1061.08, 1047, 1045.83, 1050.13, 1044.28, 1040.56, 1040.93, 1049.17, 1053.99, 1051.3, 1050.38, 1049.26, 1055.29, 1055.19, 1055.08, 1053.13, 1047.16, 1046.64, 1041.66, 1039.97], '1W': [982.35, 1048.86, 1109.73, 1127.59, 1039.97], '1M': [1070.47, 1031.89, 996, 968.32, 950.54, 969.67, 959.36, 963.33, 933.61, 933.85, 920.15, 867.09, 906.79, 940.66, 979.07, 982.35, 1048.86, 1109.73, 1127.59, 1039.97], 'YTD': [653.57, 628.4, 644.18, 661.67, 717.39, 737.53, 823.67, 834.61, 876.46, 841.27, 847.65, 858.47, 923.69, 872.9, 936.07, 985.92, 1127.56, 1088.93, 1095.21, 1071.98, 1012.25, 1070.47, 969.67, 920.15, 979.07, 1039.97], '6M': [661.45, 653.57, 628.4, 642.23, 657.78, 726.37, 779.35, 816.56, 830.34, 873.6, 789.23, 805.02, 851.07, 853.16, 897.36, 991.12, 990.18, 1120.23, 1073.95, 1040.15, 1049.23, 1038.74, 950.54, 933.85, 979.07, 1039.97], '1Y': [499.88, 529.15, 530, 559.61, 548.99, 632.67, 649.72, 650.76, 625.02, 602.31, 579.68, 605.7, 617.91, 633.41, 614.9, 606.12, 644.41, 585.33, 570.98, 547.96, 579.8, 577.02, 580.49, 601.58, 625.3, 686.22, 661.45, 653.57, 628.4, 642.23, 657.78, 726.37, 737.53, 816.56, 830.34, 873.6, 789.23, 805.02, 851.07, 853.16, 897.36, 991.12, 990.18, 1120.23, 1073.95, 1040.15, 1049.23, 1038.74, 950.54, 933.85, 979.07, 1039.97] },
      velocityScore: { '1D': 3.4, '1W': 11.3, '1M': -10.5, '6M': null }, isNew: false,
      marketCap: '$279B', pe: 30.4, revenueGrowth: 16, eps: 34.17, grossMargin: 20, dividendYield: 0.18,
      etfPresence: { POW: 3.73, VOLT: 4.36, PBD: false, PBW: false, IVEP: 4.23 },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'NVT', name: 'NVT', easyScore: 3, avgWeight: 3.54, proScore: 2.12, coverage: 0.6,
      price: 169.37, weeklyPrices: [167.34, 170.94, 177.02, 184.34, 169.37], weeklyChange: 1.21, dayChange: -8.12, sortRank: 0, periodReturns: { '1M': 2.9, 'YTD': 66.1, '6M': 62.9, '1Y': 139.4 },
      priceHistory: { '1D': [184.34, 169.87, 171.22, 172.6, 171.88, 169.55, 169.45, 170.48, 169.32, 169.39, 169.99, 170.43, 171.24, 171.21, 171.22, 171.64, 172.4, 171.51, 170.92, 170.26, 169.84, 169.63, 168.95, 169.37], '1W': [167.34, 170.94, 177.02, 184.34, 169.37], '1M': [169.29, 167.8, 164.87, 166.99, 171.55, 173.39, 176.39, 173.88, 162.86, 163.81, 163.8, 156.79, 164.52, 165.84, 169, 167.34, 170.94, 177.02, 184.34, 169.37], 'YTD': [101.97, 102.72, 104.54, 111.57, 115.62, 113.87, 112.75, 116.88, 121.79, 113.83, 111.09, 120.27, 127.01, 118.28, 127.11, 131.38, 140.13, 138.3, 169.41, 170.74, 160.69, 169.29, 173.39, 163.8, 169, 169.37], '6M': [103.97, 101.97, 102.72, 107.98, 110.29, 112.26, 112.64, 111.9, 116.87, 118.36, 106.02, 109.93, 116.3, 116.98, 117.41, 133.16, 135.8, 141.71, 162.69, 169.95, 169.01, 164.66, 171.55, 163.81, 169, 169.37], '1Y': [70.75, 73.25, 74.2, 74.55, 74.63, 79.72, 89.73, 88.76, 89.41, 89.4, 89.48, 91.44, 96.2, 97.7, 98.64, 96, 99.51, 99.65, 104.22, 109.62, 112.33, 104.09, 104.1, 105.36, 107.42, 102.41, 103.97, 101.97, 102.72, 107.98, 110.29, 112.26, 113.87, 111.9, 116.87, 118.36, 106.02, 109.93, 116.3, 116.98, 117.41, 133.16, 135.8, 141.71, 162.69, 169.95, 169.01, 164.66, 171.55, 163.81, 169, 169.37] },
      velocityScore: { '1D': 3.4, '1W': 2.9, '1M': -12, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 57.8, revenueGrowth: 54, eps: 2.93, grossMargin: 37, dividendYield: 0.46,
      etfPresence: { POW: 4.02, VOLT: 3.24, PBD: false, PBW: false, IVEP: 3.36 },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'NEE', name: 'NEE', easyScore: 3, avgWeight: 3.35, proScore: 2.01, coverage: 0.6,
      price: 86.45, weeklyPrices: [86.23, 85.73, 86.75, 86.08, 86.45], weeklyChange: 0.26, dayChange: 0.43, sortRank: 0, periodReturns: { '1M': -2.4, 'YTD': 7.7, '6M': 8.4, '1Y': 22.2 },
      priceHistory: { '1D': [86.08, 86.56, 86.43, 86.49, 86.63, 86.53, 86.56, 86.67, 86.66, 86.51, 86.56, 86.48, 86.39, 86.54, 86.58, 86.48, 86.43, 86.41, 86.54, 86.59, 86.54, 86.54, 86.6, 86.45], '1W': [86.23, 85.73, 86.75, 86.08, 86.45], '1M': [87.65, 87.65, 87.25, 87.01, 83.66, 85.68, 84.58, 85.68, 85.84, 84.01, 84.83, 85.12, 84.84, 85.99, 86.12, 86.23, 85.73, 86.75, 86.08, 86.45], 'YTD': [80.28, 79.49, 81.98, 85.07, 88.18, 89.21, 91.36, 91.64, 91.99, 92.6, 91.66, 90.96, 91.16, 92.88, 94.17, 91.24, 90, 96.51, 96.28, 94.59, 89.04, 87.65, 85.68, 84.83, 86.12, 86.45], '6M': [79.79, 80.28, 79.49, 82.19, 84.81, 87.9, 89.47, 91.93, 92.18, 93.77, 91.02, 92.78, 89.5, 91.4, 92.73, 92.3, 92.01, 94.83, 95.51, 93.1, 93.36, 88.55, 83.66, 84.01, 86.12, 86.45], '1Y': [70.73, 69.42, 72.46, 74.7, 77.54, 71.95, 71.18, 72.45, 75.72, 75.32, 72.65, 70.07, 69.83, 72.32, 75.49, 83.21, 84.64, 83.99, 83.57, 81.69, 84.77, 85.75, 84.23, 84.58, 79.64, 81.32, 79.79, 80.28, 79.49, 82.19, 84.81, 87.9, 89.21, 91.93, 92.18, 93.77, 91.02, 92.78, 89.5, 91.4, 92.73, 92.3, 92.01, 94.83, 95.51, 93.1, 93.36, 88.55, 83.66, 84.01, 86.12, 86.45] },
      velocityScore: { '1D': -2, '1W': -4.3, '1M': -19.6, '6M': null }, isNew: false,
      marketCap: '$180B', pe: 21.9, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.9,
      etfPresence: { POW: 1.96, VOLT: 4.71, PBD: false, PBW: false, IVEP: 3.39 },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'HUBB', name: 'HUBB', easyScore: 3, avgWeight: 3.03, proScore: 1.82, coverage: 0.6,
      price: 512.45, weeklyPrices: [502.65, 508.87, 523.69, 539.39, 512.45], weeklyChange: 1.95, dayChange: -5, sortRank: 0, periodReturns: { '1M': 7.9, 'YTD': 15.4, '6M': 12.4, '1Y': 29.8 },
      priceHistory: { '1D': [539.39, 510.17, 514.15, 520.63, 516.71, 514.34, 513.28, 515.89, 515.16, 516.19, 517.67, 519.39, 519.55, 520.39, 520.05, 520.53, 521.93, 520.18, 518.68, 517.39, 515.92, 515.09, 513.09, 512.45], '1W': [502.65, 508.87, 523.69, 539.39, 512.45], '1M': [478.05, 484.25, 473.93, 473.61, 462.93, 480.46, 484.91, 485.27, 476.82, 485.03, 486.47, 467.59, 469.32, 476.89, 489.73, 502.65, 508.87, 523.69, 539.39, 512.45], 'YTD': [444.11, 460.87, 476.06, 484.06, 497.97, 487.4, 516.03, 526.56, 524.19, 490.78, 477.97, 477.47, 503.2, 490.74, 527.21, 526.94, 549.75, 544.71, 507.81, 485.98, 470.87, 478.05, 480.46, 486.47, 489.73, 512.45], '6M': [455.92, 444.11, 460.87, 484.11, 485.53, 487.94, 503.8, 516.02, 526.73, 511.63, 471.54, 467.38, 475.74, 480.97, 499.2, 539.79, 546.23, 555.34, 516, 492.58, 479.97, 475.01, 462.93, 485.03, 489.73, 512.45], '1Y': [394.69, 408.41, 412.5, 414.86, 428.55, 427.33, 427.67, 417.54, 432.22, 437.56, 430.15, 437.24, 435.44, 435.23, 430.31, 412.93, 427.43, 435.29, 455.34, 459.44, 462.28, 420.57, 424.08, 427.48, 438.7, 438.42, 455.92, 444.11, 460.87, 484.11, 485.53, 487.94, 487.4, 516.02, 526.73, 511.63, 471.54, 467.38, 475.74, 480.97, 499.2, 539.79, 546.23, 555.34, 516, 492.58, 479.97, 475.01, 462.93, 485.03, 489.73, 512.45] },
      velocityScore: { '1D': 3.4, '1W': 5.8, '1M': -14.2, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 30.3, revenueGrowth: 11, eps: 16.94, grossMargin: 36, dividendYield: 1.05,
      etfPresence: { POW: 3.04, VOLT: 3.46, PBD: false, PBW: false, IVEP: 2.58 },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'BELFB', name: 'BELFB', easyScore: 2, avgWeight: 5.51, proScore: 2.2, coverage: 0.4,
      price: 292.41, weeklyPrices: [293.22, 299.84, 296.39, 304.33, 292.41], weeklyChange: -0.28, dayChange: -3.92, sortRank: 0, periodReturns: { '1M': 8.3, 'YTD': 72.4, '6M': 65, '1Y': 213.4 },
      priceHistory: { '1D': [304.33, 289.52, 292.77, 294.6, 293.42, 293.33, 292.13, 293.49, 296.37, 294.21, 293.67, 293.83, 297.08, 297.93, 298.17, 299.3, 298.81, 298.78, 297.29, 297.15, 296.36, 295.22, 292.5, 292.41], '1W': [293.22, 299.84, 296.39, 304.33, 292.41], '1M': [276.25, 280.13, 276.96, 274.52, 269.86, 269.22, 280.09, 276.54, 262.56, 279.13, 276.04, 276.95, 296.55, 293.87, 302.15, 293.22, 299.84, 296.39, 304.33, 292.41], 'YTD': [169.63, 180.24, 192.96, 200.29, 210.44, 208, 238.4, 230.06, 232.12, 213.8, 200.88, 205.74, 220.77, 197.98, 228.29, 236.04, 262.68, 249.82, 297.17, 298.22, 258.28, 276.25, 269.22, 276.04, 302.15, 292.41], '6M': [177.23, 169.63, 180.24, 196.61, 196.5, 201.19, 220.78, 231.48, 235.04, 229.71, 191.87, 197.65, 204.09, 203.53, 206.9, 237.93, 254.38, 250.96, 286.69, 297.98, 256.72, 270.01, 269.86, 279.13, 302.15, 292.41], '1Y': [93.31, 97.69, 101.2, 98.24, 106, 130.49, 131.71, 128.22, 131.57, 137.03, 135.97, 143.15, 148.78, 146.79, 141.02, 141.25, 147.14, 148, 154.78, 154.25, 166.99, 141.86, 145.88, 161.55, 167.43, 171.76, 177.23, 169.63, 180.24, 196.61, 196.5, 201.19, 208, 231.48, 235.04, 229.71, 191.87, 197.65, 204.09, 203.53, 206.9, 237.93, 254.38, 250.96, 286.69, 297.98, 256.72, 270.01, 269.86, 279.13, 302.15, 292.41] },
      velocityScore: { '1D': 0, '1W': -4.3, '1M': -39.6, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 70.6, revenueGrowth: 17, eps: 4.14, grossMargin: 39, dividendYield: 0.09,
      etfPresence: { POW: 3.41, VOLT: 7.61, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 2, avgWeight: 3.53, proScore: 1.41, coverage: 0.4,
      price: 317.48, weeklyPrices: [299.60, 317.58, 333.05, 357.96, 317.48], weeklyChange: 5.97, dayChange: -11.31, sortRank: 0, periodReturns: { '1M': -3, 'YTD': 96, '6M': 91, '1Y': 172.4 },
      priceHistory: { '1D': [357.96, 318.67, 324.51, 327.89, 327.3, 321.76, 320.64, 321.81, 321.04, 321.14, 322.91, 325.96, 326.3, 326.22, 324.78, 322.88, 324.33, 323.45, 321.88, 320.24, 320.85, 319.79, 317.04, 317.48], '1W': [299.6, 317.58, 333.05, 357.96, 317.48], '1M': [323.91, 319.78, 314.18, 315.71, 323.39, 334.49, 331.44, 323.92, 300.51, 300.57, 289.52, 280.98, 297.88, 302.87, 311.93, 299.6, 317.58, 333.05, 357.96, 317.48], 'YTD': [162.01, 160.78, 170.86, 181.12, 195.1, 177.75, 248.51, 243.06, 259.23, 251.28, 268.26, 264.71, 276.16, 250.58, 281.03, 301.16, 305.14, 305.03, 341.02, 367.13, 339.73, 323.91, 334.49, 289.52, 311.93, 317.48], '6M': [166.26, 162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 236.51, 243.75, 254.89, 241.78, 258.88, 255.88, 251.07, 258.73, 299.96, 314.41, 322.43, 330.97, 339.97, 370.94, 327.46, 323.39, 300.57, 311.93, 317.48], '1Y': [116.54, 128.41, 125.89, 127.37, 125.29, 142.7, 138.76, 139.83, 135.69, 125.02, 124.01, 125.58, 136.65, 142.61, 150.86, 158.87, 175.15, 174.8, 190.57, 180.82, 187.84, 166.65, 168.91, 180.91, 178.38, 160.66, 166.26, 162.01, 160.78, 172.54, 182.49, 186.18, 177.75, 236.51, 243.75, 254.89, 241.78, 258.88, 255.88, 251.07, 258.73, 299.96, 314.41, 322.43, 330.97, 339.97, 370.94, 327.46, 323.39, 300.57, 311.93, 317.48] },
      velocityScore: { '1D': 5.2, '1W': 9.3, '1M': -17.5, '6M': null }, isNew: false,
      marketCap: '$122B', pe: 80, revenueGrowth: 30, eps: 3.97, grossMargin: 37, dividendYield: 0.07,
      etfPresence: { POW: false, VOLT: 2.67, PBD: false, PBW: false, IVEP: 4.39 },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'AEP', name: 'AEP', easyScore: 2, avgWeight: 2.67, proScore: 1.07, coverage: 0.4,
      price: 133.08, weeklyPrices: [129.75, 128.27, 127.69, 130.30, 133.08], weeklyChange: 2.57, dayChange: 2.13, sortRank: 0, periodReturns: { '1M': 1.1, 'YTD': 15.4, '6M': 15.6, '1Y': 28.8 },
      priceHistory: { '1D': [130.3, 131.11, 131.02, 131.69, 132.17, 132.14, 132.27, 132.38, 132.64, 132.32, 132.53, 132.43, 132.42, 132.6, 132.63, 132.48, 132.35, 132.33, 132.6, 132.82, 133.09, 133.14, 133.34, 133.08], '1W': [129.75, 128.27, 127.69, 130.3, 133.08], '1M': [130.9, 129.57, 127.76, 126.67, 123.79, 127.11, 126.31, 127.79, 129.14, 126.77, 127.76, 128.53, 128.48, 129.23, 129.31, 129.75, 128.27, 127.69, 130.3, 133.08], 'YTD': [115.31, 115.93, 118.11, 117.18, 119.21, 120.61, 122.25, 128.42, 132.1, 133.52, 131.26, 130.97, 128.3, 131.08, 134.71, 134.39, 131.62, 135.59, 137.04, 131.94, 127.68, 130.9, 127.11, 127.76, 129.31, 133.08], '6M': [115.15, 115.31, 115.93, 119.4, 116.63, 119.78, 120.8, 126.43, 129.37, 133.82, 131.87, 133.61, 125.66, 130.1, 132.36, 134.46, 133.28, 135.07, 134.66, 130.16, 125.15, 131.59, 123.79, 126.77, 129.31, 133.08], '1Y': [103.31, 103.76, 103.96, 104.4, 110.16, 109.22, 113.24, 112, 110.7, 113.01, 110.09, 108.36, 106.84, 108.14, 112.5, 118.16, 118.38, 117.43, 115.11, 120.3, 122.56, 123.72, 122.04, 119.23, 116.07, 114.57, 115.15, 115.31, 115.93, 119.4, 116.63, 119.78, 120.61, 126.43, 129.37, 133.82, 131.87, 133.61, 125.66, 130.1, 132.36, 134.46, 133.28, 135.07, 134.66, 130.16, 125.15, 131.59, 123.79, 126.77, 129.31, 133.08] },
      velocityScore: { '1D': -16.4, '1W': -4.5, '1M': -46.8, '6M': null }, isNew: false,
      marketCap: '$72B', pe: 19.7, revenueGrowth: 10, eps: 6.76, grossMargin: 47, dividendYield: 2.92,
      etfPresence: { POW: 1.33, VOLT: 4.01, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 2.49, proScore: 1, coverage: 0.4,
      price: 75.23, weeklyPrices: [71.48, 71.25, 73.12, 74.95, 75.23], weeklyChange: 5.25, dayChange: 0.37, sortRank: 0, periodReturns: { '1M': -4.1, 'YTD': 25.2, '6M': 25.9, '1Y': 24.4 },
      priceHistory: { '1D': [74.95, 74.49, 75.03, 75.22, 75.37, 75.42, 75.36, 75.48, 75.35, 74.99, 74.95, 74.96, 75.04, 75.02, 75.14, 75.19, 75.28, 75.29, 75.43, 75.24, 75.25, 75.28, 75.3, 75.23], '1W': [71.48, 71.25, 73.12, 74.95, 75.23], '1M': [76.34, 74.37, 73.13, 71.39, 70.04, 71.31, 71.66, 72.43, 71.96, 71.59, 71.59, 72.26, 71.62, 72.08, 71.49, 71.48, 71.25, 73.12, 74.95, 75.23], 'YTD': [60.11, 61.15, 60.71, 63.72, 67.24, 67.42, 71.12, 72.17, 74.77, 75.77, 74.4, 72.8, 73.81, 72.78, 73.01, 70.76, 71.1, 73.04, 76.12, 74.73, 77.69, 76.34, 71.31, 71.59, 71.49, 75.23], '6M': [59.75, 60.11, 61.15, 60.29, 64.96, 67.26, 66.92, 71.13, 72.98, 74.72, 74.24, 73.34, 72.41, 73.58, 72.59, 71.54, 70.91, 71.61, 75.41, 71.96, 77.72, 78.47, 70.04, 71.59, 71.49, 75.23], '1Y': [60.48, 62.81, 57.69, 58.37, 57.36, 58.89, 59, 58.06, 56.52, 56.83, 57.38, 57.57, 57.95, 61.39, 63.35, 63.97, 62.36, 62.34, 57.59, 56.51, 60.6, 59.91, 59.43, 60.21, 61.55, 58.41, 59.75, 60.11, 61.15, 60.29, 64.96, 67.26, 67.42, 71.13, 72.98, 74.72, 74.24, 73.34, 72.41, 73.58, 72.59, 71.54, 70.91, 71.61, 75.41, 71.96, 77.72, 78.47, 70.04, 71.59, 71.49, 75.23] },
      velocityScore: { '1D': 1, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$92B', pe: 33, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.8,
      etfPresence: { POW: false, VOLT: 1.47, PBD: false, PBW: false, IVEP: 3.52 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'JCI', name: 'JOHNSON CONTROLS INTERNATIONAL PLC', easyScore: 2, avgWeight: 2.46, proScore: 0.98, coverage: 0.4,
      price: 142.09, weeklyPrices: [145.17, 143.62, 144.82, 148.21, 142.09], weeklyChange: -2.12, dayChange: -4.13, sortRank: 0, periodReturns: { '1M': 2.7, 'YTD': 18.7, '6M': 17.3, '1Y': 37.5 },
      priceHistory: { '1D': [148.21, 142.6, 143.13, 144.62, 143.66, 142.4, 142.54, 142.57, 142.3, 142.66, 142.8, 143.03, 142.97, 143.49, 143.63, 143.35, 143.51, 143.17, 142.87, 142.21, 142.21, 142.1, 142.02, 142.09], '1W': [145.17, 143.62, 144.82, 148.21, 142.09], '1M': [140.22, 138.2, 136.15, 134.06, 133.91, 141.99, 146.96, 147.4, 143.65, 144.05, 147.75, 139.36, 144.01, 144.96, 146.06, 145.17, 143.62, 144.82, 148.21, 142.09], 'YTD': [119.75, 111.29, 112.13, 114.51, 120.28, 132.52, 140.96, 142.7, 143.42, 140, 134.99, 133.76, 137.48, 130.95, 139, 137.21, 139.81, 141.59, 144.82, 141.04, 137.31, 140.22, 141.99, 147.75, 146.06, 142.09], '6M': [121.13, 119.75, 111.29, 112.95, 113.59, 119.26, 137.65, 138.57, 143.79, 144.3, 132.4, 130.16, 129.7, 131.29, 133.75, 142.82, 140.98, 143.38, 144.4, 139.52, 143.08, 138.36, 133.91, 144.05, 146.06, 142.09], '1Y': [103.35, 105.62, 105.5, 106.02, 108.3, 103.24, 104.84, 105.71, 105.71, 106.4, 105.96, 106.29, 106.96, 108.29, 109.95, 108.31, 107.85, 111.18, 112.21, 111.04, 122.58, 116.38, 114.19, 115.28, 115.77, 118.85, 121.13, 119.75, 111.29, 112.95, 113.59, 119.26, 132.52, 138.57, 143.79, 144.3, 132.4, 130.16, 129.7, 131.29, 133.75, 142.82, 140.98, 143.38, 144.4, 139.52, 143.08, 138.36, 133.91, 144.05, 146.06, 142.09] },
      velocityScore: { '1D': 0, '1W': -3.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$87B', pe: 43.3, revenueGrowth: 8, eps: 3.28, grossMargin: 37, dividendYield: 1.08,
      etfPresence: { POW: false, VOLT: 1.4, PBD: false, PBW: false, IVEP: 3.52 },
      tonyNote: 'JOHNSON CONTROLS INTERNATIONAL PLC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CEG', name: 'CEG', easyScore: 2, avgWeight: 2.36, proScore: 0.94, coverage: 0.4,
      price: 271.41, weeklyPrices: [268.00, 267.17, 274.06, 275.53, 271.41], weeklyChange: 1.27, dayChange: -1.5, sortRank: 0, periodReturns: { '1M': -7.7, 'YTD': -23.2, '6M': -24.9, '1Y': -13.9 },
      priceHistory: { '1D': [275.53, 270.52, 271.22, 274.3, 273.87, 273.39, 273.25, 273.89, 273.47, 273.93, 273.86, 274.86, 274.76, 274.81, 275.21, 274.62, 274.15, 274.83, 274.81, 274.12, 273.73, 272.82, 272, 271.41], '1W': [268, 267.17, 274.06, 275.53, 271.41], '1M': [301.57, 288.68, 286.31, 287.75, 265.7, 272.65, 267.24, 264.59, 254.83, 250.67, 251.65, 242.3, 246.71, 253.76, 262.35, 268, 267.17, 274.06, 275.53, 271.41], 'YTD': [353.27, 322.54, 330.38, 287.35, 287.45, 247.06, 276.85, 291.66, 323.56, 322.85, 300.69, 317.22, 303.32, 279.25, 284.27, 294.73, 287.16, 305.71, 320.42, 293.6, 262, 301.57, 272.65, 251.65, 262.35, 271.41], '6M': [361.33, 353.27, 322.54, 341.2, 289.06, 280.68, 261.42, 276.12, 294.84, 329.88, 319.06, 301.77, 281.99, 301.49, 275.16, 291.72, 287.56, 315.17, 321.05, 303.63, 267.2, 294.07, 265.7, 250.67, 262.35, 271.41], '1Y': [315.21, 322.76, 312.84, 317.99, 317.79, 330.52, 343.57, 331.49, 322.77, 310.68, 307.19, 300.82, 322.91, 336.65, 329.07, 358.16, 389.56, 358.79, 384.95, 362.82, 360.93, 338.67, 354.11, 363.67, 359.15, 365.63, 361.33, 353.27, 322.54, 341.2, 289.06, 280.68, 247.06, 276.12, 294.84, 329.88, 319.06, 301.77, 281.99, 301.49, 275.16, 291.72, 287.56, 315.17, 321.05, 303.63, 267.2, 294.07, 265.7, 250.67, 262.35, 271.41] },
      velocityScore: { '1D': 1.1, '1W': 1.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$97B', pe: 23.6, revenueGrowth: 64, eps: 11.52, grossMargin: 23, dividendYield: 0.62,
      etfPresence: { POW: 1.38, VOLT: false, PBD: false, PBW: false, IVEP: 3.34 },
      tonyNote: 'CEG appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX TECHNOLOGIES INC', easyScore: 2, avgWeight: 2.14, proScore: 0.86, coverage: 0.4,
      price: 210.66, weeklyPrices: [196.93, 203.07, 205.40, 210.00, 210.66], weeklyChange: 6.97, dayChange: 0.31, sortRank: 0, periodReturns: { '1M': 3.8, 'YTD': 21.9, '6M': 18.6, '1Y': 48.3 },
      priceHistory: { '1D': [210, 207.88, 210.57, 212.43, 213.52, 211.66, 211.93, 212.66, 211.53, 211.32, 212.24, 213.14, 214.1, 214.01, 214.31, 214.82, 214.85, 214.31, 214.26, 213.49, 213.04, 212.27, 210.46, 210.66], '1W': [196.93, 203.07, 205.4, 210, 210.66], '1M': [204.38, 198.95, 199.27, 195.88, 188.39, 187.26, 184.72, 190.76, 185.95, 187.46, 188.96, 183, 194.68, 193.45, 193.94, 196.93, 203.07, 205.4, 210, 210.66], 'YTD': [172.84, 193.2, 204.08, 206.33, 210.18, 187.42, 198.5, 209.07, 207.24, 205.57, 195.98, 208.98, 222.13, 204.49, 231.78, 238.42, 219.1, 216.18, 206.15, 206.83, 201.94, 204.38, 187.26, 188.96, 193.94, 210.66], '6M': [177.62, 172.84, 193.2, 213.25, 207.75, 205.43, 197.19, 196.9, 206.44, 205.98, 195.23, 194.13, 199.75, 202.59, 215.98, 232.83, 228.24, 222.07, 216.68, 205.33, 204.72, 202.91, 188.39, 187.46, 193.94, 210.66], '1Y': [142.06, 144.06, 137.37, 137.45, 140.04, 150.28, 182, 177.89, 170.94, 162.84, 160.03, 162.23, 176.65, 178.02, 184.37, 191.39, 202.46, 205.24, 207.62, 200.39, 198.79, 176.18, 174.62, 176.2, 177.16, 173.2, 177.62, 172.84, 193.2, 213.25, 207.75, 205.43, 187.42, 196.9, 206.44, 205.98, 195.23, 194.13, 199.75, 202.59, 215.98, 232.83, 228.24, 222.07, 216.68, 205.33, 204.72, 202.91, 188.39, 187.46, 193.94, 210.66] },
      velocityScore: { '1D': 0, '1W': 3.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 56, revenueGrowth: 26, eps: 3.76, grossMargin: 23, dividendYield: 0.5,
      etfPresence: { POW: false, VOLT: 2.1, PBD: false, PBW: false, IVEP: 2.18 },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'XEL', name: 'XEL', easyScore: 2, avgWeight: 1.85, proScore: 0.74, coverage: 0.4,
      price: 79.97, weeklyPrices: [78.98, 77.46, 77.41, 78.81, 79.97], weeklyChange: 1.25, dayChange: 1.47, sortRank: 0, periodReturns: { '1M': -1.4, 'YTD': 8.3, '6M': 8.1, '1Y': 17.8 },
      priceHistory: { '1D': [78.81, 79.22, 79.19, 79.34, 79.77, 79.74, 79.71, 79.8, 79.91, 79.79, 79.86, 79.76, 79.68, 79.79, 79.79, 79.72, 79.56, 79.67, 79.82, 79.89, 79.95, 80, 80.1, 79.97], '1W': [78.98, 77.46, 77.41, 78.81, 79.97], '1M': [80.78, 81, 79.26, 79.5, 76.41, 77.87, 77.39, 77.77, 79.04, 77.62, 77.87, 78.1, 78.27, 79.22, 79.35, 78.98, 77.46, 77.41, 78.81, 79.97], 'YTD': [73.86, 73.38, 76.2, 75.86, 75.97, 76.12, 77.92, 80.82, 83.47, 83.04, 81, 80.02, 77.7, 79.44, 81.46, 78.65, 78.11, 79.48, 81.45, 79.9, 78.1, 80.78, 77.87, 77.87, 79.35, 79.97], '6M': [74.01, 73.86, 73.38, 75.36, 75.01, 76.06, 75.9, 78.98, 81.55, 83.36, 82.52, 81.91, 76.77, 78.09, 80.39, 80.45, 80.32, 79.41, 81.17, 79.39, 77.92, 81.08, 76.41, 77.62, 79.35, 79.97], '1Y': [67.91, 68.1, 67.56, 68.33, 73.06, 72.34, 73.73, 72.68, 72.21, 73.03, 72.14, 72.02, 72.11, 73.04, 80.65, 81.85, 80.85, 80.64, 79.82, 81.59, 80.4, 81.31, 80.26, 79.04, 75.72, 73.73, 74.01, 73.86, 73.38, 75.36, 75.01, 76.06, 76.12, 78.98, 81.55, 83.36, 82.52, 81.91, 76.77, 78.09, 80.39, 80.45, 80.32, 79.41, 81.17, 79.39, 77.92, 81.08, 76.41, 77.62, 79.35, 79.97] },
      velocityScore: { '1D': null, '1W': -5.1, '1M': null, '6M': null }, isNew: true,
      marketCap: '$50B', pe: 23, revenueGrowth: 3, eps: 3.47, grossMargin: 46, dividendYield: 3.01,
      etfPresence: { POW: 1.88, VOLT: 1.82, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'XEL appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 1.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NRG', name: 'NRG ENERGY INC', easyScore: 2, avgWeight: 1.6, proScore: 0.64, coverage: 0.4,
      price: 136.91, weeklyPrices: [132.10, 132.13, 135.06, 138.91, 136.91], weeklyChange: 3.64, dayChange: -1.44, sortRank: 0, periodReturns: { '1M': -0.5, 'YTD': -14, '6M': -13.4, '1Y': -10 },
      priceHistory: { '1D': [138.91, 135.77, 135.74, 137.5, 137.38, 136.91, 136.87, 137.63, 137.13, 137.32, 137.23, 137.96, 137.93, 137.81, 138.19, 138.32, 138.43, 138.56, 138.66, 138.16, 137.78, 137.66, 137.11, 136.91], '1W': [132.1, 132.13, 135.06, 138.91, 136.91], '1M': [140.43, 138, 137.5, 134.08, 129.47, 133.51, 133.76, 133.39, 129.2, 127.71, 129.96, 120.65, 123.7, 125.47, 130.4, 132.1, 132.13, 135.06, 138.91, 136.91], 'YTD': [159.24, 143.53, 149.83, 151.09, 153.72, 144.44, 160.63, 175.01, 181.34, 163.54, 148.63, 159.11, 151.04, 146.14, 160.3, 168.45, 149.6, 154.81, 157.43, 137.34, 125.5, 140.43, 133.51, 129.96, 130.4, 136.91], '6M': [158.11, 159.24, 143.53, 158.5, 149.3, 152.63, 153.32, 161.8, 179.18, 178.96, 154.32, 152.87, 145.8, 147.74, 149.8, 170.24, 157.18, 160.15, 154.82, 138.11, 127.81, 137.65, 129.47, 127.71, 130.4, 136.91], '1Y': [152.05, 160.58, 151.27, 146.88, 153.96, 159.87, 171.96, 152.03, 150.44, 144.77, 145.11, 152.26, 164.22, 167.43, 161.95, 162.61, 165.61, 163.59, 172.76, 167.99, 166.72, 163.21, 166.85, 164.08, 166.75, 160.15, 158.11, 159.24, 143.53, 158.5, 149.3, 152.63, 144.44, 161.8, 179.18, 178.96, 154.32, 152.87, 145.8, 147.74, 149.8, 170.24, 157.18, 160.15, 154.82, 138.11, 127.81, 137.65, 129.47, 127.71, 130.4, 136.91] },
      velocityScore: { '1D': -12.3, '1W': 1.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$29B', pe: 148.8, revenueGrowth: 20, eps: 0.92, grossMargin: 16, dividendYield: 1.37,
      etfPresence: { POW: false, VOLT: 0.95, PBD: false, PBW: false, IVEP: 2.25 },
      tonyNote: 'NRG ENERGY INC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 1.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SHLS', name: 'Shoals Technologies Group Inc', easyScore: 2, avgWeight: 1.56, proScore: 0.62, coverage: 0.4,
      price: 10.31, weeklyPrices: [9.96, 9.44, 10.42, 10.94, 10.31], weeklyChange: 3.56, dayChange: -5.71, sortRank: 0, periodReturns: { '1M': 4.1, 'YTD': 21.4, '6M': 13.2, '1Y': 108.4 },
      priceHistory: { '1D': [10.94, 10.64, 10.78, 10.65, 10.71, 10.57, 10.55, 10.57, 10.52, 10.52, 10.55, 10.6, 10.62, 10.65, 10.61, 10.56, 10.61, 10.6, 10.59, 10.48, 10.4, 10.37, 10.34, 10.31], '1W': [9.96, 9.44, 10.42, 10.94, 10.31], '1M': [10.82, 12.12, 12.2, 12.45, 12.18, 12.46, 12.39, 12.77, 10.81, 10.88, 9.63, 9.25, 9.89, 10.43, 10.3, 9.96, 9.44, 10.42, 10.94, 10.31], 'YTD': [8.5, 8.6, 9.14, 9.66, 10.02, 9.65, 9.79, 10.19, 6.35, 6.14, 6.27, 5.95, 6.91, 6.58, 6.95, 7.23, 7.5, 7.65, 8.13, 8.63, 9.66, 10.82, 12.46, 9.63, 10.3, 10.31], '6M': [9.11, 8.5, 8.6, 9.37, 9.22, 9.44, 10.29, 9.66, 10.61, 5.93, 5.71, 6.13, 6.1, 6.62, 6.56, 6.67, 7.08, 7.8, 8.27, 8.84, 10.33, 9.91, 12.18, 10.88, 10.3, 10.31], '1Y': [4.95, 4.25, 5.72, 5.83, 6, 5.58, 4.67, 4.46, 6.04, 6.8, 6.72, 6.65, 7.11, 7.2, 7.41, 8.54, 10.13, 10.48, 10.53, 9.24, 9.39, 7.95, 7.76, 7.82, 8.08, 8.54, 9.11, 8.5, 8.6, 9.37, 9.22, 9.44, 9.65, 9.66, 10.61, 5.93, 5.71, 6.13, 6.1, 6.62, 6.56, 6.67, 7.08, 7.8, 8.27, 8.84, 10.33, 9.91, 12.18, 10.88, 10.3, 10.31] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$2B', pe: 51.6, revenueGrowth: 75, eps: 0.2, grossMargin: 33, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: 1.13, PBW: 1.99, IVEP: false },
      tonyNote: 'Shoals Technologies Group Inc appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 1.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VICR', name: 'VICR', easyScore: 1, avgWeight: 5.7, proScore: 1.14, coverage: 0.2,
      price: 331.35, weeklyPrices: [320.46, 325.17, 331.37, 365.53, 331.35], weeklyChange: 3.4, dayChange: -9.35, sortRank: 0, periodReturns: { '1M': 23.6, 'YTD': 202.3, '6M': 204.1, '1Y': 656 },
      priceHistory: { '1D': [365.53, 328.98, 332.11, 340, 346.07, 344.32, 344.34, 343.8, 343.01, 339, 340, 339.88, 338, 338.83, 340.64, 338.26, 341.64, 339.69, 338.64, 336.02, 335.64, 333, 331.2, 331.35], '1W': [320.46, 325.17, 331.37, 365.53, 331.35], '1M': [332.95, 345.84, 342.09, 334.84, 328.85, 332.95, 330.48, 306.12, 271.04, 274.97, 283.48, 275.51, 298.06, 303.77, 322.41, 320.46, 325.17, 331.37, 365.53, 331.35], 'YTD': [109.6, 136.11, 145.32, 166.78, 171.53, 148.19, 160.71, 152.84, 205.64, 203.19, 178.83, 191.84, 186, 161, 179.99, 194.2, 265, 248.7, 266.01, 292.53, 249.02, 332.95, 332.95, 283.48, 322.41, 331.35], '6M': [108.97, 109.6, 136.11, 145.48, 153.29, 157.67, 159.87, 164.29, 170.01, 201.4, 162.67, 172.57, 164.54, 153.02, 155.71, 186.22, 224.81, 268.61, 251.02, 256.47, 273.67, 267.99, 328.85, 274.97, 322.41, 331.35], '1Y': [43.83, 45.36, 45.64, 46.69, 45.2, 45.72, 46.91, 46.28, 48.13, 50.7, 50.47, 50.06, 52.06, 53.82, 49.72, 48.63, 53.65, 65.8, 89.65, 88.36, 92.39, 87.08, 87.66, 91.14, 99.3, 93.45, 108.97, 109.6, 136.11, 145.48, 153.29, 157.67, 148.19, 164.29, 170.01, 201.4, 162.67, 172.57, 164.54, 153.02, 155.71, 186.22, 224.81, 268.61, 251.02, 256.47, 273.67, 267.99, 328.85, 274.97, 322.41, 331.35] },
      velocityScore: { '1D': null, '1W': 5.6, '1M': -50.6, '6M': null }, isNew: true,
      marketCap: '$15B', pe: 110.4, revenueGrowth: 20, eps: 3, grossMargin: 54, dividendYield: null,
      etfPresence: { POW: 5.7, VOLT: false, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Vicor Corp is a power conversion specialist — high-efficiency modules for AI server power delivery. It holds a niche position in Industrials ETFs on the data center power density thesis. Revenue growth has been lumpy, but when AI GPU clusters require Vicor\'s factorized power architecture, the order cycles are large.',
    },
    {
      ticker: 'AEIS', name: 'ADVANCED ENERGY INDUSTRIES INC', easyScore: 1, avgWeight: 4.62, proScore: 0.92, coverage: 0.2,
      price: 361.3, weeklyPrices: [350.45, 353.32, 372.59, 388.23, 361.30], weeklyChange: 3.1, dayChange: -6.94, sortRank: 0, periodReturns: { '1M': 11.2, 'YTD': 72.6, '6M': 66.1, '1Y': 177.9 },
      priceHistory: { '1D': [388.23, 364.6, 363.46, 371.65, 370.18, 364.23, 363.02, 363.09, 362.17, 363.32, 364.99, 367.75, 366.79, 367.31, 367.49, 364.42, 367.35, 366.22, 366.05, 365.97, 363.62, 362.25, 360.79, 361.3], '1W': [350.45, 353.32, 372.59, 388.23, 361.3], '1M': [339.65, 328.34, 317.08, 302.18, 294.65, 312.28, 322.5, 320.92, 294.81, 306.11, 311.64, 308.17, 340.4, 354.37, 370.66, 350.45, 353.32, 372.59, 388.23, 361.3], 'YTD': [209.37, 210.99, 237.9, 275.57, 269.12, 257.64, 308.77, 320.64, 337.35, 330.54, 314.84, 319.63, 342.87, 322.71, 366.95, 374.32, 377.19, 369.08, 345.63, 339.42, 309.06, 339.65, 312.28, 311.64, 370.66, 361.3], '6M': [217.51, 209.37, 210.99, 257.29, 262.19, 255.36, 273.26, 312.95, 331.23, 335.57, 290.78, 302.02, 317.21, 310.76, 331.9, 378.94, 380.22, 385.68, 387.03, 357.24, 323.46, 324.86, 294.65, 306.11, 370.66, 361.3], '1Y': [130.03, 132.5, 138.07, 139.1, 140.68, 142.21, 139.58, 151.61, 153.23, 153.01, 145.49, 154.76, 158.03, 176.59, 170.14, 173.09, 182.75, 196.58, 204.62, 195.05, 219.3, 198.54, 206.04, 210.94, 221.27, 215.16, 217.51, 209.37, 210.99, 257.29, 262.19, 255.36, 257.64, 312.95, 331.23, 335.57, 290.78, 302.02, 317.21, 310.76, 331.9, 378.94, 380.22, 385.68, 387.03, 357.24, 323.46, 324.86, 294.65, 306.11, 370.66, 361.3] },
      velocityScore: { '1D': -18.6, '1W': 0, '1M': -48.9, '6M': null }, isNew: false,
      marketCap: '$14B', pe: 75.1, revenueGrowth: 26, eps: 4.81, grossMargin: 39, dividendYield: 0.1,
      etfPresence: { POW: false, VOLT: 4.62, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 5.6, proScore: 2.24, coverage: 0.4,
      price: 885.81, weeklyPrices: [857.76, 838.21, 861.88, 932.75, 885.81], weeklyChange: 3.27, dayChange: -5.03, sortRank: 0, periodReturns: { '1M': 20.9, 'YTD': 189.3, '6M': 180.4, '1Y': 298.1 },
      priceHistory: { '1D': [932.75, 846.77, 866.78, 887.21, 879.25, 873.57, 880.69, 880.44, 870.97, 872, 878.41, 892.75, 896.65, 899.97, 901.09, 897.22, 901.72, 900.44, 897.42, 888.74, 889.54, 890.85, 883.03, 885.81], '1W': [857.76, 838.21, 861.88, 932.75, 885.81], '1M': [783.53, 782.12, 842.96, 860.84, 845.39, 875.52, 957.03, 993.74, 882.43, 891.86, 842.01, 770.25, 838.55, 858.99, 866.67, 857.76, 838.21, 861.88, 932.75, 885.81], 'YTD': [306.23, 297.62, 319.27, 364.25, 379.23, 365.07, 433.91, 415.13, 433.34, 420.22, 420.6, 421.23, 452.92, 407.27, 423.35, 456.08, 487.87, 471.85, 806, 851.35, 770.76, 783.53, 875.52, 842.01, 866.67, 885.81], '6M': [315.87, 306.23, 297.62, 336.31, 351.39, 357.91, 401.29, 431.43, 435.5, 428.13, 395.11, 398.12, 401.61, 420.24, 393.71, 459.02, 472.9, 505.45, 529.49, 844.8, 848.84, 732.94, 845.39, 891.86, 866.67, 885.81], '1Y': [222.5, 230.73, 227.02, 238.4, 242.01, 264.08, 296.58, 289.86, 283.2, 286.49, 276.91, 286.69, 319.38, 371.84, 339.68, 348.57, 361.44, 364.32, 379.89, 382.57, 384.45, 332.82, 342.44, 327.78, 324.1, 319.13, 315.87, 306.23, 297.62, 336.31, 351.39, 357.91, 365.07, 431.43, 435.5, 428.13, 395.11, 398.12, 401.61, 420.24, 393.71, 459.02, 472.9, 505.45, 529.49, 844.8, 848.84, 732.94, 845.39, 891.86, 866.67, 885.81] },
      velocityScore: { '1D': -15.2, '1W': 4.2, '1M': -52.7, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 79.2, revenueGrowth: 92, eps: 11.19, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 6.66, PRN: 4.54, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 5.17, proScore: 2.07, coverage: 0.4,
      price: 984.59, weeklyPrices: [945.46, 955.92, 985.82, 1022.28, 984.59], weeklyChange: 4.14, dayChange: -3.69, sortRank: 0, periodReturns: { '1M': 11.9, 'YTD': 71.9, '6M': 69.1, '1Y': 168.8 },
      priceHistory: { '1D': [1022.28, 975.68, 976.6, 988.45, 982.25, 976.58, 982.17, 983.8, 980.8, 983.12, 986.86, 990.81, 990, 992.65, 992.72, 989.75, 992.43, 991.07, 988.71, 986.92, 983.72, 984.47, 983.35, 984.59], '1W': [945.46, 955.92, 985.82, 1022.28, 984.59], '1M': [908.55, 909.93, 887.67, 875.87, 865.36, 909.81, 926.18, 940.48, 904.28, 915.64, 914.7, 856.16, 897.63, 910.57, 933.93, 945.46, 955.92, 985.82, 1022.28, 984.59], 'YTD': [572.87, 608.13, 638.75, 648.41, 665.24, 678.31, 775, 760.53, 752.93, 731.97, 707.59, 693.62, 719.04, 708.46, 771.58, 770.17, 808.87, 817.87, 904.59, 912.14, 863.95, 908.55, 909.81, 914.7, 933.93, 984.59], '6M': [582.42, 572.87, 608.13, 647.18, 626.62, 657.36, 726.2, 758.29, 759.74, 742.83, 680.9, 693.99, 680.88, 695.4, 721.24, 791.73, 798.4, 828.79, 874.78, 897.45, 888.31, 879.89, 865.36, 915.64, 933.93, 984.59], '1Y': [366.23, 388.21, 394.29, 404.64, 417.19, 430.05, 434.23, 408.54, 412.64, 432.3, 416.05, 418.09, 440.67, 471.26, 477.15, 486.71, 527.47, 524.65, 524.47, 547.58, 570.85, 552.05, 559.6, 582.47, 594.36, 588.93, 582.42, 572.87, 608.13, 647.18, 626.62, 657.36, 678.31, 758.29, 759.74, 742.83, 680.9, 693.99, 680.88, 695.4, 721.24, 791.73, 798.4, 828.79, 874.78, 897.45, 888.31, 879.89, 865.36, 915.64, 933.93, 984.59] },
      velocityScore: { '1D': null, '1W': 4.5, '1M': -9.6, '6M': null }, isNew: true,
      marketCap: '$453B', pe: 49.1, revenueGrowth: 22, eps: 20.04, grossMargin: 29, dividendYield: 0.64,
      etfPresence: { AIRR: false, PRN: 3.44, RSHO: 6.89, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 5, proScore: 2, coverage: 0.4,
      price: 294.65, weeklyPrices: [292.70, 294.03, 297.20, 307.80, 294.65], weeklyChange: 0.67, dayChange: -4.27, sortRank: 0, periodReturns: { '1M': 5.5, 'YTD': 177.3, '6M': 161, '1Y': 389.7 },
      priceHistory: { '1D': [307.8, 285.85, 288.65, 295.3, 294.88, 294.05, 291.98, 294.29, 293.36, 295.4, 297.27, 301.83, 300.84, 301.51, 301.63, 300.68, 302.17, 300.96, 300.2, 297.76, 297.14, 296.85, 296.39, 294.65], '1W': [292.7, 294.03, 297.2, 307.8, 294.65], '1M': [291.97, 295.94, 288.9, 284.42, 288.12, 299.07, 299.73, 300.06, 284.87, 293.6, 283.51, 262.34, 290.5, 294.75, 303.53, 292.7, 294.03, 297.2, 307.8, 294.65], 'YTD': [106.26, 119.94, 133.76, 142.29, 152.31, 179.6, 197.45, 178.79, 176.96, 170.96, 171.73, 167.41, 194.85, 180.36, 218.07, 229.73, 242.77, 255.56, 294.69, 308.05, 266.8, 291.97, 299.07, 283.51, 303.53, 294.65], '6M': [112.88, 106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 197.63, 182.27, 174.53, 161.22, 167.57, 172, 179.35, 186.72, 228.99, 241.65, 260.52, 269.95, 309.39, 292.65, 279.22, 288.12, 293.6, 303.53, 294.65], '1Y': [60.17, 70.15, 72.14, 70.37, 73.67, 77.77, 78.75, 88.28, 86.57, 86.12, 87.92, 92.3, 99.41, 97.41, 101.6, 104.42, 105.73, 116.11, 128.09, 126.71, 124.62, 105.94, 100.03, 107.5, 115.02, 110.88, 112.88, 106.26, 119.94, 135.18, 139.32, 147.86, 179.6, 197.63, 182.27, 174.53, 161.22, 167.57, 172, 179.35, 186.72, 228.99, 241.65, 260.52, 269.95, 309.39, 292.65, 279.22, 288.12, 293.6, 303.53, 294.65] },
      velocityScore: { '1D': null, '1W': -4.8, '1M': 9.9, '6M': null }, isNew: true,
      marketCap: '$11B', pe: 57.7, revenueGrowth: 7, eps: 5.11, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { AIRR: 2.67, PRN: false, RSHO: 7.33, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, avgWeight: 4.74, proScore: 1.9, coverage: 0.4,
      price: 722.37, weeklyPrices: [690.39, 719.52, 738.85, 790.00, 722.37], weeklyChange: 4.63, dayChange: -8.56, sortRank: 0, periodReturns: { '1M': 10.1, 'YTD': 130.6, '6M': 116.8, '1Y': 246.4 },
      priceHistory: { '1D': [790, 720.54, 732.94, 738.97, 740.99, 733.86, 727.33, 728, 727.22, 728.15, 733.64, 734.86, 732, 736.87, 738.86, 737.41, 739.14, 735.24, 735.57, 728.82, 725, 724.34, 719.48, 722.37], '1W': [690.39, 719.52, 738.85, 790, 722.37], '1M': [670.66, 673.51, 677.45, 667.02, 646.89, 663.14, 686.37, 689.43, 694.72, 619.98, 613.93, 588.9, 623.66, 641.68, 688.87, 690.39, 719.52, 738.85, 790, 722.37], 'YTD': [313.32, 313.98, 317.76, 380.36, 355.51, 345.97, 422.5, 432.18, 452.53, 463.36, 472.86, 469.81, 437.48, 544.65, 588.28, 606.43, 651.68, 630.7, 720, 681.01, 664.76, 670.66, 663.14, 613.93, 688.87, 722.37], '6M': [333.23, 313.32, 313.98, 329.66, 363.88, 347.11, 352.09, 413.65, 437.61, 451.25, 414.2, 458.31, 473.85, 566.62, 572.31, 598.44, 611.21, 660.85, 697.15, 680.26, 722.31, 656.35, 646.89, 619.98, 688.87, 722.37], '1Y': [208.55, 220.48, 202.53, 222.2, 205.66, 238.15, 233.13, 228.08, 225.32, 226.88, 224.09, 217.41, 238.22, 266.64, 270.05, 268.53, 300.72, 281, 292.46, 303.2, 335.96, 346.35, 371.95, 357.48, 332.87, 320.1, 333.23, 313.32, 313.98, 329.66, 363.88, 347.11, 345.97, 413.65, 437.61, 451.25, 414.2, 458.31, 473.85, 566.62, 572.31, 598.44, 611.21, 660.85, 697.15, 680.26, 722.31, 656.35, 646.89, 619.98, 688.87, 722.37] },
      velocityScore: { '1D': -16.3, '1W': 11.1, '1M': -55.3, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 63.5, revenueGrowth: 50, eps: 11.38, grossMargin: 21, dividendYield: 0.25,
      etfPresence: { AIRR: 4.68, PRN: 4.81, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Argan Inc is an engineering and construction company for power generation facilities — natural gas and renewable power plants. It appears in Industrials ETFs because power plant construction is one of the fastest-growing categories in U.S. infrastructure spending, driven by data center load additions that the grid cannot currently support.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.73, proScore: 1.89, coverage: 0.4,
      price: 1911.47, weeklyPrices: [1913.94, 1931.77, 1967.41, 2066.51, 1911.47], weeklyChange: -0.13, dayChange: -7.5, sortRank: 0, periodReturns: { '1M': 4.6, 'YTD': 104.8, '6M': 98, '1Y': 280 },
      priceHistory: { '1D': [2066.51, 1908.35, 1936.31, 1975.68, 1963.18, 1953.6, 1961.86, 1963, 1940.3, 1946.18, 1959.11, 1976.99, 1988.83, 1983.18, 1972.64, 1974.52, 1971.21, 1966.87, 1963.98, 1944.64, 1934.54, 1926.25, 1904.75, 1911.47], '1W': [1913.94, 1931.77, 1967.41, 2066.51, 1911.47], '1M': [1883.56, 1867.09, 1855.15, 1828.21, 1787.88, 1883.26, 1850.04, 1914.65, 1843.94, 1852.03, 1831.56, 1719.48, 1843.42, 1877.61, 1952.02, 1913.94, 1931.77, 1967.41, 2066.51, 1911.47], 'YTD': [933.29, 971.49, 1053.1, 1131.7, 1171.46, 1147.97, 1338.65, 1373.52, 1438.23, 1430.38, 1407.32, 1423, 1470.64, 1378.99, 1525.16, 1648.96, 1724.49, 1719.21, 1967.24, 2016.31, 1854.43, 1883.56, 1883.26, 1831.56, 1952.02, 1911.47], '6M': [965.37, 933.29, 971.49, 1091.04, 1121.44, 1142.1, 1230.26, 1300.02, 1462.23, 1429.37, 1279.06, 1365.34, 1356.75, 1366.77, 1434.09, 1627.81, 1680.09, 1794.04, 1891.95, 1952.37, 1992.74, 1828.25, 1787.88, 1852.03, 1952.02, 1911.47], '1Y': [502.98, 536.21, 527.42, 539.02, 532.14, 687.67, 691.45, 693.31, 695.76, 691.18, 698.61, 709.53, 777.18, 804.24, 825.18, 816.53, 831.89, 829.36, 980.97, 955.96, 974.14, 919.82, 945.07, 935.78, 983.61, 968.5, 965.37, 933.29, 971.49, 1091.04, 1121.44, 1142.1, 1147.97, 1300.02, 1462.23, 1429.37, 1279.06, 1365.34, 1356.75, 1366.77, 1434.09, 1627.81, 1680.09, 1794.04, 1891.95, 1952.37, 1992.74, 1828.25, 1787.88, 1852.03, 1952.02, 1911.47] },
      velocityScore: { '1D': -17.8, '1W': 2.2, '1M': -58.3, '6M': null }, isNew: false,
      marketCap: '$67B', pe: 55.1, revenueGrowth: 1, eps: 34.72, grossMargin: 25, dividendYield: 0.13,
      etfPresence: { AIRR: 4.6, PRN: 4.86, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.92, proScore: 1.57, coverage: 0.4,
      price: 331.38, weeklyPrices: [324.38, 329.89, 337.96, 338.07, 331.38], weeklyChange: 2.16, dayChange: -1.98, sortRank: 0, periodReturns: { '1M': 7.9, 'YTD': 29.1, '6M': 25.7, '1Y': 42.9 },
      priceHistory: { '1D': [338.07, 330.39, 332.3, 332.86, 333.82, 334.1, 334.77, 334.03, 332.77, 332.93, 333.56, 334, 333.9, 334.09, 334.8, 333.92, 334.09, 333.55, 333.58, 332.71, 332.3, 331.45, 331.37, 331.38], '1W': [324.38, 329.89, 337.96, 338.07, 331.38], '1M': [311.33, 312.65, 308.53, 303.81, 300.98, 308.31, 313.39, 313.67, 315.29, 314.42, 322.81, 314.08, 318.89, 320.11, 316.18, 324.38, 329.89, 337.96, 338.07, 331.38], 'YTD': [256.77, 264.62, 277.62, 282.33, 259.51, 287.03, 290.31, 281.13, 283.5, 279.91, 270.13, 258.51, 266, 265.32, 280.74, 284.56, 289.82, 301.24, 305.48, 313.7, 305.22, 311.33, 308.31, 322.81, 316.18, 331.38], '6M': [263.58, 256.77, 264.62, 282.47, 280.14, 260.41, 291.74, 279.03, 281.97, 282.58, 267.78, 255.65, 253.77, 260.67, 269.55, 293.26, 293.92, 298.1, 303.99, 308.87, 307.17, 307.1, 300.98, 314.42, 316.18, 331.38], '1Y': [231.96, 232.45, 247.66, 254.41, 264.89, 272.4, 269.28, 262.51, 262.36, 264.21, 263.15, 261.61, 262.58, 264.9, 261.05, 252.74, 252.95, 258.78, 258.03, 256.47, 259.74, 240.63, 249.05, 257.32, 257.3, 258.47, 263.58, 256.77, 264.62, 282.47, 280.14, 260.41, 287.03, 279.03, 281.97, 282.58, 267.78, 255.65, 253.77, 260.67, 269.55, 293.26, 293.92, 298.1, 303.99, 308.87, 307.17, 307.1, 300.98, 314.42, 316.18, 331.38] },
      velocityScore: { '1D': null, '1W': 13.8, '1M': null, '6M': null }, isNew: true,
      marketCap: '$12B', pe: 31.3, revenueGrowth: 7, eps: 10.58, grossMargin: 30, dividendYield: 0.6,
      etfPresence: { AIRR: 1.8, PRN: false, RSHO: 6.04, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 2.83, proScore: 1.13, coverage: 0.4,
      price: 236.95, weeklyPrices: [234.80, 235.29, 242.97, 246.41, 236.95], weeklyChange: 0.92, dayChange: -3.84, sortRank: 0, periodReturns: { '1M': 14, 'YTD': 18.4, '6M': 15.3, '1Y': 50 },
      priceHistory: { '1D': [246.41, 237.74, 238.94, 241.24, 241.02, 240.2, 243.02, 242.15, 241.45, 242.12, 242.5, 242.56, 243.06, 243.13, 242.73, 242.12, 242.78, 242.25, 240.05, 238.5, 237.6, 234.95, 237.17, 236.95], '1W': [234.8, 235.29, 242.97, 246.41, 236.95], '1M': [219.08, 215.34, 213.82, 216.66, 220.92, 230.08, 234.08, 236.14, 227.8, 229.95, 228.01, 223.63, 233.49, 230.05, 237.06, 234.8, 235.29, 242.97, 246.41, 236.95], 'YTD': [200.06, 207.44, 209.78, 217.13, 211.84, 218.02, 233.46, 241.01, 231.59, 222.07, 210.15, 202.46, 201.27, 199.94, 212.22, 219.99, 220.62, 216.36, 207.81, 198.99, 200.47, 219.08, 230.08, 228.01, 237.06, 236.95], '6M': [205.46, 200.06, 207.44, 213.61, 211.03, 208.41, 222.32, 230.92, 242.29, 226.94, 204.62, 199.45, 186.77, 200, 196.9, 221.27, 217.61, 222.45, 201.12, 202.84, 200.99, 207.8, 220.92, 229.95, 237.06, 236.95], '1Y': [158, 167.68, 170.53, 170.82, 173.83, 180.24, 203.71, 200.51, 187.85, 188.95, 184.11, 186.04, 185.77, 187.6, 186.78, 188.32, 185.28, 191.84, 197.07, 213.49, 224.93, 207.28, 211.97, 209.18, 209.32, 216.89, 205.46, 200.06, 207.44, 213.61, 211.03, 208.41, 218.02, 230.92, 242.29, 226.94, 204.62, 199.45, 186.77, 200, 196.9, 221.27, 217.61, 222.45, 201.12, 202.84, 200.99, 207.8, 220.92, 229.95, 237.06, 236.95] },
      velocityScore: { '1D': null, '1W': 0, '1M': null, '6M': null }, isNew: true,
      marketCap: '$12B', pe: 45.4, revenueGrowth: 17, eps: 5.22, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.69, PRN: false, RSHO: 3.96, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 2, avgWeight: 2.79, proScore: 1.11, coverage: 0.4,
      price: 274.7, weeklyPrices: [277.42, 283.23, 277.66, 280.36, 274.70], weeklyChange: -0.98, dayChange: -2.02, sortRank: 0, periodReturns: { '1M': 7.1, 'YTD': 34, '6M': 31.1, '1Y': 56.4 },
      priceHistory: { '1D': [280.36, 274.08, 276.42, 278.84, 278.94, 275.59, 275.72, 276.13, 275.54, 275.71, 276.19, 276.84, 277.55, 277.04, 277.13, 276.5, 277.04, 276.95, 276.78, 276.47, 275.69, 274.98, 274.58, 274.7], '1W': [277.42, 283.23, 277.66, 280.36, 274.7], '1M': [261.89, 258.02, 259.89, 258.25, 255.52, 250.72, 248.63, 249.33, 251.9, 246.55, 257.16, 249.49, 264.6, 264.67, 270.44, 277.42, 283.23, 277.66, 280.36, 274.7], 'YTD': [205.02, 210.02, 220.25, 217.7, 208.93, 209.63, 230.85, 251.3, 260.31, 260.09, 251.65, 241.93, 241.62, 230.46, 250, 254.04, 240.88, 240.43, 242.69, 269.76, 256.99, 261.89, 250.72, 257.16, 270.44, 274.7], '6M': [209.57, 205.02, 210.02, 224.26, 214.89, 208.08, 223.16, 244.79, 258.1, 262.53, 250.13, 236.75, 231.21, 227.9, 236.57, 256.14, 255.62, 241.7, 239.7, 270.56, 260.35, 256.55, 255.52, 246.55, 270.44, 274.7], '1Y': [175.63, 186.13, 179.46, 184.68, 183.34, 189.17, 179.32, 179.88, 173.05, 171.24, 173.22, 178.98, 187.46, 193.58, 196.23, 191.46, 193.03, 197.18, 201.04, 205.02, 209.74, 200.28, 200.12, 196.26, 191.36, 195.18, 209.57, 205.02, 210.02, 224.26, 214.89, 208.08, 209.63, 244.79, 258.1, 262.53, 250.13, 236.75, 231.21, 227.9, 236.57, 256.14, 255.62, 241.7, 239.7, 270.56, 260.35, 256.55, 255.52, 246.55, 270.44, 274.7] },
      velocityScore: { '1D': -20.1, '1W': 1.8, '1M': -52.2, '6M': null }, isNew: false,
      marketCap: '$110B', pe: 63.6, revenueGrowth: 19, eps: 4.32, grossMargin: 35, dividendYield: 0.17,
      etfPresence: { AIRR: false, PRN: 3.27, RSHO: false, IDEF: 2.3, BILT: false },
      tonyNote: 'Howmet Aerospace is an aerospace structures and engine components manufacturer. It appears in Industrials ETFs for its aerospace and defense exposure — commercial air travel recovery and defense spending growth are the two demand drivers. Revenue grew and margins are expanding as Howmet prices power over OEM customers.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 2, avgWeight: 2.53, proScore: 1.01, coverage: 0.4,
      price: 210.66, weeklyPrices: [196.93, 203.07, 205.40, 210.00, 210.66], weeklyChange: 6.97, dayChange: 0.31, sortRank: 0, periodReturns: { '1M': 3.8, 'YTD': 21.9, '6M': 18.6, '1Y': 48.3 },
      priceHistory: { '1D': [210, 207.88, 210.57, 212.43, 213.52, 211.66, 211.93, 212.66, 211.53, 211.32, 212.24, 213.14, 214.1, 214.01, 214.31, 214.82, 214.85, 214.31, 214.26, 213.49, 213.04, 212.27, 210.46, 210.66], '1W': [196.93, 203.07, 205.4, 210, 210.66], '1M': [204.38, 198.95, 199.27, 195.88, 188.39, 187.26, 184.72, 190.76, 185.95, 187.46, 188.96, 183, 194.68, 193.45, 193.94, 196.93, 203.07, 205.4, 210, 210.66], 'YTD': [172.84, 193.2, 204.08, 206.33, 210.18, 187.42, 198.5, 209.07, 207.24, 205.57, 195.98, 208.98, 222.13, 204.49, 231.78, 238.42, 219.1, 216.18, 206.15, 206.83, 201.94, 204.38, 187.26, 188.96, 193.94, 210.66], '6M': [177.62, 172.84, 193.2, 213.25, 207.75, 205.43, 197.19, 196.9, 206.44, 205.98, 195.23, 194.13, 199.75, 202.59, 215.98, 232.83, 228.24, 222.07, 216.68, 205.33, 204.72, 202.91, 188.39, 187.46, 193.94, 210.66], '1Y': [142.06, 144.06, 137.37, 137.45, 140.04, 150.28, 182, 177.89, 170.94, 162.84, 160.03, 162.23, 176.65, 178.02, 184.37, 191.39, 202.46, 205.24, 207.62, 200.39, 198.79, 176.18, 174.62, 176.2, 177.16, 173.2, 177.62, 172.84, 193.2, 213.25, 207.75, 205.43, 187.42, 196.9, 206.44, 205.98, 195.23, 194.13, 199.75, 202.59, 215.98, 232.83, 228.24, 222.07, 216.68, 205.33, 204.72, 202.91, 188.39, 187.46, 193.94, 210.66] },
      velocityScore: { '1D': -18.5, '1W': 7.4, '1M': -56.7, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 56, revenueGrowth: 26, eps: 3.76, grossMargin: 23, dividendYield: 0.5,
      etfPresence: { AIRR: 3.2, PRN: false, RSHO: false, IDEF: 1.85, BILT: false },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 2, avgWeight: 1.75, proScore: 0.7, coverage: 0.4,
      price: 51.53, weeklyPrices: [56.34, 56.16, 54.21, 51.09, 51.53], weeklyChange: -8.53, dayChange: 0.87, sortRank: 0, periodReturns: { '1M': -8.3, 'YTD': -32.1, '6M': -37.4, '1Y': 18.1 },
      priceHistory: { '1D': [51.09, 51.65, 51.86, 51.63, 51.6, 51.69, 51.63, 51.88, 51.65, 51.77, 52, 51.9, 51.89, 51.85, 51.97, 52.21, 52.17, 52.26, 51.88, 51.72, 51.76, 51.51, 51.46, 51.53], '1W': [56.34, 56.16, 54.21, 51.09, 51.53], '1M': [56.8, 57.3, 65.19, 64.13, 63.49, 63.27, 58.43, 63.4, 58.52, 57.73, 56.19, 54.82, 58.78, 57.75, 57.02, 56.34, 56.16, 54.21, 51.09, 51.53], 'YTD': [75.91, 104.04, 121.5, 113.85, 108.16, 85.25, 87.78, 105.67, 92.14, 89.13, 88.92, 93.04, 79.98, 70.51, 74.46, 74.66, 68.61, 61.66, 59.31, 57.33, 54.22, 56.8, 63.27, 56.19, 57.02, 51.53], '6M': [82.3, 75.91, 104.04, 124.56, 110.39, 103.01, 94.41, 87.05, 96.08, 86.18, 87, 87.53, 84.62, 71.94, 74.09, 73.55, 69.83, 63.16, 61.93, 57.89, 52.09, 56.18, 63.49, 57.73, 57.02, 51.53], '1Y': [43.63, 46.45, 44.34, 51.12, 55.42, 57.09, 59.4, 65.41, 68.74, 66.9, 66.09, 64.56, 76.35, 83.9, 91.37, 103.69, 95.3, 90.62, 89.78, 90.22, 79.18, 70.24, 74.11, 70.96, 77.03, 73.13, 82.3, 75.91, 104.04, 124.56, 110.39, 103.01, 85.25, 87.05, 96.08, 86.18, 87, 87.53, 84.62, 71.94, 74.09, 73.55, 69.83, 63.16, 61.93, 57.89, 52.09, 56.18, 63.49, 57.73, 57.02, 51.53] },
      velocityScore: { '1D': -24.7, '1W': -10.3, '1M': -66, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 303.1, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.49, PRN: false, RSHO: false, IDEF: 1, BILT: false },
      tonyNote: 'Kratos Defense is a defense technology company focused on unmanned systems, satellite communications, and high-performance computing for government customers. It appears in Industrials ETFs as an AI-adjacent defense name — autonomous systems and AI-driven surveillance are direct end markets. Revenue grew and the government contract backlog is expanding.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 2, avgWeight: 1.73, proScore: 0.69, coverage: 0.4,
      price: 280.68, weeklyPrices: [298.51, 296.89, 285.43, 278.19, 280.68], weeklyChange: -5.97, dayChange: 0.9, sortRank: 0, periodReturns: { '1M': -12.5, 'YTD': -17.5, '6M': -20.8, '1Y': 18.4 },
      priceHistory: { '1D': [278.19, 279.68, 279.45, 280.18, 279.55, 279.36, 280.04, 280.76, 280.77, 280.36, 281.74, 282.34, 282.27, 282.39, 281.98, 282.42, 282, 281.92, 282.15, 281.7, 281.3, 280.64, 280.9, 280.68], '1W': [298.51, 296.89, 285.43, 278.19, 280.68], '1M': [320.95, 317.56, 320.9, 308.17, 296.41, 293.66, 287.54, 294.53, 293.04, 292.26, 297.52, 289.13, 300.95, 297.68, 299.66, 298.51, 296.89, 285.43, 278.19, 280.68], 'YTD': [340.07, 378.47, 415.39, 424.14, 427.83, 369.38, 392.7, 443.14, 443, 437.03, 413.7, 427.99, 402.56, 379.9, 411.35, 398.13, 366.88, 361.4, 326.13, 333.56, 329.35, 320.95, 293.66, 297.52, 299.66, 280.68], '6M': [354.52, 340.07, 378.47, 418.86, 418.58, 420.51, 397.77, 406.76, 437.57, 444.52, 429.11, 415.71, 407.98, 381.79, 407.66, 394.46, 392.19, 358.4, 363.37, 316.28, 326.17, 320.63, 296.41, 292.26, 299.66, 280.68], '1Y': [237.1, 241.46, 247.95, 253.68, 253.96, 260.84, 270.92, 266.65, 267.6, 270.72, 269.71, 267.07, 273.19, 276.01, 287.91, 285.38, 291.94, 287.53, 299.14, 315.9, 318.66, 309.74, 309.92, 307.2, 314.95, 326.8, 354.52, 340.07, 378.47, 418.86, 418.58, 420.51, 369.38, 406.76, 437.57, 444.52, 429.11, 415.71, 407.98, 381.79, 407.66, 394.46, 392.19, 358.4, 363.37, 316.28, 326.17, 320.63, 296.41, 292.26, 299.66, 280.68] },
      velocityScore: { '1D': -22.5, '1W': -8, '1M': -67.3, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 18.2, revenueGrowth: 13, eps: 15.38, grossMargin: 12, dividendYield: 1.98,
      etfPresence: { AIRR: 2.43, PRN: false, RSHO: false, IDEF: 1.02, BILT: false },
      tonyNote: 'Huntington Ingalls Industries is the only builder of nuclear-powered aircraft carriers for the U.S. Navy. Revenue is government-contracted and predictable; the ETF allocation in Industrials reflects defense spending growth and the Navy\'s backlog of nuclear submarine and carrier construction. A steady-state quality compounder in a market structure with no competition.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 1.41, proScore: 0.56, coverage: 0.4,
      price: 75.23, weeklyPrices: [71.48, 71.25, 73.12, 74.95, 75.23], weeklyChange: 5.25, dayChange: 0.37, sortRank: 0, periodReturns: { '1M': -4.1, 'YTD': 25.2, '6M': 25.9, '1Y': 24.4 },
      priceHistory: { '1D': [74.95, 74.49, 75.03, 75.22, 75.37, 75.42, 75.36, 75.48, 75.35, 74.99, 74.95, 74.96, 75.04, 75.02, 75.14, 75.19, 75.28, 75.29, 75.43, 75.24, 75.25, 75.28, 75.3, 75.23], '1W': [71.48, 71.25, 73.12, 74.95, 75.23], '1M': [76.34, 74.37, 73.13, 71.39, 70.04, 71.31, 71.66, 72.43, 71.96, 71.59, 71.59, 72.26, 71.62, 72.08, 71.49, 71.48, 71.25, 73.12, 74.95, 75.23], 'YTD': [60.11, 61.15, 60.71, 63.72, 67.24, 67.42, 71.12, 72.17, 74.77, 75.77, 74.4, 72.8, 73.81, 72.78, 73.01, 70.76, 71.1, 73.04, 76.12, 74.73, 77.69, 76.34, 71.31, 71.59, 71.49, 75.23], '6M': [59.75, 60.11, 61.15, 60.29, 64.96, 67.26, 66.92, 71.13, 72.98, 74.72, 74.24, 73.34, 72.41, 73.58, 72.59, 71.54, 70.91, 71.61, 75.41, 71.96, 77.72, 78.47, 70.04, 71.59, 71.49, 75.23], '1Y': [60.48, 62.81, 57.69, 58.37, 57.36, 58.89, 59, 58.06, 56.52, 56.83, 57.38, 57.57, 57.95, 61.39, 63.35, 63.97, 62.36, 62.34, 57.59, 56.51, 60.6, 59.91, 59.43, 60.21, 61.55, 58.41, 59.75, 60.11, 61.15, 60.29, 64.96, 67.26, 67.42, 71.13, 72.98, 74.72, 74.24, 73.34, 72.41, 73.58, 72.59, 71.54, 70.91, 71.61, 75.41, 71.96, 77.72, 78.47, 70.04, 71.59, 71.49, 75.23] },
      velocityScore: { '1D': null, '1W': 1.8, '1M': null, '6M': null }, isNew: true,
      marketCap: '$92B', pe: 33, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.8,
      etfPresence: { AIRR: false, PRN: false, RSHO: 0.92, IDEF: false, BILT: 1.9 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RBC', name: 'RBC Bearings Incorporated', easyScore: 2, avgWeight: 1.19, proScore: 0.48, coverage: 0.4,
      price: 636.44, weeklyPrices: [621.08, 625.73, 639.18, 645.73, 636.44], weeklyChange: 2.47, dayChange: -1.44, sortRank: 0, periodReturns: { '1M': 13.7, 'YTD': 41.9, '6M': 39.2, '1Y': 66.9 },
      priceHistory: { '1D': [645.73, 629.45, 634.01, 638.2, 640, 639.31, 639.23, 639.57, 640.53, 640.6, 640.06, 641.78, 642.84, 644.29, 644.82, 643.7, 644.23, 642.27, 640.72, 640.12, 639.9, 639.99, 638.47, 636.44], '1W': [621.08, 625.73, 639.18, 645.73, 636.44], '1M': [584.4, 577.42, 577.83, 571.96, 566.14, 578.34, 584.18, 589.76, 590.09, 590.97, 592.41, 576.74, 607.46, 603.64, 616.95, 621.08, 625.73, 639.18, 645.73, 636.44], 'YTD': [448.43, 485, 489.33, 504.99, 511.98, 520.16, 550.53, 551.42, 576.5, 570.08, 559.52, 547.81, 561.66, 543.12, 580.55, 586.98, 588.74, 594.39, 607.5, 613.1, 551.12, 584.4, 578.34, 592.41, 616.95, 636.44], '6M': [457.07, 448.43, 485, 497.06, 504.07, 499.67, 544.02, 550.4, 559.18, 575.92, 552.91, 536.37, 531.11, 532.25, 552.4, 595.74, 596.86, 591, 593.12, 605.99, 569.06, 559.95, 566.14, 590.97, 616.95, 636.44], '1Y': [381.25, 384.8, 381.6, 375.51, 392.38, 385.08, 403.78, 396.84, 398.93, 399.58, 387.71, 374.88, 378.73, 383.7, 390.29, 373.47, 383.98, 392.33, 408.15, 427.24, 441.04, 429.28, 430, 440.04, 436.5, 451.17, 457.07, 448.43, 485, 497.06, 504.07, 499.67, 520.16, 550.4, 559.18, 575.92, 552.91, 536.37, 531.11, 532.25, 552.4, 595.74, 596.86, 591, 593.12, 605.99, 569.06, 559.95, 566.14, 590.97, 616.95, 636.44] },
      velocityScore: { '1D': -18.6, '1W': 4.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$20B', pe: 69.9, revenueGrowth: 18, eps: 9.1, grossMargin: 45, dividendYield: null,
      etfPresence: { AIRR: 1.85, PRN: false, RSHO: false, IDEF: 0.53, BILT: false },
      tonyNote: 'RBC Bearings Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRCY', name: 'Mercury Systems, Inc.', easyScore: 2, avgWeight: 1.08, proScore: 0.43, coverage: 0.4,
      price: 111.64, weeklyPrices: [112.44, 115.50, 113.91, 111.76, 111.64], weeklyChange: -0.71, dayChange: -0.11, sortRank: 0, periodReturns: { '1M': 13.3, 'YTD': 52.9, '6M': 48.7, '1Y': 115.4 },
      priceHistory: { '1D': [111.76, 110.57, 110.72, 111.06, 110.79, 111.03, 111.16, 111.55, 111.33, 111.37, 111.72, 112.16, 112.42, 112.75, 112.93, 112.93, 113.86, 112.94, 112.88, 112.61, 112.34, 111.89, 111.61, 111.64], '1W': [112.44, 115.5, 113.91, 111.76, 111.64], '1M': [99.32, 97.11, 108.11, 111.7, 111.28, 112.87, 111.59, 117.82, 111.27, 110.94, 108.82, 106.81, 119.32, 120.3, 115.93, 112.44, 115.5, 113.91, 111.76, 111.64], 'YTD': [73.01, 88.74, 98.62, 99.48, 98.29, 79.07, 80.33, 89.86, 89.58, 89.18, 86, 78.97, 78.71, 72.91, 80.81, 85.51, 82.61, 76.53, 82.96, 92.32, 93.39, 99.32, 112.87, 108.82, 115.93, 111.64], '6M': [75.07, 73.01, 88.74, 102.95, 99.05, 93.88, 82.2, 80.25, 87.63, 89.03, 86.42, 78.16, 77.26, 71.4, 75.76, 82.52, 84.12, 77.06, 78.53, 90.34, 92.03, 98.55, 111.28, 110.94, 115.93, 111.64], '1Y': [51.83, 53.86, 52, 50.09, 51.51, 51.88, 54.24, 53.58, 66.8, 67.98, 67.66, 68.69, 74.59, 75.34, 77.4, 83.47, 77.76, 78.81, 77.6, 75.71, 74.65, 68.35, 66.67, 67.69, 71.86, 71.8, 75.07, 73.01, 88.74, 102.95, 99.05, 93.88, 79.07, 80.25, 87.63, 89.03, 86.42, 78.16, 77.26, 71.4, 75.76, 82.52, 84.12, 77.06, 78.53, 90.34, 92.03, 98.55, 111.28, 110.94, 115.93, 111.64] },
      velocityScore: { '1D': -21.8, '1W': -4.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 12, eps: -0.23, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: 1.14, PRN: false, RSHO: false, IDEF: 1.03, BILT: false },
      tonyNote: 'Mercury Systems, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, avgWeight: 0.99, proScore: 0.4, coverage: 0.4,
      price: 46.42, weeklyPrices: [51.70, 52.03, 50.37, 47.70, 46.42], weeklyChange: -10.21, dayChange: -2.68, sortRank: 0, periodReturns: { '1M': -27.6, 'YTD': -36.6, '6M': -42, '1Y': -1.5 },
      priceHistory: { '1D': [47.7, 47.02, 47.26, 47.45, 46.99, 46.95, 46.95, 47.17, 46.74, 46.67, 46.81, 47.07, 46.87, 46.78, 47.01, 46.99, 46.9, 46.74, 46.41, 46.29, 46.36, 46.46, 46.52, 46.42], '1W': [51.7, 52.03, 50.37, 47.7, 46.42], '1M': [60.66, 63.52, 65.86, 57.5, 53.65, 54.65, 51.84, 54.39, 49.44, 49.64, 48.37, 45.87, 49.58, 47.83, 48.27, 51.7, 52.03, 50.37, 47.7, 46.42], 'YTD': [73.17, 101.28, 108.01, 111.61, 110.93, 89.78, 79.52, 88.46, 88.31, 98.88, 104.84, 101.43, 99.6, 80.05, 87.75, 92.73, 82.11, 70.3, 62.89, 62.48, 66.21, 60.66, 54.65, 48.37, 48.27, 46.42], '6M': [79.98, 73.17, 101.28, 109.49, 108.22, 103.8, 95.36, 78.71, 81.62, 88.11, 100.54, 99.98, 99.38, 84.07, 86.1, 87.79, 82.69, 71.95, 65.32, 60.84, 62.77, 64.1, 53.65, 49.64, 48.27, 46.42], '1Y': [47.15, 50.37, 45.03, 48.31, 51.96, 51.41, 50.39, 46.7, 51.78, 53.04, 53.89, 62.51, 64.86, 68.71, 72.2, 75.2, 77, 78.99, 85.34, 84.7, 72.31, 58.28, 63.9, 63.83, 63.75, 67.19, 79.98, 73.17, 101.28, 109.49, 108.22, 103.8, 89.78, 78.71, 81.62, 88.11, 100.54, 99.98, 99.38, 84.07, 86.1, 87.79, 82.69, 71.95, 65.32, 60.84, 62.77, 64.1, 53.65, 49.64, 48.27, 46.42] },
      velocityScore: { '1D': -24.5, '1W': -2.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: 201.8, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.8, PRN: false, RSHO: false, IDEF: 0.19, BILT: false },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DRS', name: 'Leonardo DRS, Inc.', easyScore: 2, avgWeight: 0.56, proScore: 0.22, coverage: 0.4,
      price: 45.7, weeklyPrices: [45.59, 46.58, 46.08, 44.99, 45.70], weeklyChange: 0.24, dayChange: 1.58, sortRank: 0, periodReturns: { '1M': 1.7, 'YTD': 34.1, '6M': 32, '1Y': 2.2 },
      priceHistory: { '1D': [44.99, 45.28, 45.52, 45.68, 45.58, 45.56, 45.56, 45.76, 45.73, 45.73, 45.88, 45.98, 45.97, 45.96, 45.99, 46.12, 46.18, 46.04, 46.02, 45.84, 45.78, 45.74, 45.68, 45.7], '1W': [45.59, 46.58, 46.08, 44.99, 45.7], '1M': [45.8, 45.35, 48.41, 48.76, 47.96, 47.39, 45.61, 46.71, 46.15, 46.55, 47.35, 46.11, 49.69, 48.53, 46.68, 45.59, 46.58, 46.08, 44.99, 45.7], 'YTD': [34.09, 38.84, 41.42, 41.28, 41.3, 37.27, 37.87, 41.07, 43.34, 46.95, 46.16, 46.44, 46.32, 44.52, 47.93, 46.29, 42.07, 40.18, 39.7, 42.87, 42.84, 45.8, 47.39, 47.35, 46.68, 45.7], '6M': [34.62, 34.09, 38.84, 42.26, 40.99, 41.06, 38.93, 37.77, 40.03, 43.39, 46.58, 45.3, 43.82, 44.84, 46.73, 47.43, 44.24, 40.72, 40, 41.36, 41.5, 44.92, 47.96, 46.55, 46.68, 45.7], '1Y': [44.73, 46.48, 46.44, 47.59, 46.14, 48.2, 41.48, 41.58, 42.73, 41.03, 42.01, 40.33, 41.78, 43.1, 45.4, 44.72, 43.85, 40.35, 40.18, 36.15, 35.61, 34.28, 33.63, 33.18, 33.96, 33.12, 34.62, 34.09, 38.84, 42.26, 40.99, 41.06, 37.27, 37.77, 40.03, 43.39, 46.58, 45.3, 43.82, 44.84, 46.73, 47.43, 44.24, 40.72, 40, 41.36, 41.5, 44.92, 47.96, 46.55, 46.68, 45.7] },
      velocityScore: { '1D': -21.4, '1W': -4.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 42.7, revenueGrowth: 6, eps: 1.07, grossMargin: 24, dividendYield: 0.8,
      etfPresence: { AIRR: 0.81, PRN: false, RSHO: false, IDEF: 0.3, BILT: false },
      tonyNote: 'Leonardo DRS, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TPC', name: 'Tutor Perini Corporation', easyScore: 2, avgWeight: 0.37, proScore: 0.15, coverage: 0.4,
      price: 80.21, weeklyPrices: [76.19, 77.89, 77.99, 81.50, 80.21], weeklyChange: 5.28, dayChange: -1.58, sortRank: 0, periodReturns: { '1M': 10.2, 'YTD': 19.7, '6M': 16.8, '1Y': 85.2 },
      priceHistory: { '1D': [81.5, 78.63, 78.04, 79.97, 79.75, 79.44, 79.9, 79.8, 79.9, 80.28, 80.7, 80.71, 80.75, 80.64, 81.22, 81.14, 81.56, 81.55, 81.41, 80.96, 80.88, 80.74, 80.07, 80.21], '1W': [76.19, 77.89, 77.99, 81.5, 80.21], '1M': [74.67, 74.47, 73.27, 71.49, 74.26, 74.29, 72.26, 72.38, 70.53, 72.13, 71.48, 68.72, 73.61, 74.92, 76.55, 76.19, 77.89, 77.99, 81.5, 80.21], 'YTD': [67.02, 70.17, 73.89, 76.79, 79.86, 79.95, 85.07, 84.9, 89.38, 73.71, 69.83, 71.21, 78.37, 77.19, 80.54, 86.25, 84.19, 86.87, 97.31, 82.69, 75.43, 74.67, 74.29, 71.48, 76.55, 80.21], '6M': [68.65, 67.02, 70.17, 75.17, 76.01, 78.89, 83.48, 81.73, 86.9, 75.37, 72.82, 67.76, 69.34, 76.15, 77.66, 83.8, 84.38, 87.5, 92.76, 82.85, 79.49, 72.76, 74.26, 72.13, 76.55, 80.21], '1Y': [43.3, 46.78, 47.15, 48.83, 48.51, 46.91, 47.66, 56.6, 57.44, 58.52, 59.13, 60.47, 63.88, 66.54, 65.59, 61.61, 63.27, 66.87, 68.4, 65.72, 63.97, 58.76, 64.01, 66.47, 68.59, 69.46, 68.65, 67.02, 70.17, 75.17, 76.01, 78.89, 79.95, 81.73, 86.9, 75.37, 72.82, 67.76, 69.34, 76.15, 77.66, 83.8, 84.38, 87.5, 92.76, 82.85, 79.49, 72.76, 74.26, 72.13, 76.55, 80.21] },
      velocityScore: { '1D': -16.7, '1W': 7.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 54.9, revenueGrowth: 12, eps: 1.46, grossMargin: 12, dividendYield: 0.29,
      etfPresence: { AIRR: 0.7, PRN: false, RSHO: false, IDEF: 0.04, BILT: false },
      tonyNote: 'Tutor Perini Corporation appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TKR', name: 'TIMKEN CO/THE', easyScore: 1, avgWeight: 8.69, proScore: 1.74, coverage: 0.2,
      price: 138.43, weeklyPrices: [140.28, 139.40, 142.36, 141.97, 138.43], weeklyChange: -1.32, dayChange: -2.49, sortRank: 0, periodReturns: { '1M': 15.4, 'YTD': 64.5, '6M': 60.8, '1Y': 94.5 },
      priceHistory: { '1D': [141.97, 136.93, 137.66, 139.31, 138.89, 138.63, 138.8, 139.14, 138.44, 138.92, 139.32, 139.93, 139.68, 139.65, 139.79, 139.55, 139.92, 139.56, 139.38, 138.8, 138.65, 138.39, 138.42, 138.43], '1W': [140.28, 139.4, 142.36, 141.97, 138.43], '1M': [127.42, 127.16, 126.78, 127.98, 126.54, 131.9, 131.82, 133.66, 131.83, 134.67, 137.09, 132.39, 137.4, 137.06, 139.12, 140.28, 139.4, 142.36, 141.97, 138.43], 'YTD': [84.13, 90.6, 91.91, 94.6, 94.15, 102.15, 108.82, 107.11, 109.88, 105.59, 103.33, 98.23, 101.9, 100.57, 105.88, 103.73, 106.79, 106.88, 109.63, 117.12, 112.73, 127.42, 131.9, 137.09, 139.12, 138.43], '6M': [86.09, 84.13, 90.6, 93.73, 93.94, 93.19, 106.04, 107.35, 108.16, 108.38, 99.68, 97.54, 95.25, 97.56, 98.94, 106.9, 108.45, 108.7, 107.12, 117.97, 114.49, 119.95, 126.54, 134.67, 139.12, 138.43], '1Y': [71.18, 72.55, 76.94, 76.33, 80.02, 80.98, 74.65, 74.15, 76.69, 79.25, 76.49, 76.14, 77.91, 76.75, 75.18, 75.83, 74.28, 77.3, 77.22, 76.29, 78.9, 74.42, 79.9, 79.82, 83.16, 85.77, 86.09, 84.13, 90.6, 93.73, 93.94, 93.19, 102.15, 107.35, 108.16, 108.38, 99.68, 97.54, 95.25, 97.56, 98.94, 106.9, 108.45, 108.7, 107.12, 117.97, 114.49, 119.95, 126.54, 134.67, 139.12, 138.43] },
      velocityScore: { '1D': null, '1W': -6.5, '1M': null, '6M': null }, isNew: true,
      marketCap: '$10B', pe: 31.5, revenueGrowth: 8, eps: 4.4, grossMargin: 31, dividendYield: 1.01,
      etfPresence: { AIRR: false, PRN: false, RSHO: 8.69, IDEF: false, BILT: false },
      tonyNote: 'TIMKEN CO/THE appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RTX', name: 'RTX CORP', easyScore: 1, avgWeight: 8.05, proScore: 1.61, coverage: 0.2,
      price: 185.1, weeklyPrices: [186.77, 192.58, 185.60, 181.83, 185.10], weeklyChange: -0.89, dayChange: 1.8, sortRank: 0, periodReturns: { '1M': 4.6, 'YTD': 0.9, '6M': -0.4, '1Y': 26.9 },
      priceHistory: { '1D': [181.83, 182.54, 183.07, 184.29, 184.27, 183.83, 184.05, 184.42, 183.98, 184.07, 184.2, 184.6, 184.73, 184.72, 184.93, 184.84, 185.13, 184.82, 185.09, 184.91, 184.91, 184.69, 184.9, 185.1], '1W': [186.77, 192.58, 185.6, 181.83, 185.1], '1M': [178.97, 176.59, 178.96, 179.66, 174.41, 174.26, 172.55, 179.41, 180.99, 178.66, 181.56, 177.41, 184.21, 183.53, 183.64, 186.77, 192.58, 185.6, 181.83, 185.1], 'YTD': [183.4, 187.17, 198.84, 196.34, 199.88, 195.97, 196.51, 205.41, 197.63, 208.82, 207.26, 204.56, 195, 192.9, 203.48, 198.39, 180.91, 175.68, 172.87, 178.89, 175.95, 178.97, 174.26, 181.56, 183.64, 185.1], '6M': [185.76, 183.4, 187.17, 199.83, 195.93, 200.93, 198.66, 201.14, 204.92, 202.62, 209.76, 204.52, 198.16, 189.71, 198.41, 201.41, 195.79, 173.38, 172.9, 176.09, 171.18, 177.01, 174.41, 178.66, 183.64, 185.1], '1Y': [145.81, 146.02, 144.91, 148.68, 149.17, 157.12, 156.33, 154.8, 155.5, 156.27, 158.01, 151.75, 158.58, 160.54, 167.33, 169.27, 159.4, 173.04, 178.67, 175.61, 179.03, 175.63, 173.21, 168.8, 171.93, 179.93, 185.76, 183.4, 187.17, 199.83, 195.93, 200.93, 195.97, 201.14, 204.92, 202.62, 209.76, 204.52, 198.16, 189.71, 198.41, 201.41, 195.79, 173.38, 172.9, 176.09, 171.18, 177.01, 174.41, 178.66, 183.64, 185.1] },
      velocityScore: { '1D': -19.9, '1W': 1.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$249B', pe: 34.7, revenueGrowth: 9, eps: 5.33, grossMargin: 20, dividendYield: 1.52,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 8.05, BILT: false },
      tonyNote: 'RTX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CGNX', name: 'COGNEX CORP', easyScore: 1, avgWeight: 7.15, proScore: 1.43, coverage: 0.2,
      price: 63.88, weeklyPrices: [65.41, 64.77, 66.10, 67.60, 63.88], weeklyChange: -2.34, dayChange: -5.5, sortRank: 0, periodReturns: { '1M': -3.3, 'YTD': 77.5, '6M': 74.2, '1Y': 114.1 },
      priceHistory: { '1D': [67.6, 64.33, 64.62, 64.96, 64.53, 64.28, 64.66, 64.23, 63.89, 64, 64.33, 64.77, 64.78, 64.73, 64.74, 64.76, 65.05, 64.87, 64.4, 64.19, 64.17, 63.97, 63.76, 63.88], '1W': [65.41, 64.77, 66.1, 67.6, 63.88], '1M': [68.33, 66.7, 66.01, 65.85, 64.64, 66.08, 66.06, 64.67, 60.82, 62.39, 61.32, 58.69, 62.11, 63.61, 65.9, 65.41, 64.77, 66.1, 67.6, 63.88], 'YTD': [35.98, 37.74, 40.06, 41.71, 39.09, 39.49, 43.03, 55.94, 55.36, 53.17, 50.99, 49.87, 51.61, 48.99, 53.78, 54.64, 54.03, 53.74, 58.83, 65.68, 61.91, 68.33, 66.08, 61.32, 65.9, 63.88], '6M': [36.66, 35.98, 37.74, 40.59, 39.76, 38.74, 42.37, 58.67, 56.03, 54.4, 49.45, 47.98, 49.24, 47.59, 49.52, 54.39, 55.48, 55.09, 56.3, 65.66, 64.26, 66.09, 64.64, 62.39, 65.9, 63.88], '1Y': [29.83, 31.72, 33.13, 33.22, 34.26, 34.26, 41.86, 40.47, 43.01, 44.02, 44.27, 44.36, 44.24, 46.43, 45.3, 45.95, 45.23, 48.27, 47.29, 40, 38.58, 35.98, 37.12, 38.19, 38.22, 36.83, 36.66, 35.98, 37.74, 40.59, 39.76, 38.74, 39.49, 58.67, 56.03, 54.4, 49.45, 47.98, 49.24, 47.59, 49.52, 54.39, 55.48, 55.09, 56.3, 65.66, 64.26, 66.09, 64.64, 62.39, 65.9, 63.88] },
      velocityScore: { '1D': null, '1W': 1.4, '1M': null, '6M': null }, isNew: true,
      marketCap: '$11B', pe: 75.2, revenueGrowth: 24, eps: 0.85, grossMargin: 68, dividendYield: 0.5,
      etfPresence: { AIRR: false, PRN: false, RSHO: 7.15, IDEF: false, BILT: false },
      tonyNote: 'COGNEX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 7.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 5.47, proScore: 5.47, coverage: 1,
      price: 275.35, weeklyPrices: [265.10, 280.91, 286.69, 283.61, 275.35], weeklyChange: 3.86, dayChange: -2.91, sortRank: 0, periodReturns: { '1M': 28.2, 'YTD': 228.9, '6M': 205.8, '1Y': 479.9 },
      priceHistory: { '1D': [283.61, 272.75, 286.99, 294.39, 290.34, 282.83, 278.62, 275.83, 275.8, 274.62, 277.75, 281.8, 280.37, 279.95, 278.34, 277.89, 280.52, 281.93, 279.38, 278.64, 279.68, 277.87, 275.85, 275.35], '1W': [265.1, 280.91, 286.69, 283.61, 275.35], '1M': [208.06, 208.37, 226.34, 231.09, 264.51, 260.58, 251.68, 259.67, 227.81, 218, 220.12, 211.69, 222.24, 232.36, 260.07, 265.1, 280.91, 286.69, 283.61, 275.35], 'YTD': [83.71, 97.3, 101.98, 96.85, 94.91, 73.87, 88.61, 107.61, 104.88, 97.78, 112, 118.56, 115.09, 103.76, 125, 166.77, 156.14, 135.51, 175.92, 179.11, 199.86, 208.06, 260.58, 220.12, 260.07, 275.35], '6M': [90.03, 83.71, 97.3, 103.89, 94.5, 85.19, 86.1, 89.73, 97.92, 91.19, 89.33, 112.95, 117.62, 100.82, 112.54, 154.56, 159.16, 144.96, 176.42, 177.05, 219.94, 214.77, 264.51, 218, 260.07, 275.35], '1Y': [47.48, 55.33, 47.1, 53.53, 51.01, 50.4, 55.17, 70.24, 72.54, 70.02, 65.72, 95.72, 89.43, 107.8, 112.27, 117.7, 128.15, 104.28, 121.83, 110.54, 109.95, 85.98, 91.9, 96.45, 96.41, 80.95, 90.03, 83.71, 97.3, 103.89, 94.5, 85.19, 73.87, 89.73, 97.92, 91.19, 89.33, 112.95, 117.62, 100.82, 112.54, 154.56, 159.16, 144.96, 176.42, 177.05, 219.94, 214.77, 264.51, 218, 260.07, 275.35] },
      velocityScore: { '1D': 0, '1W': 23.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$70B', pe: 106.7, revenueGrowth: 684, eps: 2.58, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 3.83, MEME: 6.84, RKNG: 5.75 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 3, avgWeight: 4.17, proScore: 4.17, coverage: 1,
      price: 54.69, weeklyPrices: [59.18, 58.11, 59.96, 56.87, 54.69], weeklyChange: -7.59, dayChange: -3.83, sortRank: 0, periodReturns: { '1M': -3.8, 'YTD': 44.8, '6M': 30, '1Y': 413 },
      priceHistory: { '1D': [56.87, 55.67, 56.3, 56.95, 56.74, 56.05, 55.48, 55.16, 54.88, 54.88, 55.01, 56.15, 56.33, 55.88, 55.52, 55.42, 55.95, 56.19, 55.4, 55.25, 55.4, 54.94, 54.59, 54.69], '1W': [59.18, 58.11, 59.96, 56.87, 54.69], '1M': [59.78, 67.84, 64.05, 63.54, 65.33, 66.6, 65.48, 61.86, 54.35, 59.19, 54.02, 51.52, 56.71, 59.77, 60.85, 59.18, 58.11, 59.96, 56.87, 54.69], 'YTD': [37.77, 45.68, 52.88, 52.26, 59.84, 39.79, 42.67, 43.29, 44.24, 43.84, 41.98, 42.21, 41.43, 34.28, 36.83, 48.82, 48.39, 44.44, 54.74, 56.56, 50.46, 59.78, 66.6, 54.02, 60.85, 54.69], '6M': [42.07, 37.77, 45.68, 51.89, 56.68, 53.74, 41.83, 40.03, 39.98, 40.95, 36.7, 41.58, 41.29, 35.09, 35.13, 43.07, 48.72, 48.36, 49.48, 61.2, 52.94, 56.83, 65.33, 59.19, 60.85, 54.69], '1Y': [10.66, 14.57, 16.89, 16.88, 18.59, 15.79, 16.45, 17.97, 20.7, 23.12, 29.11, 30.19, 36.45, 41.77, 46.93, 61.68, 69.56, 55.19, 62.42, 66.63, 60.17, 47.41, 48.49, 41.12, 46.84, 36.59, 42.07, 37.77, 45.68, 51.89, 56.68, 53.74, 39.79, 40.03, 39.98, 40.95, 36.7, 41.58, 41.29, 35.09, 35.13, 43.07, 48.72, 48.36, 49.48, 61.2, 52.94, 56.83, 65.33, 59.19, 60.85, 54.69] },
      velocityScore: { '1D': 0, '1W': 6.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$20B', pe: 71, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 3.03, MEME: 6.27, RKNG: 3.22 },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 3, avgWeight: 4.07, proScore: 4.07, coverage: 1,
      price: 44.91, weeklyPrices: [46.27, 45.57, 46.59, 45.20, 44.91], weeklyChange: -2.95, dayChange: -0.65, sortRank: 0, periodReturns: { '1M': -2.1, 'YTD': 83.1, '6M': 72.2, '1Y': 355 },
      priceHistory: { '1D': [45.2, 44.62, 45.22, 45.47, 45.94, 45.52, 45.32, 45.17, 45.16, 45.32, 45.74, 46.59, 46.56, 46.28, 45.68, 45.53, 45.97, 46.13, 45.54, 45.42, 45.42, 45.01, 44.71, 44.91], '1W': [46.27, 45.57, 46.59, 45.2, 44.91], '1M': [45.14, 48.98, 49.65, 47.28, 47.94, 47.86, 44.71, 44.15, 39.62, 40.94, 41.91, 38.92, 41.47, 42.7, 46.47, 46.27, 45.57, 46.59, 45.2, 44.91], 'YTD': [24.52, 31.94, 36.1, 34.74, 38.07, 27.84, 36.6, 31.53, 28.65, 28.65, 28.52, 26.65, 28.37, 23.74, 27.79, 30.81, 32.43, 32.11, 39.88, 43.93, 39.14, 45.14, 47.86, 41.91, 46.47, 44.91], '6M': [26.08, 24.52, 31.94, 35.22, 37.69, 33.88, 34.95, 36.17, 29.04, 27.27, 25.14, 27.05, 25.93, 23.76, 25.19, 27.6, 32.19, 33.67, 35.63, 41.25, 42.56, 45.87, 47.94, 40.94, 46.47, 44.91], '1Y': [9.87, 10.07, 9.22, 9.97, 10.95, 10.12, 14.89, 14.03, 16.34, 15.95, 15.26, 15.2, 19.46, 24.67, 22.94, 27.3, 35.04, 32.54, 34.33, 31.06, 31.44, 22.93, 23.79, 28.05, 32.77, 24.24, 26.08, 24.52, 31.94, 35.22, 37.69, 33.88, 27.84, 36.17, 29.04, 27.27, 25.14, 27.05, 25.93, 23.76, 25.19, 27.6, 32.19, 33.67, 35.63, 41.25, 42.56, 45.87, 47.94, 40.94, 46.47, 44.91] },
      velocityScore: { '1D': 0, '1W': 10.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.53, MEME: 5.81, RKNG: 3.87 },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 3, avgWeight: 3.85, proScore: 3.85, coverage: 1,
      price: 73.72, weeklyPrices: [82.25, 85.43, 80.66, 73.19, 73.72], weeklyChange: -10.37, dayChange: 0.72, sortRank: 0, periodReturns: { '1M': -30.4, 'YTD': 1.5, '6M': -13.9, '1Y': 46.9 },
      priceHistory: { '1D': [73.19, 73.82, 77.14, 76.17, 75.91, 75.8, 75.5, 75.54, 75.19, 75.75, 76.64, 77.01, 76.27, 76.05, 75.87, 76.08, 76, 75.33, 74.29, 74.18, 74.3, 73.82, 73.83, 73.72], '1W': [82.25, 85.43, 80.66, 73.19, 73.72], '1M': [119.7, 129.6, 133.09, 113.41, 105.65, 118.17, 107.73, 107.29, 93.6, 92.06, 88.71, 87.32, 97.56, 82.41, 87.57, 82.25, 85.43, 80.66, 73.19, 73.72], 'YTD': [72.63, 90.56, 95.22, 116.37, 122.09, 93.27, 96.92, 86.4, 85.76, 104.89, 88.21, 90.74, 96.06, 82.87, 96.46, 86.91, 84.66, 71.88, 63.87, 72.96, 86.83, 119.7, 118.17, 88.71, 87.57, 73.72], '6M': [85.67, 72.63, 90.56, 101.25, 113.57, 111.21, 101.79, 82.22, 80.2, 79.19, 89.47, 86.34, 89.93, 78.67, 94.81, 98.97, 81, 77.2, 68.43, 75.05, 83.67, 105.86, 105.65, 92.06, 87.57, 73.72], '1Y': [50.2, 46.73, 45.46, 51.12, 57.09, 53.09, 52.57, 45.92, 48.16, 50.01, 48.76, 36.91, 40.43, 54.8, 49.08, 74.75, 94.5, 78.61, 77.77, 70.05, 68.7, 56.6, 55, 56.89, 72.84, 68.37, 85.67, 72.63, 90.56, 101.25, 113.57, 111.21, 93.27, 82.22, 80.2, 79.19, 89.47, 86.34, 89.93, 78.67, 94.81, 98.97, 81, 77.2, 68.43, 75.05, 83.67, 105.86, 105.65, 92.06, 87.57, 73.72] },
      velocityScore: { '1D': 0, '1W': -3.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$29B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.88, MEME: 6.38, RKNG: 2.29 },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 6.68, proScore: 4.45, coverage: 0.667,
      price: 1964.34, weeklyPrices: [1991.55, 1958.80, 2184.75, 2273.73, 1964.34], weeklyChange: -1.37, dayChange: -13.61, sortRank: 0, periodReturns: { '1M': 32.8, 'YTD': 727.5, '6M': 702.1, '1Y': 4083.9 },
      priceHistory: { '1D': [2273.73, 1965, 2006.21, 2019.51, 2030.38, 1989.8, 1995.46, 1997.65, 1984.42, 1987.89, 1990.8, 2005.16, 2011.99, 1992, 1987.09, 1974.89, 1991.2, 1983.71, 1980.19, 1956.28, 1957.63, 1960.74, 1954.34, 1964.34], '1W': [1991.55, 1958.8, 2184.75, 2273.73, 1964.34], '1M': [1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1964.34], 'YTD': [237.38, 334.54, 387.81, 503.44, 539.3, 576.2, 599.34, 621.09, 651.9, 599.06, 655.43, 753.69, 677.86, 635.34, 780.9, 891.72, 979.07, 1002.35, 1406.32, 1452.02, 1333.01, 1589.55, 1716.36, 1646.54, 2107.86, 1964.34], '6M': [244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 630.29, 649.97, 635.36, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1562.34, 1407.61, 1478.69, 1761.43, 1642, 2107.86, 1964.34], '1Y': [46.95, 45.35, 46.17, 42.72, 41.36, 42.93, 41.93, 43.37, 45.52, 46.78, 51.07, 70.51, 91.55, 106.4, 112.2, 120.95, 127.29, 149.29, 175.53, 194.57, 267.95, 265.88, 226.96, 205.35, 219.46, 209.31, 244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 576.2, 630.29, 649.97, 635.36, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1562.34, 1407.61, 1478.69, 1761.43, 1642, 2107.86, 1964.34] },
      velocityScore: { '1D': 0, '1W': 7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$291B', pe: 67, revenueGrowth: 251, eps: 29.33, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.48, RKNG: 6.87 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 2, avgWeight: 5.85, proScore: 3.9, coverage: 0.667,
      price: 146.73, weeklyPrices: [170.81, 167.34, 161.85, 171.23, 146.73], weeklyChange: -14.1, dayChange: -14.31, sortRank: 0, periodReturns: { '1M': -19.2, 'YTD': 320.9, '6M': 261, '1Y': 550.1 },
      priceHistory: { '1D': [171.23, 155.6, 158.23, 158.67, 156.9, 155.46, 154.75, 153.52, 151.91, 153.08, 151.62, 153.57, 153.3, 152.85, 152.81, 151.45, 151.87, 151.18, 150.69, 148.8, 148.28, 147.89, 146.82, 146.73], '1W': [170.81, 167.34, 161.85, 171.23, 146.73], '1M': [177.62, 179.83, 169.02, 158.41, 185.67, 202.37, 184.07, 202.89, 177, 196.64, 162.88, 175.13, 172.78, 169.05, 191.55, 170.81, 167.34, 161.85, 171.23, 146.73], 'YTD': [34.86, 33.01, 34.47, 38.15, 39.57, 38.13, 48.4, 46.98, 53.69, 99.71, 127.01, 92.63, 114.41, 84.59, 132.7, 142.55, 149.42, 137.26, 180.57, 188.28, 173.26, 177.62, 202.37, 162.88, 191.55, 146.73], '6M': [40.64, 34.86, 33.01, 37, 35.72, 43.61, 44.3, 43.99, 51.68, 84.23, 95.58, 96.81, 87.54, 98.21, 107.45, 153.19, 163.47, 145.78, 172.98, 148.94, 190.36, 181.49, 185.67, 196.64, 191.55, 146.73], '1Y': [22.57, 25.69, 26.88, 29.24, 26.35, 24.11, 21.42, 20.86, 26.13, 24.34, 23.35, 23.72, 28.93, 28.06, 25.93, 31.33, 28.48, 33.4, 36.87, 29.5, 25.42, 21.63, 22.47, 26.02, 30.38, 28.96, 40.64, 34.86, 33.01, 37, 35.72, 43.61, 38.13, 43.99, 51.68, 84.23, 95.58, 96.81, 87.54, 98.21, 107.45, 153.19, 163.47, 145.78, 172.98, 148.94, 190.36, 181.49, 185.67, 196.64, 191.55, 146.73] },
      velocityScore: { '1D': 0, '1W': 3.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 7.73, RKNG: 3.97 },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 2, avgWeight: 5.81, proScore: 3.87, coverage: 0.667,
      price: 664.55, weeklyPrices: [681.08, 712.13, 746.23, 732.62, 664.55], weeklyChange: -2.43, dayChange: -9.29, sortRank: 0, periodReturns: { '1M': 37.2, 'YTD': 285.8, '6M': 272.8, '1Y': 1000.6 },
      priceHistory: { '1D': [732.62, 662.65, 658.42, 670.7, 670.19, 659.91, 660, 662, 660.61, 663.8, 670.67, 673.85, 678, 676.31, 673.05, 672.65, 673.27, 671.73, 671.03, 668.95, 668.75, 669.52, 665.74, 664.55], '1W': [681.08, 712.13, 746.23, 732.62, 664.55], '1M': [524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 664.55], 'YTD': [172.27, 187.68, 215, 243.29, 278.41, 260.19, 273.74, 284.67, 282.25, 261.3, 268.81, 304.9, 296.14, 270.49, 338.78, 365, 389.1, 390.99, 465.26, 488.74, 458.68, 524.65, 563.1, 517.72, 653.53, 664.55], '6M': [178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 284.1, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 480, 482.02, 484.28, 546.2, 526.93, 653.53, 664.55], '1Y': [60.38, 63.99, 64.02, 67.53, 67.06, 70.61, 75.84, 74.64, 76.29, 79.22, 81.91, 94.54, 103.09, 110.25, 120.06, 119.93, 113.13, 121.41, 124.92, 152.18, 174.22, 162.45, 150.93, 159.99, 169.54, 174.58, 178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 260.19, 284.1, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 480, 482.02, 484.28, 546.2, 526.93, 653.53, 664.55] },
      velocityScore: { '1D': 0, '1W': 151.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$229B', pe: 39.8, revenueGrowth: 46, eps: 16.7, grossMargin: 45, dividendYield: 0.08,
      etfPresence: { BUZZ: false, MEME: 5.63, RKNG: 5.99 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 5.46, proScore: 3.64, coverage: 0.667,
      price: 318.2, weeklyPrices: [280.88, 284.99, 328.91, 345.85, 318.20], weeklyChange: 13.29, dayChange: -7.99, sortRank: 0, periodReturns: { '1M': 5.2, 'YTD': 266.2, '6M': 248, '1Y': 1310.5 },
      priceHistory: { '1D': [345.85, 306, 316.58, 325.74, 322.4, 317.76, 316.61, 319.89, 318.09, 320.57, 322, 326.68, 328.4, 328.48, 327.73, 326.08, 328.08, 327.01, 326.51, 322.24, 321.05, 320.71, 317.83, 318.2], '1W': [280.88, 284.99, 328.91, 345.85, 318.2], '1M': [302.4, 293.8, 290.01, 285, 273.51, 302.85, 287.32, 291.37, 263.61, 253.57, 259.61, 234.23, 248.88, 260.22, 274.5, 280.88, 284.99, 328.91, 345.85, 318.2], 'YTD': [86.89, 121.84, 133.46, 145.63, 156.51, 136.6, 155.54, 159, 168.57, 164.78, 159.21, 156.58, 150.22, 135.49, 146.78, 213.84, 229.75, 226.37, 295.25, 280.69, 258.71, 302.4, 302.85, 259.61, 274.5, 318.2], '6M': [91.43, 86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.03, 147.55, 155.67, 135.19, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 288.64, 261.03, 275.95, 302.49, 273.51, 253.57, 274.5, 318.2], '1Y': [22.56, 23.92, 24.3, 25.31, 25.93, 34.75, 37.61, 37.65, 46.5, 49.35, 51.35, 55, 73.29, 77.38, 84.57, 86.06, 114.06, 104.38, 113.28, 129.05, 139.23, 107.11, 95.56, 105, 109.44, 87.61, 91.43, 86.89, 121.84, 139.17, 144.89, 151.37, 136.6, 139.03, 147.55, 155.67, 135.19, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 288.64, 261.03, 275.95, 302.49, 273.51, 253.57, 274.5, 318.2] },
      velocityScore: { '1D': 0, '1W': 14.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$91B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.69, RKNG: 4.24 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 2, avgWeight: 5.02, proScore: 3.34, coverage: 0.667,
      price: 1045.15, weeklyPrices: [1020.76, 1043.19, 1133.99, 1211.38, 1045.15], weeklyChange: 2.39, dayChange: -13.72, sortRank: 0, periodReturns: { '1M': 39.2, 'YTD': 266.2, '6M': 278.3, '1Y': 756.1 },
      priceHistory: { '1D': [1211.38, 1069, 1090.88, 1107.81, 1104.35, 1084.65, 1083.86, 1083.25, 1076.89, 1077.75, 1083.28, 1090.88, 1089.51, 1083.66, 1078.91, 1073.89, 1079.23, 1073.56, 1069, 1058.69, 1056.24, 1055.92, 1044.85, 1045.15], '1W': [1020.76, 1043.19, 1133.99, 1211.38, 1045.15], '1M': [895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1045.15], 'YTD': [285.41, 327.02, 333.35, 397.58, 435.79, 382.89, 410.34, 417.35, 415.56, 400.77, 418.69, 461.73, 382.09, 337.84, 406.73, 456.23, 487.48, 504.29, 640.2, 766.58, 681.54, 895.88, 1064.1, 935.89, 1087.99, 1045.15], '6M': [276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 746.81, 724.66, 751, 1035.5, 949.28, 1087.99, 1045.15], '1Y': [122.08, 123.25, 124.42, 120.11, 109.22, 111.96, 109.06, 123.72, 123.55, 116.42, 118.48, 135.24, 158.82, 166.41, 167.32, 185.69, 187.06, 202.29, 221.91, 218.03, 253.3, 241.95, 223.93, 239.49, 252.42, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 382.89, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 746.81, 724.66, 751, 1035.5, 949.28, 1087.99, 1045.15] },
      velocityScore: { '1D': 0, '1W': 4.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 49.3, revenueGrowth: 196, eps: 21.2, grossMargin: 58, dividendYield: 0.05,
      etfPresence: { BUZZ: 4.32, MEME: false, RKNG: 5.71 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'LITE', name: 'LITE', easyScore: 2, avgWeight: 4.42, proScore: 2.95, coverage: 0.667,
      price: 816.5, weeklyPrices: [875.36, 869.98, 850.00, 893.93, 816.50], weeklyChange: -6.72, dayChange: -8.66, sortRank: 0, periodReturns: { '1M': -13.8, 'YTD': 121.5, '6M': 110.8, '1Y': 815.8 },
      priceHistory: { '1D': [893.93, 821.69, 845.71, 850.92, 847.23, 835.91, 831.9, 828.42, 825.4, 823.13, 826.67, 833.4, 837.16, 832.56, 830.21, 828.59, 832.25, 830.31, 828.4, 824, 821.41, 820.85, 816.13, 816.5], '1W': [875.36, 869.98, 850, 893.93, 816.5], '1M': [910.81, 902.31, 860.62, 854.96, 905, 1029.15, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93, 816.5], 'YTD': [368.59, 348.26, 331.62, 354.49, 381.44, 504.42, 574.11, 635.64, 677, 680.8, 672, 700.81, 777.17, 702.76, 896.02, 824.01, 873.6, 791.37, 994.56, 992.37, 884.98, 910.81, 1029.15, 821.76, 957.24, 816.5], '6M': [387.41, 368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 583.46, 667.77, 700.91, 558.44, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 903.8, 970.7, 946.9, 905, 895.4, 957.24, 816.5], '1Y': [89.16, 95.06, 91.31, 98.14, 99.63, 109.48, 108.15, 115.03, 118.98, 123.42, 132.55, 151.73, 170.9, 163.99, 162.71, 157.15, 156.78, 162.95, 198.39, 188.36, 259.89, 242.07, 299.36, 302.81, 360.33, 316.15, 387.41, 368.59, 348.26, 343.27, 339.19, 391.84, 504.42, 583.46, 667.77, 700.91, 558.44, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 903.8, 970.7, 946.9, 905, 895.4, 957.24, 816.5] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$64B', pe: 142.7, revenueGrowth: 90, eps: 5.72, grossMargin: 41, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.68, RKNG: 3.17 },
      tonyNote: 'LITE appears in 2 of 3 Meme ETFs (67% coverage) with average weight 4.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 2, avgWeight: 3.83, proScore: 2.55, coverage: 0.667,
      price: 56.89, weeklyPrices: [56.06, 54.69, 56.55, 58.32, 56.89], weeklyChange: 1.48, dayChange: -2.45, sortRank: 0, periodReturns: { '1M': -10.6, 'YTD': 26.8, '6M': 10.7, '1Y': 38.3 },
      priceHistory: { '1D': [58.32, 61.15, 60.69, 59.68, 60.01, 59.3, 58.49, 58.78, 58.65, 58.35, 58.47, 58.76, 58.21, 58.19, 57.76, 57.58, 57.69, 58.33, 57.35, 57.25, 57.56, 57.14, 56.79, 56.89], '1W': [56.06, 54.69, 56.55, 58.32, 56.89], '1M': [63.62, 65.4, 70.14, 72.07, 69.28, 71.4, 68.23, 65.66, 56.78, 62.8, 56.69, 56.63, 57.99, 57.85, 61.18, 56.06, 54.69, 56.55, 58.32, 56.89], 'YTD': [44.87, 50.45, 50.88, 49.33, 43.24, 30.43, 33.61, 33.43, 40.88, 37.13, 34.27, 32.38, 31.96, 28.83, 28.99, 43.25, 47.36, 43.08, 48, 55.87, 49.31, 63.62, 71.4, 56.69, 61.18, 56.89], '6M': [51.39, 44.87, 50.45, 47.56, 47.25, 39.98, 34.99, 31.3, 31.9, 38.37, 35.73, 32.98, 31.2, 27.51, 29.24, 29.76, 48.32, 43.84, 45.75, 49.24, 51.95, 63.64, 69.28, 62.8, 61.18, 56.89], '1Y': [41.14, 42.97, 44.97, 41.47, 41.94, 40.53, 42.02, 44.94, 40.23, 38.68, 42.99, 44, 62.26, 75.14, 61.5, 79.23, 77.55, 59.5, 57.15, 53.38, 55.37, 47.79, 46.76, 46.93, 54.44, 49.67, 51.39, 44.87, 50.45, 47.56, 47.25, 39.98, 30.43, 31.3, 31.9, 38.37, 35.73, 32.98, 31.2, 27.51, 29.24, 29.76, 48.32, 43.84, 45.75, 49.24, 51.95, 63.64, 69.28, 62.8, 61.18, 56.89] },
      velocityScore: { '1D': 0, '1W': 10.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$21B', pe: 145.9, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: 1.78, MEME: 5.88, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'RGTI', name: 'Rigetti Computing', easyScore: 2, avgWeight: 3.06, proScore: 2.04, coverage: 0.667,
      price: 20.86, weeklyPrices: [20.64, 20.25, 21.36, 21.38, 20.86], weeklyChange: 1.04, dayChange: -2.46, sortRank: 0, periodReturns: { '1M': -21.1, 'YTD': -5.8, '6M': -16.9, '1Y': 93.3 },
      priceHistory: { '1D': [21.38, 22.42, 22.3, 22.2, 22.15, 21.84, 21.56, 21.69, 21.42, 21.36, 21.5, 21.66, 21.47, 21.45, 21.32, 21.3, 21.43, 21.67, 21.19, 21.09, 21.12, 20.94, 20.77, 20.86], '1W': [20.64, 20.25, 21.36, 21.38, 20.86], '1M': [25.07, 24.62, 27.03, 25.54, 25.63, 26.88, 24.09, 24.16, 20.68, 21.76, 19.69, 19.44, 20.63, 20.98, 22.7, 20.64, 20.25, 21.36, 21.38, 20.86], 'YTD': [22.15, 25.25, 25.72, 24.96, 19.85, 14.98, 16.43, 16.6, 18.64, 17.76, 16.94, 15.67, 15.14, 14.04, 14.53, 19.11, 18.38, 16.39, 18.27, 19.07, 16.62, 25.07, 26.88, 19.69, 22.7, 20.86], '6M': [25.11, 22.15, 25.25, 24.7, 23.45, 18.17, 17.71, 14.99, 15.92, 17.42, 17.01, 16.17, 14.88, 13.32, 14.2, 15.13, 19.64, 16.91, 17.7, 18.94, 17.85, 26.42, 25.63, 21.76, 22.7, 20.86], '1Y': [10.79, 11.86, 13.38, 12.72, 15.43, 14.47, 16.47, 15.98, 16.63, 14.47, 15.52, 16.5, 20, 31.46, 29.79, 43.91, 56.12, 40, 37.07, 35.18, 33.08, 24.69, 26.57, 23.88, 28.22, 23.96, 25.11, 22.15, 25.25, 24.7, 23.45, 18.17, 14.98, 14.99, 15.92, 17.42, 17.01, 16.17, 14.88, 13.32, 14.2, 15.13, 19.64, 16.91, 17.7, 18.94, 17.85, 26.42, 25.63, 21.76, 22.7, 20.86] },
      velocityScore: { '1D': 0, '1W': -4.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 199, eps: -0.89, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.25, RKNG: 2.88 },
      tonyNote: 'Rigetti Computing is a quantum hardware company using superconducting qubit technology. It holds a position in Meme ETFs alongside IonQ and D-Wave as part of the quantum computing basket. Revenue is minimal, the technology is earlier-stage than IonQ, and the ETF allocation is speculative. The weight score is low; this is a high-risk, long-duration positioning.',
    },
    {
      ticker: 'GOOGL', name: 'GOOGL', easyScore: 2, avgWeight: 2.15, proScore: 1.43, coverage: 0.667,
      price: 346.74, weeklyPrices: [373.25, 363.79, 368.03, 349.68, 346.74], weeklyChange: -7.1, dayChange: -0.81, sortRank: 0, periodReturns: { '1M': -9.5, 'YTD': 10.8, '6M': 10.3, '1Y': 109.9 },
      priceHistory: { '1D': [349.56, 347.31, 348.16, 348.82, 348.21, 347.13, 348.17, 346.98, 345.97, 345.26, 346.38, 345.94, 347.29, 347.54, 347.87, 347.71, 347.65, 347.57, 347.7, 346.73, 346.47, 346.24, 346.45, 346.74], '1W': [373.25, 363.79, 368.03, 349.68, 346.74], '1M': [388.88, 388.83, 390.13, 380.34, 376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68, 369.35, 373.25, 363.79, 368.03, 349.68, 346.74], 'YTD': [313, 325.44, 335.84, 330.54, 338.25, 331.25, 310.96, 302.85, 307.38, 303.13, 308.7, 307.69, 290.93, 287.56, 317.32, 337.12, 339.32, 349.78, 388.43, 387.35, 396.94, 388.88, 361.85, 364.26, 369.35, 346.74], '6M': [314.35, 313, 325.44, 332.78, 327.93, 338, 322.86, 309, 314.98, 311.76, 298.52, 302.28, 301, 274.34, 299.99, 321.31, 337.42, 350.34, 383.25, 400.8, 396.78, 382.97, 376.37, 363.31, 369.35, 346.74], '1Y': [165.19, 176.23, 174.36, 182, 191.34, 195.75, 194.67, 201, 203.5, 208.49, 211.35, 239.63, 251.16, 251.66, 243.1, 245.76, 245.45, 250.46, 267.47, 277.54, 290.1, 285.02, 318.58, 315.81, 317.08, 306.57, 314.35, 313, 325.44, 332.78, 327.93, 338, 331.25, 309, 314.98, 311.76, 298.52, 302.28, 301, 274.34, 299.99, 321.31, 337.42, 350.34, 383.25, 400.8, 396.78, 382.97, 376.37, 363.31, 369.35, 346.74] },
      velocityScore: { '1D': 0, '1W': -1.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.2T', pe: 26.4, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { BUZZ: 1.54, MEME: false, RKNG: 2.76 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'RDW', name: 'Redwire', easyScore: 1, avgWeight: 6.82, proScore: 2.27, coverage: 0.333,
      price: 12.43, weeklyPrices: [13.50, 14.36, 14.35, 13.02, 12.43], weeklyChange: -7.93, dayChange: -4.53, sortRank: 0, periodReturns: { '1M': -28.9, 'YTD': 63.6, '6M': 55.2, '1Y': -19.1 },
      priceHistory: { '1D': [13.02, 12.83, 13.03, 12.89, 12.9, 12.89, 12.81, 12.84, 12.66, 12.63, 12.73, 12.81, 12.69, 12.73, 12.67, 12.73, 12.72, 12.69, 12.48, 12.48, 12.51, 12.41, 12.44, 12.43], '1W': [13.5, 14.36, 14.35, 13.02, 12.43], '1M': [22.04, 24, 25.9, 24.57, 20.68, 20.58, 18.62, 21.43, 18.45, 18.57, 15.75, 14.87, 17.09, 15.12, 14.83, 13.5, 14.36, 14.35, 13.02, 12.43], 'YTD': [7.6, 10.28, 11.02, 11.98, 12.81, 8.8, 9.01, 8.6, 9.55, 9.28, 9.46, 9.55, 9.16, 8.5, 9.61, 9.91, 11.93, 9.04, 8.69, 11.56, 13.96, 22.04, 20.58, 15.75, 14.83, 12.43], '6M': [8.01, 7.6, 10.28, 10.86, 12.52, 11.75, 10.04, 7.89, 7.99, 9.07, 8.55, 9.59, 9.2, 8.16, 9.91, 9.99, 10.21, 9.33, 8.64, 11.07, 14.06, 17.49, 20.68, 18.57, 14.83, 12.43], '1Y': [15.36, 16.3, 15.15, 16.98, 16.36, 14.46, 14.71, 8.82, 9.04, 8.94, 8.92, 8.16, 9, 9.22, 8.99, 10.97, 9.54, 7.97, 7.85, 6.95, 6.17, 5.47, 5.39, 5.22, 7.29, 6.59, 8.01, 7.6, 10.28, 10.86, 12.52, 11.75, 8.8, 7.89, 7.99, 9.07, 8.55, 9.59, 9.2, 8.16, 9.91, 9.99, 10.21, 9.33, 8.64, 11.07, 14.06, 17.49, 20.68, 18.57, 14.83, 12.43] },
      velocityScore: { '1D': 0, '1W': 8.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2B', pe: null, revenueGrowth: 58, eps: -2.59, grossMargin: 13, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.82, RKNG: false },
      tonyNote: 'Redwire Corp is a space infrastructure company — solar arrays, structures, and manufacturing in orbit. It appears in Meme and speculative ETFs as a high-risk space economy play. Revenue is growing from a small base but the business is pre-profitability; the ETF weight is minimal and reflects thematic positioning rather than fundamental conviction.',
    },
    {
      ticker: 'QBTS', name: 'D-Wave Quantum', easyScore: 1, avgWeight: 5.7, proScore: 1.9, coverage: 0.333,
      price: 24.8, weeklyPrices: [23.94, 22.92, 24.69, 24.47, 24.80], weeklyChange: 3.57, dayChange: 1.33, sortRank: 0, periodReturns: { '1M': -15.7, 'YTD': -5.2, '6M': -14.9, '1Y': 66 },
      priceHistory: { '1D': [24.47, 26.59, 26.27, 26.17, 26.26, 25.85, 25.51, 25.67, 25.48, 25.39, 25.53, 25.74, 25.5, 25.48, 25.43, 25.3, 25.4, 25.68, 25.06, 24.98, 25.02, 24.85, 24.66, 24.8], '1W': [23.94, 22.92, 24.69, 24.47, 24.8], '1M': [27.82, 27.48, 29.49, 30.14, 29.18, 29.91, 27.55, 27.64, 23.85, 25.83, 23.52, 23.25, 23.82, 23.37, 26.26, 23.94, 22.92, 24.69, 24.47, 24.8], 'YTD': [26.15, 29.28, 30.15, 27.43, 23.22, 17.21, 19.64, 19.38, 20.14, 18.91, 18.91, 16.49, 16.19, 14.43, 14.57, 20.81, 21.24, 18.11, 21.54, 22.35, 19.06, 27.82, 29.91, 23.52, 26.26, 24.8], '6M': [29.12, 26.15, 29.28, 28.72, 25.63, 21.22, 20.72, 18.82, 18.06, 18.78, 18.59, 17.55, 15.73, 13.9, 14.14, 14.65, 21.66, 18.8, 20.92, 22.57, 20.35, 29.4, 29.18, 25.83, 26.26, 24.8], '1Y': [14.94, 14.64, 15.99, 16.15, 17.59, 17.67, 18.3, 17.37, 16.56, 15.02, 15.85, 16.15, 18.98, 27.52, 24.71, 35.72, 43.06, 32.19, 32, 29.74, 29.37, 22.83, 23.11, 22.5, 28.33, 25.52, 29.12, 26.15, 29.28, 28.72, 25.63, 21.22, 17.21, 18.82, 18.06, 18.78, 18.59, 17.55, 15.73, 13.9, 14.14, 14.65, 21.66, 18.8, 20.92, 22.57, 20.35, 29.4, 29.18, 25.83, 26.26, 24.8] },
      velocityScore: { '1D': 0, '1W': 11.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: -81, eps: -1.14, grossMargin: 66, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.7, RKNG: false },
      tonyNote: 'D-Wave Quantum is a quantum computing company — the only publicly traded business built around quantum annealing hardware. Revenue is minimal and profitability is many years away, but it holds a position in Meme ETFs as the purest-play quantum computing stock available to retail investors. The ETF weight is small and the position is purely thematic.',
    },
    {
      ticker: 'NVTS', name: 'Navitas Semiconductor', easyScore: 1, avgWeight: 5.08, proScore: 1.69, coverage: 0.333,
      price: 21.18, weeklyPrices: [22.09, 22.34, 24.02, 23.70, 21.18], weeklyChange: -4.1, dayChange: -10.61, sortRank: 0, periodReturns: { '1M': -27.6, 'YTD': 196.7, '6M': 176.6, '1Y': 224.9 },
      priceHistory: { '1D': [23.7, 22.61, 23.18, 23.12, 22.9, 22.46, 22.23, 22.12, 21.9, 21.85, 21.93, 22.13, 21.9, 21.77, 21.74, 21.57, 21.61, 21.52, 21.37, 21.38, 21.36, 21.22, 21.09, 21.18], '1W': [22.09, 22.34, 24.02, 23.7, 21.18], '1M': [31.79, 28.88, 28.51, 26.6, 24.86, 25.86, 30.84, 30.67, 25.08, 24.48, 22.85, 20.5, 22.21, 23.39, 23.73, 22.09, 22.34, 24.02, 23.7, 21.18], 'YTD': [7.14, 10.06, 10.04, 11.29, 9.46, 7.43, 8.76, 8.08, 9.51, 9.22, 10.84, 9.06, 9.48, 8.77, 9.55, 10.26, 18.47, 15.12, 17.55, 19.25, 19.67, 31.79, 25.86, 22.85, 23.73, 21.18], '6M': [7.66, 7.14, 10.06, 10, 10.17, 8.58, 8.86, 8.37, 7.88, 9, 8.2, 10.1, 8.75, 8.28, 8.84, 9.82, 13.2, 18.3, 15.92, 18.2, 21.32, 29.25, 24.86, 24.48, 23.73, 21.18], '1Y': [6.52, 6.55, 6.58, 6.23, 8.62, 7.52, 6.77, 6.6, 6.77, 6.2, 5.76, 5.76, 5.89, 6.88, 7.22, 7.78, 12.57, 15.03, 12.83, 10.46, 9.6, 7.73, 8.29, 8.32, 9.17, 7.83, 7.66, 7.14, 10.06, 10, 10.17, 8.58, 7.43, 8.37, 7.88, 9, 8.2, 10.1, 8.75, 8.28, 8.84, 9.82, 13.2, 18.3, 15.92, 18.2, 21.32, 29.25, 24.86, 24.48, 23.73, 21.18] },
      velocityScore: { '1D': 0, '1W': -44.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 5.08 },
      tonyNote: 'Navitas Semiconductor is a small-cap wide-bandgap power semiconductor name — gallium nitride and silicon carbide for fast charging and EV applications. The $26.60 share price and small market cap position it as a speculative holding in ETFs willing to take higher-risk bets on next-generation power conversion.',
    },
    {
      ticker: 'CRDO', name: 'CRDO', easyScore: 1, avgWeight: 4.9, proScore: 1.63, coverage: 0.333,
      price: 268.55, weeklyPrices: [239.18, 249.33, 271.83, 302.52, 268.55], weeklyChange: 12.28, dayChange: -11.24, sortRank: 0, periodReturns: { '1M': 23, 'YTD': 86.6, '6M': 81.7, '1Y': 217.5 },
      priceHistory: { '1D': [302.52, 269.4, 274.46, 274.21, 271.32, 267.7, 268.2, 268.7, 266.8, 269.18, 272.82, 274.73, 271.95, 271.46, 270.29, 269.01, 271.21, 270.59, 269.74, 268.7, 269.03, 270.28, 268.03, 268.55], '1W': [239.18, 249.33, 271.83, 302.52, 268.55], '1M': [221.64, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 217.5, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83, 302.52, 268.55], 'YTD': [143.89, 141.59, 156.84, 135.1, 129.47, 98.06, 128.4, 130.66, 114.48, 102.54, 115.91, 101.72, 103.91, 93.87, 110.21, 168.35, 189.49, 165.92, 193.57, 198.57, 156.27, 221.64, 229, 234.32, 259.41, 268.55], '6M': [147.81, 143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.78, 124.06, 112.27, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 188.51, 172.17, 218.41, 226.1, 222.27, 259.41, 268.55], '1Y': [84.57, 92.59, 93.36, 102.59, 92.93, 109.38, 110.29, 118.57, 118.74, 115.41, 124.27, 149.03, 164.42, 162.26, 145.61, 137.2, 129.75, 144.17, 162.18, 164.23, 170.16, 145.58, 150.85, 188.44, 170.29, 140.34, 147.81, 143.89, 141.59, 149.12, 133.16, 125.28, 98.06, 121.78, 124.06, 112.27, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 188.51, 172.17, 218.41, 226.1, 222.27, 259.41, 268.55] },
      velocityScore: { '1D': 0, '1W': -45.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$50B', pe: 107, revenueGrowth: 157, eps: 2.51, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.9 },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'AXTI', name: 'AXT Inc', easyScore: 1, avgWeight: 4.44, proScore: 1.48, coverage: 0.333,
      price: 76.86, weeklyPrices: [93.04, 92.11, 84.57, 92.44, 76.86], weeklyChange: -17.39, dayChange: -16.85, sortRank: 0, periodReturns: { '1M': -45.4, 'YTD': 370.1, '6M': 425, '1Y': 4032.3 },
      priceHistory: { '1D': [92.44, 86.92, 84.09, 84.29, 83.57, 82.47, 82.49, 81.89, 80.58, 80.53, 79.95, 80.4, 80.45, 80.74, 79.88, 79.23, 78.91, 78.46, 77.63, 77.64, 77.56, 76.94, 76.61, 76.86], '1W': [93.04, 92.11, 84.57, 92.44, 76.86], '1M': [132.6, 122.77, 115.7, 103.16, 109.55, 110.85, 106.7, 105.99, 89.04, 90.78, 78.36, 85.29, 88.34, 97.18, 110.74, 93.04, 92.11, 84.57, 92.44, 76.86], 'YTD': [16.35, 25.83, 22.1, 17.92, 16.38, 20.43, 26.8, 23.81, 37.12, 39.13, 47.36, 48.76, 67.35, 56.98, 53.18, 62.93, 86.94, 68.71, 107.55, 122.9, 105.88, 132.6, 110.85, 78.36, 110.74, 76.86], '6M': [14.64, 16.35, 25.83, 25.72, 17.4, 18.54, 24.06, 24.79, 29.68, 37.9, 32.37, 48.86, 54.24, 60.63, 41.99, 66.45, 78.76, 70.15, 106, 116.36, 123.78, 140.83, 109.55, 90.78, 110.74, 76.86], '1Y': [1.86, 2.09, 2.37, 2.36, 2.35, 2.29, 2.05, 2.18, 2.07, 2.84, 3.28, 3.04, 4.01, 4.8, 4.49, 5.31, 4.57, 5.17, 6.6, 8.54, 10.44, 10.25, 9.34, 11.76, 14.96, 13, 14.64, 16.35, 25.83, 25.72, 17.4, 18.54, 20.43, 24.79, 29.68, 37.9, 32.37, 48.86, 54.24, 60.63, 41.99, 66.45, 78.76, 70.15, 106, 116.36, 123.78, 140.83, 109.55, 90.78, 110.74, 76.86] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5B', pe: null, revenueGrowth: 39, eps: -0.32, grossMargin: 21, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.44, RKNG: false },
      tonyNote: 'AXT Inc is a compound semiconductor substrate manufacturer — gallium arsenide, indium phosphide, and germanium wafers used in data center optical transceivers, 5G RF chips, and solar cells. Revenue is growing with optical networking demand. Small market cap but positioned at a genuine supply-chain chokepoint for III-V semiconductor materials.',
    },
    {
      ticker: 'WULF', name: 'WULF', easyScore: 1, avgWeight: 4.37, proScore: 1.46, coverage: 0.333,
      price: 28.32, weeklyPrices: [28.01, 27.86, 28.98, 28.31, 28.32], weeklyChange: 1.11, dayChange: 0.04, sortRank: 0, periodReturns: { '1M': 24.1, 'YTD': 146.5, '6M': 128, '1Y': 693.3 },
      priceHistory: { '1D': [28.31, 28.08, 28.68, 29.22, 29.03, 28.92, 28.6, 28.56, 28.6, 28.66, 28.8, 29.13, 29.2, 29.08, 28.77, 28.93, 29.17, 29.2, 28.86, 28.87, 28.88, 28.53, 28.25, 28.32], '1W': [28.01, 27.86, 28.98, 28.31, 28.32], '1M': [25.18, 26.74, 26.4, 25.56, 25.66, 26.49, 26.16, 26.19, 24, 25.86, 25.3, 23.19, 25.35, 26.06, 28.17, 28.01, 27.86, 28.98, 28.31, 28.32], 'YTD': [11.49, 12.84, 14.21, 12.89, 14.54, 11.92, 16.03, 15.47, 17.88, 15.37, 15.22, 15.3, 16.86, 14.43, 18.05, 19.67, 20.55, 20.8, 23.49, 22.8, 21.14, 25.18, 26.49, 25.3, 28.17, 28.32], '6M': [12.42, 11.49, 12.84, 13.83, 14.12, 13.37, 14.29, 15.91, 15.01, 16.22, 13.75, 14.67, 15.1, 14.89, 15.55, 19.45, 20.5, 21.43, 22.29, 23.39, 22.32, 22.82, 25.66, 25.86, 28.17, 28.32], '1Y': [3.57, 4.38, 4.82, 4.87, 5.26, 5.22, 5.06, 5.4, 9.38, 8.93, 9.63, 10.3, 10.94, 11.24, 11.42, 12.1, 15.46, 13.14, 15.94, 15.01, 14.3, 11.05, 12.63, 14.22, 15.59, 12.99, 12.42, 11.49, 12.84, 13.83, 14.12, 13.37, 11.92, 15.91, 15.01, 16.22, 13.75, 14.67, 15.1, 14.89, 15.55, 19.45, 20.5, 21.43, 22.29, 23.39, 22.32, 22.82, 25.66, 25.86, 28.17, 28.32] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$14B', pe: null, revenueGrowth: -1, eps: -2.51, grossMargin: 64, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.37 },
      tonyNote: 'WULF appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LRCX', name: 'LRCX', easyScore: 1, avgWeight: 4.04, proScore: 1.35, coverage: 0.333,
      price: 368.94, weeklyPrices: [369.34, 374.18, 389.04, 409.54, 368.94], weeklyChange: -0.11, dayChange: -9.91, sortRank: 0, periodReturns: { '1M': 20.8, 'YTD': 115.5, '6M': 110.6, '1Y': 302.7 },
      priceHistory: { '1D': [409.54, 366.88, 372.11, 374.3, 372.19, 369.81, 368.83, 368.02, 368.39, 367.98, 369.59, 372.1, 373.35, 372.53, 372.86, 371.83, 374.17, 372.54, 372.32, 371.51, 371.36, 370.68, 368.33, 368.94], '1W': [369.34, 374.18, 389.04, 409.54, 368.94], '1M': [322.68, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04, 409.54, 368.94], 'YTD': [171.18, 200.96, 208.79, 220.7, 248.17, 213.31, 235.12, 237.39, 239.07, 222.99, 218.87, 224.71, 233.45, 213.66, 246.49, 265.16, 265.55, 251.23, 275.8, 289.24, 277.96, 322.68, 334.41, 327.16, 388.92, 368.94], '6M': [175.16, 171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 231.29, 244.92, 233.89, 199.33, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 258.57, 294.05, 284.72, 305.35, 317.12, 324.45, 388.92, 368.94], '1Y': [91.61, 97.34, 99.83, 101.07, 97.69, 98.94, 96.68, 102, 98.88, 101.28, 97.03, 105.57, 120.47, 131.93, 133.9, 140.35, 138.31, 145.04, 155.62, 155.78, 166.37, 147.46, 150.38, 158.19, 165.81, 163.26, 175.16, 171.18, 200.96, 217.47, 217.94, 233.46, 213.31, 231.29, 244.92, 233.89, 199.33, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 258.57, 294.05, 284.72, 305.35, 317.12, 324.45, 388.92, 368.94] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$461B', pe: 69.9, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.25,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.04 },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
