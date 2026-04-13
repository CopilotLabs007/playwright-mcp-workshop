import { expect, test } from '@playwright/test';

test.describe('Alphabet page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/alphabet');
  });

  test('has the correct page title and heading', async ({ page }) => {
    await expect(page).toHaveTitle(/Learn the Alphabet/i);
    await expect(page.getByRole('heading', { name: 'Learn the Alphabet' })).toBeVisible();
  });

  test('displays 26 letter cards', async ({ page }) => {
    await expect(page.locator('.letter-card')).toHaveCount(26);
  });

  test('shows the first letter A with example Apple', async ({ page }) => {
    const firstCard = page.locator('.letter-card').first();

    await expect(firstCard.locator('.letter')).toHaveText('A');
    await expect(firstCard.locator('.example')).toHaveText('Apple');
  });

  test('shows the last letter Z with example Zebra', async ({ page }) => {
    const lastCard = page.locator('.letter-card').last();

    await expect(lastCard.locator('.letter')).toHaveText('Z');
    await expect(lastCard.locator('.example')).toHaveText('Zebra');
  });

  test('displays learning tips', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Learning Tips' })).toBeVisible();
  });
});

test.describe('Numbers page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/numbers');
  });

  test('has the correct page title and heading', async ({ page }) => {
    await expect(page).toHaveTitle(/Learn Numbers/i);
    await expect(page.getByRole('heading', { name: 'Learn Numbers' })).toBeVisible();
  });

  test('displays 20 number cards', async ({ page }) => {
    await expect(page.locator('.number-card')).toHaveCount(20);
  });

  test('shows 1 / One as the first card', async ({ page }) => {
    const firstCard = page.locator('.number-card').first();

    await expect(firstCard.locator('.number')).toHaveText('1');
    await expect(firstCard.locator('.number-word')).toHaveText('One');
  });

  test('shows 20 / Twenty as the last card', async ({ page }) => {
    const lastCard = page.locator('.number-card').last();

    await expect(lastCard.locator('.number')).toHaveText('20');
    await expect(lastCard.locator('.number-word')).toHaveText('Twenty');
  });

  test('displays learning tips', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Learning Tips' })).toBeVisible();
  });
});

test.describe('Colors page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/colors');
  });

  test('has the correct page title and heading', async ({ page }) => {
    await expect(page).toHaveTitle(/Learn Colors/i);
    await expect(page.getByRole('heading', { name: 'Learn Colors' })).toBeVisible();
  });

  test('displays 12 color cards', async ({ page }) => {
    await expect(page.locator('.color-card')).toHaveCount(12);
  });

  test('shows Red as the first color', async ({ page }) => {
    await expect(page.locator('.color-name').first()).toHaveText('Red');
  });

  test('shows Gold as the last color', async ({ page }) => {
    await expect(page.locator('.color-name').last()).toHaveText('Gold');
  });

  test('displays learning tips', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Learning Tips' })).toBeVisible();
  });
});

test.describe('Shapes page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/shapes');
  });

  test('has the correct page title and heading', async ({ page }) => {
    await expect(page).toHaveTitle(/Learn Shapes/i);
    await expect(page.getByRole('heading', { name: 'Learn Shapes' })).toBeVisible();
  });

  test('displays 8 shape cards', async ({ page }) => {
    await expect(page.locator('.shape-card')).toHaveCount(8);
  });

  test('shows Circle as the first shape', async ({ page }) => {
    await expect(page.locator('.shape-name').first()).toHaveText('Circle');
  });

  test('shows Heart as the last shape', async ({ page }) => {
    await expect(page.locator('.shape-name').last()).toHaveText('Heart');
  });

  test('displays learning tips', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Learning Tips' })).toBeVisible();
  });
});

test.describe('Animals page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/animals');
  });

  test('has the correct page title and heading', async ({ page }) => {
    await expect(page).toHaveTitle(/Learn Animals/i);
    await expect(page.getByRole('heading', { name: 'Learn Animals' })).toBeVisible();
  });

  test('displays 12 animal cards', async ({ page }) => {
    await expect(page.locator('.animal-card')).toHaveCount(12);
  });

  test('shows Lion with sound Roar as the first animal', async ({ page }) => {
    const firstCard = page.locator('.animal-card').first();

    await expect(firstCard.locator('.animal-name')).toHaveText('Lion');
    await expect(firstCard.locator('.animal-sound')).toHaveText('Roar');
  });

  test('shows Duck with sound Quack as the last animal', async ({ page }) => {
    const lastCard = page.locator('.animal-card').last();

    await expect(lastCard.locator('.animal-name')).toHaveText('Duck');
    await expect(lastCard.locator('.animal-sound')).toHaveText('Quack');
  });

  test('displays learning tips', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Learning Tips' })).toBeVisible();
  });
});
