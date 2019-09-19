import React, { Component } from 'react';
import JobCard from '../../components/Cards/JobSeekerApplications';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';
import MainNav from '../../components/NavBars/MainNav/MainNav';
import GetMoreButton from '../../components/Buttons/ButtonOutlined'
import axios from 'axios';




const styles = theme => ({
  root: {
    maxWidth: 960,
     
  },

});


class ApplicantsActive extends Component {
  
  constructor(props){
    super(props) 
    this.state = {
      jobs:[],
      isAuthenticated:'',
      offset:0,
      url:''
      
    }        
  }
  
  
  async componentDidMount(){
    

        const url = `/api/job-application/jobseeker`
       
        const {offset} = this.state;
       
        try {
            const response = await axios.post(url,{
              offset:offset
            });
            
             const data = response.data
             if(data.auth === 'jobseeker'){
             this.setState({
               jobs:data.jobs,
               isAuthenticated:data.auth,
               url,
               offset:offset + 12
             })
           }

          } catch (error) {
            console.error(error);
          }
    
            
    }
          
            
    getMoreJobs =  async () => {
      const { url,offset,jobs} = this.state
        try {
          const res = await axios.post(url,{
              offset: offset 
          });
          const data = res.data;
     
           this.setState({jobs:[...jobs, ...data.jobs], offset:offset + 12})
        } catch (error) {
          console.error(error);
        }
      }  
          
        render() {  
          const { classes} = this.props;
          const { jobs, isAuthenticated}  = this.state;
          const {getMoreJobs} = this;
          return (
            <div>
              <MainNav isAuthenticated={isAuthenticated}/> 
               <div className={classes.root}>
                <Grid container spacing={0} justify="center" alignItems="center">
                    <Grid item xs={12} sm={12} md={8}>
                      <h3>Joburi Aplicate: {jobs.length}</h3>
                        <JobCard job={jobs}/>
                        {jobs.length >= 12 ? <GetMoreButton onClick={getMoreJobs}/> : null} 
                    </Grid>
                </Grid>   
              </div>     
          </div>
        )
      }
    }
        

  
export default withStyles(styles)(ApplicantsActive);