import { combineReducers } from "redux";
import { authReducer } from "./auth/reducers";
import { membershipReducer } from "./membership/reducers";
import { jobsReducer } from "./jobs/reducers";
import { candidatesReducer, candidatesDReducer } from "./candidates/reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  member: membershipReducer,
  jobs: jobsReducer,
  candidates: candidatesReducer,
  candidate: candidatesDReducer,
});

export default rootReducer;
