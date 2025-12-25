import { useEffect, useState } from "react"
import services from '../services/country'

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

  useEffect( () => {
    const fetchCountry = async () => {
      try {
        const result = await services.getCountry(name)
        if (result) {
          result.found = true
          setCountry(result)
        } else {
          setCountry({ found: false })
        }
      } catch (error) {
        setCountry({ found: false })
        console.error(error)
      }
    }

    if (name) fetchCountry()
  }, [name])

  return country
}


