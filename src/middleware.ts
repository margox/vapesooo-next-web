import { NextResponse, NextRequest } from 'next/server'
import { Locales, locales } from '@/locales'
import { getPreferredLanguageCode } from '@/lib/language'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host')?.split(':')[0].toLowerCase()
  const forwardedProtocol = request.headers.get('x-forwarded-proto')
  const isProductionHost = hostname === 'vapesooo.com' || hostname === 'www.vapesooo.com'

  if (isProductionHost && (hostname === 'www.vapesooo.com' || forwardedProtocol === 'http')) {
    const canonicalUrl = request.nextUrl.clone()
    canonicalUrl.protocol = 'https'
    canonicalUrl.hostname = 'vapesooo.com'
    canonicalUrl.port = ''
    return NextResponse.redirect(canonicalUrl, 301)
  }

  if (request.nextUrl.pathname !== '/') {
    return NextResponse.next()
  }

  const browserLanguage = getPreferredLanguageCode(request.headers.get('accept-language') ?? undefined) as Locales
  const redirectLocale = locales.includes(browserLanguage) ? browserLanguage : Locales.EN

  return NextResponse.redirect(new URL(`/${redirectLocale}`, request.url), 301)
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
}
