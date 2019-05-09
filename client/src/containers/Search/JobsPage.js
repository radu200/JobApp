import React, { Component } from 'react';
import axios from 'axios';
import SearJobForm from '../../components/Search/Forms/SearchJobForm'
import JobCard from '../../components/Cards/JobCard'
import GetMoreJobsButton from '../../components/Buttons/getMoreJobButton'



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

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }
    
    componentDidMount(){
      const getJobs =  async () => {
        const url = '/jobs'
        try {
            const response = await axios.post(url,{
            offset:0
            });
            this.setState({jobs:response.data,url})
            console.log(response.data)
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
          const {location, query} = this.state;
          
          let searchError = "";
          let locationError = "";
        
          if(!query){
            searchError = "Nu poate fi gol"
          }
    
          if(!location){
            locationError = "Te rog alege orasul"
          }
          if(searchError || locationError){
            this.setState(prevState => ({
              formErrors:{
                ...prevState.formErrors,
                locationError:locationError,
                searchError:searchError
              }
            }))
            return false;
          }
            return true;
      }
        


          handleInputChange (event) {
            const target = event.target;
            const value = target.value.toLowerCase();
            const name = target.name;

            this.setState({
              [name]: value
            })
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
              this.setState(prevState => ({
                formErrors:{
                  ...prevState.formErrors,
                  locationError:'',
                  searchError:''
                }
              }))

            }
          }

          getMoreJobsButton(){
            const {jobs } = this.state;
  
            if(jobs.length > 0){
              return(
                <GetMoreJobsButton onclick={this.getMoreJobs}/>              )
            }else {
              return null;
            }
          }


          render() {
            return (
              <div>
                <SearJobForm
                    onSubmit={this.handleSubmit}
                    handleInputChange = {this.handleInputChange}
                    queryVal={this.state.query}
                    errors={this.state.formErrors}
                    />
                
                 {this.state.jobs.length > 0 ? <JobCard  jobs={this.state.jobs}/>:<h1>Nu am gasit nici un job</h1> }
                  {this.getMoreJobsButton()}
            
            </div>
           )
        }
  }

export default JobsPage;