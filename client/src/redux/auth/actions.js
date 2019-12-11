import { REQUEST_ROLE, RECEIVED_ROLE, FAILURE_ROLE } from './constants'



export const requestRole = () => {
    return {
        type:REQUEST_ROLE,
    }
 }
 
 
export const receivedRole = (role, auth) => {
   return {
       type:RECEIVED_ROLE,
       role,
       auth
   }
}

export const failureRole = err => {
    return {
        type:FAILURE_ROLE,
        err
    }
}


