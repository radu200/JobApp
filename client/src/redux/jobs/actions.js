import { REQUEST_JOBS, RECEIVED_JOBS, FAILURE_JOBS, GET_JOB_ID } from './constants'



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