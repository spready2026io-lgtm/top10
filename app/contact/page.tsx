'use client';

import { useState } from 'react';
import Link from 'next/link';
import SiteNav from '@/app/components/brand/SiteNav';
import SiteFooter from '@/app/components/brand/SiteFooter';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const inputCls =
  'w-full rounded-xl border border-[#d7dce3] bg-white text-[#0B1220] placeholder-[#98a2b0] ' +
  'px-4 py-2.5 text-sm focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]/40 transition-colors';

export default function ContactPage() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '21931e21-1b54-4be3-a6fc-cf86445bc572',
          from_name: 'Stockscout Contact',
          replyto: email,
          subject: `[Stockscout Contact] ${subject}`,
          message: `From: ${email}\n\n${message}`,
        }),
      });
      const data = await res.json();
      if (data.success) setStatus('sent');
      else { setErrorMsg(data.message || 'Something went wrong. Please try again.'); setStatus('error'); }
    } catch {
      setErrorMsg('Network error — please check your connection and try again.');
      setStatus('error');
    }
  }

  return (
    <main className="min-h-screen" style={{ background: '#F7F8FB', color: '#0B1220' }}>
      <SiteNav />

      <div className="max-w-lg mx-auto px-4 py-16">
        {status === 'sent' ? (
          <div className="rounded-2xl border p-8 text-center" style={{ borderColor: '#b8e6d3', background: '#e7f7f0' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(5,150,105,0.14)' }}>
              <svg className="w-7 h-7" style={{ color: '#059669' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-bold text-lg mb-2" style={{ color: '#0B1220' }}>Message sent!</h2>
            <p className="text-sm mb-6" style={{ color: '#55606e' }}>
              Thanks for reaching out. We&apos;ll get back to you at <span style={{ color: '#0B1220', fontWeight: 600 }}>{email}</span>.
            </p>
            <Link href="/" className="inline-block font-semibold text-sm px-6 py-2.5 rounded-full text-white" style={{ background: '#059669' }}>
              Back to Stockscout →
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: '#059669', fontFamily: 'var(--font-mono-brand), monospace' }}>Contact</p>
              <h2 className="text-3xl font-extrabold mb-2" style={{ color: '#0B1220', letterSpacing: '-1px' }}>Get in touch</h2>
              <p className="text-sm leading-relaxed" style={{ color: '#55606e' }}>
                Questions about the data, ETF suggestions, stock requests, or anything else — we&apos;d love to hear from you.
              </p>
            </div>

            {status === 'error' && (
              <div className="rounded-lg border px-4 py-3 text-sm mb-6 flex items-start gap-2" style={{ borderColor: '#f0d9a8', background: '#fcf3e1', color: '#a06a12' }}>
                <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <Field id="email" label="Your email">
                <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputCls} />
              </Field>
              <Field id="subject" label="Subject">
                <input id="subject" type="text" required value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. ETF suggestion, data question…" className={inputCls} />
              </Field>
              <Field id="message" label="Message">
                <textarea id="message" required rows={6} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your message…" className={`${inputCls} resize-none`} />
              </Field>
              <button type="submit" disabled={status === 'sending'} className="w-full text-white font-semibold text-sm py-3 rounded-full transition-colors disabled:opacity-60" style={{ background: '#059669' }}>
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
            </form>
          </>
        )}
      </div>

      <SiteFooter />
    </main>
  );
}

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1.5" style={{ color: '#55606e' }}>
        {label} <span style={{ color: '#c2743a' }}>*</span>
      </label>
      {children}
    </div>
  );
}
