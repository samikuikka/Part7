import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../reducers/usersReducer'
import  User  from '../components/User'

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
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          { users.map(user =>
            <User key={user.id} user={user} /> )
          }
        </tbody>
      </table>
    </div>
  )
}

export default Users