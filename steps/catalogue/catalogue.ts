import { expect, Page } from "@playwright/test";
import { clickBackLink } from "../common/common";
import { applyFilters, removeFilters, verifyFilters } from "../common/filters";
import {
  clickOnPaginationPage,
  clickOnPaginationPrevious,
} from "../common/pagination";
import { verifyCorrectInterventionsDetailPage } from "../interventionDetails/interventionDetails";

export const goToInterventionsDetailPage = async (
  page: Page,
  interventionName: string
) => {
  await page.getByRole("link", { name: interventionName }).click();
};

export const goToCustodyCataloguePage = async (page: Page) => {
  await page.getByRole("link", { name: "custody" }).click();
  await expect(page).toHaveURL(/.*interventions\/custody/);
};

export const goToCommunityCataloguePage = async (page: Page) => {
  await page.getByRole("link", { name: "community" }).click();
  await expect(page).toHaveURL(/.*interventions\/community/);
};

export const verifyCatalogueFilters = async (page: Page) => {
  await applyFilters(page, [{ name: "Female", inputType: "checkbox" }], 2);
  await removeFilters(page, [{ name: "Female", inputType: "checkbox" }], 5);
  await applyFilters(page, [{ name: "Male", inputType: "checkbox" }], 5);
  await applyFilters(
    page,
    [{ name: "Accredited Programmes", inputType: "checkbox" }],
    3
  );
  await verifyFilters(page, [
    { name: "Male", inputType: "checkbox" },
    { name: "Accredited Programmes", inputType: "checkbox" },
  ]);
};

export const verifyCatalogueFiltersWithPagination = async (page: Page) => {
  await applyFilters(
    page,
    [
      { name: "Male", inputType: "checkbox" },
      { name: "Accredited Programmes", inputType: "checkbox" },
      { name: "Commissioned Rehabilitative Services", inputType: "checkbox" },
    ],
    5
  );
  await clickOnPaginationPage(page, 2);
  await expect(page).toHaveURL(
    /.*gender-checkbox=Male&type-checkbox=ACP&type-checkbox=CRS&page=2/
  );
  await clickOnPaginationPrevious(page);
  await expect(page).toHaveURL(
    /.*gender-checkbox=Male&type-checkbox=ACP&type-checkbox=CRS&page=1/
  );
  await verifyFilters(page, [
    { name: "Male", inputType: "checkbox" },
    { name: "Accredited Programmes", inputType: "checkbox" },
    { name: "Commissioned Rehabilitative Services", inputType: "checkbox" },
  ]);
};

export const verifyCatalogueFiltersWithNavigationToInterventionDetails = async (
  page: Page
) => {
  await applyFilters(page, [{ name: "Male", inputType: "checkbox" }], 5);
  await goToInterventionsDetailPage(page, "Building Better Relationships");
  await verifyCorrectInterventionsDetailPage(page, "Intervention name");
  await clickBackLink(page);
  await expect(page).toHaveURL(/.*gender-checkbox=Male/);
  await verifyFilters(page, [{ name: "Male", inputType: "checkbox" }]);
};

export const verifyCatalogueFiltersMessageWithNoResults = async (
  page: Page
) => {
  await applyFilters(
    page,
    [
      { name: "Female", inputType: "checkbox" },
      { name: "Structured Interventions", inputType: "checkbox" },
    ],
    0
  );
  await expect(page.getByText("There are no matching results")).toBeVisible();
};
