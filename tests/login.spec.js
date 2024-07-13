import { test, expect } from 'playwright/test'

test('User login suuccessful', async ({ page }) => {
    await page.goto('http://localhost:3000/#/login')
    // wait for navigation
    await page.waitForURL()


    //fill in the login form
    await page.fill('input[name=email]', 'trial1@gmail.com')
    await page.fill('input[name=username]', 'trial1')
    await page.fill('input[name=password]', 'trial1')

    //submit the form
    await page.click('button[type=submit]')


    //Assert user is redirected
    const url = page.url()
    expect(url).toBe('http://localhost:3000/#/login')
})