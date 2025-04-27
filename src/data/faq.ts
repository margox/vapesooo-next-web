import faqData from './faq.json'
import { Locales, defaultLocale } from '@/locales'

export type FAQItem = {
  question: string
  answer: string
}

export const getFAQs = (locale: string = defaultLocale): FAQItem[] => {
  // 检查请求的语言是否存在，如果不存在则使用默认语言
  const validLocale = Object.values(Locales).includes(locale as Locales) ? locale : defaultLocale

  // 返回对应语言的FAQ数据
  return faqData[validLocale as keyof typeof faqData] || faqData[defaultLocale]
}
