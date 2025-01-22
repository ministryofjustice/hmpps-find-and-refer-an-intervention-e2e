import { expect, type Page } from '@playwright/test'

export const findAndReferLogin = async (page: Page) => {
    // await page.goto(process.env.PREPARE_A_CASE_FOR_SENTENCE_URL)
    // await expect(page).toHaveTitle(/HMPPS Digital Services - Sign in/)
    // await page.fill('#username', process.env.DELIUS_USERNAME!)
    // await page.fill('#password', process.env.DELIUS_PASSWORD!)


    await page.goto('http://localhost:3000');
    await page.getByLabel('Username').fill(process.env.HMPPS_AUTH_USERNAME as string)
    await page.getByLabel('Password').fill(process.env.HMPPS_AUTH_PASSWORD as string)
    await page.locator('#submit', { hasText: 'Sign in' }).click()

    await expect(page).toHaveTitle(/HMPPS Find And Refer An Intervention Ui - Home/);
}