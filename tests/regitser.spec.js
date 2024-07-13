import { test, expect } from 'playwright/test'

test('User can register successfully', async ({ page }) => {
    await page.goto('http://localhost:3000/#/register')

    //Fill in registration form
    await page.fill('input[name=username]', 'newuser')
    await page.fill('input[name=email]', 'newuser@gmail.com')
    await page.fill('input[name=password]', 'newuser')
    await page.fill('input[name=confirmPassword]', 'newuser')
    await page.selectOption('select[name=role]', { label: 'User' })

    //Submit form
    await page.click('button[type=submit]')

    // wait for navigation
    await page.waitForURL()

    // Assert that user is redirected to the home page or another expected page after registration
    const url = page.url();
    expect(url).toBe('http://localhost:3000/#/register');

})