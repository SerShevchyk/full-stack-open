import axios from 'axios'
const baseUrl = "http://localhost:3001"

const getAll = () => {
  const request = axios.get(`${baseUrl}/persons`)
  return request.then(response => response.data)
}

const createContact = newContact => {
  const request = axios.post(`${baseUrl}/persons`, newContact)
  return request.then(response => response.data)
}

const deleteContact = id => {
  let url = `${baseUrl}/persons/${id}`
  const request = axios.delete(url)
  return request.then(response => response.data)
}

const updateContact = (id, newContact) => {
  const request = axios.put(`${baseUrl}/persons/${id}`, newContact)
  return request.then(response => response.data)
}

export default { 
  getAll,
  createContact,
  deleteContact,
  updateContact
}