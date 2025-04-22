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
      <h1 className="text-3xl font-bold mb-8">{t('news.latest_news')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brandNews.map(({ brand, news }) => (
          <div key={brand} className="border border-gray-200 rounded-lg overflow-hidden shadow-lg">
            <div className="flex flex-col h-full p-6">
              <LocalizedLink href={`/news/${brand}`}>
                <h2 className="text-xl font-semibold mb-2 capitalize hover:underline">{brand} {t('common.news')}</h2>
              </LocalizedLink>
              <LocalizedLink href={`/news/${brand}/${news.slug}`}>
                <h3 className="text-md font-medium mb-2 hover:underline">{news.en.title}</h3>
              </LocalizedLink>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{news.en.description}</p>
              <div className="flex-1" />
              <div className="flex justify-between items-center">
                <LocalizedLink href={`/news/${brand}`} className="text-lime-600 hover:underline">
                  {t('news.view_all_news')}
                </LocalizedLink>
                <LocalizedLink href={`/news/${brand}/${news.slug}`} className="text-lime-600 hover:underline">
                  {t('news.read_more')}
                </LocalizedLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
