import {requestRole, receivedRole, failureRole} from "./actions";
import {authRole} from '../../api/auth'


export const fetchRole = () => async dispatch => {  
   try{
     dispatch(requestRole());
     const data = await authRole()
     const { role, auth } = data
     dispatch(receivedRole(role, auth));
   } catch(err){
     dispatch(failureRole(err));
   }
};
