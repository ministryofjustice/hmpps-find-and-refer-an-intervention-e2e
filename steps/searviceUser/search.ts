import {expect, Page} from "@playwright/test";
import { getConfig } from '../common/appConfig'

const appConfig = getConfig()

export const searchForServiceUser = async (page: Page, searchString: string) => {
    await page.goto(appConfig.FIND_AND_REFER_URL + 'enter-crn-or-prison-number')
    await page.fill("[id='search-by-crn']", searchString);
    await page.click("[id='search-for-service-user']");
}