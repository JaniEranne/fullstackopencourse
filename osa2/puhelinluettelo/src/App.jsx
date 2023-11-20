import { useState, useEffect } from 'react'
import personService from './services/persons'


const Filter = (props) => {
  return(
    <div>
    filter shown with
    <input
    value={props.value}
    onChange={props.onChange}
    />
  </div>
  )
}

const Person = (props) => {
 return(
  <div>
   {props.persons.filter(person => person.name.toLowerCase().includes(props.filtteri.toLowerCase())).map(person => 
    <p key={person.name}>{person.name} {person.number} <button onClick={() => props.deletePerson(person)}>delete</button>
    </p> 
  )}
  </div>
  )
}

const PersonForm = (props) => {
  return(
  <form onSubmit={props.addName}>
  <div>
    name: 
    <input
    value={props.newName}
    onChange={props.handleNameChange} />
  </div>
  <div>
    number: 
    <input
    value={props.newNumber}
    onChange={props.handleNumberChange} />
  </div>
  <div>
    <button type="submit">add</button>
  </div>
</form>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtteri, setFiltteri] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  
  const addName = (event) => {
    event.preventDefault()
    const NameObject = { name: newName, number: newNumber }
    if(!persons.some(x => x.name === NameObject.name)){
      personService
      .create(NameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
      setErrorMessage(
        `Added '${newName}'`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
  }else{
    const id = persons.find(x => x.name === newName).id
    setErrorMessage(
      `Updated '${newName}'s phone number'`
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    personService
    .update(id, NameObject)
    .then(response => {
      setPersons(persons.map(person => person.id !== id ? person : response))
    })
    .catch(error => {
      setPersons(persons.filter(n => n.id !== id))
      setErrorMessage(
        `Information of '${NameObject.name}' has already been removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  }
    setNewName('')
    setNewNumber('')
    setFiltteri('')
  }

  const deletePerson = (person) => {
    personService
    .deletePerson(person.id)
    .then(response => {
      setPersons(persons.filter(p => p.id !== person.id))
      setErrorMessage(
        `Deleted '${person.name}'`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
      .catch(e => {
        console.error(e);
        setPersons(persons.filter(n => n.id !== person.id))
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFiltteriChange = (event) => {
    setFiltteri(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} />
        <Filter value={filtteri} onChange={handleFiltteriChange}/>
      <h2>Add a new</h2>
        <PersonForm addName={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
        <Person persons={persons} filtteri={filtteri} deletePerson={deletePerson}/>
    </div>
  )

}

export default App