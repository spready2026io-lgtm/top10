'use client';

import { useState } from 'react';
import { logoUrl } from '@/lib/logos';

/**
 * Company logo avatar. Shows the real favicon (Google favicon API) when we have
 * a domain for the ticker; falls back to the lettermark on missing domain or a
 * failed image load.
 */
export default function StockAvatar({
  ticker,
  size = 40,
  radius = 11,
  bg = 'var(--ss-avatar-bg)',
  textColor = 'var(--ss-text)',
  fontSize = 12,
}: {
  ticker: string;
  size?: number;
  radius?: number;
  bg?: string;
  textColor?: string;
  fontSize?: number;
}) {
  const [failed, setFailed] = useState(false);
  const url = logoUrl(ticker);
  const showImg = url && !failed;

  return (
    <div
      style={{
        width: size, height: size, borderRadius: radius, background: bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, overflow: 'hidden',
      }}
      aria-hidden
    >
      {showImg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt=""
          width={Math.round(size * 0.62)}
          height={Math.round(size * 0.62)}
          loading="lazy"
          onError={() => setFailed(true)}
          style={{ display: 'block', borderRadius: 4 }}
        />
      ) : (
        <span style={{ fontFamily: 'var(--font-mono-brand), monospace', fontWeight: 700, fontSize, color: textColor }}>{ticker}</span>
      )}
    </div>
  );
}
