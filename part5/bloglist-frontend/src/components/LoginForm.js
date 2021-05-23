import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'

const LoginForm = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      //setUser(user)
      dispatch({
        type: 'SET_USER',
        data: user
      })
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

  return(
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
                username
          <input
            id='username'
            type='text'
            value={username}
            name='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
                password
          <input
            id='password'
            type='password'
            value={password}
            name='password'
            onChange = {({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm