import { defineType, defineField } from 'sanity';
export const homeSiteSettings = defineType({
    name: 'homeSiteSettings',
    title: 'Site Settings + Home Page',
    type: 'document',
    // Singleton — delete/duplicate disabled via sanity.config.ts document.actions
    fields: [
        defineField({
            name: 'siteTitle',
            title: 'Site Title',
            type: 'string',
            validation: (r) => r.required(),
        }),
        defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
        defineField({ name: 'contactEmail', title: 'Contact Email', type: 'string' }),
        defineField({ name: 'phone', title: 'Phone Number', type: 'string' }),
        defineField({
            name: 'heroHeadline',
            title: 'Hero Headline',
            type: 'string',
            description: 'The large headline displayed on the homepage hero section',
        }),
        defineField({
            name: 'heroSubheadline',
            title: 'Hero Subheadline',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'heroStats',
            title: 'Hero Stats',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'stat',
                    fields: [
                        defineField({ name: 'number', title: 'Number (e.g. "47")', type: 'string' }),
                        defineField({ name: 'unit', title: 'Unit (e.g. "%", "×", "+")', type: 'string' }),
                        defineField({ name: 'label', title: 'Label', type: 'string' }),
                    ],
                    preview: { select: { title: 'number', subtitle: 'label' } },
                },
            ],
            validation: (r) => r.max(4),
        }),
        defineField({ name: 'productHeadline', title: 'Product Headline', type: 'string' }),
        defineField({ name: 'productSubheadline', title: 'Product Subheadline', type: 'text', rows: 2 }),
        defineField({
            name: 'productDescription',
            title: 'What Is The Product — Description',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'productImage',
            title: 'What Is The Product — Image',
            type: 'image',
            options: { hotspot: true },
            fields: [
                defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
            ],
        }),
        defineField({
            name: 'applicationHeadline',
            title: 'How To Apply — Headline',
            type: 'string',
        }),
        defineField({
            name: 'applicationDescription',
            title: 'How To Apply — Description',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'applicationImage',
            title: 'How To Apply — Image',
            type: 'image',
            options: { hotspot: true },
            fields: [
                defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
            ],
        }),
        defineField({ name: 'originHeading', title: 'Origin Section Heading', type: 'string' }),
        defineField({
            name: 'originBody',
            title: 'Origin Body',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'originImage',
            title: 'Origin Image',
            type: 'image',
            options: { hotspot: true },
            fields: [
                defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
            ],
        }),
        defineField({
            name: 'resultsHeadline',
            title: 'Results Headline',
            type: 'string',
        }),
        defineField({
            name: 'resultsDescription',
            title: 'Results Description',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'resultsImage',
            title: 'Results Image',
            type: 'image',
            options: { hotspot: true },
            fields: [
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
            ],
        }),
        defineField({
            name: 'homeQuote',
            title: 'Testimonial quote',
            type: 'string'
        }),
        defineField({
            name: 'homeQuoteAuthor',
            title: 'Quote author',
            type: 'string'
        }),
        defineField({ name: 'footerTagline', title: 'Footer Tagline', type: 'string' }),
    ],
    preview: {
        prepare: () => ({ title: 'Site Settings + Home Page' }),
    },
});
