const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {

        await request.post('http://localhost:3001/api/testing/reset')
        await request.post('http://localhost:3001/api/users', {
            data: {
                name: 'root',
                username: 'rootuser',
                password: 'root'
            }
        })
        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {
        const locator = page.getByText('Log In')
        await expect(locator).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await page.getByLabel('username').fill('rootuser')
            await page.getByLabel('password').fill('root')
            await page.getByRole('button', { name: 'login' }).click()

            await expect(page.getByText('root logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await page.getByLabel('username').fill('rootuser')
            await page.getByLabel('password').fill('wrong')
            await page.getByRole('button', { name: 'login' }).click()

            await expect(page.getByText('wrong credentials')).toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await page.getByLabel('username').fill('rootuser')
            await page.getByLabel('password').fill('root')
            await page.getByRole('button', { name: 'login' }).click()
        })

        test('a new blog can be created', async ({ page }) => {
            await page.getByRole('button', { name: 'Create New Blog' }).click()
            await page.getByLabel('Title').fill('test blog')
            await page.getByLabel('Author').fill('John Doe')
            await page.getByLabel('URL').fill('example.com')
            await page.getByRole('button', { name: 'Add' }).click()

            await expect(page.locator('div.title.and.author.div').getByText('test blog')).toBeVisible()
        })
    })

    describe('When logged in and blog is created', () => {
        beforeEach(async ({ page }) => {
            //login
            await page.getByLabel('username').fill('rootuser')
            await page.getByLabel('password').fill('root')
            await page.getByRole('button', { name: 'login' }).click()

            //create a blog
            await page.getByRole('button', { name: 'Create New Blog' }).click()
            await page.getByLabel('Title').fill('test blog')
            await page.getByLabel('Author').fill('John Doe')
            await page.getByLabel('URL').fill('example.com')
            await page.getByRole('button', { name: 'Add' }).click()

        })

        test('blog can be liked', async ({ page }) => {
            await page.getByRole('button', { name: 'view' }).click()

            const likesLocator = page.getByTestId('likes')
            const likesBefore = parseInt(await likesLocator.textContent())

            await page.getByRole('button', { name: 'like' }).click()

            await expect(likesLocator).toHaveText(`${likesBefore + 1}`)
        })
    })

})