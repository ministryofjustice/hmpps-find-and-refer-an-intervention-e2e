import { expect, type Page } from "@playwright/test";
import getConfig from "../common/appConfig";

const appConfig = getConfig();

export const findAndReferLoginCustody = async (page: Page) => {
  await page.goto(appConfig.FIND_AND_REFER_URL);
  await page.getByLabel("Username").fill(appConfig.HMPPS_CUSTODY_AUTH_USERNAME);
  await page.getByLabel("Password").fill(appConfig.HMPPS_CUSTODY_AUTH_PASSWORD);
  await page.locator("#submit", { hasText: "Sign in" }).click();

  await expect(page).toHaveTitle("Find and refer an intervention - Home");
  await expect(page.getByText("Search results for custody")).toBeVisible();
};

export const findAndReferLoginCommunity = async (page: Page) => {
  await page.goto(appConfig.FIND_AND_REFER_URL);
  await page
    .getByLabel("Username")
    .fill(appConfig.HMPPS_COMMUNITY_AUTH_USERNAME);
  await page
    .getByLabel("Password")
    .fill(appConfig.HMPPS_COMMUNITY_AUTH_PASSWORD);
  await page.locator("#submit", { hasText: "Sign in" }).click();

  await expect(page).toHaveTitle("Find and refer an intervention - Home");
  await expect(page.getByText("Search results for community")).toBeVisible();
};

export const findAndReferUnauthorised = async (page: Page) => {
  await page.goto(appConfig.FIND_AND_REFER_URL);
  await page
    .getByLabel("Username")
    .fill(appConfig.HMPPS_UNAUTHORISED_AUTH_USERNAME);
  await page
    .getByLabel("Password")
    .fill(appConfig.HMPPS_UNAUTHORISED_AUTH_PASSWORD);
  await page.locator("#submit", { hasText: "Sign in" }).click();

  await expect(page.getByText("Authorisation Error")).toBeVisible();
  await expect(
    page.getByText("You are not authorised to use this application.")
  ).toBeVisible();
};
