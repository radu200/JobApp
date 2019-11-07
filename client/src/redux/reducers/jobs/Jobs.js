import {GET_JOBS} from './../../actions/constants'

const initialState = {
    jobs:[],
    auth:''
}
 export  default (state = initialState, action) => {
     switch(action.type){
         case GET_JOBS:
             return {...state, jobs:action.jobs, auth:action.auth}
          default:
              return state;
     } 
}

