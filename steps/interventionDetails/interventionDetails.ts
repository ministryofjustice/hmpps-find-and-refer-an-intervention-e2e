import {expect, Page} from "@playwright/test";

export const verifyCorrectInterventionsDetailPage = async (page: Page, interventionName: string) => {
    await expect(page.getByTestId('intervention-name')).toHaveText(`${interventionName}`);
}
