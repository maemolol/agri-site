import { useState, useEffect } from 'react'
import { client } from '@/lib/sanity.client'

// Allow undefined values — useParams returns string | undefined
export type QueryParams = Record<string, string | number | boolean | null | undefined>

interface UseSanityState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

/**
 * Generic hook for fetching data from Sanity via GROQ.
 *
 * @param query   - A GROQ query string (use the exported constants from lib/queries.ts)
 * @param params  - Optional GROQ parameters (e.g. { slug: 'row-crops' })
 * @param deps    - Extra deps that trigger a re-fetch (e.g. [slug] for dynamic routes)
 *
 * @example
 *   const { data, loading, error } = useSanity<Market>(MARKET_QUERY, { slug }, [slug])
 */
export function useSanity<T>(
  query: string,
  params: QueryParams = {},
  deps: unknown[] = [],
): UseSanityState<T> {
  const [state, setState] = useState<UseSanityState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let cancelled = false
    setState(prev => ({ ...prev, loading: true, error: null }))

    // Filter out undefined values — Sanity client doesn't accept them
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== undefined),
    )

    client
      .fetch<T>(query, cleanParams)
      .then(data => {
        if (!cancelled) setState({ data, loading: false, error: null })
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState({
            data: null,
            loading: false,
            error: err instanceof Error ? err : new Error(String(err)),
          })
        }
      })

    return () => {
      cancelled = true
    }
    // deps spread is intentional — query + serialised params cover the Sanity args,
    // caller-provided deps cover route param changes (e.g. slug).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, JSON.stringify(params), ...deps])

  return state
}
