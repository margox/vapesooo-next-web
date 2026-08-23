import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { LocalizedLink } from '@/components/Link'
import ProductCard from '@/components/ProductCard'
import ProductCategoryTabs from '@/components/ProductCategoryTabs'
import { t, Locales } from '@/locales'
import { getVisibleBrandNames, products as productsData } from '@/data/index'
import { createPageMetadata } from '@/lib/seo'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return Object.keys(productsData).map((brand) => ({ brand: brand.toLowerCase() }))
}

export async function generateMetadata({ params }: { params: Promise<{ brand: string; locale: string }> }) {
  const { brand: brandSlug, locale } = await params
  const brands = getVisibleBrandNames(locale)

  const brandName = brands.find((brand) => brand.toLowerCase() === brandSlug.toLowerCase())

  if (!brandName) {
    return {
      title: 'Brand Not Found',
      description: 'The brand you&apos;re looking for doesn&apos;t exist.',
    }
  }

  const title = t(locale as Locales, 'common.brandProducts', { brand: brandName })
  const description = `Explore ${brandName} vape products, specifications and product details on Vapesooo.`

  return createPageMetadata({
    locale: locale as Locales,
    path: `/products/brand/${brandSlug.toLowerCase()}`,
    title,
    description,
    images: productsData[brandName].products.slice(0, 1).map((product) => product.images[0].url),
  })
}

export default async function BrandProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ brand: string; locale: string }>
  searchParams: Promise<{ category?: string; puffs?: string }>
}) {
  const { brand: brandSlug, locale } = await params
  const { category, puffs } = await searchParams
  const brands = getVisibleBrandNames(locale)
  const brandName = brands.find((brand) => brand.toLowerCase() === brandSlug.toLowerCase())

  if (!brandName) {
    notFound()
  }

  const brandData = productsData[brandName]
  const categories = brandData.categories
  const activeCategory = categories?.some((item) => item.slug === category) ? category! : 'all'
  let products = brandData.products

  if (activeCategory !== 'all') {
    products = products.filter((product) => product.category === activeCategory)
  }

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

      {categories && categories.length > 0 && (
        <ProductCategoryTabs
          activeCategory={activeCategory}
          brandSlug={brandSlug.toLowerCase()}
          categories={categories}
          locale={locale as Locales}
          puffs={puffs}
        />
      )}

      <div
        id={categories ? 'product-category-panel' : undefined}
        role={categories ? 'tabpanel' : undefined}
        aria-labelledby={categories ? `product-category-tab-${activeCategory}` : undefined}>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">{t(locale as Locales, 'common.noProductsFound')}</p>
          </div>
        )}
      </div>
    </div>
  )
}
