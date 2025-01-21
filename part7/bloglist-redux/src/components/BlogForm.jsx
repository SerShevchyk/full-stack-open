import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: '',
    likes: 0
  })

  const handleBlogFormFieldsChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value })
  }

  const handleBlogFormSubmit = async (e) => {
    e.preventDefault()

    createBlog(blog)
    setBlog({
      title: '',
      author: '',
      url: '',
      likes: 0
    })
  }

  return (
    <div className="blog-form__container">
      <h3>Add new blog</h3>
      <form onSubmit={handleBlogFormSubmit}>
        <div>
          Title: <input name="title" value={blog.title} placeholder="title" onChange={handleBlogFormFieldsChange}/>
        </div>
        <div>
          Author: <input name="author" value={blog.author} placeholder="author" onChange={handleBlogFormFieldsChange}/>
        </div>
        <div>
          Url: <input name="url" value={blog.url} placeholder="url" onChange={handleBlogFormFieldsChange} />
        </div>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm