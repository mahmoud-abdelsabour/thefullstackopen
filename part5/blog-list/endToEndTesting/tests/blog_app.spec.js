const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {

        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'root',
                username: 'rootuser',
                password: 'root'
            }
        })

        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        const locator = page.getByText('Log In')
        await expect(locator).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'rootuser', 'root')
            await expect(page.getByText('root logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'rootuser', 'wrong')

            await expect(page.getByText('wrong credentials')).toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'rootuser', 'root')

        })

        test('a new blog can be created', async ({ page }) => {
            await createBlog(page, 'test blog', 'John Doe', 'example.com')
            await expect(page.locator('div.title.and.author.div').getByText('test blog')).toBeVisible()
        })
    })

    describe('When logged in and blog is created', () => {
        beforeEach(async ({ page }) => {
            //login
            await loginWith(page, 'rootuser', 'root')

            //create a blog
            await createBlog(page, 'test blog', 'John Doe', 'example.com')
        })

        test('blog can be liked', async ({ page }) => {
            await page.getByRole('button', { name: 'view' }).click()

            const likesLocator = page.getByTestId('likes')
            const likesBefore = parseInt(await likesLocator.textContent())

            await page.getByRole('button', { name: 'like' }).click()

            await expect(likesLocator).toHaveText(`${likesBefore + 1}`)
        })

        test('a blog can be deleted by its creator', async ({ page }) => {
            await page.getByRole('button', { name: 'view' }).click()

            page.on('dialog', async (dialog) => {
                expect(dialog.message()).toBe('Delete test blog by John Doe ?!')
                await dialog.accept()
            })

            await page.getByRole('button', { name: 'delete' }).click()

            await expect(page.getByText('test blog')).toHaveCount(0)

        })

        test('only the user who created the blog can see the delete button', async ({ page, request }) => {
            await request.post('/api/users', {
                data: {
                    name: 'admin',
                    username: 'adminuser',
                    password: 'admin'
                }

            })

            await page.getByRole('button', { name: 'Logout' }).click()

            await loginWith(page, 'adminuser', 'admin')
            await page.getByRole('button', { name: 'view' }).click()

            await expect(
            page.getByRole('button', { name: 'delete' })
            ).toBeHidden()



        })
    })

})