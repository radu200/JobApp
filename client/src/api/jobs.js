import { instanceAPI } from "./InstanceApi";

export const getJobs = async (location, category, page) => {
  const url = `/api/search/job?location=${location}&search_query=${category}&page=${page}`;
  const res = await instanceAPI.post(url);
  return res.data;
};

export const postApplyJob = async jobId => {
  const url = `/api/apply/job?job_id=${jobId}`;
  const res = await instanceAPI.post(url);
  return res;
};

export const checkAppliedJobs = async () => {
  const url = `/api/job/applied`;
  const res = await instanceAPI.get(url);
  return res.data;
};

///jobseeker applications
export const getJobseekerApplications = async offset => {
  const res = await instanceAPI.post(`/api/job-application/jobseeker`, {
    offset: offset,
  });
  return res;
};

export const  getJobApplicants = async (jobId, offset, status) => {
  const res = await instanceAPI.get(`/api/job-applicants?job_id=${jobId}&offset=${offset}&status=${status}`);
  return res.data;
};
