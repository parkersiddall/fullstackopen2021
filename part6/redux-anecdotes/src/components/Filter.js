import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
    const filter = props.filter

    const handleChange = (event) => {
        // input-field value is in variable event.target.value
        const filterString = event.target.value

        // place filter in store
        props.setFilter(filterString)

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

const mapDispatchToProps = {
    setFilter
  }

const mapStateToProps = (state) => {
    return {
      filter: state.filter
    }
  }

const connectedFilter = connect(
    mapStateToProps,
    mapDispatchToProps
    )(Filter)
    
export default connectedFilter