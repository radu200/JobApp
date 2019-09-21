import { GET_JOBS} from '../constants'

export const getJobs = (jobs, auth) => {
  return {
    type: GET_JOBS,
    jobs: jobs,
    auth: auth
  }

}
