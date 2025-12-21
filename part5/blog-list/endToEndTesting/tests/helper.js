const { expect } = require('@playwright/test')


const loginWith =  async (page, username, password) => {
    await page.getByLabel('username').fill(username)
    await page.getByLabel('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()

    // ✅ ensure login finished
    password !== 'wrong' ? await expect(page.getByText(`logged in`)).toBeVisible() : ''
}

const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'Create New Blog' }).click()
    await page.getByLabel('Title').fill(title)
    await page.getByLabel('Author').fill(author)
    await page.getByLabel('URL').fill(url)
    await page.getByRole('button', { name: 'Add' }).click()

    await expect(
        page.getByTestId('blog').filter({ hasText: title })
    ).toBeVisible()
}

const likeBlog = async (page, title, times) => {
    const blog = page.getByTestId('blog').filter({ hasText: title })
    await expect(blog).toBeVisible()
    await blog.getByRole('button', { name: 'view' }).click()
    await clickTimes(blog.getByRole('button', { name: 'like' }), times)
}

const clickTimes = async (locator, times) => {
    for(let i=0; i<times; i++){
        await locator.click()
    }
}
export { loginWith, createBlog, likeBlog, clickTimes }