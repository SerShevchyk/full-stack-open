import { useState, useEffect } from 'react'
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

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(baseUrl);
        setResources(response);
      } catch (error) {
        console.error(error)
      }
    };

    fetchData();
  }, [baseUrl, resources]);

  const create = async (resource) => {
    try {
      const response = await axios.post(baseUrl, resource)
      console.log(response)
      setResources(resources.concat(resource))
    } catch (error) {
      console.error(error)
    }
  }

  const service = {
    create
  }

  return [
    resources,
    service
  ]
};