/**
 * StudioPage.tsx
 *
 * Renders the embedded Sanity Studio at /studio/*.
 *
 * KEY REQUIREMENTS for a working embedded Studio:
 *
 * 1. `basePath: '/studio'` must be set in sanity.config.ts so the Studio's
 *    internal router knows it lives at /studio, not /. Without this the Studio
 *    mounts, immediately redirects to '/', and React Router renders the homepage
 *    instead — appearing as a blank Studio.
 *
 * 2. The <Studio> component must render into a container that fills the entire
 *    viewport. The Studio manages its own layout, scroll, and z-index layers;
 *    a constrained parent breaks all of these.
 *
 * 3. This file must be a *separate module* from App.tsx. Sanity's Studio
 *    component relies on module-level side-effects (theme providers, icon
 *    registries) that only run correctly when the import is static, not when
 *    constructed via dynamic Promise chains.
 *
 * 4. The route in App.tsx must use the /studio/* wildcard so React Router
 *    passes sub-paths (tool routes, document routes, etc.) through to Sanity's
 *    own router instead of matching them as 404s.
 */
import { Studio } from 'sanity'
import studioConfig from '../../sanity.config'

export default function StudioPage() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        // The Studio renders its own scroll containers internally.
        // overflow:hidden on the wrapper prevents double-scrollbars.
        overflow: 'hidden',
      }}
    >
      <Studio config={studioConfig} />
    </div>
  )
}
