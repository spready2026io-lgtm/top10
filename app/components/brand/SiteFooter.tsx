import Link from 'next/link';
import Crosshair, { Wordmark } from './Crosshair';
import { THEME_ETFS } from '@/lib/data';
import { MARKET_TILES } from '@/lib/markets-data';

const ACTIVE_ETFS = new Set(Object.values(THEME_ETFS).flat()).size;
const MARKET_COUNT = MARKET_TILES.length;

/** Shared light footer (2026 redesign). */
export default function SiteFooter() {
  return (
    <footer style={{ background: 'var(--ss-card)', borderTop: '1px solid var(--ss-track)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32, marginBottom: 36 }}>
          <div style={{ maxWidth: 340 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}>
              <Crosshair size={24} />
              <Wordmark size={20} />
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--ss-muted)', margin: 0 }}>
              Tracking {ACTIVE_ETFS} ETFs across {MARKET_COUNT} world markets. Rankings for information only — not investment advice.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 64, flexWrap: 'wrap' }}>
            <Col title="Product" links={[['Rankings', '/rankings'], ['Build Portfolio', '/portfolio'], ['World Markets', '/markets'], ['Ask Tony', '/ask']]} />
            <Col title="Company" links={[['About', '/about'], ['Contact', '/contact'], ['ETF Universe', '/universe'], ['Conviction Board', '/conviction']]} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, paddingTop: 24, borderTop: '1px solid var(--ss-track)', fontSize: 14, color: 'var(--ss-faint)' }}>
          <span>© 2026 Stockscout. All rights reserved.</span>
          <span>Updated daily · Free · No login</span>
        </div>
      </div>
    </footer>
  );
}

function Col({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontSize: 12, letterSpacing: 0.8, color: 'var(--ss-faint)', textTransform: 'uppercase', fontWeight: 700, marginBottom: 2 }}>{title}</div>
      {links.map(([label, href]) => (
        <Link key={label} href={href} style={{ fontSize: 15, color: 'var(--ss-text)' }}>{label}</Link>
      ))}
    </div>
  );
}
