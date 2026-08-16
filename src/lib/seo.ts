import type { Metadata } from 'next'
import { Locales, locales } from '@/locales'

export const SITE_NAME = 'Vapesooo'
export const SITE_URL = (process.env.NEXT_PUBLIC_BASE_URL || 'https://vapesooo.com').replace(/\/$/, '')
export const DEFAULT_SOCIAL_IMAGE =
  'https://vapesooo-1318551956.cos.accelerate.myqcloud.com/banner/vapesolo-galaxy.webp'

const normalizePath = (path: string) => {
  if (!path || path === '/') return ''
  return path.startsWith('/') ? path : `/${path}`
}

export const getLocalizedUrl = (locale: string, path = '') => `${SITE_URL}/${locale}${normalizePath(path)}`

export const getLanguageAlternates = (path = '') => ({
  ...Object.fromEntries(locales.map((locale) => [locale, getLocalizedUrl(locale, path)])),
  'x-default': getLocalizedUrl(Locales.EN, path),
})

interface PageMetadataOptions {
  locale: Locales
  path?: string
  title: string
  description: string
  keywords?: string | string[]
  images?: string[]
  type?: 'website' | 'article'
}

export const createPageMetadata = ({
  locale,
  path = '',
  title,
  description,
  keywords,
  images = [DEFAULT_SOCIAL_IMAGE],
  type = 'website',
}: PageMetadataOptions): Metadata => {
  const url = getLocalizedUrl(locale, path)

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: getLanguageAlternates(path),
    },
    openGraph: {
      title,
      description,
      type,
      locale,
      url,
      siteName: SITE_NAME,
      images: images.map((image) => ({ url: image, alt: title })),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
  }
}

