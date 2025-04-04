import { NextResponse, NextRequest } from 'next/server'
import { Locales } from '@/types/products'

export function middleware(request: NextRequest) {
  const browserLanguage = request.headers.get('accept-language')
  const locale = browserLanguage?.split(',')?.[0]?.split('-')?.[0] as Locales

  let redirectLocale = 'en'

  if (Object.values(Locales).includes(locale)) {
    redirectLocale = locale
  }

  return NextResponse.redirect(new URL(`/${redirectLocale}`, request.url))
}

export const config = {
  matcher: '/',
}
