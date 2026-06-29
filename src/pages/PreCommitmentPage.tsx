import { useRef, useEffect } from 'react'
import type { PrecommitmentPage as TPrecommitmentPage } from '@/types'
import { PRECOMMITMENT_QUERY } from '@/lib/queries'
import { useSanity } from '@/hooks/useSanity'
import { RichText } from '@/components/ui'

const PORTAL_ID   = '246311807'
const FORM_ID     = '02083a29-7f3b-4eb0-81d8-64729ab5c505'

function HubSpotForm() {
  return (
    <div
      className="hs-form-frame"
      data-region="na2"
      data-form-id={FORM_ID}
      data-portal-id={PORTAL_ID}
    />
  )
}

export default function PreCommitmentPage() {
  const { data, loading, error } = useSanity<TPrecommitmentPage>(PRECOMMITMENT_QUERY)

  return (
    <div className="page-fade">

      {/* Hero */}
      <div className="page-hero">
        <div className="page-hero-inner">
          <span className="label-tag" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Early commitment
          </span>
          <h1 className="section-heading white" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)' }}>
            2027 Lípasma Commitment
          </h1>
          <p className="body-copy light" style={{ maxWidth: '540px', marginTop: '0.75rem' }}>
            {data?.pageSubheading ?? "Secure your allocation for the 2027 season. Complete the form below and we'll be in touch to confirm your commitment and discuss delivery."}
          </p>
        </div>
      </div>

      <section className="section grey">
        <div className="inner">
          <div className="contact-layout">

            {/* Left — info */}
            <div>
              <h2 style={{
                fontFamily: 'var(--font-head)', fontSize: '1.6rem',
                fontWeight: 600, color: 'var(--navy)', marginBottom: '1rem',
              }}>
                {data?.subheader ?? "Why commit early?"}
              </h2>
              
              {/* [PLACEHOLDER — e.g. reasons to commit early: locked pricing,
                guaranteed allocation, early delivery scheduling, etc.] */}
              {data?.bodyCopy != null
                ? <RichText value={data.bodyCopy} />
                : <p className="body-copy" style={{ marginBottom: '0.85rem' }}>[PLACEHOLDER — Explain the benefits of committing early for the 2027 season.]</p>
              }

              <div style={{
                background: 'var(--white)', padding: '1.5rem',
                border: '1px solid var(--grey-200)',
                borderLeft: '3px solid var(--teal)',
              }}>
                <div style={{
                  fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.1em', color: 'var(--teal)', marginBottom: '0.4rem',
                }}>
                  Remember
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--grey-700)', lineHeight: 1.6, margin: 0 }}>
                  1 tote treats 500 acres. Not sure how many you need?{' '}
                  <a href="/orders" style={{ color: 'var(--teal)', fontWeight: 600 }}>
                    Use the calculator on the orders page.
                  </a>
                </p>
              </div>
            </div>

            {/* Right — HubSpot form */}
            <div style={{
              background: 'var(--white)',
              border: '1px solid var(--grey-200)',
              padding: '2.5rem',
            }}>
              <h3 style={{
                fontFamily: 'var(--font-head)', fontSize: '1.5rem',
                fontWeight: 600, color: 'var(--navy)', marginBottom: '0.4rem',
              }}>
                Register your commitment
              </h3>
              <p style={{
                fontSize: '0.85rem', color: 'var(--grey-500)',
                lineHeight: 1.6, marginBottom: '1.75rem',
              }}>
                Fill in your details and we'll confirm your allocation within
                one business day.
              </p>
              <HubSpotForm />
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}