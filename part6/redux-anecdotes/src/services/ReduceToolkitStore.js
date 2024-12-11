// import { createStore, combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from '../reducers/anecdoteReducer'
import anecdoteFilterReducer from '../reducers/anecdoteFilterReducer'
import notificationReducer from '../reducers/notificationReducer'

// const reducer = combineReducers({
//   anecdotes: anecdoteReducer,
//   filter: anecdoteFilterReducer
// })

// const store = createStore(reducer)

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: anecdoteFilterReducer,
    notification: notificationReducer
  }
})

export default store