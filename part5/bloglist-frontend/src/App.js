import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Toggle from './components/Toggle'

//new imports
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'

const App = () => {
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
        <LoginForm setUser={setUser}/>
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
        />
      )}
    </div>

  )
}

export default App