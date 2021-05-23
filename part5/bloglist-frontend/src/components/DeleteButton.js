import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog } from '../reducers/blogsReducer'

const DeleteButton = (props) => {

  const currentUser = props.current
  const blogPoster = props.blog.user.username
  const blog = props.blog

  const dispatch = useDispatch(state => state.blogs)

  const handleDelete = async () => {

    console.log('deleting... ', blog.title)

    const confirm = window.confirm(`Are you sure you want to delete ${blog.title}`)

    // eslint-disable-next-line eqeqeq
    if (confirm == true) {
      dispatch(deleteBlog(blog))
    }
  }

  const deleteButtonStyle = {
    color: 'red'
  }

  if (currentUser !== blogPoster) {
    return null
  } else if (currentUser === blogPoster) {
    return(
      <div>
        <button onClick={handleDelete} style={deleteButtonStyle}>Delete</button>
      </div>
    )
  }
}

export default DeleteButton