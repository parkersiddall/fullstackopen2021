import React, { useState } from 'react'
import PropTypes from 'prop-types'

// Material UI
import {
  Button,
  Container
} from '@material-ui/core'

const Toggle = (props) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  Toggle.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  return(
    <div>
      <Container style={hideWhenVisible} align="center">
        <Button onClick={toggleVisibility} align="center">{props.buttonLabel}</Button>
      </Container>
      <Container style={showWhenVisible} align="center">
        {props.children}
        <Button onClick={toggleVisibility} align="center">Cancel</Button>
      </Container>
    </div>
  )
}

export default Toggle