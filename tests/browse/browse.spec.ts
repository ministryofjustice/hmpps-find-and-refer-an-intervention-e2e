import { test } from '@playwright/test'
import {findAndReferLogin} from "../../steps/auth/login";

test('Login and view the browse page', async ({ page }) => {
    await findAndReferLogin(page)
})