import { REQUEST_JOBS, RECEIVED_JOBS, FAILURE_JOBS } from './constants'
 
const initialState = {
    jobs:[],
    loading:null,
    err:null,
    totalCount:0,
    currentPage:1
}

export const  jobsReducer = (state = initialState, action) => { 
    switch(action.type){
       case  REQUEST_JOBS:
           return {...state, loading:true}
        case RECEIVED_JOBS:
            return {...state, loading:false, 
                    jobs:action.jobs.jobs, 
                    totalCount:action.jobs.total.jobs,
                    currentPage:action.jobs.current.page }
        case FAILURE_JOBS:
            return {...state, loading:false, err:true}
        default:
            return state
    }
}

