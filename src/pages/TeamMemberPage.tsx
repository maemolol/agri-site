import { Link, useParams } from 'react-router-dom'
import { useSanity } from '@/hooks/useSanity'
import { TEAM_MEMBER_QUERY } from '@/lib/queries'
import { LoadingState, ErrorState, Breadcrumb, CTABand, RichText } from '@/components/ui'
import { urlFor } from '@/lib/sanity.client'
import type { TeamMember } from '@/types'

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part: string) => part[0] ?? '')
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function TeamMemberPage() {
  // useParams always returns string | undefined for optional segments
  const { slug } = useParams<{ slug: string }>()

  const { data: member, loading, error } = useSanity<TeamMember>(
    TEAM_MEMBER_QUERY,
    { slug },
    [slug],
  )

  if (loading) return <LoadingState />
  if (error != null || member == null) return <ErrorState message="Team member not found." />

  const initials = getInitials(member.name)
  const firstName = member.name.split(' ')[0] ?? member.name

  return (
    <div className="page-fade">
      <div className="page-hero">
        <div className="page-hero-inner">
          <Breadcrumb
            crumbs={[{ label: 'Who We Are', to: '/who-we-are' }, { label: member.name }]}
          />
          <span className="label-tag" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {member.role}
          </span>
          <h1 className="section-heading white">{member.name}</h1>
        </div>
      </div>

      <section className="section white">
        <div className="inner">
          <Link to="/who-we-are" className="back-btn">
            ← Back to Team
          </Link>

          <div className="detail-layout detail-layout--team">
            {/* Avatar column */}
            <div>
              {member.photo?.url != null ? (
                <img
                  src={urlFor(member.photo).width(560).height(746).fit('crop').url()}
                  alt={member.photo.alt ?? member.name}
                  style={{ width: '100%', display: 'block' }}
                />
              ) : (
                <div
                  style={{
                    background: 'var(--navy)',
                    aspectRatio: '3/4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-head)',
                    fontSize: '5rem',
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.2)',
                  }}
                >
                  {initials}
                </div>
              )}

              <div
                style={{
                  marginTop: '1rem',
                  padding: '1.25rem',
                  background: 'var(--grey-50)',
                  border: '1px solid var(--grey-200)',
                }}
              >
                <div
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--teal)',
                    marginBottom: '0.35rem',
                  }}
                >
                  Role
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--navy)', fontWeight: 600 }}>
                  {member.role}
                </div>
              </div>
            </div>

            {/* Bio column */}
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-head)',
                  fontSize: '1.6rem',
                  fontWeight: 600,
                  color: 'var(--navy)',
                  marginBottom: '1rem',
                }}
              >
                Background
              </h2>

              {member.bio != null ? (
                <RichText value={member.bio} />
              ) : (
                <p className="body-copy">Full biography coming soon.</p>
              )}

              {member.quote != null && (
                <blockquote
                  style={{
                    fontFamily: 'var(--font-head)',
                    fontSize: '1.5rem',
                    fontStyle: 'italic',
                    color: 'var(--navy)',
                    borderLeft: '4px solid var(--red)',
                    paddingLeft: '1.5rem',
                    margin: '2rem 0 2.5rem',
                    lineHeight: 1.45,
                  }}
                >
                  &ldquo;{member.quote}&rdquo;
                </blockquote>
              )}

              <Link to="/contact" className="btn btn-navy">
                Contact {firstName}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Talk to our experts"
        subtitle="Our team is available for field consultations and program design."
        btnText="Contact Us"
      />
    </div>
  )
}
