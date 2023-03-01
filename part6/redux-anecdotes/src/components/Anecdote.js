import React from "react";
import { useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationsReducer";

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();

  const votes = (id) => {
    dispatch(vote(id, anecdote))
    dispatch(setNotification(`You have voted for ${anecdote.content}`, 2))
  }

  return (
    <li>
      {anecdote.content} {" "}
      has {anecdote.votes}
      <button onClick={() => votes(anecdote.id)}>vote</button>
    </li>
  )
}

export default Anecdote;