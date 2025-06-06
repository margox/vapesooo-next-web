'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname, useParams } from 'next/navigation'
// import { useTheme } from './ThemeProvider'
import { Locales } from '@/locales'
import { LocalizedLink } from '@/components/Link'
import { brandNames, productsMap, products as productsData } from '@/data/index'
import { useTranslation } from '@/hooks/useTranslation'
import { Bars3Icon, XMarkIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

const LOCALE_FLAGS = {
  [Locales.EN]: '🇬🇧',
  [Locales.FR]: '🇫🇷',
  [Locales.ES]: '🇪🇸',
  [Locales.DE]: '🇩🇪',
  [Locales.IT]: '🇮🇹',
  [Locales.PT]: '🇵🇹',
  [Locales.RU]: '🇷🇺',
  // [Locales.TR]: '🇹🇷',
  [Locales.PL]: '🇵🇱',
}

type UseAutoResetFlag = <T>(delay?: number) => [T | null, (value: T) => void]

const useAutoResetFlag: UseAutoResetFlag = <T,>(delay = 100) => {
  const [value, setValue] = useState<T | null>(null)

  useEffect(() => {
    const timeout = setTimeout(() => setValue(null), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  return [value, setValue] as const
}

export default function Header() {
  // const { theme, toggleTheme } = useTheme()
  const pathname = usePathname()
  const { brand, locale, slug } = useParams()
  const [hidenMenu, setHidenMenu] = useAutoResetFlag<string>()
  const [activeBrand, setActiveBrand] = useState<string | null>(null)
  const currentRoute = usePathname().replace(new RegExp(`^/${locale}`), '')
  const { t } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileLanguageMenuOpen, setMobileLanguageMenuOpen] = useState(false)
  const [mobileBrandsMenuOpen, setMobileBrandsMenuOpen] = useState(false)

  const isStore = pathname === `/${locale}/products`
  const isAbout = pathname.includes(`/${locale}/about`)
  const isNews = pathname.includes(`/${locale}/news`)
  const isBrandsPage = pathname.includes(`/${locale}/products/brand/`)
  const isFAQ = pathname.includes(`/${locale}/faq`)
  const currentBrand = slug ? productsMap[slug as string]?.brand.toLowerCase() : brand

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
    setMobileLanguageMenuOpen(false)
    setMobileBrandsMenuOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 transition-all duration-300 bg-white/80 backdrop-blur-lg border-b border-black/5">
      <div className="relative container mx-auto px-4 flex items-center h-16">
        {/* Mobile menu button */}
        <button
          className="md:hidden absolute left-4 z-10 flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-lime-600 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle menu">
          {mobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>

        <div className="md:relative md:left-0 md:translate-x-0 flex items-center justify-center absolute left-1/2 -translate-x-1/2">
          <h1 className="absolute text-transparent pointer-events-none">Vapesooo</h1>
          <Link href="/">
            <img src="/vapesooo.webp" alt="Vapesooo" width={140} height={42} />
          </Link>
        </div>
        {/* Desktop Navigation */}
        <nav className="flex-1 hidden ml-12 md:flex space-x-12">
          {/* Consolidated Brands dropdown */}
          <div className="flex items-center hover:text-lime-600 relative h-16 group">
            <span
              className={`flex items-center text-base font-medium uppercase cursor-pointer ${
                isBrandsPage ? 'text-lime-600' : 'text-slate-80'
              }`}>
              {t('common.brands')}
            </span>
            <div className="pointer-events-none min-w-48 opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 transition-opacity duration-300 absolute left-0 mt-0 top-full bg-white border border-black/5 bg-clip-padding z-10">
              {brandNames.map((brandName) => (
                <div
                  key={brandName}
                  className="relative group/brand"
                  onMouseEnter={() => setActiveBrand(brandName)}
                  onMouseLeave={() => setActiveBrand(null)}>
                  <LocalizedLink
                    href={`/products/brand/${brandName.toLowerCase()}`}
                    className={`block px-6 py-4 text-sm text-slate-800 whitespace-nowrap uppercase font-medium hover:text-lime-600 ${
                      currentBrand === brandName.toLowerCase() ? 'text-lime-600' : ''
                    }`}>
                    {brandName}
                  </LocalizedLink>

                  {/* Products submenu for each brand */}
                  {activeBrand === brandName && hidenMenu !== brandName && (
                    <div className="absolute left-full top-0 bg-white border border-black/5 bg-clip-padding z-10 min-w-48">
                      {productsData[brandName]?.products.slice(0, 6).map((product) => (
                        <LocalizedLink
                          key={product.slug}
                          onClick={() => setHidenMenu(brandName)}
                          href={`/products/${product.slug}`}
                          className="block px-6 py-4 text-sm text-slate-800 whitespace-nowrap uppercase font-medium hover:text-lime-600">
                          {product.title || product.name}
                        </LocalizedLink>
                      ))}

                      {/* "View all products" link if there are more than 6 products */}
                      {productsData[brandName]?.products.length > 6 && (
                        <LocalizedLink
                          href={`/products/brand/${brandName.toLowerCase()}`}
                          className="block px-6 py-4 text-sm text-lime-600 whitespace-nowrap uppercase font-medium hover:text-lime-700 bg-gray-50 border-t border-gray-100">
                          {t('common.viewAll')} ({productsData[brandName]?.products.length})
                        </LocalizedLink>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <LocalizedLink
            href="/news"
            className={`flex items-center hover:text-lime-600 h-16 text-gray-700 text-base font-medium uppercase ${
              isNews ? 'text-lime-600' : 'text-slate-80'
            }`}>
            {t('common.news')}
          </LocalizedLink>

          <LocalizedLink
            href="/about"
            className={`flex items-center hover:text-lime-600 h-16 text-gray-700 text-base font-medium uppercase ${
              isAbout ? 'text-lime-600' : 'text-slate-80'
            }`}>
            {t('common.about')}
          </LocalizedLink>

          <LocalizedLink
            href="/faq"
            className={`flex items-center hover:text-lime-600 h-16 text-gray-700 text-base font-medium uppercase ${
              isFAQ ? 'text-lime-600' : 'text-slate-80'
            }`}>
            FAQ
          </LocalizedLink>

          <LocalizedLink
            href="/contact"
            className={`flex items-center hover:text-lime-600 h-16 text-gray-700 text-base font-medium uppercase ${
              pathname.includes(`/${locale}/contact`) ? 'text-lime-600' : 'text-slate-80'
            }`}>
            {t('common.contact')}
          </LocalizedLink>
        </nav>

        <div className="absolute top-0 right-4 z-10 flex items-center space-x-4">
          {/* Language Selector - Desktop */}
          <div className="relative hidden md:block group">
            <span className="flex items-center justify-center text-base font-medium uppercase text-slate-800 hover:text-lime-600 cursor-pointer relative h-16 ">
              {LOCALE_FLAGS[locale as Locales]} {locale}
            </span>
            <div className="pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 divide-y divide-slate-100 transition-opacity duration-300 absolute top-full right-0 w-48 bg-white border border-black/5 bg-clip-padding py-1 z-10">
              {Object.values(Locales).map((loc) => (
                <Link
                  key={loc}
                  href={`/${loc}${currentRoute}`}
                  className={`block px-6 py-4 text-sm whitespace-nowrap uppercase font-medium hover:text-lime-600 ${
                    locale === loc ? 'text-lime-600' : 'text-slate-80'
                  }`}>
                  {LOCALE_FLAGS[loc]} {t(`languages.${loc}`)}
                </Link>
              ))}
            </div>
          </div>

          {/* Language Selector - Mobile */}
          <button
            className="md:hidden flex items-center justify-center h-16 p-2 rounded-md text-gray-700 hover:text-lime-600 focus:outline-none"
            onClick={() => setMobileLanguageMenuOpen(!mobileLanguageMenuOpen)}
            aria-expanded={mobileLanguageMenuOpen}
            aria-label="Toggle language menu">
            <span className="flex items-center text-base font-medium uppercase">
              {LOCALE_FLAGS[locale as Locales]} {locale}
            </span>
          </button>

          {/* Theme Toggle (commented out but updated) */}
          {/* <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-black/5"
              aria-label="Toggle dark mode">
              {theme === 'dark' ? (
                <SunIcon className="h-5 w-5 text-yellow-400" />
              ) : (
                <MoonIcon className="h-5 w-5 text-gray-700" />
              )}
            </button> */}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
        <nav className="bg-white border-t border-black/5 py-2">
          <LocalizedLink
            href="/products"
            className={`block px-6 py-3 text-base font-medium uppercase ${
              isStore ? 'text-lime-600' : 'text-slate-800'
            } hover:text-lime-600 hover:bg-gray-50`}>
            {t('common.store')}
          </LocalizedLink>

          {/* Mobile Brands menu */}
          <div className="block">
            <button
              onClick={() => setMobileBrandsMenuOpen(!mobileBrandsMenuOpen)}
              className={`w-full text-left px-6 py-3 text-base font-medium uppercase ${
                isBrandsPage ? 'text-lime-600' : 'text-slate-800'
              } hover:text-lime-600 hover:bg-gray-50 flex justify-between items-center`}>
              {t('common.brands')}
              {mobileBrandsMenuOpen ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
            </button>

            {/* Mobile brands submenu */}
            <div
              className={`transition-all duration-300 overflow-hidden bg-gray-50 ${
                mobileBrandsMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
              }`}>
              {brandNames.map((brand) => (
                <LocalizedLink
                  key={brand}
                  href={`/products/brand/${brand.toLowerCase()}`}
                  className={`block px-10 py-3 text-base font-medium uppercase ${
                    currentBrand === brand.toLowerCase() ? 'text-lime-600' : 'text-slate-800'
                  } hover:text-lime-600 hover:bg-gray-100`}>
                  {brand}
                </LocalizedLink>
              ))}
            </div>
          </div>

          {/* Add News link */}
          <LocalizedLink
            href="/news"
            className={`block px-6 py-3 text-base font-medium uppercase ${
              isNews ? 'text-lime-600' : 'text-slate-800'
            } hover:text-lime-600 hover:bg-gray-50`}>
            {t('common.news')}
          </LocalizedLink>

          {/* Add About link */}
          <LocalizedLink
            href="/about"
            className={`block px-6 py-3 text-base font-medium uppercase ${
              isAbout ? 'text-lime-600' : 'text-slate-800'
            } hover:text-lime-600 hover:bg-gray-50`}>
            {t('common.about')}
          </LocalizedLink>

          {/* Add FAQ link */}
          <LocalizedLink
            href="/faq"
            className={`block px-6 py-3 text-base font-medium uppercase ${
              isFAQ ? 'text-lime-600' : 'text-slate-800'
            } hover:text-lime-600 hover:bg-gray-50`}>
            FAQ
          </LocalizedLink>

          <LocalizedLink
            href="/contact"
            className={`block px-6 py-3 text-base font-medium uppercase ${
              pathname.includes(`/${locale}/contact`) ? 'text-lime-600' : 'text-slate-800'
            } hover:text-lime-600 hover:bg-gray-50`}>
            {t('common.contact')}
          </LocalizedLink>
        </nav>
      </div>

      {/* Mobile Language Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileLanguageMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
        <div className="bg-white border-t border-black/5 py-2 divide-y divide-slate-100">
          {Object.values(Locales).map((loc) => (
            <Link
              key={loc}
              href={`/${loc}${currentRoute}`}
              className={`block px-6 py-3 text-base font-medium uppercase ${
                locale === loc ? 'text-lime-600' : 'text-slate-800'
              } hover:text-lime-600 hover:bg-gray-50`}>
              {LOCALE_FLAGS[loc]} {t(`languages.${loc}`)}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
