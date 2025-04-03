import productsData from './products.json'
import type { Products } from '@/types/products'

export const products = productsData as unknown as Products

export const brandNames = Object.keys(products)

export const brands = Object.values(products)

export const productsMap = Object.fromEntries(
  Object.keys(products).flatMap((brand) =>
    products[brand].products.map((product) => ((product.brand = brand), [product.slug, product]))
  )
)
