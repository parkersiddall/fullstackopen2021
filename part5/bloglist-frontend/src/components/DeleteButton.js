import React from 'react'
import blogService from '../services/blogs'

const DeleteButton = (props) => {

    const currentUser = props.current
    const blogPoster = props.blog.user.username
    const blog = props.blog

    const handleDelete = async () => {

        console.log('deleting... ', blog.title)

        const confirm = window.confirm(`Are you sure you want to delete ${blog.title}`)
    
        if (confirm == true) {
            try {
                const deletedBlog = await blogService.deleteBlog(blog)
                console.log('blog deleted!')
              } catch (exception) {
                  console.log(exception)
                }
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