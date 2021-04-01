import React from 'react'

const Notification = ({notification}) => {

    console.log(notification)
    if (notification === null) {
        return null
      }
    
      return (
        <div className={notification.style}>
          {notification.message}
        </div>
      )
}

export default Notification