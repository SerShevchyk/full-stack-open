import axios from 'axios'
const baseUrl = "/api/persons"

const getAll = () => {
  const request = axios.get(`${baseUrl}`)
  return request.then(response => response.data)
}

const createContact = newContact => {
  const request = axios.post(`${baseUrl}`, newContact)
  return request.then(response => response.data)
}

const deleteContact = id => {
  let url = `${baseUrl}/${id}`
  const request = axios.delete(url)
  return request.then(response => response.data)
}

const updateContact = (id, newContact) => {
  const request = axios.put(`${baseUrl}/${id}`, newContact)
  return request.then(response => response.data)
}

export default { 
  getAll,
  createContact,
  deleteContact,
  updateContact
}