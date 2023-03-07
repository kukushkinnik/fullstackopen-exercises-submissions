import React from 'react'
import { useResource } from './hooks/useResource'
import { useField } from './hooks/useField'
import NotesForm from './components/NotesForm'
import Notes from './components/Notes'
import PersonsForm from './components/PersonsForm'
import Persons from './components/Persons'

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value })
  }


  return (
    <div>
      <NotesForm handleNoteSubmit={handleNoteSubmit} content={content} />
      <Notes notes={notes} />

      <PersonsForm handlePersonSubmit={handlePersonSubmit} name={name} number={number} />
      <Persons persons={persons} />
    </div>
  )
}

export default App