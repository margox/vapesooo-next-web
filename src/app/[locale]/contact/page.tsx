import { Metadata } from 'next'
import { Locales, t } from '@/locales'
import { SocialLinks } from '@/components/SocialLinks'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params

  return {
    title: t(locale as Locales, 'contact.pageTitle'),
    description: t(locale as Locales, 'contact.pageDescription'),
  }
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">{t(locale as Locales, 'contact.title')}</h1>

      <div className="max-w-3xl mx-auto border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-white p-8">
          <h2 className="text-xl font-semibold mb-6">{t(locale as Locales, 'contact.getInTouch')}</h2>

          <div className="space-y-8">
            <div className="flex items-start">
              <div className="bg-lime-50 p-3 rounded-full mr-4">
                <svg
                  className="w-6 h-6 text-lime-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-lime-700 mb-2">{t(locale as Locales, 'contact.email')}</h3>
                <a
                  href="mailto:vapesooo.partner@gmail.com"
                  className="text-gray-600 hover:text-lime-600 transition-colors">
                  vapesooo.partner@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-lime-50 p-3 rounded-full mr-4">
                <svg
                  className="w-6 h-6 text-lime-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-lime-700 mb-2">WhatsApp</h3>
                <a
                  href="https://wa.me/8613728716463"
                  className="text-gray-600 hover:text-lime-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer">
                  +86 13728716463
                </a>
                <p className="text-sm text-gray-500 mt-1">{t(locale as Locales, 'contact.whatsAppNote')}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-lime-50 p-3 rounded-full mr-4">
                <svg
                  className="w-6 h-6 text-lime-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-lime-700 mb-2">{t(locale as Locales, 'contact.followUs')}</h3>
                <SocialLinks />
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-100">
            <p className="text-center text-gray-600">{t(locale as Locales, 'contact.businessHours')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
