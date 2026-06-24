import { ImageResponse } from 'next/og';

// Social share card for stockscout.io — what every link preview (X, LinkedIn,
// WhatsApp, iMessage) renders when the URL is shared. Mirrors the brand: dark
// slate field, emerald scope glyph, two-tone wordmark, "See it first." tagline.
export const alt = 'Stockscout — Top 10 stocks per theme, ranked by ETF consensus';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Scope-and-crosshair glyph (matches app/components/Logo.tsx), as a data URI so
// Satori renders it reliably.
const GLYPH = `data:image/svg+xml,${encodeURIComponent(
  `<svg width="132" height="132" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="13" stroke="#34d399" stroke-width="3.5"/>
    <circle cx="20" cy="20" r="2.4" fill="#34d399"/>
    <line x1="20" y1="7" x2="20" y2="2.5" stroke="#34d399" stroke-width="3.5" stroke-linecap="round"/>
    <line x1="20" y1="33" x2="20" y2="37.5" stroke="#34d399" stroke-width="3.5" stroke-linecap="round"/>
    <line x1="7" y1="20" x2="2.5" y2="20" stroke="#34d399" stroke-width="3.5" stroke-linecap="round"/>
    <line x1="33" y1="20" x2="37.5" y2="20" stroke="#34d399" stroke-width="3.5" stroke-linecap="round"/>
  </svg>`,
)}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background:
            'radial-gradient(1200px 600px at 80% -10%, rgba(16,185,129,0.18), transparent 60%), #020617',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Brand lockup */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={GLYPH} width={108} height={108} alt="" />
          <div style={{ display: 'flex', fontSize: 64, fontWeight: 800, letterSpacing: -1 }}>
            <span style={{ color: '#ffffff' }}>stock</span>
            <span style={{ color: '#34d399' }}>scout</span>
          </div>
        </div>

        {/* Value proposition */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              color: '#6ee7b7',
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 6,
              textTransform: 'uppercase',
              marginBottom: 24,
            }}
          >
            See it first.
          </div>
          <div style={{ color: '#f8fafc', fontSize: 68, fontWeight: 800, lineHeight: 1.08, letterSpacing: -1.5 }}>
            Top 10 stocks per theme,
          </div>
          <div style={{ color: '#f8fafc', fontSize: 68, fontWeight: 800, lineHeight: 1.08, letterSpacing: -1.5 }}>
            ranked by ETF consensus.
          </div>
          <div style={{ color: '#94a3b8', fontSize: 32, fontWeight: 500, marginTop: 22 }}>
            See which names active managers actually back.
          </div>
        </div>

        {/* Trust strip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: '#64748b', fontSize: 26, fontWeight: 600 }}>
          <span style={{ color: '#34d399' }}>stockscout.io</span>
          <span>•</span>
          <span>Free. No login. Updated daily.</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
