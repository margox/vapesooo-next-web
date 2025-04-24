import { Locales } from '@/types/products'
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

export const metadata = {
  title: 'Vapesooo - Premium Vape Products',
  description: 'Discover our wide range of premium vape products',
  'ahrefs-site-verification': '0e1f228a5e1ae52de55da7bedbfa59ff585cbb4ac23ac1533ce6b72302ef2ff9',
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
