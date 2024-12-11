import { useContext } from 'react'
import { useNotificationDispatch } from '../context/NotificationContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../services/requests'

const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch()
  
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })

    notificationDispatch({payload: {notification: `Anecdote "${content}" was added`}, type: "SET"})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
