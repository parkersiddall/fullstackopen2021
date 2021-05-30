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
import { Switch, Route } from 'react-router-dom'
import Users from './components/Users'
import User from './components/UserPage'
import BlogPage from './components/BlogPage'
import { initializeUsers } from './reducers/usersReducer'

// Material UI
import {
  Container,
  CssBaseline,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Paper
} from '@material-ui/core'

const App = () => {
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeUsers())
  }, [])


  // see if this can be moved into the init action...
  const blogsSorted = blogs.sort((a, b) => {
    return b.likes - a.likes
  })

  if (user === null) {
    return (
      <div>
        <LoginForm/>
      </div>
    )
  }

  return (
    <div>
      <CssBaseline/>
      <Navbar/>
      <Container>
        <Notification/>
        <Switch>
          <Route path='/users/:id'>
            <User />
          </Route>
          <Route path='/blogs/:id'>
            <BlogPage />
          </Route>
          <Route path='/users'>
            <Typography variant="h4" align="center">
              Users
            </Typography>
            <Users/>
          </Route>
          <Route path='/'>
            <Typography variant="h4" align="center">
              Recent Blogs
            </Typography>
            <Toggle buttonLabel='add blog'>
              <NewBlogForm
                user={user}
              />
            </Toggle>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  {blogsSorted.map(blog =>
                    <TableRow key={blog.id} hover={true}>
                      <TableCell align={'left'}>
                        <Blog blog={blog}/>
                      </TableCell>
                      <TableCell>
                        {user.username}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Route>
        </Switch>
      </Container>
    </div>
  )
}

export default App