'use client';

import { useEffect, useState } from 'react';
import { buildChart, conviction, homeSector, moveColor, signed, xLabels, MONO, GREEN, type Equity } from './tileUtils';
import { AvgWtTip, VelocityTip } from './MetricTooltips';

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
  const stroke = chart.up ? GREEN : '#c2743a';
  const conv = conviction(equity.coverage);
  const coveragePct = `${Math.round(equity.coverage * 100)}%`;
  const sector = homeSector(equity.ticker) ?? '';
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
        style={{ width: 400, maxWidth: '92vw', maxHeight: '90vh', overflowY: 'auto', background: '#fff', border: '1px solid #e6e9ef', borderRadius: 22, boxShadow: '0 24px 60px rgba(11,18,32,0.12)' }}
      >
        {/* ── FRONT ── */}
        {!flipped ? (
          <>
            <div style={{ padding: '22px 22px 0' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
                  <div style={{ width: 46, height: 46, borderRadius: 13, background: 'linear-gradient(135deg,#e7edfb,#d4e0f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#3b6fd4', fontSize: 14 }}>{equity.ticker}</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.3px', color: '#0B1220', lineHeight: 1.2 }}>{equity.name}</div>
                    <div style={{ fontSize: 13, color: '#8a94a3', marginTop: 2 }}>{equity.ticker} · {sector}</div>
                  </div>
                </div>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: MONO, fontSize: 13, fontWeight: 700, color: conv.color, background: conv.bg, border: `1px solid ${conv.label === 'Low' ? '#dfe4ea' : conv.label === 'Medium' ? '#f0d9a8' : '#b8e6d3'}`, padding: '5px 11px', borderRadius: 999, flexShrink: 0 }}>{equity.easyScore}/{n}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 16 }}>
                <div>
                  <div style={{ fontFamily: MONO, fontSize: 32, fontWeight: 700, letterSpacing: '-0.5px', color: '#0B1220', lineHeight: 1 }}>${equity.price.toFixed(2)}</div>
                  <div style={{ fontSize: 13, color: '#8a94a3', marginTop: 6 }}>1W change <span style={{ fontFamily: MONO, fontWeight: 700, color: moveColor(equity.weeklyChange), marginLeft: 4 }}>{signed(equity.weeklyChange)}</span></div>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                  {/* avg wt = Weight Score, with per-ETF breakdown tooltip */}
                  <div
                    style={{ position: 'relative', cursor: 'pointer' }}
                    onMouseEnter={() => setWtOpen(true)}
                    onMouseLeave={() => setWtOpen(false)}
                    onClick={() => { setWtOpen((o) => !o); setVsOpen(false); }}
                  >
                    <div style={{ fontFamily: MONO, fontSize: 20, fontWeight: 700, color: '#0B1220', lineHeight: 1.1, borderBottom: '1px dotted #c7cdd6' }}>{ws.toFixed(1)}<span style={{ fontSize: 12, color: '#8a94a3', fontWeight: 600 }}> % avg wt</span></div>
                    {wtOpen && <AvgWtTip equity={equity} themeEtfs={themeEtfs} align="right" />}
                  </div>
                  {/* velocity (1W) with calculation tooltip */}
                  <div
                    style={{ position: 'relative', cursor: v1w == null ? 'default' : 'pointer' }}
                    onMouseEnter={() => v1w != null && setVsOpen(true)}
                    onMouseLeave={() => setVsOpen(false)}
                    onClick={() => { if (v1w != null) { setVsOpen((o) => !o); setWtOpen(false); } }}
                  >
                    <div style={{ fontFamily: MONO, fontSize: 20, fontWeight: 700, color: v1w == null ? '#8a94a3' : moveColor(v1w), lineHeight: 1.1, borderBottom: v1w == null ? 'none' : '1px dotted #c7cdd6' }}>{v1w == null ? 'New' : signed(v1w)}<span style={{ fontSize: 12, color: '#8a94a3', fontWeight: 600 }}> velocity</span></div>
                    {vsOpen && <VelocityTip equity={equity} align="right" />}
                  </div>
                </div>
              </div>
            </div>

            {/* coverage bar */}
            <div style={{ margin: '0 22px 4px', padding: '14px 16px', background: '#f6f8fa', border: '1px solid #eaeef2', borderRadius: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 12, letterSpacing: 0.5, color: '#8a94a3', textTransform: 'uppercase', fontWeight: 700 }}>Coverage</span>
                <span style={{ fontFamily: MONO, fontSize: 13, fontWeight: 700, color: '#0B1220' }}>{equity.easyScore} <span style={{ color: '#a4adba' }}>of {n} ETFs</span></span>
              </div>
              <div style={{ height: 8, borderRadius: 999, background: '#e6ebf0', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: 999, background: GREEN, width: coveragePct }} />
              </div>
            </div>

            {/* chart */}
            <div style={{ padding: '16px 22px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 12, letterSpacing: 0.5, color: '#8a94a3', textTransform: 'uppercase', fontWeight: 700 }}>Price</span>
                <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, color: '#0B1220' }}>{range}</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '2px 0 18px', fontFamily: MONO, fontSize: 11, color: '#a4adba' }}>
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
                    {chart.gridY.map((y, i) => <line key={i} x1="0" y1={y} x2="340" y2={y} stroke="#eef1f5" strokeWidth="1" />)}
                    <polygon points={chart.area} fill={`url(#fill-${equity.ticker})`} />
                    <polyline points={chart.points} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
                    <circle cx={chart.lastX} cy={chart.lastY} r="4" fill={stroke} stroke="#fff" strokeWidth="2" />
                  </svg>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 11, color: '#a4adba' }}>
                    {xs.map((x, i) => <span key={i}>{x}</span>)}
                  </div>
                </div>
              </div>
            </div>

            {/* timeframe toggle */}
            <div style={{ padding: '14px 22px 0', display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: 'inline-flex', gap: 2, background: '#f4f6f9', border: '1px solid #eaeef2', borderRadius: 10, padding: 3 }}>
                {RANGES.map((r) => {
                  const active = r === range;
                  return (
                    <button key={r} onClick={() => setRange(r)} style={{ fontFamily: MONO, fontSize: 12, fontWeight: active ? 700 : 600, color: active ? '#0B1220' : '#8a94a3', background: active ? '#fff' : 'transparent', padding: '6px 12px', borderRadius: 7, border: 'none', cursor: 'pointer', boxShadow: active ? '0 1px 2px rgba(11,18,32,0.08)' : 'none' }}>{r}</button>
                  );
                })}
              </div>
            </div>

            {/* footer */}
            <div style={{ padding: '16px 22px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13, color: '#a4adba' }}>Updated today</span>
              <button onClick={() => setFlipped(true)} style={{ fontSize: 14, fontWeight: 700, color: GREEN, background: 'none', border: 'none', cursor: 'pointer' }}>Flip for details →</button>
            </div>
          </>
        ) : (
          /* ── BACK ── */
          <div style={{ padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#0B1220' }}>{equity.name}</div>
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
            <div style={{ fontSize: 11, letterSpacing: 0.5, color: '#8a94a3', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>Held by ({equity.easyScore}/{n})</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
              {themeEtfs.map((etf) => {
                const held = equity.etfPresence?.[etf];
                const on = held !== undefined && held !== false;
                return (
                  <span key={etf} style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, padding: '4px 8px', borderRadius: 6, color: on ? '#0a7350' : '#a4adba', background: on ? '#e7f7f0' : '#f4f6f9', border: `1px solid ${on ? '#b8e6d3' : '#e6e9ef'}` }}>{etf}</span>
                );
              })}
            </div>

            {/* Tony note */}
            {equity.tonyNote && (
              <div style={{ background: '#f6f8fa', border: '1px solid #eaeef2', borderRadius: 12, padding: 16 }}>
                <div style={{ fontSize: 11, letterSpacing: 0.5, color: GREEN, textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>Tony&apos;s read</div>
                <p style={{ fontSize: 14, lineHeight: 1.55, color: '#55606e', margin: 0 }}>{equity.tonyNote}</p>
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
    <div style={{ background: '#f4f6f9', borderRadius: 10, padding: '11px 12px' }}>
      <div style={{ fontSize: 10, letterSpacing: 0.5, color: '#8a94a3', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
      <div style={{ fontFamily: MONO, fontSize: 15, fontWeight: 700, color: '#0B1220' }}>{value}</div>
    </div>
  );
}
