const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const prepareVote = (id) => {
  const vote = {
    type: 'vote',
    data: {
      id: id
    }
  }

  return vote
}

export const prepareCreateAnecdote = (content) => {
  const anecdoteDict = {
    type: 'add',
    data: {
      content: content
    }
  }

  return anecdoteDict
}

export const prepareFilterAnecdotes = (filter) => {
  const anecdoteFilterDict = {
    type: 'filter',
    filter
  }

  return anecdoteFilterDict 
}

export const initializeAnecdotes = (anecdotes) => {
  return({
    type: 'init',
    data: anecdotes
  })
}

const anecdoteReducer = (state = [], action) => {

  switch(action.type) {
    case "vote":
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1
      }

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