import Script from 'next/script';

/**
 * Google Analytics 4 — stockscout.io
 *
 * Loads gtag.js and configures the GA4 property. The Measurement ID can be
 * overridden via NEXT_PUBLIC_GA_ID (e.g. in Vercel); it falls back to the
 * stockscout property so tracking works out of the box.
 *
 * Only renders in production — local dev traffic never reaches GA.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? 'G-5TJR2G2PGK';

export default function GoogleAnalytics() {
  if (process.env.NODE_ENV !== 'production' || !GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
