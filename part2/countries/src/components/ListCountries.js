import React from 'react'
 const ListCountries = (props) => {
     return(
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
 }

export default ListCountries;