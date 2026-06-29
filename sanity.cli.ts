import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
    studioHost: 'smartblend',
    api: {
        projectId: process.env.VITE_SANITY_PROJECT_ID ?? 'f1lku4u2',
        dataset: process.env.VITE_SANITY_DATASET ?? 'production',
    },
})
