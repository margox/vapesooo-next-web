import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import './styles.css'

async function getNewsDetail(slug: string) {
  const headersList = await headers()
  const host = headersList.get('host')
  const protocol = process?.env?.NODE_ENV === 'development' ? 'http' : 'https'

  const res = await fetch(`${protocol}://${host}/api/news?action=detail&slug=${slug}`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    if (res.status === 404) {
      return notFound()
    }
    throw new Error('Failed to fetch news detail')
  }

  return res.json()
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug } = await params
  const news = await getNewsDetail(slug)

  return (
    <div className="container mx-auto px-4 py-8 page-news">
      <article className="news prose lg:prose-xl mx-auto">
        <h1 className="text-3xl font-bold mt-5 mb-8">{news.en.title}</h1>
        <div className="news-content mt-6" dangerouslySetInnerHTML={{ __html: news.en.content }} />
      </article>
    </div>
  )
}
