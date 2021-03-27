import React from 'react'

const FilteredPeople = (props) => {
    return (
      <div>
        {props.filtered.map(person =>
          <p key={person.name}>{person.name} : {person.number}</p>
        )}
      </div>
    )
  }

export default FilteredPeople