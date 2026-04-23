import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    const id = setTimeout(() => window.scrollTo(0, 0), 0)
    return () => clearTimeout(id)
  }, [pathname])

  return null
}