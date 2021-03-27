import React, { useState } from 'react'

const AllPeople = (props) => {
  return (
    <div>
      {props.persons.map(person => 
        <p key={person.name}>{person.name} : {person.number}</p>
      )}
    </div>
  )
}

const FilteredPeople = (props) => {
  return (
    <div>
      {props.filtered.map(person =>
        <p key={person.name}>{person.name} : {person.number}</p>
      )}
    </div>
  )
}

const InputForm = (props) => {
  return (
  <form onSubmit={props.onSub}>
    <div>
      name: <input 
        value={props.nameValue} 
        onChange={props.nameChange}
        />
    </div>
    <div>
      number: <input 
        value={props.numberValue} 
        onChange={props.numberChange}
        />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

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

const App = () => {

  // states
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('Insert a name...')
  const [ newNumber, setNewNumber ] = useState('555-555-5555')
  const [ filter, setFilter ] = useState('')

  const filterNames = persons.filter((person) => {
    return person.name.toLowerCase().includes(filter.toLowerCase())
    })

  // functions
  const addPerson = (event) => {
    event.preventDefault()

    const nameObject = {
      name: newName,
      number: newNumber
    }

    var isUnique = true
    persons.forEach((person) => {
      if (newName === person.name){
        window.alert(`${newName} is already listed`)
        setNewName('')
        setNewNumber('')
        isUnique = false
      }
    })

    if (isUnique) {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  // handlers
  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  // return html
  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm 
        value={filter}
        onChange={handleFilter}
      />
      <InputForm 
        onSub={addPerson}
        nameValue={newName}
        nameChange={handleNewName}
        numberValue={newNumber}
        numberChange={handleNewNumber}
      />
      
      <h2>Filtered results</h2>
      <FilteredPeople 
        filtered={filterNames}
      />
      <h2>All Numbers</h2>
      <AllPeople 
        persons={persons}
      />
    </div>
  )
}

export default App
