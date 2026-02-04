import { expect, test } from '@playwright/test';

import { waitForReady } from './utils/player';

test.describe('comments', () => {
  test('the comment input should be focused when user presses C key', async ({ page }) => {
    await page.goto('/');
    await waitForReady(page);

    const commentInput = page.locator('textarea').first();
    await expect(commentInput).toBeVisible();

    await page.keyboard.press('c');

    await expect(commentInput).toBeFocused();
  });
});
