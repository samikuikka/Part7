import React from 'react'

const User = (user) => {

  return(
    <tr>
      <td>{user.user.name}</td>
      <td>{user.user.blogs.length}</td>
    </tr>
  )
}

export default User