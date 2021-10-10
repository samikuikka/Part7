import axios from 'axios'
const baseUrl = 'api/users'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    return response.data
  })
}

const userServices = {
  getAll
}

export default userServices