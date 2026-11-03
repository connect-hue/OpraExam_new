import { test, expect } from '@playwright/test';
import { practiceQuestions } from '../../src/data/practiceQuestions';

test.beforeEach(async ({ page, baseURL }) => {
  // Never submit test leads to the server or send analytics to the real property.
  await page.route('**/*', route => {
    const url = new URL(route.request().url());
    if (url.pathname === '/api/leads') return route.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ success: false, error: 'Test submission failure. Please retry.' }) });
    return url.origin === new URL(baseURL!).origin ? route.continue() : route.abort();
  });
  await page.addInitScript(() => { window.dataLayer = []; });
});

test('public pages hydrate with valid headings, canonicals and mobile layout', async ({ page }, testInfo) => {
  const runtimeErrors: string[] = [];
  page.on('pageerror', error => runtimeErrors.push(error.message));
  for (const path of ['/', '/fees', '/practice', '/editorial-policy', '/authors/editorial-team', '/syllabus', '/blog/opra-pharmacology-toxicology-2027']) {
    await page.goto(path);
    await expect(page.locator('h1')).toHaveCount(1);
    if (path === '/') await expect(page.locator('h1')).toContainText(/\bOPRA Exam\b/);
    expect(new URL((await page.locator('link[rel="canonical"]').getAttribute('href'))!).href).toBe(`https://www.opraexam.in${path}`);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), path).toBeTruthy();
    if (['/', '/fees', '/practice'].includes(path)) await page.screenshot({ path: testInfo.outputPath(`${path === '/' ? 'home' : path.slice(1)}.png`) });
  }
  expect(runtimeErrors).toEqual([]);
});

test('quiz failure stays retryable and successful retry records one lead event', async ({ page }) => {
  await page.goto('/opra-quiz');
  for (let index = 0; index < practiceQuestions.length; index++) {
    await page.getByRole('button', { name: practiceQuestions[index].options[0], exact: true }).click();
    await page.getByRole('button', { name: index < practiceQuestions.length - 1 ? /Next Question/ : /See My Results/ }).click();
  }
  await page.locator('#quiz-name').fill('Browser Test');
  await page.locator('#quiz-email').fill('browser@example.com');
  await page.locator('#quiz-phone').fill('9000000000');
  await page.getByRole('button', { name: /Reveal My Score/ }).click();
  await expect(page.getByText('Test submission failure. Please retry.', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: /Reveal My Score/ })).toBeEnabled();
  await page.route('**/api/leads', route => route.fulfill({ contentType: 'application/json', body: JSON.stringify({ success: true, leadId: 'mock-id' }) }));
  await page.getByRole('button', { name: /Reveal My Score/ }).click();
  await expect(page.getByText('Score by Domain', { exact: true })).toBeVisible();
  const events = await page.evaluate(() => (window.dataLayer || []).map(entry => Array.from(entry as ArrayLike<unknown>)));
  expect(events.filter(event => event[1] === 'quiz_start')).toHaveLength(1);
  expect(events.filter(event => event[1] === 'quiz_complete')).toHaveLength(1);
  expect(events.filter(event => event[1] === 'generate_lead')).toHaveLength(1);
  expect(JSON.stringify(events)).not.toContain('browser@example.com');
});

test('practice-paper gate unlocks only after accepted lead submission', async ({ page }) => {
  await page.goto('/sample-papers#download-pack');
  await page.locator('#name').fill('Browser Test');
  await page.locator('#email').fill('browser@example.com');
  await page.locator('#phone').fill('9000000000');
  await page.locator('#qualification').selectOption('Bachelor of Pharmacy (B.Pharm)');
  await page.getByRole('button', { name: 'GET PRACTICE PAPERS PDF' }).click();
  await expect(page.getByRole('link', { name: 'Download OPRA Sample Paper PDF' })).toHaveCount(0);
  await page.route('**/api/leads', route => route.fulfill({ contentType: 'application/json', body: JSON.stringify({ success: true, isDuplicate: true }) }));
  await page.getByRole('button', { name: 'GET PRACTICE PAPERS PDF' }).click();
  await expect(page.getByRole('link', { name: 'Download OPRA Sample Paper PDF' })).toBeVisible();
});
