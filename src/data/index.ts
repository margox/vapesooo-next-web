import productsData from './products.json'
import homeData from './home.json'
import type { Products, HomeProductSlider } from '@/types/products'
import aboutData from './about.json'

export const products = productsData as unknown as Products

export const homeHeroProducts = homeData.hero_sliders as unknown as HomeProductSlider

export const brandNames = Object.keys(products)

export const brands = Object.values(products)

export const productsMap = Object.fromEntries(
  Object.keys(products).flatMap((brand) => {
    const bigscreen = products[brand].bigscreen
    return products[brand].products.map((product) => {
      product.brand = brand
      product.bigscreen = bigscreen
      return [product.slug, product]
    })
  })
)

export const about = aboutData as unknown as Record<string, (typeof aboutData)['en']>

// Define interfaces for news data
export interface NewsContent {
  title: string
  description: string
  content: string
}

export interface NewsItem {
  slug: string
  en: NewsContent
  es: NewsContent
  fr: NewsContent
  de: NewsContent
  it: NewsContent
  pt: NewsContent
  ru: NewsContent
  pl: NewsContent
}

export interface BrandNews {
  brand: string
  news: NewsItem[]
}
