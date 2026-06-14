import { ETF_TOP_HOLDINGS, SAMPLE_DATA, THEME_ETFS } from './data';
import type { Theme } from './data';

// A stock's consensus conviction: how many managers hold it in their top book,
// and how heavily. This is the same signal the main dashboard ranks on —
// breadth first, weight as the tiebreaker — applied across all 40 managers.
export type ConvictionRow = {
  ticker: string;
  name: string;
  breadth: number;        // managers holding this in their disclosed top book
  totalManagers: number;  // 40
  avgWeight: number;       // average weight across managers that hold it
  managers: string[];      // ETF tickers holding it
  theme: Theme | null;     // dominant theme (most managers' theme)
};

// One manager and its highest-conviction picks (its biggest disclosed weights).
export type ManagerRow = {
  etf: string;
  theme: Theme;
  picks: { ticker: string; weight: number }[];
  concentration: number;   // sum of top-pick weights = how concentrated the book is
};

const nameMap: Record<string, string> = {};
for (const eqs of Object.values(SAMPLE_DATA)) {
  for (const e of eqs) nameMap[e.ticker] = e.name;
}

const etfTheme: Record<string, Theme> = {};
for (const [theme, etfs] of Object.entries(THEME_ETFS) as [Theme, string[]][]) {
  for (const e of etfs) etfTheme[e] = theme;
}

export function computeConviction(): ConvictionRow[] {
  const total = Object.keys(ETF_TOP_HOLDINGS).length;
  const agg: Record<string, { sumW: number; mgrs: string[] }> = {};

  for (const [etf, holds] of Object.entries(ETF_TOP_HOLDINGS)) {
    for (const h of holds) {
      (agg[h.t] ??= { sumW: 0, mgrs: [] });
      agg[h.t].sumW += h.w;
      agg[h.t].mgrs.push(etf);
    }
  }

  const rows: ConvictionRow[] = Object.entries(agg).map(([ticker, a]) => {
    const breadth = a.mgrs.length;
    const counts: Record<string, number> = {};
    for (const m of a.mgrs) {
      const t = etfTheme[m];
      if (t) counts[t] = (counts[t] ?? 0) + 1;
    }
    const theme = (Object.entries(counts).sort((x, y) => y[1] - x[1])[0]?.[0] ?? null) as Theme | null;
    return {
      ticker,
      name: nameMap[ticker] ?? ticker,
      breadth,
      totalManagers: total,
      avgWeight: a.sumW / breadth,
      managers: a.mgrs,
      theme,
    };
  });

  // Ranking logic mirrors the main board: breadth desc, then avg weight desc.
  rows.sort((x, y) => y.breadth - x.breadth || y.avgWeight - x.avgWeight);
  return rows;
}

export function computeManagers(): ManagerRow[] {
  const rows: ManagerRow[] = [];
  for (const [etf, holds] of Object.entries(ETF_TOP_HOLDINGS)) {
    const theme = etfTheme[etf];
    if (!theme) continue;
    const picks = holds.map(h => ({ ticker: h.t, weight: h.w }));
    const concentration = picks.reduce((s, p) => s + p.weight, 0);
    rows.push({ etf, theme, picks, concentration });
  }
  // Most concentrated books first — the managers making the boldest bets.
  rows.sort((a, b) => b.concentration - a.concentration);
  return rows;
}
