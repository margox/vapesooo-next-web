import ImageSlider from '@/components/ImageSlider'
import { LocalizedLink } from '@/components/Link'
import { productsMap } from '@/data/index'
import ProductAskButton from '@/components/ProductAskButton'
import { Locales, t } from '@/locales'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params
  const product = productsMap[slug]

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The product you&apos;re looking for doesn&apos;t exist.',
    }
  }

  if (product.raw_seo) {
    return {
      title: product.title || product.name,
      description: product.raw_seo.description,
      keywords: product.raw_seo.keywords,
      openGraph: {
        title: product.title || product.name,
        description: product.raw_seo.description,
        images: product.images.map((image) => ({
          url: image.url,
        })),
      },
      twitter: {
        card: 'summary_large_image',
        title: product.title || product.name,
        description: product.raw_seo.description,
        images: product.images.map((image) => image.url),
      },
    }
  }

  return {
    title: product.title || product.name,
    description: product.seo[locale as Locales].description,
    keywords: product.seo[locale as Locales].keywords,
    openGraph: {
      title: product.title || product.name,
      description: product.seo[locale as Locales].description,
      images: product.images.map((image) => ({
        url: image.url,
      })),
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title || product.name,
      description: product.seo[locale as Locales].description,
      images: product.images.map((image) => image.url),
    },
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { locale, slug } = await params
  const product = productsMap[slug]
  const brandName = product.brand

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Product Not Found</h1>
        <p className="mb-8 text-gray-600 dark:text-gray-400">The product you&apos;re looking for doesn&apos;t exist.</p>
        <LocalizedLink
          href="/products"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
          View All Products
        </LocalizedLink>
      </div>
    )
  }

  if (product.bigscreen) {
    return (
      <div className="max-w-[1920px] mx-auto">
        {product.images.map((image) => (
          <div key={image.url} className="w-full h-full">
            <img
              alt={image.alt}
              className="w-full h-auto"
              src={image.url + '?imageMogr2/format/webp/thumbnail/1920x'}
              width={1920}
              height={1080}
            />
          </div>
        ))}
        <div className="h-8" />
        <ProductAskButton sticky productTitle={product.title || product.name} locale={locale as Locales} />
      </div>
    )
  }

  // Get content based on locale or fall back to default
  const descriptionContent = product.content?.[locale as Locales] || product.content?.[Locales.EN]

  return (
    <div className="container mx-auto px-4 py-8">
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
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: descriptionContent }}
          />
        </div>
      )}
    </div>
  )
}
