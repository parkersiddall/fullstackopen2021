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
  const request = axios.post(baseUrl, newBlog, config)
  return request.data
}

const addLike = async blog => {
  console.log(blog)
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(baseUrl + `/${blog.id}`, config)
  return request.data
}

const deleteBlog = async blog => {

  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(baseUrl + `/${blog.id}`, config)
  return request.data
}

export default { getAll, setToken, addPost, addLike, deleteBlog }