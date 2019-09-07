import React, { Component } from 'react';
import EmployerDashboard from '../../components/JobApplication/EmployerDashboard'

import axios from 'axios';




 class EmployerDasboardContainer extends Component {
  
    constructor(props){
        super(props) 
         this.state = {
            applicants:[],
            isAuthenticated:'',
            applicantsNum:[]
           
        }        
    }
    
        
    componentDidMount(){
      const jobId =this.props.match.params.id;
      const category  = this.props.match.params.category
     
      const getApplicants =  async () => {

        const url = `/api/job-application/employer/${category}/${jobId}`
        try {
            const response = await axios.get(url,{
              statuss:'active'
            });
            
             const data = response.data
          
             if(data.auth === 'employer'){
             this.setState({
               applicants:data.applicants,
               isAuthenticated:data.auth,
               applicantsNum:data.applicants.length
             })
           }

            console.log(response.data)
          } catch (error) {
            console.error(error);
          }
        }
            getApplicants()
            
    }
          
            
    //   getMoreJobs =  async () => {
    //     const { url } = this.state
    //   try {
    //     const response = await axios.post(url,{
    //         offset: this.state.offset 
    //     });
      
    //     this.setState({jobs:[...this.state.jobs, ...response.data], offset:this.state.offset + 12})

    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
    
      


       
              
            render() {  
              
              return (
                <div>
                  <EmployerDashboard
                  applicant = {this.state.applicants}
                  isAuthenticated = {this.state.isAuthenticated}
                  applicantsNum={this.state.applicantsNum}
                  /> 
        
              </div>
           )
          }
        }
        

  
export default EmployerDasboardContainer;