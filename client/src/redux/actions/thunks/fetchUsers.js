import axios from 'axios';
import { getUsers} from  '../actionCreators/dashboard/adminDashboard'


export const fetchUsers = () => dispatch => {
    const offset = 0;
    const url = `/api/admin/users`
  
    axios.get(url)
      .then(res => {
          console.log(res)
        // dispatch(getUsers(res.data,))
      })
  }