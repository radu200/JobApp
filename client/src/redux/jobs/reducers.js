import { REQUEST_JOBS, RECEIVED_JOBS, FAILURE_JOBS, GET_JOB_ID, APPLY_JOB_SUCCESS, CHECK_APPLIED_JOBS} from './constants'
 
const jobsState = {
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

export const  jobsReducer = (state = jobsState, action) => { 
    switch(action.type){
       case  REQUEST_JOBS:
           return {...state, loading:true}
        case RECEIVED_JOBS:
            const { jobs, total, current, next, previous } = action.jobs
            return {...state, loading:false, 
                    jobs:jobs, 
                    totalCount:total.jobs,
                    pageSize:total.limit,
                    currentPage:current.page,
                    nextPage:next ? next.page : null,
                    prevPage:previous ? previous.page : null}

        case FAILURE_JOBS:
            return {...state, loading:false, err:action.err}
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

