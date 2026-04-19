import { defineType, defineField } from 'sanity';

export const whoWeArePage = defineType({
    name: 'whoWeArePage',
    title: 'Who We Are Page',
    type: 'document',
    fields: [
        defineField({
            name: 'headline',
            title: 'Headline',
            type: 'string',
            validation: (r) => r.required(),
        }),
        defineField({
            name: 'subheadline',
            title: 'Subheadline',
            type: 'string',
            validation: (r) => r.required(),
        }),
        defineField({
            name: 'companyDescription',
            title: 'Company Description',
            type: 'array',
            of: [{ type: 'block' }],
            description: 'Rich text — appears below the headline, before the team grid',
        }),
        defineField({
            name: 'companyImage',
            title: 'Company Image',
            type: 'image',
            options: { hotspot: true },
            fields: [
                defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
            ],
        }),
        defineField({
            name: 'podcastLinks',
            title: 'Podcast Links',
            type: 'array',
            of: [
                {
                type: 'object',
                name: 'podcastLink',
                fields: [
                    defineField({ name: 'title', title: 'Episode / Show Title', type: 'string', validation: (r) => r.required() }),
                    defineField({ name: 'show', title: 'Podcast Show Name', type: 'string' }),
                    defineField({ name: 'url', title: 'URL', type: 'url', validation: (r) => r.required() }),
                    defineField({ name: 'description', title: 'Short Description', type: 'text', rows: 2 }),
                ],
                preview: { select: { title: 'title', subtitle: 'show' } },
                },
            ],
        }),
    ],
    preview: {
        prepare: () => ({ title: 'Who We Are Page' }),
    },
});
