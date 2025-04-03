'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname, useParams } from 'next/navigation'
// import { useTheme } from './ThemeProvider'
import { Locales } from '@/types/products'
import { LocalizedLink } from '@/components/Link'
import { brandNames, products as productsData } from '@/data/index'

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
  const { brand, locale } = useParams()
  const [hidenMenu, setHidenMenu] = useAutoResetFlag<string>()
  const currentRoute = usePathname().replace(new RegExp(`^/${locale}`), '')

  return (
    <header className="sticky top-0 z-50 transition-all duration-300 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <LocalizedLink href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
            Vapesooo
          </LocalizedLink>
          {/* Main navigation */}
          <nav className="hidden md:flex space-x-6">
            <LocalizedLink
              href="/"
              className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              Home
            </LocalizedLink>
            {brandNames.map((brd) => (
              <div key={brd} className="relative group">
                <LocalizedLink
                  href={`/products/brand/${brd.toLowerCase()}`}
                  className={`flex items-center hover:text-gray-900 ${
                    brand === brd.toLowerCase() ? 'text-gray-900' : 'text-gray-600'
                  }`}>
                  {brd}
                </LocalizedLink>
                {hidenMenu !== brd && (
                  <div className="pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 transition-opacity duration-300 absolute left-0 top-full bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
                    {productsData[brd]?.products.map((product) => (
                      <LocalizedLink
                        key={product.slug}
                        onClick={() => setHidenMenu(brd)}
                        href={`/products/${product.slug}`}
                        className="block px-4 py-2 text-sm text-gray-700 whitespace-nowrap hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                        {product.title}
                      </LocalizedLink>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <LocalizedLink
              href="/products"
              className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              All Products
            </LocalizedLink>
          </nav>
          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                <span className="uppercase">
                  {LOCALE_FLAGS[locale as Locales]} {locale}
                </span>
              </button>
              <div className="pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 transition-opacity duration-300 absolute top-full right-0 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
                {Object.values(Locales).map((loc) => (
                  <Link
                    key={loc}
                    href={`/${loc}${currentRoute}`}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      locale === loc
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
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
