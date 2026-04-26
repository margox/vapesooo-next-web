export const getPreferredLanguageCode = (languages: string | readonly string[] | undefined): string | undefined => {
  const preferredLanguage = typeof languages === 'string' ? languages.split(',')[0] : languages?.[0]
  return preferredLanguage?.trim().toLowerCase().split(/[-_;]/)[0]
}
