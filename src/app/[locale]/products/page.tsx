'use client'

// import Link from "next/link";
import ProductCard from '@/components/ProductCard'
import { products as productsData } from '@/data/index'
import { useTranslation } from '@/hooks/useTranslation'

const allProducts = Object.values(productsData).flatMap((brand) => brand.products)

export default function ProductsPage() {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">{t('common.allProducts')}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allProducts.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  )
}
