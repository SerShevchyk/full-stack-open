import { useState, useEffect } from 'react'
import countryService from './services/countries.js'
import SearchForm from './components/SearchForm'
import CountriesList from './components/CountriesList'

function App() {
  const [countryName, setCountryName] = useState(null)
  const [notification, setNotification] = useState(null)
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  
  useEffect(() => {
    if (countryName) {
      let f = countries.filter((country) => country.name.common.includes(countryName))
      setFilteredCountries(f)

      if (f.length == 0 || f.length <= 10) {
        setNotification(null)
      }
      else {
        setNotification("Too many matches, specify another filter")
      }
    }
    else {
      countryService
        .getAllCountries()
        .then(r => {
          setCountries(r)
        })
        .catch(e => console.log(e))
    }
  }, [countryName])

  const handlerSearchForm = (e) => {
    setCountryName(e.target.value)
  }

  const handlerShowCountry = (e) => {
    e.preventDefault()
    countryService
      .getCountriesByName(e.target.getAttribute("target-country"))
      .then(r => {
        setFilteredCountries([r])
      })
      .catch(e => console.log(e))
  }

  let countriesList = !countryName ? countries : filteredCountries
  if (filteredCountries.length > 0) {
    countriesList = filteredCountries
  } 

  return (
    <>
      <SearchForm handlerSearchForm={handlerSearchForm} notification={notification}/>
      <CountriesList countries={countriesList} handlerShowCountry={handlerShowCountry} />
    </>
  )
}

export default App
