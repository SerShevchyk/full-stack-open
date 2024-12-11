import { useSelector, useDispatch } from 'react-redux'
// import { updateVotes } from '../reducers/anecdoteReducer'
import {voteAnecdote} from '../reducers/anecdoteReducer.js'
import {setNotification} from '../reducers/notificationReducer.js'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => {
    if (state.filter) {
      return state.anecdotes.filter(a => a.content.includes(state.filter))
    }
    return state.anecdotes
  })
  let sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  
  const handleVote = (id) => {
    // dispatch(updateVotes(id))
    // dispatch({ type: 'anecdotes/updateVotes', payload: {id} })

    let votedAnecdote = sortedAnecdotes.find(a => a.id === id)
    dispatch(voteAnecdote(votedAnecdote))
    
    // dispatch({ type: 'notification/setNotificationState', payload: {notification: `You voted "${votedAnecdote.content}"`} })
    
    // setTimeout(() => {
    //   dispatch({ type: 'notification/removeNotification', payload: {notification: ``} })
    // }, 5000);
    dispatch(setNotification(`You voted "${votedAnecdote.content}"`, 5))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnecdoteList;