import React, { useEffect } from 'react'
import Notification from './components/Notification'
import Home from './components/Home'
import { useSelector, useDispatch } from 'react-redux'
import { logout, userLogin } from './reducers/userReducer'
import blogService from './services/blogs'
import Users from './components/Users'
import User from './components/User'

import {
  Switch,
  Route
} from 'react-router-dom'
import BlogInfo from './components/BlogInfo'

const App = () => {
  //
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(userLogin(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
    window.localStorage.clear()
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user
        ? <p>{user.name} logged in. <button type="button" onClick={handleLogout}>logout</button></p>
        : null }

      <Switch>
        <Route path='/users/:id' >
          <User />
        </Route>
        <Route path='/blogs/:id'>
          <BlogInfo />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  )
}

export default App