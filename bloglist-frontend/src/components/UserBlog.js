import React from 'react'

const UserBlog = (blog) => {
  return(
    <li>
      {blog.blog.title}
    </li>
  )
}

export default UserBlog