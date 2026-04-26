import { NextResponse, NextRequest } from 'next/server'
import { Locales, locales } from '@/locales'
import { getPreferredLanguageCode } from '@/lib/language'

export function middleware(request: NextRequest) {
  const browserLanguage = getPreferredLanguageCode(request.headers.get('accept-language') ?? undefined) as Locales
  const redirectLocale = locales.includes(browserLanguage) ? browserLanguage : Locales.EN

  return NextResponse.redirect(new URL(`/${redirectLocale}`, request.url), 301)
}

export const config = {
  matcher: '/',
}
