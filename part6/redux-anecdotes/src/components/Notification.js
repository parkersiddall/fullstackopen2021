import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.message
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (!notification) {
    return null
  }
  return (
    <div style={style}>
      { notification }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}

const connectedNotification = connect(mapStateToProps)(Notification)
export default connectedNotification