import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { prepareFilterAnecdotes } from '../reducers/anecdoteReducer'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const handleChange = (event) => {
        // input-field value is in variable event.target.value
        const filterString = event.target.value

        // place filter in store
        dispatch(setFilter(filterString))

        // filter in anecdote reducer
        //dispatch(prepareFilterAnecdotes(filterString))

    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
        filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter