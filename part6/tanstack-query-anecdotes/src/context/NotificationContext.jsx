/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case "SET":
        return action.payload.notification
    case "REMOVE":
        return ''
    default:
        return ''
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>      
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationValAndDispatch = useContext(NotificationContext)
  return notificationValAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationValAndDispatch = useContext(NotificationContext)
  return notificationValAndDispatch[1]
}

export default NotificationContext