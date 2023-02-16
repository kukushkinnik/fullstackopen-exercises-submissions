import React from "react";
import { useDispatch } from "react-redux";
import { voting } from "../reducers/anecdoteReducer"

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voting(id))
  }
  return (
    <li>
      {anecdote.content} {" "}
      has {anecdote.votes}
      <button onClick={() => vote(anecdote.id)}>vote</button>
    </li>
  )
}

export default Anecdote;