import React, { Component } from 'react';
import axios from 'axios';
import SearCandidateForm from '../../components/Search/SearchCandidateForm'
import CandidateSearchCard from '../../components/Cards/CandidateSearchCard'
import GetMoreCandidatesButton from '../../components/Buttons/getMoreCandidatesButton'



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
              categoryError:'',
              locationError:'',
              experienceMaxError:'',
              experienceMinError:''
            }

        }

     
          this.handleSubmit = this.handleSubmit.bind(this)
          this.handleInputChange = this.handleInputChange.bind(this)
        }
    
    
    //   //form validation
        validate = () => {
          const {location, category ,experienceMax,experienceMin} = this.state;
          
          let categoryError = "";
          let locationError = "";
          let experienceMaxError = "";
          let experienceMinError = "";
        
          if(!category){
           categoryError = "Te rog alege categoria"
          }
    
          if(!location){
            locationError = "Te rog alege orasul"
          }

          if(!experienceMax){
            experienceMaxError = "Te rog alege experienta maxima"
          }

          if(!experienceMin){
            experienceMinError = "Te rog alege experienta minima"
          }

          if(categoryError || locationError || experienceMinError || experienceMaxError){
            this.setState(prevState => ({
              formErrors:{
                ...prevState.formErrors,
                locationError,
                categoryError,
                experienceMinError,
                experienceMaxError
              }
            }))
            return false;
          }
            return true;
      }
        


        handleInputChange(event){
         const target = event.target;
         const value = target.value.toLowerCase();
         const name = target.name;
         this.setState({
           [name]:value
         })
       
        }


           handleSubmit(event) {
             
             event.preventDefault();

             const isValid = this.validate();
             const { location, category, experienceMax, experienceMin} = this.state;
              if(isValid){
                    const getCandidates=  async () => {
                      const url = `/candidate-search?location=${location}&category=${category}&experience_min=${experienceMin}&experience_max=${experienceMax}`;
                      const offset = 2;
                      try {

                        const response = await axios.post(url,{
                          offset:0
                        })

                        this.setState({candidates:[...response.data],url, offset})
                      } catch (error) {
                        console.error(error);
                      }
                    }
                    getCandidates();
                    
                    this.setState(prevState => ({
                      formErrors:{
                        ...prevState.formErrors,
                        locationError:'',
                        categoryError:'',
                        experienceMaxError:'',
                        experienceMinError:''
                      }
                    }))

                  }
          }


                    
            getMoreCandidates =  async () => {
              const { url } = this.state
            try {
              const response = await axios.post(url,{
                  offset: this.state.offset 
              });

              this.setState({candidates:[...this.state.candidates, ...response.data], offset:this.state.offset + 2})
            } catch (error) {
              console.error(error);
            }
          }

          getMoreCandidatesButton(){
            const {candidates} = this.state;
  
            if(candidates.length > 0){
              return(
                <GetMoreCandidatesButton onclick={this.getMoreCandidates}/>              )
            }else {
              return null;
            }
         }
     

          render() {
            console.log(this.state)
            return (
              <div>
              <SearCandidateForm
               onSubmit={this.handleSubmit}
               handleInputChange = {this.handleInputChange}
               errors={this.state.formErrors}
              />

              {this.state.candidates.length > 0 ?  <CandidateSearchCard candidates={this.state.candidates} /> :  <h1>Nu am gasit nici un candidat</h1> }
              
             
             {this.getMoreCandidatesButton()}
            
            </div>
           )
        }
  }

export default JobsPage;
