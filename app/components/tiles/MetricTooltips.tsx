'use client';

import { moveColor, signed, MONO, GREEN, type Equity } from './tileUtils';

// ── Shared styled popover primitives (light) ─────────────────────────────────
export function Tip({ children, align = 'right', width = 210 }: { children: React.ReactNode; align?: 'left' | 'right'; width?: number }) {
  return (
    <div
      style={{
        position: 'absolute', top: '100%', [align]: 0, marginTop: 6, zIndex: 70,
        width, textAlign: 'left', background: '#fff', border: '1px solid #e6e9ef',
        borderRadius: 12, padding: '12px 14px', boxShadow: '0 16px 36px rgba(11,18,32,0.16)',
        pointerEvents: 'none', // purely informational — never steals hover
      }}
    >
      {children}
    </div>
  );
}
function TipTitle({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.4, color: '#8a94a3', textTransform: 'uppercase', margin: '0 0 8px' }}>{children}</p>;
}
function TipRule() {
  return <div style={{ borderTop: '1px solid #eef1f5', margin: '8px 0 6px' }} />;
}
function Row({ l, r, mono, rColor = '#0B1220' }: { l: string; r: string; mono?: boolean; rColor?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
      <span style={{ fontSize: 12, color: '#55606e', fontFamily: mono ? MONO : undefined, fontWeight: mono ? 700 : 400 }}>{l}</span>
      <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, color: rColor }}>{r}</span>
    </div>
  );
}

// ── Avg-Wt (Weight Score) breakdown ──────────────────────────────────────────
export function AvgWtTip({ equity, themeEtfs, align = 'right' }: { equity: Equity; themeEtfs: string[]; align?: 'left' | 'right' }) {
  const held = themeEtfs
    .map((e) => ({ etf: e, w: equity.etfPresence?.[e] }))
    .filter((x): x is { etf: string; w: number } => typeof x.w === 'number' && x.w !== 0);
  const coveragePct = `${Math.round(equity.coverage * 100)}%`;
  return (
    <Tip align={align}>
      <TipTitle>ETF weight breakdown</TipTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 168, overflowY: 'auto' }}>
        {held.map(({ etf, w }) => (
          <Row key={etf} l={etf} r={`${w.toFixed(1)}%`} mono rColor={GREEN} />
        ))}
      </div>
      <TipRule />
      <Row l="Avg weight" r={`${equity.avgWeight?.toFixed(2) ?? '—'}%`} rColor={GREEN} />
      <Row l="Coverage" r={coveragePct} />
      <Row l="Coverage coeff" r={`×${equity.coverage.toFixed(2)}`} />
      <p style={{ fontSize: 11, color: '#8a94a3', margin: '6px 0 0' }}>Weight Score = avg weight × coverage</p>
    </Tip>
  );
}

// ── Velocity (1W) calculation ────────────────────────────────────────────────
export function VelocityTip({ equity, align = 'right' }: { equity: Equity; align?: 'left' | 'right' }) {
  const v1w = equity.velocityScore?.['1W'] ?? null;
  if (v1w == null) {
    return (
      <Tip align={align} width={190}>
        <TipTitle>Velocity Score</TipTitle>
        <p style={{ fontSize: 12, color: '#55606e', margin: 0 }}>No 1-week history yet — new to the ranking. It populates as conviction history accrues.</p>
      </Tip>
    );
  }
  const now = equity.proScore;
  const then = now / (1 + v1w / 100);
  return (
    <Tip align={align}>
      <TipTitle>Velocity Score · 1W window</TipTitle>
      <Row l="Weight Score now" r={`${now.toFixed(2)}%`} />
      <Row l="Weight Score 1W ago" r={`${then.toFixed(2)}%`} />
      <TipRule />
      <Row l="Change" r={signed(v1w)} rColor={moveColor(v1w)} />
      <p style={{ fontSize: 11, color: '#8a94a3', margin: '6px 0 0' }}>Velocity = (now ÷ then − 1) × 100</p>
    </Tip>
  );
}
