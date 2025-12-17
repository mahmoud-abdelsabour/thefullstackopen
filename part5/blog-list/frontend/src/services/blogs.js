import axios from 'axios'
const baseUrl = '/api/blogs'

let token

const getConfig = () => ({
  headers: { Authorization: token }
})


const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, getConfig())
  return response.data
}

const update = async (id, updatedObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedObject, getConfig())
  return response.data
}

const deleteOne = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig())
  return response.data
}

const Services = { getAll, create, setToken, update, deleteOne }

export default Services