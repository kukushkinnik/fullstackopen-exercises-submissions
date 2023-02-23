import React, { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from "./components/AnecdoteList"
import Filter from './components/Filter'
import Notification from "./components/Notification"
import { useSelector, useDispatch } from "react-redux";
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const notification = useSelector(state => state.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])

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