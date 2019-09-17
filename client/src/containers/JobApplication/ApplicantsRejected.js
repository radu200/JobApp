import React, { Component } from 'react';
import CandidateCard from '../../components/Cards/CandidateCard';
import ApplicantNavBar from '../../components/NavBars/Employer/ApplicantsNavBar';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';
import MainNav from '../../components/NavBars/MainNav/MainNav';
import GetMoreButton from '../../components/Buttons/getMoreButton'
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
      applicants:[],
      isAuthenticated:'',
      offset:0,
      url:''
      
    }        
  }
  
  
  async componentDidMount(){
    
    const jobId = this.props.match.params.id;

        const url = `/api/job-application/applicants/rejected/${jobId}`
        const {offset} = this.state;
        try {
            const response = await axios.post(url,{
              offset:offset
            });
            
             const data = response.data
             if(data.auth === 'employer'){
             this.setState({
               applicants:data.applicants,
               isAuthenticated:data.auth,
               url,
               offset:offset + 6
             })
           }

          } catch (error) {
            console.error(error);
          }
    
            
    }
          
            
    getMoreApplicants =  async () => {
      const { url,offset,applicants} = this.state
        try {
          const res = await axios.post(url,{
              offset: offset 
          });
          
           const data = res.data;
           this.setState({applicants:[...applicants, ...data.applicants], offset:offset + 6})
        } catch (error) {
          console.error(error);
        }
      }  
          
        render() {  
          const { classes} = this.props;
          const { applicants, isAuthenticated}  = this.state;
          const jobId = this.props.match.params.id; 
          const {getMoreApplicants} = this;
          const applicantsNum = applicants.length;
          return (
            <div>
              <MainNav isAuthenticated={isAuthenticated}/> 
               <div className={classes.root}>
                <Grid container spacing={0} justify="center" alignItems="center">
                    <Grid item xs={12} sm={12} md={8}>
                      <ApplicantNavBar  jobId={jobId}  />
                       <h4>Aplicanti: {applicantsNum}</h4>
                        <CandidateCard candidate={applicants}/>
                       {applicants.length >= 6 ? <GetMoreButton onClick={getMoreApplicants}/> : null}
                    </Grid>
              
                </Grid>   
              </div>     
          </div>
        )
      }
    }
        

  
export default withStyles(styles)(ApplicantsActive);