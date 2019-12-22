import {requestJobs, receivedJobs, failureJobs, applyJobSuccess,appliedJobs  } from "./actions";
import {getJobs, postApplyJob, checkAppliedJobs} from '../../api/jobs'


export const fetchJobs =  (location = "",category = "",page = 1) =>  async dispatch => {
  try{
      dispatch(requestJobs());
      const data = await getJobs(location,category,page)
      dispatch(receivedJobs(data));
  } catch(err){
      dispatch(failureJobs(err));
  }
  
};



export const applyJob =  (jobId) =>  async dispatch => {
  try{
    dispatch(requestJobs());
    const res = await postApplyJob(jobId)
    if(res.status === 200){
      dispatch(applyJobSuccess(true))
    }
  } catch(err){
      dispatch(failureJobs(err));
  }
};

export const fetchAppliedJobs =  () =>  async dispatch => {
  try{
    dispatch(requestJobs());
    const data = await checkAppliedJobs()
    dispatch(appliedJobs (data))
  } catch(err){
      dispatch(failureJobs(err));
  }
};