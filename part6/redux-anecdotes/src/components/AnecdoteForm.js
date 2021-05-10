import { prepareCreateAnecdote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { createMessage, clearMessage } from '../reducers/messageReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const createAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdoteInput.value
        event.target.anecdoteInput.value = ''

        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(prepareCreateAnecdote(content))

        dispatch(createMessage('Anecdote added successfully!'))
        setTimeout(() => {
          dispatch(clearMessage())
        }, 5000)
      }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={createAnecdote}>
                <div><input  name="anecdoteInput" /></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm