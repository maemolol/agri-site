import { Link } from 'react-router-dom'
import { useSanity } from '@/hooks/useSanity'
import { ALL_TEAM_QUERY } from '@/lib/queries'
import { LoadingState, ErrorState, PageHero, CTABand } from '@/components/ui'
import { urlFor } from '@/lib/sanity.client'
import type { TeamMember } from '@/types'

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0] ?? '')
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function WhoWeArePage() {
  const { data: team, loading, error } = useSanity<TeamMember[]>(ALL_TEAM_QUERY)

  if (loading) return <LoadingState />
  if (error) return <ErrorState message="Failed to load team." />

  return (
    <div className="page-fade">
      <PageHero
        label="The Team"
        headline="Built by agronomists, scientists & growers"
        subheadline="Our team combines decades of soil science research with practical field experience across every major production system in North America."
      />

      <section className="section white">
        <div className="inner">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '2px',
              background: 'var(--grey-200)',
            }}
          >
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
                  display: 'block',
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
                    style={{ width: 72, height: 72, objectFit: 'cover', marginBottom: '1.25rem' }}
                  />
                ) : (
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      background: 'var(--navy)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-head)',
                      fontSize: '1.6rem',
                      fontWeight: 700,
                      color: 'rgba(255,255,255,0.5)',
                      marginBottom: '1.25rem',
                    }}
                  >
                  {getInitials(member.name)}
                  </div>
                )}

                {member.isCoFounder === true && (
                  <span
                    style={{
                      display: 'inline-block',
                      background: 'var(--red)',
                      color: 'white',
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      padding: '0.2rem 0.5rem',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Co-Founder
                  </span>
                )}

                <h3
                  style={{
                    fontFamily: 'var(--font-head)',
                    fontSize: '1.35rem',
                    fontWeight: 600,
                    color: 'var(--navy)',
                    marginBottom: '0.25rem',
                  }}
                >
                  {member.name}
                </h3>
                <div
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: 'var(--teal)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '0.85rem',
                  }}
                >
                  {member.role}
                </div>
                {member.quote != null && (
                  <blockquote
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--grey-500)',
                      lineHeight: 1.65,
                      fontStyle: 'italic',
                      borderLeft: '2px solid var(--grey-200)',
                      paddingLeft: '0.85rem',
                      marginBottom: '1.1rem',
                    }}
                  >
                    &ldquo;{member.quote}&rdquo;
                  </blockquote>
                )}
                <span className="btn-ghost" style={{ pointerEvents: 'none' }}>
                  Full profile <span className="arrow">→</span>
                </span>
              </Link>
            ))}
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
