import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

const projectId = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SANITY_PROJECT_ID) || process.env.VITE_SANITY_PROJECT_ID
const dataset = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SANITY_DATASET) || process.env.VITE_SANITY_DATASET || 'production'

if (!projectId && import.meta.env.DEV) {
  console.warn(
    '[Smart Blend Studio] VITE_SANITY_PROJECT_ID is not set.\n' +
    'Copy .env.example to .env.local and add your project ID.',
  )
}

const SINGLETON_TYPES = new Set(['siteSettings', 'comparisonTable', 'whatWeArePage'])

export default defineConfig({
  name: 'smartblend',
  title: 'Smart Blend CMS',

  projectId: "f1lku4u2",
  dataset,

  // ── CRITICAL ──────────────────────────────────────────────────────────────
  // basePath tells the Studio its internal router is mounted at /studio.
  // Without this the Studio redirects to '/' on load, which React Router
  // intercepts and renders the homepage — the blank Studio bug.
  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singletons — each links directly to a fixed document ID
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

            S.listItem()
              .title('What We Are Page')
              .id('whatWeArePage')
              .child(S.document().schemaType('whatWeArePage').documentId('whatWeArePage')),

            S.listItem()
              .title('Comparison Table')
              .id('comparisonTable')
              .child(S.document().schemaType('comparisonTable').documentId('comparisonTable')),

            S.divider(),

            // Collections
            S.listItem()
              .title('Team Members')
              .schemaType('teamMember')
              .child(S.documentTypeList('teamMember').title('Team Members')),

            S.listItem()
              .title('Markets')
              .schemaType('market')
              .child(S.documentTypeList('market').title('Markets')),

            S.listItem()
              .title('Agronomy Insights')
              .schemaType('insight')
              .child(S.documentTypeList('insight').title('Insights')),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemaTypes },

  document: {
    // Prevent singletons from appearing in the "New document" menu
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((t) => !SINGLETON_TYPES.has(t.templateId))
      }
      return prev
    },
    // Disable duplicate and delete for singletons
    actions: (prev, { schemaType }) => {
      if (SINGLETON_TYPES.has(schemaType)) {
        return prev.filter((a) => a.action !== 'duplicate' && a.action !== 'delete')
      }
      return prev
    },
  },
})
