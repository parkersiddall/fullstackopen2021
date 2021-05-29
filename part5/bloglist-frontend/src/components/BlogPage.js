import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addLike } from '../reducers/blogsReducer'

const BlogPage = () => {
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const blog = blogs.find(n => n.id === id)
  const dispatch = useDispatch()

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


    </div>
  )
}

export default BlogPage