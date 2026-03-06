import { Link } from 'react-router-dom'
import { useSanity } from '@/hooks/useSanity'
import { HOMEPAGE_QUERY } from '@/lib/queries'
import { LoadingState, ErrorState, CTABand, CellVal, InsightCard } from '@/components/ui'
import type { HomepageData } from '@/types'

// Fallback data shown while Sanity loads (or if not yet populated)
const FALLBACK_STATS = [
  { number: '47', unit: '%', label: 'Average nutrient uptake increase' },
  { number: '3', unit: '×', label: 'ROI vs synthetic-only programs' },
  { number: '60', unit: '%', label: 'Reduction in synthetic N dependency' },
  { number: '12', unit: '+', label: 'Beneficial microbial species' },
]

const PRODUCTS = [
  { icon: '🧫', title: 'Soil Biology',       body: '12+ beneficial species in a stabilization matrix that maintains viability from production through field application — eliminating the viability gap that undermines competing products.' },
  { icon: '🌿', title: 'Nutrient Efficiency', body: 'N-fixing bacteria and mycorrhizal networks reduce synthetic fertilizer requirements by 40–60% while improving plant uptake efficiency across all macronutrients.' },
  { icon: '🛡️', title: 'Plant Resilience',   body: 'Immune-priming biology and trichoderma reduce susceptibility to soil-borne disease, abiotic stress, and performance losses tied to extreme weather events.' },
]

export default function HomePage() {
  const { data, loading, error } = useSanity<HomepageData>(HOMEPAGE_QUERY)

  if (loading) return <LoadingState />
  if (error)   return <ErrorState message="Failed to load page content." />

  const stats   = data?.settings?.heroStats?.length ? data.settings.heroStats : FALLBACK_STATS
  const markets = data?.markets ?? []
  const rows    = data?.comparison?.rows ?? []
  const insights = data?.insights ?? []

  return (
    <div className="page-fade">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{
        position: 'relative', minHeight: '540px',
        display: 'flex', alignItems: 'flex-end',
        overflow: 'hidden', background: 'var(--navy-mid)',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(0,30,57,0.9) 40%, rgba(0,30,57,0.4) 100%), linear-gradient(160deg, #002040 0%, #004b6e 50%, #003d5c 100%)',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '55%',
          background: 'linear-gradient(135deg, rgba(0,117,141,0.2) 0%, rgba(0,48,87,0.1) 100%)',
          clipPath: 'polygon(8% 0, 100% 0, 100% 100%, 0% 100%)',
        }} />
        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: 'var(--max-w)', margin: '0 auto',
          padding: '5rem var(--pad-x) 4rem', width: '100%',
        }}>
          <span style={{
            display: 'inline-block', background: 'var(--red)', color: 'white',
            fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.14em',
            textTransform: 'uppercase', padding: '0.3rem 0.75rem', marginBottom: '1.5rem',
          }}>
            Complete Soil & Plant Health Inoculant
          </span>
          <h1 style={{
            fontFamily: 'var(--font-head)', fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 600, lineHeight: 1.1, color: 'white',
            maxWidth: '600px', marginBottom: '1.25rem',
          }}>
            {data?.settings?.heroHeadline ?? 'Cutting-edge soil biology for measurable crop returns'}
          </h1>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.75)', maxWidth: '520px', lineHeight: 1.7, marginBottom: '2.25rem' }}>
            {data?.settings?.heroSubheadline ?? 'Our commitment to science drives us to deliver a biologically complete inoculant that rebuilds soil microbial communities, improves nutrient uptake, and reduces synthetic input dependency — season after season.'}
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-red">Request a Field Trial</Link>
            <Link to="/what-we-are" className="btn btn-outline-white">Learn the Science</Link>
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

      {/* ── PRODUCTS ─────────────────────────────────────────────────────── */}
      <section className="section white" style={{ paddingBottom: 0 }}>
        <div className="inner">
          <span className="label-tag">Agronomy Products</span>
          <h2 className="section-heading">A platform built for professional producers</h2>
        </div>
      </section>
      <div style={{ maxWidth: 'var(--max-w)', margin: '2rem auto 0', padding: '0 var(--pad-x)' }}>
        <div className="product-grid">
          {PRODUCTS.map(c => (
            <div key={c.title} className="product-card">
              <div className="product-card-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
              <Link to="/what-we-are" className="btn-ghost">Learn more <span className="arrow">→</span></Link>
            </div>
          ))}
        </div>
      </div>

      {/* ── EDITORIAL: Problem ───────────────────────────────────────────── */}
      <section className="section grey">
        <div className="inner">
          <div className="two-col">
            <div className="two-col-img">
              <div className="photo-placeholder" style={{ background: 'linear-gradient(135deg, #002a14 0%, #1a6b3a 100%)' }}>🌱</div>
            </div>
            <div>
              <span className="label-tag">The Challenge</span>
              <h2 className="section-heading">Modern agriculture has a soil biology crisis</h2>
              <p className="body-copy" style={{ marginBottom: '1rem' }}>Decades of tillage and synthetic inputs have stripped 60–70% of native microbial diversity from commercial farmland. Without biology, inputs underperform — growers spend more and get less.</p>
              <p className="body-copy" style={{ marginBottom: '1.5rem' }}>Up to 50% of applied nitrogen is lost before crop uptake in biologically depleted soils. Sustainability mandates and premium buyer programs are accelerating the need for verified low-input production data.</p>
              <Link to="/what-we-are" className="btn btn-navy">See our solution →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL: Solution ──────────────────────────────────────────── */}
      <section className="section white">
        <div className="inner">
          <div className="two-col rev">
            <div className="two-col-img">
              <div className="photo-placeholder" style={{ background: 'linear-gradient(135deg, #003057 0%, #00758d 100%)' }}>🔬</div>
            </div>
            <div>
              <span className="label-tag">Research & Innovation</span>
              <h2 className="section-heading">Science-driven. Field-validated.</h2>
              <p className="body-copy" style={{ marginBottom: '1rem' }}>Smart Blend is formulated on 15+ years of soil microbiome research. Our proprietary stabilization technology keeps 12+ microbial species viable from production through application.</p>
              <p className="body-copy" style={{ marginBottom: '1.5rem' }}>Every strain is selected for documented performance in commercial agricultural environments, validated across 400+ commercial field trials in partnership with university extension programs.</p>
              <Link to="/what-we-are" className="btn btn-navy">Our science platform →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ─────────────────────────────────────────────── */}
      {rows.length > 0 && (
        <section className="section grey">
          <div className="inner">
            <span className="label-tag">How We Compare</span>
            <h2 className="section-heading">Not all soil amendments are equal</h2>
            <p className="body-copy" style={{ marginBottom: '2rem', maxWidth: '580px' }}>
              See why professional growers choose a biologically complete approach over conventional alternatives.
            </p>
            <div className="comparison-wrap">
              <table className="comp-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th className="highlight">Your Mix</th>
                    <th>Synthetic Fertilizers</th>
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
        <div className="markets-strip" style={{ gridTemplateColumns: `repeat(${markets.length}, 1fr)` }}>
          {markets.map(m => (
            <Link key={m.slug} to={`/markets/${m.slug}`} className="markets-strip-cell">
              <div className="markets-strip-num">{m.displayNumber}</div>
              <h3>{m.name}</h3>
              <p>{m.overview.slice(0, 120)}…</p>
              <span className="btn-ghost" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem' }}>
                Explore market <span className="arrow">→</span>
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* ── INSIGHTS ─────────────────────────────────────────────────────── */}
      <section className="section white">
        <div className="inner">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="label-tag">Agronomy Insights</span>
              <h2 className="section-heading">Research. Field data. Perspectives.</h2>
            </div>
            <Link to="/insights" className="btn-ghost">View all insights <span className="arrow">→</span></Link>
          </div>
          <div className="insights-grid">
            {insights.length > 0
              ? insights.map(i => <InsightCard key={i._id} title={i.title} slug={i.slug} tag={i.tag} excerpt={i.excerpt} />)
              : <p className="body-copy" style={{ gridColumn: '1/-1' }}>Insights coming soon.</p>
            }
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to run a field trial?"
        subtitle="Our agronomists will design a protocol matched to your operation."
        btnText="Contact an Agronomist"
      />
    </div>
  )
}
