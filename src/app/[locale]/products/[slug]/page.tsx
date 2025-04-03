"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import ImageSlider from "@/components/ImageSlider";
import { LocalizedLink } from "@/components/Link";
import { Product } from "@/types/products";
import { useLocale } from "@/app/store/locale";
import { products as productsData } from "@/data/index";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ProductDetailPage() {
  const params = useParams();
  const locale = useLocale();
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [brandName, setBrandName] = useState<string>("");

  useEffect(() => {
    // Find the product with the given slug
    let foundProduct: Product | null = null;
    let foundBrand: string = "";

    Object.keys(productsData).forEach((brand) => {
      const found = productsData[brand].find((p) => p.slug === slug);
      if (found) {
        foundProduct = found;
        foundBrand = brand;
      }
    });

    if (foundProduct) {
      setProduct(foundProduct);
      setBrandName(foundBrand);
    }
  }, [slug]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Product Not Found
        </h1>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          The product you&apos;re looking for doesn&apos;t exist.
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

  // Get content based on locale or fall back to default
  const markdownContent =
    product.markdown_content_locales && product.markdown_content_locales[locale]
      ? product.markdown_content_locales[locale]
      : product.markdown_content;

  // Get excerpt based on locale or fall back to default
  const excerpt =
    product.excerpt_locales && product.excerpt_locales[locale]
      ? product.excerpt_locales[locale]
      : product.excerpt || "";

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-8 text-sm">
        <LocalizedLink
          href="/"
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          Home
        </LocalizedLink>
        <span className="mx-2 text-gray-500 dark:text-gray-400">/</span>
        <LocalizedLink
          href={`/products/brand/${brandName.toLowerCase()}`}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          {brandName}
        </LocalizedLink>
        <span className="mx-2 text-gray-500 dark:text-gray-400">/</span>
        <span className="text-gray-900 dark:text-gray-100">
          {product.title}
        </span>
      </nav>

      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
          <ImageSlider images={product.images} />
        </div>
        <div className="w-full lg:w-1/2">
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            {product.title}
          </h1>

          {excerpt && (
            <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
              {excerpt}
            </p>
          )}

          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mb-8 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md font-medium"
          >
            Contact for Product Inquiry
          </a>
        </div>
      </div>

      {/* Product Description */}
      {markdownContent && (
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
