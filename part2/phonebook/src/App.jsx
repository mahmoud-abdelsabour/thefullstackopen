import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [SearchTerm, setSearchTerm] = useState('')

  useEffect( () => {
    console.log('effect')
    personsService.getAll().then(initialPersons=>setPersons(initialPersons))
    console.log('promise fulfilled')
  },[])

  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const personObject = {
      name: newName,
      number: newNumber
    }

    const nameExist = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    if(nameExist && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      personsService.update(nameExist.id, personObject).then(response => 
        { 
          setPersons(persons.map(person => 
            person.id !== nameExist.id ? person : response
        ))})
      setNewName('')
      setNewNumber('')
      return
    }


    personsService.create(personObject).then(returnedPerson=>setPersons(persons.concat(returnedPerson)))

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

    const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchTermChange = (event) => {
    console.log(event.target.value)
    setSearchTerm(event.target.value)
  }

  const deleteEvent = (id, name) => {
    if(window.confirm(`Delete ${name} ?`))
    {
      personsService.Delete(id).then(response => 
      {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(err => {
        console.log('Delete failed', err)
      })
      console.log(`${name} id:${id} deleted`)
    }else{
      console.log('user cancelled deletion')
    }
  }
  const personsToShow = SearchTerm === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(SearchTerm.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter SearchTerm={SearchTerm} handleSearchTermChange={handleSearchTermChange} />

      <h2>Add a New Number</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deleteEvent={deleteEvent} />
    </div>
  )
}

export default App