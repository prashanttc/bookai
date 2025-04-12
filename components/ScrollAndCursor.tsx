'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function ScrollAndCursorHandler() {
  const pathname = usePathname()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleStart = () => {
      setLoading(true)
      document.body.style.cursor = 'wait'
    }

    const handleComplete = () => {
      setLoading(false)
      document.body.style.cursor = 'default'
      window.scrollTo(0, 0)
    }

    const handleRouteChange = () => {
      setLoading(true)
      document.body.style.cursor = 'wait'
      window.scrollTo(0, 0)
      setLoading(false)
      document.body.style.cursor = 'default'
    }

    handleRouteChange()
  }, [router])

  // fallback for App Router (usePathname-based scroll)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
