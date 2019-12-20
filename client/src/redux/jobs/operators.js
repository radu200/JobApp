import {requestJobs, receivedJobs, failureJobs,} from "./actions";
import {postSearchJobs} from '../../api/jobs'


export const fetchJobs =  (location,category,page) =>  async dispatch => {
  try{
      dispatch(requestJobs());
      const data = await postSearchJobs(location,category,page)
      dispatch(receivedJobs(data));
  } catch(err){
      dispatch(failureJobs(err));
  }
  
};

