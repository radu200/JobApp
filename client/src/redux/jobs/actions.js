import { REQUEST_JOBS, RECEIVED_JOBS, FAILURE_JOBS } from './constants'



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

