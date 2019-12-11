import { REQUEST_ROLE, RECEIVED_ROLE, FAILURE_ROLE } from './constants';
 
const initialState = {
    role:null,
    auth:null,
    loading:null,
    err:null
}

export const  authReducer = (state = initialState, action) => { 
    switch(action.type){
       case  REQUEST_ROLE:
           return {...state, loading:true}
        case RECEIVED_ROLE:
            return {...state, loading:false, auth:action.auth, role:action.role, }
        case FAILURE_ROLE:
            return {...state, loading:false, auth:false, err:true}
        default:
            return state
    }
}

