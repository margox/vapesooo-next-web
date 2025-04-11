import productsData from './products.json'
import homeData from './home.json'
import type { Products, HomeProductSlider } from '@/types/products'

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
