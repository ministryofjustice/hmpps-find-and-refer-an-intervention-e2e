import { Page } from '@playwright/test'

export const clickOnPaginationPage = async (page: Page, pageNumber: number) => {
  await page.getByLabel(`Page ${pageNumber}`).or(page.getByRole('link', { name: `Page ${pageNumber}` })).click()
}

export const clickOnPaginationPrevious = async (page: Page) => {
  await page
    .getByRole('link', { name: /Previous(\s+page)?/i })
    .or(page.getByRole('button', { name: /Previous(\s+page)?/i }))
    .click()
}
