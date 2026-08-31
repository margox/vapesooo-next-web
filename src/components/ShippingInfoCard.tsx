const SHIPPING_INFO_ITEMS = [
  'All-inclusive price — VAT & shipping included',
  'Ships from EU warehouse',
  'Estimated delivery: 5 working days',
  'DDP — all duties & taxes prepaid by seller',
  'Tracking number provided once shipped',
]

export default function ShippingInfoCard() {
  return (
    <div className="mb-5 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50">
      <div className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
        <span aria-hidden="true">📦</span>
        <span>Shipping &amp; Pricing Information</span>
      </div>
      <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
        {SHIPPING_INFO_ITEMS.map((item) => (
          <li key={item} className="flex items-start gap-1.5">
            <span className="mt-px shrink-0 font-semibold text-lime-600 dark:text-lime-500">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
