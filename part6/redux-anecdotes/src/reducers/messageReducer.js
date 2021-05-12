const messageAtStart = null

export const createMessage = (message, timeout) => {
    return async dispatch => {
        dispatch({
            type: 'SET_MESSAGE',
            message
        })

        setTimeout(() => {
            dispatch({
                type: 'SET_MESSAGE', 
                message: null
            }) 
        }, timeout)
    }
  }

const messageReducer = (state = messageAtStart, action) => {
    switch (action.type) {
        case 'SET_MESSAGE':
            return action.message

        default:
            return state
    }
}
  
export default messageReducer