import { headers } from 'next/headers'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    slug: string
  }
}

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

export default async function NewsDetailPage({ params: { slug } }: Props) {
  const news = await getNewsDetail(slug)

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose lg:prose-xl mx-auto">
        <h1>{news.en.title}</h1>
        <div className="mt-6" dangerouslySetInnerHTML={{ __html: news.en.content }} />
      </article>
    </div>
  )
}
