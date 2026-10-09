const locale = readRecognizedText({
  key: 'app:locale',
  isRecognized: isLocale
})

if (locale.status === 'failure') {
  locale.error
  // → 'unavailable' | 'unrecognized'
} else {
  locale.data
  // → 'en' | 'fr' | null
}
