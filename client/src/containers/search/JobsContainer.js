import React, { Component } from "react";
import { cities } from "../../api/cities";
import { getJobs, searchJobs, getMoreJobs } from "../../api/jobs";
import { validate } from "../../Utils/validation";
import { categories } from "../../api/categories";
import {fetchJobs } from '../../redux/jobs/operators'
import { connect } from 'react-redux';
import {compose } from 'redux'
import { getJobsSelector, getLaodingSelector} from  '../../redux/jobs/selectors'
import JobsPage from '../../components/Pages/Jobs/JobsPage'
import { getLoadingSelector } from "../../redux/auth/selectors";

class JobsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      offset: 0,
      query: "",
      location: "",
      searchLen: null,
      url: "",
      formErrors: {
        searchError: "",
        locationError: ""
      },
      error: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async componentDidMount() {
    const page =  1
    this.props.fetchJobs(page)
    // const { offset } = this.state;
    // const url = `/api/jobs?offset=${offset}`;
    // try {
    //   const data = await getJobs(offset);

    //   this.setState({
    //     jobs: data.jobs,
    //     url,
    //     offset: offset + 12
    //   });
    // } catch (error) {
    //   console.error(error);
    // }
  }



  getMoreJobs = async () => {
    const { url, offset, jobs } = this.state;

    try {
      const data = await getMoreJobs(url, offset);
      this.setState({
        jobs: [...jobs, ...data.jobs],
        offset: offset + 12

      });
    } catch (error) {
      console.error(error);
    }
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  //submit form
  async handleSubmit(event) {
    event.preventDefault();

    const { query, location } = this.state;
    const queryVal = validate(query);
    const locationVal = validate(location);

    if (queryVal.status && locationVal.status) {
      const url = `/api/search/job?search_query=${this.state.query}&location=${this.state.location}`;

      try {
        const offset = 0;
        const data = await searchJobs(query, location, offset);
        const searchLen = data.jobs.length;
        this.setState({
          jobs: [...data.jobs],
          url,
          offset: offset + 12,
          searchLen
        });

        this.setState(prevState => ({
          formErrors: {
            ...prevState.formErrors,
            locationError: "",
            searchError: ""
          }
        }));
      } catch (error) {
        console.error(error);
      }
    } else {
      this.setState(prevState => ({
        formErrors: {
          ...prevState.formErrors,
          locationError: locationVal.error,
          searchError: queryVal.error
        }
      }));
    }
  }
   handleClick(id){
   //job card click
   console.log(id)
   }

  render() {
    const { query, formErrors, location, searchLen} = this.state;
    const { handleSubmit, handleInputChange, getMoreJobs , handleClick} = this;
    const {jobs,loading } = this.props

    return (
      <>
        <JobsPage
            query={query}
            formErrors={formErrors}
            location={location}
            jobs={jobs}
            searchLen={searchLen}
            handleClick={handleClick}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            getMoreJobs={getMoreJobs}
            cities={cities}
            categories={categories}
            loading={loading}
        />
      </>
    );
  }
}


const mapState = state => ({
  jobs:getJobsSelector(state),
  loading:getLoadingSelector(state)
})

export default compose(connect(mapState,{fetchJobs}))(JobsContainer);
