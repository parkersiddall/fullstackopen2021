import React from 'react'

const FilteredPeople = (props) => {
    return (
      <div>
        {props.filtered.map(person => 
          <div key={person.name}>
            <span>{person.name} : {person.number}</span>
            <button onClick={props.onclick()} value={JSON.stringify(person)}>Delete</button>
          </div>
        )}
      </div>
    )
  }

export default FilteredPeople