import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

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