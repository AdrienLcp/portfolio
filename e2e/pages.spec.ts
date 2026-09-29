import { expect, type Page, test } from '@playwright/test'

const MAIL_ENDPOINT = 'https://api.web3forms.com/submit'

const mainNavigation = (page: Page) =>
  page.getByRole('navigation', { name: 'Main' })

test('[e2e] the lid opens on the box and closes back', async ({ page }) => {
  await page.goto('/en')

  await page.getByRole('button', { name: 'Open the box' }).click()
  await expect(
    page.getByRole('heading', { name: 'Contents of the box' })
  ).toBeFocused()

  await page.getByRole('button', { name: 'Close the lid' }).click()
  await expect(
    page.getByRole('heading', { level: 1, name: 'Adrien Lacourpaille' })
  ).toBeFocused()
})

test('[e2e] from the shelf to a project and back', async ({ page }) => {
  await page.goto('/en')

  await mainNavigation(page).getByRole('link', { name: 'Projects' }).click()
  await expect(page).toHaveURL('/en/projects')

  await page.getByRole('link', { name: 'Read the rules of Taverla' }).click()
  await expect(page).toHaveURL('/en/projects/taverla')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Taverla')

  await page.getByRole('link', { name: 'All projects' }).click()
  await expect(page).toHaveURL('/en/projects')
})

test('[e2e] each project page is worded after what the project is', async ({
  page
}) => {
  await page.goto('/en/projects')
  await page.getByRole('link', { name: 'Read about Séance' }).click()
  await expect(page).toHaveURL('/en/projects/seance')
  await expect(
    page.getByRole('heading', { name: 'How it works' })
  ).toBeVisible()
  await expect(page.getByRole('link', { name: /^Open it/ })).toBeVisible()
  await expect(page.getByText('How it plays')).toHaveCount(0)

  await page.goto('/fr/projects/packages')
  await expect(
    page.getByRole('heading', { name: 'Comment on s’en sert' })
  ).toBeVisible()
  await expect(page.getByText('Comment ça se joue')).toHaveCount(0)
})

test('[e2e] the about page leads to the projects and to contact', async ({
  page
}) => {
  await page.goto('/en')

  await mainNavigation(page).getByRole('link', { name: 'About' }).click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('About')

  await page.getByRole('link', { name: 'Write to me' }).click()
  await expect(page).toHaveURL('/en/contact')
})

test('[e2e] the keyboard skips the header and lands on each new page', async ({
  page
}) => {
  await page.goto('/en/about')

  await page.keyboard.press('Tab')
  await expect(
    page.getByRole('link', { name: 'Skip to content' })
  ).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('main')).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Write to me' })).toBeFocused()

  await mainNavigation(page).getByRole('link', { name: 'Projects' }).focus()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL('/en/projects')
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

test('[e2e] a blank reply card says what is missing', async ({ page }) => {
  await page.goto('/en/contact')

  await page.getByRole('button', { name: 'Send the card' }).click()

  await expect(page.getByText('Tell me who is writing.')).toBeVisible()
  await expect(page.getByText('An address, so I can write back.')).toBeVisible()
  await expect(page.getByText('The card is still blank.')).toBeVisible()
})

test.describe('the reply card, never posted for real', () => {
  const fillCard = async (page: Page): Promise<void> => {
    await page.goto('/en/contact')
    await page.getByRole('textbox', { name: 'Your name' }).fill('Ada')
    await page
      .getByRole('textbox', { name: 'Your email' })
      .fill('ada@example.com')
    await page.getByRole('textbox', { name: 'Your message' }).fill('Hello')
    await page.getByRole('button', { name: 'Send the card' }).click()
  }

  test('[e2e] a posted card is stamped and can be written again', async ({
    page
  }) => {
    await page.route(MAIL_ENDPOINT, (route) =>
      route.fulfill({ json: { success: true } })
    )

    await fillCard(page)

    await expect(page.getByRole('heading', { name: 'Posted' })).toBeFocused()
    await page.getByRole('button', { name: 'Write another' }).click()
    await expect(page.getByRole('textbox', { name: 'Your name' })).toBeEmpty()
  })

  test('[e2e] a refused card says so and keeps the text', async ({ page }) => {
    await page.route(MAIL_ENDPOINT, (route) =>
      route.fulfill({ json: { success: false }, status: 400 })
    )

    await fillCard(page)

    await expect(
      page.getByText('The mail service turned the card down.', { exact: false })
    ).toBeVisible()
    await expect(
      page.getByRole('textbox', { name: 'Your message' })
    ).toHaveValue('Hello')
  })
})

test('[e2e] a theme picked on the rail survives a reload', async ({ page }) => {
  await page.goto('/en')
  const root = page.locator('html')

  await page.getByRole('radio', { name: 'Night' }).check()
  await expect(root).toHaveAttribute('data-theme', 'dark')

  await page.reload()
  await expect(root).toHaveAttribute('data-theme', 'dark')
  await expect(page.getByRole('radio', { name: 'Night' })).toBeChecked()
})
