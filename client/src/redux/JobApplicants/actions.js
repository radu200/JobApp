import {
  REQUEST_APPLICANT,
  RECEIVED_APPLICANT,
  FAILURE_APPLICANT,
  REQUEST_APPLICANT_D,
  RECEIVED_APPLICANT_D,
  FAILURE_APPLICANT_D,
  GET_MORE_APPLICANTS,
} from "./constants";

//candidate list
export const requestApplicant = () => {
  return {
    type: REQUEST_APPLICANT,
  };
};

export const receivedApplicant = (data, jobId, offset, status) => {
  return {
    type: RECEIVED_APPLICANT,
    data,
    jobId,
    offset,
    status,
  };
};

export const failureApplicant = err => {
  return {
    type: FAILURE_APPLICANT,
    err,
  };
};

export const getMoreApplicants = (data, jobId, offset, status) => {
  return {
    type: GET_MORE_APPLICANTS,
    data,
    jobId,
    offset,
    status,
  };
};

///candidate details
export const requestApplicantD = () => {
  return {
    type: REQUEST_APPLICANT_D,
  };
};

export const receivedApplicantD = data => {
  return {
    type: RECEIVED_APPLICANT_D,
    data,
  };
};

export const failureApplicantD = err => {
  return {
    type: FAILURE_APPLICANT_D,
    err,
  };
};
