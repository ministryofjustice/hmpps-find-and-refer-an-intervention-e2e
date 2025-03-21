import { Page } from '@playwright/test'

export const clickBackLink = async (page: Page) => {
  await page.getByRole('link', { name: 'Back' }).click()
}

export default clickBackLink
