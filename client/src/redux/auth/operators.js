import {requestRole, receivedRole, failureRole} from "./actions";
import axios from "axios";
const instance = axios.create()

export const fetchRole = () => dispatch => {
  
  const url = `/api/auth/me`;

  dispatch(requestRole());
    instance.get(url)
 
    .then(res => {
      const role = res.data.role
      const auth = res.data.auth
      dispatch(receivedRole(role, auth));
    })
    .catch(err => {
      dispatch(failureRole(err));
    });
};
