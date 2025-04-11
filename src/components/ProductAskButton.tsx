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

export default function ProductAskButton({
  productTitle,
  locale,
  sticky,
}: {
  productTitle: string
  locale: Locales
  sticky?: boolean
}) {
  if (sticky) {
    return (
      <button
        onClick={() => handleAskOnWhatsApp(productTitle)}
        className="sticky bottom-12 left-1/2 -translate-x-1/2 mb-8 bg-slate-800 hover:bg-slate-700 shadow-xl shadow-slate-900/30 text-white px-6 py-3 rounded-full font-medium">
        {t(locale, 'common.contactInquiry')}
      </button>
    )
  }

  return (
    <button
      onClick={() => handleAskOnWhatsApp(productTitle)}
      className="inline-block mb-8 bg-lime-600 hover:bg-lime-700 text-white px-6 py-3 rounded-md font-medium">
      {t(locale, 'common.contactInquiry')}
    </button>
  )
}
