import { LocalizedLink } from '@/components/Link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import ProductCard from '@/components/ProductCard'
import { getVisibleBrandNames, getVisibleHomeHeroProducts, products as productsData } from '@/data/index'
import HeroSlider from '@/components/HeroSlider'
import { Locales, t } from '@/locales'
import { createPageMetadata, getLocalizedUrl, SITE_NAME } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return createPageMetadata({
    locale: locale as Locales,
    title: t(locale as Locales, 'meta.title'),
    description: t(locale as Locales, 'meta.description'),
  })
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const brands = getVisibleBrandNames(locale).sort((a, b) => {
    return productsData[b].sort - productsData[a].sort
  })
  const homeHeroProducts = getVisibleHomeHeroProducts(locale)
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: getLocalizedUrl(locale),
    inLanguage: locale,
  }

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <h1 className="sr-only">{t(locale as Locales, 'meta.title')}</h1>
      {/* Hero Section */}
      <section className="relative max-w-[1920px] mx-auto aspect-[1920/700] overflow-hidden bg-gray-100 dark:bg-gray-800">
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
                  className="group flex items-center gap-1 text-slate-600 hover:text-lime-600 dark:text-blue-400 dark:hover:text-blue-300">
                  {t(locale as Locales, 'common.viewAllProducts')}
                  <ArrowRightIcon className="w-4 h-4 group-hover:-rotate-45 transition-transform duration-300" />
                </LocalizedLink>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.slug} product={product} locale={locale} />
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}
