import { notFound } from 'next/navigation'
import BrandNewsPage from './components/BrandNewsPage'
import { Locales, t } from '@/locales'
import { getNewsByBrand, getNewsData } from '@/data/server'
import { createPageMetadata } from '@/lib/seo'

export function generateStaticParams() {
  return getNewsData().map(({ brand }) => ({ brand }))
}

export async function generateMetadata({ params }: { params: Promise<{ brand: string; locale: string }> }) {
  const { brand, locale } = await params
  const news = getNewsByBrand(brand)
  if (!news) return { title: 'News Not Found', robots: { index: false, follow: false } }

  const title = `${brand} ${t(locale as Locales, 'common.news')}`
  return createPageMetadata({
    locale: locale as Locales,
    path: `/news/${brand}`,
    title,
    description: `${title} - Vapesooo`,
    type: 'article',
  })
}

export default async function Page({ params }: { params: Promise<{ brand: string; locale: string }> }) {
  const { brand, locale } = await params
  const news = getNewsByBrand(brand)
  if (!news) notFound()

  return <BrandNewsPage brand={brand} news={news} locale={locale as Locales} />
}
