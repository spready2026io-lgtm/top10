// ── Index chart types & data ──────────────────────────────────────────────────

export type Period = '1W' | '1M' | '6M' | '1Y';

export type ChartPeriodData = {
  top10: number[];
  spy: number[];
  top10Return: number;
  spyReturn: number;
  xLabels: string[];
};

// Deterministic path generator — no randomness, same shape every render.
// Creates a realistic trending path with sin/cos noise that decays near the end.
function makePath(n: number, finalReturn: number, seed: number): number[] {
  const target = 100 + finalReturn;
  const pts: number[] = [100];
  let cur = 100;
  for (let i = 1; i < n; i++) {
    const remaining = n - i;
    const drift     = (target - cur) / remaining * 0.38;
    // Noise amplitude proportional to return magnitude, decays toward the end
    const decay   = 1 - (i / n) * 0.55;
    const noise   = (Math.sin(i * 1.87 + seed) * Math.cos(i * 0.73 + seed * 1.1))
                    * Math.max(0.15, Math.abs(finalReturn) * 0.11) * decay;
    cur = parseFloat((cur + drift + noise).toFixed(2));
    pts.push(cur);
  }
  pts[n - 1] = parseFloat(target.toFixed(2));
  return pts;
}

const N: Record<Period, number> = { '1W': 5, '1M': 21, '6M': 26, '1Y': 52 };

const XLABELS: Record<Period, string[]> = {
  '1W': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  '1M': ['May 1', 'May 8', 'May 15', 'May 22', 'Jun 1'],
  '6M': ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
  '1Y': ["May '25", 'Aug', 'Nov', "Feb '26", "May '26"],
};

// S&P 500 returns — same across all sectors (it is what it is)
export const SPY_RET: Record<Period, number> = { '1W': 1.2, '1M': 3.6, '6M': 10.4, '1Y': 18.8 };

// Top10 composite returns per sector per period
const TOP10_RET: Record<Sector, Record<Period, number>> = {
  Technology:  { '1W': 1.4,  '1M': 6.2,  '6M': 18.4, '1Y': 34.8 },
  Financials:  { '1W': 1.3,  '1M': 4.1,  '6M': 12.8, '1Y': 22.4 },
  Energy:      { '1W': 2.9,  '1M': 8.4,  '6M': 16.2, '1Y': 28.6 },
  Healthcare:  { '1W': -0.4, '1M': -2.1, '6M': 4.8,  '1Y': 10.2 },
  Industrials: { '1W': 1.7,  '1M': 5.2,  '6M': 14.8, '1Y': 24.2 },
};

const SECTOR_SEED: Record<Sector, number> = {
  Technology: 7, Financials: 19, Energy: 31, Healthcare: 43, Industrials: 57,
};

export const INDEX_CHART_DATA: Record<Sector, Record<Period, ChartPeriodData>> = (() => {
  const out = {} as Record<Sector, Record<Period, ChartPeriodData>>;
  for (const sector of ['Technology', 'Financials', 'Energy', 'Healthcare', 'Industrials'] as Sector[]) {
    out[sector] = {} as Record<Period, ChartPeriodData>;
    for (const p of ['1W', '1M', '6M', '1Y'] as Period[]) {
      out[sector][p] = {
        top10:       makePath(N[p], TOP10_RET[sector][p], SECTOR_SEED[sector]),
        spy:         makePath(N[p], SPY_RET[p], 42),
        top10Return: TOP10_RET[sector][p],
        spyReturn:   SPY_RET[p],
        xLabels:     XLABELS[p],
      };
    }
  }
  return out;
})();

// ── Types ─────────────────────────────────────────────────────────────────────

export type Sector = 'Technology' | 'Financials' | 'Energy' | 'Healthcare' | 'Industrials';

export type Equity = {
  ticker: string;
  name: string;
  easyScore: number;
  proScore: number;
  price: number;
  weeklyPrices: number[];
  weeklyChange: number;
  sortRank: number;
  marketCap: string;
  pe: number | null;
  revenueGrowth: number;
  eps: number;
  grossMargin: number;
  dividendYield: number | null;
  etfPresence: Record<string, boolean>;
  tonyNote: string;
};

// ── Sector configuration ──────────────────────────────────────────────────────

export const SECTORS: Sector[] = ['Technology', 'Financials', 'Energy', 'Healthcare', 'Industrials'];

export const SECTOR_ETFS: Record<Sector, string[]> = {
  Technology:  ['XLK', 'VGT', 'QQQ', 'IYW', 'SMH'],
  Financials:  ['XLF', 'VFH', 'KBWB', 'IYF', 'FNCL'],
  Energy:      ['XLE', 'VDE', 'FENY', 'IYE', 'OIH'],
  Healthcare:  ['XLV', 'VHT', 'RSPH', 'IYH', 'FHLC'],
  Industrials: ['XLI', 'VIS', 'PAVE', 'IYJ', 'FIDU'],
};

// Benchmark label shown in the validation strip (primary sector ETF)
export const SECTOR_BENCHMARK_ETF: Record<Sector, string> = {
  Technology:  'XLK',
  Financials:  'XLF',
  Energy:      'XLE',
  Healthcare:  'XLV',
  Industrials: 'XLI',
};

// Weekly return of the primary sector ETF — used as benchmark in validation strip
export const SECTOR_BENCHMARKS: Record<Sector, number> = {
  Technology:  1.0,
  Financials:  0.9,
  Energy:      2.4,
  Healthcare: -0.8,
  Industrials: 1.1,
};

// Multi-period returns — one entry per tracked ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // Technology
  XLK:  { '1W': 1.0,  '1M': 4.8,  '6M': 15.2, '1Y': 28.4 },
  VGT:  { '1W': 1.1,  '1M': 5.2,  '6M': 16.8, '1Y': 30.2 },
  QQQ:  { '1W': 1.3,  '1M': 5.6,  '6M': 17.4, '1Y': 31.8 },
  IYW:  { '1W': 1.0,  '1M': 4.6,  '6M': 14.8, '1Y': 27.6 },
  SMH:  { '1W': 1.8,  '1M': 7.2,  '6M': 20.4, '1Y': 36.2 },
  // Financials
  XLF:  { '1W': 0.9,  '1M': 3.2,  '6M': 10.6, '1Y': 18.2 },
  VFH:  { '1W': 0.8,  '1M': 3.0,  '6M': 10.2, '1Y': 17.8 },
  KBWB: { '1W': 1.2,  '1M': 4.0,  '6M': 12.4, '1Y': 21.6 },
  IYF:  { '1W': 0.9,  '1M': 3.4,  '6M': 11.0, '1Y': 19.0 },
  FNCL: { '1W': 0.8,  '1M': 3.1,  '6M': 10.4, '1Y': 17.6 },
  // Energy
  XLE:  { '1W': 2.4,  '1M': 6.8,  '6M': 12.4, '1Y': 22.6 },
  VDE:  { '1W': 2.3,  '1M': 6.5,  '6M': 12.0, '1Y': 22.0 },
  FENY: { '1W': 2.4,  '1M': 6.7,  '6M': 12.2, '1Y': 22.4 },
  IYE:  { '1W': 2.3,  '1M': 6.6,  '6M': 12.1, '1Y': 22.2 },
  OIH:  { '1W': 3.2,  '1M': 9.4,  '6M': 16.8, '1Y': 28.4 },
  // Healthcare
  XLV:  { '1W': -0.8, '1M': -1.6, '6M': 2.4,  '1Y': 8.4  },
  VHT:  { '1W': -0.7, '1M': -1.4, '6M': 2.8,  '1Y': 9.0  },
  RSPH: { '1W': -1.1, '1M': -2.4, '6M': 1.2,  '1Y': 6.2  },
  IYH:  { '1W': -0.8, '1M': -1.7, '6M': 2.2,  '1Y': 8.0  },
  FHLC: { '1W': -0.7, '1M': -1.5, '6M': 2.6,  '1Y': 8.8  },
  // Industrials
  XLI:  { '1W': 1.1,  '1M': 4.0,  '6M': 12.2, '1Y': 20.8 },
  VIS:  { '1W': 1.0,  '1M': 3.8,  '6M': 11.8, '1Y': 20.4 },
  PAVE: { '1W': 1.4,  '1M': 5.2,  '6M': 14.6, '1Y': 24.8 },
  IYJ:  { '1W': 1.1,  '1M': 4.0,  '6M': 12.0, '1Y': 20.6 },
  FIDU: { '1W': 1.0,  '1M': 3.9,  '6M': 11.6, '1Y': 20.0 },
};

// ── Data ──────────────────────────────────────────────────────────────────────

export const SAMPLE_DATA: Record<Sector, Equity[]> = {

  // ── Technology ──────────────────────────────────────────────────────────────
  Technology: [
    {
      ticker: 'NVDA', name: 'NVIDIA Corporation', easyScore: 5, proScore: 16.2,
      price: 225.32, weeklyPrices: [222.2, 223.0, 223.8, 224.5, 225.32], weeklyChange: 1.4, sortRank: 1,
      marketCap: '$5.5T', pe: 35, revenueGrowth: 78, eps: 3.50, grossMargin: 75, dividendYield: 0.03,
      etfPresence: { XLK: true, VGT: true, QQQ: true, IYW: true, SMH: true },
      tonyNote: 'NVIDIA holds 80%+ share in datacenter AI accelerators. The Blackwell GPU cycle is driving extraordinary enterprise demand from every major hyperscaler. Watch AMD\'s MI300 series and custom silicon (Google TPU, Amazon Trainium) as the structural competitive risks. The premium P/E is justified by the AI infrastructure buildout but creates volatility during macro selloffs. Free cash flow generation is exceptional — the balance sheet is fortress-grade.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc.', easyScore: 5, proScore: 6.1,
      price: 425.19, weeklyPrices: [419.3, 420.6, 421.9, 423.5, 425.19], weeklyChange: 1.4, sortRank: 2,
      marketCap: '$2.0T', pe: 28, revenueGrowth: 44, eps: 7.50, grossMargin: 68, dividendYield: 1.2,
      etfPresence: { XLK: true, VGT: true, QQQ: true, IYW: true, SMH: true },
      tonyNote: 'Broadcom is the dominant supplier of custom AI ASICs (XPUs) for hyperscalers including Google and Meta, alongside its high-margin networking fabric business. The VMware acquisition added a stable, growing software revenue stream that reduces hardware cyclicality. Strong free cash flow supports a growing dividend. Key risk: revenue concentration in a handful of hyperscaler customers.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices', easyScore: 5, proScore: 5.5,
      price: 424.10, weeklyPrices: [418.2, 419.6, 421.0, 422.6, 424.10], weeklyChange: 1.4, sortRank: 3,
      marketCap: '$687B', pe: 25, revenueGrowth: 36, eps: 4.50, grossMargin: 53, dividendYield: null,
      etfPresence: { XLK: true, VGT: true, QQQ: true, IYW: true, SMH: true },
      tonyNote: 'AMD is the credible challenger to NVIDIA in AI GPUs with its MI300X series gaining meaningful datacenter adoption. It continues to take x86 CPU share from Intel in both server and consumer segments. GPU roadmap execution is the critical watch item — delays vs NVIDIA\'s Blackwell would re-widen the performance gap. Fabless model creates TSMC supply dependency worth monitoring.',
    },
    {
      ticker: 'INTC', name: 'Intel Corporation', easyScore: 5, proScore: 5.1,
      price: 108.77, weeklyPrices: [107.3, 107.6, 108.0, 108.4, 108.77], weeklyChange: 1.4, sortRank: 4,
      marketCap: '$461B', pe: null, revenueGrowth: -7, eps: -0.30, grossMargin: 40, dividendYield: null,
      etfPresence: { XLK: true, VGT: true, QQQ: true, IYW: true, SMH: true },
      tonyNote: 'Intel is in a deep restructuring cycle. The IDM 2.0 foundry strategy is years from profitability and AMD continues taking CPU share. The bull case is Intel 18A process achieving TSMC parity by 2027. The bear case is it misses again. High execution risk across every business unit. The 5/5 ETF score reflects historical index weighting — this is a turnaround bet, not a consensus quality name. Size accordingly.',
    },
    {
      ticker: 'MU', name: 'Micron Technology', easyScore: 5, proScore: 5.0,
      price: 724.66, weeklyPrices: [714.7, 717.2, 719.6, 722.1, 724.66], weeklyChange: 1.4, sortRank: 5,
      marketCap: '$804B', pe: 12, revenueGrowth: 58, eps: 10.50, grossMargin: 42, dividendYield: 0.4,
      etfPresence: { XLK: true, VGT: true, QQQ: true, IYW: true, SMH: true },
      tonyNote: 'Micron is the primary US beneficiary of the AI memory supercycle. HBM demand for AI accelerators is driving DRAM pricing power the company has not seen in a decade. The risk is structural: memory is cyclical. Current AI-driven demand appears more sustained than past server DRAM cycles, but cycle risk never fully disappears. The low P/E reflects market skepticism about cycle durability — that is both the risk and the opportunity.',
    },
    {
      ticker: 'LRCX', name: 'Lam Research Corporation', easyScore: 5, proScore: 3.1,
      price: 284.72, weeklyPrices: [280.8, 281.8, 282.8, 283.7, 284.72], weeklyChange: 1.4, sortRank: 6,
      marketCap: '$370B', pe: 22, revenueGrowth: 24, eps: 3.90, grossMargin: 47, dividendYield: 1.1,
      etfPresence: { XLK: true, VGT: true, QQQ: true, IYW: true, SMH: true },
      tonyNote: 'Lam Research is the dominant supplier of etch and deposition equipment — critical tools in every advanced semiconductor manufacturing flow. As chip geometries shrink, etch steps per wafer increase, creating a structural tailwind for Lam regardless of which chipmaker wins. Customer concentration (Samsung, TSMC, Micron) is the key risk. China export restrictions remain an ongoing regulatory variable to monitor.',
    },
    {
      ticker: 'AMAT', name: 'Applied Materials', easyScore: 5, proScore: 2.9,
      price: 436.62, weeklyPrices: [430.6, 431.9, 433.3, 435.0, 436.62], weeklyChange: 1.4, sortRank: 7,
      marketCap: '$365B', pe: 20, revenueGrowth: 18, eps: 8.60, grossMargin: 48, dividendYield: 0.9,
      etfPresence: { XLK: true, VGT: true, QQQ: true, IYW: true, SMH: true },
      tonyNote: 'Applied Materials is the largest semiconductor equipment company globally, spanning deposition, etch, metrology, and inspection. Unique position as an enabler of every major chipmaker rather than a competitor. The services and spare parts business provides recurring revenue that smooths the capital equipment cycle. China exposure (~30% of revenue) makes export control policy a key macro risk.',
    },
    {
      ticker: 'TXN', name: 'Texas Instruments', easyScore: 5, proScore: 2.8,
      price: 302.73, weeklyPrices: [298.6, 299.4, 300.3, 301.5, 302.73], weeklyChange: 1.4, sortRank: 8,
      marketCap: '$276B', pe: 30, revenueGrowth: 12, eps: 6.30, grossMargin: 64, dividendYield: 2.8,
      etfPresence: { XLK: true, VGT: true, QQQ: true, IYW: true, SMH: true },
      tonyNote: 'Texas Instruments is the quintessential quality compounder in semiconductors. Analog chips have 10-20 year product cycles, 100,000+ customer relationships, and margins that compete with software companies. The dividend has grown every year for 20 years. TI is building new internal fabs (300mm) to lock in low-cost manufacturing for decades. The premium valuation reflects the quality — this is a capital-allocation machine, not a growth stock.',
    },
    {
      ticker: 'KLAC', name: 'KLA Corporation', easyScore: 5, proScore: 2.5,
      price: 1804.32, weeklyPrices: [1779.4, 1785.6, 1791.8, 1798.1, 1804.32], weeklyChange: 1.4, sortRank: 9,
      marketCap: '$245B', pe: 26, revenueGrowth: 20, eps: 26.50, grossMargin: 58, dividendYield: 0.9,
      etfPresence: { XLK: true, VGT: true, QQQ: true, IYW: true, SMH: true },
      tonyNote: 'KLA dominates process control and inspection equipment — the systems chipmakers use to detect defects during manufacturing. Near-monopoly position in a segment that becomes more critical as chip complexity increases. Every advanced node transition (3nm, 2nm, 1nm) increases inspection intensity, creating a structural growth driver independent of overall equipment spending. High gross margins and consistent buybacks make this a capital-light compounder within equipment.',
    },
    {
      ticker: 'QCOM', name: 'Qualcomm Inc.', easyScore: 5, proScore: 2.4,
      price: 201.49, weeklyPrices: [198.7, 199.4, 200.1, 200.8, 201.49], weeklyChange: 1.4, sortRank: 10,
      marketCap: '$224B', pe: 18, revenueGrowth: 15, eps: 9.20, grossMargin: 56, dividendYield: 2.1,
      etfPresence: { XLK: true, VGT: true, QQQ: true, IYW: true, SMH: true },
      tonyNote: 'Qualcomm is the dominant mobile processor and modem supplier, with Apple dependency historically its key risk. Diversification into automotive (Snapdragon Digital Chassis) and PC (Snapdragon X Elite) reduces that concentration meaningfully. Edge AI is a long-term catalyst as on-device inference grows. The Apple modem in-sourcing risk is real but well-understood and partially priced in. Trades at a discount to peers — the market is pricing more Apple risk than is warranted.',
    },
    {
      ticker: 'ADI', name: 'Analog Devices Inc.', easyScore: 5, proScore: 2.3,
      price: 417.49, weeklyPrices: [411.7, 412.8, 414.1, 415.9, 417.49], weeklyChange: 1.4, sortRank: 11,
      marketCap: '$218B', pe: 28, revenueGrowth: 14, eps: 7.90, grossMargin: 68, dividendYield: 1.6,
      etfPresence: { XLK: true, VGT: true, QQQ: true, IYW: true, SMH: true },
      tonyNote: 'Analog Devices is a high-quality analog and mixed-signal semiconductor company serving industrial, automotive, and communications markets. The Maxim Integrated acquisition broadened the portfolio and customer base. Analog chips have long product cycles and strong customer switching costs — hallmarks of durable competitive advantage. Industrial exposure creates near-term cyclical risk as capex normalises post-COVID boom.',
    },
    {
      ticker: 'SNPS', name: 'Synopsys Inc.', easyScore: 4, proScore: 1.5,
      price: 502.42, weeklyPrices: [497.9, 498.9, 499.9, 501.2, 502.42], weeklyChange: 0.9, sortRank: 12,
      marketCap: '$81B', pe: 38, revenueGrowth: 17, eps: 13.20, grossMargin: 80, dividendYield: null,
      etfPresence: { XLK: true, VGT: true, QQQ: false, IYW: true, SMH: true },
      tonyNote: 'Synopsys is a near-duopoly (with Cadence) in Electronic Design Automation — the software that chip designers use to create every semiconductor in existence. Without Synopsys tools, NVIDIA, AMD, and Apple cannot design their chips. This is a software business with 80% gross margins and near-zero marginal cost of delivery. The AI Copilot tools are accelerating chip design productivity, growing the addressable market.',
    },
  ],

  // ── Financials ───────────────────────────────────────────────────────────────
  // KBWB = KBW Bank ETF — holds only banks, not BRK.B / BLK / AXP / MCO
  Financials: [
    {
      ticker: 'JPM', name: 'JPMorgan Chase & Co.', easyScore: 5, proScore: 10.8,
      price: 297.81, weeklyPrices: [293.9, 294.9, 295.9, 296.9, 297.81], weeklyChange: 1.3, sortRank: 1,
      marketCap: '$856B', pe: 14, revenueGrowth: 8, eps: 20.20, grossMargin: 55, dividendYield: 2.2,
      etfPresence: { XLF: true, VFH: true, KBWB: true, IYF: true, FNCL: true },
      tonyNote: 'JPMorgan is the undisputed best-run large bank globally, combining dominant investment banking, asset management, and consumer banking at scale. CEO Jamie Dimon has built the strongest balance sheet in US banking — CET1 ratio consistently ahead of requirements. Rate sensitivity creates some earnings variability, but diversification across business lines makes JPM more resilient than pure-play banks through credit cycles. The fortress capital position means JPM is a buyer in every banking crisis, not a victim.',
    },
    {
      ticker: 'BRK.B', name: 'Berkshire Hathaway B', easyScore: 4, proScore: 7.2,
      price: 482.70, weeklyPrices: [485.1, 484.6, 484.1, 483.4, 482.70], weeklyChange: -0.5, sortRank: 2,
      marketCap: '$1.1T', pe: 22, revenueGrowth: 6, eps: 22.80, grossMargin: 30, dividendYield: null,
      etfPresence: { XLF: true, VFH: true, KBWB: false, IYF: true, FNCL: true },
      tonyNote: 'Berkshire\'s core value is 60 years of Warren Buffett\'s capital allocation — a portfolio of wholly-owned businesses plus large equity stakes in Apple, Bank of America, and Chevron. The transition to Greg Abel as CEO creates succession uncertainty the market is digesting slowly. The $168B+ cash pile gives Berkshire enormous optionality to deploy capital into the next market dislocation. Not in KBWB because Berkshire is an insurance and holding company, not a bank.',
    },
    {
      ticker: 'BAC', name: 'Bank of America', easyScore: 5, proScore: 7.6,
      price: 49.77, weeklyPrices: [49.1, 49.3, 49.5, 49.6, 49.77], weeklyChange: 1.3, sortRank: 3,
      marketCap: '$380B', pe: 13, revenueGrowth: 5, eps: 3.70, grossMargin: 52, dividendYield: 2.5,
      etfPresence: { XLF: true, VFH: true, KBWB: true, IYF: true, FNCL: true },
      tonyNote: 'Bank of America\'s profitability is highly geared to interest rates — the bank was the largest beneficiary of the 2022-23 rate cycle and faces the most earnings pressure as rates normalise. The consumer banking franchise is exceptional, but the $100B+ unrealised loss on the AFS bond portfolio from 2021 fixed-rate bets remains a long-term overhang on book value. Management credibility has improved under CEO Moynihan\'s steady hand since 2010.',
    },
    {
      ticker: 'WFC', name: 'Wells Fargo & Co.', easyScore: 5, proScore: 5.4,
      price: 73.42, weeklyPrices: [72.5, 72.7, 72.9, 73.2, 73.42], weeklyChange: 1.3, sortRank: 4,
      marketCap: '$242B', pe: 12, revenueGrowth: 7, eps: 6.90, grossMargin: 50, dividendYield: 2.8,
      etfPresence: { XLF: true, VFH: true, KBWB: true, IYF: true, FNCL: true },
      tonyNote: 'Wells Fargo\'s transformation story is the most compelling in large-cap banking — the Fed\'s asset cap (imposed after the 2016 fake-accounts scandal) has been the binding constraint on growth. A lift of the cap would be a significant catalyst, and the bank has been operationally cleaning house under CEO Charles Scharf. Until the cap is removed, WFC is playing with one hand tied. EPS power on a fully uncapped balance sheet is meaningfully above current earnings.',
    },
    {
      ticker: 'GS', name: 'Goldman Sachs Group', easyScore: 5, proScore: 3.9,
      price: 948.47, weeklyPrices: [936.3, 939.4, 942.5, 945.5, 948.47], weeklyChange: 1.3, sortRank: 5,
      marketCap: '$294B', pe: 15, revenueGrowth: 14, eps: 42.10, grossMargin: 58, dividendYield: 2.2,
      etfPresence: { XLF: true, VFH: true, KBWB: true, IYF: true, FNCL: true },
      tonyNote: 'Goldman Sachs exited consumer banking with its Marcus wind-down and has refocused on its core competencies — investment banking, trading, and asset/wealth management. The strategic clarity is a positive; the revenue volatility is not. M&A advisory and equity underwriting are highly cyclical, making Goldman\'s earnings particularly sensitive to deal-making environments. High-quality franchise, but the valuation requires sustained capital markets activity to justify.',
    },
    {
      ticker: 'MS', name: 'Morgan Stanley', easyScore: 5, proScore: 3.4,
      price: 192.51, weeklyPrices: [190.0, 190.6, 191.2, 191.9, 192.51], weeklyChange: 1.3, sortRank: 6,
      marketCap: '$297B', pe: 16, revenueGrowth: 11, eps: 7.90, grossMargin: 56, dividendYield: 3.2,
      etfPresence: { XLF: true, VFH: true, KBWB: true, IYF: true, FNCL: true },
      tonyNote: 'Morgan Stanley\'s transformation into a wealth management-led franchise under James Gorman was the smartest strategic pivot in large-cap financial services of the past decade. Acquiring E*TRADE and Eaton Vance added scale in wealth and asset management. The result is fee-based recurring revenues that reduce earnings volatility versus Goldman. At current valuations the market already prices the stability premium — future returns depend on accelerating AUM growth.',
    },
    {
      ticker: 'AXP', name: 'American Express Co.', easyScore: 4, proScore: 3.1,
      price: 313.48, weeklyPrices: [309.5, 310.5, 311.5, 312.5, 313.48], weeklyChange: 1.3, sortRank: 7,
      marketCap: '$214B', pe: 20, revenueGrowth: 9, eps: 14.60, grossMargin: 62, dividendYield: 1.2,
      etfPresence: { XLF: true, VFH: true, KBWB: false, IYF: true, FNCL: true },
      tonyNote: 'American Express is not a bank — it is a premium consumer brand with financial services economics. The spend-centric model (revenue from merchant fees, not just interest) means AmEx benefits from travel and entertainment spending rather than credit-dependent income. The affluent customer base has demonstrated extraordinary credit quality even through economic stress. BNPL and fintech competition is real but has not yet damaged the core premium franchise.',
    },
    {
      ticker: 'BLK', name: 'BlackRock Inc.', easyScore: 4, proScore: 2.8,
      price: 1081.90, weeklyPrices: [1068.0, 1071.4, 1074.9, 1078.4, 1081.90], weeklyChange: 1.3, sortRank: 8,
      marketCap: '$163B', pe: 24, revenueGrowth: 12, eps: 43.20, grossMargin: 52, dividendYield: 2.4,
      etfPresence: { XLF: true, VFH: true, KBWB: false, IYF: true, FNCL: true },
      tonyNote: 'BlackRock is the world\'s largest asset manager with $10T+ AUM and a structural position that becomes more entrenched as passive index investing grows. The Aladdin risk management platform is a business within a business — it manages risk for competitor asset managers, governments, and central banks. The acquisition of Global Infrastructure Partners in 2024 expanded into private markets. Not in KBWB because BlackRock is an asset manager, not a bank.',
    },
    {
      ticker: 'SCHW', name: 'Charles Schwab Corp.', easyScore: 5, proScore: 2.2,
      price: 90.88, weeklyPrices: [89.7, 90.0, 90.3, 90.6, 90.88], weeklyChange: 1.3, sortRank: 9,
      marketCap: '$166B', pe: 22, revenueGrowth: 4, eps: 4.10, grossMargin: 48, dividendYield: 1.4,
      etfPresence: { XLF: true, VFH: true, KBWB: true, IYF: true, FNCL: true },
      tonyNote: 'Charles Schwab\'s 2023 liquidity stress (depositor outflows during the rate spike) has been largely resolved, but the episode revealed concentration risk in its bank-funded model. Cash sorting — clients moving from low-yield sweep accounts to money market funds — is the structural earnings headwind that will take years to fully reverse. Schwab\'s brokerage franchise and technology moat remain intact, and the risk/reward improved significantly post-crisis.',
    },
    {
      ticker: 'MCO', name: 'Moody\'s Corporation', easyScore: 4, proScore: 1.8,
      price: 428.90, weeklyPrices: [431.1, 430.6, 430.1, 429.5, 428.90], weeklyChange: -0.5, sortRank: 10,
      marketCap: '$77B', pe: 32, revenueGrowth: 10, eps: 13.70, grossMargin: 66, dividendYield: 0.9,
      etfPresence: { XLF: true, VFH: true, KBWB: false, IYF: true, FNCL: true },
      tonyNote: 'Moody\'s is a near-duopoly (with S&P Global) in credit ratings — every bond issued globally needs a rating, and Moody\'s gets paid when deals close. The ratings business has fixed costs and near-infinite margin on incremental volume. The Moody\'s Analytics data and software business adds recurring revenue that reduces dependence on deal flow. Like all rating agencies, regulatory risk is structural — a political willingness to break up the duopoly would be the only true existential threat.',
    },
  ],

  // ── Energy ────────────────────────────────────────────────────────────────────
  // OIH = VanEck Oil Services ETF — holds oilfield services, not pure E&P or refiners
  Energy: [
    {
      ticker: 'XOM', name: 'Exxon Mobil Corporation', easyScore: 5, proScore: 23.4,
      price: 157.92, weeklyPrices: [153.5, 154.6, 155.7, 156.8, 157.92], weeklyChange: 2.9, sortRank: 1,
      marketCap: '$630B', pe: 14, revenueGrowth: -3, eps: 8.20, grossMargin: 38, dividendYield: 3.6,
      etfPresence: { XLE: true, VDE: true, FENY: true, IYE: true, OIH: false },
      tonyNote: 'ExxonMobil is the Western Hemisphere\'s dominant integrated oil major, with upstream acreage in Guyana emerging as one of the most economically attractive new oil plays globally. The acquisition of Pioneer Natural Resources in 2024 added low-cost Permian Basin production that will anchor earnings for decades. LNG portfolio and chemical feedstock business diversify earnings beyond pure crude prices. At current levels, the stock prices in $75-80 oil — Hormuz tensions and OPEC+ cuts provide meaningful upside torque.',
    },
    {
      ticker: 'CVX', name: 'Chevron Corporation', easyScore: 5, proScore: 17.2,
      price: 191.10, weeklyPrices: [185.7, 187.1, 188.4, 189.8, 191.10], weeklyChange: 2.9, sortRank: 2,
      marketCap: '$349B', pe: 14, revenueGrowth: -5, eps: 11.20, grossMargin: 36, dividendYield: 4.2,
      etfPresence: { XLE: true, VDE: true, FENY: true, IYE: true, OIH: false },
      tonyNote: 'Chevron\'s capital discipline under CEO Mike Wirth is a model for the industry — conservative balance sheet while delivering strong free cash flow returns. The Hess acquisition adds material Guyana upside if the arbitration is resolved in Chevron\'s favour. Relative underperformance vs XOM reflects a portfolio mix more tilted to traditional production rather than the LNG and deepwater plays that command premium multiples. The 4.2% dividend yield compensates for patience.',
    },
    {
      ticker: 'COP', name: 'ConocoPhillips', easyScore: 5, proScore: 7.8,
      price: 122.41, weeklyPrices: [119.0, 119.9, 120.8, 121.6, 122.41], weeklyChange: 2.9, sortRank: 3,
      marketCap: '$150B', pe: 13, revenueGrowth: 4, eps: 7.90, grossMargin: 54, dividendYield: 3.1,
      etfPresence: { XLE: true, VDE: true, FENY: true, IYE: true, OIH: false },
      tonyNote: 'ConocoPhillips has executed better than any large-cap E&P on the "returns-first" capital discipline framework. Variable dividend plus buyback return-of-capital model aligns management incentives with shareholder returns better than a fixed high dividend. Low-cost base in the Permian, Bakken, and Eagle Ford gives breakeven production economics at $35-40/bbl. The acquisition of Marathon Oil was accretive on every metric the company publicly modelled — the best large-cap E&P for US shale exposure.',
    },
    {
      ticker: 'EOG', name: 'EOG Resources Inc.', easyScore: 4, proScore: 5.2,
      price: 140.26, weeklyPrices: [136.3, 137.3, 138.3, 139.3, 140.26], weeklyChange: 2.9, sortRank: 4,
      marketCap: '$83B', pe: 11, revenueGrowth: 2, eps: 11.80, grossMargin: 56, dividendYield: 3.4,
      etfPresence: { XLE: true, VDE: true, FENY: true, IYE: true, OIH: false },
      tonyNote: 'EOG Resources is the most analytically rigorous E&P operator, famous for applying technology and data science to drilling optimisation. Consistently produces at costs below the Permian Basin average despite lacking XOM or CVX scale. The absence from OIH reflects the pure E&P focus rather than integrated services exposure. Free cash flow yield at current prices is compelling for a non-OPEC crude producer with a track record of capital discipline.',
    },
    {
      ticker: 'SLB', name: 'SLB (Schlumberger)', easyScore: 5, proScore: 4.8,
      price: 55.38, weeklyPrices: [53.8, 54.2, 54.6, 55.0, 55.38], weeklyChange: 2.9, sortRank: 5,
      marketCap: '$79B', pe: 16, revenueGrowth: 8, eps: 2.60, grossMargin: 32, dividendYield: 2.6,
      etfPresence: { XLE: true, VDE: true, FENY: true, IYE: true, OIH: true },
      tonyNote: 'SLB (formerly Schlumberger) is the dominant oilfield services company globally, with unmatched technology depth across drilling, formation evaluation, production, and digital. International rig activity is the key revenue driver, and OPEC+ production cuts pressure near-term service demand. The Digital & Integration segment — essentially SLB\'s SaaS business for energy companies — is growing faster than core services at better margins. Hormuz tension and higher oil prices represent a tailwind as E&P capex accelerates.',
    },
    {
      ticker: 'MPC', name: 'Marathon Petroleum Corp.', easyScore: 4, proScore: 4.2,
      price: 255.03, weeklyPrices: [247.8, 249.6, 251.4, 253.2, 255.03], weeklyChange: 2.9, sortRank: 6,
      marketCap: '$82B', pe: 10, revenueGrowth: -8, eps: 16.40, grossMargin: 12, dividendYield: 2.4,
      etfPresence: { XLE: true, VDE: true, FENY: true, IYE: true, OIH: false },
      tonyNote: 'Marathon Petroleum operates the largest US refining system with mid-continent crude exposure. The MPLX LP midstream subsidiary provides stable fee income that underpins the capital return program. Refining margins (crack spreads) are inherently volatile; current tightening of global refining capacity following European and Asian closures is a structural support. A 5/5 Easy Score is limited by OIH exclusion — MPC is a downstream refiner, not an oilfield services company.',
    },
    {
      ticker: 'PSX', name: 'Phillips 66', easyScore: 4, proScore: 3.6,
      price: 176.20, weeklyPrices: [171.2, 172.5, 173.8, 175.0, 176.20], weeklyChange: 2.9, sortRank: 7,
      marketCap: '$67B', pe: 11, revenueGrowth: -6, eps: 12.30, grossMargin: 10, dividendYield: 3.4,
      etfPresence: { XLE: true, VDE: true, FENY: true, IYE: true, OIH: false },
      tonyNote: 'Phillips 66 combines refining with a strong midstream and chemical feedstock business that provides earnings diversification versus pure refiners. The strategic pivot to increase midstream EBITDA proportion is meant to reduce pure refining earnings cyclicality. The DCP Midstream consolidation adds fee-based EBITDA. Risk: refining margins can compress faster than midstream revenues can compensate in a demand-driven downturn.',
    },
    {
      ticker: 'VLO', name: 'Valero Energy Corporation', easyScore: 4, proScore: 3.1,
      price: 250.74, weeklyPrices: [243.7, 245.4, 247.2, 249.0, 250.74], weeklyChange: 2.9, sortRank: 8,
      marketCap: '$84B', pe: 10, revenueGrowth: -10, eps: 15.60, grossMargin: 11, dividendYield: 3.8,
      etfPresence: { XLE: true, VDE: true, FENY: true, IYE: true, OIH: false },
      tonyNote: 'Valero is the pure-play US refiner, the best at its craft, with the lowest cost per barrel in the industry. Its focus on heavy crude discount capture and the Diamond Green Diesel renewable fuels JV with Darling Ingredients gives it optionality in the energy transition without sacrificing core refining returns. The renewable diesel business is losing favourable government subsidy support — monitoring RINS policy is the key variable heading into 2027.',
    },
    {
      ticker: 'OXY', name: 'Occidental Petroleum', easyScore: 5, proScore: 2.8,
      price: 59.62, weeklyPrices: [57.9, 58.4, 58.8, 59.2, 59.62], weeklyChange: 2.9, sortRank: 9,
      marketCap: '$53B', pe: 13, revenueGrowth: 6, eps: 3.80, grossMargin: 48, dividendYield: 2.0,
      etfPresence: { XLE: true, VDE: true, FENY: true, IYE: true, OIH: false },
      tonyNote: 'Occidental Petroleum became a Warren Buffett/Berkshire Hathaway conviction bet — Berkshire now owns ~28% of OXY common stock. The thesis: OXY\'s low-cost Permian Basin acreage and direct air capture (DAC) technology position it uniquely in a world that needs both cheap oil and long-term carbon solutions. The debt load from the 2019 Anadarko acquisition is being paid down faster than expected. High oil price leverage plus the Buffett backing creates a premium valuation in E&P.',
    },
    {
      ticker: 'HAL', name: 'Halliburton Company', easyScore: 5, proScore: 2.4,
      price: 41.76, weeklyPrices: [40.6, 40.9, 41.2, 41.5, 41.76], weeklyChange: 2.9, sortRank: 10,
      marketCap: '$37B', pe: 14, revenueGrowth: 6, eps: 2.10, grossMargin: 22, dividendYield: 2.0,
      etfPresence: { XLE: true, VDE: true, FENY: true, IYE: true, OIH: true },
      tonyNote: 'Halliburton is the second-largest oilfield services company and the dominant operator in North American pressure pumping (fracking). US land rig count is the primary lever for its North American business; international activity is the diversification and growth driver. Digital and AI tools for completion optimisation are becoming a differentiator. Among oilfield services names, HAL offers the highest torque to a US shale activity increase driven by Hormuz tension or higher sustained crude prices.',
    },
  ],

  // ── Healthcare ────────────────────────────────────────────────────────────────
  Healthcare: [
    {
      ticker: 'LLY', name: 'Eli Lilly & Company', easyScore: 5, proScore: 14.2,
      price: 1004.92, weeklyPrices: [1008.9, 1008.0, 1007.1, 1006.0, 1004.92], weeklyChange: -0.4, sortRank: 1,
      marketCap: '$955B', pe: 48, revenueGrowth: 36, eps: 18.40, grossMargin: 82, dividendYield: 0.6,
      etfPresence: { XLV: true, VHT: true, RSPH: true, IYH: true, FHLC: true },
      tonyNote: 'Eli Lilly has arguably the best franchise in global biopharma, having created the GLP-1 weight loss market with Zepbound/Tirzepatide alongside its diabetes market dominance. The pipeline behind GLP-1 includes obesity treatments, Alzheimer\'s (donanemab), and next-generation diabetes drugs that could sustain a decade of above-market revenue growth. Manufacturing capacity constraints limited 2024-25 revenue; as facilities scale, the earnings ramp is non-linear. The high P/E embeds growth expectations — any pipeline setback would reprice sharply.',
    },
    {
      ticker: 'UNH', name: 'UnitedHealth Group', easyScore: 5, proScore: 12.4,
      price: 393.85, weeklyPrices: [395.4, 395.1, 394.7, 394.3, 393.85], weeklyChange: -0.4, sortRank: 2,
      marketCap: '$366B', pe: 22, revenueGrowth: 8, eps: 24.10, grossMargin: 26, dividendYield: 1.8,
      etfPresence: { XLV: true, VHT: true, RSPH: true, IYH: true, FHLC: true },
      tonyNote: 'UnitedHealth Group is the largest US health insurer and has diversified into care delivery (Optum) and technology, making it genuinely harder to disrupt than a pure payer. The 2024 Change Healthcare cyberattack created ~$3B in losses and operational disruption still being resolved. Medical cost ratio (MCR) creep — insurers paying out more in claims — is the cyclical risk that has pressured the sector in 2025-26. UNH\'s scale and data advantages give it the best tools to manage MCR, but the pressure is real across the sector.',
    },
    {
      ticker: 'JNJ', name: 'Johnson & Johnson', easyScore: 5, proScore: 9.8,
      price: 226.71, weeklyPrices: [227.6, 227.4, 227.2, 226.9, 226.71], weeklyChange: -0.4, sortRank: 3,
      marketCap: '$546B', pe: 16, revenueGrowth: 4, eps: 9.80, grossMargin: 68, dividendYield: 3.2,
      etfPresence: { XLV: true, VHT: true, RSPH: true, IYH: true, FHLC: true },
      tonyNote: 'Johnson & Johnson\'s 2023 separation of consumer products (Kenvue) completed the transformation into a pure MedTech plus Pharma company. The talc litigation liability via Texas-based bankruptcy resolution has been the key legal overhang — partial resolution is progressing. Pharmaceuticals growth is driven by Darzalex (myeloma), while Stelara (immunology) faces biosimilar competition. The MedTech division is a steady compounder; Pharma pipeline is where the growth story lives or dies.',
    },
    {
      ticker: 'ABBV', name: 'AbbVie Inc.', easyScore: 5, proScore: 7.2,
      price: 210.39, weeklyPrices: [211.2, 211.0, 210.8, 210.6, 210.39], weeklyChange: -0.4, sortRank: 4,
      marketCap: '$371B', pe: 17, revenueGrowth: 7, eps: 11.60, grossMargin: 70, dividendYield: 3.4,
      etfPresence: { XLV: true, VHT: true, RSPH: true, IYH: true, FHLC: true },
      tonyNote: 'AbbVie\'s post-Humira thesis is playing out — Skyrizi and Rinvoq are growing fast enough to more than offset the Humira biosimilar erosion that investors feared would create a revenue cliff. The Allergan acquisition added Botox and aesthetics, providing a non-payer-dependent revenue stream. Pipeline depth in oncology, neuroscience, and immunology is underappreciated. AbbVie remains one of the best income plus growth combinations in large-cap biopharma at current valuations.',
    },
    {
      ticker: 'MRK', name: 'Merck & Co. Inc.', easyScore: 5, proScore: 6.8,
      price: 111.38, weeklyPrices: [111.8, 111.7, 111.6, 111.5, 111.38], weeklyChange: -0.4, sortRank: 5,
      marketCap: '$281B', pe: 13, revenueGrowth: 6, eps: 8.40, grossMargin: 74, dividendYield: 3.6,
      etfPresence: { XLV: true, VHT: true, RSPH: true, IYH: true, FHLC: true },
      tonyNote: 'Merck\'s Keytruda (pembrolizumab) is the world\'s best-selling drug and is still growing, but the 2028 US patent cliff creates an overhang that has weighed on the stock. The Daiichi Sankyo antibody-drug conjugate (ADC) collaboration and WINREVAIR for pulmonary arterial hypertension are the two pipeline assets with highest near-term revenue potential. Merck is executing well, but the Keytruda cliff is a real structural risk that requires pipeline depth to overcome.',
    },
    {
      ticker: 'TMO', name: 'Thermo Fisher Scientific', easyScore: 5, proScore: 5.4,
      price: 438.34, weeklyPrices: [440.1, 439.7, 439.3, 438.8, 438.34], weeklyChange: -0.4, sortRank: 6,
      marketCap: '$168B', pe: 30, revenueGrowth: 5, eps: 19.20, grossMargin: 44, dividendYield: 0.3,
      etfPresence: { XLV: true, VHT: true, RSPH: true, IYH: true, FHLC: true },
      tonyNote: 'Thermo Fisher Scientific is the picks-and-shovels play on all life sciences activity — drug development, genomics, cell therapy manufacturing, and clinical diagnostics all require Thermo Fisher tools and services. Pricing power is exceptional given the non-discretionary nature of laboratory supplies. Bioproduction revenue (reagents for gene therapy and cell therapy manufacturing) is the high-growth vector as these therapies enter commercial scale. One of the highest-quality compounders in healthcare.',
    },
    {
      ticker: 'DHR', name: 'Danaher Corporation', easyScore: 5, proScore: 4.6,
      price: 161.91, weeklyPrices: [162.6, 162.4, 162.2, 162.1, 161.91], weeklyChange: -0.4, sortRank: 7,
      marketCap: '$116B', pe: 35, revenueGrowth: 3, eps: 6.90, grossMargin: 58, dividendYield: 0.4,
      etfPresence: { XLV: true, VHT: true, RSPH: true, IYH: true, FHLC: true },
      tonyNote: 'Danaher is a capital allocation machine that spun off its water and environmental business (Veralto) in 2023 to focus on life sciences and diagnostics. The Danaher Business System (DBS) — a lean operating framework — drives continuous margin improvement across acquired companies. Revenue and earnings came under pressure in 2023-24 as bioprocessing customers worked through inventory buildup; the recovery has been slower than initially guided. The long-term thesis is intact but requires patience as destocking resolves.',
    },
    {
      ticker: 'AMGN', name: 'Amgen Inc.', easyScore: 5, proScore: 4.2,
      price: 326.31, weeklyPrices: [327.6, 327.3, 327.0, 326.7, 326.31], weeklyChange: -0.4, sortRank: 8,
      marketCap: '$175B', pe: 15, revenueGrowth: 6, eps: 18.60, grossMargin: 72, dividendYield: 3.2,
      etfPresence: { XLV: true, VHT: true, RSPH: true, IYH: true, FHLC: true },
      tonyNote: 'Amgen\'s PCSK9 inhibitor Repatha and the AMG 133 obesity drug (MariTide) are the key near-term catalysts. The ENBREL biosimilar competition and aging legacy portfolio create pressure that the pipeline must offset. The Horizon Therapeutics acquisition adds orphan disease drugs with less competitive exposure than mainstream immunology. Amgen\'s manufacturing scale and expertise in complex biologics is a durable moat. The ~3.2% dividend yield provides return while waiting for pipeline catalysts to materialise.',
    },
    {
      ticker: 'ABT', name: 'Abbott Laboratories', easyScore: 5, proScore: 3.8,
      price: 84.47, weeklyPrices: [84.8, 84.7, 84.6, 84.5, 84.47], weeklyChange: -0.4, sortRank: 9,
      marketCap: '$146B', pe: 26, revenueGrowth: 5, eps: 5.00, grossMargin: 55, dividendYield: 1.9,
      etfPresence: { XLV: true, VHT: true, RSPH: true, IYH: true, FHLC: true },
      tonyNote: 'Abbott Labs is the most balanced diversified healthcare company — diagnostics, medical devices, nutritional products, and established pharma in emerging markets. COVID rapid test revenue has fully normalised. The MitraClip structural heart business and the FreeStyle Libre continuous glucose monitor (CGM) are the high-growth segments that drive the investment case. Abbott\'s emerging market exposure gives it above-average revenue growth relative to US-only peers at similar valuations.',
    },
    {
      ticker: 'PFE', name: 'Pfizer Inc.', easyScore: 5, proScore: 3.2,
      price: 25.33, weeklyPrices: [25.4, 25.4, 25.4, 25.3, 25.33], weeklyChange: -0.4, sortRank: 10,
      marketCap: '$143B', pe: 13, revenueGrowth: -12, eps: 2.00, grossMargin: 63, dividendYield: 6.4,
      etfPresence: { XLV: true, VHT: true, RSPH: true, IYH: true, FHLC: true },
      tonyNote: 'Pfizer faces the most challenging post-COVID transition in biopharma — COVID vaccine and antiviral revenue collapsed from $57B peak in 2022 to normalised levels, while the pipeline needs new blockbusters to fill the void. The Seagen oncology acquisition added ADC expertise and pipeline depth at a high price. Pfizer is not a broken company but it is a slow-moving giant reorienting toward oncology. The low P/E and 6.4% dividend yield compensates for patience, but earnings recovery is a 2027+ story.',
    },
  ],

  // ── Industrials ───────────────────────────────────────────────────────────────
  // PAVE = Global X US Infrastructure Development ETF — construction/electrical focus
  // Defense names (LMT, NOC, RTX) not in PAVE; CAT, ETN, EMR are
  Industrials: [
    {
      ticker: 'GE', name: 'GE Aerospace', easyScore: 4, proScore: 8.4,
      price: 281.53, weeklyPrices: [276.8, 277.9, 279.1, 280.3, 281.53], weeklyChange: 1.7, sortRank: 1,
      marketCap: '$377B', pe: 28, revenueGrowth: 14, eps: 6.50, grossMargin: 20, dividendYield: 0.8,
      etfPresence: { XLI: true, VIS: true, PAVE: false, IYJ: true, FIDU: true },
      tonyNote: 'GE Aerospace (post-Vernova spin) is a pure aerospace and defense engine manufacturer — the maker of CFM and LEAP engines that power the majority of Boeing and Airbus narrowbodies. Commercial aviation recovery has been stronger than expected, and the services aftermarket (parts, repairs, upgrades) generates high-margin recurring revenue tied to every flight hour. Defense engine programs are multi-decade government contracts. GE Aerospace is the focused, high-quality business that the old GE conglomerate always obscured.',
    },
    {
      ticker: 'RTX', name: 'RTX Corporation', easyScore: 4, proScore: 7.2,
      price: 171.18, weeklyPrices: [168.3, 169.0, 169.7, 170.5, 171.18], weeklyChange: 1.7, sortRank: 2,
      marketCap: '$228B', pe: 22, revenueGrowth: 9, eps: 5.80, grossMargin: 24, dividendYield: 2.2,
      etfPresence: { XLI: true, VIS: true, PAVE: false, IYJ: true, FIDU: true },
      tonyNote: 'RTX (formerly Raytheon Technologies) combines Pratt & Whitney aircraft engines with Raytheon\'s defense missile systems and radar. The Pratt & Whitney GTF engine blade powder metal recall created significant costs in 2023-24 — those charges are now largely behind them. Defense backlog for Patriot missiles (Ukraine procurement), StormBreaker, and LTAMDS provides revenue visibility into 2028+. The aerospace cycle recovery and global defense spending expansion are two simultaneous tailwinds — rare positioning.',
    },
    {
      ticker: 'HON', name: 'Honeywell International', easyScore: 4, proScore: 6.1,
      price: 213.24, weeklyPrices: [209.7, 210.6, 211.5, 212.3, 213.24], weeklyChange: 1.7, sortRank: 3,
      marketCap: '$137B', pe: 22, revenueGrowth: 7, eps: 10.60, grossMargin: 34, dividendYield: 2.2,
      etfPresence: { XLI: true, VIS: true, PAVE: false, IYJ: true, FIDU: true },
      tonyNote: 'Honeywell\'s decision to split into three separate companies (aerospace, automation, and energy/buildings) under pressure from activist investor Elliott Management is the key near-term catalyst. Breaking up Honeywell removes the conglomerate discount — each business unit should command sector-appropriate multiples. The automation and process controls business has strong pricing power in industrial automation. Aerospace segment benefits from the same commercial aviation recovery tailwind as GE and RTX.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc.', easyScore: 5, proScore: 5.8,
      price: 888.31, weeklyPrices: [873.5, 876.5, 880.0, 884.3, 888.31], weeklyChange: 1.7, sortRank: 4,
      marketCap: '$440B', pe: 16, revenueGrowth: -4, eps: 22.80, grossMargin: 39, dividendYield: 1.6,
      etfPresence: { XLI: true, VIS: true, PAVE: true, IYJ: true, FIDU: true },
      tonyNote: 'Caterpillar is the global standard for heavy construction and mining equipment — when infrastructure gets built anywhere in the world, CAT machinery does it. US infrastructure spending (CHIPS Act, IRA, Bipartisan Infrastructure Law) creates a multi-year domestic demand tailwind. Mining equipment demand is tied to commodity prices supported by energy transition metal requirements (copper, lithium). Services (parts, digital monitoring) are growing faster than equipment and provide recurring revenue through the equipment cycle.',
    },
    {
      ticker: 'DE', name: 'Deere & Company', easyScore: 5, proScore: 4.6,
      price: 561.83, weeklyPrices: [552.4, 554.8, 557.2, 559.5, 561.83], weeklyChange: 1.7, sortRank: 5,
      marketCap: '$169B', pe: 19, revenueGrowth: -14, eps: 23.80, grossMargin: 31, dividendYield: 1.5,
      etfPresence: { XLI: true, VIS: true, PAVE: true, IYJ: true, FIDU: true },
      tonyNote: 'Deere\'s precision agriculture technology — JDLink telematics, See & Spray robotic herbicide application, and autonomous farming — is creating a software-enabled agriculture model that competitors cannot quickly replicate. Equipment demand is digesting the pandemic-era order surge, creating a cyclical trough in 2025. The structural thesis is intact: fewer farmers need to grow more food with less inputs, and Deere\'s technology is the enabler. The stock is near cycle lows — a counter-cyclical buy opportunity for patient investors.',
    },
    {
      ticker: 'LMT', name: 'Lockheed Martin Corp.', easyScore: 4, proScore: 4.1,
      price: 516.01, weeklyPrices: [507.4, 509.5, 511.7, 513.9, 516.01], weeklyChange: 1.7, sortRank: 6,
      marketCap: '$122B', pe: 18, revenueGrowth: 5, eps: 27.20, grossMargin: 13, dividendYield: 2.6,
      etfPresence: { XLI: true, VIS: true, PAVE: false, IYJ: true, FIDU: true },
      tonyNote: 'Lockheed Martin is the prime contractor for the F-35 fighter jet, America\'s most expensive defense program and one that creates decades of parts, upgrades, and training revenue. Defense budgets globally are expanding following Russia-Ukraine and Middle East tensions. F-35 production is ramping back up after supply chain disruptions. The Strategic Defense Initiative revival and hypersonic weapon programs are upside vectors. The growing dividend makes this the industrials income stock for patient investors.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corporation PLC', easyScore: 5, proScore: 3.9,
      price: 399.44, weeklyPrices: [392.8, 394.4, 396.1, 397.8, 399.44], weeklyChange: 1.7, sortRank: 7,
      marketCap: '$158B', pe: 36, revenueGrowth: 11, eps: 9.40, grossMargin: 38, dividendYield: 1.1,
      etfPresence: { XLI: true, VIS: true, PAVE: true, IYJ: true, FIDU: true },
      tonyNote: 'Eaton Corporation is the best-positioned industrial in the AI-era electricity infrastructure buildout — data centers require massive amounts of power management, switchgear, and backup systems, all of which Eaton supplies. The electrical products segment is growing at tech-sector rates while retaining industrial multiple pricing. Vehicle electrification is a second multi-year tailwind for the e-mobility segment. The combination of defensive utility infrastructure exposure and offensive AI-driven demand is exceptional positioning.',
    },
    {
      ticker: 'UPS', name: 'United Parcel Service', easyScore: 4, proScore: 3.2,
      price: 98.93, weeklyPrices: [97.3, 97.7, 98.1, 98.5, 98.93], weeklyChange: 1.7, sortRank: 8,
      marketCap: '$84B', pe: 12, revenueGrowth: -3, eps: 9.40, grossMargin: 28, dividendYield: 5.2,
      etfPresence: { XLI: true, VIS: true, PAVE: false, IYJ: true, FIDU: true },
      tonyNote: 'UPS is in the middle of a volume and margin reset following the 2023 Teamsters contract that significantly increased labour costs. The strategic shift to "better, not bigger" — prioritising healthcare, SMB, and premium international over pure volume — is the right long-term play but creates a multi-year earnings trough. International package growth and UPS Healthcare (temperature-controlled pharmaceutical shipping) are the bright spots. The ~5.2% dividend yield makes patience easier while management executes the repositioning.',
    },
    {
      ticker: 'NOC', name: 'Northrop Grumman Corp.', easyScore: 4, proScore: 2.8,
      price: 540.69, weeklyPrices: [531.7, 533.9, 536.2, 538.4, 540.69], weeklyChange: 1.7, sortRank: 9,
      marketCap: '$82B', pe: 17, revenueGrowth: 5, eps: 31.20, grossMargin: 13, dividendYield: 1.8,
      etfPresence: { XLI: true, VIS: true, PAVE: false, IYJ: true, FIDU: true },
      tonyNote: 'Northrop Grumman is the B-21 Raider stealth bomber prime contractor — the first new US strategic bomber program in 40 years creates a decade-plus of development, production, and sustainment revenue with high certainty. Space and launch vehicle work (LGM-35A Sentinel ICBM replacement) are similarly long-cycle programs. Defense spending growth is bipartisan and structural given geopolitical dynamics. Northrop\'s backlog is large and funded — a government-contracted annuity in industrial form.',
    },
    {
      ticker: 'EMR', name: 'Emerson Electric Co.', easyScore: 5, proScore: 2.4,
      price: 133.05, weeklyPrices: [130.8, 131.4, 131.9, 132.5, 133.05], weeklyChange: 1.7, sortRank: 10,
      marketCap: '$74B', pe: 21, revenueGrowth: 8, eps: 5.40, grossMargin: 44, dividendYield: 2.2,
      etfPresence: { XLI: true, VIS: true, PAVE: true, IYJ: true, FIDU: true },
      tonyNote: 'Emerson Electric is now focused on industrial automation and process control following the Aspen Technology consolidation and sale of its climate technologies business (Copeland). The combination of traditional industrial controls with Aspen\'s software creates an asset-intensive manufacturing optimisation stack. Process industries (chemical, oil and gas, pharma) modernising their plants is the secular tailwind. Less geopolitical exposure than defense peers, but steadier and more predictable earnings through the cycle.',
    },
  ],
};
