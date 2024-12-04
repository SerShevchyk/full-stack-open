import { useState } from 'react'
import Button from './Button'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlogs, user }) => {
  const [viewFullBlog, setViewFullBlog] = useState(false)

  const handleViewFullBlogInfo = (e) => {
    setViewFullBlog(!viewFullBlog)
  }

  const handleBlogLike = async (e) => {
    let result = await blogService.updateBlog({ ...blog, likes: blog.likes + 1 })
    updateBlogs('add', result)
  }

  const handleDeleteBlog = async (e) => {
    if (window.confirm(`Do you really want to remove blog '${blog.title}' ?`)) {
      let result = await blogService.deleteBlog(blog)
      updateBlogs('delete', blog)
    }
  }

  return (
    <div style={{
      padding: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }} className='blog' >
      <div className="blog-header">
        {blog.title} - {blog.author}
        <Button action={handleViewFullBlogInfo} text={viewFullBlog ? 'Hide' : 'View'}></Button>
      </div>
      {
        viewFullBlog &&
        <div className="blog-content">
          <div>{blog.url}</div>
          <div className='blog__likes'>
            <span className='likes'>Likes: {blog.likes}</span>
            <Button action={handleBlogLike} text="Like"></Button></div>
          {
            user && user.id === blog.user.id && <Button action={handleDeleteBlog} text="Delete"></Button>
          }
        </div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlogs: PropTypes.func.isRequired,
}

export default Blog