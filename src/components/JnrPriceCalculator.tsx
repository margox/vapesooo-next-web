'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  getJnrPriceGroup,
  getJnrUnitPrice,
  getTierForQuantity,
  JNR_PRICE_TIERS,
  type JnrPriceGroup,
  type JnrProductCost,
} from '@/lib/jnrPricing'

const WHATSAPP_PHONE = '8613728716463'

const DELIVERY_COUNTRIES = [
  ['FR', 'France'], ['DE', 'Germany'], ['NL', 'Netherlands'], ['LU', 'Luxembourg'],
  ['IT', 'Italy'], ['AT', 'Austria'], ['BE', 'Belgium'], ['CZ', 'Czech Republic'],
  ['DK', 'Denmark'], ['PL', 'Poland'], ['IE', 'Ireland'], ['HU', 'Hungary'], ['SI', 'Slovenia'], ['SK', 'Slovakia'],
  ['EE', 'Estonia'], ['LV', 'Latvia'], ['LT', 'Lithuania'], ['HR', 'Croatia'], ['SE', 'Sweden'],
  ['BG', 'Bulgaria'], ['FI', 'Finland'], ['GR', 'Greece'], ['NO', 'Norway'],
] as const

const countryName = (countryCode: string) => DELIVERY_COUNTRIES.find(([code]) => code === countryCode)?.[1] ?? 'Other country'

const formatEuro = (amount: number) => `€${amount.toFixed(2)}`

const tierLabel = (minimum: number, maximum: number | null) => (maximum === null ? `${minimum.toLocaleString()}+ pieces` : `${minimum} – ${maximum} pieces`)

export default function JnrPriceCalculator({ product, productTitle }: { product: JnrProductCost; productTitle: string }) {
  const [quantity, setQuantity] = useState(1)
  const [group, setGroup] = useState<JnrPriceGroup>('C')
  const [country, setCountry] = useState('OTHER')

  useEffect(() => {
    let isMounted = true
    fetch('/api/country')
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { country?: string | null } | null) => {
        if (!isMounted) return
        setCountry(data?.country && DELIVERY_COUNTRIES.some(([code]) => code === data.country) ? data.country : 'OTHER')
        setGroup(getJnrPriceGroup(data?.country))
      })
      .catch(() => undefined)
    return () => {
      isMounted = false
    }
  }, [])

  const activeTier = getTierForQuantity(quantity)
  const tierPrices = useMemo(() => JNR_PRICE_TIERS.map((tier) => getJnrUnitPrice(product, group, tier)), [group, product])
  const activeTierIndex = JNR_PRICE_TIERS.indexOf(activeTier)
  const unitPrice = tierPrices[activeTierIndex]
  const totalPrice = unitPrice * quantity
  const highestPrice = tierPrices[0]

  const changeQuantity = (nextQuantity: number) => setQuantity(Math.max(1, nextQuantity))
  const changeCountry = (nextCountry: string) => {
    setCountry(nextCountry)
    setGroup(getJnrPriceGroup(nextCountry === 'OTHER' ? null : nextCountry))
  }
  const askOnWhatsApp = () => {
    const location = `${countryName(country)} (group ${group})`
    const message = [
      'Hello, I would like to inquire about this product:',
      `Product: ${productTitle}`,
      `Quantity: ${quantity} pieces`,
      `Location: ${location}`,
      `Unit price: ${formatEuro(unitPrice)}`,
      `Total quote: ${formatEuro(totalPrice)}`,
    ].join('\n')
    window.open(`https://api.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <section className="mb-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800" aria-label="Wholesale price calculator">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Wholesale pricing</h2>
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <span>Deliver to</span>
          <select value={country} onChange={(event) => changeCountry(event.target.value)} className="rounded-md border border-gray-300 bg-white px-2 py-1.5 text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-white">
            <option value="OTHER">Other country (Group C)</option>
            {DELIVERY_COUNTRIES.map(([code, name]) => <option key={code} value={code}>{name}</option>)}
          </select>
        </label>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {JNR_PRICE_TIERS.map((tier, index) => {
          const price = tierPrices[index]
          const discount = index === 0 ? 0 : Math.round(((highestPrice - price) / highestPrice) * 100)
          const selected = index === activeTierIndex
          return (
            <button
              key={tier.minimum}
              type="button"
              onClick={() => changeQuantity(tier.minimum)}
              className={`min-w-34 rounded-lg border px-3 py-2 text-left transition ${selected ? 'border-lime-700 ring-1 ring-lime-700 dark:border-lime-500 dark:ring-lime-500' : 'border-gray-300 hover:border-lime-600 dark:border-gray-600'}`}>
              <div className="text-xl font-bold text-rose-500">
                {formatEuro(price)} {discount > 0 && <span className="text-base text-gray-500">({discount}% off)</span>}
              </div>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">{tierLabel(tier.minimum, tier.maximum)}</div>
            </button>
          )
        })}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="inline-flex items-center overflow-hidden rounded-full border border-gray-300 dark:border-gray-600">
          <button type="button" onClick={() => changeQuantity(quantity - 1)} disabled={quantity === 1} className="px-4 py-2 text-xl disabled:cursor-not-allowed disabled:opacity-40" aria-label="Decrease quantity">−</button>
          <span className="min-w-20 border-x border-gray-300 px-3 py-2 text-center font-semibold dark:border-gray-600">{quantity}</span>
          <button type="button" onClick={() => changeQuantity(quantity + 1)} className="px-4 py-2 text-xl" aria-label="Increase quantity">+</button>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300">
          <span className="font-medium">{formatEuro(unitPrice)} each</span>
          <span className="mx-2">·</span>
          Total: <span className="font-semibold text-gray-900 dark:text-white">{formatEuro(totalPrice)}</span>
        </div>
      </div>

      <button type="button" onClick={askOnWhatsApp} className="mt-5 w-full rounded-md bg-lime-700 px-6 py-3 font-medium text-white hover:bg-lime-800 sm:w-auto">
        Ask on WhatsApp with this quote
      </button>
    </section>
  )
}
