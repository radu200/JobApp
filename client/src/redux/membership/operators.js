import {requestMembership, receivedMembership, failureMembership} from "./actions";
import { membership} from '../../api/membership'


export const fetchMembership = () => async  dispatch => {

  try{
    dispatch(requestMembership());
    const data = await  membership()
    const { member } = data
    dispatch(receivedMembership(member));
  } catch(err){
    dispatch(failureMembership(err));
  }
 
};
