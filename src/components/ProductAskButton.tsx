'use client'

import { Locales } from '@/types/products'
import { t } from '@/locales'

const handleAskOnWhatsApp = (productTitle: string) => {
  // https://api.whatsapp.com/send/?phone=8613728716463%E2%80%AC&text=
  const phone = '8613728716463'
  // const textCN = `您好，我想咨询一下 ${product.title} 的信息`
  const textEN = `Hello, I want to know about the information of ${productTitle}`

  window.open(`https://api.whatsapp.com/send/?phone=${phone}&text=${encodeURIComponent(textEN)}`, '_blank')
}

export default function ProductAskButton({ productTitle, locale }: { productTitle: string; locale: Locales }) {
  return (
    <button
      onClick={() => handleAskOnWhatsApp(productTitle)}
      className="inline-block mb-8 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-md font-medium">
      {t(locale, 'common.contactInquiry')}
    </button>
  )
}
