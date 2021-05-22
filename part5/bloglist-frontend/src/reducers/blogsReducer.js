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

const blogsReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT':
    return action.data

  case 'ADD':
    return state.concat(action.data)

  default:
    return state
  }
}

export default blogsReducer