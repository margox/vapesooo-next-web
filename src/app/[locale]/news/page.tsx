import { headers } from 'next/headers'
import NewsPage from './components/NewsPage'
import { NewsItem } from '@/data'

async function getNews() {
  const headersList = await headers()
  const host = headersList.get('host')
  const protocol = process?.env?.NODE_ENV === 'development' ? 'http' : 'https'

  const res = await fetch(`${protocol}://${host}/api/news`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch news')
  }

  return res.json() as Promise<Array<{ brand: string; news: NewsItem }>>
}

export default async function Page() {
  const brandNews = await getNews()
  return <NewsPage brandNews={brandNews} />
}
