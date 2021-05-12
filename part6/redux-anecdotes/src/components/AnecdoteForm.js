import { prepareCreateAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { createMessage } from '../reducers/messageReducer'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const createAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdoteInput.value
        event.target.anecdoteInput.value = ''

        dispatch(prepareCreateAnecdote(content))
        dispatch(createMessage('Anecdote added successfully!', 2000))
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