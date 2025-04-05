'use client'

import { LocalizedLink } from '@/components/Link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import ProductCard from '@/components/ProductCard'
import { products as productsData, homeHeroProducts } from '@/data/index'
import HeroSlider from '@/components/HeroSlider'
import { useTranslation } from '@/hooks/useTranslation'

// Get all brands
const brands = Object.keys(productsData).sort((a, b) => {
  return productsData[b].sort - productsData[a].sort
})

export default function Home() {
  const { t } = useTranslation()

  return (
    <div>
      {/* Hero Section */}
      <section className="relative max-w-[1920px] mx-auto aspect-[2/1] overflow-hidden bg-gray-100 dark:bg-gray-800">
        <div className="relative h-full w-full">
          <HeroSlider images={homeHeroProducts} />
        </div>
      </section>

      {/* Brand Sections */}
      {brands.map((brand) => {
        // Get first 4 products of this brand
        const products = productsData[brand].products.slice(0, 4)

        return (
          <section key={brand} className="py-12">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{brand}</h2>
                <LocalizedLink
                  href={`/products/brand/${brand.toLowerCase()}`}
                  className="group flex items-center gap-1 text-slate-600 hover:text-teal-600 dark:text-blue-400 dark:hover:text-blue-300">
                  {t('common.viewAllProducts')}
                  <ArrowRightIcon className="w-4 h-4 group-hover:-rotate-45 transition-transform duration-300" />
                </LocalizedLink>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}
