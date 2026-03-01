import { Link } from 'react-router-dom'
import { PortableText, type PortableTextBlock } from '@portabletext/react'
import type { CellValue } from '@/types'

// ── LoadingState ──────────────────────────────────────────────────────────────
export function LoadingState({ message = 'Loading…' }: { message?: string }) {
  return (
    <div className="loading-state">
      <div className="spinner" />
      <span>{message}</span>
    </div>
  )
}

// ── ErrorState ────────────────────────────────────────────────────────────────
export function ErrorState({ message }: { message: string }) {
  return (
    <div className="error-state">
      <span>⚠ {message}</span>
      <Link to="/" className="btn-ghost">
        ← Return home <span className="arrow">→</span>
      </Link>
    </div>
  )
}

// ── Breadcrumb ────────────────────────────────────────────────────────────────
interface Crumb {
  label: string
  to?: string
}

export function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {crumbs.map((crumb, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {i > 0 && (
            <span className="breadcrumb-sep" aria-hidden="true">
              /
            </span>
          )}
          {crumb.to != null ? (
            <Link to={crumb.to} className="breadcrumb-item">
              {crumb.label}
            </Link>
          ) : (
            <span className="breadcrumb-item cur">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

// ── CTABand ───────────────────────────────────────────────────────────────────
interface CTABandProps {
  title: string
  subtitle?: string
  btnText?: string
  to?: string
}

export function CTABand({
  title,
  subtitle,
  btnText = 'Contact Us',
  to = '/contact',
}: CTABandProps) {
  return (
    <div className="cta-band">
      <div className="cta-band-inner">
        <div>
          <h2>{title}</h2>
          {subtitle != null && <p>{subtitle}</p>}
        </div>
        <Link to={to} className="btn btn-outline-white">
          {btnText} →
        </Link>
      </div>
    </div>
  )
}

// ── PageHero ──────────────────────────────────────────────────────────────────
interface PageHeroProps {
  label?: string
  headline: string
  subheadline?: string
  crumbs?: Crumb[]
}

export function PageHero({ label, headline, subheadline, crumbs }: PageHeroProps) {
  return (
    <div className="page-hero">
      <div className="page-hero-inner">
        {crumbs != null && <Breadcrumb crumbs={crumbs} />}
        {label != null && (
          <span className="label-tag" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {label}
          </span>
        )}
        <h1 className="section-heading white">{headline}</h1>
        {subheadline != null && (
          <p className="body-copy light" style={{ maxWidth: '560px', marginTop: '0.75rem' }}>
            {subheadline}
          </p>
        )}
      </div>
    </div>
  )
}

// ── CellVal ───────────────────────────────────────────────────────────────────
export function CellVal({ v }: { v: CellValue }) {
  const map: Record<CellValue, React.ReactNode> = {
    y:   <span className="cell-y">✓</span>,
    n:   <span className="cell-n">✕</span>,
    p:   <span className="cell-p">Partial</span>,
    m:   <span className="cell-mid">Moderate</span>,
    g:   <span className="cell-good">Low</span>,
    hi:  <span className="cell-good">High</span>,
    bad: <span className="cell-bad">High</span>,
  }
  return <>{map[v] ?? v}</>
}

// ── RichText ──────────────────────────────────────────────────────────────────
// Uses @portabletext/react's own PortableTextBlock type (not our local one)
// to avoid "duplicate identifier" TypeScript errors.
export function RichText({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="portable-text">
      <PortableText value={value} />
    </div>
  )
}

// ── InsightCard ───────────────────────────────────────────────────────────────
interface InsightCardProps {
  title: string
  slug: string
  tag?: string
  excerpt: string
}

export function InsightCard({ title, slug, tag, excerpt }: InsightCardProps) {
  return (
    <Link
      to={`/insights/${slug}`}
      className="insight-card"
      style={{ display: 'block', textDecoration: 'none' }}
    >
      {tag != null && <span className="insight-tag">{tag}</span>}
      <h3>{title}</h3>
      <p>{excerpt}</p>
      <span className="btn-ghost">
        Read more <span className="arrow">→</span>
      </span>
    </Link>
  )
}
