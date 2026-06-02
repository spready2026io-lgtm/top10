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

const N: Record<Period, number> = { '1W': 5, '1M': 21, '6M': 26, '1Y': 52 };

// @@GENERATED:SPY_RET@@
export const SPY_RET: Record<Period, number> = { '1W': 0.9, '1M': 5.1, '6M': 11.1, '1Y': 27.8 };
// @@END_GENERATED:SPY_RET@@

// @@GENERATED:TOP10_RET@@
// Top10 composite returns per theme per period (average of all ETFs in theme)
const TOP10_RET: Record<Theme, Record<Period, number>> = {
  'AI & ML':         { '1W': 6.1, '1M': 21.6, '6M': 50.2, '1Y': 99.1 },
  'Semiconductors':  { '1W': 3.6, '1M': 33.8, '6M': 107.8, '1Y': 177.6 },
  'Broad Tech':      { '1W': 3.3, '1M': 14.7, '6M': 30.9, '1Y': 49.2 },
  'Electrification': { '1W': -0.4, '1M': 5.1, '6M': 44.4, '1Y': 93.1 },
  'Industrials':     { '1W': -1.6, '1M': 0.8, '6M': 26, '1Y': 45.3 },
  'Meme':            { '1W': 2.7, '1M': 24, '6M': 40.8, '1Y': 29 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, Record<Period, ChartPeriodData>> = {
  'AI & ML': {
    '1W': { top10: [100, 101.53, 102.22, 104.75, 106.09], spy: [100, 100.55, 100.8, 101.08, 100.93], top10Return: 6.1, spyReturn: 0.9, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 102.16, 105, 103.63, 106.46, 108.77, 106.53, 108.73, 109.61, 106.71, 104.56, 103.63, 106.28, 109.07, 110.25, 114.03, 113.95, 115.74, 116.48, 119.38, 120.89], spy: [100, 100.8, 102.2, 101.89, 102.73, 102.97, 102.81, 103.38, 104.2, 102.95, 102.87, 102.19, 103.24, 103.44, 103.85, 104.54, 104.52, 105.1, 105.36, 105.64, 105.49], top10Return: 21.6, spyReturn: 5.1, xLabels: ["May 5", "May 12", "May 19", "May 26", "Jun 2"] },
    '6M': { top10: [100, 102.74, 97.84, 101.18, 100.02, 102.23, 103.67, 104.69, 104.6, 101.37, 102.33, 102.64, 103.6, 99.9, 100.37, 100.5, 96.22, 100.78, 109.41, 116.12, 120.57, 123.45, 134.96, 129.67, 141.45, 150.19], spy: [100, 100.22, 99.61, 100.94, 100.06, 101.17, 101.57, 101.13, 101.53, 101.33, 100.03, 100.13, 100.71, 98.66, 97.18, 95.16, 93.04, 96.68, 100.67, 103.99, 104.94, 105.35, 108.48, 108.38, 110.13, 111.14], top10Return: 50.2, spyReturn: 11.1, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 103.37, 104.61, 107.27, 108.33, 110.66, 111.79, 112.41, 115.85, 115.4, 119.9, 115.43, 117.75, 117.38, 125.61, 128.27, 129.91, 132.6, 137.68, 135.19, 135.58, 142.44, 138.58, 137.37, 128.2, 129.94, 134.87, 138.68, 127.38, 135.45, 136, 137.91, 139.16, 140.01, 138.97, 136.57, 136.77, 137.03, 138.13, 135.77, 136.9, 135.32, 123.13, 135.17, 151.52, 157.73, 163.84, 168.05, 185.05, 177.42, 195.5, 208.25], spy: [100, 101.18, 101.68, 102.37, 104.21, 105.29, 105.32, 106.1, 107.18, 105.95, 108.43, 107.95, 108.85, 108.61, 110.04, 111.21, 111.54, 112.78, 113.56, 112.23, 113.26, 115.92, 113.92, 115.23, 111.37, 113.89, 115.38, 116, 113.28, 116.48, 115.26, 117.1, 116.79, 116.28, 116.75, 116.52, 115.02, 115.13, 115.8, 114.44, 112.88, 110.57, 106.62, 111.22, 117.17, 119.57, 120.66, 121.14, 124.73, 124.62, 126.64, 127.79], top10Return: 99.1, spyReturn: 27.8, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Semiconductors': {
    '1W': { top10: [100, 101.11, 100.17, 101.52, 103.59], spy: [100, 100.55, 100.8, 101.08, 100.93], top10Return: 3.6, spyReturn: 0.9, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 105.31, 109.62, 106.9, 115.22, 119.12, 113.51, 117.22, 117.09, 112.71, 109.16, 109.63, 114.44, 117.3, 119.02, 128.21, 127.18, 128.72, 127.61, 129.67, 132.12], spy: [100, 100.8, 102.2, 101.89, 102.73, 102.97, 102.81, 103.38, 104.2, 102.95, 102.87, 102.19, 103.24, 103.44, 103.85, 104.54, 104.52, 105.1, 105.36, 105.64, 105.49], top10Return: 33.8, spyReturn: 5.1, xLabels: ["May 5", "May 12", "May 19", "May 26", "Jun 2"] },
    '6M': { top10: [100, 104.96, 103.61, 105.65, 106.89, 111.39, 116.34, 116.77, 118.64, 121.32, 124.11, 123.07, 125.12, 118.28, 125.87, 130.13, 130.71, 135.33, 143.87, 150.47, 161.59, 168.55, 192.76, 184.07, 204.38, 207.83], spy: [100, 100.22, 99.61, 100.94, 100.06, 101.17, 101.57, 101.13, 101.53, 101.33, 100.03, 100.13, 100.71, 98.66, 97.18, 95.16, 93.04, 96.68, 100.67, 103.99, 104.94, 105.35, 108.48, 108.38, 110.13, 111.14], top10Return: 107.8, spyReturn: 11.1, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 107.21, 109.47, 113.67, 114.77, 118.66, 118.34, 118.17, 119.1, 116.25, 122.29, 119.26, 124.08, 120.37, 127.45, 131.45, 135.79, 138.12, 144.91, 145.54, 146.09, 150.91, 144.92, 145.43, 134.36, 139.46, 151.48, 156.44, 141.2, 150.33, 153.63, 161.78, 165.59, 167.34, 167.1, 172.6, 175.67, 174.24, 174.42, 163.16, 165.01, 165.42, 152.3, 170.67, 195.81, 208.5, 226.45, 235.1, 271.76, 251.01, 289.7, 289.41], spy: [100, 101.18, 101.68, 102.37, 104.21, 105.29, 105.32, 106.1, 107.18, 105.95, 108.43, 107.95, 108.85, 108.61, 110.04, 111.21, 111.54, 112.78, 113.56, 112.23, 113.26, 115.92, 113.92, 115.23, 111.37, 113.89, 115.38, 116, 113.28, 116.48, 115.26, 117.1, 116.79, 116.28, 116.75, 116.52, 115.02, 115.13, 115.8, 114.44, 112.88, 110.57, 106.62, 111.22, 117.17, 119.57, 120.66, 121.14, 124.73, 124.62, 126.64, 127.79], top10Return: 177.6, spyReturn: 27.8, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Broad Tech': {
    '1W': { top10: [100, 100.94, 102.22, 103.26, 103.31], spy: [100, 100.55, 100.8, 101.08, 100.93], top10Return: 3.3, spyReturn: 0.9, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 100.52, 102.64, 103.09, 103.73, 105.18, 105.23, 104.82, 106.25, 105.44, 104.5, 103.23, 104.34, 105.53, 107.42, 109.59, 110.99, 112, 113.16, 113.98, 114.12], spy: [100, 100.8, 102.2, 101.89, 102.73, 102.97, 102.81, 103.38, 104.2, 102.95, 102.87, 102.19, 103.24, 103.44, 103.85, 104.54, 104.52, 105.1, 105.36, 105.64, 105.49], top10Return: 14.7, spyReturn: 5.1, xLabels: ["May 5", "May 12", "May 19", "May 26", "Jun 2"] },
    '6M': { top10: [100, 102.9, 100.55, 102.63, 100.51, 102.96, 103, 102.92, 102.79, 98.44, 100.38, 100.92, 103.25, 100.86, 99.32, 100.16, 96.74, 100.56, 104.57, 112.1, 114.51, 117.59, 122.03, 122.07, 125.77, 130.94], spy: [100, 100.22, 99.61, 100.94, 100.06, 101.17, 101.57, 101.13, 101.53, 101.33, 100.03, 100.13, 100.71, 98.66, 97.18, 95.16, 93.04, 96.68, 100.67, 103.99, 104.94, 105.35, 108.48, 108.38, 110.13, 111.14], top10Return: 30.9, spyReturn: 11.1, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 101.94, 102.85, 105.04, 104.99, 107.09, 107.54, 108.53, 108.63, 107.56, 109.12, 106.57, 108.83, 107.71, 110.17, 112.82, 115.64, 116.58, 118.86, 117.9, 118.07, 120.77, 117.97, 118.84, 112.78, 114.62, 116.92, 118.85, 114.75, 117.3, 114.71, 118.04, 118.74, 119.89, 117.48, 115.94, 116.94, 117.38, 120.43, 117.74, 117.86, 118.16, 113.76, 119.35, 125.79, 130.74, 132.97, 136.26, 141.13, 139.78, 142.65, 149.17], spy: [100, 101.18, 101.68, 102.37, 104.21, 105.29, 105.32, 106.1, 107.18, 105.95, 108.43, 107.95, 108.85, 108.61, 110.04, 111.21, 111.54, 112.78, 113.56, 112.23, 113.26, 115.92, 113.92, 115.23, 111.37, 113.89, 115.38, 116, 113.28, 116.48, 115.26, 117.1, 116.79, 116.28, 116.75, 116.52, 115.02, 115.13, 115.8, 114.44, 112.88, 110.57, 106.62, 111.22, 117.17, 119.57, 120.66, 121.14, 124.73, 124.62, 126.64, 127.79], top10Return: 49.2, spyReturn: 27.8, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Electrification': {
    '1W': { top10: [100, 99.75, 99.23, 98.66, 99.55], spy: [100, 100.55, 100.8, 101.08, 100.93], top10Return: -0.4, spyReturn: 0.9, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 102, 103.51, 101.87, 102.78, 105.28, 103.63, 103.33, 103.67, 101.54, 98.07, 96.29, 97.48, 100.19, 102.16, 105.3, 105.72, 105.55, 105, 104.41, 105.36], spy: [100, 100.8, 102.2, 101.89, 102.73, 102.97, 102.81, 103.38, 104.2, 102.95, 102.87, 102.19, 103.24, 103.44, 103.85, 104.54, 104.52, 105.1, 105.36, 105.64, 105.49], top10Return: 5.1, spyReturn: 5.1, xLabels: ["May 5", "May 12", "May 19", "May 26", "Jun 2"] },
    '6M': { top10: [100, 101.8, 99.59, 101.2, 99.24, 103.03, 108.25, 111.15, 111.24, 113.03, 115.56, 116.86, 117.96, 109.39, 112.23, 111.44, 111.69, 114.22, 122.71, 127.81, 133.11, 137.92, 145.12, 134.87, 144.72, 144.41], spy: [100, 100.22, 99.61, 100.94, 100.06, 101.17, 101.57, 101.13, 101.53, 101.33, 100.03, 100.13, 100.71, 98.66, 97.18, 95.16, 93.04, 96.68, 100.67, 103.99, 104.94, 105.35, 108.48, 108.38, 110.13, 111.14], top10Return: 44.4, spyReturn: 11.1, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 104.29, 106.84, 105.71, 107, 111.01, 111.62, 117.08, 115.12, 115.45, 117.88, 118.11, 120.1, 117.75, 119.25, 123.4, 128.45, 131.08, 137.35, 144.63, 140.79, 142.5, 138.78, 143.25, 136.85, 137.25, 139.58, 142.72, 138.6, 143.32, 141.22, 144.33, 148.78, 153.14, 150.35, 152.77, 152.1, 154.24, 156.46, 151.83, 153.42, 152.69, 152.89, 157.22, 169.04, 174.69, 179.34, 181.85, 186.09, 179.76, 191.44, 193.11], spy: [100, 101.18, 101.68, 102.37, 104.21, 105.29, 105.32, 106.1, 107.18, 105.95, 108.43, 107.95, 108.85, 108.61, 110.04, 111.21, 111.54, 112.78, 113.56, 112.23, 113.26, 115.92, 113.92, 115.23, 111.37, 113.89, 115.38, 116, 113.28, 116.48, 115.26, 117.1, 116.79, 116.28, 116.75, 116.52, 115.02, 115.13, 115.8, 114.44, 112.88, 110.57, 106.62, 111.22, 117.17, 119.57, 120.66, 121.14, 124.73, 124.62, 126.64, 127.79], top10Return: 93.1, spyReturn: 27.8, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Industrials': {
    '1W': { top10: [100, 100.72, 100.09, 99.03, 98.44], spy: [100, 100.55, 100.8, 101.08, 100.93], top10Return: -1.6, spyReturn: 0.9, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 100.35, 102.25, 102.8, 101.53, 101.84, 102.4, 101.86, 102.16, 101.45, 99.66, 97.94, 98.1, 99.18, 99.68, 101.34, 102.87, 103.6, 102.96, 101.87, 101.27], spy: [100, 100.8, 102.2, 101.89, 102.73, 102.97, 102.81, 103.38, 104.2, 102.95, 102.87, 102.19, 103.24, 103.44, 103.85, 104.54, 104.52, 105.1, 105.36, 105.64, 105.49], top10Return: 0.8, spyReturn: 5.1, xLabels: ["May 5", "May 12", "May 19", "May 26", "Jun 2"] },
    '6M': { top10: [100, 101.64, 102.31, 104.25, 102.52, 107.24, 111.83, 113.25, 112.84, 115.28, 119.15, 121.56, 121.97, 116.47, 113.28, 112.92, 111.77, 115.47, 122.09, 123.37, 123.22, 124.14, 126.6, 123.94, 125.85, 125.96], spy: [100, 100.22, 99.61, 100.94, 100.06, 101.17, 101.57, 101.13, 101.53, 101.33, 100.03, 100.13, 100.71, 98.66, 97.18, 95.16, 93.04, 96.68, 100.67, 103.99, 104.94, 105.35, 108.48, 108.38, 110.13, 111.14], top10Return: 26, spyReturn: 11.1, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.74, 102.31, 103.71, 105.61, 107.07, 106.91, 107.69, 109.43, 109.89, 111.86, 110.1, 112.47, 110.86, 112.59, 113.47, 115.12, 116.79, 118.84, 117.46, 118.38, 120.11, 117.81, 117.19, 112.06, 114.64, 115.4, 117.57, 116.57, 120.58, 119.54, 125.37, 131.03, 131.41, 130.36, 136.7, 137.85, 139.72, 139.8, 132.38, 130.31, 129.74, 127.49, 132.88, 141.12, 142.22, 142.36, 142.7, 146.04, 143.29, 145.13, 145.31], spy: [100, 101.18, 101.68, 102.37, 104.21, 105.29, 105.32, 106.1, 107.18, 105.95, 108.43, 107.95, 108.85, 108.61, 110.04, 111.21, 111.54, 112.78, 113.56, 112.23, 113.26, 115.92, 113.92, 115.23, 111.37, 113.89, 115.38, 116, 113.28, 116.48, 115.26, 117.1, 116.79, 116.28, 116.75, 116.52, 115.02, 115.13, 115.8, 114.44, 112.88, 110.57, 106.62, 111.22, 117.17, 119.57, 120.66, 121.14, 124.73, 124.62, 126.64, 127.79], top10Return: 45.3, spyReturn: 27.8, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Meme': {
    '1W': { top10: [100, 101.82, 100.53, 100.75, 102.65], spy: [100, 100.55, 100.8, 101.08, 100.93], top10Return: 2.7, spyReturn: 0.9, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 103.63, 107.96, 102.56, 106.05, 110.98, 107.76, 110.17, 111.21, 106.85, 102.51, 100.92, 104.82, 111.2, 113.86, 117.68, 119.45, 121.64, 119.96, 120.13, 122.52], spy: [100, 100.8, 102.2, 101.89, 102.73, 102.97, 102.81, 103.38, 104.2, 102.95, 102.87, 102.19, 103.24, 103.44, 103.85, 104.54, 104.52, 105.1, 105.36, 105.64, 105.49], top10Return: 24, spyReturn: 5.1, xLabels: ["May 5", "May 12", "May 19", "May 26", "Jun 2"] },
    '6M': { top10: [100, 106.13, 93.92, 97.42, 92.74, 100.23, 102.95, 101.89, 96.21, 93.17, 92.05, 90.84, 93.48, 86.5, 90.52, 92.09, 90.64, 93.72, 104.73, 114.2, 113.07, 115.76, 125.36, 120.31, 135.78, 140.79], spy: [100, 100.22, 99.61, 100.94, 100.06, 101.17, 101.57, 101.13, 101.53, 101.33, 100.03, 100.13, 100.71, 98.66, 97.18, 95.16, 93.04, 96.68, 100.67, 103.99, 104.94, 105.35, 108.48, 108.38, 110.13, 111.14], top10Return: 40.8, spyReturn: 11.1, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.9, 101.87, 98.28, 95.9, 94.51, 93.79, 94.86, 92.05, 87.86, 86.88, 88.23, 88.18, 90.61, 90.4, 89.11, 93.31, 92.75, 95.08, 97.78, 97.53, 100.73, 97.53, 96.11, 92.5, 87.89, 86.96, 90.56, 86.53, 89.6, 91.66, 94.69, 92.57, 96.09, 95.37, 94.91, 92.64, 88.51, 91.29, 95.24, 99.83, 102.8, 97.96, 99.01, 104.03, 108.03, 106.61, 113.4, 115.73, 119.53, 125.38, 128.97], spy: [100, 101.18, 101.68, 102.37, 104.21, 105.29, 105.32, 106.1, 107.18, 105.95, 108.43, 107.95, 108.85, 108.61, 110.04, 111.21, 111.54, 112.78, 113.56, 112.23, 113.26, 115.92, 113.92, 115.23, 111.37, 113.89, 115.38, 116, 113.28, 116.48, 115.26, 117.1, 116.79, 116.28, 116.75, 116.52, 115.02, 115.13, 115.8, 114.44, 112.88, 110.57, 106.62, 111.22, 117.17, 119.57, 120.66, 121.14, 124.73, 124.62, 126.64, 127.79], top10Return: 29, spyReturn: 27.8, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
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
  proScore: number;       // confidence-adjusted score: avgWeight × sqrt(coverage%)
  coverage: number;       // 0-1: fraction of available ETFs holding this stock
  price: number;
  weeklyPrices: number[];
  weeklyChange: number;
  periodReturns: { '1M': number; '6M': number; '1Y': number };
  priceHistory?: { '1W': number[]; '1M': number[]; '6M': number[]; '1Y': number[] };
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
  price: number;
  weeklyChange: number;
};

// ── Theme configuration ───────────────────────────────────────────────────────

export const THEMES: Theme[] = ['AI & ML', 'Semiconductors', 'Broad Tech', 'Electrification', 'Industrials', 'Meme'];

// Last scan timestamp — patched by build-data-ts.js after each run
// @@GENERATED:SCAN_TIMESTAMP@@
export const SCAN_TIMESTAMP    = '2026-06-02T13:35:46.981Z';
export const SCAN_TIMESTAMP_NY = 'June 2, 2026 at 9:35 AM ET';
// @@END_GENERATED:SCAN_TIMESTAMP@@

// Number of ETFs per theme — denominator for Coverage Score display (x/n badge)
// @@GENERATED:THEME_ETF_COUNT@@
export const THEME_ETF_COUNT: Record<Theme, number> = {
  'AI & ML':         11,
  'Semiconductors':  4,
  'Broad Tech':      13,
  'Electrification': 4,
  'Industrials':     5,
  'Meme':            3,
};
// @@END_GENERATED:THEME_ETF_COUNT@@

export const THEME_ETFS: Record<Theme, string[]> = {
  'AI & ML':        ['AIS', 'ARTY', 'BAI', 'IVEP', 'IGPT', 'IVES', 'ALAI', 'CHAT', 'AIFD', 'SPRX', 'AOTG'],
  'Semiconductors': ['SOXX', 'PSI', 'XSD', 'DRAM'],
  'Broad Tech':     ['PTF', 'WCLD', 'MAGS', 'IGV', 'FDTX', 'GTEK', 'ARKK', 'MARS', 'FRWD', 'BCTK', 'FWD', 'CBSE', 'FCUS'],
  'Electrification':['POW', 'VOLT', 'PBD', 'PBW'],
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
  { ticker: 'MU', name: `Micron Technology Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 17.42, bestProScore: 7.22, price: 1024.76, weeklyChange: 10.38 },
  { ticker: 'AMD', name: `Advanced Micro Devices Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 14.13, bestProScore: 6.04, price: 509.80, weeklyChange: 2.88 },
  { ticker: 'NVDA', name: `NVIDIA Corp`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 13.70, bestProScore: 5.90, price: 225.82, weeklyChange: 6.22 },
  { ticker: 'AVGO', name: `Broadcom Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 9.43, bestProScore: 3.97, price: 485.30, weeklyChange: 15.04 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 8.43, bestProScore: 3.63, price: 263.40, weeklyChange: 32.56 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 8.38, bestProScore: 5.05, price: 293.65, weeklyChange: -0.77 },
  { ticker: 'MSFT', name: `MICROSOFT CORP`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 6.68, bestProScore: 4.17, price: 450.62, weeklyChange: 9.19 },
  { ticker: 'GOOGL', name: `ALPHABET INC CLASS A`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 6.51, bestProScore: 3.52, price: 361.43, weeklyChange: -7.05 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 6.28, bestProScore: 3.37, price: 438.01, weeklyChange: 3.61 },
  { ticker: 'AMZN', name: `AMAZON.COM INC`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 6.07, bestProScore: 3.50, price: 255.00, weeklyChange: -6.20 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': 5.6, '1M': 31.6, '6M': 116.2, '1Y': 222 },
  ARTY: { '1W': 11.9, '1M': 26.6, '6M': 65, '1Y': 114.4 },
  BAI:  { '1W': 2.6, '1M': 17.1, '6M': 47.4, '1Y': 94 },
  IVEP: { '1W': -1, '1M': -2.4, '6M': 7.5, '1Y': 7.5 },
  IGPT: { '1W': 2.9, '1M': 26.7, '6M': 72.6, '1Y': 121.8 },
  IVES: { '1W': 9.3, '1M': 23.1, '6M': 28.4, '1Y': 62.9 },
  ALAI: { '1W': 5.8, '1M': 16.5, '6M': 27.1, '1Y': 66.1 },
  CHAT: { '1W': 9.4, '1M': 29.4, '6M': 69.2, '1Y': 142.5 },
  AIFD: { '1W': 9.2, '1M': 19, '6M': 51.6, '1Y': 101.9 },
  SPRX: { '1W': 3.5, '1M': 32.8, '6M': 46.3, '1Y': 111.5 },
  AOTG: { '1W': 7.8, '1M': 17.1, '6M': 21, '1Y': 45.4 },
  // Semiconductors
  SOXX: { '1W': 4.2, '1M': 26.2, '6M': 94.1, '1Y': 182.5 },
  PSI:  { '1W': -0.8, '1M': 17.5, '6M': 103.5, '1Y': 207.7 },
  XSD:  { '1W': 0.4, '1M': 25.1, '6M': 91.7, '1Y': 178 },
  DRAM: { '1W': 10.6, '1M': 66.2, '6M': 142, '1Y': 142 },
  // Broad Tech
  PTF:  { '1W': 1.6, '1M': 16, '6M': 72.5, '1Y': 104.3 },
  WCLD: { '1W': 17.3, '1M': 19.7, '6M': 0.7, '1Y': -3.8 },
  MAGS: { '1W': -1.7, '1M': 3.4, '6M': 3.2, '1Y': 31.1 },
  IGV:  { '1W': 12.3, '1M': 20.6, '6M': -0.7, '1Y': 0.5 },
  FDTX: { '1W': 8, '1M': 22.1, '6M': 41.4, '1Y': 59.6 },
  GTEK: { '1W': 3.2, '1M': 15.7, '6M': 55, '1Y': 81.4 },
  ARKK: { '1W': 2.8, '1M': 4.2, '6M': 2.5, '1Y': 40.3 },
  MARS: { '1W': -12.5, '1M': 28.2, '6M': 57.9, '1Y': 57.9 },
  FRWD: { '1W': 5.3, '1M': 17.8, '6M': 34.8, '1Y': 34.8 },
  BCTK: { '1W': 4, '1M': 14.7, '6M': 28.4, '1Y': 28.4 },
  FWD:  { '1W': 3.1, '1M': 12.3, '6M': 38.5, '1Y': 75 },
  CBSE: { '1W': 0, '1M': 8.8, '6M': 27.9, '1Y': 47.6 },
  FCUS: { '1W': -0.4, '1M': 7.9, '6M': 40, '1Y': 81.9 },
  // Electrification
  POW:  { '1W': -2.4, '1M': -1.7, '6M': 56.4, '1Y': 53.3 },
  VOLT: { '1W': -1.4, '1M': -3.4, '6M': 32.7, '1Y': 65.5 },
  PBD:  { '1W': -0.2, '1M': 6.5, '6M': 40.3, '1Y': 90.9 },
  PBW:  { '1W': 2.2, '1M': 18.9, '6M': 48.2, '1Y': 162.7 },
  // Industrials
  AIRR: { '1W': -0.3, '1M': 1.4, '6M': 32.1, '1Y': 69 },
  PRN:  { '1W': -1.7, '1M': 3.9, '6M': 44.1, '1Y': 63.4 },
  RSHO: { '1W': -1.5, '1M': 3, '6M': 31.9, '1Y': 54.4 },
  IDEF: { '1W': -1.4, '1M': -1.1, '6M': 12.8, '1Y': 25.7 },
  BILT: { '1W': -2.9, '1M': -3.1, '6M': 8.9, '1Y': 14 },
  // Meme
  BUZZ: { '1W': 4, '1M': 18.8, '6M': 22.6, '1Y': 50.2 },
  MEME: { '1W': 0.9, '1M': 33.5, '6M': 81.6, '1Y': 18.6 },
  RKNG: { '1W': 3.1, '1M': 19.8, '6M': 18.1, '1Y': 18.1 },
};
// @@END_GENERATED:ETF_RETURNS@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 7.25, proScore: 6.56, coverage: 0.818,
      price: 1024.76, weeklyPrices: [928.41, 923.52, 971.00, 1035.50, 1024.76], weeklyChange: 10.38, sortRank: 0, periodReturns: { '1M': 89, '6M': 327.9, '1Y': 943.8 },
      priceHistory: { '1W': [928.41, 923.52, 971, 1035.5, 1024.76], '1M': [576.45, 640.2, 666.59, 646.63, 746.81, 795.33, 766.58, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1024.76], '6M': [239.49, 252.42, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 895.88, 1024.76], '1Y': [98.18, 110.95, 119.84, 127.91, 120.89, 122.24, 116.43, 109.22, 111.96, 109.06, 127.75, 122.05, 116.5, 118.72, 140, 159.99, 161.71, 182.15, 196.54, 191.94, 202.29, 221.91, 218.03, 241.11, 228.5, 224.53, 234.16, 263.71, 225.52, 286.68, 315.42, 345.09, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 448.42, 524.56, 576.45, 795.33, 681.54, 895.88, 1024.76] },
      velocityScore: { '1D': 3.8, '1W': 24.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 48.3, revenueGrowth: 196, eps: 21.23, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { AIS: 8.84, ARTY: 7.51, BAI: 5.92, IVEP: false, IGPT: 12.36, IVES: 7.35, ALAI: 1.14, CHAT: 6.24, AIFD: 6.7, SPRX: false, AOTG: 9.22 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 10, avgWeight: 6.18, proScore: 5.9, coverage: 0.909,
      price: 225.82, weeklyPrices: [212.60, 214.25, 211.14, 224.36, 225.82], weeklyChange: 6.22, sortRank: 0, periodReturns: { '1M': 13.8, '6M': 24.4, '1Y': 64.4 },
      priceHistory: { '1W': [212.6, 214.25, 211.14, 224.36, 225.82], '1M': [198.48, 196.5, 207.83, 211.5, 215.2, 219.44, 220.78, 225.83, 235.74, 225.32, 222.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 214.25, 211.14, 224.36, 225.82], '6M': [181.46, 184.97, 177.72, 189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 222.32, 214.86, 225.82], '1Y': [137.38, 142.63, 144.69, 147.9, 153.3, 162.88, 171.37, 167.03, 175.51, 178.26, 183.16, 175.64, 181.77, 170.62, 177.33, 170.29, 176.97, 187.24, 189.11, 179.83, 181.16, 201.03, 198.69, 193.16, 181.36, 177.82, 179.59, 183.78, 170.94, 188.61, 188.85, 184.86, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 202.06, 216.61, 198.48, 219.44, 222.32, 214.86, 225.82] },
      velocityScore: { '1D': 13.5, '1W': 3.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.5T', pe: 34.6, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.45,
      etfPresence: { AIS: 2.62, ARTY: 3.59, BAI: 4.61, IVEP: false, IGPT: 5.93, IVES: 4.29, ALAI: 13.49, CHAT: 5.97, AIFD: 6.58, SPRX: 3.96, AOTG: 10.8 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 9, avgWeight: 5.94, proScore: 5.38, coverage: 0.818,
      price: 509.8, weeklyPrices: [495.54, 518.09, 516.10, 510.13, 509.80], weeklyChange: 2.88, sortRank: 0, periodReturns: { '1M': 41.4, '6M': 136.9, '1Y': 344.7 },
      priceHistory: { '1W': [495.54, 518.09, 516.1, 510.13, 509.8], '1M': [341.54, 355.26, 421.39, 408.46, 455.19, 458.79, 448.29, 445.5, 449.7, 424.1, 420.99, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 518.09, 516.1, 510.13, 509.8], '6M': [215.24, 221.62, 209.17, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 420.99, 503.89, 509.8], '1Y': [114.63, 121.73, 126.39, 138.43, 136.11, 138.41, 160.08, 154.72, 177.44, 174.31, 174.95, 166.55, 166.62, 162.13, 159.54, 159.16, 160.88, 164.01, 235.56, 238.6, 238.03, 258.01, 250.05, 237.52, 230.29, 206.13, 217.6, 221.42, 198.11, 215.04, 223.47, 203.17, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 274.95, 334.63, 341.54, 458.79, 420.99, 503.89, 509.8] },
      velocityScore: { '1D': 3.9, '1W': 6.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$831B', pe: 169.4, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.54, ARTY: 7.1, BAI: 4.89, IVEP: false, IGPT: 7.03, IVES: 7.19, ALAI: 1.03, CHAT: 5.48, AIFD: false, SPRX: 0.53, AOTG: 15.71 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 4.77, proScore: 3.52, coverage: 0.545,
      price: 361.43, weeklyPrices: [388.83, 390.13, 380.34, 376.37, 361.43], weeklyChange: -7.05, sortRank: 0, periodReturns: { '1M': -6.3, '6M': 14.4, '1Y': 113.8 },
      priceHistory: { '1W': [388.83, 390.13, 380.34, 376.37, 361.43], '1M': [383.25, 388.43, 398.04, 397.99, 400.8, 388.64, 387.35, 402.62, 401.07, 396.78, 396.94, 387.66, 388.91, 387.66, 382.97, 388.88, 388.83, 390.13, 380.34, 376.37, 361.43], '6M': [315.81, 317.08, 306.57, 314.35, 313, 325.44, 332.78, 327.93, 338, 322.86, 305.72, 311.49, 306.52, 298.52, 302.28, 301, 274.34, 299.99, 321.31, 337.42, 350.34, 383.25, 388.64, 396.94, 388.88, 361.43], '1Y': [169.03, 176.09, 176.77, 166.77, 175.84, 176.62, 182.97, 191.34, 195.75, 194.67, 203.34, 201.57, 207.14, 230.66, 239.17, 249.53, 247.14, 244.9, 244.62, 251.03, 250.46, 267.47, 277.54, 291.31, 284.28, 323.44, 319.63, 320.21, 296.72, 314.09, 315.15, 328.57, 332.78, 327.93, 338, 322.86, 305.72, 311.49, 306.52, 306.36, 305.56, 302.06, 273.5, 305.46, 332.91, 337.42, 350.34, 383.25, 388.64, 396.94, 388.88, 361.43] },
      velocityScore: { '1D': 0.6, '1W': -7.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.4T', pe: 27.6, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.56, IVEP: false, IGPT: 6, IVES: 4.15, ALAI: false, CHAT: 5.35, AIFD: 5.26, SPRX: false, AOTG: 4.29 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 6, avgWeight: 4.57, proScore: 3.37, coverage: 0.545,
      price: 438.01, weeklyPrices: [422.73, 424.86, 418.45, 435.63, 438.01], weeklyChange: 3.61, sortRank: 0, periodReturns: { '1M': 10.1, '6M': 50, '1Y': 124.8 },
      priceHistory: { '1W': [422.73, 424.86, 418.45, 435.63, 438.01], '1M': [401.61, 394.41, 419.5, 414.15, 411.68, 404.54, 397.28, 399.8, 417.72, 404.35, 395.95, 392.61, 401.62, 407.15, 404.52, 412.32, 422.73, 424.86, 418.45, 435.63, 438.01], '6M': [292.09, 303.41, 286.87, 296.95, 303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 370.04, 369.11, 338.89, 338.31, 329.24, 326.74, 341.76, 369.57, 366.24, 404.98, 401.61, 404.54, 395.95, 412.32, 438.01], '1Y': [194.84, 207, 215.68, 220.09, 224.68, 231.84, 237.56, 234.6, 241.33, 232.47, 244.29, 232.7, 238.72, 231.39, 260.44, 262.79, 280.71, 288.47, 304.52, 304.71, 294.51, 301.53, 294.05, 291.17, 277.91, 284.68, 295.45, 310.14, 276.96, 298.8, 319.61, 323.63, 341.64, 334.87, 330.56, 348.85, 366.36, 370.04, 369.11, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 366.24, 404.98, 401.61, 404.54, 395.95, 412.32, 438.01] },
      velocityScore: { '1D': 12.7, '1W': 10.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 37.4, revenueGrowth: 35, eps: 11.72, grossMargin: 62, dividendYield: 0.87,
      etfPresence: { AIS: 3.21, ARTY: false, BAI: 4.3, IVEP: false, IGPT: false, IVES: 4.29, ALAI: 5.43, CHAT: false, AIFD: 3.18, SPRX: false, AOTG: 7 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 8, avgWeight: 3.82, proScore: 3.26, coverage: 0.727,
      price: 485.3, weeklyPrices: [421.86, 426.58, 446.77, 459.97, 485.30], weeklyChange: 15.04, sortRank: 0, periodReturns: { '1M': 15.2, '6M': 27.2, '1Y': 95.1 },
      priceHistory: { '1W': [421.86, 426.58, 446.77, 459.97, 485.3], '1M': [416.5, 427.36, 425.44, 412.56, 430, 428.43, 419.3, 416.79, 439.79, 425.19, 420.71, 411.07, 417.76, 414.57, 414.14, 422.01, 421.86, 426.58, 446.77, 459.97, 485.3], '6M': [381.57, 406.29, 341.3, 349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 420.71, 422.01, 485.3], '1Y': [248.71, 244.28, 252.1, 263.77, 264.74, 277.9, 280.81, 278.59, 297.42, 292.93, 312.83, 294.91, 298.01, 302.39, 369.57, 346.17, 339.31, 333.39, 345.5, 351.33, 342.66, 372.97, 351.94, 351.96, 340.5, 385.03, 380.61, 412.97, 326.02, 350.22, 347.62, 344.97, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 399.63, 418.2, 416.5, 428.43, 420.71, 422.01, 485.3] },
      velocityScore: { '1D': -1.2, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 94.2, revenueGrowth: 30, eps: 5.15, grossMargin: 77, dividendYield: 0.57,
      etfPresence: { AIS: 0.79, ARTY: 3.8, BAI: 5.46, IVEP: false, IGPT: false, IVES: 4.73, ALAI: 4.73, CHAT: 3.27, AIFD: 6.19, SPRX: false, AOTG: 1.63 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 4, avgWeight: 4.26, proScore: 2.57, coverage: 0.364,
      price: 255, weeklyPrices: [271.85, 274.00, 270.64, 261.26, 255.00], weeklyChange: -6.2, sortRank: 0, periodReturns: { '1M': -4.9, '6M': 8.8, '1Y': 23.4 },
      priceHistory: { '1W': [271.85, 274, 270.64, 261.26, 255], '1M': [272.05, 273.55, 274.99, 271.17, 272.68, 268.99, 265.82, 270.13, 267.22, 264.14, 264.86, 259.34, 265.01, 268.46, 266.32, 265.29, 271.85, 274, 270.64, 261.26, 255], '6M': [234.42, 227.92, 222.56, 232.14, 230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 198.79, 205.27, 208.39, 213.21, 207.67, 205.37, 199.34, 212.79, 239.89, 248.28, 261.12, 272.05, 268.99, 264.86, 265.29, 255], '1Y': [206.65, 216.98, 216.1, 212.77, 220.46, 222.54, 223.19, 227.47, 231.01, 213.75, 221.47, 228.01, 228.71, 225.99, 230.33, 231.62, 220.21, 220.63, 225.22, 215.57, 222.03, 229.25, 249.32, 249.1, 222.55, 229.67, 232.38, 231.78, 221.27, 232.38, 226.5, 247.38, 238.18, 239.16, 239.3, 210.32, 198.79, 205.27, 208.39, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 248.28, 261.12, 272.05, 268.99, 264.86, 265.29, 255] },
      velocityScore: { '1D': -10.8, '1W': -14.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.7T', pe: 30.9, revenueGrowth: 17, eps: 8.26, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.21, ALAI: 5.86, CHAT: 3.15, AIFD: 3.83, SPRX: false, AOTG: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 6, avgWeight: 3.45, proScore: 2.55, coverage: 0.545,
      price: 263.4, weeklyPrices: [198.70, 204.83, 205.00, 219.43, 263.40], weeklyChange: 32.56, sortRank: 0, periodReturns: { '1M': 59.7, '6M': 183.6, '1Y': 328.5 },
      priceHistory: { '1W': [198.7, 204.83, 205, 219.43, 263.4], '1M': [163.66, 168.75, 172.15, 160.01, 170.13, 170.84, 164.5, 177.95, 182.58, 176.89, 168.93, 176.27, 186.8, 190.69, 196.33, 208.26, 198.7, 204.83, 205, 219.43, 263.4], '6M': [92.89, 88.9, 84.07, 87.68, 84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 77.79, 80.86, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 163.66, 170.84, 168.93, 208.26, 263.4], '1Y': [61.47, 69.14, 70.42, 75.21, 76.24, 72.26, 70.85, 71.99, 76.34, 76.63, 77.81, 72.07, 74.26, 62.31, 67.1, 70.98, 80.09, 83.89, 92.5, 88.89, 84.26, 88.46, 87.59, 89.33, 78.68, 83.43, 100.2, 92.47, 81.7, 86.49, 89.39, 83.22, 80.38, 80.23, 78.92, 80.28, 78.61, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 147.84, 158.21, 163.66, 170.84, 168.93, 208.26, 263.4] },
      velocityScore: { '1D': 13.3, '1W': 9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$230B', pe: 90.2, revenueGrowth: 28, eps: 2.92, grossMargin: 52, dividendYield: 0.11,
      etfPresence: { AIS: 3.43, ARTY: 6.67, BAI: 1.05, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 1.34, AIFD: 4.98, SPRX: 3.25, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.72, proScore: 2.51, coverage: 0.455,
      price: 450.62, weeklyPrices: [412.67, 426.99, 450.24, 460.52, 450.62], weeklyChange: 9.19, sortRank: 0, periodReturns: { '1M': 8.7, '6M': -8, '1Y': -2.5 },
      priceHistory: { '1W': [412.67, 426.99, 450.24, 460.52, 450.62], '1M': [413.62, 411.38, 413.96, 420.77, 415.12, 412.66, 407.77, 405.21, 409.43, 421.92, 423.54, 417.42, 421.06, 419.09, 418.57, 416.03, 412.67, 426.99, 450.24, 460.52, 450.62], '6M': [490, 492.02, 476.39, 486.85, 483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 384.47, 398.55, 408.96, 395.55, 381.87, 356.77, 372.88, 384.37, 418.07, 424.82, 413.62, 412.66, 423.54, 416.03, 450.62], '1Y': [461.97, 472.75, 479.14, 490.11, 492.05, 503.51, 505.62, 505.27, 512.57, 527.75, 529.24, 509.77, 502.04, 505.35, 500.37, 510.02, 510.15, 519.71, 524.85, 513.43, 517.66, 542.07, 514.33, 508.68, 493.79, 476.99, 477.73, 478.56, 476.12, 488.02, 472.94, 479.28, 456.66, 465.95, 430.29, 401.14, 401.32, 384.47, 398.55, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 418.07, 424.82, 413.62, 412.66, 423.54, 416.03, 450.62] },
      velocityScore: { '1D': -3.5, '1W': -2.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3.3T', pe: 26.8, revenueGrowth: 18, eps: 16.81, grossMargin: 68, dividendYield: 0.79,
      etfPresence: { AIS: false, ARTY: 1.88, BAI: false, IVEP: false, IGPT: false, IVES: 3.96, ALAI: 5.83, CHAT: 3.09, AIFD: false, SPRX: false, AOTG: 3.85 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'ARM', name: 'ARM Holdings PLC', easyScore: 4, avgWeight: 3.71, proScore: 2.24, coverage: 0.364,
      price: 394.3, weeklyPrices: [302.71, 335.27, 353.29, 408.85, 394.30], weeklyChange: 30.26, sortRank: 0, periodReturns: { '1M': 86.7, '6M': 188.9, '1Y': 212.8 },
      priceHistory: { '1W': [302.71, 335.27, 353.29, 408.85, 394.3], '1M': [203.26, 208.84, 237.3, 213.31, 213.27, 212.65, 207.92, 221.21, 228.5, 209.16, 215.12, 223.15, 256.73, 298.23, 306.51, 321.22, 302.71, 335.27, 353.29, 408.85, 394.3], '6M': [136.48, 141.93, 121.1, 112.02, 109.31, 113.08, 105.11, 116.07, 105.36, 123.7, 125.28, 123.78, 124.37, 114.38, 115.75, 132.35, 144.13, 148.77, 157.58, 175.1, 215.88, 203.26, 212.65, 215.12, 321.22, 394.3], '1Y': [126.06, 138.61, 142.04, 156.41, 156.33, 148.02, 153.9, 156.5, 163.47, 137.23, 142.39, 134.01, 140.26, 131.42, 154.14, 153.37, 144.3, 150.38, 166.77, 170.67, 169.38, 173.09, 160.73, 149.74, 136.04, 131.44, 139.19, 141.52, 114.58, 111.55, 114.73, 111.79, 105.11, 116.07, 105.36, 123.7, 125.28, 123.78, 124.37, 117.63, 121.7, 136.89, 136.96, 143.86, 161.22, 175.1, 215.88, 203.26, 212.65, 215.12, 321.22, 394.3] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$421B', pe: 458.5, revenueGrowth: 20, eps: 0.86, grossMargin: 98, dividendYield: null,
      etfPresence: { AIS: 2.42, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: 0.63, CHAT: 4.68, AIFD: false, SPRX: 7.13, AOTG: false },
      tonyNote: 'Arm Holdings is held across Broad Tech and AI ETFs as the CPU architecture licensor embedded in every mobile device and increasingly in AI inference chips and data center CPUs. Revenue grew and the royalty model is high-margin; the weight score reflects consistent institutional positioning as the AI chip design ecosystem expands on Arm cores.',
    },
    {
      ticker: 'COHR', name: 'Coherent Corp', easyScore: 4, avgWeight: 3.55, proScore: 2.14, coverage: 0.364,
      price: 392, weeklyPrices: [380.18, 376.95, 361.47, 362.90, 392.00], weeklyChange: 3.11, sortRank: 0, periodReturns: { '1M': 19, '6M': 137.7, '1Y': 410.5 },
      priceHistory: { '1W': [380.18, 376.95, 361.47, 362.9, 392], '1M': [329.89, 335.73, 344.67, 319.19, 335.26, 379.69, 374.01, 403.71, 404.94, 382.45, 362.83, 353.63, 358.5, 378, 377.57, 381.35, 380.18, 376.95, 361.47, 362.9, 392], '6M': [164.89, 192.73, 175.2, 191.87, 184.57, 173.15, 195.96, 196.94, 212.18, 227.68, 217.23, 248.89, 298.91, 235.72, 242.76, 253.63, 243.48, 253.22, 307.93, 347.51, 321.53, 329.89, 379.69, 362.83, 381.35, 392], '1Y': [76.78, 81.19, 80.76, 80.96, 86.64, 91.25, 97.82, 97.02, 106.98, 105.6, 116.56, 87.76, 91.58, 88.47, 103.49, 103.41, 106.52, 114.65, 116.67, 110.41, 120.79, 134.24, 128.7, 158.01, 138.15, 148.85, 170.96, 197.45, 170.44, 191.37, 194.33, 178.06, 195.96, 196.94, 212.18, 227.68, 217.23, 248.89, 298.91, 252.32, 247.37, 255.05, 219.65, 255.1, 313.42, 347.51, 321.53, 329.89, 379.69, 362.83, 381.35, 392] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$77B', pe: 186.7, revenueGrowth: 21, eps: 2.1, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 0.88, ARTY: false, BAI: false, IVEP: 3.82, IGPT: false, IVES: false, ALAI: false, CHAT: 0.87, AIFD: false, SPRX: 8.64, AOTG: false },
      tonyNote: 'Coherent Corp appears in 4 of 11 AI & ML ETFs (36% coverage) with average weight 3.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 5, avgWeight: 3.15, proScore: 2.13, coverage: 0.455,
      price: 338.95, weeklyPrices: [325.33, 349.17, 342.85, 320.09, 338.95], weeklyChange: 4.19, sortRank: 0, periodReturns: { '1M': 67.2, '6M': 137.1, '1Y': 264.8 },
      priceHistory: { '1W': [325.33, 349.17, 342.85, 320.09, 338.95], '1M': [201.25, 215.69, 213.91, 195.65, 199.79, 207.35, 204.42, 224.09, 228.64, 232.68, 215.58, 244.26, 287.48, 297.84, 306.88, 318.72, 325.33, 349.17, 342.85, 320.09, 338.95], '6M': [142.94, 167.08, 144.94, 168.83, 166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 215.58, 318.72, 338.95], '1Y': [92.92, 92.35, 95.3, 87.26, 88.66, 99.86, 91.94, 116.91, 118.41, 135.54, 192, 171.06, 178.56, 176.61, 230.37, 249.38, 205.27, 194.5, 219.36, 161.46, 157.51, 168.25, 179.31, 167.55, 139.52, 144.78, 152.5, 164.32, 140.24, 169.97, 179.56, 162.61, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 175.8, 196.64, 201.25, 207.35, 215.58, 318.72, 338.95] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$58B', pe: 230.6, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 1.65, ARTY: 1.47, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: 1.58, CHAT: 3.42, AIFD: false, SPRX: 7.65, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 3, avgWeight: 3.96, proScore: 2.07, coverage: 0.273,
      price: 104.52, weeklyPrices: [121.77, 120.89, 114.68, 109.33, 104.52], weeklyChange: -14.17, sortRank: 0, periodReturns: { '1M': 4.9, '6M': 140.4, '1Y': 429.5 },
      priceHistory: { '1W': [121.77, 120.89, 114.68, 109.33, 104.52], '1M': [95.78, 108.15, 113.01, 109.62, 124.92, 129.44, 120.61, 120.29, 115.93, 108.77, 108.17, 110.8, 118.96, 118.5, 119.84, 123.52, 121.77, 120.89, 114.68, 109.33, 104.52], '6M': [43.47, 40.5, 37.31, 36.35, 36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 43.63, 45.5, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 129.44, 108.17, 123.52, 104.52], '1Y': [19.74, 20.48, 20.74, 22.55, 22.85, 23.44, 22.69, 23.24, 20.41, 20.19, 21.81, 25.31, 24.35, 24, 24.77, 24.9, 31.22, 35.94, 37.43, 37.15, 38.12, 41.53, 37.03, 37.88, 34.33, 35.83, 43.76, 40.78, 36.05, 36.16, 39.38, 45.55, 48.32, 45.07, 46.47, 50.59, 46.79, 43.63, 45.5, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 65.7, 84.99, 95.78, 129.44, 108.17, 123.52, 104.52] },
      velocityScore: { '1D': -20.1, '1W': -28.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$525B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 2.96, ARTY: false, BAI: 2.65, IVEP: false, IGPT: 6.27, IVES: false, ALAI: false, CHAT: false, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 5, avgWeight: 3.02, proScore: 2.04, coverage: 0.455,
      price: 601.12, weeklyPrices: [635.26, 635.29, 632.51, 600.47, 601.12], weeklyChange: -5.37, sortRank: 0, periodReturns: { '1M': -1.3, '6M': -7.1, '1Y': -10.4 },
      priceHistory: { '1W': [635.26, 635.29, 632.51, 600.47, 601.12], '1M': [610.41, 604.96, 612.88, 616.81, 609.63, 598.86, 603, 616.63, 618.43, 614.23, 611.21, 602.61, 605.06, 607.38, 610.26, 612.34, 635.26, 635.29, 632.51, 600.47, 601.12], '6M': [647.1, 656.96, 657.15, 664.94, 660.09, 646.06, 620.8, 658.76, 716.5, 661.46, 639.77, 637.25, 653.56, 644.86, 613.71, 593.66, 525.72, 573.02, 634.53, 670.91, 678.62, 610.41, 598.86, 611.21, 612.34, 601.12], '1Y': [670.9, 694.06, 702.12, 712.2, 719.22, 732.78, 702.91, 704.81, 700, 763.46, 790, 751.48, 754.1, 737.05, 751.98, 775.72, 760.66, 717.34, 717.84, 717.55, 733.27, 751.44, 627.32, 627.08, 597.69, 636.22, 639.6, 650.13, 649.5, 667.55, 650.41, 653.06, 620.8, 658.76, 716.5, 661.46, 639.77, 637.25, 653.56, 647.39, 627.45, 604.06, 536.38, 575.05, 662.49, 670.91, 678.62, 610.41, 598.86, 611.21, 612.34, 601.12] },
      velocityScore: { '1D': -23.3, '1W': -25.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 21.9, revenueGrowth: 33, eps: 27.5, grossMargin: 82, dividendYield: 0.35,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: 4.55, IVES: 3.23, ALAI: 3.88, CHAT: 2.24, AIFD: false, SPRX: false, AOTG: 1.21 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 5, avgWeight: 2.97, proScore: 2.01, coverage: 0.455,
      price: 341.67, weeklyPrices: [319.78, 314.18, 315.71, 323.39, 341.67], weeklyChange: 6.85, sortRank: 0, periodReturns: { '1M': 4.1, '6M': 88.9, '1Y': 212.8 },
      priceHistory: { '1W': [319.78, 314.18, 315.71, 323.39, 341.67], '1M': [330.97, 341.02, 358.92, 340.01, 339.97, 367.92, 367.13, 369.99, 376.23, 370.94, 339.73, 322.63, 315.67, 323.4, 327.46, 323.91, 319.78, 314.18, 315.71, 323.39, 341.67], '6M': [180.91, 178.38, 160.66, 166.26, 162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 234.53, 245.42, 257.75, 241.78, 258.88, 255.88, 251.07, 258.73, 299.96, 314.41, 322.43, 330.97, 367.92, 339.73, 323.91, 341.67], '1Y': [109.23, 112, 116.45, 122.32, 122.54, 128.37, 125.4, 125.29, 142.7, 138.76, 143.72, 129.05, 127.93, 125.59, 136.74, 136.83, 141.62, 161.59, 167.38, 180.51, 174.8, 190.57, 180.82, 179.05, 164.86, 169.57, 178.88, 181.82, 149.83, 166.87, 175.61, 163.58, 172.54, 182.49, 186.18, 195.58, 234.53, 245.42, 257.75, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 314.41, 322.43, 330.97, 367.92, 339.73, 323.91, 341.67] },
      velocityScore: { '1D': 7.5, '1W': 0.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$131B', pe: 85.8, revenueGrowth: 30, eps: 3.98, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 3.77, ARTY: false, BAI: 1.96, IVEP: 4.23, IGPT: false, IVES: false, ALAI: false, CHAT: 0.83, AIFD: 4.08, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 4, avgWeight: 3.25, proScore: 1.96, coverage: 0.364,
      price: 976.52, weeklyPrices: [902.31, 860.62, 854.96, 905.00, 976.52], weeklyChange: 8.22, sortRank: 0, periodReturns: { '1M': 2.8, '6M': 222.5, '1Y': 1187.3 },
      priceHistory: { '1W': [902.31, 860.62, 854.96, 905, 976.52], '1M': [976.18, 994.56, 944.28, 892.58, 903.8, 1053.09, 992.37, 1030.37, 1001.81, 970.7, 884.98, 890.09, 868.07, 964.5, 946.9, 910.81, 902.31, 860.62, 854.96, 905, 976.52], '6M': [302.81, 360.33, 316.15, 387.41, 368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 674.73, 783.25, 558.44, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 1053.09, 884.98, 910.81, 976.52], '1Y': [75.86, 82.11, 85.78, 91.81, 91.49, 90.44, 99.63, 99.63, 109.48, 108.15, 119.66, 117.96, 124.62, 134.12, 164.88, 163.34, 152.75, 171.4, 163.09, 156.57, 162.95, 198.39, 188.36, 252.47, 247.43, 291.27, 302.98, 366, 320.25, 395.92, 386.11, 351.42, 343.27, 339.19, 391.84, 551.99, 562.74, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 895.11, 859.68, 976.18, 1053.09, 884.98, 910.81, 976.52] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$76B', pe: 171.3, revenueGrowth: 90, eps: 5.7, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.8, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 1.01, AIFD: 5.82, SPRX: 3.39, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 4 of 11 AI & ML ETFs (36% coverage) with average weight 3.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NBIS', name: 'NEBIUS GROUP NV', easyScore: 3, avgWeight: 3.64, proScore: 1.9, coverage: 0.273,
      price: 273.13, weeklyPrices: [208.37, 226.34, 231.09, 264.51, 273.13], weeklyChange: 31.08, sortRank: 0, periodReturns: { '1M': 76.8, '6M': 183.2, '1Y': 658.3 },
      priceHistory: { '1W': [208.37, 226.34, 231.09, 264.51, 273.13], '1M': [176.42, 175.92, 195.09, 184.77, 177.05, 186.1, 179.11, 207.27, 221.15, 219.94, 199.86, 197.73, 191.82, 219.93, 214.77, 208.06, 208.37, 226.34, 231.09, 264.51, 273.13], '6M': [96.45, 96.41, 80.95, 90.03, 83.71, 97.3, 103.89, 94.5, 85.19, 86.1, 98.01, 100.61, 91.01, 89.33, 112.95, 117.62, 100.82, 112.54, 154.56, 159.16, 144.96, 176.42, 186.1, 199.86, 208.06, 273.13], '1Y': [36.02, 52.58, 50.46, 51.02, 50.31, 46.05, 53.31, 51.01, 50.4, 55.17, 75.33, 67.19, 70.48, 65.65, 93.39, 94.08, 113.23, 115.61, 122, 125.83, 104.28, 121.83, 110.54, 102.22, 90.54, 88.88, 98.92, 93.59, 75.45, 91.13, 89.95, 97.93, 103.89, 94.5, 85.19, 86.1, 98.01, 100.61, 91.01, 94.94, 129.85, 114.15, 92.26, 117.4, 161.94, 159.16, 144.96, 176.42, 186.1, 199.86, 208.06, 273.13] },
      velocityScore: { '1D': -6.4, '1W': -6.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$69B', pe: 105.5, revenueGrowth: 684, eps: 2.59, grossMargin: 72, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 3.32, ALAI: 4.58, CHAT: 3.02, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 3, avgWeight: 3.53, proScore: 1.84, coverage: 0.273,
      price: 244.03, weeklyPrices: [190.96, 203.70, 225.78, 248.15, 244.03], weeklyChange: 27.79, sortRank: 0, periodReturns: { '1M': 42, '6M': 21.4, '1Y': 46.5 },
      priceHistory: { '1W': [190.96, 203.7, 225.78, 248.15, 244.03], '1M': [180.29, 185.35, 194.03, 194.59, 195.95, 193.84, 186.83, 189.76, 195.61, 192.95, 186.61, 181.46, 188.16, 189.77, 192.08, 193.06, 190.96, 203.7, 225.78, 248.15, 244.03], '6M': [201.1, 221.53, 188.65, 195.34, 194.91, 189.65, 189.85, 177.16, 164.58, 142.82, 160.14, 141.31, 149.25, 152.96, 155.11, 149.68, 139.66, 145.54, 155.62, 177.58, 172.96, 180.29, 193.84, 186.61, 193.06, 244.03], '1Y': [166.57, 177.15, 211.1, 215.27, 218.96, 235.81, 241.3, 238.11, 249.98, 255.67, 253.86, 234.62, 234.21, 223.45, 328.33, 301.41, 308.46, 289.01, 288.63, 303.62, 275.15, 280.83, 248.17, 236.15, 220.49, 197.03, 207.73, 223.01, 178.46, 197.49, 195.71, 198.52, 189.85, 177.16, 164.58, 142.82, 160.14, 141.31, 149.25, 151.56, 155.97, 154.34, 138.8, 143.17, 163, 177.58, 172.96, 180.29, 193.84, 186.61, 193.06, 244.03] },
      velocityScore: { '1D': -9.8, '1W': -2.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$702B', pe: 43.9, revenueGrowth: 22, eps: 5.56, grossMargin: 67, dividendYield: 0.81,
      etfPresence: { AIS: false, ARTY: 4.62, BAI: false, IVEP: false, IGPT: false, IVES: 4.18, ALAI: false, CHAT: 1.79, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Oracle lands in 3 AI ETFs on the strength of its cloud database and AI infrastructure contracts. Revenue grew 22%, 67% gross margin, P/E of 40x. The 17.5% weekly return following a major earnings beat shows how quickly sentiment can reprice; the weight score at 2.04% is still modest, meaning ETF managers have started building positions but conviction is not yet deep.',
    },
    {
      ticker: 'ANET', name: 'Arista Networks Inc', easyScore: 7, avgWeight: 2.3, proScore: 1.83, coverage: 0.636,
      price: 176.43, weeklyPrices: [154.31, 155.27, 159.47, 170.68, 176.43], weeklyChange: 14.33, sortRank: 0, periodReturns: { '1M': 2.2, '6M': 38.7, '1Y': 96.5 },
      priceHistory: { '1W': [154.31, 155.27, 159.47, 170.68, 176.43], '1M': [172.62, 170.22, 147.06, 141.75, 141.77, 136.43, 142.54, 140.69, 147.81, 141.97, 141.71, 141.58, 140.49, 148.59, 154.03, 158.01, 154.31, 155.27, 159.47, 170.68, 176.43], '6M': [127.22, 130.04, 126.13, 131.32, 131.03, 123.72, 130.59, 136.34, 141.74, 137.49, 141.59, 127.43, 129.3, 132.89, 133.57, 131.22, 120.77, 126.25, 152.02, 166.85, 172.47, 172.62, 136.43, 141.71, 158.01, 176.43], '1Y': [89.78, 96.8, 95.09, 94.97, 98.91, 106.28, 108.3, 109.78, 118.62, 118.12, 141.25, 132.78, 134.27, 137.38, 150.72, 142.84, 142.64, 149.27, 157.36, 143.38, 145.94, 156.77, 153.55, 134.93, 123.45, 125.04, 127.8, 132.36, 122.36, 130.77, 133.6, 122.89, 130.59, 136.34, 141.74, 137.49, 141.59, 127.43, 129.3, 137.17, 135.35, 135.88, 116.13, 133.64, 154.37, 166.85, 172.47, 172.62, 136.43, 141.71, 158.01, 176.43] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$222B', pe: 60.8, revenueGrowth: 35, eps: 2.9, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: 1.46, ARTY: 2, BAI: 1.42, IVEP: false, IGPT: false, IVES: false, ALAI: 1.01, CHAT: 2.39, AIFD: 4.77, SPRX: 3.02, AOTG: false },
      tonyNote: 'Arista Networks Inc appears in 7 of 11 AI & ML ETFs (64% coverage) with average weight 2.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KLAC', name: 'KLAC', easyScore: 2, avgWeight: 4.11, proScore: 1.75, coverage: 0.182,
      price: 1960.01, weeklyPrices: [1957.19, 1927.63, 1921.71, 1940.04, 1960.01], weeklyChange: 0.14, sortRank: 0, periodReturns: { '1M': 13.5, '6M': 64.7, '1Y': 157.1 },
      priceHistory: { '1W': [1957.19, 1927.63, 1921.71, 1940.04, 1960.01], '1M': [1713.32, 1732.9, 1816.29, 1763.25, 1869.19, 1845.19, 1811.35, 1849.71, 1892.94, 1804.32, 1756.45, 1740.58, 1829.47, 1842.18, 1888.38, 2011.39, 1957.19, 1927.63, 1921.71, 1940.04, 1960.01], '6M': [1189.86, 1225.61, 1223.37, 1268.75, 1215.08, 1324.6, 1544.96, 1512.78, 1427.94, 1442.95, 1464.13, 1487.66, 1534.95, 1344.55, 1418.64, 1498.67, 1443.21, 1540.06, 1768.78, 1805.32, 1900, 1713.32, 1845.19, 1756.45, 2011.39, 1960.01], '1Y': [762.44, 829.29, 892.38, 889.03, 898.85, 923.18, 933.49, 892.22, 916.09, 883.41, 935.53, 876.08, 888.1, 843.9, 932.63, 989.87, 1068.67, 1128.87, 1062.59, 1087.01, 1147.43, 1206.04, 1193.49, 1190.9, 1123.09, 1145.89, 1211.75, 1238.91, 1172.02, 1276.99, 1274.47, 1400, 1544.96, 1512.78, 1427.94, 1442.95, 1464.13, 1487.66, 1534.95, 1429.1, 1438.24, 1511.43, 1382.58, 1548.85, 1795.91, 1805.32, 1900, 1713.32, 1845.19, 1756.45, 2011.39, 1960.01] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$256B', pe: 55.5, revenueGrowth: 12, eps: 35.31, grossMargin: 61, dividendYield: 0.47,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: false, AIFD: 2.4, SPRX: 5.82, AOTG: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 7.22, proScore: 7.22, coverage: 1,
      price: 1024.76, weeklyPrices: [928.41, 923.52, 971.00, 1035.50, 1024.76], weeklyChange: 10.38, sortRank: 0, periodReturns: { '1M': 89, '6M': 327.9, '1Y': 943.8 },
      priceHistory: { '1W': [928.41, 923.52, 971, 1035.5, 1024.76], '1M': [576.45, 640.2, 666.59, 646.63, 746.81, 795.33, 766.58, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1024.76], '6M': [239.49, 252.42, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 895.88, 1024.76], '1Y': [98.18, 110.95, 119.84, 127.91, 120.89, 122.24, 116.43, 109.22, 111.96, 109.06, 127.75, 122.05, 116.5, 118.72, 140, 159.99, 161.71, 182.15, 196.54, 191.94, 202.29, 221.91, 218.03, 241.11, 228.5, 224.53, 234.16, 263.71, 225.52, 286.68, 315.42, 345.09, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 448.42, 524.56, 576.45, 795.33, 681.54, 895.88, 1024.76] },
      velocityScore: { '1D': 5.6, '1W': 25.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 48.3, revenueGrowth: 196, eps: 21.23, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { SOXX: 12.33, PSI: 8.15, XSD: 3.75, DRAM: 4.65 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 6.98, proScore: 6.04, coverage: 0.75,
      price: 509.8, weeklyPrices: [495.54, 518.09, 516.10, 510.13, 509.80], weeklyChange: 2.88, sortRank: 0, periodReturns: { '1M': 41.4, '6M': 136.9, '1Y': 344.7 },
      priceHistory: { '1W': [495.54, 518.09, 516.1, 510.13, 509.8], '1M': [341.54, 355.26, 421.39, 408.46, 455.19, 458.79, 448.29, 445.5, 449.7, 424.1, 420.99, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 518.09, 516.1, 510.13, 509.8], '6M': [215.24, 221.62, 209.17, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 420.99, 503.89, 509.8], '1Y': [114.63, 121.73, 126.39, 138.43, 136.11, 138.41, 160.08, 154.72, 177.44, 174.31, 174.95, 166.55, 166.62, 162.13, 159.54, 159.16, 160.88, 164.01, 235.56, 238.6, 238.03, 258.01, 250.05, 237.52, 230.29, 206.13, 217.6, 221.42, 198.11, 215.04, 223.47, 203.17, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 274.95, 334.63, 341.54, 458.79, 420.99, 503.89, 509.8] },
      velocityScore: { '1D': -0.8, '1W': 6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$831B', pe: 169.4, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 9.33, PSI: 7.84, XSD: 3.77, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'MXL', name: 'MaxLinear Inc', easyScore: 2, avgWeight: 7.19, proScore: 5.08, coverage: 0.5,
      price: 93.76, weeklyPrices: [101.10, 97.76, 92.93, 86.23, 93.76], weeklyChange: -7.26, sortRank: 0, periodReturns: { '1M': 21.5, '6M': 465.2, '1Y': 699.3 },
      priceHistory: { '1W': [101.1, 97.76, 92.93, 86.23, 93.76], '1M': [78.12, 81.68, 81.23, 82.37, 99.83, 102.27, 91.93, 87.73, 88.78, 92.34, 87.46, 94.86, 96.77, 99.67, 99.16, 96.12, 101.1, 97.76, 92.93, 86.23, 93.76], '6M': [16.59, 19.45, 17.14, 17.69, 17.43, 18.57, 19.19, 18.41, 17.35, 18.72, 19.53, 17.94, 17.99, 15.72, 16.89, 16.56, 17, 18.45, 21.31, 31.73, 51.65, 78.12, 102.27, 87.46, 96.12, 93.76], '1Y': [11.73, 12.58, 12.11, 13.6, 14.2, 14.91, 14.58, 15.44, 17.31, 15.12, 15.97, 14.36, 17.22, 15.23, 15.78, 16.16, 16.08, 16.36, 16.23, 17.4, 17.83, 15.77, 14.32, 14.8, 13.1, 15.46, 17.93, 19.61, 16.98, 17.54, 18.51, 19, 19.19, 18.41, 17.35, 18.72, 19.53, 17.94, 17.99, 15.94, 17.32, 17.14, 16.08, 18.41, 21.56, 31.73, 51.65, 78.12, 102.27, 87.46, 96.12, 93.76] },
      velocityScore: { '1D': -5.9, '1W': -12.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$8B', pe: null, revenueGrowth: 43, eps: -1.52, grossMargin: 57, dividendYield: null,
      etfPresence: { SOXX: false, PSI: 8.48, XSD: 5.9, DRAM: false },
      tonyNote: 'MaxLinear holds the highest average weight in the Semiconductor theme at 7.71% across 2 ETFs. Revenue grew 43%, 57% gross margin, but EPS is negative at -$1.52 and the market cap is only $8B. The 716% 1-year return is an extreme recovery from the 2023 inventory correction lows; the two ETFs holding it are making a concentrated bet on a return to profitability in the analog semiconductor cycle.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 3, avgWeight: 4.59, proScore: 3.97, coverage: 0.75,
      price: 485.3, weeklyPrices: [421.86, 426.58, 446.77, 459.97, 485.30], weeklyChange: 15.04, sortRank: 0, periodReturns: { '1M': 15.2, '6M': 27.2, '1Y': 95.1 },
      priceHistory: { '1W': [421.86, 426.58, 446.77, 459.97, 485.3], '1M': [416.5, 427.36, 425.44, 412.56, 430, 428.43, 419.3, 416.79, 439.79, 425.19, 420.71, 411.07, 417.76, 414.57, 414.14, 422.01, 421.86, 426.58, 446.77, 459.97, 485.3], '6M': [381.57, 406.29, 341.3, 349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 420.71, 422.01, 485.3], '1Y': [248.71, 244.28, 252.1, 263.77, 264.74, 277.9, 280.81, 278.59, 297.42, 292.93, 312.83, 294.91, 298.01, 302.39, 369.57, 346.17, 339.31, 333.39, 345.5, 351.33, 342.66, 372.97, 351.94, 351.96, 340.5, 385.03, 380.61, 412.97, 326.02, 350.22, 347.62, 344.97, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 399.63, 418.2, 416.5, 428.43, 420.71, 422.01, 485.3] },
      velocityScore: { '1D': 3.4, '1W': 7.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 94.2, revenueGrowth: 30, eps: 5.15, grossMargin: 77, dividendYield: 0.57,
      etfPresence: { SOXX: 7.07, PSI: 4.65, XSD: 2.04, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 5.13, proScore: 3.63, coverage: 0.5,
      price: 263.4, weeklyPrices: [198.70, 204.83, 205.00, 219.43, 263.40], weeklyChange: 32.56, sortRank: 0, periodReturns: { '1M': 59.7, '6M': 183.6, '1Y': 328.5 },
      priceHistory: { '1W': [198.7, 204.83, 205, 219.43, 263.4], '1M': [163.66, 168.75, 172.15, 160.01, 170.13, 170.84, 164.5, 177.95, 182.58, 176.89, 168.93, 176.27, 186.8, 190.69, 196.33, 208.26, 198.7, 204.83, 205, 219.43, 263.4], '6M': [92.89, 88.9, 84.07, 87.68, 84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 77.79, 80.86, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 163.66, 170.84, 168.93, 208.26, 263.4], '1Y': [61.47, 69.14, 70.42, 75.21, 76.24, 72.26, 70.85, 71.99, 76.34, 76.63, 77.81, 72.07, 74.26, 62.31, 67.1, 70.98, 80.09, 83.89, 92.5, 88.89, 84.26, 88.46, 87.59, 89.33, 78.68, 83.43, 100.2, 92.47, 81.7, 86.49, 89.39, 83.22, 80.38, 80.23, 78.92, 80.28, 78.61, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 147.84, 158.21, 163.66, 170.84, 168.93, 208.26, 263.4] },
      velocityScore: { '1D': 7.4, '1W': 7.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$230B', pe: 90.2, revenueGrowth: 28, eps: 2.92, grossMargin: 52, dividendYield: 0.11,
      etfPresence: { SOXX: 6.59, PSI: false, XSD: 3.68, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 3.96, proScore: 3.43, coverage: 0.75,
      price: 225.82, weeklyPrices: [212.60, 214.25, 211.14, 224.36, 225.82], weeklyChange: 6.22, sortRank: 0, periodReturns: { '1M': 13.8, '6M': 24.4, '1Y': 64.4 },
      priceHistory: { '1W': [212.6, 214.25, 211.14, 224.36, 225.82], '1M': [198.48, 196.5, 207.83, 211.5, 215.2, 219.44, 220.78, 225.83, 235.74, 225.32, 222.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 214.25, 211.14, 224.36, 225.82], '6M': [181.46, 184.97, 177.72, 189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 222.32, 214.86, 225.82], '1Y': [137.38, 142.63, 144.69, 147.9, 153.3, 162.88, 171.37, 167.03, 175.51, 178.26, 183.16, 175.64, 181.77, 170.62, 177.33, 170.29, 176.97, 187.24, 189.11, 179.83, 181.16, 201.03, 198.69, 193.16, 181.36, 177.82, 179.59, 183.78, 170.94, 188.61, 188.85, 184.86, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 202.06, 216.61, 198.48, 219.44, 222.32, 214.86, 225.82] },
      velocityScore: { '1D': 6.9, '1W': 0.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.5T', pe: 34.6, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.45,
      etfPresence: { SOXX: 6.22, PSI: 3.83, XSD: 1.83, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 2, avgWeight: 4.67, proScore: 3.3, coverage: 0.5,
      price: 104.52, weeklyPrices: [121.77, 120.89, 114.68, 109.33, 104.52], weeklyChange: -14.17, sortRank: 0, periodReturns: { '1M': 4.9, '6M': 140.4, '1Y': 429.5 },
      priceHistory: { '1W': [121.77, 120.89, 114.68, 109.33, 104.52], '1M': [95.78, 108.15, 113.01, 109.62, 124.92, 129.44, 120.61, 120.29, 115.93, 108.77, 108.17, 110.8, 118.96, 118.5, 119.84, 123.52, 121.77, 120.89, 114.68, 109.33, 104.52], '6M': [43.47, 40.5, 37.31, 36.35, 36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 43.63, 45.5, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 129.44, 108.17, 123.52, 104.52], '1Y': [19.74, 20.48, 20.74, 22.55, 22.85, 23.44, 22.69, 23.24, 20.41, 20.19, 21.81, 25.31, 24.35, 24, 24.77, 24.9, 31.22, 35.94, 37.43, 37.15, 38.12, 41.53, 37.03, 37.88, 34.33, 35.83, 43.76, 40.78, 36.05, 36.16, 39.38, 45.55, 48.32, 45.07, 46.47, 50.59, 46.79, 43.63, 45.5, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 65.7, 84.99, 95.78, 129.44, 108.17, 123.52, 104.52] },
      velocityScore: { '1D': -4.3, '1W': -12.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$525B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 5.88, PSI: false, XSD: 3.45, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 4.25, proScore: 3.01, coverage: 0.5,
      price: 467.78, weeklyPrices: [448.25, 449.68, 450.06, 458.17, 467.78], weeklyChange: 4.36, sortRank: 0, periodReturns: { '1M': 20.2, '6M': 76.3, '1Y': 197.4 },
      priceHistory: { '1W': [448.25, 449.68, 450.06, 458.17, 467.78], '1M': [391.38, 410.82, 428.62, 410.64, 435.44, 443.62, 431.2, 436.61, 440.56, 436.62, 413.57, 406.91, 426.85, 427.36, 432.16, 454.89, 448.25, 449.68, 450.06, 458.17, 467.78], '6M': [265.33, 267.14, 258.84, 260.23, 256.99, 281.64, 319.08, 322.38, 322.32, 322.51, 354.91, 373.55, 372.18, 324.74, 341.53, 357.06, 337.17, 352.62, 395.73, 391.62, 404.86, 391.38, 443.62, 413.57, 454.89, 467.78], '1Y': [157.27, 169.79, 176.55, 180.18, 183.76, 195.39, 194.81, 187.14, 188.41, 179.15, 188.45, 162.22, 164.51, 156.25, 163.42, 178.13, 201.44, 217.74, 217.51, 227.58, 226, 227.64, 230.19, 228.67, 225.12, 242.46, 268.63, 275.15, 248.27, 260.78, 268.87, 301.18, 319.08, 322.38, 322.32, 322.51, 354.91, 373.55, 372.18, 338.94, 346.18, 361.79, 323.12, 354.31, 395.64, 391.62, 404.86, 391.38, 443.62, 413.57, 454.89, 467.78] },
      velocityScore: { '1D': 2, '1W': 2.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$371B', pe: 44, revenueGrowth: 11, eps: 10.63, grossMargin: 49, dividendYield: 0.46,
      etfPresence: { SOXX: 4.5, PSI: 4, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 3, avgWeight: 3.38, proScore: 2.93, coverage: 0.75,
      price: 300.51, weeklyPrices: [317.45, 315.95, 305.68, 293.20, 300.51], weeklyChange: -5.34, sortRank: 0, periodReturns: { '1M': 6.9, '6M': 71.5, '1Y': 63.1 },
      priceHistory: { '1W': [317.45, 315.95, 305.68, 293.2, 300.51], '1M': [280.89, 281, 289.44, 285.24, 287.8, 297.76, 295.17, 306.34, 308.17, 302.73, 300.6, 302.31, 304.88, 298.39, 309.21, 324.89, 317.45, 315.95, 305.68, 293.2, 300.51], '6M': [175.26, 179.52, 177.56, 177.08, 173.49, 188.45, 189.12, 193.31, 215.55, 221.44, 226.16, 219.86, 209.82, 193.23, 190.78, 187.19, 190.33, 199.42, 216.71, 233.7, 269.5, 280.89, 297.76, 300.6, 324.89, 300.51], '1Y': [184.21, 199.21, 199.22, 205.81, 210.45, 216.39, 216.64, 214.92, 191.38, 185.4, 192.97, 195.94, 205.98, 195.74, 184.01, 180.3, 184.44, 180.39, 181.6, 175.27, 180.84, 166.91, 159.36, 159.73, 157.32, 161.77, 182.6, 181.67, 174.49, 177.13, 177.52, 190.31, 189.12, 193.31, 215.55, 221.44, 226.16, 219.86, 209.82, 196.2, 194.13, 188.63, 186.42, 199.74, 218.87, 233.7, 269.5, 280.89, 297.76, 300.6, 324.89, 300.51] },
      velocityScore: { '1D': -3.3, '1W': -7.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$273B', pe: 51.3, revenueGrowth: 19, eps: 5.86, grossMargin: 57, dividendYield: 1.94,
      etfPresence: { SOXX: 3.39, PSI: 4.52, XSD: 2.24, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 3.8, proScore: 2.69, coverage: 0.5,
      price: 324.64, weeklyPrices: [318.93, 318.00, 318.18, 317.12, 324.64], weeklyChange: 1.79, sortRank: 0, periodReturns: { '1M': 26.5, '6M': 105.2, '1Y': 293.6 },
      priceHistory: { '1W': [318.93, 318, 318.18, 317.12, 324.64], '1M': [258.57, 275.8, 297.17, 286.52, 294.05, 296.05, 289.24, 295.44, 299.15, 284.72, 277.96, 273.38, 292.09, 302.24, 305.35, 322.68, 318.93, 318, 318.18, 317.12, 324.64], '6M': [158.19, 165.81, 163.26, 175.16, 171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 242.27, 231, 199.33, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 258.57, 296.05, 277.96, 322.68, 324.64], '1Y': [82.48, 88.3, 93.41, 95.63, 96.81, 99.81, 100.37, 97.69, 98.94, 96.68, 105.28, 100.33, 103.63, 97.74, 107.36, 121.9, 128.32, 142.79, 142.54, 144.78, 145.04, 155.62, 155.78, 159.18, 143.24, 151.93, 159.75, 168.26, 154.98, 177.33, 185.06, 218.36, 217.47, 217.94, 233.46, 231.01, 235.53, 242.27, 231, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 263.16, 259.47, 258.57, 296.05, 277.96, 322.68, 324.64] },
      velocityScore: { '1D': 0, '1W': 1.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$406B', pe: 61.3, revenueGrowth: 24, eps: 5.3, grossMargin: 50, dividendYield: 0.33,
      etfPresence: { SOXX: 3.33, PSI: 4.27, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 3.69, proScore: 2.61, coverage: 0.5,
      price: 1960.01, weeklyPrices: [1957.19, 1927.63, 1921.71, 1940.04, 1960.01], weeklyChange: 0.14, sortRank: 0, periodReturns: { '1M': 13.5, '6M': 64.7, '1Y': 157.1 },
      priceHistory: { '1W': [1957.19, 1927.63, 1921.71, 1940.04, 1960.01], '1M': [1713.32, 1732.9, 1816.29, 1763.25, 1869.19, 1845.19, 1811.35, 1849.71, 1892.94, 1804.32, 1756.45, 1740.58, 1829.47, 1842.18, 1888.38, 2011.39, 1957.19, 1927.63, 1921.71, 1940.04, 1960.01], '6M': [1189.86, 1225.61, 1223.37, 1268.75, 1215.08, 1324.6, 1544.96, 1512.78, 1427.94, 1442.95, 1464.13, 1487.66, 1534.95, 1344.55, 1418.64, 1498.67, 1443.21, 1540.06, 1768.78, 1805.32, 1900, 1713.32, 1845.19, 1756.45, 2011.39, 1960.01], '1Y': [762.44, 829.29, 892.38, 889.03, 898.85, 923.18, 933.49, 892.22, 916.09, 883.41, 935.53, 876.08, 888.1, 843.9, 932.63, 989.87, 1068.67, 1128.87, 1062.59, 1087.01, 1147.43, 1206.04, 1193.49, 1190.9, 1123.09, 1145.89, 1211.75, 1238.91, 1172.02, 1276.99, 1274.47, 1400, 1544.96, 1512.78, 1427.94, 1442.95, 1464.13, 1487.66, 1534.95, 1429.1, 1438.24, 1511.43, 1382.58, 1548.85, 1795.91, 1805.32, 1900, 1713.32, 1845.19, 1756.45, 2011.39, 1960.01] },
      velocityScore: { '1D': 1.6, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$256B', pe: 55.5, revenueGrowth: 12, eps: 35.31, grossMargin: 61, dividendYield: 0.47,
      etfPresence: { SOXX: 3.12, PSI: 4.26, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp/DE', easyScore: 1, avgWeight: 5.02, proScore: 2.51, coverage: 0.25,
      price: 1711.66, weeklyPrices: [1589.94, 1641.64, 1694.98, 1761.43, 1711.66], weeklyChange: 7.66, sortRank: 0, periodReturns: { '1M': 44.2, '6M': 733.5, '1Y': 4485.2 },
      priceHistory: { '1W': [1589.94, 1641.64, 1694.98, 1761.43, 1711.66], '1M': [1255.86, 1406.32, 1409.98, 1339.96, 1562.34, 1547.56, 1452.02, 1447.23, 1382.72, 1407.61, 1333.01, 1383.29, 1392.56, 1542.24, 1478.69, 1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1711.66], '6M': [205.35, 219.46, 209.31, 244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1333.01, 1589.55, 1711.66], '1Y': [37.33, 41.82, 44.21, 47.34, 44.96, 46.2, 41.36, 41.36, 42.93, 41.93, 46.83, 44.58, 47.35, 53.01, 73.92, 93.97, 99.83, 121.12, 131.88, 144.3, 149.29, 175.53, 194.57, 271.58, 244.93, 220.5, 194.38, 232.86, 206.83, 250.08, 275.24, 377.41, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 913.02, 1070.2, 1255.86, 1547.56, 1333.01, 1589.55, 1711.66] },
      velocityScore: { '1D': -2, '1W': -4.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$253B', pe: 58.5, revenueGrowth: 251, eps: 29.24, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 5.02 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 3.27, proScore: 2.31, coverage: 0.5,
      price: 227.18, weeklyPrices: [233.40, 243.29, 251.02, 228.99, 227.18], weeklyChange: -2.66, sortRank: 0, periodReturns: { '1M': 28.3, '6M': 33.1, '1Y': 54.9 },
      priceHistory: { '1W': [233.4, 243.29, 251.02, 228.99, 227.18], '1M': [168.38, 186.55, 192.57, 202.55, 219.09, 237.53, 210.31, 213.17, 200.08, 201.49, 203.64, 195.61, 202.51, 213.41, 238.16, 248.82, 233.4, 243.29, 251.02, 228.99, 227.18], '6M': [170.7, 176, 176.12, 174.75, 171.05, 181.87, 161.39, 155.82, 151.59, 137.34, 140.7, 140.41, 141.03, 135.69, 129.82, 129.9, 127.11, 125.73, 131.24, 137.52, 150.26, 168.38, 237.53, 203.64, 248.82, 227.18], '1Y': [146.63, 155.41, 156.87, 155.71, 159.4, 159.35, 154.07, 157.99, 162.08, 146.71, 153.73, 156.25, 159.17, 157.28, 158.95, 165.26, 173.55, 166.49, 167.77, 162.97, 168.83, 181.03, 172.84, 173.98, 165.06, 163.3, 175.07, 182.21, 172.34, 174.77, 172.98, 177.78, 161.39, 155.82, 151.59, 137.34, 140.7, 140.41, 141.03, 138.11, 129.39, 128.35, 127.07, 124.07, 132.84, 137.52, 150.26, 168.38, 237.53, 203.64, 248.82, 227.18] },
      velocityScore: { '1D': -8.3, '1W': -7.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$239B', pe: 24.4, revenueGrowth: -4, eps: 9.3, grossMargin: 55, dividendYield: 1.61,
      etfPresence: { SOXX: 3.95, PSI: false, XSD: 2.58, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 3.05, proScore: 2.16, coverage: 0.5,
      price: 338.95, weeklyPrices: [325.33, 349.17, 342.85, 320.09, 338.95], weeklyChange: 4.19, sortRank: 0, periodReturns: { '1M': 67.2, '6M': 137.1, '1Y': 264.8 },
      priceHistory: { '1W': [325.33, 349.17, 342.85, 320.09, 338.95], '1M': [201.25, 215.69, 213.91, 195.65, 199.79, 207.35, 204.42, 224.09, 228.64, 232.68, 215.58, 244.26, 287.48, 297.84, 306.88, 318.72, 325.33, 349.17, 342.85, 320.09, 338.95], '6M': [142.94, 167.08, 144.94, 168.83, 166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 215.58, 318.72, 338.95], '1Y': [92.92, 92.35, 95.3, 87.26, 88.66, 99.86, 91.94, 116.91, 118.41, 135.54, 192, 171.06, 178.56, 176.61, 230.37, 249.38, 205.27, 194.5, 219.36, 161.46, 157.51, 168.25, 179.31, 167.55, 139.52, 144.78, 152.5, 164.32, 140.24, 169.97, 179.56, 162.61, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 175.8, 196.64, 201.25, 207.35, 215.58, 318.72, 338.95] },
      velocityScore: { '1D': -5.7, '1W': 2.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$58B', pe: 230.6, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.21, PSI: false, XSD: 3.89, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 1, avgWeight: 4.15, proScore: 2.08, coverage: 0.25,
      price: 923.48, weeklyPrices: [870.66, 880.72, 879.80, 921.26, 923.48], weeklyChange: 6.07, sortRank: 0, periodReturns: { '1M': 27, '6M': 246, '1Y': 675.1 },
      priceHistory: { '1W': [870.66, 880.72, 879.8, 921.26, 923.48], '1M': [738.54, 771.01, 786.42, 766.44, 782.64, 834.01, 808.8, 817.35, 804.76, 795.47, 740.84, 733.35, 751.07, 810.46, 812.73, 845.76, 870.66, 880.72, 879.8, 921.26, 923.48], '6M': [266.87, 282.86, 288.13, 282.8, 275.39, 284.47, 320.32, 346.1, 407.69, 429.32, 425.99, 407.4, 379.52, 352.8, 383.71, 411.23, 380.07, 453.3, 513.28, 539.75, 595.86, 738.54, 834.01, 740.84, 845.76, 923.48], '1Y': [119.15, 130.17, 131.04, 136.31, 145.04, 142.01, 147.12, 146.59, 152.68, 151.74, 155.59, 157.93, 165.24, 176.32, 193.04, 213.36, 223.7, 256.84, 224.35, 219.38, 214.57, 223, 250.38, 288, 253.86, 261.89, 258.67, 298.92, 277.65, 285.27, 287.54, 304.01, 320.32, 346.1, 407.69, 429.32, 425.99, 407.4, 379.52, 374.33, 398.78, 404.02, 362.43, 468.72, 533.44, 539.75, 595.86, 738.54, 834.01, 740.84, 845.76, 923.48] },
      velocityScore: { '1D': -1, '1W': -9.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$209B', pe: 88, revenueGrowth: 44, eps: 10.5, grossMargin: 42, dividendYield: 0.32,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 4.15 },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.86, proScore: 2.02, coverage: 0.5,
      price: 320.56, weeklyPrices: [329.24, 330.28, 321.35, 311.38, 320.56], weeklyChange: -2.64, sortRank: 0, periodReturns: { '1M': 8.6, '6M': 48.9, '1Y': 66.3 },
      priceHistory: { '1W': [329.24, 330.28, 321.35, 311.38, 320.56], '1M': [290.76, 292.35, 303.55, 290.22, 294.75, 305.99, 294.23, 298.41, 294.17, 291.5, 291.68, 294.28, 310.15, 299.38, 316.47, 332.67, 329.24, 330.28, 321.35, 311.38, 320.56], '6M': [215.35, 228.05, 229.75, 225.98, 217.06, 237.89, 238.6, 232.48, 226.14, 224.32, 244.43, 231.16, 224.76, 201.74, 190.86, 191.37, 191.66, 197.08, 208, 221.34, 236.87, 290.76, 305.99, 291.68, 332.67, 320.56], '1Y': [192.81, 213.08, 217.53, 218.51, 221.21, 230.42, 220.58, 228, 226.74, 208.47, 220.05, 229.27, 237.82, 228.2, 219.28, 221.89, 227.66, 224.91, 225.64, 217.23, 222.34, 212.96, 204.42, 202.86, 188.59, 191.02, 227.56, 230.78, 223.23, 225.26, 221.28, 241.15, 238.6, 232.48, 226.14, 224.32, 244.43, 231.16, 224.76, 205.25, 191.89, 193.39, 187.39, 195.12, 209.89, 221.34, 236.87, 290.76, 305.99, 291.68, 332.67, 320.56] },
      velocityScore: { '1D': -2.9, '1W': -5.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$81B', pe: 30.6, revenueGrowth: 12, eps: 10.46, grossMargin: 56, dividendYield: 1.3,
      etfPresence: { SOXX: 3.37, PSI: false, XSD: 2.36, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.74, proScore: 1.94, coverage: 0.5,
      price: 1571.68, weeklyPrices: [1620.17, 1633.17, 1566.21, 1542.39, 1571.68], weeklyChange: -2.99, sortRank: 0, periodReturns: { '1M': -0.7, '6M': 65.1, '1Y': 135 },
      priceHistory: { '1W': [1620.17, 1633.17, 1566.21, 1542.39, 1571.68], '1M': [1573.3, 1588.12, 1652.35, 1575.96, 1600.84, 1661.1, 1599.52, 1650.35, 1613.97, 1550.02, 1486.33, 1468.11, 1553.27, 1561.25, 1589.81, 1662.98, 1620.17, 1633.17, 1566.21, 1542.39, 1571.68], '6M': [952.18, 962.95, 951.36, 943.55, 906.36, 959.09, 1009.54, 1063.74, 1124.15, 1229.82, 1171.47, 1190.06, 1142.58, 1023.16, 1052.59, 1068.85, 1053.01, 1180.03, 1372.23, 1490.86, 1587.57, 1573.3, 1661.1, 1486.33, 1662.98, 1571.68], '1Y': [668.66, 706.28, 706.59, 716.58, 746.97, 751.14, 714.03, 719.98, 724.37, 802.78, 840.56, 844.8, 850.64, 827.56, 855.18, 877.66, 908.45, 915.87, 980.9, 1007.93, 1028.67, 1086.36, 957.87, 954.71, 856.96, 908.61, 958.02, 979.02, 912.25, 953.25, 936.31, 958.97, 1009.54, 1063.74, 1124.15, 1229.82, 1171.47, 1190.06, 1142.58, 1062, 1077.4, 1076.35, 1002.34, 1191.22, 1363.42, 1490.86, 1587.57, 1573.3, 1661.1, 1486.33, 1662.98, 1571.68] },
      velocityScore: { '1D': -1, '1W': -6.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$77B', pe: 111.9, revenueGrowth: 26, eps: 14.04, grossMargin: 55, dividendYield: 0.52,
      etfPresence: { SOXX: 3.31, PSI: false, XSD: 2.18, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 2.74, proScore: 1.94, coverage: 0.5,
      price: 126.03, weeklyPrices: [124.89, 123.77, 120.62, 120.92, 126.03], weeklyChange: 0.91, sortRank: 0, periodReturns: { '1M': 22.3, '6M': 144.8, '1Y': 196.3 },
      priceHistory: { '1W': [124.89, 123.77, 120.62, 120.92, 126.03], '1M': [102.04, 102.67, 105.77, 100.61, 103.2, 107.24, 104.11, 115.71, 118.37, 113.11, 109.43, 106.02, 110.21, 109.61, 116.2, 127, 124.89, 123.77, 120.62, 120.92, 126.03], '6M': [51.48, 55.23, 54.56, 55.69, 54.15, 60.89, 60.28, 61.98, 59.89, 65.2, 72.21, 69.47, 66.48, 56.87, 58.55, 59.26, 58.35, 63.49, 71.02, 85.56, 98.04, 102.04, 107.24, 109.43, 127, 126.03], '1Y': [42.54, 52.38, 53.88, 54.21, 53.6, 57.77, 59.52, 62.45, 58.38, 47.24, 50.01, 49.77, 50.99, 47.79, 48.13, 49.8, 50.94, 48.35, 50.88, 50.36, 55.08, 51.8, 48.28, 48.43, 45.56, 48.31, 57.15, 55.1, 53.33, 55.08, 56.7, 62.16, 60.28, 61.98, 59.89, 65.2, 72.21, 69.47, 66.48, 59.23, 59.88, 59.89, 55.66, 63.79, 72.05, 85.56, 98.04, 102.04, 107.24, 109.43, 127, 126.03] },
      velocityScore: { '1D': 1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$49B', pe: 93.4, revenueGrowth: 5, eps: 1.35, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 2.4, PSI: false, XSD: 3.09, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'TSEM', name: 'Tower Semiconductor Ltd', easyScore: 1, avgWeight: 3.6, proScore: 1.8, coverage: 0.25,
      price: 262.63, weeklyPrices: [277.79, 275.50, 255.23, 252.53, 262.63], weeklyChange: -5.46, sortRank: 0, periodReturns: { '1M': 20.5, '6M': 125.5, '1Y': 552.2 },
      priceHistory: { '1W': [277.79, 275.5, 255.23, 252.53, 262.63], '1M': [215.06, 225.53, 216.87, 210, 211.02, 228.88, 220.83, 270.77, 280.69, 273.98, 248.07, 251.28, 264.48, 279.01, 283.43, 288.53, 277.79, 275.5, 255.23, 252.53, 262.63], '6M': [116.46, 124, 114.86, 121.09, 117.42, 117.33, 124, 128.62, 134.73, 139.04, 128.74, 127.43, 138.59, 110.59, 124.71, 163.63, 171.92, 190.19, 209.47, 224.49, 203.33, 215.06, 228.88, 248.07, 288.53, 262.63], '1Y': [40.27, 41.46, 40.39, 42.65, 42.42, 45, 45.64, 48.83, 47.82, 50.13, 46.1, 50.32, 60, 62.26, 67.65, 67.8, 67.82, 74.79, 74.16, 74.17, 74.39, 80.23, 82.45, 99.78, 96.67, 98, 116.01, 126.51, 112.59, 122.47, 121.74, 120.03, 124, 128.62, 134.73, 139.04, 128.74, 127.43, 138.59, 115.46, 138.47, 172.13, 158.58, 190.86, 214.11, 224.49, 203.33, 215.06, 228.88, 248.07, 288.53, 262.63] },
      velocityScore: { '1D': null, '1W': -10.9, '1M': null, '6M': null }, isNew: true,
      marketCap: '$31B', pe: 121, revenueGrowth: 16, eps: 2.17, grossMargin: 25, dividendYield: null,
      etfPresence: { SOXX: false, PSI: 3.6, XSD: false, DRAM: false },
      tonyNote: 'Tower Semiconductor Ltd appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 3.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 1, avgWeight: 3.6, proScore: 1.8, coverage: 0.25,
      price: 546.94, weeklyPrices: [530.60, 531.18, 531.21, 546.20, 546.94], weeklyChange: 3.08, sortRank: 0, periodReturns: { '1M': 26.7, '6M': 241.9, '1Y': 948 },
      priceHistory: { '1W': [530.6, 531.18, 531.21, 546.2, 546.94], '1M': [442.36, 465.26, 483.15, 463.91, 480, 515.83, 488.74, 494.09, 489.15, 482.02, 458.68, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 531.18, 531.21, 546.2, 546.94], '6M': [159.99, 169.54, 174.58, 178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 458.68, 524.65, 546.94], '1Y': [52.19, 57.02, 57.41, 62.07, 63.84, 64.64, 66.53, 67.06, 70.61, 75.84, 75.91, 75.86, 79.71, 86, 95.02, 100.94, 109.69, 130.59, 121.18, 120.44, 121.41, 124.92, 152.18, 169.99, 152.86, 155.41, 155.59, 181.95, 166.26, 179.56, 187.7, 200.46, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 374.11, 400.73, 442.36, 515.83, 458.68, 524.65, 546.94] },
      velocityScore: { '1D': -2.7, '1W': -10, '1M': null, '6M': null }, isNew: false,
      marketCap: '$189B', pe: 32.7, revenueGrowth: 46, eps: 16.71, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 3.6 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'TSLA', name: 'Tesla Inc', easyScore: 3, avgWeight: 9.25, proScore: 4.44, coverage: 0.231,
      price: 414.22, weeklyPrices: [440.36, 442.10, 435.79, 415.88, 414.22], weeklyChange: -5.94, sortRank: 0, periodReturns: { '1M': 6, '6M': -3.5, '1Y': 20.9 },
      priceHistory: { '1W': [440.36, 442.1, 435.79, 415.88, 414.22], '1M': [392.51, 389.37, 398.73, 411.79, 428.35, 445, 433.45, 445.27, 443.3, 422.24, 409.99, 404.11, 417.26, 417.85, 426.01, 433.59, 440.36, 442.1, 435.79, 415.88, 414.22], '6M': [429.24, 445.17, 489.88, 485.56, 449.72, 435.8, 438.57, 449.06, 430.41, 411.11, 417.44, 399.83, 403.32, 396.73, 391.2, 367.96, 361.83, 352.82, 352.42, 392.5, 378.67, 392.51, 445, 409.99, 433.59, 414.22], '1Y': [342.69, 308.58, 329.13, 340.47, 300.71, 295.88, 321.67, 332.11, 321.2, 308.72, 340.84, 329.31, 351.67, 334.09, 347.79, 425.86, 442.79, 459.46, 438.69, 435.15, 442.6, 460.55, 444.26, 439.62, 401.25, 419.4, 446.74, 451.45, 467.26, 485.4, 438.07, 445.01, 438.57, 449.06, 430.41, 411.11, 417.44, 399.83, 403.32, 398.68, 395.56, 380.85, 355.28, 346.65, 364.2, 392.5, 378.67, 392.51, 445, 409.99, 433.59, 414.22] },
      velocityScore: { '1D': -27.7, '1W': -14.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.6T', pe: 383.5, revenueGrowth: 16, eps: 1.08, grossMargin: 19, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: false, GTEK: false, ARKK: 9.86, MARS: false, FRWD: false, BCTK: 3.61, FWD: false, CBSE: false, FCUS: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 7, avgWeight: 5.96, proScore: 4.37, coverage: 0.538,
      price: 225.82, weeklyPrices: [212.60, 214.25, 211.14, 224.36, 225.82], weeklyChange: 6.22, sortRank: 0, periodReturns: { '1M': 13.8, '6M': 24.4, '1Y': 64.4 },
      priceHistory: { '1W': [212.6, 214.25, 211.14, 224.36, 225.82], '1M': [198.48, 196.5, 207.83, 211.5, 215.2, 219.44, 220.78, 225.83, 235.74, 225.32, 222.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 214.25, 211.14, 224.36, 225.82], '6M': [181.46, 184.97, 177.72, 189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 222.32, 214.86, 225.82], '1Y': [137.38, 142.63, 144.69, 147.9, 153.3, 162.88, 171.37, 167.03, 175.51, 178.26, 183.16, 175.64, 181.77, 170.62, 177.33, 170.29, 176.97, 187.24, 189.11, 179.83, 181.16, 201.03, 198.69, 193.16, 181.36, 177.82, 179.59, 183.78, 170.94, 188.61, 188.85, 184.86, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 202.06, 216.61, 198.48, 219.44, 222.32, 214.86, 225.82] },
      velocityScore: { '1D': -1.6, '1W': -9.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.5T', pe: 34.6, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.45,
      etfPresence: { PTF: 4.64, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 4.62, GTEK: false, ARKK: 1.75, MARS: false, FRWD: 7.89, BCTK: 6.5, FWD: 2.02, CBSE: false, FCUS: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MSFT', name: 'Microsoft Corp', easyScore: 4, avgWeight: 7.52, proScore: 4.17, coverage: 0.308,
      price: 450.62, weeklyPrices: [412.67, 426.99, 450.24, 460.52, 450.62], weeklyChange: 9.19, sortRank: 0, periodReturns: { '1M': 8.7, '6M': -8, '1Y': -2.5 },
      priceHistory: { '1W': [412.67, 426.99, 450.24, 460.52, 450.62], '1M': [413.62, 411.38, 413.96, 420.77, 415.12, 412.66, 407.77, 405.21, 409.43, 421.92, 423.54, 417.42, 421.06, 419.09, 418.57, 416.03, 412.67, 426.99, 450.24, 460.52, 450.62], '6M': [490, 492.02, 476.39, 486.85, 483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 384.47, 398.55, 408.96, 395.55, 381.87, 356.77, 372.88, 384.37, 418.07, 424.82, 413.62, 412.66, 423.54, 416.03, 450.62], '1Y': [461.97, 472.75, 479.14, 490.11, 492.05, 503.51, 505.62, 505.27, 512.57, 527.75, 529.24, 509.77, 502.04, 505.35, 500.37, 510.02, 510.15, 519.71, 524.85, 513.43, 517.66, 542.07, 514.33, 508.68, 493.79, 476.99, 477.73, 478.56, 476.12, 488.02, 472.94, 479.28, 456.66, 465.95, 430.29, 401.14, 401.32, 384.47, 398.55, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 418.07, 424.82, 413.62, 412.66, 423.54, 416.03, 450.62] },
      velocityScore: { '1D': -22.5, '1W': -16.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3.3T', pe: 26.8, revenueGrowth: 18, eps: 16.81, grossMargin: 68, dividendYield: 0.79,
      etfPresence: { PTF: false, WCLD: false, MAGS: 14.29, IGV: 7.73, FDTX: 3.79, GTEK: false, ARKK: false, MARS: false, FRWD: 4.28, BCTK: false, FWD: false, CBSE: false, FCUS: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab Corp', easyScore: 1, avgWeight: 13.26, proScore: 3.68, coverage: 0.077,
      price: 123.8, weeklyPrices: [150.23, 148.03, 143.48, 122.39, 123.80], weeklyChange: -17.59, sortRank: 0, periodReturns: { '1M': 57.1, '6M': 195.5, '1Y': 365.4 },
      priceHistory: { '1W': [150.23, 148.03, 143.48, 122.39, 123.8], '1M': [80.31, 78.76, 84.65, 78.58, 105.47, 117.35, 117.56, 124.15, 132.55, 124.77, 131.16, 127.31, 134.28, 125.45, 135.76, 143.2, 150.23, 148.03, 143.48, 122.39, 123.8], '6M': [41.9, 53.43, 55.49, 77.18, 69.76, 83.08, 90.76, 88.9, 80.07, 72.32, 67.44, 70.21, 70.97, 70.11, 68.41, 67.23, 60.93, 67.67, 70.62, 89.46, 82.29, 80.31, 117.35, 131.16, 143.2, 123.8], '1Y': [26.6, 29.64, 26.55, 33.46, 34.33, 39.14, 47.69, 46.88, 43.79, 44.75, 43.43, 40.92, 48.13, 43.53, 46.17, 48.08, 48.69, 47.97, 65.31, 69.27, 65.4, 63.75, 56.57, 51.24, 42.78, 42.6, 44.72, 57.52, 53.96, 77.18, 75.99, 84.85, 90.76, 88.9, 80.07, 72.32, 67.44, 70.21, 70.97, 71.48, 71.31, 68, 57.38, 66.32, 72.22, 89.46, 82.29, 80.31, 117.35, 131.16, 143.2, 123.8] },
      velocityScore: { '1D': -26.5, '1W': -17.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$72B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 13.26, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false },
      tonyNote: 'Rocket Lab is the small-launch and space systems name that Electrification and AI infrastructure ETFs hold for satellite connectivity exposure — relevant to both GPS-dependent grids and low-orbit broadband that supports remote AI compute. Small market cap, no earnings, but consistent revenue growth and a rapidly expanding backlog.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 7, avgWeight: 4.96, proScore: 3.64, coverage: 0.538,
      price: 1024.76, weeklyPrices: [928.41, 923.52, 971.00, 1035.50, 1024.76], weeklyChange: 10.38, sortRank: 0, periodReturns: { '1M': 89, '6M': 327.9, '1Y': 943.8 },
      priceHistory: { '1W': [928.41, 923.52, 971, 1035.5, 1024.76], '1M': [576.45, 640.2, 666.59, 646.63, 746.81, 795.33, 766.58, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1024.76], '6M': [239.49, 252.42, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 895.88, 1024.76], '1Y': [98.18, 110.95, 119.84, 127.91, 120.89, 122.24, 116.43, 109.22, 111.96, 109.06, 127.75, 122.05, 116.5, 118.72, 140, 159.99, 161.71, 182.15, 196.54, 191.94, 202.29, 221.91, 218.03, 241.11, 228.5, 224.53, 234.16, 263.71, 225.52, 286.68, 315.42, 345.09, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 448.42, 524.56, 576.45, 795.33, 681.54, 895.88, 1024.76] },
      velocityScore: { '1D': 36.3, '1W': 46.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 48.3, revenueGrowth: 196, eps: 21.23, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { PTF: 5.03, WCLD: false, MAGS: false, IGV: false, FDTX: 9.36, GTEK: false, ARKK: false, MARS: false, FRWD: 4.61, BCTK: 5.03, FWD: 1.31, CBSE: 3, FCUS: 6.38 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 6, avgWeight: 5.16, proScore: 3.5, coverage: 0.462,
      price: 255, weeklyPrices: [271.85, 274.00, 270.64, 261.26, 255.00], weeklyChange: -6.2, sortRank: 0, periodReturns: { '1M': -4.9, '6M': 8.8, '1Y': 23.4 },
      priceHistory: { '1W': [271.85, 274, 270.64, 261.26, 255], '1M': [272.05, 273.55, 274.99, 271.17, 272.68, 268.99, 265.82, 270.13, 267.22, 264.14, 264.86, 259.34, 265.01, 268.46, 266.32, 265.29, 271.85, 274, 270.64, 261.26, 255], '6M': [234.42, 227.92, 222.56, 232.14, 230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 198.79, 205.27, 208.39, 213.21, 207.67, 205.37, 199.34, 212.79, 239.89, 248.28, 261.12, 272.05, 268.99, 264.86, 265.29, 255], '1Y': [206.65, 216.98, 216.1, 212.77, 220.46, 222.54, 223.19, 227.47, 231.01, 213.75, 221.47, 228.01, 228.71, 225.99, 230.33, 231.62, 220.21, 220.63, 225.22, 215.57, 222.03, 229.25, 249.32, 249.1, 222.55, 229.67, 232.38, 231.78, 221.27, 232.38, 226.5, 247.38, 238.18, 239.16, 239.3, 210.32, 198.79, 205.27, 208.39, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 248.28, 261.12, 272.05, 268.99, 264.86, 265.29, 255] },
      velocityScore: { '1D': -20.5, '1W': -15.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.7T', pe: 30.9, revenueGrowth: 17, eps: 8.26, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 4.01, GTEK: false, ARKK: 2.54, MARS: false, FRWD: 3.72, BCTK: 4.89, FWD: 1.5, CBSE: false, FCUS: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'AAPL', name: 'Apple Inc', easyScore: 3, avgWeight: 6.62, proScore: 3.18, coverage: 0.231,
      price: 309.55, weeklyPrices: [310.85, 312.51, 312.06, 306.31, 309.55], weeklyChange: -0.42, sortRank: 0, periodReturns: { '1M': 10.5, '6M': 8.2, '1Y': 53.5 },
      priceHistory: { '1W': [310.85, 312.51, 312.06, 306.31, 309.55], '1M': [276.83, 284.18, 287.51, 287.44, 293.32, 292.68, 294.8, 298.87, 298.21, 300.23, 297.84, 298.97, 302.25, 304.99, 308.82, 308.33, 310.85, 312.51, 312.06, 306.31, 309.55], '6M': [286.19, 277.18, 274.61, 272.36, 271.86, 259.04, 258.21, 248.04, 259.48, 278.12, 255.78, 266.18, 264.72, 257.46, 250.12, 247.99, 248.8, 258.86, 259.2, 273.05, 267.61, 276.83, 292.68, 297.84, 308.33, 309.55], '1Y': [201.7, 201.45, 198.42, 200.3, 207.82, 211.14, 210.16, 214.4, 211.27, 202.92, 229.65, 230.56, 229.31, 238.47, 226.79, 238.99, 252.31, 255.45, 258.06, 249.34, 262.77, 269, 270.04, 275.25, 267.44, 276.97, 284.15, 278.78, 271.84, 273.81, 271.01, 259.37, 258.21, 248.04, 259.48, 278.12, 255.78, 266.18, 264.72, 259.88, 252.82, 251.49, 246.63, 253.5, 258.83, 273.05, 267.61, 276.83, 292.68, 297.84, 308.33, 309.55] },
      velocityScore: { '1D': -22.2, '1W': -26.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.5T', pe: 37.4, revenueGrowth: 17, eps: 8.27, grossMargin: 48, dividendYield: 0.35,
      etfPresence: { PTF: 4.37, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 1.19, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false },
      tonyNote: 'Apple is a selective AI holding — only 2 of 8 ETFs hold it at 3.81% average weight. Revenue up 17%, 48% gross margin, P/E of 38x — reasonable for the installed base franchise. The ETF managers treating it as an AI name are betting on on-device AI monetization through the App Store; the majority are not yet convinced, which explains the 25% coverage.',
    },
    {
      ticker: 'GOOGL', name: 'Alphabet Inc-Cl A', easyScore: 3, avgWeight: 6.23, proScore: 2.99, coverage: 0.231,
      price: 361.43, weeklyPrices: [388.83, 390.13, 380.34, 376.37, 361.43], weeklyChange: -7.05, sortRank: 0, periodReturns: { '1M': -6.3, '6M': 14.4, '1Y': 113.8 },
      priceHistory: { '1W': [388.83, 390.13, 380.34, 376.37, 361.43], '1M': [383.25, 388.43, 398.04, 397.99, 400.8, 388.64, 387.35, 402.62, 401.07, 396.78, 396.94, 387.66, 388.91, 387.66, 382.97, 388.88, 388.83, 390.13, 380.34, 376.37, 361.43], '6M': [315.81, 317.08, 306.57, 314.35, 313, 325.44, 332.78, 327.93, 338, 322.86, 305.72, 311.49, 306.52, 298.52, 302.28, 301, 274.34, 299.99, 321.31, 337.42, 350.34, 383.25, 388.64, 396.94, 388.88, 361.43], '1Y': [169.03, 176.09, 176.77, 166.77, 175.84, 176.62, 182.97, 191.34, 195.75, 194.67, 203.34, 201.57, 207.14, 230.66, 239.17, 249.53, 247.14, 244.9, 244.62, 251.03, 250.46, 267.47, 277.54, 291.31, 284.28, 323.44, 319.63, 320.21, 296.72, 314.09, 315.15, 328.57, 332.78, 327.93, 338, 322.86, 305.72, 311.49, 306.52, 306.36, 305.56, 302.06, 273.5, 305.46, 332.91, 337.42, 350.34, 383.25, 388.64, 396.94, 388.88, 361.43] },
      velocityScore: { '1D': -40.8, '1W': -27.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.4T', pe: 27.6, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 3.11, BCTK: false, FWD: 1.29, CBSE: false, FCUS: false },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 5, avgWeight: 4.73, proScore: 2.93, coverage: 0.385,
      price: 923.48, weeklyPrices: [870.66, 880.72, 879.80, 921.26, 923.48], weeklyChange: 6.07, sortRank: 0, periodReturns: { '1M': 27, '6M': 246, '1Y': 675.1 },
      priceHistory: { '1W': [870.66, 880.72, 879.8, 921.26, 923.48], '1M': [738.54, 771.01, 786.42, 766.44, 782.64, 834.01, 808.8, 817.35, 804.76, 795.47, 740.84, 733.35, 751.07, 810.46, 812.73, 845.76, 870.66, 880.72, 879.8, 921.26, 923.48], '6M': [266.87, 282.86, 288.13, 282.8, 275.39, 284.47, 320.32, 346.1, 407.69, 429.32, 425.99, 407.4, 379.52, 352.8, 383.71, 411.23, 380.07, 453.3, 513.28, 539.75, 595.86, 738.54, 834.01, 740.84, 845.76, 923.48], '1Y': [119.15, 130.17, 131.04, 136.31, 145.04, 142.01, 147.12, 146.59, 152.68, 151.74, 155.59, 157.93, 165.24, 176.32, 193.04, 213.36, 223.7, 256.84, 224.35, 219.38, 214.57, 223, 250.38, 288, 253.86, 261.89, 258.67, 298.92, 277.65, 285.27, 287.54, 304.01, 320.32, 346.1, 407.69, 429.32, 425.99, 407.4, 379.52, 374.33, 398.78, 404.02, 362.43, 468.72, 533.44, 539.75, 595.86, 738.54, 834.01, 740.84, 845.76, 923.48] },
      velocityScore: { '1D': null, '1W': 27.9, '1M': null, '6M': null }, isNew: true,
      marketCap: '$209B', pe: 88, revenueGrowth: 44, eps: 10.5, grossMargin: 42, dividendYield: 0.32,
      etfPresence: { PTF: 4.82, WCLD: false, MAGS: false, IGV: false, FDTX: 4.04, GTEK: false, ARKK: false, MARS: false, FRWD: 8.95, BCTK: false, FWD: 1.07, CBSE: false, FCUS: 4.78 },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 5, avgWeight: 4.69, proScore: 2.91, coverage: 0.385,
      price: 438.01, weeklyPrices: [422.73, 424.86, 418.45, 435.63, 438.01], weeklyChange: 3.61, sortRank: 0, periodReturns: { '1M': 10.1, '6M': 50, '1Y': 124.8 },
      priceHistory: { '1W': [422.73, 424.86, 418.45, 435.63, 438.01], '1M': [401.61, 394.41, 419.5, 414.15, 411.68, 404.54, 397.28, 399.8, 417.72, 404.35, 395.95, 392.61, 401.62, 407.15, 404.52, 412.32, 422.73, 424.86, 418.45, 435.63, 438.01], '6M': [292.09, 303.41, 286.87, 296.95, 303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 370.04, 369.11, 338.89, 338.31, 329.24, 326.74, 341.76, 369.57, 366.24, 404.98, 401.61, 404.54, 395.95, 412.32, 438.01], '1Y': [194.84, 207, 215.68, 220.09, 224.68, 231.84, 237.56, 234.6, 241.33, 232.47, 244.29, 232.7, 238.72, 231.39, 260.44, 262.79, 280.71, 288.47, 304.52, 304.71, 294.51, 301.53, 294.05, 291.17, 277.91, 284.68, 295.45, 310.14, 276.96, 298.8, 319.61, 323.63, 341.64, 334.87, 330.56, 348.85, 366.36, 370.04, 369.11, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 366.24, 404.98, 401.61, 404.54, 395.95, 412.32, 438.01] },
      velocityScore: { '1D': 52.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 37.4, revenueGrowth: 35, eps: 11.72, grossMargin: 62, dividendYield: 0.87,
      etfPresence: { PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: 6, GTEK: false, ARKK: 0.95, MARS: false, FRWD: 5.66, BCTK: 8.29, FWD: false, CBSE: 2.55, FCUS: false },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 1, avgWeight: 10.35, proScore: 2.87, coverage: 0.077,
      price: 244.03, weeklyPrices: [190.96, 203.70, 225.78, 248.15, 244.03], weeklyChange: 27.79, sortRank: 0, periodReturns: { '1M': 42, '6M': 21.4, '1Y': 46.5 },
      priceHistory: { '1W': [190.96, 203.7, 225.78, 248.15, 244.03], '1M': [180.29, 185.35, 194.03, 194.59, 195.95, 193.84, 186.83, 189.76, 195.61, 192.95, 186.61, 181.46, 188.16, 189.77, 192.08, 193.06, 190.96, 203.7, 225.78, 248.15, 244.03], '6M': [201.1, 221.53, 188.65, 195.34, 194.91, 189.65, 189.85, 177.16, 164.58, 142.82, 160.14, 141.31, 149.25, 152.96, 155.11, 149.68, 139.66, 145.54, 155.62, 177.58, 172.96, 180.29, 193.84, 186.61, 193.06, 244.03], '1Y': [166.57, 177.15, 211.1, 215.27, 218.96, 235.81, 241.3, 238.11, 249.98, 255.67, 253.86, 234.62, 234.21, 223.45, 328.33, 301.41, 308.46, 289.01, 288.63, 303.62, 275.15, 280.83, 248.17, 236.15, 220.49, 197.03, 207.73, 223.01, 178.46, 197.49, 195.71, 198.52, 189.85, 177.16, 164.58, 142.82, 160.14, 141.31, 149.25, 151.56, 155.97, 154.34, 138.8, 143.17, 163, 177.58, 172.96, 180.29, 193.84, 186.61, 193.06, 244.03] },
      velocityScore: { '1D': 7.5, '1W': 29.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$702B', pe: 43.9, revenueGrowth: 22, eps: 5.56, grossMargin: 67, dividendYield: 0.81,
      etfPresence: { PTF: false, WCLD: false, MAGS: false, IGV: 10.35, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false },
      tonyNote: 'Oracle lands in 3 AI ETFs on the strength of its cloud database and AI infrastructure contracts. Revenue grew 22%, 67% gross margin, P/E of 40x. The 17.5% weekly return following a major earnings beat shows how quickly sentiment can reprice; the weight score at 2.04% is still modest, meaning ETF managers have started building positions but conviction is not yet deep.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 4, avgWeight: 4.88, proScore: 2.71, coverage: 0.308,
      price: 509.8, weeklyPrices: [495.54, 518.09, 516.10, 510.13, 509.80], weeklyChange: 2.88, sortRank: 0, periodReturns: { '1M': 41.4, '6M': 136.9, '1Y': 344.7 },
      priceHistory: { '1W': [495.54, 518.09, 516.1, 510.13, 509.8], '1M': [341.54, 355.26, 421.39, 408.46, 455.19, 458.79, 448.29, 445.5, 449.7, 424.1, 420.99, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 518.09, 516.1, 510.13, 509.8], '6M': [215.24, 221.62, 209.17, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 420.99, 503.89, 509.8], '1Y': [114.63, 121.73, 126.39, 138.43, 136.11, 138.41, 160.08, 154.72, 177.44, 174.31, 174.95, 166.55, 166.62, 162.13, 159.54, 159.16, 160.88, 164.01, 235.56, 238.6, 238.03, 258.01, 250.05, 237.52, 230.29, 206.13, 217.6, 221.42, 198.11, 215.04, 223.47, 203.17, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 274.95, 334.63, 341.54, 458.79, 420.99, 503.89, 509.8] },
      velocityScore: { '1D': 39, '1W': -5.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$831B', pe: 169.4, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: 5.03, MARS: false, FRWD: 7.92, BCTK: 3.86, FWD: 2.72, CBSE: false, FCUS: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 4, avgWeight: 4.66, proScore: 2.58, coverage: 0.308,
      price: 546.94, weeklyPrices: [530.60, 531.18, 531.21, 546.20, 546.94], weeklyChange: 3.08, sortRank: 0, periodReturns: { '1M': 26.7, '6M': 241.9, '1Y': 948 },
      priceHistory: { '1W': [530.6, 531.18, 531.21, 546.2, 546.94], '1M': [442.36, 465.26, 483.15, 463.91, 480, 515.83, 488.74, 494.09, 489.15, 482.02, 458.68, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 531.18, 531.21, 546.2, 546.94], '6M': [159.99, 169.54, 174.58, 178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 458.68, 524.65, 546.94], '1Y': [52.19, 57.02, 57.41, 62.07, 63.84, 64.64, 66.53, 67.06, 70.61, 75.84, 75.91, 75.86, 79.71, 86, 95.02, 100.94, 109.69, 130.59, 121.18, 120.44, 121.41, 124.92, 152.18, 169.99, 152.86, 155.41, 155.59, 181.95, 166.26, 179.56, 187.7, 200.46, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 374.11, 400.73, 442.36, 515.83, 458.68, 524.65, 546.94] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$189B', pe: 32.7, revenueGrowth: 46, eps: 16.71, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { PTF: 4.69, WCLD: false, MAGS: false, IGV: false, FDTX: 4, GTEK: false, ARKK: false, MARS: false, FRWD: 5.14, BCTK: false, FWD: false, CBSE: false, FCUS: 4.79 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp/DE', easyScore: 2, avgWeight: 6.55, proScore: 2.57, coverage: 0.154,
      price: 1711.66, weeklyPrices: [1589.94, 1641.64, 1694.98, 1761.43, 1711.66], weeklyChange: 7.66, sortRank: 0, periodReturns: { '1M': 44.2, '6M': 733.5, '1Y': 4485.2 },
      priceHistory: { '1W': [1589.94, 1641.64, 1694.98, 1761.43, 1711.66], '1M': [1255.86, 1406.32, 1409.98, 1339.96, 1562.34, 1547.56, 1452.02, 1447.23, 1382.72, 1407.61, 1333.01, 1383.29, 1392.56, 1542.24, 1478.69, 1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1711.66], '6M': [205.35, 219.46, 209.31, 244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1333.01, 1589.55, 1711.66], '1Y': [37.33, 41.82, 44.21, 47.34, 44.96, 46.2, 41.36, 41.36, 42.93, 41.93, 46.83, 44.58, 47.35, 53.01, 73.92, 93.97, 99.83, 121.12, 131.88, 144.3, 149.29, 175.53, 194.57, 271.58, 244.93, 220.5, 194.38, 232.86, 206.83, 250.08, 275.24, 377.41, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 913.02, 1070.2, 1255.86, 1547.56, 1333.01, 1589.55, 1711.66] },
      velocityScore: { '1D': -4.5, '1W': 17.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$253B', pe: 58.5, revenueGrowth: 251, eps: 29.24, grossMargin: 56, dividendYield: null,
      etfPresence: { PTF: 7.81, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: 5.3 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 5, avgWeight: 4.07, proScore: 2.52, coverage: 0.385,
      price: 601.12, weeklyPrices: [635.26, 635.29, 632.51, 600.47, 601.12], weeklyChange: -5.37, sortRank: 0, periodReturns: { '1M': -1.3, '6M': -7.1, '1Y': -10.4 },
      priceHistory: { '1W': [635.26, 635.29, 632.51, 600.47, 601.12], '1M': [610.41, 604.96, 612.88, 616.81, 609.63, 598.86, 603, 616.63, 618.43, 614.23, 611.21, 602.61, 605.06, 607.38, 610.26, 612.34, 635.26, 635.29, 632.51, 600.47, 601.12], '6M': [647.1, 656.96, 657.15, 664.94, 660.09, 646.06, 620.8, 658.76, 716.5, 661.46, 639.77, 637.25, 653.56, 644.86, 613.71, 593.66, 525.72, 573.02, 634.53, 670.91, 678.62, 610.41, 598.86, 611.21, 612.34, 601.12], '1Y': [670.9, 694.06, 702.12, 712.2, 719.22, 732.78, 702.91, 704.81, 700, 763.46, 790, 751.48, 754.1, 737.05, 751.98, 775.72, 760.66, 717.34, 717.84, 717.55, 733.27, 751.44, 627.32, 627.08, 597.69, 636.22, 639.6, 650.13, 649.5, 667.55, 650.41, 653.06, 620.8, 658.76, 716.5, 661.46, 639.77, 637.25, 653.56, 647.39, 627.45, 604.06, 536.38, 575.05, 662.49, 670.91, 678.62, 610.41, 598.86, 611.21, 612.34, 601.12] },
      velocityScore: { '1D': -32.1, '1W': -24.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 21.9, revenueGrowth: 33, eps: 27.5, grossMargin: 82, dividendYield: 0.35,
      etfPresence: { PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 2.84, GTEK: false, ARKK: 0.55, MARS: false, FRWD: false, BCTK: 1.6, FWD: 1.05, CBSE: false, FCUS: false },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile Inc', easyScore: 1, avgWeight: 9, proScore: 2.5, coverage: 0.077,
      price: 112.2, weeklyPrices: [129.60, 133.09, 113.41, 105.65, 112.20], weeklyChange: -13.43, sortRank: 0, periodReturns: { '1M': 58.3, '6M': 97.2, '1Y': 364.6 },
      priceHistory: { '1W': [129.6, 133.09, 113.41, 105.65, 112.2], '1M': [68.43, 63.87, 70.68, 65.35, 75.05, 82.55, 72.96, 74.81, 83.01, 83.67, 86.83, 88.1, 89.58, 96.23, 105.86, 119.7, 129.6, 133.09, 113.41, 105.65, 112.2], '6M': [56.89, 72.84, 68.37, 85.67, 72.63, 90.56, 101.25, 113.57, 111.21, 101.79, 82.51, 83.9, 86.92, 89.47, 86.34, 89.93, 78.67, 94.81, 98.97, 81, 77.2, 68.43, 82.55, 86.83, 119.7, 112.2], '1Y': [24.15, 34.82, 41.91, 53.22, 45.11, 42.5, 52.63, 57.09, 53.09, 52.57, 49.76, 44.95, 50.43, 45.22, 37.58, 41.19, 54.5, 56.94, 81.2, 95.69, 78.61, 77.77, 70.05, 67.89, 58.22, 55.51, 61.44, 79.05, 61.86, 78.05, 83.47, 97.67, 101.25, 113.57, 111.21, 101.79, 82.51, 83.9, 86.92, 89.76, 89.11, 88.42, 73.82, 92.57, 88.57, 81, 77.2, 68.43, 82.55, 86.83, 119.7, 112.2] },
      velocityScore: { '1D': -19.6, '1W': -8.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$44B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 9, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'LRCX', name: 'LRCX', easyScore: 4, avgWeight: 4.1, proScore: 2.27, coverage: 0.308,
      price: 324.64, weeklyPrices: [318.93, 318.00, 318.18, 317.12, 324.64], weeklyChange: 1.79, sortRank: 0, periodReturns: { '1M': 26.5, '6M': 105.2, '1Y': 293.6 },
      priceHistory: { '1W': [318.93, 318, 318.18, 317.12, 324.64], '1M': [258.57, 275.8, 297.17, 286.52, 294.05, 296.05, 289.24, 295.44, 299.15, 284.72, 277.96, 273.38, 292.09, 302.24, 305.35, 322.68, 318.93, 318, 318.18, 317.12, 324.64], '6M': [158.19, 165.81, 163.26, 175.16, 171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 242.27, 231, 199.33, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 258.57, 296.05, 277.96, 322.68, 324.64], '1Y': [82.48, 88.3, 93.41, 95.63, 96.81, 99.81, 100.37, 97.69, 98.94, 96.68, 105.28, 100.33, 103.63, 97.74, 107.36, 121.9, 128.32, 142.79, 142.54, 144.78, 145.04, 155.62, 155.78, 159.18, 143.24, 151.93, 159.75, 168.26, 154.98, 177.33, 185.06, 218.36, 217.47, 217.94, 233.46, 231.01, 235.53, 242.27, 231, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 263.16, 259.47, 258.57, 296.05, 277.96, 322.68, 324.64] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$406B', pe: 61.3, revenueGrowth: 24, eps: 5.3, grossMargin: 50, dividendYield: 0.33,
      etfPresence: { PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.62, BCTK: 6.56, FWD: 1.68, CBSE: 2.54, FCUS: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'MRVL', name: 'Marvell Technology Inc', easyScore: 3, avgWeight: 4.69, proScore: 2.25, coverage: 0.231,
      price: 263.4, weeklyPrices: [198.70, 204.83, 205.00, 219.43, 263.40], weeklyChange: 32.56, sortRank: 0, periodReturns: { '1M': 59.7, '6M': 183.6, '1Y': 328.5 },
      priceHistory: { '1W': [198.7, 204.83, 205, 219.43, 263.4], '1M': [163.66, 168.75, 172.15, 160.01, 170.13, 170.84, 164.5, 177.95, 182.58, 176.89, 168.93, 176.27, 186.8, 190.69, 196.33, 208.26, 198.7, 204.83, 205, 219.43, 263.4], '6M': [92.89, 88.9, 84.07, 87.68, 84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 77.79, 80.86, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 163.66, 170.84, 168.93, 208.26, 263.4], '1Y': [61.47, 69.14, 70.42, 75.21, 76.24, 72.26, 70.85, 71.99, 76.34, 76.63, 77.81, 72.07, 74.26, 62.31, 67.1, 70.98, 80.09, 83.89, 92.5, 88.89, 84.26, 88.46, 87.59, 89.33, 78.68, 83.43, 100.2, 92.47, 81.7, 86.49, 89.39, 83.22, 80.38, 80.23, 78.92, 80.28, 78.61, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 147.84, 158.21, 163.66, 170.84, 168.93, 208.26, 263.4] },
      velocityScore: { '1D': -17.9, '1W': -26.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$230B', pe: 90.2, revenueGrowth: 28, eps: 2.92, grossMargin: 52, dividendYield: 0.11,
      etfPresence: { PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: 8.06, GTEK: 3.28, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: 2.73, FCUS: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 5, avgWeight: 3.54, proScore: 2.2, coverage: 0.385,
      price: 485.3, weeklyPrices: [421.86, 426.58, 446.77, 459.97, 485.30], weeklyChange: 15.04, sortRank: 0, periodReturns: { '1M': 15.2, '6M': 27.2, '1Y': 95.1 },
      priceHistory: { '1W': [421.86, 426.58, 446.77, 459.97, 485.3], '1M': [416.5, 427.36, 425.44, 412.56, 430, 428.43, 419.3, 416.79, 439.79, 425.19, 420.71, 411.07, 417.76, 414.57, 414.14, 422.01, 421.86, 426.58, 446.77, 459.97, 485.3], '6M': [381.57, 406.29, 341.3, 349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 420.71, 422.01, 485.3], '1Y': [248.71, 244.28, 252.1, 263.77, 264.74, 277.9, 280.81, 278.59, 297.42, 292.93, 312.83, 294.91, 298.01, 302.39, 369.57, 346.17, 339.31, 333.39, 345.5, 351.33, 342.66, 372.97, 351.94, 351.96, 340.5, 385.03, 380.61, 412.97, 326.02, 350.22, 347.62, 344.97, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 399.63, 418.2, 416.5, 428.43, 420.71, 422.01, 485.3] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$2.3T', pe: 94.2, revenueGrowth: 30, eps: 5.15, grossMargin: 77, dividendYield: 0.57,
      etfPresence: { PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: 0.79, GTEK: false, ARKK: 1.19, MARS: false, FRWD: 4.58, BCTK: 8.22, FWD: 2.92, CBSE: false, FCUS: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'PANW', name: 'PANW', easyScore: 3, avgWeight: 4.57, proScore: 2.2, coverage: 0.231,
      price: 296.47, weeklyPrices: [248.47, 257.77, 281.69, 300.48, 296.47], weeklyChange: 19.32, sortRank: 0, periodReturns: { '1M': 63.7, '6M': 56.1, '1Y': 52.1 },
      priceHistory: { '1W': [248.47, 257.77, 281.69, 300.48, 296.47], '1M': [184.56, 183.98, 183.68, 196.53, 207.88, 213.66, 215.6, 227.79, 238.21, 242.83, 247.55, 240.13, 246.66, 252.92, 260.58, 256.75, 248.47, 257.77, 281.69, 300.48, 296.47], '6M': [189.88, 195, 187.09, 188.12, 184.2, 190.8, 187.73, 180.18, 176.97, 159.32, 166.95, 144.14, 150.15, 165.05, 167.02, 162.95, 147.02, 161.95, 162.51, 169.56, 182.9, 184.56, 213.66, 247.55, 256.75, 296.47], '1Y': [194.86, 196.33, 198.11, 201.69, 197.58, 206.06, 192.59, 196.73, 193.84, 169.09, 175.4, 181.56, 184.23, 191.53, 197.33, 203.12, 200.7, 206.8, 217.79, 206.7, 214.4, 221.38, 214.52, 218.27, 201, 186.27, 193.63, 192.96, 183.44, 187.22, 179.37, 189.02, 187.73, 180.18, 176.97, 159.32, 166.95, 144.14, 150.15, 165.1, 167.45, 164.05, 154.35, 169.87, 161.59, 169.56, 182.9, 184.56, 213.66, 247.55, 256.75, 296.47] },
      velocityScore: { '1D': -15.4, '1W': -6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$240B', pe: 164.7, revenueGrowth: 15, eps: 1.8, grossMargin: 74, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.41, MAGS: false, IGV: 7.64, FDTX: 3.67, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 2, avgWeight: 7.14, proScore: 5.05, coverage: 0.5,
      price: 293.65, weeklyPrices: [295.94, 288.90, 284.42, 288.12, 293.65], weeklyChange: -0.77, sortRank: 0, periodReturns: { '1M': 6.7, '6M': 173.2, '1Y': 410.2 },
      priceHistory: { '1W': [295.94, 288.9, 284.42, 288.12, 293.65], '1M': [269.95, 294.69, 320.3, 305.93, 309.39, 322.05, 308.05, 300.84, 296.98, 292.65, 266.8, 261.58, 271.05, 270.75, 279.22, 291.97, 295.94, 288.9, 284.42, 288.12, 293.65], '6M': [107.5, 115.02, 110.88, 112.88, 106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 181.38, 177.5, 161.22, 167.57, 172, 179.35, 186.72, 228.99, 241.65, 260.52, 269.95, 322.05, 266.8, 291.97, 293.65], '1Y': [57.55, 63.41, 65.05, 62.82, 70.01, 70.64, 72.53, 73.67, 77.77, 78.75, 90.06, 84.7, 91.08, 85.72, 92.33, 97.11, 97.88, 105.74, 105.13, 109.92, 116.11, 128.09, 126.71, 121.07, 107.22, 104.18, 107.83, 119.95, 105.77, 112.06, 117.51, 121.83, 135.18, 139.32, 147.86, 194.74, 195.02, 181.38, 177.5, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 241.65, 260.52, 269.95, 322.05, 266.8, 291.97, 293.65] },
      velocityScore: { '1D': 2, '1W': 0.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 57.2, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { POW: 6.32, VOLT: 7.97, PBD: false, PBW: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, avgWeight: 5.23, proScore: 3.7, coverage: 0.5,
      price: 272.1, weeklyPrices: [280.13, 276.96, 274.52, 269.86, 272.10], weeklyChange: -2.87, sortRank: 0, periodReturns: { '1M': -4.1, '6M': 68.4, '1Y': 280.8 },
      priceHistory: { '1W': [280.13, 276.96, 274.52, 269.86, 272.1], '1M': [286.69, 297.17, 286.89, 290.46, 297.98, 302.73, 298.22, 266.92, 268.73, 256.72, 258.28, 249.71, 254.75, 260.4, 270.01, 276.25, 280.13, 276.96, 274.52, 269.86, 272.1], '6M': [161.55, 167.43, 171.76, 177.23, 169.63, 180.24, 196.61, 196.5, 201.19, 220.78, 232.84, 231.83, 222.45, 191.87, 197.65, 204.09, 203.53, 206.9, 237.93, 254.38, 250.96, 286.69, 302.73, 258.28, 276.25, 272.1], '1Y': [71.45, 77.71, 88.72, 92.48, 95.52, 102.24, 98.77, 106, 130.49, 131.71, 134.66, 127.8, 139.31, 138.07, 145.68, 144.6, 142.27, 142.5, 146.89, 150.77, 148, 154.78, 154.25, 152.12, 144.07, 150.84, 159.74, 172.82, 164.18, 176.17, 172.78, 187.43, 196.61, 196.5, 201.19, 220.78, 232.84, 231.83, 222.45, 191.81, 205.11, 214.98, 197.83, 210.32, 237.34, 254.38, 250.96, 286.69, 302.73, 258.28, 276.25, 272.1] },
      velocityScore: { '1D': -0.8, '1W': 1.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 65.4, revenueGrowth: 17, eps: 4.16, grossMargin: 39, dividendYield: 0.1,
      etfPresence: { POW: 3.09, VOLT: 7.38, PBD: false, PBW: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 2, avgWeight: 5, proScore: 3.54, coverage: 0.5,
      price: 703.24, weeklyPrices: [733.62, 730.10, 711.73, 687.48, 703.24], weeklyChange: -4.14, sortRank: 0, periodReturns: { '1M': -5.3, '6M': 54.7, '1Y': 103.5 },
      priceHistory: { '1W': [733.62, 730.1, 711.73, 687.48, 703.24], '1M': [757.34, 771.61, 785.24, 750.73, 745, 781.38, 765.81, 773.72, 780.08, 769.99, 723.03, 714.13, 709.93, 716.91, 723.44, 742.18, 733.62, 730.1, 711.73, 687.48, 703.24], '6M': [454.72, 457.96, 438.49, 435.2, 422.06, 413.17, 447.64, 468.76, 474.63, 508.11, 524.08, 549.11, 572.66, 540.19, 559.02, 555.39, 549.98, 554.38, 595.84, 604.97, 637.28, 757.34, 781.38, 723.03, 742.18, 703.24], '1Y': [345.53, 355.66, 361.8, 372.26, 372.29, 382.12, 389.12, 394.93, 410.99, 389.12, 391.57, 379.27, 383.92, 374.41, 390.17, 376.01, 402.87, 420.65, 443.45, 436.93, 437.43, 439.57, 438.66, 448.91, 439.29, 450.14, 456.02, 462.21, 414.25, 433.58, 439.68, 422.57, 447.64, 468.76, 474.63, 508.11, 524.08, 549.11, 572.66, 568.04, 574.02, 567.45, 533.78, 555.57, 594.4, 604.97, 637.28, 757.34, 781.38, 723.03, 742.18, 703.24] },
      velocityScore: { '1D': -2.5, '1W': -3.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$106B', pe: 96.5, revenueGrowth: 26, eps: 7.29, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.53, VOLT: 5.47, PBD: false, PBW: false },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 2, avgWeight: 4.68, proScore: 3.31, coverage: 0.5,
      price: 411.25, weeklyPrices: [406.37, 401.94, 400.60, 400.08, 411.25], weeklyChange: 1.2, sortRank: 0, periodReturns: { '1M': -3.4, '6M': 23.5, '1Y': 29 },
      priceHistory: { '1W': [406.37, 401.94, 400.6, 400.08, 411.25], '1M': [422.44, 410.86, 421.39, 399.15, 401.51, 419, 401.53, 406.94, 408.1, 399.44, 381.87, 371.88, 379.69, 381.51, 391.35, 403.13, 406.37, 401.94, 400.6, 400.08, 411.25], '6M': [333.11, 341.76, 329.93, 322.81, 318.51, 320.58, 333.46, 331.22, 351.42, 373.82, 389.25, 362.05, 377.4, 347.75, 355.4, 356.8, 357.36, 363.89, 403.36, 407.57, 416.77, 422.44, 419, 381.87, 403.13, 411.25], '1Y': [318.86, 325.81, 338.01, 343.26, 355.04, 359.78, 362.89, 372.65, 390.01, 356.45, 363.3, 349, 352.02, 342.99, 362.25, 363.35, 372.21, 373.84, 376.7, 381.72, 373.46, 376.01, 377.72, 367.91, 338.29, 336.65, 335.57, 353.45, 315.82, 323.67, 327.31, 324.51, 333.46, 331.22, 351.42, 373.82, 389.25, 362.05, 377.4, 353.87, 361.04, 359.74, 343.53, 368.85, 401.9, 407.57, 416.77, 422.44, 419, 381.87, 403.13, 411.25] },
      velocityScore: { '1D': 0.6, '1W': 3.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$160B', pe: 40.3, revenueGrowth: 17, eps: 10.2, grossMargin: 37, dividendYield: 1.1,
      etfPresence: { POW: 3.91, VOLT: 5.45, PBD: false, PBW: false },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'VICR', name: 'Vicor Corp', easyScore: 1, avgWeight: 5.64, proScore: 2.82, coverage: 0.25,
      price: 325.5, weeklyPrices: [345.84, 342.09, 334.84, 328.85, 325.50], weeklyChange: -5.88, sortRank: 0, periodReturns: { '1M': 21.3, '6M': 257.1, '1Y': 655 },
      priceHistory: { '1W': [345.84, 342.09, 334.84, 328.85, 325.5], '1M': [251.02, 266.01, 280.34, 261.34, 256.47, 312.96, 292.53, 309.27, 290.54, 273.67, 249.02, 243.43, 264.2, 268.29, 267.99, 332.95, 345.84, 342.09, 334.84, 328.85, 325.5], '6M': [91.14, 99.3, 93.45, 108.97, 109.6, 136.11, 145.48, 153.29, 157.67, 159.87, 155.96, 171.8, 209.19, 162.67, 172.57, 164.54, 153.02, 155.71, 186.22, 224.81, 268.61, 251.02, 312.96, 249.02, 332.95, 325.5], '1Y': [43.11, 45.84, 44.84, 45.39, 45.34, 46.72, 47.32, 45.2, 45.72, 46.91, 48.43, 47.24, 51.51, 50.51, 50.09, 52.21, 52.81, 49.31, 51.5, 57.31, 65.8, 89.65, 88.36, 92.58, 84.66, 88.15, 92.82, 100.83, 97.19, 108.46, 116.86, 142.31, 145.48, 153.29, 157.67, 159.87, 155.96, 171.8, 209.19, 170.03, 185.42, 173.07, 142.22, 159.83, 190.1, 224.81, 268.61, 251.02, 312.96, 249.02, 332.95, 325.5] },
      velocityScore: { '1D': -1.7, '1W': 22.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$15B', pe: 108.9, revenueGrowth: 20, eps: 2.99, grossMargin: 54, dividendYield: null,
      etfPresence: { POW: 5.64, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Vicor Corp is a power conversion specialist — high-efficiency modules for AI server power delivery. It holds a niche position in Industrials ETFs on the data center power density thesis. Revenue growth has been lumpy, but when AI GPU clusters require Vicor\'s factorized power architecture, the order cycles are large.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 2, avgWeight: 3.6, proScore: 2.55, coverage: 0.5,
      price: 971.15, weeklyPrices: [1031.89, 996.00, 968.32, 950.54, 971.15], weeklyChange: -5.89, sortRank: 0, periodReturns: { '1M': -8.6, '6M': 61.4, '1Y': 100.2 },
      priceHistory: { '1W': [1031.89, 996, 968.32, 950.54, 971.15], '1M': [1073.95, 1095.21, 1118.96, 1045.63, 1040.15, 1073.08, 1071.98, 1062.57, 1090.53, 1049.23, 1012.25, 1011.8, 1024.52, 1043.82, 1038.74, 1070.47, 1031.89, 996, 968.32, 950.54, 971.15], '6M': [601.58, 625.3, 686.22, 661.45, 653.57, 628.4, 642.23, 657.78, 726.37, 779.35, 802.13, 831.7, 881.18, 789.23, 805.02, 851.07, 853.16, 897.36, 991.12, 990.18, 1120.23, 1073.95, 1073.08, 1012.25, 1070.47, 971.15], '1Y': [485.16, 480, 487.88, 510.84, 506, 535.77, 561.17, 548.99, 632.67, 649.72, 657.44, 603.13, 625.91, 577.04, 643.56, 614.79, 628.97, 606.15, 625.45, 615.95, 585.33, 570.98, 547.96, 576.08, 554.93, 572.56, 601.97, 723, 614.19, 667.32, 679.55, 622.5, 642.23, 657.78, 726.37, 779.35, 802.13, 831.7, 881.18, 830.1, 827.37, 882.64, 817.35, 910.75, 987.5, 990.18, 1120.23, 1073.95, 1073.08, 1012.25, 1070.47, 971.15] },
      velocityScore: { '1D': -1.2, '1W': -7.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$261B', pe: 28.4, revenueGrowth: 16, eps: 34.22, grossMargin: 20, dividendYield: 0.21,
      etfPresence: { POW: 3.19, VOLT: 4.02, PBD: false, PBW: false },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 2, avgWeight: 3.59, proScore: 2.54, coverage: 0.5,
      price: 177.68, weeklyPrices: [167.80, 164.87, 166.99, 171.55, 177.68], weeklyChange: 5.89, sortRank: 0, periodReturns: { '1M': 11.8, '6M': 68.6, '1Y': 174.9 },
      priceHistory: { '1W': [167.8, 164.87, 166.99, 171.55, 177.68], '1M': [162.69, 169.41, 172.49, 166.73, 169.95, 173.39, 170.74, 172.91, 173.96, 169.01, 160.69, 158.23, 161.86, 163.57, 164.66, 169.29, 167.8, 164.87, 166.99, 171.55, 177.68], '6M': [105.36, 107.42, 102.41, 103.97, 101.97, 102.72, 107.98, 110.29, 112.26, 112.64, 113.25, 114.93, 120.27, 106.02, 109.93, 116.3, 116.98, 117.41, 133.16, 135.8, 141.71, 162.69, 173.39, 160.69, 169.29, 177.68], '1Y': [64.64, 68.32, 70.4, 72.34, 72.16, 75.2, 74.48, 74.63, 79.72, 89.73, 91.84, 88.15, 90.84, 89.49, 94.98, 96.46, 97.27, 100.12, 98.72, 101.1, 99.65, 104.22, 109.62, 109.59, 104.31, 104.93, 104.97, 108.87, 94.99, 103.97, 106.82, 105.38, 107.98, 110.29, 112.26, 112.64, 113.25, 114.93, 120.27, 108.13, 114.3, 121, 112.75, 118.92, 134.48, 135.8, 141.71, 162.69, 173.39, 160.69, 169.29, 177.68] },
      velocityScore: { '1D': 3.3, '1W': 5.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$29B', pe: 60.6, revenueGrowth: 54, eps: 2.93, grossMargin: 37, dividendYield: 0.49,
      etfPresence: { POW: 3.88, VOLT: 3.3, PBD: false, PBW: false },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CORP', easyScore: 2, avgWeight: 3.17, proScore: 2.25, coverage: 0.5,
      price: 293.97, weeklyPrices: [293.80, 290.01, 285.00, 273.51, 293.97], weeklyChange: 0.06, sortRank: 0, periodReturns: { '1M': 1.2, '6M': 180, '1Y': 1508.2 },
      priceHistory: { '1W': [293.8, 290.01, 285, 273.51, 293.97], '1M': [288.64, 295.25, 285.47, 258.64, 261.03, 283.92, 280.69, 289.76, 303.41, 275.95, 258.71, 261.34, 282.31, 307.88, 302.49, 302.4, 293.8, 290.01, 285, 273.51, 293.97], '6M': [105, 109.44, 87.61, 91.43, 86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 160.28, 166, 135.19, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 288.64, 283.92, 258.71, 302.4, 293.97], '1Y': [18.28, 21.43, 22.91, 22.95, 22.13, 28.71, 24.69, 25.93, 34.75, 37.61, 41.25, 43.1, 49.94, 52.45, 62.96, 79.67, 69.18, 90.19, 87.58, 116.58, 104.38, 113.28, 129.05, 127.07, 104.97, 94.29, 102.5, 101.29, 76.97, 91.88, 98.69, 134.07, 139.17, 144.89, 151.37, 143.03, 139.74, 160.28, 166, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 218.27, 234.68, 288.64, 283.92, 258.71, 302.4, 293.97] },
      velocityScore: { '1D': -3.4, '1W': -10, '1M': null, '6M': null }, isNew: false,
      marketCap: '$84B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: 4.37, PBD: false, PBW: 1.98 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'PRY', name: 'Prysmian SpA', easyScore: 1, avgWeight: 4.37, proScore: 2.19, coverage: 0.25,
      price: 0, weeklyPrices: [0.00], weeklyChange: 0, sortRank: 0, periodReturns: { '1M': 0, '6M': 0, '1Y': 0 },
      priceHistory: undefined,
      velocityScore: { '1D': 0.5, '1W': -0.9, '1M': null, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: null, revenueGrowth: 0, eps: 0, grossMargin: 0, dividendYield: null,
      etfPresence: { POW: 4.37, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Prysmian SpA appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 4.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 2, avgWeight: 2.96, proScore: 2.1, coverage: 0.5,
      price: 469.2, weeklyPrices: [484.25, 473.93, 473.61, 462.93, 469.20], weeklyChange: -3.11, sortRank: 0, periodReturns: { '1M': -7.7, '6M': 9.8, '1Y': 23 },
      priceHistory: { '1W': [484.25, 473.93, 473.61, 462.93, 469.2], '1M': [516, 507.81, 502.34, 493.04, 492.58, 490.16, 485.98, 483.79, 482.03, 479.97, 470.87, 461.5, 463.32, 460.98, 475.01, 478.05, 484.25, 473.93, 473.61, 462.93, 469.2], '6M': [427.48, 438.7, 438.42, 455.92, 444.11, 460.87, 484.11, 485.53, 487.94, 503.8, 524.12, 516.99, 516.98, 471.54, 467.38, 475.74, 480.97, 499.2, 539.79, 546.23, 555.34, 516, 490.16, 470.87, 478.05, 469.2], '1Y': [381.34, 392.34, 391.89, 402.99, 410.51, 417.71, 418.42, 428.55, 427.33, 427.67, 432.14, 432.81, 442.52, 428.8, 442.33, 433.26, 431.16, 430.47, 419.67, 434.05, 435.29, 455.34, 459.44, 450.12, 417.28, 429.82, 429.34, 448.18, 429.68, 456.28, 463.03, 470.53, 484.11, 485.53, 487.94, 503.8, 524.12, 516.99, 516.98, 487.76, 472.64, 489.07, 472.07, 499.31, 545.62, 546.23, 555.34, 516, 490.16, 470.87, 478.05, 469.2] },
      velocityScore: { '1D': -1.4, '1W': -0.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$25B', pe: 27.8, revenueGrowth: 11, eps: 16.9, grossMargin: 36, dividendYield: 1.23,
      etfPresence: { POW: 2.68, VOLT: 3.25, PBD: false, PBW: false },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 2, avgWeight: 2.94, proScore: 2.08, coverage: 0.5,
      price: 84.87, weeklyPrices: [87.65, 87.25, 87.01, 83.66, 84.87], weeklyChange: -3.17, sortRank: 0, periodReturns: { '1M': -12.5, '6M': 0.3, '1Y': 21 },
      priceHistory: { '1W': [87.65, 87.25, 87.01, 83.66, 84.87], '1M': [95.51, 96.28, 95.39, 93.32, 93.1, 94.84, 94.59, 94.85, 95.68, 93.36, 89.04, 90.06, 88.27, 89.69, 88.55, 87.65, 87.65, 87.25, 87.01, 83.66, 84.87], '6M': [84.58, 79.64, 81.32, 79.79, 80.28, 79.49, 82.19, 84.81, 87.9, 89.47, 93.8, 94.06, 92.71, 91.02, 92.78, 89.5, 91.4, 92.73, 92.3, 92.01, 94.83, 95.51, 94.84, 89.04, 87.65, 84.87], '1Y': [70.15, 71.9, 73.78, 71.4, 73.06, 73.65, 74.77, 77.54, 71.95, 71.18, 71.86, 76.51, 74.84, 71.63, 71.04, 70.31, 73.83, 78.67, 84.04, 85.79, 83.99, 83.57, 81.69, 85.76, 84.64, 84.83, 84.95, 81.27, 80.29, 80.45, 80.93, 79.89, 82.19, 84.81, 87.9, 89.47, 93.8, 94.06, 92.71, 92.01, 92.82, 90.23, 92.05, 93.67, 91.31, 92.01, 94.83, 95.51, 94.84, 89.04, 87.65, 84.87] },
      velocityScore: { '1D': -2.8, '1W': -16.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$177B', pe: 21.5, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.98,
      etfPresence: { POW: 1.88, VOLT: 3.99, PBD: false, PBW: false },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, avgWeight: 2.73, proScore: 1.93, coverage: 0.5,
      price: 124.88, weeklyPrices: [129.57, 127.76, 126.67, 123.79, 124.88], weeklyChange: -3.62, sortRank: 0, periodReturns: { '1M': -8.8, '6M': 4.7, '1Y': 21 },
      priceHistory: { '1W': [129.57, 127.76, 126.67, 123.79, 124.88], '1M': [134.66, 137.04, 132.56, 131.76, 130.16, 130.7, 131.94, 127.95, 128.6, 125.15, 127.68, 128.92, 128.87, 129.61, 131.59, 130.9, 129.57, 127.76, 126.67, 123.79, 124.88], '6M': [119.23, 116.07, 114.57, 115.15, 115.31, 115.93, 119.4, 116.63, 119.78, 120.8, 129.94, 132.03, 133.29, 131.87, 133.61, 125.66, 130.1, 132.36, 134.46, 133.28, 135.07, 134.66, 130.7, 127.68, 130.9, 124.88], '1Y': [103.18, 101.41, 101.91, 103.28, 104.39, 104.74, 105.49, 110.16, 109.22, 113.24, 111.99, 112.66, 112.63, 110.03, 108.34, 107.52, 108.88, 112.75, 118.19, 118.53, 117.43, 115.11, 120.3, 122.73, 123.51, 121.58, 118.06, 114.16, 114.71, 115.31, 115.81, 116.91, 119.4, 116.63, 119.78, 120.8, 129.94, 132.03, 133.29, 131.86, 134.15, 127.92, 131.12, 132.92, 135.46, 133.28, 135.07, 134.66, 130.7, 127.68, 130.9, 124.88] },
      velocityScore: { '1D': -1, '1W': -4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$68B', pe: 18.5, revenueGrowth: 10, eps: 6.76, grossMargin: 47, dividendYield: 3.07,
      etfPresence: { POW: 1.29, VOLT: 4.17, PBD: false, PBW: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'OGE', name: 'OGE ENERGY CORP', easyScore: 1, avgWeight: 3.69, proScore: 1.84, coverage: 0.25,
      price: 46.03, weeklyPrices: [48.18, 47.38, 47.23, 45.66, 46.03], weeklyChange: -4.46, sortRank: 0, periodReturns: { '1M': -4.5, '6M': 3.6, '1Y': 3.8 },
      priceHistory: { '1W': [48.18, 47.38, 47.23, 45.66, 46.03], '1M': [47.84, 47.84, 47.73, 47.33, 47.35, 47.4, 47.64, 47.34, 47.51, 46.27, 47.31, 48.05, 47.9, 48.1, 48.54, 48.41, 48.18, 47.38, 47.23, 45.66, 46.03], '6M': [44.42, 43.07, 43.07, 42.98, 42.7, 42.71, 43.72, 42.69, 43.68, 43.96, 46.98, 48.13, 49.25, 48.2, 48.35, 46.14, 47.54, 48.61, 48.6, 47.3, 47.59, 47.84, 47.4, 47.31, 48.41, 46.03], '1Y': [44.34, 43.77, 43.87, 44.72, 44.67, 44.16, 44.12, 45.77, 44.91, 45.42, 45.17, 45.1, 45.11, 44.3, 43.94, 44.11, 45.31, 45.71, 45.85, 47.04, 46.66, 45.39, 44.29, 45.38, 44.14, 44.85, 44.25, 42.89, 43.07, 42.99, 42.88, 42.83, 43.72, 42.69, 43.68, 43.96, 46.98, 48.13, 49.25, 47.93, 48.39, 46.65, 47.89, 49.01, 48.84, 47.3, 47.59, 47.84, 47.4, 47.31, 48.41, 46.03] },
      velocityScore: { '1D': -2.1, '1W': -3.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 20.5, revenueGrowth: 1, eps: 2.25, grossMargin: 44, dividendYield: 3.72,
      etfPresence: { POW: false, VOLT: 3.69, PBD: false, PBW: false },
      tonyNote: 'OGE Energy is a regional Oklahoma utility held in Electrification ETFs. Revenue is regulated, dividend yield is the primary return driver, and the load growth thesis is less prominent than for AEP or NEE. The ETF allocation is defensive — utilities in electrification ETFs serve as yield anchors alongside the higher-growth infrastructure names.',
    },
    {
      ticker: 'APH', name: 'Amphenol Corp', easyScore: 2, avgWeight: 2.53, proScore: 1.79, coverage: 0.5,
      price: 146.78, weeklyPrices: [140.24, 147.68, 148.76, 146.34, 146.78], weeklyChange: 4.66, sortRank: 0, periodReturns: { '1M': 3.1, '6M': 3.7, '1Y': 62.4 },
      priceHistory: { '1W': [140.24, 147.68, 148.76, 146.34, 146.78], '1M': [141.03, 136.69, 138.47, 136.62, 128.03, 122.47, 127.87, 124.64, 129.19, 125, 121.72, 119.2, 123.05, 124.86, 132.06, 139.56, 140.24, 147.68, 148.76, 146.34, 146.78], '6M': [141.49, 138.58, 129.13, 137.12, 135.14, 136.25, 154.22, 150.99, 144.08, 136.23, 146.72, 147.82, 135.16, 131.87, 133.92, 126.74, 123.62, 126.49, 145.27, 152.81, 148.64, 141.03, 122.47, 121.72, 139.56, 146.78], '1Y': [90.36, 92.96, 93.38, 95.8, 97.39, 98.21, 100.55, 101.78, 105.31, 107.93, 111.85, 109.98, 109.9, 110.69, 119.09, 118.41, 123.13, 124.66, 125.79, 125.6, 124.44, 137.29, 136.7, 143.47, 132.44, 137.81, 138.65, 138.68, 126.51, 137.94, 139.71, 140.16, 154.22, 150.99, 144.08, 136.23, 146.72, 147.82, 135.16, 136.06, 136.8, 130.67, 119.15, 128.38, 148.72, 152.81, 148.64, 141.03, 122.47, 121.72, 139.56, 146.78] },
      velocityScore: { '1D': -0.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$181B', pe: 42.2, revenueGrowth: 58, eps: 3.48, grossMargin: 38, dividendYield: 0.68,
      etfPresence: { POW: 0.91, VOLT: 4.15, PBD: false, PBW: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'MOD', name: 'MODINE MANUFACTURING CO', easyScore: 1, avgWeight: 3.54, proScore: 1.77, coverage: 0.25,
      price: 298.78, weeklyPrices: [279.93, 270.70, 278.91, 288.52, 298.78], weeklyChange: 6.73, sortRank: 0, periodReturns: { '1M': 12, '6M': 86.2, '1Y': 236.5 },
      priceHistory: { '1W': [279.93, 270.7, 278.91, 288.52, 298.78], '1M': [259.76, 271.6, 274.22, 269.65, 273, 284.8, 276.27, 279.2, 292.16, 271.26, 247.13, 244.49, 257.33, 250.11, 260.52, 295.88, 279.93, 270.7, 278.91, 288.52, 298.78], '6M': [160.45, 152.95, 138.59, 137.64, 133.51, 120, 131.86, 145.99, 184.66, 215.72, 216.5, 222.5, 238.5, 187.29, 188.54, 196.55, 213.96, 214.88, 256.99, 251.5, 244.95, 259.76, 284.8, 247.13, 295.88, 298.78], '1Y': [88.79, 90.69, 95.85, 99.93, 98, 98.68, 91.3, 93.83, 111.95, 140.51, 142.12, 137.05, 141.51, 133.78, 151.5, 152.48, 141.28, 147.87, 154.54, 162.07, 156.71, 162.02, 146.14, 151.7, 130.57, 155.79, 157.46, 162.66, 128.39, 137.59, 140.81, 125.14, 131.86, 145.99, 184.66, 215.72, 216.5, 222.5, 238.5, 201.07, 197.95, 211.47, 202.18, 214, 253.66, 251.5, 244.95, 259.76, 284.8, 247.13, 295.88, 298.78] },
      velocityScore: { '1D': 4.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$16B', pe: 132.8, revenueGrowth: 48, eps: 2.25, grossMargin: 23, dividendYield: null,
      etfPresence: { POW: false, VOLT: 3.54, PBD: false, PBW: false },
      tonyNote: 'Modine Manufacturing is a thermal management company — heat exchangers and liquid cooling systems for data centers and industrial applications. It holds a position in Industrials ETFs as a direct beneficiary of the AI server cooling challenge. Revenue grew materially as data center customers upgraded from air to liquid cooling; the growth runway remains substantial.',
    },
    {
      ticker: 'ET', name: 'ENERGY TRANSFER LP', easyScore: 1, avgWeight: 3.51, proScore: 1.75, coverage: 0.25,
      price: 19.39, weeklyPrices: [19.33, 19.42, 19.17, 19.27, 19.39], weeklyChange: 0.31, sortRank: 0, periodReturns: { '1M': -2.8, '6M': 16.9, '1Y': 10.9 },
      priceHistory: { '1W': [19.33, 19.42, 19.17, 19.27, 19.39], '1M': [20.08, 20.39, 19.87, 19.92, 19.34, 19.61, 20, 20.1, 20.36, 20.15, 20.19, 20.39, 20.16, 20.01, 20.07, 19.6, 19.33, 19.42, 19.17, 19.27, 19.39], '6M': [16.59, 16.67, 16.36, 16.36, 16.49, 16.89, 17.46, 17.99, 18.45, 17.94, 18.75, 18.82, 19.1, 18.74, 18.75, 19.01, 19.67, 18.96, 18.85, 18.91, 19.05, 20.08, 19.61, 20.19, 19.6, 19.39], '1Y': [17.48, 17.71, 18.15, 17.69, 17.81, 17.64, 17.44, 17.33, 18.16, 17.73, 17.39, 17.35, 17.59, 17.57, 17.42, 17.53, 17.4, 16.99, 16.67, 16.9, 16.76, 16.99, 16.55, 16.7, 16.97, 16.27, 16.71, 16.45, 16.39, 16.39, 16.59, 16.96, 17.46, 17.99, 18.45, 17.94, 18.75, 18.82, 19.1, 18.59, 18.74, 19.06, 19.59, 19.12, 18.73, 18.91, 19.05, 20.08, 19.61, 20.19, 19.6, 19.39] },
      velocityScore: { '1D': 1.7, '1W': -1.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$67B', pe: 16.2, revenueGrowth: 32, eps: 1.2, grossMargin: 19, dividendYield: 6.93,
      etfPresence: { POW: false, VOLT: 3.51, PBD: false, PBW: false },
      tonyNote: 'Energy Transfer is a midstream pipeline MLP held in Electrification ETFs for its natural gas infrastructure exposure — power plants running on natural gas are a key bridge fuel for data center load growth in states where renewables cannot meet baseload demand. High dividend yield and steady fee-based revenue make it an income-oriented allocation.',
    },
    {
      ticker: 'ETR', name: 'ENTERGY CORP', easyScore: 1, avgWeight: 3.51, proScore: 1.75, coverage: 0.25,
      price: 106.24, weeklyPrices: [111.51, 109.62, 109.05, 104.97, 106.24], weeklyChange: -4.73, sortRank: 0, periodReturns: { '1M': -8.8, '6M': 14.3, '1Y': 27.8 },
      priceHistory: { '1W': [111.51, 109.62, 109.05, 104.97, 106.24], '1M': [116.4, 117.36, 112.96, 112.02, 111.59, 112.97, 112.93, 112.35, 112.9, 109.03, 109.58, 110.55, 111.93, 112.27, 112.4, 111.97, 111.51, 109.62, 109.05, 104.97, 106.24], '6M': [92.97, 93.23, 92.81, 92.33, 92.43, 91.19, 95.67, 93.19, 95.89, 97.96, 105.07, 104.87, 106.63, 104.7, 105.58, 99.9, 109.88, 114.57, 115.33, 113.66, 113.44, 116.4, 112.97, 109.58, 111.97, 106.24], '1Y': [83.14, 82.81, 81.73, 82.97, 82.53, 81.46, 83.55, 88.53, 88.24, 90.4, 90.89, 88.81, 89.59, 87.2, 88.44, 88.18, 91.59, 93.4, 96.66, 97.65, 95.66, 95.02, 96.23, 96.87, 94.44, 95.27, 94.24, 93.33, 91.83, 92.67, 93.86, 93.52, 95.67, 93.19, 95.89, 97.96, 105.07, 104.87, 106.63, 104.65, 106.17, 101.34, 111.06, 113.87, 115.57, 113.66, 113.44, 116.4, 112.97, 109.58, 111.97, 106.24] },
      velocityScore: { '1D': -2.2, '1W': -3.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$49B', pe: 27.1, revenueGrowth: 12, eps: 3.92, grossMargin: 47, dividendYield: 2.44,
      etfPresence: { POW: false, VOLT: 3.51, PBD: false, PBW: false },
      tonyNote: 'Entergy is a regulated utility operating in the Gulf Coast region, held in Electrification ETFs for income and load growth from industrial and data center customers. The dividend is well-covered and the rate base is growing as Louisiana and Texas attract manufacturing reshoring and technology infrastructure investment.',
    },
    {
      ticker: 'HYLN', name: 'Hyliion Holdings Corp', easyScore: 1, avgWeight: 3.44, proScore: 1.72, coverage: 0.25,
      price: 6.18, weeklyPrices: [6.94, 7.19, 6.99, 6.25, 6.18], weeklyChange: -10.95, sortRank: 0, periodReturns: { '1M': 202.9, '6M': 241.4, '1Y': 332.2 },
      priceHistory: { '1W': [6.94, 7.19, 6.99, 6.25, 6.18], '1M': [2.11, 2.31, 2.39, 2.47, 2.46, 2.76, 2.68, 3.59, 3.69, 4.67, 4.2, 4.09, 4.09, 4.2, 5.99, 6.6, 6.94, 7.19, 6.99, 6.25, 6.18], '6M': [1.81, 1.92, 1.82, 1.99, 1.84, 1.98, 2.23, 2.19, 2.05, 2.01, 2.04, 1.95, 2.23, 2, 2.01, 1.77, 1.8, 1.7, 1.84, 1.96, 1.84, 2.11, 2.76, 4.2, 6.6, 6.18], '1Y': [1.43, 1.61, 1.56, 1.39, 1.37, 1.51, 1.52, 1.66, 1.54, 1.53, 1.69, 1.57, 1.83, 1.59, 1.64, 1.77, 2.24, 2.05, 2.51, 2.5, 2.15, 2.12, 2.09, 2.18, 1.68, 1.84, 1.89, 1.94, 1.76, 1.98, 1.82, 1.94, 2.23, 2.19, 2.05, 2.01, 2.04, 1.95, 2.23, 1.97, 1.98, 1.9, 1.66, 1.7, 1.9, 1.96, 1.84, 2.11, 2.76, 4.2, 6.6, 6.18] },
      velocityScore: { '1D': -10.9, '1W': -1.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1B', pe: null, revenueGrowth: 479, eps: -0.3, grossMargin: 6, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 3.44 },
      tonyNote: 'Hyliion is a small-cap commercial truck powertrain electrification company. It holds a speculative position in Electrification ETFs on the heavy-duty vehicle decarbonization thesis. Revenue is early-stage and the path to profitability is long; the ETF weight is small, reflecting a lottery-ticket allocation to an electrification theme adjacent holding.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, avgWeight: 2.35, proScore: 1.67, coverage: 0.5,
      price: 304.84, weeklyPrices: [328.34, 317.08, 302.18, 294.65, 304.84], weeklyChange: -7.16, sortRank: 0, periodReturns: { '1M': -21.6, '6M': 44.5, '1Y': 163.7 },
      priceHistory: { '1W': [328.34, 317.08, 302.18, 294.65, 304.84], '1M': [387.03, 345.63, 360.81, 351.94, 357.24, 354.97, 339.42, 339.19, 344.6, 323.46, 309.06, 302.84, 313.05, 323.79, 324.86, 339.65, 328.34, 317.08, 302.18, 294.65, 304.84], '6M': [210.94, 221.27, 215.16, 217.51, 209.37, 210.99, 257.29, 262.19, 255.36, 273.26, 314.27, 329.24, 340.42, 290.78, 302.02, 317.21, 310.76, 331.9, 378.94, 380.22, 385.68, 387.03, 354.97, 309.06, 339.65, 304.84], '1Y': [115.58, 125.73, 125.26, 132.51, 133.59, 141.13, 139.42, 140.68, 142.21, 139.58, 158.81, 150.41, 154.44, 145.25, 157.25, 157.79, 170.77, 176.2, 174.92, 189.96, 196.58, 204.62, 195.05, 215.98, 199.22, 205.92, 213.44, 221.47, 204.49, 217.23, 221.99, 219.59, 257.29, 262.19, 255.36, 273.26, 314.27, 329.24, 340.42, 305.02, 308.31, 329.78, 298.29, 339.32, 385.73, 380.22, 385.68, 387.03, 354.97, 309.06, 339.65, 304.84] },
      velocityScore: { '1D': -1.2, '1W': -7.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 63.5, revenueGrowth: 26, eps: 4.8, grossMargin: 39, dividendYield: 0.14,
      etfPresence: { POW: 0.87, VOLT: 3.84, PBD: false, PBW: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'FCEL', name: 'FuelCell Energy Inc', easyScore: 1, avgWeight: 3.32, proScore: 1.66, coverage: 0.25,
      price: 22.19, weeklyPrices: [23.69, 24.39, 21.66, 21.31, 22.19], weeklyChange: -6.33, sortRank: 0, periodReturns: { '1M': 66.7, '6M': 220.2, '1Y': 349.2 },
      priceHistory: { '1W': [23.69, 24.39, 21.66, 21.31, 22.19], '1M': [13.02, 13.55, 12.81, 12.28, 13.7, 15.94, 17.09, 19.92, 21.6, 21.36, 17.74, 17.36, 20.22, 26.38, 25.01, 24.4, 23.69, 24.39, 21.66, 21.31, 22.19], '6M': [6.93, 8.36, 8.47, 8.79, 7.31, 7.8, 7.45, 10.13, 8.19, 7.19, 7.22, 7.69, 8.33, 7.6, 6.63, 6.59, 6.53, 6.67, 6.83, 8.65, 10.68, 13.02, 15.94, 17.74, 24.4, 22.19], '1Y': [4.94, 7.47, 6.94, 5.93, 5.22, 5.6, 4.99, 5.73, 4.89, 4.66, 4.09, 4.04, 4.34, 4.02, 5.7, 7.65, 8.67, 8.73, 10.23, 10.71, 8.31, 7.63, 7.4, 7.39, 6.84, 6.02, 7.18, 8.46, 7.9, 8.77, 8.17, 7.58, 7.45, 10.13, 8.19, 7.19, 7.22, 7.69, 8.33, 7.38, 6.91, 6.71, 6.23, 6.27, 7.3, 8.65, 10.68, 13.02, 15.94, 17.74, 24.4, 22.19] },
      velocityScore: { '1D': null, '1W': -19, '1M': null, '6M': null }, isNew: true,
      marketCap: '$1B', pe: null, revenueGrowth: 61, eps: -6.49, grossMargin: -16, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 3.32 },
      tonyNote: 'FuelCell Energy Inc appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 3.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'TKR', name: 'TKR', easyScore: 1, avgWeight: 8.77, proScore: 3.92, coverage: 0.2,
      price: 128.16, weeklyPrices: [127.16, 126.78, 127.98, 126.54, 128.16], weeklyChange: 0.78, sortRank: 0, periodReturns: { '1M': 17.6, '6M': 60.6, '1Y': 85.8 },
      priceHistory: { '1W': [127.16, 126.78, 127.98, 126.54, 128.16], '1M': [107.12, 109.63, 119.7, 116.34, 117.97, 117.39, 117.12, 115.74, 116.74, 114.49, 112.73, 109.36, 117.2, 118.93, 119.95, 127.42, 127.16, 126.78, 127.98, 126.54, 128.16], '6M': [79.82, 83.16, 85.77, 86.09, 84.13, 90.6, 93.73, 93.94, 93.19, 106.04, 107.84, 107.83, 109.99, 99.68, 97.54, 95.25, 97.56, 98.94, 106.9, 108.45, 108.7, 107.12, 117.39, 112.73, 127.42, 128.16], '1Y': [68.98, 72.63, 71.63, 73.62, 75.44, 77.68, 76.68, 80.02, 80.98, 74.65, 76.91, 76.88, 78.96, 75.12, 76.4, 77.11, 75.67, 75.11, 75.86, 74.7, 77.3, 77.22, 76.29, 78.2, 74.33, 81.22, 82.52, 87.53, 84.14, 86.02, 86.29, 91.17, 93.73, 93.94, 93.19, 106.04, 107.84, 107.83, 109.99, 100.58, 98.74, 98.99, 95.94, 99.17, 106.81, 108.45, 108.7, 107.12, 117.39, 112.73, 127.42, 128.16] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 29.1, revenueGrowth: 8, eps: 4.4, grossMargin: 31, dividendYield: 1.14,
      etfPresence: { AIRR: false, PRN: false, RSHO: 8.77, IDEF: false, BILT: false },
      tonyNote: 'TKR appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 5.4, proScore: 3.42, coverage: 0.4,
      price: 855.78, weeklyPrices: [782.12, 842.96, 860.84, 845.39, 855.78], weeklyChange: 9.42, sortRank: 0, periodReturns: { '1M': 60.7, '6M': 161.1, '1Y': 351.4 },
      priceHistory: { '1W': [782.12, 842.96, 860.84, 845.39, 855.78], '1M': [529.49, 806, 886.22, 811.41, 844.8, 868.18, 851.35, 854.28, 889.03, 848.84, 770.76, 728.29, 752, 733.77, 732.94, 783.53, 782.12, 842.96, 860.84, 845.39, 855.78], '6M': [327.78, 324.1, 319.13, 315.87, 306.23, 297.62, 336.31, 351.39, 357.91, 401.29, 437.77, 434.64, 432.87, 395.11, 398.12, 401.61, 420.24, 393.71, 459.02, 472.9, 505.45, 529.49, 868.18, 770.76, 783.53, 855.78], '1Y': [189.6, 202.91, 209.55, 229.38, 222.54, 233.39, 243.23, 242.01, 264.08, 296.58, 308.4, 276.02, 292.95, 273.82, 301.13, 320.94, 344.05, 337.93, 366.99, 365.39, 364.32, 379.89, 382.57, 381.22, 333.88, 332.96, 323.46, 331.61, 283.57, 314, 319.16, 308.13, 336.31, 351.39, 357.91, 401.29, 437.77, 434.64, 432.87, 411.38, 417.76, 422.55, 382.55, 382.22, 464.54, 472.9, 505.45, 529.49, 868.18, 770.76, 783.53, 855.78] },
      velocityScore: { '1D': 0.3, '1W': -27.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$26B', pe: 76.7, revenueGrowth: 92, eps: 11.16, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 6.31, PRN: 4.49, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'CGNX', name: 'CGNX', easyScore: 1, avgWeight: 7.65, proScore: 3.42, coverage: 0.2,
      price: 66.22, weeklyPrices: [66.70, 66.01, 65.85, 64.64, 66.22], weeklyChange: -0.72, sortRank: 0, periodReturns: { '1M': 18.4, '6M': 73.4, '1Y': 123.1 },
      priceHistory: { '1W': [66.7, 66.01, 65.85, 64.64, 66.22], '1M': [56.3, 58.83, 62.26, 65.92, 65.66, 67.26, 65.68, 63.64, 66.09, 64.26, 61.91, 60.65, 63.37, 64.27, 66.09, 68.33, 66.7, 66.01, 65.85, 64.64, 66.22], '6M': [38.19, 38.22, 36.83, 36.66, 35.98, 37.74, 40.59, 39.76, 38.74, 42.37, 58.79, 56.47, 53.83, 49.45, 47.98, 49.24, 47.59, 49.52, 54.39, 55.48, 55.09, 56.3, 67.26, 61.91, 68.33, 66.22], '1Y': [29.68, 31.14, 30.54, 30.71, 32.05, 33.32, 33.32, 34.26, 34.26, 41.86, 42.2, 43.4, 43.89, 43.97, 44.4, 44.08, 45.52, 45.83, 46.75, 45.79, 48.27, 47.29, 40, 38.4, 35.91, 37.76, 37.69, 37.91, 35.76, 36.6, 36.93, 39.01, 40.59, 39.76, 38.74, 42.37, 58.79, 56.47, 53.83, 50.82, 49.56, 50.8, 45.94, 51.69, 55.58, 55.48, 55.09, 56.3, 67.26, 61.91, 68.33, 66.22] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 77.9, revenueGrowth: 24, eps: 0.85, grossMargin: 68, dividendYield: 0.52,
      etfPresence: { AIRR: false, PRN: false, RSHO: 7.65, IDEF: false, BILT: false },
      tonyNote: 'CGNX appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 7.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 5.26, proScore: 3.33, coverage: 0.4,
      price: 293.65, weeklyPrices: [295.94, 288.90, 284.42, 288.12, 293.65], weeklyChange: -0.77, sortRank: 0, periodReturns: { '1M': 6.7, '6M': 173.2, '1Y': 410.2 },
      priceHistory: { '1W': [295.94, 288.9, 284.42, 288.12, 293.65], '1M': [269.95, 294.69, 320.3, 305.93, 309.39, 322.05, 308.05, 300.84, 296.98, 292.65, 266.8, 261.58, 271.05, 270.75, 279.22, 291.97, 295.94, 288.9, 284.42, 288.12, 293.65], '6M': [107.5, 115.02, 110.88, 112.88, 106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 181.38, 177.5, 161.22, 167.57, 172, 179.35, 186.72, 228.99, 241.65, 260.52, 269.95, 322.05, 266.8, 291.97, 293.65], '1Y': [57.55, 63.41, 65.05, 62.82, 70.01, 70.64, 72.53, 73.67, 77.77, 78.75, 90.06, 84.7, 91.08, 85.72, 92.33, 97.11, 97.88, 105.74, 105.13, 109.92, 116.11, 128.09, 126.71, 121.07, 107.22, 104.18, 107.83, 119.95, 105.77, 112.06, 117.51, 121.83, 135.18, 139.32, 147.86, 194.74, 195.02, 181.38, 177.5, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 241.65, 260.52, 269.95, 322.05, 266.8, 291.97, 293.65] },
      velocityScore: { '1D': 0.6, '1W': 83, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 57.2, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { AIRR: 2.61, PRN: false, RSHO: 7.92, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'RTX', name: 'RTX CORP', easyScore: 1, avgWeight: 6.99, proScore: 3.13, coverage: 0.2,
      price: 173.92, weeklyPrices: [176.59, 178.96, 179.66, 174.41, 173.92], weeklyChange: -1.51, sortRank: 0, periodReturns: { '1M': 0, '6M': 3, '1Y': 26.5 },
      priceHistory: { '1W': [176.59, 178.96, 179.66, 174.41, 173.92], '1M': [172.9, 172.87, 176.74, 176.78, 176.09, 178.61, 178.89, 178.11, 175.68, 171.18, 175.95, 174.49, 174.85, 175.98, 177.01, 178.97, 176.59, 178.96, 179.66, 174.41, 173.92], '6M': [168.8, 171.93, 179.93, 185.76, 183.4, 187.17, 199.83, 195.93, 200.93, 198.66, 200.06, 201.92, 212.16, 209.76, 204.52, 198.16, 189.71, 198.41, 201.41, 195.79, 173.38, 172.9, 178.61, 175.95, 178.97, 173.92], '1Y': [137.46, 140.98, 146.46, 141.85, 144.19, 146.18, 150.17, 149.17, 157.12, 156.33, 155.49, 153.66, 159.57, 158.11, 155, 158.31, 161.38, 167.2, 168.57, 157, 173.04, 178.67, 175.61, 179.22, 174.72, 172.15, 168.45, 174.72, 177.2, 186.38, 187.25, 188.5, 199.83, 195.93, 200.93, 198.66, 200.06, 201.92, 212.16, 208.23, 206.06, 194.82, 187.15, 197.92, 202.81, 195.79, 173.38, 172.9, 178.61, 175.95, 178.97, 173.92] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$234B', pe: 32.6, revenueGrowth: 9, eps: 5.34, grossMargin: 20, dividendYield: 1.59,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 6.99, BILT: false },
      tonyNote: 'RTX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 7.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 4.92, proScore: 3.11, coverage: 0.4,
      price: 894.01, weeklyPrices: [909.93, 887.67, 875.87, 865.36, 894.01], weeklyChange: -1.75, sortRank: 0, periodReturns: { '1M': 0.5, '6M': 53.5, '1Y': 159.4 },
      priceHistory: { '1W': [909.93, 887.67, 875.87, 865.36, 894.01], '1M': [874.78, 904.59, 926.93, 895.69, 897.45, 926.79, 912.14, 902.3, 920.22, 888.31, 863.95, 860.15, 872.56, 865.95, 879.89, 908.55, 909.93, 887.67, 875.87, 865.36, 894.01], '6M': [582.47, 594.36, 588.93, 582.42, 572.87, 608.13, 647.18, 626.62, 657.36, 726.2, 774.2, 756.47, 752.32, 680.9, 693.99, 680.88, 695.4, 721.24, 791.73, 798.4, 828.79, 874.78, 926.79, 863.95, 908.55, 894.01], '1Y': [344.67, 358.07, 362.44, 373.02, 390.92, 402.18, 412.88, 417.19, 430.05, 434.23, 412.71, 416.09, 431.26, 415.12, 422.91, 450.66, 469.79, 480.82, 502.12, 534.05, 524.65, 524.47, 547.58, 567.93, 546.88, 566.61, 591.49, 615.35, 561.89, 583.76, 598.41, 617.62, 647.18, 626.62, 657.36, 726.2, 774.2, 756.47, 752.32, 704.82, 699.78, 701.7, 667.43, 724.44, 794.25, 798.4, 828.79, 874.78, 926.79, 863.95, 908.55, 894.01] },
      velocityScore: { '1D': 0.6, '1W': 35.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$412B', pe: 44.5, revenueGrowth: 22, eps: 20.08, grossMargin: 29, dividendYield: 0.7,
      etfPresence: { AIRR: false, PRN: 3.18, RSHO: 6.65, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'LMT', name: 'LOCKHEED MARTIN CORP', easyScore: 1, avgWeight: 6.21, proScore: 2.78, coverage: 0.2,
      price: 512.13, weeklyPrices: [531.14, 537.21, 530.45, 516.50, 512.13], weeklyChange: -3.58, sortRank: 0, periodReturns: { '1M': -0.1, '6M': 15.9, '1Y': 7 },
      priceHistory: { '1W': [531.14, 537.21, 530.45, 516.5, 512.13], '1M': [518.15, 508.93, 514.26, 512.41, 506.51, 512.25, 521, 519.94, 520.41, 516.01, 528.31, 526.63, 522.59, 522.79, 533.24, 532.9, 531.14, 537.21, 530.45, 516.5, 512.13], '6M': [441.82, 466.89, 477.06, 482.55, 483.67, 518.44, 577.89, 590.82, 634.22, 623.58, 652.58, 660.62, 676.7, 671.77, 646, 627.43, 615.84, 637.9, 619.69, 581.28, 513.35, 518.15, 512.25, 528.31, 532.9, 512.13], '1Y': [478.82, 480.83, 467.06, 460.2, 465.94, 463.06, 471.47, 410.74, 420.13, 428.24, 431.56, 441.1, 455.46, 449.06, 463.87, 473.12, 486.25, 499, 514.02, 499.41, 489.5, 485.77, 484.98, 457.07, 474.72, 452.41, 446.8, 467.94, 474.79, 485.75, 497.07, 542.92, 577.89, 590.82, 634.22, 623.58, 652.58, 660.62, 676.7, 664.15, 645.2, 616.25, 598.57, 627.7, 611.58, 581.28, 513.35, 518.15, 512.25, 528.31, 532.9, 512.13] },
      velocityScore: { '1D': 0.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$118B', pe: 24.8, revenueGrowth: 0, eps: 20.66, grossMargin: 10, dividendYield: 2.67,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 6.21, BILT: false },
      tonyNote: 'LOCKHEED MARTIN CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 6.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.38, proScore: 2.77, coverage: 0.4,
      price: 1868.69, weeklyPrices: [1867.09, 1855.15, 1828.21, 1787.88, 1868.69], weeklyChange: 0.09, sortRank: 0, periodReturns: { '1M': 0.1, '6M': 99.7, '1Y': 291.7 },
      priceHistory: { '1W': [1867.09, 1855.15, 1828.21, 1787.88, 1868.69], '1M': [1891.95, 1967.24, 2011.49, 1942.02, 1952.37, 2032.98, 2016.31, 2034.63, 2042.36, 1992.74, 1854.43, 1825.5, 1835.51, 1835.33, 1828.25, 1883.56, 1867.09, 1855.15, 1828.21, 1787.88, 1868.69], '6M': [935.78, 983.61, 968.5, 965.37, 933.29, 971.49, 1091.04, 1121.44, 1142.1, 1230.26, 1337.95, 1413.57, 1438.24, 1279.06, 1365.34, 1356.75, 1366.77, 1434.09, 1627.81, 1680.09, 1794.04, 1891.95, 2032.98, 1854.43, 1883.56, 1868.69], '1Y': [477.08, 501.33, 500.91, 513.32, 521.66, 535.02, 546.63, 532.14, 687.67, 691.45, 718.61, 683.93, 707.39, 700.69, 752.1, 762.91, 791.46, 834.33, 844.62, 837.11, 829.36, 980.97, 955.96, 954.53, 920.99, 957.04, 949.3, 1021.36, 883.79, 958.07, 1003.64, 1010.41, 1091.04, 1121.44, 1142.1, 1230.26, 1337.95, 1413.57, 1438.24, 1372.4, 1414.1, 1408.25, 1273.18, 1424.91, 1650.48, 1680.09, 1794.04, 1891.95, 2032.98, 1854.43, 1883.56, 1868.69] },
      velocityScore: { '1D': 0.4, '1W': -38.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$66B', pe: 53.9, revenueGrowth: 1, eps: 34.68, grossMargin: 25, dividendYield: 0.15,
      etfPresence: { AIRR: 4.16, PRN: 4.59, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, avgWeight: 4.15, proScore: 2.62, coverage: 0.4,
      price: 655, weeklyPrices: [673.51, 677.45, 667.02, 646.89, 655.00], weeklyChange: -2.75, sortRank: 0, periodReturns: { '1M': -6.7, '6M': 83.2, '1Y': 212 },
      priceHistory: { '1W': [673.51, 677.45, 667.02, 646.89, 655], '1M': [697.15, 720, 727.54, 690, 680.26, 683.52, 681.01, 719.92, 740.91, 722.31, 664.76, 639.58, 630.5, 644.64, 656.35, 670.66, 673.51, 677.45, 667.02, 646.89, 655], '6M': [357.48, 332.87, 320.1, 333.23, 313.32, 313.98, 329.66, 363.88, 347.11, 352.09, 409.95, 441.71, 445.36, 414.2, 458.31, 473.85, 566.62, 572.31, 598.44, 611.21, 660.85, 697.15, 683.52, 664.76, 670.66, 655], '1Y': [209.96, 217.97, 218.59, 214.63, 203.78, 206.63, 213.25, 205.66, 238.15, 233.13, 239.05, 213.76, 230.02, 227.03, 225.82, 239.42, 260.56, 279.62, 281.67, 312.5, 281, 292.46, 303.2, 347.88, 344.36, 373.29, 351.09, 325.77, 296.56, 328.26, 325.96, 311.87, 329.66, 363.88, 347.11, 352.09, 409.95, 441.71, 445.36, 466.38, 466.52, 463.15, 513.98, 576.95, 603.91, 611.21, 660.85, 697.15, 683.52, 664.76, 670.66, 655] },
      velocityScore: { '1D': -0.8, '1W': -38.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 67, revenueGrowth: 13, eps: 9.77, grossMargin: 20, dividendYield: 0.31,
      etfPresence: { AIRR: 4, PRN: 4.3, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Argan Inc is an engineering and construction company for power generation facilities — natural gas and renewable power plants. It appears in Industrials ETFs because power plant construction is one of the fastest-growing categories in U.S. infrastructure spending, driven by data center load additions that the grid cannot currently support.',
    },
    {
      ticker: 'ETN', name: 'ETN', easyScore: 1, avgWeight: 5.71, proScore: 2.55, coverage: 0.2,
      price: 411.25, weeklyPrices: [406.37, 401.94, 400.60, 400.08, 411.25], weeklyChange: 1.2, sortRank: 0, periodReturns: { '1M': -3.4, '6M': 23.5, '1Y': 29 },
      priceHistory: { '1W': [406.37, 401.94, 400.6, 400.08, 411.25], '1M': [422.44, 410.86, 421.39, 399.15, 401.51, 419, 401.53, 406.94, 408.1, 399.44, 381.87, 371.88, 379.69, 381.51, 391.35, 403.13, 406.37, 401.94, 400.6, 400.08, 411.25], '6M': [333.11, 341.76, 329.93, 322.81, 318.51, 320.58, 333.46, 331.22, 351.42, 373.82, 389.25, 362.05, 377.4, 347.75, 355.4, 356.8, 357.36, 363.89, 403.36, 407.57, 416.77, 422.44, 419, 381.87, 403.13, 411.25], '1Y': [318.86, 325.81, 338.01, 343.26, 355.04, 359.78, 362.89, 372.65, 390.01, 356.45, 363.3, 349, 352.02, 342.99, 362.25, 363.35, 372.21, 373.84, 376.7, 381.72, 373.46, 376.01, 377.72, 367.91, 338.29, 336.65, 335.57, 353.45, 315.82, 323.67, 327.31, 324.51, 333.46, 331.22, 351.42, 373.82, 389.25, 362.05, 377.4, 353.87, 361.04, 359.74, 343.53, 368.85, 401.9, 407.57, 416.77, 422.44, 419, 381.87, 403.13, 411.25] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$160B', pe: 40.3, revenueGrowth: 17, eps: 10.2, grossMargin: 37, dividendYield: 1.1,
      etfPresence: { AIRR: false, PRN: false, RSHO: 5.71, IDEF: false, BILT: false },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'UNP', name: 'UNION PACIFIC CORP', easyScore: 1, avgWeight: 5.59, proScore: 2.5, coverage: 0.2,
      price: 264.5, weeklyPrices: [279.39, 267.00, 262.64, 263.50, 264.50], weeklyChange: -5.33, sortRank: 0, periodReturns: { '1M': -0.7, '6M': 13.9, '1Y': 20.8 },
      priceHistory: { '1W': [279.39, 267, 262.64, 263.5, 264.5], '1M': [263.41, 264.01, 268.23, 264.89, 264.65, 263.35, 265.6, 264.65, 269.34, 270.56, 275.13, 271.56, 265.8, 265.44, 265.88, 271.1, 279.39, 267, 262.64, 263.5, 264.5], '6M': [232.24, 231.56, 235.88, 234.15, 231.32, 229.85, 230.51, 229.65, 235.1, 252.62, 260.68, 263.76, 266.97, 254.11, 242.44, 234.92, 238.79, 245.54, 251.34, 252.18, 268.91, 263.41, 263.35, 275.13, 271.1, 264.5], '1Y': [218.89, 224.14, 224.65, 227.91, 235.57, 236.49, 231.18, 229.24, 223.77, 222.97, 218.8, 223.77, 222.74, 221.76, 215.19, 217.17, 230.36, 234.74, 232.65, 225.72, 226.54, 217.59, 220.91, 224.8, 220.82, 229.13, 235.23, 235.46, 236.74, 235.05, 231.91, 228.44, 230.51, 229.65, 235.1, 252.62, 260.68, 263.76, 266.97, 253.61, 242.21, 238.37, 239.23, 246.11, 252.04, 252.18, 268.91, 263.41, 263.35, 275.13, 271.1, 264.5] },
      velocityScore: { '1D': 2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$157B', pe: 21.8, revenueGrowth: 3, eps: 12.15, grossMargin: 57, dividendYield: 2.09,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: false, BILT: 5.59 },
      tonyNote: 'UNION PACIFIC CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 5.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TTMI', name: 'TTM Technologies Inc', easyScore: 1, avgWeight: 5.56, proScore: 2.49, coverage: 0.2,
      price: 178.81, weeklyPrices: [190.67, 187.79, 173.72, 172.44, 178.81], weeklyChange: -6.22, sortRank: 0, periodReturns: { '1M': 12.5, '6M': 167.9, '1Y': 499.2 },
      priceHistory: { '1W': [190.67, 187.79, 173.72, 172.44, 178.81], '1M': [157.47, 159.58, 164.64, 153.77, 157.31, 162.99, 163.36, 168.82, 171.87, 167.35, 158.86, 161.41, 169.36, 174.55, 189.92, 196.95, 190.67, 187.79, 173.72, 172.44, 178.81], '6M': [66.75, 76.74, 67.63, 71.59, 69, 66.86, 100.9, 95.02, 98.2, 98.58, 91.8, 106.85, 113, 87.91, 90.64, 91.54, 95.47, 95.7, 123.49, 125.81, 144.17, 157.47, 162.99, 158.86, 196.95, 178.81], '1Y': [29.84, 35.7, 37.09, 37.87, 40.62, 43.99, 45.81, 45.04, 48.52, 43.85, 46.63, 40.5, 44.87, 46.23, 49.43, 49.03, 54.15, 59.07, 58.53, 58.21, 56.69, 59.21, 66.29, 67.87, 63.34, 68.51, 66.76, 77.7, 61.58, 72.59, 70.61, 73.88, 100.9, 95.02, 98.2, 98.58, 91.8, 106.85, 113, 96.8, 96.51, 101.42, 88.29, 99.29, 120.74, 125.81, 144.17, 157.47, 162.99, 158.86, 196.95, 178.81] },
      velocityScore: { '1D': 2.9, '1W': -42.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 96.7, revenueGrowth: 30, eps: 1.85, grossMargin: 21, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 5.56, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'TTM Technologies is a printed circuit board manufacturer held in Industrials ETFs. Revenue growth tracks data center and defense electronics demand. PCB manufacturing is essential hardware infrastructure; TTM\'s position in AI server and high-frequency trading hardware gives it exposure to two durable growth verticals.',
    },
    {
      ticker: 'GTES', name: 'GTES', easyScore: 1, avgWeight: 5.43, proScore: 2.43, coverage: 0.2,
      price: 26.66, weeklyPrices: [25.71, 25.48, 25.92, 25.85, 26.66], weeklyChange: 3.7, sortRank: 0, periodReturns: { '1M': 10.8, '6M': 19.9, '1Y': 26.9 },
      priceHistory: { '1W': [25.71, 25.48, 25.92, 25.85, 26.66], '1M': [24.64, 24.57, 26.24, 25.98, 26.09, 25.98, 25.68, 25.38, 25.67, 24.4, 24.09, 23.45, 24.18, 24.07, 24.48, 25.34, 25.71, 25.48, 25.92, 25.85, 26.66], '6M': [22.23, 21.54, 21.59, 22.19, 21.47, 22.49, 23.05, 23.09, 23.02, 26.81, 27.97, 27.74, 27.6, 23.98, 22.75, 21.74, 22.11, 22.5, 25.65, 25.77, 25.54, 24.64, 25.98, 24.09, 25.34, 26.66], '1Y': [21.01, 21.96, 22.1, 22.85, 23.38, 24.47, 24.44, 24.49, 24.76, 24.22, 24.45, 24.51, 25.89, 25.38, 25.3, 25.18, 24.34, 25.21, 25.54, 25.75, 26.03, 25.82, 21.48, 22.22, 21.2, 22.67, 22.19, 22.29, 21.35, 22.02, 22.06, 22.79, 23.05, 23.09, 23.02, 26.81, 27.97, 27.74, 27.6, 24.11, 22.88, 22.78, 21.04, 22.52, 26.39, 25.77, 25.54, 24.64, 25.98, 24.09, 25.34, 26.66] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: 28.1, revenueGrowth: 0, eps: 0.95, grossMargin: 40, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: 5.43, IDEF: false, BILT: false },
      tonyNote: 'GTES appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 5.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 1, avgWeight: 5.29, proScore: 2.37, coverage: 0.2,
      price: 155.66, weeklyPrices: [132.51, 143.34, 156.54, 160.65, 155.66], weeklyChange: 17.47, sortRank: 0, periodReturns: { '1M': 8, '6M': -8.8, '1Y': 17.9 },
      priceHistory: { '1W': [132.51, 143.34, 156.54, 160.65, 155.66], '1M': [146.03, 135.91, 133.79, 137.05, 137.8, 136.89, 136, 130.05, 133.73, 133.99, 135.14, 135.26, 137.15, 137.41, 136.88, 136.6, 132.51, 143.34, 156.54, 160.65, 155.66], '6M': [170.69, 181.84, 187.75, 194.13, 177.75, 176.86, 177.07, 169.6, 146.59, 135.9, 131.41, 130.6, 145.17, 157.16, 150.95, 150.68, 143.06, 147.93, 132.37, 145.89, 143.1, 146.03, 136.89, 135.14, 136.6, 155.66], '1Y': [132.04, 132.06, 141.41, 143.23, 130.68, 143.13, 150.91, 149.07, 156.24, 173.27, 186.97, 157.75, 160.87, 154.9, 166.74, 168.33, 179.56, 184.95, 183.56, 179.62, 181.51, 189.6, 190.74, 190.96, 167.33, 163.55, 176.08, 187.91, 177.29, 194.17, 167.86, 177.49, 177.07, 169.6, 146.59, 135.9, 131.41, 130.6, 145.17, 156.43, 152.72, 160.84, 137.55, 150.07, 135.7, 145.89, 143.1, 146.03, 136.89, 135.14, 136.6, 155.66] },
      velocityScore: { '1D': 5.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$373B', pe: 176.9, revenueGrowth: 85, eps: 0.88, grossMargin: 84, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 5.29, BILT: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'GD', name: 'GENERAL DYNAMICS CORP', easyScore: 1, avgWeight: 5.16, proScore: 2.31, coverage: 0.2,
      price: 337.23, weeklyPrices: [342.69, 348.96, 346.82, 339.20, 337.23], weeklyChange: -1.59, sortRank: 0, periodReturns: { '1M': -2.5, '6M': 0.4, '1Y': 22.3 },
      priceHistory: { '1W': [342.69, 348.96, 346.82, 339.2, 337.23], '1M': [349.08, 349.16, 347.27, 347.76, 346.53, 344.03, 346.46, 341.36, 340.62, 334.5, 343.11, 340.14, 339.75, 338.71, 342.89, 344.64, 342.69, 348.96, 346.82, 339.2, 337.23], '6M': [335.8, 334.27, 337.49, 343.84, 336.66, 351.44, 368.69, 363.27, 351.09, 360.07, 347.64, 348.98, 364.78, 363.49, 351.52, 345.78, 346.76, 351.39, 340.76, 332.14, 312.53, 349.08, 344.03, 343.11, 344.64, 337.23], '1Y': [275.71, 277.31, 279.29, 281.05, 294.38, 299.96, 300, 297.6, 314.7, 313.76, 314.01, 316.4, 322.18, 322.81, 323.05, 325.28, 323.62, 340.75, 346.44, 332.04, 340.69, 346.68, 343.47, 352.42, 341.29, 341.07, 338.08, 342.23, 336.41, 345.39, 343.4, 353.89, 368.69, 363.27, 351.09, 360.07, 347.64, 348.98, 364.78, 361.98, 354.36, 347.37, 340.79, 348.43, 339.88, 332.14, 312.53, 349.08, 344.03, 343.11, 344.64, 337.23] },
      velocityScore: { '1D': 0.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$91B', pe: 21.2, revenueGrowth: 10, eps: 15.87, grossMargin: 15, dividendYield: 1.8,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 5.16, BILT: false },
      tonyNote: 'GENERAL DYNAMICS CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 5.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ATI', name: 'ATI', easyScore: 1, avgWeight: 5.01, proScore: 2.24, coverage: 0.2,
      price: 178.98, weeklyPrices: [169.84, 170.53, 175.16, 178.98, 178.98], weeklyChange: 5.38, sortRank: 0, periodReturns: { '1M': 15.3, '6M': 81.4, '1Y': 121.6 },
      priceHistory: { '1W': [169.84, 170.53, 175.16, 178.98, 178.98], '1M': [153.89, 155.35, 165.08, 162.66, 158.39, 161.16, 161.01, 164.83, 162.57, 154.22, 149.62, 150.44, 153.73, 160.41, 162.29, 168.76, 169.84, 170.53, 175.16, 178.98, 178.98], '6M': [98.66, 99.42, 108.66, 116.21, 114.76, 118.59, 125.39, 123.55, 120.3, 133.57, 143.93, 159.27, 166.42, 150.09, 141.97, 141.8, 140.43, 147.96, 163.78, 164.06, 153.45, 153.89, 161.16, 149.62, 168.76, 178.98], '1Y': [80.77, 84.58, 85.16, 84.12, 83.89, 87.8, 89.78, 92.46, 94.11, 74.47, 75.48, 72.05, 76.48, 76.51, 76.39, 78.44, 77.01, 83.01, 83.93, 83.32, 84.32, 98.53, 96.02, 97.91, 98.18, 99.29, 98.37, 104.73, 107.89, 116.64, 119.2, 122.3, 125.39, 123.55, 120.3, 133.57, 143.93, 159.27, 166.42, 156.7, 147.48, 146.38, 135.5, 147.28, 163.03, 164.06, 153.45, 153.89, 161.16, 149.62, 168.76, 178.98] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$24B', pe: 59.3, revenueGrowth: 1, eps: 3.02, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: 5.01, IDEF: false, BILT: false },
      tonyNote: 'ATI appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 5.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PL', name: 'Planet Labs PBC', easyScore: 2, avgWeight: 3.51, proScore: 2.22, coverage: 0.4,
      price: 47.65, weeklyPrices: [50.48, 51.40, 51.14, 46.46, 47.65], weeklyChange: -5.61, sortRank: 0, periodReturns: { '1M': 29.1, '6M': 304.8, '1Y': 1157.2 },
      priceHistory: { '1W': [50.48, 51.4, 51.14, 46.46, 47.65], '1M': [38.54, 37.13, 39.69, 35.24, 39.04, 41.84, 40.68, 40.74, 43.04, 41.62, 41.61, 41.59, 42.66, 42.48, 44.35, 48.32, 50.48, 51.4, 51.14, 46.46, 47.65], '6M': [11.77, 12.84, 17.88, 20.73, 19.72, 22.44, 28.28, 26.94, 24.97, 22.26, 22.42, 23.78, 26.36, 25.28, 24.79, 33.83, 30.86, 35.02, 34.32, 37.5, 35.45, 38.54, 41.84, 41.61, 48.32, 47.65], '1Y': [3.79, 5.83, 5.34, 5.57, 6.16, 6.85, 6.45, 6.6, 6.19, 6.39, 6.65, 6.38, 6.98, 6.44, 8.97, 10.23, 11.93, 13.77, 15.6, 15.09, 12.91, 12.84, 12.7, 12.47, 11.45, 11.73, 12.01, 12.94, 16.47, 20.32, 20.41, 22.71, 28.28, 26.94, 24.97, 22.26, 22.42, 23.78, 26.36, 25.82, 24.6, 33.82, 27.89, 35.17, 33.93, 37.5, 35.45, 38.54, 41.84, 41.61, 48.32, 47.65] },
      velocityScore: { '1D': -6.3, '1W': -36.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$17B', pe: null, revenueGrowth: 41, eps: -0.8, grossMargin: 56, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 5.13, RSHO: false, IDEF: 1.89, BILT: false },
      tonyNote: 'Planet Labs is a satellite earth observation company. It holds a speculative position in Industrials ETFs as a data infrastructure name — providing satellite imagery and analytics that support agricultural, energy, and government decision-making. Revenue is growing from a small base; the ETF weight is minimal and the position is thematic.',
    },
    {
      ticker: 'LIN', name: 'LIN', easyScore: 1, avgWeight: 4.88, proScore: 2.18, coverage: 0.2,
      price: 497.71, weeklyPrices: [507.87, 501.98, 497.69, 497.41, 497.71], weeklyChange: -2, sortRank: 0, periodReturns: { '1M': -2, '6M': 21.8, '1Y': 7.1 },
      priceHistory: { '1W': [507.87, 501.98, 497.69, 497.41, 497.71], '1M': [493.55, 500.29, 501.87, 493.85, 493.16, 504.4, 503.87, 513.26, 511.65, 506.11, 510.86, 506.07, 506.63, 514.51, 517.58, 514.97, 507.87, 501.98, 497.69, 497.41, 497.71], '6M': [408.79, 390.38, 423.51, 425.1, 426.39, 439.69, 440.04, 451.57, 456.97, 448.24, 481, 498.19, 509.34, 484.74, 493.92, 488.15, 491.12, 499.47, 508.87, 498.15, 510.75, 493.55, 504.4, 510.86, 514.97, 497.71], '1Y': [464.57, 472.17, 466.6, 463.16, 476.75, 471.27, 459.67, 472.02, 471.51, 469.84, 473.23, 479.92, 481.92, 471.78, 472.7, 479.86, 474.13, 466.81, 467.83, 451.42, 450.08, 442.72, 417.94, 426.65, 414.72, 407.85, 409.15, 392.68, 422.34, 424.9, 429.11, 444.08, 440.04, 451.57, 456.97, 448.24, 481, 498.19, 509.34, 483.62, 497.41, 478.05, 499.26, 494.59, 499.65, 498.15, 510.75, 493.55, 504.4, 510.86, 514.97, 497.71] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$230B', pe: 33, revenueGrowth: 8, eps: 15.07, grossMargin: 49, dividendYield: 1.29,
      etfPresence: { AIRR: false, PRN: false, RSHO: 4.88, IDEF: false, BILT: false },
      tonyNote: 'LIN appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 4.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.39, proScore: 2.14, coverage: 0.4,
      price: 303.81, weeklyPrices: [312.65, 308.53, 303.81, 300.98, 303.81], weeklyChange: -2.83, sortRank: 0, periodReturns: { '1M': 0.3, '6M': 18.1, '1Y': 35.3 },
      priceHistory: { '1W': [312.65, 308.53, 303.81, 300.98, 303.81], '1M': [303.99, 305.48, 315.39, 310.37, 308.87, 310.55, 313.7, 310.87, 315.72, 307.17, 305.22, 302.64, 306.25, 305.66, 307.1, 311.33, 312.65, 308.53, 303.81, 300.98, 303.81], '6M': [257.32, 257.3, 258.47, 263.58, 256.77, 264.62, 282.47, 280.14, 260.41, 291.74, 279.84, 278.74, 283.54, 267.78, 255.65, 253.77, 260.67, 269.55, 293.26, 293.92, 298.1, 303.99, 310.55, 305.22, 311.33, 303.81], '1Y': [224.57, 233.17, 230.06, 234.89, 242.14, 251.4, 255.52, 264.89, 272.4, 269.28, 270.68, 262.92, 266.99, 261.53, 263.45, 259.5, 259.37, 257.98, 255.19, 247.97, 258.78, 258.03, 256.47, 255.53, 242.61, 255.78, 260.88, 264.32, 256.73, 264.33, 259.63, 272.25, 282.47, 280.14, 260.41, 291.74, 279.84, 278.74, 283.54, 267.57, 256.83, 262.23, 258.01, 272.54, 292.01, 293.92, 298.1, 303.99, 310.55, 305.22, 311.33, 303.81] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 28.7, revenueGrowth: 7, eps: 10.59, grossMargin: 30, dividendYield: 0.68,
      etfPresence: { AIRR: 1.67, PRN: false, RSHO: 5.11, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BA', name: 'BOEING', easyScore: 1, avgWeight: 4.69, proScore: 2.1, coverage: 0.2,
      price: 223.31, weeklyPrices: [224.30, 228.78, 231.15, 224.30, 223.31], weeklyChange: -0.44, sortRank: 0, periodReturns: { '1M': -1.8, '6M': 8.7, '1Y': 5.6 },
      priceHistory: { '1W': [224.3, 228.78, 231.15, 224.3, 223.31], '1M': [221.3, 224.38, 229.93, 231.03, 237.36, 238.21, 236.87, 240.6, 229.21, 220.49, 220.61, 215.01, 222.2, 219.61, 219.02, 218.9, 224.3, 228.78, 231.15, 224.3, 223.31], '6M': [205.38, 200.37, 206.71, 216.85, 217.12, 227.38, 247.74, 252.15, 233.72, 243.03, 242.96, 230.44, 229.74, 231.11, 209.89, 195.12, 190.52, 212.3, 222.14, 225.08, 231.33, 221.3, 238.21, 220.61, 218.9, 223.31], '1Y': [211.47, 217.51, 201.7, 200.94, 209.79, 226.6, 229.9, 228.48, 226.08, 224.86, 232.61, 225, 234.83, 232.38, 227.52, 214.63, 215.1, 215.2, 225.32, 214, 217.26, 223.33, 198.05, 195.21, 189.63, 182.44, 202.54, 198.72, 206.33, 218.16, 227.77, 234.53, 247.74, 252.15, 233.72, 243.03, 242.96, 230.44, 229.74, 225, 213.47, 198.41, 189.21, 210, 223.77, 225.08, 231.33, 221.3, 238.21, 220.61, 218.9, 223.31] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$176B', pe: 88.3, revenueGrowth: 14, eps: 2.53, grossMargin: 5, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 4.69, BILT: false },
      tonyNote: 'BOEING appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 4.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 3, avgWeight: 4.62, proScore: 4.62, coverage: 1,
      price: 112.2, weeklyPrices: [129.60, 133.09, 113.41, 105.65, 112.20], weeklyChange: -13.43, sortRank: 0, periodReturns: { '1M': 58.3, '6M': 97.2, '1Y': 364.6 },
      priceHistory: { '1W': [129.6, 133.09, 113.41, 105.65, 112.2], '1M': [68.43, 63.87, 70.68, 65.35, 75.05, 82.55, 72.96, 74.81, 83.01, 83.67, 86.83, 88.1, 89.58, 96.23, 105.86, 119.7, 129.6, 133.09, 113.41, 105.65, 112.2], '6M': [56.89, 72.84, 68.37, 85.67, 72.63, 90.56, 101.25, 113.57, 111.21, 101.79, 82.51, 83.9, 86.92, 89.47, 86.34, 89.93, 78.67, 94.81, 98.97, 81, 77.2, 68.43, 82.55, 86.83, 119.7, 112.2], '1Y': [24.15, 34.82, 41.91, 53.22, 45.11, 42.5, 52.63, 57.09, 53.09, 52.57, 49.76, 44.95, 50.43, 45.22, 37.58, 41.19, 54.5, 56.94, 81.2, 95.69, 78.61, 77.77, 70.05, 67.89, 58.22, 55.51, 61.44, 79.05, 61.86, 78.05, 83.47, 97.67, 101.25, 113.57, 111.21, 101.79, 82.51, 83.9, 86.92, 89.76, 89.11, 88.42, 73.82, 92.57, 88.57, 81, 77.2, 68.43, 82.55, 86.83, 119.7, 112.2] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$44B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 4.51, MEME: 5.91, RKNG: 3.44 },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 5.53, proScore: 4.51, coverage: 0.667,
      price: 1711.66, weeklyPrices: [1589.94, 1641.64, 1694.98, 1761.43, 1711.66], weeklyChange: 7.66, sortRank: 0, periodReturns: { '1M': 44.2, '6M': 733.5, '1Y': 4485.2 },
      priceHistory: { '1W': [1589.94, 1641.64, 1694.98, 1761.43, 1711.66], '1M': [1255.86, 1406.32, 1409.98, 1339.96, 1562.34, 1547.56, 1452.02, 1447.23, 1382.72, 1407.61, 1333.01, 1383.29, 1392.56, 1542.24, 1478.69, 1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1711.66], '6M': [205.35, 219.46, 209.31, 244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1333.01, 1589.55, 1711.66], '1Y': [37.33, 41.82, 44.21, 47.34, 44.96, 46.2, 41.36, 41.36, 42.93, 41.93, 46.83, 44.58, 47.35, 53.01, 73.92, 93.97, 99.83, 121.12, 131.88, 144.3, 149.29, 175.53, 194.57, 271.58, 244.93, 220.5, 194.38, 232.86, 206.83, 250.08, 275.24, 377.41, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 913.02, 1070.2, 1255.86, 1547.56, 1333.01, 1589.55, 1711.66] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$253B', pe: 58.5, revenueGrowth: 251, eps: 29.24, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.5, RKNG: 5.55 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 2, avgWeight: 5.33, proScore: 4.36, coverage: 0.667,
      price: 198.59, weeklyPrices: [179.83, 169.02, 158.41, 185.67, 198.59], weeklyChange: 10.43, sortRank: 0, periodReturns: { '1M': 8.2, '6M': 663.2, '1Y': 1180 },
      priceHistory: { '1W': [179.83, 169.02, 158.41, 185.67, 198.59], '1M': [172.98, 180.57, 178.54, 157.55, 148.94, 184.9, 188.28, 223.1, 203.57, 190.36, 173.26, 171.33, 165.26, 176.81, 181.49, 177.62, 179.83, 169.02, 158.41, 185.67, 198.59], '6M': [26.02, 30.38, 28.96, 40.64, 34.86, 33.01, 37, 35.72, 43.61, 44.3, 44.46, 53.96, 102.51, 95.58, 96.81, 87.54, 98.21, 107.45, 153.19, 163.47, 145.78, 172.98, 184.9, 173.26, 177.62, 198.59], '1Y': [15.52, 16.87, 17.09, 23.29, 25.35, 27.92, 28.99, 26.35, 24.11, 21.42, 22.79, 22.77, 25.07, 23.02, 27.72, 29.47, 26.69, 28.42, 32.22, 32.95, 33.4, 36.87, 29.5, 23.75, 20.89, 22.73, 25.65, 34.98, 27.14, 41, 39.6, 34.04, 37, 35.72, 43.61, 44.3, 44.46, 53.96, 102.51, 110.62, 94.07, 95.76, 85.19, 117.64, 146.39, 163.47, 145.78, 172.98, 184.9, 173.26, 177.62, 198.59] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$16B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.8, RKNG: 3.87 },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 4.26, proScore: 4.26, coverage: 1,
      price: 273.13, weeklyPrices: [208.37, 226.34, 231.09, 264.51, 273.13], weeklyChange: 31.08, sortRank: 0, periodReturns: { '1M': 76.8, '6M': 183.2, '1Y': 658.3 },
      priceHistory: { '1W': [208.37, 226.34, 231.09, 264.51, 273.13], '1M': [176.42, 175.92, 195.09, 184.77, 177.05, 186.1, 179.11, 207.27, 221.15, 219.94, 199.86, 197.73, 191.82, 219.93, 214.77, 208.06, 208.37, 226.34, 231.09, 264.51, 273.13], '6M': [96.45, 96.41, 80.95, 90.03, 83.71, 97.3, 103.89, 94.5, 85.19, 86.1, 98.01, 100.61, 91.01, 89.33, 112.95, 117.62, 100.82, 112.54, 154.56, 159.16, 144.96, 176.42, 186.1, 199.86, 208.06, 273.13], '1Y': [36.02, 52.58, 50.46, 51.02, 50.31, 46.05, 53.31, 51.01, 50.4, 55.17, 75.33, 67.19, 70.48, 65.65, 93.39, 94.08, 113.23, 115.61, 122, 125.83, 104.28, 121.83, 110.54, 102.22, 90.54, 88.88, 98.92, 93.59, 75.45, 91.13, 89.95, 97.93, 103.89, 94.5, 85.19, 86.1, 98.01, 100.61, 91.01, 94.94, 129.85, 114.15, 92.26, 117.4, 161.94, 159.16, 144.96, 176.42, 186.1, 199.86, 208.06, 273.13] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$69B', pe: 105.5, revenueGrowth: 684, eps: 2.59, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 2.87, MEME: 5.45, RKNG: 4.47 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'RDW', name: 'Redwire', easyScore: 1, avgWeight: 7.36, proScore: 4.25, coverage: 0.333,
      price: 20.55, weeklyPrices: [24.00, 25.90, 24.57, 20.68, 20.55], weeklyChange: -14.37, sortRank: 0, periodReturns: { '1M': 120, '6M': 293.7, '1Y': 47.5 },
      priceHistory: { '1W': [24, 25.9, 24.57, 20.68, 20.55], '1M': [8.64, 8.69, 9.64, 9.2, 11.07, 12.16, 11.56, 11.46, 13.99, 14.06, 13.96, 13.91, 14.77, 15.35, 17.49, 22.04, 24, 25.9, 24.57, 20.68, 20.55], '6M': [5.22, 7.29, 6.59, 8.01, 7.6, 10.28, 10.86, 12.52, 11.75, 10.04, 8.02, 8.12, 9.52, 8.55, 9.59, 9.2, 8.16, 9.91, 9.99, 10.21, 9.33, 8.64, 12.16, 13.96, 22.04, 20.55], '1Y': [13.93, 19.96, 20.57, 16.53, 15.31, 15.78, 17.5, 16.36, 14.46, 14.71, 9.42, 8.84, 9.29, 8.32, 8.23, 7.87, 9.35, 9.16, 9.79, 8.94, 7.97, 7.85, 6.95, 6.13, 5.43, 5.41, 5.57, 7.48, 6.44, 7.82, 9.03, 10.98, 10.86, 12.52, 11.75, 10.04, 8.02, 8.12, 9.52, 9.65, 9.54, 9.38, 7.71, 9.65, 9.81, 10.21, 9.33, 8.64, 12.16, 13.96, 22.04, 20.55] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: null, revenueGrowth: 58, eps: -2.59, grossMargin: 13, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 7.36, RKNG: false },
      tonyNote: 'Redwire Corp is a space infrastructure company — solar arrays, structures, and manufacturing in orbit. It appears in Meme and speculative ETFs as a high-risk space economy play. Revenue is growing from a small base but the business is pre-profitability; the ETF weight is minimal and reflects thematic positioning rather than fundamental conviction.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab', easyScore: 3, avgWeight: 4.14, proScore: 4.14, coverage: 1,
      price: 123.8, weeklyPrices: [150.23, 148.03, 143.48, 122.39, 123.80], weeklyChange: -17.59, sortRank: 0, periodReturns: { '1M': 57.1, '6M': 195.5, '1Y': 365.4 },
      priceHistory: { '1W': [150.23, 148.03, 143.48, 122.39, 123.8], '1M': [80.31, 78.76, 84.65, 78.58, 105.47, 117.35, 117.56, 124.15, 132.55, 124.77, 131.16, 127.31, 134.28, 125.45, 135.76, 143.2, 150.23, 148.03, 143.48, 122.39, 123.8], '6M': [41.9, 53.43, 55.49, 77.18, 69.76, 83.08, 90.76, 88.9, 80.07, 72.32, 67.44, 70.21, 70.97, 70.11, 68.41, 67.23, 60.93, 67.67, 70.62, 89.46, 82.29, 80.31, 117.35, 131.16, 143.2, 123.8], '1Y': [26.6, 29.64, 26.55, 33.46, 34.33, 39.14, 47.69, 46.88, 43.79, 44.75, 43.43, 40.92, 48.13, 43.53, 46.17, 48.08, 48.69, 47.97, 65.31, 69.27, 65.4, 63.75, 56.57, 51.24, 42.78, 42.6, 44.72, 57.52, 53.96, 77.18, 75.99, 84.85, 90.76, 88.9, 80.07, 72.32, 67.44, 70.21, 70.97, 71.48, 71.31, 68, 57.38, 66.32, 72.22, 89.46, 82.29, 80.31, 117.35, 131.16, 143.2, 123.8] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$72B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 2.41, MEME: 5.19, RKNG: 4.83 },
      tonyNote: 'Rocket Lab is the small-launch and space systems name that Electrification and AI infrastructure ETFs hold for satellite connectivity exposure — relevant to both GPS-dependent grids and low-orbit broadband that supports remote AI compute. Small market cap, no earnings, but consistent revenue growth and a rapidly expanding backlog.',
    },
    {
      ticker: 'NVTS', name: 'Navitas Semiconductor', easyScore: 2, avgWeight: 5.02, proScore: 4.1, coverage: 0.667,
      price: 25.54, weeklyPrices: [28.88, 28.51, 26.60, 24.86, 25.54], weeklyChange: -11.58, sortRank: 0, periodReturns: { '1M': 46.3, '6M': 206.9, '1Y': 362.6 },
      priceHistory: { '1W': [28.88, 28.51, 26.6, 24.86, 25.54], '1M': [15.92, 17.55, 16.68, 15.79, 18.2, 22.65, 19.25, 21.17, 22.32, 21.32, 19.67, 19.43, 22.99, 24.38, 29.25, 31.79, 28.88, 28.51, 26.6, 24.86, 25.54], '6M': [8.32, 9.17, 7.83, 7.66, 7.14, 10.06, 10, 10.17, 8.58, 8.86, 8.3, 8.12, 9.55, 8.2, 10.1, 8.75, 8.28, 8.84, 9.82, 13.2, 18.3, 15.92, 22.65, 19.67, 31.79, 25.54], '1Y': [5.52, 7.3, 7.19, 7.35, 6.27, 6.43, 6.15, 8.62, 7.52, 6.77, 6.96, 6.43, 6.09, 5.73, 5.64, 6.46, 6.86, 7.3, 7.74, 15.16, 15.03, 12.83, 10.46, 9.12, 7.78, 8.03, 8.69, 9.12, 7.38, 7.66, 8.38, 10.07, 10, 10.17, 8.58, 8.86, 8.3, 8.12, 9.55, 8.38, 10.49, 9.18, 7.83, 8.57, 9.87, 13.2, 18.3, 15.92, 22.65, 19.67, 31.79, 25.54] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.78, RKNG: 6.27 },
      tonyNote: 'Navitas Semiconductor is a small-cap wide-bandgap power semiconductor name — gallium nitride and silicon carbide for fast charging and EV applications. The $26.60 share price and small market cap position it as a speculative holding in ETFs willing to take higher-risk bets on next-generation power conversion.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 4.99, proScore: 4.07, coverage: 0.667,
      price: 293.97, weeklyPrices: [293.80, 290.01, 285.00, 273.51, 293.97], weeklyChange: 0.06, sortRank: 0, periodReturns: { '1M': 1.2, '6M': 180, '1Y': 1508.2 },
      priceHistory: { '1W': [293.8, 290.01, 285, 273.51, 293.97], '1M': [288.64, 295.25, 285.47, 258.64, 261.03, 283.92, 280.69, 289.76, 303.41, 275.95, 258.71, 261.34, 282.31, 307.88, 302.49, 302.4, 293.8, 290.01, 285, 273.51, 293.97], '6M': [105, 109.44, 87.61, 91.43, 86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 160.28, 166, 135.19, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 288.64, 283.92, 258.71, 302.4, 293.97], '1Y': [18.28, 21.43, 22.91, 22.95, 22.13, 28.71, 24.69, 25.93, 34.75, 37.61, 41.25, 43.1, 49.94, 52.45, 62.96, 79.67, 69.18, 90.19, 87.58, 116.58, 104.38, 113.28, 129.05, 127.07, 104.97, 94.29, 102.5, 101.29, 76.97, 91.88, 98.69, 134.07, 139.17, 144.89, 151.37, 143.03, 139.74, 160.28, 166, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 218.27, 234.68, 288.64, 283.92, 258.71, 302.4, 293.97] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$84B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.82, RKNG: 4.16 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 3, avgWeight: 4.06, proScore: 4.06, coverage: 1,
      price: 66.14, weeklyPrices: [67.84, 64.05, 63.54, 65.33, 66.14], weeklyChange: -2.51, sortRank: 0, periodReturns: { '1M': 44.9, '6M': 60.8, '1Y': 657.6 },
      priceHistory: { '1W': [67.84, 64.05, 63.54, 65.33, 66.14], '1M': [49.48, 54.74, 60.98, 56.85, 61.2, 55.15, 56.56, 55.17, 58.4, 52.94, 50.46, 47.74, 52.71, 58.06, 56.83, 59.78, 67.84, 64.05, 63.54, 65.33, 66.14], '6M': [41.12, 46.84, 36.59, 42.07, 37.77, 45.68, 51.89, 56.68, 53.74, 41.83, 42.22, 42.36, 41.39, 36.7, 41.58, 41.29, 35.09, 35.13, 43.07, 48.72, 48.36, 49.48, 55.15, 50.46, 59.78, 66.14], '1Y': [8.73, 10.34, 10.4, 11.54, 15.23, 16.96, 17.31, 18.59, 15.79, 16.45, 17.83, 18.73, 22.99, 28.21, 33.63, 37.9, 47.14, 47.08, 60.09, 67.98, 55.19, 62.42, 66.63, 57.38, 48.85, 47.47, 43.96, 43.92, 33.78, 41.98, 42.7, 46.03, 51.89, 56.68, 53.74, 41.83, 42.22, 42.36, 41.39, 38.84, 44.94, 42.16, 31.62, 35.74, 47.37, 48.72, 48.36, 49.48, 55.15, 50.46, 59.78, 66.14] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$24B', pe: 85.9, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 3.08, MEME: 5.68, RKNG: 3.43 },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 3, avgWeight: 3.95, proScore: 3.95, coverage: 1,
      price: 48.92, weeklyPrices: [48.98, 49.65, 47.28, 47.94, 48.92], weeklyChange: -0.12, sortRank: 0, periodReturns: { '1M': 45.8, '6M': 74.4, '1Y': 382.4 },
      priceHistory: { '1W': [48.98, 49.65, 47.28, 47.94, 48.92], '1M': [35.63, 39.88, 44.24, 41.53, 41.25, 44.59, 43.93, 45.48, 46.71, 42.56, 39.14, 36.62, 39.52, 48.02, 45.87, 45.14, 48.98, 49.65, 47.28, 47.94, 48.92], '6M': [28.05, 32.77, 24.24, 26.08, 24.52, 31.94, 35.22, 37.69, 33.88, 34.95, 35.28, 30, 27.93, 25.14, 27.05, 25.93, 23.76, 25.19, 27.6, 32.19, 33.67, 35.63, 44.59, 39.14, 45.14, 48.92], '1Y': [10.14, 13.02, 11.55, 10.32, 9.76, 9.51, 10.06, 10.95, 10.12, 14.89, 14.97, 15.34, 16.47, 14.38, 16.98, 19.83, 23.45, 25, 27.94, 37.76, 32.54, 34.33, 31.06, 28.57, 22.84, 23.74, 29.36, 30.99, 22, 25.72, 28.11, 37.68, 35.22, 37.69, 33.88, 34.95, 35.28, 30, 27.93, 27.03, 27.71, 27.26, 20.55, 25.18, 31.47, 32.19, 33.67, 35.63, 44.59, 39.14, 45.14, 48.92] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$14B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.57, MEME: 5.21, RKNG: 4.08 },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'LUNR', name: 'Intuitive Machines', easyScore: 1, avgWeight: 6.36, proScore: 3.67, coverage: 0.333,
      price: 38.63, weeklyPrices: [40.34, 45.70, 43.83, 38.21, 38.63], weeklyChange: -4.24, sortRank: 0, periodReturns: { '1M': 50.8, '6M': 310.1, '1Y': 250.9 },
      priceHistory: { '1W': [40.34, 45.7, 43.83, 38.21, 38.63], '1M': [25.35, 24.8, 26.33, 24.11, 28.97, 32.42, 32.09, 35.68, 36.52, 33.89, 33.59, 32.46, 33.67, 34.24, 38.26, 34.86, 40.34, 45.7, 43.83, 38.21, 38.63], '6M': [9.42, 11.66, 10.78, 16.51, 16.23, 19.63, 19.5, 20.03, 18.99, 17.52, 16.13, 18.14, 17.99, 17.63, 17.6, 17.83, 17.52, 22.92, 24.41, 27.52, 26.2, 25.35, 32.42, 33.59, 34.86, 38.63], '1Y': [11.01, 11.79, 10.84, 10.34, 10.65, 10.86, 11.22, 11.28, 11.75, 11.47, 10.46, 8.69, 8.91, 8.46, 8.3, 9.28, 9.99, 10.61, 12.48, 12.88, 12.68, 12.35, 10.4, 9.44, 9.22, 9.39, 10.2, 11.83, 10.21, 16.71, 17.88, 18.56, 19.5, 20.03, 18.99, 17.52, 16.13, 18.14, 17.99, 18.08, 17.69, 20.31, 16.35, 22.73, 23.67, 27.52, 26.2, 25.35, 32.42, 33.59, 34.86, 38.63] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: null, revenueGrowth: 199, eps: -0.87, grossMargin: 10, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.36, RKNG: false },
      tonyNote: 'Intuitive Machines is a lunar services company — it landed the first U.S. spacecraft on the Moon since 1972 in early 2024. It appears in Meme ETFs for the narrative value as much as the commercial contract pipeline. Revenue is growing via NASA contracts but the business is small and pre-profit; the ETF weight is speculative.',
    },
    {
      ticker: 'ONDS', name: 'Ondas Holdings', easyScore: 2, avgWeight: 4.27, proScore: 3.49, coverage: 0.667,
      price: 13.63, weeklyPrices: [10.80, 13.25, 13.22, 13.46, 13.63], weeklyChange: 26.16, sortRank: 0, periodReturns: { '1M': 32, '6M': 68.8, '1Y': 826.9 },
      priceHistory: { '1W': [10.8, 13.25, 13.22, 13.46, 13.63], '1M': [9.73, 9.33, 9.34, 8.89, 9.06, 9.42, 9.04, 8.86, 11.21, 10.62, 9.7, 9.13, 9.36, 9.18, 9.06, 9.77, 10.8, 13.25, 13.22, 13.46, 13.63], '6M': [8.07, 9.23, 8.09, 8.96, 9.76, 14.01, 12.82, 12.17, 10.36, 9.69, 9.31, 10.19, 10.67, 9.83, 10.16, 10.06, 8.8, 9.52, 9.47, 10.73, 10.95, 9.73, 9.42, 9.7, 9.77, 13.63], '1Y': [1.47, 1.68, 1.69, 1.59, 1.96, 1.84, 2.4, 2.1, 1.82, 3.07, 4.29, 3.59, 4.97, 5.03, 5.56, 6.1, 7.35, 7.31, 11.26, 9.51, 7.19, 6.79, 5.96, 5.8, 7.84, 8.44, 8.92, 8.32, 7.37, 9.13, 11.02, 13.69, 12.82, 12.17, 10.36, 9.69, 9.31, 10.19, 10.67, 9.72, 10.53, 10.9, 8.15, 9.53, 9.4, 10.73, 10.95, 9.73, 9.42, 9.7, 9.77, 13.63] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: 151.4, revenueGrowth: 1080, eps: 0.09, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.64, RKNG: 2.9 },
      tonyNote: 'Ondas Holdings is a small-cap industrial automation and drone company. It appears in Meme ETFs on the autonomous systems and drone delivery narrative. Revenue is minimal and the path to profitability is unclear; the ETF allocation is speculative and reflects retail interest in autonomous systems themes.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 2, avgWeight: 4.11, proScore: 3.36, coverage: 0.667,
      price: 1024.76, weeklyPrices: [928.41, 923.52, 971.00, 1035.50, 1024.76], weeklyChange: 10.38, sortRank: 0, periodReturns: { '1M': 89, '6M': 327.9, '1Y': 943.8 },
      priceHistory: { '1W': [928.41, 923.52, 971, 1035.5, 1024.76], '1M': [576.45, 640.2, 666.59, 646.63, 746.81, 795.33, 766.58, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1024.76], '6M': [239.49, 252.42, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 895.88, 1024.76], '1Y': [98.18, 110.95, 119.84, 127.91, 120.89, 122.24, 116.43, 109.22, 111.96, 109.06, 127.75, 122.05, 116.5, 118.72, 140, 159.99, 161.71, 182.15, 196.54, 191.94, 202.29, 221.91, 218.03, 241.11, 228.5, 224.53, 234.16, 263.71, 225.52, 286.68, 315.42, 345.09, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 448.42, 524.56, 576.45, 795.33, 681.54, 895.88, 1024.76] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 48.3, revenueGrowth: 196, eps: 21.23, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { BUZZ: 3.35, MEME: false, RKNG: 4.87 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'QBTS', name: 'D-Wave Quantum', easyScore: 1, avgWeight: 5.7, proScore: 3.29, coverage: 0.333,
      price: 30.48, weeklyPrices: [27.48, 29.49, 30.14, 29.18, 30.48], weeklyChange: 10.94, sortRank: 0, periodReturns: { '1M': 48.8, '6M': 35.5, '1Y': 78.2 },
      priceHistory: { '1W': [27.48, 29.49, 30.14, 29.18, 30.48], '1M': [20.92, 21.54, 23.83, 21.99, 22.57, 24.03, 22.35, 21.44, 22.13, 20.35, 19.06, 18.19, 19.3, 25.74, 29.4, 27.82, 27.48, 29.49, 30.14, 29.18, 30.48], '6M': [22.5, 28.33, 25.52, 29.12, 26.15, 29.28, 28.72, 25.63, 21.22, 20.72, 19.67, 18.05, 18.94, 18.59, 17.55, 15.73, 13.9, 14.14, 14.65, 21.66, 18.8, 20.92, 24.03, 19.06, 27.82, 30.48], '1Y': [17.11, 17.95, 16, 14.97, 14.82, 16.39, 16.91, 17.59, 17.67, 18.3, 18.51, 15.32, 15.45, 15.3, 16.04, 22.54, 27.72, 25.63, 34.25, 44.78, 32.19, 32, 29.74, 28.99, 22.93, 22.59, 25.08, 26.8, 23.8, 27.52, 28.13, 28.11, 28.72, 25.63, 21.22, 20.72, 19.67, 18.05, 18.94, 19.04, 17.46, 16.31, 12.98, 13.74, 16.97, 21.66, 18.8, 20.92, 24.03, 19.06, 27.82, 30.48] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: null, revenueGrowth: -81, eps: -1.14, grossMargin: 66, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.7, RKNG: false },
      tonyNote: 'D-Wave Quantum is a quantum computing company — the only publicly traded business built around quantum annealing hardware. Revenue is minimal and profitability is many years away, but it holds a position in Meme ETFs as the purest-play quantum computing stock available to retail investors. The ETF weight is small and the position is purely thematic.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 2, avgWeight: 3.85, proScore: 3.14, coverage: 0.667,
      price: 71.07, weeklyPrices: [65.40, 70.14, 72.07, 69.28, 71.07], weeklyChange: 8.67, sortRank: 0, periodReturns: { '1M': 53.8, '6M': 51.4, '1Y': 75.2 },
      priceHistory: { '1W': [65.4, 70.14, 72.07, 69.28, 71.07], '1M': [45.75, 48, 52.57, 47.68, 49.24, 56.89, 55.87, 55.26, 57.47, 51.95, 49.31, 48.44, 52.47, 58.89, 63.64, 63.62, 65.4, 70.14, 72.07, 69.28, 71.07], '6M': [46.93, 54.44, 49.67, 51.39, 44.87, 50.45, 47.56, 47.25, 39.98, 34.99, 34.11, 30.78, 38.34, 35.73, 32.98, 31.2, 27.51, 29.24, 29.76, 48.32, 43.84, 45.75, 56.89, 49.31, 63.62, 71.07], '1Y': [40.57, 40.06, 38.43, 40.86, 40.1, 45.56, 43.54, 41.94, 40.53, 42.02, 43, 36.8, 40.75, 40.97, 43.86, 65.44, 73.86, 63.09, 74.3, 72.41, 59.5, 57.15, 53.38, 54.42, 49.12, 47.06, 48.65, 51.67, 45.85, 49.82, 46.77, 49.45, 47.56, 47.25, 39.98, 34.99, 34.11, 30.78, 38.34, 35.87, 33.29, 33.11, 26.59, 28.49, 35.76, 48.32, 43.84, 45.75, 56.89, 49.31, 63.62, 71.07] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 182.2, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: 2.1, MEME: 5.6, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'TE', name: 'T1 Energy', easyScore: 1, avgWeight: 5.06, proScore: 2.92, coverage: 0.333,
      price: 10.82, weeklyPrices: [10.96, 10.82, 10.56, 10.41, 10.82], weeklyChange: -1.28, sortRank: 0, periodReturns: { '1M': 110.1, '6M': 128.3, '1Y': 930.5 },
      priceHistory: { '1W': [10.96, 10.82, 10.56, 10.41, 10.82], '1M': [5.1, 5.34, 5.27, 5.15, 6.16, 6.04, 5.85, 5.61, 5.73, 5.67, 7, 6.88, 8.7, 8.72, 8.08, 10.45, 10.96, 10.82, 10.56, 10.41, 10.82], '6M': [4.74, 6.73, 5.44, 7.11, 6.68, 6.81, 7.41, 8.5, 8.33, 8.27, 6.12, 6.29, 6.84, 6.72, 7.62, 6.6, 5.76, 4.05, 5.11, 4.98, 5.31, 5.1, 6.04, 7, 10.45, 10.82], '1Y': [1.05, 1.32, 1.51, 1.37, 1.25, 1.48, 1.39, 1.57, 1.34, 1.25, 1.25, 1.46, 1.61, 1.83, 1.87, 1.77, 2.2, 2.39, 2.93, 5.24, 4.48, 3.7, 3.68, 4.41, 3.06, 3.29, 4.52, 6.15, 5.42, 7.05, 7.84, 6.94, 7.41, 8.5, 8.33, 8.27, 6.12, 6.29, 6.84, 7.16, 7.72, 6.84, 5.62, 3.93, 4.86, 4.98, 5.31, 5.1, 6.04, 7, 10.45, 10.82] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3B', pe: null, revenueGrowth: 232, eps: -1.87, grossMargin: 8, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.06, RKNG: false },
      tonyNote: 'Tronox Holdings is a titanium dioxide producer — a commodity chemicals company that appears in some ETFs for its materials exposure. The small share price reflects commodity pricing pressure; this is a cyclical materials position rather than a technology or infrastructure allocation.',
    },
    {
      ticker: 'RGTI', name: 'RGTI', easyScore: 2, avgWeight: 3.54, proScore: 2.89, coverage: 0.667,
      price: 26.48, weeklyPrices: [24.62, 27.03, 25.54, 25.63, 26.48], weeklyChange: 7.55, sortRank: 0, periodReturns: { '1M': 51.3, '6M': 10.9, '1Y': 116 },
      priceHistory: { '1W': [24.62, 27.03, 25.54, 25.63, 26.48], '1M': [17.7, 18.27, 20.09, 18.34, 18.94, 20.51, 19.07, 18.42, 19.27, 17.85, 16.62, 15.96, 16.88, 22.04, 26.42, 25.07, 24.62, 27.03, 25.54, 25.63, 26.48], '6M': [23.88, 28.22, 23.96, 25.11, 22.15, 25.25, 24.7, 23.45, 18.17, 17.71, 16.09, 16.02, 17.69, 17.01, 16.17, 14.88, 13.32, 14.2, 15.13, 19.64, 16.91, 17.7, 20.51, 16.62, 25.07, 26.48], '1Y': [12.26, 11.32, 12.16, 11.5, 11.33, 13.51, 16.56, 15.43, 14.47, 16.47, 16.2, 15.16, 15.3, 15.04, 16.19, 21.99, 31.64, 29.85, 43.23, 56.34, 40, 37.07, 35.18, 31.4, 25.71, 26.08, 26.04, 26.12, 22.47, 24.51, 23.6, 24.72, 24.7, 23.45, 18.17, 17.71, 16.09, 16.02, 17.69, 17.6, 16.14, 15.88, 12.9, 13.84, 16.87, 19.64, 16.91, 17.7, 20.51, 16.62, 25.07, 26.48] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: 199, eps: -0.89, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.35, RKNG: 3.72 },
      tonyNote: 'Rigetti Computing is a quantum hardware company using superconducting qubit technology. It holds a position in Meme ETFs alongside IonQ and D-Wave as part of the quantum computing basket. Revenue is minimal, the technology is earlier-stage than IonQ, and the ETF allocation is speculative. The weight score is low; this is a high-risk, long-duration positioning.',
    },
    {
      ticker: 'AXTI', name: 'AXT Inc', easyScore: 1, avgWeight: 4.32, proScore: 2.49, coverage: 0.333,
      price: 116.8, weeklyPrices: [122.77, 115.70, 103.16, 109.55, 116.80], weeklyChange: -4.86, sortRank: 0, periodReturns: { '1M': 21.7, '6M': 893.2, '1Y': 7339.5 },
      priceHistory: { '1W': [122.77, 115.7, 103.16, 109.55, 116.8], '1M': [106, 107.55, 104.83, 108.42, 116.36, 125.81, 122.9, 121.94, 114.98, 123.78, 105.88, 112.88, 104.61, 121.02, 140.83, 132.6, 122.77, 115.7, 103.16, 109.55, 116.8], '6M': [11.76, 14.96, 13, 14.64, 16.35, 25.83, 25.72, 17.4, 18.54, 24.06, 24.24, 28.43, 46.32, 32.37, 48.86, 54.24, 60.63, 41.99, 66.45, 78.76, 70.15, 106, 125.81, 105.88, 132.6, 116.8], '1Y': [1.57, 1.83, 2.08, 2.02, 2.01, 2.54, 2.39, 2.35, 2.29, 2.05, 2.23, 2.14, 2.77, 3.08, 3.36, 3.94, 4.83, 4.91, 5.31, 4.59, 5.17, 6.6, 8.54, 10.56, 9.9, 9.23, 11.48, 15.51, 12.36, 15.01, 16.76, 22.99, 25.72, 17.4, 18.54, 24.06, 24.24, 28.43, 46.32, 38.56, 48.39, 64.44, 52.73, 45.46, 67.3, 78.76, 70.15, 106, 125.81, 105.88, 132.6, 116.8] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$8B', pe: null, revenueGrowth: 39, eps: -0.32, grossMargin: 21, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.32, RKNG: false },
      tonyNote: 'AXT Inc is a compound semiconductor substrate manufacturer — gallium arsenide, indium phosphide, and germanium wafers used in data center optical transceivers, 5G RF chips, and solar cells. Revenue is growing with optical networking demand. Small market cap but positioned at a genuine supply-chain chokepoint for III-V semiconductor materials.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 1, avgWeight: 4.31, proScore: 2.49, coverage: 0.333,
      price: 546.94, weeklyPrices: [530.60, 531.18, 531.21, 546.20, 546.94], weeklyChange: 3.08, sortRank: 0, periodReturns: { '1M': 26.7, '6M': 241.9, '1Y': 948 },
      priceHistory: { '1W': [530.6, 531.18, 531.21, 546.2, 546.94], '1M': [442.36, 465.26, 483.15, 463.91, 480, 515.83, 488.74, 494.09, 489.15, 482.02, 458.68, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 531.18, 531.21, 546.2, 546.94], '6M': [159.99, 169.54, 174.58, 178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 458.68, 524.65, 546.94], '1Y': [52.19, 57.02, 57.41, 62.07, 63.84, 64.64, 66.53, 67.06, 70.61, 75.84, 75.91, 75.86, 79.71, 86, 95.02, 100.94, 109.69, 130.59, 121.18, 120.44, 121.41, 124.92, 152.18, 169.99, 152.86, 155.41, 155.59, 181.95, 166.26, 179.56, 187.7, 200.46, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 374.11, 400.73, 442.36, 515.83, 458.68, 524.65, 546.94] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$189B', pe: 32.7, revenueGrowth: 46, eps: 16.71, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.31 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'CRDO', name: 'CRDO', easyScore: 1, avgWeight: 4.21, proScore: 2.43, coverage: 0.333,
      price: 241.23, weeklyPrices: [221.23, 222.35, 236.03, 226.10, 241.23], weeklyChange: 9.04, sortRank: 0, periodReturns: { '1M': 30.8, '6M': 28, '1Y': 285 },
      priceHistory: { '1W': [221.23, 222.35, 236.03, 226.1, 241.23], '1M': [180.06, 193.57, 198.29, 188.29, 188.51, 210.22, 198.57, 189.36, 184.54, 172.17, 156.27, 168.99, 182.98, 193.39, 218.41, 221.64, 221.23, 222.35, 236.03, 226.1, 241.23], '6M': [188.44, 170.29, 140.34, 147.81, 143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.05, 114.22, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 210.22, 156.27, 221.64, 241.23], '1Y': [62.65, 71.09, 79.17, 91.92, 87.59, 97.59, 101.19, 92.93, 109.38, 110.29, 125.38, 106.3, 120.1, 124.77, 163.96, 164.44, 149.38, 144.91, 148.87, 131.41, 144.17, 162.18, 164.23, 158.5, 139.56, 154.18, 189.19, 157.98, 134.13, 150.19, 143.22, 150.42, 149.12, 133.16, 125.28, 111.4, 121.44, 124.05, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 174.53, 180.5, 180.06, 210.22, 156.27, 221.64, 241.23] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$44B', pe: 133.3, revenueGrowth: 202, eps: 1.81, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.21 },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
