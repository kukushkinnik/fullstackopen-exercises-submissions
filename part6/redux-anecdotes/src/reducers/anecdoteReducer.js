import { createSlice } from "@reduxjs/toolkit"
import anecdotesServices from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voting(state, action) {
      const id = action.payload.id;
      const updatedAnecdote = action.payload;

      return state.map(anecdote => anecdote.id !== id ? anecdote : updatedAnecdote)
    },
    appendAnecdotes(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    }
  }
})

export const { voting, appendAnecdotes, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesServices.getAll();
    dispatch(setAnecdotes(anecdotes));
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesServices.createAnecdote(content);
    dispatch(appendAnecdotes(newAnecdote));
  }
}

export const vote = (id, anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdotesServices.updateVotes(id, { ...anecdote, votes: anecdote.votes + 1 });
    dispatch(voting(updatedAnecdote))
  }
}


export default anecdoteSlice.reducer;