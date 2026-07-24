'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
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
    <div className="min-h-screen bg-[#F7F8FB] text-[#0B1220] flex flex-col">

      {/* Header */}
      <header className="border-b border-[#e6e9ef] px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-[#55606e] hover:text-[#0B1220] text-sm transition-colors">
          ← Stockscout
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#e7f7f0] border border-[#b8e6d3] flex items-center justify-center text-[#059669] font-bold text-sm">
            T
          </div>
          <div>
            <div className="font-semibold text-sm leading-tight">Tony</div>
            <div className="text-xs text-[#8a94a3] leading-tight">AI Equity &amp; ETF Analyst</div>
          </div>
        </div>
        <div className="w-16" />
      </header>

      {/* Intro (shown before first message) */}
      {messages.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 text-center">
          <div className="w-16 h-16 rounded-full bg-[#e7f7f0] border border-[#b8e6d3] flex items-center justify-center text-[#059669] text-2xl font-bold mb-6">
            T
          </div>
          <h1 className="text-2xl font-bold mb-2">Ask Tony</h1>
          <p className="text-[#55606e] text-sm max-w-sm mb-1">
            I&apos;m not human. That&apos;s my advantage.
          </p>
          <p className="text-[#8a94a3] text-xs max-w-sm mb-6">
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
                style={{ fontSize: '16px' }} className="flex-1 min-w-0 bg-white border border-[#d7dce3] focus:border-[#059669] rounded-lg px-4 py-3 text-[#0B1220] placeholder-[#98a2b0] outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="shrink-0 bg-[#059669] hover:bg-[#047857] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg px-4 py-3 text-sm font-medium transition-colors"
              >
                Ask
              </button>
            </form>
            <p className="text-[#a4adba] text-[10px] mt-2 text-center">
              For information only. Not financial advice. Updated daily.
            </p>
          </div>

          {/* Suggested questions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-xl">
            {SUGGESTED.map((q) => (
              <button
                key={q}
                onClick={() => ask(q, 'suggested')}
                className="text-left text-xs text-[#55606e] bg-white hover:bg-[#f4f6f9] border border-[#d7dce3] hover:border-[#b3bcc7] rounded-lg px-3 py-2.5 transition-colors"
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
                <div className="w-7 h-7 rounded-full bg-[#e7f7f0] border border-[#b8e6d3] flex items-center justify-center text-[#059669] font-bold text-xs shrink-0 mt-0.5">
                  T
                </div>
              )}
              <div
                className={`max-w-[82%] rounded-xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'bg-[#059669] text-white'
                    : 'bg-white border border-[#e6e9ef] text-[#0B1220] shadow-[0_4px_14px_rgba(11,18,32,0.05)]'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-7 h-7 rounded-full bg-[#e7f7f0] border border-[#b8e6d3] flex items-center justify-center text-[#059669] font-bold text-xs shrink-0 mt-0.5">
                T
              </div>
              <div className="bg-white border border-[#d7dce3] rounded-xl px-4 py-3">
                <div className="flex gap-1 items-center h-4">
                  <span className="w-1.5 h-1.5 bg-[#059669] rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 bg-[#059669] rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 bg-[#059669] rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="text-[#c2743a] text-xs text-center py-1">{error}</div>
          )}

          <div ref={bottomRef} />
        </div>
      )}

      {/* Bottom input bar — only shown once conversation has started */}
      {messages.length > 0 && (
        <div className="border-t border-[#e6e9ef] px-4 py-3 bg-[#F7F8FB]">
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
                className="flex-1 min-w-0 bg-white border border-[#d7dce3] focus:border-[#059669] rounded-lg px-4 py-2.5 text-sm text-[#0B1220] placeholder-[#98a2b0] outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="shrink-0 bg-[#059669] hover:bg-[#047857] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
              >
                Ask
              </button>
            </form>
            <p className="text-[#a4adba] text-[10px] mt-2 text-center">
              For information only. Not financial advice. Updated daily.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
