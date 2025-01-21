import { useState } from 'react'

export const useField = (name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = (e) => {
    setValue('')
  }

  return {
    reset,
    name,
    value,
    onChange
  }
}