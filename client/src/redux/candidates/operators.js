import {
  requestCandidate,
  receivedCandidate,
  failureCandidate,
  receivedCandidateD,
  requestCandidateD,
  failureCandidateD,
} from "./actions";
import { getCandidates, getCandidateDetails } from "../../api/users";

export const fetchCandidates = () => async dispatch => {
  try {
    dispatch(requestCandidate());
    const data = await getCandidates();
    dispatch(receivedCandidate(data));
  } catch (err) {
    dispatch(failureCandidate(err));
  }
};
export const fetchCandidatesDetails = id => async dispatch => {
  try {
    dispatch(requestCandidateD());
    const data = await getCandidateDetails(id);
    dispatch(receivedCandidateD(data));
  } catch (err) {
    dispatch(failureCandidateD(err));
  }
};
