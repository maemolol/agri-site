import type { PortableTextBlock } from '@portabletext/react'

// Re-export so pages can import from one place
export type { PortableTextBlock }

// ── Sanity image ─────────────────────────────────────────────────────────────
export interface SanityImage {
  asset: { _ref: string }
  alt?: string
  url?: string
  hotspot?: { x: number; y: number; width: number; height: number }
  crop?: { top: number; bottom: number; left: number; right: number }
}

// ── Site Settings ─────────────────────────────────────────────────────────────
export interface HeroStat {
  number: string
  unit: string
  label: string
}

export interface SiteSettings {
  siteTitle: string
  tagline?: string
  contactEmail?: string
  phone?: string
  heroHeadline?: string
  heroSubheadline?: string
  heroStats?: HeroStat[]
  footerTagline?: string
}

// ── Team ──────────────────────────────────────────────────────────────────────
export interface TeamMember {
  _id: string
  name: string
  slug: string
  role: string
  isCoFounder?: boolean
  photo?: SanityImage
  quote?: string
  bio?: PortableTextBlock[]
  order?: number
}

// ── Market ────────────────────────────────────────────────────────────────────
export interface Market {
  _id: string
  name: string
  slug: string
  displayNumber?: string
  emoji?: string
  overview: string
  challenges?: string[]
  solutions?: string[]
  ctaText?: string
  heroImage?: SanityImage
}

// ── Comparison ────────────────────────────────────────────────────────────────
export type CellValue = 'y' | 'n' | 'p' | 'g' | 'hi' | 'bad' | 'm'

export interface ComparisonRow {
  feature: string
  inoculant: CellValue
  synthetic: CellValue
  bioStimulant: CellValue
}

export interface ComparisonTable {
  rows: ComparisonRow[]
}

// ── Insight ───────────────────────────────────────────────────────────────────
export interface InsightAuthor {
  name: string
  slug?: string
  role?: string
  photo?: SanityImage
}

export interface Insight {
  _id: string
  title: string
  slug: string
  tag?: string
  excerpt: string
  publishedAt?: string
  coverImage?: SanityImage
  body?: PortableTextBlock[]
  author?: InsightAuthor
}

// ── What We Are Page ──────────────────────────────────────────────────────────
export interface PageStat {
  number: string
  label: string
}

export interface Pillar {
  title: string
  body?: string
}

export interface WhatWeArePage {
  headline?: string
  subheadline?: string
  missionHeading?: string
  missionBody?: PortableTextBlock[]
  stats?: PageStat[]
  pillars?: Pillar[]
}

// ── Homepage composite query result ──────────────────────────────────────────
export interface HomepageData {
  settings: Pick<SiteSettings, 'heroHeadline' | 'heroSubheadline' | 'heroStats'>
  markets: Pick<Market, '_id' | 'name' | 'slug' | 'displayNumber' | 'emoji' | 'overview'>[]
  comparison: ComparisonTable | null
  insights: Pick<Insight, '_id' | 'title' | 'slug' | 'tag' | 'excerpt' | 'publishedAt'>[]
}
