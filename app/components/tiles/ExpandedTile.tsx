'use client';

import { useEffect, useState } from 'react';
import { buildChart, conviction, homeSector, moveColor, signed, xLabels, MONO, GREEN, type Equity } from './tileUtils';
import { AvgWtTip, VelocityTip } from './MetricTooltips';
import StockAvatar from './StockAvatar';

const RANGES = ['1D', '1W', '1M', 'YTD', '6M', '1Y'] as const;
type Range = (typeof RANGES)[number];

/**
 * Expanded stock tile (light redesign) — the core product object.
 * Front: price + coverage + live chart with range toggle.
 * Back ("Flip for details"): financials, ETF presence, Tony's note.
 */
export default function ExpandedTile({
  equity,
  n,
  themeEtfs,
  onClose,
}: {
  equity: Equity;
  n: number;
  themeEtfs: string[];
  onClose: () => void;
}) {
  const [range, setRange] = useState<Range>('1W');
  const [flipped, setFlipped] = useState(false);
  const [wtOpen, setWtOpen] = useState(false); // avg-wt breakdown tooltip
  const [vsOpen, setVsOpen] = useState(false); // velocity calculation tooltip

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const series = equity.priceHistory?.[range] ?? equity.weeklyPrices ?? [];
  const chart = buildChart(series as number[]);
  const stroke = chart.up ? GREEN : 'var(--ss-amber)';
  const conv = conviction(equity.coverage);
  const coveragePct = `${Math.round(equity.coverage * 100)}%`;
  const sector = homeSector(equity.ticker) ?? '';

  // Price change synced to the chart toggle: 1D→dayChange, 1W→weeklyChange,
  // else the matching periodReturns entry (falls back to 1W if absent).
  const rangeChange =
    range === '1D' ? (equity.dayChange ?? equity.weeklyChange)
    : range === '1W' ? equity.weeklyChange
    : equity.periodReturns?.[range as '1M' | 'YTD' | '6M' | '1Y'] ?? equity.weeklyChange;
  const xs = xLabels(range);

  // Weight Score = avg weight (across holders) × coverage — the product's headline
  // "% avg wt". Velocity uses the canonical 1W window (see MetricTooltips).
  const ws = equity.proScore;
  const v1w = equity.velocityScore?.['1W'] ?? null;

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(11,18,32,0.45)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ width: 400, maxWidth: '92vw', maxHeight: '90vh', overflowY: 'auto', background: 'var(--ss-card)', border: '1px solid var(--ss-border)', borderRadius: 22, boxShadow: '0 24px 60px rgba(11,18,32,0.12)' }}
      >
        {/* ── FRONT ── */}
        {!flipped ? (
          <>
            <div style={{ padding: '22px 22px 0' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
                  <StockAvatar ticker={equity.ticker} size={46} radius={13} bg="linear-gradient(135deg,var(--ss-avatar-blue-1),var(--ss-avatar-blue-2))" textColor="var(--ss-blue)" fontSize={14} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.3px', color: 'var(--ss-ink)', lineHeight: 1.2 }}>{equity.name}</div>
                    <div style={{ fontSize: 13, color: 'var(--ss-muted)', marginTop: 2 }}>{equity.ticker} · {sector}</div>
                  </div>
                </div>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: MONO, fontSize: 13, fontWeight: 700, color: conv.color, background: conv.bg, border: `1px solid ${conv.label === 'Low' ? 'var(--ss-border-strong)' : conv.label === 'Medium' ? 'var(--ss-amber-border)' : 'var(--ss-green-tint-border)'}`, padding: '5px 11px', borderRadius: 999, flexShrink: 0 }}>{equity.easyScore}/{n}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 16 }}>
                <div>
                  <div style={{ fontFamily: MONO, fontSize: 32, fontWeight: 700, letterSpacing: '-0.5px', color: 'var(--ss-ink)', lineHeight: 1 }}>${equity.price.toFixed(2)}</div>
                  <div style={{ fontSize: 13, color: 'var(--ss-muted)', marginTop: 6 }}>{range} change <span style={{ fontFamily: MONO, fontWeight: 700, color: moveColor(rangeChange), marginLeft: 4 }}>{signed(rangeChange)}</span></div>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                  {/* avg wt = Weight Score, with per-ETF breakdown tooltip */}
                  <div
                    style={{ position: 'relative', cursor: 'pointer' }}
                    onMouseEnter={() => setWtOpen(true)}
                    onMouseLeave={() => setWtOpen(false)}
                    onClick={() => { setWtOpen((o) => !o); setVsOpen(false); }}
                  >
                    <div style={{ fontFamily: MONO, fontSize: 20, fontWeight: 700, color: 'var(--ss-ink)', lineHeight: 1.1, borderBottom: '1px dotted var(--ss-border-strong)' }}>{ws.toFixed(1)}<span style={{ fontSize: 12, color: 'var(--ss-muted)', fontWeight: 600 }}> % avg wt</span></div>
                    {wtOpen && <AvgWtTip equity={equity} themeEtfs={themeEtfs} align="right" />}
                  </div>
                  {/* velocity (1W) with calculation tooltip */}
                  <div
                    style={{ position: 'relative', cursor: v1w == null ? 'default' : 'pointer' }}
                    onMouseEnter={() => v1w != null && setVsOpen(true)}
                    onMouseLeave={() => setVsOpen(false)}
                    onClick={() => { if (v1w != null) { setVsOpen((o) => !o); setWtOpen(false); } }}
                  >
                    <div style={{ fontFamily: MONO, fontSize: 20, fontWeight: 700, color: v1w == null ? 'var(--ss-muted)' : moveColor(v1w), lineHeight: 1.1, borderBottom: v1w == null ? 'none' : '1px dotted var(--ss-border-strong)' }}>{v1w == null ? 'New' : signed(v1w)}<span style={{ fontSize: 12, color: 'var(--ss-muted)', fontWeight: 600 }}> velocity</span></div>
                    {vsOpen && <VelocityTip equity={equity} align="right" />}
                  </div>
                </div>
              </div>
            </div>

            {/* coverage bar */}
            <div style={{ margin: '0 22px 4px', padding: '14px 16px', background: 'var(--ss-inset)', border: '1px solid var(--ss-track)', borderRadius: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 12, letterSpacing: 0.5, color: 'var(--ss-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Coverage</span>
                <span style={{ fontFamily: MONO, fontSize: 13, fontWeight: 700, color: 'var(--ss-ink)' }}>{equity.easyScore} <span style={{ color: 'var(--ss-faint)' }}>of {n} ETFs</span></span>
              </div>
              <div style={{ height: 8, borderRadius: 999, background: 'var(--ss-track)', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: 999, background: GREEN, width: coveragePct }} />
              </div>
            </div>

            {/* chart */}
            <div style={{ padding: '16px 22px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 12, letterSpacing: 0.5, color: 'var(--ss-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Price</span>
                <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, color: 'var(--ss-ink)' }}>{range}</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '2px 0 18px', fontFamily: MONO, fontSize: 11, color: 'var(--ss-faint)' }}>
                  {chart.labels.map((l, i) => <span key={i}>{l.v}</span>)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <svg viewBox="0 0 340 150" preserveAspectRatio="none" style={{ width: '100%', height: 150, display: 'block' }}>
                    <defs>
                      <linearGradient id={`fill-${equity.ticker}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={stroke} stopOpacity="0.22" />
                        <stop offset="100%" stopColor={stroke} stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {chart.gridY.map((y, i) => <line key={i} x1="0" y1={y} x2="340" y2={y} stroke="var(--ss-track)" strokeWidth="1" />)}
                    <polygon points={chart.area} fill={`url(#fill-${equity.ticker})`} />
                    <polyline points={chart.points} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
                    <circle cx={chart.lastX} cy={chart.lastY} r="4" fill={stroke} stroke="var(--ss-card)" strokeWidth="2" />
                  </svg>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 11, color: 'var(--ss-faint)' }}>
                    {xs.map((x, i) => <span key={i}>{x}</span>)}
                  </div>
                </div>
              </div>
            </div>

            {/* timeframe toggle */}
            <div style={{ padding: '14px 22px 0', display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: 'inline-flex', gap: 2, background: 'var(--ss-inset)', border: '1px solid var(--ss-track)', borderRadius: 10, padding: 3 }}>
                {RANGES.map((r) => {
                  const active = r === range;
                  return (
                    <button key={r} onClick={() => setRange(r)} style={{ fontFamily: MONO, fontSize: 12, fontWeight: active ? 700 : 600, color: active ? 'var(--ss-ink)' : 'var(--ss-muted)', background: active ? 'var(--ss-card)' : 'transparent', padding: '6px 12px', borderRadius: 7, border: 'none', cursor: 'pointer', boxShadow: active ? '0 1px 2px rgba(11,18,32,0.08)' : 'none' }}>{r}</button>
                  );
                })}
              </div>
            </div>

            {/* footer */}
            <div style={{ padding: '16px 22px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13, color: 'var(--ss-faint)' }}>Updated today</span>
              <button onClick={() => setFlipped(true)} style={{ fontSize: 14, fontWeight: 700, color: GREEN, background: 'none', border: 'none', cursor: 'pointer' }}>Flip for details →</button>
            </div>
          </>
        ) : (
          /* ── BACK ── */
          <div style={{ padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--ss-ink)' }}>{equity.name}</div>
              <button onClick={() => setFlipped(false)} style={{ fontSize: 14, fontWeight: 700, color: GREEN, background: 'none', border: 'none', cursor: 'pointer' }}>← Back to chart</button>
            </div>

            {/* financials */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 18 }}>
              <Fin label="Market cap" value={equity.marketCap || '—'} />
              <Fin label="P/E" value={equity.pe == null ? '—' : equity.pe.toFixed(1)} />
              <Fin label="EPS" value={equity.eps == null ? '—' : String(equity.eps)} />
              <Fin label="Rev growth" value={equity.revenueGrowth == null ? '—' : `${equity.revenueGrowth}%`} />
              <Fin label="Gross margin" value={equity.grossMargin == null ? '—' : `${equity.grossMargin}%`} />
              <Fin label="Div yield" value={equity.dividendYield == null ? '—' : `${equity.dividendYield}%`} />
            </div>

            {/* ETF presence */}
            <div style={{ fontSize: 11, letterSpacing: 0.5, color: 'var(--ss-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>Held by ({equity.easyScore}/{n})</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
              {themeEtfs.map((etf) => {
                const held = equity.etfPresence?.[etf];
                const on = held !== undefined && held !== false;
                return (
                  <span key={etf} style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, padding: '4px 8px', borderRadius: 6, color: on ? 'var(--ss-green-text)' : 'var(--ss-faint)', background: on ? 'var(--ss-green-tint)' : 'var(--ss-inset)', border: `1px solid ${on ? 'var(--ss-green-tint-border)' : 'var(--ss-border)'}` }}>{etf}</span>
                );
              })}
            </div>

            {/* Tony note */}
            {equity.tonyNote && (
              <div style={{ background: 'var(--ss-inset)', border: '1px solid var(--ss-track)', borderRadius: 12, padding: 16 }}>
                <div style={{ fontSize: 11, letterSpacing: 0.5, color: GREEN, textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>Tony&apos;s read</div>
                <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ss-text)', margin: 0 }}>{equity.tonyNote}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Fin({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: 'var(--ss-inset)', borderRadius: 10, padding: '11px 12px' }}>
      <div style={{ fontSize: 10, letterSpacing: 0.5, color: 'var(--ss-muted)', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
      <div style={{ fontFamily: MONO, fontSize: 15, fontWeight: 700, color: 'var(--ss-ink)' }}>{value}</div>
    </div>
  );
}
