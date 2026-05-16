/**
 * Spready — GA4 Analytics helper
 *
 * Thin wrapper around window.gtag so every component uses the same
 * typed event names. All events are sent to G-YVY5SK89D4.
 *
 * Events
 * ──────
 *   market_switch        — user switches AU / UK / EU / WW
 *   instrument_filter    — user filters the dashboard by a specific pair
 *   broker_tile_flip     — user flips a broker tile to see the back
 *   broker_source_click  — user clicks the broker "Source ↗" link  ← conversion
 */

type GTag = (...args: unknown[]) => void;

function gtag(...args: unknown[]) {
  if (typeof window !== 'undefined' && typeof (window as unknown as { gtag?: GTag }).gtag === 'function') {
    (window as unknown as { gtag: GTag }).gtag(...args);
  }
}

/** User switches between AU / UK / EU / WW markets */
export function trackMarketSwitch(market: string) {
  gtag('event', 'market_switch', { market });
}

/** User selects a pair filter pill (null = cleared / "All Pairs") */
export function trackInstrumentFilter(pair: string | null, market: string) {
  gtag('event', 'instrument_filter', {
    pair:   pair ?? 'all',
    market,
  });
}

/** User flips a broker tile to see the back (more pairs + broker note) */
export function trackBrokerTileFlip(brokerId: string, market: string) {
  gtag('event', 'broker_tile_flip', {
    broker_id: brokerId,
    market,
  });
}

/**
 * User clicks the "Source ↗" link — navigating to the broker's site.
 * This is the primary conversion event: high-intent exit to a broker.
 */
export function trackBrokerSourceClick(brokerId: string, market: string) {
  gtag('event', 'broker_source_click', {
    broker_id: brokerId,
    market,
  });
}

/**
 * Contact form submitted successfully.
 * Conversion event — someone reached out directly.
 */
export function trackContactFormSent() {
  gtag('event', 'contact_form_sent');
}
