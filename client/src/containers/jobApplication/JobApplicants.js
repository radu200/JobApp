import React, { Component } from "react";
import { connect } from "react-redux";
import ApplicantsPage from "../../components/Pages/candidates/JobApplicantsPage";
import {
  fetchApplicants,
  fetchApplicantDetails,
  fetchMoreApplicants,
  postApplicantStatus
} from "../../redux/JobApplicants/operators";

class Applicants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      status: "active",
    };
    this.handleApplicantDetails = this.handleApplicantDetails.bind(this);
    this.getMore = this.getMore.bind(this);
    this.handleReject = this.handleReject.bind(this);
    this.handleShortList = this.handleShortList.bind(this);
  }

  async componentDidMount() {
    const { match, fetchApplicants } = this.props;
    const { offset } = this.state;
    const jobId = match.params.id;
    const status = match.params.status;
    fetchApplicants(jobId, offset, status);
  }

  componentDidUpdate(prevProps) {
    const { match, fetchApplicants } = this.props;
    const { offset } = this.state;
    const jobId = match.params.id;
    const status = match.params.status;

    if (prevProps.match.params.status !== status) {
      fetchApplicants(jobId, offset, status);
    }
  }

  async handleApplicantDetails(id) {
    const { fetchApplicantDetails } = this.props;
    fetchApplicantDetails(id);
  }
  getMore() {
    const { jobId, currOffset, limit, status } = this.props.applicantsState;

    const nextPage = currOffset + limit;

    this.props.fetchMoreApplicants(jobId, nextPage, status);
  }

  handleReject(userId) {
    const status = 'rejected'
    this.props.postApplicantStatus(userId,status)
  }

  handleShortList(userId) {
    const status = 'shortlist'
    this.props.postApplicantStatus(userId,status)

  }
  render() {
    const {
      applicants,
      applicant,
      experience,
      loadingAd,
      loadingAl,
      disable,
      applicantsState,
    } = this.props;
    const {
      getMore,
      handleApplicantDetails,
      handleReject,
      handleShortList,
    } = this;
    return (
      <div>
        <ApplicantsPage
          candidateDetails={applicant}
          experience={experience}
          candidates={applicants}
          getMoreCandidates={getMore}
          handleCandidateDetails={handleApplicantDetails}
          loadingCd={loadingAd}
          loadingCl={loadingAl}
          disable={disable}
          jobId={applicantsState.jobId}
          reject={handleReject}
          shortList={handleShortList}
        />
      </div>
    );
  }
}

const mapState = state => ({
  applicants: state.applicants.applicants,
  applicantsState: state.applicants,
  applicant: state.applicant.applicant,
  experience: state.applicant.experience,
  loadingAd: state.applicant.loading,
  loadingAl: state.applicants.loading,
  disable: state.applicants.disable,
});

export default connect(mapState, {
  fetchApplicants,
  fetchApplicantDetails,
  fetchMoreApplicants,
  postApplicantStatus
})(Applicants);
