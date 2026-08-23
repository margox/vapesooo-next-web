import { LocalizedLink } from '@/components/Link'
import { Locales } from '@/locales'
import type { ProductCategory } from '@/types/products'

interface ProductCategoryTabsProps {
  activeCategory: string
  brandSlug: string
  categories: ProductCategory[]
  locale: Locales
  puffs?: string
}

export default function ProductCategoryTabs({
  activeCategory,
  brandSlug,
  categories,
  locale,
  puffs,
}: ProductCategoryTabsProps) {
  return (
    <nav aria-label="Product categories" className="mb-8 overflow-x-auto pb-2">
      <div className="flex min-w-max gap-3 sm:flex-wrap" role="tablist">
        {categories.map((category) => {
          const active = category.slug === activeCategory
          const search = new URLSearchParams()
          if (category.slug !== 'all') search.set('category', category.slug)
          if (puffs) search.set('puffs', puffs)
          const query = search.toString()

          return (
            <LocalizedLink
              key={category.slug}
              id={`product-category-tab-${category.slug}`}
              href={`/products/brand/${brandSlug}${query ? `?${query}` : ''}`}
              role="tab"
              aria-controls="product-category-panel"
              aria-selected={active}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all sm:px-6 sm:text-base ${
                active
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-blue-700 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600'
              }`}>
              {category.label[locale] || category.label[Locales.EN]}
            </LocalizedLink>
          )
        })}
      </div>
    </nav>
  )
}
