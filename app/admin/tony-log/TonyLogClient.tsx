'use client';

import { useState, FormEvent } from 'react';

type Entry = {
  ts: string;
  question: string;
  answer: string;
  latencyMs: number;
  source: string;
};

export default function TonyLogClient() {
  const [password, setPassword] = useState('');
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function load(e?: FormEvent) {
    e?.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/tony-log', {
        headers: { 'x-admin-password': password },
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Failed to load.');
        setEntries(null);
      } else {
        setEntries(data.entries);
        if (data.error) setError(data.error);
      }
    } catch {
      setError('Network error.');
    } finally {
      setLoading(false);
    }
  }

  if (!entries) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <form onSubmit={load} className="w-full max-w-sm space-y-3">
          <h1 className="text-lg font-bold">Tony Q&amp;A Log</h1>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg py-2 text-sm font-medium transition-colors"
          >
            {loading ? 'Checking…' : 'View log'}
          </button>
          {error && <p className="text-rose-400 text-xs">{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-lg font-bold mb-1">Tony Q&amp;A Log</h1>
        <p className="text-slate-500 text-xs mb-6">
          {entries.length} most recent exchange{entries.length === 1 ? '' : 's'}, newest first.
        </p>
        {error && <p className="text-amber-400 text-xs mb-4">{error}</p>}
        {entries.length === 0 && !error && (
          <p className="text-slate-500 text-sm">No questions logged yet.</p>
        )}
        <div className="space-y-4">
          {entries.map((e, i) => (
            <div key={i} className="border border-slate-800 rounded-xl p-4 bg-slate-900/40">
              <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                <span>{new Date(e.ts).toLocaleString()}</span>
                <span>{e.source} &middot; {e.latencyMs}ms</span>
              </div>
              <p className="text-sm text-slate-100 font-semibold mb-2">{e.question}</p>
              <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">{e.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
