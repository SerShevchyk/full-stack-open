import axios from 'axios'

const getBlogComments = async (id) => {
  const result = await axios.get(`/api/blogs/${id}/comments`)
  return result.data
}

const createComment = async comment => {
  const result = await axios.post(`/api/blogs/${comment.blog}/comments`, comment)
  return result.data
}

export {
  getBlogComments,
  createComment
}