import { NextRequest, NextResponse } from 'next/server'
import { getNewsData, getNewsBySlug } from '@/data/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action')

  console.log('action', action)

  // Get first news for each brand
  if (!action) {
    const allNews = getNewsData()
    const brandFirstNews = allNews.map(({ brand, news }) => ({
      brand,
      news: news[0], // Get first news item
    }))
    return NextResponse.json(brandFirstNews)
  }

  // Get news list for a specific brand
  if (action === 'list') {
    const brand = searchParams.get('brand')
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '10')

    if (!brand) {
      return NextResponse.json({ error: 'Brand parameter is required' }, { status: 400 })
    }

    const allNews = getNewsData()
    const brandNews = allNews.find((bn) => bn.brand === brand)

    if (!brandNews) {
      return NextResponse.json({ error: 'Brand not found' }, { status: 404 })
    }

    const start = (page - 1) * pageSize
    const end = start + pageSize

    // Return paginated news without content
    const paginatedNews = brandNews.news.slice(start, end).map(({ slug, en, es, fr, de, it, pt, ru, pl }) => ({
      slug,
      en: { title: en.title, description: en.description },
      es: { title: es?.title || en.title, description: es?.description || en.description },
      fr: { title: fr?.title || en.title, description: fr?.description || en.description },
      de: { title: de?.title || en.title, description: de?.description || en.description },
      it: { title: it?.title || en.title, description: it?.description || en.description },
      pt: { title: pt?.title || en.title, description: pt?.description || en.description },
      ru: { title: ru?.title || en.title, description: ru?.description || en.description },
      pl: { title: pl?.title || en.title, description: pl?.description || en.description },
    }))

    return NextResponse.json({
      total: brandNews.news.length,
      page,
      pageSize,
      data: paginatedNews,
    })
  }

  // Get news detail by slug
  if (action === 'detail') {
    const slug = searchParams.get('slug')

    if (!slug) {
      return NextResponse.json({ error: 'Slug parameter is required' }, { status: 400 })
    }

    const news = getNewsBySlug(slug)
    if (!news) {
      return NextResponse.json({ error: 'News not found' }, { status: 404 })
    }

    return NextResponse.json(news)
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}
