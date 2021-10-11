import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { initialize } from '../reducers/blogsReducer'
import { like } from '../reducers/blogsReducer'

const BlogInfo = () => {
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)

  const increaseLike = () => {
    dispatch(like(blog))
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
    </div>
  )
}

export default BlogInfo