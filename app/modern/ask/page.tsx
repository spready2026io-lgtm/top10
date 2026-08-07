'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from '@/app/components/brand/ThemeToggle';
import { trackEvent } from '@/lib/gtag';

const SUGGESTED = [
  'Which stocks have the strongest ETF consensus right now?',
  'What do active managers think about NVDA?',
  'Which ETF has the most concentrated AI conviction?',
  'Are there any stocks where managers strongly disagree?',
  'What is the weakest conviction holding in the Semiconductor theme?',
  'Which sector has the most cross-theme overlap this week?',
];

type Message = { role: 'user' | 'tony'; text: string };

export default function AskTonyPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function ask(question: string, source: 'typed' | 'suggested' = 'typed') {
    const q = question.trim();
    if (!q || loading) return;
    trackEvent('ask_tony_question', { source, question_length: q.length, question_text: q.slice(0, 100) });
    setInput('');
    setError('');
    setMessages(prev => [...prev, { role: 'user', text: q }]);
    setLoading(true);
    const startedAt = performance.now();
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ question: q, source }),
      });
      const data = await res.json();
      const latencyMs = Math.round(performance.now() - startedAt);
      if (!res.ok || data.error) {
        setError(data.error ?? 'Something went wrong.');
        trackEvent('ask_tony_error', { reason: (data.error ?? 'unknown').slice(0, 100), latency_ms: latencyMs });
      } else {
        setMessages(prev => [...prev, { role: 'tony', text: data.answer }]);
        trackEvent('ask_tony_answered', { answer_length: data.answer.length, latency_ms: latencyMs, turn: messages.length / 2 + 1 });
      }
    } catch {
      setError('Network error. Try again.');
      trackEvent('ask_tony_error', { reason: 'network_error', latency_ms: Math.round(performance.now() - startedAt) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--ss-page)] text-[var(--ss-ink)] flex flex-col">

      {/* Header */}
      <header className="border-b border-[var(--ss-border)] px-4 py-4 flex items-center justify-between">
        <Link href="/modern" className="text-[var(--ss-text)] hover:text-[var(--ss-ink)] text-sm transition-colors">
          ← Stockscout
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[var(--ss-green-tint)] border border-[var(--ss-green-tint-border)] flex items-center justify-center text-[var(--ss-green)] font-bold text-sm">
            T
          </div>
          <div>
            <div className="font-semibold text-sm leading-tight">Tony</div>
            <div className="text-xs text-[var(--ss-muted)] leading-tight">AI Equity &amp; ETF Analyst</div>
          </div>
        </div>
        <div className="w-16 flex justify-end"><ThemeToggle /></div>
      </header>

      {/* Intro (shown before first message) */}
      {messages.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--ss-green-tint)] border border-[var(--ss-green-tint-border)] flex items-center justify-center text-[var(--ss-green)] text-2xl font-bold mb-6">
            T
          </div>
          <h1 className="text-2xl font-bold mb-2">Ask Tony</h1>
          <p className="text-[var(--ss-text)] text-sm max-w-sm mb-1">
            I&apos;m not human. That&apos;s my advantage.
          </p>
          <p className="text-[var(--ss-muted)] text-xs max-w-sm mb-6">
            I cover 116 equities and 51 ETFs across 8 themes. Every answer is grounded in the latest data snapshot. No guesses. No predictions. No career risk to manage.
          </p>

          {/* Input — prominent, above suggested questions */}
          <div className="w-full max-w-xl mb-6">
            <form onSubmit={e => { e.preventDefault(); ask(input); }} autoComplete="off" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px' }}>
              <input
                type="search"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about any stock or ETF in our universe..."
                maxLength={500}
                autoFocus
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                style={{ fontSize: '16px' }} className="flex-1 min-w-0 bg-[var(--ss-card)] border border-[var(--ss-border-strong)] focus:border-[var(--ss-green)] rounded-lg px-4 py-3 text-[var(--ss-ink)] placeholder-[var(--ss-muted)] outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="shrink-0 bg-[var(--ss-green)] hover:bg-[var(--ss-green-hover)] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg px-4 py-3 text-sm font-medium transition-colors"
              >
                Ask
              </button>
            </form>
            <p className="text-[var(--ss-faint)] text-[10px] mt-2 text-center">
              For information only. Not financial advice. Updated daily.
            </p>
          </div>

          {/* Suggested questions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-xl">
            {SUGGESTED.map((q) => (
              <button
                key={q}
                onClick={() => ask(q, 'suggested')}
                className="text-left text-xs text-[var(--ss-text)] bg-[var(--ss-card)] hover:bg-[var(--ss-inset)] border border-[var(--ss-border-strong)] hover:border-[var(--ss-border-strong)] rounded-lg px-3 py-2.5 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat messages */}
      {messages.length > 0 && (
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 max-w-2xl mx-auto w-full">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {m.role === 'tony' && (
                <div className="w-7 h-7 rounded-full bg-[var(--ss-green-tint)] border border-[var(--ss-green-tint-border)] flex items-center justify-center text-[var(--ss-green)] font-bold text-xs shrink-0 mt-0.5">
                  T
                </div>
              )}
              <div
                className={`max-w-[82%] rounded-xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'bg-[var(--ss-green)] text-white'
                    : 'bg-[var(--ss-card)] border border-[var(--ss-border)] text-[var(--ss-ink)] shadow-[0_4px_14px_rgba(11,18,32,0.05)]'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-7 h-7 rounded-full bg-[var(--ss-green-tint)] border border-[var(--ss-green-tint-border)] flex items-center justify-center text-[var(--ss-green)] font-bold text-xs shrink-0 mt-0.5">
                T
              </div>
              <div className="bg-[var(--ss-card)] border border-[var(--ss-border-strong)] rounded-xl px-4 py-3">
                <div className="flex gap-1 items-center h-4">
                  <span className="w-1.5 h-1.5 bg-[var(--ss-green)] rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 bg-[var(--ss-green)] rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 bg-[var(--ss-green)] rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="text-[var(--ss-amber)] text-xs text-center py-1">{error}</div>
          )}

          <div ref={bottomRef} />
        </div>
      )}

      {/* Bottom input bar — only shown once conversation has started */}
      {messages.length > 0 && (
        <div className="border-t border-[var(--ss-border)] px-4 py-3 bg-[var(--ss-page)]">
          <div className="max-w-2xl mx-auto">
            <form
              onSubmit={e => { e.preventDefault(); ask(input); }}
              autoComplete="off"
              style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px' }}
            >
              <input
                type="search"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about any stock or ETF in our universe..."
                maxLength={500}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                className="flex-1 min-w-0 bg-[var(--ss-card)] border border-[var(--ss-border-strong)] focus:border-[var(--ss-green)] rounded-lg px-4 py-2.5 text-sm text-[var(--ss-ink)] placeholder-[var(--ss-muted)] outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="shrink-0 bg-[var(--ss-green)] hover:bg-[var(--ss-green-hover)] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
              >
                Ask
              </button>
            </form>
            <p className="text-[var(--ss-faint)] text-[10px] mt-2 text-center">
              For information only. Not financial advice. Updated daily.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
