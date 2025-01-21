import React, { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import UserContext from '../context/UserContext'
import TogglebleBlogTeaser from '../components/TogglebleBlogTeaser'
import BlogsContext from '../context/BlogsContext'

const Blogs = () => {
  const [user] = useContext(UserContext)
  const [blogs] = useContext(BlogsContext)

  return (
    <div>
      <div className="blogs">
        <h2 className='block text-xl font-medium text-gray-700'>Blogs</h2>
        {blogs?.map(blog => {
          return <TogglebleBlogTeaser key={blog.id} blog={blog} user={user}/>
        })}
      </div>
    </div>
  )
}

export default Blogs