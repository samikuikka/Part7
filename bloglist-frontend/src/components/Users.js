import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'

import {
  Typography,
  Table,
  TableBody,
  TableHead,
  TableContainer,
  TableRow,
  TableCell,
  Paper,
} from '@material-ui/core'

const Users = () => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect( () => {
    dispatch(getUsers())
  }, [dispatch])

  //NO users
  if(users.length === 0) {
    return(
      <div>
        <h2>Users</h2>
      </div>
    )
  }

  return(
    <div>
      <Typography variant='h3' >Users</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
              User
              </TableCell>
              <TableCell>
              amount of blogs
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            { users.map(user =>
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>
                    <Typography variant='subtitle1'>{user.name}</Typography>
                  </Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users