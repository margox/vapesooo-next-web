import { NextResponse, NextRequest } from 'next/server'
import { Locales, locales } from '@/locales'

export function middleware(request: NextRequest) {
  const browserLanguage = request.headers.get('accept-language')
  const locale = browserLanguage?.split(',')?.[0]?.split('-')?.[0] as Locales

  let redirectLocale = 'en'

  if (locales.includes(locale)) {
    redirectLocale = locale
  }

  return NextResponse.redirect(new URL(`/${redirectLocale}`, request.url), 301)
}

export const config = {
  matcher: '/',
}
