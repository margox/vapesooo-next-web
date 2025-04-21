'use client'

import { LocalizedLink } from '@/components/Link'
import { useTranslation } from '@/hooks/useTranslation'
import { NewsItem } from '@/data'

interface BrandNewsPageProps {
  brand: string
  news: NewsItem[]
}

export default function BrandNewsPage({ brand, news }: BrandNewsPageProps) {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 capitalize">
        {brand} {t('news')}
      </h1>
      <div className="space-y-6">
        {news.map((item) => (
          <div key={item.slug} className="border rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">{item.en.title}</h2>
            <p className="text-gray-600 mb-4">{item.en.description}</p>
            <LocalizedLink href={`/news/${brand}/${item.slug}`} className="text-blue-600 hover:underline">
              {t('read_more')}
            </LocalizedLink>
          </div>
        ))}
      </div>
    </div>
  )
}
