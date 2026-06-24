/**
 * Stockscout — GA4 event helpers
 *
 * Thin wrapper around window.gtag so every component fires the same typed
 * event names. The GA4 script is loaded in app/components/GoogleAnalytics.tsx
 * (Measurement ID via NEXT_PUBLIC_GA_ID). Pageviews + scroll + outbound clicks
 * are captured automatically by GA4 Enhanced Measurement; these helpers add
 * the product-specific interactions worth tracking.
 *
 * Events
 * ──────
 *   theme_switch     — user switches sector/theme on the home grid
 *   equity_flip      — user flips an equity card to read Tony's analysis
 *   portfolio_open   — user opens the /portfolio builder
 *   ask_tony_submit  — user submits a question to Ask Tony  ← engagement signal
 */

type GTag = (...args: unknown[]) => void;

function gtag(...args: unknown[]) {
  if (typeof window !== 'undefined' && typeof (window as unknown as { gtag?: GTag }).gtag === 'function') {
    (window as unknown as { gtag: GTag }).gtag(...args);
  }
}

/** User switches the active sector/theme on the home grid */
export function trackThemeSwitch(theme: string) {
  gtag('event', 'theme_switch', { theme });
}

/** User flips an equity card to read the analysis on the back */
export function trackEquityFlip(ticker: string, theme: string) {
  gtag('event', 'equity_flip', { ticker, theme });
}

/** User opens the portfolio builder */
export function trackPortfolioOpen(source: string) {
  gtag('event', 'portfolio_open', { source });
}

/** User submits a question to Ask Tony — high-intent engagement */
export function trackAskTonySubmit() {
  gtag('event', 'ask_tony_submit');
}
