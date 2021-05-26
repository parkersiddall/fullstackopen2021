import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const padding = {
    padding: 5
  }

  return(
    <div>
      <Link style={padding} to='/'>Home</Link>
      <Link style={padding} to='/users'>Users</Link>
    </div>
  )
}

export default Navbar