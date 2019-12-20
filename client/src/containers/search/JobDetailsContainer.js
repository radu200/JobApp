import React from 'react'
import JobDetails from '../../components/Pages/Jobs/JobDetails'
import { getSingleJob } from '../../redux/jobs/selectors'
import {connect } from 'react-redux'

const JobDetailsContainer = ({job}) => {
   
    return (
        <>
           <JobDetails job={job}/>
        </>
    )
}

const mapState = (state)=> ({
    job:getSingleJob(state)
})

export default connect(mapState, {getSingleJob})(JobDetailsContainer)