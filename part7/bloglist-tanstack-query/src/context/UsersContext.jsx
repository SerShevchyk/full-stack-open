import { createContext, useContext, useReducer } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../services/users'

const usersReducer = (state, action) => {
  switch (action.type) {
  case 'SET':
    return action.payload.users
  }
}

const UsersContext = createContext()

export const UsersContextProvider = ({ children }) => {
  const [users, usersDispatch] = useReducer(usersReducer, [])

  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    onSuccess: (data) => {
      console.log(data)
      // usersDispatch({ type: 'SET', payload: { users: data } })
    },
    onError: (error) => {
      console.error('Error:', error)
    },
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <UsersContext.Provider value={[data, usersDispatch]}>
      {children}
    </UsersContext.Provider>
  )
}

export default UsersContext