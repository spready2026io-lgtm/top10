'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/gtag';
import { computeManagers } from '@/lib/conviction';

// Derived live from the data (same source the Conviction Board counts), so the
// copy always matches the site and never goes stale when funds are added/removed.
const FUND_COUNT = computeManagers().length;

type Status = 'idle' | 'sending' | 'done' | 'error';

/**
 * Weekly conviction-note signup. Three looks:
 *   variant="bar"    slim full-width strip for high placement (above the board)
 *   variant="band"   full banded CTA (used low on the home page)
 *   variant="inline" bare form for embedding inside another section
 *
 * On success it fires the GA4 `subscribe` event (source-tagged). That event is
 * the primary conversion the paid-search test optimises toward, so the source
 * label matters: it tells us which surface a captured email came from.
 */
export default function EmailCapture({
  variant = 'band',
  source = 'home',
}: {
  variant?: 'bar' | 'band' | 'inline';
  source?: string;
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [msg, setMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    setMsg('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus('done');
        setMsg(data.alreadySubscribed ? 'You are already on the list.' : 'You are on the list. See it first.');
        trackEvent('subscribe', { source });
      } else {
        setStatus('error');
        setMsg(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMsg('Network error. Please check your connection and try again.');
    }
  }

  const done = status === 'done';

  // ── Shared form body ────────────────────────────────────────────────────────
  const form = (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 w-full">
      <input
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        disabled={done}
        placeholder="you@example.com"
        aria-label="Your email"
        className="flex-1 min-w-0 rounded-lg border border-slate-700 bg-slate-800 text-white placeholder-slate-500
                   px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50
                   transition-colors disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={status === 'sending' || done}
        className="shrink-0 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-800 disabled:text-emerald-600
                   text-black font-semibold text-sm px-6 py-2.5 rounded-full transition-colors whitespace-nowrap"
      >
        {status === 'sending' ? 'Sending…' : done ? 'Subscribed ✓' : 'Get the note'}
      </button>
    </form>
  );

  const note = msg && (
    <p className={`text-xs mt-2 ${status === 'error' ? 'text-rose-400' : 'text-emerald-400'}`}>{msg}</p>
  );

  // ── Bar variant — slim, high on the page so everyone sees it ─────────────────
  if (variant === 'bar') {
    return (
      <section className="border-b border-slate-800 bg-emerald-500/[0.06]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-2.5">
          <p className="text-sm leading-snug min-w-0">
            <span className="text-emerald-400 font-semibold">Get Tony&apos;s weekly conviction note.</span>{' '}
            <span className="text-slate-400">The stocks gaining conviction across {FUND_COUNT} funds, plus world-market flows.</span>
          </p>
          <div className="sm:ml-auto w-full sm:w-auto sm:min-w-[21rem]">
            {form}
            {note}
          </div>
        </div>
      </section>
    );
  }

  // ── Inline variant ──────────────────────────────────────────────────────────
  if (variant === 'inline') {
    return (
      <div className="w-full">
        {form}
        {note}
      </div>
    );
  }

  // ── Banded variant (default) ────────────────────────────────────────────────
  return (
    <section className="border-t border-slate-800 bg-slate-900/40 px-4 py-10">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-2">The weekly conviction note</p>
        <h2 className="text-white font-bold text-xl sm:text-2xl mb-2">
          See which stocks the top managers are backing.
        </h2>
        <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-lg mx-auto">
          One email a week from Tony. The names gaining conviction across {FUND_COUNT} actively managed funds, plus where global money is flowing across world markets. Before the crowd notices. No spam, unsubscribe anytime.
        </p>
        <div className="max-w-md mx-auto">
          {form}
          {note}
        </div>
      </div>
    </section>
  );
}
