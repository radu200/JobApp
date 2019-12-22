import React from 'react'
import JobDetails from '../../components/Pages/Jobs/JobDetails'
import { getSingleJob, getLoadingSelector, getErrSelector,appliedJobSelector} from '../../redux/jobs/selectors'
import { applyJob, fetchAppliedJobs } from '../../redux/jobs/operators'
import {connect } from 'react-redux'


const JobDetailsContainer = ({job, applyJob,error, loading, jobStatus, appliedJob,  fetchAppliedJobs, history}) => {
    
    const handleApplyJob = async (id) => {
        //check fo auth
        const data = JSON.parse(localStorage.getItem('state'))
        if(data && data.auth.role === 'jobseeker'){
            await applyJob(id)
             fetchAppliedJobs() 
        } else {
           history.push('/login-err')
        }

    }
 
    return (
        <>
           <JobDetails
              job={job} 
              handleApplyJob={handleApplyJob}
              jobStatus={jobStatus}
              error={error}
              appliedJob={appliedJob}
              loading={loading}
             />
        </>
    )
}

const mapState = (state)=> ({
    job:getSingleJob(state),
    loading:getLoadingSelector(state),
    error:getErrSelector(state),
    appliedJob:appliedJobSelector(state)
})

export default connect(mapState, {getSingleJob, applyJob, fetchAppliedJobs})(JobDetailsContainer)