import { test, expect } from '@playwright/test';

/**
 * Very basic tests that should reliably pass in CI
 * More complex tests can be added later as the page structure is better understood
 */
test.describe('Basic Site Tests', () => {
  
  test('homepage should load', async ({ page }) => {
    // Go to homepage
    await page.goto('/');
    
    // Check that we got some content
    const bodyText = await page.textContent('body');
    expect(bodyText.length).toBeGreaterThan(100);
    
    // Check for the JAB title somewhere in the text
    expect(bodyText).toContain('JAB');
  });
  
  test('content page should load', async ({ page }) => {
    // Go directly to a content page (B1.html is known to exist)
    await page.goto('/B1.html');
    
    // Check that we got page content
    const bodyText = await page.textContent('body');
    expect(bodyText.length).toBeGreaterThan(100);
  });
});

// Add mobile viewport test
test.describe('Mobile Viewport Tests', () => {
  test.use({ viewport: { width: 375, height: 812 } });
  
  test('homepage should load on mobile viewport', async ({ page }) => {
    await page.goto('/');
    
    // Check that we got some content
    const bodyText = await page.textContent('body');
    expect(bodyText.length).toBeGreaterThan(100);
  });
});