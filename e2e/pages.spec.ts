import { expect, type Page, test } from '@playwright/test'

import { openHydrated } from './hydrated-page'

const MAIL_ENDPOINT = 'https://api.web3forms.com/submit'

const mainNavigation = (page: Page) =>
  page.getByRole('navigation', { name: 'Main' })

test('[e2e] a project of the index unfolds in place and folds back', async ({
  page
}) => {
  await openHydrated(page, '/en')

  const taverla = page.getByRole('button', { name: /^Taverla/ })
  const playLive = page.getByRole('link', { name: /^Play live/ })
  await taverla.click()
  await expect(playLive).toBeVisible()
  await expect(taverla).toHaveAttribute('aria-expanded', 'true')

  await taverla.click()
  await expect(taverla).toHaveAttribute('aria-expanded', 'false')
  await expect(playLive).toBeHidden()
})

test('[e2e] from the index to a project page and back', async ({ page }) => {
  await openHydrated(page, '/en')

  const taverla = page.getByRole('button', { name: /^Taverla/ })
  const details = page.getByRole('link', { name: 'Full details' }).first()
  await taverla.click()
  await expect(details).toBeVisible()
  await details.click()
  await expect(page).toHaveURL('/en/projects/taverla')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Taverla')
  await expect(page.getByRole('heading', { name: 'At a glance' })).toBeVisible()

  await page
    .getByRole('main')
    .getByRole('link', { exact: true, name: 'Projects' })
    .click()
  await expect(page).toHaveURL('/en#projects')
})

test('[e2e] each project page is built after what the project is', async ({
  page
}) => {
  await page.goto('/en/projects/seance')
  await expect(
    page.getByRole('heading', { name: 'How it works' })
  ).toBeVisible()
  await expect(page.getByRole('link', { name: /^Open live/ })).toBeVisible()

  await page.goto('/fr/projects/packages')
  await expect(
    page.getByRole('heading', { name: 'Tel que le compilateur le lit' })
  ).toBeVisible()
  await expect(
    page.getByRole('img', { name: 'Refusé : 3 erreurs' })
  ).toBeVisible()
})
test('[e2e] the about page leads to contact', async ({ page }) => {
  await openHydrated(page, '/en')

  await mainNavigation(page).getByRole('link', { name: 'About' }).click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Adrien Lacourpaille'
  )

  await page.getByRole('link', { name: 'Write to me' }).click()
  await expect(page).toHaveURL('/en/contact')
})

test('[e2e] the keyboard skips the header and lands on each new page', async ({
  page
}) => {
  await openHydrated(page, '/en/about')

  await page.keyboard.press('Tab')
  await expect(
    page.getByRole('link', { name: 'Skip to content' })
  ).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('main')).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Taverla' })).toBeFocused()

  await mainNavigation(page).getByRole('link', { name: 'Contact' }).focus()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL('/en/contact')
  await expect(page.getByRole('main')).toBeFocused()
})

test('[e2e] both CV downloads are real PDFs', async ({ page, request }) => {
  await page.goto('/en/cv')

  for (const name of ['Download the CV', 'ATS version']) {
    const href = await page.getByRole('link', { name }).getAttribute('href')
    const response = await request.get(href ?? '')

    expect(response.status(), name).toBe(200)
    expect(response.headers()['content-type'], name).toBe('application/pdf')
  }
})

test('[e2e] the plain CV is served but kept out of the index', async ({
  page
}) => {
  const response = await page.goto('/en/cv/plain')

  expect(response?.status()).toBe(200)
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    /noindex/
  )
  await expect(page.getByRole('banner')).toHaveCount(0)
})

test('[e2e] a blank note says what is missing', async ({ page }) => {
  await openHydrated(page, '/en/contact')

  await page.getByRole('button', { name: 'Send the note' }).click()

  await expect(page.getByText('Tell me who is writing.')).toBeVisible()
  await expect(page.getByText('An address, so I can write back.')).toBeVisible()
  await expect(page.getByText('The message is still blank.')).toBeVisible()
})

test.describe('the note, never sent for real', () => {
  const fillNote = async (page: Page): Promise<void> => {
    await openHydrated(page, '/en/contact')
    await page.getByRole('textbox', { name: 'Name' }).fill('Ada')
    await page.getByRole('textbox', { name: 'Email' }).fill('ada@example.com')
    await page.getByRole('textbox', { name: 'Message' }).fill('Hello')
    await page.getByRole('button', { name: 'Send the note' }).click()
  }

  test('[e2e] a sent note is thanked and another can be written', async ({
    page
  }) => {
    await page.route(MAIL_ENDPOINT, (route) =>
      route.fulfill({ json: { success: true } })
    )

    await fillNote(page)

    await expect(
      page.getByText('Thanks for writing.', { exact: false })
    ).toBeFocused()
    await page.getByRole('button', { name: 'Write another note' }).click()
    await expect(page.getByRole('textbox', { name: 'Name' })).toBeEmpty()
  })

  test('[e2e] a refused note says so and keeps the text', async ({ page }) => {
    await page.route(MAIL_ENDPOINT, (route) =>
      route.fulfill({ json: { success: false }, status: 400 })
    )

    await fillNote(page)

    await expect(
      page.getByText('The mail service turned the note down.', { exact: false })
    ).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Message' })).toHaveValue(
      'Hello'
    )
  })
})

test('[e2e] a theme picked on the rail survives a reload', async ({ page }) => {
  await openHydrated(page, '/en')
  const root = page.locator('html')

  await page.getByRole('radio', { name: 'Dark' }).check()
  await expect(root).toHaveAttribute('data-theme', 'dark')

  await page.reload()
  await expect(root).toHaveAttribute('data-theme', 'dark')
  await expect(page.getByRole('radio', { name: 'Dark' })).toBeChecked()
})
