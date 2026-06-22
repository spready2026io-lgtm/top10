// Currency-aware money formatting.
//
// Foreign-listed shares (see YAHOO_TICKER_MAP in scripts/build-data-ts.js) report
// price / EPS / market cap in their local trading currency. Equity.currency and
// CrossThemeEntry.currency carry the ISO code (absent = USD). Returns, P/E, yield
// and weights are ratios, so they stay currency-agnostic — only money values need
// the right symbol. No FX conversion is done: a price level is not comparable
// across stocks anyway, so labeling it correctly is enough.
//
// Keep CURRENCY_SYMBOLS in sync with the copy in scripts/build-data-ts.js, which
// bakes the same symbol into the pre-formatted market-cap string at build time.

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$', EUR: '€', GBP: '£', JPY: '¥',
  AUD: 'A$', CAD: 'C$', NZD: 'NZ$', HKD: 'HK$', SGD: 'S$', CHF: 'CHF ',
};

// Prefix symbol for a currency. Unknown/suffix-style currencies fall back to the
// ISO code + nbsp so a value is never silently mislabeled (e.g. "SEK 26.56").
export function currencySymbol(currency?: string): string {
  if (!currency || currency === 'USD') return '$';
  return CURRENCY_SYMBOLS[currency] ?? `${currency} `;
}

// Format a price / EPS value with its currency symbol. Defaults to 2 decimals;
// pass 0/0 for whole-number display (large prices).
export function fmtMoney(
  value: number,
  currency?: string,
  opts: { minimumFractionDigits?: number; maximumFractionDigits?: number } = {},
): string {
  const { minimumFractionDigits = 2, maximumFractionDigits = 2 } = opts;
  return currencySymbol(currency) +
    value.toLocaleString('en-US', { minimumFractionDigits, maximumFractionDigits });
}
