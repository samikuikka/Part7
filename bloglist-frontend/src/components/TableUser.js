import React from 'react'
import { Link } from 'react-router-dom'
import {
  TableCell
} from '@material-ui/core'

const TableUser = (user) => {
  return(
    <TableCell>
      <Link to={`/users/${user.user.id}`}>{user.user.name}</Link>
      {user.user.blogs.length}
    </TableCell>
  )
}

export default TableUser