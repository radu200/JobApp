import {
  REQUEST_CANDIDATE,
  RECEIVED_CANDIDATE,
  FAILURE_CANDIDATE,
  REQUEST_CANDIDATE_D,
  RECEIVED_CANDIDATE_D,
  FAILURE_CANDIDATE_D,
  GET_MORE_CANDIDATES,
  NO_MORE_CANDIDATES,
} from "./constants";

//candidate list
export const requestCandidate = () => {
  return {
    type: REQUEST_CANDIDATE,
  };
};

export const receivedCandidate = (
  data,
  location,
  category,
  experienceMax,
  page,
) => {
  return {
    type: RECEIVED_CANDIDATE,
    data,
    location,
    category,
    experienceMax,
    page,
  };
};

export const failureCandidate = err => {
  return {
    type: FAILURE_CANDIDATE,
    err,
  };
};

export const getMoreCandidates = (
  data,
  location,
  category,
  experienceMax,
  page,
) => {
  return {
    type: GET_MORE_CANDIDATES,
    data,
    location,
    category,
    experienceMax,
    page,
  };
};

export const noMoreCandidates = () => {
  return {
    type: NO_MORE_CANDIDATES,
  };
};
///candidate details
export const requestCandidateD = () => {
  return {
    type: REQUEST_CANDIDATE_D,
  };
};

export const receivedCandidateD = data => {
  return {
    type: RECEIVED_CANDIDATE_D,
    data,
  };
};

export const failureCandidateD = err => {
  return {
    type: FAILURE_CANDIDATE_D,
    err,
  };
};
