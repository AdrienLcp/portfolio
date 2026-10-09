import type { Page } from '@playwright/test'

/**
 * The prerendered page paints before the app script is even requested, so a
 * click that lands first gets the browser's own behaviour: a full page load,
 * a native form submit. A journey that tests the app waits for the attribute
 * the app sets on `<html>` once it has hydrated (`presentation/hydration-mark.ts`).
 */
export const openHydrated = async (page: Page, path: string): Promise<void> => {
  await page.goto(path)
  await page.locator('html[data-hydrated]').waitFor({ state: 'attached' })
}
