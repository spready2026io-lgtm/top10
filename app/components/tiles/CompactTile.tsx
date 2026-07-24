'use client';

import { conviction, homeSector, moveColor, signed, MONO, type Equity } from './tileUtils';

/**
 * Compact conviction tile (theme-grid variant, light redesign).
 * Click opens the ExpandedTile.
 */
export default function CompactTile({
  equity,
  rank,
  n,
  onOpen,
}: {
  equity: Equity;
  rank: number;
  n: number; // ETF denominator for this theme
  onOpen: () => void;
}) {
  const conv = conviction(equity.coverage);
  const cov = `${equity.easyScore}/${n}`;
  const vel = equity.velocityScore?.['1W'];
  const sector = homeSector(equity.ticker) ?? '';
  const rank1 = rank === 1;

  return (
    <button
      onClick={onOpen}
      style={{
        textAlign: 'left',
        width: '100%',
        background: '#fff',
        border: '1px solid #e6e9ef',
        borderRadius: 16,
        padding: 20,
        boxShadow: '0 8px 22px rgba(11,18,32,0.05)',
        cursor: 'pointer',
        transition: 'box-shadow .15s, transform .15s, border-color .15s',
        font: 'inherit',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 14px 32px rgba(11,18,32,0.10)';
        e.currentTarget.style.borderColor = '#d7dce3';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 22px rgba(11,18,32,0.05)';
        e.currentTarget.style.borderColor = '#e6e9ef';
      }}
    >
      {/* top row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 26, height: 26, padding: '0 8px', borderRadius: 8, background: rank1 ? '#e7f7f0' : '#eef1f5', color: rank1 ? '#059669' : '#5b6675', fontFamily: MONO, fontWeight: 700, fontSize: 13 }}>{rank}</span>
          <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, color: '#8a94a3' }}>{cov} ETFs</span>
        </div>
        <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, letterSpacing: 0.4, color: conv.color, background: conv.bg, padding: '4px 10px', borderRadius: 6 }}>{conv.label}</span>
      </div>

      {/* identity + price */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
          <div style={{ width: 40, height: 40, borderRadius: 11, background: '#eef2f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontWeight: 700, fontSize: 12, color: '#3f4a58', flexShrink: 0 }}>{equity.ticker}</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#0B1220', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{equity.name}</div>
            <div style={{ fontSize: 13, color: '#8a94a3' }}>{equity.ticker} · {sector}</div>
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 700, color: '#0B1220' }}>${equity.price.toFixed(2)}</div>
          <div style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, color: moveColor(equity.weeklyChange) }}>{signed(equity.weeklyChange)} 1W</div>
        </div>
      </div>

      {/* insets */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        <Inset label="Coverage" value={cov} title={`Held by ${equity.easyScore} of ${n} ETFs in this theme (${Math.round(equity.coverage * 100)}%)`} />
        <Inset label="Avg wt" value={`${equity.proScore.toFixed(1)}%`} title={`Weight Score = avg weight (${equity.avgWeight?.toFixed(2) ?? '—'}%) × coverage (${equity.coverage.toFixed(2)}). Tap the tile for the full breakdown.`} />
        <Inset label="Velocity" value={vel == null ? 'New' : signed(vel)} color={vel == null ? '#8a94a3' : moveColor(vel)} title={vel == null ? 'No 1-week history yet — new to the ranking.' : 'Velocity = (Weight Score now ÷ 1 week ago − 1) × 100. Tap the tile for the calculation.'} />
      </div>
    </button>
  );
}

function Inset({ label, value, color = '#0B1220', title }: { label: string; value: string; color?: string; title?: string }) {
  return (
    <div title={title} style={{ background: '#f4f6f9', borderRadius: 10, padding: '11px 12px', cursor: title ? 'help' : undefined }}>
      <div style={{ fontSize: 10, letterSpacing: 0.5, color: '#8a94a3', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
      <div style={{ fontFamily: MONO, fontSize: 15, fontWeight: 700, color }}>{value}</div>
    </div>
  );
}
