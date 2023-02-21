import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from "./components/AnecdoteList"
import Filter from './components/Filter'
import Notification from "./components/Notification"
import { useSelector } from "react-redux";

const App = () => {

  const notification = useSelector(state => state.notifications);
  return (
    <div>

      <Filter />
      <h2>Anecdotes</h2>
      {notification &&
        <Notification />}

      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App