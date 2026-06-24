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
export const SPY_RET: Record<Period, number> = { '1W': -0.9, '1M': -1.5, 'YTD': 7.7, '6M': 6.4, '1Y': 21 };
// @@END_GENERATED:SPY_RET@@

// Top holdings per ETF (ticker + portfolio weight %), shown on ETF row hover.
export type EtfHolding = { t: string; w: number };

// @@GENERATED:ETF_TOP_HOLDINGS@@
export const ETF_TOP_HOLDINGS: Record<string, EtfHolding[]> = {
  AIS: [{ t: 'MU', w: 8.4 }, { t: 'MRVL', w: 4.5 }, { t: 'AMD', w: 4.4 }, { t: 'SIMO', w: 3.7 }, { t: 'VRT', w: 3.6 }],
  ARTY: [{ t: 'MU', w: 5.0 }, { t: 'AMD', w: 4.8 }, { t: 'CRWV', w: 4.6 }, { t: 'NVDA', w: 4.4 }, { t: 'AVGO', w: 4.3 }],
  BAI: [{ t: 'MU', w: 6.3 }, { t: 'AMD', w: 4.8 }, { t: 'LRCX', w: 4.6 }, { t: 'TSM', w: 4.3 }, { t: 'AVGO', w: 4.1 }],
  IGPT: [{ t: 'AMD', w: 8.1 }, { t: 'MU', w: 8.1 }, { t: 'META', w: 7.5 }, { t: 'NVDA', w: 7.5 }, { t: 'GOOGL', w: 7.4 }],
  IVES: [{ t: 'MU', w: 5.1 }, { t: 'AAPL', w: 5.0 }, { t: 'TSM', w: 5.0 }, { t: 'NVDA', w: 4.9 }, { t: 'AVGO', w: 4.8 }],
  ALAI: [{ t: 'NVDA', w: 12.6 }, { t: 'TSM', w: 5.6 }, { t: 'AMZN', w: 5.5 }, { t: 'MSFT', w: 4.9 }, { t: 'GOOG', w: 4.8 }],
  CHAT: [{ t: 'NVDA', w: 6.4 }, { t: 'GOOGL', w: 5.0 }, { t: 'AVGO', w: 4.0 }, { t: 'AMD', w: 4.0 }, { t: 'MU', w: 4.0 }],
  AIFD: [{ t: 'MU', w: 7.6 }, { t: 'MRVL', w: 6.5 }, { t: 'NVDA', w: 6.3 }, { t: 'LITE', w: 5.9 }, { t: 'DOCN', w: 5.5 }],
  SPRX: [{ t: 'ARM', w: 9.0 }, { t: 'ALAB', w: 8.5 }, { t: 'COHR', w: 8.3 }, { t: 'KLAC', w: 7.6 }, { t: 'MKSI', w: 6.2 }],
  AOTG: [{ t: 'AMD', w: 16.1 }, { t: 'MU', w: 11.2 }, { t: 'NVDA', w: 10.5 }, { t: 'TSM', w: 7.5 }, { t: 'TOST', w: 4.4 }],
  SOXX: [{ t: 'MU', w: 8.3 }, { t: 'AMD', w: 7.7 }, { t: 'NVDA', w: 7.2 }, { t: 'AVGO', w: 6.5 }, { t: 'INTC', w: 6.4 }],
  PSI: [{ t: 'AMAT', w: 6.1 }, { t: 'KLAC', w: 5.8 }, { t: 'MU', w: 5.6 }, { t: 'LRCX', w: 5.5 }, { t: 'INTC', w: 5.1 }],
  XSD: [{ t: 'ALGM', w: 2.7 }, { t: 'MXL', w: 2.7 }, { t: 'INTC', w: 2.7 }, { t: 'ALAB', w: 2.6 }, { t: 'TE', w: 2.6 }],
  DRAM: [{ t: 'SNDK', w: 5.4 }, { t: 'MU', w: 4.9 }, { t: 'STX', w: 4.5 }, { t: 'WDC', w: 4.3 }],
  PTF: [{ t: 'SNDK', w: 8.7 }, { t: 'WDC', w: 5.8 }, { t: 'STX', w: 5.4 }, { t: 'MU', w: 5.1 }, { t: 'AAPL', w: 4.2 }],
  WCLD: [{ t: 'DOCN', w: 3.9 }, { t: 'FROG', w: 3.2 }, { t: 'PANW', w: 2.8 }, { t: 'CRWD', w: 2.5 }, { t: 'TWLO', w: 2.4 }],
  IGV: [{ t: 'PANW', w: 9.2 }, { t: 'MSFT', w: 8.4 }, { t: 'PLTR', w: 8.0 }, { t: 'ORCL', w: 7.3 }, { t: 'CRWD', w: 6.7 }],
  FDTX: [{ t: 'MU', w: 9.4 }, { t: 'MRVL', w: 8.1 }, { t: 'TSM', w: 6.0 }, { t: 'NVDA', w: 4.6 }, { t: 'STX', w: 4.0 }],
  GTEK: [{ t: 'MRVL', w: 4.7 }, { t: 'DELL', w: 2.9 }, { t: 'CDNS', w: 2.4 }, { t: 'APH', w: 2.3 }, { t: 'TER', w: 2.1 }],
  ARKK: [{ t: 'TSLA', w: 9.7 }, { t: 'CRSP', w: 5.1 }, { t: 'TEM', w: 4.9 }, { t: 'HOOD', w: 4.8 }, { t: 'AMD', w: 4.7 }],
  MARS: [{ t: 'SPCX', w: 22.3 }, { t: 'RKLB', w: 10.2 }, { t: 'ASTS', w: 7.0 }, { t: 'PL', w: 4.7 }, { t: 'GSAT', w: 4.6 }],
  FRWD: [{ t: 'STX', w: 8.6 }, { t: 'NVDA', w: 8.2 }, { t: 'AMD', w: 7.1 }, { t: 'TSM', w: 5.9 }, { t: 'WDC', w: 5.9 }],
  BCTK: [{ t: 'TSM', w: 8.9 }, { t: 'LRCX', w: 8.5 }, { t: 'SPCX', w: 8.0 }, { t: 'AVGO', w: 6.8 }, { t: 'NVDA', w: 6.0 }],
  FWD: [{ t: 'AMD', w: 2.1 }, { t: 'AMAT', w: 2.0 }, { t: 'LRCX', w: 2.0 }, { t: 'SPCX', w: 2.0 }, { t: 'GOOGL', w: 1.9 }],
  CBSE: [{ t: 'BFLY', w: 3.9 }, { t: 'LRCX', w: 3.0 }, { t: 'TXG', w: 3.0 }, { t: 'KLAC', w: 2.9 }, { t: 'KRYS', w: 2.9 }],
  FCUS: [{ t: 'WDC', w: 5.5 }, { t: 'SNDK', w: 5.3 }, { t: 'INTC', w: 5.2 }, { t: 'BE', w: 5.0 }, { t: 'STX', w: 4.9 }],
  WGMI: [{ t: 'CIFR', w: 18.0 }, { t: 'IREN', w: 12.0 }, { t: 'WULF', w: 9.7 }, { t: 'CORZ', w: 7.3 }, { t: 'KEEL', w: 7.3 }],
  CNEQ: [{ t: 'NVDA', w: 13.4 }, { t: 'MSFT', w: 6.4 }, { t: 'AMZN', w: 5.8 }, { t: 'TSM', w: 5.7 }, { t: 'GOOG', w: 5.7 }],
  SGRT: [{ t: 'WDC', w: 10.2 }, { t: 'MU', w: 8.1 }, { t: 'LITE', w: 7.8 }, { t: 'NVDA', w: 6.4 }, { t: 'ARW', w: 4.8 }],
  SPMO: [{ t: 'MU', w: 11.8 }, { t: 'NVDA', w: 7.9 }, { t: 'AVGO', w: 6.6 }, { t: 'GOOGL', w: 4.4 }, { t: 'LRCX', w: 4.1 }],
  XMMO: [{ t: 'CW', w: 3.9 }, { t: 'FLEX', w: 3.9 }, { t: 'STRL', w: 3.4 }, { t: 'TTMI', w: 3.3 }, { t: 'ATI', w: 3.2 }],
  POW: [{ t: 'POWL', w: 6.5 }, { t: 'VICR', w: 5.7 }, { t: 'PWR', w: 4.6 }, { t: 'ETN', w: 4.1 }, { t: 'NVT', w: 4.0 }],
  VOLT: [{ t: 'BELFB', w: 7.5 }, { t: 'POWL', w: 7.3 }, { t: 'PWR', w: 5.3 }, { t: 'ETN', w: 5.2 }, { t: 'NEE', w: 4.9 }],
  PBD: [{ t: 'ALFEN', w: 1.1 }, { t: 'SHLS', w: 1.1 }],
  PBW: [{ t: 'FCEL', w: 3.9 }, { t: 'HYLN', w: 3.9 }, { t: 'NVTS', w: 2.8 }, { t: 'BE', w: 2.7 }, { t: 'ASPN', w: 2.2 }],
  IVEP: [{ t: 'BE', w: 5.8 }, { t: 'PWR', w: 4.2 }, { t: 'VRT', w: 4.1 }, { t: 'GEV', w: 4.0 }, { t: 'SBGSY', w: 4.0 }],
  AIRR: [{ t: 'STRL', w: 6.5 }, { t: 'AGX', w: 4.5 }, { t: 'FIX', w: 4.4 }, { t: 'MTZ', w: 4.0 }, { t: 'CHRW', w: 4.0 }],
  PRN: [{ t: 'TTMI', w: 6.5 }, { t: 'FIX', w: 4.7 }, { t: 'AGX', w: 4.7 }, { t: 'STRL', w: 4.5 }, { t: 'VICR', w: 4.3 }],
  RSHO: [{ t: 'TKR', w: 8.7 }, { t: 'POWL', w: 7.3 }, { t: 'CGNX', w: 7.2 }, { t: 'CAT', w: 6.9 }, { t: 'AIT', w: 6.0 }],
  IDEF: [{ t: 'RTX', w: 8.3 }, { t: 'LMT', w: 6.8 }, { t: 'GD', w: 5.9 }, { t: 'BA', w: 5.0 }, { t: 'NOC', w: 4.9 }],
  BILT: [{ t: 'UNP', w: 5.6 }, { t: 'AEP', w: 4.5 }, { t: 'AENA', w: 4.4 }, { t: 'XEL', w: 4.1 }, { t: 'LNG', w: 3.6 }],
  BUZZ: [{ t: 'MU', w: 4.3 }, { t: 'NBIS', w: 3.8 }, { t: 'AMD', w: 3.5 }, { t: 'INTC', w: 3.4 }, { t: 'SOFI', w: 3.3 }],
  MEME: [{ t: 'AAOI', w: 7.5 }, { t: 'NBIS', w: 7.0 }, { t: 'BE', w: 6.9 }, { t: 'IONQ', w: 6.4 }, { t: 'SNDK', w: 6.2 }],
  RKNG: [{ t: 'SNDK', w: 7.3 }, { t: 'WDC', w: 6.0 }, { t: 'MU', w: 5.9 }, { t: 'NBIS', w: 5.6 }, { t: 'NVTS', w: 5.2 }],
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
  'AI & ML':         { '1W': -2.2, '1M': 4.1, 'YTD': 46.6, '6M': 44, '1Y': 83.1 },
  'Semiconductors':  { '1W': -0.7, '1M': 11.9, 'YTD': 110.3, '6M': 107, '1Y': 154 },
  'Broad Tech':      { '1W': -2.6, '1M': 0.3, 'YTD': 27.6, '6M': 24, '1Y': 50 },
  'Electrification': { '1W': -2.2, '1M': -4.9, 'YTD': 28.9, '6M': 26.3, '1Y': 53.7 },
  'Industrials':     { '1W': 0, '1M': 2, 'YTD': 25.2, '6M': 22.2, '1Y': 42.4 },
  'Meme':            { '1W': -4.4, '1M': -6.9, 'YTD': 22.8, '6M': 17.7, '1Y': 8.3 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, IndexChartByPeriod> = {
  'AI & ML': {
    '1D': { top10: [100, 99.23, 99.96, 99.57, 99.07, 99.9, 99.98, 100.25, 99.96, 99.81, 99.78, 99.76, 99.81, 99.84, 99.73, 99.35, 99.07, 98.77, 98.27, 98.23, 98.09, 98.12, 98.38, 98.72], spy: [100, 100.3, 100.51, 100.29, 100.37, 100.46, 100.64, 100.78, 100.67, 100.83, 100.67, 100.72, 100.62, 100.64, 100.56, 100.38, 100.29, 100.16, 99.81, 99.86, 99.86, 99.92, 100.03, 100.1], top10Return: -1.1, spyReturn: 0.1, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 104.28, 105.09, 98.91, 97.81], spy: [100, 100.78, 100.46, 99, 99.1], top10Return: -2.2, spyReturn: -0.9, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.83, 101.64, 102.58, 105.61, 107.54, 106.51, 104.88, 95.95, 98.95, 96.99, 93.94, 98.99, 99.67, 104.88, 101.79, 102.3, 106.7, 107.53, 101.19, 100.06], spy: [100, 99.98, 100.53, 100.78, 101.06, 101.2, 100.49, 100.87, 98.26, 98.49, 98.2, 96.65, 98.29, 98.82, 100.56, 99.97, 98.72, 99.49, 99.17, 97.73, 97.83], top10Return: 4.1, spyReturn: -1.5, xLabels: ["May 27", "Jun 3", "Jun 10", "Jun 17", "Jun 24"] },
    'YTD': { top10: [100, 102.26, 104.35, 105.17, 107.24, 97.14, 101.92, 103.31, 104.49, 101.25, 100.28, 102.71, 102.1, 99.39, 106.63, 114.45, 121.34, 120.45, 133.39, 134.58, 131.19, 145.74, 155.81, 141.48, 148.76, 146.58], spy: [100, 101.11, 101.51, 101.04, 101.78, 99.37, 99.9, 100.38, 101.08, 99.91, 97.67, 97, 96.32, 96.09, 99.71, 102.64, 104.3, 104.35, 107.61, 108.25, 107.6, 110.05, 110.61, 108.08, 110.03, 107.68], top10Return: 46.6, spyReturn: 7.7, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 100.28, 101.8, 103.08, 102.98, 103.18, 102.79, 100.7, 100.12, 101.62, 100.15, 100.94, 99.7, 90.34, 99.34, 111.69, 115.59, 117, 126.57, 135.85, 129.79, 143.52, 154.32, 138.98, 146.13, 144.01], spy: [100, 98.96, 100.53, 100.19, 100.34, 100.73, 100.52, 98.75, 98.84, 99.42, 98.25, 96.91, 94.93, 91.54, 95.49, 100.59, 101.98, 103.09, 104.84, 107.09, 106.99, 108.72, 110.02, 106.76, 108.68, 106.36], top10Return: 44, spyReturn: 6.4, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 100.72, 103.34, 104.27, 106.44, 108.94, 109.3, 111.87, 107.83, 109.54, 109.46, 117.1, 119.5, 121.25, 123.54, 128.83, 126.32, 124.43, 135.02, 130.6, 128.18, 119.47, 121.12, 125.78, 129.59, 117.99, 126.41, 126.84, 128.76, 130.46, 130.29, 130.61, 126.99, 127.59, 126.9, 128.83, 126.87, 127.93, 126.35, 114.4, 125.9, 141.65, 146.59, 148.32, 160.56, 172.43, 164.71, 182.44, 196.17, 176.58, 185.75, 183.12], spy: [100, 101.79, 102.85, 102.87, 104.52, 104.56, 104.28, 105.92, 105.44, 106.33, 106.09, 107.49, 108.64, 108.95, 110.16, 110.93, 109.62, 110.06, 113.28, 111.67, 112.56, 108.78, 111.25, 112.71, 113.31, 110.65, 113.78, 112.59, 114.39, 113.99, 114.16, 114.61, 113.82, 112.36, 112.46, 113.12, 111.78, 110.26, 108.01, 104.15, 108.64, 114.45, 116.04, 117.29, 119.28, 121.84, 121.73, 123.7, 125.18, 121.47, 123.66, 121.02], top10Return: 83.1, spyReturn: 21, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Semiconductors': {
    '1D': { top10: [100, 98.9, 99.99, 99.58, 99.1, 100.04, 100.33, 100.49, 99.75, 99.64, 99.54, 99.9, 99.73, 99.88, 99.6, 99.13, 98.9, 98.4, 97.56, 97.64, 97.7, 97.6, 97.99, 98.5], spy: [100, 100.3, 100.51, 100.29, 100.37, 100.46, 100.64, 100.78, 100.67, 100.83, 100.67, 100.72, 100.62, 100.64, 100.56, 100.38, 100.29, 100.16, 99.81, 99.86, 99.86, 99.92, 100.03, 100.1], top10Return: -1.5, spyReturn: 0.1, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 107.49, 111, 100.77, 99.25], spy: [100, 100.78, 100.46, 99, 99.1], top10Return: -0.7, spyReturn: -0.9, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.16, 100.27, 99.34, 100.71, 105.58, 106.83, 104.03, 91.76, 97.24, 95.72, 92.49, 101.48, 102.93, 109.08, 103.42, 104.56, 112.46, 116.24, 105.29, 103.76], spy: [100, 99.98, 100.53, 100.78, 101.06, 101.2, 100.49, 100.87, 98.26, 98.49, 98.2, 96.65, 98.29, 98.82, 100.56, 99.97, 98.72, 99.49, 99.17, 97.73, 97.83], top10Return: 11.9, spyReturn: -1.5, xLabels: ["May 27", "Jun 3", "Jun 10", "Jun 17", "Jun 24"] },
    'YTD': { top10: [100, 107.01, 113.6, 119.4, 120.25, 115.11, 122.34, 123.35, 123.71, 120.25, 123.47, 131.44, 133.22, 133.14, 138.69, 149, 163.95, 170.72, 190.51, 192.21, 182.76, 197.55, 212.09, 202.71, 220.96, 210.33], spy: [100, 101.11, 101.51, 101.04, 101.78, 99.37, 99.9, 100.38, 101.08, 99.91, 97.67, 97, 96.32, 96.09, 99.71, 102.64, 104.3, 104.35, 107.61, 108.25, 107.6, 110.05, 110.61, 108.08, 110.03, 107.68], top10Return: 110.3, spyReturn: 7.7, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 103.15, 109.84, 115.53, 114.4, 116.66, 120.56, 122.26, 121.23, 123.27, 122.98, 129.75, 128.57, 124.29, 129.41, 146.45, 159.24, 164.58, 183.11, 194.54, 179.57, 196.08, 206.41, 199.61, 217.67, 207.04], spy: [100, 98.96, 100.53, 100.19, 100.34, 100.73, 100.52, 98.75, 98.84, 99.42, 98.25, 96.91, 94.93, 91.54, 95.49, 100.59, 101.98, 103.09, 104.84, 107.09, 106.99, 108.72, 110.02, 106.76, 108.68, 106.36], top10Return: 107, spyReturn: 6.4, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 101.99, 104.81, 107.33, 106.78, 108.26, 108.56, 111.74, 110.26, 113.93, 111.01, 115.55, 120.33, 122.34, 124.64, 130.36, 130.47, 128.9, 137.3, 136.98, 137.64, 132.49, 133.93, 147.49, 152.81, 139.35, 147.62, 147.37, 151.14, 155.29, 155.99, 161.52, 161.4, 170.35, 169.6, 171.37, 168.85, 171.47, 171.86, 159.6, 162.78, 183.63, 192.6, 194.96, 219.97, 237.76, 226.89, 254.08, 264.64, 253.44, 254.25, 254], spy: [100, 101.79, 102.85, 102.87, 104.52, 104.56, 104.28, 105.92, 105.44, 106.33, 106.09, 107.49, 108.64, 108.95, 110.16, 110.93, 109.62, 110.06, 113.28, 111.67, 112.56, 108.78, 111.25, 112.71, 113.31, 110.65, 113.78, 112.59, 114.39, 113.99, 114.16, 114.61, 113.82, 112.36, 112.46, 113.12, 111.78, 110.26, 108.01, 104.15, 108.64, 114.45, 116.04, 117.29, 119.28, 121.84, 121.73, 123.7, 125.18, 121.47, 123.66, 121.02], top10Return: 154, spyReturn: 21, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Broad Tech': {
    '1D': { top10: [100, 99.2, 99.6, 99.3, 99.07, 99.43, 99.74, 99.99, 99.85, 99.89, 99.76, 99.8, 99.67, 99.81, 99.62, 99.41, 99.11, 98.93, 98.5, 98.36, 98.25, 98.17, 98.43, 98.78], spy: [100, 100.3, 100.51, 100.29, 100.37, 100.46, 100.64, 100.78, 100.67, 100.83, 100.67, 100.72, 100.62, 100.64, 100.56, 100.38, 100.29, 100.16, 99.81, 99.86, 99.86, 99.92, 100.03, 100.1], top10Return: -1.1, spyReturn: 0.1, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 102.28, 101.97, 98.59, 97.45], spy: [100, 100.78, 100.46, 99, 99.1], top10Return: -2.6, spyReturn: -0.9, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.93, 101.33, 101.87, 103.55, 104.77, 103.46, 103.06, 95.99, 97.76, 96.03, 93.7, 97.78, 98.33, 101.85, 100.17, 99.79, 102.16, 101.93, 98.52, 97.4], spy: [100, 99.98, 100.53, 100.78, 101.06, 101.2, 100.49, 100.87, 98.26, 98.49, 98.2, 96.65, 98.29, 98.82, 100.56, 99.97, 98.72, 99.49, 99.17, 97.73, 97.83], top10Return: 0.3, spyReturn: -1.5, xLabels: ["May 27", "Jun 3", "Jun 10", "Jun 17", "Jun 24"] },
    'YTD': { top10: [100, 103.06, 104.96, 105, 104.88, 96.41, 100.14, 102.86, 104.51, 102.3, 100.68, 102.26, 101.27, 99.57, 105.18, 111.23, 116.27, 113.72, 125.31, 126.34, 121.44, 129.54, 134.65, 125.63, 131.2, 127.56], spy: [100, 101.11, 101.51, 101.04, 101.78, 99.37, 99.9, 100.38, 101.08, 99.91, 97.67, 97, 96.32, 96.09, 99.71, 102.64, 104.3, 104.35, 107.61, 108.25, 107.6, 110.05, 110.61, 108.08, 110.03, 107.68], top10Return: 27.6, spyReturn: 7.7, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 98.74, 101.57, 102.52, 101.81, 99.83, 99.84, 99.35, 98.74, 101.72, 99.84, 99.5, 98.17, 91.94, 99.2, 107.56, 111.1, 110.77, 119.19, 124.77, 119.03, 126, 131.8, 122.21, 127.58, 124.04], spy: [100, 98.96, 100.53, 100.19, 100.34, 100.73, 100.52, 98.75, 98.84, 99.42, 98.25, 96.91, 94.93, 91.54, 95.49, 100.59, 101.98, 103.09, 104.84, 107.09, 106.99, 108.72, 110.02, 106.76, 108.68, 106.36], top10Return: 24, spyReturn: 6.4, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 101.38, 103.84, 104.77, 106.74, 106.74, 106.56, 106.85, 105.54, 107.64, 107.61, 112.13, 115.65, 117.91, 119.05, 123.94, 125.83, 119.93, 126.89, 126.5, 121.97, 114.83, 117, 119.08, 121.11, 113.76, 119.52, 118.2, 121.16, 124.61, 123.85, 122.7, 120.99, 121.63, 120.73, 123.81, 121.29, 122.17, 123.05, 116.27, 122.12, 131.25, 133.96, 133.99, 142.37, 146.81, 142.08, 151.12, 157.65, 148.21, 153.96, 149.96], spy: [100, 101.79, 102.85, 102.87, 104.52, 104.56, 104.28, 105.92, 105.44, 106.33, 106.09, 107.49, 108.64, 108.95, 110.16, 110.93, 109.62, 110.06, 113.28, 111.67, 112.56, 108.78, 111.25, 112.71, 113.31, 110.65, 113.78, 112.59, 114.39, 113.99, 114.16, 114.61, 113.82, 112.36, 112.46, 113.12, 111.78, 110.26, 108.01, 104.15, 108.64, 114.45, 116.04, 117.29, 119.28, 121.84, 121.73, 123.7, 125.18, 121.47, 123.66, 121.02], top10Return: 50, spyReturn: 21, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Electrification': {
    '1D': { top10: [100, 99.16, 99.34, 99.6, 99.35, 99.76, 100.02, 100.06, 100.05, 100.01, 100.01, 100.03, 99.85, 99.98, 99.86, 99.65, 99.29, 99.15, 98.69, 98.61, 98.59, 98.54, 98.69, 98.8], spy: [100, 100.3, 100.51, 100.29, 100.37, 100.46, 100.64, 100.78, 100.67, 100.83, 100.67, 100.72, 100.62, 100.64, 100.56, 100.38, 100.29, 100.16, 99.81, 99.86, 99.86, 99.92, 100.03, 100.1], top10Return: -1, spyReturn: 0.1, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 102.29, 103.36, 98.79, 97.79], spy: [100, 100.78, 100.46, 99, 99.1], top10Return: -2.2, spyReturn: -0.9, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.17, 99.25, 98.2, 97.87, 99.92, 98.87, 98.79, 92.68, 92.79, 91.7, 88.74, 92.36, 93.24, 95.34, 94.37, 94.35, 96.51, 97.56, 93.26, 92.36], spy: [100, 99.98, 100.53, 100.78, 101.06, 101.2, 100.49, 100.87, 98.26, 98.49, 98.2, 96.65, 98.29, 98.82, 100.56, 99.97, 98.72, 99.49, 99.17, 97.73, 97.83], top10Return: -4.9, spyReturn: -1.5, xLabels: ["May 27", "Jun 3", "Jun 10", "Jun 17", "Jun 24"] },
    'YTD': { top10: [100, 103.61, 108.42, 111.38, 112.77, 109.91, 114.31, 115.08, 118.29, 112.19, 112.41, 113.97, 116.18, 113.26, 118.81, 122.45, 127.21, 128.02, 137.59, 136.19, 127.05, 137.67, 138.05, 128.91, 132.98, 128.87], spy: [100, 101.11, 101.51, 101.04, 101.78, 99.37, 99.9, 100.38, 101.08, 99.91, 97.67, 97, 96.32, 96.09, 99.71, 102.64, 104.3, 104.35, 107.61, 108.25, 107.6, 110.05, 110.61, 108.08, 110.03, 107.68], top10Return: 28.9, spyReturn: 7.7, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 101.46, 102.91, 107.28, 108.46, 108.38, 112.73, 112.68, 114.2, 115.33, 110.2, 112.22, 111.78, 107.03, 111.32, 120.48, 122.05, 124.9, 133.67, 136.51, 126.9, 135.59, 136.37, 126.32, 130.33, 126.32], spy: [100, 98.96, 100.53, 100.19, 100.34, 100.73, 100.52, 98.75, 98.84, 99.42, 98.25, 96.91, 94.93, 91.54, 95.49, 100.59, 101.98, 103.09, 104.84, 107.09, 106.99, 108.72, 110.02, 106.76, 108.68, 106.36], top10Return: 26.3, spyReturn: 6.4, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 101.72, 105.33, 106.09, 109.91, 107.25, 106.92, 110.23, 110.69, 112.23, 110.27, 111.1, 115.06, 117.34, 120.86, 125.3, 130.53, 125.19, 130.31, 130.43, 129.33, 124.04, 125.46, 127.49, 129.82, 126.22, 129.85, 129.09, 129.86, 134.5, 136.25, 135.17, 137.32, 137.55, 138.3, 140.47, 136.13, 139.27, 139.34, 135.95, 141.1, 149.82, 151.23, 151.65, 159.83, 164.76, 157.25, 166.21, 167.45, 157.15, 158.25, 153.7], spy: [100, 101.79, 102.85, 102.87, 104.52, 104.56, 104.28, 105.92, 105.44, 106.33, 106.09, 107.49, 108.64, 108.95, 110.16, 110.93, 109.62, 110.06, 113.28, 111.67, 112.56, 108.78, 111.25, 112.71, 113.31, 110.65, 113.78, 112.59, 114.39, 113.99, 114.16, 114.61, 113.82, 112.36, 112.46, 113.12, 111.78, 110.26, 108.01, 104.15, 108.64, 114.45, 116.04, 117.29, 119.28, 121.84, 121.73, 123.7, 125.18, 121.47, 123.66, 121.02], top10Return: 53.7, spyReturn: 21, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Industrials': {
    '1D': { top10: [100, 99.99, 100.23, 100.02, 100.4, 100.46, 100.45, 100.77, 100.71, 100.74, 100.65, 100.7, 100.88, 100.97, 100.93, 100.79, 100.6, 100.5, 100.17, 100.11, 99.84, 99.72, 99.72, 99.87], spy: [100, 100.3, 100.51, 100.29, 100.37, 100.46, 100.64, 100.78, 100.67, 100.83, 100.67, 100.72, 100.62, 100.64, 100.56, 100.38, 100.29, 100.16, 99.81, 99.86, 99.86, 99.92, 100.03, 100.1], top10Return: -0.2, spyReturn: 0.1, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 100.33, 101.43, 100.08, 99.95], spy: [100, 100.78, 100.46, 99, 99.1], top10Return: 0, spyReturn: -0.9, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 100, 100.47, 99.82, 98.35, 99.63, 99.38, 100.34, 97.56, 97.7, 97.81, 96.06, 98.25, 99.37, 99.4, 99.8, 99.53, 99.88, 101.01, 99.63, 99.52], spy: [100, 99.98, 100.53, 100.78, 101.06, 101.2, 100.49, 100.87, 98.26, 98.49, 98.2, 96.65, 98.29, 98.82, 100.56, 99.97, 98.72, 99.49, 99.17, 97.73, 97.83], top10Return: 2, spyReturn: -1.5, xLabels: ["May 27", "Jun 3", "Jun 10", "Jun 17", "Jun 24"] },
    'YTD': { top10: [100, 105.14, 110.15, 111.3, 111.44, 111.22, 116.05, 118.94, 119.6, 115.24, 112.17, 111.94, 113.75, 112.58, 118.78, 118.96, 120.02, 118.22, 125.56, 124.2, 118.95, 125.47, 124.73, 122.65, 125.33, 125.22], spy: [100, 101.11, 101.51, 101.04, 101.78, 99.37, 99.9, 100.38, 101.08, 99.91, 97.67, 97, 96.32, 96.09, 99.71, 102.64, 104.3, 104.35, 107.61, 108.25, 107.6, 110.05, 110.61, 108.08, 110.03, 107.68], top10Return: 25.2, spyReturn: 7.7, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 99.63, 104.04, 108.79, 107.84, 107.68, 113.79, 114.91, 116.2, 116.99, 111.46, 109.67, 108.3, 104.89, 110.65, 117.64, 116.83, 116.96, 120.26, 121.93, 117.97, 121.56, 121.29, 119.61, 122.35, 122.23], spy: [100, 98.96, 100.53, 100.19, 100.34, 100.73, 100.52, 98.75, 98.84, 99.42, 98.25, 96.91, 94.93, 91.54, 95.49, 100.59, 101.98, 103.09, 104.84, 107.09, 106.99, 108.72, 110.02, 106.76, 108.68, 106.36], top10Return: 22.2, spyReturn: 6.4, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 101.88, 103.65, 104.09, 105.72, 105.87, 105.94, 108, 105.76, 108.48, 106.81, 108.64, 109.8, 111.21, 113.09, 115, 113.87, 112.65, 116.75, 114.94, 113.54, 108.44, 110.66, 111.91, 114.67, 110.92, 116.27, 116.52, 122.04, 127.13, 126.26, 126.9, 132, 134.28, 134.46, 135.23, 129.43, 127.01, 127, 122.29, 128.53, 136.17, 136.26, 135.98, 139.63, 142.01, 136.62, 141.19, 141.24, 139.17, 142.13, 142.41], spy: [100, 101.79, 102.85, 102.87, 104.52, 104.56, 104.28, 105.92, 105.44, 106.33, 106.09, 107.49, 108.64, 108.95, 110.16, 110.93, 109.62, 110.06, 113.28, 111.67, 112.56, 108.78, 111.25, 112.71, 113.31, 110.65, 113.78, 112.59, 114.39, 113.99, 114.16, 114.61, 113.82, 112.36, 112.46, 113.12, 111.78, 110.26, 108.01, 104.15, 108.64, 114.45, 116.04, 117.29, 119.28, 121.84, 121.73, 123.7, 125.18, 121.47, 123.66, 121.02], top10Return: 42.4, spyReturn: 21, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Meme': {
    '1D': { top10: [100, 98.52, 98.24, 98.02, 97.22, 97.66, 97.95, 97.81, 98.07, 98.18, 97.75, 97.84, 97.75, 97.72, 97.53, 97.03, 96.85, 96.13, 95.65, 95.48, 95.59, 95.4, 95.89, 96.63], spy: [100, 100.3, 100.51, 100.29, 100.37, 100.46, 100.64, 100.78, 100.67, 100.83, 100.67, 100.72, 100.62, 100.64, 100.56, 100.38, 100.29, 100.16, 99.81, 99.86, 99.86, 99.92, 100.03, 100.1], top10Return: -3, spyReturn: 0.1, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 103.54, 103.4, 98.59, 95.57], spy: [100, 100.78, 100.46, 99, 99.1], top10Return: -4.4, spyReturn: -0.9, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 101.49, 103.34, 102.02, 102.24, 104.7, 101.07, 101.6, 91.3, 93.63, 90.34, 87.84, 93.47, 92.31, 97.44, 93.66, 94.22, 97.55, 97.4, 92.92, 90.13], spy: [100, 99.98, 100.53, 100.78, 101.06, 101.2, 100.49, 100.87, 98.26, 98.49, 98.2, 96.65, 98.29, 98.82, 100.56, 99.97, 98.72, 99.49, 99.17, 97.73, 97.83], top10Return: -6.9, spyReturn: -1.5, xLabels: ["May 27", "Jun 3", "Jun 10", "Jun 17", "Jun 24"] },
    'YTD': { top10: [100, 108.03, 108.23, 107.22, 102.68, 89.95, 92.02, 95.05, 95.18, 93.73, 92.78, 90.43, 93.62, 91.36, 100.37, 111.62, 113.88, 111.01, 124.96, 123.8, 122.14, 140.11, 139.02, 125.07, 128.2, 122.78], spy: [100, 101.11, 101.51, 101.04, 101.78, 99.37, 99.9, 100.38, 101.08, 99.91, 97.67, 97, 96.32, 96.09, 99.71, 102.64, 104.3, 104.35, 107.61, 108.25, 107.6, 110.05, 110.61, 108.08, 110.03, 107.68], top10Return: 22.8, spyReturn: 7.7, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '6M': { top10: [100, 99.58, 103.35, 104.03, 98.06, 94.17, 94.08, 89.31, 89.39, 91.27, 89.21, 87.13, 89.11, 83.9, 92.57, 104.76, 108.31, 106.38, 116.12, 120.79, 118.54, 132.37, 137.22, 119.87, 122.9, 117.73], spy: [100, 98.96, 100.53, 100.19, 100.34, 100.73, 100.52, 98.75, 98.84, 99.42, 98.25, 96.91, 94.93, 91.54, 95.49, 100.59, 101.98, 103.09, 104.84, 107.09, 106.99, 108.72, 110.02, 106.76, 108.68, 106.36], top10Return: 17.7, spyReturn: 6.4, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.23, 100.92, 96.42, 96.94, 91.88, 90.49, 90.05, 84.2, 84.09, 84.22, 86.98, 89.11, 90.55, 86.88, 93.77, 92.2, 89.11, 95.23, 94.65, 93.97, 89.25, 87.29, 87.82, 87.7, 83.46, 89.05, 90.64, 92.19, 93.64, 93.38, 92.35, 90.04, 90.7, 86.65, 93.26, 94.39, 98.45, 101.3, 92.03, 93.7, 103.13, 108.74, 111.58, 109.86, 114.22, 114.1, 117.31, 116.79, 112.27, 116.59, 108.32], spy: [100, 101.79, 102.85, 102.87, 104.52, 104.56, 104.28, 105.92, 105.44, 106.33, 106.09, 107.49, 108.64, 108.95, 110.16, 110.93, 109.62, 110.06, 113.28, 111.67, 112.56, 108.78, 111.25, 112.71, 113.31, 110.65, 113.78, 112.59, 114.39, 113.99, 114.16, 114.61, 113.82, 112.36, 112.46, 113.12, 111.78, 110.26, 108.01, 104.15, 108.64, 114.45, 116.04, 117.29, 119.28, 121.84, 121.73, 123.7, 125.18, 121.47, 123.66, 121.02], top10Return: 8.3, spyReturn: 21, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
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
export const SCAN_TIMESTAMP    = '2026-06-24T18:27:40.039Z';
export const SCAN_TIMESTAMP_NY = 'June 24, 2026 at 2:27 PM ET';
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
export const HOLDINGS_COUNT = 1238;
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
  { ticker: 'MU', name: `MICRON TECHNOLOGY INC`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 14.18, bestProScore: 5.68, avgProScore: 4.73, price: 1030.39, weeklyChange: -1.23 },
  { ticker: 'NVDA', name: `NVIDIA CORP`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 12.98, bestProScore: 6.21, avgProScore: 4.33, price: 198.59, weeklyChange: -2.96 },
  { ticker: 'AMD', name: `ADVANCED MICRO DEVICES INC`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 10.32, bestProScore: 4.87, avgProScore: 3.44, price: 514.83, weeklyChange: 0.46 },
  { ticker: 'AVGO', name: `BROADCOM INC`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 6.43, bestProScore: 2.80, avgProScore: 2.14, price: 382.02, weeklyChange: -2.77 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 5.13, bestProScore: 3.14, avgProScore: 2.56, price: 295.01, weeklyChange: 0.33 },
  { ticker: 'INTC', name: `INTEL CORPORATION`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.81, bestProScore: 3.54, avgProScore: 2.41, price: 131.27, weeklyChange: 8.40 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.71, bestProScore: 2.90, avgProScore: 2.35, price: 439.55, weeklyChange: 1.71 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.57, bestProScore: 2.67, avgProScore: 2.29, price: 270.70, weeklyChange: -6.51 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 3.86, bestProScore: 2.48, avgProScore: 1.93, price: 367.65, weeklyChange: -1.75 },
  { ticker: 'WDC', name: `Western Digital Corp`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 3.72, bestProScore: 2.32, avgProScore: 1.86, price: 627.49, weeklyChange: -11.89 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': -0.5, '1M': 11.4, 'YTD': 110.5, '6M': 109.7, '1Y': 188.2 },
  ARTY: { '1W': -2.7, '1M': 7.1, 'YTD': 52.9, '6M': 51.9, '1Y': 85.8 },
  BAI:  { '1W': -1.8, '1M': 3.5, 'YTD': 48.5, '6M': 45.5, '1Y': 76.7 },
  IGPT: { '1W': -1.7, '1M': 7.9, 'YTD': 66.6, '6M': 66, '1Y': 106.8 },
  IVES: { '1W': -2.9, '1M': -2.6, 'YTD': 14.8, '6M': 12.1, '1Y': 35.6 },
  ALAI: { '1W': -3.1, '1M': 1.1, 'YTD': 21.9, '6M': 19, '1Y': 47.3 },
  CHAT: { '1W': -1.5, '1M': 6.2, 'YTD': 61.8, '6M': 56.2, '1Y': 100.7 },
  AIFD: { '1W': -3.6, '1M': 1.1, 'YTD': 38, '6M': 35.9, '1Y': 73.5 },
  SPRX: { '1W': -3.3, '1M': 1.7, 'YTD': 39.7, '6M': 34.7, '1Y': 88.5 },
  AOTG: { '1W': -0.9, '1M': 3.5, 'YTD': 11, '6M': 9.1, '1Y': 28.2 },
  // Semiconductors
  SOXX: { '1W': -0.4, '1M': 11.1, 'YTD': 98.3, '6M': 95, '1Y': 154 },
  PSI:  { '1W': 0, '1M': 8.9, 'YTD': 112.4, '6M': 107.2, '1Y': 182.6 },
  XSD:  { '1W': -1, '1M': -2.8, 'YTD': 82.6, '6M': 77.8, '1Y': 131.3 },
  DRAM: { '1W': -1.5, '1M': 30.4, 'YTD': 148.1, '6M': 148.1, '1Y': 148.1 },
  // Broad Tech
  PTF:  { '1W': -4.4, '1M': 2.3, 'YTD': 65.1, '6M': 59.5, '1Y': 88 },
  WCLD: { '1W': 0.2, '1M': -1.8, 'YTD': -15.3, '6M': -16.4, '1Y': -17.1 },
  IGV:  { '1W': -2.5, '1M': -7.5, 'YTD': -17.8, '6M': -19.7, '1Y': -19.6 },
  FDTX: { '1W': -2.4, '1M': 7.7, 'YTD': 34.5, '6M': 32.8, '1Y': 44 },
  GTEK: { '1W': -0.6, '1M': 5.7, 'YTD': 48.8, '6M': 47.9, '1Y': 67.5 },
  ARKK: { '1W': -1.3, '1M': 1.4, 'YTD': 0.7, '6M': -3.9, '1Y': 10.2 },
  MARS: { '1W': -13.7, '1M': -29.6, 'YTD': 17.1, '6M': 17.1, '1Y': 17.1 },
  FRWD: { '1W': -3.7, '1M': 4.1, 'YTD': 29.2, '6M': 29.2, '1Y': 29.2 },
  BCTK: { '1W': -2.7, '1M': 2, 'YTD': 20.8, '6M': 18.4, '1Y': 23 },
  FWD:  { '1W': -1.4, '1M': 2.7, 'YTD': 34.6, '6M': 31.9, '1Y': 61.2 },
  CBSE: { '1W': 0.4, '1M': 1, 'YTD': 26.8, '6M': 23.5, '1Y': 38.6 },
  FCUS: { '1W': -1.7, '1M': -0.6, 'YTD': 39.8, '6M': 30.8, '1Y': 73.2 },
  WGMI: { '1W': -3.4, '1M': 7.2, 'YTD': 73.5, '6M': 58.8, '1Y': 241.8 },
  CNEQ: { '1W': -2.4, '1M': -0.3, 'YTD': 16.1, '6M': 13.6, '1Y': 38.9 },
  SGRT: { '1W': -1.9, '1M': 3.2, 'YTD': 44.3, '6M': 39.7, '1Y': 80.5 },
  SPMO: { '1W': -1.5, '1M': 5.7, 'YTD': 28.4, '6M': 26.1, '1Y': 39.4 },
  XMMO: { '1W': -0.4, '1M': 2.6, 'YTD': 22.1, '6M': 19.4, '1Y': 33.4 },
  // Electrification
  POW:  { '1W': -3, '1M': -2.9, 'YTD': 52.3, '6M': 50.6, '1Y': 47.8 },
  VOLT: { '1W': 1.2, '1M': 3.1, 'YTD': 41.1, '6M': 38.7, '1Y': 63.2 },
  PBD:  { '1W': -4.1, '1M': -11.3, 'YTD': 19.8, '6M': 17.5, '1Y': 56.2 },
  PBW:  { '1W': -5.2, '1M': -11.9, 'YTD': 24.1, '6M': 17.6, '1Y': 94.2 },
  IVEP: { '1W': 0.1, '1M': -1.4, 'YTD': 7.1, '6M': 7.1, '1Y': 7.1 },
  // Industrials
  AIRR: { '1W': 1.1, '1M': 4.5, 'YTD': 32.9, '6M': 28.6, '1Y': 62.9 },
  PRN:  { '1W': 0.5, '1M': 6.3, 'YTD': 44.2, '6M': 38.6, '1Y': 63.6 },
  RSHO: { '1W': 2.3, '1M': 9.1, 'YTD': 39.4, '6M': 36.5, '1Y': 59.3 },
  IDEF: { '1W': -4.8, '1M': -4.7, 'YTD': 1.5, '6M': -0.6, '1Y': 15.1 },
  BILT: { '1W': 0.7, '1M': -5.1, 'YTD': 8, '6M': 8, '1Y': 11.2 },
  // Meme
  BUZZ: { '1W': -3.5, '1M': -5, 'YTD': 10.3, '6M': 6.1, '1Y': 22 },
  MEME: { '1W': -6.8, '1M': -14.7, 'YTD': 49.7, '6M': 38.7, '1Y': -5.5 },
  RKNG: { '1W': -2.9, '1M': -1, 'YTD': 8.4, '6M': 8.4, '1Y': 8.4 },
};
// @@END_GENERATED:ETF_RETURNS@@

// @@GENERATED:ETF_DAY_CHANGE@@
// Today's % move per ETF ticker (1D, vs prior close). Refreshed by the 3×/day
// price jobs. Powers the 1D ranking in the theme-ETF side panel.
export const ETF_DAY_CHANGE: Record<string, number> = {
  AIS:  -1.32,
  ARTY: -1.01,
  BAI:  -0.93,
  IGPT: -1.39,
  IVES: -1.01,
  ALAI: -1.54,
  CHAT: -1.03,
  AIFD: -1.16,
  SPRX: -2,
  AOTG: -0.06,
  SOXX: -1.05,
  PSI:  -1.73,
  XSD:  -2.73,
  DRAM: -0.51,
  PTF:  -2.58,
  WCLD: 1.3,
  IGV:  -0.46,
  FDTX: -1.04,
  GTEK: -1.15,
  ARKK: 1.03,
  MARS: -3.72,
  FRWD: -0.89,
  BCTK: -0.03,
  FWD:  -0.73,
  CBSE: -0.43,
  FCUS: -2.38,
  WGMI: -6.48,
  CNEQ: -0.29,
  SGRT: -0.55,
  SPMO: -0.75,
  XMMO: -0.34,
  POW:  -1.25,
  VOLT: 0.55,
  PBD:  -1.48,
  PBW:  -2.62,
  IVEP: -0.34,
  AIRR: 0.9,
  PRN:  -0.59,
  IDEF: -0.71,
  BILT: -0.23,
  BUZZ: -1.93,
  MEME: -4.82,
  RKNG: -2.21,
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
  'AI & ML': { etfs: ['AIS', 'AOTG', 'SPRX'], series: { '1W': [100, 104.81, 106.31, 99.46, 98.44], '1M': [100, 100.16, 101.99, 101.62, 103.66, 106.87, 106.09, 104.64, 94.8, 98.17, 96.1, 93.05, 99.12, 100.16, 105.27, 101.31, 102.17, 107.11, 108.66, 101.64, 100.59], 'YTD': [100, 102.87, 105.65, 107.25, 108.86, 96.78, 101.6, 103.13, 104.97, 101.61, 99.89, 102.48, 102.9, 98.32, 106.68, 114.17, 122.05, 120.68, 133.9, 136.37, 133.06, 152.08, 161.87, 145.78, 154.26, 153.77], '6M': [100, 100.99, 102.51, 104.55, 103.84, 103.85, 104.45, 100.54, 100.33, 102.8, 100.57, 101.41, 99.83, 89.14, 99.09, 111.81, 115.9, 117.01, 126.78, 137.87, 131.39, 149.61, 159.91, 143.3, 151.64, 151.2], '1Y': [100, 100.51, 103.56, 104.58, 107.29, 110.59, 111.85, 114.05, 109.23, 111.61, 110.75, 118.6, 122.19, 124.33, 126.79, 134.22, 131.27, 128.71, 140.26, 136.72, 133.35, 122.66, 124.12, 130.2, 134.45, 120.82, 131.61, 133.12, 135.12, 138.08, 137.02, 137.23, 133.95, 133.19, 132.99, 136.28, 133.06, 134.37, 132.26, 117.87, 131.29, 148.45, 153.85, 155.15, 168.41, 183.39, 174.66, 199.51, 213.25, 190.87, 202.18, 201.65] }, returns: { '1W': -1.6, '1M': 0.6, 'YTD': 53.8, '6M': 51.2, '1Y': 101.7 } },
  'Semiconductors': { etfs: ['DRAM', 'PSI', 'XSD'], series: { '1W': [100, 107.78, 111.6, 100.83, 99.14], '1M': [100, 99.23, 100.39, 99.18, 100.84, 105.4, 106.44, 103.47, 90.78, 96.24, 94.75, 91.65, 101, 102.37, 108.69, 103.33, 104.35, 112.56, 116.68, 105.11, 103.44], 'YTD': [100, 107.31, 114.14, 120.61, 120.35, 116.86, 124.21, 125.08, 125.45, 122.95, 128.09, 137.82, 139.42, 140.05, 143.02, 154.18, 170.81, 177.82, 197.91, 199.17, 188.69, 200.97, 214.64, 208.06, 229.17, 214.35], '6M': [100, 103.38, 110.65, 116.76, 115.18, 117.15, 122.34, 124.39, 122.79, 126.03, 127.36, 136.22, 134.78, 131.99, 134.68, 151.58, 166.52, 171.67, 191.59, 201.39, 185.44, 199.37, 209.33, 204.94, 225.85, 211.04], '1Y': [100, 102.29, 105.13, 108.28, 108.05, 109.19, 111.16, 113.52, 112.26, 116.34, 113.75, 118.14, 123.78, 124.97, 127, 132.48, 133.18, 131.58, 139.16, 139.33, 141.67, 137.38, 138.37, 152.79, 158.9, 145.36, 153.42, 152.02, 154.9, 158.5, 159.35, 165.35, 165.78, 176.85, 175.55, 178.58, 177.44, 180.73, 181.42, 168.88, 167.74, 187.95, 197.16, 197.74, 224.84, 241.48, 232.22, 257.94, 267.08, 258.22, 255.17, 254.02] }, returns: { '1W': -0.9, '1M': 3.4, 'YTD': 114.3, '6M': 111, '1Y': 154 } },
  'Broad Tech': { etfs: ['WGMI', 'PTF', 'SGRT'], series: { '1W': [100, 103.44, 104.65, 100.01, 96.75], '1M': [100, 101.9, 102.25, 101.28, 103.3, 105.97, 105.66, 104, 94.15, 97.56, 94.86, 91.61, 97.79, 100.02, 104.42, 102.57, 102.69, 106.25, 107.46, 102.75, 99.35], 'YTD': [100, 107.37, 113.44, 113.75, 116.83, 101.6, 110.12, 112.43, 116.08, 109.7, 107.02, 110.59, 112.57, 105.85, 119.91, 126.67, 134.16, 127.7, 152.7, 150.35, 142.42, 165.16, 171.27, 153.71, 166.3, 160.93], '6M': [100, 99.56, 103.75, 110.26, 106.52, 106.53, 108.95, 106.12, 107.04, 110.29, 102.25, 105.47, 104.65, 93.14, 105.41, 121.09, 123.74, 121.97, 137.67, 146.28, 136.47, 153.73, 162.96, 145.84, 157.74, 152.69], '1Y': [100, 106.96, 111.45, 114.17, 118.68, 115.65, 116.61, 117.48, 118.85, 124.57, 127.12, 138.69, 150.06, 157.26, 156.06, 173.9, 190.1, 165.24, 182.77, 190.3, 164.44, 150.77, 154.78, 160.3, 163.47, 143.14, 155.41, 154.67, 160.82, 175.6, 167.74, 167.98, 162.48, 160.86, 158.44, 163.1, 153.93, 158.39, 159.56, 147.68, 163.51, 186.49, 189.12, 191.49, 212.61, 219.43, 210.57, 236.61, 247.24, 227.72, 245.36, 236.76] }, returns: { '1W': -3.3, '1M': -0.7, 'YTD': 60.9, '6M': 52.7, '1Y': 136.8 } },
  'Electrification': { etfs: ['PBW', 'VOLT', 'POW'], series: { '1W': [100, 102.4, 103.46, 98.75, 97.67], '1M': [100, 99.41, 99.38, 98.37, 97.97, 100.1, 98.96, 98.85, 92.08, 92.77, 91.63, 88.59, 92.69, 93.46, 95.98, 94.92, 95.03, 97.27, 98.34, 93.89, 92.92], 'YTD': [100, 104.13, 109.93, 113.55, 115.16, 110.83, 117.42, 118.62, 121.85, 114.21, 114.69, 116.11, 119.56, 116.34, 123.8, 127.41, 134.02, 135.5, 147.78, 146.34, 134.86, 149.04, 148.29, 137.29, 142.31, 139.16], '6M': [100, 101.25, 102.46, 108.6, 108.86, 109.19, 114.92, 115.55, 116.29, 117.82, 111.89, 113.6, 113.42, 108.06, 113.68, 124.91, 127.13, 131.6, 142.53, 146.35, 134.15, 146.06, 145.94, 133.76, 138.68, 135.66], '1Y': [100, 101.49, 105.7, 106.94, 110.58, 107.8, 107.09, 111.18, 111.25, 113.84, 110.78, 110.9, 115.62, 120, 124.29, 128.64, 135.83, 128.86, 134.92, 134.35, 133.43, 127.64, 129.85, 132.62, 135.45, 130.77, 136.44, 135.13, 136.37, 141.55, 142.2, 141.86, 143.37, 144.07, 144.89, 148.6, 144.31, 147.2, 147.93, 144.89, 152.16, 162.58, 165.51, 163.99, 173.28, 179.12, 169.73, 180.74, 181.54, 169.94, 173.18, 168.4] }, returns: { '1W': -2.3, '1M': -7.1, 'YTD': 39.2, '6M': 35.7, '1Y': 68.4 } },
  'Industrials': { etfs: ['PRN', 'RSHO', 'BILT'], series: { '1W': [100, 100.67, 102.52, 101.43, 101.15], '1M': [100, 99.94, 99.46, 98.95, 97.76, 99.81, 100.04, 100.48, 97.73, 97.9, 98.27, 97.15, 97.89, 100, 99.5, 99.98, 99.76, 100.44, 102.33, 101.2, 100.93], 'YTD': [100, 102.86, 106.98, 108.43, 109.5, 110.83, 116.67, 118.63, 119.99, 115.33, 111.99, 111.2, 114.11, 112.82, 119.67, 119.44, 121.03, 120.71, 127.83, 127.48, 122.21, 129.06, 129.07, 126.62, 129.2, 130.55], '6M': [100, 99.26, 101.42, 105.98, 105.68, 106.27, 113.02, 115.67, 116.97, 116.84, 110.42, 109.15, 108.15, 106.82, 111.31, 118.8, 118.56, 119.71, 122.41, 125.17, 121.55, 124.89, 124.85, 123.72, 126.44, 127.74], '1Y': [100, 101.55, 102.98, 103.56, 104.87, 105, 103.96, 105.89, 104.13, 106.59, 104.95, 106.5, 107.23, 108.22, 109.21, 110.13, 110.74, 109.7, 113.2, 112.23, 110.59, 105.73, 108.08, 109.32, 111.83, 107.95, 112.97, 113.24, 116.22, 120.6, 120.69, 122.74, 128.43, 131.73, 131.04, 130.64, 124.44, 122.48, 123.96, 121.31, 125.52, 133.11, 134.54, 135.13, 137.71, 141.67, 136.33, 140.76, 141.31, 139.82, 142.54, 144.71] }, returns: { '1W': 1.2, '1M': 0.9, 'YTD': 30.6, '6M': 27.7, '1Y': 44.7 } },
  'Meme': { etfs: ['MEME', 'BUZZ', 'RKNG'], series: { '1W': [100, 103.54, 103.4, 98.59, 95.57], '1M': [100, 101.49, 103.34, 102.02, 102.24, 104.7, 101.07, 101.6, 91.3, 93.63, 90.34, 87.84, 93.47, 92.31, 97.44, 93.66, 94.22, 97.55, 97.4, 92.92, 90.13], 'YTD': [100, 108.03, 108.23, 107.22, 102.68, 89.95, 92.02, 95.05, 95.18, 93.73, 92.78, 90.43, 93.62, 91.36, 100.37, 111.62, 113.88, 111.01, 124.96, 123.8, 122.14, 140.11, 139.02, 125.07, 128.2, 122.78], '6M': [100, 99.58, 103.35, 104.03, 98.06, 94.17, 94.08, 89.31, 89.39, 91.27, 89.21, 87.13, 89.11, 83.9, 92.57, 104.76, 108.31, 106.38, 116.12, 120.79, 118.54, 132.37, 137.22, 119.87, 122.9, 117.73], '1Y': [100, 102.23, 100.92, 96.42, 96.94, 91.88, 90.49, 90.05, 84.2, 84.09, 84.22, 86.98, 89.11, 90.55, 86.88, 93.77, 92.2, 89.11, 95.23, 94.65, 93.97, 89.25, 87.29, 87.82, 87.7, 83.46, 89.05, 90.64, 92.19, 93.64, 93.38, 92.35, 90.04, 90.7, 86.65, 93.26, 94.39, 98.45, 101.3, 92.03, 93.7, 103.13, 108.74, 111.58, 109.86, 114.22, 114.1, 117.31, 116.79, 112.27, 116.59, 108.32] }, returns: { '1W': -4.4, '1M': -9.9, 'YTD': 22.8, '6M': 17.7, '1Y': 8.3 } },
};
// @@END_GENERATED:THEME_REPRESENTATIVES@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVDA', easyScore: 10, avgWeight: 6.21, proScore: 6.21, coverage: 1,
      price: 198.59, weeklyPrices: [204.65, 210.69, 208.65, 200.04, 198.59], weeklyChange: -2.96, dayChange: -0.7, sortRank: 0, periodReturns: { '1M': -7.8, 'YTD': 6.5, '6M': 5.3, '1Y': 34.3 },
      priceHistory: { '1D': [200, 200.7, 200.96, 199.35, 198.98, 200.31, 200.98, 201.18, 201.01, 200.52, 200.73, 201.04, 200.79, 200.71, 200.29, 199.66, 199.26, 198.88, 198.26, 197.8, 197.96, 197.66, 197.62, 198.59], '1W': [204.65, 210.69, 208.65, 200.04, 198.59], '1M': [214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 198.59], 'YTD': [186.5, 185.04, 187.05, 184.84, 192.51, 171.88, 186.94, 187.9, 184.89, 183.34, 183.14, 180.4, 178.68, 175.75, 183.91, 198.87, 202.5, 209.25, 207.83, 220.78, 220.61, 212.6, 214.75, 208.19, 207.41, 198.59], '6M': [188.61, 188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 219.44, 222.32, 214.86, 222.82, 208.19, 207.41, 198.59], '1Y': [147.9, 153.3, 162.88, 171.37, 170.78, 179.27, 179.42, 183.16, 175.64, 181.77, 170.62, 177.33, 170.29, 176.97, 187.24, 189.11, 179.83, 180.28, 207.04, 195.21, 193.16, 181.36, 177.82, 179.59, 183.78, 170.94, 188.61, 188.85, 184.86, 186.23, 186.47, 185.61, 185.41, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 219.44, 222.32, 214.86, 222.82, 208.19, 207.41, 198.59] },
      velocityScore: { '1D': -0.3, '1W': 3, '1M': 9.1, '6M': null }, isNew: false,
      marketCap: '$4.8T', pe: 30.5, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.5,
      etfPresence: { AIS: 2.26, ARTY: 4.43, BAI: 4.01, IGPT: 7.45, IVES: 4.89, ALAI: 12.57, CHAT: 6.37, AIFD: 6.3, SPRX: 3.34, AOTG: 10.51 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 9, avgWeight: 6.31, proScore: 5.68, coverage: 0.9,
      price: 1030.39, weeklyPrices: [1043.19, 1133.99, 1211.38, 1051.77, 1030.39], weeklyChange: -1.23, dayChange: -2.03, sortRank: 0, periodReturns: { '1M': 37.2, 'YTD': 261, '6M': 259.4, '1Y': 705.6 },
      priceHistory: { '1D': [1051.77, 1040, 1058.12, 1052.8, 1037.31, 1055.05, 1049.43, 1051.02, 1041.56, 1030.03, 1039.86, 1044.4, 1044.41, 1045.79, 1040.03, 1041.45, 1037.15, 1034.3, 1020.77, 1026.33, 1022.51, 1014.12, 1018.51, 1030.39], '1W': [1043.19, 1133.99, 1211.38, 1051.77, 1030.39], '1M': [895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1030.39], 'YTD': [285.41, 327.02, 336.63, 397.58, 435.79, 382.89, 413.97, 417.35, 415.56, 397.05, 405.35, 461.73, 382.09, 367.85, 421.51, 456.23, 487.48, 518.46, 666.59, 766.58, 698.74, 928.41, 1079.57, 935.89, 1020.76, 1030.39], '6M': [286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 795.33, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1030.39], '1Y': [127.91, 120.89, 122.24, 116.43, 109.83, 114.74, 108.78, 127.75, 122.05, 116.5, 118.72, 140, 159.99, 161.71, 182.15, 196.54, 191.94, 198.47, 226.63, 237.5, 241.11, 228.5, 224.53, 234.16, 263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 795.33, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1030.39] },
      velocityScore: { '1D': -6.6, '1W': -9.1, '1M': 8, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 48.7, revenueGrowth: 196, eps: 21.14, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { AIS: 8.38, ARTY: 4.98, BAI: 6.28, IGPT: 8.05, IVES: 5.05, ALAI: 1.24, CHAT: 3.97, AIFD: 7.6, SPRX: false, AOTG: 11.2 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'AMD', easyScore: 9, avgWeight: 5.41, proScore: 4.87, coverage: 0.9,
      price: 514.83, weeklyPrices: [512.48, 537.37, 551.63, 519.85, 514.83], weeklyChange: 0.46, dayChange: -0.97, sortRank: 0, periodReturns: { '1M': 10.1, 'YTD': 140.4, '6M': 139.4, '1Y': 271.9 },
      priceHistory: { '1D': [519.85, 511.32, 522.71, 521.78, 514.3, 522.57, 520.78, 519.9, 517.25, 515.14, 518.52, 521.38, 520.91, 521.55, 520.77, 518.1, 516.24, 513.38, 509.96, 509.67, 510.36, 509.74, 510.76, 514.83], '1W': [512.48, 537.37, 551.63, 519.85, 514.83], '1M': [503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 514.83], 'YTD': [214.16, 204.68, 227.92, 253.73, 252.18, 192.5, 205.94, 203.37, 203.68, 199.45, 197.74, 199.46, 220.27, 210.21, 236.64, 258.12, 303.46, 337.11, 421.39, 448.29, 414.05, 495.54, 542.52, 475.51, 507.29, 514.83], '6M': [215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 458.79, 420.99, 503.89, 521.54, 475.51, 507.29, 514.83], '1Y': [138.43, 136.11, 138.41, 160.08, 158.65, 179.51, 163.12, 174.95, 166.55, 166.62, 162.13, 159.54, 159.16, 160.88, 164.01, 235.56, 238.6, 230.23, 264.33, 256.33, 237.52, 230.29, 206.13, 217.6, 221.42, 198.11, 215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 458.79, 420.99, 503.89, 521.54, 475.51, 507.29, 514.83] },
      velocityScore: { '1D': -2.2, '1W': -1.6, '1M': -3.6, '6M': null }, isNew: false,
      marketCap: '$839B', pe: 170.5, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.39, ARTY: 4.75, BAI: 4.8, IGPT: 8.11, IVES: 4.74, ALAI: 1.24, CHAT: 3.97, AIFD: false, SPRX: 0.53, AOTG: 16.12 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 7, avgWeight: 3.99, proScore: 2.8, coverage: 0.7,
      price: 382.02, weeklyPrices: [392.90, 411.35, 392.13, 380.15, 382.02], weeklyChange: -2.77, dayChange: 0.49, sortRank: 0, periodReturns: { '1M': -7.8, 'YTD': 10.4, '6M': 9.1, '1Y': 44.8 },
      priceHistory: { '1D': [380.15, 382.2, 384.29, 382, 380.63, 383.76, 384.45, 384.87, 385.89, 384.14, 384.95, 385.14, 384.23, 385.66, 385.37, 384.16, 383.62, 383.42, 381.85, 380.52, 380.74, 380.3, 380.21, 382.02], '1W': [392.9, 411.35, 392.13, 380.15, 382.02], '1M': [422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.02], 'YTD': [346.1, 332.48, 343.02, 325.49, 330.73, 310.51, 331.17, 333.99, 321.7, 332.77, 335.97, 315.93, 318.81, 313.49, 354.91, 396.72, 422.65, 405.45, 425.44, 419.3, 411.07, 421.86, 479.23, 392.16, 376.71, 382.02], '6M': [350.22, 347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 428.43, 420.71, 422.01, 481.57, 392.16, 376.71, 382.02], '1Y': [263.77, 264.74, 277.9, 280.81, 283.69, 302.62, 301.67, 312.83, 294.91, 298.01, 302.39, 369.57, 346.17, 339.31, 333.39, 345.5, 351.33, 340.3, 385.98, 358.98, 351.96, 340.5, 385.03, 380.61, 412.97, 326.02, 350.22, 347.62, 344.97, 351.71, 324.85, 331.11, 332.92, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 428.43, 420.71, 422.01, 481.57, 392.16, 376.71, 382.02] },
      velocityScore: { '1D': 1.4, '1W': 5.3, '1M': -14.1, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 63.6, revenueGrowth: 48, eps: 6.01, grossMargin: 76, dividendYield: 0.68,
      etfPresence: { AIS: false, ARTY: 4.34, BAI: 4.13, IGPT: false, IVES: 4.78, ALAI: 3.9, CHAT: 4, AIFD: 5.26, SPRX: false, AOTG: 1.55 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MRVL', easyScore: 7, avgWeight: 3.81, proScore: 2.67, coverage: 0.7,
      price: 270.7, weeklyPrices: [289.54, 310.58, 307.86, 279.04, 270.70], weeklyChange: -6.51, dayChange: -2.99, sortRank: 0, periodReturns: { '1M': 37.9, 'YTD': 218.5, '6M': 213, '1Y': 259.9 },
      priceHistory: { '1D': [279.04, 270.68, 273.25, 270.88, 266.54, 272.03, 273.7, 275.17, 272.15, 268.52, 270.12, 271.78, 272.26, 271.72, 271.73, 271, 269.92, 268.76, 266.56, 266.8, 268.48, 267.26, 267.64, 270.7], '1W': [289.54, 310.58, 307.86, 279.04, 270.7], '1M': [208.26, 198.7, 204.83, 205, 219.43, 290.79, 301.65, 316.43, 263.47, 288.85, 266.88, 252.59, 280.71, 279.7, 308.88, 278.67, 289.54, 310.58, 307.86, 279.04, 270.7], 'YTD': [84.98, 83.45, 80.38, 83.1, 81.34, 74.21, 78.23, 79.61, 79.29, 75.68, 87.67, 87.62, 98.45, 106.71, 119.93, 134.6, 157.32, 156.57, 172.15, 164.5, 176.27, 198.7, 301.65, 266.88, 278.67, 270.7], '6M': [86.49, 89.39, 83.22, 80.46, 81.77, 78.66, 82.35, 78.61, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 170.84, 168.93, 208.26, 290.79, 266.88, 278.67, 270.7], '1Y': [75.21, 76.24, 72.26, 70.85, 73.27, 81.74, 75.32, 77.81, 72.07, 74.26, 62.31, 67.1, 70.98, 80.09, 83.89, 92.5, 88.89, 81.05, 90.15, 92.9, 89.33, 78.68, 83.43, 100.2, 92.47, 81.7, 86.49, 89.39, 83.22, 80.46, 81.77, 78.66, 80.28, 78.61, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 170.84, 168.93, 208.26, 290.79, 266.88, 278.67, 270.7] },
      velocityScore: { '1D': -2.6, '1W': -1.5, '1M': 14.1, '6M': null }, isNew: false,
      marketCap: '$237B', pe: 93.3, revenueGrowth: 28, eps: 2.9, grossMargin: 52, dividendYield: 0.09,
      etfPresence: { AIS: 4.46, ARTY: 4.31, BAI: 1.93, IGPT: 3.56, IVES: false, ALAI: false, CHAT: 1.5, AIFD: 6.47, SPRX: 4.45, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'TSM', name: 'TSM', easyScore: 6, avgWeight: 4.83, proScore: 2.9, coverage: 0.6,
      price: 439.55, weeklyPrices: [432.15, 462.12, 467.67, 436.39, 439.55], weeklyChange: 1.71, dayChange: 0.72, sortRank: 0, periodReturns: { '1M': 8.7, 'YTD': 44.6, '6M': 47.1, '1Y': 99.7 },
      priceHistory: { '1D': [436.39, 434.62, 439.76, 439.42, 437.17, 440.47, 441.67, 441.49, 440, 439.28, 441.11, 442.34, 442.35, 443.19, 442.14, 441.03, 440.2, 439.58, 437.91, 437.15, 437.54, 436.47, 436.8, 439.55], '1W': [432.15, 462.12, 467.67, 436.39, 439.55], '1M': [412.32, 422.73, 424.86, 418.45, 435.63, 446.69, 436.69, 444.92, 415.17, 426.8, 427.92, 408.75, 421.07, 423.93, 441.4, 425.83, 432.15, 462.12, 467.67, 436.39, 439.55], 'YTD': [303.89, 318.01, 341.64, 327.37, 339.55, 330.73, 368.1, 360.39, 376.81, 353.86, 336.71, 339.57, 347.75, 341.49, 365.49, 375.1, 387.44, 393.83, 419.5, 397.28, 392.61, 422.73, 436.69, 427.92, 425.83, 439.55], '6M': [298.8, 319.61, 323.63, 342.4, 332.71, 341.36, 355.41, 366.36, 370.04, 369.11, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 404.54, 395.95, 412.32, 446.69, 427.92, 425.83, 439.55], '1Y': [220.09, 224.68, 231.84, 237.56, 240.33, 242.91, 231.37, 244.29, 232.7, 238.72, 231.39, 260.44, 262.79, 280.71, 288.47, 304.52, 304.71, 288.88, 305.09, 293.64, 291.17, 277.91, 284.68, 295.45, 310.14, 276.96, 298.8, 319.61, 323.63, 342.4, 332.71, 341.36, 348.85, 366.36, 370.04, 369.11, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 404.54, 395.95, 412.32, 446.69, 427.92, 425.83, 439.55] },
      velocityScore: { '1D': -2, '1W': 3.2, '1M': -5.2, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 37.9, revenueGrowth: 35, eps: 11.61, grossMargin: 62, dividendYield: 0.87,
      etfPresence: { AIS: 3.12, ARTY: false, BAI: 4.31, IGPT: false, IVES: 4.99, ALAI: 5.6, CHAT: false, AIFD: 3.45, SPRX: false, AOTG: 7.53 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 4.81, proScore: 2.89, coverage: 0.6,
      price: 345.83, weeklyPrices: [363.79, 368.03, 349.68, 346.13, 345.83], weeklyChange: -4.94, dayChange: -0.07, sortRank: 0, periodReturns: { '1M': -9.7, 'YTD': 10.5, '6M': 10.1, '1Y': 107.4 },
      priceHistory: { '1D': [346.09, 348.44, 348.62, 350.64, 349.73, 350.34, 352.66, 353.21, 350.87, 351.02, 350.68, 350.56, 350.22, 350.6, 349.57, 348.79, 349.46, 349.02, 349.25, 348.73, 348.79, 349.27, 348.52, 345.83], '1W': [363.79, 368.03, 349.68, 346.13, 345.83], '1M': [388.88, 388.83, 390.13, 380.34, 376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68, 369.35, 373.25, 363.79, 368.03, 349.68, 346.13, 345.83], 'YTD': [313, 325.44, 332.78, 330.54, 338.25, 331.25, 309, 302.85, 307.38, 300.88, 303.55, 307.69, 290.93, 297.39, 318.49, 337.12, 339.32, 349.94, 398.04, 387.35, 387.66, 388.83, 358.99, 364.26, 373.25, 345.83], '6M': [314.09, 315.15, 328.57, 330, 333.26, 343.69, 324.32, 305.72, 311.49, 306.52, 306.36, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 388.43, 388.64, 396.94, 388.88, 361.85, 364.26, 373.25, 345.83], '1Y': [166.77, 175.84, 176.62, 182.97, 190.23, 196.53, 196.09, 203.34, 201.57, 207.14, 230.66, 239.17, 249.53, 247.14, 244.9, 244.62, 251.03, 251.69, 274.57, 284.31, 291.31, 284.28, 323.44, 319.63, 320.21, 296.72, 314.09, 315.15, 328.57, 330, 333.26, 343.69, 322.86, 305.72, 311.49, 306.52, 306.36, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 388.43, 388.64, 396.94, 388.88, 361.85, 364.26, 373.25, 345.83] },
      velocityScore: { '1D': 1.8, '1W': 1.4, '1M': -23.7, '6M': null }, isNew: false,
      marketCap: '$4.2T', pe: 26.4, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.13, IGPT: 7.38, IVES: 4.65, ALAI: false, CHAT: 5.01, AIFD: 4.69, SPRX: false, AOTG: 4 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'ANET', name: 'ARISTA NETWORKS INC', easyScore: 6, avgWeight: 2.24, proScore: 1.34, coverage: 0.6,
      price: 163.78, weeklyPrices: [164.93, 169.67, 174.56, 162.20, 163.78], weeklyChange: -0.7, dayChange: 0.97, sortRank: 0, periodReturns: { '1M': 6.3, 'YTD': 25, '6M': 25.2, '1Y': 72.4 },
      priceHistory: { '1D': [162.2, 161.63, 162.9, 162.95, 161.88, 164.01, 164.18, 165.65, 164.72, 164.04, 164.41, 164.68, 164.03, 164.04, 163.8, 163.83, 164.33, 163.51, 163.71, 163.64, 163.73, 162.48, 163.05, 163.78], '1W': [164.93, 169.67, 174.56, 162.2, 163.78], '1M': [158.01, 154.31, 155.27, 159.47, 170.68, 175.33, 174.37, 166.01, 154.27, 156.4, 152.16, 151.76, 156.4, 163.24, 169.09, 168.01, 164.93, 169.67, 174.56, 162.2, 163.78], 'YTD': [131.03, 123.72, 130.59, 138.41, 148.15, 128.67, 135.12, 137.23, 130.25, 139.4, 134.03, 136.07, 135.01, 124.85, 146.05, 154.33, 177.73, 168.68, 147.06, 142.54, 141.58, 154.31, 174.37, 152.16, 168.01, 163.78], '6M': [130.77, 133.6, 122.89, 129.83, 143.72, 138.37, 141.74, 141.59, 127.43, 129.3, 137.17, 135.35, 135.88, 116.13, 133.64, 154.37, 172.86, 165.29, 170.22, 136.43, 141.71, 158.01, 175.33, 152.16, 168.01, 163.78], '1Y': [94.97, 98.91, 106.28, 108.3, 113.04, 122.09, 138.78, 141.25, 132.78, 134.27, 137.38, 150.72, 142.84, 142.64, 149.27, 157.36, 143.38, 146.59, 162.03, 140.42, 134.93, 123.45, 125.04, 127.8, 132.36, 122.36, 130.77, 133.6, 122.89, 129.83, 143.72, 138.37, 137.49, 141.59, 127.43, 129.3, 137.17, 135.35, 135.88, 116.13, 133.64, 154.37, 172.86, 165.29, 170.22, 136.43, 141.71, 158.01, 175.33, 152.16, 168.01, 163.78] },
      velocityScore: { '1D': 0, '1W': -7.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$206B', pe: 56.5, revenueGrowth: 35, eps: 2.9, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: false, ARTY: 2.35, BAI: 1.36, IGPT: false, IVES: false, ALAI: 0.96, CHAT: 2.13, AIFD: 5.06, SPRX: 1.58, AOTG: false },
      tonyNote: 'ARISTA NETWORKS INC appears in 6 of 10 AI & ML ETFs (60% coverage) with average weight 2.2% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 5, avgWeight: 3.86, proScore: 1.93, coverage: 0.5,
      price: 560.36, weeklyPrices: [567.58, 577.22, 563.85, 562.20, 560.36], weeklyChange: -1.27, dayChange: -0.33, sortRank: 0, periodReturns: { '1M': -8.2, 'YTD': -15.1, '6M': -16.1, '1Y': -21.3 },
      priceHistory: { '1D': [562.2, 563.83, 563, 561.57, 561.55, 562.77, 564.72, 566.23, 566.2, 567, 564.68, 563.37, 562.84, 564.4, 562.3, 560.6, 559.05, 558.87, 557.41, 556.82, 556.92, 557.41, 558.19, 560.36], '1W': [567.58, 577.22, 563.85, 562.2, 560.36], '1M': [612.34, 635.26, 635.29, 632.51, 600.47, 597.63, 622.98, 627.57, 593, 585.39, 584.59, 570.98, 568.43, 566.98, 593.48, 600.21, 567.58, 577.22, 563.85, 562.2, 560.36], 'YTD': [660.09, 646.06, 620.8, 647.63, 738.31, 670.21, 649.81, 644.78, 657.01, 660.57, 638.18, 615.68, 594.89, 579.23, 628.39, 671.58, 674.72, 669.12, 612.88, 603, 602.61, 635.26, 622.98, 584.59, 600.21, 560.36], '6M': [667.55, 650.41, 653.06, 620.25, 672.36, 706.41, 677.22, 639.77, 637.25, 653.56, 647.39, 627.45, 604.06, 536.38, 575.05, 662.49, 668.84, 671.34, 604.96, 598.86, 611.21, 612.34, 597.63, 584.59, 600.21, 560.36], '1Y': [712.2, 719.22, 732.78, 702.91, 713.58, 695.21, 771.99, 790, 751.48, 754.1, 737.05, 751.98, 775.72, 760.66, 717.34, 717.84, 717.55, 733.41, 751.67, 635.95, 627.08, 597.69, 636.22, 639.6, 650.13, 649.5, 667.55, 650.41, 653.06, 620.25, 672.36, 706.41, 661.46, 639.77, 637.25, 653.56, 647.39, 627.45, 604.06, 536.38, 575.05, 662.49, 668.84, 671.34, 604.96, 598.86, 611.21, 612.34, 597.63, 584.59, 600.21, 560.36] },
      velocityScore: { '1D': 3.2, '1W': 16.3, '1M': -29.8, '6M': null }, isNew: false,
      marketCap: '$1.4T', pe: 20.4, revenueGrowth: 33, eps: 27.49, grossMargin: 82, dividendYield: 0.37,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: 7.54, IVES: 4.7, ALAI: 3.95, CHAT: 2.02, AIFD: false, SPRX: false, AOTG: 1.09 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.49, proScore: 1.75, coverage: 0.5,
      price: 371.92, weeklyPrices: [378.91, 379.40, 367.34, 373.94, 371.92], weeklyChange: -1.85, dayChange: -0.54, sortRank: 0, periodReturns: { '1M': -11.1, 'YTD': -23.1, '6M': -23.8, '1Y': -24.1 },
      priceHistory: { '1D': [373.94, 377.72, 375.77, 373.13, 374.9, 373.93, 374.63, 374.72, 374.61, 374.91, 373.57, 373.95, 373.96, 374.22, 372.85, 373.08, 372.86, 372.04, 370.91, 371.8, 370.61, 371.61, 372.11, 371.92], '1W': [378.91, 379.4, 367.34, 373.94, 371.92], '1M': [416.03, 412.67, 426.99, 450.24, 460.52, 441.31, 427.34, 428.05, 416.67, 411.74, 403.41, 397.36, 390.34, 390.74, 399.76, 393.83, 378.91, 379.4, 367.34, 373.94, 371.92], 'YTD': [483.62, 478.11, 456.66, 451.14, 433.5, 393.67, 401.84, 398.46, 401.72, 410.68, 401.86, 391.79, 371.04, 369.37, 373.07, 411.22, 432.92, 424.46, 413.96, 407.77, 417.42, 412.67, 427.34, 403.41, 393.83, 371.92], '6M': [488.02, 472.94, 479.28, 459.86, 470.28, 423.37, 413.6, 401.32, 384.47, 398.55, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 412.66, 423.54, 416.03, 441.31, 403.41, 393.83, 371.92], '1Y': [490.11, 492.05, 503.51, 505.62, 505.87, 513.24, 524.94, 529.24, 509.77, 502.04, 505.35, 500.37, 510.02, 510.15, 519.71, 524.85, 513.43, 520.54, 541.55, 507.16, 508.68, 493.79, 476.99, 477.73, 478.56, 476.12, 488.02, 472.94, 479.28, 459.86, 470.28, 423.37, 401.14, 401.32, 384.47, 398.55, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 412.66, 423.54, 416.03, 441.31, 403.41, 393.83, 371.92] },
      velocityScore: { '1D': 6.1, '1W': 2.3, '1M': -32.2, '6M': null }, isNew: false,
      marketCap: '$2.8T', pe: 22.2, revenueGrowth: 18, eps: 16.79, grossMargin: 68, dividendYield: 0.97,
      etfPresence: { AIS: false, ARTY: 2.41, BAI: false, IGPT: false, IVES: 4.69, ALAI: 4.91, CHAT: 2.08, AIFD: false, SPRX: false, AOTG: 3.38 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'ALAB', name: 'ALAB', easyScore: 5, avgWeight: 3.14, proScore: 1.57, coverage: 0.5,
      price: 398.69, weeklyPrices: [374.68, 417.07, 439.66, 397.02, 398.69], weeklyChange: 6.41, dayChange: 0.42, sortRank: 0, periodReturns: { '1M': 29.9, 'YTD': 139.7, '6M': 134.6, '1Y': 356.9 },
      priceHistory: { '1D': [397.02, 402.6, 408.69, 399.55, 397.11, 407.81, 410.78, 412.04, 406.34, 402.33, 403.68, 404.66, 403.48, 402.86, 402.1, 399.62, 397.28, 396.33, 393.38, 393.73, 395.4, 393.27, 395.09, 398.69], '1W': [374.68, 417.07, 439.66, 397.02, 398.69], '1M': [318.72, 325.33, 349.17, 342.85, 320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 361.71, 374.68, 417.07, 439.66, 397.02, 398.69], 'YTD': [166.36, 156.73, 174.45, 176.35, 160.46, 142.82, 126.58, 132.62, 124.67, 120, 119.9, 126.34, 120.33, 106.33, 129.46, 172.09, 194.06, 196.85, 213.91, 204.42, 244.26, 325.33, 363.54, 341.7, 361.71, 398.69], '6M': [169.97, 179.56, 162.61, 182, 163.25, 152.44, 187.67, 129.32, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 207.35, 215.58, 318.72, 355.76, 341.7, 361.71, 398.69], '1Y': [87.26, 88.66, 99.86, 91.94, 119.48, 128.87, 174.39, 192, 171.06, 178.56, 176.61, 230.37, 249.38, 205.27, 194.5, 219.36, 161.46, 154.85, 173.62, 181.94, 167.55, 139.52, 144.78, 152.5, 164.32, 140.24, 169.97, 179.56, 162.61, 182, 163.25, 152.44, 169.85, 129.32, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 207.35, 215.58, 318.72, 355.76, 341.7, 361.71, 398.69] },
      velocityScore: { '1D': -1.9, '1W': 2.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$68B', pe: 271.2, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 1.97, ARTY: 1.32, BAI: false, IGPT: false, IVES: false, ALAI: 1.16, CHAT: 2.77, AIFD: false, SPRX: 8.5, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 5, avgWeight: 2.8, proScore: 1.4, coverage: 0.5,
      price: 627.49, weeklyPrices: [712.13, 746.23, 732.62, 670.75, 627.49], weeklyChange: -11.89, dayChange: -6.45, sortRank: 0, periodReturns: { '1M': 29.6, 'YTD': 264.2, '6M': 249.5, '1Y': 910.9 },
      priceHistory: { '1D': [670.75, 640.52, 654.98, 651.09, 640.03, 652.63, 654.75, 656.33, 651.12, 651.01, 644.37, 645.73, 645.44, 645.6, 640.26, 635.69, 634.88, 629.6, 621.17, 623.63, 620.95, 619.59, 625.93, 627.49], '1W': [712.13, 746.23, 732.62, 670.75, 627.49], '1M': [524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 627.49], 'YTD': [172.27, 187.68, 222.1, 243.29, 278.41, 260.19, 284.1, 284.67, 282.25, 259.03, 261.18, 304.9, 296.14, 297.73, 337.88, 365, 389.1, 412.76, 483.15, 488.74, 455.8, 530.6, 594.11, 517.72, 681.08, 627.49], '6M': [179.56, 187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 515.83, 458.68, 524.65, 563.1, 517.72, 681.08, 627.49], '1Y': [62.07, 63.84, 64.64, 66.53, 69.32, 71.43, 73.78, 75.91, 75.86, 79.71, 86, 95.02, 100.94, 109.69, 130.59, 121.18, 120.44, 120.47, 141.38, 160.1, 169.99, 152.86, 155.41, 155.59, 181.95, 166.26, 179.56, 187.7, 200.46, 221.51, 240.85, 270.23, 282.58, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 515.83, 458.68, 524.65, 563.1, 517.72, 681.08, 627.49] },
      velocityScore: { '1D': -22.2, '1W': -19.5, '1M': -26.3, '6M': null }, isNew: false,
      marketCap: '$216B', pe: 37.6, revenueGrowth: 46, eps: 16.7, grossMargin: 45, dividendYield: 0.09,
      etfPresence: { AIS: 1.91, ARTY: 3.11, BAI: 3.5, IGPT: false, IVES: false, ALAI: 4.59, CHAT: false, AIFD: false, SPRX: false, AOTG: 0.87 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 5, avgWeight: 2.68, proScore: 1.34, coverage: 0.5,
      price: 843.47, weeklyPrices: [869.98, 850.00, 893.93, 827.92, 843.47], weeklyChange: -3.05, dayChange: 1.88, sortRank: 0, periodReturns: { '1M': -10.9, 'YTD': 128.8, '6M': 113, '1Y': 818.7 },
      priceHistory: { '1D': [827.92, 810, 833.91, 824, 825.34, 838.04, 850.42, 852.61, 847.42, 845.33, 845.37, 848.76, 847.02, 850.88, 847.81, 843.78, 840.42, 839.21, 832.57, 835.62, 833.88, 835.52, 839.6, 843.47], '1W': [869.98, 850, 893.93, 827.92, 843.47], '1M': [910.81, 902.31, 860.62, 854.96, 905, 1029.15, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93, 827.92, 843.47], 'YTD': [368.59, 348.26, 343.27, 354.49, 381.44, 504.42, 583.46, 635.64, 677, 650.82, 616.09, 700.81, 777.17, 764.65, 894.13, 824.01, 873.6, 858.32, 944.28, 992.37, 890.09, 902.31, 938, 821.76, 875.36, 843.47], '6M': [395.92, 386.11, 351.42, 324.25, 332.45, 423.42, 577.15, 562.74, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 1053.09, 884.98, 910.81, 1029.15, 821.76, 875.36, 843.47], '1Y': [91.81, 91.49, 90.44, 99.63, 102.13, 109.85, 110.01, 119.66, 117.96, 124.62, 134.12, 164.88, 163.34, 152.75, 171.4, 163.09, 156.57, 158.06, 214.28, 232.75, 252.47, 247.43, 291.27, 302.98, 366, 320.25, 395.92, 386.11, 351.42, 324.25, 332.45, 423.42, 551.99, 562.74, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 1053.09, 884.98, 910.81, 1029.15, 821.76, 875.36, 843.47] },
      velocityScore: { '1D': 1.5, '1W': -7.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$66B', pe: 147.7, revenueGrowth: 90, eps: 5.71, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.51, IGPT: false, IVES: false, ALAI: 0.39, CHAT: 1.35, AIFD: 5.9, SPRX: 3.24, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 5 of 10 AI & ML ETFs (50% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 5, avgWeight: 2.37, proScore: 1.19, coverage: 0.5,
      price: 1900, weeklyPrices: [1958.80, 2184.75, 2273.73, 1963.60, 1900.00], weeklyChange: -3, dayChange: -3.24, sortRank: 0, periodReturns: { '1M': 28.5, 'YTD': 700.4, '6M': 659.8, '1Y': 3913.5 },
      priceHistory: { '1D': [1963.6, 1939.49, 1975.87, 1961.4, 1940, 1956.48, 1945, 1943.72, 1919.03, 1925.52, 1917.98, 1928.99, 1933.77, 1931.5, 1927.67, 1917.4, 1910.55, 1893.62, 1873.99, 1885.07, 1878.2, 1875.03, 1889.95, 1900], '1W': [1958.8, 2184.75, 2273.73, 1963.6, 1900], '1M': [1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1900], 'YTD': [237.38, 334.54, 409.24, 503.44, 539.3, 576.2, 630.29, 621.09, 651.9, 565.59, 618.82, 753.69, 677.86, 692.73, 851.57, 891.72, 979.07, 1064.21, 1409.98, 1452.02, 1383.29, 1589.94, 1831.5, 1646.54, 1991.55, 1900], '6M': [250.08, 275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1547.56, 1333.01, 1589.55, 1716.36, 1646.54, 1991.55, 1900], '1Y': [47.34, 44.96, 46.2, 41.36, 43, 43.39, 42.1, 46.83, 44.58, 47.35, 53.01, 73.92, 93.97, 99.83, 121.12, 131.88, 144.3, 146.95, 204.36, 216.5, 271.58, 244.93, 220.5, 194.38, 232.86, 206.83, 250.08, 275.24, 377.41, 413.62, 470.8, 665.24, 597.95, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1547.56, 1333.01, 1589.55, 1716.36, 1646.54, 1991.55, 1900] },
      velocityScore: { '1D': -6.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$281B', pe: 64.9, revenueGrowth: 251, eps: 29.26, grossMargin: 56, dividendYield: null,
      etfPresence: { AIS: 2.19, ARTY: false, BAI: 2.96, IGPT: 4.24, IVES: false, ALAI: 0.47, CHAT: false, AIFD: false, SPRX: false, AOTG: 2 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 4, avgWeight: 3.93, proScore: 1.57, coverage: 0.4,
      price: 238.42, weeklyPrices: [237.50, 244.39, 232.79, 234.11, 238.42], weeklyChange: 0.39, dayChange: 1.84, sortRank: 0, periodReturns: { '1M': -10.5, 'YTD': 3.3, '6M': 2.6, '1Y': 12.1 },
      priceHistory: { '1D': [234.11, 237.8, 238.06, 237.03, 238.67, 238.69, 240.01, 241.13, 241.89, 241.82, 241.07, 241.61, 241.84, 241.53, 240.64, 240.31, 239.73, 239.92, 239.34, 239.27, 238.59, 238.44, 238.65, 238.42], '1W': [237.5, 244.39, 232.79, 234.11, 238.42], '1M': [265.29, 271.85, 274, 270.64, 261.26, 256.52, 250.02, 253.79, 246.03, 245.22, 244.19, 238, 241.51, 238.55, 246.02, 246, 237.5, 244.39, 232.79, 234.11, 238.42], 'YTD': [230.82, 246.29, 238.18, 234.34, 241.73, 222.69, 199.6, 204.86, 207.92, 218.94, 209.53, 209.87, 211.71, 210.57, 233.65, 248.5, 255.36, 263.04, 274.99, 265.82, 259.34, 271.85, 250.02, 244.19, 246, 238.42], '6M': [232.38, 226.5, 247.38, 239.12, 238.42, 242.96, 208.72, 198.79, 205.27, 208.39, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 268.99, 264.86, 265.29, 256.52, 244.19, 246, 238.42], '1Y': [212.77, 220.46, 222.54, 223.19, 228.29, 230.19, 222.31, 221.47, 228.01, 228.71, 225.99, 230.33, 231.62, 220.21, 220.63, 225.22, 215.57, 217.95, 230.3, 250.2, 249.1, 222.55, 229.67, 232.38, 231.78, 221.27, 232.38, 226.5, 247.38, 239.12, 238.42, 242.96, 210.32, 198.79, 205.27, 208.39, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 268.99, 264.86, 265.29, 256.52, 244.19, 246, 238.42] },
      velocityScore: { '1D': 5.4, '1W': -21.5, '1M': -48, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 32.2, revenueGrowth: 17, eps: 7.4, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 4.77, ALAI: 5.46, CHAT: 2.29, AIFD: 3.19, SPRX: false, AOTG: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'ARM', name: 'ARM', easyScore: 4, avgWeight: 3.59, proScore: 1.44, coverage: 0.4,
      price: 353.5, weeklyPrices: [418.88, 439.46, 407.72, 366.39, 353.50], weeklyChange: -15.61, dayChange: -3.52, sortRank: 0, periodReturns: { '1M': 15.3, 'YTD': 223.4, '6M': 216.9, '1Y': 126 },
      priceHistory: { '1D': [366.39, 353.83, 357.19, 353.09, 352.38, 359.04, 362.26, 358.44, 356.23, 355.3, 355.47, 356.24, 356.81, 355.5, 355.56, 353.56, 352.07, 349.74, 349.13, 349.2, 349.42, 349.84, 351.52, 353.5], '1W': [418.88, 439.46, 407.72, 366.39, 353.5], '1M': [321.22, 302.71, 335.27, 353.29, 408.85, 402.71, 411.83, 393.44, 342.93, 346.39, 324.86, 307.43, 342.23, 380.81, 412.55, 396.34, 418.88, 439.46, 407.72, 366.39, 353.5], 'YTD': [109.31, 113.08, 105.11, 119.2, 108.43, 110.88, 122.19, 126.93, 129.26, 120.62, 115.12, 128.36, 157.07, 155.07, 149.79, 159.34, 196.57, 201.69, 237.3, 207.92, 223.15, 302.71, 411.83, 324.86, 396.34, 353.5], '6M': [111.55, 114.73, 111.79, 105.78, 114.73, 106.93, 124.61, 125.28, 123.78, 124.37, 117.63, 121.7, 136.89, 136.96, 143.86, 161.22, 175.49, 198.65, 208.84, 212.65, 215.12, 321.22, 402.71, 324.86, 396.34, 353.5], '1Y': [156.41, 156.33, 148.02, 153.9, 159.28, 163.32, 136.12, 142.39, 134.01, 140.26, 131.42, 154.14, 153.37, 144.3, 150.38, 166.77, 170.67, 165.71, 170.39, 160.19, 149.74, 136.04, 131.44, 139.19, 141.52, 114.58, 111.55, 114.73, 111.79, 105.78, 114.73, 106.93, 123.7, 125.28, 123.78, 124.37, 117.63, 121.7, 136.89, 136.96, 143.86, 161.22, 175.49, 198.65, 208.84, 212.65, 215.12, 321.22, 402.71, 324.86, 396.34, 353.5] },
      velocityScore: { '1D': -2.7, '1W': 2.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$378B', pe: 420.8, revenueGrowth: 20, eps: 0.84, grossMargin: 98, dividendYield: null,
      etfPresence: { AIS: 2.39, ARTY: false, BAI: false, IGPT: false, IVES: false, ALAI: 0.19, CHAT: 2.73, AIFD: false, SPRX: 9.04, AOTG: false },
      tonyNote: 'Arm Holdings is held across Broad Tech and AI ETFs as the CPU architecture licensor embedded in every mobile device and increasingly in AI inference chips and data center CPUs. Revenue grew and the royalty model is high-margin; the weight score reflects consistent institutional positioning as the AI chip design ecosystem expands on Arm cores.',
    },
    {
      ticker: 'INTC', name: 'INTC', easyScore: 4, avgWeight: 3.18, proScore: 1.27, coverage: 0.4,
      price: 131.27, weeklyPrices: [121.10, 133.99, 140.94, 132.28, 131.27], weeklyChange: 8.4, dayChange: -0.76, sortRank: 0, periodReturns: { '1M': 9.5, 'YTD': 255.8, '6M': 263, '1Y': 482.1 },
      priceHistory: { '1D': [132.28, 130.53, 132.68, 132.21, 131.76, 134.48, 135.15, 135.94, 134.71, 134.2, 134.25, 134.89, 134.59, 134.65, 134.01, 132.06, 131.98, 131.41, 130.35, 130.57, 129.87, 129.9, 130.57, 131.27], '1W': [121.1, 133.99, 140.94, 132.28, 131.27], '1M': [123.52, 121.77, 120.89, 114.68, 109.33, 107.93, 112.71, 111.78, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.27], 'YTD': [36.9, 41.11, 48.32, 54.32, 48.66, 48.24, 46.48, 44.62, 45.46, 45.95, 45.25, 45.03, 47.18, 48.03, 61.72, 64.94, 65.27, 94.75, 113.01, 120.61, 110.8, 121.77, 112.71, 107.92, 117.05, 131.27], '6M': [36.16, 39.38, 45.55, 46.96, 42.49, 48.81, 50.24, 46.79, 43.63, 45.5, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 129.44, 108.17, 123.52, 107.93, 107.92, 117.05, 131.27], '1Y': [22.55, 22.85, 23.44, 22.69, 23.49, 20.34, 20.41, 21.81, 25.31, 24.35, 24, 24.77, 24.9, 31.22, 35.94, 37.43, 37.15, 36.92, 41.34, 38.38, 37.88, 34.33, 35.83, 43.76, 40.78, 36.05, 36.16, 39.38, 45.55, 46.96, 42.49, 48.81, 50.59, 46.79, 43.63, 45.5, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 129.44, 108.17, 123.52, 107.93, 107.92, 117.05, 131.27] },
      velocityScore: { '1D': -1.6, '1W': -9.3, '1M': -56.2, '6M': null }, isNew: false,
      marketCap: '$660B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.33, ARTY: false, BAI: 3.23, IGPT: 4.85, IVES: false, ALAI: false, CHAT: 1.32, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'VRT', name: 'VRT', easyScore: 4, avgWeight: 3.04, proScore: 1.22, coverage: 0.4,
      price: 315.21, weeklyPrices: [317.58, 333.05, 357.96, 318.32, 315.21], weeklyChange: -0.75, dayChange: -0.98, sortRank: 0, periodReturns: { '1M': -3.7, 'YTD': 94.6, '6M': 88.9, '1Y': 157.7 },
      priceHistory: { '1D': [318.32, 311.91, 319.35, 320.61, 318.15, 321.43, 322.27, 322.57, 320.92, 322.14, 321.19, 322.31, 320.33, 319.77, 319.29, 317.12, 316.47, 315.47, 313.08, 313.93, 313.89, 313.73, 313.82, 315.21], '1W': [317.58, 333.05, 357.96, 318.32, 315.21], '1M': [323.91, 319.78, 314.18, 315.71, 323.39, 334.49, 331.44, 323.92, 300.51, 300.57, 289.52, 280.98, 297.88, 302.87, 311.93, 299.6, 317.58, 333.05, 357.96, 318.32, 315.21], 'YTD': [162.01, 160.78, 172.54, 181.12, 195.1, 177.75, 236.51, 243.06, 259.23, 249.75, 265.38, 264.71, 276.16, 259.37, 287.64, 301.16, 305.14, 306.18, 358.92, 367.13, 322.63, 319.78, 331.44, 289.52, 299.6, 315.21], '6M': [166.87, 175.61, 163.58, 176.93, 181.23, 190.01, 202, 234.53, 245.42, 257.75, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.92, 339.73, 323.91, 334.49, 289.52, 299.6, 315.21], '1Y': [122.32, 122.54, 128.37, 125.4, 130.19, 144.17, 139.75, 143.72, 129.05, 127.93, 125.59, 136.74, 136.83, 141.62, 161.59, 167.38, 180.51, 171.59, 199.27, 190.71, 179.05, 164.86, 169.57, 178.88, 181.82, 149.83, 166.87, 175.61, 163.58, 176.93, 181.23, 190.01, 195.58, 234.53, 245.42, 257.75, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.92, 339.73, 323.91, 334.49, 289.52, 299.6, 315.21] },
      velocityScore: { '1D': 0.8, '1W': null, '1M': -39, '6M': null }, isNew: false,
      marketCap: '$121B', pe: 79.2, revenueGrowth: 30, eps: 3.98, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 3.57, ARTY: false, BAI: 1.91, IGPT: false, IVES: false, ALAI: false, CHAT: 2.22, AIFD: 4.48, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'STX', name: 'STX', easyScore: 4, avgWeight: 2.9, proScore: 1.16, coverage: 0.4,
      price: 974.15, weeklyPrices: [1066.07, 1070.23, 1094.04, 1038.59, 974.15], weeklyChange: -8.62, dayChange: -6.2, sortRank: 0, periodReturns: { '1M': 19.9, 'YTD': 253.7, '6M': 241.5, '1Y': 614.7 },
      priceHistory: { '1D': [1038.59, 996.35, 1015.05, 1014.18, 1000.73, 1020.99, 1026.36, 1025.18, 1012.82, 1013.02, 1006.88, 1007.18, 1001.43, 999.81, 991.65, 981.7, 977.46, 978.03, 970.16, 973.61, 969.86, 965.14, 970.89, 974.15], '1W': [1066.07, 1070.23, 1094.04, 1038.59, 974.15], '1M': [845.76, 870.66, 880.72, 879.8, 921.26, 926.61, 940.69, 925.99, 847.47, 876.77, 846.01, 815.99, 868.09, 931.04, 1018.8, 1031.34, 1066.07, 1070.23, 1094.04, 1038.59, 974.15], 'YTD': [275.39, 284.47, 320.32, 346.53, 446.57, 405.45, 431.17, 408.97, 409.67, 367.34, 373.98, 406.77, 413.22, 423.12, 500.77, 519.6, 579.88, 643.3, 786.42, 808.8, 733.35, 870.66, 940.69, 846.01, 1031.34, 974.15], '6M': [285.27, 287.54, 304.01, 326.23, 358.29, 432.95, 425, 425.99, 407.4, 379.52, 374.33, 398.78, 404.02, 362.43, 468.72, 533.44, 559.9, 579.03, 771.01, 834.01, 740.84, 845.76, 926.61, 846.01, 1031.34, 974.15], '1Y': [136.31, 145.04, 142.01, 147.12, 152.76, 147.42, 147.27, 155.59, 157.93, 165.24, 176.32, 193.04, 213.36, 223.7, 256.84, 224.35, 219.38, 215.05, 265.62, 275.77, 288, 253.86, 261.89, 258.67, 298.92, 277.65, 285.27, 287.54, 304.01, 326.23, 358.29, 432.95, 429.32, 425.99, 407.4, 379.52, 374.33, 398.78, 404.02, 362.43, 468.72, 533.44, 559.9, 579.03, 771.01, 834.01, 740.84, 845.76, 926.61, 846.01, 1031.34, 974.15] },
      velocityScore: { '1D': null, '1W': -8.7, '1M': -39.3, '6M': null }, isNew: true,
      marketCap: '$220B', pe: 92.9, revenueGrowth: 44, eps: 10.49, grossMargin: 42, dividendYield: 0.29,
      etfPresence: { AIS: 2.94, ARTY: 3.06, BAI: false, IGPT: 3.4, IVES: false, ALAI: 2.19, CHAT: false, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 4, avgWeight: 2.77, proScore: 1.11, coverage: 0.4,
      price: 157.75, weeklyPrices: [183.53, 184.29, 175.07, 165.16, 157.75], weeklyChange: -14.05, dayChange: -4.49, sortRank: 0, periodReturns: { '1M': -17.9, 'YTD': -19.1, '6M': -20.1, '1Y': -26.7 },
      priceHistory: { '1D': [165.16, 164.39, 163.6, 160.94, 160.99, 160.88, 160.78, 160.26, 159.81, 160.34, 159.31, 159.18, 157.88, 158.01, 158.07, 157.88, 156.62, 156.21, 155.59, 156.31, 155.93, 156.81, 157.7, 157.75], '1W': [183.53, 184.29, 175.07, 165.16, 157.75], '1M': [193.06, 190.96, 203.7, 225.78, 248.15, 244.58, 230.33, 236.34, 213.68, 211.82, 205.81, 201.26, 184.1, 184.13, 192.64, 188.33, 183.53, 184.29, 175.07, 165.16, 157.75], 'YTD': [194.91, 189.65, 189.85, 178.18, 169.01, 136.48, 156.48, 156.54, 150.31, 154.79, 159.16, 152.9, 146.02, 145.23, 137.86, 169.81, 187.5, 163.83, 194.03, 186.83, 181.46, 190.96, 230.33, 205.81, 188.33, 157.75], '6M': [197.49, 195.71, 198.52, 191.09, 182.44, 160.06, 156.59, 160.14, 141.31, 149.25, 151.56, 155.97, 154.34, 138.8, 143.17, 163, 181.17, 165.96, 185.35, 193.84, 186.61, 193.06, 244.58, 205.81, 188.33, 157.75], '1Y': [215.27, 218.96, 235.81, 241.3, 241.9, 250.6, 256.43, 253.86, 234.62, 234.21, 223.45, 328.33, 301.41, 308.46, 289.01, 288.63, 303.62, 272.66, 275.3, 250.31, 236.15, 220.49, 197.03, 207.73, 223.01, 178.46, 197.49, 195.71, 198.52, 191.09, 182.44, 160.06, 142.82, 160.14, 141.31, 149.25, 151.56, 155.97, 154.34, 138.8, 143.17, 163, 181.17, 165.96, 185.35, 193.84, 186.61, 193.06, 244.58, 205.81, 188.33, 157.75] },
      velocityScore: { '1D': 0, '1W': -5.9, '1M': -41, '6M': null }, isNew: false,
      marketCap: '$454B', pe: 27.1, revenueGrowth: 21, eps: 5.83, grossMargin: 66, dividendYield: 1.21,
      etfPresence: { AIS: false, ARTY: 3.48, BAI: false, IGPT: false, IVES: 3.48, ALAI: false, CHAT: 1.42, AIFD: false, SPRX: false, AOTG: 2.69 },
      tonyNote: 'Oracle lands in 3 AI ETFs on the strength of its cloud database and AI infrastructure contracts. Revenue grew 22%, 67% gross margin, P/E of 40x. The 17.5% weekly return following a major earnings beat shows how quickly sentiment can reprice; the weight score at 2.04% is still modest, meaning ETF managers have started building positions but conviction is not yet deep.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 5.33, proScore: 5.33, coverage: 1,
      price: 1030.39, weeklyPrices: [1043.19, 1133.99, 1211.38, 1051.77, 1030.39], weeklyChange: -1.23, dayChange: -2.03, sortRank: 0, periodReturns: { '1M': 37.2, 'YTD': 261, '6M': 259.4, '1Y': 705.6 },
      priceHistory: { '1D': [1051.77, 1040, 1058.12, 1052.8, 1037.31, 1055.05, 1049.43, 1051.02, 1041.56, 1030.03, 1039.86, 1044.4, 1044.41, 1045.79, 1040.03, 1041.45, 1037.15, 1034.3, 1020.77, 1026.33, 1022.51, 1014.12, 1018.51, 1030.39], '1W': [1043.19, 1133.99, 1211.38, 1051.77, 1030.39], '1M': [895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1030.39], 'YTD': [285.41, 327.02, 336.63, 397.58, 435.79, 382.89, 413.97, 417.35, 415.56, 397.05, 405.35, 461.73, 382.09, 367.85, 421.51, 456.23, 487.48, 518.46, 666.59, 766.58, 698.74, 928.41, 1079.57, 935.89, 1020.76, 1030.39], '6M': [286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 795.33, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1030.39], '1Y': [127.91, 120.89, 122.24, 116.43, 109.83, 114.74, 108.78, 127.75, 122.05, 116.5, 118.72, 140, 159.99, 161.71, 182.15, 196.54, 191.94, 198.47, 226.63, 237.5, 241.11, 228.5, 224.53, 234.16, 263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 795.33, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1030.39] },
      velocityScore: { '1D': -5.7, '1W': -13.9, '1M': -7.3, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 48.7, revenueGrowth: 196, eps: 21.14, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { SOXX: 8.27, PSI: 5.59, XSD: 2.57, DRAM: 4.91 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 5.03, proScore: 3.78, coverage: 0.75,
      price: 514.83, weeklyPrices: [512.48, 537.37, 551.63, 519.85, 514.83], weeklyChange: 0.46, dayChange: -0.97, sortRank: 0, periodReturns: { '1M': 10.1, 'YTD': 140.4, '6M': 139.4, '1Y': 271.9 },
      priceHistory: { '1D': [519.85, 511.32, 522.71, 521.78, 514.3, 522.57, 520.78, 519.9, 517.25, 515.14, 518.52, 521.38, 520.91, 521.55, 520.77, 518.1, 516.24, 513.38, 509.96, 509.67, 510.36, 509.74, 510.76, 514.83], '1W': [512.48, 537.37, 551.63, 519.85, 514.83], '1M': [503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 514.83], 'YTD': [214.16, 204.68, 227.92, 253.73, 252.18, 192.5, 205.94, 203.37, 203.68, 199.45, 197.74, 199.46, 220.27, 210.21, 236.64, 258.12, 303.46, 337.11, 421.39, 448.29, 414.05, 495.54, 542.52, 475.51, 507.29, 514.83], '6M': [215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 458.79, 420.99, 503.89, 521.54, 475.51, 507.29, 514.83], '1Y': [138.43, 136.11, 138.41, 160.08, 158.65, 179.51, 163.12, 174.95, 166.55, 166.62, 162.13, 159.54, 159.16, 160.88, 164.01, 235.56, 238.6, 230.23, 264.33, 256.33, 237.52, 230.29, 206.13, 217.6, 221.42, 198.11, 215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 458.79, 420.99, 503.89, 521.54, 475.51, 507.29, 514.83] },
      velocityScore: { '1D': 2.2, '1W': -14.3, '1M': -33.7, '6M': null }, isNew: false,
      marketCap: '$839B', pe: 170.5, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 7.69, PSI: 4.91, XSD: 2.5, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.72, proScore: 3.54, coverage: 0.75,
      price: 131.27, weeklyPrices: [121.10, 133.99, 140.94, 132.28, 131.27], weeklyChange: 8.4, dayChange: -0.76, sortRank: 0, periodReturns: { '1M': 9.5, 'YTD': 255.8, '6M': 263, '1Y': 482.1 },
      priceHistory: { '1D': [132.28, 130.53, 132.68, 132.21, 131.76, 134.48, 135.15, 135.94, 134.71, 134.2, 134.25, 134.89, 134.59, 134.65, 134.01, 132.06, 131.98, 131.41, 130.35, 130.57, 129.87, 129.9, 130.57, 131.27], '1W': [121.1, 133.99, 140.94, 132.28, 131.27], '1M': [123.52, 121.77, 120.89, 114.68, 109.33, 107.93, 112.71, 111.78, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.27], 'YTD': [36.9, 41.11, 48.32, 54.32, 48.66, 48.24, 46.48, 44.62, 45.46, 45.95, 45.25, 45.03, 47.18, 48.03, 61.72, 64.94, 65.27, 94.75, 113.01, 120.61, 110.8, 121.77, 112.71, 107.92, 117.05, 131.27], '6M': [36.16, 39.38, 45.55, 46.96, 42.49, 48.81, 50.24, 46.79, 43.63, 45.5, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 129.44, 108.17, 123.52, 107.93, 107.92, 117.05, 131.27], '1Y': [22.55, 22.85, 23.44, 22.69, 23.49, 20.34, 20.41, 21.81, 25.31, 24.35, 24, 24.77, 24.9, 31.22, 35.94, 37.43, 37.15, 36.92, 41.34, 38.38, 37.88, 34.33, 35.83, 43.76, 40.78, 36.05, 36.16, 39.38, 45.55, 46.96, 42.49, 48.81, 50.59, 46.79, 43.63, 45.5, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 129.44, 108.17, 123.52, 107.93, 107.92, 117.05, 131.27] },
      velocityScore: { '1D': 1.7, '1W': -1.9, '1M': -5.9, '6M': null }, isNew: false,
      marketCap: '$660B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 6.37, PSI: 5.1, XSD: 2.69, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 4.61, proScore: 3.46, coverage: 0.75,
      price: 198.59, weeklyPrices: [204.65, 210.69, 208.65, 200.04, 198.59], weeklyChange: -2.96, dayChange: -0.7, sortRank: 0, periodReturns: { '1M': -7.8, 'YTD': 6.5, '6M': 5.3, '1Y': 34.3 },
      priceHistory: { '1D': [200, 200.7, 200.96, 199.35, 198.98, 200.31, 200.98, 201.18, 201.01, 200.52, 200.73, 201.04, 200.79, 200.71, 200.29, 199.66, 199.26, 198.88, 198.26, 197.8, 197.96, 197.66, 197.62, 198.59], '1W': [204.65, 210.69, 208.65, 200.04, 198.59], '1M': [214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 198.59], 'YTD': [186.5, 185.04, 187.05, 184.84, 192.51, 171.88, 186.94, 187.9, 184.89, 183.34, 183.14, 180.4, 178.68, 175.75, 183.91, 198.87, 202.5, 209.25, 207.83, 220.78, 220.61, 212.6, 214.75, 208.19, 207.41, 198.59], '6M': [188.61, 188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 219.44, 222.32, 214.86, 222.82, 208.19, 207.41, 198.59], '1Y': [147.9, 153.3, 162.88, 171.37, 170.78, 179.27, 179.42, 183.16, 175.64, 181.77, 170.62, 177.33, 170.29, 176.97, 187.24, 189.11, 179.83, 180.28, 207.04, 195.21, 193.16, 181.36, 177.82, 179.59, 183.78, 170.94, 188.61, 188.85, 184.86, 186.23, 186.47, 185.61, 185.41, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 219.44, 222.32, 214.86, 222.82, 208.19, 207.41, 198.59] },
      velocityScore: { '1D': 3.9, '1W': 15.7, '1M': 1.8, '6M': null }, isNew: false,
      marketCap: '$4.8T', pe: 30.5, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.5,
      etfPresence: { SOXX: 7.23, PSI: 4.44, XSD: 2.17, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.54, proScore: 2.66, coverage: 0.75,
      price: 411.53, weeklyPrices: [414.45, 434.46, 445.48, 407.26, 411.53], weeklyChange: -0.71, dayChange: 1.05, sortRank: 0, periodReturns: { '1M': 3.6, 'YTD': 51.7, '6M': 48.3, '1Y': 75.1 },
      priceHistory: { '1D': [407.26, 406.98, 410.13, 409.85, 410.17, 410.97, 412.83, 413.09, 412.04, 410.95, 411.2, 414.27, 413.13, 412.53, 412.38, 411.41, 411.27, 409.38, 408.7, 408.86, 409.49, 409.85, 410.54, 411.53], '1W': [414.45, 434.46, 445.48, 407.26, 411.53], '1M': [419.94, 416.88, 419.01, 413.85, 402.69, 423.2, 437.67, 428.76, 401.39, 403.89, 404.62, 392.67, 412.13, 417.79, 427.58, 416, 414.45, 434.46, 445.48, 407.26, 411.53], 'YTD': [271.2, 299.16, 302.1, 308.52, 318.7, 322.12, 331.36, 345.3, 354.35, 329.72, 307.27, 308.59, 322.03, 320.58, 351.36, 347.94, 381.42, 389.31, 415.63, 419.65, 414.31, 416.88, 437.67, 404.62, 416, 411.53], '6M': [277.56, 273.74, 300.93, 300.25, 304.01, 316.86, 322.97, 337.1, 355.15, 352.41, 319.71, 310.92, 312.19, 303.1, 327.41, 348.6, 375.27, 383.26, 404.77, 422.73, 418.58, 419.94, 423.2, 404.62, 416, 411.53], '1Y': [234.98, 240.64, 242.72, 240.61, 228.08, 231.11, 220.69, 232.04, 230.44, 255.63, 244.55, 247.21, 246.32, 248.61, 239.28, 237.93, 238.15, 240.36, 235.04, 236, 233.41, 230.13, 252.02, 278.24, 281.57, 271.04, 277.56, 273.74, 300.93, 300.25, 304.01, 316.86, 320.45, 337.1, 355.15, 352.41, 319.71, 310.92, 312.19, 303.1, 327.41, 348.6, 375.27, 383.26, 404.77, 422.73, 418.58, 419.94, 423.2, 404.62, 416, 411.53] },
      velocityScore: { '1D': -0.7, '1W': 10.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$200B', pe: 61.2, revenueGrowth: 37, eps: 6.72, grossMargin: 64, dividendYield: 1.08,
      etfPresence: { SOXX: 3.75, PSI: 4.62, XSD: 2.25, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 5.55, proScore: 2.77, coverage: 0.5,
      price: 578.72, weeklyPrices: [592.92, 617.11, 640.18, 585.88, 578.72], weeklyChange: -2.39, dayChange: -1.22, sortRank: 0, periodReturns: { '1M': 33.9, 'YTD': 125.2, '6M': 121.9, '1Y': 221.2 },
      priceHistory: { '1D': [585.88, 582.87, 587.96, 589.17, 584.48, 587.83, 591.92, 591.36, 586.56, 586.72, 588, 591.19, 591.27, 591.17, 590.03, 586.91, 585.76, 583.34, 575.33, 576.45, 577.72, 576.1, 576.99, 578.72], '1W': [592.92, 617.11, 640.18, 585.88, 578.72], '1M': [454.89, 448.25, 449.68, 450.06, 458.17, 490.05, 500.77, 501.7, 453.01, 492.17, 499.21, 497.01, 552.64, 567.25, 585.78, 568.23, 592.92, 617.11, 640.18, 585.88, 578.72], 'YTD': [256.99, 281.64, 319.08, 318.79, 341.34, 303.99, 328.39, 369.83, 375.72, 346.53, 337.27, 349.47, 369.34, 353.8, 397.81, 394.26, 403.48, 382.59, 428.62, 431.2, 406.91, 448.25, 500.77, 499.21, 568.23, 578.72], '6M': [260.78, 268.87, 301.18, 327.01, 319.46, 328.4, 330.57, 354.91, 373.55, 372.18, 338.94, 346.18, 361.79, 323.12, 354.31, 395.64, 394.33, 381.11, 410.82, 443.62, 413.57, 454.89, 490.05, 499.21, 568.23, 578.72], '1Y': [180.18, 183.76, 195.39, 194.81, 187.01, 189.39, 178.14, 188.45, 162.22, 164.51, 156.25, 163.42, 178.13, 201.44, 217.74, 217.51, 227.58, 220.56, 235.75, 240.89, 228.67, 225.12, 242.46, 268.63, 275.15, 248.27, 260.78, 268.87, 301.18, 327.01, 319.46, 328.4, 322.51, 354.91, 373.55, 372.18, 338.94, 346.18, 361.79, 323.12, 354.31, 395.64, 394.33, 381.11, 410.82, 443.62, 413.57, 454.89, 490.05, 499.21, 568.23, 578.72] },
      velocityScore: { '1D': -1.1, '1W': -3.5, '1M': -5.5, '6M': null }, isNew: false,
      marketCap: '$459B', pe: 54.6, revenueGrowth: 11, eps: 10.6, grossMargin: 49, dividendYield: 0.36,
      etfPresence: { SOXX: 4.97, PSI: 6.13, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 5.32, proScore: 2.66, coverage: 0.5,
      price: 239, weeklyPrices: [238.73, 259.56, 269.16, 244.49, 239.00], weeklyChange: 0.11, dayChange: -2.25, sortRank: 0, periodReturns: { '1M': 26.6, 'YTD': 96.7, '6M': 87.2, '1Y': 168.8 },
      priceHistory: { '1D': [244.49, 239.49, 241.16, 242.1, 240.34, 241.31, 243.43, 240.7, 240.1, 240.46, 239.99, 240.55, 240.75, 241.11, 239.98, 239.18, 238.87, 238.21, 235.8, 235.43, 236.32, 236.96, 237.75, 239], '1W': [238.73, 259.56, 269.16, 244.49, 239], '1M': [201.14, 195.72, 192.76, 192.17, 194, 204.52, 212.51, 213.11, 192.92, 210.81, 213.94, 213.56, 241.16, 254.54, 256.42, 237.33, 238.73, 259.56, 269.16, 244.49, 239], 'YTD': [121.51, 132.46, 154.5, 150, 168.47, 133.1, 145.09, 146.99, 152.43, 142.94, 140.96, 148.24, 154.38, 151.98, 172.73, 174.81, 181.21, 181.62, 181.63, 181.13, 174.06, 195.72, 212.51, 213.94, 237.33, 239], '6M': [127.7, 127.45, 140, 156.78, 154.3, 141.04, 144.02, 146.41, 148.77, 153.49, 142.91, 143.82, 151.14, 138.26, 154.88, 179.59, 178.54, 180.9, 173.29, 184.52, 175.65, 201.14, 204.52, 213.94, 237.33, 239], '1Y': [88.9, 89.89, 92.32, 93.35, 89.71, 92.5, 88.83, 93.55, 87.61, 88.81, 84.39, 93.26, 98.99, 106.87, 112.89, 106.26, 108.7, 111.43, 123.53, 122.71, 119.09, 112.31, 114.59, 121.18, 123.89, 117.2, 127.7, 127.45, 140, 156.78, 154.3, 141.04, 144.29, 146.41, 148.77, 153.49, 142.91, 143.82, 151.14, 138.26, 154.88, 179.59, 178.54, 180.9, 173.29, 184.52, 175.65, 201.14, 204.52, 213.94, 237.33, 239] },
      velocityScore: { '1D': -1.5, '1W': 12.7, '1M': 1.9, '6M': null }, isNew: false,
      marketCap: '$312B', pe: 67.9, revenueGrowth: 12, eps: 3.52, grossMargin: 61, dividendYield: 0.38,
      etfPresence: { SOXX: 4.85, PSI: 5.79, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 4.96, proScore: 2.48, coverage: 0.5,
      price: 367.65, weeklyPrices: [374.18, 389.04, 409.54, 371.33, 367.65], weeklyChange: -1.75, dayChange: -0.99, sortRank: 0, periodReturns: { '1M': 20.4, 'YTD': 114.8, '6M': 107.3, '1Y': 284.5 },
      priceHistory: { '1D': [371.33, 365.88, 369.25, 371.61, 368.33, 371.61, 375.58, 373.17, 369.18, 368.81, 368.67, 369.76, 369.96, 370.49, 369.45, 368.33, 367.47, 366.78, 362.76, 363.04, 364.94, 364.05, 365.7, 367.65], '1W': [374.18, 389.04, 409.54, 371.33, 367.65], '1M': [322.68, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04, 409.54, 371.33, 367.65], 'YTD': [171.18, 200.96, 217.47, 220.7, 248.17, 213.31, 231.29, 237.39, 239.07, 214.68, 209.49, 224.71, 233.45, 222.01, 258.76, 265.16, 265.55, 248.75, 297.17, 289.24, 273.38, 318.93, 343.71, 327.16, 369.34, 367.65], '6M': [177.33, 185.06, 218.36, 222.96, 222.87, 237.5, 229.28, 235.53, 242.27, 231, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 296.05, 277.96, 322.68, 334.41, 327.16, 369.34, 367.65], '1Y': [95.63, 96.81, 99.81, 100.37, 97.1, 99.09, 95.94, 105.28, 100.33, 103.63, 97.74, 107.36, 121.9, 128.32, 142.79, 142.54, 144.78, 141.25, 160.67, 165.05, 159.18, 143.24, 151.93, 159.75, 168.26, 154.98, 177.33, 185.06, 218.36, 222.96, 222.87, 237.5, 231.01, 235.53, 242.27, 231, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 296.05, 277.96, 322.68, 334.41, 327.16, 369.34, 367.65] },
      velocityScore: { '1D': -1.6, '1W': 6.4, '1M': -6.8, '6M': null }, isNew: false,
      marketCap: '$460B', pe: 69.8, revenueGrowth: 24, eps: 5.27, grossMargin: 50, dividendYield: 0.28,
      etfPresence: { SOXX: 4.45, PSI: 5.48, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 4.35, proScore: 2.18, coverage: 0.5,
      price: 382.02, weeklyPrices: [392.90, 411.35, 392.13, 380.15, 382.02], weeklyChange: -2.77, dayChange: 0.49, sortRank: 0, periodReturns: { '1M': -7.8, 'YTD': 10.4, '6M': 9.1, '1Y': 44.8 },
      priceHistory: { '1D': [380.15, 382.2, 384.29, 382, 380.63, 383.76, 384.45, 384.87, 385.89, 384.14, 384.95, 385.14, 384.23, 385.66, 385.37, 384.16, 383.62, 383.42, 381.85, 380.52, 380.74, 380.3, 380.21, 382.02], '1W': [392.9, 411.35, 392.13, 380.15, 382.02], '1M': [422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.02], 'YTD': [346.1, 332.48, 343.02, 325.49, 330.73, 310.51, 331.17, 333.99, 321.7, 332.77, 335.97, 315.93, 318.81, 313.49, 354.91, 396.72, 422.65, 405.45, 425.44, 419.3, 411.07, 421.86, 479.23, 392.16, 376.71, 382.02], '6M': [350.22, 347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 428.43, 420.71, 422.01, 481.57, 392.16, 376.71, 382.02], '1Y': [263.77, 264.74, 277.9, 280.81, 283.69, 302.62, 301.67, 312.83, 294.91, 298.01, 302.39, 369.57, 346.17, 339.31, 333.39, 345.5, 351.33, 340.3, 385.98, 358.98, 351.96, 340.5, 385.03, 380.61, 412.97, 326.02, 350.22, 347.62, 344.97, 351.71, 324.85, 331.11, 332.92, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 428.43, 420.71, 422.01, 481.57, 392.16, 376.71, 382.02] },
      velocityScore: { '1D': 5.3, '1W': 19.8, '1M': -40.9, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 63.6, revenueGrowth: 48, eps: 6.01, grossMargin: 76, dividendYield: 0.68,
      etfPresence: { SOXX: 6.49, PSI: false, XSD: 2.22, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 3.8, proScore: 1.9, coverage: 0.5,
      price: 270.7, weeklyPrices: [289.54, 310.58, 307.86, 279.04, 270.70], weeklyChange: -6.51, dayChange: -2.99, sortRank: 0, periodReturns: { '1M': 37.9, 'YTD': 218.5, '6M': 213, '1Y': 259.9 },
      priceHistory: { '1D': [279.04, 270.68, 273.25, 270.88, 266.54, 272.03, 273.7, 275.17, 272.15, 268.52, 270.12, 271.78, 272.26, 271.72, 271.73, 271, 269.92, 268.76, 266.56, 266.8, 268.48, 267.26, 267.64, 270.7], '1W': [289.54, 310.58, 307.86, 279.04, 270.7], '1M': [208.26, 198.7, 204.83, 205, 219.43, 290.79, 301.65, 316.43, 263.47, 288.85, 266.88, 252.59, 280.71, 279.7, 308.88, 278.67, 289.54, 310.58, 307.86, 279.04, 270.7], 'YTD': [84.98, 83.45, 80.38, 83.1, 81.34, 74.21, 78.23, 79.61, 79.29, 75.68, 87.67, 87.62, 98.45, 106.71, 119.93, 134.6, 157.32, 156.57, 172.15, 164.5, 176.27, 198.7, 301.65, 266.88, 278.67, 270.7], '6M': [86.49, 89.39, 83.22, 80.46, 81.77, 78.66, 82.35, 78.61, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 170.84, 168.93, 208.26, 290.79, 266.88, 278.67, 270.7], '1Y': [75.21, 76.24, 72.26, 70.85, 73.27, 81.74, 75.32, 77.81, 72.07, 74.26, 62.31, 67.1, 70.98, 80.09, 83.89, 92.5, 88.89, 81.05, 90.15, 92.9, 89.33, 78.68, 83.43, 100.2, 92.47, 81.7, 86.49, 89.39, 83.22, 80.46, 81.77, 78.66, 80.28, 78.61, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 170.84, 168.93, 208.26, 290.79, 266.88, 278.67, 270.7] },
      velocityScore: { '1D': -2.1, '1W': -40.6, '1M': -43.8, '6M': null }, isNew: false,
      marketCap: '$237B', pe: 93.3, revenueGrowth: 28, eps: 2.9, grossMargin: 52, dividendYield: 0.09,
      etfPresence: { SOXX: 5.19, PSI: false, XSD: 2.41, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 3.07, proScore: 1.54, coverage: 0.5,
      price: 303.6, weeklyPrices: [301.88, 322.86, 332.28, 304.36, 303.60], weeklyChange: 0.57, dayChange: -0.25, sortRank: 0, periodReturns: { '1M': -1.8, 'YTD': 75, '6M': 71.4, '1Y': 47.5 },
      priceHistory: { '1D': [304.36, 303.54, 304.69, 303.17, 303.99, 306.12, 307.08, 306.94, 304.89, 304.1, 304.01, 305.21, 304.68, 304.64, 304.72, 304.18, 303.65, 302.98, 301.48, 300.83, 302.45, 302.82, 303.45, 303.6], '1W': [301.88, 322.86, 332.28, 304.36, 303.6], '1M': [324.89, 317.45, 315.95, 305.68, 293.2, 308.12, 308.59, 305.37, 285.06, 290.9, 288.63, 282.01, 297.1, 301.12, 313.34, 305.71, 301.88, 322.86, 332.28, 304.36, 303.6], 'YTD': [173.49, 188.45, 189.12, 194.99, 218.97, 223.98, 223, 218.05, 212.63, 197.98, 190.05, 190.78, 196.77, 196.3, 214.98, 216.29, 236.31, 269.22, 289.44, 295.17, 302.31, 317.45, 308.59, 288.63, 305.71, 303.6], '6M': [177.13, 177.52, 190.31, 191.58, 196.59, 225.01, 218.77, 226.16, 219.86, 209.82, 196.2, 194.13, 188.63, 186.42, 199.74, 218.87, 233.15, 265, 281, 297.76, 300.6, 324.89, 308.12, 288.63, 305.71, 303.6], '1Y': [205.81, 210.45, 216.39, 216.64, 186.25, 189.52, 185.91, 192.97, 195.94, 205.98, 195.74, 184.01, 180.3, 184.44, 180.39, 181.6, 175.27, 170.71, 160.26, 163.57, 159.73, 157.32, 161.77, 182.6, 181.67, 174.49, 177.13, 177.52, 190.31, 191.58, 196.59, 225.01, 221.44, 226.16, 219.86, 209.82, 196.2, 194.13, 188.63, 186.42, 199.74, 218.87, 233.15, 265, 281, 297.76, 300.6, 324.89, 308.12, 288.63, 305.71, 303.6] },
      velocityScore: { '1D': -0.6, '1W': 6.9, '1M': -51.3, '6M': null }, isNew: false,
      marketCap: '$276B', pe: 52, revenueGrowth: 19, eps: 5.84, grossMargin: 57, dividendYield: 1.87,
      etfPresence: { SOXX: 3.8, PSI: false, XSD: 2.34, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.92, proScore: 1.46, coverage: 0.5,
      price: 291.94, weeklyPrices: [298.20, 313.27, 323.24, 299.94, 291.94], weeklyChange: -2.1, dayChange: -2.67, sortRank: 0, periodReturns: { '1M': -7.8, 'YTD': 34.5, '6M': 29.6, '1Y': 33.6 },
      priceHistory: { '1D': [299.94, 296.3, 297, 294.41, 295.04, 294.94, 296.99, 298.19, 297.4, 296.71, 296.13, 295.18, 294.55, 294.91, 294.57, 293.61, 292.13, 291.15, 289.39, 289.28, 290.05, 289.94, 291.48, 291.94], '1W': [298.2, 313.27, 323.24, 299.94, 291.94], '1M': [332.67, 329.24, 330.28, 321.35, 311.38, 323.62, 321.88, 322.22, 295.96, 301.14, 297.41, 285.56, 302.55, 304.86, 315.88, 302.89, 298.2, 313.27, 323.24, 299.94, 291.94], 'YTD': [217.06, 237.89, 238.6, 236.75, 233.5, 222.13, 242.19, 232.11, 232.23, 210.58, 191.22, 192.69, 197.61, 195.58, 205.67, 209.39, 225.75, 289.25, 303.55, 294.23, 294.28, 329.24, 321.88, 297.41, 302.89, 291.94], '6M': [225.26, 221.28, 241.15, 237.11, 231.05, 231.08, 228.91, 244.43, 231.16, 224.76, 205.25, 191.89, 193.39, 187.39, 195.12, 209.89, 224.5, 230.39, 292.35, 305.99, 291.68, 332.67, 323.62, 297.41, 302.89, 291.94], '1Y': [218.51, 221.21, 230.42, 220.58, 224.71, 220.94, 205.92, 220.05, 229.27, 237.82, 228.2, 219.28, 221.89, 227.66, 224.91, 225.64, 217.23, 217.16, 204.71, 210.44, 202.86, 188.59, 191.02, 227.56, 230.78, 223.23, 225.26, 221.28, 241.15, 237.11, 231.05, 231.08, 224.32, 244.43, 231.16, 224.76, 205.25, 191.89, 193.39, 187.39, 195.12, 209.89, 224.5, 230.39, 292.35, 305.99, 291.68, 332.67, 323.62, 297.41, 302.89, 291.94] },
      velocityScore: { '1D': 0.7, '1W': 6.6, '1M': -31.5, '6M': null }, isNew: false,
      marketCap: '$74B', pe: 27.9, revenueGrowth: 12, eps: 10.47, grossMargin: 56, dividendYield: 1.35,
      etfPresence: { SOXX: 3.56, PSI: false, XSD: 2.27, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 2.71, proScore: 1.36, coverage: 0.5,
      price: 196.43, weeklyPrices: [212.97, 226.11, 221.90, 204.13, 196.43], weeklyChange: -7.77, dayChange: -3.77, sortRank: 0, periodReturns: { '1M': -17.5, 'YTD': 14.8, '6M': 12.4, '1Y': 26.2 },
      priceHistory: { '1D': [204.13, 197.03, 196.95, 196.49, 196, 197.64, 197.33, 199.32, 197.9, 196.74, 196.13, 197.09, 196.95, 196.91, 196.96, 196.09, 196.12, 195, 195.73, 195.65, 195.78, 194.77, 195.82, 196.43], '1W': [212.97, 226.11, 221.9, 204.13, 196.43], '1M': [248.82, 233.4, 243.29, 251.02, 228.99, 240.84, 250.01, 242.57, 215.94, 217.77, 205.42, 191.2, 202.96, 211.72, 220.81, 214.07, 212.97, 226.11, 221.9, 204.13, 196.43], 'YTD': [171.05, 181.87, 161.39, 157.8, 152.22, 136.3, 138.47, 141.27, 145.59, 137, 131.15, 130.47, 130.35, 127.28, 127.75, 133.05, 136.07, 156, 192.57, 210.31, 195.61, 233.4, 250.01, 205.42, 214.07, 196.43], '6M': [174.77, 172.98, 177.78, 159.42, 154.52, 152.62, 138.93, 140.7, 140.41, 141.03, 138.11, 129.39, 128.35, 127.07, 124.07, 132.84, 135.56, 150, 186.55, 237.53, 203.64, 248.82, 240.84, 205.42, 214.07, 196.43], '1Y': [155.71, 159.4, 159.35, 154.07, 159.88, 159.06, 145.84, 153.73, 156.25, 159.17, 157.28, 158.95, 165.26, 173.55, 166.49, 167.77, 162.97, 169.27, 178.67, 179.72, 173.98, 165.06, 163.3, 175.07, 182.21, 172.34, 174.77, 172.98, 177.78, 159.42, 154.52, 152.62, 137.34, 140.7, 140.41, 141.03, 138.11, 129.39, 128.35, 127.07, 124.07, 132.84, 135.56, 150, 186.55, 237.53, 203.64, 248.82, 240.84, 205.42, 214.07, 196.43] },
      velocityScore: { '1D': -0.7, '1W': -9.3, '1M': -45.4, '6M': null }, isNew: false,
      marketCap: '$207B', pe: 21.1, revenueGrowth: -4, eps: 9.31, grossMargin: 55, dividendYield: 1.8,
      etfPresence: { SOXX: 3.1, PSI: false, XSD: 2.33, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.65, proScore: 1.32, coverage: 0.5,
      price: 1428.78, weeklyPrices: [1448.21, 1563.70, 1537.88, 1423.76, 1428.78], weeklyChange: -1.34, dayChange: 0.35, sortRank: 0, periodReturns: { '1M': -10.1, 'YTD': 57.6, '6M': 49.9, '1Y': 99.4 },
      priceHistory: { '1D': [1423.76, 1398.62, 1409.98, 1403.24, 1409.97, 1412.19, 1429.57, 1430.56, 1419.65, 1425.28, 1432.45, 1438.3, 1443.51, 1445, 1439.5, 1432.16, 1426.76, 1425.4, 1414.34, 1412.79, 1414.6, 1418.33, 1422.41, 1428.78], '1W': [1448.21, 1563.7, 1537.88, 1423.76, 1428.78], '1M': [1662.98, 1620.17, 1633.17, 1566.21, 1542.39, 1624.99, 1689.89, 1652.6, 1481.05, 1559.18, 1531.98, 1473.04, 1589.55, 1577.32, 1652.29, 1498.77, 1448.21, 1563.7, 1537.88, 1423.76, 1428.78], 'YTD': [906.36, 959.09, 1009.54, 1076.67, 1183.15, 1155.99, 1155.93, 1175.22, 1180.13, 1078.44, 1033.88, 1075.29, 1118.66, 1119.51, 1334.21, 1353, 1522.04, 1526.84, 1652.35, 1599.52, 1468.11, 1620.17, 1689.89, 1531.98, 1498.77, 1428.78], '6M': [953.25, 936.31, 958.97, 1033.17, 1068.14, 1173.22, 1206.18, 1171.47, 1190.06, 1142.58, 1062, 1077.4, 1076.35, 1002.34, 1191.22, 1363.42, 1527.95, 1504.08, 1588.12, 1661.1, 1486.33, 1662.98, 1624.99, 1531.98, 1498.77, 1428.78], '1Y': [716.58, 746.97, 751.14, 714.03, 720.01, 730.54, 805.85, 840.56, 844.8, 850.64, 827.56, 855.18, 877.66, 908.45, 915.87, 980.9, 1007.93, 1001.4, 1094.08, 1000.15, 954.71, 856.96, 908.61, 958.02, 979.02, 912.25, 953.25, 936.31, 958.97, 1033.17, 1068.14, 1173.22, 1229.82, 1171.47, 1190.06, 1142.58, 1062, 1077.4, 1076.35, 1002.34, 1191.22, 1363.42, 1527.95, 1504.08, 1588.12, 1661.1, 1486.33, 1662.98, 1624.99, 1531.98, 1498.77, 1428.78] },
      velocityScore: { '1D': 0, '1W': 0.8, '1M': -36.2, '6M': null }, isNew: false,
      marketCap: '$70B', pe: 102.4, revenueGrowth: 26, eps: 13.95, grossMargin: 55, dividendYield: 0.56,
      etfPresence: { SOXX: 3.2, PSI: false, XSD: 2.1, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 2.63, proScore: 1.31, coverage: 0.5,
      price: 398.69, weeklyPrices: [374.68, 417.07, 439.66, 397.02, 398.69], weeklyChange: 6.41, dayChange: 0.42, sortRank: 0, periodReturns: { '1M': 29.9, 'YTD': 139.7, '6M': 134.6, '1Y': 356.9 },
      priceHistory: { '1D': [397.02, 402.6, 408.69, 399.55, 397.11, 407.81, 410.78, 412.04, 406.34, 402.33, 403.68, 404.66, 403.48, 402.86, 402.1, 399.62, 397.28, 396.33, 393.38, 393.73, 395.4, 393.27, 395.09, 398.69], '1W': [374.68, 417.07, 439.66, 397.02, 398.69], '1M': [318.72, 325.33, 349.17, 342.85, 320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 361.71, 374.68, 417.07, 439.66, 397.02, 398.69], 'YTD': [166.36, 156.73, 174.45, 176.35, 160.46, 142.82, 126.58, 132.62, 124.67, 120, 119.9, 126.34, 120.33, 106.33, 129.46, 172.09, 194.06, 196.85, 213.91, 204.42, 244.26, 325.33, 363.54, 341.7, 361.71, 398.69], '6M': [169.97, 179.56, 162.61, 182, 163.25, 152.44, 187.67, 129.32, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 207.35, 215.58, 318.72, 355.76, 341.7, 361.71, 398.69], '1Y': [87.26, 88.66, 99.86, 91.94, 119.48, 128.87, 174.39, 192, 171.06, 178.56, 176.61, 230.37, 249.38, 205.27, 194.5, 219.36, 161.46, 154.85, 173.62, 181.94, 167.55, 139.52, 144.78, 152.5, 164.32, 140.24, 169.97, 179.56, 162.61, 182, 163.25, 152.44, 169.85, 129.32, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 207.35, 215.58, 318.72, 355.76, 341.7, 361.71, 398.69] },
      velocityScore: { '1D': -3, '1W': -23.4, '1M': -37.9, '6M': null }, isNew: false,
      marketCap: '$68B', pe: 271.2, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.64, PSI: false, XSD: 2.61, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.33, proScore: 1.17, coverage: 0.5,
      price: 90.77, weeklyPrices: [94.11, 99.77, 102.71, 93.26, 90.77], weeklyChange: -3.55, dayChange: -2.67, sortRank: 0, periodReturns: { '1M': -2.8, 'YTD': 42.5, '6M': 38.9, '1Y': 28.9 },
      priceHistory: { '1D': [93.26, 92.14, 92.42, 92.26, 92.58, 92.74, 93.11, 93.23, 93.03, 92.94, 92.82, 92.99, 93.01, 93.1, 92.82, 92.04, 91.54, 90.86, 90.26, 90.22, 90.42, 90.41, 90.75, 90.77], '1W': [94.11, 99.77, 102.71, 93.26, 90.77], '1M': [98.05, 96.85, 96.04, 94.65, 91.52, 96.96, 96.55, 96.3, 88.34, 91.37, 91.47, 87.91, 92.94, 95.24, 100.32, 95.63, 94.11, 99.77, 102.71, 93.26, 90.77], 'YTD': [63.72, 73.53, 74.45, 75.47, 79.36, 78.04, 78.92, 77.16, 74.97, 67.81, 62.73, 64.71, 65.16, 65.38, 71.22, 74.49, 82.48, 90.17, 102.92, 97.7, 91.81, 96.85, 96.55, 91.47, 95.63, 90.77], '6M': [65.36, 65.03, 75.22, 74.7, 74.79, 78.08, 74.41, 78.56, 76.6, 74.31, 65, 63.83, 64.34, 60.06, 67.51, 74.5, 80.93, 84.26, 98.48, 99.03, 92.76, 98.05, 96.96, 91.47, 95.63, 90.77], '1Y': [70.43, 71.68, 74.68, 74.43, 70.25, 70.29, 66.17, 64.5, 64.71, 67.62, 63.28, 64.74, 65.78, 65.85, 64.11, 66.92, 65.21, 64.5, 62.54, 60.8, 54.71, 50.87, 51.83, 63.61, 67.9, 63.99, 65.36, 65.03, 75.22, 74.7, 74.79, 78.08, 76.01, 78.56, 76.6, 74.31, 65, 63.83, 64.34, 60.06, 67.51, 74.5, 80.93, 84.26, 98.48, 99.03, 92.76, 98.05, 96.96, 91.47, 95.63, 90.77] },
      velocityScore: { '1D': -1.7, '1W': -0.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$49B', pe: 412.6, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 1.95,
      etfPresence: { SOXX: 2.35, PSI: false, XSD: 2.31, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.32, proScore: 1.16, coverage: 0.5,
      price: 267.47, weeklyPrices: [249.33, 271.83, 302.52, 272.01, 267.47], weeklyChange: 7.28, dayChange: -1.67, sortRank: 0, periodReturns: { '1M': 22.5, 'YTD': 85.9, '6M': 78.1, '1Y': 191 },
      priceHistory: { '1D': [272, 268.94, 271.55, 273.17, 268.72, 274.48, 271.86, 273.07, 271.52, 273.44, 270.96, 271.23, 269.86, 268.79, 268.2, 267.86, 267.21, 265.67, 265.06, 265.51, 264.82, 264.67, 266, 267.47], '1W': [249.33, 271.83, 302.52, 272.01, 267.47], '1M': [221.64, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 217.5, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83, 302.52, 272.01, 267.47], 'YTD': [143.89, 141.59, 149.12, 135.1, 129.47, 98.06, 121.78, 130.66, 114.48, 114.74, 111.57, 101.72, 103.91, 95.92, 107.93, 168.35, 189.49, 175.77, 198.29, 198.57, 168.99, 221.23, 214.6, 234.32, 239.18, 267.47], '6M': [150.19, 143.22, 150.42, 150.97, 128.02, 119.96, 123.41, 121.44, 124.05, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 210.22, 156.27, 221.64, 229, 234.32, 239.18, 267.47], '1Y': [91.92, 87.59, 97.59, 101.19, 98.41, 116.01, 117.34, 125.38, 106.3, 120.1, 124.77, 163.96, 164.44, 149.38, 144.91, 148.87, 131.41, 137.2, 171.52, 173.16, 158.5, 139.56, 154.18, 189.19, 157.98, 134.13, 150.19, 143.22, 150.42, 150.97, 128.02, 119.96, 111.4, 121.44, 124.05, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 210.22, 156.27, 221.64, 229, 234.32, 239.18, 267.47] },
      velocityScore: { '1D': -2.5, '1W': -7.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$50B', pe: 107, revenueGrowth: 157, eps: 2.5, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 2.14, PSI: false, XSD: 2.49, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 2.24, proScore: 1.12, coverage: 0.5,
      price: 113.21, weeklyPrices: [112.92, 121.62, 131.55, 117.06, 113.21], weeklyChange: 0.26, dayChange: -3.29, sortRank: 0, periodReturns: { '1M': -2.6, 'YTD': 109.1, '6M': 105.5, '1Y': 108.8 },
      priceHistory: { '1D': [117.06, 113.5, 114.46, 114.12, 114.12, 114.7, 115.47, 115.64, 115.11, 114.86, 114.86, 115.36, 115.17, 114.96, 114.86, 114.67, 113.63, 113.12, 112.3, 112.31, 112.32, 112.37, 112.85, 113.21], '1W': [112.92, 121.62, 131.55, 117.06, 113.21], '1M': [127, 124.89, 123.77, 120.62, 120.92, 128.64, 133.93, 131.82, 117.26, 120.9, 117, 110.17, 115.96, 116.79, 125.9, 118.25, 112.92, 121.62, 131.55, 117.06, 113.21], 'YTD': [54.15, 60.89, 60.28, 63.07, 62.2, 63.1, 70.63, 68.09, 68.16, 60.85, 57.69, 60.46, 63.1, 62.2, 68.49, 72.43, 88.99, 98.86, 105.77, 104.11, 106.02, 124.89, 133.93, 117, 118.25, 113.21], '6M': [55.08, 56.7, 62.16, 60.33, 61.13, 61.53, 65.1, 72.21, 69.47, 66.48, 59.23, 59.88, 59.89, 55.66, 63.79, 72.05, 86.91, 93.3, 102.67, 107.24, 109.43, 127, 128.64, 117, 118.25, 113.21], '1Y': [54.21, 53.6, 57.77, 59.52, 59.61, 58.05, 46.98, 50.01, 49.77, 50.99, 47.79, 48.13, 49.8, 50.94, 48.35, 50.88, 50.36, 51.93, 51.4, 50.08, 48.43, 45.56, 48.31, 57.15, 55.1, 53.33, 55.08, 56.7, 62.16, 60.33, 61.13, 61.53, 65.2, 72.21, 69.47, 66.48, 59.23, 59.88, 59.89, 55.66, 63.79, 72.05, 86.91, 93.3, 102.67, 107.24, 109.43, 127, 128.64, 117, 118.25, 113.21] },
      velocityScore: { '1D': -3.4, '1W': -15.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$44B', pe: 83.2, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 2.17, PSI: false, XSD: 2.31, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 2, avgWeight: 1.75, proScore: 0.87, coverage: 0.5,
      price: 368.68, weeklyPrices: [367.11, 391.41, 396.26, 372.15, 368.68], weeklyChange: 0.43, dayChange: -0.93, sortRank: 0, periodReturns: { '1M': -4.5, 'YTD': 115.2, '6M': 109.7, '1Y': 163.6 },
      priceHistory: { '1D': [372.15, 370.24, 367.87, 368.21, 369.62, 370.46, 371.64, 371.59, 370.4, 372.93, 371.8, 372.59, 373.25, 373.08, 371.45, 370.7, 368.82, 366.71, 364.58, 364.17, 366.59, 366.61, 366.6, 368.68], '1W': [367.11, 391.41, 396.26, 372.15, 368.68], '1M': [409.68, 400.66, 391.09, 364.64, 353.79, 382.35, 390.34, 382.74, 345.4, 361.86, 358.72, 354.4, 374.76, 379.87, 384.77, 368.32, 367.11, 391.41, 396.26, 372.15, 368.68], 'YTD': [171.28, 167.66, 218.93, 224.29, 227.73, 227.8, 238.99, 242.56, 247.11, 228.98, 215.94, 218.89, 245.04, 229.36, 247.71, 261.16, 277, 269.63, 309.81, 362.76, 358.98, 400.66, 390.34, 358.72, 368.32, 368.68], '6M': [175.81, 174.96, 174.87, 220.68, 218.89, 228.56, 235.7, 244.16, 245.53, 258.54, 218.73, 224.92, 229.26, 209.49, 236.99, 263.92, 285.71, 265.61, 303.57, 365.88, 356.25, 409.68, 382.35, 358.72, 368.32, 368.68], '1Y': [139.84, 137.38, 139.85, 137.76, 137.19, 140.02, 139.03, 125.45, 121, 128.33, 130.17, 131.7, 131.87, 126.66, 126.56, 133.19, 136.83, 135.91, 152.66, 149.68, 169.98, 158.22, 165.88, 183.46, 186.23, 168.31, 175.81, 174.96, 174.87, 220.68, 218.89, 228.56, 235.87, 244.16, 245.53, 258.54, 218.73, 224.92, 229.26, 209.49, 236.99, 263.92, 285.71, 265.61, 303.57, 365.88, 356.25, 409.68, 382.35, 358.72, 368.32, 368.68] },
      velocityScore: { '1D': 1.2, '1W': -6.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$28B', pe: 157.6, revenueGrowth: 23, eps: 2.34, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: 1.22, PSI: false, XSD: 2.28, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SWKS', name: 'SKYWORKS SOLUTIONS INC', easyScore: 2, avgWeight: 1.39, proScore: 0.7, coverage: 0.5,
      price: 70.33, weeklyPrices: [69.38, 72.45, 76.18, 73.44, 70.33], weeklyChange: 1.38, dayChange: -4.23, sortRank: 0, periodReturns: { '1M': -14.7, 'YTD': 10.9, '6M': 9, '1Y': -4.2 },
      priceHistory: { '1D': [73.44, 71.42, 71.85, 71.06, 71.61, 71.65, 72.13, 72.43, 72.25, 72.19, 71.89, 72.18, 72.1, 72.36, 72.23, 71.9, 71.92, 71.46, 70.97, 70.53, 70.4, 70.11, 70.14, 70.33], '1W': [69.38, 72.45, 76.18, 73.44, 70.33], '1M': [83.42, 78.68, 81.41, 77.85, 75.49, 79.12, 80.66, 79.93, 73.57, 75.37, 73.56, 70.29, 72.73, 73.97, 76.26, 71.42, 69.38, 72.45, 76.18, 73.44, 70.33], 'YTD': [63.41, 60.66, 58.46, 59.67, 55.79, 60.92, 60.73, 59.22, 59.61, 56.48, 55.2, 53.58, 56.19, 53.22, 56.56, 57.93, 61.77, 62.66, 64.97, 66.31, 70.35, 78.68, 80.66, 73.56, 71.42, 70.33], '6M': [64.51, 64.4, 60.17, 57.77, 59.76, 56.83, 61.55, 62.1, 59.78, 58.93, 55.28, 54.54, 54.49, 52.5, 55.06, 57.28, 59.94, 60.98, 72.56, 70.13, 70.35, 83.42, 79.12, 73.56, 71.42, 70.33], '1Y': [73.42, 77.16, 77.63, 72.87, 73.09, 71.33, 67.52, 71.69, 74.93, 75.67, 73.56, 73.6, 74.49, 80.66, 76.34, 76.1, 74.22, 73.97, 78.74, 73.46, 68.85, 62.32, 63.51, 69.37, 68.81, 65, 64.51, 64.4, 60.17, 57.77, 59.76, 56.83, 62.1, 62.1, 59.78, 58.93, 55.28, 54.54, 54.49, 52.5, 55.06, 57.28, 59.94, 60.98, 72.56, 70.13, 70.35, 83.42, 79.12, 73.56, 71.42, 70.33] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$11B', pe: 29.3, revenueGrowth: -1, eps: 2.4, grossMargin: 41, dividendYield: 3.87,
      etfPresence: { SOXX: 0.52, PSI: false, XSD: 2.27, DRAM: false },
      tonyNote: 'SKYWORKS SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 10, avgWeight: 5.63, proScore: 3.31, coverage: 0.588,
      price: 198.59, weeklyPrices: [204.65, 210.69, 208.65, 200.04, 198.59], weeklyChange: -2.96, dayChange: -0.7, sortRank: 0, periodReturns: { '1M': -7.8, 'YTD': 6.5, '6M': 5.3, '1Y': 34.3 },
      priceHistory: { '1D': [200, 200.7, 200.96, 199.35, 198.98, 200.31, 200.98, 201.18, 201.01, 200.52, 200.73, 201.04, 200.79, 200.71, 200.29, 199.66, 199.26, 198.88, 198.26, 197.8, 197.96, 197.66, 197.62, 198.59], '1W': [204.65, 210.69, 208.65, 200.04, 198.59], '1M': [214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 198.59], 'YTD': [186.5, 185.04, 187.05, 184.84, 192.51, 171.88, 186.94, 187.9, 184.89, 183.34, 183.14, 180.4, 178.68, 175.75, 183.91, 198.87, 202.5, 209.25, 207.83, 220.78, 220.61, 212.6, 214.75, 208.19, 207.41, 198.59], '6M': [188.61, 188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 219.44, 222.32, 214.86, 222.82, 208.19, 207.41, 198.59], '1Y': [147.9, 153.3, 162.88, 171.37, 170.78, 179.27, 179.42, 183.16, 175.64, 181.77, 170.62, 177.33, 170.29, 176.97, 187.24, 189.11, 179.83, 180.28, 207.04, 195.21, 193.16, 181.36, 177.82, 179.59, 183.78, 170.94, 188.61, 188.85, 184.86, 186.23, 186.47, 185.61, 185.41, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 219.44, 222.32, 214.86, 222.82, 208.19, 207.41, 198.59] },
      velocityScore: { '1D': 0, '1W': 49.1, '1M': -31.8, '6M': null }, isNew: false,
      marketCap: '$4.8T', pe: 30.5, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.5,
      etfPresence: { PTF: 4.17, WCLD: false, IGV: false, FDTX: 4.62, GTEK: false, ARKK: 1.65, MARS: false, FRWD: 8.23, BCTK: 5.97, FWD: 1.91, CBSE: false, FCUS: false, WGMI: 1.94, CNEQ: 13.44, SGRT: 6.44, SPMO: 7.94, XMMO: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 10, avgWeight: 5.38, proScore: 3.17, coverage: 0.588,
      price: 1030.39, weeklyPrices: [1043.19, 1133.99, 1211.38, 1051.77, 1030.39], weeklyChange: -1.23, dayChange: -2.03, sortRank: 0, periodReturns: { '1M': 37.2, 'YTD': 261, '6M': 259.4, '1Y': 705.6 },
      priceHistory: { '1D': [1051.77, 1040, 1058.12, 1052.8, 1037.31, 1055.05, 1049.43, 1051.02, 1041.56, 1030.03, 1039.86, 1044.4, 1044.41, 1045.79, 1040.03, 1041.45, 1037.15, 1034.3, 1020.77, 1026.33, 1022.51, 1014.12, 1018.51, 1030.39], '1W': [1043.19, 1133.99, 1211.38, 1051.77, 1030.39], '1M': [895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1030.39], 'YTD': [285.41, 327.02, 336.63, 397.58, 435.79, 382.89, 413.97, 417.35, 415.56, 397.05, 405.35, 461.73, 382.09, 367.85, 421.51, 456.23, 487.48, 518.46, 666.59, 766.58, 698.74, 928.41, 1079.57, 935.89, 1020.76, 1030.39], '6M': [286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 795.33, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1030.39], '1Y': [127.91, 120.89, 122.24, 116.43, 109.83, 114.74, 108.78, 127.75, 122.05, 116.5, 118.72, 140, 159.99, 161.71, 182.15, 196.54, 191.94, 198.47, 226.63, 237.5, 241.11, 228.5, 224.53, 234.16, 263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 795.33, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1030.39] },
      velocityScore: { '1D': 1.3, '1W': 46.1, '1M': 27.3, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 48.7, revenueGrowth: 196, eps: 21.14, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { PTF: 5.11, WCLD: false, IGV: false, FDTX: 9.36, GTEK: false, ARKK: false, MARS: false, FRWD: 5.05, BCTK: 5.1, FWD: 1.54, CBSE: 2.45, FCUS: 4.64, WGMI: false, CNEQ: 0.7, SGRT: 8.08, SPMO: 11.78, XMMO: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 7, avgWeight: 5.62, proScore: 2.32, coverage: 0.412,
      price: 627.49, weeklyPrices: [712.13, 746.23, 732.62, 670.75, 627.49], weeklyChange: -11.89, dayChange: -6.45, sortRank: 0, periodReturns: { '1M': 29.6, 'YTD': 264.2, '6M': 249.5, '1Y': 910.9 },
      priceHistory: { '1D': [670.75, 640.52, 654.98, 651.09, 640.03, 652.63, 654.75, 656.33, 651.12, 651.01, 644.37, 645.73, 645.44, 645.6, 640.26, 635.69, 634.88, 629.6, 621.17, 623.63, 620.95, 619.59, 625.93, 627.49], '1W': [712.13, 746.23, 732.62, 670.75, 627.49], '1M': [524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 627.49], 'YTD': [172.27, 187.68, 222.1, 243.29, 278.41, 260.19, 284.1, 284.67, 282.25, 259.03, 261.18, 304.9, 296.14, 297.73, 337.88, 365, 389.1, 412.76, 483.15, 488.74, 455.8, 530.6, 594.11, 517.72, 681.08, 627.49], '6M': [179.56, 187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 515.83, 458.68, 524.65, 563.1, 517.72, 681.08, 627.49], '1Y': [62.07, 63.84, 64.64, 66.53, 69.32, 71.43, 73.78, 75.91, 75.86, 79.71, 86, 95.02, 100.94, 109.69, 130.59, 121.18, 120.44, 120.47, 141.38, 160.1, 169.99, 152.86, 155.41, 155.59, 181.95, 166.26, 179.56, 187.7, 200.46, 221.51, 240.85, 270.23, 282.58, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 515.83, 458.68, 524.65, 563.1, 517.72, 681.08, 627.49] },
      velocityScore: { '1D': -1.3, '1W': 61.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$216B', pe: 37.6, revenueGrowth: 46, eps: 16.7, grossMargin: 45, dividendYield: 0.09,
      etfPresence: { PTF: 5.76, WCLD: false, IGV: false, FDTX: 4, GTEK: false, ARKK: false, MARS: false, FRWD: 5.92, BCTK: false, FWD: false, CBSE: false, FCUS: 5.52, WGMI: false, CNEQ: 5.62, SGRT: 10.21, SPMO: 2.33, XMMO: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 7, avgWeight: 4.4, proScore: 1.81, coverage: 0.412,
      price: 439.55, weeklyPrices: [432.15, 462.12, 467.67, 436.39, 439.55], weeklyChange: 1.71, dayChange: 0.72, sortRank: 0, periodReturns: { '1M': 8.7, 'YTD': 44.6, '6M': 47.1, '1Y': 99.7 },
      priceHistory: { '1D': [436.39, 434.62, 439.76, 439.42, 437.17, 440.47, 441.67, 441.49, 440, 439.28, 441.11, 442.34, 442.35, 443.19, 442.14, 441.03, 440.2, 439.58, 437.91, 437.15, 437.54, 436.47, 436.8, 439.55], '1W': [432.15, 462.12, 467.67, 436.39, 439.55], '1M': [412.32, 422.73, 424.86, 418.45, 435.63, 446.69, 436.69, 444.92, 415.17, 426.8, 427.92, 408.75, 421.07, 423.93, 441.4, 425.83, 432.15, 462.12, 467.67, 436.39, 439.55], 'YTD': [303.89, 318.01, 341.64, 327.37, 339.55, 330.73, 368.1, 360.39, 376.81, 353.86, 336.71, 339.57, 347.75, 341.49, 365.49, 375.1, 387.44, 393.83, 419.5, 397.28, 392.61, 422.73, 436.69, 427.92, 425.83, 439.55], '6M': [298.8, 319.61, 323.63, 342.4, 332.71, 341.36, 355.41, 366.36, 370.04, 369.11, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 404.54, 395.95, 412.32, 446.69, 427.92, 425.83, 439.55], '1Y': [220.09, 224.68, 231.84, 237.56, 240.33, 242.91, 231.37, 244.29, 232.7, 238.72, 231.39, 260.44, 262.79, 280.71, 288.47, 304.52, 304.71, 288.88, 305.09, 293.64, 291.17, 277.91, 284.68, 295.45, 310.14, 276.96, 298.8, 319.61, 323.63, 342.4, 332.71, 341.36, 348.85, 366.36, 370.04, 369.11, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 404.54, 395.95, 412.32, 446.69, 427.92, 425.83, 439.55] },
      velocityScore: { '1D': 0.6, '1W': -1.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 37.9, revenueGrowth: 35, eps: 11.61, grossMargin: 62, dividendYield: 0.87,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6, GTEK: false, ARKK: 0.97, MARS: false, FRWD: 5.94, BCTK: 8.93, FWD: false, CBSE: 2.64, FCUS: false, WGMI: 0.6, CNEQ: 5.74, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 7, avgWeight: 4.04, proScore: 1.67, coverage: 0.412,
      price: 514.83, weeklyPrices: [512.48, 537.37, 551.63, 519.85, 514.83], weeklyChange: 0.46, dayChange: -0.97, sortRank: 0, periodReturns: { '1M': 10.1, 'YTD': 140.4, '6M': 139.4, '1Y': 271.9 },
      priceHistory: { '1D': [519.85, 511.32, 522.71, 521.78, 514.3, 522.57, 520.78, 519.9, 517.25, 515.14, 518.52, 521.38, 520.91, 521.55, 520.77, 518.1, 516.24, 513.38, 509.96, 509.67, 510.36, 509.74, 510.76, 514.83], '1W': [512.48, 537.37, 551.63, 519.85, 514.83], '1M': [503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 514.83], 'YTD': [214.16, 204.68, 227.92, 253.73, 252.18, 192.5, 205.94, 203.37, 203.68, 199.45, 197.74, 199.46, 220.27, 210.21, 236.64, 258.12, 303.46, 337.11, 421.39, 448.29, 414.05, 495.54, 542.52, 475.51, 507.29, 514.83], '6M': [215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 458.79, 420.99, 503.89, 521.54, 475.51, 507.29, 514.83], '1Y': [138.43, 136.11, 138.41, 160.08, 158.65, 179.51, 163.12, 174.95, 166.55, 166.62, 162.13, 159.54, 159.16, 160.88, 164.01, 235.56, 238.6, 230.23, 264.33, 256.33, 237.52, 230.29, 206.13, 217.6, 221.42, 198.11, 215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 458.79, 420.99, 503.89, 521.54, 475.51, 507.29, 514.83] },
      velocityScore: { '1D': 0, '1W': 7.1, '1M': -41.8, '6M': null }, isNew: false,
      marketCap: '$839B', pe: 170.5, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.69, MARS: false, FRWD: 7.08, BCTK: 3.37, FWD: 2.12, CBSE: false, FCUS: 3.36, WGMI: false, CNEQ: false, SGRT: 3.64, SPMO: 4.05, XMMO: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'SPCX', name: 'SPACE EXPLORATION TECHN-CL A', easyScore: 6, avgWeight: 7.07, proScore: 2.5, coverage: 0.353,
      price: 157.04, weeklyPrices: [157.04], weeklyChange: 0.6, dayChange: 0.6, sortRank: 0, periodReturns: { '1M': 0, 'YTD': 0, '6M': 0, '1Y': 0 },
      priceHistory: undefined,
      velocityScore: { '1D': -1.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.1T', pe: null, revenueGrowth: 15, eps: -0.67, grossMargin: 49, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.24, MARS: 22.25, FRWD: 2.66, BCTK: 7.96, FWD: 1.96, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.35, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'SPACE EXPLORATION TECHN-CL A appears in 6 of 17 Broad Tech ETFs (35% coverage) with average weight 7.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 6, avgWeight: 4.12, proScore: 1.45, coverage: 0.353,
      price: 382.02, weeklyPrices: [392.90, 411.35, 392.13, 380.15, 382.02], weeklyChange: -2.77, dayChange: 0.49, sortRank: 0, periodReturns: { '1M': -7.8, 'YTD': 10.4, '6M': 9.1, '1Y': 44.8 },
      priceHistory: { '1D': [380.15, 382.2, 384.29, 382, 380.63, 383.76, 384.45, 384.87, 385.89, 384.14, 384.95, 385.14, 384.23, 385.66, 385.37, 384.16, 383.62, 383.42, 381.85, 380.52, 380.74, 380.3, 380.21, 382.02], '1W': [392.9, 411.35, 392.13, 380.15, 382.02], '1M': [422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.02], 'YTD': [346.1, 332.48, 343.02, 325.49, 330.73, 310.51, 331.17, 333.99, 321.7, 332.77, 335.97, 315.93, 318.81, 313.49, 354.91, 396.72, 422.65, 405.45, 425.44, 419.3, 411.07, 421.86, 479.23, 392.16, 376.71, 382.02], '6M': [350.22, 347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 428.43, 420.71, 422.01, 481.57, 392.16, 376.71, 382.02], '1Y': [263.77, 264.74, 277.9, 280.81, 283.69, 302.62, 301.67, 312.83, 294.91, 298.01, 302.39, 369.57, 346.17, 339.31, 333.39, 345.5, 351.33, 340.3, 385.98, 358.98, 351.96, 340.5, 385.03, 380.61, 412.97, 326.02, 350.22, 347.62, 344.97, 351.71, 324.85, 331.11, 332.92, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 428.43, 420.71, 422.01, 481.57, 392.16, 376.71, 382.02] },
      velocityScore: { '1D': -0.7, '1W': 20.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 63.6, revenueGrowth: 48, eps: 6.01, grossMargin: 76, dividendYield: 0.68,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.79, GTEK: false, ARKK: 1.13, MARS: false, FRWD: 5.09, BCTK: 6.82, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.32, SGRT: false, SPMO: 6.56, XMMO: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 5, avgWeight: 5.03, proScore: 1.48, coverage: 0.294,
      price: 974.15, weeklyPrices: [1066.07, 1070.23, 1094.04, 1038.59, 974.15], weeklyChange: -8.62, dayChange: -6.2, sortRank: 0, periodReturns: { '1M': 19.9, 'YTD': 253.7, '6M': 241.5, '1Y': 614.7 },
      priceHistory: { '1D': [1038.59, 996.35, 1015.05, 1014.18, 1000.73, 1020.99, 1026.36, 1025.18, 1012.82, 1013.02, 1006.88, 1007.18, 1001.43, 999.81, 991.65, 981.7, 977.46, 978.03, 970.16, 973.61, 969.86, 965.14, 970.89, 974.15], '1W': [1066.07, 1070.23, 1094.04, 1038.59, 974.15], '1M': [845.76, 870.66, 880.72, 879.8, 921.26, 926.61, 940.69, 925.99, 847.47, 876.77, 846.01, 815.99, 868.09, 931.04, 1018.8, 1031.34, 1066.07, 1070.23, 1094.04, 1038.59, 974.15], 'YTD': [275.39, 284.47, 320.32, 346.53, 446.57, 405.45, 431.17, 408.97, 409.67, 367.34, 373.98, 406.77, 413.22, 423.12, 500.77, 519.6, 579.88, 643.3, 786.42, 808.8, 733.35, 870.66, 940.69, 846.01, 1031.34, 974.15], '6M': [285.27, 287.54, 304.01, 326.23, 358.29, 432.95, 425, 425.99, 407.4, 379.52, 374.33, 398.78, 404.02, 362.43, 468.72, 533.44, 559.9, 579.03, 771.01, 834.01, 740.84, 845.76, 926.61, 846.01, 1031.34, 974.15], '1Y': [136.31, 145.04, 142.01, 147.12, 152.76, 147.42, 147.27, 155.59, 157.93, 165.24, 176.32, 193.04, 213.36, 223.7, 256.84, 224.35, 219.38, 215.05, 265.62, 275.77, 288, 253.86, 261.89, 258.67, 298.92, 277.65, 285.27, 287.54, 304.01, 326.23, 358.29, 432.95, 429.32, 425.99, 407.4, 379.52, 374.33, 398.78, 404.02, 362.43, 468.72, 533.44, 559.9, 579.03, 771.01, 834.01, 740.84, 845.76, 926.61, 846.01, 1031.34, 974.15] },
      velocityScore: { '1D': 0, '1W': -11.4, '1M': -35.4, '6M': null }, isNew: false,
      marketCap: '$220B', pe: 92.9, revenueGrowth: 44, eps: 10.49, grossMargin: 42, dividendYield: 0.29,
      etfPresence: { PTF: 5.44, WCLD: false, IGV: false, FDTX: 4.04, GTEK: false, ARKK: false, MARS: false, FRWD: 8.6, BCTK: false, FWD: false, CBSE: false, FCUS: 4.94, WGMI: false, CNEQ: false, SGRT: false, SPMO: 2.15, XMMO: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'LRCX', name: 'LRCX', easyScore: 5, avgWeight: 4.7, proScore: 1.38, coverage: 0.294,
      price: 367.65, weeklyPrices: [374.18, 389.04, 409.54, 371.33, 367.65], weeklyChange: -1.75, dayChange: -0.99, sortRank: 0, periodReturns: { '1M': 20.4, 'YTD': 114.8, '6M': 107.3, '1Y': 284.5 },
      priceHistory: { '1D': [371.33, 365.88, 369.25, 371.61, 368.33, 371.61, 375.58, 373.17, 369.18, 368.81, 368.67, 369.76, 369.96, 370.49, 369.45, 368.33, 367.47, 366.78, 362.76, 363.04, 364.94, 364.05, 365.7, 367.65], '1W': [374.18, 389.04, 409.54, 371.33, 367.65], '1M': [322.68, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04, 409.54, 371.33, 367.65], 'YTD': [171.18, 200.96, 217.47, 220.7, 248.17, 213.31, 231.29, 237.39, 239.07, 214.68, 209.49, 224.71, 233.45, 222.01, 258.76, 265.16, 265.55, 248.75, 297.17, 289.24, 273.38, 318.93, 343.71, 327.16, 369.34, 367.65], '6M': [177.33, 185.06, 218.36, 222.96, 222.87, 237.5, 229.28, 235.53, 242.27, 231, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 296.05, 277.96, 322.68, 334.41, 327.16, 369.34, 367.65], '1Y': [95.63, 96.81, 99.81, 100.37, 97.1, 99.09, 95.94, 105.28, 100.33, 103.63, 97.74, 107.36, 121.9, 128.32, 142.79, 142.54, 144.78, 141.25, 160.67, 165.05, 159.18, 143.24, 151.93, 159.75, 168.26, 154.98, 177.33, 185.06, 218.36, 222.96, 222.87, 237.5, 231.01, 235.53, 242.27, 231, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 296.05, 277.96, 322.68, 334.41, 327.16, 369.34, 367.65] },
      velocityScore: { '1D': 3, '1W': 7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$460B', pe: 69.8, revenueGrowth: 24, eps: 5.27, grossMargin: 50, dividendYield: 0.28,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.9, BCTK: 8.51, FWD: 1.97, CBSE: 3.05, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 4.07, XMMO: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 5, avgWeight: 4.05, proScore: 1.19, coverage: 0.294,
      price: 345.01, weeklyPrices: [362.10, 367.46, 348.78, 346.08, 345.01], weeklyChange: -4.72, dayChange: -0.31, sortRank: 0, periodReturns: { '1M': -9.1, 'YTD': 9.9, '6M': 9.3, '1Y': 105.7 },
      priceHistory: { '1D': [346.08, 348.32, 348.43, 350.21, 350.08, 349.88, 352.04, 351.4, 350.15, 350.12, 349.73, 349.86, 349.79, 349.85, 348.73, 348.24, 348.57, 348.64, 348.07, 347.91, 348.57, 348.29, 346.05, 345.01], '1W': [362.1, 367.46, 348.78, 346.08, 345.01], '1M': [384.84, 384.83, 386.12, 376.43, 372.58, 358.39, 355.68, 369.27, 365.76, 361.17, 362.29, 353.32, 356.56, 358.16, 367.11, 371.1, 362.1, 367.46, 348.78, 346.08, 345.01], 'YTD': [313.8, 326.01, 333.16, 330.84, 338.66, 331.33, 309.37, 303.56, 307.15, 300.91, 303.21, 306.3, 289.59, 294.9, 316.37, 334.47, 337.73, 347.31, 395.14, 383.82, 384.9, 384.83, 355.68, 362.29, 371.1, 345.01], '6M': [315.67, 315.32, 329.14, 330.34, 333.59, 344.9, 324.4, 306.02, 311.69, 306.36, 306.01, 304.42, 299.02, 273.14, 303.93, 330.58, 330.47, 347.5, 384.27, 386.77, 393.11, 384.84, 358.39, 362.29, 371.1, 345.01], '1Y': [167.74, 176.91, 177.66, 183.77, 191.51, 197.44, 196.92, 204.16, 202.49, 207.95, 231.1, 239.56, 249.85, 247.83, 245.54, 245.46, 251.71, 252.53, 275.17, 284.75, 291.74, 284.96, 323.64, 320.62, 321, 298.06, 315.67, 315.32, 329.14, 330.34, 333.59, 344.9, 323.1, 306.02, 311.69, 306.36, 306.01, 304.42, 299.02, 273.14, 303.93, 330.58, 330.47, 347.5, 384.27, 386.77, 393.11, 384.84, 358.39, 362.29, 371.1, 345.01] },
      velocityScore: { '1D': 0.8, '1W': 40, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.2T', pe: 26.3, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.66, GTEK: false, ARKK: 1.92, MARS: false, FRWD: false, BCTK: 5.49, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 5.69, SGRT: false, SPMO: 3.5, XMMO: false },
      tonyNote: 'Alphabet Inc Class C appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 4.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 5, avgWeight: 3.28, proScore: 0.97, coverage: 0.294,
      price: 238.42, weeklyPrices: [237.50, 244.39, 232.79, 234.11, 238.42], weeklyChange: 0.39, dayChange: 1.84, sortRank: 0, periodReturns: { '1M': -10.5, 'YTD': 3.3, '6M': 2.6, '1Y': 12.1 },
      priceHistory: { '1D': [234.11, 237.8, 238.06, 237.03, 238.67, 238.69, 240.01, 241.13, 241.89, 241.82, 241.07, 241.61, 241.84, 241.53, 240.64, 240.31, 239.73, 239.92, 239.34, 239.27, 238.59, 238.44, 238.65, 238.42], '1W': [237.5, 244.39, 232.79, 234.11, 238.42], '1M': [265.29, 271.85, 274, 270.64, 261.26, 256.52, 250.02, 253.79, 246.03, 245.22, 244.19, 238, 241.51, 238.55, 246.02, 246, 237.5, 244.39, 232.79, 234.11, 238.42], 'YTD': [230.82, 246.29, 238.18, 234.34, 241.73, 222.69, 199.6, 204.86, 207.92, 218.94, 209.53, 209.87, 211.71, 210.57, 233.65, 248.5, 255.36, 263.04, 274.99, 265.82, 259.34, 271.85, 250.02, 244.19, 246, 238.42], '6M': [232.38, 226.5, 247.38, 239.12, 238.42, 242.96, 208.72, 198.79, 205.27, 208.39, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 268.99, 264.86, 265.29, 256.52, 244.19, 246, 238.42], '1Y': [212.77, 220.46, 222.54, 223.19, 228.29, 230.19, 222.31, 221.47, 228.01, 228.71, 225.99, 230.33, 231.62, 220.21, 220.63, 225.22, 215.57, 217.95, 230.3, 250.2, 249.1, 222.55, 229.67, 232.38, 231.78, 221.27, 232.38, 226.5, 247.38, 239.12, 238.42, 242.96, 210.32, 198.79, 205.27, 208.39, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 268.99, 264.86, 265.29, 256.52, 244.19, 246, 238.42] },
      velocityScore: { '1D': -19.2, '1W': -16.4, '1M': -76.7, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 32.2, revenueGrowth: 17, eps: 7.4, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.01, GTEK: false, ARKK: 2.36, MARS: false, FRWD: 2.8, BCTK: false, FWD: 1.46, CBSE: false, FCUS: false, WGMI: false, CNEQ: 5.78, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, avgWeight: 5.33, proScore: 1.25, coverage: 0.235,
      price: 371.92, weeklyPrices: [378.91, 379.40, 367.34, 373.94, 371.92], weeklyChange: -1.85, dayChange: -0.54, sortRank: 0, periodReturns: { '1M': -11.1, 'YTD': -23.1, '6M': -23.8, '1Y': -24.1 },
      priceHistory: { '1D': [373.94, 377.72, 375.77, 373.13, 374.9, 373.93, 374.63, 374.72, 374.61, 374.91, 373.57, 373.95, 373.96, 374.22, 372.85, 373.08, 372.86, 372.04, 370.91, 371.8, 370.61, 371.61, 372.11, 371.92], '1W': [378.91, 379.4, 367.34, 373.94, 371.92], '1M': [416.03, 412.67, 426.99, 450.24, 460.52, 441.31, 427.34, 428.05, 416.67, 411.74, 403.41, 397.36, 390.34, 390.74, 399.76, 393.83, 378.91, 379.4, 367.34, 373.94, 371.92], 'YTD': [483.62, 478.11, 456.66, 451.14, 433.5, 393.67, 401.84, 398.46, 401.72, 410.68, 401.86, 391.79, 371.04, 369.37, 373.07, 411.22, 432.92, 424.46, 413.96, 407.77, 417.42, 412.67, 427.34, 403.41, 393.83, 371.92], '6M': [488.02, 472.94, 479.28, 459.86, 470.28, 423.37, 413.6, 401.32, 384.47, 398.55, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 412.66, 423.54, 416.03, 441.31, 403.41, 393.83, 371.92], '1Y': [490.11, 492.05, 503.51, 505.62, 505.87, 513.24, 524.94, 529.24, 509.77, 502.04, 505.35, 500.37, 510.02, 510.15, 519.71, 524.85, 513.43, 520.54, 541.55, 507.16, 508.68, 493.79, 476.99, 477.73, 478.56, 476.12, 488.02, 472.94, 479.28, 459.86, 470.28, 423.37, 401.14, 401.32, 384.47, 398.55, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 412.66, 423.54, 416.03, 441.31, 403.41, 393.83, 371.92] },
      velocityScore: { '1D': 1.6, '1W': 10.6, '1M': -74.9, '6M': null }, isNew: false,
      marketCap: '$2.8T', pe: 22.2, revenueGrowth: 18, eps: 16.79, grossMargin: 68, dividendYield: 0.97,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.37, FDTX: 3.79, GTEK: false, ARKK: false, MARS: false, FRWD: 2.78, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 6.38, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 4, avgWeight: 4.64, proScore: 1.09, coverage: 0.235,
      price: 1900, weeklyPrices: [1958.80, 2184.75, 2273.73, 1963.60, 1900.00], weeklyChange: -3, dayChange: -3.24, sortRank: 0, periodReturns: { '1M': 28.5, 'YTD': 700.4, '6M': 659.8, '1Y': 3913.5 },
      priceHistory: { '1D': [1963.6, 1939.49, 1975.87, 1961.4, 1940, 1956.48, 1945, 1943.72, 1919.03, 1925.52, 1917.98, 1928.99, 1933.77, 1931.5, 1927.67, 1917.4, 1910.55, 1893.62, 1873.99, 1885.07, 1878.2, 1875.03, 1889.95, 1900], '1W': [1958.8, 2184.75, 2273.73, 1963.6, 1900], '1M': [1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1900], 'YTD': [237.38, 334.54, 409.24, 503.44, 539.3, 576.2, 630.29, 621.09, 651.9, 565.59, 618.82, 753.69, 677.86, 692.73, 851.57, 891.72, 979.07, 1064.21, 1409.98, 1452.02, 1383.29, 1589.94, 1831.5, 1646.54, 1991.55, 1900], '6M': [250.08, 275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1547.56, 1333.01, 1589.55, 1716.36, 1646.54, 1991.55, 1900], '1Y': [47.34, 44.96, 46.2, 41.36, 43, 43.39, 42.1, 46.83, 44.58, 47.35, 53.01, 73.92, 93.97, 99.83, 121.12, 131.88, 144.3, 146.95, 204.36, 216.5, 271.58, 244.93, 220.5, 194.38, 232.86, 206.83, 250.08, 275.24, 377.41, 413.62, 470.8, 665.24, 597.95, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1547.56, 1333.01, 1589.55, 1716.36, 1646.54, 1991.55, 1900] },
      velocityScore: { '1D': -4.4, '1W': -6, '1M': -50.2, '6M': null }, isNew: false,
      marketCap: '$281B', pe: 64.9, revenueGrowth: 251, eps: 29.26, grossMargin: 56, dividendYield: null,
      etfPresence: { PTF: 8.72, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.57, CBSE: false, FCUS: 5.3, WGMI: false, CNEQ: false, SGRT: false, SPMO: 2.98, XMMO: false },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks', easyScore: 4, avgWeight: 4.16, proScore: 0.98, coverage: 0.235,
      price: 287.13, weeklyPrices: [282.13, 287.78, 286.40, 290.92, 287.13], weeklyChange: 1.77, dayChange: -1.3, sortRank: 0, periodReturns: { '1M': 10.2, 'YTD': 55.9, '6M': 53.4, '1Y': 42.4 },
      priceHistory: { '1D': [290.92, 290.09, 289.06, 286.13, 286.3, 288.39, 287, 287.54, 285.84, 286.12, 287.51, 288.11, 287.98, 288.38, 288.17, 288.62, 287.71, 286.98, 285.98, 286.86, 286.69, 286.98, 287.58, 287.13], '1W': [282.13, 287.78, 286.4, 290.92, 287.13], '1M': [256.75, 248.47, 257.77, 281.69, 300.48, 297.18, 280.43, 279.25, 272.05, 266.33, 260.52, 263.22, 279.53, 279.62, 284.54, 279.9, 282.13, 287.78, 286.4, 290.92, 287.13], 'YTD': [184.2, 190.8, 187.73, 182.27, 176.2, 154.77, 162.81, 150.99, 149.4, 163.16, 168.12, 168.91, 153.22, 160.67, 166.99, 164.11, 181.2, 181.54, 183.68, 215.6, 240.13, 248.47, 280.43, 260.52, 279.9, 287.13], '6M': [187.22, 179.37, 189.02, 187.66, 184.22, 175.42, 166, 166.95, 144.14, 150.15, 165.1, 167.45, 164.05, 154.35, 169.87, 161.59, 174.96, 180.99, 183.98, 213.66, 247.55, 256.75, 297.18, 260.52, 279.9, 287.13], '1Y': [201.69, 197.58, 206.06, 192.59, 199.22, 183.03, 172.89, 175.4, 181.56, 184.23, 191.53, 197.33, 203.12, 200.7, 206.8, 217.79, 206.7, 212.42, 217.16, 213.18, 218.27, 201, 186.27, 193.63, 192.96, 183.44, 187.22, 179.37, 189.02, 187.66, 184.22, 175.42, 159.32, 166.95, 144.14, 150.15, 165.1, 167.45, 164.05, 154.35, 169.87, 161.59, 174.96, 180.99, 183.98, 213.66, 247.55, 256.75, 297.18, 260.52, 279.9, 287.13] },
      velocityScore: { '1D': 1, '1W': -13.3, '1M': -58.1, '6M': null }, isNew: false,
      marketCap: '$234B', pe: 247.5, revenueGrowth: 31, eps: 1.16, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.78, IGV: 9.15, FDTX: 3.67, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.03, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'LITE', name: 'Lumentum Holdings Inc', easyScore: 4, avgWeight: 3.77, proScore: 0.89, coverage: 0.235,
      price: 843.47, weeklyPrices: [869.98, 850.00, 893.93, 827.92, 843.47], weeklyChange: -3.05, dayChange: 1.88, sortRank: 0, periodReturns: { '1M': -10.9, 'YTD': 128.8, '6M': 113, '1Y': 818.7 },
      priceHistory: { '1D': [827.92, 810, 833.91, 824, 825.34, 838.04, 850.42, 852.61, 847.42, 845.33, 845.37, 848.76, 847.02, 850.88, 847.81, 843.78, 840.42, 839.21, 832.57, 835.62, 833.88, 835.52, 839.6, 843.47], '1W': [869.98, 850, 893.93, 827.92, 843.47], '1M': [910.81, 902.31, 860.62, 854.96, 905, 1029.15, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93, 827.92, 843.47], 'YTD': [368.59, 348.26, 343.27, 354.49, 381.44, 504.42, 583.46, 635.64, 677, 650.82, 616.09, 700.81, 777.17, 764.65, 894.13, 824.01, 873.6, 858.32, 944.28, 992.37, 890.09, 902.31, 938, 821.76, 875.36, 843.47], '6M': [395.92, 386.11, 351.42, 324.25, 332.45, 423.42, 577.15, 562.74, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 1053.09, 884.98, 910.81, 1029.15, 821.76, 875.36, 843.47], '1Y': [91.81, 91.49, 90.44, 99.63, 102.13, 109.85, 110.01, 119.66, 117.96, 124.62, 134.12, 164.88, 163.34, 152.75, 171.4, 163.09, 156.57, 158.06, 214.28, 232.75, 252.47, 247.43, 291.27, 302.98, 366, 320.25, 395.92, 386.11, 351.42, 324.25, 332.45, 423.42, 551.99, 562.74, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 1053.09, 884.98, 910.81, 1029.15, 821.76, 875.36, 843.47] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$66B', pe: 147.7, revenueGrowth: 90, eps: 5.71, grossMargin: 41, dividendYield: null,
      etfPresence: { PTF: 3.56, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 1.45, FWD: false, CBSE: false, FCUS: 2.31, WGMI: false, CNEQ: false, SGRT: 7.77, SPMO: false, XMMO: false },
      tonyNote: 'Lumentum Holdings Inc appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 4, avgWeight: 3.62, proScore: 0.85, coverage: 0.235,
      price: 114.14, weeklyPrices: [130.63, 128.47, 119.50, 116.70, 114.14], weeklyChange: -12.62, dayChange: -2.19, sortRank: 0, periodReturns: { '1M': -16.6, 'YTD': -35.8, '6M': -41.2, '1Y': -20.3 },
      priceHistory: { '1D': [116.7, 117.51, 117.07, 116.64, 116.76, 116.3, 116.65, 115.62, 115.54, 115.97, 114.24, 114.56, 113.7, 114.1, 113.61, 113.16, 113.36, 112.98, 112.86, 112.96, 112.43, 113.08, 114.01, 114.14], '1W': [130.63, 128.47, 119.5, 116.7, 114.14], '1M': [136.6, 132.51, 143.34, 156.54, 160.65, 152.17, 142.2, 141.7, 135.53, 136.47, 132.07, 130.21, 131.08, 127.99, 134.71, 133.25, 130.63, 128.47, 119.5, 116.7, 114.14], 'YTD': [177.75, 176.86, 177.07, 165.9, 151.86, 130.01, 129.13, 134.89, 135.94, 152.67, 153.5, 152.77, 154.96, 146.49, 130.49, 142.15, 152.62, 137.97, 133.79, 136, 135.26, 132.51, 142.2, 132.07, 133.25, 114.14], '6M': [194.17, 167.86, 177.49, 170.96, 167.47, 147.76, 142.91, 131.41, 130.6, 145.17, 156.43, 152.72, 160.84, 137.55, 150.07, 135.7, 145.97, 141.18, 135.91, 136.89, 135.14, 136.6, 152.17, 132.07, 133.25, 114.14], '1Y': [143.23, 130.68, 143.13, 150.91, 154.63, 158.61, 179.54, 186.97, 157.75, 160.87, 154.9, 166.74, 168.33, 179.56, 184.95, 183.56, 179.62, 175.49, 198.81, 187.9, 190.96, 167.33, 163.55, 176.08, 187.91, 177.29, 194.17, 167.86, 177.49, 170.96, 167.47, 147.76, 135.9, 131.41, 130.6, 145.17, 156.43, 152.72, 160.84, 137.55, 150.07, 135.7, 145.97, 141.18, 135.91, 136.89, 135.14, 136.6, 152.17, 132.07, 133.25, 114.14] },
      velocityScore: { '1D': -1.2, '1W': -12.4, '1M': -63, '6M': null }, isNew: false,
      marketCap: '$274B', pe: 128.3, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 7.97, FDTX: 2.87, GTEK: false, ARKK: 2.58, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.07, XMMO: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'SHOP', name: 'Shopify Inc Registered Shs -A- Subord Vtg', easyScore: 4, avgWeight: 2.82, proScore: 0.66, coverage: 0.235,
      price: 113.69, weeklyPrices: [108.09, 108.85, 107.98, 107.68, 113.69], weeklyChange: 5.18, dayChange: 5.58, sortRank: 0, periodReturns: { '1M': 10.4, 'YTD': -29.4, '6M': -32.9, '1Y': -0.6 },
      priceHistory: { '1D': [107.68, 109.99, 111.08, 110.77, 111.31, 111.5, 111.1, 112, 111.73, 112.32, 111.29, 110.68, 110.5, 111.18, 111.57, 112.72, 112.5, 111.63, 111.21, 112.19, 111.65, 112.27, 113.53, 113.69], '1W': [108.09, 108.85, 107.98, 107.68, 113.69], '1M': [104.9, 106.6, 115.03, 118.71, 124.12, 117.01, 112.94, 116.04, 109.54, 110.78, 110.42, 108.2, 110.47, 108.24, 112.49, 113.23, 108.09, 108.85, 107.98, 107.68, 113.69], 'YTD': [160.97, 168.28, 157.99, 137.64, 143.64, 111.24, 110.66, 123.8, 125.94, 134.79, 126.17, 123.75, 118.42, 118.52, 112.38, 127.41, 131.96, 121.26, 105.44, 99.84, 101.01, 106.6, 112.94, 110.42, 113.23, 113.69], '6M': [169.45, 157.2, 164.48, 155.81, 136.31, 132.2, 118.4, 112.7, 117.28, 119.38, 133.5, 126.58, 121.1, 111.77, 117.06, 117.64, 131.13, 122.05, 107.63, 102.54, 102.39, 104.9, 117.01, 110.42, 113.23, 113.69], '1Y': [114.42, 112.67, 114.32, 120, 122.21, 123.01, 154.9, 149.3, 139.25, 140.85, 140.22, 142.2, 147.87, 148.83, 149.57, 166.43, 156.21, 162.01, 179.01, 162.92, 158.94, 140.45, 157.37, 160, 168.42, 161.73, 169.45, 157.2, 164.48, 155.81, 136.31, 132.2, 112.05, 112.7, 117.28, 119.38, 133.5, 126.58, 121.1, 111.77, 117.06, 117.64, 131.13, 122.05, 107.63, 102.54, 102.39, 104.9, 117.01, 110.42, 113.23, 113.69] },
      velocityScore: { '1D': 0, '1W': -25.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$148B', pe: 111.5, revenueGrowth: 34, eps: 1.02, grossMargin: 48, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.89, GTEK: false, ARKK: 4.15, MARS: false, FRWD: 1.79, BCTK: 2.45, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Shopify Inc Registered Shs -A- Subord Vtg appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 2.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC-CL A', easyScore: 4, avgWeight: 2.5, proScore: 0.59, coverage: 0.235,
      price: 345.83, weeklyPrices: [363.79, 368.03, 349.68, 346.13, 345.83], weeklyChange: -4.94, dayChange: -0.07, sortRank: 0, periodReturns: { '1M': -9.7, 'YTD': 10.5, '6M': 10.1, '1Y': 107.4 },
      priceHistory: { '1D': [346.09, 348.44, 348.62, 350.64, 349.73, 350.34, 352.66, 353.21, 350.87, 351.02, 350.68, 350.56, 350.22, 350.6, 349.57, 348.79, 349.46, 349.02, 349.25, 348.73, 348.79, 349.27, 348.52, 345.83], '1W': [363.79, 368.03, 349.68, 346.13, 345.83], '1M': [388.88, 388.83, 390.13, 380.34, 376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68, 369.35, 373.25, 363.79, 368.03, 349.68, 346.13, 345.83], 'YTD': [313, 325.44, 332.78, 330.54, 338.25, 331.25, 309, 302.85, 307.38, 300.88, 303.55, 307.69, 290.93, 297.39, 318.49, 337.12, 339.32, 349.94, 398.04, 387.35, 387.66, 388.83, 358.99, 364.26, 373.25, 345.83], '6M': [314.09, 315.15, 328.57, 330, 333.26, 343.69, 324.32, 305.72, 311.49, 306.52, 306.36, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 388.43, 388.64, 396.94, 388.88, 361.85, 364.26, 373.25, 345.83], '1Y': [166.77, 175.84, 176.62, 182.97, 190.23, 196.53, 196.09, 203.34, 201.57, 207.14, 230.66, 239.17, 249.53, 247.14, 244.9, 244.62, 251.03, 251.69, 274.57, 284.31, 291.31, 284.28, 323.44, 319.63, 320.21, 296.72, 314.09, 315.15, 328.57, 330, 333.26, 343.69, 322.86, 305.72, 311.49, 306.52, 306.36, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 388.43, 388.64, 396.94, 388.88, 361.85, 364.26, 373.25, 345.83] },
      velocityScore: { '1D': 0, '1W': null, '1M': -85.6, '6M': null }, isNew: false,
      marketCap: '$4.2T', pe: 26.4, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 0.5, MARS: false, FRWD: 3.19, BCTK: false, FWD: 1.93, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 4.38, XMMO: false },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'KLAC', name: 'KLAC', easyScore: 4, avgWeight: 2.07, proScore: 0.49, coverage: 0.235,
      price: 239, weeklyPrices: [238.73, 259.56, 269.16, 244.49, 239.00], weeklyChange: 0.11, dayChange: -2.25, sortRank: 0, periodReturns: { '1M': 26.6, 'YTD': 96.7, '6M': 87.2, '1Y': 168.8 },
      priceHistory: { '1D': [244.49, 239.49, 241.16, 242.1, 240.34, 241.31, 243.43, 240.7, 240.1, 240.46, 239.99, 240.55, 240.75, 241.11, 239.98, 239.18, 238.87, 238.21, 235.8, 235.43, 236.32, 236.96, 237.75, 239], '1W': [238.73, 259.56, 269.16, 244.49, 239], '1M': [201.14, 195.72, 192.76, 192.17, 194, 204.52, 212.51, 213.11, 192.92, 210.81, 213.94, 213.56, 241.16, 254.54, 256.42, 237.33, 238.73, 259.56, 269.16, 244.49, 239], 'YTD': [121.51, 132.46, 154.5, 150, 168.47, 133.1, 145.09, 146.99, 152.43, 142.94, 140.96, 148.24, 154.38, 151.98, 172.73, 174.81, 181.21, 181.62, 181.63, 181.13, 174.06, 195.72, 212.51, 213.94, 237.33, 239], '6M': [127.7, 127.45, 140, 156.78, 154.3, 141.04, 144.02, 146.41, 148.77, 153.49, 142.91, 143.82, 151.14, 138.26, 154.88, 179.59, 178.54, 180.9, 173.29, 184.52, 175.65, 201.14, 204.52, 213.94, 237.33, 239], '1Y': [88.9, 89.89, 92.32, 93.35, 89.71, 92.5, 88.83, 93.55, 87.61, 88.81, 84.39, 93.26, 98.99, 106.87, 112.89, 106.26, 108.7, 111.43, 123.53, 122.71, 119.09, 112.31, 114.59, 121.18, 123.89, 117.2, 127.7, 127.45, 140, 156.78, 154.3, 141.04, 144.29, 146.41, 148.77, 153.49, 142.91, 143.82, 151.14, 138.26, 154.88, 179.59, 178.54, 180.9, 173.29, 184.52, 175.65, 201.14, 204.52, 213.94, 237.33, 239] },
      velocityScore: { '1D': 2.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$312B', pe: 67.9, revenueGrowth: 12, eps: 3.52, grossMargin: 61, dividendYield: 0.38,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: 1.79, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.78, CBSE: 2.94, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.76, XMMO: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 3, avgWeight: 5.29, proScore: 0.93, coverage: 0.176,
      price: 377.3, weeklyPrices: [396.38, 400.49, 405.05, 381.61, 377.30], weeklyChange: -4.81, dayChange: -1.13, sortRank: 0, periodReturns: { '1M': -11.4, 'YTD': -16.1, '6M': -22.3, '1Y': 10.8 },
      priceHistory: { '1D': [381.61, 383.45, 383.29, 381.36, 382.51, 381.38, 382.79, 382.39, 382.91, 383.77, 381.8, 381.83, 381.05, 381.26, 380.55, 379.02, 378.49, 377.6, 375.52, 375.08, 374.88, 374.54, 376.51, 377.3], '1W': [396.38, 400.49, 405.05, 381.61, 377.3], '1M': [433.59, 440.36, 442.1, 435.79, 415.88, 423.74, 423.7, 418.45, 391, 408.95, 396.68, 381.59, 399.15, 406.43, 411.15, 404.66, 396.38, 400.49, 405.05, 381.61, 377.3], 'YTD': [449.72, 435.8, 438.57, 449.36, 416.56, 397.21, 417.07, 411.71, 408.58, 405.55, 395.01, 392.78, 385.95, 381.26, 345.62, 391.95, 387.51, 372.8, 398.73, 433.45, 404.11, 440.36, 423.7, 396.68, 404.66, 377.3], '6M': [485.4, 438.07, 445.01, 437.5, 435.2, 421.81, 417.32, 417.44, 399.83, 403.32, 398.68, 395.56, 380.85, 355.28, 346.65, 364.2, 386.42, 376.02, 389.37, 445, 409.99, 433.59, 423.74, 396.68, 404.66, 377.3], '1Y': [340.47, 300.71, 295.88, 321.67, 332.56, 319.04, 319.91, 340.84, 329.31, 351.67, 334.09, 347.79, 425.86, 442.79, 459.46, 438.69, 435.15, 438.97, 461.51, 462.07, 439.62, 401.25, 419.4, 446.74, 451.45, 467.26, 485.4, 438.07, 445.01, 437.5, 435.2, 421.81, 411.11, 417.44, 399.83, 403.32, 398.68, 395.56, 380.85, 355.28, 346.65, 364.2, 386.42, 376.02, 389.37, 445, 409.99, 433.59, 423.74, 396.68, 404.66, 377.3] },
      velocityScore: { '1D': -2.1, '1W': -13.1, '1M': -82.1, '6M': null }, isNew: false,
      marketCap: '$1.4T', pe: 339.9, revenueGrowth: 16, eps: 1.11, grossMargin: 19, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 9.73, MARS: false, FRWD: false, BCTK: 3.19, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 2.95, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'POWL', name: 'POWL', easyScore: 3, avgWeight: 5.23, proScore: 3.14, coverage: 0.6,
      price: 295.01, weeklyPrices: [294.03, 297.20, 307.80, 291.50, 295.01], weeklyChange: 0.33, dayChange: 1.2, sortRank: 0, periodReturns: { '1M': 5.7, 'YTD': 177.6, '6M': 163.3, '1Y': 369.6 },
      priceHistory: { '1D': [291.5, 287.96, 298.17, 301.5, 295.12, 297.54, 299.75, 301.68, 300.95, 299.1, 299.85, 300.79, 299.46, 299.61, 299.62, 299.51, 297.52, 295.97, 293.32, 293.28, 294.06, 293.17, 292.51, 295.01], '1W': [294.03, 297.2, 307.8, 291.5, 295.01], '1M': [291.97, 295.94, 288.9, 284.42, 288.12, 299.07, 299.73, 300.06, 284.87, 293.6, 283.51, 262.34, 290.5, 294.75, 303.53, 292.7, 294.03, 297.2, 307.8, 291.5, 295.01], 'YTD': [106.26, 119.94, 135.18, 142.29, 152.31, 179.6, 197.63, 178.79, 176.96, 167.67, 171.19, 167.41, 194.85, 184.68, 230.81, 229.73, 242.77, 253.49, 320.3, 308.05, 261.58, 295.94, 299.73, 283.51, 292.7, 295.01], '6M': [112.06, 117.51, 121.83, 139.99, 141.15, 146.79, 187.3, 195.02, 181.38, 177.5, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 322.05, 266.8, 291.97, 299.07, 283.51, 292.7, 295.01], '1Y': [62.82, 70.01, 70.64, 72.53, 78.32, 76.88, 75.95, 90.06, 84.7, 91.08, 85.72, 92.33, 97.11, 97.88, 105.74, 105.13, 109.92, 110.96, 136.12, 131.92, 121.07, 107.22, 104.18, 107.83, 119.95, 105.77, 112.06, 117.51, 121.83, 139.99, 141.15, 146.79, 194.74, 195.02, 181.38, 177.5, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 322.05, 266.8, 291.97, 299.07, 283.51, 292.7, 295.01] },
      velocityScore: { '1D': -0.6, '1W': -0.3, '1M': -37.7, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 57.5, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { POW: 6.53, VOLT: 7.27, PBD: false, PBW: 1.88, IVEP: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'PWR', name: 'PWR', easyScore: 3, avgWeight: 4.72, proScore: 2.83, coverage: 0.6,
      price: 699.96, weeklyPrices: [714.85, 702.25, 740.14, 702.29, 699.96], weeklyChange: -2.08, dayChange: -0.33, sortRank: 0, periodReturns: { '1M': -3.2, 'YTD': 65.8, '6M': 61.4, '1Y': 88 },
      priceHistory: { '1D': [702.29, 692.11, 701.05, 707.24, 702.41, 707.01, 707.87, 708.52, 707.32, 706.89, 706.76, 708.25, 707, 705.73, 705.53, 703.84, 700.95, 700.18, 695.95, 695.85, 697.1, 698.73, 698.64, 699.96], '1W': [714.85, 702.25, 740.14, 702.29, 699.96], '1M': [742.18, 733.62, 730.1, 711.73, 687.48, 706.06, 715.67, 719.17, 695.11, 693.81, 691.95, 650.92, 683.29, 707.74, 724.35, 719.29, 714.85, 702.25, 740.14, 702.29, 699.96], 'YTD': [422.06, 413.17, 447.64, 468.78, 483.43, 477.72, 515.88, 554, 565.05, 549.22, 566.91, 572, 573.5, 560.12, 582.06, 591.82, 613.78, 628.6, 785.24, 765.81, 714.13, 733.62, 715.67, 691.95, 719.29, 699.96], '6M': [433.58, 439.68, 422.57, 466.75, 470.77, 477.77, 514.56, 524.08, 549.11, 572.66, 568.04, 574.02, 567.45, 533.78, 555.57, 594.4, 605.89, 630.94, 771.61, 781.38, 723.03, 742.18, 706.06, 691.95, 719.29, 699.96], '1Y': [372.26, 372.29, 382.12, 389.12, 405.11, 411.11, 387.5, 391.57, 379.27, 383.92, 374.41, 390.17, 376.01, 402.87, 420.65, 443.45, 436.93, 412.21, 448.69, 453.45, 448.91, 439.29, 450.14, 456.02, 462.21, 414.25, 433.58, 439.68, 422.57, 466.75, 470.77, 477.77, 508.11, 524.08, 549.11, 572.66, 568.04, 574.02, 567.45, 533.78, 555.57, 594.4, 605.89, 630.94, 771.61, 781.38, 723.03, 742.18, 706.06, 691.95, 719.29, 699.96] },
      velocityScore: { '1D': -1, '1W': -3.4, '1M': -22.9, '6M': null }, isNew: false,
      marketCap: '$105B', pe: 95.9, revenueGrowth: 26, eps: 7.3, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.63, VOLT: 5.29, PBD: false, PBW: false, IVEP: 4.23 },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'ETN', name: 'ETN', easyScore: 3, avgWeight: 4.41, proScore: 2.65, coverage: 0.6,
      price: 403.65, weeklyPrices: [409.64, 421.77, 435.78, 405.28, 403.65], weeklyChange: -1.46, dayChange: -0.4, sortRank: 0, periodReturns: { '1M': 3.1, 'YTD': 26.7, '6M': 24.7, '1Y': 17.6 },
      priceHistory: { '1D': [405.28, 403.92, 407.81, 408.56, 408.68, 408.74, 410.14, 411.18, 409.49, 411.16, 409.32, 410.16, 408.89, 409.49, 409.75, 407.92, 407.12, 406.03, 403.19, 403.2, 402.57, 402.3, 403.4, 403.65], '1W': [409.64, 421.77, 435.78, 405.28, 403.65], '1M': [403.13, 406.37, 401.94, 400.6, 400.08, 417.62, 421.21, 418.61, 395.94, 403.14, 401.72, 375.46, 393.64, 391.39, 407.06, 407.71, 409.64, 421.77, 435.78, 405.28, 403.65], 'YTD': [318.51, 320.58, 333.46, 334.04, 354.37, 354.67, 390.33, 377.32, 374.59, 354.79, 348.64, 360.54, 375, 365.56, 400.44, 395.06, 413.87, 410.77, 421.39, 401.53, 371.88, 406.37, 421.21, 401.72, 407.71, 403.65], '6M': [323.67, 327.31, 324.51, 343.75, 332.28, 359.44, 377.06, 389.25, 362.05, 377.4, 353.87, 361.04, 359.74, 343.53, 368.85, 401.9, 409.7, 413.07, 410.86, 419, 381.87, 403.13, 417.62, 401.72, 407.71, 403.65], '1Y': [343.26, 355.04, 359.78, 362.89, 380.24, 390.09, 358.16, 363.3, 349, 352.02, 342.99, 362.25, 363.35, 372.21, 373.84, 376.7, 381.72, 360.6, 387.75, 385.44, 367.91, 338.29, 336.65, 335.57, 353.45, 315.82, 323.67, 327.31, 324.51, 343.75, 332.28, 359.44, 373.82, 389.25, 362.05, 377.4, 353.87, 361.04, 359.74, 343.53, 368.85, 401.9, 409.7, 413.07, 410.86, 419, 381.87, 403.13, 417.62, 401.72, 407.71, 403.65] },
      velocityScore: { '1D': -2.2, '1W': -0.4, '1M': -17.2, '6M': null }, isNew: false,
      marketCap: '$157B', pe: 39.5, revenueGrowth: 17, eps: 10.21, grossMargin: 37, dividendYield: 1.09,
      etfPresence: { POW: 4.13, VOLT: 5.23, PBD: false, PBW: false, IVEP: 3.88 },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CORP', easyScore: 3, avgWeight: 4.31, proScore: 2.59, coverage: 0.6,
      price: 326.71, weeklyPrices: [284.99, 328.91, 345.85, 321.98, 326.71], weeklyChange: 14.64, dayChange: 1.47, sortRank: 0, periodReturns: { '1M': 8, 'YTD': 276, '6M': 255.6, '1Y': 1323.6 },
      priceHistory: { '1D': [321.98, 320.42, 339, 332.73, 326.74, 340.6, 340.6, 345.5, 341.63, 339.8, 337.5, 339.32, 335.95, 340.77, 335.46, 333.73, 330.07, 328.39, 323, 324, 325.63, 325, 325, 326.71], '1W': [284.99, 328.91, 345.85, 321.98, 326.71], '1M': [302.4, 293.8, 290.01, 285, 273.51, 302.85, 287.32, 291.37, 263.61, 253.57, 259.61, 234.23, 248.88, 260.22, 274.5, 280.88, 284.99, 328.91, 345.85, 321.98, 326.71], 'YTD': [86.89, 121.84, 139.17, 145.63, 156.51, 136.6, 139.03, 159, 168.57, 159.99, 157.17, 156.58, 150.22, 132.45, 160.13, 213.84, 229.75, 287.97, 285.47, 280.69, 261.34, 293.8, 287.32, 259.61, 280.88, 326.71], '6M': [91.88, 98.69, 134.07, 149.5, 139.62, 156.13, 155.17, 139.74, 160.28, 166, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 283.92, 258.71, 302.4, 302.85, 259.61, 280.88, 326.71], '1Y': [22.95, 22.13, 28.71, 24.69, 26.89, 37.62, 38.86, 41.25, 43.1, 49.94, 52.45, 62.96, 79.67, 69.18, 90.19, 87.58, 116.58, 94.37, 133.71, 141.41, 127.07, 104.97, 94.29, 102.5, 101.29, 76.97, 91.88, 98.69, 134.07, 149.5, 139.62, 156.13, 143.03, 139.74, 160.28, 166, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 283.92, 258.71, 302.4, 302.85, 259.61, 280.88, 326.71] },
      velocityScore: { '1D': -3, '1W': 13.6, '1M': 3.6, '6M': null }, isNew: false,
      marketCap: '$93B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: 4.51, PBD: false, PBW: 2.67, IVEP: 5.76 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'GEV', name: 'GEV', easyScore: 3, avgWeight: 3.97, proScore: 2.38, coverage: 0.6,
      price: 1056.5, weeklyPrices: [1048.86, 1109.73, 1127.59, 1034.98, 1056.50], weeklyChange: 0.73, dayChange: 2.08, sortRank: 0, periodReturns: { '1M': 1.7, 'YTD': 61.7, '6M': 58.3, '1Y': 106.8 },
      priceHistory: { '1D': [1034.98, 1029.01, 1045.84, 1042.35, 1044.57, 1052.65, 1060.52, 1063.59, 1062.01, 1066.19, 1064.91, 1068.5, 1066.01, 1067.86, 1066.65, 1063.06, 1058.29, 1055.4, 1051.7, 1050.02, 1053.2, 1050.1, 1050.65, 1056.5], '1W': [1048.86, 1109.73, 1127.59, 1034.98, 1056.5], '1M': [1070.47, 1031.89, 996, 968.32, 950.54, 969.67, 959.36, 963.33, 933.61, 933.85, 920.15, 867.09, 906.79, 940.66, 979.07, 982.35, 1048.86, 1109.73, 1127.59, 1034.98, 1056.5], 'YTD': [653.57, 628.4, 642.23, 661.67, 717.39, 737.53, 816.56, 834.61, 876.46, 815.01, 832.11, 858.47, 923.69, 894.78, 968.02, 985.92, 1127.56, 1063.11, 1118.96, 1071.98, 1011.8, 1031.89, 959.36, 920.15, 982.35, 1056.5], '6M': [667.32, 679.55, 622.5, 681.55, 665.99, 754.97, 801.54, 802.13, 831.7, 881.18, 830.1, 827.37, 882.64, 817.35, 910.75, 987.5, 991.3, 1088.93, 1095.21, 1073.08, 1012.25, 1070.47, 969.67, 920.15, 982.35, 1056.5], '1Y': [510.84, 506, 535.77, 561.17, 629.03, 655, 664.55, 657.44, 603.13, 625.91, 577.04, 643.56, 614.79, 628.97, 606.15, 625.45, 615.95, 576, 577.97, 559.7, 576.08, 554.93, 572.56, 601.97, 723, 614.19, 667.32, 679.55, 622.5, 681.55, 665.99, 754.97, 779.35, 802.13, 831.7, 881.18, 830.1, 827.37, 882.64, 817.35, 910.75, 987.5, 991.3, 1088.93, 1095.21, 1073.08, 1012.25, 1070.47, 969.67, 920.15, 982.35, 1056.5] },
      velocityScore: { '1D': -3.3, '1W': 6.2, '1M': -13.5, '6M': null }, isNew: false,
      marketCap: '$284B', pe: 30.8, revenueGrowth: 16, eps: 34.26, grossMargin: 20, dividendYield: 0.19,
      etfPresence: { POW: 3.73, VOLT: 4.14, PBD: false, PBW: false, IVEP: 4.04 },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'NEE', name: 'NEE', easyScore: 3, avgWeight: 3.47, proScore: 2.08, coverage: 0.6,
      price: 87.13, weeklyPrices: [85.73, 86.75, 86.08, 86.43, 87.13], weeklyChange: 1.63, dayChange: 0.8, sortRank: 0, periodReturns: { '1M': -1.6, 'YTD': 8.5, '6M': 8.3, '1Y': 22 },
      priceHistory: { '1D': [86.43, 86.87, 87.08, 86.6, 86.75, 86.56, 86.67, 86.72, 86.78, 87.03, 87.2, 87.11, 87.07, 86.96, 86.93, 86.62, 86.61, 86.79, 86.71, 86.76, 86.74, 87.11, 87.04, 87.13], '1W': [85.73, 86.75, 86.08, 86.43, 87.13], '1M': [87.65, 87.65, 87.25, 87.01, 83.66, 85.68, 84.58, 85.68, 85.84, 84.01, 84.83, 85.12, 84.84, 85.99, 86.12, 86.23, 85.73, 86.75, 86.08, 86.43, 87.13], 'YTD': [80.28, 79.49, 82.19, 85.07, 88.18, 89.21, 91.93, 91.64, 91.99, 91.13, 91.73, 90.96, 91.16, 92.85, 94.48, 91.24, 90, 94.17, 95.39, 94.59, 90.06, 87.65, 84.58, 84.83, 86.23, 87.13], '6M': [80.45, 80.93, 79.89, 83.63, 85.47, 86.33, 89.48, 93.8, 94.06, 92.71, 92.01, 92.82, 90.23, 92.05, 93.67, 91.31, 90.6, 96.51, 96.28, 94.84, 89.04, 87.65, 85.68, 84.83, 86.23, 87.13], '1Y': [71.4, 73.06, 73.65, 74.77, 72.82, 70.99, 70.54, 71.86, 76.51, 74.84, 71.63, 71.04, 70.31, 73.83, 78.67, 84.04, 85.79, 82.84, 81.76, 82.14, 85.76, 84.64, 84.83, 84.95, 81.27, 80.29, 80.45, 80.93, 79.89, 83.63, 85.47, 86.33, 89.47, 93.8, 94.06, 92.71, 92.01, 92.82, 90.23, 92.05, 93.67, 91.31, 90.6, 96.51, 96.28, 94.84, 89.04, 87.65, 85.68, 84.83, 86.23, 87.13] },
      velocityScore: { '1D': 3.5, '1W': -1, '1M': -16.8, '6M': null }, isNew: false,
      marketCap: '$182B', pe: 22.1, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.88,
      etfPresence: { POW: 1.96, VOLT: 4.9, PBD: false, PBW: false, IVEP: 3.54 },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'NVT', name: 'NVT', easyScore: 3, avgWeight: 3.43, proScore: 2.06, coverage: 0.6,
      price: 167.84, weeklyPrices: [170.94, 177.02, 184.34, 168.37, 167.84], weeklyChange: -1.82, dayChange: -0.32, sortRank: 0, periodReturns: { '1M': 1.9, 'YTD': 64.6, '6M': 61.4, '1Y': 132 },
      priceHistory: { '1D': [168.37, 165.03, 168.44, 168.71, 168.53, 169.5, 170.49, 171.34, 170.9, 171.22, 170.44, 170.64, 170.36, 170.33, 169.69, 169.21, 168.6, 168.19, 167.21, 167.22, 167.61, 167.07, 167.32, 167.84], '1W': [170.94, 177.02, 184.34, 168.37, 167.84], '1M': [169.29, 167.8, 164.87, 166.99, 171.55, 173.39, 176.39, 173.88, 162.86, 163.81, 163.8, 156.79, 164.52, 165.84, 169, 167.34, 170.94, 177.02, 184.34, 168.37, 167.84], 'YTD': [101.97, 102.72, 107.98, 111.57, 115.62, 113.87, 111.9, 116.88, 121.79, 110.55, 107.87, 120.27, 127.01, 121.26, 128.63, 131.38, 140.13, 137.37, 172.49, 170.74, 158.23, 167.8, 176.39, 163.8, 167.34, 167.84], '6M': [103.97, 106.82, 105.38, 112.5, 110.58, 115.79, 114.62, 113.25, 114.93, 120.27, 108.13, 114.3, 121, 112.75, 118.92, 134.48, 137, 138.3, 169.41, 173.39, 160.69, 169.29, 173.39, 163.8, 167.34, 167.84], '1Y': [72.34, 72.16, 75.2, 74.48, 76.63, 78.72, 90.24, 91.84, 88.15, 90.84, 89.49, 94.98, 96.46, 97.27, 100.12, 98.72, 101.1, 96.93, 106.28, 112.5, 109.59, 104.31, 104.93, 104.97, 108.87, 94.99, 103.97, 106.82, 105.38, 112.5, 110.58, 115.79, 112.64, 113.25, 114.93, 120.27, 108.13, 114.3, 121, 112.75, 118.92, 134.48, 137, 138.3, 169.41, 173.39, 160.69, 169.29, 173.39, 163.8, 167.34, 167.84] },
      velocityScore: { '1D': -2.8, '1W': 2, '1M': -14.5, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 56.9, revenueGrowth: 54, eps: 2.95, grossMargin: 37, dividendYield: 0.5,
      etfPresence: { POW: 4.02, VOLT: 3.07, PBD: false, PBW: false, IVEP: 3.19 },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'HUBB', name: 'HUBB', easyScore: 3, avgWeight: 2.99, proScore: 1.79, coverage: 0.6,
      price: 514.95, weeklyPrices: [508.87, 523.69, 539.39, 509.96, 514.95], weeklyChange: 1.19, dayChange: 0.98, sortRank: 0, periodReturns: { '1M': 8.4, 'YTD': 15.9, '6M': 12.9, '1Y': 27.8 },
      priceHistory: { '1D': [509.96, 507.46, 515.54, 514.98, 515.45, 514.95, 516.42, 515.98, 515.34, 515.97, 514.01, 515.6, 515.5, 515.66, 516.25, 514.54, 513.91, 513.94, 512.32, 511.95, 513.02, 513.45, 514.55, 514.95], '1W': [508.87, 523.69, 539.39, 509.96, 514.95], '1M': [478.05, 484.25, 473.93, 473.61, 462.93, 480.46, 484.91, 485.27, 476.82, 485.03, 486.47, 467.59, 469.32, 476.89, 489.73, 502.65, 508.87, 523.69, 539.39, 509.96, 514.95], 'YTD': [444.11, 460.87, 484.11, 484.06, 497.97, 487.4, 516.02, 526.56, 524.19, 476.51, 468.41, 477.47, 503.2, 500.38, 534.67, 526.94, 549.75, 545.93, 502.34, 485.98, 461.5, 484.25, 484.91, 486.47, 502.65, 514.95], '6M': [456.28, 463.03, 470.53, 489.31, 486.82, 495.59, 506.14, 524.12, 516.99, 516.98, 487.76, 472.64, 489.07, 472.07, 499.31, 545.62, 549.11, 544.71, 507.81, 490.16, 470.87, 478.05, 480.46, 486.47, 502.65, 514.95], '1Y': [402.99, 410.51, 417.71, 418.42, 434.95, 437.44, 423.57, 432.14, 432.81, 442.52, 428.8, 442.33, 433.26, 431.16, 430.47, 419.67, 434.05, 422.63, 472.57, 468.06, 450.12, 417.28, 429.82, 429.34, 448.18, 429.68, 456.28, 463.03, 470.53, 489.31, 486.82, 495.59, 503.8, 524.12, 516.99, 516.98, 487.76, 472.64, 489.07, 472.07, 499.31, 545.62, 549.11, 544.71, 507.81, 490.16, 470.87, 478.05, 480.46, 486.47, 502.65, 514.95] },
      velocityScore: { '1D': -1.6, '1W': 1.1, '1M': -15.6, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 30.4, revenueGrowth: 11, eps: 16.93, grossMargin: 36, dividendYield: 1.11,
      etfPresence: { POW: 3.04, VOLT: 3.39, PBD: false, PBW: false, IVEP: 2.53 },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'BELFB', name: 'BELFB', easyScore: 2, avgWeight: 5.44, proScore: 2.18, coverage: 0.4,
      price: 291.96, weeklyPrices: [299.84, 296.39, 304.33, 288.64, 291.96], weeklyChange: -2.63, dayChange: 1.15, sortRank: 0, periodReturns: { '1M': 8.1, 'YTD': 72.1, '6M': 65.7, '1Y': 215.7 },
      priceHistory: { '1D': [288.64, 285.02, 287.92, 288.95, 290.89, 296.9, 299, 300.13, 298, 299.12, 299.32, 299.61, 295.53, 298.05, 296.37, 295.28, 294.67, 291.38, 291.01, 291.92, 291.21, 290.89, 291.77, 291.96], '1W': [299.84, 296.39, 304.33, 288.64, 291.96], '1M': [276.25, 280.13, 276.96, 274.52, 269.86, 269.22, 280.09, 276.54, 262.56, 279.13, 276.04, 276.95, 296.55, 293.87, 302.15, 293.22, 299.84, 296.39, 304.33, 288.64, 291.96], 'YTD': [169.63, 180.24, 196.61, 200.29, 210.44, 208, 231.48, 230.06, 232.12, 202.58, 195.18, 205.74, 220.77, 203.04, 235, 236.04, 262.68, 258.26, 286.89, 298.22, 249.71, 280.13, 280.09, 276.04, 293.22, 291.96], '6M': [176.17, 172.78, 187.43, 200.11, 205.17, 215.59, 229.32, 232.84, 231.83, 222.45, 191.81, 205.11, 214.98, 197.83, 210.32, 237.34, 257.41, 249.82, 297.17, 302.73, 258.28, 276.25, 269.22, 276.04, 293.22, 291.96], '1Y': [92.48, 95.52, 102.24, 98.77, 107.07, 125.91, 131.1, 134.66, 127.8, 139.31, 138.07, 145.68, 144.6, 142.27, 142.5, 146.89, 150.77, 148.25, 152.46, 154.86, 152.12, 144.07, 150.84, 159.74, 172.82, 164.18, 176.17, 172.78, 187.43, 200.11, 205.17, 215.59, 220.78, 232.84, 231.83, 222.45, 191.81, 205.11, 214.98, 197.83, 210.32, 237.34, 257.41, 249.82, 297.17, 302.73, 258.28, 276.25, 269.22, 276.04, 293.22, 291.96] },
      velocityScore: { '1D': -0.9, '1W': -1.8, '1M': -40.1, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 70.2, revenueGrowth: 17, eps: 4.16, grossMargin: 39, dividendYield: 0.1,
      etfPresence: { POW: 3.41, VOLT: 7.47, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 2, avgWeight: 3.26, proScore: 1.3, coverage: 0.4,
      price: 315.21, weeklyPrices: [317.58, 333.05, 357.96, 318.32, 315.21], weeklyChange: -0.75, dayChange: -0.98, sortRank: 0, periodReturns: { '1M': -3.7, 'YTD': 94.6, '6M': 88.9, '1Y': 157.7 },
      priceHistory: { '1D': [318.32, 311.91, 319.35, 320.61, 318.15, 321.43, 322.27, 322.57, 320.92, 322.14, 321.19, 322.31, 320.33, 319.77, 319.29, 317.12, 316.47, 315.47, 313.08, 313.93, 313.89, 313.73, 313.82, 315.21], '1W': [317.58, 333.05, 357.96, 318.32, 315.21], '1M': [323.91, 319.78, 314.18, 315.71, 323.39, 334.49, 331.44, 323.92, 300.51, 300.57, 289.52, 280.98, 297.88, 302.87, 311.93, 299.6, 317.58, 333.05, 357.96, 318.32, 315.21], 'YTD': [162.01, 160.78, 172.54, 181.12, 195.1, 177.75, 236.51, 243.06, 259.23, 249.75, 265.38, 264.71, 276.16, 259.37, 287.64, 301.16, 305.14, 306.18, 358.92, 367.13, 322.63, 319.78, 331.44, 289.52, 299.6, 315.21], '6M': [166.87, 175.61, 163.58, 176.93, 181.23, 190.01, 202, 234.53, 245.42, 257.75, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.92, 339.73, 323.91, 334.49, 289.52, 299.6, 315.21], '1Y': [122.32, 122.54, 128.37, 125.4, 130.19, 144.17, 139.75, 143.72, 129.05, 127.93, 125.59, 136.74, 136.83, 141.62, 161.59, 167.38, 180.51, 171.59, 199.27, 190.71, 179.05, 164.86, 169.57, 178.88, 181.82, 149.83, 166.87, 175.61, 163.58, 176.93, 181.23, 190.01, 195.58, 234.53, 245.42, 257.75, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.92, 339.73, 323.91, 334.49, 289.52, 299.6, 315.21] },
      velocityScore: { '1D': -7.8, '1W': 4.8, '1M': -24, '6M': null }, isNew: false,
      marketCap: '$121B', pe: 79.2, revenueGrowth: 30, eps: 3.98, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 2.46, PBD: false, PBW: false, IVEP: 4.06 },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'AEP', name: 'AEP', easyScore: 2, avgWeight: 2.79, proScore: 1.12, coverage: 0.4,
      price: 133.89, weeklyPrices: [128.27, 127.69, 130.30, 133.74, 133.89], weeklyChange: 4.38, dayChange: 0.11, sortRank: 0, periodReturns: { '1M': 1.7, 'YTD': 16.1, '6M': 16.1, '1Y': 29.6 },
      priceHistory: { '1D': [133.74, 134.62, 134.32, 133.97, 133.74, 133.32, 133.6, 133.82, 133.64, 133.82, 133.97, 133.8, 133.72, 133.43, 133.6, 133.18, 133.11, 133.27, 133.07, 133.19, 133.37, 133.72, 133.77, 133.89], '1W': [128.27, 127.69, 130.3, 133.74, 133.89], '1M': [130.9, 129.57, 127.76, 126.67, 123.79, 127.11, 126.31, 127.79, 129.14, 126.77, 127.76, 128.53, 128.48, 129.23, 129.31, 129.75, 128.27, 127.69, 130.3, 133.74, 133.89], 'YTD': [115.31, 115.93, 119.4, 117.18, 119.21, 120.61, 126.43, 128.42, 132.1, 132.04, 132.22, 130.97, 128.3, 131.67, 137.15, 134.39, 131.62, 134.44, 132.56, 131.94, 128.92, 129.57, 126.31, 127.76, 129.75, 133.89], '6M': [115.31, 115.81, 116.91, 119.96, 118.02, 118.33, 121.1, 129.94, 132.03, 133.29, 131.86, 134.15, 127.92, 131.12, 132.92, 135.46, 131.89, 135.59, 137.04, 130.7, 127.68, 130.9, 127.11, 127.76, 129.75, 133.89], '1Y': [103.28, 104.39, 104.74, 105.49, 108.89, 113.25, 113.49, 111.99, 112.66, 112.63, 110.03, 108.34, 107.52, 108.88, 112.75, 118.19, 118.53, 117.27, 122.11, 119.76, 122.73, 123.51, 121.58, 118.06, 114.16, 114.71, 115.31, 115.81, 116.91, 119.96, 118.02, 118.33, 120.8, 129.94, 132.03, 133.29, 131.86, 134.15, 127.92, 131.12, 132.92, 135.46, 131.89, 135.59, 137.04, 130.7, 127.68, 130.9, 127.11, 127.76, 129.75, 133.89] },
      velocityScore: { '1D': 4.7, '1W': 0.9, '1M': -44.3, '6M': null }, isNew: false,
      marketCap: '$73B', pe: 19.8, revenueGrowth: 10, eps: 6.75, grossMargin: 47, dividendYield: 2.84,
      etfPresence: { POW: 1.33, VOLT: 4.26, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 2.62, proScore: 1.05, coverage: 0.4,
      price: 75.49, weeklyPrices: [71.25, 73.12, 74.95, 75.79, 75.49], weeklyChange: 5.95, dayChange: -0.4, sortRank: 0, periodReturns: { '1M': -3.8, 'YTD': 25.6, '6M': 27, '1Y': 23.5 },
      priceHistory: { '1D': [75.79, 74.87, 75.2, 75.14, 75.13, 75.32, 75.44, 75.43, 75.37, 75.38, 75.67, 75.4, 75.29, 75.16, 75.31, 75.46, 75.44, 75.49, 75.26, 75.04, 75.17, 75.37, 75.42, 75.49], '1W': [71.25, 73.12, 74.95, 75.79, 75.49], '1M': [76.34, 74.37, 73.13, 71.39, 70.04, 71.31, 71.66, 72.43, 71.96, 71.59, 71.59, 72.26, 71.62, 72.08, 71.49, 71.48, 71.25, 73.12, 74.95, 75.79, 75.49], 'YTD': [60.11, 61.15, 60.29, 63.72, 67.24, 67.42, 71.13, 72.17, 74.77, 74.77, 73.52, 72.8, 73.81, 71.83, 72.82, 70.76, 71.1, 73.32, 73.76, 74.73, 79.4, 74.37, 71.66, 71.59, 71.48, 75.49], '6M': [59.46, 60.85, 60.32, 61.55, 64.29, 66.34, 67.85, 72.28, 72.98, 76.26, 73.18, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 76.12, 74.18, 77.69, 76.34, 71.31, 71.59, 71.48, 75.49], '1Y': [61.12, 58.72, 57.85, 58.48, 57.71, 59.24, 58.64, 57.76, 56.57, 57.13, 57.73, 58.76, 59.02, 62.86, 63.69, 63.5, 63.78, 62.16, 56.98, 57.54, 60.6, 59.17, 59.37, 61.55, 60.5, 58.84, 59.46, 60.85, 60.32, 61.55, 64.29, 66.34, 66.92, 72.28, 72.98, 76.26, 73.18, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 76.12, 74.18, 77.69, 76.34, 71.31, 71.59, 71.48, 75.49] },
      velocityScore: { '1D': 5, '1W': 5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$92B', pe: 33.1, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.77,
      etfPresence: { POW: false, VOLT: 1.54, PBD: false, PBW: false, IVEP: 3.7 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'JCI', name: 'JOHNSON CONTROLS INTERNATIONAL PLC', easyScore: 2, avgWeight: 2.43, proScore: 0.97, coverage: 0.4,
      price: 142.61, weeklyPrices: [143.62, 144.82, 148.21, 141.28, 142.61], weeklyChange: -0.7, dayChange: 0.94, sortRank: 0, periodReturns: { '1M': 3.1, 'YTD': 19.1, '6M': 17.5, '1Y': 37.7 },
      priceHistory: { '1D': [141.28, 140.99, 142.06, 142.61, 143.11, 142.79, 143.77, 143.99, 143.9, 144.31, 143.43, 143.68, 143.37, 143.18, 143.44, 143.08, 143.04, 142.94, 142.5, 142.45, 142.82, 142.48, 142.57, 142.61], '1W': [143.62, 144.82, 148.21, 141.28, 142.61], '1M': [140.22, 138.2, 136.15, 134.06, 133.91, 141.99, 146.96, 147.4, 143.65, 144.05, 147.75, 139.36, 144.01, 144.96, 146.06, 145.17, 143.62, 144.82, 148.21, 141.28, 142.61], 'YTD': [119.75, 111.29, 112.95, 114.51, 120.28, 132.52, 138.57, 142.7, 143.42, 137.18, 130.94, 133.76, 137.48, 134.72, 141.85, 137.21, 139.81, 141.35, 143.14, 141.04, 135.42, 138.2, 146.96, 147.75, 145.17, 142.61], '6M': [121.39, 122.31, 110.85, 114.61, 115.07, 122.98, 139, 139.24, 142.83, 145.46, 133.09, 131.69, 133.27, 126.58, 133.15, 142.05, 139.72, 141.59, 144.82, 141.78, 137.31, 140.22, 141.99, 147.75, 145.17, 142.61], '1Y': [103.6, 104.67, 106.5, 107.28, 110.13, 104.02, 104.67, 106.64, 104.52, 108.46, 105.34, 107.8, 107.41, 106.54, 108.89, 108.43, 110.82, 108.54, 113.34, 120.86, 121.94, 114.44, 114.65, 114.22, 115.81, 116.38, 121.39, 122.31, 110.85, 114.61, 115.07, 122.98, 137.65, 139.24, 142.83, 145.46, 133.09, 131.69, 133.27, 126.58, 133.15, 142.05, 139.72, 141.59, 144.82, 141.78, 137.31, 140.22, 141.99, 147.75, 145.17, 142.61] },
      velocityScore: { '1D': -1, '1W': -4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$87B', pe: 43.7, revenueGrowth: 8, eps: 3.26, grossMargin: 37, dividendYield: 1.13,
      etfPresence: { POW: false, VOLT: 1.38, PBD: false, PBW: false, IVEP: 3.48 },
      tonyNote: 'JOHNSON CONTROLS INTERNATIONAL PLC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CEG', name: 'CEG', easyScore: 2, avgWeight: 2.39, proScore: 0.96, coverage: 0.4,
      price: 269.42, weeklyPrices: [267.17, 274.06, 275.53, 270.26, 269.42], weeklyChange: 0.84, dayChange: -0.31, sortRank: 0, periodReturns: { '1M': -8.4, 'YTD': -23.7, '6M': -26, '1Y': -16 },
      priceHistory: { '1D': [270.26, 270.27, 272.1, 270.02, 270.47, 270.85, 272.77, 273.45, 272.21, 273.32, 272.59, 272.4, 272.36, 271.97, 272.11, 271.58, 270.95, 269.99, 268.2, 268.22, 267.96, 269.11, 269.36, 269.42], '1W': [267.17, 274.06, 275.53, 270.26, 269.42], '1M': [301.57, 288.68, 286.31, 287.75, 265.7, 272.65, 267.24, 264.59, 254.83, 250.67, 251.65, 242.3, 246.71, 253.76, 262.35, 268, 267.17, 274.06, 275.53, 270.26, 269.42], 'YTD': [353.27, 322.54, 341.2, 287.35, 287.45, 247.06, 276.12, 291.66, 323.56, 332.07, 301.55, 317.22, 303.32, 279.46, 280.25, 294.73, 287.16, 297, 322.78, 293.6, 260.67, 288.68, 267.24, 251.65, 268, 269.42], '6M': [363.95, 366.25, 342.52, 307.71, 285.27, 270.88, 272.15, 288.43, 293.8, 327.16, 322.99, 305.58, 289.76, 298.61, 272.58, 296.61, 277.7, 305.71, 320.42, 299.69, 262, 301.57, 272.65, 251.65, 268, 269.42], '1Y': [320.66, 307.92, 317.11, 308.2, 323.7, 345.27, 338.46, 338.57, 317.23, 316.58, 308.48, 320, 321.27, 339.13, 350.9, 371, 403.95, 350.06, 401.43, 363.25, 351.67, 339.35, 351.6, 361.26, 362.07, 340.97, 363.95, 366.25, 342.52, 307.71, 285.27, 270.88, 261.42, 288.43, 293.8, 327.16, 322.99, 305.58, 289.76, 298.61, 272.58, 296.61, 277.7, 305.71, 320.42, 299.69, 262, 301.57, 272.65, 251.65, 268, 269.42] },
      velocityScore: { '1D': 2.1, '1W': 1.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$96B', pe: 23.4, revenueGrowth: 64, eps: 11.51, grossMargin: 23, dividendYield: 0.63,
      etfPresence: { POW: 1.38, VOLT: false, PBD: false, PBW: false, IVEP: 3.41 },
      tonyNote: 'CEG appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX TECHNOLOGIES INC', easyScore: 2, avgWeight: 2.22, proScore: 0.89, coverage: 0.4,
      price: 208.56, weeklyPrices: [203.07, 205.40, 210.00, 209.89, 208.56], weeklyChange: 2.71, dayChange: -0.63, sortRank: 0, periodReturns: { '1M': 2.8, 'YTD': 20.7, '6M': 17.7, '1Y': 46.6 },
      priceHistory: { '1D': [209.89, 208.01, 210.06, 210.34, 208.94, 209.95, 209.1, 210.6, 210.38, 209.75, 209.58, 209.49, 210.33, 210.34, 209.79, 209.56, 209.33, 208.8, 208.1, 207.75, 207.48, 207.55, 207.4, 208.56], '1W': [203.07, 205.4, 210, 209.89, 208.56], '1M': [204.38, 198.95, 199.27, 195.88, 188.39, 187.26, 184.72, 190.76, 185.95, 187.46, 188.96, 183, 194.68, 193.45, 193.94, 196.93, 203.07, 205.4, 210, 209.89, 208.56], 'YTD': [172.84, 193.2, 213.25, 206.33, 210.18, 187.42, 196.9, 209.07, 207.24, 195.5, 197.82, 208.98, 222.13, 212.81, 230.29, 238.42, 219.1, 208.08, 215.2, 206.83, 197.33, 198.95, 184.72, 188.96, 196.93, 208.56], '6M': [177.18, 181.85, 201.46, 217.89, 206.04, 206.04, 203, 200.4, 198.38, 216.47, 200.39, 204.67, 204.85, 191.59, 214.44, 238.27, 216.66, 216.18, 206.15, 210.8, 201.94, 204.38, 187.26, 188.96, 196.93, 208.56], '1Y': [142.31, 140.37, 137.56, 139.85, 143.37, 152.38, 179.74, 179.51, 165.76, 166.52, 160.95, 166.13, 168.38, 175.02, 187.18, 197.01, 203.82, 191.17, 213.69, 198.12, 195.65, 175.91, 175.26, 174.71, 179.65, 168.12, 177.18, 181.85, 201.46, 217.89, 206.04, 206.04, 197.19, 200.4, 198.38, 216.47, 200.39, 204.67, 204.85, 191.59, 214.44, 238.27, 216.66, 216.18, 206.15, 210.8, 201.94, 204.38, 187.26, 188.96, 196.93, 208.56] },
      velocityScore: { '1D': 3.5, '1W': 6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 55.5, revenueGrowth: 26, eps: 3.76, grossMargin: 23, dividendYield: 0.5,
      etfPresence: { POW: false, VOLT: 2.17, PBD: false, PBW: false, IVEP: 2.27 },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'XEL', name: 'XEL', easyScore: 2, avgWeight: 1.9, proScore: 0.76, coverage: 0.4,
      price: 81.05, weeklyPrices: [77.46, 77.41, 78.81, 80.33, 81.05], weeklyChange: 4.63, dayChange: 0.9, sortRank: 0, periodReturns: { '1M': 0, 'YTD': 9.7, '6M': 9.4, '1Y': 18.8 },
      priceHistory: { '1D': [80.33, 81.18, 81.03, 80.9, 80.79, 80.6, 80.67, 80.78, 80.65, 80.81, 80.9, 80.85, 80.91, 80.82, 80.73, 80.43, 80.37, 80.54, 80.46, 80.49, 80.64, 80.88, 80.96, 81.05], '1W': [77.46, 77.41, 78.81, 80.33, 81.05], '1M': [80.78, 81, 79.26, 79.5, 76.41, 77.87, 77.39, 77.77, 79.04, 77.62, 77.87, 78.1, 78.27, 79.22, 79.35, 78.98, 77.46, 77.41, 78.81, 80.33, 81.05], 'YTD': [73.86, 73.38, 75.36, 75.86, 75.97, 76.12, 78.98, 80.82, 83.47, 82.38, 80.82, 80.02, 77.7, 79.71, 82.77, 78.65, 78.11, 78.82, 80.55, 79.9, 79.73, 81, 77.39, 77.87, 78.98, 81.05], '6M': [74.09, 74.68, 74.26, 75.61, 75.73, 74.5, 76.43, 81.59, 83.35, 83.8, 82.1, 81.63, 76.95, 79.17, 80.54, 79.83, 79.08, 79.48, 81.45, 80.6, 78.1, 80.78, 77.87, 77.87, 78.98, 81.05], '1Y': [68.23, 68.71, 67.84, 69.17, 72.5, 72.39, 73.3, 72.39, 73.22, 72.54, 72.43, 72.31, 72.05, 77.93, 80.31, 81.85, 81.8, 80.69, 79.69, 81.19, 81.16, 81, 80.39, 78.39, 74.62, 73.14, 74.09, 74.68, 74.26, 75.61, 75.73, 74.5, 75.9, 81.59, 83.35, 83.8, 82.1, 81.63, 76.95, 79.17, 80.54, 79.83, 79.08, 79.48, 81.45, 80.6, 78.1, 80.78, 77.87, 77.87, 78.98, 81.05] },
      velocityScore: { '1D': 2.7, '1W': -1.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$51B', pe: 23.4, revenueGrowth: 3, eps: 3.47, grossMargin: 46, dividendYield: 2.95,
      etfPresence: { POW: 1.88, VOLT: 1.92, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'XEL appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 1.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NRG', name: 'NRG ENERGY INC', easyScore: 2, avgWeight: 1.65, proScore: 0.66, coverage: 0.4,
      price: 141.82, weeklyPrices: [132.13, 135.06, 138.91, 137.66, 141.82], weeklyChange: 7.33, dayChange: 3.02, sortRank: 0, periodReturns: { '1M': 3, 'YTD': -10.9, '6M': -11.7, '1Y': -7.7 },
      priceHistory: { '1D': [137.66, 137.67, 138.93, 139.79, 139.93, 140.61, 140.63, 141.1, 140.41, 141.33, 141.29, 141.72, 141.82, 141.72, 142.71, 142.7, 142.74, 141.79, 140.74, 140.91, 140.82, 141.57, 141.65, 141.82], '1W': [132.13, 135.06, 138.91, 137.66, 141.82], '1M': [140.43, 138, 137.5, 134.08, 129.47, 133.51, 133.76, 133.39, 129.2, 127.71, 129.96, 120.65, 123.7, 125.47, 130.4, 132.1, 132.13, 135.06, 138.91, 137.66, 141.82], 'YTD': [159.24, 143.53, 158.5, 151.09, 153.72, 144.44, 161.8, 175.01, 181.34, 160.46, 152.1, 159.11, 151.04, 149.9, 161.78, 168.45, 149.6, 149.01, 150.64, 137.34, 123.71, 138, 133.76, 129.96, 132.1, 141.82], '6M': [160.56, 166.16, 149.27, 152.05, 149.93, 149.11, 155.72, 172.35, 176.52, 175.58, 155.42, 152.48, 151.77, 141.23, 153.06, 170.96, 149.86, 154.81, 157.43, 137.3, 125.5, 140.43, 133.51, 129.96, 132.1, 141.82], '1Y': [153.68, 155.96, 150.27, 144.96, 160.55, 166.59, 148.56, 156.69, 148.38, 146.23, 146.91, 161.21, 164.58, 165.58, 161.91, 167.52, 171.33, 160.42, 178.5, 173.19, 162.84, 166.45, 163.81, 166.77, 168.16, 149.48, 160.56, 166.16, 149.27, 152.05, 149.93, 149.11, 153.32, 172.35, 176.52, 175.58, 155.42, 152.48, 151.77, 141.23, 153.06, 170.96, 149.86, 154.81, 157.43, 137.3, 125.5, 140.43, 133.51, 129.96, 132.1, 141.82] },
      velocityScore: { '1D': 3.1, '1W': -10.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$30B', pe: 155.8, revenueGrowth: 20, eps: 0.91, grossMargin: 16, dividendYield: 1.38,
      etfPresence: { POW: false, VOLT: 0.98, PBD: false, PBW: false, IVEP: 2.32 },
      tonyNote: 'NRG ENERGY INC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 1.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SHLS', name: 'Shoals Technologies Group Inc', easyScore: 2, avgWeight: 1.54, proScore: 0.62, coverage: 0.4,
      price: 10.23, weeklyPrices: [9.44, 10.42, 10.94, 10.28, 10.23], weeklyChange: 8.37, dayChange: -0.49, sortRank: 0, periodReturns: { '1M': 3.2, 'YTD': 20.4, '6M': 11.3, '1Y': 104.6 },
      priceHistory: { '1D': [10.28, 10.22, 10.37, 10.36, 10.31, 10.46, 10.5, 10.5, 10.43, 10.42, 10.41, 10.42, 10.4, 10.44, 10.35, 10.27, 10.23, 10.34, 10.31, 10.31, 10.32, 10.23, 10.21, 10.23], '1W': [9.44, 10.42, 10.94, 10.28, 10.23], '1M': [10.82, 12.12, 12.2, 12.45, 12.18, 12.46, 12.39, 12.77, 10.81, 10.88, 9.63, 9.25, 9.89, 10.43, 10.3, 9.96, 9.44, 10.42, 10.94, 10.28, 10.23], 'YTD': [8.5, 8.6, 9.37, 9.66, 10.02, 9.65, 9.66, 10.19, 6.35, 5.85, 6.12, 5.95, 6.91, 6.9, 6.97, 7.23, 7.5, 7.34, 8.33, 8.63, 9.28, 12.12, 12.39, 9.63, 9.96, 10.23], '6M': [9.19, 9.09, 8.66, 9.27, 9.27, 9.32, 10.4, 10.24, 9.9, 5.96, 5.75, 6.2, 6.24, 6.25, 6.41, 7.22, 6.87, 7.65, 8.13, 9.32, 9.66, 10.82, 12.46, 9.63, 9.96, 10.23], '1Y': [5, 5.26, 5.74, 5.81, 5.81, 5.39, 4.62, 4.62, 6.13, 6.84, 6.78, 6.88, 7.23, 7.7, 7.93, 8.84, 10.85, 9.94, 10.62, 9.33, 8.93, 7.98, 8.12, 7.61, 8.6, 8.42, 9.19, 9.09, 8.66, 9.27, 9.27, 9.32, 10.29, 10.24, 9.9, 5.96, 5.75, 6.2, 6.24, 6.25, 6.41, 7.22, 6.87, 7.65, 8.13, 9.32, 9.66, 10.82, 12.46, 9.63, 9.96, 10.23] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2B', pe: 51.1, revenueGrowth: 75, eps: 0.2, grossMargin: 33, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: 1.11, PBW: 1.98, IVEP: false },
      tonyNote: 'Shoals Technologies Group Inc appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 1.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VICR', name: 'VICR', easyScore: 1, avgWeight: 5.7, proScore: 1.14, coverage: 0.2,
      price: 321.98, weeklyPrices: [325.17, 331.37, 365.53, 336.12, 321.98], weeklyChange: -0.98, dayChange: -4.21, sortRank: 0, periodReturns: { '1M': 20.1, 'YTD': 193.8, '6M': 196.9, '1Y': 609.4 },
      priceHistory: { '1D': [336.12, 322.99, 330.15, 333.21, 328.27, 336, 336.01, 340.8, 335.37, 335.58, 333.22, 334.89, 332.51, 333.94, 331.23, 331.43, 329.94, 326.81, 321.61, 319.38, 322.73, 321.86, 320.33, 321.98], '1W': [325.17, 331.37, 365.53, 336.12, 321.98], '1M': [332.95, 345.84, 342.09, 334.84, 328.85, 332.95, 330.48, 306.12, 271.04, 274.97, 283.48, 275.51, 298.06, 303.77, 322.41, 320.46, 325.17, 331.37, 365.53, 336.12, 321.98], 'YTD': [109.6, 136.11, 145.48, 166.78, 171.53, 148.19, 164.29, 152.84, 205.64, 181.92, 167.81, 191.84, 186, 158.16, 184.92, 194.2, 265, 256.7, 280.34, 292.53, 243.43, 345.84, 330.48, 283.48, 320.46, 321.98], '6M': [108.46, 116.86, 142.31, 149.88, 158.46, 165.35, 159.04, 155.96, 171.8, 209.19, 170.03, 185.42, 173.07, 142.22, 159.83, 190.1, 246.24, 248.7, 266.01, 312.96, 249.02, 332.95, 332.95, 283.48, 320.46, 321.98], '1Y': [45.39, 45.34, 46.72, 47.32, 52.68, 45.81, 46.13, 48.43, 47.24, 51.51, 50.51, 50.09, 52.21, 52.81, 49.31, 51.5, 57.31, 85.76, 91.17, 94.88, 92.58, 84.66, 88.15, 92.82, 100.83, 97.19, 108.46, 116.86, 142.31, 149.88, 158.46, 165.35, 159.87, 155.96, 171.8, 209.19, 170.03, 185.42, 173.07, 142.22, 159.83, 190.1, 246.24, 248.7, 266.01, 312.96, 249.02, 332.95, 332.95, 283.48, 320.46, 321.98] },
      velocityScore: { '1D': 0, '1W': null, '1M': -50.6, '6M': null }, isNew: false,
      marketCap: '$15B', pe: 107.7, revenueGrowth: 20, eps: 2.99, grossMargin: 54, dividendYield: null,
      etfPresence: { POW: 5.7, VOLT: false, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Vicor Corp is a power conversion specialist — high-efficiency modules for AI server power delivery. It holds a niche position in Industrials ETFs on the data center power density thesis. Revenue growth has been lumpy, but when AI GPU clusters require Vicor\'s factorized power architecture, the order cycles are large.',
    },
    {
      ticker: 'AEIS', name: 'ADVANCED ENERGY INDUSTRIES INC', easyScore: 1, avgWeight: 4.5, proScore: 0.9, coverage: 0.2,
      price: 358.94, weeklyPrices: [353.32, 372.59, 388.23, 364.96, 358.94], weeklyChange: 1.59, dayChange: -1.65, sortRank: 0, periodReturns: { '1M': 10.5, 'YTD': 71.4, '6M': 65.2, '1Y': 170.9 },
      priceHistory: { '1D': [364.96, 356.8, 361.79, 363.35, 364.15, 367.88, 368.1, 370.66, 369.17, 367.82, 367.32, 367.35, 365.91, 365.21, 364.05, 364.2, 362, 360, 357.32, 357.74, 357.7, 356.91, 357.76, 358.94], '1W': [353.32, 372.59, 388.23, 364.96, 358.94], '1M': [339.65, 328.34, 317.08, 302.18, 294.65, 312.28, 322.5, 320.92, 294.81, 306.11, 311.64, 308.17, 340.4, 354.37, 370.66, 350.45, 353.32, 372.59, 388.23, 364.96, 358.94], 'YTD': [209.37, 210.99, 257.29, 275.57, 269.12, 257.64, 312.95, 320.64, 337.35, 311.42, 305.82, 319.63, 342.87, 332.82, 374.98, 374.32, 377.19, 361.39, 360.81, 339.42, 302.84, 328.34, 322.5, 311.64, 350.45, 358.94], '6M': [217.23, 221.99, 219.59, 253.86, 263.03, 261.82, 279.17, 314.27, 329.24, 340.42, 305.02, 308.31, 329.78, 298.29, 339.32, 385.73, 385, 369.08, 345.63, 354.97, 309.06, 339.65, 312.28, 311.64, 350.45, 358.94], '1Y': [132.51, 133.59, 141.13, 139.42, 142.84, 144.07, 139.81, 158.81, 150.41, 154.44, 145.25, 157.25, 157.79, 170.77, 176.2, 174.92, 189.96, 190.46, 208.05, 225.8, 215.98, 199.22, 205.92, 213.44, 221.47, 204.49, 217.23, 221.99, 219.59, 253.86, 263.03, 261.82, 273.26, 314.27, 329.24, 340.42, 305.02, 308.31, 329.78, 298.29, 339.32, 385.73, 385, 369.08, 345.63, 354.97, 309.06, 339.65, 312.28, 311.64, 350.45, 358.94] },
      velocityScore: { '1D': -2.2, '1W': -17.4, '1M': -50, '6M': null }, isNew: false,
      marketCap: '$14B', pe: 74.5, revenueGrowth: 26, eps: 4.82, grossMargin: 39, dividendYield: 0.11,
      etfPresence: { POW: false, VOLT: 4.5, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 5.53, proScore: 2.21, coverage: 0.4,
      price: 871.38, weeklyPrices: [838.21, 861.88, 932.75, 892.25, 871.38], weeklyChange: 3.96, dayChange: -2.34, sortRank: 0, periodReturns: { '1M': 18.9, 'YTD': 184.6, '6M': 177.5, '1Y': 279.9 },
      priceHistory: { '1D': [892.25, 884.78, 908.48, 915.76, 900.98, 908, 912.1, 919.64, 911.38, 909.42, 903.08, 903.71, 898.15, 895.21, 893.2, 886.49, 877.46, 871.62, 866, 864.14, 868.28, 869.54, 865.13, 871.38], '1W': [838.21, 861.88, 932.75, 892.25, 871.38], '1M': [783.53, 782.12, 842.96, 860.84, 845.39, 875.52, 957.03, 993.74, 882.43, 891.86, 842.01, 770.25, 838.55, 858.99, 866.67, 857.76, 838.21, 861.88, 932.75, 892.25, 871.38], 'YTD': [306.23, 297.62, 336.31, 364.25, 379.23, 365.07, 431.43, 415.13, 433.34, 398.87, 404.59, 421.23, 452.92, 421.29, 435.65, 456.08, 487.87, 469.75, 886.22, 851.35, 728.29, 782.12, 957.03, 842.01, 857.76, 871.38], '6M': [314, 319.16, 308.13, 350.96, 361.21, 367.95, 418.61, 437.77, 434.64, 432.87, 411.38, 417.76, 422.55, 382.55, 382.22, 464.54, 472.84, 471.85, 806, 868.18, 770.76, 783.53, 875.52, 842.01, 857.76, 871.38], '1Y': [229.38, 222.54, 233.39, 243.23, 253.14, 263.35, 299.42, 308.4, 276.02, 292.95, 273.82, 301.13, 320.94, 344.05, 337.93, 366.99, 365.39, 332.75, 403.35, 411.07, 381.22, 333.88, 332.96, 323.46, 331.61, 283.57, 314, 319.16, 308.13, 350.96, 361.21, 367.95, 401.29, 437.77, 434.64, 432.87, 411.38, 417.76, 422.55, 382.55, 382.22, 464.54, 472.84, 471.85, 806, 868.18, 770.76, 783.53, 875.52, 842.01, 857.76, 871.38] },
      velocityScore: { '1D': -1.3, '1W': 3.3, '1M': -53.4, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 78.2, revenueGrowth: 92, eps: 11.15, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 6.55, PRN: 4.5, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 5.16, proScore: 2.06, coverage: 0.4,
      price: 983.89, weeklyPrices: [955.92, 985.82, 1022.28, 984.24, 983.89], weeklyChange: 2.93, dayChange: -0.04, sortRank: 0, periodReturns: { '1M': 11.8, 'YTD': 71.7, '6M': 68.5, '1Y': 163.8 },
      priceHistory: { '1D': [984.24, 974.52, 986.46, 992.35, 988.47, 992.8, 998.63, 1001.01, 998.43, 1002.78, 1001.02, 1002.41, 999.04, 1001.84, 1000.59, 998.48, 993.83, 989.83, 980.02, 980.2, 982.38, 980.69, 981.81, 983.89], '1W': [955.92, 985.82, 1022.28, 984.24, 983.89], '1M': [908.55, 909.93, 887.67, 875.87, 865.36, 909.81, 926.18, 940.48, 904.28, 915.64, 914.7, 856.16, 897.63, 910.57, 933.93, 945.46, 955.92, 985.82, 1022.28, 984.24, 983.89], 'YTD': [572.87, 608.13, 647.18, 648.41, 665.24, 678.31, 758.29, 760.53, 752.93, 706.08, 700.69, 693.62, 719.04, 730.32, 787.07, 770.17, 808.87, 810.05, 926.93, 912.14, 860.15, 909.93, 926.18, 914.7, 945.46, 983.89], '6M': [583.76, 598.41, 617.62, 646.89, 635.92, 690.91, 742.12, 774.2, 756.47, 752.32, 704.82, 699.78, 701.7, 667.43, 724.44, 794.25, 800.45, 817.87, 904.59, 926.79, 863.95, 908.55, 909.81, 914.7, 945.46, 983.89], '1Y': [373.02, 390.92, 402.18, 412.88, 427.59, 434.12, 427.72, 412.71, 416.09, 431.26, 415.12, 422.91, 450.66, 469.79, 480.82, 502.12, 534.05, 513.91, 585.49, 569.15, 567.93, 546.88, 566.61, 591.49, 615.35, 561.89, 583.76, 598.41, 617.62, 646.89, 635.92, 690.91, 726.2, 774.2, 756.47, 752.32, 704.82, 699.78, 701.7, 667.43, 724.44, 794.25, 800.45, 817.87, 904.59, 926.79, 863.95, 908.55, 909.81, 914.7, 945.46, 983.89] },
      velocityScore: { '1D': -0.5, '1W': 3, '1M': -10, '6M': null }, isNew: false,
      marketCap: '$453B', pe: 49, revenueGrowth: 22, eps: 20.08, grossMargin: 29, dividendYield: 0.66,
      etfPresence: { AIRR: false, PRN: 3.43, RSHO: 6.89, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 4.96, proScore: 1.99, coverage: 0.4,
      price: 295.01, weeklyPrices: [294.03, 297.20, 307.80, 291.50, 295.01], weeklyChange: 0.33, dayChange: 1.2, sortRank: 0, periodReturns: { '1M': 5.7, 'YTD': 177.6, '6M': 163.3, '1Y': 369.6 },
      priceHistory: { '1D': [291.5, 287.96, 298.17, 301.5, 295.12, 297.54, 299.75, 301.68, 300.95, 299.1, 299.85, 300.79, 299.46, 299.61, 299.62, 299.51, 297.52, 295.97, 293.32, 293.28, 294.06, 293.17, 292.51, 295.01], '1W': [294.03, 297.2, 307.8, 291.5, 295.01], '1M': [291.97, 295.94, 288.9, 284.42, 288.12, 299.07, 299.73, 300.06, 284.87, 293.6, 283.51, 262.34, 290.5, 294.75, 303.53, 292.7, 294.03, 297.2, 307.8, 291.5, 295.01], 'YTD': [106.26, 119.94, 135.18, 142.29, 152.31, 179.6, 197.63, 178.79, 176.96, 167.67, 171.19, 167.41, 194.85, 184.68, 230.81, 229.73, 242.77, 253.49, 320.3, 308.05, 261.58, 295.94, 299.73, 283.51, 292.7, 295.01], '6M': [112.06, 117.51, 121.83, 139.99, 141.15, 146.79, 187.3, 195.02, 181.38, 177.5, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 322.05, 266.8, 291.97, 299.07, 283.51, 292.7, 295.01], '1Y': [62.82, 70.01, 70.64, 72.53, 78.32, 76.88, 75.95, 90.06, 84.7, 91.08, 85.72, 92.33, 97.11, 97.88, 105.74, 105.13, 109.92, 110.96, 136.12, 131.92, 121.07, 107.22, 104.18, 107.83, 119.95, 105.77, 112.06, 117.51, 121.83, 139.99, 141.15, 146.79, 194.74, 195.02, 181.38, 177.5, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 322.05, 266.8, 291.97, 299.07, 283.51, 292.7, 295.01] },
      velocityScore: { '1D': -0.5, '1W': -4.8, '1M': 9.3, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 57.5, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { AIRR: 2.6, PRN: false, RSHO: 7.33, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, avgWeight: 4.57, proScore: 1.83, coverage: 0.4,
      price: 735.25, weeklyPrices: [719.52, 738.85, 790.00, 736.77, 735.25], weeklyChange: 2.19, dayChange: -0.21, sortRank: 0, periodReturns: { '1M': 12, 'YTD': 134.7, '6M': 124, '1Y': 242.6 },
      priceHistory: { '1D': [736.77, 721.7, 736.38, 744.61, 730.95, 738.13, 744.99, 746.17, 742.3, 739.92, 740, 742.9, 745.94, 748.56, 748.25, 746.56, 743.72, 739.22, 734.72, 735.77, 737.12, 731.47, 731.47, 735.25], '1W': [719.52, 738.85, 790, 736.77, 735.25], '1M': [670.66, 673.51, 677.45, 667.02, 646.89, 663.14, 686.37, 689.43, 694.72, 619.98, 613.93, 588.9, 623.66, 641.68, 688.87, 690.39, 719.52, 738.85, 790, 736.77, 735.25], 'YTD': [313.32, 313.98, 329.66, 380.36, 355.51, 345.97, 413.65, 432.18, 452.53, 430.25, 459.3, 469.81, 437.48, 571.38, 609.29, 606.43, 651.68, 630.07, 727.54, 681.01, 639.58, 673.51, 686.37, 613.93, 690.39, 735.25], '6M': [328.26, 325.96, 311.87, 383.66, 353.5, 355.77, 370, 409.95, 441.71, 445.36, 466.38, 466.52, 463.15, 513.98, 576.95, 603.91, 615.42, 630.7, 720, 683.52, 664.76, 670.66, 663.14, 613.93, 690.39, 735.25], '1Y': [214.63, 203.78, 206.63, 213.25, 216.2, 240.5, 229.9, 239.05, 213.76, 230.02, 227.03, 225.82, 239.42, 260.56, 279.62, 281.67, 312.5, 267.62, 292.22, 324.93, 347.88, 344.36, 373.29, 351.09, 325.77, 296.56, 328.26, 325.96, 311.87, 383.66, 353.5, 355.77, 352.09, 409.95, 441.71, 445.36, 466.38, 466.52, 463.15, 513.98, 576.95, 603.91, 615.42, 630.7, 720, 683.52, 664.76, 670.66, 663.14, 613.93, 690.39, 735.25] },
      velocityScore: { '1D': -3.7, '1W': 6.4, '1M': -56.9, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 64.8, revenueGrowth: 50, eps: 11.35, grossMargin: 21, dividendYield: 0.27,
      etfPresence: { AIRR: 4.49, PRN: 4.65, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Argan Inc is an engineering and construction company for power generation facilities — natural gas and renewable power plants. It appears in Industrials ETFs because power plant construction is one of the fastest-growing categories in U.S. infrastructure spending, driven by data center load additions that the grid cannot currently support.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.52, proScore: 1.81, coverage: 0.4,
      price: 1956.61, weeklyPrices: [1931.77, 1967.41, 2066.51, 1908.07, 1956.61], weeklyChange: 1.29, dayChange: 2.54, sortRank: 0, periodReturns: { '1M': 7, 'YTD': 109.6, '6M': 104.2, '1Y': 281.2 },
      priceHistory: { '1D': [1908.07, 1902.32, 1951.32, 1979.15, 1966.79, 1983.58, 1989.55, 1993.12, 1987.25, 1983.38, 1975.64, 1983.76, 1983.07, 1979.82, 1979.57, 1974.19, 1965.89, 1961.33, 1943.24, 1953.16, 1949.36, 1946.5, 1948.35, 1956.61], '1W': [1931.77, 1967.41, 2066.51, 1908.07, 1956.61], '1M': [1883.56, 1867.09, 1855.15, 1828.21, 1787.88, 1883.26, 1850.04, 1914.65, 1843.94, 1852.03, 1831.56, 1719.48, 1843.42, 1877.61, 1952.02, 1913.94, 1931.77, 1967.41, 2066.51, 1908.07, 1956.61], 'YTD': [933.29, 971.49, 1091.04, 1131.7, 1171.46, 1147.97, 1300.02, 1373.52, 1438.23, 1348.22, 1373.76, 1423, 1470.64, 1428.52, 1574.45, 1648.96, 1724.49, 1724.14, 2011.49, 2016.31, 1825.5, 1867.09, 1850.04, 1831.56, 1913.94, 1956.61], '6M': [958.07, 1003.64, 1010.41, 1119.98, 1127.55, 1176.26, 1283.65, 1337.95, 1413.57, 1438.24, 1372.4, 1414.1, 1408.25, 1273.18, 1424.91, 1650.48, 1674.16, 1719.21, 1967.24, 2032.98, 1854.43, 1883.56, 1883.26, 1831.56, 1913.94, 1956.61], '1Y': [513.32, 521.66, 535.02, 546.63, 547.91, 702.97, 690.45, 718.61, 683.93, 707.39, 700.69, 752.1, 762.91, 791.46, 834.33, 844.62, 837.11, 790.72, 1010.64, 987.78, 954.53, 920.99, 957.04, 949.3, 1021.36, 883.79, 958.07, 1003.64, 1010.41, 1119.98, 1127.55, 1176.26, 1230.26, 1337.95, 1413.57, 1438.24, 1372.4, 1414.1, 1408.25, 1273.18, 1424.91, 1650.48, 1674.16, 1719.21, 1967.24, 2032.98, 1854.43, 1883.56, 1883.26, 1831.56, 1913.94, 1956.61] },
      velocityScore: { '1D': -4.2, '1W': -0.5, '1M': -60, '6M': null }, isNew: false,
      marketCap: '$69B', pe: 56.3, revenueGrowth: 1, eps: 34.73, grossMargin: 25, dividendYield: 0.14,
      etfPresence: { AIRR: 4.37, PRN: 4.66, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.92, proScore: 1.57, coverage: 0.4,
      price: 335.28, weeklyPrices: [329.89, 337.96, 338.07, 330.90, 335.28], weeklyChange: 1.63, dayChange: 1.32, sortRank: 0, periodReturns: { '1M': 9.2, 'YTD': 30.6, '6M': 26.8, '1Y': 42.7 },
      priceHistory: { '1D': [330.9, 332.79, 333.95, 334.17, 335.06, 336.42, 337.57, 337.97, 337.87, 337.12, 336.47, 336.6, 336.3, 336.67, 336.54, 336.35, 335.61, 335.62, 334.14, 333.7, 334.42, 334.64, 334.7, 335.28], '1W': [329.89, 337.96, 338.07, 330.9, 335.28], '1M': [311.33, 312.65, 308.53, 303.81, 300.98, 308.31, 313.39, 313.67, 315.29, 314.42, 322.81, 314.08, 318.89, 320.11, 316.18, 324.38, 329.89, 337.96, 338.07, 330.9, 335.28], 'YTD': [256.77, 264.62, 282.47, 282.33, 259.51, 287.03, 279.03, 281.13, 283.5, 274.97, 259.88, 258.51, 266, 269.36, 286.41, 284.56, 289.82, 296.57, 315.39, 313.7, 302.64, 312.65, 313.39, 322.81, 324.38, 335.28], '6M': [264.33, 259.63, 272.25, 281.21, 281.54, 270.02, 282.45, 279.84, 278.74, 283.54, 267.57, 256.83, 262.23, 258.01, 272.54, 292.01, 293.59, 301.24, 305.48, 310.55, 305.22, 311.33, 308.31, 322.81, 324.38, 335.28], '1Y': [234.89, 242.14, 251.4, 255.52, 267.01, 273.62, 264.97, 270.68, 262.92, 266.99, 261.53, 263.45, 259.5, 259.37, 257.98, 255.19, 247.97, 253.5, 254.1, 257.9, 255.53, 242.61, 255.78, 260.88, 264.32, 256.73, 264.33, 259.63, 272.25, 281.21, 281.54, 270.02, 291.74, 279.84, 278.74, 283.54, 267.57, 256.83, 262.23, 258.01, 272.54, 292.01, 293.59, 301.24, 305.48, 310.55, 305.22, 311.33, 308.31, 322.81, 324.38, 335.28] },
      velocityScore: { '1D': 0, '1W': 13.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 31.7, revenueGrowth: 7, eps: 10.59, grossMargin: 30, dividendYield: 0.62,
      etfPresence: { AIRR: 1.81, PRN: false, RSHO: 6.04, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 2.81, proScore: 1.13, coverage: 0.4,
      price: 241.16, weeklyPrices: [235.29, 242.97, 246.41, 236.07, 241.16], weeklyChange: 2.49, dayChange: 2.16, sortRank: 0, periodReturns: { '1M': 16.1, 'YTD': 20.5, '6M': 15.7, '1Y': 48.6 },
      priceHistory: { '1D': [236.07, 237.02, 240.36, 240.36, 237.95, 239.44, 240.79, 243.14, 243.04, 243.76, 243.05, 242.58, 242.73, 242.66, 241.69, 240.93, 240.8, 240.54, 240.36, 239.84, 240.16, 240.28, 240.33, 241.16], '1W': [235.29, 242.97, 246.41, 236.07, 241.16], '1M': [219.08, 215.34, 213.82, 216.66, 220.92, 230.08, 234.08, 236.14, 227.8, 229.95, 228.01, 223.63, 233.49, 230.05, 237.06, 234.8, 235.29, 242.97, 246.41, 236.07, 241.16], 'YTD': [200.06, 207.44, 213.61, 217.13, 211.84, 218.02, 230.92, 241.01, 231.59, 211.9, 202.65, 202.46, 201.27, 203.16, 215.54, 219.99, 220.62, 211.36, 212.74, 198.99, 195.79, 215.34, 234.08, 228.01, 234.8, 241.16], '6M': [208.48, 203.26, 207.51, 217.65, 215.21, 212.73, 223.86, 239, 237.18, 225.02, 209.8, 203.42, 194.52, 190.71, 195.43, 224.82, 216.49, 216.36, 207.81, 203.24, 200.47, 219.08, 230.08, 228.01, 234.8, 241.16], '1Y': [162.31, 168.95, 172.78, 175.13, 175.58, 181.26, 203.53, 191.17, 188, 192.05, 182.65, 188, 184.91, 182.39, 185.92, 188.45, 185.21, 187.4, 200, 223.06, 221.42, 204.36, 215.7, 209.57, 217.69, 207.33, 208.48, 203.26, 207.51, 217.65, 215.21, 212.73, 222.32, 239, 237.18, 225.02, 209.8, 203.42, 194.52, 190.71, 195.43, 224.82, 216.49, 216.36, 207.81, 203.24, 200.47, 219.08, 230.08, 228.01, 234.8, 241.16] },
      velocityScore: { '1D': 0, '1W': 1.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 46, revenueGrowth: 17, eps: 5.24, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.67, PRN: false, RSHO: 3.96, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 2, avgWeight: 2.8, proScore: 1.12, coverage: 0.4,
      price: 276.93, weeklyPrices: [283.23, 277.66, 280.36, 275.13, 276.93], weeklyChange: -2.22, dayChange: 0.65, sortRank: 0, periodReturns: { '1M': 7.9, 'YTD': 35.1, '6M': 30.5, '1Y': 56.8 },
      priceHistory: { '1D': [275.13, 274.71, 276.64, 277.39, 276.29, 276.36, 277.27, 277.24, 276.79, 277.8, 277.33, 277.47, 277.46, 277.28, 278.33, 279.02, 278.47, 276.93, 275.79, 275.74, 275.97, 276.08, 276.63, 276.93], '1W': [283.23, 277.66, 280.36, 275.13, 276.93], '1M': [261.89, 258.02, 259.89, 258.25, 255.52, 250.72, 248.63, 249.33, 251.9, 246.55, 257.16, 249.49, 264.6, 264.67, 270.44, 277.42, 283.23, 277.66, 280.36, 275.13, 276.93], 'YTD': [205.02, 210.02, 224.26, 217.7, 208.93, 209.63, 244.79, 251.3, 260.31, 252.39, 243.82, 241.93, 241.62, 239.04, 254.06, 254.04, 240.88, 236.52, 256.43, 269.76, 253.12, 258.02, 248.63, 257.16, 277.42, 276.93], '6M': [212.17, 211.71, 218.27, 224.89, 215.39, 207.21, 225.15, 250.21, 257.04, 265.11, 254.14, 240.73, 236.04, 222.99, 236.02, 258.03, 247.72, 240.43, 242.69, 273.58, 256.99, 261.89, 250.72, 257.16, 277.42, 276.93], '1Y': [176.57, 176.22, 181.42, 184.3, 186.4, 192.14, 182.06, 180.9, 171.9, 175.92, 174.49, 183.8, 185.39, 190.22, 194.85, 191.65, 192.27, 191.23, 203.48, 206.31, 208.9, 201.22, 203.68, 194.29, 192.39, 191.19, 212.17, 211.71, 218.27, 224.89, 215.39, 207.21, 223.16, 250.21, 257.04, 265.11, 254.14, 240.73, 236.04, 222.99, 236.02, 258.03, 247.72, 240.43, 242.69, 273.58, 256.99, 261.89, 250.72, 257.16, 277.42, 276.93] },
      velocityScore: { '1D': 0.9, '1W': -0.9, '1M': -51.7, '6M': null }, isNew: false,
      marketCap: '$111B', pe: 64.1, revenueGrowth: 19, eps: 4.32, grossMargin: 35, dividendYield: 0.17,
      etfPresence: { AIRR: false, PRN: 3.33, RSHO: false, IDEF: 2.27, BILT: false },
      tonyNote: 'Howmet Aerospace is an aerospace structures and engine components manufacturer. It appears in Industrials ETFs for its aerospace and defense exposure — commercial air travel recovery and defense spending growth are the two demand drivers. Revenue grew and margins are expanding as Howmet prices power over OEM customers.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 2, avgWeight: 2.57, proScore: 1.03, coverage: 0.4,
      price: 208.56, weeklyPrices: [203.07, 205.40, 210.00, 209.89, 208.56], weeklyChange: 2.71, dayChange: -0.63, sortRank: 0, periodReturns: { '1M': 2.8, 'YTD': 20.7, '6M': 17.7, '1Y': 46.6 },
      priceHistory: { '1D': [209.89, 208.01, 210.06, 210.34, 208.94, 209.95, 209.1, 210.6, 210.38, 209.75, 209.58, 209.49, 210.33, 210.34, 209.79, 209.56, 209.33, 208.8, 208.1, 207.75, 207.48, 207.55, 207.4, 208.56], '1W': [203.07, 205.4, 210, 209.89, 208.56], '1M': [204.38, 198.95, 199.27, 195.88, 188.39, 187.26, 184.72, 190.76, 185.95, 187.46, 188.96, 183, 194.68, 193.45, 193.94, 196.93, 203.07, 205.4, 210, 209.89, 208.56], 'YTD': [172.84, 193.2, 213.25, 206.33, 210.18, 187.42, 196.9, 209.07, 207.24, 195.5, 197.82, 208.98, 222.13, 212.81, 230.29, 238.42, 219.1, 208.08, 215.2, 206.83, 197.33, 198.95, 184.72, 188.96, 196.93, 208.56], '6M': [177.18, 181.85, 201.46, 217.89, 206.04, 206.04, 203, 200.4, 198.38, 216.47, 200.39, 204.67, 204.85, 191.59, 214.44, 238.27, 216.66, 216.18, 206.15, 210.8, 201.94, 204.38, 187.26, 188.96, 196.93, 208.56], '1Y': [142.31, 140.37, 137.56, 139.85, 143.37, 152.38, 179.74, 179.51, 165.76, 166.52, 160.95, 166.13, 168.38, 175.02, 187.18, 197.01, 203.82, 191.17, 213.69, 198.12, 195.65, 175.91, 175.26, 174.71, 179.65, 168.12, 177.18, 181.85, 201.46, 217.89, 206.04, 206.04, 197.19, 200.4, 198.38, 216.47, 200.39, 204.67, 204.85, 191.59, 214.44, 238.27, 216.66, 216.18, 206.15, 210.8, 201.94, 204.38, 187.26, 188.96, 196.93, 208.56] },
      velocityScore: { '1D': 2, '1W': 8.4, '1M': -55.8, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 55.5, revenueGrowth: 26, eps: 3.76, grossMargin: 23, dividendYield: 0.5,
      etfPresence: { AIRR: 3.29, PRN: false, RSHO: false, IDEF: 1.85, BILT: false },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 2, avgWeight: 1.79, proScore: 0.72, coverage: 0.4,
      price: 283.62, weeklyPrices: [296.89, 285.43, 278.19, 283.48, 283.62], weeklyChange: -4.47, dayChange: 0.05, sortRank: 0, periodReturns: { '1M': -11.5, 'YTD': -16.6, '6M': -20.2, '1Y': 22.4 },
      priceHistory: { '1D': [283.48, 284.56, 284.02, 282.09, 281.29, 279.63, 278.98, 280.2, 280.08, 281.23, 281.26, 281.05, 280.46, 280.45, 280.95, 280.93, 280.48, 280.46, 280.87, 280.92, 281.55, 281.73, 282.9, 283.62], '1W': [296.89, 285.43, 278.19, 283.48, 283.62], '1M': [320.95, 317.56, 320.9, 308.17, 296.41, 293.66, 287.54, 294.53, 293.04, 292.26, 297.52, 289.13, 300.95, 297.68, 299.66, 298.51, 296.89, 285.43, 278.19, 283.48, 283.62], 'YTD': [340.07, 378.47, 418.86, 424.14, 427.83, 369.38, 406.76, 443.14, 443, 421.17, 414.56, 427.99, 402.56, 393.32, 403.37, 398.13, 366.88, 362.17, 319.54, 333.56, 324.6, 317.56, 287.54, 297.52, 298.51, 283.62], '6M': [355.45, 349.75, 386.99, 425.9, 413.56, 420.3, 405.82, 418.78, 438.01, 453.73, 429.58, 416.59, 396.57, 369.08, 402.28, 398.07, 378.21, 361.4, 326.13, 317.75, 329.35, 320.95, 293.66, 297.52, 298.51, 283.62], '1Y': [231.63, 246.31, 248.92, 253.82, 265.56, 258.52, 267.49, 268, 265.4, 271.74, 269.33, 271.93, 272.46, 277.51, 286.01, 290.83, 284.96, 283.64, 298.42, 306.68, 324.19, 309.16, 314.73, 309.23, 323.14, 321.29, 355.45, 349.75, 386.99, 425.9, 413.56, 420.3, 397.77, 418.78, 438.01, 453.73, 429.58, 416.59, 396.57, 369.08, 402.28, 398.07, 378.21, 361.4, 326.13, 317.75, 329.35, 320.95, 293.66, 297.52, 298.51, 283.62] },
      velocityScore: { '1D': 4.3, '1W': -4, '1M': -65.9, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 18.4, revenueGrowth: 13, eps: 15.39, grossMargin: 12, dividendYield: 1.95,
      etfPresence: { AIRR: 2.54, PRN: false, RSHO: false, IDEF: 1.04, BILT: false },
      tonyNote: 'Huntington Ingalls Industries is the only builder of nuclear-powered aircraft carriers for the U.S. Navy. Revenue is government-contracted and predictable; the ETF allocation in Industrials reflects defense spending growth and the Navy\'s backlog of nuclear submarine and carrier construction. A steady-state quality compounder in a market structure with no competition.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 2, avgWeight: 1.77, proScore: 0.71, coverage: 0.4,
      price: 49.24, weeklyPrices: [56.16, 54.21, 51.09, 50.80, 49.24], weeklyChange: -12.32, dayChange: -3.07, sortRank: 0, periodReturns: { '1M': -12.4, 'YTD': -35.1, '6M': -38.4, '1Y': 20.8 },
      priceHistory: { '1D': [50.8, 49.82, 50.35, 49.63, 49.31, 49.48, 49.44, 49.75, 49.81, 50.26, 49.88, 49.93, 49.6, 49.35, 49.42, 49.5, 49.31, 49.26, 48.91, 48.83, 48.82, 48.84, 49.14, 49.24], '1W': [56.16, 54.21, 51.09, 50.8, 49.24], '1M': [56.8, 57.3, 65.19, 64.13, 63.49, 63.27, 58.43, 63.4, 58.52, 57.73, 56.19, 54.82, 58.78, 57.75, 57.02, 56.34, 56.16, 54.21, 51.09, 50.8, 49.24], 'YTD': [75.91, 104.04, 124.56, 113.85, 108.16, 85.25, 87.05, 105.67, 92.14, 85.54, 89.46, 93.04, 79.98, 67.7, 68.33, 74.66, 68.61, 59.56, 61.52, 57.33, 53.47, 57.3, 58.43, 56.19, 56.34, 49.24], '6M': [79.97, 79.29, 113.7, 130.72, 111.32, 96.16, 98.81, 89.06, 94.31, 90.72, 92.47, 89.53, 83.69, 65.28, 71.96, 73.66, 68.55, 61.66, 59.31, 56.99, 54.22, 56.8, 63.27, 56.19, 56.34, 49.24], '1Y': [40.77, 43.07, 46.02, 54.28, 58.78, 58.01, 58.93, 69.14, 64.02, 68.05, 64.5, 65.66, 75.74, 81.18, 92.96, 105.67, 90.58, 84.3, 91.21, 77.41, 76.59, 70.36, 75.05, 72.78, 76.91, 69.77, 79.97, 79.29, 113.7, 130.72, 111.32, 96.16, 94.41, 89.06, 94.31, 90.72, 92.47, 89.53, 83.69, 65.28, 71.96, 73.66, 68.55, 61.66, 59.31, 56.99, 54.22, 56.8, 63.27, 56.19, 56.34, 49.24] },
      velocityScore: { '1D': 1.4, '1W': -7.8, '1M': -65.5, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 289.6, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.54, PRN: false, RSHO: false, IDEF: 1, BILT: false },
      tonyNote: 'Kratos Defense is a defense technology company focused on unmanned systems, satellite communications, and high-performance computing for government customers. It appears in Industrials ETFs as an AI-adjacent defense name — autonomous systems and AI-driven surveillance are direct end markets. Revenue grew and the government contract backlog is expanding.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 1.42, proScore: 0.57, coverage: 0.4,
      price: 75.49, weeklyPrices: [71.25, 73.12, 74.95, 75.79, 75.49], weeklyChange: 5.95, dayChange: -0.4, sortRank: 0, periodReturns: { '1M': -3.8, 'YTD': 25.6, '6M': 27, '1Y': 23.5 },
      priceHistory: { '1D': [75.79, 74.87, 75.2, 75.14, 75.13, 75.32, 75.44, 75.43, 75.37, 75.38, 75.67, 75.4, 75.29, 75.16, 75.31, 75.46, 75.44, 75.49, 75.26, 75.04, 75.17, 75.37, 75.42, 75.49], '1W': [71.25, 73.12, 74.95, 75.79, 75.49], '1M': [76.34, 74.37, 73.13, 71.39, 70.04, 71.31, 71.66, 72.43, 71.96, 71.59, 71.59, 72.26, 71.62, 72.08, 71.49, 71.48, 71.25, 73.12, 74.95, 75.79, 75.49], 'YTD': [60.11, 61.15, 60.29, 63.72, 67.24, 67.42, 71.13, 72.17, 74.77, 74.77, 73.52, 72.8, 73.81, 71.83, 72.82, 70.76, 71.1, 73.32, 73.76, 74.73, 79.4, 74.37, 71.66, 71.59, 71.48, 75.49], '6M': [59.46, 60.85, 60.32, 61.55, 64.29, 66.34, 67.85, 72.28, 72.98, 76.26, 73.18, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 76.12, 74.18, 77.69, 76.34, 71.31, 71.59, 71.48, 75.49], '1Y': [61.12, 58.72, 57.85, 58.48, 57.71, 59.24, 58.64, 57.76, 56.57, 57.13, 57.73, 58.76, 59.02, 62.86, 63.69, 63.5, 63.78, 62.16, 56.98, 57.54, 60.6, 59.17, 59.37, 61.55, 60.5, 58.84, 59.46, 60.85, 60.32, 61.55, 64.29, 66.34, 66.92, 72.28, 72.98, 76.26, 73.18, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 76.12, 74.18, 77.69, 76.34, 71.31, 71.59, 71.48, 75.49] },
      velocityScore: { '1D': 1.8, '1W': 3.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$92B', pe: 33.1, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.77,
      etfPresence: { AIRR: false, PRN: false, RSHO: 0.92, IDEF: false, BILT: 1.91 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RBC', name: 'RBC Bearings Incorporated', easyScore: 2, avgWeight: 1.2, proScore: 0.48, coverage: 0.4,
      price: 642.27, weeklyPrices: [625.73, 639.18, 645.73, 633.44, 642.27], weeklyChange: 2.64, dayChange: 1.39, sortRank: 0, periodReturns: { '1M': 14.7, 'YTD': 43.2, '6M': 40.1, '1Y': 65.5 },
      priceHistory: { '1D': [633.44, 632.14, 638.21, 640.21, 642, 639.06, 640.99, 642.38, 642.38, 644.57, 643.67, 645.23, 644.48, 644.48, 645.63, 643.69, 642.6, 643.11, 641.13, 640.74, 640.82, 639.84, 640.82, 642.27], '1W': [625.73, 639.18, 645.73, 633.44, 642.27], '1M': [584.4, 577.42, 577.83, 571.96, 566.14, 578.34, 584.18, 589.76, 590.09, 590.97, 592.41, 576.74, 607.46, 603.64, 616.95, 621.08, 625.73, 639.18, 645.73, 633.44, 642.27], 'YTD': [448.43, 485, 497.06, 504.99, 511.98, 520.16, 550.4, 551.42, 576.5, 566.06, 547.31, 547.81, 561.66, 551.99, 595.11, 586.98, 588.74, 584.49, 623.19, 613.1, 565.22, 577.42, 584.18, 592.41, 621.08, 642.27], '6M': [458.38, 458.79, 487.16, 498.82, 504.5, 507.13, 548.2, 552.44, 562.54, 584.89, 565.64, 546.91, 537.2, 524.38, 553.31, 598.23, 591.32, 594.39, 607.5, 613.59, 551.12, 584.4, 578.34, 592.41, 621.08, 642.27], '1Y': [388.19, 381.43, 379.82, 389.57, 389.3, 384.87, 404.38, 404.99, 397.81, 399, 383.6, 378.08, 379.79, 378.54, 384.8, 382.19, 372.71, 393.88, 408.94, 431.36, 442.47, 423.39, 442.95, 438.15, 447.58, 444.99, 458.38, 458.79, 487.16, 498.82, 504.5, 507.13, 544.02, 552.44, 562.54, 584.89, 565.64, 546.91, 537.2, 524.38, 553.31, 598.23, 591.32, 594.39, 607.5, 613.59, 551.12, 584.4, 578.34, 592.41, 621.08, 642.27] },
      velocityScore: { '1D': 0, '1W': 4.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$20B', pe: 70.4, revenueGrowth: 18, eps: 9.12, grossMargin: 45, dividendYield: null,
      etfPresence: { AIRR: 1.87, PRN: false, RSHO: false, IDEF: 0.52, BILT: false },
      tonyNote: 'RBC Bearings Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRCY', name: 'Mercury Systems, Inc.', easyScore: 2, avgWeight: 1.09, proScore: 0.44, coverage: 0.4,
      price: 108.13, weeklyPrices: [115.50, 113.91, 111.76, 110.87, 108.13], weeklyChange: -6.38, dayChange: -2.47, sortRank: 0, periodReturns: { '1M': 9.7, 'YTD': 48.1, '6M': 44.8, '1Y': 116.4 },
      priceHistory: { '1D': [110.87, 110.32, 110.97, 109.84, 108.53, 108.96, 109.75, 110.11, 109.7, 110, 110.11, 110.25, 109.71, 109.47, 109, 109.15, 108.88, 108.48, 107.86, 107.86, 108.25, 107.8, 108.2, 108.13], '1W': [115.5, 113.91, 111.76, 110.87, 108.13], '1M': [99.32, 97.11, 108.11, 111.7, 111.28, 112.87, 111.59, 117.82, 111.27, 110.94, 108.82, 106.81, 119.32, 120.3, 115.93, 112.44, 115.5, 113.91, 111.76, 110.87, 108.13], 'YTD': [73.01, 88.74, 102.95, 99.48, 98.29, 79.07, 80.25, 89.86, 89.58, 84.96, 81.44, 78.97, 78.71, 74.75, 79.23, 85.51, 82.61, 74.75, 91.66, 92.32, 92.8, 97.11, 111.59, 108.82, 112.44, 108.13], '6M': [74.7, 76.03, 93.48, 103.02, 98.89, 93.89, 85.37, 82.36, 85.9, 91.01, 89.36, 80.71, 78.29, 69.86, 77.53, 84.09, 83.36, 76.53, 82.96, 91.95, 93.39, 99.32, 112.87, 108.82, 112.44, 108.13], '1Y': [49.96, 50.63, 52.4, 51.68, 52.91, 53, 53.93, 68.02, 64.22, 67.64, 67.47, 71.7, 73.82, 74.27, 81.18, 83.92, 78.15, 75.54, 77.44, 78.19, 72.74, 67.94, 69.05, 70.23, 75.19, 69.63, 74.7, 76.03, 93.48, 103.02, 98.89, 93.89, 82.2, 82.36, 85.9, 91.01, 89.36, 80.71, 78.29, 69.86, 77.53, 84.09, 83.36, 76.53, 82.96, 91.95, 93.39, 99.32, 112.87, 108.82, 112.44, 108.13] },
      velocityScore: { '1D': 2.3, '1W': 2.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: null, revenueGrowth: 12, eps: -0.23, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: 1.16, PRN: false, RSHO: false, IDEF: 1.03, BILT: false },
      tonyNote: 'Mercury Systems, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, avgWeight: 0.99, proScore: 0.4, coverage: 0.4,
      price: 45.2, weeklyPrices: [52.03, 50.37, 47.70, 46.38, 45.20], weeklyChange: -13.13, dayChange: -2.54, sortRank: 0, periodReturns: { '1M': -29.5, 'YTD': -38.2, '6M': -44.1, '1Y': -6.4 },
      priceHistory: { '1D': [46.38, 46.15, 46.35, 45.91, 46, 45.65, 44.92, 45.16, 45.17, 45.45, 45.35, 45.32, 45.19, 45.46, 45.38, 45.22, 45.05, 44.88, 44.79, 44.62, 44.62, 44.76, 44.92, 45.2], '1W': [52.03, 50.37, 47.7, 46.38, 45.2], '1M': [60.66, 63.52, 65.86, 57.5, 53.65, 54.65, 51.84, 54.39, 49.44, 49.64, 48.37, 45.87, 49.58, 47.83, 48.27, 51.7, 52.03, 50.37, 47.7, 46.38, 45.2], 'YTD': [73.17, 101.28, 109.49, 111.61, 110.93, 89.78, 78.71, 88.46, 88.31, 97.14, 98.98, 101.43, 99.6, 82.69, 84.22, 92.73, 82.11, 65.98, 63.19, 62.48, 64.2, 63.52, 51.84, 48.37, 51.7, 45.2], '6M': [80.81, 76.85, 106.22, 108.5, 108.71, 102.87, 97.47, 75.79, 81.27, 93.04, 106.09, 104.08, 102.39, 74.82, 82, 90.18, 82.06, 70.3, 62.89, 58.82, 66.21, 60.66, 54.65, 48.37, 51.7, 45.2], '1Y': [48.28, 44.91, 47.57, 53.74, 49.1, 50.39, 48.6, 49.03, 49.87, 54.69, 53.26, 62.22, 64.11, 66.91, 73.47, 76.6, 75.96, 77.21, 85.79, 79.73, 69.38, 58.95, 64.96, 66.08, 67.27, 64.94, 80.81, 76.85, 106.22, 108.5, 108.71, 102.87, 95.36, 75.79, 81.27, 93.04, 106.09, 104.08, 102.39, 74.82, 82, 90.18, 82.06, 70.3, 62.89, 58.82, 66.21, 60.66, 54.65, 48.37, 51.7, 45.2] },
      velocityScore: { '1D': 0, '1W': -9.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: 196.5, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.8, PRN: false, RSHO: false, IDEF: 0.19, BILT: false },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DRS', name: 'Leonardo DRS, Inc.', easyScore: 2, avgWeight: 0.58, proScore: 0.23, coverage: 0.4,
      price: 45.43, weeklyPrices: [46.58, 46.08, 44.99, 45.74, 45.43], weeklyChange: -2.47, dayChange: -0.68, sortRank: 0, periodReturns: { '1M': 1.1, 'YTD': 33.3, '6M': 31.6, '1Y': 5.4 },
      priceHistory: { '1D': [45.74, 45.3, 45.7, 45.68, 45.76, 45.71, 45.56, 45.69, 45.69, 45.7, 45.65, 45.57, 45.5, 45.46, 45.54, 45.55, 45.53, 45.5, 45.28, 45.15, 45.15, 45.38, 45.46, 45.43], '1W': [46.58, 46.08, 44.99, 45.74, 45.43], '1M': [45.8, 45.35, 48.41, 48.76, 47.96, 47.39, 45.61, 46.71, 46.15, 46.55, 47.35, 46.11, 49.69, 48.53, 46.68, 45.59, 46.58, 46.08, 44.99, 45.74, 45.43], 'YTD': [34.09, 38.84, 42.26, 41.28, 41.3, 37.27, 37.77, 41.07, 43.34, 45.82, 45.91, 46.44, 46.32, 45.86, 47.1, 46.29, 42.07, 39.47, 41.79, 42.87, 42.81, 45.35, 45.61, 47.35, 45.59, 45.43], '6M': [34.52, 34.78, 40.99, 42.57, 40.63, 40.45, 40.22, 38.13, 38.14, 45.49, 47.41, 45.3, 44.4, 43.25, 46.19, 47.54, 43.2, 40.18, 39.7, 41.49, 42.84, 45.8, 47.39, 47.35, 45.59, 45.43], '1Y': [43.12, 45.09, 47.01, 48.01, 47.53, 43.24, 41.31, 41.87, 41.17, 41.93, 41.79, 41.14, 41.54, 42.55, 44.58, 45.43, 40.19, 39.94, 38.43, 35.76, 35.59, 34, 33.78, 33.79, 34.02, 32.55, 34.52, 34.78, 40.99, 42.57, 40.63, 40.45, 38.93, 38.13, 38.14, 45.49, 47.41, 45.3, 44.4, 43.25, 46.19, 47.54, 43.2, 40.18, 39.7, 41.49, 42.84, 45.8, 47.39, 47.35, 45.59, 45.43] },
      velocityScore: { '1D': 4.5, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 42.5, revenueGrowth: 6, eps: 1.07, grossMargin: 24, dividendYield: 0.79,
      etfPresence: { AIRR: 0.85, PRN: false, RSHO: false, IDEF: 0.31, BILT: false },
      tonyNote: 'Leonardo DRS, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TPC', name: 'Tutor Perini Corporation', easyScore: 2, avgWeight: 0.38, proScore: 0.15, coverage: 0.4,
      price: 83.51, weeklyPrices: [77.89, 77.99, 81.50, 81.00, 83.51], weeklyChange: 7.22, dayChange: 3.1, sortRank: 0, periodReturns: { '1M': 14.8, 'YTD': 24.6, '6M': 21.2, '1Y': 87.5 },
      priceHistory: { '1D': [81, 81.75, 82.61, 83.38, 83.45, 83.66, 84.45, 85.21, 85.51, 85.1, 85.23, 85.4, 85.53, 84.31, 84.34, 84.31, 83.93, 83.69, 83.69, 83.47, 83.47, 83.08, 83.16, 83.51], '1W': [77.89, 77.99, 81.5, 81, 83.51], '1M': [74.67, 74.47, 73.27, 71.49, 74.26, 74.29, 72.26, 72.38, 70.53, 72.13, 71.48, 68.72, 73.61, 74.92, 76.55, 76.19, 77.89, 77.99, 81.5, 81, 83.51], 'YTD': [67.02, 70.17, 75.17, 76.79, 79.86, 79.95, 81.73, 84.9, 89.38, 71.12, 69.2, 71.21, 78.37, 78.71, 81.5, 86.25, 84.19, 86.04, 96.98, 82.69, 74.91, 74.47, 72.26, 71.48, 76.19, 83.51], '6M': [68.93, 69.35, 70.53, 75.09, 77.34, 80.11, 84.07, 82.74, 84.99, 73.57, 72.04, 71.31, 72.44, 72.83, 77.31, 86.16, 85.11, 86.87, 97.31, 82.79, 75.43, 74.67, 74.29, 71.48, 76.19, 83.51], '1Y': [44.53, 46.36, 47.45, 50.77, 49.17, 47.65, 47.28, 58.77, 56.02, 58.99, 59.03, 62.46, 63.62, 64.78, 63.75, 63.58, 63.3, 64.22, 69.34, 67.92, 62.63, 60.48, 65.16, 67.63, 67.56, 66.02, 68.93, 69.35, 70.53, 75.09, 77.34, 80.11, 83.48, 82.74, 84.99, 73.57, 72.04, 71.31, 72.44, 72.83, 77.31, 86.16, 85.11, 86.87, 97.31, 82.79, 75.43, 74.67, 74.29, 71.48, 76.19, 83.51] },
      velocityScore: { '1D': 0, '1W': 7.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 57.2, revenueGrowth: 12, eps: 1.46, grossMargin: 12, dividendYield: 0.3,
      etfPresence: { AIRR: 0.71, PRN: false, RSHO: false, IDEF: 0.04, BILT: false },
      tonyNote: 'Tutor Perini Corporation appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TKR', name: 'TIMKEN CO/THE', easyScore: 1, avgWeight: 8.69, proScore: 1.74, coverage: 0.2,
      price: 138.43, weeklyPrices: [139.40, 142.36, 141.97, 137.64, 138.43], weeklyChange: -0.7, dayChange: 0.57, sortRank: 0, periodReturns: { '1M': 15.4, 'YTD': 64.5, '6M': 60.9, '1Y': 88 },
      priceHistory: { '1D': [137.64, 137.93, 139.15, 139.55, 139.32, 139.27, 139.79, 139.72, 139.47, 139.54, 139.26, 139.27, 139.12, 139.37, 138.9, 138.82, 138.42, 138.52, 137.66, 137.77, 137.98, 138.01, 138.28, 138.43], '1W': [139.4, 142.36, 141.97, 137.64, 138.43], '1M': [127.42, 127.16, 126.78, 127.98, 126.54, 131.9, 131.82, 133.66, 131.83, 134.67, 137.09, 132.39, 137.4, 137.06, 139.12, 140.28, 139.4, 142.36, 141.97, 137.64, 138.43], 'YTD': [84.13, 90.6, 93.73, 94.6, 94.15, 102.15, 107.35, 107.11, 109.88, 103.05, 99.7, 98.23, 101.9, 102.06, 106.92, 103.73, 106.79, 106.53, 119.7, 117.12, 109.36, 127.16, 131.82, 137.09, 140.28, 138.43], '6M': [86.02, 86.29, 91.17, 93.55, 94.02, 94.99, 108.93, 107.84, 107.83, 109.99, 100.58, 98.74, 98.99, 95.94, 99.17, 106.81, 108.75, 106.88, 109.63, 117.39, 112.73, 127.42, 131.9, 137.09, 140.28, 138.43], '1Y': [73.62, 75.44, 77.68, 76.68, 80.99, 74.77, 73.57, 76.91, 76.88, 78.96, 75.12, 76.4, 77.11, 75.67, 75.11, 75.86, 74.7, 75.85, 79.25, 78.46, 78.2, 74.33, 81.22, 82.52, 87.53, 84.14, 86.02, 86.29, 91.17, 93.55, 94.02, 94.99, 106.04, 107.84, 107.83, 109.99, 100.58, 98.74, 98.99, 95.94, 99.17, 106.81, 108.75, 106.88, 109.63, 117.39, 112.73, 127.42, 131.9, 137.09, 140.28, 138.43] },
      velocityScore: { '1D': 0, '1W': -5.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 31.5, revenueGrowth: 8, eps: 4.4, grossMargin: 31, dividendYield: 1.05,
      etfPresence: { AIRR: false, PRN: false, RSHO: 8.69, IDEF: false, BILT: false },
      tonyNote: 'TIMKEN CO/THE appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RTX', name: 'RTX CORP', easyScore: 1, avgWeight: 8.29, proScore: 1.66, coverage: 0.2,
      price: 186.29, weeklyPrices: [192.58, 185.60, 181.83, 186.39, 186.29], weeklyChange: -3.27, dayChange: -0.05, sortRank: 0, periodReturns: { '1M': 5.2, 'YTD': 1.6, '6M': 0, '1Y': 31.3 },
      priceHistory: { '1D': [186.39, 186.69, 186.61, 187.23, 185.66, 185.6, 185.25, 185.82, 185.77, 186.5, 185.93, 185.62, 185.45, 185.51, 185.7, 186.02, 185.57, 185.82, 184.88, 184.84, 185.23, 185.63, 185.93, 186.29], '1W': [192.58, 185.6, 181.83, 186.39, 186.29], '1M': [178.97, 176.59, 178.96, 179.66, 174.41, 174.26, 172.55, 179.41, 180.99, 178.66, 181.56, 177.41, 184.21, 183.53, 183.64, 186.77, 192.58, 185.6, 181.83, 186.39, 186.29], 'YTD': [183.4, 187.17, 199.83, 196.34, 199.88, 195.97, 201.14, 205.41, 197.63, 203.86, 203.04, 204.56, 195, 194.72, 203.19, 198.39, 180.91, 172.79, 176.74, 178.89, 174.49, 176.59, 172.55, 181.56, 186.77, 186.29], '6M': [186.38, 187.25, 188.5, 201.92, 194.13, 201.09, 196.19, 200.06, 201.92, 212.16, 208.23, 206.06, 194.82, 187.15, 197.92, 202.81, 187.17, 175.68, 172.87, 178.61, 175.95, 178.97, 174.26, 181.56, 186.77, 186.29], '1Y': [141.85, 144.19, 146.18, 150.17, 156.49, 158.4, 155.75, 155.49, 153.66, 159.57, 158.11, 155, 158.31, 161.38, 167.2, 168.57, 157, 177.98, 176.36, 174, 179.22, 174.72, 172.15, 168.45, 174.72, 177.2, 186.38, 187.25, 188.5, 201.92, 194.13, 201.09, 198.66, 200.06, 201.92, 212.16, 208.23, 206.06, 194.82, 187.15, 197.92, 202.81, 187.17, 175.68, 172.87, 178.61, 175.95, 178.97, 174.26, 181.56, 186.77, 186.29] },
      velocityScore: { '1D': 3.1, '1W': 3.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$251B', pe: 35, revenueGrowth: 9, eps: 5.33, grossMargin: 20, dividendYield: 1.49,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 8.29, BILT: false },
      tonyNote: 'RTX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CGNX', name: 'COGNEX CORP', easyScore: 1, avgWeight: 7.15, proScore: 1.43, coverage: 0.2,
      price: 63.28, weeklyPrices: [64.77, 66.10, 67.60, 63.96, 63.28], weeklyChange: -2.3, dayChange: -1.06, sortRank: 0, periodReturns: { '1M': -4.3, 'YTD': 75.9, '6M': 72.9, '1Y': 106.1 },
      priceHistory: { '1D': [63.96, 63.82, 64.57, 64.34, 64.39, 64.51, 64.59, 64.55, 64.37, 64.3, 64.09, 64.32, 64.04, 64.22, 64.21, 63.87, 63.67, 63.56, 63.24, 63.18, 63.26, 62.97, 63.2, 63.28], '1W': [64.77, 66.1, 67.6, 63.96, 63.28], '1M': [68.33, 66.7, 66.01, 65.85, 64.64, 66.08, 66.06, 64.67, 60.82, 62.39, 61.32, 58.69, 62.11, 63.61, 65.9, 65.41, 64.77, 66.1, 67.6, 63.96, 63.28], 'YTD': [35.98, 37.74, 40.59, 41.71, 39.09, 39.49, 58.67, 55.94, 55.36, 51.25, 48.77, 49.87, 51.61, 49.34, 53.91, 54.64, 54.03, 53.52, 62.26, 65.68, 60.65, 66.7, 66.06, 61.32, 65.41, 63.28], '6M': [36.6, 36.93, 39.01, 40.92, 39.37, 39.76, 43.72, 58.79, 56.47, 53.83, 50.82, 49.56, 50.8, 45.94, 51.69, 55.58, 53.72, 53.74, 58.83, 67.26, 61.91, 68.33, 66.08, 61.32, 65.41, 63.28], '1Y': [30.71, 32.05, 33.32, 33.32, 34.61, 33.76, 40.89, 42.2, 43.4, 43.89, 43.97, 44.4, 44.08, 45.52, 45.83, 46.75, 45.79, 46.29, 47.44, 40.5, 38.4, 35.91, 37.76, 37.69, 37.91, 35.76, 36.6, 36.93, 39.01, 40.92, 39.37, 39.76, 42.37, 58.79, 56.47, 53.83, 50.82, 49.56, 50.8, 45.94, 51.69, 55.58, 53.72, 53.74, 58.83, 67.26, 61.91, 68.33, 66.08, 61.32, 65.41, 63.28] },
      velocityScore: { '1D': 0, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 74.4, revenueGrowth: 24, eps: 0.85, grossMargin: 68, dividendYield: 0.52,
      etfPresence: { AIRR: false, PRN: false, RSHO: 7.15, IDEF: false, BILT: false },
      tonyNote: 'COGNEX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 7.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 5.47, proScore: 5.47, coverage: 1,
      price: 256.72, weeklyPrices: [280.91, 286.69, 283.61, 275.25, 256.72], weeklyChange: -8.61, dayChange: -6.73, sortRank: 0, periodReturns: { '1M': 19.5, 'YTD': 206.7, '6M': 181.7, '1Y': 403.2 },
      priceHistory: { '1D': [275.25, 259, 263.4, 264, 258.18, 259.58, 257, 257.35, 257.54, 258.5, 260.2, 260.52, 258.25, 258.24, 257.42, 255.57, 255.15, 253.08, 251.37, 250.54, 250.74, 252.05, 253.88, 256.72], '1W': [280.91, 286.69, 283.61, 275.25, 256.72], '1M': [208.06, 208.37, 226.34, 231.09, 264.51, 260.58, 251.68, 259.67, 227.81, 218, 220.12, 211.69, 222.24, 232.36, 260.07, 265.1, 280.91, 286.69, 283.61, 275.25, 256.72], 'YTD': [83.71, 97.3, 103.89, 96.85, 94.91, 73.87, 89.73, 107.61, 104.88, 95.65, 108.04, 118.56, 115.09, 101.95, 136.33, 166.77, 156.14, 141.19, 195.09, 179.11, 197.73, 208.37, 251.68, 220.12, 265.1, 256.72], '6M': [91.13, 89.95, 97.93, 108.73, 91.46, 88.16, 92.88, 98.01, 100.61, 91.01, 94.94, 129.85, 114.15, 92.26, 117.4, 161.94, 156.55, 135.51, 175.92, 186.1, 199.86, 208.06, 260.58, 220.12, 265.1, 256.72], '1Y': [51.02, 50.31, 46.05, 53.31, 51.88, 51.29, 55.09, 75.33, 67.19, 70.48, 65.65, 93.39, 94.08, 113.23, 115.61, 122, 125.83, 98.62, 125.1, 117, 102.22, 90.54, 88.88, 98.92, 93.59, 75.45, 91.13, 89.95, 97.93, 108.73, 91.46, 88.16, 86.1, 98.01, 100.61, 91.01, 94.94, 129.85, 114.15, 92.26, 117.4, 161.94, 156.55, 135.51, 175.92, 186.1, 199.86, 208.06, 260.58, 220.12, 265.1, 256.72] },
      velocityScore: { '1D': 0, '1W': 18.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$65B', pe: 99.1, revenueGrowth: 684, eps: 2.59, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 3.83, MEME: 6.96, RKNG: 5.62 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 3, avgWeight: 4.1, proScore: 4.1, coverage: 1,
      price: 41.71, weeklyPrices: [45.57, 46.59, 45.20, 45.27, 41.71], weeklyChange: -8.47, dayChange: -7.86, sortRank: 0, periodReturns: { '1M': -9.1, 'YTD': 70.1, '6M': 62.2, '1Y': 304.2 },
      priceHistory: { '1D': [45.27, 42.33, 43.62, 43.2, 42.66, 43.07, 43.06, 43.01, 42.8, 42.94, 42.65, 42.69, 42.29, 42.52, 42.28, 42.15, 42.07, 41.69, 41.29, 41.22, 41.07, 41.19, 41.39, 41.71], '1W': [45.57, 46.59, 45.2, 45.27, 41.71], '1M': [45.14, 48.98, 49.65, 47.28, 47.94, 47.86, 44.71, 44.15, 39.62, 40.94, 41.91, 38.92, 41.47, 42.7, 46.47, 46.27, 45.57, 46.59, 45.2, 45.27, 41.71], 'YTD': [24.52, 31.94, 35.22, 34.74, 38.07, 27.84, 36.17, 31.53, 28.65, 28.09, 27.48, 26.65, 28.37, 24.49, 25.57, 30.81, 32.43, 32.69, 44.24, 43.93, 36.62, 48.98, 44.71, 41.91, 46.27, 41.71], '6M': [25.72, 28.11, 37.68, 37.4, 36.18, 34.8, 38.26, 35.28, 30, 27.93, 27.03, 27.71, 27.26, 20.55, 25.18, 31.47, 31.32, 32.11, 39.88, 44.59, 39.14, 45.14, 47.86, 41.91, 46.27, 41.71], '1Y': [10.32, 9.76, 9.51, 10.06, 10.93, 10.03, 14.79, 14.97, 15.34, 16.47, 14.38, 16.98, 19.83, 23.45, 25, 27.94, 37.76, 30.62, 34.42, 33.09, 28.57, 22.84, 23.74, 29.36, 30.99, 22, 25.72, 28.11, 37.68, 37.4, 36.18, 34.8, 34.95, 35.28, 30, 27.93, 27.03, 27.71, 27.26, 20.55, 25.18, 31.47, 31.32, 32.11, 39.88, 44.59, 39.14, 45.14, 47.86, 41.91, 46.27, 41.71] },
      velocityScore: { '1D': 0.7, '1W': 8.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.53, MEME: 5.98, RKNG: 3.79 },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 3, avgWeight: 4.09, proScore: 4.09, coverage: 1,
      price: 50.83, weeklyPrices: [58.11, 59.96, 56.87, 54.72, 50.83], weeklyChange: -12.53, dayChange: -7.11, sortRank: 0, periodReturns: { '1M': -10.6, 'YTD': 34.6, '6M': 21.1, '1Y': 340.5 },
      priceHistory: { '1D': [54.72, 51.71, 52.9, 52.44, 51.88, 52.49, 52.54, 52.62, 52.03, 52.45, 52.11, 52.21, 51.9, 51.96, 51.76, 51.4, 51.24, 50.87, 50.56, 50.3, 50.02, 50.17, 50.59, 50.83], '1W': [58.11, 59.96, 56.87, 54.72, 50.83], '1M': [59.78, 67.84, 64.05, 63.54, 65.33, 66.6, 65.48, 61.86, 54.35, 59.19, 54.02, 51.52, 56.71, 59.77, 60.85, 59.18, 58.11, 59.96, 56.87, 54.72, 50.83], 'YTD': [37.77, 45.68, 51.89, 52.26, 59.84, 39.79, 40.03, 43.29, 44.24, 40.13, 41.37, 42.21, 41.43, 34.09, 37.06, 48.82, 48.39, 42.86, 60.98, 56.56, 47.74, 67.84, 65.48, 54.02, 59.18, 50.83], '6M': [41.98, 42.7, 46.03, 57.82, 52.36, 53.08, 46.15, 42.22, 42.36, 41.39, 38.84, 44.94, 42.16, 31.62, 35.74, 47.37, 45.17, 44.44, 54.74, 55.15, 50.46, 59.78, 66.6, 54.02, 59.18, 50.83], '1Y': [11.54, 15.23, 16.96, 17.31, 18.99, 16.14, 18.32, 17.83, 18.73, 22.99, 28.21, 33.63, 37.9, 47.14, 47.08, 60.09, 67.98, 51.83, 60.42, 76.41, 57.38, 48.85, 47.47, 43.96, 43.92, 33.78, 41.98, 42.7, 46.03, 57.82, 52.36, 53.08, 41.83, 42.22, 42.36, 41.39, 38.84, 44.94, 42.16, 31.62, 35.74, 47.37, 45.17, 44.44, 54.74, 55.15, 50.46, 59.78, 66.6, 54.02, 59.18, 50.83] },
      velocityScore: { '1D': -1.9, '1W': 3.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: 66, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 3.03, MEME: 6.07, RKNG: 3.18 },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 3, avgWeight: 3.69, proScore: 3.69, coverage: 1,
      price: 68.54, weeklyPrices: [85.43, 80.66, 73.19, 72.87, 68.54], weeklyChange: -19.77, dayChange: -5.94, sortRank: 0, periodReturns: { '1M': -35.3, 'YTD': -5.6, '6M': -12.2, '1Y': 28.8 },
      priceHistory: { '1D': [72.87, 68.49, 69.66, 68.68, 68.93, 69.52, 69.44, 69.59, 69.5, 69.93, 69.89, 70.04, 69.4, 69.89, 69.36, 69.28, 68.86, 68.26, 67.5, 67.44, 67.32, 67.68, 68.25, 68.54], '1W': [85.43, 80.66, 73.19, 72.87, 68.54], '1M': [119.7, 129.6, 133.09, 113.41, 105.65, 118.17, 107.73, 107.29, 93.6, 92.06, 88.71, 87.32, 97.56, 82.41, 87.57, 82.25, 85.43, 80.66, 73.19, 72.87, 68.54], 'YTD': [72.63, 90.56, 101.25, 116.37, 122.09, 93.27, 82.22, 86.4, 85.76, 93.86, 87.09, 90.74, 96.06, 83.99, 91.61, 86.91, 84.66, 69.85, 70.68, 72.96, 88.1, 129.6, 107.73, 88.71, 82.25, 68.54], '6M': [78.05, 83.47, 97.67, 115.77, 104.78, 104.55, 102.12, 82.51, 83.9, 86.92, 89.76, 89.11, 88.42, 73.82, 92.57, 88.57, 80.01, 71.88, 63.87, 82.55, 86.83, 119.7, 118.17, 88.71, 82.25, 68.54], '1Y': [53.22, 45.11, 42.5, 52.63, 58.92, 54.29, 51.79, 49.76, 44.95, 50.43, 45.22, 37.58, 41.19, 54.5, 56.94, 81.2, 95.69, 71.35, 80.06, 70.38, 67.89, 58.22, 55.51, 61.44, 79.05, 61.86, 78.05, 83.47, 97.67, 115.77, 104.78, 104.55, 101.79, 82.51, 83.9, 86.92, 89.76, 89.11, 88.42, 73.82, 92.57, 88.57, 80.01, 71.88, 63.87, 82.55, 86.83, 119.7, 118.17, 88.71, 82.25, 68.54] },
      velocityScore: { '1D': -4.2, '1W': 108.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$27B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.88, MEME: 6.11, RKNG: 2.07 },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 6.75, proScore: 4.5, coverage: 0.667,
      price: 1900, weeklyPrices: [1958.80, 2184.75, 2273.73, 1963.60, 1900.00], weeklyChange: -3, dayChange: -3.24, sortRank: 0, periodReturns: { '1M': 28.5, 'YTD': 700.4, '6M': 659.8, '1Y': 3913.5 },
      priceHistory: { '1D': [1963.6, 1939.49, 1975.87, 1961.4, 1940, 1956.48, 1945, 1943.72, 1919.03, 1925.52, 1917.98, 1928.99, 1933.77, 1931.5, 1927.67, 1917.4, 1910.55, 1893.62, 1873.99, 1885.07, 1878.2, 1875.03, 1889.95, 1900], '1W': [1958.8, 2184.75, 2273.73, 1963.6, 1900], '1M': [1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1900], 'YTD': [237.38, 334.54, 409.24, 503.44, 539.3, 576.2, 630.29, 621.09, 651.9, 565.59, 618.82, 753.69, 677.86, 692.73, 851.57, 891.72, 979.07, 1064.21, 1409.98, 1452.02, 1383.29, 1589.94, 1831.5, 1646.54, 1991.55, 1900], '6M': [250.08, 275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1547.56, 1333.01, 1589.55, 1716.36, 1646.54, 1991.55, 1900], '1Y': [47.34, 44.96, 46.2, 41.36, 43, 43.39, 42.1, 46.83, 44.58, 47.35, 53.01, 73.92, 93.97, 99.83, 121.12, 131.88, 144.3, 146.95, 204.36, 216.5, 271.58, 244.93, 220.5, 194.38, 232.86, 206.83, 250.08, 275.24, 377.41, 413.62, 470.8, 665.24, 597.95, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1547.56, 1333.01, 1589.55, 1716.36, 1646.54, 1991.55, 1900] },
      velocityScore: { '1D': 1.1, '1W': 5.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$281B', pe: 64.9, revenueGrowth: 251, eps: 29.26, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.17, RKNG: 7.34 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 5.81, proScore: 3.87, coverage: 0.667,
      price: 326.71, weeklyPrices: [284.99, 328.91, 345.85, 321.98, 326.71], weeklyChange: 14.64, dayChange: 1.47, sortRank: 0, periodReturns: { '1M': 8, 'YTD': 276, '6M': 255.6, '1Y': 1323.6 },
      priceHistory: { '1D': [321.98, 320.42, 339, 332.73, 326.74, 340.6, 340.6, 345.5, 341.63, 339.8, 337.5, 339.32, 335.95, 340.77, 335.46, 333.73, 330.07, 328.39, 323, 324, 325.63, 325, 325, 326.71], '1W': [284.99, 328.91, 345.85, 321.98, 326.71], '1M': [302.4, 293.8, 290.01, 285, 273.51, 302.85, 287.32, 291.37, 263.61, 253.57, 259.61, 234.23, 248.88, 260.22, 274.5, 280.88, 284.99, 328.91, 345.85, 321.98, 326.71], 'YTD': [86.89, 121.84, 139.17, 145.63, 156.51, 136.6, 139.03, 159, 168.57, 159.99, 157.17, 156.58, 150.22, 132.45, 160.13, 213.84, 229.75, 287.97, 285.47, 280.69, 261.34, 293.8, 287.32, 259.61, 280.88, 326.71], '6M': [91.88, 98.69, 134.07, 149.5, 139.62, 156.13, 155.17, 139.74, 160.28, 166, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 283.92, 258.71, 302.4, 302.85, 259.61, 280.88, 326.71], '1Y': [22.95, 22.13, 28.71, 24.69, 26.89, 37.62, 38.86, 41.25, 43.1, 49.94, 52.45, 62.96, 79.67, 69.18, 90.19, 87.58, 116.58, 94.37, 133.71, 141.41, 127.07, 104.97, 94.29, 102.5, 101.29, 76.97, 91.88, 98.69, 134.07, 149.5, 139.62, 156.13, 143.03, 139.74, 160.28, 166, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 283.92, 258.71, 302.4, 302.85, 259.61, 280.88, 326.71] },
      velocityScore: { '1D': 6.3, '1W': 20.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$93B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.94, RKNG: 4.68 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 2, avgWeight: 5.69, proScore: 3.79, coverage: 0.667,
      price: 627.49, weeklyPrices: [712.13, 746.23, 732.62, 670.75, 627.49], weeklyChange: -11.89, dayChange: -6.45, sortRank: 0, periodReturns: { '1M': 29.6, 'YTD': 264.2, '6M': 249.5, '1Y': 910.9 },
      priceHistory: { '1D': [670.75, 640.52, 654.98, 651.09, 640.03, 652.63, 654.75, 656.33, 651.12, 651.01, 644.37, 645.73, 645.44, 645.6, 640.26, 635.69, 634.88, 629.6, 621.17, 623.63, 620.95, 619.59, 625.93, 627.49], '1W': [712.13, 746.23, 732.62, 670.75, 627.49], '1M': [524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 627.49], 'YTD': [172.27, 187.68, 222.1, 243.29, 278.41, 260.19, 284.1, 284.67, 282.25, 259.03, 261.18, 304.9, 296.14, 297.73, 337.88, 365, 389.1, 412.76, 483.15, 488.74, 455.8, 530.6, 594.11, 517.72, 681.08, 627.49], '6M': [179.56, 187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 515.83, 458.68, 524.65, 563.1, 517.72, 681.08, 627.49], '1Y': [62.07, 63.84, 64.64, 66.53, 69.32, 71.43, 73.78, 75.91, 75.86, 79.71, 86, 95.02, 100.94, 109.69, 130.59, 121.18, 120.44, 120.47, 141.38, 160.1, 169.99, 152.86, 155.41, 155.59, 181.95, 166.26, 179.56, 187.7, 200.46, 221.51, 240.85, 270.23, 282.58, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 515.83, 458.68, 524.65, 563.1, 517.72, 681.08, 627.49] },
      velocityScore: { '1D': -2.1, '1W': 132.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$216B', pe: 37.6, revenueGrowth: 46, eps: 16.7, grossMargin: 45, dividendYield: 0.09,
      etfPresence: { BUZZ: false, MEME: 5.36, RKNG: 6.01 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 2, avgWeight: 5.57, proScore: 3.71, coverage: 0.667,
      price: 144.66, weeklyPrices: [167.34, 161.85, 171.23, 147.44, 144.66], weeklyChange: -13.55, dayChange: -1.88, sortRank: 0, periodReturns: { '1M': -20.3, 'YTD': 315, '6M': 252.8, '1Y': 521.1 },
      priceHistory: { '1D': [147.44, 142.64, 144.65, 141.7, 140.29, 144.01, 145.51, 145.58, 146.54, 145.68, 144.86, 145.72, 144.31, 145.24, 144.43, 143.41, 142.87, 142.48, 140.93, 141.8, 141.77, 142.62, 143.96, 144.66], '1W': [167.34, 161.85, 171.23, 147.44, 144.66], '1M': [177.62, 179.83, 169.02, 158.41, 185.67, 202.37, 184.07, 202.89, 177, 196.64, 162.88, 175.13, 172.78, 169.05, 191.55, 170.81, 167.34, 161.85, 171.23, 147.44, 144.66], 'YTD': [34.86, 33.01, 37, 38.15, 39.57, 38.13, 43.99, 46.98, 53.69, 101.14, 106.19, 92.63, 114.41, 86.35, 133.3, 142.55, 149.42, 152.83, 178.54, 188.28, 171.33, 179.83, 184.07, 162.88, 170.81, 144.66], '6M': [41, 39.6, 34.04, 37.04, 34.89, 44.16, 47.91, 44.46, 53.96, 102.51, 110.62, 94.07, 95.76, 85.19, 117.64, 146.39, 150.57, 137.26, 180.57, 184.9, 173.26, 177.62, 202.37, 162.88, 170.81, 144.66], '1Y': [23.29, 25.35, 27.92, 28.99, 26.31, 23.06, 23.23, 22.79, 22.77, 25.07, 23.02, 27.72, 29.47, 26.69, 28.42, 32.22, 32.95, 29.98, 35.48, 31.51, 23.75, 20.89, 22.73, 25.65, 34.98, 27.14, 41, 39.6, 34.04, 37.04, 34.89, 44.16, 44.3, 44.46, 53.96, 102.51, 110.62, 94.07, 95.76, 85.19, 117.64, 146.39, 150.57, 137.26, 180.57, 184.9, 173.26, 177.62, 202.37, 162.88, 170.81, 144.66] },
      velocityScore: { '1D': -4.9, '1W': -4.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 7.47, RKNG: 3.67 },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 2, avgWeight: 5.13, proScore: 3.42, coverage: 0.667,
      price: 1030.39, weeklyPrices: [1043.19, 1133.99, 1211.38, 1051.77, 1030.39], weeklyChange: -1.23, dayChange: -2.03, sortRank: 0, periodReturns: { '1M': 37.2, 'YTD': 261, '6M': 259.4, '1Y': 705.6 },
      priceHistory: { '1D': [1051.77, 1040, 1058.12, 1052.8, 1037.31, 1055.05, 1049.43, 1051.02, 1041.56, 1030.03, 1039.86, 1044.4, 1044.41, 1045.79, 1040.03, 1041.45, 1037.15, 1034.3, 1020.77, 1026.33, 1022.51, 1014.12, 1018.51, 1030.39], '1W': [1043.19, 1133.99, 1211.38, 1051.77, 1030.39], '1M': [895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1030.39], 'YTD': [285.41, 327.02, 336.63, 397.58, 435.79, 382.89, 413.97, 417.35, 415.56, 397.05, 405.35, 461.73, 382.09, 367.85, 421.51, 456.23, 487.48, 518.46, 666.59, 766.58, 698.74, 928.41, 1079.57, 935.89, 1020.76, 1030.39], '6M': [286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 795.33, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1030.39], '1Y': [127.91, 120.89, 122.24, 116.43, 109.83, 114.74, 108.78, 127.75, 122.05, 116.5, 118.72, 140, 159.99, 161.71, 182.15, 196.54, 191.94, 198.47, 226.63, 237.5, 241.11, 228.5, 224.53, 234.16, 263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 795.33, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1030.39] },
      velocityScore: { '1D': 2.4, '1W': 8.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 48.7, revenueGrowth: 196, eps: 21.14, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { BUZZ: 4.32, MEME: false, RKNG: 5.94 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'LITE', name: 'LITE', easyScore: 2, avgWeight: 4.42, proScore: 2.94, coverage: 0.667,
      price: 843.47, weeklyPrices: [869.98, 850.00, 893.93, 827.92, 843.47], weeklyChange: -3.05, dayChange: 1.88, sortRank: 0, periodReturns: { '1M': -10.9, 'YTD': 128.8, '6M': 113, '1Y': 818.7 },
      priceHistory: { '1D': [827.92, 810, 833.91, 824, 825.34, 838.04, 850.42, 852.61, 847.42, 845.33, 845.37, 848.76, 847.02, 850.88, 847.81, 843.78, 840.42, 839.21, 832.57, 835.62, 833.88, 835.52, 839.6, 843.47], '1W': [869.98, 850, 893.93, 827.92, 843.47], '1M': [910.81, 902.31, 860.62, 854.96, 905, 1029.15, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93, 827.92, 843.47], 'YTD': [368.59, 348.26, 343.27, 354.49, 381.44, 504.42, 583.46, 635.64, 677, 650.82, 616.09, 700.81, 777.17, 764.65, 894.13, 824.01, 873.6, 858.32, 944.28, 992.37, 890.09, 902.31, 938, 821.76, 875.36, 843.47], '6M': [395.92, 386.11, 351.42, 324.25, 332.45, 423.42, 577.15, 562.74, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 1053.09, 884.98, 910.81, 1029.15, 821.76, 875.36, 843.47], '1Y': [91.81, 91.49, 90.44, 99.63, 102.13, 109.85, 110.01, 119.66, 117.96, 124.62, 134.12, 164.88, 163.34, 152.75, 171.4, 163.09, 156.57, 158.06, 214.28, 232.75, 252.47, 247.43, 291.27, 302.98, 366, 320.25, 395.92, 386.11, 351.42, 324.25, 332.45, 423.42, 551.99, 562.74, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 1053.09, 884.98, 910.81, 1029.15, 821.76, 875.36, 843.47] },
      velocityScore: { '1D': -0.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$66B', pe: 147.7, revenueGrowth: 90, eps: 5.71, grossMargin: 41, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.86, RKNG: 2.97 },
      tonyNote: 'LITE appears in 2 of 3 Meme ETFs (67% coverage) with average weight 4.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'CRDO', easyScore: 2, avgWeight: 4.33, proScore: 2.88, coverage: 0.667,
      price: 267.47, weeklyPrices: [249.33, 271.83, 302.52, 272.01, 267.47], weeklyChange: 7.28, dayChange: -1.67, sortRank: 0, periodReturns: { '1M': 22.5, 'YTD': 85.9, '6M': 78.1, '1Y': 191 },
      priceHistory: { '1D': [272, 268.94, 271.55, 273.17, 268.72, 274.48, 271.86, 273.07, 271.52, 273.44, 270.96, 271.23, 269.86, 268.79, 268.2, 267.86, 267.21, 265.67, 265.06, 265.51, 264.82, 264.67, 266, 267.47], '1W': [249.33, 271.83, 302.52, 272.01, 267.47], '1M': [221.64, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 217.5, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83, 302.52, 272.01, 267.47], 'YTD': [143.89, 141.59, 149.12, 135.1, 129.47, 98.06, 121.78, 130.66, 114.48, 114.74, 111.57, 101.72, 103.91, 95.92, 107.93, 168.35, 189.49, 175.77, 198.29, 198.57, 168.99, 221.23, 214.6, 234.32, 239.18, 267.47], '6M': [150.19, 143.22, 150.42, 150.97, 128.02, 119.96, 123.41, 121.44, 124.05, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 210.22, 156.27, 221.64, 229, 234.32, 239.18, 267.47], '1Y': [91.92, 87.59, 97.59, 101.19, 98.41, 116.01, 117.34, 125.38, 106.3, 120.1, 124.77, 163.96, 164.44, 149.38, 144.91, 148.87, 131.41, 137.2, 171.52, 173.16, 158.5, 139.56, 154.18, 189.19, 157.98, 134.13, 150.19, 143.22, 150.42, 150.97, 128.02, 119.96, 111.4, 121.44, 124.05, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 210.22, 156.27, 221.64, 229, 234.32, 239.18, 267.47] },
      velocityScore: { '1D': 76.7, '1W': 0.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$50B', pe: 107, revenueGrowth: 157, eps: 2.5, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.54, RKNG: 5.11 },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 2, avgWeight: 4.08, proScore: 2.72, coverage: 0.667,
      price: 54.13, weeklyPrices: [54.69, 56.55, 58.32, 57.85, 54.13], weeklyChange: -1.03, dayChange: -6.43, sortRank: 0, periodReturns: { '1M': -14.9, 'YTD': 20.6, '6M': 8.6, '1Y': 32.5 },
      priceHistory: { '1D': [57.85, 53.88, 55.64, 54.84, 53.7, 54.23, 53.95, 53.92, 53.86, 54.04, 53.89, 54.47, 54.22, 54.62, 54.78, 54.19, 53.98, 53.19, 52.97, 53.16, 53.23, 53.25, 53.75, 54.13], '1W': [54.69, 56.55, 58.32, 57.85, 54.13], '1M': [63.62, 65.4, 70.14, 72.07, 69.28, 71.4, 68.23, 65.66, 56.78, 62.8, 56.69, 56.63, 57.99, 57.85, 61.18, 56.06, 54.69, 56.55, 58.32, 57.85, 54.13], 'YTD': [44.87, 50.45, 47.56, 49.33, 43.24, 30.43, 31.3, 33.43, 40.88, 36.02, 33.03, 32.38, 31.96, 27.79, 28.08, 43.25, 47.36, 42.11, 52.57, 55.87, 48.44, 65.4, 68.23, 56.69, 56.06, 54.13], '6M': [49.82, 46.77, 49.45, 50.8, 43.37, 38.56, 35.48, 34.11, 30.78, 38.34, 35.87, 33.29, 33.11, 26.59, 28.49, 35.76, 46.28, 43.08, 48, 56.89, 49.31, 63.62, 71.4, 56.69, 56.06, 54.13], '1Y': [40.86, 40.1, 45.56, 43.54, 43.28, 39.88, 41.23, 43, 36.8, 40.75, 40.97, 43.86, 65.44, 73.86, 63.09, 74.3, 72.41, 55.45, 61.11, 55.41, 54.42, 49.12, 47.06, 48.65, 51.67, 45.85, 49.82, 46.77, 49.45, 50.8, 43.37, 38.56, 34.99, 34.11, 30.78, 38.34, 35.87, 33.29, 33.11, 26.59, 28.49, 35.76, 46.28, 43.08, 48, 56.89, 49.31, 63.62, 71.4, 56.69, 56.06, 54.13] },
      velocityScore: { '1D': 6.7, '1W': 17.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$20B', pe: 138.8, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: 1.78, MEME: 6.37, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'RGTI', name: 'Rigetti Computing', easyScore: 2, avgWeight: 3.17, proScore: 2.12, coverage: 0.667,
      price: 19.66, weeklyPrices: [20.25, 21.36, 21.38, 21.28, 19.66], weeklyChange: -2.86, dayChange: -7.59, sortRank: 0, periodReturns: { '1M': -25.6, 'YTD': -11.2, '6M': -19.8, '1Y': 71 },
      priceHistory: { '1D': [21.28, 19.8, 20.31, 20, 19.71, 19.95, 19.84, 19.88, 19.87, 19.98, 19.84, 19.95, 19.83, 19.89, 19.88, 19.7, 19.59, 19.33, 19.24, 19.3, 19.35, 19.31, 19.49, 19.66], '1W': [20.25, 21.36, 21.38, 21.28, 19.66], '1M': [25.07, 24.62, 27.03, 25.54, 25.63, 26.88, 24.09, 24.16, 20.68, 21.76, 19.69, 19.44, 20.63, 20.98, 22.7, 20.64, 20.25, 21.36, 21.38, 21.28, 19.66], 'YTD': [22.15, 25.25, 24.7, 24.96, 19.85, 14.98, 14.99, 16.6, 18.64, 16.97, 16.07, 15.67, 15.14, 13.5, 14.31, 19.11, 18.38, 16.08, 20.09, 19.07, 15.96, 24.62, 24.09, 19.69, 20.64, 19.66], '6M': [24.51, 23.6, 24.72, 25.62, 21.76, 17.71, 17.59, 16.09, 16.02, 17.69, 17.6, 16.14, 15.88, 12.9, 13.84, 16.87, 18.25, 16.39, 18.27, 20.51, 16.62, 25.07, 26.88, 19.69, 20.64, 19.66], '1Y': [11.5, 11.33, 13.51, 16.56, 16.14, 14.17, 15.99, 16.2, 15.16, 15.3, 15.04, 16.19, 21.99, 31.64, 29.85, 43.23, 56.34, 36.06, 39.41, 37.29, 31.4, 25.71, 26.08, 26.04, 26.12, 22.47, 24.51, 23.6, 24.72, 25.62, 21.76, 17.71, 17.71, 16.09, 16.02, 17.69, 17.6, 16.14, 15.88, 12.9, 13.84, 16.87, 18.25, 16.39, 18.27, 20.51, 16.62, 25.07, 26.88, 19.69, 20.64, 19.66] },
      velocityScore: { '1D': 3.9, '1W': -2.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 199, eps: -0.89, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.44, RKNG: 2.91 },
      tonyNote: 'Rigetti Computing is a quantum hardware company using superconducting qubit technology. It holds a position in Meme ETFs alongside IonQ and D-Wave as part of the quantum computing basket. Revenue is minimal, the technology is earlier-stage than IonQ, and the ETF allocation is speculative. The weight score is low; this is a high-risk, long-duration positioning.',
    },
    {
      ticker: 'GOOGL', name: 'GOOGL', easyScore: 2, avgWeight: 2.1, proScore: 1.4, coverage: 0.667,
      price: 345.83, weeklyPrices: [363.79, 368.03, 349.68, 346.13, 345.83], weeklyChange: -4.94, dayChange: -0.07, sortRank: 0, periodReturns: { '1M': -9.7, 'YTD': 10.5, '6M': 10.1, '1Y': 107.4 },
      priceHistory: { '1D': [346.09, 348.44, 348.62, 350.64, 349.73, 350.34, 352.66, 353.21, 350.87, 351.02, 350.68, 350.56, 350.22, 350.6, 349.57, 348.79, 349.46, 349.02, 349.25, 348.73, 348.79, 349.27, 348.52, 345.83], '1W': [363.79, 368.03, 349.68, 346.13, 345.83], '1M': [388.88, 388.83, 390.13, 380.34, 376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68, 369.35, 373.25, 363.79, 368.03, 349.68, 346.13, 345.83], 'YTD': [313, 325.44, 332.78, 330.54, 338.25, 331.25, 309, 302.85, 307.38, 300.88, 303.55, 307.69, 290.93, 297.39, 318.49, 337.12, 339.32, 349.94, 398.04, 387.35, 387.66, 388.83, 358.99, 364.26, 373.25, 345.83], '6M': [314.09, 315.15, 328.57, 330, 333.26, 343.69, 324.32, 305.72, 311.49, 306.52, 306.36, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 388.43, 388.64, 396.94, 388.88, 361.85, 364.26, 373.25, 345.83], '1Y': [166.77, 175.84, 176.62, 182.97, 190.23, 196.53, 196.09, 203.34, 201.57, 207.14, 230.66, 239.17, 249.53, 247.14, 244.9, 244.62, 251.03, 251.69, 274.57, 284.31, 291.31, 284.28, 323.44, 319.63, 320.21, 296.72, 314.09, 315.15, 328.57, 330, 333.26, 343.69, 322.86, 305.72, 311.49, 306.52, 306.36, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 388.43, 388.64, 396.94, 388.88, 361.85, 364.26, 373.25, 345.83] },
      velocityScore: { '1D': -2.1, '1W': -4.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.2T', pe: 26.4, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { BUZZ: 1.54, MEME: false, RKNG: 2.67 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'RDW', name: 'Redwire', easyScore: 1, avgWeight: 6.15, proScore: 2.05, coverage: 0.333,
      price: 11.63, weeklyPrices: [14.36, 14.35, 13.02, 12.22, 11.63], weeklyChange: -19.05, dayChange: -4.87, sortRank: 0, periodReturns: { '1M': -33.5, 'YTD': 53, '6M': 48.7, '1Y': -29.7 },
      priceHistory: { '1D': [12.22, 11.59, 11.77, 11.63, 11.58, 11.72, 11.76, 11.74, 11.78, 11.85, 11.83, 11.86, 11.78, 11.8, 11.63, 11.67, 11.64, 11.58, 11.47, 11.52, 11.48, 11.49, 11.57, 11.63], '1W': [14.36, 14.35, 13.02, 12.22, 11.63], '1M': [22.04, 24, 25.9, 24.57, 20.68, 20.58, 18.62, 21.43, 18.45, 18.57, 15.75, 14.87, 17.09, 15.12, 14.83, 13.5, 14.36, 14.35, 13.02, 12.22, 11.63], 'YTD': [7.6, 10.28, 10.86, 11.98, 12.81, 8.8, 7.89, 8.6, 9.55, 9.07, 9.48, 9.55, 9.16, 9.08, 9.22, 9.91, 11.93, 8.6, 9.64, 11.56, 13.91, 24, 18.62, 15.75, 13.5, 11.63], '6M': [7.82, 9.03, 10.98, 11.71, 10.96, 10.88, 10.09, 8.02, 8.12, 9.52, 9.65, 9.54, 9.38, 7.71, 9.65, 9.81, 10.31, 9.04, 8.69, 12.16, 13.96, 22.04, 20.58, 15.75, 13.5, 11.63], '1Y': [16.53, 15.31, 15.78, 17.5, 16.92, 14.06, 13.7, 9.42, 8.84, 9.29, 8.32, 8.23, 7.87, 9.35, 9.16, 9.79, 8.94, 7.64, 7.85, 7.3, 6.13, 5.43, 5.41, 5.57, 7.48, 6.44, 7.82, 9.03, 10.98, 11.71, 10.96, 10.88, 10.04, 8.02, 8.12, 9.52, 9.65, 9.54, 9.38, 7.71, 9.65, 9.81, 10.31, 9.04, 8.69, 12.16, 13.96, 22.04, 20.58, 15.75, 13.5, 11.63] },
      velocityScore: { '1D': -9.7, '1W': 6.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2B', pe: null, revenueGrowth: 58, eps: -2.59, grossMargin: 13, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.15, RKNG: false },
      tonyNote: 'Redwire Corp is a space infrastructure company — solar arrays, structures, and manufacturing in orbit. It appears in Meme and speculative ETFs as a high-risk space economy play. Revenue is growing from a small base but the business is pre-profitability; the ETF weight is minimal and reflects thematic positioning rather than fundamental conviction.',
    },
    {
      ticker: 'QBTS', name: 'D-Wave Quantum', easyScore: 1, avgWeight: 6.13, proScore: 2.04, coverage: 0.333,
      price: 23.13, weeklyPrices: [22.92, 24.69, 24.47, 25.03, 23.13], weeklyChange: 0.92, dayChange: -7.59, sortRank: 0, periodReturns: { '1M': -21.3, 'YTD': -11.5, '6M': -16, '1Y': 54.5 },
      priceHistory: { '1D': [25.03, 23.3, 23.82, 23.56, 23.08, 23.31, 23.09, 23.19, 23.17, 23.32, 23.18, 23.27, 23.19, 23.25, 23.28, 23.04, 22.85, 22.66, 22.64, 22.67, 22.66, 22.72, 22.92, 23.13], '1W': [22.92, 24.69, 24.47, 25.03, 23.13], '1M': [27.82, 27.48, 29.49, 30.14, 29.18, 29.91, 27.55, 27.64, 23.85, 25.83, 23.52, 23.25, 23.82, 23.37, 26.26, 23.94, 22.92, 24.69, 24.47, 25.03, 23.13], 'YTD': [26.15, 29.28, 28.72, 27.43, 23.22, 17.21, 18.82, 19.38, 20.14, 18.83, 17.83, 16.49, 16.19, 13.7, 13.87, 20.81, 21.24, 18.27, 23.83, 22.35, 18.19, 27.48, 27.55, 23.52, 23.94, 23.13], '6M': [27.52, 28.13, 28.11, 28.83, 23.75, 20.97, 21.21, 19.67, 18.05, 18.94, 19.04, 17.46, 16.31, 12.98, 13.74, 16.97, 20.36, 18.11, 21.54, 24.03, 19.06, 27.82, 29.91, 23.52, 23.94, 23.13], '1Y': [14.97, 14.82, 16.39, 16.91, 20.3, 17.06, 17.58, 18.51, 15.32, 15.45, 15.3, 16.04, 22.54, 27.72, 25.63, 34.25, 44.78, 27.29, 34.26, 31.02, 28.99, 22.93, 22.59, 25.08, 26.8, 23.8, 27.52, 28.13, 28.11, 28.83, 23.75, 20.97, 20.72, 19.67, 18.05, 18.94, 19.04, 17.46, 16.31, 12.98, 13.74, 16.97, 20.36, 18.11, 21.54, 24.03, 19.06, 27.82, 29.91, 23.52, 23.94, 23.13] },
      velocityScore: { '1D': 7.4, '1W': 12.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: -81, eps: -1.14, grossMargin: 66, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.13, RKNG: false },
      tonyNote: 'D-Wave Quantum is a quantum computing company — the only publicly traded business built around quantum annealing hardware. Revenue is minimal and profitability is many years away, but it holds a position in Meme ETFs as the purest-play quantum computing stock available to retail investors. The ETF weight is small and the position is purely thematic.',
    },
    {
      ticker: 'NVTS', name: 'Navitas Semiconductor', easyScore: 1, avgWeight: 5.24, proScore: 1.75, coverage: 0.333,
      price: 18.09, weeklyPrices: [22.34, 24.02, 23.70, 21.40, 18.09], weeklyChange: -19, dayChange: -15.44, sortRank: 0, periodReturns: { '1M': -38.1, 'YTD': 153.4, '6M': 136.2, '1Y': 146.2 },
      priceHistory: { '1D': [21.4, 19.69, 19.8, 19.32, 18.76, 19.11, 18.99, 18.82, 18.72, 18.83, 18.65, 18.75, 18.55, 18.6, 18.47, 18.33, 18.27, 18.12, 17.92, 17.92, 17.89, 17.82, 18.14, 18.09], '1W': [22.34, 24.02, 23.7, 21.4, 18.09], '1M': [31.79, 28.88, 28.51, 26.6, 24.86, 25.86, 30.84, 30.67, 25.08, 24.48, 22.85, 20.5, 22.21, 23.39, 23.73, 22.09, 22.34, 24.02, 23.7, 21.4, 18.09], 'YTD': [7.14, 10.06, 10, 11.29, 9.46, 7.43, 8.37, 8.08, 9.51, 8.96, 9.98, 9.06, 9.48, 8.54, 9.42, 10.26, 18.47, 15.48, 16.68, 19.25, 19.43, 28.88, 30.84, 22.85, 22.09, 18.09], '6M': [7.66, 8.38, 10.07, 10.91, 9.38, 8.62, 9.22, 8.3, 8.12, 9.55, 8.38, 10.49, 9.18, 7.83, 8.57, 9.87, 15.33, 15.12, 17.55, 22.65, 19.67, 31.79, 25.86, 22.85, 22.09, 18.09], '1Y': [7.35, 6.27, 6.43, 6.15, 8.82, 7.21, 6.35, 6.96, 6.43, 6.09, 5.73, 5.64, 6.46, 6.86, 7.3, 7.74, 15.16, 13.6, 13.57, 9.86, 9.12, 7.78, 8.03, 8.69, 9.12, 7.38, 7.66, 8.38, 10.07, 10.91, 9.38, 8.62, 8.86, 8.3, 8.12, 9.55, 8.38, 10.49, 9.18, 7.83, 8.57, 9.87, 15.33, 15.12, 17.55, 22.65, 19.67, 31.79, 25.86, 22.85, 22.09, 18.09] },
      velocityScore: { '1D': 3.6, '1W': -43, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 5.24 },
      tonyNote: 'Navitas Semiconductor is a small-cap wide-bandgap power semiconductor name — gallium nitride and silicon carbide for fast charging and EV applications. The $26.60 share price and small market cap position it as a speculative holding in ETFs willing to take higher-risk bets on next-generation power conversion.',
    },
    {
      ticker: 'WULF', name: 'WULF', easyScore: 1, avgWeight: 4.35, proScore: 1.45, coverage: 0.333,
      price: 26.61, weeklyPrices: [27.86, 28.98, 28.31, 28.78, 26.61], weeklyChange: -4.49, dayChange: -7.54, sortRank: 0, periodReturns: { '1M': 16.6, 'YTD': 131.6, '6M': 116.2, '1Y': 593 },
      priceHistory: { '1D': [28.78, 27.49, 28.52, 28.33, 27.93, 28.05, 27.92, 27.69, 27.52, 27.71, 27.7, 27.8, 27.73, 27.89, 27.67, 27.51, 27.38, 27.25, 27.01, 26.73, 26.49, 26.5, 26.59, 26.61], '1W': [27.86, 28.98, 28.31, 28.78, 26.61], '1M': [25.18, 26.74, 26.4, 25.56, 25.66, 26.49, 26.16, 26.19, 24, 25.86, 25.3, 23.19, 25.35, 26.06, 28.17, 28.01, 27.86, 28.98, 28.31, 28.78, 26.61], 'YTD': [11.49, 12.84, 13.83, 12.89, 14.54, 11.92, 15.91, 15.47, 17.88, 15.23, 14.67, 15.3, 16.86, 14.48, 19.03, 19.67, 20.55, 20.02, 25.74, 22.8, 21.34, 26.74, 26.16, 25.3, 28.01, 26.61], '6M': [12.31, 12.74, 13.1, 13.85, 13.79, 13.44, 16.65, 16.26, 15.68, 16.02, 13.85, 16.41, 16.19, 13.7, 16.57, 20.95, 19.77, 20.8, 23.49, 23.37, 21.14, 25.18, 26.49, 25.3, 28.01, 26.61], '1Y': [3.84, 4.44, 4.93, 5.25, 5.2, 5.01, 5.15, 5.24, 8.78, 9.24, 8.98, 10.55, 11.35, 11.4, 11.47, 12.3, 15.47, 12.62, 14.5, 15.36, 12.37, 12, 13.94, 14.43, 15.76, 11.57, 12.31, 12.74, 13.1, 13.85, 13.79, 13.44, 14.29, 16.26, 15.68, 16.02, 13.85, 16.41, 16.19, 13.7, 16.57, 20.95, 19.77, 20.8, 23.49, 23.37, 21.14, 25.18, 26.49, 25.3, 28.01, 26.61] },
      velocityScore: { '1D': -0.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: null, revenueGrowth: -1, eps: -2.51, grossMargin: 64, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.35 },
      tonyNote: 'WULF appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AXTI', name: 'AXT Inc', easyScore: 1, avgWeight: 4.33, proScore: 1.44, coverage: 0.333,
      price: 68.52, weeklyPrices: [92.11, 84.57, 92.44, 77.91, 68.52], weeklyChange: -25.62, dayChange: -12.06, sortRank: 0, periodReturns: { '1M': -51.3, 'YTD': 319.1, '6M': 356.5, '1Y': 3291.8 },
      priceHistory: { '1D': [77.91, 72.23, 71.64, 69.75, 68.23, 69.64, 70.55, 72.6, 73.08, 72.24, 71.15, 71.16, 70.62, 70.62, 69.53, 68.73, 68.44, 68.25, 67.82, 67.97, 68.01, 68.07, 68.67, 68.52], '1W': [92.11, 84.57, 92.44, 77.91, 68.52], '1M': [132.6, 122.77, 115.7, 103.16, 109.55, 110.85, 106.7, 105.99, 89.04, 90.78, 78.36, 85.29, 88.34, 97.18, 110.74, 93.04, 92.11, 84.57, 92.44, 77.91, 68.52], 'YTD': [16.35, 25.83, 25.72, 17.92, 16.38, 20.43, 24.79, 23.81, 37.12, 38.8, 46.73, 48.76, 67.35, 47.14, 63.12, 62.93, 86.94, 71.07, 104.83, 122.9, 112.88, 122.77, 106.7, 78.36, 93.04, 68.52], '6M': [15.01, 16.76, 22.99, 22.09, 17.8, 20.94, 27.77, 24.24, 28.43, 46.32, 38.56, 48.39, 64.44, 52.73, 45.46, 67.3, 74.97, 68.71, 107.55, 125.81, 105.88, 132.6, 110.85, 78.36, 93.04, 68.52], '1Y': [2.02, 2.01, 2.54, 2.39, 2.52, 2.12, 2.07, 2.23, 2.14, 2.77, 3.08, 3.36, 3.94, 4.83, 4.91, 5.31, 4.59, 4.94, 7.07, 9.1, 10.56, 9.9, 9.23, 11.48, 15.51, 12.36, 15.01, 16.76, 22.99, 22.09, 17.8, 20.94, 24.06, 24.24, 28.43, 46.32, 38.56, 48.39, 64.44, 52.73, 45.46, 67.3, 74.97, 68.71, 107.55, 125.81, 105.88, 132.6, 110.85, 78.36, 93.04, 68.52] },
      velocityScore: { '1D': -2.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: null, revenueGrowth: 39, eps: -0.32, grossMargin: 21, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.33, RKNG: false },
      tonyNote: 'AXT Inc is a compound semiconductor substrate manufacturer — gallium arsenide, indium phosphide, and germanium wafers used in data center optical transceivers, 5G RF chips, and solar cells. Revenue is growing with optical networking demand. Small market cap but positioned at a genuine supply-chain chokepoint for III-V semiconductor materials.',
    },
    {
      ticker: 'LRCX', name: 'LRCX', easyScore: 1, avgWeight: 4.02, proScore: 1.34, coverage: 0.333,
      price: 367.65, weeklyPrices: [374.18, 389.04, 409.54, 371.33, 367.65], weeklyChange: -1.75, dayChange: -0.99, sortRank: 0, periodReturns: { '1M': 20.4, 'YTD': 114.8, '6M': 107.3, '1Y': 284.5 },
      priceHistory: { '1D': [371.33, 365.88, 369.25, 371.61, 368.33, 371.61, 375.58, 373.17, 369.18, 368.81, 368.67, 369.76, 369.96, 370.49, 369.45, 368.33, 367.47, 366.78, 362.76, 363.04, 364.94, 364.05, 365.7, 367.65], '1W': [374.18, 389.04, 409.54, 371.33, 367.65], '1M': [322.68, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04, 409.54, 371.33, 367.65], 'YTD': [171.18, 200.96, 217.47, 220.7, 248.17, 213.31, 231.29, 237.39, 239.07, 214.68, 209.49, 224.71, 233.45, 222.01, 258.76, 265.16, 265.55, 248.75, 297.17, 289.24, 273.38, 318.93, 343.71, 327.16, 369.34, 367.65], '6M': [177.33, 185.06, 218.36, 222.96, 222.87, 237.5, 229.28, 235.53, 242.27, 231, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 296.05, 277.96, 322.68, 334.41, 327.16, 369.34, 367.65], '1Y': [95.63, 96.81, 99.81, 100.37, 97.1, 99.09, 95.94, 105.28, 100.33, 103.63, 97.74, 107.36, 121.9, 128.32, 142.79, 142.54, 144.78, 141.25, 160.67, 165.05, 159.18, 143.24, 151.93, 159.75, 168.26, 154.98, 177.33, 185.06, 218.36, 222.96, 222.87, 237.5, 231.01, 235.53, 242.27, 231, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 296.05, 277.96, 322.68, 334.41, 327.16, 369.34, 367.65] },
      velocityScore: { '1D': -0.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$460B', pe: 69.8, revenueGrowth: 24, eps: 5.27, grossMargin: 50, dividendYield: 0.28,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.02 },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
