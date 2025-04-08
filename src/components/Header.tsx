'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { usePathname, useParams } from 'next/navigation'
// import { useTheme } from './ThemeProvider'
import { Locales } from '@/types/products'
import { LocalizedLink } from '@/components/Link'
import { brandNames, productsMap, products as productsData } from '@/data/index'
import { useTranslation } from '@/hooks/useTranslation'

const LOCALE_FLAGS = {
  [Locales.EN]: '🇬🇧',
  [Locales.FR]: '🇫🇷',
  [Locales.ES]: '🇪🇸',
  [Locales.DE]: '🇩🇪',
  [Locales.IT]: '🇮🇹',
  [Locales.PT]: '🇵🇹',
  [Locales.RU]: '🇷🇺',
  [Locales.TR]: '🇹🇷',
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
  const currentRoute = usePathname().replace(new RegExp(`^/${locale}`), '')
  const { t } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileLanguageMenuOpen, setMobileLanguageMenuOpen] = useState(false)

  const isStore = pathname === `/${locale}/products`
  const currentBrand = slug ? productsMap[slug as string]?.brand.toLowerCase() : brand

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
    setMobileLanguageMenuOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 transition-all duration-300 bg-white/80 backdrop-blur-lg border-b border-black/5">
      <div className="relative container mx-auto px-4 flex items-center justify-between h-16">
        {/* Mobile menu button */}
        <button
          className="md:hidden absolute left-4 z-10 flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-teal-600 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle menu">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="absolute top-0 left-4 z-10 hidden md:flex space-x-12">
          <LocalizedLink
            href="/products"
            className={`flex items-center hover:text-teal-600 h-16 text-gray-700 text-base font-medium uppercase ${
              isStore ? 'text-teal-600' : 'text-slate-80'
            }`}>
            {t('common.store')}
          </LocalizedLink>
          {brandNames.map((brand) => (
            <div key={brand} className="flex items-center hover:text-teal-600 relative h-16 group">
              <LocalizedLink
                href={`/products/brand/${brand.toLowerCase()}`}
                className={`flex items-center text-base font-medium uppercase ${
                  currentBrand === brand.toLowerCase() ? 'text-teal-600' : 'text-slate-80'
                }`}>
                {brand}
              </LocalizedLink>
              {hidenMenu !== brand && (
                <div className="pointer-events-none min-w-48 opacity-0 group-hover:pointer-events-auto divide-y divide-slate-100 group-hover:opacity-100 transition-opacity duration-300 absolute left-0 mt-1 top-full bg-white border border-black/5 bg-clip-padding z-10">
                  {productsData[brand]?.products.map((product) => (
                    <LocalizedLink
                      key={product.slug}
                      onClick={() => setHidenMenu(brand)}
                      href={`/products/${product.slug}`}
                      className="block px-6 py-4 text-sm text-slate-800 whitespace-nowrap uppercase font-medium hover:text-teal-600">
                      {product.title}
                    </LocalizedLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="relative flex-1 flex items-center justify-center">
          <h1 className="absolute text-transparent pointer-events-none">Vapesooo</h1>
          <LocalizedLink href="/" className="scale-[0.4] md:scale-50">
            <Image src="/vapesooo.webp" alt="Vapesooo" width={350} height={100} />
          </LocalizedLink>
        </div>
        <div className="absolute top-0 right-4 z-10 flex items-center space-x-4">
          {/* Language Selector - Desktop */}
          <div className="relative hidden md:block group">
            <span className="flex items-center justify-center text-base font-medium uppercase text-slate-800 hover:text-teal-600 cursor-pointer relative h-16 ">
              {LOCALE_FLAGS[locale as Locales]} {locale}
            </span>
            <div className="pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 divide-y divide-slate-100 transition-opacity duration-300 absolute top-full right-0 w-48 bg-white border border-black/5 bg-clip-padding py-1 z-10">
              {Object.values(Locales).map((loc) => (
                <Link
                  key={loc}
                  href={`/${loc}${currentRoute}`}
                  className={`block px-6 py-4 text-sm whitespace-nowrap uppercase font-medium hover:text-teal-600 ${
                    locale === loc ? 'text-teal-600' : 'text-slate-80'
                  }`}>
                  {LOCALE_FLAGS[loc]} {t(`languages.${loc}`)}
                </Link>
              ))}
            </div>
          </div>

          {/* Language Selector - Mobile */}
          <button
            className="md:hidden flex items-center justify-center h-16 p-2 rounded-md text-gray-700 hover:text-teal-600 focus:outline-none"
            onClick={() => setMobileLanguageMenuOpen(!mobileLanguageMenuOpen)}
            aria-expanded={mobileLanguageMenuOpen}
            aria-label="Toggle language menu">
            <span className="flex items-center text-base font-medium uppercase">
              {LOCALE_FLAGS[locale as Locales]} {locale}
            </span>
          </button>

          {/* Theme Toggle */}
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
              isStore ? 'text-teal-600' : 'text-slate-800'
            } hover:text-teal-600 hover:bg-gray-50`}>
            {t('common.store')}
          </LocalizedLink>

          {brandNames.map((brand) => (
            <LocalizedLink
              key={brand}
              href={`/products/brand/${brand.toLowerCase()}`}
              className={`block px-6 py-3 text-base font-medium uppercase ${
                currentBrand === brand.toLowerCase() ? 'text-teal-600' : 'text-slate-800'
              } hover:text-teal-600 hover:bg-gray-50`}>
              {brand}
            </LocalizedLink>
          ))}
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
                locale === loc ? 'text-teal-600' : 'text-slate-800'
              } hover:text-teal-600 hover:bg-gray-50`}>
              {LOCALE_FLAGS[loc]} {t(`languages.${loc}`)}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
