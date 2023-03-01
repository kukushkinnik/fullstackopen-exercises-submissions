import axios from "axios";

const baseURL = "http://localhost:3001/anecdotes"

export const getAnecdotes = async () => {
  const response = await axios.get(baseURL);
  return response.data;
}

export const addNewAnecdote = async newAnecdote => {
  const response = await axios.post(baseURL, newAnecdote);
  return response.data;
}

export const updateAnecdote = async updatedAnecdote => {
  const response = await axios.put(`${baseURL}/${updatedAnecdote.id}`, updatedAnecdote);
  return response.data;
}