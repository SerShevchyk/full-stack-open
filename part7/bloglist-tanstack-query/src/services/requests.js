import axios from 'axios'

const baseUrl = '/api/blogs'

export const getBlogs = () =>
  axios
    .get(baseUrl)
    .then(res => {
      return res.data.sort((a, b) => b.likes - a.likes)
    })

export const createBlogRequest = async ({ blog, token }) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  const result = await axios.post(baseUrl, blog, config)

  return result.data
}

export const updateBlogRequest = async ({ blog, token }) => {
  const config = {
    headers: { Authorization: `Bearer ${token}`  },
  }

  const result = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return result.data
}

export const deleteBlogRequest = async ({ blog, token }) => {
  const config = {
    headers: { Authorization: `Bearer ${token}`  },
  }

  const result = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return result.data
}
