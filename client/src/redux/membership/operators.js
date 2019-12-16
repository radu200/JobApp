import {requestMembership, receivedMembership, failureMembership} from "./actions";
import axios from "axios";
const instance = axios.create()

export const fetchMembership = () => dispatch => {
  
  const url = `/api/membership`;

  dispatch(requestMembership());
    instance.get(url)
 
    .then(res => {
      const member = res.data.member
      dispatch(receivedMembership(member));
    })
    .catch(err => {
      dispatch(failureMembership(err));
    });
};
