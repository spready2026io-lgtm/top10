'use client';

import { useState } from 'react';
import { MONO, GREEN } from './tileUtils';
import {
  INDEX_CHART_DATA,
  ETF_RETURNS,
  ETF_DAY_CHANGE,
  ETF_INFO,
  ETF_TOP_HOLDINGS,
  THEME_ETFS,
  THEME_ETF_COUNT,
  type Theme,
  type ChartPeriod,
} from '@/lib/data';

const SPY_BLUE = 'var(--ss-blue)';
const AMBER = 'var(--ss-amber)';
const RANGES: ChartPeriod[] = ['1D', '1W', '1M', 'YTD', '6M', '1Y'];

/**
 * Theme performance block (light redesign) — ported from the classic dashboard:
 * a Top-10-vs-S&P500 chart + the theme's ETFs ranked by return, sharing one
 * period toggle ("synced with chart timeframe").
 */
export default function ThemePerformance({ theme }: { theme: Theme }) {
  const [period, setPeriod] = useState<ChartPeriod>('1W');
  const has1D = !!INDEX_CHART_DATA[theme]['1D'];
  const p: ChartPeriod = period === '1D' && !has1D ? '1W' : period;
  const d = INDEX_CHART_DATA[theme][p] ?? INDEX_CHART_DATA[theme]['1W'];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.5fr) minmax(0,1fr)', gap: 18 }} className="ss-perf-grid">
      <PerfChart theme={theme} d={d} period={period} setPeriod={setPeriod} />
      <EtfPanel theme={theme} period={p} />
    </div>
  );
}

// ── Top10 vs S&P 500 chart ────────────────────────────────────────────────────
function PerfChart({ theme, d, period, setPeriod }: { theme: Theme; d: { top10: number[]; spy: number[]; top10Return: number; spyReturn: number; xLabels: string[] }; period: ChartPeriod; setPeriod: (p: ChartPeriod) => void }) {
  const VW = 800, VH = 260, padL = 52, padR = 20, padT = 12, padB = 30;
  const chartW = VW - padL - padR, chartH = VH - padT - padB;
  const all = [...d.top10, ...d.spy];
  const rawMin = Math.min(...all), rawMax = Math.max(...all);
  const pad = Math.max((rawMax - rawMin) * 0.12, 0.8);
  const yMin = rawMin - pad, yMax = rawMax + pad, yRange = yMax - yMin;
  const toX = (i: number, n: number) => padL + (i / (n - 1)) * chartW;
  const toY = (v: number) => padT + chartH - ((v - yMin) / yRange) * chartH;
  const line = (pts: number[]) => pts.map((v, i) => `${toX(i, pts.length).toFixed(1)},${toY(v).toFixed(1)}`).join(' ');
  const yTicks = Array.from({ length: 4 }, (_, i) => yMin + (yRange / 3) * i);
  const fmtY = (v: number) => { const pct = v - 100; return `${pct > 0 ? '+' : ''}${pct.toFixed(pct === 0 ? 0 : 1)}%`; };
  const delta = d.top10Return - d.spyReturn;
  const deltaPos = delta >= 0;
  const zeroInRange = yMin <= 100 && yMax >= 100;
  const xl = d.xLabels;

  return (
    <div style={{ background: 'var(--ss-card)', border: '1px solid var(--ss-border)', borderRadius: 16, padding: '16px 18px', boxShadow: '0 8px 22px rgba(11,18,32,0.05)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--ss-ink)' }}>{theme} Top 10 vs S&amp;P 500</span>
        <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 999, color: deltaPos ? 'var(--ss-green-text)' : AMBER, background: deltaPos ? 'var(--ss-green-tint)' : 'var(--ss-amber-bg)', border: `1px solid ${deltaPos ? 'var(--ss-green-tint-border)' : 'var(--ss-amber-border)'}` }}>
          {deltaPos ? '▲' : '▼'} {Math.abs(delta).toFixed(1)}% vs index
        </span>
      </div>

      <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" style={{ display: 'block' }}>
        {yTicks.map((t, i) => <line key={i} x1={padL} y1={toY(t)} x2={VW - padR} y2={toY(t)} stroke="var(--ss-track)" strokeWidth="1" />)}
        {zeroInRange && <line x1={padL} y1={toY(100)} x2={VW - padR} y2={toY(100)} stroke="var(--ss-border-strong)" strokeWidth="1.5" strokeDasharray="5 3" />}
        {yTicks.map((t, i) => <text key={`l${i}`} x={padL - 8} y={toY(t) + 3} textAnchor="end" fontSize="11" fill="var(--ss-faint)" fontFamily="var(--font-mono-brand), monospace">{fmtY(t)}</text>)}
        <polyline points={line(d.spy)} fill="none" stroke={SPY_BLUE} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        <polyline points={line(d.top10)} fill="none" stroke={GREEN} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx={toX(d.top10.length - 1, d.top10.length)} cy={toY(d.top10[d.top10.length - 1])} r="4" fill={GREEN} stroke="var(--ss-card)" strokeWidth="2" />
        {xl.map((lab, i) => <text key={`x${i}`} x={padL + (i / (xl.length - 1)) * chartW} y={VH - 8} textAnchor="middle" fontSize="11" fill="var(--ss-faint)">{lab}</text>)}
      </svg>

      {/* period toggle */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
        <div style={{ display: 'inline-flex', gap: 2, background: 'var(--ss-inset)', border: '1px solid var(--ss-track)', borderRadius: 10, padding: 3 }}>
          {RANGES.map((r) => {
            const active = r === period;
            return <button key={r} onClick={() => setPeriod(r)} style={{ fontFamily: MONO, fontSize: 12, fontWeight: active ? 700 : 600, color: active ? 'var(--ss-ink)' : 'var(--ss-muted)', background: active ? 'var(--ss-card)' : 'transparent', padding: '6px 12px', borderRadius: 7, border: 'none', cursor: 'pointer', boxShadow: active ? '0 1px 2px rgba(11,18,32,0.08)' : 'none' }}>{r}</button>;
          })}
        </div>
      </div>

      {/* legend */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 10, flexWrap: 'wrap' }}>
        <Legend color={GREEN} label="Top 10" value={d.top10Return} />
        <Legend color={SPY_BLUE} label="S&P 500" value={d.spyReturn} />
        <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--ss-faint)' }}>indicative</span>
      </div>
    </div>
  );
}

function Legend({ color, label, value }: { color: string; label: string; value: number }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13, color: 'var(--ss-text)' }}>
      <span style={{ width: 14, height: 3, borderRadius: 2, background: color }} />
      {label} <span style={{ fontFamily: MONO, fontWeight: 700, color: value >= 0 ? GREEN : AMBER }}>{value >= 0 ? '+' : ''}{value.toFixed(1)}%</span>
    </span>
  );
}

// ── Theme ETFs ranked by return ───────────────────────────────────────────────
function EtfPanel({ theme, period }: { theme: Theme; period: ChartPeriod }) {
  const [showAll, setShowAll] = useState(false);
  const [openEtf, setOpenEtf] = useState<string | null>(null);
  const n = THEME_ETF_COUNT[theme];
  const rows = THEME_ETFS[theme]
    .map((ticker) => ({ ticker, ret: period === '1D' ? (ETF_DAY_CHANGE[ticker] ?? 0) : (ETF_RETURNS[ticker]?.[period as Exclude<ChartPeriod, '1D'>] ?? 0) }))
    .sort((a, b) => b.ret - a.ret);
  const maxAbs = Math.max(...rows.map((r) => Math.abs(r.ret)), 0.1);
  const visible = showAll ? rows : rows.slice(0, 4);

  return (
    <div style={{ background: 'var(--ss-card)', border: '1px solid var(--ss-border)', borderRadius: 16, padding: '16px 18px', boxShadow: '0 8px 22px rgba(11,18,32,0.05)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ss-ink)' }}>{theme} ETFs</div>
        <div style={{ fontSize: 12, color: 'var(--ss-muted)', marginTop: 3, display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap' }}>
          {n} tracked · Ranked by
          <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, color: 'var(--ss-green-text)', background: 'var(--ss-green-tint)', border: '1px solid var(--ss-green-tint-border)', padding: '1px 6px', borderRadius: 5 }}>{period}</span>
          return
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {visible.map(({ ticker, ret }) => {
          const pos = ret >= 0;
          const info = ETF_INFO[ticker];
          const holdings = ETF_TOP_HOLDINGS[ticker] ?? [];
          const open = openEtf === ticker;
          return (
            <div
              key={ticker}
              style={{ position: 'relative', cursor: holdings.length ? 'pointer' : 'default', userSelect: 'none' }}
              onPointerEnter={(e) => { if (e.pointerType === 'mouse') setOpenEtf(ticker); }}
              onPointerLeave={(e) => { if (e.pointerType === 'mouse') setOpenEtf(null); }}
              onClick={() => setOpenEtf((prev) => (prev === ticker ? null : ticker))}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
                <span style={{ fontFamily: MONO, fontSize: 13, fontWeight: 700, color: 'var(--ss-ink)', borderBottom: holdings.length ? `1px dotted ${open ? 'var(--ss-green)' : 'var(--ss-border-strong)'}` : 'none' }}>{ticker}</span>
                <span style={{ fontFamily: MONO, fontSize: 13, fontWeight: 700, color: pos ? GREEN : AMBER }}>{pos ? '+' : ''}{ret.toFixed(1)}%</span>
              </div>
              {info && (
                <div style={{ fontSize: 11, color: 'var(--ss-muted)', marginBottom: 5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {info.name}{info.manager ? ` (${info.manager.split(' ')[0]})` : ''}
                </div>
              )}
              <div style={{ height: 6, background: 'var(--ss-track)', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: 999, background: pos ? 'rgba(5,150,105,0.5)' : 'rgba(194,116,58,0.5)', width: `${(Math.abs(ret) / maxAbs) * 100}%` }} />
              </div>

              {/* Top-holdings tooltip — floats over the row, never reflows the list */}
              {open && holdings.length > 0 && (
                <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: 4, zIndex: 30, width: 150, background: 'var(--ss-card)', border: '1px solid var(--ss-border)', borderRadius: 10, padding: '10px 12px', boxShadow: '0 12px 28px rgba(11,18,32,0.14)' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, color: 'var(--ss-muted)', textTransform: 'uppercase', marginBottom: 7 }}>Top holdings</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {holdings.map((h) => (
                      <div key={h.t} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
                        <span style={{ fontFamily: MONO, color: 'var(--ss-ink)', fontWeight: 600 }}>{h.t}</span>
                        <span style={{ fontFamily: MONO, color: 'var(--ss-muted)' }}>{h.w.toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {rows.length > 4 && (
        <button onClick={() => setShowAll((v) => !v)} style={{ marginTop: 12, fontSize: 12, fontWeight: 600, color: 'var(--ss-muted)', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'center' }}>
          {showAll ? '▲ Show less' : `▼ Show all ${rows.length} ETFs`}
        </button>
      )}
    </div>
  );
}
