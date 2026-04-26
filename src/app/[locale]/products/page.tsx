// import Link from "next/link";
import ProductCard from '@/components/ProductCard'
import { getVisibleProducts } from '@/data/index'
import { t, Locales } from '@/locales'
import { getRequestBrowserLanguage } from '@/lib/request-language'

export default async function ProductsPage({ params }: { params: Promise<{ brand: string; locale: string }> }) {
  const { locale } = await params
  const browserLanguage = await getRequestBrowserLanguage()
  const allProducts = getVisibleProducts(browserLanguage)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">
        {t(locale as Locales, 'common.allProducts')}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allProducts.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  )
}
