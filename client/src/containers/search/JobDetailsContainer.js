import React from "react";
import { compose } from "redux";
import JobDetails from "../../components/Pages/Jobs/JobDetails";
import {
  getSingleJob,
  getLoadingSelector,
  getErrSelector,
  appliedJobSelector,
} from "../../redux/jobs/selectors";
import { applyJob, fetchAppliedJobs } from "../../redux/jobs/operators";
import { connect } from "react-redux";
import withAuthJobSeeker from "../../HOC/auth/JobSeeker";

const JobDetailsContainer = ({
  job,
  applyJob,
  error,
  loading,
  jobStatus,
  appliedJob,
  fetchAppliedJobs,
  history,
  role,
}) => {
  const handleApplyJob = async id => {
    if (role && role === "jobseeker") {
      await applyJob(id);
      fetchAppliedJobs();
    } else {
      history.push("/login-err");
    }
  };

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
  );
};

const mapState = state => ({
  job: getSingleJob(state),
  loading: getLoadingSelector(state),
  error: getErrSelector(state),
  appliedJob: appliedJobSelector(state),
});

export default compose(
  withAuthJobSeeker,
  connect(mapState, { getSingleJob, applyJob, fetchAppliedJobs }),
)(JobDetailsContainer);
