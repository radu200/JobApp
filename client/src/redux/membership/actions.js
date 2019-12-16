import { REQUEST_MEMBERSHIP, RECEIVED_MEMBERSHIP, FAILURE_MEMBERSHIP } from './constants'



export const requestMembership = () => {
    return {
        type:REQUEST_MEMBERSHIP,
    }
 }
 
 
export const receivedMembership = (member) => {
   return {
       type:RECEIVED_MEMBERSHIP,
       member
   }
}

export const failureMembership = err => {
    return {
        type:FAILURE_MEMBERSHIP,
        err
    }
}


