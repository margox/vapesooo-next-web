import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import { BrandNews, NewsItem } from './index'
// Helper function to read news data
export function getNewsData(): BrandNews[] {
  const newsDir = join(process.cwd(), 'src/data/news')
  const brands = readdirSync(newsDir)

  return brands.map((brand) => {
    const brandDir = join(newsDir, brand)
    const newsFiles = readdirSync(brandDir).filter((file) => file.endsWith('.json'))

    const news = newsFiles.map((file) => {
      const content = readFileSync(join(brandDir, file), 'utf8')
      return JSON.parse(content) as NewsItem
    })

    return {
      brand,
      news,
    }
  })
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
