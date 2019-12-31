import React, { Component } from "react";
import { cities } from "../../api/cities";
import { categories } from "../../api/categories";
import { validate } from "../../Utils/validation";
import withAuthEmployer from "../../HOC/auth/Employer";
import CandidatesPage from "../../components/Pages/candidates/CandidatesPage";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  fetchCandidates,
  fetchCandidatesDetails,
  fetchMoreCandidates,
} from "../../redux/candidates/operators";

class CandidatesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      location: "",
      experienceMax: 50,
      formErrors: {
        categoryError: "",
        locationError: "",
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleExperienceValue = this.handleExperienceValue.bind(this);
    this.handleCandidateDetails = this.handleCandidateDetails.bind(this);
    this.getMore = this.getMore.bind(this);
  }

  componentDidMount() {
    const { fetchCandidates, history } = this.props;

    fetchCandidates("Chisinau", "Barista si Barman", 50, 0);
  }

  getMore() {
    const {
      currLocation,
      currPage,
      currCategory,
      currExperienceMax,
      limit,
    } = this.props.candidatesState;

    const nextPage = currPage + limit;

    this.props.fetchMoreCandidates(
      currLocation,
      currCategory,
      currExperienceMax,
      nextPage,
    );
  }

  handleExperienceValue(event) {
    this.setState({ experienceMax: event.target.value });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  async handleCandidateDetails(id) {
    const { fetchCandidatesDetails } = this.props;
    fetchCandidatesDetails(id);
  }

  async handleSubmit(event) {
    event.preventDefault();

    // const isValid = this.validate();
    const { location, category, experienceMax } = this.state;
    this.props.fetchCandidates(location, category, experienceMax, 0);

    const locationVal = validate(location);
    const categoryVal = validate(category);
  }

  render() {
    const {
      category,
      experienceMax,
      // candidates,
      location,
      formErrors,
    } = this.state;

    const {
      handleSubmit,
      handleInputChange,
      handleExperienceValue,
      getMore,
      handleCandidateDetails,
    } = this;

    const {
      candidates,
      loadingCl,
      candidate,
      experience,
      loadingCd,
    } = this.props;
    return (
      <>
        <CandidatesPage
          formErrors={formErrors}
          candidateDetails={candidate}
          experience={experience}
          loadingCd={loadingCd}
          candidates={candidates}
          category={category}
          location={location}
          cities={cities}
          categories={categories}
          experienceMax={experienceMax}
          getMoreCandidates={getMore}
          handleExperienceValue={handleExperienceValue}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          handleCandidateDetails={handleCandidateDetails}
          loadingCl={loadingCl}
        />
      </>
    );
  }
}
const mapState = state => ({
  candidates: state.candidates.candidates,
  candidatesState: state.candidates,
  candidate: state.candidate.candidate,
  experience: state.candidate.experience,
  loadingCd: state.candidate.loading,
  loadingCl: state.candidates.loading,
});
export default compose(
  // withAuthEmployer,
  connect(mapState, {
    fetchCandidates,
    fetchCandidatesDetails,
    fetchMoreCandidates,
  }),
)(CandidatesContainer);
