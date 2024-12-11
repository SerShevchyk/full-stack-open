import axios from 'axios'

const baseUrl = 'http://localhost:3001'

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/anecdotes`)
  return response.data
}

const createNewAnecdote = async (content) => {
  const anecdote = { content, votes: 0 }
  const response = await axios.post(`${baseUrl}/anecdotes`, anecdote)
  return response.data
}

const updateAnecdote = async (anecdote) => {
  const response = await axios.put(`${baseUrl}/anecdotes/${anecdote.id}`, anecdote)
  return response.data
}

export default { getAll, createNewAnecdote, updateAnecdote }