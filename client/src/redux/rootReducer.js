import { combineReducers } from 'redux'
import { authReducer } from './auth/reducers'
import { membershipReducer } from './membership/reducers'
import { jobsReducer } from './jobs/reducers'

const rootReducer = combineReducers ({
    auth:authReducer,
    member:membershipReducer,
    jobs:jobsReducer
})

export default rootReducer;