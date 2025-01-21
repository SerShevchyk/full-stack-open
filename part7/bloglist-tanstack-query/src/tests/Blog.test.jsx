import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'

describe('Blogs', () => {
  let container

  const blog = {
    id: '66d311ab0de4b59d83383cdf',
    title: 'Full Stack Open Course',
    author: 'Test',
    url: 'https://fullstackopen.com',
    likes: 0,
    user: {
      id: '66c9c90324b032a92f971c55',
      name: 'Test Author',
      username : 'Test'
    }
  }

  const user = {
    id: '66c9c90324b032a92f971c55',
    name: 'Test Author',
    token: '',
    username: 'Test',
  }

  beforeEach(() => {
    container = render(
      <Blog blog={blog} user={user}></Blog>
    ).container
  })

  test('5.13 Renders title and author', () => {
    const element = screen.getByText(`${blog.title} - ${blog.author}`)
    expect(element).toBeDefined()
    expect(element).not.toHaveTextContent(`${blog.url}`)
    expect(element).not.toHaveTextContent('Likes:')
  })

  test('5.14 After clicking the button, url and likes are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    const content = container.querySelector('.blog-content')
    expect(content).toHaveTextContent(`${blog.url}`)
    expect(content).toHaveTextContent('Likes:')
  })

  test('5.15 After clicking the like button twice received as props is called twice', async () => {
    const mockHandler = vi.fn()

    render(
      <Blog blog={blog} updateBlogs={mockHandler} user={user}></Blog>
    )

    const userEventSetup = userEvent.setup()
    const viewButton = screen.getAllByText('View')

    await userEventSetup.click(viewButton[0])

    const likeButton = screen.getByText('Like')
    await userEventSetup.click(likeButton)
    await userEventSetup.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  test('5.16 Testing the new blog-creating handler', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(
      <BlogForm createBlog={createBlog} ></BlogForm>
    )

    const inputTitle = screen.getByPlaceholderText('title')
    const inputAuthor = screen.getByPlaceholderText('author')
    const inputUrl = screen.getByPlaceholderText('url')
    const submitButton = screen.getByText('Create')

    await user.type(inputTitle, blog.title)
    await user.type(inputAuthor, blog.author)
    await user.type(inputUrl, blog.url)
    await user.click(submitButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe(blog.title)
    expect(createBlog.mock.calls[0][0].author).toBe(blog.author)
    expect(createBlog.mock.calls[0][0].url).toBe(blog.url)
  })
})