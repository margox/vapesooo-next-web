import { readdirSync, readFileSync, statSync } from 'fs'
import { join } from 'path'
import { BrandNews, NewsItem } from './index'

let cachedNewsData: BrandNews[] | null = null

// Helper function to read news data
export function getNewsData(): BrandNews[] {
  if (cachedNewsData) return cachedNewsData

  const newsDir = join(process.cwd(), 'src/data/news')
  const brands = readdirSync(newsDir)

  cachedNewsData = brands.map((brand) => {
    const brandDir = join(newsDir, brand)
    const newsFiles = readdirSync(brandDir).filter((file) => file.endsWith('.json'))

    const news = newsFiles.map((file) => {
      const content = readFileSync(join(brandDir, file), 'utf8')
      const newsItem = JSON.parse(content) as NewsItem
      newsItem.lastModified = statSync(join(brandDir, file)).mtime.toISOString()
      return newsItem
    })

    return {
      brand,
      news,
    }
  })

  return cachedNewsData
}

// Helper to get a single news item by slug
export function getNewsBySlug(slug: string): NewsItem | null {
  const allNews = getNewsData()
  for (const brandNews of allNews) {
    const news = brandNews.news.find((n) => n.slug === slug)
    if (news) return news
  }
  return null
}

export function getNewsByBrand(brand: string): NewsItem[] | null {
  return getNewsData().find((brandNews) => brandNews.brand === brand)?.news ?? null
}

export function getNewsByBrandAndSlug(brand: string, slug: string): NewsItem | null {
  return getNewsByBrand(brand)?.find((news) => news.slug === slug) ?? null
}
