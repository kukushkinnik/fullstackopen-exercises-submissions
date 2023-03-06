import React, { useState } from 'react'
import SearchForm from './components/SearchForm'
import { useField } from './hooks/useField'
import { useCountry } from './hooks/useCountry'
import Country from './components/Country'


const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <SearchForm fetch={fetch} nameInput={nameInput} />
      <Country country={country} />
    </div>
  )
}

export default App