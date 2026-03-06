import { Link, useParams } from 'react-router-dom'
import { useSanity } from '@/hooks/useSanity'
import { INSIGHT_QUERY } from '@/lib/queries'
import { LoadingState, ErrorState, Breadcrumb, CTABand, RichText } from '@/components/ui'
import type { Insight } from '@/types'

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function InsightDetailPage() {
  const { slug } = useParams<{ slug: string }>()

  const { data: insight, loading, error } = useSanity<Insight>(
    INSIGHT_QUERY,
    { slug },
    [slug],
  )

  if (loading) return <LoadingState />
  if (error != null || insight == null) return <ErrorState message="Insight not found." />

  return (
    <div className="page-fade">
      <div className="page-hero">
        <div className="page-hero-inner">
          <Breadcrumb
            crumbs={[{ label: 'Insights', to: '/insights' }, { label: insight.title }]}
          />
          {insight.tag != null && (
            <span className="label-tag" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {insight.tag}
            </span>
          )}
          <h1 className="section-heading white" style={{ maxWidth: '800px' }}>
            {insight.title}
          </h1>
          {insight.publishedAt != null && (
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem', marginTop: '0.75rem' }}>
              {formatDate(insight.publishedAt)}
              {insight.author != null && ` · ${insight.author.name}`}
            </p>
          )}
        </div>
      </div>

      <section className="section white">
        <div className="inner">
          <Link to="/insights" className="back-btn">
            ← Back to Insights
          </Link>

          <div className="detail-layout detail-layout--insight">
            {/* Article body */}
            <div>
              <p
                className="body-copy"
                style={{ fontSize: '1.15rem', marginBottom: '2rem', lineHeight: 1.8 }}
              >
                {insight.excerpt}
              </p>
              {insight.body != null && <RichText value={insight.body} />}
            </div>

            {/* Author sidebar */}
            {insight.author != null && (
              <aside
                style={{
                  background: 'var(--grey-50)',
                  border: '1px solid var(--grey-200)',
                  padding: '1.75rem',
                }}
              >
                <div
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--teal)',
                    marginBottom: '0.75rem',
                  }}
                >
                  Author
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-head)',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: 'var(--navy)',
                  }}
                >
                  {insight.author.name}
                </div>
                {insight.author.role != null && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--grey-500)', marginTop: '0.25rem' }}>
                    {insight.author.role}
                  </div>
                )}
                {insight.author.slug != null && (
                  <Link
                    to={`/team/${insight.author.slug}`}
                    className="btn-ghost"
                    style={{ marginTop: '1rem', display: 'inline-flex' }}
                  >
                    View profile <span className="arrow">→</span>
                  </Link>
                )}
              </aside>
            )}
          </div>
        </div>
      </section>

      <CTABand
        title="Questions about this topic?"
        subtitle="Speak directly with an agronomist."
        btnText="Contact Us"
      />
    </div>
  )
}
