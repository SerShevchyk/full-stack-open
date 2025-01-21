import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Button from './Button'
import PropTypes from 'prop-types'
import { updateBlogRequest, deleteBlogRequest } from '../services/requests'

const TogglebleBlogTeaser = ({ blog, user }) => {
  const queryClient = useQueryClient()
  const [viewFullBlog, setViewFullBlog] = useState(false)

  const updateBlogMutation = useMutation({
    mutationFn: updateBlogRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: deleteBlogRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const handleViewFullBlogInfo = (e) => {
    setViewFullBlog(!viewFullBlog)
  }

  const handleBlogLike = async (e) => {
    updateBlogMutation.mutate({ blog: { ...blog, likes: blog.likes + 1 } , token: user.token })
  }

  const handleDeleteBlog = async (e) => {
    if (window.confirm(`Do you really want to remove blog '${blog.title}' ?`)) {
      deleteBlogMutation.mutate({ blog, token: user.token })
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
          <Link to={`/blogs/${blog.id}`} style={{ padding: 10, marginTop: 10, marginBottom: 10, display: 'block' }}>View full blog</Link>
        </div>
      }
    </div>
  )
}

TogglebleBlogTeaser.propTypes = {
  blog: PropTypes.object.isRequired
}

export default TogglebleBlogTeaser