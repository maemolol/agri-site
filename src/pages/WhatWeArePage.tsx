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
    { number: '20+', label: 'Years of real-world field development by a working grower' },
    { number: '75%', label: 'Average reduction in synthetic input dependency' },
    { number: '1',   label: 'Integrated system replacing multiple conventional products' },
    { number: '3×',  label: 'Average ROI vs conventional fertility programs' },
  ]

  const pillars = data?.pillars?.length ? data.pillars : [
    {
      title: 'Work with nature, not against it',
      body: '[PLACEHOLDER — e.g. "Conventional programs treat soil as a substrate to be dosed. Smart Blend treats it as a living system to be cultivated. The difference in results speaks for itself."]',
    },
    {
      title: 'One system, not five products',
      body: '[PLACEHOLDER — e.g. "We didn\'t set out to build another input. We set out to replace the ones you\'re already using — with something that addresses the underlying biology instead of masking the symptoms."]',
    },
    {
      title: 'Results you can measure',
      body: '[PLACEHOLDER — e.g. "We don\'t ask you to take our word for it. Every Smart Blend program is designed to generate data you can see — input costs, yield performance, and soil health trajectory."]',
    },
  ]

  return (
    <div className="page-fade">
      <PageHero
        label="Our approach"
        headline={data?.headline ?? '[PLACEHOLDER — e.g. "Nature already knows how to grow things. We just stopped listening."]'}
        subheadline={data?.subheadline ?? '[PLACEHOLDER — One sentence that captures the philosophy. e.g. "Smart Blend is built on a simple idea: when you work with the biology of your soil instead of against it, everything gets easier."]'}
      />

      {/* Origin Story */}
      <section className="section white">
        <div className="inner">
          <div className="two-col">
            <div>
              <span className="label-tag">Where this started</span>
              <h2 className="section-heading" style={{ fontSize: '2rem' }}>
                {data?.missionHeading ?? '[PLACEHOLDER — e.g. "A grower who got tired of the same answer."]'}
              </h2>
              {data?.missionBody ? (
                <RichText value={data.missionBody} />
              ) : (
                <>
                  <p className="body-copy" style={{ marginBottom: '1rem' }}>
                    [PLACEHOLDER — Tom's origin story. 20+ years of experimentation on his own operation. The frustration with conventional programs that never fully addressed the underlying soil health. The decision to build something different.]
                  </p>
                  <p className="body-copy" style={{ marginBottom: '1rem' }}>
                    [PLACEHOLDER — What he discovered. Working with soil biology instead of against it. The realisation that fertility, pest management, and soil health could be addressed by one integrated system instead of a growing stack of individual products.]
                  </p>
                  <p className="body-copy" style={{ marginBottom: '1.5rem' }}>
                    [PLACEHOLDER — The result. What Smart Blend is today, and what it means for growers who are tired of the same approach delivering the same limited results.]
                  </p>
                  <Link to="/who-we-are" className="btn btn-navy">Meet Tom and the team →</Link>
                </>
              )}
            </div>

            {/* Stats panel — proof that supports the story, not leads it */}
            <div>
              <div style={{ background: 'var(--navy)', padding: '2.5rem', color: 'white' }}>
                <h3 style={{
                  fontFamily: 'var(--font-head)', fontSize: '1.1rem', fontWeight: 600,
                  color: 'rgba(255,255,255,0.55)', marginBottom: '1.75rem',
                  borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem',
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>
                  The numbers behind the story
                </h3>
                {stats.map(s => (
                  <div key={s.label} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <div style={{
                      fontFamily: 'var(--font-head)', fontSize: '2.2rem', fontWeight: 700,
                      color: 'var(--teal)', lineHeight: 1, flexShrink: 0, minWidth: '70px',
                    }}>
                      {s.number}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.65)', paddingTop: '0.4rem', lineHeight: 1.55 }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* [PLACEHOLDER — Add a photo of Tom here once available.
                  A candid field shot — not a headshot — will feel more authentic
                  and reinforce the grower-built narrative.] */}
              <div style={{
                marginTop: '1.5px', background: 'var(--grey-100)',
                padding: '1.5rem', border: '1px dashed var(--grey-300)',
                textAlign: 'center',
              }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--grey-500)', lineHeight: 1.6 }}>
                  [PLACEHOLDER — Photo of Tom in the field goes here]
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="section grey">
        <div className="inner">
          <span className="label-tag">What we believe</span>
          <h2 className="section-heading">The Smart Blend philosophy</h2>
          <p className="body-copy" style={{ maxWidth: '580px', marginBottom: '0.5rem' }}>
            {/* [PLACEHOLDER — e.g. "This isn't just a product decision. It's a farming
                philosophy. Here's what Smart Blend growers have in common."] */}
            [PLACEHOLDER — Frame the pillars as a shared set of values, not a product description.]
          </p>
          <div className="pillars-grid">
            {pillars.map(p => (
              <div key={p.title} style={{
                background: 'var(--white)', padding: '2.25rem 2rem',
                borderTop: '3px solid var(--teal)',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-head)', fontSize: '1.2rem',
                  fontWeight: 600, color: 'var(--navy)', marginBottom: '0.75rem',
                }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--grey-700)', lineHeight: 1.7 }}>
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNITY INVITATION ─────────────────────────────────────────── */}
      <section className="section white">
        <div className="inner" style={{ maxWidth: '680px' }}>
          <span className="label-tag">Join the movement</span>
          <h2 className="section-heading">
            {/* [PLACEHOLDER — e.g. "You're not just changing a product. You're changing
                what farming means on your operation."] */}
            [PLACEHOLDER — An identity statement. e.g. "You're not just switching products. You're becoming a different kind of farmer."]
          </h2>
          <p className="body-copy" style={{ marginBottom: '1rem' }}>
            {/* [PLACEHOLDER — e.g. "Smart Blend growers don't just see better input
                economics. They see a different relationship with their land — one
                where the soil is an ally, not an obstacle."] */}
            [PLACEHOLDER — Paint the picture of life as a Smart Blend farmer. The community, the shared results, the sense of doing something that actually works.]
          </p>
          <p className="body-copy" style={{ marginBottom: '2rem' }}>
            {/* [PLACEHOLDER — e.g. "We're building a network of growers who are willing
                to share what they're seeing — inputs, yields, soil data. Because
                farmers trust farmers, and transparency is how we grow together."] */}
            [PLACEHOLDER — The community and peer validation angle. Farmers trust farmers. Transparency. Shared results.]
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-navy">Start a trial on your operation</Link>
            <Link to="/insights" className="btn btn-outline-navy">Read grower results</Link>
          </div>
        </div>
      </section>

      <CTABand
        title={/* [PLACEHOLDER — e.g. "See what Smart Blend looks like on your operation."] */ "[PLACEHOLDER — Closing CTA headline]"}
        subtitle={/* [PLACEHOLDER — e.g. "We'll design a trial specific to your crop, your soil, and your goals — no obligation."] */ "[PLACEHOLDER — One sentence. Specific, low-friction next step.]"}
        btnText="Design my trial"
        to="/contact"
      />
    </div>
  )
}
