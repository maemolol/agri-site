import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

// ── TopBar ────────────────────────────────────────────────────────────────────
export function TopBar() {
  const links = [
    { label: 'Safety Data Sheets', href: '#' },
    { label: 'Careers', href: '#' },
  ]
  return (
    <div className="topbar">
      {links.map((l) => (
        <a key={l.label} href={l.href} className="topbar-link">{l.label}</a>
      ))}
    </div>
  )
}

// ── SiteNav ───────────────────────────────────────────────────────────────────
// Primary nav — shown in the main navigation bar
const PRIMARY_NAV = [
  { label: 'Home',        to: '/' },
  { label: 'Who We Are',  to: '/who-we-are' },
  { label: 'Events',      to: '/events' },
  { label: 'Contact Us',  to: '/contact' },
]

// Secondary nav — shown as smaller links in the topbar, full links in footer
const SECONDARY_NAV = [
  { label: 'Lípasma',  to: '/what-we-are' },
  { label: 'Markets',  to: '/markets/row-crops' },
  { label: 'Insights', to: '/insights' },
]

export function SiteNav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Secondary nav bar — sits above main nav on desktop */}
      <div className="secondary-nav-bar">
        <div className="secondary-nav-inner">
          {SECONDARY_NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? 'secondary-nav-item secondary-nav-item--active' : 'secondary-nav-item'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
      <nav className="site-nav">
        <div className="nav-inner">
          {/* Logo */}
          <Link to="/" className="nav-logo">
            <img src="/logo.png" alt="Smart Blend Technology" />
          </Link>

          {/* Desktop primary links */}
          <ul className="nav-links">
            {PRIMARY_NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
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
            <Link to="/events" className="nav-cta">Register for Field Day</Link>
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
          {PRIMARY_NAV.map((item) => (
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
          <div className="mobile-nav-divider" />
          {SECONDARY_NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? 'mobile-nav-item mobile-nav-item--secondary mobile-nav-item--active' : 'mobile-nav-item mobile-nav-item--secondary'
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
    heading: 'Company',
    links: [
      { label: 'Who We Are',  to: '/who-we-are' },
      { label: 'Events',      to: '/events' },
      { label: 'Contact Us',  to: '/contact' },
    ],
  },
  {
    heading: 'Product',
    links: [
      { label: 'Lapazma',           to: '/what-we-are' },
      { label: 'Safety Data Sheets', to: '/contact' },
    ],
  },
  {
    heading: 'Explore',
    links: [
      { label: 'Markets',  to: '/markets/row-crops' },
      { label: 'Insights', to: '/insights' },
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
            {tagline ?? 'Recovering Fertaholic? So are we. Smart Blend is the integrated soil biology system that helps growers do more with less — season after season.'}
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
      <TopBar />
      <SiteNav />
      <main className="app-main">{children}</main>
      <SiteFooter tagline={footerTagline} />
    </div>
  )
}
