// import Link from "next/link";
import ProductCard from '@/components/ProductCard'
import { getVisibleProducts } from '@/data/index'
import { t, Locales } from '@/locales'
import { createPageMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const title = t(locale as Locales, 'common.allProducts')

  return createPageMetadata({
    locale: locale as Locales,
    path: '/products',
    title,
    description: `${title} - Vapesooo`,
  })
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const allProducts = getVisibleProducts(locale)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">
        {t(locale as Locales, 'common.allProducts')}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allProducts.map((product) => (
          <ProductCard key={product.slug} product={product} locale={locale} />
        ))}
      </div>
    </div>
  )
}
