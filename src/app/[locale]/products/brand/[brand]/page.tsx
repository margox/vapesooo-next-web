'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { LocalizedLink } from '@/components/Link'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/types/products'
import { products as productsData } from '@/data/index'
import { useTranslation } from '@/hooks/useTranslation'

const brands = Object.keys(productsData)

export default function BrandProductsPage() {
  const params = useParams()
  const brandSlug = params.brand as string
  const [products, setProducts] = useState<Product[]>([])
  const [brandName, setBrandName] = useState<string>('')
  const { t } = useTranslation();

  useEffect(() => {
    // Find the brand with case-insensitive matching
    const foundBrand = brands.find((brand) => brand.toLowerCase() === brandSlug.toLowerCase())

    if (foundBrand) {
      setBrandName(foundBrand)
      setProducts(productsData[foundBrand].products || [])
    }
  }, [brandSlug])

  if (!brandName) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t('common.brandNotFound')}</h1>
        <p className="mb-8 text-gray-600 dark:text-gray-400">{t('common.brandNotFoundDesc')}</p>
        <LocalizedLink
          href="/products"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
          {t('common.viewAllProducts')}
        </LocalizedLink>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <LocalizedLink
          href="/products"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
          {t('common.backToProducts')}
        </LocalizedLink>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        {t('common.brandProducts', { brand: brandName })}
      </h1>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">{t('common.noProductsFound')}</p>
        </div>
      )}
    </div>
  )
}
