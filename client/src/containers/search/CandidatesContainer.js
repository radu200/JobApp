import React, { Component } from "react";
import { cities } from "../../api/cities";
import { categories } from "../../api/categories";
import { validate, validateNum } from "../../Utils/validation";
import CandidatesPage from "../../components/Pages/candidates/CandidatesPage";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  fetchCandidates,
  fetchCandidatesDetails,
  fetchMoreCandidates,
} from "../../redux/candidates/operators";
import { fetchCreateRoom } from "../../redux/chat/operators";
import { socket } from "../../config/socket.io";


class CandidatesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      location: "",
      experienceMax: 0,
      offset: 0,
      formErrors: {
        location: "",
        category: "",
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleExperienceValue = this.handleExperienceValue.bind(this);
    this.handleCandidateDetails = this.handleCandidateDetails.bind(this);
    this.getMore = this.getMore.bind(this);
    this.handleChat = this.handleChat.bind(this);
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
    const { location, category, experienceMax, offset } = this.state;
    const categoryVal = validate(category);
    const locationVal = validate(location);
    const expMax = validateNum(experienceMax);

    if (locationVal.status && categoryVal.status && expMax.status) {
      this.props.fetchCandidates(location, category, experienceMax, offset);

      this.setState(prevState => ({
        formErrors: {
          ...prevState.formErrors,
          location: "",
          category: "",
          experienceMax: 0,
        },
      }));
    }

    this.setState(prevState => ({
      formErrors: {
        ...prevState.formErrors,
        location: locationVal.error,
        category: categoryVal.error,
        experienceMax: expMax.error,
      },
    }));
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
  async handleChat(userId) {
    socket.emit('addRoom', userId)
    socket.on('addRoomRes', room => {
       const { room_id,receiver_id, receiver_fn, receiver_ln } = room
        this.props.history.push(
          `/chat/room/?id=${room_id}&r=${receiver_id}&name=${receiver_fn} ${receiver_ln}`,
        );
        
    })
  }
  render() {
    const { category, experienceMax, location, formErrors } = this.state;

    const {
      handleSubmit,
      handleInputChange,
      handleExperienceValue,
      getMore,
      handleCandidateDetails,
      handleChat,
    } = this;

    const {
      candidates,
      loadingCl,
      candidate,
      experience,
      loadingCd,
      disable,
    } = this.props;
    return (
      <>
        <CandidatesPage
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
          disable={disable}
          formErrors={formErrors}
          handleChat={handleChat}
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
  disable: state.candidates.disable,
});
export default compose(
  connect(mapState, {
    fetchCandidates,
    fetchCandidatesDetails,
    fetchMoreCandidates,
    fetchCreateRoom,
  }),
)(CandidatesContainer);
