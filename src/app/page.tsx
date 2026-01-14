'use client'

import { useEffect } from 'react'

export default function RootPage() {
  useEffect(() => {
    // 客户端重定向作为备用方案
    if (typeof window !== 'undefined') {
      window.location.replace('/en')
    }
  }, [])

  return null
}

