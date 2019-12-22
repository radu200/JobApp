import { REQUEST_JOBS, RECEIVED_JOBS, FAILURE_JOBS, GET_JOB_ID, APPLY_JOB_SUCCESS, CHECK_APPLIED_JOBS} from './constants'
 
const initialState = {
    jobs:[],
    appliedJobs:[],
    loading:false,
    err:false,
    totalCount:0,
    currentPage:1,
    nextPage:0,
    prevPage:0,
    pageSize:0,
    jobId:null,
    
}

export const  jobsReducer = (state = initialState, action) => { 
    switch(action.type){
       case  REQUEST_JOBS:
           return {...state, loading:true}
        case RECEIVED_JOBS:
            return {...state, loading:false, 
                    jobs:action.jobs.jobs, 
                    totalCount:action.jobs.total.jobs,
                    pageSize:action.jobs.total.limit,
                    currentPage:action.jobs.current.page,
                    nextPage:action.jobs.next ? action.jobs.next.page : null,
                    prevPage:action.jobs.previous ? action.jobs.previous.page : null}

        case FAILURE_JOBS:
            return {...state, loading:false, err:true}
        case GET_JOB_ID:
             return {...state, jobId:action.id}
        case APPLY_JOB_SUCCESS:
             return {...state, loading:false}
        case  CHECK_APPLIED_JOBS:
             return {...state, loading:false, appliedJobs:action.data}
        default:
            return state
    }
}

