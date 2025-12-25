import { useState } from 'react'
import { useField, useCountry } from './hooks/index'
import Country from './components/Country'
import Form from './components/Form'


const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  return (
    <div>
      <Form nameInput={nameInput} setName={setName} />
      <Country country={country} />
    </div>
  )
}

export default App