import React from 'react'

const AllPeople = (props) => {
    return (
      <div>
        {props.persons.map(person => 
          <p key={person.name}>{person.name} : {person.number}</p>
        )}
      </div>
    )
  }


export default AllPeople