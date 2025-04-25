import { MetadataRoute } from 'next'
import { locales } from '@/locales'
import { brandNames, productsMap } from '@/data/index'

const productsSlugs = Object.values(productsMap).map((product) => product.slug)

async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 从文件名获取支持的语言列表

  // 基础URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vapesooo.com'

  // 获取所有品牌数据
  // 注意：这里需要根据您的实际数据获取方式进行修改

  const sitemapEntries: MetadataRoute.Sitemap = [
    // {
    //   url: `${baseUrl}/`,
    //   lastModified: new Date(),
    //   changeFrequency: 'daily',
    //   priority: 1,
    // },
  ]

  // 添加首页的所有语言版本
  locales.forEach((locale) => {
    sitemapEntries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    })
  })

  // 添加产品列表页的所有语言版本
  locales.forEach((locale) => {
    sitemapEntries.push({
      url: `${baseUrl}/${locale}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    })
  })

  // 添加每个产品页面的所有语言版本
  productsSlugs.forEach((slug) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/products/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
      })
    })
  })

  // 添加每个品牌页面的所有语言版本
  brandNames.forEach((brandName) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/products/brand/${brandName.toLowerCase()}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    })
  })

  // 添加所有语言的about
  locales.forEach((locale) => {
    sitemapEntries.push({
      url: `${baseUrl}/${locale}/about`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  })

  return sitemapEntries
}

export default sitemap
