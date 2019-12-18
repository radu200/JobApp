import { REQUEST_MEMBERSHIP, RECEIVED_MEMBERSHIP, FAILURE_MEMBERSHIP } from './constants'
 
const initialState = {
    member:false,
    loading:null,
    err:null
}

export const  membershipReducer = (state = initialState, action) => { 
    switch(action.type){
       case  REQUEST_MEMBERSHIP:
           return {...state, loading:true}
        case RECEIVED_MEMBERSHIP:
            return {...state, loading:false, member:action.member }
        case FAILURE_MEMBERSHIP:
            return {...state, loading:false, err:true}
        default:
            return state
    }
}

