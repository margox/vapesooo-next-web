import { notFound } from 'next/navigation'
import { getNewsByBrandAndSlug, getNewsData } from '@/data/server'
import { Locales, locales } from '@/locales'
import { createPageMetadata, getLocalizedUrl, SITE_NAME } from '@/lib/seo'
import './styles.css'

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getNewsData().flatMap(({ brand, news }) => news.map(({ slug }) => ({ locale, brand, slug })))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string; slug: string; locale: string }>
}) {
  const { brand, slug, locale } = await params
  const news = getNewsByBrandAndSlug(brand, slug)
  if (!news) return { title: 'News Not Found', robots: { index: false, follow: false } }

  const content = news[locale as Locales] || news.en
  return createPageMetadata({
    locale: locale as Locales,
    path: `/news/${brand}/${slug}`,
    title: content.title,
    description: content.description,
    type: 'article',
  })
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ brand: string; slug: string; locale: string }>
}) {
  const { brand, slug, locale } = await params
  const news = getNewsByBrandAndSlug(brand, slug)
  if (!news) notFound()

  const content = news[locale as Locales] || news.en
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: content.title,
    description: content.description,
    inLanguage: locale,
    url: getLocalizedUrl(locale, `/news/${brand}/${slug}`),
    publisher: { '@type': 'Organization', name: SITE_NAME, url: getLocalizedUrl(locale) },
  }

  return (
    <div className="container mx-auto px-4 py-8 page-news">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <article className="news prose lg:prose-xl mx-auto">
        <h1 className="text-3xl font-bold mt-5 mb-8">{content.title}</h1>
        <div className="news-content mt-6" dangerouslySetInnerHTML={{ __html: content.content }} />
      </article>
    </div>
  )
}
