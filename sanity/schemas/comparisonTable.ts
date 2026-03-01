import { defineType, defineField } from 'sanity'

const CELL_OPTIONS = [
  { title: '✓ Yes', value: 'y' },
  { title: '✕ No', value: 'n' },
  { title: 'Partial', value: 'p' },
  { title: 'Low (good)', value: 'g' },
  { title: 'High (good)', value: 'hi' },
  { title: 'High (bad)', value: 'bad' },
  { title: 'Moderate', value: 'm' },
] as const

export const comparisonTable = defineType({
  name: 'comparisonTable',
  title: 'Comparison Table',
  type: 'document',
  fields: [
    defineField({
      name: 'rows',
      title: 'Table Rows',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'row',
          title: 'Row',
          fields: [
            defineField({
              name: 'feature',
              title: 'Feature Name',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'inoculant',
              title: 'Your Mix',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'synthetic',
              title: 'Standard Synthetic',
              type: 'string',
              validation: (r) => r.required(),
            }),
          ],
          preview: { select: { title: 'feature' } },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Comparison Table' }),
  },
})
