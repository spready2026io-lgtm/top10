// Stockscout primary lockup: scope-and-crosshair glyph beside the wordmark.
// Used in every page header so the brand mark stays in sync across the site.
export default function Logo({ className = '' }: { className?: string }) {
  return (
    <h1 className={`text-xl font-bold tracking-tight flex items-center gap-2 ${className}`}>
      <svg width="22" height="22" viewBox="0 0 40 40" fill="none" aria-hidden="true" className="flex-shrink-0">
        <circle cx="20" cy="20" r="13" stroke="#34d399" strokeWidth="3.5" />
        <circle cx="20" cy="20" r="2.4" fill="#34d399" />
        <line x1="20" y1="7"  x2="20"   y2="2.5"  stroke="#34d399" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="20" y1="33" x2="20"   y2="37.5" stroke="#34d399" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="7"  y1="20" x2="2.5"  y2="20"   stroke="#34d399" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="33" y1="20" x2="37.5" y2="20"   stroke="#34d399" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
      <span><span className="text-white">stock</span><span className="text-emerald-400">scout</span></span>
    </h1>
  );
}
