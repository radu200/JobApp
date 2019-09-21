import axios from 'axios';
import { getJobs} from  '../actionCreators/Jobs'

export const fetchJobs = () => dispatch => {
  const offset = 0;
  const url = `/api/jobs?offset=${offset}`

  axios.get(url)
    .then(res => {
      dispatch(getJobs(res.data.jobs, res.data.auth))
    })
}