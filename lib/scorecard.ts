import { SAMPLE_DATA, ETF_TOP_HOLDINGS, THEME_ETFS, ETF_RETURNS } from './data';
import type { Theme } from './data';

export type PickRow = {
  ticker: string;
  weight: number;
  weeklyChange: number | null;
  return1M: number | null;
  return6M: number | null;
};

export type EtfScore = {
  etf: string;
  theme: Theme;
  picks: PickRow[];
  score1W: number | null;
  score1M: number | null;
  score6M: number | null;
  tonyScore: number | null;
  etfReturn1W: number | null;
  etfReturn1M: number | null;
  etfReturn6M: number | null;
};

// Flat map of ticker -> equity data across all themes
const equityMap: Record<string, { weeklyChange: number; return1M: number; return6M: number; name: string }> = {};
for (const equities of Object.values(SAMPLE_DATA)) {
  for (const e of equities) {
    equityMap[e.ticker] = {
      name: e.name,
      weeklyChange: e.weeklyChange,
      return1M: e.periodReturns['1M'],
      return6M: e.periodReturns['6M'],
    };
  }
}

function weightedAvg(picks: PickRow[], field: 'weeklyChange' | 'return1M' | 'return6M'): number | null {
  const valid = picks.filter(p => p[field] !== null);
  if (valid.length === 0) return null;
  const totalW = valid.reduce((s, p) => s + p.weight, 0);
  if (totalW === 0) return null;
  return valid.reduce((s, p) => s + (p[field] as number) * p.weight, 0) / totalW;
}

export function computeScorecard(): EtfScore[] {
  const results: EtfScore[] = [];

  for (const [theme, etfs] of Object.entries(THEME_ETFS) as [Theme, string[]][]) {
    for (const etf of etfs) {
      const holdings = ETF_TOP_HOLDINGS[etf] ?? [];
      const picks: PickRow[] = holdings.map(h => {
        const eq = equityMap[h.t];
        return {
          ticker: h.t,
          weight: h.w,
          weeklyChange: eq?.weeklyChange ?? null,
          return1M: eq?.return1M ?? null,
          return6M: eq?.return6M ?? null,
        };
      });

      const score1W = weightedAvg(picks, 'weeklyChange');
      const score1M = weightedAvg(picks, 'return1M');
      const score6M = weightedAvg(picks, 'return6M');

      // Tony Score: blend 1W (20%) + 1M (30%) + 6M (50%)
      const components = [
        score1W != null ? score1W * 0.2 : null,
        score1M != null ? score1M * 0.3 : null,
        score6M != null ? score6M * 0.5 : null,
      ];
      const validComponents = components.filter(c => c !== null) as number[];
      const tonyScore = validComponents.length > 0 ? validComponents.reduce((a, b) => a + b, 0) : null;

      const ret = ETF_RETURNS[etf];
      results.push({
        etf,
        theme,
        picks,
        score1W,
        score1M,
        score6M,
        tonyScore,
        etfReturn1W: ret?.['1W'] ?? null,
        etfReturn1M: ret?.['1M'] ?? null,
        etfReturn6M: ret?.['6M'] ?? null,
      });
    }
  }

  return results.sort((a, b) => (b.tonyScore ?? -999) - (a.tonyScore ?? -999));
}
