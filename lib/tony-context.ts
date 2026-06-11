import { SAMPLE_DATA, ETF_TOP_HOLDINGS, ETF_RETURNS, CROSS_THEME_TOP10, THEME_ETFS, SCAN_TIMESTAMP_NY } from './data';

export function buildTonyContext(): string {
  const equities: Record<string, object> = {};

  for (const [theme, stocks] of Object.entries(SAMPLE_DATA)) {
    for (const s of stocks) {
      equities[s.ticker] = {
        name: s.name,
        theme,
        easyScore: s.easyScore,
        coverage: Math.round(s.coverage * 100) + '%',
        avgWeight: s.avgWeight != null ? s.avgWeight.toFixed(2) + '%' : null,
        proScore: s.proScore.toFixed(2),
        velocityScore: s.velocityScore ?? null,
        price: s.price,
        weeklyChange: s.weeklyChange + '%',
        returns: s.periodReturns,
        marketCap: s.marketCap,
        pe: s.pe,
        revenueGrowth: s.revenueGrowth + '%',
        grossMargin: s.grossMargin + '%',
        dividendYield: s.dividendYield,
        etfPresence: s.etfPresence,
        note: s.tonyNote,
      };
    }
  }

  const etfSummary: Record<string, object> = {};
  for (const [theme, tickers] of Object.entries(THEME_ETFS)) {
    for (const etf of tickers) {
      etfSummary[etf] = {
        theme,
        topHoldings: ETF_TOP_HOLDINGS[etf] ?? [],
        returns: ETF_RETURNS[etf] ?? null,
      };
    }
  }

  return JSON.stringify({
    snapshotDate: SCAN_TIMESTAMP_NY,
    equities,
    etfs: etfSummary,
    crossThemeTop10: CROSS_THEME_TOP10.map(e => ({
      ticker: e.ticker,
      name: e.name,
      themes: e.themes,
      themeCount: e.themeCount,
      aggregateScore: e.aggregateScore,
    })),
  });
}
