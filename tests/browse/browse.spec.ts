import {test} from '@playwright/test'
import {findAndReferLogin} from "../../steps/auth/login";
import {
    verifyCatalogueFilters, verifyCatalogueFiltersMessageWithNoResults,
    verifyCatalogueFiltersWithNavigationToInterventionDetails,
    verifyCatalogueFiltersWithPagination
} from "../../steps/catalogue/catalogue";

test('Login and view the browse page', async ({ page }) => {
    await findAndReferLogin(page)
})

test.describe('Catalogue Page', () => {
    test('should filter results correctly based on options selected', async ({ page }) => {
        await findAndReferLogin(page)
        await verifyCatalogueFilters(page)
    })
    test('should maintain filters via URL params when interacting with pagination', async ({ page }) => {
        await findAndReferLogin(page)
        await verifyCatalogueFiltersWithPagination(page)
    })
    test('should maintain selected filters when viewing and returning from the interventions details page', async ({ page }) => {
        await findAndReferLogin(page)
        await verifyCatalogueFiltersWithNavigationToInterventionDetails(page)
    })
    test('should show correct message when no filter results are returned', async ({ page }) => {
        await findAndReferLogin(page)
        await verifyCatalogueFiltersMessageWithNoResults(page)
    })
})





