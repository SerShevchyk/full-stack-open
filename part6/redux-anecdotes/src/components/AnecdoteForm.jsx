import { useDispatch } from 'react-redux'
// import anecdoteService from '../services/anecdotes'
import {createAnecdote} from '../reducers/anecdoteReducer.js'
import {setNotification} from '../reducers/notificationReducer.js'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleAddAnecdote = async (e) => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    e.target.anecdote.value = ''
    // dispatch(addAnecdote(anecdote))

    // let anecdoteObject = await anecdoteService.createNewAnecdote(anecdote)
    // dispatch({ type: 'anecdotes/addAnecdote', payload: {anecdote: anecdoteObject} })
        
    dispatch(createAnecdote(anecdote))

    // dispatch({ type: 'notification/setNotification', payload: {notification: `Anecdote "${anecdote}" was added`} })
    // setTimeout(() => {
    //   dispatch({ type: 'notification/removeNotification', payload: {notification: ""} })
    // }, 5000);
    dispatch(setNotification(`Anecdote "${anecdote}" was added`, 5))
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleAddAnecdote}>
        <div><input name='anecdote'/></div>
        <button>Create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;