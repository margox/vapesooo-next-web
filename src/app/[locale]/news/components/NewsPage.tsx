'use client'

import { LocalizedLink } from '@/components/Link'
import { useTranslation } from '@/hooks/useTranslation'
import { NewsItem } from '@/data'

interface NewsPageProps {
  brandNews: Array<{
    brand: string
    news: NewsItem
  }>
}

export default function NewsPage({ brandNews }: NewsPageProps) {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('latest_news')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brandNews.map(({ brand, news }) => (
          <div key={brand} className="border rounded-lg overflow-hidden shadow-lg">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 capitalize">{brand}</h2>
              <h3 className="text-lg font-medium mb-4">{news.en.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{news.en.description}</p>

              <div className="flex justify-between items-center">
                <LocalizedLink href={`/news/${brand}`} className="text-blue-600 hover:underline">
                  {t('view_all_news')}
                </LocalizedLink>
                <LocalizedLink href={`/news/${brand}/${news.slug}`} className="text-blue-600 hover:underline">
                  {t('read_more')}
                </LocalizedLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
