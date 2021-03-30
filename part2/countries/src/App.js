import './App.css';
import axios from 'axios'
import Results from './components/Results'
import React, { useState, useEffect } from 'react'

const App = () => {

  // states
  const [ countries, setCountries ] = useState([]) 
  const [ country, setCountry ] = useState('')

  // effects
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  // create a variable to hold filtered countries
  const filterCountries = countries.filter((x) => {
    return x.name.toLowerCase().includes(country.toLowerCase())
    })

  //handlers
  const inputHandler = (event) => {
    setCountry(event.target.value)
  }

  const showButtonHandler = (event) => {
    setCountry(event.target.value)
  }

  return (
    <div>
      <h1>Find Countries</h1>
      <input value={country} onChange={inputHandler}></input>
      <Results 
        filtered={filterCountries}
        showOnClick={showButtonHandler} />
    </div>
  );
}

export default App;