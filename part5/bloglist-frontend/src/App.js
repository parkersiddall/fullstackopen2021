import React, { useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Toggle from './components/Toggle'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUser } from './reducers/userReducer'
import Navbar from './components/Navbar'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Users from './components/Users'
import User from './components/UserPage'
import BlogPage from './components/BlogPage'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeUsers())
  }, [])


  // see if this can be moved into the init action...
  const blogsSorted = blogs.sort((a, b) => {
    return b.likes - a.likes
  })

  const handleLogout = () => {
    console.log('You are now logged out.')
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({
      type: 'SET_USER',
      data: null
    })
  }

  if (user === null) {
    return (
      <div>
        <Notification/>
        <h2>blogs</h2>
        <LoginForm/>
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
      <button onClick={handleLogout}>Logout</button>
      <Router>
        <Navbar/>
        <Switch>
          <Route path='/users/:id'>
            <User />
          </Route>
          <Route path='/blogs/:id'>
            <BlogPage />
          </Route>
          <Route path='/users'>
            <h4>Users</h4>
            <Users/>
          </Route>
          <Route path='/'>
            <h4>Recent Blogs</h4>
            <Toggle buttonLabel='add blog'>
              <NewBlogForm
                user={user}
              />
            </Toggle>
            {blogsSorted.map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                user={user.username}
              />
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App