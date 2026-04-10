import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { AppShell } from '@/components/layout'
import { LoadingState } from '@/components/ui'
import { useSanity } from '@/hooks/useSanity'
import { SITE_SETTINGS_QUERY } from '@/lib/queries'
import type { HomeSiteSettings } from '@/types'

// ── Lazy pages (each route is its own chunk) ──────────────────────────────────
const HomePage = lazy(() => import('@/pages/HomePage'))
const WhatWeArePage = lazy(() => import('@/pages/WhatWeArePage'))
const WhoWeArePage = lazy(() => import('@/pages/WhoWeArePage'))
const TeamMemberPage = lazy(() => import('@/pages/TeamMemberPage'))
const MarketPage = lazy(() => import('@/pages/MarketPage'))
const InsightsPage = lazy(() => import('@/pages/InsightsPage'))
const InsightDetailPage = lazy(() => import('@/pages/InsightDetailPage'))
const EventsPage = lazy(() => import('@/pages/EventsPage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))

// Studio is a ~2MB chunk — only loads when the user visits /studio
const StudioPage = lazy(() => import('@/pages/StudioPage'))

// ── Root layout ───────────────────────────────────────────────────────────────
// Wraps all marketing pages with TopBar + SiteNav + SiteFooter.
// Fetches homeSiteSettings once so the footer tagline is CMS-driven.
function RootLayout() {
  const { data: settings } = useSanity<HomeSiteSettings>(SITE_SETTINGS_QUERY)

  return (
    <AppShell footerTagline={settings?.footerTagline}>
      <Suspense fallback={<LoadingState />}>
        <Outlet />
      </Suspense>
    </AppShell>
  )
}

// ── 404 ───────────────────────────────────────────────────────────────────────
function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '8rem 2rem' }}>
      <h1 style={{ fontFamily: 'var(--font-head)', fontSize: '4rem', color: 'var(--navy)', marginBottom: '1rem' }}>
        404
      </h1>
      <p style={{ color: 'var(--grey-500)', marginBottom: '2rem' }}>Page not found.</p>
      <a href="/" className="btn btn-navy">Return home</a>
    </div>
  )
}

// ── Router ────────────────────────────────────────────────────────────────────
const router = createBrowserRouter([
  {
    // Studio sits entirely outside the marketing layout.
    // The /* suffix lets Sanity's internal router handle all /studio/* sub-paths
    // (tools, document IDs, etc.) without React Router intercepting them.
    path: '/studio/*',
    element: (
      <Suspense fallback={<LoadingState message="Loading Studio…" />}>
        <StudioPage />
      </Suspense>
    ),
  },
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true,             element: <HomePage /> },
      { path: 'what-we-are',    element: <WhatWeArePage /> },
      { path: 'who-we-are',     element: <WhoWeArePage /> },
      { path: 'team/:slug',     element: <TeamMemberPage /> },
      { path: 'markets/:slug',  element: <MarketPage /> },
      { path: 'insights',       element: <InsightsPage /> },
      { path: 'insights/:slug', element: <InsightDetailPage /> },
      { path: 'contact',        element: <ContactPage /> },
      { path: 'events',         element: <EventsPage /> },
      { path: '*',              element: <NotFoundPage /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
