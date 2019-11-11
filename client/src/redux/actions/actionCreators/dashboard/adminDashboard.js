import { GET_USERS} from '../../constants'

export const getUsers = (users) => {
    return {
      type: GET_USERS,
      users 
    }
  }
  