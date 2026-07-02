'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/gtag';

/**
 * Persistent "Ask Tony" help entry point, fixed on every page except /ask
 * itself. Icon + label so it reads as a help/chat affordance for any
 * question about the site, not just a nav link.
 */
export default function AskTonyButton() {
  const pathname = usePathname();
  if (pathname === '/ask') return null;

  return (
    <Link
      href="/ask"
      onClick={() => trackEvent('ask_tony_fab_click', { path: pathname })}
      aria-label="Ask Tony — help with anything on Stockscout"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 pl-3 pr-4 py-2.5 shadow-lg shadow-emerald-500/25 active:scale-95 transition-all"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
      </svg>
      <span className="text-sm font-semibold whitespace-nowrap">Ask Tony</span>
    </Link>
  );
}
