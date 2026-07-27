import Link from 'next/link';
import Crosshair, { Wordmark } from './Crosshair';
import ThemeToggle from './ThemeToggle';

const MONO = 'var(--font-mono-brand), monospace';
const GREEN = 'var(--ss-green)';

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
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--ss-nav-bg)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid var(--ss-border)' }}>
      <div className="ss-nav-bar" style={{ maxWidth: 1200, margin: '0 auto', height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" aria-label="Stockscout home" style={{ display: 'flex', alignItems: 'center', gap: 9, minWidth: 0 }}>
          <Crosshair size={26} />
          <span className="ss-nav-lockup">
            <Wordmark size={22} />
            <span className="ss-nav-links-secondary ss-tagline" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 3 }}>SEE IT FIRST</span>
          </span>
        </Link>
        <nav className="ss-nav-row">
          {links.map((l) => {
            const isActive = active === l.label;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={isActive ? 'ss-nav-links-tertiary' : 'ss-link-muted ss-nav-links-secondary'}
                style={{ fontSize: 15, fontWeight: isActive ? 700 : 500, color: isActive ? GREEN : undefined }}
              >
                {l.label}
              </Link>
            );
          })}
          <ThemeToggle />
          <Link href={cta.href} className="ss-nav-cta" style={{ fontSize: 14, fontWeight: 700, color: '#fff', background: GREEN, padding: '11px 20px', borderRadius: 999 }}>{cta.label}</Link>
        </nav>
      </div>
    </header>
  );
}
