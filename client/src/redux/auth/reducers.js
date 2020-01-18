import { REQUEST_ROLE, RECEIVED_ROLE, FAILURE_ROLE } from './constants';
 
const initialState = {
    role:null,
    auth:null,
    user_id:null,
    loading:false,
    err:false
}

export const  authReducer = (state = initialState, action) => { 
    switch(action.type){
       case  REQUEST_ROLE:
           return {...state, loading:true}
        case RECEIVED_ROLE:
            const { role, auth, user_id } = action.data
            return {...state, loading:false, auth, role, user_id }
        case FAILURE_ROLE:
            return {...state, loading:false, auth:false, err:true}
        default:
            return state
    }
}

