import { Link, useParams } from 'react-router-dom'
import { useSanity } from '@/hooks/useSanity'
import { MARKET_QUERY, ALL_MARKETS_QUERY } from '@/lib/queries'
import { LoadingState, ErrorState, Breadcrumb, CTABand } from '@/components/ui'
import type { Market } from '@/types'

export default function MarketPage() {
  const { slug } = useParams<{ slug: string }>()

  const { data: market, loading, error } = useSanity<Market>(
    MARKET_QUERY,
    { slug },
    [slug],
  )
  // Fetch all markets for the "Other Markets" switcher — non-blocking
  const { data: allMarkets } = useSanity<Market[]>(ALL_MARKETS_QUERY)

  if (loading) return <LoadingState />
  if (error != null || market == null) return <ErrorState message="Market not found." />

  const others: Market[] = (allMarkets ?? []).filter((m: Market) => m.slug !== slug)

  return (
    <div className="page-fade">
      <div className="page-hero">
        <div className="page-hero-inner">
          <Breadcrumb
            crumbs={[
              { label: 'Home', to: '/' },
              { label: 'Markets' },
              { label: market.name },
            ]}
          />
          {market.emoji != null && (
            <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>{market.emoji}</div>
          )}
          <span className="label-tag" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Market Focus
          </span>
          <h1 className="section-heading white">{market.name}</h1>
          <p className="body-copy light" style={{ maxWidth: '560px', marginTop: '0.75rem' }}>
            {market.overview}
          </p>
        </div>
      </div>

      <section className="section white">
        <div className="inner">
          <div className="market-cols">
            {/* Challenges */}
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-head)',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: 'var(--navy)',
                  marginBottom: '1.25rem',
                  borderBottom: '3px solid var(--red)',
                  paddingBottom: '0.75rem',
                  display: 'inline-block',
                }}
              >
                Key Challenges
              </h2>
              <ul className="check-list" style={{ marginTop: '1.25rem' }}>
                {(market.challenges ?? []).map((challenge: string) => (
                  <li key={challenge}>
                    <span className="ci warn">⚠</span>
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-head)',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: 'var(--navy)',
                  marginBottom: '1.25rem',
                  borderBottom: '3px solid var(--teal)',
                  paddingBottom: '0.75rem',
                  display: 'inline-block',
                }}
              >
                How Smart Blend Solves Them
              </h2>
              <ul className="check-list" style={{ marginTop: '1.25rem' }}>
                {(market.solutions ?? []).map((solution: string) => (
                  <li key={solution}>
                    <span className="ci good">✓</span>
                    {solution}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Other markets switcher */}
          {others.length > 0 && (
            <div
              style={{
                marginTop: '3.5rem',
                paddingTop: '3rem',
                borderTop: '1px solid var(--grey-200)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: 'var(--grey-500)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                Other Markets:
              </span>
              {others.map((other: Market) => (
                <Link
                  key={other.slug}
                  to={`/markets/${other.slug}`}
                  className="btn btn-outline-navy"
                  style={{ fontSize: '0.8rem', padding: '0.5rem 1.1rem' }}
                >
                  {other.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTABand
        title={market.ctaText ?? `Request a ${market.name} Trial`}
        subtitle={`Connect with an agronomist who specialises in ${market.name.toLowerCase()}.`}
        btnText="Get Started"
      />
    </div>
  )
}
