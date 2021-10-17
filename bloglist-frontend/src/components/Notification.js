import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {
  const isError = useSelector(state => state.isError)
  const message = useSelector(state => state.notification)

  if (message === null) {
    return null
  }

  if(isError) {
    return (
      <div>
        <Alert severity='error' >
          {message}
        </Alert>
      </div>
    )
  } else {
    return (
      <Alert severity='success'>
        {message}
      </Alert>
    )
  }
}

export default Notification