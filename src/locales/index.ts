import en from './en.json'
import fr from './fr.json'
import es from './es.json'
import de from './de.json'
import it from './it.json'
import pt from './pt.json'
import ru from './ru.json'
// import tr from './tr.json'
import pl from './pl.json'

export enum Locales {
  EN = 'en',
  FR = 'fr',
  ES = 'es',
  DE = 'de',
  IT = 'it',
  PT = 'pt',
  RU = 'ru',
  // TR = 'tr',
  PL = 'pl',
}

// convert locales to array
export const locales = [Locales.EN, Locales.FR, Locales.ES, Locales.DE, Locales.IT, Locales.PT, Locales.RU, Locales.PL]

export const translations = {
  [Locales.EN]: en,
  [Locales.FR]: fr,
  [Locales.ES]: es,
  [Locales.DE]: de,
  [Locales.IT]: it,
  [Locales.PT]: pt,
  [Locales.RU]: ru,
  // [Locales.TR]: tr,
  [Locales.PL]: pl,
}

export const defaultLocale = Locales.EN

// Define a more specific type for translation values
type TranslationValue = Record<string, unknown> | string | undefined

export const t = (locale: Locales, key: string, params?: Record<string, string>): string => {
  const keys = key.split('.')
  let value: TranslationValue = translations[locale]

  for (const k of keys) {
    if (!value) return key
    if (typeof value === 'string') return key
    value = value[k] as TranslationValue
  }

  if (!value) {
    // Fallback to English if key doesn't exist in the locale
    value = translations[defaultLocale]
    for (const k of keys) {
      if (!value) return key
      if (typeof value === 'string') return key
      value = value[k] as TranslationValue
    }
  }

  if (!value) return key
  if (typeof value !== 'string') return key

  // Replace parameters in format {{param}}
  if (params) {
    return Object.entries(params).reduce(
      (str, [key, paramValue]) => str.replace(new RegExp(`{{${key}}}`, 'g'), paramValue),
      value
    )
  }

  return value
}
