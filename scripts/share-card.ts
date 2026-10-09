import { PROFILE } from '@/features/profile/profile-content'

import './share-card.sass'

const [givenName = '', ...familyNames] = PROFILE.name.split(' ')

const NAME_LINES: Record<string, string> = {
  '[data-family-name]': familyNames.join(' '),
  '[data-given-name]': givenName
}

for (const [selector, line] of Object.entries(NAME_LINES)) {
  const element = document.querySelector(selector)
  if (element !== null) {
    element.textContent = line
  }
}
