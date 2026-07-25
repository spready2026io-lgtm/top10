import { SAMPLE_DATA, THEMES, type Theme, type Equity } from '@/lib/data';

// ── Palette (redesign tokens) ─────────────────────────────────────────────────
export const GREEN = 'var(--ss-green)';
export const AMBER = 'var(--ss-amber)';
export const MONO = 'var(--font-mono-brand), monospace';

export const moveColor = (n: number) => (n >= 0 ? GREEN : AMBER);

/** Signed percentage with the design's true minus sign. */
export function signed(n: number, digits = 1): string {
  return `${n < 0 ? '−' : '+'}${Math.abs(n).toFixed(digits)}%`;
}

export function conviction(coverage: number): { label: string; color: string; bg: string } {
  if (coverage >= 0.6) return { label: 'High', color: 'var(--ss-green-text)', bg: 'var(--ss-green-tint)' };
  if (coverage >= 0.35) return { label: 'Medium', color: 'var(--ss-amber-text)', bg: 'var(--ss-amber-bg)' };
  return { label: 'Low', color: 'var(--ss-text)', bg: 'var(--ss-track)' };
}

/**
 * A stock's "home sector" = the theme in which it carries the most conviction
 * (highest proScore). Gives each tile a varied, meaningful sub-label instead of
 * repeating the current page's theme on every row.
 */
export function homeSector(ticker: string): Theme | null {
  let best: Theme | null = null;
  let bestScore = -Infinity;
  for (const t of THEMES) {
    const e = SAMPLE_DATA[t].find((x) => x.ticker === ticker);
    if (e && e.proScore > bestScore) {
      bestScore = e.proScore;
      best = t;
    }
  }
  return best;
}

/** Which themes hold this stock (for the flip-side breadth line). */
export function stockThemes(ticker: string): Theme[] {
  return THEMES.filter((t) => SAMPLE_DATA[t].some((e) => e.ticker === ticker));
}

// ── Chart geometry ────────────────────────────────────────────────────────────
export type ChartGeom = {
  points: string;
  area: string;
  lastX: number;
  lastY: number;
  labels: { v: number; y: number }[];
  gridY: number[];
  up: boolean;
};

/**
 * Build an SVG line+area chart from a price series.
 * viewBox is 0 0 W H; caller renders with preserveAspectRatio="none".
 */
export function buildChart(values: number[], W = 340, H = 150, padTop = 12, padBot = 18): ChartGeom {
  const clean = values.filter((v) => typeof v === 'number' && !Number.isNaN(v));
  const min = Math.min(...clean);
  const max = Math.max(...clean);
  const margin = max === min ? Math.max(1, Math.abs(max) * 0.02) : (max - min) * 0.12;
  const yMin = min - margin;
  const yMax = max + margin;

  const toX = (i: number) => (clean.length <= 1 ? 0 : (i / (clean.length - 1)) * W);
  const toY = (v: number) => padTop + (1 - (v - yMin) / (yMax - yMin)) * (H - padTop - padBot);

  const pts = clean.map((v, i) => `${toX(i).toFixed(1)},${toY(v).toFixed(1)}`);
  const points = pts.join(' ');
  const area = `0,${H} ${points} ${W},${H}`;

  const mid = (max + min) / 2;
  const labels = [max, mid, min].map((v) => ({ v: Math.round(v), y: toY(v) }));
  const gridY = [toY(max), toY(mid)];

  return {
    points,
    area,
    lastX: toX(clean.length - 1),
    lastY: toY(clean[clean.length - 1]),
    labels,
    gridY,
    up: clean[clean.length - 1] >= clean[0],
  };
}

/** x-axis tick labels per range (mirrors the live dashboard). */
export function xLabels(range: string): string[] {
  switch (range) {
    case '1D': return ['Open', '11a', '1p', '3p', 'Now'];
    case '1W': return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    case '1M': return ['4w', '3w', '2w', '1w', 'Now'];
    case 'YTD': return ['Jan', '', '', '', 'Now'];
    case '6M': return ['6m', '', '', '', 'Now'];
    case '1Y': return ['1y', '', '', '', 'Now'];
    default: return [];
  }
}

export type { Equity, Theme };
