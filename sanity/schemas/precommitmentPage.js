import { defineType, defineField } from "sanity";

export const precommitmentPage = defineType({
    name: "precommitmentPage",
    title: "Pre-commitment Page",
    type: "document",
    fields: [
        defineField({
            name: 'pageSubheading',
            title: 'Page Subheading',
            type: 'string',
            validation: (r) => r.required(),
        }),
        defineField({
            name: 'subheader',
            title: 'Subheader',
            type: 'string',
            validation: (r) => r.required(),
        }),
        defineField({
            name: 'bodyCopy',
            title: 'Body Copy',
            type: 'text',
            rows: 2,
            validation: (r) => r.required(),
        }),
    ],
    preview: {
        prepare: () => ({ title: 'Pre-commitment page' }),
    },
});