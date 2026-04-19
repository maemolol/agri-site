import { Link } from 'react-router-dom'
import { useSanity } from '@/hooks/useSanity'
import { ALL_TEAM_QUERY, WHO_WE_ARE_QUERY } from '@/lib/queries'
import { LoadingState, ErrorState, PageHero, CTABand, RichText } from '@/components/ui'
import { urlFor } from '@/lib/sanity.client'
import type { TeamMember, WhoWeArePage as TWhoWeArePage } from '@/types'

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0] ?? '')
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function WhoWeArePage() {
  const { data: page } = useSanity<TWhoWeArePage>(WHO_WE_ARE_QUERY)
  const { data: team, loading, error } = useSanity<TeamMember[]>(ALL_TEAM_QUERY)

  if (loading) return <LoadingState />
  if (error) return <ErrorState message="Failed to load team." />

  return (
    <div className="page-fade">
      <PageHero
        label="The Team"
        headline={page?.headline ?? "Built by agronomists, scientists & growers"}
        subheadline={page?.subheadline ?? "Our team combines decades of soil science research with practical field experience across every major production system in North America."}
      />

      {page?.companyDescription != null && (
        <section className="section white" style={{ paddingBottom: 0 }}>
          <div className="inner">
            <div className="two-col">
              <div>
                <RichText value={page.companyDescription} />
              </div>
              <div className="two-col-img" style={{aspectRatio: 'unset'}}>
                {page?.companyImage?.url != null ? (
                  <img
                    src={urlFor(page.companyImage).height(675).fit('max').url()}
                    alt={page.companyImage.alt ?? page.headline ?? ''}
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
      )}

      <section className="section white">
        <div className="inner">
          <div className="two-col" style={{ alignItems: 'start' }}>
            <div className="team-grid">
              {(team ?? []).map((member: TeamMember) => (
                <Link
                  key={member.slug}
                  to={`/team/${member.slug}`}
                  style={{
                    background: 'var(--white)',
                    padding: '2.25rem 2rem',
                    borderTop: '3px solid transparent',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s, background 0.2s',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    const el = e.currentTarget
                    el.style.borderTopColor = 'var(--red)'
                    el.style.background = 'var(--grey-50)'
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    const el = e.currentTarget
                    el.style.borderTopColor = 'transparent'
                    el.style.background = 'var(--white)'
                  }}
                >
                  {member.photo?.url ? (
                    <img
                      src={urlFor(member.photo).width(300).height(300).fit('crop').url()}
                      alt={member.photo.alt ?? member.name}
                      style={{ width: 72, height: 72, objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{
                      width: 72, height: 72,
                      background: 'var(--navy)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-head)', fontSize: '1.6rem',
                      fontWeight: 700, color: 'rgba(255,255,255,0.5)',
                    }}>
                      {getInitials(member.name)}
                    </div>
                  )}

                  <div style={{ marginTop: '0.75rem', marginBottom: '0.5rem', minHeight: '1.4rem' }}>
                    {member.isCoFounder === true && (
                      <span style={{
                        display: 'inline-block',
                        background: 'var(--red)', color: 'white',
                        fontSize: '0.62rem', fontWeight: 700,
                        letterSpacing: '0.1em', textTransform: 'uppercase',
                        padding: '0.2rem 0.5rem',
                      }}>
                        Co-Founder
                      </span>
                    )}
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-head)', fontSize: '1.35rem',
                    fontWeight: 600, color: 'var(--navy)', marginBottom: '0.25rem',
                  }}>
                    {member.name}
                  </h3>

                  <div style={{
                    fontSize: '0.78rem', fontWeight: 700, color: 'var(--teal)',
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                    marginBottom: '0.85rem',
                  }}>
                    {member.role}
                  </div>

                  {member.quote != null && (
                    <blockquote style={{
                      fontSize: '0.875rem', color: 'var(--grey-500)',
                      lineHeight: 1.65, fontStyle: 'italic',
                      borderLeft: '2px solid var(--grey-200)',
                      paddingLeft: '0.85rem', marginBottom: '1.1rem',
                    }}>
                      &ldquo;{member.quote}&rdquo;
                    </blockquote>
                  )}

                  <span className="btn-ghost" style={{ pointerEvents: 'none', marginTop: 'auto' }}>
                    Full profile <span className="arrow">→</span>
                  </span>
                </Link>
              ))}
            </div>

            {/* Right — podcast links */}
            {(page?.podcastLinks ?? []).length > 0 && (
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-head)', fontSize: '1.2rem',
                  fontWeight: 600, color: 'var(--navy)',
                  marginBottom: '1.25rem', paddingBottom: '0.75rem',
                  borderBottom: '2px solid var(--red)',
                }}>
                  Learn more about Tom Costamagna
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {page?.podcastLinks?.map((pod) => (
                    <a
                      key={pod.url}
                      href={pod.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'block', padding: '1.25rem',
                        border: '1px solid var(--grey-200)',
                        borderLeft: '3px solid var(--teal)',
                        textDecoration: 'none',
                        transition: 'border-color 0.2s, background 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--teal-light)'
                        e.currentTarget.style.borderLeftColor = 'var(--navy)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.borderLeftColor = 'var(--teal)'
                      }}
                    >
                      <div style={{
                        fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase',
                        letterSpacing: '0.1em', color: 'var(--teal)', marginBottom: '0.3rem',
                      }}>
                        🎙 {pod.show ?? 'Podcast'}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-head)', fontSize: '1rem',
                        fontWeight: 600, color: 'var(--navy)', marginBottom: '0.4rem',
                        lineHeight: 1.35,
                      }}>
                        {pod.title}
                      </div>
                      {pod.description != null && (
                        <p style={{
                          fontSize: '0.82rem', color: 'var(--grey-500)',
                          lineHeight: 1.55, margin: 0,
                        }}>
                          {pod.description}
                        </p>
                      )}
                      <span style={{
                        display: 'inline-block', marginTop: '0.6rem',
                        fontSize: '0.78rem', fontWeight: 600, color: 'var(--teal)',
                      }}>
                        Listen →
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <CTABand
        title="Work with our agronomy team"
        subtitle="Available for field consultations, trial design, and program development."
        btnText="Get in Touch"
      />
    </div>
  )
}
