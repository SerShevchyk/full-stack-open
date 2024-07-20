import React, { useEffect } from 'react';
import { useState } from 'react'
import weatherService from '../services/weather';

const Weather = ({country}) => {

  const [weather, setWeather] = useState(null)
  let latlng = country.capitalInfo.latlng

  useEffect(() => {
    if (!weather) {
      weatherService
        .getWeather(latlng[0], latlng[1])
        .then(r => {
          setWeather(r)
        })
        .catch(e => console.log(e))
      }
  }, [weather])

  if(!weather) {
    return (<></>)
  }

  let icon = `https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`

  return (
    <div>
      <h3>Weather in {country.capital[0]}</h3>
      <div className="temp">Temperature: {weather.current.temp}</div>
      <div className="icon">
        <img src={icon} alt="icon" />
      </div>
      <div className="wind">Wind: {weather.current.wind_speed}</div>
    </div>
  );
};

export default Weather;