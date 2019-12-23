import { REQUEST_CANDIDATE, RECEIVED_CANDIDATE, FAILURE_CANDIDATE } from './constants';
 
const initialState = {
    candidates:[],
    loading:false,
    err:false
}

export const  candidatesReducer = (state = initialState, action) => { 
    switch(action.type){
       case  REQUEST_CANDIDATE:
           return {...state, loading:true}
        case RECEIVED_CANDIDATE:
            return {...state, loading:false, candidates:action.data}
        case FAILURE_CANDIDATE:
            return {...state, loading:false,  err:true}
        default:
            return state
    }
}

