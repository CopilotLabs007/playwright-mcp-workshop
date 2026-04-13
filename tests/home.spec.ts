import { expect, test } from '@playwright/test';

test.describe('home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.clear();
    });

    await page.goto('/');
  });

  test('loads the home page with the correct title and heading', async ({ page }) => {
    await expect(page).toHaveTitle(/Kids Learning App - Home/i);
    await expect(page.getByRole('heading', { name: 'Welcome to Kids Learning World!' })).toBeVisible();
  });

  test('displays all primary navigation links', async ({ page }) => {
    const nav = page.getByRole('navigation', { name: 'Primary navigation' });

    for (const name of ['Home', 'Alphabet', 'Numbers', 'Colors', 'Shapes', 'Animals', 'Playground', 'Quiz']) {
      await expect(nav.getByRole('link', { name })).toBeVisible();
    }
  });

  test('topic search filters topic cards by name', async ({ page }) => {
    await page.getByTestId('topic-search').fill('colors');

    await expect(page.locator('[data-topic-name="colors"]')).toBeVisible();
    await expect(page.locator('[data-topic-name="alphabet"]')).toBeHidden();
    await expect(page.locator('[data-topic-name="numbers"]')).toBeHidden();
  });

  test('topic search filters topic cards by keyword', async ({ page }) => {
    await page.getByTestId('topic-search').fill('phonics');

    await expect(page.locator('[data-topic-name="alphabet"]')).toBeVisible();
    await expect(page.locator('[data-topic-name="colors"]')).toBeHidden();
  });

  test('topic search shows the empty state when no card matches', async ({ page }) => {
    await page.getByTestId('topic-search').fill('zzznomatch');

    await expect(page.locator('#topic-empty-state')).toBeVisible();
  });

  test('clearing the search restores all topic cards', async ({ page }) => {
    await page.getByTestId('topic-search').fill('colors');
    await page.getByTestId('topic-search').clear();

    await expect(page.locator('[data-topic-name="alphabet"]')).toBeVisible();
    await expect(page.locator('[data-topic-name="colors"]')).toBeVisible();
    await expect(page.locator('#topic-empty-state')).toBeHidden();
  });

  test('saves a topic as a favourite and updates the count', async ({ page }) => {
    await expect(page.getByTestId('favorite-count')).toHaveText('0');

    await page.getByTestId('favorite-alphabet').click();

    await expect(page.getByTestId('favorite-count')).toHaveText('1');
    await expect(page.getByTestId('favorite-alphabet')).toHaveText('Saved');
  });

  test('unsaves a topic and decrements the favourite count', async ({ page }) => {
    await page.getByTestId('favorite-alphabet').click();
    await expect(page.getByTestId('favorite-count')).toHaveText('1');

    await page.getByTestId('favorite-alphabet').click();

    await expect(page.getByTestId('favorite-count')).toHaveText('0');
    await expect(page.getByTestId('favorite-alphabet')).toHaveText('Save Topic');
  });

  test('saving multiple topics increments the count for each', async ({ page }) => {
    await page.getByTestId('favorite-alphabet').click();
    await page.getByTestId('favorite-numbers').click();
    await page.getByTestId('favorite-colors').click();

    await expect(page.getByTestId('favorite-count')).toHaveText('3');
  });

  test('toggles the theme between sunny and sky', async ({ page }) => {
    const toggle = page.getByTestId('theme-toggle');

    await expect(toggle).toHaveText('Switch to Sky Theme');
    await toggle.click();
    await expect(toggle).toHaveText('Switch to Sunny Theme');
    await toggle.click();
    await expect(toggle).toHaveText('Switch to Sky Theme');
  });
});

test.describe('visited pages counter', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to home with a clean localStorage via evaluate (not addInitScript)
    // so that subsequent navigations within the test do not have localStorage wiped.
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('increments after navigating to a topic page', async ({ page }) => {
    await expect(page.getByTestId('visited-count')).toHaveText('0');

    await page.goto('/alphabet');
    await page.goto('/');

    await expect(page.getByTestId('visited-count')).toHaveText('1');
  });

  test('counts unique pages only', async ({ page }) => {
    await page.goto('/alphabet');
    await page.goto('/numbers');
    await page.goto('/alphabet');
    await page.goto('/');

    await expect(page.getByTestId('visited-count')).toHaveText('2');
  });
});
