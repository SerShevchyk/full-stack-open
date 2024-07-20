import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'
import notificationService from './services/notifications'

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [person, setPerson] = useState({
    name: "",
    number: "",
  })
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState({
    message: null,
    type: null
  })

  useEffect(() => {
    personService
      .getAll()
      .then(data => {
        setPersons(data)
      })
  }, [])
  
  const handleNewNameChange = (e) => setPerson({...person, name: e.target.value})
  const handleNewNumberChange = (e) => setPerson({...person, number: e.target.value})

  const handleSearch = (e) => {
    setSearch(persons.filter((person) => person.name == e.target.value))
  }

  const personsViewList = search.length > 0
    ? search
    : persons

  const hundleFormSubmit = (e) => {
    e.preventDefault()

    let p = persons.find((p) => p.name === person.name)

    if (p) {
      if (p.number != person.number) {
        if (window.confirm(`${p.name} is added to phonebook, replace the old number with a new one?`)) {
          personService
            .updateContact(p.id, person)
            .then(response => {
              setPersons(persons.map((contact) => contact.id === p.id ? {...contact, number: response.number} : contact))
              notificationService.showNotification({message: `The number for ${person.name} was changed successfully`, type: "success"}, setNotification)  
            })
            .catch(error => notificationService.showNotification({message: `Information of ${person.name} has already been removed from the server`, type: "error"}, setNotification))
        }
      }
      else {
        alert(`${person.name} is already added to phonebook`)
      }
    }
    else {
      const newContact = {
        name: person.name,
        number: person.number,
        id: persons.length + 1,
      }

      personService
        .createContact(newContact)
        .then(response => {
          console.log(response)
        })
                
      setPersons(persons.concat(newContact))
      notificationService.showNotification({message: `${person.name} was added to phonebook`, type: "success"}, setNotification)  
    }

    setPerson({name: "", number: ""})
  }

  const handleDeleteContact = (e) => {
    e.preventDefault()

    let personId = e.target.id;
    let p = persons.find((p) => p.id == personId)

    if (window.confirm(`Delete ${p.name} ?`)) {
      personService
        .deleteContact(e.target.id)
        .then(response => {
          setPersons(persons.filter((p) => p.id != personId))
        })
        .catch(error => console.log(error))
    }
  }

  return (
    <div>
      <Header text="Phonebook" />
      <Notification notification={notification} />
      <Filter handleAction={handleSearch} label="Search" />
      <Header text="Add new contact" />
      <PersonForm hundleFormSubmit={hundleFormSubmit} handleNewNameChange={handleNewNameChange} handleNewNumberChange={handleNewNumberChange} person={person} />
      <Header text="Numbers" />
      <Persons personsViewList={personsViewList} handleDeleteContact={handleDeleteContact} />
    </div>
  )
}

export default App