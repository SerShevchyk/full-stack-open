import { createSlice, current } from "@reduxjs/toolkit"
import blogService from '../services/blogs'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    createBlog(state, action) {
      return state.concat(action.payload)
    },
    updateBlog(state, action) {
      const updatedBlogs =  state.map((blog) => blog.id === action.payload.id ? action.payload : blog)
      return updatedBlogs.sort((a, b) => b.likes - a.likes)
    },
    deleteBlog(state, action) {
      console.log(current(state))
      console.log(action.payload)
      
      return state.filter((blog) => blog.id !== action.payload.id)
    }
  }
})

export const { setBlogs, createBlog, updateBlog, deleteBlog } = blogsSlice.actions
export default blogsSlice.reducer

export const initializeBlogs = () => {
  return async dispatch => {
    let result = await blogService.getAll()
    var sortedResults = result.sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(sortedResults))
  }
}