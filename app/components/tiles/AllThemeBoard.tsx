'use client';

import { useState } from 'react';
import { MONO, GREEN, moveColor, signed } from './tileUtils';
import StockAvatar from './StockAvatar';
import {
  CROSS_THEME_TOP10,
  SAMPLE_DATA,
  THEME_ETFS,
  ETF_INFO,
  ETF_DAY_CHANGE,
  ETF_RETURNS,
  type Theme,
} from '@/lib/data';

const AMBER = 'var(--ss-amber)';

// ── Cross-theme movers (ported from the classic board) ───────────────────────
type MoverStock = { ticker: string; name: string; price: number; dayChange: number; oneM: number; velo1W: number | null; velo1M: number | null; themes: Theme[] };
type MoverEtf = { ticker: string; name: string; dayChange: number; oneM: number };

const MOVER_STOCKS: MoverStock[] = (() => {
  const map = new Map<string, MoverStock>();
  (Object.keys(SAMPLE_DATA) as Theme[]).forEach((t) => {
    if (t === 'Meme') return;
    SAMPLE_DATA[t].forEach((eq) => {
      const ex = map.get(eq.ticker);
      if (ex) { if (!ex.themes.includes(t)) ex.themes.push(t); }
      else map.set(eq.ticker, {
        ticker: eq.ticker, name: eq.name, price: eq.price,
        dayChange: eq.dayChange ?? 0, oneM: eq.periodReturns['1M'],
        velo1W: eq.velocityScore?.['1W'] ?? null, velo1M: eq.velocityScore?.['1M'] ?? null,
        themes: [t],
      });
    });
  });
  return [...map.values()];
})();

const MOVER_ETFS: MoverEtf[] = (() => {
  const set = new Set<string>();
  (Object.keys(THEME_ETFS) as Theme[]).forEach((t) => { if (t !== 'Meme') THEME_ETFS[t].forEach((e) => set.add(e)); });
  return [...set]
    .map((e) => ({ ticker: e, name: ETF_INFO[e]?.name ?? e, dayChange: ETF_DAY_CHANGE[e] ?? 0, oneM: ETF_RETURNS[e]?.['1M'] ?? 0 }))
    .filter((e) => e.dayChange !== 0 || e.oneM !== 0);
})();

type CrossMode = 'breadth' | '1d' | '1m';
const isHot = (v: number, mode: CrossMode) => (mode === '1d' ? v >= 3 : v >= 15);

function computeModelCheck() {
  const pop = MOVER_STOCKS.filter((s) => s.velo1M !== null);
  const directional = pop.filter((s) => s.velo1M !== 0 && s.oneM !== 0);
  const matched = directional.filter((s) => Math.sign(s.velo1M!) === Math.sign(s.oneM)).length;
  const up = pop.filter((s) => (s.velo1M ?? 0) > 0);
  const down = pop.filter((s) => (s.velo1M ?? 0) < 0);
  const avg = (arr: MoverStock[]) => (arr.length ? arr.reduce((a, s) => a + s.oneM, 0) / arr.length : null);
  const upAvg = avg(up), downAvg = avg(down);
  return {
    n: directional.length,
    matchPct: directional.length ? Math.round((matched / directional.length) * 100) : null,
    upAvg, upN: up.length, downAvg, downN: down.length,
    spread: upAvg !== null && downAvg !== null ? upAvg - downAvg : null,
  };
}

// ── Pills ─────────────────────────────────────────────────────────────────────
function PctPill({ v }: { v: number }) {
  const pos = v >= 0;
  return (
    <span style={{ fontFamily: MONO, fontSize: 13, fontWeight: 700, padding: '2px 10px', borderRadius: 999, whiteSpace: 'nowrap',
      color: pos ? 'var(--ss-green-text)' : 'var(--ss-amber-text)', background: pos ? 'var(--ss-green-tint)' : 'var(--ss-amber-bg)', border: `1px solid ${pos ? 'var(--ss-green-tint-border)' : 'var(--ss-amber-border)'}` }}>
      {signed(v)}
    </span>
  );
}
function VeloPill({ v }: { v: number | null }) {
  if (v == null) return null;
  const pos = v >= 0;
  return (
    <span title="Velocity Score — weight-change momentum for this window" style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 999, whiteSpace: 'nowrap', color: pos ? 'var(--ss-green)' : AMBER, background: pos ? 'var(--ss-green-tint)' : 'var(--ss-amber-bg)', border: `1px solid ${pos ? 'var(--ss-green-tint-border)' : 'var(--ss-amber-border)'}` }}>
      ⚡{pos ? '+' : '−'}{Math.abs(v).toFixed(1)}
    </span>
  );
}

export default function AllThemeBoard({ onSelectTheme }: { onSelectTheme: (t: Theme) => void }) {
  const [mode, setMode] = useState<CrossMode>('1m');
  const key: 'oneM' | 'dayChange' = mode === '1m' ? 'oneM' : 'dayChange';
  const topStocks = [...MOVER_STOCKS].sort((a, b) => b[key] - a[key]).slice(0, 10);
  const topEtfs = [...MOVER_ETFS].sort((a, b) => b[key] - a[key]).slice(0, 10);
  const mc = mode === '1m' ? computeModelCheck() : null;

  const heading = mode === '1d' ? 'Biggest Movers Today (1D)' : mode === '1m' ? 'Top Performers This Month (1M)' : 'Top 10 Across All Themes';
  const blurb =
    mode === '1d' ? 'Largest one-day moves across the tracked universe of stocks and ETFs.' :
    mode === '1m' ? 'Strongest trailing-month returns across stocks and ETFs — where capital has been rotating.' :
    'Ranked by cross-theme breadth: the names held across the most institutional theme baskets. ETF count first, avg weight across all themes as tiebreaker. (Meme excluded)';
  const segs: [CrossMode, string][] = [['1d', '🔥 1D Movers'], ['1m', '⚡ 1M Movers'], ['breadth', '★ Breadth']];

  return (
    <section style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 32px 72px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14, marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.5px', color: 'var(--ss-ink)', margin: 0 }}>{heading}</h2>
          <p style={{ fontSize: 13, color: 'var(--ss-muted)', margin: '6px 0 0', maxWidth: 620 }}>{blurb}</p>
        </div>
        <div style={{ display: 'inline-flex', gap: 2, background: 'var(--ss-inset)', border: '1px solid var(--ss-track)', borderRadius: 10, padding: 3, flexShrink: 0 }}>
          {segs.map(([m, label]) => {
            const active = m === mode;
            return <button key={m} onClick={() => setMode(m)} style={{ fontFamily: MONO, fontSize: 12, fontWeight: active ? 700 : 600, color: active ? 'var(--ss-ink)' : 'var(--ss-muted)', background: active ? 'var(--ss-card)' : 'transparent', padding: '6px 12px', borderRadius: 7, border: 'none', cursor: 'pointer', boxShadow: active ? '0 1px 2px rgba(11,18,32,0.08)' : 'none', whiteSpace: 'nowrap' }}>{label}</button>;
          })}
        </div>
      </div>

      {mode === 'breadth' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {CROSS_THEME_TOP10.map((e, i) => (
            <div key={e.ticker} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--ss-card)', border: '1px solid var(--ss-border)', borderRadius: 14, padding: '12px 16px', boxShadow: '0 4px 14px rgba(11,18,32,0.04)' }}>
              <span style={{ fontFamily: MONO, fontWeight: 700, width: 22, textAlign: 'right', color: i === 0 ? GREEN : 'var(--ss-muted)', flexShrink: 0 }}>{i + 1}</span>
              <StockAvatar ticker={e.ticker} size={34} radius={9} />
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: MONO, fontWeight: 700, color: 'var(--ss-ink)' }}>{e.ticker}</span>
                  <span style={{ fontSize: 14, color: 'var(--ss-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.name}</span>
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 5, flexWrap: 'wrap' }}>
                  {e.themes.map((t) => (
                    <button key={t} onClick={() => onSelectTheme(t)} style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 999, cursor: 'pointer', color: 'var(--ss-text)', background: 'var(--ss-inset)', border: '1px solid var(--ss-border)' }}>{t}</button>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 999, color: 'var(--ss-green-text)', background: 'var(--ss-green-tint)', border: '1px solid var(--ss-green-tint-border)', whiteSpace: 'nowrap' }}>{e.themeCount} themes</span>
                <div style={{ fontFamily: MONO, fontSize: 12, marginTop: 5, color: 'var(--ss-muted)' }}>${e.price.toFixed(2)} · avg wt <span style={{ color: 'var(--ss-ink)', fontWeight: 700 }}>{e.avgProScore.toFixed(1)}%</span></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {mc && mc.matchPct !== null && (
            <div style={{ background: 'var(--ss-card)', border: '1px solid var(--ss-border)', borderRadius: 14, padding: '14px 18px', marginBottom: 18, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
              <div style={{ fontSize: 13, color: 'var(--ss-text)' }}>
                <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 0.6, color: 'var(--ss-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Model check · </span>
                Velocity agreed with the actual move on <span style={{ fontFamily: MONO, fontWeight: 800, color: 'var(--ss-ink)' }}>{mc.matchPct}%</span> of {mc.n} tracked stocks
              </div>
              <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap', fontSize: 13 }}>
                <ModelStat label={`Rising ⚡+ (${mc.upN})`} value={mc.upAvg} tip={`Average 1-month price move of the ${mc.upN} stocks whose Velocity Score rose this month (conviction building). If the model works, this should beat the falling group.`} />
                <ModelStat label={`Falling ⚡− (${mc.downN})`} value={mc.downAvg} tip={`Average 1-month price move of the ${mc.downN} stocks whose Velocity Score fell this month (conviction fading).`} />
                <ModelStat label="Spread" value={mc.spread} strong tip="Rising-group average minus falling-group average. A positive spread means rising-conviction names outperformed falling-conviction ones this month — the Velocity Score is tracking real price performance, not noise." />
              </div>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }} className="ss-perf-grid">
            <MoverList title="Stocks" rows={topStocks.map((s) => ({ ticker: s.ticker, name: s.name, val: mode === '1m' ? s.oneM : s.dayChange, velo: mode === '1m' ? s.velo1M : s.velo1W }))} mode={mode} isEtf={false} />
            <MoverList title="ETFs" rows={topEtfs.map((e) => ({ ticker: e.ticker, name: e.name, val: mode === '1m' ? e.oneM : e.dayChange, velo: null }))} mode={mode} isEtf />
          </div>
        </>
      )}
    </section>
  );
}

function ModelStat({ label, value, strong, tip }: { label: string; value: number | null; strong?: boolean; tip?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{ textAlign: 'right', position: 'relative', cursor: tip ? 'help' : 'default' }}
      onMouseEnter={() => tip && setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => tip && setOpen((o) => !o)}
    >
      <div style={{ fontSize: 11, color: 'var(--ss-muted)', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
        {label}
        {tip && <span aria-hidden style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 13, height: 13, borderRadius: 999, border: '1px solid var(--ss-border-strong)', color: 'var(--ss-muted)', fontSize: 9, fontWeight: 700, lineHeight: 1 }}>?</span>}
      </div>
      <div style={{ fontFamily: MONO, fontSize: 14, fontWeight: 700, color: value == null ? 'var(--ss-muted)' : moveColor(value) }}>
        {value == null ? '—' : `${strong ? '' : 'avg '}${signed(value)}`}
      </div>
      {open && tip && (
        <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 6, zIndex: 60, width: 240, textAlign: 'left', background: 'var(--ss-card)', border: '1px solid var(--ss-border)', borderRadius: 12, padding: '10px 12px', boxShadow: '0 16px 36px rgba(11,18,32,0.16)', pointerEvents: 'none' }}>
          <p style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--ss-text)', margin: 0 }}>{tip}</p>
        </div>
      )}
    </div>
  );
}

function MoverList({ title, rows, mode, isEtf }: { title: string; rows: { ticker: string; name: string; val: number; velo: number | null }[]; mode: CrossMode; isEtf: boolean }) {
  return (
    <div style={{ background: 'var(--ss-card)', border: '1px solid var(--ss-border)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 22px rgba(11,18,32,0.05)' }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--ss-border)', fontSize: 13, fontWeight: 700, color: 'var(--ss-ink)' }}>{title}</div>
      {rows.map((r, i) => (
        <div key={r.ticker} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', borderBottom: i === rows.length - 1 ? 'none' : '1px solid var(--ss-track)' }}>
          <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, color: 'var(--ss-muted)', width: 18, textAlign: 'right', flexShrink: 0 }}>{i + 1}</span>
          <StockAvatar ticker={r.ticker} size={28} radius={7} fontSize={10} />
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontFamily: MONO, fontSize: 13, fontWeight: 700, color: 'var(--ss-ink)' }}>{r.ticker}</span>
              {isHot(r.val, mode) && <span title="Exceptional move" aria-hidden>🔥</span>}
            </div>
            <div style={{ fontSize: 12, color: 'var(--ss-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</div>
          </div>
          {r.velo != null && <VeloPill v={r.velo} />}
          <PctPill v={r.val} />
        </div>
      ))}
    </div>
  );
}
