import React from 'react'
import { Link } from 'react-router-dom'

const Blog = (blog) => {
  const style = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={style} className='hideStyle'>
      <Link to={`/blogs/${blog.blog.id}`}>{blog.blog.title} {blog.blog.author}</Link>
    </div>
  )
}

export default Blog