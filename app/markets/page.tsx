'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from '@/app/components/Logo';
import {
  MARKET_TILES,
  LENS_FUNDS,
  MARKETS_TIMESTAMP_NY,
  FLOW_SINCE,
  type MarketPeriod,
  type MarketRegion,
  type MarketTile,
} from '@/lib/markets-data';

const PERIODS: MarketPeriod[] = ['1W', '1M', 'YTD', '6M', '1Y'];
const REGIONS: MarketRegion[] = ['Europe', 'Asia', 'Latin America'];

// Fund size (net assets) → compact $ string. Returns '—' when unknown.
function fmtAum(v: number): string {
  if (!v || v <= 0) return '—';
  if (v >= 1e9) return `$${(v / 1e9).toFixed(v >= 1e10 ? 0 : 1)}B`;
  if (v >= 1e6) return `$${(v / 1e6).toFixed(0)}M`;
  return `$${Math.max(1, Math.round(v / 1e3))}K`;
}

// Net flow in dollars → signed compact string.
function fmtFlow(usd: number): string {
  const sign = usd >= 0 ? '+' : '-';
  const a = Math.abs(usd);
  if (a >= 1e9) return `${sign}$${(a / 1e9).toFixed(1)}B`;
  if (a >= 1e6) return `${sign}$${(a / 1e6).toFixed(0)}M`;
  return `${sign}$${Math.max(1, Math.round(a / 1e3))}K`;
}

function Sparkline({ data, positive }: { data: number[]; positive: boolean }) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * 100},${30 - ((v - min) / span) * 28 + 1}`)
    .join(' ');
  return (
    <svg viewBox="0 0 100 32" preserveAspectRatio="none" className={`w-full h-9 ${positive ? 'text-emerald-400' : 'text-rose-400'}`} aria-hidden>
      <polyline points={pts} fill="none" stroke="currentColor" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function Tile({ t, period, open, onToggle }: { t: MarketTile; period: MarketPeriod; open: boolean; onToggle: () => void }) {
  const ret = t.returns[period];
  const pos = ret >= 0;
  const series = t.history?.[period];
  const flow = period === '1W' ? t.flow1W : t.flow1M;
  const flowLabel = period === '1W' ? '1W net flow' : '1M net flow';
  return (
    <button
      onClick={onToggle}
      className="text-left w-full rounded-xl border border-slate-800 bg-slate-900 p-4 hover:border-slate-600 transition-colors"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-3xl leading-none" aria-hidden>{t.flag}</span>
          <div className="min-w-0">
            <div className="font-bold text-white truncate">{t.market}</div>
            <div className="text-slate-400 text-xs truncate">
              <span className="font-mono">{t.ticker}</span>
              <span className="mx-1.5 text-slate-600">·</span>
              {t.name}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <span className={`font-bold tabular-nums ${pos ? 'text-emerald-400' : 'text-rose-400'}`}>
            {pos ? '+' : ''}{ret.toFixed(1)}%
          </span>
          {t.kind === 'region' && (
            <span className="text-[9px] font-extrabold tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-sky-500/15 border border-sky-500/40 text-sky-300">Region</span>
          )}
          {t.thin && (
            <span className="text-[9px] font-extrabold tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300">Thin fund</span>
          )}
        </div>
      </div>

      {series && <div className="mt-2"><Sparkline data={series} positive={pos} /></div>}

      <div className="mt-2 flex items-center justify-between text-xs">
        <span className="text-slate-400">
          ${t.price.toFixed(2)}
          <span className="mx-1.5 text-slate-600">·</span>
          {fmtAum(t.aum)}
        </span>
        <span className="text-slate-400">
          {flowLabel}:{' '}
          {flow ? (
            <span className={`font-semibold tabular-nums ${flow.usd >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{fmtFlow(flow.usd)}</span>
          ) : (
            <span className="text-slate-500" title={`Share-count tracking started ${FLOW_SINCE}. Flow figures appear once history spans the window.`}>collecting</span>
          )}
        </span>
      </div>

      {open && (
        <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-slate-300 leading-relaxed">
          <span className="text-emerald-400 font-semibold">Tony&apos;s note:</span> {t.note}
        </div>
      )}
    </button>
  );
}

export default function Markets() {
  const [period, setPeriod] = useState<MarketPeriod>('1M');
  const [open, setOpen] = useState<string | null>(null);

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
            <Link href="/markets" className="text-emerald-400 font-medium">Markets</Link>
            <Link href="/universe" className="text-slate-400 hover:text-white transition-colors">Universe</Link>
            <Link href="/about" className="text-slate-400 hover:text-white transition-colors">About</Link>
            <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Intro */}
        <section className="mb-7 max-w-3xl">
          <h2 className="text-2xl font-bold text-white mb-3">International Markets</h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-3">
            Where in the world is the money going? Every tile below is a market, not a stock. Each one is
            measured through the fund global investors actually use to enter it, so price tells you how the
            market is doing and fund flows tell you whether money is arriving or leaving.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            <span className="text-emerald-400 font-semibold">Tony&apos;s read:</span> price and flow agreeing is
            confirmation. Price and flow disagreeing is the interesting part: a market that falls while money
            keeps arriving is being bought on the dip, and a rally nobody funds is running on fumes. Tap any
            tile for my note on that market.
          </p>
          <p className="text-slate-500 text-xs leading-relaxed">
            This board is separate from our conviction rankings. Conviction scores come from actively managed
            funds; these tiles use index country funds as measuring instruments for market-level money movement.
            Net flow = change in shares outstanding times price (fund creations and redemptions). Share-count
            tracking began {FLOW_SINCE}; flow figures appear as history accrues.
          </p>
        </section>

        {/* Period toggle */}
        <div className="flex items-center bg-slate-800 rounded-full p-0.5 text-xs font-bold border border-slate-700 w-max mb-8">
          {PERIODS.map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${
                period === p ? 'bg-emerald-500 text-black shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Region sections */}
        {REGIONS.map(region => {
          const tiles = MARKET_TILES.filter(t => t.region === region);
          return (
            <section key={region} className="mb-10">
              <h3 className="text-lg font-bold text-white mb-1">{region}</h3>
              <p className="text-slate-400 text-xs mb-4">{tiles.length} market{tiles.length > 1 ? 's' : ''}, sorted by fund size</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[...tiles].sort((a, b) => b.aum - a.aum).map(t => (
                  <Tile
                    key={t.ticker}
                    t={t}
                    period={period}
                    open={open === t.ticker}
                    onToggle={() => setOpen(o => (o === t.ticker ? null : t.ticker))}
                  />
                ))}
              </div>
            </section>
          );
        })}

        {/* Regional lens */}
        <section className="mb-10">
          <h3 className="text-lg font-bold text-white mb-1">Where the big international money sits</h3>
          <p className="text-slate-400 text-xs mb-4 max-w-3xl">
            The broad international allocation funds, broken down by country of risk. When these giants take
            in new money, it lands in markets in these proportions. The mix is the map.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LENS_FUNDS.map(l => {
              const top = l.countries.slice(0, 8);
              const maxW = top[0]?.w || 1;
              return (
                <div key={l.ticker} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                  <div className="flex items-baseline justify-between gap-2 mb-3">
                    <div className="min-w-0">
                      <span className="font-bold text-white">{l.label}</span>
                      <span className="text-slate-400 text-xs ml-2 font-mono">{l.ticker}</span>
                    </div>
                    <span className="text-slate-400 text-xs flex-shrink-0">{fmtAum(l.aum)}</span>
                  </div>
                  <div className="space-y-1.5">
                    {top.map(c => (
                      <div key={c.c} className="flex items-center gap-2 text-xs">
                        <span className="w-28 flex-shrink-0 text-slate-300 truncate" title={c.c}>{c.c}</span>
                        <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div className="h-full rounded-full bg-emerald-500/70" style={{ width: `${(c.w / maxW) * 100}%` }} />
                        </div>
                        <span className="w-11 text-right tabular-nums text-emerald-300 font-semibold">{c.w.toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Portfolio-builder CTA: the markets above are also the diversifier
            sleeve in Build with Tony — watching becomes building. */}
        <section className="mb-10">
          <Link
            href="/portfolio"
            className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border border-teal-500/30 bg-gradient-to-br from-teal-500/10 to-slate-900 p-5 hover:border-teal-500/60 hover:from-teal-500/20 transition-colors group"
          >
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-bold tracking-[0.12em] uppercase text-teal-400">Build with Tony</div>
              <div className="text-base font-bold text-white leading-snug mt-1">
                Put these markets in your portfolio.
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mt-1.5 max-w-2xl">
                The broad funds above (IXUS, EFA, EEM) now power a world markets sleeve in the portfolio builder.
                Core for beta, themes for conviction, world markets for diversification beyond the US.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 self-start sm:self-center flex-shrink-0 px-3 py-1.5 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-200 text-xs font-bold group-hover:bg-teal-500/30 transition-colors">
              Build your portfolio
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </span>
          </Link>
        </section>

        <p className="text-slate-500 text-xs mt-4">
          Data snapshot: {MARKETS_TIMESTAMP_NY}. Market instruments are US-listed iShares country and regional
          funds (Argentina via Global X ARGT). Size is fund net assets. Performance is price return over each
          window. Net flow is the change in fund shares outstanding times price, our measure of money entering
          or leaving the fund. This is a window into global allocation through US-listed funds, not a census of
          all flows. Indicative only, not investment advice.
        </p>

        {/* Disclaimer */}
        <p className="text-slate-600 text-xs border-t border-slate-800 pt-6 mt-8 max-w-3xl">
          Stockscout is for informational purposes only and does not constitute financial advice. All data is
          indicative and sourced from public ETF disclosures and market feeds. Past performance is not a
          guarantee of future results. Always do your own research.
        </p>

      </div>
    </main>
  );
}
