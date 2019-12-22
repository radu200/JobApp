import React from 'react'
import JobDetails from '../../components/Pages/Jobs/JobDetails'
import { getSingleJob, getLoadingSelector, getErrSelector,appliedJobSelector} from '../../redux/jobs/selectors'
import { applyJob, fetchAppliedJobs } from '../../redux/jobs/operators'
import {connect } from 'react-redux'


const JobDetailsContainer = ({job, applyJob,error, loading, jobStatus, appliedJob,  fetchAppliedJobs}) => {
    
    const handleApplyJob = async (id) => {
            await applyJob(id)
            fetchAppliedJobs()

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