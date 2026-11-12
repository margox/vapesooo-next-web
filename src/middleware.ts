import { NextResponse, NextRequest } from 'next/server'
import { Locales, locales } from '@/locales'

const STATIC_PREFIXES = ['/_next/', '/api/', '/images/', '/.well-known/']
const STATIC_PATHS = ['/favicon.ico', '/robots.txt', '/sitemap.xml']

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

  const pathname = request.nextUrl.pathname

  // Never rewrite Next.js internals, API routes, or static files.
  if (
    STATIC_PREFIXES.some((prefix) => pathname.startsWith(prefix)) ||
    STATIC_PATHS.includes(pathname) ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return NextResponse.next()
  }

  // The default locale (English) has no URL prefix.
  if (pathname === `/${Locales.EN}` || pathname.startsWith(`/${Locales.EN}/`)) {
    const canonicalUrl = request.nextUrl.clone()
    canonicalUrl.pathname = pathname.slice(`/${Locales.EN}`.length) || '/'
    return NextResponse.redirect(canonicalUrl, 301)
  }

  // Prefixed non-default locales are served as-is.
  const pathLocale = pathname.split('/')[1]
  if (locales.includes(pathLocale as Locales)) {
    return NextResponse.next()
  }

  // English URLs stay unprefixed while the [locale] route renders them internally.
  const rewriteUrl = request.nextUrl.clone()
  rewriteUrl.pathname = pathname === '/' ? `/${Locales.EN}` : `/${Locales.EN}${pathname}`
  return NextResponse.rewrite(rewriteUrl)
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
}
