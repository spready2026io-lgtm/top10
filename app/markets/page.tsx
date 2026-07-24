'use client';

import { useState } from 'react';
import Link from 'next/link';
import SiteNav from '@/app/components/brand/SiteNav';
import SiteFooter from '@/app/components/brand/SiteFooter';
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
    <svg viewBox="0 0 100 32" preserveAspectRatio="none" className={`w-full h-9 ${positive ? 'text-[#059669]' : 'text-[#c2743a]'}`} aria-hidden>
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
      className="text-left w-full rounded-xl border border-[#e6e9ef] bg-white p-4 hover:border-[#d7dce3] transition-colors"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-3xl leading-none" aria-hidden>{t.flag}</span>
          <div className="min-w-0">
            <div className="font-bold text-[#0B1220] truncate">{t.market}</div>
            <div className="text-[#55606e] text-xs truncate">
              <span className="font-mono">{t.ticker}</span>
              <span className="mx-1.5 text-[#a4adba]">·</span>
              {t.name}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <span className={`font-bold tabular-nums ${pos ? 'text-[#059669]' : 'text-[#c2743a]'}`}>
            {pos ? '+' : ''}{ret.toFixed(1)}%
          </span>
          {t.kind === 'region' && (
            <span className="text-[9px] font-extrabold tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-[#eef2fb] border border-[#d4e0f6] text-[#3b6fd4]">Region</span>
          )}
          {t.thin && (
            <span className="text-[9px] font-extrabold tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-[#fcf3e1] border border-[#f0d9a8] text-[#a06a12]">Thin fund</span>
          )}
        </div>
      </div>

      {series && <div className="mt-2"><Sparkline data={series} positive={pos} /></div>}

      <div className="mt-2 flex items-center justify-between text-xs">
        <span className="text-[#55606e]">
          ${t.price.toFixed(2)}
          <span className="mx-1.5 text-[#a4adba]">·</span>
          {fmtAum(t.aum)}
        </span>
        <span className="text-[#55606e]">
          {flowLabel}:{' '}
          {flow ? (
            <span className={`font-semibold tabular-nums ${flow.usd >= 0 ? 'text-[#059669]' : 'text-[#c2743a]'}`}>{fmtFlow(flow.usd)}</span>
          ) : (
            <span className="text-[#8a94a3]" title={`Share-count tracking started ${FLOW_SINCE}. Flow figures appear once history spans the window.`}>collecting</span>
          )}
        </span>
      </div>

      {open && (
        <div className="mt-3 pt-3 border-t border-[#e6e9ef] text-xs text-[#55606e] leading-relaxed">
          <span className="text-[#059669] font-semibold">Tony&apos;s note:</span> {t.note}
        </div>
      )}
    </button>
  );
}

export default function Markets() {
  const [period, setPeriod] = useState<MarketPeriod>('1M');
  const [open, setOpen] = useState<string | null>(null);

  return (
    <main className="min-h-screen" style={{ background: '#F7F8FB', color: '#0B1220' }}>

      <SiteNav active="Markets" />

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Intro */}
        <section className="mb-7 max-w-3xl">
          <h2 className="text-2xl font-bold text-[#0B1220] mb-3">International Markets</h2>
          <p className="text-[#55606e] text-sm leading-relaxed mb-3">
            Where in the world is the money going? Every tile below is a market, not a stock. Each one is
            measured through the fund global investors actually use to enter it, so price tells you how the
            market is doing and fund flows tell you whether money is arriving or leaving.
          </p>
          <p className="text-[#55606e] text-sm leading-relaxed mb-3">
            <span className="text-[#059669] font-semibold">Tony&apos;s read:</span> price and flow agreeing is
            confirmation. Price and flow disagreeing is the interesting part: a market that falls while money
            keeps arriving is being bought on the dip, and a rally nobody funds is running on fumes. Tap any
            tile for my note on that market.
          </p>
          <p className="text-[#8a94a3] text-xs leading-relaxed">
            This board is separate from our conviction rankings. Conviction scores come from actively managed
            funds; these tiles use index country funds as measuring instruments for market-level money movement.
            Net flow = change in shares outstanding times price (fund creations and redemptions). Share-count
            tracking began {FLOW_SINCE}; flow figures appear as history accrues.
          </p>
        </section>

        {/* Period toggle */}
        <div className="flex items-center bg-[#f4f6f9] rounded-full p-0.5 text-xs font-bold border border-[#d7dce3] w-max mb-8">
          {PERIODS.map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${
                period === p ? 'bg-[#059669] text-white shadow-sm' : 'text-[#55606e] hover:text-[#0B1220]'
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
              <h3 className="text-lg font-bold text-[#0B1220] mb-1">{region}</h3>
              <p className="text-[#55606e] text-xs mb-4">{tiles.length} market{tiles.length > 1 ? 's' : ''}, sorted by fund size</p>
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
          <h3 className="text-lg font-bold text-[#0B1220] mb-1">Where the big international money sits</h3>
          <p className="text-[#55606e] text-xs mb-4 max-w-3xl">
            The broad international allocation funds, broken down by country of risk. When these giants take
            in new money, it lands in markets in these proportions. The mix is the map.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LENS_FUNDS.map(l => {
              const top = l.countries.slice(0, 8);
              const maxW = top[0]?.w || 1;
              return (
                <div key={l.ticker} className="rounded-xl border border-[#e6e9ef] bg-white p-4">
                  <div className="flex items-baseline justify-between gap-2 mb-3">
                    <div className="min-w-0">
                      <span className="font-bold text-[#0B1220]">{l.label}</span>
                      <span className="text-[#55606e] text-xs ml-2 font-mono">{l.ticker}</span>
                    </div>
                    <span className="text-[#55606e] text-xs flex-shrink-0">{fmtAum(l.aum)}</span>
                  </div>
                  <div className="space-y-1.5">
                    {top.map(c => (
                      <div key={c.c} className="flex items-center gap-2 text-xs">
                        <span className="w-28 flex-shrink-0 text-[#55606e] truncate" title={c.c}>{c.c}</span>
                        <div className="flex-1 h-2 rounded-full bg-[#f4f6f9] overflow-hidden">
                          <div className="h-full rounded-full bg-[#059669]/70" style={{ width: `${(c.w / maxW) * 100}%` }} />
                        </div>
                        <span className="w-11 text-right tabular-nums text-[#0a7350] font-semibold">{c.w.toFixed(1)}%</span>
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
            className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border border-[#b8e6d3] bg-[#e7f7f0] p-5 hover:border-[#059669] transition-colors group"
          >
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#059669]">Build with Tony</div>
              <div className="text-base font-bold text-[#0B1220] leading-snug mt-1">
                Put these markets in your portfolio.
              </div>
              <p className="text-xs text-[#55606e] leading-relaxed mt-1.5 max-w-2xl">
                The broad funds above (IXUS, EFA, EEM) now power a world markets sleeve in the portfolio builder.
                Core for beta, themes for conviction, world markets for diversification beyond the US.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 self-start sm:self-center flex-shrink-0 px-3 py-1.5 rounded-full bg-[#e7f7f0] border border-[#b8e6d3] text-[#0a7350] text-xs font-bold group-hover:bg-[#d6f0e4] transition-colors">
              Build your portfolio
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </span>
          </Link>
        </section>

        <p className="text-[#8a94a3] text-xs mt-4">
          Data snapshot: {MARKETS_TIMESTAMP_NY}. Market instruments are US-listed iShares country and regional
          funds (Argentina via Global X ARGT). Size is fund net assets. Performance is price return over each
          window. Net flow is the change in fund shares outstanding times price, our measure of money entering
          or leaving the fund. This is a window into global allocation through US-listed funds, not a census of
          all flows. Indicative only, not investment advice.
        </p>

        {/* Disclaimer */}
        <p className="text-[#a4adba] text-xs border-t border-[#e6e9ef] pt-6 mt-8 max-w-3xl">
          Stockscout is for informational purposes only and does not constitute financial advice. All data is
          indicative and sourced from public ETF disclosures and market feeds. Past performance is not a
          guarantee of future results. Always do your own research.
        </p>

      </div>
      <SiteFooter />
    </main>
  );
}
