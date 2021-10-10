import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../reducers/usersReducer'
import { useParams } from 'react-router'
import UserBlog from './UserBlog'


const User = () => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()
  const id = useParams().id
  const foundUser = users.find(user => user.id === id)

  useEffect( () => {
    dispatch(getUsers())
  }, [dispatch])

  if(!foundUser) {
    return(
      <h3>No user found!</h3>
    )
  }

  return(
    <div>
      <h2>{foundUser.name}</h2>
      <h3><b>added blogs</b></h3>
      <ul>
        {foundUser.blogs.map(blog => <UserBlog key={blog.id} blog={blog} />)}
      </ul>
    </div>
  )
}

export default User