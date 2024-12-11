const { test, expect, beforeEach, describe, afterEach } = require('@playwright/test')
const testHelper = require('./helper')
const { log } = require('console')

const user = testHelper.testUser()
const blogs = testHelper.blogs()

describe('Blog list', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    const testUser = await request.post('/api/users', {
      data: user
    })

    await page.goto('/')
  })

  test('5.17 Login form is shown', async ({ page }) => {
    await expect(page.getByText('Login form')).toBeVisible()
  })

  describe('5.18 Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      testHelper.loginWith(page, expect)
      await expect(page.getByText(`${user.name} is logged in`)).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {      
      await page.getByTestId('username').fill(user.username)
      await page.getByTestId('password').fill('WrongPassword')
      await page.getByRole('button', { name: 'login' }).click()

      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('Wrong credentials')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await testHelper.loginWith(page, expect)
    })
  
    test('5.19 A new blog can be created', async ({ page }) => {
      const blog = blogs[0]
      await testHelper.createNewBlog(page)

      await expect(page.getByText(`New blog "${blog.title}" was added successfully by ${user.name}`)).toBeVisible()
      await expect(page.getByText(`${blog.title} - ${user.name}`)).toBeVisible()
    })

    test('5.20 A new blog can be liked', async ({ page }) => {
      await testHelper.createNewBlog(page)
  
      await page.getByRole('button', { name: 'View' }).click()
      await page.getByRole('button', { name: 'Like' }).click()
      await expect(page.getByText(`Likes: 1`)).toBeVisible()
    })

    test('5.21 A new blog can be deleted', async ({ page }) => {
      const blog = blogs[0]
      await testHelper.createNewBlog(page)
  
      await page.getByRole('button', { name: 'View' }).click()
      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: 'Delete' }).click()
      await expect(page.getByText(`${blog.title} - ${user.name}`)).not.toBeVisible()
    })

    test('5.22 Simple user can\'t see the delete button', async ({ page }) => {
      const blog = blogs[0]
      await testHelper.createNewBlog(page)
  
      await expect(page.getByText(`New blog "${blog.title}" was added successfully by ${user.name}`)).toBeVisible()

      await page.getByRole('button', { name: 'View' }).click()
      await expect(page.getByText(`Delete`)).toBeVisible()

      await page.getByRole('button', { name: 'Logout' }).click()
  
      await expect(page.getByText(`${blog.title} - ${user.name}`)).toBeVisible()
      await expect(page.getByText(`Delete`)).not.toBeVisible()
    })

    test('5.23 Order by likes', async ({ page }) => {
      await expect(page.getByText(`${user.name} is logged in`)).toBeVisible()
      await testHelper.createBlogs(page, expect)

      await expect(page.getByText(`${blogs[0].title} - ${user.name}`)).toBeVisible()
      await expect(page.getByText(`${blogs[1].title} - ${user.name}`)).toBeVisible()
      await expect(page.getByText(`${blogs[2].title} - ${user.name}`)).toBeVisible()
      
      await page.getByRole('button', { name: 'View' }).first().click()
      await page.getByRole('button', { name: 'View' }).first().click()
      await page.getByRole('button', { name: 'View' }).first().click()

      await page.getByRole('button', { name: 'Like' }).first().click({ clickCount: 3, timeout: 1000 })
      await page.getByRole('button', { name: 'Like' }).nth(1).click({ clickCount: 2, timeout: 1000 })
      await page.getByRole('button', { name: 'Like' }).nth(2).click({ clickCount: 1, timeout: 1000 })
  
      const feedHandle = await page.$('.blogs')
      expect(await feedHandle.$$eval('.likes', nodes =>
        nodes.map(n => n.innerText))).toEqual(['Likes: 3', 'Likes: 2', 'Likes: 1'],
      )     
    })
  })

  afterEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    console.log('Done with tests');
  });
})