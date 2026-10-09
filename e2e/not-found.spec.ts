import { expect, test } from '@playwright/test'

test('[e2e] an unknown address is a real 404 that names it', async ({
  page
}) => {
  const response = await page.goto('/en/no-such-piece')

  expect(response?.status()).toBe(404)
  await expect(
    page.getByText('Address asked for: /en/no-such-piece')
  ).toBeVisible()

  await page.getByRole('link', { name: 'Back to home' }).click()
  await expect(page).toHaveURL('/en')
})
