import { useState, type ChangeEvent, type FormEvent } from 'react'
import { PageHero, CTABand } from '@/components/ui'

// ── Event details ─────────────────────────────────────────────────────────────
// [PLACEHOLDER — Update these constants with real event details before launch.
//  These are used throughout the page so you only need to change them here.]
const EVENT = {
  name:     '[PLACEHOLDER — e.g. "Smart Blend Field Day 2025"]',
  date:     '[PLACEHOLDER — e.g. "Saturday 14 June 2025"]',
  time:     '[PLACEHOLDER — e.g. "9:00 AM – 3:00 PM"]',
  location: '[PLACEHOLDER — e.g. "Smith Family Farm, 123 Rural Road, Toowoomba QLD"]',
  details:  '[PLACEHOLDER — A paragraph describing what attendees will see and do. Live soil demonstrations, trial result presentations, Q&A with Tom, lunch provided, etc.]',
  capacity: '[PLACEHOLDER — e.g. "Limited to 120 growers"]',
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface FormState {
  name: string
  phone: string
  email: string
  operation: string
  cropType: string
  attending: string
}

interface FormErrors {
  name?: string
  phone?: string
  email?: string
}

type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error'

type InputChangeEvent = ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>

const INITIAL_FORM: FormState = {
  name: '',
  phone: '',
  email: '',
  operation: '',
  cropType: '',
  attending: '1',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[\d\s\+\-\(\)]{7,}$/

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {}
  if (form.name.trim() === '') errors.name = 'Required'
  if (form.email.trim() === '') {
    errors.email = 'Required'
  } else if (!EMAIL_RE.test(form.email)) {
    errors.email = 'Invalid email address'
  }
  if (form.phone.trim() === '') {
    errors.phone = 'Required'
  } else if (!PHONE_RE.test(form.phone)) {
    errors.phone = 'Invalid phone number'
  }
  return errors
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function EventsPage() {
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
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setStatus('sending')

    try {
      const body = new URLSearchParams({
        'form-name': 'events',
        'bot-field': '',
        name:        form.name,
        phone:       form.phone,
        email:       form.email,
        attending:   form.attending,
        event:       EVENT.name,
      })

      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })

      if (res.ok) {
        setStatus('sent')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="page-fade">
      <PageHero
        label="Upcoming events"
        headline="Smart Blend Field Day"
        subheadline="See Lapazma in action. Talk to growers who are already using it. Walk the trials yourself."
      />

      {/* ── EVENT DETAILS ──────────────────────────────────────────────────── */}
      <section className="section white">
        <div className="inner">
          <div className="contact-layout">

            {/* Event info sidebar */}
            <div>
              <h2 style={{
                fontFamily: 'var(--font-head)', fontSize: '1.75rem',
                fontWeight: 600, color: 'var(--navy)', marginBottom: '1.5rem',
              }}>
                {EVENT.name}
              </h2>

              {/* Details list */}
              {[
                { icon: '📅', label: 'Date',     value: EVENT.date },
                { icon: '🕘', label: 'Time',     value: EVENT.time },
                { icon: '📍', label: 'Location', value: EVENT.location },
                { icon: '👥', label: 'Capacity', value: EVENT.capacity },
              ].map((item) => (
                <div key={item.label} style={{
                  display: 'flex', gap: '1rem', alignItems: 'flex-start',
                  marginBottom: '1rem', paddingBottom: '1rem',
                  borderBottom: '1px solid var(--grey-100)',
                }}>
                  <span style={{ fontSize: '1.25rem', flexShrink: 0, marginTop: '2px' }}>
                    {item.icon}
                  </span>
                  <div>
                    <div style={{
                      fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase',
                      letterSpacing: '0.1em', color: 'var(--teal)', marginBottom: '0.2rem',
                    }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--grey-700)', lineHeight: 1.55 }}>
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}

              <p className="body-copy" style={{ marginTop: '1.5rem' }}>
                {EVENT.details}
              </p>
            </div>

            {/* Registration form */}
            <div style={{
              background: 'var(--white)',
              border: '1px solid var(--grey-200)',
              padding: '2.5rem',
            }}>
              {status === 'sent' ? (
                // ── Success ──────────────────────────────────────────────────
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                  <h3 style={{
                    fontFamily: 'var(--font-head)', fontSize: '1.8rem',
                    fontWeight: 600, color: 'var(--navy)', marginBottom: '0.5rem',
                  }}>
                    You're registered!
                  </h3>
                  <p style={{ color: 'var(--grey-500)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    Thanks, {form.name}. We've got you down for the Smart Blend Field Day.
                    You'll receive a confirmation email at <strong>{form.email}</strong> shortly,
                    with a reminder closer to the date.
                  </p>
                </div>
              ) : (
                // ── Form ─────────────────────────────────────────────────────
                <form onSubmit={handleSubmit} noValidate>
                  <h3 style={{
                    fontFamily: 'var(--font-head)', fontSize: '1.4rem',
                    fontWeight: 600, color: 'var(--navy)', marginBottom: '0.4rem',
                  }}>
                    Register your spot
                  </h3>
                  <p style={{
                    fontSize: '0.85rem', color: 'var(--grey-500)',
                    marginBottom: '1.75rem', lineHeight: 1.5,
                  }}>
                    Free to attend. We'll send you a confirmation and reminder by email.
                  </p>

                  {status === 'error' && (
                    <div role="alert" style={{
                      marginBottom: '1.5rem', padding: '0.875rem 1rem',
                      background: '#fff0f0', border: '1.5px solid var(--red)',
                      color: 'var(--red)', fontSize: '0.875rem', lineHeight: 1.5,
                    }}>
                      <strong>Registration failed.</strong> Please check your connection and
                      try again, or contact us directly if the problem persists.
                    </div>
                  )}

                  {/* Name + Phone */}
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="evt-name">
                        Full Name <span className="required-star">*</span>
                      </label>
                      <input
                        id="evt-name" type="text"
                        value={form.name} onChange={updateField('name')}
                        placeholder="Jane Smith"
                        aria-describedby={errors.name ? 'evt-name-error' : undefined}
                      />
                      {errors.name && (
                        <span id="evt-name-error" className="form-error" role="alert">
                          {errors.name}
                        </span>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="evt-phone">
                        Phone <span className="required-star">*</span>
                      </label>
                      <input
                        id="evt-phone" type="tel"
                        value={form.phone} onChange={updateField('phone')}
                        placeholder="0400 000 000"
                        aria-describedby={errors.phone ? 'evt-phone-error' : undefined}
                      />
                      {errors.phone && (
                        <span id="evt-phone-error" className="form-error" role="alert">
                          {errors.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="form-group">
                    <label htmlFor="evt-email">
                      Email Address <span className="required-star">*</span>
                    </label>
                    <input
                      id="evt-email" type="email"
                      value={form.email} onChange={updateField('email')}
                      placeholder="jane@operation.com"
                      aria-describedby={errors.email ? 'evt-email-error' : undefined}
                    />
                    {errors.email && (
                      <span id="evt-email-error" className="form-error" role="alert">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Number attending */}
                  <div className="form-group">
                    <label htmlFor="evt-attending">Number Attending</label>
                    <select
                      id="evt-attending"
                      value={form.attending}
                      onChange={updateField('attending')}
                    >
                      {['1','2','3','4','5+'].map((n) => (
                        <option key={n} value={n}>{n} {n === '1' ? 'person' : 'people'}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-red"
                    style={{ width: '100%', justifyContent: 'center' }}
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? 'Registering…' : 'Reserve my spot'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Can't make it to this event?"
        subtitle="Get in touch and we'll make sure you hear about future field days and trial opportunities."
        btnText="Contact us"
        to="/contact"
      />
    </div>
  )
}
