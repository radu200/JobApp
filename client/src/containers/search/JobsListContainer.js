import React, { Component } from "react";
import { cities } from "../../api/cities";
import { getJobs, searchJobs } from "../../api/jobs";
import { validate } from "../../Utils/validation";
import { categories } from "../../api/categories";
import {fetchJobs } from '../../redux/jobs/operators'
import { connect } from 'react-redux';
import {compose } from 'redux'
import { getJobId } from '../../redux/jobs/actions'
import { getJobsSelector, getLoadingSelector, getCurrentPageSelector, getNextPageSelector, getPrevPageSelector} from  '../../redux/jobs/selectors'
import JobsPage from '../../components/Pages/Jobs/JobsPage'
import queryString from 'query-string'
import Pagination from '../../components/Pagination/Pagination'



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
    this.handleNextPage = this.handleNextPage.bind(this)
    this.handlePrevPage= this.handlePrevPage.bind(this)
    this.getJobId = this.getJobId.bind(this)
  }

  async componentDidMount() {
    const {currentPage, fetchJobs,history} = this.props
    await history.push(`/jobs/?page=${currentPage}`)
    const value=queryString.parse(this.props.location.search);
    fetchJobs(value.page)
  }


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


   getJobId(id){
     const { history, getJobId } = this.props
     getJobId(id)
     history.push(`/job/details`)
   }

 

  handleNextPage(){
   const {nextPage, fetchJobs, history} = this.props
   history.push(`/jobs/?page=${nextPage}`)
   fetchJobs(nextPage)

  }

  handlePrevPage(){
    const { prevPage, fetchJobs, history} = this.props
    history.push(`/jobs/?page=${prevPage}`)
    fetchJobs(prevPage)
  }
 

  render() {
    const { query, formErrors, location, searchLen} = this.state;
    const { handleSubmit, handleInputChange, getMoreJobs , getJobId, handleNextPage, handlePrevPage, } = this;
    const {jobs,loading, currentPage, prevPage, nextPage, totalPages} = this.props

    return (
      <>
        <JobsPage
            query={query}
            formErrors={formErrors}
            location={location}
            jobs={jobs}
            searchLen={searchLen}
            getJobId={getJobId}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            getMoreJobs={getMoreJobs}
            cities={cities}
            categories={categories}
            loading={loading}
            
        />
       <Pagination
          currentPage={currentPage}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          nextPage={nextPage}
          prevPage={prevPage}
          pages={totalPages}
       />
     
      </>
    );
  }
}


const mapState = state => ({
    jobs:getJobsSelector(state),
    loading:getLoadingSelector(state),
    currentPage:getCurrentPageSelector(state),
    nextPage:getNextPageSelector(state),
    prevPage:getPrevPageSelector(state),
  })

export default compose(connect(mapState,{fetchJobs, getJobId}))(JobsContainer);
