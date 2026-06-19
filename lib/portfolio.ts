import {
  INDEX_CHART_DATA, SAMPLE_DATA as SD,
  BASE_INDEX_HOLDINGS, BASE_INDEX_CHART, BASE_INDEX_NAMES, THEME_REPRESENTATIVES,
} from './data';
import type { Theme, Period, BaseIndexId, EtfHolding } from './data';

// ── Portfolio builder data layer ────────────────────────────────────────────
// Everything here is DERIVED FROM REAL DATA in lib/data.ts:
//   • Theme conviction scores  ← proScore (avg weight × coverage) of each
//     theme's top consensus stocks, indexed 0–100 against the strongest theme.
//   • Theme period returns      ← TOP10_RET via INDEX_CHART_DATA top10Return.
//   • Portfolio performance line ← point-wise blend of the real indexed theme
//     series (and the real SPY series for the index core). NOT extrapolated
//     from a single weekly number — see the chart-historical-data house rule.
//   • Stock exposure            ← each theme's real top holdings by proScore.
// The index core (SPY) sits in a SEPARATE price-only lane: it scores zero
// conviction by design and never re-enters the conviction board.

export type Sleeve = {
  id: string;
  name: string;
  etf: string;          // the representative ticker shown next to the sleeve
  color: string;
  isCore: boolean;
  convScore: number;    // 0–100, indexed against the strongest theme (core = 0)
  convRaw: number;      // underlying proScore average (for the explainer)
  picks: { ticker: string; weight: number }[];  // normalized within the sleeve
  defaultVal: number;
};

// Periods Shuki asked to surface on the performance read-out.
export const PERF_PERIODS: Period[] = ['1W', '1M', '6M'];

// Themes the user can tilt toward. Meme is excluded — speculative/retail
// sentiment, kept off the conviction board, so it stays out of the builder too.
const BUILDER_THEMES: Theme[] = ['AI & ML', 'Semiconductors', 'Broad Tech', 'Electrification', 'Industrials'];

const THEME_META: Record<Theme, { etf: string; color: string }> = {
  'AI & ML':         { etf: 'ARTY', color: '#a78bfa' },
  'Semiconductors':  { etf: 'SOXX', color: '#60a5fa' },
  'Broad Tech':      { etf: 'IGV',  color: '#38bdf8' },
  'Electrification': { etf: 'POW',  color: '#fbbf24' },
  'Industrials':     { etf: 'AIRR', color: '#fb923c' },
  'Meme':            { etf: 'BUZZ', color: '#f472b6' },
};

// ── Index core — selectable base, price-only lane ────────────────────────────
// Real top-5 holdings + price series come from the scraped data (BASE_INDEX_*).
// The core scores zero conviction by design — it is passive beta, not a tilt.
export const CORE_COLOR = '#94a3b8';
export const BASE_INDEX_IDS: BaseIndexId[] = ['SPY', 'QQQ'];

// A third, synthetic core option: a classic growth-tilted 60% S&P / 40% Nasdaq
// blend. It is DERIVED ENTIRELY from the real SPY and QQQ data — nothing new is
// scraped — so it is NOT a BaseIndexId (those map 1:1 to scraped indices).
// The builder works against the wider BaseChoiceId set and resolves the blend
// at runtime in baseChoice* below.
export type BaseChoiceId = BaseIndexId | 'BLEND';
const BLEND_WEIGHTS: Record<BaseIndexId, number> = { SPY: 0.6, QQQ: 0.4 };
// Short label for the core chip; longer self-explaining label for the toggle button.
const BASE_CHOICE_LABEL: Record<BaseChoiceId, string> = { SPY: 'SPY', QQQ: 'QQQ', BLEND: '60/40' };
const BASE_CHOICE_BUTTON: Record<BaseChoiceId, string> = { SPY: 'SPY', QQQ: 'QQQ', BLEND: '60% SPY / 40% QQQ' };
const BLEND_NAME =
  `${Math.round(BLEND_WEIGHTS.SPY * 100)}% ${BASE_INDEX_NAMES.SPY} / ` +
  `${Math.round(BLEND_WEIGHTS.QQQ * 100)}% ${BASE_INDEX_NAMES.QQQ}`;

// Choices the toggle renders, in order, with their short button labels.
export const BASE_CHOICES: { id: BaseChoiceId; label: string }[] =
  (['SPY', 'QQQ', 'BLEND'] as BaseChoiceId[]).map(id => ({ id, label: BASE_CHOICE_BUTTON[id] }));

// 60/40 weight-blend of the two indices' disclosed top holdings, summed by
// ticker and re-ranked. Built from the top-5 disclosures only, so it is an
// illustrative blend of the ballast leg — the same spirit as the per-index view.
function blendedHoldings(): EtfHolding[] {
  const acc: Record<string, number> = {};
  (Object.keys(BLEND_WEIGHTS) as BaseIndexId[]).forEach(idx => {
    BASE_INDEX_HOLDINGS[idx].forEach(h => { acc[h.t] = (acc[h.t] ?? 0) + h.w * BLEND_WEIGHTS[idx]; });
  });
  return Object.entries(acc)
    .map(([t, w]) => ({ t, w: +w.toFixed(2) }))
    .sort((a, b) => b.w - a.w)
    .slice(0, 5);
}

// Point-wise 60/40 blend of the real SPY and QQQ indexed series. Both start at
// 100, so the weighted average is itself a valid indexed series.
function blendedSeries(period: Period): number[] {
  const spy = BASE_INDEX_CHART.SPY[period], qqq = BASE_INDEX_CHART.QQQ[period];
  return spy.map((v, i) => v * BLEND_WEIGHTS.SPY + qqq[i] * BLEND_WEIGHTS.QQQ);
}

// Resolvers that accept either a scraped index or the synthetic blend.
export function baseChoiceSeries(id: BaseChoiceId, period: Period): number[] {
  return id === 'BLEND' ? blendedSeries(period) : BASE_INDEX_CHART[id][period];
}
function baseChoiceHoldings(id: BaseChoiceId): EtfHolding[] {
  return id === 'BLEND' ? blendedHoldings() : BASE_INDEX_HOLDINGS[id];
}
function baseChoiceName(id: BaseChoiceId): string {
  return id === 'BLEND' ? BLEND_NAME : BASE_INDEX_NAMES[id];
}

// Convenience accessor for the page's "inside your core" read-out.
export function baseIndexInfo(id: BaseChoiceId) {
  return { id, label: BASE_CHOICE_LABEL[id], name: baseChoiceName(id), holdings: baseChoiceHoldings(id) };
}

// Raw theme conviction = mean proScore of the theme's top 5 consensus stocks.
// proScore = avg weight across the theme's ETFs × coverage (linear) — the same
// signal the conviction board ranks on.
function rawThemeConviction(theme: Theme): { raw: number; picks: { ticker: string; weight: number }[] } {
  const stocks = [...(SD[theme] ?? [])]
    .sort((a, b) => b.proScore - a.proScore)
    .slice(0, 5);
  const raw = stocks.length ? stocks.reduce((s, e) => s + e.proScore, 0) / stocks.length : 0;
  // Normalize pick weights within the sleeve so exposure math is share-based.
  const tot = stocks.reduce((s, e) => s + e.proScore, 0) || 1;
  const picks = stocks.map(e => ({ ticker: e.ticker, weight: e.proScore / tot }));
  return { raw, picks };
}

// Build all sleeves with real conviction scores indexed 0–100.
// baseIndex selects which core (SPY / QQQ / 60-40 blend) backs the passive sleeve.
export function buildSleeves(baseIndex: BaseChoiceId = 'SPY'): Sleeve[] {
  const themeData = BUILDER_THEMES.map(t => ({ theme: t, ...rawThemeConviction(t) }));
  const maxRaw = Math.max(...themeData.map(d => d.raw)) || 1;

  // Normalize core picks to fractions (sum to 1) so exposure math is share-based
  // and consistent with the theme sleeves — otherwise raw percent weights (7.5)
  // get multiplied by 100 again in the UI and read as 750%.
  const coreHoldings = baseChoiceHoldings(baseIndex);
  const coreTot = coreHoldings.reduce((s, h) => s + h.w, 0) || 1;
  const core: Sleeve = {
    id: 'core',
    name: 'Index core',
    etf: baseIndex,                      // also carries the base-index id for sleeveSeries
    color: CORE_COLOR,
    isCore: true,
    convScore: 0,
    convRaw: 0,
    picks: coreHoldings.map(h => ({ ticker: h.t, weight: h.w / coreTot })),
    defaultVal: 40,
  };

  const themes: Sleeve[] = themeData.map(d => {
    const rep = THEME_REPRESENTATIVES[d.theme];
    return {
      id: d.theme.toLowerCase().replace(/[^a-z]/g, ''),
      name: d.theme,
      // Dial shows the representative ETF pair (avg of 2 best non-correlated
      // performers) when available, else the static representative ETF.
      etf: rep?.etfs?.length ? rep.etfs.join(' + ') : THEME_META[d.theme].etf,
      color: THEME_META[d.theme].color,
      isCore: false,
      convScore: Math.round((d.raw / maxRaw) * 100),
      convRaw: d.raw,
      picks: d.picks,
      defaultVal: d.theme === 'AI & ML' ? 20 : d.theme === 'Semiconductors' || d.theme === 'Broad Tech' ? 14 : 6,
    };
  });

  return [core, ...themes];
}

// The real indexed price series for a sleeve over a period.
// Core uses the selected base index; themes use their representative pair's
// blended series (falling back to the all-ETF composite if no rep was built).
function sleeveSeries(sleeve: Sleeve, period: Period): number[] {
  if (sleeve.isCore) {
    return baseChoiceSeries(sleeve.etf as BaseChoiceId, period);
  }
  const rep = THEME_REPRESENTATIVES[sleeve.name as Theme];
  if (rep?.series?.[period]?.length) return rep.series[period];
  return INDEX_CHART_DATA[sleeve.name as Theme][period].top10;
}

// Benchmark line is always the S&P 500, independent of the chosen core index.
function spySeries(period: Period): number[] {
  return BASE_INDEX_CHART['SPY'][period];
}

export type PerfResult = {
  portfolio: number[];     // indexed to 100 at start
  spy: number[];           // indexed to 100 at start
  portfolioReturn: number; // % over the period
  spyReturn: number;       // % over the period
  xLabels: string[];
};

// Blend the real indexed series point-wise by the user's normalized weights.
// All sleeve series for a given period share the same length and the same
// start value (100), so the weighted average is itself a valid indexed series.
export function blendPerformance(
  sleeves: Sleeve[],
  norm: number[],
  period: Period
): PerfResult {
  const len = spySeries(period).length;
  const portfolio = new Array(len).fill(0);
  for (let i = 0; i < sleeves.length; i++) {
    const s = sleeveSeries(sleeves[i], period);
    for (let p = 0; p < len; p++) portfolio[p] += norm[i] * s[p];
  }
  const spy = spySeries(period);
  const portfolioReturn = portfolio[len - 1] - portfolio[0];
  const spyReturn = spy[len - 1] - spy[0];
  const xLabels = INDEX_CHART_DATA[BUILDER_THEMES[0]][period].xLabels;
  return { portfolio, spy, portfolioReturn, spyReturn, xLabels };
}

// Per-sleeve breakdown for the "Your mix" detail table: the suggested ETF, the
// user's weight in that sleeve, and the sleeve's own period return (its real
// indexed series, start-to-end). Same series the blend is built from.
export function sleeveBreakdown(
  sleeves: Sleeve[],
  norm: number[],
  period: Period
): { id: string; name: string; etf: string; isCore: boolean; weight: number; ret: number }[] {
  return sleeves.map((s, i) => {
    const series = sleeveSeries(s, period);
    return {
      id: s.id,
      name: s.name,
      etf: s.etf,
      isCore: s.isCore,
      weight: norm[i],
      ret: series[series.length - 1] - series[0],
    };
  });
}

// Weighted portfolio conviction score (core scores 0 by design).
export function blendConviction(sleeves: Sleeve[], norm: number[]): number {
  return sleeves.reduce((sum, s, i) => sum + norm[i] * s.convScore, 0);
}

// Top single-stock exposures across the blended sleeves.
export function blendExposure(
  sleeves: Sleeve[],
  norm: number[],
  topN = 6
): { ticker: string; weight: number }[] {
  const exp: Record<string, number> = {};
  sleeves.forEach((s, i) => {
    s.picks.forEach(p => { exp[p.ticker] = (exp[p.ticker] ?? 0) + norm[i] * p.weight; });
  });
  return Object.entries(exp)
    .map(([ticker, weight]) => ({ ticker, weight }))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, topN);
}
