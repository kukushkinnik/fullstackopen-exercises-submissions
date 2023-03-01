import React from "react";
import { addNewAnecdote } from "../requests";
import { useMutation, useQueryClient } from "react-query";
import { useNotificationDispatch } from "../NotificationContext";


const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch()

  const newNoteMutation = useMutation(addNewAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote))
    }
  });

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newNoteMutation.mutate({ content, votes: 0 })

    if (content.length < 5) {
      dispatch({ type: "SHOW", payload: `Too short, anecdote must have length 5 or more` });
    } else {
      dispatch(
        { type: "SHOW", payload: `You added "${content}"` });
    }

    setTimeout(() => {
      dispatch({ type: "HIDE" })
    }, 2000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
