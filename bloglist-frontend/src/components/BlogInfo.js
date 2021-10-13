import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { initialize } from '../reducers/blogsReducer'
import { like, comment } from '../reducers/blogsReducer'

const BlogInfo = () => {
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)

  const [commentField, setComment ] = useState('')

  const increaseLike = () => {
    dispatch(like(blog))
  }

  const newMessage = async (event) => {
    event.preventDefault()
    await dispatch(comment(blog.id, { comment: commentField }))
    await dispatch(initialize())
    setComment('')
  }

  const dispatch = useDispatch()

  useEffect( () => {
    dispatch(initialize())
  }, [dispatch])

  if(!blog) {
    return(null)
  }

  return(
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div id='likes'>{blog.likes} likes <button id='like-button' onClick={() => increaseLike(blog.id)}>like</button></div>
      <div>added by {blog.author}</div>
      <h3>comments</h3>
      <form onSubmit={newMessage}>
        <div>
          <input
            id='comment'
            type="text"
            value={commentField}
            name="Comment"
            onChange={({ target }) => setComment(target.value)}
          />
          <button id='comment-button' type="submit">add comment</button>
        </div>
      </form>
      <ul>
        {blog.comments.map(comment => <li key={comment.id}>{comment.comment}</li>)}
      </ul>
    </div>
  )
}

export default BlogInfo