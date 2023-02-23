import React from "react";
import { useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer"
import { voteNotification, hideNotification } from "../reducers/notificationsReducer";

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();

  const votes = (id) => {
    dispatch(vote(id, anecdote))
    dispatch(voteNotification(anecdote.content));

    setTimeout(() => {
      dispatch(hideNotification())
    }, 3000)
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