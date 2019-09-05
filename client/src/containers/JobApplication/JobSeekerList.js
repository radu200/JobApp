import React, { Component } from 'react';
import EmployerDashboard from '../../components/JobApplication/EmployerDashboard'

import axios from 'axios';




 class JobApplicationPage extends Component {
  
    constructor(props){
        super(props) 
         this.state = {
            applicants:[],
            job:[],
            applicantsNum:[]
            
        }

        
    }
    


  
      
        
    componentDidMount(){
      const jobId = this.props.match.params.id;
      const getApplicants =  async () => {

        const url = `/api/job-application/employer/${jobId}`
        try {
            const response = await axios.get(url);
            
             const data = response.data

            this.setState({
              applicantsNum:data.applicantsNumber,
              job:data.job,
              applicants:data.applicants
 
            
            })
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
                  <EmployerDashboard/>
                {/* {this.state.applicants.map((applicant,index) => {
                  return (<p key={index}>{applicant.first_name}</p>)
                })} */}
              </div>
           )
          }
        }
        

  
export default JobApplicationPage;