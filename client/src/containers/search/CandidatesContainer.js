import React, { Component } from "react";
import queryString from "query-string";
import { cities } from "../../api/cities";
import { categories } from "../../api/categories";
import { getCandidates, getCandidateDetails } from "../../api/users";
import { validate } from "../../Utils/validation";
import withAuthEmployer from "../../HOC/auth/Employer";
import CandidatesPage from "../../components/Pages/candidates/CandidatesPage";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  fetchCandidates,
  fetchCandidatesDetails,
} from "../../redux/candidates/operators";

class CandidatesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: [],
      candidateDetails: [],
      experience: [],
      offset: 0,
      category: "Barista si Barman",
      location: "Chisinau",
      experienceMax: 50,
      url: "",
      formErrors: {
        categoryError: "",
        locationError: "",
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleExperienceValue = this.handleExperienceValue.bind(this);
    this.handleCandidateDetails = this.handleCandidateDetails.bind(this);
  }

  componentDidMount() {
    const { fetchCandidates } = this.props;
    fetchCandidates();
    // fetchCandidatesDetails(parseInt(data.id));

    // const { location, category, experienceMax } = this.state;
    // let offset;
    // // const data = await getCandidates(
    // //   location,
    // //   category,
    // //   experienceMax,
    // //   (offset = 0),
    // // );

    // this.setState({
    //   candidates: [...data.candidates],
    //   offset: offset + 12,
    // });
    // let location, category, experienceMax, offset;
    // try {
    //   const data = await getCandidates(
    //     location = "Chisinau",
    //     category = "Frumusete si Bunastare",
    //     experienceMax = 10,
    //     offset = 0
    //   );
    //   this.setState({
    //     candidates: [...data.candidates],
    //     offset: offset + 12
    //   });
    // } catch (error) {
    //   console.error(error);
    // }
  }

  getMoreCandidates = async () => {
    const {
      offset,
      candidates,
      location,
      category,
      experienceMax,
    } = this.state;
    try {
      const data = await getCandidates(
        location,
        category,
        experienceMax,
        offset,
      );

      this.setState({
        candidates: [...candidates, ...data.candidates],
        offset: offset + 12,
      });
    } catch (error) {
      console.error(error);
    }
  };

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
    // try {
    //   const data = await getCandidateDetails(id);
    //    console.log(data)
    //   this.setState({
    //       candidateDetails: data.candidate,
    //       experience: data.experience
    //     });

    // } catch (err) {
    //   console.log(err);
    // }
  }

  async handleSubmit(event) {
    event.preventDefault();

    // const isValid = this.validate();
    const { location, category, experienceMax } = this.state;
    const locationVal = validate(location);
    const categoryVal = validate(category);

    // if (categoryVal.status && locationVal.status) {
    let offset;
    try {
      const data = await getCandidates(
        location,
        category,
        experienceMax,
        (offset = 0),
      );

      this.setState({
        candidates: [...data.candidates],
        offset: offset + 12,
      });
    } catch (error) {
      console.error(error);
    }
    // this.setState(prevState => ({
    //   formErrors: {
    //     ...prevState.formErrors,
    //     locationError: "",
    //     categoryError: ""
    //   }
    // }));
    // } else {
    //   this.setState(prevState => ({
    //     formErrors: {
    //       ...prevState.formErrors,
    //       locationError: locationVal.error,
    //       categoryError: categoryVal.error
    //     }
    //   }));
    // }
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
      getMoreCandidates,
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
      <div>
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
          getMoreCandidates={getMoreCandidates}
          handleExperienceValue={handleExperienceValue}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          handleCandidateDetails={handleCandidateDetails}
          loadingCl={loadingCl}
        />
      </div>
    );
  }
}
const mapState = state => ({
  candidates: state.candidates.candidates.candidates,
  candidate: state.candidate.candidate,
  experience: state.candidate.experience,
  loadingCd: state.candidate.loading,
  loadingCl: state.candidates.loading,
});
export default compose(
  withAuthEmployer,
  connect(mapState, { fetchCandidates, fetchCandidatesDetails }),
)(CandidatesContainer);
