import type { Metadata } from 'next';

/**
 * Modern surface (the 2026-07 light redesign).
 *
 * Classic is the site default and owns html/body. Everything under /modern is
 * wrapped in .ss-modern, which is where the light --ss-* palette and the Plus
 * Jakarta brand font take effect. Nothing here leaks out to the Classic routes.
 */

export const metadata: Metadata = {
  title: 'Stockscout Modern, ETF Holdings Analyser',
  // The Classic routes are the canonical ones. Modern is an alternate skin over
  // the same data, so keep it out of the index rather than compete with itself.
  robots: { index: false, follow: true },
};

export default function ModernLayout({ children }: { children: React.ReactNode }) {
  return <div className="ss-modern">{children}</div>;
}
