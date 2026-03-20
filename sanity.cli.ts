import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
    studioHost: 'smartblend',
    api: {
        projectId: process.env.VITE_SANITY_PROJECT_ID ?? 'your_project_id_here',
        dataset: process.env.VITE_SANITY_DATASET ?? 'production',
    },
})
