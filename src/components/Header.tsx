'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname, useParams } from 'next/navigation'
// import { useTheme } from './ThemeProvider'
import { Locales } from '@/types/products'
import { LocalizedLink } from '@/components/Link'
import { brandNames, productsMap, products as productsData } from '@/data/index'

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

const LOCALE_NAMES = {
  [Locales.EN]: 'English',
  [Locales.FR]: 'Français',
  [Locales.ES]: 'Español',
  [Locales.DE]: 'Deutsch',
  [Locales.IT]: 'Italiano',
  [Locales.PT]: 'Português',
  [Locales.RU]: 'Русский',
  [Locales.TR]: 'Türkçe',
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

  const isHome = pathname === `/${locale}`
  const isStore = pathname === `/${locale}/products`
  const currentBrand = slug ? productsMap[slug as string]?.brand.toLowerCase() : brand

  return (
    <header className="sticky top-0 z-50 transition-all duration-300 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <LocalizedLink href="/" className="text-2xl font-medium text-white">
            Vapesooo
          </LocalizedLink>
          {/* Main navigation */}
          <nav className="hidden md:flex space-x-8">
            <LocalizedLink
              href="/"
              className={`flex items-center px-6 hover:bg-gray-800 h-16 text-gray-700 text-base font-medium uppercase ${
                isHome ? 'text-lime-500' : 'text-white'
              }`}>
              Home
            </LocalizedLink>
            <LocalizedLink
              href="/products"
              className={`flex items-center px-6 hover:bg-gray-800 h-16 text-gray-700 text-base font-medium uppercase ${
                isStore ? 'text-lime-500' : 'text-white'
              }`}>
              Store
            </LocalizedLink>
            {brandNames.map((brand) => (
              <div key={brand} className="flex items-center px-6 hover:bg-gray-800 relative h-16 group">
                <LocalizedLink
                  href={`/products/brand/${brand.toLowerCase()}`}
                  className={`flex items-center text-base font-medium uppercase ${
                    currentBrand === brand.toLowerCase() ? 'text-lime-500' : 'text-white'
                  }`}>
                  {brand}
                </LocalizedLink>
                {hidenMenu !== brand && (
                  <div className="pointer-events-none min-w-48 opacity-0 group-hover:pointer-events-auto divide-y divide-gray-900 group-hover:opacity-100 transition-opacity duration-300 absolute left-0 top-full bg-gray-800 z-10">
                    {productsData[brand]?.products.map((product) => (
                      <LocalizedLink
                        key={product.slug}
                        onClick={() => setHidenMenu(brand)}
                        href={`/products/${product.slug}`}
                        className="block px-6 py-4 text-sm text-white whitespace-nowrap uppercase font-medium hover:text-lime-500">
                        {product.title}
                      </LocalizedLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative group">
              <span className="flex items-center justify-center w-24 text-base font-medium uppercase text-white cursor-pointer flex items-center hover:bg-gray-800 group-hover:bg-gray-800 relative h-16 ">
                {LOCALE_FLAGS[locale as Locales]} {locale}
              </span>
              <div className="pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 divide-y divide-gray-900 transition-opacity duration-300 absolute top-full right-0 w-48 bg-gray-800 py-1 z-10">
                {Object.values(Locales).map((loc) => (
                  <Link
                    key={loc}
                    href={`/${loc}${currentRoute}`}
                    className={`block px-6 py-4 text-sm whitespace-nowrap uppercase font-medium bg-gray-800 hover:text-lime-500 ${
                      locale === loc ? 'text-lime-500' : 'text-white'
                    }`}>
                    {LOCALE_FLAGS[loc]} {LOCALE_NAMES[loc]}
                  </Link>
                ))}
              </div>
            </div>
            {/* Theme Toggle */}
            {/* <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle dark mode">
              {theme === 'dark' ? (
                <SunIcon className="h-5 w-5 text-yellow-400" />
              ) : (
                <MoonIcon className="h-5 w-5 text-gray-700" />
              )}
            </button> */}
          </div>
        </div>
      </div>
    </header>
  )
}
