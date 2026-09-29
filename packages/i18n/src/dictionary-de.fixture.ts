import { defineTranslation } from './define-translation'
import { defineDictionary } from './dictionary'

export default defineDictionary({
  greeting: 'Hallo {name}',
  round: { none: 'Niemand hat es gefunden' },
  score: defineTranslation('{count:plural}', {
    plural: { count: { one: '{?} Punkt', other: '{?} Punkte' } }
  })
})
