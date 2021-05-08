import { prepareCreateAnecdote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const createAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdoteInput.value
        event.target.anecdoteInput.value = ''
        dispatch(prepareCreateAnecdote(content))
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