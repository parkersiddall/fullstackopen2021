import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const Navbar = () => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const padding = {
    padding: 5
  }

  const handleLogout = () => {
    console.log('You are now logged out.')
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({
      type: 'SET_USER',
      data: null
    })
  }

  return(
    <div>
      <Link style={padding} to='/'>Home</Link>
      <Link style={padding} to='/users'>Users</Link>
      <b>
          You are logged in as {user.username}
      </b>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Navbar