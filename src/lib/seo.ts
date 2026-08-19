import type { Metadata } from 'next'
import { Locales, locales } from '@/locales'

export const SITE_NAME = 'Vapesooo'
export const SITE_URL = (process.env.NEXT_PUBLIC_BASE_URL || 'https://vapesooo.com').replace(/\/$/, '')
export const DEFAULT_SOCIAL_IMAGE =
  'https://vapesooo-1318551956.cos.accelerate.myqcloud.com/banner/vapesolo-galaxy.webp'

const META_DESCRIPTION_MAX_LENGTH = 160

export const normalizeSeoText = (value: string) =>
  value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim()

export const createSeoDescription = (value: string, maxLength = META_DESCRIPTION_MAX_LENGTH) => {
  const normalized = normalizeSeoText(value)
  const characters = Array.from(normalized)

  if (characters.length <= maxLength) return normalized

  const truncated = characters.slice(0, maxLength - 3).join('').trimEnd()
  const lastWhitespace = truncated.lastIndexOf(' ')
  const readableCut = lastWhitespace >= Math.floor(maxLength * 0.7) ? truncated.slice(0, lastWhitespace) : truncated

  return `${readableCut}...`
}

const normalizePath = (path: string) => {
  if (!path || path === '/') return ''
  return path.startsWith('/') ? path : `/${path}`
}

export const getLocalizedUrl = (locale: string, path = '') => `${SITE_URL}/${locale}${normalizePath(path)}`

export const getLanguageAlternates = (path = '', availableLocales: readonly string[] = locales) => ({
  ...Object.fromEntries(availableLocales.map((locale) => [locale, getLocalizedUrl(locale, path)])),
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
  availableLocales?: readonly string[]
}

export const createPageMetadata = ({
  locale,
  path = '',
  title,
  description,
  keywords,
  images = [DEFAULT_SOCIAL_IMAGE],
  type = 'website',
  availableLocales = locales,
}: PageMetadataOptions): Metadata => {
  const url = getLocalizedUrl(locale, path)
  const normalizedDescription = createSeoDescription(description)

  return {
    title,
    description: normalizedDescription,
    keywords,
    alternates: {
      canonical: url,
      languages: getLanguageAlternates(path, availableLocales),
    },
    openGraph: {
      title,
      description: normalizedDescription,
      type,
      locale,
      url,
      siteName: SITE_NAME,
      images: images.map((image) => ({ url: image, alt: title })),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: normalizedDescription,
      images,
    },
  }
}
