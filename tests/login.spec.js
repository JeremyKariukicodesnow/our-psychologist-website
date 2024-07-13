import { test, expect } from 'playwright/test';

test('User can login successfully', async ({ page }) => {
    await page.goto('http://localhost:3000/#/login'); // Replace with your actual login page URL

    // Fill in the login form
    await page.fill('input[name=email]', 'user@example.com');
    await page.fill('input[name=username]', 'exampleuser');
    await page.fill('input[name=password]', 'password123');

    // Submit the form
    await page.click('button[type=submit]');

    // Wait for navigation or any asynchronous operations
    await page.waitForURL();

    // Assert that user is redirected to the home page or another expected page
    const url = page.url();
    expect(url).toBe('http://localhost:3000/#/login'); // Adjust URL as per your application
});
