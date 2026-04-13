import { expect, test } from '@playwright/test';
import { PlaygroundPage } from './pages/playground-page';

// These tests verify localStorage persistence across page reloads.
// They use page.evaluate() for initial cleanup rather than addInitScript so
// that subsequent navigations within the test do not have localStorage wiped.

test.beforeEach(async ({ page }) => {
  await page.goto('/playground');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('counter value persists after a page reload', async ({ page }) => {
  const playgroundPage = new PlaygroundPage(page);

  await playgroundPage.incrementCounter(5);
  await expect(playgroundPage.counterValue).toHaveText('5');

  await page.reload();
  await expect(playgroundPage.counterValue).toHaveText('5');
});

test('counter resets to zero and the reset persists after a page reload', async ({ page }) => {
  const playgroundPage = new PlaygroundPage(page);

  await playgroundPage.incrementCounter(3);
  await playgroundPage.resetCounter();
  await expect(playgroundPage.counterValue).toHaveText('0');

  await page.reload();
  await expect(playgroundPage.counterValue).toHaveText('0');
});

test('notes persist after a page reload', async ({ page }) => {
  const playgroundPage = new PlaygroundPage(page);

  await playgroundPage.openNotesTab();
  await playgroundPage.addNote('Remember shapes');
  await expect(playgroundPage.noteList).toContainText('Remember shapes');

  await page.reload();
  await playgroundPage.openNotesTab();
  await expect(playgroundPage.noteList).toContainText('Remember shapes');
});

test('removed notes are absent after a page reload', async ({ page }) => {
  const playgroundPage = new PlaygroundPage(page);

  await playgroundPage.openNotesTab();
  await playgroundPage.addNote('Temporary note');
  await playgroundPage.removeFirstNote();
  await expect(playgroundPage.noteList).not.toContainText('Temporary note');

  await page.reload();
  await playgroundPage.openNotesTab();
  await expect(playgroundPage.noteList).not.toContainText('Temporary note');
});
