import React, { useEffect } from 'react'
import Notification from './components/Notification'
import Home from './components/Home'
import { useSelector, useDispatch } from 'react-redux'
import { logout, userLogin } from './reducers/userReducer'
import blogService from './services/blogs'
import Users from './components/Users'
import User from './components/User'

//styling
import Container from '@material-ui/core/Container'
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box
} from '@material-ui/core'


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


  return (
    <Container>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <Button color="inherit" component={Link} to='/blogs' >
            blogs
            </Button>
            <Button color="inherit" component={Link} to='/users' >
            users
            </Button>
            <Typography variant="h6" component="div" >
              {user
                ? <span><em>{user.name} logged in </em><Button color='inherit' onClick={handleLogout}>logout</Button></span>
                : null
              }
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ width: '100%' }} >
        <Typography variant='h2' component="div" align='center' gutterBottom>
          blogs
        </Typography>
      </Box>

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
    </Container>
  )
}

export default App