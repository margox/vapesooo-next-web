export enum Locales {
  EN = "en",
  FR = "fr",
  ES = "es",
  DE = "de",
  IT = "it",
  PT = "pt",
  RU = "ru",
  TR = "tr",
}

export interface Product {
  name: string;
  slug: string;
  title: string;
  images: {
    url: string;
    alt: string;
  }[];
  excerpt: string;
  markdown_content: string;
  excerpt_locales: {
    [key in Locales]: string;
  };
  markdown_content_locales: {
    [key in Locales]: string;
  };
  seo: {
    meta_description: string;
    meta_keywords: string;
    og_title: string;
    og_description: string;
  };
  seo_locales: {
    [key in Locales]: {
      meta_description: string;
      meta_keywords: string;
    };
  };
}

export interface ProductsMap {
  [slug: string]: Product;
}

export interface Products {
  [brand: string]: Product[];
}

export type Brands = Array<keyof Products>;
