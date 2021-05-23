import blogsService from '../services/blogs'

export const initializeUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      // setUser(user)
      dispatch({
        type: 'SET_USER',
        data: user
      })
      blogsService.setToken(user.token)
    }
  }
}

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data

  default:
    return state
  }
}

export default userReducer