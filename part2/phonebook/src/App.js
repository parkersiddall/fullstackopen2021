import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AllPeople from './components/AllPeople'
import FilteredPeople from './components/FilteredPeople'
import FilterForm from './components/FilterForm'
import InputForm from './components/InputForm'
import personsService from './services/persons'
import Notification from './components/Notification'

const baseURL = '/api/persons'

const App = () => {

  // states
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('Insert a name...')
  const [ newNumber, setNewNumber ] = useState('555-555-5555')
  const [ filter, setFilter ] = useState('')
  const [ notif, setNotif ] = useState(null)

  //effects
  useEffect(() => {
    axios
      .get(baseURL)
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
          setNotif(
            {
              message: 'Person added successfully!',
              style: 'successMessage'
            })
          setTimeout(() => {
            setNotif(null)
          }, 5000)
      })
      .catch(error => {
        console.log(error.response.data.message)
        setNotif(
          {
            message: error.response.data.message,
            style: 'errorMessage'
          })
      })
    } else {
      if(window.confirm(`${newName} is already listed. Update number?`)){
        personsService
        .updateDB(nameObject)
        .then(response => {
          setPersons(persons.map(person => person.id !== response.data.id ? person : response.data))
          setNewName('')
          setNewNumber('')
          setNotif(
            {
              message: 'Person modified successfully!',
              style: 'successMessage'
            })
          setTimeout(() => {
            setNotif(null)
          }, 5000)
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
        setNotif(
          {
            message: 'Person deleted successfully!',
            style: 'successMessage'
          })
        setTimeout(() => {
          setNotif(null)
        }, 5000)
      })
      .catch(error => {
        setNotif(
          {
            message: 'Person has already been deleted from the server. Updating list...',
            style: 'errorMessage'
          })
        setTimeout(() => {
          setNotif(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== deletePerson.id))
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
      <Notification notification={notif}/>
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
      
      <h2>Search Results</h2>
      <FilteredPeople 
        filtered={filterNames}
        onclick={() => deletePerson}
      />
    </div>
  )
}

export default App
