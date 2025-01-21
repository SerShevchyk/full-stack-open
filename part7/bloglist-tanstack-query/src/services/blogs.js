import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const result = await axios.get(baseUrl)
  return result.data
}

export const getBlogs = () =>
  axios
    .get(baseUrl)
    .then(res => {
      // return res.data.sort((a, b) => b.likes - a.likes)
      return res.data
    })

const createBlog = async blog => {
  const config = {
    headers: { Authorization: token },
  }

  const result = await axios.post(`${baseUrl}`, blog, config)
  return result.data
}

const updateBlog = async blog => {

  const config = {
    headers: { Authorization: token },
  }

  const result = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return result.data
}

const deleteBlog = async blog => {
  const config = {
    headers: { Authorization: token },
  }

  const result = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return result.data
}

export default {
  getAll,
  createBlog,
  updateBlog,
  deleteBlog,
  setToken
}