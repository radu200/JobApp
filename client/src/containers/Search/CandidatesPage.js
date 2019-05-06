import React, { Component } from 'react';
import axios from 'axios';
import SearCandidateForm from '../../components/Search/SearchCandidateForm'
 import CandidateSearchCard from '../../components/Cards/CandidateSearchCard'
// import GetMoreJobsButton from '../../components/Buttons/getMoreJobButton'



 class JobsPage extends Component {
  
    constructor(props){
        super(props) 
         this.state = {
            candidates:[],
            offset:2,
            category:'',
            location:'',
            experienceMin:'',
            experienceMax:'',
            url:'',
            formErrors:{
              searchError:'',
              locationError:''
            }

        }

     
          this.handleSubmit = this.handleSubmit.bind(this)
          this.handleExperienceMax = this.handleExperienceMax.bind(this)
          this.handleExperienceMin = this.handleExperienceMin.bind(this)
          this.handleSearchCategory = this.handleSearchCategory.bind(this)
          this.handleSearchLocation = this.handleSearchLocation.bind(this)
        }
    
          componentDidMount(){
            const getCandidates =  async () => {
              const url = '/candidates'
              try {
                  const response = await axios.post(url,{
                  offset:0
                  });
                  
                  this.setState({candidates:response.data,url})

                } catch (error) {
                  console.error(error);
                }
              }
                  getCandidates()
                  
          }
                
     
            
    //   getMoreJobs =  async () => {
    //     const { url } = this.state
    //   try {
    //     const response = await axios.post(url,{
    //         offset: this.state.offset 
    //     });
      
    //     this.setState({jobs:[...this.state.jobs, ...response.data], offset:this.state.offset + 2})

    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
    
    //   //form validation
    //     validate = () => {
    //       const {location, query} = this.state;
          
    //       let searchError = "";
    //       let locationError = "";
        
    //       if(!query){
    //         searchError = "Nu poate fi gol"
    //       }
    
    //       if(!location){
    //         locationError = "Te rog alege orasul"
    //       }
    //       if(searchError || locationError){
    //         this.setState(prevState => ({
    //           formErrors:{
    //             ...prevState.formErrors,
    //             locationError:locationError,
    //             searchError:searchError
    //           }
    //         }))
    //         return false;
    //       }
    //         return true;
    //   }
        


           handleExperienceMax (){

           };

            handleExperienceMin(){

            }

            handleSearchCategory(){

            }
     
            handleSearchLocation(){

            }


           handleSubmit(event) {
             event.preventDefault();


    //     const isValid = this.validate();

    //      if(isValid){
    //           const getSearchRes =  async () => {
    //             const url = `/search/job?search_query=${this.state.query}&location=${this.state.location}`
    //             const offset = 2;
    //             try {
    //               const response = await axios.post(url,{
    //                 offset:0
    //               })
    //               this.setState({jobs:[...response.data],url, offset})
    //             } catch (error) {
    //               console.error(error);
    //             }
    //           }
    //           getSearchRes();
    //           this.setState(prevState => ({
    //             formErrors:{
    //               ...prevState.formErrors,
    //               locationError:'',
    //               searchError:''
    //             }
    //           }))

    //         }
    //       }

    //       getMoreJobsButton(){
    //         const {jobs } = this.state;
  
    //         if(jobs.length > 0){
    //           return(
    //             <GetMoreJobsButton onclick={this.getMoreJobs}/>              )
    //         }else {
    //           return null;
    //         }
         }


          render() {
            console.log(this.state.candidates)
            return (
              <div>
              <SearCandidateForm
               onSubmit={this.handleSubmit}
               handleSearchCategory= {this.handleSearchCategory}
               handleSearchLocation= {this.handleSearchLocation}
               handleExperienceMax = {this.handleExperienceMax}
               handleExperienceMin = {this.handleExperienceMin}
               errors={this.state.formErrors}
              />
              <CandidateSearchCard candidates={this.state.candidates} />
              
             
             {/* {this.getMoreJobsButton()} */}
            
            </div>
           )
        }
  }

export default JobsPage;
