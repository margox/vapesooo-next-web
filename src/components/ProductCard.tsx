import { Product } from '@/types/products'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  product: Product
  locale: string
}

export default function ProductCard({ product, locale }: ProductCardProps) {
  const featuredImage = product.cover ? { url: product.cover, alt: product.name } : product.images[0]

  return (
    <Link href={`/${locale}/products/${product.slug}`}>
      <div className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-none hover:shadow-xl shadow-black/5 border border-black/10 bg-clip-padding transition-all duration-300">
        <div className="relative w-full aspect-square overflow-hidden">
          <Image
            src={featuredImage.url + '?imageMogr2/format/webp/thumbnail/600x600'}
            alt={featuredImage.alt || product.title || product.name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300 aspect-square"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            decoding="async"
            unoptimized
          />
        </div>
        <div className="p-4">
          <h3 className="text-sm text-center font-semibold text-gray-900 dark:text-white">
            {product.title || product.name}
          </h3>
        </div>
      </div>
    </Link>
  )
}
