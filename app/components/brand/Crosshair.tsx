/**
 * Stockscout crosshair/target mark (2026-07 redesign).
 * Green outlined circle + center dot + four N/S/E/W ticks.
 */
export default function Crosshair({ size = 26 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      <circle cx="12" cy="12" r="7" stroke="#059669" strokeWidth="2" />
      <circle cx="12" cy="12" r="1.7" fill="#059669" />
      <line x1="12" y1="1" x2="12" y2="4.5" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="19.5" x2="12" y2="23" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
      <line x1="1" y1="12" x2="4.5" y2="12" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
      <line x1="19.5" y1="12" x2="23" y2="12" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Wordmark: "stock" ink + "scout" green, weight 800. */
export function Wordmark({ size = 22 }: { size?: number }) {
  return (
    <span style={{ fontSize: size, fontWeight: 800, letterSpacing: '-0.5px', color: '#0B1220' }}>
      stock<span style={{ color: '#059669' }}>scout</span>
    </span>
  );
}
