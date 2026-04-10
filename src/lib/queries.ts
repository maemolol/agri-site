// GROQ query strings for Smart Blend Sanity CMS
// The `groq` tagged-template literal is just a passthrough for syntax highlighting.
// We define it inline to avoid the separate `groq` npm package dependency.
const groq = (strings: TemplateStringsArray, ...values: unknown[]): string =>
  strings.reduce((acc, str, i) => acc + str + (values[i] ?? ''), '')

// ── Fragments ────────────────────────────────────────────────────────────────

const IMAGE_FIELDS = groq`
  asset,
  alt,
  "url": asset->url,
  hotspot, crop
`

const TEAM_CARD_FIELDS = groq`
  _id,
  name,
  "slug": slug.current,
  role,
  isCoFounder,
  quote,
  order,
  photo { ${IMAGE_FIELDS} }
`

// ── Singletons ───────────────────────────────────────────────────────────────

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "homeSiteSettings"][0]{
    siteTitle,
    tagline,
    contactEmail,
    phone,
    heroHeadline,
    heroSubheadline,
    heroStats[]{ number, unit, label },
    footerTagline
  }
`

export const COMPARISON_TABLE_QUERY = groq`
  *[_type == "comparisonTable"][0]{
    rows[]{ feature, inoculant, synthetic, bioStimulant }
  }
`

export const WHAT_WE_ARE_QUERY = groq`
  *[_type == "whatWeArePage"][0]{
    headline,
    subheadline,
    missionHeading,
    missionBody,
    stats[]{ number, label },
    pillars[]{ title, body }
  }
`

// ── Collections ──────────────────────────────────────────────────────────────

export const ALL_TEAM_QUERY = groq`
  *[_type == "teamMember"] | order(isCoFounder desc, order asc, name asc){
    ${TEAM_CARD_FIELDS}
  }
`

export const TEAM_MEMBER_QUERY = groq`
  *[_type == "teamMember" && slug.current == $slug][0]{
    ${TEAM_CARD_FIELDS},
    bio
  }
`

export const ALL_MARKETS_QUERY = groq`
  *[_type == "market"] | order(order asc, name asc){
    _id,
    name,
    "slug": slug.current,
    displayNumber,
    emoji,
    overview,
    challenges,
    solutions,
    ctaText,
    heroImage { ${IMAGE_FIELDS} }
  }
`

export const MARKET_QUERY = groq`
  *[_type == "market" && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current,
    displayNumber,
    emoji,
    overview,
    challenges,
    solutions,
    ctaText,
    heroImage { ${IMAGE_FIELDS} }
  }
`

export const ALL_INSIGHTS_QUERY = groq`
  *[_type == "insight"] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    tag,
    excerpt,
    publishedAt,
    coverImage { ${IMAGE_FIELDS} },
    "author": author->{ name, role, photo { ${IMAGE_FIELDS} } }
  }
`

export const INSIGHT_QUERY = groq`
  *[_type == "insight" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    tag,
    excerpt,
    publishedAt,
    body,
    coverImage { ${IMAGE_FIELDS} },
    "author": author->{ name, "slug": slug.current, role, photo { ${IMAGE_FIELDS} } }
  }
`

// ── Homepage composite (single round-trip) ───────────────────────────────────

export const HOMEPAGE_QUERY = groq`
  {
    "settings": *[_type == "homeSiteSettings"][0]{
      heroHeadline, heroSubheadline, heroStats[]{ number, unit, label }
    },
    "markets": *[_type == "market"] | order(order asc){
      _id, name, "slug": slug.current, displayNumber, emoji, overview
    },
    "comparison": *[_type == "comparisonTable"][0]{
      rows[]{ feature, inoculant, synthetic, bioStimulant }
    },
    "insights": *[_type == "insight"] | order(publishedAt desc)[0...3]{
      _id, title, "slug": slug.current, tag, excerpt, publishedAt
    }
  }
`
