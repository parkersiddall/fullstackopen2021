import axios from 'axios'
import React, { useState, useEffect } from 'react'

const API_KEY = process.env.REACT_APP_API_KEY

const Weather = (props) => {

    var capital = props.capital

    // states
    const [ weather, setWeather ] = useState("")
    const [displayWeather, setDisplayWeather] = useState(false);

    // effects
    useEffect(() => {
        const params = {
            access_key: API_KEY,
            query: capital
        }
        axios
        .get('http://api.weatherstack.com/current', {params})
        .then(response => {
            setWeather(response.data)
            setDisplayWeather(true)
        })
    }, [capital])

    if (!displayWeather){
        return (
            <div>
                Loading weather...
            </div>
        )
    } else {
        return (
            <div>
                <h3>Weather in {capital}</h3>
                <p>Temp: {weather.current.temperature} degrees</p>
                <p>Wind: {weather.current.wind_speed}</p>
                <img src={weather.current.weather_icons} alt="Weather"></img>

            </div>
        )
    }
}

export default Weather;