import { prepareCreateAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { createMessage } from '../reducers/messageReducer'

const AnecdoteForm = (props) => {

    const createAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdoteInput.value
        event.target.anecdoteInput.value = ''

        props.prepareCreateAnecdote(content)
        props.createMessage('Anecdote added successfully!', 2000)
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

const mapDispatchToProps = {
    prepareCreateAnecdote,
    createMessage
  }

const connectedAnecdoteForm = connect(
    null,
    mapDispatchToProps
    )(AnecdoteForm)
    
export default connectedAnecdoteForm