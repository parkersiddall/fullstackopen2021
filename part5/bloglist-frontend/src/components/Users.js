import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
//import useStyles from '../styles'

// Material UI
import {
  Avatar,
  Container,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core'

const Users = () => {
  // init users, save them in redux state
  const users = useSelector(state => state.users)
  //const classes = useStyles()

  return(
    <Container>
      <Grid container spacing={3}>
        {users.map(user =>
          <Grid item key={user.id} xs={12} sm={6} md={3} align='center'>
            <Card>
              <CardActionArea component={Link} to={`/users/${user.id}`}>
                <CardContent>
                  <Avatar>{user.username[0]}</Avatar>
                  <Typography variant={'h5'}>
                    {user.username}
                  </Typography>
                  <Typography variant={'body1'}>
                    {user.blogs.length} blogs posted
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  )
}

export default Users