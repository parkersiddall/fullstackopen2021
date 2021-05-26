import React from 'react'
import { useSelector } from 'react-redux'

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
            <td>{user.username}</td>
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