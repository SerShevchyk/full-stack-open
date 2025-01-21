import React from 'react'

const Notification = ({ notification, setNotification }) => {

  if (notification === null || notification.message === null) {
    return null
  }
  else {
    setTimeout(() => {
      setNotification("")
    }, 5000)
  }

  return (
    <div className={` notification`}>
      {notification}
    </div>
  )
}

export default Notification