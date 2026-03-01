# BioGrow — React + React Router v6 + Sanity CMS

## 📁 Final File Structure

```
biogrow/
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── package.json
├── .env.example
│
├── sanity/
│   ├── sanity.config.ts          ← Studio config + singleton structure
│   └── schemas/
│       ├── index.ts
│       ├── siteSettings.ts       ← Singleton: hero, stats, footer
│       ├── teamMember.ts         ← Collection: name, slug, bio, quote, photo
│       ├── market.ts             ← Collection: challenges, solutions, CTA
│       ├── comparisonTable.ts    ← Singleton: table rows with dropdown values
│       ├── insight.ts            ← Collection: blog posts with author ref
│       └── whatWeArePage.ts      ← Singleton: mission, stats, pillars
│
└── src/
    ├── main.tsx
    ├── App.tsx                   ← createBrowserRouter, all routes
    ├── index.css                 ← Global design tokens + utility classes
    │
    ├── lib/
    │   ├── sanity.client.ts      ← createClient + urlFor
    │   └── queries.ts            ← All GROQ queries + fragments
    │
    ├── types/
    │   └── index.ts              ← Full TypeScript types for all schemas
    │
    ├── hooks/
    │   └── useSanity.ts          ← Generic data-fetching hook
    │
    ├── components/
    │   ├── layout/
    │   │   └── index.tsx         ← TopBar, SiteNav, SiteFooter, AppShell
    │   └── ui/
    │       └── index.tsx         ← LoadingState, ErrorState, CTABand,
    │                               PageHero, Breadcrumb, CellVal,
    │                               RichText, InsightCard
    │
    └── pages/
        ├── HomePage.tsx
        ├── WhatWeArePage.tsx
        └── pages.tsx             ← WhoWeArePage, TeamMemberPage, MarketPage,
                                    InsightsPage, InsightDetailPage, ContactPage
```

---

## 🔀 React Router v6 — Route Map

| URL | Component | Notes |
|---|---|---|
| `/` | `HomePage` | Composite GROQ fetch, live Sanity data |
| `/what-we-are` | `WhatWeArePage` | Singleton page, fully editable in CMS |
| `/who-we-are` | `WhoWeArePage` | Lists all `teamMember` documents |
| `/team/:slug` | `TeamMemberPage` | Dynamic, `useParams` slug → GROQ |
| `/markets/:slug` | `MarketPage` | Dynamic, fetches market + all markets |
| `/insights` | `InsightsPage` | Lists all `insight` documents |
| `/insights/:slug` | `InsightDetailPage` | Full post with author sidebar |
| `/contact` | `ContactPage` | Local form state + market dropdown |
| `/studio/*` | Sanity Studio | Embedded, outside AppShell layout |

### Key routing patterns used:
- `createBrowserRouter` (v6 data router)
- `Outlet` in `RootLayout` for nested routes
- `useParams<{ slug: string }>()` on dynamic pages
- `lazy()` + `Suspense` for code splitting
- `NavLink` with `isActive` for active nav styling

---

## 🗄️ Sanity Schema → Editable Fields Map

### Singletons (one document each, no delete/duplicate)

| Studio Entry | Editable Fields |
|---|---|
| **Site Settings** | Hero headline, subheadline, 4 stats (number/unit/label), footer tagline, contact email |
| **What We Are Page** | Page headline, subheadline, mission heading, mission body (rich text), 4 stats, 3 pillars |
| **Comparison Table** | All rows — feature name + dropdown value per column (`✓/✕/Partial/Low/High/Moderate`) |

### Collections (multiple documents)

| Schema | Key Fields |
|---|---|
| **Team Member** | Name, slug, role, co-founder flag, photo (hotspot), quote, bio (rich text), display order |
| **Market** | Name, slug, display number, emoji, overview, challenges (string array), solutions (string array), CTA text, hero image |
| **Agronomy Insight** | Title, slug, tag (dropdown), excerpt, published date, cover image, body (rich text + images), author (reference → teamMember) |

---

## 🔍 GROQ Query Architecture

```typescript
// Single round-trip for homepage — all data in one fetch
export const HOMEPAGE_QUERY = groq`
  {
    "settings": *[_type == "siteSettings"][0]{ heroHeadline, heroSubheadline, heroStats },
    "markets": *[_type == "market"] | order(order asc){ _id, name, "slug": slug.current, ... },
    "comparison": *[_type == "comparisonTable"][0]{ rows[]{ feature, inoculant, synthetic, bioStimulant } },
    "insights": *[_type == "insight"] | order(publishedAt desc)[0...3]{ _id, title, ... }
  }
`

// Dynamic pages use params
export const MARKET_QUERY = groq`
  *[_type == "market" && slug.current == $slug][0]{ ... }
`
// Called as: client.fetch(MARKET_QUERY, { slug: 'row-crops' })
```

**Image projection pattern** (used in all queries with images):
```groq
photo {
  asset,
  alt,
  "url": asset->url,   ← Dereferences URL at query time
  hotspot, crop
}
```

---

## 🪝 useSanity Hook

```typescript
// Generic, cancellable, re-fetches when deps change
const { data, loading, error } = useSanity<Market>(
  MARKET_QUERY,
  { slug },   // GROQ params
  [slug]      // re-fetch trigger deps (like useEffect deps)
)
```

All pages follow this pattern:
```tsx
if (loading) return <LoadingState />
if (error)   return <ErrorState message="..." />
// render with data
```

---

## 🚀 Setup & Deployment

### 1. Install

```bash
git clone / unzip your project
cd biogrow
npm install
```

### 2. Sanity project

```bash
# Create a new project at sanity.io, then:
cp .env.example .env.local
# Fill in VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET
```

### 3. Run locally

```bash
# Frontend (Vite dev server on :5173)
npm run dev

# Visit http://localhost:5173/studio to open Sanity Studio
# (Studio is embedded — no separate process needed)
```

### 4. Seed content (Studio → http://localhost:5173/studio)

Create these in order:
1. **Site Settings** (one document)
2. **Comparison Table** (one document, add rows)
3. **What We Are Page** (one document)
4. **3 × Market** (Row Crops, Specialty Crops, Turf & Ornamentals)
5. **3 × Team Member** (Tom + team)
6. **Agronomy Insights** (optional)

### 5. CORS — add localhost to Sanity

Sanity dashboard → API → CORS Origins → Add `http://localhost:5173`

### 6. Deploy to Vercel

```bash
npx vercel --prod
```

Set env vars in Vercel dashboard:
- `VITE_SANITY_PROJECT_ID`
- `VITE_SANITY_DATASET`

Add your production domain to Sanity CORS origins.

### 7. Deploy Sanity Studio (optional — /studio route works standalone)

```bash
npm run sanity:deploy
# Deploys to https://biogrow.sanity.studio
```

---

## 🔑 Key Architecture Decisions

| Decision | Rationale |
|---|---|
| **Embedded Studio at `/studio`** | One repo, one deploy — editors use the same domain |
| **Singleton documents** | Prevents accidental duplicate Site Settings or Comparison Tables |
| **Composite GROQ for homepage** | One network request vs. 4 waterfalls |
| **`"slug": slug.current` projection** | Returns plain string, no `.current` access in components |
| **`"url": asset->url` projection** | Avoids double dereference in image URLs |
| **Fallback data on every page** | Pages render immediately with default copy while Sanity loads |
| **Lazy + Suspense on all pages** | Route-level code splitting, Studio only loads if `/studio` visited |
| **`useSanity` cancellation** | Prevents state updates on unmounted components |
