const notificationAtStart = null
var timeoutID = null

export const createNotification = (notification, timeout) => {
  return async dispatch => {
    clearTimeout(timeoutID)

    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })

    timeoutID = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: null
      })
    }, timeout)
  }
}

const notificationReducer = (state = notificationAtStart, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.notification

  default:
    return state
  }
}

export default notificationReducer