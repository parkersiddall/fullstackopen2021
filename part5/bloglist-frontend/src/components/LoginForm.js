import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import Notification from './Notification'

// Material UI
import {
  Container,
  TextField,
  Button,
  Box,
  Typography
} from '@material-ui/core'
import useStyles from '../styles'

const LoginForm = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const classes = useStyles()

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
      <Container align={'center'}>
        <Notification/>
        <Typography variant={'h1'}>
          Blogs
        </Typography>
        <Container className={classes.loginForm}>
          <Typography variant={'h5'}>
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <div>
              <TextField
                label={'Username'}
                id={'username'}
                type={'text'}
                value={username}
                name={'username'}
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              <TextField
                label={'Password'}
                id={'password'}
                type={'password'}
                value={password}
                name={'password'}
                onChange = {({ target }) => setPassword(target.value)}
              />
            </div>
            <Box mt={3}>
              <Button id='login-button' variant="contained" color="primary" type="submit">
                Login
              </Button>
            </Box>
          </form>
        </Container>
      </Container>
    </div>
  )
}

export default LoginForm