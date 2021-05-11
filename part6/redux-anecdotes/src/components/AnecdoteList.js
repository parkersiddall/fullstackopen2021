import anecdoteReducer, { prepareVote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { createMessage, clearMessage } from '../reducers/messageReducer'

const AnecdoteList = () => {
    
    const anecdotes = useSelector((state) => {

        const sorted = state.anecdotes.sort((a, b) => {
            return b.votes - a.votes
        })

        return sorted
        })

        const dispatch = useDispatch()
        const vote = (anecdote) => {

            dispatch(prepareVote(anecdote))

            dispatch(createMessage('Vote added!'))
            setTimeout(() => {
                dispatch(clearMessage())
            }, 5000)

            
        }

        // filter anecdotes based on string in store
        const filter = useSelector(state => state.filter)
        const anecdotesFiltered = anecdotes.filter((anecdote) => {
            return anecdote.content.toLowerCase().includes(filter.toLowerCase())
        })

        console.log(anecdotesFiltered)
        return(
            <div>
                {anecdotesFiltered.map(anecdote =>
                    <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                    </div>
                )}
            </div>
        )
}

export default AnecdoteList