import React from 'react'

const FilterForm = (props) => {
    return (
      <div>
        filter: <input 
          value={props.value} 
          onChange={props.onChange}
          />
      </div>
    )
  }

export default FilterForm