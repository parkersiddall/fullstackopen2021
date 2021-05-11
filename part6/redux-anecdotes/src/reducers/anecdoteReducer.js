import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const prepareVote = (anecdote) => {
  return async dispatch => {
    const addAVote = await anecdoteService.addVote(anecdote)
    dispatch({
      type: 'vote',
      data: {
        id: anecdote.id
      }
    })
  }
}

export const prepareCreateAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'add',
      data: anecdote,
    })
  }
}

export const prepareFilterAnecdotes = (filter) => {
  const anecdoteFilterDict = {
    type: 'filter',
    filter
  }

  return anecdoteFilterDict 
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'init',
      data: anecdotes,
    })
  }
}

const anecdoteReducer = (state = [], action) => {

  switch(action.type) {
    case "vote":
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = anecdoteToChange // removing the following because it causes two votes to be cast, only one vote persisted
/*       const changedAnecdote = {
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1
      } */

      return state.map(anecdote => 
          anecdote.id !== id ? anecdote : changedAnecdote
        )
    
    case "add":
      const anecdoteObject = asObject(action.data.content)

      return state.concat(anecdoteObject)

    case "filter":
        const filterString = action.filter
        console.log("filter case in anecdote reducer", filterString)
        return state

    case "init":
      return action.data
  }
  return state
}

export default anecdoteReducer