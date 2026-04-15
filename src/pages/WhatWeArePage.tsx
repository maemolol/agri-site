import { Link } from 'react-router-dom'
import { useSanity } from '@/hooks/useSanity'
import { WHAT_WE_ARE_QUERY } from '@/lib/queries'
import { LoadingState, ErrorState, PageHero, CTABand, RichText } from '@/components/ui'
import type { WhatWeArePage as TWhatWeArePage } from '@/types'
import imageUrlBuilder from '@sanity/image-url'
import { client } from "../lib/sanity.client"
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

const builder = imageUrlBuilder(client)

function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

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

      {/* ── WHAT IS THE PRODUCT ──────────────────────────────────────────── */}
      <section className="section white">
        <div className="inner">
          <div className='two-col'>
            {/* Text column */}
            <div>
              <span className="label-tag">What is the product</span>
              <h2 className="section-heading">
                {data?.productHeadline ?? '[PLACEHOLDER — Product headline]'}
              </h2>
              {data?.productSubheadline != null && (
                <p className="body-copy" style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                  {data.productSubheadline}
                </p>
              )}
              {data?.productDescription != null
                ? <RichText value={data.productDescription} />
                : <p className="body-copy">[PLACEHOLDER — Product description]</p>
              }
            </div>
            {/* Image column */}
            <div className="two-col-img" style={{aspectRatio: 'unset'}}>
              {data?.productImage?.url != null ? (
                <img
                  src={urlFor(data.productImage).height(675).fit('max').url()}
                  alt={data.productImage.alt ?? data.productHeadline ?? ''}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div className="photo-placeholder" style={{ background: 'linear-gradient(135deg, #002a14 0%, #1a6b3a 100%)' }}>
                  🌱
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="section grey">
        <div className="inner">
          <span className="label-tag">How it works</span>
          <h2 className="section-heading">Three things happening in a single application.</h2>
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

      {/* ── HOW TO APPLY ─────────────────────────────────────────────────── */}
      <section className="section grey">
        <div className="inner">
          <div className='two-col rev'>
            {/* Text column */}
            <div>
              <span className="label-tag">How to apply</span>
              <h2 className="section-heading">
                {data?.applicationHeadline ?? '[PLACEHOLDER — Application headline]'}
              </h2>
              {data?.applicationDescription != null
                ? <RichText value={data.applicationDescription} />
                : <p className="body-copy">[PLACEHOLDER — Application description]</p>
              }
            </div>
            {/* Image column */}
            <div className="two-col-img" style={{aspectRatio: 'unset'}}>
              {data?.applicationImage?.url != null ? (
                <img
                  src={urlFor(data.applicationImage).height(675).fit('max').url()}
                  alt={data.applicationImage.alt ?? data.applicationHeadline ?? ''}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div className="photo-placeholder" style={{ background: 'linear-gradient(135deg, #003057 0%, #00758d 100%)' }}>
                  🔬
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

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

      <CTABand
        title="Ready to change the math on your operation?"
        subtitle="Every farm is different. Let’s talk about your acres, your program, and what Lípasma could do for your bottom line. No pressure, no pitch… just a conversation between people who care about doing this right."
        btnText="See how it could work for my field"
        to="/contact"
      />
    </div>
  )
}
