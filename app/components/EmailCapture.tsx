'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/gtag';

type Status = 'idle' | 'sending' | 'done' | 'error';

/**
 * Weekly conviction-note signup. Two looks:
 *   variant="band"   full-width banded CTA, sits above the footer on the home page
 *   variant="inline" slim single-line version for embedding inside another section
 *
 * On success it fires the GA4 `subscribe` event (source-tagged). That event is
 * the primary conversion the paid-search test optimises toward, so the source
 * label matters: it tells us which surface a captured email came from.
 */
export default function EmailCapture({
  variant = 'band',
  source = 'home',
}: {
  variant?: 'band' | 'inline';
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
          One email a week from Tony. The names gaining conviction across 40 actively managed funds, before the crowd notices. No spam, unsubscribe anytime.
        </p>
        <div className="max-w-md mx-auto">
          {form}
          {note}
        </div>
      </div>
    </section>
  );
}
