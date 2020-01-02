import {
  requestApplicant,
  receivedApplicant,
  failureApplicant,
  receivedApplicantD,
  requestApplicantD,
  failureApplicantD,
  getMoreApplicants,
} from "./actions";

import { getCandidateDetails } from "../../api/users";
import { getJobApplicants } from "../../api/jobs";

export const fetchApplicants = (jobId, offset, status) => async dispatch => {
  try {
    dispatch(requestApplicant());
    const data = await getJobApplicants(jobId, offset, status);
    dispatch(receivedApplicant(data, jobId, offset, status));
  } catch (err) {
    dispatch(failureApplicant(err));
  }
};
export const fetchApplicantDetails = id => async dispatch => {
  try {
    dispatch(requestApplicantD());
    const data = await getCandidateDetails(id);
    dispatch(receivedApplicantD(data));
  } catch (err) {
    dispatch(failureApplicantD(err));
  }
};

export const fetchMoreApplicants = (
  jobId,
  offset,
  status,
) => async dispatch => {
  try {
    dispatch(requestApplicant());
    const data = await getJobApplicants(jobId, offset, status);

    dispatch(getMoreApplicants(data, jobId, offset, status));
  } catch (err) {
    dispatch(failureApplicant(err));
  }
};
