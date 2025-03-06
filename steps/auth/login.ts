import { expect, type Page } from '@playwright/test'

export const findAndReferLoginCustody = async (page: Page) => {
    await page.goto(process.env.FIND_AND_REFER_URL);
    await page.getByLabel('Username').fill(process.env.HMPPS_CUSTODY_AUTH_USERNAME as string)
    await page.getByLabel('Password').fill(process.env.HMPPS_CUSTODY_AUTH_PASSWORD as string)
    await page.locator('#submit', { hasText: 'Sign in' }).click()

    await expect(page).toHaveTitle(/HMPPS Find And Refer An Intervention Ui - Home/);
    await expect(page.getByText('Search results for custody')).toBeVisible();
}

export const findAndReferLoginCommunity = async (page: Page) => {
    await page.goto(process.env.FIND_AND_REFER_URL);
    await page.getByLabel('Username').fill(process.env.HMPPS_COMMUNITY_AUTH_USERNAME as string)
    await page.getByLabel('Password').fill(process.env.HMPPS_COMMUNITY_AUTH_PASSWORD as string)
    await page.locator('#submit', { hasText: 'Sign in' }).click()

    await expect(page).toHaveTitle(/HMPPS Find And Refer An Intervention Ui - Home/);
    await expect(page.getByText('Search results for community')).toBeVisible();
}

export const findAndReferUnauthorised = async (page: Page) => {
    await page.goto(process.env.FIND_AND_REFER_URL);
    await page.getByLabel('Username').fill('robert.mercury')
    await page.getByLabel('Password').fill('password123456')
    await page.locator('#submit', { hasText: 'Sign in' }).click()

    await expect(page.getByText('Authorisation Error')).toBeVisible();
    await expect(page.getByText('You are not authorised to use this application.')).toBeVisible();
}