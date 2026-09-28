import { expect, test } from '@playwright/test'

test('[e2e] the front door answers in the browser’s language', async ({
  browser
}) => {
  const french = await browser.newContext({ locale: 'fr-FR' })
  const page = await french.newPage()

  await page.goto('/')

  await expect(page).toHaveURL('/fr')
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr')
  await french.close()
})

test('[e2e] a language picked on the rail outranks the browser’s', async ({
  page
}) => {
  await page.goto('/en/about')
  await page
    .getByRole('group', { name: 'Language' })
    .getByRole('link', { name: 'Français' })
    .click()

  await expect(page).toHaveURL('/fr/about')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('À propos')
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr')

  // The browser still asks for English; the device remembers the pick.
  await page.goto('/')
  await expect(page).toHaveURL('/fr')
})
