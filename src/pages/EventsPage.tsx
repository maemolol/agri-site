import { useSanity } from '@/hooks/useSanity'
import { EventsPage as TEventsPage } from '@/types'
import { EVENTS_QUERY } from '@/lib/queries'
import imageUrlBuilder from '@sanity/image-url'
import { client } from "../lib/sanity.client"
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

const builder = imageUrlBuilder(client)
const PHONE = "+1 555 555 5555"

function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

function HubSpotForm() {
  return (
    <div
      className="hs-form-frame"
      data-region="na2"
      data-form-id="132b5d04-320a-4bf8-bc43-5e881c7c6017"
      data-portal-id="246311807"
    />
  )
}

const TRIALS = [
  {
    year: '2024',
    title: 'Spring Wheat Trial',
    body: 'Side-by-side against 160 lbs/acre of a 50-30-10 synthetic blend. 14 days after the second application, the Lípasma-only plot matched it.',
  },
  {
    year: '2025',
    title: 'Winter Wheat Trial',
    body: 'Four 160-acre plots at varying fertilizer rates. Protein averaged 13.05% across all plots, including the no-fertilizer plots.',
  },
  {
    year: '2025',
    title: 'Spring Wheat Trial',
    body: '50% reduced fertilizer plus Lípasma hit 15.3% protein.',
  },
]

const AGENDA = [
  'Meet the Smart Blend growers. Ask them anything.',
  'Walk the fields. See how Lípasma has performed on wheat and alfalfa, in real conditions, in real Montana soil.',
  'Federal Regenerative Rebate update. Hear what the rebate could mean for your operation.',
  'Open Q&A. No scripted answers. No pressure.',
  'Lunch on us.',
]

const DOUBTS = [
  '"Urea prices are dictating what kind of year I\'m going to have."',
  '"I\'m spending more on fertilizer every year and I\'m not sure I\'m getting more out of it."',
  '"I\'ve tried biologicals before. Most didn\'t do what the salesman said they would."',
  '"Changing my whole operation to try something new is too risky."',
]

// ── Shared styles ─────────────────────────────────────────────────────────────
const sectionLabel: React.CSSProperties = {
  display: 'inline-block',
  fontSize: '0.68rem', fontWeight: 700,
  letterSpacing: '0.15em', textTransform: 'uppercase',
  color: 'var(--teal)', marginBottom: '0.75rem',
}

const saveSeatBtn: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
  background: 'var(--red)', color: 'white',
  fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 700,
  padding: '0.9rem 2rem', border: 'none', cursor: 'pointer',
  textDecoration: 'none', transition: 'background 0.2s',
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function EventsPage() {
  const { data, loading, error } = useSanity<TEventsPage>(EVENTS_QUERY)

  const EVENT = {
    name: data?.eventName ?? '[PLACEHOLDER — e.g. "Smart Blend Field Day 2025"]',
    date: data?.eventDate ?? '[PLACEHOLDER — e.g. "Saturday 14 June 2025"]',
    time: data?.eventTime ?? '[PLACEHOLDER — e.g. "9:00 AM – 3:00 PM"]',
    location: data?.eventLocation ?? '[PLACEHOLDER — e.g. "Smith Family Farm, 123 Rural Road, Toowoomba QLD"]',
    details:  data?.eventDescription ?? '[PLACEHOLDER — A paragraph describing what attendees will see and do. Live soil demonstrations, trial result presentations, Q&A with Tom, lunch provided, etc.]',
    capacity: data?.eventCapacity ?? '[PLACEHOLDER — e.g. "Limited to 120 growers"]',
  }

  return (
    <div className="page-fade">

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
          [PLACEHOLDER — Replace the gradient background with a high-resolution
          photo of a field trial or Lípasma being applied. Use it as a CSS
          background-image on the outer section div, with a dark overlay.]
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative',
        minHeight: '560px',
        display: 'flex', alignItems: 'center',
        background: 'var(--navy-mid)',
        overflow: 'hidden',
      }}>
        {/* Dark overlay — sits on top of hero image once added */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(0,24,48,0.92) 50%, rgba(0,24,48,0.6) 100%)',
        }} />

        {/* [PLACEHOLDER — add background hero image here:
            style={{ backgroundImage: 'url(/your-field-photo.jpg)',
                     backgroundSize: 'cover', backgroundPosition: 'center' }}
            on the outer <section> element above ] */}

        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: 'var(--max-w)', margin: '0 auto',
          padding: 'clamp(4rem,8vw,7rem) var(--pad-x)',
          width: '100%',
        }}>
          <span style={{ ...sectionLabel, color: 'rgba(255,255,255,0.5)' }}>
            {data?.eventDate} · {data?.eventLocation}
          </span>
          <h1 style={{
            fontFamily: 'var(--font-head)',
            fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
            fontWeight: 600, lineHeight: 1.1,
            color: 'white', maxWidth: '700px',
            marginBottom: '1.5rem',
          }}>
            Cut Your Fertilizer Bill in Half Without Cutting Your Yield
          </h1>
          <p style={{
            fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)',
            maxWidth: '540px', lineHeight: 1.7, marginBottom: '2.5rem',
          }}>
            Come see how your neighboring farms are doing it. {data?.eventDate} in {data?.eventLocation}.
          </p>
          <a href="#register" style={saveSeatBtn}>
            Save My Seat ↓
          </a>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 2 — REGISTRATION
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--grey-50)', padding: 'clamp(4rem,7vw,6rem) var(--pad-x)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <div className="contact-layout">

            {/* Left — copy */}
            <div>
              <h2 style={{
                fontFamily: 'var(--font-head)',
                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                fontWeight: 600, color: 'var(--navy)',
                lineHeight: 1.2, marginBottom: '1.5rem',
              }}>
                The math on your input program stopped adding up years ago
              </h2>

              <p className="body-copy" style={{ marginBottom: '1rem' }}>
                Most conventional fertilizer has a nutrient efficiency rate of 40–60%. The rest
                leaches, volatilizes, or gets locked in the soil where roots can't reach it.
                You've been paying for nutrition that never reaches the plant.
              </p>
              <p className="body-copy" style={{ marginBottom: '1rem' }}>
                A small group of Montana wheat growers spent the last two seasons proving
                there's a better way. By adding a single biological application to their
                existing program, they cut synthetic fertilizer by 50% and held their yields.
              </p>
              <p className="body-copy" style={{ marginBottom: '2rem' }}>
                In 2026, Lípasma will be applied to over 50,000 acres.
              </p>

              <p className="body-copy" style={{ fontWeight: 600, color: 'var(--navy)', marginBottom: '1rem' }}>
                If any of this sounds familiar, this day is for you:
              </p>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
                {DOUBTS.map((d) => (
                  <li key={d} style={{
                    fontSize: '0.9rem', color: 'var(--grey-700)',
                    lineHeight: 1.6, fontStyle: 'italic',
                    paddingLeft: '1.25rem',
                    borderLeft: '3px solid var(--teal)',
                  }}>
                    {d}
                  </li>
                ))}
              </ul>

              <p className="body-copy" style={{ fontWeight: 600, color: 'var(--navy)' }}>
                We've been there. And that's why we're not asking you to take our word for it.
              </p>
            </div>

            {/* Right — HubSpot form */}
            <div id="register" style={{
              background: 'var(--white)',
              border: '1px solid var(--grey-200)',
              padding: '2.5rem',
            }}>
              <h3 style={{
                fontFamily: 'var(--font-head)', fontSize: '1.6rem',
                fontWeight: 600, color: 'var(--navy)', marginBottom: '0.5rem',
              }}>
                Register
              </h3>
              <p style={{
                fontSize: '0.875rem', color: 'var(--grey-500)',
                lineHeight: 1.6, marginBottom: '1.75rem',
              }}>
                Seating is limited. We want a real conversation, not a packed room. RSVP below
                and we'll send you a confirmation email with directions and a quick agenda.
              </p>

              {/* ── HubSpot form renders here ───────────────────────────── */}
              {/* Configure your form in HubSpot to include:
                  - First Name (required)
                  - Last Name (required)
                  - Email (required)
                  - Bringing a Guest? (Yes/No dropdown)
                  - Guest Name (conditional — shown if above is Yes)
                  Set the submit button label to "Save My Seat" in HubSpot.   */}
              <HubSpotForm />

              <p style={{
                marginTop: '1.5rem', fontSize: '0.8rem',
                color: 'var(--grey-500)', lineHeight: 1.6,
              }}>
                
           
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 3 — RESULTS
          [PLACEHOLDER — Add aerial side-by-side field photos from the deck.
          Replace the placeholder divs below with <img> tags once available.]
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--white)', padding: 'clamp(4rem,7vw,6rem) var(--pad-x)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <span style={sectionLabel}>Field-validated</span>
          <h2 style={{
            fontFamily: 'var(--font-head)',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 600, color: 'var(--navy)',
            marginBottom: '1rem', lineHeight: 1.2,
          }}>
            See The Results For Yourself
          </h2>
          <p className="body-copy" style={{ maxWidth: '620px', marginBottom: '3rem' }}>
            The growers who've already run Lípasma will be there to tell you what they're
            seeing, and you'll get to walk the fields where it was applied.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5px',
            background: 'var(--grey-200)',
            marginBottom: '3rem',
          }}>
            {TRIALS.map((t) => (
              <div key={t.title + t.year} style={{
                background: 'var(--white)', padding: '2rem',
                borderTop: '3px solid var(--teal)',
              }}>
                <div style={{
                  fontSize: '0.7rem', fontWeight: 700,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'var(--teal)', marginBottom: '0.4rem',
                }}>
                  {t.year}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-head)', fontSize: '1.2rem',
                  fontWeight: 600, color: 'var(--navy)', marginBottom: '0.75rem',
                }}>
                  {t.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--grey-700)', lineHeight: 1.65 }}>
                  {t.body}
                </p>
              </div>
            ))}
          </div>

          {/* [PLACEHOLDER — Aerial side-by-side photos from the deck go here.
              Suggested layout: two images side by side with a caption below each.
              Replace these divs with <img> tags once you have the files.] */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div key="control-plot">
              {data?.controlPlotImage?.url != null ? (
                <img
                  src={urlFor(data.controlPlotImage).height(675).fit('max').url()}
                  alt={data.controlPlotImage.alt ?? 'Control plot aerial image'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div className="photo-placeholder" style={{ background: 'linear-gradient(135deg, #002a14 0%, #1a6b3a 100%)' }}>
                  🌱
                </div>
              )}
              <p style={{
                fontSize: '0.78rem', color: 'var(--grey-500)',
                textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic',
              }}>
                Control plot
              </p>
            </div>
            <div key="lipasma-plot">
              {data?.lipasmaPlotImage?.url != null ? (
                <img
                  src={urlFor(data.lipasmaPlotImage).height(675).fit('max').url()}
                  alt={data.lipasmaPlotImage.alt ?? 'Control plot aerial image'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div className="photo-placeholder" style={{ background: 'linear-gradient(135deg, #002a14 0%, #1a6b3a 100%)' }}>
                  🌱
                </div>
              )}
              <p style={{
                fontSize: '0.78rem', color: 'var(--grey-500)',
                textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic',
              }}>
                Lípasma plot
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 4 — DETAILS & AGENDA
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--navy)', padding: 'clamp(4rem,7vw,6rem) var(--pad-x)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <div className="two-col" style={{ alignItems: 'start' }}>

            {/* What to expect */}
            <div>
              <span style={{ ...sectionLabel, color: 'rgba(255,255,255,0.45)' }}>
                What to expect
              </span>
              <h2 style={{
                fontFamily: 'var(--font-head)',
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                fontWeight: 600, color: 'white',
                marginBottom: '2rem', lineHeight: 1.2,
              }}>
                Details and What To Expect
              </h2>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {AGENDA.map((item) => (
                  <li key={item} style={{
                    display: 'flex', gap: '0.85rem', alignItems: 'flex-start',
                    fontSize: '0.925rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.65,
                  }}>
                    <span style={{ color: 'var(--white)', flexShrink: 0, marginTop: '2px' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Event details card */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '2.5rem',
            }}>
              <h3 style={{
                fontFamily: 'var(--font-head)', fontSize: '1.3rem',
                fontWeight: 600, color: 'white', marginBottom: '1.75rem',
                paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)',
              }}>
                Details
              </h3>
              {[
                { icon: '🏷️', label: 'Name', value: EVENT.name},
                { icon: '📅', label: 'Date', value: EVENT.date },
                { icon: '🕐', label: 'Time', value: EVENT.time },
                { icon: '📍', label: 'Location', value: EVENT.location },
                { icon: '👥', label: 'Capacity', value: EVENT.capacity},
                { icon: '🍽️', label: 'Lunch', value: 'Provided' },
              ].map((d) => (
                <div key={d.label} style={{
                  display: 'flex', gap: '1rem', alignItems: 'flex-start',
                  marginBottom: '1.25rem', paddingBottom: '1.25rem',
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                }}>
                  <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{d.icon}</span>
                  <div>
                    <div style={{
                      fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase',
                      letterSpacing: '0.1em', color: 'var(--white)', marginBottom: '0.25rem',
                    }}>
                      {d.label}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.55, whiteSpace: 'pre-line' }}>
                      {d.value}
                    </div>
                  </div>
                </div>
              ))}
              <a href="#register" style={{ ...saveSeatBtn, width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
                Save My Seat ↑
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 5 — WHO WE ARE
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--grey-50)', padding: 'clamp(4rem,7vw,6rem) var(--pad-x)' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <span style={sectionLabel}>About us</span>
          <h2 style={{
            fontFamily: 'var(--font-head)',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
            fontWeight: 600, color: 'var(--navy)',
            marginBottom: '1.25rem', lineHeight: 1.2,
          }}>
            Who We Are
          </h2>
          <p className="body-copy" style={{ marginBottom: '1rem' }}>
            Smart Blend Technology was founded by five partners — farmers and scientists —
            who got tired of paying for inputs that don't perform. Lípasma is our first
            product, a regenerative plant food that works alongside your existing program
            rather than replacing it.
          </p>
          <p className="body-copy" style={{ marginBottom: '2.5rem' }}>
            You can read our full story here:{' '}
            <a
              href="https://smartblendtechnology.com/who-we-are"
              style={{ color: 'var(--teal)', fontWeight: 600 }}
            >
              smartblendtechnology.com/who-we-are
            </a>
          </p>
          <a href="#register" style={saveSeatBtn}>
            Save My Seat ↑
          </a>
        </div>
      </section>

    </div>
  )
}
