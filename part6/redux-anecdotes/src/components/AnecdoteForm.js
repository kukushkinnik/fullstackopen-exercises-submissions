import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationsReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(setNotification(`You added ${content}`, 2))
    dispatch(createAnecdote(content));


  }

  return (
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">Add</button>
    </form>
  )
}

export default AnecdoteForm;


