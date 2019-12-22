import {
     REQUEST_JOBS,
     RECEIVED_JOBS, 
     FAILURE_JOBS, 
     GET_JOB_ID,
     APPLY_JOB, 
     APPLY_JOB_SUCCESS, 
     CHECK_APPLIED_JOBS
} from './constants'



export const requestJobs = () => {
    return {
        type:REQUEST_JOBS,
    }
 }
 
 
export const receivedJobs = (jobs) => {
   return {
       type:RECEIVED_JOBS,
       jobs
   }
}

export const failureJobs = err => {
    return {
        type:FAILURE_JOBS,
        err
    }
}

export const getJobId = id => {
    return {
         type:GET_JOB_ID,
         id
    }
}

export const applyJob = id => {
    return {
        type:APPLY_JOB,
        id
    }
}

export const applyJobSuccess = data => {
    return {
        type:APPLY_JOB_SUCCESS,
        data
    }
}


export const appliedJobs = data => {
    return {
       type:CHECK_APPLIED_JOBS,
       data
    }
}