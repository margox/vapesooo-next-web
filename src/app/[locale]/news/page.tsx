import NewsPage from './components/NewsPage'
import { Locales, t } from '@/locales'
import { getNewsData } from '@/data/server'
import { createPageMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const title = t(locale as Locales, 'news.latest_news')
  return createPageMetadata({
    locale: locale as Locales,
    path: '/news',
    title,
    description: `${title} - Vapesooo`,
  })
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const brandNews = getNewsData()
    .filter(({ news }) => news.length > 0)
    .map(({ brand, news }) => ({ brand, news: news[0] }))

  return <NewsPage brandNews={brandNews} locale={locale as Locales} />
}
