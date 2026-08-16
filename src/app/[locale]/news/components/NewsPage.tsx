import { NewsItem } from '@/data'
import { Locales, t } from '@/locales'
import Link from 'next/link'

interface NewsPageProps {
  brandNews: Array<{
    brand: string
    news: NewsItem
  }>
  locale: Locales
}

export default function NewsPage({ brandNews, locale }: NewsPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t(locale, 'news.latest_news')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brandNews.map(({ brand, news }) => {
          const content = news[locale] || news.en
          return (
          <div key={brand} className="border border-gray-200 rounded-lg overflow-hidden shadow-lg">
            <div className="flex flex-col h-full p-6">
              <Link href={`/${locale}/news/${brand}`}>
                <h2 className="text-xl font-semibold mb-2 capitalize hover:underline">
                  {brand} {t(locale, 'common.news')}
                </h2>
              </Link>
              <Link href={`/${locale}/news/${brand}/${news.slug}`}>
                <h3 className="text-md font-medium mb-2 hover:underline">{content.title}</h3>
              </Link>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{content.description}</p>
              <div className="flex-1" />
              <div className="flex justify-between items-center">
                <Link href={`/${locale}/news/${brand}`} className="text-lime-600 hover:underline">
                  {t(locale, 'news.view_all_news')}
                </Link>
                <Link href={`/${locale}/news/${brand}/${news.slug}`} className="text-lime-600 hover:underline">
                  {t(locale, 'news.read_more')}
                </Link>
              </div>
            </div>
          </div>
          )
        })}
      </div>
    </div>
  )
}
