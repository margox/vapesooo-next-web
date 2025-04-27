import React from 'react'
import { Metadata } from 'next'
import { getFAQs } from '@/data/faq'
import { Locales } from '@/locales'
import Accordion from '@/components/Accordion'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `FAQ - Vapesooo`,
    description: 'Frequently Asked Questions about our products and services',
  }
}

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const faqs = getFAQs(locale as Locales)

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h1>

      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <Accordion key={index} title={faq.question} content={faq.answer} className="mb-4" />
        ))}
      </div>
    </div>
  )
}
