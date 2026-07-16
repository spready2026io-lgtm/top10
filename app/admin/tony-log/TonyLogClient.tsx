'use client';

import { useState, FormEvent } from 'react';

type Entry = {
  ts: string;
  question: string;
  answer: string;
  latencyMs: number;
  source: string;
};

type Subscriber = { email: string; source: string; ts: string | null };

type View = 'log' | 'subs';

export default function TonyLogClient() {
  const [password, setPassword] = useState('');
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [view, setView] = useState<View>('log');
  const [subs, setSubs] = useState<Subscriber[] | null>(null);
  const [subsError, setSubsError] = useState('');
  const [subsLoading, setSubsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

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

  async function loadSubs() {
    setSubsLoading(true);
    setSubsError('');
    try {
      const res = await fetch('/api/admin/subscribers', {
        headers: { 'x-admin-password': password },
      });
      const data = await res.json();
      if (!res.ok) {
        setSubsError(data.error ?? 'Failed to load.');
        setSubs(null);
      } else {
        setSubs(data.subscribers ?? []);
        if (data.error) setSubsError(data.error);
      }
    } catch {
      setSubsError('Network error.');
    } finally {
      setSubsLoading(false);
    }
  }

  function showSubs() {
    setView('subs');
    if (subs === null && !subsLoading) loadSubs();
  }

  async function copyEmails() {
    if (!subs?.length) return;
    try {
      await navigator.clipboard.writeText(subs.map(s => s.email).join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setSubsError('Could not copy to clipboard.');
    }
  }

  if (!entries) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <form onSubmit={load} className="w-full max-w-sm space-y-3">
          <h1 className="text-lg font-bold">Stockscout Admin</h1>
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
            {loading ? 'Checking…' : 'View admin'}
          </button>
          {error && <p className="text-rose-400 text-xs">{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-lg font-bold mb-3">Stockscout Admin</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setView('log')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
              view === 'log'
                ? 'bg-slate-800 border-slate-600 text-slate-100'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Ask Tony log
          </button>
          <button
            onClick={showSubs}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
              view === 'subs'
                ? 'bg-slate-800 border-slate-600 text-slate-100'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Email subscribers
          </button>
        </div>

        {view === 'log' && (
          <>
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
          </>
        )}

        {view === 'subs' && (
          <>
            <div className="flex items-center justify-between mb-4 gap-3">
              <p className="text-slate-500 text-xs">
                {subs === null
                  ? (subsLoading ? 'Loading…' : ' ')
                  : `${subs.length} subscriber${subs.length === 1 ? '' : 's'}, newest first.`}
              </p>
              {!!subs?.length && (
                <button
                  onClick={copyEmails}
                  className="shrink-0 text-xs font-medium bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg px-3 py-1.5 transition-colors"
                >
                  {copied ? 'Copied ✓' : 'Copy all emails'}
                </button>
              )}
            </div>
            {subsError && <p className="text-amber-400 text-xs mb-4">{subsError}</p>}
            {subs !== null && subs.length === 0 && !subsError && (
              <p className="text-slate-500 text-sm">No subscribers yet.</p>
            )}
            {!!subs?.length && (
              <div className="overflow-x-auto border border-slate-800 rounded-xl">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-800">
                      <th className="font-semibold px-4 py-2">Email</th>
                      <th className="font-semibold px-4 py-2">Source</th>
                      <th className="font-semibold px-4 py-2 whitespace-nowrap">Signed up</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subs.map((s, i) => (
                      <tr key={s.email} className={i ? 'border-t border-slate-800/60' : ''}>
                        <td className="px-4 py-2 text-slate-100 font-mono text-xs break-all">{s.email}</td>
                        <td className="px-4 py-2">
                          <span className="text-[11px] text-slate-400 bg-slate-800/60 border border-slate-700 rounded px-1.5 py-0.5">
                            {s.source}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-slate-400 text-xs whitespace-nowrap">
                          {s.ts ? new Date(s.ts).toLocaleString() : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
