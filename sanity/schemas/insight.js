import { defineType, defineField } from 'sanity';
export const insight = defineType({
    name: 'insight',
    title: 'Agronomy Insight',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (r) => r.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title' },
            validation: (r) => r.required(),
        }),
        defineField({
            name: 'tag',
            title: 'Category Tag',
            type: 'string',
            options: {
                list: [
                    'Soil Health',
                    'Row Crops',
                    'Specialty Crops',
                    'Turf & Ornamentals',
                    'Regenerative Ag',
                    'Research',
                    'Field Trials',
                ],
            },
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 3,
            validation: (r) => r.required(),
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            options: { hotspot: true },
            fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [
                { type: 'block' },
                {
                    type: 'image',
                    title: 'Image',
                    options: { hotspot: true },
                    fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
                },
            ],
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: [{ type: 'teamMember' }],
        }),
    ],
    orderings: [
        {
            title: 'Published Date (Newest)',
            name: 'publishedAtDesc',
            by: [{ field: 'publishedAt', direction: 'desc' }],
        },
    ],
    preview: {
        select: { title: 'title', subtitle: 'tag', media: 'coverImage' },
    },
});
