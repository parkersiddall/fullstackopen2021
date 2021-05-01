import React from 'react'

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
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
            onChange={handleUsernameChange}
          />
        </div>
        <div>
                password
          <input
            id='password'
            type='password'
            value={password}
            name='password'
            onChange = {handlePasswordChange}
          />
        </div>
        <button id='login-button' type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm