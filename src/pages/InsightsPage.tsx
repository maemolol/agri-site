import { useSanity } from '@/hooks/useSanity'
import { ALL_INSIGHTS_QUERY } from '@/lib/queries'
import { LoadingState, ErrorState, PageHero, CTABand, InsightCard } from '@/components/ui'
import type { Insight } from '@/types'

export default function InsightsPage() {
  const { data: insights, loading, error } = useSanity<Insight[]>(ALL_INSIGHTS_QUERY)

  if (loading) return <LoadingState />
  if (error != null) return <ErrorState message="Failed to load insights." />

  const list: Insight[] = insights ?? []

  return (
    <div className="page-fade">
      <PageHero
        label="Knowledge Base"
        headline="Agronomy Insights"
        subheadline="Field data, research summaries, and agronomic perspectives from the Smart Blend team."
      />

      <section className="section white">
        <div className="inner">
          {list.length === 0 ? (
            <p className="body-copy">Insights coming soon.</p>
          ) : (
            <div className="insights-grid">
              {list.map((insight: Insight) => (
                <InsightCard
                  key={insight._id}
                  title={insight.title}
                  slug={insight.slug}
                  tag={insight.tag}
                  excerpt={insight.excerpt}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <CTABand
        title="Ready to put the science to work?"
        subtitle="Request a field trial or speak with an agronomist."
        btnText="Contact Us"
      />
    </div>
  )
}
