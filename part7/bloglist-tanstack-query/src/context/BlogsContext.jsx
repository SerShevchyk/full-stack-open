import { createContext, useReducer } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getBlogs } from '../services/blogs'

const blogsReducer = (state, action) => {
  switch (action.type) {
  case 'SET':
    return action.payload.blogs
  }
}

const BlogsContext = createContext()

export const BlogsContextProvider = ({ children }) => {
  const [blogs, blogsDispatch] = useReducer(blogsReducer, [])

  const { data, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs
  })

  return (
    <BlogsContext.Provider value={[data, blogsDispatch] }>
      {children}
    </BlogsContext.Provider>
  )
}

export default BlogsContext