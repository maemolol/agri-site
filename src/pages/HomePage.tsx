import { Link } from 'react-router-dom'
import { useSanity } from '@/hooks/useSanity'
import { HOMEPAGE_QUERY } from '@/lib/queries'
import { LoadingState, ErrorState, CTABand, CellVal, InsightCard } from '@/components/ui'
import type { HomepageData } from '@/types'

// Fallback data shown while Sanity loads (or if not yet populated)
const FALLBACK_STATS = [
  { number: '75',  unit: '%', label: 'Reduction in synthetic input use' },
  { number: '20',  unit: '+', label: 'Years of real-world field development' },
  { number: '1',   unit: '',  label: 'Integrated system — not another add-on' },
  { number: '3',   unit: '×', label: 'Average ROI vs conventional programs' },
]

const BENEFITS = [
  {
    icon: '💰',
    title: 'Cut your input costs',
    body: '[PLACEHOLDER — e.g. "Growers using Smart Blend report cutting their fertility spend by an average of 40% in the first season — without sacrificing yield."]',
  },
  {
    icon: '🌱',
    title: 'Stop fighting your soil',
    body: '[PLACEHOLDER — e.g. "Decades of synthetic programs deplete the biology your soil depends on. Smart Blend rebuilds it — turning your land into an asset, not a liability."]',
  },
  {
    icon: '🔄',
    title: 'One system. Not five products.',
    body: '[PLACEHOLDER — e.g. "Smart Blend replaces a shelf full of individual inputs with a single integrated approach. Less to manage. Less to buy. More consistent results."]',
  },
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
          {/* CTAs — primary action is low-friction ("See how it works"), not a hard sell */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/what-we-are" className="btn btn-outline-white" style={{ background: 'white', color: 'var(--navy)' }}>
              See how it works
            </Link>
            <Link to="/contact" className="btn btn-outline-white">
              Talk to a grower
            </Link>
          </div>
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

      {/* ── EDITORIAL: Problem ───────────────────────────────────────────── */}
      <section className="section grey">
        <div className="inner">
          <div className="two-col">
            <div className="two-col-img">
              {/* [PLACEHOLDER — Replace with a photo of: depleted soil, a frustrated
                  grower looking at input receipts, or a crop that underperformed.
                  Emotional, relatable imagery works better than stock here.] */}
              <div className="photo-placeholder" style={{ background: 'linear-gradient(135deg, #1a1a0a 0%, #3d3d1a 100%)' }}>
                📋
              </div>
            </div>
            <div>
              <span className="label-tag">Sound familiar?</span>
              <h2 className="section-heading">
                {/* [PLACEHOLDER — e.g. "More inputs. More decisions. Same problems."] */}
                More inputs. More decisions. Same problems.
              </h2>
              <p className="body-copy" style={{ marginBottom: '1rem' }}>
                {/* [PLACEHOLDER — Describe the grower's frustration in their own language.
                    e.g. "Every season you're adding another product to the program. Another
                    rep selling you something. Another input cost eating into your margin.
                    And yet the soil still isn't where it needs to be."] */}
                [PLACEHOLDER — Describe the grower's frustration. Every season, another product added to the program. Another rep, another input cost, the same soil problems.]
              </p>
              <p className="body-copy" style={{ marginBottom: '1.5rem' }}>
                {/* [PLACEHOLDER — The deeper insight: the system is broken, not the grower.
                    e.g. "The problem isn't that you're doing it wrong. The problem is that
                    conventional programs are designed to keep you buying — not to fix the
                    underlying biology that drives everything."] */}
                [PLACEHOLDER — The deeper insight: the system is designed to keep growers buying, not to fix the underlying biology.]
              </p>
              <Link to="/what-we-are" className="btn btn-navy">There's a better way →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL: Solution ──────────────────────────────────────────── */}
      <section className="section white">
        <div className="inner">
          <div className="two-col rev">
            <div className="two-col-img">
              {/* [PLACEHOLDER — Replace with a photo of: a healthy thriving crop,
                  a grower smiling in a field, or a side-by-side yield comparison.
                  The "after" image to contrast with the problem section above.] */}
              <div className="photo-placeholder" style={{ background: 'linear-gradient(135deg, #002a14 0%, #1a6b3a 100%)' }}>
                🌾
              </div>
            </div>
            <div>
              <span className="label-tag">The Smart Blend difference</span>
              <h2 className="section-heading">
                {/* [PLACEHOLDER — e.g. "One system. Built from 20 years in the field."] */}
                One system. Built from 20 years in the field.
              </h2>
              <p className="body-copy" style={{ marginBottom: '1rem' }}>
                {/* [PLACEHOLDER — Tom's story, briefly. A grower who got tired of the
                    conventional approach and spent 20 years building something better.
                    Real, specific, personal.] */}
                [PLACEHOLDER — Tom's story: 20 years of experimentation, real-world constraints, one grower's mission to build something that actually worked.]
              </p>
              <p className="body-copy" style={{ marginBottom: '1.5rem' }}>
                {/* [PLACEHOLDER — What Smart Blend actually is, in plain language.
                    e.g. "Smart Blend integrates fertility and biology into one program —
                    replacing the stack of products you're currently using with a single
                    system that works with your soil, not against it."] */}
                [PLACEHOLDER — Smart Blend integrates fertility and biology into one program — replacing the stack of products with a single system that works with the soil.]
              </p>
              <Link to="/who-we-are" className="btn btn-navy">Meet the team →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────────── */}
      <section className="section grey" style={{ paddingBottom: 0 }}>
        <div className="inner">
          <span className="label-tag">What changes</span>
          <h2 className="section-heading">What growers actually experience</h2>
          <p className="body-copy" style={{ maxWidth: '560px', marginBottom: '2rem' }}>
            {/* [PLACEHOLDER — One sentence framing: e.g. "This isn't about adding
                another product to your program. It's about changing what your
                program is built on."] */}
            [PLACEHOLDER — Frame this as a transformation, not a product feature list.]
          </p>
        </div>
      </section>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 var(--pad-x) clamp(3rem,6vw,5.5rem)' }}>
        <div className="product-grid">
          {BENEFITS.map(b => (
            <div key={b.title} className="product-card">
              <div className="product-card-icon">{b.icon}</div>
              <h3>{b.title}</h3>
              <p>{b.body}</p>
              <Link to="/what-we-are" className="btn-ghost">Learn more <span className="arrow">→</span></Link>
            </div>
          ))}
        </div>
      </div>

      {/* Growers voice */}
      <section className="section navy">
        <div className="inner" style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto' }}>
          <span className="label-tag" style={{ color: 'rgba(255,255,255,0.45)' }}>From the field</span>
          {/* [PLACEHOLDER — Replace with a real grower quote. First name, location,
              and crop type adds credibility. A photo of the grower or their farm
              alongside the quote makes this significantly more powerful.] */}
          <blockquote style={{
            fontFamily: 'var(--font-head)', fontSize: 'clamp(1.3rem, 2.5vw, 2rem)',
            fontStyle: 'italic', color: 'white', lineHeight: 1.45,
            margin: '1.5rem 0',
          }}>
            &ldquo;{data?.settings?.homeQuote ?? "[PLACEHOLDER — A real quote from a real grower. Specific results, in their own words. e.g. 'I cut my input spend by $40 an acre in year one and my corn yield actually went up. I'm not going back.']"}&rdquo;
          </blockquote>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em' }}>
            {data?.settings?.homeQuoteAuthor ?? '[PLACEHOLDER — Grower name, location, crop type]'}
          </p>
        </div>
      </section>

      {/* Comparison table */}
      {rows.length > 0 && (
        <section className="section grey">
          <div className="inner">
            <span className="label-tag">How we compare</span>
            <h2 className="section-heading">Smart Blend vs the conventional approach</h2>
            <p className="body-copy" style={{ marginBottom: '2rem', maxWidth: '580px' }}>
              {/* [PLACEHOLDER — Frame the comparison around grower outcomes, not
                  technical features. e.g. "We don't ask you to choose between
                  performance and sustainability. You get both."] */}
              [PLACEHOLDER — Frame the table around outcomes for the grower, not technical specs.]
            </p>
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

      {/* ── MARKETS STRIP ────────────────────────────────────────────────── */}
      {markets.length > 0 && (
        <div>
          <div className="inner" style={{ paddingTop: 'clamp(3rem,6vw,5.5rem)', paddingBottom: '1.5rem' }}>
            <span className="label-tag">Where it works</span>
            <h2 className="section-heading">Built for your operation</h2>
          </div>
          <div
            className="markets-strip"
            style={{ gridTemplateColumns: `repeat(${markets.length}, 1fr)` }}
          >
            {markets.map(m => (
              <Link key={m.slug} to={`/markets/${m.slug}`} className="markets-strip-cell">
                <div className="markets-strip-num">{m.displayNumber}</div>
                <h3>{m.name}</h3>
                <p>{m.overview.slice(0, 120)}…</p>
                <span className="btn-ghost" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem' }}>
                  See results <span className="arrow">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── VIDEO PLACEHOLDER ──────────────────────────────────────────────── */}
      <section className="section white">
        <div className="inner" style={{ textAlign: 'center' }}>
          <span className="label-tag">See it in action</span>
          <h2 className="section-heading" style={{ marginBottom: '0.5rem' }}>
            {/* [PLACEHOLDER — e.g. "Watch what happens when you work with nature"] */}
            [PLACEHOLDER — Video section heading]
          </h2>
          <p className="body-copy" style={{ maxWidth: '520px', margin: '0 auto 2rem' }}>
            {/* [PLACEHOLDER — One line introducing the video.] */}
            [PLACEHOLDER — Brief intro to the video content.]
          </p>
          {/* [PLACEHOLDER — Embed a YouTube or Vimeo video here. A field walkthrough
              with Tom, a before/after result, or a grower testimonial on camera
              will do more work than any text on this page.
              Replace this div with an <iframe> or a react-player component.] */}
          <div style={{
            maxWidth: '780px', margin: '0 auto',
            aspectRatio: '16/9', background: 'var(--navy)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: '1rem',
          }}>
            <div style={{ fontSize: '3rem' }}>▶</div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>
              [PLACEHOLDER — Video embed goes here]
            </p>
          </div>
        </div>
      </section>

      {/* ── INSIGHTS ─────────────────────────────────────────────────────── */}
      {insights.length > 0 && (
        <section className="section grey">
          <div className="inner">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="label-tag">From the field</span>
                <h2 className="section-heading">Results. Stories. Insights.</h2>
              </div>
              <Link to="/insights" className="btn-ghost">See everything <span className="arrow">→</span></Link>
            </div>
            <div className="insights-grid">
              {insights.map(i => (
                <InsightCard key={i._id} title={i.title} slug={i.slug} tag={i.tag} excerpt={i.excerpt} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final Call-to-Action */}
      <CTABand
        title={/* [PLACEHOLDER — e.g. "Ready to try a different approach?"] */ "Ready to try a different approach?"}
        subtitle={/* [PLACEHOLDER — e.g. "Talk to a grower who's already made the switch. No sales pitch — just real results."] */ "[PLACEHOLDER — Low-friction CTA. Talk to a grower, request a trial, or get a personalised recommendation.]"}
        btnText="Start the conversation"
      />
    </div>
  )
}
