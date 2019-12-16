import { combineReducers } from 'redux'
import { authReducer } from './auth/reducers'
import { membershipReducer } from './membership/reducers'

const rootReducer = combineReducers ({
    auth:authReducer,
    member:membershipReducer
})

export default rootReducer;