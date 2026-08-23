import { Locales } from '@/locales'

export interface HomeProductSliderItem {
  image: string
  path: string
}

export type HomeProductSlider = HomeProductSliderItem[]

export interface ProductCategory {
  slug: string
  label: {
    [key in Locales]: string
  }
}

export interface Product {
  brand: string
  category?: string
  name: string
  slug: string
  title: string
  cover?: string
  bigscreen?: boolean
  menuTitle?: string
  puffs?: number
  images: {
    url: string
    alt: string
  }[]
  excerpt: {
    [key in Locales]: string
  }
  content: {
    [key in Locales]: string
  }
  raw_seo?: {
    description: string
    keywords: string
  }
  seo?: {
    [key in Locales]: {
      description: string
      keywords: string
    }
  }
}

export interface ProductsMap {
  [slug: string]: Product
}

export interface Products {
  [brand: string]: {
    categories?: ProductCategory[]
    products: Product[]
    puffs?: number[]
    sort: number
    enabled: boolean
    bigscreen?: boolean
  }
}

export type Brands = Array<keyof Products>
