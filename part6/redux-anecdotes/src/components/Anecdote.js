import React from "react";
import { useDispatch } from "react-redux";
import { voting } from "../reducers/anecdoteReducer"
import { voteNotification, hideNotification } from "../reducers/notificationsReducer";

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voting(id))
    dispatch(voteNotification(anecdote.content));

    setTimeout(() => {
      dispatch(hideNotification())
    }, 3000)
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