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
    ],
    preview: {
        prepare: () => ({ title: 'Who We Are Page' }),
    },
});
