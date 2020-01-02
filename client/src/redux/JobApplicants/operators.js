import {
  requestApplicant,
  receivedApplicant,
  failureApplicant,
  receivedApplicantD,
  requestApplicantD,
  failureApplicantD,
  getMoreApplicants,
  finished,
  applicantStatus,
} from "./actions";

import { getCandidateDetails } from "../../api/users";
import { getJobApplicants, postStatusApplicant } from "../../api/jobs";

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
     if(data.length === 0){
       dispatch(finished())
     }else{
       dispatch(getMoreApplicants(data, jobId, offset, status));
     }
  } catch (err) {
    dispatch(failureApplicant(err));
  }
};

export const postApplicantStatus = (userId, status) => async dispatch => {
  try {
    dispatch(requestApplicant());
    const res = await postStatusApplicant(userId, status)
    if(res.status === 200){
      dispatch(applicantStatus(userId))
    }
  } catch (err) {
    dispatch(failureApplicant(err));
  }   
}