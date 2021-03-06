import React, { useEffect, useState } from 'react'
import Togglable from './Togglable'
import CreateForm from './CreateForm'
//import Blog from './Blog'
import { useSelector, useDispatch } from 'react-redux'
import { initialize, createBlog } from '../reducers/blogsReducer'
import { setError } from '../reducers/isErrorReducer'
import { setNotification } from '../reducers/notificationReducer'
import LoginForm from './LoginForm'
import loginServices from '../services/login'
import blogService from '../services/blogs'
import { userLogin } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

//syles
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography
} from '@material-ui/core'

const Home = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  useEffect( () => {
    dispatch(initialize())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(userLogin(user))
      blogService.setToken(user.token)
    }
  }, [])

  //ADDING BLOGS
  const addBlog = (blogObject) => {
    try {
      dispatch(createBlog(blogObject))
      dispatch(setError(false))
      dispatch(setNotification(`a new blog "${blogObject.title}" by ${blogObject.author} added.`))
    } catch(error) {
      dispatch(setError(true))
      dispatch(setNotification(`${error}`))
    }
  }

  //LIKE FUNCTIONALITY
  /*
  const increaseLike = id => {
    const blog = blogs.find(blog => blog.id === id)
    dispatch(like(blog))
  }*/

  //DELETING BLOGS
  /*
  const deleteBlog = id => {
    const blog = blogs.find(blog => blog.id === id)
    const result = window.confirm(`Remove ${blog.title} by ${blog.author}?`)
    console.log(blog)

    if(result) {
      try {
        dispatch(removeBlog(id))
        dispatch(setError(false))
        dispatch(setNotification(`${blog.title} deleted!`))
      } catch(error) {
        dispatch(setError(true))
        dispatch(setNotification(`Error in deleting a person: ${error.response.data.error}`))
      }
    }
  }*/

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginServices.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(userLogin(user))
      setUsername('')
      setPassword('')

      dispatch(setError(false))
      dispatch(setNotification('Logged in!'))

    } catch (exception) {
      dispatch(setError(true))
      dispatch(setNotification('Wrong username or password'))
    }
  }

  if(user === null) {
    return (
      <div>
        <LoginForm
          onSubmit={handleLogin}
          username={username}
          onUserNameChange={({ target }) => setUsername(target.value)}
          password={password}
          onPasswordChange={({ target }) => setPassword(target.value)}
        />
      </div>
    )
  }

  return(
    <div>
      <Togglable buttonLabel='create new blog'>
        <Typography variant='h4' align='center'>create new</Typography>
        <CreateForm
          createBlog={addBlog}
        />
      </Togglable>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.sort((x,y) => y.likes - x.likes).map(blog =>
              <TableRow key={blog.id}>
                <TableCell>
                  <Typography variant='subtitle1'>
                    <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
                  </Typography>
                </TableCell>
              </TableRow>)}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )

}

export default Home