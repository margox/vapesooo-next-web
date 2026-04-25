import productsData from './products.json'
import homeData from './home.json'
import type { Products, HomeProductSlider } from '@/types/products'
import aboutData from './about.json'

export const products = productsData as unknown as Products

export const homeHeroProducts = homeData.hero_sliders as unknown as HomeProductSlider

export const excludesBandsMap: Record<string, string[]> = {
  zh: ['eonys'],
}

export const getPreferredLanguageCode = (languages: string | readonly string[] | undefined): string | undefined => {
  const preferredLanguage = typeof languages === 'string' ? languages.split(',')[0] : languages?.[0]
  return preferredLanguage?.trim().toLowerCase().split(/[-_;]/)[0]
}

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

export const isBrandExcluded = (lang: string | undefined, brand: string | undefined): boolean => {
  if (!lang || !brand) return false

  const languageCode = getPreferredLanguageCode(lang)
  return (excludesBandsMap[languageCode ?? ''] ?? []).some(
    (excludedBrand) => excludedBrand.toLowerCase() === brand.toLowerCase()
  )
}

export const getVisibleBrandNames = (lang: string | undefined) => {
  return brandNames.filter((brand) => !isBrandExcluded(lang, brand))
}

export const getVisibleProducts = (lang: string | undefined) => {
  return getVisibleBrandNames(lang).flatMap((brand) => products[brand].products)
}

export const getVisibleProductsMap = (lang: string | undefined) => {
  return Object.fromEntries(Object.entries(productsMap).filter(([, product]) => !isBrandExcluded(lang, product.brand)))
}

export const getVisibleHomeHeroProducts = (lang: string | undefined) => {
  return homeHeroProducts.filter((item) => {
    const brand = item.path.match(/\/products\/brand\/([^/?#]+)/)?.[1]
    return !isBrandExcluded(lang, brand)
  })
}

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
