const showNotification = (notification, notificationDispatch) => {

  notificationDispatch({ type: 'SET', payload: { notification } })
  setTimeout(() => {
    notificationDispatch({ type: 'REMOVE' })
  }, 5000)
}

export default {
  showNotification
}