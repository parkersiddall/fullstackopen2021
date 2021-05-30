import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'
import useStyles from '../styles'

// Material UI
import {
  Button,
  TextField
} from '@material-ui/core'

const NewBlogForm = ({ user }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const classes = useStyles()

  const submitNewPost = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url,
      user: user
    }

    dispatch(addBlog(newBlog, user))

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <div>
      <form onSubmit={submitNewPost} className={classes.root}>
        <div>
          <TextField
            label='Title'
            variant="outlined"
            id='titleBlogForm'
            type='text'
            value={title}
            name='title'
            onChange={({ target }) => setTitle(target.value)}
          />
          <TextField
            label='Author'
            variant='outlined'
            id='authorBlogForm'
            type='text'
            value={author}
            name='author'
            onChange = {({ target }) => setAuthor(target.value)}
          />
          <TextField
            label='URL'
            variant='outlined'
            id='urlBlogForm'
            type='url'
            value={url}
            name='url'
            onChange = {({ target }) => setUrl(target.value)}
          />
        </div>
        <Button id='submitBlogForm' type='submit'>Submit</Button>
      </form>
    </div>
  )
}

export default NewBlogForm
