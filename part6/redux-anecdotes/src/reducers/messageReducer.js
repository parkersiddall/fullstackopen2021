const messageAtStart = null

export const createMessage = (message) => {
    return {
      type: 'SET_MESSAGE',
      message,
    }
  }

export const clearMessage = () => {
    return {
        type: 'SET_MESSAGE', 
        message: null
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