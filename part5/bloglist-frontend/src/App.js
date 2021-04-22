import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('Logging in with', username, password)

    try {
    const user = await loginService.login({username, password})
    blogService.setToken(user.token)
    setUser(user)
    setUsername('')
    setPassword('')
    } catch (exception) {
      console.log('error logging in')
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>blogs</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
              <input type='text' 
              value={username} 
              name='username' 
              onChange={({target}) => setUsername(target.value)}
              />
          </div>
          <div>
            password
            <input
            type='password'
            value={password}
            name='password'
            onChange = {({target}) => setPassword(target.value)} 
            />
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <b>
        You are logged in as {user.username}
      </b>
    
      {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App