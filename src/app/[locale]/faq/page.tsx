import React from 'react'
import { Metadata } from 'next'
import { getFAQs } from '@/data/faq'
import { Locales } from '@/locales'
import Accordion from '@/components/Accordion'
import { createPageMetadata, getLocalizedUrl, SITE_NAME } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return createPageMetadata({
    locale: locale as Locales,
    path: '/faq',
    title: 'FAQ',
    description: 'Frequently asked questions about Vapesooo products and services.',
  })
}

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const faqs = getFAQs(locale as Locales)
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url: getLocalizedUrl(locale, '/faq'),
    inLanguage: locale,
    publisher: { '@type': 'Organization', name: SITE_NAME },
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <h1 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h1>

      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <Accordion key={index} title={faq.question} content={faq.answer} className="mb-4" />
        ))}
      </div>
    </div>
  )
}
