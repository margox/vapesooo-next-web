import { headers } from 'next/headers'
import { getPreferredLanguageCode } from '@/lib/language'

export const getRequestBrowserLanguage = async () => {
  const headersList = await headers()
  return getPreferredLanguageCode(headersList.get('accept-language') ?? undefined)
}
