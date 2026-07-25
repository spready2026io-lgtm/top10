'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/gtag';

type Status = 'idle' | 'sending' | 'done' | 'error';

/**
 * Landing newsletter form — dark-band styling to match the redesign hero band.
 * Same POST /api/subscribe + GA4 `subscribe` conversion as EmailCapture, but
 * styled for the ink-gradient band instead of the dark app chrome.
 */
export default function NewsletterSignup({ source = 'landing' }: { source?: string }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [msg, setMsg] = useState('');
  const done = status === 'done';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'sending' || done) return;
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
      setMsg('Network error. Please try again.');
    }
  }

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={done}
          placeholder="you@example.com"
          aria-label="Your email"
          style={{
            width: 280,
            maxWidth: '100%',
            height: 52,
            padding: '0 18px',
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.16)',
            background: 'rgba(255,255,255,0.06)',
            color: '#fff',
            fontSize: 15,
            fontFamily: 'inherit',
          }}
        />
        <button
          type="submit"
          disabled={status === 'sending' || done}
          style={{
            height: 52,
            display: 'inline-flex',
            alignItems: 'center',
            fontSize: 15,
            fontWeight: 700,
            color: '#04120c',
            background: '#34D399',
            padding: '0 24px',
            borderRadius: 12,
            border: 'none',
            cursor: done ? 'default' : 'pointer',
            opacity: status === 'sending' ? 0.7 : 1,
            whiteSpace: 'nowrap',
          }}
        >
          {status === 'sending' ? 'Sending…' : done ? 'Subscribed ✓' : 'Get the note'}
        </button>
      </form>
      {msg && (
        <p style={{ fontSize: 13, marginTop: 10, color: status === 'error' ? '#fca5a5' : '#6ee7b7' }}>{msg}</p>
      )}
    </div>
  );
}
