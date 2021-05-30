import React from 'react'
import { useSelector } from 'react-redux'
import {
  Alert
} from '@material-ui/lab'

const Notification = () => {

  const notification = useSelector(state => state.notification)

  if (notification === null) {
    return null
  }

  var severityLevel

  if (notification.style === 'successMessage') {
    severityLevel = 'success'
  } else if (notification.style === 'errorMessage') {
    severityLevel = 'error'
  }

  return (
    <div>
      <Alert severity={severityLevel}>{notification.message}</Alert>
    </div>
  )
}

export default Notification