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
export const SPY_RET: Record<Period, number> = { '1W': -2.2, '1M': -1.6, 'YTD': 7.6, '6M': 6.6, '1Y': 20.9 };
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
  'AI & ML':         { '1W': -0.6, '1M': 5.3, 'YTD': 48.3, '6M': 46.2, '1Y': 85.3 },
  'Semiconductors':  { '1W': 1.8, '1M': 13.6, 'YTD': 113.4, '6M': 110.3, '1Y': 157.9 },
  'Broad Tech':      { '1W': -1.8, '1M': 1.5, 'YTD': 29.4, '6M': 26.1, '1Y': 52.6 },
  'Electrification': { '1W': -1.2, '1M': -3.9, 'YTD': 30.2, '6M': 27.9, '1Y': 55.5 },
  'Industrials':     { '1W': -0.2, '1M': 2.2, 'YTD': 25.4, '6M': 22.3, '1Y': 42.5 },
  'Meme':            { '1W': -0.8, '1M': -4, 'YTD': 27, '6M': 21.3, '1Y': 11.6 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, IndexChartByPeriod> = {
  'AI & ML': {
    '1D': { top10: [100, 94.04, 95.25, 95.51, 94.95, 94.52, 94.42, 94.09, 94.12, 94.68, 94.87, 94.86, 94.64, 94.71, 94.77, 94.5, 94.14, 94, 93.74, 93.41, 93.86, 94.11, 93.79, 93.82], spy: [100, 98.73, 99.14, 99.29, 99.09, 99.03, 98.89, 98.68, 98.74, 98.96, 99.02, 99.07, 99.05, 99.05, 99.08, 99.04, 98.88, 98.82, 98.73, 98.57, 98.67, 98.74, 98.7, 98.55], top10Return: -5.8, spyReturn: -1.45, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 100.5, 104.82, 105.64, 99.41], spy: [100, 98.75, 99.52, 99.21, 97.77], top10Return: -0.6, spyReturn: -2.2, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.83, 101.64, 102.58, 105.61, 107.54, 106.51, 104.88, 95.95, 98.95, 96.99, 96.99, 93.94, 98.99, 99.67, 104.88, 101.79, 102.3, 106.7, 107.53, 101.19], spy: [100, 99.98, 100.53, 100.78, 101.06, 101.2, 100.49, 100.87, 98.26, 98.49, 98.2, 98.2, 96.65, 98.29, 98.82, 100.56, 99.97, 98.72, 99.49, 99.17, 97.73], top10Return: 5.3, spyReturn: -1.6, xLabels: ["May 26", "Jun 2", "Jun 9", "Jun 16", "Jun 23"] },
    'YTD': { top10: [100, 102.26, 103.69, 105.17, 107.24, 97.14, 104.07, 103.31, 104.49, 102.14, 103.25, 102.71, 102.1, 97.05, 106.31, 114.45, 121.34, 119.14, 128.85, 134.58, 132.15, 146.11, 157.1, 141.48, 153.46, 148.29], spy: [100, 101.11, 101.24, 101.04, 101.78, 99.37, 101.47, 100.38, 101.08, 100.47, 99.18, 97, 96.32, 95.37, 99.13, 102.64, 104.3, 104.37, 106.14, 108.25, 108.32, 110.07, 111.39, 108.08, 110.69, 107.58], top10Return: 48.3, spyReturn: 7.6, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 98.43, 100.67, 102.72, 103.47, 102.6, 100.53, 100.37, 102.54, 101.57, 97.33, 98.42, 97.88, 93.55, 98.91, 109, 116.17, 120.87, 123.84, 133.32, 132.87, 138.11, 151.73, 142.27, 151.24, 146.16], spy: [100, 99.12, 100.23, 100.62, 100.18, 100.58, 100.39, 99.03, 100.21, 99.71, 97.74, 96.27, 94.27, 92.17, 95.78, 99.73, 103.02, 103.96, 104.37, 107.22, 107.44, 108.38, 110.26, 107.45, 109.72, 106.63], top10Return: 46.2, spyReturn: 6.6, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 100.72, 103.34, 104.27, 106.44, 108.94, 107.61, 111.87, 107.83, 109.54, 109.46, 117.1, 119.5, 121.25, 123.54, 128.83, 124.28, 126.38, 132.97, 129.09, 128.18, 119.47, 121.12, 125.78, 129.59, 117.99, 126.05, 124.05, 126.91, 129.6, 130.55, 129.48, 126.99, 127.59, 126.9, 128.83, 122.87, 124.32, 123.66, 118.18, 124.97, 137.84, 146.87, 152.81, 156.54, 172.43, 168.11, 174.93, 192.06, 180.19, 191.69, 185.28], spy: [100, 101.79, 102.85, 102.87, 104.52, 104.56, 103.49, 105.92, 105.44, 106.33, 106.09, 107.49, 108.64, 108.95, 110.16, 110.93, 109.14, 110.63, 113.23, 111.28, 112.56, 108.78, 111.25, 112.71, 113.31, 110.65, 113.38, 112.38, 113.63, 114.08, 113.59, 114.04, 113.82, 112.36, 112.46, 113.12, 110.81, 109.15, 106.89, 104.5, 108.59, 113.07, 116.8, 117.86, 118.33, 121.84, 121.82, 122.88, 125.01, 121.83, 124.4, 120.9], top10Return: 85.3, spyReturn: 20.9, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Semiconductors': {
    '1D': { top10: [100, 91.48, 93.26, 93.49, 92.38, 91.71, 91.64, 91.26, 91.39, 92.15, 92.2, 92.03, 91.82, 91.81, 91.91, 91.45, 91.17, 90.97, 90.83, 90.25, 91, 91.31, 90.86, 90.85], spy: [100, 98.73, 99.14, 99.29, 99.09, 99.03, 98.89, 98.68, 98.74, 98.96, 99.02, 99.07, 99.05, 99.05, 99.08, 99.04, 98.88, 98.82, 98.73, 98.57, 98.67, 98.74, 98.7, 98.55], top10Return: -9.2, spyReturn: -1.45, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 101.03, 108.61, 112.17, 101.8], spy: [100, 98.75, 99.52, 99.21, 97.77], top10Return: 1.8, spyReturn: -2.2, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.16, 100.27, 99.34, 100.71, 105.58, 106.83, 104.03, 91.76, 97.24, 95.72, 95.72, 92.49, 101.48, 102.93, 109.08, 103.42, 104.56, 112.46, 116.24, 105.29], spy: [100, 99.98, 100.53, 100.78, 101.06, 101.2, 100.49, 100.87, 98.26, 98.49, 98.2, 98.2, 96.65, 98.29, 98.82, 100.56, 99.97, 98.72, 99.49, 99.17, 97.73], top10Return: 13.6, spyReturn: -1.6, xLabels: ["May 26", "Jun 2", "Jun 9", "Jun 16", "Jun 23"] },
    'YTD': { top10: [100, 107.01, 112.38, 119.4, 120.25, 115.11, 124.7, 122.12, 123.71, 121.79, 126.4, 125.82, 136.63, 131, 136.79, 146.44, 157.02, 165.39, 185.89, 195.82, 178.16, 201.62, 209.86, 201.06, 226.06, 213.39], spy: [100, 101.11, 101.24, 101.04, 101.78, 99.37, 101.47, 100.38, 101.08, 100.47, 99.18, 97, 96.32, 95.37, 99.13, 102.64, 104.3, 104.37, 106.14, 108.25, 108.32, 110.07, 111.39, 108.08, 110.69, 107.58], top10Return: 113.4, spyReturn: 7.6, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 99.95, 107.98, 114.71, 115.12, 115, 119.71, 120.4, 122.13, 122.48, 120.18, 122.36, 130.57, 127.97, 128.94, 142.32, 151.54, 167.65, 178.52, 194.36, 179.43, 191.25, 198.59, 200.54, 222.8, 210.25], spy: [100, 99.12, 100.23, 100.62, 100.18, 100.58, 100.39, 99.03, 100.21, 99.71, 97.74, 96.27, 94.27, 92.17, 95.78, 99.73, 103.02, 103.96, 104.37, 107.22, 107.44, 108.38, 110.26, 107.45, 109.72, 106.63], top10Return: 110.3, spyReturn: 6.6, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 101.99, 104.81, 107.33, 106.78, 108.26, 106.93, 111.74, 110.26, 113.93, 111.01, 115.55, 120.33, 122.34, 124.64, 130.36, 126.8, 130.84, 135, 132.02, 137.64, 132.49, 133.93, 147.49, 152.81, 139.35, 148.16, 145.41, 150.13, 153.65, 155.2, 156.61, 161.4, 170.35, 169.6, 171.37, 160.65, 167.56, 169.72, 167.94, 170.94, 177.1, 191.99, 203.24, 206.71, 237.76, 234.78, 242.84, 247.84, 252.94, 275.87, 257.86], spy: [100, 101.79, 102.85, 102.87, 104.52, 104.56, 103.49, 105.92, 105.44, 106.33, 106.09, 107.49, 108.64, 108.95, 110.16, 110.93, 109.14, 110.63, 113.23, 111.28, 112.56, 108.78, 111.25, 112.71, 113.31, 110.65, 113.38, 112.38, 113.63, 114.08, 113.59, 114.04, 113.82, 112.36, 112.46, 113.12, 110.81, 109.15, 106.89, 104.5, 108.59, 113.07, 116.8, 117.86, 118.33, 121.84, 121.82, 122.88, 125.01, 121.83, 124.4, 120.9], top10Return: 157.9, spyReturn: 20.9, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Broad Tech': {
    '1D': { top10: [100, 96.75, 97.4, 97.72, 97.73, 97.4, 97.3, 97.06, 97.03, 97.33, 97.66, 97.71, 97.68, 97.73, 97.74, 97.58, 97.29, 97.16, 96.86, 96.71, 96.84, 97.03, 96.81, 96.79], spy: [100, 98.73, 99.14, 99.29, 99.09, 99.03, 98.89, 98.68, 98.74, 98.96, 99.02, 99.07, 99.05, 99.05, 99.08, 99.04, 98.88, 98.82, 98.73, 98.57, 98.67, 98.74, 98.7, 98.55], top10Return: -3.3, spyReturn: -1.45, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 99.62, 101.89, 101.6, 98.22], spy: [100, 98.75, 99.52, 99.21, 97.77], top10Return: -1.8, spyReturn: -2.2, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.93, 101.33, 101.87, 103.55, 104.77, 103.46, 103.06, 95.99, 97.76, 96.03, 96.03, 93.7, 97.78, 98.33, 101.85, 100.17, 99.79, 102.16, 101.93, 98.52], spy: [100, 99.98, 100.53, 100.78, 101.06, 101.2, 100.49, 100.87, 98.26, 98.49, 98.2, 98.2, 96.65, 98.29, 98.82, 100.56, 99.97, 98.72, 99.49, 99.17, 97.73], top10Return: 1.5, spyReturn: -1.6, xLabels: ["May 26", "Jun 2", "Jun 9", "Jun 16", "Jun 23"] },
    'YTD': { top10: [100, 103.06, 104.75, 105, 104.88, 96.41, 102.2, 102.86, 104.65, 103.48, 102.86, 102.24, 101.27, 98.01, 104.96, 110.8, 115.85, 113.75, 121.75, 126.13, 122.09, 130.28, 135.73, 125.66, 133.4, 129.39], spy: [100, 101.11, 101.24, 101.04, 101.78, 99.37, 101.47, 100.38, 101.08, 100.47, 99.18, 97, 96.32, 95.37, 99.13, 102.64, 104.3, 104.37, 106.14, 108.25, 108.32, 110.07, 111.39, 108.08, 110.69, 107.58], top10Return: 29.4, spyReturn: 7.6, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 97.57, 100.79, 102.37, 102.22, 99.54, 98.17, 98.48, 100.59, 101.01, 98.05, 97.88, 96.45, 94.12, 98.53, 105.72, 111.67, 113.47, 116.62, 122.97, 120.78, 123.72, 130.49, 124.33, 130.04, 126.08], spy: [100, 99.12, 100.23, 100.62, 100.18, 100.58, 100.39, 99.03, 100.21, 99.71, 97.74, 96.27, 94.27, 92.17, 95.78, 99.73, 103.02, 103.96, 104.37, 107.22, 107.44, 108.38, 110.26, 107.45, 109.72, 106.63], top10Return: 26.1, spyReturn: 6.6, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 101.38, 103.84, 104.73, 106.69, 106.74, 105.58, 106.85, 105.54, 107.61, 107.61, 111.92, 115.91, 117.91, 118.81, 124.07, 124.52, 123, 126.56, 124.25, 122.3, 114.98, 116.88, 119.26, 121.17, 113.76, 118.86, 116.64, 120.19, 123.55, 123.66, 122.27, 120.48, 121.39, 120.27, 123.77, 119.05, 119.04, 120.36, 118.86, 122.44, 128.91, 134.08, 136.86, 139.97, 147.18, 144.45, 147.66, 156.5, 150.12, 155.77, 152.61], spy: [100, 101.79, 102.85, 102.87, 104.52, 104.56, 103.49, 105.92, 105.44, 106.33, 106.09, 107.49, 108.64, 108.95, 110.16, 110.93, 109.14, 110.63, 113.23, 111.28, 112.56, 108.78, 111.25, 112.71, 113.31, 110.65, 113.38, 112.38, 113.63, 114.08, 113.59, 114.04, 113.82, 112.36, 112.46, 113.12, 110.81, 109.15, 106.89, 104.5, 108.59, 113.07, 116.8, 117.86, 118.33, 121.84, 121.82, 122.88, 125.01, 121.83, 124.4, 120.9], top10Return: 52.6, spyReturn: 20.9, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Electrification': {
    '1D': { top10: [100, 95.53, 96.64, 97.21, 97, 96.68, 96.36, 96.18, 96.41, 96.93, 96.77, 96.42, 96.9, 96.65, 96.58, 96.56, 96.25, 96.2, 96.24, 96.04, 96.04, 96, 95.86, 95.57], spy: [100, 98.73, 99.14, 99.29, 99.09, 99.03, 98.89, 98.68, 98.74, 98.96, 99.02, 99.07, 99.05, 99.05, 99.08, 99.04, 98.88, 98.82, 98.73, 98.57, 98.67, 98.74, 98.7, 98.55], top10Return: -4.4, spyReturn: -1.45, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 99.96, 102.25, 103.33, 98.75], spy: [100, 98.75, 99.52, 99.21, 97.77], top10Return: -1.2, spyReturn: -2.2, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.17, 99.25, 98.2, 97.87, 99.92, 98.87, 98.79, 92.68, 92.79, 91.7, 91.7, 88.74, 92.36, 93.24, 95.34, 94.37, 94.35, 96.51, 97.56, 93.26], spy: [100, 99.98, 100.53, 100.78, 101.06, 101.2, 100.49, 100.87, 98.26, 98.49, 98.2, 98.2, 96.65, 98.29, 98.82, 100.56, 99.97, 98.72, 99.49, 99.17, 97.73], top10Return: -3.9, spyReturn: -1.6, xLabels: ["May 26", "Jun 2", "Jun 9", "Jun 16", "Jun 23"] },
    'YTD': { top10: [100, 103.61, 107.58, 111.38, 112.77, 109.58, 116.36, 115.08, 118.29, 114.35, 113.79, 113.97, 116.18, 112.71, 117.23, 122.36, 127.54, 127.64, 135.62, 136.19, 129.51, 137.83, 138.83, 128.85, 134.03, 130.2], spy: [100, 101.11, 101.24, 101.04, 101.78, 99.37, 101.47, 100.38, 101.08, 100.47, 99.18, 97, 96.32, 95.37, 99.13, 102.64, 104.3, 104.37, 106.14, 108.25, 108.32, 110.07, 111.39, 108.08, 110.69, 107.58], top10Return: 30.2, spyReturn: 7.6, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 98.69, 102.3, 106.42, 109.12, 108.56, 111.76, 112.06, 114.5, 115.02, 108.22, 110.84, 109.68, 109.61, 111.35, 119.16, 123.32, 126.99, 130.28, 134.42, 130.58, 131.44, 134.38, 127.89, 131.67, 127.93], spy: [100, 99.12, 100.23, 100.62, 100.18, 100.58, 100.39, 99.03, 100.21, 99.71, 97.74, 96.27, 94.27, 92.17, 95.78, 99.73, 103.02, 103.96, 104.37, 107.22, 107.44, 108.38, 110.26, 107.45, 109.72, 106.63], top10Return: 27.9, spyReturn: 6.6, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 101.72, 105.33, 106.09, 109.91, 107.25, 107.35, 110.23, 110.31, 112.23, 110.27, 111.1, 115.06, 117.77, 120.07, 124.59, 128.38, 127.25, 128.59, 126.31, 130.06, 124.15, 124.85, 127.69, 129.55, 125.39, 129.52, 125.67, 129.08, 133.31, 137.33, 134.33, 137.32, 137.55, 138.09, 140.14, 134.56, 137.72, 137.29, 138.7, 141.97, 149.03, 154.01, 152.94, 155.96, 164.78, 160.8, 163.2, 163.96, 157.68, 160.3, 155.49], spy: [100, 101.79, 102.85, 102.87, 104.52, 104.56, 103.49, 105.92, 105.44, 106.33, 106.09, 107.49, 108.64, 108.95, 110.16, 110.93, 109.14, 110.63, 113.23, 111.28, 112.56, 108.78, 111.25, 112.71, 113.31, 110.65, 113.38, 112.38, 113.63, 114.08, 113.59, 114.04, 113.82, 112.36, 112.46, 113.12, 110.81, 109.15, 106.89, 104.5, 108.59, 113.07, 116.8, 117.86, 118.33, 121.84, 121.82, 122.88, 125.01, 121.83, 124.4, 120.9], top10Return: 55.5, spyReturn: 20.9, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Industrials': {
    '1D': { top10: [100, 96.86, 97.82, 98.03, 97.97, 98.07, 98.16, 97.99, 97.94, 98.19, 98.36, 98.46, 98.3, 98.36, 98.37, 98.43, 98.37, 98.16, 98.14, 97.97, 97.97, 97.61, 97.51, 97.67], spy: [100, 98.73, 99.14, 99.29, 99.09, 99.03, 98.89, 98.68, 98.74, 98.96, 99.02, 99.07, 99.05, 99.05, 99.08, 99.04, 98.88, 98.82, 98.73, 98.57, 98.67, 98.74, 98.7, 98.55], top10Return: -1.6, spyReturn: -1.45, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 99.72, 100.05, 101.15, 99.8], spy: [100, 98.75, 99.52, 99.21, 97.77], top10Return: -0.2, spyReturn: -2.2, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 100.73, 101.31, 100.49, 98.96, 99.69, 100.01, 100.92, 98.88, 98.05, 98.33, 98.33, 96.7, 98.86, 100.02, 100.05, 100.46, 100.19, 100.54, 101.69, 100.31], spy: [100, 99.98, 100.53, 100.78, 101.06, 101.2, 100.49, 100.87, 98.26, 98.49, 98.2, 98.2, 96.65, 98.29, 98.82, 100.56, 99.97, 98.72, 99.49, 99.17, 97.73], top10Return: 2.2, spyReturn: -1.6, xLabels: ["May 26", "Jun 2", "Jun 9", "Jun 16", "Jun 23"] },
    'YTD': { top10: [100, 105.14, 108.87, 111.3, 111.44, 111.39, 117.09, 118.94, 119.64, 118.02, 113.82, 112.13, 113.4, 110.69, 118.22, 119.72, 120, 119.35, 123.16, 124.58, 119.99, 124.5, 124.22, 122.49, 124.86, 125.35], spy: [100, 101.11, 101.24, 101.04, 101.78, 99.37, 101.47, 100.38, 101.08, 100.47, 99.18, 97, 96.32, 95.37, 99.13, 102.64, 104.3, 104.37, 106.14, 108.25, 108.32, 110.07, 111.39, 108.08, 110.69, 107.58], top10Return: 25.4, spyReturn: 7.6, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 97.92, 102.59, 107.59, 108.12, 107.55, 111.7, 113.4, 117.09, 116.11, 110.94, 108.41, 107.3, 107.06, 110.63, 116.92, 118.11, 118.11, 118.56, 120.91, 119.66, 118.95, 120.31, 119.27, 121.88, 122.36], spy: [100, 99.12, 100.23, 100.62, 100.18, 100.58, 100.39, 99.03, 100.21, 99.71, 97.74, 96.27, 94.27, 92.17, 95.78, 99.73, 103.02, 103.96, 104.37, 107.22, 107.44, 108.38, 110.26, 107.45, 109.72, 106.63], top10Return: 22.3, spyReturn: 6.6, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 101.88, 103.65, 104.09, 105.4, 105.87, 106.03, 108, 105.76, 108.48, 106.81, 108.68, 109.94, 111.21, 113.21, 115, 113.98, 114.47, 116.03, 114.32, 113.45, 108.44, 110.66, 111.91, 114.75, 110.92, 116.15, 113.79, 120.05, 125.95, 126.39, 126.21, 132, 133.86, 134.77, 135.05, 127.37, 125, 124.37, 124.49, 128.74, 135.72, 137.36, 137.6, 137.69, 141.91, 138.9, 138.72, 140.24, 138.93, 142.05, 142.53], spy: [100, 101.79, 102.85, 102.87, 104.52, 104.56, 103.49, 105.92, 105.44, 106.33, 106.09, 107.49, 108.64, 108.95, 110.16, 110.93, 109.14, 110.63, 113.23, 111.28, 112.56, 108.78, 111.25, 112.71, 113.31, 110.65, 113.38, 112.38, 113.63, 114.08, 113.59, 114.04, 113.82, 112.36, 112.46, 113.12, 110.81, 109.15, 106.89, 104.5, 108.59, 113.07, 116.8, 117.86, 118.33, 121.84, 121.82, 122.88, 125.01, 121.83, 124.4, 120.9], top10Return: 42.5, spyReturn: 20.9, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Meme': {
    '1D': { top10: [100, 96.7, 97.25, 98.06, 98.08, 97.33, 97, 96.72, 96.47, 96.46, 96.85, 97.4, 97.19, 97.05, 96.95, 96.54, 96.37, 96.06, 95.52, 95.67, 95.58, 96.1, 95.53, 95.62], spy: [100, 98.73, 99.14, 99.29, 99.09, 99.03, 98.89, 98.68, 98.74, 98.96, 99.02, 99.07, 99.05, 99.05, 99.08, 99.04, 98.88, 98.82, 98.73, 98.57, 98.67, 98.74, 98.7, 98.55], top10Return: -4.8, spyReturn: -1.45, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 100.64, 104.2, 104.07, 99.22], spy: [100, 98.75, 99.52, 99.21, 97.77], top10Return: -0.8, spyReturn: -2.2, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 101.49, 103.34, 102.02, 102.24, 104.7, 101.07, 101.6, 91.3, 93.63, 90.34, 90.34, 87.84, 93.47, 92.31, 97.44, 93.66, 94.22, 97.55, 97.4, 92.92], spy: [100, 99.98, 100.53, 100.78, 101.06, 101.2, 100.49, 100.87, 98.26, 98.49, 98.2, 98.2, 96.65, 98.29, 98.82, 100.56, 99.97, 98.72, 99.49, 99.17, 97.73], top10Return: -4, spyReturn: -1.6, xLabels: ["May 26", "Jun 2", "Jun 9", "Jun 16", "Jun 23"] },
    'YTD': { top10: [100, 108.03, 108.62, 108.21, 102.68, 89.95, 95.31, 95.05, 96.08, 96.03, 94.53, 90.43, 93.62, 90.16, 98.8, 112.13, 113.88, 110.76, 122.46, 125.5, 122.75, 138.98, 143.41, 122.67, 132.26, 126.94], spy: [100, 101.11, 101.24, 101.04, 101.78, 99.37, 101.47, 100.38, 101.08, 100.47, 99.18, 97, 96.32, 95.37, 99.13, 102.64, 104.3, 104.37, 106.14, 108.25, 108.32, 110.07, 111.39, 108.08, 110.69, 107.58], top10Return: 27, spyReturn: 7.6, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 95.91, 100.98, 102.34, 100.09, 94.39, 91.1, 87.92, 89.89, 89.96, 86.58, 84.99, 87.74, 85.7, 91.15, 102.25, 109.89, 109.11, 114.22, 118.16, 120.66, 129.62, 134.45, 120.58, 126.29, 121.32], spy: [100, 99.12, 100.23, 100.62, 100.18, 100.58, 100.39, 99.03, 100.21, 99.71, 97.74, 96.27, 94.27, 92.17, 95.78, 99.73, 103.02, 103.96, 104.37, 107.22, 107.44, 108.38, 110.26, 107.45, 109.72, 106.63], top10Return: 21.3, spyReturn: 6.6, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.23, 100.92, 96.42, 96.94, 91.88, 90.74, 90.05, 84.2, 83.88, 84.38, 86.59, 90.17, 90.55, 88.21, 93.77, 91.75, 90.74, 95.16, 93.56, 93.97, 89.73, 87.29, 86.43, 87.7, 84.78, 88.59, 88.43, 91, 93.11, 92.68, 91.75, 91.17, 88.95, 88.07, 91.98, 92.14, 98.99, 99.65, 92.72, 93.45, 101.52, 108.07, 110.5, 110.87, 116.97, 117.12, 116.08, 116.58, 114.31, 116.18, 111.63], spy: [100, 101.79, 102.85, 102.87, 104.52, 104.56, 103.49, 105.92, 105.44, 106.33, 106.09, 107.49, 108.64, 108.95, 110.16, 110.93, 109.14, 110.63, 113.23, 111.28, 112.56, 108.78, 111.25, 112.71, 113.31, 110.65, 113.38, 112.38, 113.63, 114.08, 113.59, 114.04, 113.82, 112.36, 112.46, 113.12, 110.81, 109.15, 106.89, 104.5, 108.59, 113.07, 116.8, 117.86, 118.33, 121.84, 121.82, 122.88, 125.01, 121.83, 124.4, 120.9], top10Return: 11.6, spyReturn: 20.9, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
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
export const SCAN_TIMESTAMP    = '2026-06-23T21:52:09.482Z';
export const SCAN_TIMESTAMP_NY = 'June 23, 2026 at 5:52 PM ET';
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
  { ticker: 'MU', name: `MICRON TECHNOLOGY INC`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 14.86, bestProScore: 6.08, avgProScore: 4.95, price: 1051.77, weeklyChange: 3.04 },
  { ticker: 'NVDA', name: `NVIDIA CORP`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 12.87, bestProScore: 6.23, avgProScore: 4.29, price: 200.04, weeklyChange: -3.55 },
  { ticker: 'AMD', name: `ADVANCED MICRO DEVICES INC`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 10.35, bestProScore: 4.98, avgProScore: 3.45, price: 519.85, weeklyChange: 2.48 },
  { ticker: 'AVGO', name: `BROADCOM INC`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 6.29, bestProScore: 2.76, avgProScore: 2.10, price: 380.15, weeklyChange: 0.91 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 5.16, bestProScore: 3.16, avgProScore: 2.58, price: 291.50, weeklyChange: -0.41 },
  { ticker: 'INTC', name: `INTEL CORPORATION`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.77, bestProScore: 3.48, avgProScore: 2.38, price: 132.28, weeklyChange: 13.01 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.76, bestProScore: 2.96, avgProScore: 2.38, price: 436.39, weeklyChange: 2.48 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.68, bestProScore: 2.74, avgProScore: 2.34, price: 279.04, weeklyChange: 0.13 },
  { ticker: 'WDC', name: `Western Digital Corp`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.15, bestProScore: 2.35, avgProScore: 2.08, price: 670.75, weeklyChange: -1.52 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 3.86, bestProScore: 2.52, avgProScore: 1.93, price: 371.33, weeklyChange: 0.54 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': 3.2, '1M': 12.9, 'YTD': 113.4, '6M': 114.5, '1Y': 192.1 },
  ARTY: { '1W': -0.9, '1M': 8.2, 'YTD': 54.5, '6M': 54, '1Y': 87.6 },
  BAI:  { '1W': -0.1, '1M': 4.4, 'YTD': 49.9, '6M': 47.3, '1Y': 78.3 },
  IGPT: { '1W': 0.5, '1M': 9.5, 'YTD': 69, '6M': 69.4, '1Y': 109.7 },
  IVES: { '1W': -2.9, '1M': -1.6, 'YTD': 15.9, '6M': 13.4, '1Y': 37 },
  ALAI: { '1W': -2, '1M': 2.6, 'YTD': 23.8, '6M': 21.2, '1Y': 49.6 },
  CHAT: { '1W': 0.7, '1M': 7.3, 'YTD': 63.4, '6M': 58.3, '1Y': 102.8 },
  AIFD: { '1W': -2.3, '1M': 2.3, 'YTD': 39.6, '6M': 37.8, '1Y': 75.5 },
  SPRX: { '1W': -0.6, '1M': 3.7, 'YTD': 42.5, '6M': 36.7, '1Y': 92.3 },
  AOTG: { '1W': -1.6, '1M': 3.4, 'YTD': 10.8, '6M': 9.1, '1Y': 28 },
  // Semiconductors
  SOXX: { '1W': 2.1, '1M': 12.3, 'YTD': 100.4, '6M': 97.9, '1Y': 156.7 },
  PSI:  { '1W': 2.2, '1M': 10.9, 'YTD': 116.1, '6M': 110.9, '1Y': 187.6 },
  XSD:  { '1W': 1.3, '1M': 0, 'YTD': 87.7, '6M': 82.8, '1Y': 137.8 },
  DRAM: { '1W': 1.6, '1M': 31, 'YTD': 149.4, '6M': 149.4, '1Y': 149.4 },
  // Broad Tech
  PTF:  { '1W': -1.3, '1M': 5, 'YTD': 69.4, '6M': 64.2, '1Y': 93 },
  WCLD: { '1W': -3.7, '1M': -3, 'YTD': -16.3, '6M': -17.4, '1Y': -18.2 },
  IGV:  { '1W': -4.4, '1M': -7.1, 'YTD': -17.4, '6M': -19.2, '1Y': -19.2 },
  FDTX: { '1W': -1.2, '1M': 8.9, 'YTD': 35.9, '6M': 34.6, '1Y': 45.6 },
  GTEK: { '1W': 0.9, '1M': 6.9, 'YTD': 50.5, '6M': 50.3, '1Y': 69.5 },
  ARKK: { '1W': -3, '1M': 0.4, 'YTD': -0.3, '6M': -4.8, '1Y': 9.1 },
  MARS: { '1W': -10.9, '1M': -26.9, 'YTD': 21.6, '6M': 21.6, '1Y': 21.6 },
  FRWD: { '1W': -2.7, '1M': 5.2, 'YTD': 30.5, '6M': 30.5, '1Y': 30.5 },
  BCTK: { '1W': -3.5, '1M': 1.9, 'YTD': 20.8, '6M': 18.5, '1Y': 22.9 },
  FWD:  { '1W': -0.9, '1M': 3.4, 'YTD': 35.6, '6M': 33.1, '1Y': 62.4 },
  CBSE: { '1W': 1.2, '1M': 1.5, 'YTD': 27.3, '6M': 23.6, '1Y': 39.2 },
  FCUS: { '1W': 1.2, '1M': 1.8, 'YTD': 43.2, '6M': 34.6, '1Y': 77.4 },
  WGMI: { '1W': 2.5, '1M': 14.6, 'YTD': 85.5, '6M': 71, '1Y': 265.5 },
  CNEQ: { '1W': -3.1, '1M': 0, 'YTD': 16.4, '6M': 14.2, '1Y': 39.3 },
  SGRT: { '1W': -0.8, '1M': 3.8, 'YTD': 45.1, '6M': 41.1, '1Y': 81.5 },
  SPMO: { '1W': -0.2, '1M': 6.5, 'YTD': 29.3, '6M': 27.6, '1Y': 40.4 },
  XMMO: { '1W': -0.4, '1M': 2.9, 'YTD': 22.5, '6M': 19.9, '1Y': 33.8 },
  // Electrification
  POW:  { '1W': -2, '1M': -1.6, 'YTD': 54.2, '6M': 52.7, '1Y': 49.7 },
  VOLT: { '1W': 1.3, '1M': 2.5, 'YTD': 40.3, '6M': 38.1, '1Y': 62.3 },
  PBD:  { '1W': -3.5, '1M': -9.9, 'YTD': 21.6, '6M': 20.1, '1Y': 58.6 },
  PBW:  { '1W': -2.7, '1M': -9.5, 'YTD': 27.4, '6M': 21.3, '1Y': 99.4 },
  IVEP: { '1W': 0.7, '1M': -1.1, 'YTD': 7.5, '6M': 7.5, '1Y': 7.5 },
  // Industrials
  AIRR: { '1W': -0.6, '1M': 3.6, 'YTD': 31.7, '6M': 27.4, '1Y': 61.4 },
  PRN:  { '1W': 2, '1M': 7, 'YTD': 45.1, '6M': 39.3, '1Y': 64.6 },
  RSHO: { '1W': 2.3, '1M': 9.1, 'YTD': 39.4, '6M': 36.7, '1Y': 59.3 },
  IDEF: { '1W': -4, '1M': -4, 'YTD': 2.3, '6M': -0.1, '1Y': 15.9 },
  BILT: { '1W': -0.7, '1M': -4.9, 'YTD': 8.3, '6M': 8.4, '1Y': 11.5 },
  // Meme
  BUZZ: { '1W': -2.3, '1M': -3.1, 'YTD': 12.5, '6M': 8.2, '1Y': 24.5 },
  MEME: { '1W': -0.4, '1M': -10.4, 'YTD': 57.3, '6M': 44.7, '1Y': -0.7 },
  RKNG: { '1W': 0.4, '1M': 1.5, 'YTD': 11.1, '6M': 11.1, '1Y': 11.1 },
};
// @@END_GENERATED:ETF_RETURNS@@

// @@GENERATED:ETF_DAY_CHANGE@@
// Today's % move per ETF ticker (1D, vs prior close). Refreshed by the 3×/day
// price jobs. Powers the 1D ranking in the theme-ETF side panel.
export const ETF_DAY_CHANGE: Record<string, number> = {
  AIS:  -8.85,
  ARTY: -6.3,
  BAI:  -7.93,
  IGPT: -7.04,
  IVES: -2.42,
  ALAI: -3.08,
  CHAT: -7.4,
  AIFD: -5.14,
  SPRX: -6.4,
  AOTG: -3.6,
  SOXX: -7.88,
  PSI:  -7.6,
  XSD:  -6.88,
  DRAM: -14.25,
  PTF:  -6.41,
  WCLD: 1.19,
  IGV:  0.01,
  FDTX: -4.76,
  GTEK: -3.92,
  ARKK: -2.23,
  MARS: -2.21,
  FRWD: -4.71,
  BCTK: -4,
  FWD:  -4.88,
  CBSE: -3.39,
  FCUS: -3.77,
  WGMI: -1.39,
  CNEQ: -2.41,
  SGRT: -5.57,
  SPMO: -4.53,
  XMMO: -2.42,
  POW:  -4.62,
  VOLT: -3.5,
  PBD:  -4.35,
  PBW:  -5.58,
  IVEP: -4.1,
  AIRR: -2.8,
  PRN:  -3.58,
  IDEF: -0.6,
  BILT: 0.43,
  BUZZ: -2.51,
  MEME: -6.25,
  RKNG: -5.6,
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
  'AI & ML': { etfs: ['AIS', 'AOTG', 'SPRX'], series: { '1W': [100, 100.85, 105.73, 107.25, 100.32], '1M': [100, 100.16, 101.99, 101.62, 103.66, 106.87, 106.09, 104.64, 94.8, 98.17, 96.1, 96.1, 93.05, 99.12, 100.16, 105.27, 101.31, 102.17, 107.11, 108.66, 101.64], 'YTD': [100, 102.87, 105.21, 107.25, 108.86, 96.78, 104.69, 103.13, 104.97, 103.34, 103.18, 102.48, 102.9, 96.18, 106.54, 114.17, 122.05, 119.07, 128.96, 136.37, 133.67, 152.21, 162.68, 145.78, 160.48, 155.56], '6M': [100, 98.3, 101.14, 103.86, 104.84, 103.15, 101.37, 100, 102, 101.91, 97.3, 98.24, 97.83, 93.22, 98.76, 109.65, 116.25, 121.44, 123.49, 133.71, 135.07, 142.48, 154.89, 146.77, 158.21, 153.43], '1Y': [100, 100.51, 103.56, 104.58, 107.29, 110.59, 109.08, 114.05, 109.23, 111.61, 110.75, 118.6, 122.19, 124.33, 126.79, 134.22, 128.96, 131.04, 138.23, 134.58, 133.35, 122.66, 124.12, 130.2, 134.45, 120.82, 131.37, 129.09, 132.94, 136.81, 138.12, 135.98, 133.95, 133.19, 132.99, 136.28, 128.33, 129.76, 129.26, 123.17, 130.51, 145.25, 153.89, 160.73, 163.44, 183.39, 179.13, 189.35, 205.58, 194.99, 210.46, 204.1] }, returns: { '1W': 0.3, '1M': 1.6, 'YTD': 55.6, '6M': 53.4, '1Y': 104.1 } },
  'Semiconductors': { etfs: ['DRAM', 'PSI', 'XSD'], series: { '1W': [100, 100.9, 108.76, 112.63, 101.71], '1M': [100, 99.23, 100.39, 99.18, 100.84, 105.4, 106.44, 103.47, 90.78, 96.24, 94.75, 94.75, 91.65, 101, 102.37, 108.69, 103.33, 104.35, 112.56, 116.68, 105.11], 'YTD': [100, 107.31, 113.11, 120.61, 120.35, 116.86, 126.4, 123.44, 125.45, 124.58, 130.67, 130.31, 143.95, 138.29, 141.39, 150.78, 161.57, 171.95, 194.42, 203.98, 182.67, 205.73, 212.85, 205.87, 231.85, 217.73], '6M': [100, 100.35, 109.05, 116.09, 115.81, 115.49, 121.52, 122.11, 123.56, 124.8, 124.88, 126.94, 137.75, 135.26, 134.32, 146.77, 156.41, 173.75, 187.52, 202.27, 183.66, 196.27, 202.27, 204.93, 228.37, 214.37], '1Y': [100, 102.29, 105.13, 108.28, 108.05, 109.19, 108.72, 113.52, 112.26, 116.34, 113.75, 118.14, 123.78, 124.97, 127, 132.48, 129.5, 133.14, 136.83, 134.03, 141.67, 137.38, 138.37, 152.79, 158.9, 145.36, 154.3, 151.18, 154.86, 157.05, 158.07, 159.71, 165.78, 176.85, 175.55, 178.58, 168.33, 176.44, 179.15, 178.05, 179.13, 180.37, 196.78, 206.42, 210.1, 241.48, 240.95, 247.6, 249.36, 256.23, 278.72, 258.27] }, returns: { '1W': 1.7, '1M': 5.1, 'YTD': 117.7, '6M': 114.4, '1Y': 158.3 } },
  'Broad Tech': { etfs: ['WGMI', 'PTF', 'SGRT'], series: { '1W': [100, 100.14, 103.58, 104.79, 100.13], '1M': [100, 101.9, 102.25, 101.28, 103.3, 105.97, 105.66, 104, 94.15, 97.56, 94.86, 94.86, 91.61, 97.79, 100.02, 104.42, 102.57, 102.69, 106.25, 107.46, 102.75], 'YTD': [100, 107.37, 113.37, 113.75, 116.83, 101.6, 112.8, 112.43, 116.08, 113.55, 110, 110.59, 112.57, 103.51, 118.42, 126.67, 134.16, 128.26, 144.89, 150.35, 143.67, 161.94, 171.79, 153.71, 169.26, 166.66], '6M': [100, 95.46, 102.35, 108.1, 109.13, 105.63, 105.3, 105.21, 107.44, 108.64, 98.85, 102.45, 102.18, 98.79, 104.39, 118.84, 126.24, 128.41, 131.56, 143.03, 141.95, 147.17, 159.59, 150.72, 161.39, 158.78], '1Y': [100, 106.96, 111.45, 114.17, 118.42, 115.65, 115.26, 117.48, 118.85, 124.57, 127.12, 137.51, 150.84, 157.26, 156.06, 173.9, 186.11, 174.68, 183.34, 182.05, 165.62, 150.72, 154.78, 160.3, 163.47, 143.14, 154.97, 148.74, 159.66, 169.1, 172.02, 167.66, 162.48, 159.26, 158.66, 162.8, 149.7, 151.57, 154.79, 154.8, 161.63, 180.47, 189.81, 196.08, 203.6, 221.29, 215.51, 228.31, 248.29, 230.45, 246.94, 246.65] }, returns: { '1W': 0.1, '1M': 2.8, 'YTD': 66.7, '6M': 58.8, '1Y': 146.7 } },
  'Electrification': { etfs: ['PBW', 'POW', 'VOLT'], series: { '1W': [100, 100.1, 102.5, 103.57, 98.85], '1M': [100, 99.41, 99.38, 98.37, 97.97, 100.1, 98.96, 98.85, 92.08, 92.77, 91.63, 91.63, 88.59, 92.69, 93.46, 95.98, 94.92, 95.03, 97.27, 98.34, 93.89], 'YTD': [100, 104.13, 108.52, 113.55, 115.16, 110.83, 119.72, 118.62, 121.85, 116.91, 116.61, 116.11, 119.56, 115.01, 122.19, 127.41, 134.02, 134.96, 146.19, 146.34, 137.67, 149.98, 149.96, 137.29, 143.9, 140.65], '6M': [100, 97.54, 101.52, 107.18, 109.55, 109.5, 113.07, 114.66, 116.44, 117.23, 108.85, 111.97, 110.47, 111.2, 113.84, 123.34, 128.03, 133.89, 139.01, 143.06, 139.52, 141.33, 143.32, 135.62, 140.51, 137.37], '1Y': [100, 101.49, 105.7, 106.94, 110.58, 107.8, 107.83, 111.18, 110.62, 113.84, 110.78, 110.9, 115.62, 119.95, 123.2, 128.64, 133.37, 131.51, 132.47, 129.61, 133.43, 127.64, 129.85, 132.53, 135.07, 129.65, 136.18, 130.95, 135.49, 139.89, 143.79, 140.08, 143.37, 144.07, 144.53, 148.05, 142.37, 145.85, 145.57, 147.72, 152.78, 161.98, 168.53, 166.52, 168.9, 179.96, 174.94, 177.73, 177.14, 170.57, 174.2, 170.47] }, returns: { '1W': -1.2, '1M': -6.1, 'YTD': 40.7, '6M': 37.4, '1Y': 70.5 } },
  'Industrials': { etfs: ['PRN', 'BILT', 'IDEF'], series: { '1W': [100, 99.82, 99.92, 100.4, 99.1], '1M': [100, 99.85, 100.69, 100.01, 97.97, 98.82, 98.19, 99.07, 96.56, 96.27, 96.37, 96.37, 94.74, 98.37, 98.38, 97.93, 98.01, 97.85, 97.97, 98.47, 97.15], 'YTD': [100, 104.75, 108.49, 109.92, 110.64, 108.1, 113.34, 116.2, 117.49, 116.8, 113.43, 112, 112.51, 109.5, 116.28, 116.74, 116.64, 115.57, 119.58, 119.54, 116.34, 121.42, 120.11, 117.01, 119.25, 118.54], '6M': [100, 97.95, 102.57, 107.47, 107.38, 106.9, 109.26, 110.31, 114.83, 114.34, 110.61, 108.75, 107.15, 106.04, 110.34, 114.61, 115.4, 114.51, 115.32, 116.46, 114.59, 116.1, 116.31, 114.36, 116.59, 115.88], '1Y': [100, 101.53, 102.84, 103.92, 104.61, 104.55, 104.88, 105.93, 103.03, 105.77, 104.92, 106.93, 108.16, 109.29, 111.49, 113.39, 112.44, 112.3, 113.29, 112.57, 110.65, 106.28, 106.6, 107.36, 109.83, 106.81, 112.46, 110.72, 116.58, 121.85, 122.69, 122.85, 124.88, 126.7, 127.88, 128.61, 123.58, 121.32, 121.23, 119.88, 124.21, 128.64, 129.91, 129.22, 129.46, 132.64, 129.74, 130.61, 131.37, 128.93, 131.57, 130.65] }, returns: { '1W': -0.9, '1M': -2.8, 'YTD': 18.5, '6M': 15.9, '1Y': 30.7 } },
  'Meme': { etfs: ['MEME', 'BUZZ', 'RKNG'], series: { '1W': [100, 100.64, 104.2, 104.07, 99.22], '1M': [100, 101.49, 103.34, 102.02, 102.24, 104.7, 101.07, 101.6, 91.3, 93.63, 90.34, 90.34, 87.84, 93.47, 92.31, 97.44, 93.66, 94.22, 97.55, 97.4, 92.92], 'YTD': [100, 108.03, 108.62, 108.21, 102.68, 89.95, 95.31, 95.05, 96.08, 96.03, 94.53, 90.43, 93.62, 90.16, 98.8, 112.13, 113.88, 110.76, 122.46, 125.5, 122.75, 138.98, 143.41, 122.67, 132.26, 126.94], '6M': [100, 95.91, 100.98, 102.34, 100.09, 94.39, 91.1, 87.92, 89.89, 89.96, 86.58, 84.99, 87.74, 85.7, 91.15, 102.25, 109.89, 109.11, 114.22, 118.16, 120.66, 129.62, 134.45, 120.58, 126.29, 121.32], '1Y': [100, 102.23, 100.92, 96.42, 96.94, 91.88, 90.74, 90.05, 84.2, 83.88, 84.38, 86.59, 90.17, 90.55, 88.21, 93.77, 91.75, 90.74, 95.16, 93.56, 93.97, 89.73, 87.29, 86.43, 87.7, 84.78, 88.59, 88.43, 91, 93.11, 92.68, 91.75, 91.17, 88.95, 88.07, 91.98, 92.14, 98.99, 99.65, 92.72, 93.45, 101.52, 108.07, 110.5, 110.87, 116.97, 117.12, 116.08, 116.58, 114.31, 116.18, 111.63] }, returns: { '1W': -0.8, '1M': -7.1, 'YTD': 26.9, '6M': 21.3, '1Y': 11.6 } },
};
// @@END_GENERATED:THEME_REPRESENTATIVES@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVDA', easyScore: 10, avgWeight: 6.23, proScore: 6.23, coverage: 1,
      price: 200.04, weeklyPrices: [207.41, 204.65, 210.69, 208.65, 200.04], weeklyChange: -3.55, dayChange: -4.13, sortRank: 0, periodReturns: { '1M': -7.1, 'YTD': 7.3, '6M': 5.7, '1Y': 35.3 },
      priceHistory: { '1D': [208.65, 201.71, 203.35, 203.16, 202.88, 202.63, 201.09, 200.76, 201.4, 202.35, 202.44, 202.21, 202.15, 202.15, 202.51, 202.16, 201.74, 201.67, 201.21, 200.59, 200.9, 201.23, 200.62, 200.04], '1W': [207.41, 204.65, 210.69, 208.65, 200.04], '1M': [214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04], 'YTD': [186.5, 185.04, 183.14, 184.84, 192.51, 171.88, 190.05, 187.9, 184.89, 183.04, 186.03, 180.4, 178.68, 174.4, 182.08, 198.87, 202.5, 213.17, 196.5, 220.78, 222.32, 214.86, 222.82, 208.19, 212.45, 200.04], '6M': [189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 186.94, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 215.2, 225.32, 215.33, 224.36, 208.64, 212.45, 200.04], '1Y': [147.9, 153.3, 162.88, 171.37, 170.78, 179.27, 178.26, 183.16, 175.64, 181.77, 170.62, 177.33, 170.29, 176.97, 187.24, 189.11, 180.03, 181.16, 201.03, 198.69, 193.16, 181.36, 177.82, 179.59, 183.78, 170.94, 189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 225.32, 215.33, 224.36, 208.64, 212.45, 200.04] },
      velocityScore: { '1D': 3.7, '1W': 0.8, '1M': 7.4, '6M': null }, isNew: false,
      marketCap: '$4.8T', pe: 30.6, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.48,
      etfPresence: { AIS: 2.31, ARTY: 4.39, BAI: 3.9, IGPT: 7.8, IVES: 4.77, ALAI: 12.72, CHAT: 6.2, AIFD: 6.37, SPRX: 3.34, AOTG: 10.53 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 9, avgWeight: 6.75, proScore: 6.08, coverage: 0.9,
      price: 1051.77, weeklyPrices: [1020.76, 1043.19, 1133.99, 1211.38, 1051.77], weeklyChange: 3.04, dayChange: -13.18, sortRank: 0, periodReturns: { '1M': 40, 'YTD': 268.5, '6M': 280.7, '1Y': 722.3 },
      priceHistory: { '1D': [1211.38, 1069, 1101.16, 1119.47, 1092.35, 1083.86, 1082.11, 1075.75, 1077.68, 1091.87, 1089.06, 1083.66, 1078.91, 1076.83, 1076.45, 1069, 1058.69, 1056.24, 1053.9, 1041.25, 1050.66, 1050.72, 1050, 1051.77], '1W': [1020.76, 1043.19, 1133.99, 1211.38, 1051.77], '1M': [895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77], 'YTD': [285.41, 327.02, 333.35, 397.58, 435.79, 382.89, 410.34, 417.35, 415.56, 400.77, 418.69, 461.73, 382.09, 337.84, 406.73, 456.23, 487.48, 504.29, 640.2, 766.58, 681.54, 895.88, 1064.1, 935.89, 1087.99, 1051.77], '6M': [276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 746.81, 724.66, 751, 1035.5, 949.28, 1087.99, 1051.77], '1Y': [127.91, 120.89, 122.24, 116.43, 109.83, 114.74, 109.06, 127.75, 122.05, 116.5, 118.72, 140, 159.99, 161.71, 182.15, 196.54, 187.06, 202.29, 221.91, 218.03, 241.11, 228.5, 224.53, 234.16, 263.71, 225.52, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 724.66, 751, 1035.5, 949.28, 1087.99, 1051.77] },
      velocityScore: { '1D': 0.2, '1W': -3.2, '1M': 14.7, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 49.6, revenueGrowth: 196, eps: 21.2, grossMargin: 58, dividendYield: 0.05,
      etfPresence: { AIS: 8.11, ARTY: 5.45, BAI: 6.73, IGPT: 9.31, IVES: 7.38, ALAI: 1.18, CHAT: 4.27, AIFD: 7.12, SPRX: false, AOTG: 11.23 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'AMD', easyScore: 9, avgWeight: 5.53, proScore: 4.98, coverage: 0.9,
      price: 519.85, weeklyPrices: [507.29, 512.48, 537.37, 551.63, 519.85], weeklyChange: 2.48, dayChange: -5.76, sortRank: 0, periodReturns: { '1M': 11.2, 'YTD': 142.7, '6M': 141.9, '1Y': 275.5 },
      priceHistory: { '1D': [551.63, 512.7, 525.25, 523.59, 523.53, 520.34, 519.24, 517.91, 518.73, 525.67, 526, 524.86, 521.1, 522.72, 524.05, 521.27, 520.13, 519.47, 519.08, 514.71, 518.53, 519.64, 517.92, 519.85], '1W': [507.29, 512.48, 537.37, 551.63, 519.85], '1M': [503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85], 'YTD': [214.16, 204.68, 223.6, 253.73, 252.18, 192.5, 213.58, 203.37, 203.68, 202.07, 204.83, 199.46, 220.27, 203.43, 231.82, 258.12, 303.46, 323.21, 355.26, 448.29, 420.99, 503.89, 521.54, 475.51, 547.26, 519.85], '6M': [214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 205.94, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 455.19, 424.1, 467.51, 510.13, 490.33, 547.26, 519.85], '1Y': [138.43, 136.11, 138.41, 160.08, 158.65, 179.51, 174.31, 174.95, 166.55, 166.62, 162.13, 159.54, 159.16, 160.88, 164.01, 235.56, 218.09, 238.03, 258.01, 250.05, 237.52, 230.29, 206.13, 217.6, 221.42, 198.11, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 424.1, 467.51, 510.13, 490.33, 547.26, 519.85] },
      velocityScore: { '1D': 4, '1W': -2.5, '1M': -0.6, '6M': null }, isNew: false,
      marketCap: '$848B', pe: 174.4, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.41, ARTY: 4.8, BAI: 4.74, IGPT: 8.64, IVES: 5.37, ALAI: 1.22, CHAT: 3.93, AIFD: false, SPRX: 0.53, AOTG: 16.16 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 7, avgWeight: 3.95, proScore: 2.76, coverage: 0.7,
      price: 380.15, weeklyPrices: [376.71, 392.90, 411.35, 392.13, 380.15], weeklyChange: 0.91, dayChange: -3.06, sortRank: 0, periodReturns: { '1M': -8.2, 'YTD': 9.8, '6M': 8.8, '1Y': 44.1 },
      priceHistory: { '1D': [392.13, 383.3, 390.1, 388.83, 385.57, 383.05, 380.62, 379.51, 380.05, 381.69, 382.14, 383.23, 383.36, 384.64, 384.52, 382.77, 382.02, 382.36, 381.76, 380.59, 381.04, 382.25, 380.95, 380.15], '1W': [376.71, 392.9, 411.35, 392.13, 380.15], '1M': [422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15], 'YTD': [346.1, 332.48, 339.89, 325.49, 330.73, 310.51, 342.76, 333.99, 321.7, 317.53, 341.57, 315.93, 318.81, 309.51, 350.63, 396.72, 422.65, 399.83, 427.36, 419.3, 420.71, 422.01, 481.57, 392.16, 393.94, 380.15], '6M': [349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 331.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 430, 425.19, 414.14, 459.97, 396.6, 393.94, 380.15], '1Y': [263.77, 264.74, 277.9, 280.81, 283.69, 302.62, 292.93, 312.83, 294.91, 298.01, 302.39, 369.57, 346.17, 339.31, 333.39, 345.5, 344.13, 342.66, 372.97, 351.94, 351.96, 340.5, 385.03, 380.61, 412.97, 326.02, 349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 425.19, 414.14, 459.97, 396.6, 393.94, 380.15] },
      velocityScore: { '1D': -4.5, '1W': 3, '1M': -15.6, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 63.4, revenueGrowth: 48, eps: 6, grossMargin: 76, dividendYield: 0.66,
      etfPresence: { AIS: false, ARTY: 4.26, BAI: 3.97, IGPT: false, IVES: 4.47, ALAI: 4.01, CHAT: 3.85, AIFD: 5.53, SPRX: false, AOTG: 1.55 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MRVL', easyScore: 7, avgWeight: 3.91, proScore: 2.74, coverage: 0.7,
      price: 279.04, weeklyPrices: [278.67, 289.54, 310.58, 307.86, 279.04], weeklyChange: 0.13, dayChange: -9.36, sortRank: 0, periodReturns: { '1M': 42.1, 'YTD': 228.4, '6M': 218.2, '1Y': 271 },
      priceHistory: { '1D': [307.86, 279.48, 289.88, 288.69, 284.95, 281.48, 281.07, 281.23, 280.04, 282.7, 282.03, 282.48, 280.78, 280.67, 282.19, 280.61, 278.92, 279.03, 278.85, 276.9, 279.02, 280.13, 277.8, 279.04], '1W': [278.67, 289.54, 310.58, 307.86, 279.04], '1M': [208.26, 198.7, 204.83, 205, 219.43, 290.79, 301.65, 316.43, 263.47, 288.85, 266.88, 252.59, 280.71, 279.7, 308.88, 278.67, 289.54, 310.58, 307.86, 279.04], 'YTD': [84.98, 83.45, 81.21, 83.1, 81.34, 74.21, 81.34, 79.61, 79.29, 78.09, 90.44, 87.62, 98.45, 99.05, 114.45, 134.6, 157.32, 153.23, 168.75, 164.5, 168.93, 208.26, 290.79, 266.88, 308.88, 279.04], '6M': [87.68, 84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.23, 79.48, 81.69, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 163.66, 170.13, 176.89, 196.33, 219.43, 288.85, 308.88, 279.04], '1Y': [75.21, 76.24, 72.26, 70.85, 73.27, 81.74, 76.63, 77.81, 72.07, 74.26, 62.31, 67.1, 70.98, 80.09, 83.89, 92.5, 86.22, 84.26, 88.46, 87.59, 89.33, 78.68, 83.43, 100.2, 92.47, 81.7, 87.68, 84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 77.79, 80.86, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 163.66, 170.84, 176.89, 196.33, 219.43, 288.85, 308.88, 279.04] },
      velocityScore: { '1D': 17.1, '1W': -2.8, '1M': 18.6, '6M': null }, isNew: false,
      marketCap: '$244B', pe: 95.6, revenueGrowth: 28, eps: 2.92, grossMargin: 52, dividendYield: 0.08,
      etfPresence: { AIS: 4.38, ARTY: 4.52, BAI: 1.99, IGPT: 3.94, IVES: false, ALAI: false, CHAT: 1.55, AIFD: 6.54, SPRX: 4.45, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'TSM', name: 'TSM', easyScore: 6, avgWeight: 4.94, proScore: 2.96, coverage: 0.6,
      price: 436.39, weeklyPrices: [425.83, 432.15, 462.12, 467.67, 436.39], weeklyChange: 2.48, dayChange: -6.69, sortRank: 0, periodReturns: { '1M': 7.9, 'YTD': 43.6, '6M': 47, '1Y': 98.3 },
      priceHistory: { '1D': [467.67, 441, 446.31, 446.04, 442.83, 440.28, 439.93, 438.83, 438.89, 442.66, 442.7, 441.47, 442.37, 442.34, 443.43, 442.24, 440.67, 439.89, 438.54, 436.35, 438.56, 439.61, 438.42, 436.39], '1W': [425.83, 432.15, 462.12, 467.67, 436.39], '1M': [412.32, 422.73, 424.86, 418.45, 435.63, 446.69, 436.69, 444.92, 415.17, 426.8, 427.92, 408.75, 421.07, 423.93, 441.4, 425.83, 432.15, 462.12, 467.67, 436.39], 'YTD': [303.89, 318.01, 327.11, 327.37, 339.55, 330.73, 374.09, 360.39, 376.81, 357.44, 354.56, 339.57, 347.75, 337.95, 365.9, 375.1, 387.44, 392.34, 394.41, 397.28, 395.95, 412.32, 446.69, 427.92, 441.4, 436.39], '6M': [296.95, 303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 368.1, 370.54, 374.58, 338.89, 338.31, 329.24, 326.74, 341.76, 369.57, 366.24, 404.98, 401.61, 411.68, 404.35, 404.52, 435.63, 426.8, 441.4, 436.39], '1Y': [220.09, 224.68, 231.84, 237.56, 240.33, 242.91, 232.47, 244.29, 232.7, 238.72, 231.39, 260.44, 262.79, 280.71, 288.47, 304.52, 295.94, 294.51, 301.53, 294.05, 291.17, 277.91, 284.68, 295.45, 310.14, 276.96, 296.95, 303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 370.04, 369.11, 338.89, 338.31, 329.24, 326.74, 341.76, 369.57, 366.24, 404.98, 401.61, 404.54, 404.35, 404.52, 435.63, 426.8, 441.4, 436.39] },
      velocityScore: { '1D': 1, '1W': 3.1, '1M': -3.9, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 37.6, revenueGrowth: 35, eps: 11.6, grossMargin: 62, dividendYield: 0.81,
      etfPresence: { AIS: 3.07, ARTY: false, BAI: 4.31, IGPT: false, IVES: 5.47, ALAI: 5.82, CHAT: false, AIFD: 3.41, SPRX: false, AOTG: 7.55 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 4.74, proScore: 2.84, coverage: 0.6,
      price: 346.13, weeklyPrices: [373.25, 363.79, 368.03, 349.68, 346.13], weeklyChange: -7.27, dayChange: -0.98, sortRank: 0, periodReturns: { '1M': -9.6, 'YTD': 10.6, '6M': 10.1, '1Y': 107.5 },
      priceHistory: { '1D': [349.56, 347.31, 347.97, 347.88, 347.48, 348.17, 346.94, 345.43, 346.02, 346.19, 345.92, 347.54, 347.87, 347.63, 347.81, 347.7, 346.73, 346.47, 346.47, 346.45, 346.86, 346.93, 347.75, 346.13], '1W': [373.25, 363.79, 368.03, 349.68, 346.13], '1M': [388.88, 388.83, 390.13, 380.34, 376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68, 369.35, 373.25, 363.79, 368.03, 349.68, 346.13], 'YTD': [313, 325.44, 335.84, 330.54, 338.25, 331.25, 310.96, 302.85, 307.38, 303.13, 308.7, 307.69, 290.93, 287.56, 317.32, 337.12, 339.32, 349.78, 388.43, 387.35, 396.94, 388.88, 361.85, 364.26, 369.35, 346.13], '6M': [314.35, 313, 325.44, 332.78, 327.93, 338, 322.86, 309, 314.98, 311.76, 298.52, 302.28, 301, 274.34, 299.99, 321.31, 337.42, 350.34, 383.25, 400.8, 396.78, 382.97, 376.37, 363.31, 369.35, 346.13], '1Y': [166.77, 175.84, 176.62, 182.97, 190.23, 196.53, 194.67, 203.34, 201.57, 207.14, 230.66, 239.17, 249.53, 247.14, 244.9, 244.62, 245.45, 250.46, 267.47, 277.54, 291.31, 284.28, 323.44, 319.63, 320.21, 296.72, 314.35, 313, 325.44, 332.78, 327.93, 338, 322.86, 305.72, 311.49, 306.52, 298.52, 302.28, 301, 274.34, 299.99, 321.31, 337.42, 350.34, 383.25, 388.64, 396.78, 382.97, 376.37, 363.31, 369.35, 346.13] },
      velocityScore: { '1D': 4, '1W': 1.4, '1M': -25.5, '6M': null }, isNew: false,
      marketCap: '$4.2T', pe: 26.4, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.95, IGPT: 7.48, IVES: 4.33, ALAI: false, CHAT: 4.72, AIFD: 4.94, SPRX: false, AOTG: 4.01 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 6, avgWeight: 3, proScore: 1.8, coverage: 0.6,
      price: 670.75, weeklyPrices: [681.08, 712.13, 746.23, 732.62, 670.75], weeklyChange: -1.52, dayChange: -8.45, sortRank: 0, periodReturns: { '1M': 38.5, 'YTD': 289.4, '6M': 276.3, '1Y': 980.6 },
      priceHistory: { '1D': [732.62, 662.65, 664.92, 677.38, 661.2, 660, 661.64, 662.44, 666.46, 673.29, 677.25, 676.31, 673.05, 674.83, 671.9, 671.03, 668.95, 668.75, 669.17, 665.62, 669.46, 672.34, 670.75, 670.75], '1W': [681.08, 712.13, 746.23, 732.62, 670.75], '1M': [524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75], 'YTD': [172.27, 187.68, 215, 243.29, 278.41, 260.19, 273.74, 284.67, 282.25, 261.3, 268.81, 304.9, 296.14, 270.49, 338.78, 365, 389.1, 390.99, 465.26, 488.74, 458.68, 524.65, 563.1, 517.72, 653.53, 670.75], '6M': [178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 284.1, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 480, 482.02, 484.28, 546.2, 526.93, 653.53, 670.75], '1Y': [62.07, 63.84, 64.64, 66.53, 69.32, 71.43, 75.84, 75.91, 75.86, 79.71, 86, 95.02, 100.94, 109.69, 130.59, 121.18, 113.13, 121.41, 124.92, 152.18, 169.99, 152.86, 155.41, 155.59, 181.95, 166.26, 178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 482.02, 484.28, 546.2, 526.93, 653.53, 670.75] },
      velocityScore: { '1D': -2.2, '1W': 12.5, '1M': -6.2, '6M': null }, isNew: false,
      marketCap: '$231B', pe: 40.2, revenueGrowth: 46, eps: 16.7, grossMargin: 45, dividendYield: 0.08,
      etfPresence: { AIS: 1.92, ARTY: 3.23, BAI: 3.56, IGPT: 3.7, IVES: false, ALAI: 4.72, CHAT: false, AIFD: false, SPRX: false, AOTG: 0.87 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'ANET', name: 'ARISTA NETWORKS INC', easyScore: 6, avgWeight: 2.24, proScore: 1.34, coverage: 0.6,
      price: 162.2, weeklyPrices: [168.01, 164.93, 169.67, 174.56, 162.20], weeklyChange: -3.46, dayChange: -7.08, sortRank: 0, periodReturns: { '1M': 5.3, 'YTD': 23.8, '6M': 23.5, '1Y': 70.8 },
      priceHistory: { '1D': [174.56, 161.49, 163.52, 163.69, 162.26, 161.21, 161.14, 161.35, 161.05, 162.24, 163.92, 164.23, 163.88, 163.79, 164.21, 164.22, 163.46, 163.15, 162.74, 161.59, 162.26, 162.79, 162.38, 162.2], '1W': [168.01, 164.93, 169.67, 174.56, 162.2], '1M': [158.01, 154.31, 155.27, 159.47, 170.68, 175.33, 174.37, 166.01, 154.27, 156.4, 152.16, 151.76, 156.4, 163.24, 169.09, 168.01, 164.93, 169.67, 174.56, 162.2], 'YTD': [131.03, 123.72, 125.09, 138.41, 148.15, 128.67, 140.66, 137.23, 130.25, 134.83, 138.23, 136.07, 135.01, 122.78, 145.07, 154.33, 177.73, 165.29, 170.22, 142.54, 141.71, 158.01, 175.33, 152.16, 169.09, 162.2], '6M': [131.32, 131.03, 123.72, 130.59, 136.34, 141.74, 137.49, 135.12, 132.79, 133.5, 132.89, 133.57, 131.22, 120.77, 126.25, 152.02, 166.85, 172.47, 172.62, 141.77, 141.97, 154.03, 170.68, 156.4, 169.09, 162.2], '1Y': [94.97, 98.91, 106.28, 108.3, 113.04, 122.09, 118.12, 141.25, 132.78, 134.27, 137.38, 150.72, 142.84, 142.64, 149.27, 157.36, 138.79, 145.94, 156.77, 153.55, 134.93, 123.45, 125.04, 127.8, 132.36, 122.36, 131.32, 131.03, 123.72, 130.59, 136.34, 141.74, 137.49, 141.59, 127.43, 129.3, 132.89, 133.57, 131.22, 120.77, 126.25, 152.02, 166.85, 172.47, 172.62, 136.43, 141.97, 154.03, 170.68, 156.4, 169.09, 162.2] },
      velocityScore: { '1D': -2.2, '1W': -11.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$204B', pe: 55.5, revenueGrowth: 35, eps: 2.92, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: false, ARTY: 2.41, BAI: 1.36, IGPT: false, IVES: false, ALAI: 1, CHAT: 2.14, AIFD: 4.93, SPRX: 1.58, AOTG: false },
      tonyNote: 'ARISTA NETWORKS INC appears in 6 of 10 AI & ML ETFs (60% coverage) with average weight 2.2% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 5, avgWeight: 3.74, proScore: 1.87, coverage: 0.5,
      price: 562.2, weeklyPrices: [600.21, 567.58, 577.22, 563.85, 562.20], weeklyChange: -6.33, dayChange: -0.29, sortRank: 0, periodReturns: { '1M': -7.9, 'YTD': -14.8, '6M': -15.5, '1Y': -21.1 },
      priceHistory: { '1D': [563.85, 568.66, 569.91, 569.17, 568.59, 567.41, 565.51, 563.35, 562.91, 563.73, 563.53, 563.94, 565.74, 565.2, 565.69, 565.94, 564.07, 563.36, 562.68, 562.75, 563.59, 562.77, 563.04, 562.2], '1W': [600.21, 567.58, 577.22, 563.85, 562.2], '1M': [612.34, 635.26, 635.29, 632.51, 600.47, 597.63, 622.98, 627.57, 593, 585.39, 584.59, 570.98, 568.43, 566.98, 593.48, 600.21, 567.58, 577.22, 563.85, 562.2], 'YTD': [660.09, 646.06, 615.52, 647.63, 738.31, 670.21, 668.69, 644.78, 657.01, 667.73, 654.86, 615.68, 594.89, 572.13, 612.42, 671.58, 674.72, 671.34, 604.96, 603, 611.21, 612.34, 597.63, 584.59, 593.48, 562.2], '6M': [664.94, 660.09, 646.06, 620.8, 658.76, 716.5, 661.46, 649.81, 655.66, 648.18, 644.86, 613.71, 593.66, 525.72, 573.02, 634.53, 670.91, 678.62, 610.41, 609.63, 614.23, 610.26, 600.47, 585.39, 593.48, 562.2], '1Y': [712.2, 719.22, 732.78, 702.91, 713.58, 695.21, 763.46, 790, 751.48, 754.1, 737.05, 751.98, 775.72, 760.66, 717.34, 717.84, 708.65, 733.27, 751.44, 627.32, 627.08, 597.69, 636.22, 639.6, 650.13, 649.5, 664.94, 660.09, 646.06, 620.8, 658.76, 716.5, 661.46, 639.77, 637.25, 653.56, 644.86, 613.71, 593.66, 525.72, 573.02, 634.53, 670.91, 678.62, 610.41, 598.86, 614.23, 610.26, 600.47, 585.39, 593.48, 562.2] },
      velocityScore: { '1D': 20.6, '1W': 14.7, '1M': -32, '6M': null }, isNew: false,
      marketCap: '$1.4T', pe: 20.4, revenueGrowth: 33, eps: 27.52, grossMargin: 82, dividendYield: 0.37,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: 7.59, IVES: 4.29, ALAI: 3.84, CHAT: 1.89, AIFD: false, SPRX: false, AOTG: 1.09 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.29, proScore: 1.65, coverage: 0.5,
      price: 373.94, weeklyPrices: [393.83, 378.91, 379.40, 367.34, 373.94], weeklyChange: -5.05, dayChange: 1.8, sortRank: 0, periodReturns: { '1M': -10.7, 'YTD': -22.7, '6M': -23.2, '1Y': -23.7 },
      priceHistory: { '1D': [367.34, 374.83, 374.64, 375.21, 376.04, 375.44, 374.52, 372.96, 373.16, 372.36, 372.25, 372.98, 372.87, 372.56, 373.02, 374.14, 373.79, 373.81, 373.21, 372.86, 373.28, 373.95, 375.11, 373.94], '1W': [393.83, 378.91, 379.4, 367.34, 373.94], '1M': [416.03, 412.67, 426.99, 450.24, 460.52, 441.31, 427.34, 428.05, 416.67, 411.74, 403.41, 397.36, 390.34, 390.74, 399.76, 393.83, 378.91, 379.4, 367.34, 373.94], 'YTD': [483.62, 478.11, 459.38, 451.14, 433.5, 393.67, 404.37, 398.46, 401.72, 405.2, 404.88, 391.79, 371.04, 370.17, 374.33, 411.22, 432.92, 429.25, 411.38, 407.77, 423.54, 416.03, 441.31, 403.41, 399.76, 373.94], '6M': [486.85, 483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.84, 397.23, 392.74, 408.96, 395.55, 381.87, 356.77, 372.88, 384.37, 418.07, 424.82, 413.62, 415.12, 421.92, 418.57, 460.52, 411.74, 399.76, 373.94], '1Y': [490.11, 492.05, 503.51, 505.62, 505.87, 513.24, 527.75, 529.24, 509.77, 502.04, 505.35, 500.37, 510.02, 510.15, 519.71, 524.85, 513.57, 517.66, 542.07, 514.33, 508.68, 493.79, 476.99, 477.73, 478.56, 476.12, 486.85, 483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 384.47, 398.55, 408.96, 395.55, 381.87, 356.77, 372.88, 384.37, 418.07, 424.82, 413.62, 412.66, 421.92, 418.57, 460.52, 411.74, 399.76, 373.94] },
      velocityScore: { '1D': -2.4, '1W': -4.6, '1M': -36.3, '6M': null }, isNew: false,
      marketCap: '$2.8T', pe: 22.3, revenueGrowth: 18, eps: 16.79, grossMargin: 68, dividendYield: 0.99,
      etfPresence: { AIS: false, ARTY: 2.26, BAI: false, IGPT: false, IVES: 4.22, ALAI: 4.69, CHAT: 1.91, AIFD: false, SPRX: false, AOTG: 3.39 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'ALAB', name: 'ALAB', easyScore: 5, avgWeight: 3.21, proScore: 1.6, coverage: 0.5,
      price: 397.02, weeklyPrices: [361.71, 374.68, 417.07, 439.66, 397.02], weeklyChange: 9.76, dayChange: -9.7, sortRank: 0, periodReturns: { '1M': 29.4, 'YTD': 138.7, '6M': 135.2, '1Y': 355 },
      priceHistory: { '1D': [439.66, 406.57, 415.65, 414, 408.79, 404.69, 401.58, 400.63, 401.49, 404.41, 404.54, 403.12, 400.88, 402.46, 403.58, 401.74, 400.16, 397.3, 398.47, 394.12, 398.19, 400.08, 398.64, 397.02], '1W': [361.71, 374.68, 417.07, 439.66, 397.02], '1M': [318.72, 325.33, 349.17, 342.85, 320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 361.71, 374.68, 417.07, 439.66, 397.02], 'YTD': [166.36, 156.73, 172.14, 176.35, 160.46, 142.82, 143.71, 132.62, 124.67, 113.77, 124.71, 126.34, 120.33, 109.6, 125.46, 172.09, 194.06, 183.31, 215.69, 204.42, 215.58, 318.72, 355.76, 341.7, 389.2, 397.02], '6M': [168.83, 166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 126.58, 129.68, 118.83, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 199.79, 232.68, 306.88, 320.09, 346.33, 389.2, 397.02], '1Y': [87.26, 88.66, 99.86, 91.94, 119.48, 128.87, 135.54, 192, 171.06, 178.56, 176.61, 230.37, 249.38, 205.27, 194.5, 219.36, 161.55, 157.51, 168.25, 179.31, 167.55, 139.52, 144.78, 152.5, 164.32, 140.24, 168.83, 166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 232.68, 306.88, 320.09, 346.33, 389.2, 397.02] },
      velocityScore: { '1D': 0, '1W': 1.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$68B', pe: 266.5, revenueGrowth: 93, eps: 1.49, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 1.87, ARTY: 1.39, BAI: false, IGPT: false, IVES: false, ALAI: 1.39, CHAT: 2.87, AIFD: false, SPRX: 8.51, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 5, avgWeight: 2.63, proScore: 1.32, coverage: 0.5,
      price: 827.92, weeklyPrices: [875.36, 869.98, 850.00, 893.93, 827.92], weeklyChange: -5.42, dayChange: -7.38, sortRank: 0, periodReturns: { '1M': -12.6, 'YTD': 124.6, '6M': 113.7, '1Y': 801.8 },
      priceHistory: { '1D': [893.93, 821.69, 846.8, 851.58, 839.36, 831.9, 828.55, 825, 824, 833.7, 835.99, 832.56, 830.21, 830.05, 832.8, 828.4, 824, 821.41, 820.69, 815.36, 820.04, 821.88, 822.2, 827.92], '1W': [875.36, 869.98, 850, 893.93, 827.92], '1M': [910.81, 902.31, 860.62, 854.96, 905, 1029.15, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93, 827.92], 'YTD': [368.59, 348.26, 331.62, 354.49, 381.44, 504.42, 574.11, 635.64, 677, 680.8, 672, 700.81, 777.17, 702.76, 896.02, 824.01, 873.6, 791.37, 994.56, 992.37, 884.98, 910.81, 1029.15, 821.76, 957.24, 827.92], '6M': [387.41, 368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 583.46, 667.77, 700.91, 558.44, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 903.8, 970.7, 946.9, 905, 895.4, 957.24, 827.92], '1Y': [91.81, 91.49, 90.44, 99.63, 102.13, 109.85, 108.15, 119.66, 117.96, 124.62, 134.12, 164.88, 163.34, 152.75, 171.4, 163.09, 156.78, 162.95, 198.39, 188.36, 252.47, 247.43, 291.27, 302.98, 366, 320.25, 387.41, 368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 674.73, 783.25, 558.44, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 1053.09, 970.7, 946.9, 905, 895.4, 957.24, 827.92] },
      velocityScore: { '1D': 4.8, '1W': -8.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$64B', pe: 144.7, revenueGrowth: 90, eps: 5.72, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.53, IGPT: false, IVES: false, ALAI: 0.41, CHAT: 1.36, AIFD: 5.62, SPRX: 3.24, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 5 of 10 AI & ML ETFs (50% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 5, avgWeight: 2.54, proScore: 1.27, coverage: 0.5,
      price: 1963.6, weeklyPrices: [1991.55, 1958.80, 2184.75, 2273.73, 1963.60], weeklyChange: -1.4, dayChange: -13.64, sortRank: 0, periodReturns: { '1M': 32.8, 'YTD': 727.2, '6M': 701.8, '1Y': 4047.9 },
      priceHistory: { '1D': [2273.73, 1965, 1993.11, 2040.01, 1998.99, 1995.46, 1990.76, 1987.71, 1987.5, 2003.18, 2013.35, 1992, 1987.09, 1980.32, 1986.08, 1980.19, 1956.28, 1957.63, 1957.02, 1957.11, 1962.34, 1976.82, 1955.54, 1963.6], '1W': [1991.55, 1958.8, 2184.75, 2273.73, 1963.6], '1M': [1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6], 'YTD': [237.38, 334.54, 387.81, 503.44, 539.3, 576.2, 599.34, 621.09, 651.9, 599.06, 655.43, 753.69, 677.86, 635.34, 780.9, 891.72, 979.07, 1002.35, 1406.32, 1452.02, 1333.01, 1589.55, 1716.36, 1646.54, 2107.86, 1963.6], '6M': [244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 630.29, 649.97, 635.36, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1562.34, 1407.61, 1478.69, 1761.43, 1642, 2107.86, 1963.6], '1Y': [47.34, 44.96, 46.2, 41.36, 43, 43.39, 41.93, 46.83, 44.58, 47.35, 53.01, 73.92, 93.97, 99.83, 121.12, 131.88, 127.29, 149.29, 175.53, 194.57, 271.58, 244.93, 220.5, 194.38, 232.86, 206.83, 244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1407.61, 1478.69, 1761.43, 1642, 2107.86, 1963.6] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$291B', pe: 66.9, revenueGrowth: 251, eps: 29.33, grossMargin: 56, dividendYield: null,
      etfPresence: { AIS: 2.07, ARTY: false, BAI: 3.2, IGPT: 4.93, IVES: false, ALAI: 0.52, CHAT: false, AIFD: false, SPRX: false, AOTG: 2 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 4, avgWeight: 3.73, proScore: 1.49, coverage: 0.4,
      price: 234.11, weeklyPrices: [246.00, 237.50, 244.39, 232.79, 234.11], weeklyChange: -4.83, dayChange: 0.57, sortRank: 0, periodReturns: { '1M': -12.1, 'YTD': 1.4, '6M': 0.8, '1Y': 10 },
      priceHistory: { '1D': [232.79, 234.71, 234.83, 236.35, 236.13, 235.97, 234.58, 233.74, 233.95, 234.6, 234.4, 234.76, 234.74, 234.6, 233.97, 234.73, 235.28, 235.7, 234.69, 234.51, 234.51, 234.53, 235.49, 234.11], '1W': [246, 237.5, 244.39, 232.79, 234.11], '1M': [265.29, 271.85, 274, 270.64, 261.26, 256.52, 250.02, 253.79, 246.03, 245.22, 244.19, 238, 241.51, 238.55, 246.02, 246, 237.5, 244.39, 232.79, 234.11], 'YTD': [230.82, 246.29, 236.65, 234.34, 241.73, 222.69, 204.08, 204.86, 207.92, 216.82, 212.65, 209.87, 211.71, 208.27, 221.25, 248.5, 255.36, 259.7, 273.55, 265.82, 264.86, 265.29, 256.52, 244.19, 246.02, 234.11], '6M': [232.14, 230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 199.6, 210.11, 210, 213.21, 207.67, 205.37, 199.34, 212.79, 239.89, 248.28, 261.12, 272.05, 272.68, 264.14, 266.32, 261.26, 245.22, 246.02, 234.11], '1Y': [212.77, 220.46, 222.54, 223.19, 228.29, 230.19, 213.75, 221.47, 228.01, 228.71, 225.99, 230.33, 231.62, 220.21, 220.63, 225.22, 216.39, 222.03, 229.25, 249.32, 249.1, 222.55, 229.67, 232.38, 231.78, 221.27, 232.14, 230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 198.79, 205.27, 208.39, 213.21, 207.67, 205.37, 199.34, 212.79, 239.89, 248.28, 261.12, 272.05, 268.99, 264.14, 266.32, 261.26, 245.22, 246.02, 234.11] },
      velocityScore: { '1D': -3.2, '1W': -25.9, '1M': -50.8, '6M': null }, isNew: false,
      marketCap: '$2.5T', pe: 31.8, revenueGrowth: 17, eps: 7.36, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 4.17, ALAI: 5.27, CHAT: 2.13, AIFD: 3.36, SPRX: false, AOTG: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'ARM', name: 'ARM', easyScore: 4, avgWeight: 3.7, proScore: 1.48, coverage: 0.4,
      price: 366.39, weeklyPrices: [396.34, 418.88, 439.46, 407.72, 366.39], weeklyChange: -7.56, dayChange: -10.14, sortRank: 0, periodReturns: { '1M': 19.5, 'YTD': 235.2, '6M': 227.1, '1Y': 134.2 },
      priceHistory: { '1D': [407.72, 378.41, 387.02, 381.26, 373.57, 372.15, 372.15, 371.08, 369.02, 370.67, 370.3, 370.75, 369.51, 371.54, 372.33, 370.11, 368.28, 371.05, 367.49, 363.88, 366.84, 368.83, 366.19, 366.39], '1W': [396.34, 418.88, 439.46, 407.72, 366.39], '1M': [321.22, 302.71, 335.27, 353.29, 408.85, 402.71, 411.83, 393.44, 342.93, 346.39, 324.86, 307.43, 342.23, 380.81, 412.55, 396.34, 418.88, 439.46, 407.72, 366.39], 'YTD': [109.31, 113.08, 104.99, 119.2, 108.43, 110.88, 125.28, 126.93, 129.26, 124.11, 120.1, 128.36, 157.07, 151.28, 148.91, 159.34, 196.57, 198.65, 208.84, 207.92, 215.12, 321.22, 402.71, 324.86, 412.55, 366.39], '6M': [112.02, 109.31, 113.08, 105.11, 116.07, 105.36, 123.7, 122.19, 125.58, 127.45, 114.38, 115.75, 132.35, 144.13, 148.77, 157.58, 175.1, 215.88, 203.26, 213.27, 209.16, 306.51, 408.85, 346.39, 412.55, 366.39], '1Y': [156.41, 156.33, 148.02, 153.9, 159.28, 163.32, 137.23, 142.39, 134.01, 140.26, 131.42, 154.14, 153.37, 144.3, 150.38, 166.77, 168.16, 169.38, 173.09, 160.73, 149.74, 136.04, 131.44, 139.19, 141.52, 114.58, 112.02, 109.31, 113.08, 105.11, 116.07, 105.36, 123.7, 125.28, 123.78, 124.37, 114.38, 115.75, 132.35, 144.13, 148.77, 157.58, 175.1, 215.88, 203.26, 212.65, 209.16, 306.51, 408.85, 346.39, 412.55, 366.39] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$391B', pe: 426, revenueGrowth: 20, eps: 0.86, grossMargin: 98, dividendYield: null,
      etfPresence: { AIS: 2.4, ARTY: false, BAI: false, IGPT: false, IVES: false, ALAI: 0.52, CHAT: 2.84, AIFD: false, SPRX: 9.04, AOTG: false },
      tonyNote: 'Arm Holdings is held across Broad Tech and AI ETFs as the CPU architecture licensor embedded in every mobile device and increasingly in AI inference chips and data center CPUs. Revenue grew and the royalty model is high-margin; the weight score reflects consistent institutional positioning as the AI chip design ecosystem expands on Arm cores.',
    },
    {
      ticker: 'INTC', name: 'INTC', easyScore: 4, avgWeight: 3.22, proScore: 1.29, coverage: 0.4,
      price: 132.28, weeklyPrices: [117.05, 121.10, 133.99, 140.94, 132.28], weeklyChange: 13.01, dayChange: -6.14, sortRank: 0, periodReturns: { '1M': 10.4, 'YTD': 258.5, '6M': 263.9, '1Y': 486.6 },
      priceHistory: { '1D': [140.94, 132.23, 137.32, 137.16, 136.09, 135.59, 135.68, 135.68, 135.41, 135.95, 135.47, 135.13, 134.72, 133.53, 134.26, 133.42, 133.2, 132.69, 132.86, 131.91, 132.75, 133.59, 132.31, 132.28], '1W': [117.05, 121.1, 133.99, 140.94, 132.28], '1M': [123.52, 121.77, 120.89, 114.68, 109.33, 107.93, 112.71, 111.78, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94, 132.28], 'YTD': [36.9, 41.11, 48.72, 54.32, 48.66, 48.24, 48.29, 44.62, 45.46, 45.58, 47.98, 45.03, 47.18, 44.13, 58.95, 64.94, 65.27, 84.52, 108.15, 120.61, 108.17, 123.52, 107.93, 107.92, 127.86, 132.28], '6M': [36.35, 36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.48, 44.11, 45.61, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 124.92, 108.77, 119.84, 109.33, 110.27, 127.86, 132.28], '1Y': [22.55, 22.85, 23.44, 22.69, 23.49, 20.34, 20.19, 21.81, 25.31, 24.35, 24, 24.77, 24.9, 31.22, 35.94, 37.43, 35.63, 38.12, 41.53, 37.03, 37.88, 34.33, 35.83, 43.76, 40.78, 36.05, 36.35, 36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 43.63, 45.5, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 129.44, 108.77, 119.84, 109.33, 110.27, 127.86, 132.28] },
      velocityScore: { '1D': -15.1, '1W': -13.4, '1M': -55.5, '6M': null }, isNew: false,
      marketCap: '$665B', pe: null, revenueGrowth: 7, eps: -0.61, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.17, ARTY: false, BAI: 3.2, IGPT: 5.19, IVES: false, ALAI: false, CHAT: 1.31, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'VRT', name: 'VRT', easyScore: 4, avgWeight: 3.02, proScore: 1.21, coverage: 0.4,
      price: 318.32, weeklyPrices: [299.60, 317.58, 333.05, 357.96, 318.32], weeklyChange: 6.25, dayChange: -11.07, sortRank: 0, periodReturns: { '1M': -2.8, 'YTD': 96.5, '6M': 91.5, '1Y': 160.2 },
      priceHistory: { '1D': [357.96, 318.67, 326.49, 327.43, 324.23, 320.64, 321.43, 321.01, 321.15, 324.77, 325.85, 326.22, 324.78, 323.67, 324.28, 321.88, 320.24, 320.85, 319.36, 317.66, 319.35, 319.36, 318.05, 318.32], '1W': [299.6, 317.58, 333.05, 357.96, 318.32], '1M': [323.91, 319.78, 314.18, 315.71, 323.39, 334.49, 331.44, 323.92, 300.51, 300.57, 289.52, 280.98, 297.88, 302.87, 311.93, 299.6, 317.58, 333.05, 357.96, 318.32], 'YTD': [162.01, 160.78, 170.86, 181.12, 195.1, 177.75, 248.51, 243.06, 259.23, 251.28, 268.26, 264.71, 276.16, 250.58, 281.03, 301.16, 305.14, 305.03, 341.02, 367.13, 339.73, 323.91, 334.49, 289.52, 311.93, 318.32], '6M': [166.26, 162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 236.51, 243.75, 254.89, 241.78, 258.88, 255.88, 251.07, 258.73, 299.96, 314.41, 322.43, 330.97, 339.97, 370.94, 327.46, 323.39, 300.57, 311.93, 318.32], '1Y': [122.32, 122.54, 128.37, 125.4, 130.19, 144.17, 138.76, 143.72, 129.05, 127.93, 125.59, 136.74, 136.83, 141.62, 161.59, 167.38, 175.15, 174.8, 190.57, 180.82, 179.05, 164.86, 169.57, 178.88, 181.82, 149.83, 166.26, 162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 234.53, 245.42, 257.75, 241.78, 258.88, 255.88, 251.07, 258.73, 299.96, 314.41, 322.43, 330.97, 367.92, 370.94, 327.46, 323.39, 300.57, 311.93, 318.32] },
      velocityScore: { '1D': 1.7, '1W': 5.2, '1M': -39.5, '6M': null }, isNew: false,
      marketCap: '$122B', pe: 80.2, revenueGrowth: 30, eps: 3.97, grossMargin: 37, dividendYield: 0.07,
      etfPresence: { AIS: 3.58, ARTY: false, BAI: 2, IGPT: false, IVES: false, ALAI: false, CHAT: 2.33, AIFD: 4.18, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 4, avgWeight: 2.78, proScore: 1.11, coverage: 0.4,
      price: 165.16, weeklyPrices: [188.33, 183.53, 184.29, 175.07, 165.16], weeklyChange: -12.3, dayChange: -5.66, sortRank: 0, periodReturns: { '1M': -14, 'YTD': -15.3, '6M': -15.4, '1Y': -23.3 },
      priceHistory: { '1D': [175.07, 172.94, 173.93, 172.9, 172.4, 171.3, 170.56, 169.27, 169.35, 170.13, 168.41, 168.45, 168.2, 168.27, 167.93, 167.24, 166.37, 165.91, 165.41, 165.49, 166.09, 166.12, 165.8, 165.16], '1W': [188.33, 183.53, 184.29, 175.07, 165.16], '1M': [193.06, 190.96, 203.7, 225.78, 248.15, 244.58, 230.33, 236.34, 213.68, 211.82, 205.81, 201.26, 184.1, 184.13, 192.64, 188.33, 183.53, 184.29, 175.07, 165.16], 'YTD': [194.91, 189.65, 193.61, 178.18, 169.01, 136.48, 157.16, 156.54, 150.31, 152.37, 163.12, 152.9, 146.02, 147.11, 143.66, 169.81, 187.5, 165.96, 185.35, 186.83, 186.61, 193.06, 244.58, 205.81, 192.64, 165.16], '6M': [195.34, 194.91, 189.65, 189.85, 177.16, 164.58, 142.82, 156.48, 148.08, 145.4, 152.96, 155.11, 149.68, 139.66, 145.54, 155.62, 177.58, 172.96, 180.29, 195.95, 192.95, 192.08, 248.15, 211.82, 192.64, 165.16], '1Y': [215.27, 218.96, 235.81, 241.3, 241.9, 250.6, 255.67, 253.86, 234.62, 234.21, 223.45, 328.33, 301.41, 308.46, 289.01, 288.63, 299, 275.15, 280.83, 248.17, 236.15, 220.49, 197.03, 207.73, 223.01, 178.46, 195.34, 194.91, 189.65, 189.85, 177.16, 164.58, 142.82, 160.14, 141.31, 149.25, 152.96, 155.11, 149.68, 139.66, 145.54, 155.62, 177.58, 172.96, 180.29, 193.84, 192.95, 192.08, 248.15, 211.82, 192.64, 165.16] },
      velocityScore: { '1D': -3.5, '1W': -6.7, '1M': -41, '6M': null }, isNew: false,
      marketCap: '$475B', pe: 28.3, revenueGrowth: 21, eps: 5.83, grossMargin: 66, dividendYield: 1.14,
      etfPresence: { AIS: false, ARTY: 3.51, BAI: false, IGPT: false, IVES: 3.49, ALAI: false, CHAT: 1.41, AIFD: false, SPRX: false, AOTG: 2.7 },
      tonyNote: 'Oracle lands in 3 AI ETFs on the strength of its cloud database and AI infrastructure contracts. Revenue grew 22%, 67% gross margin, P/E of 40x. The 17.5% weekly return following a major earnings beat shows how quickly sentiment can reprice; the weight score at 2.04% is still modest, meaning ETF managers have started building positions but conviction is not yet deep.',
    },
    {
      ticker: 'CRWV', name: 'COREWEAVE INC CLASS A', easyScore: 4, avgWeight: 2.72, proScore: 1.09, coverage: 0.4,
      price: 105.72, weeklyPrices: [117.03, 115.21, 117.95, 111.29, 105.72], weeklyChange: -9.66, dayChange: -5, sortRank: 0, periodReturns: { '1M': 0.2, 'YTD': 47.6, '6M': 31.7, '1Y': -38.8 },
      priceHistory: { '1D': [111.29, 105.73, 109.64, 110.42, 111.64, 108.13, 106.55, 105.99, 105.75, 107.36, 107.37, 107.04, 107.02, 107.17, 108.29, 107.59, 106.65, 106.52, 105.69, 104.91, 105.31, 105.6, 105.35, 105.72], '1W': [117.03, 115.21, 117.95, 111.29, 105.72], '1M': [105.89, 104.27, 106.86, 109.53, 124.82, 119.27, 110.93, 108.03, 100.39, 102.37, 98.45, 95.61, 95.74, 100.55, 106.71, 117.03, 115.21, 117.95, 111.29, 105.72], 'YTD': [71.61, 77.09, 89.8, 91.79, 99.53, 74.65, 95.15, 97.14, 97.63, 79.5, 81.96, 82.82, 87.58, 77.47, 88.9, 118.69, 122.54, 105.53, 127.89, 107.75, 103.77, 105.89, 119.27, 98.45, 106.71, 105.72], '6M': [80.26, 71.61, 77.09, 95.01, 92.98, 93.19, 89.95, 95.7, 89.25, 79.56, 72.99, 81.11, 81.47, 74.81, 80.94, 110.27, 117.43, 112.06, 125.43, 114.15, 107.3, 105.49, 124.82, 102.37, 106.71, 105.72], '1Y': [172.62, 155.94, 153.05, 143.04, 126.05, 102.89, 111.84, 148.75, 92.89, 91.39, 89.88, 117.14, 120.86, 133.4, 137.05, 139.98, 134.06, 125.06, 134.8, 115.75, 88.39, 74.9, 71.29, 79.36, 88.16, 64.55, 80.26, 71.61, 77.09, 95.01, 92.98, 93.19, 89.95, 96.04, 90.84, 78.05, 72.99, 81.11, 81.47, 74.81, 80.94, 110.27, 117.43, 112.06, 125.43, 114.7, 107.3, 105.49, 124.82, 102.37, 106.71, 105.72] },
      velocityScore: { '1D': -5.2, '1W': 6.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$58B', pe: null, revenueGrowth: 112, eps: -2.72, grossMargin: 69, dividendYield: null,
      etfPresence: { AIS: false, ARTY: 4.61, BAI: 1.3, IGPT: false, IVES: 2.31, ALAI: false, CHAT: 2.67, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'COREWEAVE INC CLASS A appears in 4 of 10 AI & ML ETFs (40% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 5.65, proScore: 5.65, coverage: 1,
      price: 1051.77, weeklyPrices: [1020.76, 1043.19, 1133.99, 1211.38, 1051.77], weeklyChange: 3.04, dayChange: -13.18, sortRank: 0, periodReturns: { '1M': 40, 'YTD': 268.5, '6M': 280.7, '1Y': 722.3 },
      priceHistory: { '1D': [1211.38, 1069, 1101.16, 1119.47, 1092.35, 1083.86, 1082.11, 1075.75, 1077.68, 1091.87, 1089.06, 1083.66, 1078.91, 1076.83, 1076.45, 1069, 1058.69, 1056.24, 1053.9, 1041.25, 1050.66, 1050.72, 1050, 1051.77], '1W': [1020.76, 1043.19, 1133.99, 1211.38, 1051.77], '1M': [895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77], 'YTD': [285.41, 327.02, 333.35, 397.58, 435.79, 382.89, 410.34, 417.35, 415.56, 400.77, 418.69, 461.73, 382.09, 337.84, 406.73, 456.23, 487.48, 504.29, 640.2, 766.58, 681.54, 895.88, 1064.1, 935.89, 1087.99, 1051.77], '6M': [276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 746.81, 724.66, 751, 1035.5, 949.28, 1087.99, 1051.77], '1Y': [127.91, 120.89, 122.24, 116.43, 109.83, 114.74, 109.06, 127.75, 122.05, 116.5, 118.72, 140, 159.99, 161.71, 182.15, 196.54, 187.06, 202.29, 221.91, 218.03, 241.11, 228.5, 224.53, 234.16, 263.71, 225.52, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 724.66, 751, 1035.5, 949.28, 1087.99, 1051.77] },
      velocityScore: { '1D': 10.6, '1W': -10.3, '1M': -3.9, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 49.6, revenueGrowth: 196, eps: 21.2, grossMargin: 58, dividendYield: 0.05,
      etfPresence: { SOXX: 8.77, PSI: 5.94, XSD: 2.75, DRAM: 5.15 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 4.93, proScore: 3.7, coverage: 0.75,
      price: 519.85, weeklyPrices: [507.29, 512.48, 537.37, 551.63, 519.85], weeklyChange: 2.48, dayChange: -5.76, sortRank: 0, periodReturns: { '1M': 11.2, 'YTD': 142.7, '6M': 141.9, '1Y': 275.5 },
      priceHistory: { '1D': [551.63, 512.7, 525.25, 523.59, 523.53, 520.34, 519.24, 517.91, 518.73, 525.67, 526, 524.86, 521.1, 522.72, 524.05, 521.27, 520.13, 519.47, 519.08, 514.71, 518.53, 519.64, 517.92, 519.85], '1W': [507.29, 512.48, 537.37, 551.63, 519.85], '1M': [503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85], 'YTD': [214.16, 204.68, 223.6, 253.73, 252.18, 192.5, 213.58, 203.37, 203.68, 202.07, 204.83, 199.46, 220.27, 203.43, 231.82, 258.12, 303.46, 323.21, 355.26, 448.29, 420.99, 503.89, 521.54, 475.51, 547.26, 519.85], '6M': [214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 205.94, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 455.19, 424.1, 467.51, 510.13, 490.33, 547.26, 519.85], '1Y': [138.43, 136.11, 138.41, 160.08, 158.65, 179.51, 174.31, 174.95, 166.55, 166.62, 162.13, 159.54, 159.16, 160.88, 164.01, 235.56, 218.09, 238.03, 258.01, 250.05, 237.52, 230.29, 206.13, 217.6, 221.42, 198.11, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 424.1, 467.51, 510.13, 490.33, 547.26, 519.85] },
      velocityScore: { '1D': 0.3, '1W': -17.6, '1M': -34.6, '6M': null }, isNew: false,
      marketCap: '$848B', pe: 174.4, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 7.51, PSI: 4.81, XSD: 2.47, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.65, proScore: 3.48, coverage: 0.75,
      price: 132.28, weeklyPrices: [117.05, 121.10, 133.99, 140.94, 132.28], weeklyChange: 13.01, dayChange: -6.14, sortRank: 0, periodReturns: { '1M': 10.4, 'YTD': 258.5, '6M': 263.9, '1Y': 486.6 },
      priceHistory: { '1D': [140.94, 132.23, 137.32, 137.16, 136.09, 135.59, 135.68, 135.68, 135.41, 135.95, 135.47, 135.13, 134.72, 133.53, 134.26, 133.42, 133.2, 132.69, 132.86, 131.91, 132.75, 133.59, 132.31, 132.28], '1W': [117.05, 121.1, 133.99, 140.94, 132.28], '1M': [123.52, 121.77, 120.89, 114.68, 109.33, 107.93, 112.71, 111.78, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94, 132.28], 'YTD': [36.9, 41.11, 48.72, 54.32, 48.66, 48.24, 48.29, 44.62, 45.46, 45.58, 47.98, 45.03, 47.18, 44.13, 58.95, 64.94, 65.27, 84.52, 108.15, 120.61, 108.17, 123.52, 107.93, 107.92, 127.86, 132.28], '6M': [36.35, 36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.48, 44.11, 45.61, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 124.92, 108.77, 119.84, 109.33, 110.27, 127.86, 132.28], '1Y': [22.55, 22.85, 23.44, 22.69, 23.49, 20.34, 20.19, 21.81, 25.31, 24.35, 24, 24.77, 24.9, 31.22, 35.94, 37.43, 35.63, 38.12, 41.53, 37.03, 37.88, 34.33, 35.83, 43.76, 40.78, 36.05, 36.35, 36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 43.63, 45.5, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 129.44, 108.77, 119.84, 109.33, 110.27, 127.86, 132.28] },
      velocityScore: { '1D': 2.4, '1W': -6.7, '1M': -9.4, '6M': null }, isNew: false,
      marketCap: '$665B', pe: null, revenueGrowth: 7, eps: -0.61, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 6.25, PSI: 5.02, XSD: 2.67, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 4.44, proScore: 3.33, coverage: 0.75,
      price: 200.04, weeklyPrices: [207.41, 204.65, 210.69, 208.65, 200.04], weeklyChange: -3.55, dayChange: -4.13, sortRank: 0, periodReturns: { '1M': -7.1, 'YTD': 7.3, '6M': 5.7, '1Y': 35.3 },
      priceHistory: { '1D': [208.65, 201.71, 203.35, 203.16, 202.88, 202.63, 201.09, 200.76, 201.4, 202.35, 202.44, 202.21, 202.15, 202.15, 202.51, 202.16, 201.74, 201.67, 201.21, 200.59, 200.9, 201.23, 200.62, 200.04], '1W': [207.41, 204.65, 210.69, 208.65, 200.04], '1M': [214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04], 'YTD': [186.5, 185.04, 183.14, 184.84, 192.51, 171.88, 190.05, 187.9, 184.89, 183.04, 186.03, 180.4, 178.68, 174.4, 182.08, 198.87, 202.5, 213.17, 196.5, 220.78, 222.32, 214.86, 222.82, 208.19, 212.45, 200.04], '6M': [189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 186.94, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 215.2, 225.32, 215.33, 224.36, 208.64, 212.45, 200.04], '1Y': [147.9, 153.3, 162.88, 171.37, 170.78, 179.27, 178.26, 183.16, 175.64, 181.77, 170.62, 177.33, 170.29, 176.97, 187.24, 189.11, 180.03, 181.16, 201.03, 198.69, 193.16, 181.36, 177.82, 179.59, 183.78, 170.94, 189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 225.32, 215.33, 224.36, 208.64, 212.45, 200.04] },
      velocityScore: { '1D': -3.5, '1W': 14.8, '1M': -5.1, '6M': null }, isNew: false,
      marketCap: '$4.8T', pe: 30.6, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.48,
      etfPresence: { SOXX: 6.94, PSI: 4.27, XSD: 2.1, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.58, proScore: 2.68, coverage: 0.75,
      price: 407.26, weeklyPrices: [416.00, 414.45, 434.46, 445.48, 407.26], weeklyChange: -2.1, dayChange: -8.58, sortRank: 0, periodReturns: { '1M': 2.6, 'YTD': 50.2, '6M': 47.2, '1Y': 73.3 },
      priceHistory: { '1D': [445.48, 416.6, 419.74, 418.13, 415.43, 412.52, 411.3, 410.14, 409.5, 410.9, 409.32, 409.35, 408.67, 409.12, 408.56, 407.01, 406.43, 405.95, 405.9, 403.76, 405.82, 406.52, 406.14, 407.26], '1W': [416, 414.45, 434.46, 445.48, 407.26], '1M': [419.94, 416.88, 419.01, 413.85, 402.69, 423.2, 437.67, 428.76, 401.39, 403.89, 404.62, 392.67, 412.13, 417.79, 427.58, 416, 414.45, 434.46, 445.48, 407.26], 'YTD': [271.2, 299.16, 297.99, 308.52, 318.7, 322.12, 337, 345.3, 354.35, 341.51, 319.22, 308.59, 322.03, 318.14, 346.21, 347.94, 381.42, 383.26, 404.77, 419.65, 418.58, 419.94, 423.2, 404.62, 427.58, 407.26], '6M': [276.73, 271.2, 299.16, 302.1, 305.6, 310.88, 320.45, 331.36, 355.03, 355.79, 315.81, 306.07, 309.43, 307.44, 327.36, 350.01, 381.05, 392.59, 397.02, 416.52, 417.49, 397.07, 402.69, 403.89, 427.58, 407.26], '1Y': [234.98, 240.64, 242.72, 240.61, 228.08, 231.11, 220.68, 232.04, 230.44, 255.63, 244.55, 247.21, 246.32, 248.61, 239.28, 237.93, 235.4, 246.37, 239.35, 229.38, 233.41, 230.13, 252.02, 278.24, 281.57, 271.04, 276.73, 271.2, 299.16, 302.1, 305.6, 310.88, 320.45, 337.1, 355.15, 352.41, 315.81, 306.07, 309.43, 307.44, 327.36, 350.01, 381.05, 392.59, 397.02, 422.73, 417.49, 397.07, 402.69, 403.89, 427.58, 407.26] },
      velocityScore: { '1D': -0.4, '1W': 14.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$198B', pe: 60.5, revenueGrowth: 37, eps: 6.73, grossMargin: 64, dividendYield: 0.99,
      etfPresence: { SOXX: 3.78, PSI: 4.66, XSD: 2.29, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.6% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 5.6, proScore: 2.8, coverage: 0.5,
      price: 585.88, weeklyPrices: [568.23, 592.92, 617.11, 640.18, 585.88], weeklyChange: 3.11, dayChange: -8.48, sortRank: 0, periodReturns: { '1M': 35.6, 'YTD': 128, '6M': 125.1, '1Y': 225.2 },
      priceHistory: { '1D': [640.18, 577.26, 592.5, 590.19, 586.11, 581.08, 580.66, 579.63, 580.53, 587, 586.5, 585.47, 587.76, 589.55, 589.81, 587.3, 586.37, 584.85, 583.18, 577.93, 582.87, 585.96, 583.16, 585.88], '1W': [568.23, 592.92, 617.11, 640.18, 585.88], '1M': [454.89, 448.25, 449.68, 450.06, 458.17, 490.05, 500.77, 501.7, 453.01, 492.17, 499.21, 497.01, 552.64, 567.25, 585.78, 568.23, 592.92, 617.11, 640.18, 585.88], 'YTD': [256.99, 281.64, 301.89, 318.79, 341.34, 303.99, 339.88, 369.83, 375.72, 357.76, 351.07, 349.47, 369.34, 341.79, 385.72, 394.26, 403.48, 381.11, 410.82, 431.2, 413.57, 454.89, 490.05, 499.21, 585.78, 585.88], '6M': [260.23, 256.99, 281.64, 319.08, 322.38, 322.32, 322.51, 328.39, 375.38, 372.3, 324.74, 341.53, 357.06, 337.17, 352.62, 395.73, 391.62, 404.86, 391.38, 435.44, 436.62, 432.16, 458.17, 492.17, 585.78, 585.88], '1Y': [180.18, 183.76, 195.39, 194.81, 187.01, 189.39, 179.15, 188.45, 162.22, 164.51, 156.25, 163.42, 178.13, 201.44, 217.74, 217.51, 218.19, 226, 227.64, 230.19, 228.67, 225.12, 242.46, 268.63, 275.15, 248.27, 260.23, 256.99, 281.64, 319.08, 322.38, 322.32, 322.51, 354.91, 373.55, 372.18, 324.74, 341.53, 357.06, 337.17, 352.62, 395.73, 391.62, 404.86, 391.38, 443.62, 436.62, 432.16, 458.17, 492.17, 585.78, 585.88] },
      velocityScore: { '1D': 1.1, '1W': 0, '1M': -5.1, '6M': null }, isNew: false,
      marketCap: '$465B', pe: 55.1, revenueGrowth: 11, eps: 10.63, grossMargin: 49, dividendYield: 0.33,
      etfPresence: { SOXX: 5, PSI: 6.19, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 5.4, proScore: 2.7, coverage: 0.5,
      price: 244.49, weeklyPrices: [237.33, 238.73, 259.56, 269.16, 244.49], weeklyChange: 3.02, dayChange: -9.17, sortRank: 0, periodReturns: { '1M': 29.5, 'YTD': 101.2, '6M': 92.7, '1Y': 175 },
      priceHistory: { '1D': [269.16, 245.1, 248.83, 246.46, 243.44, 242.56, 241.63, 242.45, 241.13, 243.85, 244.63, 245.46, 245.67, 245.77, 246.38, 244.7, 244.93, 243.76, 243.95, 242.23, 244.28, 244.88, 244.03, 244.49], '1W': [237.33, 238.73, 259.56, 269.16, 244.49], '1M': [201.14, 195.72, 192.76, 192.17, 194, 204.52, 212.51, 213.11, 192.92, 210.81, 213.94, 213.56, 241.16, 254.54, 256.42, 237.33, 238.73, 259.56, 269.16, 244.49], 'YTD': [121.51, 132.46, 143.45, 150, 168.47, 133.1, 147.95, 146.99, 152.43, 147.59, 146.5, 148.24, 154.38, 147.24, 167.23, 174.81, 181.21, 180.9, 173.29, 181.13, 175.65, 201.14, 204.52, 213.94, 256.42, 244.49], '6M': [126.88, 121.51, 132.46, 154.5, 151.28, 142.79, 144.29, 145.09, 149.6, 152.46, 134.46, 141.86, 149.87, 144.32, 154.01, 176.88, 180.53, 190, 171.33, 186.92, 180.43, 188.84, 194, 210.81, 256.42, 244.49], '1Y': [88.9, 89.89, 92.32, 93.35, 89.71, 92.5, 88.34, 93.55, 87.61, 88.81, 84.39, 93.26, 98.99, 106.87, 112.89, 106.26, 102.57, 114.74, 120.6, 119.35, 119.09, 112.31, 114.59, 121.18, 123.89, 117.2, 126.88, 121.51, 132.46, 154.5, 151.28, 142.79, 144.29, 146.41, 148.77, 153.49, 134.46, 141.86, 149.87, 144.32, 154.01, 176.88, 180.53, 190, 171.33, 184.52, 180.43, 188.84, 194, 210.81, 256.42, 244.49] },
      velocityScore: { '1D': 0.7, '1W': 11.6, '1M': 3.4, '6M': null }, isNew: false,
      marketCap: '$319B', pe: 69.3, revenueGrowth: 12, eps: 3.53, grossMargin: 61, dividendYield: 0.34,
      etfPresence: { SOXX: 4.92, PSI: 5.88, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 5.05, proScore: 2.52, coverage: 0.5,
      price: 371.33, weeklyPrices: [369.34, 374.18, 389.04, 409.54, 371.33], weeklyChange: 0.54, dayChange: -9.33, sortRank: 0, periodReturns: { '1M': 21.6, 'YTD': 116.9, '6M': 112, '1Y': 288.3 },
      priceHistory: { '1D': [409.54, 366.88, 376.08, 373.36, 369.95, 368.83, 367.67, 368.01, 367.74, 371.79, 372.49, 372.53, 372.86, 373.04, 373.46, 372.32, 371.51, 371.36, 370.55, 367.85, 371.05, 372.7, 369.5, 371.33], '1W': [369.34, 374.18, 389.04, 409.54, 371.33], '1M': [322.68, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04, 409.54, 371.33], 'YTD': [171.18, 200.96, 208.79, 220.7, 248.17, 213.31, 235.12, 237.39, 239.07, 222.99, 218.87, 224.71, 233.45, 213.66, 246.49, 265.16, 265.55, 251.23, 275.8, 289.24, 277.96, 322.68, 334.41, 327.16, 388.92, 371.33], '6M': [175.16, 171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 231.29, 244.92, 233.89, 199.33, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 258.57, 294.05, 284.72, 305.35, 317.12, 324.45, 388.92, 371.33], '1Y': [95.63, 96.81, 99.81, 100.37, 97.1, 99.09, 96.68, 105.28, 100.33, 103.63, 97.74, 107.36, 121.9, 128.32, 142.79, 142.54, 138.31, 145.04, 155.62, 155.78, 159.18, 143.24, 151.93, 159.75, 168.26, 154.98, 175.16, 171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 242.27, 231, 199.33, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 258.57, 296.05, 284.72, 305.35, 317.12, 324.45, 388.92, 371.33] },
      velocityScore: { '1D': 2, '1W': 8.2, '1M': -5.6, '6M': null }, isNew: false,
      marketCap: '$464B', pe: 70.3, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.25,
      etfPresence: { SOXX: 4.52, PSI: 5.58, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 4.15, proScore: 2.07, coverage: 0.5,
      price: 380.15, weeklyPrices: [376.71, 392.90, 411.35, 392.13, 380.15], weeklyChange: 0.91, dayChange: -3.06, sortRank: 0, periodReturns: { '1M': -8.2, 'YTD': 9.8, '6M': 8.8, '1Y': 44.1 },
      priceHistory: { '1D': [392.13, 383.3, 390.1, 388.83, 385.57, 383.05, 380.62, 379.51, 380.05, 381.69, 382.14, 383.23, 383.36, 384.64, 384.52, 382.77, 382.02, 382.36, 381.76, 380.59, 381.04, 382.25, 380.95, 380.15], '1W': [376.71, 392.9, 411.35, 392.13, 380.15], '1M': [422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15], 'YTD': [346.1, 332.48, 339.89, 325.49, 330.73, 310.51, 342.76, 333.99, 321.7, 317.53, 341.57, 315.93, 318.81, 309.51, 350.63, 396.72, 422.65, 399.83, 427.36, 419.3, 420.71, 422.01, 481.57, 392.16, 393.94, 380.15], '6M': [349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 331.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 430, 425.19, 414.14, 459.97, 396.6, 393.94, 380.15], '1Y': [263.77, 264.74, 277.9, 280.81, 283.69, 302.62, 292.93, 312.83, 294.91, 298.01, 302.39, 369.57, 346.17, 339.31, 333.39, 345.5, 344.13, 342.66, 372.97, 351.94, 351.96, 340.5, 385.03, 380.61, 412.97, 326.02, 349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 425.19, 414.14, 459.97, 396.6, 393.94, 380.15] },
      velocityScore: { '1D': -6.8, '1W': 15.6, '1M': -44.9, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 63.4, revenueGrowth: 48, eps: 6, grossMargin: 76, dividendYield: 0.66,
      etfPresence: { SOXX: 6.17, PSI: false, XSD: 2.13, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 3.87, proScore: 1.94, coverage: 0.5,
      price: 279.04, weeklyPrices: [278.67, 289.54, 310.58, 307.86, 279.04], weeklyChange: 0.13, dayChange: -9.36, sortRank: 0, periodReturns: { '1M': 42.1, 'YTD': 228.4, '6M': 218.2, '1Y': 271 },
      priceHistory: { '1D': [307.86, 279.48, 289.88, 288.69, 284.95, 281.48, 281.07, 281.23, 280.04, 282.7, 282.03, 282.48, 280.78, 280.67, 282.19, 280.61, 278.92, 279.03, 278.85, 276.9, 279.02, 280.13, 277.8, 279.04], '1W': [278.67, 289.54, 310.58, 307.86, 279.04], '1M': [208.26, 198.7, 204.83, 205, 219.43, 290.79, 301.65, 316.43, 263.47, 288.85, 266.88, 252.59, 280.71, 279.7, 308.88, 278.67, 289.54, 310.58, 307.86, 279.04], 'YTD': [84.98, 83.45, 81.21, 83.1, 81.34, 74.21, 81.34, 79.61, 79.29, 78.09, 90.44, 87.62, 98.45, 99.05, 114.45, 134.6, 157.32, 153.23, 168.75, 164.5, 168.93, 208.26, 290.79, 266.88, 308.88, 279.04], '6M': [87.68, 84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.23, 79.48, 81.69, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 163.66, 170.13, 176.89, 196.33, 219.43, 288.85, 308.88, 279.04], '1Y': [75.21, 76.24, 72.26, 70.85, 73.27, 81.74, 76.63, 77.81, 72.07, 74.26, 62.31, 67.1, 70.98, 80.09, 83.89, 92.5, 86.22, 84.26, 88.46, 87.59, 89.33, 78.68, 83.43, 100.2, 92.47, 81.7, 87.68, 84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 77.79, 80.86, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 163.66, 170.84, 176.89, 196.33, 219.43, 288.85, 308.88, 279.04] },
      velocityScore: { '1D': -2.5, '1W': -41.9, '1M': -42.8, '6M': null }, isNew: false,
      marketCap: '$244B', pe: 95.6, revenueGrowth: 28, eps: 2.92, grossMargin: 52, dividendYield: 0.08,
      etfPresence: { SOXX: 5.28, PSI: false, XSD: 2.47, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 3.1, proScore: 1.55, coverage: 0.5,
      price: 304.36, weeklyPrices: [305.71, 301.88, 322.86, 332.28, 304.36], weeklyChange: -0.44, dayChange: -8.4, sortRank: 0, periodReturns: { '1M': -1.6, 'YTD': 75.4, '6M': 71.9, '1Y': 47.9 },
      priceHistory: { '1D': [332.28, 309.2, 310.26, 310.2, 306.36, 305.65, 304.57, 303.7, 303.77, 305.45, 304.54, 303.99, 303.99, 304.37, 304.21, 302.93, 302.57, 301.92, 302.41, 301.52, 302.8, 303.79, 302.62, 304.36], '1W': [305.71, 301.88, 322.86, 332.28, 304.36], '1M': [324.89, 317.45, 315.95, 305.68, 293.2, 308.12, 308.59, 305.37, 285.06, 290.9, 288.63, 282.01, 297.1, 301.12, 313.34, 305.71, 301.88, 322.86, 332.28, 304.36], 'YTD': [173.49, 188.45, 193.45, 194.99, 218.97, 223.98, 226.56, 218.05, 212.63, 202.39, 198.67, 190.78, 196.77, 194.14, 208.9, 216.29, 236.31, 265, 281, 295.17, 300.6, 324.89, 308.12, 288.63, 313.34, 304.36], '6M': [177.08, 173.49, 188.45, 189.12, 193.31, 215.55, 221.44, 223, 219.73, 212.11, 193.23, 190.78, 187.19, 190.33, 199.42, 216.71, 233.7, 269.5, 280.89, 287.8, 302.73, 309.21, 293.2, 290.9, 313.34, 304.36], '1Y': [205.81, 210.45, 216.39, 216.64, 186.25, 189.52, 185.4, 192.97, 195.94, 205.98, 195.74, 184.01, 180.3, 184.44, 180.39, 181.6, 173.94, 180.84, 166.91, 159.36, 159.73, 157.32, 161.77, 182.6, 181.67, 174.49, 177.08, 173.49, 188.45, 189.12, 193.31, 215.55, 221.44, 226.16, 219.86, 209.82, 193.23, 190.78, 187.19, 190.33, 199.42, 216.71, 233.7, 269.5, 280.89, 297.76, 302.73, 309.21, 293.2, 290.9, 313.34, 304.36] },
      velocityScore: { '1D': 0.6, '1W': 11.5, '1M': -50.8, '6M': null }, isNew: false,
      marketCap: '$277B', pe: 52, revenueGrowth: 19, eps: 5.85, grossMargin: 57, dividendYield: 1.71,
      etfPresence: { SOXX: 3.82, PSI: false, XSD: 2.38, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.91, proScore: 1.45, coverage: 0.5,
      price: 299.94, weeklyPrices: [302.89, 298.20, 313.27, 323.24, 299.94], weeklyChange: -0.97, dayChange: -7.21, sortRank: 0, periodReturns: { '1M': -5.2, 'YTD': 38.2, '6M': 32.7, '1Y': 37.3 },
      priceHistory: { '1D': [323.24, 304.53, 306.29, 305.25, 302.29, 299.19, 299.58, 299.11, 299.53, 300.95, 300.02, 300.15, 299.6, 299.89, 299.92, 298.3, 298.84, 298.3, 298.2, 296.61, 297.68, 298.92, 297.32, 299.94], '1W': [302.89, 298.2, 313.27, 323.24, 299.94], '1M': [332.67, 329.24, 330.28, 321.35, 311.38, 323.62, 321.88, 322.22, 295.96, 301.14, 297.41, 285.56, 302.55, 304.86, 315.88, 302.89, 298.2, 313.27, 323.24, 299.94], 'YTD': [217.06, 237.89, 240.81, 236.75, 233.5, 222.13, 249.75, 232.11, 232.23, 216.37, 199.87, 192.69, 197.61, 196.86, 204.27, 209.39, 225.75, 230.39, 292.35, 294.23, 291.68, 332.67, 323.62, 297.41, 315.88, 299.94], '6M': [225.98, 217.06, 237.89, 238.6, 232.48, 226.14, 224.32, 242.19, 232.27, 227.01, 201.74, 190.86, 191.37, 191.66, 197.08, 208, 221.34, 236.87, 290.76, 294.75, 291.5, 316.47, 311.38, 301.14, 315.88, 299.94], '1Y': [218.51, 221.21, 230.42, 220.58, 224.71, 220.94, 208.47, 220.05, 229.27, 237.82, 228.2, 219.28, 221.89, 227.66, 224.91, 225.64, 216.11, 222.34, 212.96, 204.42, 202.86, 188.59, 191.02, 227.56, 230.78, 223.23, 225.98, 217.06, 237.89, 238.6, 232.48, 226.14, 224.32, 244.43, 231.16, 224.76, 201.74, 190.86, 191.37, 191.66, 197.08, 208, 221.34, 236.87, 290.76, 305.99, 291.5, 316.47, 311.38, 301.14, 315.88, 299.94] },
      velocityScore: { '1D': 0.7, '1W': 7.4, '1M': -30.3, '6M': null }, isNew: false,
      marketCap: '$76B', pe: 28.6, revenueGrowth: 12, eps: 10.47, grossMargin: 56, dividendYield: 1.25,
      etfPresence: { SOXX: 3.53, PSI: false, XSD: 2.29, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 2.73, proScore: 1.37, coverage: 0.5,
      price: 204.13, weeklyPrices: [214.07, 212.97, 226.11, 221.90, 204.13], weeklyChange: -4.64, dayChange: -8.01, sortRank: 0, periodReturns: { '1M': -14.3, 'YTD': 19.3, '6M': 16.8, '1Y': 31.1 },
      priceHistory: { '1D': [221.9, 202.55, 207.96, 206.68, 203.75, 199.61, 199.46, 198.95, 201.29, 203.91, 202.69, 203.03, 201.6, 202.17, 203.03, 201.97, 201.93, 202.26, 203.21, 202.05, 203.65, 204.75, 204.15, 204.13], '1W': [214.07, 212.97, 226.11, 221.9, 204.13], '1M': [248.82, 233.4, 243.29, 251.02, 228.99, 240.84, 250.01, 242.57, 215.94, 217.77, 205.42, 191.2, 202.96, 211.72, 220.81, 214.07, 212.97, 226.11, 221.9, 204.13], 'YTD': [171.05, 181.87, 164.54, 157.8, 152.22, 136.3, 141.04, 141.27, 145.59, 139.51, 134.12, 130.47, 130.35, 128.78, 127.51, 133.05, 136.07, 150, 186.55, 210.31, 203.64, 248.82, 240.84, 205.42, 220.81, 204.13], '6M': [174.75, 171.05, 181.87, 161.39, 155.82, 151.59, 137.34, 138.47, 142.88, 142.36, 135.69, 129.82, 129.9, 127.11, 125.73, 131.24, 137.52, 150.26, 168.38, 219.09, 201.49, 238.16, 228.99, 217.77, 220.81, 204.13], '1Y': [155.71, 159.4, 159.35, 154.07, 159.88, 159.06, 146.71, 153.73, 156.25, 159.17, 157.28, 158.95, 165.26, 173.55, 166.49, 167.77, 161.74, 168.83, 181.03, 172.84, 173.98, 165.06, 163.3, 175.07, 182.21, 172.34, 174.75, 171.05, 181.87, 161.39, 155.82, 151.59, 137.34, 140.7, 140.41, 141.03, 135.69, 129.82, 129.9, 127.11, 125.73, 131.24, 137.52, 150.26, 168.38, 237.53, 201.49, 238.16, 228.99, 217.77, 220.81, 204.13] },
      velocityScore: { '1D': -3.5, '1W': -6.2, '1M': -40.7, '6M': null }, isNew: false,
      marketCap: '$215B', pe: 21.9, revenueGrowth: -4, eps: 9.3, grossMargin: 55, dividendYield: 1.66,
      etfPresence: { SOXX: 3.11, PSI: false, XSD: 2.35, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 2.69, proScore: 1.35, coverage: 0.5,
      price: 397.02, weeklyPrices: [361.71, 374.68, 417.07, 439.66, 397.02], weeklyChange: 9.76, dayChange: -9.7, sortRank: 0, periodReturns: { '1M': 29.4, 'YTD': 138.7, '6M': 135.2, '1Y': 355 },
      priceHistory: { '1D': [439.66, 406.57, 415.65, 414, 408.79, 404.69, 401.58, 400.63, 401.49, 404.41, 404.54, 403.12, 400.88, 402.46, 403.58, 401.74, 400.16, 397.3, 398.47, 394.12, 398.19, 400.08, 398.64, 397.02], '1W': [361.71, 374.68, 417.07, 439.66, 397.02], '1M': [318.72, 325.33, 349.17, 342.85, 320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 361.71, 374.68, 417.07, 439.66, 397.02], 'YTD': [166.36, 156.73, 172.14, 176.35, 160.46, 142.82, 143.71, 132.62, 124.67, 113.77, 124.71, 126.34, 120.33, 109.6, 125.46, 172.09, 194.06, 183.31, 215.69, 204.42, 215.58, 318.72, 355.76, 341.7, 389.2, 397.02], '6M': [168.83, 166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 126.58, 129.68, 118.83, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 199.79, 232.68, 306.88, 320.09, 346.33, 389.2, 397.02], '1Y': [87.26, 88.66, 99.86, 91.94, 119.48, 128.87, 135.54, 192, 171.06, 178.56, 176.61, 230.37, 249.38, 205.27, 194.5, 219.36, 161.55, 157.51, 168.25, 179.31, 167.55, 139.52, 144.78, 152.5, 164.32, 140.24, 168.83, 166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 232.68, 306.88, 320.09, 346.33, 389.2, 397.02] },
      velocityScore: { '1D': 3.8, '1W': -22.4, '1M': -36.6, '6M': null }, isNew: false,
      marketCap: '$68B', pe: 266.5, revenueGrowth: 93, eps: 1.49, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.69, PSI: false, XSD: 2.69, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.64, proScore: 1.32, coverage: 0.5,
      price: 1423.76, weeklyPrices: [1498.77, 1448.21, 1563.70, 1537.88, 1423.76], weeklyChange: -5, dayChange: -7.42, sortRank: 0, periodReturns: { '1M': -10.4, 'YTD': 57.1, '6M': 50.9, '1Y': 98.7 },
      priceHistory: { '1D': [1537.88, 1453, 1473.39, 1466.11, 1449.39, 1438.13, 1425.12, 1421.86, 1422.03, 1430.97, 1424.59, 1424.17, 1422.45, 1420.85, 1419.66, 1410.8, 1407.02, 1410.33, 1411.13, 1413.78, 1422.98, 1427.28, 1422.94, 1423.76], '1W': [1498.77, 1448.21, 1563.7, 1537.88, 1423.76], '1M': [1662.98, 1620.17, 1633.17, 1566.21, 1542.39, 1624.99, 1689.89, 1652.6, 1481.05, 1559.18, 1531.98, 1473.04, 1589.55, 1577.32, 1652.29, 1498.77, 1448.21, 1563.7, 1537.88, 1423.76], 'YTD': [906.36, 959.09, 983.6, 1076.67, 1183.15, 1155.99, 1196.73, 1175.22, 1180.13, 1099.02, 1071.09, 1075.29, 1118.66, 1093.35, 1312.94, 1353, 1522.04, 1504.08, 1588.12, 1599.52, 1486.33, 1662.98, 1624.99, 1531.98, 1652.29, 1423.76], '6M': [943.55, 906.36, 959.09, 1009.54, 1063.74, 1124.15, 1229.82, 1155.93, 1204.1, 1142.74, 1023.16, 1052.59, 1068.85, 1053.01, 1180.03, 1372.23, 1490.86, 1587.57, 1573.3, 1600.84, 1550.02, 1589.81, 1542.39, 1559.18, 1652.29, 1423.76], '1Y': [716.58, 746.97, 751.14, 714.03, 720.01, 730.54, 802.78, 840.56, 844.8, 850.64, 827.56, 855.18, 877.66, 908.45, 915.87, 980.9, 968.25, 1028.67, 1086.36, 957.87, 954.71, 856.96, 908.61, 958.02, 979.02, 912.25, 943.55, 906.36, 959.09, 1009.54, 1063.74, 1124.15, 1229.82, 1171.47, 1190.06, 1142.58, 1023.16, 1052.59, 1068.85, 1053.01, 1180.03, 1372.23, 1490.86, 1587.57, 1573.3, 1661.1, 1550.02, 1589.81, 1542.39, 1559.18, 1652.29, 1423.76] },
      velocityScore: { '1D': -3.6, '1W': -2.9, '1M': -37.1, '6M': null }, isNew: false,
      marketCap: '$70B', pe: 101.8, revenueGrowth: 26, eps: 13.99, grossMargin: 55, dividendYield: 0.52,
      etfPresence: { SOXX: 3.18, PSI: false, XSD: 2.11, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.39, proScore: 1.19, coverage: 0.5,
      price: 272, weeklyPrices: [239.18, 249.33, 271.83, 302.52, 272.00], weeklyChange: 13.72, dayChange: -10.09, sortRank: 0, periodReturns: { '1M': 24.5, 'YTD': 89, '6M': 84, '1Y': 195.9 },
      priceHistory: { '1D': [302.52, 269.4, 275.96, 273.36, 272, 268.2, 266.76, 267.65, 269.08, 274.5, 270.84, 271.46, 270.29, 270.75, 270.88, 269.74, 268.7, 269.03, 270.34, 267.64, 269.79, 270.18, 271, 272], '1W': [239.18, 249.33, 271.83, 302.52, 272], '1M': [221.64, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 217.5, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83, 302.52, 272], 'YTD': [143.89, 141.59, 156.84, 135.1, 129.47, 98.06, 128.4, 130.66, 114.48, 102.54, 115.91, 101.72, 103.91, 93.87, 110.21, 168.35, 189.49, 165.92, 193.57, 198.57, 156.27, 221.64, 229, 234.32, 259.41, 272], '6M': [147.81, 143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.78, 124.06, 112.27, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 188.51, 172.17, 218.41, 226.1, 222.27, 259.41, 272], '1Y': [91.92, 87.59, 97.59, 101.19, 98.41, 116.01, 110.29, 125.38, 106.3, 120.1, 124.77, 163.96, 164.44, 149.38, 144.91, 148.87, 129.75, 144.17, 162.18, 164.23, 158.5, 139.56, 154.18, 189.19, 157.98, 134.13, 147.81, 143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.05, 114.22, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 210.22, 172.17, 218.41, 226.1, 222.27, 259.41, 272] },
      velocityScore: { '1D': 9.2, '1W': -7.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$51B', pe: 108.4, revenueGrowth: 157, eps: 2.51, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 2.19, PSI: false, XSD: 2.58, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.38, proScore: 1.19, coverage: 0.5,
      price: 93.26, weeklyPrices: [95.63, 94.11, 99.77, 102.71, 93.26], weeklyChange: -2.48, dayChange: -9.2, sortRank: 0, periodReturns: { '1M': -0.2, 'YTD': 46.4, '6M': 42.7, '1Y': 32.4 },
      priceHistory: { '1D': [102.71, 95.86, 97.2, 96.39, 95.77, 94.89, 94.64, 94.19, 94.19, 94.68, 94.49, 94.12, 94, 94.07, 93.97, 93.48, 93.31, 93.28, 93.32, 92.68, 92.87, 93.14, 92.57, 93.26], '1W': [95.63, 94.11, 99.77, 102.71, 93.26], '1M': [98.05, 96.85, 96.04, 94.65, 91.52, 96.96, 96.55, 96.3, 88.34, 91.37, 91.47, 87.91, 92.94, 95.24, 100.32, 95.63, 94.11, 99.77, 102.71, 93.26], 'YTD': [63.72, 73.53, 74.68, 75.47, 79.36, 78.04, 80.75, 77.16, 74.97, 69.9, 65.79, 64.71, 65.16, 64.61, 70.73, 74.49, 82.48, 84.26, 98.48, 97.7, 92.76, 98.05, 96.96, 91.47, 100.32, 93.26], '6M': [65.35, 63.72, 73.53, 74.45, 74.71, 75.92, 76.01, 78.92, 77.73, 74.64, 64.77, 61.94, 62.97, 62, 67.22, 73.55, 80.39, 86.84, 95.3, 99.09, 93.85, 93.43, 91.52, 91.37, 100.32, 93.26], '1Y': [70.43, 71.68, 74.68, 74.43, 70.25, 70.29, 67.13, 64.5, 64.71, 67.62, 63.28, 64.74, 65.78, 65.85, 64.11, 66.92, 64.6, 67.52, 63.64, 59.5, 54.71, 50.87, 51.83, 63.61, 67.9, 63.99, 65.35, 63.72, 73.53, 74.45, 74.71, 75.92, 76.01, 78.56, 76.6, 74.31, 64.77, 61.94, 62.97, 62, 67.22, 73.55, 80.39, 86.84, 95.3, 99.03, 93.85, 93.43, 91.52, 91.37, 100.32, 93.26] },
      velocityScore: { '1D': 0.8, '1W': 2.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$51B', pe: 423.9, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 1.77,
      etfPresence: { SOXX: 2.39, PSI: false, XSD: 2.37, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 2.33, proScore: 1.16, coverage: 0.5,
      price: 117.06, weeklyPrices: [118.25, 112.92, 121.62, 131.55, 117.06], weeklyChange: -1.01, dayChange: -11.01, sortRank: 0, periodReturns: { '1M': 0.7, 'YTD': 116.2, '6M': 110.2, '1Y': 115.9 },
      priceHistory: { '1D': [131.55, 120.69, 122.11, 121.4, 119.46, 118.48, 118.13, 117.74, 117.71, 118.97, 118.95, 118.87, 118.73, 118.82, 118.62, 117.53, 117.94, 117.61, 117.33, 116.46, 117.22, 117.73, 117.36, 117.06], '1W': [118.25, 112.92, 121.62, 131.55, 117.06], '1M': [127, 124.89, 123.77, 120.62, 120.92, 128.64, 133.93, 131.82, 117.26, 120.9, 117, 110.17, 115.96, 116.79, 125.9, 118.25, 112.92, 121.62, 131.55, 117.06], 'YTD': [54.15, 60.89, 60.58, 63.07, 62.2, 63.1, 71.18, 68.09, 68.16, 62.53, 59.24, 60.46, 63.1, 61.92, 68.38, 72.43, 88.99, 93.3, 102.67, 104.11, 109.43, 127, 128.64, 117, 125.9, 117.06], '6M': [55.69, 54.15, 60.89, 60.28, 61.98, 59.89, 65.2, 70.63, 69.11, 66.48, 56.87, 58.55, 59.26, 58.35, 63.49, 71.02, 85.56, 98.04, 102.04, 103.2, 113.11, 116.2, 120.92, 120.9, 125.9, 117.06], '1Y': [54.21, 53.6, 57.77, 59.52, 59.61, 58.05, 47.24, 50.01, 49.77, 50.99, 47.79, 48.13, 49.8, 50.94, 48.35, 50.88, 49.54, 55.08, 51.8, 48.28, 48.43, 45.56, 48.31, 57.15, 55.1, 53.33, 55.69, 54.15, 60.89, 60.28, 61.98, 59.89, 65.2, 72.21, 69.47, 66.48, 56.87, 58.55, 59.26, 58.35, 63.49, 71.02, 85.56, 98.04, 102.04, 107.24, 113.11, 116.2, 120.92, 120.9, 125.9, 117.06] },
      velocityScore: { '1D': 5.5, '1W': -12.8, '1M': -38, '6M': null }, isNew: false,
      marketCap: '$46B', pe: 86.7, revenueGrowth: 5, eps: 1.35, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 2.24, PSI: false, XSD: 2.41, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 2, avgWeight: 1.73, proScore: 0.86, coverage: 0.5,
      price: 372.15, weeklyPrices: [368.32, 367.11, 391.41, 396.26, 372.15], weeklyChange: 1.04, dayChange: -6.08, sortRank: 0, periodReturns: { '1M': -3.6, 'YTD': 117.3, '6M': 111.1, '1Y': 166.1 },
      priceHistory: { '1D': [396.26, 372.73, 379.17, 378.67, 374.39, 371.85, 372.14, 367.89, 369.57, 372.75, 373.13, 372.89, 372.79, 372.6, 372.64, 370, 371.07, 368.98, 368.34, 365.92, 369.77, 370.9, 367.58, 372.15], '1W': [368.32, 367.11, 391.41, 396.26, 372.15], '1M': [409.68, 400.66, 391.09, 364.64, 353.79, 382.35, 390.34, 382.74, 345.4, 361.86, 358.72, 354.4, 374.76, 379.87, 384.77, 368.32, 367.11, 391.41, 396.26, 372.15], 'YTD': [171.28, 167.66, 215.01, 224.29, 227.73, 227.8, 236.94, 242.56, 247.11, 239, 222.55, 218.89, 245.04, 222.07, 247, 261.16, 277, 265.61, 303.57, 362.76, 356.25, 409.68, 382.35, 358.72, 384.77, 372.15], '6M': [176.28, 171.28, 167.66, 218.93, 219.26, 219.06, 235.87, 238.99, 243.59, 248.12, 207.51, 217.8, 218.96, 225.44, 233.04, 263.63, 281.08, 279.44, 291.72, 359.88, 375.6, 385.98, 353.79, 361.86, 384.77, 372.15], '1Y': [139.84, 137.38, 139.85, 137.76, 137.19, 140.02, 137.28, 125.45, 121, 128.33, 130.17, 131.7, 131.87, 126.66, 126.56, 133.19, 131.54, 139.41, 147.88, 144.13, 169.98, 158.22, 165.88, 183.46, 186.23, 168.31, 176.28, 171.28, 167.66, 218.93, 219.26, 219.06, 235.87, 244.16, 245.53, 258.54, 207.51, 217.8, 218.96, 225.44, 233.04, 263.63, 281.08, 279.44, 291.72, 365.88, 375.6, 385.98, 353.79, 361.86, 384.77, 372.15] },
      velocityScore: { '1D': -1.1, '1W': -6.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$28B', pe: 159, revenueGrowth: 23, eps: 2.34, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: 1.2, PSI: false, XSD: 2.26, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RMBS', name: 'RAMBUS INC', easyScore: 2, avgWeight: 1.36, proScore: 0.68, coverage: 0.5,
      price: 128.21, weeklyPrices: [132.48, 130.10, 141.17, 140.35, 128.21], weeklyChange: -3.22, dayChange: -8.65, sortRank: 0, periodReturns: { '1M': -10.3, 'YTD': 39.5, '6M': 36.1, '1Y': 105.8 },
      priceHistory: { '1D': [140.35, 130.21, 133.23, 132.25, 130.95, 129.68, 129.82, 129.05, 129.43, 130.43, 129.82, 129.24, 128.89, 129.44, 129.74, 128.61, 128.72, 128.42, 128.33, 127.42, 129.01, 129.24, 128.69, 128.21], '1W': [132.48, 130.1, 141.17, 140.35, 128.21], '1M': [157.23, 148.66, 148.02, 145.46, 147.48, 166.78, 170.66, 169.35, 145.31, 152.03, 146.84, 138.12, 144.47, 146.56, 143.29, 132.48, 130.1, 141.17, 140.35, 128.21], 'YTD': [91.89, 91.34, 100.62, 124.77, 121.6, 98.1, 99.38, 104.13, 102.17, 92.04, 92.53, 93.32, 95.93, 86.03, 101.43, 120.02, 131.55, 111.27, 118, 130.28, 123.76, 157.23, 166.78, 146.84, 143.29, 128.21], '6M': [94.19, 91.89, 91.34, 103.07, 115.31, 113.83, 107.1, 95.8, 102.64, 99.66, 88.12, 94.01, 91.7, 89.73, 92.22, 113.16, 126.87, 141.31, 111.5, 129.25, 127.05, 142.98, 147.48, 152.03, 143.29, 128.21], '1Y': [62.3, 64.14, 64.79, 66.79, 65.95, 75.09, 73.79, 76.44, 69.78, 75.03, 73.67, 77.11, 97.52, 100.73, 103.14, 99.43, 94.85, 97.51, 103.72, 100.32, 104.93, 87.7, 92.45, 98.03, 106.84, 90.61, 94.19, 91.89, 91.34, 103.07, 115.31, 113.83, 107.1, 101.95, 95.27, 98.88, 88.12, 94.01, 91.7, 89.73, 92.22, 113.16, 126.87, 141.31, 111.5, 134.51, 127.05, 142.98, 147.48, 152.03, 143.29, 128.21] },
      velocityScore: { '1D': -2.9, '1W': -6.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$14B', pe: 60.8, revenueGrowth: 8, eps: 2.11, grossMargin: 80, dividendYield: null,
      etfPresence: { SOXX: 0.66, PSI: false, XSD: 2.05, DRAM: false },
      tonyNote: 'RAMBUS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 10, avgWeight: 5.63, proScore: 3.31, coverage: 0.588,
      price: 200.04, weeklyPrices: [207.41, 204.65, 210.69, 208.65, 200.04], weeklyChange: -3.55, dayChange: -4.13, sortRank: 0, periodReturns: { '1M': -7.1, 'YTD': 7.3, '6M': 5.7, '1Y': 35.3 },
      priceHistory: { '1D': [208.65, 201.71, 203.35, 203.16, 202.88, 202.63, 201.09, 200.76, 201.4, 202.35, 202.44, 202.21, 202.15, 202.15, 202.51, 202.16, 201.74, 201.67, 201.21, 200.59, 200.9, 201.23, 200.62, 200.04], '1W': [207.41, 204.65, 210.69, 208.65, 200.04], '1M': [214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04], 'YTD': [186.5, 185.04, 183.14, 184.84, 192.51, 171.88, 190.05, 187.9, 184.89, 183.04, 186.03, 180.4, 178.68, 174.4, 182.08, 198.87, 202.5, 213.17, 196.5, 220.78, 222.32, 214.86, 222.82, 208.19, 212.45, 200.04], '6M': [189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 186.94, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 215.2, 225.32, 215.33, 224.36, 208.64, 212.45, 200.04], '1Y': [147.9, 153.3, 162.88, 171.37, 170.78, 179.27, 178.26, 183.16, 175.64, 181.77, 170.62, 177.33, 170.29, 176.97, 187.24, 189.11, 180.03, 181.16, 201.03, 198.69, 193.16, 181.36, 177.82, 179.59, 183.78, 170.94, 189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 225.32, 215.33, 224.36, 208.64, 212.45, 200.04] },
      velocityScore: { '1D': 0.3, '1W': 45.8, '1M': -31.5, '6M': null }, isNew: false,
      marketCap: '$4.8T', pe: 30.6, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.48,
      etfPresence: { PTF: 4.07, WCLD: false, IGV: false, FDTX: 4.62, GTEK: false, ARKK: 1.68, MARS: false, FRWD: 8.23, BCTK: 5.77, FWD: 1.91, CBSE: false, FCUS: false, WGMI: 1.94, CNEQ: 13.68, SGRT: 6.44, SPMO: 7.94, XMMO: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 5.92, proScore: 3.13, coverage: 0.529,
      price: 1051.77, weeklyPrices: [1020.76, 1043.19, 1133.99, 1211.38, 1051.77], weeklyChange: 3.04, dayChange: -13.18, sortRank: 0, periodReturns: { '1M': 40, 'YTD': 268.5, '6M': 280.7, '1Y': 722.3 },
      priceHistory: { '1D': [1211.38, 1069, 1101.16, 1119.47, 1092.35, 1083.86, 1082.11, 1075.75, 1077.68, 1091.87, 1089.06, 1083.66, 1078.91, 1076.83, 1076.45, 1069, 1058.69, 1056.24, 1053.9, 1041.25, 1050.66, 1050.72, 1050, 1051.77], '1W': [1020.76, 1043.19, 1133.99, 1211.38, 1051.77], '1M': [895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77], 'YTD': [285.41, 327.02, 333.35, 397.58, 435.79, 382.89, 410.34, 417.35, 415.56, 400.77, 418.69, 461.73, 382.09, 337.84, 406.73, 456.23, 487.48, 504.29, 640.2, 766.58, 681.54, 895.88, 1064.1, 935.89, 1087.99, 1051.77], '6M': [276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 746.81, 724.66, 751, 1035.5, 949.28, 1087.99, 1051.77], '1Y': [127.91, 120.89, 122.24, 116.43, 109.83, 114.74, 109.06, 127.75, 122.05, 116.5, 118.72, 140, 159.99, 161.71, 182.15, 196.54, 187.06, 202.29, 221.91, 218.03, 241.11, 228.5, 224.53, 234.16, 263.71, 225.52, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 724.66, 751, 1035.5, 949.28, 1087.99, 1051.77] },
      velocityScore: { '1D': 5, '1W': 37.3, '1M': 20.4, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 49.6, revenueGrowth: 196, eps: 21.2, grossMargin: 58, dividendYield: 0.05,
      etfPresence: { PTF: 5.54, WCLD: false, IGV: false, FDTX: 9.36, GTEK: false, ARKK: false, MARS: false, FRWD: 5.05, BCTK: 4.85, FWD: 1.54, CBSE: 2.45, FCUS: 4.64, WGMI: false, CNEQ: false, SGRT: 8.08, SPMO: 11.78, XMMO: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 7, avgWeight: 5.7, proScore: 2.35, coverage: 0.412,
      price: 670.75, weeklyPrices: [681.08, 712.13, 746.23, 732.62, 670.75], weeklyChange: -1.52, dayChange: -8.45, sortRank: 0, periodReturns: { '1M': 38.5, 'YTD': 289.4, '6M': 276.3, '1Y': 980.6 },
      priceHistory: { '1D': [732.62, 662.65, 664.92, 677.38, 661.2, 660, 661.64, 662.44, 666.46, 673.29, 677.25, 676.31, 673.05, 674.83, 671.9, 671.03, 668.95, 668.75, 669.17, 665.62, 669.46, 672.34, 670.75, 670.75], '1W': [681.08, 712.13, 746.23, 732.62, 670.75], '1M': [524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75], 'YTD': [172.27, 187.68, 215, 243.29, 278.41, 260.19, 273.74, 284.67, 282.25, 261.3, 268.81, 304.9, 296.14, 270.49, 338.78, 365, 389.1, 390.99, 465.26, 488.74, 458.68, 524.65, 563.1, 517.72, 653.53, 670.75], '6M': [178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 284.1, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 480, 482.02, 484.28, 546.2, 526.93, 653.53, 670.75], '1Y': [62.07, 63.84, 64.64, 66.53, 69.32, 71.43, 75.84, 75.91, 75.86, 79.71, 86, 95.02, 100.94, 109.69, 130.59, 121.18, 113.13, 121.41, 124.92, 152.18, 169.99, 152.86, 155.41, 155.59, 181.95, 166.26, 178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 482.02, 484.28, 546.2, 526.93, 653.53, 670.75] },
      velocityScore: { '1D': 0.4, '1W': 66.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$231B', pe: 40.2, revenueGrowth: 46, eps: 16.7, grossMargin: 45, dividendYield: 0.08,
      etfPresence: { PTF: 5.92, WCLD: false, IGV: false, FDTX: 4, GTEK: false, ARKK: false, MARS: false, FRWD: 5.92, BCTK: false, FWD: false, CBSE: false, FCUS: 5.52, WGMI: false, CNEQ: 5.99, SGRT: 10.21, SPMO: 2.33, XMMO: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 7, avgWeight: 4.38, proScore: 1.8, coverage: 0.412,
      price: 436.39, weeklyPrices: [425.83, 432.15, 462.12, 467.67, 436.39], weeklyChange: 2.48, dayChange: -6.69, sortRank: 0, periodReturns: { '1M': 7.9, 'YTD': 43.6, '6M': 47, '1Y': 98.3 },
      priceHistory: { '1D': [467.67, 441, 446.31, 446.04, 442.83, 440.28, 439.93, 438.83, 438.89, 442.66, 442.7, 441.47, 442.37, 442.34, 443.43, 442.24, 440.67, 439.89, 438.54, 436.35, 438.56, 439.61, 438.42, 436.39], '1W': [425.83, 432.15, 462.12, 467.67, 436.39], '1M': [412.32, 422.73, 424.86, 418.45, 435.63, 446.69, 436.69, 444.92, 415.17, 426.8, 427.92, 408.75, 421.07, 423.93, 441.4, 425.83, 432.15, 462.12, 467.67, 436.39], 'YTD': [303.89, 318.01, 327.11, 327.37, 339.55, 330.73, 374.09, 360.39, 376.81, 357.44, 354.56, 339.57, 347.75, 337.95, 365.9, 375.1, 387.44, 392.34, 394.41, 397.28, 395.95, 412.32, 446.69, 427.92, 441.4, 436.39], '6M': [296.95, 303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 368.1, 370.54, 374.58, 338.89, 338.31, 329.24, 326.74, 341.76, 369.57, 366.24, 404.98, 401.61, 411.68, 404.35, 404.52, 435.63, 426.8, 441.4, 436.39], '1Y': [220.09, 224.68, 231.84, 237.56, 240.33, 242.91, 232.47, 244.29, 232.7, 238.72, 231.39, 260.44, 262.79, 280.71, 288.47, 304.52, 295.94, 294.51, 301.53, 294.05, 291.17, 277.91, 284.68, 295.45, 310.14, 276.96, 296.95, 303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 370.04, 369.11, 338.89, 338.31, 329.24, 326.74, 341.76, 369.57, 366.24, 404.98, 401.61, 404.54, 404.35, 404.52, 435.63, 426.8, 441.4, 436.39] },
      velocityScore: { '1D': 0.6, '1W': -4.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 37.6, revenueGrowth: 35, eps: 11.6, grossMargin: 62, dividendYield: 0.81,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6, GTEK: false, ARKK: 1.02, MARS: false, FRWD: 5.94, BCTK: 8.44, FWD: false, CBSE: 2.64, FCUS: false, WGMI: 0.6, CNEQ: 6.01, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 7, avgWeight: 4.06, proScore: 1.67, coverage: 0.412,
      price: 519.85, weeklyPrices: [507.29, 512.48, 537.37, 551.63, 519.85], weeklyChange: 2.48, dayChange: -5.76, sortRank: 0, periodReturns: { '1M': 11.2, 'YTD': 142.7, '6M': 141.9, '1Y': 275.5 },
      priceHistory: { '1D': [551.63, 512.7, 525.25, 523.59, 523.53, 520.34, 519.24, 517.91, 518.73, 525.67, 526, 524.86, 521.1, 522.72, 524.05, 521.27, 520.13, 519.47, 519.08, 514.71, 518.53, 519.64, 517.92, 519.85], '1W': [507.29, 512.48, 537.37, 551.63, 519.85], '1M': [503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85], 'YTD': [214.16, 204.68, 223.6, 253.73, 252.18, 192.5, 213.58, 203.37, 203.68, 202.07, 204.83, 199.46, 220.27, 203.43, 231.82, 258.12, 303.46, 323.21, 355.26, 448.29, 420.99, 503.89, 521.54, 475.51, 547.26, 519.85], '6M': [214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 205.94, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 455.19, 424.1, 467.51, 510.13, 490.33, 547.26, 519.85], '1Y': [138.43, 136.11, 138.41, 160.08, 158.65, 179.51, 174.31, 174.95, 166.55, 166.62, 162.13, 159.54, 159.16, 160.88, 164.01, 235.56, 218.09, 238.03, 258.01, 250.05, 237.52, 230.29, 206.13, 217.6, 221.42, 198.11, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 424.1, 467.51, 510.13, 490.33, 547.26, 519.85] },
      velocityScore: { '1D': 1.2, '1W': 4.4, '1M': -48.9, '6M': null }, isNew: false,
      marketCap: '$848B', pe: 174.4, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.84, MARS: false, FRWD: 7.08, BCTK: 3.33, FWD: 2.12, CBSE: false, FCUS: 3.36, WGMI: false, CNEQ: false, SGRT: 3.64, SPMO: 4.05, XMMO: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'SPCX', name: 'SPACE EXPLORATION TECHN-CL A', easyScore: 6, avgWeight: 7.18, proScore: 2.53, coverage: 0.353,
      price: 156.11, weeklyPrices: [156.11], weeklyChange: 0.98, dayChange: 0.98, sortRank: 0, periodReturns: { '1M': 0, 'YTD': 0, '6M': 0, '1Y': 0 },
      priceHistory: undefined,
      velocityScore: { '1D': -8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.1T', pe: null, revenueGrowth: 15, eps: -0.66, grossMargin: 49, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.09, MARS: 21.46, FRWD: 2.66, BCTK: 9.67, FWD: 1.96, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.24, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'SPACE EXPLORATION TECHN-CL A appears in 6 of 17 Broad Tech ETFs (35% coverage) with average weight 7.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 6, avgWeight: 4.13, proScore: 1.46, coverage: 0.353,
      price: 380.15, weeklyPrices: [376.71, 392.90, 411.35, 392.13, 380.15], weeklyChange: 0.91, dayChange: -3.06, sortRank: 0, periodReturns: { '1M': -8.2, 'YTD': 9.8, '6M': 8.8, '1Y': 44.1 },
      priceHistory: { '1D': [392.13, 383.3, 390.1, 388.83, 385.57, 383.05, 380.62, 379.51, 380.05, 381.69, 382.14, 383.23, 383.36, 384.64, 384.52, 382.77, 382.02, 382.36, 381.76, 380.59, 381.04, 382.25, 380.95, 380.15], '1W': [376.71, 392.9, 411.35, 392.13, 380.15], '1M': [422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15], 'YTD': [346.1, 332.48, 339.89, 325.49, 330.73, 310.51, 342.76, 333.99, 321.7, 317.53, 341.57, 315.93, 318.81, 309.51, 350.63, 396.72, 422.65, 399.83, 427.36, 419.3, 420.71, 422.01, 481.57, 392.16, 393.94, 380.15], '6M': [349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 331.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 430, 425.19, 414.14, 459.97, 396.6, 393.94, 380.15], '1Y': [263.77, 264.74, 277.9, 280.81, 283.69, 302.62, 292.93, 312.83, 294.91, 298.01, 302.39, 369.57, 346.17, 339.31, 333.39, 345.5, 344.13, 342.66, 372.97, 351.94, 351.96, 340.5, 385.03, 380.61, 412.97, 326.02, 349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 425.19, 414.14, 459.97, 396.6, 393.94, 380.15] },
      velocityScore: { '1D': -7.6, '1W': 15.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 63.4, revenueGrowth: 48, eps: 6, grossMargin: 76, dividendYield: 0.66,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.79, GTEK: false, ARKK: 1.13, MARS: false, FRWD: 5.09, BCTK: 6.84, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.35, SGRT: false, SPMO: 6.56, XMMO: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 6, avgWeight: 3.39, proScore: 1.2, coverage: 0.353,
      price: 234.11, weeklyPrices: [246.00, 237.50, 244.39, 232.79, 234.11], weeklyChange: -4.83, dayChange: 0.57, sortRank: 0, periodReturns: { '1M': -12.1, 'YTD': 1.4, '6M': 0.8, '1Y': 10 },
      priceHistory: { '1D': [232.79, 234.71, 234.83, 236.35, 236.13, 235.97, 234.58, 233.74, 233.95, 234.6, 234.4, 234.76, 234.74, 234.6, 233.97, 234.73, 235.28, 235.7, 234.69, 234.51, 234.51, 234.53, 235.49, 234.11], '1W': [246, 237.5, 244.39, 232.79, 234.11], '1M': [265.29, 271.85, 274, 270.64, 261.26, 256.52, 250.02, 253.79, 246.03, 245.22, 244.19, 238, 241.51, 238.55, 246.02, 246, 237.5, 244.39, 232.79, 234.11], 'YTD': [230.82, 246.29, 236.65, 234.34, 241.73, 222.69, 204.08, 204.86, 207.92, 216.82, 212.65, 209.87, 211.71, 208.27, 221.25, 248.5, 255.36, 259.7, 273.55, 265.82, 264.86, 265.29, 256.52, 244.19, 246.02, 234.11], '6M': [232.14, 230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 199.6, 210.11, 210, 213.21, 207.67, 205.37, 199.34, 212.79, 239.89, 248.28, 261.12, 272.05, 272.68, 264.14, 266.32, 261.26, 245.22, 246.02, 234.11], '1Y': [212.77, 220.46, 222.54, 223.19, 228.29, 230.19, 213.75, 221.47, 228.01, 228.71, 225.99, 230.33, 231.62, 220.21, 220.63, 225.22, 216.39, 222.03, 229.25, 249.32, 249.1, 222.55, 229.67, 232.38, 231.78, 221.27, 232.14, 230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 198.79, 205.27, 208.39, 213.21, 207.67, 205.37, 199.34, 212.79, 239.89, 248.28, 261.12, 272.05, 268.99, 264.14, 266.32, 261.26, 245.22, 246.02, 234.11] },
      velocityScore: { '1D': 37.9, '1W': 2.6, '1M': -74.5, '6M': null }, isNew: false,
      marketCap: '$2.5T', pe: 31.8, revenueGrowth: 17, eps: 7.36, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.01, GTEK: false, ARKK: 2.19, MARS: false, FRWD: 2.8, BCTK: 4.26, FWD: 1.46, CBSE: false, FCUS: false, WGMI: false, CNEQ: 5.61, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 5, avgWeight: 5.02, proScore: 1.48, coverage: 0.294,
      price: 1038.59, weeklyPrices: [1031.34, 1066.07, 1070.23, 1094.04, 1038.59], weeklyChange: 0.7, dayChange: -5.07, sortRank: 0, periodReturns: { '1M': 27.8, 'YTD': 277.1, '6M': 267.3, '1Y': 661.9 },
      priceHistory: { '1D': [1094.04, 998, 1010.92, 1025.72, 1006.25, 1007.59, 1010.87, 1015.14, 1016.82, 1020.38, 1030.05, 1026.02, 1024.66, 1028.47, 1025.78, 1026.61, 1024, 1022.29, 1023, 1022.75, 1032.43, 1036.88, 1035.23, 1038.59], '1W': [1031.34, 1066.07, 1070.23, 1094.04, 1038.59], '1M': [845.76, 870.66, 880.72, 879.8, 921.26, 926.61, 940.69, 925.99, 847.47, 876.77, 846.01, 815.99, 868.09, 931.04, 1018.8, 1031.34, 1066.07, 1070.23, 1094.04, 1038.59], 'YTD': [275.39, 284.47, 312.28, 346.53, 446.57, 405.45, 407.25, 408.97, 409.67, 375.01, 385.97, 406.77, 413.22, 391.76, 496.3, 519.6, 579.88, 579.03, 771.01, 808.8, 740.84, 845.76, 926.61, 846.01, 1018.8, 1038.59], '6M': [282.8, 275.39, 284.47, 320.32, 346.1, 407.69, 429.32, 431.17, 411.11, 407.84, 352.8, 383.71, 411.23, 380.07, 453.3, 513.28, 539.75, 595.86, 738.54, 782.64, 795.47, 812.73, 921.26, 876.77, 1018.8, 1038.59], '1Y': [136.31, 145.04, 142.01, 147.12, 152.76, 147.42, 151.74, 155.59, 157.93, 165.24, 176.32, 193.04, 213.36, 223.7, 256.84, 224.35, 211.63, 214.57, 223, 250.38, 288, 253.86, 261.89, 258.67, 298.92, 277.65, 282.8, 275.39, 284.47, 320.32, 346.1, 407.69, 429.32, 425.99, 407.4, 379.52, 352.8, 383.71, 411.23, 380.07, 453.3, 513.28, 539.75, 595.86, 738.54, 834.01, 795.47, 812.73, 921.26, 876.77, 1018.8, 1038.59] },
      velocityScore: { '1D': 0, '1W': -10.3, '1M': -45.8, '6M': null }, isNew: false,
      marketCap: '$235B', pe: 98.9, revenueGrowth: 44, eps: 10.5, grossMargin: 42, dividendYield: 0.27,
      etfPresence: { PTF: 5.39, WCLD: false, IGV: false, FDTX: 4.04, GTEK: false, ARKK: false, MARS: false, FRWD: 8.6, BCTK: false, FWD: false, CBSE: false, FCUS: 4.94, WGMI: false, CNEQ: false, SGRT: false, SPMO: 2.15, XMMO: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'LRCX', name: 'LRCX', easyScore: 5, avgWeight: 4.55, proScore: 1.34, coverage: 0.294,
      price: 371.33, weeklyPrices: [369.34, 374.18, 389.04, 409.54, 371.33], weeklyChange: 0.54, dayChange: -9.33, sortRank: 0, periodReturns: { '1M': 21.6, 'YTD': 116.9, '6M': 112, '1Y': 288.3 },
      priceHistory: { '1D': [409.54, 366.88, 376.08, 373.36, 369.95, 368.83, 367.67, 368.01, 367.74, 371.79, 372.49, 372.53, 372.86, 373.04, 373.46, 372.32, 371.51, 371.36, 370.55, 367.85, 371.05, 372.7, 369.5, 371.33], '1W': [369.34, 374.18, 389.04, 409.54, 371.33], '1M': [322.68, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04, 409.54, 371.33], 'YTD': [171.18, 200.96, 208.79, 220.7, 248.17, 213.31, 235.12, 237.39, 239.07, 222.99, 218.87, 224.71, 233.45, 213.66, 246.49, 265.16, 265.55, 251.23, 275.8, 289.24, 277.96, 322.68, 334.41, 327.16, 388.92, 371.33], '6M': [175.16, 171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 231.29, 244.92, 233.89, 199.33, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 258.57, 294.05, 284.72, 305.35, 317.12, 324.45, 388.92, 371.33], '1Y': [95.63, 96.81, 99.81, 100.37, 97.1, 99.09, 96.68, 105.28, 100.33, 103.63, 97.74, 107.36, 121.9, 128.32, 142.79, 142.54, 138.31, 145.04, 155.62, 155.78, 159.18, 143.24, 151.93, 159.75, 168.26, 154.98, 175.16, 171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 242.27, 231, 199.33, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 258.57, 296.05, 284.72, 305.35, 317.12, 324.45, 388.92, 371.33] },
      velocityScore: { '1D': 0, '1W': 3.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$464B', pe: 70.3, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.25,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.9, BCTK: 7.74, FWD: 1.97, CBSE: 3.05, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 4.07, XMMO: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 5, avgWeight: 4.01, proScore: 1.18, coverage: 0.294,
      price: 346.08, weeklyPrices: [371.10, 362.10, 367.46, 348.78, 346.08], weeklyChange: -6.74, dayChange: -0.77, sortRank: 0, periodReturns: { '1M': -8.8, 'YTD': 10.3, '6M': 9.6, '1Y': 106.3 },
      priceHistory: { '1D': [348.78, 346.8, 347.55, 347.28, 346.91, 347.56, 346.39, 344.93, 345.41, 345.55, 345.3, 346.85, 347.2, 347.12, 347.23, 347.14, 346.14, 345.85, 345.87, 345.84, 346.29, 346.38, 347.35, 346.08], '1W': [371.1, 362.1, 367.46, 348.78, 346.08], '1M': [384.84, 384.83, 386.12, 376.43, 372.58, 358.39, 355.68, 369.27, 365.76, 361.17, 362.29, 353.32, 356.56, 358.16, 367.11, 371.1, 362.1, 367.46, 348.78, 346.08], 'YTD': [313.8, 326.01, 336.31, 330.84, 338.66, 331.33, 311.33, 303.56, 307.15, 303.45, 308.42, 306.3, 289.59, 286.86, 314.74, 334.47, 337.73, 347.5, 384.27, 383.82, 393.11, 384.84, 358.39, 362.29, 367.11, 346.08], '6M': [315.68, 313.8, 326.01, 333.16, 328.43, 338.53, 323.1, 309.37, 314.9, 311.43, 298.3, 301.46, 298.79, 273.76, 297.66, 319.21, 335.4, 348.52, 379.64, 397.05, 393.32, 379.38, 372.58, 361.17, 367.11, 346.08], '1Y': [167.74, 176.91, 177.66, 183.77, 191.51, 197.44, 195.32, 204.16, 202.49, 207.95, 231.1, 239.56, 249.85, 247.83, 245.54, 245.46, 246.19, 251.34, 268.43, 278.06, 291.74, 284.96, 323.64, 320.62, 321, 298.06, 315.68, 313.8, 326.01, 333.16, 328.43, 338.53, 323.1, 306.02, 311.69, 306.36, 298.3, 301.46, 298.79, 273.76, 297.66, 319.21, 335.4, 348.52, 379.64, 386.77, 393.32, 379.38, 372.58, 361.17, 367.11, 346.08] },
      velocityScore: { '1D': -1.7, '1W': 37.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.2T', pe: 26.4, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.66, GTEK: false, ARKK: 1.78, MARS: false, FRWD: false, BCTK: 5.53, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 5.6, SGRT: false, SPMO: 3.5, XMMO: false },
      tonyNote: 'Alphabet Inc Class C appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 4.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, avgWeight: 5.23, proScore: 1.23, coverage: 0.235,
      price: 373.94, weeklyPrices: [393.83, 378.91, 379.40, 367.34, 373.94], weeklyChange: -5.05, dayChange: 1.8, sortRank: 0, periodReturns: { '1M': -10.7, 'YTD': -22.7, '6M': -23.2, '1Y': -23.7 },
      priceHistory: { '1D': [367.34, 374.83, 374.64, 375.21, 376.04, 375.44, 374.52, 372.96, 373.16, 372.36, 372.25, 372.98, 372.87, 372.56, 373.02, 374.14, 373.79, 373.81, 373.21, 372.86, 373.28, 373.95, 375.11, 373.94], '1W': [393.83, 378.91, 379.4, 367.34, 373.94], '1M': [416.03, 412.67, 426.99, 450.24, 460.52, 441.31, 427.34, 428.05, 416.67, 411.74, 403.41, 397.36, 390.34, 390.74, 399.76, 393.83, 378.91, 379.4, 367.34, 373.94], 'YTD': [483.62, 478.11, 459.38, 451.14, 433.5, 393.67, 404.37, 398.46, 401.72, 405.2, 404.88, 391.79, 371.04, 370.17, 374.33, 411.22, 432.92, 429.25, 411.38, 407.77, 423.54, 416.03, 441.31, 403.41, 399.76, 373.94], '6M': [486.85, 483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.84, 397.23, 392.74, 408.96, 395.55, 381.87, 356.77, 372.88, 384.37, 418.07, 424.82, 413.62, 415.12, 421.92, 418.57, 460.52, 411.74, 399.76, 373.94], '1Y': [490.11, 492.05, 503.51, 505.62, 505.87, 513.24, 527.75, 529.24, 509.77, 502.04, 505.35, 500.37, 510.02, 510.15, 519.71, 524.85, 513.57, 517.66, 542.07, 514.33, 508.68, 493.79, 476.99, 477.73, 478.56, 476.12, 486.85, 483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 384.47, 398.55, 408.96, 395.55, 381.87, 356.77, 372.88, 384.37, 418.07, 424.82, 413.62, 412.66, 421.92, 418.57, 460.52, 411.74, 399.76, 373.94] },
      velocityScore: { '1D': -0.8, '1W': 8.8, '1M': -78.8, '6M': null }, isNew: false,
      marketCap: '$2.8T', pe: 22.3, revenueGrowth: 18, eps: 16.79, grossMargin: 68, dividendYield: 0.99,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.22, FDTX: 3.79, GTEK: false, ARKK: false, MARS: false, FRWD: 2.78, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 6.12, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 4, avgWeight: 4.84, proScore: 1.14, coverage: 0.235,
      price: 1963.6, weeklyPrices: [1991.55, 1958.80, 2184.75, 2273.73, 1963.60], weeklyChange: -1.4, dayChange: -13.64, sortRank: 0, periodReturns: { '1M': 32.8, 'YTD': 727.2, '6M': 701.8, '1Y': 4047.9 },
      priceHistory: { '1D': [2273.73, 1965, 1993.11, 2040.01, 1998.99, 1995.46, 1990.76, 1987.71, 1987.5, 2003.18, 2013.35, 1992, 1987.09, 1980.32, 1986.08, 1980.19, 1956.28, 1957.63, 1957.02, 1957.11, 1962.34, 1976.82, 1955.54, 1963.6], '1W': [1991.55, 1958.8, 2184.75, 2273.73, 1963.6], '1M': [1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6], 'YTD': [237.38, 334.54, 387.81, 503.44, 539.3, 576.2, 599.34, 621.09, 651.9, 599.06, 655.43, 753.69, 677.86, 635.34, 780.9, 891.72, 979.07, 1002.35, 1406.32, 1452.02, 1333.01, 1589.55, 1716.36, 1646.54, 2107.86, 1963.6], '6M': [244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 630.29, 649.97, 635.36, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1562.34, 1407.61, 1478.69, 1761.43, 1642, 2107.86, 1963.6], '1Y': [47.34, 44.96, 46.2, 41.36, 43, 43.39, 41.93, 46.83, 44.58, 47.35, 53.01, 73.92, 93.97, 99.83, 121.12, 131.88, 127.29, 149.29, 175.53, 194.57, 271.58, 244.93, 220.5, 194.38, 232.86, 206.83, 244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1407.61, 1478.69, 1761.43, 1642, 2107.86, 1963.6] },
      velocityScore: { '1D': 14, '1W': -2.6, '1M': -56.5, '6M': null }, isNew: false,
      marketCap: '$291B', pe: 66.9, revenueGrowth: 251, eps: 29.33, grossMargin: 56, dividendYield: null,
      etfPresence: { PTF: 9.5, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.57, CBSE: false, FCUS: 5.3, WGMI: false, CNEQ: false, SGRT: false, SPMO: 2.98, XMMO: false },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks', easyScore: 4, avgWeight: 4.12, proScore: 0.97, coverage: 0.235,
      price: 290.92, weeklyPrices: [279.90, 282.13, 287.78, 286.40, 290.92], weeklyChange: 3.94, dayChange: 1.58, sortRank: 0, periodReturns: { '1M': 11.6, 'YTD': 57.9, '6M': 54.6, '1Y': 44.2 },
      priceHistory: { '1D': [286.4, 289, 290.12, 289.39, 290.02, 290.45, 290.38, 288.85, 289.46, 289.87, 291.13, 291.55, 291.47, 290.95, 290.88, 290.35, 289.6, 289.44, 288.83, 288.94, 289.61, 289.17, 289.77, 290.92], '1W': [279.9, 282.13, 287.78, 286.4, 290.92], '1M': [256.75, 248.47, 257.77, 281.69, 300.48, 297.18, 280.43, 279.25, 272.05, 266.33, 260.52, 263.22, 279.53, 279.62, 284.54, 279.9, 282.13, 287.78, 286.4, 290.92], 'YTD': [184.2, 190.8, 190.93, 182.27, 176.2, 154.77, 165.3, 150.99, 149.4, 158.56, 164.93, 168.91, 153.22, 160.32, 173.78, 164.11, 181.2, 180.99, 183.98, 215.6, 247.55, 256.75, 297.18, 260.52, 284.54, 290.92], '6M': [188.12, 184.2, 190.8, 187.73, 180.18, 176.97, 159.32, 162.81, 148.7, 148.92, 165.05, 167.02, 162.95, 147.02, 161.95, 162.51, 169.56, 182.9, 184.56, 207.88, 242.83, 260.58, 300.48, 266.33, 284.54, 290.92], '1Y': [201.69, 197.58, 206.06, 192.59, 199.22, 183.03, 169.09, 175.4, 181.56, 184.23, 191.53, 197.33, 203.12, 200.7, 206.8, 217.79, 207.56, 214.4, 221.38, 214.52, 218.27, 201, 186.27, 193.63, 192.96, 183.44, 188.12, 184.2, 190.8, 187.73, 180.18, 176.97, 159.32, 166.95, 144.14, 150.15, 165.05, 167.02, 162.95, 147.02, 161.95, 162.51, 169.56, 182.9, 184.56, 213.66, 242.83, 260.58, 300.48, 266.33, 284.54, 290.92] },
      velocityScore: { '1D': 7.8, '1W': -19.8, '1M': -64.6, '6M': null }, isNew: false,
      marketCap: '$237B', pe: 253, revenueGrowth: 31, eps: 1.15, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.78, IGV: 9.01, FDTX: 3.67, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.03, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'LITE', name: 'Lumentum Holdings Inc', easyScore: 4, avgWeight: 3.77, proScore: 0.89, coverage: 0.235,
      price: 827.92, weeklyPrices: [875.36, 869.98, 850.00, 893.93, 827.92], weeklyChange: -5.42, dayChange: -7.38, sortRank: 0, periodReturns: { '1M': -12.6, 'YTD': 124.6, '6M': 113.7, '1Y': 801.8 },
      priceHistory: { '1D': [893.93, 821.69, 846.8, 851.58, 839.36, 831.9, 828.55, 825, 824, 833.7, 835.99, 832.56, 830.21, 830.05, 832.8, 828.4, 824, 821.41, 820.69, 815.36, 820.04, 821.88, 822.2, 827.92], '1W': [875.36, 869.98, 850, 893.93, 827.92], '1M': [910.81, 902.31, 860.62, 854.96, 905, 1029.15, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93, 827.92], 'YTD': [368.59, 348.26, 331.62, 354.49, 381.44, 504.42, 574.11, 635.64, 677, 680.8, 672, 700.81, 777.17, 702.76, 896.02, 824.01, 873.6, 791.37, 994.56, 992.37, 884.98, 910.81, 1029.15, 821.76, 957.24, 827.92], '6M': [387.41, 368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 583.46, 667.77, 700.91, 558.44, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 903.8, 970.7, 946.9, 905, 895.4, 957.24, 827.92], '1Y': [91.81, 91.49, 90.44, 99.63, 102.13, 109.85, 108.15, 119.66, 117.96, 124.62, 134.12, 164.88, 163.34, 152.75, 171.4, 163.09, 156.78, 162.95, 198.39, 188.36, 252.47, 247.43, 291.27, 302.98, 366, 320.25, 387.41, 368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 674.73, 783.25, 558.44, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 1053.09, 970.7, 946.9, 905, 895.4, 957.24, 827.92] },
      velocityScore: { '1D': -1.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$64B', pe: 144.7, revenueGrowth: 90, eps: 5.72, grossMargin: 41, dividendYield: null,
      etfPresence: { PTF: 3.6, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 1.4, FWD: false, CBSE: false, FCUS: 2.31, WGMI: false, CNEQ: false, SGRT: 7.77, SPMO: false, XMMO: false },
      tonyNote: 'Lumentum Holdings Inc appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 4, avgWeight: 3.65, proScore: 0.86, coverage: 0.235,
      price: 116.7, weeklyPrices: [133.25, 130.63, 128.47, 119.50, 116.70], weeklyChange: -12.42, dayChange: -2.34, sortRank: 0, periodReturns: { '1M': -14.7, 'YTD': -34.3, '6M': -39.9, '1Y': -18.5 },
      priceHistory: { '1D': [119.5, 119.85, 120, 118.96, 119.14, 119.15, 119.09, 118.33, 118.53, 118.9, 118.74, 119.11, 118.93, 118.81, 118.82, 118.42, 118.13, 118.04, 117.33, 116.74, 116.65, 116.44, 116.7, 116.7], '1W': [133.25, 130.63, 128.47, 119.5, 116.7], '1M': [136.6, 132.51, 143.34, 156.54, 160.65, 152.17, 142.2, 141.7, 135.53, 136.47, 132.07, 130.21, 131.08, 127.99, 134.71, 133.25, 130.63, 128.47, 119.5, 116.7], 'YTD': [177.75, 176.86, 178.4, 165.9, 151.86, 130.01, 135.68, 134.89, 135.94, 153.19, 151.6, 152.77, 154.96, 146.28, 140.76, 142.15, 152.62, 141.18, 135.91, 136, 135.14, 136.6, 152.17, 132.07, 134.71, 116.7], '6M': [194.13, 177.75, 176.86, 177.07, 169.6, 146.59, 135.9, 129.13, 135.24, 137.19, 157.16, 150.95, 150.68, 143.06, 147.93, 132.37, 145.89, 143.1, 146.03, 137.8, 133.99, 136.88, 160.65, 136.47, 134.71, 116.7], '1Y': [143.23, 130.68, 143.13, 150.91, 154.63, 158.61, 173.27, 186.97, 157.75, 160.87, 154.9, 166.74, 168.33, 179.56, 184.95, 183.56, 179.74, 181.51, 189.6, 190.74, 190.96, 167.33, 163.55, 176.08, 187.91, 177.29, 194.13, 177.75, 176.86, 177.07, 169.6, 146.59, 135.9, 131.41, 130.6, 145.17, 157.16, 150.95, 150.68, 143.06, 147.93, 132.37, 145.89, 143.1, 146.03, 136.89, 133.99, 136.88, 160.65, 136.47, 134.71, 116.7] },
      velocityScore: { '1D': -3.4, '1W': -11.3, '1M': -70.2, '6M': null }, isNew: false,
      marketCap: '$280B', pe: 132.6, revenueGrowth: 85, eps: 0.88, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.16, FDTX: 2.87, GTEK: false, ARKK: 2.48, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.07, XMMO: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'SHOP', name: 'Shopify Inc Registered Shs -A- Subord Vtg', easyScore: 4, avgWeight: 2.81, proScore: 0.66, coverage: 0.235,
      price: 107.68, weeklyPrices: [113.23, 108.09, 108.85, 107.98, 107.68], weeklyChange: -4.9, dayChange: -0.28, sortRank: 0, periodReturns: { '1M': 4.5, 'YTD': -33.1, '6M': -36.5, '1Y': -5.9 },
      priceHistory: { '1D': [107.98, 108.6, 107, 108, 107.68, 108.01, 108.53, 108.84, 108.58, 108.89, 108.98, 109.49, 109.53, 109.5, 109.33, 109.1, 108.42, 108.1, 108.02, 107.54, 107.82, 107.82, 107.61, 107.68], '1W': [113.23, 108.09, 108.85, 107.98, 107.68], '1M': [104.9, 106.6, 115.03, 118.71, 124.12, 117.01, 112.94, 116.04, 109.54, 110.78, 110.42, 108.2, 110.47, 108.24, 112.49, 113.23, 108.09, 108.85, 107.98, 107.68], 'YTD': [160.97, 168.28, 157.51, 137.64, 143.64, 111.24, 118.71, 123.8, 125.94, 129.65, 129.52, 123.75, 118.42, 118.62, 120.1, 127.41, 131.96, 122.05, 107.63, 99.84, 102.39, 104.9, 117.01, 110.42, 112.49, 107.68], '6M': [169.53, 160.97, 168.28, 157.99, 137.89, 131.23, 112.05, 110.66, 126.2, 120.73, 130.2, 122.96, 116.78, 111.85, 118.8, 114.97, 135.14, 124.23, 127.55, 110.41, 100.28, 103, 124.12, 110.78, 112.49, 107.68], '1Y': [114.42, 112.67, 114.32, 120, 122.21, 123.01, 127, 149.3, 139.25, 140.85, 140.22, 142.2, 147.87, 148.83, 149.57, 166.43, 152.88, 162.64, 178.96, 160.94, 158.94, 140.45, 157.37, 160, 168.42, 161.73, 169.53, 160.97, 168.28, 157.99, 137.89, 131.23, 112.05, 112.7, 117.28, 119.38, 130.2, 122.96, 116.78, 111.85, 118.8, 114.97, 135.14, 124.23, 127.55, 102.54, 100.28, 103, 124.12, 110.78, 112.49, 107.68] },
      velocityScore: { '1D': 0, '1W': -25.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$140B', pe: 105.6, revenueGrowth: 34, eps: 1.02, grossMargin: 48, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.89, GTEK: false, ARKK: 4.05, MARS: false, FRWD: 1.79, BCTK: 2.51, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Shopify Inc Registered Shs -A- Subord Vtg appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 2.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC-CL A', easyScore: 4, avgWeight: 2.5, proScore: 0.59, coverage: 0.235,
      price: 346.13, weeklyPrices: [373.25, 363.79, 368.03, 349.68, 346.13], weeklyChange: -7.27, dayChange: -0.98, sortRank: 0, periodReturns: { '1M': -9.6, 'YTD': 10.6, '6M': 10.1, '1Y': 107.5 },
      priceHistory: { '1D': [349.56, 347.31, 347.97, 347.88, 347.48, 348.17, 346.94, 345.43, 346.02, 346.19, 345.92, 347.54, 347.87, 347.63, 347.81, 347.7, 346.73, 346.47, 346.47, 346.45, 346.86, 346.93, 347.75, 346.13], '1W': [373.25, 363.79, 368.03, 349.68, 346.13], '1M': [388.88, 388.83, 390.13, 380.34, 376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68, 369.35, 373.25, 363.79, 368.03, 349.68, 346.13], 'YTD': [313, 325.44, 335.84, 330.54, 338.25, 331.25, 310.96, 302.85, 307.38, 303.13, 308.7, 307.69, 290.93, 287.56, 317.32, 337.12, 339.32, 349.78, 388.43, 387.35, 396.94, 388.88, 361.85, 364.26, 369.35, 346.13], '6M': [314.35, 313, 325.44, 332.78, 327.93, 338, 322.86, 309, 314.98, 311.76, 298.52, 302.28, 301, 274.34, 299.99, 321.31, 337.42, 350.34, 383.25, 400.8, 396.78, 382.97, 376.37, 363.31, 369.35, 346.13], '1Y': [166.77, 175.84, 176.62, 182.97, 190.23, 196.53, 194.67, 203.34, 201.57, 207.14, 230.66, 239.17, 249.53, 247.14, 244.9, 244.62, 245.45, 250.46, 267.47, 277.54, 291.31, 284.28, 323.44, 319.63, 320.21, 296.72, 314.35, 313, 325.44, 332.78, 327.93, 338, 322.86, 305.72, 311.49, 306.52, 298.52, 302.28, 301, 274.34, 299.99, 321.31, 337.42, 350.34, 383.25, 388.64, 396.78, 382.97, 376.37, 363.31, 369.35, 346.13] },
      velocityScore: { '1D': 0, '1W': null, '1M': -88.2, '6M': null }, isNew: false,
      marketCap: '$4.2T', pe: 26.4, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 0.49, MARS: false, FRWD: 3.19, BCTK: false, FWD: 1.93, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 4.38, XMMO: false },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'KLAC', name: 'KLAC', easyScore: 4, avgWeight: 2.06, proScore: 0.48, coverage: 0.235,
      price: 244.49, weeklyPrices: [237.33, 238.73, 259.56, 269.16, 244.49], weeklyChange: 3.02, dayChange: -9.17, sortRank: 0, periodReturns: { '1M': 29.5, 'YTD': 101.2, '6M': 92.7, '1Y': 175 },
      priceHistory: { '1D': [269.16, 245.1, 248.83, 246.46, 243.44, 242.56, 241.63, 242.45, 241.13, 243.85, 244.63, 245.46, 245.67, 245.77, 246.38, 244.7, 244.93, 243.76, 243.95, 242.23, 244.28, 244.88, 244.03, 244.49], '1W': [237.33, 238.73, 259.56, 269.16, 244.49], '1M': [201.14, 195.72, 192.76, 192.17, 194, 204.52, 212.51, 213.11, 192.92, 210.81, 213.94, 213.56, 241.16, 254.54, 256.42, 237.33, 238.73, 259.56, 269.16, 244.49], 'YTD': [121.51, 132.46, 143.45, 150, 168.47, 133.1, 147.95, 146.99, 152.43, 147.59, 146.5, 148.24, 154.38, 147.24, 167.23, 174.81, 181.21, 180.9, 173.29, 181.13, 175.65, 201.14, 204.52, 213.94, 256.42, 244.49], '6M': [126.88, 121.51, 132.46, 154.5, 151.28, 142.79, 144.29, 145.09, 149.6, 152.46, 134.46, 141.86, 149.87, 144.32, 154.01, 176.88, 180.53, 190, 171.33, 186.92, 180.43, 188.84, 194, 210.81, 256.42, 244.49], '1Y': [88.9, 89.89, 92.32, 93.35, 89.71, 92.5, 88.34, 93.55, 87.61, 88.81, 84.39, 93.26, 98.99, 106.87, 112.89, 106.26, 102.57, 114.74, 120.6, 119.35, 119.09, 112.31, 114.59, 121.18, 123.89, 117.2, 126.88, 121.51, 132.46, 154.5, 151.28, 142.79, 144.29, 146.41, 148.77, 153.49, 134.46, 141.86, 149.87, 144.32, 154.01, 176.88, 180.53, 190, 171.33, 184.52, 180.43, 188.84, 194, 210.81, 256.42, 244.49] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$319B', pe: 69.3, revenueGrowth: 12, eps: 3.53, grossMargin: 61, dividendYield: 0.34,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: 1.75, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.78, CBSE: 2.94, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.76, XMMO: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 3, avgWeight: 5.4, proScore: 0.95, coverage: 0.176,
      price: 381.61, weeklyPrices: [404.66, 396.38, 400.49, 405.05, 381.61], weeklyChange: -5.7, dayChange: -5.79, sortRank: 0, periodReturns: { '1M': -10.4, 'YTD': -15.1, '6M': -21.4, '1Y': 12.1 },
      priceHistory: { '1D': [405.05, 388.04, 388.96, 387.69, 388.66, 385.76, 385.71, 383.58, 382.76, 384.66, 384.3, 383.83, 384.93, 384.61, 385.18, 383.93, 381.71, 381.04, 381.11, 379.93, 381.01, 381.62, 381.32, 381.61], '1W': [404.66, 396.38, 400.49, 405.05, 381.61], '1M': [433.59, 440.36, 442.1, 435.79, 415.88, 423.74, 423.7, 418.45, 391, 408.95, 396.68, 381.59, 399.15, 406.43, 411.15, 404.66, 396.38, 400.49, 405.05, 381.61], 'YTD': [449.72, 435.8, 439.2, 449.36, 416.56, 397.21, 428.27, 411.71, 408.58, 405.94, 407.82, 392.78, 385.95, 371.75, 343.25, 391.95, 387.51, 376.02, 389.37, 433.45, 409.99, 433.59, 423.74, 396.68, 411.15, 381.61], '6M': [485.56, 449.72, 435.8, 438.57, 449.06, 430.41, 411.11, 417.07, 411.82, 402.51, 396.73, 391.2, 367.96, 361.83, 352.82, 352.42, 392.5, 378.67, 392.51, 428.35, 422.24, 426.01, 415.88, 408.95, 411.15, 381.61], '1Y': [340.47, 300.71, 295.88, 321.67, 332.56, 319.04, 308.72, 340.84, 329.31, 351.67, 334.09, 347.79, 425.86, 442.79, 459.46, 438.69, 429.24, 442.6, 460.55, 444.26, 439.62, 401.25, 419.4, 446.74, 451.45, 467.26, 485.56, 449.72, 435.8, 438.57, 449.06, 430.41, 411.11, 417.44, 399.83, 403.32, 396.73, 391.2, 367.96, 361.83, 352.82, 352.42, 392.5, 378.67, 392.51, 445, 422.24, 426.01, 415.88, 408.95, 411.15, 381.61] },
      velocityScore: { '1D': null, '1W': null, '1M': -85.7, '6M': null }, isNew: true,
      marketCap: '$1.4T', pe: 350.1, revenueGrowth: 16, eps: 1.09, grossMargin: 19, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 9.95, MARS: false, FRWD: false, BCTK: 3.2, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.06, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'POWL', name: 'POWL', easyScore: 3, avgWeight: 5.27, proScore: 3.16, coverage: 0.6,
      price: 291.5, weeklyPrices: [292.70, 294.03, 297.20, 307.80, 291.50], weeklyChange: -0.41, dayChange: -5.3, sortRank: 0, periodReturns: { '1M': 4.4, 'YTD': 174.3, '6M': 158.2, '1Y': 364 },
      priceHistory: { '1D': [307.8, 285.85, 287.87, 295.47, 294.09, 291.98, 293.91, 292.85, 295.31, 298.12, 301.2, 301.51, 301.63, 301.41, 301.64, 300.2, 297.76, 297.14, 296.66, 295.18, 291.26, 291.57, 291.11, 291.5], '1W': [292.7, 294.03, 297.2, 307.8, 291.5], '1M': [291.97, 295.94, 288.9, 284.42, 288.12, 299.07, 299.73, 300.06, 284.87, 293.6, 283.51, 262.34, 290.5, 294.75, 303.53, 292.7, 294.03, 297.2, 307.8, 291.5], 'YTD': [106.26, 119.94, 133.76, 142.29, 152.31, 179.6, 197.45, 178.79, 176.96, 170.96, 171.73, 167.41, 194.85, 180.36, 218.07, 229.73, 242.77, 255.56, 294.69, 308.05, 266.8, 291.97, 299.07, 283.51, 303.53, 291.5], '6M': [112.88, 106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 197.63, 182.27, 174.53, 161.22, 167.57, 172, 179.35, 186.72, 228.99, 241.65, 260.52, 269.95, 309.39, 292.65, 279.22, 288.12, 293.6, 303.53, 291.5], '1Y': [62.82, 70.01, 70.64, 72.53, 78.32, 76.88, 78.75, 90.06, 84.7, 91.08, 85.72, 92.33, 97.11, 97.88, 105.74, 105.13, 105.73, 116.11, 128.09, 126.71, 121.07, 107.22, 104.18, 107.83, 119.95, 105.77, 112.88, 106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 181.38, 177.5, 161.22, 167.57, 172, 179.35, 186.72, 228.99, 241.65, 260.52, 269.95, 322.05, 292.65, 279.22, 288.12, 293.6, 303.53, 291.5] },
      velocityScore: { '1D': 14.1, '1W': -3.1, '1M': -37.3, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 57, revenueGrowth: 7, eps: 5.11, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { POW: 6.53, VOLT: 7.42, PBD: false, PBW: 1.87, IVEP: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'PWR', name: 'PWR', easyScore: 3, avgWeight: 4.77, proScore: 2.86, coverage: 0.6,
      price: 702.29, weeklyPrices: [719.29, 714.85, 702.25, 740.14, 702.29], weeklyChange: -2.36, dayChange: -5.11, sortRank: 0, periodReturns: { '1M': -2.9, 'YTD': 66.4, '6M': 61.4, '1Y': 88.7 },
      priceHistory: { '1D': [740.14, 701.5, 710.79, 711.17, 705.87, 702.66, 705.45, 708, 708.22, 714.41, 717.1, 716.83, 716.37, 719.07, 717.99, 719.92, 714.21, 713.34, 710.67, 707.02, 706.35, 702.42, 703.98, 702.29], '1W': [719.29, 714.85, 702.25, 740.14, 702.29], '1M': [742.18, 733.62, 730.1, 711.73, 687.48, 706.06, 715.67, 719.17, 695.11, 693.81, 691.95, 650.92, 683.29, 707.74, 724.35, 719.29, 714.85, 702.25, 740.14, 702.29], 'YTD': [422.06, 413.17, 437.07, 468.78, 483.43, 477.72, 523.96, 554, 565.05, 568.38, 567.71, 572, 573.5, 549.02, 576.24, 591.82, 613.78, 630.94, 771.61, 765.81, 723.03, 742.18, 706.06, 691.95, 724.35, 702.29], '6M': [435.2, 422.06, 413.17, 447.64, 468.76, 474.63, 508.11, 515.88, 552.66, 563.08, 540.19, 559.02, 555.39, 549.98, 554.38, 595.84, 604.97, 637.28, 757.34, 745, 769.99, 723.44, 687.48, 693.81, 724.35, 702.29], '1Y': [372.26, 372.29, 382.12, 389.12, 405.11, 411.11, 389.12, 391.57, 379.27, 383.92, 374.41, 390.17, 376.01, 402.87, 420.65, 443.45, 431.6, 437.43, 439.57, 438.66, 448.91, 439.29, 450.14, 456.02, 462.21, 414.25, 435.2, 422.06, 413.17, 447.64, 468.76, 474.63, 508.11, 524.08, 549.11, 572.66, 540.19, 559.02, 555.39, 549.98, 554.38, 595.84, 604.97, 637.28, 757.34, 781.38, 769.99, 723.44, 687.48, 693.81, 724.35, 702.29] },
      velocityScore: { '1D': 1.8, '1W': -2.4, '1M': -22.1, '6M': null }, isNew: false,
      marketCap: '$105B', pe: 96.9, revenueGrowth: 26, eps: 7.25, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.63, VOLT: 5.38, PBD: false, PBW: false, IVEP: 4.29 },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'ETN', name: 'ETN', easyScore: 3, avgWeight: 4.52, proScore: 2.71, coverage: 0.6,
      price: 405.28, weeklyPrices: [407.71, 409.64, 421.77, 435.78, 405.28], weeklyChange: -0.6, dayChange: -7, sortRank: 0, periodReturns: { '1M': 3.6, 'YTD': 27.2, '6M': 25.5, '1Y': 18.1 },
      priceHistory: { '1D': [435.78, 409.92, 415.75, 416.12, 411.79, 408.29, 410.61, 409.48, 410.07, 410.55, 411.86, 412.19, 412.26, 412.6, 412.27, 410.57, 408.79, 408.01, 408.14, 406.98, 407.98, 407.64, 406.64, 405.28], '1W': [407.71, 409.64, 421.77, 435.78, 405.28], '1M': [403.13, 406.37, 401.94, 400.6, 400.08, 417.62, 421.21, 418.61, 395.94, 403.14, 401.72, 375.46, 393.64, 391.39, 407.06, 407.71, 409.64, 421.77, 435.78, 405.28], 'YTD': [318.51, 320.58, 331.14, 334.04, 354.37, 354.67, 396.09, 377.32, 374.59, 354.46, 355.79, 360.54, 375, 357.67, 385.58, 395.06, 413.87, 413.07, 410.86, 401.53, 381.87, 403.13, 417.62, 401.72, 407.06, 405.28], '6M': [322.81, 318.51, 320.58, 333.46, 331.22, 351.42, 373.82, 390.33, 373.38, 375.92, 347.75, 355.4, 356.8, 357.36, 363.89, 403.36, 407.57, 416.77, 422.44, 401.51, 399.44, 391.35, 400.08, 403.14, 407.06, 405.28], '1Y': [343.26, 355.04, 359.78, 362.89, 380.24, 390.09, 356.45, 363.3, 349, 352.02, 342.99, 362.25, 363.35, 372.21, 373.84, 376.7, 374.35, 373.46, 376.01, 377.72, 367.91, 338.29, 336.65, 335.57, 353.45, 315.82, 322.81, 318.51, 320.58, 333.46, 331.22, 351.42, 373.82, 389.25, 362.05, 377.4, 347.75, 355.4, 356.8, 357.36, 363.89, 403.36, 407.57, 416.77, 422.44, 419, 399.44, 391.35, 400.08, 403.14, 407.06, 405.28] },
      velocityScore: { '1D': 2.3, '1W': 1.9, '1M': -15.3, '6M': null }, isNew: false,
      marketCap: '$157B', pe: 39.6, revenueGrowth: 17, eps: 10.24, grossMargin: 37, dividendYield: 1.01,
      etfPresence: { POW: 4.13, VOLT: 5.43, PBD: false, PBW: false, IVEP: 4.01 },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CORP', easyScore: 3, avgWeight: 4.45, proScore: 2.67, coverage: 0.6,
      price: 321.98, weeklyPrices: [280.88, 284.99, 328.91, 345.85, 321.98], weeklyChange: 14.63, dayChange: -6.9, sortRank: 0, periodReturns: { '1M': 6.4, 'YTD': 270.6, '6M': 252.2, '1Y': 1303 },
      priceHistory: { '1D': [345.85, 306, 322.79, 325.3, 320.26, 316.61, 322, 321.19, 320.92, 325.2, 326.18, 328.48, 327.73, 327.63, 328.04, 326.51, 322.24, 321.05, 320, 317.48, 320.34, 320.89, 320.83, 321.98], '1W': [280.88, 284.99, 328.91, 345.85, 321.98], '1M': [302.4, 293.8, 290.01, 285, 273.51, 302.85, 287.32, 291.37, 263.61, 253.57, 259.61, 234.23, 248.88, 260.22, 274.5, 280.88, 284.99, 328.91, 345.85, 321.98], 'YTD': [86.89, 121.84, 133.46, 145.63, 156.51, 136.6, 155.54, 159, 168.57, 164.78, 159.21, 156.58, 150.22, 135.49, 146.78, 213.84, 229.75, 226.37, 295.25, 280.69, 258.71, 302.4, 302.85, 259.61, 274.5, 321.98], '6M': [91.43, 86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.03, 147.55, 155.67, 135.19, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 288.64, 261.03, 275.95, 302.49, 273.51, 253.57, 274.5, 321.98], '1Y': [22.95, 22.13, 28.71, 24.69, 26.89, 37.62, 37.61, 41.25, 43.1, 49.94, 52.45, 62.96, 79.67, 69.18, 90.19, 87.58, 114.06, 104.38, 113.28, 129.05, 127.07, 104.97, 94.29, 102.5, 101.29, 76.97, 91.43, 86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 160.28, 166, 135.19, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 288.64, 283.92, 275.95, 302.49, 273.51, 253.57, 274.5, 321.98] },
      velocityScore: { '1D': -9.2, '1W': 20.8, '1M': 6.8, '6M': null }, isNew: false,
      marketCap: '$92B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: 4.67, PBD: false, PBW: 2.72, IVEP: 5.95 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'GEV', name: 'GEV', easyScore: 3, avgWeight: 4.11, proScore: 2.46, coverage: 0.6,
      price: 1034.98, weeklyPrices: [982.35, 1048.86, 1109.73, 1127.59, 1034.98], weeklyChange: 5.36, dayChange: -8.21, sortRank: 0, periodReturns: { '1M': -0.4, 'YTD': 58.4, '6M': 56.5, '1Y': 102.6 },
      priceHistory: { '1D': [1127.59, 1052.63, 1066.7, 1068.58, 1051.9, 1045.83, 1048.26, 1043.44, 1042.22, 1046.42, 1050.44, 1051.3, 1050.38, 1052.5, 1056.32, 1055.08, 1053.13, 1047.16, 1045.62, 1040.69, 1040.84, 1039.1, 1039.19, 1034.98], '1W': [982.35, 1048.86, 1109.73, 1127.59, 1034.98], '1M': [1070.47, 1031.89, 996, 968.32, 950.54, 969.67, 959.36, 963.33, 933.61, 933.85, 920.15, 867.09, 906.79, 940.66, 979.07, 982.35, 1048.86, 1109.73, 1127.59, 1034.98], 'YTD': [653.57, 628.4, 644.18, 661.67, 717.39, 737.53, 823.67, 834.61, 876.46, 841.27, 847.65, 858.47, 923.69, 872.9, 936.07, 985.92, 1127.56, 1088.93, 1095.21, 1071.98, 1012.25, 1070.47, 969.67, 920.15, 979.07, 1034.98], '6M': [661.45, 653.57, 628.4, 642.23, 657.78, 726.37, 779.35, 816.56, 830.34, 873.6, 789.23, 805.02, 851.07, 853.16, 897.36, 991.12, 990.18, 1120.23, 1073.95, 1040.15, 1049.23, 1038.74, 950.54, 933.85, 979.07, 1034.98], '1Y': [510.84, 506, 535.77, 561.17, 629.03, 655, 649.72, 657.44, 603.13, 625.91, 577.04, 643.56, 614.79, 628.97, 606.15, 625.45, 644.41, 585.33, 570.98, 547.96, 576.08, 554.93, 572.56, 601.97, 723, 614.19, 661.45, 653.57, 628.4, 642.23, 657.78, 726.37, 779.35, 802.13, 831.7, 881.18, 789.23, 805.02, 851.07, 853.16, 897.36, 991.12, 990.18, 1120.23, 1073.95, 1073.08, 1049.23, 1038.74, 950.54, 933.85, 979.07, 1034.98] },
      velocityScore: { '1D': 3.4, '1W': 11.3, '1M': -10.5, '6M': null }, isNew: false,
      marketCap: '$278B', pe: 30.3, revenueGrowth: 16, eps: 34.17, grossMargin: 20, dividendYield: 0.18,
      etfPresence: { POW: 3.73, VOLT: 4.36, PBD: false, PBW: false, IVEP: 4.23 },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'NVT', name: 'NVT', easyScore: 3, avgWeight: 3.54, proScore: 2.12, coverage: 0.6,
      price: 168.37, weeklyPrices: [167.34, 170.94, 177.02, 184.34, 168.37], weeklyChange: 0.62, dayChange: -8.66, sortRank: 0, periodReturns: { '1M': 2.3, 'YTD': 65.1, '6M': 61.9, '1Y': 132.7 },
      priceHistory: { '1D': [184.34, 169.87, 172.64, 172.96, 170.68, 169.45, 170.16, 169.39, 169.26, 170.31, 170.6, 171.21, 171.22, 172.42, 172.13, 170.92, 170.26, 169.84, 169.69, 168.98, 169.93, 169.48, 168.71, 168.37], '1W': [167.34, 170.94, 177.02, 184.34, 168.37], '1M': [169.29, 167.8, 164.87, 166.99, 171.55, 173.39, 176.39, 173.88, 162.86, 163.81, 163.8, 156.79, 164.52, 165.84, 169, 167.34, 170.94, 177.02, 184.34, 168.37], 'YTD': [101.97, 102.72, 104.54, 111.57, 115.62, 113.87, 112.75, 116.88, 121.79, 113.83, 111.09, 120.27, 127.01, 118.28, 127.11, 131.38, 140.13, 138.3, 169.41, 170.74, 160.69, 169.29, 173.39, 163.8, 169, 168.37], '6M': [103.97, 101.97, 102.72, 107.98, 110.29, 112.26, 112.64, 111.9, 116.87, 118.36, 106.02, 109.93, 116.3, 116.98, 117.41, 133.16, 135.8, 141.71, 162.69, 169.95, 169.01, 164.66, 171.55, 163.81, 169, 168.37], '1Y': [72.34, 72.16, 75.2, 74.48, 76.63, 78.72, 89.73, 91.84, 88.15, 90.84, 89.49, 94.98, 96.46, 97.27, 100.12, 98.72, 99.51, 99.65, 104.22, 109.62, 109.59, 104.31, 104.93, 104.97, 108.87, 94.99, 103.97, 101.97, 102.72, 107.98, 110.29, 112.26, 112.64, 113.25, 114.93, 120.27, 106.02, 109.93, 116.3, 116.98, 117.41, 133.16, 135.8, 141.71, 162.69, 173.39, 169.01, 164.66, 171.55, 163.81, 169, 168.37] },
      velocityScore: { '1D': 3.4, '1W': 2.9, '1M': -12, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 57.5, revenueGrowth: 54, eps: 2.93, grossMargin: 37, dividendYield: 0.46,
      etfPresence: { POW: 4.02, VOLT: 3.24, PBD: false, PBW: false, IVEP: 3.36 },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'NEE', name: 'NEE', easyScore: 3, avgWeight: 3.35, proScore: 2.01, coverage: 0.6,
      price: 86.43, weeklyPrices: [86.23, 85.73, 86.75, 86.08, 86.43], weeklyChange: 0.23, dayChange: 0.41, sortRank: 0, periodReturns: { '1M': -2.4, 'YTD': 7.7, '6M': 8.3, '1Y': 21.1 },
      priceHistory: { '1D': [86.08, 86.56, 86.34, 86.49, 86.49, 86.56, 86.78, 86.52, 86.54, 86.49, 86.44, 86.54, 86.58, 86.48, 86.39, 86.54, 86.59, 86.54, 86.55, 86.56, 86.42, 86.46, 86.61, 86.43], '1W': [86.23, 85.73, 86.75, 86.08, 86.43], '1M': [87.65, 87.65, 87.25, 87.01, 83.66, 85.68, 84.58, 85.68, 85.84, 84.01, 84.83, 85.12, 84.84, 85.99, 86.12, 86.23, 85.73, 86.75, 86.08, 86.43], 'YTD': [80.28, 79.49, 81.98, 85.07, 88.18, 89.21, 91.36, 91.64, 91.99, 92.6, 91.66, 90.96, 91.16, 92.88, 94.17, 91.24, 90, 96.51, 96.28, 94.59, 89.04, 87.65, 85.68, 84.83, 86.12, 86.43], '6M': [79.79, 80.28, 79.49, 82.19, 84.81, 87.9, 89.47, 91.93, 92.18, 93.77, 91.02, 92.78, 89.5, 91.4, 92.73, 92.3, 92.01, 94.83, 95.51, 93.1, 93.36, 88.55, 83.66, 84.01, 86.12, 86.43], '1Y': [71.4, 73.06, 73.65, 74.77, 72.82, 70.99, 71.18, 71.86, 76.51, 74.84, 71.63, 71.04, 70.31, 73.83, 78.67, 84.04, 84.64, 83.99, 83.57, 81.69, 85.76, 84.64, 84.83, 84.95, 81.27, 80.29, 79.79, 80.28, 79.49, 82.19, 84.81, 87.9, 89.47, 93.8, 94.06, 92.71, 91.02, 92.78, 89.5, 91.4, 92.73, 92.3, 92.01, 94.83, 95.51, 94.84, 93.36, 88.55, 83.66, 84.01, 86.12, 86.43] },
      velocityScore: { '1D': -2, '1W': -4.3, '1M': -19.6, '6M': null }, isNew: false,
      marketCap: '$180B', pe: 21.9, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.9,
      etfPresence: { POW: 1.96, VOLT: 4.71, PBD: false, PBW: false, IVEP: 3.39 },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'HUBB', name: 'HUBB', easyScore: 3, avgWeight: 3.03, proScore: 1.82, coverage: 0.6,
      price: 509.96, weeklyPrices: [502.65, 508.87, 523.69, 539.39, 509.96], weeklyChange: 1.45, dayChange: -5.46, sortRank: 0, periodReturns: { '1M': 7.4, 'YTD': 14.8, '6M': 11.9, '1Y': 26.5 },
      priceHistory: { '1D': [539.39, 510.17, 516.74, 519.11, 515.41, 513.28, 515.24, 515.08, 517.09, 518.4, 519.38, 520.39, 520.05, 521.3, 520.89, 518.68, 517.39, 515.92, 514.93, 512.52, 513.54, 510.86, 511.6, 509.96], '1W': [502.65, 508.87, 523.69, 539.39, 509.96], '1M': [478.05, 484.25, 473.93, 473.61, 462.93, 480.46, 484.91, 485.27, 476.82, 485.03, 486.47, 467.59, 469.32, 476.89, 489.73, 502.65, 508.87, 523.69, 539.39, 509.96], 'YTD': [444.11, 460.87, 476.06, 484.06, 497.97, 487.4, 516.03, 526.56, 524.19, 490.78, 477.97, 477.47, 503.2, 490.74, 527.21, 526.94, 549.75, 544.71, 507.81, 485.98, 470.87, 478.05, 480.46, 486.47, 489.73, 509.96], '6M': [455.92, 444.11, 460.87, 484.11, 485.53, 487.94, 503.8, 516.02, 526.73, 511.63, 471.54, 467.38, 475.74, 480.97, 499.2, 539.79, 546.23, 555.34, 516, 492.58, 479.97, 475.01, 462.93, 485.03, 489.73, 509.96], '1Y': [402.99, 410.51, 417.71, 418.42, 434.95, 437.44, 427.67, 432.14, 432.81, 442.52, 428.8, 442.33, 433.26, 431.16, 430.47, 419.67, 427.43, 435.29, 455.34, 459.44, 450.12, 417.28, 429.82, 429.34, 448.18, 429.68, 455.92, 444.11, 460.87, 484.11, 485.53, 487.94, 503.8, 524.12, 516.99, 516.98, 471.54, 467.38, 475.74, 480.97, 499.2, 539.79, 546.23, 555.34, 516, 490.16, 479.97, 475.01, 462.93, 485.03, 489.73, 509.96] },
      velocityScore: { '1D': 3.4, '1W': 5.8, '1M': -14.2, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 30.1, revenueGrowth: 11, eps: 16.94, grossMargin: 36, dividendYield: 1.05,
      etfPresence: { POW: 3.04, VOLT: 3.46, PBD: false, PBW: false, IVEP: 2.58 },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'BELFB', name: 'BELFB', easyScore: 2, avgWeight: 5.51, proScore: 2.2, coverage: 0.4,
      price: 288.64, weeklyPrices: [293.22, 299.84, 296.39, 304.33, 288.64], weeklyChange: -1.56, dayChange: -5.16, sortRank: 0, periodReturns: { '1M': 6.9, 'YTD': 70.2, '6M': 62.9, '1Y': 212.1 },
      priceHistory: { '1D': [304.33, 292.05, 292.77, 294.6, 293.33, 291.81, 293.49, 295.1, 293.67, 294.94, 297.08, 298.06, 299.3, 298.49, 298.78, 297.7, 296.36, 295.22, 292.5, 293.31, 295.4, 293.64, 291.68, 288.64], '1W': [293.22, 299.84, 296.39, 304.33, 288.64], '1M': [276.25, 280.13, 276.96, 274.52, 269.86, 269.22, 280.09, 276.54, 262.56, 279.13, 276.04, 276.95, 296.55, 293.87, 302.15, 293.22, 299.84, 296.39, 304.33, 288.64], 'YTD': [169.63, 180.24, 192.96, 200.29, 210.44, 208, 238.4, 230.06, 232.12, 213.8, 200.88, 205.74, 220.77, 197.98, 228.29, 236.04, 262.68, 249.82, 297.17, 298.22, 258.28, 276.25, 269.22, 276.04, 302.15, 288.64], '6M': [177.23, 169.63, 180.24, 196.61, 196.5, 201.19, 220.78, 231.48, 235.04, 229.71, 191.87, 197.65, 204.09, 203.53, 206.9, 237.93, 254.38, 250.96, 286.69, 297.98, 256.72, 270.01, 269.86, 279.13, 302.15, 288.64], '1Y': [92.48, 95.52, 102.24, 98.77, 107.07, 125.91, 131.71, 134.66, 127.8, 139.31, 138.07, 145.68, 144.6, 142.27, 142.5, 146.89, 147.14, 148, 154.78, 154.25, 152.12, 144.07, 150.84, 159.74, 172.82, 164.18, 177.23, 169.63, 180.24, 196.61, 196.5, 201.19, 220.78, 232.84, 231.83, 222.45, 191.87, 197.65, 204.09, 203.53, 206.9, 237.93, 254.38, 250.96, 286.69, 302.73, 256.72, 270.01, 269.86, 279.13, 302.15, 288.64] },
      velocityScore: { '1D': 0, '1W': -4.3, '1M': -39.6, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 69.7, revenueGrowth: 17, eps: 4.14, grossMargin: 39, dividendYield: 0.09,
      etfPresence: { POW: 3.41, VOLT: 7.61, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 2, avgWeight: 3.53, proScore: 1.41, coverage: 0.4,
      price: 318.32, weeklyPrices: [299.60, 317.58, 333.05, 357.96, 318.32], weeklyChange: 6.25, dayChange: -11.07, sortRank: 0, periodReturns: { '1M': -2.8, 'YTD': 96.5, '6M': 91.5, '1Y': 160.2 },
      priceHistory: { '1D': [357.96, 318.67, 326.49, 327.43, 324.23, 320.64, 321.43, 321.01, 321.15, 324.77, 325.85, 326.22, 324.78, 323.67, 324.28, 321.88, 320.24, 320.85, 319.36, 317.66, 319.35, 319.36, 318.05, 318.32], '1W': [299.6, 317.58, 333.05, 357.96, 318.32], '1M': [323.91, 319.78, 314.18, 315.71, 323.39, 334.49, 331.44, 323.92, 300.51, 300.57, 289.52, 280.98, 297.88, 302.87, 311.93, 299.6, 317.58, 333.05, 357.96, 318.32], 'YTD': [162.01, 160.78, 170.86, 181.12, 195.1, 177.75, 248.51, 243.06, 259.23, 251.28, 268.26, 264.71, 276.16, 250.58, 281.03, 301.16, 305.14, 305.03, 341.02, 367.13, 339.73, 323.91, 334.49, 289.52, 311.93, 318.32], '6M': [166.26, 162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 236.51, 243.75, 254.89, 241.78, 258.88, 255.88, 251.07, 258.73, 299.96, 314.41, 322.43, 330.97, 339.97, 370.94, 327.46, 323.39, 300.57, 311.93, 318.32], '1Y': [122.32, 122.54, 128.37, 125.4, 130.19, 144.17, 138.76, 143.72, 129.05, 127.93, 125.59, 136.74, 136.83, 141.62, 161.59, 167.38, 175.15, 174.8, 190.57, 180.82, 179.05, 164.86, 169.57, 178.88, 181.82, 149.83, 166.26, 162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 234.53, 245.42, 257.75, 241.78, 258.88, 255.88, 251.07, 258.73, 299.96, 314.41, 322.43, 330.97, 367.92, 370.94, 327.46, 323.39, 300.57, 311.93, 318.32] },
      velocityScore: { '1D': 5.2, '1W': 9.3, '1M': -17.5, '6M': null }, isNew: false,
      marketCap: '$122B', pe: 80.2, revenueGrowth: 30, eps: 3.97, grossMargin: 37, dividendYield: 0.07,
      etfPresence: { POW: false, VOLT: 2.67, PBD: false, PBW: false, IVEP: 4.39 },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'AEP', name: 'AEP', easyScore: 2, avgWeight: 2.67, proScore: 1.07, coverage: 0.4,
      price: 133.74, weeklyPrices: [129.75, 128.27, 127.69, 130.30, 133.74], weeklyChange: 3.08, dayChange: 2.64, sortRank: 0, periodReturns: { '1M': 1.6, 'YTD': 16, '6M': 16.1, '1Y': 29.5 },
      priceHistory: { '1D': [130.3, 131.11, 131.08, 131.81, 132.01, 132.27, 132.59, 132.35, 132.35, 132.43, 132.51, 132.6, 132.63, 132.46, 132.34, 132.6, 132.82, 133.09, 133.15, 133.29, 133.22, 133.4, 133.74, 133.74], '1W': [129.75, 128.27, 127.69, 130.3, 133.74], '1M': [130.9, 129.57, 127.76, 126.67, 123.79, 127.11, 126.31, 127.79, 129.14, 126.77, 127.76, 128.53, 128.48, 129.23, 129.31, 129.75, 128.27, 127.69, 130.3, 133.74], 'YTD': [115.31, 115.93, 118.11, 117.18, 119.21, 120.61, 122.25, 128.42, 132.1, 133.52, 131.26, 130.97, 128.3, 131.08, 134.71, 134.39, 131.62, 135.59, 137.04, 131.94, 127.68, 130.9, 127.11, 127.76, 129.31, 133.74], '6M': [115.15, 115.31, 115.93, 119.4, 116.63, 119.78, 120.8, 126.43, 129.37, 133.82, 131.87, 133.61, 125.66, 130.1, 132.36, 134.46, 133.28, 135.07, 134.66, 130.16, 125.15, 131.59, 123.79, 126.77, 129.31, 133.74], '1Y': [103.28, 104.39, 104.74, 105.49, 108.89, 113.25, 113.24, 111.99, 112.66, 112.63, 110.03, 108.34, 107.52, 108.88, 112.75, 118.19, 118.38, 117.43, 115.11, 120.3, 122.73, 123.51, 121.58, 118.06, 114.16, 114.71, 115.15, 115.31, 115.93, 119.4, 116.63, 119.78, 120.8, 129.94, 132.03, 133.29, 131.87, 133.61, 125.66, 130.1, 132.36, 134.46, 133.28, 135.07, 134.66, 130.7, 125.15, 131.59, 123.79, 126.77, 129.31, 133.74] },
      velocityScore: { '1D': -16.4, '1W': -4.5, '1M': -46.8, '6M': null }, isNew: false,
      marketCap: '$73B', pe: 19.8, revenueGrowth: 10, eps: 6.76, grossMargin: 47, dividendYield: 2.92,
      etfPresence: { POW: 1.33, VOLT: 4.01, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 2.49, proScore: 1, coverage: 0.4,
      price: 75.79, weeklyPrices: [71.48, 71.25, 73.12, 74.95, 75.79], weeklyChange: 6.03, dayChange: 1.12, sortRank: 0, periodReturns: { '1M': -3.4, 'YTD': 26.1, '6M': 26.8, '1Y': 24 },
      priceHistory: { '1D': [74.95, 74.49, 75.08, 75.25, 75.48, 75.36, 75.52, 75.28, 75.03, 74.91, 75.08, 75.02, 75.14, 75.23, 75.3, 75.43, 75.24, 75.25, 75.36, 75.26, 75.07, 75.21, 75.43, 75.79], '1W': [71.48, 71.25, 73.12, 74.95, 75.79], '1M': [76.34, 74.37, 73.13, 71.39, 70.04, 71.31, 71.66, 72.43, 71.96, 71.59, 71.59, 72.26, 71.62, 72.08, 71.49, 71.48, 71.25, 73.12, 74.95, 75.79], 'YTD': [60.11, 61.15, 60.71, 63.72, 67.24, 67.42, 71.12, 72.17, 74.77, 75.77, 74.4, 72.8, 73.81, 72.78, 73.01, 70.76, 71.1, 73.04, 76.12, 74.73, 77.69, 76.34, 71.31, 71.59, 71.49, 75.79], '6M': [59.75, 60.11, 61.15, 60.29, 64.96, 67.26, 66.92, 71.13, 72.98, 74.72, 74.24, 73.34, 72.41, 73.58, 72.59, 71.54, 70.91, 71.61, 75.41, 71.96, 77.72, 78.47, 70.04, 71.59, 71.49, 75.79], '1Y': [61.12, 58.72, 57.85, 58.48, 57.71, 59.24, 59, 57.76, 56.57, 57.13, 57.73, 58.76, 59.02, 62.86, 63.69, 63.5, 62.36, 62.34, 57.59, 56.51, 60.6, 59.17, 59.37, 61.55, 60.5, 58.84, 59.75, 60.11, 61.15, 60.29, 64.96, 67.26, 66.92, 72.28, 72.98, 76.26, 74.24, 73.34, 72.41, 73.58, 72.59, 71.54, 70.91, 71.61, 75.41, 74.18, 77.72, 78.47, 70.04, 71.59, 71.49, 75.79] },
      velocityScore: { '1D': 1, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$93B', pe: 33.2, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.8,
      etfPresence: { POW: false, VOLT: 1.47, PBD: false, PBW: false, IVEP: 3.52 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'JCI', name: 'JOHNSON CONTROLS INTERNATIONAL PLC', easyScore: 2, avgWeight: 2.46, proScore: 0.98, coverage: 0.4,
      price: 141.28, weeklyPrices: [145.17, 143.62, 144.82, 148.21, 141.28], weeklyChange: -2.68, dayChange: -4.68, sortRank: 0, periodReturns: { '1M': 2.1, 'YTD': 18, '6M': 16.6, '1Y': 36.4 },
      priceHistory: { '1D': [148.21, 142.6, 143.68, 144.07, 142.56, 142.54, 142.15, 142.4, 142.7, 142.85, 142.86, 143.49, 143.63, 143.45, 143.19, 142.87, 142.21, 142.21, 142.04, 141.89, 142.01, 141.89, 141.85, 141.28], '1W': [145.17, 143.62, 144.82, 148.21, 141.28], '1M': [140.22, 138.2, 136.15, 134.06, 133.91, 141.99, 146.96, 147.4, 143.65, 144.05, 147.75, 139.36, 144.01, 144.96, 146.06, 145.17, 143.62, 144.82, 148.21, 141.28], 'YTD': [119.75, 111.29, 112.13, 114.51, 120.28, 132.52, 140.96, 142.7, 143.42, 140, 134.99, 133.76, 137.48, 130.95, 139, 137.21, 139.81, 141.59, 144.82, 141.04, 137.31, 140.22, 141.99, 147.75, 146.06, 141.28], '6M': [121.13, 119.75, 111.29, 112.95, 113.59, 119.26, 137.65, 138.57, 143.79, 144.3, 132.4, 130.16, 129.7, 131.29, 133.75, 142.82, 140.98, 143.38, 144.4, 139.52, 143.08, 138.36, 133.91, 144.05, 146.06, 141.28], '1Y': [103.6, 104.67, 106.5, 107.28, 110.13, 104.02, 104.84, 106.64, 104.52, 108.46, 105.34, 107.8, 107.41, 106.54, 108.89, 108.43, 107.85, 111.18, 112.21, 111.04, 121.94, 114.44, 114.65, 114.22, 115.81, 116.38, 121.13, 119.75, 111.29, 112.95, 113.59, 119.26, 137.65, 139.24, 142.83, 145.46, 132.4, 130.16, 129.7, 131.29, 133.75, 142.82, 140.98, 143.38, 144.4, 141.78, 143.08, 138.36, 133.91, 144.05, 146.06, 141.28] },
      velocityScore: { '1D': 0, '1W': -3.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$86B', pe: 43.1, revenueGrowth: 8, eps: 3.28, grossMargin: 37, dividendYield: 1.08,
      etfPresence: { POW: false, VOLT: 1.4, PBD: false, PBW: false, IVEP: 3.52 },
      tonyNote: 'JOHNSON CONTROLS INTERNATIONAL PLC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CEG', name: 'CEG', easyScore: 2, avgWeight: 2.36, proScore: 0.94, coverage: 0.4,
      price: 270.26, weeklyPrices: [268.00, 267.17, 274.06, 275.53, 270.26], weeklyChange: 0.84, dayChange: -1.91, sortRank: 0, periodReturns: { '1M': -8.1, 'YTD': -23.5, '6M': -25.2, '1Y': -15.7 },
      priceHistory: { '1D': [275.53, 270.52, 271.88, 274.47, 273.23, 273.25, 273.58, 273.44, 274.43, 274.41, 274.48, 274.81, 275.21, 274.77, 274.37, 274.81, 274.12, 273.73, 272.97, 271.72, 271.5, 271.43, 271.05, 270.26], '1W': [268, 267.17, 274.06, 275.53, 270.26], '1M': [301.57, 288.68, 286.31, 287.75, 265.7, 272.65, 267.24, 264.59, 254.83, 250.67, 251.65, 242.3, 246.71, 253.76, 262.35, 268, 267.17, 274.06, 275.53, 270.26], 'YTD': [353.27, 322.54, 330.38, 287.35, 287.45, 247.06, 276.85, 291.66, 323.56, 322.85, 300.69, 317.22, 303.32, 279.25, 284.27, 294.73, 287.16, 305.71, 320.42, 293.6, 262, 301.57, 272.65, 251.65, 262.35, 270.26], '6M': [361.33, 353.27, 322.54, 341.2, 289.06, 280.68, 261.42, 276.12, 294.84, 329.88, 319.06, 301.77, 281.99, 301.49, 275.16, 291.72, 287.56, 315.17, 321.05, 303.63, 267.2, 294.07, 265.7, 250.67, 262.35, 270.26], '1Y': [320.66, 307.92, 317.11, 308.2, 323.7, 345.27, 343.57, 338.57, 317.23, 316.58, 308.48, 320, 321.27, 339.13, 350.9, 371, 389.56, 358.79, 384.95, 362.82, 351.67, 339.35, 351.6, 361.26, 362.07, 340.97, 361.33, 353.27, 322.54, 341.2, 289.06, 280.68, 261.42, 288.43, 293.8, 327.16, 319.06, 301.77, 281.99, 301.49, 275.16, 291.72, 287.56, 315.17, 321.05, 299.69, 267.2, 294.07, 265.7, 250.67, 262.35, 270.26] },
      velocityScore: { '1D': 1.1, '1W': 1.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$97B', pe: 23.5, revenueGrowth: 64, eps: 11.52, grossMargin: 23, dividendYield: 0.62,
      etfPresence: { POW: 1.38, VOLT: false, PBD: false, PBW: false, IVEP: 3.34 },
      tonyNote: 'CEG appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX TECHNOLOGIES INC', easyScore: 2, avgWeight: 2.14, proScore: 0.86, coverage: 0.4,
      price: 209.89, weeklyPrices: [196.93, 203.07, 205.40, 210.00, 209.89], weeklyChange: 6.58, dayChange: -0.05, sortRank: 0, periodReturns: { '1M': 3.4, 'YTD': 21.4, '6M': 18.2, '1Y': 47.5 },
      priceHistory: { '1D': [210, 207.88, 211.46, 213.1, 213.3, 211.93, 212.67, 211.21, 211.54, 212.82, 213.84, 214.01, 214.31, 215.13, 214.55, 214.26, 213.49, 213.04, 211.76, 209.76, 210.21, 209.53, 209.17, 209.89], '1W': [196.93, 203.07, 205.4, 210, 209.89], '1M': [204.38, 198.95, 199.27, 195.88, 188.39, 187.26, 184.72, 190.76, 185.95, 187.46, 188.96, 183, 194.68, 193.45, 193.94, 196.93, 203.07, 205.4, 210, 209.89], 'YTD': [172.84, 193.2, 204.08, 206.33, 210.18, 187.42, 198.5, 209.07, 207.24, 205.57, 195.98, 208.98, 222.13, 204.49, 231.78, 238.42, 219.1, 216.18, 206.15, 206.83, 201.94, 204.38, 187.26, 188.96, 193.94, 209.89], '6M': [177.62, 172.84, 193.2, 213.25, 207.75, 205.43, 197.19, 196.9, 206.44, 205.98, 195.23, 194.13, 199.75, 202.59, 215.98, 232.83, 228.24, 222.07, 216.68, 205.33, 204.72, 202.91, 188.39, 187.46, 193.94, 209.89], '1Y': [142.31, 140.37, 137.56, 139.85, 143.37, 152.38, 182, 179.51, 165.76, 166.52, 160.95, 166.13, 168.38, 175.02, 187.18, 197.01, 202.46, 205.24, 207.62, 200.39, 195.65, 175.91, 175.26, 174.71, 179.65, 168.12, 177.62, 172.84, 193.2, 213.25, 207.75, 205.43, 197.19, 200.4, 198.38, 216.47, 195.23, 194.13, 199.75, 202.59, 215.98, 232.83, 228.24, 222.07, 216.68, 210.8, 204.72, 202.91, 188.39, 187.46, 193.94, 209.89] },
      velocityScore: { '1D': 0, '1W': 3.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 55.8, revenueGrowth: 26, eps: 3.76, grossMargin: 23, dividendYield: 0.5,
      etfPresence: { POW: false, VOLT: 2.1, PBD: false, PBW: false, IVEP: 2.18 },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'XEL', name: 'XEL', easyScore: 2, avgWeight: 1.85, proScore: 0.74, coverage: 0.4,
      price: 80.33, weeklyPrices: [78.98, 77.46, 77.41, 78.81, 80.33], weeklyChange: 1.71, dayChange: 1.93, sortRank: 0, periodReturns: { '1M': -0.9, 'YTD': 8.8, '6M': 8.5, '1Y': 17.7 },
      priceHistory: { '1D': [78.81, 79.22, 79.07, 79.42, 79.59, 79.71, 79.88, 79.78, 79.76, 79.77, 79.75, 79.79, 79.79, 79.67, 79.7, 79.82, 79.89, 79.95, 80, 80.06, 79.98, 80, 80.18, 80.33], '1W': [78.98, 77.46, 77.41, 78.81, 80.33], '1M': [80.78, 81, 79.26, 79.5, 76.41, 77.87, 77.39, 77.77, 79.04, 77.62, 77.87, 78.1, 78.27, 79.22, 79.35, 78.98, 77.46, 77.41, 78.81, 80.33], 'YTD': [73.86, 73.38, 76.2, 75.86, 75.97, 76.12, 77.92, 80.82, 83.47, 83.04, 81, 80.02, 77.7, 79.44, 81.46, 78.65, 78.11, 79.48, 81.45, 79.9, 78.1, 80.78, 77.87, 77.87, 79.35, 80.33], '6M': [74.01, 73.86, 73.38, 75.36, 75.01, 76.06, 75.9, 78.98, 81.55, 83.36, 82.52, 81.91, 76.77, 78.09, 80.39, 80.45, 80.32, 79.41, 81.17, 79.39, 77.92, 81.08, 76.41, 77.62, 79.35, 80.33], '1Y': [68.23, 68.71, 67.84, 69.17, 72.5, 72.39, 73.73, 72.39, 73.22, 72.54, 72.43, 72.31, 72.05, 77.93, 80.31, 81.85, 80.85, 80.64, 79.82, 81.59, 81.16, 81, 80.39, 78.39, 74.62, 73.14, 74.01, 73.86, 73.38, 75.36, 75.01, 76.06, 75.9, 81.59, 83.35, 83.8, 82.52, 81.91, 76.77, 78.09, 80.39, 80.45, 80.32, 79.41, 81.17, 80.6, 77.92, 81.08, 76.41, 77.62, 79.35, 80.33] },
      velocityScore: { '1D': null, '1W': -5.1, '1M': null, '6M': null }, isNew: true,
      marketCap: '$50B', pe: 23.1, revenueGrowth: 3, eps: 3.47, grossMargin: 46, dividendYield: 3.01,
      etfPresence: { POW: 1.88, VOLT: 1.82, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'XEL appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 1.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NRG', name: 'NRG ENERGY INC', easyScore: 2, avgWeight: 1.6, proScore: 0.64, coverage: 0.4,
      price: 137.66, weeklyPrices: [132.10, 132.13, 135.06, 138.91, 137.66], weeklyChange: 4.21, dayChange: -0.9, sortRank: 0, periodReturns: { '1M': 0, 'YTD': -13.6, '6M': -12.9, '1Y': -10.4 },
      priceHistory: { '1D': [138.91, 135.77, 136.5, 137.51, 136.93, 136.87, 137.33, 136.87, 137.52, 137.73, 137.66, 137.81, 138.19, 138.49, 138.32, 138.66, 138.16, 137.78, 137.69, 136.96, 137.25, 137.01, 137.53, 137.66], '1W': [132.1, 132.13, 135.06, 138.91, 137.66], '1M': [140.43, 138, 137.5, 134.08, 129.47, 133.51, 133.76, 133.39, 129.2, 127.71, 129.96, 120.65, 123.7, 125.47, 130.4, 132.1, 132.13, 135.06, 138.91, 137.66], 'YTD': [159.24, 143.53, 149.83, 151.09, 153.72, 144.44, 160.63, 175.01, 181.34, 163.54, 148.63, 159.11, 151.04, 146.14, 160.3, 168.45, 149.6, 154.81, 157.43, 137.34, 125.5, 140.43, 133.51, 129.96, 130.4, 137.66], '6M': [158.11, 159.24, 143.53, 158.5, 149.3, 152.63, 153.32, 161.8, 179.18, 178.96, 154.32, 152.87, 145.8, 147.74, 149.8, 170.24, 157.18, 160.15, 154.82, 138.11, 127.81, 137.65, 129.47, 127.71, 130.4, 137.66], '1Y': [153.68, 155.96, 150.27, 144.96, 160.55, 166.59, 171.96, 156.69, 148.38, 146.23, 146.91, 161.21, 164.58, 165.58, 161.91, 167.52, 165.61, 163.59, 172.76, 167.99, 162.84, 166.45, 163.81, 166.77, 168.16, 149.48, 158.11, 159.24, 143.53, 158.5, 149.3, 152.63, 153.32, 172.35, 176.52, 175.58, 154.32, 152.87, 145.8, 147.74, 149.8, 170.24, 157.18, 160.15, 154.82, 137.3, 127.81, 137.65, 129.47, 127.71, 130.4, 137.66] },
      velocityScore: { '1D': -12.3, '1W': 1.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$29B', pe: 149.6, revenueGrowth: 20, eps: 0.92, grossMargin: 16, dividendYield: 1.37,
      etfPresence: { POW: false, VOLT: 0.95, PBD: false, PBW: false, IVEP: 2.25 },
      tonyNote: 'NRG ENERGY INC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 1.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SHLS', name: 'Shoals Technologies Group Inc', easyScore: 2, avgWeight: 1.56, proScore: 0.62, coverage: 0.4,
      price: 10.28, weeklyPrices: [9.96, 9.44, 10.42, 10.94, 10.28], weeklyChange: 3.21, dayChange: -6.03, sortRank: 0, periodReturns: { '1M': 3.7, 'YTD': 20.9, '6M': 12.8, '1Y': 105.6 },
      priceHistory: { '1D': [10.94, 10.64, 10.74, 10.71, 10.64, 10.55, 10.57, 10.54, 10.52, 10.58, 10.65, 10.65, 10.61, 10.6, 10.61, 10.59, 10.48, 10.4, 10.33, 10.31, 10.35, 10.26, 10.24, 10.28], '1W': [9.96, 9.44, 10.42, 10.94, 10.28], '1M': [10.82, 12.12, 12.2, 12.45, 12.18, 12.46, 12.39, 12.77, 10.81, 10.88, 9.63, 9.25, 9.89, 10.43, 10.3, 9.96, 9.44, 10.42, 10.94, 10.28], 'YTD': [8.5, 8.6, 9.14, 9.66, 10.02, 9.65, 9.79, 10.19, 6.35, 6.14, 6.27, 5.95, 6.91, 6.58, 6.95, 7.23, 7.5, 7.65, 8.13, 8.63, 9.66, 10.82, 12.46, 9.63, 10.3, 10.28], '6M': [9.11, 8.5, 8.6, 9.37, 9.22, 9.44, 10.29, 9.66, 10.61, 5.93, 5.71, 6.13, 6.1, 6.62, 6.56, 6.67, 7.08, 7.8, 8.27, 8.84, 10.33, 9.91, 12.18, 10.88, 10.3, 10.28], '1Y': [5, 5.26, 5.74, 5.81, 5.81, 5.39, 4.67, 4.62, 6.13, 6.84, 6.78, 6.88, 7.23, 7.7, 7.93, 8.84, 10.13, 10.48, 10.53, 9.24, 8.93, 7.98, 8.12, 7.61, 8.6, 8.42, 9.11, 8.5, 8.6, 9.37, 9.22, 9.44, 10.29, 10.24, 9.9, 5.96, 5.71, 6.13, 6.1, 6.62, 6.56, 6.67, 7.08, 7.8, 8.27, 9.32, 10.33, 9.91, 12.18, 10.88, 10.3, 10.28] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$2B', pe: 51.4, revenueGrowth: 75, eps: 0.2, grossMargin: 33, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: 1.13, PBW: 1.99, IVEP: false },
      tonyNote: 'Shoals Technologies Group Inc appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 1.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VICR', name: 'VICR', easyScore: 1, avgWeight: 5.7, proScore: 1.14, coverage: 0.2,
      price: 336.12, weeklyPrices: [320.46, 325.17, 331.37, 365.53, 336.12], weeklyChange: 4.89, dayChange: -8.05, sortRank: 0, periodReturns: { '1M': 25.4, 'YTD': 206.7, '6M': 208.5, '1Y': 640.5 },
      priceHistory: { '1D': [365.53, 328.98, 336.51, 343.52, 346.98, 344.34, 343.64, 341.89, 337.41, 338.93, 339.54, 338.83, 340.64, 341.52, 341.11, 338.64, 336.02, 335.64, 332.06, 330.12, 335.87, 335.77, 334.11, 336.12], '1W': [320.46, 325.17, 331.37, 365.53, 336.12], '1M': [332.95, 345.84, 342.09, 334.84, 328.85, 332.95, 330.48, 306.12, 271.04, 274.97, 283.48, 275.51, 298.06, 303.77, 322.41, 320.46, 325.17, 331.37, 365.53, 336.12], 'YTD': [109.6, 136.11, 145.32, 166.78, 171.53, 148.19, 160.71, 152.84, 205.64, 203.19, 178.83, 191.84, 186, 161, 179.99, 194.2, 265, 248.7, 266.01, 292.53, 249.02, 332.95, 332.95, 283.48, 322.41, 336.12], '6M': [108.97, 109.6, 136.11, 145.48, 153.29, 157.67, 159.87, 164.29, 170.01, 201.4, 162.67, 172.57, 164.54, 153.02, 155.71, 186.22, 224.81, 268.61, 251.02, 256.47, 273.67, 267.99, 328.85, 274.97, 322.41, 336.12], '1Y': [45.39, 45.34, 46.72, 47.32, 52.68, 45.81, 46.91, 48.43, 47.24, 51.51, 50.51, 50.09, 52.21, 52.81, 49.31, 51.5, 53.65, 65.8, 89.65, 88.36, 92.58, 84.66, 88.15, 92.82, 100.83, 97.19, 108.97, 109.6, 136.11, 145.48, 153.29, 157.67, 159.87, 155.96, 171.8, 209.19, 162.67, 172.57, 164.54, 153.02, 155.71, 186.22, 224.81, 268.61, 251.02, 312.96, 273.67, 267.99, 328.85, 274.97, 322.41, 336.12] },
      velocityScore: { '1D': null, '1W': 5.6, '1M': -50.6, '6M': null }, isNew: true,
      marketCap: '$15B', pe: 112, revenueGrowth: 20, eps: 3, grossMargin: 54, dividendYield: null,
      etfPresence: { POW: 5.7, VOLT: false, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Vicor Corp is a power conversion specialist — high-efficiency modules for AI server power delivery. It holds a niche position in Industrials ETFs on the data center power density thesis. Revenue growth has been lumpy, but when AI GPU clusters require Vicor\'s factorized power architecture, the order cycles are large.',
    },
    {
      ticker: 'AEIS', name: 'ADVANCED ENERGY INDUSTRIES INC', easyScore: 1, avgWeight: 4.62, proScore: 0.92, coverage: 0.2,
      price: 364.96, weeklyPrices: [350.45, 353.32, 372.59, 388.23, 364.96], weeklyChange: 4.14, dayChange: -5.99, sortRank: 0, periodReturns: { '1M': 12.3, 'YTD': 74.3, '6M': 67.8, '1Y': 175.4 },
      priceHistory: { '1D': [388.23, 364.6, 368.88, 370.91, 364.75, 363.02, 362, 362.9, 363.93, 366.33, 366.18, 367.31, 367.49, 367.01, 366.27, 366.05, 365.97, 363.62, 362.58, 360.77, 365.26, 365.06, 364.74, 364.96], '1W': [350.45, 353.32, 372.59, 388.23, 364.96], '1M': [339.65, 328.34, 317.08, 302.18, 294.65, 312.28, 322.5, 320.92, 294.81, 306.11, 311.64, 308.17, 340.4, 354.37, 370.66, 350.45, 353.32, 372.59, 388.23, 364.96], 'YTD': [209.37, 210.99, 237.9, 275.57, 269.12, 257.64, 308.77, 320.64, 337.35, 330.54, 314.84, 319.63, 342.87, 322.71, 366.95, 374.32, 377.19, 369.08, 345.63, 339.42, 309.06, 339.65, 312.28, 311.64, 370.66, 364.96], '6M': [217.51, 209.37, 210.99, 257.29, 262.19, 255.36, 273.26, 312.95, 331.23, 335.57, 290.78, 302.02, 317.21, 310.76, 331.9, 378.94, 380.22, 385.68, 387.03, 357.24, 323.46, 324.86, 294.65, 306.11, 370.66, 364.96], '1Y': [132.51, 133.59, 141.13, 139.42, 142.84, 144.07, 139.58, 158.81, 150.41, 154.44, 145.25, 157.25, 157.79, 170.77, 176.2, 174.92, 182.75, 196.58, 204.62, 195.05, 215.98, 199.22, 205.92, 213.44, 221.47, 204.49, 217.51, 209.37, 210.99, 257.29, 262.19, 255.36, 273.26, 314.27, 329.24, 340.42, 290.78, 302.02, 317.21, 310.76, 331.9, 378.94, 380.22, 385.68, 387.03, 354.97, 323.46, 324.86, 294.65, 306.11, 370.66, 364.96] },
      velocityScore: { '1D': -18.6, '1W': 0, '1M': -48.9, '6M': null }, isNew: false,
      marketCap: '$15B', pe: 75.9, revenueGrowth: 26, eps: 4.81, grossMargin: 39, dividendYield: 0.1,
      etfPresence: { POW: false, VOLT: 4.62, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 5.6, proScore: 2.24, coverage: 0.4,
      price: 892.25, weeklyPrices: [857.76, 838.21, 861.88, 932.75, 892.25], weeklyChange: 4.02, dayChange: -4.34, sortRank: 0, periodReturns: { '1M': 21.7, 'YTD': 191.4, '6M': 182.5, '1Y': 289 },
      priceHistory: { '1D': [932.75, 846.77, 878, 885.55, 877.82, 880.69, 877.28, 872.3, 872.91, 882.96, 891.19, 899.97, 901.09, 900.47, 900.91, 897.42, 888.74, 889.54, 891.78, 883.37, 893.77, 889.33, 886.68, 892.25], '1W': [857.76, 838.21, 861.88, 932.75, 892.25], '1M': [783.53, 782.12, 842.96, 860.84, 845.39, 875.52, 957.03, 993.74, 882.43, 891.86, 842.01, 770.25, 838.55, 858.99, 866.67, 857.76, 838.21, 861.88, 932.75, 892.25], 'YTD': [306.23, 297.62, 319.27, 364.25, 379.23, 365.07, 433.91, 415.13, 433.34, 420.22, 420.6, 421.23, 452.92, 407.27, 423.35, 456.08, 487.87, 471.85, 806, 851.35, 770.76, 783.53, 875.52, 842.01, 866.67, 892.25], '6M': [315.87, 306.23, 297.62, 336.31, 351.39, 357.91, 401.29, 431.43, 435.5, 428.13, 395.11, 398.12, 401.61, 420.24, 393.71, 459.02, 472.9, 505.45, 529.49, 844.8, 848.84, 732.94, 845.39, 891.86, 866.67, 892.25], '1Y': [229.38, 222.54, 233.39, 243.23, 253.14, 263.35, 296.58, 308.4, 276.02, 292.95, 273.82, 301.13, 320.94, 344.05, 337.93, 366.99, 361.44, 364.32, 379.89, 382.57, 381.22, 333.88, 332.96, 323.46, 331.61, 283.57, 315.87, 306.23, 297.62, 336.31, 351.39, 357.91, 401.29, 437.77, 434.64, 432.87, 395.11, 398.12, 401.61, 420.24, 393.71, 459.02, 472.9, 505.45, 529.49, 868.18, 848.84, 732.94, 845.39, 891.86, 866.67, 892.25] },
      velocityScore: { '1D': -15.2, '1W': 4.2, '1M': -52.7, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 79.7, revenueGrowth: 92, eps: 11.19, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 6.66, PRN: 4.54, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 5.17, proScore: 2.07, coverage: 0.4,
      price: 984.24, weeklyPrices: [945.46, 955.92, 985.82, 1022.28, 984.24], weeklyChange: 4.1, dayChange: -3.72, sortRank: 0, periodReturns: { '1M': 11.9, 'YTD': 71.8, '6M': 69, '1Y': 163.9 },
      priceHistory: { '1D': [1022.28, 975.68, 981.49, 986.9, 977.91, 982.17, 981.54, 981.54, 984.56, 988.2, 990.36, 992.65, 992.72, 991.64, 992.82, 988.71, 986.92, 983.72, 985.18, 983.31, 986.79, 984.97, 984.36, 984.24], '1W': [945.46, 955.92, 985.82, 1022.28, 984.24], '1M': [908.55, 909.93, 887.67, 875.87, 865.36, 909.81, 926.18, 940.48, 904.28, 915.64, 914.7, 856.16, 897.63, 910.57, 933.93, 945.46, 955.92, 985.82, 1022.28, 984.24], 'YTD': [572.87, 608.13, 638.75, 648.41, 665.24, 678.31, 775, 760.53, 752.93, 731.97, 707.59, 693.62, 719.04, 708.46, 771.58, 770.17, 808.87, 817.87, 904.59, 912.14, 863.95, 908.55, 909.81, 914.7, 933.93, 984.24], '6M': [582.42, 572.87, 608.13, 647.18, 626.62, 657.36, 726.2, 758.29, 759.74, 742.83, 680.9, 693.99, 680.88, 695.4, 721.24, 791.73, 798.4, 828.79, 874.78, 897.45, 888.31, 879.89, 865.36, 915.64, 933.93, 984.24], '1Y': [373.02, 390.92, 402.18, 412.88, 427.59, 434.12, 434.23, 412.71, 416.09, 431.26, 415.12, 422.91, 450.66, 469.79, 480.82, 502.12, 527.47, 524.65, 524.47, 547.58, 567.93, 546.88, 566.61, 591.49, 615.35, 561.89, 582.42, 572.87, 608.13, 647.18, 626.62, 657.36, 726.2, 774.2, 756.47, 752.32, 680.9, 693.99, 680.88, 695.4, 721.24, 791.73, 798.4, 828.79, 874.78, 926.79, 888.31, 879.89, 865.36, 915.64, 933.93, 984.24] },
      velocityScore: { '1D': null, '1W': 4.5, '1M': -9.6, '6M': null }, isNew: true,
      marketCap: '$453B', pe: 49.1, revenueGrowth: 22, eps: 20.04, grossMargin: 29, dividendYield: 0.64,
      etfPresence: { AIRR: false, PRN: 3.44, RSHO: 6.89, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 5, proScore: 2, coverage: 0.4,
      price: 291.5, weeklyPrices: [292.70, 294.03, 297.20, 307.80, 291.50], weeklyChange: -0.41, dayChange: -5.3, sortRank: 0, periodReturns: { '1M': 4.4, 'YTD': 174.3, '6M': 158.2, '1Y': 364 },
      priceHistory: { '1D': [307.8, 285.85, 287.87, 295.47, 294.09, 291.98, 293.91, 292.85, 295.31, 298.12, 301.2, 301.51, 301.63, 301.41, 301.64, 300.2, 297.76, 297.14, 296.66, 295.18, 291.26, 291.57, 291.11, 291.5], '1W': [292.7, 294.03, 297.2, 307.8, 291.5], '1M': [291.97, 295.94, 288.9, 284.42, 288.12, 299.07, 299.73, 300.06, 284.87, 293.6, 283.51, 262.34, 290.5, 294.75, 303.53, 292.7, 294.03, 297.2, 307.8, 291.5], 'YTD': [106.26, 119.94, 133.76, 142.29, 152.31, 179.6, 197.45, 178.79, 176.96, 170.96, 171.73, 167.41, 194.85, 180.36, 218.07, 229.73, 242.77, 255.56, 294.69, 308.05, 266.8, 291.97, 299.07, 283.51, 303.53, 291.5], '6M': [112.88, 106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 197.63, 182.27, 174.53, 161.22, 167.57, 172, 179.35, 186.72, 228.99, 241.65, 260.52, 269.95, 309.39, 292.65, 279.22, 288.12, 293.6, 303.53, 291.5], '1Y': [62.82, 70.01, 70.64, 72.53, 78.32, 76.88, 78.75, 90.06, 84.7, 91.08, 85.72, 92.33, 97.11, 97.88, 105.74, 105.13, 105.73, 116.11, 128.09, 126.71, 121.07, 107.22, 104.18, 107.83, 119.95, 105.77, 112.88, 106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 181.38, 177.5, 161.22, 167.57, 172, 179.35, 186.72, 228.99, 241.65, 260.52, 269.95, 322.05, 292.65, 279.22, 288.12, 293.6, 303.53, 291.5] },
      velocityScore: { '1D': null, '1W': -4.8, '1M': 9.9, '6M': null }, isNew: true,
      marketCap: '$11B', pe: 57, revenueGrowth: 7, eps: 5.11, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { AIRR: 2.67, PRN: false, RSHO: 7.33, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, avgWeight: 4.74, proScore: 1.9, coverage: 0.4,
      price: 736.77, weeklyPrices: [690.39, 719.52, 738.85, 790.00, 736.77], weeklyChange: 6.72, dayChange: -6.74, sortRank: 0, periodReturns: { '1M': 12.3, 'YTD': 135.1, '6M': 121.1, '1Y': 243.3 },
      priceHistory: { '1D': [790, 720.54, 731.05, 737.05, 737.85, 727.33, 730.05, 727.12, 729.99, 734.15, 732.23, 736.87, 738.86, 738.11, 739.28, 735.57, 728.82, 725, 721, 715.3, 726.29, 726.75, 733.8, 736.77], '1W': [690.39, 719.52, 738.85, 790, 736.77], '1M': [670.66, 673.51, 677.45, 667.02, 646.89, 663.14, 686.37, 689.43, 694.72, 619.98, 613.93, 588.9, 623.66, 641.68, 688.87, 690.39, 719.52, 738.85, 790, 736.77], 'YTD': [313.32, 313.98, 317.76, 380.36, 355.51, 345.97, 422.5, 432.18, 452.53, 463.36, 472.86, 469.81, 437.48, 544.65, 588.28, 606.43, 651.68, 630.7, 720, 681.01, 664.76, 670.66, 663.14, 613.93, 688.87, 736.77], '6M': [333.23, 313.32, 313.98, 329.66, 363.88, 347.11, 352.09, 413.65, 437.61, 451.25, 414.2, 458.31, 473.85, 566.62, 572.31, 598.44, 611.21, 660.85, 697.15, 680.26, 722.31, 656.35, 646.89, 619.98, 688.87, 736.77], '1Y': [214.63, 203.78, 206.63, 213.25, 216.2, 240.5, 233.13, 239.05, 213.76, 230.02, 227.03, 225.82, 239.42, 260.56, 279.62, 281.67, 300.72, 281, 292.46, 303.2, 347.88, 344.36, 373.29, 351.09, 325.77, 296.56, 333.23, 313.32, 313.98, 329.66, 363.88, 347.11, 352.09, 409.95, 441.71, 445.36, 414.2, 458.31, 473.85, 566.62, 572.31, 598.44, 611.21, 660.85, 697.15, 683.52, 722.31, 656.35, 646.89, 619.98, 688.87, 736.77] },
      velocityScore: { '1D': -16.3, '1W': 11.1, '1M': -55.3, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 64.7, revenueGrowth: 50, eps: 11.38, grossMargin: 21, dividendYield: 0.25,
      etfPresence: { AIRR: 4.68, PRN: 4.81, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Argan Inc is an engineering and construction company for power generation facilities — natural gas and renewable power plants. It appears in Industrials ETFs because power plant construction is one of the fastest-growing categories in U.S. infrastructure spending, driven by data center load additions that the grid cannot currently support.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.73, proScore: 1.89, coverage: 0.4,
      price: 1908.07, weeklyPrices: [1913.94, 1931.77, 1967.41, 2066.51, 1908.07], weeklyChange: -0.31, dayChange: -7.67, sortRank: 0, periodReturns: { '1M': 4.4, 'YTD': 104.4, '6M': 97.7, '1Y': 271.7 },
      priceHistory: { '1D': [2066.51, 1908.35, 1956.67, 1975.26, 1966, 1961.86, 1945.57, 1948.16, 1949.35, 1969.99, 1984.46, 1983.18, 1972.64, 1976.34, 1969.46, 1963.98, 1944.64, 1934.54, 1919.35, 1908.67, 1909.19, 1906.74, 1902.28, 1908.07], '1W': [1913.94, 1931.77, 1967.41, 2066.51, 1908.07], '1M': [1883.56, 1867.09, 1855.15, 1828.21, 1787.88, 1883.26, 1850.04, 1914.65, 1843.94, 1852.03, 1831.56, 1719.48, 1843.42, 1877.61, 1952.02, 1913.94, 1931.77, 1967.41, 2066.51, 1908.07], 'YTD': [933.29, 971.49, 1053.1, 1131.7, 1171.46, 1147.97, 1338.65, 1373.52, 1438.23, 1430.38, 1407.32, 1423, 1470.64, 1378.99, 1525.16, 1648.96, 1724.49, 1719.21, 1967.24, 2016.31, 1854.43, 1883.56, 1883.26, 1831.56, 1952.02, 1908.07], '6M': [965.37, 933.29, 971.49, 1091.04, 1121.44, 1142.1, 1230.26, 1300.02, 1462.23, 1429.37, 1279.06, 1365.34, 1356.75, 1366.77, 1434.09, 1627.81, 1680.09, 1794.04, 1891.95, 1952.37, 1992.74, 1828.25, 1787.88, 1852.03, 1952.02, 1908.07], '1Y': [513.32, 521.66, 535.02, 546.63, 547.91, 702.97, 691.45, 718.61, 683.93, 707.39, 700.69, 752.1, 762.91, 791.46, 834.33, 844.62, 831.89, 829.36, 980.97, 955.96, 954.53, 920.99, 957.04, 949.3, 1021.36, 883.79, 965.37, 933.29, 971.49, 1091.04, 1121.44, 1142.1, 1230.26, 1337.95, 1413.57, 1438.24, 1279.06, 1365.34, 1356.75, 1366.77, 1434.09, 1627.81, 1680.09, 1794.04, 1891.95, 2032.98, 1992.74, 1828.25, 1787.88, 1852.03, 1952.02, 1908.07] },
      velocityScore: { '1D': -17.8, '1W': 2.2, '1M': -58.3, '6M': null }, isNew: false,
      marketCap: '$67B', pe: 55, revenueGrowth: 1, eps: 34.72, grossMargin: 25, dividendYield: 0.13,
      etfPresence: { AIRR: 4.6, PRN: 4.86, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.92, proScore: 1.57, coverage: 0.4,
      price: 330.9, weeklyPrices: [324.38, 329.89, 337.96, 338.07, 330.90], weeklyChange: 2.01, dayChange: -2.12, sortRank: 0, periodReturns: { '1M': 7.7, 'YTD': 28.9, '6M': 25.5, '1Y': 40.9 },
      priceHistory: { '1D': [338.07, 330.39, 332.57, 333.52, 334.58, 334.77, 332.89, 333.02, 332.93, 333.48, 334.26, 334.09, 334.8, 333.85, 333.4, 333.58, 332.71, 332.3, 331.45, 331.19, 331.89, 331.12, 331, 330.9], '1W': [324.38, 329.89, 337.96, 338.07, 330.9], '1M': [311.33, 312.65, 308.53, 303.81, 300.98, 308.31, 313.39, 313.67, 315.29, 314.42, 322.81, 314.08, 318.89, 320.11, 316.18, 324.38, 329.89, 337.96, 338.07, 330.9], 'YTD': [256.77, 264.62, 277.62, 282.33, 259.51, 287.03, 290.31, 281.13, 283.5, 279.91, 270.13, 258.51, 266, 265.32, 280.74, 284.56, 289.82, 301.24, 305.48, 313.7, 305.22, 311.33, 308.31, 322.81, 316.18, 330.9], '6M': [263.58, 256.77, 264.62, 282.47, 280.14, 260.41, 291.74, 279.03, 281.97, 282.58, 267.78, 255.65, 253.77, 260.67, 269.55, 293.26, 293.92, 298.1, 303.99, 308.87, 307.17, 307.1, 300.98, 314.42, 316.18, 330.9], '1Y': [234.89, 242.14, 251.4, 255.52, 267.01, 273.62, 269.28, 270.68, 262.92, 266.99, 261.53, 263.45, 259.5, 259.37, 257.98, 255.19, 252.95, 258.78, 258.03, 256.47, 255.53, 242.61, 255.78, 260.88, 264.32, 256.73, 263.58, 256.77, 264.62, 282.47, 280.14, 260.41, 291.74, 279.84, 278.74, 283.54, 267.78, 255.65, 253.77, 260.67, 269.55, 293.26, 293.92, 298.1, 303.99, 310.55, 307.17, 307.1, 300.98, 314.42, 316.18, 330.9] },
      velocityScore: { '1D': null, '1W': 13.8, '1M': null, '6M': null }, isNew: true,
      marketCap: '$12B', pe: 31.3, revenueGrowth: 7, eps: 10.58, grossMargin: 30, dividendYield: 0.6,
      etfPresence: { AIRR: 1.8, PRN: false, RSHO: 6.04, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 2.83, proScore: 1.13, coverage: 0.4,
      price: 236.07, weeklyPrices: [234.80, 235.29, 242.97, 246.41, 236.07], weeklyChange: 0.54, dayChange: -4.2, sortRank: 0, periodReturns: { '1M': 13.6, 'YTD': 18, '6M': 14.9, '1Y': 45.4 },
      priceHistory: { '1D': [246.41, 237.74, 240.27, 241.32, 240.74, 243.02, 242.15, 241.45, 242.37, 242.51, 243.17, 243.13, 242.73, 242.23, 242.28, 240.84, 238.5, 237.6, 236.16, 236.92, 237.65, 236.97, 237.11, 236.07], '1W': [234.8, 235.29, 242.97, 246.41, 236.07], '1M': [219.08, 215.34, 213.82, 216.66, 220.92, 230.08, 234.08, 236.14, 227.8, 229.95, 228.01, 223.63, 233.49, 230.05, 237.06, 234.8, 235.29, 242.97, 246.41, 236.07], 'YTD': [200.06, 207.44, 209.78, 217.13, 211.84, 218.02, 233.46, 241.01, 231.59, 222.07, 210.15, 202.46, 201.27, 199.94, 212.22, 219.99, 220.62, 216.36, 207.81, 198.99, 200.47, 219.08, 230.08, 228.01, 237.06, 236.07], '6M': [205.46, 200.06, 207.44, 213.61, 211.03, 208.41, 222.32, 230.92, 242.29, 226.94, 204.62, 199.45, 186.77, 200, 196.9, 221.27, 217.61, 222.45, 201.12, 202.84, 200.99, 207.8, 220.92, 229.95, 237.06, 236.07], '1Y': [162.31, 168.95, 172.78, 175.13, 175.58, 181.26, 203.71, 191.17, 188, 192.05, 182.65, 188, 184.91, 182.39, 185.92, 188.45, 185.28, 191.84, 197.07, 213.49, 221.42, 204.36, 215.7, 209.57, 217.69, 207.33, 205.46, 200.06, 207.44, 213.61, 211.03, 208.41, 222.32, 239, 237.18, 225.02, 204.62, 199.45, 186.77, 200, 196.9, 221.27, 217.61, 222.45, 201.12, 203.24, 200.99, 207.8, 220.92, 229.95, 237.06, 236.07] },
      velocityScore: { '1D': null, '1W': 0, '1M': null, '6M': null }, isNew: true,
      marketCap: '$12B', pe: 45.2, revenueGrowth: 17, eps: 5.22, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.69, PRN: false, RSHO: 3.96, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 2, avgWeight: 2.79, proScore: 1.11, coverage: 0.4,
      price: 275.13, weeklyPrices: [277.42, 283.23, 277.66, 280.36, 275.13], weeklyChange: -0.83, dayChange: -1.87, sortRank: 0, periodReturns: { '1M': 7.2, 'YTD': 34.2, '6M': 31.3, '1Y': 55.8 },
      priceHistory: { '1D': [280.36, 274.08, 277.51, 278.55, 276.58, 275.72, 276.02, 275.69, 276.09, 276.45, 277.18, 277.04, 277.13, 276.55, 276.83, 276.78, 276.47, 275.69, 274.93, 274.61, 274.68, 274.49, 275.69, 275.13], '1W': [277.42, 283.23, 277.66, 280.36, 275.13], '1M': [261.89, 258.02, 259.89, 258.25, 255.52, 250.72, 248.63, 249.33, 251.9, 246.55, 257.16, 249.49, 264.6, 264.67, 270.44, 277.42, 283.23, 277.66, 280.36, 275.13], 'YTD': [205.02, 210.02, 220.25, 217.7, 208.93, 209.63, 230.85, 251.3, 260.31, 260.09, 251.65, 241.93, 241.62, 230.46, 250, 254.04, 240.88, 240.43, 242.69, 269.76, 256.99, 261.89, 250.72, 257.16, 270.44, 275.13], '6M': [209.57, 205.02, 210.02, 224.26, 214.89, 208.08, 223.16, 244.79, 258.1, 262.53, 250.13, 236.75, 231.21, 227.9, 236.57, 256.14, 255.62, 241.7, 239.7, 270.56, 260.35, 256.55, 255.52, 246.55, 270.44, 275.13], '1Y': [176.57, 176.22, 181.42, 184.3, 186.4, 192.14, 179.32, 180.9, 171.9, 175.92, 174.49, 183.8, 185.39, 190.22, 194.85, 191.65, 193.03, 197.18, 201.04, 205.02, 208.9, 201.22, 203.68, 194.29, 192.39, 191.19, 209.57, 205.02, 210.02, 224.26, 214.89, 208.08, 223.16, 250.21, 257.04, 265.11, 250.13, 236.75, 231.21, 227.9, 236.57, 256.14, 255.62, 241.7, 239.7, 273.58, 260.35, 256.55, 255.52, 246.55, 270.44, 275.13] },
      velocityScore: { '1D': -20.1, '1W': 1.8, '1M': -52.2, '6M': null }, isNew: false,
      marketCap: '$110B', pe: 63.7, revenueGrowth: 19, eps: 4.32, grossMargin: 35, dividendYield: 0.17,
      etfPresence: { AIRR: false, PRN: 3.27, RSHO: false, IDEF: 2.3, BILT: false },
      tonyNote: 'Howmet Aerospace is an aerospace structures and engine components manufacturer. It appears in Industrials ETFs for its aerospace and defense exposure — commercial air travel recovery and defense spending growth are the two demand drivers. Revenue grew and margins are expanding as Howmet prices power over OEM customers.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 2, avgWeight: 2.53, proScore: 1.01, coverage: 0.4,
      price: 209.89, weeklyPrices: [196.93, 203.07, 205.40, 210.00, 209.89], weeklyChange: 6.58, dayChange: -0.05, sortRank: 0, periodReturns: { '1M': 3.4, 'YTD': 21.4, '6M': 18.2, '1Y': 47.5 },
      priceHistory: { '1D': [210, 207.88, 211.46, 213.1, 213.3, 211.93, 212.67, 211.21, 211.54, 212.82, 213.84, 214.01, 214.31, 215.13, 214.55, 214.26, 213.49, 213.04, 211.76, 209.76, 210.21, 209.53, 209.17, 209.89], '1W': [196.93, 203.07, 205.4, 210, 209.89], '1M': [204.38, 198.95, 199.27, 195.88, 188.39, 187.26, 184.72, 190.76, 185.95, 187.46, 188.96, 183, 194.68, 193.45, 193.94, 196.93, 203.07, 205.4, 210, 209.89], 'YTD': [172.84, 193.2, 204.08, 206.33, 210.18, 187.42, 198.5, 209.07, 207.24, 205.57, 195.98, 208.98, 222.13, 204.49, 231.78, 238.42, 219.1, 216.18, 206.15, 206.83, 201.94, 204.38, 187.26, 188.96, 193.94, 209.89], '6M': [177.62, 172.84, 193.2, 213.25, 207.75, 205.43, 197.19, 196.9, 206.44, 205.98, 195.23, 194.13, 199.75, 202.59, 215.98, 232.83, 228.24, 222.07, 216.68, 205.33, 204.72, 202.91, 188.39, 187.46, 193.94, 209.89], '1Y': [142.31, 140.37, 137.56, 139.85, 143.37, 152.38, 182, 179.51, 165.76, 166.52, 160.95, 166.13, 168.38, 175.02, 187.18, 197.01, 202.46, 205.24, 207.62, 200.39, 195.65, 175.91, 175.26, 174.71, 179.65, 168.12, 177.62, 172.84, 193.2, 213.25, 207.75, 205.43, 197.19, 200.4, 198.38, 216.47, 195.23, 194.13, 199.75, 202.59, 215.98, 232.83, 228.24, 222.07, 216.68, 210.8, 204.72, 202.91, 188.39, 187.46, 193.94, 209.89] },
      velocityScore: { '1D': -18.5, '1W': 7.4, '1M': -56.7, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 55.8, revenueGrowth: 26, eps: 3.76, grossMargin: 23, dividendYield: 0.5,
      etfPresence: { AIRR: 3.2, PRN: false, RSHO: false, IDEF: 1.85, BILT: false },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 2, avgWeight: 1.75, proScore: 0.7, coverage: 0.4,
      price: 50.8, weeklyPrices: [56.34, 56.16, 54.21, 51.09, 50.80], weeklyChange: -9.83, dayChange: -0.57, sortRank: 0, periodReturns: { '1M': -9.6, 'YTD': -33.1, '6M': -38.3, '1Y': 24.6 },
      priceHistory: { '1D': [51.09, 51.65, 51.96, 51.55, 51.63, 51.6, 51.88, 51.65, 51.77, 52.04, 51.73, 51.85, 51.97, 52.19, 52.22, 52.15, 51.9, 51.71, 51.51, 51.46, 51.63, 51.41, 51.13, 50.8], '1W': [56.34, 56.16, 54.21, 51.09, 50.8], '1M': [56.8, 57.3, 65.19, 64.13, 63.49, 63.27, 58.43, 63.4, 58.52, 57.73, 56.19, 54.82, 58.78, 57.75, 57.02, 56.34, 56.16, 54.21, 51.09, 50.8], 'YTD': [75.91, 104.04, 121.5, 113.85, 108.16, 85.25, 87.78, 105.67, 92.14, 89.13, 88.92, 93.04, 79.98, 70.51, 74.46, 74.66, 68.61, 61.66, 59.31, 57.33, 54.22, 56.8, 63.27, 56.19, 57.02, 50.8], '6M': [82.3, 75.91, 104.04, 124.56, 110.39, 103.01, 94.41, 87.05, 96.08, 86.18, 87, 87.53, 84.62, 71.94, 74.09, 73.55, 69.83, 63.16, 61.93, 57.89, 52.09, 56.18, 63.49, 57.73, 57.02, 50.8], '1Y': [40.77, 43.07, 46.02, 54.28, 58.78, 58.01, 59.4, 69.14, 64.02, 68.05, 64.5, 65.66, 75.74, 81.18, 92.96, 105.67, 95.3, 90.62, 89.78, 90.22, 76.59, 70.36, 75.05, 72.78, 76.91, 69.77, 82.3, 75.91, 104.04, 124.56, 110.39, 103.01, 94.41, 89.06, 94.31, 90.72, 87, 87.53, 84.62, 71.94, 74.09, 73.55, 69.83, 63.16, 61.93, 56.99, 52.09, 56.18, 63.49, 57.73, 57.02, 50.8] },
      velocityScore: { '1D': -24.7, '1W': -10.3, '1M': -66, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 298.8, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.49, PRN: false, RSHO: false, IDEF: 1, BILT: false },
      tonyNote: 'Kratos Defense is a defense technology company focused on unmanned systems, satellite communications, and high-performance computing for government customers. It appears in Industrials ETFs as an AI-adjacent defense name — autonomous systems and AI-driven surveillance are direct end markets. Revenue grew and the government contract backlog is expanding.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 2, avgWeight: 1.73, proScore: 0.69, coverage: 0.4,
      price: 283.48, weeklyPrices: [298.51, 296.89, 285.43, 278.19, 283.48], weeklyChange: -5.04, dayChange: 1.9, sortRank: 0, periodReturns: { '1M': -11.6, 'YTD': -16.6, '6M': -20, '1Y': 22.4 },
      priceHistory: { '1D': [278.19, 279.68, 279.39, 279.82, 278.82, 280.04, 281.4, 281.23, 280.9, 281.99, 282.22, 282.39, 281.98, 282.53, 282.17, 282.15, 281.7, 281.3, 280.54, 280.64, 280.75, 280.89, 282.11, 283.48], '1W': [298.51, 296.89, 285.43, 278.19, 283.48], '1M': [320.95, 317.56, 320.9, 308.17, 296.41, 293.66, 287.54, 294.53, 293.04, 292.26, 297.52, 289.13, 300.95, 297.68, 299.66, 298.51, 296.89, 285.43, 278.19, 283.48], 'YTD': [340.07, 378.47, 415.39, 424.14, 427.83, 369.38, 392.7, 443.14, 443, 437.03, 413.7, 427.99, 402.56, 379.9, 411.35, 398.13, 366.88, 361.4, 326.13, 333.56, 329.35, 320.95, 293.66, 297.52, 299.66, 283.48], '6M': [354.52, 340.07, 378.47, 418.86, 418.58, 420.51, 397.77, 406.76, 437.57, 444.52, 429.11, 415.71, 407.98, 381.79, 407.66, 394.46, 392.19, 358.4, 363.37, 316.28, 326.17, 320.63, 296.41, 292.26, 299.66, 283.48], '1Y': [231.63, 246.31, 248.92, 253.82, 265.56, 258.52, 270.92, 268, 265.4, 271.74, 269.33, 271.93, 272.46, 277.51, 286.01, 290.83, 291.94, 287.53, 299.14, 315.9, 324.19, 309.16, 314.73, 309.23, 323.14, 321.29, 354.52, 340.07, 378.47, 418.86, 418.58, 420.51, 397.77, 418.78, 438.01, 453.73, 429.11, 415.71, 407.98, 381.79, 407.66, 394.46, 392.19, 358.4, 363.37, 317.75, 326.17, 320.63, 296.41, 292.26, 299.66, 283.48] },
      velocityScore: { '1D': -22.5, '1W': -8, '1M': -67.3, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 18.4, revenueGrowth: 13, eps: 15.38, grossMargin: 12, dividendYield: 1.98,
      etfPresence: { AIRR: 2.43, PRN: false, RSHO: false, IDEF: 1.02, BILT: false },
      tonyNote: 'Huntington Ingalls Industries is the only builder of nuclear-powered aircraft carriers for the U.S. Navy. Revenue is government-contracted and predictable; the ETF allocation in Industrials reflects defense spending growth and the Navy\'s backlog of nuclear submarine and carrier construction. A steady-state quality compounder in a market structure with no competition.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 1.41, proScore: 0.56, coverage: 0.4,
      price: 75.79, weeklyPrices: [71.48, 71.25, 73.12, 74.95, 75.79], weeklyChange: 6.03, dayChange: 1.12, sortRank: 0, periodReturns: { '1M': -3.4, 'YTD': 26.1, '6M': 26.8, '1Y': 24 },
      priceHistory: { '1D': [74.95, 74.49, 75.08, 75.25, 75.48, 75.36, 75.52, 75.28, 75.03, 74.91, 75.08, 75.02, 75.14, 75.23, 75.3, 75.43, 75.24, 75.25, 75.36, 75.26, 75.07, 75.21, 75.43, 75.79], '1W': [71.48, 71.25, 73.12, 74.95, 75.79], '1M': [76.34, 74.37, 73.13, 71.39, 70.04, 71.31, 71.66, 72.43, 71.96, 71.59, 71.59, 72.26, 71.62, 72.08, 71.49, 71.48, 71.25, 73.12, 74.95, 75.79], 'YTD': [60.11, 61.15, 60.71, 63.72, 67.24, 67.42, 71.12, 72.17, 74.77, 75.77, 74.4, 72.8, 73.81, 72.78, 73.01, 70.76, 71.1, 73.04, 76.12, 74.73, 77.69, 76.34, 71.31, 71.59, 71.49, 75.79], '6M': [59.75, 60.11, 61.15, 60.29, 64.96, 67.26, 66.92, 71.13, 72.98, 74.72, 74.24, 73.34, 72.41, 73.58, 72.59, 71.54, 70.91, 71.61, 75.41, 71.96, 77.72, 78.47, 70.04, 71.59, 71.49, 75.79], '1Y': [61.12, 58.72, 57.85, 58.48, 57.71, 59.24, 59, 57.76, 56.57, 57.13, 57.73, 58.76, 59.02, 62.86, 63.69, 63.5, 62.36, 62.34, 57.59, 56.51, 60.6, 59.17, 59.37, 61.55, 60.5, 58.84, 59.75, 60.11, 61.15, 60.29, 64.96, 67.26, 66.92, 72.28, 72.98, 76.26, 74.24, 73.34, 72.41, 73.58, 72.59, 71.54, 70.91, 71.61, 75.41, 74.18, 77.72, 78.47, 70.04, 71.59, 71.49, 75.79] },
      velocityScore: { '1D': null, '1W': 1.8, '1M': null, '6M': null }, isNew: true,
      marketCap: '$93B', pe: 33.2, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.8,
      etfPresence: { AIRR: false, PRN: false, RSHO: 0.92, IDEF: false, BILT: 1.9 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RBC', name: 'RBC Bearings Incorporated', easyScore: 2, avgWeight: 1.19, proScore: 0.48, coverage: 0.4,
      price: 633.44, weeklyPrices: [621.08, 625.73, 639.18, 645.73, 633.44], weeklyChange: 1.99, dayChange: -1.9, sortRank: 0, periodReturns: { '1M': 13.1, 'YTD': 41.3, '6M': 38.6, '1Y': 63.2 },
      priceHistory: { '1D': [645.73, 629.45, 636.08, 640.11, 638.99, 639.23, 639.57, 640.53, 639.51, 640.76, 643.02, 644.29, 644.82, 645.03, 643.33, 641.78, 640.12, 639.9, 639.06, 637.02, 636.58, 631.35, 633.73, 633.44], '1W': [621.08, 625.73, 639.18, 645.73, 633.44], '1M': [584.4, 577.42, 577.83, 571.96, 566.14, 578.34, 584.18, 589.76, 590.09, 590.97, 592.41, 576.74, 607.46, 603.64, 616.95, 621.08, 625.73, 639.18, 645.73, 633.44], 'YTD': [448.43, 485, 489.33, 504.99, 511.98, 520.16, 550.53, 551.42, 576.5, 570.08, 559.52, 547.81, 561.66, 543.12, 580.55, 586.98, 588.74, 594.39, 607.5, 613.1, 551.12, 584.4, 578.34, 592.41, 616.95, 633.44], '6M': [457.07, 448.43, 485, 497.06, 504.07, 499.67, 544.02, 550.4, 559.18, 575.92, 552.91, 536.37, 531.11, 532.25, 552.4, 595.74, 596.86, 591, 593.12, 605.99, 569.06, 559.95, 566.14, 590.97, 616.95, 633.44], '1Y': [388.19, 381.43, 379.82, 389.57, 389.3, 384.87, 403.78, 404.99, 397.81, 399, 383.6, 378.08, 379.79, 378.54, 384.8, 382.19, 383.98, 392.33, 408.15, 427.24, 442.47, 423.39, 442.95, 438.15, 447.58, 444.99, 457.07, 448.43, 485, 497.06, 504.07, 499.67, 544.02, 552.44, 562.54, 584.89, 552.91, 536.37, 531.11, 532.25, 552.4, 595.74, 596.86, 591, 593.12, 613.59, 569.06, 559.95, 566.14, 590.97, 616.95, 633.44] },
      velocityScore: { '1D': -18.6, '1W': 4.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$20B', pe: 69.6, revenueGrowth: 18, eps: 9.1, grossMargin: 45, dividendYield: null,
      etfPresence: { AIRR: 1.85, PRN: false, RSHO: false, IDEF: 0.53, BILT: false },
      tonyNote: 'RBC Bearings Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRCY', name: 'Mercury Systems, Inc.', easyScore: 2, avgWeight: 1.08, proScore: 0.43, coverage: 0.4,
      price: 110.87, weeklyPrices: [112.44, 115.50, 113.91, 111.76, 110.87], weeklyChange: -1.4, dayChange: -0.8, sortRank: 0, periodReturns: { '1M': 12.5, 'YTD': 51.9, '6M': 47.7, '1Y': 121.9 },
      priceHistory: { '1D': [111.76, 110.57, 110.52, 110.84, 110.96, 111.16, 111.69, 111.72, 111.68, 111.98, 112.29, 112.75, 112.93, 113.24, 113.32, 112.88, 112.61, 112.34, 111.89, 111.59, 111.84, 111.87, 111.05, 110.87], '1W': [112.44, 115.5, 113.91, 111.76, 110.87], '1M': [99.32, 97.11, 108.11, 111.7, 111.28, 112.87, 111.59, 117.82, 111.27, 110.94, 108.82, 106.81, 119.32, 120.3, 115.93, 112.44, 115.5, 113.91, 111.76, 110.87], 'YTD': [73.01, 88.74, 98.62, 99.48, 98.29, 79.07, 80.33, 89.86, 89.58, 89.18, 86, 78.97, 78.71, 72.91, 80.81, 85.51, 82.61, 76.53, 82.96, 92.32, 93.39, 99.32, 112.87, 108.82, 115.93, 110.87], '6M': [75.07, 73.01, 88.74, 102.95, 99.05, 93.88, 82.2, 80.25, 87.63, 89.03, 86.42, 78.16, 77.26, 71.4, 75.76, 82.52, 84.12, 77.06, 78.53, 90.34, 92.03, 98.55, 111.28, 110.94, 115.93, 110.87], '1Y': [49.96, 50.63, 52.4, 51.68, 52.91, 53, 54.24, 68.02, 64.22, 67.64, 67.47, 71.7, 73.82, 74.27, 81.18, 83.92, 77.76, 78.81, 77.6, 75.71, 72.74, 67.94, 69.05, 70.23, 75.19, 69.63, 75.07, 73.01, 88.74, 102.95, 99.05, 93.88, 82.2, 82.36, 85.9, 91.01, 86.42, 78.16, 77.26, 71.4, 75.76, 82.52, 84.12, 77.06, 78.53, 91.95, 92.03, 98.55, 111.28, 110.94, 115.93, 110.87] },
      velocityScore: { '1D': -21.8, '1W': -4.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 12, eps: -0.23, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: 1.14, PRN: false, RSHO: false, IDEF: 1.03, BILT: false },
      tonyNote: 'Mercury Systems, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, avgWeight: 0.99, proScore: 0.4, coverage: 0.4,
      price: 46.38, weeklyPrices: [51.70, 52.03, 50.37, 47.70, 46.38], weeklyChange: -10.29, dayChange: -2.77, sortRank: 0, periodReturns: { '1M': -27.6, 'YTD': -36.6, '6M': -42, '1Y': -3.9 },
      priceHistory: { '1D': [47.7, 47.02, 47.56, 47.17, 47.1, 46.97, 47.17, 46.74, 46.67, 46.79, 46.89, 46.78, 47.01, 46.98, 46.85, 46.65, 46.35, 46.29, 46.46, 46.52, 46.54, 46.33, 46.32, 46.38], '1W': [51.7, 52.03, 50.37, 47.7, 46.38], '1M': [60.66, 63.52, 65.86, 57.5, 53.65, 54.65, 51.84, 54.39, 49.44, 49.64, 48.37, 45.87, 49.58, 47.83, 48.27, 51.7, 52.03, 50.37, 47.7, 46.38], 'YTD': [73.17, 101.28, 108.01, 111.61, 110.93, 89.78, 79.52, 88.46, 88.31, 98.88, 104.84, 101.43, 99.6, 80.05, 87.75, 92.73, 82.11, 70.3, 62.89, 62.48, 66.21, 60.66, 54.65, 48.37, 48.27, 46.38], '6M': [79.98, 73.17, 101.28, 109.49, 108.22, 103.8, 95.36, 78.71, 81.62, 88.11, 100.54, 99.98, 99.38, 84.07, 86.1, 87.79, 82.69, 71.95, 65.32, 60.84, 62.77, 64.1, 53.65, 49.64, 48.27, 46.38], '1Y': [48.28, 44.91, 47.57, 53.74, 49.1, 50.39, 50.39, 49.03, 49.87, 54.69, 53.26, 62.22, 64.11, 66.91, 73.47, 76.6, 77, 78.99, 85.34, 84.7, 69.38, 58.95, 64.96, 66.08, 67.27, 64.94, 79.98, 73.17, 101.28, 109.49, 108.22, 103.8, 95.36, 75.79, 81.27, 93.04, 100.54, 99.98, 99.38, 84.07, 86.1, 87.79, 82.69, 71.95, 65.32, 58.82, 62.77, 64.1, 53.65, 49.64, 48.27, 46.38] },
      velocityScore: { '1D': -24.5, '1W': -2.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: 201.7, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.8, PRN: false, RSHO: false, IDEF: 0.19, BILT: false },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DRS', name: 'Leonardo DRS, Inc.', easyScore: 2, avgWeight: 0.56, proScore: 0.22, coverage: 0.4,
      price: 45.74, weeklyPrices: [45.59, 46.58, 46.08, 44.99, 45.74], weeklyChange: 0.33, dayChange: 1.67, sortRank: 0, periodReturns: { '1M': 1.8, 'YTD': 34.2, '6M': 32.1, '1Y': 6.1 },
      priceHistory: { '1D': [44.99, 45.28, 45.65, 45.62, 45.51, 45.56, 45.87, 45.72, 45.79, 45.97, 45.89, 45.96, 45.99, 46.17, 46.08, 46.02, 45.84, 45.78, 45.69, 45.66, 45.72, 45.58, 45.69, 45.74], '1W': [45.59, 46.58, 46.08, 44.99, 45.74], '1M': [45.8, 45.35, 48.41, 48.76, 47.96, 47.39, 45.61, 46.71, 46.15, 46.55, 47.35, 46.11, 49.69, 48.53, 46.68, 45.59, 46.58, 46.08, 44.99, 45.74], 'YTD': [34.09, 38.84, 41.42, 41.28, 41.3, 37.27, 37.87, 41.07, 43.34, 46.95, 46.16, 46.44, 46.32, 44.52, 47.93, 46.29, 42.07, 40.18, 39.7, 42.87, 42.84, 45.8, 47.39, 47.35, 46.68, 45.74], '6M': [34.62, 34.09, 38.84, 42.26, 40.99, 41.06, 38.93, 37.77, 40.03, 43.39, 46.58, 45.3, 43.82, 44.84, 46.73, 47.43, 44.24, 40.72, 40, 41.36, 41.5, 44.92, 47.96, 46.55, 46.68, 45.74], '1Y': [43.12, 45.09, 47.01, 48.01, 47.53, 43.24, 41.48, 41.87, 41.17, 41.93, 41.79, 41.14, 41.54, 42.55, 44.58, 45.43, 43.85, 40.35, 40.18, 36.15, 35.59, 34, 33.78, 33.79, 34.02, 32.55, 34.62, 34.09, 38.84, 42.26, 40.99, 41.06, 38.93, 38.13, 38.14, 45.49, 46.58, 45.3, 43.82, 44.84, 46.73, 47.43, 44.24, 40.72, 40, 41.49, 41.5, 44.92, 47.96, 46.55, 46.68, 45.74] },
      velocityScore: { '1D': -21.4, '1W': -4.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 42.7, revenueGrowth: 6, eps: 1.07, grossMargin: 24, dividendYield: 0.8,
      etfPresence: { AIRR: 0.81, PRN: false, RSHO: false, IDEF: 0.3, BILT: false },
      tonyNote: 'Leonardo DRS, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TPC', name: 'Tutor Perini Corporation', easyScore: 2, avgWeight: 0.37, proScore: 0.15, coverage: 0.4,
      price: 81, weeklyPrices: [76.19, 77.89, 77.99, 81.50, 81.00], weeklyChange: 6.31, dayChange: -0.61, sortRank: 0, periodReturns: { '1M': 11.3, 'YTD': 20.9, '6M': 18, '1Y': 81.9 },
      priceHistory: { '1D': [81.5, 78.63, 79.44, 79.8, 79.63, 79.9, 79.8, 79.9, 80.23, 80.57, 80.75, 80.64, 81.22, 81.07, 81.44, 81.52, 80.86, 80.88, 80.74, 80.14, 80.56, 80.43, 80.47, 81], '1W': [76.19, 77.89, 77.99, 81.5, 81], '1M': [74.67, 74.47, 73.27, 71.49, 74.26, 74.29, 72.26, 72.38, 70.53, 72.13, 71.48, 68.72, 73.61, 74.92, 76.55, 76.19, 77.89, 77.99, 81.5, 81], 'YTD': [67.02, 70.17, 73.89, 76.79, 79.86, 79.95, 85.07, 84.9, 89.38, 73.71, 69.83, 71.21, 78.37, 77.19, 80.54, 86.25, 84.19, 86.87, 97.31, 82.69, 75.43, 74.67, 74.29, 71.48, 76.55, 81], '6M': [68.65, 67.02, 70.17, 75.17, 76.01, 78.89, 83.48, 81.73, 86.9, 75.37, 72.82, 67.76, 69.34, 76.15, 77.66, 83.8, 84.38, 87.5, 92.76, 82.85, 79.49, 72.76, 74.26, 72.13, 76.55, 81], '1Y': [44.53, 46.36, 47.45, 50.77, 49.17, 47.65, 47.66, 58.77, 56.02, 58.99, 59.03, 62.46, 63.62, 64.78, 63.75, 63.58, 63.27, 66.87, 68.4, 65.72, 62.63, 60.48, 65.16, 67.63, 67.56, 66.02, 68.65, 67.02, 70.17, 75.17, 76.01, 78.89, 83.48, 82.74, 84.99, 73.57, 72.82, 67.76, 69.34, 76.15, 77.66, 83.8, 84.38, 87.5, 92.76, 82.79, 79.49, 72.76, 74.26, 72.13, 76.55, 81] },
      velocityScore: { '1D': -16.7, '1W': 7.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 55.5, revenueGrowth: 12, eps: 1.46, grossMargin: 12, dividendYield: 0.29,
      etfPresence: { AIRR: 0.7, PRN: false, RSHO: false, IDEF: 0.04, BILT: false },
      tonyNote: 'Tutor Perini Corporation appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TKR', name: 'TIMKEN CO/THE', easyScore: 1, avgWeight: 8.69, proScore: 1.74, coverage: 0.2,
      price: 137.64, weeklyPrices: [140.28, 139.40, 142.36, 141.97, 137.64], weeklyChange: -1.88, dayChange: -3.05, sortRank: 0, periodReturns: { '1M': 14.7, 'YTD': 63.6, '6M': 59.9, '1Y': 87 },
      priceHistory: { '1D': [141.97, 136.93, 138.66, 139.24, 138.83, 138.8, 138.76, 138.52, 138.89, 139.76, 139.78, 139.65, 139.79, 139.86, 139.68, 139.38, 138.8, 138.65, 138.46, 138.2, 138.63, 138.26, 138.26, 137.64], '1W': [140.28, 139.4, 142.36, 141.97, 137.64], '1M': [127.42, 127.16, 126.78, 127.98, 126.54, 131.9, 131.82, 133.66, 131.83, 134.67, 137.09, 132.39, 137.4, 137.06, 139.12, 140.28, 139.4, 142.36, 141.97, 137.64], 'YTD': [84.13, 90.6, 91.91, 94.6, 94.15, 102.15, 108.82, 107.11, 109.88, 105.59, 103.33, 98.23, 101.9, 100.57, 105.88, 103.73, 106.79, 106.88, 109.63, 117.12, 112.73, 127.42, 131.9, 137.09, 139.12, 137.64], '6M': [86.09, 84.13, 90.6, 93.73, 93.94, 93.19, 106.04, 107.35, 108.16, 108.38, 99.68, 97.54, 95.25, 97.56, 98.94, 106.9, 108.45, 108.7, 107.12, 117.97, 114.49, 119.95, 126.54, 134.67, 139.12, 137.64], '1Y': [73.62, 75.44, 77.68, 76.68, 80.99, 74.77, 74.65, 76.91, 76.88, 78.96, 75.12, 76.4, 77.11, 75.67, 75.11, 75.86, 74.28, 77.3, 77.22, 76.29, 78.2, 74.33, 81.22, 82.52, 87.53, 84.14, 86.09, 84.13, 90.6, 93.73, 93.94, 93.19, 106.04, 107.84, 107.83, 109.99, 99.68, 97.54, 95.25, 97.56, 98.94, 106.9, 108.45, 108.7, 107.12, 117.39, 114.49, 119.95, 126.54, 134.67, 139.12, 137.64] },
      velocityScore: { '1D': null, '1W': -6.5, '1M': null, '6M': null }, isNew: true,
      marketCap: '$10B', pe: 31.3, revenueGrowth: 8, eps: 4.4, grossMargin: 31, dividendYield: 1.01,
      etfPresence: { AIRR: false, PRN: false, RSHO: 8.69, IDEF: false, BILT: false },
      tonyNote: 'TIMKEN CO/THE appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RTX', name: 'RTX CORP', easyScore: 1, avgWeight: 8.05, proScore: 1.61, coverage: 0.2,
      price: 186.39, weeklyPrices: [186.77, 192.58, 185.60, 181.83, 186.39], weeklyChange: -0.2, dayChange: 2.51, sortRank: 0, periodReturns: { '1M': 5.3, 'YTD': 1.6, '6M': 0.3, '1Y': 31.4 },
      priceHistory: { '1D': [181.83, 182.54, 183.54, 184.15, 183.88, 184.01, 184.42, 183.98, 184.07, 184.28, 184.52, 184.72, 184.93, 184.8, 184.79, 184.89, 184.99, 184.84, 184.69, 184.9, 185.41, 185.26, 185.81, 186.39], '1W': [186.77, 192.58, 185.6, 181.83, 186.39], '1M': [178.97, 176.59, 178.96, 179.66, 174.41, 174.26, 172.55, 179.41, 180.99, 178.66, 181.56, 177.41, 184.21, 183.53, 183.64, 186.77, 192.58, 185.6, 181.83, 186.39], 'YTD': [183.4, 187.17, 198.84, 196.34, 199.88, 195.97, 196.51, 205.41, 197.63, 208.82, 207.26, 204.56, 195, 192.9, 203.48, 198.39, 180.91, 175.68, 172.87, 178.89, 175.95, 178.97, 174.26, 181.56, 183.64, 186.39], '6M': [185.76, 183.4, 187.17, 199.83, 195.93, 200.93, 198.66, 201.14, 204.92, 202.62, 209.76, 204.52, 198.16, 189.71, 198.41, 201.41, 195.79, 173.38, 172.9, 176.09, 171.18, 177.01, 174.41, 178.66, 183.64, 186.39], '1Y': [141.85, 144.19, 146.18, 150.17, 156.49, 158.4, 156.33, 155.49, 153.66, 159.57, 158.11, 155, 158.31, 161.38, 167.2, 168.57, 159.4, 173.04, 178.67, 175.61, 179.22, 174.72, 172.15, 168.45, 174.72, 177.2, 185.76, 183.4, 187.17, 199.83, 195.93, 200.93, 198.66, 200.06, 201.92, 212.16, 209.76, 204.52, 198.16, 189.71, 198.41, 201.41, 195.79, 173.38, 172.9, 178.61, 171.18, 177.01, 174.41, 178.66, 183.64, 186.39] },
      velocityScore: { '1D': -19.9, '1W': 1.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$251B', pe: 35, revenueGrowth: 9, eps: 5.33, grossMargin: 20, dividendYield: 1.52,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 8.05, BILT: false },
      tonyNote: 'RTX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CGNX', name: 'COGNEX CORP', easyScore: 1, avgWeight: 7.15, proScore: 1.43, coverage: 0.2,
      price: 63.96, weeklyPrices: [65.41, 64.77, 66.10, 67.60, 63.96], weeklyChange: -2.22, dayChange: -5.38, sortRank: 0, periodReturns: { '1M': -3.2, 'YTD': 77.8, '6M': 74.5, '1Y': 108.3 },
      priceHistory: { '1D': [67.6, 64.33, 64.79, 64.92, 64.39, 64.42, 64.23, 63.89, 64, 64.39, 64.68, 64.73, 64.74, 64.88, 64.94, 64.65, 64.28, 64.1, 63.97, 63.76, 64.35, 64.46, 64.34, 63.96], '1W': [65.41, 64.77, 66.1, 67.6, 63.96], '1M': [68.33, 66.7, 66.01, 65.85, 64.64, 66.08, 66.06, 64.67, 60.82, 62.39, 61.32, 58.69, 62.11, 63.61, 65.9, 65.41, 64.77, 66.1, 67.6, 63.96], 'YTD': [35.98, 37.74, 40.06, 41.71, 39.09, 39.49, 43.03, 55.94, 55.36, 53.17, 50.99, 49.87, 51.61, 48.99, 53.78, 54.64, 54.03, 53.74, 58.83, 65.68, 61.91, 68.33, 66.08, 61.32, 65.9, 63.96], '6M': [36.66, 35.98, 37.74, 40.59, 39.76, 38.74, 42.37, 58.67, 56.03, 54.4, 49.45, 47.98, 49.24, 47.59, 49.52, 54.39, 55.48, 55.09, 56.3, 65.66, 64.26, 66.09, 64.64, 62.39, 65.9, 63.96], '1Y': [30.71, 32.05, 33.32, 33.32, 34.61, 33.76, 41.86, 42.2, 43.4, 43.89, 43.97, 44.4, 44.08, 45.52, 45.83, 46.75, 45.23, 48.27, 47.29, 40, 38.4, 35.91, 37.76, 37.69, 37.91, 35.76, 36.66, 35.98, 37.74, 40.59, 39.76, 38.74, 42.37, 58.79, 56.47, 53.83, 49.45, 47.98, 49.24, 47.59, 49.52, 54.39, 55.48, 55.09, 56.3, 67.26, 64.26, 66.09, 64.64, 62.39, 65.9, 63.96] },
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
      price: 275.25, weeklyPrices: [265.10, 280.91, 286.69, 283.61, 275.25], weeklyChange: 3.83, dayChange: -2.95, sortRank: 0, periodReturns: { '1M': 28.2, 'YTD': 228.8, '6M': 205.7, '1Y': 439.5 },
      priceHistory: { '1D': [283.61, 272.75, 292.43, 293.4, 285.15, 277.33, 275.83, 275.8, 274.62, 279.77, 278.92, 279.95, 278.34, 279.45, 282.52, 281.11, 278.55, 278.86, 277.87, 275.85, 275.37, 277.04, 272.83, 275.25], '1W': [265.1, 280.91, 286.69, 283.61, 275.25], '1M': [208.06, 208.37, 226.34, 231.09, 264.51, 260.58, 251.68, 259.67, 227.81, 218, 220.12, 211.69, 222.24, 232.36, 260.07, 265.1, 280.91, 286.69, 283.61, 275.25], 'YTD': [83.71, 97.3, 101.98, 96.85, 94.91, 73.87, 88.61, 107.61, 104.88, 97.78, 112, 118.56, 115.09, 103.76, 125, 166.77, 156.14, 135.51, 175.92, 179.11, 199.86, 208.06, 260.58, 220.12, 260.07, 275.25], '6M': [90.03, 83.71, 97.3, 103.89, 94.5, 85.19, 86.1, 89.73, 97.92, 91.19, 89.33, 112.95, 117.62, 100.82, 112.54, 154.56, 159.16, 144.96, 176.42, 177.05, 219.94, 214.77, 264.51, 218, 260.07, 275.25], '1Y': [51.02, 50.31, 46.05, 53.31, 51.88, 51.29, 55.17, 75.33, 67.19, 70.48, 65.65, 93.39, 94.08, 113.23, 115.61, 122, 128.15, 104.28, 121.83, 110.54, 102.22, 90.54, 88.88, 98.92, 93.59, 75.45, 90.03, 83.71, 97.3, 103.89, 94.5, 85.19, 86.1, 98.01, 100.61, 91.01, 89.33, 112.95, 117.62, 100.82, 112.54, 154.56, 159.16, 144.96, 176.42, 186.1, 219.94, 214.77, 264.51, 218, 260.07, 275.25] },
      velocityScore: { '1D': 0, '1W': 23.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$70B', pe: 106.7, revenueGrowth: 684, eps: 2.58, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 3.83, MEME: 6.84, RKNG: 5.75 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 3, avgWeight: 4.17, proScore: 4.17, coverage: 1,
      price: 54.72, weeklyPrices: [59.18, 58.11, 59.96, 56.87, 54.72], weeklyChange: -7.54, dayChange: -3.78, sortRank: 0, periodReturns: { '1M': -3.7, 'YTD': 44.9, '6M': 30.1, '1Y': 374.2 },
      priceHistory: { '1D': [56.87, 55.67, 56.88, 57.19, 56.42, 55.33, 55.16, 54.88, 54.88, 55.25, 55.92, 55.88, 55.52, 55.51, 56.15, 55.83, 55.29, 55.22, 54.94, 54.59, 54.71, 54.91, 54.2, 54.72], '1W': [59.18, 58.11, 59.96, 56.87, 54.72], '1M': [59.78, 67.84, 64.05, 63.54, 65.33, 66.6, 65.48, 61.86, 54.35, 59.19, 54.02, 51.52, 56.71, 59.77, 60.85, 59.18, 58.11, 59.96, 56.87, 54.72], 'YTD': [37.77, 45.68, 52.88, 52.26, 59.84, 39.79, 42.67, 43.29, 44.24, 43.84, 41.98, 42.21, 41.43, 34.28, 36.83, 48.82, 48.39, 44.44, 54.74, 56.56, 50.46, 59.78, 66.6, 54.02, 60.85, 54.72], '6M': [42.07, 37.77, 45.68, 51.89, 56.68, 53.74, 41.83, 40.03, 39.98, 40.95, 36.7, 41.58, 41.29, 35.09, 35.13, 43.07, 48.72, 48.36, 49.48, 61.2, 52.94, 56.83, 65.33, 59.19, 60.85, 54.72], '1Y': [11.54, 15.23, 16.96, 17.31, 18.99, 16.14, 16.45, 17.83, 18.73, 22.99, 28.21, 33.63, 37.9, 47.14, 47.08, 60.09, 69.56, 55.19, 62.42, 66.63, 57.38, 48.85, 47.47, 43.96, 43.92, 33.78, 42.07, 37.77, 45.68, 51.89, 56.68, 53.74, 41.83, 42.22, 42.36, 41.39, 36.7, 41.58, 41.29, 35.09, 35.13, 43.07, 48.72, 48.36, 49.48, 55.15, 52.94, 56.83, 65.33, 59.19, 60.85, 54.72] },
      velocityScore: { '1D': 0, '1W': 6.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$20B', pe: 71.1, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 3.03, MEME: 6.27, RKNG: 3.22 },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 3, avgWeight: 4.07, proScore: 4.07, coverage: 1,
      price: 45.27, weeklyPrices: [46.27, 45.57, 46.59, 45.20, 45.27], weeklyChange: -2.16, dayChange: 0.15, sortRank: 0, periodReturns: { '1M': -1.3, 'YTD': 84.6, '6M': 73.6, '1Y': 338.7 },
      priceHistory: { '1D': [45.2, 44.62, 45.74, 45.83, 45.86, 45.24, 45.17, 45.16, 45.32, 46.08, 46.4, 46.28, 45.68, 45.66, 46.05, 45.78, 45.64, 45.33, 45.01, 44.71, 45, 45.23, 45.06, 45.27], '1W': [46.27, 45.57, 46.59, 45.2, 45.27], '1M': [45.14, 48.98, 49.65, 47.28, 47.94, 47.86, 44.71, 44.15, 39.62, 40.94, 41.91, 38.92, 41.47, 42.7, 46.47, 46.27, 45.57, 46.59, 45.2, 45.27], 'YTD': [24.52, 31.94, 36.1, 34.74, 38.07, 27.84, 36.6, 31.53, 28.65, 28.65, 28.52, 26.65, 28.37, 23.74, 27.79, 30.81, 32.43, 32.11, 39.88, 43.93, 39.14, 45.14, 47.86, 41.91, 46.47, 45.27], '6M': [26.08, 24.52, 31.94, 35.22, 37.69, 33.88, 34.95, 36.17, 29.04, 27.27, 25.14, 27.05, 25.93, 23.76, 25.19, 27.6, 32.19, 33.67, 35.63, 41.25, 42.56, 45.87, 47.94, 40.94, 46.47, 45.27], '1Y': [10.32, 9.76, 9.51, 10.06, 10.93, 10.03, 14.89, 14.97, 15.34, 16.47, 14.38, 16.98, 19.83, 23.45, 25, 27.94, 35.04, 32.54, 34.33, 31.06, 28.57, 22.84, 23.74, 29.36, 30.99, 22, 26.08, 24.52, 31.94, 35.22, 37.69, 33.88, 34.95, 35.28, 30, 27.93, 25.14, 27.05, 25.93, 23.76, 25.19, 27.6, 32.19, 33.67, 35.63, 44.59, 42.56, 45.87, 47.94, 40.94, 46.47, 45.27] },
      velocityScore: { '1D': 0, '1W': 10.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.53, MEME: 5.81, RKNG: 3.87 },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 3, avgWeight: 3.85, proScore: 3.85, coverage: 1,
      price: 72.87, weeklyPrices: [82.25, 85.43, 80.66, 73.19, 72.87], weeklyChange: -11.4, dayChange: -0.44, sortRank: 0, periodReturns: { '1M': -31.2, 'YTD': 0.3, '6M': -14.9, '1Y': 36.9 },
      priceHistory: { '1D': [73.19, 73.82, 77.33, 76.29, 76.2, 75.47, 75.54, 75.19, 75.75, 77.15, 76.17, 76.05, 75.87, 76.18, 75.86, 74.81, 74.21, 74.04, 73.82, 73.83, 73.67, 73.83, 72.42, 72.87], '1W': [82.25, 85.43, 80.66, 73.19, 72.87], '1M': [119.7, 129.6, 133.09, 113.41, 105.65, 118.17, 107.73, 107.29, 93.6, 92.06, 88.71, 87.32, 97.56, 82.41, 87.57, 82.25, 85.43, 80.66, 73.19, 72.87], 'YTD': [72.63, 90.56, 95.22, 116.37, 122.09, 93.27, 96.92, 86.4, 85.76, 104.89, 88.21, 90.74, 96.06, 82.87, 96.46, 86.91, 84.66, 71.88, 63.87, 72.96, 86.83, 119.7, 118.17, 88.71, 87.57, 72.87], '6M': [85.67, 72.63, 90.56, 101.25, 113.57, 111.21, 101.79, 82.22, 80.2, 79.19, 89.47, 86.34, 89.93, 78.67, 94.81, 98.97, 81, 77.2, 68.43, 75.05, 83.67, 105.86, 105.65, 92.06, 87.57, 72.87], '1Y': [53.22, 45.11, 42.5, 52.63, 58.92, 54.29, 52.57, 49.76, 44.95, 50.43, 45.22, 37.58, 41.19, 54.5, 56.94, 81.2, 94.5, 78.61, 77.77, 70.05, 67.89, 58.22, 55.51, 61.44, 79.05, 61.86, 85.67, 72.63, 90.56, 101.25, 113.57, 111.21, 101.79, 82.51, 83.9, 86.92, 89.47, 86.34, 89.93, 78.67, 94.81, 98.97, 81, 77.2, 68.43, 82.55, 83.67, 105.86, 105.65, 92.06, 87.57, 72.87] },
      velocityScore: { '1D': 0, '1W': -3.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$28B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.88, MEME: 6.38, RKNG: 2.29 },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 6.68, proScore: 4.45, coverage: 0.667,
      price: 1963.6, weeklyPrices: [1991.55, 1958.80, 2184.75, 2273.73, 1963.60], weeklyChange: -1.4, dayChange: -13.64, sortRank: 0, periodReturns: { '1M': 32.8, 'YTD': 727.2, '6M': 701.8, '1Y': 4047.9 },
      priceHistory: { '1D': [2273.73, 1965, 1993.11, 2040.01, 1998.99, 1995.46, 1990.76, 1987.71, 1987.5, 2003.18, 2013.35, 1992, 1987.09, 1980.32, 1986.08, 1980.19, 1956.28, 1957.63, 1957.02, 1957.11, 1962.34, 1976.82, 1955.54, 1963.6], '1W': [1991.55, 1958.8, 2184.75, 2273.73, 1963.6], '1M': [1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6], 'YTD': [237.38, 334.54, 387.81, 503.44, 539.3, 576.2, 599.34, 621.09, 651.9, 599.06, 655.43, 753.69, 677.86, 635.34, 780.9, 891.72, 979.07, 1002.35, 1406.32, 1452.02, 1333.01, 1589.55, 1716.36, 1646.54, 2107.86, 1963.6], '6M': [244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 630.29, 649.97, 635.36, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1562.34, 1407.61, 1478.69, 1761.43, 1642, 2107.86, 1963.6], '1Y': [47.34, 44.96, 46.2, 41.36, 43, 43.39, 41.93, 46.83, 44.58, 47.35, 53.01, 73.92, 93.97, 99.83, 121.12, 131.88, 127.29, 149.29, 175.53, 194.57, 271.58, 244.93, 220.5, 194.38, 232.86, 206.83, 244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1407.61, 1478.69, 1761.43, 1642, 2107.86, 1963.6] },
      velocityScore: { '1D': 0, '1W': 7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$291B', pe: 66.9, revenueGrowth: 251, eps: 29.33, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.48, RKNG: 6.87 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 2, avgWeight: 5.85, proScore: 3.9, coverage: 0.667,
      price: 147.44, weeklyPrices: [170.81, 167.34, 161.85, 171.23, 147.44], weeklyChange: -13.68, dayChange: -13.89, sortRank: 0, periodReturns: { '1M': -18.8, 'YTD': 322.9, '6M': 262.8, '1Y': 533.1 },
      priceHistory: { '1D': [171.23, 155.6, 159.17, 158.59, 156.21, 155.18, 153.52, 151.91, 153.08, 152.25, 152.35, 152.85, 152.81, 151.84, 151.26, 151.17, 149.15, 149.02, 147.89, 146.82, 146.65, 148.17, 147.62, 147.44], '1W': [170.81, 167.34, 161.85, 171.23, 147.44], '1M': [177.62, 179.83, 169.02, 158.41, 185.67, 202.37, 184.07, 202.89, 177, 196.64, 162.88, 175.13, 172.78, 169.05, 191.55, 170.81, 167.34, 161.85, 171.23, 147.44], 'YTD': [34.86, 33.01, 34.47, 38.15, 39.57, 38.13, 48.4, 46.98, 53.69, 99.71, 127.01, 92.63, 114.41, 84.59, 132.7, 142.55, 149.42, 137.26, 180.57, 188.28, 173.26, 177.62, 202.37, 162.88, 191.55, 147.44], '6M': [40.64, 34.86, 33.01, 37, 35.72, 43.61, 44.3, 43.99, 51.68, 84.23, 95.58, 96.81, 87.54, 98.21, 107.45, 153.19, 163.47, 145.78, 172.98, 148.94, 190.36, 181.49, 185.67, 196.64, 191.55, 147.44], '1Y': [23.29, 25.35, 27.92, 28.99, 26.31, 23.06, 21.42, 22.79, 22.77, 25.07, 23.02, 27.72, 29.47, 26.69, 28.42, 32.22, 28.48, 33.4, 36.87, 29.5, 23.75, 20.89, 22.73, 25.65, 34.98, 27.14, 40.64, 34.86, 33.01, 37, 35.72, 43.61, 44.3, 44.46, 53.96, 102.51, 95.58, 96.81, 87.54, 98.21, 107.45, 153.19, 163.47, 145.78, 172.98, 184.9, 190.36, 181.49, 185.67, 196.64, 191.55, 147.44] },
      velocityScore: { '1D': 0, '1W': 3.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 7.73, RKNG: 3.97 },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 2, avgWeight: 5.81, proScore: 3.87, coverage: 0.667,
      price: 670.75, weeklyPrices: [681.08, 712.13, 746.23, 732.62, 670.75], weeklyChange: -1.52, dayChange: -8.45, sortRank: 0, periodReturns: { '1M': 38.5, 'YTD': 289.4, '6M': 276.3, '1Y': 980.6 },
      priceHistory: { '1D': [732.62, 662.65, 664.92, 677.38, 661.2, 660, 661.64, 662.44, 666.46, 673.29, 677.25, 676.31, 673.05, 674.83, 671.9, 671.03, 668.95, 668.75, 669.17, 665.62, 669.46, 672.34, 670.75, 670.75], '1W': [681.08, 712.13, 746.23, 732.62, 670.75], '1M': [524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75], 'YTD': [172.27, 187.68, 215, 243.29, 278.41, 260.19, 273.74, 284.67, 282.25, 261.3, 268.81, 304.9, 296.14, 270.49, 338.78, 365, 389.1, 390.99, 465.26, 488.74, 458.68, 524.65, 563.1, 517.72, 653.53, 670.75], '6M': [178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 284.1, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 480, 482.02, 484.28, 546.2, 526.93, 653.53, 670.75], '1Y': [62.07, 63.84, 64.64, 66.53, 69.32, 71.43, 75.84, 75.91, 75.86, 79.71, 86, 95.02, 100.94, 109.69, 130.59, 121.18, 113.13, 121.41, 124.92, 152.18, 169.99, 152.86, 155.41, 155.59, 181.95, 166.26, 178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 482.02, 484.28, 546.2, 526.93, 653.53, 670.75] },
      velocityScore: { '1D': 0, '1W': 151.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$231B', pe: 40.2, revenueGrowth: 46, eps: 16.7, grossMargin: 45, dividendYield: 0.08,
      etfPresence: { BUZZ: false, MEME: 5.63, RKNG: 5.99 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 5.46, proScore: 3.64, coverage: 0.667,
      price: 321.98, weeklyPrices: [280.88, 284.99, 328.91, 345.85, 321.98], weeklyChange: 14.63, dayChange: -6.9, sortRank: 0, periodReturns: { '1M': 6.4, 'YTD': 270.6, '6M': 252.2, '1Y': 1303 },
      priceHistory: { '1D': [345.85, 306, 322.79, 325.3, 320.26, 316.61, 322, 321.19, 320.92, 325.2, 326.18, 328.48, 327.73, 327.63, 328.04, 326.51, 322.24, 321.05, 320, 317.48, 320.34, 320.89, 320.83, 321.98], '1W': [280.88, 284.99, 328.91, 345.85, 321.98], '1M': [302.4, 293.8, 290.01, 285, 273.51, 302.85, 287.32, 291.37, 263.61, 253.57, 259.61, 234.23, 248.88, 260.22, 274.5, 280.88, 284.99, 328.91, 345.85, 321.98], 'YTD': [86.89, 121.84, 133.46, 145.63, 156.51, 136.6, 155.54, 159, 168.57, 164.78, 159.21, 156.58, 150.22, 135.49, 146.78, 213.84, 229.75, 226.37, 295.25, 280.69, 258.71, 302.4, 302.85, 259.61, 274.5, 321.98], '6M': [91.43, 86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.03, 147.55, 155.67, 135.19, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 288.64, 261.03, 275.95, 302.49, 273.51, 253.57, 274.5, 321.98], '1Y': [22.95, 22.13, 28.71, 24.69, 26.89, 37.62, 37.61, 41.25, 43.1, 49.94, 52.45, 62.96, 79.67, 69.18, 90.19, 87.58, 114.06, 104.38, 113.28, 129.05, 127.07, 104.97, 94.29, 102.5, 101.29, 76.97, 91.43, 86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 160.28, 166, 135.19, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 288.64, 283.92, 275.95, 302.49, 273.51, 253.57, 274.5, 321.98] },
      velocityScore: { '1D': 0, '1W': 14.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$92B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.69, RKNG: 4.24 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 2, avgWeight: 5.02, proScore: 3.34, coverage: 0.667,
      price: 1051.77, weeklyPrices: [1020.76, 1043.19, 1133.99, 1211.38, 1051.77], weeklyChange: 3.04, dayChange: -13.18, sortRank: 0, periodReturns: { '1M': 40, 'YTD': 268.5, '6M': 280.7, '1Y': 722.3 },
      priceHistory: { '1D': [1211.38, 1069, 1101.16, 1119.47, 1092.35, 1083.86, 1082.11, 1075.75, 1077.68, 1091.87, 1089.06, 1083.66, 1078.91, 1076.83, 1076.45, 1069, 1058.69, 1056.24, 1053.9, 1041.25, 1050.66, 1050.72, 1050, 1051.77], '1W': [1020.76, 1043.19, 1133.99, 1211.38, 1051.77], '1M': [895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77], 'YTD': [285.41, 327.02, 333.35, 397.58, 435.79, 382.89, 410.34, 417.35, 415.56, 400.77, 418.69, 461.73, 382.09, 337.84, 406.73, 456.23, 487.48, 504.29, 640.2, 766.58, 681.54, 895.88, 1064.1, 935.89, 1087.99, 1051.77], '6M': [276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 746.81, 724.66, 751, 1035.5, 949.28, 1087.99, 1051.77], '1Y': [127.91, 120.89, 122.24, 116.43, 109.83, 114.74, 109.06, 127.75, 122.05, 116.5, 118.72, 140, 159.99, 161.71, 182.15, 196.54, 187.06, 202.29, 221.91, 218.03, 241.11, 228.5, 224.53, 234.16, 263.71, 225.52, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 724.66, 751, 1035.5, 949.28, 1087.99, 1051.77] },
      velocityScore: { '1D': 0, '1W': 4.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 49.6, revenueGrowth: 196, eps: 21.2, grossMargin: 58, dividendYield: 0.05,
      etfPresence: { BUZZ: 4.32, MEME: false, RKNG: 5.71 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'LITE', name: 'LITE', easyScore: 2, avgWeight: 4.42, proScore: 2.95, coverage: 0.667,
      price: 827.92, weeklyPrices: [875.36, 869.98, 850.00, 893.93, 827.92], weeklyChange: -5.42, dayChange: -7.38, sortRank: 0, periodReturns: { '1M': -12.6, 'YTD': 124.6, '6M': 113.7, '1Y': 801.8 },
      priceHistory: { '1D': [893.93, 821.69, 846.8, 851.58, 839.36, 831.9, 828.55, 825, 824, 833.7, 835.99, 832.56, 830.21, 830.05, 832.8, 828.4, 824, 821.41, 820.69, 815.36, 820.04, 821.88, 822.2, 827.92], '1W': [875.36, 869.98, 850, 893.93, 827.92], '1M': [910.81, 902.31, 860.62, 854.96, 905, 1029.15, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93, 827.92], 'YTD': [368.59, 348.26, 331.62, 354.49, 381.44, 504.42, 574.11, 635.64, 677, 680.8, 672, 700.81, 777.17, 702.76, 896.02, 824.01, 873.6, 791.37, 994.56, 992.37, 884.98, 910.81, 1029.15, 821.76, 957.24, 827.92], '6M': [387.41, 368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 583.46, 667.77, 700.91, 558.44, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 903.8, 970.7, 946.9, 905, 895.4, 957.24, 827.92], '1Y': [91.81, 91.49, 90.44, 99.63, 102.13, 109.85, 108.15, 119.66, 117.96, 124.62, 134.12, 164.88, 163.34, 152.75, 171.4, 163.09, 156.78, 162.95, 198.39, 188.36, 252.47, 247.43, 291.27, 302.98, 366, 320.25, 387.41, 368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 674.73, 783.25, 558.44, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 1053.09, 970.7, 946.9, 905, 895.4, 957.24, 827.92] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$64B', pe: 144.7, revenueGrowth: 90, eps: 5.72, grossMargin: 41, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.68, RKNG: 3.17 },
      tonyNote: 'LITE appears in 2 of 3 Meme ETFs (67% coverage) with average weight 4.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 2, avgWeight: 3.83, proScore: 2.55, coverage: 0.667,
      price: 57.85, weeklyPrices: [56.06, 54.69, 56.55, 58.32, 57.85], weeklyChange: 3.19, dayChange: -0.81, sortRank: 0, periodReturns: { '1M': -9.1, 'YTD': 28.9, '6M': 12.6, '1Y': 41.6 },
      priceHistory: { '1D': [58.32, 61.15, 60.47, 59.68, 59.42, 58.23, 58.78, 58.65, 58.35, 58.95, 57.94, 58.19, 57.76, 57.76, 58.12, 57.81, 57.55, 57.31, 57.14, 56.79, 57.08, 57.76, 57.76, 57.85], '1W': [56.06, 54.69, 56.55, 58.32, 57.85], '1M': [63.62, 65.4, 70.14, 72.07, 69.28, 71.4, 68.23, 65.66, 56.78, 62.8, 56.69, 56.63, 57.99, 57.85, 61.18, 56.06, 54.69, 56.55, 58.32, 57.85], 'YTD': [44.87, 50.45, 50.88, 49.33, 43.24, 30.43, 33.61, 33.43, 40.88, 37.13, 34.27, 32.38, 31.96, 28.83, 28.99, 43.25, 47.36, 43.08, 48, 55.87, 49.31, 63.62, 71.4, 56.69, 61.18, 57.85], '6M': [51.39, 44.87, 50.45, 47.56, 47.25, 39.98, 34.99, 31.3, 31.9, 38.37, 35.73, 32.98, 31.2, 27.51, 29.24, 29.76, 48.32, 43.84, 45.75, 49.24, 51.95, 63.64, 69.28, 62.8, 61.18, 57.85], '1Y': [40.86, 40.1, 45.56, 43.54, 43.28, 39.88, 42.02, 43, 36.8, 40.75, 40.97, 43.86, 65.44, 73.86, 63.09, 74.3, 77.55, 59.5, 57.15, 53.38, 54.42, 49.12, 47.06, 48.65, 51.67, 45.85, 51.39, 44.87, 50.45, 47.56, 47.25, 39.98, 34.99, 34.11, 30.78, 38.34, 35.73, 32.98, 31.2, 27.51, 29.24, 29.76, 48.32, 43.84, 45.75, 56.89, 51.95, 63.64, 69.28, 62.8, 61.18, 57.85] },
      velocityScore: { '1D': 0, '1W': 10.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$22B', pe: 148.3, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: 1.78, MEME: 5.88, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'RGTI', name: 'Rigetti Computing', easyScore: 2, avgWeight: 3.06, proScore: 2.04, coverage: 0.667,
      price: 21.28, weeklyPrices: [20.64, 20.25, 21.36, 21.38, 21.28], weeklyChange: 3.1, dayChange: -0.47, sortRank: 0, periodReturns: { '1M': -19.5, 'YTD': -3.9, '6M': -15.3, '1Y': 85 },
      priceHistory: { '1D': [21.38, 22.42, 22.48, 22.04, 21.86, 21.53, 21.69, 21.42, 21.36, 21.74, 21.31, 21.45, 21.32, 21.39, 21.66, 21.44, 21.2, 21.04, 20.94, 20.77, 20.99, 21.36, 21.16, 21.28], '1W': [20.64, 20.25, 21.36, 21.38, 21.28], '1M': [25.07, 24.62, 27.03, 25.54, 25.63, 26.88, 24.09, 24.16, 20.68, 21.76, 19.69, 19.44, 20.63, 20.98, 22.7, 20.64, 20.25, 21.36, 21.38, 21.28], 'YTD': [22.15, 25.25, 25.72, 24.96, 19.85, 14.98, 16.43, 16.6, 18.64, 17.76, 16.94, 15.67, 15.14, 14.04, 14.53, 19.11, 18.38, 16.39, 18.27, 19.07, 16.62, 25.07, 26.88, 19.69, 22.7, 21.28], '6M': [25.11, 22.15, 25.25, 24.7, 23.45, 18.17, 17.71, 14.99, 15.92, 17.42, 17.01, 16.17, 14.88, 13.32, 14.2, 15.13, 19.64, 16.91, 17.7, 18.94, 17.85, 26.42, 25.63, 21.76, 22.7, 21.28], '1Y': [11.5, 11.33, 13.51, 16.56, 16.14, 14.17, 16.47, 16.2, 15.16, 15.3, 15.04, 16.19, 21.99, 31.64, 29.85, 43.23, 56.12, 40, 37.07, 35.18, 31.4, 25.71, 26.08, 26.04, 26.12, 22.47, 25.11, 22.15, 25.25, 24.7, 23.45, 18.17, 17.71, 16.09, 16.02, 17.69, 17.01, 16.17, 14.88, 13.32, 14.2, 15.13, 19.64, 16.91, 17.7, 20.51, 17.85, 26.42, 25.63, 21.76, 22.7, 21.28] },
      velocityScore: { '1D': 0, '1W': -4.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 199, eps: -0.89, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.25, RKNG: 2.88 },
      tonyNote: 'Rigetti Computing is a quantum hardware company using superconducting qubit technology. It holds a position in Meme ETFs alongside IonQ and D-Wave as part of the quantum computing basket. Revenue is minimal, the technology is earlier-stage than IonQ, and the ETF allocation is speculative. The weight score is low; this is a high-risk, long-duration positioning.',
    },
    {
      ticker: 'GOOGL', name: 'GOOGL', easyScore: 2, avgWeight: 2.15, proScore: 1.43, coverage: 0.667,
      price: 346.13, weeklyPrices: [373.25, 363.79, 368.03, 349.68, 346.13], weeklyChange: -7.27, dayChange: -0.98, sortRank: 0, periodReturns: { '1M': -9.6, 'YTD': 10.6, '6M': 10.1, '1Y': 107.5 },
      priceHistory: { '1D': [349.56, 347.31, 347.97, 347.88, 347.48, 348.17, 346.94, 345.43, 346.02, 346.19, 345.92, 347.54, 347.87, 347.63, 347.81, 347.7, 346.73, 346.47, 346.47, 346.45, 346.86, 346.93, 347.75, 346.13], '1W': [373.25, 363.79, 368.03, 349.68, 346.13], '1M': [388.88, 388.83, 390.13, 380.34, 376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68, 369.35, 373.25, 363.79, 368.03, 349.68, 346.13], 'YTD': [313, 325.44, 335.84, 330.54, 338.25, 331.25, 310.96, 302.85, 307.38, 303.13, 308.7, 307.69, 290.93, 287.56, 317.32, 337.12, 339.32, 349.78, 388.43, 387.35, 396.94, 388.88, 361.85, 364.26, 369.35, 346.13], '6M': [314.35, 313, 325.44, 332.78, 327.93, 338, 322.86, 309, 314.98, 311.76, 298.52, 302.28, 301, 274.34, 299.99, 321.31, 337.42, 350.34, 383.25, 400.8, 396.78, 382.97, 376.37, 363.31, 369.35, 346.13], '1Y': [166.77, 175.84, 176.62, 182.97, 190.23, 196.53, 194.67, 203.34, 201.57, 207.14, 230.66, 239.17, 249.53, 247.14, 244.9, 244.62, 245.45, 250.46, 267.47, 277.54, 291.31, 284.28, 323.44, 319.63, 320.21, 296.72, 314.35, 313, 325.44, 332.78, 327.93, 338, 322.86, 305.72, 311.49, 306.52, 298.52, 302.28, 301, 274.34, 299.99, 321.31, 337.42, 350.34, 383.25, 388.64, 396.78, 382.97, 376.37, 363.31, 369.35, 346.13] },
      velocityScore: { '1D': 0, '1W': -1.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.2T', pe: 26.4, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { BUZZ: 1.54, MEME: false, RKNG: 2.76 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'RDW', name: 'Redwire', easyScore: 1, avgWeight: 6.82, proScore: 2.27, coverage: 0.333,
      price: 12.22, weeklyPrices: [13.50, 14.36, 14.35, 13.02, 12.22], weeklyChange: -9.48, dayChange: -6.14, sortRank: 0, periodReturns: { '1M': -30.1, 'YTD': 60.8, '6M': 52.6, '1Y': -26.1 },
      priceHistory: { '1D': [13.02, 12.83, 13.08, 12.91, 12.94, 12.77, 12.84, 12.66, 12.63, 12.8, 12.68, 12.73, 12.67, 12.77, 12.72, 12.66, 12.49, 12.43, 12.41, 12.44, 12.43, 12.4, 12.26, 12.22], '1W': [13.5, 14.36, 14.35, 13.02, 12.22], '1M': [22.04, 24, 25.9, 24.57, 20.68, 20.58, 18.62, 21.43, 18.45, 18.57, 15.75, 14.87, 17.09, 15.12, 14.83, 13.5, 14.36, 14.35, 13.02, 12.22], 'YTD': [7.6, 10.28, 11.02, 11.98, 12.81, 8.8, 9.01, 8.6, 9.55, 9.28, 9.46, 9.55, 9.16, 8.5, 9.61, 9.91, 11.93, 9.04, 8.69, 11.56, 13.96, 22.04, 20.58, 15.75, 14.83, 12.22], '6M': [8.01, 7.6, 10.28, 10.86, 12.52, 11.75, 10.04, 7.89, 7.99, 9.07, 8.55, 9.59, 9.2, 8.16, 9.91, 9.99, 10.21, 9.33, 8.64, 11.07, 14.06, 17.49, 20.68, 18.57, 14.83, 12.22], '1Y': [16.53, 15.31, 15.78, 17.5, 16.92, 14.06, 14.71, 9.42, 8.84, 9.29, 8.32, 8.23, 7.87, 9.35, 9.16, 9.79, 9.54, 7.97, 7.85, 6.95, 6.13, 5.43, 5.41, 5.57, 7.48, 6.44, 8.01, 7.6, 10.28, 10.86, 12.52, 11.75, 10.04, 8.02, 8.12, 9.52, 8.55, 9.59, 9.2, 8.16, 9.91, 9.99, 10.21, 9.33, 8.64, 12.16, 14.06, 17.49, 20.68, 18.57, 14.83, 12.22] },
      velocityScore: { '1D': 0, '1W': 8.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2B', pe: null, revenueGrowth: 58, eps: -2.59, grossMargin: 13, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.82, RKNG: false },
      tonyNote: 'Redwire Corp is a space infrastructure company — solar arrays, structures, and manufacturing in orbit. It appears in Meme and speculative ETFs as a high-risk space economy play. Revenue is growing from a small base but the business is pre-profitability; the ETF weight is minimal and reflects thematic positioning rather than fundamental conviction.',
    },
    {
      ticker: 'QBTS', name: 'D-Wave Quantum', easyScore: 1, avgWeight: 5.7, proScore: 1.9, coverage: 0.333,
      price: 25.03, weeklyPrices: [23.94, 22.92, 24.69, 24.47, 25.03], weeklyChange: 4.55, dayChange: 2.29, sortRank: 0, periodReturns: { '1M': -14.9, 'YTD': -4.3, '6M': -14, '1Y': 67.2 },
      priceHistory: { '1D': [24.47, 26.59, 26.41, 26.01, 26.02, 25.42, 25.67, 25.48, 25.39, 25.75, 25.35, 25.48, 25.43, 25.36, 25.6, 25.42, 25.1, 24.94, 24.85, 24.66, 24.97, 25.23, 24.99, 25.03], '1W': [23.94, 22.92, 24.69, 24.47, 25.03], '1M': [27.82, 27.48, 29.49, 30.14, 29.18, 29.91, 27.55, 27.64, 23.85, 25.83, 23.52, 23.25, 23.82, 23.37, 26.26, 23.94, 22.92, 24.69, 24.47, 25.03], 'YTD': [26.15, 29.28, 30.15, 27.43, 23.22, 17.21, 19.64, 19.38, 20.14, 18.91, 18.91, 16.49, 16.19, 14.43, 14.57, 20.81, 21.24, 18.11, 21.54, 22.35, 19.06, 27.82, 29.91, 23.52, 26.26, 25.03], '6M': [29.12, 26.15, 29.28, 28.72, 25.63, 21.22, 20.72, 18.82, 18.06, 18.78, 18.59, 17.55, 15.73, 13.9, 14.14, 14.65, 21.66, 18.8, 20.92, 22.57, 20.35, 29.4, 29.18, 25.83, 26.26, 25.03], '1Y': [14.97, 14.82, 16.39, 16.91, 20.3, 17.06, 18.3, 18.51, 15.32, 15.45, 15.3, 16.04, 22.54, 27.72, 25.63, 34.25, 43.06, 32.19, 32, 29.74, 28.99, 22.93, 22.59, 25.08, 26.8, 23.8, 29.12, 26.15, 29.28, 28.72, 25.63, 21.22, 20.72, 19.67, 18.05, 18.94, 18.59, 17.55, 15.73, 13.9, 14.14, 14.65, 21.66, 18.8, 20.92, 24.03, 20.35, 29.4, 29.18, 25.83, 26.26, 25.03] },
      velocityScore: { '1D': 0, '1W': 11.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: -81, eps: -1.14, grossMargin: 66, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.7, RKNG: false },
      tonyNote: 'D-Wave Quantum is a quantum computing company — the only publicly traded business built around quantum annealing hardware. Revenue is minimal and profitability is many years away, but it holds a position in Meme ETFs as the purest-play quantum computing stock available to retail investors. The ETF weight is small and the position is purely thematic.',
    },
    {
      ticker: 'NVTS', name: 'Navitas Semiconductor', easyScore: 1, avgWeight: 5.08, proScore: 1.69, coverage: 0.333,
      price: 21.4, weeklyPrices: [22.09, 22.34, 24.02, 23.70, 21.40], weeklyChange: -3.12, dayChange: -9.7, sortRank: 0, periodReturns: { '1M': -26.8, 'YTD': 199.7, '6M': 179.4, '1Y': 191.2 },
      priceHistory: { '1D': [23.7, 22.61, 23.3, 23.04, 22.65, 22.18, 22.12, 21.9, 21.85, 22.13, 21.79, 21.77, 21.74, 21.67, 21.64, 21.48, 21.41, 21.3, 21.22, 21.09, 21.41, 21.53, 21.37, 21.4], '1W': [22.09, 22.34, 24.02, 23.7, 21.4], '1M': [31.79, 28.88, 28.51, 26.6, 24.86, 25.86, 30.84, 30.67, 25.08, 24.48, 22.85, 20.5, 22.21, 23.39, 23.73, 22.09, 22.34, 24.02, 23.7, 21.4], 'YTD': [7.14, 10.06, 10.04, 11.29, 9.46, 7.43, 8.76, 8.08, 9.51, 9.22, 10.84, 9.06, 9.48, 8.77, 9.55, 10.26, 18.47, 15.12, 17.55, 19.25, 19.67, 31.79, 25.86, 22.85, 23.73, 21.4], '6M': [7.66, 7.14, 10.06, 10, 10.17, 8.58, 8.86, 8.37, 7.88, 9, 8.2, 10.1, 8.75, 8.28, 8.84, 9.82, 13.2, 18.3, 15.92, 18.2, 21.32, 29.25, 24.86, 24.48, 23.73, 21.4], '1Y': [7.35, 6.27, 6.43, 6.15, 8.82, 7.21, 6.77, 6.96, 6.43, 6.09, 5.73, 5.64, 6.46, 6.86, 7.3, 7.74, 12.57, 15.03, 12.83, 10.46, 9.12, 7.78, 8.03, 8.69, 9.12, 7.38, 7.66, 7.14, 10.06, 10, 10.17, 8.58, 8.86, 8.3, 8.12, 9.55, 8.2, 10.1, 8.75, 8.28, 8.84, 9.82, 13.2, 18.3, 15.92, 22.65, 21.32, 29.25, 24.86, 24.48, 23.73, 21.4] },
      velocityScore: { '1D': 0, '1W': -44.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 5.08 },
      tonyNote: 'Navitas Semiconductor is a small-cap wide-bandgap power semiconductor name — gallium nitride and silicon carbide for fast charging and EV applications. The $26.60 share price and small market cap position it as a speculative holding in ETFs willing to take higher-risk bets on next-generation power conversion.',
    },
    {
      ticker: 'CRDO', name: 'CRDO', easyScore: 1, avgWeight: 4.9, proScore: 1.63, coverage: 0.333,
      price: 272, weeklyPrices: [239.18, 249.33, 271.83, 302.52, 272.00], weeklyChange: 13.72, dayChange: -10.09, sortRank: 0, periodReturns: { '1M': 24.5, 'YTD': 89, '6M': 84, '1Y': 195.9 },
      priceHistory: { '1D': [302.52, 269.4, 275.96, 273.36, 272, 268.2, 266.76, 267.65, 269.08, 274.5, 270.84, 271.46, 270.29, 270.75, 270.88, 269.74, 268.7, 269.03, 270.34, 267.64, 269.79, 270.18, 271, 272], '1W': [239.18, 249.33, 271.83, 302.52, 272], '1M': [221.64, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 217.5, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83, 302.52, 272], 'YTD': [143.89, 141.59, 156.84, 135.1, 129.47, 98.06, 128.4, 130.66, 114.48, 102.54, 115.91, 101.72, 103.91, 93.87, 110.21, 168.35, 189.49, 165.92, 193.57, 198.57, 156.27, 221.64, 229, 234.32, 259.41, 272], '6M': [147.81, 143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.78, 124.06, 112.27, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 188.51, 172.17, 218.41, 226.1, 222.27, 259.41, 272], '1Y': [91.92, 87.59, 97.59, 101.19, 98.41, 116.01, 110.29, 125.38, 106.3, 120.1, 124.77, 163.96, 164.44, 149.38, 144.91, 148.87, 129.75, 144.17, 162.18, 164.23, 158.5, 139.56, 154.18, 189.19, 157.98, 134.13, 147.81, 143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.05, 114.22, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 210.22, 172.17, 218.41, 226.1, 222.27, 259.41, 272] },
      velocityScore: { '1D': 0, '1W': -45.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$51B', pe: 108.4, revenueGrowth: 157, eps: 2.51, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.9 },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'AXTI', name: 'AXT Inc', easyScore: 1, avgWeight: 4.44, proScore: 1.48, coverage: 0.333,
      price: 77.91, weeklyPrices: [93.04, 92.11, 84.57, 92.44, 77.91], weeklyChange: -16.26, dayChange: -15.72, sortRank: 0, periodReturns: { '1M': -44.7, 'YTD': 376.5, '6M': 432.2, '1Y': 3756.9 },
      priceHistory: { '1D': [92.44, 86.92, 84.07, 84.36, 82.83, 82.48, 81.89, 80.58, 80.53, 80.07, 80.08, 80.74, 79.88, 79.07, 78.62, 77.93, 77.74, 77.34, 76.94, 76.61, 77.15, 77.28, 77.75, 77.91], '1W': [93.04, 92.11, 84.57, 92.44, 77.91], '1M': [132.6, 122.77, 115.7, 103.16, 109.55, 110.85, 106.7, 105.99, 89.04, 90.78, 78.36, 85.29, 88.34, 97.18, 110.74, 93.04, 92.11, 84.57, 92.44, 77.91], 'YTD': [16.35, 25.83, 22.1, 17.92, 16.38, 20.43, 26.8, 23.81, 37.12, 39.13, 47.36, 48.76, 67.35, 56.98, 53.18, 62.93, 86.94, 68.71, 107.55, 122.9, 105.88, 132.6, 110.85, 78.36, 110.74, 77.91], '6M': [14.64, 16.35, 25.83, 25.72, 17.4, 18.54, 24.06, 24.79, 29.68, 37.9, 32.37, 48.86, 54.24, 60.63, 41.99, 66.45, 78.76, 70.15, 106, 116.36, 123.78, 140.83, 109.55, 90.78, 110.74, 77.91], '1Y': [2.02, 2.01, 2.54, 2.39, 2.52, 2.12, 2.05, 2.23, 2.14, 2.77, 3.08, 3.36, 3.94, 4.83, 4.91, 5.31, 4.57, 5.17, 6.6, 8.54, 10.56, 9.9, 9.23, 11.48, 15.51, 12.36, 14.64, 16.35, 25.83, 25.72, 17.4, 18.54, 24.06, 24.24, 28.43, 46.32, 32.37, 48.86, 54.24, 60.63, 41.99, 66.45, 78.76, 70.15, 106, 125.81, 123.78, 140.83, 109.55, 90.78, 110.74, 77.91] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5B', pe: null, revenueGrowth: 39, eps: -0.32, grossMargin: 21, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.44, RKNG: false },
      tonyNote: 'AXT Inc is a compound semiconductor substrate manufacturer — gallium arsenide, indium phosphide, and germanium wafers used in data center optical transceivers, 5G RF chips, and solar cells. Revenue is growing with optical networking demand. Small market cap but positioned at a genuine supply-chain chokepoint for III-V semiconductor materials.',
    },
    {
      ticker: 'WULF', name: 'WULF', easyScore: 1, avgWeight: 4.37, proScore: 1.46, coverage: 0.333,
      price: 28.78, weeklyPrices: [28.01, 27.86, 28.98, 28.31, 28.78], weeklyChange: 2.75, dayChange: 1.66, sortRank: 0, periodReturns: { '1M': 26.1, 'YTD': 150.5, '6M': 131.7, '1Y': 649.5 },
      priceHistory: { '1D': [28.31, 28.08, 29.13, 29.25, 29.07, 28.46, 28.56, 28.6, 28.66, 28.93, 29.08, 29.08, 28.77, 29.02, 29.15, 29.05, 28.92, 28.88, 28.53, 28.25, 28.44, 28.64, 28.61, 28.78], '1W': [28.01, 27.86, 28.98, 28.31, 28.78], '1M': [25.18, 26.74, 26.4, 25.56, 25.66, 26.49, 26.16, 26.19, 24, 25.86, 25.3, 23.19, 25.35, 26.06, 28.17, 28.01, 27.86, 28.98, 28.31, 28.78], 'YTD': [11.49, 12.84, 14.21, 12.89, 14.54, 11.92, 16.03, 15.47, 17.88, 15.37, 15.22, 15.3, 16.86, 14.43, 18.05, 19.67, 20.55, 20.8, 23.49, 22.8, 21.14, 25.18, 26.49, 25.3, 28.17, 28.78], '6M': [12.42, 11.49, 12.84, 13.83, 14.12, 13.37, 14.29, 15.91, 15.01, 16.22, 13.75, 14.67, 15.1, 14.89, 15.55, 19.45, 20.5, 21.43, 22.29, 23.39, 22.32, 22.82, 25.66, 25.86, 28.17, 28.78], '1Y': [3.84, 4.44, 4.93, 5.25, 5.2, 5.01, 5.06, 5.24, 8.78, 9.24, 8.98, 10.55, 11.35, 11.4, 11.47, 12.3, 15.46, 13.14, 15.94, 15.01, 12.37, 12, 13.94, 14.43, 15.76, 11.57, 12.42, 11.49, 12.84, 13.83, 14.12, 13.37, 14.29, 16.26, 15.68, 16.02, 13.75, 14.67, 15.1, 14.89, 15.55, 19.45, 20.5, 21.43, 22.29, 23.37, 22.32, 22.82, 25.66, 25.86, 28.17, 28.78] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$14B', pe: null, revenueGrowth: -1, eps: -2.51, grossMargin: 64, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.37 },
      tonyNote: 'WULF appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LRCX', name: 'LRCX', easyScore: 1, avgWeight: 4.04, proScore: 1.35, coverage: 0.333,
      price: 371.33, weeklyPrices: [369.34, 374.18, 389.04, 409.54, 371.33], weeklyChange: 0.54, dayChange: -9.33, sortRank: 0, periodReturns: { '1M': 21.6, 'YTD': 116.9, '6M': 112, '1Y': 288.3 },
      priceHistory: { '1D': [409.54, 366.88, 376.08, 373.36, 369.95, 368.83, 367.67, 368.01, 367.74, 371.79, 372.49, 372.53, 372.86, 373.04, 373.46, 372.32, 371.51, 371.36, 370.55, 367.85, 371.05, 372.7, 369.5, 371.33], '1W': [369.34, 374.18, 389.04, 409.54, 371.33], '1M': [322.68, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04, 409.54, 371.33], 'YTD': [171.18, 200.96, 208.79, 220.7, 248.17, 213.31, 235.12, 237.39, 239.07, 222.99, 218.87, 224.71, 233.45, 213.66, 246.49, 265.16, 265.55, 251.23, 275.8, 289.24, 277.96, 322.68, 334.41, 327.16, 388.92, 371.33], '6M': [175.16, 171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 231.29, 244.92, 233.89, 199.33, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 258.57, 294.05, 284.72, 305.35, 317.12, 324.45, 388.92, 371.33], '1Y': [95.63, 96.81, 99.81, 100.37, 97.1, 99.09, 96.68, 105.28, 100.33, 103.63, 97.74, 107.36, 121.9, 128.32, 142.79, 142.54, 138.31, 145.04, 155.62, 155.78, 159.18, 143.24, 151.93, 159.75, 168.26, 154.98, 175.16, 171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 242.27, 231, 199.33, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 258.57, 296.05, 284.72, 305.35, 317.12, 324.45, 388.92, 371.33] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$464B', pe: 70.3, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.25,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.04 },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
