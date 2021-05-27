import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  // init users, save them in redux state
  const users = useSelector(state => state.users)
  console.log(users)

  return(
    <div>
      <table>
        <tr>
          <th>Username</th>
          <th>Blogs Created</th>
        </tr>
        {users.map(user =>
          <tr key={user.id}>
            <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
            <td>{user.blogs.length}</td>
          </tr>
        )}
      </table>

    </div>

  )
  // users are successfully pulled and saved to state
  // TODO: get them to show up on the list
}

export default Users