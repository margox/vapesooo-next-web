import React from 'react'
import { about } from '@/data'

export default async function AboutPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { locale } = await params
  const data = about[locale] || about['en']

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 bg-white text-gray-800">
      {/* Quality Promise Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {data.qualityPromise.title.split(':')[0]}:{' '}
          <span className="text-lime-600">{data.qualityPromise.title.split(':')[1]}</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">{data.qualityPromise.subtitle}</p>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 pb-2">{data.qualityPromise.criteriaTitle}</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.qualityPromise.criteria.map((item, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-xl font-medium mb-2 text-gray-800">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-gray-700 text-center">{data.qualityPromise.footerText}</p>
      </div>

      {/* Entrepreneurs Section */}
      <div className="bg-lime-50 rounded-xl p-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">{data.entrepreneurs.title}</h2>

        <p className="text-lg text-gray-700 mb-8 text-center max-w-4xl mx-auto">{data.entrepreneurs.subtitle}</p>

        <h3 className="text-xl font-semibold mb-4 text-gray-800">{data.entrepreneurs.benefitsTitle}</h3>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {data.entrepreneurs.benefits.map((item, index) => (
            <div key={index} className="bg-white p-5 rounded-lg shadow-sm">
              <p className="text-gray-700">{item}</p>
            </div>
          ))}
        </div>

        <p className="text-gray-700 text-center italic">{data.entrepreneurs.footerText}</p>
      </div>

      {/* Trust Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">{data.trust.title}</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {data.trust.reasons.map((item, index) => (
            <div key={index} className="text-center">
              <div className="bg-lime-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">{index === 0 ? '🔍' : index === 1 ? '🚀' : '👥'}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      {/* <div className="bg-gradient-to-r from-lime-600 to-lime-800 rounded-xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">{data.cta.title}</h2>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white bg-opacity-10 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">{data.cta.forVapers.title}</h3>
            <p>{data.cta.forVapers.desc}</p>
          </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">{data.cta.forEntrepreneurs.title}</h3>
            <p>{data.cta.forEntrepreneurs.desc}</p>
          </div>
        </div>

        <button className="bg-white text-lime-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors shadow-lg">
          {data.cta.buttonText}
        </button>

        <p className="mt-6 italic opacity-90">{data.cta.footerText}</p>
      </div> */}
    </div>
  )
}
