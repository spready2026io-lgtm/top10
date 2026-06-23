import Link from 'next/link';
import Logo from '@/app/components/Logo';
import { THEMES, THEME_ETFS } from '@/lib/data';

export const metadata = { title: 'About | Stockscout' };

export default function About() {
  // Counts are derived from the live universe so this page never drifts stale.
  const totalEtfs   = Object.values(THEME_ETFS).reduce((n, list) => n + list.length, 0);
  const themeCount  = THEMES.length;

  return (
    <main className="min-h-screen bg-slate-950 text-white">

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
            <Link href="/about" className="text-emerald-400 font-medium">About</Link>
            <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12 space-y-14">

        {/* Hero */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">What is Stockscout?</h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-3">
            Stockscout is an ETF holdings analyser. It reads the holdings of {totalEtfs} actively managed ETFs
            across {themeCount} investment themes every day, ranks every stock by how much conviction those
            ETFs have in it, and surfaces the Top 10 names per theme.
          </p>
          <p className="text-slate-300 text-sm leading-relaxed">
            The idea is simple. When multiple serious ETFs all own the same stock and give it a
            large weighting, that is a signal worth paying attention to. Stockscout makes that signal
            visible at a glance.
          </p>
        </section>

        {/* What is an ETF */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">What is an ETF?</h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-3">
            An ETF (Exchange-Traded Fund) is a basket of stocks that trades on an exchange like a
            single share. A thematic ETF owns many companies within one investment theme. For
            example, ARTY (iShares Artificial Intelligence ETF) holds around 30 companies involved
            in AI, weighted by the fund manager&apos;s active conviction.
          </p>
          <p className="text-slate-300 text-sm leading-relaxed mb-3">
            These funds manage billions of dollars of real capital. Their holdings are published
            daily. When an ETF increases its weighting in a stock, it is buying more of that stock.
            When multiple ETFs do that simultaneously, it means institutional money is concentrating
            in one name.
          </p>
          <p className="text-slate-300 text-sm leading-relaxed mb-3">
            Stockscout tracks <span className="text-slate-200 font-semibold">{totalEtfs} actively managed ETFs</span> across
            {' '}{themeCount} themes, giving you a view across {totalEtfs} institutional products simultaneously.
            All ETFs in the universe are discretionary, actively managed funds. Index trackers are
            excluded — passive index construction reflects mechanical rules, not manager conviction.
          </p>

          {/* ETF table */}
          <div className="mt-5 rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <p className="text-white text-xs font-semibold uppercase tracking-wider">Tracked ETFs, {totalEtfs} active funds</p>
              <p className="text-slate-500 text-xs">last updated June 2026</p>
            </div>
            {THEMES.map((theme, i) => {
              const list = THEME_ETFS[theme];
              return (
                <div key={theme} className={`px-4 py-3 text-sm ${i % 2 === 0 ? 'bg-slate-900' : 'bg-slate-900/50'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-slate-200 font-semibold w-36 flex-shrink-0">{theme}</span>
                    <span className="text-slate-500 text-xs">{list.length} ETFs</span>
                  </div>
                  <span className="text-slate-500 text-xs font-mono">{list.join(', ')}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* The scores */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">The Scores</h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-5">
            Each stock tile shows three scores. Together they tell you how much institutional conviction
            sits behind a name, and whether that conviction is growing.
          </p>

          <div className="space-y-4">

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center border text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 border-emerald-500/40 text-emerald-300">10/11</span>
                <h3 className="text-white font-semibold">Coverage Score</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-2">
                The fraction of tracked ETFs in this theme that hold the stock, shown as x/n and as a
                percentage. The denominator n varies by theme — AI &amp; ML scores out of 11, Broad Tech
                out of 13, Semiconductors and Electrification out of 4, and so on. A stock held by
                10 of 11 AI &amp; ML ETFs has 91% coverage.
              </p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <span className="inline-flex items-center border text-xs font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 border-emerald-500/40 text-emerald-300">11/11</span>
                  <span className="text-slate-400">100% coverage. Every ETF in the theme holds this stock. Maximum breadth.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-flex items-center border text-xs font-bold px-1.5 py-0.5 rounded-full bg-sky-500/20 border-sky-500/40 text-sky-300">8/11</span>
                  <span className="text-slate-400">Strong. ~73% coverage. A few ETFs are out. Still a high-conviction name.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-flex items-center border text-xs font-bold px-1.5 py-0.5 rounded-full bg-amber-500/20 border-amber-500/40 text-amber-300">5/11</span>
                  <span className="text-slate-400">Moderate. ~45% coverage. Held by roughly half the theme. More specialised exposure.</span>
                </li>
              </ul>
              <p className="text-slate-500 text-xs mt-3">
                Coverage is used as a linear coefficient in the Weight Score formula: avgWeight x coverage.
                Higher coverage amplifies the weight signal in direct proportion.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-emerald-400 font-bold text-sm">6.16% avg wt</span>
                <h3 className="text-white font-semibold">Weight Score</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-2">
                The average portfolio weight this stock receives across every theme ETF, counting funds that do not
                hold it as 0%. The full formula is: <span className="text-slate-300 font-mono text-xs">avgWeight x coverage</span>.
                Multiplying by coverage scales the raw average by how broadly the stock is held, so a genuine broad-market
                bet rises while a stock held by only one fund is discounted in direct proportion to its narrowness.
              </p>
              <p className="text-slate-300 text-sm leading-relaxed mb-2">
                This is the signal that separates a filler position from a conviction bet. An ETF might
                hold 40 stocks, but if it gives one stock a 13% weighting, that is not passive exposure.
                That is an active bet.
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                A stock can have 100% coverage but a low Weight Score (held by everyone, but
                only as a small position). A high Weight Score with lower coverage (held by fewer
                funds but in size) is often the more interesting signal.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold px-2 py-0.5 rounded-full">+45% VS</span>
                <h3 className="text-white font-semibold">Velocity Score</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-2">
                The percentage change in a stock&apos;s Weight Score over a given period (1D, 1W, 1M, or 6M).
                A Velocity Score of +45% over 1W means institutional funds collectively increased their
                weighted conviction in this stock by 45% in a week.
              </p>
              <p className="text-slate-300 text-sm leading-relaxed mb-2">
                Velocity Score is the early-detection layer. A stock can rank 8th today but be moving
                fast toward the top. If its Weight Score is accelerating, Velocity Score will catch that
                before the ranking changes.
              </p>
              <ul className="space-y-1 text-sm mt-3">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold flex-shrink-0 mt-0.5">+</span>
                  <span className="text-slate-400">Positive VS (green). Conviction is growing. Funds are adding or weighting up.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold flex-shrink-0 mt-0.5">-</span>
                  <span className="text-slate-400">Negative VS (red). Conviction is fading. Funds are trimming or dropping the stock.</span>
                </li>
              </ul>
              <p className="text-slate-500 text-xs mt-3">
                Velocity Score requires at least one prior snapshot to calculate. New entrants to the Top 10 list
                show a &ldquo;NEW&rdquo; badge instead of a VS until the next daily run.
              </p>
            </div>
          </div>
        </section>

        {/* The chart */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Top10 vs S&P500 Chart</h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-3">
            At the top of each theme view you will see a performance chart. It compares two things:
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start gap-2">
              <div className="w-4 h-0.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
              <div>
                <span className="text-slate-200 text-sm font-semibold">Top10 line (green).</span>
                <span className="text-slate-400 text-sm"> The equal-weighted average return of the 10 highest-conviction names in this theme.</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-4 h-0.5 bg-sky-400 rounded-full mt-2 flex-shrink-0 opacity-65" />
              <div>
                <span className="text-slate-200 text-sm font-semibold">S&P500 line (blue).</span>
                <span className="text-slate-400 text-sm"> The return of the broader U.S. market over the same period.</span>
              </div>
            </li>
          </ul>
          <p className="text-slate-300 text-sm leading-relaxed mb-3">
            The chart starts at 100 for both lines. If the green line is above the blue line, the
            Top10 selection has outperformed the market over that period.
          </p>
          <p className="text-slate-300 text-sm leading-relaxed">
            Use the time toggle (1W / 1M / 6M / 1Y) to zoom in or out. The delta badge in the top
            right of the chart shows the performance gap between the two lines.
          </p>
        </section>

        {/* ETF performance tile */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Theme ETF Performance Tile</h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-3">
            Beside the chart (on desktop) you will see a tile ranking the tracked ETFs for that
            theme by return over the selected period.
          </p>
          <p className="text-slate-300 text-sm leading-relaxed">
            This lets you see at a glance which ETF has been performing strongest within the theme.
            For example in AI &amp; ML, a concentrated fund like ARTY often diverges from a broader
            fund like ALAI. That divergence tells you where the theme momentum is concentrated.
          </p>
        </section>

        {/* Tile detail */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Reading a Stock Tile</h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            Each tile has a front face and a back face. Tap or click any tile to flip it.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
              <p className="text-white font-semibold text-sm mb-2">Front face</p>
              <ul className="space-y-1.5 text-sm text-slate-400">
                <li><span className="text-slate-300 font-medium">Logo and name.</span> Company identity at a glance.</li>
                <li><span className="text-slate-300 font-medium">Ticker.</span> The stock symbol.</li>
                <li><span className="text-slate-300 font-medium">Coverage badge.</span> ETF ownership breadth (x/n, relative to theme).</li>
                <li><span className="text-slate-300 font-medium">Price and period return.</span> Current price and return for the selected period.</li>
                <li><span className="text-slate-300 font-medium">Weight Score.</span> Average ETF weighting across holders.</li>
                <li><span className="text-slate-300 font-medium">Velocity Score badge.</span> Green (+) or red (-) showing how fast Weight Score is changing.</li>
                <li><span className="text-slate-300 font-medium">Price chart.</span> Adjust the period using 1W / 1M / 6M / 1Y.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-emerald-900 bg-slate-900 p-4">
              <p className="text-white font-semibold text-sm mb-2">Back face</p>
              <ul className="space-y-1.5 text-sm text-slate-400">
                <li><span className="text-slate-300 font-medium">ETF presence.</span> Which ETFs hold the stock and which do not.</li>
                <li><span className="text-slate-300 font-medium">Key financials.</span> Market cap, P/E, EPS, revenue growth, gross margin, dividend yield.</li>
                <li><span className="text-slate-300 font-medium">Tony&apos;s Analysis.</span> Investment thesis, key risks, and what to watch.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Tony's analysis */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Tony&apos;s Analysis</h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-3">
            Tony is our U.S. Equity and ETF Research Analyst. Every stock in the Top10 has a note
            from Tony on the back of the tile.
          </p>
          <p className="text-slate-300 text-sm leading-relaxed mb-3">
            Tony covers three things per stock: the investment thesis (why this stock ranks high and
            what is driving it), the key risks (what could break the thesis), and what to watch
            (the specific catalysts or data points that matter most in the near term).
          </p>
          <p className="text-slate-300 text-sm leading-relaxed">
            Tony does not give investment advice. He explains the data. The score ranks the stock.
            The note explains why.
          </p>
        </section>

        {/* How to use */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">How to Use Stockscout</h2>
          <ol className="space-y-3">
            {[
              { n: '1', title: 'Pick your theme.', body: 'Use the toggle in the header to switch between AI & ML, Semiconductors, Broad Tech, Electrification, Industrials, and Meme.' },
              { n: '2', title: 'Check the chart.', body: 'See how the Top10 selection is performing versus the S&P500. Use the time toggle to change the period.' },
              { n: '3', title: 'Scan the tiles.', body: 'Tiles are ranked by conviction. The highest-conviction name (highest ETF weighting and breadth) is top left.' },
              { n: '4', title: 'Check the scores.', body: 'Coverage Score tells you how many ETFs own it. Weight Score tells you how much they own. Velocity Score tells you if that conviction is growing. All three high means maximum and accelerating conviction.' },
              { n: '5', title: 'Flip the tile.', body: 'Click any tile to see the full ETF breakdown, financials and Tony\'s qualitative analysis note.' },
              { n: '6', title: 'Adjust the chart period.', body: 'Use the 1W / 1M / 6M / 1Y buttons inside each tile to see the price history over different periods.' },
            ].map(({ n, title, body }) => (
              <li key={n} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center mt-0.5">
                  {n}
                </span>
                <p className="text-slate-300 text-sm leading-relaxed">
                  <span className="text-slate-200 font-semibold">{title}</span>{' '}
                  {body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* The data */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">The Data</h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-3">
            ETF holdings are published daily by the fund providers (iShares, Invesco, ARK, Alger,
            Wedbush, Tema, Roundhill, VistaShares, First Trust, Fidelity, WisdomTree, and others).
            Stockscout fetches these published holdings every day and rebuilds the rankings automatically.
          </p>
          <p className="text-slate-300 text-sm leading-relaxed mb-3">
            Fundamentals (P/E, revenue growth, EPS, gross margin) come from public market data sources.
            Price data comes from exchange feeds.
          </p>
          <p className="text-slate-300 text-sm leading-relaxed">
            All data is indicative. Stockscout does not modify, filter, or adjust the underlying ETF
            holdings data. What the ETF publishes is what you see.
          </p>
        </section>

        {/* Disclaimer */}
        <p className="text-slate-600 text-xs border-t border-slate-800 pt-6">
          Stockscout is for informational purposes only and does not constitute financial advice.
          All data is indicative. Past performance is not a guarantee of future results.
          Always do your own research.
        </p>

      </div>
    </main>
  );
}
