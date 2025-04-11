export enum Locales {
  EN = 'en',
  FR = 'fr',
  ES = 'es',
  DE = 'de',
  IT = 'it',
  PT = 'pt',
  RU = 'ru',
  // TR = 'tr',
  PL = 'pl',
}

export interface HomeProductSliderItem {
  image: string
  product_slug: string
}

export type HomeProductSlider = HomeProductSliderItem[]

export interface Product {
  brand: string
  name: string
  slug: string
  title: string
  cover?: string
  bigscreen?: boolean
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
  seo: {
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
    products: Product[]
    sort: number
    enabled: boolean
    bigscreen?: boolean
  }
}

export type Brands = Array<keyof Products>
