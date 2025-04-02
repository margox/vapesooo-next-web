"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import { useLocale } from "@/app/store/locale";
import { Locales, Product } from "@/types/products";
import { LocalizedLink } from "@/components/Link";
import {
  MoonIcon,
  SunIcon,
  ChevronDownIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { products as productsData } from "@/data/index";

const LOCALES_NAMES = {
  [Locales.EN]: "English",
  [Locales.FR]: "Français",
  [Locales.ES]: "Español",
  [Locales.DE]: "Deutsch",
  [Locales.IT]: "Italiano",
  [Locales.PT]: "Português",
  [Locales.RU]: "Русский",
  [Locales.TR]: "Türkçe",
};

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [brands, setBrands] = useState<string[]>([]);
  const [brandProducts, setBrandProducts] = useState<Record<string, Product[]>>(
    {}
  );
  const [activeBrand, setActiveBrand] = useState<string | null>(null);

  useEffect(() => {
    // Extract brands from products.json
    const brandsFromData = Object.keys(productsData);
    setBrands(brandsFromData);

    // Create map of brand to products
    const productsByBrand: Record<string, Product[]> = {};
    brandsFromData.forEach((brand) => {
      productsByBrand[brand] = productsData[brand];
    });
    setBrandProducts(productsByBrand);

    // Add scroll event listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm"
          : "bg-white dark:bg-gray-900"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <LocalizedLink
            href="/"
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            Vapesooo
          </LocalizedLink>

          {/* Main navigation */}
          <nav className="hidden md:flex space-x-6">
            <LocalizedLink
              href="/"
              className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Home
            </LocalizedLink>

            {brands.map((brand) => (
              <div
                key={brand}
                className="relative group"
                onMouseEnter={() => setActiveBrand(brand)}
                onMouseLeave={() => setActiveBrand(null)}
              >
                <LocalizedLink
                  href={`/products/brand/${brand.toLowerCase()}`}
                  className="flex items-center text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  {brand}
                  <ChevronDownIcon className="h-4 w-4 ml-1" />
                </LocalizedLink>

                {/* Dropdown menu */}
                {activeBrand === brand && (
                  <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
                    {brandProducts[brand]?.map((product) => (
                      <LocalizedLink
                        key={product.slug}
                        href={`/products/${product.slug}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                        {product.title}
                      </LocalizedLink>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <LocalizedLink
              href="/products"
              className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              All Products
            </LocalizedLink>
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                <GlobeAltIcon className="h-5 w-5 mr-1" />
                <span className="uppercase">{locale}</span>
              </button>

              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
                  {Object.values(Locales).map((loc) => (
                    <Link
                      key={loc}
                      href={`/${loc}`}
                      onClick={() => {
                        setIsLanguageOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        locale === loc
                          ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      }`}
                    >
                      {LOCALES_NAMES[loc]}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? (
                <SunIcon className="h-5 w-5 text-yellow-400" />
              ) : (
                <MoonIcon className="h-5 w-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
