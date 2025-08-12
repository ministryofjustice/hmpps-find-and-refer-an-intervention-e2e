import { expect, type Page } from '@playwright/test'
import { getConfig } from '../common/appConfig'

const appConfig = getConfig()

export const findAndReferLogin = async (page: Page) => {
  await page.goto(appConfig.FIND_AND_REFER_URL)
  await page.getByLabel('Username').fill(appConfig.HMPPS_CUSTODY_AUTH_USERNAME)
  await page.getByLabel('Password').fill(appConfig.HMPPS_CUSTODY_AUTH_PASSWORD)
  await page.locator('#submit', { hasText: 'Sign in' }).click()
}

export const findAndReferLoginCustody = async (page: Page) => {
  await page.goto(appConfig.FIND_AND_REFER_URL)
  await page.getByLabel('Username').fill(appConfig.HMPPS_CUSTODY_AUTH_USERNAME)
  await page.getByLabel('Password').fill(appConfig.HMPPS_CUSTODY_AUTH_PASSWORD)
  await page.locator('#submit', { hasText: 'Sign in' }).click()
  await expect(page.getByText('Commissioned Rehabilitative Services (CRS)')).toBeVisible()
  // Navigate to /interventions/custody after verifying the interventions home page
  await page.goto(appConfig.FIND_AND_REFER_URL + 'interventions/custody')
}

export const findAndReferLoginCommunity = async (page: Page) => {
  await page.goto(appConfig.FIND_AND_REFER_URL)
  await page.getByLabel('Username').fill(appConfig.HMPPS_COMMUNITY_AUTH_USERNAME)
  await page.getByLabel('Password').fill(appConfig.HMPPS_COMMUNITY_AUTH_PASSWORD)
  await page.locator('#submit', { hasText: 'Sign in' }).click()
  await expect(page.getByText('Commissioned Rehabilitative Services (CRS)')).toBeVisible()
  // Navigate to /interventions/custody after verifying the interventions home page
  await page.goto(appConfig.FIND_AND_REFER_URL + 'interventions/community')

}

export const findAndReferUnauthorised = async (page: Page) => {
  await page.goto(appConfig.FIND_AND_REFER_URL)
  await page.getByLabel('Username').fill(appConfig.HMPPS_UNAUTHORISED_AUTH_USERNAME)
  await page.getByLabel('Password').fill(appConfig.HMPPS_UNAUTHORISED_AUTH_PASSWORD)
  await page.locator('#submit', { hasText: 'Sign in' }).click()

  await expect(page.getByText('There is a problem')).toBeVisible()
  await expect(page.getByText("Your account is locked. If you have verified your email address then you can use 'I have forgotten my password' below.")).toBeVisible()
}
