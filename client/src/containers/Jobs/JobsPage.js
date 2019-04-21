import React, { Component } from 'react';
import axios from 'axios';
import SearJobForm from '../../components/Jobs/Search/SearchJobForm'
import JobCard from '../../components/Jobs/Cards/JobCard'



 class JobsPage extends Component {
  
    constructor(props){
        super(props) 
         this.state = {
            jobs:[],
            offset:2,
            query:'',
            location:'',
            url:'',
            formErrors:{
              searchError:'',
              locationError:''
            }

        }

        this.handleSearchValue = this.handleSearchValue.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    componentDidMount(){
      const getJobs =  async () => {
        const url = '/jobs'
        try {
            const response = await axios.post(url,{
            offset:0
            });
            this.setState({jobs:response.data,url})
          } catch (error) {
            console.error(error);
          }
        }
            getJobs()
            
    }
          
            
      getMoreJobs =  async () => {
        const { url } = this.state
      try {
        const response = await axios.post(url,{
            offset: this.state.offset 
        });
      
        this.setState({jobs:[...this.state.jobs, ...response.data], offset:this.state.offset + 2})

      } catch (error) {
        console.error(error);
      }
    }
    
      //form validation
        validate = () => {
          let searchError = "";
          let locationError = "";
        
          if(!this.state.query){
            searchError = "Nu poate fi gol"
          }
    
          if(!this.state.location){
            locationError = "Te rog alege orasul"
          }
          if(searchError || locationError){
            this.setState( {...this.state.formErrors,searchError,locationError})
            return false;
          }
            return true;
      }
        


          handleSearchValue(event){
            this.setState({query:event.target.value})
            
          }
          
          handleSelectChange(event){
            this.setState({location:event.target.value})
          }

          handleSubmit(event) {
            event.preventDefault();


        const isValid = this.validate();

         if(isValid){
              const getSearchRes =  async () => {
                const url = `/search/job?search_query=${this.state.query}&location=${this.state.location}`
                const offset = 2;
                try {
                  const response = await axios.post(url,{
                    offset:0
                  })
                  this.setState({jobs:[...response.data],url, offset})
                } catch (error) {
                  console.error(error);
                }
              }
              getSearchRes();
              this.setState({...this.state.formErrors,searchError:'',locationError:''})


            }
          }

          getMoreJobsButton(){
            const {jobs } = this.state;
  
            if(jobs.length >= 0){
              return(
                <button onClick={this.getMoreJobs}>GetMore</button>
              )
            }else {
              return null;
            }
          }


          render() {
            return (
              <div>
                <SearJobForm
                    onSubmit={this.handleSubmit}
                    handleSelectChange={this.handleSelectChange}
                    handleSearchValue={this.handleSearchValue}
                    QueryVal={this.state.query}
                    LocationErrors={this.state.locationError}
                    searchErrors={this.state.searchError}/>
                
                 <JobCard  jobs={this.state.jobs}/>
                 
                  {this.getMoreJobsButton()}
            
            </div>
           )
        }
  }

export default JobsPage;