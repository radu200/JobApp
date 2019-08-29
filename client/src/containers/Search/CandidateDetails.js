import React, { Component } from 'react';
import axios from 'axios';
import CandidateDetailsPage from '../../components/Search/Pages/CandidateDetails'

export default class CandidateDetails extends Component {

    constructor(props){
        super(props)

         this.state = {
             candidate:[],
             experience:[],
             loginError:''
         }
    }

    componentDidMount () {
        
         const id = this.props.match.params.id;
           const getCandidateDetails =  async () => {
           try {
               const res = await axios.get(`/api/candidate-details/${id}`)
                
               const data = res.data
               console.log(data.details)
               console.log(data.experience)
               if(data.code === 99){
                this.setState({loginError:data.msg})  
              } else {
                this.setState({candidate:data.details, experience:data.experience})
              }

           } catch (err){
               console.log(err)
           }
            
            
             }
        
           getCandidateDetails();

    }

        render(){
      
            return (
                <div>
                    <CandidateDetailsPage 
                      loginError = {this.state.loginError}
                      candidateDetails={this.state.candidate} 
                      experience={this.state.experience}
                      />
                </div>
            )
        }
}