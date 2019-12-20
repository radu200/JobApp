import {requestJobs, receivedJobs, failureJobs} from "./actions";
import { getJobs } from '../../api/jobs'

export const fetchJobs =  (page) =>  async dispatch => {
  try{
      dispatch(requestJobs());
      const data = await getJobs(page)
      dispatch(receivedJobs(data));
  } catch(err){
      dispatch(failureJobs(err));
  }
  
};
