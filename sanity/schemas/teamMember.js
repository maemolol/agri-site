import { defineType, defineField } from 'sanity';
export const teamMember = defineType({
    name: 'teamMember',
    title: 'Team Member',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Full Name',
            type: 'string',
            validation: (r) => r.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'name', maxLength: 96 },
            validation: (r) => r.required(),
        }),
        defineField({
            name: 'role',
            title: 'Job Title / Role',
            type: 'string',
            validation: (r) => r.required(),
        }),
        defineField({
            name: 'isCoFounder',
            title: 'Is Co-Founder?',
            type: 'boolean',
            description: 'Co-founders are shown first and given a badge on the team page',
            initialValue: false,
        }),
        defineField({
            name: 'photo',
            title: 'Photo',
            type: 'image',
            options: { hotspot: true },
            fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
        }),
        defineField({
            name: 'quote',
            title: 'Featured Quote',
            type: 'string',
            description: 'Short pull-quote shown on the team card',
        }),
        defineField({
            name: 'bio',
            title: 'Full Biography',
            type: 'array',
            of: [{ type: 'block' }],
            description: 'Shown on the individual team member page',
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Lower numbers appear first',
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
        select: { title: 'name', subtitle: 'role', media: 'photo' },
    },
});
