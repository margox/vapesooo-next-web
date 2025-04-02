// import Image from "next/image";
import { LocalizedLink } from "@/components/Link";
import ProductCard from "@/components/ProductCard";
import { products as productsData } from "@/data/index";

export default function Home() {
  // Get all brands
  const brands = Object.keys(productsData);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[60vh] bg-gray-200 dark:bg-gray-800">
        <div className="relative h-full w-full">
          {/* Placeholder for Hero Slider */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white">
              Premium Vape Products
            </h1>
          </div>
        </div>
      </section>

      {/* Brand Sections */}
      {brands.map((brand) => {
        // Get first 4 products of this brand
        const products = productsData[brand].slice(0, 4);

        return (
          <section key={brand} className="py-12">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {brand}
                </h2>
                <LocalizedLink
                  href={`/products/brand/${brand.toLowerCase()}`}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  View All Products
                </LocalizedLink>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
