import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './services/requests'
import { useNotificationDispatch } from './context/NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()
  
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })
  // console.log(JSON.parse(JSON.stringify(result)))

  const newAnecdoteMutation = useMutation({ 
    mutationFn: updateAnecdote,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      // const anecdotes = queryClient.getQueryData(['anecdotes'])
      // queryClient.setQueryData(['anecdotes'], anecdotes.concat(anecdote))

      notificationDispatch({payload: {notification: `You voted "${anecdote.content}"`}, type: "SET"})
    },
    onError: (error) => {
      notificationDispatch({payload: {notification: `Too short anecdote, need to must length 5 or more characters`}, type: "SET"})
    }
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if (result.isError) {    
    return <span>Anecdote service not available due problems in the server</span>
  }

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    newAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
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
