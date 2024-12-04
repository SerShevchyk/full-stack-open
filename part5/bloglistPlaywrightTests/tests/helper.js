import { log } from "console"

const testUser = () => {
  return {
    name: 'Test',
    username: 'Test',
    password: 'TestPassword',
    blogs: {}
  }
}

let user = testUser()

const blogs = () => {
  return [
    {
      'title': 'Drupal',
      'author': 'Test',
      'url': 'https://drupal.org',
      'likes': 3
    },
    {
      'title': 'Full Stack Open',
      'author': 'Test',
      'url': 'https://fullstackopen.com',
      'likes': 1
    },
    {
      'title': 'React',
      'author': 'Test',
      'url': 'https://react.dev',
      'likes': 2
    }
  ]
}

const loginWith = async (page, expect)  => {
  await page.getByTestId('username').fill(user.username)
  await page.getByTestId('password').fill(user.password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createNewBlog = async (page)  => {
  const blog = blogs()[0]
  await page.getByRole('button', { name: 'Add new blog' }).click()
  await page.getByPlaceholder('title').fill(blog.title)
  await page.getByPlaceholder('author').fill(blog.author)
  await page.getByPlaceholder('url').fill(blog.url)
  await page.getByRole('button', { name: 'Create' }).click()
}

const createBlogs = async (page)  => {
  const blogsList = await blogs()

  await page.getByRole('button', { name: 'Add new blog' }).click({force: true})
  await page.getByPlaceholder('title').fill(blogsList[0].title)
  await page.getByPlaceholder('author').fill(blogsList[0].author)
  await page.getByPlaceholder('url').fill(blogsList[0].url)
  await page.getByRole('button', { name: 'Create' }).click()

  await page.getByRole('button', { name: 'Add new blog' }).click({force: true})
  await page.getByPlaceholder('title').fill(blogsList[1].title)
  await page.getByPlaceholder('author').fill(blogsList[1].author)
  await page.getByPlaceholder('url').fill(blogsList[1].url)
  await page.getByRole('button', { name: 'Create' }).click()

  await page.getByRole('button', { name: 'Add new blog' }).click({force: true})
  await page.getByPlaceholder('title').fill(blogsList[2].title)
  await page.getByPlaceholder('author').fill(blogsList[2].author)
  await page.getByPlaceholder('url').fill(blogsList[2].url)
  await page.getByRole('button', { name: 'Create' }).click()
}

export {
  testUser,
  blogs,
  loginWith,
  createNewBlog,
  createBlogs
}