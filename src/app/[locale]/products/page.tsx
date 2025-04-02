"use client";

import { useState, useEffect } from "react";
// import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/products";
import { products as productsData } from "@/data/index";

export default function ProductsPage() {
  const [brands, setBrands] = useState<string[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Get all brands
    const brandsFromData = Object.keys(productsData);
    setBrands(brandsFromData);

    // Flatten all products into a single array
    const products: Product[] = [];
    brandsFromData.forEach((brand) => {
      productsData[brand].forEach((product) => {
        products.push(product);
      });
    });
    setAllProducts(products);
    setFilteredProducts(products);
  }, []);

  useEffect(() => {
    if (selectedBrand) {
      const filtered = productsData[selectedBrand] || [];
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(allProducts);
    }
  }, [selectedBrand, allProducts]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        All Products
      </h1>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar with brand filter */}
        <div className="w-full md:w-64 mb-6 md:mb-0 md:mr-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Brands
            </h2>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setSelectedBrand(null)}
                  className={`w-full text-left px-2 py-1 rounded ${
                    selectedBrand === null
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  All Brands
                </button>
              </li>
              {brands.map((brand) => (
                <li key={brand}>
                  <button
                    onClick={() => setSelectedBrand(brand)}
                    className={`w-full text-left px-2 py-1 rounded ${
                      selectedBrand === brand
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {brand} ({productsData[brand]?.length || 0})
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Products grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-lg">
              <p className="text-gray-500 dark:text-gray-400">
                No products found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
