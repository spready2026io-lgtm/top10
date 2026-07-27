'use client';

import { Suspense, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Crosshair, { Wordmark } from '@/app/components/brand/Crosshair';
import CompactTile from '@/app/components/tiles/CompactTile';
import ExpandedTile from '@/app/components/tiles/ExpandedTile';
import ThemePerformance from '@/app/components/tiles/ThemePerformance';
import { MONO, GREEN, moveColor, signed, homeSector, conviction, type Equity } from '@/app/components/tiles/tileUtils';
import StockAvatar from '@/app/components/tiles/StockAvatar';
import ThemeToggle from '@/app/components/brand/ThemeToggle';
import AllThemeBoard from '@/app/components/tiles/AllThemeBoard';
import {
  SAMPLE_DATA,
  THEMES,
  THEME_ETFS,
  THEME_ETF_COUNT,
  THEME_BENCHMARKS,
  type Theme,
} from '@/lib/data';

const INDEX_BASKET = new Set<Theme>(['Software', 'Cyber']);

function describe(theme: Theme, n: number): string {
  return INDEX_BASKET.has(theme)
    ? `The 10 names most concentrated across ${n} specialist ETFs in ${theme}, ranked by coverage and weight.`
    : `The 10 names with the highest manager conviction across ${n} ETFs in ${theme}, ranked by coverage and weight.`;
}

function ThemePage() {
  const router = useRouter();
  const params = useSearchParams();
  const urlTheme = params.get('theme') as Theme | null;
  const initial: Theme = urlTheme && THEMES.includes(urlTheme) ? urlTheme : 'Broad Tech';

  const [theme, setTheme] = useState<Theme>(initial);
  const [board, setBoard] = useState<'theme' | 'all'>(urlTheme === ('all' as Theme) ? 'all' : 'theme');
  const [openTicker, setOpenTicker] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'wt' | 'vs'>('wt');   // Avg Wt (conviction) | Velocity
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [showNew, setShowNew] = useState(false);             // filter to new entrants
  const [showAll, setShowAll] = useState(false);             // grid: top 10 vs all
  const [showGuide, setShowGuide] = useState(false);

  const n = THEME_ETF_COUNT[theme];
  const themeEtfs = THEME_ETFS[theme];
  const theme1W = THEME_BENCHMARKS[theme];
  const themeSet = SAMPLE_DATA[theme];
  const newCount = useMemo(() => themeSet.filter((e) => e.isNew).length, [themeSet]);

  // Sort (conviction default, or by 1W Velocity) then optional new-entrant filter.
  const ranked = useMemo(() => {
    const arr = [...themeSet];
    if (sortBy === 'vs') arr.sort((a, b) => (b.velocityScore?.['1W'] ?? -Infinity) - (a.velocityScore?.['1W'] ?? -Infinity));
    return arr;
  }, [themeSet, sortBy]);
  const filtered = showNew ? ranked.filter((e) => e.isNew) : ranked;
  const gridList = layout === 'grid' && !showAll && !showNew ? filtered.slice(0, 10) : filtered;

  const open = openTicker ? themeSet.find((e) => e.ticker === openTicker) ?? null : null;

  function pick(t: Theme) {
    setTheme(t);
    setBoard('theme');
    setOpenTicker(null);
    setShowNew(false);
    setShowAll(false);
    router.replace(`/rankings?theme=${encodeURIComponent(t)}`, { scroll: false });
  }
  function pickAll() {
    setBoard('all');
    setOpenTicker(null);
    router.replace('/rankings?theme=all', { scroll: false });
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ss-page)', color: 'var(--ss-ink)' }}>
      {/* NAV */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--ss-nav-bg)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid var(--ss-border)' }}>
        <div className="ss-nav-bar" style={{ maxWidth: 1200, margin: '0 auto', height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 9, minWidth: 0 }}>
            <Crosshair size={26} />
            <span className="ss-nav-lockup">
              <Wordmark size={22} />
              <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 3 }} className="ss-nav-links-secondary ss-tagline">SEE IT FIRST</span>
            </span>
          </Link>
          <nav className="ss-nav-row">
            <Link href="/rankings" className="ss-link-muted ss-nav-links-tertiary" style={{ fontSize: 15, fontWeight: 500 }}>Rankings</Link>
            <Link href="/about" className="ss-link-muted ss-nav-links-secondary" style={{ fontSize: 15, fontWeight: 500 }}>About</Link>
            <Link href="/rankings/classic" className="ss-link-muted ss-nav-links-secondary" style={{ fontSize: 15, fontWeight: 500 }}>Classic view</Link>
            <ThemeToggle />
            <Link href="/portfolio" className="ss-nav-cta" style={{ fontSize: 14, fontWeight: 700, color: '#fff', background: GREEN, padding: '11px 20px', borderRadius: 999 }}>Build Portfolio</Link>
          </nav>
        </div>
      </header>

      {/* THEME HEADER */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '44px 32px 8px' }}>
        <div style={{ fontSize: 14, color: 'var(--ss-muted)', marginBottom: 20 }}>
          <Link href="/rankings" style={{ color: 'var(--ss-muted)' }}>Themes</Link> &nbsp;/&nbsp; <span style={{ color: 'var(--ss-ink)', fontWeight: 600 }}>{board === 'all' ? 'All Themes' : theme}</span>
        </div>

        {/* theme selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
          <button
            onClick={pickAll}
            style={{
              fontSize: 14, fontWeight: board === 'all' ? 700 : 600, cursor: 'pointer',
              color: board === 'all' ? 'var(--ss-card)' : 'var(--ss-text)',
              background: board === 'all' ? GREEN : 'var(--ss-card)',
              border: board === 'all' ? 'none' : '1px solid var(--ss-border-strong)',
              padding: board === 'all' ? '10px 16px' : '9px 16px', borderRadius: 999,
            }}
          >
            ★ All Themes
          </button>
          {THEMES.map((t) => {
            const active = board === 'theme' && t === theme;
            return (
              <button
                key={t}
                onClick={() => pick(t)}
                style={{
                  fontSize: 14, fontWeight: active ? 700 : 600, cursor: 'pointer',
                  color: active ? 'var(--ss-card)' : 'var(--ss-text)',
                  background: active ? GREEN : 'var(--ss-card)',
                  border: active ? 'none' : '1px solid var(--ss-border-strong)',
                  padding: active ? '10px 16px' : '9px 16px',
                  borderRadius: 999,
                }}
              >
                {t}
              </button>
            );
          })}
        </div>

        {board === 'theme' ? (
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, marginBottom: 8 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: 42, fontWeight: 800, letterSpacing: '-1.2px', color: 'var(--ss-ink)', margin: 0 }}>{theme}</h1>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: MONO, fontSize: 12, fontWeight: 700, color: 'var(--ss-green-text)', background: 'var(--ss-green-tint)', border: '1px solid var(--ss-green-tint-border)', padding: '5px 11px', borderRadius: 999 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />LIVE · UPDATED TODAY
                </span>
              </div>
              <p style={{ fontSize: 18, lineHeight: 1.5, color: 'var(--ss-text)', margin: 0, maxWidth: 560 }}>{describe(theme, n)}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
              <Stat value={String(n)} label="ETFs" />
              <Div />
              <Stat value={String(SAMPLE_DATA[theme].length)} label="Names ranked" />
              <Div />
              <Stat value={signed(theme1W)} label="Theme 1W" color={moveColor(theme1W)} />
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: 42, fontWeight: 800, letterSpacing: '-1.2px', color: 'var(--ss-ink)', margin: 0 }}>All Themes</h1>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: MONO, fontSize: 12, fontWeight: 700, color: 'var(--ss-green-text)', background: 'var(--ss-green-tint)', border: '1px solid var(--ss-green-tint-border)', padding: '5px 11px', borderRadius: 999 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />LIVE · UPDATED TODAY
            </span>
          </div>
        )}
      </section>

      {board === 'all' ? (
        <AllThemeBoard onSelectTheme={pick} />
      ) : (
      <>
      {/* PERFORMANCE — Top10 vs S&P500 chart + ETFs ranked by return */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 32px 0' }}>
        <ThemePerformance theme={theme} />
      </section>

      {/* PERFORMANCE — Top10 vs S&P500 chart + ETFs ranked by return */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 32px 0' }}>
        <ThemePerformance theme={theme} />
      </section>

      {/* COVERAGE LEGEND */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 32px 4px', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <p style={{ fontSize: 13, color: 'var(--ss-muted)', margin: 0, maxWidth: 560 }}>
          <span style={{ fontWeight: 700, color: 'var(--ss-text)' }}>Coverage Score</span> is how many of this theme&apos;s {n} ETFs hold the stock — a higher score means broader institutional consensus.
        </p>
        <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
          <CovBadge n={n} pct="≥80%" color="var(--ss-green-text)" bg="var(--ss-green-tint)" border="var(--ss-green-tint-border)" />
          <CovBadge n={n} pct="≥60%" color="var(--ss-blue)" bg="var(--ss-avatar-blue-1)" border="var(--ss-avatar-blue-2)" />
          <CovBadge n={n} pct="≥40%" color="var(--ss-amber-text)" bg="var(--ss-amber-bg)" border="var(--ss-amber-border)" />
        </div>
      </section>

      {/* CONTROL ROW — New · Avg Wt/Velocity sort · Grid/List · Guide */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 32px 0', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        {newCount > 0 && (
          <button
            onClick={() => { setShowNew((v) => !v); setShowAll(false); }}
            title="New entrants — first time in the theme's Top 20 today"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 700, padding: '7px 12px', borderRadius: 999, cursor: 'pointer',
              color: showNew ? 'var(--ss-card)' : 'var(--ss-amber-text)', background: showNew ? 'var(--ss-amber)' : 'var(--ss-amber-bg)', border: `1px solid ${showNew ? 'var(--ss-amber)' : 'var(--ss-amber-border)'}` }}
          >
            ✦ New
            <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, padding: '1px 7px', borderRadius: 999, color: showNew ? 'var(--ss-card)' : 'var(--ss-amber-text)', background: showNew ? 'rgba(255,255,255,0.22)' : 'var(--ss-amber-bg)' }}>{newCount}</span>
          </button>
        )}

        <div style={{ marginLeft: newCount > 0 ? 0 : 'auto' }} />
        <Segmented
          value={sortBy}
          onChange={(v) => setSortBy(v as 'wt' | 'vs')}
          options={[{ v: 'wt', label: 'Avg Wt' }, { v: 'vs', label: '▲ Velocity' }]}
          style={{ marginLeft: newCount > 0 ? 'auto' : 0 }}
        />
        <Segmented
          value={layout}
          onChange={(v) => setLayout(v as 'grid' | 'list')}
          options={[{ v: 'grid', label: '⊞ Grid' }, { v: 'list', label: '≡ List' }]}
        />
        <button
          onClick={() => setShowGuide(true)}
          title="How the scores work"
          style={{ fontSize: 13, fontWeight: 600, padding: '7px 14px', borderRadius: 999, cursor: 'pointer', color: 'var(--ss-text)', background: 'var(--ss-card)', border: '1px solid var(--ss-border-strong)', marginLeft: 4 }}
        >
          Guide
        </button>
      </section>

      {/* GRID / LIST */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 32px 72px' }}>
        {filtered.length === 0 ? (
          <p style={{ color: 'var(--ss-muted)', fontSize: 14 }}>No new entrants in {theme} today.</p>
        ) : layout === 'grid' ? (
          <>
            <div className="ss-tile-grid">
              {gridList.map((e, i) => (
                <CompactTile key={e.ticker} equity={e} rank={i + 1} n={n} themeEtfs={themeEtfs} onOpen={() => setOpenTicker(e.ticker)} />
              ))}
            </div>
            {!showAll && !showNew && filtered.length > 10 && (
              <div style={{ textAlign: 'center', marginTop: 24 }}>
                <button onClick={() => setShowAll(true)} style={{ fontSize: 14, fontWeight: 700, color: GREEN, background: 'var(--ss-card)', border: '1px solid var(--ss-border-strong)', padding: '10px 20px', borderRadius: 999, cursor: 'pointer' }}>
                  Show all {filtered.length} ↓
                </button>
              </div>
            )}
          </>
        ) : (
          <ListView rows={filtered} n={n} sortBy={sortBy} onOpen={(t) => setOpenTicker(t)} />
        )}
      </section>
      </>
      )}

      {open && <ExpandedTile equity={open} n={n} themeEtfs={themeEtfs} onClose={() => setOpenTicker(null)} />}
      {showGuide && <GuideModal onClose={() => setShowGuide(false)} />}
    </div>
  );
}

function Stat({ value, label, color = 'var(--ss-ink)' }: { value: string; label: string; color?: string }) {
  return (
    <div>
      <div style={{ fontFamily: MONO, fontSize: 24, fontWeight: 700, color }}>{value}</div>
      <div style={{ fontSize: 12, letterSpacing: 0.6, color: 'var(--ss-muted)', textTransform: 'uppercase', marginTop: 2 }}>{label}</div>
    </div>
  );
}
function Div() {
  return <div style={{ width: 1, height: 30, background: 'var(--ss-border-strong)' }} />;
}
function CovBadge({ n, pct, color, bg, border }: { n: number; pct: string; color: string; bg: string; border: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: MONO, fontSize: 12, fontWeight: 700, color, background: bg, border: `1px solid ${border}`, padding: '4px 10px', borderRadius: 999 }}>
      <span>x/{n}</span><span style={{ opacity: 0.75, fontWeight: 600 }}>{pct}</span>
    </span>
  );
}

// ── Light segmented control (sort / layout toggles) ───────────────────────────
function Segmented({ value, onChange, options, style }: { value: string; onChange: (v: string) => void; options: { v: string; label: string }[]; style?: React.CSSProperties }) {
  return (
    <div style={{ display: 'inline-flex', gap: 2, background: 'var(--ss-inset)', border: '1px solid var(--ss-track)', borderRadius: 10, padding: 3, ...style }}>
      {options.map((o) => {
        const active = o.v === value;
        return (
          <button key={o.v} onClick={() => onChange(o.v)} style={{ fontSize: 13, fontWeight: active ? 700 : 600, color: active ? 'var(--ss-ink)' : 'var(--ss-muted)', background: active ? 'var(--ss-card)' : 'transparent', padding: '6px 12px', borderRadius: 7, border: 'none', cursor: 'pointer', boxShadow: active ? '0 1px 2px rgba(11,18,32,0.08)' : 'none', whiteSpace: 'nowrap' }}>{o.label}</button>
        );
      })}
    </div>
  );
}

// ── Compact list view (≡ List) ────────────────────────────────────────────────
function ListView({ rows, n, sortBy, onOpen }: { rows: Equity[]; n: number; sortBy: 'wt' | 'vs'; onOpen: (t: string) => void }) {
  return (
    <div style={{ background: 'var(--ss-card)', border: '1px solid var(--ss-border)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 22px rgba(11,18,32,0.05)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '40px 1.6fr 0.8fr 0.8fr 0.8fr 0.8fr', padding: '12px 18px', background: 'var(--ss-inset)', borderBottom: '1px solid var(--ss-border)', fontSize: 11, letterSpacing: 0.6, color: 'var(--ss-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
        <div>#</div><div>Company</div><div style={{ textAlign: 'right' }}>Cov</div><div style={{ textAlign: 'right' }}>Avg wt</div><div style={{ textAlign: 'right' }}>{sortBy === 'vs' ? 'Velocity' : 'Vel'}</div><div style={{ textAlign: 'right' }}>1W</div>
      </div>
      {rows.map((e, i) => {
        const vel = e.velocityScore?.['1W'];
        const conv = conviction(e.coverage);
        return (
          <button key={e.ticker} onClick={() => onOpen(e.ticker)} style={{ width: '100%', textAlign: 'left', display: 'grid', gridTemplateColumns: '40px 1.6fr 0.8fr 0.8fr 0.8fr 0.8fr', alignItems: 'center', padding: '12px 18px', borderBottom: i === rows.length - 1 ? 'none' : '1px solid var(--ss-track)', background: 'var(--ss-card)', border: 'none', cursor: 'pointer', font: 'inherit' }}>
            <div style={{ fontFamily: MONO, fontSize: 14, fontWeight: 700, color: i === 0 ? GREEN : 'var(--ss-muted)' }}>{i + 1}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
              <StockAvatar ticker={e.ticker} size={30} radius={8} fontSize={11} />
              <span style={{ minWidth: 0 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--ss-ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>{e.name}</span>
                <span style={{ fontSize: 12, color: 'var(--ss-muted)' }}>{homeSector(e.ticker) ?? ''}</span>
              </span>
            </div>
            <div style={{ textAlign: 'right', fontFamily: MONO, fontSize: 13, fontWeight: 700, color: conv.color }}>{e.easyScore}/{n}</div>
            <div style={{ textAlign: 'right', fontFamily: MONO, fontSize: 13, fontWeight: 700, color: 'var(--ss-ink)' }}>{e.proScore.toFixed(1)}%</div>
            <div style={{ textAlign: 'right', fontFamily: MONO, fontSize: 13, fontWeight: 700, color: vel == null ? 'var(--ss-muted)' : moveColor(vel) }}>{vel == null ? 'New' : signed(vel)}</div>
            <div style={{ textAlign: 'right', fontFamily: MONO, fontSize: 13, fontWeight: 700, color: moveColor(e.weeklyChange) }}>{signed(e.weeklyChange)}</div>
          </button>
        );
      })}
    </div>
  );
}

// ── Guide modal (how the scores work) ─────────────────────────────────────────
function GuideModal({ onClose }: { onClose: () => void }) {
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(11,18,32,0.45)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 440, maxWidth: '92vw', maxHeight: '88vh', overflowY: 'auto', background: 'var(--ss-card)', border: '1px solid var(--ss-border)', borderRadius: 20, boxShadow: '0 24px 60px rgba(11,18,32,0.16)', padding: 26 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: 1, color: GREEN }}>HOW CONVICTION WORKS</div>
          <button onClick={onClose} aria-label="Close" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: 'var(--ss-muted)', lineHeight: 1 }}>×</button>
        </div>
        <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.5px', color: 'var(--ss-ink)', margin: '0 0 16px' }}>Reading the board</h3>
        <GuideRow title="Coverage (x/n)" body="How many of the theme's ETFs hold the stock. Higher = broader consensus. The x/n badge is colour-coded by level." />
        <GuideRow title="Avg wt = Weight Score" body="Average portfolio weight across holders × coverage. The primary conviction metric. Hover the number on a tile for the full ETF-by-ETF breakdown." />
        <GuideRow title="Velocity" body="The 1-week change in Weight Score — who's climbing before they reach #1. Switch the sort to ▲ Velocity to surface fast-movers." />
        <GuideRow title="✦ New" body="Stocks appearing in the theme's Top 20 for the first time today. Tap the New pill to filter to just them." />
        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <Link href="/about" style={{ fontSize: 14, fontWeight: 700, color: GREEN }}>Full guide on About →</Link>
        </div>
      </div>
    </div>
  );
}
function GuideRow({ title, body }: { title: string; body: string }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ss-ink)', marginBottom: 3 }}>{title}</div>
      <p style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--ss-text)', margin: 0 }}>{body}</p>
    </div>
  );
}

export default function RankingsPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--ss-page)' }} />}>
      <ThemePage />
    </Suspense>
  );
}
