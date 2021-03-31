import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AllPeople from './components/AllPeople'
import FilteredPeople from './components/FilteredPeople'
import FilterForm from './components/FilterForm'
import InputForm from './components/InputForm'
import personsService from './services/persons'

const App = () => {

  // states
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('Insert a name...')
  const [ newNumber, setNewNumber ] = useState('555-555-5555')
  const [ filter, setFilter ] = useState('')

  //effects
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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
      if (newName.toLowerCase() === person.name.toLowerCase()){
        isUnique = false
        //get the id of the person
        nameObject.id = person.id
      }
    })

    if (isUnique) {
      personsService
      .addToDB(nameObject)
      .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
      })
    } else {
      if(window.confirm(`${newName} is already listed. Update number?`)){
        personsService
        .updateDB(nameObject)
        .then(response => {
          setPersons(persons.map(person => person.id !== response.data.id ? person : response.data))
          setNewName('')
          setNewNumber('')
        })
      }
    }
  }

  const deletePerson = (event) => {
    let deletePerson = JSON.parse(event.target.value)
    if (window.confirm(`Do you wish to delete ${deletePerson.name}?`)){
      personsService
      .deleteFromDB(deletePerson.id)
      .then(response => {
        var newPersons = persons.filter(person => person.id !== deletePerson.id)
        setPersons(newPersons)
      })
      .catch(error => {
        console.log(error)
        window.alert(`Could not delete ${deletePerson.name}. Refresh the page and try again.`)
      })
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
        onclick={() => deletePerson}
      />
      <h2>All Numbers</h2>
      <AllPeople 
        persons={persons}
      />
    </div>
  )
}

export default App
