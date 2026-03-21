import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useSanity } from '@/hooks/useSanity'
import { ALL_MARKETS_QUERY } from '@/lib/queries'
import { PageHero } from '@/components/ui'
import type { Market } from '@/types'

// ── Types ─────────────────────────────────────────────────────────────────────

interface FormState {
  name: string
  email: string
  company: string
  market: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const FORMSPREE_URL = `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID ?? ''}`
type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error'

type InputChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>

// ── Constants ─────────────────────────────────────────────────────────────────

const INITIAL_FORM: FormState = {
  name: '',
  email: '',
  company: '',
  market: '',
  message: '',
}

const CONTACT_ITEMS: { icon: string; label: string }[] = [
  { icon: '🌱', label: 'Field Trial Design & Protocol' },
  { icon: '📊', label: 'ROI & Performance Data Requests' },
  { icon: '🧪', label: 'Product Specifications & SDS' },
  { icon: '🤝', label: 'Distributor & Partner Inquiries' },
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// ── Validation ────────────────────────────────────────────────────────────────

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {}
  if (form.name.trim() === '') errors.name = 'Required'
  if (form.email.trim() === '') {
    errors.email = 'Required'
  } else if (!EMAIL_RE.test(form.email)) {
    errors.email = 'Invalid email address'
  }
  if (form.message.trim() === '') errors.message = 'Required'
  return errors
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const { data: markets } = useSanity<Market[]>(ALL_MARKETS_QUERY)

  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')

  function updateField(field: keyof FormState) {
    return (e: InputChangeEvent) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setStatus('sending')

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          ...(form.company !== '' && { company: form.company }),
          ...(form.market !== '' && { market: form.market }),
          message: form.message,
        }),
      })

      if (res.ok) {
        setStatus('sent')
      } else {
        if (import.meta.env.DEV) {
          const body = await res.json().catch(() => null)
          console.error('[Formspree] Submission failed:', res.status, body)
        }
        setStatus('error')
      }
    } catch (err) {
      if (import.meta.env.DEV) console.error('[Formspree] Network error:', err)
      setStatus('error')
    }
  }

  return (
    <div className="page-fade">
      <PageHero
        label="Get in Touch"
        headline="Contact Us"
        subheadline="Speak with an agronomist, request a field trial, or get product specifications for your operation."
      />

      <section className="section grey">
        <div className="inner">
          <div className="contact-layout">
            {/* ── Sidebar ───────────────────────────────────────────────── */}
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-head)',
                  fontSize: '2rem',
                  fontWeight: 600,
                  color: 'var(--navy)',
                  marginBottom: '1rem',
                }}
              >
                How Can We Help?
              </h2>
              <p className="body-copy" style={{ marginBottom: '1.5rem' }}>
                Whether you&rsquo;re evaluating Smart Blend for the first time or designing a
                multi-field trial program, our agronomists are ready to support you.
              </p>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {CONTACT_ITEMS.map((item) => (
                  <li
                    key={item.label}
                    style={{
                      display: 'flex',
                      gap: '0.75rem',
                      alignItems: 'flex-start',
                      fontSize: '0.875rem',
                      color: 'var(--grey-700)',
                    }}
                  >
                    <span style={{ color: 'var(--teal)' }}>{item.icon}</span>
                    {item.label}
                  </li>
                ))}
              </ul>

              <div
                style={{
                  marginTop: '2rem',
                  padding: '1.5rem',
                  background: 'white',
                  border: '1px solid var(--grey-200)',
                  borderLeft: '3px solid var(--teal)',
                }}
              >
                <div
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--teal)',
                    marginBottom: '0.4rem',
                  }}
                >
                  Response Time
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--grey-700)', lineHeight: 1.6 }}>
                  All inquiries receive a response within one business day. Field trial requests are
                  connected directly to a regional agronomist.
                </div>
              </div>
            </div>

            {/* ── Form ──────────────────────────────────────────────────── */}
            <div
              style={{
                background: 'var(--white)',
                border: '1px solid var(--grey-200)',
                padding: '2.5rem',
              }}
            >
              {status === 'sent' ? (
                <div style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-head)',
                      fontSize: '1.8rem',
                      fontWeight: 600,
                      color: 'var(--navy)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Message Received
                  </h3>
                  <p style={{ color: 'var(--grey-500)', fontSize: '0.9rem' }}>
                    Thank you, {form.name}. A member of our agronomy team will be in touch within
                    one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h3
                    style={{
                      fontFamily: 'var(--font-head)',
                      fontSize: '1.4rem',
                      fontWeight: 600,
                      color: 'var(--navy)',
                      marginBottom: '1.75rem',
                    }}
                  >
                    Send a Message
                  </h3>

                  {status === 'error' && (
                    <div
                      role="alert"
                      style={{
                        marginBottom: '1.5rem',
                        padding: '0.875rem 1rem',
                        background: '#fff0f0',
                        border: '1.5px solid var(--red)',
                        color: 'var(--red)',
                        fontSize: '0.875rem',
                        lineHeight: 1.5,
                      }}
                    >
                      <strong>Submission failed.</strong> Please check your connection and try
                      again, or email us directly if the problem persists.
                    </div>
                  )}

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">
                        Full Name <span className="required-star">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={form.name}
                        onChange={updateField('name')}
                        placeholder="Jane Smith"
                        aria-describedby={errors.name != null ? 'name-error' : undefined}
                      />
                      {errors.name != null && (
                        <span id="name-error" className="form-error" role="alert">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">
                        Email Address <span className="required-star">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={updateField('email')}
                        placeholder="jane@operation.com"
                        aria-describedby={errors.email != null ? 'email-error' : undefined}
                      />
                      {errors.email != null && (
                        <span id="email-error" className="form-error" role="alert">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="company">Company / Operation</label>
                      <input
                        id="company"
                        type="text"
                        value={form.company}
                        onChange={updateField('company')}
                        placeholder="Smith Farms LLC"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="market">Primary Market</label>
                      <select
                        id="market"
                        value={form.market}
                        onChange={updateField('market')}
                      >
                        <option value="">Select a market…</option>
                        {(markets ?? []).map((m: Market) => (
                          <option key={m.slug} value={m.slug}>
                            {m.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">
                      Message <span className="required-star">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={form.message}
                      onChange={updateField('message')}
                      placeholder="Tell us about your operation and what you'd like to achieve…"
                      aria-describedby={errors.message != null ? 'message-error' : undefined}
                    />
                    {errors.message != null && (
                      <span id="message-error" className="form-error" role="alert">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-red"
                    style={{ width: '100%', justifyContent: 'center' }}
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? 'Sending…' : 'Submit Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
