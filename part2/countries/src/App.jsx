import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/country'

const App = () => {
  const [value, setValue] = useState('')
  const [result, setResult] = useState([])
  const [msg, setMsg] = useState(null)

  useEffect(() => {
    if (!value) {
      setResult([])
      setMsg(null)
      return
    }

    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        const filtered = response.data.filter(country =>
          country.name.official.toLowerCase().includes(value.toLowerCase()) || 
          country.name.common.toLowerCase().includes(value.toLowerCase())
        )

        if (filtered.length > 10) {
          setMsg('Too many matches, specify another filter')
          setResult([])
        } else {
          setMsg(null)
          setResult(filtered)
        }
      })
      .catch(err => {
        console.log(`Error ${err}`)
        setMsg('Error fetching countries')
        setResult([])
      })
  }, [value])

  const handleValueChange = (event) => {
    setValue(event.target.value)
  }

  const handleShowButton = (cca3) =>{
    setResult(prev => prev.filter(r => r.cca3 === cca3))
  }

  return (
    <div>
      find countries <input value={value} onChange={handleValueChange} />
      {msg}
      <Country result={result} handleShowButton={handleShowButton} />
    </div>
  )
}

export default App