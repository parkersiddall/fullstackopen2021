import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Toggle from './components/Toggle'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notif, setNotif] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

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
    console.log('Logging in with', username, password)

    try {
    const user = await loginService.login({username, password})
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    ) 
    blogService.setToken(user.token)
    setUser(user)
    setUsername('')
    setPassword('')
    } catch (exception) {
      setNotif(
        {
          message: 'Login failed.',
          style: 'errorMessage'
        })
      setTimeout(() => {
        setNotif(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    console.log('You are now logged out.')
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleNewPost = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title, 
      author: author, 
      url: url
    }

    try {
      const user = await blogService.addPost(newBlog)
      setTitle('')
      setAuthor('')
      setUrl('')
      setNotif(
        {
          message: 'Blog added successfully!',
          style: 'successMessage'
        })
      setTimeout(() => {
        setNotif(null)
      }, 5000)
      } catch (exception) {
        setNotif(
          {
            message: `Error adding blog! ${exception}`,
            style: 'errorMessage'
          })
        setTimeout(() => {
          setNotif(null)
        }, 5000)
      }
  }
                        

  if (user === null) {
    return (
      <div>
        <Notification notification={notif}/>
        <h2>blogs</h2> 
        <Toggle buttonLabel='login'>
          <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({target}) => setUsername(target.value)}
              handlePasswordChange={({target}) => setPassword(target.value)}
              handleLogin={handleLogin}
              title={title}
              author={author}
              url={url}
            />
        </Toggle>
      </div>
    )
  }

  return (
    <div>
      <Notification notification={notif}/>
      <h2>blogs</h2> 
      <b>
          You are logged in as {user.username}
      </b>
      <Toggle buttonLabel='add blog'>
        <NewBlogForm
          handleNewPost={handleNewPost}
          handleTitle={({target}) => setTitle(target.value)}
          handleAuthor={({target}) => setAuthor(target.value)}
          handleUrl={({target}) => setUrl(target.value)}
        />
      </Toggle>
      <button onClick={handleLogout}>Logout</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>

  )
}

export default App