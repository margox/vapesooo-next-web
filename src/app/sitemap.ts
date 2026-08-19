import type { MetadataRoute } from 'next'
import { statSync } from 'fs'
import { join } from 'path'
import { locales } from '@/locales'
import { brandNames, productsMap, type NewsItem } from '@/data/index'
import { getNewsData } from '@/data/server'
import { getLanguageAlternates, getLocalizedUrl } from '@/lib/seo'

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>

const localizedEntries = (
  path: string,
  changeFrequency: ChangeFrequency,
  priority: number,
  lastModified: string,
  availableLocales: readonly string[] = locales
): MetadataRoute.Sitemap =>
  availableLocales.map((locale) => ({
    url: getLocalizedUrl(locale, path),
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: getLanguageAlternates(path, availableLocales),
    },
  }))

const fileLastModified = (...paths: string[]) =>
  new Date(Math.max(...paths.map((path) => statSync(join(process.cwd(), path)).mtimeMs))).toISOString()

const getNewsLocales = (news: NewsItem) => locales.filter((locale) => Boolean(news[locale]))

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  const pageLastModified = fileLastModified('src/app/[locale]/page.tsx', 'src/lib/seo.ts')
  const productsLastModified = fileLastModified('src/data/products.json')
  const aboutLastModified = fileLastModified('src/data/about.json', 'src/app/[locale]/about/page.tsx')
  const faqLastModified = fileLastModified('src/data/faq.json', 'src/app/[locale]/faq/page.tsx')
  const contactLastModified = fileLastModified('src/app/[locale]/contact/page.tsx')
  const newsData = getNewsData()
  const allNewsLastModified = new Date(
    Math.max(...newsData.flatMap(({ news }) => news.map((item) => Date.parse(item.lastModified || pageLastModified))))
  ).toISOString()

  entries.push(...localizedEntries('', 'weekly', 1, pageLastModified))
  entries.push(...localizedEntries('/products', 'weekly', 0.9, productsLastModified))
  entries.push(...localizedEntries('/news', 'weekly', 0.8, allNewsLastModified))
  entries.push(...localizedEntries('/about', 'monthly', 0.6, aboutLastModified))
  entries.push(...localizedEntries('/faq', 'monthly', 0.6, faqLastModified))
  entries.push(...localizedEntries('/contact', 'monthly', 0.5, contactLastModified))

  for (const brandName of brandNames) {
    entries.push(
      ...localizedEntries(`/products/brand/${brandName.toLowerCase()}`, 'weekly', 0.8, productsLastModified)
    )
  }

  for (const slug of Object.keys(productsMap)) {
    entries.push(...localizedEntries(`/products/${slug}`, 'monthly', 0.7, productsLastModified))
  }

  for (const { brand, news } of newsData) {
    const brandLastModified = new Date(
      Math.max(...news.map((item) => Date.parse(item.lastModified || allNewsLastModified)))
    ).toISOString()
    entries.push(...localizedEntries(`/news/${brand}`, 'weekly', 0.7, brandLastModified))
    for (const newsItem of news) {
      const availableLocales = getNewsLocales(newsItem)
      entries.push(
        ...localizedEntries(
          `/news/${brand}/${newsItem.slug}`,
          'monthly',
          0.6,
          newsItem.lastModified || brandLastModified,
          availableLocales
        )
      )
    }
  }

  return entries
}
