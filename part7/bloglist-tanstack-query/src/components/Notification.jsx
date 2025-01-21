import React, { useContext } from 'react'
import NotificationContext from '../context/NotificationContext'


const Notification = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)

  if (notification === null || notification.message === null) {
    return null
  }

  return (
    <div className={`${notification.type} notification`}>
      {notification.message}
    </div>
  )
}

export default Notification