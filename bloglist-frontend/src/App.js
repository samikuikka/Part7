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
  Route,
  Link
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

  const padding = {
    paddingRight: 5
  }

  const navBarStyle = {
    backgroundColor: '#BDC3C7'
  }

  return (
    <div>
      <div style={navBarStyle}>
        <Link to='/blogs' style={padding} >blogs</Link>
        <Link to='/users' style={padding} >users</Link>
        {user
          ? <span>{user.name} logged in <button type="button" onClick={handleLogout}>logout</button></span>
          : null
        }
      </div>
      <h2>blogs</h2>
      <Notification />

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