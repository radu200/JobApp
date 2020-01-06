import { combineReducers } from "redux";
import { authReducer } from "./auth/reducers";
import { membershipReducer } from "./membership/reducers";
import { jobsReducer } from "./jobs/reducers";
import { candidatesReducer, candidatesDReducer } from "./candidates/reducers";
import { applicantsReducer, applicantDReducer } from "./JobApplicants/reducers";
import { roomsReducer, roomDReducer, createRoomReducer } from "./chat/reducers"

const rootReducer = combineReducers({
  auth: authReducer,
  member: membershipReducer,
  jobs: jobsReducer,
  candidates: candidatesReducer,
  candidate: candidatesDReducer,
  applicants: applicantsReducer,
  applicant: applicantDReducer,
  chatRooms : roomsReducer,
  chatRoomD : roomDReducer,
  createRoom: createRoomReducer
});

export default rootReducer;
