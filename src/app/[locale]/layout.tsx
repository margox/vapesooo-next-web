import type { Metadata } from 'next'
import { t, Locales, locales } from '@/locales'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'
import { AgeVerification } from '@/components/AgeVerification'
import { DEFAULT_SOCIAL_IMAGE, SITE_NAME, SITE_URL } from '@/lib/seo'
import { getVisibleBrandNames, products } from '@/data'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const availableLocalesMap = Object.fromEntries(Object.values(Locales).map((locale) => [locale, true]))

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const title = t(locale as Locales, 'meta.title')
  const description = t(locale as Locales, 'meta.description')

  return {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    title: {
      default: title,
      template: `%s | ${SITE_NAME}`,
    },
    description,
    referrer: 'origin-when-cross-origin',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale,
      siteName: SITE_NAME,
      images: [
        {
          url: DEFAULT_SOCIAL_IMAGE,
          width: 1920,
          height: 700,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_SOCIAL_IMAGE],
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

  const headerBrands = getVisibleBrandNames(locale).map((name) => {
    const brandProducts = products[name].products
    return {
      name,
      total: brandProducts.length,
      products: brandProducts.slice(0, 6).map((product) => ({
        slug: product.slug,
        title: product.menuTitle || product.title || product.name,
      })),
    }
  })

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://vapesooo-1318551956.cos.accelerate.myqcloud.com" />
        <link rel="dns-prefetch" href="https://vapesooo-1318551956.cos.accelerate.myqcloud.com" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Header brands={headerBrands} />
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
      <Script
        src="https://analytics.ahrefs.com/analytics.js"
        data-key="S8nE2uoHgS2SFpcYMgb8Hw"
        strategy="lazyOnload"
      />
      <Script data-domain="vapesooo.com" src="https://stat.jianli.online/js/plausible.js" strategy="lazyOnload" />
    </html>
  )
}
