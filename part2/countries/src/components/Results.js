import React from 'react'
import Weather from './Weather'
import ListCountries from './ListCountries'

const Results = (props) => {
    if (props.filtered.length > 10) {
        return(
        <div>
            <p>Too many results. Be more specific</p>
        </div>
        )
    } else if (props.filtered.length < 10 && props.filtered.length > 1 ) {
        return (
            <ListCountries
                filtered={props.filtered}
                country={props.country}
                showOnClick={props.showOnClick}
                 />
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

export default Results;