'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/gtag';

/**
 * Persistent "Ask Tony" help entry point, fixed on every page except /ask
 * itself. Compact round icon button; the "Ask Tony" label surfaces as a
 * hover tooltip so it stays out of the way while still being discoverable.
 */
export default function AskTonyButton() {
  const pathname = usePathname();
  if (pathname === '/ask') return null;

  return (
    <Link
      href="/ask"
      onClick={() => trackEvent('ask_tony_fab_click', { path: pathname })}
      aria-label="Ask Tony — help with anything on Stockscout"
      title="Ask Tony"
      className="group fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25 active:scale-95 transition-all"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-6 w-6 shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
      </svg>
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs font-semibold text-slate-100 opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
        Ask Tony
      </span>
    </Link>
  );
}
