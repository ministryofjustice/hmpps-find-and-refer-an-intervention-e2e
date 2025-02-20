import {expect, Page} from "@playwright/test";
import {applyFilters, removeFilters, verifyFilters} from "../common/filters";
import {clickOnPaginationPage, clickOnPaginationPrevious} from "../common/pagination";
import {verifyCorrectInterventionsDetailPage} from "../interventionDetails/interventionDetails";
import {clickBackLink} from "../common/common";

export const goToInterventionsDetailPage = async (page: Page, interventionName: string) => {
    await page.getByRole('link', { name: interventionName }).click();
}

export const verifyCatalogueFilters = async (page: Page) => {
    await applyFilters(page, [{name:'Female', inputType: 'checkbox'}], 2)
    await removeFilters(page, [{name:'Female', inputType: 'checkbox'}], 9)
    await applyFilters(page, [{name:'Male', inputType: 'checkbox'}], 9)
    await applyFilters(page, [{name:'Community', inputType: 'radio'}], 5)
    await applyFilters(page, [{name:'Accredited Programmes', inputType: 'checkbox'}], 3)
    await verifyFilters(page, [{name:'Male', inputType: 'checkbox'}, {name:'Accredited Programmes', inputType: 'checkbox'}, {name:'Community', inputType: 'radio'}])
}

export const verifyCatalogueFiltersWithPagination = async (page: Page) => {
    await applyFilters(page, [{name:'Male', inputType: 'checkbox'}, {name:'Accredited Programmes', inputType: 'checkbox'}, {name:'Commissioned Rehabilitative Services', inputType: 'checkbox'}], 9)
    await clickOnPaginationPage(page, 2)
    await expect(page).toHaveURL(/.*gender-checkbox=Male&type-checkbox=ACP&type-checkbox=CRS&page=2/);
    await clickOnPaginationPrevious(page)
    await expect(page).toHaveURL(/.*gender-checkbox=Male&type-checkbox=ACP&type-checkbox=CRS&page=1/);
    await verifyFilters(page, [{name:'Male', inputType: 'checkbox'}, {name:'Accredited Programmes', inputType: 'checkbox'}, {name:'Commissioned Rehabilitative Services', inputType: 'checkbox'}])
}

export const verifyCatalogueFiltersWithNavigationToInterventionDetails = async (page: Page) => {
    await applyFilters(page, [{name:'Male', inputType: 'checkbox'}, {name:'Community', inputType: 'radio'}], 5)
    await goToInterventionsDetailPage(page, 'Building Better Relationships');
    await verifyCorrectInterventionsDetailPage(page, 'Intervention name');
    await clickBackLink(page)
    await expect(page).toHaveURL(/.*setting-radio=COMMUNITY&gender-checkbox=Male/);
    await verifyFilters(page, [{name:'Male', inputType: 'checkbox'}, {name:'Community', inputType: 'radio'}])
}

export const verifyCatalogueFiltersMessageWithNoResults = async (page: Page) => {
    await applyFilters(page, [{name:'Female', inputType: 'checkbox'}, {name:'Custody', inputType: 'radio'}], 0)
    await expect(page.getByText('There are no matching results')).toBeVisible();
}
