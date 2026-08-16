import type { MetadataRoute } from 'next'
import { locales } from '@/locales'
import { brandNames, productsMap } from '@/data/index'
import { getNewsData } from '@/data/server'
import { getLanguageAlternates, getLocalizedUrl } from '@/lib/seo'

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>

const localizedEntries = (
  path: string,
  changeFrequency: ChangeFrequency,
  priority: number
): MetadataRoute.Sitemap =>
  locales.map((locale) => ({
    url: getLocalizedUrl(locale, path),
    changeFrequency,
    priority,
    alternates: {
      languages: getLanguageAlternates(path),
    },
  }))

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  entries.push(...localizedEntries('', 'daily', 1))
  entries.push(...localizedEntries('/products', 'daily', 0.9))
  entries.push(...localizedEntries('/news', 'daily', 0.8))
  entries.push(...localizedEntries('/about', 'monthly', 0.6))
  entries.push(...localizedEntries('/faq', 'monthly', 0.6))
  entries.push(...localizedEntries('/contact', 'monthly', 0.5))

  for (const brandName of brandNames) {
    entries.push(...localizedEntries(`/products/brand/${brandName.toLowerCase()}`, 'weekly', 0.8))
  }

  for (const slug of Object.keys(productsMap)) {
    entries.push(...localizedEntries(`/products/${slug}`, 'weekly', 0.7))
  }

  for (const { brand, news } of getNewsData()) {
    entries.push(...localizedEntries(`/news/${brand}`, 'weekly', 0.7))
    for (const { slug } of news) {
      entries.push(...localizedEntries(`/news/${brand}/${slug}`, 'monthly', 0.6))
    }
  }

  return entries
}
