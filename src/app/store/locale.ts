'use client'

import { Locales, locales } from '@/locales'
import { useParams } from 'next/navigation'

export const useLocale = (fallback?: Locales) => {
  let { locale } = useParams()

  if (!locales.includes(locale as Locales)) {
    locale = fallback || Locales.EN
  }

  return locale as Locales
}
