'use client'

import { useState, useEffect } from 'react'
import { t, Locales } from '@/locales'

interface AgeVerificationProps {
  locale: Locales
}

export function AgeVerification({ locale }: AgeVerificationProps) {
  const [showModal, setShowModal] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const ageVerified = localStorage.getItem('age-verified')
    const underAge = localStorage.getItem('under-age')

    if (!ageVerified && !underAge) {
      setShowModal(true)
    } else if (underAge === 'true') {
      setShowWarning(true)
    }
  }, [])

  const handleAgeConfirm = () => {
    if (isClient) {
      localStorage.setItem('age-verified', 'true')
      localStorage.removeItem('under-age')
      setShowModal(false)
      setShowWarning(false)
    }
  }

  const handleUnderAge = () => {
    if (isClient) {
      localStorage.setItem('under-age', 'true')
      setShowModal(false)
      setShowWarning(true)
    }
  }

  if (!isClient) return null

  return (
    <>
      {/* Age Verification Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl max-w-md w-full shadow-xl">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                {t(locale, 'ageVerification.title')}
              </h2>
              <p className="mb-6 text-gray-600 dark:text-gray-300 text-sm">{t(locale, 'ageVerification.message')}</p>
              <p className="mb-8 font-medium text-gray-900 dark:text-white">{t(locale, 'ageVerification.question')}</p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={handleUnderAge}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition">
                  {t(locale, 'ageVerification.no')}
                </button>
                <button
                  onClick={handleAgeConfirm}
                  className="flex-1 bg-lime-600 hover:bg-lime-700 text-white font-medium py-3 px-6 rounded-lg transition">
                  {t(locale, 'ageVerification.yes')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Under Age Warning */}
      {showWarning && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl max-w-md w-full shadow-xl">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-2xl font-semibold mb-3 text-amber-500">{t(locale, 'ageVerification.warning')}</h2>
              <p className="mb-8 text-gray-600 dark:text-gray-300">{t(locale, 'ageVerification.warningMessage')}</p>
              <button
                onClick={handleAgeConfirm}
                className="w-full bg-lime-600 hover:bg-lime-700 text-white font-medium py-3 px-6 rounded-lg transition">
                {t(locale, 'ageVerification.proceed')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
