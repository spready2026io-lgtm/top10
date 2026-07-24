import Link from 'next/link';
import Crosshair, { Wordmark } from '@/app/components/brand/Crosshair';
import NewsletterSignup from '@/app/components/landing/NewsletterSignup';
import {
  SAMPLE_DATA,
  CROSS_THEME_TOP10,
  THEME_ETFS,
  THEME_ETF_COUNT,
  THEMES,
  HOLDINGS_COUNT,
} from '@/lib/data';
import { MARKET_TILES } from '@/lib/markets-data';

// ── Live figures (derived at build time, never hardcoded/stale) ───────────────
const ACTIVE_ETFS   = new Set(Object.values(THEME_ETFS).flat()).size;         // 51
const NAMES_RANKED  = new Set(THEMES.flatMap((t) => SAMPLE_DATA[t].map((e) => e.ticker))).size; // 116
const THEME_COUNT   = THEMES.length;                                          // 8
const MARKET_COUNT  = MARKET_TILES.length;                                    // 18
const SHARES_FMT    = HOLDINGS_COUNT.toLocaleString('en-US');                 // 1,679

const mono = { fontFamily: 'var(--font-mono-brand), monospace' } as const;

const GREEN = '#059669';
const AMBER = '#c2743a';

function signed(n: number, digits = 1): string {
  const s = n < 0 ? '−' : '+';
  return `${s}${Math.abs(n).toFixed(digits)}%`;
}
const moveColor = (n: number) => (n >= 0 ? GREEN : AMBER);

function conviction(coverage: number): { label: string; color: string } {
  if (coverage >= 0.6) return { label: 'High', color: GREEN };
  if (coverage >= 0.35) return { label: 'Medium', color: '#a06a12' };
  return { label: 'Low', color: '#5b6675' };
}

// ── Explore pills → real routes ───────────────────────────────────────────────
const EXPLORE = [
  { label: 'Build Portfolio', href: '/portfolio' },
  { label: 'Conviction Board', href: '/conviction' },
  { label: 'World Markets', href: '/markets' },
  { label: 'Ask Tony', href: '/ask' },
  { label: 'ETF Universe', href: '/universe' },
];

export default function Landing() {
  const ex = SAMPLE_DATA['Broad Tech'][0]; // live #1-by-conviction example tile
  const exN = THEME_ETF_COUNT['Broad Tech'];
  const exVel = ex.velocityScore?.['1W'];
  const exConv = conviction(ex.coverage);

  const rows = CROSS_THEME_TOP10.slice(0, 6);

  return (
    <div style={{ minHeight: '100vh', background: '#F7F8FB', color: '#0B1220' }}>

      {/* ============ NAV ============ */}
      <header
        style={{
          position: 'sticky', top: 0, zIndex: 50,
          background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid #e9ecf1',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <Crosshair size={26} />
            <Wordmark size={22} />
            <span style={{ ...mono, fontSize: 11, letterSpacing: 3, color: '#98a2b0', marginLeft: 8 }}>SEE IT FIRST</span>
          </div>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
            <Link href="/rankings" className="ss-link-muted" style={{ fontSize: 15, fontWeight: 500 }}>Rankings</Link>
            <a href="#how" className="ss-link-muted ss-nav-links-secondary" style={{ fontSize: 15, fontWeight: 500 }}>How it works</a>
            <Link href="/about" className="ss-link-muted ss-nav-links-secondary" style={{ fontSize: 15, fontWeight: 500 }}>About</Link>
            <Link href="/contact" className="ss-link-muted ss-nav-links-secondary" style={{ fontSize: 15, fontWeight: 500 }}>Contact</Link>
            <Link href="/rankings" style={{ fontSize: 14, fontWeight: 700, color: '#fff', background: GREEN, padding: '11px 20px', borderRadius: 999 }}>See rankings</Link>
          </nav>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -220, right: -140, width: 680, height: 680, borderRadius: '50%', background: 'radial-gradient(circle at 50% 50%, rgba(16,185,129,0.14), transparent 62%)', pointerEvents: 'none' }} />
        <div className="ss-hero-grid" style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '80px 32px 56px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#e7f7f0', border: '1px solid #b8e6d3', color: '#0a7350', fontSize: 12, fontWeight: 700, letterSpacing: 0.4, padding: '7px 13px', borderRadius: 999, marginBottom: 26 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />UPDATED DAILY · NO LOGIN
            </div>
            <h1 style={{ fontSize: 62, lineHeight: 1.02, fontWeight: 800, letterSpacing: '-2px', color: '#0B1220', margin: '0 0 22px' }}>
              See what active ETF managers are <span style={{ color: GREEN }}>really buying</span>
            </h1>
            <p style={{ fontSize: 20, lineHeight: 1.55, color: '#55606e', margin: '0 0 36px', maxWidth: 520 }}>
              We track every holding across {ACTIVE_ETFS} ETFs and rank them by manager conviction. When 8 of 10 funds overweight the same name, you&apos;ll see it first.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24, flexWrap: 'wrap' }}>
              <Link href="/rankings" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 16, fontWeight: 700, color: '#fff', background: GREEN, padding: '16px 28px', borderRadius: 14 }}>See the rankings <span style={{ fontSize: 18 }}>↓</span></Link>
              <a href="#how" style={{ display: 'inline-flex', alignItems: 'center', fontSize: 16, fontWeight: 600, color: '#0B1220', background: '#fff', border: '1px solid #d7dce3', padding: '16px 26px', borderRadius: 14 }}>Read the guide</a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 36, paddingTop: 30, borderTop: '1px solid #e6e9ef', flexWrap: 'wrap' }}>
              <Stat value={String(ACTIVE_ETFS)} label="ETFs tracked" />
              <Divider />
              <Stat value={`${SHARES_FMT}`} label="Shares tracked" />
              <Divider />
              <Stat value={String(NAMES_RANKED)} label="Names ranked" />
            </div>
          </div>

          {/* Live example tile */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ ...mono, fontSize: 11, letterSpacing: 1, color: '#a06a12', background: '#fcf3e1', border: '1px solid #f0d9a8', padding: '4px 10px', borderRadius: 6 }}>EXAMPLE TILE</span>
              <span style={{ fontSize: 13, color: '#8a94a3' }}>Broad Tech · #1 conviction</span>
            </div>
            <div style={{ background: '#fff', border: '1px solid #e6e9ef', borderRadius: 18, padding: 24, boxShadow: '0 18px 40px rgba(11,18,32,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: 'linear-gradient(135deg,#eef2fb,#dde6f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#3b6fd4', fontSize: 14 }}>{ex.ticker}</div>
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 700, color: '#0B1220' }}>{ex.name}</div>
                    <div style={{ fontSize: 13, color: '#8a94a3' }}>{ex.ticker} · Broad Tech</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ ...mono, fontSize: 22, fontWeight: 700, color: '#0B1220' }}>${ex.price.toFixed(2)}</div>
                  <div style={{ ...mono, fontSize: 13, fontWeight: 700, color: moveColor(ex.weeklyChange) }}>{signed(ex.weeklyChange)} 1W</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <Inset label="Coverage" value={<><span>{ex.easyScore}</span><span style={{ color: '#a4adba', fontSize: 14 }}>/{exN} ETFs</span></>} />
                <Inset label="Avg weight" value={`${ex.avgWeight?.toFixed(1) ?? '—'}%`} />
                <Inset label="Velocity 1W" value={exVel == null ? 'New' : signed(exVel)} color={exVel == null ? '#8a94a3' : moveColor(exVel)} />
                <Inset label="Conviction" value={exConv.label} color={exConv.color} />
              </div>
            </div>
            <div style={{ fontSize: 13, color: '#8a94a3', marginTop: 12, textAlign: 'center' }}>Free. No login. Updated daily.</div>
          </div>
        </div>

        {/* explore pills */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px 64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <Link href="/rankings" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 14, fontWeight: 700, color: '#fff', background: GREEN, padding: '10px 16px', borderRadius: 999 }}>🔥 All-Theme Top 10</Link>
            {EXPLORE.map((p) => (
              <Link key={p.href} href={p.href} style={{ fontSize: 14, fontWeight: 600, color: '#3f4a58', background: '#fff', border: '1px solid #dfe4ea', padding: '10px 16px', borderRadius: 999 }}>{p.label}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section id="how" style={{ background: '#fff', borderTop: '1px solid #eef1f5', borderBottom: '1px solid #eef1f5' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 32px' }}>
          <div style={{ maxWidth: 640, marginBottom: 44 }}>
            <div style={{ ...mono, fontSize: 13, letterSpacing: 1, color: GREEN, marginBottom: 12 }}>HOW CONVICTION WORKS</div>
            <h2 style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-1px', color: '#0B1220', margin: '0 0 12px' }}>Three steps, refreshed every day</h2>
            <p style={{ fontSize: 18, lineHeight: 1.55, color: '#55606e', margin: 0 }}>No opinions, no noise — just what the managers actually hold, scored and ranked.</p>
          </div>
          <div className="ss-how-grid">
            <Step n="01" title="We read every holding" body={`Every position across ${ACTIVE_ETFS} ETFs — over ${SHARES_FMT} shares in ${THEME_COUNT} themes — pulled fresh each day.`} />
            <Step n="02" title="We score conviction" body="Each name is scored on how many ETFs hold it and at what weight — so crowding is obvious at a glance." />
            <Step n="03" title="We rank it daily" body={`${NAMES_RANKED} names re-ranked every day, plus where money is flowing across ${MARKET_COUNT} world markets.`} />
          </div>
        </div>
      </section>

      {/* ============ LEADERBOARD ============ */}
      <section id="leaderboard" style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
          <div>
            <div style={{ ...mono, fontSize: 13, letterSpacing: 1, color: GREEN, marginBottom: 12 }}>LIVE · ALL THEMES</div>
            <h2 style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-1px', color: '#0B1220', margin: 0 }}>Today&apos;s highest-conviction names</h2>
          </div>
          <Link href="/rankings" style={{ fontSize: 15, fontWeight: 700, color: GREEN }}>View full rankings →</Link>
        </div>

        <div className="ss-lb-scroll" style={{ background: '#fff', border: '1px solid #e6e9ef', borderRadius: 18, overflow: 'hidden', boxShadow: '0 12px 30px rgba(11,18,32,0.05)' }}>
          <div className="ss-lb-grid" style={{ padding: '14px 24px', background: '#f4f6f9', borderBottom: '1px solid #e9ecf1', fontSize: 11, letterSpacing: 0.8, color: '#8a94a3', textTransform: 'uppercase', fontWeight: 700 }}>
            <div>Rank</div><div>Company</div><div>Breadth</div><div style={{ textAlign: 'right' }}>Avg wt</div><div style={{ textAlign: 'right' }}>1W</div>
          </div>
          {rows.map((r, i) => {
            const pct = Math.round((r.themeCount / THEME_COUNT) * 100);
            return (
              <div key={r.ticker} className="ss-lb-grid" style={{ alignItems: 'center', padding: '16px 24px', borderBottom: i === rows.length - 1 ? 'none' : '1px solid #f0f2f6' }}>
                <div style={{ ...mono, fontSize: 16, fontWeight: 700, color: i === 0 ? GREEN : '#8a94a3' }}>{i + 1}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ ...mono, width: 38, height: 38, borderRadius: 10, background: '#eef2f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, color: '#3f4a58' }}>{r.ticker}</div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#0B1220' }}>{r.name}</div>
                    <div style={{ fontSize: 13, color: '#8a94a3' }}>{r.themeCount} themes</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 88, height: 7, borderRadius: 999, background: '#eef1f5', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: GREEN, borderRadius: 999 }} />
                  </div>
                  <span style={{ ...mono, fontSize: 13, color: '#55606e' }}>{r.themeCount}/{THEME_COUNT}</span>
                </div>
                <div style={{ ...mono, textAlign: 'right', fontSize: 15, fontWeight: 700, color: '#0B1220' }}>{r.avgProScore.toFixed(2)}%</div>
                <div style={{ ...mono, textAlign: 'right', fontSize: 15, fontWeight: 700, color: moveColor(r.weeklyChange) }}>{signed(r.weeklyChange)}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============ NEWSLETTER ============ */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px 72px' }}>
        <div style={{ background: 'linear-gradient(135deg,#0B0F17,#123024)', borderRadius: 20, padding: '44px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 28, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -120, right: -80, width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle at 50% 50%, rgba(52,211,153,0.16), transparent 62%)' }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 560 }}>
            <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.5px', color: '#fff', marginBottom: 8 }}>Get Tony&apos;s weekly conviction note</div>
            <p style={{ fontSize: 16, lineHeight: 1.5, color: '#9aa6b3', margin: 0 }}>The stocks gaining conviction across {ACTIVE_ETFS} funds, plus world-market flows. One email a week.</p>
          </div>
          <NewsletterSignup source="landing" />
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer style={{ background: '#fff', borderTop: '1px solid #eef1f5' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32, marginBottom: 36 }}>
            <div style={{ maxWidth: 340 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}>
                <Crosshair size={24} />
                <Wordmark size={20} />
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.55, color: '#8a94a3', margin: 0 }}>
                Tracking {ACTIVE_ETFS} ETFs across {MARKET_COUNT} world markets. Rankings for information only — not investment advice.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 64, flexWrap: 'wrap' }}>
              <FooterCol title="Product" links={[['Rankings', '/rankings'], ['Build Portfolio', '/portfolio'], ['World Markets', '/markets'], ['Ask Tony', '/ask']]} />
              <FooterCol title="Company" links={[['About', '/about'], ['Contact', '/contact'], ['How it works', '#how'], ['ETF Universe', '/universe']]} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, paddingTop: 24, borderTop: '1px solid #eef1f5', fontSize: 14, color: '#a4adba' }}>
            <span>© 2026 Stockscout. All rights reserved.</span>
            <span>Updated daily · Free · No login</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── Small presentational helpers ──────────────────────────────────────────────
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div style={{ ...mono, fontSize: 28, fontWeight: 700, color: '#0B1220' }}>{value}</div>
      <div style={{ fontSize: 12, letterSpacing: 0.8, color: '#8a94a3', textTransform: 'uppercase', marginTop: 3 }}>{label}</div>
    </div>
  );
}
function Divider() {
  return <div style={{ width: 1, height: 34, background: '#e0e4ea' }} />;
}
function Inset({ label, value, color = '#0B1220' }: { label: string; value: React.ReactNode; color?: string }) {
  return (
    <div style={{ background: '#f4f6f9', borderRadius: 12, padding: '14px 16px' }}>
      <div style={{ fontSize: 11, letterSpacing: 0.6, color: '#8a94a3', textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
      <div style={{ ...mono, fontSize: 20, fontWeight: 700, color }}>{value}</div>
    </div>
  );
}
function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div style={{ background: '#F7F8FB', border: '1px solid #e9ecf1', borderRadius: 16, padding: 30 }}>
      <div style={{ ...mono, width: 44, height: 44, borderRadius: 12, background: '#e7f7f0', color: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18, marginBottom: 18 }}>{n}</div>
      <div style={{ fontSize: 20, fontWeight: 700, color: '#0B1220', marginBottom: 8 }}>{title}</div>
      <p style={{ fontSize: 16, lineHeight: 1.55, color: '#55606e', margin: 0 }}>{body}</p>
    </div>
  );
}
function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontSize: 12, letterSpacing: 0.8, color: '#a4adba', textTransform: 'uppercase', fontWeight: 700, marginBottom: 2 }}>{title}</div>
      {links.map(([label, href]) =>
        href.startsWith('#')
          ? <a key={label} href={href} style={{ fontSize: 15, color: '#55606e' }}>{label}</a>
          : <Link key={label} href={href} style={{ fontSize: 15, color: '#55606e' }}>{label}</Link>
      )}
    </div>
  );
}
