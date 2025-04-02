"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { LocalizedLink } from "@/components/Link";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/products";
import { products as productsData } from "@/data/index";

export default function BrandProductsPage() {
  const params = useParams();
  const brandSlug = params.brand as string;
  const [products, setProducts] = useState<Product[]>([]);
  const [brandName, setBrandName] = useState<string>("");

  useEffect(() => {
    // Find the brand with case-insensitive matching
    const foundBrand = Object.keys(productsData).find(
      (brand) => brand.toLowerCase() === brandSlug.toLowerCase()
    );

    if (foundBrand) {
      setBrandName(foundBrand);
      setProducts(productsData[foundBrand] || []);
    }
  }, [brandSlug]);

  if (!brandName) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Brand Not Found
        </h1>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          The brand you&apos;re looking for doesn&apos;t exist.
        </p>
        <LocalizedLink
          href="/products"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
        >
          View All Products
        </LocalizedLink>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <LocalizedLink
          href="/products"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          ← Back to All Products
        </LocalizedLink>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        {brandName} Products
      </h1>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">
            No products found for this brand
          </p>
        </div>
      )}
    </div>
  );
}
