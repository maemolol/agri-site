import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },

  define: {
    // Sanity Studio and some of its deps reference process.env at runtime.
    // Vite's ESM environment doesn't provide process, so we shim it here.
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'development'),
    // Some Sanity internals check process.env.SANITY_STUDIO_* vars
    'process.env': '{}',
  },

  server: {
    // Required for React Router — all unknown paths must serve index.html
    // so client-side routing handles them (including /studio/*)
    historyApiFallback: true,
  },

  // Pre-bundle Sanity packages.
  // Sanity ships a mix of ESM, CJS, and dynamic imports that Vite's
  // dev-server dependency scanner can miss. Listing them here ensures
  // they're transformed and cached before the browser requests them,
  // preventing the blank /studio page caused by mid-request 504s.
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@sanity/client',
      '@sanity/image-url',
      '@portabletext/react',
      'sanity',
      'sanity/structure',
      'sanity/_internal',
      '@sanity/vision',
      '@sanity/ui',
      '@sanity/icons',
      'styled-components',
    ],
    // Exclude nothing — let Vite pre-bundle everything listed above
    exclude: [],
  },

  build: {
    // Sanity Studio bundle is large by design (~2-3 MB); suppress the warning
    chunkSizeWarningLimit: 4000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Isolate the Studio into its own async chunk so marketing pages
          // don't pay the cost unless the user navigates to /studio
          'sanity-studio': ['sanity', '@sanity/ui', '@sanity/icons', 'styled-components'],
          'sanity-vision': ['@sanity/vision'],
        },
      },
    },
  },
})

