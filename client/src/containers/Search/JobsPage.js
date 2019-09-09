import React, { Component } from 'react';
import axios from 'axios';
import MainNav from '../../components/NavBars/MainNav/MainNav'
import JobsSearchPage from '../../components/Search/Pages/JobSearchPage'




const cities = ['chisinau', 'Balti', 'Cahul',"Ungheni" , ];
 class JobsPage extends Component {
  
    constructor(props){
        super(props) 
         this.state = {
            jobs:[],
            offset:12,
            query:'',
            location:'',
            url:'',
            isAuthenticated:'',
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
          } else if( query.length > 70){
            searchError = " Te rog nu cauta mai mult de 70 de caractere"

          }
    
          if(!location){
            locationError = "Te rog alege orasul"
          } else if(location.length > 70) {
            locationError = "Locatia are mai mult de 70 caractere"
      
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
        const url = '/api/jobs'
        try {
            const response = await axios.post(url,{
            offset:0
            });
            
             const data = response.data;
            console.log(data)
             if(data.auth === 'employer'){
               this.setState({jobs:[],isAuthenticated:data.auth,})
              } else {
                this.setState({jobs:data.jobs,isAuthenticated:data.auth,url})
            }
            
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
       
        const data = response.data;

        this.setState({jobs:[...this.state.jobs, ...data.jobs], offset:this.state.offset + 12})

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
                    const url = `/api/search/job?search_query=${this.state.query}&location=${this.state.location}`
                    const offset = 12;
                    try {
                      const response = await axios.post(url,{
                        offset:0
                      })
                        const data = response.data
                        console.log(data)
                        this.setState({jobs:[...data.jobs],url, offset})


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
                 <MainNav isAuthenticated={this.state.isAuthenticated}/> 
                <JobsSearchPage
                   onSubmit={this.handleSubmit}
                   handleInputChange = {this.handleInputChange}
                   queryVal={this.state.query}
                   errors={this.state.formErrors}
                   jobs={this.state.jobs}
                   getMoreJobs={this.getMoreJobs}
                   locationVal={this.state.location}
                   locations={cities}

                />
            </div>
           )
          }
        }
        

  
export default JobsPage;