import React from "react";
import { useSelector } from "react-redux";
import Anecdote from "./Anecdote";

const AnecdoteList = () => {

  const anecdotes = useSelector(state => {
    const regex = new RegExp(state.filter, 'i')

    if (state.filter === "ALL") {
      return state.anecdotes
    }

    return state.anecdotes.filter(anecdote => anecdote.content.match(regex))
  });

  return (
    <ul>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
        />)}
    </ul>
  )
}

export default AnecdoteList;