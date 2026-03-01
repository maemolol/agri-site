import { defineType, defineField } from 'sanity'

export const whatWeArePage = defineType({
  name: 'whatWeArePage',
  title: 'What We Are Page',
  type: 'document',
  fields: [
    defineField({ name: 'headline', title: 'Page Headline', type: 'string' }),
    defineField({ name: 'subheadline', title: 'Page Subheadline', type: 'text', rows: 2 }),
    defineField({ name: 'missionHeading', title: 'Mission Section Heading', type: 'string' }),
    defineField({
      name: 'missionBody',
      title: 'Mission Body',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'stats',
      title: 'Stats Panel',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'stat',
          fields: [
            defineField({ name: 'number', title: 'Number (e.g. "15+")', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
          ],
          preview: { select: { title: 'number', subtitle: 'label' } },
        },
      ],
      validation: (r) => r.max(4),
    }),
    defineField({
      name: 'pillars',
      title: 'Operating Principles',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'pillar',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 3 }),
          ],
          preview: { select: { title: 'title' } },
        },
      ],
      validation: (r) => r.max(3),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'What We Are Page' }),
  },
})
