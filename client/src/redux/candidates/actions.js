import { REQUEST_CANDIDATE, RECEIVED_CANDIDATE, FAILURE_CANDIDATE } from './constants'



export const requestCandidate = () => {
    return {
        type:REQUEST_CANDIDATE,
    }
 }
 
 
export const receivedCandidate = (data) => {
   return {
       type:RECEIVED_CANDIDATE,
       data
   }
}

export const failureCandidate = err => {
    return {
        type:FAILURE_CANDIDATE,
        err
    }
}


