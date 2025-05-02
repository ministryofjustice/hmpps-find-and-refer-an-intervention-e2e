import { expect, Page } from "@playwright/test";

export type filterItem = {
  inputType: "radio" | "checkbox" | "textbox";
  name: string;
};

export const fillTextFilter = async (
  page: Page,
  accessibleName: string,
  text: string,
  expectedResultsNumber: number
) => {
  await page
    .getByRole("textbox", { name: accessibleName, exact: true })
    .fill(text);
  await page.getByTestId("submit-button").click();
  await expect(page.getByTestId("results-number")).toHaveText(
    `${expectedResultsNumber} results`
  );
};

export const applyFilters = async (
  page: Page,
  filters: filterItem[],
  expectedResultsNumber: number
) => {
  for (const filter of filters) {
    await page
      .getByRole(filter.inputType, { name: filter.name, exact: true })
      .check();
  }
  await page.getByTestId("submit-button").click();
  await expect(page.getByTestId("results-number")).toHaveText(
    `${expectedResultsNumber} results`
  );
};

export const verifyFilters = async (page: Page, filters: filterItem[]) => {
  for (const filter of filters) {
    await expect(
      page.getByRole(filter.inputType, { name: filter.name, exact: true })
    ).toBeChecked();
  }
};

export const removeFilters = async (
  page: Page,
  filters: filterItem[],
  expectedResultsNumber: number
) => {
  for (const filter of filters) {
    await page
      .getByRole(filter.inputType, { name: filter.name, exact: true })
      .uncheck();
  }
  await page.getByTestId("submit-button").click();
  await expect(page.getByTestId("results-number")).toHaveText(
    `${expectedResultsNumber} results`
  );
};

export const removeFilterViaPane = async (page: Page, filter: string) => {
  await page
    .getByRole("link", { name: `Remove this filter ${filter}`, exact: true })
    .click();
  await expect(page.getByLabel("Male", { exact: true })).toBeChecked({
    checked: false,
  });
};
