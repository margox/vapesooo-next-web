import ImageSlider from '@/components/ImageSlider'
import { LocalizedLink } from '@/components/Link'
import ProductCard from '@/components/ProductCard'
import { products as productsData, productsMap } from '@/data/index'
import ProductAskButton from '@/components/ProductAskButton'
import { Locales, t } from '@/locales'
import { createPageMetadata, createSeoDescription, getLocalizedUrl } from '@/lib/seo'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import type { Product } from '@/types/products'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Keep the large product catalog out of the deployment bundle. Product pages are
// generated on first request and then cached by the platform.
export const revalidate = 86400

export function generateStaticParams() {
  return []
}

const demoteEmbeddedH1 = (content: string) => content.replace(/<(\/?)h1(\s|>)/gi, '<$1h2$2')

function RelatedProducts({ products, locale, brandName }: { products: Product[]; locale: string; brandName: string }) {
  if (products.length === 0) return null

  return (
    <section className="mt-14 border-t border-gray-200 pt-10 dark:border-gray-700">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t(locale as Locales, 'common.brandProducts', { brand: brandName })}
        </h2>
        <LocalizedLink
          href={`/products/brand/${brandName.toLowerCase()}`}
          className="text-sm font-medium text-lime-700 hover:text-lime-800">
          {t(locale as Locales, 'common.viewAllProducts')}
        </LocalizedLink>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} locale={locale} />
        ))}
      </div>
    </section>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params
  const product = productsMap[slug]

  if (!product) {
    return {
      title: 'Product Not Found',
      robots: { index: false, follow: false },
    }
  }

  const localizedSeo = product.seo?.[locale as Locales]
  return createPageMetadata({
    locale: locale as Locales,
    path: `/products/${slug}`,
    title: product.title || product.name,
    description: createSeoDescription(localizedSeo?.description || product.raw_seo?.description || product.name),
    keywords: localizedSeo?.keywords || product.raw_seo?.keywords,
    images: product.images.slice(0, 4).map((image) => image.url),
  })
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { locale, slug } = await params
  const product = productsMap[slug]

  if (!product) {
    notFound()
  }

  const brandName = product.brand
  const localizedSeo = product.seo?.[locale as Locales]
  const productDescription = createSeoDescription(
    localizedSeo?.description || product.raw_seo?.description || product.name
  )
  const relatedProducts = productsData[brandName].products.filter((item) => item.slug !== slug).slice(0, 4)
  const productUrl = getLocalizedUrl(locale, `/products/${slug}`)
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title || product.name,
    description: productDescription,
    image: product.images.map((image) => image.url),
    brand: { '@type': 'Brand', name: brandName },
    url: productUrl,
    inLanguage: locale,
    manufacturer: { '@type': 'Organization', name: brandName },
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t(locale as Locales, 'common.home'), item: getLocalizedUrl(locale) },
      {
        '@type': 'ListItem',
        position: 2,
        name: t(locale as Locales, 'common.products'),
        item: getLocalizedUrl(locale, '/products'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: brandName,
        item: getLocalizedUrl(locale, `/products/brand/${brandName.toLowerCase()}`),
      },
      { '@type': 'ListItem', position: 4, name: product.title || product.name, item: productUrl },
    ],
  }
  const structuredDataScripts = (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </>
  )

  if (product.bigscreen) {
    return (
      <div className="max-w-[1920px] mx-auto">
        {structuredDataScripts}
        <div className="container mx-auto px-4 py-8">
          <nav className="mb-4 flex flex-wrap gap-2 text-sm text-gray-500">
            <LocalizedLink href="/">{t(locale as Locales, 'common.home')}</LocalizedLink>
            <span>/</span>
            <LocalizedLink href={`/products/brand/${brandName.toLowerCase()}`}>{brandName}</LocalizedLink>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{product.title || product.name}</h1>
        </div>
        {product.images.map((image) => (
          <div key={image.url} className="w-full h-full">
            <Image
              alt={image.alt}
              className="w-full h-auto"
              src={image.url + '?imageMogr2/format/webp/thumbnail/1920x'}
              width={1920}
              height={1080}
              unoptimized
            />
          </div>
        ))}
        <div className="h-8" />
        <ProductAskButton sticky productTitle={product.title || product.name} locale={locale as Locales} />
        <div className="container mx-auto px-4 pb-12">
          <RelatedProducts products={relatedProducts} locale={locale} brandName={brandName} />
        </div>
      </div>
    )
  }

  // Get content based on locale or fall back to default
  const descriptionContent = product.content?.[locale as Locales] || product.content?.[Locales.EN]

  return (
    <div className="container mx-auto px-4 py-8">
      {structuredDataScripts}
      {/* Breadcrumb */}

      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
          <ImageSlider images={product.images} />
        </div>
        <div className="w-full lg:w-1/2">
          <nav className="flex mb-8 text-sm">
            <LocalizedLink
              href="/"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              {t(locale as Locales, 'common.home')}
            </LocalizedLink>
            <span className="mx-2 text-gray-500 dark:text-gray-400">/</span>
            <LocalizedLink
              href="/products"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              {t(locale as Locales, 'common.products')}
            </LocalizedLink>
            <span className="mx-2 text-gray-500 dark:text-gray-400">/</span>
            <LocalizedLink
              href={`/products/brand/${brandName.toLowerCase()}`}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              {t(locale as Locales, 'common.brandProducts', { brand: brandName })}
            </LocalizedLink>
          </nav>
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{product.title || product.name}</h1>
          <p
            className="text-lg mb-6 text-gray-700 dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: product.excerpt[locale as Locales] }}
          />
          <ProductAskButton productTitle={product.title || product.name} locale={locale as Locales} />
        </div>
      </div>

      {/* Product Description */}
      {descriptionContent && (
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div
            className="prose dark:prose-invert max-w-none whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: demoteEmbeddedH1(descriptionContent) }}
          />
        </div>
      )}

      <RelatedProducts products={relatedProducts} locale={locale} brandName={brandName} />
    </div>
  )
}
