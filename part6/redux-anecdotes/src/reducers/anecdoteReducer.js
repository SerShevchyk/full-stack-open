import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

/* eslint-disable no-case-declarations */
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

// const anecdoteReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'UPDATE_VOTES' :
//       let id = action.payload.id
//       let anecdote = state.find(a => a.id === id)
//       let updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
//       return state.map(a => a.id === id ? updatedAnecdote : a)
//     case 'NEW_ANECDOTE' : 
//       return [...state, action.payload]
//     default : return state
//   }
// }

// export const updateVotes = (id) => {
//   return {
//     type: 'UPDATE_VOTES',
//     payload: { id }
//   }
// }

// export const addAnecdote = (anecdote) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     payload: asObject(anecdote)
//   }
// }

// export default anecdoteReducer

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    addAnecdote(state, action) {  
      return [...state, action.payload.anecdote]
    },
    updateVotes(state, action) {
      let id = action.payload.id
      let anecdote = state.find(a => a.id === id)
      let updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
      return state.map(a => a.id === id ? updatedAnecdote : a)
    }
  },
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNewAnecdote(anecdote)
    dispatch(addAnecdote({anecdote: newAnecdote}))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdotesService.updateAnecdote({...anecdote, votes: anecdote.votes + 1})
    
    dispatch(updateVotes({ id: updatedAnecdote.id }))
  }
}

export const { setAnecdotes, addAnecdote, updateVotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer