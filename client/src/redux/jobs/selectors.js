import { createSelector } from "reselect";

export const getJobsSelector = state =>  state.jobs.jobs


export const getLoadingSelector = state => state.jobs.loading

export const getErrSelector = state => state.jobs.err

export const getCurrentPageSelector = state => state.jobs.currentPage

export const getNextPageSelector = state => state.jobs.nextPage;

export const getPrevPageSelector = state => state.jobs.prevPage;


const  appliedJobs = state => state.jobs.appliedJobs



const pageSize = state => state.jobs.pageSize

const totalRec = state => state.jobs.totalCount

const jobId = state => state.jobs.jobId

export const getSingleJob = createSelector(
    jobId,
    getJobsSelector,
     (id, jobs) => {
        return jobs.find(job => job ? job.id === id : null) 
     } 
     
)
export const appliedJobSelector = createSelector(
    getSingleJob,
    appliedJobs,
    (job,appliedJob) => {
       const jobId =  appliedJob.find(j => j && j.job_id === job.id ? j.job_id : null )
       if(jobId !== undefined && jobId !== null){
           return true
       } else {
           return false
       }
    }
)
export const getPageNumSelector = createSelector(
     pageSize,
     totalRec,
     (size, total) => {
         const totalPage = Math.ceil(total/size)
         const pages = []
         for(let i = 1; i <= totalPage; i++){
             pages.push(i)
         }
        return pages
     }
)