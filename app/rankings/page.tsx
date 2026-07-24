'use client';

import { Suspense, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Crosshair, { Wordmark } from '@/app/components/brand/Crosshair';
import CompactTile from '@/app/components/tiles/CompactTile';
import ExpandedTile from '@/app/components/tiles/ExpandedTile';
import { MONO, GREEN, moveColor, signed } from '@/app/components/tiles/tileUtils';
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
  const [openTicker, setOpenTicker] = useState<string | null>(null);

  const n = THEME_ETF_COUNT[theme];
  const themeEtfs = THEME_ETFS[theme];
  const top10 = useMemo(() => SAMPLE_DATA[theme].slice(0, 10), [theme]);
  const theme1W = THEME_BENCHMARKS[theme];
  const open = openTicker ? top10.find((e) => e.ticker === openTicker) ?? null : null;

  function pick(t: Theme) {
    setTheme(t);
    setOpenTicker(null);
    router.replace(`/rankings?theme=${encodeURIComponent(t)}`, { scroll: false });
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F7F8FB', color: '#0B1220' }}>
      {/* NAV */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid #e9ecf1' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <Crosshair size={26} />
            <Wordmark size={22} />
            <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 3, color: '#98a2b0', marginLeft: 8 }} className="ss-nav-links-secondary">SEE IT FIRST</span>
          </Link>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
            <Link href="/rankings" className="ss-link-muted" style={{ fontSize: 15, fontWeight: 500 }}>Rankings</Link>
            <Link href="/about" className="ss-link-muted ss-nav-links-secondary" style={{ fontSize: 15, fontWeight: 500 }}>About</Link>
            <Link href="/rankings/classic" className="ss-link-muted ss-nav-links-secondary" style={{ fontSize: 15, fontWeight: 500 }}>Classic view</Link>
            <Link href="/portfolio" style={{ fontSize: 14, fontWeight: 700, color: '#fff', background: GREEN, padding: '11px 20px', borderRadius: 999 }}>Build Portfolio</Link>
          </nav>
        </div>
      </header>

      {/* THEME HEADER */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '44px 32px 8px' }}>
        <div style={{ fontSize: 14, color: '#8a94a3', marginBottom: 20 }}>
          <Link href="/rankings" style={{ color: '#8a94a3' }}>Themes</Link> &nbsp;/&nbsp; <span style={{ color: '#0B1220', fontWeight: 600 }}>{theme}</span>
        </div>

        {/* theme selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
          {THEMES.map((t) => {
            const active = t === theme;
            return (
              <button
                key={t}
                onClick={() => pick(t)}
                style={{
                  fontSize: 14, fontWeight: active ? 700 : 600, cursor: 'pointer',
                  color: active ? '#fff' : '#3f4a58',
                  background: active ? GREEN : '#fff',
                  border: active ? 'none' : '1px solid #dfe4ea',
                  padding: active ? '10px 16px' : '9px 16px',
                  borderRadius: 999,
                }}
              >
                {t}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, marginBottom: 8 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: 42, fontWeight: 800, letterSpacing: '-1.2px', color: '#0B1220', margin: 0 }}>{theme}</h1>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: MONO, fontSize: 12, fontWeight: 700, color: '#0a7350', background: '#e7f7f0', border: '1px solid #b8e6d3', padding: '5px 11px', borderRadius: 999 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />LIVE · UPDATED TODAY
              </span>
            </div>
            <p style={{ fontSize: 18, lineHeight: 1.5, color: '#55606e', margin: 0, maxWidth: 560 }}>{describe(theme, n)}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <Stat value={String(n)} label="ETFs" />
            <Div />
            <Stat value={String(SAMPLE_DATA[theme].length)} label="Names ranked" />
            <Div />
            <Stat value={signed(theme1W)} label="Theme 1W" color={moveColor(theme1W)} />
          </div>
        </div>
      </section>

      {/* TILE GRID */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 32px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 18 }}>
          {top10.map((e, i) => (
            <CompactTile key={e.ticker} equity={e} rank={i + 1} n={n} onOpen={() => setOpenTicker(e.ticker)} />
          ))}
        </div>
      </section>

      {open && <ExpandedTile equity={open} n={n} themeEtfs={themeEtfs} onClose={() => setOpenTicker(null)} />}
    </div>
  );
}

function Stat({ value, label, color = '#0B1220' }: { value: string; label: string; color?: string }) {
  return (
    <div>
      <div style={{ fontFamily: MONO, fontSize: 24, fontWeight: 700, color }}>{value}</div>
      <div style={{ fontSize: 12, letterSpacing: 0.6, color: '#8a94a3', textTransform: 'uppercase', marginTop: 2 }}>{label}</div>
    </div>
  );
}
function Div() {
  return <div style={{ width: 1, height: 30, background: '#e0e4ea' }} />;
}

export default function RankingsPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#F7F8FB' }} />}>
      <ThemePage />
    </Suspense>
  );
}
