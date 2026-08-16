import { NewsItem } from '@/data'
import { Locales, t } from '@/locales'
import Link from 'next/link'

interface BrandNewsPageProps {
  brand: string
  news: NewsItem[]
  locale: Locales
}

export default function BrandNewsPage({ brand, news, locale }: BrandNewsPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 capitalize">
        {brand} {t(locale, 'common.news')}
      </h1>
      <div className="space-y-6">
        {news.map((item) => {
          const content = item[locale] || item.en
          return (
          <div key={item.slug} className="border border-gray-200 rounded-lg p-6 shadow-md">
            <Link href={`/${locale}/news/${brand}/${item.slug}`}>
              <h2 className="text-xl font-semibold mb-4 hover:underline">{content.title}</h2>
            </Link>
            <p className="text-gray-600 mb-4">{content.description}</p>
            <Link href={`/${locale}/news/${brand}/${item.slug}`} className="text-lime-600 hover:underline">
              {t(locale, 'news.read_more')}
            </Link>
          </div>
          )
        })}
      </div>
    </div>
  )
}
