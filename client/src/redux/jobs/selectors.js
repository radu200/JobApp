import { createSelector } from "reselect";

export const getJobsSelector = state =>  state.jobs.jobs


export const getLoadingSelector = state => state.jobs.loading

export const getCurrentPageSelector = state => state.jobs.currentPage

export const getNextPageSelector = state => state.jobs.nextPage;

export const getPrevPageSelector = state => state.jobs.prevPage;


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