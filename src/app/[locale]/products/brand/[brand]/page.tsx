import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { LocalizedLink } from '@/components/Link'
import ProductCard from '@/components/ProductCard'
import { t, Locales } from '@/locales'
import { products as productsData } from '@/data/index'

const brands = Object.keys(productsData)

export async function generateMetadata({ params }: { params: Promise<{ brand: string; locale: string }> }) {
  const { brand: brandSlug, locale } = await params

  const brandName = brands.find((brand) => brand.toLowerCase() === brandSlug.toLowerCase())

  if (!brandName) {
    return {
      title: 'Brand Not Found',
      description: 'The brand you&apos;re looking for doesn&apos;t exist.',
    }
  }

  return {
    title: `${brandName} - ${t(locale as Locales, 'common.brandProducts', { brand: brandName })}`,
    description: `Explore ${brandName} products on our website. We offer a wide range of ${brandName} products for all your vaping needs.`,
    openGraph: {
      title: `${brandName} - ${t(locale as Locales, 'common.brandProducts', { brand: brandName })}`,
      description: `Explore ${brandName} products on our website. We offer a wide range of ${brandName} products for all your vaping needs.`,
      images: productsData[brandName].products.map((product) => product.images[0].url),
    },
    twitter: {
      title: `${brandName} - ${t(locale as Locales, 'common.brandProducts', { brand: brandName })}`,
      description: `Explore ${brandName} products on our website. We offer a wide range of ${brandName} products for all your vaping needs.`,
      images: productsData[brandName].products.map((product) => product.images[0].url),
    },
  }
}

export default async function BrandProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ brand: string; locale: string }>
  searchParams: Promise<{ puffs?: string }>
}) {
  const { brand: brandSlug, locale } = await params
  const { puffs } = await searchParams

  const brandName = brands.find((brand) => brand.toLowerCase() === brandSlug.toLowerCase())

  if (!brandName) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          {t(locale as Locales, 'common.brandNotFound')}
        </h1>
        <p className="mb-8 text-gray-600 dark:text-gray-400">{t(locale as Locales, 'common.brandNotFoundDesc')}</p>
        <LocalizedLink
          href="/products"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
          {t(locale as Locales, 'common.viewAllProducts')}
        </LocalizedLink>
      </div>
    )
  }

  let products = productsData[brandName].products

  // Filter by puffs if puffs parameter is provided
  if (puffs) {
    const puffsValue = parseInt(puffs, 10)
    if (!isNaN(puffsValue)) {
      products = products.filter((product) => product.puffs === puffsValue)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <LocalizedLink
          href="/products"
          className="flex items-center gap-1 text-slate-600 hover:text-lime-600 dark:text-blue-400 dark:hover:text-blue-300">
          <ArrowLeftIcon className="w-4 h-4" />
          {t(locale as Locales, 'common.backToProducts')}
        </LocalizedLink>
      </div>

      <h1 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">
        {puffs && !isNaN(parseInt(puffs, 10))
          ? `${brandName} - ${Math.floor(parseInt(puffs, 10) / 1000)}K Puffs`
          : t(locale as Locales, 'common.brandProducts', { brand: brandName })}
      </h1>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">{t(locale as Locales, 'common.noProductsFound')}</p>
        </div>
      )}
    </div>
  )
}
