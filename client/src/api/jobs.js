import * as  axios from "axios";
const instance  = axios.create()

export const  getJobs = async (offset) => {
    const res = await instance.post(`/api/jobs`,{offset})
    return res.data
}


export const searchJobs = async  (query, location, offset) => {
    const url = `/api/search/job?search_query=${query}&location=${location}`
    const res =  await instance.post(url,{offset:offset})
    return res.data
}

export const getMoreJobs = async (url, offset) => {
    const res =  await instance.post(url, {
        offset
    })
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