import { Page } from '@playwright/test'

export const clickOnPaginationPage = async (page: Page, pageNumber: number) => {
  await page.getByLabel(`Page ${pageNumber} of`).click()
}

export const clickOnPaginationPrevious = async (page: Page) => {
  await page.getByRole('link', { name: 'Previous page' }).click()
}
