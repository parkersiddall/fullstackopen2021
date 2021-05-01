import React, { useState } from 'react'

const NewBlogForm = ({ sendNewBlog, user }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const submitNewPost = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url,
      user: user
    }

    sendNewBlog(newBlog)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <div>
      <form onSubmit={submitNewPost}>
        <div>
          title
          <input
            id='titleBlogForm'
            type='text'
            value={title}
            name='title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            id='authorBlogForm'
            type='text'
            value={author}
            name='author'
            onChange = {({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            id='urlBlogForm'
            type='url'
            value={url}
            name='url'
            onChange = {({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='submitBlogForm' type='submit'>submit</button>
      </form>
    </div>
  )
}

export default NewBlogForm
