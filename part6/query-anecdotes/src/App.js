import AnecdoteForm from './components/AnecdoteForm'
import { useQueryClient, useMutation, useQuery } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import NotificationContext from './NotificationContext';
import Notification from './components/Notification';
import { useContext } from 'react';

const App = () => {

  const queryClient = useQueryClient();
  const [message, dispatch] = useContext(NotificationContext);

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    }
  })

  const handleVote = (anecdote) => {
    dispatch({ type: "SHOW", payload: `You voted for "${anecdote.content}"` })
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    setTimeout(() => {
      dispatch({ type: "HIDE" })
    }, 2000)
  }

  const { isLoading, isError, data, error } = useQuery("anecdotes", getAnecdotes, {
    refetchOnWindowFocus: false
  })

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const anecdotes = data;

  return (
    <div>
      <h3>Anecdote app</h3>
      {message !== "" &&
        <Notification message={message} />
      }


      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
