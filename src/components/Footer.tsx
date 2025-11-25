'use client'

import { LocalizedLink } from '@/components/Link'
import { useTranslation } from '@/hooks/useTranslation'

export default function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Vapesooo</h3>
            <p className="text-gray-600 dark:text-gray-400">{t('footer.tagline')}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <LocalizedLink
                  href="/"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  {t('common.home')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink
                  href="/products"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  {t('common.products')}
                </LocalizedLink>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  {t('common.contact')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{t('footer.contactTitle')}</h3>
            <p className="text-gray-600 dark:text-gray-400">{t('footer.contactDesc')}</p>
            <a
              href="https://wa.me/8613728716463"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-lime-600 hover:bg-lime-700 text-white px-4 py-2 rounded">
              {t('footer.contactWhatsApp')}
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {currentYear.toString()} Shenzhen Qingfang Technology Co., Ltd.</p>
        </div>
      </div>
    </footer>
  )
}
