import { defineType, defineField } from 'sanity'

export const eventsPage = defineType({
  name: 'eventsPage',
  title: 'Events Page',
  type: 'document',
  fields: [
    defineField({
      name: 'eventName',
      title: 'Event name',
      type: 'string',
    }),
    defineField({
      name: 'eventDescription',
      title: 'Event description',
      type: 'string',
    }),
    defineField({
      name: 'eventDate',
      title: 'Event date',
      type: 'string',
    }),
    defineField({
      name: 'eventTime',
      title: 'Event time',
      type: 'string',
    }),
    defineField({
      name: 'eventLocation',
      title: 'Event location',
      type: 'string',
    }),
    defineField({
      name: 'eventCapacity',
      title: 'Event capacity',
      type: 'string',
    }),
    defineField({
      name: 'controlPlotImage',
      title: 'Control Plot Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'lipasmaPlotImage',
      title: 'Lípasma Plot Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Events Page' }),
  },
})