import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from '../styles'

// Material UI
import {
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'



const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null) // anchor for menu
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const classes = useStyles()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    console.log('You are now logged out.')
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({
      type: 'SET_USER',
      data: null
    })
  }

  return(
    <div>
      <div className={classes.root}>
        <AppBar position="relative">
          <Toolbar>
            <IconButton onClick={handleClick} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={handleClose}
                component={Link}
                to="/"
              >
                Home
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                component={Link}
                to='/users'
              >
                Users
              </MenuItem>
            </Menu>
            <Typography variant="h6" className={classes.title}>
              Blogs
            </Typography>
            <Typography variant="body1" align="center" className={classes.loggedInAs}>
              Logged in as {user.username}
            </Typography>
            <Button onClick={handleLogout} color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  )
}

export default Navbar