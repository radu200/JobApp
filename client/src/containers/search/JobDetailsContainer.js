import React from 'react'
import JobDetails from '../../components/Pages/Jobs/JobDetails'
import { getSingleJob, getApplyJobStatus, getLoadingSelector, getErrSelector,appliedJobSelector} from '../../redux/jobs/selectors'
import { applyJob, fetchAppliedJobs } from '../../redux/jobs/operators'
import {connect } from 'react-redux'


const JobDetailsContainer = ({job, applyJob,error, loading, jobStatus, appliedJob, history}) => {
    
    const handleApplyJob = async (id) => {
            await applyJob(id)
            console.log('status',jobStatus)
            console.log(appliedJob)

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
    jobStatus:getApplyJobStatus(state),
    loading:getLoadingSelector(state),
    error:getErrSelector(state),
    appliedJob:appliedJobSelector(state)
})

export default connect(mapState, {getSingleJob, applyJob, fetchAppliedJobs})(JobDetailsContainer)