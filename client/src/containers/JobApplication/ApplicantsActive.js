import React, { Component } from 'react';
import EmployerDashboard from '../../components/JobApplication/EmployerDashboard'
import MainNav from '../../components/NavBars/MainNav/MainNav';
import axios from 'axios';




class EmployerDasboardContainer extends Component {
  
  constructor(props){
    super(props) 
    this.state = {
      applicants:[],
      applicantsNum:[],
      isAuthenticated:''
      
    }        
  }
  
  
  async componentDidMount(){
    
    const jobId = this.props.match.params.id;
    const category  = this.props.match.params.category

        const url = `/api/job-application/applicants/active/${category}/${jobId}`
       
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

          } catch (error) {
            console.error(error);
          }
    
            
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
              <MainNav isAuthenticated={this.state.isAuthenticated}/>
              <EmployerDashboard
                candidate = {this.state.applicants}
                isAuthenticated = {this.state.isAuthenticated}
                applicantsNum={this.state.applicantsNum}
                jobCategory={this.props.match.params.category}
                jobId={ this.props.match.params.id}
              /> 
    
          </div>
        )
      }
    }
        

  
export default EmployerDasboardContainer;