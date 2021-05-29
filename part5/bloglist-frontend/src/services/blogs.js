import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const addPost = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.post(baseUrl, newBlog, config)
  return request.data
}

const addLike = async blog => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.put(baseUrl + `/${blog.id}`, blog, config)
  return request.data
}

const deleteBlog = async blog => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.delete(baseUrl + `/${blog.id}`, config)
  return request.data
}

const getComments = async blogId => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.get(baseUrl + `/${blogId}/comments`, config)
  return request.data
}

export default { getAll, setToken, addPost, addLike, deleteBlog, getComments }