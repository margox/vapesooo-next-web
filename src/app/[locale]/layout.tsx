import { t, Locales } from '@/locales'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'
import { AgeVerification } from '@/components/AgeVerification'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const availableLocalesMap = Object.fromEntries(Object.values(Locales).map((locale) => [locale, true]))

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { locale } = await params

  return {
    title: t(locale as Locales, 'meta.title'),
    description: t(locale as Locales, 'meta.description'),
    openGraph: {
      title: t(locale as Locales, 'meta.title'),
      description: t(locale as Locales, 'meta.description'),
      type: 'website',
      locale: locale,
      url: 'https://vapesooo.com',
      siteName: t(locale as Locales, 'meta.title'),
      images: [
        {
          url: 'https://vapesooo-1318551956.cos.accelerate.myqcloud.com/ogcard.webp?q-sign-algorithm=sha1&q-ak=AKIDNOhYTzjYc0NUK3aT7yMj1wJuECKiT7iMHE2kTfymqdweDFakh5Mq-TBs2BgGnlfS&q-sign-time=1745591419;1745595019&q-key-time=1745591419;1745595019&q-header-list=&q-url-param-list=ci-process&q-signature=e99ac42002952e5dc4ecb4433a03e82519f3da96&x-cos-security-token=YbWR6DYm9zoZL2NBs0s8iM7F3b63O1Qa5fe7334883a767f01b23b54ec228acb0BEpCJ2kREvNRUtrsu005GiNVXLpsnKLx0RdQltLrBEh1veh8aEpIdNEqAliOkFxChzVKhoiVau2sxNqMHEF1caB8VrvN5N-tBbFScpGSF-PZSgyomLid0bVPNdh8v660yEAPeYDwXoNvSaGcBS5AJlh2_XISh8bhAn_1QXBQ0naDELPOLFm3bFvBrkAYsfuKyaf03HI3KXfjJJDDamlIOs3IZD4u5FP5d0IudwZOQ6GHIbzKLF2YmqwaileSR2_9s1r45Q_Jztryj6R5OK7QKg&ci-process=originImage',
          width: 1200,
          height: 628,
          alt: t(locale as Locales, 'meta.title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t(locale as Locales, 'meta.title'),
      url: 'https://vapesooo.com',
      description: t(locale as Locales, 'meta.description'),
      images: ['https://vapesooo-1318551956.cos.accelerate.myqcloud.com/ogcard.webp?q-sign-algorithm=sha1&q-ak=AKIDNOhYTzjYc0NUK3aT7yMj1wJuECKiT7iMHE2kTfymqdweDFakh5Mq-TBs2BgGnlfS&q-sign-time=1745591419;1745595019&q-key-time=1745591419;1745595019&q-header-list=&q-url-param-list=ci-process&q-signature=e99ac42002952e5dc4ecb4433a03e82519f3da96&x-cos-security-token=YbWR6DYm9zoZL2NBs0s8iM7F3b63O1Qa5fe7334883a767f01b23b54ec228acb0BEpCJ2kREvNRUtrsu005GiNVXLpsnKLx0RdQltLrBEh1veh8aEpIdNEqAliOkFxChzVKhoiVau2sxNqMHEF1caB8VrvN5N-tBbFScpGSF-PZSgyomLid0bVPNdh8v660yEAPeYDwXoNvSaGcBS5AJlh2_XISh8bhAn_1QXBQ0naDELPOLFm3bFvBrkAYsfuKyaf03HI3KXfjJJDDamlIOs3IZD4u5FP5d0IudwZOQ6GHIbzKLF2YmqwaileSR2_9s1r45Q_Jztryj6R5OK7QKg&ci-process=originImage'],
    },
  }
}

interface RootLayoutProps {
  children: React.ReactNode
  params: { locale: Locales; brand: string }
}

export default async function RootLayout(props: RootLayoutProps) {
  const { children, params } = props
  const { locale } = await params

  // Validate locale
  if (!availableLocalesMap[locale]) {
    return notFound()
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="canonical" href={`https://vapesooo.com/${locale}`} />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <AgeVerification locale={locale} />
        </ThemeProvider>
      </body>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-KCB1EYWH1H" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-KCB1EYWH1H');
`}
      </Script>
      <Script src="https://analytics.ahrefs.com/analytics.js" data-key="S8nE2uoHgS2SFpcYMgb8Hw" async></Script>
      <Script defer data-domain="vapesooo.com" src="https://stat.jianli.online/js/plausible.js"></Script>
    </html>
  )
}
