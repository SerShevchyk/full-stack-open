import { useState, useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createBlogRequest } from '../services/requests'
import notificationService from '../services/notifications'
import UserContext from '../context/UserContext'
import NotificationContext from '../context/NotificationContext'

const BlogForm = ({ blogFormRef }) => {
  const [user, userDispatch] = useContext(UserContext)
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const addBlogMutation = useMutation({
    mutationFn: createBlogRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
    onError: (error) => {
      console.log('ERROR', error)
    }
  })

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

    addBlogMutation.mutate({ blog, token: user.token })
    blogFormRef.current.toggleVisibility()
    notificationService.showNotification({ message: `New blog "${blog.title}" was added successfully by ${blog.author}`, type: 'success' }, notificationDispatch)

    setBlog({
      title: '',
      author: '',
      url: '',
      likes: 0
    })
  }

  return (
    <div className="blog-form__container">
      <h3 className='block text-sm font-medium text-gray-700'>Add new blog</h3>
      <form onSubmit={handleBlogFormSubmit}>
        <div>
          Title: <input name="title" value={blog.title} placeholder="title" onChange={handleBlogFormFieldsChange} className='mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500'/>
        </div>
        <div>
          Author: <input name="author" value={blog.author} placeholder="author" onChange={handleBlogFormFieldsChange} className='mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500'/>
        </div>
        <div>
          Url: <input name="url" value={blog.url} placeholder="url" onChange={handleBlogFormFieldsChange} className='mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500'/>
        </div>
        <div>
          <button type="submit" className='px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-blue-800'>Create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm