import React from 'react'
import {
  Button,
  TextField
} from '@material-ui/core'

const LoginForm = (props) => {

  return(
    <form onSubmit={props.onSubmit}>
      <div>
        <TextField
          id='username'
          type="text"
          value={props.username}
          name="Username"
          onChange={props.onUserNameChange}
          label='username'
        />
      </div>
      <div>
        <TextField
          id='password'
          type="password"
          value={props.password}
          name="Password"
          onChange={props.onPasswordChange}
          label='password'
        />
      </div>
      <Button id="login-button" color='primary' type="submit">login</Button>
    </form>
  )
}

export default LoginForm