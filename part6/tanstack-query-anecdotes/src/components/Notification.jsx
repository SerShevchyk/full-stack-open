import { useNotificationValue } from '../context/NotificationContext'
import { useNotificationDispatch } from '../context/NotificationContext'

const Notification = () => {
  let notification = useNotificationValue()
  const notificationDispatch = useNotificationDispatch()
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (!notification) return null

  setTimeout(() => {
    notificationDispatch({type: "REMOVE"})
  }, 5000);
  
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
