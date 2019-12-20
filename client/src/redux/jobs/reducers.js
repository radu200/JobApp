import { REQUEST_JOBS, RECEIVED_JOBS, FAILURE_JOBS, GET_JOB_ID} from './constants'
 
const initialState = {
    jobs:[],
    loading:null,
    err:null,
    totalCount:0,
    currentPage:1,
    nextPage:0,
    prevPage:0,
    pageSize:0,
    jobId:null
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
        default:
            return state
    }
}

