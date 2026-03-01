import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

// ── SiteNav ───────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: 'Product', to: '/what-we-are' },
  { label: 'Markets', to: '/markets/row-crops' },
  { label: 'Who We Are', to: '/who-we-are' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
]

export function SiteNav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="site-nav">
        <div className="nav-inner">
          {/* Logo */}
          <Link to="/" className="nav-logo">
            <img src="/logo.png" alt="Smart Blend Technology" />
          </Link>

          {/* Desktop links */}
          <ul className="nav-links">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive ? 'nav-item nav-item--active' : 'nav-item'
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="nav-right">
            <Link to="/contact" className="nav-cta">
              Request a Trial
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="mobile-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? 'mobile-nav-item mobile-nav-item--active' : 'mobile-nav-item'
              }
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────
const FOOTER_COLS = [
  {
    heading: 'Products',
    links: [
      { label: 'Complete Inoculant', to: '/what-we-are' },
      { label: 'Science & Formulation', to: '/what-we-are' },
      { label: 'Safety Data Sheets', to: '/contact' },
    ],
  },
  {
    heading: 'Markets',
    links: [
      { label: 'Row Crops', to: '/markets/row-crops' },
      { label: 'Specialty Crops', to: '/markets/specialty-crops' },
      { label: 'Turf & Ornamentals', to: '/markets/turf-ornamentals' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Who We Are', to: '/who-we-are' },
      { label: 'Agronomy Insights', to: '/insights' },
      { label: 'Contact Us', to: '/contact' },
    ],
  },
]

interface SiteFooterProps {
  tagline?: string
}

export function SiteFooter({ tagline }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo-block">
            <img src="/logo.png" alt="Smart Blend Technology"/>
          </div>
          <p className="footer-desc">
            {tagline ??
              'Science-formulated soil inoculants for measurable agronomic ROI across row crops, specialty crops, and managed turf.'}
          </p>
        </div>

        {FOOTER_COLS.map((col) => (
          <div key={col.heading} className="footer-col">
            <h4>{col.heading}</h4>
            <ul>
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Smart Blend Technology. All rights reserved.</span>
        <span>Privacy Policy · Terms of Use</span>
      </div>
    </footer>
  )
}

// ── AppShell ──────────────────────────────────────────────────────────────────
interface AppShellProps {
  children: React.ReactNode
  footerTagline?: string
}

export function AppShell({ children, footerTagline }: AppShellProps) {
  return (
    <div className="app-shell">
      <SiteNav />
      <main className="app-main">{children}</main>
      <SiteFooter tagline={footerTagline} />
    </div>
  )
}
