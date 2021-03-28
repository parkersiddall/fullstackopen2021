import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AllPeople from './components/AllPeople'
import FilteredPeople from './components/FilteredPeople'
import FilterForm from './components/FilterForm'
import InputForm from './components/InputForm'

const App = () => {

  // states
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('Insert a name...')
  const [ newNumber, setNewNumber ] = useState('555-555-5555')
  const [ filter, setFilter ] = useState('')

  // effects
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'notes')


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
