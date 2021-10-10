import React from 'react'
import { Link } from 'react-router-dom'

const TableUser = (user) => {

  return(
    <tr>
      <td><Link to={`/users/${user.user.id}`}>{user.user.name}</Link></td>
      <td>{user.user.blogs.length}</td>
    </tr>
  )
}

export default TableUser