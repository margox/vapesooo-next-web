import { LocalizedLink } from '@/components/Link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import ProductCard from '@/components/ProductCard'
import { getVisibleBrandNames, getVisibleHomeHeroProducts, products as productsData } from '@/data/index'
import HeroSlider from '@/components/HeroSlider'
import { Locales, t } from '@/locales'
import { createPageMetadata, getLocalizedUrl, SITE_NAME, SITE_URL } from '@/lib/seo'

const featuredBrandOrder = ['jnr', 'hifancy', 'eonys', 'airmez', 'vapsolo']

function sortHomeBrands(a: string, b: string) {
  const aPriority = featuredBrandOrder.indexOf(a.toLowerCase())
  const bPriority = featuredBrandOrder.indexOf(b.toLowerCase())

  if (aPriority !== -1 || bPriority !== -1) {
    if (aPriority === -1) return 1
    if (bPriority === -1) return -1
    return aPriority - bPriority
  }

  return productsData[b].sort - productsData[a].sort
}

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
  const brands = getVisibleBrandNames(locale).sort(sortHomeBrands)
  const homeHeroProducts = getVisibleHomeHeroProducts(locale)
  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: SITE_NAME,
        url: getLocalizedUrl(locale),
        inLanguage: locale,
      },
      {
        '@type': 'Organization',
        name: SITE_NAME,
        legalName: 'Shenzhen Qingfang Technology Co., Ltd.',
        url: SITE_URL,
        logo: `${SITE_URL}/vapesooo.webp`,
        email: 'vapesooo.partner@gmail.com',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+86-137-2871-6463',
          contactType: 'sales',
          availableLanguage: locale,
        },
      },
    ],
  }

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }} />
      {/* Hero Section */}
      <section className="relative max-w-[1920px] mx-auto aspect-[1920/700] overflow-hidden bg-gray-100 dark:bg-gray-800">
        <div className="relative h-full w-full">
          <HeroSlider images={homeHeroProducts} />
        </div>
      </section>

      <section className="border-b border-black/5 bg-white py-10 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t(locale as Locales, 'meta.title')}</h1>
          <p className="mx-auto mt-4 max-w-4xl text-base leading-7 text-gray-600 dark:text-gray-300">
            {t(locale as Locales, 'meta.description')}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <LocalizedLink
              href="/products"
              className="inline-flex items-center gap-2 rounded-md bg-lime-700 px-5 py-3 font-medium text-white hover:bg-lime-800">
              {t(locale as Locales, 'common.allProducts')}
              <ArrowRightIcon className="h-4 w-4" />
            </LocalizedLink>
            <LocalizedLink
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-5 py-3 font-medium text-gray-800 hover:border-lime-700 hover:text-lime-700 dark:border-gray-600 dark:text-white">
              {t(locale as Locales, 'common.contact')}
            </LocalizedLink>
          </div>
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

      <section className="border-t border-black/5 bg-gray-50 py-12 dark:border-white/10 dark:bg-gray-800/40">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-center text-xl font-semibold text-gray-900 dark:text-white">
            {t(locale as Locales, 'common.brands')}
          </h2>
          <nav aria-label={t(locale as Locales, 'common.brands')}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-10">
              {brands.map((brand) => (
                <LocalizedLink
                  key={brand}
                  href={`/products/brand/${brand.toLowerCase()}`}
                  className="group flex min-h-16 items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-4 text-center text-sm font-semibold text-gray-800 transition-all hover:-translate-y-0.5 hover:border-lime-600 hover:text-lime-700 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-lime-500 dark:hover:text-lime-400">
                  <span>{brand}</span>
                  <ArrowRightIcon className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </LocalizedLink>
              ))}
            </div>
          </nav>
        </div>
      </section>
    </div>
  )
}
