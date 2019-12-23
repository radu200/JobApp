import {requestCandidate, receivedCandidate, failureCandidate} from "./actions";
import {getCandidates} from '../../api/users'


export const fetchCandidates = () => async dispatch => {  
   try{
     dispatch(requestCandidate());
     const data = await getCandidates()
     dispatch(receivedCandidate(data));
   } catch(err){
     dispatch(failureCandidate(err));
   }
};
