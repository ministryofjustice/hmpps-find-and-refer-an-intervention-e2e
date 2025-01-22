import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Sign in/);
});

test('get started link', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Click the get started link.
  // await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  // await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();

  await page.getByLabel('Username').fill('robert.mercury' as string)
  await page.getByLabel('Password').fill('password123456' as string)
  await page.getByRole('button', { name: 'Sign in' }).click()

  await expect(page).toHaveTitle(/HMPPS Find And Refer An Intervention Ui - Home/);
  // await page.context().storageState({ path: referrerAuthFile })
});
