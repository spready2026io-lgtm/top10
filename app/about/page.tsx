import Link from 'next/link';

export const metadata = { title: 'About — Top10' };

export default function About() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <header className="border-b border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-start justify-between gap-4">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold tracking-tight">
              <span className="text-emerald-400">Top</span>10
            </h1>
            <div className="mt-1.5">
              <span className="inline-flex items-center whitespace-nowrap bg-emerald-400/10 border border-emerald-400/25 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded-full tracking-wide">
                ETF Holdings Analyser
              </span>
            </div>
          </div>
          <nav className="flex items-center gap-4 text-sm pt-1">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors">Dashboard</Link>
            <Link href="/about" className="text-emerald-400 font-medium">About</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12">

        <h2 className="text-2xl font-bold text-white mb-2">What is Top10?</h2>
        <p className="text-slate-400 text-sm leading-relaxed mb-8">
          Top10 is an ETF holdings analyser for professional traders and investors. It ranks equities
          by how many sector ETFs hold them and by average weight — surfacing the names with the
          highest conviction across institutional products.
        </p>

        <div className="space-y-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="text-white font-semibold mb-2">Easy Score</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Counts how many of the five tracked sector ETFs hold this equity. A score of 5/5 means
              every major sector ETF has conviction in this name. Lower scores indicate more specialised
              or niche exposure.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="text-white font-semibold mb-2">Pro Score</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              The average portfolio weight across all ETFs that hold this equity. A higher Pro Score
              means institutional products are allocating more capital to this name — not just holding
              it, but overweighting it. This is the signal that separates a filler position from a
              conviction bet.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="text-white font-semibold mb-2">Model vs index</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              The validation strip at the top of each sector shows the equal-weighted average weekly
              return of the displayed equities against the primary sector ETF benchmark. Over time,
              the hypothesis is that highest-conviction names (by ETF weight) outperform the broad
              sector index.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="text-white font-semibold mb-2">Tony&apos;s Analysis</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Flip any tile to see the back face, which includes key financials and a qualitative
              analysis note from Tony — our U.S. Equity and ETF Research Analyst. Tony covers the
              investment thesis, key risks, and what to watch for each position.
            </p>
          </div>
        </div>

        <p className="text-slate-600 text-xs mt-10">
          Top10 is for informational purposes only and does not constitute financial advice.
          All data is indicative. Always do your own research.
        </p>

      </div>
    </main>
  );
}
