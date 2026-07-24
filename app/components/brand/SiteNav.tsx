import Link from 'next/link';
import Crosshair, { Wordmark } from './Crosshair';

const MONO = 'var(--font-mono-brand), monospace';
const GREEN = '#059669';

const DEFAULT_LINKS = [
  { label: 'Rankings', href: '/rankings' },
  { label: 'Markets', href: '/markets' },
  { label: 'Universe', href: '/universe' },
  { label: 'About', href: '/about' },
];

/**
 * Shared light nav (2026 redesign). One source of truth for the inner pages.
 * `active` bolds the current link; `cta` overrides the default Ask-Tony button.
 */
export default function SiteNav({
  active,
  links = DEFAULT_LINKS,
  cta = { label: 'Ask Tony', href: '/ask' },
}: {
  active?: string;
  links?: { label: string; href: string }[];
  cta?: { label: string; href: string };
}) {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid #e9ecf1' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" aria-label="Stockscout home" style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <Crosshair size={26} />
          <Wordmark size={22} />
          <span className="ss-nav-links-secondary" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 3, color: '#98a2b0', marginLeft: 8 }}>SEE IT FIRST</span>
        </Link>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {links.map((l) => {
            const isActive = active === l.label;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={isActive ? undefined : 'ss-link-muted ss-nav-links-secondary'}
                style={{ fontSize: 15, fontWeight: isActive ? 700 : 500, color: isActive ? GREEN : undefined }}
              >
                {l.label}
              </Link>
            );
          })}
          <Link href={cta.href} style={{ fontSize: 14, fontWeight: 700, color: '#fff', background: GREEN, padding: '11px 20px', borderRadius: 999 }}>{cta.label}</Link>
        </nav>
      </div>
    </header>
  );
}
