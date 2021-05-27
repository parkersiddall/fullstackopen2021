import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserPage = () => {
  const users = useSelector(state => state.users)
  const id = useParams().id
  const user = users.find(n => n.id === id)

  return(
    <div>
      <h3>{user.username}</h3>
      <h5>Added Blogs:</h5>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

export default UserPage