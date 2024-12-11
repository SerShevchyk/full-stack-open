import { createSlice } from '@reduxjs/toolkit'

// const anecdoteFilterReducer = (state = '', action) => {
//   switch (action.type) {
//     case 'SET_ANECDOTE_FILTER' :
//       return action.payload.filter
//     default : return state
//   }
// }

// export const actionCreatorFilter = (filter) => {
//   return {
//     type: 'SET_ANECDOTE_FILTER',
//     payload: {
//       filter
//     }
//   }
// }

// export default anecdoteFilterReducer

const initialState = ''

const anecdoteFilterSlice = createSlice({
  name: 'anecdoteFilter',
  initialState,
  reducers: {
    actionCreatorFilter(state, action) {
      return action.payload.filter  
    }
  },
})

export const { actionCreatorFilter } = anecdoteFilterSlice.actions
export default anecdoteFilterSlice.reducer