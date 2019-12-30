import {
  REQUEST_CANDIDATE,
  RECEIVED_CANDIDATE,
  FAILURE_CANDIDATE,
  REQUEST_CANDIDATE_D,
  RECEIVED_CANDIDATE_D,
  FAILURE_CANDIDATE_D,
} from "./constants";

//candidate list
export const requestCandidate = () => {
  return {
    type: REQUEST_CANDIDATE,
  };
};

export const receivedCandidate = data => {
  return {
    type: RECEIVED_CANDIDATE,
    data,
  };
};

export const failureCandidate = err => {
  return {
    type: FAILURE_CANDIDATE,
    err,
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
