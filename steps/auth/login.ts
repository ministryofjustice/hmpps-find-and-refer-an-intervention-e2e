import { expect, type Page } from '@playwright/test'

export const findAndReferLogin = async (page: Page) => {
    await page.goto(process.env.FIND_AND_REFER_URL);
    await page.getByLabel('Username').fill(process.env.HMPPS_AUTH_USERNAME as string)
    await page.getByLabel('Password').fill(process.env.HMPPS_AUTH_PASSWORD as string)
    await page.locator('#submit', { hasText: 'Sign in' }).click()

    await expect(page).toHaveTitle(/HMPPS Find And Refer An Intervention Ui - Home/);
}