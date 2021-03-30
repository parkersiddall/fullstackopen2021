import './App.css';
import axios from 'axios'
import Weather from './components/Weather'
import React, { useState, useEffect } from 'react'

const Results = (props) => {
  if (props.filtered.length > 10) {
    return(
      <div>
        <p>Too many results. Be more specific</p>
      </div>
    )
  } else if (props.filtered.length < 10 && props.filtered.length > 1 ) {
    return (
      <div>
        {props.filtered.map(country =>
          <div>
            <span key={country.name}>{country.name}</span>
            <button 
              value={country.name}
              onClick={props.showOnClick}>
                Show
            </button>
          </div>
        )}
      </div>
    )
  } else if (props.filtered.length === 1) {
    console.log(props.filtered[0])
    var country = props.filtered[0]
    return(
      <div>
        <h2>{country.name}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h3>Languages</h3>
        <ul>
          {country.languages.map(language =>
            <li key={language.name}>{language.name}</li>
          )}
        </ul>
        <img 
          src={country.flag}
          alt="country flag">
        </img>
        <div>
            <Weather 
              capital={country.capital}
            />
        </div>
      </div>
    )
  } else {
    return(
      <div>
        No results.
      </div>
    )
  }
}

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