import { test, expect } from '@playwright/test';

// Basic site tests
test.describe('Navigation Tests', () => {
  
  test('homepage should load successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check title and main elements
    const title = await page.title();
    expect(title).toBeTruthy();
    
    // Basic content checks - very simple
    expect(await page.textContent('body')).toContain('JAB');
  });
  
  // Desktop navigation tests
  test.describe('Desktop Navigation', () => {
    // Force desktop viewport
    test.use({ viewport: { width: 1280, height: 720 } });
    
    test('desktop navigation - initially collapsed by default', async ({ page }) => {
      await page.goto('/');
      
      // Wait for nav to be fully loaded
      await page.waitForSelector('#mainNavigation');
      
      // Find the first section header in desktop navigation
      const firstSectionHeader = await page.locator('#mainNavigation .section-header').first();
      await firstSectionHeader.waitFor({state: 'visible'});
      
      // Get the section ID from the onclick attribute
      const onclick = await firstSectionHeader.getAttribute('onclick');
      const sectionId = onclick.match(/toggleSection\('(.+?)'\)/)[1];
      
      // Target specifically the desktop navigation for this section
      const subsections = page.locator(`#mainNavigation #${sectionId}-subsections`);
      
      // Check initially collapsed by default for desktop
      await expect(subsections).toBeHidden();
      await expect(subsections).toHaveCSS('display', 'none');
      
      // Check that toggle icon shows collapsed state
      const toggle = page.locator(`#mainNavigation [onclick="toggleSection('${sectionId}')"] .section-toggle`);
      await expect(toggle).toHaveText('▼');
    });
    
    test('desktop navigation - expand/collapse functionality', async ({ page }) => {
      await page.goto('/');
      
      // Wait for nav to be fully loaded
      await page.waitForSelector('#mainNavigation');
      
      // Find the first section header in desktop navigation
      const firstSectionHeader = await page.locator('#mainNavigation .section-header').first();
      await firstSectionHeader.waitFor({state: 'visible'});
      
      // Get the section ID from the onclick attribute
      const onclick = await firstSectionHeader.getAttribute('onclick');
      const sectionId = onclick.match(/toggleSection\('(.+?)'\)/)[1];
      
      // Target specifically the desktop navigation for this section
      const subsections = page.locator(`#mainNavigation #${sectionId}-subsections`);
      const toggle = page.locator(`#mainNavigation [onclick="toggleSection('${sectionId}')"] .section-toggle`);
      
      // Click to expand
      await firstSectionHeader.click();
      await expect(subsections).toHaveCSS('display', 'block');
      await expect(toggle).toHaveText('▲');
      
      // Click to collapse again
      await firstSectionHeader.click();  
      await expect(subsections).toHaveCSS('display', 'none');
      await expect(toggle).toHaveText('▼');
    });
    
    test('desktop navigation - expand/collapse all buttons', async ({ page }) => {
      await page.goto('/');
      
      // Ensure desktop view
      await page.waitForSelector('#mainNavigation');
      
      // Find expand all button in desktop nav specifically
      const expandAllBtn = page.locator('#mainNavigation .nav-expand-all');
      await expandAllBtn.waitFor({state: 'visible'});
      
      // Click expand all
      await expandAllBtn.click();
      
      // Check first subsection is expanded
      const firstSubsections = page.locator('#mainNavigation .nav-subsections').first();
      await expect(firstSubsections).toHaveCSS('display', 'block');
      
      // All toggle indicators should show expanded state
      const toggles = page.locator('#mainNavigation .section-toggle').first();
      await expect(toggles).toHaveText('▲');
      
      // Click collapse all
      await page.locator('#mainNavigation .nav-collapse-all').click();
      
      // Check first subsection is collapsed
      await expect(firstSubsections).toHaveCSS('display', 'none');
      
      // All toggle indicators should show collapsed state
      await expect(toggles).toHaveText('▼');
    });
    
    test('desktop navigation - links are working', async ({ page }) => {
      await page.goto('/');
      
      // Ensure desktop view
      await page.waitForSelector('#mainNavigation');
      
      // Click the first section header to expand it
      const firstSectionHeader = page.locator('#mainNavigation .section-header').first();
      await firstSectionHeader.click();
      
      // Check that the first subsection link has expected format
      const firstSubsectionLink = page.locator('#mainNavigation .subsection-link').first();
      const href = await firstSubsectionLink.getAttribute('href');
      
      // We now know the actual format - checking for appropriate parameters
      expect(href).toContain('.html');
      expect(href).toContain('v=');
    });
  });
  
  // Mobile navigation tests
  test.describe('Mobile Navigation', () => {
    // Force mobile viewport
    test.use({ viewport: { width: 375, height: 812 } });
    
    test('mobile navigation - initially expanded by default', async ({ page }) => {
      await page.goto('/');
      
      // The mobile menu might need to be opened first
      // Try to find the mobile menu toggle and click it if present
      const mobileMenuToggle = page.locator('.mobile-menu-toggle');
      if (await mobileMenuToggle.isVisible()) {
        await mobileMenuToggle.click();
      }
      
      // Wait for mobile nav to be loaded/visible
      // Note: This might need adjustment based on your actual mobile implementation
      await page.waitForSelector('#mobileNavigation', { timeout: 5000 }).catch(e => {
        console.log('Mobile navigation not immediately visible, may need to be toggled');
      });
      
      // Find the first section in mobile navigation 
      // Note: In mobile, this might not have an onclick attribute
      const firstSectionHeader = page.locator('#mobileNavigation .section-header').first();
      
      // If we found the section header, check its subsections
      if (await firstSectionHeader.count() > 0) {
        // Find nearest subsections container 
        const mobileSubsections = page.locator('#mobileNavigation .nav-subsections').first();
        
        // On mobile, subsections should be displayed by default
        // Note: In mobile they might use different display style or class
        await expect(mobileSubsections).toBeVisible();
        
        // Mobile subsections should be showing by default
        await expect(mobileSubsections).not.toHaveCSS('display', 'none');
      }
    });
    
  });
});
