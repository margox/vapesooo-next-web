"use client";

import Image from "next/image";
import { Product } from "@/types/products";
import { useLocale } from "@/app/store/locale";
import { LocalizedLink } from "@/components/Link";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const locale = useLocale();
  const featuredImage = product.images[0] || {
    url: "/placeholder.jpg",
    alt: product.title,
  };

  // Get excerpt based on locale or fall back to default
  const excerpt =
    product.excerpt_locales && product.excerpt_locales[locale]
      ? product.excerpt_locales[locale]
      : product.excerpt || "";

  return (
    <LocalizedLink href={`/products/${product.slug}`}>
      <div className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
        <div className="relative h-60 w-full overflow-hidden">
          <Image
            src={featuredImage.url}
            alt={featuredImage.alt || product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {product.title}
          </h3>
          {excerpt && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {excerpt}
            </p>
          )}
          <div className="mt-4">
            <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs px-2 py-1 rounded">
              View Details
            </span>
          </div>
        </div>
      </div>
    </LocalizedLink>
  );
}
