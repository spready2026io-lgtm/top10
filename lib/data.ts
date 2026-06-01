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
export const SPY_RET: Record<Period, number> = { '1W': 0.7, '1M': 4.9, '6M': 11.1, '1Y': 27.5 };
// @@END_GENERATED:SPY_RET@@

// @@GENERATED:TOP10_RET@@
// Top10 composite returns per theme per period (average of all ETFs in theme)
const TOP10_RET: Record<Theme, Record<Period, number>> = {
  'AI & ML':         { '1W': 2.8, '1M': 18.5, '6M': 51.4, '1Y': 98.8 },
  'Semiconductors':  { '1W': 0, '1M': 30.3, '6M': 105.5, '1Y': 170 },
  'Broad Tech':      { '1W': 3.4, '1M': 15.9, '6M': 28.5, '1Y': 45 },
  'Electrification': { '1W': -1.5, '1M': 4.4, '6M': 42.5, '1Y': 90.1 },
  'Industrials':     { '1W': -0.5, '1M': 2.2, '6M': 26.1, '1Y': 45.7 },
  'Meme':            { '1W': 1.3, '1M': 21.6, '6M': 35.7, '1Y': 24.2 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, Record<Period, ChartPeriodData>> = {
  'AI & ML': {
    '1W': { top10: [100, 99.53, 101.25, 101.97, 102.81], spy: [100, 99.98, 100.53, 100.78, 100.72], top10Return: 2.8, spyReturn: 0.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 100.62, 103.09, 106.29, 104.33, 108.1, 110.04, 107.22, 109.95, 110.29, 107.23, 105.28, 104.22, 107.09, 109.65, 110.74, 115.16, 114.62, 116.66, 117.49, 118.48], spy: [100, 99.63, 100.43, 101.83, 101.52, 102.35, 102.59, 102.43, 103.01, 103.82, 102.57, 102.5, 101.82, 102.86, 103.06, 103.47, 104.15, 104.14, 104.71, 104.97, 104.9], top10Return: 18.5, spyReturn: 4.9, xLabels: ["May 4", "May 11", "May 18", "May 25", "Jun 1"] },
    '6M': { top10: [100, 102.95, 98.99, 101.31, 101.29, 104.46, 103.97, 105.97, 108.53, 100.08, 104.42, 106.61, 106.01, 103.44, 102.59, 105.4, 99.72, 102.23, 109.79, 118.38, 123.99, 126.77, 137.86, 136.72, 141.05, 151.45], spy: [100, 100.49, 100.07, 100.67, 100.99, 101.37, 101.48, 101.28, 102.02, 99.61, 100.15, 101.35, 100.84, 100.15, 97.91, 96.99, 94.83, 96.41, 99.88, 104.39, 104.95, 105.94, 108.43, 108.66, 109.61, 111.13], top10Return: 51.4, spyReturn: 11.1, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 103.89, 105.21, 107.87, 108.63, 110.7, 111.95, 112.65, 115.96, 115.27, 119.71, 115.5, 117.49, 117.46, 125.61, 128.76, 131.21, 131.82, 135.66, 133.95, 136.3, 143.91, 139.93, 138.19, 129.58, 130.14, 134.44, 137.91, 130.31, 134.85, 133.53, 137.17, 139.87, 141.22, 141.1, 137.56, 138.87, 141.52, 140.75, 134.34, 136.21, 135.68, 129.39, 136.35, 150.96, 161.79, 169.98, 173.73, 190.13, 188.78, 195.86, 212.03], spy: [100, 101.18, 101.68, 102.37, 104.21, 105.29, 104.97, 106.1, 107.18, 105.95, 108.43, 107.95, 108.85, 108.61, 110.04, 111.21, 111.89, 112.4, 112.89, 111.73, 113.26, 115.92, 113.92, 115.23, 111.37, 113.89, 114.99, 115.24, 114.54, 116.07, 115.05, 116.33, 116.79, 116.28, 116.75, 116.52, 114.94, 116.32, 115.74, 113.44, 111.74, 109.42, 106.98, 111.17, 115.76, 119.57, 120.45, 121.59, 124.45, 124.71, 125.8, 127.54], top10Return: 98.8, spyReturn: 27.5, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Semiconductors': {
    '1W': { top10: [100, 99.16, 100.27, 99.34, 100.01], spy: [100, 99.98, 100.53, 100.78, 100.72], top10Return: 0, spyReturn: 0.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 100.98, 106.4, 110.76, 107.98, 116.47, 120.43, 114.72, 118.53, 118.37, 113.91, 110.31, 110.81, 115.65, 118.59, 120.26, 129.65, 128.63, 130.22, 129.14, 130.29], spy: [100, 99.63, 100.43, 101.83, 101.52, 102.35, 102.59, 102.43, 103.01, 103.82, 102.57, 102.5, 101.82, 102.86, 103.06, 103.47, 104.15, 104.14, 104.71, 104.97, 104.9], top10Return: 30.3, spyReturn: 4.9, xLabels: ["May 4", "May 11", "May 18", "May 25", "Jun 1"] },
    '6M': { top10: [100, 106.76, 105.87, 107.35, 107.74, 114.16, 116.92, 120.69, 124.05, 117.93, 125.26, 125.79, 125.1, 123.79, 125.11, 128.45, 134.13, 133.2, 146.31, 152.94, 165.51, 171.59, 184.65, 189.29, 199.43, 205.47], spy: [100, 100.49, 100.07, 100.67, 100.99, 101.37, 101.48, 101.28, 102.02, 99.61, 100.15, 101.35, 100.84, 100.15, 97.91, 96.99, 94.83, 96.41, 99.88, 104.39, 104.95, 105.94, 108.43, 108.66, 109.61, 111.13], top10Return: 105.5, spyReturn: 11.1, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 107.21, 109.47, 113.67, 114.77, 118.66, 118.22, 118.17, 119.1, 116.25, 122.29, 119.26, 124.08, 120.37, 127.45, 131.45, 137.1, 136.29, 140.56, 141.19, 146.09, 150.91, 144.92, 145.43, 134.36, 139.46, 147.25, 154.03, 146.03, 150.12, 146.98, 157.82, 165.59, 167.34, 167.1, 172.6, 174.18, 175.8, 172.57, 157.28, 161.22, 162.36, 159.47, 169.49, 192.39, 208.5, 232.26, 235.98, 263.76, 258.96, 275.15, 280.52], spy: [100, 101.18, 101.68, 102.37, 104.21, 105.29, 104.97, 106.1, 107.18, 105.95, 108.43, 107.95, 108.85, 108.61, 110.04, 111.21, 111.89, 112.4, 112.89, 111.73, 113.26, 115.92, 113.92, 115.23, 111.37, 113.89, 114.99, 115.24, 114.54, 116.07, 115.05, 116.33, 116.79, 116.28, 116.75, 116.52, 114.94, 116.32, 115.74, 113.44, 111.74, 109.42, 106.98, 111.17, 115.76, 119.57, 120.45, 121.59, 124.45, 124.71, 125.8, 127.54], top10Return: 170, spyReturn: 27.5, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Broad Tech': {
    '1W': { top10: [100, 100.49, 102.24, 103.69, 103.34], spy: [100, 99.98, 100.53, 100.78, 100.72], top10Return: 3.4, spyReturn: 0.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 101.43, 101.85, 103.51, 103.15, 105.92, 106.93, 105.21, 105.98, 107.09, 105.86, 105.45, 104.99, 106.81, 107.73, 109.67, 112.68, 113.28, 115.22, 116.48, 115.87], spy: [100, 99.63, 100.43, 101.83, 101.52, 102.35, 102.59, 102.43, 103.01, 103.82, 102.57, 102.5, 101.82, 102.86, 103.06, 103.47, 104.15, 104.14, 104.71, 104.97, 104.9], top10Return: 15.9, spyReturn: 4.9, xLabels: ["May 4", "May 11", "May 18", "May 25", "Jun 1"] },
    '6M': { top10: [100, 103.81, 100.47, 103.58, 102.31, 104.49, 103.51, 100.85, 101.98, 94.75, 97.47, 99.36, 101, 101.51, 98.61, 99.45, 94.71, 97.42, 99.45, 109.88, 111.63, 114.32, 119.86, 120.17, 124.31, 128.55], spy: [100, 100.49, 100.07, 100.67, 100.99, 101.37, 101.48, 101.28, 102.02, 99.61, 100.15, 101.35, 100.84, 100.15, 97.91, 96.99, 94.83, 96.41, 99.88, 104.39, 104.95, 105.94, 108.43, 108.66, 109.61, 111.13], top10Return: 28.5, spyReturn: 11.1, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.86, 103.6, 105.99, 105.66, 108.18, 107.49, 110.09, 110.01, 108.04, 109.55, 107.33, 109.78, 108.8, 111.05, 114.28, 117.28, 118.14, 119.76, 118.8, 120.28, 123.49, 120.3, 120.49, 113.56, 116.04, 117.84, 121.44, 118.17, 119.7, 116.82, 118.72, 117.37, 117.83, 115.18, 110.6, 110.35, 112.59, 114.44, 114.25, 112.55, 112.93, 109.11, 113.88, 118.1, 127.15, 128.46, 131.82, 138.28, 137.92, 138.72, 145], spy: [100, 101.18, 101.68, 102.37, 104.21, 105.29, 104.97, 106.1, 107.18, 105.95, 108.43, 107.95, 108.85, 108.61, 110.04, 111.21, 111.89, 112.4, 112.89, 111.73, 113.26, 115.92, 113.92, 115.23, 111.37, 113.89, 114.99, 115.24, 114.54, 116.07, 115.05, 116.33, 116.79, 116.28, 116.75, 116.52, 114.94, 116.32, 115.74, 113.44, 111.74, 109.42, 106.98, 111.17, 115.76, 119.57, 120.45, 121.59, 124.45, 124.71, 125.8, 127.54], top10Return: 45, spyReturn: 27.5, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Electrification': {
    '1W': { top10: [100, 100.36, 100.12, 99.61, 98.5], spy: [100, 99.98, 100.53, 100.78, 100.72], top10Return: -1.5, spyReturn: 0.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 100.44, 102.56, 103.35, 102.15, 103.67, 105.32, 103.88, 104.68, 103.82, 102.08, 98.6, 96.82, 97.98, 100.69, 102.67, 105.82, 106.27, 106.08, 105.54, 104.34], spy: [100, 99.63, 100.43, 101.83, 101.52, 102.35, 102.59, 102.43, 103.01, 103.82, 102.57, 102.5, 101.82, 102.86, 103.06, 103.47, 104.15, 104.14, 104.71, 104.97, 104.9], top10Return: 4.4, spyReturn: 4.9, xLabels: ["May 4", "May 11", "May 18", "May 25", "Jun 1"] },
    '6M': { top10: [100, 102.4, 100.77, 101.85, 100.65, 103.91, 107.73, 111.88, 114.2, 110.46, 115.88, 117.11, 118.29, 111.97, 112.8, 115.16, 112.65, 114.52, 122.34, 127.85, 133.79, 138.84, 142.51, 140.28, 141.04, 143.11], spy: [100, 100.49, 100.07, 100.67, 100.99, 101.37, 101.48, 101.28, 102.02, 99.61, 100.15, 101.35, 100.84, 100.15, 97.91, 96.99, 94.83, 96.41, 99.88, 104.39, 104.95, 105.94, 108.43, 108.66, 109.61, 111.13], top10Return: 42.5, spyReturn: 11.1, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 104.29, 106.84, 105.71, 107, 110.61, 111.46, 117.08, 115.12, 115.45, 117.88, 118.11, 120.1, 117.49, 119.27, 123.47, 127.56, 128.47, 136.47, 142.61, 140.79, 142.5, 140.15, 143.72, 136.65, 136.89, 139.66, 142.43, 140.72, 143.1, 138.88, 143.7, 148.61, 153.19, 150.41, 153.28, 150.88, 154.5, 155.34, 149.25, 152.69, 151.75, 153.91, 157.5, 166.62, 175.76, 179.31, 182.54, 182.81, 185.3, 187.84, 190.02], spy: [100, 101.18, 101.68, 102.37, 104.21, 105.29, 104.97, 106.1, 107.18, 105.95, 108.43, 107.95, 108.85, 108.61, 110.04, 111.21, 111.89, 112.4, 112.89, 111.73, 113.26, 115.92, 113.92, 115.23, 111.37, 113.89, 114.99, 115.24, 114.54, 116.07, 115.05, 116.33, 116.79, 116.28, 116.75, 116.52, 114.94, 116.32, 115.74, 113.44, 111.74, 109.42, 106.98, 111.17, 115.76, 119.57, 120.45, 121.59, 124.45, 124.71, 125.8, 127.54], top10Return: 90.1, spyReturn: 27.5, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Industrials': {
    '1W': { top10: [100, 100.78, 101.49, 100.59, 99.54], spy: [100, 99.98, 100.53, 100.78, 100.72], top10Return: -0.5, spyReturn: 0.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 100.73, 102, 102.91, 101.5, 102.78, 102.87, 102.2, 102.89, 103.06, 101.3, 99.45, 98.06, 99.04, 99.71, 100.43, 102.64, 103.45, 104.17, 103.24, 102.17], spy: [100, 99.63, 100.43, 101.83, 101.52, 102.35, 102.59, 102.43, 103.01, 103.82, 102.57, 102.5, 101.82, 102.86, 103.06, 103.47, 104.15, 104.14, 104.71, 104.97, 104.9], top10Return: 2.2, spyReturn: 4.9, xLabels: ["May 4", "May 11", "May 18", "May 25", "Jun 1"] },
    '6M': { top10: [100, 102.03, 102.87, 104.43, 103.23, 107.03, 111.46, 113.79, 113.36, 113.86, 118.5, 122.46, 121.37, 117.2, 114.02, 114.68, 112.57, 115.37, 121.69, 122.82, 123.29, 125.38, 126.72, 125.67, 124.45, 126.71], spy: [100, 100.49, 100.07, 100.67, 100.99, 101.37, 101.48, 101.28, 102.02, 99.61, 100.15, 101.35, 100.84, 100.15, 97.91, 96.99, 94.83, 96.41, 99.88, 104.39, 104.95, 105.94, 108.43, 108.66, 109.61, 111.13], top10Return: 26.1, spyReturn: 11.1, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.74, 102.31, 103.71, 105.61, 106.87, 106.69, 107.69, 109.43, 109.89, 111.86, 110.1, 112.47, 111.02, 112.43, 113.62, 115.69, 116.49, 118.2, 118.04, 118.38, 120.11, 118.1, 117.27, 112.16, 114.23, 114.81, 116.47, 117.44, 120.47, 118.13, 124.21, 130.64, 131.8, 130.64, 135.72, 136.81, 140.88, 138.6, 132.74, 129.59, 129.32, 129.04, 132.96, 140.58, 142.2, 142.06, 143.97, 145.87, 144.44, 143.16, 145.74], spy: [100, 101.18, 101.68, 102.37, 104.21, 105.29, 104.97, 106.1, 107.18, 105.95, 108.43, 107.95, 108.85, 108.61, 110.04, 111.21, 111.89, 112.4, 112.89, 111.73, 113.26, 115.92, 113.92, 115.23, 111.37, 113.89, 114.99, 115.24, 114.54, 116.07, 115.05, 116.33, 116.79, 116.28, 116.75, 116.52, 114.94, 116.32, 115.74, 113.44, 111.74, 109.42, 106.98, 111.17, 115.76, 119.57, 120.45, 121.59, 124.45, 124.71, 125.8, 127.54], top10Return: 45.7, spyReturn: 27.5, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Meme': {
    '1W': { top10: [100, 102.4, 104.29, 103.86, 101.32], spy: [100, 99.98, 100.53, 100.78, 100.72], top10Return: 1.3, spyReturn: 0.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 102.54, 105.59, 108.9, 107.25, 111.24, 111.84, 110.9, 114.62, 113.78, 112.3, 107.84, 104.84, 106.94, 112.72, 116.82, 120.25, 123.13, 125.4, 124.74, 121.59], spy: [100, 99.63, 100.43, 101.83, 101.52, 102.35, 102.59, 102.43, 103.01, 103.82, 102.57, 102.5, 101.82, 102.86, 103.06, 103.47, 104.15, 104.14, 104.71, 104.97, 104.9], top10Return: 21.6, spyReturn: 4.9, xLabels: ["May 4", "May 11", "May 18", "May 25", "Jun 1"] },
    '6M': { top10: [100, 105.82, 93.77, 99.45, 93.98, 100.23, 103.03, 103.37, 100.89, 88.13, 90.33, 92.15, 91.61, 88.24, 90.5, 95.13, 92.06, 95.23, 101.62, 112.39, 111.04, 114.71, 123.11, 121.1, 131.75, 135.66], spy: [100, 100.49, 100.07, 100.67, 100.99, 101.37, 101.48, 101.28, 102.02, 99.61, 100.15, 101.35, 100.84, 100.15, 97.91, 96.99, 94.83, 96.41, 99.88, 104.39, 104.95, 105.94, 108.43, 108.66, 109.61, 111.13], top10Return: 35.7, spyReturn: 11.1, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.9, 101.3, 100.55, 95.9, 94.51, 90.6, 94.86, 92.05, 87.38, 86.35, 88.23, 88.18, 90.22, 91.69, 88.9, 93.47, 92.95, 93.99, 97.93, 96.44, 100.51, 97.83, 95.41, 92.45, 89.86, 85.24, 90.82, 87.29, 89.49, 90.73, 92.63, 93.19, 94.91, 94.07, 93.34, 92.51, 90.24, 89.13, 90.97, 96.05, 99.86, 100.14, 98.51, 99.98, 108.12, 107.36, 108.03, 113, 118.37, 123.78, 124.17], spy: [100, 101.18, 101.68, 102.37, 104.21, 105.29, 104.97, 106.1, 107.18, 105.95, 108.43, 107.95, 108.85, 108.61, 110.04, 111.21, 111.89, 112.4, 112.89, 111.73, 113.26, 115.92, 113.92, 115.23, 111.37, 113.89, 114.99, 115.24, 114.54, 116.07, 115.05, 116.33, 116.79, 116.28, 116.75, 116.52, 114.94, 116.32, 115.74, 113.44, 111.74, 109.42, 106.98, 111.17, 115.76, 119.57, 120.45, 121.59, 124.45, 124.71, 125.8, 127.54], top10Return: 24.2, spyReturn: 27.5, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
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
export const SCAN_TIMESTAMP    = '2026-06-01T13:35:22.774Z';
export const SCAN_TIMESTAMP_NY = 'June 1, 2026 at 9:35 AM ET';
// @@END_GENERATED:SCAN_TIMESTAMP@@

// Number of ETFs per theme — denominator for Coverage Score display (x/n badge)
// @@GENERATED:THEME_ETF_COUNT@@
export const THEME_ETF_COUNT: Record<Theme, number> = {
  'AI & ML':         8,
  'Semiconductors':  4,
  'Broad Tech':      8,
  'Electrification': 4,
  'Industrials':     5,
  'Meme':            3,
};
// @@END_GENERATED:THEME_ETF_COUNT@@

export const THEME_ETFS: Record<Theme, string[]> = {
  'AI & ML':        ['AIS', 'ARTY', 'BAI', 'IVEP', 'IGPT', 'IVES', 'ALAI', 'CHAT'],
  'Semiconductors': ['SOXX', 'PSI', 'XSD', 'DRAM'],
  'Broad Tech':     ['QQQA', 'PTF', 'WCLD', 'MAGS', 'IGV', 'FDTX', 'GTEK', 'ARKK', 'MARS'],
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
  { ticker: 'MU', name: `Micron Technology Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 15.83, bestProScore: 6.84, price: 1027.68, weeklyChange: 14.71 },
  { ticker: 'AMD', name: `Advanced Micro Devices Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 13.22, bestProScore: 6.09, price: 503.30, weeklyChange: -0.12 },
  { ticker: 'NVDA', name: `NVIDIA Corp`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 12.85, bestProScore: 5.20, price: 218.93, weeklyChange: 1.89 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 8.37, bestProScore: 3.38, price: 207.01, weeklyChange: -0.60 },
  { ticker: 'GOOGL', name: `ALPHABET INC CLASS A`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 8.55, bestProScore: 5.05, price: 375.60, weeklyChange: -3.41 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 8.26, bestProScore: 4.95, price: 283.75, weeklyChange: -2.82 },
  { ticker: 'MSFT', name: `MICROSOFT CORP`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 7.98, bestProScore: 5.38, price: 459.93, weeklyChange: 10.55 },
  { ticker: 'AMZN', name: `AMAZON.COM INC`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 7.28, bestProScore: 4.40, price: 264.72, weeklyChange: -0.21 },
  { ticker: 'AVGO', name: `Broadcom Inc`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 7.14, bestProScore: 3.84, price: 447.00, weeklyChange: 5.92 },
  { ticker: 'META', name: `Meta Platforms Inc`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 6.37, bestProScore: 3.71, price: 620.01, weeklyChange: 1.25 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': 0.5, '1M': 26.9, '6M': 110.2, '1Y': 210.6 },
  ARTY: { '1W': 6, '1M': 20.9, '6M': 59.9, '1Y': 104.8 },
  BAI:  { '1W': -0.2, '1M': 14.3, '6M': 45.5, '1Y': 89.4 },
  IVEP: { '1W': -3.9, '1M': -3.8, '6M': 6, '1Y': 6 },
  IGPT: { '1W': 2.3, '1M': 26.2, '6M': 73, '1Y': 120.7 },
  IVES: { '1W': 7, '1M': 21.1, '6M': 27.3, '1Y': 60.3 },
  ALAI: { '1W': 4.9, '1M': 16.3, '6M': 24, '1Y': 62.5 },
  CHAT: { '1W': 6, '1M': 25.9, '6M': 65.4, '1Y': 135.9 },
  // Semiconductors
  SOXX: { '1W': -0.6, '1M': 21.7, '6M': 90.9, '1Y': 172.5 },
  PSI:  { '1W': -4.7, '1M': 14, '6M': 101.5, '1Y': 198.6 },
  XSD:  { '1W': -4, '1M': 21.8, '6M': 91.2, '1Y': 170.5 },
  DRAM: { '1W': 9.3, '1M': 63.7, '6M': 138.3, '1Y': 138.3 },
  // Broad Tech
  PTF:  { '1W': -1.4, '1M': 12.5, '6M': 67.3, '1Y': 98.2 },
  WCLD: { '1W': 12.2, '1M': 17.3, '6M': 0.3, '1Y': -5.8 },
  MAGS: { '1W': 1.1, '1M': 5.3, '6M': 5.6, '1Y': 33.5 },
  IGV:  { '1W': 10.1, '1M': 19.5, '6M': -0.5, '1Y': -0.4 },
  FDTX: { '1W': 3.8, '1M': 17.6, '6M': 37.6, '1Y': 53.7 },
  GTEK: { '1W': 5.4, '1M': 17.9, '6M': 50.5, '1Y': 77.1 },
  ARKK: { '1W': 3.7, '1M': 4.1, '6M': 3.3, '1Y': 40.1 },
  MARS: { '1W': -8.1, '1M': 32.8, '6M': 63.6, '1Y': 63.6 },
  // Electrification
  POW:  { '1W': -4.5, '1M': -2.3, '6M': 57.5, '1Y': 52.4 },
  VOLT: { '1W': -3.6, '1M': -4.6, '6M': 31.2, '1Y': 63.4 },
  PBD:  { '1W': 2.2, '1M': 8.9, '6M': 37, '1Y': 89.5 },
  PBW:  { '1W': 0, '1M': 15.4, '6M': 44.5, '1Y': 154.9 },
  // Industrials
  AIRR: { '1W': -0.5, '1M': 0.3, '6M': 30.9, '1Y': 67.3 },
  PRN:  { '1W': -1.4, '1M': 4.2, '6M': 44.5, '1Y': 63.9 },
  RSHO: { '1W': 1.5, '1M': 5.6, '6M': 30.1, '1Y': 54.2 },
  IDEF: { '1W': -0.8, '1M': 0.1, '6M': 15.6, '1Y': 27.4 },
  BILT: { '1W': -1.1, '1M': 0.6, '6M': 9.3, '1Y': 15.9 },
  // Meme
  BUZZ: { '1W': 4.4, '1M': 17.4, '6M': 21.8, '1Y': 48.4 },
  MEME: { '1W': -3.4, '1M': 25.4, '6M': 72.4, '1Y': 11.4 },
  RKNG: { '1W': 3, '1M': 22.1, '6M': 12.8, '1Y': 12.8 },
};
// @@END_GENERATED:ETF_RETURNS@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 7, avgWeight: 6.76, proScore: 6.32, coverage: 0.875,
      price: 1027.68, weeklyPrices: [895.88, 928.41, 923.52, 971.00, 1027.68], weeklyChange: 14.71, sortRank: 0, periodReturns: { '1M': 89.5, '6M': 327.4, '1Y': 946.7 },
      priceHistory: { '1W': [895.88, 928.41, 923.52, 971, 1027.68], '1M': [542.21, 576.45, 640.2, 666.59, 646.63, 746.81, 795.33, 766.58, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1027.68], '6M': [240.46, 246.92, 237.5, 276.59, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 1027.68], '1Y': [98.18, 110.95, 119.84, 127.91, 120.89, 122.24, 120.11, 109.22, 111.96, 109.06, 127.75, 122.05, 116.5, 118.72, 140, 159.99, 166.41, 167.32, 185.69, 187.06, 202.29, 221.91, 218.03, 241.11, 228.5, 224.53, 239.49, 252.42, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 496.72, 542.21, 746.81, 724.66, 751, 1027.68] },
      velocityScore: { '1D': 9, '1W': 20.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 48.5, revenueGrowth: 196, eps: 21.17, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { AIS: 8.42, ARTY: 7.33, BAI: 5.4, IVEP: false, IGPT: 11.85, IVES: 7.17, ALAI: 1.09, CHAT: 6.05 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 7, avgWeight: 5.56, proScore: 5.2, coverage: 0.875,
      price: 218.93, weeklyPrices: [214.86, 212.60, 214.25, 211.14, 218.93], weeklyChange: 1.89, sortRank: 0, periodReturns: { '1M': 10.3, '6M': 21.7, '1Y': 59.4 },
      priceHistory: { '1W': [214.86, 212.6, 214.25, 211.14, 218.93], '1M': [198.45, 198.48, 196.5, 207.83, 211.5, 215.2, 219.44, 220.78, 225.83, 235.74, 225.32, 222.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 214.25, 211.14, 218.93], '6M': [179.92, 185.55, 176.29, 183.69, 187.54, 189.11, 183.14, 184.84, 192.51, 171.88, 186.94, 189.82, 177.19, 183.34, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 225.32, 215.33, 218.93], '1Y': [137.38, 142.63, 144.69, 147.9, 153.3, 162.88, 170.7, 167.03, 175.51, 178.26, 183.16, 175.64, 181.77, 170.62, 177.33, 170.29, 178.43, 186.58, 185.04, 180.03, 181.16, 201.03, 198.69, 193.16, 181.36, 177.82, 181.46, 184.97, 177.72, 189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 186.94, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 208.27, 198.45, 215.2, 225.32, 215.33, 218.93] },
      velocityScore: { '1D': -10.2, '1W': -8.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.3T', pe: 33.6, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.47,
      etfPresence: { AIS: 2.5, ARTY: 3.52, BAI: 4.51, IVEP: false, IGPT: 5.7, IVES: 4.2, ALAI: 12.72, CHAT: 5.8 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 7, avgWeight: 5.54, proScore: 5.18, coverage: 0.875,
      price: 503.3, weeklyPrices: [503.89, 495.54, 518.09, 516.10, 503.30], weeklyChange: -0.12, sortRank: 0, periodReturns: { '1M': 39.6, '6M': 129, '1Y': 339.1 },
      priceHistory: { '1W': [503.89, 495.54, 518.09, 516.1, 503.3], '1M': [360.54, 341.54, 355.26, 421.39, 408.46, 455.19, 458.79, 448.29, 445.5, 449.7, 424.1, 420.99, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 518.09, 516.1, 503.3], '6M': [219.76, 221.11, 207.58, 214.95, 215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 200.21, 199.45, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 467.51, 503.3], '1Y': [114.63, 121.73, 126.39, 138.43, 136.11, 138.41, 155.61, 154.72, 177.44, 174.31, 174.95, 166.55, 166.62, 162.13, 159.54, 159.16, 160.9, 161.79, 211.51, 218.09, 238.03, 258.01, 250.05, 237.52, 230.29, 206.13, 215.24, 221.62, 209.17, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 205.94, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 347.81, 360.54, 455.19, 424.1, 467.51, 503.3] },
      velocityScore: { '1D': -3.9, '1W': 2.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$821B', pe: 168.3, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.67, ARTY: 7.48, BAI: 5.03, IVEP: false, IGPT: 7.26, IVES: 7.56, ALAI: 1.06, CHAT: 5.72 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 4, avgWeight: 4.95, proScore: 3.5, coverage: 0.5,
      price: 375.6, weeklyPrices: [388.88, 388.83, 390.13, 380.34, 375.60], weeklyChange: -3.41, sortRank: 0, periodReturns: { '1M': -2.6, '6M': 19.3, '1Y': 122.2 },
      priceHistory: { '1W': [388.88, 388.83, 390.13, 380.34, 375.6], '1M': [385.69, 383.25, 388.43, 398.04, 397.99, 400.8, 388.64, 387.35, 402.62, 401.07, 396.78, 396.94, 387.66, 388.91, 387.66, 382.97, 388.88, 388.83, 390.13, 380.34, 375.6], '6M': [314.89, 313.72, 308.22, 309.78, 313.85, 321.98, 335.84, 330.54, 338.25, 331.25, 309, 314.98, 311.76, 300.88, 303.55, 307.13, 280.92, 295.77, 317.24, 341.68, 344.4, 385.69, 400.8, 396.78, 382.97, 375.6], '1Y': [169.03, 176.09, 176.77, 166.77, 175.84, 176.62, 182, 191.34, 195.75, 194.67, 203.34, 201.57, 207.14, 230.66, 239.17, 249.53, 251.66, 243.1, 245.76, 245.45, 250.46, 267.47, 277.54, 291.31, 284.28, 323.44, 315.81, 317.08, 306.57, 314.35, 313, 325.44, 332.78, 327.93, 338, 322.86, 309, 314.98, 311.76, 298.52, 302.28, 301, 274.34, 299.99, 321.31, 337.42, 344.4, 385.69, 400.8, 396.78, 382.97, 375.6] },
      velocityScore: { '1D': -10, '1W': -7.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.6T', pe: 28.6, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.65, IVEP: false, IGPT: 6.2, IVES: 4.36, ALAI: false, CHAT: 5.59 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 6, avgWeight: 3.81, proScore: 3.3, coverage: 0.75,
      price: 447, weeklyPrices: [422.01, 421.86, 426.58, 446.77, 447.00], weeklyChange: 5.92, sortRank: 0, periodReturns: { '1M': 6.1, '6M': 15.8, '1Y': 79.7 },
      priceHistory: { '1W': [422.01, 421.86, 426.58, 446.77, 447], '1M': [421.28, 416.5, 427.36, 425.44, 412.56, 430, 428.43, 419.3, 416.79, 439.79, 425.19, 420.71, 411.07, 417.76, 414.57, 414.14, 422.01, 421.86, 426.58, 446.77, 447], '6M': [386.08, 401.1, 339.81, 341.45, 349.85, 343.5, 339.89, 325.49, 330.73, 310.51, 331.17, 332.65, 319.55, 332.77, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 425.19, 414.14, 447], '1Y': [248.71, 244.28, 252.1, 263.77, 264.74, 277.9, 280.94, 278.59, 297.42, 292.93, 312.83, 294.91, 298.01, 302.39, 369.57, 346.17, 338.94, 329.91, 336.41, 344.13, 342.66, 372.97, 351.94, 351.96, 340.5, 385.03, 381.57, 406.29, 341.3, 349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 331.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 422.76, 421.28, 430, 425.19, 414.14, 447] },
      velocityScore: { '1D': -9.1, '1W': 1.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.1T', pe: 87, revenueGrowth: 30, eps: 5.14, grossMargin: 77, dividendYield: 0.58,
      etfPresence: { AIS: 0.78, ARTY: 3.84, BAI: 5.48, IVEP: false, IGPT: false, IVES: 4.77, ALAI: 4.68, CHAT: 3.28 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 4, avgWeight: 4.23, proScore: 2.99, coverage: 0.5,
      price: 429.99, weeklyPrices: [412.32, 422.73, 424.86, 418.45, 429.99], weeklyChange: 4.29, sortRank: 0, periodReturns: { '1M': 8.1, '6M': 49.5, '1Y': 120.7 },
      priceHistory: { '1W': [412.32, 422.73, 424.86, 418.45, 429.99], '1M': [397.67, 401.61, 394.41, 419.5, 414.15, 411.68, 404.54, 397.28, 399.8, 417.72, 404.35, 395.95, 392.61, 401.62, 407.15, 404.52, 412.32, 422.73, 424.86, 418.45, 429.99], '6M': [287.68, 301.87, 287.74, 293.28, 299.58, 318.68, 327.11, 327.37, 339.55, 330.73, 368.1, 370.54, 374.58, 353.86, 336.71, 338.79, 326.11, 339.04, 370.6, 370.5, 402.46, 397.67, 411.68, 404.35, 404.52, 429.99], '1Y': [194.84, 207, 215.68, 220.09, 224.68, 231.84, 236.95, 234.6, 241.33, 232.47, 244.29, 232.7, 238.72, 231.39, 260.44, 262.79, 282.71, 279.29, 294.03, 295.94, 294.51, 301.53, 294.05, 291.17, 277.91, 284.68, 292.09, 303.41, 286.87, 296.95, 303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 368.1, 370.54, 374.58, 338.89, 338.31, 329.24, 326.74, 341.76, 369.57, 366.24, 402.46, 397.67, 411.68, 404.35, 404.52, 429.99] },
      velocityScore: { '1D': -3.5, '1W': -2.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.2T', pe: 36.8, revenueGrowth: 35, eps: 11.67, grossMargin: 62, dividendYield: 0.91,
      etfPresence: { AIS: 3.13, ARTY: false, BAI: 4.2, IVEP: false, IGPT: false, IVES: 4.28, ALAI: 5.32, CHAT: false },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 3, avgWeight: 4.7, proScore: 2.88, coverage: 0.375,
      price: 264.72, weeklyPrices: [265.29, 271.85, 274.00, 270.64, 264.72], weeklyChange: -0.21, sortRank: 0, periodReturns: { '1M': -1.3, '6M': 13.2, '1Y': 28.1 },
      priceHistory: { '1W': [265.29, 271.85, 274, 270.64, 264.72], '1M': [268.26, 272.05, 273.55, 274.99, 271.17, 272.68, 268.99, 265.82, 270.13, 267.22, 264.14, 264.86, 259.34, 265.01, 268.46, 266.32, 265.29, 271.85, 274, 270.64, 264.72], '6M': [233.88, 226.89, 222.54, 228.43, 232.53, 241.56, 236.65, 234.34, 241.73, 222.69, 199.6, 210.11, 210, 218.94, 209.53, 208.76, 207.54, 209.77, 238.38, 250.56, 263.99, 268.26, 272.68, 264.14, 266.32, 264.72], '1Y': [206.65, 216.98, 216.1, 212.77, 220.46, 222.54, 226.35, 227.47, 231.01, 213.75, 221.47, 228.01, 228.71, 225.99, 230.33, 231.62, 220.71, 219.57, 221.78, 216.39, 222.03, 229.25, 249.32, 249.1, 222.55, 229.67, 234.42, 227.92, 222.56, 232.14, 230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 199.6, 210.11, 210, 213.21, 207.67, 205.37, 199.34, 212.79, 239.89, 248.28, 263.99, 268.26, 272.68, 264.14, 266.32, 264.72] },
      velocityScore: { '1D': -9.4, '1W': -4.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.8T', pe: 31, revenueGrowth: 17, eps: 8.55, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.54, ALAI: 6.19, CHAT: 3.37 },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 4, avgWeight: 3.76, proScore: 2.66, coverage: 0.5,
      price: 620.01, weeklyPrices: [612.34, 635.26, 635.29, 632.51, 620.01], weeklyChange: 1.25, sortRank: 0, periodReturns: { '1M': 1.8, '6M': -3.3, '1Y': -7.6 },
      priceHistory: { '1W': [612.34, 635.26, 635.29, 632.51, 620.01], '1M': [608.75, 610.41, 604.96, 612.88, 616.81, 609.63, 598.86, 603, 616.63, 618.43, 614.23, 611.21, 602.61, 605.06, 607.38, 610.26, 612.34, 635.26, 635.29, 632.51, 620.01], '6M': [640.87, 666.8, 647.51, 661.5, 665.95, 648.69, 615.52, 647.63, 738.31, 670.21, 649.81, 655.66, 648.18, 660.57, 638.18, 606.7, 547.54, 574.46, 629.86, 688.55, 675.03, 608.75, 609.63, 614.23, 610.26, 620.01], '1Y': [670.9, 694.06, 702.12, 712.2, 719.22, 732.78, 710.39, 704.81, 700, 763.46, 790, 751.48, 754.1, 737.05, 751.98, 775.72, 755.4, 734.38, 713.08, 708.65, 733.27, 751.44, 627.32, 627.08, 597.69, 636.22, 647.1, 656.96, 657.15, 664.94, 660.09, 646.06, 620.8, 658.76, 716.5, 661.46, 649.81, 655.66, 648.18, 644.86, 613.71, 593.66, 525.72, 573.02, 634.53, 670.91, 675.03, 608.75, 609.63, 614.23, 610.26, 620.01] },
      velocityScore: { '1D': -8, '1W': -3.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.6T', pe: 22.5, revenueGrowth: 33, eps: 27.51, grossMargin: 82, dividendYield: 0.33,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: 4.9, IVES: 3.54, ALAI: 4.16, CHAT: 2.43 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, avgWeight: 3.67, proScore: 2.6, coverage: 0.5,
      price: 459.93, weeklyPrices: [416.03, 412.67, 426.99, 450.24, 459.93], weeklyChange: 10.55, sortRank: 0, periodReturns: { '1M': 11, '6M': -5.5, '1Y': -0.4 },
      priceHistory: { '1W': [416.03, 412.67, 426.99, 450.24, 459.93], '1M': [414.44, 413.62, 411.38, 413.96, 420.77, 415.12, 412.66, 407.77, 405.21, 409.43, 421.92, 423.54, 417.42, 421.06, 419.09, 418.57, 416.03, 412.67, 426.99, 450.24, 459.93], '6M': [486.74, 491.02, 474.82, 484.92, 487.48, 483.47, 459.38, 451.14, 433.5, 393.67, 401.84, 397.23, 392.74, 410.68, 401.86, 389.02, 365.97, 373.46, 370.87, 422.79, 424.62, 414.44, 415.12, 421.92, 418.57, 459.93], '1Y': [461.97, 472.75, 479.14, 490.11, 492.05, 503.51, 505.82, 505.27, 512.57, 527.75, 529.24, 509.77, 502.04, 505.35, 500.37, 510.02, 509.23, 517.95, 523.98, 513.57, 517.66, 542.07, 514.33, 508.68, 493.79, 476.99, 490, 492.02, 476.39, 486.85, 483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.84, 397.23, 392.74, 408.96, 395.55, 381.87, 356.77, 372.88, 384.37, 418.07, 424.62, 414.44, 415.12, 421.92, 418.57, 459.93] },
      velocityScore: { '1D': -3.3, '1W': 0.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3.4T', pe: 27.4, revenueGrowth: 18, eps: 16.79, grossMargin: 68, dividendYield: 0.81,
      etfPresence: { AIS: false, ARTY: 1.91, BAI: false, IVEP: false, IGPT: false, IVES: 4.02, ALAI: 5.63, CHAT: 3.12 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 3, avgWeight: 4.23, proScore: 2.59, coverage: 0.375,
      price: 109.16, weeklyPrices: [123.52, 121.77, 120.89, 114.68, 109.16], weeklyChange: -11.63, sortRank: 0, periodReturns: { '1M': 9.6, '6M': 172.8, '1Y': 453 },
      priceHistory: { '1W': [123.52, 121.77, 120.89, 114.68, 109.16], '1M': [99.62, 95.78, 108.15, 113.01, 109.62, 124.92, 129.44, 120.61, 120.29, 115.93, 108.77, 108.17, 110.8, 118.96, 118.5, 119.84, 123.52, 121.77, 120.89, 114.68, 109.16], '6M': [40.01, 40.3, 37.51, 36.37, 37.3, 42.63, 48.72, 54.32, 48.66, 48.24, 46.48, 44.11, 45.61, 45.95, 45.25, 46.18, 44.1, 50.38, 62.38, 68.5, 82.54, 99.62, 124.92, 108.77, 119.84, 109.16], '1Y': [19.74, 20.48, 20.74, 22.55, 22.85, 23.44, 22.92, 23.24, 20.41, 20.19, 21.81, 25.31, 24.35, 24, 24.77, 24.9, 29.34, 33.55, 37.17, 35.63, 38.12, 41.53, 37.03, 37.88, 34.33, 35.83, 43.47, 40.5, 37.31, 36.35, 36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.48, 44.11, 45.61, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 82.54, 99.62, 124.92, 108.77, 119.84, 109.16] },
      velocityScore: { '1D': -3.7, '1W': -10.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$549B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.15, ARTY: false, BAI: 2.83, IVEP: false, IGPT: 6.72, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 3, avgWeight: 3.68, proScore: 2.25, coverage: 0.375,
      price: 207.01, weeklyPrices: [208.26, 198.70, 204.83, 205.00, 207.01], weeklyChange: -0.6, sortRank: 0, periodReturns: { '1M': 25.5, '6M': 127.2, '1Y': 236.8 },
      priceHistory: { '1W': [208.26, 198.7, 204.83, 205, 207.01], '1M': [164.95, 163.66, 168.75, 172.15, 160.01, 170.13, 170.84, 164.5, 177.95, 182.58, 176.89, 168.93, 176.27, 186.8, 190.69, 196.33, 208.26, 198.7, 204.83, 205, 207.01], '6M': [91.1, 92, 84.26, 84.8, 86.76, 84.64, 81.21, 83.1, 81.34, 74.21, 78.23, 79.48, 81.69, 75.68, 87.67, 89.53, 97.68, 107.11, 128.49, 139.69, 164.31, 164.95, 170.13, 176.89, 196.33, 207.01], '1Y': [61.47, 69.14, 70.42, 75.21, 76.24, 72.26, 72.41, 71.99, 76.34, 76.63, 77.81, 72.07, 74.26, 62.31, 67.1, 70.98, 74.62, 84.07, 86.97, 86.22, 84.26, 88.46, 87.59, 89.33, 78.68, 83.43, 92.89, 88.9, 84.07, 87.68, 84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.23, 79.48, 81.69, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 164.31, 164.95, 170.13, 176.89, 196.33, 207.01] },
      velocityScore: { '1D': 5.1, '1W': -3.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$181B', pe: 71.1, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.12,
      etfPresence: { AIS: 3.26, ARTY: 6.48, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 1.29 },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 3, avgWeight: 3.34, proScore: 2.04, coverage: 0.375,
      price: 227.2, weeklyPrices: [193.06, 190.96, 203.70, 225.78, 227.20], weeklyChange: 17.68, sortRank: 0, periodReturns: { '1M': 32.2, '6M': 13.1, '1Y': 36.4 },
      priceHistory: { '1W': [193.06, 190.96, 203.7, 225.78, 227.2], '1M': [171.83, 180.29, 185.35, 194.03, 194.59, 195.95, 193.84, 186.83, 189.76, 195.61, 192.95, 186.61, 181.46, 188.16, 189.77, 192.08, 193.06, 190.96, 203.7, 225.78, 227.2], '6M': [200.94, 220.54, 184.92, 198.38, 197.21, 192.84, 193.61, 178.18, 169.01, 136.48, 156.48, 148.08, 145.4, 154.79, 159.16, 155.52, 142.81, 146.38, 138.09, 175.06, 173.28, 171.83, 195.95, 192.95, 192.08, 227.2], '1Y': [166.57, 177.15, 211.1, 215.27, 218.96, 235.81, 234.96, 238.11, 249.98, 255.67, 253.86, 234.62, 234.21, 223.45, 328.33, 301.41, 313.83, 281.24, 284.24, 299, 275.15, 280.83, 248.17, 236.15, 220.49, 197.03, 201.1, 221.53, 188.65, 195.34, 194.91, 189.65, 189.85, 177.16, 164.58, 142.82, 156.48, 148.08, 145.4, 152.96, 155.11, 149.68, 139.66, 145.54, 155.62, 177.58, 173.28, 171.83, 195.95, 192.95, 192.08, 227.2] },
      velocityScore: { '1D': 0.5, '1W': 8.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$653B', pe: 40.7, revenueGrowth: 22, eps: 5.58, grossMargin: 67, dividendYield: 0.89,
      etfPresence: { AIS: false, ARTY: 4.37, BAI: false, IVEP: false, IGPT: false, IVES: 3.96, ALAI: false, CHAT: 1.68 },
      tonyNote: 'Oracle lands in 3 AI ETFs on the strength of its cloud database and AI infrastructure contracts. Revenue grew 22%, 67% gross margin, P/E of 40x. The 17.5% weekly return following a major earnings beat shows how quickly sentiment can reprice; the weight score at 2.04% is still modest, meaning ETF managers have started building positions but conviction is not yet deep.',
    },
    {
      ticker: 'NBIS', name: 'NEBIUS GROUP NV', easyScore: 3, avgWeight: 3.31, proScore: 2.03, coverage: 0.375,
      price: 254.79, weeklyPrices: [208.06, 208.37, 226.34, 231.09, 254.79], weeklyChange: 22.46, sortRank: 0, periodReturns: { '1M': 64.9, '6M': 154.4, '1Y': 607.4 },
      priceHistory: { '1W': [208.06, 208.37, 226.34, 231.09, 254.79], '1M': [154.49, 176.42, 175.92, 195.09, 184.77, 177.05, 186.1, 179.11, 207.27, 221.15, 219.94, 199.86, 197.73, 191.82, 219.93, 214.77, 208.06, 208.37, 226.34, 231.09, 254.79], '6M': [100.15, 100.33, 81.14, 93.23, 85.17, 96.21, 101.98, 96.85, 94.91, 73.87, 89.73, 97.92, 91.19, 95.65, 108.04, 121.52, 105.97, 108.82, 144.97, 157.14, 147.16, 154.49, 177.05, 219.94, 214.77, 254.79], '1Y': [36.02, 52.58, 50.46, 51.02, 50.31, 46.05, 53.53, 51.01, 50.4, 55.17, 75.33, 67.19, 70.48, 65.65, 93.39, 94.08, 107.8, 112.27, 117.7, 128.15, 104.28, 121.83, 110.54, 102.22, 90.54, 88.88, 96.45, 96.41, 80.95, 90.03, 83.71, 97.3, 103.89, 94.5, 85.19, 86.1, 89.73, 97.92, 91.19, 89.33, 112.95, 117.62, 100.82, 112.54, 154.56, 159.16, 147.16, 154.49, 177.05, 219.94, 214.77, 254.79] },
      velocityScore: { '1D': -7.3, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$65B', pe: 98.4, revenueGrowth: 684, eps: 2.59, grossMargin: 72, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 3.01, ALAI: 4.2, CHAT: 2.72 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 5, avgWeight: 2.47, proScore: 1.95, coverage: 0.625,
      price: 555, weeklyPrices: [524.65, 530.60, 531.18, 531.21, 555.00], weeklyChange: 5.78, sortRank: 0, periodReturns: { '1M': 28.6, '6M': 239.4, '1Y': 963.4 },
      priceHistory: { '1W': [524.65, 530.6, 531.18, 531.21, 555], '1M': [431.52, 442.36, 465.26, 483.15, 463.91, 480, 515.83, 488.74, 494.09, 489.15, 482.02, 458.68, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 531.18, 531.21, 555], '6M': [163.54, 169.78, 172.04, 176.76, 176.06, 199.88, 215, 243.29, 278.41, 260.19, 284.1, 285.52, 279.7, 259.03, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 431.52, 480, 482.02, 484.28, 555], '1Y': [52.19, 57.02, 57.41, 62.07, 63.84, 64.64, 67.53, 67.06, 70.61, 75.84, 75.91, 75.86, 79.71, 86, 95.02, 100.94, 110.25, 120.06, 119.93, 113.13, 121.41, 124.92, 152.18, 169.99, 152.86, 155.41, 159.99, 169.54, 174.58, 178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 284.1, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 404, 431.52, 480, 482.02, 484.28, 555] },
      velocityScore: { '1D': -6.3, '1W': 2.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$191B', pe: 33.2, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { AIS: 1.5, ARTY: 2.61, BAI: 2.77, IVEP: false, IGPT: false, IVES: false, ALAI: 4.33, CHAT: 1.12 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 4, avgWeight: 2.73, proScore: 1.93, coverage: 0.5,
      price: 912.99, weeklyPrices: [845.76, 870.66, 880.72, 879.80, 912.99], weeklyChange: 7.95, sortRank: 0, periodReturns: { '1M': 25.6, '6M': 238, '1Y': 666.3 },
      priceHistory: { '1W': [845.76, 870.66, 880.72, 879.8, 912.99], '1M': [726.93, 738.54, 771.01, 786.42, 766.44, 782.64, 834.01, 808.8, 817.35, 804.76, 795.47, 740.84, 733.35, 751.07, 810.46, 812.73, 845.76, 870.66, 880.72, 879.8, 912.99], '6M': [270.1, 285.41, 285.58, 282.85, 280.08, 308.26, 312.28, 346.53, 446.57, 405.45, 431.17, 411.11, 407.84, 367.34, 373.98, 434.6, 378.79, 429.36, 503.13, 547.75, 586.25, 726.93, 782.64, 795.47, 812.73, 912.99], '1Y': [119.15, 130.17, 131.04, 136.31, 145.04, 142.01, 149.05, 146.59, 152.68, 151.74, 155.59, 157.93, 165.24, 176.32, 193.04, 213.36, 228.13, 236.06, 225.01, 211.63, 214.57, 223, 250.38, 288, 253.86, 261.89, 266.87, 282.86, 288.13, 282.8, 275.39, 284.47, 320.32, 346.1, 407.69, 429.32, 431.17, 411.11, 407.84, 352.8, 383.71, 411.23, 380.07, 453.3, 513.28, 539.75, 586.25, 726.93, 782.64, 795.47, 812.73, 912.99] },
      velocityScore: { '1D': 5.5, '1W': 1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$207B', pe: 86.5, revenueGrowth: 44, eps: 10.56, grossMargin: 42, dividendYield: 0.34,
      etfPresence: { AIS: 2.67, ARTY: 2.96, BAI: false, IVEP: false, IGPT: 3.23, IVES: false, ALAI: 2.05, CHAT: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'AAPL', name: 'APPLE INC', easyScore: 2, avgWeight: 3.81, proScore: 1.9, coverage: 0.25,
      price: 310.18, weeklyPrices: [308.33, 310.85, 312.51, 312.06, 310.18], weeklyChange: 0.6, sortRank: 0, periodReturns: { '1M': 10.7, '6M': 9.6, '1Y': 53.8 },
      priceHistory: { '1W': [308.33, 310.85, 312.51, 312.06, 310.18], '1M': [280.14, 276.83, 284.18, 287.51, 287.44, 293.32, 292.68, 294.8, 298.87, 298.21, 300.23, 297.84, 298.97, 302.25, 304.99, 308.82, 308.33, 310.85, 312.51, 312.06, 310.18], '6M': [283.1, 277.89, 274.11, 270.97, 273.08, 260.33, 259.96, 248.35, 258.28, 275.91, 261.73, 264.58, 264.18, 260.29, 255.76, 248.96, 252.89, 255.92, 260.48, 270.23, 271.06, 280.14, 293.32, 300.23, 308.82, 310.18], '1Y': [201.7, 201.45, 198.42, 200.3, 207.82, 211.14, 209.11, 214.4, 211.27, 202.92, 229.65, 230.56, 229.31, 238.47, 226.79, 238.99, 254.43, 254.63, 256.48, 247.77, 262.77, 269, 270.04, 275.25, 267.44, 276.97, 286.19, 277.18, 274.61, 272.36, 271.86, 259.04, 258.21, 248.04, 259.48, 278.12, 261.73, 264.58, 264.18, 257.46, 250.12, 247.99, 248.8, 258.86, 259.2, 273.05, 271.06, 280.14, 293.32, 300.23, 308.82, 310.18] },
      velocityScore: { '1D': -8.7, '1W': -5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.6T', pe: 37.5, revenueGrowth: 17, eps: 8.27, grossMargin: 48, dividendYield: 0.35,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.45, ALAI: 3.17, CHAT: false },
      tonyNote: 'Apple is a selective AI holding — only 2 of 8 ETFs hold it at 3.81% average weight. Revenue up 17%, 48% gross margin, P/E of 38x — reasonable for the installed base franchise. The ETF managers treating it as an AI name are betting on on-device AI monetization through the App Store; the majority are not yet convinced, which explains the 25% coverage.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 4, avgWeight: 2.66, proScore: 1.88, coverage: 0.5,
      price: 964.87, weeklyPrices: [1070.47, 1031.89, 996.00, 968.32, 964.87], weeklyChange: -9.86, sortRank: 0, periodReturns: { '1M': -9.2, '6M': 67.3, '1Y': 98.9 },
      priceHistory: { '1W': [1070.47, 1031.89, 996, 968.32, 964.87], '1M': [1062.95, 1073.95, 1095.21, 1118.96, 1045.63, 1040.15, 1073.08, 1071.98, 1062.57, 1090.53, 1049.23, 1012.25, 1011.8, 1024.52, 1043.82, 1038.74, 1070.47, 1031.89, 996, 968.32, 964.87], '6M': [576.9, 621.9, 681.35, 661.81, 659.64, 662.32, 644.18, 661.67, 717.39, 737.53, 816.56, 830.34, 873.6, 815.01, 832.11, 877.39, 873.12, 898.57, 991.32, 1002.75, 1149.19, 1062.95, 1040.15, 1049.23, 1038.74, 964.87], '1Y': [485.16, 480, 487.88, 510.84, 506, 535.77, 559.61, 548.99, 632.67, 649.72, 657.44, 603.13, 625.91, 577.04, 643.56, 614.79, 633.41, 614.9, 606.12, 644.41, 585.33, 570.98, 547.96, 576.08, 554.93, 572.56, 601.58, 625.3, 686.22, 661.45, 653.57, 628.4, 642.23, 657.78, 726.37, 779.35, 816.56, 830.34, 873.6, 789.23, 805.02, 851.07, 853.16, 897.36, 991.12, 990.18, 1149.19, 1062.95, 1040.15, 1049.23, 1038.74, 964.87] },
      velocityScore: { '1D': 3.9, '1W': -10.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$259B', pe: 28.2, revenueGrowth: 16, eps: 34.18, grossMargin: 20, dividendYield: 0.21,
      etfPresence: { AIS: 2.63, ARTY: false, BAI: false, IVEP: 3.82, IGPT: false, IVES: 3.11, ALAI: 1.08, CHAT: false },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 4, avgWeight: 2.64, proScore: 1.87, coverage: 0.5,
      price: 325, weeklyPrices: [323.91, 319.78, 314.18, 315.71, 325.00], weeklyChange: 0.34, sortRank: 0, periodReturns: { '1M': -1, '6M': 81.3, '1Y': 197.5 },
      priceHistory: { '1W': [323.91, 319.78, 314.18, 315.71, 325], '1M': [328.31, 330.97, 341.02, 358.92, 340.01, 339.97, 367.92, 367.13, 369.99, 376.23, 370.94, 339.73, 322.63, 315.67, 323.4, 327.46, 323.91, 319.78, 314.18, 315.71, 325], '6M': [179.22, 185.61, 161.74, 166.25, 164.34, 171.54, 170.86, 181.12, 195.1, 177.75, 236.51, 243.75, 254.89, 249.75, 265.38, 269.17, 252.4, 261.29, 295.11, 307.34, 323.46, 328.31, 339.97, 370.94, 327.46, 325], '1Y': [109.23, 112, 116.45, 122.32, 122.54, 128.37, 127.37, 125.29, 142.7, 138.76, 143.72, 129.05, 127.93, 125.59, 136.74, 136.83, 142.61, 150.86, 158.87, 175.15, 174.8, 190.57, 180.82, 179.05, 164.86, 169.57, 180.91, 178.38, 160.66, 166.26, 162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 236.51, 243.75, 254.89, 241.78, 258.88, 255.88, 251.07, 258.73, 299.96, 314.41, 323.46, 328.31, 339.97, 370.94, 327.46, 325] },
      velocityScore: { '1D': null, '1W': -6.5, '1M': null, '6M': null }, isNew: true,
      marketCap: '$125B', pe: 81.7, revenueGrowth: 30, eps: 3.98, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 3.74, ARTY: false, BAI: 1.9, IVEP: 4.07, IGPT: false, IVES: false, ALAI: false, CHAT: 0.84 },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc. Class C', easyScore: 1, avgWeight: 5.01, proScore: 1.77, coverage: 0.125,
      price: 371.55, weeklyPrices: [384.84, 384.83, 386.12, 376.43, 371.55], weeklyChange: -3.45, sortRank: 0, periodReturns: { '1M': -3, '6M': 17.9, '1Y': 118.1 },
      priceHistory: { '1W': [384.84, 384.83, 386.12, 376.43, 371.55], '1M': [383.22, 379.64, 384.27, 395.14, 395.3, 397.05, 386.77, 383.82, 399.04, 397.17, 393.32, 393.11, 384.9, 384.9, 383.47, 379.38, 384.84, 384.83, 386.12, 376.43, 371.55], '6M': [315.12, 314.45, 309.32, 311.33, 314.55, 322.43, 336.31, 330.84, 338.66, 331.33, 309.37, 314.9, 311.43, 300.91, 303.21, 305.73, 280.74, 294.46, 315.72, 339.4, 342.32, 383.22, 397.05, 393.32, 379.38, 371.55], '1Y': [170.37, 177.63, 177.94, 167.74, 176.91, 177.66, 183.1, 192.11, 196.43, 195.32, 204.16, 202.49, 207.95, 231.1, 239.56, 249.85, 252.34, 243.55, 247.13, 246.19, 251.34, 268.43, 278.06, 291.74, 284.96, 323.64, 316.02, 317.75, 307.73, 315.68, 313.8, 326.01, 333.16, 328.43, 338.53, 323.1, 309.37, 314.9, 311.43, 298.3, 301.46, 298.79, 273.76, 297.66, 319.21, 335.4, 342.32, 383.22, 397.05, 393.32, 379.38, 371.55] },
      velocityScore: { '1D': -23.7, '1W': -19.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.5T', pe: 28.4, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: 5.01, CHAT: false },
      tonyNote: 'Alphabet Inc. Class C appears in 1 of 8 AI & ML ETFs (13% coverage) with average weight 5.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CLASS A CORP', easyScore: 2, avgWeight: 3.33, proScore: 1.67, coverage: 0.25,
      price: 271.77, weeklyPrices: [302.40, 293.80, 290.01, 285.00, 271.77], weeklyChange: -10.13, sortRank: 0, periodReturns: { '1M': -6.5, '6M': 174.7, '1Y': 1386.7 },
      priceHistory: { '1W': [302.4, 293.8, 290.01, 285, 271.77], '1M': [290.52, 288.64, 295.25, 285.47, 258.64, 261.03, 283.92, 280.69, 289.76, 303.41, 275.95, 258.71, 261.34, 282.31, 307.88, 302.49, 302.4, 293.8, 290.01, 285, 271.77], '6M': [98.93, 111.79, 89.58, 92.26, 87.26, 108, 133.46, 145.63, 156.51, 136.6, 139.03, 147.55, 155.67, 159.99, 157.17, 166.69, 133.52, 135.63, 166.7, 207.86, 231.17, 290.52, 261.03, 275.95, 302.49, 271.77], '1Y': [18.28, 21.43, 22.91, 22.95, 22.13, 28.71, 25.31, 25.93, 34.75, 37.61, 41.25, 43.1, 49.94, 52.45, 62.96, 79.67, 77.38, 84.57, 86.06, 114.06, 104.38, 113.28, 129.05, 127.07, 104.97, 94.29, 105, 109.44, 87.61, 91.43, 86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.03, 147.55, 155.67, 135.19, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 231.17, 290.52, 261.03, 275.95, 302.49, 271.77] },
      velocityScore: { '1D': -7.7, '1W': -6.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$77B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { AIS: false, ARTY: 1.51, BAI: false, IVEP: 5.16, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 6.84, proScore: 6.84, coverage: 1,
      price: 1027.68, weeklyPrices: [895.88, 928.41, 923.52, 971.00, 1027.68], weeklyChange: 14.71, sortRank: 0, periodReturns: { '1M': 89.5, '6M': 327.4, '1Y': 946.7 },
      priceHistory: { '1W': [895.88, 928.41, 923.52, 971, 1027.68], '1M': [542.21, 576.45, 640.2, 666.59, 646.63, 746.81, 795.33, 766.58, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1027.68], '6M': [240.46, 246.92, 237.5, 276.59, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 1027.68], '1Y': [98.18, 110.95, 119.84, 127.91, 120.89, 122.24, 120.11, 109.22, 111.96, 109.06, 127.75, 122.05, 116.5, 118.72, 140, 159.99, 166.41, 167.32, 185.69, 187.06, 202.29, 221.91, 218.03, 241.11, 228.5, 224.53, 239.49, 252.42, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 496.72, 542.21, 746.81, 724.66, 751, 1027.68] },
      velocityScore: { '1D': 5.1, '1W': 19, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 48.5, revenueGrowth: 196, eps: 21.17, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { SOXX: 11.62, PSI: 7.56, XSD: 3.45, DRAM: 4.72 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 7.03, proScore: 6.09, coverage: 0.75,
      price: 503.3, weeklyPrices: [503.89, 495.54, 518.09, 516.10, 503.30], weeklyChange: -0.12, sortRank: 0, periodReturns: { '1M': 39.6, '6M': 129, '1Y': 339.1 },
      priceHistory: { '1W': [503.89, 495.54, 518.09, 516.1, 503.3], '1M': [360.54, 341.54, 355.26, 421.39, 408.46, 455.19, 458.79, 448.29, 445.5, 449.7, 424.1, 420.99, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 518.09, 516.1, 503.3], '6M': [219.76, 221.11, 207.58, 214.95, 215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 200.21, 199.45, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 467.51, 503.3], '1Y': [114.63, 121.73, 126.39, 138.43, 136.11, 138.41, 155.61, 154.72, 177.44, 174.31, 174.95, 166.55, 166.62, 162.13, 159.54, 159.16, 160.9, 161.79, 211.51, 218.09, 238.03, 258.01, 250.05, 237.52, 230.29, 206.13, 215.24, 221.62, 209.17, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 205.94, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 347.81, 360.54, 455.19, 424.1, 467.51, 503.3] },
      velocityScore: { '1D': 1, '1W': 6.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$821B', pe: 168.3, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 9.49, PSI: 7.85, XSD: 3.74, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'MXL', name: 'MaxLinear Inc', easyScore: 2, avgWeight: 7.64, proScore: 5.4, coverage: 0.5,
      price: 90.11, weeklyPrices: [96.12, 101.10, 97.76, 92.93, 90.11], weeklyChange: -6.25, sortRank: 0, periodReturns: { '1M': 16.8, '6M': 460.4, '1Y': 668.2 },
      priceHistory: { '1W': [96.12, 101.1, 97.76, 92.93, 90.11], '1M': [77.18, 78.12, 81.68, 81.23, 82.37, 99.83, 102.27, 91.93, 87.73, 88.78, 92.34, 87.46, 94.86, 96.77, 99.67, 99.16, 96.12, 101.1, 97.76, 92.93, 90.11], '6M': [16.08, 19.51, 17.2, 18.05, 17.7, 18.65, 18.08, 19.38, 19.27, 17.11, 18.87, 18.47, 17.43, 16.39, 16.5, 17.1, 17.16, 17.98, 20.69, 26.27, 60.32, 77.18, 99.83, 92.34, 99.16, 90.11], '1Y': [11.73, 12.58, 12.11, 13.6, 14.2, 14.91, 14.4, 15.44, 17.31, 15.12, 15.97, 14.36, 17.22, 15.23, 15.78, 16.16, 16.53, 16.08, 15.59, 16.88, 17.83, 15.77, 14.32, 14.8, 13.1, 15.46, 16.59, 19.45, 17.14, 17.69, 17.43, 18.57, 19.19, 18.41, 17.35, 18.72, 18.87, 18.47, 17.43, 15.72, 16.89, 16.56, 17, 18.45, 21.31, 31.73, 60.32, 77.18, 99.83, 92.34, 99.16, 90.11] },
      velocityScore: { '1D': -2.7, '1W': -7.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$8B', pe: null, revenueGrowth: 43, eps: -1.52, grossMargin: 57, dividendYield: null,
      etfPresence: { SOXX: false, PSI: 9.04, XSD: 6.24, DRAM: false },
      tonyNote: 'MaxLinear holds the highest average weight in the Semiconductor theme at 7.71% across 2 ETFs. Revenue grew 43%, 57% gross margin, but EPS is negative at -$1.52 and the market cap is only $8B. The 716% 1-year return is an extreme recovery from the 2023 inventory correction lows; the two ETFs holding it are making a concentrated bet on a return to profitability in the analog semiconductor cycle.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 3, avgWeight: 4.44, proScore: 3.84, coverage: 0.75,
      price: 447, weeklyPrices: [422.01, 421.86, 426.58, 446.77, 447.00], weeklyChange: 5.92, sortRank: 0, periodReturns: { '1M': 6.1, '6M': 15.8, '1Y': 79.7 },
      priceHistory: { '1W': [422.01, 421.86, 426.58, 446.77, 447], '1M': [421.28, 416.5, 427.36, 425.44, 412.56, 430, 428.43, 419.3, 416.79, 439.79, 425.19, 420.71, 411.07, 417.76, 414.57, 414.14, 422.01, 421.86, 426.58, 446.77, 447], '6M': [386.08, 401.1, 339.81, 341.45, 349.85, 343.5, 339.89, 325.49, 330.73, 310.51, 331.17, 332.65, 319.55, 332.77, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 425.19, 414.14, 447], '1Y': [248.71, 244.28, 252.1, 263.77, 264.74, 277.9, 280.94, 278.59, 297.42, 292.93, 312.83, 294.91, 298.01, 302.39, 369.57, 346.17, 338.94, 329.91, 336.41, 344.13, 342.66, 372.97, 351.94, 351.96, 340.5, 385.03, 381.57, 406.29, 341.3, 349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 331.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 422.76, 421.28, 430, 425.19, 414.14, 447] },
      velocityScore: { '1D': 5.8, '1W': 4.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.1T', pe: 87, revenueGrowth: 30, eps: 5.14, grossMargin: 77, dividendYield: 0.58,
      etfPresence: { SOXX: 6.9, PSI: 4.47, XSD: 1.95, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 2, avgWeight: 4.88, proScore: 3.45, coverage: 0.5,
      price: 109.16, weeklyPrices: [123.52, 121.77, 120.89, 114.68, 109.16], weeklyChange: -11.63, sortRank: 0, periodReturns: { '1M': 9.6, '6M': 172.8, '1Y': 453 },
      priceHistory: { '1W': [123.52, 121.77, 120.89, 114.68, 109.16], '1M': [99.62, 95.78, 108.15, 113.01, 109.62, 124.92, 129.44, 120.61, 120.29, 115.93, 108.77, 108.17, 110.8, 118.96, 118.5, 119.84, 123.52, 121.77, 120.89, 114.68, 109.16], '6M': [40.01, 40.3, 37.51, 36.37, 37.3, 42.63, 48.72, 54.32, 48.66, 48.24, 46.48, 44.11, 45.61, 45.95, 45.25, 46.18, 44.1, 50.38, 62.38, 68.5, 82.54, 99.62, 124.92, 108.77, 119.84, 109.16], '1Y': [19.74, 20.48, 20.74, 22.55, 22.85, 23.44, 22.92, 23.24, 20.41, 20.19, 21.81, 25.31, 24.35, 24, 24.77, 24.9, 29.34, 33.55, 37.17, 35.63, 38.12, 41.53, 37.03, 37.88, 34.33, 35.83, 43.47, 40.5, 37.31, 36.35, 36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.48, 44.11, 45.61, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 82.54, 99.62, 124.92, 108.77, 119.84, 109.16] },
      velocityScore: { '1D': -4.2, '1W': -8.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$549B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 6.2, PSI: false, XSD: 3.56, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 4.78, proScore: 3.38, coverage: 0.5,
      price: 207.01, weeklyPrices: [208.26, 198.70, 204.83, 205.00, 207.01], weeklyChange: -0.6, sortRank: 0, periodReturns: { '1M': 25.5, '6M': 127.2, '1Y': 236.8 },
      priceHistory: { '1W': [208.26, 198.7, 204.83, 205, 207.01], '1M': [164.95, 163.66, 168.75, 172.15, 160.01, 170.13, 170.84, 164.5, 177.95, 182.58, 176.89, 168.93, 176.27, 186.8, 190.69, 196.33, 208.26, 198.7, 204.83, 205, 207.01], '6M': [91.1, 92, 84.26, 84.8, 86.76, 84.64, 81.21, 83.1, 81.34, 74.21, 78.23, 79.48, 81.69, 75.68, 87.67, 89.53, 97.68, 107.11, 128.49, 139.69, 164.31, 164.95, 170.13, 176.89, 196.33, 207.01], '1Y': [61.47, 69.14, 70.42, 75.21, 76.24, 72.26, 72.41, 71.99, 76.34, 76.63, 77.81, 72.07, 74.26, 62.31, 67.1, 70.98, 74.62, 84.07, 86.97, 86.22, 84.26, 88.46, 87.59, 89.33, 78.68, 83.43, 92.89, 88.9, 84.07, 87.68, 84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.23, 79.48, 81.69, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 164.31, 164.95, 170.13, 176.89, 196.33, 207.01] },
      velocityScore: { '1D': 1.2, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$181B', pe: 71.1, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.12,
      etfPresence: { SOXX: 6.19, PSI: false, XSD: 3.37, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 3.71, proScore: 3.21, coverage: 0.75,
      price: 218.93, weeklyPrices: [214.86, 212.60, 214.25, 211.14, 218.93], weeklyChange: 1.89, sortRank: 0, periodReturns: { '1M': 10.3, '6M': 21.7, '1Y': 59.4 },
      priceHistory: { '1W': [214.86, 212.6, 214.25, 211.14, 218.93], '1M': [198.45, 198.48, 196.5, 207.83, 211.5, 215.2, 219.44, 220.78, 225.83, 235.74, 225.32, 222.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 214.25, 211.14, 218.93], '6M': [179.92, 185.55, 176.29, 183.69, 187.54, 189.11, 183.14, 184.84, 192.51, 171.88, 186.94, 189.82, 177.19, 183.34, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 225.32, 215.33, 218.93], '1Y': [137.38, 142.63, 144.69, 147.9, 153.3, 162.88, 170.7, 167.03, 175.51, 178.26, 183.16, 175.64, 181.77, 170.62, 177.33, 170.29, 178.43, 186.58, 185.04, 180.03, 181.16, 201.03, 198.69, 193.16, 181.36, 177.82, 181.46, 184.97, 177.72, 189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 186.94, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 208.27, 198.45, 215.2, 225.32, 215.33, 218.93] },
      velocityScore: { '1D': -0.3, '1W': -5.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.3T', pe: 33.6, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.47,
      etfPresence: { SOXX: 5.88, PSI: 3.56, XSD: 1.69, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 3, avgWeight: 3.5, proScore: 3.03, coverage: 0.75,
      price: 301.07, weeklyPrices: [324.89, 317.45, 315.95, 305.68, 301.07], weeklyChange: -7.33, sortRank: 0, periodReturns: { '1M': 7.1, '6M': 79, '1Y': 63.4 },
      priceHistory: { '1W': [324.89, 317.45, 315.95, 305.68, 301.07], '1M': [281.02, 280.89, 281, 289.44, 285.24, 287.8, 297.76, 295.17, 306.34, 308.17, 302.73, 300.6, 302.31, 304.88, 298.39, 309.21, 324.89, 317.45, 315.95, 305.68, 301.07], '6M': [168.16, 180.94, 177.97, 178.82, 175.42, 185.71, 193.45, 194.99, 218.97, 223.98, 223, 219.73, 212.11, 197.98, 190.05, 188.29, 193.41, 194.87, 214.73, 229.82, 277.14, 281.02, 287.8, 302.73, 309.21, 301.07], '1Y': [184.21, 199.21, 199.22, 205.81, 210.45, 216.39, 218.36, 214.92, 191.38, 185.4, 192.97, 195.94, 205.98, 195.74, 184.01, 180.3, 182.04, 183.73, 177.05, 173.94, 180.84, 166.91, 159.36, 159.73, 157.32, 161.77, 175.26, 179.52, 177.56, 177.08, 173.49, 188.45, 189.12, 193.31, 215.55, 221.44, 223, 219.73, 212.11, 193.23, 190.78, 187.19, 190.33, 199.42, 216.71, 233.7, 277.14, 281.02, 287.8, 302.73, 309.21, 301.07] },
      velocityScore: { '1D': -1.9, '1W': -4.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$274B', pe: 51.6, revenueGrowth: 19, eps: 5.84, grossMargin: 57, dividendYield: 1.86,
      etfPresence: { SOXX: 3.56, PSI: 4.66, XSD: 2.29, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 4.17, proScore: 2.95, coverage: 0.5,
      price: 445.74, weeklyPrices: [454.89, 448.25, 449.68, 450.06, 445.74], weeklyChange: -2.01, sortRank: 0, periodReturns: { '1M': 14.6, '6M': 75, '1Y': 183.4 },
      priceHistory: { '1W': [454.89, 448.25, 449.68, 450.06, 445.74], '1M': [389.08, 391.38, 410.82, 428.62, 410.64, 435.44, 443.62, 431.2, 436.61, 440.56, 436.62, 413.57, 406.91, 426.85, 427.36, 432.16, 454.89, 448.25, 449.68, 450.06, 445.74], '6M': [254.75, 268.16, 261.27, 259.01, 259.97, 292.2, 301.89, 318.79, 341.34, 303.99, 328.39, 375.38, 372.3, 346.53, 337.27, 357.21, 338.55, 348.47, 399.49, 396.94, 417.04, 389.08, 435.44, 436.62, 432.16, 445.74], '1Y': [157.27, 169.79, 176.55, 180.18, 183.76, 195.39, 199.29, 187.14, 188.41, 179.15, 188.45, 162.22, 164.51, 156.25, 163.42, 178.13, 200.87, 204.74, 211.56, 218.19, 226, 227.64, 230.19, 228.67, 225.12, 242.46, 265.33, 267.14, 258.84, 260.23, 256.99, 281.64, 319.08, 322.38, 322.32, 322.51, 328.39, 375.38, 372.3, 324.74, 341.53, 357.06, 337.17, 352.62, 395.73, 391.62, 417.04, 389.08, 435.44, 436.62, 432.16, 445.74] },
      velocityScore: { '1D': 1.4, '1W': 0.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$354B', pe: 42, revenueGrowth: 11, eps: 10.62, grossMargin: 49, dividendYield: 0.47,
      etfPresence: { SOXX: 4.45, PSI: 3.88, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 3.8, proScore: 2.69, coverage: 0.5,
      price: 313.14, weeklyPrices: [322.68, 318.93, 318.00, 318.18, 313.14], weeklyChange: -2.96, sortRank: 0, periodReturns: { '1M': 22, '6M': 102.3, '1Y': 279.7 },
      priceHistory: { '1W': [322.68, 318.93, 318, 318.18, 313.14], '1M': [256.72, 258.57, 275.8, 297.17, 286.52, 294.05, 296.05, 289.24, 295.44, 299.15, 284.72, 277.96, 273.38, 292.09, 302.24, 305.35, 322.68, 318.93, 318, 318.18, 313.14], '6M': [154.79, 162.74, 164.3, 175.26, 173.78, 203.08, 208.79, 220.7, 248.17, 213.31, 231.29, 244.92, 233.89, 214.68, 209.49, 233.99, 211.62, 218.44, 263.66, 267.6, 267.78, 256.72, 294.05, 284.72, 305.35, 313.14], '1Y': [82.48, 88.3, 93.41, 95.63, 96.81, 99.81, 101.07, 97.69, 98.94, 96.68, 105.28, 100.33, 103.63, 97.74, 107.36, 121.9, 131.93, 133.9, 140.35, 138.31, 145.04, 155.62, 155.78, 159.18, 143.24, 151.93, 158.19, 165.81, 163.26, 175.16, 171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 231.29, 244.92, 233.89, 199.33, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 267.78, 256.72, 294.05, 284.72, 305.35, 313.14] },
      velocityScore: { '1D': 1.5, '1W': 1.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$392B', pe: 59.3, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.33,
      etfPresence: { SOXX: 3.36, PSI: 4.24, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 3.64, proScore: 2.57, coverage: 0.5,
      price: 1916.91, weeklyPrices: [2011.39, 1957.19, 1927.63, 1921.71, 1916.91], weeklyChange: -4.7, sortRank: 0, periodReturns: { '1M': 11, '6M': 65.7, '1Y': 151.4 },
      priceHistory: { '1W': [2011.39, 1957.19, 1927.63, 1921.71, 1916.91], '1M': [1726.26, 1713.32, 1732.9, 1816.29, 1763.25, 1869.19, 1845.19, 1811.35, 1849.71, 1892.94, 1804.32, 1756.45, 1740.58, 1829.47, 1842.18, 1888.38, 2011.39, 1957.19, 1927.63, 1921.71, 1916.91], '6M': [1157.18, 1224.59, 1225.11, 1265.66, 1243.65, 1359.69, 1434.5, 1500, 1684.71, 1331.03, 1450.85, 1496, 1524.55, 1429.36, 1409.57, 1511.52, 1451.13, 1516.84, 1737.28, 1791.44, 1935, 1726.26, 1869.19, 1804.32, 1888.38, 1916.91], '1Y': [762.44, 829.29, 892.38, 889.03, 898.85, 923.18, 936.53, 892.22, 916.09, 883.41, 935.53, 876.08, 888.1, 843.9, 932.63, 989.87, 1071.2, 1078.6, 1084.74, 1025.71, 1147.43, 1206.04, 1193.49, 1190.9, 1123.09, 1145.89, 1189.86, 1225.61, 1223.37, 1268.75, 1215.08, 1324.6, 1544.96, 1512.78, 1427.94, 1442.95, 1450.85, 1496, 1524.55, 1344.55, 1418.64, 1498.67, 1443.21, 1540.06, 1768.78, 1805.32, 1935, 1726.26, 1869.19, 1804.32, 1888.38, 1916.91] },
      velocityScore: { '1D': 0.8, '1W': -1.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$250B', pe: 54.2, revenueGrowth: 12, eps: 35.36, grossMargin: 61, dividendYield: 0.48,
      etfPresence: { SOXX: 3.11, PSI: 4.17, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp/DE', easyScore: 1, avgWeight: 5.11, proScore: 2.56, coverage: 0.25,
      price: 1795.53, weeklyPrices: [1589.55, 1589.94, 1641.64, 1694.98, 1795.53], weeklyChange: 12.96, sortRank: 0, periodReturns: { '1M': 51.3, '6M': 754.3, '1Y': 4709.9 },
      priceHistory: { '1W': [1589.55, 1589.94, 1641.64, 1694.98, 1795.53], '1M': [1187, 1255.86, 1406.32, 1409.98, 1339.96, 1562.34, 1547.56, 1452.02, 1447.23, 1382.72, 1407.61, 1333.01, 1383.29, 1392.56, 1542.24, 1478.69, 1589.55, 1589.94, 1641.64, 1694.98, 1795.53], '6M': [210.17, 225.47, 201.87, 241.05, 240.22, 353.56, 387.81, 503.44, 539.3, 576.2, 630.29, 649.97, 635.36, 565.59, 618.82, 772.09, 603.17, 701.59, 851.77, 920.99, 989.9, 1187, 1562.34, 1407.61, 1478.69, 1795.53], '1Y': [37.33, 41.82, 44.21, 47.34, 44.96, 46.2, 42.72, 41.36, 42.93, 41.93, 46.83, 44.58, 47.35, 53.01, 73.92, 93.97, 106.4, 112.2, 120.95, 127.29, 149.29, 175.53, 194.57, 271.58, 244.93, 220.5, 205.35, 219.46, 209.31, 244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 630.29, 649.97, 635.36, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 989.9, 1187, 1562.34, 1407.61, 1478.69, 1795.53] },
      velocityScore: { '1D': -0.4, '1W': -3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$266B', pe: 61.2, revenueGrowth: 251, eps: 29.32, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 5.11 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 3.56, proScore: 2.52, coverage: 0.5,
      price: 232.53, weeklyPrices: [248.82, 233.40, 243.29, 251.02, 232.53], weeklyChange: -6.55, sortRank: 0, periodReturns: { '1M': 31.4, '6M': 38.4, '1Y': 58.6 },
      priceHistory: { '1W': [248.82, 233.4, 243.29, 251.02, 232.53], '1M': [177.01, 168.38, 186.55, 192.57, 202.55, 219.09, 237.53, 210.31, 213.17, 200.08, 201.49, 203.64, 195.61, 202.51, 213.41, 238.16, 248.82, 233.4, 243.29, 251.02, 232.53], '6M': [168.04, 175.31, 179.26, 174.22, 173.65, 180.19, 164.54, 157.8, 152.22, 136.3, 138.47, 142.88, 142.36, 137, 131.15, 131.28, 130.54, 126.8, 128.06, 136.2, 148.85, 177.01, 219.09, 201.49, 238.16, 232.53], '1Y': [146.63, 155.41, 156.87, 155.71, 159.4, 159.35, 154.3, 157.99, 162.08, 146.71, 153.73, 156.25, 159.17, 157.28, 158.95, 165.26, 169.53, 166.36, 165.46, 161.74, 168.83, 181.03, 172.84, 173.98, 165.06, 163.3, 170.7, 176, 176.12, 174.75, 171.05, 181.87, 161.39, 155.82, 151.59, 137.34, 138.47, 142.88, 142.36, 135.69, 129.82, 129.9, 127.11, 125.73, 131.24, 137.52, 148.85, 177.01, 219.09, 201.49, 238.16, 232.53] },
      velocityScore: { '1D': 4.6, '1W': 1.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$245B', pe: 25, revenueGrowth: -4, eps: 9.29, grossMargin: 55, dividendYield: 1.47,
      etfPresence: { SOXX: 4.35, PSI: false, XSD: 2.78, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 3.24, proScore: 2.29, coverage: 0.5,
      price: 328, weeklyPrices: [318.72, 325.33, 349.17, 342.85, 328.00], weeklyChange: 2.91, sortRank: 0, periodReturns: { '1M': 61.8, '6M': 98.6, '1Y': 253 },
      priceHistory: { '1W': [318.72, 325.33, 349.17, 342.85, 328], '1M': [202.68, 201.25, 215.69, 213.91, 195.65, 199.79, 207.35, 204.42, 224.09, 228.64, 232.68, 215.58, 244.26, 287.48, 297.84, 306.88, 318.72, 325.33, 349.17, 342.85, 328], '6M': [165.19, 175.74, 143.66, 172.62, 170.84, 165.77, 172.14, 176.35, 160.46, 142.82, 126.58, 129.68, 118.83, 120, 119.9, 126.16, 113.61, 117.14, 149.05, 174.05, 212.84, 202.68, 199.79, 232.68, 306.88, 328], '1Y': [92.92, 92.35, 95.3, 87.26, 88.66, 99.86, 92.36, 116.91, 118.41, 135.54, 192, 171.06, 178.56, 176.61, 230.37, 249.38, 230.11, 195.8, 212.1, 161.55, 157.51, 168.25, 179.31, 167.55, 139.52, 144.78, 142.94, 167.08, 144.94, 168.83, 166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 126.58, 129.68, 118.83, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 212.84, 202.68, 199.79, 232.68, 306.88, 328] },
      velocityScore: { '1D': 0, '1W': 8.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$56B', pe: 223.1, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.38, PSI: false, XSD: 4.09, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 1, avgWeight: 4.19, proScore: 2.1, coverage: 0.25,
      price: 912.99, weeklyPrices: [845.76, 870.66, 880.72, 879.80, 912.99], weeklyChange: 7.95, sortRank: 0, periodReturns: { '1M': 25.6, '6M': 238, '1Y': 666.3 },
      priceHistory: { '1W': [845.76, 870.66, 880.72, 879.8, 912.99], '1M': [726.93, 738.54, 771.01, 786.42, 766.44, 782.64, 834.01, 808.8, 817.35, 804.76, 795.47, 740.84, 733.35, 751.07, 810.46, 812.73, 845.76, 870.66, 880.72, 879.8, 912.99], '6M': [270.1, 285.41, 285.58, 282.85, 280.08, 308.26, 312.28, 346.53, 446.57, 405.45, 431.17, 411.11, 407.84, 367.34, 373.98, 434.6, 378.79, 429.36, 503.13, 547.75, 586.25, 726.93, 782.64, 795.47, 812.73, 912.99], '1Y': [119.15, 130.17, 131.04, 136.31, 145.04, 142.01, 149.05, 146.59, 152.68, 151.74, 155.59, 157.93, 165.24, 176.32, 193.04, 213.36, 228.13, 236.06, 225.01, 211.63, 214.57, 223, 250.38, 288, 253.86, 261.89, 266.87, 282.86, 288.13, 282.8, 275.39, 284.47, 320.32, 346.1, 407.69, 429.32, 431.17, 411.11, 407.84, 352.8, 383.71, 411.23, 380.07, 453.3, 513.28, 539.75, 586.25, 726.93, 782.64, 795.47, 812.73, 912.99] },
      velocityScore: { '1D': -3.7, '1W': -8.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$207B', pe: 86.5, revenueGrowth: 44, eps: 10.56, grossMargin: 42, dividendYield: 0.34,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 4.19 },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.94, proScore: 2.08, coverage: 0.5,
      price: 316.48, weeklyPrices: [332.67, 329.24, 330.28, 321.35, 316.48], weeklyChange: -4.87, sortRank: 0, periodReturns: { '1M': 7.2, '6M': 58.6, '1Y': 64.1 },
      priceHistory: { '1W': [332.67, 329.24, 330.28, 321.35, 316.48], '1M': [295.24, 290.76, 292.35, 303.55, 290.22, 294.75, 305.99, 294.23, 298.41, 294.17, 291.5, 291.68, 294.28, 310.15, 299.38, 316.47, 332.67, 329.24, 330.28, 321.35, 316.48], '6M': [199.49, 229.01, 231.83, 228.94, 219.98, 239.34, 240.81, 236.75, 233.5, 222.13, 242.19, 232.27, 227.01, 210.58, 191.22, 192.35, 196.92, 194.55, 204.37, 216.03, 244.04, 295.24, 294.75, 291.5, 316.47, 316.48], '1Y': [192.81, 213.08, 217.53, 218.51, 221.21, 230.42, 221.06, 228, 226.74, 208.47, 220.05, 229.27, 237.82, 228.2, 219.28, 221.89, 225.62, 227.73, 219.58, 216.11, 222.34, 212.96, 204.42, 202.86, 188.59, 191.02, 215.35, 228.05, 229.75, 225.98, 217.06, 237.89, 238.6, 232.48, 226.14, 224.32, 242.19, 232.27, 227.01, 201.74, 190.86, 191.37, 191.66, 197.08, 208, 221.34, 244.04, 295.24, 294.75, 291.5, 316.47, 316.48] },
      velocityScore: { '1D': -1.4, '1W': -2.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$80B', pe: 30.2, revenueGrowth: 12, eps: 10.48, grossMargin: 56, dividendYield: 1.26,
      etfPresence: { SOXX: 3.49, PSI: false, XSD: 2.39, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.78, proScore: 1.96, coverage: 0.5,
      price: 1562.05, weeklyPrices: [1662.98, 1620.17, 1633.17, 1566.21, 1562.05], weeklyChange: -6.07, sortRank: 0, periodReturns: { '1M': -1.4, '6M': 68.3, '1Y': 133.6 },
      priceHistory: { '1W': [1662.98, 1620.17, 1633.17, 1566.21, 1562.05], '1M': [1583.48, 1573.3, 1588.12, 1652.35, 1575.96, 1600.84, 1661.1, 1599.52, 1650.35, 1613.97, 1550.02, 1486.33, 1468.11, 1553.27, 1561.25, 1589.81, 1662.98, 1620.17, 1633.17, 1566.21, 1562.05], '6M': [928.35, 983.58, 949.4, 945.16, 923.91, 959.08, 983.6, 1076.67, 1183.15, 1155.99, 1155.93, 1204.1, 1142.74, 1078.44, 1033.88, 1092.69, 1058.28, 1118.49, 1353.85, 1468.35, 1632.06, 1583.48, 1600.84, 1550.02, 1589.81, 1562.05], '1Y': [668.66, 706.28, 706.59, 716.58, 746.97, 751.14, 717.62, 719.98, 724.37, 802.78, 840.56, 844.8, 850.64, 827.56, 855.18, 877.66, 914.27, 920.64, 945.49, 968.25, 1028.67, 1086.36, 957.87, 954.71, 856.96, 908.61, 952.18, 962.95, 951.36, 943.55, 906.36, 959.09, 1009.54, 1063.74, 1124.15, 1229.82, 1155.93, 1204.1, 1142.74, 1023.16, 1052.59, 1068.85, 1053.01, 1180.03, 1372.23, 1490.86, 1632.06, 1583.48, 1600.84, 1550.02, 1589.81, 1562.05] },
      velocityScore: { '1D': -3, '1W': -5.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$77B', pe: 112.1, revenueGrowth: 26, eps: 13.94, grossMargin: 55, dividendYield: 0.51,
      etfPresence: { SOXX: 3.38, PSI: false, XSD: 2.17, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 2.72, proScore: 1.92, coverage: 0.5,
      price: 119.86, weeklyPrices: [127.00, 124.89, 123.77, 120.62, 119.86], weeklyChange: -5.62, sortRank: 0, periodReturns: { '1M': 16.3, '6M': 137.7, '1Y': 181.8 },
      priceHistory: { '1W': [127, 124.89, 123.77, 120.62, 119.86], '1M': [103.03, 102.04, 102.67, 105.77, 100.61, 103.2, 107.24, 104.11, 115.71, 118.37, 113.11, 109.43, 106.02, 110.21, 109.61, 116.2, 127, 124.89, 123.77, 120.62, 119.86], '6M': [50.43, 56.38, 55.09, 56.37, 54.24, 61.89, 60.58, 63.07, 62.2, 63.1, 70.63, 69.11, 66.48, 60.85, 57.69, 59.29, 60.87, 62.19, 68.65, 83.01, 98.4, 103.03, 103.2, 113.11, 116.2, 119.86], '1Y': [42.54, 52.38, 53.88, 54.21, 53.6, 57.77, 58.93, 62.45, 58.38, 47.24, 50.01, 49.77, 50.99, 47.79, 48.13, 49.8, 50.42, 49.31, 48.17, 49.54, 55.08, 51.8, 48.28, 48.43, 45.56, 48.31, 51.48, 55.23, 54.56, 55.69, 54.15, 60.89, 60.28, 61.98, 59.89, 65.2, 70.63, 69.11, 66.48, 56.87, 58.55, 59.26, 58.35, 63.49, 71.02, 85.56, 98.4, 103.03, 103.2, 113.11, 116.2, 119.86] },
      velocityScore: { '1D': -1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$47B', pe: 88.1, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 2.41, PSI: false, XSD: 3.02, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 1, avgWeight: 3.71, proScore: 1.85, coverage: 0.25,
      price: 555, weeklyPrices: [524.65, 530.60, 531.18, 531.21, 555.00], weeklyChange: 5.78, sortRank: 0, periodReturns: { '1M': 28.6, '6M': 239.4, '1Y': 963.4 },
      priceHistory: { '1W': [524.65, 530.6, 531.18, 531.21, 555], '1M': [431.52, 442.36, 465.26, 483.15, 463.91, 480, 515.83, 488.74, 494.09, 489.15, 482.02, 458.68, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 531.18, 531.21, 555], '6M': [163.54, 169.78, 172.04, 176.76, 176.06, 199.88, 215, 243.29, 278.41, 260.19, 284.1, 285.52, 279.7, 259.03, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 431.52, 480, 482.02, 484.28, 555], '1Y': [52.19, 57.02, 57.41, 62.07, 63.84, 64.64, 67.53, 67.06, 70.61, 75.84, 75.91, 75.86, 79.71, 86, 95.02, 100.94, 110.25, 120.06, 119.93, 113.13, 121.41, 124.92, 152.18, 169.99, 152.86, 155.41, 159.99, 169.54, 174.58, 178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 284.1, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 404, 431.52, 480, 482.02, 484.28, 555] },
      velocityScore: { '1D': -4.1, '1W': -7.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$191B', pe: 33.2, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 3.71 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'NVTS', name: 'NAVITAS SEMICONDUCTOR CORP', easyScore: 1, avgWeight: 3.62, proScore: 1.81, coverage: 0.25,
      price: 24.94, weeklyPrices: [31.79, 28.88, 28.51, 26.60, 24.94], weeklyChange: -21.55, sortRank: 0, periodReturns: { '1M': 42.9, '6M': 200.5, '1Y': 351.8 },
      priceHistory: { '1W': [31.79, 28.88, 28.51, 26.6, 24.94], '1M': [17.45, 15.92, 17.55, 16.68, 15.79, 18.2, 22.65, 19.25, 21.17, 22.32, 21.32, 19.67, 19.43, 22.99, 24.38, 29.25, 31.79, 28.88, 28.51, 26.6, 24.94], '6M': [8.3, 9.6, 7.96, 7.9, 7.24, 10.31, 10.04, 11.29, 9.46, 7.43, 8.37, 7.88, 9, 8.96, 9.98, 9.17, 9.02, 8.8, 9.54, 12.32, 17.28, 17.45, 18.2, 21.32, 29.25, 24.94], '1Y': [5.52, 7.3, 7.19, 7.35, 6.27, 6.43, 6.23, 8.62, 7.52, 6.77, 6.96, 6.43, 6.09, 5.73, 5.64, 6.46, 6.88, 7.22, 7.78, 12.57, 15.03, 12.83, 10.46, 9.12, 7.78, 8.03, 8.32, 9.17, 7.83, 7.66, 7.14, 10.06, 10, 10.17, 8.58, 8.86, 8.37, 7.88, 9, 8.2, 10.1, 8.75, 8.28, 8.84, 9.82, 13.2, 17.28, 17.45, 18.2, 21.32, 29.25, 24.94] },
      velocityScore: { '1D': null, '1W': -10.4, '1M': null, '6M': null }, isNew: true,
      marketCap: '$6B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: 3.62, DRAM: false },
      tonyNote: 'Navitas Semiconductor is a small-cap wide-bandgap power semiconductor name — gallium nitride and silicon carbide for fast charging and EV applications. The $26.60 share price and small market cap position it as a speculative holding in ETFs willing to take higher-risk bets on next-generation power conversion.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'TSLA', name: 'Tesla Inc', easyScore: 2, avgWeight: 12.28, proScore: 6.14, coverage: 0.25,
      price: 423.94, weeklyPrices: [433.59, 440.36, 442.10, 435.79, 423.94], weeklyChange: -2.22, sortRank: 0, periodReturns: { '1M': 8.5, '6M': -1.4, '1Y': 23.7 },
      priceHistory: { '1W': [433.59, 440.36, 442.1, 435.79, 423.94], '1M': [390.82, 392.51, 389.37, 398.73, 411.79, 428.35, 445, 433.45, 445.27, 443.3, 422.24, 409.99, 404.11, 417.26, 417.85, 426.01, 433.59, 440.36, 442.1, 435.79, 423.94], '6M': [430.14, 439.58, 475.31, 488.73, 454.43, 431.41, 439.2, 449.36, 416.56, 397.21, 417.07, 411.82, 402.51, 405.55, 395.01, 380.3, 372.11, 360.59, 348.95, 400.62, 376.3, 390.82, 428.35, 422.24, 426.01, 423.94], '1Y': [342.69, 308.58, 329.13, 340.47, 300.71, 295.88, 310.78, 332.11, 321.2, 308.72, 340.84, 329.31, 351.67, 334.09, 347.79, 425.86, 425.85, 444.72, 433.09, 429.24, 442.6, 460.55, 444.26, 439.62, 401.25, 419.4, 429.24, 445.17, 489.88, 485.56, 449.72, 435.8, 438.57, 449.06, 430.41, 411.11, 417.07, 411.82, 402.51, 396.73, 391.2, 367.96, 361.83, 352.82, 352.42, 392.5, 376.3, 390.82, 428.35, 422.24, 426.01, 423.94] },
      velocityScore: { '1D': 18.8, '1W': 18.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.6T', pe: 388.9, revenueGrowth: 16, eps: 1.09, grossMargin: 19, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: false, GTEK: false, ARKK: 10.28, MARS: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
    {
      ticker: 'MSFT', name: 'Microsoft Corp', easyScore: 3, avgWeight: 8.79, proScore: 5.38, coverage: 0.375,
      price: 459.93, weeklyPrices: [416.03, 412.67, 426.99, 450.24, 459.93], weeklyChange: 10.55, sortRank: 0, periodReturns: { '1M': 11, '6M': -5.5, '1Y': -0.4 },
      priceHistory: { '1W': [416.03, 412.67, 426.99, 450.24, 459.93], '1M': [414.44, 413.62, 411.38, 413.96, 420.77, 415.12, 412.66, 407.77, 405.21, 409.43, 421.92, 423.54, 417.42, 421.06, 419.09, 418.57, 416.03, 412.67, 426.99, 450.24, 459.93], '6M': [486.74, 491.02, 474.82, 484.92, 487.48, 483.47, 459.38, 451.14, 433.5, 393.67, 401.84, 397.23, 392.74, 410.68, 401.86, 389.02, 365.97, 373.46, 370.87, 422.79, 424.62, 414.44, 415.12, 421.92, 418.57, 459.93], '1Y': [461.97, 472.75, 479.14, 490.11, 492.05, 503.51, 505.82, 505.27, 512.57, 527.75, 529.24, 509.77, 502.04, 505.35, 500.37, 510.02, 509.23, 517.95, 523.98, 513.57, 517.66, 542.07, 514.33, 508.68, 493.79, 476.99, 490, 492.02, 476.39, 486.85, 483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.84, 397.23, 392.74, 408.96, 395.55, 381.87, 356.77, 372.88, 384.37, 418.07, 424.62, 414.44, 415.12, 421.92, 418.57, 459.93] },
      velocityScore: { '1D': 8.5, '1W': 8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3.4T', pe: 27.4, revenueGrowth: 18, eps: 16.79, grossMargin: 68, dividendYield: 0.81,
      etfPresence: { PTF: false, WCLD: false, MAGS: 14.29, IGV: 8.01, FDTX: 4.06, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'GOOGL', name: 'Alphabet Inc-Cl A', easyScore: 1, avgWeight: 14.29, proScore: 5.05, coverage: 0.125,
      price: 375.6, weeklyPrices: [388.88, 388.83, 390.13, 380.34, 375.60], weeklyChange: -3.41, sortRank: 0, periodReturns: { '1M': -2.6, '6M': 19.3, '1Y': 122.2 },
      priceHistory: { '1W': [388.88, 388.83, 390.13, 380.34, 375.6], '1M': [385.69, 383.25, 388.43, 398.04, 397.99, 400.8, 388.64, 387.35, 402.62, 401.07, 396.78, 396.94, 387.66, 388.91, 387.66, 382.97, 388.88, 388.83, 390.13, 380.34, 375.6], '6M': [314.89, 313.72, 308.22, 309.78, 313.85, 321.98, 335.84, 330.54, 338.25, 331.25, 309, 314.98, 311.76, 300.88, 303.55, 307.13, 280.92, 295.77, 317.24, 341.68, 344.4, 385.69, 400.8, 396.78, 382.97, 375.6], '1Y': [169.03, 176.09, 176.77, 166.77, 175.84, 176.62, 182, 191.34, 195.75, 194.67, 203.34, 201.57, 207.14, 230.66, 239.17, 249.53, 251.66, 243.1, 245.76, 245.45, 250.46, 267.47, 277.54, 291.31, 284.28, 323.44, 315.81, 317.08, 306.57, 314.35, 313, 325.44, 332.78, 327.93, 338, 322.86, 309, 314.98, 311.76, 298.52, 302.28, 301, 274.34, 299.99, 321.31, 337.42, 344.4, 385.69, 400.8, 396.78, 382.97, 375.6] },
      velocityScore: { '1D': 21.1, '1W': 23.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.6T', pe: 28.6, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab Corp', easyScore: 1, avgWeight: 14.18, proScore: 5.01, coverage: 0.125,
      price: 131.1, weeklyPrices: [143.20, 150.23, 148.03, 143.48, 131.10], weeklyChange: -8.45, sortRank: 0, periodReturns: { '1M': 66.4, '6M': 224.8, '1Y': 392.9 },
      priceHistory: { '1W': [143.2, 150.23, 148.03, 143.48, 131.1], '1M': [78.81, 80.31, 78.76, 84.65, 78.58, 105.47, 117.35, 117.56, 124.15, 132.55, 124.77, 131.16, 127.31, 134.28, 125.45, 135.76, 143.2, 150.23, 148.03, 143.48, 131.1], '6M': [40.37, 51.56, 55.41, 77.55, 70.45, 84.08, 91.8, 87.98, 85.68, 66.32, 66.01, 70.86, 69.1, 70, 68.37, 71.93, 65.94, 67.73, 68.05, 84.8, 79.68, 78.81, 105.47, 124.77, 135.76, 131.1], '1Y': [26.6, 29.64, 26.55, 33.46, 34.33, 39.14, 44.6, 46.88, 43.79, 44.75, 43.43, 40.92, 48.13, 43.53, 46.17, 48.08, 52.91, 47.91, 61.51, 68.03, 65.4, 63.75, 56.57, 51.24, 42.78, 42.6, 41.9, 53.43, 55.49, 77.18, 69.76, 83.08, 90.76, 88.9, 80.07, 72.32, 66.01, 70.86, 69.1, 70.11, 68.41, 67.23, 60.93, 67.67, 70.62, 89.46, 79.68, 78.81, 105.47, 124.77, 135.76, 131.1] },
      velocityScore: { '1D': 13.9, '1W': 12.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$76B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 14.18 },
      tonyNote: 'Rocket Lab is the small-launch and space systems name that Electrification and AI infrastructure ETFs hold for satellite connectivity exposure — relevant to both GPS-dependent grids and low-orbit broadband that supports remote AI compute. Small market cap, no earnings, but consistent revenue growth and a rapidly expanding backlog.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 4, avgWeight: 6.28, proScore: 4.44, coverage: 0.5,
      price: 218.93, weeklyPrices: [214.86, 212.60, 214.25, 211.14, 218.93], weeklyChange: 1.89, sortRank: 0, periodReturns: { '1M': 10.3, '6M': 21.7, '1Y': 59.4 },
      priceHistory: { '1W': [214.86, 212.6, 214.25, 211.14, 218.93], '1M': [198.45, 198.48, 196.5, 207.83, 211.5, 215.2, 219.44, 220.78, 225.83, 235.74, 225.32, 222.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 214.25, 211.14, 218.93], '6M': [179.92, 185.55, 176.29, 183.69, 187.54, 189.11, 183.14, 184.84, 192.51, 171.88, 186.94, 189.82, 177.19, 183.34, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 225.32, 215.33, 218.93], '1Y': [137.38, 142.63, 144.69, 147.9, 153.3, 162.88, 170.7, 167.03, 175.51, 178.26, 183.16, 175.64, 181.77, 170.62, 177.33, 170.29, 178.43, 186.58, 185.04, 180.03, 181.16, 201.03, 198.69, 193.16, 181.36, 177.82, 181.46, 184.97, 177.72, 189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 186.94, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 208.27, 198.45, 215.2, 225.32, 215.33, 218.93] },
      velocityScore: { '1D': -6.5, '1W': -8.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.3T', pe: 33.6, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.47,
      etfPresence: { PTF: 4.42, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 5.27, GTEK: false, ARKK: 1.16, MARS: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 3, avgWeight: 7.18, proScore: 4.4, coverage: 0.375,
      price: 264.72, weeklyPrices: [265.29, 271.85, 274.00, 270.64, 264.72], weeklyChange: -0.21, sortRank: 0, periodReturns: { '1M': -1.3, '6M': 13.2, '1Y': 28.1 },
      priceHistory: { '1W': [265.29, 271.85, 274, 270.64, 264.72], '1M': [268.26, 272.05, 273.55, 274.99, 271.17, 272.68, 268.99, 265.82, 270.13, 267.22, 264.14, 264.86, 259.34, 265.01, 268.46, 266.32, 265.29, 271.85, 274, 270.64, 264.72], '6M': [233.88, 226.89, 222.54, 228.43, 232.53, 241.56, 236.65, 234.34, 241.73, 222.69, 199.6, 210.11, 210, 218.94, 209.53, 208.76, 207.54, 209.77, 238.38, 250.56, 263.99, 268.26, 272.68, 264.14, 266.32, 264.72], '1Y': [206.65, 216.98, 216.1, 212.77, 220.46, 222.54, 226.35, 227.47, 231.01, 213.75, 221.47, 228.01, 228.71, 225.99, 230.33, 231.62, 220.71, 219.57, 221.78, 216.39, 222.03, 229.25, 249.32, 249.1, 222.55, 229.67, 234.42, 227.92, 222.56, 232.14, 230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 199.6, 210.11, 210, 213.21, 207.67, 205.37, 199.34, 212.79, 239.89, 248.28, 263.99, 268.26, 272.68, 264.14, 266.32, 264.72] },
      velocityScore: { '1D': 6.3, '1W': 5.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.8T', pe: 31, revenueGrowth: 17, eps: 8.55, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 4.64, GTEK: false, ARKK: 2.62, MARS: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'AAPL', name: 'Apple Inc', easyScore: 3, avgWeight: 6.67, proScore: 4.09, coverage: 0.375,
      price: 310.18, weeklyPrices: [308.33, 310.85, 312.51, 312.06, 310.18], weeklyChange: 0.6, sortRank: 0, periodReturns: { '1M': 10.7, '6M': 9.6, '1Y': 53.8 },
      priceHistory: { '1W': [308.33, 310.85, 312.51, 312.06, 310.18], '1M': [280.14, 276.83, 284.18, 287.51, 287.44, 293.32, 292.68, 294.8, 298.87, 298.21, 300.23, 297.84, 298.97, 302.25, 304.99, 308.82, 308.33, 310.85, 312.51, 312.06, 310.18], '6M': [283.1, 277.89, 274.11, 270.97, 273.08, 260.33, 259.96, 248.35, 258.28, 275.91, 261.73, 264.58, 264.18, 260.29, 255.76, 248.96, 252.89, 255.92, 260.48, 270.23, 271.06, 280.14, 293.32, 300.23, 308.82, 310.18], '1Y': [201.7, 201.45, 198.42, 200.3, 207.82, 211.14, 209.11, 214.4, 211.27, 202.92, 229.65, 230.56, 229.31, 238.47, 226.79, 238.99, 254.43, 254.63, 256.48, 247.77, 262.77, 269, 270.04, 275.25, 267.44, 276.97, 286.19, 277.18, 274.61, 272.36, 271.86, 259.04, 258.21, 248.04, 259.48, 278.12, 261.73, 264.58, 264.18, 257.46, 250.12, 247.99, 248.8, 258.86, 259.2, 273.05, 271.06, 280.14, 293.32, 300.23, 308.82, 310.18] },
      velocityScore: { '1D': -5.1, '1W': -6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.6T', pe: 37.5, revenueGrowth: 17, eps: 8.27, grossMargin: 48, dividendYield: 0.35,
      etfPresence: { PTF: 4.51, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 1.22, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Apple is a selective AI holding — only 2 of 8 ETFs hold it at 3.81% average weight. Revenue up 17%, 48% gross margin, P/E of 38x — reasonable for the installed base franchise. The ETF managers treating it as an AI name are betting on on-device AI monetization through the App Store; the majority are not yet convinced, which explains the 25% coverage.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 3, avgWeight: 6.06, proScore: 3.71, coverage: 0.375,
      price: 620.01, weeklyPrices: [612.34, 635.26, 635.29, 632.51, 620.01], weeklyChange: 1.25, sortRank: 0, periodReturns: { '1M': 1.8, '6M': -3.3, '1Y': -7.6 },
      priceHistory: { '1W': [612.34, 635.26, 635.29, 632.51, 620.01], '1M': [608.75, 610.41, 604.96, 612.88, 616.81, 609.63, 598.86, 603, 616.63, 618.43, 614.23, 611.21, 602.61, 605.06, 607.38, 610.26, 612.34, 635.26, 635.29, 632.51, 620.01], '6M': [640.87, 666.8, 647.51, 661.5, 665.95, 648.69, 615.52, 647.63, 738.31, 670.21, 649.81, 655.66, 648.18, 660.57, 638.18, 606.7, 547.54, 574.46, 629.86, 688.55, 675.03, 608.75, 609.63, 614.23, 610.26, 620.01], '1Y': [670.9, 694.06, 702.12, 712.2, 719.22, 732.78, 710.39, 704.81, 700, 763.46, 790, 751.48, 754.1, 737.05, 751.98, 775.72, 755.4, 734.38, 713.08, 708.65, 733.27, 751.44, 627.32, 627.08, 597.69, 636.22, 647.1, 656.96, 657.15, 664.94, 660.09, 646.06, 620.8, 658.76, 716.5, 661.46, 649.81, 655.66, 648.18, 644.86, 613.71, 593.66, 525.72, 573.02, 634.53, 670.91, 675.03, 608.75, 609.63, 614.23, 610.26, 620.01] },
      velocityScore: { '1D': 11.4, '1W': 11.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.6T', pe: 22.5, revenueGrowth: 33, eps: 27.51, grossMargin: 82, dividendYield: 0.33,
      etfPresence: { PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 3.31, GTEK: false, ARKK: 0.57, MARS: false },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile Inc', easyScore: 1, avgWeight: 8.8, proScore: 3.11, coverage: 0.125,
      price: 105.13, weeklyPrices: [119.70, 129.60, 133.09, 113.41, 105.13], weeklyChange: -12.17, sortRank: 0, periodReturns: { '1M': 48.3, '6M': 99.8, '1Y': 335.3 },
      priceHistory: { '1W': [119.7, 129.6, 133.09, 113.41, 105.13], '1M': [70.89, 68.43, 63.87, 70.68, 65.35, 75.05, 82.55, 72.96, 74.81, 83.01, 83.67, 86.83, 88.1, 89.58, 96.23, 105.86, 119.7, 129.6, 133.09, 113.41, 105.13], '6M': [52.61, 74, 67.81, 86.48, 74.68, 85.73, 95.22, 116.37, 122.09, 93.27, 82.22, 80.2, 79.19, 93.86, 87.09, 94.09, 87.86, 92.62, 94.9, 85.53, 76.4, 70.89, 75.05, 83.67, 105.86, 105.13], '1Y': [24.15, 34.82, 41.91, 53.22, 45.11, 42.5, 51.12, 57.09, 53.09, 52.57, 49.76, 44.95, 50.43, 45.22, 37.58, 41.19, 54.8, 49.08, 74.75, 94.5, 78.61, 77.77, 70.05, 67.89, 58.22, 55.51, 56.89, 72.84, 68.37, 85.67, 72.63, 90.56, 101.25, 113.57, 111.21, 101.79, 82.22, 80.2, 79.19, 89.47, 86.34, 89.93, 78.67, 94.81, 98.97, 81, 76.4, 70.89, 75.05, 83.67, 105.86, 105.13] },
      velocityScore: { '1D': 0, '1W': 13.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$41B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 8.8 },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 3, avgWeight: 4.57, proScore: 2.8, coverage: 0.375,
      price: 157.72, weeklyPrices: [136.60, 132.51, 143.34, 156.54, 157.72], weeklyChange: 15.46, sortRank: 0, periodReturns: { '1M': 9.5, '6M': -5.8, '1Y': 19.4 },
      priceHistory: { '1W': [136.6, 132.51, 143.34, 156.54, 157.72], '1M': [144.07, 146.03, 135.91, 133.79, 137.05, 137.8, 136.89, 136, 130.05, 133.73, 133.99, 135.14, 135.26, 137.15, 137.41, 136.88, 136.6, 132.51, 143.34, 156.54, 157.72], '6M': [167.49, 181.49, 183.25, 193.98, 180.84, 181.68, 178.4, 165.9, 151.86, 130.01, 129.13, 135.24, 137.19, 152.67, 153.5, 155.68, 147.56, 148.46, 128.06, 146.39, 143.09, 144.07, 137.8, 133.99, 136.88, 157.72], '1Y': [132.04, 132.06, 141.41, 143.23, 130.68, 143.13, 148.58, 149.07, 156.24, 173.27, 186.97, 157.75, 160.87, 154.9, 166.74, 168.33, 182.55, 182.42, 182.17, 179.74, 181.51, 189.6, 190.74, 190.96, 167.33, 163.55, 170.69, 181.84, 187.75, 194.13, 177.75, 176.86, 177.07, 169.6, 146.59, 135.9, 129.13, 135.24, 137.19, 157.16, 150.95, 150.68, 143.06, 147.93, 132.37, 145.89, 143.09, 144.07, 137.8, 133.99, 136.88, 157.72] },
      velocityScore: { '1D': 20.7, '1W': 21.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$378B', pe: 177.2, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, MAGS: false, IGV: 7.44, FDTX: 3.01, GTEK: false, ARKK: 3.26, MARS: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'MRVL', name: 'Marvell Technology Inc', easyScore: 2, avgWeight: 5.48, proScore: 2.74, coverage: 0.25,
      price: 207.01, weeklyPrices: [208.26, 198.70, 204.83, 205.00, 207.01], weeklyChange: -0.6, sortRank: 0, periodReturns: { '1M': 25.5, '6M': 127.2, '1Y': 236.8 },
      priceHistory: { '1W': [208.26, 198.7, 204.83, 205, 207.01], '1M': [164.95, 163.66, 168.75, 172.15, 160.01, 170.13, 170.84, 164.5, 177.95, 182.58, 176.89, 168.93, 176.27, 186.8, 190.69, 196.33, 208.26, 198.7, 204.83, 205, 207.01], '6M': [91.1, 92, 84.26, 84.8, 86.76, 84.64, 81.21, 83.1, 81.34, 74.21, 78.23, 79.48, 81.69, 75.68, 87.67, 89.53, 97.68, 107.11, 128.49, 139.69, 164.31, 164.95, 170.13, 176.89, 196.33, 207.01], '1Y': [61.47, 69.14, 70.42, 75.21, 76.24, 72.26, 72.41, 71.99, 76.34, 76.63, 77.81, 72.07, 74.26, 62.31, 67.1, 70.98, 74.62, 84.07, 86.97, 86.22, 84.26, 88.46, 87.59, 89.33, 78.68, 83.43, 92.89, 88.9, 84.07, 87.68, 84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.23, 79.48, 81.69, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 164.31, 164.95, 170.13, 176.89, 196.33, 207.01] },
      velocityScore: { '1D': -10.7, '1W': -10.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$181B', pe: 71.1, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.12,
      etfPresence: { PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: 7.68, GTEK: 3.28, ARKK: false, MARS: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp/DE', easyScore: 1, avgWeight: 7.61, proScore: 2.69, coverage: 0.125,
      price: 1795.53, weeklyPrices: [1589.55, 1589.94, 1641.64, 1694.98, 1795.53], weeklyChange: 12.96, sortRank: 0, periodReturns: { '1M': 51.3, '6M': 754.3, '1Y': 4709.9 },
      priceHistory: { '1W': [1589.55, 1589.94, 1641.64, 1694.98, 1795.53], '1M': [1187, 1255.86, 1406.32, 1409.98, 1339.96, 1562.34, 1547.56, 1452.02, 1447.23, 1382.72, 1407.61, 1333.01, 1383.29, 1392.56, 1542.24, 1478.69, 1589.55, 1589.94, 1641.64, 1694.98, 1795.53], '6M': [210.17, 225.47, 201.87, 241.05, 240.22, 353.56, 387.81, 503.44, 539.3, 576.2, 630.29, 649.97, 635.36, 565.59, 618.82, 772.09, 603.17, 701.59, 851.77, 920.99, 989.9, 1187, 1562.34, 1407.61, 1478.69, 1795.53], '1Y': [37.33, 41.82, 44.21, 47.34, 44.96, 46.2, 42.72, 41.36, 42.93, 41.93, 46.83, 44.58, 47.35, 53.01, 73.92, 93.97, 106.4, 112.2, 120.95, 127.29, 149.29, 175.53, 194.57, 271.58, 244.93, 220.5, 205.35, 219.46, 209.31, 244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 630.29, 649.97, 635.36, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 989.9, 1187, 1562.34, 1407.61, 1478.69, 1795.53] },
      velocityScore: { '1D': null, '1W': 22.8, '1M': null, '6M': null }, isNew: true,
      marketCap: '$266B', pe: 61.2, revenueGrowth: 251, eps: 29.32, grossMargin: 56, dividendYield: null,
      etfPresence: { PTF: 7.61, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 2, avgWeight: 5.33, proScore: 2.67, coverage: 0.25,
      price: 1027.68, weeklyPrices: [895.88, 928.41, 923.52, 971.00, 1027.68], weeklyChange: 14.71, sortRank: 0, periodReturns: { '1M': 89.5, '6M': 327.4, '1Y': 946.7 },
      priceHistory: { '1W': [895.88, 928.41, 923.52, 971, 1027.68], '1M': [542.21, 576.45, 640.2, 666.59, 646.63, 746.81, 795.33, 766.58, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1027.68], '6M': [240.46, 246.92, 237.5, 276.59, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 1027.68], '1Y': [98.18, 110.95, 119.84, 127.91, 120.89, 122.24, 120.11, 109.22, 111.96, 109.06, 127.75, 122.05, 116.5, 118.72, 140, 159.99, 166.41, 167.32, 185.69, 187.06, 202.29, 221.91, 218.03, 241.11, 228.5, 224.53, 239.49, 252.42, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 496.72, 542.21, 746.81, 724.66, 751, 1027.68] },
      velocityScore: { '1D': -1.5, '1W': 7.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 48.5, revenueGrowth: 196, eps: 21.17, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { PTF: 4.77, WCLD: false, MAGS: false, IGV: false, FDTX: 5.89, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 2, avgWeight: 5.34, proScore: 2.67, coverage: 0.25,
      price: 227.2, weeklyPrices: [193.06, 190.96, 203.70, 225.78, 227.20], weeklyChange: 17.68, sortRank: 0, periodReturns: { '1M': 32.2, '6M': 13.1, '1Y': 36.4 },
      priceHistory: { '1W': [193.06, 190.96, 203.7, 225.78, 227.2], '1M': [171.83, 180.29, 185.35, 194.03, 194.59, 195.95, 193.84, 186.83, 189.76, 195.61, 192.95, 186.61, 181.46, 188.16, 189.77, 192.08, 193.06, 190.96, 203.7, 225.78, 227.2], '6M': [200.94, 220.54, 184.92, 198.38, 197.21, 192.84, 193.61, 178.18, 169.01, 136.48, 156.48, 148.08, 145.4, 154.79, 159.16, 155.52, 142.81, 146.38, 138.09, 175.06, 173.28, 171.83, 195.95, 192.95, 192.08, 227.2], '1Y': [166.57, 177.15, 211.1, 215.27, 218.96, 235.81, 234.96, 238.11, 249.98, 255.67, 253.86, 234.62, 234.21, 223.45, 328.33, 301.41, 313.83, 281.24, 284.24, 299, 275.15, 280.83, 248.17, 236.15, 220.49, 197.03, 201.1, 221.53, 188.65, 195.34, 194.91, 189.65, 189.85, 177.16, 164.58, 142.82, 156.48, 148.08, 145.4, 152.96, 155.11, 149.68, 139.66, 145.54, 155.62, 177.58, 173.28, 171.83, 195.95, 192.95, 192.08, 227.2] },
      velocityScore: { '1D': 16.6, '1W': 20.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$653B', pe: 40.7, revenueGrowth: 22, eps: 5.58, grossMargin: 67, dividendYield: 0.89,
      etfPresence: { PTF: false, WCLD: false, MAGS: false, IGV: 9.98, FDTX: 0.7, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Oracle lands in 3 AI ETFs on the strength of its cloud database and AI infrastructure contracts. Revenue grew 22%, 67% gross margin, P/E of 40x. The 17.5% weekly return following a major earnings beat shows how quickly sentiment can reprice; the weight score at 2.04% is still modest, meaning ETF managers have started building positions but conviction is not yet deep.',
    },
    {
      ticker: 'PANW', name: 'PANW', easyScore: 3, avgWeight: 4.25, proScore: 2.6, coverage: 0.375,
      price: 286.99, weeklyPrices: [256.75, 248.47, 257.77, 281.69, 286.99], weeklyChange: 11.78, sortRank: 0, periodReturns: { '1M': 58.5, '6M': 52.9, '1Y': 47.3 },
      priceHistory: { '1W': [256.75, 248.47, 257.77, 281.69, 286.99], '1M': [181.08, 184.56, 183.98, 183.68, 196.53, 207.88, 213.66, 215.6, 227.79, 238.21, 242.83, 247.55, 240.13, 246.66, 252.92, 260.58, 256.75, 248.47, 257.77, 281.69, 286.99], '6M': [187.73, 195.35, 185.88, 189.49, 186.85, 193.9, 190.93, 182.27, 176.2, 154.77, 162.81, 148.7, 148.92, 163.16, 168.12, 169.74, 156.36, 163.21, 155.73, 167.85, 178.54, 181.08, 207.88, 242.83, 260.58, 286.99], '1Y': [194.86, 196.33, 198.11, 201.69, 197.58, 206.06, 192.25, 196.73, 193.84, 169.09, 175.4, 181.56, 184.23, 191.53, 197.33, 203.12, 203.25, 203.62, 211.04, 207.56, 214.4, 221.38, 214.52, 218.27, 201, 186.27, 189.88, 195, 187.09, 188.12, 184.2, 190.8, 187.73, 180.18, 176.97, 159.32, 162.81, 148.7, 148.92, 165.05, 167.02, 162.95, 147.02, 161.95, 162.51, 169.56, 178.54, 181.08, 207.88, 242.83, 260.58, 286.99] },
      velocityScore: { '1D': 13.5, '1W': 11.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$233B', pe: 159.4, revenueGrowth: 15, eps: 1.8, grossMargin: 74, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.41, MAGS: false, IGV: 7.59, FDTX: 2.76, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'SATS', name: 'EchoStar Corp', easyScore: 1, avgWeight: 7.22, proScore: 2.55, coverage: 0.125,
      price: 129.17, weeklyPrices: [123.12, 122.46, 131.07, 129.19, 129.17], weeklyChange: 4.91, sortRank: 0, periodReturns: { '1M': 4.9, '6M': 76.9, '1Y': 609.3 },
      priceHistory: { '1W': [123.12, 122.46, 131.07, 129.19, 129.17], '1M': [123.18, 120.34, 117.34, 125.75, 122.62, 127.15, 129.14, 129.38, 133.23, 135.11, 137.23, 136.45, 136.52, 141.8, 128.44, 124.2, 123.12, 122.46, 131.07, 129.19, 129.17], '6M': [73, 88.26, 103.93, 108.88, 109.2, 112.16, 131.09, 127.97, 113.46, 107.02, 110.51, 110.36, 115.53, 110.85, 107.71, 109.11, 111.4, 128.68, 128.59, 133.21, 117.5, 123.18, 127.15, 137.23, 124.2, 129.17], '1Y': [18.21, 15.99, 25.11, 25.24, 28.36, 32.22, 29.6, 28.12, 29.51, 26.73, 28, 27.49, 50.87, 63.91, 79.89, 71.81, 73.64, 76.36, 75.18, 75.05, 73.77, 74.8, 73.48, 71.28, 69.74, 71, 74.06, 93.54, 103.64, 106.76, 108.7, 116.95, 123.55, 126.5, 113.22, 111.61, 110.51, 110.36, 115.53, 106.24, 108.34, 109.84, 115.21, 126.95, 125.55, 135.11, 117.5, 123.18, 127.15, 137.23, 124.2, 129.17] },
      velocityScore: { '1D': 15.9, '1W': 10.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$37B', pe: null, revenueGrowth: -5, eps: -50.21, grossMargin: 27, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 7.22 },
      tonyNote: 'EchoStar and satellite infrastructure names appear in Electrification ETFs on the connectivity-for-remote-grid thesis. This is a niche allocation — modest weight, selective coverage — reflecting ETF managers building a small satellite and connectivity basket as adjacent infrastructure to the energy transition.',
    },
    {
      ticker: 'PL', name: 'Planet Labs PBC', easyScore: 1, avgWeight: 5.77, proScore: 2.04, coverage: 0.125,
      price: 47.76, weeklyPrices: [48.32, 50.48, 51.40, 51.14, 47.76], weeklyChange: -1.17, sortRank: 0, periodReturns: { '1M': 29.4, '6M': 308.2, '1Y': 1160 },
      priceHistory: { '1W': [48.32, 50.48, 51.4, 51.14, 47.76], '1M': [36.9, 38.54, 37.13, 39.69, 35.24, 39.04, 41.84, 40.68, 40.74, 43.04, 41.62, 41.61, 41.59, 42.66, 42.48, 44.35, 48.32, 50.48, 51.4, 51.14, 47.76], '6M': [11.7, 12.95, 18.05, 20.6, 19.74, 22.61, 26.73, 26.06, 26.35, 20.43, 21.3, 23.9, 24.14, 24.59, 24.97, 26.96, 32.4, 35.88, 34.67, 38.48, 35.44, 36.9, 39.04, 41.62, 44.35, 47.76], '1Y': [3.79, 5.83, 5.34, 5.57, 6.16, 6.85, 6.43, 6.6, 6.19, 6.39, 6.65, 6.38, 6.98, 6.44, 8.97, 10.23, 12.05, 12.98, 15.68, 14.78, 12.91, 12.84, 12.7, 12.47, 11.45, 11.73, 11.77, 12.84, 17.88, 20.73, 19.72, 22.44, 28.28, 26.94, 24.97, 22.26, 21.3, 23.9, 24.14, 25.28, 24.79, 33.83, 30.86, 35.02, 34.32, 37.5, 35.44, 36.9, 39.04, 41.62, 44.35, 47.76] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$17B', pe: null, revenueGrowth: 41, eps: -0.8, grossMargin: 56, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 5.77 },
      tonyNote: 'Planet Labs is a satellite earth observation company. It holds a speculative position in Industrials ETFs as a data infrastructure name — providing satellite imagery and analytics that support agricultural, energy, and government decision-making. Revenue is growing from a small base; the ETF weight is minimal and the position is thematic.',
    },
    {
      ticker: 'APP', name: 'APPLOVIN CORP CLASS A', easyScore: 1, avgWeight: 5.54, proScore: 1.96, coverage: 0.125,
      price: 602.76, weeklyPrices: [514.24, 567.83, 599.89, 613.09, 602.76], weeklyChange: 17.21, sortRank: 0, periodReturns: { '1M': 31, '6M': -3.3, '1Y': 50 },
      priceHistory: { '1W': [514.24, 567.83, 599.89, 613.09, 602.76], '1M': [460, 475, 478.11, 468.83, 498.87, 468.55, 478.42, 490.69, 453.53, 485.16, 501, 492.38, 476.9, 482.28, 485.89, 481.68, 514.24, 567.83, 599.89, 613.09, 602.76], '6M': [623.59, 689.76, 675.16, 733.6, 693.71, 632.92, 617.76, 521.94, 569.24, 375.23, 366.91, 418.68, 434.77, 508.56, 449.33, 439.92, 391.21, 386.37, 391.38, 477.2, 448.29, 460, 468.55, 501, 481.68, 602.76], '1Y': [401.91, 383.6, 370.68, 349.48, 336.69, 352.74, 352.96, 350, 361.63, 377.93, 467, 412.6, 469.33, 487.35, 567.12, 606.66, 651.18, 718.54, 631.85, 590.03, 552.64, 626.82, 608.68, 594.91, 526.01, 556.03, 653, 724.62, 677.3, 728.45, 673.82, 616.53, 606.99, 524.41, 473.11, 406.72, 366.91, 418.68, 434.77, 502.14, 458.67, 442.39, 381.2, 412.68, 417.45, 490.96, 448.29, 460, 468.55, 501, 481.68, 602.76] },
      velocityScore: { '1D': -21.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$202B', pe: 52.3, revenueGrowth: 59, eps: 11.53, grossMargin: 88, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, MAGS: false, IGV: 5.54, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'AppLovin is the mobile advertising and AI-powered monetization platform that has outperformed almost every name in the Broad Tech and Meme themes. Revenue grew strongly, gross margin is high, and the AI ad targeting engine is showing real commercial traction. The ETF weight is building as managers recognize the AI monetization story is not speculative — it is in the current numbers.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 1, avgWeight: 5.51, proScore: 1.95, coverage: 0.125,
      price: 503.3, weeklyPrices: [503.89, 495.54, 518.09, 516.10, 503.30], weeklyChange: -0.12, sortRank: 0, periodReturns: { '1M': 39.6, '6M': 129, '1Y': 339.1 },
      priceHistory: { '1W': [503.89, 495.54, 518.09, 516.1, 503.3], '1M': [360.54, 341.54, 355.26, 421.39, 408.46, 455.19, 458.79, 448.29, 445.5, 449.7, 424.1, 420.99, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 518.09, 516.1, 503.3], '6M': [219.76, 221.11, 207.58, 214.95, 215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 200.21, 199.45, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 467.51, 503.3], '1Y': [114.63, 121.73, 126.39, 138.43, 136.11, 138.41, 155.61, 154.72, 177.44, 174.31, 174.95, 166.55, 166.62, 162.13, 159.54, 159.16, 160.9, 161.79, 211.51, 218.09, 238.03, 258.01, 250.05, 237.52, 230.29, 206.13, 215.24, 221.62, 209.17, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 205.94, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 347.81, 360.54, 455.19, 424.1, 467.51, 503.3] },
      velocityScore: { '1D': -36.3, '1W': -32.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$821B', pe: 168.3, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: 5.51, MARS: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 2, avgWeight: 3.81, proScore: 1.91, coverage: 0.25,
      price: 429.99, weeklyPrices: [412.32, 422.73, 424.86, 418.45, 429.99], weeklyChange: 4.29, sortRank: 0, periodReturns: { '1M': 8.1, '6M': 49.5, '1Y': 120.7 },
      priceHistory: { '1W': [412.32, 422.73, 424.86, 418.45, 429.99], '1M': [397.67, 401.61, 394.41, 419.5, 414.15, 411.68, 404.54, 397.28, 399.8, 417.72, 404.35, 395.95, 392.61, 401.62, 407.15, 404.52, 412.32, 422.73, 424.86, 418.45, 429.99], '6M': [287.68, 301.87, 287.74, 293.28, 299.58, 318.68, 327.11, 327.37, 339.55, 330.73, 368.1, 370.54, 374.58, 353.86, 336.71, 338.79, 326.11, 339.04, 370.6, 370.5, 402.46, 397.67, 411.68, 404.35, 404.52, 429.99], '1Y': [194.84, 207, 215.68, 220.09, 224.68, 231.84, 236.95, 234.6, 241.33, 232.47, 244.29, 232.7, 238.72, 231.39, 260.44, 262.79, 282.71, 279.29, 294.03, 295.94, 294.51, 301.53, 294.05, 291.17, 277.91, 284.68, 292.09, 303.41, 286.87, 296.95, 303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 368.1, 370.54, 374.58, 338.89, 338.31, 329.24, 326.74, 341.76, 369.57, 366.24, 402.46, 397.67, 411.68, 404.35, 404.52, 429.99] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$2.2T', pe: 36.8, revenueGrowth: 35, eps: 11.67, grossMargin: 62, dividendYield: 0.91,
      etfPresence: { PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: 6.71, GTEK: false, ARKK: 0.91, MARS: false },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 2, avgWeight: 7, proScore: 4.95, coverage: 0.5,
      price: 283.75, weeklyPrices: [291.97, 295.94, 288.90, 284.42, 283.75], weeklyChange: -2.82, sortRank: 0, periodReturns: { '1M': 3.1, '6M': 166.4, '1Y': 393 },
      priceHistory: { '1W': [291.97, 295.94, 288.9, 284.42, 283.75], '1M': [275.33, 269.95, 294.69, 320.3, 305.93, 309.39, 322.05, 308.05, 300.84, 296.98, 292.65, 266.8, 261.58, 271.05, 270.75, 279.22, 291.97, 295.94, 288.9, 284.42, 283.75], '6M': [106.53, 114.29, 109.31, 112.18, 109.16, 118.62, 133.76, 142.29, 152.31, 179.6, 197.63, 182.27, 174.53, 167.67, 171.19, 175.13, 174.8, 182.6, 230.94, 241.01, 252.76, 275.33, 309.39, 292.65, 279.22, 283.75], '1Y': [57.55, 63.41, 65.05, 62.82, 70.01, 70.64, 70.37, 73.67, 77.77, 78.75, 90.06, 84.7, 91.08, 85.72, 92.33, 97.11, 97.41, 101.6, 104.42, 105.73, 116.11, 128.09, 126.71, 121.07, 107.22, 104.18, 107.5, 115.02, 110.88, 112.88, 106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 197.63, 182.27, 174.53, 161.22, 167.57, 172, 179.35, 186.72, 228.99, 241.65, 252.76, 275.33, 309.39, 292.65, 279.22, 283.75] },
      velocityScore: { '1D': 5.8, '1W': -1.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 55.4, revenueGrowth: 7, eps: 5.12, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { POW: 6.24, VOLT: 7.75, PBD: false, PBW: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, avgWeight: 5.27, proScore: 3.73, coverage: 0.5,
      price: 272.99, weeklyPrices: [276.25, 280.13, 276.96, 274.52, 272.99], weeklyChange: -1.18, sortRank: 0, periodReturns: { '1M': -3.7, '6M': 76.4, '1Y': 282.1 },
      priceHistory: { '1W': [276.25, 280.13, 276.96, 274.52, 272.99], '1M': [283.6, 286.69, 297.17, 286.89, 290.46, 297.98, 302.73, 298.22, 266.92, 268.73, 256.72, 258.28, 249.71, 254.75, 260.4, 270.01, 276.25, 280.13, 276.96, 274.52, 272.99], '6M': [154.77, 172.21, 173.3, 174.02, 172.95, 181.03, 192.96, 200.29, 210.44, 208, 231.48, 235.04, 229.71, 202.58, 195.18, 214.95, 204.11, 204.65, 235.73, 254.25, 276.65, 283.6, 297.98, 256.72, 270.01, 272.99], '1Y': [71.45, 77.71, 88.72, 92.48, 95.52, 102.24, 98.24, 106, 130.49, 131.71, 134.66, 127.8, 139.31, 138.07, 145.68, 144.6, 146.79, 141.02, 141.25, 147.14, 148, 154.78, 154.25, 152.12, 144.07, 150.84, 161.55, 167.43, 171.76, 177.23, 169.63, 180.24, 196.61, 196.5, 201.19, 220.78, 231.48, 235.04, 229.71, 191.87, 197.65, 204.09, 203.53, 206.9, 237.93, 254.38, 276.65, 283.6, 297.98, 256.72, 270.01, 272.99] },
      velocityScore: { '1D': -12.6, '1W': 2.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 65.8, revenueGrowth: 17, eps: 4.15, grossMargin: 39, dividendYield: 0.1,
      etfPresence: { POW: 3.15, VOLT: 7.39, PBD: false, PBW: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 2, avgWeight: 5.13, proScore: 3.63, coverage: 0.5,
      price: 706.75, weeklyPrices: [742.18, 733.62, 730.10, 711.73, 706.75], weeklyChange: -4.77, sortRank: 0, periodReturns: { '1M': -4.8, '6M': 56.3, '1Y': 104.5 },
      priceHistory: { '1W': [742.18, 733.62, 730.1, 711.73, 706.75], '1M': [742.21, 757.34, 771.61, 785.24, 750.73, 745, 781.38, 765.81, 773.72, 780.08, 769.99, 723.03, 714.13, 709.93, 716.91, 723.44, 742.18, 733.62, 730.1, 711.73, 706.75], '6M': [452.23, 463.09, 435.87, 433.03, 428.81, 436.89, 437.07, 468.78, 483.43, 477.72, 515.88, 552.66, 563.08, 549.22, 566.91, 577.95, 545.64, 560.63, 585.36, 601.88, 624.84, 742.21, 745, 769.99, 723.44, 706.75], '1Y': [345.53, 355.66, 361.8, 372.26, 372.29, 382.12, 386.54, 394.93, 410.99, 389.12, 391.57, 379.27, 383.92, 374.41, 390.17, 376.01, 389.53, 414.42, 421.51, 431.6, 437.43, 439.57, 438.66, 448.91, 439.29, 450.14, 454.72, 457.96, 438.49, 435.2, 422.06, 413.17, 447.64, 468.76, 474.63, 508.11, 515.88, 552.66, 563.08, 540.19, 559.02, 555.39, 549.98, 554.38, 595.84, 604.97, 624.84, 742.21, 745, 769.99, 723.44, 706.75] },
      velocityScore: { '1D': 10.7, '1W': -1.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$106B', pe: 97.3, revenueGrowth: 26, eps: 7.26, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.68, VOLT: 5.58, PBD: false, PBW: false },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 2, avgWeight: 4.65, proScore: 3.29, coverage: 0.5,
      price: 401.1, weeklyPrices: [403.13, 406.37, 401.94, 400.60, 401.10], weeklyChange: -0.5, sortRank: 0, periodReturns: { '1M': -5.7, '6M': 18.1, '1Y': 25.8 },
      priceHistory: { '1W': [403.13, 406.37, 401.94, 400.6, 401.1], '1M': [425.55, 422.44, 410.86, 421.39, 399.15, 401.51, 419, 401.53, 406.94, 408.1, 399.44, 381.87, 371.88, 379.69, 381.51, 391.35, 403.13, 406.37, 401.94, 400.6, 401.1], '6M': [339.71, 343.39, 333.21, 320.39, 320.86, 322.67, 331.14, 334.04, 354.37, 354.67, 390.33, 373.38, 375.92, 354.79, 348.64, 360.23, 357.1, 361.1, 403, 406.21, 423.92, 425.55, 401.51, 399.44, 391.35, 401.1], '1Y': [318.86, 325.81, 338.01, 343.26, 355.04, 359.78, 362.11, 372.65, 390.01, 356.45, 363.3, 349, 352.02, 342.99, 362.25, 363.35, 368.52, 374.25, 370.94, 374.35, 373.46, 376.01, 377.72, 367.91, 338.29, 336.65, 333.11, 341.76, 329.93, 322.81, 318.51, 320.58, 333.46, 331.22, 351.42, 373.82, 390.33, 373.38, 375.92, 347.75, 355.4, 356.8, 357.36, 363.89, 403.36, 407.57, 423.92, 425.55, 401.51, 399.44, 391.35, 401.1] },
      velocityScore: { '1D': 6.5, '1W': 2.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$156B', pe: 39.2, revenueGrowth: 17, eps: 10.22, grossMargin: 37, dividendYield: 1.1,
      etfPresence: { POW: 3.92, VOLT: 5.38, PBD: false, PBW: false },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'VICR', name: 'Vicor Corp', easyScore: 1, avgWeight: 5.74, proScore: 2.87, coverage: 0.25,
      price: 328.56, weeklyPrices: [332.95, 345.84, 342.09, 334.84, 328.56], weeklyChange: -1.32, sortRank: 0, periodReturns: { '1M': 22.4, '6M': 266.2, '1Y': 662.1 },
      priceHistory: { '1W': [332.95, 345.84, 342.09, 334.84, 328.56], '1M': [268.36, 251.02, 266.01, 280.34, 261.34, 256.47, 312.96, 292.53, 309.27, 290.54, 273.67, 249.02, 243.43, 264.2, 268.29, 267.99, 332.95, 345.84, 342.09, 334.84, 328.56], '6M': [89.73, 98.69, 95.59, 111.02, 113.7, 139.47, 145.32, 166.78, 171.53, 148.19, 164.29, 170.01, 201.4, 181.92, 167.81, 190.13, 157.96, 155.64, 185.61, 218.05, 273.53, 268.36, 256.47, 273.67, 267.99, 328.56], '1Y': [43.11, 45.84, 44.84, 45.39, 45.34, 46.72, 46.69, 45.2, 45.72, 46.91, 48.43, 47.24, 51.51, 50.51, 50.09, 52.21, 53.82, 49.72, 48.63, 53.65, 65.8, 89.65, 88.36, 92.58, 84.66, 88.15, 91.14, 99.3, 93.45, 108.97, 109.6, 136.11, 145.48, 153.29, 157.67, 159.87, 164.29, 170.01, 201.4, 162.67, 172.57, 164.54, 153.02, 155.71, 186.22, 224.81, 273.53, 268.36, 256.47, 273.67, 267.99, 328.56] },
      velocityScore: { '1D': null, '1W': 24.2, '1M': null, '6M': null }, isNew: true,
      marketCap: '$15B', pe: 110.3, revenueGrowth: 20, eps: 2.98, grossMargin: 54, dividendYield: null,
      etfPresence: { POW: 5.74, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Vicor Corp is a power conversion specialist — high-efficiency modules for AI server power delivery. It holds a niche position in Industrials ETFs on the data center power density thesis. Revenue growth has been lumpy, but when AI GPU clusters require Vicor\'s factorized power architecture, the order cycles are large.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 2, avgWeight: 3.65, proScore: 2.58, coverage: 0.5,
      price: 964.87, weeklyPrices: [1070.47, 1031.89, 996.00, 968.32, 964.87], weeklyChange: -9.86, sortRank: 0, periodReturns: { '1M': -9.2, '6M': 67.3, '1Y': 98.9 },
      priceHistory: { '1W': [1070.47, 1031.89, 996, 968.32, 964.87], '1M': [1062.95, 1073.95, 1095.21, 1118.96, 1045.63, 1040.15, 1073.08, 1071.98, 1062.57, 1090.53, 1049.23, 1012.25, 1011.8, 1024.52, 1043.82, 1038.74, 1070.47, 1031.89, 996, 968.32, 964.87], '6M': [576.9, 621.9, 681.35, 661.81, 659.64, 662.32, 644.18, 661.67, 717.39, 737.53, 816.56, 830.34, 873.6, 815.01, 832.11, 877.39, 873.12, 898.57, 991.32, 1002.75, 1149.19, 1062.95, 1040.15, 1049.23, 1038.74, 964.87], '1Y': [485.16, 480, 487.88, 510.84, 506, 535.77, 559.61, 548.99, 632.67, 649.72, 657.44, 603.13, 625.91, 577.04, 643.56, 614.79, 633.41, 614.9, 606.12, 644.41, 585.33, 570.98, 547.96, 576.08, 554.93, 572.56, 601.58, 625.3, 686.22, 661.45, 653.57, 628.4, 642.23, 657.78, 726.37, 779.35, 816.56, 830.34, 873.6, 789.23, 805.02, 851.07, 853.16, 897.36, 991.12, 990.18, 1149.19, 1062.95, 1040.15, 1049.23, 1038.74, 964.87] },
      velocityScore: { '1D': 8.4, '1W': -6.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$259B', pe: 28.2, revenueGrowth: 16, eps: 34.18, grossMargin: 20, dividendYield: 0.21,
      etfPresence: { POW: 3.25, VOLT: 4.04, PBD: false, PBW: false },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 2, avgWeight: 3.47, proScore: 2.46, coverage: 0.5,
      price: 167.02, weeklyPrices: [169.29, 167.80, 164.87, 166.99, 167.02], weeklyChange: -1.34, sortRank: 0, periodReturns: { '1M': 5.1, '6M': 58.1, '1Y': 158.4 },
      priceHistory: { '1W': [169.29, 167.8, 164.87, 166.99, 167.02], '1M': [158.92, 162.69, 169.41, 172.49, 166.73, 169.95, 173.39, 170.74, 172.91, 173.96, 169.01, 160.69, 158.23, 161.86, 163.57, 164.66, 169.29, 167.8, 164.87, 166.99, 167.02], '6M': [105.67, 107.11, 102.61, 102.79, 103.01, 106.48, 104.54, 111.57, 115.62, 113.87, 111.9, 116.87, 118.36, 110.55, 107.87, 122.58, 118.44, 117.96, 130.56, 134.69, 142.17, 158.92, 169.95, 169.01, 164.66, 167.02], '1Y': [64.64, 68.32, 70.4, 72.34, 72.16, 75.2, 74.55, 74.63, 79.72, 89.73, 91.84, 88.15, 90.84, 89.49, 94.98, 96.46, 97.7, 98.64, 96, 99.51, 99.65, 104.22, 109.62, 109.59, 104.31, 104.93, 105.36, 107.42, 102.41, 103.97, 101.97, 102.72, 107.98, 110.29, 112.26, 112.64, 111.9, 116.87, 118.36, 106.02, 109.93, 116.3, 116.98, 117.41, 133.16, 135.8, 142.17, 158.92, 169.95, 169.01, 164.66, 167.02] },
      velocityScore: { '1D': null, '1W': 2.1, '1M': null, '6M': null }, isNew: true,
      marketCap: '$27B', pe: 56.8, revenueGrowth: 54, eps: 2.94, grossMargin: 37, dividendYield: 0.5,
      etfPresence: { POW: 3.78, VOLT: 3.17, PBD: false, PBW: false },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CORP', easyScore: 3, avgWeight: 2.69, proScore: 2.33, coverage: 0.75,
      price: 271.77, weeklyPrices: [302.40, 293.80, 290.01, 285.00, 271.77], weeklyChange: -10.13, sortRank: 0, periodReturns: { '1M': -6.5, '6M': 174.7, '1Y': 1386.7 },
      priceHistory: { '1W': [302.4, 293.8, 290.01, 285, 271.77], '1M': [290.52, 288.64, 295.25, 285.47, 258.64, 261.03, 283.92, 280.69, 289.76, 303.41, 275.95, 258.71, 261.34, 282.31, 307.88, 302.49, 302.4, 293.8, 290.01, 285, 271.77], '6M': [98.93, 111.79, 89.58, 92.26, 87.26, 108, 133.46, 145.63, 156.51, 136.6, 139.03, 147.55, 155.67, 159.99, 157.17, 166.69, 133.52, 135.63, 166.7, 207.86, 231.17, 290.52, 261.03, 275.95, 302.49, 271.77], '1Y': [18.28, 21.43, 22.91, 22.95, 22.13, 28.71, 25.31, 25.93, 34.75, 37.61, 41.25, 43.1, 49.94, 52.45, 62.96, 79.67, 77.38, 84.57, 86.06, 114.06, 104.38, 113.28, 129.05, 127.07, 104.97, 94.29, 105, 109.44, 87.61, 91.43, 86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.03, 147.55, 155.67, 135.19, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 231.17, 290.52, 261.03, 275.95, 302.49, 271.77] },
      velocityScore: { '1D': -14, '1W': -6.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$77B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: 4.48, PBD: 1.52, PBW: 2.06 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'PRY', name: 'Prysmian SpA', easyScore: 1, avgWeight: 4.36, proScore: 2.18, coverage: 0.25,
      price: 0, weeklyPrices: [0.00], weeklyChange: 0, sortRank: 0, periodReturns: { '1M': 0, '6M': 0, '1Y': 0 },
      priceHistory: undefined,
      velocityScore: { '1D': null, '1W': -1.4, '1M': null, '6M': null }, isNew: true,
      marketCap: 'N/A', pe: null, revenueGrowth: 0, eps: 0, grossMargin: 0, dividendYield: null,
      etfPresence: { POW: 4.36, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Prysmian SpA appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 4.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 2, avgWeight: 3.02, proScore: 2.14, coverage: 0.5,
      price: 85.54, weeklyPrices: [87.65, 87.65, 87.25, 87.01, 85.54], weeklyChange: -2.41, sortRank: 0, periodReturns: { '1M': -11.8, '6M': 1.1, '1Y': 21.9 },
      priceHistory: { '1W': [87.65, 87.65, 87.25, 87.01, 85.54], '1M': [96.95, 95.51, 96.28, 95.39, 93.32, 93.1, 94.84, 94.59, 94.85, 95.68, 93.36, 89.04, 90.06, 88.27, 89.69, 88.55, 87.65, 87.65, 87.25, 87.01, 85.54], '6M': [84.65, 80.55, 81.65, 80.04, 80.53, 78.37, 81.98, 85.07, 88.18, 89.21, 91.93, 92.18, 93.77, 91.13, 91.73, 92.41, 91.16, 93.15, 94.08, 91.98, 95.28, 96.95, 93.1, 93.36, 88.55, 85.54], '1Y': [70.15, 71.9, 73.78, 71.4, 73.06, 73.65, 74.7, 77.54, 71.95, 71.18, 71.86, 76.51, 74.84, 71.63, 71.04, 70.31, 72.32, 75.49, 83.21, 84.64, 83.99, 83.57, 81.69, 85.76, 84.64, 84.83, 84.58, 79.64, 81.32, 79.79, 80.28, 79.49, 82.19, 84.81, 87.9, 89.47, 91.93, 92.18, 93.77, 91.02, 92.78, 89.5, 91.4, 92.73, 92.3, 92.01, 95.28, 96.95, 93.1, 93.36, 88.55, 85.54] },
      velocityScore: { '1D': -8.5, '1W': -14.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$178B', pe: 21.7, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.86,
      etfPresence: { POW: 1.96, VOLT: 4.09, PBD: false, PBW: false },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 2, avgWeight: 3.01, proScore: 2.13, coverage: 0.5,
      price: 465.61, weeklyPrices: [478.05, 484.25, 473.93, 473.61, 465.61], weeklyChange: -2.6, sortRank: 0, periodReturns: { '1M': -8.4, '6M': 8.8, '1Y': 22.1 },
      priceHistory: { '1W': [478.05, 484.25, 473.93, 473.61, 465.61], '1M': [508.43, 516, 507.81, 502.34, 493.04, 492.58, 490.16, 485.98, 483.79, 482.03, 479.97, 470.87, 461.5, 463.32, 460.98, 475.01, 478.05, 484.25, 473.93, 473.61, 465.61], '6M': [427.85, 441.51, 444.84, 451.03, 446.61, 468.2, 476.06, 484.06, 497.97, 487.4, 516.02, 526.73, 511.63, 476.51, 468.41, 492.65, 481.67, 494.25, 536.01, 535.57, 553.07, 508.43, 492.58, 479.97, 475.01, 465.61], '1Y': [381.34, 392.34, 391.89, 402.99, 410.51, 417.71, 414.86, 428.55, 427.33, 427.67, 432.14, 432.81, 442.52, 428.8, 442.33, 433.26, 435.23, 430.31, 412.93, 427.43, 435.29, 455.34, 459.44, 450.12, 417.28, 429.82, 427.48, 438.7, 438.42, 455.92, 444.11, 460.87, 484.11, 485.53, 487.94, 503.8, 516.02, 526.73, 511.63, 471.54, 467.38, 475.74, 480.97, 499.2, 539.79, 546.23, 553.07, 508.43, 492.58, 479.97, 475.01, 465.61] },
      velocityScore: { '1D': 13.9, '1W': 0.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$25B', pe: 27.5, revenueGrowth: 11, eps: 16.91, grossMargin: 36, dividendYield: 1.2,
      etfPresence: { POW: 2.74, VOLT: 3.28, PBD: false, PBW: false },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, avgWeight: 2.76, proScore: 1.95, coverage: 0.5,
      price: 125.44, weeklyPrices: [130.90, 129.57, 127.76, 126.67, 125.44], weeklyChange: -4.17, sortRank: 0, periodReturns: { '1M': -8.4, '6M': 4.1, '1Y': 21.6 },
      priceHistory: { '1W': [130.9, 129.57, 127.76, 126.67, 125.44], '1M': [136.91, 134.66, 137.04, 132.56, 131.76, 130.16, 130.7, 131.94, 127.95, 128.6, 125.15, 127.68, 128.92, 128.87, 129.61, 131.59, 130.9, 129.57, 127.76, 126.67, 125.44], '6M': [120.51, 115.73, 115.77, 114.62, 115.99, 113.7, 118.11, 117.18, 119.21, 120.61, 126.43, 129.37, 133.82, 132.04, 132.22, 128.72, 128.85, 132.68, 136.3, 133.66, 134.73, 136.91, 130.16, 125.15, 131.59, 125.44], '1Y': [103.18, 101.41, 101.91, 103.28, 104.39, 104.74, 104.4, 110.16, 109.22, 113.24, 111.99, 112.66, 112.63, 110.03, 108.34, 107.52, 108.14, 112.5, 118.16, 118.38, 117.43, 115.11, 120.3, 122.73, 123.51, 121.58, 119.23, 116.07, 114.57, 115.15, 115.31, 115.93, 119.4, 116.63, 119.78, 120.8, 126.43, 129.37, 133.82, 131.87, 133.61, 125.66, 130.1, 132.36, 134.46, 133.28, 134.73, 136.91, 130.16, 125.15, 131.59, 125.44] },
      velocityScore: { '1D': -19.4, '1W': -3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$68B', pe: 18.6, revenueGrowth: 10, eps: 6.76, grossMargin: 47, dividendYield: 3,
      etfPresence: { POW: 1.32, VOLT: 4.2, PBD: false, PBW: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'HYLN', name: 'Hyliion Holdings Corp', easyScore: 1, avgWeight: 3.85, proScore: 1.93, coverage: 0.25,
      price: 6.76, weeklyPrices: [6.60, 6.94, 7.19, 6.99, 6.76], weeklyChange: 2.42, sortRank: 0, periodReturns: { '1M': 231.4, '6M': 267.4, '1Y': 372.7 },
      priceHistory: { '1W': [6.6, 6.94, 7.19, 6.99, 6.76], '1M': [2.04, 2.11, 2.31, 2.39, 2.47, 2.46, 2.76, 2.68, 3.59, 3.69, 4.67, 4.2, 4.09, 4.09, 4.2, 5.99, 6.6, 6.94, 7.19, 6.99, 6.76], '6M': [1.84, 1.86, 1.84, 1.93, 1.9, 1.94, 2.1, 2.27, 2.13, 1.87, 1.99, 2.01, 2.05, 2.01, 2.08, 1.9, 1.78, 1.72, 1.84, 2, 1.92, 2.04, 2.46, 4.67, 5.99, 6.76], '1Y': [1.43, 1.61, 1.56, 1.39, 1.37, 1.51, 1.45, 1.66, 1.54, 1.53, 1.69, 1.57, 1.83, 1.59, 1.64, 1.77, 2.14, 1.97, 2.34, 2.4, 2.15, 2.12, 2.09, 2.18, 1.68, 1.84, 1.81, 1.92, 1.82, 1.99, 1.84, 1.98, 2.23, 2.19, 2.05, 2.01, 1.99, 2.01, 2.05, 2, 2.01, 1.77, 1.8, 1.7, 1.84, 1.96, 1.92, 2.04, 2.46, 4.67, 5.99, 6.76] },
      velocityScore: { '1D': -14.6, '1W': 10.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1B', pe: null, revenueGrowth: 479, eps: -0.3, grossMargin: 6, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 3.85 },
      tonyNote: 'Hyliion is a small-cap commercial truck powertrain electrification company. It holds a speculative position in Electrification ETFs on the heavy-duty vehicle decarbonization thesis. Revenue is early-stage and the path to profitability is long; the ETF weight is small, reflecting a lottery-ticket allocation to an electrification theme adjacent holding.',
    },
    {
      ticker: 'OGE', name: 'OGE ENERGY CORP', easyScore: 1, avgWeight: 3.76, proScore: 1.88, coverage: 0.25,
      price: 46.64, weeklyPrices: [48.41, 48.18, 47.38, 47.23, 46.64], weeklyChange: -3.66, sortRank: 0, periodReturns: { '1M': -3.2, '6M': 4, '1Y': 5.2 },
      priceHistory: { '1W': [48.41, 48.18, 47.38, 47.23, 46.64], '1M': [48.18, 47.84, 47.84, 47.73, 47.33, 47.35, 47.4, 47.64, 47.34, 47.51, 46.27, 47.31, 48.05, 47.9, 48.1, 48.54, 48.41, 48.18, 47.38, 47.23, 46.64], '6M': [44.86, 42.88, 43.2, 43.03, 43.03, 42.16, 43.48, 43.18, 43.48, 43.98, 46.14, 47.35, 49.14, 48.26, 47.86, 47.37, 47.67, 48.76, 49.45, 48.16, 47.1, 48.18, 47.35, 46.27, 48.54, 46.64], '1Y': [44.34, 43.77, 43.87, 44.72, 44.67, 44.16, 43.79, 45.77, 44.91, 45.42, 45.17, 45.1, 45.11, 44.3, 43.94, 44.11, 44.79, 46.27, 45.96, 46.52, 46.66, 45.39, 44.29, 45.38, 44.14, 44.85, 44.42, 43.07, 43.07, 42.98, 42.7, 42.71, 43.72, 42.69, 43.68, 43.96, 46.14, 47.35, 49.14, 48.2, 48.35, 46.14, 47.54, 48.61, 48.6, 47.3, 47.1, 48.18, 47.35, 46.27, 48.54, 46.64] },
      velocityScore: { '1D': -13, '1W': -1.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 20.7, revenueGrowth: 1, eps: 2.25, grossMargin: 44, dividendYield: 3.6,
      etfPresence: { POW: false, VOLT: 3.76, PBD: false, PBW: false },
      tonyNote: 'OGE Energy is a regional Oklahoma utility held in Electrification ETFs. Revenue is regulated, dividend yield is the primary return driver, and the load growth thesis is less prominent than for AEP or NEE. The ETF allocation is defensive — utilities in electrification ETFs serve as yield anchors alongside the higher-growth infrastructure names.',
    },
    {
      ticker: 'APH', name: 'Amphenol Corp', easyScore: 2, avgWeight: 2.54, proScore: 1.8, coverage: 0.5,
      price: 146.71, weeklyPrices: [139.56, 140.24, 147.68, 148.76, 146.71], weeklyChange: 5.12, sortRank: 0, periodReturns: { '1M': 3.1, '6M': 5.4, '1Y': 62.4 },
      priceHistory: { '1W': [139.56, 140.24, 147.68, 148.76, 146.71], '1M': [142.3, 141.03, 136.69, 138.47, 136.62, 128.03, 122.47, 127.87, 124.64, 129.19, 125, 121.72, 119.2, 123.05, 124.86, 132.06, 139.56, 140.24, 147.68, 148.76, 146.71], '6M': [139.22, 140.06, 129.9, 135.14, 136.2, 138.91, 146.75, 152.5, 149.58, 127.63, 143.73, 151.04, 146.06, 136.24, 131.47, 130.65, 123.13, 128, 140.75, 151.06, 149.71, 142.3, 128.03, 125, 132.06, 146.71], '1Y': [90.36, 92.96, 93.38, 95.8, 97.39, 98.21, 99.44, 101.78, 105.31, 107.93, 111.85, 109.98, 109.9, 110.69, 119.09, 118.41, 125.4, 123.75, 124.53, 122.64, 124.44, 137.29, 136.7, 143.47, 132.44, 137.81, 141.49, 138.58, 129.13, 137.12, 135.14, 136.25, 154.22, 150.99, 144.08, 136.23, 143.73, 151.04, 146.06, 131.87, 133.92, 126.74, 123.62, 126.49, 145.27, 152.81, 149.71, 142.3, 128.03, 125, 132.06, 146.71] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$180B', pe: 42.2, revenueGrowth: 58, eps: 3.48, grossMargin: 38, dividendYield: 0.67,
      etfPresence: { POW: 0.92, VOLT: 4.16, PBD: false, PBW: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'ETR', name: 'ENTERGY CORP', easyScore: 1, avgWeight: 3.59, proScore: 1.79, coverage: 0.25,
      price: 107.46, weeklyPrices: [111.97, 111.51, 109.62, 109.05, 107.46], weeklyChange: -4.03, sortRank: 0, periodReturns: { '1M': -7.7, '6M': 13.6, '1Y': 29.3 },
      priceHistory: { '1W': [111.97, 111.51, 109.62, 109.05, 107.46], '1M': [116.43, 116.4, 117.36, 112.96, 112.02, 111.59, 112.97, 112.93, 112.35, 112.9, 109.03, 109.58, 110.55, 111.93, 112.27, 112.4, 111.97, 111.51, 109.62, 109.05, 107.46], '6M': [94.59, 92.9, 93.75, 91.99, 93.37, 91.31, 95.17, 93.54, 96.03, 96.89, 101.96, 104.02, 107.11, 105.48, 104.52, 103.94, 102.86, 114.9, 116.47, 115.52, 113.64, 116.43, 111.59, 109.03, 112.4, 107.46], '1Y': [83.14, 82.81, 81.73, 82.97, 82.53, 81.46, 82.87, 88.53, 88.24, 90.4, 90.89, 88.81, 89.59, 87.2, 88.44, 88.18, 90.85, 93.19, 95.98, 96.66, 95.66, 95.02, 96.23, 96.87, 94.44, 95.27, 92.97, 93.23, 92.81, 92.33, 92.43, 91.19, 95.67, 93.19, 95.89, 97.96, 101.96, 104.02, 107.11, 104.7, 105.58, 99.9, 109.88, 114.57, 115.33, 113.66, 113.64, 116.43, 111.59, 109.03, 112.4, 107.46] },
      velocityScore: { '1D': -13.5, '1W': -1.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$49B', pe: 27.5, revenueGrowth: 12, eps: 3.91, grossMargin: 47, dividendYield: 2.35,
      etfPresence: { POW: false, VOLT: 3.59, PBD: false, PBW: false },
      tonyNote: 'Entergy is a regulated utility operating in the Gulf Coast region, held in Electrification ETFs for income and load growth from industrial and data center customers. The dividend is well-covered and the rate base is growing as Louisiana and Texas attract manufacturing reshoring and technology infrastructure investment.',
    },
    {
      ticker: 'ET', name: 'ENERGY TRANSFER LP', easyScore: 1, avgWeight: 3.44, proScore: 1.72, coverage: 0.25,
      price: 19.27, weeklyPrices: [19.60, 19.33, 19.42, 19.17, 19.27], weeklyChange: -1.71, sortRank: 0, periodReturns: { '1M': -3.4, '6M': 14.5, '1Y': 10.2 },
      priceHistory: { '1W': [19.6, 19.33, 19.42, 19.17, 19.27], '1M': [19.94, 20.08, 20.39, 19.87, 19.92, 19.34, 19.61, 20, 20.1, 20.36, 20.15, 20.19, 20.39, 20.16, 20.01, 20.07, 19.6, 19.33, 19.42, 19.17, 19.27], '6M': [16.83, 16.8, 16.5, 16.3, 16.54, 16.52, 17.5, 18.11, 18.53, 18.19, 18.26, 18.98, 18.84, 18.67, 18.56, 18.96, 19.44, 18.93, 19.19, 18.86, 19.08, 19.94, 19.34, 20.15, 20.07, 19.27], '1Y': [17.48, 17.71, 18.15, 17.69, 17.81, 17.64, 17.59, 17.33, 18.16, 17.73, 17.39, 17.35, 17.59, 17.57, 17.42, 17.53, 17.11, 17.16, 16.67, 16.53, 16.76, 16.99, 16.55, 16.7, 16.97, 16.27, 16.59, 16.67, 16.36, 16.36, 16.49, 16.89, 17.46, 17.99, 18.45, 17.94, 18.26, 18.98, 18.84, 18.74, 18.75, 19.01, 19.67, 18.96, 18.85, 18.91, 19.08, 19.94, 19.34, 20.15, 20.07, 19.27] },
      velocityScore: { '1D': -14, '1W': -3.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$66B', pe: 16.1, revenueGrowth: 32, eps: 1.2, grossMargin: 19, dividendYield: 6.96,
      etfPresence: { POW: false, VOLT: 3.44, PBD: false, PBW: false },
      tonyNote: 'Energy Transfer is a midstream pipeline MLP held in Electrification ETFs for its natural gas infrastructure exposure — power plants running on natural gas are a key bridge fuel for data center load growth in states where renewables cannot meet baseload demand. High dividend yield and steady fee-based revenue make it an income-oriented allocation.',
    },
    {
      ticker: 'BLDP', name: 'Ballard Power Systems Inc', easyScore: 2, avgWeight: 2.41, proScore: 1.7, coverage: 0.5,
      price: 6.08, weeklyPrices: [5.94, 6.09, 6.19, 6.29, 6.08], weeklyChange: 2.36, sortRank: 0, periodReturns: { '1M': 79.4, '6M': 126.9, '1Y': 375 },
      priceHistory: { '1W': [5.94, 6.09, 6.19, 6.29, 6.08], '1M': [3.39, 3.29, 4.33, 4.78, 4.7, 4.13, 4.17, 4.16, 4.14, 4.13, 4.45, 4.33, 4.18, 4.76, 5.43, 5.54, 5.94, 6.09, 6.19, 6.29, 6.08], '6M': [2.68, 2.8, 2.63, 2.65, 2.54, 2.71, 2.75, 2.66, 2.49, 2.03, 2.07, 2.11, 2.14, 2.1, 2.42, 2.48, 2.45, 2.48, 2.81, 2.96, 3.28, 3.39, 4.13, 4.45, 5.54, 6.08], '1Y': [1.28, 1.64, 1.79, 1.47, 1.61, 1.95, 1.87, 2.04, 1.86, 1.86, 1.73, 1.94, 2.06, 1.89, 1.93, 2.52, 2.92, 2.72, 3.63, 3.98, 3.33, 3.44, 3.37, 3.57, 2.89, 2.69, 2.71, 2.82, 2.65, 2.67, 2.54, 2.73, 2.7, 2.64, 2.33, 2.15, 2.07, 2.11, 2.14, 2.01, 2.39, 2.41, 2.39, 2.53, 2.7, 3.17, 3.28, 3.39, 4.13, 4.45, 5.54, 6.08] },
      velocityScore: { '1D': -11, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2B', pe: null, revenueGrowth: 26, eps: -0.27, grossMargin: 11, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: 2.26, PBW: 2.56 },
      tonyNote: 'Ballard Power Systems is a hydrogen fuel cell technology company. It appears in Electrification ETFs as a long-duration bet on hydrogen as a zero-carbon fuel for heavy industry and transit. Revenue is small, the company is pre-profitability, and the weight is minimal — this is a thematic placeholder allocation, not a fundamental position.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, avgWeight: 2.39, proScore: 1.69, coverage: 0.5,
      price: 297, weeklyPrices: [339.65, 328.34, 317.08, 302.18, 297.00], weeklyChange: -12.56, sortRank: 0, periodReturns: { '1M': -23.7, '6M': 42.9, '1Y': 157 },
      priceHistory: { '1W': [339.65, 328.34, 317.08, 302.18, 297], '1M': [389.05, 387.03, 345.63, 360.81, 351.94, 357.24, 354.97, 339.42, 339.19, 344.6, 323.46, 309.06, 302.84, 313.05, 323.79, 324.86, 339.65, 328.34, 317.08, 302.18, 297], '6M': [207.78, 221.85, 216.87, 217.76, 213.41, 224.4, 237.9, 275.57, 269.12, 257.64, 312.95, 331.23, 335.57, 311.42, 305.82, 327.8, 313.11, 332.31, 379.64, 375.6, 387.24, 389.05, 357.24, 323.46, 324.86, 297], '1Y': [115.58, 125.73, 125.26, 132.51, 133.59, 141.13, 139.1, 140.68, 142.21, 139.58, 158.81, 150.41, 154.44, 145.25, 157.25, 157.79, 176.59, 170.14, 173.09, 182.75, 196.58, 204.62, 195.05, 215.98, 199.22, 205.92, 210.94, 221.27, 215.16, 217.51, 209.37, 210.99, 257.29, 262.19, 255.36, 273.26, 312.95, 331.23, 335.57, 290.78, 302.02, 317.21, 310.76, 331.9, 378.94, 380.22, 387.24, 389.05, 357.24, 323.46, 324.86, 297] },
      velocityScore: { '1D': -27.5, '1W': -6.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 61.7, revenueGrowth: 26, eps: 4.81, grossMargin: 39, dividendYield: 0.13,
      etfPresence: { POW: 0.9, VOLT: 3.88, PBD: false, PBW: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'MOD', name: 'MODINE MANUFACTURING CO', easyScore: 1, avgWeight: 3.38, proScore: 1.69, coverage: 0.25,
      price: 285.95, weeklyPrices: [295.88, 279.93, 270.70, 278.91, 285.95], weeklyChange: -3.35, sortRank: 0, periodReturns: { '1M': 7.2, '6M': 80.2, '1Y': 222.1 },
      priceHistory: { '1W': [295.88, 279.93, 270.7, 278.91, 285.95], '1M': [266.83, 259.76, 271.6, 274.22, 269.65, 273, 284.8, 276.27, 279.2, 292.16, 271.26, 247.13, 244.49, 257.33, 250.11, 260.52, 295.88, 279.93, 270.7, 278.91, 285.95], '6M': [158.66, 153.89, 142.27, 137.03, 135.15, 119.68, 125.05, 147.52, 176.72, 205.32, 215.45, 226.36, 227.25, 204.77, 191.93, 200.87, 215.81, 219.32, 241.46, 243.71, 251.7, 266.83, 273, 271.26, 260.52, 285.95], '1Y': [88.79, 90.69, 95.85, 99.93, 98, 98.68, 90.02, 93.83, 111.95, 140.51, 142.12, 137.05, 141.51, 133.78, 151.5, 152.48, 146.14, 142.16, 149.82, 153.65, 156.71, 162.02, 146.14, 151.7, 130.57, 155.79, 160.45, 152.95, 138.59, 137.64, 133.51, 120, 131.86, 145.99, 184.66, 215.72, 215.45, 226.36, 227.25, 187.29, 188.54, 196.55, 213.96, 214.88, 256.99, 251.5, 251.7, 266.83, 273, 271.26, 260.52, 285.95] },
      velocityScore: { '1D': -10.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$15B', pe: 126.5, revenueGrowth: 48, eps: 2.26, grossMargin: 23, dividendYield: null,
      etfPresence: { POW: false, VOLT: 3.38, PBD: false, PBW: false },
      tonyNote: 'Modine Manufacturing is a thermal management company — heat exchangers and liquid cooling systems for data centers and industrial applications. It holds a position in Industrials ETFs as a direct beneficiary of the AI server cooling challenge. Revenue grew materially as data center customers upgraded from air to liquid cooling; the growth runway remains substantial.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'TKR', name: 'TKR', easyScore: 1, avgWeight: 8.77, proScore: 3.92, coverage: 0.2,
      price: 125.88, weeklyPrices: [127.42, 127.16, 126.78, 127.98, 125.88], weeklyChange: -1.21, sortRank: 0, periodReturns: { '1M': 15.5, '6M': 57.4, '1Y': 82.5 },
      priceHistory: { '1W': [127.42, 127.16, 126.78, 127.98, 125.88], '1M': [109, 107.12, 109.63, 119.7, 116.34, 117.97, 117.39, 117.12, 115.74, 116.74, 114.49, 112.73, 109.36, 117.2, 118.93, 119.95, 127.42, 127.16, 126.78, 127.98, 125.88], '6M': [79.95, 83.44, 87.01, 86.34, 85.81, 88.05, 91.91, 94.6, 94.15, 102.15, 107.35, 108.16, 108.38, 103.05, 99.7, 97.44, 99.06, 98.92, 106.75, 107.66, 107.2, 109, 117.97, 114.49, 119.95, 125.88], '1Y': [68.98, 72.63, 71.63, 73.62, 75.44, 77.68, 76.33, 80.02, 80.98, 74.65, 76.91, 76.88, 78.96, 75.12, 76.4, 77.11, 76.75, 75.18, 75.83, 74.28, 77.3, 77.22, 76.29, 78.2, 74.33, 81.22, 79.82, 83.16, 85.77, 86.09, 84.13, 90.6, 93.73, 93.94, 93.19, 106.04, 107.35, 108.16, 108.38, 99.68, 97.54, 95.25, 97.56, 98.94, 106.9, 108.45, 107.2, 109, 117.97, 114.49, 119.95, 125.88] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$9B', pe: 28.6, revenueGrowth: 8, eps: 4.4, grossMargin: 31, dividendYield: 1.13,
      etfPresence: { AIRR: false, PRN: false, RSHO: 8.77, IDEF: false, BILT: false },
      tonyNote: 'TKR appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CGNX', name: 'CGNX', easyScore: 1, avgWeight: 7.65, proScore: 3.42, coverage: 0.2,
      price: 64.93, weeklyPrices: [68.33, 66.70, 66.01, 65.85, 64.93], weeklyChange: -4.98, sortRank: 0, periodReturns: { '1M': 16.1, '6M': 71.1, '1Y': 118.8 },
      priceHistory: { '1W': [68.33, 66.7, 66.01, 65.85, 64.93], '1M': [55.94, 56.3, 58.83, 62.26, 65.92, 65.66, 67.26, 65.68, 63.64, 66.09, 64.26, 61.91, 60.65, 63.37, 64.27, 66.09, 68.33, 66.7, 66.01, 65.85, 64.93], '6M': [37.95, 38.42, 34.8, 36.58, 36.37, 37.93, 40.06, 41.71, 39.09, 39.49, 58.67, 56.03, 54.4, 51.25, 48.77, 50.25, 49.33, 49.17, 53.41, 55.5, 54.26, 55.94, 65.66, 64.26, 66.09, 64.93], '1Y': [29.68, 31.14, 30.54, 30.71, 32.05, 33.32, 33.22, 34.26, 34.26, 41.86, 42.2, 43.4, 43.89, 43.97, 44.4, 44.08, 46.43, 45.3, 45.95, 45.23, 48.27, 47.29, 40, 38.4, 35.91, 37.76, 38.19, 38.22, 36.83, 36.66, 35.98, 37.74, 40.59, 39.76, 38.74, 42.37, 58.67, 56.03, 54.4, 49.45, 47.98, 49.24, 47.59, 49.52, 54.39, 55.48, 54.26, 55.94, 65.66, 64.26, 66.09, 64.93] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$11B', pe: 76.4, revenueGrowth: 24, eps: 0.85, grossMargin: 68, dividendYield: 0.51,
      etfPresence: { AIRR: false, PRN: false, RSHO: 7.65, IDEF: false, BILT: false },
      tonyNote: 'CGNX appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 7.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 5.38, proScore: 3.41, coverage: 0.4,
      price: 853.8, weeklyPrices: [783.53, 782.12, 842.96, 860.84, 853.80], weeklyChange: 8.97, sortRank: 0, periodReturns: { '1M': 60.3, '6M': 166.4, '1Y': 350.3 },
      priceHistory: { '1W': [783.53, 782.12, 842.96, 860.84, 853.8], '1M': [532.67, 529.49, 806, 886.22, 811.41, 844.8, 868.18, 851.35, 854.28, 889.03, 848.84, 770.76, 728.29, 752, 733.77, 732.94, 783.53, 782.12, 842.96, 860.84, 853.8], '6M': [320.51, 324.62, 319.12, 313.04, 307.68, 312.24, 319.27, 364.25, 379.23, 365.07, 431.43, 435.5, 428.13, 398.87, 404.59, 431.78, 415.93, 416.34, 446.36, 463.65, 497.18, 532.67, 844.8, 848.84, 732.94, 853.8], '1Y': [189.6, 202.91, 209.55, 229.38, 222.54, 233.39, 238.4, 242.01, 264.08, 296.58, 308.4, 276.02, 292.95, 273.82, 301.13, 320.94, 371.84, 339.68, 348.57, 361.44, 364.32, 379.89, 382.57, 381.22, 333.88, 332.96, 327.78, 324.1, 319.13, 315.87, 306.23, 297.62, 336.31, 351.39, 357.91, 401.29, 431.43, 435.5, 428.13, 395.11, 398.12, 401.61, 420.24, 393.71, 459.02, 472.9, 497.18, 532.67, 844.8, 848.84, 732.94, 853.8] },
      velocityScore: { '1D': -34.7, '1W': -28.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$26B', pe: 76.3, revenueGrowth: 92, eps: 11.19, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 6.35, PRN: 4.42, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 5.23, proScore: 3.31, coverage: 0.4,
      price: 283.75, weeklyPrices: [291.97, 295.94, 288.90, 284.42, 283.75], weeklyChange: -2.82, sortRank: 0, periodReturns: { '1M': 3.1, '6M': 166.4, '1Y': 393 },
      priceHistory: { '1W': [291.97, 295.94, 288.9, 284.42, 283.75], '1M': [275.33, 269.95, 294.69, 320.3, 305.93, 309.39, 322.05, 308.05, 300.84, 296.98, 292.65, 266.8, 261.58, 271.05, 270.75, 279.22, 291.97, 295.94, 288.9, 284.42, 283.75], '6M': [106.53, 114.29, 109.31, 112.18, 109.16, 118.62, 133.76, 142.29, 152.31, 179.6, 197.63, 182.27, 174.53, 167.67, 171.19, 175.13, 174.8, 182.6, 230.94, 241.01, 252.76, 275.33, 309.39, 292.65, 279.22, 283.75], '1Y': [57.55, 63.41, 65.05, 62.82, 70.01, 70.64, 70.37, 73.67, 77.77, 78.75, 90.06, 84.7, 91.08, 85.72, 92.33, 97.11, 97.41, 101.6, 104.42, 105.73, 116.11, 128.09, 126.71, 121.07, 107.22, 104.18, 107.5, 115.02, 110.88, 112.88, 106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 197.63, 182.27, 174.53, 161.22, 167.57, 172, 179.35, 186.72, 228.99, 241.65, 252.76, 275.33, 309.39, 292.65, 279.22, 283.75] },
      velocityScore: { '1D': 82.9, '1W': 81.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 55.4, revenueGrowth: 7, eps: 5.12, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { AIRR: 2.54, PRN: false, RSHO: 7.92, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'RTX', name: 'RTX CORP', easyScore: 1, avgWeight: 7, proScore: 3.13, coverage: 0.2,
      price: 176.85, weeklyPrices: [178.97, 176.59, 178.96, 179.66, 176.85], weeklyChange: -1.18, sortRank: 0, periodReturns: { '1M': 1.6, '6M': 5.3, '1Y': 28.7 },
      priceHistory: { '1W': [178.97, 176.59, 178.96, 179.66, 176.85], '1M': [173.99, 172.9, 172.87, 176.74, 176.78, 176.09, 178.61, 178.89, 178.11, 175.68, 171.18, 175.95, 174.49, 174.85, 175.98, 177.01, 178.97, 176.59, 178.96, 179.66, 176.85], '6M': [168.02, 171.52, 182.11, 185.68, 184.01, 185.73, 198.84, 196.34, 199.88, 195.97, 201.14, 204.92, 202.62, 203.86, 203.04, 200.73, 192.85, 196.21, 201.56, 196.42, 174.26, 173.99, 176.09, 171.18, 177.01, 176.85], '1Y': [137.46, 140.98, 146.46, 141.85, 144.19, 146.18, 148.68, 149.17, 157.12, 156.33, 155.49, 153.66, 159.57, 158.11, 155, 158.31, 160.54, 167.33, 169.27, 159.4, 173.04, 178.67, 175.61, 179.22, 174.72, 172.15, 168.8, 171.93, 179.93, 185.76, 183.4, 187.17, 199.83, 195.93, 200.93, 198.66, 201.14, 204.92, 202.62, 209.76, 204.52, 198.16, 189.71, 198.41, 201.41, 195.79, 174.26, 173.99, 176.09, 171.18, 177.01, 176.85] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$238B', pe: 33.1, revenueGrowth: 9, eps: 5.34, grossMargin: 20, dividendYield: 1.54,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 7, BILT: false },
      tonyNote: 'RTX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 7.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 4.88, proScore: 3.09, coverage: 0.4,
      price: 870.88, weeklyPrices: [908.55, 909.93, 887.67, 875.87, 870.88], weeklyChange: -4.15, sortRank: 0, periodReturns: { '1M': -2.1, '6M': 53.3, '1Y': 152.7 },
      priceHistory: { '1W': [908.55, 909.93, 887.67, 875.87, 870.88], '1M': [889.67, 874.78, 904.59, 926.93, 895.69, 897.45, 926.79, 912.14, 902.3, 920.22, 888.31, 863.95, 860.15, 872.56, 865.95, 879.89, 908.55, 909.93, 887.67, 875.87, 870.88], '6M': [568.06, 596.5, 589.76, 582.41, 577.39, 596.52, 638.75, 648.41, 665.24, 678.31, 758.29, 759.74, 742.83, 706.08, 700.69, 688.65, 703.19, 717.22, 790.66, 794.65, 830.79, 889.67, 897.45, 888.31, 879.89, 870.88], '1Y': [344.67, 358.07, 362.44, 373.02, 390.92, 402.18, 404.64, 417.19, 430.05, 434.23, 412.71, 416.09, 431.26, 415.12, 422.91, 450.66, 471.26, 477.15, 486.71, 527.47, 524.65, 524.47, 547.58, 567.93, 546.88, 566.61, 582.47, 594.36, 588.93, 582.42, 572.87, 608.13, 647.18, 626.62, 657.36, 726.2, 758.29, 759.74, 742.83, 680.9, 693.99, 680.88, 695.4, 721.24, 791.73, 798.4, 830.79, 889.67, 897.45, 888.31, 879.89, 870.88] },
      velocityScore: { '1D': null, '1W': 34.9, '1M': null, '6M': null }, isNew: true,
      marketCap: '$401B', pe: 43.4, revenueGrowth: 22, eps: 20.06, grossMargin: 29, dividendYield: 0.69,
      etfPresence: { AIRR: false, PRN: 3.11, RSHO: 6.65, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'LMT', name: 'LOCKHEED MARTIN CORP', easyScore: 1, avgWeight: 6.2, proScore: 2.77, coverage: 0.2,
      price: 524.53, weeklyPrices: [532.90, 531.14, 537.21, 530.45, 524.53], weeklyChange: -1.57, sortRank: 0, periodReturns: { '1M': 2.3, '6M': 19.4, '1Y': 9.5 },
      priceHistory: { '1W': [532.9, 531.14, 537.21, 530.45, 524.53], '1M': [512.77, 518.15, 508.93, 514.26, 512.41, 506.51, 512.25, 521, 519.94, 520.41, 516.01, 528.31, 526.63, 522.59, 522.79, 533.24, 532.9, 531.14, 537.21, 530.45, 524.53], '6M': [439.19, 465.38, 484.42, 483.57, 488, 496.87, 572.7, 593.91, 622.51, 609.18, 637.43, 658.26, 658.08, 655, 652.83, 637.51, 627.33, 622.79, 613.72, 592.19, 513.45, 512.77, 506.51, 516.01, 533.24, 524.53], '1Y': [478.82, 480.83, 467.06, 460.2, 465.94, 463.06, 470.12, 410.74, 420.13, 428.24, 431.56, 441.1, 455.46, 449.06, 463.87, 473.12, 486.67, 499.21, 511.07, 505.18, 489.5, 485.77, 484.98, 457.07, 474.72, 452.41, 441.82, 466.89, 477.06, 482.55, 483.67, 518.44, 577.89, 590.82, 634.22, 623.58, 637.43, 658.26, 658.08, 671.77, 646, 627.43, 615.84, 637.9, 619.69, 581.28, 513.45, 512.77, 506.51, 516.01, 533.24, 524.53] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$121B', pe: 25.4, revenueGrowth: 0, eps: 20.63, grossMargin: 10, dividendYield: 2.6,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 6.2, BILT: false },
      tonyNote: 'LOCKHEED MARTIN CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 6.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.37, proScore: 2.76, coverage: 0.4,
      price: 1803, weeklyPrices: [1883.56, 1867.09, 1855.15, 1828.21, 1803.00], weeklyChange: -4.28, sortRank: 0, periodReturns: { '1M': -3.4, '6M': 87.6, '1Y': 277.9 },
      priceHistory: { '1W': [1883.56, 1867.09, 1855.15, 1828.21, 1803], '1M': [1867.02, 1891.95, 1967.24, 2011.49, 1942.02, 1952.37, 2032.98, 2016.31, 2034.63, 2042.36, 1992.74, 1854.43, 1825.5, 1835.51, 1835.33, 1828.25, 1883.56, 1867.09, 1855.15, 1828.21, 1803], '6M': [961.2, 989.48, 968.48, 950.79, 946.93, 1035.12, 1053.1, 1131.7, 1171.46, 1147.97, 1300.02, 1462.23, 1429.37, 1348.22, 1373.76, 1444.6, 1358.66, 1417.19, 1592.84, 1650.47, 1726.12, 1867.02, 1952.37, 1992.74, 1828.25, 1803], '1Y': [477.08, 501.33, 500.91, 513.32, 521.66, 535.02, 539.02, 532.14, 687.67, 691.45, 718.61, 683.93, 707.39, 700.69, 752.1, 762.91, 804.24, 825.18, 816.53, 831.89, 829.36, 980.97, 955.96, 954.53, 920.99, 957.04, 935.78, 983.61, 968.5, 965.37, 933.29, 971.49, 1091.04, 1121.44, 1142.1, 1230.26, 1300.02, 1462.23, 1429.37, 1279.06, 1365.34, 1356.75, 1366.77, 1434.09, 1627.81, 1680.09, 1726.12, 1867.02, 1952.37, 1992.74, 1828.25, 1803] },
      velocityScore: { '1D': -37.1, '1W': -39.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$63B', pe: 52.2, revenueGrowth: 1, eps: 34.55, grossMargin: 25, dividendYield: 0.14,
      etfPresence: { AIRR: 4.2, PRN: 4.54, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, avgWeight: 4.18, proScore: 2.64, coverage: 0.4,
      price: 663, weeklyPrices: [670.66, 673.51, 677.45, 667.02, 663.00], weeklyChange: -1.14, sortRank: 0, periodReturns: { '1M': -5.6, '6M': 82.3, '1Y': 215.8 },
      priceHistory: { '1W': [670.66, 673.51, 677.45, 667.02, 663], '1M': [702.27, 697.15, 720, 727.54, 690, 680.26, 683.52, 681.01, 719.92, 740.91, 722.31, 664.76, 639.58, 630.5, 644.64, 656.35, 670.66, 673.51, 677.45, 667.02, 663], '6M': [363.73, 319.31, 317.58, 337.9, 315.44, 337.03, 317.76, 380.36, 355.51, 345.97, 413.65, 437.61, 451.25, 430.25, 459.3, 479.9, 410.85, 575.16, 603.84, 597.88, 652.99, 702.27, 680.26, 722.31, 656.35, 663], '1Y': [209.96, 217.97, 218.59, 214.63, 203.78, 206.63, 222.2, 205.66, 238.15, 233.13, 239.05, 213.76, 230.02, 227.03, 225.82, 239.42, 266.64, 270.05, 268.53, 300.72, 281, 292.46, 303.2, 347.88, 344.36, 373.29, 357.48, 332.87, 320.1, 333.23, 313.32, 313.98, 329.66, 363.88, 347.11, 352.09, 413.65, 437.61, 451.25, 414.2, 458.31, 473.85, 566.62, 572.31, 598.44, 611.21, 652.99, 702.27, 680.26, 722.31, 656.35, 663] },
      velocityScore: { '1D': -37.3, '1W': -37.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 68.1, revenueGrowth: 13, eps: 9.74, grossMargin: 20, dividendYield: 0.3,
      etfPresence: { AIRR: 4.08, PRN: 4.28, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Argan Inc is an engineering and construction company for power generation facilities — natural gas and renewable power plants. It appears in Industrials ETFs because power plant construction is one of the fastest-growing categories in U.S. infrastructure spending, driven by data center load additions that the grid cannot currently support.',
    },
    {
      ticker: 'ETN', name: 'ETN', easyScore: 1, avgWeight: 5.71, proScore: 2.55, coverage: 0.2,
      price: 401.1, weeklyPrices: [403.13, 406.37, 401.94, 400.60, 401.10], weeklyChange: -0.5, sortRank: 0, periodReturns: { '1M': -5.7, '6M': 18.1, '1Y': 25.8 },
      priceHistory: { '1W': [403.13, 406.37, 401.94, 400.6, 401.1], '1M': [425.55, 422.44, 410.86, 421.39, 399.15, 401.51, 419, 401.53, 406.94, 408.1, 399.44, 381.87, 371.88, 379.69, 381.51, 391.35, 403.13, 406.37, 401.94, 400.6, 401.1], '6M': [339.71, 343.39, 333.21, 320.39, 320.86, 322.67, 331.14, 334.04, 354.37, 354.67, 390.33, 373.38, 375.92, 354.79, 348.64, 360.23, 357.1, 361.1, 403, 406.21, 423.92, 425.55, 401.51, 399.44, 391.35, 401.1], '1Y': [318.86, 325.81, 338.01, 343.26, 355.04, 359.78, 362.11, 372.65, 390.01, 356.45, 363.3, 349, 352.02, 342.99, 362.25, 363.35, 368.52, 374.25, 370.94, 374.35, 373.46, 376.01, 377.72, 367.91, 338.29, 336.65, 333.11, 341.76, 329.93, 322.81, 318.51, 320.58, 333.46, 331.22, 351.42, 373.82, 390.33, 373.38, 375.92, 347.75, 355.4, 356.8, 357.36, 363.89, 403.36, 407.57, 423.92, 425.55, 401.51, 399.44, 391.35, 401.1] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$156B', pe: 39.2, revenueGrowth: 17, eps: 10.22, grossMargin: 37, dividendYield: 1.1,
      etfPresence: { AIRR: false, PRN: false, RSHO: 5.71, IDEF: false, BILT: false },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'UNP', name: 'UNION PACIFIC CORP', easyScore: 1, avgWeight: 5.48, proScore: 2.45, coverage: 0.2,
      price: 261.92, weeklyPrices: [271.10, 279.39, 267.00, 262.64, 261.92], weeklyChange: -3.39, sortRank: 0, periodReturns: { '1M': -1.7, '6M': 13.2, '1Y': 19.7 },
      priceHistory: { '1W': [271.1, 279.39, 267, 262.64, 261.92], '1M': [266.32, 263.41, 264.01, 268.23, 264.89, 264.65, 263.35, 265.6, 264.65, 269.34, 270.56, 275.13, 271.56, 265.8, 265.44, 265.88, 271.1, 279.39, 267, 262.64, 261.92], '6M': [231.36, 235.44, 240.47, 234.61, 233.06, 224.48, 227.14, 231.37, 233.58, 251.45, 261.77, 266.1, 264.98, 260.2, 244.1, 234.18, 239.19, 244.71, 250.51, 251.14, 268.7, 266.32, 264.65, 270.56, 265.88, 261.92], '1Y': [218.89, 224.14, 224.65, 227.91, 235.57, 236.49, 231.14, 229.24, 223.77, 222.97, 218.8, 223.77, 222.74, 221.76, 215.19, 217.17, 227.98, 236.37, 231.86, 227.08, 226.54, 217.59, 220.91, 224.8, 220.82, 229.13, 232.24, 231.56, 235.88, 234.15, 231.32, 229.85, 230.51, 229.65, 235.1, 252.62, 261.77, 266.1, 264.98, 254.11, 242.44, 234.92, 238.79, 245.54, 251.34, 252.18, 268.7, 266.32, 264.65, 270.56, 265.88, 261.92] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$156B', pe: 21.5, revenueGrowth: 3, eps: 12.16, grossMargin: 57, dividendYield: 2.1,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: false, BILT: 5.48 },
      tonyNote: 'UNION PACIFIC CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 5.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GTES', name: 'GTES', easyScore: 1, avgWeight: 5.43, proScore: 2.43, coverage: 0.2,
      price: 25.22, weeklyPrices: [25.34, 25.71, 25.48, 25.92, 25.22], weeklyChange: -0.47, sortRank: 0, periodReturns: { '1M': 4.8, '6M': 12.1, '1Y': 20 },
      priceHistory: { '1W': [25.34, 25.71, 25.48, 25.92, 25.22], '1M': [24.06, 24.64, 24.57, 26.24, 25.98, 26.09, 25.98, 25.68, 25.38, 25.67, 24.4, 24.09, 23.45, 24.18, 24.07, 24.48, 25.34, 25.71, 25.48, 25.92, 25.22], '6M': [22.49, 21.61, 21.8, 22.02, 21.82, 21.72, 22.79, 23.85, 23.48, 25.68, 27.53, 27.6, 27.57, 25.44, 23.17, 22.14, 22.71, 22.04, 25.48, 25.58, 25.53, 24.06, 26.09, 24.4, 24.48, 25.22], '1Y': [21.01, 21.96, 22.1, 22.85, 23.38, 24.47, 24.43, 24.49, 24.76, 24.22, 24.45, 24.51, 25.89, 25.38, 25.3, 25.18, 25.39, 24.82, 25.39, 24.91, 26.03, 25.82, 21.48, 22.22, 21.2, 22.67, 22.23, 21.54, 21.59, 22.19, 21.47, 22.49, 23.05, 23.09, 23.02, 26.81, 27.53, 27.6, 27.57, 23.98, 22.75, 21.74, 22.11, 22.5, 25.65, 25.77, 25.53, 24.06, 26.09, 24.4, 24.48, 25.22] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$6B', pe: 26.5, revenueGrowth: 0, eps: 0.95, grossMargin: 40, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: 5.43, IDEF: false, BILT: false },
      tonyNote: 'GTES appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 5.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TTMI', name: 'TTM Technologies Inc', easyScore: 1, avgWeight: 5.42, proScore: 2.42, coverage: 0.2,
      price: 173.72, weeklyPrices: [196.95, 190.67, 187.79, 173.72, 173.72], weeklyChange: -11.79, sortRank: 0, periodReturns: { '1M': 9.3, '6M': 155.8, '1Y': 482.2 },
      priceHistory: { '1W': [196.95, 190.67, 187.79, 173.72, 173.72], '1M': [158.99, 157.47, 159.58, 164.64, 153.77, 157.31, 162.99, 163.36, 168.82, 171.87, 167.35, 158.86, 161.41, 169.36, 174.55, 189.92, 196.95, 190.67, 187.79, 173.72, 173.72], '6M': [67.9, 75.43, 72.05, 70.9, 70.42, 70.18, 96.52, 97.53, 96.48, 92.58, 92.33, 107.93, 104.24, 98.95, 90.54, 97.08, 95.93, 97.48, 121.49, 126.24, 149.01, 158.99, 157.31, 167.35, 189.92, 173.72], '1Y': [29.84, 35.7, 37.09, 37.87, 40.62, 43.99, 45.79, 45.04, 48.52, 43.85, 46.63, 40.5, 44.87, 46.23, 49.43, 49.03, 56.54, 57.6, 58.01, 55.25, 56.69, 59.21, 66.29, 67.87, 63.34, 68.51, 66.75, 76.74, 67.63, 71.59, 69, 66.86, 100.9, 95.02, 98.2, 98.58, 92.33, 107.93, 104.24, 87.91, 90.64, 91.54, 95.47, 95.7, 123.49, 125.81, 149.01, 158.99, 157.31, 167.35, 189.92, 173.72] },
      velocityScore: { '1D': -41, '1W': -44.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: 94.4, revenueGrowth: 30, eps: 1.84, grossMargin: 21, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 5.42, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'TTM Technologies is a printed circuit board manufacturer held in Industrials ETFs. Revenue growth tracks data center and defense electronics demand. PCB manufacturing is essential hardware infrastructure; TTM\'s position in AI server and high-frequency trading hardware gives it exposure to two durable growth verticals.',
    },
    {
      ticker: 'PL', name: 'Planet Labs PBC', easyScore: 2, avgWeight: 3.75, proScore: 2.37, coverage: 0.4,
      price: 47.76, weeklyPrices: [48.32, 50.48, 51.40, 51.14, 47.76], weeklyChange: -1.17, sortRank: 0, periodReturns: { '1M': 29.4, '6M': 308.2, '1Y': 1160 },
      priceHistory: { '1W': [48.32, 50.48, 51.4, 51.14, 47.76], '1M': [36.9, 38.54, 37.13, 39.69, 35.24, 39.04, 41.84, 40.68, 40.74, 43.04, 41.62, 41.61, 41.59, 42.66, 42.48, 44.35, 48.32, 50.48, 51.4, 51.14, 47.76], '6M': [11.7, 12.95, 18.05, 20.6, 19.74, 22.61, 26.73, 26.06, 26.35, 20.43, 21.3, 23.9, 24.14, 24.59, 24.97, 26.96, 32.4, 35.88, 34.67, 38.48, 35.44, 36.9, 39.04, 41.62, 44.35, 47.76], '1Y': [3.79, 5.83, 5.34, 5.57, 6.16, 6.85, 6.43, 6.6, 6.19, 6.39, 6.65, 6.38, 6.98, 6.44, 8.97, 10.23, 12.05, 12.98, 15.68, 14.78, 12.91, 12.84, 12.7, 12.47, 11.45, 11.73, 11.77, 12.84, 17.88, 20.73, 19.72, 22.44, 28.28, 26.94, 24.97, 22.26, 21.3, 23.9, 24.14, 25.28, 24.79, 33.83, 30.86, 35.02, 34.32, 37.5, 35.44, 36.9, 39.04, 41.62, 44.35, 47.76] },
      velocityScore: { '1D': -38.4, '1W': -31.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$17B', pe: null, revenueGrowth: 41, eps: -0.8, grossMargin: 56, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 5.46, RSHO: false, IDEF: 2.03, BILT: false },
      tonyNote: 'Planet Labs is a satellite earth observation company. It holds a speculative position in Industrials ETFs as a data infrastructure name — providing satellite imagery and analytics that support agricultural, energy, and government decision-making. Revenue is growing from a small base; the ETF weight is minimal and the position is thematic.',
    },
    {
      ticker: 'GD', name: 'GENERAL DYNAMICS CORP', easyScore: 1, avgWeight: 5.13, proScore: 2.29, coverage: 0.2,
      price: 342.17, weeklyPrices: [344.64, 342.69, 348.96, 346.82, 342.17], weeklyChange: -0.72, sortRank: 0, periodReturns: { '1M': -1.1, '6M': 2.9, '1Y': 24.1 },
      priceHistory: { '1W': [344.64, 342.69, 348.96, 346.82, 342.17], '1M': [345.84, 349.08, 349.16, 347.27, 347.76, 346.53, 344.03, 346.46, 341.36, 340.62, 334.5, 343.11, 340.14, 339.75, 338.71, 342.89, 344.64, 342.69, 348.96, 346.82, 342.17], '6M': [332.38, 336.01, 340.69, 345.19, 339.47, 345.64, 366, 365.83, 349.95, 352.05, 340.75, 351.42, 357.05, 360.7, 355.23, 349.63, 355.28, 349.09, 335.15, 336.29, 313.21, 345.84, 346.53, 334.5, 342.89, 342.17], '1Y': [275.71, 277.31, 279.29, 281.05, 294.38, 299.96, 300.85, 297.6, 314.7, 313.76, 314.01, 316.4, 322.18, 322.81, 323.05, 325.28, 323.2, 341, 343.43, 335.5, 340.69, 346.68, 343.47, 352.42, 341.29, 341.07, 335.8, 334.27, 337.49, 343.84, 336.66, 351.44, 368.69, 363.27, 351.09, 360.07, 340.75, 351.42, 357.05, 363.49, 351.52, 345.78, 346.76, 351.39, 340.76, 332.14, 313.21, 345.84, 346.53, 334.5, 342.89, 342.17] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$93B', pe: 21.5, revenueGrowth: 10, eps: 15.88, grossMargin: 15, dividendYield: 1.76,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 5.13, BILT: false },
      tonyNote: 'GENERAL DYNAMICS CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 5.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ATI', name: 'ATI', easyScore: 1, avgWeight: 5.01, proScore: 2.24, coverage: 0.2,
      price: 172.52, weeklyPrices: [168.76, 169.84, 170.53, 175.16, 172.52], weeklyChange: 2.23, sortRank: 0, periodReturns: { '1M': 11.1, '6M': 74, '1Y': 113.6 },
      priceHistory: { '1W': [168.76, 169.84, 170.53, 175.16, 172.52], '1M': [155.26, 153.89, 155.35, 165.08, 162.66, 158.39, 161.16, 161.01, 164.83, 162.57, 154.22, 149.62, 150.44, 153.73, 160.41, 162.29, 168.76, 169.84, 170.53, 175.16, 172.52], '6M': [99.14, 99.64, 108.72, 115.76, 116.17, 120.84, 123.24, 123.11, 121.72, 128.67, 139.81, 158.87, 163.59, 154.18, 146.1, 147.54, 143.94, 146.63, 162.21, 164.66, 154.26, 155.26, 158.39, 154.22, 162.29, 172.52], '1Y': [80.77, 84.58, 85.16, 84.12, 83.89, 87.8, 89.89, 92.46, 94.11, 74.47, 75.48, 72.05, 76.48, 76.51, 76.39, 78.44, 78.09, 81.34, 83.51, 84.78, 84.32, 98.53, 96.02, 97.91, 98.18, 99.29, 98.66, 99.42, 108.66, 116.21, 114.76, 118.59, 125.39, 123.55, 120.3, 133.57, 139.81, 158.87, 163.59, 150.09, 141.97, 141.8, 140.43, 147.96, 163.78, 164.06, 154.26, 155.26, 158.39, 154.22, 162.29, 172.52] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$24B', pe: 56.9, revenueGrowth: 1, eps: 3.03, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: 5.01, IDEF: false, BILT: false },
      tonyNote: 'ATI appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 5.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 1, avgWeight: 5.01, proScore: 2.24, coverage: 0.2,
      price: 157.72, weeklyPrices: [136.60, 132.51, 143.34, 156.54, 157.72], weeklyChange: 15.46, sortRank: 0, periodReturns: { '1M': 9.5, '6M': -5.8, '1Y': 19.4 },
      priceHistory: { '1W': [136.6, 132.51, 143.34, 156.54, 157.72], '1M': [144.07, 146.03, 135.91, 133.79, 137.05, 137.8, 136.89, 136, 130.05, 133.73, 133.99, 135.14, 135.26, 137.15, 137.41, 136.88, 136.6, 132.51, 143.34, 156.54, 157.72], '6M': [167.49, 181.49, 183.25, 193.98, 180.84, 181.68, 178.4, 165.9, 151.86, 130.01, 129.13, 135.24, 137.19, 152.67, 153.5, 155.68, 147.56, 148.46, 128.06, 146.39, 143.09, 144.07, 137.8, 133.99, 136.88, 157.72], '1Y': [132.04, 132.06, 141.41, 143.23, 130.68, 143.13, 148.58, 149.07, 156.24, 173.27, 186.97, 157.75, 160.87, 154.9, 166.74, 168.33, 182.55, 182.42, 182.17, 179.74, 181.51, 189.6, 190.74, 190.96, 167.33, 163.55, 170.69, 181.84, 187.75, 194.13, 177.75, 176.86, 177.07, 169.6, 146.59, 135.9, 129.13, 135.24, 137.19, 157.16, 150.95, 150.68, 143.06, 147.93, 132.37, 145.89, 143.09, 144.07, 137.8, 133.99, 136.88, 157.72] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$378B', pe: 177.2, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 5.01, BILT: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'LIN', name: 'LIN', easyScore: 1, avgWeight: 4.88, proScore: 2.18, coverage: 0.2,
      price: 494.79, weeklyPrices: [514.97, 507.87, 501.98, 497.69, 494.79], weeklyChange: -3.92, sortRank: 0, periodReturns: { '1M': -2.6, '6M': 21.5, '1Y': 6.5 },
      priceHistory: { '1W': [514.97, 507.87, 501.98, 497.69, 494.79], '1M': [507.92, 493.55, 500.29, 501.87, 493.85, 493.16, 504.4, 503.87, 513.26, 511.65, 506.11, 510.86, 506.07, 506.63, 514.51, 517.58, 514.97, 507.87, 501.98, 497.69, 494.79], '6M': [407.14, 389.38, 416.99, 423.51, 428.36, 434.14, 439.98, 445.64, 455, 459.69, 472.86, 496.51, 508.08, 490.06, 490.41, 489.8, 495.49, 502.6, 503.15, 492.23, 510.3, 507.92, 493.16, 506.11, 517.58, 494.79], '1Y': [464.57, 472.17, 466.6, 463.16, 476.75, 471.27, 460.56, 472.02, 471.51, 469.84, 473.23, 479.92, 481.92, 471.78, 472.7, 479.86, 479.94, 475, 470.37, 459.25, 450.08, 442.72, 417.94, 426.65, 414.72, 407.85, 408.79, 390.38, 423.51, 425.1, 426.39, 439.69, 440.04, 451.57, 456.97, 448.24, 472.86, 496.51, 508.08, 484.74, 493.92, 488.15, 491.12, 499.47, 508.87, 498.15, 510.3, 507.92, 493.16, 506.11, 517.58, 494.79] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$229B', pe: 32.8, revenueGrowth: 8, eps: 15.08, grossMargin: 49, dividendYield: 1.29,
      etfPresence: { AIRR: false, PRN: false, RSHO: 4.88, IDEF: false, BILT: false },
      tonyNote: 'LIN appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 4.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.39, proScore: 2.14, coverage: 0.4,
      price: 299.9, weeklyPrices: [311.33, 312.65, 308.53, 303.81, 299.90], weeklyChange: -3.67, sortRank: 0, periodReturns: { '1M': -1, '6M': 16.9, '1Y': 33.5 },
      priceHistory: { '1W': [311.33, 312.65, 308.53, 303.81, 299.9], '1M': [302.99, 303.99, 305.48, 315.39, 310.37, 308.87, 310.55, 313.7, 310.87, 315.72, 307.17, 305.22, 302.64, 306.25, 305.66, 307.1, 311.33, 312.65, 308.53, 303.81, 299.9], '6M': [256.44, 257.25, 259.81, 263.48, 261.16, 260.8, 277.62, 282.33, 259.51, 287.03, 279.03, 281.97, 282.58, 274.97, 259.88, 256.58, 260.51, 267.12, 289.01, 291.03, 293.35, 302.99, 308.87, 307.17, 307.1, 299.9], '1Y': [224.57, 233.17, 230.06, 234.89, 242.14, 251.4, 254.41, 264.89, 272.4, 269.28, 270.68, 262.92, 266.99, 261.53, 263.45, 259.5, 264.9, 261.05, 252.74, 252.95, 258.78, 258.03, 256.47, 255.53, 242.61, 255.78, 257.32, 257.3, 258.47, 263.58, 256.77, 264.62, 282.47, 280.14, 260.41, 291.74, 279.03, 281.97, 282.58, 267.78, 255.65, 253.77, 260.67, 269.55, 293.26, 293.92, 293.35, 302.99, 308.87, 307.17, 307.1, 299.9] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$11B', pe: 28.4, revenueGrowth: 7, eps: 10.57, grossMargin: 30, dividendYield: 0.67,
      etfPresence: { AIRR: 1.67, PRN: false, RSHO: 5.11, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BA', name: 'BOEING', easyScore: 1, avgWeight: 4.7, proScore: 2.1, coverage: 0.2,
      price: 224.39, weeklyPrices: [218.90, 224.30, 228.78, 231.15, 224.39], weeklyChange: 2.51, sortRank: 0, periodReturns: { '1M': -1.3, '6M': 20.3, '1Y': 6.1 },
      priceHistory: { '1W': [218.9, 224.3, 228.78, 231.15, 224.39], '1M': [227.38, 221.3, 224.38, 229.93, 231.03, 237.36, 238.21, 236.87, 240.6, 229.21, 220.49, 220.61, 215.01, 222.2, 219.61, 219.02, 218.9, 224.3, 228.78, 231.15, 224.39], '6M': [186.46, 206.27, 205.5, 216.84, 218.5, 228.12, 242.61, 251.41, 234.04, 236.95, 239.35, 232.03, 227.53, 222.06, 204.76, 201.18, 194.36, 208.22, 217.63, 223.38, 232.44, 227.38, 237.36, 220.49, 219.02, 224.39], '1Y': [211.47, 217.51, 201.7, 200.94, 209.79, 226.6, 230, 228.48, 226.08, 224.86, 232.61, 225, 234.83, 232.38, 227.52, 214.63, 216.34, 215.83, 221.82, 214.3, 217.26, 223.33, 198.05, 195.21, 189.63, 182.44, 205.38, 200.37, 206.71, 216.85, 217.12, 227.38, 247.74, 252.15, 233.72, 243.03, 239.35, 232.03, 227.53, 231.11, 209.89, 195.12, 190.52, 212.3, 222.14, 225.08, 232.44, 227.38, 237.36, 220.49, 219.02, 224.39] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$177B', pe: 89, revenueGrowth: 14, eps: 2.52, grossMargin: 5, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 4.7, BILT: false },
      tonyNote: 'BOEING appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 4.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 3, avgWeight: 4.62, proScore: 4.62, coverage: 1,
      price: 105.13, weeklyPrices: [119.70, 129.60, 133.09, 113.41, 105.13], weeklyChange: -12.17, sortRank: 0, periodReturns: { '1M': 48.3, '6M': 99.8, '1Y': 335.3 },
      priceHistory: { '1W': [119.7, 129.6, 133.09, 113.41, 105.13], '1M': [70.89, 68.43, 63.87, 70.68, 65.35, 75.05, 82.55, 72.96, 74.81, 83.01, 83.67, 86.83, 88.1, 89.58, 96.23, 105.86, 119.7, 129.6, 133.09, 113.41, 105.13], '6M': [52.61, 74, 67.81, 86.48, 74.68, 85.73, 95.22, 116.37, 122.09, 93.27, 82.22, 80.2, 79.19, 93.86, 87.09, 94.09, 87.86, 92.62, 94.9, 85.53, 76.4, 70.89, 75.05, 83.67, 105.86, 105.13], '1Y': [24.15, 34.82, 41.91, 53.22, 45.11, 42.5, 51.12, 57.09, 53.09, 52.57, 49.76, 44.95, 50.43, 45.22, 37.58, 41.19, 54.8, 49.08, 74.75, 94.5, 78.61, 77.77, 70.05, 67.89, 58.22, 55.51, 56.89, 72.84, 68.37, 85.67, 72.63, 90.56, 101.25, 113.57, 111.21, 101.79, 82.22, 80.2, 79.19, 89.47, 86.34, 89.93, 78.67, 94.81, 98.97, 81, 76.4, 70.89, 75.05, 83.67, 105.86, 105.13] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$41B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 4.51, MEME: 5.91, RKNG: 3.44 },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 5.53, proScore: 4.51, coverage: 0.667,
      price: 1795.53, weeklyPrices: [1589.55, 1589.94, 1641.64, 1694.98, 1795.53], weeklyChange: 12.96, sortRank: 0, periodReturns: { '1M': 51.3, '6M': 754.3, '1Y': 4709.9 },
      priceHistory: { '1W': [1589.55, 1589.94, 1641.64, 1694.98, 1795.53], '1M': [1187, 1255.86, 1406.32, 1409.98, 1339.96, 1562.34, 1547.56, 1452.02, 1447.23, 1382.72, 1407.61, 1333.01, 1383.29, 1392.56, 1542.24, 1478.69, 1589.55, 1589.94, 1641.64, 1694.98, 1795.53], '6M': [210.17, 225.47, 201.87, 241.05, 240.22, 353.56, 387.81, 503.44, 539.3, 576.2, 630.29, 649.97, 635.36, 565.59, 618.82, 772.09, 603.17, 701.59, 851.77, 920.99, 989.9, 1187, 1562.34, 1407.61, 1478.69, 1795.53], '1Y': [37.33, 41.82, 44.21, 47.34, 44.96, 46.2, 42.72, 41.36, 42.93, 41.93, 46.83, 44.58, 47.35, 53.01, 73.92, 93.97, 106.4, 112.2, 120.95, 127.29, 149.29, 175.53, 194.57, 271.58, 244.93, 220.5, 205.35, 219.46, 209.31, 244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 630.29, 649.97, 635.36, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 989.9, 1187, 1562.34, 1407.61, 1478.69, 1795.53] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$266B', pe: 61.2, revenueGrowth: 251, eps: 29.32, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.5, RKNG: 5.55 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 2, avgWeight: 5.33, proScore: 4.36, coverage: 0.667,
      price: 159.35, weeklyPrices: [177.62, 179.83, 169.02, 158.41, 159.35], weeklyChange: -10.28, sortRank: 0, periodReturns: { '1M': -13.2, '6M': 500.7, '1Y': 927.1 },
      priceHistory: { '1W': [177.62, 179.83, 169.02, 158.41, 159.35], '1M': [183.51, 172.98, 180.57, 178.54, 157.55, 148.94, 184.9, 188.28, 223.1, 203.57, 190.36, 173.26, 171.33, 165.26, 176.81, 181.49, 177.62, 179.83, 169.02, 158.41, 159.35], '6M': [26.53, 27.84, 29.9, 39.1, 36.02, 38.06, 34.47, 38.15, 39.57, 38.13, 43.99, 51.68, 84.23, 101.14, 106.19, 101.92, 97.42, 103.91, 150.6, 159.42, 162.17, 183.51, 148.94, 190.36, 181.49, 159.35], '1Y': [15.52, 16.87, 17.09, 23.29, 25.35, 27.92, 29.24, 26.35, 24.11, 21.42, 22.79, 22.77, 25.07, 23.02, 27.72, 29.47, 28.06, 25.93, 31.33, 28.48, 33.4, 36.87, 29.5, 23.75, 20.89, 22.73, 26.02, 30.38, 28.96, 40.64, 34.86, 33.01, 37, 35.72, 43.61, 44.3, 43.99, 51.68, 84.23, 95.58, 96.81, 87.54, 98.21, 107.45, 153.19, 163.47, 162.17, 183.51, 148.94, 190.36, 181.49, 159.35] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$13B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.8, RKNG: 3.87 },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 4.26, proScore: 4.26, coverage: 1,
      price: 254.79, weeklyPrices: [208.06, 208.37, 226.34, 231.09, 254.79], weeklyChange: 22.46, sortRank: 0, periodReturns: { '1M': 64.9, '6M': 154.4, '1Y': 607.4 },
      priceHistory: { '1W': [208.06, 208.37, 226.34, 231.09, 254.79], '1M': [154.49, 176.42, 175.92, 195.09, 184.77, 177.05, 186.1, 179.11, 207.27, 221.15, 219.94, 199.86, 197.73, 191.82, 219.93, 214.77, 208.06, 208.37, 226.34, 231.09, 254.79], '6M': [100.15, 100.33, 81.14, 93.23, 85.17, 96.21, 101.98, 96.85, 94.91, 73.87, 89.73, 97.92, 91.19, 95.65, 108.04, 121.52, 105.97, 108.82, 144.97, 157.14, 147.16, 154.49, 177.05, 219.94, 214.77, 254.79], '1Y': [36.02, 52.58, 50.46, 51.02, 50.31, 46.05, 53.53, 51.01, 50.4, 55.17, 75.33, 67.19, 70.48, 65.65, 93.39, 94.08, 107.8, 112.27, 117.7, 128.15, 104.28, 121.83, 110.54, 102.22, 90.54, 88.88, 96.45, 96.41, 80.95, 90.03, 83.71, 97.3, 103.89, 94.5, 85.19, 86.1, 89.73, 97.92, 91.19, 89.33, 112.95, 117.62, 100.82, 112.54, 154.56, 159.16, 147.16, 154.49, 177.05, 219.94, 214.77, 254.79] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$65B', pe: 98.4, revenueGrowth: 684, eps: 2.59, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 2.87, MEME: 5.45, RKNG: 4.47 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'RDW', name: 'Redwire', easyScore: 1, avgWeight: 7.36, proScore: 4.25, coverage: 0.333,
      price: 21.59, weeklyPrices: [22.04, 24.00, 25.90, 24.57, 21.59], weeklyChange: -2.02, sortRank: 0, periodReturns: { '1M': 131.2, '6M': 321.8, '1Y': 55 },
      priceHistory: { '1W': [22.04, 24, 25.9, 24.57, 21.59], '1M': [9.34, 8.64, 8.69, 9.64, 9.2, 11.07, 12.16, 11.56, 11.46, 13.99, 14.06, 13.96, 13.91, 14.77, 15.35, 17.49, 22.04, 24, 25.9, 24.57, 21.59], '6M': [5.12, 6.82, 6.89, 8.52, 7.94, 9.83, 11.02, 11.98, 12.81, 8.8, 7.89, 7.99, 9.07, 9.07, 9.48, 9.63, 8.87, 9.73, 9.29, 10.34, 9.68, 9.34, 11.07, 14.06, 17.49, 21.59], '1Y': [13.93, 19.96, 20.57, 16.53, 15.31, 15.78, 16.98, 16.36, 14.46, 14.71, 9.42, 8.84, 9.29, 8.32, 8.23, 7.87, 9.22, 8.99, 10.97, 9.54, 7.97, 7.85, 6.95, 6.13, 5.43, 5.41, 5.22, 7.29, 6.59, 8.01, 7.6, 10.28, 10.86, 12.52, 11.75, 10.04, 7.89, 7.99, 9.07, 8.55, 9.59, 9.2, 8.16, 9.91, 9.99, 10.21, 9.68, 9.34, 11.07, 14.06, 17.49, 21.59] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$4B', pe: null, revenueGrowth: 58, eps: -2.59, grossMargin: 13, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 7.36, RKNG: false },
      tonyNote: 'Redwire Corp is a space infrastructure company — solar arrays, structures, and manufacturing in orbit. It appears in Meme and speculative ETFs as a high-risk space economy play. Revenue is growing from a small base but the business is pre-profitability; the ETF weight is minimal and reflects thematic positioning rather than fundamental conviction.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab', easyScore: 3, avgWeight: 4.14, proScore: 4.14, coverage: 1,
      price: 131.1, weeklyPrices: [143.20, 150.23, 148.03, 143.48, 131.10], weeklyChange: -8.45, sortRank: 0, periodReturns: { '1M': 66.4, '6M': 224.8, '1Y': 392.9 },
      priceHistory: { '1W': [143.2, 150.23, 148.03, 143.48, 131.1], '1M': [78.81, 80.31, 78.76, 84.65, 78.58, 105.47, 117.35, 117.56, 124.15, 132.55, 124.77, 131.16, 127.31, 134.28, 125.45, 135.76, 143.2, 150.23, 148.03, 143.48, 131.1], '6M': [40.37, 51.56, 55.41, 77.55, 70.45, 84.08, 91.8, 87.98, 85.68, 66.32, 66.01, 70.86, 69.1, 70, 68.37, 71.93, 65.94, 67.73, 68.05, 84.8, 79.68, 78.81, 105.47, 124.77, 135.76, 131.1], '1Y': [26.6, 29.64, 26.55, 33.46, 34.33, 39.14, 44.6, 46.88, 43.79, 44.75, 43.43, 40.92, 48.13, 43.53, 46.17, 48.08, 52.91, 47.91, 61.51, 68.03, 65.4, 63.75, 56.57, 51.24, 42.78, 42.6, 41.9, 53.43, 55.49, 77.18, 69.76, 83.08, 90.76, 88.9, 80.07, 72.32, 66.01, 70.86, 69.1, 70.11, 68.41, 67.23, 60.93, 67.67, 70.62, 89.46, 79.68, 78.81, 105.47, 124.77, 135.76, 131.1] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$76B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 2.41, MEME: 5.19, RKNG: 4.83 },
      tonyNote: 'Rocket Lab is the small-launch and space systems name that Electrification and AI infrastructure ETFs hold for satellite connectivity exposure — relevant to both GPS-dependent grids and low-orbit broadband that supports remote AI compute. Small market cap, no earnings, but consistent revenue growth and a rapidly expanding backlog.',
    },
    {
      ticker: 'NVTS', name: 'Navitas Semiconductor', easyScore: 2, avgWeight: 5.02, proScore: 4.1, coverage: 0.667,
      price: 24.94, weeklyPrices: [31.79, 28.88, 28.51, 26.60, 24.94], weeklyChange: -21.55, sortRank: 0, periodReturns: { '1M': 42.9, '6M': 200.5, '1Y': 351.8 },
      priceHistory: { '1W': [31.79, 28.88, 28.51, 26.6, 24.94], '1M': [17.45, 15.92, 17.55, 16.68, 15.79, 18.2, 22.65, 19.25, 21.17, 22.32, 21.32, 19.67, 19.43, 22.99, 24.38, 29.25, 31.79, 28.88, 28.51, 26.6, 24.94], '6M': [8.3, 9.6, 7.96, 7.9, 7.24, 10.31, 10.04, 11.29, 9.46, 7.43, 8.37, 7.88, 9, 8.96, 9.98, 9.17, 9.02, 8.8, 9.54, 12.32, 17.28, 17.45, 18.2, 21.32, 29.25, 24.94], '1Y': [5.52, 7.3, 7.19, 7.35, 6.27, 6.43, 6.23, 8.62, 7.52, 6.77, 6.96, 6.43, 6.09, 5.73, 5.64, 6.46, 6.88, 7.22, 7.78, 12.57, 15.03, 12.83, 10.46, 9.12, 7.78, 8.03, 8.32, 9.17, 7.83, 7.66, 7.14, 10.06, 10, 10.17, 8.58, 8.86, 8.37, 7.88, 9, 8.2, 10.1, 8.75, 8.28, 8.84, 9.82, 13.2, 17.28, 17.45, 18.2, 21.32, 29.25, 24.94] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$6B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.78, RKNG: 6.27 },
      tonyNote: 'Navitas Semiconductor is a small-cap wide-bandgap power semiconductor name — gallium nitride and silicon carbide for fast charging and EV applications. The $26.60 share price and small market cap position it as a speculative holding in ETFs willing to take higher-risk bets on next-generation power conversion.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 4.99, proScore: 4.07, coverage: 0.667,
      price: 271.77, weeklyPrices: [302.40, 293.80, 290.01, 285.00, 271.77], weeklyChange: -10.13, sortRank: 0, periodReturns: { '1M': -6.5, '6M': 174.7, '1Y': 1386.7 },
      priceHistory: { '1W': [302.4, 293.8, 290.01, 285, 271.77], '1M': [290.52, 288.64, 295.25, 285.47, 258.64, 261.03, 283.92, 280.69, 289.76, 303.41, 275.95, 258.71, 261.34, 282.31, 307.88, 302.49, 302.4, 293.8, 290.01, 285, 271.77], '6M': [98.93, 111.79, 89.58, 92.26, 87.26, 108, 133.46, 145.63, 156.51, 136.6, 139.03, 147.55, 155.67, 159.99, 157.17, 166.69, 133.52, 135.63, 166.7, 207.86, 231.17, 290.52, 261.03, 275.95, 302.49, 271.77], '1Y': [18.28, 21.43, 22.91, 22.95, 22.13, 28.71, 25.31, 25.93, 34.75, 37.61, 41.25, 43.1, 49.94, 52.45, 62.96, 79.67, 77.38, 84.57, 86.06, 114.06, 104.38, 113.28, 129.05, 127.07, 104.97, 94.29, 105, 109.44, 87.61, 91.43, 86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.03, 147.55, 155.67, 135.19, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 231.17, 290.52, 261.03, 275.95, 302.49, 271.77] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$77B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.82, RKNG: 4.16 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 3, avgWeight: 4.06, proScore: 4.06, coverage: 1,
      price: 60.89, weeklyPrices: [59.78, 67.84, 64.05, 63.54, 60.89], weeklyChange: 1.86, sortRank: 0, periodReturns: { '1M': 33.4, '6M': 25.6, '1Y': 597.5 },
      priceHistory: { '1W': [59.78, 67.84, 64.05, 63.54, 60.89], '1M': [45.66, 49.48, 54.74, 60.98, 56.85, 61.2, 55.15, 56.56, 55.17, 58.4, 52.94, 50.46, 47.74, 52.71, 58.06, 56.83, 59.78, 67.84, 64.05, 63.54, 60.89], '6M': [48.49, 46.34, 35.48, 42.04, 38.3, 43.63, 52.88, 52.26, 59.84, 39.79, 40.03, 39.98, 40.95, 40.13, 41.37, 41.66, 37.45, 34.77, 39.32, 48.12, 50.64, 45.66, 61.2, 52.94, 56.83, 60.89], '1Y': [8.73, 10.34, 10.4, 11.54, 15.23, 16.96, 16.88, 18.59, 15.79, 16.45, 17.83, 18.73, 22.99, 28.21, 33.63, 37.9, 41.77, 46.93, 61.68, 69.56, 55.19, 62.42, 66.63, 57.38, 48.85, 47.47, 41.12, 46.84, 36.59, 42.07, 37.77, 45.68, 51.89, 56.68, 53.74, 41.83, 40.03, 39.98, 40.95, 36.7, 41.58, 41.29, 35.09, 35.13, 43.07, 48.72, 50.64, 45.66, 61.2, 52.94, 56.83, 60.89] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$22B', pe: 79.1, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 3.08, MEME: 5.68, RKNG: 3.43 },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 3, avgWeight: 3.95, proScore: 3.95, coverage: 1,
      price: 45.58, weeklyPrices: [45.14, 48.98, 49.65, 47.28, 45.58], weeklyChange: 0.97, sortRank: 0, periodReturns: { '1M': 35.9, '6M': 61.6, '1Y': 349.5 },
      priceHistory: { '1W': [45.14, 48.98, 49.65, 47.28, 45.58], '1M': [33.55, 35.63, 39.88, 44.24, 41.53, 41.25, 44.59, 43.93, 45.48, 46.71, 42.56, 39.14, 36.62, 39.52, 48.02, 45.87, 45.14, 48.98, 49.65, 47.28, 45.58], '6M': [28.21, 32.11, 22.98, 27.78, 24.08, 29.56, 36.1, 34.74, 38.07, 27.84, 36.17, 29.04, 27.27, 28.09, 27.48, 26.7, 25.72, 24.56, 26.26, 31.53, 34.98, 33.55, 41.25, 42.56, 45.87, 45.58], '1Y': [10.14, 13.02, 11.55, 10.32, 9.76, 9.51, 9.97, 10.95, 10.12, 14.89, 14.97, 15.34, 16.47, 14.38, 16.98, 19.83, 24.67, 22.94, 27.3, 35.04, 32.54, 34.33, 31.06, 28.57, 22.84, 23.74, 28.05, 32.77, 24.24, 26.08, 24.52, 31.94, 35.22, 37.69, 33.88, 34.95, 36.17, 29.04, 27.27, 25.14, 27.05, 25.93, 23.76, 25.19, 27.6, 32.19, 34.98, 33.55, 41.25, 42.56, 45.87, 45.58] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$13B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.57, MEME: 5.21, RKNG: 4.08 },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'LUNR', name: 'Intuitive Machines', easyScore: 1, avgWeight: 6.36, proScore: 3.67, coverage: 0.333,
      price: 41.07, weeklyPrices: [34.86, 40.34, 45.70, 43.83, 41.07], weeklyChange: 17.81, sortRank: 0, periodReturns: { '1M': 60.3, '6M': 343.5, '1Y': 273 },
      priceHistory: { '1W': [34.86, 40.34, 45.7, 43.83, 41.07], '1M': [25.62, 25.35, 24.8, 26.33, 24.11, 28.97, 32.42, 32.09, 35.68, 36.52, 33.89, 33.59, 32.46, 33.67, 34.24, 38.26, 34.86, 40.34, 45.7, 43.83, 41.07], '6M': [9.26, 11.63, 11.12, 16.69, 15.94, 18.62, 19.76, 20.61, 20.99, 14.79, 15.72, 17.55, 16.48, 17.67, 17.64, 18.91, 19.23, 23.99, 23.57, 27.58, 25.53, 25.62, 28.97, 33.89, 38.26, 41.07], '1Y': [11.01, 11.79, 10.84, 10.34, 10.65, 10.86, 11.08, 11.28, 11.75, 11.47, 10.46, 8.69, 8.91, 8.46, 8.3, 9.28, 10.36, 10.52, 11.79, 13.85, 12.68, 12.35, 10.4, 9.44, 9.22, 9.39, 9.42, 11.66, 10.78, 16.51, 16.23, 19.63, 19.5, 20.03, 18.99, 17.52, 15.72, 17.55, 16.48, 17.63, 17.6, 17.83, 17.52, 22.92, 24.41, 27.52, 25.53, 25.62, 28.97, 33.89, 38.26, 41.07] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$7B', pe: null, revenueGrowth: 199, eps: -0.87, grossMargin: 10, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.36, RKNG: false },
      tonyNote: 'Intuitive Machines is a lunar services company — it landed the first U.S. spacecraft on the Moon since 1972 in early 2024. It appears in Meme ETFs for the narrative value as much as the commercial contract pipeline. Revenue is growing via NASA contracts but the business is small and pre-profit; the ETF weight is speculative.',
    },
    {
      ticker: 'ONDS', name: 'Ondas Holdings', easyScore: 2, avgWeight: 4.27, proScore: 3.49, coverage: 0.667,
      price: 12.97, weeklyPrices: [9.77, 10.80, 13.25, 13.22, 12.97], weeklyChange: 32.8, sortRank: 0, periodReturns: { '1M': 25.7, '6M': 71.2, '1Y': 782.7 },
      priceHistory: { '1W': [9.77, 10.8, 13.25, 13.22, 12.97], '1M': [10.32, 9.73, 9.33, 9.34, 8.89, 9.06, 9.42, 9.04, 8.86, 11.21, 10.62, 9.7, 9.13, 9.36, 9.18, 9.06, 9.77, 10.8, 13.25, 13.22, 12.97], '6M': [7.58, 9.02, 7.69, 9.27, 8.99, 12.18, 13.56, 12.62, 11.27, 8.48, 8.97, 10.03, 10.08, 10.49, 10.33, 10.75, 9.44, 9.6, 9.13, 10, 10.55, 10.32, 9.06, 10.62, 9.06, 12.97], '1Y': [1.47, 1.68, 1.69, 1.59, 1.96, 1.84, 2.29, 2.1, 1.82, 3.07, 4.29, 3.59, 4.97, 5.03, 5.56, 6.1, 7.88, 7.72, 11.09, 10.41, 7.19, 6.79, 5.96, 5.8, 7.84, 8.44, 8.07, 9.23, 8.09, 8.96, 9.76, 14.01, 12.82, 12.17, 10.36, 9.69, 8.97, 10.03, 10.08, 9.83, 10.16, 10.06, 8.8, 9.52, 9.47, 10.73, 10.55, 10.32, 9.06, 10.62, 9.06, 12.97] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$7B', pe: 144.2, revenueGrowth: 1080, eps: 0.09, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.64, RKNG: 2.9 },
      tonyNote: 'Ondas Holdings is a small-cap industrial automation and drone company. It appears in Meme ETFs on the autonomous systems and drone delivery narrative. Revenue is minimal and the path to profitability is unclear; the ETF allocation is speculative and reflects retail interest in autonomous systems themes.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 2, avgWeight: 4.11, proScore: 3.36, coverage: 0.667,
      price: 1027.68, weeklyPrices: [895.88, 928.41, 923.52, 971.00, 1027.68], weeklyChange: 14.71, sortRank: 0, periodReturns: { '1M': 89.5, '6M': 327.4, '1Y': 946.7 },
      priceHistory: { '1W': [895.88, 928.41, 923.52, 971, 1027.68], '1M': [542.21, 576.45, 640.2, 666.59, 646.63, 746.81, 795.33, 766.58, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1027.68], '6M': [240.46, 246.92, 237.5, 276.59, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 1027.68], '1Y': [98.18, 110.95, 119.84, 127.91, 120.89, 122.24, 120.11, 109.22, 111.96, 109.06, 127.75, 122.05, 116.5, 118.72, 140, 159.99, 166.41, 167.32, 185.69, 187.06, 202.29, 221.91, 218.03, 241.11, 228.5, 224.53, 239.49, 252.42, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 496.72, 542.21, 746.81, 724.66, 751, 1027.68] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$1.2T', pe: 48.5, revenueGrowth: 196, eps: 21.17, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { BUZZ: 3.35, MEME: false, RKNG: 4.87 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'QBTS', name: 'D-Wave Quantum', easyScore: 1, avgWeight: 5.7, proScore: 3.29, coverage: 0.333,
      price: 27.97, weeklyPrices: [27.82, 27.48, 29.49, 30.14, 27.97], weeklyChange: 0.54, sortRank: 0, periodReturns: { '1M': 36.5, '6M': 30.6, '1Y': 63.5 },
      priceHistory: { '1W': [27.82, 27.48, 29.49, 30.14, 27.97], '1M': [20.49, 20.92, 21.54, 23.83, 21.99, 22.57, 24.03, 22.35, 21.44, 22.13, 20.35, 19.06, 18.19, 19.3, 25.74, 29.4, 27.82, 27.48, 29.49, 30.14, 27.97], '6M': [21.42, 28.44, 23.74, 32.19, 26.25, 30.2, 30.15, 27.43, 23.22, 17.21, 18.82, 18.06, 18.78, 18.83, 17.83, 16.1, 14.65, 14.32, 14.25, 21.69, 18.49, 20.49, 22.57, 20.35, 29.4, 27.97], '1Y': [17.11, 17.95, 16, 14.97, 14.82, 16.39, 16.15, 17.59, 17.67, 18.3, 18.51, 15.32, 15.45, 15.3, 16.04, 22.54, 27.52, 24.71, 35.72, 43.06, 32.19, 32, 29.74, 28.99, 22.93, 22.59, 22.5, 28.33, 25.52, 29.12, 26.15, 29.28, 28.72, 25.63, 21.22, 20.72, 18.82, 18.06, 18.78, 18.59, 17.55, 15.73, 13.9, 14.14, 14.65, 21.66, 18.49, 20.49, 22.57, 20.35, 29.4, 27.97] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$10B', pe: null, revenueGrowth: -81, eps: -1.14, grossMargin: 66, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.7, RKNG: false },
      tonyNote: 'D-Wave Quantum is a quantum computing company — the only publicly traded business built around quantum annealing hardware. Revenue is minimal and profitability is many years away, but it holds a position in Meme ETFs as the purest-play quantum computing stock available to retail investors. The ETF weight is small and the position is purely thematic.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 2, avgWeight: 3.85, proScore: 3.14, coverage: 0.667,
      price: 67.72, weeklyPrices: [63.62, 65.40, 70.14, 72.07, 67.72], weeklyChange: 6.44, sortRank: 0, periodReturns: { '1M': 46.6, '6M': 43.7, '1Y': 66.9 },
      priceHistory: { '1W': [63.62, 65.4, 70.14, 72.07, 67.72], '1M': [46.2, 45.75, 48, 52.57, 47.68, 49.24, 56.89, 55.87, 55.26, 57.47, 51.95, 49.31, 48.44, 52.47, 58.89, 63.64, 63.62, 65.4, 70.14, 72.07, 67.72], '6M': [47.12, 54.36, 46.07, 53.86, 45.31, 49.78, 50.88, 49.33, 43.24, 30.43, 31.3, 31.9, 38.37, 36.02, 33.03, 31.9, 29.84, 29.3, 28.79, 46.09, 42.69, 46.2, 49.24, 51.95, 63.64, 67.72], '1Y': [40.57, 40.06, 38.43, 40.86, 40.1, 45.56, 41.47, 41.94, 40.53, 42.02, 43, 36.8, 40.75, 40.97, 43.86, 65.44, 75.14, 61.5, 79.23, 77.55, 59.5, 57.15, 53.38, 54.42, 49.12, 47.06, 46.93, 54.44, 49.67, 51.39, 44.87, 50.45, 47.56, 47.25, 39.98, 34.99, 31.3, 31.9, 38.37, 35.73, 32.98, 31.2, 27.51, 29.24, 29.76, 48.32, 42.69, 46.2, 49.24, 51.95, 63.64, 67.72] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$25B', pe: 173.6, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: 2.1, MEME: 5.6, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'TE', name: 'T1 Energy', easyScore: 1, avgWeight: 5.06, proScore: 2.92, coverage: 0.333,
      price: 10.09, weeklyPrices: [10.45, 10.96, 10.82, 10.56, 10.09], weeklyChange: -3.43, sortRank: 0, periodReturns: { '1M': 96, '6M': 125.8, '1Y': 861.1 },
      priceHistory: { '1W': [10.45, 10.96, 10.82, 10.56, 10.09], '1M': [5.15, 5.1, 5.34, 5.27, 5.15, 6.16, 6.04, 5.85, 5.61, 5.73, 5.67, 7, 6.88, 8.7, 8.72, 8.08, 10.45, 10.96, 10.82, 10.56, 10.09], '6M': [4.47, 6.02, 5.06, 7.3, 6.5, 7.28, 7.86, 8.37, 8.88, 7.27, 6.21, 6.21, 6.16, 6.81, 7.74, 7.71, 6.28, 4.19, 4.69, 5.03, 5.29, 5.15, 6.16, 5.67, 8.08, 10.09], '1Y': [1.05, 1.32, 1.51, 1.37, 1.25, 1.48, 1.36, 1.57, 1.34, 1.25, 1.25, 1.46, 1.61, 1.83, 1.87, 1.77, 1.84, 2.18, 2.86, 4.01, 4.48, 3.7, 3.68, 4.41, 3.06, 3.29, 4.74, 6.73, 5.44, 7.11, 6.68, 6.81, 7.41, 8.5, 8.33, 8.27, 6.21, 6.21, 6.16, 6.72, 7.62, 6.6, 5.76, 4.05, 5.11, 4.98, 5.29, 5.15, 6.16, 5.67, 8.08, 10.09] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$3B', pe: null, revenueGrowth: 232, eps: -1.87, grossMargin: 8, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.06, RKNG: false },
      tonyNote: 'Tronox Holdings is a titanium dioxide producer — a commodity chemicals company that appears in some ETFs for its materials exposure. The small share price reflects commodity pricing pressure; this is a cyclical materials position rather than a technology or infrastructure allocation.',
    },
    {
      ticker: 'RGTI', name: 'RGTI', easyScore: 2, avgWeight: 3.54, proScore: 2.89, coverage: 0.667,
      price: 24.27, weeklyPrices: [25.07, 24.62, 27.03, 25.54, 24.27], weeklyChange: -3.17, sortRank: 0, periodReturns: { '1M': 38.7, '6M': 3.5, '1Y': 98 },
      priceHistory: { '1W': [25.07, 24.62, 27.03, 25.54, 24.27], '1M': [17.5, 17.7, 18.27, 20.09, 18.34, 18.94, 20.51, 19.07, 18.42, 19.27, 17.85, 16.62, 15.96, 16.88, 22.04, 26.42, 25.07, 24.62, 27.03, 25.54, 24.27], '6M': [23.45, 28.26, 23.53, 26.88, 22.41, 25.21, 25.72, 24.96, 19.85, 14.98, 14.99, 15.92, 17.42, 16.97, 16.07, 15.41, 14.41, 14.19, 14.68, 19.81, 16.61, 17.5, 18.94, 17.85, 26.42, 24.27], '1Y': [12.26, 11.32, 12.16, 11.5, 11.33, 13.51, 12.72, 15.43, 14.47, 16.47, 16.2, 15.16, 15.3, 15.04, 16.19, 21.99, 31.46, 29.79, 43.91, 56.12, 40, 37.07, 35.18, 31.4, 25.71, 26.08, 23.88, 28.22, 23.96, 25.11, 22.15, 25.25, 24.7, 23.45, 18.17, 17.71, 14.99, 15.92, 17.42, 17.01, 16.17, 14.88, 13.32, 14.2, 15.13, 19.64, 16.61, 17.5, 18.94, 17.85, 26.42, 24.27] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$8B', pe: null, revenueGrowth: 199, eps: -0.89, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.35, RKNG: 3.72 },
      tonyNote: 'Rigetti Computing is a quantum hardware company using superconducting qubit technology. It holds a position in Meme ETFs alongside IonQ and D-Wave as part of the quantum computing basket. Revenue is minimal, the technology is earlier-stage than IonQ, and the ETF allocation is speculative. The weight score is low; this is a high-risk, long-duration positioning.',
    },
    {
      ticker: 'AXTI', name: 'AXT Inc', easyScore: 1, avgWeight: 4.32, proScore: 2.49, coverage: 0.333,
      price: 101.34, weeklyPrices: [132.60, 122.77, 115.70, 103.16, 101.34], weeklyChange: -23.57, sortRank: 0, periodReturns: { '1M': 5.6, '6M': 839.2, '1Y': 6354.8 },
      priceHistory: { '1W': [132.6, 122.77, 115.7, 103.16, 101.34], '1M': [96, 106, 107.55, 104.83, 108.42, 116.36, 125.81, 122.9, 121.94, 114.98, 123.78, 105.88, 112.88, 104.61, 121.02, 140.83, 132.6, 122.77, 115.7, 103.16, 101.34], '6M': [10.79, 12.71, 14.83, 15.22, 15.8, 24.11, 22.1, 17.92, 16.38, 20.43, 24.79, 29.68, 37.9, 38.8, 46.73, 58.09, 58.51, 52.84, 64.18, 82.56, 76.16, 96, 116.36, 123.78, 140.83, 101.34], '1Y': [1.57, 1.83, 2.08, 2.02, 2.01, 2.54, 2.36, 2.35, 2.29, 2.05, 2.23, 2.14, 2.77, 3.08, 3.36, 3.94, 4.8, 4.49, 5.31, 4.57, 5.17, 6.6, 8.54, 10.56, 9.9, 9.23, 11.76, 14.96, 13, 14.64, 16.35, 25.83, 25.72, 17.4, 18.54, 24.06, 24.79, 29.68, 37.9, 32.37, 48.86, 54.24, 60.63, 41.99, 66.45, 78.76, 76.16, 96, 116.36, 123.78, 140.83, 101.34] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$7B', pe: null, revenueGrowth: 39, eps: -0.32, grossMargin: 21, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.32, RKNG: false },
      tonyNote: 'AXT Inc is a compound semiconductor substrate manufacturer — gallium arsenide, indium phosphide, and germanium wafers used in data center optical transceivers, 5G RF chips, and solar cells. Revenue is growing with optical networking demand. Small market cap but positioned at a genuine supply-chain chokepoint for III-V semiconductor materials.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 1, avgWeight: 4.31, proScore: 2.49, coverage: 0.333,
      price: 555, weeklyPrices: [524.65, 530.60, 531.18, 531.21, 555.00], weeklyChange: 5.78, sortRank: 0, periodReturns: { '1M': 28.6, '6M': 239.4, '1Y': 963.4 },
      priceHistory: { '1W': [524.65, 530.6, 531.18, 531.21, 555], '1M': [431.52, 442.36, 465.26, 483.15, 463.91, 480, 515.83, 488.74, 494.09, 489.15, 482.02, 458.68, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 531.18, 531.21, 555], '6M': [163.54, 169.78, 172.04, 176.76, 176.06, 199.88, 215, 243.29, 278.41, 260.19, 284.1, 285.52, 279.7, 259.03, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 431.52, 480, 482.02, 484.28, 555], '1Y': [52.19, 57.02, 57.41, 62.07, 63.84, 64.64, 67.53, 67.06, 70.61, 75.84, 75.91, 75.86, 79.71, 86, 95.02, 100.94, 110.25, 120.06, 119.93, 113.13, 121.41, 124.92, 152.18, 169.99, 152.86, 155.41, 159.99, 169.54, 174.58, 178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 284.1, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 404, 431.52, 480, 482.02, 484.28, 555] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$191B', pe: 33.2, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.31 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'CRDO', name: 'CRDO', easyScore: 1, avgWeight: 4.21, proScore: 2.43, coverage: 0.333,
      price: 234.31, weeklyPrices: [221.64, 221.23, 222.35, 236.03, 234.31], weeklyChange: 5.71, sortRank: 0, periodReturns: { '1M': 27.1, '6M': 36.9, '1Y': 274 },
      priceHistory: { '1W': [221.64, 221.23, 222.35, 236.03, 234.31], '1M': [184.38, 180.06, 193.57, 198.29, 188.29, 188.51, 210.22, 198.57, 189.36, 184.54, 172.17, 156.27, 168.99, 182.98, 193.39, 218.41, 221.64, 221.23, 222.35, 236.03, 234.31], '6M': [171.13, 178.94, 142.02, 149.94, 144.92, 141, 156.84, 135.1, 129.47, 98.06, 121.78, 124.06, 112.27, 114.74, 111.57, 107.09, 96.44, 101.45, 119.59, 160.69, 195.04, 184.38, 188.51, 172.17, 218.41, 234.31], '1Y': [62.65, 71.09, 79.17, 91.92, 87.59, 97.59, 102.59, 92.93, 109.38, 110.29, 125.38, 106.3, 120.1, 124.77, 163.96, 164.44, 162.26, 145.61, 137.2, 129.75, 144.17, 162.18, 164.23, 158.5, 139.56, 154.18, 188.44, 170.29, 140.34, 147.81, 143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.78, 124.06, 112.27, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 195.04, 184.38, 188.51, 172.17, 218.41, 234.31] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$43B', pe: 128.7, revenueGrowth: 202, eps: 1.82, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.21 },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
