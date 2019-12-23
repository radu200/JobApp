import React, { Component } from "react";
import { cities } from "../../api/cities";
import { validate } from "../../Utils/validation";
import { categories } from "../../api/categories";
import {fetchJobs, fetchAppliedJobs} from '../../redux/jobs/operators'
import { connect } from 'react-redux';
import {compose } from 'redux'
import { getJobId} from '../../redux/jobs/actions'
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
       url:'/jobs'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this)
    this.handlePrevPage= this.handlePrevPage.bind(this)
    this.getJobId = this.getJobId.bind(this)
    this.checkforUrl = this.checkforUrl.bind(this)
  }

  async componentDidMount() {
    const {fetchJobs, fetchAppliedJobs, location} = this.props
    const value = queryString.parse(location.search);
     fetchJobs(value.location,value.category,value.page)
     fetchAppliedJobs()
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
    const {currentPage,history, fetchJobs } = this.props
    const { category, location } = this.state;
     await fetchJobs(location,category)
     history.push(`/jobs?location=${location}&category=${category}&page=${currentPage}`)

  }

   
   getJobId(id){
     const { history, getJobId } = this.props
    // get card details
     getJobId(id)
     history.push(`/job/details`)
   }

  async  checkforUrl(location, category, page, fetchJobs, history){
   
    if(location === undefined && category === undefined){
      const _location = ''
      const _category = ''
      fetchJobs(_location,_category,page)
      const url = `/jobs?page=${page}`
      history.push(url)
      this.setState({url})

    }else {
      await fetchJobs(location,category,page)
      const url = `/jobs?location=${location}&category=${category}&page=${page}`
      history.push(url)
      this.setState({url})
    }

   }

  searchUrl(){
    const value = queryString.parse(this.props.location.search);
    const { location, category } = value
    return {location, category}
  }

  async handleNextPage(){
     const  val = this.searchUrl()
     const { location, category } = val 
     const { nextPage, fetchJobs, history} = this.props
     this.checkforUrl(location, category,nextPage,fetchJobs, history)
    
  }

 async  handlePrevPage(){
   const  val = this.searchUrl()
   const { location, category } = val 
   const {prevPage, fetchJobs, history} = this.props
   this.checkforUrl(location, category, prevPage, fetchJobs, history)

  }
  

  render() {
    const { category, location} = this.state;
    const { handleSubmit, handleInputChange, getJobId, handleNextPage, handlePrevPage, } = this;
    const {jobs,loading, currentPage, prevPage, nextPage, totalPages, appllied} = this.props
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
    prevPage:getPrevPageSelector(state),
  })

export default compose(connect(mapState,{fetchJobs, getJobId, fetchAppliedJobs}))(JobsContainer);
