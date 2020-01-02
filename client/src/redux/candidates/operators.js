import {
  requestCandidate,
  receivedCandidate,
  failureCandidate,
  receivedCandidateD,
  requestCandidateD,
  failureCandidateD,
  getMoreCandidates,
  finished,
} from "./actions";
import { getCandidates, getCandidateDetails } from "../../api/users";

export const fetchCandidates = (
  location,
  category,
  experienceMax,
  page,
) => async dispatch => {
  try {
    dispatch(requestCandidate());
    const data = await getCandidates(location, category, experienceMax, page);
    dispatch(receivedCandidate(data, location, category, experienceMax, page));
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

export const fetchMoreCandidates = (
  location,
  category,
  experienceMax,
  page,
) => async dispatch => {
  try {
    dispatch(requestCandidate());
     const data = await getCandidates(location, category, experienceMax, page);
     if(data.length === 0){
       dispatch(finished())
     }else {
       dispatch(getMoreCandidates(data,location, category, experienceMax, page));
      }

  } catch (err) {
    console.log(err)
    dispatch(failureCandidate(err));
  }
};
