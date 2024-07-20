const showNotification = (notification, setNotification) => {
  setNotification(notification)
  setTimeout(() => {
    setNotification(null)
  }, 5000)
}

export default { 
  showNotification
}