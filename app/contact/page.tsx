'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from '@/app/components/Logo';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactPage() {
  const [email,   setEmail]   = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status,  setStatus]  = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '21931e21-1b54-4be3-a6fc-cf86445bc572',
          from_name:  'Stockscout Contact',
          replyto:    email,
          subject:    `[Stockscout Contact] ${subject}`,
          message:    `From: ${email}\n\n${message}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('sent');
      } else {
        setErrorMsg(data.message || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error — please check your connection and try again.');
      setStatus('error');
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Header — brand bar matching the home page */}
      <header className="border-b border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/" aria-label="Stockscout home">
              <Logo />
            </Link>
            <span className="hidden sm:inline text-emerald-300 text-sm font-medium tracking-[0.18em] uppercase whitespace-nowrap">See it first.</span>
          </div>
          <nav className="flex items-center gap-5 text-sm flex-shrink-0">
            <Link href="/universe" className="text-slate-400 hover:text-white transition-colors">Universe</Link>
            <Link href="/about" className="text-slate-400 hover:text-white transition-colors">About</Link>
            <Link href="/contact" className="text-emerald-400 font-medium">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Form */}
      <div className="max-w-lg mx-auto px-4 py-16">
        {status === 'sent' ? (
          <div className="rounded-xl border border-emerald-800 bg-emerald-950/40 p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-white font-semibold text-lg mb-2">Message sent!</h2>
            <p className="text-slate-400 text-sm mb-6">
              Thanks for reaching out. We&apos;ll get back to you at <span className="text-slate-300">{email}</span>.
            </p>
            <Link href="/" className="inline-block bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm px-6 py-2.5 rounded-full transition-colors">
              Back to Stockscout →
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-2">Contact</p>
              <h2 className="text-2xl font-bold text-white mb-2">Get in touch</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Questions about the data, ETF suggestions, stock requests, or anything else — we&apos;d love to hear from you.
              </p>
            </div>

            {status === 'error' && (
              <div className="rounded-lg border border-red-700 bg-red-950/60 px-4 py-3 text-red-300 text-sm mb-6 flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-slate-300 text-sm font-medium mb-1.5">
                  Your email <span className="text-red-400">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 text-white placeholder-slate-500
                             px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50
                             transition-colors"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-slate-300 text-sm font-medium mb-1.5">
                  Subject <span className="text-red-400">*</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  placeholder="e.g. ETF suggestion, data question…"
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 text-white placeholder-slate-500
                             px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50
                             transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-slate-300 text-sm font-medium mb-1.5">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Your message…"
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 text-white placeholder-slate-500
                             px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50
                             transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-800 disabled:text-emerald-600
                           text-black font-semibold text-sm py-3 rounded-full transition-colors"
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
