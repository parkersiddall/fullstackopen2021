const filterAtStart = ''

export const setFilter = (filter) => {
    return {
      type: 'SET_FILTER',
      filter,
    }
}

const filterReducer = (state = filterAtStart, action) => {

    switch (action.type) {
        case 'SET_FILTER':
            return action.filter

        default:
            return state
    }
}
  
export default filterReducer