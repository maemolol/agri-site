import { Link } from 'react-router-dom'
import { useSanity } from '@/hooks/useSanity'
import { WHAT_WE_ARE_QUERY } from '@/lib/queries'
import { LoadingState, ErrorState, PageHero, CTABand, RichText } from '@/components/ui'
import type { WhatWeArePage as TWhatWeArePage } from '@/types'

export default function WhatWeArePage() {
  const { data, loading, error } = useSanity<TWhatWeArePage>(WHAT_WE_ARE_QUERY)

  if (loading) return <LoadingState />
  if (error)   return <ErrorState message="Failed to load page content." />

  const stats = data?.stats?.length ? data.stats : [
    { number: '15+', label: 'Years of soil microbiome R&D' },
    { number: '400+', label: 'Commercial field trials completed' },
    { number: '12+', label: 'Beneficial microbial species, viable at application' },
    { number: '52%', label: 'Average synthetic N reduction in row crop trials' },
  ]

  const pillars = data?.pillars?.length ? data.pillars : [
    { title: 'Regenerative Focus', body: 'We measure success by soil health trajectory — not just single-season yield. Every recommendation is evaluated against long-term land productivity.' },
    { title: 'Compatibility First', body: 'Smart Blend integrates with existing fertility and crop protection programs. We don\'t ask growers to abandon what works — we make it work better.' },
    { title: 'ROI Accountability', body: 'We provide growers with field-level data and agronomic support to document measurable returns. Our performance stands behind the science.' },
  ]

  return (
    <div className="page-fade">
      <PageHero
        label="Product Platform"
        headline={data?.headline ?? 'Complete Soil & Plant Health Inoculant'}
        subheadline={data?.subheadline ?? 'A science-formulated biologic product built for commercial agricultural production — not laboratory conditions.'}
      />

      {/* Mission + Stats */}
      <section className="section white">
        <div className="inner">
          <div className="two-col">
            <div>
              <span className="label-tag">Our Mission</span>
              <h2 className="section-heading" style={{ fontSize: '2rem' }}>
                {data?.missionHeading ?? 'Regenerating agriculture through soil biology'}
              </h2>
              {data?.missionBody
                ? <RichText value={data.missionBody} />
                : (
                  <>
                    <p className="body-copy" style={{ marginBottom: '1rem' }}>We exist to give professional growers a science-validated path to lower input costs, higher yields, and verified sustainability — without compromising profitability.</p>
                    <p className="body-copy" style={{ marginBottom: '1rem' }}>Smart Blend is formulated on over 15 years of soil microbiome research. Our proprietary stabilization technology maintains 12+ microbial species viable from production through field application — a critical failure point for most biologic products.</p>
                    <p className="body-copy">Every strain is selected for documented performance in commercial environments, validated with university extension programs and independent agronomists.</p>
                  </>
                )
              }
            </div>
            <div>
              <div style={{ background: 'var(--navy)', padding: '2.5rem', color: 'white' }}>
                <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.25rem', fontWeight: 600, color: 'white', marginBottom: '1.75rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                  By the Numbers
                </h3>
                {stats.map(s => (
                  <div key={s.label} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                    <div style={{ fontFamily: 'var(--font-head)', fontSize: '2.2rem', fontWeight: 700, color: 'var(--red)', lineHeight: 1, flexShrink: 0, minWidth: '70px' }}>{s.number}</div>
                    <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', paddingTop: '0.5rem' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="section grey">
        <div className="inner">
          <span className="label-tag">Operating Principles</span>
          <h2 className="section-heading">How we approach agronomy</h2>
          <div className="pillars-grid">
            {pillars.map(p => (
              <div key={p.title} style={{ background: 'var(--white)', padding: '2.25rem 2rem', borderTop: '3px solid var(--teal)' }}>
                <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '0.65rem' }}>{p.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--grey-700)', lineHeight: 1.7 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="See the data for yourself"
        subtitle="Request our independent trial summary or speak with an agronomist."
        btnText="Contact an Agronomist"
      />
    </div>
  )
}
