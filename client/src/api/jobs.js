import * as  axios from "axios";
const instance  = axios.create()

export const  getJobs = (offset) => {
    const res = instance.get(`/api/jobs?offset=${offset}`)
    return res.data
}


export const  searchJobs = (query, location) => {
    const res = instance.get(`/api/search/job?search_query=${query}&location=${location}`)
   return res.data
}



///jobseeker applications
export const getJobseekerApplications = async (offset) => {
    const res = await instance.post(`/api/job-application/jobseeker`,{offset:offset})
    return res.data
}

//candidate applied for job
export const applicantShortList = async (jobId, offset) => {
    const res = await instance.post(`/api/job-application/applicants/shortlist/${jobId}`,{
       offset:offset })
      return res.data
}

export const applicantRejected = async (jobId, offset) => {
    const res = await instance.post(`/api/job-application/applicants/rejected/${jobId}`,{
       offset:offset })
      return res.data
}
export const applicantActive = async (jobId, offset) => {
    const res = await instance.post(`/api/job-application/applicants/active/${jobId}`,{
       offset:offset })
      return res.data
}