import React, { Component } from "react";
import { cities } from "../../api/cities";
import { validate } from "../../Utils/validation";
import { categories } from "../../api/categories";
import {fetchJobs} from '../../redux/jobs/operators'
import { connect } from 'react-redux';
import {compose } from 'redux'
import { getJobId } from '../../redux/jobs/actions'
import { 
   getJobsSelector, 
   getLoadingSelector, 
   getCurrentPageSelector, 
   getNextPageSelector, 
   getPrevPageSelector 
  } from  '../../redux/jobs/selectors'
import JobsPage from '../../components/Pages/Jobs/JobsPage'
import queryString from 'query-string'
import Pagination from '../../components/Pagination/Pagination'



class JobsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
       category: "",
       location: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this)
    this.handlePrevPage= this.handlePrevPage.bind(this)
    this.getJobId = this.getJobId.bind(this)
  }

  async componentDidMount() {
    const {currentPage,history,fetchJobs} = this.props
    const { location, category } = this.state
    await history.push(`/jobs?location=${location}&category=${category}&page=${currentPage}`)
    const value= await queryString.parse(this.props.location.search);
    fetchJobs(value.location,value.category,value.page)
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
    const {currentPage,history} = this.props
    const { category, location } = this.state;

     await this.props.fetchJobs(location,category)
     
     await history.push(`/jobs?location=${location}&category=${category}&page=${currentPage}`)

  }


   getJobId(id){
     const { history, getJobId } = this.props
     getJobId(id)
     history.push(`/job/details`)
   }

 

  async handleNextPage(){
   const {nextPage, history, fetchJobs} = this.props
   const value= await queryString.parse(this.props.location.search);
   const { location, category } = value
   await fetchJobs(location,category,nextPage)
    history.push(`/jobs?location=${location}&category=${category}&page=${nextPage}`)

  }

 async  handlePrevPage(){
    const {fetchJobs, history, prevPage} = this.props
    const value = await queryString.parse(this.props.location.search);
    const { location, category } = value
     await fetchJobs(location,category,prevPage)
     history.push(`/jobs?location=${location}&category=${category}&page=${prevPage}`)
  }
 

  render() {
    const { category, location} = this.state;
    const { handleSubmit, handleInputChange, getJobId, handleNextPage, handlePrevPage, } = this;
    const {jobs,loading, currentPage, prevPage, nextPage, totalPages} = this.props

    return (
      <>
        <JobsPage
            category={category}
            location={location}
            jobs={jobs}
            getJobId={getJobId}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
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
    prevPage:getPrevPageSelector(state)
  })

export default compose(connect(mapState,{fetchJobs, getJobId}))(JobsContainer);
