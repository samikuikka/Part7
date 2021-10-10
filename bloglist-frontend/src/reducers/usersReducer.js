import userServices from '../services/users'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'GET_USERS':
    return action.data
  default: return state
  }
}

export const getUsers = () => {
  return async dispatch => {
    const users = await userServices.getAll()
    dispatch({
      type: 'GET_USERS',
      data: users
    })
  }
}

export default reducer
