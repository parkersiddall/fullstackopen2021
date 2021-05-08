import { prepareVote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
    
    const anecdotes = useSelector((state) => {

        const sorted = state.sort((a, b) => {
          return b.votes - a.votes
        })
    
        return sorted
      })

      const dispatch = useDispatch()
      const vote = (id) => {
        dispatch(prepareVote(id))
      }

    return(
        <div>
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
        </div>
    )
}

export default AnecdoteList