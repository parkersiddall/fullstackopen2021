import React from 'react'
import { createStore } from 'redux'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch({
      type: 'vote',
      data: {
        id: id
      }
    })
  }

  const createAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdoteInput.value
    event.target.anecdoteInput.value = ''
    dispatch({
      type: 'add',
      data: {
        content: anecdote
      }
    })

  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input  name="anecdoteInput" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App