import React from 'react'
import { logout } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

const LoggedIn = (user) => {
  console.log(user)

  const dispatch = useDispatch()

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
    window.localStorage.clear()
  }

  if(!user) {
    return null
  }

  return(
    <div>
      {user.name} logged in. <button type="button" onClick={handleLogout}>logout</button>
    </div>
  )
}

export default LoggedIn