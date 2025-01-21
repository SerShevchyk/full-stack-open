const showNotification = (notification, dispatch) => {
  dispatch({type: 'notification/setNotification', payload: notification})

  setTimeout(() => {
    dispatch({type: 'notification/setNotification', payload: null})
  }, 5000)
}

export default {
  showNotification
}