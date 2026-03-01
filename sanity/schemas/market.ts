import { defineType, defineField } from 'sanity'

export const market = defineType({
  name: 'market',
  title: 'Market',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Market Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (r) => r.required(),
      description: 'e.g. "row-crops" → appears at /markets/row-crops',
    }),
    defineField({
      name: 'displayNumber',
      title: 'Display Number',
      type: 'string',
      description: 'e.g. "01", "02", "03"',
    }),
    defineField({
      name: 'emoji',
      title: 'Emoji Icon',
      type: 'string',
      description: 'Single emoji shown as the market icon',
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'text',
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'challenges',
      title: 'Key Challenges',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet list shown on the left column of the market page',
    }),
    defineField({
      name: 'solutions',
      title: 'How Smart Blend Solves Them',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet list shown on the right column of the market page',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      description: 'e.g. "Start a Row Crop Trial"',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 99,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'overview', media: 'heroImage' },
    prepare({ title, subtitle }: { title: string; subtitle?: string }) {
      return { title, subtitle: subtitle?.slice(0, 80) }
    },
  },
})
