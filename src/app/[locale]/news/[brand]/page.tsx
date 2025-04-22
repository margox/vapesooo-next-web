import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import BrandNewsPage from './components/BrandNewsPage'
import { NewsItem } from '@/data'

async function getBrandNews(brand: string) {
  const headersList = await headers()
  const host = headersList.get('host')
  const protocol = process?.env?.NODE_ENV === 'development' ? 'http' : 'https'

  console.log('brand', brand)

  const res = await fetch(`${protocol}://${host}/api/news?action=list&brand=${brand}`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    if (res.status === 404) {
      return notFound()
    }
    throw new Error('Failed to fetch brand news')
  }

  return res.json() as Promise<{ data: NewsItem[] }>
}

export default async function Page({ params }: { params: Promise<{ brand: string; locale: string }> }) {
  const { brand } = await params
  const { data: news } = await getBrandNews(brand)
  return <BrandNewsPage brand={brand} news={news} />
}
