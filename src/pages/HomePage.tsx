import { Link } from 'react-router-dom'
import { useSanity } from '@/hooks/useSanity'
import { HOMEPAGE_QUERY } from '@/lib/queries'
import { LoadingState, ErrorState, CTABand, CellVal, InsightCard, RichText } from '@/components/ui'
import type { HomepageData } from '@/types'
import imageUrlBuilder from '@sanity/image-url'
import { client } from "../lib/sanity.client"
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

const builder = imageUrlBuilder(client)

function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Fallback data shown while Sanity loads (or if not yet populated)
const FALLBACK_STATS = [
  { number: '75',  unit: '%', label: 'Reduction in synthetic input use' },
  { number: '20',  unit: '+', label: 'Years of real-world field development' },
  { number: '1',   unit: '',  label: 'Integrated system — not another add-on' },
  { number: '3',   unit: '×', label: 'Average ROI vs conventional programs' },
]

export default function HomePage() {
  const { data, loading, error } = useSanity<HomepageData>(HOMEPAGE_QUERY)

  if (loading) return <LoadingState />
  if (error)   return <ErrorState message="Failed to load page content." />

  const stats    = data?.settings?.heroStats?.length ? data.settings.heroStats : FALLBACK_STATS
  const markets  = data?.markets ?? []
  const rows     = data?.comparison?.rows ?? []
  const insights = data?.insights ?? []

  return (
    <div className="page-fade">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{
        position: 'relative', minHeight: '600px',
        display: 'flex', alignItems: 'center',
        overflow: 'hidden', background: 'var(--navy-mid)',
      }}>
        {/* Background gradient — replace with a real field photo in production */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(0,30,57,0.95) 45%, rgba(0,30,57,0.5) 100%), linear-gradient(160deg, #002040 0%, #004b6e 50%, #003d5c 100%)',
        }} />
        {/* Right-side accent panel — will sit behind a photo once added */}
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%',
          background: 'linear-gradient(135deg, rgba(0,117,141,0.15) 0%, rgba(0,48,87,0.05) 100%)',
          clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0% 100%)',
        }} />
        {/* [PLACEHOLDER — replace background gradient with a real hero image:
            A wide shot of a healthy crop, a grower walking fields, or
            a before/after soil comparison. The image should feel aspirational,
            not clinical.] */}
        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: 'var(--max-w)', margin: '0 auto',
          padding: '6rem var(--pad-x) 5rem', width: '100%',
        }}>
          {/* Eyebrow — identity/movement tagline */}
          <span style={{
            display: 'inline-block', background: 'var(--teal)', color: 'white',
            fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', padding: '0.35rem 1rem', marginBottom: '1.75rem',
          }}>
            Recovering Fertaholic? You're in the right place.
          </span>
          {/* Main headline — customer pain + promise, not product description */}
          <h1 style={{
            fontFamily: 'var(--font-head)', fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
            fontWeight: 600, lineHeight: 1.08, color: 'white',
            maxWidth: '680px', marginBottom: '1.5rem',
          }}>
            {data?.settings?.heroHeadline ?? 'Cutting-edge soil biology for measurable crop returns'}
          </h1>
          {/* Subheadline — the promise, simply stated */}
          <p style={{
            fontSize: '1.1rem', color: 'rgba(255,255,255,0.78)',
            maxWidth: '540px', lineHeight: 1.75, marginBottom: '2.5rem',
          }}>
            {data?.settings?.heroSubheadline
              ?? '[PLACEHOLDER — One or two sentences that complete the promise. e.g. "Smart Blend is one integrated system that replaces multiple inputs, rebuilds your soil biology, and gives you measurable results — season after season."]'}
          </p>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <div style={{ background: 'var(--navy)' }}>
        <div className="stats-bar inner" style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 var(--pad-x)' }}>
          {stats.map(s => (
            <div key={s.label} className="stats-bar-cell">
              <div className="stats-bar-number">
                {s.number}<span className="stats-bar-unit">{s.unit}</span>
              </div>
              <div className="stats-bar-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── WHAT IS THE PRODUCT ──────────────────────────────────────────── */}
      <section className="section white">
        <div className="inner">
          <div className='two-col'>
            {/* Text column */}
            <div>
              <span className="label-tag">What is the product</span>
              <h2 className="section-heading">
                {data?.settings?.productHeadline ?? '[PLACEHOLDER — Product headline]'}
              </h2>
              {data?.settings?.productSubheadline != null && (
                <p className="body-copy" style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                  {data.settings.productSubheadline}
                </p>
              )}
              {data?.settings?.productDescription != null
                ? <RichText value={data.settings.productDescription} />
                : <p className="body-copy">[PLACEHOLDER — Product description]</p>
              }
            </div>
            {/* Image column */}
            <div className="two-col-img" style={{aspectRatio: 'unset'}}>
              {data?.settings?.productImage?.url != null ? (
                <img
                  src={urlFor(data.settings.productImage).height(675).fit('max').url()}
                  alt={data.settings.productImage.alt ?? data.settings.productHeadline ?? ''}
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
          <div className="two-col rev">
            <div>
              <span className="label-tag">{data?.settings?.worksHeadline ?? "How it works"}</span>
              <h2 className="section-heading">{data?.settings?.worksSubheadline ?? "Three things happening in a single application."}</h2>
              <div className="home-pillars-grid">
                {data?.settings?.worksPillars?.map(p => (
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
            <div className="two-col-img" style={{aspectRatio: 'unset'}}>
              {data?.settings?.worksImage?.url != null ? (
                <img
                  src={urlFor(data.settings.worksImage).height(675).fit('max').url()}
                  alt={data.settings.worksImage.alt ?? data.settings.worksHeadline ?? ''}
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

      {/* ── HOW TO APPLY ─────────────────────────────────────────────────── */}
      <section className="section white">
        <div className="inner">
          <div className='two-col rev'>
            {/* Text column */}
            <div>
              <span className="label-tag">How to apply</span>
              <h2 className="section-heading">
                {data?.settings?.applicationHeadline ?? '[PLACEHOLDER — Application headline]'}
              </h2>
              {data?.settings?.applicationDescription != null
                ? <RichText value={data.settings.applicationDescription} />
                : <p className="body-copy">[PLACEHOLDER — Application description]</p>
              }
            </div>
            {/* Image column */}
            <div className="two-col-img" style={{aspectRatio: 'unset'}}>
              {data?.settings?.applicationImage?.url != null ? (
                <img
                  src={urlFor(data.settings.applicationImage).height(675).fit('max').url()}
                  alt={data.settings.applicationImage.alt ?? data.settings.applicationHeadline ?? ''}
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

      {/* ── Origin story ──────────────────────────────────────────── */}
      <section className="section grey">
        <div className="inner">
          <div className="two-col rev">
            <div className="two-col-img">
              {/* [PLACEHOLDER — Replace with a photo of: a healthy thriving crop,
                  a grower smiling in a field, or a side-by-side yield comparison.
                  The "after" image to contrast with the problem section above.] */}
              {data?.settings?.originImage?.url != null ? (
                <img
                  src={urlFor(data.settings.originImage).height(675).fit('max').url()}
                  alt={data.settings.originImage.alt ?? data.settings.applicationHeadline ?? ''}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div className="photo-placeholder" style={{ background: 'linear-gradient(135deg, #003057 0%, #00758d 100%)' }}>
                  🌽
                </div>
              )}
            </div>
            <div>
              <span className="label-tag">The Smart Blend difference</span>
              <h2 className="section-heading">
                {data?.settings?.originHeading ?? "One system. Built from 20 years in the field."}
              </h2>
              <p className="body-copy" style={{ marginBottom: '1rem' }}>
                {data?.settings?.originBody != null ? <RichText value={data.settings.originBody} /> : "[PLACEHOLDER — Tom's story: 20 years of experimentation, real-world constraints, one grower's mission to build something that actually worked.]"}
              </p>
              <Link to="/who-we-are" className="btn btn-navy">Meet the team →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      {rows.length > 0 && (
        <section className="section white">
          <div className="inner">
            <span className="label-tag">How we compare</span>
            <h2 className="section-heading">Smart Blend vs the conventional approach</h2>
            <div className="comparison-wrap">
              <table className="comp-table">
                <thead>
                  <tr>
                    <th>What matters to growers</th>
                    <th className="highlight">Smart Blend</th>
                    <th>Synthetic Programs</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(r => (
                    <tr key={r.feature}>
                      <td>{r.feature}</td>
                      <td><CellVal v={r.inoculant} /></td>
                      <td><CellVal v={r.synthetic} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ── WHAT IS THE PRODUCT ──────────────────────────────────────────── */}
      <section className="section grey">
        <div className="inner">
          <div className='two-col'>
            {/* Text column */}
            <div>
              <span className="label-tag">Results</span>
              <h2 className="section-heading">
                {data?.settings?.resultsHeadline ?? '[PLACEHOLDER — Results headline]'}
              </h2>
              {data?.settings?.resultsDescription != null
                ? <RichText value={data.settings.resultsDescription} />
                : <p className="body-copy">[PLACEHOLDER — Results description]</p>
              }
            </div>
            {/* Image column */}
            <div className="two-col-img" style={{aspectRatio: 'unset'}}>
              {data?.settings?.resultsImage?.url != null ? (
                <img
                  src={urlFor(data.settings.resultsImage).height(675).fit('max').url()}
                  alt={data.settings.resultsImage.alt ?? data.settings.productHeadline ?? ''}
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

      {/* Final Call-to-Action */}
      <CTABand
        title="Ready to change the math on your operation?"
        subtitle="Every farm is different. Let’s talk about your acres, your program, and what Lípasma could do for your bottom line. No pressure, no pitch… just a conversation between people who care about doing this right."
        btnText="See how it could work for my field"
      />
    </div>
  )
}
