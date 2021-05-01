import React, { useState } from 'react'
import blogService from '../services/blogs'
import DeleteButton from './DeleteButton'

const Blog = (props) => {

  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const [likes, setLikes] = useState(props.blog.likes)

  const blog = props.blog
  console.log(blog)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = async () => {
    // make adjustments

    const adjustment = {
      likes: blog.likes + 1,
      author: blog.author,
      url: blog.url,
      title: blog.title,
      user: blog.user.id,
      id: blog.id
    }

    try {
      // eslint-disable-next-line no-unused-vars
      const like = await blogService.addLike(adjustment)
      console.log('like added!')
      setLikes(blog.likes + 1)
    } catch (exception) {
      console.log(exception)
    }
  }

  return(
    <div className="blog" style={blogStyle}>
      {blog.title} {blog.author}
      <button style={hideWhenVisible} onClick={toggleVisibility}>view</button>
      <button style={showWhenVisible} onClick={toggleVisibility}>hide</button>
      <div style={showWhenVisible} className="toggleContent">
        <div>{blog.url}</div>
        <div>likes: {likes} <button onClick={addLike}>Like</button></div>
        <div>{blog.user.username}</div>
        <DeleteButton
          current={props.user}
          blog={props.blog}
          blogs={props.blogs}
          setBlogs={props.setBlogs}
        />
      </div>
    </div>
  )
}

export default Blog