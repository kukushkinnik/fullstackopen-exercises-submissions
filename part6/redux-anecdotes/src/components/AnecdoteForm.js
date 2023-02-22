import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer"
import { newNotification } from "../reducers/notificationsReducer";
import { hideNotification } from "../reducers/notificationsReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    const newAnecdote = await anecdoteService.createAnecdote(content);

    dispatch(createAnecdote(newAnecdote));
    dispatch(newNotification(content))

    setTimeout(() => {
      dispatch(hideNotification())
    }, 2000)

  }

  return (
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">Add</button>
    </form>
  )
}

export default AnecdoteForm;


