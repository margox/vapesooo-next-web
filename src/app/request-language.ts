import { headers } from 'next/headers'
import { getPreferredLanguageCode } from '@/data/index'

export const getRequestBrowserLanguage = async () => {
  const headersList = await headers()
  return getPreferredLanguageCode(headersList.get('accept-language') ?? undefined)
}
