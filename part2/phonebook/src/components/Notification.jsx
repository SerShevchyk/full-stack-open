import React from 'react';

const Notification = ({notification}) => {
  
  if (notification === null || notification.message === null) {
    return null
  }

  return (
    <div className={`${notification.type} notification`}>
      {notification.message}
    </div>
  )
};

export default Notification;