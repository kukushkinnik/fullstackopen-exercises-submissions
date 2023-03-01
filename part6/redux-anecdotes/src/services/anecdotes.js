import axios from "axios";

const baseURL = "http://localhost:3001/anecdotes";

async function getAll() {
  const response = await axios.get(baseURL);
  return response.data
}

async function createAnecdote(content) {
  const object = { content, votes: 0 };
  const response = await axios.post(baseURL, object);
  return response.data;
}

async function updateVotes(id, updatedAnecdote) {
  const response = await axios.put(`${baseURL}/${id}`, updatedAnecdote);
  return response.data;
}

export default { getAll, createAnecdote, updateVotes }