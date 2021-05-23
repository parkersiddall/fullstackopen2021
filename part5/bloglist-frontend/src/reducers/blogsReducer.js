import blogsService from '../services/blogs'
import { createNotification } from './notificationReducer'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs,
    })
  }
}

export const addBlog = (blog, user) => {
  return async dispatch => {
    try {
      // eslint-disable-next-line no-unused-vars
      const addedBlog = await blogsService.addPost(blog)
      dispatch(createNotification(
        {
          message: 'Blog added successfully!',
          style: 'successMessage'
        },
        5000)
      )

      addedBlog.user = user
      console.log('ADDING BLOG', addedBlog)
      dispatch({
        type: 'ADD',
        data: blog,
      })
    } catch (exception) {
      dispatch(createNotification(
        {
          message: `Error adding blog! ${exception}`,
          style: 'errorMessage'
        },
        5000
      ))
    }
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    try {
      // eslint-disable-next-line no-unused-vars
      const deletedBlog = await blogsService.deleteBlog(blog)
      console.log('blog deleted!')
      // props.setBlogs(props.blogs.filter(blogItem => blogItem.url !== blog.url && blogItem.title !== blog.title))
      dispatch({
        type: 'DELETE',
        data: blog
      })
    } catch (exception) {
      console.log(exception)
    }
  }
}

const blogsReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT':
    return action.data

  case 'ADD':
    return state.concat(action.data)

  case 'DELETE':
    return state.filter(blogItem => blogItem.url !== action.data.url && blogItem.title !== action.data.title)

  default:
    return state
  }
}

export default blogsReducer