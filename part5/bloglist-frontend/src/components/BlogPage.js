import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addLike, addComment } from '../reducers/blogsReducer'

const BlogPage = () => {
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const blog = blogs.find(n => n.id === id)
  const [comment, setComment] = useState('add your comment...')
  const dispatch = useDispatch()

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const handleSubmitComment = (event) => {
    event.preventDefault()
    dispatch(addComment(comment, blog.id))
  }

  return(
    <div>
      <h3>{blog.title}</h3>
      <p>{blog.url}</p>
      <p>
        {blog.likes} likes
        <button
          className={'likeBlogButton'}
          onClick={() => dispatch(addLike(blog))}>Like
        </button>
      </p>
      <p>posted by {blog.author}</p>
      <h4>Comments:</h4>
      { blog.comments.length > 0 &&
            <ul>
              {blog.comments.map(comment =>
                <li key={comment.id}>{comment.comment}</li>)}
            </ul>
      }
      {blog.comments.length === 0 &&
        <p>No comments yet.</p>
      }
      <h4>Add a comment:</h4>
      <form onSubmit={handleSubmitComment}>
        <input value={comment} onChange={handleCommentChange} />
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default BlogPage