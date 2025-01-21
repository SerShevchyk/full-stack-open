import { useState, useEffect } from "react"
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api"

  useEffect(() => {  
    axios.get(`${baseUrl}/name/${name}`)
      .then(r => {
        setCountry({...r, found: true})
      })
      .catch(e => {
        setCountry(null)
        console.log(e)
      })
    }, [name])
    
  return country
}