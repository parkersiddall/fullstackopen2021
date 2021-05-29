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

export const addLike = (blog) => {
  return async dispatch => {
    const adjustment = {
      likes: blog.likes + 1,
      author: blog.author,
      url: blog.url,
      title: blog.title,
      user: blog.user,
      id: blog.id,
      comments: blog.comments
    }

    try {
      // eslint-disable-next-line no-unused-vars
      const like = await blogsService.addLike(adjustment)
      console.log('like added!')
      // setLikes(blog.likes + 1)
      dispatch({
        type: 'ADD_LIKE',
        data: adjustment
      })
    } catch (exception) {
      console.log(exception)
    }
  }
}

export const addComment = (comment, blogId) => {
  return async dispatch => {
    console.log(comment, blogId)
    // use blogsService to send comment to backend
    const commentDict = {
      'comment': comment
    }
    const commentAdded = await blogsService.addComment(commentDict, blogId)
    console.log(commentAdded)
    dispatch({
      type: 'ADD_COMMENT',
      data: commentAdded
    })
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

  case 'ADD_LIKE':

    // pull out the old blog
    // eslint-disable-next-line no-case-declarations
    const filtered = state.filter(blogItem => blogItem.url !== action.data.url && blogItem.title !== action.data.title)

    return filtered.concat(action.data)

  case 'ADD_COMMENT':

    // find the blog in the state
    var blogToModify = state.find(blog => blog.id === action.data.blog)
    console.log(blogToModify)

    // add the new comment to the blogs comments list
    blogToModify.comments = blogToModify.comments.concat(action.data)
    console.log(blogToModify)

    // filter the state to remove the old blog, then add in its place the modification
    return state.filter(blog => blog.id !== action.data.blog).concat(blogToModify)

  default:
    return state
  }
}

export default blogsReducer