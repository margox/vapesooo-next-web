'use client'

import { useLocale } from '@/app/store/locale'
import { t } from '@/locales'

export function useTranslation() {
  const locale = useLocale()

  return {
    t: (key: string, params?: Record<string, string>) => t(locale, key, params),
    locale,
  }
}
