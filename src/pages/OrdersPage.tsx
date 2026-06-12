import { useState, type ChangeEvent } from 'react'

const ACRES_PER_TOTE = 500

// ── HubSpot order form ────────────────────────────────────────────────────────
// Update data-form-id to your orders form ID from the HubSpot embed code.
// The script tag in index.html loads the HubSpot embed script.
function HubSpotOrderForm() {
  return (
    <div
      className="hs-form-frame"
      data-region="na2"
      data-form-id="[PLACEHOLDER — your orders form ID]"
      data-portal-id="246311807"
    />
  )
}

// ── Tote calculator ───────────────────────────────────────────────────────────
function ToteCalculator() {
  const [acres, setAcres] = useState('')

  const parsed = parseInt(acres, 10)
  const totes  = !isNaN(parsed) && parsed > 0
    ? Math.ceil(parsed / ACRES_PER_TOTE)
    : null

  return (
    <div style={{
      background: 'var(--teal-light)',
      border: '1px solid var(--teal)',
      padding: '1.5rem',
      marginBottom: '2.5rem',
    }}>
      <h3 style={{
        fontFamily: 'var(--font-head)', fontSize: '1rem',
        fontWeight: 600, color: 'var(--navy)', marginBottom: '0.4rem',
      }}>
        How many totes do I need?
      </h3>
      <p style={{ fontSize: '0.82rem', color: 'var(--grey-700)', marginBottom: '1rem' }}>
        1 tote treats {ACRES_PER_TOTE.toLocaleString()} acres.
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <label htmlFor="calc-acres" style={{
            fontSize: '0.75rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.08em',
            color: 'var(--navy)',
          }}>
            Your acres
          </label>
          <input
            id="calc-acres"
            type="number"
            min="1"
            value={acres}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setAcres(e.target.value)}
            placeholder="e.g. 1200"
            style={{
              fontFamily: 'var(--font-body)', fontSize: '0.9rem',
              padding: '0.55rem 0.75rem', border: '1.5px solid var(--teal)',
              width: '140px', outline: 'none', background: 'white',
            }}
          />
        </div>
        {totes !== null && (
          <div style={{
            background: 'var(--navy)', color: 'white',
            padding: '0.55rem 1.25rem', fontSize: '0.9rem', fontWeight: 700,
            alignSelf: 'flex-end',
          }}>
            → {totes} tote{totes !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function OrdersPage() {
  return (
    <div className="page-fade">

      {/* Hero */}
      <div className="page-hero">
        <div className="page-hero-inner">
          <span className="label-tag" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Place an order
          </span>
          <h1 className="section-heading white" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)' }}>
            Order Lípasma
          </h1>
          <p className="body-copy light" style={{ maxWidth: '520px', marginTop: '0.75rem' }}>
            Lípasma is sold by the tote. Each tote treats {ACRES_PER_TOTE.toLocaleString()} acres.
            Fill out the form below and we'll be in touch to confirm your order and arrange delivery.
          </p>
        </div>
      </div>

      <section className="section grey">
        <div className="inner">
          <div className="contact-layout">

            {/* Left — info + calculator */}
            <div>
              <h2 style={{
                fontFamily: 'var(--font-head)', fontSize: '1.6rem',
                fontWeight: 600, color: 'var(--navy)', marginBottom: '1rem',
              }}>
                Ordering is simple
              </h2>
              <p className="body-copy" style={{ marginBottom: '0.75rem' }}>
                Tell us how many totes you need and we'll confirm availability, pricing,
                and delivery to your operation.
              </p>
              <p className="body-copy" style={{ marginBottom: '2rem' }}>
                Not sure how many totes you need? Use the calculator below.
              </p>

              <ToteCalculator />

              {/* What you're ordering */}
              <div style={{
                background: 'var(--white)', padding: '1.75rem',
                border: '1px solid var(--grey-200)',
                borderTop: '3px solid var(--teal)',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-head)', fontSize: '1.1rem',
                  fontWeight: 600, color: 'var(--navy)', marginBottom: '1rem',
                }}>
                  What's in a tote
                </h3>
                {[
                  `Treats ${ACRES_PER_TOTE.toLocaleString()} acres per tote`,
                  'Lípasma — regenerative biological plant food',
                  'Works alongside your existing fertilizer program',
                  'No special equipment required for application',
                ].map((item) => (
                  <div key={item} style={{
                    display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
                    fontSize: '0.875rem', color: 'var(--grey-700)',
                    lineHeight: 1.6, marginBottom: '0.65rem',
                  }}>
                    <span style={{ color: 'var(--teal)', flexShrink: 0, fontWeight: 700 }}>✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — HubSpot order form */}
            <div style={{
              background: 'var(--white)',
              border: '1px solid var(--grey-200)',
              padding: '2.5rem',
            }}>
              <h3 style={{
                fontFamily: 'var(--font-head)', fontSize: '1.5rem',
                fontWeight: 600, color: 'var(--navy)', marginBottom: '0.4rem',
              }}>
                Request your order
              </h3>
              <p style={{
                fontSize: '0.85rem', color: 'var(--grey-500)',
                lineHeight: 1.6, marginBottom: '1.75rem',
              }}>
                Fill in your details below. We'll confirm availability and
                follow up within one business day.
              </p>

              {/* ── HubSpot form renders here ─────────────────────────────
                  Configure your HubSpot form to include:
                  - First Name (required)
                  - Last Name (required)
                  - Email (required)
                  - Phone
                  - Farm / Operation name
                  - State / Province
                  - Number of Totes (number field, required)
                  - Notes / Special instructions (textarea)
                  Set submit button to "Request Order"                     */}
              <HubSpotOrderForm />
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
