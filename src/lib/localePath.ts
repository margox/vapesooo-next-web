import { Locales } from '@/locales'

// English is the default locale and has no URL prefix; other locales keep theirs.
export const getLocalizedPath = (locale: string, path = '') => {
  const normalizedPath = !path || path === '/' ? '' : path.startsWith('/') ? path : `/${path}`

  return locale === Locales.EN ? normalizedPath || '/' : `/${locale}${normalizedPath}`
}
