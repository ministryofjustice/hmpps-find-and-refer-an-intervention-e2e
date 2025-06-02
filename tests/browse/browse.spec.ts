import {expect, test} from '@playwright/test'
import {
  findAndReferLogin,
  findAndReferLoginCommunity,
  findAndReferLoginCustody,
  findAndReferUnauthorised
} from '../../steps/auth/login'
import {
  goToCommunityCataloguePage,
  goToCustodyCataloguePage,
  verifyCatalogueFilters,
  verifyCatalogueFiltersMessageWithNoResults,
  verifyCatalogueFiltersWithNavigationToInterventionDetails,
  verifyCatalogueFiltersWithPagination,
} from '../../steps/catalogue/catalogue'
import { applyFilters, removeFilterViaPane } from '../../steps/common/filters'
import {searchForServiceUser} from "../../steps/searviceUser/search";

test('Login and view the browse page as a custody user', async ({ page }) => {
  await findAndReferLoginCustody(page)
})

test('Login and view the browse page as a community user', async ({ page }) => {
  await findAndReferLoginCommunity(page)
})

test('Login as an unauthorised user', async ({ page }) => {
  await findAndReferUnauthorised(page)
})

test.describe('Catalogue Page', () => {
  test('should filter results correctly based on options selected', async ({ page }) => {
    await findAndReferLoginCommunity(page)
    await verifyCatalogueFilters(page)
  })
  test('should maintain filters via URL params when interacting with pagination', async ({ page }) => {
    await findAndReferLoginCommunity(page)
    await verifyCatalogueFiltersWithPagination(page)
  })
  test('should maintain selected filters when viewing and returning from the interventions details page', async ({
    page,
  }) => {
    await findAndReferLoginCommunity(page)
    await verifyCatalogueFiltersWithNavigationToInterventionDetails(page)
  })
  test('should show correct message when no filter results are returned', async ({ page }) => {
    await findAndReferLoginCommunity(page)
    await verifyCatalogueFiltersMessageWithNoResults(page)
  })
  test('can navigate to custody page from community page', async ({ page }) => {
    await findAndReferLoginCommunity(page)
    await goToCustodyCataloguePage(page)
  })
  test('can clear filters on community page', async ({ page }) => {
    await findAndReferLoginCommunity(page)
    await applyFilters(page, [{ name: 'Male', inputType: 'checkbox' }], '&gender-checkbox=Male')
    await removeFilterViaPane(page, 'Male')
  })
})

test.describe('custody Page', () => {
  test('can navigate to community page from custody page', async ({ page }) => {
    await findAndReferLoginCommunity(page)
    await goToCustodyCataloguePage(page)
    await goToCommunityCataloguePage(page)
  })
})

test.describe('search for Service User Page', () => {
  test('form validates input correctly when empty', async ({ page }) => {
    await findAndReferLogin(page)
    await searchForServiceUser(page, '')
    await expect(page.getByText('Enter CRN or prison number.').first()).toBeVisible()
  })
  test('form validates input correctly when incorrect format', async ({ page }) => {
    await findAndReferLogin(page)
    await searchForServiceUser(page, '12345')
    await expect(page.getByText('Enter a CRN or prison number in the correct format, like X123456 for a CRN or D0168GH for a prison number').first()).toBeVisible()
  })
  test('form displays result when returned', async ({ page }) => {
    await findAndReferLogin(page)
    await searchForServiceUser(page, 'X718255')
    await expect(page.getByText('Confirm Valerie Wyman\'s details\n')).toBeVisible()
  })
  test('form shows correct error when user is not permitted ot search for a CRN', async ({ page }) => {
    await findAndReferLogin(page)
    await searchForServiceUser(page, 'X472241')
    await expect(page.getByText('You are not authorised to view this person’s details. Either contact your system administrator or enter a different CRN or prison number').first()).toBeVisible()
  })
  test('form shows correct error when service user is not found', async ({ page }) => {
    await findAndReferLogin(page)
    await searchForServiceUser(page, 'X123456')
    await expect(page.getByText('No person with CRN or prison number X123456 found').first()).toBeVisible()
  })
})
