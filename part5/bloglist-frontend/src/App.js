import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Toggle from './components/Toggle'

//new imports
import { useDispatch, useSelector } from 'react-redux'
import { createNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogsReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  // see if this can be moved into the init action...
  const blogsSorted = blogs.sort((a, b) => {
    return b.likes - a.likes
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(createNotification(
        {
          message: 'Login failed.',
          style: 'errorMessage'
        },
        5000)
      )
    }
  }

  const handleLogout = () => {
    console.log('You are now logged out.')
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <Notification/>
        <h2>blogs</h2>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <Notification/>
      <h2>blogs</h2>
      <b>
          You are logged in as {user.username}
      </b>
      <Toggle buttonLabel='add blog'>
        <NewBlogForm
          user={user}
        />
      </Toggle>
      <button onClick={handleLogout}>Logout</button>
      {blogsSorted.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user.username}
          blogs={blogs}/>
      )}
    </div>

  )
}

export default App