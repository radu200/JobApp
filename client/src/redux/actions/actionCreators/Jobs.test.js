import { GET_JOBS} from '../constants'
import {getJobs} from './Jobs'

describe('getJobs actions', () => {
  it('getJobs create GET_JOB action', () => {
    expect(getJobs('data', 'auth')).toEqual({
      type: GET_JOBS,
      jobs: 'data',
      auth: 'auth'
    })
  })
})