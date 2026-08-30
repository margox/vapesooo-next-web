export type JnrPriceGroup = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'

export type JnrProductCost = {
  unitCost: number
  unitWeightGrams: number
}

export type JnrPriceTier = {
  minimum: number
  maximum: number | null
  margin: number
}

export const JNR_PRODUCT_COSTS: Record<string, JnrProductCost> = {
  'jnr-falcon-pro': { unitCost: 6.19, unitWeightGrams: 132 },
  'jnr-mega-box-pro': { unitCost: 7.45, unitWeightGrams: 143.7 },
  'jnr-ragegorilla': { unitCost: 7.31, unitWeightGrams: 149.72 },
  'jnr-quads-4in1': { unitCost: 7.87, unitWeightGrams: 140.12 },
  'jnr-alien': { unitCost: 3.84, unitWeightGrams: 89 },
  'jnr-triple-3in1': { unitCost: 8.65, unitWeightGrams: 166 },
  'jnr-l-opard': { unitCost: 5.02, unitWeightGrams: 127.9 },
  'jnr-falcon-x': { unitCost: 6.18, unitWeightGrams: 111 },
}

export const JNR_PRICE_TIERS: JnrPriceTier[] = [
  { minimum: 1, maximum: 9, margin: 0.104 },
  { minimum: 10, maximum: 29, margin: 0.104 },
  { minimum: 30, maximum: 49, margin: 0.104 },
  { minimum: 50, maximum: 99, margin: 0.104 },
  { minimum: 100, maximum: 199, margin: 0.104 },
  { minimum: 200, maximum: 399, margin: 0.09 },
  { minimum: 400, maximum: 999, margin: 0.08 },
  { minimum: 1000, maximum: null, margin: 0.07 },
]

const GROUP_COUNTRIES: Record<JnrPriceGroup, string[]> = {
  A: ['FR', 'DE', 'NL', 'LU'],
  B: ['IT', 'AT', 'BE', 'CZ'],
  C: ['DK', 'PL', 'IE', 'HU', 'SI', 'SK'],
  D: ['EE', 'LV', 'LT', 'HR', 'SE'],
  E: ['BG', 'FI', 'GR'],
  F: ['NO'],
}

// Rates from the supplied JNR freight worksheet. Index 0 is <= 1kg; each
// following entry is the upper whole-kilogram bound through 40kg.
const GROUP_FREIGHT_RATES: Record<JnrPriceGroup, number[]> = {
  A: [13.02, 14.3, 15.15, 15.72, 16.31, 17.03, 17.52, 17.88, 18.2, 18.54, 21.43, 21.43, 21.43, 21.43, 21.43, 22.81, 22.81, 22.81, 22.81, 22.81, 30.98, 30.98, 30.98, 30.98, 30.98, 34.77, 34.77, 34.77, 34.77, 34.77, 34.77, 34.77, 35.82, 36.87, 37.92, 38.97, 40.02, 41.07, 42.12, 43.17],
  B: [14.16, 15.72, 16.89, 18.06, 19.23, 20.17, 20.89, 21.34, 21.84, 22.29, 26.2, 26.2, 26.2, 26.2, 26.2, 28.25, 28.25, 28.25, 28.25, 28.25, 35.09, 35.09, 35.09, 35.09, 35.09, 39, 39, 39, 39, 39, 39, 39, 40.18, 41.37, 42.55, 43.74, 44.92, 46.1, 47.29, 48.47],
  C: [14.72, 16.52, 17.72, 19.78, 21.84, 22.96, 24, 24.73, 25.42, 26.12, 29.59, 29.59, 29.59, 29.59, 29.59, 30.98, 30.98, 30.98, 30.98, 30.98, 41.91, 41.91, 41.91, 41.91, 41.91, 51.69, 51.69, 51.69, 51.69, 51.69, 51.69, 51.69, 53.28, 54.87, 56.46, 58.05, 59.64, 61.23, 62.82, 64.4],
  D: [22.6, 25.06, 26.8, 27.1, 29.14, 30.52, 31.52, 32.18, 32.84, 33.5, 39.16, 39.16, 39.16, 39.16, 39.16, 43.27, 43.27, 43.27, 43.27, 43.27, 50.09, 50.09, 50.09, 50.09, 50.09, 58.75, 58.75, 58.75, 58.75, 58.75, 58.75, 58.75, 60.57, 62.38, 64.19, 66.01, 67.82, 69.64, 71.45, 73.26],
  E: [25.97, 27.95, 29.14, 30.29, 31.48, 32.9, 33.93, 34.61, 35.31, 35.99, 41.91, 41.91, 41.91, 41.91, 41.91, 44.62, 44.62, 44.62, 44.62, 44.62, 62.34, 62.34, 62.34, 62.34, 62.34, 68.63, 68.63, 68.63, 68.63, 68.63, 68.63, 68.63, 70.76, 72.89, 75.02, 77.14, 79.27, 81.4, 83.53, 85.66],
  F: [37.22, 39.61, 41.07, 44.29, 47.77, 49.67, 50.93, 51.75, 52.59, 53.43, 60.99, 60.99, 60.99, 60.99, 60.99, 65.08, 65.08, 65.08, 65.08, 65.08, 93.72, 93.72, 93.72, 93.72, 93.72, 99.63, 99.63, 99.63, 99.63, 99.63, 99.63, 99.63, 102.76, 105.89, 109.02, 112.16, 115.29, 118.42, 121.55, 124.69],
}

const OVER_40KG_INCREMENT: Record<JnrPriceGroup, number> = { A: 1.05, B: 1.19, C: 1.59, D: 1.82, E: 2.13, F: 3.15 }

export function getJnrPriceGroup(countryCode?: string | null): JnrPriceGroup {
  const normalizedCountryCode = countryCode?.toUpperCase()
  return (Object.entries(GROUP_COUNTRIES).find(([, countries]) => countries.includes(normalizedCountryCode ?? ''))?.[0] as JnrPriceGroup | undefined) ?? 'C'
}

export function getTierForQuantity(quantity: number): JnrPriceTier {
  return JNR_PRICE_TIERS.find((tier) => tier.maximum === null || quantity <= tier.maximum) ?? JNR_PRICE_TIERS[JNR_PRICE_TIERS.length - 1]
}

function getFreight(group: JnrPriceGroup, weightGrams: number): number {
  const kilograms = Math.max(1, Math.ceil(weightGrams / 1000))
  const rates = GROUP_FREIGHT_RATES[group]
  const baseRate = kilograms <= 40 ? rates[kilograms - 1] : rates[39] + (kilograms - 40) * OVER_40KG_INCREMENT[group]
  return baseRate
}

export function getJnrUnitPrice(product: JnrProductCost, group: JnrPriceGroup, tier: JnrPriceTier): number {
  // The supplied worksheet prices a tier from its upper bound. For 1,000+ it
  // uses 1,000 units as the reference quantity.
  const referenceQuantity = tier.maximum ?? tier.minimum
  const handlingCost = referenceQuantity === 1 ? 0.96 : 0.54 + 0.4 * (referenceQuantity - 1)
  const totalCost = product.unitCost * referenceQuantity + handlingCost + 1.99 + getFreight(group, product.unitWeightGrams * referenceQuantity)
  return totalCost / referenceQuantity / (1 - tier.margin)
}
