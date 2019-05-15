import React, { Component } from 'react';
import axios from 'axios';
import JobsSearchPage from '../../components/Search/Pages/JobSearchPage'




const cities = ['chisinau', 'Balti', 'Cahul',"Ungheni" ];
 class JobsPage extends Component {
  
    constructor(props){
        super(props) 
         this.state = {
            jobs:[],
            offset:12,
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
      
        this.setState({jobs:[...this.state.jobs, ...response.data], offset:this.state.offset + 12})

      } catch (error) {
        console.error(error);
      }
    }
    
      


          handleInputChange (event) {
            const target = event.target;
            const value = target.value;
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
                const offset = 12;
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

      
        
                     
            render() {
              
              return (
                <div>
                <JobsSearchPage
                   onSubmit={this.handleSubmit}
                   handleInputChange = {this.handleInputChange}
                   queryVal={this.state.query}
                   errors={this.state.formErrors}
                   jobs={this.state.jobs}
                   getMoreJobsBtn={this.getMoreJobs}
                   locationVal={this.state.location}
                   locations={cities}
                />
            
        
            
            </div>
           )
          }
        }
        

  
export default JobsPage;